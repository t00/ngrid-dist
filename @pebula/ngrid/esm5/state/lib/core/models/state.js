/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/models/state.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3N0YXRlLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbW9kZWxzL3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQU1BLG9DQUtDOzs7SUFKQywrQkFBYzs7SUFDZCwrQkFBZTs7SUFDZiw4QkFBYTs7SUFDYixpQ0FBa0I7Ozs7O0FBR3BCLHFDQUFxRTs7OztBQUVyRSxpQ0FBNkU7Ozs7QUFFN0UsMENBSUM7OztJQUhDLG9DQUF3Qjs7SUFDeEIsc0NBQTZCOztJQUM3Qix1Q0FBOEI7Ozs7O0FBR2hDLHNEQUFrRjs7Ozs7QUFFbEYsK0NBSUM7OztJQUhDLDJDQUFnQzs7SUFDaEMseUNBQTZCOzs7Ozs7Ozs7SUFDN0IscUdBQXNMOzs7OztBQU94TCwyQ0FFQzs7O0lBREMsMENBQWtCOzs7OztBQUdwQix5Q0FFQzs7O0lBREMsMkNBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgKiBhcyBCIGZyb20gJy4uL2J1aWx0LWluLWhhbmRsZXJzL2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkU3RhdGVPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT0gU3RhdGUgQ2h1bmtzICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhdGVDaHVua0l0ZW08VFN0YXRlLCBUVmFsdWUsIFREYXRhID0gYW55LCBUS2V5bGVzcyA9IG5ldmVyPiB7XG4gIHN0YXRlOiBUU3RhdGU7XG4gIHZhbHVlPzogVFZhbHVlO1xuICBkYXRhPzogVERhdGE7XG4gIGtleWxlc3M6IFRLZXlsZXNzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvb3RTdGF0ZUNodW5rcyBleHRlbmRzIEIuQnVpbHRJblJvb3RTdGF0ZUNodW5rcyB7IH1cblxuZXhwb3J0IGludGVyZmFjZSBTdGF0ZUNodW5rcyBleHRlbmRzIFJvb3RTdGF0ZUNodW5rcywgQi5CdWlsdEluU3RhdGVDaHVua3N7IH1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlQ29udGV4dCB7XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50O1xuICBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xuICBvcHRpb25zOiBQYmxOZ3JpZFN0YXRlT3B0aW9ucztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlQ2h1bmtTZWN0aW9uQ29udGV4dCBleHRlbmRzIFBibE5ncmlkU3RhdGVDb250ZXh0IHsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU3RhdGVDaHVua0NvbnRleHQ8VCBleHRlbmRzIGtleW9mIFN0YXRlQ2h1bmtzPiBleHRlbmRzIFBibE5ncmlkU3RhdGVDaHVua1NlY3Rpb25Db250ZXh0IHtcbiAgc291cmNlOiBTdGF0ZUNodW5rc1tUXVsndmFsdWUnXTtcbiAgZGF0YT86IFN0YXRlQ2h1bmtzW1RdWydkYXRhJ11cbiAgcnVuQ2hpbGRDaHVuaz88VENoaWxkIGV4dGVuZHMga2V5b2YgU3RhdGVDaHVua3M+KGNoaWxkQ2h1bmtJZDogVENoaWxkLCBzdGF0ZTogU3RhdGVDaHVua3NbVENoaWxkXVsnc3RhdGUnXSwgc291cmNlOiBTdGF0ZUNodW5rc1tUQ2hpbGRdWyd2YWx1ZSddLCBkYXRhPzogU3RhdGVDaHVua3NbVENoaWxkXVsnZGF0YSddKTtcbn1cblxuLyogPT09PT09PT09PT09PT09PT09PT09PT0gU3RhdGUgQ2h1bmtzICovXG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09IEdsb2JhbCBTdGF0ZSBPYmplY3QgKi9cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFN0YXRlTWV0YWRhdGEge1xuICB1cGRhdGVkQXQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZEdsb2JhbFN0YXRlIGV4dGVuZHMgQi5QYmxOZ3JpZEJ1aWx0SW5HbG9iYWxTdGF0ZSB7XG4gIF9fbWV0YWRhdGFfXzogUGJsTmdyaWRTdGF0ZU1ldGFkYXRhO1xufVxuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PSBHbG9iYWwgU3RhdGUgT2JqZWN0ICovXG4iXX0=