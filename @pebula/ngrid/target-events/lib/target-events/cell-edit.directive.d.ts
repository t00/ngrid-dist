import { Injector, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridCellEditDirective<T> implements OnDestroy {
    set cellEditClick(value: boolean);
    set cellEditDblClick(value: boolean);
    private _click;
    private _dblClick;
    private targetEventsPlugin;
    constructor(grid: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
    private update;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCellEditDirective<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridCellEditDirective<any>, "pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]", never, { "cellEditClick": "cellEditClick"; "cellEditDblClick": "cellEditDblClick"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1lZGl0LmRpcmVjdGl2ZS5kLnRzIiwic291cmNlcyI6WyJjZWxsLWVkaXQuZGlyZWN0aXZlLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0b3IsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xyXG4gICAgc2V0IGNlbGxFZGl0Q2xpY2sodmFsdWU6IGJvb2xlYW4pO1xyXG4gICAgc2V0IGNlbGxFZGl0RGJsQ2xpY2sodmFsdWU6IGJvb2xlYW4pO1xyXG4gICAgcHJpdmF0ZSBfY2xpY2s7XHJcbiAgICBwcml2YXRlIF9kYmxDbGljaztcclxuICAgIHByaXZhdGUgdGFyZ2V0RXZlbnRzUGx1Z2luO1xyXG4gICAgY29uc3RydWN0b3IoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgdXBkYXRlO1xyXG59XHJcbiJdfQ==