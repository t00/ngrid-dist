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
                _this.handleSelectionChanged();
            }));
            /** @type {?} */
            var changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
            changeSource
                .pipe(UnRx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.handleSelectionChanged();
            }));
        }
        else {
            this.length = 0;
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.handleSelectionChanged = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        var length = this.getCollection().filter((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return !_this._isCheckboxDisabled(data); })).length;
        this.allSelected = !this.selection.isEmpty() && this.selection.selected.length === length;
        this.length = this.selection.selected.length;
        this.cdr.markForCheck();
        this.cdr.detectChanges();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BKLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4Qiw4QkFBOEIsR0FDL0IsTUFBTSxlQUFlLENBQUM7O0lBRWpCLGVBQWU7OztBQUFHLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFBOzs7SUFpRmpDLG1DQUErQixLQUE2QixFQUFVLEdBQXNCO1FBQTdELFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFSNUYsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLWix3QkFBbUIsR0FBMEIsZUFBZSxDQUFDO0lBRzJCLENBQUM7SUF0RGpHLHNCQUFhLHFEQUFjO1FBVDNCOzs7Ozs7OztXQVFHOzs7Ozs7Ozs7OztRQUNILGNBQXlELE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3ZGLFVBQW1CLEtBQThCO1lBQy9DLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxD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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24sIEFmdGVyVmlld0luaXQsIE9wdGlvbmFsLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQge1xuICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmNvbnN0IEFMV0FZU19GQUxTRV9GTiA9ICgpID0+IGZhbHNlO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2hlY2tib3gnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAvKipcbiAgICogVW5pcXVlIG5hbWUgZm9yIHRoZSBjaGVja2JveCBjb2x1bW4uXG4gICAqIFdoZW4gbm90IHNldCwgdGhlIG5hbWUgJ2NoZWNrYm94JyBpcyB1c2VkLlxuICAgKlxuICAgKiovXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgYmVoYXZpb3Igd2hlbiBjbGlja2luZyBvbiB0aGUgYnVsayBzZWxlY3QgY2hlY2tib3ggKGhlYWRlcikuXG4gICAqIFRoZXJlIGFyZSAyIG9wdGlvbnM6XG4gICAqXG4gICAqIC0gYWxsOiBXaWxsIHNlbGVjdCBhbGwgaXRlbXMgaW4gdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICAgKiAtIHZpZXc6IFdpbGwgc2VsZWN0IG9ubHkgdGhlIHJlbmRlcmVkIGl0ZW1zIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhbGxgXG4gICAqL1xuICBASW5wdXQoKSBnZXQgYnVsa1NlbGVjdE1vZGUoKTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScgeyByZXR1cm4gdGhpcy5fYnVsa1NlbGVjdE1vZGU7IH1cbiAgc2V0IGJ1bGtTZWxlY3RNb2RlKHZhbHVlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fYnVsa1NlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuX2J1bGtTZWxlY3RNb2RlID0gdmFsdWU7XG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEEgQ3VzdG9tIHNlbGVjdGlvbiBtb2RlbCwgb3B0aW9uYWwuXG4gICAqIElmIG5vdCBzZXQsIHRoZSBzZWxlY3Rpb24gbW9kZWwgZnJvbSB0aGUgRGF0YVNvdXJjZSBpcyB1c2VkLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGlvbigpOiBTZWxlY3Rpb25Nb2RlbDxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICB9XG4gIHNldCBzZWxlY3Rpb24odmFsdWU6IFNlbGVjdGlvbk1vZGVsPGFueT4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwU2VsZWN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IGlzQ2hlY2tib3hEaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZDsgfVxuICBzZXQgaXNDaGVja2JveERpc2FibGVkKHZhbHVlOiAocm93OiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gdmFsdWU7XG4gICAgICBpZiAoIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCB8fCB0eXBlb2YgdGhpcy5faXNDaGVja2JveERpc2FibGVkICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IEFMV0FZU19GQUxTRV9GTjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XG4gIHNldCBjb2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb2xvcikge1xuICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBoZWFkZXJEZWY6IFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBAVmlld0NoaWxkKFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgY2VsbERlZjogUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlPGFueT47XG4gIEBWaWV3Q2hpbGQoUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLCB7IHN0YXRpYzogdHJ1ZSB9KSBmb290ZXJEZWY6IFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuXG4gIGFsbFNlbGVjdGVkID0gZmFsc2U7XG4gIGxlbmd0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3NlbGVjdGlvbjogU2VsZWN0aW9uTW9kZWw8YW55PjtcbiAgcHJpdmF0ZSBfYnVsa1NlbGVjdE1vZGU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnO1xuICBwcml2YXRlIF9pc0NoZWNrYm94RGlzYWJsZWQ6IChyb3c6IGFueSkgPT4gYm9vbGVhbiA9IEFMV0FZU19GQUxTRV9GTjtcbiAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnRhYmxlLmRzLnNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMudGFibGUucmVnaXN0cnk7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2hlYWRlckNlbGwnLCB0aGlzLmhlYWRlckRlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ3RhYmxlQ2VsbCcsIHRoaXMuY2VsbERlZik7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2Zvb3RlckNlbGwnLCB0aGlzLmZvb3RlckRlZik7XG4gIH1cblxuICBtYXN0ZXJUb2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYWxsU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNsZWFyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5nZXRDb2xsZWN0aW9uKCkuZmlsdGVyKGRhdGEgPT4gIXRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZChkYXRhKSk7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5zZWxlY3QoLi4uc2VsZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJvd0l0ZW1DaGFuZ2Uocm93OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGlvbi50b2dnbGUocm93KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29sbGVjdGlvbigpIHtcbiAgICBjb25zdCB7IGRzIH0gPSB0aGlzLnRhYmxlO1xuICAgIHJldHVybiB0aGlzLmJ1bGtTZWxlY3RNb2RlID09PSAndmlldycgPyBkcy5yZW5kZXJlZERhdGEgOiBkcy5zb3VyY2U7XG4gIH1cblxuICBwcml2YXRlIHNldHVwU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLnRhYmxlKTtcbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICAgIHRoaXMuc2VsZWN0aW9uLmNoYW5nZWRcbiAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhYmxlKSlcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuICAgICAgY29uc3QgY2hhbmdlU291cmNlID0gdGhpcy5idWxrU2VsZWN0TW9kZSA9PT0gJ3ZpZXcnID8gdGhpcy50YWJsZS5kcy5vblJlbmRlcmVkRGF0YUNoYW5nZWQgOiB0aGlzLnRhYmxlLmRzLm9uU291cmNlQ2hhbmdlZDtcbiAgICAgIGNoYW5nZVNvdXJjZVxuICAgICAgICAucGlwZShVblJ4KHRoaXMsIHRoaXMudGFibGUpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VkKCkge1xuICAgIGNvbnN0IHsgbGVuZ3RoIH0gPSB0aGlzLmdldENvbGxlY3Rpb24oKS5maWx0ZXIoZGF0YSA9PiAhdGhpcy5faXNDaGVja2JveERpc2FibGVkKGRhdGEpKTtcbiAgICB0aGlzLmFsbFNlbGVjdGVkID0gIXRoaXMuc2VsZWN0aW9uLmlzRW1wdHkoKSAmJiB0aGlzLnNlbGVjdGlvbi5zZWxlY3RlZC5sZW5ndGggPT09IGxlbmd0aDtcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aDtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==