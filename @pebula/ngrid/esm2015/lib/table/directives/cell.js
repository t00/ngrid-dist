/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class PblNgridHeaderCellComponent extends CdkHeaderCell {
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
        if (column instanceof PblColumnGroup) {
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
        if (col instanceof PblColumn) {
            this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
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
        if (col instanceof PblColumn) {
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
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.columnDef.isDirty) {
            this.columnDef.applyWidth(this.el);
        }
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
        this.colIndex = this.colDef.table.columnApi.indexOf((/** @type {?} */ (colDef.column)));
        this.el = elementRef.nativeElement;
        colDef.applyWidth(this.el);
        initCellElement(this.el, colDef.column);
        initDataCellElement(this.el, (/** @type {?} */ (colDef.column)));
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
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.colDef.isDirty) {
            this.colDef.applyWidth(this.el);
        }
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
    }
    // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.columnDef.isDirty) {
            this.columnDef.applyWidth(this.el);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.cellCtx = MetaCellContext.create(this.columnDef.column, this.table);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2QyxPQUFPLEVBR0wsU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBRVYsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULE1BQU0sRUFFTixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFHLE9BQU8sRUFBeUIsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUEyQixhQUFhLEVBQWtCLE1BQU0sa0JBQWtCLENBQUM7QUFFM0csT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSw4QkFBOEIsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztNQUVwSSxnQkFBZ0IsR0FBRyx1QkFBdUI7O01BQzFDLDZCQUE2QixHQUFHLG1DQUFtQzs7Ozs7O0FBRXpFLFNBQVMsZUFBZSxDQUFDLEVBQWUsRUFBRSxNQUFjO0lBQ3RELEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNwRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVB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RyxJQUFJLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7O2NBQzdCLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTTtRQUMvQixTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QixlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7OztJQUdELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7WUE3QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxNQUFNLEVBQUUsVUFBVTtpQkFDbkI7Z0JBQ0QsUUFBUSxFQUFFLGlCQUFpQjthQUMzQjs7OztZQWpQTyxpQkFBaUI7WUFMakIsaUJBQWlCO1lBWnhCLFVBQVU7Ozs7Ozs7SUFvUVYseUNBQXdCOztJQUN4Qiw4Q0FBeUI7Ozs7O0lBRWIsZ0RBQW9FOztJQUFFLDRDQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLXNlbGVjdG9yXG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIE9uSW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIERvQ2hlY2ssXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0NoaWxkLFxuICBOZ1pvbmUsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5wdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrSGVhZGVyQ2VsbCwgQ2RrQ2VsbCwgQ2RrRm9vdGVyQ2VsbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IHVuaXF1ZUNvbHVtbkNzcywgdW5pcXVlQ29sdW1uVHlwZUNzcywgQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MgfSBmcm9tICcuLi9jaXJjdWxhci1kZXAtYnJpZGdlJztcbmltcG9ydCB7IENPTFVNTiwgUGJsTWV0YUNvbHVtbiwgUGJsQ29sdW1uLCBQYmxDb2x1bW5Hcm91cCB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsUm93Q29udGV4dCwgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB9IGZyb20gJy4uL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYgfSBmcm9tICcuL2NvbHVtbi1kZWYnO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJy4vcmVnaXN0cnkuZGlyZWN0aXZlcyc7XG5cbmNvbnN0IEhFQURFUl9HUk9VUF9DU1MgPSBgcGJsLWhlYWRlci1ncm91cC1jZWxsYDtcbmNvbnN0IEhFQURFUl9HUk9VUF9QTEFDRV9IT0xERVJfQ1NTID0gYHBibC1oZWFkZXItZ3JvdXAtY2VsbC1wbGFjZWhvbGRlcmA7XG5cbmZ1bmN0aW9uIGluaXRDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogQ09MVU1OKTogdm9pZCB7XG4gIGVsLmNsYXNzTGlzdC5hZGQodW5pcXVlQ29sdW1uQ3NzKGNvbHVtbi5jb2x1bW5EZWYpKTtcbiAgaWYgKGNvbHVtbi50eXBlKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZCh1bmlxdWVDb2x1bW5UeXBlQ3NzKGNvbHVtbi50eXBlKSk7XG4gIH1cbiAgaWYgKGNvbHVtbi5jc3MpIHtcbiAgICBjb25zdCBjc3MgPSBjb2x1bW4uY3NzLnNwbGl0KCcgJyk7XG4gICAgZm9yIChjb25zdCBjIG9mIGNzcykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdERhdGFDZWxsRWxlbWVudChlbDogSFRNTEVsZW1lbnQsIGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gIGlmIChjb2x1bW4uZWRpdGFibGUgJiYgY29sdW1uLmVkaXRvclRwbCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MpO1xuICB9XG59XG5cbmNvbnN0IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucyA9IG5ldyBNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwWydkYXRhSGVhZGVyRXh0ZW5zaW9ucyddW10+KCk7XG5cbi8qKlxuICogSGVhZGVyIGNlbGwgY29tcG9uZW50LlxuICogVGhlIGhlYWRlciBjZWxsIGNvbXBvbmVudCB3aWxsIHJlbmRlciB0aGUgaGVhZGVyIGNlbGwgdGVtcGxhdGUgYW5kIGFkZCB0aGUgcHJvcGVyIGNsYXNzZXMgYW5kIHJvbGUuXG4gKlxuICogSXQgaXMgYWxzbyByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgYW5kIG1hbmFnaW5nIHRoZSBhbnkgYGRhdGFIZWFkZXJFeHRlbnNpb25zYCByZWdpc3RlcmVkIGluIHRoZSByZWdpc3RyeS5cbiAqIFRoZXNlIGV4dGVuc2lvbnMgYWRkIGZlYXR1cmVzIHRvIHRoZSBjZWxscyBlaXRoZXIgYXMgYSB0ZW1wbGF0ZSBpbnN0YW5jZSBvciBhcyBhIGNvbXBvbmVudCBpbnN0YW5jZS5cbiAqIEV4YW1wbGVzOiBTb3J0aW5nIGJlaGF2aW9yLCBkcmFnJmRyb3AvcmVzaXplIGhhbmRsZXJzLCBtZW51cyBldGMuLi5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsJyxcbiAgaG9zdDoge1xuICAgIGNsYXNzOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsJyxcbiAgICByb2xlOiAnY29sdW1uaGVhZGVyJyxcbiAgfSxcbiAgZXhwb3J0QXM6ICduZ3JpZEhlYWRlckNlbGwnLFxuICB0ZW1wbGF0ZTogYDxuZy1jb250YWluZXIgI3ZjUmVmPjwvbmctY29udGFpbmVyPmAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8VCBleHRlbmRzIENPTFVNTiA9IENPTFVNTj4gZXh0ZW5kcyBDZGtIZWFkZXJDZWxsIGltcGxlbWVudHMgRG9DaGVjaywgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgndmNSZWYnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcblxuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcblxuICBjZWxsQ3R4OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IHwgTWV0YUNlbGxDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFQ+LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIHpvbmU6IE5nWm9uZSkge1xuICAgIHN1cGVyKGNvbHVtbkRlZiwgZWxlbWVudFJlZik7XG4gICAgY29uc3QgY29sdW1uID0gY29sdW1uRGVmLmNvbHVtbjtcbiAgICBjb25zdCBlbCA9IHRoaXMuZWwgPSBlbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICBpZiAoY29sdW1uIGluc3RhbmNlb2YgUGJsQ29sdW1uR3JvdXApIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSEVBREVSX0dST1VQX0NTUyk7XG4gICAgICBpZiAoY29sdW1uLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoSEVBREVSX0dST1VQX1BMQUNFX0hPTERFUl9DU1MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbDogQ09MVU1OID0gdGhpcy5jb2x1bW5EZWYuY29sdW1uO1xuICAgIGlmIChjb2wgaW5zdGFuY2VvZiBQYmxDb2x1bW4pIHtcbiAgICAgIHRoaXMuY2VsbEN0eCA9IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQuY3JlYXRlRGF0ZUhlYWRlckN0eCh0aGlzIGFzIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxQYmxDb2x1bW4+LCB0aGlzLnZjUmVmLmluamVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jZWxsQ3R4ID0gTWV0YUNlbGxDb250ZXh0LmNyZWF0ZShjb2wsIHRoaXMudGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBjb2w6IENPTFVNTiA9IHRoaXMuY29sdW1uRGVmLmNvbHVtbjtcbiAgICBjb25zdCB7IHZjUmVmIH0gPSB0aGlzO1xuICAgIGxldCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uPj47XG5cbiAgICBpZiAoY29sIGluc3RhbmNlb2YgUGJsQ29sdW1uKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jZWxsQ3R4IGFzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ7XG4gICAgICB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC5oZWFkZXJDZWxsVHBsLCBjb250ZXh0KTtcbiAgICAgIHRoaXMuem9uZS5vblN0YWJsZVxuICAgICAgICAucGlwZShmaXJzdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5ydW5IZWFkZXJFeHRlbnNpb25zKGNvbnRleHQsIHZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pO1xuICAgICAgICAgIGNvbnN0IHYgPSB2Y1JlZi5nZXQoMCk7XG4gICAgICAgICAgLy8gYXQgdGhpcyBwb2ludCB0aGUgdmlldyBtaWdodCBnZXQgZGVzdHJveWVkLCBpdHMgcG9zc2libGUuLi5cbiAgICAgICAgICBpZiAoIXYuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICB2LmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KGNvbC50ZW1wbGF0ZSwgdGhpcy5jZWxsQ3R4KTtcbiAgICB9XG5cbiAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIGluaXRDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2wpO1xuICB9XG5cbiAgLy8gVE9ETzogc21hcnQgZGlmZiBoYW5kbGluZy4uLiBoYW5kbGUgYWxsIGRpZmZzLCBub3QganVzdCB3aWR0aCwgYW5kIGNoYW5nZSBvbmx5IHdoZW4gcmVxdWlyZWQuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW5EZWYuaXNEaXJ0eSkge1xuICAgICAgdGhpcy5jb2x1bW5EZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgcnVuSGVhZGVyRXh0ZW5zaW9ucyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+Pik6IHZvaWQge1xuICAgIC8vIHdlIGNvbGxlY3QgdGhlIGZpcnN0IGhlYWRlciBleHRlbnNpb24gZm9yIGVhY2ggdW5pcXVlIG5hbWUgb25seSBvbmNlIHBlciB0YWJsZSBpbnN0YW5jZVxuICAgIGxldCBleHRlbnNpb25zID0gbGFzdERhdGFIZWFkZXJFeHRlbnNpb25zLmdldCh0aGlzLnRhYmxlKTtcbiAgICBpZiAoIWV4dGVuc2lvbnMpIHtcbiAgICAgIGNvbnN0IGRhdGFIZWFkZXJFeHRlbnNpb25zID0gbmV3IE1hcDxzdHJpbmcsIGFueT4oKTtcblxuICAgICAgdGhpcy50YWJsZS5yZWdpc3RyeS5mb3JNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCB2YWx1ZXMgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICAgIGlmICghZGF0YUhlYWRlckV4dGVuc2lvbnMuaGFzKHZhbHVlLm5hbWUpKSB7XG4gICAgICAgICAgICBkYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodmFsdWUubmFtZSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGV4dGVuc2lvbnMgPSBBcnJheS5mcm9tKGRhdGFIZWFkZXJFeHRlbnNpb25zLnZhbHVlcygpKTtcbiAgICAgIGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5zZXQodGhpcy50YWJsZSwgZXh0ZW5zaW9ucyk7XG4gICAgICAvLyBkZXN0cm95IGl0IG9uIHRoZSBuZXh0IHR1cm4sIHdlIGtub3cgYWxsIGNlbGxzIHdpbGwgcmVuZGVyIG9uIHRoZSBzYW1lIHR1cm4uXG4gICAgICB0aGlzLnpvbmUub25TdGFibGUucGlwZShmaXJzdCgpKS5zdWJzY3JpYmUoICgpID0+IGxhc3REYXRhSGVhZGVyRXh0ZW5zaW9ucy5kZWxldGUodGhpcy50YWJsZSkgKTtcbiAgICB9XG5cbiAgICBsZXQgeyByb290Tm9kZXMgfSA9IHZpZXc7XG5cbiAgICBmb3IgKGNvbnN0IGV4dCBvZiBleHRlbnNpb25zKSB7XG4gICAgICBpZiAoIWV4dC5zaG91bGRSZW5kZXIgfHwgZXh0LnNob3VsZFJlbmRlcihjb250ZXh0KSkge1xuICAgICAgICBpZiAoZXh0IGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkpIHtcbiAgICAgICAgICBjb25zdCBleHRWaWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcoZXh0LnRSZWYsIGNvbnRleHQpO1xuICAgICAgICAgIGV4dFZpZXcubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXh0IGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5KSB7XG4gICAgICAgICAgcm9vdE5vZGVzID0gdGhpcy5jcmVhdGVDb21wb25lbnQoZXh0LCBjb250ZXh0LCByb290Tm9kZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUNvbXBvbmVudChleHQ6IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxhbnksIFwiZGF0YUhlYWRlckV4dGVuc2lvbnNcIj4sIGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIHJvb3ROb2RlczogYW55W10pOiBhbnlbXSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IGV4dC5nZXRGYWN0b3J5KGNvbnRleHQpO1xuICAgIGNvbnN0IHByb2plY3RlZENvbnRlbnQ6IGFueVtdW10gPSBbXTtcblxuICAgIGlmIChleHQucHJvamVjdENvbnRlbnQpIHtcbiAgICAgIHByb2plY3RlZENvbnRlbnQucHVzaChyb290Tm9kZXMpO1xuICAgIH1cblxuICAgIGNvbnN0IGNtcFJlZiA9IHRoaXMudmNSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIG51bGwsIHByb2plY3RlZENvbnRlbnQpO1xuXG4gICAgaWYgKGV4dC5wcm9qZWN0Q29udGVudCkge1xuICAgICAgcm9vdE5vZGVzID0gWyBjbXBSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCBdO1xuICAgIH1cblxuICAgIGlmIChleHQub25DcmVhdGVkKSB7XG4gICAgICBleHQub25DcmVhdGVkKGNvbnRleHQsIGNtcFJlZik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvb3ROb2RlcztcbiAgfVxufVxuXG4vKiogQ2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWNlbGwnLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDZWxsJyxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRGlyZWN0aXZlIGV4dGVuZHMgQ2RrQ2VsbCBpbXBsZW1lbnRzIERvQ2hlY2sge1xuXG4gIEBJbnB1dCgpIHNldCByb3dDdHgodmFsdWU6IFBibFJvd0NvbnRleHQ8YW55Pikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm93Q3R4KSB7XG4gICAgICB0aGlzLl9yb3dDdHggPSB2YWx1ZTtcbiAgICAgIHRoaXMubmdEb0NoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcm93Q3R4OiBQYmxSb3dDb250ZXh0PGFueT47XG4gIGNlbGxDdHg6IFBibENlbGxDb250ZXh0IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBkZWYgYW1vbmcgYWxsIGNvbHVtbnMgcmVnYXJkbGVzcyBvZiB2aXNpYmlsaXR5LlxuICAgKi9cbiAgcHJpdmF0ZSBjb2xJbmRleDogbnVtYmVyO1xuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBmb2N1c2VkID0gZmFsc2U7XG4gIHByaXZhdGUgc2VsZWN0ZWQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbERlZjogUGJsTmdyaWRDb2x1bW5EZWYsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjb2xEZWYsIGVsZW1lbnRSZWYpO1xuICAgIHRoaXMuY29sSW5kZXggPSB0aGlzLmNvbERlZi50YWJsZS5jb2x1bW5BcGkuaW5kZXhPZihjb2xEZWYuY29sdW1uIGFzIFBibENvbHVtbik7XG4gICAgdGhpcy5lbCA9IGVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb2xEZWYuYXBwbHlXaWR0aCh0aGlzLmVsKTtcbiAgICBpbml0Q2VsbEVsZW1lbnQodGhpcy5lbCwgY29sRGVmLmNvbHVtbik7XG4gICAgaW5pdERhdGFDZWxsRWxlbWVudCh0aGlzLmVsLCBjb2xEZWYuY29sdW1uIGFzIFBibENvbHVtbik7XG4gIH1cblxuICAvLyBUT0RPOiBzbWFydCBkaWZmIGhhbmRsaW5nLi4uIGhhbmRsZSBhbGwgZGlmZnMsIG5vdCBqdXN0IHdpZHRoLCBhbmQgY2hhbmdlIG9ubHkgd2hlbiByZXF1aXJlZC5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbERlZi5pc0RpcnR5KSB7XG4gICAgICB0aGlzLmNvbERlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9yb3dDdHgpIHtcbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gdGhpcy5jZWxsQ3R4ID0gdGhpcy5fcm93Q3R4LmNlbGwodGhpcy5jb2xJbmRleCk7XG5cbiAgICAgIGlmIChjZWxsQ29udGV4dC5mb2N1c2VkICE9PSB0aGlzLmZvY3VzZWQpIHtcblxuICAgICAgICBpZiAodGhpcy5mb2N1c2VkID0gY2VsbENvbnRleHQuZm9jdXNlZCkge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNlbGwtZm9jdXNlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5jZWxsQ3R4LnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkID0gY2VsbENvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jZWxsLXNlbGVjdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY2VsbC1zZWxlY3RlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1mb290ZXItY2VsbCcsXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWZvb3Rlci1jZWxsJyxcbiAgICAncm9sZSc6ICdncmlkY2VsbCcsXG4gIH0sXG4gIGV4cG9ydEFzOiAnbmdyaWRGb290ZXJDZWxsJyxcbiB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSBleHRlbmRzIENka0Zvb3RlckNlbGwgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkluaXQge1xuICBwcml2YXRlIGVsOiBIVE1MRWxlbWVudDtcbiAgY2VsbEN0eDogTWV0YUNlbGxDb250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uR3JvdXA+LCBwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50LCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoY29sdW1uRGVmLCBlbGVtZW50UmVmKTtcbiAgICB0aGlzLmVsID0gZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbkRlZi5jb2x1bW47XG4gICAgY29sdW1uRGVmLmFwcGx5V2lkdGgodGhpcy5lbCk7XG4gICAgaW5pdENlbGxFbGVtZW50KHRoaXMuZWwsIGNvbHVtbik7XG4gIH1cblxuICAvLyBUT0RPOiBzbWFydCBkaWZmIGhhbmRsaW5nLi4uIGhhbmRsZSBhbGwgZGlmZnMsIG5vdCBqdXN0IHdpZHRoLCBhbmQgY2hhbmdlIG9ubHkgd2hlbiByZXF1aXJlZC5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbkRlZi5pc0RpcnR5KSB7XG4gICAgICB0aGlzLmNvbHVtbkRlZi5hcHBseVdpZHRoKHRoaXMuZWwpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2VsbEN0eCA9IE1ldGFDZWxsQ29udGV4dC5jcmVhdGUodGhpcy5jb2x1bW5EZWYuY29sdW1uLCB0aGlzLnRhYmxlKTtcbiAgfVxufVxuIl19