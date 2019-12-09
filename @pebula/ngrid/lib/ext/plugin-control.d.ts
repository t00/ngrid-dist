import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { PblNgridComponent } from '../table/table.component';
import { PblNgridPluginExtension, PblNgridPluginExtensionFactories, PblNgridEvents } from './types';
import { PblNgridExtensionApi } from './table-ext-api';
/** @internal */
export declare class PblNgridPluginContext<T = any> {
    static create<T = any>(table: PblNgridComponent<any>, injector: Injector, extApi: PblNgridExtensionApi): PblNgridPluginContext<T>;
    table: PblNgridComponent<any>;
    injector: Injector;
    extApi: PblNgridExtensionApi;
    controller: PblNgridPluginController<T>;
    readonly events: Observable<PblNgridEvents>;
    private _events;
    private constructor();
    emitEvent(event: PblNgridEvents): void;
    destroy(): void;
}
export declare class PblNgridPluginController<T = any> {
    private context;
    private static readonly created$;
    static readonly created: Observable<{
        table: PblNgridComponent<any>;
        controller: PblNgridPluginController<any>;
    }>;
    readonly injector: Injector;
    readonly extApi: PblNgridExtensionApi;
    readonly events: Observable<PblNgridEvents>;
    private readonly grid;
    private readonly plugins;
    constructor(context: PblNgridPluginContext);
    static find<T = any>(grid: PblNgridComponent<T>): PblNgridPluginController<T> | undefined;
    hasPlugin<P extends keyof PblNgridPluginExtension>(name: P): boolean;
    getPlugin<P extends keyof PblNgridPluginExtension>(name: P): PblNgridPluginExtension[P] | undefined;
    /**
     * Registers the `plugin` with the `name` with the `table`
     */
    setPlugin<P extends keyof PblNgridPluginExtension>(name: P, plugin: PblNgridPluginExtension[P]): (table: PblNgridComponent<any>) => void;
    createPlugin<P extends (keyof PblNgridPluginExtensionFactories & keyof PblNgridPluginExtension)>(name: P): PblNgridPluginExtension[P];
}
