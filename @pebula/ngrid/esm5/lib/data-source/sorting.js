/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Apply sorting on a collection, based on column and sort definitions.
 * If the sort definition doesn't have a sorting function the default sorter is used.
 * @template T
 * @param {?} column
 * @param {?} sort
 * @param {?} data
 * @return {?}
 */
export function applySort(column, sort, data) {
    if (!sort || !sort.order) {
        return data;
    }
    /** @type {?} */
    var sortFn = typeof sort.sortFn === 'function'
        ? sort.sortFn
        : typeof column.sort === 'function'
            ? column.sort
            : defaultSorter;
    return column && data
        ? sortFn(column, sort, data.slice())
        : data || [];
}
/**
 * @template T
 * @param {?} column
 * @param {?} sort
 * @param {?} data
 * @return {?}
 */
function defaultSorter(column, sort, data) {
    return data.sort((/**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var valueA = column.getValue(a);
        /** @type {?} */
        var valueB = column.getValue(b);
        valueA = isNaN(+valueA) ? valueA : +valueA;
        valueB = isNaN(+valueB) ? valueB : +valueB;
        return (valueA < valueB ? -1 : valueA === valueB ? 0 : 1) * (sort.order === 'asc' ? 1 : -1);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2Uvc29ydGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBT0EsTUFBTSxVQUFVLFNBQVMsQ0FBSSxNQUFpQixFQUFFLElBQTRCLEVBQUUsSUFBUztJQUNyRixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQztLQUNiOztRQUVLLE1BQU0sR0FBc0IsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVU7UUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQ2IsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVO1lBQ2pDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNiLENBQUMsQ0FBQyxhQUFhO0lBR25CLE9BQU8sTUFBTSxJQUFJLElBQUk7UUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FDYjtBQUNILENBQUM7Ozs7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUksTUFBaUIsRUFBRSxJQUE4QixFQUFFLElBQVM7SUFDcEYsT0FBTyxJQUFJLENBQUMsSUFBSTs7Ozs7SUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDOztZQUNoQixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUUvQixNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDM0MsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRTNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vZ3JpZC9jb2x1bW5zJztcbmltcG9ydCB7IFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibE5ncmlkU29ydEluc3RydWN0aW9ucywgUGJsTmdyaWRTb3J0ZXIgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBBcHBseSBzb3J0aW5nIG9uIGEgY29sbGVjdGlvbiwgYmFzZWQgb24gY29sdW1uIGFuZCBzb3J0IGRlZmluaXRpb25zLlxuICogSWYgdGhlIHNvcnQgZGVmaW5pdGlvbiBkb2Vzbid0IGhhdmUgYSBzb3J0aW5nIGZ1bmN0aW9uIHRoZSBkZWZhdWx0IHNvcnRlciBpcyB1c2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlTb3J0PFQ+KGNvbHVtbjogUGJsQ29sdW1uLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBkYXRhOiBUW10pOiBUW10ge1xuICBpZiAoIXNvcnQgfHwgIXNvcnQub3JkZXIpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGNvbnN0IHNvcnRGbjogUGJsTmdyaWRTb3J0ZXI8VD4gPSB0eXBlb2Ygc29ydC5zb3J0Rm4gPT09ICdmdW5jdGlvbidcbiAgICA/IHNvcnQuc29ydEZuXG4gICAgOiB0eXBlb2YgY29sdW1uLnNvcnQgPT09ICdmdW5jdGlvbidcbiAgICAgID8gY29sdW1uLnNvcnRcbiAgICAgIDogZGVmYXVsdFNvcnRlclxuICA7XG5cbiAgcmV0dXJuIGNvbHVtbiAmJiBkYXRhXG4gICAgPyBzb3J0Rm4oY29sdW1uLCBzb3J0LCBkYXRhLnNsaWNlKCkpXG4gICAgOiBkYXRhIHx8IFtdXG4gIDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFNvcnRlcjxUPihjb2x1bW46IFBibENvbHVtbiwgc29ydDogUGJsTmdyaWRTb3J0SW5zdHJ1Y3Rpb25zLCBkYXRhOiBUW10pOiBUW10ge1xuICByZXR1cm4gZGF0YS5zb3J0KChhLCBiKSA9PiB7XG4gICAgbGV0IHZhbHVlQSA9IGNvbHVtbi5nZXRWYWx1ZShhKTtcbiAgICBsZXQgdmFsdWVCID0gY29sdW1uLmdldFZhbHVlKGIpO1xuXG4gICAgdmFsdWVBID0gaXNOYU4oK3ZhbHVlQSkgPyB2YWx1ZUEgOiArdmFsdWVBO1xuICAgIHZhbHVlQiA9IGlzTmFOKCt2YWx1ZUIpID8gdmFsdWVCIDogK3ZhbHVlQjtcblxuICAgIHJldHVybiAodmFsdWVBIDwgdmFsdWVCID8gLTEgOiB2YWx1ZUEgPT09IHZhbHVlQiA/IDAgOiAxKSAqIChzb3J0Lm9yZGVyID09PSAnYXNjJyA/IDEgOiAtMSk7XG4gIH0pO1xufVxuIl19