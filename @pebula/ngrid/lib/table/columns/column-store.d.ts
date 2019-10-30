import { PblNgridColumnDefinitionSet, PblNgridColumnSet } from './types';
import { PblMetaColumn } from './meta-column';
import { PblColumn } from './column';
import { PblColumnSet, PblMetaRowDefinitions, PblMetaColumnDefinition, PblColumnGroupDefinition } from './types';
import { PblColumnGroup, PblColumnGroupStore } from './group-column';
import { StaticColumnWidthLogic } from '../col-width-logic/static-column-width';
export interface PblMetaColumnStore {
    id: string;
    header?: PblMetaColumn;
    footer?: PblMetaColumn;
    headerGroup?: PblColumnGroup;
    footerGroup?: PblColumnGroup;
}
export interface PblColumnStoreMetaRow {
    rowDef: PblColumnSet<PblMetaColumnDefinition | PblColumnGroupDefinition>;
    keys: string[];
    isGroup?: boolean;
}
export declare class PblColumnStore {
    metaColumnIds: {
        header: Array<PblColumnStoreMetaRow>;
        footer: Array<PblColumnStoreMetaRow>;
    };
    metaColumns: PblMetaColumnStore[];
    columnIds: string[];
    columns: PblColumn[];
    allColumns: PblColumn[];
    headerColumnDef: PblMetaRowDefinitions;
    footerColumnDef: PblMetaRowDefinitions;
    readonly primary: PblColumn | undefined;
    hidden: string[];
    readonly groupBy: PblColumn[];
    readonly groupStore: PblColumnGroupStore;
    private _primary;
    private _metaRows;
    private _hidden;
    private _allHidden;
    private _groupBy;
    private byId;
    private _groupStore;
    private lastSet;
    constructor();
    addGroupBy(...column: PblColumn[]): void;
    removeGroupBy(...column: PblColumn[]): void;
    /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     */
    moveColumn(column: PblColumn, anchor: PblColumn): boolean;
    swapColumns(col1: PblColumn, col2: PblColumn): boolean;
    find(id: string): PblMetaColumnStore & {
        data?: PblColumn;
    } | undefined;
    getAllHeaderGroup(): PblColumnGroup[];
    getStaticWidth(): StaticColumnWidthLogic;
    invalidate(columnOrDefinitionSet: PblNgridColumnDefinitionSet | PblNgridColumnSet): void;
    updateGroups(...rowIndex: number[]): void;
    private _updateGroup;
    private updateMetaRow;
    private getColumnRecord;
    private setHidden;
    private resetColumns;
    private resetIds;
}
/**
 * Moves an item one index in an array to another.
 * @param array Array in which to move the item.
 * @param fromIndex Starting index of the item.
 * @param toIndex Index to which the item should be moved.
 */
export declare function moveItemInArray<T = any>(array: T[], fromIndex: number, toIndex: number): void;
