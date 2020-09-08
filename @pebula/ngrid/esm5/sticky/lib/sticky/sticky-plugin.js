/**
 * @fileoverview added by tsickle
 * Generated from: lib/sticky/sticky-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __values } from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Input, IterableDiffers } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
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
        for (var bulk_1 = __values(bulk), bulk_1_1 = bulk_1.next(); !bulk_1_1.done; bulk_1_1 = bulk_1.next()) {
            var _b = __read(bulk_1_1.value, 2), value = _b[0], state_1 = _b[1];
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
        for (var bulk_2 = __values(bulk), bulk_2_1 = bulk_2.next(); !bulk_2_1.done; bulk_2_1 = bulk_2.next()) {
            var _b = __read(bulk_2_1.value, 2), columnId = _b[0], state_2 = _b[1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS9zdGlja3ktcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQW1ELE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTNUUsTUFBTSxLQUFPLFVBQVUsR0FBYSxRQUFROzs7Ozs7OztBQUk1QyxNQUFNLFVBQVUsWUFBWSxDQUFDLElBQTRCLEVBQUUsSUFBeUIsRUFBRSxXQUFrRSxFQUFFLEtBQWU7OztRQUNqSyxRQUFRLEdBQUcsSUFBSSxLQUFLLFFBQVE7O1FBQzVCLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjOztRQUNoRSxJQUFJLEdBQXVDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBRTs7UUFFOUcsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRTlGLE9BQWdCOztRQUNwQixLQUE2QixJQUFBLFNBQUEsU0FBQSxJQUFJLENBQUEsMEJBQUEsNENBQUU7WUFBeEIsSUFBQSw4QkFBYyxFQUFiLGFBQUssRUFBRSxlQUFLOzs7O2dCQUdsQixHQUFH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QUE4QyxFQUFFLFNBQWlCLEVBQUUsWUFBb0I7WUFDL0csSUFBSSxNQUFNLENBQUMsYUFBYSxJQUFJLElBQUksRUFBRTtnQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNoQztpQkFBTSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQzs7Z0JBNUpGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSw0R0FBNEcsRUFBRTs7OztnQkE3RTVILGlCQUFpQjtnQkFGQyxlQUFlO2dCQUVkLHdCQUF3Qjs7O29DQXdGakQsS0FBSztrQ0FnQkwsS0FBSzsrQkFnQkwsS0FBSzsrQkFnQkwsS0FBSzs7SUFrR1Isb0NBQUM7Q0FBQSxBQTdKRCxJQTZKQztTQTVKWSw2QkFBNkI7Ozs7OztJQWlFeEMscURBQXNEOzs7OztJQUN0RCxtREFBb0Q7Ozs7O0lBQ3BELHNEQUF3RDs7Ozs7SUFDeEQsc0RBQXdEOzs7OztJQUV4RCxxREFBK0c7Ozs7O0lBQy9HLHNEQUE4RDs7Ozs7SUFFakQsNkNBQStDOzs7OztJQUMvQyxpREFBNEM7Ozs7O0lBQzVDLG1EQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBzdGlja3k/OiBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3N0aWNreScgPSAnc3RpY2t5JztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+KTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3coZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWU6ICd0YWJsZScgfCBudW1iZXIsIHN0YXRlOiBib29sZWFuKTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3coZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWVPckJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gfCAndGFibGUnIHwgbnVtYmVyLCBzdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgY29uc3QgaXNIZWFkZXIgPSB0eXBlID09PSAnaGVhZGVyJztcbiAgY29uc3QgcXVlcnlMaXN0ID0gaXNIZWFkZXIgPyBncmlkLl9oZWFkZXJSb3dEZWZzIDogZ3JpZC5fZm9vdGVyUm93RGVmcztcbiAgY29uc3QgYnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPiA9IEFycmF5LmlzQXJyYXkodmFsdWVPckJ1bGspID8gdmFsdWVPckJ1bGsgOiBbIFt2YWx1ZU9yQnVsaywgc3RhdGVdIF07XG5cbiAgY29uc3QgYWRkT25lSWZNYWluRXhpc3RzID0gKGlzSGVhZGVyICYmIGdyaWQuc2hvd0hlYWRlcikgfHwgKCFpc0hlYWRlciAmJiBncmlkLnNob3dGb290ZXIpID8gMSA6IDA7XG5cbiAgbGV0IGNoYW5nZWQ6IGJvb2xlYW47XG4gIGZvciAoY29uc3QgW3ZhbHVlLCBzdGF0ZV0gb2YgYnVsaykge1xuICAgIC8vIHRoZSBpbmRleCBmcm9tIHRoZSB1c2VyIGlzIDAgYmFzZWQgb3IgdGhlIGdyaWQgaGVhZGVyL2Zvb3RlciByb3cuXG4gICAgLy8gd2Ugc3RvcmUgdGhlbSBib3RoLCBzbyB3ZSBuZWVkIHRvIGNvbnZlcnQuLi4gb3VyIGZpcnN0IGlzIGFsd2F5cyB0aGUgZ3JpZCBoZWFkZXIvZm9vdGVyIGFuZCB0aGVuIHdlIGhhdmUgdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVzZXIncy5cbiAgICBsZXQgaWR4ID0gdmFsdWUgPT09ICd0YWJsZScgPyAwIDogdmFsdWUgKyBhZGRPbmVJZk1haW5FeGlzdHM7XG4gICAgaWYgKCFpc0hlYWRlcikge1xuICAgICAgLy8gc3RpY2t5LXN0eWxlciBzdGlja1Jvd3MoKSBtZXRob2RzIHdpbGwgcmV2ZXJzZSB0aGUgb3JkZXIgb2YgZm9vdGVyIGNvbHVtbnNcbiAgICAgIC8vIHNvIHdlIGFjdHVhbGx5IG5lZWQgdG8gc2V0IGFub3RoZXIgcm93IHRvIG1ha2UgdGhlIHJvdyB3ZSB3YW50IHN0aWNreS5cbiAgICAgIC8vIHdlIGNvdWxkIHJldmVyc2UgdGhlIGNvbGxlY3Rpb24sIGJ1dCBjaG9vc2luZyB0aGUgb3Bwb3NpdGUgc2lkZSBpcyBiZXR0ZXIuXG4gICAgICAvLyB0aGluayBbMCwgMSwgMiwgMywgNF0gYW5kIHdlIHdhbnQgMS4gc3RpY2t5LXN0eWxlciB3aWxsIHJldmVyc2UgdG8gWzQsIDMsIDIsIDEsIDBdIHNvIGRvaW5nIG5vdGhpbmcgd2lsbCBzdGljayAzLlxuICAgICAgLy8gdGhlIG9wcG9zaXRlIGlzIGxlbmd0aCBNSU5VUyAxIE1JTlVTIGluZGV4IHdoaWNoIGlzIDUgLSAxIC0gMSB3aGljaCBpcyAzLCBpbiB0aGUgcmV2ZXJlZCBhcnJheSBpdHMgdGhlIHJvdyAxIHdoaWNoIGlzIHdoYXQgd2Ugd2FudGVkLlxuICAgICAgaWR4ID0gKHF1ZXJ5TGlzdC5sZW5ndGggLSAxKSAtIGlkeDtcbiAgICB9XG5cbiAgICBjb25zdCByb3dEZWYgPSBxdWVyeUxpc3QudG9BcnJheSgpW2lkeF07XG4gICAgaWYgKHJvd0RlZiAmJiByb3dEZWYuc3RpY2t5ICE9PSBzdGF0ZSkge1xuICAgICAgcm93RGVmLnN0aWNreSA9IHN0YXRlO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoYW5nZWQpIHtcbiAgICBpZiAoaXNIZWFkZXIpIHtcbiAgICAgIGdyaWQuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUhlYWRlclJvd1N0eWxlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnMoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnMoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZTogc3RyaW5nICB8IG51bWJlciwgc3RhdGU6IGJvb2xlYW4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnMoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZU9yQnVsazogQXJyYXk8W3N0cmluZyAgfCBudW1iZXIsIGJvb2xlYW5dPiB8IHN0cmluZyAgfCBudW1iZXIsIHN0YXRlPzogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4gPSBBcnJheS5pc0FycmF5KHZhbHVlT3JCdWxrKSA/IHZhbHVlT3JCdWxrIDogWyBbdmFsdWVPckJ1bGssIHN0YXRlXSBdO1xuICBsZXQgY2hhbmdlZDogYm9vbGVhbjtcbiAgZm9yIChsZXQgW2NvbHVtbklkLCBzdGF0ZV0gb2YgYnVsaykge1xuICAgIGlmICh0eXBlb2YgY29sdW1uSWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb2x1bW5JZCA9IGdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmRJbmRleCggYyA9PiBjLm9yZ1Byb3AgPT09IGNvbHVtbklkICk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSBncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1uc1tjb2x1bW5JZF07XG4gICAgaWYgKGMpIHtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgYy5waW4gPSBzdGF0ZSA/IHR5cGUgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5RW5kID0gc3RhdGU7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5ID0gc3RhdGU7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreUVuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoY2hhbmdlZCkge1xuICAgIGdyaWQuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtzdGlja3lDb2x1bW5TdGFydF0sIHBibC1uZ3JpZFtzdGlja3lDb2x1bW5FbmRdLCBwYmwtbmdyaWRbc3RpY2t5SGVhZGVyXSwgcGJsLW5ncmlkW3N0aWNreUZvb3Rlcl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU2V0IHRoZSBoZWFkZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgZ3JpZGAgLSBMaXRlcmFsIHN0cmluZyBgZ3JpZGAgdGhhdCB3aWxsIHNldCB0aGUgZ3JpZCdzIG1haW4gaGVhZGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWhlYWRlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBoZWFkZXIvaGVhZGVyR3JvdXAgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Q29sdW1uU3RhcnQodmFsdWU6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX3N0YXJ0RGlmZmVyKSB7XG4gICAgICB0aGlzLl9zdGFydERpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdzdGFydCcsIHZhbHVlLCB0aGlzLl9zdGFydERpZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmb290ZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgZ3JpZGAgLSBMaXRlcmFsIHN0cmluZyBgZ3JpZGAgdGhhdCB3aWxsIHNldCB0aGUgZ3JpZCdzIG1haW4gZm9vdGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWZvb3RlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBmb290ZXIgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Q29sdW1uRW5kKHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9lbmREaWZmZXIpIHtcbiAgICAgIHRoaXMuX2VuZERpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdlbmQnLCB2YWx1ZSwgdGhpcy5fZW5kRGlmZmVyKTtcbiAgfVxuXG4gICAgLyoqXG4gICAqIFNldCB0aGUgaGVhZGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYGdyaWRgIC0gTGl0ZXJhbCBzdHJpbmcgYGdyaWRgIHRoYXQgd2lsbCBzZXQgdGhlIGdyaWQncyBtYWluIGhlYWRlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1oZWFkZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgaGVhZGVyL2hlYWRlckdyb3VwIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUhlYWRlcih2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2hlYWRlckRpZmZlcikge1xuICAgICAgdGhpcy5faGVhZGVyRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVJvd0RpZmYoJ2hlYWRlcicsIHZhbHVlLCB0aGlzLl9oZWFkZXJEaWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZm9vdGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYGdyaWRgIC0gTGl0ZXJhbCBzdHJpbmcgYGdyaWRgIHRoYXQgd2lsbCBzZXQgdGhlIGdyaWQncyBtYWluIGZvb3RlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1mb290ZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgZm9vdGVyIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUZvb3Rlcih2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2Zvb3RlckRpZmZlcikge1xuICAgICAgdGhpcy5fZm9vdGVyRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVJvd0RpZmYoJ2Zvb3RlcicsIHZhbHVlLCB0aGlzLl9mb290ZXJEaWZmZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnREaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2VuZERpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyRGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyRGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPjtcblxuICBwcml2YXRlIF9jb2x1bW5DYWNoZTogeyBzdGFydDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjsgZW5kOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+OyB9ID0geyBzdGFydDogW10sIGVuZDogW10gfTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgIHByb3RlY3RlZCByZWFkb25seSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25SZXNpemVSb3cnKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lIZWFkZXJSb3dTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAucGlwZShmaWx0ZXIgKCBlID0+IGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnICkpXG4gICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhcnREaWZmZXIgJiYgdGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnREaWZmZXIuZGlmZihbXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignc3RhcnQnLCB0aGlzLl9jb2x1bW5DYWNoZS5zdGFydCwgdGhpcy5fc3RhcnREaWZmZXIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX2VuZERpZmZlciAmJiB0aGlzLmdyaWQuaXNJbml0KSB7XG4gICAgICAgICAgICB0aGlzLl9lbmREaWZmZXIuZGlmZihbXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignZW5kJywgdGhpcy5fY29sdW1uQ2FjaGUuZW5kLCB0aGlzLl9lbmREaWZmZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5Q29sdW1uRGlmZih0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+LCBkaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ3JpZC5pc0luaXQpIHtcbiAgICAgIGNvbnN0IHVuc3ViID0gdGhpcy5wbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgdW5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZih0eXBlLCB2YWx1ZSwgZGlmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY29sdW1uQ2FjaGVbdHlwZV0gPSB2YWx1ZSB8fCBbXTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBkaWZmZXIuZGlmZih2YWx1ZSB8fCBbXSk7XG4gICAgY29uc3QgYnVsazogQXJyYXk8W3N0cmluZyB8IG51bWJlciwgYm9vbGVhbl0+ID0gW107XG4gICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPHN0cmluZyB8IG51bWJlcj4sIHByZXZJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgdHJ1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChidWxrLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFN0aWNreUNvbHVtbnModGhpcy5ncmlkLCB0eXBlLCBidWxrKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlSb3dEaWZmKHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIHZhbHVlOiBBcnJheTwndGFibGUnIHwgbnVtYmVyPiwgZGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPik6IHZvaWQge1xuICAgIGlmICghdGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgY29uc3QgdW5zdWIgPSB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICB1bnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuYXBwbHlSb3dEaWZmKHR5cGUsIHZhbHVlLCBkaWZmZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gZGlmZmVyLmRpZmYodmFsdWUgfHwgW10pO1xuICAgIGNvbnN0IGJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8J3RhYmxlJyB8IG51bWJlcj4sIHByZXZJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgdHJ1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChidWxrLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFN0aWNreVJvdyh0aGlzLmdyaWQsIHR5cGUsIGJ1bGspO1xuICAgIH1cbiAgfVxufVxuIl19