import { ElementRef } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { PblNgridComponent, PblNgridMultiTemplateRegistry } from '@pebula/ngrid';
import { PblNgridOverlayPanelComponentExtension } from './component-registry-extension';
import { PblNgridOverlayPanelRef } from './overlay-panel-ref';
import * as ɵngcc0 from '@angular/core';
declare module '@pebula/ngrid/lib/grid/services/grid-registry.service' {
    interface PblNgridMultiRegistryMap {
        overlayPanels?: PblNgridMultiTemplateRegistry<any, 'overlayPanels'> | PblNgridOverlayPanelComponentExtension<any>;
    }
}
export interface PblNgridOverlayPanelConfig {
    hasBackdrop?: boolean;
    backdropClass?: string;
    xPos?: 'before' | 'center' | 'after';
    yPos?: 'above' | 'center' | 'below';
    insetPos?: boolean;
}
export declare class PblNgridOverlayPanelFactory {
    private _overlay;
    private _dir;
    constructor(_overlay: Overlay, _dir: Directionality);
    create<T>(grid: PblNgridComponent<T>): PblNgridOverlayPanel<T>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridOverlayPanelFactory, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<PblNgridOverlayPanelFactory>;
}
export declare class PblNgridOverlayPanel<T = any> {
    private _overlay;
    private _dir;
    readonly grid: PblNgridComponent<T>;
    private vcRef;
    private injector;
    private _scrollStrategy;
    constructor(_overlay: Overlay, _dir: Directionality, grid: PblNgridComponent<T>);
    /**
     * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
     * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
     *
     * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
     * the rendered row index to use to get the cell from.
     *
     * > Note that this helper method does not allow targeting meta cells.
     */
    openGridCell<T = any>(extName: string, columnId: string, rowRenderPosition: number | 'header' | 'footer', config?: PblNgridOverlayPanelConfig, data?: T): PblNgridOverlayPanelRef<T>;
    open<T = any>(extName: string, source: ElementRef<HTMLElement>, config?: PblNgridOverlayPanelConfig, data?: T): PblNgridOverlayPanelRef<T>;
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    private _createOverlay;
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    private _getOverlayConfig;
    private _getTemplatePortal;
    private _getComponentPortal;
    private _setPosition;
    private findNamesExtension;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5zZXJ2aWNlLmQudHMiLCJzb3VyY2VzIjpbIm92ZXJsYXktcGFuZWwuc2VydmljZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uIH0gZnJvbSAnLi9jb21wb25lbnQtcmVnaXN0cnktZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYgfSBmcm9tICcuL292ZXJsYXktcGFuZWwtcmVmJztcclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJyB7XHJcbiAgICBpbnRlcmZhY2UgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIHtcclxuICAgICAgICBvdmVybGF5UGFuZWxzPzogUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8YW55LCAnb3ZlcmxheVBhbmVscyc+IHwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55PjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIHtcclxuICAgIGhhc0JhY2tkcm9wPzogYm9vbGVhbjtcclxuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XHJcbiAgICB4UG9zPzogJ2JlZm9yZScgfCAnY2VudGVyJyB8ICdhZnRlcic7XHJcbiAgICB5UG9zPzogJ2Fib3ZlJyB8ICdjZW50ZXInIHwgJ2JlbG93JztcclxuICAgIGluc2V0UG9zPzogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3Rvcnkge1xyXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTtcclxuICAgIHByaXZhdGUgX2RpcjtcclxuICAgIGNvbnN0cnVjdG9yKF9vdmVybGF5OiBPdmVybGF5LCBfZGlyOiBEaXJlY3Rpb25hbGl0eSk7XHJcbiAgICBjcmVhdGU8VD4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUPjtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUID0gYW55PiB7XHJcbiAgICBwcml2YXRlIF9vdmVybGF5O1xyXG4gICAgcHJpdmF0ZSBfZGlyO1xyXG4gICAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XHJcbiAgICBwcml2YXRlIHZjUmVmO1xyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjtcclxuICAgIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5O1xyXG4gICAgY29uc3RydWN0b3IoX292ZXJsYXk6IE92ZXJsYXksIF9kaXI6IERpcmVjdGlvbmFsaXR5LCBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPik7XHJcbiAgICAvKipcclxuICAgICAqIE9wZW5zIGEgcGFuZWwgcmVsYXRpdmUgdG8gYSBjZWxsIGVsZW1lbnQgdXNpbmcgdGhlIG92ZXJsYXkgcGFuZWwgZXh0ZW5zaW9uIHJlZ2lzdHJ5IHRlbXBsYXRlL2NvbXBvbmVudCB3aXRoIHRoZSBuYW1lIHByb3ZpZGVkIGluIGBleHROYW1lYC5cclxuICAgICAqIFRoZSBjZWxsIGVsZW1lbnQgaXMgcmVmZXJlbmNlZCBieSB0aGUgYGNvbHVtbklkYCBhbmQgdGhlIGByb3dSZW5kZXJQb3NpdGlvbmAuXHJcbiAgICAgKlxyXG4gICAgICogSWYgdGhlIGByb3dSZW5kZXJQb3NpdGlvbmAgaXMgXCJoZWFkZXJcIiBvciBcImZvb3RlclwiIHRoZW4gdGhlIGdyaWQncyBoZWFkZXIgLyBmb290ZXIgcm93cyBhcmUgdGFyZ2V0ZWQsIG90aGVyd2lzZSB0aGUgbnVtYmVyIHByb3ZpZGVkIHNob3VsZCByZWZlcmVuY2VcclxuICAgICAqIHRoZSByZW5kZXJlZCByb3cgaW5kZXggdG8gdXNlIHRvIGdldCB0aGUgY2VsbCBmcm9tLlxyXG4gICAgICpcclxuICAgICAqID4gTm90ZSB0aGF0IHRoaXMgaGVscGVyIG1ldGhvZCBkb2VzIG5vdCBhbGxvdyB0YXJnZXRpbmcgbWV0YSBjZWxscy5cclxuICAgICAqL1xyXG4gICAgb3BlbkdyaWRDZWxsPFQgPSBhbnk+KGV4dE5hbWU6IHN0cmluZywgY29sdW1uSWQ6IHN0cmluZywgcm93UmVuZGVyUG9zaXRpb246IG51bWJlciB8ICdoZWFkZXInIHwgJ2Zvb3RlcicsIGNvbmZpZz86IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnLCBkYXRhPzogVCk6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFQ+O1xyXG4gICAgb3BlbjxUID0gYW55PihleHROYW1lOiBzdHJpbmcsIHNvdXJjZTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGNvbmZpZz86IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnLCBkYXRhPzogVCk6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFQ+O1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBvdmVybGF5IGZyb20gdGhlIHByb3ZpZGVkIG1lbnUncyB0ZW1wbGF0ZSBhbmQgc2F2ZXMgaXRzXHJcbiAgICAgKiBPdmVybGF5UmVmIHNvIHRoYXQgaXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gd2hlbiBvcGVuTWVudSBpcyBjYWxsZWQuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXk7XHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGJ1aWxkcyB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgb3ZlcmxheSwgdGhlIE92ZXJsYXlTdGF0ZS5cclxuICAgICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZztcclxuICAgIHByaXZhdGUgX2dldFRlbXBsYXRlUG9ydGFsO1xyXG4gICAgcHJpdmF0ZSBfZ2V0Q29tcG9uZW50UG9ydGFsO1xyXG4gICAgcHJpdmF0ZSBfc2V0UG9zaXRpb247XHJcbiAgICBwcml2YXRlIGZpbmROYW1lc0V4dGVuc2lvbjtcclxufVxyXG4iXX0=