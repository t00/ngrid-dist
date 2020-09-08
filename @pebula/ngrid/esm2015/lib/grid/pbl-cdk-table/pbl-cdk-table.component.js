/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/pbl-cdk-table/pbl-cdk-table.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ElementRef, IterableDiffers, Optional, ViewEncapsulation, Injector, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { PblNgridComponent } from '../ngrid.component';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
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
     * @param {?} grid
     * @param {?} extApi
     * @param {?=} _document
     * @param {?=} platform
     */
    constructor(_differs, _changeDetectorRef, _elementRef, role, _dir, injector, grid, extApi, _document, platform) {
        super(_differs, _changeDetectorRef, _elementRef, role, _dir, _document, platform);
        this.injector = injector;
        this.grid = grid;
        this.extApi = extApi;
        this._minWidth = null;
        //#endregion CSS-CLASS-CONTROL
        //#region CLEAR-ROW-DEFS
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        this._cachedRowDefs = { header: new Set(), footer: new Set() }; //tslint:disable-line
        this.grid._cdkTable = this;
        this.trackBy = this.grid.trackBy;
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
            context.gridInstance = this.grid;
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
        const columns = this.grid.columnApi.visibleColumns;
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
                styles: [".pbl-cdk-table{display:block}.pbl-ngrid-footer-row,.pbl-ngrid-header-row,.pbl-ngrid-row{display:flex;border-width:0 0 1px;border-style:solid;align-items:center;box-sizing:border-box;position:relative}.pbl-ngrid-footer-row::after,.pbl-ngrid-header-row::after,.pbl-ngrid-row::after{display:inline-block;min-height:inherit;content:''}.pbl-ngrid-cell,.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{flex:1;display:flex;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}.pbl-ngrid-header-cell.pbl-header-group-cell{display:flex;align-items:center}.pbl-ngrid-header-cell.pbl-header-group-cell.pbl-header-group-cell-placeholder{border:none}.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{position:relative}.pbl-ngrid-cell{cursor:default;outline:0}.pbl-ngrid-editable-cell{cursor:text}"]
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
    PblCdkTableComponent.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.extApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJsLWNkay10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUNMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxNQUFNLEVBQ04sVUFBVSxFQUVWLGVBQWUsRUFFZixRQUFRLEVBQ1IsaUJBQWlCLEVBRWpCLFFBQVEsRUFDUixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxFQUErRCxNQUFNLG9CQUFvQixDQUFDO0FBQy9ILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDOzs7Ozs7Ozs7QUFvQnpGLE1BQU0sT0FBTyxvQkFBd0IsU0FBUSxRQUFXOzs7Ozs7Ozs7Ozs7O0lBdUJ0RCxZQUFZLFFBQXlCLEVBQ3pCLGtCQUFxQyxFQUNyQyxXQUFvQyxFQUNqQixJQUFZLEVBQ25CLElBQW9CLEVBQ3RCLFFBQWtCLEVBQ2xCLElBQTBCLEVBQ0gsTUFBK0IsRUFDOUMsU0FBZSxFQUNqQyxRQUFtQjtRQUM3QixLQUFLLENBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFF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QyxFQUFDLENBQUM7U0FDN0Q7UUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztRQUVoQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7WUFqUkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2dCQUN6QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLGtCQUFrQjtnQkFFNUIsSUFBSSxFQUFFOztvQkFDSixPQUFPLEVBQUUsZUFBZTtpQkFDekI7Z0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNoRDs7OztZQXBDQyxlQUFlO1lBTGYsaUJBQWlCO1lBR2pCLFVBQVU7eUNBaUVHLFNBQVMsU0FBQyxNQUFNO1lBbkR0QixjQUFjLHVCQW9EUixRQUFRO1lBM0RyQixRQUFRO1lBU0QsaUJBQWlCOzRDQXFEWCxNQUFNLFNBQUMsYUFBYTs0Q0FDcEIsTUFBTSxTQUFDLFFBQVE7WUExRHJCLFFBQVE7Ozs7Ozs7SUE0Q2YseUNBQXdDOzs7OztJQUN4Qyw2Q0FBOEM7Ozs7O0lBQzlDLDJDQUF1Qzs7Ozs7SUFDdkMsOENBQTBDOzs7OztJQUMxQyxnREFBa0M7Ozs7O0lBa0VsQyw4Q0FBb0c7Ozs7O0lBa0NwRyxxQ0FBd0M7Ozs7O0lBN0Y1Qix3Q0FBNEI7Ozs7O0lBQzVCLG9DQUFvQzs7Ozs7SUFDcEMsc0NBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBBdHRyaWJ1dGUsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBJbmplY3QsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgSW5qZWN0b3IsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IENES19UQUJMRV9URU1QTEFURSwgQ2RrVGFibGUsIERhdGFSb3dPdXRsZXQsIENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmLCBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYgfSBmcm9tICcuLi9kaXJlY3RpdmVzL2NvbHVtbi1kZWYnO1xuaW1wb3J0IHsgUGJsVmlydHVhbFNjcm9sbEZvck9mIH0gZnJvbSAnLi4vZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtZm9yLW9mJztcblxuLyoqXG4gKiBXcmFwcGVyIGZvciB0aGUgQ2RrVGFibGUgdGhhdCBleHRlbmRzIGl0J3MgZnVuY3Rpb25hbGl0eSB0byBzdXBwb3J0IHZhcmlvdXMgdGFibGUgZmVhdHVyZXMuXG4gKiBUaGlzIHdyYXBwZXIgYWxzbyBhcHBsaWVzIE1hdGVyaWFsIERlc2lnbiB0YWJsZSBzdHlsZXMgKGkuZS4gYE1hdFRhYmxlYCBzdHlsZXMpLlxuICpcbiAqIE1vc3Qgb2YgdGhlIGV4dGVuc2lvbnMgYXJlIGRvbmUgdXNpbmcgbWl4aW5zLCB0aGlzIGlzIG1vc3RseSBmb3IgY2xhcml0eSBhbmQgc2VwYXJhdGlvbiBvZiB0aGUgZmVhdHVyZXMgYWRkZWQuXG4gKiBUaGlzIGFwcHJvYWNoIHdpbGwgYWxsb3cgZWFzeSByZW1vdmFsIHdoZW4gYSBmZWF0dXJlIGlzIG5vIGxvbmdlciByZXF1aXJlZC9pbXBsZW1lbnRlZCBuYXRpdmVseS5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLWNkay10YWJsZScsXG4gIGV4cG9ydEFzOiAncGJsQ2RrVGFibGUnLFxuICB0ZW1wbGF0ZTogQ0RLX1RBQkxFX1RFTVBMQVRFLFxuICBzdHlsZVVybHM6IFsnLi9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAncGJsLWNkay10YWJsZScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxDZGtUYWJsZUNvbXBvbmVudDxUPiBleHRlbmRzIENka1RhYmxlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBnZXQgX2VsZW1lbnQoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50OyB9XG5cbiAgZ2V0IG9uUmVuZGVyUm93cygpOiBPYnNlcnZhYmxlPERhdGFSb3dPdXRsZXQ+IHtcbiAgICBpZiAoIXRoaXMub25SZW5kZXJSb3dzJCkge1xuICAgICAgdGhpcy5vblJlbmRlclJvd3MkID0gbmV3IFN1YmplY3Q8RGF0YVJvd091dGxldD4oKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub25SZW5kZXJSb3dzJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGdldCBtaW5XaWR0aCgpOiBudW1iZXIgfCBudWxsIHsgcmV0dXJuIHRoaXMuX21pbldpZHRoOyB9XG4gIHNldCBtaW5XaWR0aCh2YWx1ZTogbnVtYmVyIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbldpZHRoID0gdmFsdWUgfHwgbnVsbDtcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlLm1pbldpZHRoID0gdmFsdWUgPyB2YWx1ZSArICdweCcgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluV2lkdGg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIG9uUmVuZGVyUm93cyQ6IFN1YmplY3Q8RGF0YVJvd091dGxldD47XG4gIHByaXZhdGUgX2xhc3RTdGlja3k6IFBibE5ncmlkQ29sdW1uRGVmO1xuICBwcml2YXRlIF9sYXN0U3RpY2t5RW5kOiBQYmxOZ3JpZENvbHVtbkRlZjtcbiAgcHJpdmF0ZSBfaXNTdGlja3lQZW5kaW5nOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQEF0dHJpYnV0ZSgncm9sZScpIHJvbGU6IHN0cmluZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHByb3RlY3RlZCBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgQEluamVjdChFWFRfQVBJX1RPS0VOKSBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPixcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55LFxuICAgICAgICAgICAgICBwbGF0Zm9ybT86IFBsYXRmb3JtKSB7XG4gICAgc3VwZXIoX2RpZmZlcnMsIF9jaGFuZ2VEZXRlY3RvclJlZiwgX2VsZW1lbnRSZWYsIHJvbGUsIF9kaXIsIF9kb2N1bWVudCwgcGxhdGZvcm0pO1xuICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUgPSB0aGlzO1xuICAgIHRoaXMudHJhY2tCeSA9IHRoaXMuZ3JpZC50cmFja0J5O1xuXG4gICAgZXh0QXBpLmV2ZW50cy5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgaWYgKGUua2luZCA9PT0gJ2JlZm9yZUludmFsaWRhdGVIZWFkZXJzJykge1xuICAgICAgICBpZiAodGhpcy5fbGFzdFN0aWNreSkge1xuICAgICAgICAgIHRoaXMuX2xhc3RTdGlja3kucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1zdGlja3ktc3RhcnQnKSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fbGFzdFN0aWNreUVuZCkge1xuICAgICAgICAgIHRoaXMuX2xhc3RTdGlja3lFbmQucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1zdGlja3ktZW5kJykpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTdGlja3lFbmQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpIHtcbiAgICBpZiAodGhpcy5faXNTdGlja3lQZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faXNTdGlja3lQZW5kaW5nID0gdHJ1ZTtcbiAgICBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgdGhpcy5faXNTdGlja3lQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIGlmICh0aGlzLm9uUmVuZGVyUm93cyQpIHtcbiAgICAgIHRoaXMub25SZW5kZXJSb3dzJC5jb21wbGV0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnZpcnR1YWxTY3JvbGxEZXN0cm95KCk7XG4gIH1cblxuICAvLyNyZWdpb24gQ1NTLUNMQVNTLUNPTlRST0xcbiAgYWRkQ2xhc3MoY3NzQ2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3NOYW1lKTtcbiAgfVxuXG4gIHJlbW92ZUNsYXNzKGNzc0NsYXNzTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNzc0NsYXNzTmFtZSk7XG4gIH1cbiAgLy8jZW5kcmVnaW9uIENTUy1DTEFTUy1DT05UUk9MXG5cbiAgLy8jcmVnaW9uIENMRUFSLVJPVy1ERUZTXG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBwcml2YXRlIF9jYWNoZWRSb3dEZWZzID0geyBoZWFkZXI6IG5ldyBTZXQ8Q2RrSGVhZGVyUm93RGVmPigpLCBmb290ZXI6IG5ldyBTZXQ8Q2RrRm9vdGVyUm93RGVmPigpIH07IC8vdHNsaW50OmRpc2FibGUtbGluZVxuXG4gIC8vIFRPRE86IHJlbW92ZSBpZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xMzAwMCBpcyBwdXNoZWRcbiAgYWRkSGVhZGVyUm93RGVmKGhlYWRlclJvd0RlZjogQ2RrSGVhZGVyUm93RGVmKTogdm9pZCB7XG4gICAgc3VwZXIuYWRkSGVhZGVyUm93RGVmKGhlYWRlclJvd0RlZik7XG4gICAgdGhpcy5fY2FjaGVkUm93RGVmcy5oZWFkZXIuYWRkKGhlYWRlclJvd0RlZik7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIGNsZWFySGVhZGVyUm93RGVmcygpOiB2b2lkIHtcbiAgICBjb25zdCB7IGhlYWRlciB9ID0gdGhpcy5fY2FjaGVkUm93RGVmcztcbiAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBBcnJheS5mcm9tKGhlYWRlci52YWx1ZXMoKSkpIHtcbiAgICAgIHRoaXMucmVtb3ZlSGVhZGVyUm93RGVmKHJvd0RlZik7XG4gICAgfVxuICAgIGhlYWRlci5jbGVhcigpO1xuICB9XG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBhZGRGb290ZXJSb3dEZWYoZm9vdGVyUm93RGVmOiBDZGtGb290ZXJSb3dEZWYpOiB2b2lkIHtcbiAgICBzdXBlci5hZGRGb290ZXJSb3dEZWYoZm9vdGVyUm93RGVmKTtcbiAgICB0aGlzLl9jYWNoZWRSb3dEZWZzLmZvb3Rlci5hZGQoZm9vdGVyUm93RGVmKTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZSBpZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xMzAwMCBpcyBwdXNoZWRcbiAgY2xlYXJGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZm9vdGVyIH0gPSB0aGlzLl9jYWNoZWRSb3dEZWZzO1xuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIEFycmF5LmZyb20oZm9vdGVyLnZhbHVlcygpKSkge1xuICAgICAgdGhpcy5yZW1vdmVGb290ZXJSb3dEZWYocm93RGVmKTtcbiAgICB9XG4gICAgZm9vdGVyLmNsZWFyKCk7XG4gIH1cbiAgLy8jZW5kcmVnaW9uIENMRUFSLVJPVy1ERUZTXG5cbiAgLy8jcmVnaW9uIFZJUlRVQUwtU0NST0xMXG4gIHByaXZhdGUgZm9yT2Y6IFBibFZpcnR1YWxTY3JvbGxGb3JPZjxUPjsgLy90c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbiAgYXR0YWNoVmlld1BvcnQoKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2hWaWV3UG9ydCgpO1xuICAgIHRoaXMuZm9yT2YgPSBuZXcgUGJsVmlydHVhbFNjcm9sbEZvck9mPFQ+KHRoaXMuZXh0QXBpLCB0aGlzLmluamVjdG9yLmdldChOZ1pvbmUpKTtcbiAgfVxuXG4gIGRldGFjaFZpZXdQb3J0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvck9mKSB7XG4gICAgICB0aGlzLmZvck9mLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuZm9yT2YgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2aXJ0dWFsU2Nyb2xsRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuZGV0YWNoVmlld1BvcnQoKTtcbiAgfVxuICAvLyNlbmRyZWdpb24gVklSVFVBTC1TQ1JPTExcblxuICAvKipcbiAgICogQW4gYWxpYXMgZm9yIGBfY2FjaGVSb3dEZWZzKClgXG4gICAqL1xuICB1cGRhdGVSb3dEZWZDYWNoZSgpOiB2b2lkIHtcbiAgICAodGhpcyBhcyBhbnkpLl9jYWNoZVJvd0RlZnMoKTtcbiAgfVxuXG4gIHJlbmRlclJvd3MoKTogdm9pZCB7XG4gICAgc3VwZXIucmVuZGVyUm93cygpO1xuXG4gICAgLy8gVGhlIHByb2JsZW0gb2YgaW5oZXJpdGFuY2UgcmlnaHQgYXQgeW91ciBmYWNlXG4gICAgLy8gQmVjYXVzZSBtYXRlcmlhbCBkb2VzIG5vdCBhbGxvdyB1cyB0byBjb250cm9sIHRoZSBjb250ZXh0IGdlbmVyYXRpb24gZm9yIGEgcm93IHdlIG5lZWQgdG8gZ2V0IGNsZXZlci5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9jb21wb25lbnRzL2lzc3Vlcy8xNDE5OVxuICAgIC8vIFRPRE86IElmIHRoZXkgZG8gYWxsb3cgY29udHJvbGxpbmcgY29udGV4dCBnZW5lcmF0aW9uLCByZW1vdmUgdGhpcyBhbmQgYXBwbHkgdGhlaXIgc29sdXRpb24uXG4gICAgY29uc3Qgdmlld0NvbnRhaW5lciA9IHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgIGZvciAobGV0IHJlbmRlckluZGV4ID0gMCwgY291bnQgPSB2aWV3Q29udGFpbmVyLmxlbmd0aDsgcmVuZGVySW5kZXggPCBjb3VudDsgcmVuZGVySW5kZXgrKykge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IHZpZXdDb250YWluZXIuZ2V0KHJlbmRlckluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj47XG4gICAgICBjb25zdCBjb250ZXh0ID0gdmlld1JlZi5jb250ZXh0O1xuICAgICAgY29udGV4dC5ncmlkSW5zdGFuY2UgPSB0aGlzLmdyaWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub25SZW5kZXJSb3dzJCkge1xuICAgICAgdGhpcy5vblJlbmRlclJvd3MkLm5leHQodGhpcy5fcm93T3V0bGV0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgcnVuIGNoYW5nZSBkZXRlY3Rpb24gZm9yIHJvd3MuXG4gICAqIFlvdSBjYW4gcnVuIGl0IGZvciBzcGVjaWZpYyBncm91cHMgb3IgZm9yIGFsbCByb3dzLlxuICAgKi9cbiAgc3luY1Jvd3Mocm93VHlwZT86ICdhbGwnIHwgYm9vbGVhbiwgZGV0ZWN0Q2hhbmdlcz86IGJvb2xlYW4pOiB2b2lkO1xuICBzeW5jUm93cyhyb3dUeXBlOiAnaGVhZGVyJyB8ICdkYXRhJyB8ICdmb290ZXInLCBkZXRlY3RDaGFuZ2VzOiBib29sZWFuLCAuLi5yb3dzOiBudW1iZXJbXSk6IHZvaWQ7XG4gIHN5bmNSb3dzKHJvd1R5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIC4uLnJvd3M6IG51bWJlcltdKTogdm9pZDtcbiAgc3luY1Jvd3Mocm93VHlwZTogJ2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJyB8ICdhbGwnIHwgYm9vbGVhbiA9IGZhbHNlLCAuLi5yb3dzOiBhbnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IGRldGVjdENoYW5nZXM6IGJvb2xlYW4gPSB0eXBlb2Ygcm93VHlwZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICA/IHJvd1R5cGVcbiAgICAgIDogdHlwZW9mIHJvd3NbMF0gPT09ICdib29sZWFuJ1xuICAgICAgICA/IHJvd3Muc2hpZnQoKVxuICAgICAgICA6IGZhbHNlXG4gICAgO1xuXG4gICAgbGV0IHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICAgIHN3aXRjaChyb3dUeXBlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICB2Y1JlZiA9IHRoaXMuX2hlYWRlclJvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICB2Y1JlZiA9IHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHZjUmVmID0gdGhpcy5fZm9vdGVyUm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gYm9vbGVhbiBvciAnYWxsJ1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgaWYgKGRldGVjdENoYW5nZXMpIHtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZVNwZWNpZmljUm93cyA9IHJvd3MubGVuZ3RoID4gMDtcbiAgICBjb25zdCBjb3VudCA9IHVzZVNwZWNpZmljUm93cyA/IHJvd3MubGVuZ3RoIDogdmNSZWYubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgcmVuZGVySW5kZXggPSAwOyByZW5kZXJJbmRleCA8IGNvdW50OyByZW5kZXJJbmRleCsrKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdmNSZWYuZ2V0KHVzZVNwZWNpZmljUm93cyA/IHJvd3NbcmVuZGVySW5kZXhdIDogcmVuZGVySW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgaWYgKHZpZXdSZWYpIHtcbiAgICAgICAgdmlld1JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgaWYgKGRldGVjdENoYW5nZXMpIHtcbiAgICAgICAgICB2aWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBibEZvcmNlUmVuZGVyRGF0YVJvd3MoKTogdm9pZCB7XG4gICAgdHJ5e1xuICAgICAgKHRoaXMgYXMgYW55KS5fZm9yY2VSZW5kZXJEYXRhUm93cygpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICB0aGlzLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9IHRoaXMubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpIHtcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5ncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucztcbiAgICBsZXQgc3RpY2t5OiBQYmxOZ3JpZENvbHVtbkRlZiwgc3RpY2t5RW5kOiBQYmxOZ3JpZENvbHVtbkRlZjtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjb2x1bW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBpZiAoY29sdW1uc1tpXS5jb2x1bW5EZWYgJiYgY29sdW1uc1tpXS5jb2x1bW5EZWYuc3RpY2t5KSB7XG4gICAgICAgIHN0aWNreSA9IGNvbHVtbnNbaV0uY29sdW1uRGVmO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBjb2x1bW5zLmxlbmd0aCAtIDE7IGkgPiAtMTsgaS0tKSB7XG4gICAgICBpZiAoY29sdW1uc1tpXS5jb2x1bW5EZWYgJiYgY29sdW1uc1tpXS5jb2x1bW5EZWYuc3RpY2t5RW5kKSB7XG4gICAgICAgIHN0aWNreUVuZCA9IGNvbHVtbnNbaV0uY29sdW1uRGVmO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5KSB7XG4gICAgICB0aGlzLl9sYXN0U3RpY2t5LnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1zdGlja3ktc3RhcnQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHN0aWNreSkge1xuICAgICAgc3RpY2t5LnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1zdGlja3ktc3RhcnQnKSk7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RTdGlja3kgPSBzdGlja3k7XG5cbiAgICBpZiAodGhpcy5fbGFzdFN0aWNreUVuZCkge1xuICAgICAgdGhpcy5fbGFzdFN0aWNreUVuZC5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtc3RpY2t5LWVuZCcpKTtcbiAgICB9XG5cbiAgICBpZiAoc3RpY2t5RW5kKSB7XG4gICAgICBzdGlja3lFbmQucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLXN0aWNreS1lbmQnKSk7XG4gICAgfVxuICAgIHRoaXMuX2xhc3RTdGlja3lFbmQgPSBzdGlja3lFbmQ7XG5cbiAgICBzdXBlci51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgfVxufVxuIl19