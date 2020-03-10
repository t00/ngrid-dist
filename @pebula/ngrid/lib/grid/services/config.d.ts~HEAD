import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';
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
}
