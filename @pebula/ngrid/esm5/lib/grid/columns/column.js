/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { deepPathGet, deepPathSet } from '../utils';
import { initDefinitions, parseStyleWidth } from './utils';
import { PblColumnGroupStore } from './group-column';
/** @type {?} */
var PBL_NGRID_COLUMN_MARK = Symbol('PblColumn');
/** @type {?} */
var CLONE_PROPERTIES = ['pIndex', 'transform', 'filter', 'sort', 'alias', 'headerType', 'footerType', 'pin'];
/**
 * @param {?} def
 * @return {?}
 */
export function isPblColumn(def) {
    return def instanceof PblColumn || (def && def[PBL_NGRID_COLUMN_MARK] === true);
}
var PblColumn = /** @class */ (function () {
    function PblColumn(def, groupStore) {
        var e_1, _a, e_2, _b;
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
            try {
                for (var _c = tslib_1.__values(Array.from(def._groups.values())), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var id = _d.value;
                    /** @type {?} */
                    var g = this.groupStore.find(id);
                    if (g) {
                        this.markInGroup(g);
                        g.replace(this);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            /** @type {?} */
            var path = def.path || def.prop.split('.');
            /** @type {?} */
            var prop = def.path ? def.prop : path.pop();
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
        try {
            for (var CLONE_PROPERTIES_1 = tslib_1.__values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                var prop = CLONE_PROPERTIES_1_1.value;
                if (prop in def) {
                    this[(/** @type {?} */ (prop))] = def[prop];
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
    }
    Object.defineProperty(PblColumn.prototype, "width", {
        /**
         * The width in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         */
        get: /**
         * The width in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         * @return {?}
         */
        function () { return this._width; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._width) {
                this._parsedWidth = parseStyleWidth(this._width = value);
                /** @type {?} */
                var isFixedWidth = this._parsedWidth && this._parsedWidth.type === 'px';
                Object.defineProperty(this, 'isFixedWidth', { value: isFixedWidth, configurable: true });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumn.prototype, "parsedWidth", {
        get: /**
         * @return {?}
         */
        function () { return this._parsedWidth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumn.prototype, "sortAlias", {
        // TODO(1.0.0): remove
        /** @deprecated BREAKING CHANGE 1.0.0 - Use `alias` instead. */
        get: 
        // TODO(1.0.0): remove
        /**
         * @deprecated BREAKING CHANGE 1.0.0 - Use `alias` instead.
         * @return {?}
         */
        function () { return this.alias; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.alias = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumn.prototype, "columnDef", {
        /**
         * The column def for this column.
         */
        get: /**
         * The column def for this column.
         * @return {?}
         */
        function () { return this._columnDef; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumn.prototype, "groups", {
        get: /**
         * @return {?}
         */
        function () { return Array.from(this._groups.values()); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} name
     * @return {?}
     */
    PblColumn.extendProperty = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (CLONE_PROPERTIES.indexOf(name) === -1) {
            CLONE_PROPERTIES.push(name);
        }
    };
    /**
     * @param {?} columnDef
     * @return {?}
     */
    PblColumn.prototype.attach = /**
     * @param {?} columnDef
     * @return {?}
     */
    function (columnDef) {
        this.detach();
        this._columnDef = columnDef;
        if (this.defaultWidth) {
            this.columnDef.updateWidth(this.width || this.defaultWidth, 'attach');
        }
    };
    /**
     * @return {?}
     */
    PblColumn.prototype.detach = /**
     * @return {?}
     */
    function () {
        this._columnDef = undefined;
    };
    /**
     * @param {?} defaultWidth
     * @return {?}
     */
    PblColumn.prototype.setDefaultWidth = /**
     * @param {?} defaultWidth
     * @return {?}
     */
    function (defaultWidth) {
        this.defaultWidth = defaultWidth;
    };
    /**
     * @param {?=} width
     * @return {?}
     */
    PblColumn.prototype.updateWidth = /**
     * @param {?=} width
     * @return {?}
     */
    function (width) {
        if (width) {
            this.width = width;
        }
        var columnDef = this.columnDef;
        if (columnDef) {
            columnDef.updateWidth(this.width || this.defaultWidth || '', 'update');
        }
    };
    /**
     * Get the value this column points to in the provided row
     */
    /**
     * Get the value this column points to in the provided row
     * @template T
     * @param {?} row
     * @return {?}
     */
    PblColumn.prototype.getValue = /**
     * Get the value this column points to in the provided row
     * @template T
     * @param {?} row
     * @return {?}
     */
    function (row) {
        if (this.transform) {
            return this.transform(deepPathGet(row, this), row, this);
        }
        return deepPathGet(row, this);
    };
    /**
     * Set a value in the provided row where this column points to
     */
    /**
     * Set a value in the provided row where this column points to
     * @param {?} row
     * @param {?} value
     * @return {?}
     */
    PblColumn.prototype.setValue = /**
     * Set a value in the provided row where this column points to
     * @param {?} row
     * @param {?} value
     * @return {?}
     */
    function (row, value) {
        return deepPathSet(row, this, value);
    };
    /**
     * Mark's that this column belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     */
    /**
     * Mark's that this column belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    PblColumn.prototype.markInGroup = /**
     * Mark's that this column belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    function (g) {
        this.groupStore.attach(g, this);
        this._groups.add(g.id);
    };
    /**
     * Mark's that this column does not belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     */
    /**
     * Mark's that this column does not belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    PblColumn.prototype.markNotInGroup = /**
     * Mark's that this column does not belong to the provided group.
     * \> Note that this internal to the column and does not effect the group in any way.
     * @param {?} g
     * @return {?}
     */
    function (g) {
        this.groupStore.detach(g, this);
        return this._groups.delete(g.id);
    };
    /**
     * @param {?} g
     * @return {?}
     */
    PblColumn.prototype.isInGroup = /**
     * @param {?} g
     * @return {?}
     */
    function (g) {
        return this._groups.has(g.id);
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    PblColumn.prototype.getGroupOfRow = /**
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        var e_3, _a;
        /** @type {?} */
        var groupIds = this.groups;
        try {
            for (var groupIds_1 = tslib_1.__values(groupIds), groupIds_1_1 = groupIds_1.next(); !groupIds_1_1.done; groupIds_1_1 = groupIds_1.next()) {
                var id = groupIds_1_1.value;
                /** @type {?} */
                var g = this.groupStore.find(id);
                if (g && g.rowIndex === rowIndex) {
                    return g;
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (groupIds_1_1 && !groupIds_1_1.done && (_a = groupIds_1.return)) _a.call(groupIds_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?} columnGroups
     * @param {?} groupExists
     * @return {?}
     */
    PblColumn.prototype.groupLogic = /**
     * @param {?} columnGroups
     * @param {?} groupExists
     * @return {?}
     */
    function (columnGroups, groupExists) {
        var _a = tslib_1.__read(columnGroups, 3), gPrev = _a[0], gCurr = _a[1], gNext = _a[2];
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
            var g = gCurr.createSlave([this]);
            this.groupStore.add(g);
            // If the current group is a placeholder and either the previous OR next sibling group is a placeholder as well
            // we want to group them together, although they are not related, because they both have identical headers (empty header).
            // Note that we still create the salve, we just don't use it.
            if (gCurr.placeholder) {
                /** @type {?} */
                var prevPH = gPrev && gPrev.placeholder;
                /** @type {?} */
                var nextPH = gNext && gNext.slaveOf && gNext.placeholder;
                /** @type {?} */
                var groupWithPlaceholder = prevPH ? gPrev : nextPH ? gNext : undefined;
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
    };
    /**
     * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
     * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
     * and return true.
     * Otherwise return false.
     * @internal
     */
    /**
     * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
     * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
     * and return true.
     * Otherwise return false.
     * \@internal
     * @param {?} actualWidth
     * @return {?}
     */
    PblColumn.prototype.checkMaxWidthLock = /**
     * Calculates if the column width is locked by a maximum by checking if the given width is equal to the max width.
     * If the result of the calculation (true/false) does not equal the previous lock state it will set the new lock state
     * and return true.
     * Otherwise return false.
     * \@internal
     * @param {?} actualWidth
     * @return {?}
     */
    function (actualWidth) {
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
    };
    return PblColumn;
}());
export { PblColumn };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbHVtbnMvY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFJcEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDM0QsT0FBTyxFQUFrQixtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztJQUUvRCxxQkFBcUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDOztJQUMzQyxnQkFBZ0IsR0FBMkIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDOzs7OztBQUV0SSxNQUFNLFVBQVUsV0FBVyxDQUFDLEdBQVE7SUFDbEMsT0FBTyxHQUFHLFlBQVksU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQ2xGLENBQUM7QUFFRDtJQTBMRSxtQkFBWSxHQUFvQyxFQUFFLFVBQWdDOzs7Ozs7UUEvSWxGLFNBQUksR0FBUSxFQUFFLENBQUM7UUF1SVAsaUJBQVksR0FBRyxFQUFFLENBQUM7Ozs7O1FBTWxCLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBR2xDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVuQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwQixlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJ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eUJBQStCOztJQUMvQiwrQkFBcUM7O0lBQ3JDLCtCQUFxQzs7SUFFckMseUJBQWdDOzs7Ozs7OztJQVFoQywyQkFBbUM7Ozs7Ozs7SUFPbkMsNkJBQWtCOztJQUVsQix3QkFBaUM7Ozs7Ozs7SUFZakMsMEJBQWU7Ozs7OztJQU1mLDhCQUE0RDs7Ozs7O0lBTTVELDRCQUFnQjs7Ozs7O0lBTWhCLDRCQUErQzs7Ozs7O0lBSy9DLDhCQUFpRDs7Ozs7O0lBS2pELGtDQUF5RDs7Ozs7O0lBS3pELGtDQUF5RDs7Ozs7Ozs7SUFRekQsMkJBQWdCOzs7Ozs7SUFNaEIsaUNBQWdDOzs7Ozs7SUFNaEMsNkJBQTZCOzs7OztJQUc3QixpQ0FBc0I7Ozs7O0lBVXRCLCtCQUFnRDs7Ozs7SUFFaEQsMkJBQXdCOzs7OztJQUN4QixpQ0FBeUQ7Ozs7O0lBRXpELCtCQUFpRDs7Ozs7SUFDakQsaUNBQTBCOzs7Ozs7O0lBTTFCLDRCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERhdGFTb3VyY2VDb2x1bW5QcmVkaWNhdGUsIFBibE5ncmlkU29ydGVyIH0gZnJvbSAnLi4vLi4vZGF0YS1zb3VyY2UvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb2x1bW5EZWYgfSBmcm9tICcuLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7IGRlZXBQYXRoR2V0LCBkZWVwUGF0aFNldCB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IFBibENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbkRlZmluaXRpb24sIFBibENvbHVtblR5cGVEZWZpbml0aW9uIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBpbml0RGVmaW5pdGlvbnMsIHBhcnNlU3R5bGVXaWR0aCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXAsIFBibENvbHVtbkdyb3VwU3RvcmUgfSBmcm9tICcuL2dyb3VwLWNvbHVtbic7XG5cbmNvbnN0IFBCTF9OR1JJRF9DT0xVTU5fTUFSSyA9IFN5bWJvbCgnUGJsQ29sdW1uJyk7XG5jb25zdCBDTE9ORV9QUk9QRVJUSUVTOiBBcnJheTxrZXlvZiBQYmxDb2x1bW4+ID0gWydwSW5kZXgnLCAndHJhbnNmb3JtJywgJ2ZpbHRlcicsICdzb3J0JywgJ2FsaWFzJywgJ2hlYWRlclR5cGUnLCAnZm9vdGVyVHlwZScsICdwaW4nXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGJsQ29sdW1uKGRlZjogYW55KTogZGVmIGlzIFBibENvbHVtbiB7XG4gIHJldHVybiBkZWYgaW5zdGFuY2VvZiBQYmxDb2x1bW4gfHwgKGRlZiAmJiBkZWZbUEJMX05HUklEX0NPTFVNTl9NQVJLXSA9PT0gdHJ1ZSk7XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW4gaW1wbGVtZW50cyBQYmxDb2x1bW5EZWZpbml0aW9uIHtcbiAgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogV2hlbiBzZXQsIGRlZmluZXMgdGhpcyBjb2x1bW4gYXMgdGhlIHByaW1hcnkgaW5kZXggb2YgdGhlIGRhdGEtc2V0IHdpdGggYWxsIHZhbHVlcyBpbiB0aGlzIGNvbHVtbiBiZWluZyB1bmlxdWUuXG4gICAqL1xuICBwSW5kZXg/OiBib29sZWFuO1xuXG4gIGxhYmVsPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDU1MgY2xhc3MgdGhhdCBnZXQgYXBwbGllZCBvbiB0aGUgaGVhZGVyIGFuZCBjZWxsLlxuICAgKiBZb3UgY2FuIGFwcGx5IHVuaXF1ZSBoZWFkZXIvY2VsbCBzdHlsZXMgdXNpbmcgdGhlIGVsZW1lbnQgbmFtZS5cbiAgICovXG4gIGNzcz86IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHdpZHRoIGluIHB4IG9yICUgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6ICMjJSBvciAjI3B4XG4gICAqIEV4YW1wbGVzOiAnNTAlJywgJzUwcHgnXG4gICAqL1xuICBnZXQgd2lkdGgoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3dpZHRoOyB9XG4gIHNldCB3aWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl93aWR0aCkge1xuICAgICAgdGhpcy5fcGFyc2VkV2lkdGggPSBwYXJzZVN0eWxlV2lkdGgodGhpcy5fd2lkdGggPSB2YWx1ZSk7XG4gICAgICBjb25zdCBpc0ZpeGVkV2lkdGggPSB0aGlzLl9wYXJzZWRXaWR0aCAmJiB0aGlzLl9wYXJzZWRXaWR0aC50eXBlID09PSAncHgnO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0ZpeGVkV2lkdGgnLCB7IHZhbHVlOiBpc0ZpeGVkV2lkdGgsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgbWluaW11bSB3aWR0aCBpbiBwaXhlbHNcbiAgICogVGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSwgdGh1cyBhIG51bWJlci5cbiAgICovXG4gIG1pbldpZHRoPzogbnVtYmVyO1xuICAvKipcbiAgICogVGhpcyBtYXhpbXVtIHdpZHRoIGluIHBpeGVsc1xuICAgKiBUaGlzIGlzIGFuIGFic29sdXRlIHZhbHVlLCB0aHVzIGEgbnVtYmVyLlxuICAgKi9cbiAgbWF4V2lkdGg/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEEgcGxhY2UgdG8gc3RvcmUgdGhpbmdzLi4uXG4gICAqIFRoaXMgbXVzdCBiZSBhbiBvYmplY3QsIHZhbHVlcyBhcmUgc2hhZG93LWNvcGllZCBzbyBwZXJzaXN0IGRhdGEgYmV0d2VlbiBtdWx0aXBsZSBwbHVnaW5zLlxuICAgKi9cbiAgZGF0YTogYW55ID0ge307XG5cbiAgZ2V0IHBhcnNlZFdpZHRoKCk6IHsgdmFsdWU6IG51bWJlcjsgdHlwZTogJ3B4JyB8ICclJyB9IHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3BhcnNlZFdpZHRoOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0eSB0byBkaXNwbGF5IChmcm9tIHRoZSByb3cgZWxlbWVudClcbiAgICogWW91IGNhbiB1c2UgZG90IG5vdGF0aW9uIHRvIGRpc3BsYXkgZGVlcCBwYXRocy5cbiAgICovXG4gIHByb3A6IHN0cmluZztcblxuICAvKipcbiAgICogQSBwYXRoIHRvIGEgbmVzdGVkIG9iamVjdCwgcmVsYXRpdmUgdG8gdGhlIHJvdyBlbGVtZW50LlxuICAgKiBUaGUgdGFibGUgd2lsbCBkaXNwbGF5IGBwcm9wYCBmcm9tIHRoZSBvYmplY3QgcmVmZXJlbmNlZCBieSBgcGF0aGAuXG4gICAqXG4gICAqIFlvdSBjYW4gYWxzbyB1c2UgZG90IG5vdGF0aW9uIGRpcmVjdGx5IGZyb20gYHByb3BgLlxuICAgKlxuICAgKiBFeGFtcGxlOlxuICAgKiBwcm9wOiBcInN0cmVldFwiXG4gICAqIHBhdGg6IFsgXCJteUluc3RhbmNlXCIsIFwidXNlclwiLCBcImFkZHJlc3NcIlxuICAgKlxuICAgKiBpcyBpZGVudGljYWwgdG86XG4gICAqIHByb3A6IFwibXlJbnN0YW5jZS51c2VyLmFkZHJlc3Muc3RyZWV0XCJcbiAgICpcbiAgICovXG4gIHBhdGg/OiBzdHJpbmdbXTtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHZhbHVlcyBpbiB0aGlzIGNvbHVtbi5cbiAgICogVGhpcyBpcyBhbiBhZGRpdGlvbmFsIGxldmVsIGZvciBtYXRjaGluZyBjb2x1bW5zIHRvIHRlbXBsYXRlcywgZ3JvdXBpbmcgdGVtcGxhdGVzIGZvciBhIHR5cGUuXG4gICAqL1xuICB0eXBlPzogUGJsQ29sdW1uVHlwZURlZmluaXRpb247XG4gIGhlYWRlclR5cGU/OiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbjtcbiAgZm9vdGVyVHlwZT86IFBibENvbHVtblR5cGVEZWZpbml0aW9uO1xuXG4gIHNvcnQ/OiBib29sZWFuIHwgUGJsTmdyaWRTb3J0ZXI7XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHByZWRpY2F0ZSBmdW5jdGlvbiB0byBmaWx0ZXIgcm93cyB1c2luZyB0aGUgY3VycmVudCBjb2x1bW4uXG4gICAqXG4gICAqIFZhbGlkIG9ubHkgd2hlbiBmaWx0ZXJpbmcgYnkgdmFsdWUuXG4gICAqIFNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgZmlsdGVyPzogRGF0YVNvdXJjZUNvbHVtblByZWRpY2F0ZTtcblxuICAvKipcbiAgICogTWFya3MgdGhlIHRhYmxlIGFzIGVkaXRhYmxlLiBBbiBlZGl0YWJsZSBjb2x1bW4gYWxzbyByZXF1aXJlcyBhbiBlZGl0IHRlbXBsYXRlIHRvIHF1YWxpZnkgYXMgZWRpdGFibGUsIHRoaXMgZmxhZyBhbG9uZSBpcyBub3QgZW5vdWdoLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBmbGFnIG9ubHkgZWZmZWN0IHRoZSBDU1MgY2xhc3MgYWRkZWQgdG8gdGhlIGNlbGwuXG4gICAqL1xuICBlZGl0YWJsZTogYm9vbGVhbjtcblxuICBwaW46ICdzdGFydCcgfCAnZW5kJyB8IHVuZGVmaW5lZDtcblxuICAvLyBUT0RPKDEuMC4wKTogcmVtb3ZlXG4gIC8qKiBAZGVwcmVjYXRlZCBCUkVBS0lORyBDSEFOR0UgMS4wLjAgLSBVc2UgYGFsaWFzYCBpbnN0ZWFkLiAqL1xuICBnZXQgc29ydEFsaWFzKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLmFsaWFzOyB9XG4gIHNldCBzb3J0QWxpYXModmFsdWU6IHN0cmluZykgeyB0aGlzLmFsaWFzID0gdmFsdWU7IH1cblxuICAvKipcbiAgICogQW4gYWxpYXMgdXNlZCB0byBpZGVudGlmeSB0aGUgY29sdW1uLlxuICAgKiBVc2VmdWwgd2hlbiB0aGUgc2VydmVyIHByb3ZpZGVzIHNvcnQvZmlsdGVyIG1ldGFkYXRhIHRoYXQgZG9lcyBub3QgaGF2ZSBhIDE6MSBtYXRjaCB3aXRoIHRoZSBjb2x1bW4gbmFtZXMuXG4gICAqIGUuZy4gRGVlcCBwYXRoIHByb3BzLCBwcm9wZXJ0eSBuYW1lIGNvbnZlbnRpb24gbWlzbWF0Y2gsIGV0Yy4uLlxuICAgKi9cbiAgYWxpYXM/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIHRyYW5zZm9ybWVyIHRoYXQgY29udHJvbCB0aGUgdmFsdWUgb3V0cHV0IGZyb20gdGhlIGNvbWJpbmF0aW9uIG9mIGEgY29sdW1uIGFuZCBhIHJvdy5cbiAgICogVGhlIHZhbHVlIHJldHVybmVkIGZyb20gdGhpcyB0cmFuc2Zvcm1lciB3aWxsIGJlIHJldHVybmVkIGZyb20gYFBibENvbHVtbi5nZXRWYWx1ZWBcbiAgICovXG4gIHRyYW5zZm9ybT86ICh2YWx1ZTogYW55LCByb3c/OiBhbnksIGNvbD86IFBibENvbHVtbikgPT4gYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luYWwgdmFsdWUgb2YgYHByb3BgLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIG9yZ1Byb3A6IHN0cmluZztcblxuICAvKipcbiAgICogVXNlZCBieSBwYmwtbmdyaWQgdG8gYXBwbHkgY3VzdG9tIGNlbGwgdGVtcGxhdGUsIG9yIHRoZSBkZWZhdWx0IHdoZW4gbm90IHNldC5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBjZWxsVHBsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PGFueT4+O1xuICAgIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBjdXN0b20gY2VsbCB0ZW1wbGF0ZSwgb3IgdGhlIGRlZmF1bHQgd2hlbiBub3Qgc2V0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVkaXRvclRwbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxhbnk+PjtcbiAgLyoqXG4gICAqIFVzZWQgYnkgcGJsLW5ncmlkIHRvIGFwcGx5IGEgY3VzdG9tIGhlYWRlciBjZWxsIHRlbXBsYXRlLCBvciB0aGUgZGVmYXVsdCB3aGVuIG5vdCBzZXQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaGVhZGVyQ2VsbFRwbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pj47XG4gIC8qKlxuICAgKiBVc2VkIGJ5IHBibC1uZ3JpZCB0byBhcHBseSBhIGN1c3RvbSBmb290ZXIgY2VsbCB0ZW1wbGF0ZSwgb3IgdGhlIGRlZmF1bHQgd2hlbiBub3Qgc2V0LlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGZvb3RlckNlbGxUcGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4+O1xuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IHRoZSBsaWJyYXJ5IGFzIGEgbG9naWNhbCBmbGFnIHJlcHJlc2VudGluZyB0aGUgY29sdW1uIGhpZGRlbiBzdGF0ZS5cbiAgICogVGhpcyBmbGFnIGRvZXMgbm90IGVmZmVjdCB0aGUgVUksIGNoYW5naW5nIGl0IHdpbGwgbm90IGNoYW5nZSBoZSBoaWRkZW4gc3RhdGUgaW4gdGhlIFVJLlxuICAgKiBEbyBub3Qgc2V0IHRoaXMgdmFsdWUgbWFudWFsbHkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgaGlkZGVuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgaW5kaWNhdGVzIHRoYXQgdGhlIHdpZHRoIGlzIHNldCB3aXRoIHR5cGUgcGl4ZWxzLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIHJlYWRvbmx5IGlzRml4ZWRXaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEFuIG9uLWRlbWFuZCBzaXplIGluZm8gb2JqZWN0LCBwb3B1bGF0ZWQgYnkgYFBibENvbHVtblNpemVPYnNlcnZlcmBcbiAgICogQGludGVybmFsXG4gICAqL1xuICBzaXplSW5mbz86IFBibENvbHVtblNpemVJbmZvO1xuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbWF4V2lkdGhMb2NrOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZiBmb3IgdGhpcyBjb2x1bW4uXG4gICAqL1xuICBnZXQgY29sdW1uRGVmKCk6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj4geyByZXR1cm4gdGhpcy5fY29sdW1uRGVmOyB9XG5cbiAgZ2V0IGdyb3VwcygpOiBzdHJpbmdbXSB7IHJldHVybiBBcnJheS5mcm9tKHRoaXMuX2dyb3Vwcy52YWx1ZXMoKSk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIHB1YmxpYyByZWFkb25seSBncm91cFN0b3JlOiBQYmxDb2x1bW5Hcm91cFN0b3JlO1xuXG4gIHByaXZhdGUgX3dpZHRoPzogc3RyaW5nO1xuICBwcml2YXRlIF9wYXJzZWRXaWR0aDogUmV0dXJuVHlwZTx0eXBlb2YgcGFyc2VTdHlsZVdpZHRoPjtcblxuICBwcml2YXRlIF9jb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj47XG4gIHByaXZhdGUgZGVmYXVsdFdpZHRoID0gJyc7XG5cbiAgLyoqXG4gICAqIEdyb3VwcyB0aGF0IHRoaXMgY29sdW1uIGJlbG9uZ3MgdG8uXG4gICAqIFdBUk5JTkc6IERPIE5PVCBBREQvUkVNT1ZFIEdST1VQUyBESVJFQ1RMWSwgVVNFIG1hcmtJbkdyb3VwL21hcmtOb3RJbkdyb3VwLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ3JvdXBzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoZGVmOiBQYmxDb2x1bW4gfCBQYmxDb2x1bW5EZWZpbml0aW9uLCBncm91cFN0b3JlPzogUGJsQ29sdW1uR3JvdXBTdG9yZSkge1xuICAgIHRoaXNbUEJMX05HUklEX0NPTFVNTl9NQVJLXSA9IHRydWU7XG5cbiAgICBpZiAoaXNQYmxDb2x1bW4oZGVmKSkge1xuICAgICAgaW5pdERlZmluaXRpb25zKGRlZiwgdGhpcyk7XG4gICAgICB0aGlzLnByb3AgPSBkZWYucHJvcDtcbiAgICAgIHRoaXMucGF0aCA9IGRlZi5wYXRoO1xuICAgICAgdGhpcy5vcmdQcm9wID0gZGVmLm9yZ1Byb3A7XG4gICAgICB0aGlzLmdyb3VwU3RvcmUgPSBncm91cFN0b3JlIHx8IGRlZi5ncm91cFN0b3JlO1xuICAgICAgdGhpcy5fZ3JvdXBzID0gbmV3IFNldDxzdHJpbmc+KGRlZi5fZ3JvdXBzKTtcbiAgICAgIGZvciAoY29uc3QgaWQgb2YgQXJyYXkuZnJvbShkZWYuX2dyb3Vwcy52YWx1ZXMoKSkpIHtcbiAgICAgICAgY29uc3QgZyA9IHRoaXMuZ3JvdXBTdG9yZS5maW5kKGlkKTtcbiAgICAgICAgaWYgKGcpIHtcbiAgICAgICAgICB0aGlzLm1hcmtJbkdyb3VwKGcpO1xuICAgICAgICAgIGcucmVwbGFjZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwYXRoID0gZGVmLnBhdGggfHwgZGVmLnByb3Auc3BsaXQoJy4nKTtcbiAgICAgIGNvbnN0IHByb3AgPSBkZWYucGF0aCA/IGRlZi5wcm9wIDogcGF0aC5wb3AoKTtcblxuICAgICAgZGVmID0gT2JqZWN0LmNyZWF0ZShkZWYpO1xuICAgICAgZGVmLmlkID0gZGVmLmlkIHx8IGRlZi5wcm9wIHx8IGRlZi5sYWJlbDtcbiAgICAgIGRlZi5sYWJlbCA9ICdsYWJlbCcgaW4gZGVmID8gZGVmLmxhYmVsIDogcHJvcDtcblxuICAgICAgaWYgKHR5cGVvZiBkZWYudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGVmLnR5cGUgPSB7IG5hbWU6IGRlZi50eXBlIH0gYXMgYW55O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBkZWYuaGVhZGVyVHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGVmLmhlYWRlclR5cGUgPSB7IG5hbWU6IGRlZi5oZWFkZXJUeXBlIH0gYXMgYW55O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBkZWYuZm9vdGVyVHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZGVmLmZvb3RlclR5cGUgPSB7IG5hbWU6IGRlZi5mb290ZXJUeXBlIH0gYXMgYW55O1xuICAgICAgfVxuXG4gICAgICBpbml0RGVmaW5pdGlvbnMoZGVmLCB0aGlzKTtcblxuICAgICAgdGhpcy5ncm91cFN0b3JlID0gZ3JvdXBTdG9yZSB8fCBuZXcgUGJsQ29sdW1uR3JvdXBTdG9yZSgpO1xuICAgICAgdGhpcy5wcm9wID0gcHJvcDtcbiAgICAgIHRoaXMub3JnUHJvcCA9IGRlZi5wcm9wO1xuICAgICAgaWYgKHBhdGgubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucGF0aCA9IHBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBwcm9wIG9mIENMT05FX1BST1BFUlRJRVMpIHtcbiAgICAgIGlmIChwcm9wIGluIGRlZikge1xuICAgICAgICB0aGlzW3Byb3AgYXMgYW55XSA9IGRlZltwcm9wXVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBleHRlbmRQcm9wZXJ0eShuYW1lOiBrZXlvZiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgICBpZiAoQ0xPTkVfUFJPUEVSVElFUy5pbmRleE9mKG5hbWUpID09PSAtMSkge1xuICAgICAgQ0xPTkVfUFJPUEVSVElFUy5wdXNoKG5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGF0dGFjaChjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj4pOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMuX2NvbHVtbkRlZiA9IGNvbHVtbkRlZjtcbiAgICBpZiAodGhpcy5kZWZhdWx0V2lkdGgpIHtcbiAgICAgIHRoaXMuY29sdW1uRGVmLnVwZGF0ZVdpZHRoKHRoaXMud2lkdGggfHwgdGhpcy5kZWZhdWx0V2lkdGgsICdhdHRhY2gnKTtcbiAgICB9XG4gIH1cblxuICBkZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5fY29sdW1uRGVmID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgc2V0RGVmYXVsdFdpZHRoKGRlZmF1bHRXaWR0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWZhdWx0V2lkdGggPSBkZWZhdWx0V2lkdGg7XG4gIH1cblxuICB1cGRhdGVXaWR0aCh3aWR0aD86IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh3aWR0aCkge1xuICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIH1cbiAgICBjb25zdCB7IGNvbHVtbkRlZiB9ID0gdGhpcztcbiAgICBpZiAoY29sdW1uRGVmKSB7XG4gICAgICBjb2x1bW5EZWYudXBkYXRlV2lkdGgodGhpcy53aWR0aCB8fCB0aGlzLmRlZmF1bHRXaWR0aCB8fCAnJywgJ3VwZGF0ZScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHZhbHVlIHRoaXMgY29sdW1uIHBvaW50cyB0byBpbiB0aGUgcHJvdmlkZWQgcm93XG4gICAqL1xuICBnZXRWYWx1ZTxUID0gYW55Pihyb3c6IGFueSk6IFQge1xuICAgIGlmICh0aGlzLnRyYW5zZm9ybSkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtKGRlZXBQYXRoR2V0KHJvdywgdGhpcyksIHJvdywgdGhpcyk7XG4gICAgfVxuICAgIHJldHVybiBkZWVwUGF0aEdldChyb3csIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhIHZhbHVlIGluIHRoZSBwcm92aWRlZCByb3cgd2hlcmUgdGhpcyBjb2x1bW4gcG9pbnRzIHRvXG4gICAqL1xuICBzZXRWYWx1ZShyb3c6IGFueSwgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHJldHVybiBkZWVwUGF0aFNldChyb3csIHRoaXMsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrJ3MgdGhhdCB0aGlzIGNvbHVtbiBiZWxvbmcgdG8gdGhlIHByb3ZpZGVkIGdyb3VwLlxuICAgKiBcXD4gTm90ZSB0aGF0IHRoaXMgaW50ZXJuYWwgdG8gdGhlIGNvbHVtbiBhbmQgZG9lcyBub3QgZWZmZWN0IHRoZSBncm91cCBpbiBhbnkgd2F5LlxuICAgKi9cbiAgbWFya0luR3JvdXAoZzogUGJsQ29sdW1uR3JvdXApOiB2b2lkIHtcbiAgICB0aGlzLmdyb3VwU3RvcmUuYXR0YWNoKGcsIHRoaXMpO1xuICAgIHRoaXMuX2dyb3Vwcy5hZGQoZy5pZCk7XG4gIH1cblxuICAvKipcbiAgICogTWFyaydzIHRoYXQgdGhpcyBjb2x1bW4gZG9lcyBub3QgYmVsb25nIHRvIHRoZSBwcm92aWRlZCBncm91cC5cbiAgICogXFw+IE5vdGUgdGhhdCB0aGlzIGludGVybmFsIHRvIHRoZSBjb2x1bW4gYW5kIGRvZXMgbm90IGVmZmVjdCB0aGUgZ3JvdXAgaW4gYW55IHdheS5cbiAgICovXG4gIG1hcmtOb3RJbkdyb3VwKGc6IFBibENvbHVtbkdyb3VwKTogYm9vbGVhbiB7XG4gICAgdGhpcy5ncm91cFN0b3JlLmRldGFjaChnLCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5fZ3JvdXBzLmRlbGV0ZShnLmlkKTtcbiAgfVxuXG4gIGlzSW5Hcm91cChnOiBQYmxDb2x1bW5Hcm91cCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ncm91cHMuaGFzKGcuaWQpO1xuICB9XG5cbiAgZ2V0R3JvdXBPZlJvdyhyb3dJbmRleDogbnVtYmVyKTogUGJsQ29sdW1uR3JvdXAgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdyb3VwSWRzID0gdGhpcy5ncm91cHM7XG4gICAgZm9yIChjb25zdCBpZCBvZiBncm91cElkcykge1xuICAgICAgY29uc3QgZyA9IHRoaXMuZ3JvdXBTdG9yZS5maW5kKGlkKTtcbiAgICAgIGlmIChnICYmIGcucm93SW5kZXggPT09IHJvd0luZGV4KSB7XG4gICAgICAgIHJldHVybiBnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdyb3VwTG9naWMoY29sdW1uR3JvdXBzOiBbUGJsQ29sdW1uR3JvdXAsIFBibENvbHVtbkdyb3VwLCBQYmxDb2x1bW5Hcm91cF0sIGdyb3VwRXhpc3RzOiBib29sZWFuKTogUGJsQ29sdW1uR3JvdXAge1xuICAgIGNvbnN0IFtnUHJldiwgZ0N1cnIsIGdOZXh0XSA9IGNvbHVtbkdyb3VwcztcblxuICAgIC8vIFNUQVRFOiBUaGlzIGNvbHVtbiBoYXMgc2FtZSBncm91cCBvZiBwcmV2aW91cyBjb2x1bW4sIG5vdGhpbmcgdG8gZG8uXG4gICAgaWYgKGdDdXJyID09PSBnUHJldikge1xuICAgICAgcmV0dXJuIGdDdXJyO1xuICAgIH1cblxuICAgIC8vIFNUQVRFOiBUaGUgZ3JvdXAgZXhpc3RzIGluIG9uZSBvZiB0aGUgY29sdW1ucyBCVVQgTk9UIGluIHRoZSBMQVNUIENPTFVNTiAoaS5lOiBJdHMgYSBzbGF2ZSBzcGxpdClcbiAgICBpZiAoZ3JvdXBFeGlzdHMpIHtcbiAgICAgIC8vIElmIHRoZSBwcmV2aW91cyBzaWJsaW5nIGdyb3VwIGlzIGEgc2xhdmUgYW5kIHRoaXMgZ3JvdXAgaXMgdGhlIG9yaWdpbiBvZiB0aGUgc2xhdmUsIGNvbnZlcnQgdGhpcyBncm91cCB0byB0aGUgc2xhdmUuXG4gICAgICBpZiAoZ1ByZXYgJiYgZ0N1cnIgPT09IGdQcmV2LnNsYXZlT2YpIHtcbiAgICAgICAgcmV0dXJuIGdQcmV2O1xuICAgICAgfVxuICAgICAgaWYgKGdOZXh0ICYmIGdDdXJyID09PSBnTmV4dC5zbGF2ZU9mKSB7XG4gICAgICAgIHJldHVybiBnTmV4dDtcbiAgICAgIH1cbiAgICAgIC8vIE90aGVyd2lzZSBjcmVhdGUgdGhlIHNsYXZlLlxuICAgICAgY29uc3QgZyA9IGdDdXJyLmNyZWF0ZVNsYXZlKFt0aGlzXSk7XG4gICAgICB0aGlzLmdyb3VwU3RvcmUuYWRkKGcpO1xuXG4gICAgICAvLyBJZiB0aGUgY3VycmVudCBncm91cCBpcyBhIHBsYWNlaG9sZGVyIGFuZCBlaXRoZXIgdGhlIHByZXZpb3VzIE9SIG5leHQgc2libGluZyBncm91cCBpcyBhIHBsYWNlaG9sZGVyIGFzIHdlbGxcbiAgICAgIC8vIHdlIHdhbnQgdG8gZ3JvdXAgdGhlbSB0b2dldGhlciwgYWx0aG91Z2ggdGhleSBhcmUgbm90IHJlbGF0ZWQsIGJlY2F1c2UgdGhleSBib3RoIGhhdmUgaWRlbnRpY2FsIGhlYWRlcnMgKGVtcHR5IGhlYWRlcikuXG4gICAgICAvLyBOb3RlIHRoYXQgd2Ugc3RpbGwgY3JlYXRlIHRoZSBzYWx2ZSwgd2UganVzdCBkb24ndCB1c2UgaXQuXG4gICAgICBpZiAoZ0N1cnIucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgY29uc3QgcHJldlBIID0gZ1ByZXYgJiYgZ1ByZXYucGxhY2Vob2xkZXI7XG4gICAgICAgIGNvbnN0IG5leHRQSCA9IGdOZXh0ICYmIGdOZXh0LnNsYXZlT2YgJiYgZ05leHQucGxhY2Vob2xkZXI7XG4gICAgICAgIGNvbnN0IGdyb3VwV2l0aFBsYWNlaG9sZGVyID0gcHJldlBIID8gZ1ByZXYgOiBuZXh0UEggPyBnTmV4dCA6IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gY29uc3QgZ3JvdXBXaXRoUGxhY2Vob2xkZXIgPSBwcmV2UEggJiYgZ1ByZXY7XG4gICAgICAgIGlmIChncm91cFdpdGhQbGFjZWhvbGRlcikge1xuICAgICAgICAgIHJldHVybiBncm91cFdpdGhQbGFjZWhvbGRlcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZztcbiAgICB9XG4gICAgLy8gU1RBVEU6IFRoZSBncm91cCBJUyBhIHNsYXZlIGFuZCBpdCBpcyBzZXQgQUZURVIgYW4gaXRlbSB0aGF0IGJlbG9uZ3MgdG8gdGhlIGdyb3VwIGl0IGlzIHNsYXZlIG9mLlxuICAgIGVsc2UgaWYgKGdDdXJyLnNsYXZlT2YgJiYgZ1ByZXYpIHtcbiAgICAgIGlmIChnQ3Vyci5zbGF2ZU9mID09PSBnUHJldikge1xuICAgICAgICByZXR1cm4gZ0N1cnIuc2xhdmVPZjtcbiAgICAgIH1cbiAgICAgIGlmIChnQ3Vyci5zbGF2ZU9mID09PSBnUHJldi5zbGF2ZU9mKSB7XG4gICAgICAgIHJldHVybiBnUHJldjtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gU1RBVEU6IFRoZSBncm91cCBJUyBhIHNsYXZlIGFuZCBpdCBpcyBzZXQgQkVGT1JFIGFuIGl0ZW0gdGhhdCBiZWxvbmdzIHRvIHRoZSBncm91cCBpdCBpcyBzbGF2ZSBvZi5cbiAgICBlbHNlIGlmIChnQ3Vyci5zbGF2ZU9mICYmIGdOZXh0KSB7XG4gICAgICBpZiAoZ0N1cnIuc2xhdmVPZiA9PT0gZ05leHQpIHtcbiAgICAgICAgcmV0dXJuIGdDdXJyLnNsYXZlT2Y7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBnQ3VycjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGlmIHRoZSBjb2x1bW4gd2lkdGggaXMgbG9ja2VkIGJ5IGEgbWF4aW11bSBieSBjaGVja2luZyBpZiB0aGUgZ2l2ZW4gd2lkdGggaXMgZXF1YWwgdG8gdGhlIG1heCB3aWR0aC5cbiAgICogSWYgdGhlIHJlc3VsdCBvZiB0aGUgY2FsY3VsYXRpb24gKHRydWUvZmFsc2UpIGRvZXMgbm90IGVxdWFsIHRoZSBwcmV2aW91cyBsb2NrIHN0YXRlIGl0IHdpbGwgc2V0IHRoZSBuZXcgbG9jayBzdGF0ZVxuICAgKiBhbmQgcmV0dXJuIHRydWUuXG4gICAqIE90aGVyd2lzZSByZXR1cm4gZmFsc2UuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgY2hlY2tNYXhXaWR0aExvY2soYWN0dWFsV2lkdGg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmIChhY3R1YWxXaWR0aCA9PT0gdGhpcy5tYXhXaWR0aCkge1xuICAgICAgaWYgKCF0aGlzLm1heFdpZHRoTG9jaykge1xuICAgICAgICB0aGlzLm1heFdpZHRoTG9jayA9IHRydWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5tYXhXaWR0aExvY2spIHtcbiAgICAgIHRoaXMubWF4V2lkdGhMb2NrID0gZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbn1cbiJdfQ==