/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/services/config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.config.set('table', Object.assign(Object.assign({}, DEFAULT_TABLE_CONFIG), gridConfig));
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
/** @nocollapse */ PblNgridConfigService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PblNgridConfigService_Factory() { return new PblNgridConfigService(i0.ɵɵinject(PEB_NGRID_CONFIG, 8)); }, token: PblNgridConfigService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFFN0Usb0NBTUM7OztJQUxDLCtCQUlDOzs7TUFHRyxvQkFBb0IsR0FBNEI7SUFDcEQsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEtBQUs7SUFDakIsUUFBUSxFQUFFLEtBQUs7Q0FDaEI7O0FBRUQsTUFBTSxPQUFPLGdCQUFnQixHQUFHLElBQUksY0FBYyxDQUFpQixrQkFBa0IsQ0FBQztBQUt0RixNQUFNLE9BQU8scUJBQXFCOzs7O0lBS2hDLFlBQWtELE9BQXVCO1FBSGpFLFdBQU0sR0FBRyxJQUFJLEdBQUcsRUFBNkIsQ0FBQztRQUM5QyxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUE0QyxDQUFDO1FBR3pFLElBQUksT0FBTyxFQUFFO1lBQ1gsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUN0QyxDQUFDLG1CQUFBLElBQUksQ0FBQyxNQUFNLEVBQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0M7U0FDRjs7Y0FFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLGtDQUNsQixvQkFBb0IsR0FDcEIsVUFBVSxFQUNiLENBQUM7SUFDTCxDQUFDOzs7OztJQUVELEdBQUcsQ0FBQyxPQUE2QjtRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7Ozs7SUFFRCxHQUFHLENBQWlDLE9BQVUsRUFBRSxRQUFxQztRQUNuRixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7O0lBRUQsR0FBRyxDQUFpQyxPQUFVLEVBQUUsS0FBd0I7O2NBQ2hFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM5QixLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVELFFBQVEsQ0FBaUMsT0FBVTtRQUNqRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7Ozs7OztJQUVPLGNBQWMsQ0FBaUMsT0FBVTs7WUFDM0QsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RFO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7Ozs7O0lBRU8sTUFBTSxDQUFpQyxPQUFVLEVBQUUsSUFBdUIsRUFBRSxJQUF1QjtRQUN6RyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7OztZQXBERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7NENBTWMsUUFBUSxZQUFJLE1BQU0sU0FBQyxnQkFBZ0I7Ozs7Ozs7O0lBSGhELHVDQUFzRDs7Ozs7SUFDdEQsNkNBQTJFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgdGFibGU/OiB7XG4gICAgc2hvd0hlYWRlcj86IGJvb2xlYW47XG4gICAgc2hvd0Zvb3Rlcj86IGJvb2xlYW47XG4gICAgbm9GaWxsZXI/OiBib29sZWFuO1xuICB9XG59XG5cbmNvbnN0IERFRkFVTFRfVEFCTEVfQ09ORklHOiBQYmxOZ3JpZENvbmZpZ1sndGFibGUnXSA9IHtcbiAgc2hvd0hlYWRlcjogdHJ1ZSxcbiAgc2hvd0Zvb3RlcjogZmFsc2UsXG4gIG5vRmlsbGVyOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjb25zdCBQRUJfTkdSSURfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPFBibE5ncmlkQ29uZmlnPignUEVCX05HUklEX0NPTkZJRycpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb25maWdTZXJ2aWNlIHtcblxuICBwcml2YXRlIGNvbmZpZyA9IG5ldyBNYXA8a2V5b2YgUGJsTmdyaWRDb25maWcsIGFueT4oKTtcbiAgcHJpdmF0ZSBjb25maWdOb3RpZnkgPSBuZXcgTWFwPGtleW9mIFBibE5ncmlkQ29uZmlnLCBSZXBsYXlTdWJqZWN0PGFueT4+KCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChQRUJfTkdSSURfQ09ORklHKSBfY29uZmlnOiBQYmxOZ3JpZENvbmZpZykge1xuICAgIGlmIChfY29uZmlnKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhfY29uZmlnKSkge1xuICAgICAgICAodGhpcy5jb25maWcgYXMgYW55KS5zZXQoa2V5LCBfY29uZmlnW2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGdyaWRDb25maWcgPSB0aGlzLmNvbmZpZy5nZXQoJ3RhYmxlJykgfHwge307XG4gICAgdGhpcy5jb25maWcuc2V0KCd0YWJsZScsIHtcbiAgICAgIC4uLkRFRkFVTFRfVEFCTEVfQ09ORklHLFxuICAgICAgLi4uZ3JpZENvbmZpZyxcbiAgICB9KTtcbiAgfVxuXG4gIGhhcyhzZWN0aW9uOiBrZXlvZiBQYmxOZ3JpZENvbmZpZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5oYXMoc2VjdGlvbik7XG4gIH1cblxuICBnZXQ8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBULCBmYWxsYmFjaz86IFBhcnRpYWw8UGJsTmdyaWRDb25maWdbVF0+KTogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXQoc2VjdGlvbikgfHwgZmFsbGJhY2s7XG4gIH1cblxuICBzZXQ8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBULCB2YWx1ZTogUGJsTmdyaWRDb25maWdbVF0pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5nZXQoc2VjdGlvbik7XG4gICAgdmFsdWUgPSBPYmplY3QuYXNzaWduKHt9LCB2YWx1ZSk7XG4gICAgT2JqZWN0LmZyZWV6ZSh2YWx1ZSk7XG4gICAgdGhpcy5jb25maWcuc2V0KHNlY3Rpb24sIHZhbHVlKTtcbiAgICB0aGlzLm5vdGlmeShzZWN0aW9uLCB2YWx1ZSwgcHJldik7XG4gIH1cblxuICBvblVwZGF0ZTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQpOiBPYnNlcnZhYmxlPHsgY3VycjogUGJsTmdyaWRDb25maWdbVF07IHByZXY6IFBibE5ncmlkQ29uZmlnW1RdIHwgdW5kZWZpbmVkOyB9PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0R2V0Tm90aWZpZXIoc2VjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGdldEdldE5vdGlmaWVyPFQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZENvbmZpZz4oc2VjdGlvbjogVCk6IFJlcGxheVN1YmplY3Q8YW55PiB7XG4gICAgbGV0IG5vdGlmaWVyID0gdGhpcy5jb25maWdOb3RpZnkuZ2V0KHNlY3Rpb24pO1xuICAgIGlmICghbm90aWZpZXIpIHtcbiAgICAgIHRoaXMuY29uZmlnTm90aWZ5LnNldChzZWN0aW9uLCBub3RpZmllciA9IG5ldyBSZXBsYXlTdWJqZWN0PGFueT4oMSkpO1xuICAgIH1cbiAgICByZXR1cm4gbm90aWZpZXI7XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeTxUIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRDb25maWc+KHNlY3Rpb246IFQsIGN1cnI6IFBibE5ncmlkQ29uZmlnW1RdLCBwcmV2OiBQYmxOZ3JpZENvbmZpZ1tUXSk6IHZvaWQge1xuICAgIHRoaXMuZ2V0R2V0Tm90aWZpZXIoc2VjdGlvbikubmV4dCh7IGN1cnIsIHByZXYgfSk7XG4gIH1cbn1cbiJdfQ==