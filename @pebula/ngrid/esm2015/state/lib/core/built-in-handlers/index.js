/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQWVBLHFDQUFjLHlCQUF5QixDQUFDO0FBQ3hDLDBDQUFjLG9CQUFvQixDQUFDO0FBQ25DLDRDQUFjLHNCQUFzQixDQUFDOzs7O0FBRXJDLGdEQUlDOzs7SUFIQywwQ0FBMkI7O0lBQzNCLDZDQUE0Qzs7SUFDNUMsaURBQXNCOzs7OztBQUd4Qiw0Q0EyQkM7Ozs7Ozs7OztJQXBCQyxzQ0FBOEQ7Ozs7Ozs7Ozs7OztJQVc5RCx5Q0FBeUY7Ozs7Ozs7OztJQVF6Riw2Q0FBaUc7Ozs7O0FBR25HLHdDQXdDQzs7Ozs7Ozs7SUFsQ0Msd0NBQStGOzs7Ozs7O0lBTS9GLDZDQUF1Rzs7Ozs7OztJQU12Ryx3Q0FBeUg7Ozs7Ozs7Ozs7SUFTekgscUNBQXFJOzs7Ozs7O0lBTXJJLDBDQUE2STs7Ozs7OztJQU03SSx5Q0FBMkk7Ozs7O0FBRzdJLDBEQWlCQzs7Ozs7Ozs7O0lBVkMseURBQXNCOzs7Ozs7Ozs7SUFTdEIsNERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCBQYmxNZXRhQ29sdW1uLFxuICBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sIFBibENvbHVtbkdyb3VwLFxuICBQYmxDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW4sXG4gIFBibE1ldGFSb3dEZWZpbml0aW9ucyxcbiAgUGJsQ29sdW1uU2V0LFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIENvbHVtbkFwaSxcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkR2xvYmFsU3RhdGUsIFN0YXRlQ2h1bmtJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcbmltcG9ydCAqIGFzIEMgZnJvbSAnLi9jb2x1bW4tZGVmL2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkU3VyZmFjZVN0YXRlIH0gZnJvbSAnLi9ncmlkLXByaW1pdGl2ZXMvaW5kZXgnO1xuXG5leHBvcnQgKiBmcm9tICcuL2dyaWQtcHJpbWl0aXZlcy9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL2NvbHVtbi1kZWYvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi9jb2x1bW4tb3JkZXIvaW5kZXgnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQnVpbHRJbkdsb2JhbFN0YXRlIHtcbiAgZ3JpZDogUGJsTmdyaWRTdXJmYWNlU3RhdGU7XG4gIGNvbHVtbnM6IEMuUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0U3RhdGU7XG4gIGNvbHVtbk9yZGVyOiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdWlsdEluUm9vdFN0YXRlQ2h1bmtzIHtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgcHJpbWl0aXZlIHByb3BlcnRpZXMgb24gdGhlIGdyaWQgaW5zdGFuY2UgKFBibE5ncmlkQ29tcG9uZW50KVxuICAgKlxuICAgKiAtIGtleS92YWx1ZSBjaHVuay5cbiAgICogLSByb290IGNodW5rLlxuICAgKi9cbiAgZ3JpZDogU3RhdGVDaHVua0l0ZW08UGJsTmdyaWRTdXJmYWNlU3RhdGUsIFBibE5ncmlkQ29tcG9uZW50PjtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgdGhlIGVudGlyZSBjb2x1bW4gZGVmaW5pdGlvbiBzZXQuXG4gICAqXG4gICAqIEl0IGluY2x1ZGUgYSBsaW1pdGVkIHNldCBvZiBrZXlzIHRoYXQgeW91IGNhbiBjb250cm9sIChpbmNsdWRlL2V4Y2x1ZGUpLlxuICAgKiBCYXNlZCBvbiB0aGUga2V5cyBwcm9jZXNzZWQsIGFkZGl0aW9uYWwgY2hpbGQgY2h1bmtzIGFyZSBwcm9jZXNzZWQsIGJhc2VkIG9uIHRoZSBwcm9jZXNzZWQga2V5IGFuZCBvYmplY3QgaXQgcmVwcmVzZW50cy5cbiAgICpcbiAgICogLSBrZXkvdmFsdWUgY2h1bmsuXG4gICAqIC0gaGFzIGNoaWxkcmVuIGNodW5rc1xuICAgKiAtIHJvb3QgY2h1bmsuXG4gICAqL1xuICBjb2x1bW5zOiBTdGF0ZUNodW5rSXRlbTxDLlBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldFN0YXRlLCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ+O1xuICAvKipcbiAgICogQSBzdGF0ZSBjaHVuayB0aGF0IGhhbmRsZXMgc2VyaWFsaXphdGlvbiBvZiB0aGUgY3VycmVudCBjb2x1bW4gb3JkZXIuXG4gICAqIFRoaXMgaXMgYSBrZXlsZXNzIGNodW5rLCBpbiB0aGlzIGNhc2UgYW4gYXJyYXksIHNvIHlvdSBjYW4gb25seSBpbmNsdWRlIC8gZXhjbHVkZSBpdCBhcyBhIHdob2xlLlxuICAgKlxuICAgKiAtIGtleWxlc3MgY2h1bmsuXG4gICAqIC0gcm9vdCBjaHVuay5cbiAgICovXG4gIGNvbHVtbk9yZGVyOiBTdGF0ZUNodW5rSXRlbTxQaWNrPFBibE5ncmlkR2xvYmFsU3RhdGUsICdjb2x1bW5PcmRlcic+LCBDb2x1bW5BcGk8YW55PiwgYW55LCB0cnVlPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdWlsdEluU3RhdGVDaHVua3Mge1xuICAvKipcbiAgICogQSBzdGF0ZSBjaHVuayB0aGF0IGhhbmRsZXMgc2VyaWFsaXphdGlvbiBvZiBtZXRhIGNvbHVtbnMgKGhlYWRlciAvIGZvb3RlcikuXG4gICAqXG4gICAqIFRoaXMgaXMgYSBjaGlsZCBjaHVuayBvZiB0aGUgYGNvbHVtbnNgIHJvb3QgY2h1bmtcbiAgICovXG4gIG1ldGFDb2x1bW46IFN0YXRlQ2h1bmtJdGVtPEMuUGJsTmdyaWRNZXRhQ29sdW1uU3RhdGUsIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uIHwgUGJsTWV0YUNvbHVtbj47XG4gIC8qKlxuICAgKiBBIHN0YXRlIGNodW5rIHRoYXQgaGFuZGxlcyBzZXJpYWxpemF0aW9uIG9mIG1ldGEgZ3JvdXAgY29sdW1ucyAoaGVhZGVyIGdyb3VwKS5cbiAgICpcbiAgICogVGhpcyBpcyBhIGNoaWxkIGNodW5rIG9mIHRoZSBgY29sdW1uc2Agcm9vdCBjaHVua1xuICAgKi9cbiAgbWV0YUdyb3VwQ29sdW1uOiBTdGF0ZUNodW5rSXRlbTxDLlBibE5ncmlkR3JvdXBDb2x1bW5TdGF0ZSwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIHwgUGJsQ29sdW1uR3JvdXA+O1xuICAvKipcbiAgICogQSBzdGF0ZSBjaHVuayB0aGF0IGhhbmRsZXMgc2VyaWFsaXphdGlvbiBvZiBkYXRhIGNvbHVtbnMuXG4gICAqXG4gICAqIFRoaXMgaXMgYSBjaGlsZCBjaHVuayBvZiB0aGUgYGNvbHVtbnNgIHJvb3QgY2h1bmtcbiAgICovXG4gIGRhdGFDb2x1bW46IFN0YXRlQ2h1bmtJdGVtPEMuUGJsTmdyaWRDb2x1bW5TdGF0ZSwgUGJsQ29sdW1uRGVmaW5pdGlvbiB8IFBibENvbHVtbiwgRGF0YUNvbHVtbkJ1aWx0SW5TdGF0ZUNodW5rRXh0cmFEYXRhPjtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgbWV0YSByb3dzIChBIHJvdyB3aXRoIGhlYWRlciAvIGZvb3RlciBjb2x1bW4pLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgY2hpbGQgY2h1bmsgb2YgdGhlIGBjb2x1bW5zYCByb290IGNodW5rXG4gICAqXG4gICAqIE5vdGUgdGhhdCBhIGBtZXRhUm93YCBkb2VzIG5vdCByZWZlciB0byB0aGF0IG1haW4gaGVhZGVyL2Zvb3RlciByb3dzLCBpdCBvbmx5IHJlZmVycyB0byBhZGRpdGlvbmFsIG1ldGEgcm93cy5cbiAgICogVGhlIGBkYXRhTWV0YVJvd2Agc2VjdGlvbiBjaHVuayBpcyB0aGUgb25lIHJlZmVycmluZyB0byB0aGUgbWFpbiBoZWFkZXIvZm9vdGVyIHJvd3NcbiAgICovXG4gIG1ldGFSb3c6IFN0YXRlQ2h1bmtJdGVtPEMuUGJsTmdyaWRNZXRhUm93U2V0U3RhdGU8Qy5QYmxOZ3JpZE1ldGFDb2x1bW5TdGF0ZT4sIFBibENvbHVtblNldDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB8IFBibE1ldGFDb2x1bW4+PjtcbiAgLyoqXG4gICAqIEEgc3RhdGUgY2h1bmsgdGhhdCBoYW5kbGVzIHNlcmlhbGl6YXRpb24gb2YgbWV0YSBncm91cCByb3dzIChBIHJvdyB3aXRoIGhlYWRlciBncm91cCBjb2x1bW5zKS5cbiAgICpcbiAgICogVGhpcyBpcyBhIGNoaWxkIGNodW5rIG9mIHRoZSBgY29sdW1uc2Agcm9vdCBjaHVua1xuICAgKi9cbiAgbWV0YUdyb3VwUm93OiBTdGF0ZUNodW5rSXRlbTxDLlBibE5ncmlkTWV0YVJvd1NldFN0YXRlPEMuUGJsTmdyaWRHcm91cENvbHVtblN0YXRlPiwgUGJsQ29sdW1uU2V0PFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB8IFBibENvbHVtbkdyb3VwPj47XG4gIC8qKlxuICAgKiBBIHN0YXRlIGNodW5rIHRoYXQgaGFuZGxlcyBzZXJpYWxpemF0aW9uIG9mIGRhdGEgcm93cyAoQSByb3cgd2l0aCBkYXRhIGNvbHVtbnMpLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgY2hpbGQgY2h1bmsgb2YgdGhlIGBjb2x1bW5zYCByb290IGNodW5rXG4gICAqL1xuICBkYXRhTWV0YVJvdzogU3RhdGVDaHVua0l0ZW08Qy5QYmxOZ3JpZE1ldGFSb3dTdGF0ZSwgUGJsTWV0YVJvd0RlZmluaXRpb25zLCB7IGtpbmQ6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7IGFjdGl2ZT86IFBibE1ldGFSb3dEZWZpbml0aW9uczsgfT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGF0YUNvbHVtbkJ1aWx0SW5TdGF0ZUNodW5rRXh0cmFEYXRhIHtcbiAgLyoqXG4gICAqIFRoZSBgUGJsQ29sdW1uYCBpbnN0YW5jZSwgaWYgZm91bmQuXG4gICAqIElmIG5vIGluc3RhbmNlIGlzIGZvdW5kIGl0IG1lYW5zIHRoYXQgdGhlIHNvdXJjZSAoYFBibE5ncmlkQ29tcG9uZW50LmNvbHVtbnNgKSBjb250YWlucyBgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uc2AuXG4gICAqXG4gICAqIEltcGxlbWVudGF0aW9uIG11c3QgZmFsbGJhY2sgdG8gdXNpbmcgYGN0eC5zb3VyY2VgIGlmIGBwYmxDb2x1bW5gIGlzIG5vdCBwcm92aWRlZC5cbiAgICovXG4gIHBibENvbHVtbj86IFBibENvbHVtbjtcblxuICAvKipcbiAgICogVGhlIGBQYmxDb2x1bW5gIGluc3RhbmNlIHRoYXQgaXMgY3VycmVudGx5IGluIHRoZSBncmlkJ3MgY29sdW1uIHN0b3JlLCBpZiBmb3VuZC5cbiAgICogVGhlIGN1cnJlbnRseSBhY3RpdmUgY29sdW1uIGlzIG5vdCBgcGJsQ29sdW1uYCwgdGhlIHN0b3JlIGFsd2F5cyBoYXMgYSBjb3B5IG9mIGFsbCBjb2x1bW5zLlxuICAgKlxuICAgKiBJZiBwcm92aWRlZCwgaXQgaXMgbm90IGEgcmVwbGFjZW1lbnQgZm9yIGBwYmxDb2x1bW5gLCBib3RoIHJlcXVpcmUgdXBkYXRlcy4gVXNlIHRoZSBgYWN0aXZlQ29sdW1uYCB0byBzYXZlL2xvYWQgdGhlIGRhdGEgdGhhdFxuICAgKiBjaGFuZ2UgZHVyaW5nIHJ1bnRpbWUuXG4gICAqL1xuICBhY3RpdmVDb2x1bW4/OiBQYmxDb2x1bW47XG59XG4iXX0=