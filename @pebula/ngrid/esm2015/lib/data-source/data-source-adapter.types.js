/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Data source event triggers map with triggers that the user can opt in a custom behaviour.
 * The properties represent the trigger name/key and the value represent the event input in it's raw form.
 * @record
 */
export function PblDataSourceConfigurableTriggers() { }
if (false) {
    /** @type {?|undefined} */
    PblDataSourceConfigurableTriggers.prototype.filter;
    /** @type {?|undefined} */
    PblDataSourceConfigurableTriggers.prototype.sort;
    /** @type {?|undefined} */
    PblDataSourceConfigurableTriggers.prototype.pagination;
}
/**
 * Data source event triggers map.
 * The properties represent the trigger name/key and the value represent the event input in it's raw form.
 * @record
 * @template T
 */
export function PblDataSourceTriggers() { }
if (false) {
    /**
     * Represents input from `refresh` emissions. T does not necessarily represents the type of the datasource.
     * @type {?|undefined}
     */
    PblDataSourceTriggers.prototype.data;
}
/**
 * @record
 * @template T
 */
export function PblDataSourceTriggerCache() { }
if (false) {
    /** @type {?|undefined} */
    PblDataSourceTriggerCache.prototype.filter;
    /** @type {?|undefined} */
    PblDataSourceTriggerCache.prototype.sort;
    /** @type {?|undefined} */
    PblDataSourceTriggerCache.prototype.pagination;
    /** @type {?|undefined} */
    PblDataSourceTriggerCache.prototype.data;
}
/**
 * @record
 * @template T
 */
export function PblDataSourceTriggerChange() { }
if (false) {
    /** @type {?} */
    PblDataSourceTriggerChange.prototype.changed;
    /** @type {?} */
    PblDataSourceTriggerChange.prototype.prev;
    /** @type {?|undefined} */
    PblDataSourceTriggerChange.prototype.curr;
}
/**
 * @record
 * @template T
 */
export function PblDataSourceTriggerChangedEvent() { }
if (false) {
    /** @type {?} */
    PblDataSourceTriggerChangedEvent.prototype.filter;
    /** @type {?} */
    PblDataSourceTriggerChangedEvent.prototype.sort;
    /** @type {?} */
    PblDataSourceTriggerChangedEvent.prototype.pagination;
    /** @type {?} */
    PblDataSourceTriggerChangedEvent.prototype.data;
    /**
     * When true this is the first emission of data since the last connection.
     * @type {?}
     */
    PblDataSourceTriggerChangedEvent.prototype.isInitial;
    /**
     * Set the total amount of data items.
     * For use with the paginator, update the total length of data items that the current returned source is part of.
     *
     * Use when custom trigger for pagination is enabled (server side mode, in client side mode the length is automatically set)
     * @param {?} totalLength
     * @return {?}
     */
    PblDataSourceTriggerChangedEvent.prototype.updateTotalLength = function (totalLength) { };
}
/**
 * @record
 * @template T, TData
 */
export function PblDataSourceAdapterProcessedResult() { }
if (false) {
    /** @type {?} */
    PblDataSourceAdapterProcessedResult.prototype.event;
    /** @type {?} */
    PblDataSourceAdapterProcessedResult.prototype.data;
    /** @type {?|undefined} */
    PblDataSourceAdapterProcessedResult.prototype.sorted;
    /** @type {?|undefined} */
    PblDataSourceAdapterProcessedResult.prototype.filtered;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFVQSx1REFJQzs7O0lBSEMsbURBQTBCOztJQUMxQixpREFBb0M7O0lBQ3BDLHVEQUFxQzs7Ozs7Ozs7QUFPdkMsMkNBS0M7Ozs7OztJQURDLHFDQUE2Qjs7Ozs7O0FBRy9CLCtDQVFDOzs7SUFQQywyQ0FBMEI7O0lBQzFCLHlDQUFvQzs7SUFDcEMsK0NBR0M7O0lBQ0QseUNBQTZCOzs7Ozs7QUFHL0IsZ0RBSUM7OztJQUhDLDZDQUFpQjs7SUFDakIsMENBQVE7O0lBQ1IsMENBQVM7Ozs7OztBQUdYLHNEQXVCQzs7O0lBdEJDLGtEQUFxRDs7SUFDckQsZ0RBQStEOztJQUMvRCxzREFJQzs7SUFDRCxnREFBb0M7Ozs7O0lBTXBDLHFEQUFtQjs7Ozs7Ozs7O0lBUW5CLDBGQUE2Qzs7Ozs7O0FBTy9DLHlEQUtDOzs7SUFKQyxvREFBK0M7O0lBQy9DLG1EQUFVOztJQUNWLHFEQUFhOztJQUNiLHVEQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi9wYWdpbmF0b3InO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSwgRGF0YVNvdXJjZUZpbHRlciB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKiogQGludGVybmFsICovXG5leHBvcnQgdHlwZSBSZWZyZXNoRGF0YVdyYXBwZXI8VD4gPSB7IGRhdGE6IFQgfTtcblxuLyoqXG4gKiBEYXRhIHNvdXJjZSBldmVudCB0cmlnZ2VycyBtYXAgd2l0aCB0cmlnZ2VycyB0aGF0IHRoZSB1c2VyIGNhbiBvcHQgaW4gYSBjdXN0b20gYmVoYXZpb3VyLlxuICogVGhlIHByb3BlcnRpZXMgcmVwcmVzZW50IHRoZSB0cmlnZ2VyIG5hbWUva2V5IGFuZCB0aGUgdmFsdWUgcmVwcmVzZW50IHRoZSBldmVudCBpbnB1dCBpbiBpdCdzIHJhdyBmb3JtLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycyB7XG4gIGZpbHRlcj86IERhdGFTb3VyY2VGaWx0ZXI7XG4gIHNvcnQ/OiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlO1xuICBwYWdpbmF0aW9uPzogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ7XG59XG5cbi8qKlxuICogRGF0YSBzb3VyY2UgZXZlbnQgdHJpZ2dlcnMgbWFwLlxuICogVGhlIHByb3BlcnRpZXMgcmVwcmVzZW50IHRoZSB0cmlnZ2VyIG5hbWUva2V5IGFuZCB0aGUgdmFsdWUgcmVwcmVzZW50IHRoZSBldmVudCBpbnB1dCBpbiBpdCdzIHJhdyBmb3JtLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibERhdGFTb3VyY2VUcmlnZ2VyczxUID0gYW55PiBleHRlbmRzIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycyB7XG4gIC8qKlxuICAgKiBSZXByZXNlbnRzIGlucHV0IGZyb20gYHJlZnJlc2hgIGVtaXNzaW9ucy4gVCBkb2VzIG5vdCBuZWNlc3NhcmlseSByZXByZXNlbnRzIHRoZSB0eXBlIG9mIHRoZSBkYXRhc291cmNlLlxuICAgKi9cbiAgZGF0YT86IFJlZnJlc2hEYXRhV3JhcHBlcjxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFQgPSBhbnk+IHtcbiAgZmlsdGVyPzogRGF0YVNvdXJjZUZpbHRlcjtcbiAgc29ydD86IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2U7XG4gIHBhZ2luYXRpb24/OiB7XG4gICAgcGFnZT86IGFueTtcbiAgICBwZXJQYWdlPzogbnVtYmVyO1xuICB9XG4gIGRhdGE/OiBSZWZyZXNoRGF0YVdyYXBwZXI8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8VD4ge1xuICBjaGFuZ2VkOiBib29sZWFuO1xuICBwcmV2OiBUO1xuICBjdXJyPzogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxUID0gYW55PiB7XG4gIGZpbHRlcjogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8RGF0YVNvdXJjZUZpbHRlcj47XG4gIHNvcnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2U+O1xuICBwYWdpbmF0aW9uOiB7XG4gICAgY2hhbmdlZDogYm9vbGVhbjtcbiAgICBwYWdlOiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxhbnk+O1xuICAgIHBlclBhZ2U6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPG51bWJlcj47XG4gIH1cbiAgZGF0YTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8VD47XG5cblxuICAvKipcbiAgICogV2hlbiB0cnVlIHRoaXMgaXMgdGhlIGZpcnN0IGVtaXNzaW9uIG9mIGRhdGEgc2luY2UgdGhlIGxhc3QgY29ubmVjdGlvbi5cbiAgICovXG4gIGlzSW5pdGlhbDogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2V0IHRoZSB0b3RhbCBhbW91bnQgb2YgZGF0YSBpdGVtcy5cbiAgICogRm9yIHVzZSB3aXRoIHRoZSBwYWdpbmF0b3IsIHVwZGF0ZSB0aGUgdG90YWwgbGVuZ3RoIG9mIGRhdGEgaXRlbXMgdGhhdCB0aGUgY3VycmVudCByZXR1cm5lZCBzb3VyY2UgaXMgcGFydCBvZi5cbiAgICpcbiAgICogVXNlIHdoZW4gY3VzdG9tIHRyaWdnZXIgZm9yIHBhZ2luYXRpb24gaXMgZW5hYmxlZCAoc2VydmVyIHNpZGUgbW9kZSwgaW4gY2xpZW50IHNpZGUgbW9kZSB0aGUgbGVuZ3RoIGlzIGF1dG9tYXRpY2FsbHkgc2V0KVxuICAgKi9cbiAgdXBkYXRlVG90YWxMZW5ndGgodG90YWxMZW5ndGg6IG51bWJlcik6IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIFRyaWdnZXJDaGFuZ2VkRXZlbnRSZXNwb25zZTxUID0gYW55LCBURGF0ZSA9IGFueT4gPSB7IGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxURGF0ZT47IGRhdGE6IFRbXSB9O1xuXG5leHBvcnQgdHlwZSBUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yPFAgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPiA9IFAgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCA/IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50W1BdIDogIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGVbUF0+O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibERhdGFTb3VyY2VBZGFwdGVyUHJvY2Vzc2VkUmVzdWx0PFQgPSBhbnksIFREYXRhID0gYW55PiAge1xuICBldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGE+O1xuICBkYXRhOiBUW107XG4gIHNvcnRlZD86IFRbXTtcbiAgZmlsdGVyZWQ/OiBUW107XG59XG4iXX0=