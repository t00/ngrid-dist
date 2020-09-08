/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-checkbox.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, PblNgridPluginController, utils, } from '@pebula/ngrid';
/** @type {?} */
const ALWAYS_FALSE_FN = (/**
 * @return {?}
 */
() => false);
const ɵ0 = ALWAYS_FALSE_FN;
export class PblNgridCheckboxComponent {
    /**
     * @param {?} table
     * @param {?} cdr
     */
    constructor(table, cdr) {
        this.table = table;
        this.cdr = cdr;
        this.allSelected = false;
        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(table);
        pluginCtrl.events
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.kind === 'onDataSource') {
                this.selection = e.curr.selection;
            }
        }));
    }
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     * @return {?}
     */
    get bulkSelectMode() { return this._bulkSelectMode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set bulkSelectMode(value) {
        if (value !== this._bulkSelectMode) {
            this._bulkSelectMode = value;
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }
    /**
     * A Custom selection model, optional.
     * If not set, the selection model from the DataSource is used.
     * @return {?}
     */
    get selection() {
        return this._selection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selection(value) {
        if (value !== this._selection) {
            this._selection = value;
            this.setupSelection();
        }
    }
    /**
     * @return {?}
     */
    get isCheckboxDisabled() { return this._isCheckboxDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set isCheckboxDisabled(value) {
        if (value !== this._isCheckboxDisabled) {
            this._isCheckboxDisabled = value;
            if (!this._isCheckboxDisabled || typeof this._isCheckboxDisabled !== 'function') {
                this._isCheckboxDisabled = ALWAYS_FALSE_FN;
            }
        }
    }
    /**
     * @return {?}
     */
    get color() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set color(value) {
        if (value !== this._color) {
            this._color = value;
            if (this.table.isInit) {
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.selection && this.table.ds) {
            this.selection = this.table.ds.selection;
        }
        /** @type {?} */
        const registry = this.table.registry;
        registry.addMulti('headerCell', this.headerDef);
        registry.addMulti('tableCell', this.cellDef);
        registry.addMulti('footerCell', this.footerDef);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        utils.unrx.kill(this);
    }
    /**
     * @return {?}
     */
    masterToggle() {
        if (this.allSelected) {
            this.selection.clear();
        }
        else {
            /** @type {?} */
            const selected = this.getCollection().filter((/**
             * @param {?} data
             * @return {?}
             */
            data => !this._isCheckboxDisabled(data)));
            this.selection.select(...selected);
        }
    }
    /**
     * @param {?} row
     * @return {?}
     */
    rowItemChange(row) {
        this.selection.toggle(row);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }
    /**
     * @private
     * @return {?}
     */
    getCollection() {
        const { ds } = this.table;
        return this.bulkSelectMode === 'view' ? ds.renderedData : ds.source;
    }
    /**
     * @private
     * @return {?}
     */
    setupSelection() {
        utils.unrx.kill(this, this.table);
        if (this._selection) {
            this.length = this.selection.selected.length;
            this.selection.changed
                .pipe(utils.unrx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.handleSelectionChanged();
            }));
            /** @type {?} */
            const changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
            changeSource
                .pipe(utils.unrx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.handleSelectionChanged();
            }));
        }
        else {
            this.length = 0;
        }
    }
    /**
     * @private
     * @return {?}
     */
    handleSelectionChanged() {
        const { length } = this.getCollection().filter((/**
         * @param {?} data
         * @return {?}
         */
        data => !this._isCheckboxDisabled(data)));
        this.allSelected = !this.selection.isEmpty() && this.selection.selected.length === length;
        this.length = this.selection.selected.length;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
    }
}
PblNgridCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-checkbox',
                template: "<ng-container *pblNgridHeaderCellDef=\"name; col as col;\">\n  <mat-checkbox *ngIf=\"bulkSelectMode !== 'none'\"\n                style=\"overflow: initial\"\n                [color]=\"color\"\n                (click)=\"$event.stopPropagation()\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"allSelected\"\n                [indeterminate]=\"length > 0 && !allSelected\">\n  </mat-checkbox>\n</ng-container>\n<mat-checkbox *pblNgridCellDef=\"name; row as row;\"\n              style=\"overflow: initial\"\n              [color]=\"color\"\n              [disabled]=isCheckboxDisabled(row)\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"rowItemChange(row)\"\n              [checked]=\"selection.isSelected(row)\">\n</mat-checkbox>\n<span *pblNgridFooterCellDef=\"name; col as col;\">{{ length ? length : '' }}</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-cell.pbl-ngrid-checkbox,.mat-header-cell.pbl-ngrid-checkbox{box-sizing:content-box;flex:0 0 24px;overflow:visible}"]
            }] }
];
/** @nocollapse */
PblNgridCheckboxComponent.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ChangeDetectorRef }
];
PblNgridCheckboxComponent.propDecorators = {
    name: [{ type: Input }],
    bulkSelectMode: [{ type: Input }],
    selection: [{ type: Input }],
    isCheckboxDisabled: [{ type: Input }],
    color: [{ type: Input }],
    headerDef: [{ type: ViewChild, args: [PblNgridHeaderCellDefDirective, { static: true },] }],
    cellDef: [{ type: ViewChild, args: [PblNgridCellDefDirective, { static: true },] }],
    footerDef: [{ type: ViewChild, args: [PblNgridFooterCellDefDirective, { static: true },] }]
};
if (false) {
    /**
     * Unique name for the checkbox column.
     * When not set, the name 'checkbox' is used.
     *
     *
     * @type {?}
     */
    PblNgridCheckboxComponent.prototype.name;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.headerDef;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.cellDef;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.footerDef;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.allSelected;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.length;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._selection;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._bulkSelectMode;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._isCheckboxDisabled;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype._color;
    /** @type {?} */
    PblNgridCheckboxComponent.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridCheckboxComponent.prototype.cdr;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBNEIsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckosT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRzFELE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4Qiw4QkFBOEIsRUFDOUIsd0JBQXdCLEVBQ3hCLEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQzs7TUFFakIsZUFBZTs7O0FBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBOztBQVNuQyxNQUFNLE9BQU8seUJBQXlCOzs7OztJQXdFcEMsWUFBbUIsS0FBNkIsRUFBVSxHQUFzQjtRQUE3RCxVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUmhGLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBS1osd0JBQW1CLEdBQTBCLGVBQWUsQ0FBQzs7Y0FJN0QsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkQsVUFBVSxDQUFDLE1BQU07YUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QixTQUFTOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ25DO1FB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QUFTLFNBQUMsOEJBQThCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3NCQUMxRCxTQUFTLFNBQUMsd0JBQXdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3dCQUNwRCxTQUFTLFNBQUMsOEJBQThCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7Ozs7Ozs7O0lBeEQzRCx5Q0FBc0I7O0lBc0R0Qiw4Q0FBNEc7O0lBQzVHLDRDQUE4Rjs7SUFDOUYsOENBQTRHOztJQUU1RyxnREFBb0I7O0lBQ3BCLDJDQUFlOzs7OztJQUVmLCtDQUF3Qzs7Ozs7SUFDeEMsb0RBQWlEOzs7OztJQUNqRCx3REFBcUU7Ozs7O0lBQ3JFLDJDQUE2Qjs7SUFFakIsMENBQW9DOzs7OztJQUFFLHdDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuaW1wb3J0IHtcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgdXRpbHMsXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5jb25zdCBBTFdBWVNfRkFMU0VfRk4gPSAoKSA9PiBmYWxzZTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogVW5pcXVlIG5hbWUgZm9yIHRoZSBjaGVja2JveCBjb2x1bW4uXG4gICAqIFdoZW4gbm90IHNldCwgdGhlIG5hbWUgJ2NoZWNrYm94JyBpcyB1c2VkLlxuICAgKlxuICAgKiovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgYmVoYXZpb3Igd2hlbiBjbGlja2luZyBvbiB0aGUgYnVsayBzZWxlY3QgY2hlY2tib3ggKGhlYWRlcikuXG4gICAqIFRoZXJlIGFyZSAyIG9wdGlvbnM6XG4gICAqXG4gICAqIC0gYWxsOiBXaWxsIHNlbGVjdCBhbGwgaXRlbXMgaW4gdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICAgKiAtIHZpZXc6IFdpbGwgc2VsZWN0IG9ubHkgdGhlIHJlbmRlcmVkIGl0ZW1zIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhbGxgXG4gICAqL1xuICBASW5wdXQoKSBnZXQgYnVsa1NlbGVjdE1vZGUoKTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScgeyByZXR1cm4gdGhpcy5fYnVsa1NlbGVjdE1vZGU7IH1cbiAgc2V0IGJ1bGtTZWxlY3RNb2RlKHZhbHVlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fYnVsa1NlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuX2J1bGtTZWxlY3RNb2RlID0gdmFsdWU7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEEgQ3VzdG9tIHNlbGVjdGlvbiBtb2RlbCwgb3B0aW9uYWwuXG4gICAqIElmIG5vdCBzZXQsIHRoZSBzZWxlY3Rpb24gbW9kZWwgZnJvbSB0aGUgRGF0YVNvdXJjZSBpcyB1c2VkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNlbGVjdGlvbigpOiBTZWxlY3Rpb25Nb2RlbDxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICB9XG4gIHNldCBzZWxlY3Rpb24odmFsdWU6IFNlbGVjdGlvbk1vZGVsPGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwU2VsZWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IGlzQ2hlY2tib3hEaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZDsgfVxuICBzZXQgaXNDaGVja2JveERpc2FibGVkKHZhbHVlOiAocm93OiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gdmFsdWU7XG4gICAgICBpZiAoIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCB8fCB0eXBlb2YgdGhpcy5faXNDaGVja2JveERpc2FibGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IEFMV0FZU19GQUxTRV9GTjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XG4gIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb2xvcikge1xuICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBoZWFkZXJEZWY6IFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBAVmlld0NoaWxkKFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgY2VsbERlZjogUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIEBWaWV3Q2hpbGQoUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBmb290ZXJEZWY6IFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuXG4gIGFsbFNlbGVjdGVkID0gZmFsc2U7XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8YW55PjtcbiAgcHJpdmF0ZSBfYnVsa1NlbGVjdE1vZGU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnO1xuICBwcml2YXRlIF9pc0NoZWNrYm94RGlzYWJsZWQ6IChyb3c6IGFueSkgPT4gYm9vbGVhbiA9IEFMV0FZU19GQUxTRV9GTjtcbiAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSk7XG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKHV0aWxzLnVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IGUuY3Vyci5zZWxlY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZWxlY3Rpb24gJiYgdGhpcy50YWJsZS5kcykge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnRhYmxlLmRzLnNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMudGFibGUucmVnaXN0cnk7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzLmhlYWRlckRlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMuY2VsbERlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzLmZvb3RlckRlZik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB1dGlscy51bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWxsU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmlsdGVyKGRhdGEgPT4gIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZChkYXRhKSk7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3QoLi4uc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJvd0l0ZW1DaGFuZ2Uocm93OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGUocm93KTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbGxlY3Rpb24oKSB7XG4gICAgY29uc3QgeyBkcyB9ID0gdGhpcy50YWJsZTtcbiAgICByZXR1cm4gdGhpcy5idWxrU2VsZWN0TW9kZSA9PT0gJ3ZpZXcnID8gZHMucmVuZGVyZWREYXRhIDogZHMuc291cmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB1dGlscy51bnJ4LmtpbGwodGhpcywgdGhpcy50YWJsZSk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jaGFuZ2VkXG4gICAgICAgIC5waXBlKHV0aWxzLnVucngodGhpcywgdGhpcy50YWJsZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcbiAgICAgIGNvbnN0IGNoYW5nZVNvdXJjZSA9IHRoaXMuYnVsa1NlbGVjdE1vZGUgPT09ICd2aWV3JyA/IHRoaXMudGFibGUuZHMub25SZW5kZXJlZERhdGFDaGFuZ2VkIDogdGhpcy50YWJsZS5kcy5vblNvdXJjZUNoYW5nZWQ7XG4gICAgICBjaGFuZ2VTb3VyY2VcbiAgICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU2VsZWN0aW9uQ2hhbmdlZCgpIHtcbiAgICBjb25zdCB7IGxlbmd0aCB9ID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmlsdGVyKGRhdGEgPT4gIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZChkYXRhKSk7XG4gICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGlvbi5pc0VtcHR5KCkgJiYgdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoID09PSBsZW5ndGg7XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=