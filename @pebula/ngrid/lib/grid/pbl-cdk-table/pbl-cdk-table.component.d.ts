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
export declare class PblCdkTableComponent<T> extends CdkTable<T> implements OnDestroy {
    protected injector: Injector;
    protected grid: PblNgridComponent<T>;
    protected extApi: PblNgridExtensionApi<T>;
    readonly _element: HTMLElement;
    readonly onRenderRows: Observable<DataRowOutlet>;
    minWidth: number | null;
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
}
