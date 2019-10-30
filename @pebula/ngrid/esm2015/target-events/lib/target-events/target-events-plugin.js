import * as tslib_1 from "tslib";
var PblNgridTargetEventsPlugin_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, ChangeDetectorRef, Injector } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, PblColumn, TablePlugin } from '@pebula/ngrid';
import { matrixRowFromRow, isRowContainer, findCellRenderIndex, findParentCell } from './utils';
import { handleFocusAndSelection } from './focus-and-selection';
/** @type {?} */
export const PLUGIN_KEY = 'targetEvents';
/**
 * @param {?} source
 * @return {?}
 */
function hasListeners(source) {
    return source.observers.length > 0;
}
/**
 * @param {?} source
 * @return {?}
 */
function findEventSource(source) {
    /** @type {?} */
    const cellTarget = findParentCell((/** @type {?} */ (source.target)));
    if (cellTarget) {
        return { type: 'cell', target: cellTarget };
    }
    else if (isRowContainer((/** @type {?} */ (source.target)))) {
        return { type: 'cell', target: (/** @type {?} */ (source.target)) };
    }
}
/**
 * @return {?}
 */
export function runOnce() {
    PblColumn.extendProperty('editable');
}
/**
 * @template T
 */
let PblNgridTargetEventsPlugin = PblNgridTargetEventsPlugin_1 = /**
 * @template T
 */
class PblNgridTargetEventsPlugin {
    /**
     * @param {?} table
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(table, injector, pluginCtrl) {
        this.table = table;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this.rowClick = new EventEmitter();
        this.rowDblClick = new EventEmitter();
        this.rowEnter = new EventEmitter();
        this.rowLeave = new EventEmitter();
        this.cellClick = new EventEmitter();
        this.cellDblClick = new EventEmitter();
        this.cellEnter = new EventEmitter();
        this.cellLeave = new EventEmitter();
        this.mouseDown = new EventEmitter();
        this.mouseUp = new EventEmitter();
        this.keyUp = new EventEmitter();
        this.keyDown = new EventEmitter();
        this.destroyed = new ReplaySubject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.cdr = injector.get(ChangeDetectorRef);
        if (table.isInit) {
            this.init();
        }
        else {
            /** @type {?} */
            let subscription = pluginCtrl.events
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event.kind === 'onInit') {
                    this.init();
                    subscription.unsubscribe();
                    subscription = undefined;
                }
            }));
        }
    }
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    static create(table, injector) {
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridTargetEventsPlugin_1(table, injector, pluginCtrl);
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this.setupDomEvents();
        handleFocusAndSelection(this);
    }
    /**
     * @private
     * @return {?}
     */
    setupDomEvents() {
        /** @type {?} */
        const table = this.table;
        /** @type {?} */
        const cdkTable = table._cdkTable;
        /** @type {?} */
        const cdkTableElement = cdkTable['_element'];
        /** @type {?} */
        const createCellEvent = (/**
         * @template TEvent
         * @param {?} cellTarget
         * @param {?} source
         * @return {?}
         */
        (cellTarget, source) => {
            /** @type {?} */
            const rowTarget = cellTarget.parentElement;
            /** @type {?} */
            const matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
            if (matrixPoint) {
                /** @type {?} */
                const event = (/** @type {?} */ (Object.assign({}, matrixPoint, { source, cellTarget, rowTarget })));
                if (matrixPoint.type === 'data') {
                    ((/** @type {?} */ (event))).row = table.ds.renderedData[matrixPoint.rowIndex];
                }
                else if (event.subType === 'meta') {
                    // When multiple containers exists (fixed/sticky/row) the rowIndex we get is the one relative to the container..
                    // We need to find the rowIndex relative to the definitions:
                    const { metaRowService } = this.pluginCtrl.extApi;
                    /** @type {?} */
                    const db = event.type === 'header' ? metaRowService.header : metaRowService.footer;
                    for (const coll of [db.fixed, db.row, db.sticky]) {
                        /** @type {?} */
                        const result = coll.find((/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.el === event.rowTarget));
                        if (result) {
                            event.rowIndex = result.index;
                            break;
                        }
                    }
                }
                /* `metadataFromElement()` does not provide column information nor the column itself. This will extend functionality to add the columnIndex and column.
                    The simple case is when `subType === 'data'`, in this case the column is always the data column for all types (header, data and footer)
        
                    If `subType !== 'data'` we need to get the proper column based type (type can only be `header` or `footer` at this point).
                    But that's not all, because `metadataFromElement()` does not handle `meta-group` subType we need to do it here...
                */
                event.colIndex = findCellRenderIndex(cellTarget);
                if (matrixPoint.subType === 'data') {
                    /** @type {?} */
                    const column = this.table.columnApi.findColumnAt(event.colIndex);
                    /** @type {?} */
                    const columnIndex = this.table.columnApi.indexOf(column);
                    event.column = column;
                    ((/** @type {?} */ (event))).context = this.pluginCtrl.extApi.contextApi.getCell(event.rowIndex, columnIndex);
                }
                else {
                    /** @type {?} */
                    const store = this.pluginCtrl.extApi.columnStore;
                    /** @type {?} */
                    const rowInfo = store.metaColumnIds[matrixPoint.type][event.rowIndex];
                    /** @type {?} */
                    const record = store.find(rowInfo.keys[event.colIndex]);
                    if (rowInfo.isGroup) {
                        event.subType = 'meta-group';
                        event.column = matrixPoint.type === 'header' ? record.headerGroup : record.footerGroup;
                    }
                    else {
                        event.column = matrixPoint.type === 'header' ? record.header : record.footer;
                    }
                }
                return event;
            }
        });
        /** @type {?} */
        const createRowEvent = (/**
         * @template TEvent
         * @param {?} rowTarget
         * @param {?} source
         * @param {?=} root
         * @return {?}
         */
        (rowTarget, source, root) => {
            if (root) {
                /** @type {?} */
                const event = (/** @type {?} */ ({
                    source,
                    rowTarget,
                    type: root.type,
                    subType: root.subType,
                    rowIndex: root.rowIndex,
                    root
                }));
                if (root.type === 'data') {
                    ((/** @type {?} */ (event))).row = root.row;
                    ((/** @type {?} */ (event))).context = root.context.rowContext;
                }
                return event;
            }
            else {
                /** @type {?} */
                const matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
                if (matrixPoint) {
                    /** @type {?} */
                    const event = (/** @type {?} */ (Object.assign({}, matrixPoint, { source, rowTarget })));
                    if (matrixPoint.type === 'data') {
                        ((/** @type {?} */ (event))).context = this.pluginCtrl.extApi.contextApi.getRow(matrixPoint.rowIndex);
                        ((/** @type {?} */ (event))).row = ((/** @type {?} */ (event))).context.$implicit;
                    }
                    /*  If `subType !== 'data'` it can only be `meta` because `metadataFromElement()` does not handle `meta-group` subType.
                        We need to extend this missing part, we don't have columns here so we will try to infer it using the first column.
          
                        It's similar to how it's handled in cell clicks, but here we don't need to extends the column info.
                        We only need to change the `subType` when the row is a group row, getting a specific column is irrelevant.
                        We just need A column because group columns don't mix with regular meta columns.
          
                        NOTE: When subType is not 'data' the ype can only be `header` or `footer`.
                    */
                    if (matrixPoint.subType !== 'data') {
                        /** @type {?} */
                        const rowInfo = this.pluginCtrl.extApi.columnStore.metaColumnIds[matrixPoint.type][event.rowIndex];
                        if (rowInfo.isGroup) {
                            event.subType = 'meta-group';
                        }
                    }
                    return event;
                }
            }
        });
        /** @type {?} */
        let lastCellEnterEvent;
        /** @type {?} */
        let lastRowEnterEvent;
        /** @type {?} */
        const emitCellLeave = (/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            if (lastCellEnterEvent) {
                /** @type {?} */
                const lastCellEnterEventTemp = lastCellEnterEvent;
                this.cellLeave.emit(Object.assign({}, lastCellEnterEventTemp, { source }));
                lastCellEnterEvent = undefined;
                return lastCellEnterEventTemp;
            }
        });
        /** @type {?} */
        const emitRowLeave = (/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            if (lastRowEnterEvent) {
                /** @type {?} */
                const lastRowEnterEventTemp = lastRowEnterEvent;
                this.rowLeave.emit(Object.assign({}, lastRowEnterEventTemp, { source }));
                lastRowEnterEvent = undefined;
                return lastRowEnterEventTemp;
            }
        });
        /** @type {?} */
        const processEvent = (/**
         * @template TEvent
         * @param {?} e
         * @return {?}
         */
        (e) => {
            /** @type {?} */
            const result = findEventSource(e);
            if (result) {
                if (result.type === 'cell') {
                    /** @type {?} */
                    const event = createCellEvent(result.target, e);
                    if (event) {
                        return {
                            type: result.type,
                            event,
                            waitTime: hasListeners(this.cellDblClick) ? 250 : 1,
                        };
                    }
                }
                else if (result.type === 'row') {
                    /** @type {?} */
                    const event = createRowEvent(result.target, e);
                    if (event) {
                        return {
                            type: result.type,
                            event,
                            waitTime: hasListeners(this.rowDblClick) ? 250 : 1,
                        };
                    }
                }
            }
        });
        /**
         * Split the result of processEvent into cell and row events, if type is row only row event is returned, if cell then cell is returned and row is created along side.
         * @type {?}
         */
        const splitProcessedEvent = (/**
         * @template TEvent
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const cellEvent = event.type === 'cell' ? (/** @type {?} */ (event.event)) : undefined;
            /** @type {?} */
            const rowEvent = cellEvent
                ? createRowEvent(cellEvent.rowTarget, cellEvent.source, cellEvent)
                : (/** @type {?} */ (event.event));
            return { cellEvent, rowEvent };
        });
        /** @type {?} */
        const registerUpDownEvents = (/**
         * @template TEvent
         * @param {?} eventName
         * @param {?} emitter
         * @return {?}
         */
        (eventName, emitter) => {
            fromEvent(cdkTableElement, eventName)
                .pipe(takeUntil(this.destroyed), filter((/**
             * @param {?} source
             * @return {?}
             */
            source => hasListeners(emitter))), map(processEvent), filter((/**
             * @param {?} result
             * @return {?}
             */
            result => !!result)))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            result => {
                const { cellEvent, rowEvent } = splitProcessedEvent(result);
                emitter.emit(cellEvent || rowEvent);
                this.syncRow(cellEvent || rowEvent);
            }));
        });
        registerUpDownEvents('mouseup', this.mouseUp);
        registerUpDownEvents('mousedown', this.mouseDown);
        registerUpDownEvents('keyup', this.keyUp);
        registerUpDownEvents('keydown', this.keyDown);
        /*
              Handling click stream for both click and double click events.
              We want to detect double clicks and clicks with minimal delays
              We check if a double click has listeners, if not we won't delay the click...
              TODO: on double click, don't wait the whole 250 ms if 2 clicks happen.
            */
        /** @type {?} */
        const clickStream = fromEvent(cdkTableElement, 'click').pipe(takeUntil(this.destroyed), filter((/**
         * @param {?} source
         * @return {?}
         */
        source => hasListeners(this.cellClick) || hasListeners(this.cellDblClick) || hasListeners(this.rowClick) || hasListeners(this.rowDblClick))), map(processEvent), filter((/**
         * @param {?} result
         * @return {?}
         */
        result => !!result)));
        clickStream
            .pipe(bufferWhen((/**
         * @return {?}
         */
        () => clickStream.pipe(debounce((/**
         * @param {?} e
         * @return {?}
         */
        e => timer(e.waitTime)))))), filter((/**
         * @param {?} events
         * @return {?}
         */
        events => events.length > 0)))
            .subscribe((/**
         * @param {?} events
         * @return {?}
         */
        events => {
            /** @type {?} */
            const event = events.shift();
            /** @type {?} */
            const isDoubleClick = events.length === 1;
            // if we have 2 events its double click, otherwise single.
            const { cellEvent, rowEvent } = splitProcessedEvent(event);
            if (isDoubleClick) {
                if (cellEvent) {
                    this.cellDblClick.emit(cellEvent);
                }
                this.rowDblClick.emit(rowEvent);
            }
            else {
                if (cellEvent) {
                    this.cellClick.emit(cellEvent);
                }
                this.rowClick.emit(rowEvent);
            }
            this.syncRow(cellEvent || rowEvent);
        }));
        fromEvent(cdkTableElement, 'mouseleave')
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            /** @type {?} */
            let lastEvent = emitCellLeave(source);
            lastEvent = emitRowLeave(source) || lastEvent;
            if (lastEvent) {
                this.syncRow(lastEvent);
            }
        }));
        fromEvent(cdkTableElement, 'mousemove')
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        (source) => {
            /** @type {?} */
            const cellTarget = findParentCell((/** @type {?} */ (source.target)));
            /** @type {?} */
            const lastCellTarget = lastCellEnterEvent && lastCellEnterEvent.cellTarget;
            /** @type {?} */
            const lastRowTarget = lastRowEnterEvent && lastRowEnterEvent.rowTarget;
            /** @type {?} */
            let cellEvent;
            /** @type {?} */
            let lastEvent;
            if (lastCellTarget !== cellTarget) {
                lastEvent = emitCellLeave(source) || lastEvent;
            }
            if (cellTarget) {
                if (lastCellTarget !== cellTarget) {
                    cellEvent = createCellEvent(cellTarget, source);
                    if (cellEvent) {
                        this.cellEnter.emit(lastCellEnterEvent = cellEvent);
                    }
                }
                else {
                    return;
                }
            }
            /** @type {?} */
            const rowTarget = (cellEvent && cellEvent.rowTarget) || (isRowContainer((/** @type {?} */ (source.target))) && (/** @type {?} */ (source.target)));
            if (lastRowTarget !== rowTarget) {
                lastEvent = emitRowLeave(source) || lastEvent;
            }
            if (rowTarget) {
                if (lastRowTarget !== rowTarget) {
                    /** @type {?} */
                    const rowEvent = createRowEvent(rowTarget, source, cellEvent);
                    if (rowEvent) {
                        this.rowEnter.emit(lastRowEnterEvent = rowEvent);
                    }
                }
            }
            if (lastEvent) {
                this.syncRow(lastEvent);
            }
        }));
    }
    /**
     * @return {?}
     */
    destroy() {
        this.destroyed.next();
        this.destroyed.complete();
        this._removePlugin(this.table);
    }
    /**
     * @private
     * @template TEvent
     * @param {?} event
     * @return {?}
     */
    syncRow(event) {
        this.table._cdkTable.syncRows(event.type, event.rowIndex);
    }
};
/**
 * @template T
 */
PblNgridTargetEventsPlugin = PblNgridTargetEventsPlugin_1 = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY, factory: 'create', runOnce }),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridTargetEventsPlugin);
export { PblNgridTargetEventsPlugin };
if (false) {
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.rowClick;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.rowDblClick;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.rowEnter;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.rowLeave;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.cellClick;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.cellDblClick;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.cellEnter;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.cellLeave;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.mouseDown;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.mouseUp;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.keyUp;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.keyDown;
    /**
     * @type {?}
     * @private
     */
    PblNgridTargetEventsPlugin.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    PblNgridTargetEventsPlugin.prototype._removePlugin;
    /**
     * @type {?}
     * @protected
     */
    PblNgridTargetEventsPlugin.prototype.destroyed;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.table;
    /**
     * @type {?}
     * @protected
     */
    PblNgridTargetEventsPlugin.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    PblNgridTargetEventsPlugin.prototype.pluginCtrl;
}
/**
 * @template T
 */
let PblNgridTargetEventsPluginDirective = /**
 * @template T
 */
class PblNgridTargetEventsPluginDirective extends PblNgridTargetEventsPlugin {
    /**
     * @param {?} table
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(table, injector, pluginCtrl) {
        super(table, injector, pluginCtrl);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
};
PblNgridTargetEventsPluginDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]',
                // tslint:disable-next-line:use-output-property-decorator
                outputs: ['rowClick', 'rowDblClick', 'rowEnter', 'rowLeave', 'cellClick', 'cellDblClick', 'cellEnter', 'cellLeave', 'keyDown', 'keyUp']
            },] }
];
/** @nocollapse */
PblNgridTargetEventsPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
/**
 * @template T
 */
PblNgridTargetEventsPluginDirective = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridTargetEventsPluginDirective);
export { PblNgridTargetEventsPluginDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy90YXJnZXQtZXZlbnRzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBWSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFvQmhFLE1BQU0sT0FBTyxVQUFVLEdBQW1CLGNBQWM7Ozs7O0FBRXhELFNBQVMsWUFBWSxDQUFDLE1BQXNDO0lBQzFELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsTUFBYTs7VUFDOUIsVUFBVSxHQUFHLGNBQWMsQ0FBQyxtQkFBQSxNQUFNLENBQUMsTUFBTSxFQUFPLENBQUM7SUFDdkQsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFB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RSxVQUFVLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUU7YUFDMUk7Ozs7WUF4WFEsaUJBQWlCO1lBSHNDLFFBQVE7WUFHNUMsd0JBQXdCOzs7OztBQTBYdkMsbUNBQW1DO0lBRC9DLElBQUksRUFBRTs2Q0FHYyxpQkFBaUIsRUFBaUIsUUFBUSxFQUFjLHdCQUF3QjtHQUZ4RixtQ0FBbUMsQ0FVL0M7U0FWWSxtQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRXZlbnQsIHRpbWVyLCBPYnNlcnZlciwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYnVmZmVyV2hlbiwgZGVib3VuY2UsIG1hcCwgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsQ29sdW1uLCBUYWJsZVBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgKiBhcyBFdmVudHMgZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHsgbWF0cml4Um93RnJvbVJvdywgaXNSb3dDb250YWluZXIsIGZpbmRDZWxsUmVuZGVySW5kZXgsIGZpbmRQYXJlbnRDZWxsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBoYW5kbGVGb2N1c0FuZFNlbGVjdGlvbiB9IGZyb20gJy4vZm9jdXMtYW5kLXNlbGVjdGlvbic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICB0YXJnZXRFdmVudHM/OiB7XG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGVuYWJsZSB0aGUgdGFyZ2V0IGV2ZW50cyBwbHVnaW4gb24gYWxsIHRhYmxlIGluc3RhbmNlcyBieSBkZWZhdWx0LiAqL1xuICAgICAgYXV0b0VuYWJsZT86IGJvb2xlYW47XG4gICAgfTtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgdGFyZ2V0RXZlbnRzPzogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICB0YXJnZXRFdmVudHM6IGtleW9mIHR5cGVvZiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3RhcmdldEV2ZW50cycgPSAndGFyZ2V0RXZlbnRzJztcblxuZnVuY3Rpb24gaGFzTGlzdGVuZXJzKHNvdXJjZTogeyBvYnNlcnZlcnM6IE9ic2VydmVyPGFueT5bXSB9KTogYm9vbGVhbiB7XG4gIHJldHVybiBzb3VyY2Uub2JzZXJ2ZXJzLmxlbmd0aCA+IDA7XG59XG5cbmZ1bmN0aW9uIGZpbmRFdmVudFNvdXJjZShzb3VyY2U6IEV2ZW50KTogeyB0eXBlOiAncm93JyB8ICdjZWxsJywgdGFyZ2V0OiBIVE1MRWxlbWVudCB9IHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgY2VsbFRhcmdldCA9IGZpbmRQYXJlbnRDZWxsKHNvdXJjZS50YXJnZXQgYXMgYW55KTtcbiAgaWYgKGNlbGxUYXJnZXQpIHtcbiAgICByZXR1cm4geyB0eXBlOiAnY2VsbCcsIHRhcmdldDogY2VsbFRhcmdldCB9O1xuICB9IGVsc2UgaWYgKGlzUm93Q29udGFpbmVyKHNvdXJjZS50YXJnZXQgYXMgYW55KSkge1xuICAgIHJldHVybiB7IHR5cGU6ICdjZWxsJywgdGFyZ2V0OiBzb3VyY2UudGFyZ2V0IGFzIGFueSB9O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW5PbmNlKCk6IHZvaWQge1xuICBQYmxDb2x1bW4uZXh0ZW5kUHJvcGVydHkoJ2VkaXRhYmxlJyk7XG59XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJywgcnVuT25jZSB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQgPSBhbnk+IHtcbiAgcm93Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0VudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93TGVhdmUgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuXG4gIGNlbGxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRGJsQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbEVudGVyID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuXG4gIG1vdXNlRG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIG1vdXNlVXAgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICBrZXlVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleURvd24gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBLZXlib2FyZEV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuXG4gIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJvdGVjdGVkIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICAgIHRoaXMuY2RyID0gaW5qZWN0b3IuZ2V0KENoYW5nZURldGVjdG9yUmVmKTtcbiAgICBpZiAodGFibGUuaXNJbml0KSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKTtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+KHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXR1cERvbUV2ZW50cygpO1xuICAgIGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cERvbUV2ZW50cygpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZSA9IHRoaXMudGFibGU7XG4gICAgY29uc3QgY2RrVGFibGUgPSB0YWJsZS5fY2RrVGFibGU7XG4gICAgY29uc3QgY2RrVGFibGVFbGVtZW50OiBIVE1MRWxlbWVudCA9IGNka1RhYmxlWydfZWxlbWVudCddO1xuXG4gICAgY29uc3QgY3JlYXRlQ2VsbEV2ZW50ID0gPFRFdmVudCBleHRlbmRzIEV2ZW50PihjZWxsVGFyZ2V0OiBIVE1MRWxlbWVudCwgc291cmNlOiBURXZlbnQpOiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBjb25zdCByb3dUYXJnZXQgPSBjZWxsVGFyZ2V0LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjb25zdCBtYXRyaXhQb2ludCA9IG1hdHJpeFJvd0Zyb21Sb3cocm93VGFyZ2V0LCBjZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIpO1xuICAgICAgaWYgKG1hdHJpeFBvaW50KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiA9IHsgLi4ubWF0cml4UG9pbnQsIHNvdXJjZSwgY2VsbFRhcmdldCwgcm93VGFyZ2V0IH0gYXMgYW55O1xuICAgICAgICBpZiAobWF0cml4UG9pbnQudHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikucm93ID0gdGFibGUuZHMucmVuZGVyZWREYXRhW21hdHJpeFBvaW50LnJvd0luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5zdWJUeXBlID09PSAnbWV0YScpIHtcbiAgICAgICAgICAvLyBXaGVuIG11bHRpcGxlIGNvbnRhaW5lcnMgZXhpc3RzIChmaXhlZC9zdGlja3kvcm93KSB0aGUgcm93SW5kZXggd2UgZ2V0IGlzIHRoZSBvbmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lci4uXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBmaW5kIHRoZSByb3dJbmRleCByZWxhdGl2ZSB0byB0aGUgZGVmaW5pdGlvbnM6XG4gICAgICAgICAgY29uc3QgeyBtZXRhUm93U2VydmljZSB9ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaTtcbiAgICAgICAgICBjb25zdCBkYiA9IGV2ZW50LnR5cGUgPT09ICdoZWFkZXInID8gbWV0YVJvd1NlcnZpY2UuaGVhZGVyIDogbWV0YVJvd1NlcnZpY2UuZm9vdGVyO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBjb2xsIG9mIFtkYi5maXhlZCwgZGIucm93LCBkYi5zdGlja3ldKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb2xsLmZpbmQoIGl0ZW0gPT4gaXRlbS5lbCA9PT0gZXZlbnQucm93VGFyZ2V0ICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnJvd0luZGV4ID0gcmVzdWx0LmluZGV4O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBwcm92aWRlIGNvbHVtbiBpbmZvcm1hdGlvbiBub3IgdGhlIGNvbHVtbiBpdHNlbGYuIFRoaXMgd2lsbCBleHRlbmQgZnVuY3Rpb25hbGl0eSB0byBhZGQgdGhlIGNvbHVtbkluZGV4IGFuZCBjb2x1bW4uXG4gICAgICAgICAgICBUaGUgc2ltcGxlIGNhc2UgaXMgd2hlbiBgc3ViVHlwZSA9PT0gJ2RhdGEnYCwgaW4gdGhpcyBjYXNlIHRoZSBjb2x1bW4gaXMgYWx3YXlzIHRoZSBkYXRhIGNvbHVtbiBmb3IgYWxsIHR5cGVzIChoZWFkZXIsIGRhdGEgYW5kIGZvb3RlcilcblxuICAgICAgICAgICAgSWYgYHN1YlR5cGUgIT09ICdkYXRhJ2Agd2UgbmVlZCB0byBnZXQgdGhlIHByb3BlciBjb2x1bW4gYmFzZWQgdHlwZSAodHlwZSBjYW4gb25seSBiZSBgaGVhZGVyYCBvciBgZm9vdGVyYCBhdCB0aGlzIHBvaW50KS5cbiAgICAgICAgICAgIEJ1dCB0aGF0J3Mgbm90IGFsbCwgYmVjYXVzZSBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBoYW5kbGUgYG1ldGEtZ3JvdXBgIHN1YlR5cGUgd2UgbmVlZCB0byBkbyBpdCBoZXJlLi4uXG4gICAgICAgICovXG4gICAgICAgIGV2ZW50LmNvbEluZGV4ID0gZmluZENlbGxSZW5kZXJJbmRleChjZWxsVGFyZ2V0KTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnN1YlR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMudGFibGUuY29sdW1uQXBpLmZpbmRDb2x1bW5BdChldmVudC5jb2xJbmRleCk7XG4gICAgICAgICAgY29uc3QgY29sdW1uSW5kZXggPSB0aGlzLnRhYmxlLmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG4gICAgICAgICAgZXZlbnQuY29sdW1uID0gY29sdW1uO1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLmNvbnRleHQgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuZ2V0Q2VsbChldmVudC5yb3dJbmRleCwgY29sdW1uSW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHN0b3JlID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZTtcbiAgICAgICAgICBjb25zdCByb3dJbmZvID0gc3RvcmUubWV0YUNvbHVtbklkc1ttYXRyaXhQb2ludC50eXBlXVtldmVudC5yb3dJbmRleF07XG4gICAgICAgICAgY29uc3QgcmVjb3JkID0gc3RvcmUuZmluZChyb3dJbmZvLmtleXNbZXZlbnQuY29sSW5kZXhdKTtcbiAgICAgICAgICBpZiAocm93SW5mby5pc0dyb3VwKSB7XG4gICAgICAgICAgICBldmVudC5zdWJUeXBlID0gJ21ldGEtZ3JvdXAnO1xuICAgICAgICAgICAgZXZlbnQuY29sdW1uID0gbWF0cml4UG9pbnQudHlwZSA9PT0gJ2hlYWRlcicgPyByZWNvcmQuaGVhZGVyR3JvdXAgOiByZWNvcmQuZm9vdGVyR3JvdXA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gcmVjb3JkLmhlYWRlciA6IHJlY29yZC5mb290ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGVSb3dFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4ocm93VGFyZ2V0OiBIVE1MRWxlbWVudCwgc291cmNlOiBURXZlbnQsIHJvb3Q/OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmIChyb290KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiA9IHtcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgcm93VGFyZ2V0LFxuICAgICAgICAgIHR5cGU6IHJvb3QudHlwZSxcbiAgICAgICAgICBzdWJUeXBlOiByb290LnN1YlR5cGUsXG4gICAgICAgICAgcm93SW5kZXg6IHJvb3Qucm93SW5kZXgsXG4gICAgICAgICAgcm9vdFxuICAgICAgICB9IGFzIGFueTtcbiAgICAgICAgaWYgKHJvb3QudHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLnJvdyA9IHJvb3Qucm93O1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0ID0gcm9vdC5jb250ZXh0LnJvd0NvbnRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWF0cml4UG9pbnQgPSBtYXRyaXhSb3dGcm9tUm93KHJvd1RhcmdldCwgY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyKTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50KSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+ID0geyAuLi5tYXRyaXhQb2ludCwgc291cmNlLCByb3dUYXJnZXQgfSBhcyBhbnk7XG4gICAgICAgICAgaWYgKG1hdHJpeFBvaW50LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLmNvbnRleHQgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuZ2V0Um93KG1hdHJpeFBvaW50LnJvd0luZGV4KTtcbiAgICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5yb3cgPSAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dC4kaW1wbGljaXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyogIElmIGBzdWJUeXBlICE9PSAnZGF0YSdgIGl0IGNhbiBvbmx5IGJlIGBtZXRhYCBiZWNhdXNlIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IGhhbmRsZSBgbWV0YS1ncm91cGAgc3ViVHlwZS5cbiAgICAgICAgICAgICAgV2UgbmVlZCB0byBleHRlbmQgdGhpcyBtaXNzaW5nIHBhcnQsIHdlIGRvbid0IGhhdmUgY29sdW1ucyBoZXJlIHNvIHdlIHdpbGwgdHJ5IHRvIGluZmVyIGl0IHVzaW5nIHRoZSBmaXJzdCBjb2x1bW4uXG5cbiAgICAgICAgICAgICAgSXQncyBzaW1pbGFyIHRvIGhvdyBpdCdzIGhhbmRsZWQgaW4gY2VsbCBjbGlja3MsIGJ1dCBoZXJlIHdlIGRvbid0IG5lZWQgdG8gZXh0ZW5kcyB0aGUgY29sdW1uIGluZm8uXG4gICAgICAgICAgICAgIFdlIG9ubHkgbmVlZCB0byBjaGFuZ2UgdGhlIGBzdWJUeXBlYCB3aGVuIHRoZSByb3cgaXMgYSBncm91cCByb3csIGdldHRpbmcgYSBzcGVjaWZpYyBjb2x1bW4gaXMgaXJyZWxldmFudC5cbiAgICAgICAgICAgICAgV2UganVzdCBuZWVkIEEgY29sdW1uIGJlY2F1c2UgZ3JvdXAgY29sdW1ucyBkb24ndCBtaXggd2l0aCByZWd1bGFyIG1ldGEgY29sdW1ucy5cblxuICAgICAgICAgICAgICBOT1RFOiBXaGVuIHN1YlR5cGUgaXMgbm90ICdkYXRhJyB0aGUgeXBlIGNhbiBvbmx5IGJlIGBoZWFkZXJgIG9yIGBmb290ZXJgLlxuICAgICAgICAgICovXG4gICAgICAgICAgaWYgKG1hdHJpeFBvaW50LnN1YlR5cGUgIT09ICdkYXRhJykge1xuICAgICAgICAgICAgY29uc3Qgcm93SW5mbyA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29sdW1uU3RvcmUubWV0YUNvbHVtbklkc1ttYXRyaXhQb2ludC50eXBlXVtldmVudC5yb3dJbmRleF07XG4gICAgICAgICAgICBpZiAocm93SW5mby5pc0dyb3VwKSB7XG4gICAgICAgICAgICAgIGV2ZW50LnN1YlR5cGUgPSAnbWV0YS1ncm91cCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBsYXN0Q2VsbEVudGVyRXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PjtcbiAgICBsZXQgbGFzdFJvd0VudGVyRXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+O1xuICAgIGNvbnN0IGVtaXRDZWxsTGVhdmUgPSAoc291cmNlOiBNb3VzZUV2ZW50KTogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmIChsYXN0Q2VsbEVudGVyRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdENlbGxFbnRlckV2ZW50VGVtcCA9IGxhc3RDZWxsRW50ZXJFdmVudDtcbiAgICAgICAgdGhpcy5jZWxsTGVhdmUuZW1pdChPYmplY3QuYXNzaWduKHt9LCBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wLCB7IHNvdXJjZSB9KSk7XG4gICAgICAgIGxhc3RDZWxsRW50ZXJFdmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGxhc3RDZWxsRW50ZXJFdmVudFRlbXA7XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGVtaXRSb3dMZWF2ZSA9IChzb3VyY2U6IE1vdXNlRXZlbnQpOiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAobGFzdFJvd0VudGVyRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdFJvd0VudGVyRXZlbnRUZW1wID0gbGFzdFJvd0VudGVyRXZlbnQ7XG4gICAgICAgIHRoaXMucm93TGVhdmUuZW1pdChPYmplY3QuYXNzaWduKHt9LCBsYXN0Um93RW50ZXJFdmVudFRlbXAsIHsgc291cmNlIH0pKTtcbiAgICAgICAgbGFzdFJvd0VudGVyRXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBsYXN0Um93RW50ZXJFdmVudFRlbXA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcHJvY2Vzc0V2ZW50ID0gPFRFdmVudCBleHRlbmRzIEV2ZW50PihlOiBURXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGZpbmRFdmVudFNvdXJjZShlKTtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC50eXBlID09PSAnY2VsbCcpIHtcbiAgICAgICAgICBjb25zdCBldmVudCA9IGNyZWF0ZUNlbGxFdmVudDxURXZlbnQ+KHJlc3VsdC50YXJnZXQsIGUpO1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdHlwZTogcmVzdWx0LnR5cGUsXG4gICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICB3YWl0VGltZTogaGFzTGlzdGVuZXJzKHRoaXMuY2VsbERibENsaWNrKSA/IDI1MCA6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQudHlwZSA9PT0gJ3JvdycpIHtcbiAgICAgICAgICBjb25zdCBldmVudCA9IGNyZWF0ZVJvd0V2ZW50KHJlc3VsdC50YXJnZXQsIGUpO1xuICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdHlwZTogcmVzdWx0LnR5cGUsXG4gICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICB3YWl0VGltZTogaGFzTGlzdGVuZXJzKHRoaXMucm93RGJsQ2xpY2spID8gMjUwIDogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBTcGxpdCB0aGUgcmVzdWx0IG9mIHByb2Nlc3NFdmVudCBpbnRvIGNlbGwgYW5kIHJvdyBldmVudHMsIGlmIHR5cGUgaXMgcm93IG9ubHkgcm93IGV2ZW50IGlzIHJldHVybmVkLCBpZiBjZWxsIHRoZW4gY2VsbCBpcyByZXR1cm5lZCBhbmQgcm93IGlzIGNyZWF0ZWQgYWxvbmcgc2lkZS4gKi9cbiAgICBjb25zdCBzcGxpdFByb2Nlc3NlZEV2ZW50ID0gPFRFdmVudCBleHRlbmRzIEV2ZW50PihldmVudDogUmV0dXJuVHlwZTx0eXBlb2YgcHJvY2Vzc0V2ZW50PikgPT4ge1xuICAgICAgY29uc3QgY2VsbEV2ZW50ID0gZXZlbnQudHlwZSA9PT0gJ2NlbGwnID8gZXZlbnQuZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gOiB1bmRlZmluZWQ7XG4gICAgICBjb25zdCByb3dFdmVudCA9IGNlbGxFdmVudFxuICAgICAgICA/IGNyZWF0ZVJvd0V2ZW50PFRFdmVudD4oY2VsbEV2ZW50LnJvd1RhcmdldCwgY2VsbEV2ZW50LnNvdXJjZSwgY2VsbEV2ZW50KVxuICAgICAgICA6IGV2ZW50LmV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+XG4gICAgICA7XG4gICAgICByZXR1cm4geyBjZWxsRXZlbnQsIHJvd0V2ZW50IH07XG4gICAgfTtcblxuICAgIGNvbnN0IHJlZ2lzdGVyVXBEb3duRXZlbnRzID0gPFRFdmVudCBleHRlbmRzIEV2ZW50PihldmVudE5hbWU6IHN0cmluZywgZW1pdHRlcjogRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KSA9PiB7XG4gICAgICBmcm9tRXZlbnQoY2RrVGFibGVFbGVtZW50LCBldmVudE5hbWUpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICAgICAgZmlsdGVyKCBzb3VyY2UgPT4gaGFzTGlzdGVuZXJzKGVtaXR0ZXIpICksXG4gICAgICAgICAgbWFwKHByb2Nlc3NFdmVudCksXG4gICAgICAgICAgZmlsdGVyKCByZXN1bHQgPT4gISFyZXN1bHQgKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCByZXN1bHQgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgY2VsbEV2ZW50LCByb3dFdmVudCB9ID0gc3BsaXRQcm9jZXNzZWRFdmVudDxURXZlbnQ+KHJlc3VsdCk7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KGNlbGxFdmVudCB8fCByb3dFdmVudCk7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGNlbGxFdmVudCB8fCByb3dFdmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyVXBEb3duRXZlbnRzPE1vdXNlRXZlbnQ+KCdtb3VzZXVwJywgdGhpcy5tb3VzZVVwKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxNb3VzZUV2ZW50PignbW91c2Vkb3duJywgdGhpcy5tb3VzZURvd24pO1xuICAgIHJlZ2lzdGVyVXBEb3duRXZlbnRzPEtleWJvYXJkRXZlbnQ+KCdrZXl1cCcsIHRoaXMua2V5VXApO1xuICAgIHJlZ2lzdGVyVXBEb3duRXZlbnRzPEtleWJvYXJkRXZlbnQ+KCdrZXlkb3duJywgdGhpcy5rZXlEb3duKTtcblxuICAgIC8qXG4gICAgICBIYW5kbGluZyBjbGljayBzdHJlYW0gZm9yIGJvdGggY2xpY2sgYW5kIGRvdWJsZSBjbGljayBldmVudHMuXG4gICAgICBXZSB3YW50IHRvIGRldGVjdCBkb3VibGUgY2xpY2tzIGFuZCBjbGlja3Mgd2l0aCBtaW5pbWFsIGRlbGF5c1xuICAgICAgV2UgY2hlY2sgaWYgYSBkb3VibGUgY2xpY2sgaGFzIGxpc3RlbmVycywgaWYgbm90IHdlIHdvbid0IGRlbGF5IHRoZSBjbGljay4uLlxuICAgICAgVE9ETzogb24gZG91YmxlIGNsaWNrLCBkb24ndCB3YWl0IHRoZSB3aG9sZSAyNTAgbXMgaWYgMiBjbGlja3MgaGFwcGVuLlxuICAgICovXG4gICAgY29uc3QgY2xpY2tTdHJlYW0gPSBmcm9tRXZlbnQoY2RrVGFibGVFbGVtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIGZpbHRlciggc291cmNlID0+IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxDbGljaykgfHwgaGFzTGlzdGVuZXJzKHRoaXMuY2VsbERibENsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5yb3dDbGljaykgfHwgaGFzTGlzdGVuZXJzKHRoaXMucm93RGJsQ2xpY2spICksXG4gICAgICBtYXAocHJvY2Vzc0V2ZW50KSxcbiAgICAgIGZpbHRlciggcmVzdWx0ID0+ICEhcmVzdWx0ICksXG4gICAgKTtcblxuICAgIGNsaWNrU3RyZWFtXG4gICAgICAucGlwZShcbiAgICAgICAgYnVmZmVyV2hlbiggKCkgPT4gY2xpY2tTdHJlYW0ucGlwZSggZGVib3VuY2UoIGUgPT4gdGltZXIoZS53YWl0VGltZSkgKSApICksXG4gICAgICAgIGZpbHRlciggZXZlbnRzID0+IGV2ZW50cy5sZW5ndGggPiAwICksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCBldmVudHMgPT4ge1xuICAgICAgICBjb25zdCBldmVudCA9IGV2ZW50cy5zaGlmdCgpO1xuICAgICAgICBjb25zdCBpc0RvdWJsZUNsaWNrID0gZXZlbnRzLmxlbmd0aCA9PT0gMTsgLy8gaWYgd2UgaGF2ZSAyIGV2ZW50cyBpdHMgZG91YmxlIGNsaWNrLCBvdGhlcndpc2Ugc2luZ2xlLlxuICAgICAgICBjb25zdCB7IGNlbGxFdmVudCwgcm93RXZlbnQgfSA9IHNwbGl0UHJvY2Vzc2VkRXZlbnQ8TW91c2VFdmVudD4oZXZlbnQpO1xuICAgICAgICBpZiAoaXNEb3VibGVDbGljaykge1xuICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbERibENsaWNrLmVtaXQoY2VsbEV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yb3dEYmxDbGljay5lbWl0KHJvd0V2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxDbGljay5lbWl0KGNlbGxFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucm93Q2xpY2suZW1pdChyb3dFdmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zeW5jUm93KGNlbGxFdmVudCB8fCByb3dFdmVudCk7XG4gICAgICB9KTtcblxuXG4gICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ21vdXNlbGVhdmUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoc291cmNlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQ+ID0gZW1pdENlbGxMZWF2ZShzb3VyY2UpO1xuICAgICAgICBsYXN0RXZlbnQgPSBlbWl0Um93TGVhdmUoc291cmNlKSB8fCBsYXN0RXZlbnQ7XG4gICAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgICB0aGlzLnN5bmNSb3cobGFzdEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBmcm9tRXZlbnQoY2RrVGFibGVFbGVtZW50LCAnbW91c2Vtb3ZlJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKHNvdXJjZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsVGFyZ2V0OiBIVE1MRWxlbWVudCA9IGZpbmRQYXJlbnRDZWxsKHNvdXJjZS50YXJnZXQgYXMgYW55KTtcbiAgICAgICAgY29uc3QgbGFzdENlbGxUYXJnZXQgPSBsYXN0Q2VsbEVudGVyRXZlbnQgJiYgbGFzdENlbGxFbnRlckV2ZW50LmNlbGxUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGxhc3RSb3dUYXJnZXQgPSBsYXN0Um93RW50ZXJFdmVudCAmJiBsYXN0Um93RW50ZXJFdmVudC5yb3dUYXJnZXQ7XG5cbiAgICAgICAgbGV0IGNlbGxFdmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+O1xuICAgICAgICBsZXQgbGFzdEV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPjtcblxuICAgICAgICBpZiAobGFzdENlbGxUYXJnZXQgIT09IGNlbGxUYXJnZXQpIHtcbiAgICAgICAgICBsYXN0RXZlbnQgPSBlbWl0Q2VsbExlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNlbGxUYXJnZXQpIHtcbiAgICAgICAgICBpZiAobGFzdENlbGxUYXJnZXQgIT09IGNlbGxUYXJnZXQpIHtcbiAgICAgICAgICAgIGNlbGxFdmVudCA9IGNyZWF0ZUNlbGxFdmVudChjZWxsVGFyZ2V0LCBzb3VyY2UpO1xuICAgICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgICB0aGlzLmNlbGxFbnRlci5lbWl0KGxhc3RDZWxsRW50ZXJFdmVudCA9IGNlbGxFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByb3dUYXJnZXQgPSAoY2VsbEV2ZW50ICYmIGNlbGxFdmVudC5yb3dUYXJnZXQpIHx8IChpc1Jvd0NvbnRhaW5lcihzb3VyY2UudGFyZ2V0IGFzIGFueSkgJiYgc291cmNlLnRhcmdldCBhcyBhbnkpO1xuXG4gICAgICAgIGlmIChsYXN0Um93VGFyZ2V0ICE9PSByb3dUYXJnZXQpIHtcbiAgICAgICAgICBsYXN0RXZlbnQgPSBlbWl0Um93TGVhdmUoc291cmNlKSB8fCBsYXN0RXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocm93VGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKGxhc3RSb3dUYXJnZXQgIT09IHJvd1RhcmdldCkge1xuICAgICAgICAgICAgY29uc3Qgcm93RXZlbnQgPSBjcmVhdGVSb3dFdmVudChyb3dUYXJnZXQsIHNvdXJjZSwgY2VsbEV2ZW50KTtcbiAgICAgICAgICAgIGlmIChyb3dFdmVudCkge1xuICAgICAgICAgICAgICB0aGlzLnJvd0VudGVyLmVtaXQobGFzdFJvd0VudGVyRXZlbnQgPSByb3dFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxhc3RFdmVudCkge1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhsYXN0RXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jUm93PFRFdmVudCBleHRlbmRzIEV2ZW50PihldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IHZvaWQge1xuICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnN5bmNSb3dzKGV2ZW50LnR5cGUsIGV2ZW50LnJvd0luZGV4KTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFt0YXJnZXRFdmVudHNdLCBwYmwtbmdyaWRbcm93Q2xpY2tdLCBwYmwtbmdyaWRbcm93RGJsQ2xpY2tdLCBwYmwtbmdyaWRbcm93RW50ZXJdLCBwYmwtbmdyaWRbcm93TGVhdmVdLCBwYmwtbmdyaWRbY2VsbENsaWNrXSwgcGJsLW5ncmlkW2NlbGxEYmxDbGlja10sIHBibC1uZ3JpZFtjZWxsRW50ZXJdLCBwYmwtbmdyaWRbY2VsbExlYXZlXSwgcGJsLW5ncmlkW2tleURvd25dLCBwYmwtbmdyaWRba2V5VXBdJyxcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVzZS1vdXRwdXQtcHJvcGVydHktZGVjb3JhdG9yXG4gIG91dHB1dHM6IFsgJ3Jvd0NsaWNrJywgJ3Jvd0RibENsaWNrJywgJ3Jvd0VudGVyJywgJ3Jvd0xlYXZlJywgJ2NlbGxDbGljaycsICdjZWxsRGJsQ2xpY2snLCAnY2VsbEVudGVyJywgJ2NlbGxMZWF2ZScsICdrZXlEb3duJywgJ2tleVVwJyBdXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luRGlyZWN0aXZlPFQ+IGV4dGVuZHMgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHN1cGVyKHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG59XG4iXX0=