/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-checkbox.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective, PblNgridPluginController, utils, } from '@pebula/ngrid';
/** @type {?} */
var ALWAYS_FALSE_FN = (/**
 * @return {?}
 */
function () { return false; });
var ɵ0 = ALWAYS_FALSE_FN;
var PblNgridCheckboxComponent = /** @class */ (function () {
    function PblNgridCheckboxComponent(table, cdr) {
        var _this = this;
        this.table = table;
        this.cdr = cdr;
        this.allSelected = false;
        this._isCheckboxDisabled = ALWAYS_FALSE_FN;
        /** @type {?} */
        var pluginCtrl = PblNgridPluginController.find(table);
        pluginCtrl.events
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.kind === 'onDataSource') {
                _this.selection = e.curr.selection;
            }
        }));
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
                if (this.table.isInit) {
                    this.cdr.markForCheck();
                    this.cdr.detectChanges();
                }
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
        if (!this.selection && this.table.ds) {
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
    PblNgridCheckboxComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        utils.unrx.kill(this);
    };
    /**
     * @return {?}
     */
    PblNgridCheckboxComponent.prototype.masterToggle = /**
     * @return {?}
     */
    function () {
        var _a;
        var _this = this;
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
            (_a = this.selection).select.apply(_a, __spread(selected));
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
        this.cdr.markForCheck();
        this.cdr.detectChanges();
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
        utils.unrx.kill(this, this.table);
        if (this._selection) {
            this.length = this.selection.selected.length;
            this.selection.changed
                .pipe(utils.unrx(this, this.table))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.handleSelectionChanged();
            }));
            /** @type {?} */
            var changeSource = this.bulkSelectMode === 'view' ? this.table.ds.onRenderedDataChanged : this.table.ds.onSourceChanged;
            changeSource
                .pipe(utils.unrx(this, this.table))
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
        { type: PblNgridComponent },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQTRCLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JKLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUcxRCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5Qix3QkFBd0IsRUFDeEIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUN4QixLQUFLLEdBQ04sTUFBTSxlQUFlLENBQUM7O0lBRWpCLGVBQWU7OztBQUFHLGNBQU0sT0FBQSxLQUFLLEVBQUwsQ0FBSyxDQUFBOztBQUVuQztJQStFRSxtQ0FBbUIsS0FBNkIsRUFBVSxHQUFzQjtRQUFoRixpQkFTQztRQVRrQixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUmhGLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBS1osd0JBQW1CLEdBQTBCLGVBQWUsQ0FBQzs7WUFJN0QsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkQsVUFBVSxDQUFDLE1BQU07YUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QixTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtnQkFDN0IsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNuQztRQUNILENBQUMs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QUFLO3dCQVVMLEtBQUs7NEJBV0wsU0FBUyxTQUFDLDhCQUE4QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTswQkFDMUQsU0FBUyxTQUFDLHdCQUF3QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs0QkFDcEQsU0FBUyxTQUFDLDhCQUE4QixFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUFtRjdELGdDQUFDO0NBQUEsQUF4SkQsSUF3SkM7U0FqSlkseUJBQXlCOzs7Ozs7Ozs7SUFNcEMseUNBQXNCOztJQXNEdEIsOENBQTRHOztJQUM1Ryw0Q0FBOEY7O0lBQzlGLDhDQUE0Rzs7SUFFNUcsZ0RBQW9COztJQUNwQiwyQ0FBZTs7Ozs7SUFFZiwrQ0FBd0M7Ozs7O0lBQ3hDLG9EQUFpRDs7Ozs7SUFDakQsd0RBQXFFOzs7OztJQUNyRSwyQ0FBNkI7O0lBRWpCLDBDQUFvQzs7Ozs7SUFBRSx3Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7XG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gIHV0aWxzLFxufSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuY29uc3QgQUxXQVlTX0ZBTFNFX0ZOID0gKCkgPT4gZmFsc2U7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFVuaXF1ZSBuYW1lIGZvciB0aGUgY2hlY2tib3ggY29sdW1uLlxuICAgKiBXaGVuIG5vdCBzZXQsIHRoZSBuYW1lICdjaGVja2JveCcgaXMgdXNlZC5cbiAgICpcbiAgICoqL1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIGJlaGF2aW9yIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJ1bGsgc2VsZWN0IGNoZWNrYm94IChoZWFkZXIpLlxuICAgKiBUaGVyZSBhcmUgMiBvcHRpb25zOlxuICAgKlxuICAgKiAtIGFsbDogV2lsbCBzZWxlY3QgYWxsIGl0ZW1zIGluIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cbiAgICogLSB2aWV3OiBXaWxsIHNlbGVjdCBvbmx5IHRoZSByZW5kZXJlZCBpdGVtcyBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYWxsYFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGJ1bGtTZWxlY3RNb2RlKCk6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnIHsgcmV0dXJuIHRoaXMuX2J1bGtTZWxlY3RNb2RlOyB9XG4gIHNldCBidWxrU2VsZWN0TW9kZSh2YWx1ZTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2J1bGtTZWxlY3RNb2RlKSB7XG4gICAgICB0aGlzLl9idWxrU2VsZWN0TW9kZSA9IHZhbHVlO1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBBIEN1c3RvbSBzZWxlY3Rpb24gbW9kZWwsIG9wdGlvbmFsLlxuICAgKiBJZiBub3Qgc2V0LCB0aGUgc2VsZWN0aW9uIG1vZGVsIGZyb20gdGhlIERhdGFTb3VyY2UgaXMgdXNlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBzZWxlY3Rpb24oKTogU2VsZWN0aW9uTW9kZWw8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjtcbiAgfVxuICBzZXQgc2VsZWN0aW9uKHZhbHVlOiBTZWxlY3Rpb25Nb2RlbDxhbnk+KSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXR1cFNlbGVjdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBpc0NoZWNrYm94RGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQ7IH1cbiAgc2V0IGlzQ2hlY2tib3hEaXNhYmxlZCh2YWx1ZTogKHJvdzogYW55KSA9PiBib29sZWFuKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgaWYgKCF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgfHwgdHlwZW9mIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSBBTFdBWVNfRkFMU0VfRk47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IGNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7IHJldHVybiB0aGlzLl9jb2xvcjsgfVxuICBzZXQgY29sb3IodmFsdWU6IFRoZW1lUGFsZXR0ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY29sb3IpIHtcbiAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgaGVhZGVyRGVmOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcbiAgQFZpZXdDaGlsZChQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGNlbGxEZWY6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xuICBAVmlld0NoaWxkKFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSwgeyBzdGF0aWM6IHRydWUgfSkgZm9vdGVyRGVmOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcblxuICBhbGxTZWxlY3RlZCA9IGZhbHNlO1xuICBsZW5ndGg6IG51bWJlcjtcblxuICBwcml2YXRlIF9zZWxlY3Rpb246IFNlbGVjdGlvbk1vZGVsPGFueT47XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfaXNDaGVja2JveERpc2FibGVkOiAocm93OiBhbnkpID0+IGJvb2xlYW4gPSBBTFdBWVNfRkFMU0VfRk47XG4gIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBlLmN1cnIuc2VsZWN0aW9uO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0aW9uICYmIHRoaXMudGFibGUuZHMpIHtcbiAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy50YWJsZS5kcy5zZWxlY3Rpb247XG4gICAgfVxuXG4gICAgY29uc3QgcmVnaXN0cnkgPSB0aGlzLnRhYmxlLnJlZ2lzdHJ5O1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdoZWFkZXJDZWxsJywgdGhpcy5oZWFkZXJEZWYpO1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCd0YWJsZUNlbGwnLCB0aGlzLmNlbGxEZWYpO1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdmb290ZXJDZWxsJywgdGhpcy5mb290ZXJEZWYpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdXRpbHMudW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgbWFzdGVyVG9nZ2xlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFsbFNlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNlbGVjdGlvbi5jbGVhcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZ2V0Q29sbGVjdGlvbigpLmZpbHRlcihkYXRhID0+ICF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQoZGF0YSkpO1xuICAgICAgdGhpcy5zZWxlY3Rpb24uc2VsZWN0KC4uLnNlbGVjdGVkKTtcbiAgICB9XG4gIH1cblxuICByb3dJdGVtQ2hhbmdlKHJvdzogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3Rpb24udG9nZ2xlKHJvdyk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb2xsZWN0aW9uKCkge1xuICAgIGNvbnN0IHsgZHMgfSA9IHRoaXMudGFibGU7XG4gICAgcmV0dXJuIHRoaXMuYnVsa1NlbGVjdE1vZGUgPT09ICd2aWV3JyA/IGRzLnJlbmRlcmVkRGF0YSA6IGRzLnNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgdXRpbHMudW5yeC5raWxsKHRoaXMsIHRoaXMudGFibGUpO1xuICAgIGlmICh0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgICAgdGhpcy5zZWxlY3Rpb24uY2hhbmdlZFxuICAgICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMsIHRoaXMudGFibGUpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKTtcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBjaGFuZ2VTb3VyY2UgPSB0aGlzLmJ1bGtTZWxlY3RNb2RlID09PSAndmlldycgPyB0aGlzLnRhYmxlLmRzLm9uUmVuZGVyZWREYXRhQ2hhbmdlZCA6IHRoaXMudGFibGUuZHMub25Tb3VyY2VDaGFuZ2VkO1xuICAgICAgY2hhbmdlU291cmNlXG4gICAgICAgIC5waXBlKHV0aWxzLnVucngodGhpcywgdGhpcy50YWJsZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uQ2hhbmdlZCgpO1xuICAgICAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVNlbGVjdGlvbkNoYW5nZWQoKSB7XG4gICAgY29uc3QgeyBsZW5ndGggfSA9IHRoaXMuZ2V0Q29sbGVjdGlvbigpLmZpbHRlcihkYXRhID0+ICF0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQoZGF0YSkpO1xuICAgIHRoaXMuYWxsU2VsZWN0ZWQgPSAhdGhpcy5zZWxlY3Rpb24uaXNFbXB0eSgpICYmIHRoaXMuc2VsZWN0aW9uLnNlbGVjdGVkLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zZWxlY3Rpb24uc2VsZWN0ZWQubGVuZ3RoO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19