/**
 * @fileoverview added by tsickle
 * Generated from: lib/target-events/target-events-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, PblColumn } from '@pebula/ngrid';
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
export class PblNgridTargetEventsPlugin {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
        this.grid = grid;
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
        if (grid.isInit) {
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
     * @deprecated use `gird` instead
     * @return {?}
     */
    get table() { return this.grid; }
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    static create(table, injector) {
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridTargetEventsPlugin(table, injector, pluginCtrl);
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
        const grid = this.grid;
        /** @type {?} */
        const cdkTable = grid._cdkTable;
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
                const event = (/** @type {?} */ (Object.assign(Object.assign({}, matrixPoint), { source, cellTarget, rowTarget })));
                if (matrixPoint.type === 'data') {
                    ((/** @type {?} */ (event))).row = grid.ds.renderedData[matrixPoint.rowIndex];
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
                    const column = this.grid.columnApi.findColumnAt(event.colIndex);
                    /** @type {?} */
                    const columnIndex = this.grid.columnApi.indexOf(column);
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
                    const event = (/** @type {?} */ (Object.assign(Object.assign({}, matrixPoint), { source, rowTarget })));
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
        this._removePlugin(this.grid);
    }
    /**
     * @private
     * @template TEvent
     * @param {?} event
     * @return {?}
     */
    syncRow(event) {
        this.grid._cdkTable.syncRows(event.type, event.rowIndex);
    }
}
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
     * @protected
     */
    PblNgridTargetEventsPlugin.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    PblNgridTargetEventsPlugin.prototype._removePlugin;
    /** @type {?} */
    PblNgridTargetEventsPlugin.prototype.grid;
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
export class PblNgridTargetEventsPluginDirective extends PblNgridTargetEventsPlugin {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy90YXJnZXQtZXZlbnRzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFZLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFnQyxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFvQmhFLE1BQU0sT0FBTyxVQUFVLEdBQW1CLGNBQWM7Ozs7O0FBRXhELFNBQVMsWUFBWSxDQUFDLE1BQXNDO0lBQzFELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsTUFBYTs7VUFDOUIsVUFBVSxHQUFHLGNBQWMsQ0FBQyxtQkFBQSxNQUFNLENBQUMsTUFBTSxFQUFPLENBQUM7SUFDdkQsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLENBQUM7S0FDN0M7U0FBTSxJQUFJLGNBQWMsQ0FBQyxtQkFBQSxNQUFN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QU8sQ0FBdUIsS0FBdUU7UUFDM0csSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDRjs7O0lBeFVDLDhDQUEwRDs7SUFDMUQsaURBQTZEOztJQUM3RCw4Q0FBMEQ7O0lBQzFELDhDQUEwRDs7SUFFMUQsK0NBQXdFOztJQUN4RSxrREFBMkU7O0lBQzNFLCtDQUF3RTs7SUFDeEUsK0NBQXdFOztJQUV4RSwrQ0FBcUc7O0lBQ3JHLDZDQUFtRzs7SUFDbkcsMkNBQW9HOztJQUNwRyw2Q0FBc0c7Ozs7O0lBS3RHLCtDQUF5RDs7Ozs7SUFFekQsbURBQStEOztJQUVuRCwwQ0FBNEM7Ozs7O0lBQzVDLDhDQUE0Qjs7Ozs7SUFDNUIsZ0RBQThDOzs7OztBQXdUNUQsTUFBTSxPQUFPLG1DQUF1QyxTQUFRLDBCQUE2Qjs7Ozs7O0lBRXZGLFlBQVksS0FBNkIsRUFBRSxRQUFrQixFQUFFLFVBQW9DO1FBQ2pHLEtBQUssQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7OztZQWRGLFNBQVMsU0FBQzs7Z0JBRVQsUUFBUSxFQUFFLGlQQUFpUDs7Z0JBRTNQLE9BQU8sRUFBRSxDQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBRTthQUMxSTs7OztZQTNYUSxpQkFBaUI7WUFGc0MsUUFBUTtZQUU1Qyx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRXZlbnQsIHRpbWVyLCBPYnNlcnZlciwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYnVmZmVyV2hlbiwgZGVib3VuY2UsIG1hcCwgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsQ29sdW1uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCAqIGFzIEV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBtYXRyaXhSb3dGcm9tUm93LCBpc1Jvd0NvbnRhaW5lciwgZmluZENlbGxSZW5kZXJJbmRleCwgZmluZFBhcmVudENlbGwgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uIH0gZnJvbSAnLi9mb2N1cy1hbmQtc2VsZWN0aW9uJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdGFyZ2V0RXZlbnRzPzoge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIHRhcmdldCBldmVudHMgcGx1Z2luIG9uIGFsbCB0YWJsZSBpbnN0YW5jZXMgYnkgZGVmYXVsdC4gKi9cbiAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHRhcmdldEV2ZW50cz86IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luO1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgdGFyZ2V0RXZlbnRzOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICd0YXJnZXRFdmVudHMnID0gJ3RhcmdldEV2ZW50cyc7XG5cbmZ1bmN0aW9uIGhhc0xpc3RlbmVycyhzb3VyY2U6IHsgb2JzZXJ2ZXJzOiBPYnNlcnZlcjxhbnk+W10gfSk6IGJvb2xlYW4ge1xuICByZXR1cm4gc291cmNlLm9ic2VydmVycy5sZW5ndGggPiAwO1xufVxuXG5mdW5jdGlvbiBmaW5kRXZlbnRTb3VyY2Uoc291cmNlOiBFdmVudCk6IHsgdHlwZTogJ3JvdycgfCAnY2VsbCcsIHRhcmdldDogSFRNTEVsZW1lbnQgfSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGNlbGxUYXJnZXQgPSBmaW5kUGFyZW50Q2VsbChzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG4gIGlmIChjZWxsVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHsgdHlwZTogJ2NlbGwnLCB0YXJnZXQ6IGNlbGxUYXJnZXQgfTtcbiAgfSBlbHNlIGlmIChpc1Jvd0NvbnRhaW5lcihzb3VyY2UudGFyZ2V0IGFzIGFueSkpIHtcbiAgICByZXR1cm4geyB0eXBlOiAnY2VsbCcsIHRhcmdldDogc291cmNlLnRhcmdldCBhcyBhbnkgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuT25jZSgpOiB2b2lkIHtcbiAgUGJsQ29sdW1uLmV4dGVuZFByb3BlcnR5KCdlZGl0YWJsZScpO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VCA9IGFueT4ge1xuICByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0RibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93RW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgY2VsbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbExlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG5cbiAgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleVVwID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgS2V5Ym9hcmRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAga2V5RG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBgZ2lyZGAgaW5zdGVhZCAqL1xuICBnZXQgdGFibGUoKTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB7IHJldHVybiB0aGlzLmdyaWQ7IH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICAgIGlmIChncmlkLmlzSW5pdCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD4ge1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSk7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPih0YWJsZSwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBEb21FdmVudHMoKTtcbiAgICBoYW5kbGVGb2N1c0FuZFNlbGVjdGlvbih0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBEb21FdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ3JpZDtcbiAgICBjb25zdCBjZGtUYWJsZSA9IGdyaWQuX2Nka1RhYmxlO1xuICAgIGNvbnN0IGNka1RhYmxlRWxlbWVudDogSFRNTEVsZW1lbnQgPSBjZGtUYWJsZVsnX2VsZW1lbnQnXTtcblxuICAgIGNvbnN0IGNyZWF0ZUNlbGxFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oY2VsbFRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50KTogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gY2VsbFRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgbWF0cml4UG9pbnQgPSBtYXRyaXhSb3dGcm9tUm93KHJvd1RhcmdldCwgY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyKTtcbiAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gPSB7IC4uLm1hdHJpeFBvaW50LCBzb3VyY2UsIGNlbGxUYXJnZXQsIHJvd1RhcmdldCB9IGFzIGFueTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLnJvdyA9IGdyaWQuZHMucmVuZGVyZWREYXRhW21hdHJpeFBvaW50LnJvd0luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5zdWJUeXBlID09PSAnbWV0YScpIHtcbiAgICAgICAgICAvLyBXaGVuIG11bHRpcGxlIGNvbnRhaW5lcnMgZXhpc3RzIChmaXhlZC9zdGlja3kvcm93KSB0aGUgcm93SW5kZXggd2UgZ2V0IGlzIHRoZSBvbmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lci4uXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBmaW5kIHRoZSByb3dJbmRleCByZWxhdGl2ZSB0byB0aGUgZGVmaW5pdGlvbnM6XG4gICAgICAgICAgY29uc3QgeyBtZXRhUm93U2VydmljZSB9ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaTtcbiAgICAgICAgICBjb25zdCBkYiA9IGV2ZW50LnR5cGUgPT09ICdoZWFkZXInID8gbWV0YVJvd1NlcnZpY2UuaGVhZGVyIDogbWV0YVJvd1NlcnZpY2UuZm9vdGVyO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBjb2xsIG9mIFtkYi5maXhlZCwgZGIucm93LCBkYi5zdGlja3ldKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb2xsLmZpbmQoIGl0ZW0gPT4gaXRlbS5lbCA9PT0gZXZlbnQucm93VGFyZ2V0ICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnJvd0luZGV4ID0gcmVzdWx0LmluZGV4O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBwcm92aWRlIGNvbHVtbiBpbmZvcm1hdGlvbiBub3IgdGhlIGNvbHVtbiBpdHNlbGYuIFRoaXMgd2lsbCBleHRlbmQgZnVuY3Rpb25hbGl0eSB0byBhZGQgdGhlIGNvbHVtbkluZGV4IGFuZCBjb2x1bW4uXG4gICAgICAgICAgICBUaGUgc2ltcGxlIGNhc2UgaXMgd2hlbiBgc3ViVHlwZSA9PT0gJ2RhdGEnYCwgaW4gdGhpcyBjYXNlIHRoZSBjb2x1bW4gaXMgYWx3YXlzIHRoZSBkYXRhIGNvbHVtbiBmb3IgYWxsIHR5cGVzIChoZWFkZXIsIGRhdGEgYW5kIGZvb3RlcilcblxuICAgICAgICAgICAgSWYgYHN1YlR5cGUgIT09ICdkYXRhJ2Agd2UgbmVlZCB0byBnZXQgdGhlIHByb3BlciBjb2x1bW4gYmFzZWQgdHlwZSAodHlwZSBjYW4gb25seSBiZSBgaGVhZGVyYCBvciBgZm9vdGVyYCBhdCB0aGlzIHBvaW50KS5cbiAgICAgICAgICAgIEJ1dCB0aGF0J3Mgbm90IGFsbCwgYmVjYXVzZSBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBoYW5kbGUgYG1ldGEtZ3JvdXBgIHN1YlR5cGUgd2UgbmVlZCB0byBkbyBpdCBoZXJlLi4uXG4gICAgICAgICovXG4gICAgICAgIGV2ZW50LmNvbEluZGV4ID0gZmluZENlbGxSZW5kZXJJbmRleChjZWxsVGFyZ2V0KTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnN1YlR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbkF0KGV2ZW50LmNvbEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkuaW5kZXhPZihjb2x1bW4pO1xuICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFBvaW50PFQ+KS5jb250ZXh0ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmdldENlbGwoZXZlbnQucm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29sdW1uU3RvcmU7XG4gICAgICAgICAgY29uc3Qgcm93SW5mbyA9IHN0b3JlLm1ldGFDb2x1bW5JZHNbbWF0cml4UG9pbnQudHlwZV1bZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHN0b3JlLmZpbmQocm93SW5mby5rZXlzW2V2ZW50LmNvbEluZGV4XSk7XG4gICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gcmVjb3JkLmhlYWRlckdyb3VwIDogcmVjb3JkLmZvb3Rlckdyb3VwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5jb2x1bW4gPSBtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHJlY29yZC5oZWFkZXIgOiByZWNvcmQuZm9vdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUm93RXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KHJvd1RhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50LCByb290PzogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAocm9vdCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gPSB7XG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHJvd1RhcmdldCxcbiAgICAgICAgICB0eXBlOiByb290LnR5cGUsXG4gICAgICAgICAgc3ViVHlwZTogcm9vdC5zdWJUeXBlLFxuICAgICAgICAgIHJvd0luZGV4OiByb290LnJvd0luZGV4LFxuICAgICAgICAgIHJvb3RcbiAgICAgICAgfSBhcyBhbnk7XG4gICAgICAgIGlmIChyb290LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5yb3cgPSByb290LnJvdztcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dCA9IHJvb3QuY29udGV4dC5yb3dDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeFBvaW50ID0gbWF0cml4Um93RnJvbVJvdyhyb3dUYXJnZXQsIGNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcik7XG4gICAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiA9IHsgLi4ubWF0cml4UG9pbnQsIHNvdXJjZSwgcm93VGFyZ2V0IH0gYXMgYW55O1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmdldFJvdyhtYXRyaXhQb2ludC5yb3dJbmRleCk7XG4gICAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikucm93ID0gKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCBpdCBjYW4gb25seSBiZSBgbWV0YWAgYmVjYXVzZSBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBoYW5kbGUgYG1ldGEtZ3JvdXBgIHN1YlR5cGUuXG4gICAgICAgICAgICAgIFdlIG5lZWQgdG8gZXh0ZW5kIHRoaXMgbWlzc2luZyBwYXJ0LCB3ZSBkb24ndCBoYXZlIGNvbHVtbnMgaGVyZSBzbyB3ZSB3aWxsIHRyeSB0byBpbmZlciBpdCB1c2luZyB0aGUgZmlyc3QgY29sdW1uLlxuXG4gICAgICAgICAgICAgIEl0J3Mgc2ltaWxhciB0byBob3cgaXQncyBoYW5kbGVkIGluIGNlbGwgY2xpY2tzLCBidXQgaGVyZSB3ZSBkb24ndCBuZWVkIHRvIGV4dGVuZHMgdGhlIGNvbHVtbiBpbmZvLlxuICAgICAgICAgICAgICBXZSBvbmx5IG5lZWQgdG8gY2hhbmdlIHRoZSBgc3ViVHlwZWAgd2hlbiB0aGUgcm93IGlzIGEgZ3JvdXAgcm93LCBnZXR0aW5nIGEgc3BlY2lmaWMgY29sdW1uIGlzIGlycmVsZXZhbnQuXG4gICAgICAgICAgICAgIFdlIGp1c3QgbmVlZCBBIGNvbHVtbiBiZWNhdXNlIGdyb3VwIGNvbHVtbnMgZG9uJ3QgbWl4IHdpdGggcmVndWxhciBtZXRhIGNvbHVtbnMuXG5cbiAgICAgICAgICAgICAgTk9URTogV2hlbiBzdWJUeXBlIGlzIG5vdCAnZGF0YScgdGhlIHlwZSBjYW4gb25seSBiZSBgaGVhZGVyYCBvciBgZm9vdGVyYC5cbiAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC5zdWJUeXBlICE9PSAnZGF0YScpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0luZm8gPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlLm1ldGFDb2x1bW5JZHNbbWF0cml4UG9pbnQudHlwZV1bZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgICBldmVudC5zdWJUeXBlID0gJ21ldGEtZ3JvdXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbGFzdENlbGxFbnRlckV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD47XG4gICAgbGV0IGxhc3RSb3dFbnRlckV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPjtcbiAgICBjb25zdCBlbWl0Q2VsbExlYXZlID0gKHNvdXJjZTogTW91c2VFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAobGFzdENlbGxFbnRlckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsRW50ZXJFdmVudFRlbXAgPSBsYXN0Q2VsbEVudGVyRXZlbnQ7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlLmVtaXQoT2JqZWN0LmFzc2lnbih7fSwgbGFzdENlbGxFbnRlckV2ZW50VGVtcCwgeyBzb3VyY2UgfSkpO1xuICAgICAgICBsYXN0Q2VsbEVudGVyRXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBlbWl0Um93TGVhdmUgPSAoc291cmNlOiBNb3VzZUV2ZW50KTogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKGxhc3RSb3dFbnRlckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RSb3dFbnRlckV2ZW50VGVtcCA9IGxhc3RSb3dFbnRlckV2ZW50O1xuICAgICAgICB0aGlzLnJvd0xlYXZlLmVtaXQoT2JqZWN0LmFzc2lnbih7fSwgbGFzdFJvd0VudGVyRXZlbnRUZW1wLCB7IHNvdXJjZSB9KSk7XG4gICAgICAgIGxhc3RSb3dFbnRlckV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gbGFzdFJvd0VudGVyRXZlbnRUZW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb2Nlc3NFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZTogVEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBmaW5kRXZlbnRTb3VyY2UoZSk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gJ2NlbGwnKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBjcmVhdGVDZWxsRXZlbnQ8VEV2ZW50PihyZXN1bHQudGFyZ2V0LCBlKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgd2FpdFRpbWU6IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxEYmxDbGljaykgPyAyNTAgOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09ICdyb3cnKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBjcmVhdGVSb3dFdmVudChyZXN1bHQudGFyZ2V0LCBlKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgd2FpdFRpbWU6IGhhc0xpc3RlbmVycyh0aGlzLnJvd0RibENsaWNrKSA/IDI1MCA6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogU3BsaXQgdGhlIHJlc3VsdCBvZiBwcm9jZXNzRXZlbnQgaW50byBjZWxsIGFuZCByb3cgZXZlbnRzLCBpZiB0eXBlIGlzIHJvdyBvbmx5IHJvdyBldmVudCBpcyByZXR1cm5lZCwgaWYgY2VsbCB0aGVuIGNlbGwgaXMgcmV0dXJuZWQgYW5kIHJvdyBpcyBjcmVhdGVkIGFsb25nIHNpZGUuICovXG4gICAgY29uc3Qgc3BsaXRQcm9jZXNzZWRFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnQ6IFJldHVyblR5cGU8dHlwZW9mIHByb2Nlc3NFdmVudD4pID0+IHtcbiAgICAgIGNvbnN0IGNlbGxFdmVudCA9IGV2ZW50LnR5cGUgPT09ICdjZWxsJyA/IGV2ZW50LmV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IDogdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgcm93RXZlbnQgPSBjZWxsRXZlbnRcbiAgICAgICAgPyBjcmVhdGVSb3dFdmVudDxURXZlbnQ+KGNlbGxFdmVudC5yb3dUYXJnZXQsIGNlbGxFdmVudC5zb3VyY2UsIGNlbGxFdmVudClcbiAgICAgICAgOiBldmVudC5ldmVudCBhcyBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPlxuICAgICAgO1xuICAgICAgcmV0dXJuIHsgY2VsbEV2ZW50LCByb3dFdmVudCB9O1xuICAgIH07XG5cbiAgICBjb25zdCByZWdpc3RlclVwRG93bkV2ZW50cyA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnROYW1lOiBzdHJpbmcsIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PikgPT4ge1xuICAgICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgZXZlbnROYW1lKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIGZpbHRlciggc291cmNlID0+IGhhc0xpc3RlbmVycyhlbWl0dGVyKSApLFxuICAgICAgICAgIG1hcChwcm9jZXNzRXZlbnQpLFxuICAgICAgICAgIGZpbHRlciggcmVzdWx0ID0+ICEhcmVzdWx0ICksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggcmVzdWx0ID0+IHtcbiAgICAgICAgICBjb25zdCB7IGNlbGxFdmVudCwgcm93RXZlbnQgfSA9IHNwbGl0UHJvY2Vzc2VkRXZlbnQ8VEV2ZW50PihyZXN1bHQpO1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdChjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxNb3VzZUV2ZW50PignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8TW91c2VFdmVudD4oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxLZXlib2FyZEV2ZW50Pigna2V5dXAnLCB0aGlzLmtleVVwKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxLZXlib2FyZEV2ZW50Pigna2V5ZG93bicsIHRoaXMua2V5RG93bik7XG5cbiAgICAvKlxuICAgICAgSGFuZGxpbmcgY2xpY2sgc3RyZWFtIGZvciBib3RoIGNsaWNrIGFuZCBkb3VibGUgY2xpY2sgZXZlbnRzLlxuICAgICAgV2Ugd2FudCB0byBkZXRlY3QgZG91YmxlIGNsaWNrcyBhbmQgY2xpY2tzIHdpdGggbWluaW1hbCBkZWxheXNcbiAgICAgIFdlIGNoZWNrIGlmIGEgZG91YmxlIGNsaWNrIGhhcyBsaXN0ZW5lcnMsIGlmIG5vdCB3ZSB3b24ndCBkZWxheSB0aGUgY2xpY2suLi5cbiAgICAgIFRPRE86IG9uIGRvdWJsZSBjbGljaywgZG9uJ3Qgd2FpdCB0aGUgd2hvbGUgMjUwIG1zIGlmIDIgY2xpY2tzIGhhcHBlbi5cbiAgICAqL1xuICAgIGNvbnN0IGNsaWNrU3RyZWFtID0gZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICBmaWx0ZXIoIHNvdXJjZSA9PiBoYXNMaXN0ZW5lcnModGhpcy5jZWxsQ2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxEYmxDbGljaykgfHwgaGFzTGlzdGVuZXJzKHRoaXMucm93Q2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLnJvd0RibENsaWNrKSApLFxuICAgICAgbWFwKHByb2Nlc3NFdmVudCksXG4gICAgICBmaWx0ZXIoIHJlc3VsdCA9PiAhIXJlc3VsdCApLFxuICAgICk7XG5cbiAgICBjbGlja1N0cmVhbVxuICAgICAgLnBpcGUoXG4gICAgICAgIGJ1ZmZlcldoZW4oICgpID0+IGNsaWNrU3RyZWFtLnBpcGUoIGRlYm91bmNlKCBlID0+IHRpbWVyKGUud2FpdFRpbWUpICkgKSApLFxuICAgICAgICBmaWx0ZXIoIGV2ZW50cyA9PiBldmVudHMubGVuZ3RoID4gMCApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnRzID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHMuc2hpZnQoKTtcbiAgICAgICAgY29uc3QgaXNEb3VibGVDbGljayA9IGV2ZW50cy5sZW5ndGggPT09IDE7IC8vIGlmIHdlIGhhdmUgMiBldmVudHMgaXRzIGRvdWJsZSBjbGljaywgb3RoZXJ3aXNlIHNpbmdsZS5cbiAgICAgICAgY29uc3QgeyBjZWxsRXZlbnQsIHJvd0V2ZW50IH0gPSBzcGxpdFByb2Nlc3NlZEV2ZW50PE1vdXNlRXZlbnQ+KGV2ZW50KTtcbiAgICAgICAgaWYgKGlzRG91YmxlQ2xpY2spIHtcbiAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxEYmxDbGljay5lbWl0KGNlbGxFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucm93RGJsQ2xpY2suZW1pdChyb3dFdmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsQ2xpY2suZW1pdChjZWxsRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvd0NsaWNrLmVtaXQocm93RXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY1JvdyhjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgfSk7XG5cblxuICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdtb3VzZWxlYXZlJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKHNvdXJjZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBsZXQgbGFzdEV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPiA9IGVtaXRDZWxsTGVhdmUoc291cmNlKTtcbiAgICAgICAgbGFzdEV2ZW50ID0gZW1pdFJvd0xlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGxhc3RFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ21vdXNlbW92ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChzb3VyY2U6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbFRhcmdldDogSFRNTEVsZW1lbnQgPSBmaW5kUGFyZW50Q2VsbChzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsVGFyZ2V0ID0gbGFzdENlbGxFbnRlckV2ZW50ICYmIGxhc3RDZWxsRW50ZXJFdmVudC5jZWxsVGFyZ2V0O1xuICAgICAgICBjb25zdCBsYXN0Um93VGFyZ2V0ID0gbGFzdFJvd0VudGVyRXZlbnQgJiYgbGFzdFJvd0VudGVyRXZlbnQucm93VGFyZ2V0O1xuXG4gICAgICAgIGxldCBjZWxsRXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PjtcbiAgICAgICAgbGV0IGxhc3RFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD47XG5cbiAgICAgICAgaWYgKGxhc3RDZWxsVGFyZ2V0ICE9PSBjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgbGFzdEV2ZW50ID0gZW1pdENlbGxMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKGxhc3RDZWxsVGFyZ2V0ICE9PSBjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgICBjZWxsRXZlbnQgPSBjcmVhdGVDZWxsRXZlbnQoY2VsbFRhcmdldCwgc291cmNlKTtcbiAgICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jZWxsRW50ZXIuZW1pdChsYXN0Q2VsbEVudGVyRXZlbnQgPSBjZWxsRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gKGNlbGxFdmVudCAmJiBjZWxsRXZlbnQucm93VGFyZ2V0KSB8fCAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpICYmIHNvdXJjZS50YXJnZXQgYXMgYW55KTtcblxuICAgICAgICBpZiAobGFzdFJvd1RhcmdldCAhPT0gcm93VGFyZ2V0KSB7XG4gICAgICAgICAgbGFzdEV2ZW50ID0gZW1pdFJvd0xlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvd1RhcmdldCkge1xuICAgICAgICAgIGlmIChsYXN0Um93VGFyZ2V0ICE9PSByb3dUYXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0V2ZW50ID0gY3JlYXRlUm93RXZlbnQocm93VGFyZ2V0LCBzb3VyY2UsIGNlbGxFdmVudCk7XG4gICAgICAgICAgICBpZiAocm93RXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yb3dFbnRlci5lbWl0KGxhc3RSb3dFbnRlckV2ZW50ID0gcm93RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgICB0aGlzLnN5bmNSb3cobGFzdEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jUm93PFRFdmVudCBleHRlbmRzIEV2ZW50PihldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IHZvaWQge1xuICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoZXZlbnQudHlwZSwgZXZlbnQucm93SW5kZXgpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3RhcmdldEV2ZW50c10sIHBibC1uZ3JpZFtyb3dDbGlja10sIHBibC1uZ3JpZFtyb3dEYmxDbGlja10sIHBibC1uZ3JpZFtyb3dFbnRlcl0sIHBibC1uZ3JpZFtyb3dMZWF2ZV0sIHBibC1uZ3JpZFtjZWxsQ2xpY2tdLCBwYmwtbmdyaWRbY2VsbERibENsaWNrXSwgcGJsLW5ncmlkW2NlbGxFbnRlcl0sIHBibC1uZ3JpZFtjZWxsTGVhdmVdLCBwYmwtbmdyaWRba2V5RG93bl0sIHBibC1uZ3JpZFtrZXlVcF0nLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLW91dHB1dC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgb3V0cHV0czogWyAncm93Q2xpY2snLCAncm93RGJsQ2xpY2snLCAncm93RW50ZXInLCAncm93TGVhdmUnLCAnY2VsbENsaWNrJywgJ2NlbGxEYmxDbGljaycsICdjZWxsRW50ZXInLCAnY2VsbExlYXZlJywgJ2tleURvd24nLCAna2V5VXAnIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgc3VwZXIodGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==