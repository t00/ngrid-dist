/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ViewChild, ViewEncapsulation, Optional, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
                var length = _this.getCollection().length;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBaUIsUUFBUSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4Qiw4QkFBOEIsR0FDL0IsTUFBTSxlQUFlLENBQUM7O0lBRWpCLGVBQWU7OztBQUFHLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFBOzs7SUFpRmpDLG1DQUErQixLQUE2QixFQUFVLEdBQXNCO1FBQTdELFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFSNUYsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLWix3QkFBbUIsR0FBMEIsZUFBZSxDQUFDO0lBRzBCLENBQUM7SUF0RGhHLHNCQUFhLHFEQUFjO1FBVDNCOzs7Ozs7OztXQVFHOzs7Ozs7Ozs7OztRQUNILGNBQXlELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3ZGLFVBQW1CLEtBQThCO1lBQy9DLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4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S0FBSztxQ0FXTCxLQUFLO3dCQVVMLEtBQUs7NEJBU0wsU0FBUyxTQUFDLDhCQUE4QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFDMUQsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs0QkFDcEQsU0FBUyxTQUFDLDhCQUE4QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUE3RGhELHlCQUF5QjtRQURyQyxJQUFJLEVBQUU7aURBd0VpQyxpQkFBaUIsRUFBb0IsaUJBQWlCO09BdkVqRix5QkFBeUIsQ0F3SHJDO0lBQUQsZ0NBQUM7Q0FBQSxJQUFBO1NBeEhZLHlCQUF5Qjs7Ozs7Ozs7O0lBTXBDLHlDQUFzQjs7SUFxRHRCLDhDQUE0Rzs7SUFDNUcsNENBQThGOztJQUM5Riw4Q0FBNEc7O0lBRTVHLGdEQUFvQjs7SUFDcEIsMkNBQWU7Ozs7O0lBRWYsK0NBQXdDOzs7OztJQUN4QyxvREFBaUQ7Ozs7O0lBQ2pELHdEQUFxRTs7Ozs7SUFDckUsMkNBQTZCOztJQUVqQiwwQ0FBZ0Q7Ozs7O0lBQUUsd0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvbiwgQWZ0ZXJWaWV3SW5pdCwgT3B0aW9uYWwsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7XG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxufSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuY29uc3QgQUxXQVlTX0ZBTFNFX0ZOID0gKCkgPT4gZmFsc2U7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIC8qKlxuICAgKiBVbmlxdWUgbmFtZSBmb3IgdGhlIGNoZWNrYm94IGNvbHVtbi5cbiAgICogV2hlbiBub3Qgc2V0LCB0aGUgbmFtZSAnY2hlY2tib3gnIGlzIHVzZWQuXG4gICAqXG4gICAqKi9cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciB3aGVuIGNsaWNraW5nIG9uIHRoZSBidWxrIHNlbGVjdCBjaGVja2JveCAoaGVhZGVyKS5cbiAgICogVGhlcmUgYXJlIDIgb3B0aW9uczpcbiAgICpcbiAgICogLSBhbGw6IFdpbGwgc2VsZWN0IGFsbCBpdGVtcyBpbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXG4gICAqIC0gdmlldzogV2lsbCBzZWxlY3Qgb25seSB0aGUgcmVuZGVyZWQgaXRlbXMgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgYGFsbGBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBidWxrU2VsZWN0TW9kZSgpOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJyB7IHJldHVybiB0aGlzLl9idWxrU2VsZWN0TW9kZTsgfVxuICBzZXQgYnVsa1NlbGVjdE1vZGUodmFsdWU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgdGhpcy5fYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogQSBDdXN0b20gc2VsZWN0aW9uIG1vZGVsLCBvcHRpb25hbC5cbiAgICogSWYgbm90IHNldCwgdGhlIHNlbGVjdGlvbiBtb2RlbCBmcm9tIHRoZSBEYXRhU291cmNlIGlzIHVzZWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0aW9uKCk6IFNlbGVjdGlvbk1vZGVsPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gIH1cbiAgc2V0IHNlbGVjdGlvbih2YWx1ZTogU2VsZWN0aW9uTW9kZWw8YW55Pikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fc2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLl9zZWxlY3Rpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBTZWxlY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgaXNDaGVja2JveERpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5faXNDaGVja2JveERpc2FibGVkOyB9XG4gIHNldCBpc0NoZWNrYm94RGlzYWJsZWQodmFsdWU6IChyb3c6IGFueSkgPT4gYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNDaGVja2JveERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICghdGhpcy5faXNDaGVja2JveERpc2FibGVkIHx8IHR5cGVvZiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gQUxXQVlTX0ZBTFNFX0ZOO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBjb2xvcigpOiBUaGVtZVBhbGV0dGUgeyByZXR1cm4gdGhpcy5fY29sb3I7IH1cbiAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbG9yKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZChQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGhlYWRlckRlZjogUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIEBWaWV3Q2hpbGQoUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBjZWxsRGVmOiBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgQFZpZXdDaGlsZChQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGZvb3RlckRlZjogUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlPGFueT47XG5cbiAgYWxsU2VsZWN0ZWQgPSBmYWxzZTtcbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb25Nb2RlbDxhbnk+O1xuICBwcml2YXRlIF9idWxrU2VsZWN0TW9kZTogJ2FsbCcgfCAndmlldycgfCAnbm9uZSc7XG4gIHByaXZhdGUgX2lzQ2hlY2tib3hEaXNhYmxlZDogKHJvdzogYW55KSA9PiBib29sZWFuID0gQUxXQVlTX0ZBTFNFX0ZOO1xuICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgIGlmICghdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy50YWJsZS5kcy5zZWxlY3Rpb247XG4gICAgfVxuXG4gICAgY29uc3QgcmVnaXN0cnkgPSB0aGlzLnRhYmxlLnJlZ2lzdHJ5O1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdoZWFkZXJDZWxsJywgdGhpcy5oZWFkZXJEZWYpO1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCd0YWJsZUNlbGwnLCB0aGlzLmNlbGxEZWYpO1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdmb290ZXJDZWxsJywgdGhpcy5mb290ZXJEZWYpO1xuICB9XG5cbiAgbWFzdGVyVG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFsbFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZ2V0Q29sbGVjdGlvbigpLmZpbHRlcihkYXRhID0+ICF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQoZGF0YSkpO1xuICAgICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0KC4uLnNlbGVjdGVkKTtcbiAgICB9XG4gIH1cblxuICByb3dJdGVtQ2hhbmdlKHJvdzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb24udG9nZ2xlKHJvdyk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbGxlY3Rpb24oKSB7XG4gICAgY29uc3QgeyBkcyB9ID0gdGhpcy50YWJsZTtcbiAgICByZXR1cm4gdGhpcy5idWxrU2VsZWN0TW9kZSA9PT0gJ3ZpZXcnID8gZHMucmVuZGVyZWREYXRhIDogZHMuc291cmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICBVblJ4LmtpbGwodGhpcywgdGhpcy50YWJsZSk7XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jaGFuZ2VkXG4gICAgICAgIC5waXBlKFVuUngodGhpcywgdGhpcy50YWJsZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICBjb25zdCB7IGxlbmd0aCB9ID0gdGhpcy5nZXRDb2xsZWN0aW9uKCk7XG4gICAgICAgICAgdGhpcy5hbGxTZWxlY3RlZCA9ICF0aGlzLnNlbGVjdGlvbi5pc0VtcHR5KCkgJiYgdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoID09PSBsZW5ndGg7XG4gICAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGg7XG4gICAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgIH1cbiAgfVxufVxuIl19