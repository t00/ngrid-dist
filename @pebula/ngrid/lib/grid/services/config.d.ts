import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export interface PblNgridConfig {
    table?: {
        showHeader?: boolean;
        showFooter?: boolean;
        noFiller?: boolean;
    };
}
export declare const PEB_NGRID_CONFIG: InjectionToken<PblNgridConfig>;
export declare class PblNgridConfigService {
    private config;
    private configNotify;
    constructor(_config: PblNgridConfig);
    has(section: keyof PblNgridConfig): boolean;
    get<T extends keyof PblNgridConfig>(section: T, fallback?: Partial<PblNgridConfig[T]>): PblNgridConfig[T] | undefined;
    set<T extends keyof PblNgridConfig>(section: T, value: PblNgridConfig[T]): void;
    onUpdate<T extends keyof PblNgridConfig>(section: T): Observable<{
        curr: PblNgridConfig[T];
        prev: PblNgridConfig[T] | undefined;
    }>;
    private getGetNotifier;
    private notify;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridConfigService, [{ optional: true; }]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmQudHMiLCJzb3VyY2VzIjpbImNvbmZpZy5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcclxuICAgIHRhYmxlPzoge1xyXG4gICAgICAgIHNob3dIZWFkZXI/OiBib29sZWFuO1xyXG4gICAgICAgIHNob3dGb290ZXI/OiBib29sZWFuO1xyXG4gICAgICAgIG5vRmlsbGVyPzogYm9vbGVhbjtcclxuICAgIH07XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgUEVCX05HUklEX0NPTkZJRzogSW5qZWN0aW9uVG9rZW48UGJsTmdyaWRDb25maWc+O1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBjb25maWc7XHJcbiAgICBwcml2YXRlIGNvbmZpZ05vdGlmeTtcclxuICAgIGNvbnN0cnVjdG9yKF9jb25maWc6IFBibE5ncmlkQ29uZmlnKTtcclxuICAgIGhhcyhzZWN0aW9uOiBrZXlvZiBQYmxOZ3JpZENvbmZpZyk6IGJvb2xlYW47XHJcbiAgICBnZXQ8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBULCBmYWxsYmFjaz86IFBhcnRpYWw8UGJsTmdyaWRDb25maWdbVF0+KTogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQ7XHJcbiAgICBzZXQ8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBULCB2YWx1ZTogUGJsTmdyaWRDb25maWdbVF0pOiB2b2lkO1xyXG4gICAgb25VcGRhdGU8VCBleHRlbmRzIGtleW9mIFBibE5ncmlkQ29uZmlnPihzZWN0aW9uOiBUKTogT2JzZXJ2YWJsZTx7XHJcbiAgICAgICAgY3VycjogUGJsTmdyaWRDb25maWdbVF07XHJcbiAgICAgICAgcHJldjogUGJsTmdyaWRDb25maWdbVF0gfCB1bmRlZmluZWQ7XHJcbiAgICB9PjtcclxuICAgIHByaXZhdGUgZ2V0R2V0Tm90aWZpZXI7XHJcbiAgICBwcml2YXRlIG5vdGlmeTtcclxufVxyXG4iXX0=