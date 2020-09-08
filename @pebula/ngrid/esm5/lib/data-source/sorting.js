/**
 * @fileoverview added by tsickle
 * Generated from: lib/data-source/sorting.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2Uvc29ydGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU9BLE1BQU0sVUFBVSxTQUFTLENBQUksTUFBaUIsRUFBRSxJQUE0QixFQUFFLElBQVM7SUFDckYsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUM7S0FDYjs7UUFFSyxNQUFNLEdBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVO1FBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUNiLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVTtZQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDYixDQUFDLENBQUMsYUFBYTtJQUduQixPQUFPLE1BQU0sSUFBSSxJQUFJO1FBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQ2I7QUFDSCxDQUFDOzs7Ozs7OztBQUVELFNBQVMsYUFBYSxDQUFJLE1BQWlCLEVBQUUsSUFBOEIsRUFBRSxJQUFTO0lBQ3BGLE9BQU8sSUFBSSxDQUFDLElBQUk7Ozs7O0lBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQzs7WUFDaEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFL0IsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQzNDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUUzQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2dyaWQvY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxOZ3JpZFNvcnRJbnN0cnVjdGlvbnMsIFBibE5ncmlkU29ydGVyIH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogQXBwbHkgc29ydGluZyBvbiBhIGNvbGxlY3Rpb24sIGJhc2VkIG9uIGNvbHVtbiBhbmQgc29ydCBkZWZpbml0aW9ucy5cbiAqIElmIHRoZSBzb3J0IGRlZmluaXRpb24gZG9lc24ndCBoYXZlIGEgc29ydGluZyBmdW5jdGlvbiB0aGUgZGVmYXVsdCBzb3J0ZXIgaXMgdXNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5U29ydDxUPihjb2x1bW46IFBibENvbHVtbiwgc29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgZGF0YTogVFtdKTogVFtdIHtcbiAgaWYgKCFzb3J0IHx8ICFzb3J0Lm9yZGVyKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCBzb3J0Rm46IFBibE5ncmlkU29ydGVyPFQ+ID0gdHlwZW9mIHNvcnQuc29ydEZuID09PSAnZnVuY3Rpb24nXG4gICAgPyBzb3J0LnNvcnRGblxuICAgIDogdHlwZW9mIGNvbHVtbi5zb3J0ID09PSAnZnVuY3Rpb24nXG4gICAgICA/IGNvbHVtbi5zb3J0XG4gICAgICA6IGRlZmF1bHRTb3J0ZXJcbiAgO1xuXG4gIHJldHVybiBjb2x1bW4gJiYgZGF0YVxuICAgID8gc29ydEZuKGNvbHVtbiwgc29ydCwgZGF0YS5zbGljZSgpKVxuICAgIDogZGF0YSB8fCBbXVxuICA7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRTb3J0ZXI8VD4oY29sdW1uOiBQYmxDb2x1bW4sIHNvcnQ6IFBibE5ncmlkU29ydEluc3RydWN0aW9ucywgZGF0YTogVFtdKTogVFtdIHtcbiAgcmV0dXJuIGRhdGEuc29ydCgoYSwgYikgPT4ge1xuICAgIGxldCB2YWx1ZUEgPSBjb2x1bW4uZ2V0VmFsdWUoYSk7XG4gICAgbGV0IHZhbHVlQiA9IGNvbHVtbi5nZXRWYWx1ZShiKTtcblxuICAgIHZhbHVlQSA9IGlzTmFOKCt2YWx1ZUEpID8gdmFsdWVBIDogK3ZhbHVlQTtcbiAgICB2YWx1ZUIgPSBpc05hTigrdmFsdWVCKSA/IHZhbHVlQiA6ICt2YWx1ZUI7XG5cbiAgICByZXR1cm4gKHZhbHVlQSA8IHZhbHVlQiA/IC0xIDogdmFsdWVBID09PSB2YWx1ZUIgPyAwIDogMSkgKiAoc29ydC5vcmRlciA9PT0gJ2FzYycgPyAxIDogLTEpO1xuICB9KTtcbn1cbiJdfQ==