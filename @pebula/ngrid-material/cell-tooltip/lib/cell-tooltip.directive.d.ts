import { Injector, OnDestroy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridCellEvent } from '@pebula/ngrid/target-events';
import * as ɵngcc0 from '@angular/core';
declare module '@pebula/ngrid/lib/grid/services/config' {
    interface PblNgridConfig {
        cellTooltip?: CellTooltipOptions & {
            /** When set to true will apply the default cell tooltip to ALL tables */
            autoSetAll?: boolean;
        };
    }
}
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        cellTooltip?: PblNgridCellTooltipDirective<any>;
    }
    interface PblNgridPluginExtensionFactories {
        cellTooltip: keyof typeof PblNgridCellTooltipDirective;
    }
}
export declare const PLUGIN_KEY: 'cellTooltip';
export interface CellTooltipOptions {
    canShow?: boolean | ((event: PblNgridCellEvent<any>) => boolean);
    message?: (event: PblNgridCellEvent<any>) => string;
}
export declare class PblNgridCellTooltipDirective<T> implements CellTooltipOptions, OnDestroy {
    private table;
    private injector;
    static readonly PLUGIN_KEY: 'cellTooltip';
    set canShow(value: boolean | ((event: PblNgridCellEvent<T>) => boolean));
    message: (event: PblNgridCellEvent<T>) => string;
    /** See Material docs for MatTooltip */
    position: TooltipPosition;
    /** See Material docs for MatTooltip */
    tooltipClass: string | string[] | Set<string> | {
        [key: string]: any;
    };
    /** See Material docs for MatTooltip */
    showDelay: number;
    /** See Material docs for MatTooltip */
    hideDelay: number;
    private initArgs;
    private toolTip;
    private lastConfig;
    private _removePlugin;
    private _canShow;
    constructor(table: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    static create<T = any>(table: PblNgridComponent<any>, injector: Injector): PblNgridCellTooltipDirective<T>;
    ngOnDestroy(): void;
    private init;
    private cellEnter;
    private cellLeave;
    private killTooltip;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCellTooltipDirective<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridCellTooltipDirective<any>, "[cellTooltip]", ["pblOverflowTooltip"], { "canShow": "cellTooltip"; "message": "message"; "position": "position"; "tooltipClass": "tooltipClass"; "showDelay": "showDelay"; "hideDelay": "hideDelay"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5kLnRzIiwic291cmNlcyI6WyJjZWxsLXRvb2x0aXAuZGlyZWN0aXZlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0b3IsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUb29sdGlwUG9zaXRpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxFdmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XHJcbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xyXG4gICAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcclxuICAgICAgICBjZWxsVG9vbHRpcD86IENlbGxUb29sdGlwT3B0aW9ucyAmIHtcclxuICAgICAgICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBhcHBseSB0aGUgZGVmYXVsdCBjZWxsIHRvb2x0aXAgdG8gQUxMIHRhYmxlcyAqL1xyXG4gICAgICAgICAgICBhdXRvU2V0QWxsPzogYm9vbGVhbjtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcclxuICAgIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XHJcbiAgICAgICAgY2VsbFRvb2x0aXA/OiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT47XHJcbiAgICB9XHJcbiAgICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xyXG4gICAgICAgIGNlbGxUb29sdGlwOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVjbGFyZSBjb25zdCBQTFVHSU5fS0VZOiAnY2VsbFRvb2x0aXAnO1xyXG5leHBvcnQgaW50ZXJmYWNlIENlbGxUb29sdGlwT3B0aW9ucyB7XHJcbiAgICBjYW5TaG93PzogYm9vbGVhbiB8ICgoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pID0+IGJvb2xlYW4pO1xyXG4gICAgbWVzc2FnZT86IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBDZWxsVG9vbHRpcE9wdGlvbnMsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIHRhYmxlO1xyXG4gICAgcHJpdmF0ZSBpbmplY3RvcjtcclxuICAgIHN0YXRpYyByZWFkb25seSBQTFVHSU5fS0VZOiAnY2VsbFRvb2x0aXAnO1xyXG4gICAgc2V0IGNhblNob3codmFsdWU6IGJvb2xlYW4gfCAoKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gYm9vbGVhbikpO1xyXG4gICAgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gc3RyaW5nO1xyXG4gICAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXHJcbiAgICBwb3NpdGlvbjogVG9vbHRpcFBvc2l0aW9uO1xyXG4gICAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXHJcbiAgICB0b29sdGlwQ2xhc3M6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7XHJcbiAgICAgICAgW2tleTogc3RyaW5nXTogYW55O1xyXG4gICAgfTtcclxuICAgIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xyXG4gICAgc2hvd0RlbGF5OiBudW1iZXI7XHJcbiAgICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cclxuICAgIGhpZGVEZWxheTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBpbml0QXJncztcclxuICAgIHByaXZhdGUgdG9vbFRpcDtcclxuICAgIHByaXZhdGUgbGFzdENvbmZpZztcclxuICAgIHByaXZhdGUgX3JlbW92ZVBsdWdpbjtcclxuICAgIHByaXZhdGUgX2NhblNob3c7XHJcbiAgICBjb25zdHJ1Y3Rvcih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpO1xyXG4gICAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPjtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIGluaXQ7XHJcbiAgICBwcml2YXRlIGNlbGxFbnRlcjtcclxuICAgIHByaXZhdGUgY2VsbExlYXZlO1xyXG4gICAgcHJpdmF0ZSBraWxsVG9vbHRpcDtcclxufVxyXG4iXX0=