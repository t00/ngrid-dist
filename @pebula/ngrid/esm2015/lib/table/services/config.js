/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const DEFAULT_TABLE_CONFIG = {
    showHeader: true,
    showFooter: false,
    noFiller: false,
};
/** @type {?} */
export const PEB_NGRID_CONFIG = new InjectionToken('PEB_NGRID_CONFIG');
export class PblNgridConfigService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        this.config = new Map();
        this.configNotify = new Map();
        if (_config) {
            for (const key of Object.keys(_config)) {
                ((/** @type {?} */ (this.config))).set(key, _config[key]);
            }
        }
        /** @type {?} */
        const tableConfig = this.config.get('table') || {};
        this.config.set('table', Object.assign({}, DEFAULT_TABLE_CONFIG, tableConfig));
    }
    /**
     * @param {?} section
     * @return {?}
     */
    has(section) {
        return this.config.has(section);
    }
    /**
     * @template T
     * @param {?} section
     * @param {?=} fallback
     * @return {?}
     */
    get(section, fallback) {
        return this.config.get(section) || fallback;
    }
    /**
     * @template T
     * @param {?} section
     * @param {?} value
     * @return {?}
     */
    set(section, value) {
        /** @type {?} */
        const prev = this.get(section);
        value = Object.assign({}, value);
        Object.freeze(value);
        this.config.set(section, value);
        this.notify(section, value, prev);
    }
    /**
     * @template T
     * @param {?} section
     * @return {?}
     */
    onUpdate(section) {
        return this.getGetNotifier(section);
    }
    /**
     * @private
     * @template T
     * @param {?} section
     * @return {?}
     */
    getGetNotifier(section) {
        /** @type {?} */
        let notifier = this.configNotify.get(section);
        if (!notifier) {
            this.configNotify.set(section, notifier = new ReplaySubject(1));
        }
        return notifier;
    }
    /**
     * @private
     * @template T
     * @param {?} section
     * @param {?} curr
     * @param {?} prev
     * @return {?}
     */
    notify(section, curr, prev) {
        this.getGetNotifier(section).next({ curr, prev });
    }
}
PblNgridConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root',
            },] }
];
/** @nocollapse */
PblNgridConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PEB_NGRID_CONFIG,] }] }
];
/** @nocollapse */ PblNgridConfigService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PblNgridConfigService_Factory() { return new PblNgridConfigService(i0.ɵɵinject(PEB_NGRID_CONFIG, 8)); }, token: PblNgridConfigService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFN0Usb0NBTUM7OztJQUxDLCtCQUlDOzs7TUFHRyxvQkFBb0IsR0FBNEI7SUFDcEQsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEtBQUs7SUFDakIsUUFBUSxFQUFFLEtBQUs7Q0FDaEI7O0FBRUQsTUFBTSxPQUFPLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFpQixrQkFBa0IsQ0FBQztBQUt0RixNQUFNLE9BQU8scUJBQXFCOzs7O0lBS2hDLFlBQWtELE9BQXVCO1FBSGpFLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUE0QyxDQUFDO1FBR3pFLElBQUksT0FBTyxFQUFFO1lBQ1gsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN0QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxNQUFNLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0M7U0FDRjs7Y0FFSyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNsRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLG9CQUNsQixvQkFBb0IsRUFDcEIsV0FBVyxFQUNkLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxPQUE2QjtRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFRCxHQUFHLENBQWlDLE9BQVUsRUFBRSxRQUFxQztRQUNuRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7O0lBRUQsR0FBRyxDQUFpQyxPQUFVLEVBQUUsS0FBd0I7O2NBQ2hFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM5QixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBaUMsT0FBVTtRQUNqRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7OztJQUVPLGNBQWMsQ0FBaUMsT0FBVTs7WUFDM0QsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7O0lBRU8sTUFBTSxDQUFpQyxPQUFVLEVBQUUsSUFBdUIsRUFBRSxJQUF1QjtRQUN6RyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7OztZQXBERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7NENBTWMsUUFBUSxZQUFJLE1BQU0sU0FBQyxnQkFBZ0I7Ozs7Ozs7O0lBSGhELHVDQUFzRDs7Ozs7SUFDdEQsNkNBQTJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgdGFibGU/OiB7XG4gICAgc2hvd0hlYWRlcj86IGJvb2xlYW47XG4gICAgc2hvd0Zvb3Rlcj86IGJvb2xlYW47XG4gICAgbm9GaWxsZXI/OiBib29sZWFuO1xuICB9XG59XG5cbmNvbnN0IERFRkFVTFRfVEFCTEVfQ09ORklHOiBQYmxOZ3JpZENvbmZpZ1sndGFibGUnXSA9IHtcbiAgc2hvd0hlYWRlcjogdHJ1ZSxcbiAgc2hvd0Zvb3RlcjogZmFsc2UsXG4gIG5vRmlsbGVyOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjb25zdCBQRUJfTkdSSURfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFBibE5ncmlkQ29uZmlnPignUEVCX05HUklEX0NPTkZJRycpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb25maWdTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbmZpZyA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRDb25maWcsIGFueT4oKTtcbiAgcHJpdmF0ZSBjb25maWdOb3RpZnkgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkQ29uZmlnLCBSZXBsYXlTdWJqZWN0PGFueT4+KCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChQRUJfTkdSSURfQ09ORklHKSBfY29uZmlnOiBQYmxOZ3JpZENvbmZpZykge1xuICAgIGlmIChfY29uZmlnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhfY29uZmlnKSkge1xuICAgICAgICAodGhpcy5jb25maWcgYXMgYW55KS5zZXQoa2V5LCBfY29uZmlnW2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRhYmxlQ29uZmlnID0gdGhpcy5jb25maWcuZ2V0KCd0YWJsZScpIHx8IHt9O1xuICAgIHRoaXMuY29uZmlnLnNldCgndGFibGUnLCB7XG4gICAgICAuLi5ERUZBVUxUX1RBQkxFX0NPTkZJRyxcbiAgICAgIC4uLnRhYmxlQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgaGFzKHNlY3Rpb246IGtleW9mIFBibE5ncmlkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmhhcyhzZWN0aW9uKTtcbiAgfVxuXG4gIGdldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIGZhbGxiYWNrPzogUGFydGlhbDxQYmxOZ3JpZENvbmZpZ1tUXT4pOiBQYmxOZ3JpZENvbmZpZ1tUXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldChzZWN0aW9uKSB8fCBmYWxsYmFjaztcbiAgfVxuXG4gIHNldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIHZhbHVlOiBQYmxOZ3JpZENvbmZpZ1tUXSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldChzZWN0aW9uKTtcbiAgICB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICBPYmplY3QuZnJlZXplKHZhbHVlKTtcbiAgICB0aGlzLmNvbmZpZy5zZXQoc2VjdGlvbiwgdmFsdWUpO1xuICAgIHRoaXMubm90aWZ5KHNlY3Rpb24sIHZhbHVlLCBwcmV2KTtcbiAgfVxuXG4gIG9uVXBkYXRlPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCk6IE9ic2VydmFibGU8eyBjdXJyOiBQYmxOZ3JpZENvbmZpZ1tUXTsgcHJldjogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQ7IH0+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R2V0Tm90aWZpZXI8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBUKTogUmVwbGF5U3ViamVjdDxhbnk+IHtcbiAgICBsZXQgbm90aWZpZXIgPSB0aGlzLmNvbmZpZ05vdGlmeS5nZXQoc2VjdGlvbik7XG4gICAgaWYgKCFub3RpZmllcikge1xuICAgICAgdGhpcy5jb25maWdOb3RpZnkuc2V0KHNlY3Rpb24sIG5vdGlmaWVyID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxKSk7XG4gICAgfVxuICAgIHJldHVybiBub3RpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5PFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCwgY3VycjogUGJsTmdyaWRDb25maWdbVF0sIHByZXY6IFBibE5ncmlkQ29uZmlnW1RdKTogdm9pZCB7XG4gICAgdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKS5uZXh0KHsgY3VyciwgcHJldiB9KTtcbiAgfVxufVxuIl19