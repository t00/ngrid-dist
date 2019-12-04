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
const HEADER_GROUP_CSS = `pbl-header-group-cell`;
/** @type {?} */
const HEADER_GROUP_PLACE_HOLDER_CSS = `pbl-header-group-cell-placeholder`;
/**
 * @param {?} el
 * @param {?} column
 * @return {?}
 */
function initCellElement(el, column) {
    el.classList.add(uniqueColumnCss(column.columnDef));
    if (column.type) {
        el.classList.add(uniqueColumnTypeCss(column.type));
    }
    if (column.css) {
        /** @type {?} */
        const css = column.css.split(' ');
        for (const c of css) {
            el.classList.add(c);
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
const lastDataHeaderExtensions = new Map();
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
let PblNgridHeaderCellComponent = /**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 * @template T
 */
class PblNgridHeaderCellComponent extends CdkHeaderCell {
    /**
     * @param {?} columnDef
     * @param {?} grid
     * @param {?} elementRef
     * @param {?} zone
     */
    constructor(columnDef, grid, elementRef, zone) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.grid = grid;
        this.elementRef = elementRef;
        this.zone = zone;
        this.table = grid;
        /** @type {?} */
        const column = columnDef.column;
        /** @type {?} */
        const el = this.el = elementRef.nativeElement;
        if (isPblColumnGroup(column)) {
            el.classList.add(HEADER_GROUP_CSS);
            if (column.placeholder) {
                el.classList.add(HEADER_GROUP_PLACE_HOLDER_CSS);
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        /** @type {?} */
        const col = this.columnDef.column;
        /** @type {?} */
        let predicate;
        /** @type {?} */
        let view;
        /** @type {?} */
        let widthUpdater;
        if (isPblColumn(col)) {
            /** @type {?} */
            const gridWidthRow = this.el.parentElement.hasAttribute('gridWidthRow');
            widthUpdater = gridWidthRow ? applySourceWidth : applyWidth;
            predicate = (/**
             * @param {?} event
             * @return {?}
             */
            event => (!gridWidthRow && event.reason !== 'update') || (gridWidthRow && event.reason !== 'resize'));
            view = !gridWidthRow ? this.initMainHeaderColumnView(col) : undefined;
        }
        else {
            widthUpdater = applySourceWidth;
            predicate = (/**
             * @param {?} event
             * @return {?}
             */
            event => event.reason !== 'resize');
            view = this.initMetaHeaderColumnView(col);
        }
        this.columnDef.widthChange
            .pipe(filter(predicate), UnRx(this))
            .subscribe(widthUpdater.bind(this));
        view && view.detectChanges();
        widthUpdater.call(this);
        initCellElement(this.el, col);
    }
    /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    initMainHeaderColumnView(col) {
        this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
        /** @type {?} */
        const context = (/** @type {?} */ (this.cellCtx));
        /** @type {?} */
        const view = this.vcRef.createEmbeddedView(col.headerCellTpl, context);
        this.zone.onStable
            .pipe(first())
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.runHeaderExtensions(context, (/** @type {?} */ (view)));
            /** @type {?} */
            const v = this.vcRef.get(0);
            // at this point the view might get destroyed, its possible...
            if (!v.destroyed) {
                v.detectChanges();
            }
        }));
        return view;
    }
    /**
     * @protected
     * @param {?} col
     * @return {?}
     */
    initMetaHeaderColumnView(col) {
        this.cellCtx = MetaCellContext.create(col, this.grid);
        return this.vcRef.createEmbeddedView(col.template, this.cellCtx);
    }
    /**
     * @protected
     * @param {?} context
     * @param {?} view
     * @return {?}
     */
    runHeaderExtensions(context, view) {
        // we collect the first header extension for each unique name only once per grid instance
        /** @type {?} */
        let extensions = lastDataHeaderExtensions.get(this.grid);
        if (!extensions) {
            /** @type {?} */
            const dataHeaderExtensions = new Map();
            this.grid.registry.forMulti('dataHeaderExtensions', (/**
             * @param {?} values
             * @return {?}
             */
            values => {
                for (const value of values) {
                    if (!dataHeaderExtensions.has(value.name)) {
                        dataHeaderExtensions.set(value.name, value);
                    }
                }
            }));
            extensions = Array.from(dataHeaderExtensions.values());
            lastDataHeaderExtensions.set(this.grid, extensions);
            // destroy it on the next turn, we know all cells will render on the same turn.
            this.zone.onStable.pipe(first()).subscribe((/**
             * @return {?}
             */
            () => lastDataHeaderExtensions.delete(this.grid)));
        }
        let { rootNodes } = view;
        for (const ext of extensions) {
            if (!ext.shouldRender || ext.shouldRender(context)) {
                if (ext instanceof PblNgridMultiTemplateRegistry) {
                    /** @type {?} */
                    const extView = this.vcRef.createEmbeddedView(ext.tRef, context);
                    extView.markForCheck();
                }
                else if (ext instanceof PblNgridMultiComponentRegistry) {
                    rootNodes = this.createComponent(ext, context, rootNodes);
                }
            }
        }
    }
    /**
     * @protected
     * @param {?} ext
     * @param {?} context
     * @param {?} rootNodes
     * @return {?}
     */
    createComponent(ext, context, rootNodes) {
        /** @type {?} */
        const factory = ext.getFactory(context);
        /** @type {?} */
        const projectedContent = [];
        if (ext.projectContent) {
            projectedContent.push(rootNodes);
        }
        /** @type {?} */
        const cmpRef = this.vcRef.createComponent(factory, 0, null, projectedContent);
        if (ext.projectContent) {
            rootNodes = [cmpRef.location.nativeElement];
        }
        if (ext.onCreated) {
            ext.onCreated(context, cmpRef);
        }
        return rootNodes;
    }
};
PblNgridHeaderCellComponent.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef },
    { type: NgZone }
];
PblNgridHeaderCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-header-cell',
                host: {
                    class: 'pbl-ngrid-header-cell',
                    role: 'columnheader',
                },
                exportAs: 'ngridHeaderCell',
                template: `<ng-container #vcRef></ng-container>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PblNgridHeaderCellComponent.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef },
    { type: NgZone }
];
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
let PblNgridCellDirective = /**
 * Cell template container that adds the right classes and role.
 */
class PblNgridCellDirective extends CdkCell {
    /**
     * @param {?} colDef
     * @param {?} elementRef
     */
    constructor(colDef, elementRef) {
        super(colDef, elementRef);
        this.colDef = colDef;
        this.focused = false;
        this.selected = false;
        this.colIndex = this.colDef.grid.columnApi.indexOf((/** @type {?} */ (colDef.column)));
        this.el = elementRef.nativeElement;
        colDef.applyWidth(this.el);
        initCellElement(this.el, colDef.column);
        initDataCellElement(this.el, colDef.column);
        /*  Apply width changes to this data cell
            We don't update "update" events because they are followed by a resize event which will update the absolute value (px) */
        colDef.widthChange
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.reason !== 'update')), UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.colDef.applyWidth(this.el)));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set rowCtx(value) {
        if (value !== this._rowCtx) {
            this._rowCtx = value;
            this.ngDoCheck();
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._rowCtx) {
            /** @type {?} */
            const cellContext = this.cellCtx = this._rowCtx.cell(this.colIndex);
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
    }
};
PblNgridCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: ElementRef }
];
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
PblNgridCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: ElementRef }
];
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
let PblNgridFooterCellDirective = class PblNgridFooterCellDirective extends CdkFooterCell {
    /**
     * @param {?} columnDef
     * @param {?} grid
     * @param {?} elementRef
     */
    constructor(columnDef, grid, elementRef) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.grid = grid;
        this.table = grid;
        this.el = elementRef.nativeElement;
        /** @type {?} */
        const column = columnDef.column;
        applyWidth.call(this);
        initCellElement(this.el, column);
        columnDef.widthChange
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.reason !== 'update')), UnRx(this))
            .subscribe(applyWidth.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.grid);
    }
};
PblNgridFooterCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef }
];
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
PblNgridFooterCellDirective.ctorParameters = () => [
    { type: PblNgridColumnDef },
    { type: PblNgridComponent },
    { type: ElementRef }
];
PblNgridFooterCellDirective = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridColumnDef,
        PblNgridComponent,
        ElementRef])
], PblNgridFooterCellDirective);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixPQUFPLEVBQ1AsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULE1BQU0sRUFDTixlQUFlLEVBQ2YsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFHLE9BQU8sRUFBb0QsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxlQUFlLEVBQTJCLGFBQWEsRUFBa0IsTUFBTSxrQkFBa0IsQ0FBQztBQUUzRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbkUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLDhCQUE4QixFQUFFLDZCQUE2QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O01BRXBJLGdCQUFnQixHQUFHLHVCQUF1Qjs7TUFDMUMsNkJBQTZCLEdBQUcsbUNBQW1DOzs7Ozs7QUFFekUsU0FBUyxlQUFlLENBQUMsRUFBZSxFQUFFLE1BQWM7SUFDdEQsRUFB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QUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0YsQ0FBQTs7WUFyQmdDLGlCQUFpQjtZQUN2QixpQkFBaUI7WUFDbEIsVUFBVTs7O1lBakJuQyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsSUFBSSxFQUFFO29CQUNKLE9BQU8sRUFBRSx1QkFBdUI7b0JBQ2hDLE1BQU0sRUFBRSxVQUFVO2lCQUNuQjtnQkFDRCxRQUFRLEVBQUUsaUJBQWlCO2FBQzNCOzs7O1lBMVFPLGlCQUFpQjtZQUxqQixpQkFBaUI7WUFieEIsVUFBVTs7QUE4UkMsMkJBQTJCO0lBRHRDLElBQUksRUFBRTs2Q0FPeUIsaUJBQWlCO1FBQ3ZCLGlCQUFpQjtRQUNsQixVQUFVO0dBUnZCLDJCQUEyQixDQTJCdkM7U0EzQlksMkJBQTJCOzs7SUFDdEMsOENBQXlCOzs7OztJQUV6Qiw0Q0FBa0M7Ozs7O0lBRWxDLHlDQUF3Qjs7Ozs7SUFDWixnREFBb0U7O0lBQ3BFLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgT25Jbml0LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRG9DaGVjayxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG4gIE5nWm9uZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtIZWFkZXJDZWxsLCBDZGtDZWxsLCBDZGtGb290ZXJDZWxsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgdW5pcXVlQ29sdW1uQ3NzLCB1bmlxdWVDb2x1bW5UeXBlQ3NzLCBDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuaW1wb3J0IHsgQ09MVU1OLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4sIFBibENvbHVtbkdyb3VwLCBpc1BibENvbHVtbiwgaXNQYmxDb2x1bW5Hcm91cCB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsUm93Q29udGV4dCwgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB9IGZyb20gJy4uL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiwgV2lkdGhDaGFuZ2VFdmVudCB9IGZyb20gJy4vY29sdW1uLWRlZic7XG5pbXBvcnQgeyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnLi9yZWdpc3RyeS5kaXJlY3RpdmVzJztcblxuY29uc3QgSEVBREVSX0dST1VQX0NTUyA9IGBwYmwtaGVhZGVyLWdyb3VwLWNlbGxgO1xuY29uc3QgSEVBREVSX0dST1VQX1BMQUNFX0hPTERFUl9DU1MgPSBgcGJsLWhlYWRlci1ncm91cC1jZWxsLXBsYWNlaG9sZGVyYDtcblxuZnVuY3Rpb24gaW5pdENlbGxFbGVtZW50KGVsOiBIVE1MRWxlbWVudCwgY29sdW1uOiBDT0xVTU4pOiB2b2lkIHtcbiAgZWwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDb2x1bW5Dc3MoY29sdW1uLmNvbHVtbkRlZikpO1xuICBpZiAoY29sdW1uLnR5cGUpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNvbHVtblR5cGVDc3MoY29sdW1uLnR5cGUpKTtcbiAgfVxuICBpZiAoY29sdW1uLmNzcykge1xuICAgIGNvbnN0IGNzcyA9IGNvbHVtbi5jc3Muc3BsaXQoJyAnKTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY3NzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0RGF0YUNlbGxFbGVtZW50KGVsOiBIVE1MRWxlbWVudCwgY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgaWYgKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdG9yVHBsKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyk7XG4gIH1cbn1cblxuY29uc3QgbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zID0gbmV3IE1hcDxQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbJ2RhdGFIZWFkZXJFeHRlbnNpb25zJ11bXT4oKTtcblxuZnVuY3Rpb24gYXBwbHlXaWR0aCh0aGlzOiB7IGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY7IGVsOiBIVE1MRWxlbWVudCB9KSB7XG4gIHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5U291cmNlV2lkdGgodGhpczogeyBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmOyBlbDogSFRNTEVsZW1lbnQgfSkge1xuICB0aGlzLmNvbHVtbkRlZi5hcHBseVNvdXJjZVdpZHRoKHRoaXMuZWwpO1xufVxuXG4vKipcbiAqIEhlYWRlciBjZWxsIGNvbXBvbmVudC5cbiAqIFRoZSBoZWFkZXIgY2VsbCBjb21wb25lbnQgd2lsbCByZW5kZXIgdGhlIGhlYWRlciBjZWxsIHRlbXBsYXRlIGFuZCBhZGQgdGhlIHByb3BlciBjbGFzc2VzIGFuZCByb2xlLlxuICpcbiAqIEl0IGlzIGFsc28gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGFuZCBtYW5hZ2luZyB0aGUgYW55IGBkYXRhSGVhZGVyRXh0ZW5zaW9uc2AgcmVnaXN0ZXJlZCBpbiB0aGUgcmVnaXN0cnkuXG4gKiBUaGVzZSBleHRlbnNpb25zIGFkZCBmZWF0dXJlcyB0byB0aGUgY2VsbHMgZWl0aGVyIGFzIGEgdGVtcGxhdGUgaW5zdGFuY2Ugb3IgYXMgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiBFeGFtcGxlczogU29ydGluZyBiZWhhdmlvciwgZHJhZyZkcm9wL3Jlc2l6ZSBoYW5kbGVycywgbWVudXMgZXRjLi4uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRIZWFkZXJDZWxsJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICN2Y1JlZj48L25nLWNvbnRhaW5lcj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ3ZjUmVmJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG5cbiAgY2VsbEN0eDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB8IE1ldGFDZWxsQ29udGV4dDtcblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8VD4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUpIHtcbiAgICBzdXBlcihjb2x1bW5EZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMudGFibGUgPSBncmlkO1xuXG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoaXNQYmxDb2x1bW5Hcm91cChjb2x1bW4pKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKEhFQURFUl9HUk9VUF9DU1MpO1xuICAgICAgaWYgKGNvbHVtbi5wbGFjZWhvbGRlcikge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhFQURFUl9HUk9VUF9QTEFDRV9IT0xERVJfQ1NTKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb2w6IENPTFVNTiA9IHRoaXMuY29sdW1uRGVmLmNvbHVtbjtcbiAgICBsZXQgcHJlZGljYXRlOiAoZXZlbnQ6IFdpZHRoQ2hhbmdlRXZlbnQpID0+IGJvb2xlYW47XG4gICAgbGV0IHZpZXc6IEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4+PlxuICAgIGxldCB3aWR0aFVwZGF0ZXI6ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZDtcblxuICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICBjb25zdCBncmlkV2lkdGhSb3cgPSB0aGlzLmVsLnBhcmVudEVsZW1lbnQuaGFzQXR0cmlidXRlKCdncmlkV2lkdGhSb3cnKTtcbiAgICAgIHdpZHRoVXBkYXRlciA9IGdyaWRXaWR0aFJvdyA/IGFwcGx5U291cmNlV2lkdGggOiBhcHBseVdpZHRoO1xuICAgICAgcHJlZGljYXRlID0gZXZlbnQgPT4gKCFncmlkV2lkdGhSb3cgJiYgZXZlbnQucmVhc29uICE9PSAndXBkYXRlJykgfHwgKGdyaWRXaWR0aFJvdyAmJiBldmVudC5yZWFzb24gIT09ICdyZXNpemUnKTtcbiAgICAgIHZpZXcgPSAhZ3JpZFdpZHRoUm93ID8gdGhpcy5pbml0TWFpbkhlYWRlckNvbHVtblZpZXcoY29sKSA6IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGhVcGRhdGVyID0gYXBwbHlTb3VyY2VXaWR0aDtcbiAgICAgIHByZWRpY2F0ZSA9IGV2ZW50ID0+IGV2ZW50LnJlYXNvbiAhPT0gJ3Jlc2l6ZSc7XG4gICAgICB2aWV3ID0gdGhpcy5pbml0TWV0YUhlYWRlckNvbHVtblZpZXcoY29sKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbHVtbkRlZi53aWR0aENoYW5nZVxuICAgICAgLnBpcGUoZmlsdGVyKHByZWRpY2F0ZSksIFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKHdpZHRoVXBkYXRlci5iaW5kKHRoaXMpKTtcblxuICAgIHZpZXcgJiYgdmlldy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgd2lkdGhVcGRhdGVyLmNhbGwodGhpcyk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdE1haW5IZWFkZXJDb2x1bW5WaWV3KGNvbDogUGJsQ29sdW1uKSB7XG4gICAgdGhpcy5jZWxsQ3R4ID0gUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dC5jcmVhdGVEYXRlSGVhZGVyQ3R4KHRoaXMgYXMgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFBibENvbHVtbj4sIHRoaXMudmNSZWYuaW5qZWN0b3IpO1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNlbGxDdHggYXMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDtcbiAgICBjb25zdCB2aWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLmhlYWRlckNlbGxUcGwsIGNvbnRleHQpO1xuICAgIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgLnBpcGUoZmlyc3QoKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy5ydW5IZWFkZXJFeHRlbnNpb25zKGNvbnRleHQsIHZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pO1xuICAgICAgICBjb25zdCB2ID0gdGhpcy52Y1JlZi5nZXQoMCk7XG4gICAgICAgIC8vIGF0IHRoaXMgcG9pbnQgdGhlIHZpZXcgbWlnaHQgZ2V0IGRlc3Ryb3llZCwgaXRzIHBvc3NpYmxlLi4uXG4gICAgICAgIGlmICghdi5kZXN0cm95ZWQpIHtcbiAgICAgICAgICB2LmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdE1ldGFIZWFkZXJDb2x1bW5WaWV3KGNvbDogUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbkdyb3VwKSB7XG4gICAgdGhpcy5jZWxsQ3R4ID0gTWV0YUNlbGxDb250ZXh0LmNyZWF0ZShjb2wsIHRoaXMuZ3JpZCk7XG4gICAgcmV0dXJuIHRoaXMudmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC50ZW1wbGF0ZSwgdGhpcy5jZWxsQ3R4KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBydW5IZWFkZXJFeHRlbnNpb25zKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIHZpZXc6IEVtYmVkZGVkVmlld1JlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4+KTogdm9pZCB7XG4gICAgLy8gd2UgY29sbGVjdCB0aGUgZmlyc3QgaGVhZGVyIGV4dGVuc2lvbiBmb3IgZWFjaCB1bmlxdWUgbmFtZSBvbmx5IG9uY2UgcGVyIGdyaWQgaW5zdGFuY2VcbiAgICBsZXQgZXh0ZW5zaW9ucyA9IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5nZXQodGhpcy5ncmlkKTtcbiAgICBpZiAoIWV4dGVuc2lvbnMpIHtcbiAgICAgIGNvbnN0IGRhdGFIZWFkZXJFeHRlbnNpb25zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgdGhpcy5ncmlkLnJlZ2lzdHJ5LmZvck11bHRpKCdkYXRhSGVhZGVyRXh0ZW5zaW9ucycsIHZhbHVlcyA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgICAgaWYgKCFkYXRhSGVhZGVyRXh0ZW5zaW9ucy5oYXModmFsdWUubmFtZSkpIHtcbiAgICAgICAgICAgIGRhdGFIZWFkZXJFeHRlbnNpb25zLnNldCh2YWx1ZS5uYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZXh0ZW5zaW9ucyA9IEFycmF5LmZyb20oZGF0YUhlYWRlckV4dGVuc2lvbnMudmFsdWVzKCkpO1xuICAgICAgbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLnNldCh0aGlzLmdyaWQsIGV4dGVuc2lvbnMpO1xuICAgICAgLy8gZGVzdHJveSBpdCBvbiB0aGUgbmV4dCB0dXJuLCB3ZSBrbm93IGFsbCBjZWxscyB3aWxsIHJlbmRlciBvbiB0aGUgc2FtZSB0dXJuLlxuICAgICAgdGhpcy56b25lLm9uU3RhYmxlLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCAoKSA9PiBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuZGVsZXRlKHRoaXMuZ3JpZCkgKTtcbiAgICB9XG5cbiAgICBsZXQgeyByb290Tm9kZXMgfSA9IHZpZXc7XG5cbiAgICBmb3IgKGNvbnN0IGV4dCBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoIWV4dC5zaG91bGRSZW5kZXIgfHwgZXh0LnNob3VsZFJlbmRlcihjb250ZXh0KSkge1xuICAgICAgICBpZiAoZXh0IGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkpIHtcbiAgICAgICAgICBjb25zdCBleHRWaWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoZXh0LnRSZWYsIGNvbnRleHQpO1xuICAgICAgICAgIGV4dFZpZXcubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXh0IGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5KSB7XG4gICAgICAgICAgcm9vdE5vZGVzID0gdGhpcy5jcmVhdGVDb21wb25lbnQoZXh0LCBjb250ZXh0LCByb290Tm9kZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbXBvbmVudChleHQ6IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxhbnksIFwiZGF0YUhlYWRlckV4dGVuc2lvbnNcIj4sIGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIHJvb3ROb2RlczogYW55W10pOiBhbnlbXSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IGV4dC5nZXRGYWN0b3J5KGNvbnRleHQpO1xuICAgIGNvbnN0IHByb2plY3RlZENvbnRlbnQ6IGFueVtdW10gPSBbXTtcblxuICAgIGlmIChleHQucHJvamVjdENvbnRlbnQpIHtcbiAgICAgIHByb2plY3RlZENvbnRlbnQucHVzaChyb290Tm9kZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGNtcFJlZiA9IHRoaXMudmNSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIG51bGwsIHByb2plY3RlZENvbnRlbnQpO1xuXG4gICAgaWYgKGV4dC5wcm9qZWN0Q29udGVudCkge1xuICAgICAgcm9vdE5vZGVzID0gWyBjbXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCBdO1xuICAgIH1cblxuICAgIGlmIChleHQub25DcmVhdGVkKSB7XG4gICAgICBleHQub25DcmVhdGVkKGNvbnRleHQsIGNtcFJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlcztcbiAgfVxufVxuXG4vKiogQ2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWNlbGwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDZWxsJyxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrQ2VsbCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIEBJbnB1dCgpIHNldCByb3dDdHgodmFsdWU6IFBibFJvd0NvbnRleHQ8YW55Pikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm93Q3R4KSB7XG4gICAgICB0aGlzLl9yb3dDdHggPSB2YWx1ZTtcbiAgICAgIHRoaXMubmdEb0NoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcm93Q3R4OiBQYmxSb3dDb250ZXh0PGFueT47XG4gIGNlbGxDdHg6IFBibENlbGxDb250ZXh0IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBkZWYgYW1vbmcgYWxsIGNvbHVtbnMgcmVnYXJkbGVzcyBvZiB2aXNpYmlsaXR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjb2xJbmRleDogbnVtYmVyO1xuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBmb2N1c2VkID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbERlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNvbERlZiwgZWxlbWVudFJlZik7XG4gICAgdGhpcy5jb2xJbmRleCA9IHRoaXMuY29sRGVmLmdyaWQuY29sdW1uQXBpLmluZGV4T2YoY29sRGVmLmNvbHVtbiBhcyBQYmxDb2x1bW4pO1xuICAgIHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29sRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbERlZi5jb2x1bW4pO1xuICAgIGluaXREYXRhQ2VsbEVsZW1lbnQodGhpcy5lbCwgY29sRGVmLmNvbHVtbik7XG5cblxuICAgIC8qICBBcHBseSB3aWR0aCBjaGFuZ2VzIHRvIHRoaXMgZGF0YSBjZWxsXG4gICAgICAgIFdlIGRvbid0IHVwZGF0ZSBcInVwZGF0ZVwiIGV2ZW50cyBiZWNhdXNlIHRoZXkgYXJlIGZvbGxvd2VkIGJ5IGEgcmVzaXplIGV2ZW50IHdoaWNoIHdpbGwgdXBkYXRlIHRoZSBhYnNvbHV0ZSB2YWx1ZSAocHgpICovXG4gICAgY29sRGVmLndpZHRoQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBldmVudCA9PiBldmVudC5yZWFzb24gIT09ICd1cGRhdGUnKSxcbiAgICAgICAgVW5SeCh0aGlzKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoZXZlbnQgPT4gdGhpcy5jb2xEZWYuYXBwbHlXaWR0aCh0aGlzLmVsKSk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jvd0N0eCkge1xuICAgICAgY29uc3QgY2VsbENvbnRleHQgPSB0aGlzLmNlbGxDdHggPSB0aGlzLl9yb3dDdHguY2VsbCh0aGlzLmNvbEluZGV4KTtcblxuICAgICAgaWYgKGNlbGxDb250ZXh0LmZvY3VzZWQgIT09IHRoaXMuZm9jdXNlZCkge1xuXG4gICAgICAgIGlmICh0aGlzLmZvY3VzZWQgPSBjZWxsQ29udGV4dC5mb2N1c2VkKSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY2VsbC1mb2N1c2VkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1mb2N1c2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNlbGxDdHguc2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWQgPSBjZWxsQ29udGV4dC5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtc2VsZWN0ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgaG9zdDoge1xuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtZm9vdGVyLWNlbGwnLFxuICAgICdyb2xlJzogJ2dyaWRjZWxsJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICduZ3JpZEZvb3RlckNlbGwnLFxuIH0pXG4gQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSBleHRlbmRzIENka0Zvb3RlckNlbGwgaW1wbGVtZW50cyBPbkluaXQge1xuICBjZWxsQ3R4OiBNZXRhQ2VsbENvbnRleHQ7XG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cD4sXG4gICAgICAgICAgICAgIHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudCxcbiAgICAgICAgICAgICAgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgdGhpcy50YWJsZSA9IGdyaWQ7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5EZWYuY29sdW1uO1xuICAgIGFwcGx5V2lkdGguY2FsbCh0aGlzKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sdW1uKTtcblxuICAgIGNvbHVtbkRlZi53aWR0aENoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAndXBkYXRlJyksXG4gICAgICAgIFVuUngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGFwcGx5V2lkdGguYmluZCh0aGlzKSk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNlbGxDdHggPSBNZXRhQ2VsbENvbnRleHQuY3JlYXRlKHRoaXMuY29sdW1uRGVmLmNvbHVtbiwgdGhpcy5ncmlkKTtcbiAgfVxufVxuIl19