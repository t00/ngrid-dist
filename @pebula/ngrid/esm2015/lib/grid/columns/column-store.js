/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/column-store.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isDevMode } from '@angular/core';
import { PblMetaColumn } from './meta-column';
import { PblColumn } from './column';
import { StaticColumnWidthLogic } from '../col-width-logic/static-column-width';
import { resetColumnWidths } from '../utils/helpers';
import { PblColumnFactory } from './factory';
/**
 * @record
 */
export function PblMetaColumnStore() { }
if (false) {
    /** @type {?} */
    PblMetaColumnStore.prototype.id;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.header;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.footer;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.headerGroup;
    /** @type {?|undefined} */
    PblMetaColumnStore.prototype.footerGroup;
}
/**
 * @record
 */
export function PblColumnStoreMetaRow() { }
if (false) {
    /** @type {?} */
    PblColumnStoreMetaRow.prototype.rowDef;
    /** @type {?} */
    PblColumnStoreMetaRow.prototype.keys;
    /** @type {?|undefined} */
    PblColumnStoreMetaRow.prototype.isGroup;
}
export class PblColumnStore {
    constructor() {
        this._groupBy = [];
        this.byId = new Map();
        this.resetIds();
        this.resetColumns();
    }
    /**
     * @return {?}
     */
    get primary() { return this._primary; }
    /**
     * @param {?} value
     * @return {?}
     */
    set hidden(value) {
        this._hidden = value;
        this.setHidden();
    }
    /**
     * @return {?}
     */
    get groupBy() { return this._groupBy; }
    /**
     * @return {?}
     */
    get groupStore() { return this._groupStore; }
    /**
     * @param {...?} column
     * @return {?}
     */
    addGroupBy(...column) {
        this.groupBy.push(...column);
        this.setHidden();
    }
    /**
     * @param {...?} column
     * @return {?}
     */
    removeGroupBy(...column) {
        for (const c of column) {
            /** @type {?} */
            const idx = this.groupBy.findIndex((/**
             * @param {?} gbc
             * @return {?}
             */
            gbc => gbc.id === c.id));
            if (idx > -1) {
                this.groupBy.splice(idx, 1);
            }
        }
        this.setHidden();
    }
    /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     * @param {?} column
     * @param {?} anchor
     * @return {?}
     */
    moveColumn(column, anchor) {
        const { columns, columnIds, allColumns } = this;
        /** @type {?} */
        let anchorIndex = columns.indexOf(anchor);
        /** @type {?} */
        let columnIndex = columns.indexOf(column);
        if (anchorIndex > -1 && columnIndex > -1) {
            moveItemInArray(columnIds, columnIndex, anchorIndex);
            moveItemInArray(columns, columnIndex, anchorIndex);
            if (this._allHidden && this._allHidden.length > 0) {
                anchorIndex = allColumns.indexOf(anchor);
                columnIndex = allColumns.indexOf(column);
            }
            moveItemInArray(allColumns, columnIndex, anchorIndex);
            return true;
        }
    }
    /**
     * @param {?} col1
     * @param {?} col2
     * @return {?}
     */
    swapColumns(col1, col2) {
        /** @type {?} */
        let col1Index = this.columns.indexOf(col1);
        /** @type {?} */
        let col2Index = this.columns.indexOf(col2);
        if (col1Index > -1 && col2Index > -1) {
            const { columns, columnIds, allColumns } = this;
            columns[col1Index] = col2;
            columns[col2Index] = col1;
            columnIds[col1Index] = col2.id;
            columnIds[col2Index] = col1.id;
            if (this._allHidden && this._allHidden.length > 0) {
                col1Index = allColumns.indexOf(col1);
                col2Index = allColumns.indexOf(col2);
            }
            allColumns[col1Index] = col2;
            allColumns[col2Index] = col1;
            return true;
        }
        return false;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    find(id) {
        return this.byId.get(id);
    }
    /**
     * @return {?}
     */
    getAllHeaderGroup() {
        return this._groupStore ? this._groupStore.all : [];
    }
    /**
     * @return {?}
     */
    getStaticWidth() {
        /** @type {?} */
        const rowWidth = new StaticColumnWidthLogic();
        for (const column of this.columns) {
            rowWidth.addColumn(column);
        }
        return rowWidth;
    }
    /**
     * @param {?} columnOrDefinitionSet
     * @return {?}
     */
    invalidate(columnOrDefinitionSet) {
        /** @type {?} */
        const columnSet = this.lastSet = 'groupStore' in columnOrDefinitionSet
            ? columnOrDefinitionSet
            : PblColumnFactory.fromDefinitionSet(columnOrDefinitionSet).build();
        const { groupStore, table, header, footer, headerGroup } = columnSet;
        this._groupStore = groupStore.clone();
        /** @type {?} */
        const rowWidth = new StaticColumnWidthLogic();
        this.resetColumns();
        this.resetIds();
        /** @type {?} */
        const hidden = this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id)));
        this.headerColumnDef = {
            rowClassName: (table.header && table.header.rowClassName) || '',
            type: (table.header && table.header.type) || 'fixed',
        };
        this.footerColumnDef = {
            rowClassName: (table.footer && table.footer.rowClassName) || '',
            type: (table.footer && table.footer.type) || 'fixed',
        };
        this._primary = undefined;
        for (const def of table.cols) {
            /** @type {?} */
            let column;
            column = new PblColumn(def, this.groupStore);
            /** @type {?} */
            const columnRecord = this.getColumnRecord(column.id);
            columnRecord.data = column;
            this.allColumns.push(column);
            column.hidden = hidden.indexOf(column.id) > -1;
            if (!column.hidden) {
                this.columns.push(column);
                this.columnIds.push(column.id);
                rowWidth.addColumn(column);
            }
            if (column.pIndex) {
                if (this._primary && isDevMode()) {
                    console.warn(`Multiple primary index columns defined: previous: "${this._primary.id}", current: "${column.id}"`);
                }
                this._primary = column;
            }
        }
        for (const rowDef of header) {
            /** @type {?} */
            const keys = [];
            for (const def of rowDef.cols) {
                /** @type {?} */
                const metaCol = this.getColumnRecord(def.id, this.metaColumns);
                /** @type {?} */
                const column = metaCol.header || (metaCol.header = new PblMetaColumn(def));
                keys.push(column.id);
            }
            this._metaRows.header[rowDef.rowIndex] = { rowDef, keys };
        }
        for (const rowDef of headerGroup) {
            this._updateGroup(rowDef);
        }
        for (const rowDef of footer) {
            /** @type {?} */
            const keys = [];
            for (const def of rowDef.cols) {
                /** @type {?} */
                const metaCol = this.getColumnRecord(def.id, this.metaColumns);
                /** @type {?} */
                const column = metaCol.footer || (metaCol.footer = new PblMetaColumn(def));
                keys.push(column.id);
            }
            this._metaRows.footer.push({ rowDef, keys });
        }
        resetColumnWidths(rowWidth, this.columns, this.metaColumns);
    }
    /**
     * @param {...?} rowIndex
     * @return {?}
     */
    updateGroups(...rowIndex) {
        if (rowIndex.length === 0) {
            for (const rowDef of this.lastSet.headerGroup) {
                this._updateGroup(rowDef);
            }
        }
        else {
            /** @type {?} */
            const rows = rowIndex.slice();
            for (const rowDef of this.lastSet.headerGroup) {
                /** @type {?} */
                const idx = rows.indexOf(rowDef.rowIndex);
                if (idx > -1) {
                    rows.splice(idx, 1);
                    this._updateGroup(rowDef);
                    if (rows.length === 0) {
                        return;
                    }
                }
            }
        }
    }
    /**
     * @private
     * @param {?} columnSet
     * @return {?}
     */
    _updateGroup(columnSet) {
        /** @type {?} */
        const keys = [];
        /** @type {?} */
        const allKeys = [];
        /** @type {?} */
        const groups = [];
        for (let tIndex = 0; tIndex < this.columns.length; tIndex++) {
            /** @type {?} */
            const columns = [this.columns[tIndex - 1], this.columns[tIndex], this.columns[tIndex + 1]];
            /** @type {?} */
            const columnGroups = columns.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c ? c.getGroupOfRow(columnSet.rowIndex) : undefined));
            // true when the group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
            /** @type {?} */
            const groupExists = groups.lastIndexOf(columnGroups[1]) !== -1;
            /** @type {?} */
            const column = columns[1];
            /** @type {?} */
            const gColumn = column.groupLogic((/** @type {?} */ (columnGroups)), groupExists);
            if (gColumn !== columnGroups[1]) {
                column.markNotInGroup(columnGroups[1]);
                column.markInGroup(gColumn);
            }
            /** @type {?} */
            const metaCol = this.getColumnRecord(gColumn.id, this.metaColumns);
            if (!metaCol.headerGroup) {
                metaCol.headerGroup = gColumn;
            }
            if (groups.lastIndexOf(gColumn) === -1) {
                allKeys.push(gColumn.id);
                if (gColumn.isVisible) {
                    keys.push(gColumn.id);
                }
            }
            gColumn.replace(column);
            groups.push(gColumn);
        }
        for (const ghost of this._groupStore.findGhosts()) {
            if (ghost.rowIndex === columnSet.rowIndex) {
                const { id } = ghost;
                /** @type {?} */
                let idx = allKeys.indexOf(id);
                if (idx !== -1) {
                    allKeys.splice(idx, 1);
                    idx = keys.indexOf(id);
                    if (idx !== -1) {
                        keys.splice(idx, 1);
                    }
                    this.metaColumns.splice(this.metaColumns.findIndex((/**
                     * @param {?} m
                     * @return {?}
                     */
                    m => m.id === id)), 1);
                }
                this._groupStore.remove(ghost);
            }
        }
        this.updateMetaRow('header', columnSet.rowIndex, { rowDef: columnSet, keys, allKeys, isGroup: true });
    }
    /**
     * @private
     * @template P
     * @param {?} type
     * @param {?} rowIndex
     * @param {?} value
     * @return {?}
     */
    updateMetaRow(type, rowIndex, value) {
        /** @type {?} */
        const curr = this._metaRows[type][rowIndex] || {};
        this._metaRows[type][rowIndex] = Object.assign(curr, value);
    }
    /**
     * @private
     * @template T
     * @param {?} id
     * @param {?=} collection
     * @return {?}
     */
    getColumnRecord(id, collection) {
        /** @type {?} */
        let columnRecord = this.byId.get(id);
        if (!columnRecord) {
            this.byId.set(id, columnRecord = { id });
            if (collection) {
                collection.push((/** @type {?} */ (columnRecord)));
            }
        }
        return (/** @type {?} */ (columnRecord));
    }
    /**
     * @private
     * @return {?}
     */
    setHidden() {
        this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id)));
        this.columnIds = [];
        this.columns = [];
        for (const c of this.allColumns) {
            c.hidden = this._allHidden.indexOf(c.id) > -1;
            if (!c.hidden) {
                this.columns.push(c);
                this.columnIds.push(c.id);
            }
        }
        for (const h of this._metaRows.header) {
            if (h.isGroup) {
                h.keys = h.allKeys.filter((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => this.find(key).headerGroup.isVisible));
            }
        }
        resetColumnWidths(this.getStaticWidth(), this.columns, this.metaColumns);
    }
    /**
     * @private
     * @return {?}
     */
    resetColumns() {
        this.allColumns = [];
        this.columns = [];
        this.metaColumns = [];
        this.byId.clear();
    }
    /**
     * @private
     * @return {?}
     */
    resetIds() {
        this.columnIds = [];
        this._metaRows = this.metaColumnIds = { header: [], footer: [] };
    }
}
if (false) {
    /** @type {?} */
    PblColumnStore.prototype.metaColumnIds;
    /** @type {?} */
    PblColumnStore.prototype.metaColumns;
    /** @type {?} */
    PblColumnStore.prototype.columnIds;
    /** @type {?} */
    PblColumnStore.prototype.columns;
    /** @type {?} */
    PblColumnStore.prototype.allColumns;
    /** @type {?} */
    PblColumnStore.prototype.headerColumnDef;
    /** @type {?} */
    PblColumnStore.prototype.footerColumnDef;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._primary;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._metaRows;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._hidden;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._allHidden;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._groupBy;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype.byId;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype._groupStore;
    /**
     * @type {?}
     * @private
     */
    PblColumnStore.prototype.lastSet;
}
/**
 * Moves an item one index in an array to another.
 * @template T
 * @param {?} array Array in which to move the item.
 * @param {?} fromIndex Starting index of the item.
 * @param {?} toIndex Index to which the item should be moved.
 * @return {?}
 */
export function moveItemInArray(array, fromIndex, toIndex) {
    /** @type {?} */
    const from = clamp(fromIndex, array.length - 1);
    /** @type {?} */
    const to = clamp(toIndex, array.length - 1);
    if (from === to) {
        return;
    }
    /** @type {?} */
    const target = array[from];
    /** @type {?} */
    const delta = to < from ? -1 : 1;
    for (let i = from; i !== to; i += delta) {
        array[i] = array[i + delta];
    }
    array[to] = target;
}
/**
 * Clamps a number between zero and a maximum.
 * @param {?} value
 * @param {?} max
 * @return {?}
 */
function clamp(value, max) {
    return Math.max(0, Math.min(max, value));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvY29sdW1uLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBRTdDLHdDQU1DOzs7SUFMQyxnQ0FBVzs7SUFDWCxvQ0FBdUI7O0lBQ3ZCLG9DQUF1Qjs7SUFDdkIseUNBQTZCOztJQUM3Qix5Q0FBNkI7Ozs7O0FBRy9CLDJDQUlDOzs7SUFIQyx1Q0FBeUU7O0lBQ3pFLHFDQUFlOztJQUNmLHdDQUFrQjs7QUFHcEIsTUFBTSxPQUFPLGNBQWM7SUE2QnpCO1FBTFEsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDM0IsU0FBSSxHQUFHLElBQUksR0FBRyxFQUFxRCxDQUFDO1FBSzFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQXZCRCxJQUFJLE9BQU8sS0FBNEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFOUQsSUFBSSxNQUFNLENBQUMsS0FBZTtRQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVELElBQUksT0FBTyxLQUFrQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O0lBRXBELElBQUksVUFBVSxLQUEwQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztJQWdCbEUsVUFBVSxDQUFDLEdBQUcsTUFBbUI7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBRyxNQUFtQjtRQUNsQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLE1BQU0sRUFBRTs7a0JBQ2hCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7WUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM1RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDWixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDRjtRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7Ozs7Ozs7SUFPRCxVQUFVLENBQUMsTUFBaUIsRUFBRSxNQUFpQjtjQUN2QyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSTs7WUFDM0MsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOztZQUNyQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLGVBQWUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3JELGVBQWUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25ELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2pELFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMxQztZQUNELGVBQWUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDOzs7Ozs7SUFFRCxXQUFXLENBQUMsSUFBZSxFQUFFLElBQWU7O1lBQ3RDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7O1lBQ3RDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFO2tCQUM5QixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEdBQUcsSUFBSTtZQUMvQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDMUIsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDL0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7WUFFL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDakQsU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JDLFNBQVMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RDO1lBQ0QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM3QixVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLEVBQVU7UUFDYixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxpQkFBaUI7UUFDZixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdEQsQ0FBQzs7OztJQUVELGNBQWM7O2NBQ04sUUFBUSxHQUFHLElBQUksc0JBQXNCLEVBQUU7UUFDN0MsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxxQkFBc0U7O2NBQ3pFLFNBQVMsR0FBc0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLElBQUkscUJBQXFCO1lBQ3ZGLENBQUMsQ0FBQyxxQkFBcUI7WUFDdkIsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUMsS0FBSyxFQUFFO2NBRS9ELEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFNBQVM7UUFFcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7O2NBRWhDLFFBQVEsR0FBRyxJQUFJLHNCQUFzQixFQUFFO1FBQzdDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O2NBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUU1RixJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ3JCLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQy9ELElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPO1NBQ3JELENBQUE7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ3JCLFlBQVksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1lBQy9ELElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPO1NBQ3JELENBQUE7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUUxQixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7O2dCQUN4QixNQUFpQjtZQUNyQixNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7a0JBQ3ZDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEQsWUFBWSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFN0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QjtZQUVELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsRUFBRSxFQUFFO29CQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNEQUFzRCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsZ0JBQWdCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUNsSDtnQkFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQzthQUN4QjtTQUNGO1FBRUQsS0FBSyxNQUFNLE1BQU0sSUFBSSxNQUFNLEVBQUU7O2tCQUNyQixJQUFJLEdBQWEsRUFBRTtZQUN6QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7O3NCQUN2QixPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7O3NCQUN4RCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzNEO1FBRUQsS0FBSyxNQUFNLE1BQU0sSUFBSSxXQUFXLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzQjtRQUVELEtBQUssTUFBTSxNQUFNLElBQUksTUFBTSxFQUFFOztrQkFDckIsSUFBSSxHQUFhLEVBQUU7WUFDekIsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFOztzQkFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDOztzQkFDeEQsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUN0QjtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLEdBQUcsUUFBa0I7UUFDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN6QixLQUFLLE1BQU0sTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7YUFBTTs7a0JBQ0MsSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDN0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRTs7c0JBQ3ZDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ3pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMxQixJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUNyQixPQUFPO3FCQUNSO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7OztJQUVPLFlBQVksQ0FBQyxTQUF1Qzs7Y0FDcEQsSUFBSSxHQUFhLEVBQUU7O2NBQ25CLE9BQU8sR0FBYSxFQUFFOztjQUV0QixNQUFNLEdBQXFCLEVBQUU7UUFFbkMsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFOztrQkFDckQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs7a0JBQ3BGLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRzs7OztZQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFOzs7a0JBRXRGLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7a0JBRXhELE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDOztrQkFDbkIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQUEsWUFBWSxFQUFPLEVBQUUsV0FBVyxDQUFDO1lBQ25FLElBQUksT0FBTyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3Qjs7a0JBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUN4QixPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQzthQUMvQjtZQUVELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZCO2FBQ0Y7WUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEI7UUFFRCxLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDakQsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUU7c0JBQ25DLEVBQUUsRUFBRSxFQUFFLEdBQUcsS0FBSzs7b0JBQ2hCLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUN2QixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDckI7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTOzs7O29CQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDM0U7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7U0FDRjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkcsQ0FBQzs7Ozs7Ozs7O0lBR08sYUFBYSxDQUE4QyxJQUFPLEVBQUUsUUFBZ0IsRUFBRSxLQUF3Qzs7Y0FDOUgsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7O0lBRU8sZUFBZSxDQUFzRCxFQUFVLEVBQUUsVUFBZ0I7O1lBQ25HLFlBQVksR0FBOEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9FLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFlBQVksR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBQSxZQUFZLEVBQUssQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7UUFDRCxPQUFPLG1CQUFBLFlBQVksRUFBSyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUc7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMvQixDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzNCO1NBQ0Y7UUFDRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtnQkFDYixDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztnQkFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzFFO1NBQ0Y7UUFDRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFTyxZQUFZO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFTyxRQUFRO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDbkUsQ0FBQztDQUNGOzs7SUEzU0MsdUNBQStGOztJQUMvRixxQ0FBa0M7O0lBQ2xDLG1DQUFvQjs7SUFDcEIsaUNBQXFCOztJQUNyQixvQ0FBd0I7O0lBQ3hCLHlDQUF1Qzs7SUFDdkMseUNBQXVDOzs7OztJQWF2QyxrQ0FBd0M7Ozs7O0lBQ3hDLG1DQUFxSjs7Ozs7SUFDckosaUNBQTBCOzs7OztJQUMxQixvQ0FBNkI7Ozs7O0lBQzdCLGtDQUFtQzs7Ozs7SUFDbkMsOEJBQTRFOzs7OztJQUM1RSxxQ0FBeUM7Ozs7O0lBQ3pDLGlDQUFtQzs7Ozs7Ozs7OztBQXlSckMsTUFBTSxVQUFVLGVBQWUsQ0FBVSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxPQUFlOztVQUMvRSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7VUFDekMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFM0MsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1FBQ2YsT0FBTztLQUNSOztVQUVLLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOztVQUNwQixLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFO1FBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0tBQzdCO0lBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNyQixDQUFDOzs7Ozs7O0FBR0QsU0FBUyxLQUFLLENBQUMsS0FBYSxFQUFFLEdBQVc7SUFDdkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCwgUGJsTmdyaWRDb2x1bW5TZXQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW4gfSBmcm9tICcuL21ldGEtY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4vY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtblNldCwgUGJsTWV0YVJvd0RlZmluaXRpb25zLCBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBTdG9yZSB9IGZyb20gJy4vZ3JvdXAtY29sdW1uJztcbmltcG9ydCB7IFN0YXRpY0NvbHVtbldpZHRoTG9naWMgfSBmcm9tICcuLi9jb2wtd2lkdGgtbG9naWMvc3RhdGljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyByZXNldENvbHVtbldpZHRocyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTWV0YUNvbHVtblN0b3JlIHtcbiAgaWQ6IHN0cmluZztcbiAgaGVhZGVyPzogUGJsTWV0YUNvbHVtbjtcbiAgZm9vdGVyPzogUGJsTWV0YUNvbHVtbjtcbiAgaGVhZGVyR3JvdXA/OiBQYmxDb2x1bW5Hcm91cDtcbiAgZm9vdGVyR3JvdXA/OiBQYmxDb2x1bW5Hcm91cDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxDb2x1bW5TdG9yZU1ldGFSb3cge1xuICByb3dEZWY6IFBibENvbHVtblNldDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB8IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbj4sXG4gIGtleXM6IHN0cmluZ1tdO1xuICBpc0dyb3VwPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtblN0b3JlIHtcbiAgbWV0YUNvbHVtbklkczogeyBoZWFkZXI6IEFycmF5PFBibENvbHVtblN0b3JlTWV0YVJvdz47IGZvb3RlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93PjsgfTtcbiAgbWV0YUNvbHVtbnM6IFBibE1ldGFDb2x1bW5TdG9yZVtdO1xuICBjb2x1bW5JZHM6IHN0cmluZ1tdO1xuICBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgYWxsQ29sdW1uczogUGJsQ29sdW1uW107XG4gIGhlYWRlckNvbHVtbkRlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xuICBmb290ZXJDb2x1bW5EZWY6IFBibE1ldGFSb3dEZWZpbml0aW9ucztcblxuICBnZXQgcHJpbWFyeSgpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcHJpbWFyeTsgfVxuXG4gIHNldCBoaWRkZW4odmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5faGlkZGVuID0gdmFsdWU7XG4gICAgdGhpcy5zZXRIaWRkZW4oKTtcbiAgfVxuXG4gIGdldCBncm91cEJ5KCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuX2dyb3VwQnk7IH1cblxuICBnZXQgZ3JvdXBTdG9yZSgpOiBQYmxDb2x1bW5Hcm91cFN0b3JlIHsgcmV0dXJuIHRoaXMuX2dyb3VwU3RvcmU7IH1cblxuICBwcml2YXRlIF9wcmltYXJ5OiBQYmxDb2x1bW4gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX21ldGFSb3dzOiB7IGhlYWRlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfT47IGZvb3RlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfT47IH07XG4gIHByaXZhdGUgX2hpZGRlbjogc3RyaW5nW107XG4gIHByaXZhdGUgX2FsbEhpZGRlbjogc3RyaW5nW107XG4gIHByaXZhdGUgX2dyb3VwQnk6IFBibENvbHVtbltdID0gW107XG4gIHByaXZhdGUgYnlJZCA9IG5ldyBNYXA8c3RyaW5nLCBQYmxNZXRhQ29sdW1uU3RvcmUgJiB7IGRhdGE/OiBQYmxDb2x1bW4gfT4oKTtcbiAgcHJpdmF0ZSBfZ3JvdXBTdG9yZTogUGJsQ29sdW1uR3JvdXBTdG9yZTtcbiAgcHJpdmF0ZSBsYXN0U2V0OiBQYmxOZ3JpZENvbHVtblNldDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0SWRzKCk7XG4gICAgdGhpcy5yZXNldENvbHVtbnMoKTtcbiAgfVxuXG4gIGFkZEdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIHRoaXMuZ3JvdXBCeS5wdXNoKC4uLmNvbHVtbik7XG4gICAgdGhpcy5zZXRIaWRkZW4oKTtcbiAgfVxuXG4gIHJlbW92ZUdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW4pIHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ3JvdXBCeS5maW5kSW5kZXgoIGdiYyA9PiBnYmMuaWQgPT09IGMuaWQgKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICB0aGlzLmdyb3VwQnkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0SGlkZGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgYW5jaG9yYCBjb2x1bW4uXG4gICAqIFRoZSBuZXcgbG9jYXRpb24gb2YgdGhlIGFuY2hvciBjb2x1bW4gd2lsbCBiZSBpdCdzIG9yaWdpbmFsIGxvY2F0aW9uIHBsdXMgb3IgbWludXMgMSwgZGVwZW5kaW5nIG9uIHRoZSBkZWx0YSBiZXR3ZWVuXG4gICAqIHRoZSBjb2x1bW5zLiBJZiB0aGUgb3JpZ2luIG9mIHRoZSBgY29sdW1uYCBpcyBiZWZvcmUgdGhlIGBhbmNob3JgIHRoZW4gdGhlIGFuY2hvcidzIG5ldyBwb3NpdGlvbiBpcyBtaW51cyBvbmUsIG90aGVyd2lzZSBwbHVzIDEuXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgY29sdW1ucywgY29sdW1uSWRzLCBhbGxDb2x1bW5zIH0gPSB0aGlzO1xuICAgIGxldCBhbmNob3JJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihhbmNob3IpO1xuICAgIGxldCBjb2x1bW5JbmRleCA9IGNvbHVtbnMuaW5kZXhPZihjb2x1bW4pO1xuICAgIGlmIChhbmNob3JJbmRleCA+IC0xICYmIGNvbHVtbkluZGV4ID4gLTEpIHtcbiAgICAgIG1vdmVJdGVtSW5BcnJheShjb2x1bW5JZHMsIGNvbHVtbkluZGV4LCBhbmNob3JJbmRleCk7XG4gICAgICBtb3ZlSXRlbUluQXJyYXkoY29sdW1ucywgY29sdW1uSW5kZXgsIGFuY2hvckluZGV4KTtcbiAgICAgIGlmICh0aGlzLl9hbGxIaWRkZW4gJiYgdGhpcy5fYWxsSGlkZGVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYW5jaG9ySW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoYW5jaG9yKTtcbiAgICAgICAgY29sdW1uSW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcbiAgICAgIH1cbiAgICAgIG1vdmVJdGVtSW5BcnJheShhbGxDb2x1bW5zLCBjb2x1bW5JbmRleCwgYW5jaG9ySW5kZXgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3dhcENvbHVtbnMoY29sMTogUGJsQ29sdW1uLCBjb2wyOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBsZXQgY29sMUluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sMSk7XG4gICAgbGV0IGNvbDJJbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbDIpO1xuICAgIGlmIChjb2wxSW5kZXggPiAtMSAmJiBjb2wySW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgeyBjb2x1bW5zLCBjb2x1bW5JZHMsIGFsbENvbHVtbnMgfSA9IHRoaXM7XG4gICAgICBjb2x1bW5zW2NvbDFJbmRleF0gPSBjb2wyO1xuICAgICAgY29sdW1uc1tjb2wySW5kZXhdID0gY29sMTtcbiAgICAgIGNvbHVtbklkc1tjb2wxSW5kZXhdID0gY29sMi5pZDtcbiAgICAgIGNvbHVtbklkc1tjb2wySW5kZXhdID0gY29sMS5pZDtcblxuICAgICAgaWYgKHRoaXMuX2FsbEhpZGRlbiAmJiB0aGlzLl9hbGxIaWRkZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb2wxSW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoY29sMSk7XG4gICAgICAgIGNvbDJJbmRleCA9IGFsbENvbHVtbnMuaW5kZXhPZihjb2wyKTtcbiAgICAgIH1cbiAgICAgIGFsbENvbHVtbnNbY29sMUluZGV4XSA9IGNvbDI7XG4gICAgICBhbGxDb2x1bW5zW2NvbDJJbmRleF0gPSBjb2wxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbmQoaWQ6IHN0cmluZyk6IFBibE1ldGFDb2x1bW5TdG9yZSAmIHsgZGF0YT86IFBibENvbHVtbiB9IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5ieUlkLmdldChpZCk7XG4gIH1cblxuICBnZXRBbGxIZWFkZXJHcm91cCgpOiBQYmxDb2x1bW5Hcm91cFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBTdG9yZSA/IHRoaXMuX2dyb3VwU3RvcmUuYWxsIDogW107XG4gIH1cblxuICBnZXRTdGF0aWNXaWR0aCgpOiBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljIHtcbiAgICBjb25zdCByb3dXaWR0aCA9IG5ldyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljKCk7XG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgdGhpcy5jb2x1bW5zKSB7XG4gICAgICByb3dXaWR0aC5hZGRDb2x1bW4oY29sdW1uKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd1dpZHRoO1xuICB9XG5cbiAgaW52YWxpZGF0ZShjb2x1bW5PckRlZmluaXRpb25TZXQ6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCB8IFBibE5ncmlkQ29sdW1uU2V0KTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uU2V0OiBQYmxOZ3JpZENvbHVtblNldCA9IHRoaXMubGFzdFNldCA9ICdncm91cFN0b3JlJyBpbiBjb2x1bW5PckRlZmluaXRpb25TZXRcbiAgICAgID8gY29sdW1uT3JEZWZpbml0aW9uU2V0XG4gICAgICA6IFBibENvbHVtbkZhY3RvcnkuZnJvbURlZmluaXRpb25TZXQoY29sdW1uT3JEZWZpbml0aW9uU2V0KS5idWlsZCgpXG4gICAgO1xuICAgIGNvbnN0IHsgZ3JvdXBTdG9yZSwgdGFibGUsIGhlYWRlciwgZm9vdGVyLCBoZWFkZXJHcm91cCB9ID0gY29sdW1uU2V0O1xuXG4gICAgdGhpcy5fZ3JvdXBTdG9yZSA9IGdyb3VwU3RvcmUuY2xvbmUoKTtcblxuICAgIGNvbnN0IHJvd1dpZHRoID0gbmV3IFN0YXRpY0NvbHVtbldpZHRoTG9naWMoKTtcbiAgICB0aGlzLnJlc2V0Q29sdW1ucygpO1xuICAgIHRoaXMucmVzZXRJZHMoKTtcbiAgICBjb25zdCBoaWRkZW4gPSB0aGlzLl9hbGxIaWRkZW4gPSAodGhpcy5faGlkZGVuIHx8IFtdKS5jb25jYXQodGhpcy5fZ3JvdXBCeS5tYXAoIGMgPT4gYy5pZCApKTtcblxuICAgIHRoaXMuaGVhZGVyQ29sdW1uRGVmID0ge1xuICAgICAgcm93Q2xhc3NOYW1lOiAodGFibGUuaGVhZGVyICYmIHRhYmxlLmhlYWRlci5yb3dDbGFzc05hbWUpIHx8ICcnLFxuICAgICAgdHlwZTogKHRhYmxlLmhlYWRlciAmJiB0YWJsZS5oZWFkZXIudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9XG4gICAgdGhpcy5mb290ZXJDb2x1bW5EZWYgPSB7XG4gICAgICByb3dDbGFzc05hbWU6ICh0YWJsZS5mb290ZXIgJiYgdGFibGUuZm9vdGVyLnJvd0NsYXNzTmFtZSkgfHwgJycsXG4gICAgICB0eXBlOiAodGFibGUuZm9vdGVyICYmIHRhYmxlLmZvb3Rlci50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH1cblxuICAgIHRoaXMuX3ByaW1hcnkgPSB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKGNvbnN0IGRlZiBvZiB0YWJsZS5jb2xzKSB7XG4gICAgICBsZXQgY29sdW1uOiBQYmxDb2x1bW47XG4gICAgICBjb2x1bW4gPSBuZXcgUGJsQ29sdW1uKGRlZiwgdGhpcy5ncm91cFN0b3JlKTtcbiAgICAgIGNvbnN0IGNvbHVtblJlY29yZCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGNvbHVtbi5pZCk7XG4gICAgICBjb2x1bW5SZWNvcmQuZGF0YSA9IGNvbHVtbjtcbiAgICAgIHRoaXMuYWxsQ29sdW1ucy5wdXNoKGNvbHVtbik7XG5cbiAgICAgIGNvbHVtbi5oaWRkZW4gPSBoaWRkZW4uaW5kZXhPZihjb2x1bW4uaWQpID4gLTE7XG4gICAgICBpZiAoIWNvbHVtbi5oaWRkZW4pIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaChjb2x1bW4uaWQpO1xuICAgICAgICByb3dXaWR0aC5hZGRDb2x1bW4oY29sdW1uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5wSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ByaW1hcnkgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE11bHRpcGxlIHByaW1hcnkgaW5kZXggY29sdW1ucyBkZWZpbmVkOiBwcmV2aW91czogXCIke3RoaXMuX3ByaW1hcnkuaWR9XCIsIGN1cnJlbnQ6IFwiJHtjb2x1bW4uaWR9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmltYXJ5ID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZGVmIG9mIHJvd0RlZi5jb2xzKSB7XG4gICAgICAgIGNvbnN0IG1ldGFDb2wgPSB0aGlzLmdldENvbHVtblJlY29yZChkZWYuaWQsIHRoaXMubWV0YUNvbHVtbnMpO1xuICAgICAgICBjb25zdCBjb2x1bW4gPSBtZXRhQ29sLmhlYWRlciB8fCAobWV0YUNvbC5oZWFkZXIgPSBuZXcgUGJsTWV0YUNvbHVtbihkZWYpKTtcbiAgICAgICAga2V5cy5wdXNoKGNvbHVtbi5pZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9tZXRhUm93cy5oZWFkZXJbcm93RGVmLnJvd0luZGV4XSA9IHsgcm93RGVmLCBrZXlzIH07XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgaGVhZGVyR3JvdXApIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUdyb3VwKHJvd0RlZik7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgZm9vdGVyKSB7XG4gICAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBkZWYgb2Ygcm93RGVmLmNvbHMpIHtcbiAgICAgICAgY29uc3QgbWV0YUNvbCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGRlZi5pZCwgdGhpcy5tZXRhQ29sdW1ucyk7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IG1ldGFDb2wuZm9vdGVyIHx8IChtZXRhQ29sLmZvb3RlciA9IG5ldyBQYmxNZXRhQ29sdW1uKGRlZikpO1xuICAgICAgICBrZXlzLnB1c2goY29sdW1uLmlkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21ldGFSb3dzLmZvb3Rlci5wdXNoKHsgcm93RGVmLCBrZXlzIH0pO1xuICAgIH1cbiAgICByZXNldENvbHVtbldpZHRocyhyb3dXaWR0aCwgdGhpcy5jb2x1bW5zLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgfVxuXG4gIHVwZGF0ZUdyb3VwcyguLi5yb3dJbmRleDogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAocm93SW5kZXgubGVuZ3RoID09PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiB0aGlzLmxhc3RTZXQuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlR3JvdXAocm93RGVmKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93cyA9IHJvd0luZGV4LnNsaWNlKCk7XG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiB0aGlzLmxhc3RTZXQuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgY29uc3QgaWR4ID0gcm93cy5pbmRleE9mKHJvd0RlZi5yb3dJbmRleCk7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIHJvd3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlR3JvdXAocm93RGVmKTtcbiAgICAgICAgICBpZiAocm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVHcm91cChjb2x1bW5TZXQ6IFBibENvbHVtblNldDxQYmxDb2x1bW5Hcm91cD4pOiB2b2lkIHtcbiAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGFsbEtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdCBncm91cHM6IFBibENvbHVtbkdyb3VwW10gPSBbXTtcblxuICAgIGZvciAobGV0IHRJbmRleCA9IDA7IHRJbmRleCA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IHRJbmRleCsrKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gW3RoaXMuY29sdW1uc1t0SW5kZXggLSAxXSwgdGhpcy5jb2x1bW5zW3RJbmRleF0sIHRoaXMuY29sdW1uc1t0SW5kZXggKyAxXV07XG4gICAgICBjb25zdCBjb2x1bW5Hcm91cHMgPSBjb2x1bW5zLm1hcCggYyA9PiBjID8gYy5nZXRHcm91cE9mUm93KGNvbHVtblNldC5yb3dJbmRleCkgOiB1bmRlZmluZWQgKTtcbiAgICAgIC8vIHRydWUgd2hlbiB0aGUgZ3JvdXAgZXhpc3RzIGluIG9uZSBvZiB0aGUgY29sdW1ucyBCVVQgTk9UIGluIHRoZSBMQVNUIENPTFVNTiAoaS5lOiBJdHMgYSBzbGF2ZSBzcGxpdClcbiAgICAgIGNvbnN0IGdyb3VwRXhpc3RzID0gZ3JvdXBzLmxhc3RJbmRleE9mKGNvbHVtbkdyb3Vwc1sxXSkgIT09IC0xO1xuXG4gICAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5zWzFdO1xuICAgICAgY29uc3QgZ0NvbHVtbiA9IGNvbHVtbi5ncm91cExvZ2ljKGNvbHVtbkdyb3VwcyBhcyBhbnksIGdyb3VwRXhpc3RzKTtcbiAgICAgIGlmIChnQ29sdW1uICE9PSBjb2x1bW5Hcm91cHNbMV0pIHtcbiAgICAgICAgY29sdW1uLm1hcmtOb3RJbkdyb3VwKGNvbHVtbkdyb3Vwc1sxXSk7XG4gICAgICAgIGNvbHVtbi5tYXJrSW5Hcm91cChnQ29sdW1uKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWV0YUNvbCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGdDb2x1bW4uaWQsIHRoaXMubWV0YUNvbHVtbnMpO1xuICAgICAgaWYgKCFtZXRhQ29sLmhlYWRlckdyb3VwKSB7XG4gICAgICAgIG1ldGFDb2wuaGVhZGVyR3JvdXAgPSBnQ29sdW1uO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3JvdXBzLmxhc3RJbmRleE9mKGdDb2x1bW4pID09PSAtMSkge1xuICAgICAgICBhbGxLZXlzLnB1c2goZ0NvbHVtbi5pZCk7XG4gICAgICAgIGlmIChnQ29sdW1uLmlzVmlzaWJsZSkge1xuICAgICAgICAgIGtleXMucHVzaChnQ29sdW1uLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBnQ29sdW1uLnJlcGxhY2UoY29sdW1uKTtcbiAgICAgIGdyb3Vwcy5wdXNoKGdDb2x1bW4pO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZ2hvc3Qgb2YgdGhpcy5fZ3JvdXBTdG9yZS5maW5kR2hvc3RzKCkpIHtcbiAgICAgIGlmIChnaG9zdC5yb3dJbmRleCA9PT0gY29sdW1uU2V0LnJvd0luZGV4KSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IGdob3N0O1xuICAgICAgICBsZXQgaWR4ID0gYWxsS2V5cy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICBhbGxLZXlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIGlkeCA9IGtleXMuaW5kZXhPZihpZCk7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGtleXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWV0YUNvbHVtbnMuc3BsaWNlKHRoaXMubWV0YUNvbHVtbnMuZmluZEluZGV4KCBtID0+IG0uaWQgPT09IGlkKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ3JvdXBTdG9yZS5yZW1vdmUoZ2hvc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZU1ldGFSb3coJ2hlYWRlcicsIGNvbHVtblNldC5yb3dJbmRleCwgeyByb3dEZWY6IGNvbHVtblNldCwga2V5cywgYWxsS2V5cywgaXNHcm91cDogdHJ1ZSB9KVxuICB9XG5cblxuICBwcml2YXRlIHVwZGF0ZU1ldGFSb3c8UCBleHRlbmRzIGtleW9mIFBibENvbHVtblN0b3JlWydfbWV0YVJvd3MnXT4odHlwZTogUCwgcm93SW5kZXg6IG51bWJlciwgdmFsdWU6IFBibENvbHVtblN0b3JlWydfbWV0YVJvd3MnXVtQXVswXSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnIgPSB0aGlzLl9tZXRhUm93c1t0eXBlXVtyb3dJbmRleF0gfHwge307XG4gICAgdGhpcy5fbWV0YVJvd3NbdHlwZV1bcm93SW5kZXhdID0gT2JqZWN0LmFzc2lnbihjdXJyLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbHVtblJlY29yZDxUIGV4dGVuZHMgUGJsTWV0YUNvbHVtblN0b3JlICYgeyBkYXRhPzogUGJsQ29sdW1uIH0+KGlkOiBzdHJpbmcsIGNvbGxlY3Rpb24/OiBUW10pOiBUICB7XG4gICAgbGV0IGNvbHVtblJlY29yZDogUGJsTWV0YUNvbHVtblN0b3JlICYgeyBkYXRhPzogUGJsQ29sdW1uIH0gPSB0aGlzLmJ5SWQuZ2V0KGlkKTtcbiAgICBpZiAoIWNvbHVtblJlY29yZCkge1xuICAgICAgdGhpcy5ieUlkLnNldChpZCwgY29sdW1uUmVjb3JkID0geyBpZCB9KTtcbiAgICAgIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24ucHVzaChjb2x1bW5SZWNvcmQgYXMgVCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5SZWNvcmQgYXMgVDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SGlkZGVuKCk6IHZvaWQge1xuICAgIHRoaXMuX2FsbEhpZGRlbiA9ICh0aGlzLl9oaWRkZW4gfHwgW10pLmNvbmNhdCh0aGlzLl9ncm91cEJ5Lm1hcCggYyA9PiBjLmlkICkpO1xuICAgIHRoaXMuY29sdW1uSWRzID0gW107XG4gICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgZm9yIChjb25zdCBjIG9mIHRoaXMuYWxsQ29sdW1ucykge1xuICAgICAgYy5oaWRkZW4gPSB0aGlzLl9hbGxIaWRkZW4uaW5kZXhPZihjLmlkKSA+IC0xO1xuICAgICAgaWYgKCFjLmhpZGRlbikge1xuICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjKTtcbiAgICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaChjLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBoIG9mIHRoaXMuX21ldGFSb3dzLmhlYWRlcikge1xuICAgICAgaWYgKGguaXNHcm91cCkge1xuICAgICAgICBoLmtleXMgPSBoLmFsbEtleXMuZmlsdGVyKCBrZXkgPT4gdGhpcy5maW5kKGtleSkuaGVhZGVyR3JvdXAuaXNWaXNpYmxlICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5jb2x1bW5zLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDb2x1bW5zKCk6IHZvaWQge1xuICAgIHRoaXMuYWxsQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIHRoaXMubWV0YUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLmJ5SWQuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJZHMoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5JZHMgPSBbXTtcbiAgICB0aGlzLl9tZXRhUm93cyA9IHRoaXMubWV0YUNvbHVtbklkcyA9IHsgaGVhZGVyOiBbXSwgZm9vdGVyOiBbXSB9O1xuICB9XG59XG5cbi8qKlxuICogTW92ZXMgYW4gaXRlbSBvbmUgaW5kZXggaW4gYW4gYXJyYXkgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSBhcnJheSBBcnJheSBpbiB3aGljaCB0byBtb3ZlIHRoZSBpdGVtLlxuICogQHBhcmFtIGZyb21JbmRleCBTdGFydGluZyBpbmRleCBvZiB0aGUgaXRlbS5cbiAqIEBwYXJhbSB0b0luZGV4IEluZGV4IHRvIHdoaWNoIHRoZSBpdGVtIHNob3VsZCBiZSBtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdmVJdGVtSW5BcnJheTxUID0gYW55PihhcnJheTogVFtdLCBmcm9tSW5kZXg6IG51bWJlciwgdG9JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IGZyb20gPSBjbGFtcChmcm9tSW5kZXgsIGFycmF5Lmxlbmd0aCAtIDEpO1xuICBjb25zdCB0byA9IGNsYW1wKHRvSW5kZXgsIGFycmF5Lmxlbmd0aCAtIDEpO1xuXG4gIGlmIChmcm9tID09PSB0bykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRhcmdldCA9IGFycmF5W2Zyb21dO1xuICBjb25zdCBkZWx0YSA9IHRvIDwgZnJvbSA/IC0xIDogMTtcblxuICBmb3IgKGxldCBpID0gZnJvbTsgaSAhPT0gdG87IGkgKz0gZGVsdGEpIHtcbiAgICBhcnJheVtpXSA9IGFycmF5W2kgKyBkZWx0YV07XG4gIH1cblxuICBhcnJheVt0b10gPSB0YXJnZXQ7XG59XG5cbi8qKiBDbGFtcHMgYSBudW1iZXIgYmV0d2VlbiB6ZXJvIGFuZCBhIG1heGltdW0uICovXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXgsIHZhbHVlKSk7XG59XG4iXX0=