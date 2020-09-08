/**
 * @fileoverview added by tsickle
 * Generated from: lib/data-source/types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2RhdGEtc291cmNlL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsOENBRUM7OztJQURDLHlDQUEwQjs7Ozs7O0FBTTVCLDRDQUVDOzs7SUFEQyx3Q0FBd0I7Ozs7Ozs7QUFNMUIsb0NBRUM7Ozs7QUFFRCxrREFHQzs7O0lBRkMsOENBQWtCOztJQUNsQiw0Q0FBNkI7Ozs7O0FBb0IvQiwwQ0FJQzs7O0lBSEMsb0NBQTRCOztJQUM1Qix1Q0FBcUI7O0lBQ3JCLHNDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2dyaWQvY29sdW1ucy9jb2x1bW4nO1xuXG5leHBvcnQgdHlwZSBQYmxOZ3JpZFNvcnRPcmRlciA9ICdhc2MnIHwgJ2Rlc2MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU29ydEluc3RydWN0aW9ucyB7XG4gIG9yZGVyPzogUGJsTmdyaWRTb3J0T3JkZXI7XG59XG5cbi8qKlxuICogRXZlbnQgZmlyZWQgd2hlbiBzb3J0IGNoYW5nZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiBleHRlbmRzIFBibE5ncmlkU29ydEluc3RydWN0aW9ucyB7XG4gIHNvcnRGbj86IFBibE5ncmlkU29ydGVyO1xufVxuXG4vKipcbiAqIEEgZnVuY3Rpb24gdGhhdCBjYW4gc29ydCBhIGRhdGFzZXQgYmFzZWQgb24gYFBibE5ncmlkU29ydEluc3RydWN0aW9uc2BcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFNvcnRlcjxUID0gYW55PiB7XG4gIChjb2x1bW46IFBibENvbHVtbiwgc29ydDogUGJsTmdyaWRTb3J0SW5zdHJ1Y3Rpb25zLCBkYXRhOiBUW10pOiBUW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSB7XG4gIGNvbHVtbjogUGJsQ29sdW1uO1xuICBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uO1xufVxuXG5cbi8vIEZJTFRFUklOR1xuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoZSByZXR1cm4gdHJ1ZSB0aGVuIHRoZSB2YWx1ZSBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIHJlc3VsdCBvciBmYWxzZSB3aGVuIG5vdC5cbiAqIFRoaXMgaXMgYSBzaW5nbGUgY29sdW1uIGZpbHRlciBwcmVkaWNhdGVkLCByZXR1cm5pbmcgZmFsc2Ugd2lsbCBmaWx0ZXIgb3V0IHRoZSBlbnRpcmUgcm93IGJ1dCB0aGVcbiAqIHByZWRpY2F0ZSBpcyBvbmx5IGludGVuZGVkIHRvIGZpbHRlciBhIHNwZWNpZmljIGNvbHVtbi5cbiAqL1xuZXhwb3J0IHR5cGUgRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZSA9IChmaWx0ZXJWYWx1ZTogYW55LCBjb2xWYWx1ZTogYW55LCByb3c/OiBhbnksIGNvbD86IFBibENvbHVtbikgPT4gYm9vbGVhbjtcbi8qKlxuICogQSBmdW5jdGlvbiB0aGUgcmV0dXJuIHRydWUgdGhlbiB0aGUgcm93IHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0IG9yIGZhbHNlIHdoZW4gbm90LlxuICogQHBhcmFtIHJvdyBUaGUgcm93IGluIHRoZSBkYXRhIHNvdXJjZSB0aGF0IHRoZSBmaWx0ZXIgYXBwbHkgb25cbiAqIEBwYXJhbSBwcm9wZXJ0aWVzIEEgbGlzdCBvZiBjb2x1bW4gaW5zdGFuY2VzIChgUGJsQ29sdW1uYCkgdG8gZmlsdGVyIHZhbHVlcyBieS5cbiAqL1xuZXhwb3J0IHR5cGUgRGF0YVNvdXJjZVByZWRpY2F0ZSA9IChyb3c6IGFueSwgcHJvcGVydGllczogUGJsQ29sdW1uW10pID0+IGJvb2xlYW47XG5cbmV4cG9ydCB0eXBlIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiA9IHVuZGVmaW5lZCB8IERhdGFTb3VyY2VQcmVkaWNhdGUgfCBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YVNvdXJjZUZpbHRlclR5cGUge1xuICB0eXBlOiAndmFsdWUnIHwgJ3ByZWRpY2F0ZSc7XG4gIGNvbHVtbnM6IFBibENvbHVtbltdO1xuICBmaWx0ZXI6IGFueSB8IERhdGFTb3VyY2VQcmVkaWNhdGU7XG59XG5cbmV4cG9ydCB0eXBlIERhdGFTb3VyY2VGaWx0ZXIgPSB1bmRlZmluZWQgfCBEYXRhU291cmNlRmlsdGVyVHlwZSA7XG4iXX0=