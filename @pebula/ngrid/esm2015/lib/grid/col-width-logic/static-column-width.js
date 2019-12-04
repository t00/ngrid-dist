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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLWNvbHVtbi13aWR0aC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2wtd2lkdGgtbG9naWMvc3RhdGljLWNvbHVtbi13aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxpQ0FHQzs7O0lBRkMsMEJBQVk7O0lBQ1oseUJBQVc7Ozs7Ozs7Ozs7Ozs7OztBQWdCYixNQUFNLE9BQU8sc0JBQXNCO0lBQW5DO1FBQ1UsU0FBSSxHQUFHO1lBQ2IsR0FBRyxFQUFFLENBQUM7O1lBQ04sRUFBRSxFQUFFLENBQUM7O1lBQ0wsV0FBVyxFQUFFLENBQUM7O1lBQ2QsUUFBUSxFQUFFLENBQUM7O1lBQ1gsT0FBTyxFQUFFLENBQUM7O1lBQ1YsS0FBSyxFQUFFLENBQUMsQ0FBUyxzQ0FBc0M7U0FDeEQsQ0FBQTtJQWlFSCxDQUFDOzs7O0lBL0RDLElBQUksZUFBZSxLQUFhLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUEyQi9ELElBQUksa0JBQWtCOztjQUNkLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSTs7Y0FDZixHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLOztjQUNqQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSztRQUM3QixPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLE1BQWlCOztjQUNuQixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUk7O2NBQ2YsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXOztZQUU1QixRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDO1FBRW5DLElBQUksS0FBSyxFQUFFO1lBQ1QsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNsQixLQUFLLEdBQUc7b0JBQ04sR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7b0JBQ2xCLEdBQUcsQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDdkIsTUFBTTtnQkFDUixLQUFLLElBQUk7b0JBQ1AsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7b0JBQ2pCLEdBQUcsQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztvQkFDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQ3ZCLE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsTUFBTSxDQUFDLEtBQUssZUFBZSxNQUFNLENBQUMsSUFBSSw2Q0FBNkMsQ0FBQyxDQUFDO2FBQzFIO1NBQ0Y7YUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7WUFDOUIsR0FBRyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDO1NBQzNCO2FBQU07WUFDTCxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztTQUNoQjtRQUNELEdBQUcsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDO0lBQzlCLENBQUM7Q0FFRjs7Ozs7O0lBeEVDLHNDQU9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5cbi8qKlxuICogQSBjb2x1bW4gd2lkdGggb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVsYXRpdmUgY29sdW1uIHVzaW5nIGEgY29tYmluYXRpb24gb2YgcGVyY2VudGFnZSBhbmQgcGl4ZWxzLlxuICpcbiAqIFRoZSBwZXJjZW50YWdlIHJlcHJlc2VudCB0aGUgdG90YWwgd2lkdGggb2YgdGhlIGNvbHVtblxuICogVGhlIHBpeGVscyByZXByZXNlbnQgdGhlIHRvdGFsIGZpeGVkIHdpZHRoLCBpbiBwaXhlbHMsIHRoYXQgb3RoZXIgY29sdW1ucyBvY2N1cHkgKHRoZXNlIGFyZSBjb2x1bW5zIHdpdGggYWJzb2x1dGUgd2lkdGggc2V0KS5cbiAqXG4gKiBJbiBhIERPTSBlbGVtZW50LCB0aGUgYENvbHVtbldpZHRoYCBvYmplY3QgaXMgcmVwcmVzZW50ZWQgdmlhIHRoZSBgd2lkdGhgIHN0eWxlIHByb3BlcnR5XG4gKiBhbmQgdGhlIHZhbHVlIGlzIHNldCB1c2luZyB0aGUgYGNhbGMoKWAgQ1NTIGZ1bmN0aW9uOiBgd2lkdGg6IGNhbGMoe3BjdH0lIC0ge3B4fXB4KTtgLlxuICpcbiAqIEZvciBleGFtcGxlLCB0aGUgYENvbHVtbldpZHRoYCBvYmplY3QgIGB7IHBjdDogMzMsIHB4OiAyNSB9YCBpcyB0cmFuc2xhdGVkIHRvIGB3aWR0aDogY2FsYygzMyUgLSAyNXB4KTtgXG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ29sdW1uV2lkdGgge1xuICBwY3Q6IG51bWJlcjtcbiAgcHg6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBBIGNvbHVtbiB3aWR0aCBjYWxjdWxhdG9yIHRoYXQsIGJhc2VkIG9uIGFsbCBvZiB0aGUgY29sdW1ucywgY2FsY3VsYXRlcyB0aGUgZGVmYXVsdCBjb2x1bW4gd2lkdGhcbiAqIGFuZCBtaW5pbXVtIHJlcXVpcmVkIHJvdyB3aWR0aC5cbiAqXG4gKiBUaGUgZGVmYXVsdCBjb2x1bW4gd2lkdGggaXMgdGhlIHdpZHRoIGZvciBhbGwgY29sdW1ucyB0aGF0IGRvZXMgbm90IGhhdmUgYSB3aWR0aCBzZXR0aW5nIGRlZmluZWQuXG4gKiBJbiBhZGRpdGlvbiwgYSBgbWluaW11bVJvd1dpZHRoYCBpcyBjYWxjdWxhdGVkLCB3aGljaCByZXByZXNlbnRzIHRoZSBtaW5pbXVtIHdpZHRoIHJlcXVpcmVkIHdpZHRoIG9mIHRoZSByb3csIGkuZS4gdGFibGUuXG4gKlxuICogVGhlIGBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljYCBkb2VzIG5vdCB0YWtlIGludG8gYWNjb3VudCByZWFsLXRpbWUgRE9NIG1lYXN1cmVtZW50cyAoZXNwZWNpYWxseSBib3gtbW9kZWwgbWV0YWRhdGEpLCBoZW5jZSBcInN0YXRpY1wiLlxuICogSXQgcGVyZm9ybXMgdGhlIGNhbGN1bGF0aW9uIGJhc2VkIG9uIFwiZHJ5XCIgYFBibENvbHVtbmAgbWV0YWRhdGEgaW5wdXQgZnJvbSB0aGUgdXNlci5cbiAqXG4gKiBUaGUgYFN0YXRpY0NvbHVtbldpZHRoTG9naWNgIGlzIGxlc3MgYWNjdXJhdGUgYW5kIGJlc3QgdXNlZCBhcyBhIG1lYXN1cmVtZW50IGJhc2VsaW5lIGZvbGxvd2VkIGJ5IGEgbW9yZSBhY2N1cmF0ZSBjYWxjdWxhdGlvbi5cbiAqIFRoaXMgaXMgd2h5IGl0IG91dHB1dHMgYSBkZWZhdWx0IGNvbHVtbiB3aWR0aCBhbmQgbm90IGEgY29sdW1uIHNwZWNpZmljIHdpZHRoLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdGljQ29sdW1uV2lkdGhMb2dpYyB7XG4gIHByaXZhdGUgX2FnZyA9IHtcbiAgICBwY3Q6IDAsICAgICAgICAgIC8vIHRvdGFsIGFnZyBmaXhlZCAlXG4gICAgcHg6IDAsICAgICAgICAgICAvLyB0b3RhbCBhZ2cgZml4ZWQgcHhcbiAgICBtaW5Sb3dXaWR0aDogMCwgIC8vIHRvdGFsIGFnZyBvZiBtaW4gd2lkdGhcbiAgICBwY3RDb3VudDogMCwgICAgIC8vIHRvdGFsIGNvbHVtbnMgd2l0aCBmaXhlZCAlXG4gICAgcHhDb3VudDogMCwgICAgICAvLyB0b3RhbCBjb2x1bW5zIHdpdGggZml4ZWQgcHhcbiAgICBjb3VudDogMCAgICAgICAgIC8vIHRvdGFsIGNvbHVtbnMgd2l0aG91dCBhIGZpeGVkIHZhbHVlXG4gIH1cblxuICBnZXQgbWluaW11bVJvd1dpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9hZ2cubWluUm93V2lkdGg7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRlZCBkZWZhdWx0IHdpZHRoIGZvciBhIGNvbHVtbi5cbiAgICogVGhpcyBpcyB0aGUgd2lkdGggZm9yIGNvbHVtbnMgdGhhdCBkb2VzIG5vdCBoYXZlIGEgc3BlY2lmaWMgd2lkdGgsIGFkanVzdGluZyB0aGVtIHRvIGZpdCB0aGUgdGFibGUuXG4gICAqIEl0J3MgaW1wb3J0YW50IHRvIHJ1biB0aGlzIG1ldGhvZCBBRlRFUiBhZ2dyZWdhdGluZyBhbGwgY29sdW1ucyB0aHJvdWdoIGBhZGRDb2x1bW4oKWAuXG4gICAqIFRoZSByZXN1bHQgY29udGFpbnMgMiB2YWx1ZXMsIHBjdCBhbmQgcHguXG4gICAqIHBjdCBpcyB0aGUgdG90YWwgd2lkdGggaW4gcGVyY2VudCB0aGF0IHRoZSBjb2x1bW4gc2hvdWxkIHNwcmVhZCB0YWtpbmcgaW50byBhY2NvdW50IGNvbHVtbnMgd2l0aCBmaXhlZCAlIHdpZHRoLlxuICAgKiBweCBpcyB0aGUgdG90YWwgd2lkdGggaW4gcGl4ZWxzIHRoYXQgdGhlIGNvbHVtbiBzaG91bGQgc2hyaW5rIHRha2luZyBpbnRvIGFjY291bnQgY29sdW1ucyB3aXRoIGZpeGVkIHBpeGVsIHdpZHRoLlxuICAgKlxuICAgKiBUaGUgYWxnb3JpdGhtIGlzIHNpbXBsZTpcbiAgICogIDEpIFN1bSBhbGwgY29sdW1ucyB3aXRoIGZpeGVkIHBlcmNlbnQgd2lkdGhcbiAgICogIDIpIEZyb20gdGhlIGVudGlyZSByb3cgd2lkdGggKDEwMCUpIGRlZHVjdCB0aGUgdG90YWwgZml4ZWQgd2lkdGggKHN0ZXAgMSkuXG4gICAqICAgICBUaGlzIHJlc3VsdCByZXByZXNlbnRzIHRoZSAlIGxlZnQgZm9yIGFsbCBjb2x1bW5zIHdpdGhvdXQgYSBmaXhlZCB3aWR0aCAocGVyY2VudCBhbmQgcGl4ZWwpLlxuICAgKiAgMykgU3VtIGFsbCBjb2x1bW5zIHdpdGggZml4ZWQgcGl4ZWwgd2lkdGguXG4gICAqICAgICBUaGUgcmVzdWx0IHJlcHJlc2VudCB0aGUgdG90YWwgYW1vdW50IG9mIHdpZHRoIGluIHBpeGVsIHRha2VuIGJ5IGNvbHVtbnMgd2l0aCBmaXhlZCB3aWR0aC5cbiAgICogIDQpIENvdW50IGFsbCB0aGUgY29sdW1ucyB3aXRob3V0IGEgZml4ZWQgd2lkdGguXG4gICAqXG4gICAqICBGb3IgMiAmIDMgd2UgZ2V0IHZhbHVlcyB0aGF0IHdlIG5lZWQgdG8gc3ByZWFkIGV2ZW4gYmV0d2VlbiBhbGwgb2YgdGhlIGNvbHVtbnMgd2l0aG91dCBmaXhlZCB3aWR0aCAocGVyY2VudCBhbmQgcGl4ZWwpLlxuICAgKiAgVGhlIGV4YWN0IHdpZHRoIGlzIHRoZSB0b3RhbCBwZXJjZW50IGxlZnQgKDIpIG1pbnVzIHRoZSB0b3RhbCB3aWR0aCBpbiBwaXhlbCB0YWtlbiBieSBjb2x1bW5zIHdpdGggZml4ZWQgd2l0aC5cbiAgICogIFdlIG5vdyBuZWVkIHRvIGRpdmlkZSB0aGUgcmVzdWx0IGZyb20gMiAmIDMgYnkgdGhlIHJlc3VsdCBmcm9tIDQuXG4gICAqXG4gICAqIEJvdGggdmFsdWVzIHNob3VsZCBiZSB1c2VkIHRvZ2V0aGVyIG9uIHRoZSBgd2lkdGhgIHN0eWxlIHByb3BlcnR5IHVzaW5nIHRoZSBgY2FsY2AgZnVuY3Rpb246XG4gICAqIGUuZy46IGBjYWxjKCR7cGN0fSUgLSAke3B4fXB4KWBcbiAgICpcbiAgICogVGhpcyB2YWx1ZSBpcyBjYWxjdWxhdGVkIGV2ZXJ5IHRpbWUgaXQgaXMgY2FsbGVkLCB1c2UgaXQgb25jZSBhbGwgY29sdW1ucyBhcmUgYWRkZWQuXG4gICAqL1xuICBnZXQgZGVmYXVsdENvbHVtbldpZHRoKCk6IENvbHVtbldpZHRoIHtcbiAgICBjb25zdCBhZ2cgPSB0aGlzLl9hZ2c7XG4gICAgY29uc3QgcGN0ID0gKDEwMCAtIGFnZy5wY3QpIC8gYWdnLmNvdW50O1xuICAgIGNvbnN0IHB4ID0gYWdnLnB4IC8gYWdnLmNvdW50O1xuICAgIHJldHVybiB7IHBjdCwgcHggfTtcbiAgfVxuXG4gIGFkZENvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICAgIGNvbnN0IGFnZyA9IHRoaXMuX2FnZztcbiAgICBjb25zdCB3aWR0aCA9IGNvbHVtbi5wYXJzZWRXaWR0aDtcblxuICAgIGxldCBtaW5XaWR0aCA9IGNvbHVtbi5taW5XaWR0aCB8fCAwO1xuXG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICBzd2l0Y2ggKHdpZHRoLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnJSc6XG4gICAgICAgICAgYWdnLnBjdENvdW50ICs9IDE7XG4gICAgICAgICAgYWdnLnBjdCArPSB3aWR0aC52YWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncHgnOlxuICAgICAgICAgIGFnZy5weENvdW50ICs9IDE7XG4gICAgICAgICAgYWdnLnB4ICs9IHdpZHRoLnZhbHVlO1xuICAgICAgICAgIG1pbldpZHRoID0gd2lkdGgudmFsdWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHdpZHRoIFwiJHtjb2x1bW4ud2lkdGh9XCIgaW4gY29sdW1uICR7Y29sdW1uLnByb3B9LiBWYWxpZCB2YWx1ZXMgYXJlICMjJSBvciAjI3B4ICg1MCUgLyA1MHB4KWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY29sdW1uLm1heFdpZHRoTG9jaykge1xuICAgICAgYWdnLnB4Q291bnQgKz0gMTtcbiAgICAgIGFnZy5weCArPSBjb2x1bW4ubWF4V2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFnZy5jb3VudCArPSAxO1xuICAgIH1cbiAgICBhZ2cubWluUm93V2lkdGggKz0gbWluV2lkdGg7XG4gIH1cblxufVxuIl19