/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/cell.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class PblNgridHeaderCellComponent extends CdkHeaderCell {
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
            .pipe(filter(predicate), unrx(this))
            .subscribe(widthUpdater.bind(this));
        view && view.detectChanges();
        widthUpdater.call(this);
        initCellElement(this.el, col);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        unrx.kill(this);
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
        const cmpRef = this.vcRef.createComponent(factory, this.vcRef.length, null, projectedContent);
        if (ext.projectContent) {
            rootNodes = [cmpRef.location.nativeElement];
        }
        if (ext.onCreated) {
            ext.onCreated(context, cmpRef);
        }
        return rootNodes;
    }
}
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
export class PblNgridCellDirective extends CdkCell {
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
        event => event.reason !== 'update')), unrx(this))
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        unrx.kill(this);
    }
}
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
export class PblNgridFooterCellDirective extends CdkFooterCell {
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
        event => event.reason !== 'update')), unrx(this))
            .subscribe(applyWidth.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.grid);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        unrx.kill(this);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUVMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUVWLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLFNBQVMsRUFDVCxNQUFNLEVBRU4sS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTNFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFHLE9BQU8sRUFBb0QsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxlQUFlLEVBQTJCLGFBQWEsRUFBa0IsTUFBTSxrQkFBa0IsQ0FBQztBQUUzRyxPQUFPLEVBQUUsaUJBQWlCLEVBQW9CLE1BQU0sY0FBYyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSw4QkFBOEIsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztNQUVwSSxnQkFBZ0IsR0FBRyx1QkFBdUI7O01BQzFDLDZCQUE2QixHQUFHLG1DQUFtQzs7Ozs7O0FBRXpFLFNBQVMsZUFBZSxDQUFDLEVBQWUsRUFBRSxNQUFjO0lBQ3RELEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFN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LEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0QsUUFBUSxFQUFFLGlCQUFpQjthQUMzQjs7OztZQWpSTyxpQkFBaUI7WUFMakIsaUJBQWlCO1lBYnhCLFVBQVU7Ozs7SUFxU1YsOENBQXlCOzs7OztJQUV6Qiw0Q0FBa0M7Ozs7O0lBRWxDLHlDQUF3Qjs7Ozs7SUFDWixnREFBb0U7O0lBQ3BFLDJDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgT25Jbml0LCBPbkRlc3Ryb3ksXG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBEb0NoZWNrLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdDaGlsZCxcbiAgTmdab25lLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIElucHV0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka0hlYWRlckNlbGwsIENka0NlbGwsIENka0Zvb3RlckNlbGwgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyB1bnJ4IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgdW5pcXVlQ29sdW1uQ3NzLCB1bmlxdWVDb2x1bW5UeXBlQ3NzLCBDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuaW1wb3J0IHsgQ09MVU1OLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4sIFBibENvbHVtbkdyb3VwLCBpc1BibENvbHVtbiwgaXNQYmxDb2x1bW5Hcm91cCB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsUm93Q29udGV4dCwgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB9IGZyb20gJy4uL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiwgV2lkdGhDaGFuZ2VFdmVudCB9IGZyb20gJy4vY29sdW1uLWRlZic7XG5pbXBvcnQgeyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnLi9yZWdpc3RyeS5kaXJlY3RpdmVzJztcblxuY29uc3QgSEVBREVSX0dST1VQX0NTUyA9IGBwYmwtaGVhZGVyLWdyb3VwLWNlbGxgO1xuY29uc3QgSEVBREVSX0dST1VQX1BMQUNFX0hPTERFUl9DU1MgPSBgcGJsLWhlYWRlci1ncm91cC1jZWxsLXBsYWNlaG9sZGVyYDtcblxuZnVuY3Rpb24gaW5pdENlbGxFbGVtZW50KGVsOiBIVE1MRWxlbWVudCwgY29sdW1uOiBDT0xVTU4pOiB2b2lkIHtcbiAgZWwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDb2x1bW5Dc3MoY29sdW1uLmNvbHVtbkRlZikpO1xuICBpZiAoY29sdW1uLnR5cGUpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKHVuaXF1ZUNvbHVtblR5cGVDc3MoY29sdW1uLnR5cGUpKTtcbiAgfVxuICBpZiAoY29sdW1uLmNzcykge1xuICAgIGNvbnN0IGNzcyA9IGNvbHVtbi5jc3Muc3BsaXQoJyAnKTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY3NzKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0RGF0YUNlbGxFbGVtZW50KGVsOiBIVE1MRWxlbWVudCwgY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgaWYgKGNvbHVtbi5lZGl0YWJsZSAmJiBjb2x1bW4uZWRpdG9yVHBsKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyk7XG4gIH1cbn1cblxuY29uc3QgbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zID0gbmV3IE1hcDxQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXBbJ2RhdGFIZWFkZXJFeHRlbnNpb25zJ11bXT4oKTtcblxuZnVuY3Rpb24gYXBwbHlXaWR0aCh0aGlzOiB7IGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY7IGVsOiBIVE1MRWxlbWVudCB9KSB7XG4gIHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5U291cmNlV2lkdGgodGhpczogeyBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmOyBlbDogSFRNTEVsZW1lbnQgfSkge1xuICB0aGlzLmNvbHVtbkRlZi5hcHBseVNvdXJjZVdpZHRoKHRoaXMuZWwpO1xufVxuXG4vKipcbiAqIEhlYWRlciBjZWxsIGNvbXBvbmVudC5cbiAqIFRoZSBoZWFkZXIgY2VsbCBjb21wb25lbnQgd2lsbCByZW5kZXIgdGhlIGhlYWRlciBjZWxsIHRlbXBsYXRlIGFuZCBhZGQgdGhlIHByb3BlciBjbGFzc2VzIGFuZCByb2xlLlxuICpcbiAqIEl0IGlzIGFsc28gcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIGFuZCBtYW5hZ2luZyB0aGUgYW55IGBkYXRhSGVhZGVyRXh0ZW5zaW9uc2AgcmVnaXN0ZXJlZCBpbiB0aGUgcmVnaXN0cnkuXG4gKiBUaGVzZSBleHRlbnNpb25zIGFkZCBmZWF0dXJlcyB0byB0aGUgY2VsbHMgZWl0aGVyIGFzIGEgdGVtcGxhdGUgaW5zdGFuY2Ugb3IgYXMgYSBjb21wb25lbnQgaW5zdGFuY2UuXG4gKiBFeGFtcGxlczogU29ydGluZyBiZWhhdmlvciwgZHJhZyZkcm9wL3Jlc2l6ZSBoYW5kbGVycywgbWVudXMgZXRjLi4uXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCcsXG4gICAgcm9sZTogJ2NvbHVtbmhlYWRlcicsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRIZWFkZXJDZWxsJyxcbiAgdGVtcGxhdGU6IGA8bmctY29udGFpbmVyICN2Y1JlZj48L25nLWNvbnRhaW5lcj5gLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrSGVhZGVyQ2VsbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgndmNSZWYnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcblxuICBjZWxsQ3R4OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IHwgTWV0YUNlbGxDb250ZXh0O1xuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxUPixcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgdGhpcy50YWJsZSA9IGdyaWQ7XG5cbiAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5EZWYuY29sdW1uO1xuICAgIGNvbnN0IGVsID0gdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblxuICAgIGlmIChpc1BibENvbHVtbkdyb3VwKGNvbHVtbikpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSEVBREVSX0dST1VQX0NTUyk7XG4gICAgICBpZiAoY29sdW1uLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSEVBREVSX0dST1VQX1BMQUNFX0hPTERFUl9DU1MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbDogQ09MVU1OID0gdGhpcy5jb2x1bW5EZWYuY29sdW1uO1xuICAgIGxldCBwcmVkaWNhdGU6IChldmVudDogV2lkdGhDaGFuZ2VFdmVudCkgPT4gYm9vbGVhbjtcbiAgICBsZXQgdmlldzogRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbj4+XG4gICAgbGV0IHdpZHRoVXBkYXRlcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkO1xuXG4gICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgIGNvbnN0IGdyaWRXaWR0aFJvdyA9IHRoaXMuZWwucGFyZW50RWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2dyaWRXaWR0aFJvdycpO1xuICAgICAgd2lkdGhVcGRhdGVyID0gZ3JpZFdpZHRoUm93ID8gYXBwbHlTb3VyY2VXaWR0aCA6IGFwcGx5V2lkdGg7XG4gICAgICBwcmVkaWNhdGUgPSBldmVudCA9PiAoIWdyaWRXaWR0aFJvdyAmJiBldmVudC5yZWFzb24gIT09ICd1cGRhdGUnKSB8fCAoZ3JpZFdpZHRoUm93ICYmIGV2ZW50LnJlYXNvbiAhPT0gJ3Jlc2l6ZScpO1xuICAgICAgdmlldyA9ICFncmlkV2lkdGhSb3cgPyB0aGlzLmluaXRNYWluSGVhZGVyQ29sdW1uVmlldyhjb2wpIDogdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aWR0aFVwZGF0ZXIgPSBhcHBseVNvdXJjZVdpZHRoO1xuICAgICAgcHJlZGljYXRlID0gZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAncmVzaXplJztcbiAgICAgIHZpZXcgPSB0aGlzLmluaXRNZXRhSGVhZGVyQ29sdW1uVmlldyhjb2wpO1xuICAgIH1cblxuICAgIHRoaXMuY29sdW1uRGVmLndpZHRoQ2hhbmdlXG4gICAgICAucGlwZShmaWx0ZXIocHJlZGljYXRlKSwgdW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUod2lkdGhVcGRhdGVyLmJpbmQodGhpcykpO1xuXG4gICAgdmlldyAmJiB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICB3aWR0aFVwZGF0ZXIuY2FsbCh0aGlzKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0TWFpbkhlYWRlckNvbHVtblZpZXcoY29sOiBQYmxDb2x1bW4pIHtcbiAgICB0aGlzLmNlbGxDdHggPSBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LmNyZWF0ZURhdGVIZWFkZXJDdHgodGhpcyBhcyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8UGJsQ29sdW1uPiwgdGhpcy52Y1JlZi5pbmplY3Rvcik7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXMuY2VsbEN0eCBhcyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0O1xuICAgIGNvbnN0IHZpZXcgPSB0aGlzLnZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhjb2wuaGVhZGVyQ2VsbFRwbCwgY29udGV4dCk7XG4gICAgdGhpcy56b25lLm9uU3RhYmxlXG4gICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICB0aGlzLnJ1bkhlYWRlckV4dGVuc2lvbnMoY29udGV4dCwgdmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik7XG4gICAgICAgIGNvbnN0IHYgPSB0aGlzLnZjUmVmLmdldCgwKTtcbiAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgdmlldyBtaWdodCBnZXQgZGVzdHJveWVkLCBpdHMgcG9zc2libGUuLi5cbiAgICAgICAgaWYgKCF2LmRlc3Ryb3llZCkge1xuICAgICAgICAgIHYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0TWV0YUhlYWRlckNvbHVtblZpZXcoY29sOiBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uR3JvdXApIHtcbiAgICB0aGlzLmNlbGxDdHggPSBNZXRhQ2VsbENvbnRleHQuY3JlYXRlKGNvbCwgdGhpcy5ncmlkKTtcbiAgICByZXR1cm4gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLnRlbXBsYXRlLCB0aGlzLmNlbGxDdHgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJ1bkhlYWRlckV4dGVuc2lvbnMoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgdmlldzogRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pOiB2b2lkIHtcbiAgICAvLyB3ZSBjb2xsZWN0IHRoZSBmaXJzdCBoZWFkZXIgZXh0ZW5zaW9uIGZvciBlYWNoIHVuaXF1ZSBuYW1lIG9ubHkgb25jZSBwZXIgZ3JpZCBpbnN0YW5jZVxuICAgIGxldCBleHRlbnNpb25zID0gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmdldCh0aGlzLmdyaWQpO1xuICAgIGlmICghZXh0ZW5zaW9ucykge1xuICAgICAgY29uc3QgZGF0YUhlYWRlckV4dGVuc2lvbnMgPSBuZXcgTWFwPHN0cmluZywgYW55PigpO1xuXG4gICAgICB0aGlzLmdyaWQucmVnaXN0cnkuZm9yTXVsdGkoJ2RhdGFIZWFkZXJFeHRlbnNpb25zJywgdmFsdWVzID0+IHtcbiAgICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgICBpZiAoIWRhdGFIZWFkZXJFeHRlbnNpb25zLmhhcyh2YWx1ZS5uYW1lKSkge1xuICAgICAgICAgICAgZGF0YUhlYWRlckV4dGVuc2lvbnMuc2V0KHZhbHVlLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBleHRlbnNpb25zID0gQXJyYXkuZnJvbShkYXRhSGVhZGVyRXh0ZW5zaW9ucy52YWx1ZXMoKSk7XG4gICAgICBsYXN0RGF0YUhlYWRlckV4dGVuc2lvbnMuc2V0KHRoaXMuZ3JpZCwgZXh0ZW5zaW9ucyk7XG4gICAgICAvLyBkZXN0cm95IGl0IG9uIHRoZSBuZXh0IHR1cm4sIHdlIGtub3cgYWxsIGNlbGxzIHdpbGwgcmVuZGVyIG9uIHRoZSBzYW1lIHR1cm4uXG4gICAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoICgpID0+IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5kZWxldGUodGhpcy5ncmlkKSApO1xuICAgIH1cblxuICAgIGxldCB7IHJvb3ROb2RlcyB9ID0gdmlldztcblxuICAgIGZvciAoY29uc3QgZXh0IG9mIGV4dGVuc2lvbnMpIHtcbiAgICAgIGlmICghZXh0LnNob3VsZFJlbmRlciB8fCBleHQuc2hvdWxkUmVuZGVyKGNvbnRleHQpKSB7XG4gICAgICAgIGlmIChleHQgaW5zdGFuY2VvZiBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSkge1xuICAgICAgICAgIGNvbnN0IGV4dFZpZXcgPSB0aGlzLnZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyhleHQudFJlZiwgY29udGV4dCk7XG4gICAgICAgICAgZXh0Vmlldy5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIGlmIChleHQgaW5zdGFuY2VvZiBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnkpIHtcbiAgICAgICAgICByb290Tm9kZXMgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudChleHQsIGNvbnRleHQsIHJvb3ROb2Rlcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlQ29tcG9uZW50KGV4dDogUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PGFueSwgXCJkYXRhSGVhZGVyRXh0ZW5zaW9uc1wiPiwgY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgcm9vdE5vZGVzOiBhbnlbXSk6IGFueVtdIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gZXh0LmdldEZhY3RvcnkoY29udGV4dCk7XG4gICAgY29uc3QgcHJvamVjdGVkQ29udGVudDogYW55W11bXSA9IFtdO1xuXG4gICAgaWYgKGV4dC5wcm9qZWN0Q29udGVudCkge1xuICAgICAgcHJvamVjdGVkQ29udGVudC5wdXNoKHJvb3ROb2Rlcyk7XG4gICAgfVxuXG4gICAgY29uc3QgY21wUmVmID0gdGhpcy52Y1JlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgdGhpcy52Y1JlZi5sZW5ndGgsIG51bGwsIHByb2plY3RlZENvbnRlbnQpO1xuXG4gICAgaWYgKGV4dC5wcm9qZWN0Q29udGVudCkge1xuICAgICAgcm9vdE5vZGVzID0gWyBjbXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCBdO1xuICAgIH1cblxuICAgIGlmIChleHQub25DcmVhdGVkKSB7XG4gICAgICBleHQub25DcmVhdGVkKGNvbnRleHQsIGNtcFJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlcztcbiAgfVxufVxuXG4vKiogQ2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWNlbGwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDZWxsJyxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrQ2VsbCBpbXBsZW1lbnRzIERvQ2hlY2ssIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgc2V0IHJvd0N0eCh2YWx1ZTogUGJsUm93Q29udGV4dDxhbnk+KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb3dDdHgpIHtcbiAgICAgIHRoaXMuX3Jvd0N0eCA9IHZhbHVlO1xuICAgICAgdGhpcy5uZ0RvQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yb3dDdHg6IFBibFJvd0NvbnRleHQ8YW55PjtcbiAgY2VsbEN0eDogUGJsQ2VsbENvbnRleHQgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBwb3NpdGlvbiBvZiB0aGUgY29sdW1uIGRlZiBhbW9uZyBhbGwgY29sdW1ucyByZWdhcmRsZXNzIG9mIHZpc2liaWxpdHkuXG4gICAqL1xuICBwcml2YXRlIGNvbEluZGV4OiBudW1iZXI7XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGZvY3VzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBzZWxlY3RlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW4+LCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY29sRGVmLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLmNvbEluZGV4ID0gdGhpcy5jb2xEZWYuZ3JpZC5jb2x1bW5BcGkuaW5kZXhPZihjb2xEZWYuY29sdW1uIGFzIFBibENvbHVtbik7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb2xEZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sRGVmLmNvbHVtbik7XG4gICAgaW5pdERhdGFDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uKTtcblxuXG4gICAgLyogIEFwcGx5IHdpZHRoIGNoYW5nZXMgdG8gdGhpcyBkYXRhIGNlbGxcbiAgICAgICAgV2UgZG9uJ3QgdXBkYXRlIFwidXBkYXRlXCIgZXZlbnRzIGJlY2F1c2UgdGhleSBhcmUgZm9sbG93ZWQgYnkgYSByZXNpemUgZXZlbnQgd2hpY2ggd2lsbCB1cGRhdGUgdGhlIGFic29sdXRlIHZhbHVlIChweCkgKi9cbiAgICBjb2xEZWYud2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGV2ZW50ID0+IGV2ZW50LnJlYXNvbiAhPT0gJ3VwZGF0ZScpLFxuICAgICAgICB1bnJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShldmVudCA9PiB0aGlzLmNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcm93Q3R4KSB7XG4gICAgICBjb25zdCBjZWxsQ29udGV4dCA9IHRoaXMuY2VsbEN0eCA9IHRoaXMuX3Jvd0N0eC5jZWxsKHRoaXMuY29sSW5kZXgpO1xuXG4gICAgICBpZiAoY2VsbENvbnRleHQuZm9jdXNlZCAhPT0gdGhpcy5mb2N1c2VkKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCA9IGNlbGxDb250ZXh0LmZvY3VzZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLWZvY3VzZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jZWxsLWZvY3VzZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuY2VsbEN0eC5zZWxlY3RlZCAhPT0gdGhpcy5zZWxlY3RlZCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZCA9IGNlbGxDb250ZXh0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1mb290ZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRGb290ZXJDZWxsJyxcbiB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSBleHRlbmRzIENka0Zvb3RlckNlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNlbGxDdHg6IE1ldGFDZWxsQ29udGV4dDtcbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50O1xuXG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbkdyb3VwPixcbiAgICAgICAgICAgICAgcHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LFxuICAgICAgICAgICAgICBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLnRhYmxlID0gZ3JpZDtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbkRlZi5jb2x1bW47XG4gICAgYXBwbHlXaWR0aC5jYWxsKHRoaXMpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2x1bW4pO1xuXG4gICAgY29sdW1uRGVmLndpZHRoQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBldmVudCA9PiBldmVudC5yZWFzb24gIT09ICd1cGRhdGUnKSxcbiAgICAgICAgdW5yeCh0aGlzKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoYXBwbHlXaWR0aC5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2VsbEN0eCA9IE1ldGFDZWxsQ29udGV4dC5jcmVhdGUodGhpcy5jb2x1bW5EZWYuY29sdW1uLCB0aGlzLmdyaWQpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbn1cbiJdfQ==