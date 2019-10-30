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
 * @param {?} headerLen The total length of header rows in the table
 * @param {?} dataLen The total length of data rows in the table
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUJBLE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBZ0IsRUFBRSxTQUFpQixFQUFFLE9BQWU7SUFDN0UsT0FBTztRQUNMLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtRQUN0QyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxHQUFHLFNBQVMsQ0FBQyxFQUFFO1FBQ3hGLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsQ0FBQyxFQUFFO0tBQ2xFLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWFELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUFjLEVBQUUsSUFBbUIsRUFBRSxXQUFzQixFQUFFLElBQXVCOztVQUM3RyxLQUFLLEdBQUcsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ2pDLEdBQUcsR0FBRyxDQUFDO0lBRVgsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1FBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMvQjtJQUNELEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO1FBQ3BCLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFOztrQkFDWixHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUMxRCxHQUFHLElBQUksR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsMkRBQTJEO1lBQ3RHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUMxQjtLQUNGO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsYUFBK0IsRUFDL0IsS0FBZ0IsRUFDaEIsYUFBd0IsRUFDeEIsV0FBc0MsRUFDdEMsY0FBeUIsRUFBRTtJQUMxRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRTtRQUM1QixPQUFPLENBQUMsQ0FBQztLQUNWO0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFO1FBQ3RFLE1BQU0sS0FBSyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7S0FDekU7OztVQUdLLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUs7OztVQUV0RCxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSzs7O1FBR3BDLFNBQVMsR0FBRyxDQUFDOztRQUNiLENBQUMsR0FBRyxRQUFRO0lBQ2hCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7O2NBQ0osS0FBSyxHQUFHLENBQUMsR0FBRyxrQkFBa0I7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7a0JBQ2pCLElBQUksR0FBRyxtQkFBQSxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUErQjs7Z0JBQ2hFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ1YsU0FBUyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3REO1NBQ0Y7S0FDRjtJQUVELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7QUFHRCxTQUFTLE9BQU8sQ0FBQyxXQUFzQyxFQUFFLElBQVU7O1VBQzNELEVBQUUsR0FBRyxtQkFBQSxJQUFJLEVBQVc7SUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtRQUM3QixPQUFPLENBQUMsQ0FBQztLQUNWOztVQUNLLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUU7SUFDdkMsT0FBTyxXQUFXLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ2hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWJlZGRlZFZpZXdSZWYsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIFN0aWNreURpcmVjdGlvblZ0ID0gJ3RvcCcgfCAnYm90dG9tJztcbmV4cG9ydCB0eXBlIFN0aWNreURpcmVjdGlvbkh6ID0gJ2xlZnQnIHwgJ3JpZ2h0JztcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzcGxpdCByYW5nZSBmcm9tIGFuIGFnZ3JlZ2F0ZWQgcmFuZ2UuXG4gKiBBbiBhZ2dyZWdhdGVkIHJhbmdlIGRlc2NyaWJlcyB0aGUgcmFuZ2Ugb2YgaGVhZGVyLCBkYXRhIGFuZCBmb290ZXIgcm93cyBjdXJyZW50bHkgaW4gdmlldy5cbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBzcGxpdCB0aGUgcmFuZ2UgaW50byBjb3JlIHNlY3Rpb24sIGVhY2ggaGF2aW5nIGl0J3Mgb3duIHJhbmdlLlxuICpcbiAqIE5vdGUgdGhhdCBhbiBhZ2dyZWdhdGVkIHJhbmdlIGNhbiBzcGFuIG92ZXIgYSBzaW5nbGUgc2VjdGlvbiwgYWxsIHNlY3Rpb25zIG9yIGp1c3QgMiBzZWN0aW9ucy5cbiAqIElmIGEgc2VjdGlvbiBpcyBub3QgcGFydCBvZiB0aGUgYWdncmVnYXRlZCByYW5nZSBpdCdzIHJhbmdlIGlzIGludmFsaWQsIGkuZTogTGlzdFJhbmdlLnN0YXJ0ID49IExpc3RSYW5nZS5lbmQuXG4gKlxuICogQHBhcmFtIHJhbmdlIFRoZSBhZ2dyZWdhdGVkIHJhbmdlXG4gKiBAcGFyYW0gaGVhZGVyTGVuIFRoZSB0b3RhbCBsZW5ndGggb2YgaGVhZGVyIHJvd3MgaW4gdGhlIHRhYmxlXG4gKiBAcGFyYW0gZGF0YUxlbiBUaGUgdG90YWwgbGVuZ3RoIG9mIGRhdGEgcm93cyBpbiB0aGUgdGFibGVcbiAqIEByZXR1cm5zIEEgdHVwbGUgY29udGFpbmluZyB0aGUgcmFuZ2VzIFtoZWFkZXIsIGRhdGEsIGZvb3Rlcl0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdFJhbmdlKHJhbmdlOiBMaXN0UmFuZ2UsIGhlYWRlckxlbjogbnVtYmVyLCBkYXRhTGVuOiBudW1iZXIpOiBbTGlzdFJhbmdlLCBMaXN0UmFuZ2UsIExpc3RSYW5nZV0ge1xuICByZXR1cm4gW1xuICAgIHsgc3RhcnQ6IHJhbmdlLnN0YXJ0LCBlbmQ6IGhlYWRlckxlbiB9LFxuICAgIHsgc3RhcnQ6IE1hdGgubWF4KDAsIHJhbmdlLnN0YXJ0IC0gaGVhZGVyTGVuKSwgZW5kOiBNYXRoLm1heCgwLCByYW5nZS5lbmQgLSBoZWFkZXJMZW4pIH0sXG4gICAgeyBzdGFydDogMCwgZW5kOiBNYXRoLm1heCgwLCByYW5nZS5lbmQgLSAoZGF0YUxlbiArIGhlYWRlckxlbikpIH0sXG4gIF07XG59XG5cbi8qKlxuICogVXBkYXRlIHN0aWNreSBwb3NpdGlvbmluZyB2YWx1ZXMgdG8gdGhlIHJvd3MgdG8gbWF0Y2ggdmlydHVhbCBzY3JvbGwgY29udGVudCBvZmZzZXQuXG4gKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBydW4gYWZ0ZXIgYENka1RhYmxlYCB1cGRhdGVkIHRoZSBzdGlja3kgcm93cy5cbiAqXG4gKiAjIyBXaHlcbiAqIGBDZGtUYWJsZWAgYXBwbGllcyBzdGlja3kgcG9zaXRpb25pbmcgdG8gcm93cyBieSBzZXR0aW5nIHRvcC9ib3R0b20gdmFsdWUgdG8gYDBweGAuXG4gKiBWaXJ0dWFsIHNjcm9sbCB1c2UncyBhIGNvbnRhaW5lciB3aXRoIGFuIG9mZnNldCB0byBzaW11bGF0ZSB0aGUgc2Nyb2xsaW5nLlxuICpcbiAqIFRoZSAyIGRvZXMgbm90IHdvcmsgdG9nZXRoZXIsIHRoZSB2aXJ0dWFsIHNjcm9sbCBvZmZzZXQgd2lsbCB0aHJvdyB0aGUgc3RpY2t5IHJvdyBvdXQgb2YgYm91bmQsIHRodXMgdGhlIHRvcC9ib3R0b20gdmFsdWUgbXVzdCBiZSBjb21wZW5zYXRlZFxuICogYmFzZWQgb24gdGhlIG9mZnNldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZVN0aWNreVJvd3Mob2Zmc2V0OiBudW1iZXIsIHJvd3M6IEhUTUxFbGVtZW50W10sIHN0aWNreVN0YXRlOiBib29sZWFuW10sIHR5cGU6IFN0aWNreURpcmVjdGlvblZ0KTogdm9pZCB7XG4gIGNvbnN0IGNvZWZmID0gdHlwZSA9PT0gJ3RvcCcgPyAtMSA6IDE7XG4gIGxldCBhZ2cgPSAwO1xuXG4gIGlmIChjb2VmZiA9PT0gMSkge1xuICAgIHJvd3MgPSByb3dzLnNsaWNlKCkucmV2ZXJzZSgpO1xuICB9XG4gIGZvciAoY29uc3QgaSBpbiByb3dzKSB7XG4gICAgaWYgKHN0aWNreVN0YXRlW2ldKSB7XG4gICAgICBjb25zdCByb3cgPSByb3dzW2ldO1xuICAgICAgcm93LnN0eWxlW3R5cGVdID0gYCR7Y29lZmYgKiAob2Zmc2V0ICsgKGNvZWZmICogYWdnKSl9cHhgO1xuICAgICAgYWdnICs9IHJvdy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7IC8vIFRPRE86IGNhY2hlIHRoaXMgYW5kIHVwZGF0ZSBjYWNoZSBhY3RpdmVseSAoc2l6ZSBjaGFuZ2UpXG4gICAgICByb3cuc3R5bGUuZGlzcGxheSA9IG51bGw7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogTWVhc3VyZXMgdGhlIGNvbWJpbmVkIHNpemUgKHdpZHRoIGZvciBob3Jpem9udGFsIG9yaWVudGF0aW9uLCBoZWlnaHQgZm9yIHZlcnRpY2FsKSBvZiBhbGwgaXRlbXNcbiAqIGluIHRoZSBzcGVjaWZpZWQgdmlldyB3aXRoaW4gdGhlIHNwZWNpZmllZCByYW5nZS5cbiAqIFRocm93cyBhbiBlcnJvciBpZiB0aGUgcmFuZ2UgaW5jbHVkZXMgaXRlbXMgdGhhdCBhcmUgbm90IGN1cnJlbnRseSByZW5kZXJlZC5cbiAqXG4gKiA+IFRoaXMgaXMgZnVuY3Rpb24gaXMgaWRlbnRpY2FsIHRvIGBDZGtWaXJ0dWFsRm9yT2YubWVhc3VyZVJhbmdlU2l6ZWAgd2l0aCBtaW5vciBhZGp1c3RtZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZVJhbmdlU2l6ZSh2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2U6IExpc3RSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlcmVkUmFuZ2U6IExpc3RSYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5U3RhdGU6IGJvb2xlYW5bXSA9IFtdKTogbnVtYmVyIHtcbiAgaWYgKHJhbmdlLnN0YXJ0ID49IHJhbmdlLmVuZCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYgKHJhbmdlLnN0YXJ0IDwgcmVuZGVyZWRSYW5nZS5zdGFydCB8fCByYW5nZS5lbmQgPiByZW5kZXJlZFJhbmdlLmVuZCkge1xuICAgIHRocm93IEVycm9yKGBFcnJvcjogYXR0ZW1wdGVkIHRvIG1lYXN1cmUgYW4gaXRlbSB0aGF0IGlzbid0IHJlbmRlcmVkLmApO1xuICB9XG5cbiAgLy8gVGhlIGluZGV4IGludG8gdGhlIGxpc3Qgb2YgcmVuZGVyZWQgdmlld3MgZm9yIHRoZSBmaXJzdCBpdGVtIGluIHRoZSByYW5nZS5cbiAgY29uc3QgcmVuZGVyZWRTdGFydEluZGV4ID0gcmFuZ2Uuc3RhcnQgLSByZW5kZXJlZFJhbmdlLnN0YXJ0O1xuICAvLyBUaGUgbGVuZ3RoIG9mIHRoZSByYW5nZSB3ZSdyZSBtZWFzdXJpbmcuXG4gIGNvbnN0IHJhbmdlTGVuID0gcmFuZ2UuZW5kIC0gcmFuZ2Uuc3RhcnQ7XG5cbiAgLy8gTG9vcCBvdmVyIGFsbCByb290IG5vZGVzIGZvciBhbGwgaXRlbXMgaW4gdGhlIHJhbmdlIGFuZCBzdW0gdXAgdGhlaXIgc2l6ZS5cbiAgbGV0IHRvdGFsU2l6ZSA9IDA7XG4gIGxldCBpID0gcmFuZ2VMZW47XG4gIHdoaWxlIChpLS0pIHtcbiAgICBjb25zdCBpbmRleCA9IGkgKyByZW5kZXJlZFN0YXJ0SW5kZXg7XG4gICAgaWYgKCFzdGlja3lTdGF0ZVtpbmRleF0pIHtcbiAgICAgIGNvbnN0IHZpZXcgPSB2aWV3Q29udGFpbmVyLmdldChpbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4gfCBudWxsO1xuICAgICAgbGV0IGogPSB2aWV3ID8gdmlldy5yb290Tm9kZXMubGVuZ3RoIDogMDtcbiAgICAgIHdoaWxlIChqLS0pIHtcbiAgICAgICAgdG90YWxTaXplICs9IGdldFNpemUob3JpZW50YXRpb24sIHZpZXcucm9vdE5vZGVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG90YWxTaXplO1xufVxuXG4vKiogSGVscGVyIHRvIGV4dHJhY3Qgc2l6ZSBmcm9tIGEgRE9NIE5vZGUuICovXG5mdW5jdGlvbiBnZXRTaXplKG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnLCBub2RlOiBOb2RlKTogbnVtYmVyIHtcbiAgY29uc3QgZWwgPSBub2RlIGFzIEVsZW1lbnQ7XG4gIGlmICghZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4gb3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnID8gcmVjdC53aWR0aCA6IHJlY3QuaGVpZ2h0O1xufVxuIl19