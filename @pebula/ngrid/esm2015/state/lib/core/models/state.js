/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template TState, TValue, TData, TKeyless
 */
export function StateChunkItem() { }
if (false) {
    /** @type {?} */
    StateChunkItem.prototype.state;
    /** @type {?|undefined} */
    StateChunkItem.prototype.value;
    /** @type {?|undefined} */
    StateChunkItem.prototype.data;
    /** @type {?} */
    StateChunkItem.prototype.keyless;
}
/**
 * @record
 */
export function RootStateChunks() { }
/**
 * @record
 */
export function StateChunks() { }
/**
 * @record
 */
export function PblNgridStateContext() { }
if (false) {
    /** @type {?} */
    PblNgridStateContext.prototype.grid;
    /** @type {?} */
    PblNgridStateContext.prototype.extApi;
    /** @type {?} */
    PblNgridStateContext.prototype.options;
}
/**
 * @record
 */
export function PblNgridStateChunkSectionContext() { }
/**
 * @record
 * @template T
 */
export function PblNgridStateChunkContext() { }
if (false) {
    /** @type {?} */
    PblNgridStateChunkContext.prototype.source;
    /** @type {?|undefined} */
    PblNgridStateChunkContext.prototype.data;
    /**
     * @template TChild
     * @param {?} childChunkId
     * @param {?} state
     * @param {?} source
     * @param {?=} data
     * @return {?}
     */
    PblNgridStateChunkContext.prototype.runChildChunk = function (childChunkId, state, source, data) { };
}
/**
 * @record
 */
export function PblNgridStateMetadata() { }
if (false) {
    /** @type {?} */
    PblNgridStateMetadata.prototype.updatedAt;
}
/**
 * @record
 */
export function PblNgridGlobalState() { }
if (false) {
    /** @type {?} */
    PblNgridGlobalState.prototype.__metadata__;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbW9kZWxzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBTUEsb0NBS0M7OztJQUpDLCtCQUFjOztJQUNkLCtCQUFlOztJQUNmLDhCQUFhOztJQUNiLGlDQUFrQjs7Ozs7QUFHcEIscUNBQXFFOzs7O0FBRXJFLGlDQUE2RTs7OztBQUU3RSwwQ0FJQzs7O0lBSEMsb0NBQXdCOztJQUN4QixzQ0FBNkI7O0lBQzdCLHVDQUE4Qjs7Ozs7QUFHaEMsc0RBQWtGOzs7OztBQUVsRiwrQ0FJQzs7O0lBSEMsMkNBQWdDOztJQUNoQyx5Q0FBNkI7Ozs7Ozs7OztJQUM3QixxR0FBc0w7Ozs7O0FBT3hMLDJDQUVDOzs7SUFEQywwQ0FBa0I7Ozs7O0FBR3BCLHlDQUVDOzs7SUFEQywyQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCAqIGFzIEIgZnJvbSAnLi4vYnVpbHQtaW4taGFuZGxlcnMvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRTdGF0ZU9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PSBTdGF0ZSBDaHVua3MgKi9cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZUNodW5rSXRlbTxUU3RhdGUsIFRWYWx1ZSwgVERhdGEgPSBhbnksIFRLZXlsZXNzID0gbmV2ZXI+IHtcbiAgc3RhdGU6IFRTdGF0ZTtcbiAgdmFsdWU/OiBUVmFsdWU7XG4gIGRhdGE/OiBURGF0YTtcbiAga2V5bGVzczogVEtleWxlc3M7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm9vdFN0YXRlQ2h1bmtzIGV4dGVuZHMgQi5CdWlsdEluUm9vdFN0YXRlQ2h1bmtzIHsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFN0YXRlQ2h1bmtzIGV4dGVuZHMgUm9vdFN0YXRlQ2h1bmtzLCBCLkJ1aWx0SW5TdGF0ZUNodW5rc3sgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3RhdGVDb250ZXh0IHtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ7XG4gIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG4gIG9wdGlvbnM6IFBibE5ncmlkU3RhdGVPcHRpb25zO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db250ZXh0IGV4dGVuZHMgUGJsTmdyaWRTdGF0ZUNvbnRleHQgeyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTdGF0ZUNodW5rQ29udGV4dDxUIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3M+IGV4dGVuZHMgUGJsTmdyaWRTdGF0ZUNodW5rU2VjdGlvbkNvbnRleHQge1xuICBzb3VyY2U6IFN0YXRlQ2h1bmtzW1RdWyd2YWx1ZSddO1xuICBkYXRhPzogU3RhdGVDaHVua3NbVF1bJ2RhdGEnXVxuICBydW5DaGlsZENodW5rPzxUQ2hpbGQgZXh0ZW5kcyBrZXlvZiBTdGF0ZUNodW5rcz4oY2hpbGRDaHVua0lkOiBUQ2hpbGQsIHN0YXRlOiBTdGF0ZUNodW5rc1tUQ2hpbGRdWydzdGF0ZSddLCBzb3VyY2U6IFN0YXRlQ2h1bmtzW1RDaGlsZF1bJ3ZhbHVlJ10sIGRhdGE/OiBTdGF0ZUNodW5rc1tUQ2hpbGRdWydkYXRhJ10pO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PSBTdGF0ZSBDaHVua3MgKi9cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT0gR2xvYmFsIFN0YXRlIE9iamVjdCAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3RhdGVNZXRhZGF0YSB7XG4gIHVwZGF0ZWRBdDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkR2xvYmFsU3RhdGUgZXh0ZW5kcyBCLlBibE5ncmlkQnVpbHRJbkdsb2JhbFN0YXRlIHtcbiAgX19tZXRhZGF0YV9fOiBQYmxOZ3JpZFN0YXRlTWV0YWRhdGE7XG59XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09IEdsb2JhbCBTdGF0ZSBPYmplY3QgKi9cbiJdfQ==