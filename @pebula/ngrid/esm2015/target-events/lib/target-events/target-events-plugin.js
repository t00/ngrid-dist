import * as tslib_1 from "tslib";
var PblNgridTargetEventsPlugin_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, OnDestroy, ChangeDetectorRef, Injector } from '@angular/core';
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
PblNgridTargetEventsPlugin.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
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
PblNgridTargetEventsPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy90YXJnZXQtZXZlbnRzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBWSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHcEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBb0JoRSxNQUFNLE9BQU8sVUFBVSxHQUFtQixjQUFjOzs7OztBQUV4RCxTQUFTLFlBQVksQ0FBQyxNQUFzQztJQUMxRCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNyQyxDQUFDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLE1BQWE7O1VBQzlCLFVBQVUsR0FBRyxjQUFjLENBQUMsbUJBQUEsTUFBTSxDQUFDLE1BQU0sRUFBTyxDQUFDO0lBQ3ZELElBQUksVUFBVSxFQUFFO1FBQ2QsT0FBTyxFQUFFLElBQUksRUFB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aUI7WUFBaUIsUUFBUTtZQUFjLHdCQUF3Qjs7O1lBVHBHLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLGlQQUFpUDs7Z0JBRTNQLE9BQU8sRUFBRSxDQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBRTthQUMxSTs7OztZQXhYUSxpQkFBaUI7WUFIc0MsUUFBUTtZQUc1Qyx3QkFBd0I7Ozs7O0FBMFh2QyxtQ0FBbUM7SUFEL0MsSUFBSSxFQUFFOzZDQUdjLGlCQUFpQixFQUFpQixRQUFRLEVBQWMsd0JBQXdCO0dBRnhGLG1DQUFtQyxDQVUvQztTQVZZLG1DQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCwgdGltZXIsIE9ic2VydmVyLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBidWZmZXJXaGVuLCBkZWJvdW5jZSwgbWFwLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxDb2x1bW4sIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCAqIGFzIEV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBtYXRyaXhSb3dGcm9tUm93LCBpc1Jvd0NvbnRhaW5lciwgZmluZENlbGxSZW5kZXJJbmRleCwgZmluZFBhcmVudENlbGwgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uIH0gZnJvbSAnLi9mb2N1cy1hbmQtc2VsZWN0aW9uJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRhcmdldEV2ZW50cz86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSB0YXJnZXQgZXZlbnRzIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICB0YXJnZXRFdmVudHM/OiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIHRhcmdldEV2ZW50czoga2V5b2YgdHlwZW9mIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAndGFyZ2V0RXZlbnRzJyA9ICd0YXJnZXRFdmVudHMnO1xuXG5mdW5jdGlvbiBoYXNMaXN0ZW5lcnMoc291cmNlOiB7IG9ic2VydmVyczogT2JzZXJ2ZXI8YW55PltdIH0pOiBib29sZWFuIHtcbiAgcmV0dXJuIHNvdXJjZS5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbn1cblxuZnVuY3Rpb24gZmluZEV2ZW50U291cmNlKHNvdXJjZTogRXZlbnQpOiB7IHR5cGU6ICdyb3cnIHwgJ2NlbGwnLCB0YXJnZXQ6IEhUTUxFbGVtZW50IH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBjZWxsVGFyZ2V0ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICBpZiAoY2VsbFRhcmdldCkge1xuICAgIHJldHVybiB7IHR5cGU6ICdjZWxsJywgdGFyZ2V0OiBjZWxsVGFyZ2V0IH07XG4gIH0gZWxzZSBpZiAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogJ2NlbGwnLCB0YXJnZXQ6IHNvdXJjZS50YXJnZXQgYXMgYW55IH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk9uY2UoKTogdm9pZCB7XG4gIFBibENvbHVtbi5leHRlbmRQcm9wZXJ0eSgnZWRpdGFibGUnKTtcbn1cblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnLCBydW5PbmNlIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VCA9IGFueT4ge1xuICByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0RibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93RW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgY2VsbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbExlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG5cbiAgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleVVwID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgS2V5Ym9hcmRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAga2V5RG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgdGhpcy5jZHIgPSBpbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIGlmICh0YWJsZS5pc0luaXQpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+IHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD4odGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwRG9tRXZlbnRzKCk7XG4gICAgaGFuZGxlRm9jdXNBbmRTZWxlY3Rpb24odGhpcyk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwRG9tRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZSA9IHRhYmxlLl9jZGtUYWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gY2RrVGFibGVbJ19lbGVtZW50J107XG5cbiAgICBjb25zdCBjcmVhdGVDZWxsRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGNlbGxUYXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IFRFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IHJvd1RhcmdldCA9IGNlbGxUYXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IG1hdHJpeFBvaW50ID0gbWF0cml4Um93RnJvbVJvdyhyb3dUYXJnZXQsIGNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcik7XG4gICAgICBpZiAobWF0cml4UG9pbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+ID0geyAuLi5tYXRyaXhQb2ludCwgc291cmNlLCBjZWxsVGFyZ2V0LCByb3dUYXJnZXQgfSBhcyBhbnk7XG4gICAgICAgIGlmIChtYXRyaXhQb2ludC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFBvaW50PFQ+KS5yb3cgPSB0YWJsZS5kcy5yZW5kZXJlZERhdGFbbWF0cml4UG9pbnQucm93SW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnN1YlR5cGUgPT09ICdtZXRhJykge1xuICAgICAgICAgIC8vIFdoZW4gbXVsdGlwbGUgY29udGFpbmVycyBleGlzdHMgKGZpeGVkL3N0aWNreS9yb3cpIHRoZSByb3dJbmRleCB3ZSBnZXQgaXMgdGhlIG9uZSByZWxhdGl2ZSB0byB0aGUgY29udGFpbmVyLi5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGZpbmQgdGhlIHJvd0luZGV4IHJlbGF0aXZlIHRvIHRoZSBkZWZpbml0aW9uczpcbiAgICAgICAgICBjb25zdCB7IG1ldGFSb3dTZXJ2aWNlIH0gPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpO1xuICAgICAgICAgIGNvbnN0IGRiID0gZXZlbnQudHlwZSA9PT0gJ2hlYWRlcicgPyBtZXRhUm93U2VydmljZS5oZWFkZXIgOiBtZXRhUm93U2VydmljZS5mb290ZXI7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGNvbGwgb2YgW2RiLmZpeGVkLCBkYi5yb3csIGRiLnN0aWNreV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbGwuZmluZCggaXRlbSA9PiBpdGVtLmVsID09PSBldmVudC5yb3dUYXJnZXQgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZXZlbnQucm93SW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IHByb3ZpZGUgY29sdW1uIGluZm9ybWF0aW9uIG5vciB0aGUgY29sdW1uIGl0c2VsZi4gVGhpcyB3aWxsIGV4dGVuZCBmdW5jdGlvbmFsaXR5IHRvIGFkZCB0aGUgY29sdW1uSW5kZXggYW5kIGNvbHVtbi5cbiAgICAgICAgICAgIFRoZSBzaW1wbGUgY2FzZSBpcyB3aGVuIGBzdWJUeXBlID09PSAnZGF0YSdgLCBpbiB0aGlzIGNhc2UgdGhlIGNvbHVtbiBpcyBhbHdheXMgdGhlIGRhdGEgY29sdW1uIGZvciBhbGwgdHlwZXMgKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyKVxuXG4gICAgICAgICAgICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCB3ZSBuZWVkIHRvIGdldCB0aGUgcHJvcGVyIGNvbHVtbiBiYXNlZCB0eXBlICh0eXBlIGNhbiBvbmx5IGJlIGBoZWFkZXJgIG9yIGBmb290ZXJgIGF0IHRoaXMgcG9pbnQpLlxuICAgICAgICAgICAgQnV0IHRoYXQncyBub3QgYWxsLCBiZWNhdXNlIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IGhhbmRsZSBgbWV0YS1ncm91cGAgc3ViVHlwZSB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUuLi5cbiAgICAgICAgKi9cbiAgICAgICAgZXZlbnQuY29sSW5kZXggPSBmaW5kQ2VsbFJlbmRlckluZGV4KGNlbGxUYXJnZXQpO1xuICAgICAgICBpZiAobWF0cml4UG9pbnQuc3ViVHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy50YWJsZS5jb2x1bW5BcGkuZmluZENvbHVtbkF0KGV2ZW50LmNvbEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMudGFibGUuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICAgICAgICBldmVudC5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikuY29udGV4dCA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRDZWxsKGV2ZW50LnJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlO1xuICAgICAgICAgIGNvbnN0IHJvd0luZm8gPSBzdG9yZS5tZXRhQ29sdW1uSWRzW21hdHJpeFBvaW50LnR5cGVdW2V2ZW50LnJvd0luZGV4XTtcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSBzdG9yZS5maW5kKHJvd0luZm8ua2V5c1tldmVudC5jb2xJbmRleF0pO1xuICAgICAgICAgIGlmIChyb3dJbmZvLmlzR3JvdXApIHtcbiAgICAgICAgICAgIGV2ZW50LnN1YlR5cGUgPSAnbWV0YS1ncm91cCc7XG4gICAgICAgICAgICBldmVudC5jb2x1bW4gPSBtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHJlY29yZC5oZWFkZXJHcm91cCA6IHJlY29yZC5mb290ZXJHcm91cDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuY29sdW1uID0gbWF0cml4UG9pbnQudHlwZSA9PT0gJ2hlYWRlcicgPyByZWNvcmQuaGVhZGVyIDogcmVjb3JkLmZvb3RlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVJvd0V2ZW50ID0gPFRFdmVudCBleHRlbmRzIEV2ZW50Pihyb3dUYXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IFRFdmVudCwgcm9vdD86IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+KTogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKHJvb3QpIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+ID0ge1xuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICByb3dUYXJnZXQsXG4gICAgICAgICAgdHlwZTogcm9vdC50eXBlLFxuICAgICAgICAgIHN1YlR5cGU6IHJvb3Quc3ViVHlwZSxcbiAgICAgICAgICByb3dJbmRleDogcm9vdC5yb3dJbmRleCxcbiAgICAgICAgICByb290XG4gICAgICAgIH0gYXMgYW55O1xuICAgICAgICBpZiAocm9vdC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikucm93ID0gcm9vdC5yb3c7XG4gICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLmNvbnRleHQgPSByb290LmNvbnRleHQucm93Q29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXRyaXhQb2ludCA9IG1hdHJpeFJvd0Zyb21Sb3cocm93VGFyZ2V0LCBjZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIpO1xuICAgICAgICBpZiAobWF0cml4UG9pbnQpIHtcbiAgICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gPSB7IC4uLm1hdHJpeFBvaW50LCBzb3VyY2UsIHJvd1RhcmdldCB9IGFzIGFueTtcbiAgICAgICAgICBpZiAobWF0cml4UG9pbnQudHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dCA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRSb3cobWF0cml4UG9pbnQucm93SW5kZXgpO1xuICAgICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLnJvdyA9IChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiAgSWYgYHN1YlR5cGUgIT09ICdkYXRhJ2AgaXQgY2FuIG9ubHkgYmUgYG1ldGFgIGJlY2F1c2UgYG1ldGFkYXRhRnJvbUVsZW1lbnQoKWAgZG9lcyBub3QgaGFuZGxlIGBtZXRhLWdyb3VwYCBzdWJUeXBlLlxuICAgICAgICAgICAgICBXZSBuZWVkIHRvIGV4dGVuZCB0aGlzIG1pc3NpbmcgcGFydCwgd2UgZG9uJ3QgaGF2ZSBjb2x1bW5zIGhlcmUgc28gd2Ugd2lsbCB0cnkgdG8gaW5mZXIgaXQgdXNpbmcgdGhlIGZpcnN0IGNvbHVtbi5cblxuICAgICAgICAgICAgICBJdCdzIHNpbWlsYXIgdG8gaG93IGl0J3MgaGFuZGxlZCBpbiBjZWxsIGNsaWNrcywgYnV0IGhlcmUgd2UgZG9uJ3QgbmVlZCB0byBleHRlbmRzIHRoZSBjb2x1bW4gaW5mby5cbiAgICAgICAgICAgICAgV2Ugb25seSBuZWVkIHRvIGNoYW5nZSB0aGUgYHN1YlR5cGVgIHdoZW4gdGhlIHJvdyBpcyBhIGdyb3VwIHJvdywgZ2V0dGluZyBhIHNwZWNpZmljIGNvbHVtbiBpcyBpcnJlbGV2YW50LlxuICAgICAgICAgICAgICBXZSBqdXN0IG5lZWQgQSBjb2x1bW4gYmVjYXVzZSBncm91cCBjb2x1bW5zIGRvbid0IG1peCB3aXRoIHJlZ3VsYXIgbWV0YSBjb2x1bW5zLlxuXG4gICAgICAgICAgICAgIE5PVEU6IFdoZW4gc3ViVHlwZSBpcyBub3QgJ2RhdGEnIHRoZSB5cGUgY2FuIG9ubHkgYmUgYGhlYWRlcmAgb3IgYGZvb3RlcmAuXG4gICAgICAgICAgKi9cbiAgICAgICAgICBpZiAobWF0cml4UG9pbnQuc3ViVHlwZSAhPT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICBjb25zdCByb3dJbmZvID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzW21hdHJpeFBvaW50LnR5cGVdW2V2ZW50LnJvd0luZGV4XTtcbiAgICAgICAgICAgIGlmIChyb3dJbmZvLmlzR3JvdXApIHtcbiAgICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxhc3RDZWxsRW50ZXJFdmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+O1xuICAgIGxldCBsYXN0Um93RW50ZXJFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD47XG4gICAgY29uc3QgZW1pdENlbGxMZWF2ZSA9IChzb3VyY2U6IE1vdXNlRXZlbnQpOiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKGxhc3RDZWxsRW50ZXJFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wID0gbGFzdENlbGxFbnRlckV2ZW50O1xuICAgICAgICB0aGlzLmNlbGxMZWF2ZS5lbWl0KE9iamVjdC5hc3NpZ24oe30sIGxhc3RDZWxsRW50ZXJFdmVudFRlbXAsIHsgc291cmNlIH0pKTtcbiAgICAgICAgbGFzdENlbGxFbnRlckV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gbGFzdENlbGxFbnRlckV2ZW50VGVtcDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZW1pdFJvd0xlYXZlID0gKHNvdXJjZTogTW91c2VFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmIChsYXN0Um93RW50ZXJFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Um93RW50ZXJFdmVudFRlbXAgPSBsYXN0Um93RW50ZXJFdmVudDtcbiAgICAgICAgdGhpcy5yb3dMZWF2ZS5lbWl0KE9iamVjdC5hc3NpZ24oe30sIGxhc3RSb3dFbnRlckV2ZW50VGVtcCwgeyBzb3VyY2UgfSkpO1xuICAgICAgICBsYXN0Um93RW50ZXJFdmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGxhc3RSb3dFbnRlckV2ZW50VGVtcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm9jZXNzRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGU6IFRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZEV2ZW50U291cmNlKGUpO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09ICdjZWxsJykge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlQ2VsbEV2ZW50PFRFdmVudD4ocmVzdWx0LnRhcmdldCwgZSk7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIHdhaXRUaW1lOiBoYXNMaXN0ZW5lcnModGhpcy5jZWxsRGJsQ2xpY2spID8gMjUwIDogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC50eXBlID09PSAncm93Jykge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlUm93RXZlbnQocmVzdWx0LnRhcmdldCwgZSk7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIHdhaXRUaW1lOiBoYXNMaXN0ZW5lcnModGhpcy5yb3dEYmxDbGljaykgPyAyNTAgOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIFNwbGl0IHRoZSByZXN1bHQgb2YgcHJvY2Vzc0V2ZW50IGludG8gY2VsbCBhbmQgcm93IGV2ZW50cywgaWYgdHlwZSBpcyByb3cgb25seSByb3cgZXZlbnQgaXMgcmV0dXJuZWQsIGlmIGNlbGwgdGhlbiBjZWxsIGlzIHJldHVybmVkIGFuZCByb3cgaXMgY3JlYXRlZCBhbG9uZyBzaWRlLiAqL1xuICAgIGNvbnN0IHNwbGl0UHJvY2Vzc2VkRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50OiBSZXR1cm5UeXBlPHR5cGVvZiBwcm9jZXNzRXZlbnQ+KSA9PiB7XG4gICAgICBjb25zdCBjZWxsRXZlbnQgPSBldmVudC50eXBlID09PSAnY2VsbCcgPyBldmVudC5ldmVudCBhcyBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IHJvd0V2ZW50ID0gY2VsbEV2ZW50XG4gICAgICAgID8gY3JlYXRlUm93RXZlbnQ8VEV2ZW50PihjZWxsRXZlbnQucm93VGFyZ2V0LCBjZWxsRXZlbnQuc291cmNlLCBjZWxsRXZlbnQpXG4gICAgICAgIDogZXZlbnQuZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD5cbiAgICAgIDtcbiAgICAgIHJldHVybiB7IGNlbGxFdmVudCwgcm93RXZlbnQgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVnaXN0ZXJVcERvd25FdmVudHMgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50TmFtZTogc3RyaW5nLCBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4pID0+IHtcbiAgICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsIGV2ZW50TmFtZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgICBmaWx0ZXIoIHNvdXJjZSA9PiBoYXNMaXN0ZW5lcnMoZW1pdHRlcikgKSxcbiAgICAgICAgICBtYXAocHJvY2Vzc0V2ZW50KSxcbiAgICAgICAgICBmaWx0ZXIoIHJlc3VsdCA9PiAhIXJlc3VsdCApLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoIHJlc3VsdCA9PiB7XG4gICAgICAgICAgY29uc3QgeyBjZWxsRXZlbnQsIHJvd0V2ZW50IH0gPSBzcGxpdFByb2Nlc3NlZEV2ZW50PFRFdmVudD4ocmVzdWx0KTtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgICAgICB0aGlzLnN5bmNSb3coY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8TW91c2VFdmVudD4oJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIHJlZ2lzdGVyVXBEb3duRXZlbnRzPE1vdXNlRXZlbnQ+KCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8S2V5Ym9hcmRFdmVudD4oJ2tleXVwJywgdGhpcy5rZXlVcCk7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8S2V5Ym9hcmRFdmVudD4oJ2tleWRvd24nLCB0aGlzLmtleURvd24pO1xuXG4gICAgLypcbiAgICAgIEhhbmRsaW5nIGNsaWNrIHN0cmVhbSBmb3IgYm90aCBjbGljayBhbmQgZG91YmxlIGNsaWNrIGV2ZW50cy5cbiAgICAgIFdlIHdhbnQgdG8gZGV0ZWN0IGRvdWJsZSBjbGlja3MgYW5kIGNsaWNrcyB3aXRoIG1pbmltYWwgZGVsYXlzXG4gICAgICBXZSBjaGVjayBpZiBhIGRvdWJsZSBjbGljayBoYXMgbGlzdGVuZXJzLCBpZiBub3Qgd2Ugd29uJ3QgZGVsYXkgdGhlIGNsaWNrLi4uXG4gICAgICBUT0RPOiBvbiBkb3VibGUgY2xpY2ssIGRvbid0IHdhaXQgdGhlIHdob2xlIDI1MCBtcyBpZiAyIGNsaWNrcyBoYXBwZW4uXG4gICAgKi9cbiAgICBjb25zdCBjbGlja1N0cmVhbSA9IGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgZmlsdGVyKCBzb3VyY2UgPT4gaGFzTGlzdGVuZXJzKHRoaXMuY2VsbENsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5jZWxsRGJsQ2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLnJvd0NsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5yb3dEYmxDbGljaykgKSxcbiAgICAgIG1hcChwcm9jZXNzRXZlbnQpLFxuICAgICAgZmlsdGVyKCByZXN1bHQgPT4gISFyZXN1bHQgKSxcbiAgICApO1xuXG4gICAgY2xpY2tTdHJlYW1cbiAgICAgIC5waXBlKFxuICAgICAgICBidWZmZXJXaGVuKCAoKSA9PiBjbGlja1N0cmVhbS5waXBlKCBkZWJvdW5jZSggZSA9PiB0aW1lcihlLndhaXRUaW1lKSApICkgKSxcbiAgICAgICAgZmlsdGVyKCBldmVudHMgPT4gZXZlbnRzLmxlbmd0aCA+IDAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50cyA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzLnNoaWZ0KCk7XG4gICAgICAgIGNvbnN0IGlzRG91YmxlQ2xpY2sgPSBldmVudHMubGVuZ3RoID09PSAxOyAvLyBpZiB3ZSBoYXZlIDIgZXZlbnRzIGl0cyBkb3VibGUgY2xpY2ssIG90aGVyd2lzZSBzaW5nbGUuXG4gICAgICAgIGNvbnN0IHsgY2VsbEV2ZW50LCByb3dFdmVudCB9ID0gc3BsaXRQcm9jZXNzZWRFdmVudDxNb3VzZUV2ZW50PihldmVudCk7XG4gICAgICAgIGlmIChpc0RvdWJsZUNsaWNrKSB7XG4gICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsRGJsQ2xpY2suZW1pdChjZWxsRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvd0RibENsaWNrLmVtaXQocm93RXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbENsaWNrLmVtaXQoY2VsbEV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yb3dDbGljay5lbWl0KHJvd0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNSb3coY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgIH0pO1xuXG5cbiAgICBmcm9tRXZlbnQoY2RrVGFibGVFbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChzb3VyY2U6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGxhc3RFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD4gPSBlbWl0Q2VsbExlYXZlKHNvdXJjZSk7XG4gICAgICAgIGxhc3RFdmVudCA9IGVtaXRSb3dMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgaWYgKGxhc3RFdmVudCkge1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhsYXN0RXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdtb3VzZW1vdmUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoc291cmNlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxUYXJnZXQ6IEhUTUxFbGVtZW50ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICAgICAgICBjb25zdCBsYXN0Q2VsbFRhcmdldCA9IGxhc3RDZWxsRW50ZXJFdmVudCAmJiBsYXN0Q2VsbEVudGVyRXZlbnQuY2VsbFRhcmdldDtcbiAgICAgICAgY29uc3QgbGFzdFJvd1RhcmdldCA9IGxhc3RSb3dFbnRlckV2ZW50ICYmIGxhc3RSb3dFbnRlckV2ZW50LnJvd1RhcmdldDtcblxuICAgICAgICBsZXQgY2VsbEV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD47XG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQ+O1xuXG4gICAgICAgIGlmIChsYXN0Q2VsbFRhcmdldCAhPT0gY2VsbFRhcmdldCkge1xuICAgICAgICAgIGxhc3RFdmVudCA9IGVtaXRDZWxsTGVhdmUoc291cmNlKSB8fCBsYXN0RXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbFRhcmdldCkge1xuICAgICAgICAgIGlmIChsYXN0Q2VsbFRhcmdldCAhPT0gY2VsbFRhcmdldCkge1xuICAgICAgICAgICAgY2VsbEV2ZW50ID0gY3JlYXRlQ2VsbEV2ZW50KGNlbGxUYXJnZXQsIHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VsbEVudGVyLmVtaXQobGFzdENlbGxFbnRlckV2ZW50ID0gY2VsbEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvd1RhcmdldCA9IChjZWxsRXZlbnQgJiYgY2VsbEV2ZW50LnJvd1RhcmdldCkgfHwgKGlzUm93Q29udGFpbmVyKHNvdXJjZS50YXJnZXQgYXMgYW55KSAmJiBzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG5cbiAgICAgICAgaWYgKGxhc3RSb3dUYXJnZXQgIT09IHJvd1RhcmdldCkge1xuICAgICAgICAgIGxhc3RFdmVudCA9IGVtaXRSb3dMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3dUYXJnZXQpIHtcbiAgICAgICAgICBpZiAobGFzdFJvd1RhcmdldCAhPT0gcm93VGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCByb3dFdmVudCA9IGNyZWF0ZVJvd0V2ZW50KHJvd1RhcmdldCwgc291cmNlLCBjZWxsRXZlbnQpO1xuICAgICAgICAgICAgaWYgKHJvd0V2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucm93RW50ZXIuZW1pdChsYXN0Um93RW50ZXJFdmVudCA9IHJvd0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGxhc3RFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNSb3c8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoZXZlbnQudHlwZSwgZXZlbnQucm93SW5kZXgpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3RhcmdldEV2ZW50c10sIHBibC1uZ3JpZFtyb3dDbGlja10sIHBibC1uZ3JpZFtyb3dEYmxDbGlja10sIHBibC1uZ3JpZFtyb3dFbnRlcl0sIHBibC1uZ3JpZFtyb3dMZWF2ZV0sIHBibC1uZ3JpZFtjZWxsQ2xpY2tdLCBwYmwtbmdyaWRbY2VsbERibENsaWNrXSwgcGJsLW5ncmlkW2NlbGxFbnRlcl0sIHBibC1uZ3JpZFtjZWxsTGVhdmVdLCBwYmwtbmdyaWRba2V5RG93bl0sIHBibC1uZ3JpZFtrZXlVcF0nLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLW91dHB1dC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgb3V0cHV0czogWyAncm93Q2xpY2snLCAncm93RGJsQ2xpY2snLCAncm93RW50ZXInLCAncm93TGVhdmUnLCAnY2VsbENsaWNrJywgJ2NlbGxEYmxDbGljaycsICdjZWxsRW50ZXInLCAnY2VsbExlYXZlJywgJ2tleURvd24nLCAna2V5VXAnIF1cbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgc3VwZXIodGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==