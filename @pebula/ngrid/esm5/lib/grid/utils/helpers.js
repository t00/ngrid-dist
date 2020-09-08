/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/utils/helpers.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
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
            for (var _b = __values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
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
            for (var _b = __values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        for (var tableColumns_1 = __values(tableColumns), tableColumns_1_1 = tableColumns_1.next(); !tableColumns_1_1.done; tableColumns_1_1 = tableColumns_1.next()) {
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
        for (var metaColumns_1 = __values(metaColumns), metaColumns_1_1 = metaColumns_1.next(); !metaColumns_1_1.done; metaColumns_1_1 = metaColumns_1.next()) {
            var m = metaColumns_1_1.value;
            try {
                for (var _e = (e_5 = void 0, __values([m.header, m.footer])), _f = _e.next(); !_f.done; _f = _e.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC91dGlscy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBUyxFQUFFLEdBQXdCOztJQUM3RCxJQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUc7O1lBQ2QsS0FBaUIsSUFBQSxLQUFBLFNBQUEsR0FBRyxDQUFDLElBQUksQ0FBQSxnQkFBQSw0QkFBRztnQkFBdEIsSUFBTSxDQUFDLFdBQUE7Z0JBQ1gsSUFBSSxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBQztnQkFDakIsSUFBSyxDQUFDLElBQUk7b0JBQUcsT0FBTzthQUNyQjs7Ozs7Ozs7O0tBQ0Y7SUFDRCxPQUFPLElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFFLENBQUM7QUFDMUIsQ0FBQzs7Ozs7Ozs7QUFLRCxNQUFNLFVBQVUsV0FBVyxDQUFDLElBQVMsRUFBRSxHQUF3QixFQUFFLEtBQVU7O0lBQ3pFLElBQUssR0FBRyxDQUFDLElBQUksRUFBRzs7WUFDZCxLQUFpQixJQUFBLEtBQUEsU0FBQSxHQUFHLENBQUMsSUFBSSxDQUFBLGdCQUFBLDRCQUFHO2dCQUF0QixJQUFNLENBQUMsV0FBQTtnQkFDWCxJQUFJLEdBQUcsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFDO2dCQUNqQixJQUFLLENBQUMsSUFBSTtvQkFBRyxPQUFPO2FBQ3JCOzs7Ozs7Ozs7S0FDRjtJQUNELElBQUksQ0FBRSxHQUFHLENBQUMsSUFBSSxDQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzNCLENBQUM7Ozs7Ozs7OztBQU1ELE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxRQUFnQyxFQUNoQyxZQUF5QixFQUN6QixXQUFpQzs7SUFDM0QsSUFBQSxnQ0FBeUMsRUFBdkMsWUFBRyxFQUFFLFVBQWtDOztRQUN6QyxZQUFZLEdBQUcsVUFBUSxHQUFHLFlBQU8sRUFBRSxRQUFLOztRQUU5QyxLQUFnQixJQUFBLGlCQUFBLFNBQUEsWUFBWSxDQUFBLDBDQUFBLG9FQUFFO1lBQXpCLElBQU0sQ0FBQyx5QkFBQTtZQUNWLENBQUMsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pCOzs7Ozs7Ozs7O1FBRUQsS0FBZ0IsSUFBQSxnQkFBQSxTQUFBLFdBQVcsQ0FBQSx3Q0FBQSxpRUFBRTtZQUF4QixJQUFNLENBQUMsd0JBQUE7O2dCQUNWLEtBQWdCLElBQUEsb0JBQUEsU0FBQSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUEsZ0JBQUEsNEJBQUU7b0JBQWpDLElBQU0sQ0FBQyxXQUFBO29CQUNWLElBQUksQ0FBQyxFQUFFO3dCQUNMLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7cUJBQ25CO2lCQUNGOzs7Ozs7Ozs7WUFDRCxzRkFBc0Y7WUFDdEYsZ0NBQWdDO1NBQ2pDOzs7Ozs7Ozs7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uRGVmaW5pdGlvbiB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtblN0b3JlIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuaW1wb3J0IHsgU3RhdGljQ29sdW1uV2lkdGhMb2dpYyB9IGZyb20gJy4uL2NvbC13aWR0aC1sb2dpYy9zdGF0aWMtY29sdW1uLXdpZHRoJztcblxuLyoqXG4gKiBHaXZlbiBhbiBvYmplY3QgKGl0ZW0pIGFuZCBhIHBhdGgsIHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwUGF0aEdldChpdGVtOiBhbnksIGNvbDogUGJsQ29sdW1uRGVmaW5pdGlvbik6IGFueSB7XG4gIGlmICggY29sLnBhdGggKSB7XG4gICAgZm9yICggY29uc3QgcCBvZiBjb2wucGF0aCApIHtcbiAgICAgIGl0ZW0gPSBpdGVtWyBwIF07XG4gICAgICBpZiAoICFpdGVtICkgcmV0dXJuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaXRlbVsgY29sLnByb3AgXTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBvYmplY3QgKGl0ZW0pIGFuZCBhIHBhdGgsIHJldHVybnMgdGhlIHZhbHVlIGF0IHRoZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwUGF0aFNldChpdGVtOiBhbnksIGNvbDogUGJsQ29sdW1uRGVmaW5pdGlvbiwgdmFsdWU6IGFueSk6IHZvaWQge1xuICBpZiAoIGNvbC5wYXRoICkge1xuICAgIGZvciAoIGNvbnN0IHAgb2YgY29sLnBhdGggKSB7XG4gICAgICBpdGVtID0gaXRlbVsgcCBdO1xuICAgICAgaWYgKCAhaXRlbSApIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaXRlbVsgY29sLnByb3AgXSA9IHZhbHVlO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzaXplcyBvZiB0aGUgY29sdW1ucyBwcm92aWRlZCBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gbWV0YWRhdGEgZm9yIGVhY2ggY29sdW1uLlxuICogVGhlIGZpbmFsIHdpZHRoIHJlcHJlc2VudCBhIHN0YXRpYyB3aWR0aCwgaXQgaXMgdGhlIHZhbHVlIGFzIHNldCBpbiB0aGUgZGVmaW5pdGlvbiAoZXhjZXB0IGNvbHVtbiB3aXRob3V0IHdpZHRoLCB3aGVyZSB0aGUgY2FsY3VsYXRlZCBnbG9iYWwgd2lkdGggaXMgc2V0KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0Q29sdW1uV2lkdGhzKHJvd1dpZHRoOiBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlQ29sdW1uczogUGJsQ29sdW1uW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0YUNvbHVtbnM6IFBibE1ldGFDb2x1bW5TdG9yZVtdKTogdm9pZCB7XG4gIGNvbnN0IHsgcGN0LCBweCB9ID0gcm93V2lkdGguZGVmYXVsdENvbHVtbldpZHRoO1xuICBjb25zdCBkZWZhdWx0V2lkdGggPSBgY2FsYygke3BjdH0lIC0gJHtweH1weClgO1xuXG4gIGZvciAoY29uc3QgYyBvZiB0YWJsZUNvbHVtbnMpIHtcbiAgICBjLnNldERlZmF1bHRXaWR0aChkZWZhdWx0V2lkdGgpO1xuICAgIGMudXBkYXRlV2lkdGgoKTtcbiAgfVxuXG4gIGZvciAoY29uc3QgbSBvZiBtZXRhQ29sdW1ucykge1xuICAgIGZvciAoY29uc3QgYyBvZiBbbS5oZWFkZXIsIG0uZm9vdGVyXSkge1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgYy51cGRhdGVXaWR0aCgnJyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFdlIGRvbid0IGhhbmRsZSBncm91cHMgYmVjYXVzZSB0aGV5IGFyZSBoYW5kbGVkIGJ5IGBQYmxOZ3JpZENvbXBvbmVudC5yZXNpemVSb3dzKClgXG4gICAgLy8gd2hpY2ggc2V0IHRoZSB3aWR0aCBmb3IgZWFjaC5cbiAgfVxufVxuIl19