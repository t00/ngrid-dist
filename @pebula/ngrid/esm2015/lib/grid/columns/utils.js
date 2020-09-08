/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const RE_PARSE_STYLE_LENGTH_UNIT = /((?:\d*\.)?\d+)(%|px)$/;
/**
 * @param {?} exp
 * @return {?}
 */
export function parseStyleWidth(exp) {
    /** @type {?} */
    const match = RE_PARSE_STYLE_LENGTH_UNIT.exec(exp);
    if (match) {
        return { value: Number(match[1]), type: (/** @type {?} */ (match[2])) };
    }
}
/**
 * @template T
 * @param {?} def
 * @param {?} target
 * @return {?}
 */
export function initDefinitions(def, target) {
    /** @type {?} */
    const copyKeys = ['id', 'label', 'css', 'minWidth', 'width', 'maxWidth', 'type'];
    copyKeys.forEach((/**
     * @param {?} k
     * @return {?}
     */
    k => k in def && (target[(/** @type {?} */ (k))] = def[k])));
    if (def.data) {
        target.data = Object.assign(target.data || {}, def.data);
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isColumnDefinition(obj) {
    // TODO: Get rid of this duck-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
    return !!obj.prop && !obj.hasOwnProperty('span');
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isColumnGroupDefinition(obj) {
    // TODO: Get rid of this duck-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
    return !!obj.prop && obj.hasOwnProperty('span');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sdW1ucy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7TUFFTSwwQkFBMEIsR0FBRyx3QkFBd0I7Ozs7O0FBRTNELE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBVzs7VUFDbkMsS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEQsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFBLEVBQUUsQ0FBQztLQUMxRDtBQUNILENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFvQyxHQUE0QixFQUFFLE1BQVM7O1VBQ2xHLFFBQVEsR0FBeUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7SUFDdEgsUUFBUSxDQUFDLE9BQU87Ozs7SUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsbUJBQUEsQ0FBQyxFQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3JFLElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtRQUNaLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUQ7QUFDSCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxHQUFRO0lBQ3pDLG1IQUFtSDtJQUNuSCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFDOzs7OztBQUdELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxHQUFRO0lBQzlDLG1IQUFtSDtJQUNuSCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibEJhc2VDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgUkVfUEFSU0VfU1RZTEVfTEVOR1RIX1VOSVQgPSAvKCg/OlxcZCpcXC4pP1xcZCspKCV8cHgpJC87XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0eWxlV2lkdGgoZXhwOiBzdHJpbmcpOiB7IHZhbHVlOiBudW1iZXIsIHR5cGU6ICdweCcgfCAnJSd9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWF0Y2ggPSBSRV9QQVJTRV9TVFlMRV9MRU5HVEhfVU5JVC5leGVjKGV4cCk7XG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiB7IHZhbHVlOiBOdW1iZXIobWF0Y2hbMV0pLCB0eXBlOiA8YW55PiBtYXRjaFsyXSB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGVmaW5pdGlvbnM8VCBleHRlbmRzIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPihkZWY6IFBibEJhc2VDb2x1bW5EZWZpbml0aW9uLCB0YXJnZXQ6IFQpOiB2b2lkIHtcbiAgY29uc3QgY29weUtleXM6IEFycmF5PGtleW9mIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPiA9IFsnaWQnLCAnbGFiZWwnLCAnY3NzJywgJ21pbldpZHRoJywgJ3dpZHRoJywgJ21heFdpZHRoJywgJ3R5cGUnXTtcbiAgY29weUtleXMuZm9yRWFjaCggayA9PiBrIGluIGRlZiAmJiAodGFyZ2V0W2sgYXMga2V5b2YgVF0gPSBkZWZba10pICk7XG4gIGlmIChkZWYuZGF0YSkge1xuICAgIHRhcmdldC5kYXRhID0gT2JqZWN0LmFzc2lnbih0YXJnZXQuZGF0YSB8fCB7fSwgZGVmLmRhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbHVtbkRlZmluaXRpb24ob2JqOiBhbnkpOiBvYmogaXMgUGJsQ29sdW1uRGVmaW5pdGlvbiB7XG4gIC8vIFRPRE86IEdldCByaWQgb2YgdGhpcyBkdWNrLXR5cGUgdHlwZSBtYXRjaGluZy4gQWNjZXB0IHNvbGlkIGluc3RhbmNlcyBpbiBQYmxUYWJsZS5jb2x1bW5zIGluc3RlYWQgb2YgaW50ZXJmYWNlcy5cbiAgcmV0dXJuICEhb2JqLnByb3AgJiYgIW9iai5oYXNPd25Qcm9wZXJ0eSgnc3BhbicpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbHVtbkdyb3VwRGVmaW5pdGlvbihvYmo6IGFueSk6IG9iaiBpcyBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24ge1xuICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoaXMgZHVjay10eXBlIHR5cGUgbWF0Y2hpbmcuIEFjY2VwdCBzb2xpZCBpbnN0YW5jZXMgaW4gUGJsVGFibGUuY29sdW1ucyBpbnN0ZWFkIG9mIGludGVyZmFjZXMuXG4gIHJldHVybiAhIW9iai5wcm9wICYmIG9iai5oYXNPd25Qcm9wZXJ0eSgnc3BhbicpO1xufVxuIl19