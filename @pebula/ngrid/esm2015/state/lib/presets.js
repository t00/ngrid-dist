/**
 * @fileoverview added by tsickle
 * Generated from: lib/presets.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Return's the `User Preferences` preset which focuses on saving and restoring state that the user
 * can define and would want to restore between sessions.
 *
 * For example, saving column width's which the user might have changed using the mouse or any other custom way provided to him (through API).
 * Saving the column order, so if the user re-ordered the table the order can be loaded back again...
 * @param {...?} basedOn
 * @return {?}
 */
export function userSessionPref(...basedOn) {
    /** @type {?} */
    const resultFilter = {
        grid: [
            'hideColumns',
            'showFooter',
            'showHeader',
        ],
        columnOrder: true,
        columns: ['table'],
        dataColumn: [
            'width',
        ]
    };
    if (basedOn.length > 0) {
        for (const b of basedOn)
            mergeStateChunkKeyFilter(resultFilter, b);
    }
    return resultFilter;
}
/**
 * Merge a head and tail chunk filters so keys from tail will be merged into head if:
 *
 * - The key does not exist in head
 * - The key exist in head but the value of it is an Array and the value of tail is an Array as well.
 *   In such case, both array's are merged into a single unique array.
 * @param {?} mergeHead
 * @param {?} mergeTail
 * @return {?}
 */
function mergeStateChunkKeyFilter(mergeHead, mergeTail) {
    for (const k of Object.keys(mergeTail)) {
        /** @type {?} */
        const tailValue = mergeTail[k];
        if (k in mergeHead) {
            /** @type {?} */
            const tailHead = mergeHead[k];
            if (Array.isArray(tailHead) && Array.isArray(tailValue)) {
                /** @type {?} */
                const s = new Set([...tailHead, ...tailValue]);
                mergeHead[k] = Array.from(s.values());
            }
        }
        else {
            mergeHead[k] = mergeTail[k];
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2V0cy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvcHJlc2V0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVNBLE1BQU0sVUFBVSxlQUFlLENBQUMsR0FBRyxPQUE4Qjs7VUFDekQsWUFBWSxHQUF3QjtRQUN4QyxJQUFJLEVBQUU7WUFDSixhQUFhO1lBQ2IsWUFBWTtZQUNaLFlBQVk7U0FDYjtRQUNELFdBQVcsRUFBRSxJQUFJO1FBQ2pCLE9BQU8sRUFBRSxDQUFFLE9BQU8sQ0FBRTtRQUNwQixVQUFVLEVBQUU7WUFDVixPQUFPO1NBQ1I7S0FDRjtJQUVELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdEIsS0FBSyxNQUFNLENBQUMsSUFBSSxPQUFPO1lBQ3ZCLHdCQUF3QixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztLQUMzQztJQUVELE9BQU8sWUFBWSxDQUFDO0FBQ3RCLENBQUM7Ozs7Ozs7Ozs7O0FBVUQsU0FBUyx3QkFBd0IsQ0FBQyxTQUE4QixFQUFFLFNBQThCO0lBQzlGLEtBQUssTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTs7Y0FDaEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksU0FBUyxFQUFFOztrQkFDWixRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTs7c0JBQ2pELENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBUyxDQUFDLEdBQUcsUUFBUSxFQUFFLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQ3RELFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0Y7YUFBTTtZQUNMLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7S0FDRjtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGF0ZUNodW5rS2V5RmlsdGVyIH0gZnJvbSAnLi9jb3JlL21vZGVscy9pbmRleCc7XG5cbi8qKlxuICogUmV0dXJuJ3MgdGhlIGBVc2VyIFByZWZlcmVuY2VzYCBwcmVzZXQgd2hpY2ggZm9jdXNlcyBvbiBzYXZpbmcgYW5kIHJlc3RvcmluZyBzdGF0ZSB0aGF0IHRoZSB1c2VyXG4gKiBjYW4gZGVmaW5lIGFuZCB3b3VsZCB3YW50IHRvIHJlc3RvcmUgYmV0d2VlbiBzZXNzaW9ucy5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgc2F2aW5nIGNvbHVtbiB3aWR0aCdzIHdoaWNoIHRoZSB1c2VyIG1pZ2h0IGhhdmUgY2hhbmdlZCB1c2luZyB0aGUgbW91c2Ugb3IgYW55IG90aGVyIGN1c3RvbSB3YXkgcHJvdmlkZWQgdG8gaGltICh0aHJvdWdoIEFQSSkuXG4gKiBTYXZpbmcgdGhlIGNvbHVtbiBvcmRlciwgc28gaWYgdGhlIHVzZXIgcmUtb3JkZXJlZCB0aGUgdGFibGUgdGhlIG9yZGVyIGNhbiBiZSBsb2FkZWQgYmFjayBhZ2Fpbi4uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXNlclNlc3Npb25QcmVmKC4uLmJhc2VkT246IFN0YXRlQ2h1bmtLZXlGaWx0ZXJbXSk6IFN0YXRlQ2h1bmtLZXlGaWx0ZXIge1xuICBjb25zdCByZXN1bHRGaWx0ZXI6IFN0YXRlQ2h1bmtLZXlGaWx0ZXIgPSB7XG4gICAgZ3JpZDogW1xuICAgICAgJ2hpZGVDb2x1bW5zJyxcbiAgICAgICdzaG93Rm9vdGVyJyxcbiAgICAgICdzaG93SGVhZGVyJyxcbiAgICBdLFxuICAgIGNvbHVtbk9yZGVyOiB0cnVlLFxuICAgIGNvbHVtbnM6IFsgJ3RhYmxlJyBdLFxuICAgIGRhdGFDb2x1bW46IFtcbiAgICAgICd3aWR0aCcsXG4gICAgXVxuICB9XG5cbiAgaWYgKGJhc2VkT24ubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgYiBvZiBiYXNlZE9uKVxuICAgIG1lcmdlU3RhdGVDaHVua0tleUZpbHRlcihyZXN1bHRGaWx0ZXIsIGIpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdEZpbHRlcjtcbn1cblxuXG4vKipcbiAqIE1lcmdlIGEgaGVhZCBhbmQgdGFpbCBjaHVuayBmaWx0ZXJzIHNvIGtleXMgZnJvbSB0YWlsIHdpbGwgYmUgbWVyZ2VkIGludG8gaGVhZCBpZjpcbiAqXG4gKiAtIFRoZSBrZXkgZG9lcyBub3QgZXhpc3QgaW4gaGVhZFxuICogLSBUaGUga2V5IGV4aXN0IGluIGhlYWQgYnV0IHRoZSB2YWx1ZSBvZiBpdCBpcyBhbiBBcnJheSBhbmQgdGhlIHZhbHVlIG9mIHRhaWwgaXMgYW4gQXJyYXkgYXMgd2VsbC5cbiAqICAgSW4gc3VjaCBjYXNlLCBib3RoIGFycmF5J3MgYXJlIG1lcmdlZCBpbnRvIGEgc2luZ2xlIHVuaXF1ZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VTdGF0ZUNodW5rS2V5RmlsdGVyKG1lcmdlSGVhZDogU3RhdGVDaHVua0tleUZpbHRlciwgbWVyZ2VUYWlsOiBTdGF0ZUNodW5rS2V5RmlsdGVyKSB7XG4gIGZvciAoY29uc3QgayBvZiBPYmplY3Qua2V5cyhtZXJnZVRhaWwpKSB7XG4gICAgY29uc3QgdGFpbFZhbHVlID0gbWVyZ2VUYWlsW2tdO1xuICAgIGlmIChrIGluIG1lcmdlSGVhZCkge1xuICAgICAgY29uc3QgdGFpbEhlYWQgPSBtZXJnZUhlYWRba107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0YWlsSGVhZCkgJiYgQXJyYXkuaXNBcnJheSh0YWlsVmFsdWUpKSB7XG4gICAgICAgIGNvbnN0IHMgPSBuZXcgU2V0PHN0cmluZz4oWy4uLnRhaWxIZWFkLCAuLi50YWlsVmFsdWVdKTtcbiAgICAgICAgbWVyZ2VIZWFkW2tdID0gQXJyYXkuZnJvbShzLnZhbHVlcygpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbWVyZ2VIZWFkW2tdID0gbWVyZ2VUYWlsW2tdO1xuICAgIH1cbiAgfVxufVxuIl19