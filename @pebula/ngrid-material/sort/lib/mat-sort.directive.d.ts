import { OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as ɵngcc0 from '@angular/core';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        matSort?: PblNgridMatSortDirective;
    }
}
export declare const PLUGIN_KEY: 'matSort';
export declare class PblNgridMatSortDirective implements OnDestroy {
    table: PblNgridComponent<any>;
    private pluginCtrl;
    sort: MatSort;
    private _removePlugin;
    constructor(table: PblNgridComponent<any>, pluginCtrl: PblNgridPluginController, sort: MatSort);
    ngOnDestroy(): void;
    private onSort;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridMatSortDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridMatSortDirective, "pbl-ngrid[matSort]", ["pblMatSort"], {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmQudHMiLCJzb3VyY2VzIjpbIm1hdC1zb3J0LmRpcmVjdGl2ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICdAcGVidWxhL25ncmlkJztcclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xyXG4gICAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcclxuICAgICAgICBtYXRTb3J0PzogUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IFBMVUdJTl9LRVk6ICdtYXRTb3J0JztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgcHJpdmF0ZSBwbHVnaW5DdHJsO1xyXG4gICAgc29ydDogTWF0U29ydDtcclxuICAgIHByaXZhdGUgX3JlbW92ZVBsdWdpbjtcclxuICAgIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIHNvcnQ6IE1hdFNvcnQpO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgb25Tb3J0O1xyXG59XHJcbiJdfQ==