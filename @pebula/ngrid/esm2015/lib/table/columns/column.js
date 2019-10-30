/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    return def instanceof PblColumn || def[PBL_NGRID_COLUMN_MARK] === true;
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
            this.columnDef.updateWidth(this.width || this.defaultWidth);
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
     * @param {?} markForCheck
     * @param {?=} width
     * @return {?}
     */
    updateWidth(markForCheck, width) {
        if (width) {
            this.width = width;
        }
        const { columnDef } = this;
        if (columnDef) {
            columnDef.updateWidth(this.width || this.defaultWidth || '');
            if (markForCheck) {
                columnDef.markForCheck();
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb2x1bW5zL2NvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBSUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0QsT0FBTyxFQUFrQixtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztNQUUvRCxxQkFBcUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDOztNQUMzQyxnQkFBZ0IsR0FBMkIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDOzs7OztBQUV0SSxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQVE7SUFDbEMsT0FBTyxHQUFHLFlBQVksU0FBUyxJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLElBQUksQ0FBQztBQUN6RSxDQUFDO0FBRUQsTUFBTSxPQUFPLFNBQVM7Ozs7O0lBMExwQixZQUFZLEdBQW9DLEVBQUUsVUFBZ0M7Ozs7O1FBL0lsRixTQUFJLEdBQVEsRUFBRSxDQUFDO1FBdUlQLGlCQUFZLEdBQUcsRUFBRSxDQUFDOzs7OztRQU1sQixZQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUdsQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFbkMsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxD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QW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZSwgUGJsTmdyaWRTb3J0ZXIgfSBmcm9tICcuLi8uLi9kYXRhLXNvdXJjZS90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgZGVlcFBhdGhHZXQsIGRlZXBQYXRoU2V0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uRGVmaW5pdGlvbiwgUGJsQ29sdW1uVHlwZURlZmluaXRpb24gfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGluaXREZWZpbml0aW9ucywgcGFyc2VTdHlsZVdpZHRoIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBTdG9yZSB9IGZyb20gJy4vZ3JvdXAtY29sdW1uJztcblxuY29uc3QgUEJMX05HUklEX0NPTFVNTl9NQVJLID0gU3ltYm9sKCdQYmxDb2x1bW4nKTtcbmNvbnN0IENMT05FX1BST1BFUlRJRVM6IEFycmF5PGtleW9mIFBibENvbHVtbj4gPSBbJ3BJbmRleCcsICd0cmFuc2Zvcm0nLCAnZmlsdGVyJywgJ3NvcnQnLCAnYWxpYXMnLCAnaGVhZGVyVHlwZScsICdmb290ZXJUeXBlJywgJ3BpbiddO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYmxDb2x1bW4oZGVmOiBhbnkpOiBkZWYgaXMgUGJsQ29sdW1uIHtcbiAgcmV0dXJuIGRlZiBpbnN0YW5jZW9mIFBibENvbHVtbiB8fCBkZWZbUEJMX05HUklEX0NPTFVNTl9NQVJLXSA9PT0gdHJ1ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbiBpbXBsZW1lbnRzIFBibENvbHVtbkRlZmluaXRpb24ge1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCwgZGVmaW5lcyB0aGlzIGNvbHVtbiBhcyB0aGUgcHJpbWFyeSBpbmRleCBvZiB0aGUgZGF0YS1zZXQgd2l0aCBhbGwgdmFsdWVzIGluIHRoaXMgY29sdW1uIGJlaW5nIHVuaXF1ZS5cbiAgICovXG4gIHBJbmRleD86IGJvb2xlYW47XG5cbiAgbGFiZWw/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENTUyBjbGFzcyB0aGF0IGdldCBhcHBsaWVkIG9uIHRoZSBoZWFkZXIgYW5kIGNlbGwuXG4gICAqIFlvdSBjYW4gYXBwbHkgdW5pcXVlIGhlYWRlci9jZWxsIHN0eWxlcyB1c2luZyB0aGUgZWxlbWVudCBuYW1lLlxuICAgKi9cbiAgY3NzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgd2lkdGggaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICovXG4gIGdldCB3aWR0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fd2lkdGg7IH1cbiAgc2V0IHdpZHRoKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3dpZHRoKSB7XG4gICAgICB0aGlzLl9wYXJzZWRXaWR0aCA9IHBhcnNlU3R5bGVXaWR0aCh0aGlzLl93aWR0aCA9IHZhbHVlKTtcbiAgICAgIGNvbnN0IGlzRml4ZWRXaWR0aCA9IHRoaXMuX3BhcnNlZFdpZHRoICYmIHRoaXMuX3BhcnNlZFdpZHRoLnR5cGUgPT09ICdweCc7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzRml4ZWRXaWR0aCcsIHsgdmFsdWU6IGlzRml4ZWRXaWR0aCwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGhpcyBtaW5pbXVtIHdpZHRoIGluIHBpeGVsc1xuICAgKiBUaGlzIGlzIGFuIGFic29sdXRlIHZhbHVlLCB0aHVzIGEgbnVtYmVyLlxuICAgKi9cbiAgbWluV2lkdGg/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGlzIG1heGltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtYXhXaWR0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogQSBwbGFjZSB0byBzdG9yZSB0aGluZ3MuLi5cbiAgICogVGhpcyBtdXN0IGJlIGFuIG9iamVjdCwgdmFsdWVzIGFyZSBzaGFkb3ctY29waWVkIHNvIHBlcnNpc3QgZGF0YSBiZXR3ZWVuIG11bHRpcGxlIHBsdWdpbnMuXG4gICAqL1xuICBkYXRhOiBhbnkgPSB7fTtcblxuICBnZXQgcGFyc2VkV2lkdGgoKTogeyB2YWx1ZTogbnVtYmVyOyB0eXBlOiAncHgnIHwgJyUnIH0gfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fcGFyc2VkV2lkdGg7IH1cblxuICAvKipcbiAgICogVGhlIHByb3BlcnR5IHRvIGRpc3BsYXkgKGZyb20gdGhlIHJvdyBlbGVtZW50KVxuICAgKiBZb3UgY2FuIHVzZSBkb3Qgbm90YXRpb24gdG8gZGlzcGxheSBkZWVwIHBhdGhzLlxuICAgKi9cbiAgcHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHBhdGggdG8gYSBuZXN0ZWQgb2JqZWN0LCByZWxhdGl2ZSB0byB0aGUgcm93IGVsZW1lbnQuXG4gICAqIFRoZSB0YWJsZSB3aWxsIGRpc3BsYXkgYHByb3BgIGZyb20gdGhlIG9iamVjdCByZWZlcmVuY2VkIGJ5IGBwYXRoYC5cbiAgICpcbiAgICogWW91IGNhbiBhbHNvIHVzZSBkb3Qgbm90YXRpb24gZGlyZWN0bHkgZnJvbSBgcHJvcGAuXG4gICAqXG4gICAqIEV4YW1wbGU6XG4gICAqIHByb3A6IFwic3RyZWV0XCJcbiAgICogcGF0aDogWyBcIm15SW5zdGFuY2VcIiwgXCJ1c2VyXCIsIFwiYWRkcmVzc1wiXG4gICAqXG4gICAqIGlzIGlkZW50aWNhbCB0bzpcbiAgICogcHJvcDogXCJteUluc3RhbmNlLnVzZXIuYWRkcmVzcy5zdHJlZXRcIlxuICAgKlxuICAgKi9cbiAgcGF0aD86IHN0cmluZ1tdO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgdmFsdWVzIGluIHRoaXMgY29sdW1uLlxuICAgKiBUaGlzIGlzIGFuIGFkZGl0aW9uYWwgbGV2ZWwgZm9yIG1hdGNoaW5nIGNvbHVtbnMgdG8gdGVtcGxhdGVzLCBncm91cGluZyB0ZW1wbGF0ZXMgZm9yIGEgdHlwZS5cbiAgICovXG4gIHR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcbiAgaGVhZGVyVHlwZT86IFBibENvbHVtblR5cGVEZWZpbml0aW9uO1xuICBmb290ZXJUeXBlPzogUGJsQ29sdW1uVHlwZURlZmluaXRpb247XG5cbiAgc29ydD86IGJvb2xlYW4gfCBQYmxOZ3JpZFNvcnRlcjtcblxuICAvKipcbiAgICogQSBjdXN0b20gcHJlZGljYXRlIGZ1bmN0aW9uIHRvIGZpbHRlciByb3dzIHVzaW5nIHRoZSBjdXJyZW50IGNvbHVtbi5cbiAgICpcbiAgICogVmFsaWQgb25seSB3aGVuIGZpbHRlcmluZyBieSB2YWx1ZS5cbiAgICogU2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gICAqL1xuICBmaWx0ZXI/OiBEYXRhU291cmNlQ29sdW1uUHJlZGljYXRlO1xuXG4gIC8qKlxuICAgKiBNYXJrcyB0aGUgdGFibGUgYXMgZWRpdGFibGUuIEFuIGVkaXRhYmxlIGNvbHVtbiBhbHNvIHJlcXVpcmVzIGFuIGVkaXQgdGVtcGxhdGUgdG8gcXVhbGlmeSBhcyBlZGl0YWJsZSwgdGhpcyBmbGFnIGFsb25lIGlzIG5vdCBlbm91Z2guXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIGZsYWcgb25seSBlZmZlY3QgdGhlIENTUyBjbGFzcyBhZGRlZCB0byB0aGUgY2VsbC5cbiAgICovXG4gIGVkaXRhYmxlOiBib29sZWFuO1xuXG4gIHBpbjogJ3N0YXJ0JyB8ICdlbmQnIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFRPRE8oMS4wLjApOiByZW1vdmVcbiAgLyoqIEBkZXByZWNhdGVkIEJSRUFLSU5HIENIQU5HRSAxLjAuMCAtIFVzZSBgYWxpYXNgIGluc3RlYWQuICovXG4gIGdldCBzb3J0QWxpYXMoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuYWxpYXM7IH1cbiAgc2V0IHNvcnRBbGlhcyh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuYWxpYXMgPSB2YWx1ZTsgfVxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBjb2x1bW4uXG4gICAqIFVzZWZ1bCB3aGVuIHRoZSBzZXJ2ZXIgcHJvdmlkZXMgc29ydC9maWx0ZXIgbWV0YWRhdGEgdGhhdCBkb2VzIG5vdCBoYXZlIGEgMToxIG1hdGNoIHdpdGggdGhlIGNvbHVtbiBuYW1lcy5cbiAgICogZS5nLiBEZWVwIHBhdGggcHJvcHMsIHByb3BlcnR5IG5hbWUgY29udmVudGlvbiBtaXNtYXRjaCwgZXRjLi4uXG4gICAqL1xuICBhbGlhcz86IHN0cmluZztcblxuICAvKipcbiAgICogT3B0aW9uYWwgdHJhbnNmb3JtZXIgdGhhdCBjb250cm9sIHRoZSB2YWx1ZSBvdXRwdXQgZnJvbSB0aGUgY29tYmluYXRpb24gb2YgYSBjb2x1bW4gYW5kIGEgcm93LlxuICAgKiBUaGUgdmFsdWUgcmV0dXJuZWQgZnJvbSB0aGlzIHRyYW5zZm9ybWVyIHdpbGwgYmUgcmV0dXJuZWQgZnJvbSBgUGJsQ29sdW1uLmdldFZhbHVlYFxuICAgKi9cbiAgdHJhbnNmb3JtPzogKHZhbHVlOiBhbnksIHJvdz86IGFueSwgY29sPzogUGJsQ29sdW1uKSA9PiBhbnk7XG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW5hbCB2YWx1ZSBvZiBgcHJvcGAuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgb3JnUHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBjdXN0b20gY2VsbCB0ZW1wbGF0ZSwgb3IgdGhlIGRlZmF1bHQgd2hlbiBub3Qgc2V0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNlbGxUcGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8YW55Pj47XG4gICAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGN1c3RvbSBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZWRpdG9yVHBsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PGFueT4+O1xuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgYSBjdXN0b20gaGVhZGVyIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBoZWFkZXJDZWxsVHBsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnk+PjtcbiAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGEgY3VzdG9tIGZvb3RlciBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZm9vdGVyQ2VsbFRwbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pj47XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgdGhlIGxpYnJhcnkgYXMgYSBsb2dpY2FsIGZsYWcgcmVwcmVzZW50aW5nIHRoZSBjb2x1bW4gaGlkZGVuIHN0YXRlLlxuICAgKiBUaGlzIGZsYWcgZG9lcyBub3QgZWZmZWN0IHRoZSBVSSwgY2hhbmdpbmcgaXQgd2lsbCBub3QgY2hhbmdlIGhlIGhpZGRlbiBzdGF0ZSBpbiB0aGUgVUkuXG4gICAqIERvIG5vdCBzZXQgdGhpcyB2YWx1ZSBtYW51YWxseS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBoaWRkZW46IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSBpbmRpY2F0ZXMgdGhhdCB0aGUgd2lkdGggaXMgc2V0IHdpdGggdHlwZSBwaXhlbHMuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgcmVhZG9ubHkgaXNGaXhlZFdpZHRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogQW4gb24tZGVtYW5kIHNpemUgaW5mbyBvYmplY3QsIHBvcHVsYXRlZCBieSBgUGJsQ29sdW1uU2l6ZU9ic2VydmVyYFxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHNpemVJbmZvPzogUGJsQ29sdW1uU2l6ZUluZm87XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBtYXhXaWR0aExvY2s6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmIGZvciB0aGlzIGNvbHVtbi5cbiAgICovXG4gIGdldCBjb2x1bW5EZWYoKTogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPiB7IHJldHVybiB0aGlzLl9jb2x1bW5EZWY7IH1cblxuICBnZXQgZ3JvdXBzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIEFycmF5LmZyb20odGhpcy5fZ3JvdXBzLnZhbHVlcygpKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgcHVibGljIHJlYWRvbmx5IGdyb3VwU3RvcmU6IFBibENvbHVtbkdyb3VwU3RvcmU7XG5cbiAgcHJpdmF0ZSBfd2lkdGg/OiBzdHJpbmc7XG4gIHByaXZhdGUgX3BhcnNlZFdpZHRoOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVN0eWxlV2lkdGg+O1xuXG4gIHByaXZhdGUgX2NvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPjtcbiAgcHJpdmF0ZSBkZWZhdWx0V2lkdGggPSAnJztcblxuICAvKipcbiAgICogR3JvdXBzIHRoYXQgdGhpcyBjb2x1bW4gYmVsb25ncyB0by5cbiAgICogV0FSTklORzogRE8gTk9UIEFERC9SRU1PVkUgR1JPVVBTIERJUkVDVExZLCBVU0UgbWFya0luR3JvdXAvbWFya05vdEluR3JvdXAuXG4gICAqL1xuICBwcml2YXRlIF9ncm91cHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihkZWY6IFBibENvbHVtbiB8IFBibENvbHVtbkRlZmluaXRpb24sIGdyb3VwU3RvcmU/OiBQYmxDb2x1bW5Hcm91cFN0b3JlKSB7XG4gICAgdGhpc1tQQkxfTkdSSURfQ09MVU1OX01BUktdID0gdHJ1ZTtcblxuICAgIGlmIChpc1BibENvbHVtbihkZWYpKSB7XG4gICAgICBpbml0RGVmaW5pdGlvbnMoZGVmLCB0aGlzKTtcbiAgICAgIHRoaXMucHJvcCA9IGRlZi5wcm9wO1xuICAgICAgdGhpcy5wYXRoID0gZGVmLnBhdGg7XG4gICAgICB0aGlzLm9yZ1Byb3AgPSBkZWYub3JnUHJvcDtcbiAgICAgIHRoaXMuZ3JvdXBTdG9yZSA9IGdyb3VwU3RvcmUgfHwgZGVmLmdyb3VwU3RvcmU7XG4gICAgICB0aGlzLl9ncm91cHMgPSBuZXcgU2V0PHN0cmluZz4oZGVmLl9ncm91cHMpO1xuICAgICAgZm9yIChjb25zdCBpZCBvZiBBcnJheS5mcm9tKGRlZi5fZ3JvdXBzLnZhbHVlcygpKSkge1xuICAgICAgICBjb25zdCBnID0gdGhpcy5ncm91cFN0b3JlLmZpbmQoaWQpO1xuICAgICAgICBpZiAoZykge1xuICAgICAgICAgIHRoaXMubWFya0luR3JvdXAoZyk7XG4gICAgICAgICAgZy5yZXBsYWNlKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBhdGggPSBkZWYucGF0aCB8fCBkZWYucHJvcC5zcGxpdCgnLicpO1xuICAgICAgY29uc3QgcHJvcCA9IGRlZi5wYXRoID8gZGVmLnByb3AgOiBwYXRoLnBvcCgpO1xuXG4gICAgICBkZWYgPSBPYmplY3QuY3JlYXRlKGRlZik7XG4gICAgICBkZWYuaWQgPSBkZWYuaWQgfHwgZGVmLnByb3AgfHwgZGVmLmxhYmVsO1xuICAgICAgZGVmLmxhYmVsID0gJ2xhYmVsJyBpbiBkZWYgPyBkZWYubGFiZWwgOiBwcm9wO1xuXG4gICAgICBpZiAodHlwZW9mIGRlZi50eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWYudHlwZSA9IHsgbmFtZTogZGVmLnR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGRlZi5oZWFkZXJUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWYuaGVhZGVyVHlwZSA9IHsgbmFtZTogZGVmLmhlYWRlclR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGRlZi5mb290ZXJUeXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkZWYuZm9vdGVyVHlwZSA9IHsgbmFtZTogZGVmLmZvb3RlclR5cGUgfSBhcyBhbnk7XG4gICAgICB9XG5cbiAgICAgIGluaXREZWZpbml0aW9ucyhkZWYsIHRoaXMpO1xuXG4gICAgICB0aGlzLmdyb3VwU3RvcmUgPSBncm91cFN0b3JlIHx8IG5ldyBQYmxDb2x1bW5Hcm91cFN0b3JlKCk7XG4gICAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgICAgdGhpcy5vcmdQcm9wID0gZGVmLnByb3A7XG4gICAgICBpZiAocGF0aC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gcGF0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHByb3Agb2YgQ0xPTkVfUFJPUEVSVElFUykge1xuICAgICAgaWYgKHByb3AgaW4gZGVmKSB7XG4gICAgICAgIHRoaXNbcHJvcCBhcyBhbnldID0gZGVmW3Byb3BdXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGV4dGVuZFByb3BlcnR5KG5hbWU6IGtleW9mIFBibENvbHVtbik6IHZvaWQge1xuICAgIGlmIChDTE9ORV9QUk9QRVJUSUVTLmluZGV4T2YobmFtZSkgPT09IC0xKSB7XG4gICAgICBDTE9ORV9QUk9QRVJUSUVTLnB1c2gobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYXR0YWNoKGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8UGJsQ29sdW1uPik6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gY29sdW1uRGVmO1xuICAgIGlmICh0aGlzLmRlZmF1bHRXaWR0aCkge1xuICAgICAgdGhpcy5jb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCk7XG4gICAgfVxuICB9XG5cbiAgZGV0YWNoKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbHVtbkRlZiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHNldERlZmF1bHRXaWR0aChkZWZhdWx0V2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gZGVmYXVsdFdpZHRoO1xuICB9XG5cbiAgdXBkYXRlV2lkdGgobWFya0ZvckNoZWNrOiBib29sZWFuLCB3aWR0aD86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh3aWR0aCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbHVtbkRlZiB9ID0gdGhpcztcbiAgICBpZiAoY29sdW1uRGVmKSB7XG4gICAgICBjb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCB8fCAnJyk7XG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIGNvbHVtbkRlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSB0aGlzIGNvbHVtbiBwb2ludHMgdG8gaW4gdGhlIHByb3ZpZGVkIHJvd1xuICAgKi9cbiAgZ2V0VmFsdWU8VCA9IGFueT4ocm93OiBhbnkpOiBUIHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm0pIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShkZWVwUGF0aEdldChyb3csIHRoaXMpLCByb3csIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gZGVlcFBhdGhHZXQocm93LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB2YWx1ZSBpbiB0aGUgcHJvdmlkZWQgcm93IHdoZXJlIHRoaXMgY29sdW1uIHBvaW50cyB0b1xuICAgKi9cbiAgc2V0VmFsdWUocm93OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gZGVlcFBhdGhTZXQocm93LCB0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogTWFyaydzIHRoYXQgdGhpcyBjb2x1bW4gYmVsb25nIHRvIHRoZSBwcm92aWRlZCBncm91cC5cbiAgICogXFw+IE5vdGUgdGhhdCB0aGlzIGludGVybmFsIHRvIHRoZSBjb2x1bW4gYW5kIGRvZXMgbm90IGVmZmVjdCB0aGUgZ3JvdXAgaW4gYW55IHdheS5cbiAgICovXG4gIG1hcmtJbkdyb3VwKGc6IFBibENvbHVtbkdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5ncm91cFN0b3JlLmF0dGFjaChnLCB0aGlzKTtcbiAgICB0aGlzLl9ncm91cHMuYWRkKGcuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsncyB0aGF0IHRoaXMgY29sdW1uIGRvZXMgbm90IGJlbG9uZyB0byB0aGUgcHJvdmlkZWQgZ3JvdXAuXG4gICAqIFxcPiBOb3RlIHRoYXQgdGhpcyBpbnRlcm5hbCB0byB0aGUgY29sdW1uIGFuZCBkb2VzIG5vdCBlZmZlY3QgdGhlIGdyb3VwIGluIGFueSB3YXkuXG4gICAqL1xuICBtYXJrTm90SW5Hcm91cChnOiBQYmxDb2x1bW5Hcm91cCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuZ3JvdXBTdG9yZS5kZXRhY2goZywgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3Vwcy5kZWxldGUoZy5pZCk7XG4gIH1cblxuICBpc0luR3JvdXAoZzogUGJsQ29sdW1uR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBzLmhhcyhnLmlkKTtcbiAgfVxuXG4gIGdldEdyb3VwT2ZSb3cocm93SW5kZXg6IG51bWJlcik6IFBibENvbHVtbkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cElkcyA9IHRoaXMuZ3JvdXBzO1xuICAgIGZvciAoY29uc3QgaWQgb2YgZ3JvdXBJZHMpIHtcbiAgICAgIGNvbnN0IGcgPSB0aGlzLmdyb3VwU3RvcmUuZmluZChpZCk7XG4gICAgICBpZiAoZyAmJiBnLnJvd0luZGV4ID09PSByb3dJbmRleCkge1xuICAgICAgICByZXR1cm4gZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBncm91cExvZ2ljKGNvbHVtbkdyb3VwczogW1BibENvbHVtbkdyb3VwLCBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBdLCBncm91cEV4aXN0czogYm9vbGVhbik6IFBibENvbHVtbkdyb3VwIHtcbiAgICBjb25zdCBbZ1ByZXYsIGdDdXJyLCBnTmV4dF0gPSBjb2x1bW5Hcm91cHM7XG5cbiAgICAvLyBTVEFURTogVGhpcyBjb2x1bW4gaGFzIHNhbWUgZ3JvdXAgb2YgcHJldmlvdXMgY29sdW1uLCBub3RoaW5nIHRvIGRvLlxuICAgIGlmIChnQ3VyciA9PT0gZ1ByZXYpIHtcbiAgICAgIHJldHVybiBnQ3VycjtcbiAgICB9XG5cbiAgICAvLyBTVEFURTogVGhlIGdyb3VwIGV4aXN0cyBpbiBvbmUgb2YgdGhlIGNvbHVtbnMgQlVUIE5PVCBpbiB0aGUgTEFTVCBDT0xVTU4gKGkuZTogSXRzIGEgc2xhdmUgc3BsaXQpXG4gICAgaWYgKGdyb3VwRXhpc3RzKSB7XG4gICAgICAvLyBJZiB0aGUgcHJldmlvdXMgc2libGluZyBncm91cCBpcyBhIHNsYXZlIGFuZCB0aGlzIGdyb3VwIGlzIHRoZSBvcmlnaW4gb2YgdGhlIHNsYXZlLCBjb252ZXJ0IHRoaXMgZ3JvdXAgdG8gdGhlIHNsYXZlLlxuICAgICAgaWYgKGdQcmV2ICYmIGdDdXJyID09PSBnUHJldi5zbGF2ZU9mKSB7XG4gICAgICAgIHJldHVybiBnUHJldjtcbiAgICAgIH1cbiAgICAgIGlmIChnTmV4dCAmJiBnQ3VyciA9PT0gZ05leHQuc2xhdmVPZikge1xuICAgICAgICByZXR1cm4gZ05leHQ7XG4gICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UgY3JlYXRlIHRoZSBzbGF2ZS5cbiAgICAgIGNvbnN0IGcgPSBnQ3Vyci5jcmVhdGVTbGF2ZShbdGhpc10pO1xuICAgICAgdGhpcy5ncm91cFN0b3JlLmFkZChnKTtcblxuICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgYSBwbGFjZWhvbGRlciBhbmQgZWl0aGVyIHRoZSBwcmV2aW91cyBPUiBuZXh0IHNpYmxpbmcgZ3JvdXAgaXMgYSBwbGFjZWhvbGRlciBhcyB3ZWxsXG4gICAgICAvLyB3ZSB3YW50IHRvIGdyb3VwIHRoZW0gdG9nZXRoZXIsIGFsdGhvdWdoIHRoZXkgYXJlIG5vdCByZWxhdGVkLCBiZWNhdXNlIHRoZXkgYm90aCBoYXZlIGlkZW50aWNhbCBoZWFkZXJzIChlbXB0eSBoZWFkZXIpLlxuICAgICAgLy8gTm90ZSB0aGF0IHdlIHN0aWxsIGNyZWF0ZSB0aGUgc2FsdmUsIHdlIGp1c3QgZG9uJ3QgdXNlIGl0LlxuICAgICAgaWYgKGdDdXJyLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGNvbnN0IHByZXZQSCA9IGdQcmV2ICYmIGdQcmV2LnBsYWNlaG9sZGVyO1xuICAgICAgICBjb25zdCBuZXh0UEggPSBnTmV4dCAmJiBnTmV4dC5zbGF2ZU9mICYmIGdOZXh0LnBsYWNlaG9sZGVyO1xuICAgICAgICBjb25zdCBncm91cFdpdGhQbGFjZWhvbGRlciA9IHByZXZQSCA/IGdQcmV2IDogbmV4dFBIID8gZ05leHQgOiB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGNvbnN0IGdyb3VwV2l0aFBsYWNlaG9sZGVyID0gcHJldlBIICYmIGdQcmV2O1xuICAgICAgICBpZiAoZ3JvdXBXaXRoUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICByZXR1cm4gZ3JvdXBXaXRoUGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGc7XG4gICAgfVxuICAgIC8vIFNUQVRFOiBUaGUgZ3JvdXAgSVMgYSBzbGF2ZSBhbmQgaXQgaXMgc2V0IEFGVEVSIGFuIGl0ZW0gdGhhdCBiZWxvbmdzIHRvIHRoZSBncm91cCBpdCBpcyBzbGF2ZSBvZi5cbiAgICBlbHNlIGlmIChnQ3Vyci5zbGF2ZU9mICYmIGdQcmV2KSB7XG4gICAgICBpZiAoZ0N1cnIuc2xhdmVPZiA9PT0gZ1ByZXYpIHtcbiAgICAgICAgcmV0dXJuIGdDdXJyLnNsYXZlT2Y7XG4gICAgICB9XG4gICAgICBpZiAoZ0N1cnIuc2xhdmVPZiA9PT0gZ1ByZXYuc2xhdmVPZikge1xuICAgICAgICByZXR1cm4gZ1ByZXY7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNUQVRFOiBUaGUgZ3JvdXAgSVMgYSBzbGF2ZSBhbmQgaXQgaXMgc2V0IEJFRk9SRSBhbiBpdGVtIHRoYXQgYmVsb25ncyB0byB0aGUgZ3JvdXAgaXQgaXMgc2xhdmUgb2YuXG4gICAgZWxzZSBpZiAoZ0N1cnIuc2xhdmVPZiAmJiBnTmV4dCkge1xuICAgICAgaWYgKGdDdXJyLnNsYXZlT2YgPT09IGdOZXh0KSB7XG4gICAgICAgIHJldHVybiBnQ3Vyci5zbGF2ZU9mO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ0N1cnI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBpZiB0aGUgY29sdW1uIHdpZHRoIGlzIGxvY2tlZCBieSBhIG1heGltdW0gYnkgY2hlY2tpbmcgaWYgdGhlIGdpdmVuIHdpZHRoIGlzIGVxdWFsIHRvIHRoZSBtYXggd2lkdGguXG4gICAqIElmIHRoZSByZXN1bHQgb2YgdGhlIGNhbGN1bGF0aW9uICh0cnVlL2ZhbHNlKSBkb2VzIG5vdCBlcXVhbCB0aGUgcHJldmlvdXMgbG9jayBzdGF0ZSBpdCB3aWxsIHNldCB0aGUgbmV3IGxvY2sgc3RhdGVcbiAgICogYW5kIHJldHVybiB0cnVlLlxuICAgKiBPdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNoZWNrTWF4V2lkdGhMb2NrKGFjdHVhbFdpZHRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoYWN0dWFsV2lkdGggPT09IHRoaXMubWF4V2lkdGgpIHtcbiAgICAgIGlmICghdGhpcy5tYXhXaWR0aExvY2spIHtcbiAgICAgICAgdGhpcy5tYXhXaWR0aExvY2sgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMubWF4V2lkdGhMb2NrKSB7XG4gICAgICB0aGlzLm1heFdpZHRoTG9jayA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG59XG4iXX0=