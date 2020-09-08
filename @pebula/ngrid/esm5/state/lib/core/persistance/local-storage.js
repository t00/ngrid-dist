/**
 * @fileoverview added by tsickle
 * Generated from: lib/core/persistance/local-storage.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9wZXJzaXN0YW5jZS9sb2NhbC1zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7SUFBQTtJQW9DQSxDQUFDOzs7Ozs7SUFqQ0MsaURBQUk7Ozs7O0lBQUosVUFBSyxFQUFVLEVBQUUsS0FBMEI7UUFDekMsSUFBSTs7Z0JBQ0ksS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUN6QyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFO2dCQUN2QixLQUFLLENBQUMsWUFBWSxHQUFHLG1CQUFBLEVBQUUsRUFBTyxDQUFDO2FBQ2hDO1lBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUV4RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7Ozs7O0lBRUQsaURBQUk7Ozs7SUFBSixVQUFLLEVBQVU7UUFDYixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksbUJBQUEsRUFBRSxFQUFPLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7OztJQUVELG1EQUFNOzs7O0lBQU4sVUFBTyxFQUFVOztZQUNULEtBQUssR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsSUFBSSxFQUFFO1FBQy9DLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7SUFFTyxpRUFBb0I7Ozs7SUFBNUI7O1lBQ1EsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsY0FBYyxDQUFDO1FBQ25GLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRU8saUVBQW9COzs7OztJQUE1QixVQUE2QixLQUE0QztRQUN2RSxZQUFZLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakcsQ0FBQztJQWxDYyxpREFBYyxHQUFXLGtCQUFrQixDQUFDO0lBbUM3RCx5Q0FBQztDQUFBLEFBcENELElBb0NDO1NBcENZLGtDQUFrQzs7Ozs7O0lBQzdDLGtEQUEyRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkR2xvYmFsU3RhdGUsIFBibE5ncmlkUGVyc2lzdEFkYXB0ZXIgfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlciBpbXBsZW1lbnRzIFBibE5ncmlkUGVyc2lzdEFkYXB0ZXIge1xuICBwcml2YXRlIHN0YXRpYyBnbG9iYWxTdGF0ZUtleTogc3RyaW5nID0gJ3BlYnVsYU5ncmlkU3RhdGUnO1xuXG4gIHNhdmUoaWQ6IHN0cmluZywgc3RhdGU6IFBibE5ncmlkR2xvYmFsU3RhdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLmxvYWRHbG9iYWxTdGF0ZVN0b3JlKCk7XG4gICAgICBzdG9yZVtpZF0gPSBzdGF0ZTtcbiAgICAgIGlmICghc3RhdGUuX19tZXRhZGF0YV9fKSB7XG4gICAgICAgIHN0YXRlLl9fbWV0YWRhdGFfXyA9IHt9IGFzIGFueTtcbiAgICAgIH1cbiAgICAgIHN0YXRlLl9fbWV0YWRhdGFfXy51cGRhdGVkQXQgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICAgIHRoaXMuc2F2ZUdsb2JhbFN0YXRlU3RvcmUoc3RvcmUpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxuICB9XG5cbiAgbG9hZChpZDogc3RyaW5nKTogUHJvbWlzZTxQYmxOZ3JpZEdsb2JhbFN0YXRlPiB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmxvYWRHbG9iYWxTdGF0ZVN0b3JlKClbaWRdIHx8IHt9IGFzIGFueSk7XG4gIH1cblxuICBleGlzdHMoaWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHN0b3JlID0gdGhpcy5sb2FkR2xvYmFsU3RhdGVTdG9yZSgpIHx8IHt9O1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoaWQgaW4gc3RvcmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkR2xvYmFsU3RhdGVTdG9yZSgpOiB7IFtpZDogc3RyaW5nXTogUGJsTmdyaWRHbG9iYWxTdGF0ZSB9IHtcbiAgICBjb25zdCByYXcgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQYmxOZ3JpZExvY2FsU3RvcmFnZVBlcnNpc3RBZGFwdGVyLmdsb2JhbFN0YXRlS2V5KTtcbiAgICByZXR1cm4gcmF3ID8gSlNPTi5wYXJzZShyYXcpIDoge307XG4gIH1cblxuICBwcml2YXRlIHNhdmVHbG9iYWxTdGF0ZVN0b3JlKHN0b3JlOiB7IFtpZDogc3RyaW5nXTogUGJsTmdyaWRHbG9iYWxTdGF0ZSB9KTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlci5nbG9iYWxTdGF0ZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RvcmUpKTtcbiAgfVxufVxuIl19