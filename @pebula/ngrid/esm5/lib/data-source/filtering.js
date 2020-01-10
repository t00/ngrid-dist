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
            columns: columns,
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
        var cols_1 = filter.columns;
        if (filter.type === 'predicate') {
            /** @type {?} */
            var value_1 = (/** @type {?} */ (filter.filter));
            return rawData.filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return value_1(v, cols_1); }));
        }
        else if (filter.type === 'value') {
            /** @type {?} */
            var value_2 = typeof filter.filter.toLowerCase === 'function' ? filter.filter.toLowerCase() : filter.filter;
            return rawData.filter((/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return cols_1.some((/**
             * @param {?} col
             * @return {?}
             */
            function (col) {
                /** @type {?} */
                var predicate = col.filter || genericColumnPredicate;
                return predicate(col.filter ? filter.filter : value_2, col.getValue(row), row, col);
            })); }));
        }
    }
    return rawData;
}
/**
 * A generic column predicate that compares the inclusion (text) of the value in the column value.
 * @type {?}
 */
export var genericColumnPredicate = (/**
 * @param {?} filterValue
 * @param {?} colValue
 * @param {?=} row
 * @param {?=} col
 * @return {?}
 */
function (filterValue, colValue, row, col) {
    return colValue && colValue.toString().toLowerCase().includes(filterValue);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyaW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9kYXRhLXNvdXJjZS9maWx0ZXJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUE0QixFQUFFLE9BQW9CO0lBQzdFLE9BQU8sS0FBSyxLQUFLLFNBQVM7UUFDeEIsQ0FBQyxDQUFDLFNBQVM7UUFDWCxDQUFDLENBQUM7WUFDQSxPQUFPLFNBQUE7WUFDUCxJQUFJLEVBQUUsT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU87WUFDekQsTUFBTSxFQUFFLEtBQUs7U0FDZCxDQUFDO0FBQ04sQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxNQUFNLENBQUksT0FBWSxFQUFFLE1BQXdCO0lBQzlELElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDL0MsT0FBTyxPQUFPLENBQUM7S0FDaEI7U0FBTTs7WUFDQyxNQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU87UUFDM0IsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTs7Z0JBQ3pCLE9BQUssR0FBd0IsbUJBQUssTUFBTSxDQUFDLE1BQU0sRUFBQTtZQUNyRCxPQUFPLE9BQU8sQ0FBQyxNQUFNOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxPQUFLLENBQUMsQ0FBQyxFQUFFLE1BQUksQ0FBQyxFQUFkLENBQWMsRUFBRSxDQUFDO1NBQzlDO2FBQU0sSUFBSyxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRzs7Z0JBQzlCLE9BQUssR0FBRyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDM0csT0FBTyxPQUFPLENBQUMsTUFBTTs7OztZQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsTUFBSSxDQUFDLElBQUk7Ozs7WUFBRSxVQUFBLEdBQUc7O29CQUNwQyxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxzQkFBc0I7Z0JBQ3RELE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQUssRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNwRixDQUFDLEVBQUMsRUFINEIsQ0FHNUIsRUFBQyxDQUFDO1NBQ0w7S0FDRjtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7Ozs7O0FBS0QsTUFBTSxLQUFPLHNCQUFzQjs7Ozs7OztBQUE4QixVQUFDLFdBQWdCLEVBQUUsUUFBYSxFQUFFLEdBQVMsRUFBRSxHQUFlO0lBQzNILE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDN0UsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vZ3JpZC9jb2x1bW5zJztcbmltcG9ydCB7IERhdGFTb3VyY2VGaWx0ZXIsIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgRGF0YVNvdXJjZVByZWRpY2F0ZSwgRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZSB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmlsdGVyKHZhbHVlOiBEYXRhU291cmNlRmlsdGVyVG9rZW4sIGNvbHVtbnM6IFBibENvbHVtbltdKTogRGF0YVNvdXJjZUZpbHRlciB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHtcbiAgICAgIGNvbHVtbnMsXG4gICAgICB0eXBlOiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyAncHJlZGljYXRlJyA6ICd2YWx1ZScsXG4gICAgICBmaWx0ZXI6IHZhbHVlXG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcjxUPihyYXdEYXRhOiBUW10sIGZpbHRlcjogRGF0YVNvdXJjZUZpbHRlcik6IFRbXSB7XG4gIGlmICghZmlsdGVyIHx8ICFyYXdEYXRhIHx8IHJhd0RhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHJhd0RhdGE7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY29scyA9IGZpbHRlci5jb2x1bW5zO1xuICAgIGlmIChmaWx0ZXIudHlwZSA9PT0gJ3ByZWRpY2F0ZScpIHtcbiAgICAgIGNvbnN0IHZhbHVlOiBEYXRhU291cmNlUHJlZGljYXRlID0gPGFueT5maWx0ZXIuZmlsdGVyO1xuICAgICAgcmV0dXJuIHJhd0RhdGEuZmlsdGVyKCB2ID0+IHZhbHVlKHYsIGNvbHMpICk7XG4gICAgfSBlbHNlIGlmICggZmlsdGVyLnR5cGUgPT09ICd2YWx1ZScgKSB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHR5cGVvZiBmaWx0ZXIuZmlsdGVyLnRvTG93ZXJDYXNlID09PSAnZnVuY3Rpb24nID8gZmlsdGVyLmZpbHRlci50b0xvd2VyQ2FzZSgpIDogZmlsdGVyLmZpbHRlcjtcbiAgICAgIHJldHVybiByYXdEYXRhLmZpbHRlciggcm93ID0+IGNvbHMuc29tZSggY29sID0+IHtcbiAgICAgICAgY29uc3QgcHJlZGljYXRlID0gY29sLmZpbHRlciB8fCBnZW5lcmljQ29sdW1uUHJlZGljYXRlO1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlKGNvbC5maWx0ZXIgPyBmaWx0ZXIuZmlsdGVyIDogdmFsdWUsIGNvbC5nZXRWYWx1ZShyb3cpLCByb3csIGNvbCk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByYXdEYXRhO1xufVxuXG4vKipcbiAqIEEgZ2VuZXJpYyBjb2x1bW4gcHJlZGljYXRlIHRoYXQgY29tcGFyZXMgdGhlIGluY2x1c2lvbiAodGV4dCkgb2YgdGhlIHZhbHVlIGluIHRoZSBjb2x1bW4gdmFsdWUuXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmljQ29sdW1uUHJlZGljYXRlOiBEYXRhU291cmNlQ29sdW1uUHJlZGljYXRlID0gKGZpbHRlclZhbHVlOiBhbnksIGNvbFZhbHVlOiBhbnksIHJvdz86IGFueSwgY29sPzogUGJsQ29sdW1uKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBjb2xWYWx1ZSAmJiBjb2xWYWx1ZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoZmlsdGVyVmFsdWUpO1xufVxuIl19