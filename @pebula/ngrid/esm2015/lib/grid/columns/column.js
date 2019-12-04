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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUlwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUMzRCxPQUFPLEVBQWtCLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O01BRS9ELHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7O01BQzNDLGdCQUFnQixHQUEyQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUM7Ozs7O0FBRXRJLE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBUTtJQUNsQyxPQUFPLEdBQUcsWUFBWSxTQUFTLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7QUFDbEYsQ0FBQztBQUVELE1BQU0sT0FBTyxTQUFTOzs7OztJQTBMcEIsWUFBWSxHQUFvQyxFQUFFLFVBQWdDOzs7OztRQS9JbEYsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQXVJUCxpQkFBWSxHQUFHLEVBQUUsQ0FBQzs7Ozs7UUFNbEIsWUFBTyxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFHbEMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRW5DLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLGVBQWUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxJQUFJLEdB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eyBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlQ29sdW1uUHJlZGljYXRlLCBQYmxOZ3JpZFNvcnRlciB9IGZyb20gJy4uLy4uL2RhdGEtc291cmNlL3R5cGVzJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRGVmIH0gZnJvbSAnLi4vZGlyZWN0aXZlcyc7XG5pbXBvcnQgeyBkZWVwUGF0aEdldCwgZGVlcFBhdGhTZXQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TaXplSW5mbyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZENlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW5EZWZpbml0aW9uLCBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgaW5pdERlZmluaXRpb25zLCBwYXJzZVN0eWxlV2lkdGggfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFBibENvbHVtbkdyb3VwLCBQYmxDb2x1bW5Hcm91cFN0b3JlIH0gZnJvbSAnLi9ncm91cC1jb2x1bW4nO1xuXG5jb25zdCBQQkxfTkdSSURfQ09MVU1OX01BUksgPSBTeW1ib2woJ1BibENvbHVtbicpO1xuY29uc3QgQ0xPTkVfUFJPUEVSVElFUzogQXJyYXk8a2V5b2YgUGJsQ29sdW1uPiA9IFsncEluZGV4JywgJ3RyYW5zZm9ybScsICdmaWx0ZXInLCAnc29ydCcsICdhbGlhcycsICdoZWFkZXJUeXBlJywgJ2Zvb3RlclR5cGUnLCAncGluJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BibENvbHVtbihkZWY6IGFueSk6IGRlZiBpcyBQYmxDb2x1bW4ge1xuICByZXR1cm4gZGVmIGluc3RhbmNlb2YgUGJsQ29sdW1uIHx8IChkZWYgJiYgZGVmW1BCTF9OR1JJRF9DT0xVTU5fTUFSS10gPT09IHRydWUpO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uIGltcGxlbWVudHMgUGJsQ29sdW1uRGVmaW5pdGlvbiB7XG4gIGlkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0LCBkZWZpbmVzIHRoaXMgY29sdW1uIGFzIHRoZSBwcmltYXJ5IGluZGV4IG9mIHRoZSBkYXRhLXNldCB3aXRoIGFsbCB2YWx1ZXMgaW4gdGhpcyBjb2x1bW4gYmVpbmcgdW5pcXVlLlxuICAgKi9cbiAgcEluZGV4PzogYm9vbGVhbjtcblxuICBsYWJlbD86IHN0cmluZztcblxuICAvKipcbiAgICogQ1NTIGNsYXNzIHRoYXQgZ2V0IGFwcGxpZWQgb24gdGhlIGhlYWRlciBhbmQgY2VsbC5cbiAgICogWW91IGNhbiBhcHBseSB1bmlxdWUgaGVhZGVyL2NlbGwgc3R5bGVzIHVzaW5nIHRoZSBlbGVtZW50IG5hbWUuXG4gICAqL1xuICBjc3M/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBpbiBweCBvciAlIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiAjIyUgb3IgIyNweFxuICAgKiBFeGFtcGxlczogJzUwJScsICc1MHB4J1xuICAgKi9cbiAgZ2V0IHdpZHRoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuICBzZXQgd2lkdGgodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fd2lkdGgpIHtcbiAgICAgIHRoaXMuX3BhcnNlZFdpZHRoID0gcGFyc2VTdHlsZVdpZHRoKHRoaXMuX3dpZHRoID0gdmFsdWUpO1xuICAgICAgY29uc3QgaXNGaXhlZFdpZHRoID0gdGhpcy5fcGFyc2VkV2lkdGggJiYgdGhpcy5fcGFyc2VkV2lkdGgudHlwZSA9PT0gJ3B4JztcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNGaXhlZFdpZHRoJywgeyB2YWx1ZTogaXNGaXhlZFdpZHRoLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIG1pbmltdW0gd2lkdGggaW4gcGl4ZWxzXG4gICAqIFRoaXMgaXMgYW4gYWJzb2x1dGUgdmFsdWUsIHRodXMgYSBudW1iZXIuXG4gICAqL1xuICBtaW5XaWR0aD86IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoaXMgbWF4aW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1heFdpZHRoPzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBBIHBsYWNlIHRvIHN0b3JlIHRoaW5ncy4uLlxuICAgKiBUaGlzIG11c3QgYmUgYW4gb2JqZWN0LCB2YWx1ZXMgYXJlIHNoYWRvdy1jb3BpZWQgc28gcGVyc2lzdCBkYXRhIGJldHdlZW4gbXVsdGlwbGUgcGx1Z2lucy5cbiAgICovXG4gIGRhdGE6IGFueSA9IHt9O1xuXG4gIGdldCBwYXJzZWRXaWR0aCgpOiB7IHZhbHVlOiBudW1iZXI7IHR5cGU6ICdweCcgfCAnJScgfSB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl9wYXJzZWRXaWR0aDsgfVxuXG4gIC8qKlxuICAgKiBUaGUgcHJvcGVydHkgdG8gZGlzcGxheSAoZnJvbSB0aGUgcm93IGVsZW1lbnQpXG4gICAqIFlvdSBjYW4gdXNlIGRvdCBub3RhdGlvbiB0byBkaXNwbGF5IGRlZXAgcGF0aHMuXG4gICAqL1xuICBwcm9wOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgcGF0aCB0byBhIG5lc3RlZCBvYmplY3QsIHJlbGF0aXZlIHRvIHRoZSByb3cgZWxlbWVudC5cbiAgICogVGhlIHRhYmxlIHdpbGwgZGlzcGxheSBgcHJvcGAgZnJvbSB0aGUgb2JqZWN0IHJlZmVyZW5jZWQgYnkgYHBhdGhgLlxuICAgKlxuICAgKiBZb3UgY2FuIGFsc28gdXNlIGRvdCBub3RhdGlvbiBkaXJlY3RseSBmcm9tIGBwcm9wYC5cbiAgICpcbiAgICogRXhhbXBsZTpcbiAgICogcHJvcDogXCJzdHJlZXRcIlxuICAgKiBwYXRoOiBbIFwibXlJbnN0YW5jZVwiLCBcInVzZXJcIiwgXCJhZGRyZXNzXCJcbiAgICpcbiAgICogaXMgaWRlbnRpY2FsIHRvOlxuICAgKiBwcm9wOiBcIm15SW5zdGFuY2UudXNlci5hZGRyZXNzLnN0cmVldFwiXG4gICAqXG4gICAqL1xuICBwYXRoPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSB2YWx1ZXMgaW4gdGhpcyBjb2x1bW4uXG4gICAqIFRoaXMgaXMgYW4gYWRkaXRpb25hbCBsZXZlbCBmb3IgbWF0Y2hpbmcgY29sdW1ucyB0byB0ZW1wbGF0ZXMsIGdyb3VwaW5nIHRlbXBsYXRlcyBmb3IgYSB0eXBlLlxuICAgKi9cbiAgdHlwZT86IFBibENvbHVtblR5cGVEZWZpbml0aW9uO1xuICBoZWFkZXJUeXBlPzogUGJsQ29sdW1uVHlwZURlZmluaXRpb247XG4gIGZvb3RlclR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcblxuICBzb3J0PzogYm9vbGVhbiB8IFBibE5ncmlkU29ydGVyO1xuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSBwcmVkaWNhdGUgZnVuY3Rpb24gdG8gZmlsdGVyIHJvd3MgdXNpbmcgdGhlIGN1cnJlbnQgY29sdW1uLlxuICAgKlxuICAgKiBWYWxpZCBvbmx5IHdoZW4gZmlsdGVyaW5nIGJ5IHZhbHVlLlxuICAgKiBTZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGZpbHRlcj86IERhdGFTb3VyY2VDb2x1bW5QcmVkaWNhdGU7XG5cbiAgLyoqXG4gICAqIE1hcmtzIHRoZSB0YWJsZSBhcyBlZGl0YWJsZS4gQW4gZWRpdGFibGUgY29sdW1uIGFsc28gcmVxdWlyZXMgYW4gZWRpdCB0ZW1wbGF0ZSB0byBxdWFsaWZ5IGFzIGVkaXRhYmxlLCB0aGlzIGZsYWcgYWxvbmUgaXMgbm90IGVub3VnaC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgZmxhZyBvbmx5IGVmZmVjdCB0aGUgQ1NTIGNsYXNzIGFkZGVkIHRvIHRoZSBjZWxsLlxuICAgKi9cbiAgZWRpdGFibGU6IGJvb2xlYW47XG5cbiAgcGluOiAnc3RhcnQnIHwgJ2VuZCcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gVE9ETygxLjAuMCk6IHJlbW92ZVxuICAvKiogQGRlcHJlY2F0ZWQgQlJFQUtJTkcgQ0hBTkdFIDEuMC4wIC0gVXNlIGBhbGlhc2AgaW5zdGVhZC4gKi9cbiAgZ2V0IHNvcnRBbGlhcygpOiBzdHJpbmcgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5hbGlhczsgfVxuICBzZXQgc29ydEFsaWFzKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5hbGlhcyA9IHZhbHVlOyB9XG5cbiAgLyoqXG4gICAqIEFuIGFsaWFzIHVzZWQgdG8gaWRlbnRpZnkgdGhlIGNvbHVtbi5cbiAgICogVXNlZnVsIHdoZW4gdGhlIHNlcnZlciBwcm92aWRlcyBzb3J0L2ZpbHRlciBtZXRhZGF0YSB0aGF0IGRvZXMgbm90IGhhdmUgYSAxOjEgbWF0Y2ggd2l0aCB0aGUgY29sdW1uIG5hbWVzLlxuICAgKiBlLmcuIERlZXAgcGF0aCBwcm9wcywgcHJvcGVydHkgbmFtZSBjb252ZW50aW9uIG1pc21hdGNoLCBldGMuLi5cbiAgICovXG4gIGFsaWFzPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBPcHRpb25hbCB0cmFuc2Zvcm1lciB0aGF0IGNvbnRyb2wgdGhlIHZhbHVlIG91dHB1dCBmcm9tIHRoZSBjb21iaW5hdGlvbiBvZiBhIGNvbHVtbiBhbmQgYSByb3cuXG4gICAqIFRoZSB2YWx1ZSByZXR1cm5lZCBmcm9tIHRoaXMgdHJhbnNmb3JtZXIgd2lsbCBiZSByZXR1cm5lZCBmcm9tIGBQYmxDb2x1bW4uZ2V0VmFsdWVgXG4gICAqL1xuICB0cmFuc2Zvcm0/OiAodmFsdWU6IGFueSwgcm93PzogYW55LCBjb2w/OiBQYmxDb2x1bW4pID0+IGFueTtcblxuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIHZhbHVlIG9mIGBwcm9wYC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBvcmdQcm9wOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGN1c3RvbSBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY2VsbFRwbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxhbnk+PjtcbiAgICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgY3VzdG9tIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlZGl0b3JUcGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8YW55Pj47XG4gIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBhIGN1c3RvbSBoZWFkZXIgY2VsbCB0ZW1wbGF0ZSwgb3IgdGhlIGRlZmF1bHQgd2hlbiBub3Qgc2V0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGhlYWRlckNlbGxUcGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4+O1xuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgYSBjdXN0b20gZm9vdGVyIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBmb290ZXJDZWxsVHBsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnk+PjtcblxuICAvKipcbiAgICogVXNlZCBieSB0aGUgbGlicmFyeSBhcyBhIGxvZ2ljYWwgZmxhZyByZXByZXNlbnRpbmcgdGhlIGNvbHVtbiBoaWRkZW4gc3RhdGUuXG4gICAqIFRoaXMgZmxhZyBkb2VzIG5vdCBlZmZlY3QgdGhlIFVJLCBjaGFuZ2luZyBpdCB3aWxsIG5vdCBjaGFuZ2UgaGUgaGlkZGVuIHN0YXRlIGluIHRoZSBVSS5cbiAgICogRG8gbm90IHNldCB0aGlzIHZhbHVlIG1hbnVhbGx5LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGhpZGRlbjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlIGluZGljYXRlcyB0aGF0IHRoZSB3aWR0aCBpcyBzZXQgd2l0aCB0eXBlIHBpeGVscy5cbiAgICogQGludGVybmFsXG4gICAqL1xuICByZWFkb25seSBpc0ZpeGVkV2lkdGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbiBvbi1kZW1hbmQgc2l6ZSBpbmZvIG9iamVjdCwgcG9wdWxhdGVkIGJ5IGBQYmxDb2x1bW5TaXplT2JzZXJ2ZXJgXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgc2l6ZUluZm8/OiBQYmxDb2x1bW5TaXplSW5mbztcblxuICAvKiogQGludGVybmFsICovXG4gIG1heFdpZHRoTG9jazogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWYgZm9yIHRoaXMgY29sdW1uLlxuICAgKi9cbiAgZ2V0IGNvbHVtbkRlZigpOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW4+IHsgcmV0dXJuIHRoaXMuX2NvbHVtbkRlZjsgfVxuXG4gIGdldCBncm91cHMoKTogc3RyaW5nW10geyByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLl9ncm91cHMudmFsdWVzKCkpOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBwdWJsaWMgcmVhZG9ubHkgZ3JvdXBTdG9yZTogUGJsQ29sdW1uR3JvdXBTdG9yZTtcblxuICBwcml2YXRlIF93aWR0aD86IHN0cmluZztcbiAgcHJpdmF0ZSBfcGFyc2VkV2lkdGg6IFJldHVyblR5cGU8dHlwZW9mIHBhcnNlU3R5bGVXaWR0aD47XG5cbiAgcHJpdmF0ZSBfY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW4+O1xuICBwcml2YXRlIGRlZmF1bHRXaWR0aCA9ICcnO1xuXG4gIC8qKlxuICAgKiBHcm91cHMgdGhhdCB0aGlzIGNvbHVtbiBiZWxvbmdzIHRvLlxuICAgKiBXQVJOSU5HOiBETyBOT1QgQUREL1JFTU9WRSBHUk9VUFMgRElSRUNUTFksIFVTRSBtYXJrSW5Hcm91cC9tYXJrTm90SW5Hcm91cC5cbiAgICovXG4gIHByaXZhdGUgX2dyb3VwcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKGRlZjogUGJsQ29sdW1uIHwgUGJsQ29sdW1uRGVmaW5pdGlvbiwgZ3JvdXBTdG9yZT86IFBibENvbHVtbkdyb3VwU3RvcmUpIHtcbiAgICB0aGlzW1BCTF9OR1JJRF9DT0xVTU5fTUFSS10gPSB0cnVlO1xuXG4gICAgaWYgKGlzUGJsQ29sdW1uKGRlZikpIHtcbiAgICAgIGluaXREZWZpbml0aW9ucyhkZWYsIHRoaXMpO1xuICAgICAgdGhpcy5wcm9wID0gZGVmLnByb3A7XG4gICAgICB0aGlzLnBhdGggPSBkZWYucGF0aDtcbiAgICAgIHRoaXMub3JnUHJvcCA9IGRlZi5vcmdQcm9wO1xuICAgICAgdGhpcy5ncm91cFN0b3JlID0gZ3JvdXBTdG9yZSB8fCBkZWYuZ3JvdXBTdG9yZTtcbiAgICAgIHRoaXMuX2dyb3VwcyA9IG5ldyBTZXQ8c3RyaW5nPihkZWYuX2dyb3Vwcyk7XG4gICAgICBmb3IgKGNvbnN0IGlkIG9mIEFycmF5LmZyb20oZGVmLl9ncm91cHMudmFsdWVzKCkpKSB7XG4gICAgICAgIGNvbnN0IGcgPSB0aGlzLmdyb3VwU3RvcmUuZmluZChpZCk7XG4gICAgICAgIGlmIChnKSB7XG4gICAgICAgICAgdGhpcy5tYXJrSW5Hcm91cChnKTtcbiAgICAgICAgICBnLnJlcGxhY2UodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcGF0aCA9IGRlZi5wYXRoIHx8IGRlZi5wcm9wLnNwbGl0KCcuJyk7XG4gICAgICBjb25zdCBwcm9wID0gZGVmLnBhdGggPyBkZWYucHJvcCA6IHBhdGgucG9wKCk7XG5cbiAgICAgIGRlZiA9IE9iamVjdC5jcmVhdGUoZGVmKTtcbiAgICAgIGRlZi5pZCA9IGRlZi5pZCB8fCBkZWYucHJvcCB8fCBkZWYubGFiZWw7XG4gICAgICBkZWYubGFiZWwgPSAnbGFiZWwnIGluIGRlZiA/IGRlZi5sYWJlbCA6IHByb3A7XG5cbiAgICAgIGlmICh0eXBlb2YgZGVmLnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRlZi50eXBlID0geyBuYW1lOiBkZWYudHlwZSB9IGFzIGFueTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZGVmLmhlYWRlclR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRlZi5oZWFkZXJUeXBlID0geyBuYW1lOiBkZWYuaGVhZGVyVHlwZSB9IGFzIGFueTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgZGVmLmZvb3RlclR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRlZi5mb290ZXJUeXBlID0geyBuYW1lOiBkZWYuZm9vdGVyVHlwZSB9IGFzIGFueTtcbiAgICAgIH1cblxuICAgICAgaW5pdERlZmluaXRpb25zKGRlZiwgdGhpcyk7XG5cbiAgICAgIHRoaXMuZ3JvdXBTdG9yZSA9IGdyb3VwU3RvcmUgfHwgbmV3IFBibENvbHVtbkdyb3VwU3RvcmUoKTtcbiAgICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgICB0aGlzLm9yZ1Byb3AgPSBkZWYucHJvcDtcbiAgICAgIGlmIChwYXRoLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoY29uc3QgcHJvcCBvZiBDTE9ORV9QUk9QRVJUSUVTKSB7XG4gICAgICBpZiAocHJvcCBpbiBkZWYpIHtcbiAgICAgICAgdGhpc1twcm9wIGFzIGFueV0gPSBkZWZbcHJvcF1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZXh0ZW5kUHJvcGVydHkobmFtZToga2V5b2YgUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgaWYgKENMT05FX1BST1BFUlRJRVMuaW5kZXhPZihuYW1lKSA9PT0gLTEpIHtcbiAgICAgIENMT05FX1BST1BFUlRJRVMucHVzaChuYW1lKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2goY29sdW1uRGVmOiBQYmxOZ3JpZENvbHVtbkRlZjxQYmxDb2x1bW4+KTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2goKTtcbiAgICB0aGlzLl9jb2x1bW5EZWYgPSBjb2x1bW5EZWY7XG4gICAgaWYgKHRoaXMuZGVmYXVsdFdpZHRoKSB7XG4gICAgICB0aGlzLmNvbHVtbkRlZi51cGRhdGVXaWR0aCh0aGlzLndpZHRoIHx8IHRoaXMuZGVmYXVsdFdpZHRoLCAnYXR0YWNoJyk7XG4gICAgfVxuICB9XG5cbiAgZGV0YWNoKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbHVtbkRlZiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHNldERlZmF1bHRXaWR0aChkZWZhdWx0V2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGVmYXVsdFdpZHRoID0gZGVmYXVsdFdpZHRoO1xuICB9XG5cbiAgdXBkYXRlV2lkdGgod2lkdGg/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAod2lkdGgpIHtcbiAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB9XG4gICAgY29uc3QgeyBjb2x1bW5EZWYgfSA9IHRoaXM7XG4gICAgaWYgKGNvbHVtbkRlZikge1xuICAgICAgY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgdGhpcy5kZWZhdWx0V2lkdGggfHwgJycsICd1cGRhdGUnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2YWx1ZSB0aGlzIGNvbHVtbiBwb2ludHMgdG8gaW4gdGhlIHByb3ZpZGVkIHJvd1xuICAgKi9cbiAgZ2V0VmFsdWU8VCA9IGFueT4ocm93OiBhbnkpOiBUIHtcbiAgICBpZiAodGhpcy50cmFuc2Zvcm0pIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybShkZWVwUGF0aEdldChyb3csIHRoaXMpLCByb3csIHRoaXMpO1xuICAgIH1cbiAgICByZXR1cm4gZGVlcFBhdGhHZXQocm93LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSB2YWx1ZSBpbiB0aGUgcHJvdmlkZWQgcm93IHdoZXJlIHRoaXMgY29sdW1uIHBvaW50cyB0b1xuICAgKi9cbiAgc2V0VmFsdWUocm93OiBhbnksIHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICByZXR1cm4gZGVlcFBhdGhTZXQocm93LCB0aGlzLCB2YWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogTWFyaydzIHRoYXQgdGhpcyBjb2x1bW4gYmVsb25nIHRvIHRoZSBwcm92aWRlZCBncm91cC5cbiAgICogXFw+IE5vdGUgdGhhdCB0aGlzIGludGVybmFsIHRvIHRoZSBjb2x1bW4gYW5kIGRvZXMgbm90IGVmZmVjdCB0aGUgZ3JvdXAgaW4gYW55IHdheS5cbiAgICovXG4gIG1hcmtJbkdyb3VwKGc6IFBibENvbHVtbkdyb3VwKTogdm9pZCB7XG4gICAgdGhpcy5ncm91cFN0b3JlLmF0dGFjaChnLCB0aGlzKTtcbiAgICB0aGlzLl9ncm91cHMuYWRkKGcuaWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsncyB0aGF0IHRoaXMgY29sdW1uIGRvZXMgbm90IGJlbG9uZyB0byB0aGUgcHJvdmlkZWQgZ3JvdXAuXG4gICAqIFxcPiBOb3RlIHRoYXQgdGhpcyBpbnRlcm5hbCB0byB0aGUgY29sdW1uIGFuZCBkb2VzIG5vdCBlZmZlY3QgdGhlIGdyb3VwIGluIGFueSB3YXkuXG4gICAqL1xuICBtYXJrTm90SW5Hcm91cChnOiBQYmxDb2x1bW5Hcm91cCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuZ3JvdXBTdG9yZS5kZXRhY2goZywgdGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuX2dyb3Vwcy5kZWxldGUoZy5pZCk7XG4gIH1cblxuICBpc0luR3JvdXAoZzogUGJsQ29sdW1uR3JvdXApOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBzLmhhcyhnLmlkKTtcbiAgfVxuXG4gIGdldEdyb3VwT2ZSb3cocm93SW5kZXg6IG51bWJlcik6IFBibENvbHVtbkdyb3VwIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBncm91cElkcyA9IHRoaXMuZ3JvdXBzO1xuICAgIGZvciAoY29uc3QgaWQgb2YgZ3JvdXBJZHMpIHtcbiAgICAgIGNvbnN0IGcgPSB0aGlzLmdyb3VwU3RvcmUuZmluZChpZCk7XG4gICAgICBpZiAoZyAmJiBnLnJvd0luZGV4ID09PSByb3dJbmRleCkge1xuICAgICAgICByZXR1cm4gZztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBncm91cExvZ2ljKGNvbHVtbkdyb3VwczogW1BibENvbHVtbkdyb3VwLCBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBdLCBncm91cEV4aXN0czogYm9vbGVhbik6IFBibENvbHVtbkdyb3VwIHtcbiAgICBjb25zdCBbZ1ByZXYsIGdDdXJyLCBnTmV4dF0gPSBjb2x1bW5Hcm91cHM7XG5cbiAgICAvLyBTVEFURTogVGhpcyBjb2x1bW4gaGFzIHNhbWUgZ3JvdXAgb2YgcHJldmlvdXMgY29sdW1uLCBub3RoaW5nIHRvIGRvLlxuICAgIGlmIChnQ3VyciA9PT0gZ1ByZXYpIHtcbiAgICAgIHJldHVybiBnQ3VycjtcbiAgICB9XG5cbiAgICAvLyBTVEFURTogVGhlIGdyb3VwIGV4aXN0cyBpbiBvbmUgb2YgdGhlIGNvbHVtbnMgQlVUIE5PVCBpbiB0aGUgTEFTVCBDT0xVTU4gKGkuZTogSXRzIGEgc2xhdmUgc3BsaXQpXG4gICAgaWYgKGdyb3VwRXhpc3RzKSB7XG4gICAgICAvLyBJZiB0aGUgcHJldmlvdXMgc2libGluZyBncm91cCBpcyBhIHNsYXZlIGFuZCB0aGlzIGdyb3VwIGlzIHRoZSBvcmlnaW4gb2YgdGhlIHNsYXZlLCBjb252ZXJ0IHRoaXMgZ3JvdXAgdG8gdGhlIHNsYXZlLlxuICAgICAgaWYgKGdQcmV2ICYmIGdDdXJyID09PSBnUHJldi5zbGF2ZU9mKSB7XG4gICAgICAgIHJldHVybiBnUHJldjtcbiAgICAgIH1cbiAgICAgIGlmIChnTmV4dCAmJiBnQ3VyciA9PT0gZ05leHQuc2xhdmVPZikge1xuICAgICAgICByZXR1cm4gZ05leHQ7XG4gICAgICB9XG4gICAgICAvLyBPdGhlcndpc2UgY3JlYXRlIHRoZSBzbGF2ZS5cbiAgICAgIGNvbnN0IGcgPSBnQ3Vyci5jcmVhdGVTbGF2ZShbdGhpc10pO1xuICAgICAgdGhpcy5ncm91cFN0b3JlLmFkZChnKTtcblxuICAgICAgLy8gSWYgdGhlIGN1cnJlbnQgZ3JvdXAgaXMgYSBwbGFjZWhvbGRlciBhbmQgZWl0aGVyIHRoZSBwcmV2aW91cyBPUiBuZXh0IHNpYmxpbmcgZ3JvdXAgaXMgYSBwbGFjZWhvbGRlciBhcyB3ZWxsXG4gICAgICAvLyB3ZSB3YW50IHRvIGdyb3VwIHRoZW0gdG9nZXRoZXIsIGFsdGhvdWdoIHRoZXkgYXJlIG5vdCByZWxhdGVkLCBiZWNhdXNlIHRoZXkgYm90aCBoYXZlIGlkZW50aWNhbCBoZWFkZXJzIChlbXB0eSBoZWFkZXIpLlxuICAgICAgLy8gTm90ZSB0aGF0IHdlIHN0aWxsIGNyZWF0ZSB0aGUgc2FsdmUsIHdlIGp1c3QgZG9uJ3QgdXNlIGl0LlxuICAgICAgaWYgKGdDdXJyLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGNvbnN0IHByZXZQSCA9IGdQcmV2ICYmIGdQcmV2LnBsYWNlaG9sZGVyO1xuICAgICAgICBjb25zdCBuZXh0UEggPSBnTmV4dCAmJiBnTmV4dC5zbGF2ZU9mICYmIGdOZXh0LnBsYWNlaG9sZGVyO1xuICAgICAgICBjb25zdCBncm91cFdpdGhQbGFjZWhvbGRlciA9IHByZXZQSCA/IGdQcmV2IDogbmV4dFBIID8gZ05leHQgOiB1bmRlZmluZWQ7XG4gICAgICAgIC8vIGNvbnN0IGdyb3VwV2l0aFBsYWNlaG9sZGVyID0gcHJldlBIICYmIGdQcmV2O1xuICAgICAgICBpZiAoZ3JvdXBXaXRoUGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICByZXR1cm4gZ3JvdXBXaXRoUGxhY2Vob2xkZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGc7XG4gICAgfVxuICAgIC8vIFNUQVRFOiBUaGUgZ3JvdXAgSVMgYSBzbGF2ZSBhbmQgaXQgaXMgc2V0IEFGVEVSIGFuIGl0ZW0gdGhhdCBiZWxvbmdzIHRvIHRoZSBncm91cCBpdCBpcyBzbGF2ZSBvZi5cbiAgICBlbHNlIGlmIChnQ3Vyci5zbGF2ZU9mICYmIGdQcmV2KSB7XG4gICAgICBpZiAoZ0N1cnIuc2xhdmVPZiA9PT0gZ1ByZXYpIHtcbiAgICAgICAgcmV0dXJuIGdDdXJyLnNsYXZlT2Y7XG4gICAgICB9XG4gICAgICBpZiAoZ0N1cnIuc2xhdmVPZiA9PT0gZ1ByZXYuc2xhdmVPZikge1xuICAgICAgICByZXR1cm4gZ1ByZXY7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFNUQVRFOiBUaGUgZ3JvdXAgSVMgYSBzbGF2ZSBhbmQgaXQgaXMgc2V0IEJFRk9SRSBhbiBpdGVtIHRoYXQgYmVsb25ncyB0byB0aGUgZ3JvdXAgaXQgaXMgc2xhdmUgb2YuXG4gICAgZWxzZSBpZiAoZ0N1cnIuc2xhdmVPZiAmJiBnTmV4dCkge1xuICAgICAgaWYgKGdDdXJyLnNsYXZlT2YgPT09IGdOZXh0KSB7XG4gICAgICAgIHJldHVybiBnQ3Vyci5zbGF2ZU9mO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZ0N1cnI7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBpZiB0aGUgY29sdW1uIHdpZHRoIGlzIGxvY2tlZCBieSBhIG1heGltdW0gYnkgY2hlY2tpbmcgaWYgdGhlIGdpdmVuIHdpZHRoIGlzIGVxdWFsIHRvIHRoZSBtYXggd2lkdGguXG4gICAqIElmIHRoZSByZXN1bHQgb2YgdGhlIGNhbGN1bGF0aW9uICh0cnVlL2ZhbHNlKSBkb2VzIG5vdCBlcXVhbCB0aGUgcHJldmlvdXMgbG9jayBzdGF0ZSBpdCB3aWxsIHNldCB0aGUgbmV3IGxvY2sgc3RhdGVcbiAgICogYW5kIHJldHVybiB0cnVlLlxuICAgKiBPdGhlcndpc2UgcmV0dXJuIGZhbHNlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGNoZWNrTWF4V2lkdGhMb2NrKGFjdHVhbFdpZHRoOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAoYWN0dWFsV2lkdGggPT09IHRoaXMubWF4V2lkdGgpIHtcbiAgICAgIGlmICghdGhpcy5tYXhXaWR0aExvY2spIHtcbiAgICAgICAgdGhpcy5tYXhXaWR0aExvY2sgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMubWF4V2lkdGhMb2NrKSB7XG4gICAgICB0aGlzLm1heFdpZHRoTG9jayA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG59XG4iXX0=