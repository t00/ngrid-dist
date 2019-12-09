import { Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
export declare class PblNgridCellEditDirective<T> {
    cellEditClick: boolean;
    cellEditDblClick: boolean;
    private _click;
    private _dblClick;
    private targetEventsPlugin;
    constructor(table: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    private update;
}
