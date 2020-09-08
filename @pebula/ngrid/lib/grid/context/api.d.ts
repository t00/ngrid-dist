import { Observable } from 'rxjs';
import { RowContext } from '@angular/cdk/table';
import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import { RowContextState, CellContextState, PblNgridCellContext, PblNgridRowContext, CellReference, GridDataPoint, PblNgridFocusChangedEvent, PblNgridSelectionChangedEvent } from './types';
import { PblColumn } from '../columns/column';
import { PblRowContext } from './row';
import { PblCellContext } from './cell';
export declare class ContextApi<T = any> {
    private extApi;
    private viewCache;
    private cache;
    private vcRef;
    private columnApi;
    private activeFocused;
    private activeSelected;
    private focusChanged$;
    private selectionChanged$;
    /**
     * Notify when the focus has changed.
     *
     * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
     */
    readonly focusChanged: Observable<PblNgridFocusChangedEvent>;
    /**
     * Notify when the selected cells has changed.
     */
    readonly selectionChanged: Observable<PblNgridSelectionChangedEvent>;
    /**
     * The reference to currently focused cell context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     */
    get focusedCell(): GridDataPoint | undefined;
    /**
     * The reference to currently selected range of cell's context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     */
    get selectedCells(): GridDataPoint[];
    constructor(extApi: PblNgridExtensionApi<T>);
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param cellRef A Reference to the cell
     * @param markForCheck Mark the row for change detection
     */
    focusCell(cellRef?: CellReference | boolean, markForCheck?: boolean): void;
    /**
     * Select all provided cells.
     * @param cellRef A Reference to the cell
     * @param markForCheck Mark the row for change detection
     * @param clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     */
    selectCells(cellRefs: CellReference[], markForCheck?: boolean, clearCurrent?: boolean): void;
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param cellRef A Reference to the cell
     * @param markForCheck Mark the row for change detection
     */
    unselectCells(cellRefs?: CellReference[] | boolean, markForCheck?: boolean): void;
    clear(): void;
    getRow(row: number | HTMLElement): PblNgridRowContext<T> | undefined;
    getCell(cell: HTMLElement | GridDataPoint): PblNgridCellContext | undefined;
    /**
     * Return the cell context for the cell at the point specified
     * @param row
     * @param col
     */
    getCell(row: number, col: number): PblNgridCellContext | undefined;
    getDataItem(cell: CellReference): any;
    createCellContext(renderRowIndex: number, column: PblColumn): PblCellContext<T>;
    rowContext(renderRowIndex: number): PblRowContext<T> | undefined;
    updateOutOfViewState(rowContext: PblRowContext<T>): void;
    updateState(rowIdentity: any, columnIndex: number, cellState: Partial<CellContextState<T>>): void;
    updateState(rowIdentity: any, rowState: Partial<RowContextState<T>>): void;
    /**
     * Try to find a specific row, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     */
    findRowInView(rowIdentity: any): PblRowContext<T> | undefined;
    /**
     * Try to find a specific row context, using the row identity, in the context cache.
     * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
     * is only used as context for rows in view.
     * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     */
    findRowInCache(rowIdentity: any): RowContextState<T> | undefined;
    /**
     * Try to find a specific row context, using the row identity, in the context cache.
     * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
     * is only used as context for rows in view.
     * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @param offset When set, returns the row at the offset from the row with the provided row identity. Can be any numeric value (e.g 5, -6, 4).
     * @param create Whether to create a new state if the current state does not exist.
     */
    findRowInCache(rowIdentity: any, offset: number, create: boolean): RowContextState<T> | undefined;
    getRowIdentity(dataIndex: number, context?: RowContext<any>): string | number | null;
    private findViewRef;
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
    private findRowContext;
    private getViewRect;
    private emitFocusChanged;
    private destroy;
}
