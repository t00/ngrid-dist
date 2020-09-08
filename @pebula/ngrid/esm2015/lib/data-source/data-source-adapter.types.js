/**
 * @fileoverview added by tsickle
 * Generated from: lib/data-source/data-source-adapter.types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBVUEsdURBSUM7OztJQUhDLG1EQUEwQjs7SUFDMUIsaURBQW9DOztJQUNwQyx1REFBcUM7Ozs7Ozs7O0FBT3ZDLDJDQUtDOzs7Ozs7SUFEQyxxQ0FBNkI7Ozs7OztBQUcvQiwrQ0FRQzs7O0lBUEMsMkNBQTBCOztJQUMxQix5Q0FBb0M7O0lBQ3BDLCtDQUdDOztJQUNELHlDQUE2Qjs7Ozs7O0FBRy9CLGdEQUlDOzs7SUFIQyw2Q0FBaUI7O0lBQ2pCLDBDQUFROztJQUNSLDBDQUFTOzs7Ozs7QUFHWCxzREF1QkM7OztJQXRCQyxrREFBcUQ7O0lBQ3JELGdEQUErRDs7SUFDL0Qsc0RBSUM7O0lBQ0QsZ0RBQW9DOzs7OztJQU1wQyxxREFBbUI7Ozs7Ozs7OztJQVFuQiwwRkFBNkM7Ozs7OztBQU8vQyx5REFLQzs7O0lBSkMsb0RBQStDOztJQUMvQyxtREFBVTs7SUFDVixxREFBYTs7SUFDYix1REFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50IH0gZnJvbSAnLi4vcGFnaW5hdG9yJztcbmltcG9ydCB7IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UsIERhdGFTb3VyY2VGaWx0ZXIgfSBmcm9tICcuL3R5cGVzJztcblxuLyoqIEBpbnRlcm5hbCAqL1xuZXhwb3J0IHR5cGUgUmVmcmVzaERhdGFXcmFwcGVyPFQ+ID0geyBkYXRhOiBUIH07XG5cbi8qKlxuICogRGF0YSBzb3VyY2UgZXZlbnQgdHJpZ2dlcnMgbWFwIHdpdGggdHJpZ2dlcnMgdGhhdCB0aGUgdXNlciBjYW4gb3B0IGluIGEgY3VzdG9tIGJlaGF2aW91ci5cbiAqIFRoZSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB0aGUgdHJpZ2dlciBuYW1lL2tleSBhbmQgdGhlIHZhbHVlIHJlcHJlc2VudCB0aGUgZXZlbnQgaW5wdXQgaW4gaXQncyByYXcgZm9ybS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnMge1xuICBmaWx0ZXI/OiBEYXRhU291cmNlRmlsdGVyO1xuICBzb3J0PzogUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZTtcbiAgcGFnaW5hdGlvbj86IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50O1xufVxuXG4vKipcbiAqIERhdGEgc291cmNlIGV2ZW50IHRyaWdnZXJzIG1hcC5cbiAqIFRoZSBwcm9wZXJ0aWVzIHJlcHJlc2VudCB0aGUgdHJpZ2dlciBuYW1lL2tleSBhbmQgdGhlIHZhbHVlIHJlcHJlc2VudCB0aGUgZXZlbnQgaW5wdXQgaW4gaXQncyByYXcgZm9ybS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxEYXRhU291cmNlVHJpZ2dlcnM8VCA9IGFueT4gZXh0ZW5kcyBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnMge1xuICAvKipcbiAgICogUmVwcmVzZW50cyBpbnB1dCBmcm9tIGByZWZyZXNoYCBlbWlzc2lvbnMuIFQgZG9lcyBub3QgbmVjZXNzYXJpbHkgcmVwcmVzZW50cyB0aGUgdHlwZSBvZiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGRhdGE/OiBSZWZyZXNoRGF0YVdyYXBwZXI8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZTxUID0gYW55PiB7XG4gIGZpbHRlcj86IERhdGFTb3VyY2VGaWx0ZXI7XG4gIHNvcnQ/OiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlO1xuICBwYWdpbmF0aW9uPzoge1xuICAgIHBhZ2U/OiBhbnk7XG4gICAgcGVyUGFnZT86IG51bWJlcjtcbiAgfVxuICBkYXRhPzogUmVmcmVzaERhdGFXcmFwcGVyPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFQ+IHtcbiAgY2hhbmdlZDogYm9vbGVhbjtcbiAgcHJldjogVDtcbiAgY3Vycj86IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VCA9IGFueT4ge1xuICBmaWx0ZXI6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPERhdGFTb3VyY2VGaWx0ZXI+O1xuICBzb3J0OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlPjtcbiAgcGFnaW5hdGlvbjoge1xuICAgIGNoYW5nZWQ6IGJvb2xlYW47XG4gICAgcGFnZTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2U8YW55PjtcbiAgICBwZXJQYWdlOiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxudW1iZXI+O1xuICB9XG4gIGRhdGE6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlPFQ+O1xuXG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB0aGlzIGlzIHRoZSBmaXJzdCBlbWlzc2lvbiBvZiBkYXRhIHNpbmNlIHRoZSBsYXN0IGNvbm5lY3Rpb24uXG4gICAqL1xuICBpc0luaXRpYWw6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdG90YWwgYW1vdW50IG9mIGRhdGEgaXRlbXMuXG4gICAqIEZvciB1c2Ugd2l0aCB0aGUgcGFnaW5hdG9yLCB1cGRhdGUgdGhlIHRvdGFsIGxlbmd0aCBvZiBkYXRhIGl0ZW1zIHRoYXQgdGhlIGN1cnJlbnQgcmV0dXJuZWQgc291cmNlIGlzIHBhcnQgb2YuXG4gICAqXG4gICAqIFVzZSB3aGVuIGN1c3RvbSB0cmlnZ2VyIGZvciBwYWdpbmF0aW9uIGlzIGVuYWJsZWQgKHNlcnZlciBzaWRlIG1vZGUsIGluIGNsaWVudCBzaWRlIG1vZGUgdGhlIGxlbmd0aCBpcyBhdXRvbWF0aWNhbGx5IHNldClcbiAgICovXG4gIHVwZGF0ZVRvdGFsTGVuZ3RoKHRvdGFsTGVuZ3RoOiBudW1iZXIpOiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBUcmlnZ2VyQ2hhbmdlZEV2ZW50UmVzcG9uc2U8VCA9IGFueSwgVERhdGUgPSBhbnk+ID0geyBldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGU+OyBkYXRhOiBUW10gfTtcblxuZXhwb3J0IHR5cGUgVHJpZ2dlckNoYW5nZWRFdmVudEZvcjxQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4gPSBQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQgPyBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudFtQXSA6ICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZTxQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlW1BdPjtcblxuZXhwb3J0IGludGVyZmFjZSBQYmxEYXRhU291cmNlQWRhcHRlclByb2Nlc3NlZFJlc3VsdDxUID0gYW55LCBURGF0YSA9IGFueT4gIHtcbiAgZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPjtcbiAgZGF0YTogVFtdO1xuICBzb3J0ZWQ/OiBUW107XG4gIGZpbHRlcmVkPzogVFtdO1xufVxuIl19