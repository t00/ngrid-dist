import { Injector, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as ɵngcc0 from '@angular/core';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        matCheckboxSelection?: PblNgridMatCheckboxSelectionDirective;
    }
}
export declare const PLUGIN_KEY: 'matCheckboxSelection';
export declare class PblNgridMatCheckboxSelectionDirective implements OnDestroy {
    private table;
    private cfr;
    private injector;
    get isCheckboxDisabled(): (row: any) => boolean;
    set isCheckboxDisabled(value: (row: any) => boolean);
    /**
     * Add's a selection column using material's `mat-checkbox` in the column specified.
     */
    get matCheckboxSelection(): string;
    set matCheckboxSelection(value: string);
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     */
    get bulkSelectMode(): 'all' | 'view' | 'none';
    set bulkSelectMode(value: 'all' | 'view' | 'none');
    get matCheckboxSelectionColor(): ThemePalette;
    set matCheckboxSelectionColor(value: ThemePalette);
    private _name;
    private _bulkSelectMode;
    private _color;
    private cmpRef;
    private _removePlugin;
    private _isCheckboxDisabled;
    constructor(table: PblNgridComponent<any>, cfr: ComponentFactoryResolver, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridMatCheckboxSelectionDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridMatCheckboxSelectionDirective, "pbl-ngrid[matCheckboxSelection]", never, { "isCheckboxDisabled": "isCheckboxDisabled"; "matCheckboxSelection": "matCheckboxSelection"; "bulkSelectMode": "bulkSelectMode"; "matCheckboxSelectionColor": "matCheckboxSelectionColor"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcGx1Z2luLmRpcmVjdGl2ZS5kLnRzIiwic291cmNlcyI6WyJjaGVja2JveC1wbHVnaW4uZGlyZWN0aXZlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0b3IsIE9uRGVzdHJveSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcclxuICAgIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XHJcbiAgICAgICAgbWF0Q2hlY2tib3hTZWxlY3Rpb24/OiBQYmxOZ3JpZE1hdENoZWNrYm94U2VsZWN0aW9uRGlyZWN0aXZlO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IFBMVUdJTl9LRVk6ICdtYXRDaGVja2JveFNlbGVjdGlvbic7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSB0YWJsZTtcclxuICAgIHByaXZhdGUgY2ZyO1xyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjtcclxuICAgIGdldCBpc0NoZWNrYm94RGlzYWJsZWQoKTogKHJvdzogYW55KSA9PiBib29sZWFuO1xyXG4gICAgc2V0IGlzQ2hlY2tib3hEaXNhYmxlZCh2YWx1ZTogKHJvdzogYW55KSA9PiBib29sZWFuKTtcclxuICAgIC8qKlxyXG4gICAgICogQWRkJ3MgYSBzZWxlY3Rpb24gY29sdW1uIHVzaW5nIG1hdGVyaWFsJ3MgYG1hdC1jaGVja2JveGAgaW4gdGhlIGNvbHVtbiBzcGVjaWZpZWQuXHJcbiAgICAgKi9cclxuICAgIGdldCBtYXRDaGVja2JveFNlbGVjdGlvbigpOiBzdHJpbmc7XHJcbiAgICBzZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb24odmFsdWU6IHN0cmluZyk7XHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGJlaGF2aW9yIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJ1bGsgc2VsZWN0IGNoZWNrYm94IChoZWFkZXIpLlxyXG4gICAgICogVGhlcmUgYXJlIDIgb3B0aW9uczpcclxuICAgICAqXHJcbiAgICAgKiAtIGFsbDogV2lsbCBzZWxlY3QgYWxsIGl0ZW1zIGluIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cclxuICAgICAqIC0gdmlldzogV2lsbCBzZWxlY3Qgb25seSB0aGUgcmVuZGVyZWQgaXRlbXMgaW4gdGhlIHZpZXdcclxuICAgICAqXHJcbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYWxsYFxyXG4gICAgICovXHJcbiAgICBnZXQgYnVsa1NlbGVjdE1vZGUoKTogJ2FsbCcgfCAndmlldycgfCAnbm9uZSc7XHJcbiAgICBzZXQgYnVsa1NlbGVjdE1vZGUodmFsdWU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnKTtcclxuICAgIGdldCBtYXRDaGVja2JveFNlbGVjdGlvbkNvbG9yKCk6IFRoZW1lUGFsZXR0ZTtcclxuICAgIHNldCBtYXRDaGVja2JveFNlbGVjdGlvbkNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpO1xyXG4gICAgcHJpdmF0ZSBfbmFtZTtcclxuICAgIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlO1xyXG4gICAgcHJpdmF0ZSBfY29sb3I7XHJcbiAgICBwcml2YXRlIGNtcFJlZjtcclxuICAgIHByaXZhdGUgX3JlbW92ZVBsdWdpbjtcclxuICAgIHByaXZhdGUgX2lzQ2hlY2tib3hEaXNhYmxlZDtcclxuICAgIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxufVxyXG4iXX0=