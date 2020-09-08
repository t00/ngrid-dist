/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/built-in-handlers/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export { registerGridHandlers } from './grid-primitives/index';
export { registerColumnDefHandlers } from './column-def/index';
export { registerColumnOrderHandlers } from './column-order/index';
/**
 * @record
 */
export function PblNgridBuiltInGlobalState() { }
if (false) {
    /** @type {?} */
    PblNgridBuiltInGlobalState.prototype.grid;
    /** @type {?} */
    PblNgridBuiltInGlobalState.prototype.columns;
    /** @type {?} */
    PblNgridBuiltInGlobalState.prototype.columnOrder;
}
/**
 * @record
 */
export function BuiltInRootStateChunks() { }
if (false) {
    /**
     * A state chunk that handles serialization of primitive properties on the grid instance (PblNgridComponent)
     *
     * - key/value chunk.
     * - root chunk.
     * @type {?}
     */
    BuiltInRootStateChunks.prototype.grid;
    /**
     * A state chunk that handles serialization of the entire column definition set.
     *
     * It include a limited set of keys that you can control (include/exclude).
     * Based on the keys processed, additional child chunks are processed, based on the processed key and object it represents.
     *
     * - key/value chunk.
     * - has children chunks
     * - root chunk.
     * @type {?}
     */
    BuiltInRootStateChunks.prototype.columns;
    /**
     * A state chunk that handles serialization of the current column order.
     * This is a keyless chunk, in this case an array, so you can only include / exclude it as a whole.
     *
     * - keyless chunk.
     * - root chunk.
     * @type {?}
     */
    BuiltInRootStateChunks.prototype.columnOrder;
}
/**
 * @record
 */
export function BuiltInStateChunks() { }
if (false) {
    /**
     * A state chunk that handles serialization of meta columns (header / footer).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaColumn;
    /**
     * A state chunk that handles serialization of meta group columns (header group).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaGroupColumn;
    /**
     * A state chunk that handles serialization of data columns.
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.dataColumn;
    /**
     * A state chunk that handles serialization of meta rows (A row with header / footer column).
     *
     * This is a child chunk of the `columns` root chunk
     *
     * Note that a `metaRow` does not refer to that main header/footer rows, it only refers to additional meta rows.
     * The `dataMetaRow` section chunk is the one referring to the main header/footer rows
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaRow;
    /**
     * A state chunk that handles serialization of meta group rows (A row with header group columns).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.metaGroupRow;
    /**
     * A state chunk that handles serialization of data rows (A row with data columns).
     *
     * This is a child chunk of the `columns` root chunk
     * @type {?}
     */
    BuiltInStateChunks.prototype.dataMetaRow;
}
/**
 * @record
 */
export function DataColumnBuiltInStateChunkExtraData() { }
if (false) {
    /**
     * The `PblColumn` instance, if found.
     * If no instance is found it means that the source (`PblNgridComponent.columns`) contains `PblNgridColumnDefinitions`.
     *
     * Implementation must fallback to using `ctx.source` if `pblColumn` is not provided.
     * @type {?|undefined}
     */
    DataColumnBuiltInStateChunkExtraData.prototype.pblColumn;
    /**
     * The `PblColumn` instance that is currently in the grid's column store, if found.
     * The currently active column is not `pblColumn`, the store always has a copy of all columns.
     *
     * If provided, it is not a replacement for `pblColumn`, both require updates. Use the `activeColumn` to save/load the data that
     * change during runtime.
     * @type {?|undefined}
     */
    DataColumnBuiltInStateChunkExtraData.prototype.activeColumn;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFlQSxxQ0FBYyx5QkFBeUIsQ0FBQztBQUN4QywwQ0FBYyxvQkFBb0IsQ0FBQztBQUNuQyw0Q0FBYyxzQkFBc0IsQ0FBQzs7OztBQUVyQyxnREFJQzs7O0lBSEMsMENBQTJCOztJQUMzQiw2Q0FBNEM7O0lBQzVDLGlEQUFzQjs7Ozs7QUFHeEIsNENBMkJDOzs7Ozs7Ozs7SUFwQkMsc0NBQThEOzs7Ozs7Ozs7Ozs7SUFXOUQseUNBQXlGOzs7Ozs7Ozs7SUFRekYsNkNBQWlHOzs7OztBQUduRyx3Q0F3Q0M7Ozs7Ozs7O0lBbENDLHdDQUErRjs7Ozs7OztJQU0vRiw2Q0FBdUc7Ozs7Ozs7SUFNdkcsd0NBQXlIOzs7Ozs7Ozs7O0lBU3pILHFDQUFxSTs7Ozs7OztJQU1ySSwwQ0FBNkk7Ozs7Ozs7SUFNN0kseUNBQTJJOzs7OztBQUc3SSwwREFpQkM7Ozs7Ozs7OztJQVZDLHlEQUFzQjs7Ozs7Ozs7O0lBU3RCLDREQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgUGJsTWV0YUNvbHVtbixcbiAgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCBQYmxDb2x1bW5Hcm91cCxcbiAgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uLFxuICBQYmxNZXRhUm93RGVmaW5pdGlvbnMsXG4gIFBibENvbHVtblNldCxcbiAgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LFxuICBDb2x1bW5BcGksXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEdsb2JhbFN0YXRlLCBTdGF0ZUNodW5rSXRlbSB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5pbXBvcnQgKiBhcyBDIGZyb20gJy4vY29sdW1uLWRlZi9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFN1cmZhY2VTdGF0ZSB9IGZyb20gJy4vZ3JpZC1wcmltaXRpdmVzL2luZGV4JztcblxuZXhwb3J0ICogZnJvbSAnLi9ncmlkLXByaW1pdGl2ZXMvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb2x1bW4tZGVmL2luZGV4JztcbmV4cG9ydCAqIGZyb20gJy4vY29sdW1uLW9yZGVyL2luZGV4JztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZEJ1aWx0SW5HbG9iYWxTdGF0ZSB7XG4gIGdyaWQ6IFBibE5ncmlkU3VyZmFjZVN0YXRlO1xuICBjb2x1bW5zOiBDLlBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlO1xuICBjb2x1bW5PcmRlcjogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVpbHRJblJvb3RTdGF0ZUNodW5rcyB7XG4gIC8qKlxuICAgKiBBIHN0YXRlIGNodW5rIHRoYXQgaGFuZGxlcyBzZXJpYWxpemF0aW9uIG9mIHByaW1pdGl2ZSBwcm9wZXJ0aWVzIG9uIHRoZSBncmlkIGluc3RhbmNlIChQYmxOZ3JpZENvbXBvbmVudClcbiAgICpcbiAgICogLSBrZXkvdmFsdWUgY2h1bmsuXG4gICAqIC0gcm9vdCBjaHVuay5cbiAgICovXG4gIGdyaWQ6IFN0YXRlQ2h1bmtJdGVtPFBibE5ncmlkU3VyZmFjZVN0YXRlLCBQYmxOZ3JpZENvbXBvbmVudD47XG4gIC8qKlxuICAgKiBBIHN0YXRlIGNodW5rIHRoYXQgaGFuZGxlcyBzZXJpYWxpemF0aW9uIG9mIHRoZSBlbnRpcmUgY29sdW1uIGRlZmluaXRpb24gc2V0LlxuICAgKlxuICAgKiBJdCBpbmNsdWRlIGEgbGltaXRlZCBzZXQgb2Yga2V5cyB0aGF0IHlvdSBjYW4gY29udHJvbCAoaW5jbHVkZS9leGNsdWRlKS5cbiAgICogQmFzZWQgb24gdGhlIGtleXMgcHJvY2Vzc2VkLCBhZGRpdGlvbmFsIGNoaWxkIGNodW5rcyBhcmUgcHJvY2Vzc2VkLCBiYXNlZCBvbiB0aGUgcHJvY2Vzc2VkIGtleSBhbmQgb2JqZWN0IGl0IHJlcHJlc2VudHMuXG4gICAqXG4gICAqIC0ga2V5L3ZhbHVlIGNodW5rLlxuICAgKiAtIGhhcyBjaGlsZHJlbiBjaHVua3NcbiAgICogLSByb290IGNodW5rLlxuICAgKi9cbiAgY29sdW1uczogU3RhdGVDaHVua0l0ZW08Qy5QYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXRTdGF0ZSwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0PjtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgdGhlIGN1cnJlbnQgY29sdW1uIG9yZGVyLlxuICAgKiBUaGlzIGlzIGEga2V5bGVzcyBjaHVuaywgaW4gdGhpcyBjYXNlIGFuIGFycmF5LCBzbyB5b3UgY2FuIG9ubHkgaW5jbHVkZSAvIGV4Y2x1ZGUgaXQgYXMgYSB3aG9sZS5cbiAgICpcbiAgICogLSBrZXlsZXNzIGNodW5rLlxuICAgKiAtIHJvb3QgY2h1bmsuXG4gICAqL1xuICBjb2x1bW5PcmRlcjogU3RhdGVDaHVua0l0ZW08UGljazxQYmxOZ3JpZEdsb2JhbFN0YXRlLCAnY29sdW1uT3JkZXInPiwgQ29sdW1uQXBpPGFueT4sIGFueSwgdHJ1ZT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnVpbHRJblN0YXRlQ2h1bmtzIHtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgbWV0YSBjb2x1bW5zIChoZWFkZXIgLyBmb290ZXIpLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgY2hpbGQgY2h1bmsgb2YgdGhlIGBjb2x1bW5zYCByb290IGNodW5rXG4gICAqL1xuICBtZXRhQ29sdW1uOiBTdGF0ZUNodW5rSXRlbTxDLlBibE5ncmlkTWV0YUNvbHVtblN0YXRlLCBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB8IFBibE1ldGFDb2x1bW4+O1xuICAvKipcbiAgICogQSBzdGF0ZSBjaHVuayB0aGF0IGhhbmRsZXMgc2VyaWFsaXphdGlvbiBvZiBtZXRhIGdyb3VwIGNvbHVtbnMgKGhlYWRlciBncm91cCkuXG4gICAqXG4gICAqIFRoaXMgaXMgYSBjaGlsZCBjaHVuayBvZiB0aGUgYGNvbHVtbnNgIHJvb3QgY2h1bmtcbiAgICovXG4gIG1ldGFHcm91cENvbHVtbjogU3RhdGVDaHVua0l0ZW08Qy5QYmxOZ3JpZEdyb3VwQ29sdW1uU3RhdGUsIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB8IFBibENvbHVtbkdyb3VwPjtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgZGF0YSBjb2x1bW5zLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgY2hpbGQgY2h1bmsgb2YgdGhlIGBjb2x1bW5zYCByb290IGNodW5rXG4gICAqL1xuICBkYXRhQ29sdW1uOiBTdGF0ZUNodW5rSXRlbTxDLlBibE5ncmlkQ29sdW1uU3RhdGUsIFBibENvbHVtbkRlZmluaXRpb24gfCBQYmxDb2x1bW4sIERhdGFDb2x1bW5CdWlsdEluU3RhdGVDaHVua0V4dHJhRGF0YT47XG4gIC8qKlxuICAgKiBBIHN0YXRlIGNodW5rIHRoYXQgaGFuZGxlcyBzZXJpYWxpemF0aW9uIG9mIG1ldGEgcm93cyAoQSByb3cgd2l0aCBoZWFkZXIgLyBmb290ZXIgY29sdW1uKS5cbiAgICpcbiAgICogVGhpcyBpcyBhIGNoaWxkIGNodW5rIG9mIHRoZSBgY29sdW1uc2Agcm9vdCBjaHVua1xuICAgKlxuICAgKiBOb3RlIHRoYXQgYSBgbWV0YVJvd2AgZG9lcyBub3QgcmVmZXIgdG8gdGhhdCBtYWluIGhlYWRlci9mb290ZXIgcm93cywgaXQgb25seSByZWZlcnMgdG8gYWRkaXRpb25hbCBtZXRhIHJvd3MuXG4gICAqIFRoZSBgZGF0YU1ldGFSb3dgIHNlY3Rpb24gY2h1bmsgaXMgdGhlIG9uZSByZWZlcnJpbmcgdG8gdGhlIG1haW4gaGVhZGVyL2Zvb3RlciByb3dzXG4gICAqL1xuICBtZXRhUm93OiBTdGF0ZUNodW5rSXRlbTxDLlBibE5ncmlkTWV0YVJvd1NldFN0YXRlPEMuUGJsTmdyaWRNZXRhQ29sdW1uU3RhdGU+LCBQYmxDb2x1bW5TZXQ8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24gfCBQYmxNZXRhQ29sdW1uPj47XG4gIC8qKlxuICAgKiBBIHN0YXRlIGNodW5rIHRoYXQgaGFuZGxlcyBzZXJpYWxpemF0aW9uIG9mIG1ldGEgZ3JvdXAgcm93cyAoQSByb3cgd2l0aCBoZWFkZXIgZ3JvdXAgY29sdW1ucykuXG4gICAqXG4gICAqIFRoaXMgaXMgYSBjaGlsZCBjaHVuayBvZiB0aGUgYGNvbHVtbnNgIHJvb3QgY2h1bmtcbiAgICovXG4gIG1ldGFHcm91cFJvdzogU3RhdGVDaHVua0l0ZW08Qy5QYmxOZ3JpZE1ldGFSb3dTZXRTdGF0ZTxDLlBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZT4sIFBibENvbHVtblNldDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24gfCBQYmxDb2x1bW5Hcm91cD4+O1xuICAvKipcbiAgICogQSBzdGF0ZSBjaHVuayB0aGF0IGhhbmRsZXMgc2VyaWFsaXphdGlvbiBvZiBkYXRhIHJvd3MgKEEgcm93IHdpdGggZGF0YSBjb2x1bW5zKS5cbiAgICpcbiAgICogVGhpcyBpcyBhIGNoaWxkIGNodW5rIG9mIHRoZSBgY29sdW1uc2Agcm9vdCBjaHVua1xuICAgKi9cbiAgZGF0YU1ldGFSb3c6IFN0YXRlQ2h1bmtJdGVtPEMuUGJsTmdyaWRNZXRhUm93U3RhdGUsIFBibE1ldGFSb3dEZWZpbml0aW9ucywgeyBraW5kOiAnaGVhZGVyJyB8ICdmb290ZXInOyBhY3RpdmU/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IH0+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFDb2x1bW5CdWlsdEluU3RhdGVDaHVua0V4dHJhRGF0YSB7XG4gIC8qKlxuICAgKiBUaGUgYFBibENvbHVtbmAgaW5zdGFuY2UsIGlmIGZvdW5kLlxuICAgKiBJZiBubyBpbnN0YW5jZSBpcyBmb3VuZCBpdCBtZWFucyB0aGF0IHRoZSBzb3VyY2UgKGBQYmxOZ3JpZENvbXBvbmVudC5jb2x1bW5zYCkgY29udGFpbnMgYFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvbnNgLlxuICAgKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBtdXN0IGZhbGxiYWNrIHRvIHVzaW5nIGBjdHguc291cmNlYCBpZiBgcGJsQ29sdW1uYCBpcyBub3QgcHJvdmlkZWQuXG4gICAqL1xuICBwYmxDb2x1bW4/OiBQYmxDb2x1bW47XG5cbiAgLyoqXG4gICAqIFRoZSBgUGJsQ29sdW1uYCBpbnN0YW5jZSB0aGF0IGlzIGN1cnJlbnRseSBpbiB0aGUgZ3JpZCdzIGNvbHVtbiBzdG9yZSwgaWYgZm91bmQuXG4gICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGNvbHVtbiBpcyBub3QgYHBibENvbHVtbmAsIHRoZSBzdG9yZSBhbHdheXMgaGFzIGEgY29weSBvZiBhbGwgY29sdW1ucy5cbiAgICpcbiAgICogSWYgcHJvdmlkZWQsIGl0IGlzIG5vdCBhIHJlcGxhY2VtZW50IGZvciBgcGJsQ29sdW1uYCwgYm90aCByZXF1aXJlIHVwZGF0ZXMuIFVzZSB0aGUgYGFjdGl2ZUNvbHVtbmAgdG8gc2F2ZS9sb2FkIHRoZSBkYXRhIHRoYXRcbiAgICogY2hhbmdlIGR1cmluZyBydW50aW1lLlxuICAgKi9cbiAgYWN0aXZlQ29sdW1uPzogUGJsQ29sdW1uO1xufVxuIl19