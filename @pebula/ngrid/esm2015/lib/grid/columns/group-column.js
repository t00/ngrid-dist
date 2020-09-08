/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/group-column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PblMetaColumn } from './meta-column';
/** @type {?} */
const PBL_NGRID_COLUMN_GROUP_MARK = Symbol('PblColumnGroup');
/** @type {?} */
const CLONE_PROPERTIES = [];
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
export class PblColumnGroupStore {
    constructor() {
        this.store = new Map();
        this._all = [];
    }
    /**
     * @return {?}
     */
    get all() { return this._all; }
    /**
     * Attach a column to a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    attach(group, column) {
        /** @type {?} */
        const g = this._find(group);
        if (g) {
            g.activeColumns.add(getId(column));
            return true;
        }
        return false;
    }
    /**
     * Detach a column from a group.
     * @param {?} group
     * @param {?} column
     * @return {?}
     */
    detach(group, column) {
        /** @type {?} */
        const g = this._find(group);
        if (g) {
            return g.activeColumns.delete(getId(column));
        }
        return false;
    }
    /**
     * Returns a list of `PblColumnGroup` that does not have columns attached.
     * @return {?}
     */
    findGhosts() {
        return Array.from(this.store.values())
            .filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.activeColumns.size === 0))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.group));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    add(group) {
        this.store.set(group.id, { group, activeColumns: new Set() });
        this.updateAll();
    }
    /**
     * @param {?} group
     * @return {?}
     */
    remove(group) {
        /** @type {?} */
        const g = this.find(group);
        if (g && this.store.delete(g.id)) {
            this.updateAll();
            return true;
        }
        return false;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    find(group) {
        /** @type {?} */
        const g = this._find(group);
        if (g) {
            return g.group;
        }
    }
    /**
     * @return {?}
     */
    clone() {
        /** @type {?} */
        const c = new PblColumnGroupStore();
        c.store = new Map(this.store);
        c.updateAll();
        return c;
    }
    /**
     * @private
     * @param {?} group
     * @return {?}
     */
    _find(group) {
        return this.store.get(getId(group));
    }
    /**
     * @private
     * @return {?}
     */
    updateAll() {
        this._all = Array.from(this.store.values()).map((/**
         * @param {?} item
         * @return {?}
         */
        item => item.group));
    }
}
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
export class PblColumnGroup extends PblMetaColumn {
    /**
     * @param {?} def
     * @param {?} columns
     * @param {?=} placeholder
     */
    constructor(def, columns, placeholder = false) {
        super(isPblColumnGroup(def)
            ? def
            : Object.assign({ id: `group-${def.prop}-span-${def.span}-row-${def.rowIndex}`, kind: (/** @type {?} */ ('header')) }, ((/** @type {?} */ (def)))));
        this.placeholder = placeholder;
        this[PBL_NGRID_COLUMN_GROUP_MARK] = true;
        this.prop = def.prop;
        this.span = def.span;
        this.columns = columns;
        for (const c of columns) {
            c.markInGroup(this);
        }
        for (const prop of CLONE_PROPERTIES) {
            if (prop in def) {
                this[(/** @type {?} */ (prop))] = def[prop];
            }
        }
    }
    //#endregion PblColumnGroupDefinition
    /**
     * Returns the visible state of the column.
     * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
     * @return {?}
     */
    get isVisible() {
        return this.columns.some((/**
         * @param {?} c
         * @return {?}
         */
        c => !c.hidden));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    static extendProperty(name) {
        if (CLONE_PROPERTIES.indexOf(name) === -1) {
            CLONE_PROPERTIES.push(name);
        }
    }
    /**
     * @param {?=} columns
     * @return {?}
     */
    createSlave(columns = []) {
        /** @type {?} */
        const slave = new PblColumnGroup(this, columns);
        slave.id += '-slave' + Date.now();
        slave.slaveOf = this;
        slave.template = this.template;
        return slave;
    }
    /**
     * @param {?} newColumn
     * @return {?}
     */
    replace(newColumn) {
        const { id } = newColumn;
        /** @type {?} */
        const idx = this.columns.findIndex((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id === id));
        if (idx > -1) {
            this.columns.splice(idx, 1, newColumn);
            return true;
        }
        return false;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvZ3JvdXAtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7TUFHeEMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDOztNQUN0RCxnQkFBZ0IsR0FBZ0MsRUFBRTs7Ozs7QUFFeEQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQVE7SUFDdkMsT0FBTyxHQUFHLFlBQVksY0FBYyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzdGLENBQUM7Ozs7O0FBRUQsU0FBUyxLQUFLLENBQUMsS0FBOEI7SUFDM0MsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUN0RCxDQUFDO0FBRUQsTUFBTSxPQUFPLG1CQUFtQjtJQUFoQztRQUdVLFVBQUssR0FBRyxJQUFJLEdBQUcsRUFBa0UsQ0FBQztRQUNsRixTQUFJLEdBQXFCLEVBQUUsQ0FBQztJQXFFdEMsQ0FBQzs7OztJQXhFQyxJQUFJLEdBQUcsS0FBdUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7OztJQVFqRCxNQUFNLENBQUMsS0FBOEIsRUFBRSxNQUEwQjs7Y0FDekQsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxFQUFFO1lBQ0wsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lB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LENBQUM7UUFDckIsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQy9CLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsU0FBb0I7Y0FDcEIsRUFBRSxFQUFFLEVBQUUsR0FBRyxTQUFTOztjQUNsQixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUN0RCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGOzs7Ozs7SUE1RUMsOEJBQWE7Ozs7Ozs7Ozs7SUFTYiw4QkFBYTs7Ozs7SUFhYixtQ0FBNkM7Ozs7OztJQU03QyxpQ0FBeUI7Ozs7O0lBR3pCLGlDQUE4Qjs7SUFFb0QscUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYgfSBmcm9tICcuLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4vbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW4nO1xuXG5jb25zdCBQQkxfTkdSSURfQ09MVU1OX0dST1VQX01BUksgPSBTeW1ib2woJ1BibENvbHVtbkdyb3VwJyk7XG5jb25zdCBDTE9ORV9QUk9QRVJUSUVTOiBBcnJheTxrZXlvZiBQYmxDb2x1bW5Hcm91cD4gPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGJsQ29sdW1uR3JvdXAoZGVmOiBhbnkpOiBkZWYgaXMgUGJsQ29sdW1uR3JvdXAge1xuICByZXR1cm4gZGVmIGluc3RhbmNlb2YgUGJsQ29sdW1uR3JvdXAgfHwgKGRlZiAmJiBkZWZbUEJMX05HUklEX0NPTFVNTl9HUk9VUF9NQVJLXSA9PT0gdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGdldElkKHZhbHVlOiBzdHJpbmcgfCB7IGlkOiBzdHJpbmcgfSk6IHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiB2YWx1ZS5pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbkdyb3VwU3RvcmUge1xuICBnZXQgYWxsKCk6IFBibENvbHVtbkdyb3VwW10geyByZXR1cm4gdGhpcy5fYWxsOyB9XG5cbiAgcHJpdmF0ZSBzdG9yZSA9IG5ldyBNYXA8c3RyaW5nLCB7IGdyb3VwOiBQYmxDb2x1bW5Hcm91cDsgYWN0aXZlQ29sdW1uczogU2V0PHN0cmluZz47IH0+KCk7XG4gIHByaXZhdGUgX2FsbDogUGJsQ29sdW1uR3JvdXBbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBjb2x1bW4gdG8gYSBncm91cC5cbiAgICovXG4gIGF0dGFjaChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXAsIGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZyA9IHRoaXMuX2ZpbmQoZ3JvdXApO1xuICAgIGlmIChnKSB7XG4gICAgICBnLmFjdGl2ZUNvbHVtbnMuYWRkKGdldElkKGNvbHVtbikpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRhY2ggYSBjb2x1bW4gZnJvbSBhIGdyb3VwLlxuICAgKi9cbiAgZGV0YWNoKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCwgY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIHJldHVybiBnLmFjdGl2ZUNvbHVtbnMuZGVsZXRlKGdldElkKGNvbHVtbikpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgYFBibENvbHVtbkdyb3VwYCB0aGF0IGRvZXMgbm90IGhhdmUgY29sdW1ucyBhdHRhY2hlZC5cbiAgICovXG4gIGZpbmRHaG9zdHMoKTogUGJsQ29sdW1uR3JvdXBbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zdG9yZS52YWx1ZXMoKSlcbiAgICAgIC5maWx0ZXIoIGl0ZW0gPT4gaXRlbS5hY3RpdmVDb2x1bW5zLnNpemUgPT09IDAgKVxuICAgICAgLm1hcCggaXRlbSA9PiBpdGVtLmdyb3VwICk7XG4gIH1cblxuICBhZGQoZ3JvdXA6IFBibENvbHVtbkdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZXQoZ3JvdXAuaWQsIHsgZ3JvdXAsIGFjdGl2ZUNvbHVtbnM6IG5ldyBTZXQ8c3RyaW5nPigpIH0pO1xuICAgIHRoaXMudXBkYXRlQWxsKCk7XG4gIH1cblxuICByZW1vdmUoZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZyA9IHRoaXMuZmluZChncm91cCk7XG4gICAgaWYgKGcgJiYgdGhpcy5zdG9yZS5kZWxldGUoZy5pZCkpIHtcbiAgICAgIHRoaXMudXBkYXRlQWxsKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmluZChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiBQYmxDb2x1bW5Hcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZyA9IHRoaXMuX2ZpbmQoZ3JvdXApO1xuICAgIGlmIChnKSB7XG4gICAgICByZXR1cm4gZy5ncm91cDtcbiAgICB9XG4gIH1cblxuICBjbG9uZSgpOiBQYmxDb2x1bW5Hcm91cFN0b3JlIHtcbiAgICBjb25zdCBjID0gbmV3IFBibENvbHVtbkdyb3VwU3RvcmUoKTtcbiAgICBjLnN0b3JlID0gbmV3IE1hcDxzdHJpbmcsIHsgZ3JvdXA6IFBibENvbHVtbkdyb3VwOyBhY3RpdmVDb2x1bW5zOiBTZXQ8c3RyaW5nPjsgfT4odGhpcy5zdG9yZSk7XG4gICAgYy51cGRhdGVBbGwoKTtcbiAgICByZXR1cm4gYztcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmQoZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwKTogeyBncm91cDogUGJsQ29sdW1uR3JvdXA7IGFjdGl2ZUNvbHVtbnM6IFNldDxzdHJpbmc+OyB9IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXQoZ2V0SWQoZ3JvdXApKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX2FsbCA9IEFycmF5LmZyb20odGhpcy5zdG9yZS52YWx1ZXMoKSkubWFwKCBpdGVtID0+IGl0ZW0uZ3JvdXAgKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uR3JvdXAgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uIGltcGxlbWVudHMgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIHtcblxuICAvLyNyZWdpb24gUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCdzIGNvbHVtbiB0aGF0IGlzIHRoZSBmaXJzdCBjaGlsZCBjb2x1bW4gZm9yIHRoaXMgZ3JvdXAuXG4gICAqL1xuICBwcm9wOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdG90YWwgc3BhbiBvZiB0aGUgZ3JvdXAgKGV4Y2x1ZGluZyB0aGUgZmlyc3QgY2hpbGQgLSBpLmUuIHByb3ApLlxuICAgKiBUaGUgc3BhbiBhbmQgcHJvcCBhcmUgdXNlZCB0byBnZXQgdGhlIGNoaWxkIGNvbHVtbnMgb2YgdGhpcyBncm91cC5cbiAgICogVGhlIHNwYW4gaXMgbm90IGR5bmFtaWMsIG9uY2UgdGhlIGNvbHVtbnMgYXJlIHNldCB0aGV5IGRvbid0IGNoYW5nZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGlmIGEgd2UgaGF2ZSBhIHNwYW4gb2YgMiBhbmQgdGhlIGNvbHVtbiBhdCB0aGUgMm5kIHBvc2l0aW9uIGlzIGhpZGRlbiBpdCB3aWxsIHN0aWxsIGNvdW50IGFzXG4gICAqIGJlaW5nIHNwYW5uZWQgYWx0aG91Z2ggdGhlIFVJIHdpbGwgc3BhbiBvbmx5IDEgY29sdW1uLi4uIChiZWNhdXNlIHRoZSAybmQgaXMgaGlkZGVuLi4uKVxuICAgKi9cbiAgc3BhbjogbnVtYmVyO1xuICAvLyNlbmRyZWdpb24gUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZpc2libGUgc3RhdGUgb2YgdGhlIGNvbHVtbi5cbiAgICogVGhlIGNvbHVtbiBpcyB2aXNpYmxlIGlmIEFUIExFQVNUIE9ORSBjaGlsZCBjb2x1bW4gaXMgdmlzaWJsZSAoaS5lLiBub3QgaGlkZGVuKVxuICAgKi9cbiAgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb2x1bW5zLnNvbWUoIGMgPT4gIWMuaGlkZGVuICk7XG4gIH1cbiAgICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWYgZm9yIHRoaXMgY29sdW1uLlxuICAgKi9cbiAgY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW5Hcm91cD47XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0LCB0aGlzIGNvbHVtbiBpcyBhIGNsb25lZCBjb2x1bW4gb2YgYW4gZXhpc3RpbmcgY29sdW1uIGNhdXNlZCBieSBhIHNwbGl0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHNsYXZlT2Y/OiBQYmxDb2x1bW5Hcm91cDtcblxuICAvKiogQGludGVybmFsICovXG4gIHJlYWRvbmx5IGNvbHVtbnM6IFBibENvbHVtbltdO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogUGJsQ29sdW1uR3JvdXAgfCBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sIGNvbHVtbnM6IFBibENvbHVtbltdLCBwdWJsaWMgcmVhZG9ubHkgcGxhY2Vob2xkZXIgPSBmYWxzZSkge1xuICAgIHN1cGVyKGlzUGJsQ29sdW1uR3JvdXAoZGVmKVxuICAgICAgPyBkZWZcbiAgICAgIDogeyBpZDogYGdyb3VwLSR7ZGVmLnByb3B9LXNwYW4tJHtkZWYuc3Bhbn0tcm93LSR7ZGVmLnJvd0luZGV4fWAsIGtpbmQ6ICdoZWFkZXInIGFzICdoZWFkZXInLCAuLi4oZGVmIGFzIGFueSkgfVxuICAgICk7XG4gICAgdGhpc1tQQkxfTkdSSURfQ09MVU1OX0dST1VQX01BUktdID0gdHJ1ZTtcbiAgICB0aGlzLnByb3AgPSBkZWYucHJvcDtcbiAgICB0aGlzLnNwYW4gPSBkZWYuc3BhbjtcbiAgICB0aGlzLmNvbHVtbnMgPSBjb2x1bW5zO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XG4gICAgICBjLm1hcmtJbkdyb3VwKHRoaXMpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBDTE9ORV9QUk9QRVJUSUVTKSB7XG4gICAgICBpZiAocHJvcCBpbiBkZWYpIHtcbiAgICAgICAgdGhpc1twcm9wIGFzIGFueV0gPSBkZWZbcHJvcF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZXh0ZW5kUHJvcGVydHkobmFtZToga2V5b2YgUGJsQ29sdW1uR3JvdXApOiB2b2lkIHtcbiAgICBpZiAoQ0xPTkVfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgQ0xPTkVfUFJPUEVSVElFUy5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZVNsYXZlKGNvbHVtbnM6IFBibENvbHVtbltdID0gW10pOiBQYmxDb2x1bW5Hcm91cCB7XG4gICAgY29uc3Qgc2xhdmUgPSBuZXcgUGJsQ29sdW1uR3JvdXAodGhpcywgY29sdW1ucyk7XG4gICAgc2xhdmUuaWQgKz0gJy1zbGF2ZScgKyBEYXRlLm5vdygpO1xuICAgIHNsYXZlLnNsYXZlT2YgPSB0aGlzO1xuICAgIHNsYXZlLnRlbXBsYXRlID0gdGhpcy50ZW1wbGF0ZTtcbiAgICByZXR1cm4gc2xhdmU7XG4gIH1cblxuICByZXBsYWNlKG5ld0NvbHVtbjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBpZCB9ID0gbmV3Q29sdW1uO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuY29sdW1ucy5maW5kSW5kZXgoIGMgPT4gYy5pZCA9PT0gaWQgKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRoaXMuY29sdW1ucy5zcGxpY2UoaWR4LCAxLCBuZXdDb2x1bW4pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19