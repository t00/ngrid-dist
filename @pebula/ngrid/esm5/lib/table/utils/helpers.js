/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Given an object (item) and a path, returns the value at the path
 * @param {?} item
 * @param {?} col
 * @return {?}
 */
export function deepPathGet(item, col) {
    var e_1, _a;
    if (col.path) {
        try {
            for (var _b = tslib_1.__values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                item = item[p];
                if (!item)
                    return;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
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
    var e_2, _a;
    if (col.path) {
        try {
            for (var _b = tslib_1.__values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
                var p = _c.value;
                item = item[p];
                if (!item)
                    return;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
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
export function resetColumnWidths(rowWidth, tableColumns, metaColumns, options) {
    var e_3, _a, e_4, _b, e_5, _c;
    if (options === void 0) { options = {}; }
    var _d = rowWidth.defaultColumnWidth, pct = _d.pct, px = _d.px;
    /** @type {?} */
    var defaultWidth = "calc(" + pct + "% - " + px + "px)";
    /** @type {?} */
    var mark = !!options.tableMarkForCheck;
    try {
        for (var tableColumns_1 = tslib_1.__values(tableColumns), tableColumns_1_1 = tableColumns_1.next(); !tableColumns_1_1.done; tableColumns_1_1 = tableColumns_1.next()) {
            var c = tableColumns_1_1.value;
            c.setDefaultWidth(defaultWidth);
            c.updateWidth(mark);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (tableColumns_1_1 && !tableColumns_1_1.done && (_a = tableColumns_1.return)) _a.call(tableColumns_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    mark = !!options.metaMarkForCheck;
    try {
        for (var metaColumns_1 = tslib_1.__values(metaColumns), metaColumns_1_1 = metaColumns_1.next(); !metaColumns_1_1.done; metaColumns_1_1 = metaColumns_1.next()) {
            var m = metaColumns_1_1.value;
            try {
                for (var _e = tslib_1.__values([m.header, m.footer]), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var c = _f.value;
                    if (c) {
                        c.updateWidth('');
                        if (mark) {
                            c.columnDef.markForCheck();
                        }
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
            // We don't handle groups because they are handled by `PblNgridComponent.resizeRows()`
            // which set the width for each.
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (metaColumns_1_1 && !metaColumns_1_1.done && (_b = metaColumns_1.return)) _b.call(metaColumns_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvdXRpbHMvaGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBUyxFQUFFLEdBQXdCOztJQUM3RCxJQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUc7O1lBQ2QsS0FBaUIsSUFBQSxLQUFBLGlCQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUEsZ0JBQUEsNEJBQUc7Z0JBQXRCLElBQU0sQ0FBQyxXQUFBO2dCQUNYLElBQUksR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7Z0JBQ2pCLElBQUssQ0FBQyxJQUFJO29CQUFHLE9BQU87YUFDckI7Ozs7Ozs7OztLQUNGO0lBQ0QsT0FBTyxJQUFJLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO0FBQzFCLENBQUM7Ozs7Ozs7O0FBS0QsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFTLEVBQUUsR0FBd0IsRUFBRSxLQUFVOztJQUN6RSxJQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUc7O1lBQ2QsS0FBaUIsSUFBQSxLQUFBLGlCQUFBLEdBQUcsQ0FBQyxJQUFJLENBQUEsZ0JBQUEsNEJBQUc7Z0JBQXRCLElBQU0sQ0FBQyxXQUFBO2dCQUNYLElBQUksR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7Z0JBQ2pCLElBQUssQ0FBQyxJQUFJO29CQUFHLE9BQU87YUFDckI7Ozs7Ozs7OztLQUNGO0lBQ0QsSUFBSSxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUUsR0FBRyxLQUFLLENBQUM7QUFDM0IsQ0FBQzs7Ozs7Ozs7OztBQU1ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFnQyxFQUNoQyxZQUF5QixFQUN6QixXQUFpQyxFQUNqQyxPQUEwRTs7SUFBMUUsd0JBQUEsRUFBQSxZQUEwRTtJQUNwRyxJQUFBLGdDQUF5QyxFQUF2QyxZQUFHLEVBQUUsVUFBa0M7O1FBQ3pDLFlBQVksR0FBRyxVQUFRLEdBQUcsWUFBTyxFQUFFLFFBQUs7O1FBRTFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7UUFDdEMsS0FBZ0IsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUEsb0VBQUU7WUFBekIsSUFBTSxDQUFDLHlCQUFBO1lBQ1YsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JCOzs7Ozs7Ozs7SUFFRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzs7UUFDbEMsS0FBZ0IsSUFBQSxnQkFBQSxpQkFBQSxXQUFXLENBQUEsd0NBQUEsaUVBQUU7WUFBeEIsSUFBTSxDQUFDLHdCQUFBOztnQkFDVixLQUFnQixJQUFBLEtBQUEsaUJBQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBakMsSUFBTSxDQUFDLFdBQUE7b0JBQ1YsSUFBSSxDQUFDLEVBQUU7d0JBQ0wsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQzt5QkFDNUI7cUJBQ0Y7aUJBQ0Y7Ozs7Ozs7OztZQUVELHNGQUFzRjtZQUN0RixnQ0FBZ0M7U0FDakM7Ozs7Ozs7OztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW5EZWZpbml0aW9uIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uU3RvcmUgfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5pbXBvcnQgeyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljIH0gZnJvbSAnLi4vY29sLXdpZHRoLWxvZ2ljL3N0YXRpYy1jb2x1bW4td2lkdGgnO1xuXG4vKipcbiAqIEdpdmVuIGFuIG9iamVjdCAoaXRlbSkgYW5kIGEgcGF0aCwgcmV0dXJucyB0aGUgdmFsdWUgYXQgdGhlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBQYXRoR2V0KGl0ZW06IGFueSwgY29sOiBQYmxDb2x1bW5EZWZpbml0aW9uKTogYW55IHtcbiAgaWYgKCBjb2wucGF0aCApIHtcbiAgICBmb3IgKCBjb25zdCBwIG9mIGNvbC5wYXRoICkge1xuICAgICAgaXRlbSA9IGl0ZW1bIHAgXTtcbiAgICAgIGlmICggIWl0ZW0gKSByZXR1cm47XG4gICAgfVxuICB9XG4gIHJldHVybiBpdGVtWyBjb2wucHJvcCBdO1xufVxuXG4vKipcbiAqIEdpdmVuIGFuIG9iamVjdCAoaXRlbSkgYW5kIGEgcGF0aCwgcmV0dXJucyB0aGUgdmFsdWUgYXQgdGhlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBQYXRoU2V0KGl0ZW06IGFueSwgY29sOiBQYmxDb2x1bW5EZWZpbml0aW9uLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gIGlmICggY29sLnBhdGggKSB7XG4gICAgZm9yICggY29uc3QgcCBvZiBjb2wucGF0aCApIHtcbiAgICAgIGl0ZW0gPSBpdGVtWyBwIF07XG4gICAgICBpZiAoICFpdGVtICkgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpdGVtWyBjb2wucHJvcCBdID0gdmFsdWU7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgY29sdW1uIHNpemVzIG9mIHRoZSBjb2x1bW5zIHByb3ZpZGVkIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXG4gKiBUaGUgZmluYWwgd2lkdGggcmVwcmVzZW50IGEgc3RhdGljIHdpZHRoLCBpdCBpcyB0aGUgdmFsdWUgYXMgc2V0IGluIHRoZSBkZWZpbml0aW9uIChleGNlcHQgY29sdW1uIHdpdGhvdXQgd2lkdGgsIHdoZXJlIHRoZSBjYWxjdWxhdGVkIGdsb2JhbCB3aWR0aCBpcyBzZXQpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRDb2x1bW5XaWR0aHMocm93V2lkdGg6IFN0YXRpY0NvbHVtbldpZHRoTG9naWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVDb2x1bW5zOiBQYmxDb2x1bW5bXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhQ29sdW1uczogUGJsTWV0YUNvbHVtblN0b3JlW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogeyB0YWJsZU1hcmtGb3JDaGVjaz86IGJvb2xlYW47IG1ldGFNYXJrRm9yQ2hlY2s/OiBib29sZWFuOyB9ID0ge30pOiB2b2lkIHtcbiAgY29uc3QgeyBwY3QsIHB4IH0gPSByb3dXaWR0aC5kZWZhdWx0Q29sdW1uV2lkdGg7XG4gIGNvbnN0IGRlZmF1bHRXaWR0aCA9IGBjYWxjKCR7cGN0fSUgLSAke3B4fXB4KWA7XG5cbiAgbGV0IG1hcmsgPSAhIW9wdGlvbnMudGFibGVNYXJrRm9yQ2hlY2s7XG4gIGZvciAoY29uc3QgYyBvZiB0YWJsZUNvbHVtbnMpIHtcbiAgICBjLnNldERlZmF1bHRXaWR0aChkZWZhdWx0V2lkdGgpO1xuICAgIGMudXBkYXRlV2lkdGgobWFyayk7XG4gIH1cblxuICBtYXJrID0gISFvcHRpb25zLm1ldGFNYXJrRm9yQ2hlY2s7XG4gIGZvciAoY29uc3QgbSBvZiBtZXRhQ29sdW1ucykge1xuICAgIGZvciAoY29uc3QgYyBvZiBbbS5oZWFkZXIsIG0uZm9vdGVyXSkge1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgYy51cGRhdGVXaWR0aCgnJyk7XG4gICAgICAgIGlmIChtYXJrKSB7XG4gICAgICAgICAgYy5jb2x1bW5EZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBXZSBkb24ndCBoYW5kbGUgZ3JvdXBzIGJlY2F1c2UgdGhleSBhcmUgaGFuZGxlZCBieSBgUGJsTmdyaWRDb21wb25lbnQucmVzaXplUm93cygpYFxuICAgIC8vIHdoaWNoIHNldCB0aGUgd2lkdGggZm9yIGVhY2guXG4gIH1cbn1cbiJdfQ==