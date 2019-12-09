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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2Uvc29ydGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBT0EsTUFBTSxVQUFVLFNBQVMsQ0FBSSxNQUFpQixFQUFFLElBQTRCLEVBQUUsSUFBUztJQUNyRixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUN4QixPQUFPLElBQUksQ0FBQztLQUNiOztRQUVLLE1BQU0sR0FBc0IsT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFVBQVU7UUFDakUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQ2IsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVO1lBQ2pDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUNiLENBQUMsQ0FBQyxhQUFhO0lBR25CLE9BQU8sTUFBTSxJQUFJLElBQUk7UUFDbkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FDYjtBQUNILENBQUM7Ozs7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUksTUFBaUIsRUFBRSxJQUE4QixFQUFFLElBQVM7SUFDcEYsT0FBTyxJQUFJLENBQUMsSUFBSTs7Ozs7SUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDOztZQUNoQixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7O1lBQzNCLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUUvQixNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDM0MsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRTNDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUYsQ0FBQyxFQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vdGFibGUvY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxOZ3JpZFNvcnRJbnN0cnVjdGlvbnMsIFBibE5ncmlkU29ydGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQXBwbHkgc29ydGluZyBvbiBhIGNvbGxlY3Rpb24sIGJhc2VkIG9uIGNvbHVtbiBhbmQgc29ydCBkZWZpbml0aW9ucy5cbiAqIElmIHRoZSBzb3J0IGRlZmluaXRpb24gZG9lc24ndCBoYXZlIGEgc29ydGluZyBmdW5jdGlvbiB0aGUgZGVmYXVsdCBzb3J0ZXIgaXMgdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5U29ydDxUPihjb2x1bW46IFBibENvbHVtbiwgc29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgZGF0YTogVFtdKTogVFtdIHtcbiAgaWYgKCFzb3J0IHx8ICFzb3J0Lm9yZGVyKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCBzb3J0Rm46IFBibE5ncmlkU29ydGVyPFQ+ID0gdHlwZW9mIHNvcnQuc29ydEZuID09PSAnZnVuY3Rpb24nXG4gICAgPyBzb3J0LnNvcnRGblxuICAgIDogdHlwZW9mIGNvbHVtbi5zb3J0ID09PSAnZnVuY3Rpb24nXG4gICAgICA/IGNvbHVtbi5zb3J0XG4gICAgICA6IGRlZmF1bHRTb3J0ZXJcbiAgO1xuXG4gIHJldHVybiBjb2x1bW4gJiYgZGF0YVxuICAgID8gc29ydEZuKGNvbHVtbiwgc29ydCwgZGF0YS5zbGljZSgpKVxuICAgIDogZGF0YSB8fCBbXVxuICA7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTb3J0ZXI8VD4oY29sdW1uOiBQYmxDb2x1bW4sIHNvcnQ6IFBibE5ncmlkU29ydEluc3RydWN0aW9ucywgZGF0YTogVFtdKTogVFtdIHtcbiAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCB2YWx1ZUEgPSBjb2x1bW4uZ2V0VmFsdWUoYSk7XG4gICAgbGV0IHZhbHVlQiA9IGNvbHVtbi5nZXRWYWx1ZShiKTtcblxuICAgIHZhbHVlQSA9IGlzTmFOKCt2YWx1ZUEpID8gdmFsdWVBIDogK3ZhbHVlQTtcbiAgICB2YWx1ZUIgPSBpc05hTigrdmFsdWVCKSA/IHZhbHVlQiA6ICt2YWx1ZUI7XG5cbiAgICByZXR1cm4gKHZhbHVlQSA8IHZhbHVlQiA/IC0xIDogdmFsdWVBID09PSB2YWx1ZUIgPyAwIDogMSkgKiAoc29ydC5vcmRlciA9PT0gJ2FzYycgPyAxIDogLTEpO1xuICB9KTtcbn1cbiJdfQ==