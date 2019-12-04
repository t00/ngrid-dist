/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLXNvdXJjZS9maWx0ZXJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUE0QixFQUFFLE9BQW9CO0lBQzdFLE9BQU8sS0FBSyxLQUFLLFNBQVM7UUFDeEIsQ0FBQyxDQUFDLFNBQVM7UUFDWCxDQUFDLENBQUM7WUFDQSxPQUFPO1lBQ1AsSUFBSSxFQUFFLE9BQU8sS0FBSyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPO1lBQ3pELE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFJLE9BQVksRUFBRSxNQUF3QjtJQUM5RCxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQy9DLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO1NBQU07O2NBQ0MsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPO1FBQzNCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7O2tCQUN6QixLQUFLLEdBQXdCLG1CQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUE7WUFDckQsT0FBTyxPQUFPLENBQUMsTUFBTTs7OztZQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1NBQzlDO2FBQU0sSUFBSyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRzs7a0JBQzlCLEtBQUssR0FBRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDM0csT0FBTyxPQUFPLENBQUMsTUFBTTs7OztZQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7WUFBRSxHQUFHLENBQUMsRUFBRTs7c0JBQ3ZDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxJQUFJLHNCQUFzQjtnQkFDdEQsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BGLENBQUMsRUFBQyxFQUFDLENBQUM7U0FDTDtLQUNGO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQzs7Ozs7QUFLRCxNQUFNLE9BQU8sc0JBQXNCOzs7Ozs7O0FBQThCLENBQUMsV0FBZ0IsRUFBRSxRQUFhLEVBQUUsR0FBUyxFQUFFLEdBQWUsRUFBVyxFQUFFO0lBQ3hJLE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0UsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vZ3JpZC9jb2x1bW5zJztcbmltcG9ydCB7IERhdGFTb3VyY2VGaWx0ZXIsIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgRGF0YVNvdXJjZVByZWRpY2F0ZSwgRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsdGVyKHZhbHVlOiBEYXRhU291cmNlRmlsdGVyVG9rZW4sIGNvbHVtbnM6IFBibENvbHVtbltdKTogRGF0YVNvdXJjZUZpbHRlciB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHtcbiAgICAgIGNvbHVtbnMsXG4gICAgICB0eXBlOiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyAncHJlZGljYXRlJyA6ICd2YWx1ZScsXG4gICAgICBmaWx0ZXI6IHZhbHVlXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcjxUPihyYXdEYXRhOiBUW10sIGZpbHRlcjogRGF0YVNvdXJjZUZpbHRlcik6IFRbXSB7XG4gIGlmICghZmlsdGVyIHx8ICFyYXdEYXRhIHx8IHJhd0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHJhd0RhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY29scyA9IGZpbHRlci5jb2x1bW5zO1xuICAgIGlmIChmaWx0ZXIudHlwZSA9PT0gJ3ByZWRpY2F0ZScpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBEYXRhU291cmNlUHJlZGljYXRlID0gPGFueT5maWx0ZXIuZmlsdGVyO1xuICAgICAgcmV0dXJuIHJhd0RhdGEuZmlsdGVyKCB2ID0+IHZhbHVlKHYsIGNvbHMpICk7XG4gICAgfSBlbHNlIGlmICggZmlsdGVyLnR5cGUgPT09ICd2YWx1ZScgKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBmaWx0ZXIuZmlsdGVyLnRvTG93ZXJDYXNlID09PSAnZnVuY3Rpb24nID8gZmlsdGVyLmZpbHRlci50b0xvd2VyQ2FzZSgpIDogZmlsdGVyLmZpbHRlcjtcbiAgICAgIHJldHVybiByYXdEYXRhLmZpbHRlciggcm93ID0+IGNvbHMuc29tZSggY29sID0+IHtcbiAgICAgICAgY29uc3QgcHJlZGljYXRlID0gY29sLmZpbHRlciB8fCBnZW5lcmljQ29sdW1uUHJlZGljYXRlO1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlKGNvbC5maWx0ZXIgPyBmaWx0ZXIuZmlsdGVyIDogdmFsdWUsIGNvbC5nZXRWYWx1ZShyb3cpLCByb3csIGNvbCk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByYXdEYXRhO1xufVxuXG4vKipcbiAqIEEgZ2VuZXJpYyBjb2x1bW4gcHJlZGljYXRlIHRoYXQgY29tcGFyZXMgdGhlIGluY2x1c2lvbiAodGV4dCkgb2YgdGhlIHZhbHVlIGluIHRoZSBjb2x1bW4gdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmljQ29sdW1uUHJlZGljYXRlOiBEYXRhU291cmNlQ29sdW1uUHJlZGljYXRlID0gKGZpbHRlclZhbHVlOiBhbnksIGNvbFZhbHVlOiBhbnksIHJvdz86IGFueSwgY29sPzogUGJsQ29sdW1uKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBjb2xWYWx1ZSAmJiBjb2xWYWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpO1xufVxuIl19