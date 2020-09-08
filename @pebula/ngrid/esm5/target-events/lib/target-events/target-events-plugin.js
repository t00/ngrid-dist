/**
 * @fileoverview added by tsickle
 * Generated from: lib/target-events/target-events-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __extends, __values } from "tslib";
import { fromEvent, timer, ReplaySubject } from 'rxjs';
import { bufferWhen, debounce, map, filter, takeUntil } from 'rxjs/operators';
import { Directive, EventEmitter, Injector } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, PblColumn } from '@pebula/ngrid';
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
var /**
 * @template T
 */
PblNgridTargetEventsPlugin = /** @class */ (function () {
    function PblNgridTargetEventsPlugin(grid, injector, pluginCtrl) {
        var _this = this;
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
    Object.defineProperty(PblNgridTargetEventsPlugin.prototype, "table", {
        /** @deprecated use `gird` instead */
        get: /**
         * @deprecated use `gird` instead
         * @return {?}
         */
        function () { return this.grid; },
        enumerable: true,
        configurable: true
    });
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
        return new PblNgridTargetEventsPlugin(table, injector, pluginCtrl);
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
        var grid = this.grid;
        /** @type {?} */
        var cdkTable = grid._cdkTable;
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
                var event_1 = (/** @type {?} */ (__assign(__assign({}, matrixPoint), { source: source, cellTarget: cellTarget, rowTarget: rowTarget })));
                if (matrixPoint.type === 'data') {
                    ((/** @type {?} */ (event_1))).row = grid.ds.renderedData[matrixPoint.rowIndex];
                }
                else if (event_1.subType === 'meta') {
                    // When multiple containers exists (fixed/sticky/row) the rowIndex we get is the one relative to the container..
                    // We need to find the rowIndex relative to the definitions:
                    var metaRowService = _this.pluginCtrl.extApi.metaRowService;
                    /** @type {?} */
                    var db = event_1.type === 'header' ? metaRowService.header : metaRowService.footer;
                    try {
                        for (var _b = __values([db.fixed, db.row, db.sticky]), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                    var column = _this.grid.columnApi.findColumnAt(event_1.colIndex);
                    /** @type {?} */
                    var columnIndex = _this.grid.columnApi.indexOf(column);
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
                    var event_3 = (/** @type {?} */ (__assign(__assign({}, matrixPoint), { source: source, rowTarget: rowTarget })));
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
        this._removePlugin(this.grid);
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
        this.grid._cdkTable.syncRows(event.type, event.rowIndex);
    };
    return PblNgridTargetEventsPlugin;
}());
/**
 * @template T
 */
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
var PblNgridTargetEventsPluginDirective = /** @class */ (function (_super) {
    __extends(PblNgridTargetEventsPluginDirective, _super);
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
    return PblNgridTargetEventsPluginDirective;
}(PblNgridTargetEventsPlugin));
export { PblNgridTargetEventsPluginDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy1wbHVnaW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy90YXJnZXQtZXZlbnRzLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBWSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBZ0MsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWhHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDaEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBb0JoRSxNQUFNLEtBQU8sVUFBVSxHQUFtQixjQUFjOzs7OztBQUV4RCxTQUFTLFlBQVksQ0FBQyxNQUFzQztJQUMxRCxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNyQyxDQUFDOzs7OztBQUVELFNBQVMsZUFBZSxDQUFDLE1BQWE7O1FBQzlCLFVBQVUsR0FBRyxjQUFjLENBQUMsbUJBQUEsTUFBTSxDQUFDLE1BQU0sRUFBTyxDQUFDO0lBQ3ZELElBQUksVUFBVSxFQUFFO1FBQ2QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxDQUFDO0tBQzdDO1NBQU0sSUFBSSxjQUFjLENBQUMsbUJBQUEsTUFB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QXNZcEQsMENBQUM7Q0FBQSxBQWhCRCxDQU00RCwwQkFBMEIsR0FVckY7U0FWWSxtQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRXZlbnQsIHRpbWVyLCBPYnNlcnZlciwgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYnVmZmVyV2hlbiwgZGVib3VuY2UsIG1hcCwgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsQ29sdW1uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCAqIGFzIEV2ZW50cyBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBtYXRyaXhSb3dGcm9tUm93LCBpc1Jvd0NvbnRhaW5lciwgZmluZENlbGxSZW5kZXJJbmRleCwgZmluZFBhcmVudENlbGwgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uIH0gZnJvbSAnLi9mb2N1cy1hbmQtc2VsZWN0aW9uJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdGFyZ2V0RXZlbnRzPzoge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIHRhcmdldCBldmVudHMgcGx1Z2luIG9uIGFsbCB0YWJsZSBpbnN0YW5jZXMgYnkgZGVmYXVsdC4gKi9cbiAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHRhcmdldEV2ZW50cz86IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luO1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgdGFyZ2V0RXZlbnRzOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICd0YXJnZXRFdmVudHMnID0gJ3RhcmdldEV2ZW50cyc7XG5cbmZ1bmN0aW9uIGhhc0xpc3RlbmVycyhzb3VyY2U6IHsgb2JzZXJ2ZXJzOiBPYnNlcnZlcjxhbnk+W10gfSk6IGJvb2xlYW4ge1xuICByZXR1cm4gc291cmNlLm9ic2VydmVycy5sZW5ndGggPiAwO1xufVxuXG5mdW5jdGlvbiBmaW5kRXZlbnRTb3VyY2Uoc291cmNlOiBFdmVudCk6IHsgdHlwZTogJ3JvdycgfCAnY2VsbCcsIHRhcmdldDogSFRNTEVsZW1lbnQgfSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGNlbGxUYXJnZXQgPSBmaW5kUGFyZW50Q2VsbChzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG4gIGlmIChjZWxsVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHsgdHlwZTogJ2NlbGwnLCB0YXJnZXQ6IGNlbGxUYXJnZXQgfTtcbiAgfSBlbHNlIGlmIChpc1Jvd0NvbnRhaW5lcihzb3VyY2UudGFyZ2V0IGFzIGFueSkpIHtcbiAgICByZXR1cm4geyB0eXBlOiAnY2VsbCcsIHRhcmdldDogc291cmNlLnRhcmdldCBhcyBhbnkgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuT25jZSgpOiB2b2lkIHtcbiAgUGJsQ29sdW1uLmV4dGVuZFByb3BlcnR5KCdlZGl0YWJsZScpO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VCA9IGFueT4ge1xuICByb3dDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIHJvd0RibENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgcm93RW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PigpO1xuICByb3dMZWF2ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgY2VsbENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG4gIGNlbGxEYmxDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+PigpO1xuICBjZWxsRW50ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50Pj4oKTtcbiAgY2VsbExlYXZlID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4+KCk7XG5cbiAgbW91c2VEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAgbW91c2VVcCA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIE1vdXNlRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG4gIGtleVVwID0gbmV3IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgS2V5Ym9hcmRFdmVudD4gfCBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPj4oKTtcbiAga2V5RG93biA9IG5ldyBFdmVudEVtaXR0ZXI8RXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIEtleWJvYXJkRXZlbnQ+IHwgRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4+KCk7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBgZ2lyZGAgaW5zdGVhZCAqL1xuICBnZXQgdGFibGUoKTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB7IHJldHVybiB0aGlzLmdyaWQ7IH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVzdHJveWVkID0gbmV3IFJlcGxheVN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcHJvdGVjdGVkIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICAgIGlmIChncmlkLmlzSW5pdCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD4ge1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSk7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPih0YWJsZSwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0dXBEb21FdmVudHMoKTtcbiAgICBoYW5kbGVGb2N1c0FuZFNlbGVjdGlvbih0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBEb21FdmVudHMoKTogdm9pZCB7XG4gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ3JpZDtcbiAgICBjb25zdCBjZGtUYWJsZSA9IGdyaWQuX2Nka1RhYmxlO1xuICAgIGNvbnN0IGNka1RhYmxlRWxlbWVudDogSFRNTEVsZW1lbnQgPSBjZGtUYWJsZVsnX2VsZW1lbnQnXTtcblxuICAgIGNvbnN0IGNyZWF0ZUNlbGxFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oY2VsbFRhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50KTogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gY2VsbFRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgY29uc3QgbWF0cml4UG9pbnQgPSBtYXRyaXhSb3dGcm9tUm93KHJvd1RhcmdldCwgY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyKTtcbiAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4gPSB7IC4uLm1hdHJpeFBvaW50LCBzb3VyY2UsIGNlbGxUYXJnZXQsIHJvd1RhcmdldCB9IGFzIGFueTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4UG9pbnQ8VD4pLnJvdyA9IGdyaWQuZHMucmVuZGVyZWREYXRhW21hdHJpeFBvaW50LnJvd0luZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC5zdWJUeXBlID09PSAnbWV0YScpIHtcbiAgICAgICAgICAvLyBXaGVuIG11bHRpcGxlIGNvbnRhaW5lcnMgZXhpc3RzIChmaXhlZC9zdGlja3kvcm93KSB0aGUgcm93SW5kZXggd2UgZ2V0IGlzIHRoZSBvbmUgcmVsYXRpdmUgdG8gdGhlIGNvbnRhaW5lci4uXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBmaW5kIHRoZSByb3dJbmRleCByZWxhdGl2ZSB0byB0aGUgZGVmaW5pdGlvbnM6XG4gICAgICAgICAgY29uc3QgeyBtZXRhUm93U2VydmljZSB9ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaTtcbiAgICAgICAgICBjb25zdCBkYiA9IGV2ZW50LnR5cGUgPT09ICdoZWFkZXInID8gbWV0YVJvd1NlcnZpY2UuaGVhZGVyIDogbWV0YVJvd1NlcnZpY2UuZm9vdGVyO1xuXG4gICAgICAgICAgZm9yIChjb25zdCBjb2xsIG9mIFtkYi5maXhlZCwgZGIucm93LCBkYi5zdGlja3ldKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb2xsLmZpbmQoIGl0ZW0gPT4gaXRlbS5lbCA9PT0gZXZlbnQucm93VGFyZ2V0ICk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGV2ZW50LnJvd0luZGV4ID0gcmVzdWx0LmluZGV4O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKiBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBwcm92aWRlIGNvbHVtbiBpbmZvcm1hdGlvbiBub3IgdGhlIGNvbHVtbiBpdHNlbGYuIFRoaXMgd2lsbCBleHRlbmQgZnVuY3Rpb25hbGl0eSB0byBhZGQgdGhlIGNvbHVtbkluZGV4IGFuZCBjb2x1bW4uXG4gICAgICAgICAgICBUaGUgc2ltcGxlIGNhc2UgaXMgd2hlbiBgc3ViVHlwZSA9PT0gJ2RhdGEnYCwgaW4gdGhpcyBjYXNlIHRoZSBjb2x1bW4gaXMgYWx3YXlzIHRoZSBkYXRhIGNvbHVtbiBmb3IgYWxsIHR5cGVzIChoZWFkZXIsIGRhdGEgYW5kIGZvb3RlcilcblxuICAgICAgICAgICAgSWYgYHN1YlR5cGUgIT09ICdkYXRhJ2Agd2UgbmVlZCB0byBnZXQgdGhlIHByb3BlciBjb2x1bW4gYmFzZWQgdHlwZSAodHlwZSBjYW4gb25seSBiZSBgaGVhZGVyYCBvciBgZm9vdGVyYCBhdCB0aGlzIHBvaW50KS5cbiAgICAgICAgICAgIEJ1dCB0aGF0J3Mgbm90IGFsbCwgYmVjYXVzZSBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBoYW5kbGUgYG1ldGEtZ3JvdXBgIHN1YlR5cGUgd2UgbmVlZCB0byBkbyBpdCBoZXJlLi4uXG4gICAgICAgICovXG4gICAgICAgIGV2ZW50LmNvbEluZGV4ID0gZmluZENlbGxSZW5kZXJJbmRleChjZWxsVGFyZ2V0KTtcbiAgICAgICAgaWYgKG1hdHJpeFBvaW50LnN1YlR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbkF0KGV2ZW50LmNvbEluZGV4KTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkuaW5kZXhPZihjb2x1bW4pO1xuICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFBvaW50PFQ+KS5jb250ZXh0ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmdldENlbGwoZXZlbnQucm93SW5kZXgsIGNvbHVtbkluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBzdG9yZSA9IHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29sdW1uU3RvcmU7XG4gICAgICAgICAgY29uc3Qgcm93SW5mbyA9IHN0b3JlLm1ldGFDb2x1bW5JZHNbbWF0cml4UG9pbnQudHlwZV1bZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IHJlY29yZCA9IHN0b3JlLmZpbmQocm93SW5mby5rZXlzW2V2ZW50LmNvbEluZGV4XSk7XG4gICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgZXZlbnQuc3ViVHlwZSA9ICdtZXRhLWdyb3VwJztcbiAgICAgICAgICAgIGV2ZW50LmNvbHVtbiA9IG1hdHJpeFBvaW50LnR5cGUgPT09ICdoZWFkZXInID8gcmVjb3JkLmhlYWRlckdyb3VwIDogcmVjb3JkLmZvb3Rlckdyb3VwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBldmVudC5jb2x1bW4gPSBtYXRyaXhQb2ludC50eXBlID09PSAnaGVhZGVyJyA/IHJlY29yZC5oZWFkZXIgOiByZWNvcmQuZm9vdGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlUm93RXZlbnQgPSA8VEV2ZW50IGV4dGVuZHMgRXZlbnQ+KHJvd1RhcmdldDogSFRNTEVsZW1lbnQsIHNvdXJjZTogVEV2ZW50LCByb290PzogRXZlbnRzLlBibE5ncmlkQ2VsbEV2ZW50PFQsIFRFdmVudD4pOiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAocm9vdCkge1xuICAgICAgICBjb25zdCBldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gPSB7XG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIHJvd1RhcmdldCxcbiAgICAgICAgICB0eXBlOiByb290LnR5cGUsXG4gICAgICAgICAgc3ViVHlwZTogcm9vdC5zdWJUeXBlLFxuICAgICAgICAgIHJvd0luZGV4OiByb290LnJvd0luZGV4LFxuICAgICAgICAgIHJvb3RcbiAgICAgICAgfSBhcyBhbnk7XG4gICAgICAgIGlmIChyb290LnR5cGUgPT09ICdkYXRhJykge1xuICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5yb3cgPSByb290LnJvdztcbiAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikuY29udGV4dCA9IHJvb3QuY29udGV4dC5yb3dDb250ZXh0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hdHJpeFBvaW50ID0gbWF0cml4Um93RnJvbVJvdyhyb3dUYXJnZXQsIGNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcik7XG4gICAgICAgIGlmIChtYXRyaXhQb2ludCkge1xuICAgICAgICAgIGNvbnN0IGV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiA9IHsgLi4ubWF0cml4UG9pbnQsIHNvdXJjZSwgcm93VGFyZ2V0IH0gYXMgYW55O1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC50eXBlID09PSAnZGF0YScpIHtcbiAgICAgICAgICAgIChldmVudCBhcyBFdmVudHMuUGJsTmdyaWREYXRhTWF0cml4Um93PFQ+KS5jb250ZXh0ID0gdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmdldFJvdyhtYXRyaXhQb2ludC5yb3dJbmRleCk7XG4gICAgICAgICAgICAoZXZlbnQgYXMgRXZlbnRzLlBibE5ncmlkRGF0YU1hdHJpeFJvdzxUPikucm93ID0gKGV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZERhdGFNYXRyaXhSb3c8VD4pLmNvbnRleHQuJGltcGxpY2l0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qICBJZiBgc3ViVHlwZSAhPT0gJ2RhdGEnYCBpdCBjYW4gb25seSBiZSBgbWV0YWAgYmVjYXVzZSBgbWV0YWRhdGFGcm9tRWxlbWVudCgpYCBkb2VzIG5vdCBoYW5kbGUgYG1ldGEtZ3JvdXBgIHN1YlR5cGUuXG4gICAgICAgICAgICAgIFdlIG5lZWQgdG8gZXh0ZW5kIHRoaXMgbWlzc2luZyBwYXJ0LCB3ZSBkb24ndCBoYXZlIGNvbHVtbnMgaGVyZSBzbyB3ZSB3aWxsIHRyeSB0byBpbmZlciBpdCB1c2luZyB0aGUgZmlyc3QgY29sdW1uLlxuXG4gICAgICAgICAgICAgIEl0J3Mgc2ltaWxhciB0byBob3cgaXQncyBoYW5kbGVkIGluIGNlbGwgY2xpY2tzLCBidXQgaGVyZSB3ZSBkb24ndCBuZWVkIHRvIGV4dGVuZHMgdGhlIGNvbHVtbiBpbmZvLlxuICAgICAgICAgICAgICBXZSBvbmx5IG5lZWQgdG8gY2hhbmdlIHRoZSBgc3ViVHlwZWAgd2hlbiB0aGUgcm93IGlzIGEgZ3JvdXAgcm93LCBnZXR0aW5nIGEgc3BlY2lmaWMgY29sdW1uIGlzIGlycmVsZXZhbnQuXG4gICAgICAgICAgICAgIFdlIGp1c3QgbmVlZCBBIGNvbHVtbiBiZWNhdXNlIGdyb3VwIGNvbHVtbnMgZG9uJ3QgbWl4IHdpdGggcmVndWxhciBtZXRhIGNvbHVtbnMuXG5cbiAgICAgICAgICAgICAgTk9URTogV2hlbiBzdWJUeXBlIGlzIG5vdCAnZGF0YScgdGhlIHlwZSBjYW4gb25seSBiZSBgaGVhZGVyYCBvciBgZm9vdGVyYC5cbiAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChtYXRyaXhQb2ludC5zdWJUeXBlICE9PSAnZGF0YScpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0luZm8gPSB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlLm1ldGFDb2x1bW5JZHNbbWF0cml4UG9pbnQudHlwZV1bZXZlbnQucm93SW5kZXhdO1xuICAgICAgICAgICAgaWYgKHJvd0luZm8uaXNHcm91cCkge1xuICAgICAgICAgICAgICBldmVudC5zdWJUeXBlID0gJ21ldGEtZ3JvdXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgbGFzdENlbGxFbnRlckV2ZW50OiBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgTW91c2VFdmVudD47XG4gICAgbGV0IGxhc3RSb3dFbnRlckV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPjtcbiAgICBjb25zdCBlbWl0Q2VsbExlYXZlID0gKHNvdXJjZTogTW91c2VFdmVudCk6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBpZiAobGFzdENlbGxFbnRlckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsRW50ZXJFdmVudFRlbXAgPSBsYXN0Q2VsbEVudGVyRXZlbnQ7XG4gICAgICAgIHRoaXMuY2VsbExlYXZlLmVtaXQoT2JqZWN0LmFzc2lnbih7fSwgbGFzdENlbGxFbnRlckV2ZW50VGVtcCwgeyBzb3VyY2UgfSkpO1xuICAgICAgICBsYXN0Q2VsbEVudGVyRXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBsYXN0Q2VsbEVudGVyRXZlbnRUZW1wO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBlbWl0Um93TGVhdmUgPSAoc291cmNlOiBNb3VzZUV2ZW50KTogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCB1bmRlZmluZWQgPT4ge1xuICAgICAgaWYgKGxhc3RSb3dFbnRlckV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGxhc3RSb3dFbnRlckV2ZW50VGVtcCA9IGxhc3RSb3dFbnRlckV2ZW50O1xuICAgICAgICB0aGlzLnJvd0xlYXZlLmVtaXQoT2JqZWN0LmFzc2lnbih7fSwgbGFzdFJvd0VudGVyRXZlbnRUZW1wLCB7IHNvdXJjZSB9KSk7XG4gICAgICAgIGxhc3RSb3dFbnRlckV2ZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gbGFzdFJvd0VudGVyRXZlbnRUZW1wO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHByb2Nlc3NFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZTogVEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBmaW5kRXZlbnRTb3VyY2UoZSk7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQudHlwZSA9PT0gJ2NlbGwnKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBjcmVhdGVDZWxsRXZlbnQ8VEV2ZW50PihyZXN1bHQudGFyZ2V0LCBlKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgd2FpdFRpbWU6IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxEYmxDbGljaykgPyAyNTAgOiAxLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0LnR5cGUgPT09ICdyb3cnKSB7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSBjcmVhdGVSb3dFdmVudChyZXN1bHQudGFyZ2V0LCBlKTtcbiAgICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHR5cGU6IHJlc3VsdC50eXBlLFxuICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgd2FpdFRpbWU6IGhhc0xpc3RlbmVycyh0aGlzLnJvd0RibENsaWNrKSA/IDI1MCA6IDEsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvKiogU3BsaXQgdGhlIHJlc3VsdCBvZiBwcm9jZXNzRXZlbnQgaW50byBjZWxsIGFuZCByb3cgZXZlbnRzLCBpZiB0eXBlIGlzIHJvdyBvbmx5IHJvdyBldmVudCBpcyByZXR1cm5lZCwgaWYgY2VsbCB0aGVuIGNlbGwgaXMgcmV0dXJuZWQgYW5kIHJvdyBpcyBjcmVhdGVkIGFsb25nIHNpZGUuICovXG4gICAgY29uc3Qgc3BsaXRQcm9jZXNzZWRFdmVudCA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnQ6IFJldHVyblR5cGU8dHlwZW9mIHByb2Nlc3NFdmVudD4pID0+IHtcbiAgICAgIGNvbnN0IGNlbGxFdmVudCA9IGV2ZW50LnR5cGUgPT09ICdjZWxsJyA/IGV2ZW50LmV2ZW50IGFzIEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBURXZlbnQ+IDogdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgcm93RXZlbnQgPSBjZWxsRXZlbnRcbiAgICAgICAgPyBjcmVhdGVSb3dFdmVudDxURXZlbnQ+KGNlbGxFdmVudC5yb3dUYXJnZXQsIGNlbGxFdmVudC5zb3VyY2UsIGNlbGxFdmVudClcbiAgICAgICAgOiBldmVudC5ldmVudCBhcyBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPlxuICAgICAgO1xuICAgICAgcmV0dXJuIHsgY2VsbEV2ZW50LCByb3dFdmVudCB9O1xuICAgIH07XG5cbiAgICBjb25zdCByZWdpc3RlclVwRG93bkV2ZW50cyA9IDxURXZlbnQgZXh0ZW5kcyBFdmVudD4oZXZlbnROYW1lOiBzdHJpbmcsIGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50PiB8IEV2ZW50cy5QYmxOZ3JpZFJvd0V2ZW50PFQ+PikgPT4ge1xuICAgICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgZXZlbnROYW1lKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIGZpbHRlciggc291cmNlID0+IGhhc0xpc3RlbmVycyhlbWl0dGVyKSApLFxuICAgICAgICAgIG1hcChwcm9jZXNzRXZlbnQpLFxuICAgICAgICAgIGZpbHRlciggcmVzdWx0ID0+ICEhcmVzdWx0ICksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggcmVzdWx0ID0+IHtcbiAgICAgICAgICBjb25zdCB7IGNlbGxFdmVudCwgcm93RXZlbnQgfSA9IHNwbGl0UHJvY2Vzc2VkRXZlbnQ8VEV2ZW50PihyZXN1bHQpO1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdChjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgICAgIHRoaXMuc3luY1JvdyhjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxNb3VzZUV2ZW50PignbW91c2V1cCcsIHRoaXMubW91c2VVcCk7XG4gICAgcmVnaXN0ZXJVcERvd25FdmVudHM8TW91c2VFdmVudD4oJ21vdXNlZG93bicsIHRoaXMubW91c2VEb3duKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxLZXlib2FyZEV2ZW50Pigna2V5dXAnLCB0aGlzLmtleVVwKTtcbiAgICByZWdpc3RlclVwRG93bkV2ZW50czxLZXlib2FyZEV2ZW50Pigna2V5ZG93bicsIHRoaXMua2V5RG93bik7XG5cbiAgICAvKlxuICAgICAgSGFuZGxpbmcgY2xpY2sgc3RyZWFtIGZvciBib3RoIGNsaWNrIGFuZCBkb3VibGUgY2xpY2sgZXZlbnRzLlxuICAgICAgV2Ugd2FudCB0byBkZXRlY3QgZG91YmxlIGNsaWNrcyBhbmQgY2xpY2tzIHdpdGggbWluaW1hbCBkZWxheXNcbiAgICAgIFdlIGNoZWNrIGlmIGEgZG91YmxlIGNsaWNrIGhhcyBsaXN0ZW5lcnMsIGlmIG5vdCB3ZSB3b24ndCBkZWxheSB0aGUgY2xpY2suLi5cbiAgICAgIFRPRE86IG9uIGRvdWJsZSBjbGljaywgZG9uJ3Qgd2FpdCB0aGUgd2hvbGUgMjUwIG1zIGlmIDIgY2xpY2tzIGhhcHBlbi5cbiAgICAqL1xuICAgIGNvbnN0IGNsaWNrU3RyZWFtID0gZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICBmaWx0ZXIoIHNvdXJjZSA9PiBoYXNMaXN0ZW5lcnModGhpcy5jZWxsQ2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLmNlbGxEYmxDbGljaykgfHwgaGFzTGlzdGVuZXJzKHRoaXMucm93Q2xpY2spIHx8IGhhc0xpc3RlbmVycyh0aGlzLnJvd0RibENsaWNrKSApLFxuICAgICAgbWFwKHByb2Nlc3NFdmVudCksXG4gICAgICBmaWx0ZXIoIHJlc3VsdCA9PiAhIXJlc3VsdCApLFxuICAgICk7XG5cbiAgICBjbGlja1N0cmVhbVxuICAgICAgLnBpcGUoXG4gICAgICAgIGJ1ZmZlcldoZW4oICgpID0+IGNsaWNrU3RyZWFtLnBpcGUoIGRlYm91bmNlKCBlID0+IHRpbWVyKGUud2FpdFRpbWUpICkgKSApLFxuICAgICAgICBmaWx0ZXIoIGV2ZW50cyA9PiBldmVudHMubGVuZ3RoID4gMCApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnRzID0+IHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHMuc2hpZnQoKTtcbiAgICAgICAgY29uc3QgaXNEb3VibGVDbGljayA9IGV2ZW50cy5sZW5ndGggPT09IDE7IC8vIGlmIHdlIGhhdmUgMiBldmVudHMgaXRzIGRvdWJsZSBjbGljaywgb3RoZXJ3aXNlIHNpbmdsZS5cbiAgICAgICAgY29uc3QgeyBjZWxsRXZlbnQsIHJvd0V2ZW50IH0gPSBzcGxpdFByb2Nlc3NlZEV2ZW50PE1vdXNlRXZlbnQ+KGV2ZW50KTtcbiAgICAgICAgaWYgKGlzRG91YmxlQ2xpY2spIHtcbiAgICAgICAgICBpZiAoY2VsbEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLmNlbGxEYmxDbGljay5lbWl0KGNlbGxFdmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucm93RGJsQ2xpY2suZW1pdChyb3dFdmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNlbGxFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5jZWxsQ2xpY2suZW1pdChjZWxsRXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJvd0NsaWNrLmVtaXQocm93RXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY1JvdyhjZWxsRXZlbnQgfHwgcm93RXZlbnQpO1xuICAgICAgfSk7XG5cblxuICAgIGZyb21FdmVudChjZGtUYWJsZUVsZW1lbnQsICdtb3VzZWxlYXZlJylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKHNvdXJjZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBsZXQgbGFzdEV2ZW50OiBFdmVudHMuUGJsTmdyaWRSb3dFdmVudDxUPiB8IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxUPiA9IGVtaXRDZWxsTGVhdmUoc291cmNlKTtcbiAgICAgICAgbGFzdEV2ZW50ID0gZW1pdFJvd0xlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICBpZiAobGFzdEV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5zeW5jUm93KGxhc3RFdmVudCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgZnJvbUV2ZW50KGNka1RhYmxlRWxlbWVudCwgJ21vdXNlbW92ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChzb3VyY2U6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbFRhcmdldDogSFRNTEVsZW1lbnQgPSBmaW5kUGFyZW50Q2VsbChzb3VyY2UudGFyZ2V0IGFzIGFueSk7XG4gICAgICAgIGNvbnN0IGxhc3RDZWxsVGFyZ2V0ID0gbGFzdENlbGxFbnRlckV2ZW50ICYmIGxhc3RDZWxsRW50ZXJFdmVudC5jZWxsVGFyZ2V0O1xuICAgICAgICBjb25zdCBsYXN0Um93VGFyZ2V0ID0gbGFzdFJvd0VudGVyRXZlbnQgJiYgbGFzdFJvd0VudGVyRXZlbnQucm93VGFyZ2V0O1xuXG4gICAgICAgIGxldCBjZWxsRXZlbnQ6IEV2ZW50cy5QYmxOZ3JpZENlbGxFdmVudDxULCBNb3VzZUV2ZW50PjtcbiAgICAgICAgbGV0IGxhc3RFdmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VD47XG5cbiAgICAgICAgaWYgKGxhc3RDZWxsVGFyZ2V0ICE9PSBjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgbGFzdEV2ZW50ID0gZW1pdENlbGxMZWF2ZShzb3VyY2UpIHx8IGxhc3RFdmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgaWYgKGxhc3RDZWxsVGFyZ2V0ICE9PSBjZWxsVGFyZ2V0KSB7XG4gICAgICAgICAgICBjZWxsRXZlbnQgPSBjcmVhdGVDZWxsRXZlbnQoY2VsbFRhcmdldCwgc291cmNlKTtcbiAgICAgICAgICAgIGlmIChjZWxsRXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jZWxsRW50ZXIuZW1pdChsYXN0Q2VsbEVudGVyRXZlbnQgPSBjZWxsRXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm93VGFyZ2V0ID0gKGNlbGxFdmVudCAmJiBjZWxsRXZlbnQucm93VGFyZ2V0KSB8fCAoaXNSb3dDb250YWluZXIoc291cmNlLnRhcmdldCBhcyBhbnkpICYmIHNvdXJjZS50YXJnZXQgYXMgYW55KTtcblxuICAgICAgICBpZiAobGFzdFJvd1RhcmdldCAhPT0gcm93VGFyZ2V0KSB7XG4gICAgICAgICAgbGFzdEV2ZW50ID0gZW1pdFJvd0xlYXZlKHNvdXJjZSkgfHwgbGFzdEV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJvd1RhcmdldCkge1xuICAgICAgICAgIGlmIChsYXN0Um93VGFyZ2V0ICE9PSByb3dUYXJnZXQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0V2ZW50ID0gY3JlYXRlUm93RXZlbnQocm93VGFyZ2V0LCBzb3VyY2UsIGNlbGxFdmVudCk7XG4gICAgICAgICAgICBpZiAocm93RXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5yb3dFbnRlci5lbWl0KGxhc3RSb3dFbnRlckV2ZW50ID0gcm93RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgICB0aGlzLnN5bmNSb3cobGFzdEV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jUm93PFRFdmVudCBleHRlbmRzIEV2ZW50PihldmVudDogRXZlbnRzLlBibE5ncmlkUm93RXZlbnQ8VD4gfCBFdmVudHMuUGJsTmdyaWRDZWxsRXZlbnQ8VCwgVEV2ZW50Pik6IHZvaWQge1xuICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoZXZlbnQudHlwZSwgZXZlbnQucm93SW5kZXgpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3RhcmdldEV2ZW50c10sIHBibC1uZ3JpZFtyb3dDbGlja10sIHBibC1uZ3JpZFtyb3dEYmxDbGlja10sIHBibC1uZ3JpZFtyb3dFbnRlcl0sIHBibC1uZ3JpZFtyb3dMZWF2ZV0sIHBibC1uZ3JpZFtjZWxsQ2xpY2tdLCBwYmwtbmdyaWRbY2VsbERibENsaWNrXSwgcGJsLW5ncmlkW2NlbGxFbnRlcl0sIHBibC1uZ3JpZFtjZWxsTGVhdmVdLCBwYmwtbmdyaWRba2V5RG93bl0sIHBibC1uZ3JpZFtrZXlVcF0nLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dXNlLW91dHB1dC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgb3V0cHV0czogWyAncm93Q2xpY2snLCAncm93RGJsQ2xpY2snLCAncm93RW50ZXInLCAncm93TGVhdmUnLCAnY2VsbENsaWNrJywgJ2NlbGxEYmxDbGljaycsICdjZWxsRW50ZXInLCAnY2VsbExlYXZlJywgJ2tleURvd24nLCAna2V5VXAnIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmU8VD4gZXh0ZW5kcyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbjxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgc3VwZXIodGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==