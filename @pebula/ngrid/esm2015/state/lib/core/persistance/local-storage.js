/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtc3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RhdGUvIiwic291cmNlcyI6WyJsaWIvY29yZS9wZXJzaXN0YW5jZS9sb2NhbC1zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNLE9BQU8sa0NBQWtDOzs7Ozs7SUFHN0MsSUFBSSxDQUFDLEVBQVUsRUFBRSxLQUEwQjtRQUN6QyxJQUFJOztrQkFDSSxLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQ3pDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUssQ0FBQyxZQUFZLEdBQUcsbUJBQUEsRUFBRSxFQUFPLENBQUM7YUFDaEM7WUFDRCxLQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRXhELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxJQUFJLENBQUMsRUFBVTtRQUNiLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxtQkFBQSxFQUFFLEVBQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEVBQVU7O2NBQ1QsS0FBSyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUU7UUFDL0MsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVPLG9CQUFvQjs7Y0FDcEIsR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsY0FBYyxDQUFDO1FBQ25GLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRU8sb0JBQW9CLENBQUMsS0FBNEM7UUFDdkUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLENBQUM7O0FBbENjLGlEQUFjLEdBQVcsa0JBQWtCLENBQUM7Ozs7OztJQUEzRCxrREFBMkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEdsb2JhbFN0YXRlLCBQYmxOZ3JpZFBlcnNpc3RBZGFwdGVyIH0gZnJvbSAnLi4vbW9kZWxzL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTG9jYWxTdG9yYWdlUGVyc2lzdEFkYXB0ZXIgaW1wbGVtZW50cyBQYmxOZ3JpZFBlcnNpc3RBZGFwdGVyIHtcbiAgcHJpdmF0ZSBzdGF0aWMgZ2xvYmFsU3RhdGVLZXk6IHN0cmluZyA9ICdwZWJ1bGFOZ3JpZFN0YXRlJztcblxuICBzYXZlKGlkOiBzdHJpbmcsIHN0YXRlOiBQYmxOZ3JpZEdsb2JhbFN0YXRlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5sb2FkR2xvYmFsU3RhdGVTdG9yZSgpO1xuICAgICAgc3RvcmVbaWRdID0gc3RhdGU7XG4gICAgICBpZiAoIXN0YXRlLl9fbWV0YWRhdGFfXykge1xuICAgICAgICBzdGF0ZS5fX21ldGFkYXRhX18gPSB7fSBhcyBhbnk7XG4gICAgICB9XG4gICAgICBzdGF0ZS5fX21ldGFkYXRhX18udXBkYXRlZEF0ID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgICB0aGlzLnNhdmVHbG9iYWxTdGF0ZVN0b3JlKHN0b3JlKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGxvYWQoaWQ6IHN0cmluZyk6IFByb21pc2U8UGJsTmdyaWRHbG9iYWxTdGF0ZT4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5sb2FkR2xvYmFsU3RhdGVTdG9yZSgpW2lkXSB8fCB7fSBhcyBhbnkpO1xuICB9XG5cbiAgZXhpc3RzKGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBzdG9yZSA9IHRoaXMubG9hZEdsb2JhbFN0YXRlU3RvcmUoKSB8fCB7fTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlkIGluIHN0b3JlKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZEdsb2JhbFN0YXRlU3RvcmUoKTogeyBbaWQ6IHN0cmluZ106IFBibE5ncmlkR2xvYmFsU3RhdGUgfSB7XG4gICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oUGJsTmdyaWRMb2NhbFN0b3JhZ2VQZXJzaXN0QWRhcHRlci5nbG9iYWxTdGF0ZUtleSk7XG4gICAgcmV0dXJuIHJhdyA/IEpTT04ucGFyc2UocmF3KSA6IHt9O1xuICB9XG5cbiAgcHJpdmF0ZSBzYXZlR2xvYmFsU3RhdGVTdG9yZShzdG9yZTogeyBbaWQ6IHN0cmluZ106IFBibE5ncmlkR2xvYmFsU3RhdGUgfSk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBibE5ncmlkTG9jYWxTdG9yYWdlUGVyc2lzdEFkYXB0ZXIuZ2xvYmFsU3RhdGVLZXksIEpTT04uc3RyaW5naWZ5KHN0b3JlKSk7XG4gIH1cbn1cbiJdfQ==