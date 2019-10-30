import { Injector, OnDestroy } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridCellEvent } from '@pebula/ngrid/target-events';
declare module '@pebula/ngrid/lib/table/services/config' {
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
export interface CellTooltipOptions {
    canShow?: boolean | ((event: PblNgridCellEvent<any>) => boolean);
    message?: (event: PblNgridCellEvent<any>) => string;
}
export declare class PblNgridCellTooltipDirective<T> implements CellTooltipOptions, OnDestroy {
    private table;
    private injector;
    static readonly PLUGIN_KEY: 'cellTooltip';
    canShow: boolean | ((event: PblNgridCellEvent<T>) => boolean);
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
}
