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
var ALWAYS_FALSE_FN = (/**
 * @return {?}
 */
function () { return false; });
var ɵ0 = ALWAYS_FALSE_FN;
var PblNgridCheckboxComponent = /** @class */ (function () {
    function PblNgridCheckboxComponent(table, cdr) {
        this.table = table;
        this.cdr = cdr;
        this.allSelected = false;
        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
    }
    Object.defineProperty(PblNgridCheckboxComponent.prototype, "bulkSelectMode", {
        /**
         * Defines the behavior when clicking on the bulk select checkbox (header).
         * There are 2 options:
         *
         * - all: Will select all items in the current collection
         * - view: Will select only the rendered items in the view
         *
         * The default value is `all`
         */
        get: /**
         * Defines the behavior when clicking on the bulk select checkbox (header).
         * There are 2 options:
         *
         * - all: Will select all items in the current collection
         * - view: Will select only the rendered items in the view
         *
         * The default value is `all`
         * @return {?}
         */
        function () { return this._bulkSelectMode; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._bulkSelectMode) {
                this._bulkSelectMode = value;
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridCheckboxComponent.prototype, "selection", {
        /**
         * A Custom selection model, optional.
         * If not set, the selection model from the DataSource is used.
         */
        get: /**
         * A Custom selection model, optional.
         * If not set, the selection model from the DataSource is used.
         * @return {?}
         */
        function () {
            return this._selection;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._selection) {
                this._selection = value;
                this.setupSelection();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridCheckboxComponent.prototype, "isCheckboxDisabled", {
        get: /**
         * @return {?}
         */
        function () { return this._isCheckboxDisabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._isCheckboxDisabled) {
                this._isCheckboxDisabled = value;
                if (!this._isCheckboxDisabled || typeof this._isCheckboxDisabled !== 'function') {
                    this._isCheckboxDisabled = ALWAYS_FALSE_FN;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridCheckboxComponent.prototype, "color", {
        get: /**
         * @return {?}
         */
        function () { return this._color; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._color) {
                this._color = value;
                this.cdr.markForCheck();
                this.cdr.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this.selection) {
            this.selection = this.table.ds.selection;
        }
        /** @type {?} */
        var registry = this.table.registry;
        registry.addMulti('headerCell', this.headerDef);
        registry.addMulti('tableCell', this.cellDef);
        registry.addMulti('footerCell', this.footerDef);
    };
    /**
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.masterToggle = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a;
        if (this.allSelected) {
            this.selection.clear();
        }
        else {
            /** @type {?} */
            var selected = this.getCollection().filter((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return !_this._isCheckboxDisabled(data); }));
            (_a = this.selection).select.apply(_a, tslib_1.__spread(selected));
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.rowItemChange = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        this.selection.toggle(row);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.getCollection = /**
     * @private
     * @return {?}
     */
    function () {
        var ds = this.table.ds;
        return this.bulkSelectMode === 'view' ? ds.renderedData : ds.source;
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.setupSelection = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        UnRx.kill(this, this.table);
        if (this._selection) {
            this.length = this.selection.selected.length;
            this.selection.changed
                .pipe(UnRx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            function () {
                var length = _this.getCollection().filter((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return !_this._isCheckboxDisabled(data); })).length;
                _this.allSelected = !_this.selection.isEmpty() && _this.selection.selected.length === length;
                _this.length = _this.selection.selected.length;
                _this.cdr.markForCheck();
                _this.cdr.detectChanges();
            }));
        }
        else {
            this.length = 0;
        }
    };
    PblNgridCheckboxComponent.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: ChangeDetectorRef }
    ]; };
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
    PblNgridCheckboxComponent.ctorParameters = function () { return [
        { type: PblNgridComponent, decorators: [{ type: Optional }] },
        { type: ChangeDetectorRef }
    ]; };
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
    return PblNgridCheckboxComponent;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4Qiw4QkFBOEIsR0FDL0IsTUFBTSxlQUFlLENBQUM7O0lBRWpCLGVBQWU7OztBQUFHLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFBOzs7SUFpRmpDLG1DQUErQixLQUE2QixFQUFVLEdBQXNCO1FBQTdELFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFSNUYsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLWix3QkFBbUIsR0FBMEIsZUFBZSxDQUFDO0lBRzBCLENBQUM7SUF0RGhHLHNCQUFhLHFEQUFjO1FBVDNCOzs7Ozs7OztXQVFHOzs7Ozs7Ozs7OztRQUNILGNBQXlELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3ZGLFVBQW1CLEtBQThCO1lBQy9DLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxD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N0ZvRixpQkFBaUI7Ozt1QkE0QnpILEtBQUs7aUNBV0wsS0FBSzs0QkFZTCxLQUFLO3FDQVdMLEtBQUs7d0JBVUwsS0FBSzs0QkFTTCxTQUFTLFNBQUMsOEJBQThCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzBCQUMxRCxTQUFTLFNBQUMsd0JBQXdCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzRCQUNwRCxTQUFTLFNBQUMsOEJBQThCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOztJQTdEaEQseUJBQXlCO1FBRHJDLElBQUksRUFBRTtpREF3RWlDLGlCQUFpQixFQUFvQixpQkFBaUI7T0F2RWpGLHlCQUF5QixDQXdIckM7SUFBRCxnQ0FBQztDQUFBLElBQUE7U0F4SFkseUJBQXlCOzs7Ozs7Ozs7SUFNcEMseUNBQXNCOztJQXFEdEIsOENBQTRHOztJQUM1Ryw0Q0FBOEY7O0lBQzlGLDhDQUE0Rzs7SUFFNUcsZ0RBQW9COztJQUNwQiwyQ0FBZTs7Ozs7SUFFZiwrQ0FBd0M7Ozs7O0lBQ3hDLG9EQUFpRDs7Ozs7SUFDakQsd0RBQXFFOzs7OztJQUNyRSwyQ0FBNkI7O0lBRWpCLDBDQUFnRDs7Ozs7SUFBRSx3Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBBZnRlclZpZXdJbml0LCBPcHRpb25hbCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHtcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5jb25zdCBBTFdBWVNfRkFMU0VfRk4gPSAoKSA9PiBmYWxzZTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWNoZWNrYm94JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgLyoqXG4gICAqIFVuaXF1ZSBuYW1lIGZvciB0aGUgY2hlY2tib3ggY29sdW1uLlxuICAgKiBXaGVuIG5vdCBzZXQsIHRoZSBuYW1lICdjaGVja2JveCcgaXMgdXNlZC5cbiAgICpcbiAgICoqL1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIGJlaGF2aW9yIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJ1bGsgc2VsZWN0IGNoZWNrYm94IChoZWFkZXIpLlxuICAgKiBUaGVyZSBhcmUgMiBvcHRpb25zOlxuICAgKlxuICAgKiAtIGFsbDogV2lsbCBzZWxlY3QgYWxsIGl0ZW1zIGluIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cbiAgICogLSB2aWV3OiBXaWxsIHNlbGVjdCBvbmx5IHRoZSByZW5kZXJlZCBpdGVtcyBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYWxsYFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGJ1bGtTZWxlY3RNb2RlKCk6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnIHsgcmV0dXJuIHRoaXMuX2J1bGtTZWxlY3RNb2RlOyB9XG4gIHNldCBidWxrU2VsZWN0TW9kZSh2YWx1ZTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2J1bGtTZWxlY3RNb2RlKSB7XG4gICAgICB0aGlzLl9idWxrU2VsZWN0TW9kZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBBIEN1c3RvbSBzZWxlY3Rpb24gbW9kZWwsIG9wdGlvbmFsLlxuICAgKiBJZiBub3Qgc2V0LCB0aGUgc2VsZWN0aW9uIG1vZGVsIGZyb20gdGhlIERhdGFTb3VyY2UgaXMgdXNlZC5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3Rpb24oKTogU2VsZWN0aW9uTW9kZWw8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgfVxuICBzZXQgc2VsZWN0aW9uKHZhbHVlOiBTZWxlY3Rpb25Nb2RlbDxhbnk+KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXR1cFNlbGVjdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBpc0NoZWNrYm94RGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQ7IH1cbiAgc2V0IGlzQ2hlY2tib3hEaXNhYmxlZCh2YWx1ZTogKHJvdzogYW55KSA9PiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgaWYgKCF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgfHwgdHlwZW9mIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSBBTFdBWVNfRkFMU0VfRk47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7IHJldHVybiB0aGlzLl9jb2xvcjsgfVxuICBzZXQgY29sb3IodmFsdWU6IFRoZW1lUGFsZXR0ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY29sb3IpIHtcbiAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyRGVmOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgQFZpZXdDaGlsZChQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGNlbGxEZWY6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBAVmlld0NoaWxkKFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgZm9vdGVyRGVmOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcblxuICBhbGxTZWxlY3RlZCA9IGZhbHNlO1xuICBsZW5ndGg6IG51bWJlcjtcblxuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT47XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfaXNDaGVja2JveERpc2FibGVkOiAocm93OiBhbnkpID0+IGJvb2xlYW4gPSBBTFdBWVNfRkFMU0VfRk47XG4gIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnRhYmxlLmRzLnNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMudGFibGUucmVnaXN0cnk7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzLmhlYWRlckRlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMuY2VsbERlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzLmZvb3RlckRlZik7XG4gIH1cblxuICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWxsU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmlsdGVyKGRhdGEgPT4gIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZChkYXRhKSk7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3QoLi4uc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJvd0l0ZW1DaGFuZ2Uocm93OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGUocm93KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICBjb25zdCB7IGRzIH0gPSB0aGlzLnRhYmxlO1xuICAgIHJldHVybiB0aGlzLmJ1bGtTZWxlY3RNb2RlID09PSAndmlldycgPyBkcy5yZW5kZXJlZERhdGEgOiBkcy5zb3VyY2U7XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLnRhYmxlKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNoYW5nZWRcbiAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSB0aGlzLmdldENvbGxlY3Rpb24oKS5maWx0ZXIoZGF0YSA9PiAhdGhpcy5faXNDaGVja2JveERpc2FibGVkKGRhdGEpKTtcbiAgICAgICAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuc2VsZWN0aW9uLmlzRW1wdHkoKSAmJiB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGggPT09IGxlbmd0aDtcbiAgICAgICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG59XG4iXX0=