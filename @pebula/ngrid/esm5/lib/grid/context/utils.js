/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read } from "tslib";
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
        var _a = __read(findCellRenderedIndex(cellRef), 2), r = _a[0], c = _a[1];
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
        var rowContext = context.extApi.grid.contextApi.findRowInView(rowState.identity);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29udGV4dC91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxNQUFNLFVBQVUsT0FBTyxDQUFDLE9BQWdCLEVBQUUsUUFBZ0I7SUFDeEQsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsbUJBQUEsT0FBTyxFQUFPLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELENBQUM7Ozs7Ozs7QUFHRCxNQUFNLFVBQVUsT0FBTyxDQUFDLE9BQTJDLEVBQUUsUUFBZ0I7SUFDbkYsSUFBSSxDQUFDLENBQUMsT0FBTyxZQUFZLElBQUksQ0FBQyxFQUFFO1FBQUUsT0FBTyxJQUFJLENBQUM7S0FBRTs7UUFFNUMsSUFBSSxHQUFjLE9BQU87SUFDN0IsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLFlBQVksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtRQUM1RSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN4QjtJQUVELE9BQU8sbUJBQUEsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQWdCLENBQUM7QUFDeEMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsRUFBZTs7UUFDNUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUIsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUscUJBQXFCLENBQUMsRUFBZTs7UUFDN0MsS0FBSyxHQUFHLG1CQUFBLE9BQU8sQ0FBQyxFQUFFLEVBQUUsZUFBZSxDQUFDLEVBQWU7O1FBQ25ELEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xFLE9BQU8sQ0FBRSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7QUFDNUQsQ0FBQzs7Ozs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsT0FBc0IsRUFDdEIsT0FBa0o7O1FBQ2pMLFFBQWE7O1FBQ2IsUUFBZ0I7SUFFcEIsSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDNUIsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7S0FDN0I7U0FBTSxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNqQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDdkMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDMUI7U0FBTTtRQUNDLElBQUEsOENBQXlDLEVBQXZDLFNBQUMsRUFBRSxTQUFvQzs7WUFDekMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLFVBQVUsRUFBRTs7Z0JBQ1IsTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Z0JBQzFDLFdBQVcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDckQsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxPQUFPO1NBQ1I7S0FDRjs7UUFFSyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQzVDLElBQUksUUFBUSxFQUFFOztZQUNMLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbEYsSUFBSSxVQUFVLEVBQUU7WUFDZCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbEM7YUFBTTs7Z0JBQ0MsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzFDLElBQUksU0FBUyxFQUFFO2dCQUNiLE9BQU8sQ0FBRSxRQUFRLEVBQUUsUUFBUSxDQUFFLENBQUM7YUFDL0I7U0FDRjtLQUNIO0FBQ0gsQ0FBQzs7Ozs7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFRO0lBQy9CLE9BQU8sVUFBVSxJQUFJLEdBQUcsSUFBSSxVQUFVLElBQUksR0FBRyxDQUFDO0FBQ2hELENBQUM7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUMsR0FBUTtJQUM3QixPQUFPLFlBQVksSUFBSSxHQUFHLElBQUksT0FBTyxJQUFJLEdBQUcsQ0FBQztBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IENvbHVtbkFwaSB9IGZyb20gJy4uL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgUm93Q29udGV4dFN0YXRlLCBQYmxOZ3JpZENlbGxDb250ZXh0LCBDZWxsUmVmZXJlbmNlLCBHcmlkRGF0YVBvaW50IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuL2NlbGwnO1xuXG4vKiogSUUgMTEgY29tcGF0aWJsZSBtYXRjaGVzIGltcGxlbWVudGF0aW9uLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudDogRWxlbWVudCwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gZWxlbWVudC5tYXRjaGVzID9cbiAgICAgIGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikgOlxuICAgICAgKGVsZW1lbnQgYXMgYW55KVsnbXNNYXRjaGVzU2VsZWN0b3InXShzZWxlY3Rvcik7XG59XG5cbi8qKiBJRSAxMSBjb21wYXRpYmxlIGNsb3Nlc3QgaW1wbGVtZW50YXRpb24uICovXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VzdChlbGVtZW50OiBFdmVudFRhcmdldHxFbGVtZW50fG51bGx8dW5kZWZpbmVkLCBzZWxlY3Rvcjogc3RyaW5nKTogRWxlbWVudCB8IG51bGwge1xuICBpZiAoIShlbGVtZW50IGluc3RhbmNlb2YgTm9kZSkpIHsgcmV0dXJuIG51bGw7IH1cblxuICBsZXQgY3VycjogTm9kZXxudWxsID0gZWxlbWVudDtcbiAgd2hpbGUgKGN1cnIgIT0gbnVsbCAmJiAhKGN1cnIgaW5zdGFuY2VvZiBFbGVtZW50ICYmIG1hdGNoZXMoY3Vyciwgc2VsZWN0b3IpKSkge1xuICAgIGN1cnIgPSBjdXJyLnBhcmVudE5vZGU7XG4gIH1cblxuICByZXR1cm4gKGN1cnIgfHwgbnVsbCkgYXMgRWxlbWVudHxudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZFJvd1JlbmRlcmVkSW5kZXgoZWw6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgY29uc3Qgcm93cyA9IEFycmF5LmZyb20oY2xvc2VzdChlbCwgJ3BibC1jZGstdGFibGUnKS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtcm93JykpO1xuICByZXR1cm4gcm93cy5pbmRleE9mKGVsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsUmVuZGVyZWRJbmRleChlbDogSFRNTEVsZW1lbnQpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3Qgcm93RWwgPSBjbG9zZXN0KGVsLCAncGJsLW5ncmlkLXJvdycpIGFzIEhUTUxFbGVtZW50O1xuICBjb25zdCBjZWxscyA9IEFycmF5LmZyb20ocm93RWwucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLWNlbGwnKSk7XG4gIHJldHVybiBbIGZpbmRSb3dSZW5kZXJlZEluZGV4KHJvd0VsKSwgY2VsbHMuaW5kZXhPZihlbCkgXTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgY29udGV4dCBmcm9tIG9uZSBvZiB0aGUgcG9zc2libGUgdHlwZXMgaW4gYENlbGxSZWZlcmVuY2VgLlxuICogSWYgdGhlIGNvbnRleHQgaXMgd2l0aGluIHRoZSB2aWV3IGl0IHdpbGwgcmV0dXJuIHRoZSBgUGJsQ2VsbENvbnRleHQgaW5zdGFuY2UsIG90aGVyd2lzZSBpdCB3aWxsXG4gKiByZXR1cm4gYSB0dXBsZSB3aXRoIHRoZSBmaXJzdCBpdGVtIGJlaW5nIHRoZSByb3cgY29udGV4dCBzdGF0ZSBhbmQgdGhlIHNlY29uZHMgaXRlbSBwb2ludGluZyB0byB0aGUgY2VsbCBpbmRleC5cbiAqXG4gKiBJZiBubyBjb250ZXh0IGlzIGZvdW5kLCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWY6IENlbGxSZWZlcmVuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyB2aWV3Q2FjaGU6IE1hcDxudW1iZXIsIFBibFJvd0NvbnRleHQ8YW55Pj4sIGNhY2hlOiBNYXA8YW55LCBSb3dDb250ZXh0U3RhdGU+LCBjb2x1bW5BcGk6IENvbHVtbkFwaTxhbnk+LCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0pOiBQYmxDZWxsQ29udGV4dCB8IFtSb3dDb250ZXh0U3RhdGUsIG51bWJlcl0gfCB1bmRlZmluZWQge1xuICBsZXQgcm93SWRlbnQ6IGFueTtcbiAgbGV0IGNvbEluZGV4OiBudW1iZXI7XG5cbiAgaWYgKGlzR3JpZERhdGFQb2ludChjZWxsUmVmKSkge1xuICAgIHJvd0lkZW50ID0gY2VsbFJlZi5yb3dJZGVudDtcbiAgICBjb2xJbmRleCA9IGNlbGxSZWYuY29sSW5kZXg7XG4gIH0gZWxzZSBpZiAoaXNDZWxsQ29udGV4dChjZWxsUmVmKSkge1xuICAgIHJvd0lkZW50ID0gY2VsbFJlZi5yb3dDb250ZXh0LmlkZW50aXR5O1xuICAgIGNvbEluZGV4ID0gY2VsbFJlZi5pbmRleDtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBbIHIsIGMgXSA9IGZpbmRDZWxsUmVuZGVyZWRJbmRleChjZWxsUmVmKTtcbiAgICBjb25zdCByb3dDb250ZXh0ID0gY29udGV4dC52aWV3Q2FjaGUuZ2V0KHIpO1xuICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICBjb25zdCBjb2x1bW4gPSBjb250ZXh0LmNvbHVtbkFwaS5maW5kQ29sdW1uQXQoYyk7XG4gICAgICBjb25zdCBjb2x1bW5JbmRleCA9IGNvbnRleHQuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICAgIHJldHVybiByb3dDb250ZXh0LmNlbGwoY29sdW1uSW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgcm93U3RhdGUgPSBjb250ZXh0LmNhY2hlLmdldChyb3dJZGVudCk7XG4gIGlmIChyb3dTdGF0ZSkge1xuICAgICBjb25zdCByb3dDb250ZXh0ID0gY29udGV4dC5leHRBcGkuZ3JpZC5jb250ZXh0QXBpLmZpbmRSb3dJblZpZXcocm93U3RhdGUuaWRlbnRpdHkpO1xuICAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgIHJldHVybiByb3dDb250ZXh0LmNlbGwoY29sSW5kZXgpO1xuICAgICB9IGVsc2Uge1xuICAgICAgIGNvbnN0IGNlbGxTdGF0ZSA9IHJvd1N0YXRlLmNlbGxzW2NvbEluZGV4XTtcbiAgICAgICBpZiAoY2VsbFN0YXRlKSB7XG4gICAgICAgICByZXR1cm4gWyByb3dTdGF0ZSwgY29sSW5kZXggXTtcbiAgICAgICB9XG4gICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc0dyaWREYXRhUG9pbnQob2JqOiBhbnkpOiBvYmogaXMgR3JpZERhdGFQb2ludCB7XG4gIHJldHVybiAncm93SWRlbnQnIGluIG9iaiAmJiAnY29sSW5kZXgnIGluIG9iajtcbn1cblxuZnVuY3Rpb24gaXNDZWxsQ29udGV4dChvYmo6IGFueSk6IG9iaiBpcyBQYmxOZ3JpZENlbGxDb250ZXh0IHtcbiAgcmV0dXJuICdyb3dDb250ZXh0JyBpbiBvYmogJiYgJ2luZGV4JyBpbiBvYmo7XG59XG4iXX0=