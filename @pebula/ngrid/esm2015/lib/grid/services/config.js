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
        const gridConfig = this.config.get('table') || {};
        this.config.set('table', Object.assign({}, DEFAULT_TABLE_CONFIG, gridConfig));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVqRCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUU3RSxvQ0FNQzs7O0lBTEMsK0JBSUM7OztNQUdHLG9CQUFvQixHQUE0QjtJQUNwRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixVQUFVLEVBQUUsS0FBSztJQUNqQixRQUFRLEVBQUUsS0FBSztDQUNoQjs7QUFFRCxNQUFNLE9BQU8sZ0JBQWdCLEdBQUcsSUFBSSxjQUFjLENBQWlCLGtCQUFrQixDQUFDO0FBS3RGLE1BQU0sT0FBTyxxQkFBcUI7Ozs7SUFLaEMsWUFBa0QsT0FBdUI7UUFIakUsV0FBTSxHQUFHLElBQUksR0FBRyxFQUE2QixDQUFDO1FBQzlDLGlCQUFZLEdBQUcsSUFBSSxHQUFHLEVBQTRDLENBQUM7UUFHekUsSUFBSSxPQUFPLEVBQUU7WUFDWCxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3QztTQUNGOztjQUVLLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sb0JBQ2xCLG9CQUFvQixFQUNwQixVQUFVLEVBQ2IsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsR0FBRyxDQUFDLE9BQTZCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7Ozs7OztJQUVELEdBQUcsQ0FBaUMsT0FBVSxFQUFFLFFBQXFDO1FBQ25GLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxDQUFDO0lBQzlDLENBQUM7Ozs7Ozs7SUFFRCxHQUFHLENBQWlDLE9BQVUsRUFBRSxLQUF3Qjs7Y0FDaEUsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzlCLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7O0lBRUQsUUFBUSxDQUFpQyxPQUFVO1FBQ2pELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7Ozs7O0lBRU8sY0FBYyxDQUFpQyxPQUFVOztZQUMzRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxHQUFHLElBQUksYUFBYSxDQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEU7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7Ozs7Ozs7SUFFTyxNQUFNLENBQWlDLE9BQVUsRUFBRSxJQUF1QixFQUFFLElBQXVCO1FBQ3pHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7O1lBcERGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs0Q0FNYyxRQUFRLFlBQUksTUFBTSxTQUFDLGdCQUFnQjs7Ozs7Ozs7SUFIaEQsdUNBQXNEOzs7OztJQUN0RCw2Q0FBMkUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICB0YWJsZT86IHtcbiAgICBzaG93SGVhZGVyPzogYm9vbGVhbjtcbiAgICBzaG93Rm9vdGVyPzogYm9vbGVhbjtcbiAgICBub0ZpbGxlcj86IGJvb2xlYW47XG4gIH1cbn1cblxuY29uc3QgREVGQVVMVF9UQUJMRV9DT05GSUc6IFBibE5ncmlkQ29uZmlnWyd0YWJsZSddID0ge1xuICBzaG93SGVhZGVyOiB0cnVlLFxuICBzaG93Rm9vdGVyOiBmYWxzZSxcbiAgbm9GaWxsZXI6IGZhbHNlLFxufTtcblxuZXhwb3J0IGNvbnN0IFBFQl9OR1JJRF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48UGJsTmdyaWRDb25maWc+KCdQRUJfTkdSSURfQ09ORklHJyk7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgY29uZmlnID0gbmV3IE1hcDxrZXlvZiBQYmxOZ3JpZENvbmZpZywgYW55PigpO1xuICBwcml2YXRlIGNvbmZpZ05vdGlmeSA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRDb25maWcsIFJlcGxheVN1YmplY3Q8YW55Pj4oKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KFBFQl9OR1JJRF9DT05GSUcpIF9jb25maWc6IFBibE5ncmlkQ29uZmlnKSB7XG4gICAgaWYgKF9jb25maWcpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKF9jb25maWcpKSB7XG4gICAgICAgICh0aGlzLmNvbmZpZyBhcyBhbnkpLnNldChrZXksIF9jb25maWdba2V5XSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZ3JpZENvbmZpZyA9IHRoaXMuY29uZmlnLmdldCgndGFibGUnKSB8fCB7fTtcbiAgICB0aGlzLmNvbmZpZy5zZXQoJ3RhYmxlJywge1xuICAgICAgLi4uREVGQVVMVF9UQUJMRV9DT05GSUcsXG4gICAgICAuLi5ncmlkQ29uZmlnLFxuICAgIH0pO1xuICB9XG5cbiAgaGFzKHNlY3Rpb246IGtleW9mIFBibE5ncmlkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmhhcyhzZWN0aW9uKTtcbiAgfVxuXG4gIGdldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIGZhbGxiYWNrPzogUGFydGlhbDxQYmxOZ3JpZENvbmZpZ1tUXT4pOiBQYmxOZ3JpZENvbmZpZ1tUXSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldChzZWN0aW9uKSB8fCBmYWxsYmFjaztcbiAgfVxuXG4gIHNldDxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIHZhbHVlOiBQYmxOZ3JpZENvbmZpZ1tUXSk6IHZvaWQge1xuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldChzZWN0aW9uKTtcbiAgICB2YWx1ZSA9IE9iamVjdC5hc3NpZ24oe30sIHZhbHVlKTtcbiAgICBPYmplY3QuZnJlZXplKHZhbHVlKTtcbiAgICB0aGlzLmNvbmZpZy5zZXQoc2VjdGlvbiwgdmFsdWUpO1xuICAgIHRoaXMubm90aWZ5KHNlY3Rpb24sIHZhbHVlLCBwcmV2KTtcbiAgfVxuXG4gIG9uVXBkYXRlPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCk6IE9ic2VydmFibGU8eyBjdXJyOiBQYmxOZ3JpZENvbmZpZ1tUXTsgcHJldjogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQ7IH0+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R2V0Tm90aWZpZXI8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBUKTogUmVwbGF5U3ViamVjdDxhbnk+IHtcbiAgICBsZXQgbm90aWZpZXIgPSB0aGlzLmNvbmZpZ05vdGlmeS5nZXQoc2VjdGlvbik7XG4gICAgaWYgKCFub3RpZmllcikge1xuICAgICAgdGhpcy5jb25maWdOb3RpZnkuc2V0KHNlY3Rpb24sIG5vdGlmaWVyID0gbmV3IFJlcGxheVN1YmplY3Q8YW55PigxKSk7XG4gICAgfVxuICAgIHJldHVybiBub3RpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5PFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCwgY3VycjogUGJsTmdyaWRDb25maWdbVF0sIHByZXY6IFBibE5ncmlkQ29uZmlnW1RdKTogdm9pZCB7XG4gICAgdGhpcy5nZXRHZXROb3RpZmllcihzZWN0aW9uKS5uZXh0KHsgY3VyciwgcHJldiB9KTtcbiAgfVxufVxuIl19