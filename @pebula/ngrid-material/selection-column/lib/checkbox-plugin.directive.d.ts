import { Injector, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        matCheckboxSelection?: PblNgridMatCheckboxSelectionDirective;
    }
}
export declare class PblNgridMatCheckboxSelectionDirective implements OnDestroy {
    private table;
    private cfr;
    private injector;
    isCheckboxDisabled: (row: any) => boolean;
    /**
     * Add's a selection column using material's `mat-checkbox` in the column specified.
     */
    matCheckboxSelection: string;
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     */
    bulkSelectMode: 'all' | 'view' | 'none';
    matCheckboxSelectionColor: ThemePalette;
    private _name;
    private _bulkSelectMode;
    private _color;
    private cmpRef;
    private _removePlugin;
    private _isCheckboxDisabled;
    constructor(table: PblNgridComponent<any>, cfr: ComponentFactoryResolver, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
}
