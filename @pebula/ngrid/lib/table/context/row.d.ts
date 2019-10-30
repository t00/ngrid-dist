import { RowContext } from '@angular/cdk/table';
import { PblColumn } from '../columns/column';
import { PblNgridExtensionApi } from '../../ext/table-ext-api';
import { PblNgridComponent } from '../table.component';
import { RowContextState, PblNgridRowContext } from './types';
import { PblCellContext } from './cell';
declare module '@angular/cdk/table/typings/row.d' {
    interface CdkCellOutletRowContext<T> {
        pblRowContext: PblNgridRowContext<T>;
    }
    interface CdkCellOutletMultiRowContext<T> {
        pblRowContext: PblNgridRowContext<T>;
    }
}
export declare class PblRowContext<T> implements PblNgridRowContext<T> {
    identity: any;
    dataIndex: number;
    private extApi;
    /** Data for the row that this cell is located within. */
    $implicit?: T;
    /** Index of the data object in the provided data array. */
    index?: number;
    /** Index location of the rendered row that this cell is located within. */
    renderIndex?: number;
    /** Length of the number of total rows. */
    count?: number;
    /** True if this cell is contained in the first row. */
    first?: boolean;
    /** True if this cell is contained in the last row. */
    last?: boolean;
    /** True if this cell is contained in a row with an even-numbered index. */
    even?: boolean;
    /** True if this cell is contained in a row with an odd-numbered index. */
    odd?: boolean;
    gridInstance: PblNgridComponent<T>;
    firstRender: boolean;
    outOfView: boolean;
    readonly table: PblNgridComponent<T>;
    /**
     * Returns the length of cells context stored in this row
     */
    readonly length: number;
    pblRowContext: PblNgridRowContext<T>;
    private cells;
    constructor(identity: any, dataIndex: number, extApi: PblNgridExtensionApi<T>);
    static defaultState<T = any>(identity: any, dataIndex: number, cellsCount: number): RowContextState<T>;
    getState(): RowContextState<T>;
    fromState(state: RowContextState<T>): void;
    updateContext(context: RowContext<T>): void;
    /**
     * Returns the cell context for the column at the specified position.
     * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
     */
    cell(index: number | PblColumn): PblCellContext<T> | undefined;
    getCells(): PblCellContext<T>[];
    updateCell(cell: PblCellContext<T>): void;
    /**
   * Updates the `outOfView` property.
   */
    updateOutOfViewState(): void;
}
