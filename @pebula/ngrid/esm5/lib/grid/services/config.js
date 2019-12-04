/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ReplaySubject } from 'rxjs';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function PblNgridConfig() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridConfig.prototype.table;
}
/** @type {?} */
var DEFAULT_TABLE_CONFIG = {
    showHeader: true,
    showFooter: false,
    noFiller: false,
};
/** @type {?} */
export var PEB_NGRID_CONFIG = new InjectionToken('PEB_NGRID_CONFIG');
var PblNgridConfigService = /** @class */ (function () {
    function PblNgridConfigService(_config) {
        var e_1, _a;
        this.config = new Map();
        this.configNotify = new Map();
        if (_config) {
            try {
                for (var _b = tslib_1.__values(Object.keys(_config)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    ((/** @type {?} */ (this.config))).set(key, _config[key]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        /** @type {?} */
        var gridConfig = this.config.get('table') || {};
        this.config.set('table', tslib_1.__assign({}, DEFAULT_TABLE_CONFIG, gridConfig));
    }
    /**
     * @param {?} section
     * @return {?}
     */
    PblNgridConfigService.prototype.has = /**
     * @param {?} section
     * @return {?}
     */
    function (section) {
        return this.config.has(section);
    };
    /**
     * @template T
     * @param {?} section
     * @param {?=} fallback
     * @return {?}
     */
    PblNgridConfigService.prototype.get = /**
     * @template T
     * @param {?} section
     * @param {?=} fallback
     * @return {?}
     */
    function (section, fallback) {
        return this.config.get(section) || fallback;
    };
    /**
     * @template T
     * @param {?} section
     * @param {?} value
     * @return {?}
     */
    PblNgridConfigService.prototype.set = /**
     * @template T
     * @param {?} section
     * @param {?} value
     * @return {?}
     */
    function (section, value) {
        /** @type {?} */
        var prev = this.get(section);
        value = Object.assign({}, value);
        Object.freeze(value);
        this.config.set(section, value);
        this.notify(section, value, prev);
    };
    /**
     * @template T
     * @param {?} section
     * @return {?}
     */
    PblNgridConfigService.prototype.onUpdate = /**
     * @template T
     * @param {?} section
     * @return {?}
     */
    function (section) {
        return this.getGetNotifier(section);
    };
    /**
     * @private
     * @template T
     * @param {?} section
     * @return {?}
     */
    PblNgridConfigService.prototype.getGetNotifier = /**
     * @private
     * @template T
     * @param {?} section
     * @return {?}
     */
    function (section) {
        /** @type {?} */
        var notifier = this.configNotify.get(section);
        if (!notifier) {
            this.configNotify.set(section, notifier = new ReplaySubject(1));
        }
        return notifier;
    };
    /**
     * @private
     * @template T
     * @param {?} section
     * @param {?} curr
     * @param {?} prev
     * @return {?}
     */
    PblNgridConfigService.prototype.notify = /**
     * @private
     * @template T
     * @param {?} section
     * @param {?} curr
     * @param {?} prev
     * @return {?}
     */
    function (section, curr, prev) {
        this.getGetNotifier(section).next({ curr: curr, prev: prev });
    };
    PblNgridConfigService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root',
                },] }
    ];
    /** @nocollapse */
    PblNgridConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PEB_NGRID_CONFIG,] }] }
    ]; };
    /** @nocollapse */ PblNgridConfigService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PblNgridConfigService_Factory() { return new PblNgridConfigService(i0.ɵɵinject(PEB_NGRID_CONFIG, 8)); }, token: PblNgridConfigService, providedIn: "root" });
    return PblNgridConfigService;
}());
export { PblNgridConfigService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridConfigService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    PblNgridConfigService.prototype.configNotify;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFN0Usb0NBTUM7OztJQUxDLCtCQUlDOzs7SUFHRyxvQkFBb0IsR0FBNEI7SUFDcEQsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEtBQUs7SUFDakIsUUFBUSxFQUFFLEtBQUs7Q0FDaEI7O0FBRUQsTUFBTSxLQUFPLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFpQixrQkFBa0IsQ0FBQztBQUV0RjtJQVFFLCtCQUFrRCxPQUF1Qjs7UUFIakUsV0FBTSxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxHQUFHLEVBQTRDLENBQUM7UUFHekUsSUFBSSxPQUFPLEVBQUU7O2dCQUNYLEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO29CQUFuQyxJQUFNLEdBQUcsV0FBQTtvQkFDWixDQUFDLG1CQUFBLElBQUksQ0FBQyxNQUFNLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQzdDOzs7Ozs7Ozs7U0FDRjs7WUFFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLHVCQUNsQixvQkFBb0IsRUFDcEIsVUFBVSxFQUNiLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELG1DQUFHOzs7O0lBQUgsVUFBSSxPQUE2QjtRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFRCxtQ0FBRzs7Ozs7O0lBQUgsVUFBb0MsT0FBVSxFQUFFLFFBQXFDO1FBQ25GLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDO0lBQzlDLENBQUM7Ozs7Ozs7SUFFRCxtQ0FBRzs7Ozs7O0lBQUgsVUFBb0MsT0FBVSxFQUFFLEtBQXdCOztZQUNoRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDOUIsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFRCx3Q0FBUTs7Ozs7SUFBUixVQUF5QyxPQUFVO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7O0lBRU8sOENBQWM7Ozs7OztJQUF0QixVQUF1RCxPQUFVOztZQUMzRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7Ozs7Ozs7SUFFTyxzQ0FBTTs7Ozs7Ozs7SUFBZCxVQUErQyxPQUFVLEVBQUUsSUFBdUIsRUFBRSxJQUF1QjtRQUN6RyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDOztnQkFwREYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnREFNYyxRQUFRLFlBQUksTUFBTSxTQUFDLGdCQUFnQjs7O2dDQTVCbEQ7Q0F5RUMsQUFyREQsSUFxREM7U0FsRFkscUJBQXFCOzs7Ozs7SUFFaEMsdUNBQXNEOzs7OztJQUN0RCw2Q0FBMkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICB0YWJsZT86IHtcbiAgICBzaG93SGVhZGVyPzogYm9vbGVhbjtcbiAgICBzaG93Rm9vdGVyPzogYm9vbGVhbjtcbiAgICBub0ZpbGxlcj86IGJvb2xlYW47XG4gIH1cbn1cblxuY29uc3QgREVGQVVMVF9UQUJMRV9DT05GSUc6IFBibE5ncmlkQ29uZmlnWyd0YWJsZSddID0ge1xuICBzaG93SGVhZGVyOiB0cnVlLFxuICBzaG93Rm9vdGVyOiBmYWxzZSxcbiAgbm9GaWxsZXI6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNvbnN0IFBFQl9OR1JJRF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48UGJsTmdyaWRDb25maWc+KCdQRUJfTkdSSURfQ09ORklHJyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgY29uZmlnID0gbmV3IE1hcDxrZXlvZiBQYmxOZ3JpZENvbmZpZywgYW55PigpO1xuICBwcml2YXRlIGNvbmZpZ05vdGlmeSA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRDb25maWcsIFJlcGxheVN1YmplY3Q8YW55Pj4oKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KFBFQl9OR1JJRF9DT05GSUcpIF9jb25maWc6IFBibE5ncmlkQ29uZmlnKSB7XG4gICAgaWYgKF9jb25maWcpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKF9jb25maWcpKSB7XG4gICAgICAgICh0aGlzLmNvbmZpZyBhcyBhbnkpLnNldChrZXksIF9jb25maWdba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZENvbmZpZyA9IHRoaXMuY29uZmlnLmdldCgndGFibGUnKSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZy5zZXQoJ3RhYmxlJywge1xuICAgICAgLi4uREVGQVVMVF9UQUJMRV9DT05GSUcsXG4gICAgICAuLi5ncmlkQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgaGFzKHNlY3Rpb246IGtleW9mIFBibE5ncmlkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmhhcyhzZWN0aW9uKTtcbiAgfVxuXG4gIGdldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIGZhbGxiYWNrPzogUGFydGlhbDxQYmxOZ3JpZENvbmZpZ1tUXT4pOiBQYmxOZ3JpZENvbmZpZ1tUXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldChzZWN0aW9uKSB8fCBmYWxsYmFjaztcbiAgfVxuXG4gIHNldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIHZhbHVlOiBQYmxOZ3JpZENvbmZpZ1tUXSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldChzZWN0aW9uKTtcbiAgICB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICBPYmplY3QuZnJlZXplKHZhbHVlKTtcbiAgICB0aGlzLmNvbmZpZy5zZXQoc2VjdGlvbiwgdmFsdWUpO1xuICAgIHRoaXMubm90aWZ5KHNlY3Rpb24sIHZhbHVlLCBwcmV2KTtcbiAgfVxuXG4gIG9uVXBkYXRlPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCk6IE9ic2VydmFibGU8eyBjdXJyOiBQYmxOZ3JpZENvbmZpZ1tUXTsgcHJldjogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQ7IH0+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R2V0Tm90aWZpZXI8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBUKTogUmVwbGF5U3ViamVjdDxhbnk+IHtcbiAgICBsZXQgbm90aWZpZXIgPSB0aGlzLmNvbmZpZ05vdGlmeS5nZXQoc2VjdGlvbik7XG4gICAgaWYgKCFub3RpZmllcikge1xuICAgICAgdGhpcy5jb25maWdOb3RpZnkuc2V0KHNlY3Rpb24sIG5vdGlmaWVyID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxKSk7XG4gICAgfVxuICAgIHJldHVybiBub3RpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5PFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCwgY3VycjogUGJsTmdyaWRDb25maWdbVF0sIHByZXY6IFBibE5ncmlkQ29uZmlnW1RdKTogdm9pZCB7XG4gICAgdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKS5uZXh0KHsgY3VyciwgcHJldiB9KTtcbiAgfVxufVxuIl19