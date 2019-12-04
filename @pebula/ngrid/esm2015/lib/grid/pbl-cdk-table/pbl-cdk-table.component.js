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
    PblCdkTableComponent.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblCdkTableComponent.prototype.extApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJsLWNkay10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQ0wsU0FBUyxFQUNULHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixVQUFVLEVBRVYsZUFBZSxFQUVmLFFBQVEsRUFDUixpQkFBaUIsRUFFakIsUUFBUSxFQUNSLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQStELE1BQU0sb0JBQW9CLENBQUM7QUFDL0gsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBd0IsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0RBQWtELENBQUM7Ozs7Ozs7OztBQW9CekYsTUFBTSxPQUFPLG9CQUF3QixTQUFRLFFBQVc7Ozs7Ozs7Ozs7Ozs7SUF1QnRELFlBQVksUUFBeUIsRUFDekIsa0JBQXFDLEVBQ3JDLFdBQW9DLEVBQ2pCLElBQVksRUFDbkIsSUFBb0IsRUFDdEIsUUFBa0IsRUFDbEIsSUFBMEIsRUFDSCxNQUErQixFQUM5QyxTQUFlLEVBQ2pDLFFBQW1CO1FBQzdCLEtBQUssQ0FBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUUs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LEVBQUMsQ0FBQztTQUM3RDtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDO1FBRWhDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ25DLENBQUM7OztZQWpSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsa0JBQWtCO2dCQUU1QixJQUFJLEVBQUU7O29CQUNKLE9BQU8sRUFBRSxlQUFlO2lCQUN6QjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O2FBQ2hEOzs7O1lBcENDLGVBQWU7WUFMZixpQkFBaUI7WUFHakIsVUFBVTt5Q0FpRUcsU0FBUyxTQUFDLE1BQU07WUFuRHRCLGNBQWMsdUJBb0RSLFFBQVE7WUEzRHJCLFFBQVE7WUFTRCxpQkFBaUI7NENBcURYLE1BQU0sU0FBQyxhQUFhOzRDQUNwQixNQUFNLFNBQUMsUUFBUTtZQTFEckIsUUFBUTs7Ozs7OztJQTRDZix5Q0FBd0M7Ozs7O0lBQ3hDLDZDQUE4Qzs7Ozs7SUFDOUMsMkNBQXVDOzs7OztJQUN2Qyw4Q0FBMEM7Ozs7O0lBQzFDLGdEQUFrQzs7Ozs7SUFrRWxDLDhDQUFvRzs7Ozs7SUFrQ3BHLHFDQUF3Qzs7Ozs7SUE3RjVCLHdDQUE0Qjs7Ozs7SUFDNUIsb0NBQW9DOzs7OztJQUNwQyxzQ0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIEF0dHJpYnV0ZSxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEluamVjdCxcbiAgRWxlbWVudFJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBJbmplY3RvcixcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ0RLX1RBQkxFX1RFTVBMQVRFLCBDZGtUYWJsZSwgRGF0YVJvd091dGxldCwgQ2RrSGVhZGVyUm93RGVmLCBDZGtGb290ZXJSb3dEZWYsIFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpLCBFWFRfQVBJX1RPS0VOIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvY29sdW1uLWRlZic7XG5pbXBvcnQgeyBQYmxWaXJ0dWFsU2Nyb2xsRm9yT2YgfSBmcm9tICcuLi9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuXG4vKipcbiAqIFdyYXBwZXIgZm9yIHRoZSBDZGtUYWJsZSB0aGF0IGV4dGVuZHMgaXQncyBmdW5jdGlvbmFsaXR5IHRvIHN1cHBvcnQgdmFyaW91cyB0YWJsZSBmZWF0dXJlcy5cbiAqIFRoaXMgd3JhcHBlciBhbHNvIGFwcGxpZXMgTWF0ZXJpYWwgRGVzaWduIHRhYmxlIHN0eWxlcyAoaS5lLiBgTWF0VGFibGVgIHN0eWxlcykuXG4gKlxuICogTW9zdCBvZiB0aGUgZXh0ZW5zaW9ucyBhcmUgZG9uZSB1c2luZyBtaXhpbnMsIHRoaXMgaXMgbW9zdGx5IGZvciBjbGFyaXR5IGFuZCBzZXBhcmF0aW9uIG9mIHRoZSBmZWF0dXJlcyBhZGRlZC5cbiAqIFRoaXMgYXBwcm9hY2ggd2lsbCBhbGxvdyBlYXN5IHJlbW92YWwgd2hlbiBhIGZlYXR1cmUgaXMgbm8gbG9uZ2VyIHJlcXVpcmVkL2ltcGxlbWVudGVkIG5hdGl2ZWx5LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtY2RrLXRhYmxlJyxcbiAgZXhwb3J0QXM6ICdwYmxDZGtUYWJsZScsXG4gIHRlbXBsYXRlOiBDREtfVEFCTEVfVEVNUExBVEUsXG4gIHN0eWxlVXJsczogWycuL3BibC1jZGstdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdwYmwtY2RrLXRhYmxlJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBibENka1RhYmxlQ29tcG9uZW50PFQ+IGV4dGVuZHMgQ2RrVGFibGU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGdldCBfZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IH1cblxuICBnZXQgb25SZW5kZXJSb3dzKCk6IE9ic2VydmFibGU8RGF0YVJvd091dGxldD4ge1xuICAgIGlmICghdGhpcy5vblJlbmRlclJvd3MkKSB7XG4gICAgICB0aGlzLm9uUmVuZGVyUm93cyQgPSBuZXcgU3ViamVjdDxEYXRhUm93T3V0bGV0PigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vblJlbmRlclJvd3MkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB8IG51bGwgeyByZXR1cm4gdGhpcy5fbWluV2lkdGg7IH1cbiAgc2V0IG1pbldpZHRoKHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluV2lkdGggPSB2YWx1ZSB8fCBudWxsO1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUubWluV2lkdGggPSB2YWx1ZSA/IHZhbHVlICsgJ3B4JyA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9taW5XaWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb25SZW5kZXJSb3dzJDogU3ViamVjdDxEYXRhUm93T3V0bGV0PjtcbiAgcHJpdmF0ZSBfbGFzdFN0aWNreTogUGJsTmdyaWRDb2x1bW5EZWY7XG4gIHByaXZhdGUgX2xhc3RTdGlja3lFbmQ6IFBibE5ncmlkQ29sdW1uRGVmO1xuICBwcml2YXRlIF9pc1N0aWNreVBlbmRpbmc6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdyb2xlJykgcm9sZTogc3RyaW5nLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KEVYVF9BUElfVE9LRU4pIHByb3RlY3RlZCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnksXG4gICAgICAgICAgICAgIHBsYXRmb3JtPzogUGxhdGZvcm0pIHtcbiAgICBzdXBlcihfZGlmZmVycywgX2NoYW5nZURldGVjdG9yUmVmLCBfZWxlbWVudFJlZiwgcm9sZSwgX2RpciwgX2RvY3VtZW50LCBwbGF0Zm9ybSk7XG4gICAgdGhpcy5ncmlkLl9jZGtUYWJsZSA9IHRoaXM7XG4gICAgdGhpcy50cmFja0J5ID0gdGhpcy5ncmlkLnRyYWNrQnk7XG5cbiAgICBleHRBcGkuZXZlbnRzLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICBpZiAoZS5raW5kID09PSAnYmVmb3JlSW52YWxpZGF0ZUhlYWRlcnMnKSB7XG4gICAgICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5KSB7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreS5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXN0aWNreS1zdGFydCcpKTtcbiAgICAgICAgICB0aGlzLl9sYXN0U3RpY2t5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5RW5kKSB7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreUVuZC5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXN0aWNreS1lbmQnKSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreUVuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCkge1xuICAgIGlmICh0aGlzLl9pc1N0aWNreVBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9pc1N0aWNreVBlbmRpbmcgPSB0cnVlO1xuICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc1N0aWNreVBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgaWYgKHRoaXMub25SZW5kZXJSb3dzJCkge1xuICAgICAgdGhpcy5vblJlbmRlclJvd3MkLmNvbXBsZXRlKCk7XG4gICAgfVxuICAgIHRoaXMudmlydHVhbFNjcm9sbERlc3Ryb3koKTtcbiAgfVxuXG4gIC8vI3JlZ2lvbiBDU1MtQ0xBU1MtQ09OVFJPTFxuICBhZGRDbGFzcyhjc3NDbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzc05hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoY3NzQ2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3NOYW1lKTtcbiAgfVxuICAvLyNlbmRyZWdpb24gQ1NTLUNMQVNTLUNPTlRST0xcblxuICAvLyNyZWdpb24gQ0xFQVItUk9XLURFRlNcblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIHByaXZhdGUgX2NhY2hlZFJvd0RlZnMgPSB7IGhlYWRlcjogbmV3IFNldDxDZGtIZWFkZXJSb3dEZWY+KCksIGZvb3RlcjogbmV3IFNldDxDZGtGb290ZXJSb3dEZWY+KCkgfTsgLy90c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBhZGRIZWFkZXJSb3dEZWYoaGVhZGVyUm93RGVmOiBDZGtIZWFkZXJSb3dEZWYpOiB2b2lkIHtcbiAgICBzdXBlci5hZGRIZWFkZXJSb3dEZWYoaGVhZGVyUm93RGVmKTtcbiAgICB0aGlzLl9jYWNoZWRSb3dEZWZzLmhlYWRlci5hZGQoaGVhZGVyUm93RGVmKTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZSBpZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xMzAwMCBpcyBwdXNoZWRcbiAgY2xlYXJIZWFkZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgaGVhZGVyIH0gPSB0aGlzLl9jYWNoZWRSb3dEZWZzO1xuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIEFycmF5LmZyb20oaGVhZGVyLnZhbHVlcygpKSkge1xuICAgICAgdGhpcy5yZW1vdmVIZWFkZXJSb3dEZWYocm93RGVmKTtcbiAgICB9XG4gICAgaGVhZGVyLmNsZWFyKCk7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIGFkZEZvb3RlclJvd0RlZihmb290ZXJSb3dEZWY6IENka0Zvb3RlclJvd0RlZik6IHZvaWQge1xuICAgIHN1cGVyLmFkZEZvb3RlclJvd0RlZihmb290ZXJSb3dEZWYpO1xuICAgIHRoaXMuX2NhY2hlZFJvd0RlZnMuZm9vdGVyLmFkZChmb290ZXJSb3dEZWYpO1xuICB9XG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBjbGVhckZvb3RlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBmb290ZXIgfSA9IHRoaXMuX2NhY2hlZFJvd0RlZnM7XG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgQXJyYXkuZnJvbShmb290ZXIudmFsdWVzKCkpKSB7XG4gICAgICB0aGlzLnJlbW92ZUZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgIH1cbiAgICBmb290ZXIuY2xlYXIoKTtcbiAgfVxuICAvLyNlbmRyZWdpb24gQ0xFQVItUk9XLURFRlNcblxuICAvLyNyZWdpb24gVklSVFVBTC1TQ1JPTExcbiAgcHJpdmF0ZSBmb3JPZjogUGJsVmlydHVhbFNjcm9sbEZvck9mPFQ+OyAvL3RzbGludDpkaXNhYmxlLWxpbmVcblxuICBhdHRhY2hWaWV3UG9ydCgpOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgdGhpcy5mb3JPZiA9IG5ldyBQYmxWaXJ0dWFsU2Nyb2xsRm9yT2Y8VD4odGhpcy5leHRBcGksIHRoaXMuaW5qZWN0b3IuZ2V0KE5nWm9uZSkpO1xuICB9XG5cbiAgZGV0YWNoVmlld1BvcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9yT2YpIHtcbiAgICAgIHRoaXMuZm9yT2YuZGVzdHJveSgpO1xuICAgICAgdGhpcy5mb3JPZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpcnR1YWxTY3JvbGxEZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5kZXRhY2hWaWV3UG9ydCgpO1xuICB9XG4gIC8vI2VuZHJlZ2lvbiBWSVJUVUFMLVNDUk9MTFxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyBmb3IgYF9jYWNoZVJvd0RlZnMoKWBcbiAgICovXG4gIHVwZGF0ZVJvd0RlZkNhY2hlKCk6IHZvaWQge1xuICAgICh0aGlzIGFzIGFueSkuX2NhY2hlUm93RGVmcygpO1xuICB9XG5cbiAgcmVuZGVyUm93cygpOiB2b2lkIHtcbiAgICBzdXBlci5yZW5kZXJSb3dzKCk7XG5cbiAgICAvLyBUaGUgcHJvYmxlbSBvZiBpbmhlcml0YW5jZSByaWdodCBhdCB5b3VyIGZhY2VcbiAgICAvLyBCZWNhdXNlIG1hdGVyaWFsIGRvZXMgbm90IGFsbG93IHVzIHRvIGNvbnRyb2wgdGhlIGNvbnRleHQgZ2VuZXJhdGlvbiBmb3IgYSByb3cgd2UgbmVlZCB0byBnZXQgY2xldmVyLlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE0MTk5XG4gICAgLy8gVE9ETzogSWYgdGhleSBkbyBhbGxvdyBjb250cm9sbGluZyBjb250ZXh0IGdlbmVyYXRpb24sIHJlbW92ZSB0aGlzIGFuZCBhcHBseSB0aGVpciBzb2x1dGlvbi5cbiAgICBjb25zdCB2aWV3Q29udGFpbmVyID0gdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgZm9yIChsZXQgcmVuZGVySW5kZXggPSAwLCBjb3VudCA9IHZpZXdDb250YWluZXIubGVuZ3RoOyByZW5kZXJJbmRleCA8IGNvdW50OyByZW5kZXJJbmRleCsrKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdmlld0NvbnRhaW5lci5nZXQocmVuZGVySW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PjtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB2aWV3UmVmLmNvbnRleHQ7XG4gICAgICBjb250ZXh0LmdyaWRJbnN0YW5jZSA9IHRoaXMuZ3JpZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vblJlbmRlclJvd3MkKSB7XG4gICAgICB0aGlzLm9uUmVuZGVyUm93cyQubmV4dCh0aGlzLl9yb3dPdXRsZXQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjZSBydW4gY2hhbmdlIGRldGVjdGlvbiBmb3Igcm93cy5cbiAgICogWW91IGNhbiBydW4gaXQgZm9yIHNwZWNpZmljIGdyb3VwcyBvciBmb3IgYWxsIHJvd3MuXG4gICAqL1xuICBzeW5jUm93cyhyb3dUeXBlPzogJ2FsbCcgfCBib29sZWFuLCBkZXRlY3RDaGFuZ2VzPzogYm9vbGVhbik6IHZvaWQ7XG4gIHN5bmNSb3dzKHJvd1R5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIGRldGVjdENoYW5nZXM6IGJvb2xlYW4sIC4uLnJvd3M6IG51bWJlcltdKTogdm9pZDtcbiAgc3luY1Jvd3Mocm93VHlwZTogJ2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJywgLi4ucm93czogbnVtYmVyW10pOiB2b2lkO1xuICBzeW5jUm93cyhyb3dUeXBlOiAnaGVhZGVyJyB8ICdkYXRhJyB8ICdmb290ZXInIHwgJ2FsbCcgfCBib29sZWFuID0gZmFsc2UsIC4uLnJvd3M6IGFueVtdKTogdm9pZCB7XG4gICAgY29uc3QgZGV0ZWN0Q2hhbmdlczogYm9vbGVhbiA9IHR5cGVvZiByb3dUeXBlID09PSAnYm9vbGVhbidcbiAgICAgID8gcm93VHlwZVxuICAgICAgOiB0eXBlb2Ygcm93c1swXSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgID8gcm93cy5zaGlmdCgpXG4gICAgICAgIDogZmFsc2VcbiAgICA7XG5cbiAgICBsZXQgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG4gICAgc3dpdGNoKHJvd1R5cGUpIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgIHZjUmVmID0gdGhpcy5faGVhZGVyUm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICAgIHZjUmVmID0gdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgdmNSZWYgPSB0aGlzLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBib29sZWFuIG9yICdhbGwnXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICBpZiAoZGV0ZWN0Q2hhbmdlcykge1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXNlU3BlY2lmaWNSb3dzID0gcm93cy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGNvdW50ID0gdXNlU3BlY2lmaWNSb3dzID8gcm93cy5sZW5ndGggOiB2Y1JlZi5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCByZW5kZXJJbmRleCA9IDA7IHJlbmRlckluZGV4IDwgY291bnQ7IHJlbmRlckluZGV4KyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB2Y1JlZi5nZXQodXNlU3BlY2lmaWNSb3dzID8gcm93c1tyZW5kZXJJbmRleF0gOiByZW5kZXJJbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICBpZiAodmlld1JlZikge1xuICAgICAgICB2aWV3UmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICBpZiAoZGV0ZWN0Q2hhbmdlcykge1xuICAgICAgICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcGJsRm9yY2VSZW5kZXJEYXRhUm93cygpOiB2b2lkIHtcbiAgICB0cnl7XG4gICAgICAodGhpcyBhcyBhbnkpLl9mb3JjZVJlbmRlckRhdGFSb3dzKCk7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIHRoaXMubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gdGhpcy5tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCkge1xuICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zO1xuICAgIGxldCBzdGlja3k6IFBibE5ncmlkQ29sdW1uRGVmLCBzdGlja3lFbmQ6IFBibE5ncmlkQ29sdW1uRGVmO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNvbHVtbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGlmIChjb2x1bW5zW2ldLmNvbHVtbkRlZiAmJiBjb2x1bW5zW2ldLmNvbHVtbkRlZi5zdGlja3kpIHtcbiAgICAgICAgc3RpY2t5ID0gY29sdW1uc1tpXS5jb2x1bW5EZWY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IGNvbHVtbnMubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcbiAgICAgIGlmIChjb2x1bW5zW2ldLmNvbHVtbkRlZiAmJiBjb2x1bW5zW2ldLmNvbHVtbkRlZi5zdGlja3lFbmQpIHtcbiAgICAgICAgc3RpY2t5RW5kID0gY29sdW1uc1tpXS5jb2x1bW5EZWY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xhc3RTdGlja3kpIHtcbiAgICAgIHRoaXMuX2xhc3RTdGlja3kucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXN0aWNreS1zdGFydCcpKTtcbiAgICB9XG5cbiAgICBpZiAoc3RpY2t5KSB7XG4gICAgICBzdGlja3kucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLXN0aWNreS1zdGFydCcpKTtcbiAgICB9XG4gICAgdGhpcy5fbGFzdFN0aWNreSA9IHN0aWNreTtcblxuICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5RW5kKSB7XG4gICAgICB0aGlzLl9sYXN0U3RpY2t5RW5kLnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1zdGlja3ktZW5kJykpO1xuICAgIH1cblxuICAgIGlmIChzdGlja3lFbmQpIHtcbiAgICAgIHN0aWNreUVuZC5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtc3RpY2t5LWVuZCcpKTtcbiAgICB9XG4gICAgdGhpcy5fbGFzdFN0aWNreUVuZCA9IHN0aWNreUVuZDtcblxuICAgIHN1cGVyLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICB9XG59XG4iXX0=