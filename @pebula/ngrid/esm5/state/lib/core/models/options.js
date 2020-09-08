/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/models/options.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An interface for datasource specific logical units that can load and save state objects.
 *
 * For example, `PblNgridLocalStoragePersistAdapter` is an adapter that can loan and save the state
 * from the local storage.
 * @record
 */
export function PblNgridPersistAdapter() { }
if (false) {
    /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    PblNgridPersistAdapter.prototype.save = function (id, state) { };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridPersistAdapter.prototype.load = function (id) { };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridPersistAdapter.prototype.exists = function (id) { };
}
/**
 * An interface for logical units that can resolve a unique id for a grid.
 *
 * For example, `PblNgridIdAttributeIdentResolver` is a resolver that will resolve an id from the
 * `id` property of the grid (`PblNgridComponent.id`) which is bound to the `id` attribute of the grid (`<pbl-ngrid id="SOME ID"></pbl-ngrid>`).
 * @record
 */
export function PblNgridIdentResolver() { }
if (false) {
    /**
     * @param {?} ctx
     * @return {?}
     */
    PblNgridIdentResolver.prototype.resolveId = function (ctx) { };
}
/**
 * The context provided when resolving an id (`PblNgridIdentResolver`).
 * @record
 */
export function PblNgridIdentResolverContext() { }
/**
 * @record
 */
export function PblNgridStateSaveOptions() { }
if (false) {
    /**
     * The adapter to use for persistance.
     * \@default PblNgridLocalStoragePersistAdapter
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.persistenceAdapter;
    /**
     * The resolver used to get the unique id for an instance of the grid.
     * If not set default's to the id property of `PblNgridComponent` which is the id attribute of `<pbl-ngrid>`
     * \@default PblNgridIdAttributeIdentResolver
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.identResolver;
    /**
     * Instruction of chunk and chunk keys to include when serializing / deserializing.
     * Include is strict, only the included chunks and keys are used, everything else is ignored.
     *
     * If `include` and `exclude` are set, `include` wins.
     *
     * Note that when using include with child chunks you must include the root chunk of the child chunk, if not
     * the root chunk is skipped and so the child.
     *
     * For example, to include the `width` key of the `dataColumn` child chunk we must also include the `columns` root chunk.
     *
     * ```ts
     *   const obj: StateChunkKeyFilter = {
     *     columns: true,
     *     dataColumn: [
     *       'width',
     *     ]
     *   };
     * ```
     *
     * We can also use the wildcard `true` to include all items in a chunk:
     *
     * ```ts
     *   const obj: StateChunkKeyFilter = {
     *     columns: true,
     *     dataColumn: true,
     *   };
     * ```
     *
     * Same specificity rule apply here as well, `columns: true` alone will not include all of it's child chunks so we must add `dataColumn: true`.
     * Vice versa, `dataColumn: true` alone will not get included because it's parent (`columns`) is blocked
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.include;
    /**
     * Instruction of chunk and chunk keys to exclude when serializing / deserializing.
     * Exclude is not strict, all known chunks and keys are used unless they are excluded and so will be ignored
     *
     * If `include` and `exclude` are set, `include` wins.
     *
     * @type {?|undefined}
     */
    PblNgridStateSaveOptions.prototype.exclude;
}
/**
 * @record
 */
export function PblNgridStateLoadOptions() { }
if (false) {
    /**
     * When set to `overwrite`, state values will run over existing runtime values.
     * When set to `merge`, state values will not run over existing runtime values and only update values that are not set.
     * \@default overwrite
     * @type {?|undefined}
     */
    PblNgridStateLoadOptions.prototype.strategy;
    /**
     * When set to true the loading process will try to avoid the use of grid methods that force an immediate redrew.
     * Usually, redrawing is not a problem but in some cases it is required, for example, avoiding redraws is useful when
     * we load the state after the columns are initiated but before the grid draws them, in this case some of the data is
     * missing because it depend on updates from the draw process.
     *
     * We use the term `avoid` because the state plugin is extensible so a plugin can also apply state for it's own use.
     * Because of that we can't guarantee that no redraw is performed.
     * @type {?|undefined}
     */
    PblNgridStateLoadOptions.prototype.avoidRedraw;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9tb2RlbHMvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSw0Q0FJQzs7Ozs7OztJQUhDLGlFQUE0RDs7Ozs7SUFDNUQsMERBQStDOzs7OztJQUMvQyw0REFBcUM7Ozs7Ozs7OztBQVN2QywyQ0FFQzs7Ozs7O0lBREMsK0RBQWlFOzs7Ozs7QUFNbkUsa0RBQThFOzs7O0FBVzlFLDhDQXdEQzs7Ozs7OztJQW5EQyxzREFBMkM7Ozs7Ozs7SUFPM0MsaURBQXNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0N0QywyQ0FBOEI7Ozs7Ozs7OztJQVM5QiwyQ0FBOEI7Ozs7O0FBR2hDLDhDQWtCQzs7Ozs7Ozs7SUFaQyw0Q0FBaUM7Ozs7Ozs7Ozs7O0lBV2pDLCtDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvb3RTdGF0ZUNodW5rcywgU3RhdGVDaHVua3MsIFBibE5ncmlkR2xvYmFsU3RhdGUsIFBibE5ncmlkU3RhdGVDb250ZXh0IH0gZnJvbSAnLi9zdGF0ZSc7XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIGZvciBkYXRhc291cmNlIHNwZWNpZmljIGxvZ2ljYWwgdW5pdHMgdGhhdCBjYW4gbG9hZCBhbmQgc2F2ZSBzdGF0ZSBvYmplY3RzLlxuICpcbiAqIEZvciBleGFtcGxlLCBgUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlcmAgaXMgYW4gYWRhcHRlciB0aGF0IGNhbiBsb2FuIGFuZCBzYXZlIHRoZSBzdGF0ZVxuICogZnJvbSB0aGUgbG9jYWwgc3RvcmFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFBlcnNpc3RBZGFwdGVyIHtcbiAgc2F2ZShpZDogc3RyaW5nLCBzdGF0ZTogUGJsTmdyaWRHbG9iYWxTdGF0ZSk6IFByb21pc2U8dm9pZD47XG4gIGxvYWQoaWQ6IHN0cmluZyk6IFByb21pc2U8UGJsTmdyaWRHbG9iYWxTdGF0ZT47XG4gIGV4aXN0cyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGxvZ2ljYWwgdW5pdHMgdGhhdCBjYW4gcmVzb2x2ZSBhIHVuaXF1ZSBpZCBmb3IgYSBncmlkLlxuICpcbiAqIEZvciBleGFtcGxlLCBgUGJsTmdyaWRJZEF0dHJpYnV0ZUlkZW50UmVzb2x2ZXJgIGlzIGEgcmVzb2x2ZXIgdGhhdCB3aWxsIHJlc29sdmUgYW4gaWQgZnJvbSB0aGVcbiAqIGBpZGAgcHJvcGVydHkgb2YgdGhlIGdyaWQgKGBQYmxOZ3JpZENvbXBvbmVudC5pZGApIHdoaWNoIGlzIGJvdW5kIHRvIHRoZSBgaWRgIGF0dHJpYnV0ZSBvZiB0aGUgZ3JpZCAoYDxwYmwtbmdyaWQgaWQ9XCJTT01FIElEXCI+PC9wYmwtbmdyaWQ+YCkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRJZGVudFJlc29sdmVyIHtcbiAgcmVzb2x2ZUlkKGN0eDogUGJsTmdyaWRJZGVudFJlc29sdmVyQ29udGV4dCk6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUaGUgY29udGV4dCBwcm92aWRlZCB3aGVuIHJlc29sdmluZyBhbiBpZCAoYFBibE5ncmlkSWRlbnRSZXNvbHZlcmApLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkSWRlbnRSZXNvbHZlckNvbnRleHQgZXh0ZW5kcyBQYmxOZ3JpZFN0YXRlQ29udGV4dCB7IH1cblxuXG5leHBvcnQgdHlwZSBTdGF0ZUNodW5rS2V5RmlsdGVyID0ge1xuICBbUCBpbiBrZXlvZiBTdGF0ZUNodW5rc10/OlxuICAgIFAgZXh0ZW5kcyBrZXlvZiBSb290U3RhdGVDaHVua3NcbiAgICAgID8gUm9vdFN0YXRlQ2h1bmtzW1BdWydrZXlsZXNzJ10gZXh0ZW5kcyBuZXZlciA/IChBcnJheTxrZXlvZiBSb290U3RhdGVDaHVua3NbUF1bJ3N0YXRlJ10+IHwgYm9vbGVhbikgOiBib29sZWFuXG4gICAgICA6IEFycmF5PGtleW9mIFN0YXRlQ2h1bmtzW1BdWydzdGF0ZSddPiB8IGJvb2xlYW5cbiAgICA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFRoZSBhZGFwdGVyIHRvIHVzZSBmb3IgcGVyc2lzdGFuY2UuXG4gICAqIEBkZWZhdWx0IFBibE5ncmlkTG9jYWxTdG9yYWdlUGVyc2lzdEFkYXB0ZXJcbiAgICovXG4gIHBlcnNpc3RlbmNlQWRhcHRlcj86IFBibE5ncmlkUGVyc2lzdEFkYXB0ZXJcblxuICAvKipcbiAgICogVGhlIHJlc29sdmVyIHVzZWQgdG8gZ2V0IHRoZSB1bmlxdWUgaWQgZm9yIGFuIGluc3RhbmNlIG9mIHRoZSBncmlkLlxuICAgKiBJZiBub3Qgc2V0IGRlZmF1bHQncyB0byB0aGUgaWQgcHJvcGVydHkgb2YgYFBibE5ncmlkQ29tcG9uZW50YCB3aGljaCBpcyB0aGUgaWQgYXR0cmlidXRlIG9mIGA8cGJsLW5ncmlkPmBcbiAgICogQGRlZmF1bHQgUGJsTmdyaWRJZEF0dHJpYnV0ZUlkZW50UmVzb2x2ZXJcbiAgICovXG4gIGlkZW50UmVzb2x2ZXI/OiBQYmxOZ3JpZElkZW50UmVzb2x2ZXI7XG5cbiAgLyoqXG4gICAqIEluc3RydWN0aW9uIG9mIGNodW5rIGFuZCBjaHVuayBrZXlzIHRvIGluY2x1ZGUgd2hlbiBzZXJpYWxpemluZyAvIGRlc2VyaWFsaXppbmcuXG4gICAqIEluY2x1ZGUgaXMgc3RyaWN0LCBvbmx5IHRoZSBpbmNsdWRlZCBjaHVua3MgYW5kIGtleXMgYXJlIHVzZWQsIGV2ZXJ5dGhpbmcgZWxzZSBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBJZiBgaW5jbHVkZWAgYW5kIGBleGNsdWRlYCBhcmUgc2V0LCBgaW5jbHVkZWAgd2lucy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gdXNpbmcgaW5jbHVkZSB3aXRoIGNoaWxkIGNodW5rcyB5b3UgbXVzdCBpbmNsdWRlIHRoZSByb290IGNodW5rIG9mIHRoZSBjaGlsZCBjaHVuaywgaWYgbm90XG4gICAqIHRoZSByb290IGNodW5rIGlzIHNraXBwZWQgYW5kIHNvIHRoZSBjaGlsZC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIHRvIGluY2x1ZGUgdGhlIGB3aWR0aGAga2V5IG9mIHRoZSBgZGF0YUNvbHVtbmAgY2hpbGQgY2h1bmsgd2UgbXVzdCBhbHNvIGluY2x1ZGUgdGhlIGBjb2x1bW5zYCByb290IGNodW5rLlxuICAgKlxuICAgKiBgYGB0c1xuICAgKiAgIGNvbnN0IG9iajogU3RhdGVDaHVua0tleUZpbHRlciA9IHtcbiAgICogICAgIGNvbHVtbnM6IHRydWUsXG4gICAqICAgICBkYXRhQ29sdW1uOiBbXG4gICAqICAgICAgICd3aWR0aCcsXG4gICAqICAgICBdXG4gICAqICAgfTtcbiAgICogYGBgXG4gICAqXG4gICAqIFdlIGNhbiBhbHNvIHVzZSB0aGUgd2lsZGNhcmQgYHRydWVgIHRvIGluY2x1ZGUgYWxsIGl0ZW1zIGluIGEgY2h1bms6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqICAgY29uc3Qgb2JqOiBTdGF0ZUNodW5rS2V5RmlsdGVyID0ge1xuICAgKiAgICAgY29sdW1uczogdHJ1ZSxcbiAgICogICAgIGRhdGFDb2x1bW46IHRydWUsXG4gICAqICAgfTtcbiAgICogYGBgXG4gICAqXG4gICAqIFNhbWUgc3BlY2lmaWNpdHkgcnVsZSBhcHBseSBoZXJlIGFzIHdlbGwsIGBjb2x1bW5zOiB0cnVlYCBhbG9uZSB3aWxsIG5vdCBpbmNsdWRlIGFsbCBvZiBpdCdzIGNoaWxkIGNodW5rcyBzbyB3ZSBtdXN0IGFkZCBgZGF0YUNvbHVtbjogdHJ1ZWAuXG4gICAqIFZpY2UgdmVyc2EsIGBkYXRhQ29sdW1uOiB0cnVlYCBhbG9uZSB3aWxsIG5vdCBnZXQgaW5jbHVkZWQgYmVjYXVzZSBpdCdzIHBhcmVudCAoYGNvbHVtbnNgKSBpcyBibG9ja2VkXG4gICAqL1xuICBpbmNsdWRlPzogU3RhdGVDaHVua0tleUZpbHRlcjtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb24gb2YgY2h1bmsgYW5kIGNodW5rIGtleXMgdG8gZXhjbHVkZSB3aGVuIHNlcmlhbGl6aW5nIC8gZGVzZXJpYWxpemluZy5cbiAgICogRXhjbHVkZSBpcyBub3Qgc3RyaWN0LCBhbGwga25vd24gY2h1bmtzIGFuZCBrZXlzIGFyZSB1c2VkIHVubGVzcyB0aGV5IGFyZSBleGNsdWRlZCBhbmQgc28gd2lsbCBiZSBpZ25vcmVkXG4gICAqXG4gICAqIElmIGBpbmNsdWRlYCBhbmQgYGV4Y2x1ZGVgIGFyZSBzZXQsIGBpbmNsdWRlYCB3aW5zLlxuICAgKlxuICAgKi9cbiAgZXhjbHVkZT86IFN0YXRlQ2h1bmtLZXlGaWx0ZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zIGV4dGVuZHMgUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zIHtcbiAgLyoqXG4gICAqIFdoZW4gc2V0IHRvIGBvdmVyd3JpdGVgLCBzdGF0ZSB2YWx1ZXMgd2lsbCBydW4gb3ZlciBleGlzdGluZyBydW50aW1lIHZhbHVlcy5cbiAgICogV2hlbiBzZXQgdG8gYG1lcmdlYCwgc3RhdGUgdmFsdWVzIHdpbGwgbm90IHJ1biBvdmVyIGV4aXN0aW5nIHJ1bnRpbWUgdmFsdWVzIGFuZCBvbmx5IHVwZGF0ZSB2YWx1ZXMgdGhhdCBhcmUgbm90IHNldC5cbiAgICogQGRlZmF1bHQgb3ZlcndyaXRlXG4gICAqL1xuICBzdHJhdGVneT86ICdvdmVyd3JpdGUnIHwgJ21lcmdlJztcblxuICAvKipcbiAgICogV2hlbiBzZXQgdG8gdHJ1ZSB0aGUgbG9hZGluZyBwcm9jZXNzIHdpbGwgdHJ5IHRvIGF2b2lkIHRoZSB1c2Ugb2YgZ3JpZCBtZXRob2RzIHRoYXQgZm9yY2UgYW4gaW1tZWRpYXRlIHJlZHJldy5cbiAgICogVXN1YWxseSwgcmVkcmF3aW5nIGlzIG5vdCBhIHByb2JsZW0gYnV0IGluIHNvbWUgY2FzZXMgaXQgaXMgcmVxdWlyZWQsIGZvciBleGFtcGxlLCBhdm9pZGluZyByZWRyYXdzIGlzIHVzZWZ1bCB3aGVuXG4gICAqIHdlIGxvYWQgdGhlIHN0YXRlIGFmdGVyIHRoZSBjb2x1bW5zIGFyZSBpbml0aWF0ZWQgYnV0IGJlZm9yZSB0aGUgZ3JpZCBkcmF3cyB0aGVtLCBpbiB0aGlzIGNhc2Ugc29tZSBvZiB0aGUgZGF0YSBpc1xuICAgKiBtaXNzaW5nIGJlY2F1c2UgaXQgZGVwZW5kIG9uIHVwZGF0ZXMgZnJvbSB0aGUgZHJhdyBwcm9jZXNzLlxuICAgKlxuICAgKiBXZSB1c2UgdGhlIHRlcm0gYGF2b2lkYCBiZWNhdXNlIHRoZSBzdGF0ZSBwbHVnaW4gaXMgZXh0ZW5zaWJsZSBzbyBhIHBsdWdpbiBjYW4gYWxzbyBhcHBseSBzdGF0ZSBmb3IgaXQncyBvd24gdXNlLlxuICAgKiBCZWNhdXNlIG9mIHRoYXQgd2UgY2FuJ3QgZ3VhcmFudGVlIHRoYXQgbm8gcmVkcmF3IGlzIHBlcmZvcm1lZC5cbiAgICovXG4gIGF2b2lkUmVkcmF3PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgUGJsTmdyaWRTdGF0ZU9wdGlvbnMgPSBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgfCBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnNcbiJdfQ==