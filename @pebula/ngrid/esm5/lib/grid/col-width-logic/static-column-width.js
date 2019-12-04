/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A column width object representing the relative column using a combination of percentage and pixels.
 *
 * The percentage represent the total width of the column
 * The pixels represent the total fixed width, in pixels, that other columns occupy (these are columns with absolute width set).
 *
 * In a DOM element, the `ColumnWidth` object is represented via the `width` style property
 * and the value is set using the `calc()` CSS function: `width: calc({pct}% - {px}px);`.
 *
 * For example, the `ColumnWidth` object  `{ pct: 33, px: 25 }` is translated to `width: calc(33% - 25px);`
 *
 * \@internal
 * @record
 */
export function ColumnWidth() { }
if (false) {
    /** @type {?} */
    ColumnWidth.prototype.pct;
    /** @type {?} */
    ColumnWidth.prototype.px;
}
/**
 * A column width calculator that, based on all of the columns, calculates the default column width
 * and minimum required row width.
 *
 * The default column width is the width for all columns that does not have a width setting defined.
 * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
 *
 * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
 * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
 *
 * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
 * This is why it outputs a default column width and not a column specific width.
 */
var /**
 * A column width calculator that, based on all of the columns, calculates the default column width
 * and minimum required row width.
 *
 * The default column width is the width for all columns that does not have a width setting defined.
 * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
 *
 * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
 * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
 *
 * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
 * This is why it outputs a default column width and not a column specific width.
 */
StaticColumnWidthLogic = /** @class */ (function () {
    function StaticColumnWidthLogic() {
        this._agg = {
            pct: 0,
            // total agg fixed %
            px: 0,
            // total agg fixed px
            minRowWidth: 0,
            // total agg of min width
            pctCount: 0,
            // total columns with fixed %
            pxCount: 0,
            // total columns with fixed px
            count: 0 // total columns without a fixed value
        };
    }
    Object.defineProperty(StaticColumnWidthLogic.prototype, "minimumRowWidth", {
        get: /**
         * @return {?}
         */
        function () { return this._agg.minRowWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StaticColumnWidthLogic.prototype, "defaultColumnWidth", {
        /**
         * Returns the calculated default width for a column.
         * This is the width for columns that does not have a specific width, adjusting them to fit the table.
         * It's important to run this method AFTER aggregating all columns through `addColumn()`.
         * The result contains 2 values, pct and px.
         * pct is the total width in percent that the column should spread taking into account columns with fixed % width.
         * px is the total width in pixels that the column should shrink taking into account columns with fixed pixel width.
         *
         * The algorithm is simple:
         *  1) Sum all columns with fixed percent width
         *  2) From the entire row width (100%) deduct the total fixed width (step 1).
         *     This result represents the % left for all columns without a fixed width (percent and pixel).
         *  3) Sum all columns with fixed pixel width.
         *     The result represent the total amount of width in pixel taken by columns with fixed width.
         *  4) Count all the columns without a fixed width.
         *
         *  For 2 & 3 we get values that we need to spread even between all of the columns without fixed width (percent and pixel).
         *  The exact width is the total percent left (2) minus the total width in pixel taken by columns with fixed with.
         *  We now need to divide the result from 2 & 3 by the result from 4.
         *
         * Both values should be used together on the `width` style property using the `calc` function:
         * e.g.: `calc(${pct}% - ${px}px)`
         *
         * This value is calculated every time it is called, use it once all columns are added.
         */
        get: /**
         * Returns the calculated default width for a column.
         * This is the width for columns that does not have a specific width, adjusting them to fit the table.
         * It's important to run this method AFTER aggregating all columns through `addColumn()`.
         * The result contains 2 values, pct and px.
         * pct is the total width in percent that the column should spread taking into account columns with fixed % width.
         * px is the total width in pixels that the column should shrink taking into account columns with fixed pixel width.
         *
         * The algorithm is simple:
         *  1) Sum all columns with fixed percent width
         *  2) From the entire row width (100%) deduct the total fixed width (step 1).
         *     This result represents the % left for all columns without a fixed width (percent and pixel).
         *  3) Sum all columns with fixed pixel width.
         *     The result represent the total amount of width in pixel taken by columns with fixed width.
         *  4) Count all the columns without a fixed width.
         *
         *  For 2 & 3 we get values that we need to spread even between all of the columns without fixed width (percent and pixel).
         *  The exact width is the total percent left (2) minus the total width in pixel taken by columns with fixed with.
         *  We now need to divide the result from 2 & 3 by the result from 4.
         *
         * Both values should be used together on the `width` style property using the `calc` function:
         * e.g.: `calc(${pct}% - ${px}px)`
         *
         * This value is calculated every time it is called, use it once all columns are added.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var agg = this._agg;
            /** @type {?} */
            var pct = (100 - agg.pct) / agg.count;
            /** @type {?} */
            var px = agg.px / agg.count;
            return { pct: pct, px: px };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} column
     * @return {?}
     */
    StaticColumnWidthLogic.prototype.addColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        /** @type {?} */
        var agg = this._agg;
        /** @type {?} */
        var width = column.parsedWidth;
        /** @type {?} */
        var minWidth = column.minWidth || 0;
        if (width) {
            switch (width.type) {
                case '%':
                    agg.pctCount += 1;
                    agg.pct += width.value;
                    break;
                case 'px':
                    agg.pxCount += 1;
                    agg.px += width.value;
                    minWidth = width.value;
                    break;
                default:
                    throw new Error("Invalid width \"" + column.width + "\" in column " + column.prop + ". Valid values are ##% or ##px (50% / 50px)");
            }
        }
        else if (column.maxWidthLock) {
            agg.pxCount += 1;
            agg.px += column.maxWidth;
        }
        else {
            agg.count += 1;
        }
        agg.minRowWidth += minWidth;
    };
    return StaticColumnWidthLogic;
}());
/**
 * A column width calculator that, based on all of the columns, calculates the default column width
 * and minimum required row width.
 *
 * The default column width is the width for all columns that does not have a width setting defined.
 * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
 *
 * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
 * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
 *
 * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
 * This is why it outputs a default column width and not a column specific width.
 */
export { StaticColumnWidthLogic };
if (false) {
    /**
     * @type {?}
     * @private
     */
    StaticColumnWidthLogic.prototype._agg;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWNvbHVtbi13aWR0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2wtd2lkdGgtbG9naWMvc3RhdGljLWNvbHVtbi13aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxpQ0FHQzs7O0lBRkMsMEJBQVk7O0lBQ1oseUJBQVc7Ozs7Ozs7Ozs7Ozs7OztBQWdCYjs7Ozs7Ozs7Ozs7Ozs7SUFBQTtRQUNVLFNBQUksR0FBRztZQUNiLEdBQUcsRUFBRSxDQUFDOztZQUNOLEVBQUUsRUFBRSxDQUFDOztZQUNMLFdBQVcsRUFBRSxDQUFDOztZQUNkLFFBQVEsRUFBRSxDQUFDOztZQUNYLE9BQU8sRUFBRSxDQUFDOztZQUNWLEtBQUssRUFBRSxDQUFDLENBQVMsc0NBQXNDO1NBQ3hELENBQUE7SUFpRUgsQ0FBQztJQS9EQyxzQkFBSSxtREFBZTs7OztRQUFuQixjQUFnQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUEyQi9ELHNCQUFJLHNEQUFrQjtRQXpCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXdCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQ0g7O2dCQUNRLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSTs7Z0JBQ2YsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSzs7Z0JBQ2pDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLO1lBQzdCLE9BQU8sRUFBRSxHQUFHLEtBQUEsRUFBRSxFQUFFLElBQUEsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBOzs7OztJQUVELDBDQUFTOzs7O0lBQVQsVUFBVSxNQUFpQjs7WUFDbkIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJOztZQUNmLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVzs7WUFFNUIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQztRQUVuQyxJQUFJLEtBQUssRUFBRTtZQUNULFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDbEIsS0FBSyxHQUFHO29CQUNOLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO29CQUNsQixHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3ZCLE1BQU07Z0JBQ1IsS0FBSyxJQUFJO29CQUNQLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO29CQUNqQixHQUFHLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN2QixNQUFNO2dCQUNSO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQWtCLE1BQU0sQ0FBQyxLQUFLLHFCQUFlLE1BQU0sQ0FBQyxJQUFJLGdEQUE2QyxDQUFDLENBQUM7YUFDMUg7U0FDRjthQUFNLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUM5QixHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQztZQUNqQixHQUFHLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7U0FDM0I7YUFBTTtZQUNMLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsR0FBRyxDQUFDLFdBQVcsSUFBSSxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVILDZCQUFDO0FBQUQsQ0FBQyxBQXpFRCxJQXlFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF4RUMsc0NBT0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zJztcblxuLyoqXG4gKiBBIGNvbHVtbiB3aWR0aCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZWxhdGl2ZSBjb2x1bW4gdXNpbmcgYSBjb21iaW5hdGlvbiBvZiBwZXJjZW50YWdlIGFuZCBwaXhlbHMuXG4gKlxuICogVGhlIHBlcmNlbnRhZ2UgcmVwcmVzZW50IHRoZSB0b3RhbCB3aWR0aCBvZiB0aGUgY29sdW1uXG4gKiBUaGUgcGl4ZWxzIHJlcHJlc2VudCB0aGUgdG90YWwgZml4ZWQgd2lkdGgsIGluIHBpeGVscywgdGhhdCBvdGhlciBjb2x1bW5zIG9jY3VweSAodGhlc2UgYXJlIGNvbHVtbnMgd2l0aCBhYnNvbHV0ZSB3aWR0aCBzZXQpLlxuICpcbiAqIEluIGEgRE9NIGVsZW1lbnQsIHRoZSBgQ29sdW1uV2lkdGhgIG9iamVjdCBpcyByZXByZXNlbnRlZCB2aWEgdGhlIGB3aWR0aGAgc3R5bGUgcHJvcGVydHlcbiAqIGFuZCB0aGUgdmFsdWUgaXMgc2V0IHVzaW5nIHRoZSBgY2FsYygpYCBDU1MgZnVuY3Rpb246IGB3aWR0aDogY2FsYyh7cGN0fSUgLSB7cHh9cHgpO2AuXG4gKlxuICogRm9yIGV4YW1wbGUsIHRoZSBgQ29sdW1uV2lkdGhgIG9iamVjdCAgYHsgcGN0OiAzMywgcHg6IDI1IH1gIGlzIHRyYW5zbGF0ZWQgdG8gYHdpZHRoOiBjYWxjKDMzJSAtIDI1cHgpO2BcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBDb2x1bW5XaWR0aCB7XG4gIHBjdDogbnVtYmVyO1xuICBweDogbnVtYmVyO1xufVxuXG4vKipcbiAqIEEgY29sdW1uIHdpZHRoIGNhbGN1bGF0b3IgdGhhdCwgYmFzZWQgb24gYWxsIG9mIHRoZSBjb2x1bW5zLCBjYWxjdWxhdGVzIHRoZSBkZWZhdWx0IGNvbHVtbiB3aWR0aFxuICogYW5kIG1pbmltdW0gcmVxdWlyZWQgcm93IHdpZHRoLlxuICpcbiAqIFRoZSBkZWZhdWx0IGNvbHVtbiB3aWR0aCBpcyB0aGUgd2lkdGggZm9yIGFsbCBjb2x1bW5zIHRoYXQgZG9lcyBub3QgaGF2ZSBhIHdpZHRoIHNldHRpbmcgZGVmaW5lZC5cbiAqIEluIGFkZGl0aW9uLCBhIGBtaW5pbXVtUm93V2lkdGhgIGlzIGNhbGN1bGF0ZWQsIHdoaWNoIHJlcHJlc2VudHMgdGhlIG1pbmltdW0gd2lkdGggcmVxdWlyZWQgd2lkdGggb2YgdGhlIHJvdywgaS5lLiB0YWJsZS5cbiAqXG4gKiBUaGUgYFN0YXRpY0NvbHVtbldpZHRoTG9naWNgIGRvZXMgbm90IHRha2UgaW50byBhY2NvdW50IHJlYWwtdGltZSBET00gbWVhc3VyZW1lbnRzIChlc3BlY2lhbGx5IGJveC1tb2RlbCBtZXRhZGF0YSksIGhlbmNlIFwic3RhdGljXCIuXG4gKiBJdCBwZXJmb3JtcyB0aGUgY2FsY3VsYXRpb24gYmFzZWQgb24gXCJkcnlcIiBgUGJsQ29sdW1uYCBtZXRhZGF0YSBpbnB1dCBmcm9tIHRoZSB1c2VyLlxuICpcbiAqIFRoZSBgU3RhdGljQ29sdW1uV2lkdGhMb2dpY2AgaXMgbGVzcyBhY2N1cmF0ZSBhbmQgYmVzdCB1c2VkIGFzIGEgbWVhc3VyZW1lbnQgYmFzZWxpbmUgZm9sbG93ZWQgYnkgYSBtb3JlIGFjY3VyYXRlIGNhbGN1bGF0aW9uLlxuICogVGhpcyBpcyB3aHkgaXQgb3V0cHV0cyBhIGRlZmF1bHQgY29sdW1uIHdpZHRoIGFuZCBub3QgYSBjb2x1bW4gc3BlY2lmaWMgd2lkdGguXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljIHtcbiAgcHJpdmF0ZSBfYWdnID0ge1xuICAgIHBjdDogMCwgICAgICAgICAgLy8gdG90YWwgYWdnIGZpeGVkICVcbiAgICBweDogMCwgICAgICAgICAgIC8vIHRvdGFsIGFnZyBmaXhlZCBweFxuICAgIG1pblJvd1dpZHRoOiAwLCAgLy8gdG90YWwgYWdnIG9mIG1pbiB3aWR0aFxuICAgIHBjdENvdW50OiAwLCAgICAgLy8gdG90YWwgY29sdW1ucyB3aXRoIGZpeGVkICVcbiAgICBweENvdW50OiAwLCAgICAgIC8vIHRvdGFsIGNvbHVtbnMgd2l0aCBmaXhlZCBweFxuICAgIGNvdW50OiAwICAgICAgICAgLy8gdG90YWwgY29sdW1ucyB3aXRob3V0IGEgZml4ZWQgdmFsdWVcbiAgfVxuXG4gIGdldCBtaW5pbXVtUm93V2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2FnZy5taW5Sb3dXaWR0aDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYWxjdWxhdGVkIGRlZmF1bHQgd2lkdGggZm9yIGEgY29sdW1uLlxuICAgKiBUaGlzIGlzIHRoZSB3aWR0aCBmb3IgY29sdW1ucyB0aGF0IGRvZXMgbm90IGhhdmUgYSBzcGVjaWZpYyB3aWR0aCwgYWRqdXN0aW5nIHRoZW0gdG8gZml0IHRoZSB0YWJsZS5cbiAgICogSXQncyBpbXBvcnRhbnQgdG8gcnVuIHRoaXMgbWV0aG9kIEFGVEVSIGFnZ3JlZ2F0aW5nIGFsbCBjb2x1bW5zIHRocm91Z2ggYGFkZENvbHVtbigpYC5cbiAgICogVGhlIHJlc3VsdCBjb250YWlucyAyIHZhbHVlcywgcGN0IGFuZCBweC5cbiAgICogcGN0IGlzIHRoZSB0b3RhbCB3aWR0aCBpbiBwZXJjZW50IHRoYXQgdGhlIGNvbHVtbiBzaG91bGQgc3ByZWFkIHRha2luZyBpbnRvIGFjY291bnQgY29sdW1ucyB3aXRoIGZpeGVkICUgd2lkdGguXG4gICAqIHB4IGlzIHRoZSB0b3RhbCB3aWR0aCBpbiBwaXhlbHMgdGhhdCB0aGUgY29sdW1uIHNob3VsZCBzaHJpbmsgdGFraW5nIGludG8gYWNjb3VudCBjb2x1bW5zIHdpdGggZml4ZWQgcGl4ZWwgd2lkdGguXG4gICAqXG4gICAqIFRoZSBhbGdvcml0aG0gaXMgc2ltcGxlOlxuICAgKiAgMSkgU3VtIGFsbCBjb2x1bW5zIHdpdGggZml4ZWQgcGVyY2VudCB3aWR0aFxuICAgKiAgMikgRnJvbSB0aGUgZW50aXJlIHJvdyB3aWR0aCAoMTAwJSkgZGVkdWN0IHRoZSB0b3RhbCBmaXhlZCB3aWR0aCAoc3RlcCAxKS5cbiAgICogICAgIFRoaXMgcmVzdWx0IHJlcHJlc2VudHMgdGhlICUgbGVmdCBmb3IgYWxsIGNvbHVtbnMgd2l0aG91dCBhIGZpeGVkIHdpZHRoIChwZXJjZW50IGFuZCBwaXhlbCkuXG4gICAqICAzKSBTdW0gYWxsIGNvbHVtbnMgd2l0aCBmaXhlZCBwaXhlbCB3aWR0aC5cbiAgICogICAgIFRoZSByZXN1bHQgcmVwcmVzZW50IHRoZSB0b3RhbCBhbW91bnQgb2Ygd2lkdGggaW4gcGl4ZWwgdGFrZW4gYnkgY29sdW1ucyB3aXRoIGZpeGVkIHdpZHRoLlxuICAgKiAgNCkgQ291bnQgYWxsIHRoZSBjb2x1bW5zIHdpdGhvdXQgYSBmaXhlZCB3aWR0aC5cbiAgICpcbiAgICogIEZvciAyICYgMyB3ZSBnZXQgdmFsdWVzIHRoYXQgd2UgbmVlZCB0byBzcHJlYWQgZXZlbiBiZXR3ZWVuIGFsbCBvZiB0aGUgY29sdW1ucyB3aXRob3V0IGZpeGVkIHdpZHRoIChwZXJjZW50IGFuZCBwaXhlbCkuXG4gICAqICBUaGUgZXhhY3Qgd2lkdGggaXMgdGhlIHRvdGFsIHBlcmNlbnQgbGVmdCAoMikgbWludXMgdGhlIHRvdGFsIHdpZHRoIGluIHBpeGVsIHRha2VuIGJ5IGNvbHVtbnMgd2l0aCBmaXhlZCB3aXRoLlxuICAgKiAgV2Ugbm93IG5lZWQgdG8gZGl2aWRlIHRoZSByZXN1bHQgZnJvbSAyICYgMyBieSB0aGUgcmVzdWx0IGZyb20gNC5cbiAgICpcbiAgICogQm90aCB2YWx1ZXMgc2hvdWxkIGJlIHVzZWQgdG9nZXRoZXIgb24gdGhlIGB3aWR0aGAgc3R5bGUgcHJvcGVydHkgdXNpbmcgdGhlIGBjYWxjYCBmdW5jdGlvbjpcbiAgICogZS5nLjogYGNhbGMoJHtwY3R9JSAtICR7cHh9cHgpYFxuICAgKlxuICAgKiBUaGlzIHZhbHVlIGlzIGNhbGN1bGF0ZWQgZXZlcnkgdGltZSBpdCBpcyBjYWxsZWQsIHVzZSBpdCBvbmNlIGFsbCBjb2x1bW5zIGFyZSBhZGRlZC5cbiAgICovXG4gIGdldCBkZWZhdWx0Q29sdW1uV2lkdGgoKTogQ29sdW1uV2lkdGgge1xuICAgIGNvbnN0IGFnZyA9IHRoaXMuX2FnZztcbiAgICBjb25zdCBwY3QgPSAoMTAwIC0gYWdnLnBjdCkgLyBhZ2cuY291bnQ7XG4gICAgY29uc3QgcHggPSBhZ2cucHggLyBhZ2cuY291bnQ7XG4gICAgcmV0dXJuIHsgcGN0LCBweCB9O1xuICB9XG5cbiAgYWRkQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgY29uc3QgYWdnID0gdGhpcy5fYWdnO1xuICAgIGNvbnN0IHdpZHRoID0gY29sdW1uLnBhcnNlZFdpZHRoO1xuXG4gICAgbGV0IG1pbldpZHRoID0gY29sdW1uLm1pbldpZHRoIHx8IDA7XG5cbiAgICBpZiAod2lkdGgpIHtcbiAgICAgIHN3aXRjaCAod2lkdGgudHlwZSkge1xuICAgICAgICBjYXNlICclJzpcbiAgICAgICAgICBhZ2cucGN0Q291bnQgKz0gMTtcbiAgICAgICAgICBhZ2cucGN0ICs9IHdpZHRoLnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdweCc6XG4gICAgICAgICAgYWdnLnB4Q291bnQgKz0gMTtcbiAgICAgICAgICBhZ2cucHggKz0gd2lkdGgudmFsdWU7XG4gICAgICAgICAgbWluV2lkdGggPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgd2lkdGggXCIke2NvbHVtbi53aWR0aH1cIiBpbiBjb2x1bW4gJHtjb2x1bW4ucHJvcH0uIFZhbGlkIHZhbHVlcyBhcmUgIyMlIG9yICMjcHggKDUwJSAvIDUwcHgpYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjb2x1bW4ubWF4V2lkdGhMb2NrKSB7XG4gICAgICBhZ2cucHhDb3VudCArPSAxO1xuICAgICAgYWdnLnB4ICs9IGNvbHVtbi5tYXhXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgYWdnLmNvdW50ICs9IDE7XG4gICAgfVxuICAgIGFnZy5taW5Sb3dXaWR0aCArPSBtaW5XaWR0aDtcbiAgfVxuXG59XG4iXX0=