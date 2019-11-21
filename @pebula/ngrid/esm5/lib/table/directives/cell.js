/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-selector
import { first, filter } from 'rxjs/operators';
import { OnInit, AfterViewInit, Component, Directive, ElementRef, DoCheck, ChangeDetectionStrategy, ViewEncapsulation, ViewContainerRef, ViewChild, NgZone, EmbeddedViewRef, Input, } from '@angular/core';
import { CdkHeaderCell, CdkCell, CdkFooterCell } from '@angular/cdk/table';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent } from '../table.component';
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
    function PblNgridHeaderCellComponent(columnDef, table, elementRef, zone) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnDef = columnDef;
        _this.table = table;
        _this.elementRef = elementRef;
        _this.zone = zone;
        /** @type {?} */
        var column = columnDef.column;
        /** @type {?} */
        var el = _this.el = elementRef.nativeElement;
        /*  Apply width changes to this header cell
            We don't update resize events to any of the possible columns because
            - PblColumn headers NEVER change their size, they always reflect the user's definitions
            - PblMetaColumn and PblColumnGroup headers are auto-adjusted by `PblNgridComponent.syncColumnGroupsSize` */
        columnDef.widthChange
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.reason !== 'resize'; })), UnRx(_this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.columnDef.applyWidth(_this.el); }));
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
        if (isPblColumn(col)) {
            this.cellCtx = PblNgridDataHeaderExtensionContext
                .createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
        }
        else {
            this.cellCtx = MetaCellContext.create(col, this.table);
        }
    };
    /**
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var col = this.columnDef.column;
        var vcRef = this.vcRef;
        /** @type {?} */
        var view;
        if (isPblColumn(col)) {
            /** @type {?} */
            var context_1 = (/** @type {?} */ (this.cellCtx));
            view = vcRef.createEmbeddedView(col.headerCellTpl, context_1);
            this.zone.onStable
                .pipe(first())
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.runHeaderExtensions(context_1, (/** @type {?} */ (view)));
                /** @type {?} */
                var v = vcRef.get(0);
                // at this point the view might get destroyed, its possible...
                if (!v.destroyed) {
                    v.detectChanges();
                }
            }));
        }
        else {
            view = vcRef.createEmbeddedView(col.template, this.cellCtx);
        }
        view.detectChanges();
        this.columnDef.applyWidth(this.el);
        initCellElement(this.el, col);
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
        // we collect the first header extension for each unique name only once per table instance
        /** @type {?} */
        var extensions = lastDataHeaderExtensions.get(this.table);
        if (!extensions) {
            /** @type {?} */
            var dataHeaderExtensions_1 = new Map();
            this.table.registry.forMulti('dataHeaderExtensions', (/**
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
            lastDataHeaderExtensions.set(this.table, extensions);
            // destroy it on the next turn, we know all cells will render on the same turn.
            this.zone.onStable.pipe(first()).subscribe((/**
             * @return {?}
             */
            function () { return lastDataHeaderExtensions.delete(_this.table); }));
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
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.columnDef;
    /** @type {?} */
    PblNgridHeaderCellComponent.prototype.table;
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
        _this.colIndex = _this.colDef.table.columnApi.indexOf((/** @type {?} */ (colDef.column)));
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
    function PblNgridFooterCellDirective(columnDef, table, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnDef = columnDef;
        _this.table = table;
        _this.el = elementRef.nativeElement;
        /** @type {?} */
        var column = columnDef.column;
        columnDef.applyWidth(_this.el);
        initCellElement(_this.el, column);
        // update widths for meta rows only, main footer never updates
        if (!isPblColumn(column)) {
            columnDef.widthChange
                .pipe(UnRx(_this))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.columnDef.applyWidth(_this.el); }));
        }
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridFooterCellDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.table);
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
        tslib_1.__metadata("design:paramtypes", [PblNgridColumnDef, PblNgridComponent, ElementRef])
    ], PblNgridFooterCellDirective);
    return PblNgridFooterCellDirective;
}(CdkFooterCell));
export { PblNgridFooterCellDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridFooterCellDirective.prototype.el;
    /** @type {?} */
    PblNgridFooterCellDirective.prototype.cellCtx;
    /**
     * @type {?}
     * @private
     */
    PblNgridFooterCellDirective.prototype.columnDef;
    /** @type {?} */
    PblNgridFooterCellDirective.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxNQUFNLEVBQ04sYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE9BQU8sRUFDUCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsTUFBTSxFQUNOLGVBQWUsRUFDZixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0UsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUcsT0FBTyxFQUFvRCxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0csT0FBTyxFQUFFLGVBQWUsRUFBMkIsYUFBYSxFQUFrQixNQUFNLGtCQUFrQixDQUFDO0FBRTNHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsOEJBQThCLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFFcEksZ0JBQWdCLEdBQUcsdUJBQXVCOztJQUMxQyw2QkFBNkIsR0FBRyxtQ0FBbUM7Ozs7OztBQUV6RSxTQUFTLGVBQWUsQ0FBQyxFQUFlLEVBQUUsTUFBYzs7SUFDdEQsRUFB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dEJZLDJCQUEyQjs7Ozs7O0lBQ3RDLHlDQUF3Qjs7SUFDeEIsOENBQXlCOzs7OztJQUViLGdEQUFvRTs7SUFBRSw0Q0FBK0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbi8vIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1zZWxlY3RvclxuaW1wb3J0IHsgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIERvQ2hlY2ssXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBOZ1pvbmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrSGVhZGVyQ2VsbCwgQ2RrQ2VsbCwgQ2RrRm9vdGVyQ2VsbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IHVuaXF1ZUNvbHVtbkNzcywgdW5pcXVlQ29sdW1uVHlwZUNzcywgQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MgfSBmcm9tICcuLi9jaXJjdWxhci1kZXAtYnJpZGdlJztcbmltcG9ydCB7IENPTFVNTiwgUGJsTWV0YUNvbHVtbiwgUGJsQ29sdW1uLCBQYmxDb2x1bW5Hcm91cCwgaXNQYmxDb2x1bW4sIGlzUGJsQ29sdW1uR3JvdXAgfSBmcm9tICcuLi9jb2x1bW5zJztcbmltcG9ydCB7IE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibFJvd0NvbnRleHQsIFBibENlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAgfSBmcm9tICcuLi9zZXJ2aWNlcy90YWJsZS1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi9jb2x1bW4tZGVmJztcbmltcG9ydCB7IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkgfSBmcm9tICcuL3JlZ2lzdHJ5LmRpcmVjdGl2ZXMnO1xuXG5jb25zdCBIRUFERVJfR1JPVVBfQ1NTID0gYHBibC1oZWFkZXItZ3JvdXAtY2VsbGA7XG5jb25zdCBIRUFERVJfR1JPVVBfUExBQ0VfSE9MREVSX0NTUyA9IGBwYmwtaGVhZGVyLWdyb3VwLWNlbGwtcGxhY2Vob2xkZXJgO1xuXG5mdW5jdGlvbiBpbml0Q2VsbEVsZW1lbnQoZWw6IEhUTUxFbGVtZW50LCBjb2x1bW46IENPTFVNTik6IHZvaWQge1xuICBlbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNvbHVtbkNzcyhjb2x1bW4uY29sdW1uRGVmKSk7XG4gIGlmIChjb2x1bW4udHlwZSkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ29sdW1uVHlwZUNzcyhjb2x1bW4udHlwZSkpO1xuICB9XG4gIGlmIChjb2x1bW4uY3NzKSB7XG4gICAgY29uc3QgY3NzID0gY29sdW1uLmNzcy5zcGxpdCgnICcpO1xuICAgIGZvciAoY29uc3QgYyBvZiBjc3MpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXREYXRhQ2VsbEVsZW1lbnQoZWw6IEhUTUxFbGVtZW50LCBjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICBpZiAoY29sdW1uLmVkaXRhYmxlICYmIGNvbHVtbi5lZGl0b3JUcGwpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKENPTFVNTl9FRElUQUJMRV9DRUxMX0NMQVNTKTtcbiAgfVxufVxuXG5jb25zdCBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMgPSBuZXcgTWFwPFBibE5ncmlkQ29tcG9uZW50PGFueT4sIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcFsnZGF0YUhlYWRlckV4dGVuc2lvbnMnXVtdPigpO1xuXG4vKipcbiAqIEhlYWRlciBjZWxsIGNvbXBvbmVudC5cbiAqIFRoZSBoZWFkZXIgY2VsbCBjb21wb25lbnQgd2lsbCByZW5kZXIgdGhlIGhlYWRlciBjZWxsIHRlbXBsYXRlIGFuZCBhZGQgdGhlIHByb3BlciBjbGFzc2VzIGFuZCByb2xlLlxuICpcbiAqIEl0IGlzIGFsc28gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGFuZCBtYW5hZ2luZyB0aGUgYW55IGBkYXRhSGVhZGVyRXh0ZW5zaW9uc2AgcmVnaXN0ZXJlZCBpbiB0aGUgcmVnaXN0cnkuXG4gKiBUaGVzZSBleHRlbnNpb25zIGFkZCBmZWF0dXJlcyB0byB0aGUgY2VsbHMgZWl0aGVyIGFzIGEgdGVtcGxhdGUgaW5zdGFuY2Ugb3IgYXMgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiBFeGFtcGxlczogU29ydGluZyBiZWhhdmlvciwgZHJhZyZkcm9wL3Jlc2l6ZSBoYW5kbGVycywgbWVudXMgZXRjLi4uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRIZWFkZXJDZWxsJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICN2Y1JlZj48L25nLWNvbnRhaW5lcj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3ZjUmVmJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG5cbiAgY2VsbEN0eDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB8IE1ldGFDZWxsQ29udGV4dDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxUPixcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbkRlZi5jb2x1bW47XG4gICAgY29uc3QgZWwgPSB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAvKiAgQXBwbHkgd2lkdGggY2hhbmdlcyB0byB0aGlzIGhlYWRlciBjZWxsXG4gICAgICAgICAgV2UgZG9uJ3QgdXBkYXRlIHJlc2l6ZSBldmVudHMgdG8gYW55IG9mIHRoZSBwb3NzaWJsZSBjb2x1bW5zIGJlY2F1c2VcbiAgICAgICAgICAtIFBibENvbHVtbiBoZWFkZXJzIE5FVkVSIGNoYW5nZSB0aGVpciBzaXplLCB0aGV5IGFsd2F5cyByZWZsZWN0IHRoZSB1c2VyJ3MgZGVmaW5pdGlvbnNcbiAgICAgICAgICAtIFBibE1ldGFDb2x1bW4gYW5kIFBibENvbHVtbkdyb3VwIGhlYWRlcnMgYXJlIGF1dG8tYWRqdXN0ZWQgYnkgYFBibE5ncmlkQ29tcG9uZW50LnN5bmNDb2x1bW5Hcm91cHNTaXplYCAqL1xuICAgICAgY29sdW1uRGVmLndpZHRoQ2hhbmdlXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlciggZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAncmVzaXplJyksXG4gICAgICAgICAgVW5SeCh0aGlzKSxcbiAgICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpKTtcblxuICAgICAgaWYgKGlzUGJsQ29sdW1uR3JvdXAoY29sdW1uKSkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhFQURFUl9HUk9VUF9DU1MpO1xuICAgICAgICBpZiAoY29sdW1uLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfUExBQ0VfSE9MREVSX0NTUyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbDogQ09MVU1OID0gdGhpcy5jb2x1bW5EZWYuY29sdW1uO1xuICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICB0aGlzLmNlbGxDdHggPSBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0XG4gICAgICAgIC5jcmVhdGVEYXRlSGVhZGVyQ3R4KHRoaXMgYXMgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFBibENvbHVtbj4sIHRoaXMudmNSZWYuaW5qZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNlbGxDdHggPSBNZXRhQ2VsbENvbnRleHQuY3JlYXRlKGNvbCwgdGhpcy50YWJsZSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbDogQ09MVU1OID0gdGhpcy5jb2x1bW5EZWYuY29sdW1uO1xuICAgIGNvbnN0IHsgdmNSZWYgfSA9IHRoaXM7XG4gICAgbGV0IHZpZXc6IEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4+PjtcblxuICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jZWxsQ3R4IGFzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ7XG4gICAgICB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC5oZWFkZXJDZWxsVHBsLCBjb250ZXh0KTtcbiAgICAgIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5ydW5IZWFkZXJFeHRlbnNpb25zKGNvbnRleHQsIHZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pO1xuICAgICAgICAgIGNvbnN0IHYgPSB2Y1JlZi5nZXQoMCk7XG4gICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgdmlldyBtaWdodCBnZXQgZGVzdHJveWVkLCBpdHMgcG9zc2libGUuLi5cbiAgICAgICAgICBpZiAoIXYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB2LmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC50ZW1wbGF0ZSwgdGhpcy5jZWxsQ3R4KTtcbiAgICB9XG5cbiAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2wpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJ1bkhlYWRlckV4dGVuc2lvbnMoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgdmlldzogRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pOiB2b2lkIHtcbiAgICAvLyB3ZSBjb2xsZWN0IHRoZSBmaXJzdCBoZWFkZXIgZXh0ZW5zaW9uIGZvciBlYWNoIHVuaXF1ZSBuYW1lIG9ubHkgb25jZSBwZXIgdGFibGUgaW5zdGFuY2VcbiAgICBsZXQgZXh0ZW5zaW9ucyA9IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5nZXQodGhpcy50YWJsZSk7XG4gICAgaWYgKCFleHRlbnNpb25zKSB7XG4gICAgICBjb25zdCBkYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBhbnk+KCk7XG5cbiAgICAgIHRoaXMudGFibGUucmVnaXN0cnkuZm9yTXVsdGkoJ2RhdGFIZWFkZXJFeHRlbnNpb25zJywgdmFsdWVzID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICBpZiAoIWRhdGFIZWFkZXJFeHRlbnNpb25zLmhhcyh2YWx1ZS5uYW1lKSkge1xuICAgICAgICAgICAgZGF0YUhlYWRlckV4dGVuc2lvbnMuc2V0KHZhbHVlLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBleHRlbnNpb25zID0gQXJyYXkuZnJvbShkYXRhSGVhZGVyRXh0ZW5zaW9ucy52YWx1ZXMoKSk7XG4gICAgICBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuc2V0KHRoaXMudGFibGUsIGV4dGVuc2lvbnMpO1xuICAgICAgLy8gZGVzdHJveSBpdCBvbiB0aGUgbmV4dCB0dXJuLCB3ZSBrbm93IGFsbCBjZWxscyB3aWxsIHJlbmRlciBvbiB0aGUgc2FtZSB0dXJuLlxuICAgICAgdGhpcy56b25lLm9uU3RhYmxlLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCAoKSA9PiBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuZGVsZXRlKHRoaXMudGFibGUpICk7XG4gICAgfVxuXG4gICAgbGV0IHsgcm9vdE5vZGVzIH0gPSB2aWV3O1xuXG4gICAgZm9yIChjb25zdCBleHQgb2YgZXh0ZW5zaW9ucykge1xuICAgICAgaWYgKCFleHQuc2hvdWxkUmVuZGVyIHx8IGV4dC5zaG91bGRSZW5kZXIoY29udGV4dCkpIHtcbiAgICAgICAgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5KSB7XG4gICAgICAgICAgY29uc3QgZXh0VmlldyA9IHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGV4dC50UmVmLCBjb250ZXh0KTtcbiAgICAgICAgICBleHRWaWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9IGVsc2UgaWYgKGV4dCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSkge1xuICAgICAgICAgIHJvb3ROb2RlcyA9IHRoaXMuY3JlYXRlQ29tcG9uZW50KGV4dCwgY29udGV4dCwgcm9vdE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVDb21wb25lbnQoZXh0OiBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8YW55LCBcImRhdGFIZWFkZXJFeHRlbnNpb25zXCI+LCBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCByb290Tm9kZXM6IGFueVtdKTogYW55W10ge1xuICAgIGNvbnN0IGZhY3RvcnkgPSBleHQuZ2V0RmFjdG9yeShjb250ZXh0KTtcbiAgICBjb25zdCBwcm9qZWN0ZWRDb250ZW50OiBhbnlbXVtdID0gW107XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICBwcm9qZWN0ZWRDb250ZW50LnB1c2gocm9vdE5vZGVzKTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSB0aGlzLnZjUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBudWxsLCBwcm9qZWN0ZWRDb250ZW50KTtcblxuICAgIGlmIChleHQucHJvamVjdENvbnRlbnQpIHtcbiAgICAgIHJvb3ROb2RlcyA9IFsgY21wUmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQgXTtcbiAgICB9XG5cbiAgICBpZiAoZXh0Lm9uQ3JlYXRlZCkge1xuICAgICAgZXh0Lm9uQ3JlYXRlZChjb250ZXh0LCBjbXBSZWYpO1xuICAgIH1cblxuICAgIHJldHVybiByb290Tm9kZXM7XG4gIH1cbn1cblxuLyoqIENlbGwgdGVtcGxhdGUgY29udGFpbmVyIHRoYXQgYWRkcyB0aGUgcmlnaHQgY2xhc3NlcyBhbmQgcm9sZS4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jZWxsJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtY2VsbCcsXG4gICAgJ3JvbGUnOiAnZ3JpZGNlbGwnLFxuICB9LFxuICBleHBvcnRBczogJ3BibE5ncmlkQ2VsbCcsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSBleHRlbmRzIENka0NlbGwgaW1wbGVtZW50cyBEb0NoZWNrIHtcblxuICBASW5wdXQoKSBzZXQgcm93Q3R4KHZhbHVlOiBQYmxSb3dDb250ZXh0PGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvd0N0eCkge1xuICAgICAgdGhpcy5fcm93Q3R4ID0gdmFsdWU7XG4gICAgICB0aGlzLm5nRG9DaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jvd0N0eDogUGJsUm93Q29udGV4dDxhbnk+O1xuICBjZWxsQ3R4OiBQYmxDZWxsQ29udGV4dCB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4gZGVmIGFtb25nIGFsbCBjb2x1bW5zIHJlZ2FyZGxlc3Mgb2YgdmlzaWJpbGl0eS5cbiAgICovXG4gIHByaXZhdGUgY29sSW5kZXg6IG51bWJlcjtcbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgZm9jdXNlZCA9IGZhbHNlO1xuICBwcml2YXRlIHNlbGVjdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2xEZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj4sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2xEZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuY29sSW5kZXggPSB0aGlzLmNvbERlZi50YWJsZS5jb2x1bW5BcGkuaW5kZXhPZihjb2xEZWYuY29sdW1uIGFzIFBibENvbHVtbik7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb2xEZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sRGVmLmNvbHVtbik7XG4gICAgaW5pdERhdGFDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uKTtcblxuXG4gICAgLyogIEFwcGx5IHdpZHRoIGNoYW5nZXMgdG8gdGhpcyBkYXRhIGNlbGxcbiAgICAgICAgV2UgZG9uJ3QgdXBkYXRlIFwidXBkYXRlXCIgZXZlbnRzIGJlY2F1c2UgdGhleSBhcmUgZm9sbG93ZWQgYnkgYSByZXNpemUgZXZlbnQgd2hpY2ggd2lsbCB1cGRhdGUgdGhlIGFic29sdXRlIHZhbHVlIChweCkgKi9cbiAgICBjb2xEZWYud2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGV2ZW50ID0+IGV2ZW50LnJlYXNvbiAhPT0gJ3VwZGF0ZScpLFxuICAgICAgICBVblJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB0aGlzLmNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcm93Q3R4KSB7XG4gICAgICBjb25zdCBjZWxsQ29udGV4dCA9IHRoaXMuY2VsbEN0eCA9IHRoaXMuX3Jvd0N0eC5jZWxsKHRoaXMuY29sSW5kZXgpO1xuXG4gICAgICBpZiAoY2VsbENvbnRleHQuZm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCA9IGNlbGxDb250ZXh0LmZvY3VzZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLWZvY3VzZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jZWxsLWZvY3VzZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2VsbEN0eC5zZWxlY3RlZCAhPT0gdGhpcy5zZWxlY3RlZCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9IGNlbGxDb250ZXh0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtZm9vdGVyLWNlbGwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1mb290ZXItY2VsbCcsXG4gICAgJ3JvbGUnOiAnZ3JpZGNlbGwnLFxuICB9LFxuICBleHBvcnRBczogJ25ncmlkRm9vdGVyQ2VsbCcsXG4gfSlcbiBAVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrRm9vdGVyQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBjZWxsQ3R4OiBNZXRhQ2VsbENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cD4sIHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBjb2x1bW5EZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sdW1uKTtcblxuICAgIC8vIHVwZGF0ZSB3aWR0aHMgZm9yIG1ldGEgcm93cyBvbmx5LCBtYWluIGZvb3RlciBuZXZlciB1cGRhdGVzXG4gICAgaWYgKCFpc1BibENvbHVtbihjb2x1bW4pKSB7XG4gICAgICBjb2x1bW5EZWYud2lkdGhDaGFuZ2VcbiAgICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNlbGxDdHggPSBNZXRhQ2VsbENvbnRleHQuY3JlYXRlKHRoaXMuY29sdW1uRGVmLmNvbHVtbiwgdGhpcy50YWJsZSk7XG4gIH1cbn1cbiJdfQ==