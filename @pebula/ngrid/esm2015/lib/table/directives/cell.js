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
     * @param {?} table
     * @param {?} elementRef
     * @param {?} zone
     */
    constructor(columnDef, table, elementRef, zone) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.table = table;
        this.elementRef = elementRef;
        this.zone = zone;
        /** @type {?} */
        const column = columnDef.column;
        /** @type {?} */
        const el = this.el = elementRef.nativeElement;
        /*  Apply width changes to this header cell
            We don't update resize events to any of the possible columns because
            - PblColumn headers NEVER change their size, they always reflect the user's definitions
            - PblMetaColumn and PblColumnGroup headers are auto-adjusted by `PblNgridComponent.syncColumnGroupsSize` */
        columnDef.widthChange
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.reason !== 'resize')), UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.columnDef.applyWidth(this.el)));
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
        if (isPblColumn(col)) {
            this.cellCtx = PblNgridDataHeaderExtensionContext
                .createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
        }
        else {
            this.cellCtx = MetaCellContext.create(col, this.table);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const col = this.columnDef.column;
        const { vcRef } = this;
        /** @type {?} */
        let view;
        if (isPblColumn(col)) {
            /** @type {?} */
            const context = (/** @type {?} */ (this.cellCtx));
            view = vcRef.createEmbeddedView(col.headerCellTpl, context);
            this.zone.onStable
                .pipe(first())
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.runHeaderExtensions(context, (/** @type {?} */ (view)));
                /** @type {?} */
                const v = vcRef.get(0);
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
    }
    /**
     * @protected
     * @param {?} context
     * @param {?} view
     * @return {?}
     */
    runHeaderExtensions(context, view) {
        // we collect the first header extension for each unique name only once per table instance
        /** @type {?} */
        let extensions = lastDataHeaderExtensions.get(this.table);
        if (!extensions) {
            /** @type {?} */
            const dataHeaderExtensions = new Map();
            this.table.registry.forMulti('dataHeaderExtensions', (/**
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
            lastDataHeaderExtensions.set(this.table, extensions);
            // destroy it on the next turn, we know all cells will render on the same turn.
            this.zone.onStable.pipe(first()).subscribe((/**
             * @return {?}
             */
            () => lastDataHeaderExtensions.delete(this.table)));
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
        this.colIndex = this.colDef.table.columnApi.indexOf((/** @type {?} */ (colDef.column)));
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
     * @param {?} table
     * @param {?} elementRef
     */
    constructor(columnDef, table, elementRef) {
        super(columnDef, elementRef);
        this.columnDef = columnDef;
        this.table = table;
        this.el = elementRef.nativeElement;
        /** @type {?} */
        const column = columnDef.column;
        columnDef.applyWidth(this.el);
        initCellElement(this.el, column);
        // update widths for meta rows only, main footer never updates
        if (!isPblColumn(column)) {
            columnDef.widthChange
                .pipe(UnRx(this))
                .subscribe((/**
             * @return {?}
             */
            () => this.columnDef.applyWidth(this.el)));
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.table);
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
    tslib_1.__metadata("design:paramtypes", [PblNgridColumnDef, PblNgridComponent, ElementRef])
], PblNgridFooterCellDirective);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFDTCxNQUFNLEVBQ04sYUFBYSxFQUNiLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE9BQU8sRUFDUCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsTUFBTSxFQUNOLGVBQWUsRUFDZixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0UsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixFQUFFLDBCQUEwQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUcsT0FBTyxFQUFvRCxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDN0csT0FBTyxFQUFFLGVBQWUsRUFBMkIsYUFBYSxFQUFrQixNQUFNLGtCQUFrQixDQUFDO0FBRTNHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsOEJBQThCLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7TUFFcEksZ0JBQWdCLEdBQUcsdUJBQXVCOztNQUMxQyw2QkFBNkIsR0FBRyxtQ0FBbUM7Ozs7OztBQUV6RSxTQUFTLGVBQWUsQ0FBQyxFQUFlLEVBQUUsTUFBYztJQUN0RCxFQUFF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QUFFO1lBQ3hCLFNBQVMsQ0FBQyxXQUFXO2lCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoQixTQUFTOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDO0NBQ0YsQ0FBQTs7WUFsQmdDLGlCQUFpQjtZQUFnRCxpQkFBaUI7WUFBYyxVQUFVOzs7WUFiMUksU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxNQUFNLEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0QsUUFBUSxFQUFFLGlCQUFpQjthQUMzQjs7OztZQTdQTyxpQkFBaUI7WUFMakIsaUJBQWlCO1lBYnhCLFVBQVU7O0FBaVJDLDJCQUEyQjtJQUR0QyxJQUFJLEVBQUU7NkNBS3lCLGlCQUFpQixFQUFnRCxpQkFBaUIsRUFBYyxVQUFVO0dBSjlILDJCQUEyQixDQXNCdkM7U0F0QlksMkJBQTJCOzs7Ozs7SUFDdEMseUNBQXdCOztJQUN4Qiw4Q0FBeUI7Ozs7O0lBRWIsZ0RBQW9FOztJQUFFLDRDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgT25Jbml0LFxuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRG9DaGVjayxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3Q2hpbGQsXG4gIE5nWm9uZSxcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBJbnB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtIZWFkZXJDZWxsLCBDZGtDZWxsLCBDZGtGb290ZXJDZWxsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgdW5pcXVlQ29sdW1uQ3NzLCB1bmlxdWVDb2x1bW5UeXBlQ3NzLCBDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuaW1wb3J0IHsgQ09MVU1OLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4sIFBibENvbHVtbkdyb3VwLCBpc1BibENvbHVtbiwgaXNQYmxDb2x1bW5Hcm91cCB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsUm93Q29udGV4dCwgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB9IGZyb20gJy4uL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYgfSBmcm9tICcuL2NvbHVtbi1kZWYnO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJy4vcmVnaXN0cnkuZGlyZWN0aXZlcyc7XG5cbmNvbnN0IEhFQURFUl9HUk9VUF9DU1MgPSBgcGJsLWhlYWRlci1ncm91cC1jZWxsYDtcbmNvbnN0IEhFQURFUl9HUk9VUF9QTEFDRV9IT0xERVJfQ1NTID0gYHBibC1oZWFkZXItZ3JvdXAtY2VsbC1wbGFjZWhvbGRlcmA7XG5cbmZ1bmN0aW9uIGluaXRDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogQ09MVU1OKTogdm9pZCB7XG4gIGVsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ29sdW1uQ3NzKGNvbHVtbi5jb2x1bW5EZWYpKTtcbiAgaWYgKGNvbHVtbi50eXBlKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDb2x1bW5UeXBlQ3NzKGNvbHVtbi50eXBlKSk7XG4gIH1cbiAgaWYgKGNvbHVtbi5jc3MpIHtcbiAgICBjb25zdCBjc3MgPSBjb2x1bW4uY3NzLnNwbGl0KCcgJyk7XG4gICAgZm9yIChjb25zdCBjIG9mIGNzcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdERhdGFDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gIGlmIChjb2x1bW4uZWRpdGFibGUgJiYgY29sdW1uLmVkaXRvclRwbCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MpO1xuICB9XG59XG5cbmNvbnN0IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwWydkYXRhSGVhZGVyRXh0ZW5zaW9ucyddW10+KCk7XG5cbi8qKlxuICogSGVhZGVyIGNlbGwgY29tcG9uZW50LlxuICogVGhlIGhlYWRlciBjZWxsIGNvbXBvbmVudCB3aWxsIHJlbmRlciB0aGUgaGVhZGVyIGNlbGwgdGVtcGxhdGUgYW5kIGFkZCB0aGUgcHJvcGVyIGNsYXNzZXMgYW5kIHJvbGUuXG4gKlxuICogSXQgaXMgYWxzbyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYW5kIG1hbmFnaW5nIHRoZSBhbnkgYGRhdGFIZWFkZXJFeHRlbnNpb25zYCByZWdpc3RlcmVkIGluIHRoZSByZWdpc3RyeS5cbiAqIFRoZXNlIGV4dGVuc2lvbnMgYWRkIGZlYXR1cmVzIHRvIHRoZSBjZWxscyBlaXRoZXIgYXMgYSB0ZW1wbGF0ZSBpbnN0YW5jZSBvciBhcyBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEV4YW1wbGVzOiBTb3J0aW5nIGJlaGF2aW9yLCBkcmFnJmRyb3AvcmVzaXplIGhhbmRsZXJzLCBtZW51cyBldGMuLi5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsJyxcbiAgICByb2xlOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICduZ3JpZEhlYWRlckNlbGwnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgI3ZjUmVmPjwvbmctY29udGFpbmVyPmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8VCBleHRlbmRzIENPTFVNTiA9IENPTFVNTj4gZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgndmNSZWYnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcblxuICBjZWxsQ3R4OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IHwgTWV0YUNlbGxDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFQ+LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIC8qICBBcHBseSB3aWR0aCBjaGFuZ2VzIHRvIHRoaXMgaGVhZGVyIGNlbGxcbiAgICAgICAgICBXZSBkb24ndCB1cGRhdGUgcmVzaXplIGV2ZW50cyB0byBhbnkgb2YgdGhlIHBvc3NpYmxlIGNvbHVtbnMgYmVjYXVzZVxuICAgICAgICAgIC0gUGJsQ29sdW1uIGhlYWRlcnMgTkVWRVIgY2hhbmdlIHRoZWlyIHNpemUsIHRoZXkgYWx3YXlzIHJlZmxlY3QgdGhlIHVzZXIncyBkZWZpbml0aW9uc1xuICAgICAgICAgIC0gUGJsTWV0YUNvbHVtbiBhbmQgUGJsQ29sdW1uR3JvdXAgaGVhZGVycyBhcmUgYXV0by1hZGp1c3RlZCBieSBgUGJsTmdyaWRDb21wb25lbnQuc3luY0NvbHVtbkdyb3Vwc1NpemVgICovXG4gICAgICBjb2x1bW5EZWYud2lkdGhDaGFuZ2VcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKCBldmVudCA9PiBldmVudC5yZWFzb24gIT09ICdyZXNpemUnKSxcbiAgICAgICAgICBVblJ4KHRoaXMpLFxuICAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCkpO1xuXG4gICAgICBpZiAoaXNQYmxDb2x1bW5Hcm91cChjb2x1bW4pKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSEVBREVSX0dST1VQX0NTUyk7XG4gICAgICAgIGlmIChjb2x1bW4ucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKEhFQURFUl9HUk9VUF9QTEFDRV9IT0xERVJfQ1NTKTtcbiAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29sOiBDT0xVTU4gPSB0aGlzLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgIHRoaXMuY2VsbEN0eCA9IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHRcbiAgICAgICAgLmNyZWF0ZURhdGVIZWFkZXJDdHgodGhpcyBhcyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8UGJsQ29sdW1uPiwgdGhpcy52Y1JlZi5pbmplY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2VsbEN0eCA9IE1ldGFDZWxsQ29udGV4dC5jcmVhdGUoY29sLCB0aGlzLnRhYmxlKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgY29sOiBDT0xVTU4gPSB0aGlzLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgY29uc3QgeyB2Y1JlZiB9ID0gdGhpcztcbiAgICBsZXQgdmlldzogRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbj4+O1xuXG4gICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNlbGxDdHggYXMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDtcbiAgICAgIHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLmhlYWRlckNlbGxUcGwsIGNvbnRleHQpO1xuICAgICAgdGhpcy56b25lLm9uU3RhYmxlXG4gICAgICAgIC5waXBlKGZpcnN0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICB0aGlzLnJ1bkhlYWRlckV4dGVuc2lvbnMoY29udGV4dCwgdmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik7XG4gICAgICAgICAgY29uc3QgdiA9IHZjUmVmLmdldCgwKTtcbiAgICAgICAgICAvLyBhdCB0aGlzIHBvaW50IHRoZSB2aWV3IG1pZ2h0IGdldCBkZXN0cm95ZWQsIGl0cyBwb3NzaWJsZS4uLlxuICAgICAgICAgIGlmICghdi5kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIHYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoY29sLnRlbXBsYXRlLCB0aGlzLmNlbGxDdHgpO1xuICAgIH1cblxuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik6IHZvaWQge1xuICAgIC8vIHdlIGNvbGxlY3QgdGhlIGZpcnN0IGhlYWRlciBleHRlbnNpb24gZm9yIGVhY2ggdW5pcXVlIG5hbWUgb25seSBvbmNlIHBlciB0YWJsZSBpbnN0YW5jZVxuICAgIGxldCBleHRlbnNpb25zID0gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmdldCh0aGlzLnRhYmxlKTtcbiAgICBpZiAoIWV4dGVuc2lvbnMpIHtcbiAgICAgIGNvbnN0IGRhdGFIZWFkZXJFeHRlbnNpb25zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgdGhpcy50YWJsZS5yZWdpc3RyeS5mb3JNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCB2YWx1ZXMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgIGlmICghZGF0YUhlYWRlckV4dGVuc2lvbnMuaGFzKHZhbHVlLm5hbWUpKSB7XG4gICAgICAgICAgICBkYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodmFsdWUubmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGV4dGVuc2lvbnMgPSBBcnJheS5mcm9tKGRhdGFIZWFkZXJFeHRlbnNpb25zLnZhbHVlcygpKTtcbiAgICAgIGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodGhpcy50YWJsZSwgZXh0ZW5zaW9ucyk7XG4gICAgICAvLyBkZXN0cm95IGl0IG9uIHRoZSBuZXh0IHR1cm4sIHdlIGtub3cgYWxsIGNlbGxzIHdpbGwgcmVuZGVyIG9uIHRoZSBzYW1lIHR1cm4uXG4gICAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoICgpID0+IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5kZWxldGUodGhpcy50YWJsZSkgKTtcbiAgICB9XG5cbiAgICBsZXQgeyByb290Tm9kZXMgfSA9IHZpZXc7XG5cbiAgICBmb3IgKGNvbnN0IGV4dCBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoIWV4dC5zaG91bGRSZW5kZXIgfHwgZXh0LnNob3VsZFJlbmRlcihjb250ZXh0KSkge1xuICAgICAgICBpZiAoZXh0IGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkpIHtcbiAgICAgICAgICBjb25zdCBleHRWaWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoZXh0LnRSZWYsIGNvbnRleHQpO1xuICAgICAgICAgIGV4dFZpZXcubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXh0IGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5KSB7XG4gICAgICAgICAgcm9vdE5vZGVzID0gdGhpcy5jcmVhdGVDb21wb25lbnQoZXh0LCBjb250ZXh0LCByb290Tm9kZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbXBvbmVudChleHQ6IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxhbnksIFwiZGF0YUhlYWRlckV4dGVuc2lvbnNcIj4sIGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIHJvb3ROb2RlczogYW55W10pOiBhbnlbXSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IGV4dC5nZXRGYWN0b3J5KGNvbnRleHQpO1xuICAgIGNvbnN0IHByb2plY3RlZENvbnRlbnQ6IGFueVtdW10gPSBbXTtcblxuICAgIGlmIChleHQucHJvamVjdENvbnRlbnQpIHtcbiAgICAgIHByb2plY3RlZENvbnRlbnQucHVzaChyb290Tm9kZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGNtcFJlZiA9IHRoaXMudmNSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIG51bGwsIHByb2plY3RlZENvbnRlbnQpO1xuXG4gICAgaWYgKGV4dC5wcm9qZWN0Q29udGVudCkge1xuICAgICAgcm9vdE5vZGVzID0gWyBjbXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCBdO1xuICAgIH1cblxuICAgIGlmIChleHQub25DcmVhdGVkKSB7XG4gICAgICBleHQub25DcmVhdGVkKGNvbnRleHQsIGNtcFJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlcztcbiAgfVxufVxuXG4vKiogQ2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWNlbGwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDZWxsJyxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrQ2VsbCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIEBJbnB1dCgpIHNldCByb3dDdHgodmFsdWU6IFBibFJvd0NvbnRleHQ8YW55Pikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm93Q3R4KSB7XG4gICAgICB0aGlzLl9yb3dDdHggPSB2YWx1ZTtcbiAgICAgIHRoaXMubmdEb0NoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcm93Q3R4OiBQYmxSb3dDb250ZXh0PGFueT47XG4gIGNlbGxDdHg6IFBibENlbGxDb250ZXh0IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBkZWYgYW1vbmcgYWxsIGNvbHVtbnMgcmVnYXJkbGVzcyBvZiB2aXNpYmlsaXR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjb2xJbmRleDogbnVtYmVyO1xuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBmb2N1c2VkID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbERlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPiwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNvbERlZiwgZWxlbWVudFJlZik7XG4gICAgdGhpcy5jb2xJbmRleCA9IHRoaXMuY29sRGVmLnRhYmxlLmNvbHVtbkFwaS5pbmRleE9mKGNvbERlZi5jb2x1bW4gYXMgUGJsQ29sdW1uKTtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uKTtcbiAgICBpbml0RGF0YUNlbGxFbGVtZW50KHRoaXMuZWwsIGNvbERlZi5jb2x1bW4pO1xuXG5cbiAgICAvKiAgQXBwbHkgd2lkdGggY2hhbmdlcyB0byB0aGlzIGRhdGEgY2VsbFxuICAgICAgICBXZSBkb24ndCB1cGRhdGUgXCJ1cGRhdGVcIiBldmVudHMgYmVjYXVzZSB0aGV5IGFyZSBmb2xsb3dlZCBieSBhIHJlc2l6ZSBldmVudCB3aGljaCB3aWxsIHVwZGF0ZSB0aGUgYWJzb2x1dGUgdmFsdWUgKHB4KSAqL1xuICAgIGNvbERlZi53aWR0aENoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZXZlbnQgPT4gZXZlbnQucmVhc29uICE9PSAndXBkYXRlJyksXG4gICAgICAgIFVuUngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKGV2ZW50ID0+IHRoaXMuY29sRGVmLmFwcGx5V2lkdGgodGhpcy5lbCkpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yb3dDdHgpIHtcbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gdGhpcy5jZWxsQ3R4ID0gdGhpcy5fcm93Q3R4LmNlbGwodGhpcy5jb2xJbmRleCk7XG5cbiAgICAgIGlmIChjZWxsQ29udGV4dC5mb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkID0gY2VsbENvbnRleHQuZm9jdXNlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jZWxsQ3R4LnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID0gY2VsbENvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1mb290ZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRGb290ZXJDZWxsJyxcbiB9KVxuIEBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUgZXh0ZW5kcyBDZGtGb290ZXJDZWxsIGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBlbDogSFRNTEVsZW1lbnQ7XG4gIGNlbGxDdHg6IE1ldGFDZWxsQ29udGV4dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbkdyb3VwPiwgcHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudCwgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5EZWYuY29sdW1uO1xuICAgIGNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2x1bW4pO1xuXG4gICAgLy8gdXBkYXRlIHdpZHRocyBmb3IgbWV0YSByb3dzIG9ubHksIG1haW4gZm9vdGVyIG5ldmVyIHVwZGF0ZXNcbiAgICBpZiAoIWlzUGJsQ29sdW1uKGNvbHVtbikpIHtcbiAgICAgIGNvbHVtbkRlZi53aWR0aENoYW5nZVxuICAgICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2VsbEN0eCA9IE1ldGFDZWxsQ29udGV4dC5jcmVhdGUodGhpcy5jb2x1bW5EZWYuY29sdW1uLCB0aGlzLnRhYmxlKTtcbiAgfVxufVxuIl19