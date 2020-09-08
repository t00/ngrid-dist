/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Returns the split range from an aggregated range.
 * An aggregated range describes the range of header, data and footer rows currently in view.
 * This function will split the range into core section, each having it's own range.
 *
 * Note that an aggregated range can span over a single section, all sections or just 2 sections.
 * If a section is not part of the aggregated range it's range is invalid, i.e: ListRange.start >= ListRange.end.
 *
 * @param {?} range The aggregated range
 * @param {?} headerLen The total length of header rows in the grid
 * @param {?} dataLen The total length of data rows in the grid
 * @return {?} A tuple containing the ranges [header, data, footer].
 */
export function splitRange(range, headerLen, dataLen) {
    return [
        { start: range.start, end: headerLen },
        { start: Math.max(0, range.start - headerLen), end: Math.max(0, range.end - headerLen) },
        { start: 0, end: Math.max(0, range.end - (dataLen + headerLen)) },
    ];
}
/**
 * Update sticky positioning values to the rows to match virtual scroll content offset.
 * This function should run after `CdkTable` updated the sticky rows.
 *
 * ## Why
 * `CdkTable` applies sticky positioning to rows by setting top/bottom value to `0px`.
 * Virtual scroll use's a container with an offset to simulate the scrolling.
 *
 * The 2 does not work together, the virtual scroll offset will throw the sticky row out of bound, thus the top/bottom value must be compensated
 * based on the offset.
 * @param {?} offset
 * @param {?} rows
 * @param {?} stickyState
 * @param {?} type
 * @return {?}
 */
export function updateStickyRows(offset, rows, stickyState, type) {
    /** @type {?} */
    const coeff = type === 'top' ? -1 : 1;
    /** @type {?} */
    let agg = 0;
    if (coeff === 1) {
        rows = rows.slice().reverse();
    }
    for (const i in rows) {
        if (stickyState[i]) {
            /** @type {?} */
            const row = rows[i];
            row.style[type] = `${coeff * (offset + (coeff * agg))}px`;
            agg += row.getBoundingClientRect().height; // TODO: cache this and update cache actively (size change)
            row.style.display = null;
        }
    }
}
/**
 * Measures the combined size (width for horizontal orientation, height for vertical) of all items
 * in the specified view within the specified range.
 * Throws an error if the range includes items that are not currently rendered.
 *
 * > This is function is identical to `CdkVirtualForOf.measureRangeSize` with minor adjustments
 * @param {?} viewContainer
 * @param {?} range
 * @param {?} renderedRange
 * @param {?} orientation
 * @param {?=} stickyState
 * @return {?}
 */
export function measureRangeSize(viewContainer, range, renderedRange, orientation, stickyState = []) {
    if (range.start >= range.end) {
        return 0;
    }
    if (range.start < renderedRange.start || range.end > renderedRange.end) {
        throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    // The index into the list of rendered views for the first item in the range.
    /** @type {?} */
    const renderedStartIndex = range.start - renderedRange.start;
    // The length of the range we're measuring.
    /** @type {?} */
    const rangeLen = range.end - range.start;
    // Loop over all root nodes for all items in the range and sum up their size.
    /** @type {?} */
    let totalSize = 0;
    /** @type {?} */
    let i = rangeLen;
    while (i--) {
        /** @type {?} */
        const index = i + renderedStartIndex;
        if (!stickyState[index]) {
            /** @type {?} */
            const view = (/** @type {?} */ (viewContainer.get(index)));
            /** @type {?} */
            let j = view ? view.rootNodes.length : 0;
            while (j--) {
                totalSize += getSize(orientation, view.rootNodes[j]);
            }
        }
    }
    return totalSize;
}
/**
 * Helper to extract size from a DOM Node.
 * @param {?} orientation
 * @param {?} node
 * @return {?}
 */
function getSize(orientation, node) {
    /** @type {?} */
    const el = (/** @type {?} */ (node));
    if (!el.getBoundingClientRect) {
        return 0;
    }
    /** @type {?} */
    const rect = el.getBoundingClientRect();
    return orientation == 'horizontal' ? rect.width : rect.height;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBZ0IsRUFBRSxTQUFpQixFQUFFLE9BQWU7SUFDN0UsT0FBTztRQUNMLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtRQUN0QyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxFQUFFO1FBQ3hGLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFO0tBQ2xFLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWFELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsSUFBbUIsRUFBRSxXQUFzQixFQUFFLElBQXVCOztVQUM3RyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ2pDLEdBQUcsR0FBRyxDQUFDO0lBRVgsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMvQjtJQUNELEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ3BCLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFOztrQkFDWixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxRCxHQUFHLElBQUksR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsMkRBQTJEO1lBQ3RHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUMxQjtLQUNGO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsYUFBK0IsRUFDL0IsS0FBZ0IsRUFDaEIsYUFBd0IsRUFDeEIsV0FBc0MsRUFDdEMsY0FBeUIsRUFBRTtJQUMxRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUM1QixPQUFPLENBQUMsQ0FBQztLQUNWO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFO1FBQ3RFLE1BQU0sS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7S0FDekU7OztVQUdLLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUs7OztVQUV0RCxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSzs7O1FBR3BDLFNBQVMsR0FBRyxDQUFDOztRQUNiLENBQUMsR0FBRyxRQUFRO0lBQ2hCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7O2NBQ0osS0FBSyxHQUFHLENBQUMsR0FBRyxrQkFBa0I7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7a0JBQ2pCLElBQUksR0FBRyxtQkFBQSxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUErQjs7Z0JBQ2hFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3REO1NBQ0Y7S0FDRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFHRCxTQUFTLE9BQU8sQ0FBQyxXQUFzQyxFQUFFLElBQVU7O1VBQzNELEVBQUUsR0FBRyxtQkFBQSxJQUFJLEVBQVc7SUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUM3QixPQUFPLENBQUMsQ0FBQztLQUNWOztVQUNLLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUU7SUFDdkMsT0FBTyxXQUFXLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWJlZGRlZFZpZXdSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFN0aWNreURpcmVjdGlvblZ0ID0gJ3RvcCcgfCAnYm90dG9tJztcbmV4cG9ydCB0eXBlIFN0aWNreURpcmVjdGlvbkh6ID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzcGxpdCByYW5nZSBmcm9tIGFuIGFnZ3JlZ2F0ZWQgcmFuZ2UuXG4gKiBBbiBhZ2dyZWdhdGVkIHJhbmdlIGRlc2NyaWJlcyB0aGUgcmFuZ2Ugb2YgaGVhZGVyLCBkYXRhIGFuZCBmb290ZXIgcm93cyBjdXJyZW50bHkgaW4gdmlldy5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBzcGxpdCB0aGUgcmFuZ2UgaW50byBjb3JlIHNlY3Rpb24sIGVhY2ggaGF2aW5nIGl0J3Mgb3duIHJhbmdlLlxuICpcbiAqIE5vdGUgdGhhdCBhbiBhZ2dyZWdhdGVkIHJhbmdlIGNhbiBzcGFuIG92ZXIgYSBzaW5nbGUgc2VjdGlvbiwgYWxsIHNlY3Rpb25zIG9yIGp1c3QgMiBzZWN0aW9ucy5cbiAqIElmIGEgc2VjdGlvbiBpcyBub3QgcGFydCBvZiB0aGUgYWdncmVnYXRlZCByYW5nZSBpdCdzIHJhbmdlIGlzIGludmFsaWQsIGkuZTogTGlzdFJhbmdlLnN0YXJ0ID49IExpc3RSYW5nZS5lbmQuXG4gKlxuICogQHBhcmFtIHJhbmdlIFRoZSBhZ2dyZWdhdGVkIHJhbmdlXG4gKiBAcGFyYW0gaGVhZGVyTGVuIFRoZSB0b3RhbCBsZW5ndGggb2YgaGVhZGVyIHJvd3MgaW4gdGhlIGdyaWRcbiAqIEBwYXJhbSBkYXRhTGVuIFRoZSB0b3RhbCBsZW5ndGggb2YgZGF0YSByb3dzIGluIHRoZSBncmlkXG4gKiBAcmV0dXJucyBBIHR1cGxlIGNvbnRhaW5pbmcgdGhlIHJhbmdlcyBbaGVhZGVyLCBkYXRhLCBmb290ZXJdLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3BsaXRSYW5nZShyYW5nZTogTGlzdFJhbmdlLCBoZWFkZXJMZW46IG51bWJlciwgZGF0YUxlbjogbnVtYmVyKTogW0xpc3RSYW5nZSwgTGlzdFJhbmdlLCBMaXN0UmFuZ2VdIHtcbiAgcmV0dXJuIFtcbiAgICB7IHN0YXJ0OiByYW5nZS5zdGFydCwgZW5kOiBoZWFkZXJMZW4gfSxcbiAgICB7IHN0YXJ0OiBNYXRoLm1heCgwLCByYW5nZS5zdGFydCAtIGhlYWRlckxlbiksIGVuZDogTWF0aC5tYXgoMCwgcmFuZ2UuZW5kIC0gaGVhZGVyTGVuKSB9LFxuICAgIHsgc3RhcnQ6IDAsIGVuZDogTWF0aC5tYXgoMCwgcmFuZ2UuZW5kIC0gKGRhdGFMZW4gKyBoZWFkZXJMZW4pKSB9LFxuICBdO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBzdGlja3kgcG9zaXRpb25pbmcgdmFsdWVzIHRvIHRoZSByb3dzIHRvIG1hdGNoIHZpcnR1YWwgc2Nyb2xsIGNvbnRlbnQgb2Zmc2V0LlxuICogVGhpcyBmdW5jdGlvbiBzaG91bGQgcnVuIGFmdGVyIGBDZGtUYWJsZWAgdXBkYXRlZCB0aGUgc3RpY2t5IHJvd3MuXG4gKlxuICogIyMgV2h5XG4gKiBgQ2RrVGFibGVgIGFwcGxpZXMgc3RpY2t5IHBvc2l0aW9uaW5nIHRvIHJvd3MgYnkgc2V0dGluZyB0b3AvYm90dG9tIHZhbHVlIHRvIGAwcHhgLlxuICogVmlydHVhbCBzY3JvbGwgdXNlJ3MgYSBjb250YWluZXIgd2l0aCBhbiBvZmZzZXQgdG8gc2ltdWxhdGUgdGhlIHNjcm9sbGluZy5cbiAqXG4gKiBUaGUgMiBkb2VzIG5vdCB3b3JrIHRvZ2V0aGVyLCB0aGUgdmlydHVhbCBzY3JvbGwgb2Zmc2V0IHdpbGwgdGhyb3cgdGhlIHN0aWNreSByb3cgb3V0IG9mIGJvdW5kLCB0aHVzIHRoZSB0b3AvYm90dG9tIHZhbHVlIG11c3QgYmUgY29tcGVuc2F0ZWRcbiAqIGJhc2VkIG9uIHRoZSBvZmZzZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTdGlja3lSb3dzKG9mZnNldDogbnVtYmVyLCByb3dzOiBIVE1MRWxlbWVudFtdLCBzdGlja3lTdGF0ZTogYm9vbGVhbltdLCB0eXBlOiBTdGlja3lEaXJlY3Rpb25WdCk6IHZvaWQge1xuICBjb25zdCBjb2VmZiA9IHR5cGUgPT09ICd0b3AnID8gLTEgOiAxO1xuICBsZXQgYWdnID0gMDtcblxuICBpZiAoY29lZmYgPT09IDEpIHtcbiAgICByb3dzID0gcm93cy5zbGljZSgpLnJldmVyc2UoKTtcbiAgfVxuICBmb3IgKGNvbnN0IGkgaW4gcm93cykge1xuICAgIGlmIChzdGlja3lTdGF0ZVtpXSkge1xuICAgICAgY29uc3Qgcm93ID0gcm93c1tpXTtcbiAgICAgIHJvdy5zdHlsZVt0eXBlXSA9IGAke2NvZWZmICogKG9mZnNldCArIChjb2VmZiAqIGFnZykpfXB4YDtcbiAgICAgIGFnZyArPSByb3cuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0OyAvLyBUT0RPOiBjYWNoZSB0aGlzIGFuZCB1cGRhdGUgY2FjaGUgYWN0aXZlbHkgKHNpemUgY2hhbmdlKVxuICAgICAgcm93LnN0eWxlLmRpc3BsYXkgPSBudWxsO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1lYXN1cmVzIHRoZSBjb21iaW5lZCBzaXplICh3aWR0aCBmb3IgaG9yaXpvbnRhbCBvcmllbnRhdGlvbiwgaGVpZ2h0IGZvciB2ZXJ0aWNhbCkgb2YgYWxsIGl0ZW1zXG4gKiBpbiB0aGUgc3BlY2lmaWVkIHZpZXcgd2l0aGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UuXG4gKiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJhbmdlIGluY2x1ZGVzIGl0ZW1zIHRoYXQgYXJlIG5vdCBjdXJyZW50bHkgcmVuZGVyZWQuXG4gKlxuICogPiBUaGlzIGlzIGZ1bmN0aW9uIGlzIGlkZW50aWNhbCB0byBgQ2RrVmlydHVhbEZvck9mLm1lYXN1cmVSYW5nZVNpemVgIHdpdGggbWlub3IgYWRqdXN0bWVudHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lYXN1cmVSYW5nZVNpemUodmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlOiBMaXN0UmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJlZFJhbmdlOiBMaXN0UmFuZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreVN0YXRlOiBib29sZWFuW10gPSBbXSk6IG51bWJlciB7XG4gIGlmIChyYW5nZS5zdGFydCA+PSByYW5nZS5lbmQpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChyYW5nZS5zdGFydCA8IHJlbmRlcmVkUmFuZ2Uuc3RhcnQgfHwgcmFuZ2UuZW5kID4gcmVuZGVyZWRSYW5nZS5lbmQpIHtcbiAgICB0aHJvdyBFcnJvcihgRXJyb3I6IGF0dGVtcHRlZCB0byBtZWFzdXJlIGFuIGl0ZW0gdGhhdCBpc24ndCByZW5kZXJlZC5gKTtcbiAgfVxuXG4gIC8vIFRoZSBpbmRleCBpbnRvIHRoZSBsaXN0IG9mIHJlbmRlcmVkIHZpZXdzIGZvciB0aGUgZmlyc3QgaXRlbSBpbiB0aGUgcmFuZ2UuXG4gIGNvbnN0IHJlbmRlcmVkU3RhcnRJbmRleCA9IHJhbmdlLnN0YXJ0IC0gcmVuZGVyZWRSYW5nZS5zdGFydDtcbiAgLy8gVGhlIGxlbmd0aCBvZiB0aGUgcmFuZ2Ugd2UncmUgbWVhc3VyaW5nLlxuICBjb25zdCByYW5nZUxlbiA9IHJhbmdlLmVuZCAtIHJhbmdlLnN0YXJ0O1xuXG4gIC8vIExvb3Agb3ZlciBhbGwgcm9vdCBub2RlcyBmb3IgYWxsIGl0ZW1zIGluIHRoZSByYW5nZSBhbmQgc3VtIHVwIHRoZWlyIHNpemUuXG4gIGxldCB0b3RhbFNpemUgPSAwO1xuICBsZXQgaSA9IHJhbmdlTGVuO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgY29uc3QgaW5kZXggPSBpICsgcmVuZGVyZWRTdGFydEluZGV4O1xuICAgIGlmICghc3RpY2t5U3RhdGVbaW5kZXhdKSB7XG4gICAgICBjb25zdCB2aWV3ID0gdmlld0NvbnRhaW5lci5nZXQoaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+IHwgbnVsbDtcbiAgICAgIGxldCBqID0gdmlldyA/IHZpZXcucm9vdE5vZGVzLmxlbmd0aCA6IDA7XG4gICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgIHRvdGFsU2l6ZSArPSBnZXRTaXplKG9yaWVudGF0aW9uLCB2aWV3LnJvb3ROb2Rlc1tqXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvdGFsU2l6ZTtcbn1cblxuLyoqIEhlbHBlciB0byBleHRyYWN0IHNpemUgZnJvbSBhIERPTSBOb2RlLiAqL1xuZnVuY3Rpb24gZ2V0U2l6ZShvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJywgbm9kZTogTm9kZSk6IG51bWJlciB7XG4gIGNvbnN0IGVsID0gbm9kZSBhcyBFbGVtZW50O1xuICBpZiAoIWVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIG9yaWVudGF0aW9uID09ICdob3Jpem9udGFsJyA/IHJlY3Qud2lkdGggOiByZWN0LmhlaWdodDtcbn1cbiJdfQ==