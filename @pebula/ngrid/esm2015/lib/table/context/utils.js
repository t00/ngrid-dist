/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * IE 11 compatible matches implementation.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
export function matches(element, selector) {
    return element.matches ?
        element.matches(selector) :
        ((/** @type {?} */ (element)))['msMatchesSelector'](selector);
}
/**
 * IE 11 compatible closest implementation.
 * @param {?} element
 * @param {?} selector
 * @return {?}
 */
export function closest(element, selector) {
    if (!(element instanceof Node)) {
        return null;
    }
    /** @type {?} */
    let curr = element;
    while (curr != null && !(curr instanceof Element && matches(curr, selector))) {
        curr = curr.parentNode;
    }
    return (/** @type {?} */ ((curr || null)));
}
/**
 * @param {?} el
 * @return {?}
 */
export function findRowRenderedIndex(el) {
    /** @type {?} */
    const rows = Array.from(closest(el, 'pbl-cdk-table').querySelectorAll('pbl-ngrid-row'));
    return rows.indexOf(el);
}
/**
 * @param {?} el
 * @return {?}
 */
export function findCellRenderedIndex(el) {
    /** @type {?} */
    const rowEl = (/** @type {?} */ (closest(el, 'pbl-ngrid-row')));
    /** @type {?} */
    const cells = Array.from(rowEl.querySelectorAll('pbl-ngrid-cell'));
    return [findRowRenderedIndex(rowEl), cells.indexOf(el)];
}
/**
 * Resolves the context from one of the possible types in `CellReference`.
 * If the context is within the view it will return the `PblCellContext instance, otherwise it will
 * return a tuple with the first item being the row context state and the seconds item pointing to the cell index.
 *
 * If no context is found, returns undefined.
 * @param {?} cellRef
 * @param {?} context
 * @return {?}
 */
export function resolveCellReference(cellRef, context) {
    /** @type {?} */
    let rowIdent;
    /** @type {?} */
    let colIndex;
    if (isGridDataPoint(cellRef)) {
        rowIdent = cellRef.rowIdent;
        colIndex = cellRef.colIndex;
    }
    else if (isCellContext(cellRef)) {
        rowIdent = cellRef.rowContext.identity;
        colIndex = cellRef.index;
    }
    else {
        const [r, c] = findCellRenderedIndex(cellRef);
        /** @type {?} */
        const rowContext = context.viewCache.get(r);
        if (rowContext) {
            /** @type {?} */
            const column = context.columnApi.findColumnAt(c);
            /** @type {?} */
            const columnIndex = context.columnApi.indexOf(column);
            return rowContext.cell(columnIndex);
        }
        else {
            return;
        }
    }
    /** @type {?} */
    const rowState = context.cache.get(rowIdent);
    if (rowState) {
        /** @type {?} */
        const rowContext = context.extApi.table.contextApi.findRowInView(rowState.identity);
        if (rowContext) {
            return rowContext.cell(colIndex);
        }
        else {
            /** @type {?} */
            const cellState = rowState.cells[colIndex];
            if (cellState) {
                return [rowState, colIndex];
            }
        }
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
function isGridDataPoint(obj) {
    return 'rowIdent' in obj && 'colIndex' in obj;
}
/**
 * @param {?} obj
 * @return {?}
 */
function isCellContext(obj) {
    return 'rowContext' in obj && 'index' in obj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbnRleHQvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQU9BLE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBZ0IsRUFBRSxRQUFnQjtJQUN4RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsQ0FBQzs7Ozs7OztBQUdELE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBMkMsRUFBRSxRQUFnQjtJQUNuRixJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksSUFBSSxDQUFDLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFOztRQUU1QyxJQUFJLEdBQWMsT0FBTztJQUM3QixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO1FBQzVFLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCO0lBRUQsT0FBTyxtQkFBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBZ0IsQ0FBQztBQUN4QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxFQUFlOztVQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxFQUFlOztVQUM3QyxLQUFLLEdBQUcsbUJBQUEsT0FBTyxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsRUFBZTs7VUFDbkQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEUsT0FBTyxDQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztBQUM1RCxDQUFDOzs7Ozs7Ozs7OztBQVNELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxPQUFzQixFQUN0QixPQUFrSjs7UUFDakwsUUFBYTs7UUFDYixRQUFnQjtJQUVwQixJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM1QixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUM1QixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztLQUM3QjtTQUFNLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pDLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUMxQjtTQUFNO2NBQ0MsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDOztjQUN6QyxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksVUFBVSxFQUFFOztrQkFDUixNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztrQkFDMUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNyRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU87U0FDUjtLQUNGOztVQUVLLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDNUMsSUFBSSxRQUFRLEVBQUU7O2NBQ0wsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNuRixJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQzthQUFNOztrQkFDQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsT0FBTyxDQUFFLFFBQVEsRUFBRSxRQUFRLENBQUUsQ0FBQzthQUMvQjtTQUNGO0tBQ0g7QUFDSCxDQUFDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVE7SUFDL0IsT0FBTyxVQUFVLElBQUksR0FBRyxJQUFJLFVBQVUsSUFBSSxHQUFHLENBQUM7QUFDaEQsQ0FBQzs7Ozs7QUFFRCxTQUFTLGFBQWEsQ0FBQyxHQUFRO0lBQzdCLE9BQU8sWUFBWSxJQUFJLEdBQUcsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDO0FBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IENvbHVtbkFwaSB9IGZyb20gJy4uL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgUm93Q29udGV4dFN0YXRlLCBQYmxOZ3JpZENlbGxDb250ZXh0LCBDZWxsUmVmZXJlbmNlLCBHcmlkRGF0YVBvaW50IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuL2NlbGwnO1xuXG4vKiogSUUgMTEgY29tcGF0aWJsZSBtYXRjaGVzIGltcGxlbWVudGF0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudDogRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5tYXRjaGVzID9cbiAgICAgIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikgOlxuICAgICAgKGVsZW1lbnQgYXMgYW55KVsnbXNNYXRjaGVzU2VsZWN0b3InXShzZWxlY3Rvcik7XG59XG5cbi8qKiBJRSAxMSBjb21wYXRpYmxlIGNsb3Nlc3QgaW1wbGVtZW50YXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50OiBFdmVudFRhcmdldHxFbGVtZW50fG51bGx8dW5kZWZpbmVkLCBzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgTm9kZSkpIHsgcmV0dXJuIG51bGw7IH1cblxuICBsZXQgY3VycjogTm9kZXxudWxsID0gZWxlbWVudDtcbiAgd2hpbGUgKGN1cnIgIT0gbnVsbCAmJiAhKGN1cnIgaW5zdGFuY2VvZiBFbGVtZW50ICYmIG1hdGNoZXMoY3Vyciwgc2VsZWN0b3IpKSkge1xuICAgIGN1cnIgPSBjdXJyLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gKGN1cnIgfHwgbnVsbCkgYXMgRWxlbWVudHxudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFJvd1JlbmRlcmVkSW5kZXgoZWw6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgY29uc3Qgcm93cyA9IEFycmF5LmZyb20oY2xvc2VzdChlbCwgJ3BibC1jZGstdGFibGUnKS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtcm93JykpO1xuICByZXR1cm4gcm93cy5pbmRleE9mKGVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsUmVuZGVyZWRJbmRleChlbDogSFRNTEVsZW1lbnQpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3Qgcm93RWwgPSBjbG9zZXN0KGVsLCAncGJsLW5ncmlkLXJvdycpIGFzIEhUTUxFbGVtZW50O1xuICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93RWwucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLWNlbGwnKSk7XG4gIHJldHVybiBbIGZpbmRSb3dSZW5kZXJlZEluZGV4KHJvd0VsKSwgY2VsbHMuaW5kZXhPZihlbCkgXTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgY29udGV4dCBmcm9tIG9uZSBvZiB0aGUgcG9zc2libGUgdHlwZXMgaW4gYENlbGxSZWZlcmVuY2VgLlxuICogSWYgdGhlIGNvbnRleHQgaXMgd2l0aGluIHRoZSB2aWV3IGl0IHdpbGwgcmV0dXJuIHRoZSBgUGJsQ2VsbENvbnRleHQgaW5zdGFuY2UsIG90aGVyd2lzZSBpdCB3aWxsXG4gKiByZXR1cm4gYSB0dXBsZSB3aXRoIHRoZSBmaXJzdCBpdGVtIGJlaW5nIHRoZSByb3cgY29udGV4dCBzdGF0ZSBhbmQgdGhlIHNlY29uZHMgaXRlbSBwb2ludGluZyB0byB0aGUgY2VsbCBpbmRleC5cbiAqXG4gKiBJZiBubyBjb250ZXh0IGlzIGZvdW5kLCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWY6IENlbGxSZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyB2aWV3Q2FjaGU6IE1hcDxudW1iZXIsIFBibFJvd0NvbnRleHQ8YW55Pj4sIGNhY2hlOiBNYXA8YW55LCBSb3dDb250ZXh0U3RhdGU+LCBjb2x1bW5BcGk6IENvbHVtbkFwaTxhbnk+LCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0pOiBQYmxDZWxsQ29udGV4dCB8IFtSb3dDb250ZXh0U3RhdGUsIG51bWJlcl0gfCB1bmRlZmluZWQge1xuICBsZXQgcm93SWRlbnQ6IGFueTtcbiAgbGV0IGNvbEluZGV4OiBudW1iZXI7XG5cbiAgaWYgKGlzR3JpZERhdGFQb2ludChjZWxsUmVmKSkge1xuICAgIHJvd0lkZW50ID0gY2VsbFJlZi5yb3dJZGVudDtcbiAgICBjb2xJbmRleCA9IGNlbGxSZWYuY29sSW5kZXg7XG4gIH0gZWxzZSBpZiAoaXNDZWxsQ29udGV4dChjZWxsUmVmKSkge1xuICAgIHJvd0lkZW50ID0gY2VsbFJlZi5yb3dDb250ZXh0LmlkZW50aXR5O1xuICAgIGNvbEluZGV4ID0gY2VsbFJlZi5pbmRleDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbIHIsIGMgXSA9IGZpbmRDZWxsUmVuZGVyZWRJbmRleChjZWxsUmVmKTtcbiAgICBjb25zdCByb3dDb250ZXh0ID0gY29udGV4dC52aWV3Q2FjaGUuZ2V0KHIpO1xuICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBjb250ZXh0LmNvbHVtbkFwaS5maW5kQ29sdW1uQXQoYyk7XG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IGNvbnRleHQuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICAgIHJldHVybiByb3dDb250ZXh0LmNlbGwoY29sdW1uSW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgcm93U3RhdGUgPSBjb250ZXh0LmNhY2hlLmdldChyb3dJZGVudCk7XG4gIGlmIChyb3dTdGF0ZSkge1xuICAgICBjb25zdCByb3dDb250ZXh0ID0gY29udGV4dC5leHRBcGkudGFibGUuY29udGV4dEFwaS5maW5kUm93SW5WaWV3KHJvd1N0YXRlLmlkZW50aXR5KTtcbiAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbEluZGV4KTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBjb25zdCBjZWxsU3RhdGUgPSByb3dTdGF0ZS5jZWxsc1tjb2xJbmRleF07XG4gICAgICAgaWYgKGNlbGxTdGF0ZSkge1xuICAgICAgICAgcmV0dXJuIFsgcm93U3RhdGUsIGNvbEluZGV4IF07XG4gICAgICAgfVxuICAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNHcmlkRGF0YVBvaW50KG9iajogYW55KTogb2JqIGlzIEdyaWREYXRhUG9pbnQge1xuICByZXR1cm4gJ3Jvd0lkZW50JyBpbiBvYmogJiYgJ2NvbEluZGV4JyBpbiBvYmo7XG59XG5cbmZ1bmN0aW9uIGlzQ2VsbENvbnRleHQob2JqOiBhbnkpOiBvYmogaXMgUGJsTmdyaWRDZWxsQ29udGV4dCB7XG4gIHJldHVybiAncm93Q29udGV4dCcgaW4gb2JqICYmICdpbmRleCcgaW4gb2JqO1xufVxuIl19