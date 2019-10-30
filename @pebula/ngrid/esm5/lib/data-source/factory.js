/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblDataSource } from './data-source';
import { PblDataSourceAdapter } from './data-source-adapter';
/**
 * @record
 * @template T
 */
function AdapterParams() { }
if (false) {
    /** @type {?|undefined} */
    AdapterParams.prototype.onTrigger;
    /** @type {?|undefined} */
    AdapterParams.prototype.customTriggers;
}
/**
 * @template T, TData
 */
var /**
 * @template T, TData
 */
PblDataSourceFactory = /** @class */ (function () {
    function PblDataSourceFactory() {
        this._adapter = {};
        this._dsOptions = {};
    }
    /**
     * Set the main trigger handler.
     * The trigger handler is the core of the datasource, responsible for returning the data collection.
     *
     * By default the handler is triggered only when the datasource is required.
     * This can happened when:
     *   - The table connected to the datasource.
     *   - A manual call to `PblDataSource.refresh()` was invoked.
     *
     * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
     * a filter has change or when a page in the paginator was changed.
     *
     * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
     * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
     *
     * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
     */
    /**
     * Set the main trigger handler.
     * The trigger handler is the core of the datasource, responsible for returning the data collection.
     *
     * By default the handler is triggered only when the datasource is required.
     * This can happened when:
     *   - The table connected to the datasource.
     *   - A manual call to `PblDataSource.refresh()` was invoked.
     *
     * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
     * a filter has change or when a page in the paginator was changed.
     *
     * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
     * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
     *
     * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    PblDataSourceFactory.prototype.onTrigger = /**
     * Set the main trigger handler.
     * The trigger handler is the core of the datasource, responsible for returning the data collection.
     *
     * By default the handler is triggered only when the datasource is required.
     * This can happened when:
     *   - The table connected to the datasource.
     *   - A manual call to `PblDataSource.refresh()` was invoked.
     *
     * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
     * a filter has change or when a page in the paginator was changed.
     *
     * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
     * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
     *
     * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    function (handler) {
        (/** @type {?} */ (this))._adapter.onTrigger = handler;
        return (/** @type {?} */ (this));
    };
    /**
     * A list of triggers that will be handled by the trigger handler.
     * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
     * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
     *
     * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
     */
    /**
     * A list of triggers that will be handled by the trigger handler.
     * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
     * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
     *
     * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
     * @template THIS
     * @this {THIS}
     * @param {...?} triggers
     * @return {THIS}
     */
    PblDataSourceFactory.prototype.setCustomTriggers = /**
     * A list of triggers that will be handled by the trigger handler.
     * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
     * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
     *
     * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
     * @template THIS
     * @this {THIS}
     * @param {...?} triggers
     * @return {THIS}
     */
    function () {
        var e_1, _a;
        var triggers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            triggers[_i] = arguments[_i];
        }
        if (triggers.length === 0) {
            (/** @type {?} */ (this))._adapter.customTriggers = false;
        }
        else {
            /** @type {?} */
            var customTriggers = (/** @type {?} */ (this))._adapter.customTriggers = {};
            try {
                for (var triggers_1 = tslib_1.__values(triggers), triggers_1_1 = triggers_1.next(); !triggers_1_1.done; triggers_1_1 = triggers_1.next()) {
                    var t = triggers_1_1.value;
                    customTriggers[t] = true;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (triggers_1_1 && !triggers_1_1.done && (_a = triggers_1.return)) _a.call(triggers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return (/** @type {?} */ (this));
    };
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     */
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    PblDataSourceFactory.prototype.skipInitialTrigger = /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    function () {
        (/** @type {?} */ (this))._dsOptions.skipInitial = true;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    PblDataSourceFactory.prototype.keepAlive = /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    function () {
        (/** @type {?} */ (this))._dsOptions.keepAlive = true;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    PblDataSourceFactory.prototype.onCreated = /**
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    function (handler) {
        (/** @type {?} */ (this))._onCreated = handler;
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    PblDataSourceFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var _adapter = this._adapter;
        /** @type {?} */
        var adapter = new PblDataSourceAdapter(_adapter.onTrigger, _adapter.customTriggers || false);
        /** @type {?} */
        var ds = new PblDataSource(adapter, this._dsOptions);
        if (this._onCreated) {
            this._onCreated(ds);
        }
        return ds;
    };
    return PblDataSourceFactory;
}());
/**
 * @template T, TData
 */
export { PblDataSourceFactory };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblDataSourceFactory.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceFactory.prototype._dsOptions;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceFactory.prototype._onCreated;
}
/**
 * @template T, TData
 * @return {?}
 */
export function createDS() {
    return new PblDataSourceFactory();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2UvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQXNDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7OztBQU03RCw0QkFHQzs7O0lBRkMsa0NBQW1GOztJQUNuRix1Q0FBMkY7Ozs7O0FBRzdGOzs7O0lBQUE7UUFDVSxhQUFRLEdBQXFCLEVBQUcsQ0FBQztRQUNqQyxlQUFVLEdBQXlCLEVBQUcsQ0FBQztJQTZFakQsQ0FBQztJQTFFQzs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNILHdDQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBVCxVQUFVLE9BQXNGO1FBQzlGLG1CQUFBLElBQUksRUFBQSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ2xDLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7OztPQU1HOzs7Ozs7Ozs7Ozs7SUFDSCxnREFBaUI7Ozs7Ozs7Ozs7O0lBQWpCOztRQUFrQixrQkFBMkQ7YUFBM0QsVUFBMkQsRUFBM0QscUJBQTJELEVBQTNELElBQTJEO1lBQTNELDZCQUEyRDs7UUFDM0UsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN6QixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUN0QzthQUFNOztnQkFDQyxjQUFjLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxFQUFFOztnQkFDeEQsS0FBZ0IsSUFBQSxhQUFBLGlCQUFBLFFBQVEsQ0FBQSxrQ0FBQSx3REFBRTtvQkFBckIsSUFBTSxDQUFDLHFCQUFBO29CQUNWLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQzFCOzs7Ozs7Ozs7U0FDRjtRQUNELE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7Ozs7SUFDSCxpREFBa0I7Ozs7Ozs7OztJQUFsQjtRQUNFLG1CQUFBLElBQUksRUFBQSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25DLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFRCx3Q0FBUzs7Ozs7SUFBVDtRQUNFLG1CQUFBLElBQUksRUFBQSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBRUQsd0NBQVM7Ozs7OztJQUFULFVBQVUsT0FBc0Q7UUFDOUQsbUJBQUEsSUFBSSxFQUFBLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELHFDQUFNOzs7SUFBTjs7WUFDUSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7O1lBQ3hCLE9BQU8sR0FBRyxJQUFJLG9CQUFvQixDQUN0QyxRQUFRLENBQUMsU0FBUyxFQUNsQixRQUFRLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FDakM7O1lBQ0ssRUFBRSxHQUFHLElBQUksYUFBYSxDQUFXLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBL0VELElBK0VDOzs7Ozs7Ozs7O0lBOUVDLHdDQUF5Qzs7Ozs7SUFDekMsMENBQStDOzs7OztJQUMvQywwQ0FBa0U7Ozs7OztBQThFcEUsTUFBTSxVQUFVLFFBQVE7SUFDdEIsT0FBTyxJQUFJLG9CQUFvQixFQUFZLENBQUM7QUFDOUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibERhdGFTb3VyY2UsIERhdGFTb3VyY2VPZiwgUGJsRGF0YVNvdXJjZU9wdGlvbnMgfSBmcm9tICcuL2RhdGEtc291cmNlJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2VBZGFwdGVyIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS1hZGFwdGVyJztcbmltcG9ydCB7XG4gIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycyxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQsXG4gfSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXIudHlwZXMnO1xuXG5pbnRlcmZhY2UgQWRhcHRlclBhcmFtczxUPiB7XG4gIG9uVHJpZ2dlcj86IChldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQpID0+IChmYWxzZSB8IERhdGFTb3VyY2VPZjxUPik7XG4gIGN1c3RvbVRyaWdnZXJzPzogZmFsc2UgfCBQYXJ0aWFsPFJlY29yZDxrZXlvZiBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnMsIGJvb2xlYW4+Pjtcbn1cblxuZXhwb3J0IGNsYXNzIFBibERhdGFTb3VyY2VGYWN0b3J5PFQsIFREYXRhID0gYW55PiB7XG4gIHByaXZhdGUgX2FkYXB0ZXI6IEFkYXB0ZXJQYXJhbXM8VD4gPSB7IH07XG4gIHByaXZhdGUgX2RzT3B0aW9uczogUGJsRGF0YVNvdXJjZU9wdGlvbnMgPSB7IH07XG4gIHByaXZhdGUgX29uQ3JlYXRlZDogKGRhdGFTb3VyY2U6IFBibERhdGFTb3VyY2U8VCwgVERhdGE+KSA9PiB2b2lkO1xuXG4gIC8qKlxuICAgKiBTZXQgdGhlIG1haW4gdHJpZ2dlciBoYW5kbGVyLlxuICAgKiBUaGUgdHJpZ2dlciBoYW5kbGVyIGlzIHRoZSBjb3JlIG9mIHRoZSBkYXRhc291cmNlLCByZXNwb25zaWJsZSBmb3IgcmV0dXJuaW5nIHRoZSBkYXRhIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQgdGhlIGhhbmRsZXIgaXMgdHJpZ2dlcmVkIG9ubHkgd2hlbiB0aGUgZGF0YXNvdXJjZSBpcyByZXF1aXJlZC5cbiAgICogVGhpcyBjYW4gaGFwcGVuZWQgd2hlbjpcbiAgICogICAtIFRoZSB0YWJsZSBjb25uZWN0ZWQgdG8gdGhlIGRhdGFzb3VyY2UuXG4gICAqICAgLSBBIG1hbnVhbCBjYWxsIHRvIGBQYmxEYXRhU291cmNlLnJlZnJlc2goKWAgd2FzIGludm9rZWQuXG4gICAqXG4gICAqIFRoZXJlIGFyZSBhZGRpdGlvbmFsIHRyaWdnZXJzIChmaWx0ZXIvc29ydC9wYWdpbmF0aW9uKSB3aGljaCBvY2N1ciB3aGVuIHRoZWlyIHZhbHVlcyBjaGFuZ2UsIGUuZy4gd2hlblxuICAgKiBhIGZpbHRlciBoYXMgY2hhbmdlIG9yIHdoZW4gYSBwYWdlIGluIHRoZSBwYWdpbmF0b3Igd2FzIGNoYW5nZWQuXG4gICAqXG4gICAqIEJ5IGRlZmF1bHQsIHRoZXNlIHRyaWdnZXJzIGFyZSBoYW5kbGVkIGF1dG9tYXRpY2FsbHksIHJlc3VsdGluZyBpbiBhIGNsaWVudC1zaWRlIGJlaGF2aW9yIGZvciBlYWNoIG9mIHRoZW0uXG4gICAqIEZvciBleGFtcGxlLCBhIGNsaWVudCBzaWRlIHBhZ2luYXRvciB3aWxsIG1vdmUgdG8gdGhlIG5leHQgcGFnZSBiYXNlZCBvbiBhbiBhbHJlYWR5IGV4aXN0aW5nIGRhdGEgY29sbGVjdGlvbiAobm8gbmVlZCB0byBmZXRjaCBmcm9tIHRoZSBzZXJ2ZXIpLlxuICAgKlxuICAgKiBUbyBoYW5kbGUgYWRkaXRpb25hbCB0cmlnZ2VyIHlvdSBuZWVkIHRvIGV4cGxpY2l0bHkgc2V0IHRoZW0gdXNpbmcgYHNldEN1c3RvbVRyaWdnZXJzYC5cbiAgICovXG4gIG9uVHJpZ2dlcihoYW5kbGVyOiAoZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPikgPT4gKGZhbHNlIHwgRGF0YVNvdXJjZU9mPFQ+KSk6IHRoaXMge1xuICAgIHRoaXMuX2FkYXB0ZXIub25UcmlnZ2VyID0gaGFuZGxlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGxpc3Qgb2YgdHJpZ2dlcnMgdGhhdCB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIHRyaWdnZXIgaGFuZGxlci5cbiAgICogQnkgZGVmYXVsdCBhbGwgdHJpZ2dlcnMgYXJlIGhhbmRsZWQgYnkgdGhlIGFkYXB0ZXIsIHJlc3VsdGluZyBpbiBhIGNsaWVudC1zaWRlIGZpbHRlci9zb3J0L3BhZ2lhbnRpb24gdGhhdCB3b3JrcyBvdXQgb2YgdGhlIGJveC5cbiAgICogVG8gaW1wbGVtZW50IHNlcnZlciBzaWRlIGZpbHRlcmluZywgc29ydGluZyBhbmQvb3IgcGFnaW5hdGlvbiBzcGVjaWZ5IHdoaWNoIHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoZSBvbiB0cmlnZ2VyIGhhbmRsZXIuXG4gICAqXG4gICAqIFlvdSBjYW4gbWl4IGFuZCBtYXRjaCwgZS5nLiBzdXBwb3J0IG9ubHkgcGFnaW5nIGZyb20gdGhlIHNlcnZlciwgb3Igb25seSBwYWdpbmcgYW5kIHNvcnRpbmcsIGFuZCBsZWF2ZSBmaWx0ZXJpbmcgZm9yIHRoZSBjbGllbnQgc2lkZS5cbiAgICovXG4gIHNldEN1c3RvbVRyaWdnZXJzKC4uLnRyaWdnZXJzOiBBcnJheTxrZXlvZiBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnM+KTogdGhpcyB7XG4gICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5fYWRhcHRlci5jdXN0b21UcmlnZ2VycyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXN0b21UcmlnZ2VycyA9IHRoaXMuX2FkYXB0ZXIuY3VzdG9tVHJpZ2dlcnMgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0cmlnZ2Vycykge1xuICAgICAgICBjdXN0b21UcmlnZ2Vyc1t0XSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNraXAgdGhlIGZpcnN0IHRyaWdnZXIgZW1pc3Npb24uXG4gICAqIFVzZSB0aGlzIGZvciBsYXRlIGJpbmRpbmcsIHVzdWFsbHkgd2l0aCBhIGNhbGwgdG8gcmVmcmVzaCgpIG9uIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogTm90ZSB0aGF0IG9ubHkgdGhlIGludGVybmFsIHRyaWdnZXIgY2FsbCBpcyBza2lwcGVkLCBhIGN1c3RvbSBjYWxscyB0byByZWZyZXNoIHdpbGwgZ28gdGhyb3VnaFxuICAgKi9cbiAgc2tpcEluaXRpYWxUcmlnZ2VyKCk6IHRoaXMge1xuICAgIHRoaXMuX2RzT3B0aW9ucy5za2lwSW5pdGlhbCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBrZWVwQWxpdmUoKTogdGhpcyB7XG4gICAgdGhpcy5fZHNPcHRpb25zLmtlZXBBbGl2ZSA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvbkNyZWF0ZWQoaGFuZGxlcjogKGRhdGFTb3VyY2U6IFBibERhdGFTb3VyY2U8VCwgVERhdGE+KSA9PiB2b2lkICk6IHRoaXMge1xuICAgIHRoaXMuX29uQ3JlYXRlZCA9IGhhbmRsZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjcmVhdGUoKTogUGJsRGF0YVNvdXJjZTxULCBURGF0YT4ge1xuICAgIGNvbnN0IF9hZGFwdGVyID0gdGhpcy5fYWRhcHRlcjtcbiAgICBjb25zdCBhZGFwdGVyID0gbmV3IFBibERhdGFTb3VyY2VBZGFwdGVyPFQsIFREYXRhPihcbiAgICAgIF9hZGFwdGVyLm9uVHJpZ2dlcixcbiAgICAgIF9hZGFwdGVyLmN1c3RvbVRyaWdnZXJzIHx8IGZhbHNlLFxuICAgIClcbiAgICBjb25zdCBkcyA9IG5ldyBQYmxEYXRhU291cmNlPFQsIFREYXRhPihhZGFwdGVyLCB0aGlzLl9kc09wdGlvbnMpO1xuICAgIGlmICh0aGlzLl9vbkNyZWF0ZWQpIHtcbiAgICAgIHRoaXMuX29uQ3JlYXRlZChkcyk7XG4gICAgfVxuICAgIHJldHVybiBkcztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRFM8VCwgVERhdGEgPSBUW10+KCk6IFBibERhdGFTb3VyY2VGYWN0b3J5PFQsIFREYXRhPiB7XG4gIHJldHVybiBuZXcgUGJsRGF0YVNvdXJjZUZhY3Rvcnk8VCwgVERhdGE+KCk7XG59XG4iXX0=