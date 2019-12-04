import { __decorate, __metadata } from 'tslib';
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
    let colIndex = 0;
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
    const rowAttrType = (/** @type {?} */ (row.getAttribute('data-rowtype'))) || 'data';
    // TODO: Error if rowAttrType is not one of the allowed values!
    /** @type {?} */
    let rowIndex = 0;
    switch (rowAttrType) {
        case 'data':
            /** @type {?} */
            const sourceRow = row;
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
                        rowIndex,
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
                rowIndex,
            }));
        default:
            while (row.previousElementSibling && row.previousElementSibling.getAttribute('data-rowtype') === rowAttrType) {
                rowIndex++;
                row = row.previousElementSibling;
            }
            return (/** @type {?} */ ({
                type: rowAttrType === 'meta-footer' ? 'footer' : 'header',
                subType: 'meta',
                rowIndex,
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
    /** @type {?} */
    const spaceInside = [];
    for (const vCell of yAxis) {
        for (const hCell of xAxis) {
            /** @type {?} */
            const vhContext = contextApi.findRowInCache(vCell.rowIdent).cells[hCell.colIndex];
            if (vhContext) {
                spaceInside.push({ rowIdent: vCell.rowIdent, colIndex: hCell.colIndex });
            }
        }
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
    const min = Math.min(n1, n2);
    /** @type {?} */
    const max = min === n1 ? n2 : n1;
    /** @type {?} */
    const result = [];
    for (let i = min + 1; i < max; i++) {
        result.push(i);
    }
    return result;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const isOsx = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
const isMainMouseButtonClick = (/**
 * @param {?} event
 * @return {?}
 */
(event) => event.source.button === 0);
const ɵ0 = isMainMouseButtonClick;
/**
 * @param {?} targetEvents
 * @return {?}
 */
function handleFocusAndSelection(targetEvents) {
    /** @type {?} */
    const isCellFocusMode = (/**
     * @return {?}
     */
    () => targetEvents.grid.focusMode === 'cell');
    /** @type {?} */
    const handlers = createHandlers(targetEvents);
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
    event => {
        event.source.stopPropagation();
        event.source.preventDefault();
    })), tap(handlers.handleMouseDown), // handle mouse down focus
    switchMap((/**
     * @return {?}
     */
    () => targetEvents.cellEnter.pipe(takeUntil(targetEvents.mouseUp)))), filter(isDataCellEvent), filter(isMainMouseButtonClick))
        .subscribe(handlers.handleSelectionChangeByMouseClickAndMove); // now handle movements until mouseup
}
/**
 * @param {?} targetEvents
 * @return {?}
 */
function createHandlers(targetEvents) {
    const { contextApi } = targetEvents.grid;
    /**
     * @param {?} rowIdent
     * @param {?} colIndex
     * @param {?=} markForCheck
     * @return {?}
     */
    function focusCell(rowIdent, colIndex, markForCheck) {
        contextApi.focusCell({ rowIdent, colIndex }, markForCheck);
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
        const source = (/** @type {?} */ (event.source));
        if (isCellEvent(event)) {
            /** @type {?} */
            const sourceCell = event.cellTarget;
            /** @type {?} */
            let coeff = 1;
            /** @type {?} */
            let axis;
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
            const cellContext = contextApi.getCell(sourceCell);
            /** @type {?} */
            const activeFocus = contextApi.focusedCell || {
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
        const { rowIdent, colIndex } = sourceCellRef;
        /** @type {?} */
        const sourceCellState = contextApi.findRowInCache(rowIdent);
        const [moveH, moveV] = direction;
        /** @type {?} */
        const hAdj = [sourceCellState.cells[colIndex - 1], sourceCellState.cells[colIndex + 1]];
        /** @type {?} */
        const vAdj = [contextApi.findRowInCache(rowIdent, -1, true), contextApi.findRowInCache(rowIdent, 1, true)];
        /** @type {?} */
        let h = (hAdj[0] && hAdj[0].selected ? -1 : 0) + (hAdj[1] && hAdj[1].selected ? 1 : 0);
        /** @type {?} */
        let v = (vAdj[0] && vAdj[0].cells[colIndex].selected ? -1 : 0) + (vAdj[1] && vAdj[1].cells[colIndex].selected ? 1 : 0);
        if (h === 0) {
            h += moveH;
        }
        if (v === 0) {
            v += moveV;
        }
        /** @type {?} */
        const hCells = [];
        if (h !== 0) {
            /** @type {?} */
            let hContextIndex = colIndex;
            /** @type {?} */
            let hContext = sourceCellState.cells[colIndex];
            while (hContext && hContext.selected) {
                hCells.push({ rowIdent, colIndex: hContextIndex });
                hContextIndex += h;
                hContext = sourceCellState.cells[hContextIndex];
            }
            if (moveH) {
                if (h === moveH) {
                    if (hContext) {
                        hCells.push({ rowIdent, colIndex: hContextIndex });
                    }
                }
                else {
                    hCells.pop();
                }
            }
        }
        /** @type {?} */
        const vCells = [];
        if (v !== 0) {
            /** @type {?} */
            let vContextIdent = rowIdent;
            /** @type {?} */
            let vContext = contextApi.findRowInCache(vContextIdent, v, true);
            while (vContext && vContext.cells[colIndex].selected) {
                vContextIdent = vContext.identity;
                vCells.push({ rowIdent: vContextIdent, colIndex });
                vContext = contextApi.findRowInCache(vContextIdent, v, true);
            }
            if (moveV) {
                if (v === moveV) {
                    if (vContext) {
                        vCells.push({ rowIdent: vContext.identity, colIndex });
                    }
                }
                else {
                    vCells.pop();
                }
            }
        }
        /** @type {?} */
        const innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells([sourceCellRef, ...hCells, ...vCells, ...innerCells], false, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleSelectionChangeByMouseClickAndMove(event) {
        /** @type {?} */
        const cellContext = event.context;
        /** @type {?} */
        const activeFocus = contextApi.focusedCell || {
            rowIdent: cellContext.rowContext.identity,
            colIndex: cellContext.index,
        };
        /** @type {?} */
        const focusedRowState = contextApi.findRowInCache(activeFocus.rowIdent);
        /** @type {?} */
        const hCells = [];
        /** @type {?} */
        const vCells = [];
        for (const i of rangeBetween(activeFocus.colIndex, cellContext.index)) {
            hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: i });
        }
        hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: cellContext.index });
        /** @type {?} */
        const rowHeight = Math.abs(cellContext.rowContext.dataIndex - focusedRowState.dataIndex);
        /** @type {?} */
        const dir = focusedRowState.dataIndex > cellContext.rowContext.dataIndex ? -1 : 1;
        for (let i = 1; i <= rowHeight; i++) {
            /** @type {?} */
            const state = contextApi.findRowInCache(activeFocus.rowIdent, dir * i, true);
            vCells.push({ rowIdent: state.identity, colIndex: activeFocus.colIndex });
        }
        /** @type {?} */
        const innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells([activeFocus, ...hCells, ...vCells, ...innerCells], false, true);
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
        const rowState = contextApi.findRowInCache(sourceCellRef.rowIdent, direction[1], true);
        if (rowState) {
            contextApi.focusCell({ rowIdent: rowState.identity, colIndex: sourceCellRef.colIndex + direction[0] }, true);
        }
    }
    return {
        handleMouseDown,
        handleKeyDown,
        handleSelectionChangeByMouseClickAndMove
    };
}

var PblNgridTargetEventsPlugin_1;
/** @type {?} */
const PLUGIN_KEY = 'targetEvents';
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
function runOnce() {
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
                const event = (/** @type {?} */ (Object.assign({}, matrixPoint, { source, cellTarget, rowTarget })));
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
};
PblNgridTargetEventsPlugin.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
/**
 * @template T
 */
PblNgridTargetEventsPlugin = PblNgridTargetEventsPlugin_1 = __decorate([
    NgridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce }),
    __metadata("design:paramtypes", [PblNgridComponent,
        Injector,
        PblNgridPluginController])
], PblNgridTargetEventsPlugin);
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
PblNgridTargetEventsPluginDirective = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridTargetEventsPluginDirective);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
let PblNgridCellEditDirective = /**
 * @template T
 */
class PblNgridCellEditDirective {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
        this._click = false;
        this._dblClick = false;
        /** @type {?} */
        let subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onInit') {
                subscription.unsubscribe();
                subscription = undefined;
                // Depends on target-events plugin
                // if it's not set, create it.
                this.targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
                this.update();
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set cellEditClick(value) {
        value = coerceBooleanProperty(value);
        if (this._click !== value) {
            this._click = value;
            this.update();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set cellEditDblClick(value) {
        value = coerceBooleanProperty(value);
        if (this._dblClick !== value) {
            this._dblClick = value;
            this.update();
        }
    }
    /**
     * @private
     * @return {?}
     */
    update() {
        if (this.targetEventsPlugin) {
            UnRx.kill(this, this.targetEventsPlugin);
            if (this._click) {
                this.targetEventsPlugin.cellClick
                    .pipe(UnRx(this, this.targetEventsPlugin))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
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
                event => {
                    if (event.type === 'data' && event.column.editable) {
                        event.context.startEdit(true);
                    }
                }));
            }
        }
    }
};
PblNgridCellEditDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridCellEditDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]',
            },] }
];
/** @nocollapse */
PblNgridCellEditDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
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
class PblNgridTargetEventsModule {
    /**
     * @param {?} parentModule
     * @param {?} configService
     */
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                /** @type {?} */
                const pluginCtrl = event.controller;
                /** @type {?} */
                let subscription = pluginCtrl.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                evt => {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl.hasPlugin(PLUGIN_KEY)) {
                            pluginCtrl.createPlugin(PLUGIN_KEY);
                        }
                        subscription.unsubscribe();
                        subscription = undefined;
                    }
                }));
            }
        }));
    }
}
PblNgridTargetEventsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule],
                declarations: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective],
                exports: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective]
            },] }
];
/** @nocollapse */
PblNgridTargetEventsModule.ctorParameters = () => [
    { type: PblNgridTargetEventsModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];

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
