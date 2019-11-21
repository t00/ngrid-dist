/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Given an object (item) and a path, returns the value at the path
 * @param {?} item
 * @param {?} col
 * @return {?}
 */
export function deepPathGet(item, col) {
    if (col.path) {
        for (const p of col.path) {
            item = item[p];
            if (!item)
                return;
        }
    }
    return item[col.prop];
}
/**
 * Given an object (item) and a path, returns the value at the path
 * @param {?} item
 * @param {?} col
 * @param {?} value
 * @return {?}
 */
export function deepPathSet(item, col, value) {
    if (col.path) {
        for (const p of col.path) {
            item = item[p];
            if (!item)
                return;
        }
    }
    item[col.prop] = value;
}
/**
 * Updates the column sizes of the columns provided based on the column definition metadata for each column.
 * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
 * @param {?} rowWidth
 * @param {?} tableColumns
 * @param {?} metaColumns
 * @return {?}
 */
export function resetColumnWidths(rowWidth, tableColumns, metaColumns) {
    const { pct, px } = rowWidth.defaultColumnWidth;
    /** @type {?} */
    const defaultWidth = `calc(${pct}% - ${px}px)`;
    for (const c of tableColumns) {
        c.setDefaultWidth(defaultWidth);
        c.updateWidth();
    }
    for (const m of metaColumns) {
        for (const c of [m.header, m.footer]) {
            if (c) {
                c.updateWidth('');
            }
        }
        // We don't handle groups because they are handled by `PblNgridComponent.resizeRows()`
        // which set the width for each.
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvdXRpbHMvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFTLEVBQUUsR0FBd0I7SUFDN0QsSUFBSyxHQUFHLENBQUMsSUFBSSxFQUFHO1FBQ2QsS0FBTSxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFHO1lBQzFCLElBQUksR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFDakIsSUFBSyxDQUFDLElBQUk7Z0JBQUcsT0FBTztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQzFCLENBQUM7Ozs7Ozs7O0FBS0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFTLEVBQUUsR0FBd0IsRUFBRSxLQUFVO0lBQ3pFLElBQUssR0FBRyxDQUFDLElBQUksRUFBRztRQUNkLEtBQU0sTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRztZQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFDO1lBQ2pCLElBQUssQ0FBQyxJQUFJO2dCQUFHLE9BQU87U0FDckI7S0FDRjtJQUNELElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzNCLENBQUM7Ozs7Ozs7OztBQU1ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFnQyxFQUNoQyxZQUF5QixFQUN6QixXQUFpQztVQUMzRCxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsa0JBQWtCOztVQUN6QyxZQUFZLEdBQUcsUUFBUSxHQUFHLE9BQU8sRUFBRSxLQUFLO0lBRTlDLEtBQUssTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFO1FBQzVCLENBQUMsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ2pCO0lBRUQsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7UUFDM0IsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxFQUFFO2dCQUNMLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkI7U0FDRjtRQUNELHNGQUFzRjtRQUN0RixnQ0FBZ0M7S0FDakM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uRGVmaW5pdGlvbiB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtblN0b3JlIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuaW1wb3J0IHsgU3RhdGljQ29sdW1uV2lkdGhMb2dpYyB9IGZyb20gJy4uL2NvbC13aWR0aC1sb2dpYy9zdGF0aWMtY29sdW1uLXdpZHRoJztcblxuLyoqXG4gKiBHaXZlbiBhbiBvYmplY3QgKGl0ZW0pIGFuZCBhIHBhdGgsIHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwUGF0aEdldChpdGVtOiBhbnksIGNvbDogUGJsQ29sdW1uRGVmaW5pdGlvbik6IGFueSB7XG4gIGlmICggY29sLnBhdGggKSB7XG4gICAgZm9yICggY29uc3QgcCBvZiBjb2wucGF0aCApIHtcbiAgICAgIGl0ZW0gPSBpdGVtWyBwIF07XG4gICAgICBpZiAoICFpdGVtICkgcmV0dXJuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXRlbVsgY29sLnByb3AgXTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBvYmplY3QgKGl0ZW0pIGFuZCBhIHBhdGgsIHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwUGF0aFNldChpdGVtOiBhbnksIGNvbDogUGJsQ29sdW1uRGVmaW5pdGlvbiwgdmFsdWU6IGFueSk6IHZvaWQge1xuICBpZiAoIGNvbC5wYXRoICkge1xuICAgIGZvciAoIGNvbnN0IHAgb2YgY29sLnBhdGggKSB7XG4gICAgICBpdGVtID0gaXRlbVsgcCBdO1xuICAgICAgaWYgKCAhaXRlbSApIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaXRlbVsgY29sLnByb3AgXSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzaXplcyBvZiB0aGUgY29sdW1ucyBwcm92aWRlZCBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gbWV0YWRhdGEgZm9yIGVhY2ggY29sdW1uLlxuICogVGhlIGZpbmFsIHdpZHRoIHJlcHJlc2VudCBhIHN0YXRpYyB3aWR0aCwgaXQgaXMgdGhlIHZhbHVlIGFzIHNldCBpbiB0aGUgZGVmaW5pdGlvbiAoZXhjZXB0IGNvbHVtbiB3aXRob3V0IHdpZHRoLCB3aGVyZSB0aGUgY2FsY3VsYXRlZCBnbG9iYWwgd2lkdGggaXMgc2V0KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q29sdW1uV2lkdGhzKHJvd1dpZHRoOiBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ29sdW1uczogUGJsQ29sdW1uW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YUNvbHVtbnM6IFBibE1ldGFDb2x1bW5TdG9yZVtdKTogdm9pZCB7XG4gIGNvbnN0IHsgcGN0LCBweCB9ID0gcm93V2lkdGguZGVmYXVsdENvbHVtbldpZHRoO1xuICBjb25zdCBkZWZhdWx0V2lkdGggPSBgY2FsYygke3BjdH0lIC0gJHtweH1weClgO1xuXG4gIGZvciAoY29uc3QgYyBvZiB0YWJsZUNvbHVtbnMpIHtcbiAgICBjLnNldERlZmF1bHRXaWR0aChkZWZhdWx0V2lkdGgpO1xuICAgIGMudXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgbSBvZiBtZXRhQ29sdW1ucykge1xuICAgIGZvciAoY29uc3QgYyBvZiBbbS5oZWFkZXIsIG0uZm9vdGVyXSkge1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgYy51cGRhdGVXaWR0aCgnJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFdlIGRvbid0IGhhbmRsZSBncm91cHMgYmVjYXVzZSB0aGV5IGFyZSBoYW5kbGVkIGJ5IGBQYmxOZ3JpZENvbXBvbmVudC5yZXNpemVSb3dzKClgXG4gICAgLy8gd2hpY2ggc2V0IHRoZSB3aWR0aCBmb3IgZWFjaC5cbiAgfVxufVxuIl19