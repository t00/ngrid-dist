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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvZ3JvdXAtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFHeEMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDOztJQUN0RCxnQkFBZ0IsR0FBZ0MsRUFBRTs7Ozs7QUFFeEQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQVE7SUFDdkMsT0FBTyxHQUFHLFlBQVksY0FBYyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzdGLENBQUM7Ozs7O0FBRUQsU0FBUyxLQUFLLENBQUMsS0FBOEI7SUFDM0MsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUN0RCxDQUFDO0FBRUQ7SUFBQTtRQUdVLFVBQUssR0FBRyxJQUFJLEdBQUcsRUFBa0UsQ0FBQztRQUNsRixTQUFJLEdBQXFCLEVBQUUsQ0FBQztJQXFFdEMsQ0FBQztJQXhFQyxzQkFBSSxvQ0FBRzs7OztRQUFQLGNBQThCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBS2pEOztPQUVHOzs7Ozs7O0lBQ0gsb0NBQU07Ozs7OztJQUFOLFVBQU8sS0FBOEIsRUFBRSxNQUEwQjs7WUFDekQsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNE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LHFDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW4gfSBmcm9tICcuL21ldGEtY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4vY29sdW1uJztcblxuY29uc3QgUEJMX05HUklEX0NPTFVNTl9HUk9VUF9NQVJLID0gU3ltYm9sKCdQYmxDb2x1bW5Hcm91cCcpO1xuY29uc3QgQ0xPTkVfUFJPUEVSVElFUzogQXJyYXk8a2V5b2YgUGJsQ29sdW1uR3JvdXA+ID0gW107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BibENvbHVtbkdyb3VwKGRlZjogYW55KTogZGVmIGlzIFBibENvbHVtbkdyb3VwIHtcbiAgcmV0dXJuIGRlZiBpbnN0YW5jZW9mIFBibENvbHVtbkdyb3VwIHx8IChkZWYgJiYgZGVmW1BCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSS10gPT09IHRydWUpO1xufVxuXG5mdW5jdGlvbiBnZXRJZCh2YWx1ZTogc3RyaW5nIHwgeyBpZDogc3RyaW5nIH0pOiBzdHJpbmcge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogdmFsdWUuaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5Hcm91cFN0b3JlIHtcbiAgZ2V0IGFsbCgpOiBQYmxDb2x1bW5Hcm91cFtdIHsgcmV0dXJuIHRoaXMuX2FsbDsgfVxuXG4gIHByaXZhdGUgc3RvcmUgPSBuZXcgTWFwPHN0cmluZywgeyBncm91cDogUGJsQ29sdW1uR3JvdXA7IGFjdGl2ZUNvbHVtbnM6IFNldDxzdHJpbmc+OyB9PigpO1xuICBwcml2YXRlIF9hbGw6IFBibENvbHVtbkdyb3VwW10gPSBbXTtcblxuICAvKipcbiAgICogQXR0YWNoIGEgY29sdW1uIHRvIGEgZ3JvdXAuXG4gICAqL1xuICBhdHRhY2goZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwLCBjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGcgPSB0aGlzLl9maW5kKGdyb3VwKTtcbiAgICBpZiAoZykge1xuICAgICAgZy5hY3RpdmVDb2x1bW5zLmFkZChnZXRJZChjb2x1bW4pKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogRGV0YWNoIGEgY29sdW1uIGZyb20gYSBncm91cC5cbiAgICovXG4gIGRldGFjaChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXAsIGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZyA9IHRoaXMuX2ZpbmQoZ3JvdXApO1xuICAgIGlmIChnKSB7XG4gICAgICByZXR1cm4gZy5hY3RpdmVDb2x1bW5zLmRlbGV0ZShnZXRJZChjb2x1bW4pKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBsaXN0IG9mIGBQYmxDb2x1bW5Hcm91cGAgdGhhdCBkb2VzIG5vdCBoYXZlIGNvbHVtbnMgYXR0YWNoZWQuXG4gICAqL1xuICBmaW5kR2hvc3RzKCk6IFBibENvbHVtbkdyb3VwW10ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc3RvcmUudmFsdWVzKCkpXG4gICAgICAuZmlsdGVyKCBpdGVtID0+IGl0ZW0uYWN0aXZlQ29sdW1ucy5zaXplID09PSAwIClcbiAgICAgIC5tYXAoIGl0ZW0gPT4gaXRlbS5ncm91cCApO1xuICB9XG5cbiAgYWRkKGdyb3VwOiBQYmxDb2x1bW5Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcmUuc2V0KGdyb3VwLmlkLCB7IGdyb3VwLCBhY3RpdmVDb2x1bW5zOiBuZXcgU2V0PHN0cmluZz4oKSB9KTtcbiAgICB0aGlzLnVwZGF0ZUFsbCgpO1xuICB9XG5cbiAgcmVtb3ZlKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGcgPSB0aGlzLmZpbmQoZ3JvdXApO1xuICAgIGlmIChnICYmIHRoaXMuc3RvcmUuZGVsZXRlKGcuaWQpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFsbCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZpbmQoZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwKTogUGJsQ29sdW1uR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGcgPSB0aGlzLl9maW5kKGdyb3VwKTtcbiAgICBpZiAoZykge1xuICAgICAgcmV0dXJuIGcuZ3JvdXA7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoKTogUGJsQ29sdW1uR3JvdXBTdG9yZSB7XG4gICAgY29uc3QgYyA9IG5ldyBQYmxDb2x1bW5Hcm91cFN0b3JlKCk7XG4gICAgYy5zdG9yZSA9IG5ldyBNYXA8c3RyaW5nLCB7IGdyb3VwOiBQYmxDb2x1bW5Hcm91cDsgYWN0aXZlQ29sdW1uczogU2V0PHN0cmluZz47IH0+KHRoaXMuc3RvcmUpO1xuICAgIGMudXBkYXRlQWxsKCk7XG4gICAgcmV0dXJuIGM7XG4gIH1cblxuICBwcml2YXRlIF9maW5kKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCk6IHsgZ3JvdXA6IFBibENvbHVtbkdyb3VwOyBhY3RpdmVDb2x1bW5zOiBTZXQ8c3RyaW5nPjsgfSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuZ2V0KGdldElkKGdyb3VwKSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUFsbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hbGwgPSBBcnJheS5mcm9tKHRoaXMuc3RvcmUudmFsdWVzKCkpLm1hcCggaXRlbSA9PiBpdGVtLmdyb3VwICk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbkdyb3VwIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiBpbXBsZW1lbnRzIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB7XG5cbiAgLy8jcmVnaW9uIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvblxuICAvKipcbiAgICogVGhlIGdyaWQncyBjb2x1bW4gdGhhdCBpcyB0aGUgZmlyc3QgY2hpbGQgY29sdW1uIGZvciB0aGlzIGdyb3VwLlxuICAgKi9cbiAgcHJvcDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHRvdGFsIHNwYW4gb2YgdGhlIGdyb3VwIChleGNsdWRpbmcgdGhlIGZpcnN0IGNoaWxkIC0gaS5lLiBwcm9wKS5cbiAgICogVGhlIHNwYW4gYW5kIHByb3AgYXJlIHVzZWQgdG8gZ2V0IHRoZSBjaGlsZCBjb2x1bW5zIG9mIHRoaXMgZ3JvdXAuXG4gICAqIFRoZSBzcGFuIGlzIG5vdCBkeW5hbWljLCBvbmNlIHRoZSBjb2x1bW5zIGFyZSBzZXQgdGhleSBkb24ndCBjaGFuZ2UuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpZiBhIHdlIGhhdmUgYSBzcGFuIG9mIDIgYW5kIHRoZSBjb2x1bW4gYXQgdGhlIDJuZCBwb3NpdGlvbiBpcyBoaWRkZW4gaXQgd2lsbCBzdGlsbCBjb3VudCBhc1xuICAgKiBiZWluZyBzcGFubmVkIGFsdGhvdWdoIHRoZSBVSSB3aWxsIHNwYW4gb25seSAxIGNvbHVtbi4uLiAoYmVjYXVzZSB0aGUgMm5kIGlzIGhpZGRlbi4uLilcbiAgICovXG4gIHNwYW46IG51bWJlcjtcbiAgLy8jZW5kcmVnaW9uIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aXNpYmxlIHN0YXRlIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBjb2x1bW4gaXMgdmlzaWJsZSBpZiBBVCBMRUFTVCBPTkUgY2hpbGQgY29sdW1uIGlzIHZpc2libGUgKGkuZS4gbm90IGhpZGRlbilcbiAgICovXG4gIGdldCBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucy5zb21lKCBjID0+ICFjLmhpZGRlbiApO1xuICB9XG4gICAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uR3JvdXA+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCwgdGhpcyBjb2x1bW4gaXMgYSBjbG9uZWQgY29sdW1uIG9mIGFuIGV4aXN0aW5nIGNvbHVtbiBjYXVzZWQgYnkgYSBzcGxpdC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBzbGF2ZU9mPzogUGJsQ29sdW1uR3JvdXA7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZWFkb25seSBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcblxuICBjb25zdHJ1Y3RvcihkZWY6IFBibENvbHVtbkdyb3VwIHwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCBjb2x1bW5zOiBQYmxDb2x1bW5bXSwgcHVibGljIHJlYWRvbmx5IHBsYWNlaG9sZGVyID0gZmFsc2UpIHtcbiAgICBzdXBlcihpc1BibENvbHVtbkdyb3VwKGRlZilcbiAgICAgID8gZGVmXG4gICAgICA6IHsgaWQ6IGBncm91cC0ke2RlZi5wcm9wfS1zcGFuLSR7ZGVmLnNwYW59LXJvdy0ke2RlZi5yb3dJbmRleH1gLCBraW5kOiAnaGVhZGVyJyBhcyAnaGVhZGVyJywgLi4uKGRlZiBhcyBhbnkpIH1cbiAgICApO1xuICAgIHRoaXNbUEJMX05HUklEX0NPTFVNTl9HUk9VUF9NQVJLXSA9IHRydWU7XG4gICAgdGhpcy5wcm9wID0gZGVmLnByb3A7XG4gICAgdGhpcy5zcGFuID0gZGVmLnNwYW47XG4gICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1ucykge1xuICAgICAgYy5tYXJrSW5Hcm91cCh0aGlzKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGV4dGVuZFByb3BlcnR5KG5hbWU6IGtleW9mIFBibENvbHVtbkdyb3VwKTogdm9pZCB7XG4gICAgaWYgKENMT05FX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIENMT05FX1BST1BFUlRJRVMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVTbGF2ZShjb2x1bW5zOiBQYmxDb2x1bW5bXSA9IFtdKTogUGJsQ29sdW1uR3JvdXAge1xuICAgIGNvbnN0IHNsYXZlID0gbmV3IFBibENvbHVtbkdyb3VwKHRoaXMsIGNvbHVtbnMpO1xuICAgIHNsYXZlLmlkICs9ICctc2xhdmUnICsgRGF0ZS5ub3coKTtcbiAgICBzbGF2ZS5zbGF2ZU9mID0gdGhpcztcbiAgICBzbGF2ZS50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gICAgcmV0dXJuIHNsYXZlO1xuICB9XG5cbiAgcmVwbGFjZShuZXdDb2x1bW46IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgaWQgfSA9IG5ld0NvbHVtbjtcbiAgICBjb25zdCBpZHggPSB0aGlzLmNvbHVtbnMuZmluZEluZGV4KCBjID0+IGMuaWQgPT09IGlkICk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSwgbmV3Q29sdW1uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==