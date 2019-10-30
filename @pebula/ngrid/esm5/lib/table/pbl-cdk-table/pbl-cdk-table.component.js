/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PblCdkTableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PblCdkTableComponent, _super);
    function PblCdkTableComponent(_differs, _changeDetectorRef, _elementRef, role, _dir, injector, table, extApi, _document, platform) {
        var _this = _super.call(this, _differs, _changeDetectorRef, _elementRef, role, _dir, _document, platform) || this;
        _this.injector = injector;
        _this.table = table;
        _this.extApi = extApi;
        _this._minWidth = null;
        //#endregion CSS-CLASS-CONTROL
        //#region CLEAR-ROW-DEFS
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        _this._cachedRowDefs = { header: new Set(), footer: new Set() }; //tslint:disable-line
        _this.table._cdkTable = _this;
        _this.trackBy = _this.table.trackBy;
        extApi.events.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.kind === 'beforeInvalidateHeaders') {
                if (_this._lastSticky) {
                    _this._lastSticky.queryCellElements('header', 'table', 'footer')
                        .forEach((/**
                     * @param {?} el
                     * @return {?}
                     */
                    function (el) { return el.classList.remove('pbl-ngrid-sticky-start'); }));
                    _this._lastSticky = undefined;
                }
                if (_this._lastStickyEnd) {
                    _this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                        .forEach((/**
                     * @param {?} el
                     * @return {?}
                     */
                    function (el) { return el.classList.remove('pbl-ngrid-sticky-end'); }));
                    _this._lastStickyEnd = undefined;
                }
            }
        }));
        return _this;
    }
    Object.defineProperty(PblCdkTableComponent.prototype, "_element", {
        get: /**
         * @return {?}
         */
        function () { return this._elementRef.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkTableComponent.prototype, "onRenderRows", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.onRenderRows$) {
                this.onRenderRows$ = new Subject();
            }
            return this.onRenderRows$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkTableComponent.prototype, "minWidth", {
        get: /**
         * @return {?}
         */
        function () { return this._minWidth; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minWidth = value || null;
            this._element.style.minWidth = value ? value + 'px' : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.updateStickyColumnStyles = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._isStickyPending) {
            return;
        }
        this._isStickyPending = true;
        Promise.resolve()
            .then((/**
         * @return {?}
         */
        function () {
            _this._isStickyPending = false;
            _this._updateStickyColumnStyles();
        }));
    };
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        if (this.onRenderRows$) {
            this.onRenderRows$.complete();
        }
        this.virtualScrollDestroy();
    };
    //#region CSS-CLASS-CONTROL
    //#region CSS-CLASS-CONTROL
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    PblCdkTableComponent.prototype.addClass = 
    //#region CSS-CLASS-CONTROL
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    function (cssClassName) {
        this._element.classList.add(cssClassName);
    };
    /**
     * @param {?} cssClassName
     * @return {?}
     */
    PblCdkTableComponent.prototype.removeClass = /**
     * @param {?} cssClassName
     * @return {?}
     */
    function (cssClassName) {
        this._element.classList.remove(cssClassName);
    };
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    //tslint:disable-line
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} headerRowDef
     * @return {?}
     */
    PblCdkTableComponent.prototype.addHeaderRowDef = 
    //tslint:disable-line
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} headerRowDef
     * @return {?}
     */
    function (headerRowDef) {
        _super.prototype.addHeaderRowDef.call(this, headerRowDef);
        this._cachedRowDefs.header.add(headerRowDef);
    };
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.clearHeaderRowDefs = 
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        var header = this._cachedRowDefs.header;
        try {
            for (var _b = tslib_1.__values(Array.from(header.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rowDef = _c.value;
                this.removeHeaderRowDef(rowDef);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        header.clear();
    };
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} footerRowDef
     * @return {?}
     */
    PblCdkTableComponent.prototype.addFooterRowDef = 
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @param {?} footerRowDef
     * @return {?}
     */
    function (footerRowDef) {
        _super.prototype.addFooterRowDef.call(this, footerRowDef);
        this._cachedRowDefs.footer.add(footerRowDef);
    };
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.clearFooterRowDefs = 
    // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
    /**
     * @return {?}
     */
    function () {
        var e_2, _a;
        var footer = this._cachedRowDefs.footer;
        try {
            for (var _b = tslib_1.__values(Array.from(footer.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rowDef = _c.value;
                this.removeFooterRowDef(rowDef);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        footer.clear();
    };
    //tslint:disable-line
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.attachViewPort = 
    //tslint:disable-line
    /**
     * @return {?}
     */
    function () {
        this.detachViewPort();
        this.forOf = new PblVirtualScrollForOf(this.extApi, this.injector.get(NgZone));
    };
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.detachViewPort = /**
     * @return {?}
     */
    function () {
        if (this.forOf) {
            this.forOf.destroy();
            this.forOf = undefined;
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblCdkTableComponent.prototype.virtualScrollDestroy = /**
     * @private
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.detachViewPort();
    };
    //#endregion VIRTUAL-SCROLL
    /**
     * An alias for `_cacheRowDefs()`
     */
    //#endregion VIRTUAL-SCROLL
    /**
     * An alias for `_cacheRowDefs()`
     * @return {?}
     */
    PblCdkTableComponent.prototype.updateRowDefCache = 
    //#endregion VIRTUAL-SCROLL
    /**
     * An alias for `_cacheRowDefs()`
     * @return {?}
     */
    function () {
        ((/** @type {?} */ (this)))._cacheRowDefs();
    };
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.renderRows = /**
     * @return {?}
     */
    function () {
        _super.prototype.renderRows.call(this);
        // The problem of inheritance right at your face
        // Because material does not allow us to control the context generation for a row we need to get clever.
        // https://github.com/angular/components/issues/14199
        // TODO: If they do allow controlling context generation, remove this and apply their solution.
        /** @type {?} */
        var viewContainer = this._rowOutlet.viewContainer;
        for (var renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
            /** @type {?} */
            var viewRef = (/** @type {?} */ (viewContainer.get(renderIndex)));
            /** @type {?} */
            var context = viewRef.context;
            context.gridInstance = this.table;
        }
        if (this.onRenderRows$) {
            this.onRenderRows$.next(this._rowOutlet);
        }
    };
    /**
     * @param {?=} rowType
     * @param {...?} rows
     * @return {?}
     */
    PblCdkTableComponent.prototype.syncRows = /**
     * @param {?=} rowType
     * @param {...?} rows
     * @return {?}
     */
    function (rowType) {
        if (rowType === void 0) { rowType = false; }
        var rows = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rows[_i - 1] = arguments[_i];
        }
        /** @type {?} */
        var detectChanges = typeof rowType === 'boolean'
            ? rowType
            : typeof rows[0] === 'boolean'
                ? rows.shift()
                : false;
        /** @type {?} */
        var vcRef;
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
        var useSpecificRows = rows.length > 0;
        /** @type {?} */
        var count = useSpecificRows ? rows.length : vcRef.length;
        for (var renderIndex = 0; renderIndex < count; renderIndex++) {
            /** @type {?} */
            var viewRef = (/** @type {?} */ (vcRef.get(useSpecificRows ? rows[renderIndex] : renderIndex)));
            if (viewRef) {
                viewRef.markForCheck();
                if (detectChanges) {
                    viewRef.detectChanges();
                }
            }
        }
    };
    /**
     * @return {?}
     */
    PblCdkTableComponent.prototype.pblForceRenderDataRows = /**
     * @return {?}
     */
    function () {
        try {
            ((/** @type {?} */ (this)))._forceRenderDataRows();
        }
        catch (ex) {
            this.multiTemplateDataRows = this.multiTemplateDataRows;
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblCdkTableComponent.prototype._updateStickyColumnStyles = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var columns = this.table.columnApi.visibleColumns;
        /** @type {?} */
        var sticky;
        /** @type {?} */
        var stickyEnd;
        for (var i = 0, len = columns.length; i < len; i++) {
            if (columns[i].columnDef && columns[i].columnDef.sticky) {
                sticky = columns[i].columnDef;
            }
        }
        for (var i = columns.length - 1; i > -1; i--) {
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
            function (el) { return el.classList.remove('pbl-ngrid-sticky-start'); }));
        }
        if (sticky) {
            sticky.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { return el.classList.add('pbl-ngrid-sticky-start'); }));
        }
        this._lastSticky = sticky;
        if (this._lastStickyEnd) {
            this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { return el.classList.remove('pbl-ngrid-sticky-end'); }));
        }
        if (stickyEnd) {
            stickyEnd.queryCellElements('header', 'table', 'footer')
                .forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { return el.classList.add('pbl-ngrid-sticky-end'); }));
        }
        this._lastStickyEnd = stickyEnd;
        _super.prototype.updateStickyColumnStyles.call(this);
    };
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
    PblCdkTableComponent.ctorParameters = function () { return [
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
    ]; };
    return PblCdkTableComponent;
}(CdkTable));
export { PblCdkTableComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJsLWNkay10YWJsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFVBQVUsRUFFVixlQUFlLEVBRWYsUUFBUSxFQUNSLGlCQUFpQixFQUVqQixRQUFRLEVBQ1IsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBK0QsTUFBTSxvQkFBb0IsQ0FBQztBQUMvSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUF3QixhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQzs7Ozs7Ozs7O0FBU3pGO0lBVzZDLGdEQUFXO0lBdUJ0RCw4QkFBWSxRQUF5QixFQUN6QixrQkFBcUMsRUFDckMsV0FBb0MsRUFDakIsSUFBWSxFQUNuQixJQUFvQixFQUN0QixRQUFrQixFQUNsQixLQUEyQixFQUNKLE1BQStCLEVBQzlDLFNBQWUsRUFDakMsUUFBbUI7UUFUL0IsWUFVRSxrQkFBTSxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxTQWtCbEY7UUF2QnFCLGNBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBSyxHQUFMLEtBQUssQ0FBc0I7UUFDSixZQUFNLEdBQU4sTUFBTSxDQUF5QjtRQWJwRSxlQUFTLEdBQWtCLElBQUksQ0FBQzs7OztRQXNFaEMsb0JBQWMsR0FBRyxFQUFFLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBbUIsRUFBRSxNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQW1CLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQjtRQXJEeEgsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFFbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyx5QkFBeUIsRUFBRTtnQkFDeEMsSUFBSSxLQUFJLENBQUMsV0FBVyxFQUFFO29CQUNwQixLQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO3lCQUM1RCxPQUFPOzs7O29CQUFFLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBN0MsQ0FBNkMsRUFBQyxDQUFDO29CQUNqRSxLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztpQkFDOUI7Z0JBQ0QsSUFBSSxLQUFJLENBQUMsY0FBYyxFQUFFO29CQUN2QixLQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO3lCQUMvRCxPQUFPOzs7O29CQUFFLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFBM0MsQ0FBMkMsRUFBQyxDQUFDO29CQUMvRCxLQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztpQkFDakM7YUFDRjtRQUNILENBQUMsRUFBQyxDQUFDOztJQUNMLENBQUM7SUFqREQsc0JBQUksMENBQVE7Ozs7UUFBWixjQUE4QixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFdEUsc0JBQUksOENBQVk7Ozs7UUFBaEI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQzthQUNuRDtZQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFROzs7O1FBQVosY0FBZ0MsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDeEQsVUFBYSxLQUFvQjtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUM7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzdELENBQUM7OztPQUp1RDs7OztJQTBDeEQsdURBQXdCOzs7SUFBeEI7UUFBQSxpQkFXQztRQVZDLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsT0FBTyxDQUFDLE9BQU8sRUFBRTthQUNkLElBQUk7OztRQUFFO1lBQ0wsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM5QixLQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNuQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7SUFFRCwwQ0FBVzs7O0lBQVg7UUFDRSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCwyQkFBMkI7Ozs7OztJQUMzQix1Q0FBUTs7Ozs7O0lBQVIsVUFBUyxZQUFvQjtRQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFFRCwwQ0FBVzs7OztJQUFYLFVBQVksWUFBb0I7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFRRCw0RUFBNEU7Ozs7Ozs7SUFDNUUsOENBQWU7Ozs7Ozs7SUFBZixVQUFnQixZQUE2QjtRQUMzQyxpQkFBTSxlQUFlLFlBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCw0RUFBNEU7Ozs7O0lBQzVFLGlEQUFrQjs7Ozs7SUFBbEI7O1FBQ1UsSUFBQSxtQ0FBTTs7WUFDZCxLQUFxQixJQUFBLEtBQUEsaUJBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0MsSUFBTSxNQUFNLFdBQUE7Z0JBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELDRFQUE0RTs7Ozs7O0lBQzVFLDhDQUFlOzs7Ozs7SUFBZixVQUFnQixZQUE2QjtRQUMzQyxpQkFBTSxlQUFlLFlBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCw0RUFBNEU7Ozs7O0lBQzVFLGlEQUFrQjs7Ozs7SUFBbEI7O1FBQ1UsSUFBQSxtQ0FBTTs7WUFDZCxLQUFxQixJQUFBLEtBQUEsaUJBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBN0MsSUFBTSxNQUFNLFdBQUE7Z0JBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7Ozs7SUFNRCw2Q0FBYzs7Ozs7SUFBZDtRQUNFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUkscUJBQXFCLENBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7Ozs7SUFFRCw2Q0FBYzs7O0lBQWQ7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxtREFBb0I7Ozs7SUFBNUI7UUFDRSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUNELDJCQUEyQjtJQUUzQjs7T0FFRzs7Ozs7O0lBQ0gsZ0RBQWlCOzs7Ozs7SUFBakI7UUFDRSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUVELHlDQUFVOzs7SUFBVjtRQUNFLGlCQUFNLFVBQVUsV0FBRSxDQUFDOzs7Ozs7WUFNYixhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhO1FBQ25ELEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsR0FBRyxLQUFLLEVBQUUsV0FBVyxFQUFFLEVBQUU7O2dCQUNwRixPQUFPLEdBQUcsbUJBQUEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBa0M7O2dCQUMxRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU87WUFDL0IsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7Ozs7OztJQVNELHVDQUFROzs7OztJQUFSLFVBQVMsT0FBK0Q7UUFBL0Qsd0JBQUEsRUFBQSxlQUErRDtRQUFFLGNBQWM7YUFBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1lBQWQsNkJBQWM7OztZQUNoRixhQUFhLEdBQVksT0FBTyxPQUFPLEtBQUssU0FBUztZQUN6RCxDQUFDLENBQUMsT0FBTztZQUNULENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTO2dCQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxDQUFDLENBQUMsS0FBSzs7WUFHUCxLQUF1QjtRQUMzQixRQUFPLE9BQU8sRUFBRTtZQUNkLEtBQUssUUFBUTtnQkFDWCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztnQkFDNUMsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3RDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7Z0JBQzVDLE1BQU07WUFDUixTQUFTLG1CQUFtQjtnQkFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN2QyxJQUFJLGFBQWEsRUFBRTtvQkFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN6QztnQkFDRCxPQUFPO1NBQ1Y7O1lBRUssZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQzs7WUFDakMsS0FBSyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU07UUFFMUQsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRTs7Z0JBQ3RELE9BQU8sR0FBRyxtQkFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBd0I7WUFDcEcsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN2QixJQUFJLGFBQWEsRUFBRTtvQkFDakIsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN6QjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7O0lBRUQscURBQXNCOzs7SUFBdEI7UUFDRSxJQUFHO1lBQ0QsQ0FBQyxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDdEM7UUFBQyxPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUM7U0FDekQ7SUFDSCxDQUFDOzs7OztJQUVPLHdEQUF5Qjs7OztJQUFqQzs7WUFDUSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsY0FBYzs7WUFDL0MsTUFBeUI7O1lBQUUsU0FBNEI7UUFFM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsRCxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZELE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQy9CO1NBQ0Y7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7Z0JBQzFELFNBQVMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2FBQ2xDO1NBQ0Y7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQkFDNUQsT0FBTzs7OztZQUFFLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFBN0MsQ0FBNkMsRUFBQyxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUM7aUJBQ2xELE9BQU87Ozs7WUFBRSxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEVBQTFDLENBQTBDLEVBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDO2lCQUMvRCxPQUFPOzs7O1lBQUUsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxFQUEzQyxDQUEyQyxFQUFDLENBQUM7U0FDaEU7UUFFRCxJQUFJLFNBQVMsRUFBRTtZQUNiLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztpQkFDckQsT0FBTzs7OztZQUFFLFVBQUEsRUFBRSxJQUFJLE9BQUEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsRUFBeEMsQ0FBd0MsRUFBQyxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFFaEMsaUJBQU0sd0JBQXdCLFdBQUUsQ0FBQztJQUNuQyxDQUFDOztnQkFqUkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGtCQUFrQjtvQkFFNUIsSUFBSSxFQUFFOzt3QkFDSixPQUFPLEVBQUUsZUFBZTtxQkFDekI7b0JBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztpQkFDaEQ7Ozs7Z0JBcENDLGVBQWU7Z0JBTGYsaUJBQWlCO2dCQUdqQixVQUFVOzZDQWlFRyxTQUFTLFNBQUMsTUFBTTtnQkFuRHRCLGNBQWMsdUJBb0RSLFFBQVE7Z0JBM0RyQixRQUFRO2dCQVNELGlCQUFpQjtnREFxRFgsTUFBTSxTQUFDLGFBQWE7Z0RBQ3BCLE1BQU0sU0FBQyxRQUFRO2dCQTFEckIsUUFBUTs7SUFrU2pCLDJCQUFDO0NBQUEsQUFsUkQsQ0FXNkMsUUFBUSxHQXVRcEQ7U0F2UVksb0JBQW9COzs7Ozs7SUFpQi9CLHlDQUF3Qzs7Ozs7SUFDeEMsNkNBQThDOzs7OztJQUM5QywyQ0FBdUM7Ozs7O0lBQ3ZDLDhDQUEwQzs7Ozs7SUFDMUMsZ0RBQWtDOzs7OztJQWtFbEMsOENBQW9HOzs7OztJQWtDcEcscUNBQXdDOzs7OztJQTdGNUIsd0NBQTRCOzs7OztJQUM1QixxQ0FBcUM7Ozs7O0lBQ3JDLHNDQUFnRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgQXR0cmlidXRlLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgSW5qZWN0LFxuICBFbGVtZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEluamVjdG9yLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDREtfVEFCTEVfVEVNUExBVEUsIENka1RhYmxlLCBEYXRhUm93T3V0bGV0LCBDZGtIZWFkZXJSb3dEZWYsIENka0Zvb3RlclJvd0RlZiwgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGksIEVYVF9BUElfVE9LRU4gfSBmcm9tICcuLi8uLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMvY29sdW1uLWRlZic7XG5pbXBvcnQgeyBQYmxWaXJ0dWFsU2Nyb2xsRm9yT2YgfSBmcm9tICcuLi9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuXG4vKipcbiAqIFdyYXBwZXIgZm9yIHRoZSBDZGtUYWJsZSB0aGF0IGV4dGVuZHMgaXQncyBmdW5jdGlvbmFsaXR5IHRvIHN1cHBvcnQgdmFyaW91cyB0YWJsZSBmZWF0dXJlcy5cbiAqIFRoaXMgd3JhcHBlciBhbHNvIGFwcGxpZXMgTWF0ZXJpYWwgRGVzaWduIHRhYmxlIHN0eWxlcyAoaS5lLiBgTWF0VGFibGVgIHN0eWxlcykuXG4gKlxuICogTW9zdCBvZiB0aGUgZXh0ZW5zaW9ucyBhcmUgZG9uZSB1c2luZyBtaXhpbnMsIHRoaXMgaXMgbW9zdGx5IGZvciBjbGFyaXR5IGFuZCBzZXBhcmF0aW9uIG9mIHRoZSBmZWF0dXJlcyBhZGRlZC5cbiAqIFRoaXMgYXBwcm9hY2ggd2lsbCBhbGxvdyBlYXN5IHJlbW92YWwgd2hlbiBhIGZlYXR1cmUgaXMgbm8gbG9uZ2VyIHJlcXVpcmVkL2ltcGxlbWVudGVkIG5hdGl2ZWx5LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtY2RrLXRhYmxlJyxcbiAgZXhwb3J0QXM6ICdwYmxDZGtUYWJsZScsXG4gIHRlbXBsYXRlOiBDREtfVEFCTEVfVEVNUExBVEUsXG4gIHN0eWxlVXJsczogWycuL3BibC1jZGstdGFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdwYmwtY2RrLXRhYmxlJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIFBibENka1RhYmxlQ29tcG9uZW50PFQ+IGV4dGVuZHMgQ2RrVGFibGU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGdldCBfZWxlbWVudCgpOiBIVE1MRWxlbWVudCB7IHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7IH1cblxuICBnZXQgb25SZW5kZXJSb3dzKCk6IE9ic2VydmFibGU8RGF0YVJvd091dGxldD4ge1xuICAgIGlmICghdGhpcy5vblJlbmRlclJvd3MkKSB7XG4gICAgICB0aGlzLm9uUmVuZGVyUm93cyQgPSBuZXcgU3ViamVjdDxEYXRhUm93T3V0bGV0PigpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vblJlbmRlclJvd3MkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgZ2V0IG1pbldpZHRoKCk6IG51bWJlciB8IG51bGwgeyByZXR1cm4gdGhpcy5fbWluV2lkdGg7IH1cbiAgc2V0IG1pbldpZHRoKHZhbHVlOiBudW1iZXIgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluV2lkdGggPSB2YWx1ZSB8fCBudWxsO1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUubWluV2lkdGggPSB2YWx1ZSA/IHZhbHVlICsgJ3B4JyA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9taW5XaWR0aDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgb25SZW5kZXJSb3dzJDogU3ViamVjdDxEYXRhUm93T3V0bGV0PjtcbiAgcHJpdmF0ZSBfbGFzdFN0aWNreTogUGJsTmdyaWRDb2x1bW5EZWY7XG4gIHByaXZhdGUgX2xhc3RTdGlja3lFbmQ6IFBibE5ncmlkQ29sdW1uRGVmO1xuICBwcml2YXRlIF9pc1N0aWNreVBlbmRpbmc6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdyb2xlJykgcm9sZTogc3RyaW5nLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgQEluamVjdChFWFRfQVBJX1RPS0VOKSBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPixcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55LFxuICAgICAgICAgICAgICBwbGF0Zm9ybT86IFBsYXRmb3JtKSB7XG4gICAgc3VwZXIoX2RpZmZlcnMsIF9jaGFuZ2VEZXRlY3RvclJlZiwgX2VsZW1lbnRSZWYsIHJvbGUsIF9kaXIsIF9kb2N1bWVudCwgcGxhdGZvcm0pO1xuICAgIHRoaXMudGFibGUuX2Nka1RhYmxlID0gdGhpcztcbiAgICB0aGlzLnRyYWNrQnkgPSB0aGlzLnRhYmxlLnRyYWNrQnk7XG5cbiAgICBleHRBcGkuZXZlbnRzLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICBpZiAoZS5raW5kID09PSAnYmVmb3JlSW52YWxpZGF0ZUhlYWRlcnMnKSB7XG4gICAgICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5KSB7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreS5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXN0aWNreS1zdGFydCcpKTtcbiAgICAgICAgICB0aGlzLl9sYXN0U3RpY2t5ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9sYXN0U3RpY2t5RW5kKSB7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreUVuZC5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXN0aWNreS1lbmQnKSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0aWNreUVuZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCkge1xuICAgIGlmICh0aGlzLl9pc1N0aWNreVBlbmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9pc1N0aWNreVBlbmRpbmcgPSB0cnVlO1xuICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc1N0aWNreVBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgaWYgKHRoaXMub25SZW5kZXJSb3dzJCkge1xuICAgICAgdGhpcy5vblJlbmRlclJvd3MkLmNvbXBsZXRlKCk7XG4gICAgfVxuICAgIHRoaXMudmlydHVhbFNjcm9sbERlc3Ryb3koKTtcbiAgfVxuXG4gIC8vI3JlZ2lvbiBDU1MtQ0xBU1MtQ09OVFJPTFxuICBhZGRDbGFzcyhjc3NDbGFzc05hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzc05hbWUpO1xuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoY3NzQ2xhc3NOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzQ2xhc3NOYW1lKTtcbiAgfVxuICAvLyNlbmRyZWdpb24gQ1NTLUNMQVNTLUNPTlRST0xcblxuICAvLyNyZWdpb24gQ0xFQVItUk9XLURFRlNcblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIHByaXZhdGUgX2NhY2hlZFJvd0RlZnMgPSB7IGhlYWRlcjogbmV3IFNldDxDZGtIZWFkZXJSb3dEZWY+KCksIGZvb3RlcjogbmV3IFNldDxDZGtGb290ZXJSb3dEZWY+KCkgfTsgLy90c2xpbnQ6ZGlzYWJsZS1saW5lXG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBhZGRIZWFkZXJSb3dEZWYoaGVhZGVyUm93RGVmOiBDZGtIZWFkZXJSb3dEZWYpOiB2b2lkIHtcbiAgICBzdXBlci5hZGRIZWFkZXJSb3dEZWYoaGVhZGVyUm93RGVmKTtcbiAgICB0aGlzLl9jYWNoZWRSb3dEZWZzLmhlYWRlci5hZGQoaGVhZGVyUm93RGVmKTtcbiAgfVxuXG4gIC8vIFRPRE86IHJlbW92ZSBpZiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvcHVsbC8xMzAwMCBpcyBwdXNoZWRcbiAgY2xlYXJIZWFkZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgaGVhZGVyIH0gPSB0aGlzLl9jYWNoZWRSb3dEZWZzO1xuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIEFycmF5LmZyb20oaGVhZGVyLnZhbHVlcygpKSkge1xuICAgICAgdGhpcy5yZW1vdmVIZWFkZXJSb3dEZWYocm93RGVmKTtcbiAgICB9XG4gICAgaGVhZGVyLmNsZWFyKCk7XG4gIH1cblxuICAvLyBUT0RPOiByZW1vdmUgaWYgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL3B1bGwvMTMwMDAgaXMgcHVzaGVkXG4gIGFkZEZvb3RlclJvd0RlZihmb290ZXJSb3dEZWY6IENka0Zvb3RlclJvd0RlZik6IHZvaWQge1xuICAgIHN1cGVyLmFkZEZvb3RlclJvd0RlZihmb290ZXJSb3dEZWYpO1xuICAgIHRoaXMuX2NhY2hlZFJvd0RlZnMuZm9vdGVyLmFkZChmb290ZXJSb3dEZWYpO1xuICB9XG5cbiAgLy8gVE9ETzogcmVtb3ZlIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9wdWxsLzEzMDAwIGlzIHB1c2hlZFxuICBjbGVhckZvb3RlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgY29uc3QgeyBmb290ZXIgfSA9IHRoaXMuX2NhY2hlZFJvd0RlZnM7XG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgQXJyYXkuZnJvbShmb290ZXIudmFsdWVzKCkpKSB7XG4gICAgICB0aGlzLnJlbW92ZUZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgIH1cbiAgICBmb290ZXIuY2xlYXIoKTtcbiAgfVxuICAvLyNlbmRyZWdpb24gQ0xFQVItUk9XLURFRlNcblxuICAvLyNyZWdpb24gVklSVFVBTC1TQ1JPTExcbiAgcHJpdmF0ZSBmb3JPZjogUGJsVmlydHVhbFNjcm9sbEZvck9mPFQ+OyAvL3RzbGludDpkaXNhYmxlLWxpbmVcblxuICBhdHRhY2hWaWV3UG9ydCgpOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgdGhpcy5mb3JPZiA9IG5ldyBQYmxWaXJ0dWFsU2Nyb2xsRm9yT2Y8VD4odGhpcy5leHRBcGksIHRoaXMuaW5qZWN0b3IuZ2V0KE5nWm9uZSkpO1xuICB9XG5cbiAgZGV0YWNoVmlld1BvcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9yT2YpIHtcbiAgICAgIHRoaXMuZm9yT2YuZGVzdHJveSgpO1xuICAgICAgdGhpcy5mb3JPZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZpcnR1YWxTY3JvbGxEZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5kZXRhY2hWaWV3UG9ydCgpO1xuICB9XG4gIC8vI2VuZHJlZ2lvbiBWSVJUVUFMLVNDUk9MTFxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyBmb3IgYF9jYWNoZVJvd0RlZnMoKWBcbiAgICovXG4gIHVwZGF0ZVJvd0RlZkNhY2hlKCk6IHZvaWQge1xuICAgICh0aGlzIGFzIGFueSkuX2NhY2hlUm93RGVmcygpO1xuICB9XG5cbiAgcmVuZGVyUm93cygpOiB2b2lkIHtcbiAgICBzdXBlci5yZW5kZXJSb3dzKCk7XG5cbiAgICAvLyBUaGUgcHJvYmxlbSBvZiBpbmhlcml0YW5jZSByaWdodCBhdCB5b3VyIGZhY2VcbiAgICAvLyBCZWNhdXNlIG1hdGVyaWFsIGRvZXMgbm90IGFsbG93IHVzIHRvIGNvbnRyb2wgdGhlIGNvbnRleHQgZ2VuZXJhdGlvbiBmb3IgYSByb3cgd2UgbmVlZCB0byBnZXQgY2xldmVyLlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2NvbXBvbmVudHMvaXNzdWVzLzE0MTk5XG4gICAgLy8gVE9ETzogSWYgdGhleSBkbyBhbGxvdyBjb250cm9sbGluZyBjb250ZXh0IGdlbmVyYXRpb24sIHJlbW92ZSB0aGlzIGFuZCBhcHBseSB0aGVpciBzb2x1dGlvbi5cbiAgICBjb25zdCB2aWV3Q29udGFpbmVyID0gdGhpcy5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgZm9yIChsZXQgcmVuZGVySW5kZXggPSAwLCBjb3VudCA9IHZpZXdDb250YWluZXIubGVuZ3RoOyByZW5kZXJJbmRleCA8IGNvdW50OyByZW5kZXJJbmRleCsrKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdmlld0NvbnRhaW5lci5nZXQocmVuZGVySW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PjtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB2aWV3UmVmLmNvbnRleHQ7XG4gICAgICBjb250ZXh0LmdyaWRJbnN0YW5jZSA9IHRoaXMudGFibGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub25SZW5kZXJSb3dzJCkge1xuICAgICAgdGhpcy5vblJlbmRlclJvd3MkLm5leHQodGhpcy5fcm93T3V0bGV0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yY2UgcnVuIGNoYW5nZSBkZXRlY3Rpb24gZm9yIHJvd3MuXG4gICAqIFlvdSBjYW4gcnVuIGl0IGZvciBzcGVjaWZpYyBncm91cHMgb3IgZm9yIGFsbCByb3dzLlxuICAgKi9cbiAgc3luY1Jvd3Mocm93VHlwZT86ICdhbGwnIHwgYm9vbGVhbiwgZGV0ZWN0Q2hhbmdlcz86IGJvb2xlYW4pOiB2b2lkO1xuICBzeW5jUm93cyhyb3dUeXBlOiAnaGVhZGVyJyB8ICdkYXRhJyB8ICdmb290ZXInLCBkZXRlY3RDaGFuZ2VzOiBib29sZWFuLCAuLi5yb3dzOiBudW1iZXJbXSk6IHZvaWQ7XG4gIHN5bmNSb3dzKHJvd1R5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIC4uLnJvd3M6IG51bWJlcltdKTogdm9pZDtcbiAgc3luY1Jvd3Mocm93VHlwZTogJ2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJyB8ICdhbGwnIHwgYm9vbGVhbiA9IGZhbHNlLCAuLi5yb3dzOiBhbnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IGRldGVjdENoYW5nZXM6IGJvb2xlYW4gPSB0eXBlb2Ygcm93VHlwZSA9PT0gJ2Jvb2xlYW4nXG4gICAgICA/IHJvd1R5cGVcbiAgICAgIDogdHlwZW9mIHJvd3NbMF0gPT09ICdib29sZWFuJ1xuICAgICAgICA/IHJvd3Muc2hpZnQoKVxuICAgICAgICA6IGZhbHNlXG4gICAgO1xuXG4gICAgbGV0IHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICAgIHN3aXRjaChyb3dUeXBlKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICB2Y1JlZiA9IHRoaXMuX2hlYWRlclJvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICB2Y1JlZiA9IHRoaXMuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHZjUmVmID0gdGhpcy5fZm9vdGVyUm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDogLy8gYm9vbGVhbiBvciAnYWxsJ1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgaWYgKGRldGVjdENoYW5nZXMpIHtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZVNwZWNpZmljUm93cyA9IHJvd3MubGVuZ3RoID4gMDtcbiAgICBjb25zdCBjb3VudCA9IHVzZVNwZWNpZmljUm93cyA/IHJvd3MubGVuZ3RoIDogdmNSZWYubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgcmVuZGVySW5kZXggPSAwOyByZW5kZXJJbmRleCA8IGNvdW50OyByZW5kZXJJbmRleCsrKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdmNSZWYuZ2V0KHVzZVNwZWNpZmljUm93cyA/IHJvd3NbcmVuZGVySW5kZXhdIDogcmVuZGVySW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgaWYgKHZpZXdSZWYpIHtcbiAgICAgICAgdmlld1JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgaWYgKGRldGVjdENoYW5nZXMpIHtcbiAgICAgICAgICB2aWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHBibEZvcmNlUmVuZGVyRGF0YVJvd3MoKTogdm9pZCB7XG4gICAgdHJ5e1xuICAgICAgKHRoaXMgYXMgYW55KS5fZm9yY2VSZW5kZXJEYXRhUm93cygpO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICB0aGlzLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9IHRoaXMubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpIHtcbiAgICBjb25zdCBjb2x1bW5zID0gdGhpcy50YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnM7XG4gICAgbGV0IHN0aWNreTogUGJsTmdyaWRDb2x1bW5EZWYsIHN0aWNreUVuZDogUGJsTmdyaWRDb2x1bW5EZWY7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY29sdW1ucy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgaWYgKGNvbHVtbnNbaV0uY29sdW1uRGVmICYmIGNvbHVtbnNbaV0uY29sdW1uRGVmLnN0aWNreSkge1xuICAgICAgICBzdGlja3kgPSBjb2x1bW5zW2ldLmNvbHVtbkRlZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gY29sdW1ucy5sZW5ndGggLSAxOyBpID4gLTE7IGktLSkge1xuICAgICAgaWYgKGNvbHVtbnNbaV0uY29sdW1uRGVmICYmIGNvbHVtbnNbaV0uY29sdW1uRGVmLnN0aWNreUVuZCkge1xuICAgICAgICBzdGlja3lFbmQgPSBjb2x1bW5zW2ldLmNvbHVtbkRlZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGFzdFN0aWNreSkge1xuICAgICAgdGhpcy5fbGFzdFN0aWNreS5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtc3RpY2t5LXN0YXJ0JykpO1xuICAgIH1cblxuICAgIGlmIChzdGlja3kpIHtcbiAgICAgIHN0aWNreS5xdWVyeUNlbGxFbGVtZW50cygnaGVhZGVyJywgJ3RhYmxlJywgJ2Zvb3RlcicpXG4gICAgICAgIC5mb3JFYWNoKCBlbCA9PiBlbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtc3RpY2t5LXN0YXJ0JykpO1xuICAgIH1cbiAgICB0aGlzLl9sYXN0U3RpY2t5ID0gc3RpY2t5O1xuXG4gICAgaWYgKHRoaXMuX2xhc3RTdGlja3lFbmQpIHtcbiAgICAgIHRoaXMuX2xhc3RTdGlja3lFbmQucXVlcnlDZWxsRWxlbWVudHMoJ2hlYWRlcicsICd0YWJsZScsICdmb290ZXInKVxuICAgICAgICAuZm9yRWFjaCggZWwgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXN0aWNreS1lbmQnKSk7XG4gICAgfVxuXG4gICAgaWYgKHN0aWNreUVuZCkge1xuICAgICAgc3RpY2t5RW5kLnF1ZXJ5Q2VsbEVsZW1lbnRzKCdoZWFkZXInLCAndGFibGUnLCAnZm9vdGVyJylcbiAgICAgICAgLmZvckVhY2goIGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1zdGlja3ktZW5kJykpO1xuICAgIH1cbiAgICB0aGlzLl9sYXN0U3RpY2t5RW5kID0gc3RpY2t5RW5kO1xuXG4gICAgc3VwZXIudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gIH1cbn1cbiJdfQ==