import { Observable } from 'rxjs';
import { OnDestroy, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridStateLoadOptions, PblNgridStateSaveOptions } from './core/index';
declare module '@pebula/ngrid/lib/table/services/config' {
    interface PblNgridConfig {
        state?: {
            /** When set to true will enable the state plugin on all table instances by default. */
            autoEnable?: boolean;
            /**
             * Options to use when auto-loading the plugin
             */
            autoEnableOptions?: {
                loadOptions?: PblNgridStateLoadOptions;
                saveOptions?: PblNgridStateSaveOptions;
            };
        };
    }
}
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        state?: PblNgridStatePlugin;
    }
    interface PblNgridPluginExtensionFactories {
        state: keyof typeof PblNgridStatePlugin;
    }
}
export declare const PLUGIN_KEY: 'state';
export declare class PblNgridStatePlugin {
    grid: PblNgridComponent<any>;
    protected injector: Injector;
    protected pluginCtrl: PblNgridPluginController;
    loadOptions?: PblNgridStateLoadOptions;
    saveOptions?: PblNgridStateSaveOptions;
    afterLoadState: Observable<void>;
    afterSaveState: Observable<void>;
    onError: Observable<{
        phase: 'save' | 'load';
        error: Error;
    }>;
    private _removePlugin;
    private _events;
    constructor(grid: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    static create(table: PblNgridComponent<any>, injector: Injector): PblNgridStatePlugin;
    load(): Promise<void>;
    save(): Promise<void>;
    destroy(): void;
    private _load;
}
export declare class PblNgridStatePluginDirective extends PblNgridStatePlugin implements OnDestroy {
    loadOptions: PblNgridStateLoadOptions;
    saveOptions: PblNgridStateSaveOptions;
    constructor(grid: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
}
