import { OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
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
}
