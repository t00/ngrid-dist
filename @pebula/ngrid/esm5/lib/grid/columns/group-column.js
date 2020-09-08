/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/group-column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __extends, __values } from "tslib";
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
    return def instanceof PblColumnGroup || (def && def[PBL_NGRID_COLUMN_GROUP_MARK] === true);
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
    __extends(PblColumnGroup, _super);
    function PblColumnGroup(def, columns, placeholder) {
        var e_1, _a, e_2, _b;
        if (placeholder === void 0) { placeholder = false; }
        var _this = _super.call(this, isPblColumnGroup(def)
            ? def
            : __assign({ id: "group-" + def.prop + "-span-" + def.span + "-row-" + def.rowIndex, kind: (/** @type {?} */ ('header')) }, ((/** @type {?} */ (def))))) || this;
        _this.placeholder = placeholder;
        _this[PBL_NGRID_COLUMN_GROUP_MARK] = true;
        _this.prop = def.prop;
        _this.span = def.span;
        _this.columns = columns;
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
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
            for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
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
     * The grid's column that is the first child column for this group.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvZ3JvdXAtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBR3hDLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzs7SUFDdEQsZ0JBQWdCLEdBQWdDLEVBQUU7Ozs7O0FBRXhELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxHQUFRO0lBQ3ZDLE9BQU8sR0FBRyxZQUFZLGNBQWMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsMkJBQTJCLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUM3RixDQUFDOzs7OztBQUVELFNBQVMsS0FBSyxDQUFDLEtBQThCO0lBQzNDLE9BQU8sT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7QUFDdEQsQ0FBQztBQUVEO0lBQUE7UUFHVSxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWtFLENBQUM7UUFDbEYsU0FBSSxHQUFxQixFQUFFLENBQUM7SUFxRXRDLENBQUM7SUF4RUMsc0JBQUksb0NBQUc7Ozs7UUFBUCxjQUE4QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUtqRDs7T0FFRzs7Ozs7OztJQUNILG9DQUFNOzs7Ozs7SUFBTixVQUFPLEtBQThCLEVBQUUsTUFBMEI7O1lBQ3pELENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsRUFBRTtZQUNMLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFD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Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5cbmNvbnN0IFBCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSSyA9IFN5bWJvbCgnUGJsQ29sdW1uR3JvdXAnKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibENvbHVtbkdyb3VwPiA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYmxDb2x1bW5Hcm91cChkZWY6IGFueSk6IGRlZiBpcyBQYmxDb2x1bW5Hcm91cCB7XG4gIHJldHVybiBkZWYgaW5zdGFuY2VvZiBQYmxDb2x1bW5Hcm91cCB8fCAoZGVmICYmIGRlZltQQkxfTkdSSURfQ09MVU1OX0dST1VQX01BUktdID09PSB0cnVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0SWQodmFsdWU6IHN0cmluZyB8IHsgaWQ6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSA6IHZhbHVlLmlkO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uR3JvdXBTdG9yZSB7XG4gIGdldCBhbGwoKTogUGJsQ29sdW1uR3JvdXBbXSB7IHJldHVybiB0aGlzLl9hbGw7IH1cblxuICBwcml2YXRlIHN0b3JlID0gbmV3IE1hcDxzdHJpbmcsIHsgZ3JvdXA6IFBibENvbHVtbkdyb3VwOyBhY3RpdmVDb2x1bW5zOiBTZXQ8c3RyaW5nPjsgfT4oKTtcbiAgcHJpdmF0ZSBfYWxsOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGNvbHVtbiB0byBhIGdyb3VwLlxuICAgKi9cbiAgYXR0YWNoKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCwgY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIGcuYWN0aXZlQ29sdW1ucy5hZGQoZ2V0SWQoY29sdW1uKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGFjaCBhIGNvbHVtbiBmcm9tIGEgZ3JvdXAuXG4gICAqL1xuICBkZXRhY2goZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwLCBjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGcgPSB0aGlzLl9maW5kKGdyb3VwKTtcbiAgICBpZiAoZykge1xuICAgICAgcmV0dXJuIGcuYWN0aXZlQ29sdW1ucy5kZWxldGUoZ2V0SWQoY29sdW1uKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBgUGJsQ29sdW1uR3JvdXBgIHRoYXQgZG9lcyBub3QgaGF2ZSBjb2x1bW5zIGF0dGFjaGVkLlxuICAgKi9cbiAgZmluZEdob3N0cygpOiBQYmxDb2x1bW5Hcm91cFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLnZhbHVlcygpKVxuICAgICAgLmZpbHRlciggaXRlbSA9PiBpdGVtLmFjdGl2ZUNvbHVtbnMuc2l6ZSA9PT0gMCApXG4gICAgICAubWFwKCBpdGVtID0+IGl0ZW0uZ3JvdXAgKTtcbiAgfVxuXG4gIGFkZChncm91cDogUGJsQ29sdW1uR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLnNldChncm91cC5pZCwgeyBncm91cCwgYWN0aXZlQ29sdW1uczogbmV3IFNldDxzdHJpbmc+KCkgfSk7XG4gICAgdGhpcy51cGRhdGVBbGwoKTtcbiAgfVxuXG4gIHJlbW92ZShncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5maW5kKGdyb3VwKTtcbiAgICBpZiAoZyAmJiB0aGlzLnN0b3JlLmRlbGV0ZShnLmlkKSkge1xuICAgICAgdGhpcy51cGRhdGVBbGwoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmaW5kKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCk6IFBibENvbHVtbkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIHJldHVybiBnLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKCk6IFBibENvbHVtbkdyb3VwU3RvcmUge1xuICAgIGNvbnN0IGMgPSBuZXcgUGJsQ29sdW1uR3JvdXBTdG9yZSgpO1xuICAgIGMuc3RvcmUgPSBuZXcgTWFwPHN0cmluZywgeyBncm91cDogUGJsQ29sdW1uR3JvdXA7IGFjdGl2ZUNvbHVtbnM6IFNldDxzdHJpbmc+OyB9Pih0aGlzLnN0b3JlKTtcbiAgICBjLnVwZGF0ZUFsbCgpO1xuICAgIHJldHVybiBjO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiB7IGdyb3VwOiBQYmxDb2x1bW5Hcm91cDsgYWN0aXZlQ29sdW1uczogU2V0PHN0cmluZz47IH0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldChnZXRJZChncm91cCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsID0gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLnZhbHVlcygpKS5tYXAoIGl0ZW0gPT4gaXRlbS5ncm91cCApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5Hcm91cCBleHRlbmRzIFBibE1ldGFDb2x1bW4gaW1wbGVtZW50cyBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24ge1xuXG4gIC8vI3JlZ2lvbiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb25cbiAgLyoqXG4gICAqIFRoZSBncmlkJ3MgY29sdW1uIHRoYXQgaXMgdGhlIGZpcnN0IGNoaWxkIGNvbHVtbiBmb3IgdGhpcyBncm91cC5cbiAgICovXG4gIHByb3A6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBzcGFuIG9mIHRoZSBncm91cCAoZXhjbHVkaW5nIHRoZSBmaXJzdCBjaGlsZCAtIGkuZS4gcHJvcCkuXG4gICAqIFRoZSBzcGFuIGFuZCBwcm9wIGFyZSB1c2VkIHRvIGdldCB0aGUgY2hpbGQgY29sdW1ucyBvZiB0aGlzIGdyb3VwLlxuICAgKiBUaGUgc3BhbiBpcyBub3QgZHluYW1pYywgb25jZSB0aGUgY29sdW1ucyBhcmUgc2V0IHRoZXkgZG9uJ3QgY2hhbmdlLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgYSB3ZSBoYXZlIGEgc3BhbiBvZiAyIGFuZCB0aGUgY29sdW1uIGF0IHRoZSAybmQgcG9zaXRpb24gaXMgaGlkZGVuIGl0IHdpbGwgc3RpbGwgY291bnQgYXNcbiAgICogYmVpbmcgc3Bhbm5lZCBhbHRob3VnaCB0aGUgVUkgd2lsbCBzcGFuIG9ubHkgMSBjb2x1bW4uLi4gKGJlY2F1c2UgdGhlIDJuZCBpcyBoaWRkZW4uLi4pXG4gICAqL1xuICBzcGFuOiBudW1iZXI7XG4gIC8vI2VuZHJlZ2lvbiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb25cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlzaWJsZSBzdGF0ZSBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgY29sdW1uIGlzIHZpc2libGUgaWYgQVQgTEVBU1QgT05FIGNoaWxkIGNvbHVtbiBpcyB2aXNpYmxlIChpLmUuIG5vdCBoaWRkZW4pXG4gICAqL1xuICBnZXQgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMuc29tZSggYyA9PiAhYy5oaWRkZW4gKTtcbiAgfVxuICAgIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZiBmb3IgdGhpcyBjb2x1bW4uXG4gICAqL1xuICBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbkdyb3VwPjtcblxuICAvKipcbiAgICogV2hlbiBzZXQsIHRoaXMgY29sdW1uIGlzIGEgY2xvbmVkIGNvbHVtbiBvZiBhbiBleGlzdGluZyBjb2x1bW4gY2F1c2VkIGJ5IGEgc3BsaXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc2xhdmVPZj86IFBibENvbHVtbkdyb3VwO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcmVhZG9ubHkgY29sdW1uczogUGJsQ29sdW1uW107XG5cbiAgY29uc3RydWN0b3IoZGVmOiBQYmxDb2x1bW5Hcm91cCB8IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiwgY29sdW1uczogUGJsQ29sdW1uW10sIHB1YmxpYyByZWFkb25seSBwbGFjZWhvbGRlciA9IGZhbHNlKSB7XG4gICAgc3VwZXIoaXNQYmxDb2x1bW5Hcm91cChkZWYpXG4gICAgICA/IGRlZlxuICAgICAgOiB7IGlkOiBgZ3JvdXAtJHtkZWYucHJvcH0tc3Bhbi0ke2RlZi5zcGFufS1yb3ctJHtkZWYucm93SW5kZXh9YCwga2luZDogJ2hlYWRlcicgYXMgJ2hlYWRlcicsIC4uLihkZWYgYXMgYW55KSB9XG4gICAgKTtcbiAgICB0aGlzW1BCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSS10gPSB0cnVlO1xuICAgIHRoaXMucHJvcCA9IGRlZi5wcm9wO1xuICAgIHRoaXMuc3BhbiA9IGRlZi5zcGFuO1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbnMpIHtcbiAgICAgIGMubWFya0luR3JvdXAodGhpcyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIENMT05FX1BST1BFUlRJRVMpIHtcbiAgICAgIGlmIChwcm9wIGluIGRlZikge1xuICAgICAgICB0aGlzW3Byb3AgYXMgYW55XSA9IGRlZltwcm9wXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBleHRlbmRQcm9wZXJ0eShuYW1lOiBrZXlvZiBQYmxDb2x1bW5Hcm91cCk6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU2xhdmUoY29sdW1uczogUGJsQ29sdW1uW10gPSBbXSk6IFBibENvbHVtbkdyb3VwIHtcbiAgICBjb25zdCBzbGF2ZSA9IG5ldyBQYmxDb2x1bW5Hcm91cCh0aGlzLCBjb2x1bW5zKTtcbiAgICBzbGF2ZS5pZCArPSAnLXNsYXZlJyArIERhdGUubm93KCk7XG4gICAgc2xhdmUuc2xhdmVPZiA9IHRoaXM7XG4gICAgc2xhdmUudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICAgIHJldHVybiBzbGF2ZTtcbiAgfVxuXG4gIHJlcGxhY2UobmV3Q29sdW1uOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGlkIH0gPSBuZXdDb2x1bW47XG4gICAgY29uc3QgaWR4ID0gdGhpcy5jb2x1bW5zLmZpbmRJbmRleCggYyA9PiBjLmlkID09PSBpZCApO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5jb2x1bW5zLnNwbGljZShpZHgsIDEsIG5ld0NvbHVtbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=