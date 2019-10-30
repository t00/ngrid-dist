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
 * @param {?=} options
 * @return {?}
 */
export function resetColumnWidths(rowWidth, tableColumns, metaColumns, options = {}) {
    const { pct, px } = rowWidth.defaultColumnWidth;
    /** @type {?} */
    const defaultWidth = `calc(${pct}% - ${px}px)`;
    /** @type {?} */
    let mark = !!options.tableMarkForCheck;
    for (const c of tableColumns) {
        c.setDefaultWidth(defaultWidth);
        c.updateWidth(mark);
    }
    mark = !!options.metaMarkForCheck;
    for (const m of metaColumns) {
        for (const c of [m.header, m.footer]) {
            if (c) {
                c.updateWidth('');
                if (mark) {
                    c.columnDef.markForCheck();
                }
            }
        }
        // We don't handle groups because they are handled by `PblNgridComponent.resizeRows()`
        // which set the width for each.
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvdXRpbHMvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBUUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFTLEVBQUUsR0FBd0I7SUFDN0QsSUFBSyxHQUFHLENBQUMsSUFBSSxFQUFHO1FBQ2QsS0FBTSxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFHO1lBQzFCLElBQUksR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFDakIsSUFBSyxDQUFDLElBQUk7Z0JBQUcsT0FBTztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQzFCLENBQUM7Ozs7Ozs7O0FBS0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFTLEVBQUUsR0FBd0IsRUFBRSxLQUFVO0lBQ3pFLElBQUssR0FBRyxDQUFDLElBQUksRUFBRztRQUNkLEtBQU0sTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRztZQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFDO1lBQ2pCLElBQUssQ0FBQyxJQUFJO2dCQUFHLE9BQU87U0FDckI7S0FDRjtJQUNELElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzNCLENBQUM7Ozs7Ozs7Ozs7QUFNRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsUUFBZ0MsRUFDaEMsWUFBeUIsRUFDekIsV0FBaUMsRUFDakMsVUFBd0UsRUFBRTtVQUNwRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUMsa0JBQWtCOztVQUN6QyxZQUFZLEdBQUcsUUFBUSxHQUFHLE9BQU8sRUFBRSxLQUFLOztRQUUxQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUI7SUFDdEMsS0FBSyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUU7UUFDNUIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3JCO0lBRUQsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7SUFDbEMsS0FBSyxNQUFNLENBQUMsSUFBSSxXQUFXLEVBQUU7UUFDM0IsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3BDLElBQUksQ0FBQyxFQUFFO2dCQUNMLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2xCLElBQUksSUFBSSxFQUFFO29CQUNSLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRjtRQUVELHNGQUFzRjtRQUN0RixnQ0FBZ0M7S0FDakM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uRGVmaW5pdGlvbiB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtblN0b3JlIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuaW1wb3J0IHsgU3RhdGljQ29sdW1uV2lkdGhMb2dpYyB9IGZyb20gJy4uL2NvbC13aWR0aC1sb2dpYy9zdGF0aWMtY29sdW1uLXdpZHRoJztcblxuLyoqXG4gKiBHaXZlbiBhbiBvYmplY3QgKGl0ZW0pIGFuZCBhIHBhdGgsIHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwUGF0aEdldChpdGVtOiBhbnksIGNvbDogUGJsQ29sdW1uRGVmaW5pdGlvbik6IGFueSB7XG4gIGlmICggY29sLnBhdGggKSB7XG4gICAgZm9yICggY29uc3QgcCBvZiBjb2wucGF0aCApIHtcbiAgICAgIGl0ZW0gPSBpdGVtWyBwIF07XG4gICAgICBpZiAoICFpdGVtICkgcmV0dXJuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXRlbVsgY29sLnByb3AgXTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBvYmplY3QgKGl0ZW0pIGFuZCBhIHBhdGgsIHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwUGF0aFNldChpdGVtOiBhbnksIGNvbDogUGJsQ29sdW1uRGVmaW5pdGlvbiwgdmFsdWU6IGFueSk6IHZvaWQge1xuICBpZiAoIGNvbC5wYXRoICkge1xuICAgIGZvciAoIGNvbnN0IHAgb2YgY29sLnBhdGggKSB7XG4gICAgICBpdGVtID0gaXRlbVsgcCBdO1xuICAgICAgaWYgKCAhaXRlbSApIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaXRlbVsgY29sLnByb3AgXSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzaXplcyBvZiB0aGUgY29sdW1ucyBwcm92aWRlZCBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gbWV0YWRhdGEgZm9yIGVhY2ggY29sdW1uLlxuICogVGhlIGZpbmFsIHdpZHRoIHJlcHJlc2VudCBhIHN0YXRpYyB3aWR0aCwgaXQgaXMgdGhlIHZhbHVlIGFzIHNldCBpbiB0aGUgZGVmaW5pdGlvbiAoZXhjZXB0IGNvbHVtbiB3aXRob3V0IHdpZHRoLCB3aGVyZSB0aGUgY2FsY3VsYXRlZCBnbG9iYWwgd2lkdGggaXMgc2V0KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q29sdW1uV2lkdGhzKHJvd1dpZHRoOiBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ29sdW1uczogUGJsQ29sdW1uW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YUNvbHVtbnM6IFBibE1ldGFDb2x1bW5TdG9yZVtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHsgdGFibGVNYXJrRm9yQ2hlY2s/OiBib29sZWFuOyBtZXRhTWFya0ZvckNoZWNrPzogYm9vbGVhbjsgfSA9IHt9KTogdm9pZCB7XG4gIGNvbnN0IHsgcGN0LCBweCB9ID0gcm93V2lkdGguZGVmYXVsdENvbHVtbldpZHRoO1xuICBjb25zdCBkZWZhdWx0V2lkdGggPSBgY2FsYygke3BjdH0lIC0gJHtweH1weClgO1xuXG4gIGxldCBtYXJrID0gISFvcHRpb25zLnRhYmxlTWFya0ZvckNoZWNrO1xuICBmb3IgKGNvbnN0IGMgb2YgdGFibGVDb2x1bW5zKSB7XG4gICAgYy5zZXREZWZhdWx0V2lkdGgoZGVmYXVsdFdpZHRoKTtcbiAgICBjLnVwZGF0ZVdpZHRoKG1hcmspO1xuICB9XG5cbiAgbWFyayA9ICEhb3B0aW9ucy5tZXRhTWFya0ZvckNoZWNrO1xuICBmb3IgKGNvbnN0IG0gb2YgbWV0YUNvbHVtbnMpIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgW20uaGVhZGVyLCBtLmZvb3Rlcl0pIHtcbiAgICAgIGlmIChjKSB7XG4gICAgICAgIGMudXBkYXRlV2lkdGgoJycpO1xuICAgICAgICBpZiAobWFyaykge1xuICAgICAgICAgIGMuY29sdW1uRGVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gV2UgZG9uJ3QgaGFuZGxlIGdyb3VwcyBiZWNhdXNlIHRoZXkgYXJlIGhhbmRsZWQgYnkgYFBibE5ncmlkQ29tcG9uZW50LnJlc2l6ZVJvd3MoKWBcbiAgICAvLyB3aGljaCBzZXQgdGhlIHdpZHRoIGZvciBlYWNoLlxuICB9XG59XG4iXX0=