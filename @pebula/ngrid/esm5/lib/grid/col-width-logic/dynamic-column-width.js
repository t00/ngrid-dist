/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/col-width-logic/dynamic-column-width.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
/**
 * @record
 */
export function BoxModelSpaceStrategy() { }
if (false) {
    /**
     * @param {?} col
     * @return {?}
     */
    BoxModelSpaceStrategy.prototype.cell = function (col) { };
    /**
     * @param {?} col
     * @return {?}
     */
    BoxModelSpaceStrategy.prototype.groupCell = function (col) { };
    /**
     * @param {?} cols
     * @return {?}
     */
    BoxModelSpaceStrategy.prototype.group = function (cols) { };
}
/**
 * A column width calculator that calculates column width for a specific column or a group of columns.
 * It also provide the minimum required row width for the total columns added up to that point.
 *
 * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
 * It performs the calculation based on `PblColumn` and actual DOM size metadata.
 *
 * The `DynamicColumnWidthLogic` has 3 responsibilities:
 *
 * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
 * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
 *
 * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
 *
 * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
 *
 * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
 */
var /**
 * A column width calculator that calculates column width for a specific column or a group of columns.
 * It also provide the minimum required row width for the total columns added up to that point.
 *
 * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
 * It performs the calculation based on `PblColumn` and actual DOM size metadata.
 *
 * The `DynamicColumnWidthLogic` has 3 responsibilities:
 *
 * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
 * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
 *
 * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
 *
 * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
 *
 * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
 */
DynamicColumnWidthLogic = /** @class */ (function () {
    function DynamicColumnWidthLogic(strategy) {
        this.strategy = strategy;
        this.cols = new Map();
        this._minimumRowWidth = 0;
    }
    Object.defineProperty(DynamicColumnWidthLogic.prototype, "minimumRowWidth", {
        get: /**
         * @return {?}
         */
        function () { return this._minimumRowWidth; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
     */
    /**
     * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
     * @param {?} columnInfo
     * @return {?}
     */
    DynamicColumnWidthLogic.prototype.widthBreakout = /**
     * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
     * @param {?} columnInfo
     * @return {?}
     */
    function (columnInfo) {
        return widthBreakout(this.strategy, columnInfo);
    };
    /**
     * Add a column to the calculation.
     *
     * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
     * If the max width lock has changed the `maxWidthLockChanged` is set to true.
     *
     * A column that was previously added is ignored.
     *
     * Note that once `maxWidthLockChanged` is set to true it will never change.
     */
    /**
     * Add a column to the calculation.
     *
     * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
     * If the max width lock has changed the `maxWidthLockChanged` is set to true.
     *
     * A column that was previously added is ignored.
     *
     * Note that once `maxWidthLockChanged` is set to true it will never change.
     * @param {?} columnInfo
     * @return {?}
     */
    DynamicColumnWidthLogic.prototype.addColumn = /**
     * Add a column to the calculation.
     *
     * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
     * If the max width lock has changed the `maxWidthLockChanged` is set to true.
     *
     * A column that was previously added is ignored.
     *
     * Note that once `maxWidthLockChanged` is set to true it will never change.
     * @param {?} columnInfo
     * @return {?}
     */
    function (columnInfo) {
        if (!this.cols.has(columnInfo)) {
            var column = columnInfo.column;
            /** @type {?} */
            var minWidth = column.minWidth || 0;
            if (column.isFixedWidth) {
                minWidth = Math.max(column.parsedWidth.value, minWidth);
            }
            /** @type {?} */
            var nonContent = this.strategy.cell(columnInfo);
            /** @type {?} */
            var width = minWidth + nonContent;
            this.cols.set(columnInfo, width);
            this._minimumRowWidth += width;
            if (column.maxWidth) {
                /** @type {?} */
                var actualWidth = columnInfo.width - nonContent;
                if (column.checkMaxWidthLock(actualWidth)) {
                    this.maxWidthLockChanged = true;
                }
            }
        }
    };
    /**
     * Run each of the columns through `addColumn` and returns the sum of the width all columns using
     * the box model space strategy.
     *
     * The result represents the absolute width to be used in a `PblColumnGroup`.
     *
     * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
     * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
     */
    /**
     * Run each of the columns through `addColumn` and returns the sum of the width all columns using
     * the box model space strategy.
     *
     * The result represents the absolute width to be used in a `PblColumnGroup`.
     *
     * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
     * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
     * @param {?} columnInfos
     * @return {?}
     */
    DynamicColumnWidthLogic.prototype.addGroup = /**
     * Run each of the columns through `addColumn` and returns the sum of the width all columns using
     * the box model space strategy.
     *
     * The result represents the absolute width to be used in a `PblColumnGroup`.
     *
     * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
     * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
     * @param {?} columnInfos
     * @return {?}
     */
    function (columnInfos) {
        var e_1, _a;
        /** @type {?} */
        var sum = 0;
        try {
            for (var columnInfos_1 = __values(columnInfos), columnInfos_1_1 = columnInfos_1.next(); !columnInfos_1_1.done; columnInfos_1_1 = columnInfos_1.next()) {
                var c = columnInfos_1_1.value;
                this.addColumn(c);
                sum += c.width;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (columnInfos_1_1 && !columnInfos_1_1.done && (_a = columnInfos_1.return)) _a.call(columnInfos_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        sum -= this.strategy.group(columnInfos);
        return sum;
    };
    return DynamicColumnWidthLogic;
}());
/**
 * A column width calculator that calculates column width for a specific column or a group of columns.
 * It also provide the minimum required row width for the total columns added up to that point.
 *
 * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
 * It performs the calculation based on `PblColumn` and actual DOM size metadata.
 *
 * The `DynamicColumnWidthLogic` has 3 responsibilities:
 *
 * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
 * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
 *
 * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
 *
 * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
 *
 * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
 */
export { DynamicColumnWidthLogic };
if (false) {
    /**
     * When true, it indicates that one (or more) columns has changed the max width lock state.
     * \@readonly
     * @type {?}
     */
    DynamicColumnWidthLogic.prototype.maxWidthLockChanged;
    /**
     * @type {?}
     * @private
     */
    DynamicColumnWidthLogic.prototype.cols;
    /**
     * @type {?}
     * @private
     */
    DynamicColumnWidthLogic.prototype._minimumRowWidth;
    /** @type {?} */
    DynamicColumnWidthLogic.prototype.strategy;
    /* Skipping unhandled member: ;*/
}
/**
 * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
 * @param {?} strategy
 * @param {?} columnInfo
 * @return {?}
 */
export function widthBreakout(strategy, columnInfo) {
    /** @type {?} */
    var nonContent = strategy.cell(columnInfo);
    return {
        content: columnInfo.width - nonContent,
        nonContent: nonContent,
    };
}
/** @type {?} */
export var DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY = {
    cell: /**
     * @param {?} col
     * @return {?}
     */
    function (col) {
        /** @type {?} */
        var style = col.style;
        return parseInt(style.paddingLeft) + parseInt(style.paddingRight);
    },
    groupCell: /**
     * @param {?} col
     * @return {?}
     */
    function (col) {
        return 0;
    },
    group: /**
     * @param {?} cols
     * @return {?}
     */
    function (cols) {
        /** @type {?} */
        var len = cols.length;
        return len > 0 ? parseInt(cols[0].style.paddingLeft) + parseInt(cols[len - 1].style.paddingRight) : 0;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb2x1bW4td2lkdGguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sLXdpZHRoLWxvZ2ljL2R5bmFtaWMtY29sdW1uLXdpZHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLDJDQUlDOzs7Ozs7SUFIQywwREFBcUM7Ozs7O0lBQ3JDLCtEQUEwQzs7Ozs7SUFDMUMsNERBQXlDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZRSxpQ0FBNEIsUUFBK0I7UUFBL0IsYUFBUSxHQUFSLFFBQVEsQ0FBdUI7UUFIMUMsU0FBSSxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO1FBQ3JELHFCQUFnQixHQUFHLENBQUMsQ0FBQztJQUVrQyxDQUFDO0lBTGhFLHNCQUFJLG9EQUFlOzs7O1FBQW5CLGNBQWdDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBT2hFOztPQUVHOzs7Ozs7SUFDSCwrQ0FBYTs7Ozs7SUFBYixVQUFjLFVBQTZCO1FBQ3pDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRzs7Ozs7Ozs7Ozs7OztJQUNILDJDQUFTOzs7Ozs7Ozs7Ozs7SUFBVCxVQUFVLFVBQTZCO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0QixJQUFBLDBCQUFNOztnQkFDVixRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDO1lBQ25DLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtnQkFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDekQ7O2dCQUNLLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7O2dCQUMzQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFVBQVU7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxLQUFLLENBQUM7WUFFL0IsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFOztvQkFDYixXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVO2dCQUNqRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDekMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztpQkFDakM7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVEOzs7Ozs7OztPQVFHOzs7Ozs7Ozs7Ozs7SUFDSCwwQ0FBUTs7Ozs7Ozs7Ozs7SUFBUixVQUFTLFdBQWdDOzs7WUFDbkMsR0FBRyxHQUFHLENBQUM7O1lBQ1gsS0FBZ0IsSUFBQSxnQkFBQSxTQUFBLFdBQVcsQ0FBQSx3Q0FBQSxpRUFBRTtnQkFBeEIsSUFBTSxDQUFDLHdCQUFBO2dCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2hCOzs7Ozs7Ozs7UUFDRixHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEMsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBRUgsOEJBQUM7QUFBRCxDQUFDLEFBdkVELElBdUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWxFQyxzREFBNkI7Ozs7O0lBSTdCLHVDQUE2RDs7Ozs7SUFDN0QsbURBQTZCOztJQUVqQiwyQ0FBK0M7Ozs7Ozs7OztBQWdFN0QsTUFBTSxVQUFVLGFBQWEsQ0FBQyxRQUErQixFQUFFLFVBQTZCOztRQUNyRixVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDNUMsT0FBTztRQUNMLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVU7UUFDdEMsVUFBVSxZQUFBO0tBQ1gsQ0FBQztBQUNILENBQUM7O0FBRUQsTUFBTSxLQUFPLHdDQUF3QyxHQUEwQjtJQUM3RSxJQUFJOzs7O0lBQUosVUFBSyxHQUFzQjs7WUFDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25FLENBQUM7SUFDRCxTQUFTOzs7O0lBQVQsVUFBVSxHQUFzQjtRQUM5QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDRCxLQUFLOzs7O0lBQUwsVUFBTSxJQUF5Qjs7WUFDdkIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQ3ZCLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEcsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQm94TW9kZWxTcGFjZVN0cmF0ZWd5IHtcbiAgY2VsbChjb2w6IFBibENvbHVtblNpemVJbmZvKTogbnVtYmVyO1xuICBncm91cENlbGwoY29sOiBQYmxDb2x1bW5TaXplSW5mbyk6IG51bWJlcjtcbiAgZ3JvdXAoY29sczogUGJsQ29sdW1uU2l6ZUluZm9bXSk6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIGNvbHVtbiB3aWR0aCBjYWxjdWxhdG9yIHRoYXQgY2FsY3VsYXRlcyBjb2x1bW4gd2lkdGggZm9yIGEgc3BlY2lmaWMgY29sdW1uIG9yIGEgZ3JvdXAgb2YgY29sdW1ucy5cbiAqIEl0IGFsc28gcHJvdmlkZSB0aGUgbWluaW11bSByZXF1aXJlZCByb3cgd2lkdGggZm9yIHRoZSB0b3RhbCBjb2x1bW5zIGFkZGVkIHVwIHRvIHRoYXQgcG9pbnQuXG4gKlxuICogVGhlIGBEeW5hbWljQ29sdW1uV2lkdGhMb2dpY2AgdGFrZXMgaW50byBhY2NvdW50IHJlYWwtdGltZSBET00gbWVhc3VyZW1lbnRzIChlc3BlY2lhbGx5IGJveC1tb2RlbCBtZXRhZGF0YSksIGhlbmNlIFwiZHluYW1pY1wiLlxuICogSXQgcGVyZm9ybXMgdGhlIGNhbGN1bGF0aW9uIGJhc2VkIG9uIGBQYmxDb2x1bW5gIGFuZCBhY3R1YWwgRE9NIHNpemUgbWV0YWRhdGEuXG4gKlxuICogVGhlIGBEeW5hbWljQ29sdW1uV2lkdGhMb2dpY2AgaGFzIDMgcmVzcG9uc2liaWxpdGllczpcbiAqXG4gKiAtIEl0IGlzIHJlc3BvbnNpYmxlIGZvciBlbmZvcmNpbmcgdGhlIGBtYXhXaWR0aGAgYm91bmRhcnkgY29uc3RyYWludCBmb3IgZXZlcnkgY29sdW1uIGl0IHByb2Nlc3NlcyBieSBjYWxjdWxhdGluZyB0aGUgYWN0dWFsIHdpZHRoXG4gKiBvZiBhIGNvbHVtbiBhbmQgY2FsbGluZyBgUGJsQ29sdW1uLmNoZWNrTWF4V2lkdGhMb2NrYCB0byB2ZXJpZnkgaWYgbWF4IHdpZHRoIGxvY2sgaGFzIGNoYW5nZWQgZHVlIHRvIHRoZSBuZXcgYWN0dWFsIHdpZHRoLlxuICpcbiAqIC0gSXQgY2FsY3VsYXRlcyB0aGUgYWJzb2x1dGUgd2lkdGggZm9yIGEgZ3JvdXAgb2YgY29sdW1ucywgc28gYFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudEdyb3VwQ29sdW1uYCBjYW4gaGF2ZSBhbiBleGFjdCBzaXplIHRoYXQgd3JhcHMgaXQncyBjaGlsZHJlbi5cbiAqXG4gKiAtIEl0IGNhbGN1bGF0ZXMgdGhlIGBtaW5pbXVtUm93V2lkdGhgLCB3aGljaCByZXByZXNlbnRzIHRoZSBtaW5pbXVtIHdpZHRoIHJlcXVpcmVkIHdpZHRoIG9mIHRoZSByb3csIGkuZS4gdGFibGUuXG4gKlxuICogPiBOb3RlIHRoYXQgYW4gaW5zdGFuY2Ugb2YgYER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljYCByZXByZXNlbnRzIGEgb25lLXRpbWUgcGFzcyBmb3IgYWxsIGNvbHVtbnMsIGZvciBldmVyeSBydW4gYSBuZXcgaW5zdGFuY2UgaXMgcmVxdWlyZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyB7XG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIGl0IGluZGljYXRlcyB0aGF0IG9uZSAob3IgbW9yZSkgY29sdW1ucyBoYXMgY2hhbmdlZCB0aGUgbWF4IHdpZHRoIGxvY2sgc3RhdGUuXG4gICAqIEByZWFkb25seVxuICAgKi9cbiAgbWF4V2lkdGhMb2NrQ2hhbmdlZDogYm9vbGVhbjtcblxuICBnZXQgbWluaW11bVJvd1dpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW5pbXVtUm93V2lkdGg7IH07XG5cbiAgcHJpdmF0ZSByZWFkb25seSBjb2xzID0gbmV3IE1hcDxQYmxDb2x1bW5TaXplSW5mbywgbnVtYmVyPigpO1xuICBwcml2YXRlIF9taW5pbXVtUm93V2lkdGggPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzdHJhdGVneTogQm94TW9kZWxTcGFjZVN0cmF0ZWd5KSB7IH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGJyZWFrb3V0IG9mIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uLCBicmVha2luZyBpdCBpbnRvIHRoZSB3aWR0aCBvZiB0aGUgY29udGVudCBhbmQgdGhlIHJlc3Qgb2YgdGhlIHdpZHRoXG4gICAqL1xuICB3aWR0aEJyZWFrb3V0KGNvbHVtbkluZm86IFBibENvbHVtblNpemVJbmZvKTogeyBjb250ZW50OiBudW1iZXIsIG5vbkNvbnRlbnQ6IG51bWJlciB9IHtcbiAgICByZXR1cm4gd2lkdGhCcmVha291dCh0aGlzLnN0cmF0ZWd5LCBjb2x1bW5JbmZvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBjb2x1bW4gdG8gdGhlIGNhbGN1bGF0aW9uLlxuICAgKlxuICAgKiBUaGUgb3BlcmF0aW9uIHdpbGwgdXBkYXRlIHRoZSBtaW5pbXVtIHJlcXVpcmVkIHdpZHRoIGFuZCB0cmlnZ2VyIGEgYGNoZWNrTWF4V2lkdGhMb2NrYCBvbiB0aGUgY29sdW1uLlxuICAgKiBJZiB0aGUgbWF4IHdpZHRoIGxvY2sgaGFzIGNoYW5nZWQgdGhlIGBtYXhXaWR0aExvY2tDaGFuZ2VkYCBpcyBzZXQgdG8gdHJ1ZS5cbiAgICpcbiAgICogQSBjb2x1bW4gdGhhdCB3YXMgcHJldmlvdXNseSBhZGRlZCBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgb25jZSBgbWF4V2lkdGhMb2NrQ2hhbmdlZGAgaXMgc2V0IHRvIHRydWUgaXQgd2lsbCBuZXZlciBjaGFuZ2UuXG4gICAqL1xuICBhZGRDb2x1bW4oY29sdW1uSW5mbzogUGJsQ29sdW1uU2l6ZUluZm8pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY29scy5oYXMoY29sdW1uSW5mbykpIHtcbiAgICAgIGNvbnN0IHsgY29sdW1uIH0gPSBjb2x1bW5JbmZvO1xuICAgICAgbGV0IG1pbldpZHRoID0gY29sdW1uLm1pbldpZHRoIHx8IDA7XG4gICAgICBpZiAoY29sdW1uLmlzRml4ZWRXaWR0aCkge1xuICAgICAgICBtaW5XaWR0aCA9IE1hdGgubWF4KGNvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgbWluV2lkdGgpO1xuICAgICAgfVxuICAgICAgY29uc3Qgbm9uQ29udGVudCA9IHRoaXMuc3RyYXRlZ3kuY2VsbChjb2x1bW5JbmZvKTtcbiAgICAgIGNvbnN0IHdpZHRoID0gbWluV2lkdGggKyBub25Db250ZW50O1xuICAgICAgdGhpcy5jb2xzLnNldChjb2x1bW5JbmZvLCB3aWR0aCk7XG4gICAgICB0aGlzLl9taW5pbXVtUm93V2lkdGggKz0gd2lkdGg7XG5cbiAgICAgIGlmIChjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgICAgY29uc3QgYWN0dWFsV2lkdGggPSBjb2x1bW5JbmZvLndpZHRoIC0gbm9uQ29udGVudDtcbiAgICAgICAgaWYgKGNvbHVtbi5jaGVja01heFdpZHRoTG9jayhhY3R1YWxXaWR0aCkpIHtcbiAgICAgICAgICB0aGlzLm1heFdpZHRoTG9ja0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJ1biBlYWNoIG9mIHRoZSBjb2x1bW5zIHRocm91Z2ggYGFkZENvbHVtbmAgYW5kIHJldHVybnMgdGhlIHN1bSBvZiB0aGUgd2lkdGggYWxsIGNvbHVtbnMgdXNpbmdcbiAgICogdGhlIGJveCBtb2RlbCBzcGFjZSBzdHJhdGVneS5cbiAgICpcbiAgICogVGhlIHJlc3VsdCByZXByZXNlbnRzIHRoZSBhYnNvbHV0ZSB3aWR0aCB0byBiZSB1c2VkIGluIGEgYFBibENvbHVtbkdyb3VwYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiBhIHRhYmxlIGhhcyBtdWx0aXBsZSBjb2x1bW4tZ3JvdXAgcm93cyBlYWNoIGNvbHVtbiBpcyB0aGUgY2hpbGQgb2YgbXVsdGlwbGUgZ3JvdXAgY29sdW1uLCBoZW5jZSBjYWxsaW5nIGBhZGRDb2x1bW5gIHdpdGggdGhlXG4gICAqIHNhbWUgZ3JvdXAgbW9yZSB0aGVuIG9uY2UuIEhvd2V2ZXIsIHNpbmNlIGBhZGRDb2x1bW4oKWAgaWdub3JlcyBjb2x1bW5zIGl0IGFscmVhZHkgcHJvY2Vzc2VkIGl0IGlzIHNhZmUuXG4gICAqL1xuICBhZGRHcm91cChjb2x1bW5JbmZvczogUGJsQ29sdW1uU2l6ZUluZm9bXSk6IG51bWJlciB7XG4gICAgbGV0IHN1bSA9IDA7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbkluZm9zKSB7XG4gICAgICB0aGlzLmFkZENvbHVtbihjKTtcbiAgICAgIHN1bSArPSBjLndpZHRoO1xuICAgIH1cbiAgIHN1bSAtPSB0aGlzLnN0cmF0ZWd5Lmdyb3VwKGNvbHVtbkluZm9zKTtcbiAgIHJldHVybiBzdW07XG4gIH1cblxufVxuXG4vKipcbiogUmV0dXJucyBhIGJyZWFrb3V0IG9mIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uLCBicmVha2luZyBpdCBpbnRvIHRoZSB3aWR0aCBvZiB0aGUgY29udGVudCBhbmQgdGhlIHJlc3Qgb2YgdGhlIHdpZHRoXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHdpZHRoQnJlYWtvdXQoc3RyYXRlZ3k6IEJveE1vZGVsU3BhY2VTdHJhdGVneSwgY29sdW1uSW5mbzogUGJsQ29sdW1uU2l6ZUluZm8pOiB7IGNvbnRlbnQ6IG51bWJlciwgbm9uQ29udGVudDogbnVtYmVyIH0ge1xuIGNvbnN0IG5vbkNvbnRlbnQgPSBzdHJhdGVneS5jZWxsKGNvbHVtbkluZm8pO1xuIHJldHVybiB7XG4gICBjb250ZW50OiBjb2x1bW5JbmZvLndpZHRoIC0gbm9uQ29udGVudCxcbiAgIG5vbkNvbnRlbnQsXG4gfTtcbn1cblxuZXhwb3J0IGNvbnN0IERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1k6IEJveE1vZGVsU3BhY2VTdHJhdGVneSA9IHtcbiAgY2VsbChjb2w6IFBibENvbHVtblNpemVJbmZvKTogbnVtYmVyIHtcbiAgICBjb25zdCBzdHlsZSA9IGNvbC5zdHlsZTtcbiAgICByZXR1cm4gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VJbnQoc3R5bGUucGFkZGluZ1JpZ2h0KVxuICB9LFxuICBncm91cENlbGwoY29sOiBQYmxDb2x1bW5TaXplSW5mbyk6IG51bWJlciB7XG4gICAgcmV0dXJuIDA7XG4gIH0sXG4gIGdyb3VwKGNvbHM6IFBibENvbHVtblNpemVJbmZvW10pOiBudW1iZXIge1xuICAgIGNvbnN0IGxlbiA9IGNvbHMubGVuZ3RoO1xuICAgIHJldHVybiBsZW4gPiAwID8gcGFyc2VJbnQoY29sc1swXS5zdHlsZS5wYWRkaW5nTGVmdCkgKyBwYXJzZUludChjb2xzW2xlbiAtIDFdLnN0eWxlLnBhZGRpbmdSaWdodCkgOiAwO1xuICB9XG59O1xuIl19