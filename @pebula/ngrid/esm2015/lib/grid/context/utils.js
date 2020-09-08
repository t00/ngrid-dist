/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        const rowContext = context.extApi.grid.contextApi.findRowInView(rowState.identity);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29udGV4dC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU9BLE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBZ0IsRUFBRSxRQUFnQjtJQUN4RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxtQkFBQSxPQUFPLEVBQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsQ0FBQzs7Ozs7OztBQUdELE1BQU0sVUFBVSxPQUFPLENBQUMsT0FBMkMsRUFBRSxRQUFnQjtJQUNuRixJQUFJLENBQUMsQ0FBQyxPQUFPLFlBQVksSUFBSSxDQUFDLEVBQUU7UUFBRSxPQUFPLElBQUksQ0FBQztLQUFFOztRQUU1QyxJQUFJLEdBQWMsT0FBTztJQUM3QixPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO1FBQzVFLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0tBQ3hCO0lBRUQsT0FBTyxtQkFBQSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBZ0IsQ0FBQztBQUN4QyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxFQUFlOztVQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3ZGLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQixDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxFQUFlOztVQUM3QyxLQUFLLEdBQUcsbUJBQUEsT0FBTyxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsRUFBZTs7VUFDbkQsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDbEUsT0FBTyxDQUFFLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztBQUM1RCxDQUFDOzs7Ozs7Ozs7OztBQVNELE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxPQUFzQixFQUN0QixPQUFrSjs7UUFDakwsUUFBYTs7UUFDYixRQUFnQjtJQUVwQixJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUM1QixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUM1QixRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztLQUM3QjtTQUFNLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pDLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUN2QyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztLQUMxQjtTQUFNO2NBQ0MsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLEdBQUcscUJBQXFCLENBQUMsT0FBTyxDQUFDOztjQUN6QyxVQUFVLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksVUFBVSxFQUFFOztrQkFDUixNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztrQkFDMUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUNyRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLE9BQU87U0FDUjtLQUNGOztVQUVLLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDNUMsSUFBSSxRQUFRLEVBQUU7O2NBQ0wsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsRixJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQzthQUFNOztrQkFDQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDMUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsT0FBTyxDQUFFLFFBQVEsRUFBRSxRQUFRLENBQUUsQ0FBQzthQUMvQjtTQUNGO0tBQ0g7QUFDSCxDQUFDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLEdBQVE7SUFDL0IsT0FBTyxVQUFVLElBQUksR0FBRyxJQUFJLFVBQVUsSUFBSSxHQUFHLENBQUM7QUFDaEQsQ0FBQzs7Ozs7QUFFRCxTQUFTLGFBQWEsQ0FBQyxHQUFRO0lBQzdCLE9BQU8sWUFBWSxJQUFJLEdBQUcsSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDO0FBQy9DLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgQ29sdW1uQXBpIH0gZnJvbSAnLi4vY29sdW1uLWFwaSc7XG5pbXBvcnQgeyBSb3dDb250ZXh0U3RhdGUsIFBibE5ncmlkQ2VsbENvbnRleHQsIENlbGxSZWZlcmVuY2UsIEdyaWREYXRhUG9pbnQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbi8qKiBJRSAxMSBjb21wYXRpYmxlIG1hdGNoZXMgaW1wbGVtZW50YXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hlcyhlbGVtZW50OiBFbGVtZW50LCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBlbGVtZW50Lm1hdGNoZXMgP1xuICAgICAgZWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSA6XG4gICAgICAoZWxlbWVudCBhcyBhbnkpWydtc01hdGNoZXNTZWxlY3RvciddKHNlbGVjdG9yKTtcbn1cblxuLyoqIElFIDExIGNvbXBhdGlibGUgY2xvc2VzdCBpbXBsZW1lbnRhdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZXN0KGVsZW1lbnQ6IEV2ZW50VGFyZ2V0fEVsZW1lbnR8bnVsbHx1bmRlZmluZWQsIHNlbGVjdG9yOiBzdHJpbmcpOiBFbGVtZW50IHwgbnVsbCB7XG4gIGlmICghKGVsZW1lbnQgaW5zdGFuY2VvZiBOb2RlKSkgeyByZXR1cm4gbnVsbDsgfVxuXG4gIGxldCBjdXJyOiBOb2RlfG51bGwgPSBlbGVtZW50O1xuICB3aGlsZSAoY3VyciAhPSBudWxsICYmICEoY3VyciBpbnN0YW5jZW9mIEVsZW1lbnQgJiYgbWF0Y2hlcyhjdXJyLCBzZWxlY3RvcikpKSB7XG4gICAgY3VyciA9IGN1cnIucGFyZW50Tm9kZTtcbiAgfVxuXG4gIHJldHVybiAoY3VyciB8fCBudWxsKSBhcyBFbGVtZW50fG51bGw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kUm93UmVuZGVyZWRJbmRleChlbDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICBjb25zdCByb3dzID0gQXJyYXkuZnJvbShjbG9zZXN0KGVsLCAncGJsLWNkay10YWJsZScpLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1yb3cnKSk7XG4gIHJldHVybiByb3dzLmluZGV4T2YoZWwpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZENlbGxSZW5kZXJlZEluZGV4KGVsOiBIVE1MRWxlbWVudCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCByb3dFbCA9IGNsb3Nlc3QoZWwsICdwYmwtbmdyaWQtcm93JykgYXMgSFRNTEVsZW1lbnQ7XG4gIGNvbnN0IGNlbGxzID0gQXJyYXkuZnJvbShyb3dFbC5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtY2VsbCcpKTtcbiAgcmV0dXJuIFsgZmluZFJvd1JlbmRlcmVkSW5kZXgocm93RWwpLCBjZWxscy5pbmRleE9mKGVsKSBdO1xufVxuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBjb250ZXh0IGZyb20gb25lIG9mIHRoZSBwb3NzaWJsZSB0eXBlcyBpbiBgQ2VsbFJlZmVyZW5jZWAuXG4gKiBJZiB0aGUgY29udGV4dCBpcyB3aXRoaW4gdGhlIHZpZXcgaXQgd2lsbCByZXR1cm4gdGhlIGBQYmxDZWxsQ29udGV4dCBpbnN0YW5jZSwgb3RoZXJ3aXNlIGl0IHdpbGxcbiAqIHJldHVybiBhIHR1cGxlIHdpdGggdGhlIGZpcnN0IGl0ZW0gYmVpbmcgdGhlIHJvdyBjb250ZXh0IHN0YXRlIGFuZCB0aGUgc2Vjb25kcyBpdGVtIHBvaW50aW5nIHRvIHRoZSBjZWxsIGluZGV4LlxuICpcbiAqIElmIG5vIGNvbnRleHQgaXMgZm91bmQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUNlbGxSZWZlcmVuY2UoY2VsbFJlZjogQ2VsbFJlZmVyZW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7IHZpZXdDYWNoZTogTWFwPG51bWJlciwgUGJsUm93Q29udGV4dDxhbnk+PiwgY2FjaGU6IE1hcDxhbnksIFJvd0NvbnRleHRTdGF0ZT4sIGNvbHVtbkFwaTogQ29sdW1uQXBpPGFueT4sIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGkgfSk6IFBibENlbGxDb250ZXh0IHwgW1Jvd0NvbnRleHRTdGF0ZSwgbnVtYmVyXSB8IHVuZGVmaW5lZCB7XG4gIGxldCByb3dJZGVudDogYW55O1xuICBsZXQgY29sSW5kZXg6IG51bWJlcjtcblxuICBpZiAoaXNHcmlkRGF0YVBvaW50KGNlbGxSZWYpKSB7XG4gICAgcm93SWRlbnQgPSBjZWxsUmVmLnJvd0lkZW50O1xuICAgIGNvbEluZGV4ID0gY2VsbFJlZi5jb2xJbmRleDtcbiAgfSBlbHNlIGlmIChpc0NlbGxDb250ZXh0KGNlbGxSZWYpKSB7XG4gICAgcm93SWRlbnQgPSBjZWxsUmVmLnJvd0NvbnRleHQuaWRlbnRpdHk7XG4gICAgY29sSW5kZXggPSBjZWxsUmVmLmluZGV4O1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IFsgciwgYyBdID0gZmluZENlbGxSZW5kZXJlZEluZGV4KGNlbGxSZWYpO1xuICAgIGNvbnN0IHJvd0NvbnRleHQgPSBjb250ZXh0LnZpZXdDYWNoZS5nZXQocik7XG4gICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbnRleHQuY29sdW1uQXBpLmZpbmRDb2x1bW5BdChjKTtcbiAgICAgIGNvbnN0IGNvbHVtbkluZGV4ID0gY29udGV4dC5jb2x1bW5BcGkuaW5kZXhPZihjb2x1bW4pO1xuICAgICAgcmV0dXJuIHJvd0NvbnRleHQuY2VsbChjb2x1bW5JbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBjb25zdCByb3dTdGF0ZSA9IGNvbnRleHQuY2FjaGUuZ2V0KHJvd0lkZW50KTtcbiAgaWYgKHJvd1N0YXRlKSB7XG4gICAgIGNvbnN0IHJvd0NvbnRleHQgPSBjb250ZXh0LmV4dEFwaS5ncmlkLmNvbnRleHRBcGkuZmluZFJvd0luVmlldyhyb3dTdGF0ZS5pZGVudGl0eSk7XG4gICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgcmV0dXJuIHJvd0NvbnRleHQuY2VsbChjb2xJbmRleCk7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgY29uc3QgY2VsbFN0YXRlID0gcm93U3RhdGUuY2VsbHNbY29sSW5kZXhdO1xuICAgICAgIGlmIChjZWxsU3RhdGUpIHtcbiAgICAgICAgIHJldHVybiBbIHJvd1N0YXRlLCBjb2xJbmRleCBdO1xuICAgICAgIH1cbiAgICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzR3JpZERhdGFQb2ludChvYmo6IGFueSk6IG9iaiBpcyBHcmlkRGF0YVBvaW50IHtcbiAgcmV0dXJuICdyb3dJZGVudCcgaW4gb2JqICYmICdjb2xJbmRleCcgaW4gb2JqO1xufVxuXG5mdW5jdGlvbiBpc0NlbGxDb250ZXh0KG9iajogYW55KTogb2JqIGlzIFBibE5ncmlkQ2VsbENvbnRleHQge1xuICByZXR1cm4gJ3Jvd0NvbnRleHQnIGluIG9iaiAmJiAnaW5kZXgnIGluIG9iajtcbn1cbiJdfQ==