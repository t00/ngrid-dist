import { __values, __read, __spread, __assign, __decorate, __metadata, __extends } from 'tslib';
import { ReplaySubject, fromEvent, timer } from 'rxjs';
import { filter, tap, switchMap, takeUntil, map, bufferWhen, debounce } from 'rxjs/operators';
import { EventEmitter, Injector, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblColumn, PblNgridPluginController, PblNgridComponent, NgridPlugin, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
import { RIGHT_ARROW, LEFT_ARROW, DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, TEvent
 * @param {?} event
 * @return {?}
 */
function isCellEvent(event) {
    return !!((/** @type {?} */ (event))).cellTarget;
}
/**
 * @template T, TEvent
 * @param {?} event
 * @return {?}
 */
function isDataCellEvent(event) {
    return isCellEvent(event) && !!((/** @type {?} */ (event))).context;
}
/**
 * Returns true if the element is a row element (`pbl-ngrid-row`, `cdk-row`).
 *
 * This function works under the following assumptions:
 *
 *   - A row element MUST contain a "role" attribute with the value "row"
 * @param {?} element
 * @return {?}
 */
function isRowContainer(element) {
    return element.getAttribute('role') === 'row';
}
/**
 * Find the cell element that is or wraps the provided element.
 * The element can be a table cell element (any type of) OR a nested element (any level) of a table cell element.
 *
 * This function works under the following assumptions:
 *
 *   - The parent of a cell element is a row element.
 *   - Each row element MUST contain a "role" attribute with the value "row"
 * @param {?} element
 * @return {?}
 */
function findParentCell(element) {
    while (element.parentElement) {
        if (isRowContainer(element.parentElement)) {
            return element;
        }
        element = element.parentElement;
    }
}
/**
 * Returns the position (index) of the cell (element) among it's siblings.
 * @param {?} cell
 * @return {?}
 */
function findCellRenderIndex(cell) {
    /** @type {?} */
    var colIndex = 0;
    while (cell = cell.previousElementSibling) {
        colIndex++;
    }
    return colIndex;
}
/**
 * Returns table metadata for a given ROW element.
 * This function works under the following assumptions:
 *
 *   - Each row element MUST contain a "role" attribute with the value "row"
 *   - Each row element MUST contains the type identifier attribute "data-rowtype" (except "data" rows)
 *   - Allowed values for "data-rowtype" are: 'header' | 'meta-header' | 'footer' | 'meta-footer' | 'data'
 *   - Row's representing data items (data-rowtype="data") can omit the type attribute and the function will infer it.
 *
 * NOTE that this function DOES NOT identify subType of `meta-group` (`PblNgridMatrixRow<'header' | 'footer', 'meta-group'>`), it will return it as
 * 'meta`, you need to handle this case specifically.
 *
 * Because detection is based on DOM element position finding the original row index when multiple row containers are set (fixed/style/row) will not work.
 * The rowIndex will be relative to the container, and not the entire table.
 * @param {?} row
 * @param {?} vcRef
 * @return {?}
 */
function matrixRowFromRow(row, vcRef) {
    /** @type {?} */
    var rowAttrType = (/** @type {?} */ (row.getAttribute('data-rowtype'))) || 'data';
    // TODO: Error if rowAttrType is not one of the allowed values!
    /** @type {?} */
    var rowIndex = 0;
    switch (rowAttrType) {
        case 'data':
            /** @type {?} */
            var sourceRow = row;
            while (row.previousElementSibling) {
                rowIndex++;
                row = row.previousElementSibling;
            }
            rowIndex = Math.min(rowIndex, vcRef.length - 1);
            while (rowIndex > -1) {
                if (((/** @type {?} */ (vcRef.get(rowIndex)))).rootNodes[0] === sourceRow) {
                    return (/** @type {?} */ ({
                        type: 'data',
                        subType: 'data',
                        rowIndex: rowIndex,
                    }));
                }
                rowIndex--;
            }
            return;
        case 'header':
        case 'footer':
            return (/** @type {?} */ ({
                type: rowAttrType,
                subType: 'data',
                rowIndex: rowIndex,
            }));
        default:
            while (row.previousElementSibling && row.previousElementSibling.getAttribute('data-rowtype') === rowAttrType) {
                rowIndex++;
                row = row.previousElementSibling;
            }
            return (/** @type {?} */ ({
                type: rowAttrType === 'meta-footer' ? 'footer' : 'header',
                subType: 'meta',
                rowIndex: rowIndex,
            }));
    }
}
/**
 * Given a list of cells stacked vertically (yAxis) and a list of cells stacked horizontally (xAxis) return all the cells inside (without the provided axis cells).
 *
 * In the following example, all [Yn] cells are provided in the yAxis param and all [Xn] cell in the xAxis params, the returned value will be an array
 * with all cells marked with Z.
 *    Y5  Z  Z  Z
 *    Y4  Z  Z  Z
 *    Y3  Z  Z  Z
 *    Y2  Z  Z  Z
 *    XY1 X2 X3 X4
 * @param {?} contextApi
 * @param {?} xAxis
 * @param {?} yAxis
 * @return {?}
 */
function getInnerCellsInRect(contextApi, xAxis, yAxis) {
    var e_1, _a, e_2, _b;
    /** @type {?} */
    var spaceInside = [];
    try {
        for (var yAxis_1 = __values(yAxis), yAxis_1_1 = yAxis_1.next(); !yAxis_1_1.done; yAxis_1_1 = yAxis_1.next()) {
            var vCell = yAxis_1_1.value;
            try {
                for (var xAxis_1 = __values(xAxis), xAxis_1_1 = xAxis_1.next(); !xAxis_1_1.done; xAxis_1_1 = xAxis_1.next()) {
                    var hCell = xAxis_1_1.value;
                    /** @type {?} */
                    var vhContext = contextApi.findRowInCache(vCell.rowIdent).cells[hCell.colIndex];
                    if (vhContext) {
                        spaceInside.push({ rowIdent: vCell.rowIdent, colIndex: hCell.colIndex });
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (xAxis_1_1 && !xAxis_1_1.done && (_b = xAxis_1.return)) _b.call(xAxis_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (yAxis_1_1 && !yAxis_1_1.done && (_a = yAxis_1.return)) _a.call(yAxis_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return spaceInside;
}
/**
 * @param {?} n1
 * @param {?} n2
 * @return {?}
 */
function rangeBetween(n1, n2) {
    /** @type {?} */
    var min = Math.min(n1, n2);
    /** @type {?} */
    var max = min === n1 ? n2 : n1;
    /** @type {?} */
    var result = [];
    for (var i = min + 1; i < max; i++) {
        result.push(i);
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var isOsx = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
var isMainMouseButtonClick = (/**
 * @param {?} event
 * @return {?}
 */
function (event) { return event.source.button === 0; });
var ɵ0 = isMainMouseButtonClick;
/**
 * @param {?} targetEvents
 * @return {?}
 */
function handleFocusAndSelection(targetEvents) {
    /** @type {?} */
    var isCellFocusMode = (/**
     * @return {?}
     */
    function () { return targetEvents.grid.focusMode === 'cell'; });
    /** @type {?} */
    var handlers = createHandlers(targetEvents);
    // Handle array keys move (with shift for selection, without for cell focus change)
    targetEvents.keyDown
        .pipe(filter(isCellFocusMode))
        .subscribe(handlers.handleKeyDown);
    // Handle mouse down on cell (focus) and then moving for selection.
    targetEvents.mouseDown
        .pipe(filter(isCellFocusMode), filter(isDataCellEvent), filter(isMainMouseButtonClick), tap((/**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.source.stopPropagation();
        event.source.preventDefault();
    })), tap(handlers.handleMouseDown), // handle mouse down focus
    switchMap((/**
     * @return {?}
     */
    function () { return targetEvents.cellEnter.pipe(takeUntil(targetEvents.mouseUp)); })), filter(isDataCellEvent), filter(isMainMouseButtonClick))
        .subscribe(handlers.handleSelectionChangeByMouseClickAndMove); // now handle movements until mouseup
}
/**
 * @param {?} targetEvents
 * @return {?}
 */
function createHandlers(targetEvents) {
    var contextApi = targetEvents.grid.contextApi;
    /**
     * @param {?} rowIdent
     * @param {?} colIndex
     * @param {?=} markForCheck
     * @return {?}
     */
    function focusCell(rowIdent, colIndex, markForCheck) {
        contextApi.focusCell({ rowIdent: rowIdent, colIndex: colIndex }, markForCheck);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleMouseDown(event) {
        if (contextApi.focusedCell && event.source.shiftKey) {
            handleSelectionChangeByMouseClickAndMove(event);
        }
        else if (isOsx ? event.source.metaKey : event.source.ctrlKey) {
            if (event.context.selected) {
                contextApi.unselectCells([event.context]);
            }
            else {
                contextApi.selectCells([event.context]);
            }
        }
        else {
            focusCell(event.context.rowContext.identity, event.context.index);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleKeyDown(event) {
        /** @type {?} */
        var source = (/** @type {?} */ (event.source));
        if (isCellEvent(event)) {
            /** @type {?} */
            var sourceCell = event.cellTarget;
            /** @type {?} */
            var coeff = 1;
            /** @type {?} */
            var axis = void 0;
            switch (source.keyCode) {
                case UP_ARROW:
                    coeff = -1;
                case DOWN_ARROW: // tslint:disable-line: no-switch-case-fall-through
                    axis = 'v';
                    break;
                case LEFT_ARROW:
                    coeff = -1;
                case RIGHT_ARROW: // tslint:disable-line: no-switch-case-fall-through
                    axis = 'h';
                    break;
                default:
                    return;
            }
            /** @type {?} */
            var cellContext = contextApi.getCell(sourceCell);
            /** @type {?} */
            var activeFocus = contextApi.focusedCell || {
                rowIdent: cellContext.rowContext.identity,
                colIndex: cellContext.index,
            };
            if (!!source.shiftKey) {
                handleSelectionChangeByArrows(activeFocus, axis === 'h' ? [coeff, 0] : [0, coeff]);
            }
            else {
                handleSingleItemFocus(activeFocus, axis === 'h' ? [coeff, 0] : [0, coeff]);
            }
        }
    }
    /**
     * Handle selection changes caused ONLY by the use of the arrow keys with SHIFT key.
     *
     * The implementation is NOT incremental, it will re-calculate the selected cell on every arrow key press (every call to this function).
     *
     * First. A simple adjacent cell detection is performed to determine the direction of the current selected cells relative to the
     * source cell (usually the focused cell). We only care about 4 cells, adjacent to the source Cell: Top, Left, Bottom, Right
     *
     *    │ T │
     * ───┼───┼───
     *  R │ C │ L
     * ───┼───┼───
     *    │ B │
     *
     * We can only have 1 quarter selection with Arrow selection so it TL, TR, BR or BL, any other setup will clear the selection and start from scratch.
     *
     * > Note that the logic in this function is for use with arrow keys + SHIFT key, other selection logic
     * does not fit this scenario (e.g. MOUSE selection or ARROW KEYS + CTRL KEY selection)
     *
     * @param {?} sourceCellRef A point reference to the source cell the direction is relative to
     * @param {?} direction The direction of the new cell.
     * [1 | -1, 0] -> HORIZONTAL
     * [0, 1 | -1] -> VERTICAL
     * @return {?}
     */
    function handleSelectionChangeByArrows(sourceCellRef, direction) {
        var rowIdent = sourceCellRef.rowIdent, colIndex = sourceCellRef.colIndex;
        /** @type {?} */
        var sourceCellState = contextApi.findRowInCache(rowIdent);
        var _a = __read(direction, 2), moveH = _a[0], moveV = _a[1];
        /** @type {?} */
        var hAdj = [sourceCellState.cells[colIndex - 1], sourceCellState.cells[colIndex + 1]];
        /** @type {?} */
        var vAdj = [contextApi.findRowInCache(rowIdent, -1, true), contextApi.findRowInCache(rowIdent, 1, true)];
        /** @type {?} */
        var h = (hAdj[0] && hAdj[0].selected ? -1 : 0) + (hAdj[1] && hAdj[1].selected ? 1 : 0);
        /** @type {?} */
        var v = (vAdj[0] && vAdj[0].cells[colIndex].selected ? -1 : 0) + (vAdj[1] && vAdj[1].cells[colIndex].selected ? 1 : 0);
        if (h === 0) {
            h += moveH;
        }
        if (v === 0) {
            v += moveV;
        }
        /** @type {?} */
        var hCells = [];
        if (h !== 0) {
            /** @type {?} */
            var hContextIndex = colIndex;
            /** @type {?} */
            var hContext = sourceCellState.cells[colIndex];
            while (hContext && hContext.selected) {
                hCells.push({ rowIdent: rowIdent, colIndex: hContextIndex });
                hContextIndex += h;
                hContext = sourceCellState.cells[hContextIndex];
            }
            if (moveH) {
                if (h === moveH) {
                    if (hContext) {
                        hCells.push({ rowIdent: rowIdent, colIndex: hContextIndex });
                    }
                }
                else {
                    hCells.pop();
                }
            }
        }
        /** @type {?} */
        var vCells = [];
        if (v !== 0) {
            /** @type {?} */
            var vContextIdent = rowIdent;
            /** @type {?} */
            var vContext = contextApi.findRowInCache(vContextIdent, v, true);
            while (vContext && vContext.cells[colIndex].selected) {
                vContextIdent = vContext.identity;
                vCells.push({ rowIdent: vContextIdent, colIndex: colIndex });
                vContext = contextApi.findRowInCache(vContextIdent, v, true);
            }
            if (moveV) {
                if (v === moveV) {
                    if (vContext) {
                        vCells.push({ rowIdent: vContext.identity, colIndex: colIndex });
                    }
                }
                else {
                    vCells.pop();
                }
            }
        }
        /** @type {?} */
        var innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells(__spread([sourceCellRef], hCells, vCells, innerCells), false, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleSelectionChangeByMouseClickAndMove(event) {
        var e_1, _a;
        /** @type {?} */
        var cellContext = event.context;
        /** @type {?} */
        var activeFocus = contextApi.focusedCell || {
            rowIdent: cellContext.rowContext.identity,
            colIndex: cellContext.index,
        };
        /** @type {?} */
        var focusedRowState = contextApi.findRowInCache(activeFocus.rowIdent);
        /** @type {?} */
        var hCells = [];
        /** @type {?} */
        var vCells = [];
        try {
            for (var _b = __values(rangeBetween(activeFocus.colIndex, cellContext.index)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var i = _c.value;
                hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: i });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: cellContext.index });
        /** @type {?} */
        var rowHeight = Math.abs(cellContext.rowContext.dataIndex - focusedRowState.dataIndex);
        /** @type {?} */
        var dir = focusedRowState.dataIndex > cellContext.rowContext.dataIndex ? -1 : 1;
        for (var i = 1; i <= rowHeight; i++) {
            /** @type {?} */
            var state = contextApi.findRowInCache(activeFocus.rowIdent, dir * i, true);
            vCells.push({ rowIdent: state.identity, colIndex: activeFocus.colIndex });
        }
        /** @type {?} */
        var innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells(__spread([activeFocus], hCells, vCells, innerCells), false, true);
    }
    /**
     * Swap the focus from the source cell to a straight adjacent cell (not diagonal).
     * @param {?} sourceCellRef A point reference to the source cell the direction is relative to
     * @param {?} direction The direction of the new cell.
     * [1 | -1, 0] -> HORIZONTAL
     * [0, 1 | -1] -> VERTICAL
     * @return {?}
     */
    function handleSingleItemFocus(sourceCellRef, direction) {
        /** @type {?} */
        var rowState = contextApi.findRowInCache(sourceCellRef.rowIdent, direction[1], true);
        if (rowState) {
            contextApi.focusCell({ rowIdent: rowState.identity, colIndex: sourceCellRef.colIndex + direction[0] }, true);
        }
    }
    return {
        handleMouseDown: handleMouseDown,
        handleKeyDown: handleKeyDown,
        handleSelectionChangeByMouseClickAndMove: handleSelectionChangeByMouseClickAndMove
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var PLUGIN_KEY = 'targetEvents';
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
function runOnce() {
    PblColumn.extendProperty('editable');
}
/**
 * @template T
 */
var PblNgridTargetEventsPlugin = /** @class */ (function () {
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
    PblNgridTargetEventsPlugin_1 = PblNgridTargetEventsPlugin;
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
                var event_1 = (/** @type {?} */ (__assign({}, matrixPoint, { source: source, cellTarget: cellTarget, rowTarget: rowTarget })));
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
                    var event_3 = (/** @type {?} */ (__assign({}, matrixPoint, { source: source, rowTarget: rowTarget })));
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
    var PblNgridTargetEventsPlugin_1;
    PblNgridTargetEventsPlugin.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    /**
     * @template T
     */
    PblNgridTargetEventsPlugin = PblNgridTargetEventsPlugin_1 = __decorate([
        NgridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: runOnce }),
        __metadata("design:paramtypes", [PblNgridComponent,
            Injector,
            PblNgridPluginController])
    ], PblNgridTargetEventsPlugin);
    return PblNgridTargetEventsPlugin;
}());
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
    PblNgridTargetEventsPluginDirective = __decorate([
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridTargetEventsPluginDirective);
    return PblNgridTargetEventsPluginDirective;
}(PblNgridTargetEventsPlugin));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
var PblNgridCellEditDirective = /** @class */ (function () {
    function PblNgridCellEditDirective(grid, injector, pluginCtrl) {
        var _this = this;
        this._click = false;
        this._dblClick = false;
        /** @type {?} */
        var subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onInit') {
                subscription.unsubscribe();
                subscription = undefined;
                // Depends on target-events plugin
                // if it's not set, create it.
                _this.targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
                _this.update();
            }
        }));
    }
    Object.defineProperty(PblNgridCellEditDirective.prototype, "cellEditClick", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (this._click !== value) {
                this._click = value;
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridCellEditDirective.prototype, "cellEditDblClick", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (this._dblClick !== value) {
                this._dblClick = value;
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    PblNgridCellEditDirective.prototype.update = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.targetEventsPlugin) {
            UnRx.kill(this, this.targetEventsPlugin);
            if (this._click) {
                this.targetEventsPlugin.cellClick
                    .pipe(UnRx(this, this.targetEventsPlugin))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.type === 'data' && event.column.editable) {
                        event.context.startEdit(true);
                    }
                }));
            }
            if (this._dblClick) {
                this.targetEventsPlugin.cellDblClick
                    .pipe(UnRx(this, this.targetEventsPlugin))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.type === 'data' && event.column.editable) {
                        event.context.startEdit(true);
                    }
                }));
            }
        }
    };
    PblNgridCellEditDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridCellEditDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]',
                },] }
    ];
    /** @nocollapse */
    PblNgridCellEditDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridCellEditDirective.propDecorators = {
        cellEditClick: [{ type: Input }],
        cellEditDblClick: [{ type: Input }]
    };
    /**
     * @template T
     */
    PblNgridCellEditDirective = __decorate([
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridCellEditDirective);
    return PblNgridCellEditDirective;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditDirective.prototype._click;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditDirective.prototype._dblClick;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditDirective.prototype.targetEventsPlugin;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridTargetEventsModule = /** @class */ (function () {
    function PblNgridTargetEventsModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                /** @type {?} */
                var pluginCtrl_1 = event.controller;
                /** @type {?} */
                var subscription_1 = pluginCtrl_1.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                function (evt) {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl_1.hasPlugin(PLUGIN_KEY)) {
                            pluginCtrl_1.createPlugin(PLUGIN_KEY);
                        }
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }));
    }
    PblNgridTargetEventsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective],
                    exports: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective]
                },] }
    ];
    /** @nocollapse */
    PblNgridTargetEventsModule.ctorParameters = function () { return [
        { type: PblNgridTargetEventsModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridTargetEventsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridTargetEventsModule, PblNgridTargetEventsPlugin, isCellEvent, isDataCellEvent, PLUGIN_KEY as ɵa, runOnce as ɵb, PblNgridTargetEventsPluginDirective as ɵc, PblNgridCellEditDirective as ɵd };
//# sourceMappingURL=pebula-ngrid-target-events.js.map
