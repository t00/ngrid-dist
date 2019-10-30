/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-selector
import { first } from 'rxjs/operators';
import { Component, Directive, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ViewContainerRef, ViewChild, NgZone, Input, } from '@angular/core';
import { CdkHeaderCell, CdkCell, CdkFooterCell } from '@angular/cdk/table';
import { PblNgridComponent } from '../table.component';
import { uniqueColumnCss, uniqueColumnTypeCss, COLUMN_EDITABLE_CELL_CLASS } from '../circular-dep-bridge';
import { PblColumn, PblColumnGroup } from '../columns';
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
        if (column instanceof PblColumnGroup) {
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
        if (col instanceof PblColumn) {
            this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
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
        if (col instanceof PblColumn) {
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
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    PblNgridHeaderCellComponent.prototype.ngDoCheck = 
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    function () {
        if (this.columnDef.isDirty) {
            this.columnDef.applyWidth(this.el);
        }
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
        initDataCellElement(_this.el, (/** @type {?} */ (colDef.column)));
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
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    PblNgridCellDirective.prototype.ngDoCheck = 
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    function () {
        if (this.colDef.isDirty) {
            this.colDef.applyWidth(this.el);
        }
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
        return _this;
    }
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    PblNgridFooterCellDirective.prototype.ngDoCheck = 
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    function () {
        if (this.columnDef.isDirty) {
            this.columnDef.applyWidth(this.el);
        }
    };
    /**
     * @return {?}
     */
    PblNgridFooterCellDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.table);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkMsT0FBTyxFQUdMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxNQUFNLEVBRU4sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTNFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsbUJBQW1CLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRyxPQUFPLEVBQXlCLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBMkIsYUFBYSxFQUFrQixNQUFNLGtCQUFrQixDQUFDO0FBRTNHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsOEJBQThCLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFFcEksZ0JBQWdCLEdBQUcsdUJBQXVCOztJQUMxQyw2QkFBNkIsR0FBRyxtQ0FBbUM7Ozs7OztBQUV6RSxTQUFTLGVBQWUsQ0FBQyxFQUFlLEVBQUUsTUFBYzs7SUFDdEQsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQ3BELElBQUksTUFBTSxDQUFDLElBQUks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QVEsRUFBRSxpQkFBaUI7aUJBQzNCOzs7O2dCQWpQTyxpQkFBaUI7Z0JBTGpCLGlCQUFpQjtnQkFaeEIsVUFBVTs7SUF5Ulosa0NBQUM7Q0FBQSxBQTlCRCxDQVFpRCxhQUFhLEdBc0I3RDtTQXRCWSwyQkFBMkI7Ozs7OztJQUN0Qyx5Q0FBd0I7O0lBQ3hCLDhDQUF5Qjs7Ozs7SUFFYixnREFBb0U7O0lBQUUsNENBQStCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4vLyB0c2xpbnQ6ZGlzYWJsZTpkaXJlY3RpdmUtc2VsZWN0b3JcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgT25Jbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRG9DaGVjayxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG4gIE5nWm9uZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtIZWFkZXJDZWxsLCBDZGtDZWxsLCBDZGtGb290ZXJDZWxsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgdW5pcXVlQ29sdW1uQ3NzLCB1bmlxdWVDb2x1bW5UeXBlQ3NzLCBDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuaW1wb3J0IHsgQ09MVU1OLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4sIFBibENvbHVtbkdyb3VwIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5pbXBvcnQgeyBNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBQYmxSb3dDb250ZXh0LCBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIH0gZnJvbSAnLi4vc2VydmljZXMvdGFibGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4vY29sdW1uLWRlZic7XG5pbXBvcnQgeyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnLi9yZWdpc3RyeS5kaXJlY3RpdmVzJztcblxuY29uc3QgSEVBREVSX0dST1VQX0NTUyA9IGBwYmwtaGVhZGVyLWdyb3VwLWNlbGxgO1xuY29uc3QgSEVBREVSX0dST1VQX1BMQUNFX0hPTERFUl9DU1MgPSBgcGJsLWhlYWRlci1ncm91cC1jZWxsLXBsYWNlaG9sZGVyYDtcblxuZnVuY3Rpb24gaW5pdENlbGxFbGVtZW50KGVsOiBIVE1MRWxlbWVudCwgY29sdW1uOiBDT0xVTU4pOiB2b2lkIHtcbiAgZWwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDb2x1bW5Dc3MoY29sdW1uLmNvbHVtbkRlZikpO1xuICBpZiAoY29sdW1uLnR5cGUpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNvbHVtblR5cGVDc3MoY29sdW1uLnR5cGUpKTtcbiAgfVxuICBpZiAoY29sdW1uLmNzcykge1xuICAgIGNvbnN0IGNzcyA9IGNvbHVtbi5jc3Muc3BsaXQoJyAnKTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY3NzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0RGF0YUNlbGxFbGVtZW50KGVsOiBIVE1MRWxlbWVudCwgY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgaWYgKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdG9yVHBsKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyk7XG4gIH1cbn1cblxuY29uc3QgbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zID0gbmV3IE1hcDxQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbJ2RhdGFIZWFkZXJFeHRlbnNpb25zJ11bXT4oKTtcblxuLyoqXG4gKiBIZWFkZXIgY2VsbCBjb21wb25lbnQuXG4gKiBUaGUgaGVhZGVyIGNlbGwgY29tcG9uZW50IHdpbGwgcmVuZGVyIHRoZSBoZWFkZXIgY2VsbCB0ZW1wbGF0ZSBhbmQgYWRkIHRoZSBwcm9wZXIgY2xhc3NlcyBhbmQgcm9sZS5cbiAqXG4gKiBJdCBpcyBhbHNvIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhbmQgbWFuYWdpbmcgdGhlIGFueSBgZGF0YUhlYWRlckV4dGVuc2lvbnNgIHJlZ2lzdGVyZWQgaW4gdGhlIHJlZ2lzdHJ5LlxuICogVGhlc2UgZXh0ZW5zaW9ucyBhZGQgZmVhdHVyZXMgdG8gdGhlIGNlbGxzIGVpdGhlciBhcyBhIHRlbXBsYXRlIGluc3RhbmNlIG9yIGFzIGEgY29tcG9uZW50IGluc3RhbmNlLlxuICogRXhhbXBsZXM6IFNvcnRpbmcgYmVoYXZpb3IsIGRyYWcmZHJvcC9yZXNpemUgaGFuZGxlcnMsIG1lbnVzIGV0Yy4uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnLFxuICAgIHJvbGU6ICdjb2x1bW5oZWFkZXInLFxuICB9LFxuICBleHBvcnRBczogJ25ncmlkSGVhZGVyQ2VsbCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAjdmNSZWY+PC9uZy1jb250YWluZXI+YCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxUIGV4dGVuZHMgQ09MVU1OID0gQ09MVU1OPiBleHRlbmRzIENka0hlYWRlckNlbGwgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBAVmlld0NoaWxkKCd2Y1JlZicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuXG4gIGNlbGxDdHg6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfCBNZXRhQ2VsbENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8VD4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5EZWYuY29sdW1uO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChjb2x1bW4gaW5zdGFuY2VvZiBQYmxDb2x1bW5Hcm91cCkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfQ1NTKTtcbiAgICAgIGlmIChjb2x1bW4ucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChIRUFERVJfR1JPVVBfUExBQ0VfSE9MREVSX0NTUyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29sOiBDT0xVTU4gPSB0aGlzLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgaWYgKGNvbCBpbnN0YW5jZW9mIFBibENvbHVtbikge1xuICAgICAgdGhpcy5jZWxsQ3R4ID0gUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dC5jcmVhdGVEYXRlSGVhZGVyQ3R4KHRoaXMgYXMgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFBibENvbHVtbj4sIHRoaXMudmNSZWYuaW5qZWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNlbGxDdHggPSBNZXRhQ2VsbENvbnRleHQuY3JlYXRlKGNvbCwgdGhpcy50YWJsZSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbDogQ09MVU1OID0gdGhpcy5jb2x1bW5EZWYuY29sdW1uO1xuICAgIGNvbnN0IHsgdmNSZWYgfSA9IHRoaXM7XG4gICAgbGV0IHZpZXc6IEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4+PjtcblxuICAgIGlmIChjb2wgaW5zdGFuY2VvZiBQYmxDb2x1bW4pIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNlbGxDdHggYXMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDtcbiAgICAgIHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLmhlYWRlckNlbGxUcGwsIGNvbnRleHQpO1xuICAgICAgdGhpcy56b25lLm9uU3RhYmxlXG4gICAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICB0aGlzLnJ1bkhlYWRlckV4dGVuc2lvbnMoY29udGV4dCwgdmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik7XG4gICAgICAgICAgY29uc3QgdiA9IHZjUmVmLmdldCgwKTtcbiAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSB2aWV3IG1pZ2h0IGdldCBkZXN0cm95ZWQsIGl0cyBwb3NzaWJsZS4uLlxuICAgICAgICAgIGlmICghdi5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLnRlbXBsYXRlLCB0aGlzLmNlbGxDdHgpO1xuICAgIH1cblxuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbCk7XG4gIH1cblxuICAvLyBUT0RPOiBzbWFydCBkaWZmIGhhbmRsaW5nLi4uIGhhbmRsZSBhbGwgZGlmZnMsIG5vdCBqdXN0IHdpZHRoLCBhbmQgY2hhbmdlIG9ubHkgd2hlbiByZXF1aXJlZC5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbkRlZi5pc0RpcnR5KSB7XG4gICAgICB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBydW5IZWFkZXJFeHRlbnNpb25zKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4+KTogdm9pZCB7XG4gICAgLy8gd2UgY29sbGVjdCB0aGUgZmlyc3QgaGVhZGVyIGV4dGVuc2lvbiBmb3IgZWFjaCB1bmlxdWUgbmFtZSBvbmx5IG9uY2UgcGVyIHRhYmxlIGluc3RhbmNlXG4gICAgbGV0IGV4dGVuc2lvbnMgPSBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuZ2V0KHRoaXMudGFibGUpO1xuICAgIGlmICghZXh0ZW5zaW9ucykge1xuICAgICAgY29uc3QgZGF0YUhlYWRlckV4dGVuc2lvbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICB0aGlzLnRhYmxlLnJlZ2lzdHJ5LmZvck11bHRpKCdkYXRhSGVhZGVyRXh0ZW5zaW9ucycsIHZhbHVlcyA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgaWYgKCFkYXRhSGVhZGVyRXh0ZW5zaW9ucy5oYXModmFsdWUubmFtZSkpIHtcbiAgICAgICAgICAgIGRhdGFIZWFkZXJFeHRlbnNpb25zLnNldCh2YWx1ZS5uYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZXh0ZW5zaW9ucyA9IEFycmF5LmZyb20oZGF0YUhlYWRlckV4dGVuc2lvbnMudmFsdWVzKCkpO1xuICAgICAgbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLnNldCh0aGlzLnRhYmxlLCBleHRlbnNpb25zKTtcbiAgICAgIC8vIGRlc3Ryb3kgaXQgb24gdGhlIG5leHQgdHVybiwgd2Uga25vdyBhbGwgY2VsbHMgd2lsbCByZW5kZXIgb24gdGhlIHNhbWUgdHVybi5cbiAgICAgIHRoaXMuem9uZS5vblN0YWJsZS5waXBlKGZpcnN0KCkpLnN1YnNjcmliZSggKCkgPT4gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmRlbGV0ZSh0aGlzLnRhYmxlKSApO1xuICAgIH1cblxuICAgIGxldCB7IHJvb3ROb2RlcyB9ID0gdmlldztcblxuICAgIGZvciAoY29uc3QgZXh0IG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmICghZXh0LnNob3VsZFJlbmRlciB8fCBleHQuc2hvdWxkUmVuZGVyKGNvbnRleHQpKSB7XG4gICAgICAgIGlmIChleHQgaW5zdGFuY2VvZiBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSkge1xuICAgICAgICAgIGNvbnN0IGV4dFZpZXcgPSB0aGlzLnZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhleHQudFJlZiwgY29udGV4dCk7XG4gICAgICAgICAgZXh0Vmlldy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIGlmIChleHQgaW5zdGFuY2VvZiBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnkpIHtcbiAgICAgICAgICByb290Tm9kZXMgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudChleHQsIGNvbnRleHQsIHJvb3ROb2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlQ29tcG9uZW50KGV4dDogUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PGFueSwgXCJkYXRhSGVhZGVyRXh0ZW5zaW9uc1wiPiwgY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgcm9vdE5vZGVzOiBhbnlbXSk6IGFueVtdIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gZXh0LmdldEZhY3RvcnkoY29udGV4dCk7XG4gICAgY29uc3QgcHJvamVjdGVkQ29udGVudDogYW55W11bXSA9IFtdO1xuXG4gICAgaWYgKGV4dC5wcm9qZWN0Q29udGVudCkge1xuICAgICAgcHJvamVjdGVkQ29udGVudC5wdXNoKHJvb3ROb2Rlcyk7XG4gICAgfVxuXG4gICAgY29uc3QgY21wUmVmID0gdGhpcy52Y1JlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgMCwgbnVsbCwgcHJvamVjdGVkQ29udGVudCk7XG5cbiAgICBpZiAoZXh0LnByb2plY3RDb250ZW50KSB7XG4gICAgICByb290Tm9kZXMgPSBbIGNtcFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50IF07XG4gICAgfVxuXG4gICAgaWYgKGV4dC5vbkNyZWF0ZWQpIHtcbiAgICAgIGV4dC5vbkNyZWF0ZWQoY29udGV4dCwgY21wUmVmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm9vdE5vZGVzO1xuICB9XG59XG5cbi8qKiBDZWxsIHRlbXBsYXRlIGNvbnRhaW5lciB0aGF0IGFkZHMgdGhlIHJpZ2h0IGNsYXNzZXMgYW5kIHJvbGUuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZENlbGwnLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxEaXJlY3RpdmUgZXh0ZW5kcyBDZGtDZWxsIGltcGxlbWVudHMgRG9DaGVjayB7XG5cbiAgQElucHV0KCkgc2V0IHJvd0N0eCh2YWx1ZTogUGJsUm93Q29udGV4dDxhbnk+KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb3dDdHgpIHtcbiAgICAgIHRoaXMuX3Jvd0N0eCA9IHZhbHVlO1xuICAgICAgdGhpcy5uZ0RvQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yb3dDdHg6IFBibFJvd0NvbnRleHQ8YW55PjtcbiAgY2VsbEN0eDogUGJsQ2VsbENvbnRleHQgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgY29sdW1uIGRlZiBhbW9uZyBhbGwgY29sdW1ucyByZWdhcmRsZXNzIG9mIHZpc2liaWxpdHkuXG4gICAqL1xuICBwcml2YXRlIGNvbEluZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGZvY3VzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sRGVmOiBQYmxOZ3JpZENvbHVtbkRlZiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNvbERlZiwgZWxlbWVudFJlZik7XG4gICAgdGhpcy5jb2xJbmRleCA9IHRoaXMuY29sRGVmLnRhYmxlLmNvbHVtbkFwaS5pbmRleE9mKGNvbERlZi5jb2x1bW4gYXMgUGJsQ29sdW1uKTtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uKTtcbiAgICBpbml0RGF0YUNlbGxFbGVtZW50KHRoaXMuZWwsIGNvbERlZi5jb2x1bW4gYXMgUGJsQ29sdW1uKTtcbiAgfVxuXG4gIC8vIFRPRE86IHNtYXJ0IGRpZmYgaGFuZGxpbmcuLi4gaGFuZGxlIGFsbCBkaWZmcywgbm90IGp1c3Qgd2lkdGgsIGFuZCBjaGFuZ2Ugb25seSB3aGVuIHJlcXVpcmVkLlxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sRGVmLmlzRGlydHkpIHtcbiAgICAgIHRoaXMuY29sRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3Jvd0N0eCkge1xuICAgICAgY29uc3QgY2VsbENvbnRleHQgPSB0aGlzLmNlbGxDdHggPSB0aGlzLl9yb3dDdHguY2VsbCh0aGlzLmNvbEluZGV4KTtcblxuICAgICAgaWYgKGNlbGxDb250ZXh0LmZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQgPSBjZWxsQ29udGV4dC5mb2N1c2VkKSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY2VsbC1mb2N1c2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1mb2N1c2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNlbGxDdHguc2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPSBjZWxsQ29udGV4dC5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtZm9vdGVyLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICduZ3JpZEZvb3RlckNlbGwnLFxuIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrRm9vdGVyQ2VsbCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uSW5pdCB7XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBjZWxsQ3R4OiBNZXRhQ2VsbENvbnRleHQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cD4sIHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBjb2x1bW5EZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sdW1uKTtcbiAgfVxuXG4gIC8vIFRPRE86IHNtYXJ0IGRpZmYgaGFuZGxpbmcuLi4gaGFuZGxlIGFsbCBkaWZmcywgbm90IGp1c3Qgd2lkdGgsIGFuZCBjaGFuZ2Ugb25seSB3aGVuIHJlcXVpcmVkLlxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sdW1uRGVmLmlzRGlydHkpIHtcbiAgICAgIHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jZWxsQ3R4ID0gTWV0YUNlbGxDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbHVtbkRlZi5jb2x1bW4sIHRoaXMudGFibGUpO1xuICB9XG59XG4iXX0=