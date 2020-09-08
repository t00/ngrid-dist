/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/circular-dep-bridge.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY3VsYXItZGVwLWJyaWRnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jaXJjdWxhci1kZXAtYnJpZGdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztNQU9NLHNCQUFzQixHQUFHLGtCQUFrQjs7QUFDakQsTUFBTSxPQUFPLDBCQUEwQixHQUFHLHlCQUF5Qjs7Ozs7O0FBS25FLE1BQU0sVUFBVSxlQUFlLENBQUMsU0FBdUI7SUFDckQsT0FBTyxHQUFHLHNCQUFzQixJQUFJLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0FBQ3ZFLENBQUM7Ozs7OztBQUtELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUE2QjtJQUMvRCxPQUFPLEdBQUcsc0JBQXNCLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoaXMgZmlsZSBjb250YWlucyBjb25zdGFudHMgc2hhcmVkIGJldHdlZW4gbW9kdWxlcyAoZmlsZXMpIHRoYXQgaWYgbm90IGV4dHJhY3Qgd2lsbCBjYXVzZSBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcbiAqL1xuXG5pbXBvcnQgeyBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsQ29sdW1uVHlwZURlZmluaXRpb24gfSBmcm9tICcuL2NvbHVtbnMvdHlwZXMnO1xuXG5jb25zdCBDT0xVTU5fTkFNRV9DU1NfUFJFRklYID0gJ3BibC1uZ3JpZC1jb2x1bW4nO1xuZXhwb3J0IGNvbnN0IENPTFVNTl9FRElUQUJMRV9DRUxMX0NMQVNTID0gJ3BibC1uZ3JpZC1lZGl0YWJsZS1jZWxsJztcblxuLyoqXG4gKiBSZXR1cm5zIGEgY3NzIGNsYXNzIHVuaXF1ZSB0byB0aGUgY29sdW1uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmlxdWVDb2x1bW5Dc3MoY29sdW1uRGVmOiBDZGtDb2x1bW5EZWYpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7Q09MVU1OX05BTUVfQ1NTX1BSRUZJWH0tJHtjb2x1bW5EZWYuY3NzQ2xhc3NGcmllbmRseU5hbWV9YDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY3NzIGNsYXNzIHVuaXF1ZSB0byB0aGUgdHlwZSBvZiB0aGUgY29sdW1uIChjb2x1bW5zIG1pZ2h0IHNoYXJlIHR5cGVzKVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQ29sdW1uVHlwZUNzcyh0eXBlOiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbik6IHN0cmluZyB7XG4gIHJldHVybiBgJHtDT0xVTU5fTkFNRV9DU1NfUFJFRklYfS10eXBlLSR7dHlwZS5uYW1lfWA7XG59XG5cbiJdfQ==