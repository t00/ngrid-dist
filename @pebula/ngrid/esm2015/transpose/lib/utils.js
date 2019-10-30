/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSFORM_ROW_REF = Symbol('TRANSFORM_ROW_REF');
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
    return { prop: `__transform_item_${index}__`, data: { [TRANSFORM_ROW_REF]: row } };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztNQUVNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQzs7Ozs7QUFFckQsTUFBTSxVQUFVLG9CQUFvQixDQUFFLEdBQWM7SUFDbEQsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ25CLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FBa0IsUUFBbUI7SUFDMUUsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxHQUFRLEVBQUUsS0FBYTtJQUM3RCxPQUFPLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixLQUFLLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUNyRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmNvbnN0IFRSQU5TRk9STV9ST1dfUkVGID0gU3ltYm9sKCdUUkFOU0ZPUk1fUk9XX1JFRicpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2VsbFZhbHVlQXNIZWFkZXIgKHJvdzogUGJsQ29sdW1uKTogYW55IHtcbiAgcmV0dXJuIHJvdy5sYWJlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENlbGxWYWx1ZVRyYW5zZm9ybWVkKHRoaXM6IFBibENvbHVtbiwgY29sQXNSb3c6IFBibENvbHVtbik6IGFueSB7XG4gIHJldHVybiBjb2xBc1Jvdy5nZXRWYWx1ZSh0aGlzLmRhdGFbVFJBTlNGT1JNX1JPV19SRUZdKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uKHJvdzogYW55LCBpbmRleDogbnVtYmVyKTogUGJsQ29sdW1uRGVmaW5pdGlvbiB7XG4gIHJldHVybiB7IHByb3A6IGBfX3RyYW5zZm9ybV9pdGVtXyR7aW5kZXh9X19gLCBkYXRhOiB7IFtUUkFOU0ZPUk1fUk9XX1JFRl06IHJvdyB9IH07XG59XG4iXX0=