import { ReplaySubject } from 'rxjs';
import { EventEmitter, OnDestroy, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as Events from './events';
declare module '@pebula/ngrid/lib/grid/services/config' {
    interface PblNgridConfig {
        targetEvents?: {
            /** When set to true will enable the target events plugin on all table instances by default. */
            autoEnable?: boolean;
        };
    }
}
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        targetEvents?: PblNgridTargetEventsPlugin;
    }
    interface PblNgridPluginExtensionFactories {
        targetEvents: keyof typeof PblNgridTargetEventsPlugin;
    }
}
export declare const PLUGIN_KEY: 'targetEvents';
export declare function runOnce(): void;
export declare class PblNgridTargetEventsPlugin<T = any> {
    readonly grid: PblNgridComponent<any>;
    protected injector: Injector;
    protected pluginCtrl: PblNgridPluginController;
    rowClick: EventEmitter<Events.PblNgridRowEvent<T>>;
    rowDblClick: EventEmitter<Events.PblNgridRowEvent<T>>;
    rowEnter: EventEmitter<Events.PblNgridRowEvent<T>>;
    rowLeave: EventEmitter<Events.PblNgridRowEvent<T>>;
    cellClick: EventEmitter<Events.PblNgridDataCellEvent<T, MouseEvent> | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">)>;
    cellDblClick: EventEmitter<Events.PblNgridDataCellEvent<T, MouseEvent> | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">)>;
    cellEnter: EventEmitter<Events.PblNgridDataCellEvent<T, MouseEvent> | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">)>;
    cellLeave: EventEmitter<Events.PblNgridDataCellEvent<T, MouseEvent> | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">)>;
    mouseDown: EventEmitter<({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridDataMatrixRow<T>) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "data">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent> | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">)>;
    mouseUp: EventEmitter<({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridDataMatrixRow<T>) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "data">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent> | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">)>;
    keyUp: EventEmitter<Events.PblNgridDataCellEvent<T, KeyboardEvent> | (Events.PblNgridBaseCellEvent<KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridDataMatrixRow<T>) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "data">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta-group">)>;
    keyDown: EventEmitter<Events.PblNgridDataCellEvent<T, KeyboardEvent> | (Events.PblNgridBaseCellEvent<KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridDataMatrixRow<T>) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "data">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta">) | ({
        source: MouseEvent | KeyboardEvent;
        rowTarget: HTMLElement;
        root?: (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "data">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta">) | (Events.PblNgridBaseCellEvent<MouseEvent | KeyboardEvent> & Events.PblNgridColumnMatrixPoint<"footer" | "header", "meta-group">) | Events.PblNgridDataCellEvent<T, MouseEvent | KeyboardEvent>;
    } & Events.PblNgridMatrixRow<"footer" | "header", "meta-group">)>;
    /** @deprecated use `gird` instead */
    readonly table: PblNgridComponent<any>;
    protected readonly destroyed: ReplaySubject<void>;
    private _removePlugin;
    constructor(grid: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    static create<T = any>(table: PblNgridComponent<any>, injector: Injector): PblNgridTargetEventsPlugin<T>;
    private init;
    private setupDomEvents;
    destroy(): void;
    private syncRow;
}
export declare class PblNgridTargetEventsPluginDirective<T> extends PblNgridTargetEventsPlugin<T> implements OnDestroy {
    constructor(table: PblNgridComponent<any>, injector: Injector, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
}
