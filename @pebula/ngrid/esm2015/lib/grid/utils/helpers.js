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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC91dGlscy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFRQSxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVMsRUFBRSxHQUF3QjtJQUM3RCxJQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUc7UUFDZCxLQUFNLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUc7WUFDMUIsSUFBSSxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBQztZQUNqQixJQUFLLENBQUMsSUFBSTtnQkFBRyxPQUFPO1NBQ3JCO0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7QUFDMUIsQ0FBQzs7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVMsRUFBRSxHQUF3QixFQUFFLEtBQVU7SUFDekUsSUFBSyxHQUFHLENBQUMsSUFBSSxFQUFHO1FBQ2QsS0FBTSxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFHO1lBQzFCLElBQUksR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFDakIsSUFBSyxDQUFDLElBQUk7Z0JBQUcsT0FBTztTQUNyQjtLQUNGO0lBQ0QsSUFBSSxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUUsR0FBRyxLQUFLLENBQUM7QUFDM0IsQ0FBQzs7Ozs7Ozs7O0FBTUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLFFBQWdDLEVBQ2hDLFlBQXlCLEVBQ3pCLFdBQWlDO1VBQzNELEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLFFBQVEsQ0FBQyxrQkFBa0I7O1VBQ3pDLFlBQVksR0FBRyxRQUFRLEdBQUcsT0FBTyxFQUFFLEtBQUs7SUFFOUMsS0FBSyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUU7UUFDNUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDakI7SUFFRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRTtRQUMzQixLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuQjtTQUNGO1FBQ0Qsc0ZBQXNGO1FBQ3RGLGdDQUFnQztLQUNqQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW5EZWZpbml0aW9uIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uU3RvcmUgfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5pbXBvcnQgeyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljIH0gZnJvbSAnLi4vY29sLXdpZHRoLWxvZ2ljL3N0YXRpYy1jb2x1bW4td2lkdGgnO1xuXG4vKipcbiAqIEdpdmVuIGFuIG9iamVjdCAoaXRlbSkgYW5kIGEgcGF0aCwgcmV0dXJucyB0aGUgdmFsdWUgYXQgdGhlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBQYXRoR2V0KGl0ZW06IGFueSwgY29sOiBQYmxDb2x1bW5EZWZpbml0aW9uKTogYW55IHtcbiAgaWYgKCBjb2wucGF0aCApIHtcbiAgICBmb3IgKCBjb25zdCBwIG9mIGNvbC5wYXRoICkge1xuICAgICAgaXRlbSA9IGl0ZW1bIHAgXTtcbiAgICAgIGlmICggIWl0ZW0gKSByZXR1cm47XG4gICAgfVxuICB9XG4gIHJldHVybiBpdGVtWyBjb2wucHJvcCBdO1xufVxuXG4vKipcbiAqIEdpdmVuIGFuIG9iamVjdCAoaXRlbSkgYW5kIGEgcGF0aCwgcmV0dXJucyB0aGUgdmFsdWUgYXQgdGhlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBQYXRoU2V0KGl0ZW06IGFueSwgY29sOiBQYmxDb2x1bW5EZWZpbml0aW9uLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIGlmICggY29sLnBhdGggKSB7XG4gICAgZm9yICggY29uc3QgcCBvZiBjb2wucGF0aCApIHtcbiAgICAgIGl0ZW0gPSBpdGVtWyBwIF07XG4gICAgICBpZiAoICFpdGVtICkgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpdGVtWyBjb2wucHJvcCBdID0gdmFsdWU7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY29sdW1uIHNpemVzIG9mIHRoZSBjb2x1bW5zIHByb3ZpZGVkIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXG4gKiBUaGUgZmluYWwgd2lkdGggcmVwcmVzZW50IGEgc3RhdGljIHdpZHRoLCBpdCBpcyB0aGUgdmFsdWUgYXMgc2V0IGluIHRoZSBkZWZpbml0aW9uIChleGNlcHQgY29sdW1uIHdpdGhvdXQgd2lkdGgsIHdoZXJlIHRoZSBjYWxjdWxhdGVkIGdsb2JhbCB3aWR0aCBpcyBzZXQpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRDb2x1bW5XaWR0aHMocm93V2lkdGg6IFN0YXRpY0NvbHVtbldpZHRoTG9naWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDb2x1bW5zOiBQYmxDb2x1bW5bXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhQ29sdW1uczogUGJsTWV0YUNvbHVtblN0b3JlW10pOiB2b2lkIHtcbiAgY29uc3QgeyBwY3QsIHB4IH0gPSByb3dXaWR0aC5kZWZhdWx0Q29sdW1uV2lkdGg7XG4gIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGBjYWxjKCR7cGN0fSUgLSAke3B4fXB4KWA7XG5cbiAgZm9yIChjb25zdCBjIG9mIHRhYmxlQ29sdW1ucykge1xuICAgIGMuc2V0RGVmYXVsdFdpZHRoKGRlZmF1bHRXaWR0aCk7XG4gICAgYy51cGRhdGVXaWR0aCgpO1xuICB9XG5cbiAgZm9yIChjb25zdCBtIG9mIG1ldGFDb2x1bW5zKSB7XG4gICAgZm9yIChjb25zdCBjIG9mIFttLmhlYWRlciwgbS5mb290ZXJdKSB7XG4gICAgICBpZiAoYykge1xuICAgICAgICBjLnVwZGF0ZVdpZHRoKCcnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgZG9uJ3QgaGFuZGxlIGdyb3VwcyBiZWNhdXNlIHRoZXkgYXJlIGhhbmRsZWQgYnkgYFBibE5ncmlkQ29tcG9uZW50LnJlc2l6ZVJvd3MoKWBcbiAgICAvLyB3aGljaCBzZXQgdGhlIHdpZHRoIGZvciBlYWNoLlxuICB9XG59XG4iXX0=