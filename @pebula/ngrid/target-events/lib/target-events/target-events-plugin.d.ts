import { ReplaySubject } from 'rxjs';
import { EventEmitter, OnDestroy, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import * as Events from './events';
import * as ɵngcc0 from '@angular/core';
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
    get table(): PblNgridComponent<any>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridTargetEventsPluginDirective<any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridTargetEventsPluginDirective<any>, "pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]", never, {}, { "rowClick": "rowClick"; "rowDblClick": "rowDblClick"; "rowEnter": "rowEnter"; "rowLeave": "rowLeave"; "cellClick": "cellClick"; "cellDblClick": "cellDblClick"; "cellEnter": "cellEnter"; "cellLeave": "cellLeave"; "keyDown": "keyDown"; "keyUp": "keyUp"; }, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uZC50cyIsInNvdXJjZXMiOlsidGFyZ2V0LWV2ZW50cy1wbHVnaW4uZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcbmltcG9ydCAqIGFzIEV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XHJcbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xyXG4gICAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcclxuICAgICAgICB0YXJnZXRFdmVudHM/OiB7XHJcbiAgICAgICAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSB0YXJnZXQgZXZlbnRzIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXHJcbiAgICAgICAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xyXG4gICAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcclxuICAgICAgICB0YXJnZXRFdmVudHM/OiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjtcclxuICAgIH1cclxuICAgIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XHJcbiAgICAgICAgdGFyZ2V0RXZlbnRzOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY29uc3QgUExVR0lOX0tFWTogJ3RhcmdldEV2ZW50cyc7XHJcbmV4cG9ydCBkZWNsYXJlIGZ1bmN0aW9uIHJ1bk9uY2UoKTogdm9pZDtcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VCA9IGFueT4ge1xyXG4gICAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcclxuICAgIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyO1xyXG4gICAgcm93Q2xpY2s6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj47XHJcbiAgICByb3dEYmxDbGljazogRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PjtcclxuICAgIHJvd0VudGVyOiBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+O1xyXG4gICAgcm93TGVhdmU6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj47XHJcbiAgICBjZWxsQ2xpY2s6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pPjtcclxuICAgIGNlbGxEYmxDbGljazogRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPik+O1xyXG4gICAgY2VsbEVudGVyOiBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBNb3VzZUV2ZW50PiB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KT47XHJcbiAgICBjZWxsTGVhdmU6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pPjtcclxuICAgIG1vdXNlRG93bjogRXZlbnRFbWl0dGVyPCh7XHJcbiAgICAgICAgc291cmNlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICByb3dUYXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJvb3Q/OiAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPikgfCBFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PjtcclxuICAgIH0gJiBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KSB8ICh7XHJcbiAgICAgICAgc291cmNlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICByb3dUYXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJvb3Q/OiAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPikgfCBFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PjtcclxuICAgIH0gJiBFdmVudHMuUGJsTmdyaWRNYXRyaXhSb3c8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoe1xyXG4gICAgICAgIHNvdXJjZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgICAgICAgcm93VGFyZ2V0OiBIVE1MRWxlbWVudDtcclxuICAgICAgICByb290PzogKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pIHwgRXZlbnRzLlBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD47XHJcbiAgICB9ICYgRXZlbnRzLlBibE5ncmlkTWF0cml4Um93PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKHtcclxuICAgICAgICBzb3VyY2U6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gICAgICAgIHJvd1RhcmdldDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcm9vdD86IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+O1xyXG4gICAgfSAmIEV2ZW50cy5QYmxOZ3JpZE1hdHJpeFJvdzxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPik+O1xyXG4gICAgbW91c2VVcDogRXZlbnRFbWl0dGVyPCh7XHJcbiAgICAgICAgc291cmNlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICByb3dUYXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJvb3Q/OiAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPikgfCBFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PjtcclxuICAgIH0gJiBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KSB8ICh7XHJcbiAgICAgICAgc291cmNlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICByb3dUYXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJvb3Q/OiAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPikgfCBFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PjtcclxuICAgIH0gJiBFdmVudHMuUGJsTmdyaWRNYXRyaXhSb3c8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoe1xyXG4gICAgICAgIHNvdXJjZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgICAgICAgcm93VGFyZ2V0OiBIVE1MRWxlbWVudDtcclxuICAgICAgICByb290PzogKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pIHwgRXZlbnRzLlBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD47XHJcbiAgICB9ICYgRXZlbnRzLlBibE5ncmlkTWF0cml4Um93PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKHtcclxuICAgICAgICBzb3VyY2U6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gICAgICAgIHJvd1RhcmdldDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcm9vdD86IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+O1xyXG4gICAgfSAmIEV2ZW50cy5QYmxOZ3JpZE1hdHJpeFJvdzxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPik+O1xyXG4gICAga2V5VXA6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8S2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pIHwgKHtcclxuICAgICAgICBzb3VyY2U6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gICAgICAgIHJvd1RhcmdldDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcm9vdD86IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+O1xyXG4gICAgfSAmIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pIHwgKHtcclxuICAgICAgICBzb3VyY2U6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gICAgICAgIHJvd1RhcmdldDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcm9vdD86IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+O1xyXG4gICAgfSAmIEV2ZW50cy5QYmxOZ3JpZE1hdHJpeFJvdzxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8ICh7XHJcbiAgICAgICAgc291cmNlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICByb3dUYXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJvb3Q/OiAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPikgfCBFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PjtcclxuICAgIH0gJiBFdmVudHMuUGJsTmdyaWRNYXRyaXhSb3c8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoe1xyXG4gICAgICAgIHNvdXJjZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgICAgICAgcm93VGFyZ2V0OiBIVE1MRWxlbWVudDtcclxuICAgICAgICByb290PzogKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pIHwgRXZlbnRzLlBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD47XHJcbiAgICB9ICYgRXZlbnRzLlBibE5ncmlkTWF0cml4Um93PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pPjtcclxuICAgIGtleURvd246IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8S2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pIHwgKHtcclxuICAgICAgICBzb3VyY2U6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gICAgICAgIHJvd1RhcmdldDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcm9vdD86IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+O1xyXG4gICAgfSAmIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pIHwgKHtcclxuICAgICAgICBzb3VyY2U6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50O1xyXG4gICAgICAgIHJvd1RhcmdldDogSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgcm9vdD86IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcImRhdGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhLWdyb3VwXCI+KSB8IEV2ZW50cy5QYmxOZ3JpZERhdGFDZWxsRXZlbnQ8VCwgTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+O1xyXG4gICAgfSAmIEV2ZW50cy5QYmxOZ3JpZE1hdHJpeFJvdzxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8ICh7XHJcbiAgICAgICAgc291cmNlOiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudDtcclxuICAgICAgICByb3dUYXJnZXQ6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHJvb3Q/OiAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJkYXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGFcIj4pIHwgKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YS1ncm91cFwiPikgfCBFdmVudHMuUGJsTmdyaWREYXRhQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PjtcclxuICAgIH0gJiBFdmVudHMuUGJsTmdyaWRNYXRyaXhSb3c8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwibWV0YVwiPikgfCAoe1xyXG4gICAgICAgIHNvdXJjZTogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ7XHJcbiAgICAgICAgcm93VGFyZ2V0OiBIVE1MRWxlbWVudDtcclxuICAgICAgICByb290PzogKEV2ZW50cy5QYmxOZ3JpZEJhc2VDZWxsRXZlbnQ8TW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQ+ICYgRXZlbnRzLlBibE5ncmlkQ29sdW1uTWF0cml4UG9pbnQ8XCJmb290ZXJcIiB8IFwiaGVhZGVyXCIsIFwiZGF0YVwiPikgfCAoRXZlbnRzLlBibE5ncmlkQmFzZUNlbGxFdmVudDxNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD4gJiBFdmVudHMuUGJsTmdyaWRDb2x1bW5NYXRyaXhQb2ludDxcImZvb3RlclwiIHwgXCJoZWFkZXJcIiwgXCJtZXRhXCI+KSB8IChFdmVudHMuUGJsTmdyaWRCYXNlQ2VsbEV2ZW50PE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50PiAmIEV2ZW50cy5QYmxOZ3JpZENvbHVtbk1hdHJpeFBvaW50PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pIHwgRXZlbnRzLlBibE5ncmlkRGF0YUNlbGxFdmVudDxULCBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudD47XHJcbiAgICB9ICYgRXZlbnRzLlBibE5ncmlkTWF0cml4Um93PFwiZm9vdGVyXCIgfCBcImhlYWRlclwiLCBcIm1ldGEtZ3JvdXBcIj4pPjtcclxuICAgIC8qKiBAZGVwcmVjYXRlZCB1c2UgYGdpcmRgIGluc3RlYWQgKi9cclxuICAgIGdldCB0YWJsZSgpOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZDogUmVwbGF5U3ViamVjdDx2b2lkPjtcclxuICAgIHByaXZhdGUgX3JlbW92ZVBsdWdpbjtcclxuICAgIGNvbnN0cnVjdG9yKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKTtcclxuICAgIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+O1xyXG4gICAgcHJpdmF0ZSBpbml0O1xyXG4gICAgcHJpdmF0ZSBzZXR1cERvbUV2ZW50cztcclxuICAgIGRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgc3luY1JvdztcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbkRpcmVjdGl2ZTxUPiBleHRlbmRzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcik7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcbiJdfQ==