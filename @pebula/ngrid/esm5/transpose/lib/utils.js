/**
 * @fileoverview added by tsickle
 * Generated from: lib/utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var TRANSFORM_ROW_REF = Symbol('TRANSFORM_ROW_REF');
/**
 * @param {?} row
 * @return {?}
 */
export function getCellValueAsHeader(row) {
    return row.label;
}
/**
 * @this {?}
 * @param {?} colAsRow
 * @return {?}
 */
export function getCellValueTransformed(colAsRow) {
    return colAsRow.getValue(this.data[TRANSFORM_ROW_REF]);
}
/**
 * @param {?} row
 * @param {?} index
 * @return {?}
 */
export function createTransformedColumn(row, index) {
    var _a;
    return { prop: "__transform_item_" + index + "__", data: (_a = {}, _a[TRANSFORM_ROW_REF] = row, _a) };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFFTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7Ozs7O0FBRXJELE1BQU0sVUFBVSxvQkFBb0IsQ0FBRSxHQUFjO0lBQ2xELE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQztBQUNuQixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQWtCLFFBQW1CO0lBQzFFLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsR0FBUSxFQUFFLEtBQWE7O0lBQzdELE9BQU8sRUFBRSxJQUFJLEVBQUUsc0JBQW9CLEtBQUssT0FBSSxFQUFFLElBQUksWUFBSSxHQUFDLGlCQUFpQixJQUFHLEdBQUcsS0FBRSxFQUFFLENBQUM7QUFDckYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbkRlZmluaXRpb24sIFBibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5jb25zdCBUUkFOU0ZPUk1fUk9XX1JFRiA9IFN5bWJvbCgnVFJBTlNGT1JNX1JPV19SRUYnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENlbGxWYWx1ZUFzSGVhZGVyIChyb3c6IFBibENvbHVtbik6IGFueSB7XG4gIHJldHVybiByb3cubGFiZWw7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDZWxsVmFsdWVUcmFuc2Zvcm1lZCh0aGlzOiBQYmxDb2x1bW4sIGNvbEFzUm93OiBQYmxDb2x1bW4pOiBhbnkge1xuICByZXR1cm4gY29sQXNSb3cuZ2V0VmFsdWUodGhpcy5kYXRhW1RSQU5TRk9STV9ST1dfUkVGXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmFuc2Zvcm1lZENvbHVtbihyb3c6IGFueSwgaW5kZXg6IG51bWJlcik6IFBibENvbHVtbkRlZmluaXRpb24ge1xuICByZXR1cm4geyBwcm9wOiBgX190cmFuc2Zvcm1faXRlbV8ke2luZGV4fV9fYCwgZGF0YTogeyBbVFJBTlNGT1JNX1JPV19SRUZdOiByb3cgfSB9O1xufVxuIl19