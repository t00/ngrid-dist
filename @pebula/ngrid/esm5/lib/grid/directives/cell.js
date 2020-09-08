/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/cell.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __values } from "tslib";
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-selector
import { first, filter } from 'rxjs/operators';
import { Component, Directive, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewContainerRef, ViewChild, NgZone, Input, } from '@angular/core';
import { CdkHeaderCell, CdkCell, CdkFooterCell } from '@angular/cdk/table';
import { unrx } from '../utils';
import { PblNgridComponent } from '../ngrid.component';
import { uniqueColumnCss, uniqueColumnTypeCss, COLUMN_EDITABLE_CELL_CLASS } from '../circular-dep-bridge';
import { isPblColumn, isPblColumnGroup } from '../columns';
import { MetaCellContext, PblRowContext } from '../context/index';
import { PblNgridColumnDef } from './column-def';
import { PblNgridDataHeaderExtensionContext, PblNgridMultiComponentRegistry, PblNgridMultiTemplateRegistry } from './registry.directives';
/** @type {?} */
var HEADER_GROUP_CSS = "pbl-header-group-cell";
/** @type {?} */
var HEADER_GROUP_PLACE_HOLDER_CSS = "pbl-header-group-cell-placeholder";
/**
 * @param {?} el
 * @param {?} column
 * @return {?}
 */
function initCellElement(el, column) {
    var e_1, _a;
    el.classList.add(uniqueColumnCss(column.columnDef));
    if (column.type) {
        el.classList.add(uniqueColumnTypeCss(column.type));
    }
    if (column.css) {
        /** @type {?} */
        var css = column.css.split(' ');
        try {
            for (var css_1 = __values(css), css_1_1 = css_1.next(); !css_1_1.done; css_1_1 = css_1.next()) {
                var c = css_1_1.value;
                el.classList.add(c);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (css_1_1 && !css_1_1.done && (_a = css_1.return)) _a.call(css_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
}
/**
 * @param {?} el
 * @param {?} column
 * @return {?}
 */
function initDataCellElement(el, column) {
    if (column.editable && column.editorTpl) {
        el.classList.add(COLUMN_EDITABLE_CELL_CLASS);
    }
}
/** @type {?} */
var lastDataHeaderExtensions = new Map();
/**
 * @this {?}
 * @return {?}
 */
function applyWidth() {
    this.columnDef.applyWidth(this.el);
}
/**
 * @this {?}
 * @return {?}
 */
function applySourceWidth() {
    this.columnDef.applySourceWidth(this.el);
}
/**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 * @template T
 */
var PblNgridHeaderCellComponent = /** @class */ (function (_super) {
    __extends(PblNgridHeaderCellComponent, _super);
    function PblNgridHeaderCellComponent(columnDef, grid, elementRef, zone) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnDef = columnDef;
        _this.grid = grid;
        _this.elementRef = elementRef;
        _this.zone = zone;
        _this.table = grid;
        /** @type {?} */
        var column = columnDef.column;
        /** @type {?} */
        var el = _this.el = elementRef.nativeElement;
        if (isPblColumnGroup(column)) {
            el.classList.add(HEADER_GROUP_CSS);
            if (column.placeholder) {
                el.classList.add(HEADER_GROUP_PLACE_HOLDER_CSS);
            }
        }
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var col = this.columnDef.column;
        /** @type {?} */
        var predicate;
        /** @type {?} */
        var view;
        /** @type {?} */
        var widthUpdater;
        if (isPblColumn(col)) {
            /** @type {?} */
            var gridWidthRow_1 = this.el.parentElement.hasAttribute('gridWidthRow');
            widthUpdater = gridWidthRow_1 ? applySourceWidth : applyWidth;
            predicate = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return (!gridWidthRow_1 && event.reason !== 'update') || (gridWidthRow_1 && event.reason !== 'resize'); });
            view = !gridWidthRow_1 ? this.initMainHeaderColumnView(col) : undefined;
        }
        else {
            widthUpdater = applySourceWidth;
            predicate = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return event.reason !== 'resize'; });
            view = this.initMetaHeaderColumnView(col);
        }
        this.columnDef.widthChange
            .pipe(filter(predicate), unrx(this))
            .subscribe(widthUpdater.bind(this));
        view && view.detectChanges();
        widthUpdater.call(this);
        initCellElement(this.el, col);
    };
    /**
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        unrx.kill(this);
    };
    /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.initMainHeaderColumnView = /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    function (col) {
        var _this = this;
        this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
        /** @type {?} */
        var context = (/** @type {?} */ (this.cellCtx));
        /** @type {?} */
        var view = this.vcRef.createEmbeddedView(col.headerCellTpl, context);
        this.zone.onStable
            .pipe(first())
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.runHeaderExtensions(context, (/** @type {?} */ (view)));
            /** @type {?} */
            var v = _this.vcRef.get(0);
            // at this point the view might get destroyed, its possible...
            if (!v.destroyed) {
                v.detectChanges();
            }
        }));
        return view;
    };
    /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.initMetaHeaderColumnView = /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    function (col) {
        this.cellCtx = MetaCellContext.create(col, this.grid);
        return this.vcRef.createEmbeddedView(col.template, this.cellCtx);
    };
    /**
     * @protected
     * @param {?} context
     * @param {?} view
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.runHeaderExtensions = /**
     * @protected
     * @param {?} context
     * @param {?} view
     * @return {?}
     */
    function (context, view) {
        var e_2, _a;
        var _this = this;
        // we collect the first header extension for each unique name only once per grid instance
        /** @type {?} */
        var extensions = lastDataHeaderExtensions.get(this.grid);
        if (!extensions) {
            /** @type {?} */
            var dataHeaderExtensions_1 = new Map();
            this.grid.registry.forMulti('dataHeaderExtensions', (/**
             * @param {?} values
             * @return {?}
             */
            function (values) {
                var e_3, _a;
                try {
                    for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                        var value = values_1_1.value;
                        if (!dataHeaderExtensions_1.has(value.name)) {
                            dataHeaderExtensions_1.set(value.name, value);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }));
            extensions = Array.from(dataHeaderExtensions_1.values());
            lastDataHeaderExtensions.set(this.grid, extensions);
            // destroy it on the next turn, we know all cells will render on the same turn.
            this.zone.onStable.pipe(first()).subscribe((/**
             * @return {?}
             */
            function () { return lastDataHeaderExtensions.delete(_this.grid); }));
        }
        var rootNodes = view.rootNodes;
        try {
            for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                var ext = extensions_1_1.value;
                if (!ext.shouldRender || ext.shouldRender(context)) {
                    if (ext instanceof PblNgridMultiTemplateRegistry) {
                        /** @type {?} */
                        var extView = this.vcRef.createEmbeddedView(ext.tRef, context);
                        extView.markForCheck();
                    }
                    else if (ext instanceof PblNgridMultiComponentRegistry) {
                        rootNodes = this.createComponent(ext, context, rootNodes);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (extensions_1_1 && !extensions_1_1.done && (_a = extensions_1.return)) _a.call(extensions_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    /**
     * @protected
     * @param {?} ext
     * @param {?} context
     * @param {?} rootNodes
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.createComponent = /**
     * @protected
     * @param {?} ext
     * @param {?} context
     * @param {?} rootNodes
     * @return {?}
     */
    function (ext, context, rootNodes) {
        /** @type {?} */
        var factory = ext.getFactory(context);
        /** @type {?} */
        var projectedContent = [];
        if (ext.projectContent) {
            projectedContent.push(rootNodes);
        }
        /** @type {?} */
        var cmpRef = this.vcRef.createComponent(factory, this.vcRef.length, null, projectedContent);
        if (ext.projectContent) {
            rootNodes = [cmpRef.location.nativeElement];
        }
        if (ext.onCreated) {
            ext.onCreated(context, cmpRef);
        }
        return rootNodes;
    };
    PblNgridHeaderCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbl-ngrid-header-cell',
                    host: {
                        class: 'pbl-ngrid-header-cell',
                        role: 'columnheader',
                    },
                    exportAs: 'ngridHeaderCell',
                    template: "<ng-container #vcRef></ng-container>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    PblNgridHeaderCellComponent.ctorParameters = function () { return [
        { type: PblNgridColumnDef },
        { type: PblNgridComponent },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    PblNgridHeaderCellComponent.propDecorators = {
        vcRef: [{ type: ViewChild, args: ['vcRef', { read: ViewContainerRef, static: true },] }]
    };
    return PblNgridHeaderCellComponent;
}(CdkHeaderCell));
export { PblNgridHeaderCellComponent };
if (false) {
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.vcRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridHeaderCellComponent.prototype.el;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.cellCtx;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridHeaderCellComponent.prototype.table;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.columnDef;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.grid;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridHeaderCellComponent.prototype.zone;
}
/**
 * Cell template container that adds the right classes and role.
 */
var PblNgridCellDirective = /** @class */ (function (_super) {
    __extends(PblNgridCellDirective, _super);
    function PblNgridCellDirective(colDef, elementRef) {
        var _this = _super.call(this, colDef, elementRef) || this;
        _this.colDef = colDef;
        _this.focused = false;
        _this.selected = false;
        _this.colIndex = _this.colDef.grid.columnApi.indexOf((/** @type {?} */ (colDef.column)));
        _this.el = elementRef.nativeElement;
        colDef.applyWidth(_this.el);
        initCellElement(_this.el, colDef.column);
        initDataCellElement(_this.el, colDef.column);
        /*  Apply width changes to this data cell
            We don't update "update" events because they are followed by a resize event which will update the absolute value (px) */
        colDef.widthChange
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.reason !== 'update'; })), unrx(_this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.colDef.applyWidth(_this.el); }));
        return _this;
    }
    Object.defineProperty(PblNgridCellDirective.prototype, "rowCtx", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._rowCtx) {
                this._rowCtx = value;
                this.ngDoCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridCellDirective.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this._rowCtx) {
            /** @type {?} */
            var cellContext = this.cellCtx = this._rowCtx.cell(this.colIndex);
            if (cellContext.focused !== this.focused) {
                if (this.focused = cellContext.focused) {
                    this.el.classList.add('pbl-ngrid-cell-focused');
                }
                else {
                    this.el.classList.remove('pbl-ngrid-cell-focused');
                }
            }
            if (this.cellCtx.selected !== this.selected) {
                if (this.selected = cellContext.selected) {
                    this.el.classList.add('pbl-ngrid-cell-selected');
                }
                else {
                    this.el.classList.remove('pbl-ngrid-cell-selected');
                }
            }
        }
    };
    /**
     * @return {?}
     */
    PblNgridCellDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        unrx.kill(this);
    };
    PblNgridCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'pbl-ngrid-cell',
                    host: {
                        'class': 'pbl-ngrid-cell',
                        'role': 'gridcell',
                    },
                    exportAs: 'pblNgridCell',
                },] }
    ];
    /** @nocollapse */
    PblNgridCellDirective.ctorParameters = function () { return [
        { type: PblNgridColumnDef },
        { type: ElementRef }
    ]; };
    PblNgridCellDirective.propDecorators = {
        rowCtx: [{ type: Input }]
    };
    return PblNgridCellDirective;
}(CdkCell));
export { PblNgridCellDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype._rowCtx;
    /** @type {?} */
    PblNgridCellDirective.prototype.cellCtx;
    /**
     * The position of the column def among all columns regardless of visibility.
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.colIndex;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.focused;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.selected;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellDirective.prototype.colDef;
}
var PblNgridFooterCellDirective = /** @class */ (function (_super) {
    __extends(PblNgridFooterCellDirective, _super);
    function PblNgridFooterCellDirective(columnDef, grid, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnDef = columnDef;
        _this.grid = grid;
        _this.table = grid;
        _this.el = elementRef.nativeElement;
        /** @type {?} */
        var column = columnDef.column;
        applyWidth.call(_this);
        initCellElement(_this.el, column);
        columnDef.widthChange
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.reason !== 'update'; })), unrx(_this))
            .subscribe(applyWidth.bind(_this));
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridFooterCellDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.grid);
    };
    /**
     * @return {?}
     */
    PblNgridFooterCellDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        unrx.kill(this);
    };
    PblNgridFooterCellDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'pbl-ngrid-footer-cell',
                    host: {
                        'class': 'pbl-ngrid-footer-cell',
                        'role': 'gridcell',
                    },
                    exportAs: 'ngridFooterCell',
                },] }
    ];
    /** @nocollapse */
    PblNgridFooterCellDirective.ctorParameters = function () { return [
        { type: PblNgridColumnDef },
        { type: PblNgridComponent },
        { type: ElementRef }
    ]; };
    return PblNgridFooterCellDirective;
}(CdkFooterCell));
export { PblNgridFooterCellDirective };
if (false) {
    /** @type {?} */
    PblNgridFooterCellDirective.prototype.cellCtx;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridFooterCellDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridFooterCellDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    PblNgridFooterCellDirective.prototype.columnDef;
    /** @type {?} */
    PblNgridFooterCellDirective.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFFTCxTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFFVix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsTUFBTSxFQUVOLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUzRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRyxPQUFPLEVBQW9ELFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RyxPQUFPLEVBQUUsZUFBZSxFQUEyQixhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7QUFFM0csT0FBTyxFQUFFLGlCQUFpQixFQUFvQixNQUFNLGNBQWMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsOEJBQThCLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFFcEksZ0JBQWdCLEdBQUcsdUJBQXVCOztJQUMxQyw2QkFBNkIsR0FBRyxtQ0FBbUM7Ozs7OztBQUV6RSxTQUFTLGVBQWUsQ0FBQyxFQUFlLEVBQUUsTUFBYzs7SUFDdEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE1B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M0MsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUNYO2FBQ0EsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7SUFDdEMsQ0FBQzs7OztJQUVELDhDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7OztJQUVELGlEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQzs7Z0JBdENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLHVCQUF1Qjt3QkFDaEMsTUFBTSxFQUFFLFVBQVU7cUJBQ25CO29CQUNELFFBQVEsRUFBRSxpQkFBaUI7aUJBQzNCOzs7O2dCQWpSTyxpQkFBaUI7Z0JBTGpCLGlCQUFpQjtnQkFieEIsVUFBVTs7SUFvVVosa0NBQUM7Q0FBQSxBQXhDRCxDQVFpRCxhQUFhLEdBZ0M3RDtTQWhDWSwyQkFBMkI7OztJQUN0Qyw4Q0FBeUI7Ozs7O0lBRXpCLDRDQUFrQzs7Ozs7SUFFbEMseUNBQXdCOzs7OztJQUNaLGdEQUFvRTs7SUFDcEUsMkNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4vLyB0c2xpbnQ6ZGlzYWJsZTpkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IGZpcnN0LCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBPbkluaXQsIE9uRGVzdHJveSxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIERvQ2hlY2ssXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBOZ1pvbmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrSGVhZGVyQ2VsbCwgQ2RrQ2VsbCwgQ2RrRm9vdGVyQ2VsbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IHVucnggfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyB1bmlxdWVDb2x1bW5Dc3MsIHVuaXF1ZUNvbHVtblR5cGVDc3MsIENPTFVNTl9FRElUQUJMRV9DRUxMX0NMQVNTIH0gZnJvbSAnLi4vY2lyY3VsYXItZGVwLWJyaWRnZSc7XG5pbXBvcnQgeyBDT0xVTU4sIFBibE1ldGFDb2x1bW4sIFBibENvbHVtbiwgUGJsQ29sdW1uR3JvdXAsIGlzUGJsQ29sdW1uLCBpc1BibENvbHVtbkdyb3VwIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5pbXBvcnQgeyBNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBQYmxSb3dDb250ZXh0LCBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIH0gZnJvbSAnLi4vc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmLCBXaWR0aENoYW5nZUV2ZW50IH0gZnJvbSAnLi9jb2x1bW4tZGVmJztcbmltcG9ydCB7IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkgfSBmcm9tICcuL3JlZ2lzdHJ5LmRpcmVjdGl2ZXMnO1xuXG5jb25zdCBIRUFERVJfR1JPVVBfQ1NTID0gYHBibC1oZWFkZXItZ3JvdXAtY2VsbGA7XG5jb25zdCBIRUFERVJfR1JPVVBfUExBQ0VfSE9MREVSX0NTUyA9IGBwYmwtaGVhZGVyLWdyb3VwLWNlbGwtcGxhY2Vob2xkZXJgO1xuXG5mdW5jdGlvbiBpbml0Q2VsbEVsZW1lbnQoZWw6IEhUTUxFbGVtZW50LCBjb2x1bW46IENPTFVNTik6IHZvaWQge1xuICBlbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNvbHVtbkNzcyhjb2x1bW4uY29sdW1uRGVmKSk7XG4gIGlmIChjb2x1bW4udHlwZSkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ29sdW1uVHlwZUNzcyhjb2x1bW4udHlwZSkpO1xuICB9XG4gIGlmIChjb2x1bW4uY3NzKSB7XG4gICAgY29uc3QgY3NzID0gY29sdW1uLmNzcy5zcGxpdCgnICcpO1xuICAgIGZvciAoY29uc3QgYyBvZiBjc3MpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXREYXRhQ2VsbEVsZW1lbnQoZWw6IEhUTUxFbGVtZW50LCBjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICBpZiAoY29sdW1uLmVkaXRhYmxlICYmIGNvbHVtbi5lZGl0b3JUcGwpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKENPTFVNTl9FRElUQUJMRV9DRUxMX0NMQVNTKTtcbiAgfVxufVxuXG5jb25zdCBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMgPSBuZXcgTWFwPFBibE5ncmlkQ29tcG9uZW50PGFueT4sIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFsnZGF0YUhlYWRlckV4dGVuc2lvbnMnXVtdPigpO1xuXG5mdW5jdGlvbiBhcHBseVdpZHRoKHRoaXM6IHsgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjsgZWw6IEhUTUxFbGVtZW50IH0pIHtcbiAgdGhpcy5jb2x1bW5EZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlTb3VyY2VXaWR0aCh0aGlzOiB7IGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY7IGVsOiBIVE1MRWxlbWVudCB9KSB7XG4gIHRoaXMuY29sdW1uRGVmLmFwcGx5U291cmNlV2lkdGgodGhpcy5lbCk7XG59XG5cbi8qKlxuICogSGVhZGVyIGNlbGwgY29tcG9uZW50LlxuICogVGhlIGhlYWRlciBjZWxsIGNvbXBvbmVudCB3aWxsIHJlbmRlciB0aGUgaGVhZGVyIGNlbGwgdGVtcGxhdGUgYW5kIGFkZCB0aGUgcHJvcGVyIGNsYXNzZXMgYW5kIHJvbGUuXG4gKlxuICogSXQgaXMgYWxzbyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYW5kIG1hbmFnaW5nIHRoZSBhbnkgYGRhdGFIZWFkZXJFeHRlbnNpb25zYCByZWdpc3RlcmVkIGluIHRoZSByZWdpc3RyeS5cbiAqIFRoZXNlIGV4dGVuc2lvbnMgYWRkIGZlYXR1cmVzIHRvIHRoZSBjZWxscyBlaXRoZXIgYXMgYSB0ZW1wbGF0ZSBpbnN0YW5jZSBvciBhcyBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEV4YW1wbGVzOiBTb3J0aW5nIGJlaGF2aW9yLCBkcmFnJmRyb3AvcmVzaXplIGhhbmRsZXJzLCBtZW51cyBldGMuLi5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsJyxcbiAgICByb2xlOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICduZ3JpZEhlYWRlckNlbGwnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgI3ZjUmVmPjwvbmctY29udGFpbmVyPmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8VCBleHRlbmRzIENPTFVNTiA9IENPTFVNTj4gZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCd2Y1JlZicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNlbGxDdHg6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfCBNZXRhQ2VsbENvbnRleHQ7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFQ+LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLnRhYmxlID0gZ3JpZDtcblxuICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbkRlZi5jb2x1bW47XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKGlzUGJsQ29sdW1uR3JvdXAoY29sdW1uKSkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfQ1NTKTtcbiAgICAgIGlmIChjb2x1bW4ucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfUExBQ0VfSE9MREVSX0NTUyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29sOiBDT0xVTU4gPSB0aGlzLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgbGV0IHByZWRpY2F0ZTogKGV2ZW50OiBXaWR0aENoYW5nZUV2ZW50KSA9PiBib29sZWFuO1xuICAgIGxldCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uPj5cbiAgICBsZXQgd2lkdGhVcGRhdGVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5cbiAgICBpZiAoaXNQYmxDb2x1bW4oY29sKSkge1xuICAgICAgY29uc3QgZ3JpZFdpZHRoUm93ID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZ3JpZFdpZHRoUm93Jyk7XG4gICAgICB3aWR0aFVwZGF0ZXIgPSBncmlkV2lkdGhSb3cgPyBhcHBseVNvdXJjZVdpZHRoIDogYXBwbHlXaWR0aDtcbiAgICAgIHByZWRpY2F0ZSA9IGV2ZW50ID0+ICghZ3JpZFdpZHRoUm93ICYmIGV2ZW50LnJlYXNvbiAhPT0gJ3VwZGF0ZScpIHx8IChncmlkV2lkdGhSb3cgJiYgZXZlbnQucmVhc29uICE9PSAncmVzaXplJyk7XG4gICAgICB2aWV3ID0gIWdyaWRXaWR0aFJvdyA/IHRoaXMuaW5pdE1haW5IZWFkZXJDb2x1bW5WaWV3KGNvbCkgOiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoVXBkYXRlciA9IGFwcGx5U291cmNlV2lkdGg7XG4gICAgICBwcmVkaWNhdGUgPSBldmVudCA9PiBldmVudC5yZWFzb24gIT09ICdyZXNpemUnO1xuICAgICAgdmlldyA9IHRoaXMuaW5pdE1ldGFIZWFkZXJDb2x1bW5WaWV3KGNvbCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5EZWYud2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcihwcmVkaWNhdGUpLCB1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSh3aWR0aFVwZGF0ZXIuYmluZCh0aGlzKSk7XG5cbiAgICB2aWV3ICYmIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHdpZHRoVXBkYXRlci5jYWxsKHRoaXMpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2wpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRNYWluSGVhZGVyQ29sdW1uVmlldyhjb2w6IFBibENvbHVtbikge1xuICAgIHRoaXMuY2VsbEN0eCA9IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQuY3JlYXRlRGF0ZUhlYWRlckN0eCh0aGlzIGFzIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxQYmxDb2x1bW4+LCB0aGlzLnZjUmVmLmluamVjdG9yKTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jZWxsQ3R4IGFzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ7XG4gICAgY29uc3QgdmlldyA9IHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC5oZWFkZXJDZWxsVHBsLCBjb250ZXh0KTtcbiAgICB0aGlzLnpvbmUub25TdGFibGVcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIHRoaXMucnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0LCB2aWV3IGFzIEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4+KTtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMudmNSZWYuZ2V0KDApO1xuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSB2aWV3IG1pZ2h0IGdldCBkZXN0cm95ZWQsIGl0cyBwb3NzaWJsZS4uLlxuICAgICAgICBpZiAoIXYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgdi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRNZXRhSGVhZGVyQ29sdW1uVmlldyhjb2w6IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cCkge1xuICAgIHRoaXMuY2VsbEN0eCA9IE1ldGFDZWxsQ29udGV4dC5jcmVhdGUoY29sLCB0aGlzLmdyaWQpO1xuICAgIHJldHVybiB0aGlzLnZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhjb2wudGVtcGxhdGUsIHRoaXMuY2VsbEN0eCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik6IHZvaWQge1xuICAgIC8vIHdlIGNvbGxlY3QgdGhlIGZpcnN0IGhlYWRlciBleHRlbnNpb24gZm9yIGVhY2ggdW5pcXVlIG5hbWUgb25seSBvbmNlIHBlciBncmlkIGluc3RhbmNlXG4gICAgbGV0IGV4dGVuc2lvbnMgPSBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuZ2V0KHRoaXMuZ3JpZCk7XG4gICAgaWYgKCFleHRlbnNpb25zKSB7XG4gICAgICBjb25zdCBkYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgIHRoaXMuZ3JpZC5yZWdpc3RyeS5mb3JNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCB2YWx1ZXMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgIGlmICghZGF0YUhlYWRlckV4dGVuc2lvbnMuaGFzKHZhbHVlLm5hbWUpKSB7XG4gICAgICAgICAgICBkYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodmFsdWUubmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGV4dGVuc2lvbnMgPSBBcnJheS5mcm9tKGRhdGFIZWFkZXJFeHRlbnNpb25zLnZhbHVlcygpKTtcbiAgICAgIGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodGhpcy5ncmlkLCBleHRlbnNpb25zKTtcbiAgICAgIC8vIGRlc3Ryb3kgaXQgb24gdGhlIG5leHQgdHVybiwgd2Uga25vdyBhbGwgY2VsbHMgd2lsbCByZW5kZXIgb24gdGhlIHNhbWUgdHVybi5cbiAgICAgIHRoaXMuem9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSggKCkgPT4gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmRlbGV0ZSh0aGlzLmdyaWQpICk7XG4gICAgfVxuXG4gICAgbGV0IHsgcm9vdE5vZGVzIH0gPSB2aWV3O1xuXG4gICAgZm9yIChjb25zdCBleHQgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKCFleHQuc2hvdWxkUmVuZGVyIHx8IGV4dC5zaG91bGRSZW5kZXIoY29udGV4dCkpIHtcbiAgICAgICAgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5KSB7XG4gICAgICAgICAgY29uc3QgZXh0VmlldyA9IHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGV4dC50UmVmLCBjb250ZXh0KTtcbiAgICAgICAgICBleHRWaWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2UgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSkge1xuICAgICAgICAgIHJvb3ROb2RlcyA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KGV4dCwgY29udGV4dCwgcm9vdE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDb21wb25lbnQoZXh0OiBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8YW55LCBcImRhdGFIZWFkZXJFeHRlbnNpb25zXCI+LCBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCByb290Tm9kZXM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSBleHQuZ2V0RmFjdG9yeShjb250ZXh0KTtcbiAgICBjb25zdCBwcm9qZWN0ZWRDb250ZW50OiBhbnlbXVtdID0gW107XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICBwcm9qZWN0ZWRDb250ZW50LnB1c2gocm9vdE5vZGVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCB0aGlzLnZjUmVmLmxlbmd0aCwgbnVsbCwgcHJvamVjdGVkQ29udGVudCk7XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICByb290Tm9kZXMgPSBbIGNtcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50IF07XG4gICAgfVxuXG4gICAgaWYgKGV4dC5vbkNyZWF0ZWQpIHtcbiAgICAgIGV4dC5vbkNyZWF0ZWQoY29udGV4dCwgY21wUmVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVzO1xuICB9XG59XG5cbi8qKiBDZWxsIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGFkZHMgdGhlIHJpZ2h0IGNsYXNzZXMgYW5kIHJvbGUuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZENlbGwnLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxEaXJlY3RpdmUgZXh0ZW5kcyBDZGtDZWxsIGltcGxlbWVudHMgRG9DaGVjaywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzZXQgcm93Q3R4KHZhbHVlOiBQYmxSb3dDb250ZXh0PGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvd0N0eCkge1xuICAgICAgdGhpcy5fcm93Q3R4ID0gdmFsdWU7XG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jvd0N0eDogUGJsUm93Q29udGV4dDxhbnk+O1xuICBjZWxsQ3R4OiBQYmxDZWxsQ29udGV4dCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4gZGVmIGFtb25nIGFsbCBjb2x1bW5zIHJlZ2FyZGxlc3Mgb2YgdmlzaWJpbGl0eS5cbiAgICovXG4gIHByaXZhdGUgY29sSW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgZm9jdXNlZCA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2xEZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj4sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2xEZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuY29sSW5kZXggPSB0aGlzLmNvbERlZi5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbERlZi5jb2x1bW4gYXMgUGJsQ29sdW1uKTtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uKTtcbiAgICBpbml0RGF0YUNlbGxFbGVtZW50KHRoaXMuZWwsIGNvbERlZi5jb2x1bW4pO1xuXG5cbiAgICAvKiAgQXBwbHkgd2lkdGggY2hhbmdlcyB0byB0aGlzIGRhdGEgY2VsbFxuICAgICAgICBXZSBkb24ndCB1cGRhdGUgXCJ1cGRhdGVcIiBldmVudHMgYmVjYXVzZSB0aGV5IGFyZSBmb2xsb3dlZCBieSBhIHJlc2l6ZSBldmVudCB3aGljaCB3aWxsIHVwZGF0ZSB0aGUgYWJzb2x1dGUgdmFsdWUgKHB4KSAqL1xuICAgIGNvbERlZi53aWR0aENoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAndXBkYXRlJyksXG4gICAgICAgIHVucngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuY29sRGVmLmFwcGx5V2lkdGgodGhpcy5lbCkpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yb3dDdHgpIHtcbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gdGhpcy5jZWxsQ3R4ID0gdGhpcy5fcm93Q3R4LmNlbGwodGhpcy5jb2xJbmRleCk7XG5cbiAgICAgIGlmIChjZWxsQ29udGV4dC5mb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkID0gY2VsbENvbnRleHQuZm9jdXNlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jZWxsQ3R4LnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID0gY2VsbENvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtZm9vdGVyLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICduZ3JpZEZvb3RlckNlbGwnLFxuIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrRm9vdGVyQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgY2VsbEN0eDogTWV0YUNlbGxDb250ZXh0O1xuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uR3JvdXA+LFxuICAgICAgICAgICAgICBwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMudGFibGUgPSBncmlkO1xuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBhcHBseVdpZHRoLmNhbGwodGhpcyk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbHVtbik7XG5cbiAgICBjb2x1bW5EZWYud2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGV2ZW50ID0+IGV2ZW50LnJlYXNvbiAhPT0gJ3VwZGF0ZScpLFxuICAgICAgICB1bnJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShhcHBseVdpZHRoLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jZWxsQ3R4ID0gTWV0YUNlbGxDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbHVtbkRlZi5jb2x1bW4sIHRoaXMuZ3JpZCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxufVxuIl19