/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class PblDataSourceFactory {
    constructor() {
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
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    onTrigger(handler) {
        (/** @type {?} */ (this))._adapter.onTrigger = handler;
        return (/** @type {?} */ (this));
    }
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
    setCustomTriggers(...triggers) {
        if (triggers.length === 0) {
            (/** @type {?} */ (this))._adapter.customTriggers = false;
        }
        else {
            /** @type {?} */
            const customTriggers = (/** @type {?} */ (this))._adapter.customTriggers = {};
            for (const t of triggers) {
                customTriggers[t] = true;
            }
        }
        return (/** @type {?} */ (this));
    }
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    skipInitialTrigger() {
        (/** @type {?} */ (this))._dsOptions.skipInitial = true;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @return {THIS}
     */
    keepAlive() {
        (/** @type {?} */ (this))._dsOptions.keepAlive = true;
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} handler
     * @return {THIS}
     */
    onCreated(handler) {
        (/** @type {?} */ (this))._onCreated = handler;
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    create() {
        /** @type {?} */
        const _adapter = this._adapter;
        /** @type {?} */
        const adapter = new PblDataSourceAdapter(_adapter.onTrigger, _adapter.customTriggers || false);
        /** @type {?} */
        const ds = new PblDataSource(adapter, this._dsOptions);
        if (this._onCreated) {
            this._onCreated(ds);
        }
        return ds;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2UvZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTTdELDRCQUdDOzs7SUFGQyxrQ0FBbUY7O0lBQ25GLHVDQUEyRjs7Ozs7QUFHN0YsTUFBTSxPQUFPLG9CQUFvQjtJQUFqQztRQUNVLGFBQVEsR0FBcUIsRUFBRyxDQUFDO1FBQ2pDLGVBQVUsR0FBeUIsRUFBRyxDQUFDO0lBNkVqRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBekRDLFNBQVMsQ0FBQyxPQUFzRjtRQUM5RixtQkFBQSxJQUFJLEVBQUEsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztRQUNsQyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7Ozs7Ozs7O0lBU0QsaUJBQWlCLENBQUMsR0FBRyxRQUF3RDtRQUMzRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLG1CQUFBLElBQUksRUFBQSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQ3RDO2FBQU07O2tCQUNDLGNBQWMsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxRQUFRLENBQUMsY0FBYyxHQUFHLEVBQUU7WUFDeEQsS0FBSyxNQUFNLENBQUMsSUFBSSxRQUFRLEVBQUU7Z0JBQ3hCLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7YUFDMUI7U0FDRjtRQUNELE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7Ozs7O0lBUUQsa0JBQWtCO1FBQ2hCLG1CQUFBLElBQUksRUFBQSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25DLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7SUFFRCxTQUFTO1FBQ1AsbUJBQUEsSUFBSSxFQUFBLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakMsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBc0Q7UUFDOUQsbUJBQUEsSUFBSSxFQUFBLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQztRQUMxQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELE1BQU07O2NBQ0UsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFROztjQUN4QixPQUFPLEdBQUcsSUFBSSxvQkFBb0IsQ0FDdEMsUUFBUSxDQUFDLFNBQVMsRUFDbEIsUUFBUSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQ2pDOztjQUNLLEVBQUUsR0FBRyxJQUFJLGFBQWEsQ0FBVyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztDQUNGOzs7Ozs7SUE5RUMsd0NBQXlDOzs7OztJQUN6QywwQ0FBK0M7Ozs7O0lBQy9DLDBDQUFrRTs7Ozs7O0FBOEVwRSxNQUFNLFVBQVUsUUFBUTtJQUN0QixPQUFPLElBQUksb0JBQW9CLEVBQVksQ0FBQztBQUM5QyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsRGF0YVNvdXJjZSwgRGF0YVNvdXJjZU9mLCBQYmxEYXRhU291cmNlT3B0aW9ucyB9IGZyb20gJy4vZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgUGJsRGF0YVNvdXJjZUFkYXB0ZXIgfSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXInO1xuaW1wb3J0IHtcbiAgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCxcbiB9IGZyb20gJy4vZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcyc7XG5cbmludGVyZmFjZSBBZGFwdGVyUGFyYW1zPFQ+IHtcbiAgb25UcmlnZ2VyPzogKGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCkgPT4gKGZhbHNlIHwgRGF0YVNvdXJjZU9mPFQ+KTtcbiAgY3VzdG9tVHJpZ2dlcnM/OiBmYWxzZSB8IFBhcnRpYWw8UmVjb3JkPGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycywgYm9vbGVhbj4+O1xufVxuXG5leHBvcnQgY2xhc3MgUGJsRGF0YVNvdXJjZUZhY3Rvcnk8VCwgVERhdGEgPSBhbnk+IHtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogQWRhcHRlclBhcmFtczxUPiA9IHsgfTtcbiAgcHJpdmF0ZSBfZHNPcHRpb25zOiBQYmxEYXRhU291cmNlT3B0aW9ucyA9IHsgfTtcbiAgcHJpdmF0ZSBfb25DcmVhdGVkOiAoZGF0YVNvdXJjZTogUGJsRGF0YVNvdXJjZTxULCBURGF0YT4pID0+IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgbWFpbiB0cmlnZ2VyIGhhbmRsZXIuXG4gICAqIFRoZSB0cmlnZ2VyIGhhbmRsZXIgaXMgdGhlIGNvcmUgb2YgdGhlIGRhdGFzb3VyY2UsIHJlc3BvbnNpYmxlIGZvciByZXR1cm5pbmcgdGhlIGRhdGEgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQnkgZGVmYXVsdCB0aGUgaGFuZGxlciBpcyB0cmlnZ2VyZWQgb25seSB3aGVuIHRoZSBkYXRhc291cmNlIGlzIHJlcXVpcmVkLlxuICAgKiBUaGlzIGNhbiBoYXBwZW5lZCB3aGVuOlxuICAgKiAgIC0gVGhlIHRhYmxlIGNvbm5lY3RlZCB0byB0aGUgZGF0YXNvdXJjZS5cbiAgICogICAtIEEgbWFudWFsIGNhbGwgdG8gYFBibERhdGFTb3VyY2UucmVmcmVzaCgpYCB3YXMgaW52b2tlZC5cbiAgICpcbiAgICogVGhlcmUgYXJlIGFkZGl0aW9uYWwgdHJpZ2dlcnMgKGZpbHRlci9zb3J0L3BhZ2luYXRpb24pIHdoaWNoIG9jY3VyIHdoZW4gdGhlaXIgdmFsdWVzIGNoYW5nZSwgZS5nLiB3aGVuXG4gICAqIGEgZmlsdGVyIGhhcyBjaGFuZ2Ugb3Igd2hlbiBhIHBhZ2UgaW4gdGhlIHBhZ2luYXRvciB3YXMgY2hhbmdlZC5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhlc2UgdHJpZ2dlcnMgYXJlIGhhbmRsZWQgYXV0b21hdGljYWxseSwgcmVzdWx0aW5nIGluIGEgY2xpZW50LXNpZGUgYmVoYXZpb3IgZm9yIGVhY2ggb2YgdGhlbS5cbiAgICogRm9yIGV4YW1wbGUsIGEgY2xpZW50IHNpZGUgcGFnaW5hdG9yIHdpbGwgbW92ZSB0byB0aGUgbmV4dCBwYWdlIGJhc2VkIG9uIGFuIGFscmVhZHkgZXhpc3RpbmcgZGF0YSBjb2xsZWN0aW9uIChubyBuZWVkIHRvIGZldGNoIGZyb20gdGhlIHNlcnZlcikuXG4gICAqXG4gICAqIFRvIGhhbmRsZSBhZGRpdGlvbmFsIHRyaWdnZXIgeW91IG5lZWQgdG8gZXhwbGljaXRseSBzZXQgdGhlbSB1c2luZyBgc2V0Q3VzdG9tVHJpZ2dlcnNgLlxuICAgKi9cbiAgb25UcmlnZ2VyKGhhbmRsZXI6IChldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGE+KSA9PiAoZmFsc2UgfCBEYXRhU291cmNlT2Y8VD4pKTogdGhpcyB7XG4gICAgdGhpcy5fYWRhcHRlci5vblRyaWdnZXIgPSBoYW5kbGVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiB0cmlnZ2VycyB0aGF0IHdpbGwgYmUgaGFuZGxlZCBieSB0aGUgdHJpZ2dlciBoYW5kbGVyLlxuICAgKiBCeSBkZWZhdWx0IGFsbCB0cmlnZ2VycyBhcmUgaGFuZGxlZCBieSB0aGUgYWRhcHRlciwgcmVzdWx0aW5nIGluIGEgY2xpZW50LXNpZGUgZmlsdGVyL3NvcnQvcGFnaWFudGlvbiB0aGF0IHdvcmtzIG91dCBvZiB0aGUgYm94LlxuICAgKiBUbyBpbXBsZW1lbnQgc2VydmVyIHNpZGUgZmlsdGVyaW5nLCBzb3J0aW5nIGFuZC9vciBwYWdpbmF0aW9uIHNwZWNpZnkgd2hpY2ggc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhlIG9uIHRyaWdnZXIgaGFuZGxlci5cbiAgICpcbiAgICogWW91IGNhbiBtaXggYW5kIG1hdGNoLCBlLmcuIHN1cHBvcnQgb25seSBwYWdpbmcgZnJvbSB0aGUgc2VydmVyLCBvciBvbmx5IHBhZ2luZyBhbmQgc29ydGluZywgYW5kIGxlYXZlIGZpbHRlcmluZyBmb3IgdGhlIGNsaWVudCBzaWRlLlxuICAgKi9cbiAgc2V0Q3VzdG9tVHJpZ2dlcnMoLi4udHJpZ2dlcnM6IEFycmF5PGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2Vycz4pOiB0aGlzIHtcbiAgICBpZiAodHJpZ2dlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9hZGFwdGVyLmN1c3RvbVRyaWdnZXJzID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGN1c3RvbVRyaWdnZXJzID0gdGhpcy5fYWRhcHRlci5jdXN0b21UcmlnZ2VycyA9IHt9O1xuICAgICAgZm9yIChjb25zdCB0IG9mIHRyaWdnZXJzKSB7XG4gICAgICAgIGN1c3RvbVRyaWdnZXJzW3RdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2tpcCB0aGUgZmlyc3QgdHJpZ2dlciBlbWlzc2lvbi5cbiAgICogVXNlIHRoaXMgZm9yIGxhdGUgYmluZGluZywgdXN1YWxseSB3aXRoIGEgY2FsbCB0byByZWZyZXNoKCkgb24gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgb25seSB0aGUgaW50ZXJuYWwgdHJpZ2dlciBjYWxsIGlzIHNraXBwZWQsIGEgY3VzdG9tIGNhbGxzIHRvIHJlZnJlc2ggd2lsbCBnbyB0aHJvdWdoXG4gICAqL1xuICBza2lwSW5pdGlhbFRyaWdnZXIoKTogdGhpcyB7XG4gICAgdGhpcy5fZHNPcHRpb25zLnNraXBJbml0aWFsID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGtlZXBBbGl2ZSgpOiB0aGlzIHtcbiAgICB0aGlzLl9kc09wdGlvbnMua2VlcEFsaXZlID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIG9uQ3JlYXRlZChoYW5kbGVyOiAoZGF0YVNvdXJjZTogUGJsRGF0YVNvdXJjZTxULCBURGF0YT4pID0+IHZvaWQgKTogdGhpcyB7XG4gICAgdGhpcy5fb25DcmVhdGVkID0gaGFuZGxlcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNyZWF0ZSgpOiBQYmxEYXRhU291cmNlPFQsIFREYXRhPiB7XG4gICAgY29uc3QgX2FkYXB0ZXIgPSB0aGlzLl9hZGFwdGVyO1xuICAgIGNvbnN0IGFkYXB0ZXIgPSBuZXcgUGJsRGF0YVNvdXJjZUFkYXB0ZXI8VCwgVERhdGE+KFxuICAgICAgX2FkYXB0ZXIub25UcmlnZ2VyLFxuICAgICAgX2FkYXB0ZXIuY3VzdG9tVHJpZ2dlcnMgfHwgZmFsc2UsXG4gICAgKVxuICAgIGNvbnN0IGRzID0gbmV3IFBibERhdGFTb3VyY2U8VCwgVERhdGE+KGFkYXB0ZXIsIHRoaXMuX2RzT3B0aW9ucyk7XG4gICAgaWYgKHRoaXMuX29uQ3JlYXRlZCkge1xuICAgICAgdGhpcy5fb25DcmVhdGVkKGRzKTtcbiAgICB9XG4gICAgcmV0dXJuIGRzO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEUzxULCBURGF0YSA9IFRbXT4oKTogUGJsRGF0YVNvdXJjZUZhY3Rvcnk8VCwgVERhdGE+IHtcbiAgcmV0dXJuIG5ldyBQYmxEYXRhU291cmNlRmFjdG9yeTxULCBURGF0YT4oKTtcbn1cbiJdfQ==