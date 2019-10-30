/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        const nonContent = this.strategy.cell(columnInfo);
        return {
            content: columnInfo.width - nonContent,
            nonContent,
        };
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
    /**
     * @type {?}
     * @private
     */
    DynamicColumnWidthLogic.prototype.strategy;
    /* Skipping unhandled member: ;*/
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
        return style ? parseInt(style.paddingLeft) + parseInt(style.paddingRight) : 0;
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
        return len > 0 && cols[0].style && cols[len - 1].style ? parseInt(cols[0].style.paddingLeft) + parseInt(cols[len - 1].style.paddingRight) : 0;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1jb2x1bW4td2lkdGguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsMkNBSUM7Ozs7OztJQUhDLDBEQUFxQzs7Ozs7SUFDckMsK0RBQTBDOzs7OztJQUMxQyw0REFBeUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUIzQyxNQUFNLE9BQU8sdUJBQXVCOzs7O0lBWWxDLFlBQW9CLFFBQStCO1FBQS9CLGFBQVEsR0FBUixRQUFRLENBQXVCO1FBSGxDLFNBQUksR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQUNyRCxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFFMEIsQ0FBQzs7OztJQUx4RCxJQUFJLGVBQWUsS0FBYSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDOzs7Ozs7SUFVaEUsYUFBYSxDQUFDLFVBQTZCOztjQUNuQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2pELE9BQU87WUFDTCxPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFVO1lBQ3RDLFVBQVU7U0FDWCxDQUFDO0lBQ0osQ0FBQzs7Ozs7Ozs7Ozs7OztJQVlELFNBQVMsQ0FBQyxVQUE2QjtRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7a0JBQ3hCLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVTs7Z0JBQ3pCLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUM7WUFDbkMsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFO2dCQUN2QixRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6RDs7a0JBQ0ssVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7a0JBQzNDLEtBQUssR0FBRyxRQUFRLEdBQUcsVUFBVTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEtBQUssQ0FBQztZQUUvQixJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7O3NCQUNiLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVU7Z0JBQ2pELElBQUksTUFBTSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUN6QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7SUFXRCxRQUFRLENBQUMsV0FBZ0M7O1lBQ25DLEdBQUcsR0FBRyxDQUFDO1FBQ1gsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixHQUFHLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUNoQjtRQUNGLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN4QyxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7Q0FFRjs7Ozs7OztJQXRFQyxzREFBNkI7Ozs7O0lBSTdCLHVDQUE2RDs7Ozs7SUFDN0QsbURBQTZCOzs7OztJQUVqQiwyQ0FBdUM7Ozs7QUFpRXJELE1BQU0sT0FBTyx3Q0FBd0MsR0FBMEI7Ozs7O0lBQzdFLElBQUksQ0FBQyxHQUFzQjs7Y0FDbkIsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLO1FBQ3ZCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvRSxDQUFDOzs7OztJQUNELFNBQVMsQ0FBQyxHQUFzQjtRQUM5QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7O0lBQ0QsS0FBSyxDQUFDLElBQXlCOztjQUN2QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU07UUFDdkIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJveE1vZGVsU3BhY2VTdHJhdGVneSB7XG4gIGNlbGwoY29sOiBQYmxDb2x1bW5TaXplSW5mbyk6IG51bWJlcjtcbiAgZ3JvdXBDZWxsKGNvbDogUGJsQ29sdW1uU2l6ZUluZm8pOiBudW1iZXI7XG4gIGdyb3VwKGNvbHM6IFBibENvbHVtblNpemVJbmZvW10pOiBudW1iZXI7XG59XG5cbi8qKlxuICogQSBjb2x1bW4gd2lkdGggY2FsY3VsYXRvciB0aGF0IGNhbGN1bGF0ZXMgY29sdW1uIHdpZHRoIGZvciBhIHNwZWNpZmljIGNvbHVtbiBvciBhIGdyb3VwIG9mIGNvbHVtbnMuXG4gKiBJdCBhbHNvIHByb3ZpZGUgdGhlIG1pbmltdW0gcmVxdWlyZWQgcm93IHdpZHRoIGZvciB0aGUgdG90YWwgY29sdW1ucyBhZGRlZCB1cCB0byB0aGF0IHBvaW50LlxuICpcbiAqIFRoZSBgRHluYW1pY0NvbHVtbldpZHRoTG9naWNgIHRha2VzIGludG8gYWNjb3VudCByZWFsLXRpbWUgRE9NIG1lYXN1cmVtZW50cyAoZXNwZWNpYWxseSBib3gtbW9kZWwgbWV0YWRhdGEpLCBoZW5jZSBcImR5bmFtaWNcIi5cbiAqIEl0IHBlcmZvcm1zIHRoZSBjYWxjdWxhdGlvbiBiYXNlZCBvbiBgUGJsQ29sdW1uYCBhbmQgYWN0dWFsIERPTSBzaXplIG1ldGFkYXRhLlxuICpcbiAqIFRoZSBgRHluYW1pY0NvbHVtbldpZHRoTG9naWNgIGhhcyAzIHJlc3BvbnNpYmlsaXRpZXM6XG4gKlxuICogLSBJdCBpcyByZXNwb25zaWJsZSBmb3IgZW5mb3JjaW5nIHRoZSBgbWF4V2lkdGhgIGJvdW5kYXJ5IGNvbnN0cmFpbnQgZm9yIGV2ZXJ5IGNvbHVtbiBpdCBwcm9jZXNzZXMgYnkgY2FsY3VsYXRpbmcgdGhlIGFjdHVhbCB3aWR0aFxuICogb2YgYSBjb2x1bW4gYW5kIGNhbGxpbmcgYFBibENvbHVtbi5jaGVja01heFdpZHRoTG9ja2AgdG8gdmVyaWZ5IGlmIG1heCB3aWR0aCBsb2NrIGhhcyBjaGFuZ2VkIGR1ZSB0byB0aGUgbmV3IGFjdHVhbCB3aWR0aC5cbiAqXG4gKiAtIEl0IGNhbGN1bGF0ZXMgdGhlIGFic29sdXRlIHdpZHRoIGZvciBhIGdyb3VwIG9mIGNvbHVtbnMsIHNvIGBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnRHcm91cENvbHVtbmAgY2FuIGhhdmUgYW4gZXhhY3Qgc2l6ZSB0aGF0IHdyYXBzIGl0J3MgY2hpbGRyZW4uXG4gKlxuICogLSBJdCBjYWxjdWxhdGVzIHRoZSBgbWluaW11bVJvd1dpZHRoYCwgd2hpY2ggcmVwcmVzZW50cyB0aGUgbWluaW11bSB3aWR0aCByZXF1aXJlZCB3aWR0aCBvZiB0aGUgcm93LCBpLmUuIHRhYmxlLlxuICpcbiAqID4gTm90ZSB0aGF0IGFuIGluc3RhbmNlIG9mIGBEeW5hbWljQ29sdW1uV2lkdGhMb2dpY2AgcmVwcmVzZW50cyBhIG9uZS10aW1lIHBhc3MgZm9yIGFsbCBjb2x1bW5zLCBmb3IgZXZlcnkgcnVuIGEgbmV3IGluc3RhbmNlIGlzIHJlcXVpcmVkLlxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0NvbHVtbldpZHRoTG9naWMge1xuICAvKipcbiAgICogV2hlbiB0cnVlLCBpdCBpbmRpY2F0ZXMgdGhhdCBvbmUgKG9yIG1vcmUpIGNvbHVtbnMgaGFzIGNoYW5nZWQgdGhlIG1heCB3aWR0aCBsb2NrIHN0YXRlLlxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIG1heFdpZHRoTG9ja0NoYW5nZWQ6IGJvb2xlYW47XG5cbiAgZ2V0IG1pbmltdW1Sb3dXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluaW11bVJvd1dpZHRoOyB9O1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgY29scyA9IG5ldyBNYXA8UGJsQ29sdW1uU2l6ZUluZm8sIG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBfbWluaW11bVJvd1dpZHRoID0gMDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0cmF0ZWd5OiBCb3hNb2RlbFNwYWNlU3RyYXRlZ3kpIHsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYnJlYWtvdXQgb2YgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIGJyZWFraW5nIGl0IGludG8gdGhlIHdpZHRoIG9mIHRoZSBjb250ZW50IGFuZCB0aGUgcmVzdCBvZiB0aGUgd2lkdGhcbiAgICovXG4gIHdpZHRoQnJlYWtvdXQoY29sdW1uSW5mbzogUGJsQ29sdW1uU2l6ZUluZm8pOiB7IGNvbnRlbnQ6IG51bWJlciwgbm9uQ29udGVudDogbnVtYmVyIH0ge1xuICAgIGNvbnN0IG5vbkNvbnRlbnQgPSB0aGlzLnN0cmF0ZWd5LmNlbGwoY29sdW1uSW5mbyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnQ6IGNvbHVtbkluZm8ud2lkdGggLSBub25Db250ZW50LFxuICAgICAgbm9uQ29udGVudCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIGNvbHVtbiB0byB0aGUgY2FsY3VsYXRpb24uXG4gICAqXG4gICAqIFRoZSBvcGVyYXRpb24gd2lsbCB1cGRhdGUgdGhlIG1pbmltdW0gcmVxdWlyZWQgd2lkdGggYW5kIHRyaWdnZXIgYSBgY2hlY2tNYXhXaWR0aExvY2tgIG9uIHRoZSBjb2x1bW4uXG4gICAqIElmIHRoZSBtYXggd2lkdGggbG9jayBoYXMgY2hhbmdlZCB0aGUgYG1heFdpZHRoTG9ja0NoYW5nZWRgIGlzIHNldCB0byB0cnVlLlxuICAgKlxuICAgKiBBIGNvbHVtbiB0aGF0IHdhcyBwcmV2aW91c2x5IGFkZGVkIGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBvbmNlIGBtYXhXaWR0aExvY2tDaGFuZ2VkYCBpcyBzZXQgdG8gdHJ1ZSBpdCB3aWxsIG5ldmVyIGNoYW5nZS5cbiAgICovXG4gIGFkZENvbHVtbihjb2x1bW5JbmZvOiBQYmxDb2x1bW5TaXplSW5mbyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb2xzLmhhcyhjb2x1bW5JbmZvKSkge1xuICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IGNvbHVtbkluZm87XG4gICAgICBsZXQgbWluV2lkdGggPSBjb2x1bW4ubWluV2lkdGggfHwgMDtcbiAgICAgIGlmIChjb2x1bW4uaXNGaXhlZFdpZHRoKSB7XG4gICAgICAgIG1pbldpZHRoID0gTWF0aC5tYXgoY29sdW1uLnBhcnNlZFdpZHRoLnZhbHVlLCBtaW5XaWR0aCk7XG4gICAgICB9XG4gICAgICBjb25zdCBub25Db250ZW50ID0gdGhpcy5zdHJhdGVneS5jZWxsKGNvbHVtbkluZm8pO1xuICAgICAgY29uc3Qgd2lkdGggPSBtaW5XaWR0aCArIG5vbkNvbnRlbnQ7XG4gICAgICB0aGlzLmNvbHMuc2V0KGNvbHVtbkluZm8sIHdpZHRoKTtcbiAgICAgIHRoaXMuX21pbmltdW1Sb3dXaWR0aCArPSB3aWR0aDtcblxuICAgICAgaWYgKGNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICBjb25zdCBhY3R1YWxXaWR0aCA9IGNvbHVtbkluZm8ud2lkdGggLSBub25Db250ZW50O1xuICAgICAgICBpZiAoY29sdW1uLmNoZWNrTWF4V2lkdGhMb2NrKGFjdHVhbFdpZHRoKSkge1xuICAgICAgICAgIHRoaXMubWF4V2lkdGhMb2NrQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUnVuIGVhY2ggb2YgdGhlIGNvbHVtbnMgdGhyb3VnaCBgYWRkQ29sdW1uYCBhbmQgcmV0dXJucyB0aGUgc3VtIG9mIHRoZSB3aWR0aCBhbGwgY29sdW1ucyB1c2luZ1xuICAgKiB0aGUgYm94IG1vZGVsIHNwYWNlIHN0cmF0ZWd5LlxuICAgKlxuICAgKiBUaGUgcmVzdWx0IHJlcHJlc2VudHMgdGhlIGFic29sdXRlIHdpZHRoIHRvIGJlIHVzZWQgaW4gYSBgUGJsQ29sdW1uR3JvdXBgLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIGEgdGFibGUgaGFzIG11bHRpcGxlIGNvbHVtbi1ncm91cCByb3dzIGVhY2ggY29sdW1uIGlzIHRoZSBjaGlsZCBvZiBtdWx0aXBsZSBncm91cCBjb2x1bW4sIGhlbmNlIGNhbGxpbmcgYGFkZENvbHVtbmAgd2l0aCB0aGVcbiAgICogc2FtZSBncm91cCBtb3JlIHRoZW4gb25jZS4gSG93ZXZlciwgc2luY2UgYGFkZENvbHVtbigpYCBpZ25vcmVzIGNvbHVtbnMgaXQgYWxyZWFkeSBwcm9jZXNzZWQgaXQgaXMgc2FmZS5cbiAgICovXG4gIGFkZEdyb3VwKGNvbHVtbkluZm9zOiBQYmxDb2x1bW5TaXplSW5mb1tdKTogbnVtYmVyIHtcbiAgICBsZXQgc3VtID0gMDtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1uSW5mb3MpIHtcbiAgICAgIHRoaXMuYWRkQ29sdW1uKGMpO1xuICAgICAgc3VtICs9IGMud2lkdGg7XG4gICAgfVxuICAgc3VtIC09IHRoaXMuc3RyYXRlZ3kuZ3JvdXAoY29sdW1uSW5mb3MpO1xuICAgcmV0dXJuIHN1bTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZOiBCb3hNb2RlbFNwYWNlU3RyYXRlZ3kgPSB7XG4gIGNlbGwoY29sOiBQYmxDb2x1bW5TaXplSW5mbyk6IG51bWJlciB7XG4gICAgY29uc3Qgc3R5bGUgPSBjb2wuc3R5bGU7XG4gICAgcmV0dXJuIHN0eWxlID8gcGFyc2VJbnQoc3R5bGUucGFkZGluZ0xlZnQpICsgcGFyc2VJbnQoc3R5bGUucGFkZGluZ1JpZ2h0KSA6IDBcbiAgfSxcbiAgZ3JvdXBDZWxsKGNvbDogUGJsQ29sdW1uU2l6ZUluZm8pOiBudW1iZXIge1xuICAgIHJldHVybiAwO1xuICB9LFxuICBncm91cChjb2xzOiBQYmxDb2x1bW5TaXplSW5mb1tdKTogbnVtYmVyIHtcbiAgICBjb25zdCBsZW4gPSBjb2xzLmxlbmd0aDtcbiAgICByZXR1cm4gbGVuID4gMCAmJiBjb2xzWzBdLnN0eWxlICYmIGNvbHNbbGVuIC0gMV0uc3R5bGUgPyBwYXJzZUludChjb2xzWzBdLnN0eWxlLnBhZGRpbmdMZWZ0KSArIHBhcnNlSW50KGNvbHNbbGVuIC0gMV0uc3R5bGUucGFkZGluZ1JpZ2h0KSA6IDA7XG4gIH1cbn07XG4iXX0=