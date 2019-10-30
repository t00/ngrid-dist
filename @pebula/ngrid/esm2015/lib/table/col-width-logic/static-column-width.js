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
export class StaticColumnWidthLogic {
    constructor() {
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
    /**
     * @return {?}
     */
    get minimumRowWidth() { return this._agg.minRowWidth; }
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
     * @return {?}
     */
    get defaultColumnWidth() {
        /** @type {?} */
        const agg = this._agg;
        /** @type {?} */
        const pct = (100 - agg.pct) / agg.count;
        /** @type {?} */
        const px = agg.px / agg.count;
        return { pct, px };
    }
    /**
     * @param {?} column
     * @return {?}
     */
    addColumn(column) {
        /** @type {?} */
        const agg = this._agg;
        /** @type {?} */
        const width = column.parsedWidth;
        /** @type {?} */
        let minWidth = column.minWidth || 0;
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
                    throw new Error(`Invalid width "${column.width}" in column ${column.prop}. Valid values are ##% or ##px (50% / 50px)`);
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
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    StaticColumnWidthLogic.prototype._agg;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWNvbHVtbi13aWR0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29sLXdpZHRoLWxvZ2ljL3N0YXRpYy1jb2x1bW4td2lkdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsaUNBR0M7OztJQUZDLDBCQUFZOztJQUNaLHlCQUFXOzs7Ozs7Ozs7Ozs7Ozs7QUFnQmIsTUFBTSxPQUFPLHNCQUFzQjtJQUFuQztRQUNVLFNBQUksR0FBRztZQUNiLEdBQUcsRUFBRSxDQUFDOztZQUNOLEVBQUUsRUFBRSxDQUFDOztZQUNMLFdBQVcsRUFBRSxDQUFDOztZQUNkLFFBQVEsRUFBRSxDQUFDOztZQUNYLE9BQU8sRUFBRSxDQUFDOztZQUNWLEtBQUssRUFBRSxDQUFDLENBQVMsc0NBQXNDO1NBQ3hELENBQUE7SUFpRUgsQ0FBQzs7OztJQS9EQyxJQUFJLGVBQWUsS0FBYSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkIvRCxJQUFJLGtCQUFrQjs7Y0FDZCxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUk7O2NBQ2YsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSzs7Y0FDakMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUs7UUFDN0IsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxNQUFpQjs7Y0FDbkIsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJOztjQUNmLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVzs7WUFFNUIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQztRQUVuQyxJQUFJLEtBQUssRUFBRTtZQUNULFFBQVEsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDbEIsS0FBSyxHQUFHO29CQUNOLEdBQUcsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDO29CQUNsQixHQUFHLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3ZCLE1BQU07Z0JBQ1IsS0FBSyxJQUFJO29CQUNQLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO29CQUNqQixHQUFHLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3RCLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUN2QixNQUFNO2dCQUNSO29CQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLE1BQU0sQ0FBQyxLQUFLLGVBQWUsTUFBTSxDQUFDLElBQUksNkNBQTZDLENBQUMsQ0FBQzthQUMxSDtTQUNGO2FBQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzlCLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDO1lBQ2pCLEdBQUcsQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztTQUMzQjthQUFNO1lBQ0wsR0FBRyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7U0FDaEI7UUFDRCxHQUFHLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQztJQUM5QixDQUFDO0NBRUY7Ozs7OztJQXhFQyxzQ0FPQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMnO1xuXG4vKipcbiAqIEEgY29sdW1uIHdpZHRoIG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHJlbGF0aXZlIGNvbHVtbiB1c2luZyBhIGNvbWJpbmF0aW9uIG9mIHBlcmNlbnRhZ2UgYW5kIHBpeGVscy5cbiAqXG4gKiBUaGUgcGVyY2VudGFnZSByZXByZXNlbnQgdGhlIHRvdGFsIHdpZHRoIG9mIHRoZSBjb2x1bW5cbiAqIFRoZSBwaXhlbHMgcmVwcmVzZW50IHRoZSB0b3RhbCBmaXhlZCB3aWR0aCwgaW4gcGl4ZWxzLCB0aGF0IG90aGVyIGNvbHVtbnMgb2NjdXB5ICh0aGVzZSBhcmUgY29sdW1ucyB3aXRoIGFic29sdXRlIHdpZHRoIHNldCkuXG4gKlxuICogSW4gYSBET00gZWxlbWVudCwgdGhlIGBDb2x1bW5XaWR0aGAgb2JqZWN0IGlzIHJlcHJlc2VudGVkIHZpYSB0aGUgYHdpZHRoYCBzdHlsZSBwcm9wZXJ0eVxuICogYW5kIHRoZSB2YWx1ZSBpcyBzZXQgdXNpbmcgdGhlIGBjYWxjKClgIENTUyBmdW5jdGlvbjogYHdpZHRoOiBjYWxjKHtwY3R9JSAtIHtweH1weCk7YC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdGhlIGBDb2x1bW5XaWR0aGAgb2JqZWN0ICBgeyBwY3Q6IDMzLCBweDogMjUgfWAgaXMgdHJhbnNsYXRlZCB0byBgd2lkdGg6IGNhbGMoMzMlIC0gMjVweCk7YFxuICpcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgaW50ZXJmYWNlIENvbHVtbldpZHRoIHtcbiAgcGN0OiBudW1iZXI7XG4gIHB4OiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBjb2x1bW4gd2lkdGggY2FsY3VsYXRvciB0aGF0LCBiYXNlZCBvbiBhbGwgb2YgdGhlIGNvbHVtbnMsIGNhbGN1bGF0ZXMgdGhlIGRlZmF1bHQgY29sdW1uIHdpZHRoXG4gKiBhbmQgbWluaW11bSByZXF1aXJlZCByb3cgd2lkdGguXG4gKlxuICogVGhlIGRlZmF1bHQgY29sdW1uIHdpZHRoIGlzIHRoZSB3aWR0aCBmb3IgYWxsIGNvbHVtbnMgdGhhdCBkb2VzIG5vdCBoYXZlIGEgd2lkdGggc2V0dGluZyBkZWZpbmVkLlxuICogSW4gYWRkaXRpb24sIGEgYG1pbmltdW1Sb3dXaWR0aGAgaXMgY2FsY3VsYXRlZCwgd2hpY2ggcmVwcmVzZW50cyB0aGUgbWluaW11bSB3aWR0aCByZXF1aXJlZCB3aWR0aCBvZiB0aGUgcm93LCBpLmUuIHRhYmxlLlxuICpcbiAqIFRoZSBgU3RhdGljQ29sdW1uV2lkdGhMb2dpY2AgZG9lcyBub3QgdGFrZSBpbnRvIGFjY291bnQgcmVhbC10aW1lIERPTSBtZWFzdXJlbWVudHMgKGVzcGVjaWFsbHkgYm94LW1vZGVsIG1ldGFkYXRhKSwgaGVuY2UgXCJzdGF0aWNcIi5cbiAqIEl0IHBlcmZvcm1zIHRoZSBjYWxjdWxhdGlvbiBiYXNlZCBvbiBcImRyeVwiIGBQYmxDb2x1bW5gIG1ldGFkYXRhIGlucHV0IGZyb20gdGhlIHVzZXIuXG4gKlxuICogVGhlIGBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljYCBpcyBsZXNzIGFjY3VyYXRlIGFuZCBiZXN0IHVzZWQgYXMgYSBtZWFzdXJlbWVudCBiYXNlbGluZSBmb2xsb3dlZCBieSBhIG1vcmUgYWNjdXJhdGUgY2FsY3VsYXRpb24uXG4gKiBUaGlzIGlzIHdoeSBpdCBvdXRwdXRzIGEgZGVmYXVsdCBjb2x1bW4gd2lkdGggYW5kIG5vdCBhIGNvbHVtbiBzcGVjaWZpYyB3aWR0aC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRpY0NvbHVtbldpZHRoTG9naWMge1xuICBwcml2YXRlIF9hZ2cgPSB7XG4gICAgcGN0OiAwLCAgICAgICAgICAvLyB0b3RhbCBhZ2cgZml4ZWQgJVxuICAgIHB4OiAwLCAgICAgICAgICAgLy8gdG90YWwgYWdnIGZpeGVkIHB4XG4gICAgbWluUm93V2lkdGg6IDAsICAvLyB0b3RhbCBhZ2cgb2YgbWluIHdpZHRoXG4gICAgcGN0Q291bnQ6IDAsICAgICAvLyB0b3RhbCBjb2x1bW5zIHdpdGggZml4ZWQgJVxuICAgIHB4Q291bnQ6IDAsICAgICAgLy8gdG90YWwgY29sdW1ucyB3aXRoIGZpeGVkIHB4XG4gICAgY291bnQ6IDAgICAgICAgICAvLyB0b3RhbCBjb2x1bW5zIHdpdGhvdXQgYSBmaXhlZCB2YWx1ZVxuICB9XG5cbiAgZ2V0IG1pbmltdW1Sb3dXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYWdnLm1pblJvd1dpZHRoOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNhbGN1bGF0ZWQgZGVmYXVsdCB3aWR0aCBmb3IgYSBjb2x1bW4uXG4gICAqIFRoaXMgaXMgdGhlIHdpZHRoIGZvciBjb2x1bW5zIHRoYXQgZG9lcyBub3QgaGF2ZSBhIHNwZWNpZmljIHdpZHRoLCBhZGp1c3RpbmcgdGhlbSB0byBmaXQgdGhlIHRhYmxlLlxuICAgKiBJdCdzIGltcG9ydGFudCB0byBydW4gdGhpcyBtZXRob2QgQUZURVIgYWdncmVnYXRpbmcgYWxsIGNvbHVtbnMgdGhyb3VnaCBgYWRkQ29sdW1uKClgLlxuICAgKiBUaGUgcmVzdWx0IGNvbnRhaW5zIDIgdmFsdWVzLCBwY3QgYW5kIHB4LlxuICAgKiBwY3QgaXMgdGhlIHRvdGFsIHdpZHRoIGluIHBlcmNlbnQgdGhhdCB0aGUgY29sdW1uIHNob3VsZCBzcHJlYWQgdGFraW5nIGludG8gYWNjb3VudCBjb2x1bW5zIHdpdGggZml4ZWQgJSB3aWR0aC5cbiAgICogcHggaXMgdGhlIHRvdGFsIHdpZHRoIGluIHBpeGVscyB0aGF0IHRoZSBjb2x1bW4gc2hvdWxkIHNocmluayB0YWtpbmcgaW50byBhY2NvdW50IGNvbHVtbnMgd2l0aCBmaXhlZCBwaXhlbCB3aWR0aC5cbiAgICpcbiAgICogVGhlIGFsZ29yaXRobSBpcyBzaW1wbGU6XG4gICAqICAxKSBTdW0gYWxsIGNvbHVtbnMgd2l0aCBmaXhlZCBwZXJjZW50IHdpZHRoXG4gICAqICAyKSBGcm9tIHRoZSBlbnRpcmUgcm93IHdpZHRoICgxMDAlKSBkZWR1Y3QgdGhlIHRvdGFsIGZpeGVkIHdpZHRoIChzdGVwIDEpLlxuICAgKiAgICAgVGhpcyByZXN1bHQgcmVwcmVzZW50cyB0aGUgJSBsZWZ0IGZvciBhbGwgY29sdW1ucyB3aXRob3V0IGEgZml4ZWQgd2lkdGggKHBlcmNlbnQgYW5kIHBpeGVsKS5cbiAgICogIDMpIFN1bSBhbGwgY29sdW1ucyB3aXRoIGZpeGVkIHBpeGVsIHdpZHRoLlxuICAgKiAgICAgVGhlIHJlc3VsdCByZXByZXNlbnQgdGhlIHRvdGFsIGFtb3VudCBvZiB3aWR0aCBpbiBwaXhlbCB0YWtlbiBieSBjb2x1bW5zIHdpdGggZml4ZWQgd2lkdGguXG4gICAqICA0KSBDb3VudCBhbGwgdGhlIGNvbHVtbnMgd2l0aG91dCBhIGZpeGVkIHdpZHRoLlxuICAgKlxuICAgKiAgRm9yIDIgJiAzIHdlIGdldCB2YWx1ZXMgdGhhdCB3ZSBuZWVkIHRvIHNwcmVhZCBldmVuIGJldHdlZW4gYWxsIG9mIHRoZSBjb2x1bW5zIHdpdGhvdXQgZml4ZWQgd2lkdGggKHBlcmNlbnQgYW5kIHBpeGVsKS5cbiAgICogIFRoZSBleGFjdCB3aWR0aCBpcyB0aGUgdG90YWwgcGVyY2VudCBsZWZ0ICgyKSBtaW51cyB0aGUgdG90YWwgd2lkdGggaW4gcGl4ZWwgdGFrZW4gYnkgY29sdW1ucyB3aXRoIGZpeGVkIHdpdGguXG4gICAqICBXZSBub3cgbmVlZCB0byBkaXZpZGUgdGhlIHJlc3VsdCBmcm9tIDIgJiAzIGJ5IHRoZSByZXN1bHQgZnJvbSA0LlxuICAgKlxuICAgKiBCb3RoIHZhbHVlcyBzaG91bGQgYmUgdXNlZCB0b2dldGhlciBvbiB0aGUgYHdpZHRoYCBzdHlsZSBwcm9wZXJ0eSB1c2luZyB0aGUgYGNhbGNgIGZ1bmN0aW9uOlxuICAgKiBlLmcuOiBgY2FsYygke3BjdH0lIC0gJHtweH1weClgXG4gICAqXG4gICAqIFRoaXMgdmFsdWUgaXMgY2FsY3VsYXRlZCBldmVyeSB0aW1lIGl0IGlzIGNhbGxlZCwgdXNlIGl0IG9uY2UgYWxsIGNvbHVtbnMgYXJlIGFkZGVkLlxuICAgKi9cbiAgZ2V0IGRlZmF1bHRDb2x1bW5XaWR0aCgpOiBDb2x1bW5XaWR0aCB7XG4gICAgY29uc3QgYWdnID0gdGhpcy5fYWdnO1xuICAgIGNvbnN0IHBjdCA9ICgxMDAgLSBhZ2cucGN0KSAvIGFnZy5jb3VudDtcbiAgICBjb25zdCBweCA9IGFnZy5weCAvIGFnZy5jb3VudDtcbiAgICByZXR1cm4geyBwY3QsIHB4IH07XG4gIH1cblxuICBhZGRDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgICBjb25zdCBhZ2cgPSB0aGlzLl9hZ2c7XG4gICAgY29uc3Qgd2lkdGggPSBjb2x1bW4ucGFyc2VkV2lkdGg7XG5cbiAgICBsZXQgbWluV2lkdGggPSBjb2x1bW4ubWluV2lkdGggfHwgMDtcblxuICAgIGlmICh3aWR0aCkge1xuICAgICAgc3dpdGNoICh3aWR0aC50eXBlKSB7XG4gICAgICAgIGNhc2UgJyUnOlxuICAgICAgICAgIGFnZy5wY3RDb3VudCArPSAxO1xuICAgICAgICAgIGFnZy5wY3QgKz0gd2lkdGgudmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3B4JzpcbiAgICAgICAgICBhZ2cucHhDb3VudCArPSAxO1xuICAgICAgICAgIGFnZy5weCArPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICBtaW5XaWR0aCA9IHdpZHRoLnZhbHVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB3aWR0aCBcIiR7Y29sdW1uLndpZHRofVwiIGluIGNvbHVtbiAke2NvbHVtbi5wcm9wfS4gVmFsaWQgdmFsdWVzIGFyZSAjIyUgb3IgIyNweCAoNTAlIC8gNTBweClgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNvbHVtbi5tYXhXaWR0aExvY2spIHtcbiAgICAgIGFnZy5weENvdW50ICs9IDE7XG4gICAgICBhZ2cucHggKz0gY29sdW1uLm1heFdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZ2cuY291bnQgKz0gMTtcbiAgICB9XG4gICAgYWdnLm1pblJvd1dpZHRoICs9IG1pbldpZHRoO1xuICB9XG5cbn1cbiJdfQ==