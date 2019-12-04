/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvY29sdW1uLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUdyQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUFFN0Msd0NBTUM7OztJQUxDLGdDQUFXOztJQUNYLG9DQUF1Qjs7SUFDdkIsb0NBQXVCOztJQUN2Qix5Q0FBNkI7O0lBQzdCLHlDQUE2Qjs7Ozs7QUFHL0IsMkNBSUM7OztJQUhDLHVDQUF5RTs7SUFDekUscUNBQWU7O0lBQ2Ysd0NBQWtCOztBQUdwQixNQUFNLE9BQU8sY0FBYztJQTZCekI7UUFMUSxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQXFELENBQUM7UUFLMUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7O0lBdkJELElBQUksT0FBTyxLQUE0QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztJQUU5RCxJQUFJLE1BQU0sQ0FBQyxLQUFlO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsSUFBSSxPQUFPLEtBQWtCLE9B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LElBQUksS0FBSyxFQUFFLEVBQUU7UUFDZixPQUFPO0tBQ1I7O1VBRUssTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7O1VBQ3BCLEtBQUssR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoQyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUU7UUFDdkMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7S0FDN0I7SUFFRCxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLENBQUM7Ozs7Ozs7QUFHRCxTQUFTLEtBQUssQ0FBQyxLQUFhLEVBQUUsR0FBVztJQUN2QyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDM0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LCBQYmxOZ3JpZENvbHVtblNldCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4vbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uU2V0LCBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbkdyb3VwLCBQYmxDb2x1bW5Hcm91cFN0b3JlIH0gZnJvbSAnLi9ncm91cC1jb2x1bW4nO1xuaW1wb3J0IHsgU3RhdGljQ29sdW1uV2lkdGhMb2dpYyB9IGZyb20gJy4uL2NvbC13aWR0aC1sb2dpYy9zdGF0aWMtY29sdW1uLXdpZHRoJztcbmltcG9ydCB7IHJlc2V0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi4vdXRpbHMvaGVscGVycyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5GYWN0b3J5IH0gZnJvbSAnLi9mYWN0b3J5JztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxNZXRhQ29sdW1uU3RvcmUge1xuICBpZDogc3RyaW5nO1xuICBoZWFkZXI/OiBQYmxNZXRhQ29sdW1uO1xuICBmb290ZXI/OiBQYmxNZXRhQ29sdW1uO1xuICBoZWFkZXJHcm91cD86IFBibENvbHVtbkdyb3VwO1xuICBmb290ZXJHcm91cD86IFBibENvbHVtbkdyb3VwO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibENvbHVtblN0b3JlTWV0YVJvdyB7XG4gIHJvd0RlZjogUGJsQ29sdW1uU2V0PFBibE1ldGFDb2x1bW5EZWZpbml0aW9uIHwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uPixcbiAga2V5czogc3RyaW5nW107XG4gIGlzR3JvdXA/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uU3RvcmUge1xuICBtZXRhQ29sdW1uSWRzOiB7IGhlYWRlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93PjsgZm9vdGVyOiBBcnJheTxQYmxDb2x1bW5TdG9yZU1ldGFSb3c+OyB9O1xuICBtZXRhQ29sdW1uczogUGJsTWV0YUNvbHVtblN0b3JlW107XG4gIGNvbHVtbklkczogc3RyaW5nW107XG4gIGNvbHVtbnM6IFBibENvbHVtbltdO1xuICBhbGxDb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgaGVhZGVyQ29sdW1uRGVmOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XG4gIGZvb3RlckNvbHVtbkRlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xuXG4gIGdldCBwcmltYXJ5KCk6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9wcmltYXJ5OyB9XG5cbiAgc2V0IGhpZGRlbih2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9oaWRkZW4gPSB2YWx1ZTtcbiAgICB0aGlzLnNldEhpZGRlbigpO1xuICB9XG5cbiAgZ2V0IGdyb3VwQnkoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5fZ3JvdXBCeTsgfVxuXG4gIGdldCBncm91cFN0b3JlKCk6IFBibENvbHVtbkdyb3VwU3RvcmUgeyByZXR1cm4gdGhpcy5fZ3JvdXBTdG9yZTsgfVxuXG4gIHByaXZhdGUgX3ByaW1hcnk6IFBibENvbHVtbiB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfbWV0YVJvd3M6IHsgaGVhZGVyOiBBcnJheTxQYmxDb2x1bW5TdG9yZU1ldGFSb3cgJiB7IGFsbEtleXM/OiBzdHJpbmdbXSB9PjsgZm9vdGVyOiBBcnJheTxQYmxDb2x1bW5TdG9yZU1ldGFSb3cgJiB7IGFsbEtleXM/OiBzdHJpbmdbXSB9PjsgfTtcbiAgcHJpdmF0ZSBfaGlkZGVuOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfYWxsSGlkZGVuOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfZ3JvdXBCeTogUGJsQ29sdW1uW10gPSBbXTtcbiAgcHJpdmF0ZSBieUlkID0gbmV3IE1hcDxzdHJpbmcsIFBibE1ldGFDb2x1bW5TdG9yZSAmIHsgZGF0YT86IFBibENvbHVtbiB9PigpO1xuICBwcml2YXRlIF9ncm91cFN0b3JlOiBQYmxDb2x1bW5Hcm91cFN0b3JlO1xuICBwcml2YXRlIGxhc3RTZXQ6IFBibE5ncmlkQ29sdW1uU2V0O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzZXRJZHMoKTtcbiAgICB0aGlzLnJlc2V0Q29sdW1ucygpO1xuICB9XG5cbiAgYWRkR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgdGhpcy5ncm91cEJ5LnB1c2goLi4uY29sdW1uKTtcbiAgICB0aGlzLnNldEhpZGRlbigpO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbikge1xuICAgICAgY29uc3QgaWR4ID0gdGhpcy5ncm91cEJ5LmZpbmRJbmRleCggZ2JjID0+IGdiYy5pZCA9PT0gYy5pZCApO1xuICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBCeS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRIaWRkZW4oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBhbmNob3JgIGNvbHVtbi5cbiAgICogVGhlIG5ldyBsb2NhdGlvbiBvZiB0aGUgYW5jaG9yIGNvbHVtbiB3aWxsIGJlIGl0J3Mgb3JpZ2luYWwgbG9jYXRpb24gcGx1cyBvciBtaW51cyAxLCBkZXBlbmRpbmcgb24gdGhlIGRlbHRhIGJldHdlZW5cbiAgICogdGhlIGNvbHVtbnMuIElmIHRoZSBvcmlnaW4gb2YgdGhlIGBjb2x1bW5gIGlzIGJlZm9yZSB0aGUgYGFuY2hvcmAgdGhlbiB0aGUgYW5jaG9yJ3MgbmV3IHBvc2l0aW9uIGlzIG1pbnVzIG9uZSwgb3RoZXJ3aXNlIHBsdXMgMS5cbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBjb2x1bW5zLCBjb2x1bW5JZHMsIGFsbENvbHVtbnMgfSA9IHRoaXM7XG4gICAgbGV0IGFuY2hvckluZGV4ID0gY29sdW1ucy5pbmRleE9mKGFuY2hvcik7XG4gICAgbGV0IGNvbHVtbkluZGV4ID0gY29sdW1ucy5pbmRleE9mKGNvbHVtbik7XG4gICAgaWYgKGFuY2hvckluZGV4ID4gLTEgJiYgY29sdW1uSW5kZXggPiAtMSkge1xuICAgICAgbW92ZUl0ZW1JbkFycmF5KGNvbHVtbklkcywgY29sdW1uSW5kZXgsIGFuY2hvckluZGV4KTtcbiAgICAgIG1vdmVJdGVtSW5BcnJheShjb2x1bW5zLCBjb2x1bW5JbmRleCwgYW5jaG9ySW5kZXgpO1xuICAgICAgaWYgKHRoaXMuX2FsbEhpZGRlbiAmJiB0aGlzLl9hbGxIaWRkZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBhbmNob3JJbmRleCA9IGFsbENvbHVtbnMuaW5kZXhPZihhbmNob3IpO1xuICAgICAgICBjb2x1bW5JbmRleCA9IGFsbENvbHVtbnMuaW5kZXhPZihjb2x1bW4pO1xuICAgICAgfVxuICAgICAgbW92ZUl0ZW1JbkFycmF5KGFsbENvbHVtbnMsIGNvbHVtbkluZGV4LCBhbmNob3JJbmRleCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzd2FwQ29sdW1ucyhjb2wxOiBQYmxDb2x1bW4sIGNvbDI6IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGxldCBjb2wxSW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2wxKTtcbiAgICBsZXQgY29sMkluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sMik7XG4gICAgaWYgKGNvbDFJbmRleCA+IC0xICYmIGNvbDJJbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCB7IGNvbHVtbnMsIGNvbHVtbklkcywgYWxsQ29sdW1ucyB9ID0gdGhpcztcbiAgICAgIGNvbHVtbnNbY29sMUluZGV4XSA9IGNvbDI7XG4gICAgICBjb2x1bW5zW2NvbDJJbmRleF0gPSBjb2wxO1xuICAgICAgY29sdW1uSWRzW2NvbDFJbmRleF0gPSBjb2wyLmlkO1xuICAgICAgY29sdW1uSWRzW2NvbDJJbmRleF0gPSBjb2wxLmlkO1xuXG4gICAgICBpZiAodGhpcy5fYWxsSGlkZGVuICYmIHRoaXMuX2FsbEhpZGRlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbDFJbmRleCA9IGFsbENvbHVtbnMuaW5kZXhPZihjb2wxKTtcbiAgICAgICAgY29sMkluZGV4ID0gYWxsQ29sdW1ucy5pbmRleE9mKGNvbDIpO1xuICAgICAgfVxuICAgICAgYWxsQ29sdW1uc1tjb2wxSW5kZXhdID0gY29sMjtcbiAgICAgIGFsbENvbHVtbnNbY29sMkluZGV4XSA9IGNvbDE7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmluZChpZDogc3RyaW5nKTogUGJsTWV0YUNvbHVtblN0b3JlICYgeyBkYXRhPzogUGJsQ29sdW1uIH0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLmJ5SWQuZ2V0KGlkKTtcbiAgfVxuXG4gIGdldEFsbEhlYWRlckdyb3VwKCk6IFBibENvbHVtbkdyb3VwW10ge1xuICAgIHJldHVybiB0aGlzLl9ncm91cFN0b3JlID8gdGhpcy5fZ3JvdXBTdG9yZS5hbGwgOiBbXTtcbiAgfVxuXG4gIGdldFN0YXRpY1dpZHRoKCk6IFN0YXRpY0NvbHVtbldpZHRoTG9naWMge1xuICAgIGNvbnN0IHJvd1dpZHRoID0gbmV3IFN0YXRpY0NvbHVtbldpZHRoTG9naWMoKTtcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiB0aGlzLmNvbHVtbnMpIHtcbiAgICAgIHJvd1dpZHRoLmFkZENvbHVtbihjb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gcm93V2lkdGg7XG4gIH1cblxuICBpbnZhbGlkYXRlKGNvbHVtbk9yRGVmaW5pdGlvblNldDogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0IHwgUGJsTmdyaWRDb2x1bW5TZXQpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW5TZXQ6IFBibE5ncmlkQ29sdW1uU2V0ID0gdGhpcy5sYXN0U2V0ID0gJ2dyb3VwU3RvcmUnIGluIGNvbHVtbk9yRGVmaW5pdGlvblNldFxuICAgICAgPyBjb2x1bW5PckRlZmluaXRpb25TZXRcbiAgICAgIDogUGJsQ29sdW1uRmFjdG9yeS5mcm9tRGVmaW5pdGlvblNldChjb2x1bW5PckRlZmluaXRpb25TZXQpLmJ1aWxkKClcbiAgICA7XG4gICAgY29uc3QgeyBncm91cFN0b3JlLCB0YWJsZSwgaGVhZGVyLCBmb290ZXIsIGhlYWRlckdyb3VwIH0gPSBjb2x1bW5TZXQ7XG5cbiAgICB0aGlzLl9ncm91cFN0b3JlID0gZ3JvdXBTdG9yZS5jbG9uZSgpO1xuXG4gICAgY29uc3Qgcm93V2lkdGggPSBuZXcgU3RhdGljQ29sdW1uV2lkdGhMb2dpYygpO1xuICAgIHRoaXMucmVzZXRDb2x1bW5zKCk7XG4gICAgdGhpcy5yZXNldElkcygpO1xuICAgIGNvbnN0IGhpZGRlbiA9IHRoaXMuX2FsbEhpZGRlbiA9ICh0aGlzLl9oaWRkZW4gfHwgW10pLmNvbmNhdCh0aGlzLl9ncm91cEJ5Lm1hcCggYyA9PiBjLmlkICkpO1xuXG4gICAgdGhpcy5oZWFkZXJDb2x1bW5EZWYgPSB7XG4gICAgICByb3dDbGFzc05hbWU6ICh0YWJsZS5oZWFkZXIgJiYgdGFibGUuaGVhZGVyLnJvd0NsYXNzTmFtZSkgfHwgJycsXG4gICAgICB0eXBlOiAodGFibGUuaGVhZGVyICYmIHRhYmxlLmhlYWRlci50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH1cbiAgICB0aGlzLmZvb3RlckNvbHVtbkRlZiA9IHtcbiAgICAgIHJvd0NsYXNzTmFtZTogKHRhYmxlLmZvb3RlciAmJiB0YWJsZS5mb290ZXIucm93Q2xhc3NOYW1lKSB8fCAnJyxcbiAgICAgIHR5cGU6ICh0YWJsZS5mb290ZXIgJiYgdGFibGUuZm9vdGVyLnR5cGUpIHx8ICdmaXhlZCcsXG4gICAgfVxuXG4gICAgdGhpcy5fcHJpbWFyeSA9IHVuZGVmaW5lZDtcblxuICAgIGZvciAoY29uc3QgZGVmIG9mIHRhYmxlLmNvbHMpIHtcbiAgICAgIGxldCBjb2x1bW46IFBibENvbHVtbjtcbiAgICAgIGNvbHVtbiA9IG5ldyBQYmxDb2x1bW4oZGVmLCB0aGlzLmdyb3VwU3RvcmUpO1xuICAgICAgY29uc3QgY29sdW1uUmVjb3JkID0gdGhpcy5nZXRDb2x1bW5SZWNvcmQoY29sdW1uLmlkKTtcbiAgICAgIGNvbHVtblJlY29yZC5kYXRhID0gY29sdW1uO1xuICAgICAgdGhpcy5hbGxDb2x1bW5zLnB1c2goY29sdW1uKTtcblxuICAgICAgY29sdW1uLmhpZGRlbiA9IGhpZGRlbi5pbmRleE9mKGNvbHVtbi5pZCkgPiAtMTtcbiAgICAgIGlmICghY29sdW1uLmhpZGRlbikge1xuICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjb2x1bW4pO1xuICAgICAgICB0aGlzLmNvbHVtbklkcy5wdXNoKGNvbHVtbi5pZCk7XG4gICAgICAgIHJvd1dpZHRoLmFkZENvbHVtbihjb2x1bW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29sdW1uLnBJbmRleCkge1xuICAgICAgICBpZiAodGhpcy5fcHJpbWFyeSAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTXVsdGlwbGUgcHJpbWFyeSBpbmRleCBjb2x1bW5zIGRlZmluZWQ6IHByZXZpb3VzOiBcIiR7dGhpcy5fcHJpbWFyeS5pZH1cIiwgY3VycmVudDogXCIke2NvbHVtbi5pZH1cImApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ByaW1hcnkgPSBjb2x1bW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgaGVhZGVyKSB7XG4gICAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBkZWYgb2Ygcm93RGVmLmNvbHMpIHtcbiAgICAgICAgY29uc3QgbWV0YUNvbCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGRlZi5pZCwgdGhpcy5tZXRhQ29sdW1ucyk7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IG1ldGFDb2wuaGVhZGVyIHx8IChtZXRhQ29sLmhlYWRlciA9IG5ldyBQYmxNZXRhQ29sdW1uKGRlZikpO1xuICAgICAgICBrZXlzLnB1c2goY29sdW1uLmlkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21ldGFSb3dzLmhlYWRlcltyb3dEZWYucm93SW5kZXhdID0geyByb3dEZWYsIGtleXMgfTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBoZWFkZXJHcm91cCkge1xuICAgICAgdGhpcy5fdXBkYXRlR3JvdXAocm93RGVmKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBmb290ZXIpIHtcbiAgICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gW107XG4gICAgICBmb3IgKGNvbnN0IGRlZiBvZiByb3dEZWYuY29scykge1xuICAgICAgICBjb25zdCBtZXRhQ29sID0gdGhpcy5nZXRDb2x1bW5SZWNvcmQoZGVmLmlkLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgICAgICAgY29uc3QgY29sdW1uID0gbWV0YUNvbC5mb290ZXIgfHwgKG1ldGFDb2wuZm9vdGVyID0gbmV3IFBibE1ldGFDb2x1bW4oZGVmKSk7XG4gICAgICAgIGtleXMucHVzaChjb2x1bW4uaWQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbWV0YVJvd3MuZm9vdGVyLnB1c2goeyByb3dEZWYsIGtleXMgfSk7XG4gICAgfVxuICAgIHJlc2V0Q29sdW1uV2lkdGhzKHJvd1dpZHRoLCB0aGlzLmNvbHVtbnMsIHRoaXMubWV0YUNvbHVtbnMpO1xuICB9XG5cbiAgdXBkYXRlR3JvdXBzKC4uLnJvd0luZGV4OiBudW1iZXJbXSk6IHZvaWQge1xuICAgIGlmIChyb3dJbmRleC5sZW5ndGggPT09IDApIHtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMubGFzdFNldC5oZWFkZXJHcm91cCkge1xuICAgICAgICB0aGlzLl91cGRhdGVHcm91cChyb3dEZWYpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCByb3dzID0gcm93SW5kZXguc2xpY2UoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMubGFzdFNldC5oZWFkZXJHcm91cCkge1xuICAgICAgICBjb25zdCBpZHggPSByb3dzLmluZGV4T2Yocm93RGVmLnJvd0luZGV4KTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgcm93cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB0aGlzLl91cGRhdGVHcm91cChyb3dEZWYpO1xuICAgICAgICAgIGlmIChyb3dzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUdyb3VwKGNvbHVtblNldDogUGJsQ29sdW1uU2V0PFBibENvbHVtbkdyb3VwPik6IHZvaWQge1xuICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgYWxsS2V5czogc3RyaW5nW10gPSBbXTtcblxuICAgIGNvbnN0IGdyb3VwczogUGJsQ29sdW1uR3JvdXBbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgdEluZGV4ID0gMDsgdEluZGV4IDwgdGhpcy5jb2x1bW5zLmxlbmd0aDsgdEluZGV4KyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbdGhpcy5jb2x1bW5zW3RJbmRleCAtIDFdLCB0aGlzLmNvbHVtbnNbdEluZGV4XSwgdGhpcy5jb2x1bW5zW3RJbmRleCArIDFdXTtcbiAgICAgIGNvbnN0IGNvbHVtbkdyb3VwcyA9IGNvbHVtbnMubWFwKCBjID0+IGMgPyBjLmdldEdyb3VwT2ZSb3coY29sdW1uU2V0LnJvd0luZGV4KSA6IHVuZGVmaW5lZCApO1xuICAgICAgLy8gdHJ1ZSB3aGVuIHRoZSBncm91cCBleGlzdHMgaW4gb25lIG9mIHRoZSBjb2x1bW5zIEJVVCBOT1QgaW4gdGhlIExBU1QgQ09MVU1OIChpLmU6IEl0cyBhIHNsYXZlIHNwbGl0KVxuICAgICAgY29uc3QgZ3JvdXBFeGlzdHMgPSBncm91cHMubGFzdEluZGV4T2YoY29sdW1uR3JvdXBzWzFdKSAhPT0gLTE7XG5cbiAgICAgIGNvbnN0IGNvbHVtbiA9IGNvbHVtbnNbMV07XG4gICAgICBjb25zdCBnQ29sdW1uID0gY29sdW1uLmdyb3VwTG9naWMoY29sdW1uR3JvdXBzIGFzIGFueSwgZ3JvdXBFeGlzdHMpO1xuICAgICAgaWYgKGdDb2x1bW4gIT09IGNvbHVtbkdyb3Vwc1sxXSkge1xuICAgICAgICBjb2x1bW4ubWFya05vdEluR3JvdXAoY29sdW1uR3JvdXBzWzFdKTtcbiAgICAgICAgY29sdW1uLm1hcmtJbkdyb3VwKGdDb2x1bW4pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtZXRhQ29sID0gdGhpcy5nZXRDb2x1bW5SZWNvcmQoZ0NvbHVtbi5pZCwgdGhpcy5tZXRhQ29sdW1ucyk7XG4gICAgICBpZiAoIW1ldGFDb2wuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgbWV0YUNvbC5oZWFkZXJHcm91cCA9IGdDb2x1bW47XG4gICAgICB9XG5cbiAgICAgIGlmIChncm91cHMubGFzdEluZGV4T2YoZ0NvbHVtbikgPT09IC0xKSB7XG4gICAgICAgIGFsbEtleXMucHVzaChnQ29sdW1uLmlkKTtcbiAgICAgICAgaWYgKGdDb2x1bW4uaXNWaXNpYmxlKSB7XG4gICAgICAgICAga2V5cy5wdXNoKGdDb2x1bW4uaWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGdDb2x1bW4ucmVwbGFjZShjb2x1bW4pO1xuICAgICAgZ3JvdXBzLnB1c2goZ0NvbHVtbik7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBnaG9zdCBvZiB0aGlzLl9ncm91cFN0b3JlLmZpbmRHaG9zdHMoKSkge1xuICAgICAgaWYgKGdob3N0LnJvd0luZGV4ID09PSBjb2x1bW5TZXQucm93SW5kZXgpIHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gZ2hvc3Q7XG4gICAgICAgIGxldCBpZHggPSBhbGxLZXlzLmluZGV4T2YoaWQpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgIGFsbEtleXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgaWR4ID0ga2V5cy5pbmRleE9mKGlkKTtcbiAgICAgICAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgICAgICAga2V5cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5tZXRhQ29sdW1ucy5zcGxpY2UodGhpcy5tZXRhQ29sdW1ucy5maW5kSW5kZXgoIG0gPT4gbS5pZCA9PT0gaWQpLCAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ncm91cFN0b3JlLnJlbW92ZShnaG9zdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudXBkYXRlTWV0YVJvdygnaGVhZGVyJywgY29sdW1uU2V0LnJvd0luZGV4LCB7IHJvd0RlZjogY29sdW1uU2V0LCBrZXlzLCBhbGxLZXlzLCBpc0dyb3VwOiB0cnVlIH0pXG4gIH1cblxuXG4gIHByaXZhdGUgdXBkYXRlTWV0YVJvdzxQIGV4dGVuZHMga2V5b2YgUGJsQ29sdW1uU3RvcmVbJ19tZXRhUm93cyddPih0eXBlOiBQLCByb3dJbmRleDogbnVtYmVyLCB2YWx1ZTogUGJsQ29sdW1uU3RvcmVbJ19tZXRhUm93cyddW1BdWzBdKTogdm9pZCB7XG4gICAgY29uc3QgY3VyciA9IHRoaXMuX21ldGFSb3dzW3R5cGVdW3Jvd0luZGV4XSB8fCB7fTtcbiAgICB0aGlzLl9tZXRhUm93c1t0eXBlXVtyb3dJbmRleF0gPSBPYmplY3QuYXNzaWduKGN1cnIsIHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29sdW1uUmVjb3JkPFQgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uU3RvcmUgJiB7IGRhdGE/OiBQYmxDb2x1bW4gfT4oaWQ6IHN0cmluZywgY29sbGVjdGlvbj86IFRbXSk6IFQgIHtcbiAgICBsZXQgY29sdW1uUmVjb3JkOiBQYmxNZXRhQ29sdW1uU3RvcmUgJiB7IGRhdGE/OiBQYmxDb2x1bW4gfSA9IHRoaXMuYnlJZC5nZXQoaWQpO1xuICAgIGlmICghY29sdW1uUmVjb3JkKSB7XG4gICAgICB0aGlzLmJ5SWQuc2V0KGlkLCBjb2x1bW5SZWNvcmQgPSB7IGlkIH0pO1xuICAgICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgICAgY29sbGVjdGlvbi5wdXNoKGNvbHVtblJlY29yZCBhcyBUKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbHVtblJlY29yZCBhcyBUO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRIaWRkZW4oKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsSGlkZGVuID0gKHRoaXMuX2hpZGRlbiB8fCBbXSkuY29uY2F0KHRoaXMuX2dyb3VwQnkubWFwKCBjID0+IGMuaWQgKSk7XG4gICAgdGhpcy5jb2x1bW5JZHMgPSBbXTtcbiAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5hbGxDb2x1bW5zKSB7XG4gICAgICBjLmhpZGRlbiA9IHRoaXMuX2FsbEhpZGRlbi5pbmRleE9mKGMuaWQpID4gLTE7XG4gICAgICBpZiAoIWMuaGlkZGVuKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGMpO1xuICAgICAgICB0aGlzLmNvbHVtbklkcy5wdXNoKGMuaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGggb2YgdGhpcy5fbWV0YVJvd3MuaGVhZGVyKSB7XG4gICAgICBpZiAoaC5pc0dyb3VwKSB7XG4gICAgICAgIGgua2V5cyA9IGguYWxsS2V5cy5maWx0ZXIoIGtleSA9PiB0aGlzLmZpbmQoa2V5KS5oZWFkZXJHcm91cC5pc1Zpc2libGUgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLmNvbHVtbnMsIHRoaXMubWV0YUNvbHVtbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldENvbHVtbnMoKTogdm9pZCB7XG4gICAgdGhpcy5hbGxDb2x1bW5zID0gW107XG4gICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgdGhpcy5tZXRhQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMuYnlJZC5jbGVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldElkcygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbHVtbklkcyA9IFtdO1xuICAgIHRoaXMuX21ldGFSb3dzID0gdGhpcy5tZXRhQ29sdW1uSWRzID0geyBoZWFkZXI6IFtdLCBmb290ZXI6IFtdIH07XG4gIH1cbn1cblxuLyoqXG4gKiBNb3ZlcyBhbiBpdGVtIG9uZSBpbmRleCBpbiBhbiBhcnJheSB0byBhbm90aGVyLlxuICogQHBhcmFtIGFycmF5IEFycmF5IGluIHdoaWNoIHRvIG1vdmUgdGhlIGl0ZW0uXG4gKiBAcGFyYW0gZnJvbUluZGV4IFN0YXJ0aW5nIGluZGV4IG9mIHRoZSBpdGVtLlxuICogQHBhcmFtIHRvSW5kZXggSW5kZXggdG8gd2hpY2ggdGhlIGl0ZW0gc2hvdWxkIGJlIG1vdmVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbW92ZUl0ZW1JbkFycmF5PFQgPSBhbnk+KGFycmF5OiBUW10sIGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZnJvbSA9IGNsYW1wKGZyb21JbmRleCwgYXJyYXkubGVuZ3RoIC0gMSk7XG4gIGNvbnN0IHRvID0gY2xhbXAodG9JbmRleCwgYXJyYXkubGVuZ3RoIC0gMSk7XG5cbiAgaWYgKGZyb20gPT09IHRvKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgdGFyZ2V0ID0gYXJyYXlbZnJvbV07XG4gIGNvbnN0IGRlbHRhID0gdG8gPCBmcm9tID8gLTEgOiAxO1xuXG4gIGZvciAobGV0IGkgPSBmcm9tOyBpICE9PSB0bzsgaSArPSBkZWx0YSkge1xuICAgIGFycmF5W2ldID0gYXJyYXlbaSArIGRlbHRhXTtcbiAgfVxuXG4gIGFycmF5W3RvXSA9IHRhcmdldDtcbn1cblxuLyoqIENsYW1wcyBhIG51bWJlciBiZXR3ZWVuIHplcm8gYW5kIGEgbWF4aW11bS4gKi9cbmZ1bmN0aW9uIGNsYW1wKHZhbHVlOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKG1heCwgdmFsdWUpKTtcbn1cbiJdfQ==