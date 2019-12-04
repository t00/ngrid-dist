/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    var coeff = type === 'top' ? -1 : 1;
    /** @type {?} */
    var agg = 0;
    if (coeff === 1) {
        rows = rows.slice().reverse();
    }
    for (var i in rows) {
        if (stickyState[i]) {
            /** @type {?} */
            var row = rows[i];
            row.style[type] = coeff * (offset + (coeff * agg)) + "px";
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
export function measureRangeSize(viewContainer, range, renderedRange, orientation, stickyState) {
    if (stickyState === void 0) { stickyState = []; }
    if (range.start >= range.end) {
        return 0;
    }
    if (range.start < renderedRange.start || range.end > renderedRange.end) {
        throw Error("Error: attempted to measure an item that isn't rendered.");
    }
    // The index into the list of rendered views for the first item in the range.
    /** @type {?} */
    var renderedStartIndex = range.start - renderedRange.start;
    // The length of the range we're measuring.
    /** @type {?} */
    var rangeLen = range.end - range.start;
    // Loop over all root nodes for all items in the range and sum up their size.
    /** @type {?} */
    var totalSize = 0;
    /** @type {?} */
    var i = rangeLen;
    while (i--) {
        /** @type {?} */
        var index = i + renderedStartIndex;
        if (!stickyState[index]) {
            /** @type {?} */
            var view = (/** @type {?} */ (viewContainer.get(index)));
            /** @type {?} */
            var j = view ? view.rootNodes.length : 0;
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
    var el = (/** @type {?} */ (node));
    if (!el.getBoundingClientRect) {
        return 0;
    }
    /** @type {?} */
    var rect = el.getBoundingClientRect();
    return orientation == 'horizontal' ? rect.width : rect.height;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFnQixFQUFFLFNBQWlCLEVBQUUsT0FBZTtJQUM3RSxPQUFPO1FBQ0wsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFO1FBQ3RDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLEVBQUU7UUFDeEYsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEVBQUU7S0FDbEUsQ0FBQztBQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLE1BQWMsRUFBRSxJQUFtQixFQUFFLFdBQXNCLEVBQUUsSUFBdUI7O1FBQzdHLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFDakMsR0FBRyxHQUFHLENBQUM7SUFFWCxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQy9CO0lBQ0QsS0FBSyxJQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDcEIsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUU7O2dCQUNaLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQUksQ0FBQztZQUMxRCxHQUFHLElBQUksR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsMkRBQTJEO1lBQ3RHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUMxQjtLQUNGO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsYUFBK0IsRUFDL0IsS0FBZ0IsRUFDaEIsYUFBd0IsRUFDeEIsV0FBc0MsRUFDdEMsV0FBMkI7SUFBM0IsNEJBQUEsRUFBQSxnQkFBMkI7SUFDMUQsSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDNUIsT0FBTyxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsRUFBRTtRQUN0RSxNQUFNLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0tBQ3pFOzs7UUFHSyxrQkFBa0IsR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLOzs7UUFFdEQsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUs7OztRQUdwQyxTQUFTLEdBQUcsQ0FBQzs7UUFDYixDQUFDLEdBQUcsUUFBUTtJQUNoQixPQUFPLENBQUMsRUFBRSxFQUFFOztZQUNKLEtBQUssR0FBRyxDQUFDLEdBQUcsa0JBQWtCO1FBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7O2dCQUNqQixJQUFJLEdBQUcsbUJBQUEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBK0I7O2dCQUNoRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsRUFBRSxFQUFFO2dCQUNWLFNBQVMsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RDtTQUNGO0tBQ0Y7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDOzs7Ozs7O0FBR0QsU0FBUyxPQUFPLENBQUMsV0FBc0MsRUFBRSxJQUFVOztRQUMzRCxFQUFFLEdBQUcsbUJBQUEsSUFBSSxFQUFXO0lBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUU7UUFDN0IsT0FBTyxDQUFDLENBQUM7S0FDVjs7UUFDSyxJQUFJLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFO0lBQ3ZDLE9BQU8sV0FBVyxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNoRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW1iZWRkZWRWaWV3UmVmLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBTdGlja3lEaXJlY3Rpb25WdCA9ICd0b3AnIHwgJ2JvdHRvbSc7XG5leHBvcnQgdHlwZSBTdGlja3lEaXJlY3Rpb25IeiA9ICdsZWZ0JyB8ICdyaWdodCc7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc3BsaXQgcmFuZ2UgZnJvbSBhbiBhZ2dyZWdhdGVkIHJhbmdlLlxuICogQW4gYWdncmVnYXRlZCByYW5nZSBkZXNjcmliZXMgdGhlIHJhbmdlIG9mIGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyIHJvd3MgY3VycmVudGx5IGluIHZpZXcuXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgc3BsaXQgdGhlIHJhbmdlIGludG8gY29yZSBzZWN0aW9uLCBlYWNoIGhhdmluZyBpdCdzIG93biByYW5nZS5cbiAqXG4gKiBOb3RlIHRoYXQgYW4gYWdncmVnYXRlZCByYW5nZSBjYW4gc3BhbiBvdmVyIGEgc2luZ2xlIHNlY3Rpb24sIGFsbCBzZWN0aW9ucyBvciBqdXN0IDIgc2VjdGlvbnMuXG4gKiBJZiBhIHNlY3Rpb24gaXMgbm90IHBhcnQgb2YgdGhlIGFnZ3JlZ2F0ZWQgcmFuZ2UgaXQncyByYW5nZSBpcyBpbnZhbGlkLCBpLmU6IExpc3RSYW5nZS5zdGFydCA+PSBMaXN0UmFuZ2UuZW5kLlxuICpcbiAqIEBwYXJhbSByYW5nZSBUaGUgYWdncmVnYXRlZCByYW5nZVxuICogQHBhcmFtIGhlYWRlckxlbiBUaGUgdG90YWwgbGVuZ3RoIG9mIGhlYWRlciByb3dzIGluIHRoZSBncmlkXG4gKiBAcGFyYW0gZGF0YUxlbiBUaGUgdG90YWwgbGVuZ3RoIG9mIGRhdGEgcm93cyBpbiB0aGUgZ3JpZFxuICogQHJldHVybnMgQSB0dXBsZSBjb250YWluaW5nIHRoZSByYW5nZXMgW2hlYWRlciwgZGF0YSwgZm9vdGVyXS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0UmFuZ2UocmFuZ2U6IExpc3RSYW5nZSwgaGVhZGVyTGVuOiBudW1iZXIsIGRhdGFMZW46IG51bWJlcik6IFtMaXN0UmFuZ2UsIExpc3RSYW5nZSwgTGlzdFJhbmdlXSB7XG4gIHJldHVybiBbXG4gICAgeyBzdGFydDogcmFuZ2Uuc3RhcnQsIGVuZDogaGVhZGVyTGVuIH0sXG4gICAgeyBzdGFydDogTWF0aC5tYXgoMCwgcmFuZ2Uuc3RhcnQgLSBoZWFkZXJMZW4pLCBlbmQ6IE1hdGgubWF4KDAsIHJhbmdlLmVuZCAtIGhlYWRlckxlbikgfSxcbiAgICB7IHN0YXJ0OiAwLCBlbmQ6IE1hdGgubWF4KDAsIHJhbmdlLmVuZCAtIChkYXRhTGVuICsgaGVhZGVyTGVuKSkgfSxcbiAgXTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgc3RpY2t5IHBvc2l0aW9uaW5nIHZhbHVlcyB0byB0aGUgcm93cyB0byBtYXRjaCB2aXJ0dWFsIHNjcm9sbCBjb250ZW50IG9mZnNldC5cbiAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIHJ1biBhZnRlciBgQ2RrVGFibGVgIHVwZGF0ZWQgdGhlIHN0aWNreSByb3dzLlxuICpcbiAqICMjIFdoeVxuICogYENka1RhYmxlYCBhcHBsaWVzIHN0aWNreSBwb3NpdGlvbmluZyB0byByb3dzIGJ5IHNldHRpbmcgdG9wL2JvdHRvbSB2YWx1ZSB0byBgMHB4YC5cbiAqIFZpcnR1YWwgc2Nyb2xsIHVzZSdzIGEgY29udGFpbmVyIHdpdGggYW4gb2Zmc2V0IHRvIHNpbXVsYXRlIHRoZSBzY3JvbGxpbmcuXG4gKlxuICogVGhlIDIgZG9lcyBub3Qgd29yayB0b2dldGhlciwgdGhlIHZpcnR1YWwgc2Nyb2xsIG9mZnNldCB3aWxsIHRocm93IHRoZSBzdGlja3kgcm93IG91dCBvZiBib3VuZCwgdGh1cyB0aGUgdG9wL2JvdHRvbSB2YWx1ZSBtdXN0IGJlIGNvbXBlbnNhdGVkXG4gKiBiYXNlZCBvbiB0aGUgb2Zmc2V0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RpY2t5Um93cyhvZmZzZXQ6IG51bWJlciwgcm93czogSFRNTEVsZW1lbnRbXSwgc3RpY2t5U3RhdGU6IGJvb2xlYW5bXSwgdHlwZTogU3RpY2t5RGlyZWN0aW9uVnQpOiB2b2lkIHtcbiAgY29uc3QgY29lZmYgPSB0eXBlID09PSAndG9wJyA/IC0xIDogMTtcbiAgbGV0IGFnZyA9IDA7XG5cbiAgaWYgKGNvZWZmID09PSAxKSB7XG4gICAgcm93cyA9IHJvd3Muc2xpY2UoKS5yZXZlcnNlKCk7XG4gIH1cbiAgZm9yIChjb25zdCBpIGluIHJvd3MpIHtcbiAgICBpZiAoc3RpY2t5U3RhdGVbaV0pIHtcbiAgICAgIGNvbnN0IHJvdyA9IHJvd3NbaV07XG4gICAgICByb3cuc3R5bGVbdHlwZV0gPSBgJHtjb2VmZiAqIChvZmZzZXQgKyAoY29lZmYgKiBhZ2cpKX1weGA7XG4gICAgICBhZ2cgKz0gcm93LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDsgLy8gVE9ETzogY2FjaGUgdGhpcyBhbmQgdXBkYXRlIGNhY2hlIGFjdGl2ZWx5IChzaXplIGNoYW5nZSlcbiAgICAgIHJvdy5zdHlsZS5kaXNwbGF5ID0gbnVsbDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBNZWFzdXJlcyB0aGUgY29tYmluZWQgc2l6ZSAod2lkdGggZm9yIGhvcml6b250YWwgb3JpZW50YXRpb24sIGhlaWdodCBmb3IgdmVydGljYWwpIG9mIGFsbCBpdGVtc1xuICogaW4gdGhlIHNwZWNpZmllZCB2aWV3IHdpdGhpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLlxuICogVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByYW5nZSBpbmNsdWRlcyBpdGVtcyB0aGF0IGFyZSBub3QgY3VycmVudGx5IHJlbmRlcmVkLlxuICpcbiAqID4gVGhpcyBpcyBmdW5jdGlvbiBpcyBpZGVudGljYWwgdG8gYENka1ZpcnR1YWxGb3JPZi5tZWFzdXJlUmFuZ2VTaXplYCB3aXRoIG1pbm9yIGFkanVzdG1lbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZWFzdXJlUmFuZ2VTaXplKHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZTogTGlzdFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyZWRSYW5nZTogTGlzdFJhbmdlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lTdGF0ZTogYm9vbGVhbltdID0gW10pOiBudW1iZXIge1xuICBpZiAocmFuZ2Uuc3RhcnQgPj0gcmFuZ2UuZW5kKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAocmFuZ2Uuc3RhcnQgPCByZW5kZXJlZFJhbmdlLnN0YXJ0IHx8IHJhbmdlLmVuZCA+IHJlbmRlcmVkUmFuZ2UuZW5kKSB7XG4gICAgdGhyb3cgRXJyb3IoYEVycm9yOiBhdHRlbXB0ZWQgdG8gbWVhc3VyZSBhbiBpdGVtIHRoYXQgaXNuJ3QgcmVuZGVyZWQuYCk7XG4gIH1cblxuICAvLyBUaGUgaW5kZXggaW50byB0aGUgbGlzdCBvZiByZW5kZXJlZCB2aWV3cyBmb3IgdGhlIGZpcnN0IGl0ZW0gaW4gdGhlIHJhbmdlLlxuICBjb25zdCByZW5kZXJlZFN0YXJ0SW5kZXggPSByYW5nZS5zdGFydCAtIHJlbmRlcmVkUmFuZ2Uuc3RhcnQ7XG4gIC8vIFRoZSBsZW5ndGggb2YgdGhlIHJhbmdlIHdlJ3JlIG1lYXN1cmluZy5cbiAgY29uc3QgcmFuZ2VMZW4gPSByYW5nZS5lbmQgLSByYW5nZS5zdGFydDtcblxuICAvLyBMb29wIG92ZXIgYWxsIHJvb3Qgbm9kZXMgZm9yIGFsbCBpdGVtcyBpbiB0aGUgcmFuZ2UgYW5kIHN1bSB1cCB0aGVpciBzaXplLlxuICBsZXQgdG90YWxTaXplID0gMDtcbiAgbGV0IGkgPSByYW5nZUxlbjtcbiAgd2hpbGUgKGktLSkge1xuICAgIGNvbnN0IGluZGV4ID0gaSArIHJlbmRlcmVkU3RhcnRJbmRleDtcbiAgICBpZiAoIXN0aWNreVN0YXRlW2luZGV4XSkge1xuICAgICAgY29uc3QgdmlldyA9IHZpZXdDb250YWluZXIuZ2V0KGluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PiB8IG51bGw7XG4gICAgICBsZXQgaiA9IHZpZXcgPyB2aWV3LnJvb3ROb2Rlcy5sZW5ndGggOiAwO1xuICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICB0b3RhbFNpemUgKz0gZ2V0U2l6ZShvcmllbnRhdGlvbiwgdmlldy5yb290Tm9kZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0b3RhbFNpemU7XG59XG5cbi8qKiBIZWxwZXIgdG8gZXh0cmFjdCBzaXplIGZyb20gYSBET00gTm9kZS4gKi9cbmZ1bmN0aW9uIGdldFNpemUob3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcsIG5vZGU6IE5vZGUpOiBudW1iZXIge1xuICBjb25zdCBlbCA9IG5vZGUgYXMgRWxlbWVudDtcbiAgaWYgKCFlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiBvcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcgPyByZWN0LndpZHRoIDogcmVjdC5oZWlnaHQ7XG59XG4iXX0=