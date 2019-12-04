/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, Subject, asapScheduler } from 'rxjs';
import { debounceTime, buffer, map, filter } from 'rxjs/operators';
import { removeFromArray } from '@pebula/utils';
import { findRowRenderedIndex, resolveCellReference } from './utils';
import { PblRowContext } from './row';
import { PblCellContext } from './cell';
/**
 * @template T
 */
export class ContextApi {
    /**
     * @param {?} extApi
     */
    constructor(extApi) {
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
        events => ({ prev: events[0].prev, curr: events[events.length - 1].curr }))));
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
        e => e.kind === 'onDestroy')))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this.destroy()));
        /** @type {?} */
        const updateContext = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const viewPortRect = this.getViewRect();
            /** @type {?} */
            const lastView = new Set(Array.from(this.viewCache.values()).map((/**
             * @param {?} v
             * @return {?}
             */
            v => v.identity)));
            /** @type {?} */
            const unmatchedRefs = new Map();
            /** @type {?} */
            let keepProcessOutOfView = !!viewPortRect;
            for (let i = 0, len = this.vcRef.length; i < len; i++) {
                /** @type {?} */
                const viewRef = this.findViewRef(i);
                /** @type {?} */
                const rowContext = this.findRowContext(viewRef, i);
                this.viewCache.set(i, rowContext);
                lastView.delete(rowContext.identity);
                // Identity did not change but context did change
                // This is probably due to trackBy with index reference or that matched data on some property but the actual data reference changed.
                // We log these and handle them later, they come in pair and we need to switch the context between the values in the pair.
                // The pair is a 2 item tuple - 1st item is new index, 2nd item is the old index.
                // We build the pairs, each pair is a switch
                if (viewRef.context.$implicit !== rowContext.$implicit) {
                    /** @type {?} */
                    let pair = unmatchedRefs.get(rowContext.$implicit) || [-1, -1];
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
                const arr = Array.from(unmatchedRefs.entries()).filter((/**
                 * @param {?} entry
                 * @return {?}
                 */
                entry => {
                    /** @type {?} */
                    const pair = entry[1];
                    if (pair[0] === -1) {
                        return false;
                    }
                    else if (pair[1] === -1) {
                        /** @type {?} */
                        const to = this.viewCache.get(pair[0]);
                        to.$implicit = entry[0];
                        return false;
                    }
                    return true;
                })).map((/**
                 * @param {?} entry
                 * @return {?}
                 */
                entry => entry[1]));
                unmatchedRefs.clear();
                if (arr.length) {
                    /** @type {?} */
                    const sortFn = arr[arr.length - 1][0] - arr[arr.length - 1][1] > 0 // check sort direction
                        ? (/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        (a, b) => b[1] - a[1])
                        : (/**
                         * @param {?} a
                         * @param {?} b
                         * @return {?}
                         */
                        (a, b) => a[1] - b[1]);
                    arr.sort(sortFn);
                    /** @type {?} */
                    const lastOp = {
                        data: this.viewCache.get(arr[0][0]).$implicit,
                        state: this.viewCache.get(arr[0][0]).getState(),
                        pair: arr.pop(),
                    };
                    for (const pair of arr) {
                        // What we're doing here is switching the context wrapped by `RotContext` while the `RowContext` preserve it's identity.
                        // Each row context has a state, which is valid for it's current context, if we switch context we must switch state as well and also
                        // cache it.
                        /** @type {?} */
                        const to = this.viewCache.get(pair[0]);
                        /** @type {?} */
                        const from = this.viewCache.get(pair[1]);
                        /** @type {?} */
                        const state = from.getState();
                        state.identity = to.identity;
                        this.cache.set(to.identity, state);
                        to.fromState(state);
                        to.$implicit = from.$implicit;
                    }
                    /** @type {?} */
                    const to = this.viewCache.get(lastOp.pair[0]);
                    lastOp.state.identity = to.identity;
                    this.cache.set(to.identity, lastOp.state);
                    to.fromState(lastOp.state);
                    to.$implicit = lastOp.data;
                }
            }
            if (viewPortRect) {
                for (let i = this.vcRef.length - 1; i > -1; i--) {
                    if (!processOutOfView(this.findViewRef(i), viewPortRect, 'bottom')) {
                        break;
                    }
                }
            }
            lastView.forEach((/**
             * @param {?} ident
             * @return {?}
             */
            ident => this.cache.get(ident).firstRender = false));
        });
        updateContext();
        extApi.cdkTable.onRenderRows.subscribe(updateContext);
    }
    /**
     * The reference to currently focused cell context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @return {?}
     */
    get focusedCell() {
        return this.activeFocused ? Object.assign({}, this.activeFocused) : undefined;
    }
    /**
     * The reference to currently selected range of cell's context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @return {?}
     */
    get selectedCells() {
        return this.activeSelected.slice();
    }
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param {?=} cellRef A Reference to the cell
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    focusCell(cellRef, markForCheck) {
        if (!cellRef || cellRef === true) {
            if (this.activeFocused) {
                const { rowIdent, colIndex } = this.activeFocused;
                this.activeFocused = undefined;
                this.updateState(rowIdent, colIndex, { focused: false });
                this.emitFocusChanged(this.activeFocused);
                if (markForCheck) {
                    /** @type {?} */
                    const rowContext = this.findRowInView(rowIdent);
                    if (rowContext) {
                        this.extApi.grid._cdkTable.syncRows('data', rowContext.index);
                    }
                }
            }
        }
        else {
            /** @type {?} */
            const ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
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
    }
    /**
     * Select all provided cells.
     * @param {?} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @param {?=} clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     * @return {?}
     */
    selectCells(cellRefs, markForCheck, clearCurrent) {
        /** @type {?} */
        const toMarkRendered = new Set();
        if (clearCurrent) {
            this.unselectCells();
        }
        /** @type {?} */
        const added = [];
        for (const cellRef of cellRefs) {
            /** @type {?} */
            const ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                if (!ref.selected && !this.extApi.grid.viewport.isScrolling) {
                    /** @type {?} */
                    const rowIdent = ref.rowContext.identity;
                    /** @type {?} */
                    const colIndex = ref.index;
                    this.updateState(rowIdent, colIndex, { selected: true });
                    /** @type {?} */
                    const dataPoint = { rowIdent, colIndex };
                    this.activeSelected.push(dataPoint);
                    added.push(dataPoint);
                    if (markForCheck) {
                        toMarkRendered.add(ref.rowContext.index);
                    }
                }
            }
            else if (ref) {
                const [rowState, colIndex] = ref;
                if (!rowState.cells[colIndex].selected) {
                    this.updateState(rowState.identity, colIndex, { selected: true });
                    this.activeSelected.push({ rowIdent: rowState.identity, colIndex });
                }
            }
        }
        if (toMarkRendered.size > 0) {
            this.extApi.grid._cdkTable.syncRows('data', ...Array.from(toMarkRendered.values()));
        }
        this.selectionChanged$.next({ added, removed: [] });
    }
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param {?=} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    unselectCells(cellRefs, markForCheck) {
        /** @type {?} */
        const toMarkRendered = new Set();
        /** @type {?} */
        let toUnselect = this.activeSelected;
        /** @type {?} */
        let removeAll = true;
        if (Array.isArray(cellRefs)) {
            toUnselect = cellRefs;
            removeAll = false;
        }
        else {
            markForCheck = !!cellRefs;
            this.activeSelected = [];
        }
        /** @type {?} */
        const removed = [];
        for (const cellRef of toUnselect) {
            /** @type {?} */
            const ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                if (ref.selected) {
                    /** @type {?} */
                    const rowIdent = ref.rowContext.identity;
                    /** @type {?} */
                    const colIndex = ref.index;
                    this.updateState(rowIdent, colIndex, { selected: false });
                    if (!removeAll) {
                        /** @type {?} */
                        const wasRemoved = removeFromArray(this.activeSelected, (/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.colIndex === colIndex && item.rowIdent === rowIdent));
                        if (wasRemoved) {
                            removed.push({ rowIdent, colIndex });
                        }
                    }
                    if (markForCheck) {
                        toMarkRendered.add(ref.rowContext.index);
                    }
                }
            }
            else if (ref) {
                const [rowState, colIndex] = ref;
                if (rowState.cells[colIndex].selected) {
                    this.updateState(rowState.identity, colIndex, { selected: false });
                    if (!removeAll) {
                        /** @type {?} */
                        const wasRemoved = removeFromArray(this.activeSelected, (/**
                         * @param {?} item
                         * @return {?}
                         */
                        item => item.colIndex === colIndex && item.rowIdent === rowState.identity));
                        if (wasRemoved) {
                            removed.push({ rowIdent: rowState.identity, colIndex });
                        }
                    }
                }
            }
        }
        if (toMarkRendered.size > 0) {
            this.extApi.grid._cdkTable.syncRows('data', ...Array.from(toMarkRendered.values()));
        }
        this.selectionChanged$.next({ added: [], removed });
    }
    /**
     * @return {?}
     */
    clear() {
        for (let i = 0, len = this.vcRef.length; i < len; i++) {
            /** @type {?} */
            const viewRef = this.findViewRef(i);
            viewRef.context.pblRowContext = undefined;
        }
        this.viewCache.clear();
        this.cache.clear();
    }
    /**
     * @param {?} row
     * @return {?}
     */
    getRow(row) {
        /** @type {?} */
        const index = typeof row === 'number' ? row : findRowRenderedIndex(row);
        return this.rowContext(index);
    }
    /**
     * @param {?} rowOrCellElement
     * @param {?=} col
     * @return {?}
     */
    getCell(rowOrCellElement, col) {
        if (typeof rowOrCellElement === 'number') {
            /** @type {?} */
            const rowContext = this.rowContext(rowOrCellElement);
            if (rowContext) {
                return rowContext.cell(col);
            }
        }
        else {
            /** @type {?} */
            const ref = resolveCellReference(rowOrCellElement, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                return ref;
            }
        }
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    getDataItem(cell) {
        /** @type {?} */
        const ref = resolveCellReference(cell, (/** @type {?} */ (this)));
        if (ref instanceof PblCellContext) {
            return ref.col.getValue(ref.rowContext.$implicit);
        }
        else if (ref) {
            /** @type {?} */
            const row = this.extApi.grid.ds.source[ref[0].dataIndex];
            /** @type {?} */
            const column = this.extApi.grid.columnApi.findColumnAt(ref[1]);
            return column.getValue(row);
        }
    }
    /**
     * @param {?} renderRowIndex
     * @param {?} column
     * @return {?}
     */
    createCellContext(renderRowIndex, column) {
        /** @type {?} */
        const rowContext = this.rowContext(renderRowIndex);
        /** @type {?} */
        const colIndex = this.columnApi.indexOf(column);
        return rowContext.cell(colIndex);
    }
    /**
     * @param {?} renderRowIndex
     * @return {?}
     */
    rowContext(renderRowIndex) {
        return this.viewCache.get(renderRowIndex);
    }
    /**
     * @param {?} rowContext
     * @return {?}
     */
    updateOutOfViewState(rowContext) {
        /** @type {?} */
        const viewPortRect = this.getViewRect();
        /** @type {?} */
        const viewRef = this.findViewRef(rowContext.index);
        processOutOfView(viewRef, viewPortRect);
    }
    /**
     * @param {?} rowIdentity
     * @param {?} rowStateOrCellIndex
     * @param {?=} cellState
     * @return {?}
     */
    updateState(rowIdentity, rowStateOrCellIndex, cellState) {
        /** @type {?} */
        const currentRowState = this.cache.get(rowIdentity);
        if (currentRowState) {
            if (typeof rowStateOrCellIndex === 'number') {
                /** @type {?} */
                const currentCellState = currentRowState.cells[rowStateOrCellIndex];
                if (currentCellState) {
                    Object.assign(currentCellState, cellState);
                }
            }
            else {
                Object.assign(currentRowState, rowStateOrCellIndex);
            }
            /** @type {?} */
            const rowContext = this.findRowInView(rowIdentity);
            if (rowContext) {
                rowContext.fromState(currentRowState);
            }
        }
    }
    /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    findRowInView(rowIdentity) {
        /** @type {?} */
        const rowState = this.cache.get(rowIdentity);
        if (rowState) {
            /** @type {?} */
            const renderRowIndex = rowState.dataIndex - this.extApi.grid.ds.renderStart;
            /** @type {?} */
            const rowContext = this.viewCache.get(renderRowIndex);
            if (rowContext && rowContext.identity === rowIdentity) {
                return rowContext;
            }
        }
    }
    /**
     * @param {?} rowIdentity
     * @param {?=} offset
     * @param {?=} create
     * @return {?}
     */
    findRowInCache(rowIdentity, offset, create) {
        /** @type {?} */
        const rowState = this.cache.get(rowIdentity);
        if (!offset) {
            return rowState;
        }
        else {
            /** @type {?} */
            const dataIndex = rowState.dataIndex + offset;
            /** @type {?} */
            const identity = this.getRowIdentity(dataIndex);
            if (identity !== null) {
                /** @type {?} */
                let result = this.findRowInCache(identity);
                if (!result && create && dataIndex < this.extApi.grid.ds.length) {
                    result = PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length);
                    this.cache.set(identity, result);
                }
                return result;
            }
        }
    }
    /**
     * @param {?} dataIndex
     * @param {?=} context
     * @return {?}
     */
    getRowIdentity(dataIndex, context) {
        const { ds } = this.extApi.grid;
        const { primary } = this.extApi.columnStore;
        /** @type {?} */
        const row = context ? context.$implicit : ds.source[dataIndex];
        if (!row) {
            return null;
        }
        else {
            return primary ? primary.getValue(row) : dataIndex;
        }
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    findViewRef(index) {
        return (/** @type {?} */ (this.vcRef.get(index)));
    }
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
    findRowContext(viewRef, renderRowIndex) {
        const { context } = viewRef;
        /** @type {?} */
        const dataIndex = this.extApi.grid.ds.renderStart + renderRowIndex;
        /** @type {?} */
        const identity = this.getRowIdentity(dataIndex, viewRef.context);
        /** @type {?} */
        let rowContext = (/** @type {?} */ (context.pblRowContext));
        if (!this.cache.has(identity)) {
            this.cache.set(identity, PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length));
        }
        if (!rowContext) {
            rowContext = context.pblRowContext = new PblRowContext(identity, dataIndex, this.extApi);
            rowContext.updateContext(context);
            viewRef.onDestroy((/**
             * @return {?}
             */
            () => {
                this.viewCache.delete(renderRowIndex);
                context.pblRowContext = undefined;
            }));
        }
        else if (rowContext.identity !== identity) {
            // save old state before applying new state
            this.cache.set(rowContext.identity, rowContext.getState());
            rowContext.updateContext(context);
            // We
            /** @type {?} */
            const gap = dataIndex - rowContext.dataIndex;
            if (gap > 0) {
                /** @type {?} */
                const siblingViewRef = this.findViewRef(renderRowIndex + gap);
                /** @type {?} */
                const siblingRowContext = siblingViewRef && (/** @type {?} */ (siblingViewRef.context.pblRowContext));
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
    }
    /**
     * @private
     * @return {?}
     */
    getViewRect() {
        return this.extApi.grid.viewport.elementRef.nativeElement.getBoundingClientRect();
    }
    /**
     * @private
     * @param {?} curr
     * @return {?}
     */
    emitFocusChanged(curr) {
        this.focusChanged$.next({
            prev: this.focusChanged$.value.curr,
            curr,
        });
    }
    /**
     * @private
     * @return {?}
     */
    destroy() {
        this.focusChanged$.complete();
        this.selectionChanged$.complete();
    }
}
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
    const el = viewRef.rootNodes[0];
    /** @type {?} */
    const rowContext = viewRef.context.pblRowContext;
    /** @type {?} */
    const elRect = el.getBoundingClientRect();
    /** @type {?} */
    let isInsideOfView;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbnRleHQvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBYyxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0UsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS25FLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFjaEQsT0FBTyxFQUF5QixvQkFBb0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM1RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7QUFFeEMsTUFBTSxPQUFPLFVBQVU7Ozs7SUFpRHJCLFlBQW9CLE1BQStCO1FBQS9CLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBaEQzQyxjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQTRCLENBQUM7UUFDaEQsVUFBSyxHQUFHLElBQUksR0FBRyxFQUEyQixDQUFDO1FBSzNDLG1CQUFjLEdBQW9CLEVBQUUsQ0FBQztRQUNyQyxrQkFBYSxHQUFHLElBQUksZUFBZSxDQUE0QixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDckcsc0JBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQWlDLENBQUM7Ozs7OztRQU9oRSxpQkFBWSxHQUEwQyxJQUFJLENBQUMsYUFBYTthQUM5RSxJQUFJLENBQ0gsTUFBTSxDQUE0QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFDMUYsR0FBRzs7OztRQUFFLE1B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Q25ELE1BQU07UUFDUixLQUFLLFFBQVE7WUFDWCxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDO1lBQ25ELE1BQU07UUFDUjtZQUNFLGNBQWMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6RixNQUFNO0tBQ1Q7SUFFRCxJQUFJLGNBQWMsRUFBRTtRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsVUFBVSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7S0FDOUI7U0FBTTtRQUNMLFVBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0tBQzdCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBTdWJqZWN0LCBPYnNlcnZhYmxlLCBhc2FwU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGJ1ZmZlciwgbWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYsIEVtYmVkZGVkVmlld1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IHJlbW92ZUZyb21BcnJheSB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7XG4gIFJvd0NvbnRleHRTdGF0ZSxcbiAgQ2VsbENvbnRleHRTdGF0ZSxcbiAgUGJsTmdyaWRDZWxsQ29udGV4dCxcbiAgUGJsTmdyaWRSb3dDb250ZXh0LFxuICBDZWxsUmVmZXJlbmNlLFxuICBHcmlkRGF0YVBvaW50LFxuICBQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50LFxuICBQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IENvbHVtbkFwaSB9IGZyb20gJy4uL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgZmluZENlbGxSZW5kZXJlZEluZGV4LCBmaW5kUm93UmVuZGVyZWRJbmRleCwgcmVzb2x2ZUNlbGxSZWZlcmVuY2UgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbmV4cG9ydCBjbGFzcyBDb250ZXh0QXBpPFQgPSBhbnk+IHtcbiAgcHJpdmF0ZSB2aWV3Q2FjaGUgPSBuZXcgTWFwPG51bWJlciwgUGJsUm93Q29udGV4dDxUPj4oKTtcbiAgcHJpdmF0ZSBjYWNoZSA9IG5ldyBNYXA8YW55LCBSb3dDb250ZXh0U3RhdGU8VD4+KCk7XG4gIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG4gIHByaXZhdGUgY29sdW1uQXBpOiBDb2x1bW5BcGk8VD47XG5cbiAgcHJpdmF0ZSBhY3RpdmVGb2N1c2VkOiBHcmlkRGF0YVBvaW50O1xuICBwcml2YXRlIGFjdGl2ZVNlbGVjdGVkOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcbiAgcHJpdmF0ZSBmb2N1c0NoYW5nZWQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50Pih7IHByZXY6IHVuZGVmaW5lZCwgY3VycjogdW5kZWZpbmVkIH0pO1xuICBwcml2YXRlIHNlbGVjdGlvbkNoYW5nZWQkID0gbmV3IFN1YmplY3Q8UGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBmb2N1cyBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhlIG5vdGlmaWNhdGlvbiBpcyBub3QgaW1tZWRpYXRlLCBpdCB3aWxsIG9jY3VyIG9uIHRoZSBjbG9zZXN0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNoYW5nZS5cbiAgICovXG4gIHJlYWRvbmx5IGZvY3VzQ2hhbmdlZDogT2JzZXJ2YWJsZTxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50PiA9IHRoaXMuZm9jdXNDaGFuZ2VkJFxuICAgIC5waXBlKFxuICAgICAgYnVmZmVyPFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQ+KHRoaXMuZm9jdXNDaGFuZ2VkJC5waXBlKGRlYm91bmNlVGltZSgwLCBhc2FwU2NoZWR1bGVyKSkpLFxuICAgICAgbWFwKCBldmVudHMgPT4gKHsgcHJldjogZXZlbnRzWzBdLnByZXYsIGN1cnI6IGV2ZW50c1tldmVudHMubGVuZ3RoIC0gMV0uY3VyciB9KSApXG4gICAgKTtcblxuICAvKipcbiAgICogTm90aWZ5IHdoZW4gdGhlIHNlbGVjdGVkIGNlbGxzIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlZDogT2JzZXJ2YWJsZTxQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudD4gPSB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgY29udGV4dC5cbiAgICogWW91IGNhbiByZXRyaWV2ZSB0aGUgYWN0dWFsIGNvbnRleHQgb3IgY29udGV4dCBjZWxsIHVzaW5nIGBmaW5kUm93SW5WaWV3YCBhbmQgLyBvciBgZmluZFJvd0luQ2FjaGVgLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgZG9lcyBub3QgaGF2ZSB0byBleGlzdCBpbiB0aGUgdmlldy5cbiAgICogSWYgdGhpcyBpcyB0aGUgY2FzZSBgZmluZFJvd0luVmlld2Agd2lsbCByZXR1cm4gdW5kZWZpbmVkLCB1c2UgYGZpbmRSb3dJbkNhY2hlYCBpbnN0ZWFkLlxuICAgKi9cbiAgZ2V0IGZvY3VzZWRDZWxsKCk6IEdyaWREYXRhUG9pbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUZvY3VzZWQgPyB7Li4udGhpcy5hY3RpdmVGb2N1c2VkIH0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgc2VsZWN0ZWQgcmFuZ2Ugb2YgY2VsbCdzIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMgZG9lcyBub3QgaGF2ZSB0byBleGlzdCBpbiB0aGUgdmlldy5cbiAgICogSWYgdGhpcyBpcyB0aGUgY2FzZSBgZmluZFJvd0luVmlld2Agd2lsbCByZXR1cm4gdW5kZWZpbmVkLCB1c2UgYGZpbmRSb3dJbkNhY2hlYCBpbnN0ZWFkLlxuICAgKi9cbiAgZ2V0IHNlbGVjdGVkQ2VsbHMoKTogR3JpZERhdGFQb2ludFtdIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVTZWxlY3RlZC5zbGljZSgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgdGhpcy52Y1JlZiA9IGV4dEFwaS5jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgdGhpcy5jb2x1bW5BcGkgPSBleHRBcGkuZ3JpZC5jb2x1bW5BcGk7XG5cbiAgICBleHRBcGkuZXZlbnRzXG4gICAgICAucGlwZSggZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uRGVzdHJveScgKSApXG4gICAgICAuc3Vic2NyaWJlKCBlID0+IHRoaXMuZGVzdHJveSgpICk7XG5cbiAgICBjb25zdCB1cGRhdGVDb250ZXh0ID0gKCkgPT4ge1xuICAgICAgY29uc3Qgdmlld1BvcnRSZWN0ID0gdGhpcy5nZXRWaWV3UmVjdCgpO1xuICAgICAgY29uc3QgbGFzdFZpZXcgPSBuZXcgU2V0KEFycmF5LmZyb20odGhpcy52aWV3Q2FjaGUudmFsdWVzKCkpLm1hcCggdiA9PiB2LmlkZW50aXR5ICkpO1xuICAgICAgY29uc3QgdW5tYXRjaGVkUmVmcyA9IG5ldyBNYXA8VCwgW251bWJlciwgbnVtYmVyXT4oKTtcblxuICAgICAgbGV0IGtlZXBQcm9jZXNzT3V0T2ZWaWV3ID0gISF2aWV3UG9ydFJlY3Q7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy52Y1JlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5maW5kVmlld1JlZihpKTtcbiAgICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMuZmluZFJvd0NvbnRleHQodmlld1JlZiwgaSk7XG4gICAgICAgIHRoaXMudmlld0NhY2hlLnNldChpLCByb3dDb250ZXh0KTtcbiAgICAgICAgbGFzdFZpZXcuZGVsZXRlKHJvd0NvbnRleHQuaWRlbnRpdHkpO1xuXG4gICAgICAgIC8vIElkZW50aXR5IGRpZCBub3QgY2hhbmdlIGJ1dCBjb250ZXh0IGRpZCBjaGFuZ2VcbiAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBkdWUgdG8gdHJhY2tCeSB3aXRoIGluZGV4IHJlZmVyZW5jZSBvciB0aGF0IG1hdGNoZWQgZGF0YSBvbiBzb21lIHByb3BlcnR5IGJ1dCB0aGUgYWN0dWFsIGRhdGEgcmVmZXJlbmNlIGNoYW5nZWQuXG4gICAgICAgIC8vIFdlIGxvZyB0aGVzZSBhbmQgaGFuZGxlIHRoZW0gbGF0ZXIsIHRoZXkgY29tZSBpbiBwYWlyIGFuZCB3ZSBuZWVkIHRvIHN3aXRjaCB0aGUgY29udGV4dCBiZXR3ZWVuIHRoZSB2YWx1ZXMgaW4gdGhlIHBhaXIuXG5cbiAgICAgICAgLy8gVGhlIHBhaXIgaXMgYSAyIGl0ZW0gdHVwbGUgLSAxc3QgaXRlbSBpcyBuZXcgaW5kZXgsIDJuZCBpdGVtIGlzIHRoZSBvbGQgaW5kZXguXG4gICAgICAgIC8vIFdlIGJ1aWxkIHRoZSBwYWlycywgZWFjaCBwYWlyIGlzIGEgc3dpdGNoXG4gICAgICAgIGlmICh2aWV3UmVmLmNvbnRleHQuJGltcGxpY2l0ICE9PSByb3dDb250ZXh0LiRpbXBsaWNpdCkge1xuICAgICAgICAgIGxldCBwYWlyID0gdW5tYXRjaGVkUmVmcy5nZXQocm93Q29udGV4dC4kaW1wbGljaXQpIHx8IFstMSwgLTFdO1xuICAgICAgICAgIHBhaXJbMV0gPSBpO1xuICAgICAgICAgIHVubWF0Y2hlZFJlZnMuc2V0KHJvd0NvbnRleHQuJGltcGxpY2l0LCBwYWlyKTtcblxuICAgICAgICAgIHBhaXIgPSB1bm1hdGNoZWRSZWZzLmdldCh2aWV3UmVmLmNvbnRleHQuJGltcGxpY2l0KSB8fCBbLTEsIC0xXTtcbiAgICAgICAgICBwYWlyWzBdID0gaTtcbiAgICAgICAgICB1bm1hdGNoZWRSZWZzLnNldCh2aWV3UmVmLmNvbnRleHQuJGltcGxpY2l0LCBwYWlyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZWVwUHJvY2Vzc091dE9mVmlldykge1xuICAgICAgICAgIGtlZXBQcm9jZXNzT3V0T2ZWaWV3ID0gcHJvY2Vzc091dE9mVmlldyh2aWV3UmVmLCB2aWV3UG9ydFJlY3QsICd0b3AnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodW5tYXRjaGVkUmVmcy5zaXplID4gMCkge1xuICAgICAgICAvLyBXZSBoYXZlIHBhaXJzIGJ1dCB3ZSBjYW4ndCBqdXN0IHN0YXJ0IHN3aXRjaGluZyBiZWNhdXNlIHdoZW4gdGhlIGl0ZW1zIG1vdmUgb3Igc3dhcCB3ZSBuZWVkXG4gICAgICAgIC8vIHRvIHVwZGF0ZSB0aGVpciB2YWx1ZXMgYW5kIHNvIHdlIG5lZWQgdG8gY2FjaGUgb25lIG9mIHRoZW0uXG4gICAgICAgIC8vIFRoZSBvcGVyYXRpb24gd2lsbCBlZmZlY3QgYWxsIGl0ZW1zIChOKSBiZXR3ZWVuIHRoZW4gb3JpZ2luIGFuZCBkZXN0aW5hdGlvbi5cbiAgICAgICAgLy8gV2hlbiBOID09PSAyIGl0cyBhIHN3YXAsIHdoZW4gTiA+IDIgaXRzIGEgbW92ZS5cbiAgICAgICAgLy8gSW4gYm90aCBjYXNlcyB0aGUgZmlyc3QgYW5kIGxhc3Qgb3BlcmF0aW9ucyBzaGFyZSB0aGUgc2FtZSBvYmplY3QuXG4gICAgICAgIC8vIEFsc28sIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIG9yZGVyIG9mIG9wZXJhdGlvbnMgZG9lcyBub3QgdXNlIHRoZSBzYW1lIHJvdyBhcyB0aGUgc291cmNlIG1vcmUgdGhlbiBvbmNlLlxuICAgICAgICAvLyBGb3IgZXhhbXBsZSwgSWYgSSBjb3B5IHJvdyA1IHRvIHRvIHJvdyA0IGFuZCB0aGVuIDQgdG8gMyBJIG5lZWQgdG8gc3RhcnQgZnJvbSAzLT40LT41LCBpZiBJIGRvIDUtPjQtPjMgSSB3aWxsIGdldCA1IGluIGFsbCByb3dzLlxuICAgICAgICAvL1xuICAgICAgICAvLyBXZSB1c2UgdGhlIHNvdXJjZSAocGFpclsxXSkgZm9yIHNvcnRpbmcsIHRoZSBzb3J0IG9yZGVyIGRlcGVuZHMgb24gdGhlIGRpcmVjdGlvbiBvZiB0aGUgbW92ZSAodXAvZG93bikuXG4gICAgICAgIGNvbnN0IGFyciA9IEFycmF5LmZyb20odW5tYXRjaGVkUmVmcy5lbnRyaWVzKCkpLmZpbHRlciggZW50cnkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhaXIgPSBlbnRyeVsxXTtcbiAgICAgICAgICBpZiAocGFpclswXSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhaXJbMV0gPT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCB0byA9IHRoaXMudmlld0NhY2hlLmdldChwYWlyWzBdKTtcbiAgICAgICAgICAgIHRvLiRpbXBsaWNpdCA9IGVudHJ5WzBdO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSkubWFwKCBlbnRyeSA9PiBlbnRyeVsxXSApO1xuXG4gICAgICAgIHVubWF0Y2hlZFJlZnMuY2xlYXIoKTtcblxuICAgICAgICBpZiAoYXJyLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IHNvcnRGbiA9IGFyclthcnIubGVuZ3RoIC0gMV1bMF0gLSBhcnJbYXJyLmxlbmd0aCAtIDFdWzFdID4gMCAvLyBjaGVjayBzb3J0IGRpcmVjdGlvblxuICAgICAgICAgICAgPyAoYSxiKSA9PiBiWzFdIC0gYVsxXVxuICAgICAgICAgICAgOiAoYSxiKSA9PiBhWzFdIC0gYlsxXVxuICAgICAgICAgIDtcbiAgICAgICAgICBhcnIuc29ydChzb3J0Rm4pO1xuXG4gICAgICAgICAgY29uc3QgbGFzdE9wID0ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy52aWV3Q2FjaGUuZ2V0KGFyclswXVswXSkuJGltcGxpY2l0LFxuICAgICAgICAgICAgc3RhdGU6IHRoaXMudmlld0NhY2hlLmdldChhcnJbMF1bMF0pLmdldFN0YXRlKCksXG4gICAgICAgICAgICBwYWlyOiBhcnIucG9wKCksXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZvciAoY29uc3QgcGFpciBvZiBhcnIpIHtcbiAgICAgICAgICAgIC8vIFdoYXQgd2UncmUgZG9pbmcgaGVyZSBpcyBzd2l0Y2hpbmcgdGhlIGNvbnRleHQgd3JhcHBlZCBieSBgUm90Q29udGV4dGAgd2hpbGUgdGhlIGBSb3dDb250ZXh0YCBwcmVzZXJ2ZSBpdCdzIGlkZW50aXR5LlxuICAgICAgICAgICAgLy8gRWFjaCByb3cgY29udGV4dCBoYXMgYSBzdGF0ZSwgd2hpY2ggaXMgdmFsaWQgZm9yIGl0J3MgY3VycmVudCBjb250ZXh0LCBpZiB3ZSBzd2l0Y2ggY29udGV4dCB3ZSBtdXN0IHN3aXRjaCBzdGF0ZSBhcyB3ZWxsIGFuZCBhbHNvXG4gICAgICAgICAgICAvLyBjYWNoZSBpdC5cbiAgICAgICAgICAgIGNvbnN0IHRvID0gdGhpcy52aWV3Q2FjaGUuZ2V0KHBhaXJbMF0pO1xuICAgICAgICAgICAgY29uc3QgZnJvbSA9IHRoaXMudmlld0NhY2hlLmdldChwYWlyWzFdKTtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gZnJvbS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgc3RhdGUuaWRlbnRpdHkgPSB0by5pZGVudGl0eTtcbiAgICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHRvLmlkZW50aXR5LCBzdGF0ZSk7XG4gICAgICAgICAgICB0by5mcm9tU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgdG8uJGltcGxpY2l0ID0gZnJvbS4kaW1wbGljaXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdG8gPSB0aGlzLnZpZXdDYWNoZS5nZXQobGFzdE9wLnBhaXJbMF0pO1xuICAgICAgICAgIGxhc3RPcC5zdGF0ZS5pZGVudGl0eSA9IHRvLmlkZW50aXR5O1xuICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KHRvLmlkZW50aXR5LCBsYXN0T3Auc3RhdGUpO1xuICAgICAgICAgIHRvLmZyb21TdGF0ZShsYXN0T3Auc3RhdGUpO1xuICAgICAgICAgIHRvLiRpbXBsaWNpdCA9IGxhc3RPcC5kYXRhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHZpZXdQb3J0UmVjdCkge1xuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy52Y1JlZi5sZW5ndGggLTE7IGkgPiAtMTsgaS0tKSB7XG4gICAgICAgICAgaWYgKCFwcm9jZXNzT3V0T2ZWaWV3KHRoaXMuZmluZFZpZXdSZWYoaSksIHZpZXdQb3J0UmVjdCwgJ2JvdHRvbScpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGFzdFZpZXcuZm9yRWFjaCggaWRlbnQgPT4gdGhpcy5jYWNoZS5nZXQoaWRlbnQpLmZpcnN0UmVuZGVyID0gZmFsc2UgKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlQ29udGV4dCgpO1xuICAgIGV4dEFwaS5jZGtUYWJsZS5vblJlbmRlclJvd3Muc3Vic2NyaWJlKHVwZGF0ZUNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBwcm92aWRlZCBjZWxsLlxuICAgKiBJZiBhIGNlbGwgaXMgbm90IHByb3ZpZGVkIHdpbGwgdW4tZm9jdXMgKGJsdXIpIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIChpZiB0aGVyZSBpcyBvbmUpLlxuICAgKiBAcGFyYW0gY2VsbFJlZiBBIFJlZmVyZW5jZSB0byB0aGUgY2VsbFxuICAgKiBAcGFyYW0gbWFya0ZvckNoZWNrIE1hcmsgdGhlIHJvdyBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgZm9jdXNDZWxsKGNlbGxSZWY/OiBDZWxsUmVmZXJlbmNlIHwgYm9vbGVhbiwgbWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghY2VsbFJlZiB8fCBjZWxsUmVmID09PSB0cnVlKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVGb2N1c2VkKSB7XG4gICAgICAgIGNvbnN0IHsgcm93SWRlbnQsIGNvbEluZGV4IH0gPSB0aGlzLmFjdGl2ZUZvY3VzZWQ7XG4gICAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyb3dJZGVudCwgY29sSW5kZXgsIHsgZm9jdXNlZDogZmFsc2UgfSk7XG4gICAgICAgIHRoaXMuZW1pdEZvY3VzQ2hhbmdlZCh0aGlzLmFjdGl2ZUZvY3VzZWQpO1xuICAgICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMuZmluZFJvd0luVmlldyhyb3dJZGVudCk7XG4gICAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuZXh0QXBpLmdyaWQuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgcm93Q29udGV4dC5pbmRleCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJlZiA9IHJlc29sdmVDZWxsUmVmZXJlbmNlKGNlbGxSZWYsIHRoaXMgYXMgYW55KTtcbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgdGhpcy5mb2N1c0NlbGwobWFya0ZvckNoZWNrKTtcbiAgICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIFBibENlbGxDb250ZXh0KSB7XG4gICAgICAgICAgaWYgKCFyZWYuZm9jdXNlZCAmJiAhdGhpcy5leHRBcGkuZ3JpZC52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0ZShyZWYucm93Q29udGV4dC5pZGVudGl0eSwgcmVmLmluZGV4LCB7IGZvY3VzZWQ6IHRydWUgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRm9jdXNlZCA9IHsgcm93SWRlbnQ6IHJlZi5yb3dDb250ZXh0LmlkZW50aXR5LCBjb2xJbmRleDogcmVmLmluZGV4IH07XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0Q2VsbHMoIFsgdGhpcy5hY3RpdmVGb2N1c2VkIF0sIG1hcmtGb3JDaGVjaywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgICAgICAgdGhpcy5leHRBcGkuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCByZWYucm93Q29udGV4dC5pbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocmVmWzBdLmlkZW50aXR5LCByZWZbMV0sIHsgZm9jdXNlZDogdHJ1ZSB9KTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUZvY3VzZWQgPSB7IHJvd0lkZW50OiByZWZbMF0uaWRlbnRpdHksIGNvbEluZGV4OiByZWZbMV0gfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXRGb2N1c0NoYW5nZWQodGhpcy5hY3RpdmVGb2N1c2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCBwcm92aWRlZCBjZWxscy5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogQHBhcmFtIGNsZWFyQ3VycmVudCBDbGVhciB0aGUgY3VycmVudCBzZWxlY3Rpb24gYmVmb3JlIGFwcGx5aW5nIHRoZSBuZXcgc2VsZWN0aW9uLlxuICAgKiBEZWZhdWx0IHRvIGZhbHNlIChhZGQgdG8gY3VycmVudCkuXG4gICAqL1xuICBzZWxlY3RDZWxscyhjZWxsUmVmczogQ2VsbFJlZmVyZW5jZVtdLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuLCBjbGVhckN1cnJlbnQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdG9NYXJrUmVuZGVyZWQgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICAgIGlmIChjbGVhckN1cnJlbnQpIHtcbiAgICAgIHRoaXMudW5zZWxlY3RDZWxscygpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZGVkOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgY2VsbFJlZiBvZiBjZWxsUmVmcykge1xuICAgICAgY29uc3QgcmVmID0gcmVzb2x2ZUNlbGxSZWZlcmVuY2UoY2VsbFJlZiwgdGhpcyBhcyBhbnkpO1xuICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIFBibENlbGxDb250ZXh0KSB7XG4gICAgICAgIGlmICghcmVmLnNlbGVjdGVkICYmICF0aGlzLmV4dEFwaS5ncmlkLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgY29uc3Qgcm93SWRlbnQgPSByZWYucm93Q29udGV4dC5pZGVudGl0eVxuICAgICAgICAgIGNvbnN0IGNvbEluZGV4ID0gcmVmLmluZGV4O1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUocm93SWRlbnQsIGNvbEluZGV4LCB7IHNlbGVjdGVkOiB0cnVlIH0pO1xuXG4gICAgICAgICAgY29uc3QgZGF0YVBvaW50ID0geyByb3dJZGVudCwgY29sSW5kZXggfTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkLnB1c2goZGF0YVBvaW50KTtcbiAgICAgICAgICBhZGRlZC5wdXNoKGRhdGFQb2ludCk7XG5cbiAgICAgICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgICAgICB0b01hcmtSZW5kZXJlZC5hZGQocmVmLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChyZWYpIHtcbiAgICAgICAgY29uc3QgWyByb3dTdGF0ZSwgY29sSW5kZXggXSA9IHJlZjtcbiAgICAgICAgaWYgKCFyb3dTdGF0ZS5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogdHJ1ZSB9KTtcbiAgICAgICAgICB0aGlzLmFjdGl2ZVNlbGVjdGVkLnB1c2goIHsgcm93SWRlbnQ6IHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCB9ICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodG9NYXJrUmVuZGVyZWQuc2l6ZSA+IDApIHtcbiAgICAgIHRoaXMuZXh0QXBpLmdyaWQuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgLi4uQXJyYXkuZnJvbSh0b01hcmtSZW5kZXJlZC52YWx1ZXMoKSkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCQubmV4dCh7IGFkZGVkLCByZW1vdmVkOiBbXSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIElmIGNlbGxzIGFyZSBub3QgcHJvdmlkZWQgd2lsbCB1bi1zZWxlY3QgYWxsIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxscy5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIHVuc2VsZWN0Q2VsbHMoY2VsbFJlZnM/OiBDZWxsUmVmZXJlbmNlW10gfCBib29sZWFuLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgdG9NYXJrUmVuZGVyZWQgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICBsZXQgdG9VbnNlbGVjdDogQ2VsbFJlZmVyZW5jZVtdID0gdGhpcy5hY3RpdmVTZWxlY3RlZDtcbiAgICBsZXQgcmVtb3ZlQWxsID0gdHJ1ZTtcblxuICAgIGlmKEFycmF5LmlzQXJyYXkoY2VsbFJlZnMpKSB7XG4gICAgICB0b1Vuc2VsZWN0ID0gY2VsbFJlZnM7XG4gICAgICByZW1vdmVBbGwgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWFya0ZvckNoZWNrID0gISFjZWxsUmVmcztcbiAgICAgIHRoaXMuYWN0aXZlU2VsZWN0ZWQgPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVkOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgY2VsbFJlZiBvZiB0b1Vuc2VsZWN0KSB7XG4gICAgICBjb25zdCByZWYgPSByZXNvbHZlQ2VsbFJlZmVyZW5jZShjZWxsUmVmLCB0aGlzIGFzIGFueSk7XG4gICAgICBpZiAocmVmIGluc3RhbmNlb2YgUGJsQ2VsbENvbnRleHQpIHtcbiAgICAgICAgaWYgKHJlZi5zZWxlY3RlZCkge1xuICAgICAgICAgIGNvbnN0IHJvd0lkZW50ID0gcmVmLnJvd0NvbnRleHQuaWRlbnRpdHlcbiAgICAgICAgICBjb25zdCBjb2xJbmRleCA9IHJlZi5pbmRleDtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd0lkZW50LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogZmFsc2UgfSk7XG4gICAgICAgICAgaWYgKCFyZW1vdmVBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhc1JlbW92ZWQgPSByZW1vdmVGcm9tQXJyYXkodGhpcy5hY3RpdmVTZWxlY3RlZCwgaXRlbSA9PiBpdGVtLmNvbEluZGV4ID09PSBjb2xJbmRleCAmJiBpdGVtLnJvd0lkZW50ID09PSByb3dJZGVudCk7XG4gICAgICAgICAgICBpZiAod2FzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICByZW1vdmVkLnB1c2goeyByb3dJZGVudCwgY29sSW5kZXggfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICAgICAgdG9NYXJrUmVuZGVyZWQuYWRkKHJlZi5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIGNvbnN0IFsgcm93U3RhdGUsIGNvbEluZGV4IF0gPSByZWY7XG4gICAgICAgIGlmIChyb3dTdGF0ZS5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleCwgeyBzZWxlY3RlZDogZmFsc2UgfSk7XG4gICAgICAgICAgaWYgKCFyZW1vdmVBbGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHdhc1JlbW92ZWQgPSByZW1vdmVGcm9tQXJyYXkodGhpcy5hY3RpdmVTZWxlY3RlZCwgaXRlbSA9PiBpdGVtLmNvbEluZGV4ID09PSBjb2xJbmRleCAmJiBpdGVtLnJvd0lkZW50ID09PSByb3dTdGF0ZS5pZGVudGl0eSk7XG4gICAgICAgICAgICBpZiAod2FzUmVtb3ZlZCkge1xuICAgICAgICAgICAgICByZW1vdmVkLnB1c2goeyByb3dJZGVudDogcm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4IH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvTWFya1JlbmRlcmVkLnNpemUgPiAwKSB7XG4gICAgICB0aGlzLmV4dEFwaS5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScsIC4uLkFycmF5LmZyb20odG9NYXJrUmVuZGVyZWQudmFsdWVzKCkpKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZWQkLm5leHQoeyBhZGRlZDogW10sIHJlbW92ZWQgfSk7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy52Y1JlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuZmluZFZpZXdSZWYoaSk7XG4gICAgICB2aWV3UmVmLmNvbnRleHQucGJsUm93Q29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy52aWV3Q2FjaGUuY2xlYXIoKTtcbiAgICB0aGlzLmNhY2hlLmNsZWFyKCk7XG4gIH1cblxuICBnZXRSb3cocm93OiBudW1iZXIgfCBIVE1MRWxlbWVudCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaW5kZXggPSB0eXBlb2Ygcm93ID09PSAnbnVtYmVyJyA/IHJvdyA6IGZpbmRSb3dSZW5kZXJlZEluZGV4KHJvdyk7XG4gICAgcmV0dXJuIHRoaXMucm93Q29udGV4dChpbmRleCk7XG4gIH1cblxuICBnZXRDZWxsKGNlbGw6IEhUTUxFbGVtZW50IHwgR3JpZERhdGFQb2ludCk6IFBibE5ncmlkQ2VsbENvbnRleHQgfCB1bmRlZmluZWRcbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY2VsbCBjb250ZXh0IGZvciB0aGUgY2VsbCBhdCB0aGUgcG9pbnQgc3BlY2lmaWVkXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbFxuICAgKi9cbiAgZ2V0Q2VsbChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkO1xuICBnZXRDZWxsKHJvd09yQ2VsbEVsZW1lbnQ6IG51bWJlciB8IEhUTUxFbGVtZW50IHwgR3JpZERhdGFQb2ludCwgY29sPzogbnVtYmVyKTogUGJsTmdyaWRDZWxsQ29udGV4dCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHR5cGVvZiByb3dPckNlbGxFbGVtZW50ID09PSAnbnVtYmVyJykge1xuICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMucm93Q29udGV4dChyb3dPckNlbGxFbGVtZW50KTtcbiAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiByb3dDb250ZXh0LmNlbGwoY29sKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmVmID0gcmVzb2x2ZUNlbGxSZWZlcmVuY2Uocm93T3JDZWxsRWxlbWVudCwgdGhpcyBhcyBhbnkpO1xuICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIFBibENlbGxDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiByZWY7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0RGF0YUl0ZW0oY2VsbDogQ2VsbFJlZmVyZW5jZSk6IGFueSB7XG4gICAgY29uc3QgcmVmID0gcmVzb2x2ZUNlbGxSZWZlcmVuY2UoY2VsbCwgdGhpcyBhcyBhbnkpO1xuICAgIGlmIChyZWYgaW5zdGFuY2VvZiBQYmxDZWxsQ29udGV4dCkge1xuICAgICAgcmV0dXJuIHJlZi5jb2wuZ2V0VmFsdWUocmVmLnJvd0NvbnRleHQuJGltcGxpY2l0KTtcbiAgICB9IGVsc2UgaWYgKHJlZikge1xuICAgICAgY29uc3Qgcm93ID0gdGhpcy5leHRBcGkuZ3JpZC5kcy5zb3VyY2VbcmVmWzBdLmRhdGFJbmRleF07XG4gICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmV4dEFwaS5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uQXQocmVmWzFdKTtcbiAgICAgIHJldHVybiBjb2x1bW4uZ2V0VmFsdWUocm93KTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDZWxsQ29udGV4dChyZW5kZXJSb3dJbmRleDogbnVtYmVyLCBjb2x1bW46IFBibENvbHVtbik6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5yb3dDb250ZXh0KHJlbmRlclJvd0luZGV4KTtcbiAgICBjb25zdCBjb2xJbmRleCA9IHRoaXMuY29sdW1uQXBpLmluZGV4T2YoY29sdW1uKTtcbiAgICByZXR1cm4gcm93Q29udGV4dC5jZWxsKGNvbEluZGV4KTtcbiAgfVxuXG4gIHJvd0NvbnRleHQocmVuZGVyUm93SW5kZXg6IG51bWJlcik6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnZpZXdDYWNoZS5nZXQocmVuZGVyUm93SW5kZXgpO1xuICB9XG5cbiAgdXBkYXRlT3V0T2ZWaWV3U3RhdGUocm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPik6IHZvaWQge1xuICAgIGNvbnN0IHZpZXdQb3J0UmVjdCA9IHRoaXMuZ2V0Vmlld1JlY3QoKTtcbiAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5maW5kVmlld1JlZihyb3dDb250ZXh0LmluZGV4KTtcbiAgICBwcm9jZXNzT3V0T2ZWaWV3KHZpZXdSZWYsIHZpZXdQb3J0UmVjdCk7XG4gIH1cblxuICB1cGRhdGVTdGF0ZShyb3dJZGVudGl0eTogYW55LCBjb2x1bW5JbmRleDogbnVtYmVyLCBjZWxsU3RhdGU6IFBhcnRpYWw8Q2VsbENvbnRleHRTdGF0ZTxUPj4pOiB2b2lkO1xuICB1cGRhdGVTdGF0ZShyb3dJZGVudGl0eTogYW55LCByb3dTdGF0ZTogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+KTogdm9pZDtcbiAgdXBkYXRlU3RhdGUocm93SWRlbnRpdHk6IGFueSwgcm93U3RhdGVPckNlbGxJbmRleDogUGFydGlhbDxSb3dDb250ZXh0U3RhdGU8VD4+IHwgbnVtYmVyLCBjZWxsU3RhdGU/OiBQYXJ0aWFsPENlbGxDb250ZXh0U3RhdGU8VD4+KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChjdXJyZW50Um93U3RhdGUpIHtcbiAgICAgIGlmICh0eXBlb2Ygcm93U3RhdGVPckNlbGxJbmRleCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgY29uc3QgY3VycmVudENlbGxTdGF0ZSA9IGN1cnJlbnRSb3dTdGF0ZS5jZWxsc1tyb3dTdGF0ZU9yQ2VsbEluZGV4XTtcbiAgICAgICAgaWYgKGN1cnJlbnRDZWxsU3RhdGUpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGN1cnJlbnRDZWxsU3RhdGUsIGNlbGxTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oY3VycmVudFJvd1N0YXRlLCByb3dTdGF0ZU9yQ2VsbEluZGV4KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmZpbmRSb3dJblZpZXcocm93SWRlbnRpdHkpO1xuICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgcm93Q29udGV4dC5mcm9tU3RhdGUoY3VycmVudFJvd1N0YXRlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3csIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqIElmIHRoZSByb3cgaXMgbm90IGluIHRoZSB2aWV3IChvciBldmVuIG5vdCBpbiB0aGUgY2FjaGUpIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIHJvdydzIGNvbnRleHQgaW5zdGFuY2UgKGBQYmxSb3dDb250ZXh0YClcbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJblZpZXcocm93SWRlbnRpdHk6IGFueSk6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJvd1N0YXRlID0gdGhpcy5jYWNoZS5nZXQocm93SWRlbnRpdHkpO1xuICAgIGlmIChyb3dTdGF0ZSkge1xuICAgICAgY29uc3QgcmVuZGVyUm93SW5kZXggPSByb3dTdGF0ZS5kYXRhSW5kZXggLSB0aGlzLmV4dEFwaS5ncmlkLmRzLnJlbmRlclN0YXJ0O1xuICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMudmlld0NhY2hlLmdldChyZW5kZXJSb3dJbmRleCk7XG4gICAgICBpZiAocm93Q29udGV4dCAmJiByb3dDb250ZXh0LmlkZW50aXR5ID09PSByb3dJZGVudGl0eSkge1xuICAgICAgICByZXR1cm4gcm93Q29udGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3cgY29udGV4dCwgdXNpbmcgdGhlIHJvdyBpZGVudGl0eSwgaW4gdGhlIGNvbnRleHQgY2FjaGUuXG4gICAqIE5vdGUgdGhhdCB0aGUgY2FjaGUgZG9lcyBub3QgaG9sZCB0aGUgY29udGV4dCBpdHNlbGYgYnV0IG9ubHkgdGhlIHN0YXRlIHRoYXQgY2FuIGxhdGVyIGJlIHVzZWQgdG8gcmV0cmlldmUgYSBjb250ZXh0IGluc3RhbmNlLiBUaGUgY29udGV4dCBpbnN0YW5jZVxuICAgKiBpcyBvbmx5IHVzZWQgYXMgY29udGV4dCBmb3Igcm93cyBpbiB2aWV3LlxuICAgKiBAcGFyYW0gcm93SWRlbnRpdHkgVGhlIHJvdydzIGlkZW50aXR5LiBJZiBhIHNwZWNpZmljIGlkZW50aXR5IGlzIHVzZWQsIHBsZWFzZSBwcm92aWRlIGl0IG90aGVyd2lzZSBwcm92aWRlIHRoZSBpbmRleCBvZiB0aGUgcm93IGluIHRoZSBkYXRhc291cmNlLlxuICAgKi9cbiAgZmluZFJvd0luQ2FjaGUocm93SWRlbnRpdHk6IGFueSk6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICogQHBhcmFtIG9mZnNldCBXaGVuIHNldCwgcmV0dXJucyB0aGUgcm93IGF0IHRoZSBvZmZzZXQgZnJvbSB0aGUgcm93IHdpdGggdGhlIHByb3ZpZGVkIHJvdyBpZGVudGl0eS4gQ2FuIGJlIGFueSBudW1lcmljIHZhbHVlIChlLmcgNSwgLTYsIDQpLlxuICAgKiBAcGFyYW0gY3JlYXRlIFdoZXRoZXIgdG8gY3JlYXRlIGEgbmV3IHN0YXRlIGlmIHRoZSBjdXJyZW50IHN0YXRlIGRvZXMgbm90IGV4aXN0LlxuICAgKi9cbiAgZmluZFJvd0luQ2FjaGUocm93SWRlbnRpdHk6IGFueSwgb2Zmc2V0OiBudW1iZXIsIGNyZWF0ZTogYm9vbGVhbik6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZDtcbiAgZmluZFJvd0luQ2FjaGUocm93SWRlbnRpdHk6IGFueSwgb2Zmc2V0PzogbnVtYmVyLCBjcmVhdGU/OiBib29sZWFuKTogUm93Q29udGV4dFN0YXRlPFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByb3dTdGF0ZSA9IHRoaXMuY2FjaGUuZ2V0KHJvd0lkZW50aXR5KTtcblxuICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICByZXR1cm4gcm93U3RhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRhdGFJbmRleCA9IHJvd1N0YXRlLmRhdGFJbmRleCArIG9mZnNldDtcbiAgICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5nZXRSb3dJZGVudGl0eShkYXRhSW5kZXgpO1xuICAgICAgaWYgKGlkZW50aXR5ICE9PSBudWxsKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmZpbmRSb3dJbkNhY2hlKGlkZW50aXR5KTtcbiAgICAgICAgaWYgKCFyZXN1bHQgJiYgY3JlYXRlICYmIGRhdGFJbmRleCA8IHRoaXMuZXh0QXBpLmdyaWQuZHMubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzdWx0ID0gUGJsUm93Q29udGV4dC5kZWZhdWx0U3RhdGUoaWRlbnRpdHksIGRhdGFJbmRleCwgdGhpcy5jb2x1bW5BcGkuY29sdW1ucy5sZW5ndGgpO1xuICAgICAgICAgIHRoaXMuY2FjaGUuc2V0KGlkZW50aXR5LCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Um93SWRlbnRpdHkoZGF0YUluZGV4OiBudW1iZXIsIGNvbnRleHQ/OiBSb3dDb250ZXh0PGFueT4pOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCB7IGRzIH0gPSB0aGlzLmV4dEFwaS5ncmlkO1xuICAgIGNvbnN0IHsgcHJpbWFyeSB9ID0gdGhpcy5leHRBcGkuY29sdW1uU3RvcmU7XG5cbiAgICBjb25zdCByb3cgPSBjb250ZXh0ID8gY29udGV4dC4kaW1wbGljaXQgOiBkcy5zb3VyY2VbZGF0YUluZGV4XTtcbiAgICBpZiAoIXJvdykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcmltYXJ5ID8gcHJpbWFyeS5nZXRWYWx1ZShyb3cpIDogZGF0YUluZGV4O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmluZFZpZXdSZWYoaW5kZXg6IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PiB7XG4gICAgcmV0dXJuIHRoaXMudmNSZWYuZ2V0KGluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj47XG4gIH1cblxuICAvKipcbiAgICogRmluZC9VcGRhdGUvQ3JlYXRlIHRoZSBgUm93Q29udGV4dGAgZm9yIHRoZSBwcm92aWRlZCBgRW1iZWRkZWRWaWV3UmVmYCBhdCB0aGUgcHJvdmlkZWQgcmVuZGVyIHBvc2l0aW9uLlxuICAgKlxuICAgKiBBIGBSb3dDb250ZXh0YCBvYmplY3QgaXMgYSB3cmFwcGVyIGZvciB0aGUgaW50ZXJuYWwgY29udGV4dCBvZiBhIHJvdyBpbiBgQ2RrVGFibGVgIHdpdGggdGhlIHB1cnBvc2Ugb2ZcbiAgICogZXh0ZW5kaW5nIGl0IGZvciB0aGUgZ3JpZCBmZWF0dXJlcy5cbiAgICpcbiAgICogVGhlIHByb2Nlc3MgaGFzIDIgbGF5ZXJzIG9mIGNhY2hlOlxuICAgKlxuICAgKiAtIGBSb3dDb250ZXh0YCBvYmplY3RzIGFyZSBzdG9yZWQgaW4gYSB2aWV3IGNhY2hlIHdoaWNoIGlzIHN5bmNlZCB3aXRoIHRoZSBgQ2RrVGFibGVgIHJvdyBvdXRsZXQgdmlld1JlZnMuXG4gICAqIEVhY2ggdmlldyByZWYgKHJvdykgaGFzIGEgbWF0Y2hpbmcgcmVjb3JkIGluIHRoZSBgUm93Q29udGV4dGAgdmlldyBjYWNoZS5cbiAgICpcbiAgICogLSBgUm93Q29udGV4dFN0YXRlYCBvYmplY3QgYXJlIHN0b3JlZCBpbiBhIGNhY2hlIHdoaWNoIGlzIHN5bmNlZCB3aXRoIHRoZSBpdGVtcyBpbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqIEVhY2ggaXRlbSBpbiB0aGUgZGF0YXNvdXJjZSBoYXMgYSBtYXRjaGluZyByb3cgYFJvd0NvbnRleHRTdGF0ZWAgaXRlbSAobGF6eSksIHdoaWNoIGlzIHVzZWQgdG8gcGVyc2lzdCBjb250ZXh0XG4gICAqIHdoZW4gYFJvd0NvbnRleHRgIGdvZXMgaW4vb3V0IG9mIHRoZSB2aWV3cG9ydC5cbiAgICpcbiAgICogQHBhcmFtIHZpZXdSZWYgVGhlIGBFbWJlZGRlZFZpZXdSZWZgIGhvbGRpbmcgdGhlIGNvbnRleHQgdGhhdCB0aGUgcmV0dXJuZWQgYFJvd0NvbnRleHRgIHNob3VsZCB3cmFwXG4gICAqIEBwYXJhbSByZW5kZXJSb3dJbmRleCBUaGUgcG9zaXRpb24gb2YgdGhlIHZpZXcsIHJlbGF0aXZlIHRvIG90aGVyIHJvd3MuXG4gICAqIFRoZSBwb3NpdGlvbiBpcyByZXF1aXJlZCBmb3IgY2FjaGluZyB0aGUgY29udGV4dCBzdGF0ZSB3aGVuIGEgc3BlY2lmaWMgcm93IGlzIHRocm93biBvdXQgb2YgdGhlIHZpZXdwb3J0ICh2aXJ0dWFsIHNjcm9sbCkuXG4gICAqIEVhY2ggYFJvd0NvbnRleHRgIGdldHMgYSB1bmlxdWUgaWRlbnRpdHkgdXNpbmcgdGhlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBjdXJyZW50IHJlbmRlciByYW5nZSBpbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqL1xuICBwcml2YXRlIGZpbmRSb3dDb250ZXh0KHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PiwgcmVuZGVyUm93SW5kZXg6IG51bWJlcik6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHsgY29udGV4dCB9ID0gdmlld1JlZjtcbiAgICBjb25zdCBkYXRhSW5kZXggPSB0aGlzLmV4dEFwaS5ncmlkLmRzLnJlbmRlclN0YXJ0ICsgcmVuZGVyUm93SW5kZXg7XG4gICAgY29uc3QgaWRlbnRpdHkgPSB0aGlzLmdldFJvd0lkZW50aXR5KGRhdGFJbmRleCwgdmlld1JlZi5jb250ZXh0KTtcblxuICAgIGxldCByb3dDb250ZXh0ID0gY29udGV4dC5wYmxSb3dDb250ZXh0IGFzIFBibFJvd0NvbnRleHQ8VD47XG5cbiAgICBpZiAoIXRoaXMuY2FjaGUuaGFzKGlkZW50aXR5KSkge1xuICAgICAgdGhpcy5jYWNoZS5zZXQoaWRlbnRpdHksIFBibFJvd0NvbnRleHQuZGVmYXVsdFN0YXRlKGlkZW50aXR5LCBkYXRhSW5kZXgsIHRoaXMuY29sdW1uQXBpLmNvbHVtbnMubGVuZ3RoKSk7XG4gICAgfVxuXG4gICAgaWYgKCFyb3dDb250ZXh0KSB7XG4gICAgICByb3dDb250ZXh0ID0gY29udGV4dC5wYmxSb3dDb250ZXh0ID0gbmV3IFBibFJvd0NvbnRleHQ8VD4oaWRlbnRpdHksIGRhdGFJbmRleCwgdGhpcy5leHRBcGkpO1xuICAgICAgcm93Q29udGV4dC51cGRhdGVDb250ZXh0KGNvbnRleHQpO1xuXG4gICAgICB2aWV3UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIHRoaXMudmlld0NhY2hlLmRlbGV0ZShyZW5kZXJSb3dJbmRleCk7XG4gICAgICAgIGNvbnRleHQucGJsUm93Q29udGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuXG4gICAgfSBlbHNlIGlmIChyb3dDb250ZXh0LmlkZW50aXR5ICE9PSBpZGVudGl0eSkge1xuICAgICAgLy8gc2F2ZSBvbGQgc3RhdGUgYmVmb3JlIGFwcGx5aW5nIG5ldyBzdGF0ZVxuICAgICAgdGhpcy5jYWNoZS5zZXQocm93Q29udGV4dC5pZGVudGl0eSwgcm93Q29udGV4dC5nZXRTdGF0ZSgpKTtcbiAgICAgIHJvd0NvbnRleHQudXBkYXRlQ29udGV4dChjb250ZXh0KTtcblxuICAgICAgLy8gV2VcbiAgICAgIGNvbnN0IGdhcCA9IGRhdGFJbmRleCAtIHJvd0NvbnRleHQuZGF0YUluZGV4O1xuICAgICAgaWYgKGdhcCA+IDApIHtcbiAgICAgICAgY29uc3Qgc2libGluZ1ZpZXdSZWYgPSB0aGlzLmZpbmRWaWV3UmVmKHJlbmRlclJvd0luZGV4ICsgZ2FwKTtcbiAgICAgICAgY29uc3Qgc2libGluZ1Jvd0NvbnRleHQgPSBzaWJsaW5nVmlld1JlZiAmJiBzaWJsaW5nVmlld1JlZi5jb250ZXh0LnBibFJvd0NvbnRleHQgYXMgUGJsUm93Q29udGV4dDxUPjtcbiAgICAgICAgaWYgKHNpYmxpbmdSb3dDb250ZXh0KSB7XG4gICAgICAgICAgdGhpcy5jYWNoZS5zZXQoc2libGluZ1Jvd0NvbnRleHQuaWRlbnRpdHksIHNpYmxpbmdSb3dDb250ZXh0LmdldFN0YXRlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByb3dDb250ZXh0O1xuICAgIH1cbiAgICByb3dDb250ZXh0LmZyb21TdGF0ZSh0aGlzLmNhY2hlLmdldChpZGVudGl0eSkpO1xuXG4gICAgcmV0dXJuIHJvd0NvbnRleHQ7XG4gIH1cblxuICBwcml2YXRlIGdldFZpZXdSZWN0KCk6IENsaWVudFJlY3QgfCBET01SZWN0IHtcbiAgICByZXR1cm4gdGhpcy5leHRBcGkuZ3JpZC52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRGb2N1c0NoYW5nZWQoY3VycjogUGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudFsnY3VyciddKTogdm9pZCB7XG4gICAgdGhpcy5mb2N1c0NoYW5nZWQkLm5leHQoe1xuICAgICAgcHJldjogdGhpcy5mb2N1c0NoYW5nZWQkLnZhbHVlLmN1cnIsXG4gICAgICBjdXJyLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZm9jdXNDaGFuZ2VkJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlZCQuY29tcGxldGUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzT3V0T2ZWaWV3KHZpZXdSZWY6IEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PGFueT4+LCB2aWV3UG9ydFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0LCBsb2NhdGlvbj86ICd0b3AnIHwgJ2JvdHRvbScpOiBib29sZWFuIHtcbiAgY29uc3QgZWw6IEhUTUxFbGVtZW50ID0gdmlld1JlZi5yb290Tm9kZXNbMF07XG4gIGNvbnN0IHJvd0NvbnRleHQgPSB2aWV3UmVmLmNvbnRleHQucGJsUm93Q29udGV4dDtcbiAgY29uc3QgZWxSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgbGV0IGlzSW5zaWRlT2ZWaWV3OiBib29sZWFuO1xuICBzd2l0Y2ggKGxvY2F0aW9uKXtcbiAgICBjYXNlICd0b3AnOlxuICAgICAgaXNJbnNpZGVPZlZpZXcgPSBlbFJlY3QuYm90dG9tID49IHZpZXdQb3J0UmVjdC50b3A7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdib3R0b20nOlxuICAgICAgaXNJbnNpZGVPZlZpZXcgPSBlbFJlY3QudG9wIDw9IHZpZXdQb3J0UmVjdC5ib3R0b207XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgaXNJbnNpZGVPZlZpZXcgPSAoZWxSZWN0LmJvdHRvbSA+PSB2aWV3UG9ydFJlY3QudG9wICYmIGVsUmVjdC50b3AgPD0gdmlld1BvcnRSZWN0LmJvdHRvbSlcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgaWYgKGlzSW5zaWRlT2ZWaWV3KSB7XG4gICAgaWYgKCFyb3dDb250ZXh0Lm91dE9mVmlldykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByb3dDb250ZXh0Lm91dE9mVmlldyA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIHJvd0NvbnRleHQub3V0T2ZWaWV3ID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbiJdfQ==