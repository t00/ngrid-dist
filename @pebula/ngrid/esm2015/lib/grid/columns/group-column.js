/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvZ3JvdXAtY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDOztNQUd4QywyQkFBMkIsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7O01BQ3RELGdCQUFnQixHQUFnQyxFQUFFOzs7OztBQUV4RCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsR0FBUTtJQUN2QyxPQUFPLEdBQUcsWUFBWSxjQUFjLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLDJCQUEyQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDN0YsQ0FBQzs7Ozs7QUFFRCxTQUFTLEtBQUssQ0FBQyxLQUE4QjtJQUMzQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ3RELENBQUM7QUFFRCxNQUFNLE9BQU8sbUJBQW1CO0lBQWhDO1FBR1UsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFrRSxDQUFDO1FBQ2xGLFNBQUksR0FBcUIsRUFBRSxDQUFDO0lBcUV0QyxDQUFDOzs7O0lBeEVDLElBQUksR0FBRyxLQUF1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBUWpELE1BQU0sQ0FBQyxLQUE4QixFQUFFLE1BQTBCOztjQUN6RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEVBQUU7WUFDTCxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFD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Q0FBQztRQUNyQixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxTQUFvQjtjQUNwQixFQUFFLEVBQUUsRUFBRSxHQUFHLFNBQVM7O2NBQ2xCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3RELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7Ozs7OztJQTVFQyw4QkFBYTs7Ozs7Ozs7OztJQVNiLDhCQUFhOzs7OztJQWFiLG1DQUE2Qzs7Ozs7O0lBTTdDLGlDQUF5Qjs7Ozs7SUFHekIsaUNBQThCOztJQUVvRCxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5cbmNvbnN0IFBCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSSyA9IFN5bWJvbCgnUGJsQ29sdW1uR3JvdXAnKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibENvbHVtbkdyb3VwPiA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYmxDb2x1bW5Hcm91cChkZWY6IGFueSk6IGRlZiBpcyBQYmxDb2x1bW5Hcm91cCB7XG4gIHJldHVybiBkZWYgaW5zdGFuY2VvZiBQYmxDb2x1bW5Hcm91cCB8fCAoZGVmICYmIGRlZltQQkxfTkdSSURfQ09MVU1OX0dST1VQX01BUktdID09PSB0cnVlKTtcbn1cblxuZnVuY3Rpb24gZ2V0SWQodmFsdWU6IHN0cmluZyB8IHsgaWQ6IHN0cmluZyB9KTogc3RyaW5nIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB2YWx1ZSA6IHZhbHVlLmlkO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uR3JvdXBTdG9yZSB7XG4gIGdldCBhbGwoKTogUGJsQ29sdW1uR3JvdXBbXSB7IHJldHVybiB0aGlzLl9hbGw7IH1cblxuICBwcml2YXRlIHN0b3JlID0gbmV3IE1hcDxzdHJpbmcsIHsgZ3JvdXA6IFBibENvbHVtbkdyb3VwOyBhY3RpdmVDb2x1bW5zOiBTZXQ8c3RyaW5nPjsgfT4oKTtcbiAgcHJpdmF0ZSBfYWxsOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgLyoqXG4gICAqIEF0dGFjaCBhIGNvbHVtbiB0byBhIGdyb3VwLlxuICAgKi9cbiAgYXR0YWNoKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCwgY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIGcuYWN0aXZlQ29sdW1ucy5hZGQoZ2V0SWQoY29sdW1uKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGFjaCBhIGNvbHVtbiBmcm9tIGEgZ3JvdXAuXG4gICAqL1xuICBkZXRhY2goZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwLCBjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGcgPSB0aGlzLl9maW5kKGdyb3VwKTtcbiAgICBpZiAoZykge1xuICAgICAgcmV0dXJuIGcuYWN0aXZlQ29sdW1ucy5kZWxldGUoZ2V0SWQoY29sdW1uKSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBgUGJsQ29sdW1uR3JvdXBgIHRoYXQgZG9lcyBub3QgaGF2ZSBjb2x1bW5zIGF0dGFjaGVkLlxuICAgKi9cbiAgZmluZEdob3N0cygpOiBQYmxDb2x1bW5Hcm91cFtdIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLnZhbHVlcygpKVxuICAgICAgLmZpbHRlciggaXRlbSA9PiBpdGVtLmFjdGl2ZUNvbHVtbnMuc2l6ZSA9PT0gMCApXG4gICAgICAubWFwKCBpdGVtID0+IGl0ZW0uZ3JvdXAgKTtcbiAgfVxuXG4gIGFkZChncm91cDogUGJsQ29sdW1uR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLnNldChncm91cC5pZCwgeyBncm91cCwgYWN0aXZlQ29sdW1uczogbmV3IFNldDxzdHJpbmc+KCkgfSk7XG4gICAgdGhpcy51cGRhdGVBbGwoKTtcbiAgfVxuXG4gIHJlbW92ZShncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5maW5kKGdyb3VwKTtcbiAgICBpZiAoZyAmJiB0aGlzLnN0b3JlLmRlbGV0ZShnLmlkKSkge1xuICAgICAgdGhpcy51cGRhdGVBbGwoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmaW5kKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCk6IFBibENvbHVtbkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIHJldHVybiBnLmdyb3VwO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKCk6IFBibENvbHVtbkdyb3VwU3RvcmUge1xuICAgIGNvbnN0IGMgPSBuZXcgUGJsQ29sdW1uR3JvdXBTdG9yZSgpO1xuICAgIGMuc3RvcmUgPSBuZXcgTWFwPHN0cmluZywgeyBncm91cDogUGJsQ29sdW1uR3JvdXA7IGFjdGl2ZUNvbHVtbnM6IFNldDxzdHJpbmc+OyB9Pih0aGlzLnN0b3JlKTtcbiAgICBjLnVwZGF0ZUFsbCgpO1xuICAgIHJldHVybiBjO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmluZChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiB7IGdyb3VwOiBQYmxDb2x1bW5Hcm91cDsgYWN0aXZlQ29sdW1uczogU2V0PHN0cmluZz47IH0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmdldChnZXRJZChncm91cCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsID0gQXJyYXkuZnJvbSh0aGlzLnN0b3JlLnZhbHVlcygpKS5tYXAoIGl0ZW0gPT4gaXRlbS5ncm91cCApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5Hcm91cCBleHRlbmRzIFBibE1ldGFDb2x1bW4gaW1wbGVtZW50cyBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24ge1xuXG4gIC8vI3JlZ2lvbiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb25cbiAgLyoqXG4gICAqIFRoZSBncmlkJ3MgY29sdW1uIHRoYXQgaXMgdGhlIGZpcnN0IGNoaWxkIGNvbHVtbiBmb3IgdGhpcyBncm91cC5cbiAgICovXG4gIHByb3A6IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBzcGFuIG9mIHRoZSBncm91cCAoZXhjbHVkaW5nIHRoZSBmaXJzdCBjaGlsZCAtIGkuZS4gcHJvcCkuXG4gICAqIFRoZSBzcGFuIGFuZCBwcm9wIGFyZSB1c2VkIHRvIGdldCB0aGUgY2hpbGQgY29sdW1ucyBvZiB0aGlzIGdyb3VwLlxuICAgKiBUaGUgc3BhbiBpcyBub3QgZHluYW1pYywgb25jZSB0aGUgY29sdW1ucyBhcmUgc2V0IHRoZXkgZG9uJ3QgY2hhbmdlLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgYSB3ZSBoYXZlIGEgc3BhbiBvZiAyIGFuZCB0aGUgY29sdW1uIGF0IHRoZSAybmQgcG9zaXRpb24gaXMgaGlkZGVuIGl0IHdpbGwgc3RpbGwgY291bnQgYXNcbiAgICogYmVpbmcgc3Bhbm5lZCBhbHRob3VnaCB0aGUgVUkgd2lsbCBzcGFuIG9ubHkgMSBjb2x1bW4uLi4gKGJlY2F1c2UgdGhlIDJuZCBpcyBoaWRkZW4uLi4pXG4gICAqL1xuICBzcGFuOiBudW1iZXI7XG4gIC8vI2VuZHJlZ2lvbiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb25cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdmlzaWJsZSBzdGF0ZSBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgY29sdW1uIGlzIHZpc2libGUgaWYgQVQgTEVBU1QgT05FIGNoaWxkIGNvbHVtbiBpcyB2aXNpYmxlIChpLmUuIG5vdCBoaWRkZW4pXG4gICAqL1xuICBnZXQgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMuc29tZSggYyA9PiAhYy5oaWRkZW4gKTtcbiAgfVxuICAgIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZiBmb3IgdGhpcyBjb2x1bW4uXG4gICAqL1xuICBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbkdyb3VwPjtcblxuICAvKipcbiAgICogV2hlbiBzZXQsIHRoaXMgY29sdW1uIGlzIGEgY2xvbmVkIGNvbHVtbiBvZiBhbiBleGlzdGluZyBjb2x1bW4gY2F1c2VkIGJ5IGEgc3BsaXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc2xhdmVPZj86IFBibENvbHVtbkdyb3VwO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcmVhZG9ubHkgY29sdW1uczogUGJsQ29sdW1uW107XG5cbiAgY29uc3RydWN0b3IoZGVmOiBQYmxDb2x1bW5Hcm91cCB8IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiwgY29sdW1uczogUGJsQ29sdW1uW10sIHB1YmxpYyByZWFkb25seSBwbGFjZWhvbGRlciA9IGZhbHNlKSB7XG4gICAgc3VwZXIoaXNQYmxDb2x1bW5Hcm91cChkZWYpXG4gICAgICA/IGRlZlxuICAgICAgOiB7IGlkOiBgZ3JvdXAtJHtkZWYucHJvcH0tc3Bhbi0ke2RlZi5zcGFufS1yb3ctJHtkZWYucm93SW5kZXh9YCwga2luZDogJ2hlYWRlcicgYXMgJ2hlYWRlcicsIC4uLihkZWYgYXMgYW55KSB9XG4gICAgKTtcbiAgICB0aGlzW1BCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSS10gPSB0cnVlO1xuICAgIHRoaXMucHJvcCA9IGRlZi5wcm9wO1xuICAgIHRoaXMuc3BhbiA9IGRlZi5zcGFuO1xuICAgIHRoaXMuY29sdW1ucyA9IGNvbHVtbnM7XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbnMpIHtcbiAgICAgIGMubWFya0luR3JvdXAodGhpcyk7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIENMT05FX1BST1BFUlRJRVMpIHtcbiAgICAgIGlmIChwcm9wIGluIGRlZikge1xuICAgICAgICB0aGlzW3Byb3AgYXMgYW55XSA9IGRlZltwcm9wXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBleHRlbmRQcm9wZXJ0eShuYW1lOiBrZXlvZiBQYmxDb2x1bW5Hcm91cCk6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU2xhdmUoY29sdW1uczogUGJsQ29sdW1uW10gPSBbXSk6IFBibENvbHVtbkdyb3VwIHtcbiAgICBjb25zdCBzbGF2ZSA9IG5ldyBQYmxDb2x1bW5Hcm91cCh0aGlzLCBjb2x1bW5zKTtcbiAgICBzbGF2ZS5pZCArPSAnLXNsYXZlJyArIERhdGUubm93KCk7XG4gICAgc2xhdmUuc2xhdmVPZiA9IHRoaXM7XG4gICAgc2xhdmUudGVtcGxhdGUgPSB0aGlzLnRlbXBsYXRlO1xuICAgIHJldHVybiBzbGF2ZTtcbiAgfVxuXG4gIHJlcGxhY2UobmV3Q29sdW1uOiBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGlkIH0gPSBuZXdDb2x1bW47XG4gICAgY29uc3QgaWR4ID0gdGhpcy5jb2x1bW5zLmZpbmRJbmRleCggYyA9PiBjLmlkID09PSBpZCApO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5jb2x1bW5zLnNwbGljZShpZHgsIDEsIG5ld0NvbHVtbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=