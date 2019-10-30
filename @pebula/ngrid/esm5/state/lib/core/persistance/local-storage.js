/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridLocalStoragePersistAdapter = /** @class */ (function () {
    function PblNgridLocalStoragePersistAdapter() {
    }
    /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.save = /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    function (id, state) {
        try {
            /** @type {?} */
            var store = this.loadGlobalStateStore();
            store[id] = state;
            if (!state.__metadata__) {
                state.__metadata__ = (/** @type {?} */ ({}));
            }
            state.__metadata__.updatedAt = new Date().toISOString();
            this.saveGlobalStateStore(store);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.load = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return Promise.resolve(this.loadGlobalStateStore()[id] || (/** @type {?} */ ({})));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.exists = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var store = this.loadGlobalStateStore() || {};
        return Promise.resolve(id in store);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.loadGlobalStateStore = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var raw = localStorage.getItem(PblNgridLocalStoragePersistAdapter.globalStateKey);
        return raw ? JSON.parse(raw) : {};
    };
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    PblNgridLocalStoragePersistAdapter.prototype.saveGlobalStateStore = /**
     * @private
     * @param {?} store
     * @return {?}
     */
    function (store) {
        localStorage.setItem(PblNgridLocalStoragePersistAdapter.globalStateKey, JSON.stringify(store));
    };
    PblNgridLocalStoragePersistAdapter.globalStateKey = 'pebulaNgridState';
    return PblNgridLocalStoragePersistAdapter;
}());
export { PblNgridLocalStoragePersistAdapter };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridLocalStoragePersistAdapter.globalStateKey;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9wZXJzaXN0YW5jZS9sb2NhbC1zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtJQUFBO0lBb0NBLENBQUM7Ozs7OztJQWpDQyxpREFBSTs7Ozs7SUFBSixVQUFLLEVBQVUsRUFBRSxLQUEwQjtRQUN6QyxJQUFJOztnQkFDSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3pDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUssQ0FBQyxZQUFZLEdBQUcsbUJBQUEsRUFBRSxFQUFPLENBQUM7YUFDaEM7WUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRXhELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpREFBSTs7OztJQUFKLFVBQUssRUFBVTtRQUNiLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxtQkFBQSxFQUFFLEVBQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBRUQsbURBQU07Ozs7SUFBTixVQUFPLEVBQVU7O1lBQ1QsS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUU7UUFDL0MsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVPLGlFQUFvQjs7OztJQUE1Qjs7WUFDUSxHQUFHLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxjQUFjLENBQUM7UUFDbkYsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFTyxpRUFBb0I7Ozs7O0lBQTVCLFVBQTZCLEtBQTRDO1FBQ3ZFLFlBQVksQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBbENjLGlEQUFjLEdBQVcsa0JBQWtCLENBQUM7SUFtQzdELHlDQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FwQ1ksa0NBQWtDOzs7Ozs7SUFDN0Msa0RBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRHbG9iYWxTdGF0ZSwgUGJsTmdyaWRQZXJzaXN0QWRhcHRlciB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyIGltcGxlbWVudHMgUGJsTmdyaWRQZXJzaXN0QWRhcHRlciB7XG4gIHByaXZhdGUgc3RhdGljIGdsb2JhbFN0YXRlS2V5OiBzdHJpbmcgPSAncGVidWxhTmdyaWRTdGF0ZSc7XG5cbiAgc2F2ZShpZDogc3RyaW5nLCBzdGF0ZTogUGJsTmdyaWRHbG9iYWxTdGF0ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZSA9IHRoaXMubG9hZEdsb2JhbFN0YXRlU3RvcmUoKTtcbiAgICAgIHN0b3JlW2lkXSA9IHN0YXRlO1xuICAgICAgaWYgKCFzdGF0ZS5fX21ldGFkYXRhX18pIHtcbiAgICAgICAgc3RhdGUuX19tZXRhZGF0YV9fID0ge30gYXMgYW55O1xuICAgICAgfVxuICAgICAgc3RhdGUuX19tZXRhZGF0YV9fLnVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgdGhpcy5zYXZlR2xvYmFsU3RhdGVTdG9yZShzdG9yZSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG4gIH1cblxuICBsb2FkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFBibE5ncmlkR2xvYmFsU3RhdGU+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMubG9hZEdsb2JhbFN0YXRlU3RvcmUoKVtpZF0gfHwge30gYXMgYW55KTtcbiAgfVxuXG4gIGV4aXN0cyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLmxvYWRHbG9iYWxTdGF0ZVN0b3JlKCkgfHwge307XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpZCBpbiBzdG9yZSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRHbG9iYWxTdGF0ZVN0b3JlKCk6IHsgW2lkOiBzdHJpbmddOiBQYmxOZ3JpZEdsb2JhbFN0YXRlIH0ge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBibE5ncmlkTG9jYWxTdG9yYWdlUGVyc2lzdEFkYXB0ZXIuZ2xvYmFsU3RhdGVLZXkpO1xuICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgOiB7fTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUdsb2JhbFN0YXRlU3RvcmUoc3RvcmU6IHsgW2lkOiBzdHJpbmddOiBQYmxOZ3JpZEdsb2JhbFN0YXRlIH0pOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyLmdsb2JhbFN0YXRlS2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZSkpO1xuICB9XG59XG4iXX0=