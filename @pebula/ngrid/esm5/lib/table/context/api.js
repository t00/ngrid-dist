/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BehaviorSubject, Subject, asapScheduler } from 'rxjs';
import { debounceTime, buffer, map, filter } from 'rxjs/operators';
import { removeFromArray } from '@pebula/utils';
import { findRowRenderedIndex, resolveCellReference } from './utils';
import { PblRowContext } from './row';
import { PblCellContext } from './cell';
/**
 * @template T
 */
var /**
 * @template T
 */
ContextApi = /** @class */ (function () {
    function ContextApi(extApi) {
        var _this = this;
        this.extApi = extApi;
        this.viewCache = new Map();
        this.cache = new Map();
        this.activeSelected = [];
        this.focusChanged$ = new BehaviorSubject({ prev: undefined, curr: undefined });
        this.selectionChanged$ = new Subject();
        /**
         * Notify when the focus has changed.
         *
         * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
         */
        this.focusChanged = this.focusChanged$
            .pipe(buffer(this.focusChanged$.pipe(debounceTime(0, asapScheduler))), map((/**
         * @param {?} events
         * @return {?}
         */
        function (events) { return ({ prev: events[0].prev, curr: events[events.length - 1].curr }); })));
        /**
         * Notify when the selected cells has changed.
         */
        this.selectionChanged = this.selectionChanged$.asObservable();
        this.vcRef = extApi.cdkTable._rowOutlet.viewContainer;
        this.columnApi = extApi.table.columnApi;
        extApi.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onDestroy'; })))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.destroy(); }));
        /** @type {?} */
        var updateContext = (/**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var viewPortRect = _this.getViewRect();
            /** @type {?} */
            var lastView = new Set(Array.from(_this.viewCache.values()).map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.identity; })));
            /** @type {?} */
            var unmatchedRefs = new Map();
            /** @type {?} */
            var keepProcessOutOfView = !!viewPortRect;
            for (var i = 0, len = _this.vcRef.length; i < len; i++) {
                /** @type {?} */
                var viewRef = _this.findViewRef(i);
                /** @type {?} */
                var rowContext = _this.findRowContext(viewRef, i);
                _this.viewCache.set(i, rowContext);
                lastView.delete(rowContext.identity);
                // Identity did not change but context did change
                // This is probably due to trackBy with index reference or that matched data on some property but the actual data reference changed.
                // We log these and handle them later, they come in pair and we need to switch the context between the values in the pair.
                // The pair is a 2 item tuple - 1st item is new index, 2nd item is the old index.
                // We build the pairs, each pair is a switch
                if (viewRef.context.$implicit !== rowContext.$implicit) {
                    /** @type {?} */
                    var pair = unmatchedRefs.get(rowContext.$implicit) || [-1, -1];
                    pair[1] = i;
                    unmatchedRefs.set(rowContext.$implicit, pair);
                    pair = unmatchedRefs.get(viewRef.context.$implicit) || [-1, -1];
                    pair[0] = i;
                    unmatchedRefs.set(viewRef.context.$implicit, pair);
                }
                if (keepProcessOutOfView) {
                    keepProcessOutOfView = processOutOfView(viewRef, viewPortRect, 'top');
                }
            }
            if (unmatchedRefs.size > 0) {
                // We have pairs but we can't just start switching because when the items move or swap we need
                // to update their values and so we need to cache one of them.
                // The operation will effect all items (N) between then origin and destination.
                // When N === 2 its a swap, when N > 2 its a move.
                // In both cases the first and last operations share the same object.
                // Also, we need to make sure that the order of operations does not use the same row as the source more then once.
                // For example, If I copy row 5 to to row 4 and then 4 to 3 I need to start from 3->4->5, if I do 5->4->3 I will get 5 in all rows.
                //
                // We use the source (pair[1]) for sorting, the sort order depends on the direction of the move (up/down).
                /** @type {?} */
                var arr = Array.from(unmatchedRefs.entries()).filter((/**
                 * @param {?} entry
                 * @return {?}
                 */
                function (entry) {
                    /** @type {?} */
                    var pair = entry[1];
                    if (pair[0] === -1) {
                        return false;
                    }
                    else if (pair[1] === -1) {
                        /** @type {?} */
                        var to = _this.viewCache.get(pair[0]);
                        to.$implicit = entry[0];
                        return false;
                    }
                    return true;
                })).map((/**
                 * @param {?} entry
                 * @return {?}
                 */
                function (entry) { return entry[1]; }));
                unmatchedRefs.clear();
                if (arr.length) {
                    /** @type {?} */
                    var sortFn = arr[arr.length - 1][0] - arr[arr.length - 1][1] > 0 // check sort direction
                        ? (/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        function (a, b) { return b[1] - a[1]; })
                        : (/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        function (a, b) { return a[1] - b[1]; });
                    arr.sort(sortFn);
                    /** @type {?} */
                    var lastOp = {
                        data: _this.viewCache.get(arr[0][0]).$implicit,
                        state: _this.viewCache.get(arr[0][0]).getState(),
                        pair: arr.pop(),
                    };
                    try {
                        for (var arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                            var pair = arr_1_1.value;
                            // What we're doing here is switching the context wrapped by `RotContext` while the `RowContext` preserve it's identity.
                            // Each row context has a state, which is valid for it's current context, if we switch context we must switch state as well and also
                            // cache it.
                            /** @type {?} */
                            var to_1 = _this.viewCache.get(pair[0]);
                            /** @type {?} */
                            var from = _this.viewCache.get(pair[1]);
                            /** @type {?} */
                            var state = from.getState();
                            state.identity = to_1.identity;
                            _this.cache.set(to_1.identity, state);
                            to_1.fromState(state);
                            to_1.$implicit = from.$implicit;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    /** @type {?} */
                    var to = _this.viewCache.get(lastOp.pair[0]);
                    lastOp.state.identity = to.identity;
                    _this.cache.set(to.identity, lastOp.state);
                    to.fromState(lastOp.state);
                    to.$implicit = lastOp.data;
                }
            }
            if (viewPortRect) {
                for (var i = _this.vcRef.length - 1; i > -1; i--) {
                    if (!processOutOfView(_this.findViewRef(i), viewPortRect, 'bottom')) {
                        break;
                    }
                }
            }
            lastView.forEach((/**
             * @param {?} ident
             * @return {?}
             */
            function (ident) { return _this.cache.get(ident).firstRender = false; }));
        });
        updateContext();
        extApi.cdkTable.onRenderRows.subscribe(updateContext);
    }
    Object.defineProperty(ContextApi.prototype, "focusedCell", {
        /**
         * The reference to currently focused cell context.
         * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
         *
         * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
         * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
         */
        get: /**
         * The reference to currently focused cell context.
         * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
         *
         * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
         * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
         * @return {?}
         */
        function () {
            return this.activeFocused ? tslib_1.__assign({}, this.activeFocused) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContextApi.prototype, "selectedCells", {
        /**
         * The reference to currently selected range of cell's context.
         * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
         *
         * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
         * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
         */
        get: /**
         * The reference to currently selected range of cell's context.
         * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
         *
         * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
         * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
         * @return {?}
         */
        function () {
            return this.activeSelected.slice();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param cellRef A Reference to the cell
     * @param markForCheck Mark the row for change detection
     */
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param {?=} cellRef A Reference to the cell
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    ContextApi.prototype.focusCell = /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param {?=} cellRef A Reference to the cell
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    function (cellRef, markForCheck) {
        if (!cellRef || cellRef === true) {
            if (this.activeFocused) {
                var _a = this.activeFocused, rowIdent = _a.rowIdent, colIndex = _a.colIndex;
                this.activeFocused = undefined;
                this.updateState(rowIdent, colIndex, { focused: false });
                this.emitFocusChanged(this.activeFocused);
                if (markForCheck) {
                    /** @type {?} */
                    var rowContext = this.findRowInView(rowIdent);
                    if (rowContext) {
                        this.extApi.table._cdkTable.syncRows('data', rowContext.index);
                    }
                }
            }
        }
        else {
            /** @type {?} */
            var ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
            if (ref) {
                this.focusCell(markForCheck);
                if (ref instanceof PblCellContext) {
                    if (!ref.focused && !this.extApi.table.viewport.isScrolling) {
                        this.updateState(ref.rowContext.identity, ref.index, { focused: true });
                        this.activeFocused = { rowIdent: ref.rowContext.identity, colIndex: ref.index };
                        this.selectCells([this.activeFocused], markForCheck, true);
                        if (markForCheck) {
                            this.extApi.table._cdkTable.syncRows('data', ref.rowContext.index);
                        }
                    }
                }
                else {
                    this.updateState(ref[0].identity, ref[1], { focused: true });
                    this.activeFocused = { rowIdent: ref[0].identity, colIndex: ref[1] };
                }
                this.emitFocusChanged(this.activeFocused);
            }
        }
    };
    /**
     * Select all provided cells.
     * @param cellRef A Reference to the cell
     * @param markForCheck Mark the row for change detection
     * @param clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     */
    /**
     * Select all provided cells.
     * @param {?} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @param {?=} clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     * @return {?}
     */
    ContextApi.prototype.selectCells = /**
     * Select all provided cells.
     * @param {?} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @param {?=} clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     * @return {?}
     */
    function (cellRefs, markForCheck, clearCurrent) {
        var e_2, _a, _b;
        /** @type {?} */
        var toMarkRendered = new Set();
        if (clearCurrent) {
            this.unselectCells();
        }
        /** @type {?} */
        var added = [];
        try {
            for (var cellRefs_1 = tslib_1.__values(cellRefs), cellRefs_1_1 = cellRefs_1.next(); !cellRefs_1_1.done; cellRefs_1_1 = cellRefs_1.next()) {
                var cellRef = cellRefs_1_1.value;
                /** @type {?} */
                var ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
                if (ref instanceof PblCellContext) {
                    if (!ref.selected && !this.extApi.table.viewport.isScrolling) {
                        /** @type {?} */
                        var rowIdent = ref.rowContext.identity;
                        /** @type {?} */
                        var colIndex = ref.index;
                        this.updateState(rowIdent, colIndex, { selected: true });
                        /** @type {?} */
                        var dataPoint = { rowIdent: rowIdent, colIndex: colIndex };
                        this.activeSelected.push(dataPoint);
                        added.push(dataPoint);
                        if (markForCheck) {
                            toMarkRendered.add(ref.rowContext.index);
                        }
                    }
                }
                else if (ref) {
                    var _c = tslib_1.__read(ref, 2), rowState = _c[0], colIndex = _c[1];
                    if (!rowState.cells[colIndex].selected) {
                        this.updateState(rowState.identity, colIndex, { selected: true });
                        this.activeSelected.push({ rowIdent: rowState.identity, colIndex: colIndex });
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (cellRefs_1_1 && !cellRefs_1_1.done && (_a = cellRefs_1.return)) _a.call(cellRefs_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (toMarkRendered.size > 0) {
            (_b = this.extApi.table._cdkTable).syncRows.apply(_b, tslib_1.__spread(['data'], Array.from(toMarkRendered.values())));
        }
        this.selectionChanged$.next({ added: added, removed: [] });
    };
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param cellRef A Reference to the cell
     * @param markForCheck Mark the row for change detection
     */
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param {?=} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    ContextApi.prototype.unselectCells = /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param {?=} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    function (cellRefs, markForCheck) {
        var e_3, _a, _b;
        /** @type {?} */
        var toMarkRendered = new Set();
        /** @type {?} */
        var toUnselect = this.activeSelected;
        /** @type {?} */
        var removeAll = true;
        if (Array.isArray(cellRefs)) {
            toUnselect = cellRefs;
            removeAll = false;
        }
        else {
            markForCheck = !!cellRefs;
            this.activeSelected = [];
        }
        /** @type {?} */
        var removed = [];
        var _loop_1 = function (cellRef) {
            /** @type {?} */
            var ref = resolveCellReference(cellRef, (/** @type {?} */ (this_1)));
            if (ref instanceof PblCellContext) {
                if (ref.selected) {
                    /** @type {?} */
                    var rowIdent_1 = ref.rowContext.identity;
                    /** @type {?} */
                    var colIndex_1 = ref.index;
                    this_1.updateState(rowIdent_1, colIndex_1, { selected: false });
                    if (!removeAll) {
                        /** @type {?} */
                        var wasRemoved = removeFromArray(this_1.activeSelected, (/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.colIndex === colIndex_1 && item.rowIdent === rowIdent_1; }));
                        if (wasRemoved) {
                            removed.push({ rowIdent: rowIdent_1, colIndex: colIndex_1 });
                        }
                    }
                    if (markForCheck) {
                        toMarkRendered.add(ref.rowContext.index);
                    }
                }
            }
            else if (ref) {
                var _a = tslib_1.__read(ref, 2), rowState_1 = _a[0], colIndex_2 = _a[1];
                if (rowState_1.cells[colIndex_2].selected) {
                    this_1.updateState(rowState_1.identity, colIndex_2, { selected: false });
                    if (!removeAll) {
                        /** @type {?} */
                        var wasRemoved = removeFromArray(this_1.activeSelected, (/**
                         * @param {?} item
                         * @return {?}
                         */
                        function (item) { return item.colIndex === colIndex_2 && item.rowIdent === rowState_1.identity; }));
                        if (wasRemoved) {
                            removed.push({ rowIdent: rowState_1.identity, colIndex: colIndex_2 });
                        }
                    }
                }
            }
        };
        var this_1 = this;
        try {
            for (var toUnselect_1 = tslib_1.__values(toUnselect), toUnselect_1_1 = toUnselect_1.next(); !toUnselect_1_1.done; toUnselect_1_1 = toUnselect_1.next()) {
                var cellRef = toUnselect_1_1.value;
                _loop_1(cellRef);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (toUnselect_1_1 && !toUnselect_1_1.done && (_a = toUnselect_1.return)) _a.call(toUnselect_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (toMarkRendered.size > 0) {
            (_b = this.extApi.table._cdkTable).syncRows.apply(_b, tslib_1.__spread(['data'], Array.from(toMarkRendered.values())));
        }
        this.selectionChanged$.next({ added: [], removed: removed });
    };
    /**
     * @return {?}
     */
    ContextApi.prototype.clear = /**
     * @return {?}
     */
    function () {
        for (var i = 0, len = this.vcRef.length; i < len; i++) {
            /** @type {?} */
            var viewRef = this.findViewRef(i);
            viewRef.context.pblRowContext = undefined;
        }
        this.viewCache.clear();
        this.cache.clear();
    };
    /**
     * @param {?} row
     * @return {?}
     */
    ContextApi.prototype.getRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        /** @type {?} */
        var index = typeof row === 'number' ? row : findRowRenderedIndex(row);
        return this.rowContext(index);
    };
    /**
     * @param {?} rowOrCellElement
     * @param {?=} col
     * @return {?}
     */
    ContextApi.prototype.getCell = /**
     * @param {?} rowOrCellElement
     * @param {?=} col
     * @return {?}
     */
    function (rowOrCellElement, col) {
        if (typeof rowOrCellElement === 'number') {
            /** @type {?} */
            var rowContext = this.rowContext(rowOrCellElement);
            if (rowContext) {
                return rowContext.cell(col);
            }
        }
        else {
            /** @type {?} */
            var ref = resolveCellReference(rowOrCellElement, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                return ref;
            }
        }
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    ContextApi.prototype.getDataItem = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        /** @type {?} */
        var ref = resolveCellReference(cell, (/** @type {?} */ (this)));
        if (ref instanceof PblCellContext) {
            return ref.col.getValue(ref.rowContext.$implicit);
        }
        else if (ref) {
            /** @type {?} */
            var row = this.extApi.table.ds.source[ref[0].dataIndex];
            /** @type {?} */
            var column = this.extApi.table.columnApi.findColumnAt(ref[1]);
            return column.getValue(row);
        }
    };
    /**
     * @param {?} renderRowIndex
     * @param {?} column
     * @return {?}
     */
    ContextApi.prototype.createCellContext = /**
     * @param {?} renderRowIndex
     * @param {?} column
     * @return {?}
     */
    function (renderRowIndex, column) {
        /** @type {?} */
        var rowContext = this.rowContext(renderRowIndex);
        /** @type {?} */
        var colIndex = this.columnApi.indexOf(column);
        return rowContext.cell(colIndex);
    };
    /**
     * @param {?} renderRowIndex
     * @return {?}
     */
    ContextApi.prototype.rowContext = /**
     * @param {?} renderRowIndex
     * @return {?}
     */
    function (renderRowIndex) {
        return this.viewCache.get(renderRowIndex);
    };
    /**
     * @param {?} rowContext
     * @return {?}
     */
    ContextApi.prototype.updateOutOfViewState = /**
     * @param {?} rowContext
     * @return {?}
     */
    function (rowContext) {
        /** @type {?} */
        var viewPortRect = this.getViewRect();
        /** @type {?} */
        var viewRef = this.findViewRef(rowContext.index);
        processOutOfView(viewRef, viewPortRect);
    };
    /**
     * @param {?} rowIdentity
     * @param {?} rowStateOrCellIndex
     * @param {?=} cellState
     * @return {?}
     */
    ContextApi.prototype.updateState = /**
     * @param {?} rowIdentity
     * @param {?} rowStateOrCellIndex
     * @param {?=} cellState
     * @return {?}
     */
    function (rowIdentity, rowStateOrCellIndex, cellState) {
        /** @type {?} */
        var currentRowState = this.cache.get(rowIdentity);
        if (currentRowState) {
            if (typeof rowStateOrCellIndex === 'number') {
                /** @type {?} */
                var currentCellState = currentRowState.cells[rowStateOrCellIndex];
                if (currentCellState) {
                    Object.assign(currentCellState, cellState);
                }
            }
            else {
                Object.assign(currentRowState, rowStateOrCellIndex);
            }
            /** @type {?} */
            var rowContext = this.findRowInView(rowIdentity);
            if (rowContext) {
                rowContext.fromState(currentRowState);
            }
        }
    };
    /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     */
    /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    ContextApi.prototype.findRowInView = /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    function (rowIdentity) {
        /** @type {?} */
        var rowState = this.cache.get(rowIdentity);
        if (rowState) {
            /** @type {?} */
            var renderRowIndex = rowState.dataIndex - this.extApi.table.ds.renderStart;
            /** @type {?} */
            var rowContext = this.viewCache.get(renderRowIndex);
            if (rowContext && rowContext.identity === rowIdentity) {
                return rowContext;
            }
        }
    };
    /**
     * @param {?} rowIdentity
     * @param {?=} offset
     * @param {?=} create
     * @return {?}
     */
    ContextApi.prototype.findRowInCache = /**
     * @param {?} rowIdentity
     * @param {?=} offset
     * @param {?=} create
     * @return {?}
     */
    function (rowIdentity, offset, create) {
        /** @type {?} */
        var rowState = this.cache.get(rowIdentity);
        if (!offset) {
            return rowState;
        }
        else {
            /** @type {?} */
            var dataIndex = rowState.dataIndex + offset;
            /** @type {?} */
            var identity = this.getRowIdentity(dataIndex);
            if (identity !== null) {
                /** @type {?} */
                var result = this.findRowInCache(identity);
                if (!result && create && dataIndex < this.extApi.table.ds.length) {
                    result = PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length);
                    this.cache.set(identity, result);
                }
                return result;
            }
        }
    };
    /**
     * @param {?} dataIndex
     * @param {?=} context
     * @return {?}
     */
    ContextApi.prototype.getRowIdentity = /**
     * @param {?} dataIndex
     * @param {?=} context
     * @return {?}
     */
    function (dataIndex, context) {
        var ds = this.extApi.table.ds;
        var primary = this.extApi.columnStore.primary;
        /** @type {?} */
        var row = context ? context.$implicit : ds.source[dataIndex];
        if (!row) {
            return null;
        }
        else {
            return primary ? primary.getValue(row) : dataIndex;
        }
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    ContextApi.prototype.findViewRef = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return (/** @type {?} */ (this.vcRef.get(index)));
    };
    /**
     * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
     *
     * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
     * extending it for the table features.
     *
     * The process has 2 layers of cache:
     *
     * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
     * Each view ref (row) has a matching record in the `RowContext` view cache.
     *
     * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
     * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
     * when `RowContext` goes in/out of the viewport.
     *
     * @param viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
     * @param renderRowIndex The position of the view, relative to other rows.
     * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
     * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
     */
    /**
     * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
     *
     * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
     * extending it for the table features.
     *
     * The process has 2 layers of cache:
     *
     * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
     * Each view ref (row) has a matching record in the `RowContext` view cache.
     *
     * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
     * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
     * when `RowContext` goes in/out of the viewport.
     *
     * @private
     * @param {?} viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
     * @param {?} renderRowIndex The position of the view, relative to other rows.
     * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
     * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
     * @return {?}
     */
    ContextApi.prototype.findRowContext = /**
     * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
     *
     * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
     * extending it for the table features.
     *
     * The process has 2 layers of cache:
     *
     * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
     * Each view ref (row) has a matching record in the `RowContext` view cache.
     *
     * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
     * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
     * when `RowContext` goes in/out of the viewport.
     *
     * @private
     * @param {?} viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
     * @param {?} renderRowIndex The position of the view, relative to other rows.
     * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
     * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
     * @return {?}
     */
    function (viewRef, renderRowIndex) {
        var _this = this;
        var context = viewRef.context;
        /** @type {?} */
        var dataIndex = this.extApi.table.ds.renderStart + renderRowIndex;
        /** @type {?} */
        var identity = this.getRowIdentity(dataIndex, viewRef.context);
        /** @type {?} */
        var rowContext = (/** @type {?} */ (context.pblRowContext));
        if (!this.cache.has(identity)) {
            this.cache.set(identity, PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length));
        }
        if (!rowContext) {
            rowContext = context.pblRowContext = new PblRowContext(identity, dataIndex, this.extApi);
            rowContext.updateContext(context);
            viewRef.onDestroy((/**
             * @return {?}
             */
            function () {
                _this.viewCache.delete(renderRowIndex);
                context.pblRowContext = undefined;
            }));
        }
        else if (rowContext.identity !== identity) {
            // save old state before applying new state
            this.cache.set(rowContext.identity, rowContext.getState());
            rowContext.updateContext(context);
            // We
            /** @type {?} */
            var gap = dataIndex - rowContext.dataIndex;
            if (gap > 0) {
                /** @type {?} */
                var siblingViewRef = this.findViewRef(renderRowIndex + gap);
                /** @type {?} */
                var siblingRowContext = siblingViewRef && (/** @type {?} */ (siblingViewRef.context.pblRowContext));
                if (siblingRowContext) {
                    this.cache.set(siblingRowContext.identity, siblingRowContext.getState());
                }
            }
        }
        else {
            return rowContext;
        }
        rowContext.fromState(this.cache.get(identity));
        return rowContext;
    };
    /**
     * @private
     * @return {?}
     */
    ContextApi.prototype.getViewRect = /**
     * @private
     * @return {?}
     */
    function () {
        return this.extApi.table.viewport.elementRef.nativeElement.getBoundingClientRect();
    };
    /**
     * @private
     * @param {?} curr
     * @return {?}
     */
    ContextApi.prototype.emitFocusChanged = /**
     * @private
     * @param {?} curr
     * @return {?}
     */
    function (curr) {
        this.focusChanged$.next({
            prev: this.focusChanged$.value.curr,
            curr: curr,
        });
    };
    /**
     * @private
     * @return {?}
     */
    ContextApi.prototype.destroy = /**
     * @private
     * @return {?}
     */
    function () {
        this.focusChanged$.complete();
        this.selectionChanged$.complete();
    };
    return ContextApi;
}());
/**
 * @template T
 */
export { ContextApi };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.viewCache;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.vcRef;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.columnApi;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.activeFocused;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.activeSelected;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.focusChanged$;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.selectionChanged$;
    /**
     * Notify when the focus has changed.
     *
     * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
     * @type {?}
     */
    ContextApi.prototype.focusChanged;
    /**
     * Notify when the selected cells has changed.
     * @type {?}
     */
    ContextApi.prototype.selectionChanged;
    /**
     * @type {?}
     * @private
     */
    ContextApi.prototype.extApi;
}
/**
 * @param {?} viewRef
 * @param {?} viewPortRect
 * @param {?=} location
 * @return {?}
 */
function processOutOfView(viewRef, viewPortRect, location) {
    /** @type {?} */
    var el = viewRef.rootNodes[0];
    /** @type {?} */
    var rowContext = viewRef.context.pblRowContext;
    /** @type {?} */
    var elRect = el.getBoundingClientRect();
    /** @type {?} */
    var isInsideOfView;
    switch (location) {
        case 'top':
            isInsideOfView = elRect.bottom >= viewPortRect.top;
            break;
        case 'bottom':
            isInsideOfView = elRect.top <= viewPortRect.bottom;
            break;
        default:
            isInsideOfView = (elRect.bottom >= viewPortRect.top && elRect.top <= viewPortRect.bottom);
            break;
    }
    if (isInsideOfView) {
        if (!rowContext.outOfView) {
            return false;
        }
        rowContext.outOfView = false;
    }
    else {
        rowContext.outOfView = true;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb250ZXh0L2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLbkUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWNoRCxPQUFPLEVBQXlCLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQUV4Qzs7OztJQWlERSxvQkFBb0IsTUFBK0I7UUFBbkQsaUJBZ0hDO1FBaEhtQixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQWhEM0MsY0FBUyxHQUFHLElBQUksR0FBRyxFQUE0QixDQUFDO1FBQ2hELFVBQUssR0FBRyxJQUFJLEdBQUcsRUFBMkIsQ0FBQztRQUszQyxtQkFBYyxHQUFvQixFQUFFLENBQUM7UUFDckMsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBNEIsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3JHLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFpQyxDQUFDOzs7Ozs7UUFPaEUsaUJBQVksR0FBMEMsSUFBSSxDQUFDLGFBQWE7YUFDOUUsSUFBSSxDQUNILE1BQU0sQ0FBNEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQzFGLEdBQUc7Ozs7UUFBRSxV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LEtBQUssQ0FBQztLQUM5QjtTQUFNO1FBQ0wsVUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7S0FDN0I7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIE9ic2VydmFibGUsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgYnVmZmVyLCBtYXAsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiwgRW1iZWRkZWRWaWV3UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgcmVtb3ZlRnJvbUFycmF5IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7XG4gIFJvd0NvbnRleHRTdGF0ZSxcbiAgQ2VsbENvbnRleHRTdGF0ZSxcbiAgUGJsTmdyaWRDZWxsQ29udGV4dCxcbiAgUGJsTmdyaWRSb3dDb250ZXh0LFxuICBDZWxsUmVmZXJlbmNlLFxuICBHcmlkRGF0YVBvaW50LFxuICBQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50LFxuICBQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IENvbHVtbkFwaSB9IGZyb20gJy4uL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgZmluZENlbGxSZW5kZXJlZEluZGV4LCBmaW5kUm93UmVuZGVyZWRJbmRleCwgcmVzb2x2ZUNlbGxSZWZlcmVuY2UgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0QXBpPFQgPSBhbnk+IHtcbiAgcHJpdmF0ZSB2aWV3Q2FjaGUgPSBuZXcgTWFwPG51bWJlciwgUGJsUm93Q29udGV4dDxUPj4oKTtcbiAgcHJpdmF0ZSBjYWNoZSA9IG5ldyBNYXA8YW55LCBSb3dDb250ZXh0U3RhdGU8VD4+KCk7XG4gIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG4gIHByaXZhdGUgY29sdW1uQXBpOiBDb2x1bW5BcGk8VD47XG5cbiAgcHJpdmF0ZSBhY3RpdmVGb2N1c2VkOiBHcmlkRGF0YVBvaW50O1xuICBwcml2YXRlIGFjdGl2ZVNlbGVjdGVkOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcbiAgcHJpdmF0ZSBmb2N1c0NoYW5nZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50Pih7IHByZXY6IHVuZGVmaW5lZCwgY3VycjogdW5kZWZpbmVkIH0pO1xuICBwcml2YXRlIHNlbGVjdGlvbkNoYW5nZWQkID0gbmV3IFN1YmplY3Q8UGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBmb2N1cyBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhlIG5vdGlmaWNhdGlvbiBpcyBub3QgaW1tZWRpYXRlLCBpdCB3aWxsIG9jY3VyIG9uIHRoZSBjbG9zZXN0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNoYW5nZS5cbiAgICovXG4gIHJlYWRvbmx5IGZvY3VzQ2hhbmdlZDogT2JzZXJ2YWJsZTxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50PiA9IHRoaXMuZm9jdXNDaGFuZ2VkJFxuICAgIC5waXBlKFxuICAgICAgYnVmZmVyPFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQ+KHRoaXMuZm9jdXNDaGFuZ2VkJC5waXBlKGRlYm91bmNlVGltZSgwLCBhc2FwU2NoZWR1bGVyKSkpLFxuICAgICAgbWFwKCBldmVudHMgPT4gKHsgcHJldjogZXZlbnRzWzBdLnByZXYsIGN1cnI6IGV2ZW50c1tldmVudHMubGVuZ3RoIC0gMV0uY3VyciB9KSApXG4gICAgKTtcblxuICAvKipcbiAgICogTm90aWZ5IHdoZW4gdGhlIHNlbGVjdGVkIGNlbGxzIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlZDogT2JzZXJ2YWJsZTxQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudD4gPSB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgY29udGV4dC5cbiAgICogWW91IGNhbiByZXRyaWV2ZSB0aGUgYWN0dWFsIGNvbnRleHQgb3IgY29udGV4dCBjZWxsIHVzaW5nIGBmaW5kUm93SW5WaWV3YCBhbmQgLyBvciBgZmluZFJvd0luQ2FjaGVgLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgZG9lcyBub3QgaGF2ZSB0byBleGlzdCBpbiB0aGUgdmlldy5cbiAgICogSWYgdGhpcyBpcyB0aGUgY2FzZSBgZmluZFJvd0luVmlld2Agd2lsbCByZXR1cm4gdW5kZWZpbmVkLCB1c2UgYGZpbmRSb3dJbkNhY2hlYCBpbnN0ZWFkLlxuICAgKi9cbiAgZ2V0IGZvY3VzZWRDZWxsKCk6IEdyaWREYXRhUG9pbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUZvY3VzZWQgPyB7Li4udGhpcy5hY3RpdmVGb2N1c2VkIH0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgc2VsZWN0ZWQgcmFuZ2Ugb2YgY2VsbCdzIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMgZG9lcyBub3QgaGF2ZSB0byBleGlzdCBpbiB0aGUgdmlldy5cbiAgICogSWYgdGhpcyBpcyB0aGUgY2FzZSBgZmluZFJvd0luVmlld2Agd2lsbCByZXR1cm4gdW5kZWZpbmVkLCB1c2UgYGZpbmRSb3dJbkNhY2hlYCBpbnN0ZWFkLlxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkQ2VsbHMoKTogR3JpZERhdGFQb2ludFtdIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVTZWxlY3RlZC5zbGljZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgdGhpcy52Y1JlZiA9IGV4dEFwaS5jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgdGhpcy5jb2x1bW5BcGkgPSBleHRBcGkudGFibGUuY29sdW1uQXBpO1xuXG4gICAgZXh0QXBpLmV2ZW50c1xuICAgICAgLnBpcGUoIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvbkRlc3Ryb3knICkgKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiB0aGlzLmRlc3Ryb3koKSApO1xuXG4gICAgY29uc3QgdXBkYXRlQ29udGV4dCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXdQb3J0UmVjdCA9IHRoaXMuZ2V0Vmlld1JlY3QoKTtcbiAgICAgIGNvbnN0IGxhc3RWaWV3ID0gbmV3IFNldChBcnJheS5mcm9tKHRoaXMudmlld0NhY2hlLnZhbHVlcygpKS5tYXAoIHYgPT4gdi5pZGVudGl0eSApKTtcbiAgICAgIGNvbnN0IHVubWF0Y2hlZFJlZnMgPSBuZXcgTWFwPFQsIFtudW1iZXIsIG51bWJlcl0+KCk7XG5cbiAgICAgIGxldCBrZWVwUHJvY2Vzc091dE9mVmlldyA9ICEhdmlld1BvcnRSZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMudmNSZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuZmluZFZpZXdSZWYoaSk7XG4gICAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dDb250ZXh0KHZpZXdSZWYsIGkpO1xuICAgICAgICB0aGlzLnZpZXdDYWNoZS5zZXQoaSwgcm93Q29udGV4dCk7XG4gICAgICAgIGxhc3RWaWV3LmRlbGV0ZShyb3dDb250ZXh0LmlkZW50aXR5KTtcblxuICAgICAgICAvLyBJZGVudGl0eSBkaWQgbm90IGNoYW5nZSBidXQgY29udGV4dCBkaWQgY2hhbmdlXG4gICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgZHVlIHRvIHRyYWNrQnkgd2l0aCBpbmRleCByZWZlcmVuY2Ugb3IgdGhhdCBtYXRjaGVkIGRhdGEgb24gc29tZSBwcm9wZXJ0eSBidXQgdGhlIGFjdHVhbCBkYXRhIHJlZmVyZW5jZSBjaGFuZ2VkLlxuICAgICAgICAvLyBXZSBsb2cgdGhlc2UgYW5kIGhhbmRsZSB0aGVtIGxhdGVyLCB0aGV5IGNvbWUgaW4gcGFpciBhbmQgd2UgbmVlZCB0byBzd2l0Y2ggdGhlIGNvbnRleHQgYmV0d2VlbiB0aGUgdmFsdWVzIGluIHRoZSBwYWlyLlxuXG4gICAgICAgIC8vIFRoZSBwYWlyIGlzIGEgMiBpdGVtIHR1cGxlIC0gMXN0IGl0ZW0gaXMgbmV3IGluZGV4LCAybmQgaXRlbSBpcyB0aGUgb2xkIGluZGV4LlxuICAgICAgICAvLyBXZSBidWlsZCB0aGUgcGFpcnMsIGVhY2ggcGFpciBpcyBhIHN3aXRjaFxuICAgICAgICBpZiAodmlld1JlZi5jb250ZXh0LiRpbXBsaWNpdCAhPT0gcm93Q29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBsZXQgcGFpciA9IHVubWF0Y2hlZFJlZnMuZ2V0KHJvd0NvbnRleHQuJGltcGxpY2l0KSB8fCBbLTEsIC0xXTtcbiAgICAgICAgICBwYWlyWzFdID0gaTtcbiAgICAgICAgICB1bm1hdGNoZWRSZWZzLnNldChyb3dDb250ZXh0LiRpbXBsaWNpdCwgcGFpcik7XG5cbiAgICAgICAgICBwYWlyID0gdW5tYXRjaGVkUmVmcy5nZXQodmlld1JlZi5jb250ZXh0LiRpbXBsaWNpdCkgfHwgWy0xLCAtMV07XG4gICAgICAgICAgcGFpclswXSA9IGk7XG4gICAgICAgICAgdW5tYXRjaGVkUmVmcy5zZXQodmlld1JlZi5jb250ZXh0LiRpbXBsaWNpdCwgcGFpcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2VlcFByb2Nlc3NPdXRPZlZpZXcpIHtcbiAgICAgICAgICBrZWVwUHJvY2Vzc091dE9mVmlldyA9IHByb2Nlc3NPdXRPZlZpZXcodmlld1JlZiwgdmlld1BvcnRSZWN0LCAndG9wJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHVubWF0Y2hlZFJlZnMuc2l6ZSA+IDApIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBwYWlycyBidXQgd2UgY2FuJ3QganVzdCBzdGFydCBzd2l0Y2hpbmcgYmVjYXVzZSB3aGVuIHRoZSBpdGVtcyBtb3ZlIG9yIHN3YXAgd2UgbmVlZFxuICAgICAgICAvLyB0byB1cGRhdGUgdGhlaXIgdmFsdWVzIGFuZCBzbyB3ZSBuZWVkIHRvIGNhY2hlIG9uZSBvZiB0aGVtLlxuICAgICAgICAvLyBUaGUgb3BlcmF0aW9uIHdpbGwgZWZmZWN0IGFsbCBpdGVtcyAoTikgYmV0d2VlbiB0aGVuIG9yaWdpbiBhbmQgZGVzdGluYXRpb24uXG4gICAgICAgIC8vIFdoZW4gTiA9PT0gMiBpdHMgYSBzd2FwLCB3aGVuIE4gPiAyIGl0cyBhIG1vdmUuXG4gICAgICAgIC8vIEluIGJvdGggY2FzZXMgdGhlIGZpcnN0IGFuZCBsYXN0IG9wZXJhdGlvbnMgc2hhcmUgdGhlIHNhbWUgb2JqZWN0LlxuICAgICAgICAvLyBBbHNvLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBvcmRlciBvZiBvcGVyYXRpb25zIGRvZXMgbm90IHVzZSB0aGUgc2FtZSByb3cgYXMgdGhlIHNvdXJjZSBtb3JlIHRoZW4gb25jZS5cbiAgICAgICAgLy8gRm9yIGV4YW1wbGUsIElmIEkgY29weSByb3cgNSB0byB0byByb3cgNCBhbmQgdGhlbiA0IHRvIDMgSSBuZWVkIHRvIHN0YXJ0IGZyb20gMy0+NC0+NSwgaWYgSSBkbyA1LT40LT4zIEkgd2lsbCBnZXQgNSBpbiBhbGwgcm93cy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gV2UgdXNlIHRoZSBzb3VyY2UgKHBhaXJbMV0pIGZvciBzb3J0aW5nLCB0aGUgc29ydCBvcmRlciBkZXBlbmRzIG9uIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG1vdmUgKHVwL2Rvd24pLlxuICAgICAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKHVubWF0Y2hlZFJlZnMuZW50cmllcygpKS5maWx0ZXIoIGVudHJ5ID0+IHtcbiAgICAgICAgICBjb25zdCBwYWlyID0gZW50cnlbMV07XG4gICAgICAgICAgaWYgKHBhaXJbMF0gPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYWlyWzFdID09PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdG8gPSB0aGlzLnZpZXdDYWNoZS5nZXQocGFpclswXSk7XG4gICAgICAgICAgICB0by4kaW1wbGljaXQgPSBlbnRyeVswXTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pLm1hcCggZW50cnkgPT4gZW50cnlbMV0gKTtcblxuICAgICAgICB1bm1hdGNoZWRSZWZzLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBzb3J0Rm4gPSBhcnJbYXJyLmxlbmd0aCAtIDFdWzBdIC0gYXJyW2Fyci5sZW5ndGggLSAxXVsxXSA+IDAgLy8gY2hlY2sgc29ydCBkaXJlY3Rpb25cbiAgICAgICAgICAgID8gKGEsYikgPT4gYlsxXSAtIGFbMV1cbiAgICAgICAgICAgIDogKGEsYikgPT4gYVsxXSAtIGJbMV1cbiAgICAgICAgICA7XG4gICAgICAgICAgYXJyLnNvcnQoc29ydEZuKTtcblxuICAgICAgICAgIGNvbnN0IGxhc3RPcCA9IHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMudmlld0NhY2hlLmdldChhcnJbMF1bMF0pLiRpbXBsaWNpdCxcbiAgICAgICAgICAgIHN0YXRlOiB0aGlzLnZpZXdDYWNoZS5nZXQoYXJyWzBdWzBdKS5nZXRTdGF0ZSgpLFxuICAgICAgICAgICAgcGFpcjogYXJyLnBvcCgpLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgYXJyKSB7XG4gICAgICAgICAgICAvLyBXaGF0IHdlJ3JlIGRvaW5nIGhlcmUgaXMgc3dpdGNoaW5nIHRoZSBjb250ZXh0IHdyYXBwZWQgYnkgYFJvdENvbnRleHRgIHdoaWxlIHRoZSBgUm93Q29udGV4dGAgcHJlc2VydmUgaXQncyBpZGVudGl0eS5cbiAgICAgICAgICAgIC8vIEVhY2ggcm93IGNvbnRleHQgaGFzIGEgc3RhdGUsIHdoaWNoIGlzIHZhbGlkIGZvciBpdCdzIGN1cnJlbnQgY29udGV4dCwgaWYgd2Ugc3dpdGNoIGNvbnRleHQgd2UgbXVzdCBzd2l0Y2ggc3RhdGUgYXMgd2VsbCBhbmQgYWxzb1xuICAgICAgICAgICAgLy8gY2FjaGUgaXQuXG4gICAgICAgICAgICBjb25zdCB0byA9IHRoaXMudmlld0NhY2hlLmdldChwYWlyWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLnZpZXdDYWNoZS5nZXQocGFpclsxXSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGZyb20uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHN0YXRlLmlkZW50aXR5ID0gdG8uaWRlbnRpdHk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCh0by5pZGVudGl0eSwgc3RhdGUpO1xuICAgICAgICAgICAgdG8uZnJvbVN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgIHRvLiRpbXBsaWNpdCA9IGZyb20uJGltcGxpY2l0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy52aWV3Q2FjaGUuZ2V0KGxhc3RPcC5wYWlyWzBdKTtcbiAgICAgICAgICBsYXN0T3Auc3RhdGUuaWRlbnRpdHkgPSB0by5pZGVudGl0eTtcbiAgICAgICAgICB0aGlzLmNhY2hlLnNldCh0by5pZGVudGl0eSwgbGFzdE9wLnN0YXRlKTtcbiAgICAgICAgICB0by5mcm9tU3RhdGUobGFzdE9wLnN0YXRlKTtcbiAgICAgICAgICB0by4kaW1wbGljaXQgPSBsYXN0T3AuZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih2aWV3UG9ydFJlY3QpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMudmNSZWYubGVuZ3RoIC0xOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgIGlmICghcHJvY2Vzc091dE9mVmlldyh0aGlzLmZpbmRWaWV3UmVmKGkpLCB2aWV3UG9ydFJlY3QsICdib3R0b20nKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxhc3RWaWV3LmZvckVhY2goIGlkZW50ID0+IHRoaXMuY2FjaGUuZ2V0KGlkZW50KS5maXJzdFJlbmRlciA9IGZhbHNlICk7XG4gICAgfTtcblxuICAgIHVwZGF0ZUNvbnRleHQoKTtcbiAgICBleHRBcGkuY2RrVGFibGUub25SZW5kZXJSb3dzLnN1YnNjcmliZSh1cGRhdGVDb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyB0aGUgcHJvdmlkZWQgY2VsbC5cbiAgICogSWYgYSBjZWxsIGlzIG5vdCBwcm92aWRlZCB3aWxsIHVuLWZvY3VzIChibHVyKSB0aGUgY3VycmVudGx5IGZvY3VzZWQgY2VsbCAoaWYgdGhlcmUgaXMgb25lKS5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIGZvY3VzQ2VsbChjZWxsUmVmPzogQ2VsbFJlZmVyZW5jZSB8IGJvb2xlYW4sIG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWNlbGxSZWYgfHwgY2VsbFJlZiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlRm9jdXNlZCkge1xuICAgICAgICBjb25zdCB7IHJvd0lkZW50LCBjb2xJbmRleCB9ID0gdGhpcy5hY3RpdmVGb2N1c2VkO1xuICAgICAgICB0aGlzLmFjdGl2ZUZvY3VzZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUocm93SWRlbnQsIGNvbEluZGV4LCB7IGZvY3VzZWQ6IGZhbHNlIH0pO1xuICAgICAgICB0aGlzLmVtaXRGb2N1c0NoYW5nZWQodGhpcy5hY3RpdmVGb2N1c2VkKTtcbiAgICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dJblZpZXcocm93SWRlbnQpO1xuICAgICAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmV4dEFwaS50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCByb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVmID0gcmVzb2x2ZUNlbGxSZWZlcmVuY2UoY2VsbFJlZiwgdGhpcyBhcyBhbnkpO1xuICAgICAgaWYgKHJlZikge1xuICAgICAgICB0aGlzLmZvY3VzQ2VsbChtYXJrRm9yQ2hlY2spO1xuICAgICAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgICAgICBpZiAoIXJlZi5mb2N1c2VkICYmICF0aGlzLmV4dEFwaS50YWJsZS52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyZWYucm93Q29udGV4dC5pZGVudGl0eSwgcmVmLmluZGV4LCB7IGZvY3VzZWQ6IHRydWUgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZCA9IHsgcm93SWRlbnQ6IHJlZi5yb3dDb250ZXh0LmlkZW50aXR5LCBjb2xJbmRleDogcmVmLmluZGV4IH07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2VsbHMoIFsgdGhpcy5hY3RpdmVGb2N1c2VkIF0sIG1hcmtGb3JDaGVjaywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgICAgICAgdGhpcy5leHRBcGkudGFibGUuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgcmVmLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJlZlswXS5pZGVudGl0eSwgcmVmWzFdLCB7IGZvY3VzZWQ6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5hY3RpdmVGb2N1c2VkID0geyByb3dJZGVudDogcmVmWzBdLmlkZW50aXR5LCBjb2xJbmRleDogcmVmWzFdIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0Rm9jdXNDaGFuZ2VkKHRoaXMuYWN0aXZlRm9jdXNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBtYXJrRm9yQ2hlY2sgTWFyayB0aGUgcm93IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIEBwYXJhbSBjbGVhckN1cnJlbnQgQ2xlYXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbmV3IHNlbGVjdGlvbi5cbiAgICogRGVmYXVsdCB0byBmYWxzZSAoYWRkIHRvIGN1cnJlbnQpLlxuICAgKi9cbiAgc2VsZWN0Q2VsbHMoY2VsbFJlZnM6IENlbGxSZWZlcmVuY2VbXSwgbWFya0ZvckNoZWNrPzogYm9vbGVhbiwgY2xlYXJDdXJyZW50PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvTWFya1JlbmRlcmVkID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgICBpZiAoY2xlYXJDdXJyZW50KSB7XG4gICAgICB0aGlzLnVuc2VsZWN0Q2VsbHMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZDogR3JpZERhdGFQb2ludFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNlbGxSZWYgb2YgY2VsbFJlZnMpIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWYsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICBpZiAoIXJlZi5zZWxlY3RlZCAmJiAhdGhpcy5leHRBcGkudGFibGUudmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICBjb25zdCByb3dJZGVudCA9IHJlZi5yb3dDb250ZXh0LmlkZW50aXR5XG4gICAgICAgICAgY29uc3QgY29sSW5kZXggPSByZWYuaW5kZXg7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IHRydWUgfSk7XG5cbiAgICAgICAgICBjb25zdCBkYXRhUG9pbnQgPSB7IHJvd0lkZW50LCBjb2xJbmRleCB9O1xuICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQucHVzaChkYXRhUG9pbnQpO1xuICAgICAgICAgIGFkZGVkLnB1c2goZGF0YVBvaW50KTtcblxuICAgICAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgICAgIHRvTWFya1JlbmRlcmVkLmFkZChyZWYucm93Q29udGV4dC5pbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlZikge1xuICAgICAgICBjb25zdCBbIHJvd1N0YXRlLCBjb2xJbmRleCBdID0gcmVmO1xuICAgICAgICBpZiAoIXJvd1N0YXRlLmNlbGxzW2NvbEluZGV4XS5zZWxlY3RlZCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4LCB7IHNlbGVjdGVkOiB0cnVlIH0pO1xuICAgICAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQucHVzaCggeyByb3dJZGVudDogcm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4IH0gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b01hcmtSZW5kZXJlZC5zaXplID4gMCkge1xuICAgICAgdGhpcy5leHRBcGkudGFibGUuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgLi4uQXJyYXkuZnJvbSh0b01hcmtSZW5kZXJlZC52YWx1ZXMoKSkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCQubmV4dCh7IGFkZGVkLCByZW1vdmVkOiBbXSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIElmIGNlbGxzIGFyZSBub3QgcHJvdmlkZWQgd2lsbCB1bi1zZWxlY3QgYWxsIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxscy5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIHVuc2VsZWN0Q2VsbHMoY2VsbFJlZnM/OiBDZWxsUmVmZXJlbmNlW10gfCBib29sZWFuLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdG9NYXJrUmVuZGVyZWQgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICBsZXQgdG9VbnNlbGVjdDogQ2VsbFJlZmVyZW5jZVtdID0gdGhpcy5hY3RpdmVTZWxlY3RlZDtcbiAgICBsZXQgcmVtb3ZlQWxsID0gdHJ1ZTtcblxuICAgIGlmKEFycmF5LmlzQXJyYXkoY2VsbFJlZnMpKSB7XG4gICAgICB0b1Vuc2VsZWN0ID0gY2VsbFJlZnM7XG4gICAgICByZW1vdmVBbGwgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFya0ZvckNoZWNrID0gISFjZWxsUmVmcztcbiAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQgPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVkOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgY2VsbFJlZiBvZiB0b1Vuc2VsZWN0KSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmLCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgICAgaWYgKHJlZi5zZWxlY3RlZCkge1xuICAgICAgICAgIGNvbnN0IHJvd0lkZW50ID0gcmVmLnJvd0NvbnRleHQuaWRlbnRpdHlcbiAgICAgICAgICBjb25zdCBjb2xJbmRleCA9IHJlZi5pbmRleDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd0lkZW50LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogZmFsc2UgfSk7XG4gICAgICAgICAgaWYgKCFyZW1vdmVBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhc1JlbW92ZWQgPSByZW1vdmVGcm9tQXJyYXkodGhpcy5hY3RpdmVTZWxlY3RlZCwgaXRlbSA9PiBpdGVtLmNvbEluZGV4ID09PSBjb2xJbmRleCAmJiBpdGVtLnJvd0lkZW50ID09PSByb3dJZGVudCk7XG4gICAgICAgICAgICBpZiAod2FzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICByZW1vdmVkLnB1c2goeyByb3dJZGVudCwgY29sSW5kZXggfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICAgICAgdG9NYXJrUmVuZGVyZWQuYWRkKHJlZi5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIGNvbnN0IFsgcm93U3RhdGUsIGNvbEluZGV4IF0gPSByZWY7XG4gICAgICAgIGlmIChyb3dTdGF0ZS5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogZmFsc2UgfSk7XG4gICAgICAgICAgaWYgKCFyZW1vdmVBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhc1JlbW92ZWQgPSByZW1vdmVGcm9tQXJyYXkodGhpcy5hY3RpdmVTZWxlY3RlZCwgaXRlbSA9PiBpdGVtLmNvbEluZGV4ID09PSBjb2xJbmRleCAmJiBpdGVtLnJvd0lkZW50ID09PSByb3dTdGF0ZS5pZGVudGl0eSk7XG4gICAgICAgICAgICBpZiAod2FzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICByZW1vdmVkLnB1c2goeyByb3dJZGVudDogcm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4IH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvTWFya1JlbmRlcmVkLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLmV4dEFwaS50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCAuLi5BcnJheS5mcm9tKHRvTWFya1JlbmRlcmVkLnZhbHVlcygpKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkJC5uZXh0KHsgYWRkZWQ6IFtdLCByZW1vdmVkIH0pO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMudmNSZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLmZpbmRWaWV3UmVmKGkpO1xuICAgICAgdmlld1JlZi5jb250ZXh0LnBibFJvd0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMudmlld0NhY2hlLmNsZWFyKCk7XG4gICAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICB9XG5cbiAgZ2V0Um93KHJvdzogbnVtYmVyIHwgSFRNTEVsZW1lbnQpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGluZGV4ID0gdHlwZW9mIHJvdyA9PT0gJ251bWJlcicgPyByb3cgOiBmaW5kUm93UmVuZGVyZWRJbmRleChyb3cpO1xuICAgIHJldHVybiB0aGlzLnJvd0NvbnRleHQoaW5kZXgpO1xuICB9XG5cbiAgZ2V0Q2VsbChjZWxsOiBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNlbGwgY29udGV4dCBmb3IgdGhlIGNlbGwgYXQgdGhlIHBvaW50IHNwZWNpZmllZFxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2xcbiAgICovXG4gIGdldENlbGwocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogUGJsTmdyaWRDZWxsQ29udGV4dCB8IHVuZGVmaW5lZDtcbiAgZ2V0Q2VsbChyb3dPckNlbGxFbGVtZW50OiBudW1iZXIgfCBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQsIGNvbD86IG51bWJlcik6IFBibE5ncmlkQ2VsbENvbnRleHQgfCB1bmRlZmluZWQge1xuICAgIGlmICh0eXBlb2Ygcm93T3JDZWxsRWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnJvd0NvbnRleHQocm93T3JDZWxsRWxlbWVudCk7XG4gICAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKHJvd09yQ2VsbEVsZW1lbnQsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJdGVtKGNlbGw6IENlbGxSZWZlcmVuY2UpOiBhbnkge1xuICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGwsIHRoaXMgYXMgYW55KTtcbiAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgIHJldHVybiByZWYuY29sLmdldFZhbHVlKHJlZi5yb3dDb250ZXh0LiRpbXBsaWNpdCk7XG4gICAgfSBlbHNlIGlmIChyZWYpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZXh0QXBpLnRhYmxlLmRzLnNvdXJjZVtyZWZbMF0uZGF0YUluZGV4XTtcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZXh0QXBpLnRhYmxlLmNvbHVtbkFwaS5maW5kQ29sdW1uQXQocmVmWzFdKTtcbiAgICAgIHJldHVybiBjb2x1bW4uZ2V0VmFsdWUocm93KTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDZWxsQ29udGV4dChyZW5kZXJSb3dJbmRleDogbnVtYmVyLCBjb2x1bW46IFBibENvbHVtbik6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5yb3dDb250ZXh0KHJlbmRlclJvd0luZGV4KTtcbiAgICBjb25zdCBjb2xJbmRleCA9IHRoaXMuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbEluZGV4KTtcbiAgfVxuXG4gIHJvd0NvbnRleHQocmVuZGVyUm93SW5kZXg6IG51bWJlcik6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICB9XG5cbiAgdXBkYXRlT3V0T2ZWaWV3U3RhdGUocm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXdQb3J0UmVjdCA9IHRoaXMuZ2V0Vmlld1JlY3QoKTtcbiAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5maW5kVmlld1JlZihyb3dDb250ZXh0LmluZGV4KTtcbiAgICBwcm9jZXNzT3V0T2ZWaWV3KHZpZXdSZWYsIHZpZXdQb3J0UmVjdCk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZShyb3dJZGVudGl0eTogYW55LCBjb2x1bW5JbmRleDogbnVtYmVyLCBjZWxsU3RhdGU6IFBhcnRpYWw8Q2VsbENvbnRleHRTdGF0ZTxUPj4pOiB2b2lkO1xuICB1cGRhdGVTdGF0ZShyb3dJZGVudGl0eTogYW55LCByb3dTdGF0ZTogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+KTogdm9pZDtcbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgcm93U3RhdGVPckNlbGxJbmRleDogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+IHwgbnVtYmVyLCBjZWxsU3RhdGU/OiBQYXJ0aWFsPENlbGxDb250ZXh0U3RhdGU8VD4+KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChjdXJyZW50Um93U3RhdGUpIHtcbiAgICAgIGlmICh0eXBlb2Ygcm93U3RhdGVPckNlbGxJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENlbGxTdGF0ZSA9IGN1cnJlbnRSb3dTdGF0ZS5jZWxsc1tyb3dTdGF0ZU9yQ2VsbEluZGV4XTtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsU3RhdGUpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRDZWxsU3RhdGUsIGNlbGxTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFJvd1N0YXRlLCByb3dTdGF0ZU9yQ2VsbEluZGV4KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dJblZpZXcocm93SWRlbnRpdHkpO1xuICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgcm93Q29udGV4dC5mcm9tU3RhdGUoY3VycmVudFJvd1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3csIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqIElmIHRoZSByb3cgaXMgbm90IGluIHRoZSB2aWV3IChvciBldmVuIG5vdCBpbiB0aGUgY2FjaGUpIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIHJvdydzIGNvbnRleHQgaW5zdGFuY2UgKGBQYmxSb3dDb250ZXh0YClcbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJblZpZXcocm93SWRlbnRpdHk6IGFueSk6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChyb3dTdGF0ZSkge1xuICAgICAgY29uc3QgcmVuZGVyUm93SW5kZXggPSByb3dTdGF0ZS5kYXRhSW5kZXggLSB0aGlzLmV4dEFwaS50YWJsZS5kcy5yZW5kZXJTdGFydDtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICAgICAgaWYgKHJvd0NvbnRleHQgJiYgcm93Q29udGV4dC5pZGVudGl0eSA9PT0gcm93SWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHJvd0NvbnRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnkpOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY29udGV4dCBjYWNoZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWNoZSBkb2VzIG5vdCBob2xkIHRoZSBjb250ZXh0IGl0c2VsZiBidXQgb25seSB0aGUgc3RhdGUgdGhhdCBjYW4gbGF0ZXIgYmUgdXNlZCB0byByZXRyaWV2ZSBhIGNvbnRleHQgaW5zdGFuY2UuIFRoZSBjb250ZXh0IGluc3RhbmNlXG4gICAqIGlzIG9ubHkgdXNlZCBhcyBjb250ZXh0IGZvciByb3dzIGluIHZpZXcuXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqIEBwYXJhbSBvZmZzZXQgV2hlbiBzZXQsIHJldHVybnMgdGhlIHJvdyBhdCB0aGUgb2Zmc2V0IGZyb20gdGhlIHJvdyB3aXRoIHRoZSBwcm92aWRlZCByb3cgaWRlbnRpdHkuIENhbiBiZSBhbnkgbnVtZXJpYyB2YWx1ZSAoZS5nIDUsIC02LCA0KS5cbiAgICogQHBhcmFtIGNyZWF0ZSBXaGV0aGVyIHRvIGNyZWF0ZSBhIG5ldyBzdGF0ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldDogbnVtYmVyLCBjcmVhdGU6IGJvb2xlYW4pOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldD86IG51bWJlciwgY3JlYXRlPzogYm9vbGVhbik6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgcm93U3RhdGUgPSB0aGlzLmNhY2hlLmdldChyb3dJZGVudGl0eSk7XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgcmV0dXJuIHJvd1N0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRhSW5kZXggPSByb3dTdGF0ZS5kYXRhSW5kZXggKyBvZmZzZXQ7XG4gICAgICBjb25zdCBpZGVudGl0eSA9IHRoaXMuZ2V0Um93SWRlbnRpdHkoZGF0YUluZGV4KTtcbiAgICAgIGlmIChpZGVudGl0eSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5maW5kUm93SW5DYWNoZShpZGVudGl0eSk7XG4gICAgICAgIGlmICghcmVzdWx0ICYmIGNyZWF0ZSAmJiBkYXRhSW5kZXggPCB0aGlzLmV4dEFwaS50YWJsZS5kcy5sZW5ndGgpIHtcbiAgICAgICAgICByZXN1bHQgPSBQYmxSb3dDb250ZXh0LmRlZmF1bHRTdGF0ZShpZGVudGl0eSwgZGF0YUluZGV4LCB0aGlzLmNvbHVtbkFwaS5jb2x1bW5zLmxlbmd0aCk7XG4gICAgICAgICAgdGhpcy5jYWNoZS5zZXQoaWRlbnRpdHksIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRSb3dJZGVudGl0eShkYXRhSW5kZXg6IG51bWJlciwgY29udGV4dD86IFJvd0NvbnRleHQ8YW55Pik6IHN0cmluZyB8IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IHsgZHMgfSA9IHRoaXMuZXh0QXBpLnRhYmxlO1xuICAgIGNvbnN0IHsgcHJpbWFyeSB9ID0gdGhpcy5leHRBcGkuY29sdW1uU3RvcmU7XG5cbiAgICBjb25zdCByb3cgPSBjb250ZXh0ID8gY29udGV4dC4kaW1wbGljaXQgOiBkcy5zb3VyY2VbZGF0YUluZGV4XTtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcmltYXJ5ID8gcHJpbWFyeS5nZXRWYWx1ZShyb3cpIDogZGF0YUluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZFZpZXdSZWYoaW5kZXg6IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMudmNSZWYuZ2V0KGluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj47XG4gIH1cblxuICAvKipcbiAgICogRmluZC9VcGRhdGUvQ3JlYXRlIHRoZSBgUm93Q29udGV4dGAgZm9yIHRoZSBwcm92aWRlZCBgRW1iZWRkZWRWaWV3UmVmYCBhdCB0aGUgcHJvdmlkZWQgcmVuZGVyIHBvc2l0aW9uLlxuICAgKlxuICAgKiBBIGBSb3dDb250ZXh0YCBvYmplY3QgaXMgYSB3cmFwcGVyIGZvciB0aGUgaW50ZXJuYWwgY29udGV4dCBvZiBhIHJvdyBpbiBgQ2RrVGFibGVgIHdpdGggdGhlIHB1cnBvc2Ugb2ZcbiAgICogZXh0ZW5kaW5nIGl0IGZvciB0aGUgdGFibGUgZmVhdHVyZXMuXG4gICAqXG4gICAqIFRoZSBwcm9jZXNzIGhhcyAyIGxheWVycyBvZiBjYWNoZTpcbiAgICpcbiAgICogLSBgUm93Q29udGV4dGAgb2JqZWN0cyBhcmUgc3RvcmVkIGluIGEgdmlldyBjYWNoZSB3aGljaCBpcyBzeW5jZWQgd2l0aCB0aGUgYENka1RhYmxlYCByb3cgb3V0bGV0IHZpZXdSZWZzLlxuICAgKiBFYWNoIHZpZXcgcmVmIChyb3cpIGhhcyBhIG1hdGNoaW5nIHJlY29yZCBpbiB0aGUgYFJvd0NvbnRleHRgIHZpZXcgY2FjaGUuXG4gICAqXG4gICAqIC0gYFJvd0NvbnRleHRTdGF0ZWAgb2JqZWN0IGFyZSBzdG9yZWQgaW4gYSBjYWNoZSB3aGljaCBpcyBzeW5jZWQgd2l0aCB0aGUgaXRlbXMgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKiBFYWNoIGl0ZW0gaW4gdGhlIGRhdGFzb3VyY2UgaGFzIGEgbWF0Y2hpbmcgcm93IGBSb3dDb250ZXh0U3RhdGVgIGl0ZW0gKGxhenkpLCB3aGljaCBpcyB1c2VkIHRvIHBlcnNpc3QgY29udGV4dFxuICAgKiB3aGVuIGBSb3dDb250ZXh0YCBnb2VzIGluL291dCBvZiB0aGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEBwYXJhbSB2aWV3UmVmIFRoZSBgRW1iZWRkZWRWaWV3UmVmYCBob2xkaW5nIHRoZSBjb250ZXh0IHRoYXQgdGhlIHJldHVybmVkIGBSb3dDb250ZXh0YCBzaG91bGQgd3JhcFxuICAgKiBAcGFyYW0gcmVuZGVyUm93SW5kZXggVGhlIHBvc2l0aW9uIG9mIHRoZSB2aWV3LCByZWxhdGl2ZSB0byBvdGhlciByb3dzLlxuICAgKiBUaGUgcG9zaXRpb24gaXMgcmVxdWlyZWQgZm9yIGNhY2hpbmcgdGhlIGNvbnRleHQgc3RhdGUgd2hlbiBhIHNwZWNpZmljIHJvdyBpcyB0aHJvd24gb3V0IG9mIHRoZSB2aWV3cG9ydCAodmlydHVhbCBzY3JvbGwpLlxuICAgKiBFYWNoIGBSb3dDb250ZXh0YCBnZXRzIGEgdW5pcXVlIGlkZW50aXR5IHVzaW5nIHRoZSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgY3VycmVudCByZW5kZXIgcmFuZ2UgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBmaW5kUm93Q29udGV4dCh2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj4sIHJlbmRlclJvd0luZGV4OiBudW1iZXIpOiBQYmxSb3dDb250ZXh0PFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB7IGNvbnRleHQgfSA9IHZpZXdSZWY7XG4gICAgY29uc3QgZGF0YUluZGV4ID0gdGhpcy5leHRBcGkudGFibGUuZHMucmVuZGVyU3RhcnQgKyByZW5kZXJSb3dJbmRleDtcbiAgICBjb25zdCBpZGVudGl0eSA9IHRoaXMuZ2V0Um93SWRlbnRpdHkoZGF0YUluZGV4LCB2aWV3UmVmLmNvbnRleHQpO1xuXG4gICAgbGV0IHJvd0NvbnRleHQgPSBjb250ZXh0LnBibFJvd0NvbnRleHQgYXMgUGJsUm93Q29udGV4dDxUPjtcblxuICAgIGlmICghdGhpcy5jYWNoZS5oYXMoaWRlbnRpdHkpKSB7XG4gICAgICB0aGlzLmNhY2hlLnNldChpZGVudGl0eSwgUGJsUm93Q29udGV4dC5kZWZhdWx0U3RhdGUoaWRlbnRpdHksIGRhdGFJbmRleCwgdGhpcy5jb2x1bW5BcGkuY29sdW1ucy5sZW5ndGgpKTtcbiAgICB9XG5cbiAgICBpZiAoIXJvd0NvbnRleHQpIHtcbiAgICAgIHJvd0NvbnRleHQgPSBjb250ZXh0LnBibFJvd0NvbnRleHQgPSBuZXcgUGJsUm93Q29udGV4dDxUPihpZGVudGl0eSwgZGF0YUluZGV4LCB0aGlzLmV4dEFwaSk7XG4gICAgICByb3dDb250ZXh0LnVwZGF0ZUNvbnRleHQoY29udGV4dCk7XG5cbiAgICAgIHZpZXdSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgICAgdGhpcy52aWV3Q2FjaGUuZGVsZXRlKHJlbmRlclJvd0luZGV4KTtcbiAgICAgICAgY29udGV4dC5wYmxSb3dDb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG5cbiAgICB9IGVsc2UgaWYgKHJvd0NvbnRleHQuaWRlbnRpdHkgIT09IGlkZW50aXR5KSB7XG4gICAgICAvLyBzYXZlIG9sZCBzdGF0ZSBiZWZvcmUgYXBwbHlpbmcgbmV3IHN0YXRlXG4gICAgICB0aGlzLmNhY2hlLnNldChyb3dDb250ZXh0LmlkZW50aXR5LCByb3dDb250ZXh0LmdldFN0YXRlKCkpO1xuICAgICAgcm93Q29udGV4dC51cGRhdGVDb250ZXh0KGNvbnRleHQpO1xuXG4gICAgICAvLyBXZVxuICAgICAgY29uc3QgZ2FwID0gZGF0YUluZGV4IC0gcm93Q29udGV4dC5kYXRhSW5kZXg7XG4gICAgICBpZiAoZ2FwID4gMCkge1xuICAgICAgICBjb25zdCBzaWJsaW5nVmlld1JlZiA9IHRoaXMuZmluZFZpZXdSZWYocmVuZGVyUm93SW5kZXggKyBnYXApO1xuICAgICAgICBjb25zdCBzaWJsaW5nUm93Q29udGV4dCA9IHNpYmxpbmdWaWV3UmVmICYmIHNpYmxpbmdWaWV3UmVmLmNvbnRleHQucGJsUm93Q29udGV4dCBhcyBQYmxSb3dDb250ZXh0PFQ+O1xuICAgICAgICBpZiAoc2libGluZ1Jvd0NvbnRleHQpIHtcbiAgICAgICAgICB0aGlzLmNhY2hlLnNldChzaWJsaW5nUm93Q29udGV4dC5pZGVudGl0eSwgc2libGluZ1Jvd0NvbnRleHQuZ2V0U3RhdGUoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJvd0NvbnRleHQ7XG4gICAgfVxuICAgIHJvd0NvbnRleHQuZnJvbVN0YXRlKHRoaXMuY2FjaGUuZ2V0KGlkZW50aXR5KSk7XG5cbiAgICByZXR1cm4gcm93Q29udGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Vmlld1JlY3QoKTogQ2xpZW50UmVjdCB8IERPTVJlY3Qge1xuICAgIHJldHVybiB0aGlzLmV4dEFwaS50YWJsZS52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRGb2N1c0NoYW5nZWQoY3VycjogUGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudFsnY3VyciddKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c0NoYW5nZWQkLm5leHQoe1xuICAgICAgcHJldjogdGhpcy5mb2N1c0NoYW5nZWQkLnZhbHVlLmN1cnIsXG4gICAgICBjdXJyLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNDaGFuZ2VkJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCQuY29tcGxldGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzT3V0T2ZWaWV3KHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PGFueT4+LCB2aWV3UG9ydFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0LCBsb2NhdGlvbj86ICd0b3AnIHwgJ2JvdHRvbScpOiBib29sZWFuIHtcbiAgY29uc3QgZWw6IEhUTUxFbGVtZW50ID0gdmlld1JlZi5yb290Tm9kZXNbMF07XG4gIGNvbnN0IHJvd0NvbnRleHQgPSB2aWV3UmVmLmNvbnRleHQucGJsUm93Q29udGV4dDtcbiAgY29uc3QgZWxSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgbGV0IGlzSW5zaWRlT2ZWaWV3OiBib29sZWFuO1xuICBzd2l0Y2ggKGxvY2F0aW9uKXtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgaXNJbnNpZGVPZlZpZXcgPSBlbFJlY3QuYm90dG9tID49IHZpZXdQb3J0UmVjdC50b3A7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgaXNJbnNpZGVPZlZpZXcgPSBlbFJlY3QudG9wIDw9IHZpZXdQb3J0UmVjdC5ib3R0b207XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaXNJbnNpZGVPZlZpZXcgPSAoZWxSZWN0LmJvdHRvbSA+PSB2aWV3UG9ydFJlY3QudG9wICYmIGVsUmVjdC50b3AgPD0gdmlld1BvcnRSZWN0LmJvdHRvbSlcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKGlzSW5zaWRlT2ZWaWV3KSB7XG4gICAgaWYgKCFyb3dDb250ZXh0Lm91dE9mVmlldykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByb3dDb250ZXh0Lm91dE9mVmlldyA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJvd0NvbnRleHQub3V0T2ZWaWV3ID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdfQ==