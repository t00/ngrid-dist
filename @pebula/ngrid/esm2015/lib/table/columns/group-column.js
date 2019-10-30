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
    return def instanceof PblColumnGroup || def[PBL_NGRID_COLUMN_GROUP_MARK] === true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAtY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb2x1bW5zL2dyb3VwLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7TUFHeEMsMkJBQTJCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDOztNQUN0RCxnQkFBZ0IsR0FBZ0MsRUFBRTs7Ozs7QUFFeEQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQTZCO0lBQzVELE9BQU8sR0FBRyxZQUFZLGNBQWMsSUFBSSxHQUFHLENBQUMsMkJBQTJCLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDcEYsQ0FBQzs7Ozs7QUFFRCxTQUFTLEtBQUssQ0FBQyxLQUE4QjtJQUMzQyxPQUFPLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO0FBQ3RELENBQUM7QUFFRCxNQUFNLE9BQU8sbUJBQW1CO0lBQWhDO1FBR1UsVUFBSyxHQUFHLElBQUksR0FBRyxFQUFrRSxDQUFDO1FBQ2xGLFNBQUksR0FBcUIsRUFBRSxDQUFDO0lBcUV0QyxDQUFDOzs7O0lBeEVDLElBQUksR0FBRyxLQUF1QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0lBUWpELE1BQU0sQ0FBQyxLQUE4QixFQUFFLE1BQTBCOztjQUN6RCxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLEVBQUU7WUFDTCxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBS0Qs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QUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxTQUFvQjtjQUNwQixFQUFFLEVBQUUsRUFBRSxHQUFHLFNBQVM7O2NBQ2xCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ3RELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7Ozs7OztJQTVFQyw4QkFBYTs7Ozs7Ozs7OztJQVNiLDhCQUFhOzs7OztJQWFiLG1DQUE2Qzs7Ozs7O0lBTTdDLGlDQUF5Qjs7Ozs7SUFHekIsaUNBQThCOztJQUVvRCxxQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24sIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4vbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW4nO1xuXG5jb25zdCBQQkxfTkdSSURfQ09MVU1OX0dST1VQX01BUksgPSBTeW1ib2woJ1BibENvbHVtbkdyb3VwJyk7XG5jb25zdCBDTE9ORV9QUk9QRVJUSUVTOiBBcnJheTxrZXlvZiBQYmxDb2x1bW5Hcm91cD4gPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGJsQ29sdW1uR3JvdXAoZGVmOiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24pOiBkZWYgaXMgUGJsQ29sdW1uR3JvdXAge1xuICByZXR1cm4gZGVmIGluc3RhbmNlb2YgUGJsQ29sdW1uR3JvdXAgfHwgZGVmW1BCTF9OR1JJRF9DT0xVTU5fR1JPVVBfTUFSS10gPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldElkKHZhbHVlOiBzdHJpbmcgfCB7IGlkOiBzdHJpbmcgfSk6IHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiB2YWx1ZS5pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbkdyb3VwU3RvcmUge1xuICBnZXQgYWxsKCk6IFBibENvbHVtbkdyb3VwW10geyByZXR1cm4gdGhpcy5fYWxsOyB9XG5cbiAgcHJpdmF0ZSBzdG9yZSA9IG5ldyBNYXA8c3RyaW5nLCB7IGdyb3VwOiBQYmxDb2x1bW5Hcm91cDsgYWN0aXZlQ29sdW1uczogU2V0PHN0cmluZz47IH0+KCk7XG4gIHByaXZhdGUgX2FsbDogUGJsQ29sdW1uR3JvdXBbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBBdHRhY2ggYSBjb2x1bW4gdG8gYSBncm91cC5cbiAgICovXG4gIGF0dGFjaChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXAsIGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZyA9IHRoaXMuX2ZpbmQoZ3JvdXApO1xuICAgIGlmIChnKSB7XG4gICAgICBnLmFjdGl2ZUNvbHVtbnMuYWRkKGdldElkKGNvbHVtbikpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRhY2ggYSBjb2x1bW4gZnJvbSBhIGdyb3VwLlxuICAgKi9cbiAgZGV0YWNoKGdyb3VwOiBzdHJpbmcgfCBQYmxDb2x1bW5Hcm91cCwgY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBib29sZWFuIHtcbiAgICBjb25zdCBnID0gdGhpcy5fZmluZChncm91cCk7XG4gICAgaWYgKGcpIHtcbiAgICAgIHJldHVybiBnLmFjdGl2ZUNvbHVtbnMuZGVsZXRlKGdldElkKGNvbHVtbikpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGxpc3Qgb2YgYFBibENvbHVtbkdyb3VwYCB0aGF0IGRvZXMgbm90IGhhdmUgY29sdW1ucyBhdHRhY2hlZC5cbiAgICovXG4gIGZpbmRHaG9zdHMoKTogUGJsQ29sdW1uR3JvdXBbXSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcy5zdG9yZS52YWx1ZXMoKSlcbiAgICAgIC5maWx0ZXIoIGl0ZW0gPT4gaXRlbS5hY3RpdmVDb2x1bW5zLnNpemUgPT09IDAgKVxuICAgICAgLm1hcCggaXRlbSA9PiBpdGVtLmdyb3VwICk7XG4gIH1cblxuICBhZGQoZ3JvdXA6IFBibENvbHVtbkdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZXQoZ3JvdXAuaWQsIHsgZ3JvdXAsIGFjdGl2ZUNvbHVtbnM6IG5ldyBTZXQ8c3RyaW5nPigpIH0pO1xuICAgIHRoaXMudXBkYXRlQWxsKCk7XG4gIH1cblxuICByZW1vdmUoZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZyA9IHRoaXMuZmluZChncm91cCk7XG4gICAgaWYgKGcgJiYgdGhpcy5zdG9yZS5kZWxldGUoZy5pZCkpIHtcbiAgICAgIHRoaXMudXBkYXRlQWxsKCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZmluZChncm91cDogc3RyaW5nIHwgUGJsQ29sdW1uR3JvdXApOiBQYmxDb2x1bW5Hcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZyA9IHRoaXMuX2ZpbmQoZ3JvdXApO1xuICAgIGlmIChnKSB7XG4gICAgICByZXR1cm4gZy5ncm91cDtcbiAgICB9XG4gIH1cblxuICBjbG9uZSgpOiBQYmxDb2x1bW5Hcm91cFN0b3JlIHtcbiAgICBjb25zdCBjID0gbmV3IFBibENvbHVtbkdyb3VwU3RvcmUoKTtcbiAgICBjLnN0b3JlID0gbmV3IE1hcDxzdHJpbmcsIHsgZ3JvdXA6IFBibENvbHVtbkdyb3VwOyBhY3RpdmVDb2x1bW5zOiBTZXQ8c3RyaW5nPjsgfT4odGhpcy5zdG9yZSk7XG4gICAgYy51cGRhdGVBbGwoKTtcbiAgICByZXR1cm4gYztcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmQoZ3JvdXA6IHN0cmluZyB8IFBibENvbHVtbkdyb3VwKTogeyBncm91cDogUGJsQ29sdW1uR3JvdXA7IGFjdGl2ZUNvbHVtbnM6IFNldDxzdHJpbmc+OyB9IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXQoZ2V0SWQoZ3JvdXApKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX2FsbCA9IEFycmF5LmZyb20odGhpcy5zdG9yZS52YWx1ZXMoKSkubWFwKCBpdGVtID0+IGl0ZW0uZ3JvdXAgKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uR3JvdXAgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uIGltcGxlbWVudHMgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uIHtcblxuICAvLyNyZWdpb24gUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uXG4gIC8qKlxuICAgKiBUaGUgdGFibGUncyBjb2x1bW4gdGhhdCBpcyB0aGUgZmlyc3QgY2hpbGQgY29sdW1uIGZvciB0aGlzIGdyb3VwLlxuICAgKi9cbiAgcHJvcDogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHRvdGFsIHNwYW4gb2YgdGhlIGdyb3VwIChleGNsdWRpbmcgdGhlIGZpcnN0IGNoaWxkIC0gaS5lLiBwcm9wKS5cbiAgICogVGhlIHNwYW4gYW5kIHByb3AgYXJlIHVzZWQgdG8gZ2V0IHRoZSBjaGlsZCBjb2x1bW5zIG9mIHRoaXMgZ3JvdXAuXG4gICAqIFRoZSBzcGFuIGlzIG5vdCBkeW5hbWljLCBvbmNlIHRoZSBjb2x1bW5zIGFyZSBzZXQgdGhleSBkb24ndCBjaGFuZ2UuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpZiBhIHdlIGhhdmUgYSBzcGFuIG9mIDIgYW5kIHRoZSBjb2x1bW4gYXQgdGhlIDJuZCBwb3NpdGlvbiBpcyBoaWRkZW4gaXQgd2lsbCBzdGlsbCBjb3VudCBhc1xuICAgKiBiZWluZyBzcGFubmVkIGFsdGhvdWdoIHRoZSBVSSB3aWxsIHNwYW4gb25seSAxIGNvbHVtbi4uLiAoYmVjYXVzZSB0aGUgMm5kIGlzIGhpZGRlbi4uLilcbiAgICovXG4gIHNwYW46IG51bWJlcjtcbiAgLy8jZW5kcmVnaW9uIFBibENvbHVtbkdyb3VwRGVmaW5pdGlvblxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2aXNpYmxlIHN0YXRlIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBjb2x1bW4gaXMgdmlzaWJsZSBpZiBBVCBMRUFTVCBPTkUgY2hpbGQgY29sdW1uIGlzIHZpc2libGUgKGkuZS4gbm90IGhpZGRlbilcbiAgICovXG4gIGdldCBpc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucy5zb21lKCBjID0+ICFjLmhpZGRlbiApO1xuICB9XG4gICAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uR3JvdXA+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCwgdGhpcyBjb2x1bW4gaXMgYSBjbG9uZWQgY29sdW1uIG9mIGFuIGV4aXN0aW5nIGNvbHVtbiBjYXVzZWQgYnkgYSBzcGxpdC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBzbGF2ZU9mPzogUGJsQ29sdW1uR3JvdXA7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICByZWFkb25seSBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcblxuICBjb25zdHJ1Y3RvcihkZWY6IFBibENvbHVtbkdyb3VwIHwgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCBjb2x1bW5zOiBQYmxDb2x1bW5bXSwgcHVibGljIHJlYWRvbmx5IHBsYWNlaG9sZGVyID0gZmFsc2UpIHtcbiAgICBzdXBlcihpc1BibENvbHVtbkdyb3VwKGRlZilcbiAgICAgID8gZGVmXG4gICAgICA6IHsgaWQ6IGBncm91cC0ke2RlZi5wcm9wfS1zcGFuLSR7ZGVmLnNwYW59LXJvdy0ke2RlZi5yb3dJbmRleH1gLCBraW5kOiAnaGVhZGVyJyBhcyAnaGVhZGVyJywgLi4uKGRlZiBhcyBhbnkpIH1cbiAgICApO1xuICAgIHRoaXNbUEJMX05HUklEX0NPTFVNTl9HUk9VUF9NQVJLXSA9IHRydWU7XG4gICAgdGhpcy5wcm9wID0gZGVmLnByb3A7XG4gICAgdGhpcy5zcGFuID0gZGVmLnNwYW47XG4gICAgdGhpcy5jb2x1bW5zID0gY29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1ucykge1xuICAgICAgYy5tYXJrSW5Hcm91cCh0aGlzKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGV4dGVuZFByb3BlcnR5KG5hbWU6IGtleW9mIFBibENvbHVtbkdyb3VwKTogdm9pZCB7XG4gICAgaWYgKENMT05FX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIENMT05FX1BST1BFUlRJRVMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVTbGF2ZShjb2x1bW5zOiBQYmxDb2x1bW5bXSA9IFtdKTogUGJsQ29sdW1uR3JvdXAge1xuICAgIGNvbnN0IHNsYXZlID0gbmV3IFBibENvbHVtbkdyb3VwKHRoaXMsIGNvbHVtbnMpO1xuICAgIHNsYXZlLmlkICs9ICctc2xhdmUnICsgRGF0ZS5ub3coKTtcbiAgICBzbGF2ZS5zbGF2ZU9mID0gdGhpcztcbiAgICBzbGF2ZS50ZW1wbGF0ZSA9IHRoaXMudGVtcGxhdGU7XG4gICAgcmV0dXJuIHNsYXZlO1xuICB9XG5cbiAgcmVwbGFjZShuZXdDb2x1bW46IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgaWQgfSA9IG5ld0NvbHVtbjtcbiAgICBjb25zdCBpZHggPSB0aGlzLmNvbHVtbnMuZmluZEluZGV4KCBjID0+IGMuaWQgPT09IGlkICk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSwgbmV3Q29sdW1uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==