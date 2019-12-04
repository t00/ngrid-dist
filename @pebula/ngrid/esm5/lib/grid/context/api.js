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
        this.columnApi = extApi.grid.columnApi;
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
                        this.extApi.grid._cdkTable.syncRows('data', rowContext.index);
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
                    if (!ref.focused && !this.extApi.grid.viewport.isScrolling) {
                        this.updateState(ref.rowContext.identity, ref.index, { focused: true });
                        this.activeFocused = { rowIdent: ref.rowContext.identity, colIndex: ref.index };
                        this.selectCells([this.activeFocused], markForCheck, true);
                        if (markForCheck) {
                            this.extApi.grid._cdkTable.syncRows('data', ref.rowContext.index);
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
                    if (!ref.selected && !this.extApi.grid.viewport.isScrolling) {
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
            (_b = this.extApi.grid._cdkTable).syncRows.apply(_b, tslib_1.__spread(['data'], Array.from(toMarkRendered.values())));
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
            (_b = this.extApi.grid._cdkTable).syncRows.apply(_b, tslib_1.__spread(['data'], Array.from(toMarkRendered.values())));
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
            var row = this.extApi.grid.ds.source[ref[0].dataIndex];
            /** @type {?} */
            var column = this.extApi.grid.columnApi.findColumnAt(ref[1]);
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
            var renderRowIndex = rowState.dataIndex - this.extApi.grid.ds.renderStart;
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
                if (!result && create && dataIndex < this.extApi.grid.ds.length) {
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
        var ds = this.extApi.grid.ds;
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
     * extending it for the grid features.
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
     * extending it for the grid features.
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
     * extending it for the grid features.
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
        var dataIndex = this.extApi.grid.ds.renderStart + renderRowIndex;
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
        return this.extApi.grid.viewport.elementRef.nativeElement.getBoundingClientRect();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbnRleHQvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQWMsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUtuRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBY2hELE9BQU8sRUFBeUIsb0JBQW9CLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDNUYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN0QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBRXhDOzs7O0lBaURFLG9CQUFvQixNQUErQjtRQUFuRCxpQkFnSEM7UUFoSG1CLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBaEQzQyxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7UUFDaEQsVUFBSyxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO1FBSzNDLG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUE0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDckcsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQWlDLENBQUM7Ozs7OztRQU9oRSxpQkFBWSxHQUEwQyxJQUFJLENBQUMsYUFBYTthQUM5RSxJQUFJLENBQ0gsTUFBTSxDQUE0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFDMUYsR0FBRzs7OztRQUFFLFVB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S0FBSyxDQUFDO0tBQzlCO1NBQU07UUFDTCxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztLQUM3QjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgT2JzZXJ2YWJsZSwgYXNhcFNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBidWZmZXIsIG1hcCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmLCBFbWJlZGRlZFZpZXdSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyByZW1vdmVGcm9tQXJyYXkgfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQge1xuICBSb3dDb250ZXh0U3RhdGUsXG4gIENlbGxDb250ZXh0U3RhdGUsXG4gIFBibE5ncmlkQ2VsbENvbnRleHQsXG4gIFBibE5ncmlkUm93Q29udGV4dCxcbiAgQ2VsbFJlZmVyZW5jZSxcbiAgR3JpZERhdGFQb2ludCxcbiAgUGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudCxcbiAgUGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnRcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBDb2x1bW5BcGkgfSBmcm9tICcuLi9jb2x1bW4tYXBpJztcbmltcG9ydCB7IGZpbmRDZWxsUmVuZGVyZWRJbmRleCwgZmluZFJvd1JlbmRlcmVkSW5kZXgsIHJlc29sdmVDZWxsUmVmZXJlbmNlIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi9yb3cnO1xuaW1wb3J0IHsgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuL2NlbGwnO1xuXG5leHBvcnQgY2xhc3MgQ29udGV4dEFwaTxUID0gYW55PiB7XG4gIHByaXZhdGUgdmlld0NhY2hlID0gbmV3IE1hcDxudW1iZXIsIFBibFJvd0NvbnRleHQ8VD4+KCk7XG4gIHByaXZhdGUgY2FjaGUgPSBuZXcgTWFwPGFueSwgUm93Q29udGV4dFN0YXRlPFQ+PigpO1xuICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICBwcml2YXRlIGNvbHVtbkFwaTogQ29sdW1uQXBpPFQ+O1xuXG4gIHByaXZhdGUgYWN0aXZlRm9jdXNlZDogR3JpZERhdGFQb2ludDtcbiAgcHJpdmF0ZSBhY3RpdmVTZWxlY3RlZDogR3JpZERhdGFQb2ludFtdID0gW107XG4gIHByaXZhdGUgZm9jdXNDaGFuZ2VkJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudD4oeyBwcmV2OiB1bmRlZmluZWQsIGN1cnI6IHVuZGVmaW5lZCB9KTtcbiAgcHJpdmF0ZSBzZWxlY3Rpb25DaGFuZ2VkJCA9IG5ldyBTdWJqZWN0PFBibE5ncmlkU2VsZWN0aW9uQ2hhbmdlZEV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBOb3RpZnkgd2hlbiB0aGUgZm9jdXMgaGFzIGNoYW5nZWQuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gaXMgbm90IGltbWVkaWF0ZSwgaXQgd2lsbCBvY2N1ciBvbiB0aGUgY2xvc2VzdCBtaWNyby10YXNrIGFmdGVyIHRoZSBjaGFuZ2UuXG4gICAqL1xuICByZWFkb25seSBmb2N1c0NoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudD4gPSB0aGlzLmZvY3VzQ2hhbmdlZCRcbiAgICAucGlwZShcbiAgICAgIGJ1ZmZlcjxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50Pih0aGlzLmZvY3VzQ2hhbmdlZCQucGlwZShkZWJvdW5jZVRpbWUoMCwgYXNhcFNjaGVkdWxlcikpKSxcbiAgICAgIG1hcCggZXZlbnRzID0+ICh7IHByZXY6IGV2ZW50c1swXS5wcmV2LCBjdXJyOiBldmVudHNbZXZlbnRzLmxlbmd0aCAtIDFdLmN1cnIgfSkgKVxuICAgICk7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBzZWxlY3RlZCBjZWxscyBoYXMgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQ+ID0gdGhpcy5zZWxlY3Rpb25DaGFuZ2VkJC5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIGdldCBmb2N1c2VkQ2VsbCgpOiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVGb2N1c2VkID8gey4uLnRoaXMuYWN0aXZlRm9jdXNlZCB9IDogdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gY3VycmVudGx5IHNlbGVjdGVkIHJhbmdlIG9mIGNlbGwncyBjb250ZXh0LlxuICAgKiBZb3UgY2FuIHJldHJpZXZlIHRoZSBhY3R1YWwgY29udGV4dCBvciBjb250ZXh0IGNlbGwgdXNpbmcgYGZpbmRSb3dJblZpZXdgIGFuZCAvIG9yIGBmaW5kUm93SW5DYWNoZWAuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZW5hYmxlZCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIGdldCBzZWxlY3RlZENlbGxzKCk6IEdyaWREYXRhUG9pbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlU2VsZWN0ZWQuc2xpY2UoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPikge1xuICAgIHRoaXMudmNSZWYgPSBleHRBcGkuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgIHRoaXMuY29sdW1uQXBpID0gZXh0QXBpLmdyaWQuY29sdW1uQXBpO1xuXG4gICAgZXh0QXBpLmV2ZW50c1xuICAgICAgLnBpcGUoIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvbkRlc3Ryb3knICkgKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiB0aGlzLmRlc3Ryb3koKSApO1xuXG4gICAgY29uc3QgdXBkYXRlQ29udGV4dCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHZpZXdQb3J0UmVjdCA9IHRoaXMuZ2V0Vmlld1JlY3QoKTtcbiAgICAgIGNvbnN0IGxhc3RWaWV3ID0gbmV3IFNldChBcnJheS5mcm9tKHRoaXMudmlld0NhY2hlLnZhbHVlcygpKS5tYXAoIHYgPT4gdi5pZGVudGl0eSApKTtcbiAgICAgIGNvbnN0IHVubWF0Y2hlZFJlZnMgPSBuZXcgTWFwPFQsIFtudW1iZXIsIG51bWJlcl0+KCk7XG5cbiAgICAgIGxldCBrZWVwUHJvY2Vzc091dE9mVmlldyA9ICEhdmlld1BvcnRSZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMudmNSZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuZmluZFZpZXdSZWYoaSk7XG4gICAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dDb250ZXh0KHZpZXdSZWYsIGkpO1xuICAgICAgICB0aGlzLnZpZXdDYWNoZS5zZXQoaSwgcm93Q29udGV4dCk7XG4gICAgICAgIGxhc3RWaWV3LmRlbGV0ZShyb3dDb250ZXh0LmlkZW50aXR5KTtcblxuICAgICAgICAvLyBJZGVudGl0eSBkaWQgbm90IGNoYW5nZSBidXQgY29udGV4dCBkaWQgY2hhbmdlXG4gICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgZHVlIHRvIHRyYWNrQnkgd2l0aCBpbmRleCByZWZlcmVuY2Ugb3IgdGhhdCBtYXRjaGVkIGRhdGEgb24gc29tZSBwcm9wZXJ0eSBidXQgdGhlIGFjdHVhbCBkYXRhIHJlZmVyZW5jZSBjaGFuZ2VkLlxuICAgICAgICAvLyBXZSBsb2cgdGhlc2UgYW5kIGhhbmRsZSB0aGVtIGxhdGVyLCB0aGV5IGNvbWUgaW4gcGFpciBhbmQgd2UgbmVlZCB0byBzd2l0Y2ggdGhlIGNvbnRleHQgYmV0d2VlbiB0aGUgdmFsdWVzIGluIHRoZSBwYWlyLlxuXG4gICAgICAgIC8vIFRoZSBwYWlyIGlzIGEgMiBpdGVtIHR1cGxlIC0gMXN0IGl0ZW0gaXMgbmV3IGluZGV4LCAybmQgaXRlbSBpcyB0aGUgb2xkIGluZGV4LlxuICAgICAgICAvLyBXZSBidWlsZCB0aGUgcGFpcnMsIGVhY2ggcGFpciBpcyBhIHN3aXRjaFxuICAgICAgICBpZiAodmlld1JlZi5jb250ZXh0LiRpbXBsaWNpdCAhPT0gcm93Q29udGV4dC4kaW1wbGljaXQpIHtcbiAgICAgICAgICBsZXQgcGFpciA9IHVubWF0Y2hlZFJlZnMuZ2V0KHJvd0NvbnRleHQuJGltcGxpY2l0KSB8fCBbLTEsIC0xXTtcbiAgICAgICAgICBwYWlyWzFdID0gaTtcbiAgICAgICAgICB1bm1hdGNoZWRSZWZzLnNldChyb3dDb250ZXh0LiRpbXBsaWNpdCwgcGFpcik7XG5cbiAgICAgICAgICBwYWlyID0gdW5tYXRjaGVkUmVmcy5nZXQodmlld1JlZi5jb250ZXh0LiRpbXBsaWNpdCkgfHwgWy0xLCAtMV07XG4gICAgICAgICAgcGFpclswXSA9IGk7XG4gICAgICAgICAgdW5tYXRjaGVkUmVmcy5zZXQodmlld1JlZi5jb250ZXh0LiRpbXBsaWNpdCwgcGFpcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2VlcFByb2Nlc3NPdXRPZlZpZXcpIHtcbiAgICAgICAgICBrZWVwUHJvY2Vzc091dE9mVmlldyA9IHByb2Nlc3NPdXRPZlZpZXcodmlld1JlZiwgdmlld1BvcnRSZWN0LCAndG9wJyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHVubWF0Y2hlZFJlZnMuc2l6ZSA+IDApIHtcbiAgICAgICAgLy8gV2UgaGF2ZSBwYWlycyBidXQgd2UgY2FuJ3QganVzdCBzdGFydCBzd2l0Y2hpbmcgYmVjYXVzZSB3aGVuIHRoZSBpdGVtcyBtb3ZlIG9yIHN3YXAgd2UgbmVlZFxuICAgICAgICAvLyB0byB1cGRhdGUgdGhlaXIgdmFsdWVzIGFuZCBzbyB3ZSBuZWVkIHRvIGNhY2hlIG9uZSBvZiB0aGVtLlxuICAgICAgICAvLyBUaGUgb3BlcmF0aW9uIHdpbGwgZWZmZWN0IGFsbCBpdGVtcyAoTikgYmV0d2VlbiB0aGVuIG9yaWdpbiBhbmQgZGVzdGluYXRpb24uXG4gICAgICAgIC8vIFdoZW4gTiA9PT0gMiBpdHMgYSBzd2FwLCB3aGVuIE4gPiAyIGl0cyBhIG1vdmUuXG4gICAgICAgIC8vIEluIGJvdGggY2FzZXMgdGhlIGZpcnN0IGFuZCBsYXN0IG9wZXJhdGlvbnMgc2hhcmUgdGhlIHNhbWUgb2JqZWN0LlxuICAgICAgICAvLyBBbHNvLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBvcmRlciBvZiBvcGVyYXRpb25zIGRvZXMgbm90IHVzZSB0aGUgc2FtZSByb3cgYXMgdGhlIHNvdXJjZSBtb3JlIHRoZW4gb25jZS5cbiAgICAgICAgLy8gRm9yIGV4YW1wbGUsIElmIEkgY29weSByb3cgNSB0byB0byByb3cgNCBhbmQgdGhlbiA0IHRvIDMgSSBuZWVkIHRvIHN0YXJ0IGZyb20gMy0+NC0+NSwgaWYgSSBkbyA1LT40LT4zIEkgd2lsbCBnZXQgNSBpbiBhbGwgcm93cy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gV2UgdXNlIHRoZSBzb3VyY2UgKHBhaXJbMV0pIGZvciBzb3J0aW5nLCB0aGUgc29ydCBvcmRlciBkZXBlbmRzIG9uIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG1vdmUgKHVwL2Rvd24pLlxuICAgICAgICBjb25zdCBhcnIgPSBBcnJheS5mcm9tKHVubWF0Y2hlZFJlZnMuZW50cmllcygpKS5maWx0ZXIoIGVudHJ5ID0+IHtcbiAgICAgICAgICBjb25zdCBwYWlyID0gZW50cnlbMV07XG4gICAgICAgICAgaWYgKHBhaXJbMF0gPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChwYWlyWzFdID09PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgdG8gPSB0aGlzLnZpZXdDYWNoZS5nZXQocGFpclswXSk7XG4gICAgICAgICAgICB0by4kaW1wbGljaXQgPSBlbnRyeVswXTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pLm1hcCggZW50cnkgPT4gZW50cnlbMV0gKTtcblxuICAgICAgICB1bm1hdGNoZWRSZWZzLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBzb3J0Rm4gPSBhcnJbYXJyLmxlbmd0aCAtIDFdWzBdIC0gYXJyW2Fyci5sZW5ndGggLSAxXVsxXSA+IDAgLy8gY2hlY2sgc29ydCBkaXJlY3Rpb25cbiAgICAgICAgICAgID8gKGEsYikgPT4gYlsxXSAtIGFbMV1cbiAgICAgICAgICAgIDogKGEsYikgPT4gYVsxXSAtIGJbMV1cbiAgICAgICAgICA7XG4gICAgICAgICAgYXJyLnNvcnQoc29ydEZuKTtcblxuICAgICAgICAgIGNvbnN0IGxhc3RPcCA9IHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMudmlld0NhY2hlLmdldChhcnJbMF1bMF0pLiRpbXBsaWNpdCxcbiAgICAgICAgICAgIHN0YXRlOiB0aGlzLnZpZXdDYWNoZS5nZXQoYXJyWzBdWzBdKS5nZXRTdGF0ZSgpLFxuICAgICAgICAgICAgcGFpcjogYXJyLnBvcCgpLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IHBhaXIgb2YgYXJyKSB7XG4gICAgICAgICAgICAvLyBXaGF0IHdlJ3JlIGRvaW5nIGhlcmUgaXMgc3dpdGNoaW5nIHRoZSBjb250ZXh0IHdyYXBwZWQgYnkgYFJvdENvbnRleHRgIHdoaWxlIHRoZSBgUm93Q29udGV4dGAgcHJlc2VydmUgaXQncyBpZGVudGl0eS5cbiAgICAgICAgICAgIC8vIEVhY2ggcm93IGNvbnRleHQgaGFzIGEgc3RhdGUsIHdoaWNoIGlzIHZhbGlkIGZvciBpdCdzIGN1cnJlbnQgY29udGV4dCwgaWYgd2Ugc3dpdGNoIGNvbnRleHQgd2UgbXVzdCBzd2l0Y2ggc3RhdGUgYXMgd2VsbCBhbmQgYWxzb1xuICAgICAgICAgICAgLy8gY2FjaGUgaXQuXG4gICAgICAgICAgICBjb25zdCB0byA9IHRoaXMudmlld0NhY2hlLmdldChwYWlyWzBdKTtcbiAgICAgICAgICAgIGNvbnN0IGZyb20gPSB0aGlzLnZpZXdDYWNoZS5nZXQocGFpclsxXSk7XG4gICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGZyb20uZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHN0YXRlLmlkZW50aXR5ID0gdG8uaWRlbnRpdHk7XG4gICAgICAgICAgICB0aGlzLmNhY2hlLnNldCh0by5pZGVudGl0eSwgc3RhdGUpO1xuICAgICAgICAgICAgdG8uZnJvbVN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgIHRvLiRpbXBsaWNpdCA9IGZyb20uJGltcGxpY2l0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy52aWV3Q2FjaGUuZ2V0KGxhc3RPcC5wYWlyWzBdKTtcbiAgICAgICAgICBsYXN0T3Auc3RhdGUuaWRlbnRpdHkgPSB0by5pZGVudGl0eTtcbiAgICAgICAgICB0aGlzLmNhY2hlLnNldCh0by5pZGVudGl0eSwgbGFzdE9wLnN0YXRlKTtcbiAgICAgICAgICB0by5mcm9tU3RhdGUobGFzdE9wLnN0YXRlKTtcbiAgICAgICAgICB0by4kaW1wbGljaXQgPSBsYXN0T3AuZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih2aWV3UG9ydFJlY3QpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMudmNSZWYubGVuZ3RoIC0xOyBpID4gLTE7IGktLSkge1xuICAgICAgICAgIGlmICghcHJvY2Vzc091dE9mVmlldyh0aGlzLmZpbmRWaWV3UmVmKGkpLCB2aWV3UG9ydFJlY3QsICdib3R0b20nKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxhc3RWaWV3LmZvckVhY2goIGlkZW50ID0+IHRoaXMuY2FjaGUuZ2V0KGlkZW50KS5maXJzdFJlbmRlciA9IGZhbHNlICk7XG4gICAgfTtcblxuICAgIHVwZGF0ZUNvbnRleHQoKTtcbiAgICBleHRBcGkuY2RrVGFibGUub25SZW5kZXJSb3dzLnN1YnNjcmliZSh1cGRhdGVDb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb2N1cyB0aGUgcHJvdmlkZWQgY2VsbC5cbiAgICogSWYgYSBjZWxsIGlzIG5vdCBwcm92aWRlZCB3aWxsIHVuLWZvY3VzIChibHVyKSB0aGUgY3VycmVudGx5IGZvY3VzZWQgY2VsbCAoaWYgdGhlcmUgaXMgb25lKS5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIGZvY3VzQ2VsbChjZWxsUmVmPzogQ2VsbFJlZmVyZW5jZSB8IGJvb2xlYW4sIG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWNlbGxSZWYgfHwgY2VsbFJlZiA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHRoaXMuYWN0aXZlRm9jdXNlZCkge1xuICAgICAgICBjb25zdCB7IHJvd0lkZW50LCBjb2xJbmRleCB9ID0gdGhpcy5hY3RpdmVGb2N1c2VkO1xuICAgICAgICB0aGlzLmFjdGl2ZUZvY3VzZWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGUocm93SWRlbnQsIGNvbEluZGV4LCB7IGZvY3VzZWQ6IGZhbHNlIH0pO1xuICAgICAgICB0aGlzLmVtaXRGb2N1c0NoYW5nZWQodGhpcy5hY3RpdmVGb2N1c2VkKTtcbiAgICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dJblZpZXcocm93SWRlbnQpO1xuICAgICAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLmV4dEFwaS5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScsIHJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmLCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIHRoaXMuZm9jdXNDZWxsKG1hcmtGb3JDaGVjayk7XG4gICAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICAgIGlmICghcmVmLmZvY3VzZWQgJiYgIXRoaXMuZXh0QXBpLmdyaWQudmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocmVmLnJvd0NvbnRleHQuaWRlbnRpdHksIHJlZi5pbmRleCwgeyBmb2N1c2VkOiB0cnVlIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUZvY3VzZWQgPSB7IHJvd0lkZW50OiByZWYucm93Q29udGV4dC5pZGVudGl0eSwgY29sSW5kZXg6IHJlZi5pbmRleCB9O1xuXG4gICAgICAgICAgICB0aGlzLnNlbGVjdENlbGxzKCBbIHRoaXMuYWN0aXZlRm9jdXNlZCBdLCBtYXJrRm9yQ2hlY2ssIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgICAgICAgIHRoaXMuZXh0QXBpLmdyaWQuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgcmVmLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJlZlswXS5pZGVudGl0eSwgcmVmWzFdLCB7IGZvY3VzZWQ6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5hY3RpdmVGb2N1c2VkID0geyByb3dJZGVudDogcmVmWzBdLmlkZW50aXR5LCBjb2xJbmRleDogcmVmWzFdIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0Rm9jdXNDaGFuZ2VkKHRoaXMuYWN0aXZlRm9jdXNlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBtYXJrRm9yQ2hlY2sgTWFyayB0aGUgcm93IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIEBwYXJhbSBjbGVhckN1cnJlbnQgQ2xlYXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbmV3IHNlbGVjdGlvbi5cbiAgICogRGVmYXVsdCB0byBmYWxzZSAoYWRkIHRvIGN1cnJlbnQpLlxuICAgKi9cbiAgc2VsZWN0Q2VsbHMoY2VsbFJlZnM6IENlbGxSZWZlcmVuY2VbXSwgbWFya0ZvckNoZWNrPzogYm9vbGVhbiwgY2xlYXJDdXJyZW50PzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvTWFya1JlbmRlcmVkID0gbmV3IFNldDxudW1iZXI+KCk7XG5cbiAgICBpZiAoY2xlYXJDdXJyZW50KSB7XG4gICAgICB0aGlzLnVuc2VsZWN0Q2VsbHMoKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZDogR3JpZERhdGFQb2ludFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNlbGxSZWYgb2YgY2VsbFJlZnMpIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWYsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICBpZiAoIXJlZi5zZWxlY3RlZCAmJiAhdGhpcy5leHRBcGkuZ3JpZC52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgIGNvbnN0IHJvd0lkZW50ID0gcmVmLnJvd0NvbnRleHQuaWRlbnRpdHlcbiAgICAgICAgICBjb25zdCBjb2xJbmRleCA9IHJlZi5pbmRleDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd0lkZW50LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogdHJ1ZSB9KTtcblxuICAgICAgICAgIGNvbnN0IGRhdGFQb2ludCA9IHsgcm93SWRlbnQsIGNvbEluZGV4IH07XG4gICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZC5wdXNoKGRhdGFQb2ludCk7XG4gICAgICAgICAgYWRkZWQucHVzaChkYXRhUG9pbnQpO1xuXG4gICAgICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICAgICAgdG9NYXJrUmVuZGVyZWQuYWRkKHJlZi5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIGNvbnN0IFsgcm93U3RhdGUsIGNvbEluZGV4IF0gPSByZWY7XG4gICAgICAgIGlmICghcm93U3RhdGUuY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IHRydWUgfSk7XG4gICAgICAgICAgdGhpcy5hY3RpdmVTZWxlY3RlZC5wdXNoKCB7IHJvd0lkZW50OiByb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXggfSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvTWFya1JlbmRlcmVkLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLmV4dEFwaS5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScsIC4uLkFycmF5LmZyb20odG9NYXJrUmVuZGVyZWQudmFsdWVzKCkpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLm5leHQoeyBhZGRlZCwgcmVtb3ZlZDogW10gfSk7XG4gIH1cblxuICAvKipcbiAgICogVW5zZWxlY3QgYWxsIHByb3ZpZGVkIGNlbGxzLlxuICAgKiBJZiBjZWxscyBhcmUgbm90IHByb3ZpZGVkIHdpbGwgdW4tc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBtYXJrRm9yQ2hlY2sgTWFyayB0aGUgcm93IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqL1xuICB1bnNlbGVjdENlbGxzKGNlbGxSZWZzPzogQ2VsbFJlZmVyZW5jZVtdIHwgYm9vbGVhbiwgbWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHRvTWFya1JlbmRlcmVkID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgbGV0IHRvVW5zZWxlY3Q6IENlbGxSZWZlcmVuY2VbXSA9IHRoaXMuYWN0aXZlU2VsZWN0ZWQ7XG4gICAgbGV0IHJlbW92ZUFsbCA9IHRydWU7XG5cbiAgICBpZihBcnJheS5pc0FycmF5KGNlbGxSZWZzKSkge1xuICAgICAgdG9VbnNlbGVjdCA9IGNlbGxSZWZzO1xuICAgICAgcmVtb3ZlQWxsID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hcmtGb3JDaGVjayA9ICEhY2VsbFJlZnM7XG4gICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkID0gW107XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlZDogR3JpZERhdGFQb2ludFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGNlbGxSZWYgb2YgdG9VbnNlbGVjdCkge1xuICAgICAgY29uc3QgcmVmID0gcmVzb2x2ZUNlbGxSZWZlcmVuY2UoY2VsbFJlZiwgdGhpcyBhcyBhbnkpO1xuICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIFBibENlbGxDb250ZXh0KSB7XG4gICAgICAgIGlmIChyZWYuc2VsZWN0ZWQpIHtcbiAgICAgICAgICBjb25zdCByb3dJZGVudCA9IHJlZi5yb3dDb250ZXh0LmlkZW50aXR5XG4gICAgICAgICAgY29uc3QgY29sSW5kZXggPSByZWYuaW5kZXg7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgIGlmICghcmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICBjb25zdCB3YXNSZW1vdmVkID0gcmVtb3ZlRnJvbUFycmF5KHRoaXMuYWN0aXZlU2VsZWN0ZWQsIGl0ZW0gPT4gaXRlbS5jb2xJbmRleCA9PT0gY29sSW5kZXggJiYgaXRlbS5yb3dJZGVudCA9PT0gcm93SWRlbnQpO1xuICAgICAgICAgICAgaWYgKHdhc1JlbW92ZWQpIHtcbiAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKHsgcm93SWRlbnQsIGNvbEluZGV4IH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgICAgIHRvTWFya1JlbmRlcmVkLmFkZChyZWYucm93Q29udGV4dC5pbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlZikge1xuICAgICAgICBjb25zdCBbIHJvd1N0YXRlLCBjb2xJbmRleCBdID0gcmVmO1xuICAgICAgICBpZiAocm93U3RhdGUuY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXgsIHsgc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICAgIGlmICghcmVtb3ZlQWxsKSB7XG4gICAgICAgICAgICBjb25zdCB3YXNSZW1vdmVkID0gcmVtb3ZlRnJvbUFycmF5KHRoaXMuYWN0aXZlU2VsZWN0ZWQsIGl0ZW0gPT4gaXRlbS5jb2xJbmRleCA9PT0gY29sSW5kZXggJiYgaXRlbS5yb3dJZGVudCA9PT0gcm93U3RhdGUuaWRlbnRpdHkpO1xuICAgICAgICAgICAgaWYgKHdhc1JlbW92ZWQpIHtcbiAgICAgICAgICAgICAgcmVtb3ZlZC5wdXNoKHsgcm93SWRlbnQ6IHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0b01hcmtSZW5kZXJlZC5zaXplID4gMCkge1xuICAgICAgdGhpcy5leHRBcGkuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCAuLi5BcnJheS5mcm9tKHRvTWFya1JlbmRlcmVkLnZhbHVlcygpKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2VkJC5uZXh0KHsgYWRkZWQ6IFtdLCByZW1vdmVkIH0pO1xuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMudmNSZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLmZpbmRWaWV3UmVmKGkpO1xuICAgICAgdmlld1JlZi5jb250ZXh0LnBibFJvd0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMudmlld0NhY2hlLmNsZWFyKCk7XG4gICAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICB9XG5cbiAgZ2V0Um93KHJvdzogbnVtYmVyIHwgSFRNTEVsZW1lbnQpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGluZGV4ID0gdHlwZW9mIHJvdyA9PT0gJ251bWJlcicgPyByb3cgOiBmaW5kUm93UmVuZGVyZWRJbmRleChyb3cpO1xuICAgIHJldHVybiB0aGlzLnJvd0NvbnRleHQoaW5kZXgpO1xuICB9XG5cbiAgZ2V0Q2VsbChjZWxsOiBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkXG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGNlbGwgY29udGV4dCBmb3IgdGhlIGNlbGwgYXQgdGhlIHBvaW50IHNwZWNpZmllZFxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2xcbiAgICovXG4gIGdldENlbGwocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogUGJsTmdyaWRDZWxsQ29udGV4dCB8IHVuZGVmaW5lZDtcbiAgZ2V0Q2VsbChyb3dPckNlbGxFbGVtZW50OiBudW1iZXIgfCBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQsIGNvbD86IG51bWJlcik6IFBibE5ncmlkQ2VsbENvbnRleHQgfCB1bmRlZmluZWQge1xuICAgIGlmICh0eXBlb2Ygcm93T3JDZWxsRWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnJvd0NvbnRleHQocm93T3JDZWxsRWxlbWVudCk7XG4gICAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKHJvd09yQ2VsbEVsZW1lbnQsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgICByZXR1cm4gcmVmO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldERhdGFJdGVtKGNlbGw6IENlbGxSZWZlcmVuY2UpOiBhbnkge1xuICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGwsIHRoaXMgYXMgYW55KTtcbiAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgIHJldHVybiByZWYuY29sLmdldFZhbHVlKHJlZi5yb3dDb250ZXh0LiRpbXBsaWNpdCk7XG4gICAgfSBlbHNlIGlmIChyZWYpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHRoaXMuZXh0QXBpLmdyaWQuZHMuc291cmNlW3JlZlswXS5kYXRhSW5kZXhdO1xuICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5leHRBcGkuZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbkF0KHJlZlsxXSk7XG4gICAgICByZXR1cm4gY29sdW1uLmdldFZhbHVlKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQ2VsbENvbnRleHQocmVuZGVyUm93SW5kZXg6IG51bWJlciwgY29sdW1uOiBQYmxDb2x1bW4pOiBQYmxDZWxsQ29udGV4dDxUPiB7XG4gICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMucm93Q29udGV4dChyZW5kZXJSb3dJbmRleCk7XG4gICAgY29uc3QgY29sSW5kZXggPSB0aGlzLmNvbHVtbkFwaS5pbmRleE9mKGNvbHVtbik7XG4gICAgcmV0dXJuIHJvd0NvbnRleHQuY2VsbChjb2xJbmRleCk7XG4gIH1cblxuICByb3dDb250ZXh0KHJlbmRlclJvd0luZGV4OiBudW1iZXIpOiBQYmxSb3dDb250ZXh0PFQ+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy52aWV3Q2FjaGUuZ2V0KHJlbmRlclJvd0luZGV4KTtcbiAgfVxuXG4gIHVwZGF0ZU91dE9mVmlld1N0YXRlKHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4pOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3UG9ydFJlY3QgPSB0aGlzLmdldFZpZXdSZWN0KCk7XG4gICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuZmluZFZpZXdSZWYocm93Q29udGV4dC5pbmRleCk7XG4gICAgcHJvY2Vzc091dE9mVmlldyh2aWV3UmVmLCB2aWV3UG9ydFJlY3QpO1xuICB9XG5cbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgY29sdW1uSW5kZXg6IG51bWJlciwgY2VsbFN0YXRlOiBQYXJ0aWFsPENlbGxDb250ZXh0U3RhdGU8VD4+KTogdm9pZDtcbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgcm93U3RhdGU6IFBhcnRpYWw8Um93Q29udGV4dFN0YXRlPFQ+Pik6IHZvaWQ7XG4gIHVwZGF0ZVN0YXRlKHJvd0lkZW50aXR5OiBhbnksIHJvd1N0YXRlT3JDZWxsSW5kZXg6IFBhcnRpYWw8Um93Q29udGV4dFN0YXRlPFQ+PiB8IG51bWJlciwgY2VsbFN0YXRlPzogUGFydGlhbDxDZWxsQ29udGV4dFN0YXRlPFQ+Pik6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRSb3dTdGF0ZSA9IHRoaXMuY2FjaGUuZ2V0KHJvd0lkZW50aXR5KTtcbiAgICBpZiAoY3VycmVudFJvd1N0YXRlKSB7XG4gICAgICBpZiAodHlwZW9mIHJvd1N0YXRlT3JDZWxsSW5kZXggPT09ICdudW1iZXInKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDZWxsU3RhdGUgPSBjdXJyZW50Um93U3RhdGUuY2VsbHNbcm93U3RhdGVPckNlbGxJbmRleF07XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbFN0YXRlKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbihjdXJyZW50Q2VsbFN0YXRlLCBjZWxsU3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRSb3dTdGF0ZSwgcm93U3RhdGVPckNlbGxJbmRleCk7XG4gICAgICB9XG4gICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5maW5kUm93SW5WaWV3KHJvd0lkZW50aXR5KTtcbiAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgIHJvd0NvbnRleHQuZnJvbVN0YXRlKGN1cnJlbnRSb3dTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY3VycmVudCB2aWV3LlxuICAgKiBJZiB0aGUgcm93IGlzIG5vdCBpbiB0aGUgdmlldyAob3IgZXZlbiBub3QgaW4gdGhlIGNhY2hlKSBpdCB3aWxsIHJldHVybiB1bmRlZmluZWQsIG90aGVyd2lzZSByZXR1cm5zIHRoZSByb3cncyBjb250ZXh0IGluc3RhbmNlIChgUGJsUm93Q29udGV4dGApXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqL1xuICBmaW5kUm93SW5WaWV3KHJvd0lkZW50aXR5OiBhbnkpOiBQYmxSb3dDb250ZXh0PFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByb3dTdGF0ZSA9IHRoaXMuY2FjaGUuZ2V0KHJvd0lkZW50aXR5KTtcbiAgICBpZiAocm93U3RhdGUpIHtcbiAgICAgIGNvbnN0IHJlbmRlclJvd0luZGV4ID0gcm93U3RhdGUuZGF0YUluZGV4IC0gdGhpcy5leHRBcGkuZ3JpZC5kcy5yZW5kZXJTdGFydDtcbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICAgICAgaWYgKHJvd0NvbnRleHQgJiYgcm93Q29udGV4dC5pZGVudGl0eSA9PT0gcm93SWRlbnRpdHkpIHtcbiAgICAgICAgcmV0dXJuIHJvd0NvbnRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnkpOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY29udGV4dCBjYWNoZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWNoZSBkb2VzIG5vdCBob2xkIHRoZSBjb250ZXh0IGl0c2VsZiBidXQgb25seSB0aGUgc3RhdGUgdGhhdCBjYW4gbGF0ZXIgYmUgdXNlZCB0byByZXRyaWV2ZSBhIGNvbnRleHQgaW5zdGFuY2UuIFRoZSBjb250ZXh0IGluc3RhbmNlXG4gICAqIGlzIG9ubHkgdXNlZCBhcyBjb250ZXh0IGZvciByb3dzIGluIHZpZXcuXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqIEBwYXJhbSBvZmZzZXQgV2hlbiBzZXQsIHJldHVybnMgdGhlIHJvdyBhdCB0aGUgb2Zmc2V0IGZyb20gdGhlIHJvdyB3aXRoIHRoZSBwcm92aWRlZCByb3cgaWRlbnRpdHkuIENhbiBiZSBhbnkgbnVtZXJpYyB2YWx1ZSAoZS5nIDUsIC02LCA0KS5cbiAgICogQHBhcmFtIGNyZWF0ZSBXaGV0aGVyIHRvIGNyZWF0ZSBhIG5ldyBzdGF0ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldDogbnVtYmVyLCBjcmVhdGU6IGJvb2xlYW4pOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldD86IG51bWJlciwgY3JlYXRlPzogYm9vbGVhbik6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgcm93U3RhdGUgPSB0aGlzLmNhY2hlLmdldChyb3dJZGVudGl0eSk7XG5cbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgcmV0dXJuIHJvd1N0YXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkYXRhSW5kZXggPSByb3dTdGF0ZS5kYXRhSW5kZXggKyBvZmZzZXQ7XG4gICAgICBjb25zdCBpZGVudGl0eSA9IHRoaXMuZ2V0Um93SWRlbnRpdHkoZGF0YUluZGV4KTtcbiAgICAgIGlmIChpZGVudGl0eSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5maW5kUm93SW5DYWNoZShpZGVudGl0eSk7XG4gICAgICAgIGlmICghcmVzdWx0ICYmIGNyZWF0ZSAmJiBkYXRhSW5kZXggPCB0aGlzLmV4dEFwaS5ncmlkLmRzLmxlbmd0aCkge1xuICAgICAgICAgIHJlc3VsdCA9IFBibFJvd0NvbnRleHQuZGVmYXVsdFN0YXRlKGlkZW50aXR5LCBkYXRhSW5kZXgsIHRoaXMuY29sdW1uQXBpLmNvbHVtbnMubGVuZ3RoKTtcbiAgICAgICAgICB0aGlzLmNhY2hlLnNldChpZGVudGl0eSwgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFJvd0lkZW50aXR5KGRhdGFJbmRleDogbnVtYmVyLCBjb250ZXh0PzogUm93Q29udGV4dDxhbnk+KTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB7XG4gICAgY29uc3QgeyBkcyB9ID0gdGhpcy5leHRBcGkuZ3JpZDtcbiAgICBjb25zdCB7IHByaW1hcnkgfSA9IHRoaXMuZXh0QXBpLmNvbHVtblN0b3JlO1xuXG4gICAgY29uc3Qgcm93ID0gY29udGV4dCA/IGNvbnRleHQuJGltcGxpY2l0IDogZHMuc291cmNlW2RhdGFJbmRleF07XG4gICAgaWYgKCFyb3cpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcHJpbWFyeSA/IHByaW1hcnkuZ2V0VmFsdWUocm93KSA6IGRhdGFJbmRleDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpbmRWaWV3UmVmKGluZGV4OiBudW1iZXIpOiBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj4ge1xuICAgIHJldHVybiB0aGlzLnZjUmVmLmdldChpbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPFJvd0NvbnRleHQ8VD4+O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQvVXBkYXRlL0NyZWF0ZSB0aGUgYFJvd0NvbnRleHRgIGZvciB0aGUgcHJvdmlkZWQgYEVtYmVkZGVkVmlld1JlZmAgYXQgdGhlIHByb3ZpZGVkIHJlbmRlciBwb3NpdGlvbi5cbiAgICpcbiAgICogQSBgUm93Q29udGV4dGAgb2JqZWN0IGlzIGEgd3JhcHBlciBmb3IgdGhlIGludGVybmFsIGNvbnRleHQgb2YgYSByb3cgaW4gYENka1RhYmxlYCB3aXRoIHRoZSBwdXJwb3NlIG9mXG4gICAqIGV4dGVuZGluZyBpdCBmb3IgdGhlIGdyaWQgZmVhdHVyZXMuXG4gICAqXG4gICAqIFRoZSBwcm9jZXNzIGhhcyAyIGxheWVycyBvZiBjYWNoZTpcbiAgICpcbiAgICogLSBgUm93Q29udGV4dGAgb2JqZWN0cyBhcmUgc3RvcmVkIGluIGEgdmlldyBjYWNoZSB3aGljaCBpcyBzeW5jZWQgd2l0aCB0aGUgYENka1RhYmxlYCByb3cgb3V0bGV0IHZpZXdSZWZzLlxuICAgKiBFYWNoIHZpZXcgcmVmIChyb3cpIGhhcyBhIG1hdGNoaW5nIHJlY29yZCBpbiB0aGUgYFJvd0NvbnRleHRgIHZpZXcgY2FjaGUuXG4gICAqXG4gICAqIC0gYFJvd0NvbnRleHRTdGF0ZWAgb2JqZWN0IGFyZSBzdG9yZWQgaW4gYSBjYWNoZSB3aGljaCBpcyBzeW5jZWQgd2l0aCB0aGUgaXRlbXMgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKiBFYWNoIGl0ZW0gaW4gdGhlIGRhdGFzb3VyY2UgaGFzIGEgbWF0Y2hpbmcgcm93IGBSb3dDb250ZXh0U3RhdGVgIGl0ZW0gKGxhenkpLCB3aGljaCBpcyB1c2VkIHRvIHBlcnNpc3QgY29udGV4dFxuICAgKiB3aGVuIGBSb3dDb250ZXh0YCBnb2VzIGluL291dCBvZiB0aGUgdmlld3BvcnQuXG4gICAqXG4gICAqIEBwYXJhbSB2aWV3UmVmIFRoZSBgRW1iZWRkZWRWaWV3UmVmYCBob2xkaW5nIHRoZSBjb250ZXh0IHRoYXQgdGhlIHJldHVybmVkIGBSb3dDb250ZXh0YCBzaG91bGQgd3JhcFxuICAgKiBAcGFyYW0gcmVuZGVyUm93SW5kZXggVGhlIHBvc2l0aW9uIG9mIHRoZSB2aWV3LCByZWxhdGl2ZSB0byBvdGhlciByb3dzLlxuICAgKiBUaGUgcG9zaXRpb24gaXMgcmVxdWlyZWQgZm9yIGNhY2hpbmcgdGhlIGNvbnRleHQgc3RhdGUgd2hlbiBhIHNwZWNpZmljIHJvdyBpcyB0aHJvd24gb3V0IG9mIHRoZSB2aWV3cG9ydCAodmlydHVhbCBzY3JvbGwpLlxuICAgKiBFYWNoIGBSb3dDb250ZXh0YCBnZXRzIGEgdW5pcXVlIGlkZW50aXR5IHVzaW5nIHRoZSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgY3VycmVudCByZW5kZXIgcmFuZ2UgaW4gdGhlIGRhdGEgc291cmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBmaW5kUm93Q29udGV4dCh2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj4sIHJlbmRlclJvd0luZGV4OiBudW1iZXIpOiBQYmxSb3dDb250ZXh0PFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB7IGNvbnRleHQgfSA9IHZpZXdSZWY7XG4gICAgY29uc3QgZGF0YUluZGV4ID0gdGhpcy5leHRBcGkuZ3JpZC5kcy5yZW5kZXJTdGFydCArIHJlbmRlclJvd0luZGV4O1xuICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5nZXRSb3dJZGVudGl0eShkYXRhSW5kZXgsIHZpZXdSZWYuY29udGV4dCk7XG5cbiAgICBsZXQgcm93Q29udGV4dCA9IGNvbnRleHQucGJsUm93Q29udGV4dCBhcyBQYmxSb3dDb250ZXh0PFQ+O1xuXG4gICAgaWYgKCF0aGlzLmNhY2hlLmhhcyhpZGVudGl0eSkpIHtcbiAgICAgIHRoaXMuY2FjaGUuc2V0KGlkZW50aXR5LCBQYmxSb3dDb250ZXh0LmRlZmF1bHRTdGF0ZShpZGVudGl0eSwgZGF0YUluZGV4LCB0aGlzLmNvbHVtbkFwaS5jb2x1bW5zLmxlbmd0aCkpO1xuICAgIH1cblxuICAgIGlmICghcm93Q29udGV4dCkge1xuICAgICAgcm93Q29udGV4dCA9IGNvbnRleHQucGJsUm93Q29udGV4dCA9IG5ldyBQYmxSb3dDb250ZXh0PFQ+KGlkZW50aXR5LCBkYXRhSW5kZXgsIHRoaXMuZXh0QXBpKTtcbiAgICAgIHJvd0NvbnRleHQudXBkYXRlQ29udGV4dChjb250ZXh0KTtcblxuICAgICAgdmlld1JlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgICB0aGlzLnZpZXdDYWNoZS5kZWxldGUocmVuZGVyUm93SW5kZXgpO1xuICAgICAgICBjb250ZXh0LnBibFJvd0NvbnRleHQgPSB1bmRlZmluZWQ7XG4gICAgICB9KTtcblxuICAgIH0gZWxzZSBpZiAocm93Q29udGV4dC5pZGVudGl0eSAhPT0gaWRlbnRpdHkpIHtcbiAgICAgIC8vIHNhdmUgb2xkIHN0YXRlIGJlZm9yZSBhcHBseWluZyBuZXcgc3RhdGVcbiAgICAgIHRoaXMuY2FjaGUuc2V0KHJvd0NvbnRleHQuaWRlbnRpdHksIHJvd0NvbnRleHQuZ2V0U3RhdGUoKSk7XG4gICAgICByb3dDb250ZXh0LnVwZGF0ZUNvbnRleHQoY29udGV4dCk7XG5cbiAgICAgIC8vIFdlXG4gICAgICBjb25zdCBnYXAgPSBkYXRhSW5kZXggLSByb3dDb250ZXh0LmRhdGFJbmRleDtcbiAgICAgIGlmIChnYXAgPiAwKSB7XG4gICAgICAgIGNvbnN0IHNpYmxpbmdWaWV3UmVmID0gdGhpcy5maW5kVmlld1JlZihyZW5kZXJSb3dJbmRleCArIGdhcCk7XG4gICAgICAgIGNvbnN0IHNpYmxpbmdSb3dDb250ZXh0ID0gc2libGluZ1ZpZXdSZWYgJiYgc2libGluZ1ZpZXdSZWYuY29udGV4dC5wYmxSb3dDb250ZXh0IGFzIFBibFJvd0NvbnRleHQ8VD47XG4gICAgICAgIGlmIChzaWJsaW5nUm93Q29udGV4dCkge1xuICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHNpYmxpbmdSb3dDb250ZXh0LmlkZW50aXR5LCBzaWJsaW5nUm93Q29udGV4dC5nZXRTdGF0ZSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcm93Q29udGV4dDtcbiAgICB9XG4gICAgcm93Q29udGV4dC5mcm9tU3RhdGUodGhpcy5jYWNoZS5nZXQoaWRlbnRpdHkpKTtcblxuICAgIHJldHVybiByb3dDb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaWV3UmVjdCgpOiBDbGllbnRSZWN0IHwgRE9NUmVjdCB7XG4gICAgcmV0dXJuIHRoaXMuZXh0QXBpLmdyaWQudmlld3BvcnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0Rm9jdXNDaGFuZ2VkKGN1cnI6IFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnRbJ2N1cnInXSk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNDaGFuZ2VkJC5uZXh0KHtcbiAgICAgIHByZXY6IHRoaXMuZm9jdXNDaGFuZ2VkJC52YWx1ZS5jdXJyLFxuICAgICAgY3VycixcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmZvY3VzQ2hhbmdlZCQuY29tcGxldGUoKTtcbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLmNvbXBsZXRlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc091dE9mVmlldyh2aWV3UmVmOiBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxhbnk+Piwgdmlld1BvcnRSZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdCwgbG9jYXRpb24/OiAndG9wJyB8ICdib3R0b20nKTogYm9vbGVhbiB7XG4gIGNvbnN0IGVsOiBIVE1MRWxlbWVudCA9IHZpZXdSZWYucm9vdE5vZGVzWzBdO1xuICBjb25zdCByb3dDb250ZXh0ID0gdmlld1JlZi5jb250ZXh0LnBibFJvd0NvbnRleHQ7XG4gIGNvbnN0IGVsUmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGxldCBpc0luc2lkZU9mVmlldzogYm9vbGVhbjtcbiAgc3dpdGNoIChsb2NhdGlvbil7XG4gICAgY2FzZSAndG9wJzpcbiAgICAgIGlzSW5zaWRlT2ZWaWV3ID0gZWxSZWN0LmJvdHRvbSA+PSB2aWV3UG9ydFJlY3QudG9wO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYm90dG9tJzpcbiAgICAgIGlzSW5zaWRlT2ZWaWV3ID0gZWxSZWN0LnRvcCA8PSB2aWV3UG9ydFJlY3QuYm90dG9tO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGlzSW5zaWRlT2ZWaWV3ID0gKGVsUmVjdC5ib3R0b20gPj0gdmlld1BvcnRSZWN0LnRvcCAmJiBlbFJlY3QudG9wIDw9IHZpZXdQb3J0UmVjdC5ib3R0b20pXG4gICAgICBicmVhaztcbiAgfVxuXG4gIGlmIChpc0luc2lkZU9mVmlldykge1xuICAgIGlmICghcm93Q29udGV4dC5vdXRPZlZpZXcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcm93Q29udGV4dC5vdXRPZlZpZXcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICByb3dDb250ZXh0Lm91dE9mVmlldyA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG4iXX0=