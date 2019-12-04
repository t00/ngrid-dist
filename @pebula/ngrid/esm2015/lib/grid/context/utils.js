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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29udGV4dC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBT0EsTUFBTSxVQUFVLE9BQU8sQ0FBQyxPQUFnQixFQUFFLFFBQWdCO0lBQ3hELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLG1CQUFBLE9BQU8sRUFBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0RCxDQUFDOzs7Ozs7O0FBR0QsTUFBTSxVQUFVLE9BQU8sQ0FBQyxPQUEyQyxFQUFFLFFBQWdCO0lBQ25GLElBQUksQ0FBQyxDQUFDLE9BQU8sWUFBWSxJQUFJLENBQUMsRUFBRTtRQUFFLE9BQU8sSUFBSSxDQUFDO0tBQUU7O1FBRTVDLElBQUksR0FBYyxPQUFPO0lBQzdCLE9BQU8sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxZQUFZLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7UUFDNUUsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDeEI7SUFFRCxPQUFPLG1CQUFBLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFnQixDQUFDO0FBQ3hDLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEVBQWU7O1VBQzVDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDdkYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLENBQUM7Ozs7O0FBRUQsTUFBTSxVQUFVLHFCQUFxQixDQUFDLEVBQWU7O1VBQzdDLEtBQUssR0FBRyxtQkFBQSxPQUFPLENBQUMsRUFBRSxFQUFFLGVBQWUsQ0FBQyxFQUFlOztVQUNuRCxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNsRSxPQUFPLENBQUUsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO0FBQzVELENBQUM7Ozs7Ozs7Ozs7O0FBU0QsTUFBTSxVQUFVLG9CQUFvQixDQUFDLE9BQXNCLEVBQ3RCLE9BQWtKOztRQUNqTCxRQUFhOztRQUNiLFFBQWdCO0lBRXBCLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVCLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO1FBQzVCLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0tBQzdCO1NBQU0sSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0tBQzFCO1NBQU07Y0FDQyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsR0FBRyxxQkFBcUIsQ0FBQyxPQUFPLENBQUM7O2NBQ3pDLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxVQUFVLEVBQUU7O2tCQUNSLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O2tCQUMxQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3JELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsT0FBTztTQUNSO0tBQ0Y7O1VBRUssUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUM1QyxJQUFJLFFBQVEsRUFBRTs7Y0FDTCxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1FBQ2xGLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07O2tCQUNDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUMxQyxJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPLENBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBRSxDQUFDO2FBQy9CO1NBQ0Y7S0FDSDtBQUNILENBQUM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBUTtJQUMvQixPQUFPLFVBQVUsSUFBSSxHQUFHLElBQUksVUFBVSxJQUFJLEdBQUcsQ0FBQztBQUNoRCxDQUFDOzs7OztBQUVELFNBQVMsYUFBYSxDQUFDLEdBQVE7SUFDN0IsT0FBTyxZQUFZLElBQUksR0FBRyxJQUFJLE9BQU8sSUFBSSxHQUFHLENBQUM7QUFDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBDb2x1bW5BcGkgfSBmcm9tICcuLi9jb2x1bW4tYXBpJztcbmltcG9ydCB7IFJvd0NvbnRleHRTdGF0ZSwgUGJsTmdyaWRDZWxsQ29udGV4dCwgQ2VsbFJlZmVyZW5jZSwgR3JpZERhdGFQb2ludCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IFBibENlbGxDb250ZXh0IH0gZnJvbSAnLi9jZWxsJztcblxuLyoqIElFIDExIGNvbXBhdGlibGUgbWF0Y2hlcyBpbXBsZW1lbnRhdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzKGVsZW1lbnQ6IEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyA/XG4gICAgICBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpIDpcbiAgICAgIChlbGVtZW50IGFzIGFueSlbJ21zTWF0Y2hlc1NlbGVjdG9yJ10oc2VsZWN0b3IpO1xufVxuXG4vKiogSUUgMTEgY29tcGF0aWJsZSBjbG9zZXN0IGltcGxlbWVudGF0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudDogRXZlbnRUYXJnZXR8RWxlbWVudHxudWxsfHVuZGVmaW5lZCwgc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE5vZGUpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgbGV0IGN1cnI6IE5vZGV8bnVsbCA9IGVsZW1lbnQ7XG4gIHdoaWxlIChjdXJyICE9IG51bGwgJiYgIShjdXJyIGluc3RhbmNlb2YgRWxlbWVudCAmJiBtYXRjaGVzKGN1cnIsIHNlbGVjdG9yKSkpIHtcbiAgICBjdXJyID0gY3Vyci5wYXJlbnROb2RlO1xuICB9XG5cbiAgcmV0dXJuIChjdXJyIHx8IG51bGwpIGFzIEVsZW1lbnR8bnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRSb3dSZW5kZXJlZEluZGV4KGVsOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIGNvbnN0IHJvd3MgPSBBcnJheS5mcm9tKGNsb3Nlc3QoZWwsICdwYmwtY2RrLXRhYmxlJykucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLXJvdycpKTtcbiAgcmV0dXJuIHJvd3MuaW5kZXhPZihlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbFJlbmRlcmVkSW5kZXgoZWw6IEhUTUxFbGVtZW50KTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHJvd0VsID0gY2xvc2VzdChlbCwgJ3BibC1uZ3JpZC1yb3cnKSBhcyBIVE1MRWxlbWVudDtcbiAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKHJvd0VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1jZWxsJykpO1xuICByZXR1cm4gWyBmaW5kUm93UmVuZGVyZWRJbmRleChyb3dFbCksIGNlbGxzLmluZGV4T2YoZWwpIF07XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGNvbnRleHQgZnJvbSBvbmUgb2YgdGhlIHBvc3NpYmxlIHR5cGVzIGluIGBDZWxsUmVmZXJlbmNlYC5cbiAqIElmIHRoZSBjb250ZXh0IGlzIHdpdGhpbiB0aGUgdmlldyBpdCB3aWxsIHJldHVybiB0aGUgYFBibENlbGxDb250ZXh0IGluc3RhbmNlLCBvdGhlcndpc2UgaXQgd2lsbFxuICogcmV0dXJuIGEgdHVwbGUgd2l0aCB0aGUgZmlyc3QgaXRlbSBiZWluZyB0aGUgcm93IGNvbnRleHQgc3RhdGUgYW5kIHRoZSBzZWNvbmRzIGl0ZW0gcG9pbnRpbmcgdG8gdGhlIGNlbGwgaW5kZXguXG4gKlxuICogSWYgbm8gY29udGV4dCBpcyBmb3VuZCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmOiBDZWxsUmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHsgdmlld0NhY2hlOiBNYXA8bnVtYmVyLCBQYmxSb3dDb250ZXh0PGFueT4+LCBjYWNoZTogTWFwPGFueSwgUm93Q29udGV4dFN0YXRlPiwgY29sdW1uQXBpOiBDb2x1bW5BcGk8YW55PiwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9KTogUGJsQ2VsbENvbnRleHQgfCBbUm93Q29udGV4dFN0YXRlLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcbiAgbGV0IHJvd0lkZW50OiBhbnk7XG4gIGxldCBjb2xJbmRleDogbnVtYmVyO1xuXG4gIGlmIChpc0dyaWREYXRhUG9pbnQoY2VsbFJlZikpIHtcbiAgICByb3dJZGVudCA9IGNlbGxSZWYucm93SWRlbnQ7XG4gICAgY29sSW5kZXggPSBjZWxsUmVmLmNvbEluZGV4O1xuICB9IGVsc2UgaWYgKGlzQ2VsbENvbnRleHQoY2VsbFJlZikpIHtcbiAgICByb3dJZGVudCA9IGNlbGxSZWYucm93Q29udGV4dC5pZGVudGl0eTtcbiAgICBjb2xJbmRleCA9IGNlbGxSZWYuaW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgWyByLCBjIF0gPSBmaW5kQ2VsbFJlbmRlcmVkSW5kZXgoY2VsbFJlZik7XG4gICAgY29uc3Qgcm93Q29udGV4dCA9IGNvbnRleHQudmlld0NhY2hlLmdldChyKTtcbiAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgY29uc3QgY29sdW1uID0gY29udGV4dC5jb2x1bW5BcGkuZmluZENvbHVtbkF0KGMpO1xuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBjb250ZXh0LmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG4gICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbHVtbkluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvd1N0YXRlID0gY29udGV4dC5jYWNoZS5nZXQocm93SWRlbnQpO1xuICBpZiAocm93U3RhdGUpIHtcbiAgICAgY29uc3Qgcm93Q29udGV4dCA9IGNvbnRleHQuZXh0QXBpLmdyaWQuY29udGV4dEFwaS5maW5kUm93SW5WaWV3KHJvd1N0YXRlLmlkZW50aXR5KTtcbiAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbEluZGV4KTtcbiAgICAgfSBlbHNlIHtcbiAgICAgICBjb25zdCBjZWxsU3RhdGUgPSByb3dTdGF0ZS5jZWxsc1tjb2xJbmRleF07XG4gICAgICAgaWYgKGNlbGxTdGF0ZSkge1xuICAgICAgICAgcmV0dXJuIFsgcm93U3RhdGUsIGNvbEluZGV4IF07XG4gICAgICAgfVxuICAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNHcmlkRGF0YVBvaW50KG9iajogYW55KTogb2JqIGlzIEdyaWREYXRhUG9pbnQge1xuICByZXR1cm4gJ3Jvd0lkZW50JyBpbiBvYmogJiYgJ2NvbEluZGV4JyBpbiBvYmo7XG59XG5cbmZ1bmN0aW9uIGlzQ2VsbENvbnRleHQob2JqOiBhbnkpOiBvYmogaXMgUGJsTmdyaWRDZWxsQ29udGV4dCB7XG4gIHJldHVybiAncm93Q29udGV4dCcgaW4gb2JqICYmICdpbmRleCcgaW4gb2JqO1xufVxuIl19