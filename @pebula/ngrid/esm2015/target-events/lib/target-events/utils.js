/**
 * @fileoverview added by tsickle
 * Generated from: lib/target-events/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, TEvent
 * @param {?} event
 * @return {?}
 */
export function isCellEvent(event) {
    return !!((/** @type {?} */ (event))).cellTarget;
}
/**
 * @template T, TEvent
 * @param {?} event
 * @return {?}
 */
export function isDataCellEvent(event) {
    return isCellEvent(event) && !!((/** @type {?} */ (event))).context;
}
/**
 * Returns true if the element is a row element (`pbl-ngrid-row`, `cdk-row`).
 *
 * This function works under the following assumptions:
 *
 *   - A row element MUST contain a "role" attribute with the value "row"
 * @param {?} element
 * @return {?}
 */
export function isRowContainer(element) {
    return element.getAttribute('role') === 'row';
}
/**
 * Find the cell element that is or wraps the provided element.
 * The element can be a table cell element (any type of) OR a nested element (any level) of a table cell element.
 *
 * This function works under the following assumptions:
 *
 *   - The parent of a cell element is a row element.
 *   - Each row element MUST contain a "role" attribute with the value "row"
 * @param {?} element
 * @return {?}
 */
export function findParentCell(element) {
    while (element.parentElement) {
        if (isRowContainer(element.parentElement)) {
            return element;
        }
        element = element.parentElement;
    }
}
/**
 * Returns the position (index) of the cell (element) among it's siblings.
 * @param {?} cell
 * @return {?}
 */
export function findCellRenderIndex(cell) {
    /** @type {?} */
    let colIndex = 0;
    while (cell = cell.previousElementSibling) {
        colIndex++;
    }
    return colIndex;
}
/**
 * Returns table metadata for a given ROW element.
 * This function works under the following assumptions:
 *
 *   - Each row element MUST contain a "role" attribute with the value "row"
 *   - Each row element MUST contains the type identifier attribute "data-rowtype" (except "data" rows)
 *   - Allowed values for "data-rowtype" are: 'header' | 'meta-header' | 'footer' | 'meta-footer' | 'data'
 *   - Row's representing data items (data-rowtype="data") can omit the type attribute and the function will infer it.
 *
 * NOTE that this function DOES NOT identify subType of `meta-group` (`PblNgridMatrixRow<'header' | 'footer', 'meta-group'>`), it will return it as
 * 'meta`, you need to handle this case specifically.
 *
 * Because detection is based on DOM element position finding the original row index when multiple row containers are set (fixed/style/row) will not work.
 * The rowIndex will be relative to the container, and not the entire table.
 * @param {?} row
 * @param {?} vcRef
 * @return {?}
 */
export function matrixRowFromRow(row, vcRef) {
    /** @type {?} */
    const rowAttrType = (/** @type {?} */ (row.getAttribute('data-rowtype'))) || 'data';
    // TODO: Error if rowAttrType is not one of the allowed values!
    /** @type {?} */
    let rowIndex = 0;
    switch (rowAttrType) {
        case 'data':
            /** @type {?} */
            const sourceRow = row;
            while (row.previousElementSibling) {
                rowIndex++;
                row = row.previousElementSibling;
            }
            rowIndex = Math.min(rowIndex, vcRef.length - 1);
            while (rowIndex > -1) {
                if (((/** @type {?} */ (vcRef.get(rowIndex)))).rootNodes[0] === sourceRow) {
                    return (/** @type {?} */ ({
                        type: 'data',
                        subType: 'data',
                        rowIndex,
                    }));
                }
                rowIndex--;
            }
            return;
        case 'header':
        case 'footer':
            return (/** @type {?} */ ({
                type: rowAttrType,
                subType: 'data',
                rowIndex,
            }));
        default:
            while (row.previousElementSibling && row.previousElementSibling.getAttribute('data-rowtype') === rowAttrType) {
                rowIndex++;
                row = row.previousElementSibling;
            }
            return (/** @type {?} */ ({
                type: rowAttrType === 'meta-footer' ? 'footer' : 'header',
                subType: 'meta',
                rowIndex,
            }));
    }
}
/**
 * Given a list of cells stacked vertically (yAxis) and a list of cells stacked horizontally (xAxis) return all the cells inside (without the provided axis cells).
 *
 * In the following example, all [Yn] cells are provided in the yAxis param and all [Xn] cell in the xAxis params, the returned value will be an array
 * with all cells marked with Z.
 *    Y5  Z  Z  Z
 *    Y4  Z  Z  Z
 *    Y3  Z  Z  Z
 *    Y2  Z  Z  Z
 *    XY1 X2 X3 X4
 * @param {?} contextApi
 * @param {?} xAxis
 * @param {?} yAxis
 * @return {?}
 */
export function getInnerCellsInRect(contextApi, xAxis, yAxis) {
    /** @type {?} */
    const spaceInside = [];
    for (const vCell of yAxis) {
        for (const hCell of xAxis) {
            /** @type {?} */
            const vhContext = contextApi.findRowInCache(vCell.rowIdent).cells[hCell.colIndex];
            if (vhContext) {
                spaceInside.push({ rowIdent: vCell.rowIdent, colIndex: hCell.colIndex });
            }
        }
    }
    return spaceInside;
}
/**
 * @param {?} n1
 * @param {?} n2
 * @return {?}
 */
export function rangeBetween(n1, n2) {
    /** @type {?} */
    const min = Math.min(n1, n2);
    /** @type {?} */
    const max = min === n1 ? n2 : n1;
    /** @type {?} */
    const result = [];
    for (let i = min + 1; i < max; i++) {
        result.push(i);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLFdBQVcsQ0FBdUQsS0FBeUQ7SUFDekksT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxLQUFLLEVBQXlCLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDdkQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBdUQsS0FBeUQ7SUFDN0ksT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQUEsS0FBSyxFQUFxQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3RGLENBQUM7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9CO0lBQ2pELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQUM7QUFDaEQsQ0FBQzs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUFvQjtJQUNqRCxPQUFPLE9BQU8sQ0FBQyxhQUFhLEVBQUU7UUFDNUIsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7S0FDakM7QUFDSCxDQUFDOzs7Ozs7QUFLRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsSUFBYTs7UUFDM0MsUUFBUSxHQUFHLENBQUM7SUFDaEIsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1FBQ3pDLFFBQVEsRUFBRSxDQUFDO0tBQ1o7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJELE1BQU0sVUFBVSxnQkFBZ0Is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QztLQUNoQjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmLCBFbWJlZGRlZFZpZXdSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29udGV4dEFwaSwgR3JpZERhdGFQb2ludCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRNYXRyaXhSb3csIFBibE5ncmlkUm93RXZlbnQsIFBibE5ncmlkQ2VsbEV2ZW50LCBQYmxOZ3JpZERhdGFDZWxsRXZlbnQgfSBmcm9tICcuL2V2ZW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NlbGxFdmVudDxULCBURXZlbnQgZXh0ZW5kcyBFdmVudCA9IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PihldmVudDogUGJsTmdyaWRSb3dFdmVudDxUPiB8IFBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiBldmVudCBpcyBQYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IHtcbiAgcmV0dXJuICEhKGV2ZW50IGFzICBQYmxOZ3JpZENlbGxFdmVudDxUPikuY2VsbFRhcmdldDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YUNlbGxFdmVudDxULCBURXZlbnQgZXh0ZW5kcyBFdmVudCA9IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PihldmVudDogUGJsTmdyaWRSb3dFdmVudDxUPiB8IFBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiBldmVudCBpcyBQYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgVEV2ZW50PiB7XG4gIHJldHVybiBpc0NlbGxFdmVudChldmVudCkgJiYgISEoZXZlbnQgYXMgIFBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBURXZlbnQ+KS5jb250ZXh0O1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBpcyBhIHJvdyBlbGVtZW50IChgcGJsLW5ncmlkLXJvd2AsIGBjZGstcm93YCkuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3b3JrcyB1bmRlciB0aGUgZm9sbG93aW5nIGFzc3VtcHRpb25zOlxuICpcbiAqICAgLSBBIHJvdyBlbGVtZW50IE1VU1QgY29udGFpbiBhIFwicm9sZVwiIGF0dHJpYnV0ZSB3aXRoIHRoZSB2YWx1ZSBcInJvd1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1Jvd0NvbnRhaW5lcihlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3Jvdyc7XG59XG5cbi8qKlxuICogRmluZCB0aGUgY2VsbCBlbGVtZW50IHRoYXQgaXMgb3Igd3JhcHMgdGhlIHByb3ZpZGVkIGVsZW1lbnQuXG4gKiBUaGUgZWxlbWVudCBjYW4gYmUgYSB0YWJsZSBjZWxsIGVsZW1lbnQgKGFueSB0eXBlIG9mKSBPUiBhIG5lc3RlZCBlbGVtZW50IChhbnkgbGV2ZWwpIG9mIGEgdGFibGUgY2VsbCBlbGVtZW50LlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd29ya3MgdW5kZXIgdGhlIGZvbGxvd2luZyBhc3N1bXB0aW9uczpcbiAqXG4gKiAgIC0gVGhlIHBhcmVudCBvZiBhIGNlbGwgZWxlbWVudCBpcyBhIHJvdyBlbGVtZW50LlxuICogICAtIEVhY2ggcm93IGVsZW1lbnQgTVVTVCBjb250YWluIGEgXCJyb2xlXCIgYXR0cmlidXRlIHdpdGggdGhlIHZhbHVlIFwicm93XCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRQYXJlbnRDZWxsKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQge1xuICB3aGlsZSAoZWxlbWVudC5wYXJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGlzUm93Q29udGFpbmVyKGVsZW1lbnQucGFyZW50RWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcG9zaXRpb24gKGluZGV4KSBvZiB0aGUgY2VsbCAoZWxlbWVudCkgYW1vbmcgaXQncyBzaWJsaW5ncy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsUmVuZGVySW5kZXgoY2VsbDogRWxlbWVudCk6IG51bWJlciB7XG4gIGxldCBjb2xJbmRleCA9IDA7XG4gIHdoaWxlIChjZWxsID0gY2VsbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgY29sSW5kZXgrKztcbiAgfVxuICByZXR1cm4gY29sSW5kZXg7XG59XG5cbi8qKlxuICogUmV0dXJucyB0YWJsZSBtZXRhZGF0YSBmb3IgYSBnaXZlbiBST1cgZWxlbWVudC5cbiAqIFRoaXMgZnVuY3Rpb24gd29ya3MgdW5kZXIgdGhlIGZvbGxvd2luZyBhc3N1bXB0aW9uczpcbiAqXG4gKiAgIC0gRWFjaCByb3cgZWxlbWVudCBNVVNUIGNvbnRhaW4gYSBcInJvbGVcIiBhdHRyaWJ1dGUgd2l0aCB0aGUgdmFsdWUgXCJyb3dcIlxuICogICAtIEVhY2ggcm93IGVsZW1lbnQgTVVTVCBjb250YWlucyB0aGUgdHlwZSBpZGVudGlmaWVyIGF0dHJpYnV0ZSBcImRhdGEtcm93dHlwZVwiIChleGNlcHQgXCJkYXRhXCIgcm93cylcbiAqICAgLSBBbGxvd2VkIHZhbHVlcyBmb3IgXCJkYXRhLXJvd3R5cGVcIiBhcmU6ICdoZWFkZXInIHwgJ21ldGEtaGVhZGVyJyB8ICdmb290ZXInIHwgJ21ldGEtZm9vdGVyJyB8ICdkYXRhJ1xuICogICAtIFJvdydzIHJlcHJlc2VudGluZyBkYXRhIGl0ZW1zIChkYXRhLXJvd3R5cGU9XCJkYXRhXCIpIGNhbiBvbWl0IHRoZSB0eXBlIGF0dHJpYnV0ZSBhbmQgdGhlIGZ1bmN0aW9uIHdpbGwgaW5mZXIgaXQuXG4gKlxuICogTk9URSB0aGF0IHRoaXMgZnVuY3Rpb24gRE9FUyBOT1QgaWRlbnRpZnkgc3ViVHlwZSBvZiBgbWV0YS1ncm91cGAgKGBQYmxOZ3JpZE1hdHJpeFJvdzwnaGVhZGVyJyB8ICdmb290ZXInLCAnbWV0YS1ncm91cCc+YCksIGl0IHdpbGwgcmV0dXJuIGl0IGFzXG4gKiAnbWV0YWAsIHlvdSBuZWVkIHRvIGhhbmRsZSB0aGlzIGNhc2Ugc3BlY2lmaWNhbGx5LlxuICpcbiAqIEJlY2F1c2UgZGV0ZWN0aW9uIGlzIGJhc2VkIG9uIERPTSBlbGVtZW50IHBvc2l0aW9uIGZpbmRpbmcgdGhlIG9yaWdpbmFsIHJvdyBpbmRleCB3aGVuIG11bHRpcGxlIHJvdyBjb250YWluZXJzIGFyZSBzZXQgKGZpeGVkL3N0eWxlL3Jvdykgd2lsbCBub3Qgd29yay5cbiAqIFRoZSByb3dJbmRleCB3aWxsIGJlIHJlbGF0aXZlIHRvIHRoZSBjb250YWluZXIsIGFuZCBub3QgdGhlIGVudGlyZSB0YWJsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdHJpeFJvd0Zyb21Sb3cocm93OiBFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpOiBQYmxOZ3JpZE1hdHJpeFJvdzwnZGF0YSc+IHwgUGJsTmdyaWRNYXRyaXhSb3c8J2hlYWRlcicgfCAnZm9vdGVyJz4gfCBQYmxOZ3JpZE1hdHJpeFJvdzwnaGVhZGVyJyB8ICdmb290ZXInLCAnbWV0YSc+IHwgdW5kZWZpbmVkICB7XG4gIGNvbnN0IHJvd0F0dHJUeXBlOiAnaGVhZGVyJyB8ICdkYXRhJyB8ICdmb290ZXInIHwgJ21ldGEtaGVhZGVyJyB8ICdtZXRhLWZvb3RlcicgPSByb3cuZ2V0QXR0cmlidXRlKCdkYXRhLXJvd3R5cGUnKSBhcyBhbnkgfHwgJ2RhdGEnO1xuXG4gIC8vIFRPRE86IEVycm9yIGlmIHJvd0F0dHJUeXBlIGlzIG5vdCBvbmUgb2YgdGhlIGFsbG93ZWQgdmFsdWVzIVxuXG4gIGxldCByb3dJbmRleCA9IDA7XG4gIHN3aXRjaCAocm93QXR0clR5cGUpIHtcbiAgICBjYXNlICdkYXRhJzpcbiAgICAgIGNvbnN0IHNvdXJjZVJvdyA9IHJvdztcbiAgICAgIHdoaWxlIChyb3cucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgICByb3dJbmRleCsrO1xuICAgICAgICByb3cgPSByb3cucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgIH1cbiAgICAgIHJvd0luZGV4ID0gTWF0aC5taW4ocm93SW5kZXgsIHZjUmVmLmxlbmd0aCAtIDEpO1xuICAgICAgd2hpbGUgKHJvd0luZGV4ID4gLTEpIHtcbiAgICAgICAgaWYgKCh2Y1JlZi5nZXQocm93SW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF0gPT09IHNvdXJjZVJvdykge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnZGF0YScsXG4gICAgICAgICAgICBzdWJUeXBlOiAnZGF0YScsXG4gICAgICAgICAgICByb3dJbmRleCxcbiAgICAgICAgICB9IGFzIHsgcm93SW5kZXg6IG51bWJlciB9ICYgUGJsTmdyaWRNYXRyaXhSb3c8J2RhdGEnPjtcbiAgICAgICAgfVxuICAgICAgICByb3dJbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogcm93QXR0clR5cGUsXG4gICAgICAgIHN1YlR5cGU6ICdkYXRhJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICB9IGFzIFBibE5ncmlkTWF0cml4Um93PCdoZWFkZXInIHwgJ2Zvb3Rlcic+O1xuICAgIGRlZmF1bHQ6XG4gICAgICB3aGlsZSAocm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgcm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmcuZ2V0QXR0cmlidXRlKCdkYXRhLXJvd3R5cGUnKSA9PT0gcm93QXR0clR5cGUpIHtcbiAgICAgICAgcm93SW5kZXgrKztcbiAgICAgICAgcm93ID0gcm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiByb3dBdHRyVHlwZSA9PT0gJ21ldGEtZm9vdGVyJyA/ICdmb290ZXInIDogJ2hlYWRlcicsXG4gICAgICAgIHN1YlR5cGU6ICdtZXRhJyxcbiAgICAgICAgcm93SW5kZXgsXG4gICAgICB9IGFzIFBibE5ncmlkTWF0cml4Um93PCdoZWFkZXInIHwgJ2Zvb3RlcicsICdtZXRhJz47XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhIGxpc3Qgb2YgY2VsbHMgc3RhY2tlZCB2ZXJ0aWNhbGx5ICh5QXhpcykgYW5kIGEgbGlzdCBvZiBjZWxscyBzdGFja2VkIGhvcml6b250YWxseSAoeEF4aXMpIHJldHVybiBhbGwgdGhlIGNlbGxzIGluc2lkZSAod2l0aG91dCB0aGUgcHJvdmlkZWQgYXhpcyBjZWxscykuXG4gKlxuICogSW4gdGhlIGZvbGxvd2luZyBleGFtcGxlLCBhbGwgW1luXSBjZWxscyBhcmUgcHJvdmlkZWQgaW4gdGhlIHlBeGlzIHBhcmFtIGFuZCBhbGwgW1huXSBjZWxsIGluIHRoZSB4QXhpcyBwYXJhbXMsIHRoZSByZXR1cm5lZCB2YWx1ZSB3aWxsIGJlIGFuIGFycmF5XG4gKiB3aXRoIGFsbCBjZWxscyBtYXJrZWQgd2l0aCBaLlxuICogICAgWTUgIFogIFogIFpcbiAqICAgIFk0ICBaICBaICBaXG4gKiAgICBZMyAgWiAgWiAgWlxuICogICAgWTIgIFogIFogIFpcbiAqICAgIFhZMSBYMiBYMyBYNFxuICogQHBhcmFtIGNvbnRleHRBcGlcbiAqIEBwYXJhbSB4QXhpc1xuICogQHBhcmFtIHlBeGlzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbm5lckNlbGxzSW5SZWN0KGNvbnRleHRBcGk6IFBibE5ncmlkQ29udGV4dEFwaTxhbnk+LCB4QXhpczogR3JpZERhdGFQb2ludFtdLCB5QXhpczogR3JpZERhdGFQb2ludFtdKTogR3JpZERhdGFQb2ludFtdIHtcbiAgY29uc3Qgc3BhY2VJbnNpZGU6IEdyaWREYXRhUG9pbnRbXSA9IFsgXTtcbiAgZm9yIChjb25zdCB2Q2VsbCBvZiB5QXhpcykge1xuICAgIGZvciAoY29uc3QgaENlbGwgb2YgeEF4aXMpIHtcbiAgICAgIGNvbnN0IHZoQ29udGV4dCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUodkNlbGwucm93SWRlbnQpLmNlbGxzW2hDZWxsLmNvbEluZGV4XTtcbiAgICAgIGlmICh2aENvbnRleHQpIHtcbiAgICAgICAgc3BhY2VJbnNpZGUucHVzaCh7IHJvd0lkZW50OiB2Q2VsbC5yb3dJZGVudCwgY29sSW5kZXg6IGhDZWxsLmNvbEluZGV4IH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3BhY2VJbnNpZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZUJldHdlZW4objE6IG51bWJlciwgbjI6IG51bWJlcik6IG51bWJlcltdIHtcbiAgY29uc3QgbWluID0gTWF0aC5taW4objEsIG4yKTtcbiAgY29uc3QgbWF4ID0gbWluID09PSBuMSA/IG4yIDogbjE7XG5cbiAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gbWluICsgMTsgaSA8IG1heDsgaSsrKSB7XG4gICAgcmVzdWx0LnB1c2goaSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdfQ==