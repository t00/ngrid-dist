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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXN0b3JlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb2x1bW5zL2NvbHVtbi1zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQUU3Qyx3Q0FNQzs7O0lBTEMsZ0NBQVc7O0lBQ1gsb0NBQXVCOztJQUN2QixvQ0FBdUI7O0lBQ3ZCLHlDQUE2Qjs7SUFDN0IseUNBQTZCOzs7OztBQUcvQiwyQ0FJQzs7O0lBSEMsdUNBQXlFOztJQUN6RSxxQ0FBZTs7SUFDZix3Q0FBa0I7O0FBR3BCO0lBNkJFO1FBTFEsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDM0IsU0FBSSxHQUFHLElBQUksR0FBRyxFQUFxRCxDQUFDO1FBSzFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQXZCRCxzQkFBSSxtQ0FBTzs7OztRQUFYLGNBQXVDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTlELHNCQUFJLGtDQUFNOzs7OztRQUFWLFVBQVcsS0FBZTtZQUN4QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxt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UnJDLE1BQU0sVUFBVSxlQUFlLENBQVUsS0FBVSxFQUFFLFNBQWlCLEVBQUUsT0FBZTs7UUFDL0UsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O1FBQ3pDLEVBQUUsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRTNDLElBQUksSUFBSSxLQUFLLEVBQUUsRUFBRTtRQUNmLE9BQU87S0FDUjs7UUFFSyxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs7UUFDcEIsS0FBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssRUFBRTtRQUN2QyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztLQUM3QjtJQUVELEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDckIsQ0FBQzs7Ozs7OztBQUdELFNBQVMsS0FBSyxDQUFDLEtBQWEsRUFBRSxHQUFXO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaXNEZXZNb2RlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsIFBibE5ncmlkQ29sdW1uU2V0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW5TZXQsIFBibE1ldGFSb3dEZWZpbml0aW9ucywgUGJsTWV0YUNvbHVtbkRlZmluaXRpb24sIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXAsIFBibENvbHVtbkdyb3VwU3RvcmUgfSBmcm9tICcuL2dyb3VwLWNvbHVtbic7XG5pbXBvcnQgeyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljIH0gZnJvbSAnLi4vY29sLXdpZHRoLWxvZ2ljL3N0YXRpYy1jb2x1bW4td2lkdGgnO1xuaW1wb3J0IHsgcmVzZXRDb2x1bW5XaWR0aHMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJzJztcbmltcG9ydCB7IFBibENvbHVtbkZhY3RvcnkgfSBmcm9tICcuL2ZhY3RvcnknO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE1ldGFDb2x1bW5TdG9yZSB7XG4gIGlkOiBzdHJpbmc7XG4gIGhlYWRlcj86IFBibE1ldGFDb2x1bW47XG4gIGZvb3Rlcj86IFBibE1ldGFDb2x1bW47XG4gIGhlYWRlckdyb3VwPzogUGJsQ29sdW1uR3JvdXA7XG4gIGZvb3Rlckdyb3VwPzogUGJsQ29sdW1uR3JvdXA7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsQ29sdW1uU3RvcmVNZXRhUm93IHtcbiAgcm93RGVmOiBQYmxDb2x1bW5TZXQ8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24gfCBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+LFxuICBrZXlzOiBzdHJpbmdbXTtcbiAgaXNHcm91cD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5TdG9yZSB7XG4gIG1ldGFDb2x1bW5JZHM6IHsgaGVhZGVyOiBBcnJheTxQYmxDb2x1bW5TdG9yZU1ldGFSb3c+OyBmb290ZXI6IEFycmF5PFBibENvbHVtblN0b3JlTWV0YVJvdz47IH07XG4gIG1ldGFDb2x1bW5zOiBQYmxNZXRhQ29sdW1uU3RvcmVbXTtcbiAgY29sdW1uSWRzOiBzdHJpbmdbXTtcbiAgY29sdW1uczogUGJsQ29sdW1uW107XG4gIGFsbENvbHVtbnM6IFBibENvbHVtbltdO1xuICBoZWFkZXJDb2x1bW5EZWY6IFBibE1ldGFSb3dEZWZpbml0aW9ucztcbiAgZm9vdGVyQ29sdW1uRGVmOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XG5cbiAgZ2V0IHByaW1hcnkoKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3ByaW1hcnk7IH1cblxuICBzZXQgaGlkZGVuKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2hpZGRlbiA9IHZhbHVlO1xuICAgIHRoaXMuc2V0SGlkZGVuKCk7XG4gIH1cblxuICBnZXQgZ3JvdXBCeSgpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLl9ncm91cEJ5OyB9XG5cbiAgZ2V0IGdyb3VwU3RvcmUoKTogUGJsQ29sdW1uR3JvdXBTdG9yZSB7IHJldHVybiB0aGlzLl9ncm91cFN0b3JlOyB9XG5cbiAgcHJpdmF0ZSBfcHJpbWFyeTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9tZXRhUm93czogeyBoZWFkZXI6IEFycmF5PFBibENvbHVtblN0b3JlTWV0YVJvdyAmIHsgYWxsS2V5cz86IHN0cmluZ1tdIH0+OyBmb290ZXI6IEFycmF5PFBibENvbHVtblN0b3JlTWV0YVJvdyAmIHsgYWxsS2V5cz86IHN0cmluZ1tdIH0+OyB9O1xuICBwcml2YXRlIF9oaWRkZW46IHN0cmluZ1tdO1xuICBwcml2YXRlIF9hbGxIaWRkZW46IHN0cmluZ1tdO1xuICBwcml2YXRlIF9ncm91cEJ5OiBQYmxDb2x1bW5bXSA9IFtdO1xuICBwcml2YXRlIGJ5SWQgPSBuZXcgTWFwPHN0cmluZywgUGJsTWV0YUNvbHVtblN0b3JlICYgeyBkYXRhPzogUGJsQ29sdW1uIH0+KCk7XG4gIHByaXZhdGUgX2dyb3VwU3RvcmU6IFBibENvbHVtbkdyb3VwU3RvcmU7XG4gIHByaXZhdGUgbGFzdFNldDogUGJsTmdyaWRDb2x1bW5TZXQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5yZXNldElkcygpO1xuICAgIHRoaXMucmVzZXRDb2x1bW5zKCk7XG4gIH1cblxuICBhZGRHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICB0aGlzLmdyb3VwQnkucHVzaCguLi5jb2x1bW4pO1xuICAgIHRoaXMuc2V0SGlkZGVuKCk7XG4gIH1cblxuICByZW1vdmVHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1uKSB7XG4gICAgICBjb25zdCBpZHggPSB0aGlzLmdyb3VwQnkuZmluZEluZGV4KCBnYmMgPT4gZ2JjLmlkID09PSBjLmlkICk7XG4gICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5ncm91cEJ5LnNwbGljZShpZHgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNldEhpZGRlbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmUgdGhlIHByb3ZpZGVkIGBjb2x1bW5gIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYGFuY2hvcmAgY29sdW1uLlxuICAgKiBUaGUgbmV3IGxvY2F0aW9uIG9mIHRoZSBhbmNob3IgY29sdW1uIHdpbGwgYmUgaXQncyBvcmlnaW5hbCBsb2NhdGlvbiBwbHVzIG9yIG1pbnVzIDEsIGRlcGVuZGluZyBvbiB0aGUgZGVsdGEgYmV0d2VlblxuICAgKiB0aGUgY29sdW1ucy4gSWYgdGhlIG9yaWdpbiBvZiB0aGUgYGNvbHVtbmAgaXMgYmVmb3JlIHRoZSBgYW5jaG9yYCB0aGVuIHRoZSBhbmNob3IncyBuZXcgcG9zaXRpb24gaXMgbWludXMgb25lLCBvdGhlcndpc2UgcGx1cyAxLlxuICAgKi9cbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgYW5jaG9yOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGNvbHVtbnMsIGNvbHVtbklkcywgYWxsQ29sdW1ucyB9ID0gdGhpcztcbiAgICBsZXQgYW5jaG9ySW5kZXggPSBjb2x1bW5zLmluZGV4T2YoYW5jaG9yKTtcbiAgICBsZXQgY29sdW1uSW5kZXggPSBjb2x1bW5zLmluZGV4T2YoY29sdW1uKTtcbiAgICBpZiAoYW5jaG9ySW5kZXggPiAtMSAmJiBjb2x1bW5JbmRleCA+IC0xKSB7XG4gICAgICBtb3ZlSXRlbUluQXJyYXkoY29sdW1uSWRzLCBjb2x1bW5JbmRleCwgYW5jaG9ySW5kZXgpO1xuICAgICAgbW92ZUl0ZW1JbkFycmF5KGNvbHVtbnMsIGNvbHVtbkluZGV4LCBhbmNob3JJbmRleCk7XG4gICAgICBpZiAodGhpcy5fYWxsSGlkZGVuICYmIHRoaXMuX2FsbEhpZGRlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFuY2hvckluZGV4ID0gYWxsQ29sdW1ucy5pbmRleE9mKGFuY2hvcik7XG4gICAgICAgIGNvbHVtbkluZGV4ID0gYWxsQ29sdW1ucy5pbmRleE9mKGNvbHVtbik7XG4gICAgICB9XG4gICAgICBtb3ZlSXRlbUluQXJyYXkoYWxsQ29sdW1ucywgY29sdW1uSW5kZXgsIGFuY2hvckluZGV4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHN3YXBDb2x1bW5zKGNvbDE6IFBibENvbHVtbiwgY29sMjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgbGV0IGNvbDFJbmRleCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbDEpO1xuICAgIGxldCBjb2wySW5kZXggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2wyKTtcbiAgICBpZiAoY29sMUluZGV4ID4gLTEgJiYgY29sMkluZGV4ID4gLTEpIHtcbiAgICAgIGNvbnN0IHsgY29sdW1ucywgY29sdW1uSWRzLCBhbGxDb2x1bW5zIH0gPSB0aGlzO1xuICAgICAgY29sdW1uc1tjb2wxSW5kZXhdID0gY29sMjtcbiAgICAgIGNvbHVtbnNbY29sMkluZGV4XSA9IGNvbDE7XG4gICAgICBjb2x1bW5JZHNbY29sMUluZGV4XSA9IGNvbDIuaWQ7XG4gICAgICBjb2x1bW5JZHNbY29sMkluZGV4XSA9IGNvbDEuaWQ7XG5cbiAgICAgIGlmICh0aGlzLl9hbGxIaWRkZW4gJiYgdGhpcy5fYWxsSGlkZGVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29sMUluZGV4ID0gYWxsQ29sdW1ucy5pbmRleE9mKGNvbDEpO1xuICAgICAgICBjb2wySW5kZXggPSBhbGxDb2x1bW5zLmluZGV4T2YoY29sMik7XG4gICAgICB9XG4gICAgICBhbGxDb2x1bW5zW2NvbDFJbmRleF0gPSBjb2wyO1xuICAgICAgYWxsQ29sdW1uc1tjb2wySW5kZXhdID0gY29sMTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmaW5kKGlkOiBzdHJpbmcpOiBQYmxNZXRhQ29sdW1uU3RvcmUgJiB7IGRhdGE/OiBQYmxDb2x1bW4gfSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYnlJZC5nZXQoaWQpO1xuICB9XG5cbiAgZ2V0QWxsSGVhZGVyR3JvdXAoKTogUGJsQ29sdW1uR3JvdXBbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3VwU3RvcmUgPyB0aGlzLl9ncm91cFN0b3JlLmFsbCA6IFtdO1xuICB9XG5cbiAgZ2V0U3RhdGljV2lkdGgoKTogU3RhdGljQ29sdW1uV2lkdGhMb2dpYyB7XG4gICAgY29uc3Qgcm93V2lkdGggPSBuZXcgU3RhdGljQ29sdW1uV2lkdGhMb2dpYygpO1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIHRoaXMuY29sdW1ucykge1xuICAgICAgcm93V2lkdGguYWRkQ29sdW1uKGNvbHVtbik7XG4gICAgfVxuICAgIHJldHVybiByb3dXaWR0aDtcbiAgfVxuXG4gIGludmFsaWRhdGUoY29sdW1uT3JEZWZpbml0aW9uU2V0OiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQgfCBQYmxOZ3JpZENvbHVtblNldCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHVtblNldDogUGJsTmdyaWRDb2x1bW5TZXQgPSB0aGlzLmxhc3RTZXQgPSAnZ3JvdXBTdG9yZScgaW4gY29sdW1uT3JEZWZpbml0aW9uU2V0XG4gICAgICA/IGNvbHVtbk9yRGVmaW5pdGlvblNldFxuICAgICAgOiBQYmxDb2x1bW5GYWN0b3J5LmZyb21EZWZpbml0aW9uU2V0KGNvbHVtbk9yRGVmaW5pdGlvblNldCkuYnVpbGQoKVxuICAgIDtcbiAgICBjb25zdCB7IGdyb3VwU3RvcmUsIHRhYmxlLCBoZWFkZXIsIGZvb3RlciwgaGVhZGVyR3JvdXAgfSA9IGNvbHVtblNldDtcblxuICAgIHRoaXMuX2dyb3VwU3RvcmUgPSBncm91cFN0b3JlLmNsb25lKCk7XG5cbiAgICBjb25zdCByb3dXaWR0aCA9IG5ldyBTdGF0aWNDb2x1bW5XaWR0aExvZ2ljKCk7XG4gICAgdGhpcy5yZXNldENvbHVtbnMoKTtcbiAgICB0aGlzLnJlc2V0SWRzKCk7XG4gICAgY29uc3QgaGlkZGVuID0gdGhpcy5fYWxsSGlkZGVuID0gKHRoaXMuX2hpZGRlbiB8fCBbXSkuY29uY2F0KHRoaXMuX2dyb3VwQnkubWFwKCBjID0+IGMuaWQgKSk7XG5cbiAgICB0aGlzLmhlYWRlckNvbHVtbkRlZiA9IHtcbiAgICAgIHJvd0NsYXNzTmFtZTogKHRhYmxlLmhlYWRlciAmJiB0YWJsZS5oZWFkZXIucm93Q2xhc3NOYW1lKSB8fCAnJyxcbiAgICAgIHR5cGU6ICh0YWJsZS5oZWFkZXIgJiYgdGFibGUuaGVhZGVyLnR5cGUpIHx8ICdmaXhlZCcsXG4gICAgfVxuICAgIHRoaXMuZm9vdGVyQ29sdW1uRGVmID0ge1xuICAgICAgcm93Q2xhc3NOYW1lOiAodGFibGUuZm9vdGVyICYmIHRhYmxlLmZvb3Rlci5yb3dDbGFzc05hbWUpIHx8ICcnLFxuICAgICAgdHlwZTogKHRhYmxlLmZvb3RlciAmJiB0YWJsZS5mb290ZXIudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9XG5cbiAgICB0aGlzLl9wcmltYXJ5ID0gdW5kZWZpbmVkO1xuXG4gICAgZm9yIChjb25zdCBkZWYgb2YgdGFibGUuY29scykge1xuICAgICAgbGV0IGNvbHVtbjogUGJsQ29sdW1uO1xuICAgICAgY29sdW1uID0gbmV3IFBibENvbHVtbihkZWYsIHRoaXMuZ3JvdXBTdG9yZSk7XG4gICAgICBjb25zdCBjb2x1bW5SZWNvcmQgPSB0aGlzLmdldENvbHVtblJlY29yZChjb2x1bW4uaWQpO1xuICAgICAgY29sdW1uUmVjb3JkLmRhdGEgPSBjb2x1bW47XG4gICAgICB0aGlzLmFsbENvbHVtbnMucHVzaChjb2x1bW4pO1xuXG4gICAgICBjb2x1bW4uaGlkZGVuID0gaGlkZGVuLmluZGV4T2YoY29sdW1uLmlkKSA+IC0xO1xuICAgICAgaWYgKCFjb2x1bW4uaGlkZGVuKSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbHVtbik7XG4gICAgICAgIHRoaXMuY29sdW1uSWRzLnB1c2goY29sdW1uLmlkKTtcbiAgICAgICAgcm93V2lkdGguYWRkQ29sdW1uKGNvbHVtbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb2x1bW4ucEluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLl9wcmltYXJ5ICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBNdWx0aXBsZSBwcmltYXJ5IGluZGV4IGNvbHVtbnMgZGVmaW5lZDogcHJldmlvdXM6IFwiJHt0aGlzLl9wcmltYXJ5LmlkfVwiLCBjdXJyZW50OiBcIiR7Y29sdW1uLmlkfVwiYCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcHJpbWFyeSA9IGNvbHVtbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gW107XG4gICAgICBmb3IgKGNvbnN0IGRlZiBvZiByb3dEZWYuY29scykge1xuICAgICAgICBjb25zdCBtZXRhQ29sID0gdGhpcy5nZXRDb2x1bW5SZWNvcmQoZGVmLmlkLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgICAgICAgY29uc3QgY29sdW1uID0gbWV0YUNvbC5oZWFkZXIgfHwgKG1ldGFDb2wuaGVhZGVyID0gbmV3IFBibE1ldGFDb2x1bW4oZGVmKSk7XG4gICAgICAgIGtleXMucHVzaChjb2x1bW4uaWQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbWV0YVJvd3MuaGVhZGVyW3Jvd0RlZi5yb3dJbmRleF0gPSB7IHJvd0RlZiwga2V5cyB9O1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIGhlYWRlckdyb3VwKSB7XG4gICAgICB0aGlzLl91cGRhdGVHcm91cChyb3dEZWYpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIGZvb3Rlcikge1xuICAgICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAoY29uc3QgZGVmIG9mIHJvd0RlZi5jb2xzKSB7XG4gICAgICAgIGNvbnN0IG1ldGFDb2wgPSB0aGlzLmdldENvbHVtblJlY29yZChkZWYuaWQsIHRoaXMubWV0YUNvbHVtbnMpO1xuICAgICAgICBjb25zdCBjb2x1bW4gPSBtZXRhQ29sLmZvb3RlciB8fCAobWV0YUNvbC5mb290ZXIgPSBuZXcgUGJsTWV0YUNvbHVtbihkZWYpKTtcbiAgICAgICAga2V5cy5wdXNoKGNvbHVtbi5pZCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9tZXRhUm93cy5mb290ZXIucHVzaCh7IHJvd0RlZiwga2V5cyB9KTtcbiAgICB9XG4gICAgcmVzZXRDb2x1bW5XaWR0aHMocm93V2lkdGgsIHRoaXMuY29sdW1ucywgdGhpcy5tZXRhQ29sdW1ucyk7XG4gIH1cblxuICB1cGRhdGVHcm91cHMoLi4ucm93SW5kZXg6IG51bWJlcltdKTogdm9pZCB7XG4gICAgaWYgKHJvd0luZGV4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgdGhpcy5sYXN0U2V0LmhlYWRlckdyb3VwKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUdyb3VwKHJvd0RlZik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJvd3MgPSByb3dJbmRleC5zbGljZSgpO1xuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgdGhpcy5sYXN0U2V0LmhlYWRlckdyb3VwKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IHJvd3MuaW5kZXhPZihyb3dEZWYucm93SW5kZXgpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICByb3dzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIHRoaXMuX3VwZGF0ZUdyb3VwKHJvd0RlZik7XG4gICAgICAgICAgaWYgKHJvd3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlR3JvdXAoY29sdW1uU2V0OiBQYmxDb2x1bW5TZXQ8UGJsQ29sdW1uR3JvdXA+KTogdm9pZCB7XG4gICAgY29uc3Qga2V5czogc3RyaW5nW10gPSBbXTtcbiAgICBjb25zdCBhbGxLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3QgZ3JvdXBzOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgICBmb3IgKGxldCB0SW5kZXggPSAwOyB0SW5kZXggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyB0SW5kZXgrKykge1xuICAgICAgY29uc3QgY29sdW1ucyA9IFt0aGlzLmNvbHVtbnNbdEluZGV4IC0gMV0sIHRoaXMuY29sdW1uc1t0SW5kZXhdLCB0aGlzLmNvbHVtbnNbdEluZGV4ICsgMV1dO1xuICAgICAgY29uc3QgY29sdW1uR3JvdXBzID0gY29sdW1ucy5tYXAoIGMgPT4gYyA/IGMuZ2V0R3JvdXBPZlJvdyhjb2x1bW5TZXQucm93SW5kZXgpIDogdW5kZWZpbmVkICk7XG4gICAgICAvLyB0cnVlIHdoZW4gdGhlIGdyb3VwIGV4aXN0cyBpbiBvbmUgb2YgdGhlIGNvbHVtbnMgQlVUIE5PVCBpbiB0aGUgTEFTVCBDT0xVTU4gKGkuZTogSXRzIGEgc2xhdmUgc3BsaXQpXG4gICAgICBjb25zdCBncm91cEV4aXN0cyA9IGdyb3Vwcy5sYXN0SW5kZXhPZihjb2x1bW5Hcm91cHNbMV0pICE9PSAtMTtcblxuICAgICAgY29uc3QgY29sdW1uID0gY29sdW1uc1sxXTtcbiAgICAgIGNvbnN0IGdDb2x1bW4gPSBjb2x1bW4uZ3JvdXBMb2dpYyhjb2x1bW5Hcm91cHMgYXMgYW55LCBncm91cEV4aXN0cyk7XG4gICAgICBpZiAoZ0NvbHVtbiAhPT0gY29sdW1uR3JvdXBzWzFdKSB7XG4gICAgICAgIGNvbHVtbi5tYXJrTm90SW5Hcm91cChjb2x1bW5Hcm91cHNbMV0pO1xuICAgICAgICBjb2x1bW4ubWFya0luR3JvdXAoZ0NvbHVtbik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1ldGFDb2wgPSB0aGlzLmdldENvbHVtblJlY29yZChnQ29sdW1uLmlkLCB0aGlzLm1ldGFDb2x1bW5zKTtcbiAgICAgIGlmICghbWV0YUNvbC5oZWFkZXJHcm91cCkge1xuICAgICAgICBtZXRhQ29sLmhlYWRlckdyb3VwID0gZ0NvbHVtbjtcbiAgICAgIH1cblxuICAgICAgaWYgKGdyb3Vwcy5sYXN0SW5kZXhPZihnQ29sdW1uKSA9PT0gLTEpIHtcbiAgICAgICAgYWxsS2V5cy5wdXNoKGdDb2x1bW4uaWQpO1xuICAgICAgICBpZiAoZ0NvbHVtbi5pc1Zpc2libGUpIHtcbiAgICAgICAgICBrZXlzLnB1c2goZ0NvbHVtbi5pZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZ0NvbHVtbi5yZXBsYWNlKGNvbHVtbik7XG4gICAgICBncm91cHMucHVzaChnQ29sdW1uKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGdob3N0IG9mIHRoaXMuX2dyb3VwU3RvcmUuZmluZEdob3N0cygpKSB7XG4gICAgICBpZiAoZ2hvc3Qucm93SW5kZXggPT09IGNvbHVtblNldC5yb3dJbmRleCkge1xuICAgICAgICBjb25zdCB7IGlkIH0gPSBnaG9zdDtcbiAgICAgICAgbGV0IGlkeCA9IGFsbEtleXMuaW5kZXhPZihpZCk7XG4gICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgYWxsS2V5cy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICBpZHggPSBrZXlzLmluZGV4T2YoaWQpO1xuICAgICAgICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICAgICAgICBrZXlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLm1ldGFDb2x1bW5zLnNwbGljZSh0aGlzLm1ldGFDb2x1bW5zLmZpbmRJbmRleCggbSA9PiBtLmlkID09PSBpZCksIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2dyb3VwU3RvcmUucmVtb3ZlKGdob3N0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVNZXRhUm93KCdoZWFkZXInLCBjb2x1bW5TZXQucm93SW5kZXgsIHsgcm93RGVmOiBjb2x1bW5TZXQsIGtleXMsIGFsbEtleXMsIGlzR3JvdXA6IHRydWUgfSlcbiAgfVxuXG5cbiAgcHJpdmF0ZSB1cGRhdGVNZXRhUm93PFAgZXh0ZW5kcyBrZXlvZiBQYmxDb2x1bW5TdG9yZVsnX21ldGFSb3dzJ10+KHR5cGU6IFAsIHJvd0luZGV4OiBudW1iZXIsIHZhbHVlOiBQYmxDb2x1bW5TdG9yZVsnX21ldGFSb3dzJ11bUF1bMF0pOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyID0gdGhpcy5fbWV0YVJvd3NbdHlwZV1bcm93SW5kZXhdIHx8IHt9O1xuICAgIHRoaXMuX21ldGFSb3dzW3R5cGVdW3Jvd0luZGV4XSA9IE9iamVjdC5hc3NpZ24oY3VyciwgdmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb2x1bW5SZWNvcmQ8VCBleHRlbmRzIFBibE1ldGFDb2x1bW5TdG9yZSAmIHsgZGF0YT86IFBibENvbHVtbiB9PihpZDogc3RyaW5nLCBjb2xsZWN0aW9uPzogVFtdKTogVCAge1xuICAgIGxldCBjb2x1bW5SZWNvcmQ6IFBibE1ldGFDb2x1bW5TdG9yZSAmIHsgZGF0YT86IFBibENvbHVtbiB9ID0gdGhpcy5ieUlkLmdldChpZCk7XG4gICAgaWYgKCFjb2x1bW5SZWNvcmQpIHtcbiAgICAgIHRoaXMuYnlJZC5zZXQoaWQsIGNvbHVtblJlY29yZCA9IHsgaWQgfSk7XG4gICAgICBpZiAoY29sbGVjdGlvbikge1xuICAgICAgICBjb2xsZWN0aW9uLnB1c2goY29sdW1uUmVjb3JkIGFzIFQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sdW1uUmVjb3JkIGFzIFQ7XG4gIH1cblxuICBwcml2YXRlIHNldEhpZGRlbigpOiB2b2lkIHtcbiAgICB0aGlzLl9hbGxIaWRkZW4gPSAodGhpcy5faGlkZGVuIHx8IFtdKS5jb25jYXQodGhpcy5fZ3JvdXBCeS5tYXAoIGMgPT4gYy5pZCApKTtcbiAgICB0aGlzLmNvbHVtbklkcyA9IFtdO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmFsbENvbHVtbnMpIHtcbiAgICAgIGMuaGlkZGVuID0gdGhpcy5fYWxsSGlkZGVuLmluZGV4T2YoYy5pZCkgPiAtMTtcbiAgICAgIGlmICghYy5oaWRkZW4pIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goYyk7XG4gICAgICAgIHRoaXMuY29sdW1uSWRzLnB1c2goYy5pZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgaCBvZiB0aGlzLl9tZXRhUm93cy5oZWFkZXIpIHtcbiAgICAgIGlmIChoLmlzR3JvdXApIHtcbiAgICAgICAgaC5rZXlzID0gaC5hbGxLZXlzLmZpbHRlcigga2V5ID0+IHRoaXMuZmluZChrZXkpLmhlYWRlckdyb3VwLmlzVmlzaWJsZSApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXNldENvbHVtbldpZHRocyh0aGlzLmdldFN0YXRpY1dpZHRoKCksIHRoaXMuY29sdW1ucywgdGhpcy5tZXRhQ29sdW1ucyk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Q29sdW1ucygpOiB2b2lkIHtcbiAgICB0aGlzLmFsbENvbHVtbnMgPSBbXTtcbiAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICB0aGlzLm1ldGFDb2x1bW5zID0gW107XG4gICAgdGhpcy5ieUlkLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SWRzKCk6IHZvaWQge1xuICAgIHRoaXMuY29sdW1uSWRzID0gW107XG4gICAgdGhpcy5fbWV0YVJvd3MgPSB0aGlzLm1ldGFDb2x1bW5JZHMgPSB7IGhlYWRlcjogW10sIGZvb3RlcjogW10gfTtcbiAgfVxufVxuXG4vKipcbiAqIE1vdmVzIGFuIGl0ZW0gb25lIGluZGV4IGluIGFuIGFycmF5IHRvIGFub3RoZXIuXG4gKiBAcGFyYW0gYXJyYXkgQXJyYXkgaW4gd2hpY2ggdG8gbW92ZSB0aGUgaXRlbS5cbiAqIEBwYXJhbSBmcm9tSW5kZXggU3RhcnRpbmcgaW5kZXggb2YgdGhlIGl0ZW0uXG4gKiBAcGFyYW0gdG9JbmRleCBJbmRleCB0byB3aGljaCB0aGUgaXRlbSBzaG91bGQgYmUgbW92ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb3ZlSXRlbUluQXJyYXk8VCA9IGFueT4oYXJyYXk6IFRbXSwgZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlcik6IHZvaWQge1xuICBjb25zdCBmcm9tID0gY2xhbXAoZnJvbUluZGV4LCBhcnJheS5sZW5ndGggLSAxKTtcbiAgY29uc3QgdG8gPSBjbGFtcCh0b0luZGV4LCBhcnJheS5sZW5ndGggLSAxKTtcblxuICBpZiAoZnJvbSA9PT0gdG8pIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0YXJnZXQgPSBhcnJheVtmcm9tXTtcbiAgY29uc3QgZGVsdGEgPSB0byA8IGZyb20gPyAtMSA6IDE7XG5cbiAgZm9yIChsZXQgaSA9IGZyb207IGkgIT09IHRvOyBpICs9IGRlbHRhKSB7XG4gICAgYXJyYXlbaV0gPSBhcnJheVtpICsgZGVsdGFdO1xuICB9XG5cbiAgYXJyYXlbdG9dID0gdGFyZ2V0O1xufVxuXG4vKiogQ2xhbXBzIGEgbnVtYmVyIGJldHdlZW4gemVybyBhbmQgYSBtYXhpbXVtLiAqL1xuZnVuY3Rpb24gY2xhbXAodmFsdWU6IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4obWF4LCB2YWx1ZSkpO1xufVxuIl19