/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/circular-dep-bridge.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This file contains constants shared between modules (files) that if not extract will cause a circular dependency
 */
/** @type {?} */
var COLUMN_NAME_CSS_PREFIX = 'pbl-ngrid-column';
/** @type {?} */
export var COLUMN_EDITABLE_CELL_CLASS = 'pbl-ngrid-editable-cell';
/**
 * Returns a css class unique to the column
 * @param {?} columnDef
 * @return {?}
 */
export function uniqueColumnCss(columnDef) {
    return COLUMN_NAME_CSS_PREFIX + "-" + columnDef.cssClassFriendlyName;
}
/**
 * Returns a css class unique to the type of the column (columns might share types)
 * @param {?} type
 * @return {?}
 */
export function uniqueColumnTypeCss(type) {
    return COLUMN_NAME_CSS_PREFIX + "-type-" + type.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY3VsYXItZGVwLWJyaWRnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jaXJjdWxhci1kZXAtYnJpZGdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztJQU9NLHNCQUFzQixHQUFHLGtCQUFrQjs7QUFDakQsTUFBTSxLQUFPLDBCQUEwQixHQUFHLHlCQUF5Qjs7Ozs7O0FBS25FLE1BQU0sVUFBVSxlQUFlLENBQUMsU0FBdUI7SUFDckQsT0FBVSxzQkFBc0IsU0FBSSxTQUFTLENBQUMsb0JBQXNCLENBQUM7QUFDdkUsQ0FBQzs7Ozs7O0FBS0QsTUFBTSxVQUFVLG1CQUFtQixDQUFDLElBQTZCO0lBQy9ELE9BQVUsc0JBQXNCLGNBQVMsSUFBSSxDQUFDLElBQU0sQ0FBQztBQUN2RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgY29uc3RhbnRzIHNoYXJlZCBiZXR3ZWVuIG1vZHVsZXMgKGZpbGVzKSB0aGF0IGlmIG5vdCBleHRyYWN0IHdpbGwgY2F1c2UgYSBjaXJjdWxhciBkZXBlbmRlbmN5XG4gKi9cblxuaW1wb3J0IHsgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibENvbHVtblR5cGVEZWZpbml0aW9uIH0gZnJvbSAnLi9jb2x1bW5zL3R5cGVzJztcblxuY29uc3QgQ09MVU1OX05BTUVfQ1NTX1BSRUZJWCA9ICdwYmwtbmdyaWQtY29sdW1uJztcbmV4cG9ydCBjb25zdCBDT0xVTU5fRURJVEFCTEVfQ0VMTF9DTEFTUyA9ICdwYmwtbmdyaWQtZWRpdGFibGUtY2VsbCc7XG5cbi8qKlxuICogUmV0dXJucyBhIGNzcyBjbGFzcyB1bmlxdWUgdG8gdGhlIGNvbHVtblxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5pcXVlQ29sdW1uQ3NzKGNvbHVtbkRlZjogQ2RrQ29sdW1uRGVmKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke0NPTFVNTl9OQU1FX0NTU19QUkVGSVh9LSR7Y29sdW1uRGVmLmNzc0NsYXNzRnJpZW5kbHlOYW1lfWA7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGNzcyBjbGFzcyB1bmlxdWUgdG8gdGhlIHR5cGUgb2YgdGhlIGNvbHVtbiAoY29sdW1ucyBtaWdodCBzaGFyZSB0eXBlcylcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZUNvbHVtblR5cGVDc3ModHlwZTogUGJsQ29sdW1uVHlwZURlZmluaXRpb24pOiBzdHJpbmcge1xuICByZXR1cm4gYCR7Q09MVU1OX05BTUVfQ1NTX1BSRUZJWH0tdHlwZS0ke3R5cGUubmFtZX1gO1xufVxuXG4iXX0=