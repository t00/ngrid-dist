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
    const sortFn = typeof sort.sortFn === 'function'
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
    (a, b) => {
        /** @type {?} */
        let valueA = column.getValue(a);
        /** @type {?} */
        let valueB = column.getValue(b);
        valueA = isNaN(+valueA) ? valueA : +valueA;
        valueB = isNaN(+valueB) ? valueB : +valueB;
        return (valueA < valueB ? -1 : valueA === valueB ? 0 : 1) * (sort.order === 'asc' ? 1 : -1);
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2Uvc29ydGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQU9BLE1BQU0sVUFBVSxTQUFTLENBQUksTUFBaUIsRUFBRSxJQUE0QixFQUFFLElBQVM7SUFDckYsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDeEIsT0FBTyxJQUFJLENBQUM7S0FDYjs7VUFFSyxNQUFNLEdBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxVQUFVO1FBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTTtRQUNiLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVTtZQUNqQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDYixDQUFDLENBQUMsYUFBYTtJQUduQixPQUFPLE1BQU0sSUFBSSxJQUFJO1FBQ25CLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQ2I7QUFDSCxDQUFDOzs7Ozs7OztBQUVELFNBQVMsYUFBYSxDQUFJLE1BQWlCLEVBQUUsSUFBOEIsRUFBRSxJQUFTO0lBQ3BGLE9BQU8sSUFBSSxDQUFDLElBQUk7Ozs7O0lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O1lBQ3BCLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7WUFDM0IsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFFM0MsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDLEVBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9ncmlkL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsTmdyaWRTb3J0SW5zdHJ1Y3Rpb25zLCBQYmxOZ3JpZFNvcnRlciB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIEFwcGx5IHNvcnRpbmcgb24gYSBjb2xsZWN0aW9uLCBiYXNlZCBvbiBjb2x1bW4gYW5kIHNvcnQgZGVmaW5pdGlvbnMuXG4gKiBJZiB0aGUgc29ydCBkZWZpbml0aW9uIGRvZXNuJ3QgaGF2ZSBhIHNvcnRpbmcgZnVuY3Rpb24gdGhlIGRlZmF1bHQgc29ydGVyIGlzIHVzZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVNvcnQ8VD4oY29sdW1uOiBQYmxDb2x1bW4sIHNvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24sIGRhdGE6IFRbXSk6IFRbXSB7XG4gIGlmICghc29ydCB8fCAhc29ydC5vcmRlcikge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3Qgc29ydEZuOiBQYmxOZ3JpZFNvcnRlcjxUPiA9IHR5cGVvZiBzb3J0LnNvcnRGbiA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc29ydC5zb3J0Rm5cbiAgICA6IHR5cGVvZiBjb2x1bW4uc29ydCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBjb2x1bW4uc29ydFxuICAgICAgOiBkZWZhdWx0U29ydGVyXG4gIDtcblxuICByZXR1cm4gY29sdW1uICYmIGRhdGFcbiAgICA/IHNvcnRGbihjb2x1bW4sIHNvcnQsIGRhdGEuc2xpY2UoKSlcbiAgICA6IGRhdGEgfHwgW11cbiAgO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0U29ydGVyPFQ+KGNvbHVtbjogUGJsQ29sdW1uLCBzb3J0OiBQYmxOZ3JpZFNvcnRJbnN0cnVjdGlvbnMsIGRhdGE6IFRbXSk6IFRbXSB7XG4gIHJldHVybiBkYXRhLnNvcnQoKGEsIGIpID0+IHtcbiAgICBsZXQgdmFsdWVBID0gY29sdW1uLmdldFZhbHVlKGEpO1xuICAgIGxldCB2YWx1ZUIgPSBjb2x1bW4uZ2V0VmFsdWUoYik7XG5cbiAgICB2YWx1ZUEgPSBpc05hTigrdmFsdWVBKSA/IHZhbHVlQSA6ICt2YWx1ZUE7XG4gICAgdmFsdWVCID0gaXNOYU4oK3ZhbHVlQikgPyB2YWx1ZUIgOiArdmFsdWVCO1xuXG4gICAgcmV0dXJuICh2YWx1ZUEgPCB2YWx1ZUIgPyAtMSA6IHZhbHVlQSA9PT0gdmFsdWVCID8gMCA6IDEpICogKHNvcnQub3JkZXIgPT09ICdhc2MnID8gMSA6IC0xKTtcbiAgfSk7XG59XG4iXX0=