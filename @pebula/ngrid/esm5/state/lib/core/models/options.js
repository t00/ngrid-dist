/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9tb2RlbHMvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLDRDQUlDOzs7Ozs7O0lBSEMsaUVBQTREOzs7OztJQUM1RCwwREFBK0M7Ozs7O0lBQy9DLDREQUFxQzs7Ozs7Ozs7O0FBU3ZDLDJDQUVDOzs7Ozs7SUFEQywrREFBaUU7Ozs7OztBQU1uRSxrREFBOEU7Ozs7QUFXOUUsOENBd0RDOzs7Ozs7O0lBbkRDLHNEQUEyQzs7Ozs7OztJQU8zQyxpREFBc0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQ3RDLDJDQUE4Qjs7Ozs7Ozs7O0lBUzlCLDJDQUE4Qjs7Ozs7QUFHaEMsOENBa0JDOzs7Ozs7OztJQVpDLDRDQUFpQzs7Ozs7Ozs7Ozs7SUFXakMsK0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm9vdFN0YXRlQ2h1bmtzLCBTdGF0ZUNodW5rcywgUGJsTmdyaWRHbG9iYWxTdGF0ZSwgUGJsTmdyaWRTdGF0ZUNvbnRleHQgfSBmcm9tICcuL3N0YXRlJztcblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgZm9yIGRhdGFzb3VyY2Ugc3BlY2lmaWMgbG9naWNhbCB1bml0cyB0aGF0IGNhbiBsb2FkIGFuZCBzYXZlIHN0YXRlIG9iamVjdHMuXG4gKlxuICogRm9yIGV4YW1wbGUsIGBQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyYCBpcyBhbiBhZGFwdGVyIHRoYXQgY2FuIGxvYW4gYW5kIHNhdmUgdGhlIHN0YXRlXG4gKiBmcm9tIHRoZSBsb2NhbCBzdG9yYWdlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkUGVyc2lzdEFkYXB0ZXIge1xuICBzYXZlKGlkOiBzdHJpbmcsIHN0YXRlOiBQYmxOZ3JpZEdsb2JhbFN0YXRlKTogUHJvbWlzZTx2b2lkPjtcbiAgbG9hZChpZDogc3RyaW5nKTogUHJvbWlzZTxQYmxOZ3JpZEdsb2JhbFN0YXRlPjtcbiAgZXhpc3RzKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSBmb3IgbG9naWNhbCB1bml0cyB0aGF0IGNhbiByZXNvbHZlIGEgdW5pcXVlIGlkIGZvciBhIGdyaWQuXG4gKlxuICogRm9yIGV4YW1wbGUsIGBQYmxOZ3JpZElkQXR0cmlidXRlSWRlbnRSZXNvbHZlcmAgaXMgYSByZXNvbHZlciB0aGF0IHdpbGwgcmVzb2x2ZSBhbiBpZCBmcm9tIHRoZVxuICogYGlkYCBwcm9wZXJ0eSBvZiB0aGUgZ3JpZCAoYFBibE5ncmlkQ29tcG9uZW50LmlkYCkgd2hpY2ggaXMgYm91bmQgdG8gdGhlIGBpZGAgYXR0cmlidXRlIG9mIHRoZSBncmlkIChgPHBibC1uZ3JpZCBpZD1cIlNPTUUgSURcIj48L3BibC1uZ3JpZD5gKS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZElkZW50UmVzb2x2ZXIge1xuICByZXNvbHZlSWQoY3R4OiBQYmxOZ3JpZElkZW50UmVzb2x2ZXJDb250ZXh0KTogc3RyaW5nIHwgdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFRoZSBjb250ZXh0IHByb3ZpZGVkIHdoZW4gcmVzb2x2aW5nIGFuIGlkIChgUGJsTmdyaWRJZGVudFJlc29sdmVyYCkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRJZGVudFJlc29sdmVyQ29udGV4dCBleHRlbmRzIFBibE5ncmlkU3RhdGVDb250ZXh0IHsgfVxuXG5cbmV4cG9ydCB0eXBlIFN0YXRlQ2h1bmtLZXlGaWx0ZXIgPSB7XG4gIFtQIGluIGtleW9mIFN0YXRlQ2h1bmtzXT86XG4gICAgUCBleHRlbmRzIGtleW9mIFJvb3RTdGF0ZUNodW5rc1xuICAgICAgPyBSb290U3RhdGVDaHVua3NbUF1bJ2tleWxlc3MnXSBleHRlbmRzIG5ldmVyID8gKEFycmF5PGtleW9mIFJvb3RTdGF0ZUNodW5rc1tQXVsnc3RhdGUnXT4gfCBib29sZWFuKSA6IGJvb2xlYW5cbiAgICAgIDogQXJyYXk8a2V5b2YgU3RhdGVDaHVua3NbUF1bJ3N0YXRlJ10+IHwgYm9vbGVhblxuICAgIDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnMge1xuICAvKipcbiAgICogVGhlIGFkYXB0ZXIgdG8gdXNlIGZvciBwZXJzaXN0YW5jZS5cbiAgICogQGRlZmF1bHQgUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlclxuICAgKi9cbiAgcGVyc2lzdGVuY2VBZGFwdGVyPzogUGJsTmdyaWRQZXJzaXN0QWRhcHRlclxuXG4gIC8qKlxuICAgKiBUaGUgcmVzb2x2ZXIgdXNlZCB0byBnZXQgdGhlIHVuaXF1ZSBpZCBmb3IgYW4gaW5zdGFuY2Ugb2YgdGhlIGdyaWQuXG4gICAqIElmIG5vdCBzZXQgZGVmYXVsdCdzIHRvIHRoZSBpZCBwcm9wZXJ0eSBvZiBgUGJsTmdyaWRDb21wb25lbnRgIHdoaWNoIGlzIHRoZSBpZCBhdHRyaWJ1dGUgb2YgYDxwYmwtbmdyaWQ+YFxuICAgKiBAZGVmYXVsdCBQYmxOZ3JpZElkQXR0cmlidXRlSWRlbnRSZXNvbHZlclxuICAgKi9cbiAgaWRlbnRSZXNvbHZlcj86IFBibE5ncmlkSWRlbnRSZXNvbHZlcjtcblxuICAvKipcbiAgICogSW5zdHJ1Y3Rpb24gb2YgY2h1bmsgYW5kIGNodW5rIGtleXMgdG8gaW5jbHVkZSB3aGVuIHNlcmlhbGl6aW5nIC8gZGVzZXJpYWxpemluZy5cbiAgICogSW5jbHVkZSBpcyBzdHJpY3QsIG9ubHkgdGhlIGluY2x1ZGVkIGNodW5rcyBhbmQga2V5cyBhcmUgdXNlZCwgZXZlcnl0aGluZyBlbHNlIGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIElmIGBpbmNsdWRlYCBhbmQgYGV4Y2x1ZGVgIGFyZSBzZXQsIGBpbmNsdWRlYCB3aW5zLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiB1c2luZyBpbmNsdWRlIHdpdGggY2hpbGQgY2h1bmtzIHlvdSBtdXN0IGluY2x1ZGUgdGhlIHJvb3QgY2h1bmsgb2YgdGhlIGNoaWxkIGNodW5rLCBpZiBub3RcbiAgICogdGhlIHJvb3QgY2h1bmsgaXMgc2tpcHBlZCBhbmQgc28gdGhlIGNoaWxkLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgdG8gaW5jbHVkZSB0aGUgYHdpZHRoYCBrZXkgb2YgdGhlIGBkYXRhQ29sdW1uYCBjaGlsZCBjaHVuayB3ZSBtdXN0IGFsc28gaW5jbHVkZSB0aGUgYGNvbHVtbnNgIHJvb3QgY2h1bmsuXG4gICAqXG4gICAqIGBgYHRzXG4gICAqICAgY29uc3Qgb2JqOiBTdGF0ZUNodW5rS2V5RmlsdGVyID0ge1xuICAgKiAgICAgY29sdW1uczogdHJ1ZSxcbiAgICogICAgIGRhdGFDb2x1bW46IFtcbiAgICogICAgICAgJ3dpZHRoJyxcbiAgICogICAgIF1cbiAgICogICB9O1xuICAgKiBgYGBcbiAgICpcbiAgICogV2UgY2FuIGFsc28gdXNlIHRoZSB3aWxkY2FyZCBgdHJ1ZWAgdG8gaW5jbHVkZSBhbGwgaXRlbXMgaW4gYSBjaHVuazpcbiAgICpcbiAgICogYGBgdHNcbiAgICogICBjb25zdCBvYmo6IFN0YXRlQ2h1bmtLZXlGaWx0ZXIgPSB7XG4gICAqICAgICBjb2x1bW5zOiB0cnVlLFxuICAgKiAgICAgZGF0YUNvbHVtbjogdHJ1ZSxcbiAgICogICB9O1xuICAgKiBgYGBcbiAgICpcbiAgICogU2FtZSBzcGVjaWZpY2l0eSBydWxlIGFwcGx5IGhlcmUgYXMgd2VsbCwgYGNvbHVtbnM6IHRydWVgIGFsb25lIHdpbGwgbm90IGluY2x1ZGUgYWxsIG9mIGl0J3MgY2hpbGQgY2h1bmtzIHNvIHdlIG11c3QgYWRkIGBkYXRhQ29sdW1uOiB0cnVlYC5cbiAgICogVmljZSB2ZXJzYSwgYGRhdGFDb2x1bW46IHRydWVgIGFsb25lIHdpbGwgbm90IGdldCBpbmNsdWRlZCBiZWNhdXNlIGl0J3MgcGFyZW50IChgY29sdW1uc2ApIGlzIGJsb2NrZWRcbiAgICovXG4gIGluY2x1ZGU/OiBTdGF0ZUNodW5rS2V5RmlsdGVyO1xuXG4gIC8qKlxuICAgKiBJbnN0cnVjdGlvbiBvZiBjaHVuayBhbmQgY2h1bmsga2V5cyB0byBleGNsdWRlIHdoZW4gc2VyaWFsaXppbmcgLyBkZXNlcmlhbGl6aW5nLlxuICAgKiBFeGNsdWRlIGlzIG5vdCBzdHJpY3QsIGFsbCBrbm93biBjaHVua3MgYW5kIGtleXMgYXJlIHVzZWQgdW5sZXNzIHRoZXkgYXJlIGV4Y2x1ZGVkIGFuZCBzbyB3aWxsIGJlIGlnbm9yZWRcbiAgICpcbiAgICogSWYgYGluY2x1ZGVgIGFuZCBgZXhjbHVkZWAgYXJlIHNldCwgYGluY2x1ZGVgIHdpbnMuXG4gICAqXG4gICAqL1xuICBleGNsdWRlPzogU3RhdGVDaHVua0tleUZpbHRlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgZXh0ZW5kcyBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnMge1xuICAvKipcbiAgICogV2hlbiBzZXQgdG8gYG92ZXJ3cml0ZWAsIHN0YXRlIHZhbHVlcyB3aWxsIHJ1biBvdmVyIGV4aXN0aW5nIHJ1bnRpbWUgdmFsdWVzLlxuICAgKiBXaGVuIHNldCB0byBgbWVyZ2VgLCBzdGF0ZSB2YWx1ZXMgd2lsbCBub3QgcnVuIG92ZXIgZXhpc3RpbmcgcnVudGltZSB2YWx1ZXMgYW5kIG9ubHkgdXBkYXRlIHZhbHVlcyB0aGF0IGFyZSBub3Qgc2V0LlxuICAgKiBAZGVmYXVsdCBvdmVyd3JpdGVcbiAgICovXG4gIHN0cmF0ZWd5PzogJ292ZXJ3cml0ZScgfCAnbWVyZ2UnO1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byB0cnVlIHRoZSBsb2FkaW5nIHByb2Nlc3Mgd2lsbCB0cnkgdG8gYXZvaWQgdGhlIHVzZSBvZiBncmlkIG1ldGhvZHMgdGhhdCBmb3JjZSBhbiBpbW1lZGlhdGUgcmVkcmV3LlxuICAgKiBVc3VhbGx5LCByZWRyYXdpbmcgaXMgbm90IGEgcHJvYmxlbSBidXQgaW4gc29tZSBjYXNlcyBpdCBpcyByZXF1aXJlZCwgZm9yIGV4YW1wbGUsIGF2b2lkaW5nIHJlZHJhd3MgaXMgdXNlZnVsIHdoZW5cbiAgICogd2UgbG9hZCB0aGUgc3RhdGUgYWZ0ZXIgdGhlIGNvbHVtbnMgYXJlIGluaXRpYXRlZCBidXQgYmVmb3JlIHRoZSBncmlkIGRyYXdzIHRoZW0sIGluIHRoaXMgY2FzZSBzb21lIG9mIHRoZSBkYXRhIGlzXG4gICAqIG1pc3NpbmcgYmVjYXVzZSBpdCBkZXBlbmQgb24gdXBkYXRlcyBmcm9tIHRoZSBkcmF3IHByb2Nlc3MuXG4gICAqXG4gICAqIFdlIHVzZSB0aGUgdGVybSBgYXZvaWRgIGJlY2F1c2UgdGhlIHN0YXRlIHBsdWdpbiBpcyBleHRlbnNpYmxlIHNvIGEgcGx1Z2luIGNhbiBhbHNvIGFwcGx5IHN0YXRlIGZvciBpdCdzIG93biB1c2UuXG4gICAqIEJlY2F1c2Ugb2YgdGhhdCB3ZSBjYW4ndCBndWFyYW50ZWUgdGhhdCBubyByZWRyYXcgaXMgcGVyZm9ybWVkLlxuICAgKi9cbiAgYXZvaWRSZWRyYXc/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBQYmxOZ3JpZFN0YXRlT3B0aW9ucyA9IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyB8IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9uc1xuIl19