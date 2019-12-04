/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This file contains constants shared between modules (files) that if not extract will cause a circular dependency
 */
/** @type {?} */
const COLUMN_NAME_CSS_PREFIX = 'pbl-ngrid-column';
/** @type {?} */
export const COLUMN_EDITABLE_CELL_CLASS = 'pbl-ngrid-editable-cell';
/**
 * Returns a css class unique to the column
 * @param {?} columnDef
 * @return {?}
 */
export function uniqueColumnCss(columnDef) {
    return `${COLUMN_NAME_CSS_PREFIX}-${columnDef.cssClassFriendlyName}`;
}
/**
 * Returns a css class unique to the type of the column (columns might share types)
 * @param {?} type
 * @return {?}
 */
export function uniqueColumnTypeCss(type) {
    return `${COLUMN_NAME_CSS_PREFIX}-type-${type.name}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY3VsYXItZGVwLWJyaWRnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jaXJjdWxhci1kZXAtYnJpZGdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O01BT00sc0JBQXNCLEdBQUcsa0JBQWtCOztBQUNqRCxNQUFNLE9BQU8sMEJBQTBCLEdBQUcseUJBQXlCOzs7Ozs7QUFLbkUsTUFBTSxVQUFVLGVBQWUsQ0FBQyxTQUF1QjtJQUNyRCxPQUFPLEdBQUcsc0JBQXNCLElBQUksU0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUM7QUFDdkUsQ0FBQzs7Ozs7O0FBS0QsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQTZCO0lBQy9ELE9BQU8sR0FBRyxzQkFBc0IsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBmaWxlIGNvbnRhaW5zIGNvbnN0YW50cyBzaGFyZWQgYmV0d2VlbiBtb2R1bGVzIChmaWxlcykgdGhhdCBpZiBub3QgZXh0cmFjdCB3aWxsIGNhdXNlIGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuICovXG5cbmltcG9ydCB7IENka0NvbHVtbkRlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbiB9IGZyb20gJy4vY29sdW1ucy90eXBlcyc7XG5cbmNvbnN0IENPTFVNTl9OQU1FX0NTU19QUkVGSVggPSAncGJsLW5ncmlkLWNvbHVtbic7XG5leHBvcnQgY29uc3QgQ09MVU1OX0VESVRBQkxFX0NFTExfQ0xBU1MgPSAncGJsLW5ncmlkLWVkaXRhYmxlLWNlbGwnO1xuXG4vKipcbiAqIFJldHVybnMgYSBjc3MgY2xhc3MgdW5pcXVlIHRvIHRoZSBjb2x1bW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUNvbHVtbkNzcyhjb2x1bW5EZWY6IENka0NvbHVtbkRlZik6IHN0cmluZyB7XG4gIHJldHVybiBgJHtDT0xVTU5fTkFNRV9DU1NfUFJFRklYfS0ke2NvbHVtbkRlZi5jc3NDbGFzc0ZyaWVuZGx5TmFtZX1gO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBjc3MgY2xhc3MgdW5pcXVlIHRvIHRoZSB0eXBlIG9mIHRoZSBjb2x1bW4gKGNvbHVtbnMgbWlnaHQgc2hhcmUgdHlwZXMpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVDb2x1bW5UeXBlQ3NzKHR5cGU6IFBibENvbHVtblR5cGVEZWZpbml0aW9uKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke0NPTFVNTl9OQU1FX0NTU19QUkVGSVh9LXR5cGUtJHt0eXBlLm5hbWV9YDtcbn1cblxuIl19