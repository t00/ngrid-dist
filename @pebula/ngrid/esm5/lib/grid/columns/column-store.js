/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PblColumnStore = /** @class */ (function () {
    function PblColumnStore() {
        this._groupBy = [];
        this.byId = new Map();
        this.resetIds();
        this.resetColumns();
    }
    Object.defineProperty(PblColumnStore.prototype, "primary", {
        get: /**
         * @return {?}
         */
        function () { return this._primary; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumnStore.prototype, "hidden", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hidden = value;
            this.setHidden();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumnStore.prototype, "groupBy", {
        get: /**
         * @return {?}
         */
        function () { return this._groupBy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumnStore.prototype, "groupStore", {
        get: /**
         * @return {?}
         */
        function () { return this._groupStore; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {...?} column
     * @return {?}
     */
    PblColumnStore.prototype.addGroupBy = /**
     * @param {...?} column
     * @return {?}
     */
    function () {
        var _a;
        var column = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            column[_i] = arguments[_i];
        }
        (_a = this.groupBy).push.apply(_a, tslib_1.__spread(column));
        this.setHidden();
    };
    /**
     * @param {...?} column
     * @return {?}
     */
    PblColumnStore.prototype.removeGroupBy = /**
     * @param {...?} column
     * @return {?}
     */
    function () {
        var e_1, _a;
        var column = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            column[_i] = arguments[_i];
        }
        var _loop_1 = function (c) {
            /** @type {?} */
            var idx = this_1.groupBy.findIndex((/**
             * @param {?} gbc
             * @return {?}
             */
            function (gbc) { return gbc.id === c.id; }));
            if (idx > -1) {
                this_1.groupBy.splice(idx, 1);
            }
        };
        var this_1 = this;
        try {
            for (var column_1 = tslib_1.__values(column), column_1_1 = column_1.next(); !column_1_1.done; column_1_1 = column_1.next()) {
                var c = column_1_1.value;
                _loop_1(c);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (column_1_1 && !column_1_1.done && (_a = column_1.return)) _a.call(column_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.setHidden();
    };
    /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     */
    /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     * @param {?} column
     * @param {?} anchor
     * @return {?}
     */
    PblColumnStore.prototype.moveColumn = /**
     * Move the provided `column` to the position of the `anchor` column.
     * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
     * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
     * @param {?} column
     * @param {?} anchor
     * @return {?}
     */
    function (column, anchor) {
        var _a = this, columns = _a.columns, columnIds = _a.columnIds, allColumns = _a.allColumns;
        /** @type {?} */
        var anchorIndex = columns.indexOf(anchor);
        /** @type {?} */
        var columnIndex = columns.indexOf(column);
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
    };
    /**
     * @param {?} col1
     * @param {?} col2
     * @return {?}
     */
    PblColumnStore.prototype.swapColumns = /**
     * @param {?} col1
     * @param {?} col2
     * @return {?}
     */
    function (col1, col2) {
        /** @type {?} */
        var col1Index = this.columns.indexOf(col1);
        /** @type {?} */
        var col2Index = this.columns.indexOf(col2);
        if (col1Index > -1 && col2Index > -1) {
            var _a = this, columns = _a.columns, columnIds = _a.columnIds, allColumns = _a.allColumns;
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
    };
    /**
     * @param {?} id
     * @return {?}
     */
    PblColumnStore.prototype.find = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.byId.get(id);
    };
    /**
     * @return {?}
     */
    PblColumnStore.prototype.getAllHeaderGroup = /**
     * @return {?}
     */
    function () {
        return this._groupStore ? this._groupStore.all : [];
    };
    /**
     * @return {?}
     */
    PblColumnStore.prototype.getStaticWidth = /**
     * @return {?}
     */
    function () {
        var e_2, _a;
        /** @type {?} */
        var rowWidth = new StaticColumnWidthLogic();
        try {
            for (var _b = tslib_1.__values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var column = _c.value;
                rowWidth.addColumn(column);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return rowWidth;
    };
    /**
     * @param {?} columnOrDefinitionSet
     * @return {?}
     */
    PblColumnStore.prototype.invalidate = /**
     * @param {?} columnOrDefinitionSet
     * @return {?}
     */
    function (columnOrDefinitionSet) {
        var e_3, _a, e_4, _b, e_5, _c, e_6, _d, e_7, _e, e_8, _f;
        /** @type {?} */
        var columnSet = this.lastSet = 'groupStore' in columnOrDefinitionSet
            ? columnOrDefinitionSet
            : PblColumnFactory.fromDefinitionSet(columnOrDefinitionSet).build();
        var groupStore = columnSet.groupStore, table = columnSet.table, header = columnSet.header, footer = columnSet.footer, headerGroup = columnSet.headerGroup;
        this._groupStore = groupStore.clone();
        /** @type {?} */
        var rowWidth = new StaticColumnWidthLogic();
        this.resetColumns();
        this.resetIds();
        /** @type {?} */
        var hidden = this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.id; })));
        this.headerColumnDef = {
            rowClassName: (table.header && table.header.rowClassName) || '',
            type: (table.header && table.header.type) || 'fixed',
        };
        this.footerColumnDef = {
            rowClassName: (table.footer && table.footer.rowClassName) || '',
            type: (table.footer && table.footer.type) || 'fixed',
        };
        this._primary = undefined;
        try {
            for (var _g = tslib_1.__values(table.cols), _h = _g.next(); !_h.done; _h = _g.next()) {
                var def = _h.value;
                /** @type {?} */
                var column = void 0;
                column = new PblColumn(def, this.groupStore);
                /** @type {?} */
                var columnRecord = this.getColumnRecord(column.id);
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
                        console.warn("Multiple primary index columns defined: previous: \"" + this._primary.id + "\", current: \"" + column.id + "\"");
                    }
                    this._primary = column;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
            }
            finally { if (e_3) throw e_3.error; }
        }
        try {
            for (var header_1 = tslib_1.__values(header), header_1_1 = header_1.next(); !header_1_1.done; header_1_1 = header_1.next()) {
                var rowDef = header_1_1.value;
                /** @type {?} */
                var keys = [];
                try {
                    for (var _j = tslib_1.__values(rowDef.cols), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var def = _k.value;
                        /** @type {?} */
                        var metaCol = this.getColumnRecord(def.id, this.metaColumns);
                        /** @type {?} */
                        var column = metaCol.header || (metaCol.header = new PblMetaColumn(def));
                        keys.push(column.id);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                this._metaRows.header[rowDef.rowIndex] = { rowDef: rowDef, keys: keys };
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (header_1_1 && !header_1_1.done && (_b = header_1.return)) _b.call(header_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        try {
            for (var headerGroup_1 = tslib_1.__values(headerGroup), headerGroup_1_1 = headerGroup_1.next(); !headerGroup_1_1.done; headerGroup_1_1 = headerGroup_1.next()) {
                var rowDef = headerGroup_1_1.value;
                this._updateGroup(rowDef);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (headerGroup_1_1 && !headerGroup_1_1.done && (_d = headerGroup_1.return)) _d.call(headerGroup_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        try {
            for (var footer_1 = tslib_1.__values(footer), footer_1_1 = footer_1.next(); !footer_1_1.done; footer_1_1 = footer_1.next()) {
                var rowDef = footer_1_1.value;
                /** @type {?} */
                var keys = [];
                try {
                    for (var _l = tslib_1.__values(rowDef.cols), _m = _l.next(); !_m.done; _m = _l.next()) {
                        var def = _m.value;
                        /** @type {?} */
                        var metaCol = this.getColumnRecord(def.id, this.metaColumns);
                        /** @type {?} */
                        var column = metaCol.footer || (metaCol.footer = new PblMetaColumn(def));
                        keys.push(column.id);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_m && !_m.done && (_f = _l.return)) _f.call(_l);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                this._metaRows.footer.push({ rowDef: rowDef, keys: keys });
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (footer_1_1 && !footer_1_1.done && (_e = footer_1.return)) _e.call(footer_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        resetColumnWidths(rowWidth, this.columns, this.metaColumns);
    };
    /**
     * @param {...?} rowIndex
     * @return {?}
     */
    PblColumnStore.prototype.updateGroups = /**
     * @param {...?} rowIndex
     * @return {?}
     */
    function () {
        var e_9, _a, e_10, _b;
        var rowIndex = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rowIndex[_i] = arguments[_i];
        }
        if (rowIndex.length === 0) {
            try {
                for (var _c = tslib_1.__values(this.lastSet.headerGroup), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var rowDef = _d.value;
                    this._updateGroup(rowDef);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
        else {
            /** @type {?} */
            var rows = rowIndex.slice();
            try {
                for (var _e = tslib_1.__values(this.lastSet.headerGroup), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var rowDef = _f.value;
                    /** @type {?} */
                    var idx = rows.indexOf(rowDef.rowIndex);
                    if (idx > -1) {
                        rows.splice(idx, 1);
                        this._updateGroup(rowDef);
                        if (rows.length === 0) {
                            return;
                        }
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    };
    /**
     * @private
     * @param {?} columnSet
     * @return {?}
     */
    PblColumnStore.prototype._updateGroup = /**
     * @private
     * @param {?} columnSet
     * @return {?}
     */
    function (columnSet) {
        var e_11, _a;
        /** @type {?} */
        var keys = [];
        /** @type {?} */
        var allKeys = [];
        /** @type {?} */
        var groups = [];
        for (var tIndex = 0; tIndex < this.columns.length; tIndex++) {
            /** @type {?} */
            var columns = [this.columns[tIndex - 1], this.columns[tIndex], this.columns[tIndex + 1]];
            /** @type {?} */
            var columnGroups = columns.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c ? c.getGroupOfRow(columnSet.rowIndex) : undefined; }));
            // true when the group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
            /** @type {?} */
            var groupExists = groups.lastIndexOf(columnGroups[1]) !== -1;
            /** @type {?} */
            var column = columns[1];
            /** @type {?} */
            var gColumn = column.groupLogic((/** @type {?} */ (columnGroups)), groupExists);
            if (gColumn !== columnGroups[1]) {
                column.markNotInGroup(columnGroups[1]);
                column.markInGroup(gColumn);
            }
            /** @type {?} */
            var metaCol = this.getColumnRecord(gColumn.id, this.metaColumns);
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
        var _loop_2 = function (ghost) {
            if (ghost.rowIndex === columnSet.rowIndex) {
                var id_1 = ghost.id;
                /** @type {?} */
                var idx = allKeys.indexOf(id_1);
                if (idx !== -1) {
                    allKeys.splice(idx, 1);
                    idx = keys.indexOf(id_1);
                    if (idx !== -1) {
                        keys.splice(idx, 1);
                    }
                    this_2.metaColumns.splice(this_2.metaColumns.findIndex((/**
                     * @param {?} m
                     * @return {?}
                     */
                    function (m) { return m.id === id_1; })), 1);
                }
                this_2._groupStore.remove(ghost);
            }
        };
        var this_2 = this;
        try {
            for (var _b = tslib_1.__values(this._groupStore.findGhosts()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ghost = _c.value;
                _loop_2(ghost);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        this.updateMetaRow('header', columnSet.rowIndex, { rowDef: columnSet, keys: keys, allKeys: allKeys, isGroup: true });
    };
    /**
     * @private
     * @template P
     * @param {?} type
     * @param {?} rowIndex
     * @param {?} value
     * @return {?}
     */
    PblColumnStore.prototype.updateMetaRow = /**
     * @private
     * @template P
     * @param {?} type
     * @param {?} rowIndex
     * @param {?} value
     * @return {?}
     */
    function (type, rowIndex, value) {
        /** @type {?} */
        var curr = this._metaRows[type][rowIndex] || {};
        this._metaRows[type][rowIndex] = Object.assign(curr, value);
    };
    /**
     * @private
     * @template T
     * @param {?} id
     * @param {?=} collection
     * @return {?}
     */
    PblColumnStore.prototype.getColumnRecord = /**
     * @private
     * @template T
     * @param {?} id
     * @param {?=} collection
     * @return {?}
     */
    function (id, collection) {
        /** @type {?} */
        var columnRecord = this.byId.get(id);
        if (!columnRecord) {
            this.byId.set(id, columnRecord = { id: id });
            if (collection) {
                collection.push((/** @type {?} */ (columnRecord)));
            }
        }
        return (/** @type {?} */ (columnRecord));
    };
    /**
     * @private
     * @return {?}
     */
    PblColumnStore.prototype.setHidden = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        var e_12, _a, e_13, _b;
        this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.id; })));
        this.columnIds = [];
        this.columns = [];
        try {
            for (var _c = tslib_1.__values(this.allColumns), _d = _c.next(); !_d.done; _d = _c.next()) {
                var c = _d.value;
                c.hidden = this._allHidden.indexOf(c.id) > -1;
                if (!c.hidden) {
                    this.columns.push(c);
                    this.columnIds.push(c.id);
                }
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_12) throw e_12.error; }
        }
        try {
            for (var _e = tslib_1.__values(this._metaRows.header), _f = _e.next(); !_f.done; _f = _e.next()) {
                var h = _f.value;
                if (h.isGroup) {
                    h.keys = h.allKeys.filter((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) { return _this.find(key).headerGroup.isVisible; }));
                }
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_13) throw e_13.error; }
        }
        resetColumnWidths(this.getStaticWidth(), this.columns, this.metaColumns);
    };
    /**
     * @private
     * @return {?}
     */
    PblColumnStore.prototype.resetColumns = /**
     * @private
     * @return {?}
     */
    function () {
        this.allColumns = [];
        this.columns = [];
        this.metaColumns = [];
        this.byId.clear();
    };
    /**
     * @private
     * @return {?}
     */
    PblColumnStore.prototype.resetIds = /**
     * @private
     * @return {?}
     */
    function () {
        this.columnIds = [];
        this._metaRows = this.metaColumnIds = { header: [], footer: [] };
    };
    return PblColumnStore;
}());
export { PblColumnStore };
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
    var from = clamp(fromIndex, array.length - 1);
    /** @type {?} */
    var to = clamp(toIndex, array.length - 1);
    if (from === to) {
        return;
    }
    /** @type {?} */
    var target = array[from];
    /** @type {?} */
    var delta = to < from ? -1 : 1;
    for (var i = from; i !== to; i += delta) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvY29sdW1uLXN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBRTdDLHdDQU1DOzs7SUFMQyxnQ0FBVzs7SUFDWCxvQ0FBdUI7O0lBQ3ZCLG9DQUF1Qjs7SUFDdkIseUNBQTZCOztJQUM3Qix5Q0FBNkI7Ozs7O0FBRy9CLDJDQUlDOzs7SUFIQyx1Q0FBeUU7O0lBQ3pFLHFDQUFlOztJQUNmLHdDQUFrQjs7QUFHcEI7SUE2QkU7UUFMUSxhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUMzQixTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQXFELENBQUM7UUFLMUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBdkJELHNCQUFJLG1DQUFPOzs7O1FBQVgsY0FBdUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFOUQsc0JBQUksa0NBQU07Ozs7O1FBQVYsVUFBVyxLQUFlO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG1DQUFPOzs7O1FBQVgsY0FBNkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFcEQsc0JBQUksc0NBQVU7Ozs7UUFBZCxjQUF3QyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Ozs7SUFnQmxFLG1DQUFVOzs7O0lBQVY7O1FBQVcsZ0JBQXNCO2FBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtZQUF0QiwyQkFBc0I7O1FBQy9CLENBQUEsS0FBQSxJQUFJLENBQUMsT0FBTyxDQUFBLENBQUMsSUFBSSw0QkFBSSxNQUFNLEdBQUU7UUFDN0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsc0NBQWE7Ozs7SUFBYjs7UUFBYyxnQkFBc0I7YUFBdEIsVUFBc0IsRUFBdEIscUJBQXNCLEVBQXRCLElBQXNCO1lBQXRCLDJCQUFzQjs7Z0NBQ3ZCLENBQUM7O2dCQUNKLEdBQUcsR0FBRyxPQUFLLE9BQU8sQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQWYsQ0FBZSxFQUFFO1lBQzVELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dCQUNaLE9BQUssT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDN0I7Ozs7WUFKSCxLQUFnQixJQUFBLFdBQUEsaUJBQUEsTUFBTSxDQUFBLDhCQUFBO2dCQUFqQixJQUFNLENBQUMsbUJBQUE7d0JBQUQsQ0FBQzthQUtYOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7OztJQUNILG1DQUFVOzs7Ozs7OztJQUFWLFVBQVcsTUFBaUIsRUFBRSxNQUFpQjtRQUN2QyxJQUFBLFNBQXlDLEVBQXZDLG9CQUFPLEVBQUUsd0JBQVMsRUFBRSwwQkFBbUI7O1lBQzNDLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7WUFDckMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4QyxlQUFlLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNyRCxlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNuRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRCxXQUFXLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDMUM7WUFDRCxlQUFlLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQzs7Ozs7O0lBRUQsb0NBQVc7Ozs7O0lBQVgsVUFBWSxJQUFlLEVBQUUsSUFBZTs7WUFDdEMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7WUFDdEMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUMxQyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDOUIsSUFBQSxTQUF5QyxFQUF2QyxvQkFBTyxFQUFFLHdCQUFTLEVBQUUsMEJBQW1CO1lBQy9DLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUMxQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMvQixTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUUvQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNqRCxTQUFTLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEM7WUFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzdCLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDN0IsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFRCw2QkFBSTs7OztJQUFKLFVBQUssRUFBVTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7OztJQUVELDBDQUFpQjs7O0lBQWpCO1FBQ0UsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3RELENBQUM7Ozs7SUFFRCx1Q0FBYzs7O0lBQWQ7OztZQUNRLFFBQVEsR0FBRyxJQUFJLHNCQUFzQixFQUFFOztZQUM3QyxLQUFxQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQSxnQkFBQSw0QkFBRTtnQkFBOUIsSUFBTSxNQUFNLFdBQUE7Z0JBQ2YsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1Qjs7Ozs7Ozs7O1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFFRCxtQ0FBVTs7OztJQUFWLFVBQVcscUJBQXNFOzs7WUFDekUsU0FBUyxHQUFzQixJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksSUFBSSxxQkFBcUI7WUFDdkYsQ0FBQyxDQUFDLHFCQUFxQjtZQUN2QixDQUFDLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxLQUFLLEVBQUU7UUFFN0QsSUFBQSxpQ0FBVSxFQUFFLHVCQUFLLEVBQUUseUJBQU0sRUFBRSx5QkFBTSxFQUFFLG1DQUFXO1FBRXRELElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDOztZQUVoQyxRQUFRLEdBQUcsSUFBSSxzQkFBc0IsRUFBRTtRQUM3QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztZQUNWLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxFQUFKLENBQUksRUFBRSxDQUFDO1FBRTVGLElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDL0QsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU87U0FDckQsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUc7WUFDckIsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDL0QsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU87U0FDckQsQ0FBQTtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDOztZQUUxQixLQUFrQixJQUFBLEtBQUEsaUJBQUEsS0FBSyxDQUFDLElBQUksQ0FBQSxnQkFBQSw0QkFBRTtnQkFBekIsSUFBTSxHQUFHLFdBQUE7O29CQUNSLE1BQU0sU0FBVztnQkFDckIsTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O29CQUN2QyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUNwRCxZQUFZLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRTdCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO29CQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUMvQixRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM1QjtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxTQUFTLEVBQUUsRUFBRTt3QkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyx5REFBc0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLHVCQUFnQixNQUFNLENBQUMsRUFBRSxPQUFHLENBQUMsQ0FBQztxQkFDbEg7b0JBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7aUJBQ3hCO2FBQ0Y7Ozs7Ozs7Ozs7WUFFRCxLQUFxQixJQUFBLFdBQUEsaUJBQUEsTUFBTSxDQUFBLDhCQUFBLGtEQUFFO2dCQUF4QixJQUFNLE1BQU0sbUJBQUE7O29CQUNULElBQUksR0FBYSxFQUFFOztvQkFDekIsS0FBa0IsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUEsZ0JBQUEsNEJBQUU7d0JBQTFCLElBQU0sR0FBRyxXQUFBOzs0QkFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7OzRCQUN4RCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUN0Qjs7Ozs7Ozs7O2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUM7YUFDM0Q7Ozs7Ozs7Ozs7WUFFRCxLQUFxQixJQUFBLGdCQUFBLGlCQUFBLFdBQVcsQ0FBQSx3Q0FBQSxpRUFBRTtnQkFBN0IsSUFBTSxNQUFNLHdCQUFBO2dCQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0I7Ozs7Ozs7Ozs7WUFFRCxLQUFxQixJQUFBLFdBQUEsaUJBQUEsTUFBTSxDQUFBLDhCQUFBLGtEQUFFO2dCQUF4QixJQUFNLE1BQU0sbUJBQUE7O29CQUNULElBQUksR0FBYSxFQUFFOztvQkFDekIsS0FBa0IsSUFBQSxLQUFBLGlCQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUEsZ0JBQUEsNEJBQUU7d0JBQTFCLElBQU0sR0FBRyxXQUFBOzs0QkFDTixPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7OzRCQUN4RCxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUN0Qjs7Ozs7Ozs7O2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLENBQUMsQ0FBQzthQUM5Qzs7Ozs7Ozs7O1FBQ0QsaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7O0lBRUQscUNBQVk7Ozs7SUFBWjs7UUFBYSxrQkFBcUI7YUFBckIsVUFBcUIsRUFBckIscUJBQXFCLEVBQXJCLElBQXFCO1lBQXJCLDZCQUFxQjs7UUFDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7Z0JBQ3pCLEtBQXFCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBMUMsSUFBTSxNQUFNLFdBQUE7b0JBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDM0I7Ozs7Ozs7OztTQUNGO2FBQU07O2dCQUNDLElBQUksR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFOztnQkFDN0IsS0FBcUIsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFBLGdCQUFBLDRCQUFFO29CQUExQyxJQUFNLE1BQU0sV0FBQTs7d0JBQ1QsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7d0JBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQ3JCLE9BQU87eUJBQ1I7cUJBQ0Y7aUJBQ0Y7Ozs7Ozs7OztTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8scUNBQVk7Ozs7O0lBQXBCLFVBQXFCLFNBQXVDOzs7WUFDcEQsSUFBSSxHQUFhLEVBQUU7O1lBQ25CLE9BQU8sR0FBYSxFQUFFOztZQUV0QixNQUFNLEdBQXFCLEVBQUU7UUFFbkMsS0FBSyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFOztnQkFDckQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzs7Z0JBQ3BGLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRzs7OztZQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFuRCxDQUFtRCxFQUFFOzs7Z0JBRXRGLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Z0JBRXhELE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFDbkIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQUEsWUFBWSxFQUFPLEVBQUUsV0FBVyxDQUFDO1lBQ25FLElBQUksT0FBTyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDL0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3Qjs7Z0JBRUssT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFO2dCQUN4QixPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQzthQUMvQjtZQUVELElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pCLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ3ZCO2FBQ0Y7WUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEI7Z0NBRVUsS0FBSztZQUNkLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUNqQyxJQUFBLGVBQUU7O29CQUNOLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUUsQ0FBQztnQkFDN0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUUsQ0FBQyxDQUFDO29CQUN2QixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDckI7b0JBQ0QsT0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQUssV0FBVyxDQUFDLFNBQVM7Ozs7b0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUUsRUFBWCxDQUFXLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDM0U7Z0JBQ0QsT0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDOzs7O1lBYkgsS0FBb0IsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUEsZ0JBQUE7Z0JBQTVDLElBQU0sS0FBSyxXQUFBO3dCQUFMLEtBQUs7YUFjZjs7Ozs7Ozs7O1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkcsQ0FBQzs7Ozs7Ozs7O0lBR08sc0NBQWE7Ozs7Ozs7O0lBQXJCLFVBQW1FLElBQU8sRUFBRSxRQUFnQixFQUFFLEtBQXdDOztZQUM5SCxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7Ozs7SUFFTyx3Q0FBZTs7Ozs7OztJQUF2QixVQUE2RSxFQUFVLEVBQUUsVUFBZ0I7O1lBQ25HLFlBQVksR0FBOEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9FLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLFlBQVksR0FBRyxFQUFFLEVBQUUsSUFBQSxFQUFFLENBQUMsQ0FBQztZQUN6QyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxVQUFVLENBQUMsSUFBSSxDQUFDLG1CQUFBLFlBQVksRUFBSyxDQUFDLENBQUM7YUFDcEM7U0FDRjtRQUNELE9BQU8sbUJBQUEsWUFBWSxFQUFLLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTyxrQ0FBUzs7OztJQUFqQjtRQUFBLGlCQWlCQzs7UUFoQkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRzs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsRUFBSixDQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOztZQUNsQixLQUFnQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBNUIsSUFBTSxDQUFDLFdBQUE7Z0JBQ1YsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQzNCO2FBQ0Y7Ozs7Ozs7Ozs7WUFDRCxLQUFnQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWxDLElBQU0sQ0FBQyxXQUFBO2dCQUNWLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDYixDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztvQkFBRSxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBcEMsQ0FBb0MsRUFBRSxDQUFDO2lCQUMxRTthQUNGOzs7Ozs7Ozs7UUFDRCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFTyxxQ0FBWTs7OztJQUFwQjtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQzs7Ozs7SUFFTyxpQ0FBUTs7OztJQUFoQjtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ25FLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUE1U0QsSUE0U0M7Ozs7SUEzU0MsdUNBQStGOztJQUMvRixxQ0FBa0M7O0lBQ2xDLG1DQUFvQjs7SUFDcEIsaUNBQXFCOztJQUNyQixvQ0FBd0I7O0lBQ3hCLHlDQUF1Qzs7SUFDdkMseUNBQXVDOzs7OztJQWF2QyxrQ0FBd0M7Ozs7O0lBQ3hDLG1DQUFxSjs7Ozs7SUFDckosaUNBQTBCOzs7OztJQUMxQixvQ0FBNkI7Ozs7O0lBQzdCLGtDQUFtQzs7Ozs7SUFDbkMsOEJBQTRFOzs7OztJQUM1RSxxQ0FBeUM7Ozs7O0lBQ3pDLGlDQUFtQzs7Ozs7Ozs7OztBQXlSckMsTUFBTSxVQUFVLGVBQWUsQ0FBVSxLQUFVLEVBQUUsU0FBaUIsRUFBRSxPQUFlOztRQUMvRSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7UUFDekMsRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFFM0MsSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO1FBQ2YsT0FBTztLQUNSOztRQUVLLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOztRQUNwQixLQUFLLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxFQUFFO1FBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO0tBQzdCO0lBRUQsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUNyQixDQUFDOzs7Ozs7O0FBR0QsU0FBUyxLQUFLLENBQUMsS0FBYSxFQUFFLEdBQVc7SUFDdkMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCwgUGJsTmdyaWRDb2x1bW5TZXQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW4gfSBmcm9tICcuL21ldGEtY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4vY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtblNldCwgUGJsTWV0YVJvd0RlZmluaXRpb25zLCBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBTdG9yZSB9IGZyb20gJy4vZ3JvdXAtY29sdW1uJztcbmltcG9ydCB7IFN0YXRpY0NvbHVtbldpZHRoTG9naWMgfSBmcm9tICcuLi9jb2wtd2lkdGgtbG9naWMvc3RhdGljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyByZXNldENvbHVtbldpZHRocyB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uRmFjdG9yeSB9IGZyb20gJy4vZmFjdG9yeSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTWV0YUNvbHVtblN0b3JlIHtcbiAgaWQ6IHN0cmluZztcbiAgaGVhZGVyPzogUGJsTWV0YUNvbHVtbjtcbiAgZm9vdGVyPzogUGJsTWV0YUNvbHVtbjtcbiAgaGVhZGVyR3JvdXA/OiBQYmxDb2x1bW5Hcm91cDtcbiAgZm9vdGVyR3JvdXA/OiBQYmxDb2x1bW5Hcm91cDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxDb2x1bW5TdG9yZU1ldGFSb3cge1xuICByb3dEZWY6IFBibENvbHVtblNldDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiB8IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbj4sXG4gIGtleXM6IHN0cmluZ1tdO1xuICBpc0dyb3VwPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtblN0b3JlIHtcbiAgbWV0YUNvbHVtbklkczogeyBoZWFkZXI6IEFycmF5PFBibENvbHVtblN0b3JlTWV0YVJvdz47IGZvb3RlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93PjsgfTtcbiAgbWV0YUNvbHVtbnM6IFBibE1ldGFDb2x1bW5TdG9yZVtdO1xuICBjb2x1bW5JZHM6IHN0cmluZ1tdO1xuICBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgYWxsQ29sdW1uczogUGJsQ29sdW1uW107XG4gIGhlYWRlckNvbHVtbkRlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xuICBmb290ZXJDb2x1bW5EZWY6IFBibE1ldGFSb3dEZWZpbml0aW9ucztcblxuICBnZXQgcHJpbWFyeSgpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcHJpbWFyeTsgfVxuXG4gIHNldCBoaWRkZW4odmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5faGlkZGVuID0gdmFsdWU7XG4gICAgdGhpcy5zZXRIaWRkZW4oKTtcbiAgfVxuXG4gIGdldCBncm91cEJ5KCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuX2dyb3VwQnk7IH1cblxuICBnZXQgZ3JvdXBTdG9yZSgpOiBQYmxDb2x1bW5Hcm91cFN0b3JlIHsgcmV0dXJuIHRoaXMuX2dyb3VwU3RvcmU7IH1cblxuICBwcml2YXRlIF9wcmltYXJ5OiBQYmxDb2x1bW4gfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX21ldGFSb3dzOiB7IGhlYWRlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfT47IGZvb3RlcjogQXJyYXk8UGJsQ29sdW1uU3RvcmVNZXRhUm93ICYgeyBhbGxLZXlzPzogc3RyaW5nW10gfT47IH07XG4gIHByaXZhdGUgX2hpZGRlbjogc3RyaW5nW107XG4gIHByaXZhdGUgX2FsbEhpZGRlbjogc3RyaW5nW107XG4gIHByaXZhdGUgX2dyb3VwQnk6IFBibENvbHVtbltdID0gW107XG4gIHByaXZhdGUgYnlJZCA9IG5ldyBNYXA8c3RyaW5nLCBQYmxNZXRhQ29sdW1uU3RvcmUgJiB7IGRhdGE/OiBQYmxDb2x1bW4gfT4oKTtcbiAgcHJpdmF0ZSBfZ3JvdXBTdG9yZTogUGJsQ29sdW1uR3JvdXBTdG9yZTtcbiAgcHJpdmF0ZSBsYXN0U2V0OiBQYmxOZ3JpZENvbHVtblNldDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnJlc2V0SWRzKCk7XG4gICAgdGhpcy5yZXNldENvbHVtbnMoKTtcbiAgfVxuXG4gIGFkZEdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIHRoaXMuZ3JvdXBCeS5wdXNoKC4uLmNvbHVtbik7XG4gICAgdGhpcy5zZXRIaWRkZW4oKTtcbiAgfVxuXG4gIHJlbW92ZUdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW4pIHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuZ3JvdXBCeS5maW5kSW5kZXgoIGdiYyA9PiBnYmMuaWQgPT09IGMuaWQgKTtcbiAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICB0aGlzLmdyb3VwQnkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0SGlkZGVuKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgYW5jaG9yYCBjb2x1bW4uXG4gICAqIFRoZSBuZXcgbG9jYXRpb24gb2YgdGhlIGFuY2hvciBjb2x1bW4gd2lsbCBiZSBpdCdzIG9yaWdpbmFsIGxvY2F0aW9uIHBsdXMgb3IgbWludXMgMSwgZGVwZW5kaW5nIG9uIHRoZSBkZWx0YSBiZXR3ZWVuXG4gICAqIHRoZSBjb2x1bW5zLiBJZiB0aGUgb3JpZ2luIG9mIHRoZSBgY29sdW1uYCBpcyBiZWZvcmUgdGhlIGBhbmNob3JgIHRoZW4gdGhlIGFuY2hvcidzIG5ldyBwb3NpdGlvbiBpcyBtaW51cyBvbmUsIG90aGVyd2lzZSBwbHVzIDEuXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgY29sdW1ucywgY29sdW1uSWRzLCBhbGxDb2x1bW5zIH0gPSB0aGlzO1xuICAgIGxldCBhbmNob3JJbmRleCA9IGNvbHVtbnMuaW5kZXhPZihhbmNob3IpO1xuICAgIGxldCBjb2x1bW5JbmRleCA9IGNvbHVtbnMuaW5kZXhPZihjb2x1bW4pO1xuICAgIGlmIChhbmNob3JJbmRleCA+IC0xICYmIGNvbHVtbkluZGV4ID4gLTEpIHtcbiAgICAgIG1vdmVJdGVtSW5BcnJheShjb2x1bW5JZHMsIGNvbHVtbkluZGV4LCBhbmNob3JJbmRleCk7XG4gICAgICBtb3ZlSXRlbUluQXJyYXkoY29sdW1ucywgY29sdW1uSW5kZXgsIGFuY2hvckluZGV4KTtcbiAgICAgIGlmICh0aGlzLl9hbGxIaWRkZW4gJiYgdGhpcy5fYWxsSGlkZGVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYW5jaG9ySW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoYW5jaG9yKTtcbiAgICAgICAgY29sdW1uSW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcbiAgICAgIH1cbiAgICAgIG1vdmVJdGVtSW5BcnJheShhbGxDb2x1bW5zLCBjb2x1bW5JbmRleCwgYW5jaG9ySW5kZXgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3dhcENvbHVtbnMoY29sMTogUGJsQ29sdW1uLCBjb2wyOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBsZXQgY29sMUluZGV4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sMSk7XG4gICAgbGV0IGNvbDJJbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbDIpO1xuICAgIGlmIChjb2wxSW5kZXggPiAtMSAmJiBjb2wySW5kZXggPiAtMSkge1xuICAgICAgY29uc3QgeyBjb2x1bW5zLCBjb2x1bW5JZHMsIGFsbENvbHVtbnMgfSA9IHRoaXM7XG4gICAgICBjb2x1bW5zW2NvbDFJbmRleF0gPSBjb2wyO1xuICAgICAgY29sdW1uc1tjb2wySW5kZXhdID0gY29sMTtcbiAgICAgIGNvbHVtbklkc1tjb2wxSW5kZXhdID0gY29sMi5pZDtcbiAgICAgIGNvbHVtbklkc1tjb2wySW5kZXhdID0gY29sMS5pZDtcblxuICAgICAgaWYgKHRoaXMuX2FsbEhpZGRlbiAmJiB0aGlzLl9hbGxIaWRkZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBjb2wxSW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoY29sMSk7XG4gICAgICAgIGNvbDJJbmRleCA9IGFsbENvbHVtbnMuaW5kZXhPZihjb2wyKTtcbiAgICAgIH1cbiAgICAgIGFsbENvbHVtbnNbY29sMUluZGV4XSA9IGNvbDI7XG4gICAgICBhbGxDb2x1bW5zW2NvbDJJbmRleF0gPSBjb2wxO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbmQoaWQ6IHN0cmluZyk6IFBibE1ldGFDb2x1bW5TdG9yZSAmIHsgZGF0YT86IFBibENvbHVtbiB9IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5ieUlkLmdldChpZCk7XG4gIH1cblxuICBnZXRBbGxIZWFkZXJHcm91cCgpOiBQYmxDb2x1bW5Hcm91cFtdIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBTdG9yZSA/IHRoaXMuX2dyb3VwU3RvcmUuYWxsIDogW107XG4gIH1cblxuICBnZXRTdGF0aWNXaWR0aCgpOiBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljIHtcbiAgICBjb25zdCByb3dXaWR0aCA9IG5ldyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljKCk7XG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgdGhpcy5jb2x1bW5zKSB7XG4gICAgICByb3dXaWR0aC5hZGRDb2x1bW4oY29sdW1uKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd1dpZHRoO1xuICB9XG5cbiAgaW52YWxpZGF0ZShjb2x1bW5PckRlZmluaXRpb25TZXQ6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCB8IFBibE5ncmlkQ29sdW1uU2V0KTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uU2V0OiBQYmxOZ3JpZENvbHVtblNldCA9IHRoaXMubGFzdFNldCA9ICdncm91cFN0b3JlJyBpbiBjb2x1bW5PckRlZmluaXRpb25TZXRcbiAgICAgID8gY29sdW1uT3JEZWZpbml0aW9uU2V0XG4gICAgICA6IFBibENvbHVtbkZhY3RvcnkuZnJvbURlZmluaXRpb25TZXQoY29sdW1uT3JEZWZpbml0aW9uU2V0KS5idWlsZCgpXG4gICAgO1xuICAgIGNvbnN0IHsgZ3JvdXBTdG9yZSwgdGFibGUsIGhlYWRlciwgZm9vdGVyLCBoZWFkZXJHcm91cCB9ID0gY29sdW1uU2V0O1xuXG4gICAgdGhpcy5fZ3JvdXBTdG9yZSA9IGdyb3VwU3RvcmUuY2xvbmUoKTtcblxuICAgIGNvbnN0IHJvd1dpZHRoID0gbmV3IFN0YXRpY0NvbHVtbldpZHRoTG9naWMoKTtcbiAgICB0aGlzLnJlc2V0Q29sdW1ucygpO1xuICAgIHRoaXMucmVzZXRJZHMoKTtcbiAgICBjb25zdCBoaWRkZW4gPSB0aGlzLl9hbGxIaWRkZW4gPSAodGhpcy5faGlkZGVuIHx8IFtdKS5jb25jYXQodGhpcy5fZ3JvdXBCeS5tYXAoIGMgPT4gYy5pZCApKTtcblxuICAgIHRoaXMuaGVhZGVyQ29sdW1uRGVmID0ge1xuICAgICAgcm93Q2xhc3NOYW1lOiAodGFibGUuaGVhZGVyICYmIHRhYmxlLmhlYWRlci5yb3dDbGFzc05hbWUpIHx8ICcnLFxuICAgICAgdHlwZTogKHRhYmxlLmhlYWRlciAmJiB0YWJsZS5oZWFkZXIudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9XG4gICAgdGhpcy5mb290ZXJDb2x1bW5EZWYgPSB7XG4gICAgICByb3dDbGFzc05hbWU6ICh0YWJsZS5mb290ZXIgJiYgdGFibGUuZm9vdGVyLnJvd0NsYXNzTmFtZSkgfHwgJycsXG4gICAgICB0eXBlOiAodGFibGUuZm9vdGVyICYmIHRhYmxlLmZvb3Rlci50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH1cblxuICAgIHRoaXMuX3ByaW1hcnkgPSB1bmRlZmluZWQ7XG5cbiAgICBmb3IgKGNvbnN0IGRlZiBvZiB0YWJsZS5jb2xzKSB7XG4gICAgICBsZXQgY29sdW1uOiBQYmxDb2x1bW47XG4gICAgICBjb2x1bW4gPSBuZXcgUGJsQ29sdW1uKGRlZiwgdGhpcy5ncm91cFN0b3JlKTtcbiAgICAgIGNvbnN0IGNvbHVtblJlY29yZCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGNvbHVtbi5pZCk7XG4gICAgICBjb2x1bW5SZWNvcmQuZGF0YSA9IGNvbHVtbjtcbiAgICAgIHRoaXMuYWxsQ29sdW1ucy5wdXNoKGNvbHVtbik7XG5cbiAgICAgIGNvbHVtbi5oaWRkZW4gPSBoaWRkZW4uaW5kZXhPZihjb2x1bW4uaWQpID4gLTE7XG4gICAgICBpZiAoIWNvbHVtbi5oaWRkZW4pIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goY29sdW1uKTtcbiAgICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaChjb2x1bW4uaWQpO1xuICAgICAgICByb3dXaWR0aC5hZGRDb2x1bW4oY29sdW1uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbHVtbi5wSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ByaW1hcnkgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE11bHRpcGxlIHByaW1hcnkgaW5kZXggY29sdW1ucyBkZWZpbmVkOiBwcmV2aW91czogXCIke3RoaXMuX3ByaW1hcnkuaWR9XCIsIGN1cnJlbnQ6IFwiJHtjb2x1bW4uaWR9XCJgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9wcmltYXJ5ID0gY29sdW1uO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZGVmIG9mIHJvd0RlZi5jb2xzKSB7XG4gICAgICAgIGNvbnN0IG1ldGFDb2wgPSB0aGlzLmdldENvbHVtblJlY29yZChkZWYuaWQsIHRoaXMubWV0YUNvbHVtbnMpO1xuICAgICAgICBjb25zdCBjb2x1bW4gPSBtZXRhQ29sLmhlYWRlciB8fCAobWV0YUNvbC5oZWFkZXIgPSBuZXcgUGJsTWV0YUNvbHVtbihkZWYpKTtcbiAgICAgICAga2V5cy5wdXNoKGNvbHVtbi5pZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9tZXRhUm93cy5oZWFkZXJbcm93RGVmLnJvd0luZGV4XSA9IHsgcm93RGVmLCBrZXlzIH07XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgaGVhZGVyR3JvdXApIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUdyb3VwKHJvd0RlZik7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCByb3dEZWYgb2YgZm9vdGVyKSB7XG4gICAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZm9yIChjb25zdCBkZWYgb2Ygcm93RGVmLmNvbHMpIHtcbiAgICAgICAgY29uc3QgbWV0YUNvbCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGRlZi5pZCwgdGhpcy5tZXRhQ29sdW1ucyk7XG4gICAgICAgIGNvbnN0IGNvbHVtbiA9IG1ldGFDb2wuZm9vdGVyIHx8IChtZXRhQ29sLmZvb3RlciA9IG5ldyBQYmxNZXRhQ29sdW1uKGRlZikpO1xuICAgICAgICBrZXlzLnB1c2goY29sdW1uLmlkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21ldGFSb3dzLmZvb3Rlci5wdXNoKHsgcm93RGVmLCBrZXlzIH0pO1xuICAgIH1cbiAgICByZXNldENvbHVtbldpZHRocyhyb3dXaWR0aCwgdGhpcy5jb2x1bW5zLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgfVxuXG4gIHVwZGF0ZUdyb3VwcyguLi5yb3dJbmRleDogbnVtYmVyW10pOiB2b2lkIHtcbiAgICBpZiAocm93SW5kZXgubGVuZ3RoID09PSAwKSB7XG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiB0aGlzLmxhc3RTZXQuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlR3JvdXAocm93RGVmKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgcm93cyA9IHJvd0luZGV4LnNsaWNlKCk7XG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiB0aGlzLmxhc3RTZXQuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgY29uc3QgaWR4ID0gcm93cy5pbmRleE9mKHJvd0RlZi5yb3dJbmRleCk7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgIHJvd3Muc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlR3JvdXAocm93RGVmKTtcbiAgICAgICAgICBpZiAocm93cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVHcm91cChjb2x1bW5TZXQ6IFBibENvbHVtblNldDxQYmxDb2x1bW5Hcm91cD4pOiB2b2lkIHtcbiAgICBjb25zdCBrZXlzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IGFsbEtleXM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdCBncm91cHM6IFBibENvbHVtbkdyb3VwW10gPSBbXTtcblxuICAgIGZvciAobGV0IHRJbmRleCA9IDA7IHRJbmRleCA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IHRJbmRleCsrKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gW3RoaXMuY29sdW1uc1t0SW5kZXggLSAxXSwgdGhpcy5jb2x1bW5zW3RJbmRleF0sIHRoaXMuY29sdW1uc1t0SW5kZXggKyAxXV07XG4gICAgICBjb25zdCBjb2x1bW5Hcm91cHMgPSBjb2x1bW5zLm1hcCggYyA9PiBjID8gYy5nZXRHcm91cE9mUm93KGNvbHVtblNldC5yb3dJbmRleCkgOiB1bmRlZmluZWQgKTtcbiAgICAgIC8vIHRydWUgd2hlbiB0aGUgZ3JvdXAgZXhpc3RzIGluIG9uZSBvZiB0aGUgY29sdW1ucyBCVVQgTk9UIGluIHRoZSBMQVNUIENPTFVNTiAoaS5lOiBJdHMgYSBzbGF2ZSBzcGxpdClcbiAgICAgIGNvbnN0IGdyb3VwRXhpc3RzID0gZ3JvdXBzLmxhc3RJbmRleE9mKGNvbHVtbkdyb3Vwc1sxXSkgIT09IC0xO1xuXG4gICAgICBjb25zdCBjb2x1bW4gPSBjb2x1bW5zWzFdO1xuICAgICAgY29uc3QgZ0NvbHVtbiA9IGNvbHVtbi5ncm91cExvZ2ljKGNvbHVtbkdyb3VwcyBhcyBhbnksIGdyb3VwRXhpc3RzKTtcbiAgICAgIGlmIChnQ29sdW1uICE9PSBjb2x1bW5Hcm91cHNbMV0pIHtcbiAgICAgICAgY29sdW1uLm1hcmtOb3RJbkdyb3VwKGNvbHVtbkdyb3Vwc1sxXSk7XG4gICAgICAgIGNvbHVtbi5tYXJrSW5Hcm91cChnQ29sdW1uKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWV0YUNvbCA9IHRoaXMuZ2V0Q29sdW1uUmVjb3JkKGdDb2x1bW4uaWQsIHRoaXMubWV0YUNvbHVtbnMpO1xuICAgICAgaWYgKCFtZXRhQ29sLmhlYWRlckdyb3VwKSB7XG4gICAgICAgIG1ldGFDb2wuaGVhZGVyR3JvdXAgPSBnQ29sdW1uO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3JvdXBzLmxhc3RJbmRleE9mKGdDb2x1bW4pID09PSAtMSkge1xuICAgICAgICBhbGxLZXlzLnB1c2goZ0NvbHVtbi5pZCk7XG4gICAgICAgIGlmIChnQ29sdW1uLmlzVmlzaWJsZSkge1xuICAgICAgICAgIGtleXMucHVzaChnQ29sdW1uLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBnQ29sdW1uLnJlcGxhY2UoY29sdW1uKTtcbiAgICAgIGdyb3Vwcy5wdXNoKGdDb2x1bW4pO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZ2hvc3Qgb2YgdGhpcy5fZ3JvdXBTdG9yZS5maW5kR2hvc3RzKCkpIHtcbiAgICAgIGlmIChnaG9zdC5yb3dJbmRleCA9PT0gY29sdW1uU2V0LnJvd0luZGV4KSB7XG4gICAgICAgIGNvbnN0IHsgaWQgfSA9IGdob3N0O1xuICAgICAgICBsZXQgaWR4ID0gYWxsS2V5cy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICBhbGxLZXlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIGlkeCA9IGtleXMuaW5kZXhPZihpZCk7XG4gICAgICAgICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGtleXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubWV0YUNvbHVtbnMuc3BsaWNlKHRoaXMubWV0YUNvbHVtbnMuZmluZEluZGV4KCBtID0+IG0uaWQgPT09IGlkKSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZ3JvdXBTdG9yZS5yZW1vdmUoZ2hvc3QpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnVwZGF0ZU1ldGFSb3coJ2hlYWRlcicsIGNvbHVtblNldC5yb3dJbmRleCwgeyByb3dEZWY6IGNvbHVtblNldCwga2V5cywgYWxsS2V5cywgaXNHcm91cDogdHJ1ZSB9KVxuICB9XG5cblxuICBwcml2YXRlIHVwZGF0ZU1ldGFSb3c8UCBleHRlbmRzIGtleW9mIFBibENvbHVtblN0b3JlWydfbWV0YVJvd3MnXT4odHlwZTogUCwgcm93SW5kZXg6IG51bWJlciwgdmFsdWU6IFBibENvbHVtblN0b3JlWydfbWV0YVJvd3MnXVtQXVswXSk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnIgPSB0aGlzLl9tZXRhUm93c1t0eXBlXVtyb3dJbmRleF0gfHwge307XG4gICAgdGhpcy5fbWV0YVJvd3NbdHlwZV1bcm93SW5kZXhdID0gT2JqZWN0LmFzc2lnbihjdXJyLCB2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIGdldENvbHVtblJlY29yZDxUIGV4dGVuZHMgUGJsTWV0YUNvbHVtblN0b3JlICYgeyBkYXRhPzogUGJsQ29sdW1uIH0+KGlkOiBzdHJpbmcsIGNvbGxlY3Rpb24/OiBUW10pOiBUICB7XG4gICAgbGV0IGNvbHVtblJlY29yZDogUGJsTWV0YUNvbHVtblN0b3JlICYgeyBkYXRhPzogUGJsQ29sdW1uIH0gPSB0aGlzLmJ5SWQuZ2V0KGlkKTtcbiAgICBpZiAoIWNvbHVtblJlY29yZCkge1xuICAgICAgdGhpcy5ieUlkLnNldChpZCwgY29sdW1uUmVjb3JkID0geyBpZCB9KTtcbiAgICAgIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgIGNvbGxlY3Rpb24ucHVzaChjb2x1bW5SZWNvcmQgYXMgVCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2x1bW5SZWNvcmQgYXMgVDtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SGlkZGVuKCk6IHZvaWQge1xuICAgIHRoaXMuX2FsbEhpZGRlbiA9ICh0aGlzLl9oaWRkZW4gfHwgW10pLmNvbmNhdCh0aGlzLl9ncm91cEJ5Lm1hcCggYyA9PiBjLmlkICkpO1xuICAgIHRoaXMuY29sdW1uSWRzID0gW107XG4gICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgZm9yIChjb25zdCBjIG9mIHRoaXMuYWxsQ29sdW1ucykge1xuICAgICAgYy5oaWRkZW4gPSB0aGlzLl9hbGxIaWRkZW4uaW5kZXhPZihjLmlkKSA+IC0xO1xuICAgICAgaWYgKCFjLmhpZGRlbikge1xuICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjKTtcbiAgICAgICAgdGhpcy5jb2x1bW5JZHMucHVzaChjLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBoIG9mIHRoaXMuX21ldGFSb3dzLmhlYWRlcikge1xuICAgICAgaWYgKGguaXNHcm91cCkge1xuICAgICAgICBoLmtleXMgPSBoLmFsbEtleXMuZmlsdGVyKCBrZXkgPT4gdGhpcy5maW5kKGtleSkuaGVhZGVyR3JvdXAuaXNWaXNpYmxlICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5jb2x1bW5zLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRDb2x1bW5zKCk6IHZvaWQge1xuICAgIHRoaXMuYWxsQ29sdW1ucyA9IFtdO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIHRoaXMubWV0YUNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLmJ5SWQuY2xlYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRJZHMoKTogdm9pZCB7XG4gICAgdGhpcy5jb2x1bW5JZHMgPSBbXTtcbiAgICB0aGlzLl9tZXRhUm93cyA9IHRoaXMubWV0YUNvbHVtbklkcyA9IHsgaGVhZGVyOiBbXSwgZm9vdGVyOiBbXSB9O1xuICB9XG59XG5cbi8qKlxuICogTW92ZXMgYW4gaXRlbSBvbmUgaW5kZXggaW4gYW4gYXJyYXkgdG8gYW5vdGhlci5cbiAqIEBwYXJhbSBhcnJheSBBcnJheSBpbiB3aGljaCB0byBtb3ZlIHRoZSBpdGVtLlxuICogQHBhcmFtIGZyb21JbmRleCBTdGFydGluZyBpbmRleCBvZiB0aGUgaXRlbS5cbiAqIEBwYXJhbSB0b0luZGV4IEluZGV4IHRvIHdoaWNoIHRoZSBpdGVtIHNob3VsZCBiZSBtb3ZlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vdmVJdGVtSW5BcnJheTxUID0gYW55PihhcnJheTogVFtdLCBmcm9tSW5kZXg6IG51bWJlciwgdG9JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IGZyb20gPSBjbGFtcChmcm9tSW5kZXgsIGFycmF5Lmxlbmd0aCAtIDEpO1xuICBjb25zdCB0byA9IGNsYW1wKHRvSW5kZXgsIGFycmF5Lmxlbmd0aCAtIDEpO1xuXG4gIGlmIChmcm9tID09PSB0bykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRhcmdldCA9IGFycmF5W2Zyb21dO1xuICBjb25zdCBkZWx0YSA9IHRvIDwgZnJvbSA/IC0xIDogMTtcblxuICBmb3IgKGxldCBpID0gZnJvbTsgaSAhPT0gdG87IGkgKz0gZGVsdGEpIHtcbiAgICBhcnJheVtpXSA9IGFycmF5W2kgKyBkZWx0YV07XG4gIH1cblxuICBhcnJheVt0b10gPSB0YXJnZXQ7XG59XG5cbi8qKiBDbGFtcHMgYSBudW1iZXIgYmV0d2VlbiB6ZXJvIGFuZCBhIG1heGltdW0uICovXG5mdW5jdGlvbiBjbGFtcCh2YWx1ZTogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbihtYXgsIHZhbHVlKSk7XG59XG4iXX0=