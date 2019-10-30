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
        var tableConfig = this.config.get('table') || {};
        this.config.set('table', tslib_1.__assign({}, DEFAULT_TABLE_CONFIG, tableConfig));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRTdFLG9DQU1DOzs7SUFMQywrQkFJQzs7O0lBR0csb0JBQW9CLEdBQTRCO0lBQ3BELFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCOztBQUVELE1BQU0sS0FBTyxnQkFBZ0IsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsa0JBQWtCLENBQUM7QUFFdEY7SUFRRSwrQkFBa0QsT0FBdUI7O1FBSGpFLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUE0QyxDQUFDO1FBR3pFLElBQUksT0FBTyxFQUFFOztnQkFDWCxLQUFrQixJQUFBLEtBQUEsaUJBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBbkMsSUFBTSxHQUFHLFdBQUE7b0JBQ1osQ0FBQyxtQkFBQSxJQUFJLENBQUMsTUFBTSxFQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUM3Qzs7Ozs7Ozs7O1NBQ0Y7O1lBRUssV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7UUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyx1QkFDbEIsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDZCxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxtQ0FBRzs7OztJQUFILFVBQUksT0FBNkI7UUFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDOzs7Ozs7O0lBRUQsbUNBQUc7Ozs7OztJQUFILFVBQW9DLE9BQVUsRUFBRSxRQUFxQztRQUNuRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7O0lBRUQsbUNBQUc7Ozs7OztJQUFILFVBQW9DLE9BQVUsRUFBRSxLQUF3Qjs7WUFDaEUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzlCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRUQsd0NBQVE7Ozs7O0lBQVIsVUFBeUMsT0FBVTtRQUNqRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7OztJQUVPLDhDQUFjOzs7Ozs7SUFBdEIsVUFBdUQsT0FBVTs7WUFDM0QsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7O0lBRU8sc0NBQU07Ozs7Ozs7O0lBQWQsVUFBK0MsT0FBVSxFQUFFLElBQXVCLEVBQUUsSUFBdUI7UUFDekcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Z0JBcERGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0RBTWMsUUFBUSxZQUFJLE1BQU0sU0FBQyxnQkFBZ0I7OztnQ0E1QmxEO0NBeUVDLEFBckRELElBcURDO1NBbERZLHFCQUFxQjs7Ozs7O0lBRWhDLHVDQUFzRDs7Ozs7SUFDdEQsNkNBQTJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgdGFibGU/OiB7XG4gICAgc2hvd0hlYWRlcj86IGJvb2xlYW47XG4gICAgc2hvd0Zvb3Rlcj86IGJvb2xlYW47XG4gICAgbm9GaWxsZXI/OiBib29sZWFuO1xuICB9XG59XG5cbmNvbnN0IERFRkFVTFRfVEFCTEVfQ09ORklHOiBQYmxOZ3JpZENvbmZpZ1sndGFibGUnXSA9IHtcbiAgc2hvd0hlYWRlcjogdHJ1ZSxcbiAgc2hvd0Zvb3RlcjogZmFsc2UsXG4gIG5vRmlsbGVyOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjb25zdCBQRUJfTkdSSURfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFBibE5ncmlkQ29uZmlnPignUEVCX05HUklEX0NPTkZJRycpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb25maWdTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbmZpZyA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRDb25maWcsIGFueT4oKTtcbiAgcHJpdmF0ZSBjb25maWdOb3RpZnkgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkQ29uZmlnLCBSZXBsYXlTdWJqZWN0PGFueT4+KCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChQRUJfTkdSSURfQ09ORklHKSBfY29uZmlnOiBQYmxOZ3JpZENvbmZpZykge1xuICAgIGlmIChfY29uZmlnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhfY29uZmlnKSkge1xuICAgICAgICAodGhpcy5jb25maWcgYXMgYW55KS5zZXQoa2V5LCBfY29uZmlnW2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0KCd0YWJsZScpIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnLnNldCgndGFibGUnLCB7XG4gICAgICAuLi5ERUZBVUxUX1RBQkxFX0NPTkZJRyxcbiAgICAgIC4uLnRhYmxlQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgaGFzKHNlY3Rpb246IGtleW9mIFBibE5ncmlkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmhhcyhzZWN0aW9uKTtcbiAgfVxuXG4gIGdldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIGZhbGxiYWNrPzogUGFydGlhbDxQYmxOZ3JpZENvbmZpZ1tUXT4pOiBQYmxOZ3JpZENvbmZpZ1tUXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldChzZWN0aW9uKSB8fCBmYWxsYmFjaztcbiAgfVxuXG4gIHNldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIHZhbHVlOiBQYmxOZ3JpZENvbmZpZ1tUXSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldChzZWN0aW9uKTtcbiAgICB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICBPYmplY3QuZnJlZXplKHZhbHVlKTtcbiAgICB0aGlzLmNvbmZpZy5zZXQoc2VjdGlvbiwgdmFsdWUpO1xuICAgIHRoaXMubm90aWZ5KHNlY3Rpb24sIHZhbHVlLCBwcmV2KTtcbiAgfVxuXG4gIG9uVXBkYXRlPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCk6IE9ic2VydmFibGU8eyBjdXJyOiBQYmxOZ3JpZENvbmZpZ1tUXTsgcHJldjogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQ7IH0+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R2V0Tm90aWZpZXI8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBUKTogUmVwbGF5U3ViamVjdDxhbnk+IHtcbiAgICBsZXQgbm90aWZpZXIgPSB0aGlzLmNvbmZpZ05vdGlmeS5nZXQoc2VjdGlvbik7XG4gICAgaWYgKCFub3RpZmllcikge1xuICAgICAgdGhpcy5jb25maWdOb3RpZnkuc2V0KHNlY3Rpb24sIG5vdGlmaWVyID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxKSk7XG4gICAgfVxuICAgIHJldHVybiBub3RpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5PFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCwgY3VycjogUGJsTmdyaWRDb25maWdbVF0sIHByZXY6IFBibE5ncmlkQ29uZmlnW1RdKTogdm9pZCB7XG4gICAgdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKS5uZXh0KHsgY3VyciwgcHJldiB9KTtcbiAgfVxufVxuIl19