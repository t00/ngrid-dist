/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ViewEncapsulation, AfterViewInit, Optional, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, } from '@pebula/ngrid';
/** @type {?} */
const ALWAYS_FALSE_FN = (/**
 * @return {?}
 */
() => false);
const ɵ0 = ALWAYS_FALSE_FN;
let PblNgridCheckboxComponent = class PblNgridCheckboxComponent {
    /**
     * @param {?} table
     * @param {?} cdr
     */
    constructor(table, cdr) {
        this.table = table;
        this.cdr = cdr;
        this.allSelected = false;
        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
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
            this.cdr.markForCheck();
            this.cdr.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.selection) {
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
        UnRx.kill(this, this.table);
        if (this._selection) {
            this.length = this.selection.selected.length;
            this.selection.changed
                .pipe(UnRx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            () => {
                this.handleSelectionChanged();
            }));
            /** @type {?} */
            const changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
            changeSource
                .pipe(UnRx(this, this.table))
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
};
PblNgridCheckboxComponent.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ChangeDetectorRef }
];
PblNgridCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-checkbox',
                template: "<ng-container *pblNgridHeaderCellDef=\"name; col as col;\">\n  <mat-checkbox *ngIf=\"bulkSelectMode !== 'none'\"\n                style=\"overflow: initial\"\n                [color]=\"color\"\n                (click)=\"$event.stopPropagation()\"\n                (change)=\"$event ? masterToggle() : null\"\n                [checked]=\"allSelected\"\n                [indeterminate]=\"length > 0 && !allSelected\">\n  </mat-checkbox>\n</ng-container>\n<mat-checkbox *pblNgridCellDef=\"name; row as row;\"\n              style=\"overflow: initial\"\n              [color]=\"color\"\n              [disabled]=isCheckboxDisabled(row)\n              (click)=\"$event.stopPropagation()\"\n              (change)=\"rowItemChange(row)\"\n              [checked]=\"selection.isSelected(row)\">\n</mat-checkbox>\n<span *pblNgridFooterCellDef=\"name; col as col;\">{{ length ? length : '' }}</span>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-cell.pbl-ngrid-checkbox,.mat-header-cell.pbl-ngrid-checkbox{box-sizing:content-box;-webkit-box-flex:0;flex:0 0 24px;overflow:visible}"]
            }] }
];
/** @nocollapse */
PblNgridCheckboxComponent.ctorParameters = () => [
    { type: PblNgridComponent, decorators: [{ type: Optional }] },
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
PblNgridCheckboxComponent = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, ChangeDetectorRef])
], PblNgridCheckboxComponent);
export { PblNgridCheckboxComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4Qiw4QkFBOEIsR0FDL0IsTUFBTSxlQUFlLENBQUM7O01BRWpCLGVBQWU7OztBQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQTs7SUFVdEIseUJBQXlCLFNBQXpCLHlCQUF5Qjs7Ozs7SUF1RXBDLFlBQStCLEtBQTZCLEVBQVUsR0FBc0I7UUFBN0QsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVI1RixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUtaLHdCQUFtQixHQUEwQixlQUFlLENBQUM7SUFHMkIsQ0FBQzs7Ozs7Ozs7Ozs7SUF0RGpHLElBQWEsY0FBYyxLQUE4QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN2RixJQUFJLGNBQWMsQ0FBQyxLQUE4QjtRQUMvQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxF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bnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgQWZ0ZXJWaWV3SW5pdCwgT3B0aW9uYWwsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxufSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuY29uc3QgQUxXQVlTX0ZBTFNFX0ZOID0gKCkgPT4gZmFsc2U7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBVbmlxdWUgbmFtZSBmb3IgdGhlIGNoZWNrYm94IGNvbHVtbi5cbiAgICogV2hlbiBub3Qgc2V0LCB0aGUgbmFtZSAnY2hlY2tib3gnIGlzIHVzZWQuXG4gICAqXG4gICAqKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciB3aGVuIGNsaWNraW5nIG9uIHRoZSBidWxrIHNlbGVjdCBjaGVja2JveCAoaGVhZGVyKS5cbiAgICogVGhlcmUgYXJlIDIgb3B0aW9uczpcbiAgICpcbiAgICogLSBhbGw6IFdpbGwgc2VsZWN0IGFsbCBpdGVtcyBpbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXG4gICAqIC0gdmlldzogV2lsbCBzZWxlY3Qgb25seSB0aGUgcmVuZGVyZWQgaXRlbXMgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgYGFsbGBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBidWxrU2VsZWN0TW9kZSgpOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJyB7IHJldHVybiB0aGlzLl9idWxrU2VsZWN0TW9kZTsgfVxuICBzZXQgYnVsa1NlbGVjdE1vZGUodmFsdWU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgdGhpcy5fYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQSBDdXN0b20gc2VsZWN0aW9uIG1vZGVsLCBvcHRpb25hbC5cbiAgICogSWYgbm90IHNldCwgdGhlIHNlbGVjdGlvbiBtb2RlbCBmcm9tIHRoZSBEYXRhU291cmNlIGlzIHVzZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0aW9uKCk6IFNlbGVjdGlvbk1vZGVsPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gIH1cbiAgc2V0IHNlbGVjdGlvbih2YWx1ZTogU2VsZWN0aW9uTW9kZWw8YW55Pikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fc2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBTZWxlY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgaXNDaGVja2JveERpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5faXNDaGVja2JveERpc2FibGVkOyB9XG4gIHNldCBpc0NoZWNrYm94RGlzYWJsZWQodmFsdWU6IChyb3c6IGFueSkgPT4gYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNDaGVja2JveERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICghdGhpcy5faXNDaGVja2JveERpc2FibGVkIHx8IHR5cGVvZiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gQUxXQVlTX0ZBTFNFX0ZOO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGUgeyByZXR1cm4gdGhpcy5fY29sb3I7IH1cbiAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbG9yKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZChQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGhlYWRlckRlZjogUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIEBWaWV3Q2hpbGQoUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBjZWxsRGVmOiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgQFZpZXdDaGlsZChQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGZvb3RlckRlZjogUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlPGFueT47XG5cbiAgYWxsU2VsZWN0ZWQgPSBmYWxzZTtcbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb25Nb2RlbDxhbnk+O1xuICBwcml2YXRlIF9idWxrU2VsZWN0TW9kZTogJ2FsbCcgfCAndmlldycgfCAnbm9uZSc7XG4gIHByaXZhdGUgX2lzQ2hlY2tib3hEaXNhYmxlZDogKHJvdzogYW55KSA9PiBib29sZWFuID0gQUxXQVlTX0ZBTFNFX0ZOO1xuICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMudGFibGUuZHMuc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gdGhpcy50YWJsZS5yZWdpc3RyeTtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnaGVhZGVyQ2VsbCcsIHRoaXMuaGVhZGVyRGVmKTtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgndGFibGVDZWxsJywgdGhpcy5jZWxsRGVmKTtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnZm9vdGVyQ2VsbCcsIHRoaXMuZm9vdGVyRGVmKTtcbiAgfVxuXG4gIG1hc3RlclRvZ2dsZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbGxTZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY2xlYXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLmdldENvbGxlY3Rpb24oKS5maWx0ZXIoZGF0YSA9PiAhdGhpcy5faXNDaGVja2JveERpc2FibGVkKGRhdGEpKTtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLnNlbGVjdCguLi5zZWxlY3RlZCk7XG4gICAgfVxuICB9XG5cbiAgcm93SXRlbUNoYW5nZShyb3c6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0aW9uLnRvZ2dsZShyb3cpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb2xsZWN0aW9uKCkge1xuICAgIGNvbnN0IHsgZHMgfSA9IHRoaXMudGFibGU7XG4gICAgcmV0dXJuIHRoaXMuYnVsa1NlbGVjdE1vZGUgPT09ICd2aWV3JyA/IGRzLnJlbmRlcmVkRGF0YSA6IGRzLnNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgVW5SeC5raWxsKHRoaXMsIHRoaXMudGFibGUpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlZFxuICAgICAgICAucGlwZShVblJ4KHRoaXMsIHRoaXMudGFibGUpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBjaGFuZ2VTb3VyY2UgPSB0aGlzLmJ1bGtTZWxlY3RNb2RlID09PSAndmlldycgPyB0aGlzLnRhYmxlLmRzLm9uUmVuZGVyZWREYXRhQ2hhbmdlZCA6IHRoaXMudGFibGUuZHMub25Tb3VyY2VDaGFuZ2VkO1xuICAgICAgY2hhbmdlU291cmNlXG4gICAgICAgIC5waXBlKFVuUngodGhpcywgdGhpcy50YWJsZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IHRoaXMuZ2V0Q29sbGVjdGlvbigpLmZpbHRlcihkYXRhID0+ICF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQoZGF0YSkpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3Rpb24uaXNFbXB0eSgpICYmIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19