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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbHVtbnMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7SUFFTSwwQkFBMEIsR0FBRyx3QkFBd0I7Ozs7O0FBRTNELE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBVzs7UUFDbkMsS0FBSyxHQUFHLDBCQUEwQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEQsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFBLEVBQUUsQ0FBQztLQUMxRDtBQUNILENBQUM7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsZUFBZSxDQUFvQyxHQUE0QixFQUFFLE1BQVM7O1FBQ2xHLFFBQVEsR0FBeUMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7SUFDdEgsUUFBUSxDQUFDLE9BQU87Ozs7SUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWhDLENBQWdDLEVBQUUsQ0FBQztJQUMxRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUU7UUFDWixNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFEO0FBQ0gsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsR0FBUTtJQUN6QyxvSEFBb0g7SUFDcEgsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkQsQ0FBQzs7Ozs7QUFHRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsR0FBUTtJQUM5QyxvSEFBb0g7SUFDcEgsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IFJFX1BBUlNFX1NUWUxFX0xFTkdUSF9VTklUID0gLygoPzpcXGQqXFwuKT9cXGQrKSglfHB4KSQvO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VTdHlsZVdpZHRoKGV4cDogc3RyaW5nKTogeyB2YWx1ZTogbnVtYmVyLCB0eXBlOiAncHgnIHwgJyUnfSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG1hdGNoID0gUkVfUEFSU0VfU1RZTEVfTEVOR1RIX1VOSVQuZXhlYyhleHApO1xuICBpZiAobWF0Y2gpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogTnVtYmVyKG1hdGNoWzFdKSwgdHlwZTogPGFueT4gbWF0Y2hbMl0gfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERlZmluaXRpb25zPFQgZXh0ZW5kcyBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4oZGVmOiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbiwgdGFyZ2V0OiBUKTogdm9pZCB7XG4gIGNvbnN0IGNvcHlLZXlzOiBBcnJheTxrZXlvZiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4gPSBbJ2lkJywgJ2xhYmVsJywgJ2NzcycsICdtaW5XaWR0aCcsICd3aWR0aCcsICdtYXhXaWR0aCcsICd0eXBlJ107XG4gIGNvcHlLZXlzLmZvckVhY2goIGsgPT4gayBpbiBkZWYgJiYgKHRhcmdldFtrXSA9IGRlZltrXSkgKTtcbiAgaWYgKGRlZi5kYXRhKSB7XG4gICAgdGFyZ2V0LmRhdGEgPSBPYmplY3QuYXNzaWduKHRhcmdldC5kYXRhIHx8IHt9LCBkZWYuZGF0YSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29sdW1uRGVmaW5pdGlvbihvYmo6IGFueSk6IG9iaiBpcyBQYmxDb2x1bW5EZWZpbml0aW9uIHtcbiAgLy8gVE9ETzogR2V0IHJpZCBvZiB0aGlzIGR1Y2t0LXR5cGUgdHlwZSBtYXRjaGluZy4gQWNjZXB0IHNvbGlkIGluc3RhbmNlcyBpbiBQYmxUYWJsZS5jb2x1bW5zIGluc3RlYWQgb2YgaW50ZXJmYWNlcy5cbiAgcmV0dXJuICEhb2JqLnByb3AgJiYgIW9iai5oYXNPd25Qcm9wZXJ0eSgnc3BhbicpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbHVtbkdyb3VwRGVmaW5pdGlvbihvYmo6IGFueSk6IG9iaiBpcyBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24ge1xuICAvLyBUT0RPOiBHZXQgcmlkIG9mIHRoaXMgZHVja3QtdHlwZSB0eXBlIG1hdGNoaW5nLiBBY2NlcHQgc29saWQgaW5zdGFuY2VzIGluIFBibFRhYmxlLmNvbHVtbnMgaW5zdGVhZCBvZiBpbnRlcmZhY2VzLlxuICByZXR1cm4gISFvYmoucHJvcCAmJiBvYmouaGFzT3duUHJvcGVydHkoJ3NwYW4nKTtcbn1cbiJdfQ==