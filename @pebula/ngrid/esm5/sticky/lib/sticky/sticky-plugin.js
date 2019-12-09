/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Input, IterableDiffers, IterableDiffer, IterableChangeRecord, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
/** @type {?} */
export var PLUGIN_KEY = 'sticky';
/**
 * @param {?} table
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyRow(table, type, valueOrBulk, state) {
    var e_1, _a;
    /** @type {?} */
    var isHeader = type === 'header';
    /** @type {?} */
    var queryList = isHeader ? table._headerRowDefs : table._footerRowDefs;
    /** @type {?} */
    var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    var addOneIfMainExists = (isHeader && table.showHeader) || (!isHeader && table.showFooter) ? 1 : 0;
    /** @type {?} */
    var changed;
    try {
        for (var bulk_1 = tslib_1.__values(bulk), bulk_1_1 = bulk_1.next(); !bulk_1_1.done; bulk_1_1 = bulk_1.next()) {
            var _b = tslib_1.__read(bulk_1_1.value, 2), value = _b[0], state_1 = _b[1];
            // the index from the user is 0 based or the table header/footer row.
            // we store them both, so we need to convert... our first is always the table header/footer and then we have the same order as the user's.
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
            table._cdkTable.updateStickyHeaderRowStyles();
        }
        else {
            table._cdkTable.updateStickyFooterRowStyles();
        }
    }
}
/**
 * @param {?} table
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyColumns(table, type, valueOrBulk, state) {
    var e_2, _a;
    /** @type {?} */
    var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    var changed;
    var _loop_1 = function (columnId, state_2) {
        if (typeof columnId === 'string') {
            columnId = table.columnApi.visibleColumns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.orgProp === columnId; }));
        }
        /** @type {?} */
        var c = table.columnApi.visibleColumns[columnId];
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
        table._cdkTable.updateStickyColumnStyles();
    }
}
var PblNgridStickyPluginDirective = /** @class */ (function () {
    function PblNgridStickyPluginDirective(table, _differs, pluginCtrl) {
        var _this = this;
        this.table = table;
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
            _this.table._cdkTable.updateStickyHeaderRowStyles();
            _this.table._cdkTable.updateStickyColumnStyles();
            _this.table._cdkTable.updateStickyFooterRowStyles();
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
            if (_this._startDiffer && _this.table.isInit) {
                _this._startDiffer.diff([]);
                _this.applyColumnDiff('start', _this._columnCache.start, _this._startDiffer);
            }
            if (_this._endDiffer && _this.table.isInit) {
                _this._endDiffer.diff([]);
                _this.applyColumnDiff('end', _this._columnCache.end, _this._endDiffer);
            }
        }));
    }
    Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnStart", {
        /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main header row.
         *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main header row.
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
         *   - `table` - Literal string `table` that will set the table's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main footer row.
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
       *   - `table` - Literal string `table` that will set the table's main header row.
       *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
       *
       * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
       * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
       */
        set: /**
         * Set the header rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main header row.
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
         *   - `table` - Literal string `table` that will set the table's main footer row.
         *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
         *
         * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
         * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
         */
        set: /**
         * Set the footer rows you want to apply sticky positioning to.
         * Valid values are:
         *   - `table` - Literal string `table` that will set the table's main footer row.
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
        this._removePlugin(this.table);
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
        if (!this.table.isInit) {
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
            setStickyColumns(this.table, type, bulk);
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
        if (!this.table.isInit) {
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
            setStickyRow(this.table, type, bulk);
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
        TablePlugin({ id: PLUGIN_KEY }),
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
    PblNgridStickyPluginDirective.prototype.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS9zdGlja3ktcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBU3pGLE1BQU0sS0FBTyxVQUFVLEdBQWEsUUFBUTs7Ozs7Ozs7QUFJNUMsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUE2QixFQUFFLElBQXlCLEVBQUUsV0FBa0UsRUFBRSxLQUFlOzs7UUFDbEssUUFBUSxHQUFHLElBQUksS0FBSyxRQUFROztRQUM1QixTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYzs7UUFDbEUsSUFBSSxHQUF1QyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUU7O1FBRTlHLGtCQUFrQixHQUFHLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUVoRyxPQUFnQjs7UUFDcEIsS0FBNkIsSUFBQSxTQUFBLGlCQUFBLElBQUksQ0FBQSwwQkFBQSw0Q0FBRTtZQUF4QixJQUFB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Ozs7OztJQUM1QyxtREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBJdGVyYWJsZURpZmZlcnMsIEl0ZXJhYmxlRGlmZmVyLCBJdGVyYWJsZUNoYW5nZVJlY29yZCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHN0aWNreT86IFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnc3RpY2t5JyA9ICdzdGlja3knO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Um93KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+KTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3codGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIHZhbHVlOiAndGFibGUnIHwgbnVtYmVyLCBzdGF0ZTogYm9vbGVhbik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Um93KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCB2YWx1ZU9yQnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPiB8ICd0YWJsZScgfCBudW1iZXIsIHN0YXRlPzogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBpc0hlYWRlciA9IHR5cGUgPT09ICdoZWFkZXInO1xuICBjb25zdCBxdWVyeUxpc3QgPSBpc0hlYWRlciA/IHRhYmxlLl9oZWFkZXJSb3dEZWZzIDogdGFibGUuX2Zvb3RlclJvd0RlZnM7XG4gIGNvbnN0IGJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gPSBBcnJheS5pc0FycmF5KHZhbHVlT3JCdWxrKSA/IHZhbHVlT3JCdWxrIDogWyBbdmFsdWVPckJ1bGssIHN0YXRlXSBdO1xuXG4gIGNvbnN0IGFkZE9uZUlmTWFpbkV4aXN0cyA9IChpc0hlYWRlciAmJiB0YWJsZS5zaG93SGVhZGVyKSB8fCAoIWlzSGVhZGVyICYmIHRhYmxlLnNob3dGb290ZXIpID8gMSA6IDA7XG5cbiAgbGV0IGNoYW5nZWQ6IGJvb2xlYW47XG4gIGZvciAoY29uc3QgW3ZhbHVlLCBzdGF0ZV0gb2YgYnVsaykge1xuICAgIC8vIHRoZSBpbmRleCBmcm9tIHRoZSB1c2VyIGlzIDAgYmFzZWQgb3IgdGhlIHRhYmxlIGhlYWRlci9mb290ZXIgcm93LlxuICAgIC8vIHdlIHN0b3JlIHRoZW0gYm90aCwgc28gd2UgbmVlZCB0byBjb252ZXJ0Li4uIG91ciBmaXJzdCBpcyBhbHdheXMgdGhlIHRhYmxlIGhlYWRlci9mb290ZXIgYW5kIHRoZW4gd2UgaGF2ZSB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXNlcidzLlxuICAgIGxldCBpZHggPSB2YWx1ZSA9PT0gJ3RhYmxlJyA/IDAgOiB2YWx1ZSArIGFkZE9uZUlmTWFpbkV4aXN0cztcbiAgICBpZiAoIWlzSGVhZGVyKSB7XG4gICAgICAvLyBzdGlja3ktc3R5bGVyIHN0aWNrUm93cygpIG1ldGhvZHMgd2lsbCByZXZlcnNlIHRoZSBvcmRlciBvZiBmb290ZXIgY29sdW1uc1xuICAgICAgLy8gc28gd2UgYWN0dWFsbHkgbmVlZCB0byBzZXQgYW5vdGhlciByb3cgdG8gbWFrZSB0aGUgcm93IHdlIHdhbnQgc3RpY2t5LlxuICAgICAgLy8gd2UgY291bGQgcmV2ZXJzZSB0aGUgY29sbGVjdGlvbiwgYnV0IGNob29zaW5nIHRoZSBvcHBvc2l0ZSBzaWRlIGlzIGJldHRlci5cbiAgICAgIC8vIHRoaW5rIFswLCAxLCAyLCAzLCA0XSBhbmQgd2Ugd2FudCAxLiBzdGlja3ktc3R5bGVyIHdpbGwgcmV2ZXJzZSB0byBbNCwgMywgMiwgMSwgMF0gc28gZG9pbmcgbm90aGluZyB3aWxsIHN0aWNrIDMuXG4gICAgICAvLyB0aGUgb3Bwb3NpdGUgaXMgbGVuZ3RoIE1JTlVTIDEgTUlOVVMgaW5kZXggd2hpY2ggaXMgNSAtIDEgLSAxIHdoaWNoIGlzIDMsIGluIHRoZSByZXZlcmVkIGFycmF5IGl0cyB0aGUgcm93IDEgd2hpY2ggaXMgd2hhdCB3ZSB3YW50ZWQuXG4gICAgICBpZHggPSAocXVlcnlMaXN0Lmxlbmd0aCAtIDEpIC0gaWR4O1xuICAgIH1cblxuICAgIGNvbnN0IHJvd0RlZiA9IHF1ZXJ5TGlzdC50b0FycmF5KClbaWR4XTtcbiAgICBpZiAocm93RGVmICYmIHJvd0RlZi5zdGlja3kgIT09IHN0YXRlKSB7XG4gICAgICByb3dEZWYuc3RpY2t5ID0gc3RhdGU7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2hhbmdlZCkge1xuICAgIGlmIChpc0hlYWRlcikge1xuICAgICAgdGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUhlYWRlclJvd1N0eWxlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5Rm9vdGVyUm93U3R5bGVzKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lDb2x1bW5zKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIGJ1bGs6IEFycmF5PFtzdHJpbmcgfCBudW1iZXIsIGJvb2xlYW5dPik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Q29sdW1ucyh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZTogc3RyaW5nICB8IG51bWJlciwgc3RhdGU6IGJvb2xlYW4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnModGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdzdGFydCcgfCAnZW5kJywgdmFsdWVPckJ1bGs6IEFycmF5PFtzdHJpbmcgIHwgbnVtYmVyLCBib29sZWFuXT4gfCBzdHJpbmcgIHwgbnVtYmVyLCBzdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgY29uc3QgYnVsazogQXJyYXk8W3N0cmluZyB8IG51bWJlciwgYm9vbGVhbl0+ID0gQXJyYXkuaXNBcnJheSh2YWx1ZU9yQnVsaykgPyB2YWx1ZU9yQnVsayA6IFsgW3ZhbHVlT3JCdWxrLCBzdGF0ZV0gXTtcbiAgbGV0IGNoYW5nZWQ6IGJvb2xlYW47XG4gIGZvciAobGV0IFtjb2x1bW5JZCwgc3RhdGVdIG9mIGJ1bGspIHtcbiAgICBpZiAodHlwZW9mIGNvbHVtbklkID09PSAnc3RyaW5nJykge1xuICAgICAgY29sdW1uSWQgPSB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMuZmluZEluZGV4KCBjID0+IGMub3JnUHJvcCA9PT0gY29sdW1uSWQgKTtcbiAgICB9XG4gICAgY29uc3QgYyA9IHRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1uc1tjb2x1bW5JZF07XG4gICAgaWYgKGMpIHtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgYy5waW4gPSBzdGF0ZSA/IHR5cGUgOiB1bmRlZmluZWQ7XG4gICAgICBpZiAodHlwZSA9PT0gJ2VuZCcpIHtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5RW5kID0gc3RhdGU7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5ID0gc3RhdGU7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreUVuZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoY2hhbmdlZCkge1xuICAgIHRhYmxlLl9jZGtUYWJsZS51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgfVxufVxuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW3N0aWNreUNvbHVtblN0YXJ0XSwgcGJsLW5ncmlkW3N0aWNreUNvbHVtbkVuZF0sIHBibC1uZ3JpZFtzdGlja3lIZWFkZXJdLCBwYmwtbmdyaWRbc3RpY2t5Rm9vdGVyXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGhlYWRlciByb3dzIHlvdSB3YW50IHRvIGFwcGx5IHN0aWNreSBwb3NpdGlvbmluZyB0by5cbiAgICogVmFsaWQgdmFsdWVzIGFyZTpcbiAgICogICAtIGB0YWJsZWAgLSBMaXRlcmFsIHN0cmluZyBgdGFibGVgIHRoYXQgd2lsbCBzZXQgdGhlIHRhYmxlJ3MgbWFpbiBoZWFkZXIgcm93LlxuICAgKiAgIC0gbnVtYmVyICAtIFRoZSBpbmRleCBvZiB0aGUgcm93LCBmb3IgbXVsdGktaGVhZGVyIHJvdy4gVGhlIGluZGV4IHJlZmVycyB0byB0aGUgb3JkZXIgeW91IGRlZmluZWQgdGhlIGhlYWRlci9oZWFkZXJHcm91cCByb3dzIChiYXNlIDApO1xuICAgKlxuICAgKiBGb3IgcGVyZm9ybWFuY2UgY29uc2lkZXJhdGlvbnMgb25seSBuZXcgdmFsdWVzIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSAoaS5lLiB0aGUgYXJyYXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlKS5cbiAgICogTWFuaXB1bGF0aW5nIHRoZSBhcnJheSB3aWxsIG5vdCB0cmlnZ2VyIGEgY2hhbmdlICh0aGUgc3RpY2t5IHN0YXRlIHdpbGwgbm90IGNoYW5nZSkgdW5sZXNzIHNlbmRpbmcgYSBjb3B5IG9mIGl0IChyZXBsYWNpbmcgaXQsIGUuZy4gQXJyYXkuc2xpY2UoKSlcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzdGlja3lDb2x1bW5TdGFydCh2YWx1ZTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikge1xuICAgIGlmICghdGhpcy5fc3RhcnREaWZmZXIpIHtcbiAgICAgIHRoaXMuX3N0YXJ0RGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseUNvbHVtbkRpZmYoJ3N0YXJ0JywgdmFsdWUsIHRoaXMuX3N0YXJ0RGlmZmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZvb3RlciByb3dzIHlvdSB3YW50IHRvIGFwcGx5IHN0aWNreSBwb3NpdGlvbmluZyB0by5cbiAgICogVmFsaWQgdmFsdWVzIGFyZTpcbiAgICogICAtIGB0YWJsZWAgLSBMaXRlcmFsIHN0cmluZyBgdGFibGVgIHRoYXQgd2lsbCBzZXQgdGhlIHRhYmxlJ3MgbWFpbiBmb290ZXIgcm93LlxuICAgKiAgIC0gbnVtYmVyICAtIFRoZSBpbmRleCBvZiB0aGUgcm93LCBmb3IgbXVsdGktZm9vdGVyIHJvdy4gVGhlIGluZGV4IHJlZmVycyB0byB0aGUgb3JkZXIgeW91IGRlZmluZWQgdGhlIGZvb3RlciByb3dzIChiYXNlIDApO1xuICAgKlxuICAgKiBGb3IgcGVyZm9ybWFuY2UgY29uc2lkZXJhdGlvbnMgb25seSBuZXcgdmFsdWVzIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSAoaS5lLiB0aGUgYXJyYXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlKS5cbiAgICogTWFuaXB1bGF0aW5nIHRoZSBhcnJheSB3aWxsIG5vdCB0cmlnZ2VyIGEgY2hhbmdlICh0aGUgc3RpY2t5IHN0YXRlIHdpbGwgbm90IGNoYW5nZSkgdW5sZXNzIHNlbmRpbmcgYSBjb3B5IG9mIGl0IChyZXBsYWNpbmcgaXQsIGUuZy4gQXJyYXkuc2xpY2UoKSlcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzdGlja3lDb2x1bW5FbmQodmFsdWU6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2VuZERpZmZlcikge1xuICAgICAgdGhpcy5fZW5kRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseUNvbHVtbkRpZmYoJ2VuZCcsIHZhbHVlLCB0aGlzLl9lbmREaWZmZXIpO1xuICB9XG5cbiAgICAvKipcbiAgICogU2V0IHRoZSBoZWFkZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgdGFibGVgIC0gTGl0ZXJhbCBzdHJpbmcgYHRhYmxlYCB0aGF0IHdpbGwgc2V0IHRoZSB0YWJsZSdzIG1haW4gaGVhZGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWhlYWRlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBoZWFkZXIvaGVhZGVyR3JvdXAgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5SGVhZGVyKHZhbHVlOiBBcnJheTwndGFibGUnIHwgbnVtYmVyPikge1xuICAgIGlmICghdGhpcy5faGVhZGVyRGlmZmVyKSB7XG4gICAgICB0aGlzLl9oZWFkZXJEaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Um93RGlmZignaGVhZGVyJywgdmFsdWUsIHRoaXMuX2hlYWRlckRpZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmb290ZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgdGFibGVgIC0gTGl0ZXJhbCBzdHJpbmcgYHRhYmxlYCB0aGF0IHdpbGwgc2V0IHRoZSB0YWJsZSdzIG1haW4gZm9vdGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWZvb3RlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBmb290ZXIgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Rm9vdGVyKHZhbHVlOiBBcnJheTwndGFibGUnIHwgbnVtYmVyPikge1xuICAgIGlmICghdGhpcy5fZm9vdGVyRGlmZmVyKSB7XG4gICAgICB0aGlzLl9mb290ZXJEaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Um93RGlmZignZm9vdGVyJywgdmFsdWUsIHRoaXMuX2Zvb3RlckRpZmZlcik7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydERpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfZW5kRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmcgfCBudW1iZXI+O1xuICBwcml2YXRlIF9oZWFkZXJEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPCd0YWJsZScgfCBudW1iZXI+O1xuICBwcml2YXRlIF9mb290ZXJEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPCd0YWJsZScgfCBudW1iZXI+O1xuXG4gIHByaXZhdGUgX2NvbHVtbkNhY2hlOiB7IHN0YXJ0OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+OyBlbmQ6IEFycmF5PHN0cmluZyB8IG51bWJlcj47IH0gPSB7IHN0YXJ0OiBbXSwgZW5kOiBbXSB9O1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uUmVzaXplUm93JykpXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUhlYWRlclJvd1N0eWxlcygpO1xuICAgICAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5Rm9vdGVyUm93U3R5bGVzKCk7XG4gICAgICB9KTtcblxuICAgICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnBpcGUoZmlsdGVyICggZSA9PiBlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJyApKVxuICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX3N0YXJ0RGlmZmVyICYmIHRoaXMudGFibGUuaXNJbml0KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydERpZmZlci5kaWZmKFtdKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdzdGFydCcsIHRoaXMuX2NvbHVtbkNhY2hlLnN0YXJ0LCB0aGlzLl9zdGFydERpZmZlcilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5fZW5kRGlmZmVyICYmIHRoaXMudGFibGUuaXNJbml0KSB7XG4gICAgICAgICAgICB0aGlzLl9lbmREaWZmZXIuZGlmZihbXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignZW5kJywgdGhpcy5fY29sdW1uQ2FjaGUuZW5kLCB0aGlzLl9lbmREaWZmZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBseUNvbHVtbkRpZmYodHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiwgZGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmcgfCBudW1iZXI+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgY29uc3QgdW5zdWIgPSB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICB1bnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKHR5cGUsIHZhbHVlLCBkaWZmZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9jb2x1bW5DYWNoZVt0eXBlXSA9IHZhbHVlIHx8IFtdO1xuXG4gICAgY29uc3QgY2hhbmdlcyA9IGRpZmZlci5kaWZmKHZhbHVlIHx8IFtdKTtcbiAgICBjb25zdCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8c3RyaW5nIHwgbnVtYmVyPiwgcHJldkluZGV4OiBudW1iZXIsIGN1cnJlbnRJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLnByZXZpb3VzSW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCB0cnVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGJ1bGsucHVzaChbcmVjb3JkLml0ZW0sIGZhbHNlXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGJ1bGsubGVuZ3RoID4gMCkge1xuICAgICAgc2V0U3RpY2t5Q29sdW1ucyh0aGlzLnRhYmxlLCB0eXBlLCBidWxrKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlSb3dEaWZmKHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIHZhbHVlOiBBcnJheTwndGFibGUnIHwgbnVtYmVyPiwgZGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPik6IHZvaWQge1xuICAgIGlmICghdGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgIGNvbnN0IHVuc3ViID0gdGhpcy5wbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgdW5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmFwcGx5Um93RGlmZih0eXBlLCB2YWx1ZSwgZGlmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlcyA9IGRpZmZlci5kaWZmKHZhbHVlIHx8IFtdKTtcbiAgICBjb25zdCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+ID0gW107XG4gICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPCd0YWJsZScgfCBudW1iZXI+LCBwcmV2SW5kZXg6IG51bWJlciwgY3VycmVudEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChyZWNvcmQucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGJ1bGsucHVzaChbcmVjb3JkLml0ZW0sIHRydWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgZmFsc2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYnVsay5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRTdGlja3lSb3codGhpcy50YWJsZSwgdHlwZSwgYnVsayk7XG4gICAgfVxuICB9XG59XG4iXX0=