/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { deepPathGet, deepPathSet } from '../utils';
import { initDefinitions, parseStyleWidth } from './utils';
import { PblColumnGroupStore } from './group-column';
/** @type {?} */
const PBL_NGRID_COLUMN_MARK = Symbol('PblColumn');
/** @type {?} */
const CLONE_PROPERTIES = ['pIndex', 'transform', 'filter', 'sort', 'alias', 'headerType', 'footerType', 'pin'];
/**
 * @param {?} def
 * @return {?}
 */
export function isPblColumn(def) {
    return def instanceof PblColumn || (def && def[PBL_NGRID_COLUMN_MARK] === true);
}
export class PblColumn {
    /**
     * @param {?} def
     * @param {?=} groupStore
     */
    constructor(def, groupStore) {
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         */
        this.data = {};
        this.defaultWidth = '';
        /**
         * Groups that this column belongs to.
         * WARNING: DO NOT ADD/REMOVE GROUPS DIRECTLY, USE markInGroup/markNotInGroup.
         */
        this._groups = new Set();
        this[PBL_NGRID_COLUMN_MARK] = true;
        if (isPblColumn(def)) {
            initDefinitions(def, this);
            this.prop = def.prop;
            this.path = def.path;
            this.orgProp = def.orgProp;
            this.groupStore = groupStore || def.groupStore;
            this._groups = new Set(def._groups);
            for (const id of Array.from(def._groups.values())) {
                /** @type {?} */
                const g = this.groupStore.find(id);
                if (g) {
                    this.markInGroup(g);
                    g.replace(this);
                }
            }
        }
        else {
            /** @type {?} */
            const path = def.path || def.prop.split('.');
            /** @type {?} */
            const prop = def.path ? def.prop : path.pop();
            def = Object.create(def);
            def.id = def.id || def.prop || def.label;
            def.label = 'label' in def ? def.label : prop;
            if (typeof def.type === 'string') {
                def.type = (/** @type {?} */ ({ name: def.type }));
            }
            if (typeof def.headerType === 'string') {
                def.headerType = (/** @type {?} */ ({ name: def.headerType }));
            }
            if (typeof def.footerType === 'string') {
                def.footerType = (/** @type {?} */ ({ name: def.footerType }));
            }
            initDefinitions(def, this);
            this.groupStore = groupStore || new PblColumnGroupStore();
            this.prop = prop;
            this.orgProp = def.prop;
            if (path.length) {
                this.path = path;
            }
        }
        for (const prop of CLONE_PROPERTIES) {
            if (prop in def) {
                this[(/** @type {?} */ (prop))] = def[prop];
            }
        }
    }
    /**
     * The width in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     * @return {?}
     */
    get width() { return this._width; }
    /**
     * @param {?} value
     * @return {?}
     */
    set width(value) {
        if (value !== this._width) {
            this._parsedWidth = parseStyleWidth(this._width = value);
            /** @type {?} */
            const isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
            Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
        }
    }
    /**
     * @return {?}
     */
    get parsedWidth() { return this._parsedWidth; }
    // TODO(1.0.0): remove
    /**
     * @deprecated BREAKING CHANGE 1.0.0 - Use `alias` instead.
     * @return {?}
     */
    get sortAlias() { return this.alias; }
    /**
     * @param {?} value
     * @return {?}
     */
    set sortAlias(value) { this.alias = value; }
    /**
     * The column def for this column.
     * @return {?}
     */
    get columnDef() { return this._columnDef; }
    /**
     * @return {?}
     */
    get groups() { return Array.from(this._groups.values()); }
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
     * @param {?} columnDef
     * @return {?}
     */
    attach(columnDef) {
        this.detach();
        this._columnDef = columnDef;
        if (this.defaultWidth) {
            this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
        }
    }
    /**
     * @return {?}
     */
    detach() {
        this._columnDef = undefined;
    }
    /**
     * @param {?} defaultWidth
     * @return {?}
     */
    setDefaultWidth(defaultWidth) {
        this.defaultWidth = defaultWidth;
    }
    /**
     * @param {?=} width
     * @return {?}
     */
    updateWidth(width) {
        if (width) {
            this.width = width;
        }
        const { columnDef } = this;
        if (columnDef) {
            columnDef.updateWidth(this.width || this.defaultWidth || '', 'update');
        }
    }
    /**
     * Get the value this column points to in the provided row
     * @template T
     * @param {?} row
     * @return {?}
     */
    getValue(row) {
        if (this.transform) {
            return this.transform(deepPathGet(row, this), row, this);
        }
        return deepPathGet(row, this);
    }
    /**
     * Set a value in the provided row where this column points to
     * @param {?} row
     * @param {?} value
     * @return {?}
     */
    setValue(row, value) {
        return deepPathSet(row, this, value);
    }
    /**
     * Mark's that this column belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    markInGroup(g) {
        this.groupStore.attach(g, this);
        this._groups.add(g.id);
    }
    /**
     * Mark's that this column does not belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    markNotInGroup(g) {
        this.groupStore.detach(g, this);
        return this._groups.delete(g.id);
    }
    /**
     * @param {?} g
     * @return {?}
     */
    isInGroup(g) {
        return this._groups.has(g.id);
    }
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    getGroupOfRow(rowIndex) {
        /** @type {?} */
        const groupIds = this.groups;
        for (const id of groupIds) {
            /** @type {?} */
            const g = this.groupStore.find(id);
            if (g && g.rowIndex === rowIndex) {
                return g;
            }
        }
    }
    /**
     * @param {?} columnGroups
     * @param {?} groupExists
     * @return {?}
     */
    groupLogic(columnGroups, groupExists) {
        const [gPrev, gCurr, gNext] = columnGroups;
        // STATE: This column has same group of previous column, nothing to do.
        if (gCurr === gPrev) {
            return gCurr;
        }
        // STATE: The group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
        if (groupExists) {
            // If the previous sibling group is a slave and this group is the origin of the slave, convert this group to the slave.
            if (gPrev && gCurr === gPrev.slaveOf) {
                return gPrev;
            }
            if (gNext && gCurr === gNext.slaveOf) {
                return gNext;
            }
            // Otherwise create the slave.
            /** @type {?} */
            const g = gCurr.createSlave([this]);
            this.groupStore.add(g);
            // If the current group is a placeholder and either the previous OR next sibling group is a placeholder as well
            // we want to group them together, although they are not related, because they both have identical headers (empty header).
            // Note that we still create the salve, we just don't use it.
            if (gCurr.placeholder) {
                /** @type {?} */
                const prevPH = gPrev && gPrev.placeholder;
                /** @type {?} */
                const nextPH = gNext && gNext.slaveOf && gNext.placeholder;
                /** @type {?} */
                const groupWithPlaceholder = prevPH ? gPrev : nextPH ? gNext : undefined;
                // const groupWithPlaceholder = prevPH && gPrev;
                if (groupWithPlaceholder) {
                    return groupWithPlaceholder;
                }
            }
            return g;
        }
        // STATE: The group IS a slave and it is set AFTER an item that belongs to the group it is slave of.
        else if (gCurr.slaveOf && gPrev) {
            if (gCurr.slaveOf === gPrev) {
                return gCurr.slaveOf;
            }
            if (gCurr.slaveOf === gPrev.slaveOf) {
                return gPrev;
            }
        }
        // STATE: The group IS a slave and it is set BEFORE an item that belongs to the group it is slave of.
        else if (gCurr.slaveOf && gNext) {
            if (gCurr.slaveOf === gNext) {
                return gCurr.slaveOf;
            }
        }
        return gCurr;
    }
    /**
     * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
     * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
     * and return true.
     * Otherwise return false.
     * \@internal
     * @param {?} actualWidth
     * @return {?}
     */
    checkMaxWidthLock(actualWidth) {
        if (actualWidth === this.maxWidth) {
            if (!this.maxWidthLock) {
                this.maxWidthLock = true;
                return true;
            }
        }
        else if (this.maxWidthLock) {
            this.maxWidthLock = false;
            return true;
        }
        return false;
    }
}
if (false) {
    /** @type {?} */
    PblColumn.prototype.id;
    /**
     * When set, defines this column as the primary index of the data-set with all values in this column being unique.
     * @type {?}
     */
    PblColumn.prototype.pIndex;
    /** @type {?} */
    PblColumn.prototype.label;
    /**
     * CSS class that get applied on the header and cell.
     * You can apply unique header/cell styles using the element name.
     * @type {?}
     */
    PblColumn.prototype.css;
    /**
     * This minimum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblColumn.prototype.minWidth;
    /**
     * This maximum width in pixels
     * This is an absolute value, thus a number.
     * @type {?}
     */
    PblColumn.prototype.maxWidth;
    /**
     * A place to store things...
     * This must be an object, values are shadow-copied so persist data between multiple plugins.
     * @type {?}
     */
    PblColumn.prototype.data;
    /**
     * The property to display (from the row element)
     * You can use dot notation to display deep paths.
     * @type {?}
     */
    PblColumn.prototype.prop;
    /**
     * A path to a nested object, relative to the row element.
     * The table will display `prop` from the object referenced by `path`.
     *
     * You can also use dot notation directly from `prop`.
     *
     * Example:
     * prop: "street"
     * path: [ "myInstance", "user", "address"
     *
     * is identical to:
     * prop: "myInstance.user.address.street"
     *
     * @type {?}
     */
    PblColumn.prototype.path;
    /**
     * The type of the values in this column.
     * This is an additional level for matching columns to templates, grouping templates for a type.
     * @type {?}
     */
    PblColumn.prototype.type;
    /** @type {?} */
    PblColumn.prototype.headerType;
    /** @type {?} */
    PblColumn.prototype.footerType;
    /** @type {?} */
    PblColumn.prototype.sort;
    /**
     * A custom predicate function to filter rows using the current column.
     *
     * Valid only when filtering by value.
     * See `PblDataSource.setFilter` for more information.
     * @type {?}
     */
    PblColumn.prototype.filter;
    /**
     * Marks the table as editable. An editable column also requires an edit template to qualify as editable, this flag alone is not enough.
     *
     * Note that this flag only effect the CSS class added to the cell.
     * @type {?}
     */
    PblColumn.prototype.editable;
    /** @type {?} */
    PblColumn.prototype.pin;
    /**
     * An alias used to identify the column.
     * Useful when the server provides sort/filter metadata that does not have a 1:1 match with the column names.
     * e.g. Deep path props, property name convention mismatch, etc...
     * @type {?}
     */
    PblColumn.prototype.alias;
    /**
     * Optional transformer that control the value output from the combination of a column and a row.
     * The value returned from this transformer will be returned from `PblColumn.getValue`
     * @type {?}
     */
    PblColumn.prototype.transform;
    /**
     * The original value of `prop`.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.orgProp;
    /**
     * Used by pbl-ngrid to apply custom cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.cellTpl;
    /**
     * Used by pbl-ngrid to apply custom cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.editorTpl;
    /**
     * Used by pbl-ngrid to apply a custom header cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.headerCellTpl;
    /**
     * Used by pbl-ngrid to apply a custom footer cell template, or the default when not set.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.footerCellTpl;
    /**
     * Used by the library as a logical flag representing the column hidden state.
     * This flag does not effect the UI, changing it will not change he hidden state in the UI.
     * Do not set this value manually.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.hidden;
    /**
     * When true indicates that the width is set with type pixels.
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.isFixedWidth;
    /**
     * An on-demand size info object, populated by `PblColumnSizeObserver`
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.sizeInfo;
    /**
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.maxWidthLock;
    /**
     * \@internal
     * @type {?}
     */
    PblColumn.prototype.groupStore;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype._width;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype._parsedWidth;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype._columnDef;
    /**
     * @type {?}
     * @private
     */
    PblColumn.prototype.defaultWidth;
    /**
     * Groups that this column belongs to.
     * WARNING: DO NOT ADD/REMOVE GROUPS DIRECTLY, USE markInGroup/markNotInGroup.
     * @type {?}
     * @private
     */
    PblColumn.prototype._groups;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0QsT0FBTyxFQUFrQixtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztNQUUvRCxxQkFBcUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDOztNQUMzQyxnQkFBZ0IsR0FBMkIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDOzs7OztBQUV0SSxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQVE7SUFDbEMsT0FBTyxHQUFHLFlBQVksU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFFRCxNQUFNLE9BQU8sU0FBUzs7Ozs7SUEwTHBCLFlBQVksR0FBb0MsRUFBRSxVQUFnQzs7Ozs7UUEvSWxGLFNBQUksR0FBUSxFQUFFLENBQUM7UUF1SVAsaUJBQVksR0FBRyxFQUFFLENBQUM7Ozs7O1FBTWxCLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBR2xDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVuQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQixlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxH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IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZSwgUGJsTmdyaWRTb3J0ZXIgfSBmcm9tICcuLi8uLi9kYXRhLXNvdXJjZS90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgZGVlcFBhdGhHZXQsIGRlZXBQYXRoU2V0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uVHlwZURlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGluaXREZWZpbml0aW9ucywgcGFyc2VTdHlsZVdpZHRoIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBTdG9yZSB9IGZyb20gJy4vZ3JvdXAtY29sdW1uJztcblxuY29uc3QgUEJMX05HUklEX0NPTFVNTl9NQVJLID0gU3ltYm9sKCdQYmxDb2x1bW4nKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibENvbHVtbj4gPSBbJ3BJbmRleCcsICd0cmFuc2Zvcm0nLCAnZmlsdGVyJywgJ3NvcnQnLCAnYWxpYXMnLCAnaGVhZGVyVHlwZScsICdmb290ZXJUeXBlJywgJ3BpbiddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYmxDb2x1bW4oZGVmOiBhbnkpOiBkZWYgaXMgUGJsQ29sdW1uIHtcbiAgcmV0dXJuIGRlZiBpbnN0YW5jZW9mIFBibENvbHVtbiB8fCAoZGVmICYmIGRlZltQQkxfTkdSSURfQ09MVU1OX01BUktdID09PSB0cnVlKTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbiBpbXBsZW1lbnRzIFBibENvbHVtbkRlZmluaXRpb24ge1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCwgZGVmaW5lcyB0aGlzIGNvbHVtbiBhcyB0aGUgcHJpbWFyeSBpbmRleCBvZiB0aGUgZGF0YS1zZXQgd2l0aCBhbGwgdmFsdWVzIGluIHRoaXMgY29sdW1uIGJlaW5nIHVuaXF1ZS5cbiAgICovXG4gIHBJbmRleD86IGJvb2xlYW47XG5cbiAgbGFiZWw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyB0aGF0IGdldCBhcHBsaWVkIG9uIHRoZSBoZWFkZXIgYW5kIGNlbGwuXG4gICAqIFlvdSBjYW4gYXBwbHkgdW5pcXVlIGhlYWRlci9jZWxsIHN0eWxlcyB1c2luZyB0aGUgZWxlbWVudCBuYW1lLlxuICAgKi9cbiAgY3NzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICovXG4gIGdldCB3aWR0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH1cbiAgc2V0IHdpZHRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICB0aGlzLl9wYXJzZWRXaWR0aCA9IHBhcnNlU3R5bGVXaWR0aCh0aGlzLl93aWR0aCA9IHZhbHVlKTtcbiAgICAgIGNvbnN0IGlzRml4ZWRXaWR0aCA9IHRoaXMuX3BhcnNlZFdpZHRoICYmIHRoaXMuX3BhcnNlZFdpZHRoLnR5cGUgPT09ICdweCc7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzRml4ZWRXaWR0aCcsIHsgdmFsdWU6IGlzRml4ZWRXaWR0aCwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGhpcyBtaW5pbXVtIHdpZHRoIGluIHBpeGVsc1xuICAgKiBUaGlzIGlzIGFuIGFic29sdXRlIHZhbHVlLCB0aHVzIGEgbnVtYmVyLlxuICAgKi9cbiAgbWluV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGlzIG1heGltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQSBwbGFjZSB0byBzdG9yZSB0aGluZ3MuLi5cbiAgICogVGhpcyBtdXN0IGJlIGFuIG9iamVjdCwgdmFsdWVzIGFyZSBzaGFkb3ctY29waWVkIHNvIHBlcnNpc3QgZGF0YSBiZXR3ZWVuIG11bHRpcGxlIHBsdWdpbnMuXG4gICAqL1xuICBkYXRhOiBhbnkgPSB7fTtcblxuICBnZXQgcGFyc2VkV2lkdGgoKTogeyB2YWx1ZTogbnVtYmVyOyB0eXBlOiAncHgnIHwgJyUnIH0gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcGFyc2VkV2lkdGg7IH1cblxuICAvKipcbiAgICogVGhlIHByb3BlcnR5IHRvIGRpc3BsYXkgKGZyb20gdGhlIHJvdyBlbGVtZW50KVxuICAgKiBZb3UgY2FuIHVzZSBkb3Qgbm90YXRpb24gdG8gZGlzcGxheSBkZWVwIHBhdGhzLlxuICAgKi9cbiAgcHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHBhdGggdG8gYSBuZXN0ZWQgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgcm93IGVsZW1lbnQuXG4gICAqIFRoZSB0YWJsZSB3aWxsIGRpc3BsYXkgYHByb3BgIGZyb20gdGhlIG9iamVjdCByZWZlcmVuY2VkIGJ5IGBwYXRoYC5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHVzZSBkb3Qgbm90YXRpb24gZGlyZWN0bHkgZnJvbSBgcHJvcGAuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIHByb3A6IFwic3RyZWV0XCJcbiAgICogcGF0aDogWyBcIm15SW5zdGFuY2VcIiwgXCJ1c2VyXCIsIFwiYWRkcmVzc1wiXG4gICAqXG4gICAqIGlzIGlkZW50aWNhbCB0bzpcbiAgICogcHJvcDogXCJteUluc3RhbmNlLnVzZXIuYWRkcmVzcy5zdHJlZXRcIlxuICAgKlxuICAgKi9cbiAgcGF0aD86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIGluIHRoaXMgY29sdW1uLlxuICAgKiBUaGlzIGlzIGFuIGFkZGl0aW9uYWwgbGV2ZWwgZm9yIG1hdGNoaW5nIGNvbHVtbnMgdG8gdGVtcGxhdGVzLCBncm91cGluZyB0ZW1wbGF0ZXMgZm9yIGEgdHlwZS5cbiAgICovXG4gIHR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcbiAgaGVhZGVyVHlwZT86IFBibENvbHVtblR5cGVEZWZpbml0aW9uO1xuICBmb290ZXJUeXBlPzogUGJsQ29sdW1uVHlwZURlZmluaXRpb247XG5cbiAgc29ydD86IGJvb2xlYW4gfCBQYmxOZ3JpZFNvcnRlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZpbHRlciByb3dzIHVzaW5nIHRoZSBjdXJyZW50IGNvbHVtbi5cbiAgICpcbiAgICogVmFsaWQgb25seSB3aGVuIGZpbHRlcmluZyBieSB2YWx1ZS5cbiAgICogU2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqL1xuICBmaWx0ZXI/OiBEYXRhU291cmNlQ29sdW1uUHJlZGljYXRlO1xuXG4gIC8qKlxuICAgKiBNYXJrcyB0aGUgdGFibGUgYXMgZWRpdGFibGUuIEFuIGVkaXRhYmxlIGNvbHVtbiBhbHNvIHJlcXVpcmVzIGFuIGVkaXQgdGVtcGxhdGUgdG8gcXVhbGlmeSBhcyBlZGl0YWJsZSwgdGhpcyBmbGFnIGFsb25lIGlzIG5vdCBlbm91Z2guXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIGZsYWcgb25seSBlZmZlY3QgdGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbC5cbiAgICovXG4gIGVkaXRhYmxlOiBib29sZWFuO1xuXG4gIHBpbjogJ3N0YXJ0JyB8ICdlbmQnIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFRPRE8oMS4wLjApOiByZW1vdmVcbiAgLyoqIEBkZXByZWNhdGVkIEJSRUFLSU5HIENIQU5HRSAxLjAuMCAtIFVzZSBgYWxpYXNgIGluc3RlYWQuICovXG4gIGdldCBzb3J0QWxpYXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuYWxpYXM7IH1cbiAgc2V0IHNvcnRBbGlhcyh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuYWxpYXMgPSB2YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBjb2x1bW4uXG4gICAqIFVzZWZ1bCB3aGVuIHRoZSBzZXJ2ZXIgcHJvdmlkZXMgc29ydC9maWx0ZXIgbWV0YWRhdGEgdGhhdCBkb2VzIG5vdCBoYXZlIGEgMToxIG1hdGNoIHdpdGggdGhlIGNvbHVtbiBuYW1lcy5cbiAgICogZS5nLiBEZWVwIHBhdGggcHJvcHMsIHByb3BlcnR5IG5hbWUgY29udmVudGlvbiBtaXNtYXRjaCwgZXRjLi4uXG4gICAqL1xuICBhbGlhcz86IHN0cmluZztcblxuICAvKipcbiAgICogT3B0aW9uYWwgdHJhbnNmb3JtZXIgdGhhdCBjb250cm9sIHRoZSB2YWx1ZSBvdXRwdXQgZnJvbSB0aGUgY29tYmluYXRpb24gb2YgYSBjb2x1bW4gYW5kIGEgcm93LlxuICAgKiBUaGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGlzIHRyYW5zZm9ybWVyIHdpbGwgYmUgcmV0dXJuZWQgZnJvbSBgUGJsQ29sdW1uLmdldFZhbHVlYFxuICAgKi9cbiAgdHJhbnNmb3JtPzogKHZhbHVlOiBhbnksIHJvdz86IGFueSwgY29sPzogUGJsQ29sdW1uKSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW5hbCB2YWx1ZSBvZiBgcHJvcGAuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgb3JnUHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBjdXN0b20gY2VsbCB0ZW1wbGF0ZSwgb3IgdGhlIGRlZmF1bHQgd2hlbiBub3Qgc2V0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNlbGxUcGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8YW55Pj47XG4gICAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGN1c3RvbSBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZWRpdG9yVHBsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PGFueT4+O1xuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgYSBjdXN0b20gaGVhZGVyIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBoZWFkZXJDZWxsVHBsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnk+PjtcbiAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGEgY3VzdG9tIGZvb3RlciBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZm9vdGVyQ2VsbFRwbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pj47XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgdGhlIGxpYnJhcnkgYXMgYSBsb2dpY2FsIGZsYWcgcmVwcmVzZW50aW5nIHRoZSBjb2x1bW4gaGlkZGVuIHN0YXRlLlxuICAgKiBUaGlzIGZsYWcgZG9lcyBub3QgZWZmZWN0IHRoZSBVSSwgY2hhbmdpbmcgaXQgd2lsbCBub3QgY2hhbmdlIGhlIGhpZGRlbiBzdGF0ZSBpbiB0aGUgVUkuXG4gICAqIERvIG5vdCBzZXQgdGhpcyB2YWx1ZSBtYW51YWxseS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBoaWRkZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgd2lkdGggaXMgc2V0IHdpdGggdHlwZSBwaXhlbHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVhZG9ubHkgaXNGaXhlZFdpZHRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gb24tZGVtYW5kIHNpemUgaW5mbyBvYmplY3QsIHBvcHVsYXRlZCBieSBgUGJsQ29sdW1uU2l6ZU9ic2VydmVyYFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHNpemVJbmZvPzogUGJsQ29sdW1uU2l6ZUluZm87XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBtYXhXaWR0aExvY2s6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGdldCBjb2x1bW5EZWYoKTogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPiB7IHJldHVybiB0aGlzLl9jb2x1bW5EZWY7IH1cblxuICBnZXQgZ3JvdXBzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fZ3JvdXBzLnZhbHVlcygpKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHJlYWRvbmx5IGdyb3VwU3RvcmU6IFBibENvbHVtbkdyb3VwU3RvcmU7XG5cbiAgcHJpdmF0ZSBfd2lkdGg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3BhcnNlZFdpZHRoOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVN0eWxlV2lkdGg+O1xuXG4gIHByaXZhdGUgX2NvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPjtcbiAgcHJpdmF0ZSBkZWZhdWx0V2lkdGggPSAnJztcblxuICAvKipcbiAgICogR3JvdXBzIHRoYXQgdGhpcyBjb2x1bW4gYmVsb25ncyB0by5cbiAgICogV0FSTklORzogRE8gTk9UIEFERC9SRU1PVkUgR1JPVVBTIERJUkVDVExZLCBVU0UgbWFya0luR3JvdXAvbWFya05vdEluR3JvdXAuXG4gICAqL1xuICBwcml2YXRlIF9ncm91cHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihkZWY6IFBibENvbHVtbiB8IFBibENvbHVtbkRlZmluaXRpb24sIGdyb3VwU3RvcmU/OiBQYmxDb2x1bW5Hcm91cFN0b3JlKSB7XG4gICAgdGhpc1tQQkxfTkdSSURfQ09MVU1OX01BUktdID0gdHJ1ZTtcblxuICAgIGlmIChpc1BibENvbHVtbihkZWYpKSB7XG4gICAgICBpbml0RGVmaW5pdGlvbnMoZGVmLCB0aGlzKTtcbiAgICAgIHRoaXMucHJvcCA9IGRlZi5wcm9wO1xuICAgICAgdGhpcy5wYXRoID0gZGVmLnBhdGg7XG4gICAgICB0aGlzLm9yZ1Byb3AgPSBkZWYub3JnUHJvcDtcbiAgICAgIHRoaXMuZ3JvdXBTdG9yZSA9IGdyb3VwU3RvcmUgfHwgZGVmLmdyb3VwU3RvcmU7XG4gICAgICB0aGlzLl9ncm91cHMgPSBuZXcgU2V0PHN0cmluZz4oZGVmLl9ncm91cHMpO1xuICAgICAgZm9yIChjb25zdCBpZCBvZiBBcnJheS5mcm9tKGRlZi5fZ3JvdXBzLnZhbHVlcygpKSkge1xuICAgICAgICBjb25zdCBnID0gdGhpcy5ncm91cFN0b3JlLmZpbmQoaWQpO1xuICAgICAgICBpZiAoZykge1xuICAgICAgICAgIHRoaXMubWFya0luR3JvdXAoZyk7XG4gICAgICAgICAgZy5yZXBsYWNlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGggPSBkZWYucGF0aCB8fCBkZWYucHJvcC5zcGxpdCgnLicpO1xuICAgICAgY29uc3QgcHJvcCA9IGRlZi5wYXRoID8gZGVmLnByb3AgOiBwYXRoLnBvcCgpO1xuXG4gICAgICBkZWYgPSBPYmplY3QuY3JlYXRlKGRlZik7XG4gICAgICBkZWYuaWQgPSBkZWYuaWQgfHwgZGVmLnByb3AgfHwgZGVmLmxhYmVsO1xuICAgICAgZGVmLmxhYmVsID0gJ2xhYmVsJyBpbiBkZWYgPyBkZWYubGFiZWwgOiBwcm9wO1xuXG4gICAgICBpZiAodHlwZW9mIGRlZi50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWYudHlwZSA9IHsgbmFtZTogZGVmLnR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGRlZi5oZWFkZXJUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWYuaGVhZGVyVHlwZSA9IHsgbmFtZTogZGVmLmhlYWRlclR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGRlZi5mb290ZXJUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWYuZm9vdGVyVHlwZSA9IHsgbmFtZTogZGVmLmZvb3RlclR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG5cbiAgICAgIGluaXREZWZpbml0aW9ucyhkZWYsIHRoaXMpO1xuXG4gICAgICB0aGlzLmdyb3VwU3RvcmUgPSBncm91cFN0b3JlIHx8IG5ldyBQYmxDb2x1bW5Hcm91cFN0b3JlKCk7XG4gICAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgICAgdGhpcy5vcmdQcm9wID0gZGVmLnByb3A7XG4gICAgICBpZiAocGF0aC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGV4dGVuZFByb3BlcnR5KG5hbWU6IGtleW9mIFBibENvbHVtbik6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoKGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPik6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gY29sdW1uRGVmO1xuICAgIGlmICh0aGlzLmRlZmF1bHRXaWR0aCkge1xuICAgICAgdGhpcy5jb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCwgJ2F0dGFjaCcpO1xuICAgIH1cbiAgfVxuXG4gIGRldGFjaCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jb2x1bW5EZWYgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXREZWZhdWx0V2lkdGgoZGVmYXVsdFdpZHRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlZmF1bHRXaWR0aCA9IGRlZmF1bHRXaWR0aDtcbiAgfVxuXG4gIHVwZGF0ZVdpZHRoKHdpZHRoPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgfVxuICAgIGNvbnN0IHsgY29sdW1uRGVmIH0gPSB0aGlzO1xuICAgIGlmIChjb2x1bW5EZWYpIHtcbiAgICAgIGNvbHVtbkRlZi51cGRhdGVXaWR0aCh0aGlzLndpZHRoIHx8IHRoaXMuZGVmYXVsdFdpZHRoIHx8ICcnLCAndXBkYXRlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdmFsdWUgdGhpcyBjb2x1bW4gcG9pbnRzIHRvIGluIHRoZSBwcm92aWRlZCByb3dcbiAgICovXG4gIGdldFZhbHVlPFQgPSBhbnk+KHJvdzogYW55KTogVCB7XG4gICAgaWYgKHRoaXMudHJhbnNmb3JtKSB7XG4gICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0oZGVlcFBhdGhHZXQocm93LCB0aGlzKSwgcm93LCB0aGlzKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlZXBQYXRoR2V0KHJvdywgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGEgdmFsdWUgaW4gdGhlIHByb3ZpZGVkIHJvdyB3aGVyZSB0aGlzIGNvbHVtbiBwb2ludHMgdG9cbiAgICovXG4gIHNldFZhbHVlKHJvdzogYW55LCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgcmV0dXJuIGRlZXBQYXRoU2V0KHJvdywgdGhpcywgdmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsncyB0aGF0IHRoaXMgY29sdW1uIGJlbG9uZyB0byB0aGUgcHJvdmlkZWQgZ3JvdXAuXG4gICAqIFxcPiBOb3RlIHRoYXQgdGhpcyBpbnRlcm5hbCB0byB0aGUgY29sdW1uIGFuZCBkb2VzIG5vdCBlZmZlY3QgdGhlIGdyb3VwIGluIGFueSB3YXkuXG4gICAqL1xuICBtYXJrSW5Hcm91cChnOiBQYmxDb2x1bW5Hcm91cCk6IHZvaWQge1xuICAgIHRoaXMuZ3JvdXBTdG9yZS5hdHRhY2goZywgdGhpcyk7XG4gICAgdGhpcy5fZ3JvdXBzLmFkZChnLmlkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrJ3MgdGhhdCB0aGlzIGNvbHVtbiBkb2VzIG5vdCBiZWxvbmcgdG8gdGhlIHByb3ZpZGVkIGdyb3VwLlxuICAgKiBcXD4gTm90ZSB0aGF0IHRoaXMgaW50ZXJuYWwgdG8gdGhlIGNvbHVtbiBhbmQgZG9lcyBub3QgZWZmZWN0IHRoZSBncm91cCBpbiBhbnkgd2F5LlxuICAgKi9cbiAgbWFya05vdEluR3JvdXAoZzogUGJsQ29sdW1uR3JvdXApOiBib29sZWFuIHtcbiAgICB0aGlzLmdyb3VwU3RvcmUuZGV0YWNoKGcsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLl9ncm91cHMuZGVsZXRlKGcuaWQpO1xuICB9XG5cbiAgaXNJbkdyb3VwKGc6IFBibENvbHVtbkdyb3VwKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3Vwcy5oYXMoZy5pZCk7XG4gIH1cblxuICBnZXRHcm91cE9mUm93KHJvd0luZGV4OiBudW1iZXIpOiBQYmxDb2x1bW5Hcm91cCB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZ3JvdXBJZHMgPSB0aGlzLmdyb3VwcztcbiAgICBmb3IgKGNvbnN0IGlkIG9mIGdyb3VwSWRzKSB7XG4gICAgICBjb25zdCBnID0gdGhpcy5ncm91cFN0b3JlLmZpbmQoaWQpO1xuICAgICAgaWYgKGcgJiYgZy5yb3dJbmRleCA9PT0gcm93SW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ3JvdXBMb2dpYyhjb2x1bW5Hcm91cHM6IFtQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXAsIFBibENvbHVtbkdyb3VwXSwgZ3JvdXBFeGlzdHM6IGJvb2xlYW4pOiBQYmxDb2x1bW5Hcm91cCB7XG4gICAgY29uc3QgW2dQcmV2LCBnQ3VyciwgZ05leHRdID0gY29sdW1uR3JvdXBzO1xuXG4gICAgLy8gU1RBVEU6IFRoaXMgY29sdW1uIGhhcyBzYW1lIGdyb3VwIG9mIHByZXZpb3VzIGNvbHVtbiwgbm90aGluZyB0byBkby5cbiAgICBpZiAoZ0N1cnIgPT09IGdQcmV2KSB7XG4gICAgICByZXR1cm4gZ0N1cnI7XG4gICAgfVxuXG4gICAgLy8gU1RBVEU6IFRoZSBncm91cCBleGlzdHMgaW4gb25lIG9mIHRoZSBjb2x1bW5zIEJVVCBOT1QgaW4gdGhlIExBU1QgQ09MVU1OIChpLmU6IEl0cyBhIHNsYXZlIHNwbGl0KVxuICAgIGlmIChncm91cEV4aXN0cykge1xuICAgICAgLy8gSWYgdGhlIHByZXZpb3VzIHNpYmxpbmcgZ3JvdXAgaXMgYSBzbGF2ZSBhbmQgdGhpcyBncm91cCBpcyB0aGUgb3JpZ2luIG9mIHRoZSBzbGF2ZSwgY29udmVydCB0aGlzIGdyb3VwIHRvIHRoZSBzbGF2ZS5cbiAgICAgIGlmIChnUHJldiAmJiBnQ3VyciA9PT0gZ1ByZXYuc2xhdmVPZikge1xuICAgICAgICByZXR1cm4gZ1ByZXY7XG4gICAgICB9XG4gICAgICBpZiAoZ05leHQgJiYgZ0N1cnIgPT09IGdOZXh0LnNsYXZlT2YpIHtcbiAgICAgICAgcmV0dXJuIGdOZXh0O1xuICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlIGNyZWF0ZSB0aGUgc2xhdmUuXG4gICAgICBjb25zdCBnID0gZ0N1cnIuY3JlYXRlU2xhdmUoW3RoaXNdKTtcbiAgICAgIHRoaXMuZ3JvdXBTdG9yZS5hZGQoZyk7XG5cbiAgICAgIC8vIElmIHRoZSBjdXJyZW50IGdyb3VwIGlzIGEgcGxhY2Vob2xkZXIgYW5kIGVpdGhlciB0aGUgcHJldmlvdXMgT1IgbmV4dCBzaWJsaW5nIGdyb3VwIGlzIGEgcGxhY2Vob2xkZXIgYXMgd2VsbFxuICAgICAgLy8gd2Ugd2FudCB0byBncm91cCB0aGVtIHRvZ2V0aGVyLCBhbHRob3VnaCB0aGV5IGFyZSBub3QgcmVsYXRlZCwgYmVjYXVzZSB0aGV5IGJvdGggaGF2ZSBpZGVudGljYWwgaGVhZGVycyAoZW1wdHkgaGVhZGVyKS5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBzdGlsbCBjcmVhdGUgdGhlIHNhbHZlLCB3ZSBqdXN0IGRvbid0IHVzZSBpdC5cbiAgICAgIGlmIChnQ3Vyci5wbGFjZWhvbGRlcikge1xuICAgICAgICBjb25zdCBwcmV2UEggPSBnUHJldiAmJiBnUHJldi5wbGFjZWhvbGRlcjtcbiAgICAgICAgY29uc3QgbmV4dFBIID0gZ05leHQgJiYgZ05leHQuc2xhdmVPZiAmJiBnTmV4dC5wbGFjZWhvbGRlcjtcbiAgICAgICAgY29uc3QgZ3JvdXBXaXRoUGxhY2Vob2xkZXIgPSBwcmV2UEggPyBnUHJldiA6IG5leHRQSCA/IGdOZXh0IDogdW5kZWZpbmVkO1xuICAgICAgICAvLyBjb25zdCBncm91cFdpdGhQbGFjZWhvbGRlciA9IHByZXZQSCAmJiBnUHJldjtcbiAgICAgICAgaWYgKGdyb3VwV2l0aFBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgcmV0dXJuIGdyb3VwV2l0aFBsYWNlaG9sZGVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnO1xuICAgIH1cbiAgICAvLyBTVEFURTogVGhlIGdyb3VwIElTIGEgc2xhdmUgYW5kIGl0IGlzIHNldCBBRlRFUiBhbiBpdGVtIHRoYXQgYmVsb25ncyB0byB0aGUgZ3JvdXAgaXQgaXMgc2xhdmUgb2YuXG4gICAgZWxzZSBpZiAoZ0N1cnIuc2xhdmVPZiAmJiBnUHJldikge1xuICAgICAgaWYgKGdDdXJyLnNsYXZlT2YgPT09IGdQcmV2KSB7XG4gICAgICAgIHJldHVybiBnQ3Vyci5zbGF2ZU9mO1xuICAgICAgfVxuICAgICAgaWYgKGdDdXJyLnNsYXZlT2YgPT09IGdQcmV2LnNsYXZlT2YpIHtcbiAgICAgICAgcmV0dXJuIGdQcmV2O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBTVEFURTogVGhlIGdyb3VwIElTIGEgc2xhdmUgYW5kIGl0IGlzIHNldCBCRUZPUkUgYW4gaXRlbSB0aGF0IGJlbG9uZ3MgdG8gdGhlIGdyb3VwIGl0IGlzIHNsYXZlIG9mLlxuICAgIGVsc2UgaWYgKGdDdXJyLnNsYXZlT2YgJiYgZ05leHQpIHtcbiAgICAgIGlmIChnQ3Vyci5zbGF2ZU9mID09PSBnTmV4dCkge1xuICAgICAgICByZXR1cm4gZ0N1cnIuc2xhdmVPZjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdDdXJyO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgaWYgdGhlIGNvbHVtbiB3aWR0aCBpcyBsb2NrZWQgYnkgYSBtYXhpbXVtIGJ5IGNoZWNraW5nIGlmIHRoZSBnaXZlbiB3aWR0aCBpcyBlcXVhbCB0byB0aGUgbWF4IHdpZHRoLlxuICAgKiBJZiB0aGUgcmVzdWx0IG9mIHRoZSBjYWxjdWxhdGlvbiAodHJ1ZS9mYWxzZSkgZG9lcyBub3QgZXF1YWwgdGhlIHByZXZpb3VzIGxvY2sgc3RhdGUgaXQgd2lsbCBzZXQgdGhlIG5ldyBsb2NrIHN0YXRlXG4gICAqIGFuZCByZXR1cm4gdHJ1ZS5cbiAgICogT3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBjaGVja01heFdpZHRoTG9jayhhY3R1YWxXaWR0aDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKGFjdHVhbFdpZHRoID09PSB0aGlzLm1heFdpZHRoKSB7XG4gICAgICBpZiAoIXRoaXMubWF4V2lkdGhMb2NrKSB7XG4gICAgICAgIHRoaXMubWF4V2lkdGhMb2NrID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLm1heFdpZHRoTG9jaykge1xuICAgICAgdGhpcy5tYXhXaWR0aExvY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxufVxuIl19