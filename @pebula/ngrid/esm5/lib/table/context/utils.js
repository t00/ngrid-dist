/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    var curr = element;
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
    var rows = Array.from(closest(el, 'pbl-cdk-table').querySelectorAll('pbl-ngrid-row'));
    return rows.indexOf(el);
}
/**
 * @param {?} el
 * @return {?}
 */
export function findCellRenderedIndex(el) {
    /** @type {?} */
    var rowEl = (/** @type {?} */ (closest(el, 'pbl-ngrid-row')));
    /** @type {?} */
    var cells = Array.from(rowEl.querySelectorAll('pbl-ngrid-cell'));
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
    var rowIdent;
    /** @type {?} */
    var colIndex;
    if (isGridDataPoint(cellRef)) {
        rowIdent = cellRef.rowIdent;
        colIndex = cellRef.colIndex;
    }
    else if (isCellContext(cellRef)) {
        rowIdent = cellRef.rowContext.identity;
        colIndex = cellRef.index;
    }
    else {
        var _a = tslib_1.__read(findCellRenderedIndex(cellRef), 2), r = _a[0], c = _a[1];
        /** @type {?} */
        var rowContext = context.viewCache.get(r);
        if (rowContext) {
            /** @type {?} */
            var column = context.columnApi.findColumnAt(c);
            /** @type {?} */
            var columnIndex = context.columnApi.indexOf(column);
            return rowContext.cell(columnIndex);
        }
        else {
            return;
        }
    }
    /** @type {?} */
    var rowState = context.cache.get(rowIdent);
    if (rowState) {
        /** @type {?} */
        var rowContext = context.extApi.table.contextApi.findRowInView(rowState.identity);
        if (rowContext) {
            return rowContext.cell(colIndex);
        }
        else {
            /** @type {?} */
            var cellState = rowState.cells[colIndex];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbnRleHQvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFPQSxNQUFNLFVBQVUsT0FBTyxDQUFDLE9BQWdCLEVBQUUsUUFBZ0I7SUFDeEQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELENBQUM7Ozs7Ozs7QUFHRCxNQUFNLFVBQVUsT0FBTyxDQUFDLE9BQTJDLEVBQUUsUUFBZ0I7SUFDbkYsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLElBQUksQ0FBQyxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUM7S0FBRTs7UUFFNUMsSUFBSSxHQUFjLE9BQU87SUFDN0IsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtRQUM1RSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4QjtJQUVELE9BQU8sbUJBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQWdCLENBQUM7QUFDeEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsRUFBZTs7UUFDNUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsRUFBZTs7UUFDN0MsS0FBSyxHQUFHLG1CQUFBLE9BQU8sQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLEVBQWU7O1FBQ25ELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sQ0FBRSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDNUQsQ0FBQzs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsT0FBc0IsRUFDdEIsT0FBa0o7O1FBQ2pMLFFBQWE7O1FBQ2IsUUFBZ0I7SUFFcEIsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDNUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDN0I7U0FBTSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNqQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDdkMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDMUI7U0FBTTtRQUNDLElBQUEsc0RBQXlDLEVBQXZDLFNBQUMsRUFBRSxTQUFvQzs7WUFDekMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLFVBQVUsRUFBRTs7Z0JBQ1IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Z0JBQzFDLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDckQsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxPQUFPO1NBQ1I7S0FDRjs7UUFFSyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzVDLElBQUksUUFBUSxFQUFFOztZQUNMLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbkYsSUFBSSxVQUFVLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7YUFBTTs7Z0JBQ0MsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzFDLElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sQ0FBRSxRQUFRLEVBQUUsUUFBUSxDQUFFLENBQUM7YUFDL0I7U0FDRjtLQUNIO0FBQ0gsQ0FBQzs7Ozs7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFRO0lBQy9CLE9BQU8sVUFBVSxJQUFJLEdBQUcsSUFBSSxVQUFVLElBQUksR0FBRyxDQUFDO0FBQ2hELENBQUM7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUMsR0FBUTtJQUM3QixPQUFPLFlBQVksSUFBSSxHQUFHLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQztBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBDb2x1bW5BcGkgfSBmcm9tICcuLi9jb2x1bW4tYXBpJztcbmltcG9ydCB7IFJvd0NvbnRleHRTdGF0ZSwgUGJsTmdyaWRDZWxsQ29udGV4dCwgQ2VsbFJlZmVyZW5jZSwgR3JpZERhdGFQb2ludCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4vcm93JztcbmltcG9ydCB7IFBibENlbGxDb250ZXh0IH0gZnJvbSAnLi9jZWxsJztcblxuLyoqIElFIDExIGNvbXBhdGlibGUgbWF0Y2hlcyBpbXBsZW1lbnRhdGlvbi4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzKGVsZW1lbnQ6IEVsZW1lbnQsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyA/XG4gICAgICBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpIDpcbiAgICAgIChlbGVtZW50IGFzIGFueSlbJ21zTWF0Y2hlc1NlbGVjdG9yJ10oc2VsZWN0b3IpO1xufVxuXG4vKiogSUUgMTEgY29tcGF0aWJsZSBjbG9zZXN0IGltcGxlbWVudGF0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsb3Nlc3QoZWxlbWVudDogRXZlbnRUYXJnZXR8RWxlbWVudHxudWxsfHVuZGVmaW5lZCwgc2VsZWN0b3I6IHN0cmluZyk6IEVsZW1lbnQgfCBudWxsIHtcbiAgaWYgKCEoZWxlbWVudCBpbnN0YW5jZW9mIE5vZGUpKSB7IHJldHVybiBudWxsOyB9XG5cbiAgbGV0IGN1cnI6IE5vZGV8bnVsbCA9IGVsZW1lbnQ7XG4gIHdoaWxlIChjdXJyICE9IG51bGwgJiYgIShjdXJyIGluc3RhbmNlb2YgRWxlbWVudCAmJiBtYXRjaGVzKGN1cnIsIHNlbGVjdG9yKSkpIHtcbiAgICBjdXJyID0gY3Vyci5wYXJlbnROb2RlO1xuICB9XG5cbiAgcmV0dXJuIChjdXJyIHx8IG51bGwpIGFzIEVsZW1lbnR8bnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRSb3dSZW5kZXJlZEluZGV4KGVsOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIGNvbnN0IHJvd3MgPSBBcnJheS5mcm9tKGNsb3Nlc3QoZWwsICdwYmwtY2RrLXRhYmxlJykucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLXJvdycpKTtcbiAgcmV0dXJuIHJvd3MuaW5kZXhPZihlbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbFJlbmRlcmVkSW5kZXgoZWw6IEhUTUxFbGVtZW50KTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHJvd0VsID0gY2xvc2VzdChlbCwgJ3BibC1uZ3JpZC1yb3cnKSBhcyBIVE1MRWxlbWVudDtcbiAgY29uc3QgY2VsbHMgPSBBcnJheS5mcm9tKHJvd0VsLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1jZWxsJykpO1xuICByZXR1cm4gWyBmaW5kUm93UmVuZGVyZWRJbmRleChyb3dFbCksIGNlbGxzLmluZGV4T2YoZWwpIF07XG59XG5cbi8qKlxuICogUmVzb2x2ZXMgdGhlIGNvbnRleHQgZnJvbSBvbmUgb2YgdGhlIHBvc3NpYmxlIHR5cGVzIGluIGBDZWxsUmVmZXJlbmNlYC5cbiAqIElmIHRoZSBjb250ZXh0IGlzIHdpdGhpbiB0aGUgdmlldyBpdCB3aWxsIHJldHVybiB0aGUgYFBibENlbGxDb250ZXh0IGluc3RhbmNlLCBvdGhlcndpc2UgaXQgd2lsbFxuICogcmV0dXJuIGEgdHVwbGUgd2l0aCB0aGUgZmlyc3QgaXRlbSBiZWluZyB0aGUgcm93IGNvbnRleHQgc3RhdGUgYW5kIHRoZSBzZWNvbmRzIGl0ZW0gcG9pbnRpbmcgdG8gdGhlIGNlbGwgaW5kZXguXG4gKlxuICogSWYgbm8gY29udGV4dCBpcyBmb3VuZCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmOiBDZWxsUmVmZXJlbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6IHsgdmlld0NhY2hlOiBNYXA8bnVtYmVyLCBQYmxSb3dDb250ZXh0PGFueT4+LCBjYWNoZTogTWFwPGFueSwgUm93Q29udGV4dFN0YXRlPiwgY29sdW1uQXBpOiBDb2x1bW5BcGk8YW55PiwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9KTogUGJsQ2VsbENvbnRleHQgfCBbUm93Q29udGV4dFN0YXRlLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcbiAgbGV0IHJvd0lkZW50OiBhbnk7XG4gIGxldCBjb2xJbmRleDogbnVtYmVyO1xuXG4gIGlmIChpc0dyaWREYXRhUG9pbnQoY2VsbFJlZikpIHtcbiAgICByb3dJZGVudCA9IGNlbGxSZWYucm93SWRlbnQ7XG4gICAgY29sSW5kZXggPSBjZWxsUmVmLmNvbEluZGV4O1xuICB9IGVsc2UgaWYgKGlzQ2VsbENvbnRleHQoY2VsbFJlZikpIHtcbiAgICByb3dJZGVudCA9IGNlbGxSZWYucm93Q29udGV4dC5pZGVudGl0eTtcbiAgICBjb2xJbmRleCA9IGNlbGxSZWYuaW5kZXg7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgWyByLCBjIF0gPSBmaW5kQ2VsbFJlbmRlcmVkSW5kZXgoY2VsbFJlZik7XG4gICAgY29uc3Qgcm93Q29udGV4dCA9IGNvbnRleHQudmlld0NhY2hlLmdldChyKTtcbiAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgY29uc3QgY29sdW1uID0gY29udGV4dC5jb2x1bW5BcGkuZmluZENvbHVtbkF0KGMpO1xuICAgICAgY29uc3QgY29sdW1uSW5kZXggPSBjb250ZXh0LmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG4gICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbHVtbkluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHJvd1N0YXRlID0gY29udGV4dC5jYWNoZS5nZXQocm93SWRlbnQpO1xuICBpZiAocm93U3RhdGUpIHtcbiAgICAgY29uc3Qgcm93Q29udGV4dCA9IGNvbnRleHQuZXh0QXBpLnRhYmxlLmNvbnRleHRBcGkuZmluZFJvd0luVmlldyhyb3dTdGF0ZS5pZGVudGl0eSk7XG4gICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgcmV0dXJuIHJvd0NvbnRleHQuY2VsbChjb2xJbmRleCk7XG4gICAgIH0gZWxzZSB7XG4gICAgICAgY29uc3QgY2VsbFN0YXRlID0gcm93U3RhdGUuY2VsbHNbY29sSW5kZXhdO1xuICAgICAgIGlmIChjZWxsU3RhdGUpIHtcbiAgICAgICAgIHJldHVybiBbIHJvd1N0YXRlLCBjb2xJbmRleCBdO1xuICAgICAgIH1cbiAgICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzR3JpZERhdGFQb2ludChvYmo6IGFueSk6IG9iaiBpcyBHcmlkRGF0YVBvaW50IHtcbiAgcmV0dXJuICdyb3dJZGVudCcgaW4gb2JqICYmICdjb2xJbmRleCcgaW4gb2JqO1xufVxuXG5mdW5jdGlvbiBpc0NlbGxDb250ZXh0KG9iajogYW55KTogb2JqIGlzIFBibE5ncmlkQ2VsbENvbnRleHQge1xuICByZXR1cm4gJ3Jvd0NvbnRleHQnIGluIG9iaiAmJiAnaW5kZXgnIGluIG9iajtcbn1cbiJdfQ==