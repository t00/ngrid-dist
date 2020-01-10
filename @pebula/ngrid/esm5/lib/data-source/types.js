/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function PblNgridSortInstructions() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridSortInstructions.prototype.order;
}
/**
 * Event fired when sort changes.
 * @record
 */
export function PblNgridSortDefinition() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridSortDefinition.prototype.sortFn;
}
/**
 * A function that can sort a dataset based on `PblNgridSortInstructions`
 * @record
 * @template T
 */
export function PblNgridSorter() { }
/**
 * @record
 */
export function PblNgridDataSourceSortChange() { }
if (false) {
    /** @type {?} */
    PblNgridDataSourceSortChange.prototype.column;
    /** @type {?} */
    PblNgridDataSourceSortChange.prototype.sort;
}
/**
 * @record
 */
export function DataSourceFilterType() { }
if (false) {
    /** @type {?} */
    DataSourceFilterType.prototype.type;
    /** @type {?} */
    DataSourceFilterType.prototype.columns;
    /** @type {?} */
    DataSourceFilterType.prototype.filter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2RhdGEtc291cmNlL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSw4Q0FFQzs7O0lBREMseUNBQTBCOzs7Ozs7QUFNNUIsNENBRUM7OztJQURDLHdDQUF3Qjs7Ozs7OztBQU0xQixvQ0FFQzs7OztBQUVELGtEQUdDOzs7SUFGQyw4Q0FBa0I7O0lBQ2xCLDRDQUE2Qjs7Ozs7QUFvQi9CLDBDQUlDOzs7SUFIQyxvQ0FBNEI7O0lBQzVCLHVDQUFxQjs7SUFDckIsc0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vZ3JpZC9jb2x1bW5zL2NvbHVtbic7XG5cbmV4cG9ydCB0eXBlIFBibE5ncmlkU29ydE9yZGVyID0gJ2FzYycgfCAnZGVzYyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTb3J0SW5zdHJ1Y3Rpb25zIHtcbiAgb3JkZXI/OiBQYmxOZ3JpZFNvcnRPcmRlcjtcbn1cblxuLyoqXG4gKiBFdmVudCBmaXJlZCB3aGVuIHNvcnQgY2hhbmdlcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFNvcnREZWZpbml0aW9uIGV4dGVuZHMgUGJsTmdyaWRTb3J0SW5zdHJ1Y3Rpb25zIHtcbiAgc29ydEZuPzogUGJsTmdyaWRTb3J0ZXI7XG59XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0aGF0IGNhbiBzb3J0IGEgZGF0YXNldCBiYXNlZCBvbiBgUGJsTmdyaWRTb3J0SW5zdHJ1Y3Rpb25zYFxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU29ydGVyPFQgPSBhbnk+IHtcbiAgKGNvbHVtbjogUGJsQ29sdW1uLCBzb3J0OiBQYmxOZ3JpZFNvcnRJbnN0cnVjdGlvbnMsIGRhdGE6IFRbXSk6IFRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlIHtcbiAgY29sdW1uOiBQYmxDb2x1bW47XG4gIHNvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb247XG59XG5cblxuLy8gRklMVEVSSU5HXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhlIHJldHVybiB0cnVlIHRoZW4gdGhlIHZhbHVlIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0IG9yIGZhbHNlIHdoZW4gbm90LlxuICogVGhpcyBpcyBhIHNpbmdsZSBjb2x1bW4gZmlsdGVyIHByZWRpY2F0ZWQsIHJldHVybmluZyBmYWxzZSB3aWxsIGZpbHRlciBvdXQgdGhlIGVudGlyZSByb3cgYnV0IHRoZVxuICogcHJlZGljYXRlIGlzIG9ubHkgaW50ZW5kZWQgdG8gZmlsdGVyIGEgc3BlY2lmaWMgY29sdW1uLlxuICovXG5leHBvcnQgdHlwZSBEYXRhU291cmNlQ29sdW1uUHJlZGljYXRlID0gKGZpbHRlclZhbHVlOiBhbnksIGNvbFZhbHVlOiBhbnksIHJvdz86IGFueSwgY29sPzogUGJsQ29sdW1uKSA9PiBib29sZWFuO1xuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoZSByZXR1cm4gdHJ1ZSB0aGVuIHRoZSByb3cgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHQgb3IgZmFsc2Ugd2hlbiBub3QuXG4gKiBAcGFyYW0gcm93IFRoZSByb3cgaW4gdGhlIGRhdGEgc291cmNlIHRoYXQgdGhlIGZpbHRlciBhcHBseSBvblxuICogQHBhcmFtIHByb3BlcnRpZXMgQSBsaXN0IG9mIGNvbHVtbiBpbnN0YW5jZXMgKGBQYmxDb2x1bW5gKSB0byBmaWx0ZXIgdmFsdWVzIGJ5LlxuICovXG5leHBvcnQgdHlwZSBEYXRhU291cmNlUHJlZGljYXRlID0gKHJvdzogYW55LCBwcm9wZXJ0aWVzOiBQYmxDb2x1bW5bXSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IHR5cGUgRGF0YVNvdXJjZUZpbHRlclRva2VuID0gdW5kZWZpbmVkIHwgRGF0YVNvdXJjZVByZWRpY2F0ZSB8IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBEYXRhU291cmNlRmlsdGVyVHlwZSB7XG4gIHR5cGU6ICd2YWx1ZScgfCAncHJlZGljYXRlJztcbiAgY29sdW1uczogUGJsQ29sdW1uW107XG4gIGZpbHRlcjogYW55IHwgRGF0YVNvdXJjZVByZWRpY2F0ZTtcbn1cblxuZXhwb3J0IHR5cGUgRGF0YVNvdXJjZUZpbHRlciA9IHVuZGVmaW5lZCB8IERhdGFTb3VyY2VGaWx0ZXJUeXBlIDtcbiJdfQ==