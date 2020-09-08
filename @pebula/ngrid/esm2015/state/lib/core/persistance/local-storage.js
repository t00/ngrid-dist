/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/persistance/local-storage.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class PblNgridLocalStoragePersistAdapter {
    /**
     * @param {?} id
     * @param {?} state
     * @return {?}
     */
    save(id, state) {
        try {
            /** @type {?} */
            const store = this.loadGlobalStateStore();
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
    }
    /**
     * @param {?} id
     * @return {?}
     */
    load(id) {
        return Promise.resolve(this.loadGlobalStateStore()[id] || (/** @type {?} */ ({})));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    exists(id) {
        /** @type {?} */
        const store = this.loadGlobalStateStore() || {};
        return Promise.resolve(id in store);
    }
    /**
     * @private
     * @return {?}
     */
    loadGlobalStateStore() {
        /** @type {?} */
        const raw = localStorage.getItem(PblNgridLocalStoragePersistAdapter.globalStateKey);
        return raw ? JSON.parse(raw) : {};
    }
    /**
     * @private
     * @param {?} store
     * @return {?}
     */
    saveGlobalStateStore(store) {
        localStorage.setItem(PblNgridLocalStoragePersistAdapter.globalStateKey, JSON.stringify(store));
    }
}
PblNgridLocalStoragePersistAdapter.globalStateKey = 'pebulaNgridState';
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridLocalStoragePersistAdapter.globalStateKey;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9wZXJzaXN0YW5jZS9sb2NhbC1zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsTUFBTSxPQUFPLGtDQUFrQzs7Ozs7O0lBRzdDLElBQUksQ0FBQyxFQUFVLEVBQUUsS0FBMEI7UUFDekMsSUFBSTs7a0JBQ0ksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUN6QyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUN2QixLQUFLLENBQUMsWUFBWSxHQUFHLG1CQUFBLEVBQUUsRUFBTyxDQUFDO2FBQ2hDO1lBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV4RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLEVBQVU7UUFDYixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksbUJBQUEsRUFBRSxFQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxFQUFVOztjQUNULEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFO1FBQy9DLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFTyxvQkFBb0I7O2NBQ3BCLEdBQUcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLGNBQWMsQ0FBQztRQUNuRixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVPLG9CQUFvQixDQUFDLEtBQTRDO1FBQ3ZFLFlBQVksQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDOztBQWxDYyxpREFBYyxHQUFXLGtCQUFrQixDQUFDOzs7Ozs7SUFBM0Qsa0RBQTJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRHbG9iYWxTdGF0ZSwgUGJsTmdyaWRQZXJzaXN0QWRhcHRlciB9IGZyb20gJy4uL21vZGVscy9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyIGltcGxlbWVudHMgUGJsTmdyaWRQZXJzaXN0QWRhcHRlciB7XG4gIHByaXZhdGUgc3RhdGljIGdsb2JhbFN0YXRlS2V5OiBzdHJpbmcgPSAncGVidWxhTmdyaWRTdGF0ZSc7XG5cbiAgc2F2ZShpZDogc3RyaW5nLCBzdGF0ZTogUGJsTmdyaWRHbG9iYWxTdGF0ZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdG9yZSA9IHRoaXMubG9hZEdsb2JhbFN0YXRlU3RvcmUoKTtcbiAgICAgIHN0b3JlW2lkXSA9IHN0YXRlO1xuICAgICAgaWYgKCFzdGF0ZS5fX21ldGFkYXRhX18pIHtcbiAgICAgICAgc3RhdGUuX19tZXRhZGF0YV9fID0ge30gYXMgYW55O1xuICAgICAgfVxuICAgICAgc3RhdGUuX19tZXRhZGF0YV9fLnVwZGF0ZWRBdCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcblxuICAgICAgdGhpcy5zYXZlR2xvYmFsU3RhdGVTdG9yZShzdG9yZSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICB9XG4gIH1cblxuICBsb2FkKGlkOiBzdHJpbmcpOiBQcm9taXNlPFBibE5ncmlkR2xvYmFsU3RhdGU+IHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMubG9hZEdsb2JhbFN0YXRlU3RvcmUoKVtpZF0gfHwge30gYXMgYW55KTtcbiAgfVxuXG4gIGV4aXN0cyhpZDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgc3RvcmUgPSB0aGlzLmxvYWRHbG9iYWxTdGF0ZVN0b3JlKCkgfHwge307XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpZCBpbiBzdG9yZSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRHbG9iYWxTdGF0ZVN0b3JlKCk6IHsgW2lkOiBzdHJpbmddOiBQYmxOZ3JpZEdsb2JhbFN0YXRlIH0ge1xuICAgIGNvbnN0IHJhdyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBibE5ncmlkTG9jYWxTdG9yYWdlUGVyc2lzdEFkYXB0ZXIuZ2xvYmFsU3RhdGVLZXkpO1xuICAgIHJldHVybiByYXcgPyBKU09OLnBhcnNlKHJhdykgOiB7fTtcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUdsb2JhbFN0YXRlU3RvcmUoc3RvcmU6IHsgW2lkOiBzdHJpbmddOiBQYmxOZ3JpZEdsb2JhbFN0YXRlIH0pOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyLmdsb2JhbFN0YXRlS2V5LCBKU09OLnN0cmluZ2lmeShzdG9yZSkpO1xuICB9XG59XG4iXX0=