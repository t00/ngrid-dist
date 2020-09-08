import { Observable } from 'rxjs';
import { ChangeDetectorRef, ElementRef, IterableDiffers, OnDestroy, Injector } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { CdkTable, DataRowOutlet, CdkHeaderRowDef, CdkFooterRowDef } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { PblNgridComponent } from '../ngrid.component';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
/**
 * Wrapper for the CdkTable that extends it's functionality to support various table features.
 * This wrapper also applies Material Design table styles (i.e. `MatTable` styles).
 *
 * Most of the extensions are done using mixins, this is mostly for clarity and separation of the features added.
 * This approach will allow easy removal when a feature is no longer required/implemented natively.
 */
import * as ɵngcc0 from '@angular/core';
export declare class PblCdkTableComponent<T> extends CdkTable<T> implements OnDestroy {
    protected injector: Injector;
    protected grid: PblNgridComponent<T>;
    protected extApi: PblNgridExtensionApi<T>;
    get _element(): HTMLElement;
    get onRenderRows(): Observable<DataRowOutlet>;
    get minWidth(): number | null;
    set minWidth(value: number | null);
    private _minWidth;
    private onRenderRows$;
    private _lastSticky;
    private _lastStickyEnd;
    private _isStickyPending;
    constructor(_differs: IterableDiffers, _changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef<HTMLElement>, role: string, _dir: Directionality, injector: Injector, grid: PblNgridComponent<T>, extApi: PblNgridExtensionApi<T>, _document?: any, platform?: Platform);
    updateStickyColumnStyles(): void;
    ngOnDestroy(): void;
    addClass(cssClassName: string): void;
    removeClass(cssClassName: string): void;
    private _cachedRowDefs;
    addHeaderRowDef(headerRowDef: CdkHeaderRowDef): void;
    clearHeaderRowDefs(): void;
    addFooterRowDef(footerRowDef: CdkFooterRowDef): void;
    clearFooterRowDefs(): void;
    private forOf;
    attachViewPort(): void;
    detachViewPort(): void;
    private virtualScrollDestroy;
    /**
     * An alias for `_cacheRowDefs()`
     */
    updateRowDefCache(): void;
    renderRows(): void;
    /**
     * Force run change detection for rows.
     * You can run it for specific groups or for all rows.
     */
    syncRows(rowType?: 'all' | boolean, detectChanges?: boolean): void;
    syncRows(rowType: 'header' | 'data' | 'footer', detectChanges: boolean, ...rows: number[]): void;
    syncRows(rowType: 'header' | 'data' | 'footer', ...rows: number[]): void;
    pblForceRenderDataRows(): void;
    private _updateStickyColumnStyles;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblCdkTableComponent<any>, [null, null, null, { attribute: "role"; }, { optional: true; }, null, null, null, null, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblCdkTableComponent<any>, "pbl-cdk-table", ["pblCdkTable"], {}, {}, never, ["caption"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGJsLWNkay10YWJsZS5jb21wb25lbnQuZC50cyIsInNvdXJjZXMiOlsicGJsLWNkay10YWJsZS5jb21wb25lbnQuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgRWxlbWVudFJlZiwgSXRlcmFibGVEaWZmZXJzLCBPbkRlc3Ryb3ksIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcclxuaW1wb3J0IHsgQ2RrVGFibGUsIERhdGFSb3dPdXRsZXQsIENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcclxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcclxuLyoqXHJcbiAqIFdyYXBwZXIgZm9yIHRoZSBDZGtUYWJsZSB0aGF0IGV4dGVuZHMgaXQncyBmdW5jdGlvbmFsaXR5IHRvIHN1cHBvcnQgdmFyaW91cyB0YWJsZSBmZWF0dXJlcy5cclxuICogVGhpcyB3cmFwcGVyIGFsc28gYXBwbGllcyBNYXRlcmlhbCBEZXNpZ24gdGFibGUgc3R5bGVzIChpLmUuIGBNYXRUYWJsZWAgc3R5bGVzKS5cclxuICpcclxuICogTW9zdCBvZiB0aGUgZXh0ZW5zaW9ucyBhcmUgZG9uZSB1c2luZyBtaXhpbnMsIHRoaXMgaXMgbW9zdGx5IGZvciBjbGFyaXR5IGFuZCBzZXBhcmF0aW9uIG9mIHRoZSBmZWF0dXJlcyBhZGRlZC5cclxuICogVGhpcyBhcHByb2FjaCB3aWxsIGFsbG93IGVhc3kgcmVtb3ZhbCB3aGVuIGEgZmVhdHVyZSBpcyBubyBsb25nZXIgcmVxdWlyZWQvaW1wbGVtZW50ZWQgbmF0aXZlbHkuXHJcbiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxDZGtUYWJsZUNvbXBvbmVudDxUPiBleHRlbmRzIENka1RhYmxlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XHJcbiAgICBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPjtcclxuICAgIGdldCBfZWxlbWVudCgpOiBIVE1MRWxlbWVudDtcclxuICAgIGdldCBvblJlbmRlclJvd3MoKTogT2JzZXJ2YWJsZTxEYXRhUm93T3V0bGV0PjtcclxuICAgIGdldCBtaW5XaWR0aCgpOiBudW1iZXIgfCBudWxsO1xyXG4gICAgc2V0IG1pbldpZHRoKHZhbHVlOiBudW1iZXIgfCBudWxsKTtcclxuICAgIHByaXZhdGUgX21pbldpZHRoO1xyXG4gICAgcHJpdmF0ZSBvblJlbmRlclJvd3MkO1xyXG4gICAgcHJpdmF0ZSBfbGFzdFN0aWNreTtcclxuICAgIHByaXZhdGUgX2xhc3RTdGlja3lFbmQ7XHJcbiAgICBwcml2YXRlIF9pc1N0aWNreVBlbmRpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHJvbGU6IHN0cmluZywgX2RpcjogRGlyZWN0aW9uYWxpdHksIGluamVjdG9yOiBJbmplY3RvciwgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4sIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4sIF9kb2N1bWVudD86IGFueSwgcGxhdGZvcm0/OiBQbGF0Zm9ybSk7XHJcbiAgICB1cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTogdm9pZDtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBhZGRDbGFzcyhjc3NDbGFzc05hbWU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyhjc3NDbGFzc05hbWU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9jYWNoZWRSb3dEZWZzO1xyXG4gICAgYWRkSGVhZGVyUm93RGVmKGhlYWRlclJvd0RlZjogQ2RrSGVhZGVyUm93RGVmKTogdm9pZDtcclxuICAgIGNsZWFySGVhZGVyUm93RGVmcygpOiB2b2lkO1xyXG4gICAgYWRkRm9vdGVyUm93RGVmKGZvb3RlclJvd0RlZjogQ2RrRm9vdGVyUm93RGVmKTogdm9pZDtcclxuICAgIGNsZWFyRm9vdGVyUm93RGVmcygpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBmb3JPZjtcclxuICAgIGF0dGFjaFZpZXdQb3J0KCk6IHZvaWQ7XHJcbiAgICBkZXRhY2hWaWV3UG9ydCgpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSB2aXJ0dWFsU2Nyb2xsRGVzdHJveTtcclxuICAgIC8qKlxyXG4gICAgICogQW4gYWxpYXMgZm9yIGBfY2FjaGVSb3dEZWZzKClgXHJcbiAgICAgKi9cclxuICAgIHVwZGF0ZVJvd0RlZkNhY2hlKCk6IHZvaWQ7XHJcbiAgICByZW5kZXJSb3dzKCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEZvcmNlIHJ1biBjaGFuZ2UgZGV0ZWN0aW9uIGZvciByb3dzLlxyXG4gICAgICogWW91IGNhbiBydW4gaXQgZm9yIHNwZWNpZmljIGdyb3VwcyBvciBmb3IgYWxsIHJvd3MuXHJcbiAgICAgKi9cclxuICAgIHN5bmNSb3dzKHJvd1R5cGU/OiAnYWxsJyB8IGJvb2xlYW4sIGRldGVjdENoYW5nZXM/OiBib29sZWFuKTogdm9pZDtcclxuICAgIHN5bmNSb3dzKHJvd1R5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIGRldGVjdENoYW5nZXM6IGJvb2xlYW4sIC4uLnJvd3M6IG51bWJlcltdKTogdm9pZDtcclxuICAgIHN5bmNSb3dzKHJvd1R5cGU6ICdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIC4uLnJvd3M6IG51bWJlcltdKTogdm9pZDtcclxuICAgIHBibEZvcmNlUmVuZGVyRGF0YVJvd3MoKTogdm9pZDtcclxuICAgIHByaXZhdGUgX3VwZGF0ZVN0aWNreUNvbHVtblN0eWxlcztcclxufVxyXG4iXX0=