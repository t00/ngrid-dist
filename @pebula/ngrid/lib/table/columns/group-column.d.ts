import { PblNgridColumnDef } from '../directives';
import { PblColumnGroupDefinition } from './types';
import { PblMetaColumn } from './meta-column';
import { PblColumn } from './column';
export declare function isPblColumnGroup(def: any): def is PblColumnGroup;
export declare class PblColumnGroupStore {
    readonly all: PblColumnGroup[];
    private store;
    private _all;
    /**
     * Attach a column to a group.
     */
    attach(group: string | PblColumnGroup, column: string | PblColumn): boolean;
    /**
     * Detach a column from a group.
     */
    detach(group: string | PblColumnGroup, column: string | PblColumn): boolean;
    /**
     * Returns a list of `PblColumnGroup` that does not have columns attached.
     */
    findGhosts(): PblColumnGroup[];
    add(group: PblColumnGroup): void;
    remove(group: string | PblColumnGroup): boolean;
    find(group: string | PblColumnGroup): PblColumnGroup | undefined;
    clone(): PblColumnGroupStore;
    private _find;
    private updateAll;
}
export declare class PblColumnGroup extends PblMetaColumn implements PblColumnGroupDefinition {
    readonly placeholder: boolean;
    /**
     * The table's column that is the first child column for this group.
     */
    prop: string;
    /**
     * The total span of the group (excluding the first child - i.e. prop).
     * The span and prop are used to get the child columns of this group.
     * The span is not dynamic, once the columns are set they don't change.
     *
     * For example, if a we have a span of 2 and the column at the 2nd position is hidden it will still count as
     * being spanned although the UI will span only 1 column... (because the 2nd is hidden...)
     */
    span: number;
    /**
     * Returns the visible state of the column.
     * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
     */
    readonly isVisible: boolean;
    /**
   * The column def for this column.
   */
    columnDef: PblNgridColumnDef<PblColumnGroup>;
    /**
     * When set, this column is a cloned column of an existing column caused by a split.
     * @internal
     */
    slaveOf?: PblColumnGroup;
    /** @internal */
    readonly columns: PblColumn[];
    constructor(def: PblColumnGroup | PblColumnGroupDefinition, columns: PblColumn[], placeholder?: boolean);
    static extendProperty(name: keyof PblColumnGroup): void;
    createSlave(columns?: PblColumn[]): PblColumnGroup;
    replace(newColumn: PblColumn): boolean;
}
