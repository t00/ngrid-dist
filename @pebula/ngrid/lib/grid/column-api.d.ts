import { Observable } from 'rxjs';
import { PblNgridExtensionApi } from '../ext/grid-ext-api';
import { PblNgridComponent } from './ngrid.component';
import { PblColumn } from './columns/column';
import { PblColumnStore } from './columns/column-store';
export interface AutoSizeToFitOptions {
    /**
     * When `px` will force all columns width to be in fixed pixels
     * When `%` will force all column width to be in %
     * otherwise (default) the width will be set in the same format it was originally set.
     * e.g.: If width was `33%` the new width will also be in %, or if width not set the new width will not be set as well.
     *
     * Does not apply when columnBehavior is set and returns a value.
     */
    forceWidthType?: '%' | 'px';
    /**
     * When true will keep the `minWidth` column definition (when set), otherwise will clear it.
     * Does not apply when columnBehavior is set and returns a value.
     */
    keepMinWidth?: boolean;
    /**
     * When true will keep the `maxWidth` column definition (when set), otherwise will clear it.
     * Does not apply when columnBehavior is set and returns a value.
     */
    keepMaxWidth?: boolean;
    /**
     * A function for per-column fine tuning of the process.
     * The function receives the `PblColumn`, its relative width (in %, 0 to 1) and total width (in pixels) and should return
     * an object describing how it should auto fit.
     *
     * When the function returns undefined the options are taken from the root.
     */
    columnBehavior?(column: PblColumn): Pick<AutoSizeToFitOptions, 'forceWidthType' | 'keepMinWidth' | 'keepMaxWidth'> | undefined;
}
export declare class ColumnApi<T> {
    static create<T>(grid: PblNgridComponent<T>, store: PblColumnStore, extApi: PblNgridExtensionApi): ColumnApi<T>;
    get groupByColumns(): PblColumn[];
    get visibleColumnIds(): string[];
    get visibleColumns(): PblColumn[];
    get columns(): PblColumn[];
    get totalColumnWidthChange(): Observable<number>;
    private grid;
    private store;
    private extApi;
    private _totalColumnWidthChange;
    private constructor();
    /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     */
    findColumnAt(renderColumnIndex: number): PblColumn | undefined;
    /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     */
    findColumn(id: string): PblColumn | undefined;
    /**
    * Returns the render index of column or -1 if not found.
    *
    * The render index represents the current location of the column in the group of visible columns.
    */
    renderIndexOf(column: string | PblColumn): number;
    /**
     * Returns the index of a column or -1 if not found.
     */
    indexOf(column: string | PblColumn): number;
    /**
     * Update the width of the column with the provided width.
     *
     * The width is set in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     *
     * Resizing the column will trigger a table width resizing event, updating column group if necessary.
     */
    resizeColumn(column: PblColumn, width: string): void;
    /**
     * Resize the column to best fit it's content.
     *
     * - Content: All of the cells rendered for this column (header, data and footer cells).
     * - Best fit: The width of the cell with the height width measured.
     *
     * The best fit found (width) is then used to call `resizeColumn()`.
     */
    autoSizeColumn(column: PblColumn): void;
    /**
     * For each visible column in the table, resize to best fit it's content.
     *
     * This method will simply run `autoSizeColumn()` on the visible columns in the table.
     */
    autoSizeColumns(): void;
    /**
     * For each column in the list of column provided, resize to best fit it's content.
     *
     * Make sure you are not resizing an hidden column.
     * This method will simply run `autoSizeColumn()` on the columns provided.
     */
    autoSizeColumns(...columns: PblColumn[]): void;
    /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     */
    autoSizeToFit(totalWidth: number, options?: AutoSizeToFitOptions): void;
    /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     */
    moveColumn(column: PblColumn, anchor: PblColumn, skipRedraw?: boolean): boolean;
    /**
   * Move the provided `column` to the position of the column at `renderColumnIndex`.
   * `renderColumnIndex` must be a visible column (i.e. not hidden)
   */
    moveColumn(column: PblColumn, renderColumnIndex: number, skipRedraw?: boolean): boolean;
    /**
     * Swap positions between 2 existing columns.
     */
    swapColumns(col1: PblColumn, col2: PblColumn, skipRedraw?: boolean): boolean;
    addGroupBy(...column: PblColumn[]): void;
    removeGroupBy(...column: PblColumn[]): void;
    private findColumnAutoSize;
    private afterColumnPositionChange;
}
