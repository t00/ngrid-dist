/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/col-width-logic/dynamic-column-width.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class DynamicColumnWidthLogic {
    /**
     * @param {?} strategy
     */
    constructor(strategy) {
        this.strategy = strategy;
        this.cols = new Map();
        this._minimumRowWidth = 0;
    }
    /**
     * @return {?}
     */
    get minimumRowWidth() { return this._minimumRowWidth; }
    ;
    /**
     * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
     * @param {?} columnInfo
     * @return {?}
     */
    widthBreakout(columnInfo) {
        return widthBreakout(this.strategy, columnInfo);
    }
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
    addColumn(columnInfo) {
        if (!this.cols.has(columnInfo)) {
            const { column } = columnInfo;
            /** @type {?} */
            let minWidth = column.minWidth || 0;
            if (column.isFixedWidth) {
                minWidth = Math.max(column.parsedWidth.value, minWidth);
            }
            /** @type {?} */
            const nonContent = this.strategy.cell(columnInfo);
            /** @type {?} */
            const width = minWidth + nonContent;
            this.cols.set(columnInfo, width);
            this._minimumRowWidth += width;
            if (column.maxWidth) {
                /** @type {?} */
                const actualWidth = columnInfo.width - nonContent;
                if (column.checkMaxWidthLock(actualWidth)) {
                    this.maxWidthLockChanged = true;
                }
            }
        }
    }
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
    addGroup(columnInfos) {
        /** @type {?} */
        let sum = 0;
        for (const c of columnInfos) {
            this.addColumn(c);
            sum += c.width;
        }
        sum -= this.strategy.group(columnInfos);
        return sum;
    }
}
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
    const nonContent = strategy.cell(columnInfo);
    return {
        content: columnInfo.width - nonContent,
        nonContent,
    };
}
/** @type {?} */
export const DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY = {
    /**
     * @param {?} col
     * @return {?}
     */
    cell(col) {
        /** @type {?} */
        const style = col.style;
        return parseInt(style.paddingLeft) + parseInt(style.paddingRight);
    },
    /**
     * @param {?} col
     * @return {?}
     */
    groupCell(col) {
        return 0;
    },
    /**
     * @param {?} cols
     * @return {?}
     */
    group(cols) {
        /** @type {?} */
        const len = cols.length;
        return len > 0 ? parseInt(cols[0].style.paddingLeft) + parseInt(cols[len - 1].style.paddingRight) : 0;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb2x1bW4td2lkdGguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sLXdpZHRoLWxvZ2ljL2R5bmFtaWMtY29sdW1uLXdpZHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsMkNBSUM7Ozs7OztJQUhDLDBEQUFxQzs7Ozs7SUFDckMsK0RBQTBDOzs7OztJQUMxQyw0REFBeUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUIzQyxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBWWxDLFlBQTRCLFFBQStCO1FBQS9CLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBSDFDLFNBQUksR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQUNyRCxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFFa0MsQ0FBQzs7OztJQUxoRSxJQUFJLGVBQWUsS0FBYSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFVaEUsYUFBYSxDQUFDLFVBQTZCO1FBQ3pDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbEQsQ0FBQzs7Ozs7Ozs7Ozs7OztJQVlELFNBQVMsQ0FBQyxVQUE2QjtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7a0JBQ3hCLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVTs7Z0JBQ3pCLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUM7WUFDbkMsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO2dCQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RDs7a0JBQ0ssVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7a0JBQzNDLEtBQUssR0FBRyxRQUFRLEdBQUcsVUFBVTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQztZQUUvQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7O3NCQUNiLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVU7Z0JBQ2pELElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7SUFXRCxRQUFRLENBQUMsV0FBZ0M7O1lBQ25DLEdBQUcsR0FBRyxDQUFDO1FBQ1gsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUNGLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7Q0FFRjs7Ozs7OztJQWxFQyxzREFBNkI7Ozs7O0lBSTdCLHVDQUE2RDs7Ozs7SUFDN0QsbURBQTZCOztJQUVqQiwyQ0FBK0M7Ozs7Ozs7OztBQWdFN0QsTUFBTSxVQUFVLGFBQWEsQ0FBQyxRQUErQixFQUFFLFVBQTZCOztVQUNyRixVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDNUMsT0FBTztRQUNMLE9BQU8sRUFBRSxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVU7UUFDdEMsVUFBVTtLQUNYLENBQUM7QUFDSCxDQUFDOztBQUVELE1BQU0sT0FBTyx3Q0FBd0MsR0FBMEI7Ozs7O0lBQzdFLElBQUksQ0FBQyxHQUFzQjs7Y0FDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ25FLENBQUM7Ozs7O0lBQ0QsU0FBUyxDQUFDLEdBQXNCO1FBQzlCLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFDRCxLQUFLLENBQUMsSUFBeUI7O2NBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTTtRQUN2QixPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hHLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJveE1vZGVsU3BhY2VTdHJhdGVneSB7XG4gIGNlbGwoY29sOiBQYmxDb2x1bW5TaXplSW5mbyk6IG51bWJlcjtcbiAgZ3JvdXBDZWxsKGNvbDogUGJsQ29sdW1uU2l6ZUluZm8pOiBudW1iZXI7XG4gIGdyb3VwKGNvbHM6IFBibENvbHVtblNpemVJbmZvW10pOiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBjb2x1bW4gd2lkdGggY2FsY3VsYXRvciB0aGF0IGNhbGN1bGF0ZXMgY29sdW1uIHdpZHRoIGZvciBhIHNwZWNpZmljIGNvbHVtbiBvciBhIGdyb3VwIG9mIGNvbHVtbnMuXG4gKiBJdCBhbHNvIHByb3ZpZGUgdGhlIG1pbmltdW0gcmVxdWlyZWQgcm93IHdpZHRoIGZvciB0aGUgdG90YWwgY29sdW1ucyBhZGRlZCB1cCB0byB0aGF0IHBvaW50LlxuICpcbiAqIFRoZSBgRHluYW1pY0NvbHVtbldpZHRoTG9naWNgIHRha2VzIGludG8gYWNjb3VudCByZWFsLXRpbWUgRE9NIG1lYXN1cmVtZW50cyAoZXNwZWNpYWxseSBib3gtbW9kZWwgbWV0YWRhdGEpLCBoZW5jZSBcImR5bmFtaWNcIi5cbiAqIEl0IHBlcmZvcm1zIHRoZSBjYWxjdWxhdGlvbiBiYXNlZCBvbiBgUGJsQ29sdW1uYCBhbmQgYWN0dWFsIERPTSBzaXplIG1ldGFkYXRhLlxuICpcbiAqIFRoZSBgRHluYW1pY0NvbHVtbldpZHRoTG9naWNgIGhhcyAzIHJlc3BvbnNpYmlsaXRpZXM6XG4gKlxuICogLSBJdCBpcyByZXNwb25zaWJsZSBmb3IgZW5mb3JjaW5nIHRoZSBgbWF4V2lkdGhgIGJvdW5kYXJ5IGNvbnN0cmFpbnQgZm9yIGV2ZXJ5IGNvbHVtbiBpdCBwcm9jZXNzZXMgYnkgY2FsY3VsYXRpbmcgdGhlIGFjdHVhbCB3aWR0aFxuICogb2YgYSBjb2x1bW4gYW5kIGNhbGxpbmcgYFBibENvbHVtbi5jaGVja01heFdpZHRoTG9ja2AgdG8gdmVyaWZ5IGlmIG1heCB3aWR0aCBsb2NrIGhhcyBjaGFuZ2VkIGR1ZSB0byB0aGUgbmV3IGFjdHVhbCB3aWR0aC5cbiAqXG4gKiAtIEl0IGNhbGN1bGF0ZXMgdGhlIGFic29sdXRlIHdpZHRoIGZvciBhIGdyb3VwIG9mIGNvbHVtbnMsIHNvIGBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRHcm91cENvbHVtbmAgY2FuIGhhdmUgYW4gZXhhY3Qgc2l6ZSB0aGF0IHdyYXBzIGl0J3MgY2hpbGRyZW4uXG4gKlxuICogLSBJdCBjYWxjdWxhdGVzIHRoZSBgbWluaW11bVJvd1dpZHRoYCwgd2hpY2ggcmVwcmVzZW50cyB0aGUgbWluaW11bSB3aWR0aCByZXF1aXJlZCB3aWR0aCBvZiB0aGUgcm93LCBpLmUuIHRhYmxlLlxuICpcbiAqID4gTm90ZSB0aGF0IGFuIGluc3RhbmNlIG9mIGBEeW5hbWljQ29sdW1uV2lkdGhMb2dpY2AgcmVwcmVzZW50cyBhIG9uZS10aW1lIHBhc3MgZm9yIGFsbCBjb2x1bW5zLCBmb3IgZXZlcnkgcnVuIGEgbmV3IGluc3RhbmNlIGlzIHJlcXVpcmVkLlxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbHVtbldpZHRoTG9naWMge1xuICAvKipcbiAgICogV2hlbiB0cnVlLCBpdCBpbmRpY2F0ZXMgdGhhdCBvbmUgKG9yIG1vcmUpIGNvbHVtbnMgaGFzIGNoYW5nZWQgdGhlIG1heCB3aWR0aCBsb2NrIHN0YXRlLlxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIG1heFdpZHRoTG9ja0NoYW5nZWQ6IGJvb2xlYW47XG5cbiAgZ2V0IG1pbmltdW1Sb3dXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluaW11bVJvd1dpZHRoOyB9O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29scyA9IG5ldyBNYXA8UGJsQ29sdW1uU2l6ZUluZm8sIG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfbWluaW11bVJvd1dpZHRoID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgc3RyYXRlZ3k6IEJveE1vZGVsU3BhY2VTdHJhdGVneSkgeyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBicmVha291dCBvZiB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbiwgYnJlYWtpbmcgaXQgaW50byB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgYW5kIHRoZSByZXN0IG9mIHRoZSB3aWR0aFxuICAgKi9cbiAgd2lkdGhCcmVha291dChjb2x1bW5JbmZvOiBQYmxDb2x1bW5TaXplSW5mbyk6IHsgY29udGVudDogbnVtYmVyLCBub25Db250ZW50OiBudW1iZXIgfSB7XG4gICAgcmV0dXJuIHdpZHRoQnJlYWtvdXQodGhpcy5zdHJhdGVneSwgY29sdW1uSW5mbyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgY29sdW1uIHRvIHRoZSBjYWxjdWxhdGlvbi5cbiAgICpcbiAgICogVGhlIG9wZXJhdGlvbiB3aWxsIHVwZGF0ZSB0aGUgbWluaW11bSByZXF1aXJlZCB3aWR0aCBhbmQgdHJpZ2dlciBhIGBjaGVja01heFdpZHRoTG9ja2Agb24gdGhlIGNvbHVtbi5cbiAgICogSWYgdGhlIG1heCB3aWR0aCBsb2NrIGhhcyBjaGFuZ2VkIHRoZSBgbWF4V2lkdGhMb2NrQ2hhbmdlZGAgaXMgc2V0IHRvIHRydWUuXG4gICAqXG4gICAqIEEgY29sdW1uIHRoYXQgd2FzIHByZXZpb3VzbHkgYWRkZWQgaXMgaWdub3JlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IG9uY2UgYG1heFdpZHRoTG9ja0NoYW5nZWRgIGlzIHNldCB0byB0cnVlIGl0IHdpbGwgbmV2ZXIgY2hhbmdlLlxuICAgKi9cbiAgYWRkQ29sdW1uKGNvbHVtbkluZm86IFBibENvbHVtblNpemVJbmZvKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHMuaGFzKGNvbHVtbkluZm8pKSB7XG4gICAgICBjb25zdCB7IGNvbHVtbiB9ID0gY29sdW1uSW5mbztcbiAgICAgIGxldCBtaW5XaWR0aCA9IGNvbHVtbi5taW5XaWR0aCB8fCAwO1xuICAgICAgaWYgKGNvbHVtbi5pc0ZpeGVkV2lkdGgpIHtcbiAgICAgICAgbWluV2lkdGggPSBNYXRoLm1heChjb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUsIG1pbldpZHRoKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5vbkNvbnRlbnQgPSB0aGlzLnN0cmF0ZWd5LmNlbGwoY29sdW1uSW5mbyk7XG4gICAgICBjb25zdCB3aWR0aCA9IG1pbldpZHRoICsgbm9uQ29udGVudDtcbiAgICAgIHRoaXMuY29scy5zZXQoY29sdW1uSW5mbywgd2lkdGgpO1xuICAgICAgdGhpcy5fbWluaW11bVJvd1dpZHRoICs9IHdpZHRoO1xuXG4gICAgICBpZiAoY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICAgIGNvbnN0IGFjdHVhbFdpZHRoID0gY29sdW1uSW5mby53aWR0aCAtIG5vbkNvbnRlbnQ7XG4gICAgICAgIGlmIChjb2x1bW4uY2hlY2tNYXhXaWR0aExvY2soYWN0dWFsV2lkdGgpKSB7XG4gICAgICAgICAgdGhpcy5tYXhXaWR0aExvY2tDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSdW4gZWFjaCBvZiB0aGUgY29sdW1ucyB0aHJvdWdoIGBhZGRDb2x1bW5gIGFuZCByZXR1cm5zIHRoZSBzdW0gb2YgdGhlIHdpZHRoIGFsbCBjb2x1bW5zIHVzaW5nXG4gICAqIHRoZSBib3ggbW9kZWwgc3BhY2Ugc3RyYXRlZ3kuXG4gICAqXG4gICAqIFRoZSByZXN1bHQgcmVwcmVzZW50cyB0aGUgYWJzb2x1dGUgd2lkdGggdG8gYmUgdXNlZCBpbiBhIGBQYmxDb2x1bW5Hcm91cGAuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHdoZW4gYSB0YWJsZSBoYXMgbXVsdGlwbGUgY29sdW1uLWdyb3VwIHJvd3MgZWFjaCBjb2x1bW4gaXMgdGhlIGNoaWxkIG9mIG11bHRpcGxlIGdyb3VwIGNvbHVtbiwgaGVuY2UgY2FsbGluZyBgYWRkQ29sdW1uYCB3aXRoIHRoZVxuICAgKiBzYW1lIGdyb3VwIG1vcmUgdGhlbiBvbmNlLiBIb3dldmVyLCBzaW5jZSBgYWRkQ29sdW1uKClgIGlnbm9yZXMgY29sdW1ucyBpdCBhbHJlYWR5IHByb2Nlc3NlZCBpdCBpcyBzYWZlLlxuICAgKi9cbiAgYWRkR3JvdXAoY29sdW1uSW5mb3M6IFBibENvbHVtblNpemVJbmZvW10pOiBudW1iZXIge1xuICAgIGxldCBzdW0gPSAwO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW5JbmZvcykge1xuICAgICAgdGhpcy5hZGRDb2x1bW4oYyk7XG4gICAgICBzdW0gKz0gYy53aWR0aDtcbiAgICB9XG4gICBzdW0gLT0gdGhpcy5zdHJhdGVneS5ncm91cChjb2x1bW5JbmZvcyk7XG4gICByZXR1cm4gc3VtO1xuICB9XG5cbn1cblxuLyoqXG4qIFJldHVybnMgYSBicmVha291dCBvZiB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbiwgYnJlYWtpbmcgaXQgaW50byB0aGUgd2lkdGggb2YgdGhlIGNvbnRlbnQgYW5kIHRoZSByZXN0IG9mIHRoZSB3aWR0aFxuKi9cbmV4cG9ydCBmdW5jdGlvbiB3aWR0aEJyZWFrb3V0KHN0cmF0ZWd5OiBCb3hNb2RlbFNwYWNlU3RyYXRlZ3ksIGNvbHVtbkluZm86IFBibENvbHVtblNpemVJbmZvKTogeyBjb250ZW50OiBudW1iZXIsIG5vbkNvbnRlbnQ6IG51bWJlciB9IHtcbiBjb25zdCBub25Db250ZW50ID0gc3RyYXRlZ3kuY2VsbChjb2x1bW5JbmZvKTtcbiByZXR1cm4ge1xuICAgY29udGVudDogY29sdW1uSW5mby53aWR0aCAtIG5vbkNvbnRlbnQsXG4gICBub25Db250ZW50LFxuIH07XG59XG5cbmV4cG9ydCBjb25zdCBEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZOiBCb3hNb2RlbFNwYWNlU3RyYXRlZ3kgPSB7XG4gIGNlbGwoY29sOiBQYmxDb2x1bW5TaXplSW5mbyk6IG51bWJlciB7XG4gICAgY29uc3Qgc3R5bGUgPSBjb2wuc3R5bGU7XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlSW50KHN0eWxlLnBhZGRpbmdSaWdodClcbiAgfSxcbiAgZ3JvdXBDZWxsKGNvbDogUGJsQ29sdW1uU2l6ZUluZm8pOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9LFxuICBncm91cChjb2xzOiBQYmxDb2x1bW5TaXplSW5mb1tdKTogbnVtYmVyIHtcbiAgICBjb25zdCBsZW4gPSBjb2xzLmxlbmd0aDtcbiAgICByZXR1cm4gbGVuID4gMCA/IHBhcnNlSW50KGNvbHNbMF0uc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VJbnQoY29sc1tsZW4gLSAxXS5zdHlsZS5wYWRkaW5nUmlnaHQpIDogMDtcbiAgfVxufTtcbiJdfQ==