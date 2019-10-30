/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblMetaColumn } from './meta-column';
/** @type {?} */
var PBL_NGRID_COLUMN_GROUP_MARK = Symbol('PblColumnGroup');
/** @type {?} */
var CLONE_PROPERTIES = [];
/**
 * @param {?} def
 * @return {?}
 */
export function isPblColumnGroup(def) {
    return def instanceof PblColumnGroup || def[PBL_NGRID_COLUMN_GROUP_MARK] === true;
}
/**
 * @param {?} value
 * @return {?}
 */
function getId(value) {
    return typeof value === 'string' ? value : value.id;
}
var PblColumnGroupStore = /** @class */ (function () {
    function PblColumnGroupStore() {
        this.store = new Map();
        this._all = [];
    }
    Object.defineProperty(PblColumnGroupStore.prototype, "all", {
        get: /**
         * @return {?}
         */
        function () { return this._all; },
        enumerable: true,
        configurable: true
    });
    /**
     * Attach a column to a group.
     */
    /**
     * Attach a column to a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    PblColumnGroupStore.prototype.attach = /**
     * Attach a column to a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    function (group, column) {
        /** @type {?} */
        var g = this._find(group);
        if (g) {
            g.activeColumns.add(getId(column));
            return true;
        }
        return false;
    };
    /**
     * Detach a column from a group.
     */
    /**
     * Detach a column from a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    PblColumnGroupStore.prototype.detach = /**
     * Detach a column from a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    function (group, column) {
        /** @type {?} */
        var g = this._find(group);
        if (g) {
            return g.activeColumns.delete(getId(column));
        }
        return false;
    };
    /**
     * Returns a list of `PblColumnGroup` that does not have columns attached.
     */
    /**
     * Returns a list of `PblColumnGroup` that does not have columns attached.
     * @return {?}
     */
    PblColumnGroupStore.prototype.findGhosts = /**
     * Returns a list of `PblColumnGroup` that does not have columns attached.
     * @return {?}
     */
    function () {
        return Array.from(this.store.values())
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.activeColumns.size === 0; }))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.group; }));
    };
    /**
     * @param {?} group
     * @return {?}
     */
    PblColumnGroupStore.prototype.add = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        this.store.set(group.id, { group: group, activeColumns: new Set() });
        this.updateAll();
    };
    /**
     * @param {?} group
     * @return {?}
     */
    PblColumnGroupStore.prototype.remove = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var g = this.find(group);
        if (g && this.store.delete(g.id)) {
            this.updateAll();
            return true;
        }
        return false;
    };
    /**
     * @param {?} group
     * @return {?}
     */
    PblColumnGroupStore.prototype.find = /**
     * @param {?} group
     * @return {?}
     */
    function (group) {
        /** @type {?} */
        var g = this._find(group);
        if (g) {
            return g.group;
        }
    };
    /**
     * @return {?}
     */
    PblColumnGroupStore.prototype.clone = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var c = new PblColumnGroupStore();
        c.store = new Map(this.store);
        c.updateAll();
        return c;
    };
    /**
     * @private
     * @param {?} group
     * @return {?}
     */
    PblColumnGroupStore.prototype._find = /**
     * @private
     * @param {?} group
     * @return {?}
     */
    function (group) {
        return this.store.get(getId(group));
    };
    /**
     * @private
     * @return {?}
     */
    PblColumnGroupStore.prototype.updateAll = /**
     * @private
     * @return {?}
     */
    function () {
        this._all = Array.from(this.store.values()).map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.group; }));
    };
    return PblColumnGroupStore;
}());
export { PblColumnGroupStore };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnGroupStore.prototype.store;
    /**
     * @type {?}
     * @private
     */
    PblColumnGroupStore.prototype._all;
}
var PblColumnGroup = /** @class */ (function (_super) {
    tslib_1.__extends(PblColumnGroup, _super);
    function PblColumnGroup(def, columns, placeholder) {
        var e_1, _a, e_2, _b;
        if (placeholder === void 0) { placeholder = false; }
        var _this = _super.call(this, isPblColumnGroup(def)
            ? def
            : tslib_1.__assign({ id: "group-" + def.prop + "-span-" + def.span + "-row-" + def.rowIndex, kind: (/** @type {?} */ ('header')) }, ((/** @type {?} */ (def))))) || this;
        _this.placeholder = placeholder;
        _this[PBL_NGRID_COLUMN_GROUP_MARK] = true;
        _this.prop = def.prop;
        _this.span = def.span;
        _this.columns = columns;
        try {
            for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var c = columns_1_1.value;
                c.markInGroup(_this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var CLONE_PROPERTIES_1 = tslib_1.__values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                var prop = CLONE_PROPERTIES_1_1.value;
                if (prop in def) {
                    _this[(/** @type {?} */ (prop))] = def[prop];
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (CLONE_PROPERTIES_1_1 && !CLONE_PROPERTIES_1_1.done && (_b = CLONE_PROPERTIES_1.return)) _b.call(CLONE_PROPERTIES_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return _this;
    }
    Object.defineProperty(PblColumnGroup.prototype, "isVisible", {
        //#endregion PblColumnGroupDefinition
        /**
         * Returns the visible state of the column.
         * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
         */
        get: 
        //#endregion PblColumnGroupDefinition
        /**
         * Returns the visible state of the column.
         * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
         * @return {?}
         */
        function () {
            return this.columns.some((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return !c.hidden; }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} name
     * @return {?}
     */
    PblColumnGroup.extendProperty = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (CLONE_PROPERTIES.indexOf(name) === -1) {
            CLONE_PROPERTIES.push(name);
        }
    };
    /**
     * @param {?=} columns
     * @return {?}
     */
    PblColumnGroup.prototype.createSlave = /**
     * @param {?=} columns
     * @return {?}
     */
    function (columns) {
        if (columns === void 0) { columns = []; }
        /** @type {?} */
        var slave = new PblColumnGroup(this, columns);
        slave.id += '-slave' + Date.now();
        slave.slaveOf = this;
        slave.template = this.template;
        return slave;
    };
    /**
     * @param {?} newColumn
     * @return {?}
     */
    PblColumnGroup.prototype.replace = /**
     * @param {?} newColumn
     * @return {?}
     */
    function (newColumn) {
        var id = newColumn.id;
        /** @type {?} */
        var idx = this.columns.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.id === id; }));
        if (idx > -1) {
            this.columns.splice(idx, 1, newColumn);
            return true;
        }
        return false;
    };
    return PblColumnGroup;
}(PblMetaColumn));
export { PblColumnGroup };
if (false) {
    /**
     * The table's column that is the first child column for this group.
     * @type {?}
     */
    PblColumnGroup.prototype.prop;
    /**
     * The total span of the group (excluding the first child - i.e. prop).
     * The span and prop are used to get the child columns of this group.
     * The span is not dynamic, once the columns are set they don't change.
     *
     * For example, if a we have a span of 2 and the column at the 2nd position is hidden it will still count as
     * being spanned although the UI will span only 1 column... (because the 2nd is hidden...)
     * @type {?}
     */
    PblColumnGroup.prototype.span;
    /**
     * The column def for this column.
     * @type {?}
     */
    PblColumnGroup.prototype.columnDef;
    /**
     * When set, this column is a cloned column of an existing column caused by a split.
     * \@internal
     * @type {?}
     */
    PblColumnGroup.prototype.slaveOf;
    /**
     * \@internal
     * @type {?}
     */
    PblColumnGroup.prototype.columns;
    /** @type {?} */
    PblColumnGroup.prototype.placeholder;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb2x1bW5zL2dyb3VwLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBR3hDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7SUFDdEQsZ0JBQWdCLEdBQWdDLEVBQUU7Ozs7O0FBRXhELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUE2QjtJQUM1RCxPQUFPLEdBQUcsWUFBWSxjQUFjLElBQUksR0FBRyxDQUFDLDJCQUEyQixDQUFDLEtBQUssSUFBSSxDQUFDO0FBQ3BGLENBQUM7Ozs7O0FBRUQsU0FBUyxLQUFLLENBQUMsS0FBOEI7SUFDM0MsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUN0RCxDQUFDO0FBRUQ7SUFBQTtRQUdVLFVBQUssR0FBRyxJQUFJLEdBQUcsRUFBa0UsQ0FBQztRQUNsRixTQUFJLEdBQXFCLEVBQUUsQ0FBQztJQXFFdEMsQ0FBQztJQXhFQyxzQkFBSSxvQ0FBRzs7OztRQUFQLGNBQThCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBS2pEOztPQUVHOzs7Ozs7O0lBQ0gsb0NBQU07Ozs7OztJQUFOLFVBQU8sS0FBOEIsRUFBRSxNQUEwQjs7WUFDekQsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lB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b250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5cbmNvbnN0IFBCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSSyA9IFN5bWJvbCgnUGJsQ29sdW1uR3JvdXAnKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibENvbHVtbkdyb3VwPiA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYmxDb2x1bW5Hcm91cChkZWY6IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbik6IGRlZiBpcyBQYmxDb2x1bW5Hcm91cCB7XG4gIHJldHVybiBkZWYgaW5zdGFuY2VvZiBQYmxDb2x1bW5Hcm91cCB8fCBkZWZbUEJMX05HUklEX0NPTFVNTl9HUk9VUF9NQVJLXSA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0SWQodmFsdWU6IHN0cmluZyB8IHsgaWQ6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSA6IHZhbHVlLmlkO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uR3JvdXBTdG9yZSB7XG4gIGdldCBhbGwoKTogUGJsQ29sdW1uR3JvdXBbXSB7IHJldHVybiB0aGlzLl9hbGw7IH1cblxuICBwcml2YXRlIHN0b3JlID0gbmV3IE1hcDxzdHJpbmcsIHsgZ3JvdXA6IFBibENvbHVtbkdyb3VwOyBhY3RpdmVDb2x1bW5zOiBTZXQ8c3RyaW5nPjsgfT4oKTtcbiAgcHJpdmF0ZSBfYWxsOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGNvbHVtbiB0byBhIGdyb3VwLlxuICAgKi9cbiAgYXR0YWNoKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCwgY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIGcuYWN0aXZlQ29sdW1ucy5hZGQoZ2V0SWQoY29sdW1uKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGFjaCBhIGNvbHVtbiBmcm9tIGEgZ3JvdXAuXG4gICAqL1xuICBkZXRhY2goZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwLCBjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGcgPSB0aGlzLl9maW5kKGdyb3VwKTtcbiAgICBpZiAoZykge1xuICAgICAgcmV0dXJuIGcuYWN0aXZlQ29sdW1ucy5kZWxldGUoZ2V0SWQoY29sdW1uKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBgUGJsQ29sdW1uR3JvdXBgIHRoYXQgZG9lcyBub3QgaGF2ZSBjb2x1bW5zIGF0dGFjaGVkLlxuICAgKi9cbiAgZmluZEdob3N0cygpOiBQYmxDb2x1bW5Hcm91cFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLnZhbHVlcygpKVxuICAgICAgLmZpbHRlciggaXRlbSA9PiBpdGVtLmFjdGl2ZUNvbHVtbnMuc2l6ZSA9PT0gMCApXG4gICAgICAubWFwKCBpdGVtID0+IGl0ZW0uZ3JvdXAgKTtcbiAgfVxuXG4gIGFkZChncm91cDogUGJsQ29sdW1uR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLnNldChncm91cC5pZCwgeyBncm91cCwgYWN0aXZlQ29sdW1uczogbmV3IFNldDxzdHJpbmc+KCkgfSk7XG4gICAgdGhpcy51cGRhdGVBbGwoKTtcbiAgfVxuXG4gIHJlbW92ZShncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5maW5kKGdyb3VwKTtcbiAgICBpZiAoZyAmJiB0aGlzLnN0b3JlLmRlbGV0ZShnLmlkKSkge1xuICAgICAgdGhpcy51cGRhdGVBbGwoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmaW5kKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCk6IFBibENvbHVtbkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIHJldHVybiBnLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKCk6IFBibENvbHVtbkdyb3VwU3RvcmUge1xuICAgIGNvbnN0IGMgPSBuZXcgUGJsQ29sdW1uR3JvdXBTdG9yZSgpO1xuICAgIGMuc3RvcmUgPSBuZXcgTWFwPHN0cmluZywgeyBncm91cDogUGJsQ29sdW1uR3JvdXA7IGFjdGl2ZUNvbHVtbnM6IFNldDxzdHJpbmc+OyB9Pih0aGlzLnN0b3JlKTtcbiAgICBjLnVwZGF0ZUFsbCgpO1xuICAgIHJldHVybiBjO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiB7IGdyb3VwOiBQYmxDb2x1bW5Hcm91cDsgYWN0aXZlQ29sdW1uczogU2V0PHN0cmluZz47IH0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldChnZXRJZChncm91cCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsID0gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLnZhbHVlcygpKS5tYXAoIGl0ZW0gPT4gaXRlbS5ncm91cCApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5Hcm91cCBleHRlbmRzIFBibE1ldGFDb2x1bW4gaW1wbGVtZW50cyBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24ge1xuXG4gIC8vI3JlZ2lvbiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb25cbiAgLyoqXG4gICAqIFRoZSB0YWJsZSdzIGNvbHVtbiB0aGF0IGlzIHRoZSBmaXJzdCBjaGlsZCBjb2x1bW4gZm9yIHRoaXMgZ3JvdXAuXG4gICAqL1xuICBwcm9wOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdG90YWwgc3BhbiBvZiB0aGUgZ3JvdXAgKGV4Y2x1ZGluZyB0aGUgZmlyc3QgY2hpbGQgLSBpLmUuIHByb3ApLlxuICAgKiBUaGUgc3BhbiBhbmQgcHJvcCBhcmUgdXNlZCB0byBnZXQgdGhlIGNoaWxkIGNvbHVtbnMgb2YgdGhpcyBncm91cC5cbiAgICogVGhlIHNwYW4gaXMgbm90IGR5bmFtaWMsIG9uY2UgdGhlIGNvbHVtbnMgYXJlIHNldCB0aGV5IGRvbid0IGNoYW5nZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGlmIGEgd2UgaGF2ZSBhIHNwYW4gb2YgMiBhbmQgdGhlIGNvbHVtbiBhdCB0aGUgMm5kIHBvc2l0aW9uIGlzIGhpZGRlbiBpdCB3aWxsIHN0aWxsIGNvdW50IGFzXG4gICAqIGJlaW5nIHNwYW5uZWQgYWx0aG91Z2ggdGhlIFVJIHdpbGwgc3BhbiBvbmx5IDEgY29sdW1uLi4uIChiZWNhdXNlIHRoZSAybmQgaXMgaGlkZGVuLi4uKVxuICAgKi9cbiAgc3BhbjogbnVtYmVyO1xuICAvLyNlbmRyZWdpb24gUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpc2libGUgc3RhdGUgb2YgdGhlIGNvbHVtbi5cbiAgICogVGhlIGNvbHVtbiBpcyB2aXNpYmxlIGlmIEFUIExFQVNUIE9ORSBjaGlsZCBjb2x1bW4gaXMgdmlzaWJsZSAoaS5lLiBub3QgaGlkZGVuKVxuICAgKi9cbiAgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zLnNvbWUoIGMgPT4gIWMuaGlkZGVuICk7XG4gIH1cbiAgICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWYgZm9yIHRoaXMgY29sdW1uLlxuICAgKi9cbiAgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW5Hcm91cD47XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0LCB0aGlzIGNvbHVtbiBpcyBhIGNsb25lZCBjb2x1bW4gb2YgYW4gZXhpc3RpbmcgY29sdW1uIGNhdXNlZCBieSBhIHNwbGl0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHNsYXZlT2Y/OiBQYmxDb2x1bW5Hcm91cDtcblxuICAvKiogQGludGVybmFsICovXG4gIHJlYWRvbmx5IGNvbHVtbnM6IFBibENvbHVtbltdO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogUGJsQ29sdW1uR3JvdXAgfCBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sIGNvbHVtbnM6IFBibENvbHVtbltdLCBwdWJsaWMgcmVhZG9ubHkgcGxhY2Vob2xkZXIgPSBmYWxzZSkge1xuICAgIHN1cGVyKGlzUGJsQ29sdW1uR3JvdXAoZGVmKVxuICAgICAgPyBkZWZcbiAgICAgIDogeyBpZDogYGdyb3VwLSR7ZGVmLnByb3B9LXNwYW4tJHtkZWYuc3Bhbn0tcm93LSR7ZGVmLnJvd0luZGV4fWAsIGtpbmQ6ICdoZWFkZXInIGFzICdoZWFkZXInLCAuLi4oZGVmIGFzIGFueSkgfVxuICAgICk7XG4gICAgdGhpc1tQQkxfTkdSSURfQ09MVU1OX0dST1VQX01BUktdID0gdHJ1ZTtcbiAgICB0aGlzLnByb3AgPSBkZWYucHJvcDtcbiAgICB0aGlzLnNwYW4gPSBkZWYuc3BhbjtcbiAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XG4gICAgICBjLm1hcmtJbkdyb3VwKHRoaXMpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBDTE9ORV9QUk9QRVJUSUVTKSB7XG4gICAgICBpZiAocHJvcCBpbiBkZWYpIHtcbiAgICAgICAgdGhpc1twcm9wIGFzIGFueV0gPSBkZWZbcHJvcF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZXh0ZW5kUHJvcGVydHkobmFtZToga2V5b2YgUGJsQ29sdW1uR3JvdXApOiB2b2lkIHtcbiAgICBpZiAoQ0xPTkVfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgQ0xPTkVfUFJPUEVSVElFUy5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVNsYXZlKGNvbHVtbnM6IFBibENvbHVtbltdID0gW10pOiBQYmxDb2x1bW5Hcm91cCB7XG4gICAgY29uc3Qgc2xhdmUgPSBuZXcgUGJsQ29sdW1uR3JvdXAodGhpcywgY29sdW1ucyk7XG4gICAgc2xhdmUuaWQgKz0gJy1zbGF2ZScgKyBEYXRlLm5vdygpO1xuICAgIHNsYXZlLnNsYXZlT2YgPSB0aGlzO1xuICAgIHNsYXZlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICByZXR1cm4gc2xhdmU7XG4gIH1cblxuICByZXBsYWNlKG5ld0NvbHVtbjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBpZCB9ID0gbmV3Q29sdW1uO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuY29sdW1ucy5maW5kSW5kZXgoIGMgPT4gYy5pZCA9PT0gaWQgKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRoaXMuY29sdW1ucy5zcGxpY2UoaWR4LCAxLCBuZXdDb2x1bW4pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19