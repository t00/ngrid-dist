/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var RE_PARSE_STYLE_LENGTH_UNIT = /((?:\d*\.)?\d+)(%|px)$/;
/**
 * @param {?} exp
 * @return {?}
 */
export function parseStyleWidth(exp) {
    /** @type {?} */
    var match = RE_PARSE_STYLE_LENGTH_UNIT.exec(exp);
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
    var copyKeys = ['id', 'label', 'css', 'minWidth', 'width', 'maxWidth', 'type'];
    copyKeys.forEach((/**
     * @param {?} k
     * @return {?}
     */
    function (k) { return k in def && (target[k] = def[k]); }));
    if (def.data) {
        target.data = Object.assign(target.data || {}, def.data);
    }
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isColumnDefinition(obj) {
    // TODO: Get rid of this duckt-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
    return !!obj.prop && !obj.hasOwnProperty('span');
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isColumnGroupDefinition(obj) {
    // TODO: Get rid of this duckt-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
    return !!obj.prop && obj.hasOwnProperty('span');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29sdW1ucy91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztJQUVNLDBCQUEwQixHQUFHLHdCQUF3Qjs7Ozs7QUFFM0QsTUFBTSxVQUFVLGVBQWUsQ0FBQyxHQUFXOztRQUNuQyxLQUFLLEdBQUcsMEJBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsRCxJQUFJLEtBQUssRUFBRTtRQUNULE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUEsRUFBRSxDQUFDO0tBQzFEO0FBQ0gsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxlQUFlLENBQW9DLEdBQTRCLEVBQUUsTUFBUzs7UUFDbEcsUUFBUSxHQUF5QyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztJQUN0SCxRQUFRLENBQUMsT0FBTzs7OztJQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBaEMsQ0FBZ0MsRUFBRSxDQUFDO0lBQzFELElBQUksR0FBRyxDQUFDLElBQUksRUFBRTtRQUNaLE1BQU0sQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDMUQ7QUFDSCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxHQUFRO0lBQ3pDLG9IQUFvSDtJQUNwSCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRCxDQUFDOzs7OztBQUdELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxHQUFRO0lBQzlDLG9IQUFvSDtJQUNwSCxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibEJhc2VDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgUkVfUEFSU0VfU1RZTEVfTEVOR1RIX1VOSVQgPSAvKCg/OlxcZCpcXC4pP1xcZCspKCV8cHgpJC87XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN0eWxlV2lkdGgoZXhwOiBzdHJpbmcpOiB7IHZhbHVlOiBudW1iZXIsIHR5cGU6ICdweCcgfCAnJSd9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgbWF0Y2ggPSBSRV9QQVJTRV9TVFlMRV9MRU5HVEhfVU5JVC5leGVjKGV4cCk7XG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiB7IHZhbHVlOiBOdW1iZXIobWF0Y2hbMV0pLCB0eXBlOiA8YW55PiBtYXRjaFsyXSB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0RGVmaW5pdGlvbnM8VCBleHRlbmRzIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPihkZWY6IFBibEJhc2VDb2x1bW5EZWZpbml0aW9uLCB0YXJnZXQ6IFQpOiB2b2lkIHtcbiAgY29uc3QgY29weUtleXM6IEFycmF5PGtleW9mIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPiA9IFsnaWQnLCAnbGFiZWwnLCAnY3NzJywgJ21pbldpZHRoJywgJ3dpZHRoJywgJ21heFdpZHRoJywgJ3R5cGUnXTtcbiAgY29weUtleXMuZm9yRWFjaCggayA9PiBrIGluIGRlZiAmJiAodGFyZ2V0W2tdID0gZGVmW2tdKSApO1xuICBpZiAoZGVmLmRhdGEpIHtcbiAgICB0YXJnZXQuZGF0YSA9IE9iamVjdC5hc3NpZ24odGFyZ2V0LmRhdGEgfHwge30sIGRlZi5kYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNDb2x1bW5EZWZpbml0aW9uKG9iajogYW55KTogb2JqIGlzIFBibENvbHVtbkRlZmluaXRpb24ge1xuICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoaXMgZHVja3QtdHlwZSB0eXBlIG1hdGNoaW5nLiBBY2NlcHQgc29saWQgaW5zdGFuY2VzIGluIFBibFRhYmxlLmNvbHVtbnMgaW5zdGVhZCBvZiBpbnRlcmZhY2VzLlxuICByZXR1cm4gISFvYmoucHJvcCAmJiAhb2JqLmhhc093blByb3BlcnR5KCdzcGFuJyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29sdW1uR3JvdXBEZWZpbml0aW9uKG9iajogYW55KTogb2JqIGlzIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB7XG4gIC8vIFRPRE86IEdldCByaWQgb2YgdGhpcyBkdWNrdC10eXBlIHR5cGUgbWF0Y2hpbmcuIEFjY2VwdCBzb2xpZCBpbnN0YW5jZXMgaW4gUGJsVGFibGUuY29sdW1ucyBpbnN0ZWFkIG9mIGludGVyZmFjZXMuXG4gIHJldHVybiAhIW9iai5wcm9wICYmIG9iai5oYXNPd25Qcm9wZXJ0eSgnc3BhbicpO1xufVxuIl19