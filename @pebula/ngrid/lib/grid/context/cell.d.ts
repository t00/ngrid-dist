import { PblNgridExtensionApi } from '../../ext/grid-ext-api';
import { PblNgridComponent } from '../ngrid.component';
import { CellContextState, PblNgridCellContext, PblNgridMetaCellContext, PblNgridRowContext } from './types';
import { PblColumn } from '../columns/column';
import { PblMetaColumn } from '../columns/meta-column';
import { PblRowContext } from './row';
export declare class MetaCellContext<T = any, TCol extends PblMetaColumn | PblColumn = PblMetaColumn> implements PblNgridMetaCellContext<T, TCol> {
    col: TCol;
    grid: PblNgridComponent<any>;
    get $implicit(): MetaCellContext<T, TCol>;
    /** @deprecated use grid instead */
    get table(): PblNgridComponent<T>;
    protected constructor();
    static create<T = any, TCol extends PblMetaColumn | PblColumn = PblMetaColumn>(col: TCol, grid: PblNgridComponent<T>): MetaCellContext<T, TCol>;
}
export declare class PblCellContext<T = any> implements PblNgridCellContext<T> {
    get $implicit(): PblCellContext<T>;
    get row(): T;
    get value(): any;
    set value(v: any);
    get rowContext(): PblNgridRowContext<T>;
    get editing(): boolean;
    get focused(): boolean;
    get selected(): boolean;
    readonly grid: PblNgridComponent<any>;
    readonly index: number;
    /** @deprecated use grid instead */
    get table(): PblNgridComponent<any>;
    private _editing;
    private _focused;
    private _selected;
    private _rowContext;
    col: PblColumn;
    private extApi;
    protected constructor();
    static create<T = any>(rowContext: PblRowContext<T>, col: PblColumn, extApi: PblNgridExtensionApi<T>): PblCellContext<T>;
    static defaultState<T = any>(): CellContextState<T>;
    clone(): PblCellContext<T>;
    getState(): CellContextState<T>;
    fromState(state: CellContextState<T>, rowContext: PblRowContext<T>, skipRowUpdate?: boolean): void;
    startEdit(markForCheck?: boolean): void;
    stopEdit(markForCheck?: boolean): void;
}
