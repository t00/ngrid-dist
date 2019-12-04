/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-selector
import { first, filter } from 'rxjs/operators';
import { OnInit, Component, Directive, ElementRef, DoCheck, ChangeDetectionStrategy, ViewEncapsulation, ViewContainerRef, ViewChild, NgZone, EmbeddedViewRef, Input, } from '@angular/core';
import { CdkHeaderCell, CdkCell, CdkFooterCell } from '@angular/cdk/table';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent } from '../ngrid.component';
import { uniqueColumnCss, uniqueColumnTypeCss, COLUMN_EDITABLE_CELL_CLASS } from '../circular-dep-bridge';
import { isPblColumn, isPblColumnGroup } from '../columns';
import { MetaCellContext, PblRowContext } from '../context/index';
import { PblNgridColumnDef, WidthChangeEvent } from './column-def';
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
            for (var css_1 = tslib_1.__values(css), css_1_1 = css_1.next(); !css_1_1.done; css_1_1 = css_1.next()) {
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
    tslib_1.__extends(PblNgridHeaderCellComponent, _super);
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
            .pipe(filter(predicate), UnRx(this))
            .subscribe(widthUpdater.bind(this));
        view && view.detectChanges();
        widthUpdater.call(this);
        initCellElement(this.el, col);
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
        var _this = this;
        var e_2, _a;
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
                    for (var values_1 = tslib_1.__values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
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
            for (var extensions_1 = tslib_1.__values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
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
        var cmpRef = this.vcRef.createComponent(factory, 0, null, projectedContent);
        if (ext.projectContent) {
            rootNodes = [cmpRef.location.nativeElement];
        }
        if (ext.onCreated) {
            ext.onCreated(context, cmpRef);
        }
        return rootNodes;
    };
    PblNgridHeaderCellComponent.ctorParameters = function () { return [
        { type: PblNgridColumnDef },
        { type: PblNgridComponent },
        { type: ElementRef },
        { type: NgZone }
    ]; };
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
    /**
     * Header cell component.
     * The header cell component will render the header cell template and add the proper classes and role.
     *
     * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
     * These extensions add features to the cells either as a template instance or as a component instance.
     * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
     * @template T
     */
    PblNgridHeaderCellComponent = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridColumnDef,
            PblNgridComponent,
            ElementRef,
            NgZone])
    ], PblNgridHeaderCellComponent);
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
    tslib_1.__extends(PblNgridCellDirective, _super);
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
        function (event) { return event.reason !== 'update'; })), UnRx(_this))
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
    PblNgridCellDirective.ctorParameters = function () { return [
        { type: PblNgridColumnDef },
        { type: ElementRef }
    ]; };
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
    /**
     * Cell template container that adds the right classes and role.
     */
    PblNgridCellDirective = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridColumnDef, ElementRef])
    ], PblNgridCellDirective);
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
    tslib_1.__extends(PblNgridFooterCellDirective, _super);
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
        function (event) { return event.reason !== 'update'; })), UnRx(_this))
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
    PblNgridFooterCellDirective.ctorParameters = function () { return [
        { type: PblNgridColumnDef },
        { type: PblNgridComponent },
        { type: ElementRef }
    ]; };
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
    PblNgridFooterCellDirective = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridColumnDef,
            PblNgridComponent,
            ElementRef])
    ], PblNgridFooterCellDirective);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixPQUFPLEVBQ1AsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULE1BQU0sRUFDTixlQUFlLEVBQ2YsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFHLE9BQU8sRUFBb0QsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxlQUFlLEVBQTJCLGFBQWEsRUFBa0IsTUFBTSxrQkFBa0IsQ0FBQztBQUUzRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLDhCQUE4QixFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0lBRXBJLGdCQUFnQixHQUFHLHVCQUF1Qjs7SUFDMUMsNkJBQTZCLEdBQUcsbUNBQW1DOzs7Ozs7QUFFekUsU0FBUyxlQUFlLENBQUMsRUFBZSxFQUFFLE1BQWM7O0lBQ3RELEVB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Q0FBQztRQUVqQyxTQUFTLENBQUMsV0FBVzthQUNsQixJQUFJLENBQ0gsTUFBTTs7OztRQUFFLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQXpCLENBQXlCLEVBQUMsRUFDM0MsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUNYO2FBQ0EsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLENBQUMsQ0FBQzs7SUFDdEMsQ0FBQzs7OztJQUVELDhDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Z0JBcEI4QixpQkFBaUI7Z0JBQ3ZCLGlCQUFpQjtnQkFDbEIsVUFBVTs7O2dCQWpCbkMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLElBQUksRUFBRTt3QkFDSixPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxNQUFNLEVBQUUsVUFBVTtxQkFDbkI7b0JBQ0QsUUFBUSxFQUFFLGlCQUFpQjtpQkFDM0I7Ozs7Z0JBMVFPLGlCQUFpQjtnQkFMakIsaUJBQWlCO2dCQWJ4QixVQUFVOztJQThSQywyQkFBMkI7UUFEdEMsSUFBSSxFQUFFO2lEQU95QixpQkFBaUI7WUFDdkIsaUJBQWlCO1lBQ2xCLFVBQVU7T0FSdkIsMkJBQTJCLENBMkJ2QztJQUFELGtDQUFDO0NBQUEsQ0EzQmdELGFBQWEsR0EyQjdEO1NBM0JZLDJCQUEyQjs7O0lBQ3RDLDhDQUF5Qjs7Ozs7SUFFekIsNENBQWtDOzs7OztJQUVsQyx5Q0FBd0I7Ozs7O0lBQ1osZ0RBQW9FOztJQUNwRSwyQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbi8vIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE9uSW5pdCxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIERvQ2hlY2ssXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBOZ1pvbmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrSGVhZGVyQ2VsbCwgQ2RrQ2VsbCwgQ2RrRm9vdGVyQ2VsbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IHVuaXF1ZUNvbHVtbkNzcywgdW5pcXVlQ29sdW1uVHlwZUNzcywgQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MgfSBmcm9tICcuLi9jaXJjdWxhci1kZXAtYnJpZGdlJztcbmltcG9ydCB7IENPTFVNTiwgUGJsTWV0YUNvbHVtbiwgUGJsQ29sdW1uLCBQYmxDb2x1bW5Hcm91cCwgaXNQYmxDb2x1bW4sIGlzUGJsQ29sdW1uR3JvdXAgfSBmcm9tICcuLi9jb2x1bW5zJztcbmltcG9ydCB7IE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibFJvd0NvbnRleHQsIFBibENlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAgfSBmcm9tICcuLi9zZXJ2aWNlcy9ncmlkLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYsIFdpZHRoQ2hhbmdlRXZlbnQgfSBmcm9tICcuL2NvbHVtbi1kZWYnO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJy4vcmVnaXN0cnkuZGlyZWN0aXZlcyc7XG5cbmNvbnN0IEhFQURFUl9HUk9VUF9DU1MgPSBgcGJsLWhlYWRlci1ncm91cC1jZWxsYDtcbmNvbnN0IEhFQURFUl9HUk9VUF9QTEFDRV9IT0xERVJfQ1NTID0gYHBibC1oZWFkZXItZ3JvdXAtY2VsbC1wbGFjZWhvbGRlcmA7XG5cbmZ1bmN0aW9uIGluaXRDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogQ09MVU1OKTogdm9pZCB7XG4gIGVsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ29sdW1uQ3NzKGNvbHVtbi5jb2x1bW5EZWYpKTtcbiAgaWYgKGNvbHVtbi50eXBlKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDb2x1bW5UeXBlQ3NzKGNvbHVtbi50eXBlKSk7XG4gIH1cbiAgaWYgKGNvbHVtbi5jc3MpIHtcbiAgICBjb25zdCBjc3MgPSBjb2x1bW4uY3NzLnNwbGl0KCcgJyk7XG4gICAgZm9yIChjb25zdCBjIG9mIGNzcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdERhdGFDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gIGlmIChjb2x1bW4uZWRpdGFibGUgJiYgY29sdW1uLmVkaXRvclRwbCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MpO1xuICB9XG59XG5cbmNvbnN0IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwWydkYXRhSGVhZGVyRXh0ZW5zaW9ucyddW10+KCk7XG5cbmZ1bmN0aW9uIGFwcGx5V2lkdGgodGhpczogeyBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmOyBlbDogSFRNTEVsZW1lbnQgfSkge1xuICB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xufVxuXG5mdW5jdGlvbiBhcHBseVNvdXJjZVdpZHRoKHRoaXM6IHsgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjsgZWw6IEhUTUxFbGVtZW50IH0pIHtcbiAgdGhpcy5jb2x1bW5EZWYuYXBwbHlTb3VyY2VXaWR0aCh0aGlzLmVsKTtcbn1cblxuLyoqXG4gKiBIZWFkZXIgY2VsbCBjb21wb25lbnQuXG4gKiBUaGUgaGVhZGVyIGNlbGwgY29tcG9uZW50IHdpbGwgcmVuZGVyIHRoZSBoZWFkZXIgY2VsbCB0ZW1wbGF0ZSBhbmQgYWRkIHRoZSBwcm9wZXIgY2xhc3NlcyBhbmQgcm9sZS5cbiAqXG4gKiBJdCBpcyBhbHNvIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhbmQgbWFuYWdpbmcgdGhlIGFueSBgZGF0YUhlYWRlckV4dGVuc2lvbnNgIHJlZ2lzdGVyZWQgaW4gdGhlIHJlZ2lzdHJ5LlxuICogVGhlc2UgZXh0ZW5zaW9ucyBhZGQgZmVhdHVyZXMgdG8gdGhlIGNlbGxzIGVpdGhlciBhcyBhIHRlbXBsYXRlIGluc3RhbmNlIG9yIGFzIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICogRXhhbXBsZXM6IFNvcnRpbmcgYmVoYXZpb3IsIGRyYWcmZHJvcC9yZXNpemUgaGFuZGxlcnMsIG1lbnVzIGV0Yy4uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxuICBleHBvcnRBczogJ25ncmlkSGVhZGVyQ2VsbCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAjdmNSZWY+PC9uZy1jb250YWluZXI+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxUIGV4dGVuZHMgQ09MVU1OID0gQ09MVU1OPiBleHRlbmRzIENka0hlYWRlckNlbGwgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKCd2Y1JlZicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNlbGxDdHg6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfCBNZXRhQ2VsbENvbnRleHQ7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFQ+LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLnRhYmxlID0gZ3JpZDtcblxuICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbkRlZi5jb2x1bW47XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKGlzUGJsQ29sdW1uR3JvdXAoY29sdW1uKSkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfQ1NTKTtcbiAgICAgIGlmIChjb2x1bW4ucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfUExBQ0VfSE9MREVSX0NTUyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29sOiBDT0xVTU4gPSB0aGlzLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgbGV0IHByZWRpY2F0ZTogKGV2ZW50OiBXaWR0aENoYW5nZUV2ZW50KSA9PiBib29sZWFuO1xuICAgIGxldCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uPj5cbiAgICBsZXQgd2lkdGhVcGRhdGVyOiAoLi4uYXJnczogYW55W10pID0+IHZvaWQ7XG5cbiAgICBpZiAoaXNQYmxDb2x1bW4oY29sKSkge1xuICAgICAgY29uc3QgZ3JpZFdpZHRoUm93ID0gdGhpcy5lbC5wYXJlbnRFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZ3JpZFdpZHRoUm93Jyk7XG4gICAgICB3aWR0aFVwZGF0ZXIgPSBncmlkV2lkdGhSb3cgPyBhcHBseVNvdXJjZVdpZHRoIDogYXBwbHlXaWR0aDtcbiAgICAgIHByZWRpY2F0ZSA9IGV2ZW50ID0+ICghZ3JpZFdpZHRoUm93ICYmIGV2ZW50LnJlYXNvbiAhPT0gJ3VwZGF0ZScpIHx8IChncmlkV2lkdGhSb3cgJiYgZXZlbnQucmVhc29uICE9PSAncmVzaXplJyk7XG4gICAgICB2aWV3ID0gIWdyaWRXaWR0aFJvdyA/IHRoaXMuaW5pdE1haW5IZWFkZXJDb2x1bW5WaWV3KGNvbCkgOiB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpZHRoVXBkYXRlciA9IGFwcGx5U291cmNlV2lkdGg7XG4gICAgICBwcmVkaWNhdGUgPSBldmVudCA9PiBldmVudC5yZWFzb24gIT09ICdyZXNpemUnO1xuICAgICAgdmlldyA9IHRoaXMuaW5pdE1ldGFIZWFkZXJDb2x1bW5WaWV3KGNvbCk7XG4gICAgfVxuXG4gICAgdGhpcy5jb2x1bW5EZWYud2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKGZpbHRlcihwcmVkaWNhdGUpLCBVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSh3aWR0aFVwZGF0ZXIuYmluZCh0aGlzKSk7XG5cbiAgICB2aWV3ICYmIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHdpZHRoVXBkYXRlci5jYWxsKHRoaXMpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2wpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRNYWluSGVhZGVyQ29sdW1uVmlldyhjb2w6IFBibENvbHVtbikge1xuICAgIHRoaXMuY2VsbEN0eCA9IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQuY3JlYXRlRGF0ZUhlYWRlckN0eCh0aGlzIGFzIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxQYmxDb2x1bW4+LCB0aGlzLnZjUmVmLmluamVjdG9yKTtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jZWxsQ3R4IGFzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ7XG4gICAgY29uc3QgdmlldyA9IHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC5oZWFkZXJDZWxsVHBsLCBjb250ZXh0KTtcbiAgICB0aGlzLnpvbmUub25TdGFibGVcbiAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIHRoaXMucnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0LCB2aWV3IGFzIEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4+KTtcbiAgICAgICAgY29uc3QgdiA9IHRoaXMudmNSZWYuZ2V0KDApO1xuICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSB2aWV3IG1pZ2h0IGdldCBkZXN0cm95ZWQsIGl0cyBwb3NzaWJsZS4uLlxuICAgICAgICBpZiAoIXYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgdi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRNZXRhSGVhZGVyQ29sdW1uVmlldyhjb2w6IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cCkge1xuICAgIHRoaXMuY2VsbEN0eCA9IE1ldGFDZWxsQ29udGV4dC5jcmVhdGUoY29sLCB0aGlzLmdyaWQpO1xuICAgIHJldHVybiB0aGlzLnZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhjb2wudGVtcGxhdGUsIHRoaXMuY2VsbEN0eCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik6IHZvaWQge1xuICAgIC8vIHdlIGNvbGxlY3QgdGhlIGZpcnN0IGhlYWRlciBleHRlbnNpb24gZm9yIGVhY2ggdW5pcXVlIG5hbWUgb25seSBvbmNlIHBlciBncmlkIGluc3RhbmNlXG4gICAgbGV0IGV4dGVuc2lvbnMgPSBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuZ2V0KHRoaXMuZ3JpZCk7XG4gICAgaWYgKCFleHRlbnNpb25zKSB7XG4gICAgICBjb25zdCBkYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgIHRoaXMuZ3JpZC5yZWdpc3RyeS5mb3JNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCB2YWx1ZXMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgIGlmICghZGF0YUhlYWRlckV4dGVuc2lvbnMuaGFzKHZhbHVlLm5hbWUpKSB7XG4gICAgICAgICAgICBkYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodmFsdWUubmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGV4dGVuc2lvbnMgPSBBcnJheS5mcm9tKGRhdGFIZWFkZXJFeHRlbnNpb25zLnZhbHVlcygpKTtcbiAgICAgIGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodGhpcy5ncmlkLCBleHRlbnNpb25zKTtcbiAgICAgIC8vIGRlc3Ryb3kgaXQgb24gdGhlIG5leHQgdHVybiwgd2Uga25vdyBhbGwgY2VsbHMgd2lsbCByZW5kZXIgb24gdGhlIHNhbWUgdHVybi5cbiAgICAgIHRoaXMuem9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSggKCkgPT4gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmRlbGV0ZSh0aGlzLmdyaWQpICk7XG4gICAgfVxuXG4gICAgbGV0IHsgcm9vdE5vZGVzIH0gPSB2aWV3O1xuXG4gICAgZm9yIChjb25zdCBleHQgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKCFleHQuc2hvdWxkUmVuZGVyIHx8IGV4dC5zaG91bGRSZW5kZXIoY29udGV4dCkpIHtcbiAgICAgICAgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5KSB7XG4gICAgICAgICAgY29uc3QgZXh0VmlldyA9IHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGV4dC50UmVmLCBjb250ZXh0KTtcbiAgICAgICAgICBleHRWaWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2UgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSkge1xuICAgICAgICAgIHJvb3ROb2RlcyA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KGV4dCwgY29udGV4dCwgcm9vdE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDb21wb25lbnQoZXh0OiBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8YW55LCBcImRhdGFIZWFkZXJFeHRlbnNpb25zXCI+LCBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCByb290Tm9kZXM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSBleHQuZ2V0RmFjdG9yeShjb250ZXh0KTtcbiAgICBjb25zdCBwcm9qZWN0ZWRDb250ZW50OiBhbnlbXVtdID0gW107XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICBwcm9qZWN0ZWRDb250ZW50LnB1c2gocm9vdE5vZGVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBudWxsLCBwcm9qZWN0ZWRDb250ZW50KTtcblxuICAgIGlmIChleHQucHJvamVjdENvbnRlbnQpIHtcbiAgICAgIHJvb3ROb2RlcyA9IFsgY21wUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQgXTtcbiAgICB9XG5cbiAgICBpZiAoZXh0Lm9uQ3JlYXRlZCkge1xuICAgICAgZXh0Lm9uQ3JlYXRlZChjb250ZXh0LCBjbXBSZWYpO1xuICAgIH1cblxuICAgIHJldHVybiByb290Tm9kZXM7XG4gIH1cbn1cblxuLyoqIENlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jZWxsJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtY2VsbCcsXG4gICAgJ3JvbGUnOiAnZ3JpZGNlbGwnLFxuICB9LFxuICBleHBvcnRBczogJ3BibE5ncmlkQ2VsbCcsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSBleHRlbmRzIENka0NlbGwgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICBASW5wdXQoKSBzZXQgcm93Q3R4KHZhbHVlOiBQYmxSb3dDb250ZXh0PGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvd0N0eCkge1xuICAgICAgdGhpcy5fcm93Q3R4ID0gdmFsdWU7XG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jvd0N0eDogUGJsUm93Q29udGV4dDxhbnk+O1xuICBjZWxsQ3R4OiBQYmxDZWxsQ29udGV4dCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4gZGVmIGFtb25nIGFsbCBjb2x1bW5zIHJlZ2FyZGxlc3Mgb2YgdmlzaWJpbGl0eS5cbiAgICovXG4gIHByaXZhdGUgY29sSW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgZm9jdXNlZCA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2xEZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj4sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2xEZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuY29sSW5kZXggPSB0aGlzLmNvbERlZi5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbERlZi5jb2x1bW4gYXMgUGJsQ29sdW1uKTtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uKTtcbiAgICBpbml0RGF0YUNlbGxFbGVtZW50KHRoaXMuZWwsIGNvbERlZi5jb2x1bW4pO1xuXG5cbiAgICAvKiAgQXBwbHkgd2lkdGggY2hhbmdlcyB0byB0aGlzIGRhdGEgY2VsbFxuICAgICAgICBXZSBkb24ndCB1cGRhdGUgXCJ1cGRhdGVcIiBldmVudHMgYmVjYXVzZSB0aGV5IGFyZSBmb2xsb3dlZCBieSBhIHJlc2l6ZSBldmVudCB3aGljaCB3aWxsIHVwZGF0ZSB0aGUgYWJzb2x1dGUgdmFsdWUgKHB4KSAqL1xuICAgIGNvbERlZi53aWR0aENoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAndXBkYXRlJyksXG4gICAgICAgIFVuUngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuY29sRGVmLmFwcGx5V2lkdGgodGhpcy5lbCkpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yb3dDdHgpIHtcbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gdGhpcy5jZWxsQ3R4ID0gdGhpcy5fcm93Q3R4LmNlbGwodGhpcy5jb2xJbmRleCk7XG5cbiAgICAgIGlmIChjZWxsQ29udGV4dC5mb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkID0gY2VsbENvbnRleHQuZm9jdXNlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jZWxsQ3R4LnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID0gY2VsbENvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1mb290ZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRGb290ZXJDZWxsJyxcbiB9KVxuIEBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUgZXh0ZW5kcyBDZGtGb290ZXJDZWxsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgY2VsbEN0eDogTWV0YUNlbGxDb250ZXh0O1xuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ7XG5cbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uR3JvdXA+LFxuICAgICAgICAgICAgICBwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQsXG4gICAgICAgICAgICAgIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMudGFibGUgPSBncmlkO1xuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBhcHBseVdpZHRoLmNhbGwodGhpcyk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbHVtbik7XG5cbiAgICBjb2x1bW5EZWYud2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGV2ZW50ID0+IGV2ZW50LnJlYXNvbiAhPT0gJ3VwZGF0ZScpLFxuICAgICAgICBVblJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShhcHBseVdpZHRoLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jZWxsQ3R4ID0gTWV0YUNlbGxDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbHVtbkRlZi5jb2x1bW4sIHRoaXMuZ3JpZCk7XG4gIH1cbn1cbiJdfQ==