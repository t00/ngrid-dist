/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    var colIndex = 0;
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
    var rowAttrType = (/** @type {?} */ (row.getAttribute('data-rowtype'))) || 'data';
    // TODO: Error if rowAttrType is not one of the allowed values!
    /** @type {?} */
    var rowIndex = 0;
    switch (rowAttrType) {
        case 'data':
            /** @type {?} */
            var sourceRow = row;
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
                        rowIndex: rowIndex,
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
                rowIndex: rowIndex,
            }));
        default:
            while (row.previousElementSibling && row.previousElementSibling.getAttribute('data-rowtype') === rowAttrType) {
                rowIndex++;
                row = row.previousElementSibling;
            }
            return (/** @type {?} */ ({
                type: rowAttrType === 'meta-footer' ? 'footer' : 'header',
                subType: 'meta',
                rowIndex: rowIndex,
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
    var e_1, _a, e_2, _b;
    /** @type {?} */
    var spaceInside = [];
    try {
        for (var yAxis_1 = tslib_1.__values(yAxis), yAxis_1_1 = yAxis_1.next(); !yAxis_1_1.done; yAxis_1_1 = yAxis_1.next()) {
            var vCell = yAxis_1_1.value;
            try {
                for (var xAxis_1 = tslib_1.__values(xAxis), xAxis_1_1 = xAxis_1.next(); !xAxis_1_1.done; xAxis_1_1 = xAxis_1.next()) {
                    var hCell = xAxis_1_1.value;
                    /** @type {?} */
                    var vhContext = contextApi.findRowInCache(vCell.rowIdent).cells[hCell.colIndex];
                    if (vhContext) {
                        spaceInside.push({ rowIdent: vCell.rowIdent, colIndex: hCell.colIndex });
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (xAxis_1_1 && !xAxis_1_1.done && (_b = xAxis_1.return)) _b.call(xAxis_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (yAxis_1_1 && !yAxis_1_1.done && (_a = yAxis_1.return)) _a.call(yAxis_1);
        }
        finally { if (e_1) throw e_1.error; }
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
    var min = Math.min(n1, n2);
    /** @type {?} */
    var max = min === n1 ? n2 : n1;
    /** @type {?} */
    var result = [];
    for (var i = min + 1; i < max; i++) {
        result.push(i);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUEsTUFBTSxVQUFVLFdBQVcsQ0FBdUQsS0FBeUQ7SUFDekksT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxLQUFLLEVBQXlCLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFDdkQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBdUQsS0FBeUQ7SUFDN0ksT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQUEsS0FBSyxFQUFxQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3RGLENBQUM7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE9BQW9CO0lBQ2pELE9BQU8sT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQUM7QUFDaEQsQ0FBQzs7Ozs7Ozs7Ozs7O0FBV0QsTUFBTSxVQUFVLGNBQWMsQ0FBQyxPQUFvQjtJQUNqRCxPQUFPLE9BQU8sQ0FBQyxhQUFhLEVBQUU7UUFDNUIsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sT0FBTyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUM7S0FDakM7QUFDSCxDQUFDOzs7Ozs7QUFLRCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsSUFBYTs7UUFDM0MsUUFBUSxHQUFHLENBQUM7SUFDaEIsT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFO1FBQ3pDLFFBQVEsRUFBRSxDQUFDO0tBQ1o7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJELE1BQU0sVUFBVSxnQkFBZ0Is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SUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiwgRW1iZWRkZWRWaWV3UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbnRleHRBcGksIEdyaWREYXRhUG9pbnQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkTWF0cml4Um93LCBQYmxOZ3JpZFJvd0V2ZW50LCBQYmxOZ3JpZENlbGxFdmVudCwgUGJsTmdyaWREYXRhQ2VsbEV2ZW50IH0gZnJvbSAnLi9ldmVudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDZWxsRXZlbnQ8VCwgVEV2ZW50IGV4dGVuZHMgRXZlbnQgPSBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4oZXZlbnQ6IFBibE5ncmlkUm93RXZlbnQ8VD4gfCBQYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+KTogZXZlbnQgaXMgUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiB7XG4gIHJldHVybiAhIShldmVudCBhcyAgUGJsTmdyaWRDZWxsRXZlbnQ8VD4pLmNlbGxUYXJnZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RhdGFDZWxsRXZlbnQ8VCwgVEV2ZW50IGV4dGVuZHMgRXZlbnQgPSBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4oZXZlbnQ6IFBibE5ncmlkUm93RXZlbnQ8VD4gfCBQYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+KTogZXZlbnQgaXMgUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIFRFdmVudD4ge1xuICByZXR1cm4gaXNDZWxsRXZlbnQoZXZlbnQpICYmICEhKGV2ZW50IGFzICBQYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgVEV2ZW50PikuY29udGV4dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaXMgYSByb3cgZWxlbWVudCAoYHBibC1uZ3JpZC1yb3dgLCBgY2RrLXJvd2ApLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd29ya3MgdW5kZXIgdGhlIGZvbGxvd2luZyBhc3N1bXB0aW9uczpcbiAqXG4gKiAgIC0gQSByb3cgZWxlbWVudCBNVVNUIGNvbnRhaW4gYSBcInJvbGVcIiBhdHRyaWJ1dGUgd2l0aCB0aGUgdmFsdWUgXCJyb3dcIlxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNSb3dDb250YWluZXIoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdyb2xlJykgPT09ICdyb3cnO1xufVxuXG4vKipcbiAqIEZpbmQgdGhlIGNlbGwgZWxlbWVudCB0aGF0IGlzIG9yIHdyYXBzIHRoZSBwcm92aWRlZCBlbGVtZW50LlxuICogVGhlIGVsZW1lbnQgY2FuIGJlIGEgdGFibGUgY2VsbCBlbGVtZW50IChhbnkgdHlwZSBvZikgT1IgYSBuZXN0ZWQgZWxlbWVudCAoYW55IGxldmVsKSBvZiBhIHRhYmxlIGNlbGwgZWxlbWVudC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdvcmtzIHVuZGVyIHRoZSBmb2xsb3dpbmcgYXNzdW1wdGlvbnM6XG4gKlxuICogICAtIFRoZSBwYXJlbnQgb2YgYSBjZWxsIGVsZW1lbnQgaXMgYSByb3cgZWxlbWVudC5cbiAqICAgLSBFYWNoIHJvdyBlbGVtZW50IE1VU1QgY29udGFpbiBhIFwicm9sZVwiIGF0dHJpYnV0ZSB3aXRoIHRoZSB2YWx1ZSBcInJvd1wiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUGFyZW50Q2VsbChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkIHtcbiAgd2hpbGUgKGVsZW1lbnQucGFyZW50RWxlbWVudCkge1xuICAgIGlmIChpc1Jvd0NvbnRhaW5lcihlbGVtZW50LnBhcmVudEVsZW1lbnQpKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG4gICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgfVxufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIHBvc2l0aW9uIChpbmRleCkgb2YgdGhlIGNlbGwgKGVsZW1lbnQpIGFtb25nIGl0J3Mgc2libGluZ3MuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbFJlbmRlckluZGV4KGNlbGw6IEVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgY29sSW5kZXggPSAwO1xuICB3aGlsZSAoY2VsbCA9IGNlbGwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgIGNvbEluZGV4Kys7XG4gIH1cbiAgcmV0dXJuIGNvbEluZGV4O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGFibGUgbWV0YWRhdGEgZm9yIGEgZ2l2ZW4gUk9XIGVsZW1lbnQuXG4gKiBUaGlzIGZ1bmN0aW9uIHdvcmtzIHVuZGVyIHRoZSBmb2xsb3dpbmcgYXNzdW1wdGlvbnM6XG4gKlxuICogICAtIEVhY2ggcm93IGVsZW1lbnQgTVVTVCBjb250YWluIGEgXCJyb2xlXCIgYXR0cmlidXRlIHdpdGggdGhlIHZhbHVlIFwicm93XCJcbiAqICAgLSBFYWNoIHJvdyBlbGVtZW50IE1VU1QgY29udGFpbnMgdGhlIHR5cGUgaWRlbnRpZmllciBhdHRyaWJ1dGUgXCJkYXRhLXJvd3R5cGVcIiAoZXhjZXB0IFwiZGF0YVwiIHJvd3MpXG4gKiAgIC0gQWxsb3dlZCB2YWx1ZXMgZm9yIFwiZGF0YS1yb3d0eXBlXCIgYXJlOiAnaGVhZGVyJyB8ICdtZXRhLWhlYWRlcicgfCAnZm9vdGVyJyB8ICdtZXRhLWZvb3RlcicgfCAnZGF0YSdcbiAqICAgLSBSb3cncyByZXByZXNlbnRpbmcgZGF0YSBpdGVtcyAoZGF0YS1yb3d0eXBlPVwiZGF0YVwiKSBjYW4gb21pdCB0aGUgdHlwZSBhdHRyaWJ1dGUgYW5kIHRoZSBmdW5jdGlvbiB3aWxsIGluZmVyIGl0LlxuICpcbiAqIE5PVEUgdGhhdCB0aGlzIGZ1bmN0aW9uIERPRVMgTk9UIGlkZW50aWZ5IHN1YlR5cGUgb2YgYG1ldGEtZ3JvdXBgIChgUGJsTmdyaWRNYXRyaXhSb3c8J2hlYWRlcicgfCAnZm9vdGVyJywgJ21ldGEtZ3JvdXAnPmApLCBpdCB3aWxsIHJldHVybiBpdCBhc1xuICogJ21ldGFgLCB5b3UgbmVlZCB0byBoYW5kbGUgdGhpcyBjYXNlIHNwZWNpZmljYWxseS5cbiAqXG4gKiBCZWNhdXNlIGRldGVjdGlvbiBpcyBiYXNlZCBvbiBET00gZWxlbWVudCBwb3NpdGlvbiBmaW5kaW5nIHRoZSBvcmlnaW5hbCByb3cgaW5kZXggd2hlbiBtdWx0aXBsZSByb3cgY29udGFpbmVycyBhcmUgc2V0IChmaXhlZC9zdHlsZS9yb3cpIHdpbGwgbm90IHdvcmsuXG4gKiBUaGUgcm93SW5kZXggd2lsbCBiZSByZWxhdGl2ZSB0byB0aGUgY29udGFpbmVyLCBhbmQgbm90IHRoZSBlbnRpcmUgdGFibGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRyaXhSb3dGcm9tUm93KHJvdzogRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKTogUGJsTmdyaWRNYXRyaXhSb3c8J2RhdGEnPiB8IFBibE5ncmlkTWF0cml4Um93PCdoZWFkZXInIHwgJ2Zvb3Rlcic+IHwgUGJsTmdyaWRNYXRyaXhSb3c8J2hlYWRlcicgfCAnZm9vdGVyJywgJ21ldGEnPiB8IHVuZGVmaW5lZCAge1xuICBjb25zdCByb3dBdHRyVHlwZTogJ2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJyB8ICdtZXRhLWhlYWRlcicgfCAnbWV0YS1mb290ZXInID0gcm93LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3d0eXBlJykgYXMgYW55IHx8ICdkYXRhJztcblxuICAvLyBUT0RPOiBFcnJvciBpZiByb3dBdHRyVHlwZSBpcyBub3Qgb25lIG9mIHRoZSBhbGxvd2VkIHZhbHVlcyFcblxuICBsZXQgcm93SW5kZXggPSAwO1xuICBzd2l0Y2ggKHJvd0F0dHJUeXBlKSB7XG4gICAgY2FzZSAnZGF0YSc6XG4gICAgICBjb25zdCBzb3VyY2VSb3cgPSByb3c7XG4gICAgICB3aGlsZSAocm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgcm93SW5kZXgrKztcbiAgICAgICAgcm93ID0gcm93LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICB9XG4gICAgICByb3dJbmRleCA9IE1hdGgubWluKHJvd0luZGV4LCB2Y1JlZi5sZW5ndGggLSAxKTtcbiAgICAgIHdoaWxlIChyb3dJbmRleCA+IC0xKSB7XG4gICAgICAgIGlmICgodmNSZWYuZ2V0KHJvd0luZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdID09PSBzb3VyY2VSb3cpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogJ2RhdGEnLFxuICAgICAgICAgICAgc3ViVHlwZTogJ2RhdGEnLFxuICAgICAgICAgICAgcm93SW5kZXgsXG4gICAgICAgICAgfSBhcyB7IHJvd0luZGV4OiBudW1iZXIgfSAmIFBibE5ncmlkTWF0cml4Um93PCdkYXRhJz47XG4gICAgICAgIH1cbiAgICAgICAgcm93SW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICBjYXNlICdoZWFkZXInOlxuICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6IHJvd0F0dHJUeXBlLFxuICAgICAgICBzdWJUeXBlOiAnZGF0YScsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgfSBhcyBQYmxOZ3JpZE1hdHJpeFJvdzwnaGVhZGVyJyB8ICdmb290ZXInPjtcbiAgICBkZWZhdWx0OlxuICAgICAgd2hpbGUgKHJvdy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIHJvdy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmdldEF0dHJpYnV0ZSgnZGF0YS1yb3d0eXBlJykgPT09IHJvd0F0dHJUeXBlKSB7XG4gICAgICAgIHJvd0luZGV4Kys7XG4gICAgICAgIHJvdyA9IHJvdy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogcm93QXR0clR5cGUgPT09ICdtZXRhLWZvb3RlcicgPyAnZm9vdGVyJyA6ICdoZWFkZXInLFxuICAgICAgICBzdWJUeXBlOiAnbWV0YScsXG4gICAgICAgIHJvd0luZGV4LFxuICAgICAgfSBhcyBQYmxOZ3JpZE1hdHJpeFJvdzwnaGVhZGVyJyB8ICdmb290ZXInLCAnbWV0YSc+O1xuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYSBsaXN0IG9mIGNlbGxzIHN0YWNrZWQgdmVydGljYWxseSAoeUF4aXMpIGFuZCBhIGxpc3Qgb2YgY2VsbHMgc3RhY2tlZCBob3Jpem9udGFsbHkgKHhBeGlzKSByZXR1cm4gYWxsIHRoZSBjZWxscyBpbnNpZGUgKHdpdGhvdXQgdGhlIHByb3ZpZGVkIGF4aXMgY2VsbHMpLlxuICpcbiAqIEluIHRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgYWxsIFtZbl0gY2VsbHMgYXJlIHByb3ZpZGVkIGluIHRoZSB5QXhpcyBwYXJhbSBhbmQgYWxsIFtYbl0gY2VsbCBpbiB0aGUgeEF4aXMgcGFyYW1zLCB0aGUgcmV0dXJuZWQgdmFsdWUgd2lsbCBiZSBhbiBhcnJheVxuICogd2l0aCBhbGwgY2VsbHMgbWFya2VkIHdpdGggWi5cbiAqICAgIFk1ICBaICBaICBaXG4gKiAgICBZNCAgWiAgWiAgWlxuICogICAgWTMgIFogIFogIFpcbiAqICAgIFkyICBaICBaICBaXG4gKiAgICBYWTEgWDIgWDMgWDRcbiAqIEBwYXJhbSBjb250ZXh0QXBpXG4gKiBAcGFyYW0geEF4aXNcbiAqIEBwYXJhbSB5QXhpc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5uZXJDZWxsc0luUmVjdChjb250ZXh0QXBpOiBQYmxOZ3JpZENvbnRleHRBcGk8YW55PiwgeEF4aXM6IEdyaWREYXRhUG9pbnRbXSwgeUF4aXM6IEdyaWREYXRhUG9pbnRbXSk6IEdyaWREYXRhUG9pbnRbXSB7XG4gIGNvbnN0IHNwYWNlSW5zaWRlOiBHcmlkRGF0YVBvaW50W10gPSBbIF07XG4gIGZvciAoY29uc3QgdkNlbGwgb2YgeUF4aXMpIHtcbiAgICBmb3IgKGNvbnN0IGhDZWxsIG9mIHhBeGlzKSB7XG4gICAgICBjb25zdCB2aENvbnRleHQgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHZDZWxsLnJvd0lkZW50KS5jZWxsc1toQ2VsbC5jb2xJbmRleF07XG4gICAgICBpZiAodmhDb250ZXh0KSB7XG4gICAgICAgIHNwYWNlSW5zaWRlLnB1c2goeyByb3dJZGVudDogdkNlbGwucm93SWRlbnQsIGNvbEluZGV4OiBoQ2VsbC5jb2xJbmRleCB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNwYWNlSW5zaWRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2VCZXR3ZWVuKG4xOiBudW1iZXIsIG4yOiBudW1iZXIpOiBudW1iZXJbXSB7XG4gIGNvbnN0IG1pbiA9IE1hdGgubWluKG4xLCBuMik7XG4gIGNvbnN0IG1heCA9IG1pbiA9PT0gbjEgPyBuMiA6IG4xO1xuXG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IG1pbiArIDE7IGkgPCBtYXg7IGkrKykge1xuICAgIHJlc3VsdC5wdXNoKGkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=