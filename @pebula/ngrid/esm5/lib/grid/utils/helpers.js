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
 * @return {?}
 */
export function resetColumnWidths(rowWidth, tableColumns, metaColumns) {
    var e_3, _a, e_4, _b, e_5, _c;
    var _d = rowWidth.defaultColumnWidth, pct = _d.pct, px = _d.px;
    /** @type {?} */
    var defaultWidth = "calc(" + pct + "% - " + px + "px)";
    try {
        for (var tableColumns_1 = tslib_1.__values(tableColumns), tableColumns_1_1 = tableColumns_1.next(); !tableColumns_1_1.done; tableColumns_1_1 = tableColumns_1.next()) {
            var c = tableColumns_1_1.value;
            c.setDefaultWidth(defaultWidth);
            c.updateWidth();
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (tableColumns_1_1 && !tableColumns_1_1.done && (_a = tableColumns_1.return)) _a.call(tableColumns_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    try {
        for (var metaColumns_1 = tslib_1.__values(metaColumns), metaColumns_1_1 = metaColumns_1.next(); !metaColumns_1_1.done; metaColumns_1_1 = metaColumns_1.next()) {
            var m = metaColumns_1_1.value;
            try {
                for (var _e = tslib_1.__values([m.header, m.footer]), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var c = _f.value;
                    if (c) {
                        c.updateWidth('');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC91dGlscy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBUUEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFTLEVBQUUsR0FBd0I7O0lBQzdELElBQUssR0FBRyxDQUFDLElBQUksRUFBRzs7WUFDZCxLQUFpQixJQUFBLEtBQUEsaUJBQUEsR0FBRyxDQUFDLElBQUksQ0FBQSxnQkFBQSw0QkFBRztnQkFBdEIsSUFBTSxDQUFDLFdBQUE7Z0JBQ1gsSUFBSSxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBQztnQkFDakIsSUFBSyxDQUFDLElBQUk7b0JBQUcsT0FBTzthQUNyQjs7Ozs7Ozs7O0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7QUFDMUIsQ0FBQzs7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVMsRUFBRSxHQUF3QixFQUFFLEtBQVU7O0lBQ3pFLElBQUssR0FBRyxDQUFDLElBQUksRUFBRzs7WUFDZCxLQUFpQixJQUFBLEtBQUEsaUJBQUEsR0FBRyxDQUFDLElBQUksQ0FBQSxnQkFBQSw0QkFBRztnQkFBdEIsSUFBTSxDQUFDLFdBQUE7Z0JBQ1gsSUFBSSxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBQztnQkFDakIsSUFBSyxDQUFDLElBQUk7b0JBQUcsT0FBTzthQUNyQjs7Ozs7Ozs7O0tBQ0Y7SUFDRCxJQUFJLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxHQUFHLEtBQUssQ0FBQztBQUMzQixDQUFDOzs7Ozs7Ozs7QUFNRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsUUFBZ0MsRUFDaEMsWUFBeUIsRUFDekIsV0FBaUM7O0lBQzNELElBQUEsZ0NBQXlDLEVBQXZDLFlBQUcsRUFBRSxVQUFrQzs7UUFDekMsWUFBWSxHQUFHLFVBQVEsR0FBRyxZQUFPLEVBQUUsUUFBSzs7UUFFOUMsS0FBZ0IsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUEsb0VBQUU7WUFBekIsSUFBTSxDQUFDLHlCQUFBO1lBQ1YsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakI7Ozs7Ozs7Ozs7UUFFRCxLQUFnQixJQUFBLGdCQUFBLGlCQUFBLFdBQVcsQ0FBQSx3Q0FBQSxpRUFBRTtZQUF4QixJQUFNLENBQUMsd0JBQUE7O2dCQUNWLEtBQWdCLElBQUEsS0FBQSxpQkFBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO29CQUFqQyxJQUFNLENBQUMsV0FBQTtvQkFDVixJQUFJLENBQUMsRUFBRTt3QkFDTCxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNuQjtpQkFDRjs7Ozs7Ozs7O1lBQ0Qsc0ZBQXNGO1lBQ3RGLGdDQUFnQztTQUNqQzs7Ozs7Ozs7O0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbkRlZmluaXRpb24gfSBmcm9tICcuLi9jb2x1bW5zL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW5TdG9yZSB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcbmltcG9ydCB7IFN0YXRpY0NvbHVtbldpZHRoTG9naWMgfSBmcm9tICcuLi9jb2wtd2lkdGgtbG9naWMvc3RhdGljLWNvbHVtbi13aWR0aCc7XG5cbi8qKlxuICogR2l2ZW4gYW4gb2JqZWN0IChpdGVtKSBhbmQgYSBwYXRoLCByZXR1cm5zIHRoZSB2YWx1ZSBhdCB0aGUgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcFBhdGhHZXQoaXRlbTogYW55LCBjb2w6IFBibENvbHVtbkRlZmluaXRpb24pOiBhbnkge1xuICBpZiAoIGNvbC5wYXRoICkge1xuICAgIGZvciAoIGNvbnN0IHAgb2YgY29sLnBhdGggKSB7XG4gICAgICBpdGVtID0gaXRlbVsgcCBdO1xuICAgICAgaWYgKCAhaXRlbSApIHJldHVybjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGl0ZW1bIGNvbC5wcm9wIF07XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gb2JqZWN0IChpdGVtKSBhbmQgYSBwYXRoLCByZXR1cm5zIHRoZSB2YWx1ZSBhdCB0aGUgcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcFBhdGhTZXQoaXRlbTogYW55LCBjb2w6IFBibENvbHVtbkRlZmluaXRpb24sIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgaWYgKCBjb2wucGF0aCApIHtcbiAgICBmb3IgKCBjb25zdCBwIG9mIGNvbC5wYXRoICkge1xuICAgICAgaXRlbSA9IGl0ZW1bIHAgXTtcbiAgICAgIGlmICggIWl0ZW0gKSByZXR1cm47XG4gICAgfVxuICB9XG4gIGl0ZW1bIGNvbC5wcm9wIF0gPSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBjb2x1bW4gc2l6ZXMgb2YgdGhlIGNvbHVtbnMgcHJvdmlkZWQgYmFzZWQgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9uIG1ldGFkYXRhIGZvciBlYWNoIGNvbHVtbi5cbiAqIFRoZSBmaW5hbCB3aWR0aCByZXByZXNlbnQgYSBzdGF0aWMgd2lkdGgsIGl0IGlzIHRoZSB2YWx1ZSBhcyBzZXQgaW4gdGhlIGRlZmluaXRpb24gKGV4Y2VwdCBjb2x1bW4gd2l0aG91dCB3aWR0aCwgd2hlcmUgdGhlIGNhbGN1bGF0ZWQgZ2xvYmFsIHdpZHRoIGlzIHNldCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNldENvbHVtbldpZHRocyhyb3dXaWR0aDogU3RhdGljQ29sdW1uV2lkdGhMb2dpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZUNvbHVtbnM6IFBibENvbHVtbltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGFDb2x1bW5zOiBQYmxNZXRhQ29sdW1uU3RvcmVbXSk6IHZvaWQge1xuICBjb25zdCB7IHBjdCwgcHggfSA9IHJvd1dpZHRoLmRlZmF1bHRDb2x1bW5XaWR0aDtcbiAgY29uc3QgZGVmYXVsdFdpZHRoID0gYGNhbGMoJHtwY3R9JSAtICR7cHh9cHgpYDtcblxuICBmb3IgKGNvbnN0IGMgb2YgdGFibGVDb2x1bW5zKSB7XG4gICAgYy5zZXREZWZhdWx0V2lkdGgoZGVmYXVsdFdpZHRoKTtcbiAgICBjLnVwZGF0ZVdpZHRoKCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IG0gb2YgbWV0YUNvbHVtbnMpIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgW20uaGVhZGVyLCBtLmZvb3Rlcl0pIHtcbiAgICAgIGlmIChjKSB7XG4gICAgICAgIGMudXBkYXRlV2lkdGgoJycpO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBXZSBkb24ndCBoYW5kbGUgZ3JvdXBzIGJlY2F1c2UgdGhleSBhcmUgaGFuZGxlZCBieSBgUGJsTmdyaWRDb21wb25lbnQucmVzaXplUm93cygpYFxuICAgIC8vIHdoaWNoIHNldCB0aGUgd2lkdGggZm9yIGVhY2guXG4gIH1cbn1cbiJdfQ==