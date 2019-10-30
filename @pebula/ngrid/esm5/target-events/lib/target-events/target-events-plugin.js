/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, OnDestroy, ChangeDetectorRef, Injector } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, PblColumn, TablePlugin } from '@pebula/ngrid';
import { matrixRowFromRow, isRowContainer, findCellRenderIndex, findParentCell } from './utils';
import { handleFocusAndSelection } from './focus-and-selection';
/** @type {?} */
export var PLUGIN_KEY = 'targetEvents';
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
    var cellTarget = findParentCell((/** @type {?} */ (source.target)));
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
var PblNgridTargetEventsPlugin = /** @class */ (function () {
    function PblNgridTargetEventsPlugin(table, injector, pluginCtrl) {
        var _this = this;
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
            var subscription_1 = pluginCtrl.events
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    _this.init();
                    subscription_1.unsubscribe();
                    subscription_1 = undefined;
                }
            }));
        }
    }
    PblNgridTargetEventsPlugin_1 = PblNgridTargetEventsPlugin;
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    PblNgridTargetEventsPlugin.create = /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    function (table, injector) {
        /** @type {?} */
        var pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridTargetEventsPlugin_1(table, injector, pluginCtrl);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridTargetEventsPlugin.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        this.setupDomEvents();
        handleFocusAndSelection(this);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridTargetEventsPlugin.prototype.setupDomEvents = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var table = this.table;
        /** @type {?} */
        var cdkTable = table._cdkTable;
        /** @type {?} */
        var cdkTableElement = cdkTable['_element'];
        /** @type {?} */
        var createCellEvent = (/**
         * @template TEvent
         * @param {?} cellTarget
         * @param {?} source
         * @return {?}
         */
        function (cellTarget, source) {
            var e_1, _a;
            /** @type {?} */
            var rowTarget = cellTarget.parentElement;
            /** @type {?} */
            var matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
            if (matrixPoint) {
                /** @type {?} */
                var event_1 = (/** @type {?} */ (tslib_1.__assign({}, matrixPoint, { source: source, cellTarget: cellTarget, rowTarget: rowTarget })));
                if (matrixPoint.type === 'data') {
                    ((/** @type {?} */ (event_1))).row = table.ds.renderedData[matrixPoint.rowIndex];
                }
                else if (event_1.subType === 'meta') {
                    // When multiple containers exists (fixed/sticky/row) the rowIndex we get is the one relative to the container..
                    // We need to find the rowIndex relative to the definitions:
                    var metaRowService = _this.pluginCtrl.extApi.metaRowService;
                    /** @type {?} */
                    var db = event_1.type === 'header' ? metaRowService.header : metaRowService.footer;
                    try {
                        for (var _b = tslib_1.__values([db.fixed, db.row, db.sticky]), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var coll = _c.value;
                            /** @type {?} */
                            var result = coll.find((/**
                             * @param {?} item
                             * @return {?}
                             */
                            function (item) { return item.el === event_1.rowTarget; }));
                            if (result) {
                                event_1.rowIndex = result.index;
                                break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
                /* `metadataFromElement()` does not provide column information nor the column itself. This will extend functionality to add the columnIndex and column.
                    The simple case is when `subType === 'data'`, in this case the column is always the data column for all types (header, data and footer)
        
                    If `subType !== 'data'` we need to get the proper column based type (type can only be `header` or `footer` at this point).
                    But that's not all, because `metadataFromElement()` does not handle `meta-group` subType we need to do it here...
                */
                event_1.colIndex = findCellRenderIndex(cellTarget);
                if (matrixPoint.subType === 'data') {
                    /** @type {?} */
                    var column = _this.table.columnApi.findColumnAt(event_1.colIndex);
                    /** @type {?} */
                    var columnIndex = _this.table.columnApi.indexOf(column);
                    event_1.column = column;
                    ((/** @type {?} */ (event_1))).context = _this.pluginCtrl.extApi.contextApi.getCell(event_1.rowIndex, columnIndex);
                }
                else {
                    /** @type {?} */
                    var store = _this.pluginCtrl.extApi.columnStore;
                    /** @type {?} */
                    var rowInfo = store.metaColumnIds[matrixPoint.type][event_1.rowIndex];
                    /** @type {?} */
                    var record = store.find(rowInfo.keys[event_1.colIndex]);
                    if (rowInfo.isGroup) {
                        event_1.subType = 'meta-group';
                        event_1.column = matrixPoint.type === 'header' ? record.headerGroup : record.footerGroup;
                    }
                    else {
                        event_1.column = matrixPoint.type === 'header' ? record.header : record.footer;
                    }
                }
                return event_1;
            }
        });
        /** @type {?} */
        var createRowEvent = (/**
         * @template TEvent
         * @param {?} rowTarget
         * @param {?} source
         * @param {?=} root
         * @return {?}
         */
        function (rowTarget, source, root) {
            if (root) {
                /** @type {?} */
                var event_2 = (/** @type {?} */ ({
                    source: source,
                    rowTarget: rowTarget,
                    type: root.type,
                    subType: root.subType,
                    rowIndex: root.rowIndex,
                    root: root
                }));
                if (root.type === 'data') {
                    ((/** @type {?} */ (event_2))).row = root.row;
                    ((/** @type {?} */ (event_2))).context = root.context.rowContext;
                }
                return event_2;
            }
            else {
                /** @type {?} */
                var matrixPoint = matrixRowFromRow(rowTarget, cdkTable._rowOutlet.viewContainer);
                if (matrixPoint) {
                    /** @type {?} */
                    var event_3 = (/** @type {?} */ (tslib_1.__assign({}, matrixPoint, { source: source, rowTarget: rowTarget })));
                    if (matrixPoint.type === 'data') {
                        ((/** @type {?} */ (event_3))).context = _this.pluginCtrl.extApi.contextApi.getRow(matrixPoint.rowIndex);
                        ((/** @type {?} */ (event_3))).row = ((/** @type {?} */ (event_3))).context.$implicit;
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
                        var rowInfo = _this.pluginCtrl.extApi.columnStore.metaColumnIds[matrixPoint.type][event_3.rowIndex];
                        if (rowInfo.isGroup) {
                            event_3.subType = 'meta-group';
                        }
                    }
                    return event_3;
                }
            }
        });
        /** @type {?} */
        var lastCellEnterEvent;
        /** @type {?} */
        var lastRowEnterEvent;
        /** @type {?} */
        var emitCellLeave = (/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (lastCellEnterEvent) {
                /** @type {?} */
                var lastCellEnterEventTemp = lastCellEnterEvent;
                _this.cellLeave.emit(Object.assign({}, lastCellEnterEventTemp, { source: source }));
                lastCellEnterEvent = undefined;
                return lastCellEnterEventTemp;
            }
        });
        /** @type {?} */
        var emitRowLeave = (/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (lastRowEnterEvent) {
                /** @type {?} */
                var lastRowEnterEventTemp = lastRowEnterEvent;
                _this.rowLeave.emit(Object.assign({}, lastRowEnterEventTemp, { source: source }));
                lastRowEnterEvent = undefined;
                return lastRowEnterEventTemp;
            }
        });
        /** @type {?} */
        var processEvent = (/**
         * @template TEvent
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var result = findEventSource(e);
            if (result) {
                if (result.type === 'cell') {
                    /** @type {?} */
                    var event_4 = createCellEvent(result.target, e);
                    if (event_4) {
                        return {
                            type: result.type,
                            event: event_4,
                            waitTime: hasListeners(_this.cellDblClick) ? 250 : 1,
                        };
                    }
                }
                else if (result.type === 'row') {
                    /** @type {?} */
                    var event_5 = createRowEvent(result.target, e);
                    if (event_5) {
                        return {
                            type: result.type,
                            event: event_5,
                            waitTime: hasListeners(_this.rowDblClick) ? 250 : 1,
                        };
                    }
                }
            }
        });
        /**
         * Split the result of processEvent into cell and row events, if type is row only row event is returned, if cell then cell is returned and row is created along side.
         * @type {?}
         */
        var splitProcessedEvent = (/**
         * @template TEvent
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var cellEvent = event.type === 'cell' ? (/** @type {?} */ (event.event)) : undefined;
            /** @type {?} */
            var rowEvent = cellEvent
                ? createRowEvent(cellEvent.rowTarget, cellEvent.source, cellEvent)
                : (/** @type {?} */ (event.event));
            return { cellEvent: cellEvent, rowEvent: rowEvent };
        });
        /** @type {?} */
        var registerUpDownEvents = (/**
         * @template TEvent
         * @param {?} eventName
         * @param {?} emitter
         * @return {?}
         */
        function (eventName, emitter) {
            fromEvent(cdkTableElement, eventName)
                .pipe(takeUntil(_this.destroyed), filter((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return hasListeners(emitter); })), map(processEvent), filter((/**
             * @param {?} result
             * @return {?}
             */
            function (result) { return !!result; })))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                var _a = splitProcessedEvent(result), cellEvent = _a.cellEvent, rowEvent = _a.rowEvent;
                emitter.emit(cellEvent || rowEvent);
                _this.syncRow(cellEvent || rowEvent);
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
        var clickStream = fromEvent(cdkTableElement, 'click').pipe(takeUntil(this.destroyed), filter((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return hasListeners(_this.cellClick) || hasListeners(_this.cellDblClick) || hasListeners(_this.rowClick) || hasListeners(_this.rowDblClick); })), map(processEvent), filter((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return !!result; })));
        clickStream
            .pipe(bufferWhen((/**
         * @return {?}
         */
        function () { return clickStream.pipe(debounce((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return timer(e.waitTime); }))); })), filter((/**
         * @param {?} events
         * @return {?}
         */
        function (events) { return events.length > 0; })))
            .subscribe((/**
         * @param {?} events
         * @return {?}
         */
        function (events) {
            /** @type {?} */
            var event = events.shift();
            /** @type {?} */
            var isDoubleClick = events.length === 1;
            // if we have 2 events its double click, otherwise single.
            var _a = splitProcessedEvent(event), cellEvent = _a.cellEvent, rowEvent = _a.rowEvent;
            if (isDoubleClick) {
                if (cellEvent) {
                    _this.cellDblClick.emit(cellEvent);
                }
                _this.rowDblClick.emit(rowEvent);
            }
            else {
                if (cellEvent) {
                    _this.cellClick.emit(cellEvent);
                }
                _this.rowClick.emit(rowEvent);
            }
            _this.syncRow(cellEvent || rowEvent);
        }));
        fromEvent(cdkTableElement, 'mouseleave')
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            /** @type {?} */
            var lastEvent = emitCellLeave(source);
            lastEvent = emitRowLeave(source) || lastEvent;
            if (lastEvent) {
                _this.syncRow(lastEvent);
            }
        }));
        fromEvent(cdkTableElement, 'mousemove')
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            /** @type {?} */
            var cellTarget = findParentCell((/** @type {?} */ (source.target)));
            /** @type {?} */
            var lastCellTarget = lastCellEnterEvent && lastCellEnterEvent.cellTarget;
            /** @type {?} */
            var lastRowTarget = lastRowEnterEvent && lastRowEnterEvent.rowTarget;
            /** @type {?} */
            var cellEvent;
            /** @type {?} */
            var lastEvent;
            if (lastCellTarget !== cellTarget) {
                lastEvent = emitCellLeave(source) || lastEvent;
            }
            if (cellTarget) {
                if (lastCellTarget !== cellTarget) {
                    cellEvent = createCellEvent(cellTarget, source);
                    if (cellEvent) {
                        _this.cellEnter.emit(lastCellEnterEvent = cellEvent);
                    }
                }
                else {
                    return;
                }
            }
            /** @type {?} */
            var rowTarget = (cellEvent && cellEvent.rowTarget) || (isRowContainer((/** @type {?} */ (source.target))) && (/** @type {?} */ (source.target)));
            if (lastRowTarget !== rowTarget) {
                lastEvent = emitRowLeave(source) || lastEvent;
            }
            if (rowTarget) {
                if (lastRowTarget !== rowTarget) {
                    /** @type {?} */
                    var rowEvent = createRowEvent(rowTarget, source, cellEvent);
                    if (rowEvent) {
                        _this.rowEnter.emit(lastRowEnterEvent = rowEvent);
                    }
                }
            }
            if (lastEvent) {
                _this.syncRow(lastEvent);
            }
        }));
    };
    /**
     * @return {?}
     */
    PblNgridTargetEventsPlugin.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.destroyed.next();
        this.destroyed.complete();
        this._removePlugin(this.table);
    };
    /**
     * @private
     * @template TEvent
     * @param {?} event
     * @return {?}
     */
    PblNgridTargetEventsPlugin.prototype.syncRow = /**
     * @private
     * @template TEvent
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.table._cdkTable.syncRows(event.type, event.rowIndex);
    };
    var PblNgridTargetEventsPlugin_1;
    PblNgridTargetEventsPlugin.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    /**
     * @template T
     */
    PblNgridTargetEventsPlugin = PblNgridTargetEventsPlugin_1 = tslib_1.__decorate([
        TablePlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: runOnce }),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridTargetEventsPlugin);
    return PblNgridTargetEventsPlugin;
}());
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
var PblNgridTargetEventsPluginDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridTargetEventsPluginDirective, _super);
    function PblNgridTargetEventsPluginDirective(table, injector, pluginCtrl) {
        return _super.call(this, table, injector, pluginCtrl) || this;
    }
    /**
     * @return {?}
     */
    PblNgridTargetEventsPluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy();
    };
    PblNgridTargetEventsPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridTargetEventsPluginDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'pbl-ngrid[targetEvents], pbl-ngrid[rowClick], pbl-ngrid[rowDblClick], pbl-ngrid[rowEnter], pbl-ngrid[rowLeave], pbl-ngrid[cellClick], pbl-ngrid[cellDblClick], pbl-ngrid[cellEnter], pbl-ngrid[cellLeave], pbl-ngrid[keyDown], pbl-ngrid[keyUp]',
                    // tslint:disable-next-line:use-output-property-decorator
                    outputs: ['rowClick', 'rowDblClick', 'rowEnter', 'rowLeave', 'cellClick', 'cellDblClick', 'cellEnter', 'cellLeave', 'keyDown', 'keyUp']
                },] }
    ];
    /** @nocollapse */
    PblNgridTargetEventsPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    /**
     * @template T
     */
    PblNgridTargetEventsPluginDirective = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridTargetEventsPluginDirective);
    return PblNgridTargetEventsPluginDirective;
}(PblNgridTargetEventsPlugin));
export { PblNgridTargetEventsPluginDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy90YXJnZXQtZXZlbnRzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFZLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdwRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLG1CQUFtQixFQUFFLGNBQWMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNoRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7QUFvQmhFLE1BQU0sS0FBTyxVQUFVLEdBQW1CLGNBQWM7Ozs7O0FBRXhELFNBQVMsWUFBWSxDQUFDLE1BQXNDO0lBQzFELE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7Ozs7O0FBRUQsU0FBUyxlQUFlLENBQUMsTUFBYTs7UUFDOUIsVUFBVSxHQUFHLGNBQWMsQ0FBQyxtQkFBQSxNQUFNLENBQUMsTUFBTSxFQUFPLENBQUM7SUFDdkQsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLEVBQUUsSUFBSSxFQUFF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O1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7O2dCQU5rQixpQkFBaUI7Z0JBQWlCLFFBQVE7Z0JBQWMsd0JBQXdCOzs7Z0JBVHBHLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLGlQQUFpUDs7b0JBRTNQLE9BQU8sRUFBRSxDQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBRTtpQkFDMUk7Ozs7Z0JBeFhRLGlCQUFpQjtnQkFIc0MsUUFBUTtnQkFHNUMsd0JBQXdCOzs7OztJQTBYdkMsbUNBQW1DO1FBRC9DLElBQUksRUFBRTtpREFHYyxpQkFBaUIsRUFBaUIsUUFBUSxFQUFjLHdCQUF3QjtPQUZ4RixtQ0FBbUMsQ0FVL0M7SUFBRCwwQ0FBQztDQUFBLENBVjJELDBCQUEwQixHQVVyRjtTQVZZLG1DQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb21FdmVudCwgdGltZXIsIE9ic2VydmVyLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBidWZmZXJXaGVuLCBkZWJvdW5jZSwgbWFwLCBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxDb2x1bW4sIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCAqIGFzIEV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBtYXRyaXhSb3dGcm9tUm93LCBpc1Jvd0NvbnRhaW5lciwgZmluZENlbGxSZW5kZXJJbmRleCwgZmluZFBhcmVudENlbGwgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uIH0gZnJvbSAnLi9mb2N1cy1hbmQtc2VsZWN0aW9uJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRhcmdldEV2ZW50cz86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSB0YXJnZXQgZXZlbnRzIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICB0YXJnZXRFdmVudHM/OiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIHRhcmdldEV2ZW50czoga2V5b2YgdHlwZW9mIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAndGFyZ2V0RXZlbnRzJyA9ICd0YXJnZXRFdmVudHMnO1xuXG5mdW5jdGlvbiBoYXNMaXN0ZW5lcnMoc291cmNlOiB7IG9ic2VydmVyczogT2JzZXJ2ZXI8YW55PltdIH0pOiBib29sZWFuIHtcbiAgcmV0dXJuIHNvdXJjZS5vYnNlcnZlcnMubGVuZ3RoID4gMDtcbn1cblxuZnVuY3Rpb24gZmluZEV2ZW50U291cmNlKHNvdXJjZTogRXZlbnQpOiB7IHR5cGU6ICdyb3cnIHwgJ2NlbGwnLCB0YXJnZXQ6IEhUTUxFbGVtZW50IH0gfCB1bmRlZmluZWQge1xuICBjb25zdCBjZWxsVGFyZ2V0ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICBpZiAoY2VsbFRhcmdldCkge1xuICAgIHJldHVybiB7IHR5cGU6ICdjZWxsJywgdGFyZ2V0OiBjZWxsVGFyZ2V0IH07XG4gIH0gZWxzZSBpZiAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogJ2NlbGwnLCB0YXJnZXQ6IHNvdXJjZS50YXJnZXQgYXMgYW55IH07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bk9uY2UoKTogdm9pZCB7XG4gIFBibENvbHVtbi5leHRlbmRQcm9wZXJ0eSgnZWRpdGFibGUnKTtcbn1cblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnLCBydW5PbmNlIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VCA9IGFueT4ge1xuICByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0RibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93RW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgY2VsbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbExlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG5cbiAgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleVVwID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgS2V5Ym9hcmRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAga2V5RG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgdGhpcy5jZHIgPSBpbmplY3Rvci5nZXQoQ2hhbmdlRGV0ZWN0b3JSZWYpO1xuICAgIGlmICh0YWJsZS5pc0luaXQpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+IHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD4odGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldHVwRG9tRXZlbnRzKCk7XG4gICAgaGFuZGxlRm9jdXNBbmRTZWxlY3Rpb24odGhpcyk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwRG9tRXZlbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZSA9IHRhYmxlLl9jZGtUYWJsZTtcbiAgICBjb25zdCBjZGtUYWJsZUVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gY2RrVGFibGVbJ19lbGVtZW50J107XG5cbiAgICBjb25zdCBjcmVhdGVDZWxsRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGNlbGxUYXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IFRFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGNvbnN0IHJvd1RhcmdldCA9IGNlbGxUYXJnZXQucGFyZW50RWxlbWVudDtcbiAgICAgIGNvbnN0IG1hdHJpeFBvaW50ID0gbWF0cml4Um93RnJvbVJvdyhyb3dUYXJnZXQsIGNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcik7XG4gICAgICBpZiAobWF0cml4UG9pbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+ID0geyAuLi5tYXRyaXhQb2ludCwgc291cmNlLCBjZWxsVGFyZ2V0LCByb3dUYXJnZXQgfSBhcyBhbnk7XG4gICAgICAgIGlmIChtYXRyaXhQb2ludC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFBvaW50PFQ+KS5yb3cgPSB0YWJsZS5kcy5yZW5kZXJlZERhdGFbbWF0cml4UG9pbnQucm93SW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnN1YlR5cGUgPT09ICdtZXRhJykge1xuICAgICAgICAgIC8vIFdoZW4gbXVsdGlwbGUgY29udGFpbmVycyBleGlzdHMgKGZpeGVkL3N0aWNreS9yb3cpIHRoZSByb3dJbmRleCB3ZSBnZXQgaXMgdGhlIG9uZSByZWxhdGl2ZSB0byB0aGUgY29udGFpbmVyLi5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGZpbmQgdGhlIHJvd0luZGV4IHJlbGF0aXZlIHRvIHRoZSBkZWZpbml0aW9uczpcbiAgICAgICAgICBjb25zdCB7IG1ldGFSb3dTZXJ2aWNlIH0gPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpO1xuICAgICAgICAgIGNvbnN0IGRiID0gZXZlbnQudHlwZSA9PT0gJ2hlYWRlcicgPyBtZXRhUm93U2VydmljZS5oZWFkZXIgOiBtZXRhUm93U2VydmljZS5mb290ZXI7XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGNvbGwgb2YgW2RiLmZpeGVkLCBkYi5yb3csIGRiLnN0aWNreV0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbGwuZmluZCggaXRlbSA9PiBpdGVtLmVsID09PSBldmVudC5yb3dUYXJnZXQgKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgZXZlbnQucm93SW5kZXggPSByZXN1bHQuaW5kZXg7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IHByb3ZpZGUgY29sdW1uIGluZm9ybWF0aW9uIG5vciB0aGUgY29sdW1uIGl0c2VsZi4gVGhpcyB3aWxsIGV4dGVuZCBmdW5jdGlvbmFsaXR5IHRvIGFkZCB0aGUgY29sdW1uSW5kZXggYW5kIGNvbHVtbi5cbiAgICAgICAgICAgIFRoZSBzaW1wbGUgY2FzZSBpcyB3aGVuIGBzdWJUeXBlID09PSAnZGF0YSdgLCBpbiB0aGlzIGNhc2UgdGhlIGNvbHVtbiBpcyBhbHdheXMgdGhlIGRhdGEgY29sdW1uIGZvciBhbGwgdHlwZXMgKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyKVxuXG4gICAgICAgICAgICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCB3ZSBuZWVkIHRvIGdldCB0aGUgcHJvcGVyIGNvbHVtbiBiYXNlZCB0eXBlICh0eXBlIGNhbiBvbmx5IGJlIGBoZWFkZXJgIG9yIGBmb290ZXJgIGF0IHRoaXMgcG9pbnQpLlxuICAgICAgICAgICAgQnV0IHRoYXQncyBub3QgYWxsLCBiZWNhdXNlIGBtZXRhZGF0YUZyb21FbGVtZW50KClgIGRvZXMgbm90IGhhbmRsZSBgbWV0YS1ncm91cGAgc3ViVHlwZSB3ZSBuZWVkIHRvIGRvIGl0IGhlcmUuLi5cbiAgICAgICAgKi9cbiAgICAgICAgZXZlbnQuY29sSW5kZXggPSBmaW5kQ2VsbFJlbmRlckluZGV4KGNlbGxUYXJnZXQpO1xuICAgICAgICBpZiAobWF0cml4UG9pbnQuc3ViVHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy50YWJsZS5jb2x1bW5BcGkuZmluZENvbHVtbkF0KGV2ZW50LmNvbEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMudGFibGUuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICAgICAgICBldmVudC5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhQb2ludDxUPikuY29udGV4dCA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRDZWxsKGV2ZW50LnJvd0luZGV4LCBjb2x1bW5JbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgc3RvcmUgPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlO1xuICAgICAgICAgIGNvbnN0IHJvd0luZm8gPSBzdG9yZS5tZXRhQ29sdW1uSWRzW21hdHJpeFBvaW50LnR5cGVdW2V2ZW50LnJvd0luZGV4XTtcbiAgICAgICAgICBjb25zdCByZWNvcmQgPSBzdG9yZS5maW5kKHJvd0luZm8ua2V5c1tldmVudC5jb2xJbmRleF0pO1xuICAgICAgICAgIGlmIChyb3dJbmZvLmlzR3JvdXApIHtcbiAgICAgICAgICAgIGV2ZW50LnN1YlR5cGUgPSAnbWV0YS1ncm91cCc7XG4gICAgICAgICAgICBldmVudC5jb2x1bW4gPSBtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHJlY29yZC5oZWFkZXJHcm91cCA6IHJlY29yZC5mb290ZXJHcm91cDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQuY29sdW1uID0gbWF0cml4UG9pbnQudHlwZSA9PT0gJ2hlYWRlcicgPyByZWNvcmQuaGVhZGVyIDogcmVjb3JkLmZvb3RlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNyZWF0ZVJvd0V2ZW50ID0gPFRFdmVudCBleHRlbmRzIEV2ZW50Pihyb3dUYXJnZXQ6IEhUTUxFbGVtZW50LCBzb3VyY2U6IFRFdmVudCwgcm9vdD86IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+KTogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKHJvb3QpIHtcbiAgICAgICAgY29uc3QgZXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+ID0ge1xuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICByb3dUYXJnZXQsXG4gICAgICAgICAgdHlwZTogcm9vdC50eXBlLFxuICAgICAgICAgIHN1YlR5cGU6IHJvb3Quc3ViVHlwZSxcbiAgICAgICAgICByb3dJbmRleDogcm9vdC5yb3dJbmRleCxcbiAgICAgICAgICByb290XG4gICAgICAgIH0gYXMgYW55O1xuICAgICAgICBpZiAocm9vdC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikucm93ID0gcm9vdC5yb3c7XG4gICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLmNvbnRleHQgPSByb290LmNvbnRleHQucm93Q29udGV4dDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXRyaXhQb2ludCA9IG1hdHJpeFJvd0Zyb21Sb3cocm93VGFyZ2V0LCBjZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIpO1xuICAgICAgICBpZiAobWF0cml4UG9pbnQpIHtcbiAgICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gPSB7IC4uLm1hdHJpeFBvaW50LCBzb3VyY2UsIHJvd1RhcmdldCB9IGFzIGFueTtcbiAgICAgICAgICBpZiAobWF0cml4UG9pbnQudHlwZSA9PT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dCA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5nZXRSb3cobWF0cml4UG9pbnQucm93SW5kZXgpO1xuICAgICAgICAgICAgKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLnJvdyA9IChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0LiRpbXBsaWNpdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiAgSWYgYHN1YlR5cGUgIT09ICdkYXRhJ2AgaXQgY2FuIG9ubHkgYmUgYG1ldGFgIGJlY2F1c2UgYG1ldGFkYXRhRnJvbUVsZW1lbnQoKWAgZG9lcyBub3QgaGFuZGxlIGBtZXRhLWdyb3VwYCBzdWJUeXBlLlxuICAgICAgICAgICAgICBXZSBuZWVkIHRvIGV4dGVuZCB0aGlzIG1pc3NpbmcgcGFydCwgd2UgZG9uJ3QgaGF2ZSBjb2x1bW5zIGhlcmUgc28gd2Ugd2lsbCB0cnkgdG8gaW5mZXIgaXQgdXNpbmcgdGhlIGZpcnN0IGNvbHVtbi5cblxuICAgICAgICAgICAgICBJdCdzIHNpbWlsYXIgdG8gaG93IGl0J3MgaGFuZGxlZCBpbiBjZWxsIGNsaWNrcywgYnV0IGhlcmUgd2UgZG9uJ3QgbmVlZCB0byBleHRlbmRzIHRoZSBjb2x1bW4gaW5mby5cbiAgICAgICAgICAgICAgV2Ugb25seSBuZWVkIHRvIGNoYW5nZSB0aGUgYHN1YlR5cGVgIHdoZW4gdGhlIHJvdyBpcyBhIGdyb3VwIHJvdywgZ2V0dGluZyBhIHNwZWNpZmljIGNvbHVtbiBpcyBpcnJlbGV2YW50LlxuICAgICAgICAgICAgICBXZSBqdXN0IG5lZWQgQSBjb2x1bW4gYmVjYXVzZSBncm91cCBjb2x1bW5zIGRvbid0IG1peCB3aXRoIHJlZ3VsYXIgbWV0YSBjb2x1bW5zLlxuXG4gICAgICAgICAgICAgIE5PVEU6IFdoZW4gc3ViVHlwZSBpcyBub3QgJ2RhdGEnIHRoZSB5cGUgY2FuIG9ubHkgYmUgYGhlYWRlcmAgb3IgYGZvb3RlcmAuXG4gICAgICAgICAgKi9cbiAgICAgICAgICBpZiAobWF0cml4UG9pbnQuc3ViVHlwZSAhPT0gJ2RhdGEnKSB7XG4gICAgICAgICAgICBjb25zdCByb3dJbmZvID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzW21hdHJpeFBvaW50LnR5cGVdW2V2ZW50LnJvd0luZGV4XTtcbiAgICAgICAgICAgIGlmIChyb3dJbmZvLmlzR3JvdXApIHtcbiAgICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGxhc3RDZWxsRW50ZXJFdmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+O1xuICAgIGxldCBsYXN0Um93RW50ZXJFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD47XG4gICAgY29uc3QgZW1pdENlbGxMZWF2ZSA9IChzb3VyY2U6IE1vdXNlRXZlbnQpOiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKGxhc3RDZWxsRW50ZXJFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wID0gbGFzdENlbGxFbnRlckV2ZW50O1xuICAgICAgICB0aGlzLmNlbGxMZWF2ZS5lbWl0KE9iamVjdC5hc3NpZ24oe30sIGxhc3RDZWxsRW50ZXJFdmVudFRlbXAsIHsgc291cmNlIH0pKTtcbiAgICAgICAgbGFzdENlbGxFbnRlckV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gbGFzdENlbGxFbnRlckV2ZW50VGVtcDtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgZW1pdFJvd0xlYXZlID0gKHNvdXJjZTogTW91c2VFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgdW5kZWZpbmVkID0+IHtcbiAgICAgIGlmIChsYXN0Um93RW50ZXJFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0Um93RW50ZXJFdmVudFRlbXAgPSBsYXN0Um93RW50ZXJFdmVudDtcbiAgICAgICAgdGhpcy5yb3dMZWF2ZS5lbWl0KE9iamVjdC5hc3NpZ24oe30sIGxhc3RSb3dFbnRlckV2ZW50VGVtcCwgeyBzb3VyY2UgfSkpO1xuICAgICAgICBsYXN0Um93RW50ZXJFdmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGxhc3RSb3dFbnRlckV2ZW50VGVtcDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm9jZXNzRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGU6IFRFdmVudCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gZmluZEV2ZW50U291cmNlKGUpO1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LnR5cGUgPT09ICdjZWxsJykge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlQ2VsbEV2ZW50PFRFdmVudD4ocmVzdWx0LnRhcmdldCwgZSk7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIHdhaXRUaW1lOiBoYXNMaXN0ZW5lcnModGhpcy5jZWxsRGJsQ2xpY2spID8gMjUwIDogMSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdC50eXBlID09PSAncm93Jykge1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3JlYXRlUm93RXZlbnQocmVzdWx0LnRhcmdldCwgZSk7XG4gICAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlOiByZXN1bHQudHlwZSxcbiAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgIHdhaXRUaW1lOiBoYXNMaXN0ZW5lcnModGhpcy5yb3dEYmxDbGljaykgPyAyNTAgOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqIFNwbGl0IHRoZSByZXN1bHQgb2YgcHJvY2Vzc0V2ZW50IGludG8gY2VsbCBhbmQgcm93IGV2ZW50cywgaWYgdHlwZSBpcyByb3cgb25seSByb3cgZXZlbnQgaXMgcmV0dXJuZWQsIGlmIGNlbGwgdGhlbiBjZWxsIGlzIHJldHVybmVkIGFuZCByb3cgaXMgY3JlYXRlZCBhbG9uZyBzaWRlLiAqL1xuICAgIGNvbnN0IHNwbGl0UHJvY2Vzc2VkRXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50OiBSZXR1cm5UeXBlPHR5cGVvZiBwcm9jZXNzRXZlbnQ+KSA9PiB7XG4gICAgICBjb25zdCBjZWxsRXZlbnQgPSBldmVudC50eXBlID09PSAnY2VsbCcgPyBldmVudC5ldmVudCBhcyBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IHJvd0V2ZW50ID0gY2VsbEV2ZW50XG4gICAgICAgID8gY3JlYXRlUm93RXZlbnQ8VEV2ZW50PihjZWxsRXZlbnQucm93VGFyZ2V0LCBjZWxsRXZlbnQuc291cmNlLCBjZWxsRXZlbnQpXG4gICAgICAgIDogZXZlbnQuZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD5cbiAgICAgIDtcbiAgICAgIHJldHVybiB7IGNlbGxFdmVudCwgcm93RXZlbnQgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVnaXN0ZXJVcERvd25FdmVudHMgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50TmFtZTogc3RyaW5nLCBlbWl0dGVyOiBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4pID0+IHtcbiAgICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsIGV2ZW50TmFtZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgICBmaWx0ZXIoIHNvdXJjZSA9PiBoYXNMaXN0ZW5lcnMoZW1pdHRlcikgKSxcbiAgICAgICAgICBtYXAocHJvY2Vzc0V2ZW50KSxcbiAgICAgICAgICBmaWx0ZXIoIHJlc3VsdCA9PiAhIXJlc3VsdCApLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoIHJlc3VsdCA9PiB7XG4gICAgICAgICAgY29uc3QgeyBjZWxsRXZlbnQsIHJvd0V2ZW50IH0gPSBzcGxpdFByb2Nlc3NlZEV2ZW50PFRFdmVudD4ocmVzdWx0KTtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgICAgICB0aGlzLnN5bmNSb3coY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8TW91c2VFdmVudD4oJ21vdXNldXAnLCB0aGlzLm1vdXNlVXApO1xuICAgIHJlZ2lzdGVyVXBEb3duRXZlbnRzPE1vdXNlRXZlbnQ+KCdtb3VzZWRvd24nLCB0aGlzLm1vdXNlRG93bik7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8S2V5Ym9hcmRFdmVudD4oJ2tleXVwJywgdGhpcy5rZXlVcCk7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8S2V5Ym9hcmRFdmVudD4oJ2tleWRvd24nLCB0aGlzLmtleURvd24pO1xuXG4gICAgLypcbiAgICAgIEhhbmRsaW5nIGNsaWNrIHN0cmVhbSBmb3IgYm90aCBjbGljayBhbmQgZG91YmxlIGNsaWNrIGV2ZW50cy5cbiAgICAgIFdlIHdhbnQgdG8gZGV0ZWN0IGRvdWJsZSBjbGlja3MgYW5kIGNsaWNrcyB3aXRoIG1pbmltYWwgZGVsYXlzXG4gICAgICBXZSBjaGVjayBpZiBhIGRvdWJsZSBjbGljayBoYXMgbGlzdGVuZXJzLCBpZiBub3Qgd2Ugd29uJ3QgZGVsYXkgdGhlIGNsaWNrLi4uXG4gICAgICBUT0RPOiBvbiBkb3VibGUgY2xpY2ssIGRvbid0IHdhaXQgdGhlIHdob2xlIDI1MCBtcyBpZiAyIGNsaWNrcyBoYXBwZW4uXG4gICAgKi9cbiAgICBjb25zdCBjbGlja1N0cmVhbSA9IGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgZmlsdGVyKCBzb3VyY2UgPT4gaGFzTGlzdGVuZXJzKHRoaXMuY2VsbENsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5jZWxsRGJsQ2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLnJvd0NsaWNrKSB8fCBoYXNMaXN0ZW5lcnModGhpcy5yb3dEYmxDbGljaykgKSxcbiAgICAgIG1hcChwcm9jZXNzRXZlbnQpLFxuICAgICAgZmlsdGVyKCByZXN1bHQgPT4gISFyZXN1bHQgKSxcbiAgICApO1xuXG4gICAgY2xpY2tTdHJlYW1cbiAgICAgIC5waXBlKFxuICAgICAgICBidWZmZXJXaGVuKCAoKSA9PiBjbGlja1N0cmVhbS5waXBlKCBkZWJvdW5jZSggZSA9PiB0aW1lcihlLndhaXRUaW1lKSApICkgKSxcbiAgICAgICAgZmlsdGVyKCBldmVudHMgPT4gZXZlbnRzLmxlbmd0aCA+IDAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50cyA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzLnNoaWZ0KCk7XG4gICAgICAgIGNvbnN0IGlzRG91YmxlQ2xpY2sgPSBldmVudHMubGVuZ3RoID09PSAxOyAvLyBpZiB3ZSBoYXZlIDIgZXZlbnRzIGl0cyBkb3VibGUgY2xpY2ssIG90aGVyd2lzZSBzaW5nbGUuXG4gICAgICAgIGNvbnN0IHsgY2VsbEV2ZW50LCByb3dFdmVudCB9ID0gc3BsaXRQcm9jZXNzZWRFdmVudDxNb3VzZUV2ZW50PihldmVudCk7XG4gICAgICAgIGlmIChpc0RvdWJsZUNsaWNrKSB7XG4gICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsRGJsQ2xpY2suZW1pdChjZWxsRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvd0RibENsaWNrLmVtaXQocm93RXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbENsaWNrLmVtaXQoY2VsbEV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yb3dDbGljay5lbWl0KHJvd0V2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN5bmNSb3coY2VsbEV2ZW50IHx8IHJvd0V2ZW50KTtcbiAgICAgIH0pO1xuXG5cbiAgICBmcm9tRXZlbnQoY2RrVGFibGVFbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChzb3VyY2U6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGxhc3RFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD4gPSBlbWl0Q2VsbExlYXZlKHNvdXJjZSk7XG4gICAgICAgIGxhc3RFdmVudCA9IGVtaXRSb3dMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgaWYgKGxhc3RFdmVudCkge1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhsYXN0RXZlbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdtb3VzZW1vdmUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoc291cmNlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxUYXJnZXQ6IEhUTUxFbGVtZW50ID0gZmluZFBhcmVudENlbGwoc291cmNlLnRhcmdldCBhcyBhbnkpO1xuICAgICAgICBjb25zdCBsYXN0Q2VsbFRhcmdldCA9IGxhc3RDZWxsRW50ZXJFdmVudCAmJiBsYXN0Q2VsbEVudGVyRXZlbnQuY2VsbFRhcmdldDtcbiAgICAgICAgY29uc3QgbGFzdFJvd1RhcmdldCA9IGxhc3RSb3dFbnRlckV2ZW50ICYmIGxhc3RSb3dFbnRlckV2ZW50LnJvd1RhcmdldDtcblxuICAgICAgICBsZXQgY2VsbEV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD47XG4gICAgICAgIGxldCBsYXN0RXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+IHwgRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQ+O1xuXG4gICAgICAgIGlmIChsYXN0Q2VsbFRhcmdldCAhPT0gY2VsbFRhcmdldCkge1xuICAgICAgICAgIGxhc3RFdmVudCA9IGVtaXRDZWxsTGVhdmUoc291cmNlKSB8fCBsYXN0RXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2VsbFRhcmdldCkge1xuICAgICAgICAgIGlmIChsYXN0Q2VsbFRhcmdldCAhPT0gY2VsbFRhcmdldCkge1xuICAgICAgICAgICAgY2VsbEV2ZW50ID0gY3JlYXRlQ2VsbEV2ZW50KGNlbGxUYXJnZXQsIHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuY2VsbEVudGVyLmVtaXQobGFzdENlbGxFbnRlckV2ZW50ID0gY2VsbEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvd1RhcmdldCA9IChjZWxsRXZlbnQgJiYgY2VsbEV2ZW50LnJvd1RhcmdldCkgfHwgKGlzUm93Q29udGFpbmVyKHNvdXJjZS50YXJnZXQgYXMgYW55KSAmJiBzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG5cbiAgICAgICAgaWYgKGxhc3RSb3dUYXJnZXQgIT09IHJvd1RhcmdldCkge1xuICAgICAgICAgIGxhc3RFdmVudCA9IGVtaXRSb3dMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyb3dUYXJnZXQpIHtcbiAgICAgICAgICBpZiAobGFzdFJvd1RhcmdldCAhPT0gcm93VGFyZ2V0KSB7XG4gICAgICAgICAgICBjb25zdCByb3dFdmVudCA9IGNyZWF0ZVJvd0V2ZW50KHJvd1RhcmdldCwgc291cmNlLCBjZWxsRXZlbnQpO1xuICAgICAgICAgICAgaWYgKHJvd0V2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMucm93RW50ZXIuZW1pdChsYXN0Um93RW50ZXJFdmVudCA9IHJvd0V2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGxhc3RFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNSb3c8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoZXZlbnQudHlwZSwgZXZlbnQucm93SW5kZXgpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3RhcmdldEV2ZW50c10sIHBibC1uZ3JpZFtyb3dDbGlja10sIHBibC1uZ3JpZFtyb3dEYmxDbGlja10sIHBibC1uZ3JpZFtyb3dFbnRlcl0sIHBibC1uZ3JpZFtyb3dMZWF2ZV0sIHBibC1uZ3JpZFtjZWxsQ2xpY2tdLCBwYmwtbmdyaWRbY2VsbERibENsaWNrXSwgcGJsLW5ncmlkW2NlbGxFbnRlcl0sIHBibC1uZ3JpZFtjZWxsTGVhdmVdLCBwYmwtbmdyaWRba2V5RG93bl0sIHBibC1uZ3JpZFtrZXlVcF0nLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLW91dHB1dC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgb3V0cHV0czogWyAncm93Q2xpY2snLCAncm93RGJsQ2xpY2snLCAncm93RW50ZXInLCAncm93TGVhdmUnLCAnY2VsbENsaWNrJywgJ2NlbGxEYmxDbGljaycsICdjZWxsRW50ZXInLCAnY2VsbExlYXZlJywgJ2tleURvd24nLCAna2V5VXAnIF1cbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgc3VwZXIodGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==