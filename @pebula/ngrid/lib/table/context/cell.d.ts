import { PblNgridExtensionApi } from '../../ext/table-ext-api';
import { PblNgridComponent } from '../table.component';
import { CellContextState, PblNgridCellContext, PblNgridMetaCellContext, PblNgridRowContext } from './types';
import { PblColumn } from '../columns/column';
import { PblMetaColumn } from '../columns/meta-column';
import { PblRowContext } from './row';
export declare class MetaCellContext<T = any, TCol extends PblMetaColumn | PblColumn = PblMetaColumn> implements PblNgridMetaCellContext<T, TCol> {
    col: TCol;
    table: PblNgridComponent<any>;
    readonly $implicit: MetaCellContext<T, TCol>;
    protected constructor();
    static create<T = any, TCol extends PblMetaColumn | PblColumn = PblMetaColumn>(col: TCol, table: PblNgridComponent<T>): MetaCellContext<T, TCol>;
}
export declare class PblCellContext<T = any> implements PblNgridCellContext<T> {
    readonly $implicit: PblCellContext<T>;
    readonly row: T;
    value: any;
    readonly rowContext: PblNgridRowContext<T>;
    readonly editing: boolean;
    readonly focused: boolean;
    readonly selected: boolean;
    readonly table: PblNgridComponent<any>;
    readonly index: number;
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
