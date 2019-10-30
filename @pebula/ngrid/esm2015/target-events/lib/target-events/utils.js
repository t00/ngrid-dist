/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxNQUFNLFVBQVUsV0FBVyxDQUF1RCxLQUF5RDtJQUN6SSxPQUFPLENBQUMsQ0FBQyxDQUFDLG1CQUFBLEtBQUssRUFBeUIsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUN2RCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUF1RCxLQUF5RDtJQUM3SSxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxLQUFLLEVBQXFDLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDdEYsQ0FBQzs7Ozs7Ozs7OztBQVNELE1BQU0sVUFBVSxjQUFjLENBQUMsT0FBb0I7SUFDakQsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FBQztBQUNoRCxDQUFDOzs7Ozs7Ozs7Ozs7QUFXRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9CO0lBQ2pELE9BQU8sT0FBTyxDQUFDLGFBQWEsRUFBRTtRQUM1QixJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDekMsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFDRCxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUNqQztBQUNILENBQUM7Ozs7OztBQUtELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUFhOztRQUMzQyxRQUFRLEdBQUcsQ0FBQztJQUNoQixPQUFPLElBQUksR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUU7UUFDekMsUUFBUSxFQUFFLENBQUM7S0FDWjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkQsTUFBTSxVQUFVLGdCQUFnQixD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O0tBQ2hCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDb250YWluZXJSZWYsIEVtYmVkZGVkVmlld1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb250ZXh0QXBpLCBHcmlkRGF0YVBvaW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1hdHJpeFJvdywgUGJsTmdyaWRSb3dFdmVudCwgUGJsTmdyaWRDZWxsRXZlbnQsIFBibE5ncmlkRGF0YUNlbGxFdmVudCB9IGZyb20gJy4vZXZlbnRzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2VsbEV2ZW50PFQsIFRFdmVudCBleHRlbmRzIEV2ZW50ID0gTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+KGV2ZW50OiBQYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IGV2ZW50IGlzIFBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4ge1xuICByZXR1cm4gISEoZXZlbnQgYXMgIFBibE5ncmlkQ2VsbEV2ZW50PFQ+KS5jZWxsVGFyZ2V0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEYXRhQ2VsbEV2ZW50PFQsIFRFdmVudCBleHRlbmRzIEV2ZW50ID0gTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+KGV2ZW50OiBQYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IGV2ZW50IGlzIFBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBURXZlbnQ+IHtcbiAgcmV0dXJuIGlzQ2VsbEV2ZW50KGV2ZW50KSAmJiAhIShldmVudCBhcyAgUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIFRFdmVudD4pLmNvbnRleHQ7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IGlzIGEgcm93IGVsZW1lbnQgKGBwYmwtbmdyaWQtcm93YCwgYGNkay1yb3dgKS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdvcmtzIHVuZGVyIHRoZSBmb2xsb3dpbmcgYXNzdW1wdGlvbnM6XG4gKlxuICogICAtIEEgcm93IGVsZW1lbnQgTVVTVCBjb250YWluIGEgXCJyb2xlXCIgYXR0cmlidXRlIHdpdGggdGhlIHZhbHVlIFwicm93XCJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUm93Q29udGFpbmVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZSgncm9sZScpID09PSAncm93Jztcbn1cblxuLyoqXG4gKiBGaW5kIHRoZSBjZWxsIGVsZW1lbnQgdGhhdCBpcyBvciB3cmFwcyB0aGUgcHJvdmlkZWQgZWxlbWVudC5cbiAqIFRoZSBlbGVtZW50IGNhbiBiZSBhIHRhYmxlIGNlbGwgZWxlbWVudCAoYW55IHR5cGUgb2YpIE9SIGEgbmVzdGVkIGVsZW1lbnQgKGFueSBsZXZlbCkgb2YgYSB0YWJsZSBjZWxsIGVsZW1lbnQuXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3b3JrcyB1bmRlciB0aGUgZm9sbG93aW5nIGFzc3VtcHRpb25zOlxuICpcbiAqICAgLSBUaGUgcGFyZW50IG9mIGEgY2VsbCBlbGVtZW50IGlzIGEgcm93IGVsZW1lbnQuXG4gKiAgIC0gRWFjaCByb3cgZWxlbWVudCBNVVNUIGNvbnRhaW4gYSBcInJvbGVcIiBhdHRyaWJ1dGUgd2l0aCB0aGUgdmFsdWUgXCJyb3dcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZFBhcmVudENlbGwoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gIHdoaWxlIChlbGVtZW50LnBhcmVudEVsZW1lbnQpIHtcbiAgICBpZiAoaXNSb3dDb250YWluZXIoZWxlbWVudC5wYXJlbnRFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiAoaW5kZXgpIG9mIHRoZSBjZWxsIChlbGVtZW50KSBhbW9uZyBpdCdzIHNpYmxpbmdzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmluZENlbGxSZW5kZXJJbmRleChjZWxsOiBFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IGNvbEluZGV4ID0gMDtcbiAgd2hpbGUgKGNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICBjb2xJbmRleCsrO1xuICB9XG4gIHJldHVybiBjb2xJbmRleDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRhYmxlIG1ldGFkYXRhIGZvciBhIGdpdmVuIFJPVyBlbGVtZW50LlxuICogVGhpcyBmdW5jdGlvbiB3b3JrcyB1bmRlciB0aGUgZm9sbG93aW5nIGFzc3VtcHRpb25zOlxuICpcbiAqICAgLSBFYWNoIHJvdyBlbGVtZW50IE1VU1QgY29udGFpbiBhIFwicm9sZVwiIGF0dHJpYnV0ZSB3aXRoIHRoZSB2YWx1ZSBcInJvd1wiXG4gKiAgIC0gRWFjaCByb3cgZWxlbWVudCBNVVNUIGNvbnRhaW5zIHRoZSB0eXBlIGlkZW50aWZpZXIgYXR0cmlidXRlIFwiZGF0YS1yb3d0eXBlXCIgKGV4Y2VwdCBcImRhdGFcIiByb3dzKVxuICogICAtIEFsbG93ZWQgdmFsdWVzIGZvciBcImRhdGEtcm93dHlwZVwiIGFyZTogJ2hlYWRlcicgfCAnbWV0YS1oZWFkZXInIHwgJ2Zvb3RlcicgfCAnbWV0YS1mb290ZXInIHwgJ2RhdGEnXG4gKiAgIC0gUm93J3MgcmVwcmVzZW50aW5nIGRhdGEgaXRlbXMgKGRhdGEtcm93dHlwZT1cImRhdGFcIikgY2FuIG9taXQgdGhlIHR5cGUgYXR0cmlidXRlIGFuZCB0aGUgZnVuY3Rpb24gd2lsbCBpbmZlciBpdC5cbiAqXG4gKiBOT1RFIHRoYXQgdGhpcyBmdW5jdGlvbiBET0VTIE5PVCBpZGVudGlmeSBzdWJUeXBlIG9mIGBtZXRhLWdyb3VwYCAoYFBibE5ncmlkTWF0cml4Um93PCdoZWFkZXInIHwgJ2Zvb3RlcicsICdtZXRhLWdyb3VwJz5gKSwgaXQgd2lsbCByZXR1cm4gaXQgYXNcbiAqICdtZXRhYCwgeW91IG5lZWQgdG8gaGFuZGxlIHRoaXMgY2FzZSBzcGVjaWZpY2FsbHkuXG4gKlxuICogQmVjYXVzZSBkZXRlY3Rpb24gaXMgYmFzZWQgb24gRE9NIGVsZW1lbnQgcG9zaXRpb24gZmluZGluZyB0aGUgb3JpZ2luYWwgcm93IGluZGV4IHdoZW4gbXVsdGlwbGUgcm93IGNvbnRhaW5lcnMgYXJlIHNldCAoZml4ZWQvc3R5bGUvcm93KSB3aWxsIG5vdCB3b3JrLlxuICogVGhlIHJvd0luZGV4IHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lciwgYW5kIG5vdCB0aGUgZW50aXJlIHRhYmxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWF0cml4Um93RnJvbVJvdyhyb3c6IEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2Y1JlZjogVmlld0NvbnRhaW5lclJlZik6IFBibE5ncmlkTWF0cml4Um93PCdkYXRhJz4gfCBQYmxOZ3JpZE1hdHJpeFJvdzwnaGVhZGVyJyB8ICdmb290ZXInPiB8IFBibE5ncmlkTWF0cml4Um93PCdoZWFkZXInIHwgJ2Zvb3RlcicsICdtZXRhJz4gfCB1bmRlZmluZWQgIHtcbiAgY29uc3Qgcm93QXR0clR5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicgfCAnbWV0YS1oZWFkZXInIHwgJ21ldGEtZm9vdGVyJyA9IHJvdy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93dHlwZScpIGFzIGFueSB8fCAnZGF0YSc7XG5cbiAgLy8gVE9ETzogRXJyb3IgaWYgcm93QXR0clR5cGUgaXMgbm90IG9uZSBvZiB0aGUgYWxsb3dlZCB2YWx1ZXMhXG5cbiAgbGV0IHJvd0luZGV4ID0gMDtcbiAgc3dpdGNoIChyb3dBdHRyVHlwZSkge1xuICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgY29uc3Qgc291cmNlUm93ID0gcm93O1xuICAgICAgd2hpbGUgKHJvdy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgIHJvd0luZGV4Kys7XG4gICAgICAgIHJvdyA9IHJvdy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgfVxuICAgICAgcm93SW5kZXggPSBNYXRoLm1pbihyb3dJbmRleCwgdmNSZWYubGVuZ3RoIC0gMSk7XG4gICAgICB3aGlsZSAocm93SW5kZXggPiAtMSkge1xuICAgICAgICBpZiAoKHZjUmVmLmdldChyb3dJbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXSA9PT0gc291cmNlUm93KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdkYXRhJyxcbiAgICAgICAgICAgIHN1YlR5cGU6ICdkYXRhJyxcbiAgICAgICAgICAgIHJvd0luZGV4LFxuICAgICAgICAgIH0gYXMgeyByb3dJbmRleDogbnVtYmVyIH0gJiBQYmxOZ3JpZE1hdHJpeFJvdzwnZGF0YSc+O1xuICAgICAgICB9XG4gICAgICAgIHJvd0luZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgY2FzZSAnaGVhZGVyJzpcbiAgICBjYXNlICdmb290ZXInOlxuICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiByb3dBdHRyVHlwZSxcbiAgICAgICAgc3ViVHlwZTogJ2RhdGEnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgIH0gYXMgUGJsTmdyaWRNYXRyaXhSb3c8J2hlYWRlcicgfCAnZm9vdGVyJz47XG4gICAgZGVmYXVsdDpcbiAgICAgIHdoaWxlIChyb3cucHJldmlvdXNFbGVtZW50U2libGluZyAmJiByb3cucHJldmlvdXNFbGVtZW50U2libGluZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93dHlwZScpID09PSByb3dBdHRyVHlwZSkge1xuICAgICAgICByb3dJbmRleCsrO1xuICAgICAgICByb3cgPSByb3cucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHJvd0F0dHJUeXBlID09PSAnbWV0YS1mb290ZXInID8gJ2Zvb3RlcicgOiAnaGVhZGVyJyxcbiAgICAgICAgc3ViVHlwZTogJ21ldGEnLFxuICAgICAgICByb3dJbmRleCxcbiAgICAgIH0gYXMgUGJsTmdyaWRNYXRyaXhSb3c8J2hlYWRlcicgfCAnZm9vdGVyJywgJ21ldGEnPjtcbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGEgbGlzdCBvZiBjZWxscyBzdGFja2VkIHZlcnRpY2FsbHkgKHlBeGlzKSBhbmQgYSBsaXN0IG9mIGNlbGxzIHN0YWNrZWQgaG9yaXpvbnRhbGx5ICh4QXhpcykgcmV0dXJuIGFsbCB0aGUgY2VsbHMgaW5zaWRlICh3aXRob3V0IHRoZSBwcm92aWRlZCBheGlzIGNlbGxzKS5cbiAqXG4gKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIGFsbCBbWW5dIGNlbGxzIGFyZSBwcm92aWRlZCBpbiB0aGUgeUF4aXMgcGFyYW0gYW5kIGFsbCBbWG5dIGNlbGwgaW4gdGhlIHhBeGlzIHBhcmFtcywgdGhlIHJldHVybmVkIHZhbHVlIHdpbGwgYmUgYW4gYXJyYXlcbiAqIHdpdGggYWxsIGNlbGxzIG1hcmtlZCB3aXRoIFouXG4gKiAgICBZNSAgWiAgWiAgWlxuICogICAgWTQgIFogIFogIFpcbiAqICAgIFkzICBaICBaICBaXG4gKiAgICBZMiAgWiAgWiAgWlxuICogICAgWFkxIFgyIFgzIFg0XG4gKiBAcGFyYW0gY29udGV4dEFwaVxuICogQHBhcmFtIHhBeGlzXG4gKiBAcGFyYW0geUF4aXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElubmVyQ2VsbHNJblJlY3QoY29udGV4dEFwaTogUGJsTmdyaWRDb250ZXh0QXBpPGFueT4sIHhBeGlzOiBHcmlkRGF0YVBvaW50W10sIHlBeGlzOiBHcmlkRGF0YVBvaW50W10pOiBHcmlkRGF0YVBvaW50W10ge1xuICBjb25zdCBzcGFjZUluc2lkZTogR3JpZERhdGFQb2ludFtdID0gWyBdO1xuICBmb3IgKGNvbnN0IHZDZWxsIG9mIHlBeGlzKSB7XG4gICAgZm9yIChjb25zdCBoQ2VsbCBvZiB4QXhpcykge1xuICAgICAgY29uc3QgdmhDb250ZXh0ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZSh2Q2VsbC5yb3dJZGVudCkuY2VsbHNbaENlbGwuY29sSW5kZXhdO1xuICAgICAgaWYgKHZoQ29udGV4dCkge1xuICAgICAgICBzcGFjZUluc2lkZS5wdXNoKHsgcm93SWRlbnQ6IHZDZWxsLnJvd0lkZW50LCBjb2xJbmRleDogaENlbGwuY29sSW5kZXggfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzcGFjZUluc2lkZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlQmV0d2VlbihuMTogbnVtYmVyLCBuMjogbnVtYmVyKTogbnVtYmVyW10ge1xuICBjb25zdCBtaW4gPSBNYXRoLm1pbihuMSwgbjIpO1xuICBjb25zdCBtYXggPSBtaW4gPT09IG4xID8gbjIgOiBuMTtcblxuICBjb25zdCByZXN1bHQ6IG51bWJlcltdID0gW107XG4gIGZvciAobGV0IGkgPSBtaW4gKyAxOyBpIDwgbWF4OyBpKyspIHtcbiAgICByZXN1bHQucHVzaChpKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuIl19