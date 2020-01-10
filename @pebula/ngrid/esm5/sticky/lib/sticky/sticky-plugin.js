/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Input, IterableDiffers, IterableDiffer, IterableChangeRecord, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin } from '@pebula/ngrid';
/** @type {?} */
export var PLUGIN_KEY = 'sticky';
/**
 * @param {?} grid
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyRow(grid, type, valueOrBulk, state) {
    var e_1, _a;
    /** @type {?} */
    var isHeader = type === 'header';
    /** @type {?} */
    var queryList = isHeader ? grid._headerRowDefs : grid._footerRowDefs;
    /** @type {?} */
    var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    var addOneIfMainExists = (isHeader && grid.showHeader) || (!isHeader && grid.showFooter) ? 1 : 0;
    /** @type {?} */
    var changed;
    try {
        for (var bulk_1 = tslib_1.__values(bulk), bulk_1_1 = bulk_1.next(); !bulk_1_1.done; bulk_1_1 = bulk_1.next()) {
            var _b = tslib_1.__read(bulk_1_1.value, 2), value = _b[0], state_1 = _b[1];
            // the index from the user is 0 based or the grid header/footer row.
            // we store them both, so we need to convert... our first is always the grid header/footer and then we have the same order as the user's.
            /** @type {?} */
            var idx = value === 'table' ? 0 : value + addOneIfMainExists;
            if (!isHeader) {
                // sticky-styler stickRows() methods will reverse the order of footer columns
                // so we actually need to set another row to make the row we want sticky.
                // we could reverse the collection, but choosing the opposite side is better.
                // think [0, 1, 2, 3, 4] and we want 1. sticky-styler will reverse to [4, 3, 2, 1, 0] so doing nothing will stick 3.
                // the opposite is length MINUS 1 MINUS index which is 5 - 1 - 1 which is 3, in the revered array its the row 1 which is what we wanted.
                idx = (queryList.length - 1) - idx;
            }
            /** @type {?} */
            var rowDef = queryList.toArray()[idx];
            if (rowDef && rowDef.sticky !== state_1) {
                rowDef.sticky = state_1;
                changed = true;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (bulk_1_1 && !bulk_1_1.done && (_a = bulk_1.return)) _a.call(bulk_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (changed) {
        if (isHeader) {
            grid._cdkTable.updateStickyHeaderRowStyles();
        }
        else {
            grid._cdkTable.updateStickyFooterRowStyles();
        }
    }
}
/**
 * @param {?} grid
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyColumns(grid, type, valueOrBulk, state) {
    var e_2, _a;
    /** @type {?} */
    var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    var changed;
    var _loop_1 = function (columnId, state_2) {
        if (typeof columnId === 'string') {
            columnId = grid.columnApi.visibleColumns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.orgProp === columnId; }));
        }
        /** @type {?} */
        var c = grid.columnApi.visibleColumns[columnId];
        if (c) {
            changed = true;
            c.pin = state_2 ? type : undefined;
            if (type === 'end') {
                c.columnDef.stickyEnd = state_2;
                c.columnDef.sticky = false;
            }
            else {
                c.columnDef.sticky = state_2;
                c.columnDef.stickyEnd = false;
            }
        }
    };
    try {
        for (var bulk_2 = tslib_1.__values(bulk), bulk_2_1 = bulk_2.next(); !bulk_2_1.done; bulk_2_1 = bulk_2.next()) {
            var _b = tslib_1.__read(bulk_2_1.value, 2), columnId = _b[0], state_2 = _b[1];
            _loop_1(columnId, state_2);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (bulk_2_1 && !bulk_2_1.done && (_a = bulk_2.return)) _a.call(bulk_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (changed) {
        grid._cdkTable.updateStickyColumnStyles();
    }
}
var PblNgridStickyPluginDirective = /** @class */ (function () {
    function PblNgridStickyPluginDirective(grid, _differs, pluginCtrl) {
        var _this = this;
        this.grid = grid;
        this._differs = _differs;
        this.pluginCtrl = pluginCtrl;
        this._columnCache = { start: [], end: [] };
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onResizeRow'; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.grid._cdkTable.updateStickyHeaderRowStyles();
            _this.grid._cdkTable.updateStickyColumnStyles();
            _this.grid._cdkTable.updateStickyFooterRowStyles();
        }));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInvalidateHeaders'; })))
            .subscribe((/**
         * @return {?}
         */
        function () {
            if (_this._startDiffer && _this.grid.isInit) {
                _this._startDiffer.diff([]);
                _this.applyColumnDiff('start', _this._columnCache.start, _this._startDiffer);
            }
            if (_this._endDiffer && _this.grid.isInit) {
                _this._endDiffer.diff([]);
                _this.applyColumnDiff('end', _this._columnCache.end, _this._endDiffer);
            }
        }));
    }
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnStart", {
        /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._startDiffer) {
                this._startDiffer = this._differs.find([]).create();
            }
            this.applyColumnDiff('start', value, this._startDiffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnEnd", {
        /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._endDiffer) {
                this._endDiffer = this._differs.find([]).create();
            }
            this.applyColumnDiff('end', value, this._endDiffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyHeader", {
        /**
       * Set the header rows you want to apply sticky positioning to.
       * Valid values are:
       *   - `grid` - Literal string `grid` that will set the grid's main header row.
       *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
       *
       * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
       * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
       */
        set: /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._headerDiffer) {
                this._headerDiffer = this._differs.find([]).create();
            }
            this.applyRowDiff('header', value, this._headerDiffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyFooter", {
        /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `grid` - Literal string `grid` that will set the grid's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._footerDiffer) {
                this._footerDiffer = this._differs.find([]).create();
            }
            this.applyRowDiff('footer', value, this._footerDiffer);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridStickyPluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.grid);
    };
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    PblNgridStickyPluginDirective.prototype.applyColumnDiff = /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    function (type, value, differ) {
        var _this = this;
        if (!this.grid.isInit) {
            /** @type {?} */
            var unsub_1 = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    unsub_1.unsubscribe();
                    _this.applyColumnDiff(type, value, differ);
                }
            }));
            return;
        }
        this._columnCache[type] = value || [];
        /** @type {?} */
        var changes = differ.diff(value || []);
        /** @type {?} */
        var bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        function (record, prevIndex, currentIndex) {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyColumns(this.grid, type, bulk);
        }
    };
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    PblNgridStickyPluginDirective.prototype.applyRowDiff = /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    function (type, value, differ) {
        var _this = this;
        if (!this.grid.isInit) {
            /** @type {?} */
            var unsub_2 = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    unsub_2.unsubscribe();
                    _this.applyRowDiff(type, value, differ);
                }
            }));
            return;
        }
        /** @type {?} */
        var changes = differ.diff(value || []);
        /** @type {?} */
        var bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        function (record, prevIndex, currentIndex) {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyRow(this.grid, type, bulk);
        }
    };
    PblNgridStickyPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: IterableDiffers },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStickyPluginDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]' },] }
    ];
    /** @nocollapse */
    PblNgridStickyPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: IterableDiffers },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStickyPluginDirective.propDecorators = {
        stickyColumnStart: [{ type: Input }],
        stickyColumnEnd: [{ type: Input }],
        stickyHeader: [{ type: Input }],
        stickyFooter: [{ type: Input }]
    };
    PblNgridStickyPluginDirective = tslib_1.__decorate([
        NgridPlugin({ id: PLUGIN_KEY }),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
            IterableDiffers,
            PblNgridPluginController])
    ], PblNgridStickyPluginDirective);
    return PblNgridStickyPluginDirective;
}());
export { PblNgridStickyPluginDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._startDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._endDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._headerDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._footerDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._columnCache;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype._differs;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype.pluginCtrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS9zdGlja3ktcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBU3pGLE1BQU0sS0FBTyxVQUFVLEdBQWEsUUFBUTs7Ozs7Ozs7QUFJNUMsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUE0QixFQUFFLElBQXlCLEVBQUUsV0FBa0UsRUFBRSxLQUFlOzs7UUFDakssUUFBUSxHQUFHLElBQUksS0FBSyxRQUFROztRQUM1QixTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYzs7UUFDaEUsSUFBSSxHQUF1QyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUU7O1FBRTlHLGtCQUFrQixHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUU5RixPQUFnQjs7UUFDcEIsS0FBNkIsSUFBQSxTQUFBLGlCQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBRTtZQUF4QixJQUFB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Ozs7SUFDNUMsbURBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlciwgSXRlcmFibGVDaGFuZ2VSZWNvcmQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBOZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBzdGlja3k/OiBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3N0aWNreScgPSAnc3RpY2t5JztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+KTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3coZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWU6ICd0YWJsZScgfCBudW1iZXIsIHN0YXRlOiBib29sZWFuKTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3coZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWVPckJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gfCAndGFibGUnIHwgbnVtYmVyLCBzdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgY29uc3QgaXNIZWFkZXIgPSB0eXBlID09PSAnaGVhZGVyJztcbiAgY29uc3QgcXVlcnlMaXN0ID0gaXNIZWFkZXIgPyBncmlkLl9oZWFkZXJSb3dEZWZzIDogZ3JpZC5fZm9vdGVyUm93RGVmcztcbiAgY29uc3QgYnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPiA9IEFycmF5LmlzQXJyYXkodmFsdWVPckJ1bGspID8gdmFsdWVPckJ1bGsgOiBbIFt2YWx1ZU9yQnVsaywgc3RhdGVdIF07XG5cbiAgY29uc3QgYWRkT25lSWZNYWluRXhpc3RzID0gKGlzSGVhZGVyICYmIGdyaWQuc2hvd0hlYWRlcikgfHwgKCFpc0hlYWRlciAmJiBncmlkLnNob3dGb290ZXIpID8gMSA6IDA7XG5cbiAgbGV0IGNoYW5nZWQ6IGJvb2xlYW47XG4gIGZvciAoY29uc3QgW3ZhbHVlLCBzdGF0ZV0gb2YgYnVsaykge1xuICAgIC8vIHRoZSBpbmRleCBmcm9tIHRoZSB1c2VyIGlzIDAgYmFzZWQgb3IgdGhlIGdyaWQgaGVhZGVyL2Zvb3RlciByb3cuXG4gICAgLy8gd2Ugc3RvcmUgdGhlbSBib3RoLCBzbyB3ZSBuZWVkIHRvIGNvbnZlcnQuLi4gb3VyIGZpcnN0IGlzIGFsd2F5cyB0aGUgZ3JpZCBoZWFkZXIvZm9vdGVyIGFuZCB0aGVuIHdlIGhhdmUgdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVzZXIncy5cbiAgICBsZXQgaWR4ID0gdmFsdWUgPT09ICd0YWJsZScgPyAwIDogdmFsdWUgKyBhZGRPbmVJZk1haW5FeGlzdHM7XG4gICAgaWYgKCFpc0hlYWRlcikge1xuICAgICAgLy8gc3RpY2t5LXN0eWxlciBzdGlja1Jvd3MoKSBtZXRob2RzIHdpbGwgcmV2ZXJzZSB0aGUgb3JkZXIgb2YgZm9vdGVyIGNvbHVtbnNcbiAgICAgIC8vIHNvIHdlIGFjdHVhbGx5IG5lZWQgdG8gc2V0IGFub3RoZXIgcm93IHRvIG1ha2UgdGhlIHJvdyB3ZSB3YW50IHN0aWNreS5cbiAgICAgIC8vIHdlIGNvdWxkIHJldmVyc2UgdGhlIGNvbGxlY3Rpb24sIGJ1dCBjaG9vc2luZyB0aGUgb3Bwb3NpdGUgc2lkZSBpcyBiZXR0ZXIuXG4gICAgICAvLyB0aGluayBbMCwgMSwgMiwgMywgNF0gYW5kIHdlIHdhbnQgMS4gc3RpY2t5LXN0eWxlciB3aWxsIHJldmVyc2UgdG8gWzQsIDMsIDIsIDEsIDBdIHNvIGRvaW5nIG5vdGhpbmcgd2lsbCBzdGljayAzLlxuICAgICAgLy8gdGhlIG9wcG9zaXRlIGlzIGxlbmd0aCBNSU5VUyAxIE1JTlVTIGluZGV4IHdoaWNoIGlzIDUgLSAxIC0gMSB3aGljaCBpcyAzLCBpbiB0aGUgcmV2ZXJlZCBhcnJheSBpdHMgdGhlIHJvdyAxIHdoaWNoIGlzIHdoYXQgd2Ugd2FudGVkLlxuICAgICAgaWR4ID0gKHF1ZXJ5TGlzdC5sZW5ndGggLSAxKSAtIGlkeDtcbiAgICB9XG5cbiAgICBjb25zdCByb3dEZWYgPSBxdWVyeUxpc3QudG9BcnJheSgpW2lkeF07XG4gICAgaWYgKHJvd0RlZiAmJiByb3dEZWYuc3RpY2t5ICE9PSBzdGF0ZSkge1xuICAgICAgcm93RGVmLnN0aWNreSA9IHN0YXRlO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoYW5nZWQpIHtcbiAgICBpZiAoaXNIZWFkZXIpIHtcbiAgICAgIGdyaWQuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUhlYWRlclJvd1N0eWxlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnMoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnMoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZTogc3RyaW5nICB8IG51bWJlciwgc3RhdGU6IGJvb2xlYW4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnMoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZU9yQnVsazogQXJyYXk8W3N0cmluZyAgfCBudW1iZXIsIGJvb2xlYW5dPiB8IHN0cmluZyAgfCBudW1iZXIsIHN0YXRlPzogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4gPSBBcnJheS5pc0FycmF5KHZhbHVlT3JCdWxrKSA/IHZhbHVlT3JCdWxrIDogWyBbdmFsdWVPckJ1bGssIHN0YXRlXSBdO1xuICBsZXQgY2hhbmdlZDogYm9vbGVhbjtcbiAgZm9yIChsZXQgW2NvbHVtbklkLCBzdGF0ZV0gb2YgYnVsaykge1xuICAgIGlmICh0eXBlb2YgY29sdW1uSWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb2x1bW5JZCA9IGdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmRJbmRleCggYyA9PiBjLm9yZ1Byb3AgPT09IGNvbHVtbklkICk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSBncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1uc1tjb2x1bW5JZF07XG4gICAgaWYgKGMpIHtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgYy5waW4gPSBzdGF0ZSA/IHR5cGUgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5RW5kID0gc3RhdGU7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5ID0gc3RhdGU7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreUVuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoY2hhbmdlZCkge1xuICAgIGdyaWQuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICB9XG59XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbc3RpY2t5Q29sdW1uU3RhcnRdLCBwYmwtbmdyaWRbc3RpY2t5Q29sdW1uRW5kXSwgcGJsLW5ncmlkW3N0aWNreUhlYWRlcl0sIHBibC1uZ3JpZFtzdGlja3lGb290ZXJdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFNldCB0aGUgaGVhZGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYGdyaWRgIC0gTGl0ZXJhbCBzdHJpbmcgYGdyaWRgIHRoYXQgd2lsbCBzZXQgdGhlIGdyaWQncyBtYWluIGhlYWRlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1oZWFkZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgaGVhZGVyL2hlYWRlckdyb3VwIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUNvbHVtblN0YXJ0KHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9zdGFydERpZmZlcikge1xuICAgICAgdGhpcy5fc3RhcnREaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignc3RhcnQnLCB2YWx1ZSwgdGhpcy5fc3RhcnREaWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZm9vdGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYGdyaWRgIC0gTGl0ZXJhbCBzdHJpbmcgYGdyaWRgIHRoYXQgd2lsbCBzZXQgdGhlIGdyaWQncyBtYWluIGZvb3RlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1mb290ZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgZm9vdGVyIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUNvbHVtbkVuZCh2YWx1ZTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikge1xuICAgIGlmICghdGhpcy5fZW5kRGlmZmVyKSB7XG4gICAgICB0aGlzLl9lbmREaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignZW5kJywgdmFsdWUsIHRoaXMuX2VuZERpZmZlcik7XG4gIH1cblxuICAgIC8qKlxuICAgKiBTZXQgdGhlIGhlYWRlciByb3dzIHlvdSB3YW50IHRvIGFwcGx5IHN0aWNreSBwb3NpdGlvbmluZyB0by5cbiAgICogVmFsaWQgdmFsdWVzIGFyZTpcbiAgICogICAtIGBncmlkYCAtIExpdGVyYWwgc3RyaW5nIGBncmlkYCB0aGF0IHdpbGwgc2V0IHRoZSBncmlkJ3MgbWFpbiBoZWFkZXIgcm93LlxuICAgKiAgIC0gbnVtYmVyICAtIFRoZSBpbmRleCBvZiB0aGUgcm93LCBmb3IgbXVsdGktaGVhZGVyIHJvdy4gVGhlIGluZGV4IHJlZmVycyB0byB0aGUgb3JkZXIgeW91IGRlZmluZWQgdGhlIGhlYWRlci9oZWFkZXJHcm91cCByb3dzIChiYXNlIDApO1xuICAgKlxuICAgKiBGb3IgcGVyZm9ybWFuY2UgY29uc2lkZXJhdGlvbnMgb25seSBuZXcgdmFsdWVzIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSAoaS5lLiB0aGUgYXJyYXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlKS5cbiAgICogTWFuaXB1bGF0aW5nIHRoZSBhcnJheSB3aWxsIG5vdCB0cmlnZ2VyIGEgY2hhbmdlICh0aGUgc3RpY2t5IHN0YXRlIHdpbGwgbm90IGNoYW5nZSkgdW5sZXNzIHNlbmRpbmcgYSBjb3B5IG9mIGl0IChyZXBsYWNpbmcgaXQsIGUuZy4gQXJyYXkuc2xpY2UoKSlcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzdGlja3lIZWFkZXIodmFsdWU6IEFycmF5PCd0YWJsZScgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9oZWFkZXJEaWZmZXIpIHtcbiAgICAgIHRoaXMuX2hlYWRlckRpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlSb3dEaWZmKCdoZWFkZXInLCB2YWx1ZSwgdGhpcy5faGVhZGVyRGlmZmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZvb3RlciByb3dzIHlvdSB3YW50IHRvIGFwcGx5IHN0aWNreSBwb3NpdGlvbmluZyB0by5cbiAgICogVmFsaWQgdmFsdWVzIGFyZTpcbiAgICogICAtIGBncmlkYCAtIExpdGVyYWwgc3RyaW5nIGBncmlkYCB0aGF0IHdpbGwgc2V0IHRoZSBncmlkJ3MgbWFpbiBmb290ZXIgcm93LlxuICAgKiAgIC0gbnVtYmVyICAtIFRoZSBpbmRleCBvZiB0aGUgcm93LCBmb3IgbXVsdGktZm9vdGVyIHJvdy4gVGhlIGluZGV4IHJlZmVycyB0byB0aGUgb3JkZXIgeW91IGRlZmluZWQgdGhlIGZvb3RlciByb3dzIChiYXNlIDApO1xuICAgKlxuICAgKiBGb3IgcGVyZm9ybWFuY2UgY29uc2lkZXJhdGlvbnMgb25seSBuZXcgdmFsdWVzIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSAoaS5lLiB0aGUgYXJyYXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlKS5cbiAgICogTWFuaXB1bGF0aW5nIHRoZSBhcnJheSB3aWxsIG5vdCB0cmlnZ2VyIGEgY2hhbmdlICh0aGUgc3RpY2t5IHN0YXRlIHdpbGwgbm90IGNoYW5nZSkgdW5sZXNzIHNlbmRpbmcgYSBjb3B5IG9mIGl0IChyZXBsYWNpbmcgaXQsIGUuZy4gQXJyYXkuc2xpY2UoKSlcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzdGlja3lGb290ZXIodmFsdWU6IEFycmF5PCd0YWJsZScgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9mb290ZXJEaWZmZXIpIHtcbiAgICAgIHRoaXMuX2Zvb3RlckRpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlSb3dEaWZmKCdmb290ZXInLCB2YWx1ZSwgdGhpcy5fZm9vdGVyRGlmZmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXJ0RGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmcgfCBudW1iZXI+O1xuICBwcml2YXRlIF9lbmREaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2hlYWRlckRpZmZlcjogSXRlcmFibGVEaWZmZXI8J3RhYmxlJyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2Zvb3RlckRpZmZlcjogSXRlcmFibGVEaWZmZXI8J3RhYmxlJyB8IG51bWJlcj47XG5cbiAgcHJpdmF0ZSBfY29sdW1uQ2FjaGU6IHsgc3RhcnQ6IEFycmF5PHN0cmluZyB8IG51bWJlcj47IGVuZDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjsgfSA9IHsgc3RhcnQ6IFtdLCBlbmQ6IFtdIH07XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IgKHByb3RlY3RlZCByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uUmVzaXplUm93JykpXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUudXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk7XG4gICAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUudXBkYXRlU3RpY2t5Rm9vdGVyUm93U3R5bGVzKCk7XG4gICAgICB9KTtcblxuICAgICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnBpcGUoZmlsdGVyICggZSA9PiBlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJyApKVxuICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3N0YXJ0RGlmZmVyICYmIHRoaXMuZ3JpZC5pc0luaXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0RGlmZmVyLmRpZmYoW10pO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbHVtbkRpZmYoJ3N0YXJ0JywgdGhpcy5fY29sdW1uQ2FjaGUuc3RhcnQsIHRoaXMuX3N0YXJ0RGlmZmVyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9lbmREaWZmZXIgJiYgdGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5fZW5kRGlmZmVyLmRpZmYoW10pO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbHVtbkRpZmYoJ2VuZCcsIHRoaXMuX2NvbHVtbkNhY2hlLmVuZCwgdGhpcy5fZW5kRGlmZmVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBseUNvbHVtbkRpZmYodHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiwgZGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmcgfCBudW1iZXI+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdyaWQuaXNJbml0KSB7XG4gICAgICBjb25zdCB1bnN1YiA9IHRoaXMucGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgIHVuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5hcHBseUNvbHVtbkRpZmYodHlwZSwgdmFsdWUsIGRpZmZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbHVtbkNhY2hlW3R5cGVdID0gdmFsdWUgfHwgW107XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gZGlmZmVyLmRpZmYodmFsdWUgfHwgW10pO1xuICAgIGNvbnN0IGJ1bGs6IEFycmF5PFtzdHJpbmcgfCBudW1iZXIsIGJvb2xlYW5dPiA9IFtdO1xuICAgIGNoYW5nZXMuZm9yRWFjaE9wZXJhdGlvbigocmVjb3JkOiBJdGVyYWJsZUNoYW5nZVJlY29yZDxzdHJpbmcgfCBudW1iZXI+LCBwcmV2SW5kZXg6IG51bWJlciwgY3VycmVudEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChyZWNvcmQucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGJ1bGsucHVzaChbcmVjb3JkLml0ZW0sIHRydWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgZmFsc2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYnVsay5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRTdGlja3lDb2x1bW5zKHRoaXMuZ3JpZCwgdHlwZSwgYnVsayk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5Um93RGlmZih0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCB2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4sIGRpZmZlcjogSXRlcmFibGVEaWZmZXI8J3RhYmxlJyB8IG51bWJlcj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ3JpZC5pc0luaXQpIHtcbiAgICAgIGNvbnN0IHVuc3ViID0gdGhpcy5wbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgdW5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmFwcGx5Um93RGlmZih0eXBlLCB2YWx1ZSwgZGlmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlcyA9IGRpZmZlci5kaWZmKHZhbHVlIHx8IFtdKTtcbiAgICBjb25zdCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+ID0gW107XG4gICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPCd0YWJsZScgfCBudW1iZXI+LCBwcmV2SW5kZXg6IG51bWJlciwgY3VycmVudEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChyZWNvcmQucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGJ1bGsucHVzaChbcmVjb3JkLml0ZW0sIHRydWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgZmFsc2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYnVsay5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRTdGlja3lSb3codGhpcy5ncmlkLCB0eXBlLCBidWxrKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==