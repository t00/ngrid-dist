import { Injector, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
export declare class PblNgridCellEditDirective<T> implements OnDestroy {
    set cellEditClick(value: boolean);
    set cellEditDblClick(value: boolean);
    private _click;
    private _dblClick;
    private targetEventsPlugin;
    constructor(grid: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
    private update;
}
