/**
 * @fileoverview added by tsickle
 * Generated from: lib/data-source/filtering.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @param {?} columns
 * @return {?}
 */
export function createFilter(value, columns) {
    return value === undefined
        ? undefined
        : {
            columns,
            type: typeof value === 'function' ? 'predicate' : 'value',
            filter: value
        };
}
/**
 * @template T
 * @param {?} rawData
 * @param {?} filter
 * @return {?}
 */
export function filter(rawData, filter) {
    if (!filter || !rawData || rawData.length === 0) {
        return rawData;
    }
    else {
        /** @type {?} */
        const cols = filter.columns;
        if (filter.type === 'predicate') {
            /** @type {?} */
            const value = (/** @type {?} */ (filter.filter));
            return rawData.filter((/**
             * @param {?} v
             * @return {?}
             */
            v => value(v, cols)));
        }
        else if (filter.type === 'value') {
            /** @type {?} */
            const value = typeof filter.filter.toLowerCase === 'function' ? filter.filter.toLowerCase() : filter.filter;
            return rawData.filter((/**
             * @param {?} row
             * @return {?}
             */
            row => cols.some((/**
             * @param {?} col
             * @return {?}
             */
            col => {
                /** @type {?} */
                const predicate = col.filter || genericColumnPredicate;
                return predicate(col.filter ? filter.filter : value, col.getValue(row), row, col);
            }))));
        }
    }
    return rawData;
}
/**
 * A generic column predicate that compares the inclusion (text) of the value in the column value.
 * @type {?}
 */
export const genericColumnPredicate = (/**
 * @param {?} filterValue
 * @param {?} colValue
 * @param {?=} row
 * @param {?=} col
 * @return {?}
 */
(filterValue, colValue, row, col) => {
    return colValue && colValue.toString().toLowerCase().includes(filterValue);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLXNvdXJjZS9maWx0ZXJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBNEIsRUFBRSxPQUFvQjtJQUM3RSxPQUFPLEtBQUssS0FBSyxTQUFTO1FBQ3hCLENBQUMsQ0FBQyxTQUFTO1FBQ1gsQ0FBQyxDQUFDO1lBQ0EsT0FBTztZQUNQLElBQUksRUFBRSxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUN6RCxNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7QUFDTixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBSSxPQUFZLEVBQUUsTUFBd0I7SUFDOUQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMvQyxPQUFPLE9BQU8sQ0FBQztLQUNoQjtTQUFNOztjQUNDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTztRQUMzQixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFOztrQkFDekIsS0FBSyxHQUF3QixtQkFBSyxNQUFNLENBQUMsTUFBTSxFQUFBO1lBQ3JELE9BQU8sT0FBTyxDQUFDLE1BQU07Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztTQUM5QzthQUFNLElBQUssTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUc7O2tCQUM5QixLQUFLLEdBQUcsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQzNHLE9BQU8sT0FBTyxDQUFDLE1BQU07Ozs7WUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJOzs7O1lBQUUsR0FBRyxDQUFDLEVBQUU7O3NCQUN2QyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxzQkFBc0I7Z0JBQ3RELE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwRixDQUFDLEVBQUMsRUFBQyxDQUFDO1NBQ0w7S0FDRjtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7O0FBS0QsTUFBTSxPQUFPLHNCQUFzQjs7Ozs7OztBQUE4QixDQUFDLFdBQWdCLEVBQUUsUUFBYSxFQUFFLEdBQVMsRUFBRSxHQUFlLEVBQVcsRUFBRTtJQUN4SSxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzdFLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2dyaWQvY29sdW1ucyc7XG5pbXBvcnQgeyBEYXRhU291cmNlRmlsdGVyLCBEYXRhU291cmNlRmlsdGVyVG9rZW4sIERhdGFTb3VyY2VQcmVkaWNhdGUsIERhdGFTb3VyY2VDb2x1bW5QcmVkaWNhdGUgfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpbHRlcih2YWx1ZTogRGF0YVNvdXJjZUZpbHRlclRva2VuLCBjb2x1bW5zOiBQYmxDb2x1bW5bXSk6IERhdGFTb3VyY2VGaWx0ZXIge1xuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZFxuICAgID8gdW5kZWZpbmVkXG4gICAgOiB7XG4gICAgICBjb2x1bW5zLFxuICAgICAgdHlwZTogdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nID8gJ3ByZWRpY2F0ZScgOiAndmFsdWUnLFxuICAgICAgZmlsdGVyOiB2YWx1ZVxuICAgIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXI8VD4ocmF3RGF0YTogVFtdLCBmaWx0ZXI6IERhdGFTb3VyY2VGaWx0ZXIpOiBUW10ge1xuICBpZiAoIWZpbHRlciB8fCAhcmF3RGF0YSB8fCByYXdEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiByYXdEYXRhO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNvbHMgPSBmaWx0ZXIuY29sdW1ucztcbiAgICBpZiAoZmlsdGVyLnR5cGUgPT09ICdwcmVkaWNhdGUnKSB7XG4gICAgICBjb25zdCB2YWx1ZTogRGF0YVNvdXJjZVByZWRpY2F0ZSA9IDxhbnk+ZmlsdGVyLmZpbHRlcjtcbiAgICAgIHJldHVybiByYXdEYXRhLmZpbHRlciggdiA9PiB2YWx1ZSh2LCBjb2xzKSApO1xuICAgIH0gZWxzZSBpZiAoIGZpbHRlci50eXBlID09PSAndmFsdWUnICkge1xuICAgICAgY29uc3QgdmFsdWUgPSB0eXBlb2YgZmlsdGVyLmZpbHRlci50b0xvd2VyQ2FzZSA9PT0gJ2Z1bmN0aW9uJyA/IGZpbHRlci5maWx0ZXIudG9Mb3dlckNhc2UoKSA6IGZpbHRlci5maWx0ZXI7XG4gICAgICByZXR1cm4gcmF3RGF0YS5maWx0ZXIoIHJvdyA9PiBjb2xzLnNvbWUoIGNvbCA9PiB7XG4gICAgICAgIGNvbnN0IHByZWRpY2F0ZSA9IGNvbC5maWx0ZXIgfHwgZ2VuZXJpY0NvbHVtblByZWRpY2F0ZTtcbiAgICAgICAgcmV0dXJuIHByZWRpY2F0ZShjb2wuZmlsdGVyID8gZmlsdGVyLmZpbHRlciA6IHZhbHVlLCBjb2wuZ2V0VmFsdWUocm93KSwgcm93LCBjb2wpO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmF3RGF0YTtcbn1cblxuLyoqXG4gKiBBIGdlbmVyaWMgY29sdW1uIHByZWRpY2F0ZSB0aGF0IGNvbXBhcmVzIHRoZSBpbmNsdXNpb24gKHRleHQpIG9mIHRoZSB2YWx1ZSBpbiB0aGUgY29sdW1uIHZhbHVlLlxuICovXG5leHBvcnQgY29uc3QgZ2VuZXJpY0NvbHVtblByZWRpY2F0ZTogRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZSA9IChmaWx0ZXJWYWx1ZTogYW55LCBjb2xWYWx1ZTogYW55LCByb3c/OiBhbnksIGNvbD86IFBibENvbHVtbik6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gY29sVmFsdWUgJiYgY29sVmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGZpbHRlclZhbHVlKTtcbn1cbiJdfQ==