/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ElementRef, IterableDiffers, Optional, ViewEncapsulation, Injector, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { PblNgridComponent } from '../table.component';
import { EXT_API_TOKEN } from '../../ext/table-ext-api';
import { PblVirtualScrollForOf } from '../features/virtual-scroll/virtual-scroll-for-of';
/**
 * Wrapper for the CdkTable that extends it's functionality to support various table features.
 * This wrapper also applies Material Design table styles (i.e. `MatTable` styles).
 *
 * Most of the extensions are done using mixins, this is mostly for clarity and separation of the features added.
 * This approach will allow easy removal when a feature is no longer required/implemented natively.
 * @template T
 */
export class PblCdkTableComponent extends CdkTable {
    /**
     * @param {?} _differs
     * @param {?} _changeDetectorRef
     * @param {?} _elementRef
     * @param {?} role
     * @param {?} _dir
     * @param {?} injector
     * @param {?} table
     * @param {?} extApi
     * @param {?=} _document
     * @param {?=} platform
     */
    constructor(_differs, _changeDetectorRef, _elementRef, role, _dir, injector, table, extApi, _document, platform) {
        super(_differs, _changeDetectorRef, _elementRef, role, _dir, _document, platform);
        this.injector = injector;
        this.table = table;
        this.extApi = extApi;
        this._minWidth = null;
        //#endregion CSS-CLASS-CONTROL
        //#region CLEAR-ROW-DEFS
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        this._cachedRowDefs = { header: new Set(), footer: new Set() }; //tslint:disable-line
        this.table._cdkTable = this;
        this.trackBy = this.table.trackBy;
        extApi.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.kind === 'beforeInvalidateHeaders') {
                if (this._lastSticky) {
                    this._lastSticky.queryCellElements('header', 'table', 'footer')
                        .forEach((/**
                     * @param {?} el
                     * @return {?}
                     */
                    el => el.classList.remove('pbl-ngrid-sticky-start')));
                    this._lastSticky = undefined;
                }
                if (this._lastStickyEnd) {
                    this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                        .forEach((/**
                     * @param {?} el
                     * @return {?}
                     */
                    el => el.classList.remove('pbl-ngrid-sticky-end')));
                    this._lastStickyEnd = undefined;
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    get _element() { return this._elementRef.nativeElement; }
    /**
     * @return {?}
     */
    get onRenderRows() {
        if (!this.onRenderRows$) {
            this.onRenderRows$ = new Subject();
        }
        return this.onRenderRows$.asObservable();
    }
    /**
     * @return {?}
     */
    get minWidth() { return this._minWidth; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minWidth(value) {
        this._minWidth = value || null;
        this._element.style.minWidth = value ? value + 'px' : null;
    }
    /**
     * @return {?}
     */
    updateStickyColumnStyles() {
        if (this._isStickyPending) {
            return;
        }
        this._isStickyPending = true;
        Promise.resolve()
            .then((/**
         * @return {?}
         */
        () => {
            this._isStickyPending = false;
            this._updateStickyColumnStyles();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.onRenderRows$) {
            this.onRenderRows$.complete();
        }
        this.virtualScrollDestroy();
    }
    //#region CSS-CLASS-CONTROL
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    addClass(cssClassName) {
        this._element.classList.add(cssClassName);
    }
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    removeClass(cssClassName) {
        this._element.classList.remove(cssClassName);
    }
    //tslint:disable-line
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} headerRowDef
     * @return {?}
     */
    addHeaderRowDef(headerRowDef) {
        super.addHeaderRowDef(headerRowDef);
        this._cachedRowDefs.header.add(headerRowDef);
    }
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    clearHeaderRowDefs() {
        const { header } = this._cachedRowDefs;
        for (const rowDef of Array.from(header.values())) {
            this.removeHeaderRowDef(rowDef);
        }
        header.clear();
    }
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} footerRowDef
     * @return {?}
     */
    addFooterRowDef(footerRowDef) {
        super.addFooterRowDef(footerRowDef);
        this._cachedRowDefs.footer.add(footerRowDef);
    }
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    clearFooterRowDefs() {
        const { footer } = this._cachedRowDefs;
        for (const rowDef of Array.from(footer.values())) {
            this.removeFooterRowDef(rowDef);
        }
        footer.clear();
    }
    //tslint:disable-line
    /**
     * @return {?}
     */
    attachViewPort() {
        this.detachViewPort();
        this.forOf = new PblVirtualScrollForOf(this.extApi, this.injector.get(NgZone));
    }
    /**
     * @return {?}
     */
    detachViewPort() {
        if (this.forOf) {
            this.forOf.destroy();
            this.forOf = undefined;
        }
    }
    /**
     * @private
     * @return {?}
     */
    virtualScrollDestroy() {
        super.ngOnDestroy();
        this.detachViewPort();
    }
    //#endregion VIRTUAL-SCROLL
    /**
     * An alias for `_cacheRowDefs()`
     * @return {?}
     */
    updateRowDefCache() {
        ((/** @type {?} */ (this)))._cacheRowDefs();
    }
    /**
     * @return {?}
     */
    renderRows() {
        super.renderRows();
        // The problem of inheritance right at your face
        // Because material does not allow us to control the context generation for a row we need to get clever.
        // https://github.com/angular/components/issues/14199
        // TODO: If they do allow controlling context generation, remove this and apply their solution.
        /** @type {?} */
        const viewContainer = this._rowOutlet.viewContainer;
        for (let renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (viewContainer.get(renderIndex)));
            /** @type {?} */
            const context = viewRef.context;
            context.gridInstance = this.table;
        }
        if (this.onRenderRows$) {
            this.onRenderRows$.next(this._rowOutlet);
        }
    }
    /**
     * @param {?=} rowType
     * @param {...?} rows
     * @return {?}
     */
    syncRows(rowType = false, ...rows) {
        /** @type {?} */
        const detectChanges = typeof rowType === 'boolean'
            ? rowType
            : typeof rows[0] === 'boolean'
                ? rows.shift()
                : false;
        /** @type {?} */
        let vcRef;
        switch (rowType) {
            case 'header':
                vcRef = this._headerRowOutlet.viewContainer;
                break;
            case 'data':
                vcRef = this._rowOutlet.viewContainer;
                break;
            case 'footer':
                vcRef = this._footerRowOutlet.viewContainer;
                break;
            default: // boolean or 'all'
                this._changeDetectorRef.markForCheck();
                if (detectChanges) {
                    this._changeDetectorRef.detectChanges();
                }
                return;
        }
        /** @type {?} */
        const useSpecificRows = rows.length > 0;
        /** @type {?} */
        const count = useSpecificRows ? rows.length : vcRef.length;
        for (let renderIndex = 0; renderIndex < count; renderIndex++) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (vcRef.get(useSpecificRows ? rows[renderIndex] : renderIndex)));
            if (viewRef) {
                viewRef.markForCheck();
                if (detectChanges) {
                    viewRef.detectChanges();
                }
            }
        }
    }
    /**
     * @return {?}
     */
    pblForceRenderDataRows() {
        try {
            ((/** @type {?} */ (this)))._forceRenderDataRows();
        }
        catch (ex) {
            this.multiTemplateDataRows = this.multiTemplateDataRows;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _updateStickyColumnStyles() {
        /** @type {?} */
        const columns = this.table.columnApi.visibleColumns;
        /** @type {?} */
        let sticky;
        /** @type {?} */
        let stickyEnd;
        for (let i = 0, len = columns.length; i < len; i++) {
            if (columns[i].columnDef && columns[i].columnDef.sticky) {
                sticky = columns[i].columnDef;
            }
        }
        for (let i = columns.length - 1; i > -1; i--) {
            if (columns[i].columnDef && columns[i].columnDef.stickyEnd) {
                stickyEnd = columns[i].columnDef;
            }
        }
        if (this._lastSticky) {
            this._lastSticky.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.remove('pbl-ngrid-sticky-start')));
        }
        if (sticky) {
            sticky.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.add('pbl-ngrid-sticky-start')));
        }
        this._lastSticky = sticky;
        if (this._lastStickyEnd) {
            this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.remove('pbl-ngrid-sticky-end')));
        }
        if (stickyEnd) {
            stickyEnd.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            el => el.classList.add('pbl-ngrid-sticky-end')));
        }
        this._lastStickyEnd = stickyEnd;
        super.updateStickyColumnStyles();
    }
}
PblCdkTableComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-cdk-table',
                exportAs: 'pblCdkTable',
                template: CDK_TABLE_TEMPLATE,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'pbl-cdk-table',
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".pbl-cdk-table{display:block}.pbl-ngrid-footer-row,.pbl-ngrid-header-row,.pbl-ngrid-row{display:-webkit-box;display:flex;border-width:0 0 1px;border-style:solid;-webkit-box-align:center;align-items:center;box-sizing:border-box;position:relative}.pbl-ngrid-footer-row::after,.pbl-ngrid-header-row::after,.pbl-ngrid-row::after{display:inline-block;min-height:inherit;content:''}.pbl-ngrid-cell,.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}.pbl-ngrid-header-cell.pbl-header-group-cell{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.pbl-ngrid-header-cell.pbl-header-group-cell.pbl-header-group-cell-placeholder{border:none}.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{position:relative}.pbl-ngrid-cell{cursor:default;outline:0}.pbl-ngrid-editable-cell{cursor:text}"]
            }] }
];
/** @nocollapse */
PblCdkTableComponent.ctorParameters = () => [
    { type: IterableDiffers },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: String, decorators: [{ type: Attribute, args: ['role',] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: Injector },
    { type: PblNgridComponent },
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Platform }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._minWidth;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype.onRenderRows$;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._lastSticky;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._lastStickyEnd;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._isStickyPending;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype._cachedRowDefs;
    /**
     * @type {?}
     * @private
     */
    PblCdkTableComponent.prototype.forOf;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.table;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.extApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJsLWNkay10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUVWLGVBQWUsRUFFZixRQUFRLEVBQ1IsaUJBQWlCLEVBRWpCLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUErRCxNQUFNLG9CQUFvQixDQUFDO0FBQy9ILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOzs7Ozs7Ozs7QUFvQnpGLE1BQU0sT0FBTyxvQkFBd0IsU0FBUSxRQUFXOzs7Ozs7Ozs7Ozs7O0lBdUJ0RCxZQUFZLFFBQXlCLEVBQ3pCLGtCQUFxQyxFQUNyQyxXQUFvQyxFQUNqQixJQUFZLEVBQ25CLElBQW9CLEVBQ3RCLFFBQWtCLEVBQ2xCLEtBQTJCLEVBQ0osTUFBK0IsRUFDOUMsU0FBZSxFQUNqQyxRQUFtQjtRQUM3QixLQUFLLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUw5RCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQXNCO1FBQ0osV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFicEUsY0FBUyxHQUFrQixJQUFJLENBQUM7Ozs7UUFzRWhDLG1CQUFjLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQW1CLEVBQUUsTUFBTSxFQUFFLElBQUksR0FBRyxFQUFtQixFQUFFLENBQUMsQ0FBQyxxQkFBcUI7UUFyRHhILElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyx5QkFBeUIsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO3lCQUM1RCxPQUFPOzs7O29CQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBQyxDQUFDO29CQUNqRSxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztpQkFDOUI7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO3lCQUMvRCxPQUFPOzs7O29CQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBQyxDQUFDO29CQUMvRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztpQkFDakM7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQWpERCxJQUFJLFFBQVEsS0FBa0IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Ozs7SUFFdEUsSUFBSSxZQUFZO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQztTQUNuRDtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRUQsSUFBSSxRQUFRLEtBQW9CLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3hELElBQUksUUFBUSxDQUFDLEtBQW9CO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDN0QsQ0FBQzs7OztJQXNDRCx3QkFBd0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixPQUFPLENBQUMsT0FBTyxFQUFFO2FBQ2QsSUFBSTs7O1FBQUUsR0FBRyxFQUFFO1lBQ1YsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNuQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7O0lBR0QsUUFBUSxDQUFDLFlBQW9CO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7OztJQUVELFdBQVcsQ0FBQyxZQUFvQjtRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7OztJQVNELGVBQWUsQ0FBQyxZQUE2QjtRQUMzQyxLQUFLLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7OztJQUdELGtCQUFrQjtjQUNWLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWM7UUFDdEMsS0FBSyxNQUFNLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQ2hELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNqQztRQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFHRCxlQUFlLENBQUMsWUFBNkI7UUFDM0MsS0FBSyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Ozs7SUFHRCxrQkFBa0I7Y0FDVixFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjO1FBQ3RDLEtBQUssTUFBTSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNoRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakM7UUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFNRCxjQUFjO1FBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxxQkFBcUIsQ0FBSSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxvQkFBb0I7UUFDMUIsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFNRCxpQkFBaUI7UUFDZixDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7OztjQU1iLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWE7UUFDbkQsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsV0FBVyxHQUFHLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRTs7a0JBQ3BGLE9BQU8sR0FBRyxtQkFBQSxhQUFhLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFrQzs7a0JBQzFFLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTztZQUMvQixPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDbkM7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQzs7Ozs7O0lBU0QsUUFBUSxDQUFDLFVBQTBELEtBQUssRUFBRSxHQUFHLElBQVc7O2NBQ2hGLGFBQWEsR0FBWSxPQUFPLE9BQU8sS0FBSyxTQUFTO1lBQ3pELENBQUMsQ0FBQyxPQUFPO1lBQ1QsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVM7Z0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNkLENBQUMsQ0FBQyxLQUFLOztZQUdQLEtBQXVCO1FBQzNCLFFBQU8sT0FBTyxFQUFFO1lBQ2QsS0FBSyxRQUFRO2dCQUNYLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO2dCQUM1QyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztnQkFDdEMsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztnQkFDNUMsTUFBTTtZQUNSLFNBQVMsbUJBQW1CO2dCQUMxQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksYUFBYSxFQUFFO29CQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3pDO2dCQUNELE9BQU87U0FDVjs7Y0FFSyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDOztjQUNqQyxLQUFLLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUUxRCxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsS0FBSyxFQUFFLFdBQVcsRUFBRSxFQUFFOztrQkFDdEQsT0FBTyxHQUFHLG1CQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUF3QjtZQUNwRyxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksYUFBYSxFQUFFO29CQUNqQixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQ3pCO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxzQkFBc0I7UUFDcEIsSUFBRztZQUNELENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ3RDO1FBQUMsT0FBTyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ3pEO0lBQ0gsQ0FBQzs7Ozs7SUFFTyx5QkFBeUI7O2NBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjOztZQUMvQyxNQUF5Qjs7WUFBRSxTQUE0QjtRQUUzRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xELElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDdkQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDL0I7U0FDRjtRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDMUQsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7YUFDbEM7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO2lCQUM1RCxPQUFPOzs7O1lBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFDLENBQUM7U0FDbEU7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQkFDbEQsT0FBTzs7OztZQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsRUFBQyxDQUFDO1NBQy9EO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7aUJBQy9ELE9BQU87Ozs7WUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsQ0FBQztTQUNoRTtRQUVELElBQUksU0FBUyxFQUFFO1lBQ2IsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO2lCQUNyRCxPQUFPOzs7O1lBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUVoQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUFqUkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLGtCQUFrQjtnQkFFNUIsSUFBSSxFQUFFOztvQkFDSixPQUFPLEVBQUUsZUFBZTtpQkFDekI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQXBDQyxlQUFlO1lBTGYsaUJBQWlCO1lBR2pCLFVBQVU7eUNBaUVHLFNBQVMsU0FBQyxNQUFNO1lBbkR0QixjQUFjLHVCQW9EUixRQUFRO1lBM0RyQixRQUFRO1lBU0QsaUJBQWlCOzRDQXFEWCxNQUFNLFNBQUMsYUFBYTs0Q0FDcEIsTUFBTSxTQUFDLFFBQVE7WUExRHJCLFFBQVE7Ozs7Ozs7SUE0Q2YseUNBQXdDOzs7OztJQUN4Qyw2Q0FBOEM7Ozs7O0lBQzlDLDJDQUF1Qzs7Ozs7SUFDdkMsOENBQTBDOzs7OztJQUMxQyxnREFBa0M7Ozs7O0lBa0VsQyw4Q0FBb0c7Ozs7O0lBa0NwRyxxQ0FBd0M7Ozs7O0lBN0Y1Qix3Q0FBNEI7Ozs7O0lBQzVCLHFDQUFxQzs7Ozs7SUFDckMsc0NBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENES19UQUJMRV9URU1QTEFURSwgQ2RrVGFibGUsIERhdGFSb3dPdXRsZXQsIENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmLCBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9jb2x1bW4tZGVmJztcbmltcG9ydCB7IFBibFZpcnR1YWxTY3JvbGxGb3JPZiB9IGZyb20gJy4uL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5cbi8qKlxuICogV3JhcHBlciBmb3IgdGhlIENka1RhYmxlIHRoYXQgZXh0ZW5kcyBpdCdzIGZ1bmN0aW9uYWxpdHkgdG8gc3VwcG9ydCB2YXJpb3VzIHRhYmxlIGZlYXR1cmVzLlxuICogVGhpcyB3cmFwcGVyIGFsc28gYXBwbGllcyBNYXRlcmlhbCBEZXNpZ24gdGFibGUgc3R5bGVzIChpLmUuIGBNYXRUYWJsZWAgc3R5bGVzKS5cbiAqXG4gKiBNb3N0IG9mIHRoZSBleHRlbnNpb25zIGFyZSBkb25lIHVzaW5nIG1peGlucywgdGhpcyBpcyBtb3N0bHkgZm9yIGNsYXJpdHkgYW5kIHNlcGFyYXRpb24gb2YgdGhlIGZlYXR1cmVzIGFkZGVkLlxuICogVGhpcyBhcHByb2FjaCB3aWxsIGFsbG93IGVhc3kgcmVtb3ZhbCB3aGVuIGEgZmVhdHVyZSBpcyBubyBsb25nZXIgcmVxdWlyZWQvaW1wbGVtZW50ZWQgbmF0aXZlbHkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1jZGstdGFibGUnLFxuICBleHBvcnRBczogJ3BibENka1RhYmxlJyxcbiAgdGVtcGxhdGU6IENES19UQUJMRV9URU1QTEFURSxcbiAgc3R5bGVVcmxzOiBbJy4vcGJsLWNkay10YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ3BibC1jZGstdGFibGUnLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUGJsQ2RrVGFibGVDb21wb25lbnQ8VD4gZXh0ZW5kcyBDZGtUYWJsZTxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgZ2V0IF9lbGVtZW50KCk6IEhUTUxFbGVtZW50IHsgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDsgfVxuXG4gIGdldCBvblJlbmRlclJvd3MoKTogT2JzZXJ2YWJsZTxEYXRhUm93T3V0bGV0PiB7XG4gICAgaWYgKCF0aGlzLm9uUmVuZGVyUm93cyQpIHtcbiAgICAgIHRoaXMub25SZW5kZXJSb3dzJCA9IG5ldyBTdWJqZWN0PERhdGFSb3dPdXRsZXQ+KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9uUmVuZGVyUm93cyQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBnZXQgbWluV2lkdGgoKTogbnVtYmVyIHwgbnVsbCB7IHJldHVybiB0aGlzLl9taW5XaWR0aDsgfVxuICBzZXQgbWluV2lkdGgodmFsdWU6IG51bWJlciB8IG51bGwpIHtcbiAgICB0aGlzLl9taW5XaWR0aCA9IHZhbHVlIHx8IG51bGw7XG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IHZhbHVlID8gdmFsdWUgKyAncHgnIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX21pbldpZHRoOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBvblJlbmRlclJvd3MkOiBTdWJqZWN0PERhdGFSb3dPdXRsZXQ+O1xuICBwcml2YXRlIF9sYXN0U3RpY2t5OiBQYmxOZ3JpZENvbHVtbkRlZjtcbiAgcHJpdmF0ZSBfbGFzdFN0aWNreUVuZDogUGJsTmdyaWRDb2x1bW5EZWY7XG4gIHByaXZhdGUgX2lzU3RpY2t5UGVuZGluZzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ3JvbGUnKSByb2xlOiBzdHJpbmcsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcm90ZWN0ZWQgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KEVYVF9BUElfVE9LRU4pIHByb3RlY3RlZCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnksXG4gICAgICAgICAgICAgIHBsYXRmb3JtPzogUGxhdGZvcm0pIHtcbiAgICBzdXBlcihfZGlmZmVycywgX2NoYW5nZURldGVjdG9yUmVmLCBfZWxlbWVudFJlZiwgcm9sZSwgX2RpciwgX2RvY3VtZW50LCBwbGF0Zm9ybSk7XG4gICAgdGhpcy50YWJsZS5fY2RrVGFibGUgPSB0aGlzO1xuICAgIHRoaXMudHJhY2tCeSA9IHRoaXMudGFibGUudHJhY2tCeTtcblxuICAgIGV4dEFwaS5ldmVudHMuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgIGlmIChlLmtpbmQgPT09ICdiZWZvcmVJbnZhbGlkYXRlSGVhZGVycycpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RTdGlja3kpIHtcbiAgICAgICAgICB0aGlzLl9sYXN0U3RpY2t5LnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtc3RpY2t5LXN0YXJ0JykpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTdGlja3kgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xhc3RTdGlja3lFbmQpIHtcbiAgICAgICAgICB0aGlzLl9sYXN0U3RpY2t5RW5kLnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtc3RpY2t5LWVuZCcpKTtcbiAgICAgICAgICB0aGlzLl9sYXN0U3RpY2t5RW5kID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKSB7XG4gICAgaWYgKHRoaXMuX2lzU3RpY2t5UGVuZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2lzU3RpY2t5UGVuZGluZyA9IHRydWU7XG4gICAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgIHRoaXMuX2lzU3RpY2t5UGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl91cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICBpZiAodGhpcy5vblJlbmRlclJvd3MkKSB7XG4gICAgICB0aGlzLm9uUmVuZGVyUm93cyQuY29tcGxldGUoKTtcbiAgICB9XG4gICAgdGhpcy52aXJ0dWFsU2Nyb2xsRGVzdHJveSgpO1xuICB9XG5cbiAgLy8jcmVnaW9uIENTUy1DTEFTUy1DT05UUk9MXG4gIGFkZENsYXNzKGNzc0NsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzTmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhjc3NDbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3NDbGFzc05hbWUpO1xuICB9XG4gIC8vI2VuZHJlZ2lvbiBDU1MtQ0xBU1MtQ09OVFJPTFxuXG4gIC8vI3JlZ2lvbiBDTEVBUi1ST1ctREVGU1xuXG4gIC8vIFRPRE86IHJlbW92ZSBpZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xMzAwMCBpcyBwdXNoZWRcbiAgcHJpdmF0ZSBfY2FjaGVkUm93RGVmcyA9IHsgaGVhZGVyOiBuZXcgU2V0PENka0hlYWRlclJvd0RlZj4oKSwgZm9vdGVyOiBuZXcgU2V0PENka0Zvb3RlclJvd0RlZj4oKSB9OyAvL3RzbGludDpkaXNhYmxlLWxpbmVcblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIGFkZEhlYWRlclJvd0RlZihoZWFkZXJSb3dEZWY6IENka0hlYWRlclJvd0RlZik6IHZvaWQge1xuICAgIHN1cGVyLmFkZEhlYWRlclJvd0RlZihoZWFkZXJSb3dEZWYpO1xuICAgIHRoaXMuX2NhY2hlZFJvd0RlZnMuaGVhZGVyLmFkZChoZWFkZXJSb3dEZWYpO1xuICB9XG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBjbGVhckhlYWRlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBoZWFkZXIgfSA9IHRoaXMuX2NhY2hlZFJvd0RlZnM7XG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgQXJyYXkuZnJvbShoZWFkZXIudmFsdWVzKCkpKSB7XG4gICAgICB0aGlzLnJlbW92ZUhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgIH1cbiAgICBoZWFkZXIuY2xlYXIoKTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZSBpZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xMzAwMCBpcyBwdXNoZWRcbiAgYWRkRm9vdGVyUm93RGVmKGZvb3RlclJvd0RlZjogQ2RrRm9vdGVyUm93RGVmKTogdm9pZCB7XG4gICAgc3VwZXIuYWRkRm9vdGVyUm93RGVmKGZvb3RlclJvd0RlZik7XG4gICAgdGhpcy5fY2FjaGVkUm93RGVmcy5mb290ZXIuYWRkKGZvb3RlclJvd0RlZik7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIGNsZWFyRm9vdGVyUm93RGVmcygpOiB2b2lkIHtcbiAgICBjb25zdCB7IGZvb3RlciB9ID0gdGhpcy5fY2FjaGVkUm93RGVmcztcbiAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBBcnJheS5mcm9tKGZvb3Rlci52YWx1ZXMoKSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlRm9vdGVyUm93RGVmKHJvd0RlZik7XG4gICAgfVxuICAgIGZvb3Rlci5jbGVhcigpO1xuICB9XG4gIC8vI2VuZHJlZ2lvbiBDTEVBUi1ST1ctREVGU1xuXG4gIC8vI3JlZ2lvbiBWSVJUVUFMLVNDUk9MTFxuICBwcml2YXRlIGZvck9mOiBQYmxWaXJ0dWFsU2Nyb2xsRm9yT2Y8VD47IC8vdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIGF0dGFjaFZpZXdQb3J0KCk6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoVmlld1BvcnQoKTtcbiAgICB0aGlzLmZvck9mID0gbmV3IFBibFZpcnR1YWxTY3JvbGxGb3JPZjxUPih0aGlzLmV4dEFwaSwgdGhpcy5pbmplY3Rvci5nZXQoTmdab25lKSk7XG4gIH1cblxuICBkZXRhY2hWaWV3UG9ydCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5mb3JPZikge1xuICAgICAgdGhpcy5mb3JPZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLmZvck9mID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmlydHVhbFNjcm9sbERlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLmRldGFjaFZpZXdQb3J0KCk7XG4gIH1cbiAgLy8jZW5kcmVnaW9uIFZJUlRVQUwtU0NST0xMXG5cbiAgLyoqXG4gICAqIEFuIGFsaWFzIGZvciBgX2NhY2hlUm93RGVmcygpYFxuICAgKi9cbiAgdXBkYXRlUm93RGVmQ2FjaGUoKTogdm9pZCB7XG4gICAgKHRoaXMgYXMgYW55KS5fY2FjaGVSb3dEZWZzKCk7XG4gIH1cblxuICByZW5kZXJSb3dzKCk6IHZvaWQge1xuICAgIHN1cGVyLnJlbmRlclJvd3MoKTtcblxuICAgIC8vIFRoZSBwcm9ibGVtIG9mIGluaGVyaXRhbmNlIHJpZ2h0IGF0IHlvdXIgZmFjZVxuICAgIC8vIEJlY2F1c2UgbWF0ZXJpYWwgZG9lcyBub3QgYWxsb3cgdXMgdG8gY29udHJvbCB0aGUgY29udGV4dCBnZW5lcmF0aW9uIGZvciBhIHJvdyB3ZSBuZWVkIHRvIGdldCBjbGV2ZXIuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY29tcG9uZW50cy9pc3N1ZXMvMTQxOTlcbiAgICAvLyBUT0RPOiBJZiB0aGV5IGRvIGFsbG93IGNvbnRyb2xsaW5nIGNvbnRleHQgZ2VuZXJhdGlvbiwgcmVtb3ZlIHRoaXMgYW5kIGFwcGx5IHRoZWlyIHNvbHV0aW9uLlxuICAgIGNvbnN0IHZpZXdDb250YWluZXIgPSB0aGlzLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICBmb3IgKGxldCByZW5kZXJJbmRleCA9IDAsIGNvdW50ID0gdmlld0NvbnRhaW5lci5sZW5ndGg7IHJlbmRlckluZGV4IDwgY291bnQ7IHJlbmRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB2aWV3Q29udGFpbmVyLmdldChyZW5kZXJJbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPFJvd0NvbnRleHQ8VD4+O1xuICAgICAgY29uc3QgY29udGV4dCA9IHZpZXdSZWYuY29udGV4dDtcbiAgICAgIGNvbnRleHQuZ3JpZEluc3RhbmNlID0gdGhpcy50YWJsZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vblJlbmRlclJvd3MkKSB7XG4gICAgICB0aGlzLm9uUmVuZGVyUm93cyQubmV4dCh0aGlzLl9yb3dPdXRsZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBydW4gY2hhbmdlIGRldGVjdGlvbiBmb3Igcm93cy5cbiAgICogWW91IGNhbiBydW4gaXQgZm9yIHNwZWNpZmljIGdyb3VwcyBvciBmb3IgYWxsIHJvd3MuXG4gICAqL1xuICBzeW5jUm93cyhyb3dUeXBlPzogJ2FsbCcgfCBib29sZWFuLCBkZXRlY3RDaGFuZ2VzPzogYm9vbGVhbik6IHZvaWQ7XG4gIHN5bmNSb3dzKHJvd1R5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIGRldGVjdENoYW5nZXM6IGJvb2xlYW4sIC4uLnJvd3M6IG51bWJlcltdKTogdm9pZDtcbiAgc3luY1Jvd3Mocm93VHlwZTogJ2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJywgLi4ucm93czogbnVtYmVyW10pOiB2b2lkO1xuICBzeW5jUm93cyhyb3dUeXBlOiAnaGVhZGVyJyB8ICdkYXRhJyB8ICdmb290ZXInIHwgJ2FsbCcgfCBib29sZWFuID0gZmFsc2UsIC4uLnJvd3M6IGFueVtdKTogdm9pZCB7XG4gICAgY29uc3QgZGV0ZWN0Q2hhbmdlczogYm9vbGVhbiA9IHR5cGVvZiByb3dUeXBlID09PSAnYm9vbGVhbidcbiAgICAgID8gcm93VHlwZVxuICAgICAgOiB0eXBlb2Ygcm93c1swXSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgID8gcm93cy5zaGlmdCgpXG4gICAgICAgIDogZmFsc2VcbiAgICA7XG5cbiAgICBsZXQgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG4gICAgc3dpdGNoKHJvd1R5cGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgIHZjUmVmID0gdGhpcy5faGVhZGVyUm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgIHZjUmVmID0gdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgdmNSZWYgPSB0aGlzLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBib29sZWFuIG9yICdhbGwnXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICBpZiAoZGV0ZWN0Q2hhbmdlcykge1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlU3BlY2lmaWNSb3dzID0gcm93cy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGNvdW50ID0gdXNlU3BlY2lmaWNSb3dzID8gcm93cy5sZW5ndGggOiB2Y1JlZi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCByZW5kZXJJbmRleCA9IDA7IHJlbmRlckluZGV4IDwgY291bnQ7IHJlbmRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB2Y1JlZi5nZXQodXNlU3BlY2lmaWNSb3dzID8gcm93c1tyZW5kZXJJbmRleF0gOiByZW5kZXJJbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICBpZiAodmlld1JlZikge1xuICAgICAgICB2aWV3UmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICBpZiAoZGV0ZWN0Q2hhbmdlcykge1xuICAgICAgICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGJsRm9yY2VSZW5kZXJEYXRhUm93cygpOiB2b2lkIHtcbiAgICB0cnl7XG4gICAgICAodGhpcyBhcyBhbnkpLl9mb3JjZVJlbmRlckRhdGFSb3dzKCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHRoaXMubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gdGhpcy5tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCkge1xuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLnRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucztcbiAgICBsZXQgc3RpY2t5OiBQYmxOZ3JpZENvbHVtbkRlZiwgc3RpY2t5RW5kOiBQYmxOZ3JpZENvbHVtbkRlZjtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjb2x1bW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoY29sdW1uc1tpXS5jb2x1bW5EZWYgJiYgY29sdW1uc1tpXS5jb2x1bW5EZWYuc3RpY2t5KSB7XG4gICAgICAgIHN0aWNreSA9IGNvbHVtbnNbaV0uY29sdW1uRGVmO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBjb2x1bW5zLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG4gICAgICBpZiAoY29sdW1uc1tpXS5jb2x1bW5EZWYgJiYgY29sdW1uc1tpXS5jb2x1bW5EZWYuc3RpY2t5RW5kKSB7XG4gICAgICAgIHN0aWNreUVuZCA9IGNvbHVtbnNbaV0uY29sdW1uRGVmO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5KSB7XG4gICAgICB0aGlzLl9sYXN0U3RpY2t5LnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1zdGlja3ktc3RhcnQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgc3RpY2t5LnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1zdGlja3ktc3RhcnQnKSk7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RTdGlja3kgPSBzdGlja3k7XG5cbiAgICBpZiAodGhpcy5fbGFzdFN0aWNreUVuZCkge1xuICAgICAgdGhpcy5fbGFzdFN0aWNreUVuZC5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtc3RpY2t5LWVuZCcpKTtcbiAgICB9XG5cbiAgICBpZiAoc3RpY2t5RW5kKSB7XG4gICAgICBzdGlja3lFbmQucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLXN0aWNreS1lbmQnKSk7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RTdGlja3lFbmQgPSBzdGlja3lFbmQ7XG5cbiAgICBzdXBlci51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgfVxufVxuIl19