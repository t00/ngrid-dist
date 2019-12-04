/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblMetaColumn } from './meta-column';
import { PblColumn } from './column';
import { PblColumnGroup, PblColumnGroupStore } from './group-column';
var PblColumnFactory = /** @class */ (function () {
    function PblColumnFactory() {
        this._raw = { table: { cols: [] }, header: [], footer: [], headerGroup: [] };
        this._defaults = {
            table: (/** @type {?} */ ({})),
            header: (/** @type {?} */ ({})),
            footer: (/** @type {?} */ ({})),
        };
        this._currentHeaderRow = 0;
        this._currentFooterRow = 0;
    }
    Object.defineProperty(PblColumnFactory.prototype, "currentHeaderRow", {
        get: /**
         * @return {?}
         */
        function () { return this._currentHeaderRow; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblColumnFactory.prototype, "currentFooterRow", {
        get: /**
         * @return {?}
         */
        function () { return this._currentFooterRow; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} defs
     * @return {?}
     */
    PblColumnFactory.fromDefinitionSet = /**
     * @param {?} defs
     * @return {?}
     */
    function (defs) {
        /** @type {?} */
        var f = new PblColumnFactory();
        Object.assign(f._raw, defs);
        return f;
    };
    /**
     * @return {?}
     */
    PblColumnFactory.prototype.build = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this, _defaults = _a._defaults, _raw = _a._raw;
        /** @type {?} */
        var groupStore = new PblColumnGroupStore();
        /** @type {?} */
        var table = {
            header: _raw.table.header,
            footer: _raw.table.footer,
            cols: _raw.table.cols.map((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return new PblColumn(tslib_1.__assign({}, _defaults.table, d), groupStore); })),
        };
        /** @type {?} */
        var header = _raw.header.map((/**
         * @param {?} h
         * @return {?}
         */
        function (h) { return ({
            rowIndex: h.rowIndex,
            rowClassName: h.rowClassName,
            type: h.type || 'fixed',
            cols: h.cols.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return new PblMetaColumn(tslib_1.__assign({}, _defaults.header, c)); })),
        }); }));
        /** @type {?} */
        var footer = _raw.footer.map((/**
         * @param {?} f
         * @return {?}
         */
        function (f) { return ({
            rowIndex: f.rowIndex,
            rowClassName: f.rowClassName,
            type: f.type || 'fixed',
            cols: f.cols.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return new PblMetaColumn(tslib_1.__assign({}, _defaults.footer, c)); }))
        }); }));
        /** @type {?} */
        var headerGroup = _raw.headerGroup.map((/**
         * @param {?} hg
         * @return {?}
         */
        function (hg) { return ({
            rowIndex: hg.rowIndex,
            rowClassName: hg.rowClassName,
            type: hg.type || 'fixed',
            cols: _this.buildHeaderGroups(hg.rowIndex, hg.cols, table.cols).map((/**
             * @param {?} g
             * @return {?}
             */
            function (g) {
                groupStore.add(g);
                return g;
            })),
        }); }));
        return {
            groupStore: groupStore,
            table: table,
            header: header,
            footer: footer,
            headerGroup: headerGroup,
        };
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} def
     * @param {?=} type
     * @return {THIS}
     */
    PblColumnFactory.prototype.default = /**
     * @template THIS
     * @this {THIS}
     * @param {?} def
     * @param {?=} type
     * @return {THIS}
     */
    function (def, type) {
        if (type === void 0) { type = 'table'; }
        (/** @type {?} */ (this))._defaults[type] = def;
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    PblColumnFactory.prototype.table = /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    function () {
        var _a;
        var defs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            defs[_i] = arguments[_i];
        }
        /** @type {?} */
        var rowOptions = ((/** @type {?} */ (defs[0]))).prop ? {} : (/** @type {?} */ (defs.shift()));
        var header = rowOptions.header, footer = rowOptions.footer;
        Object.assign((/** @type {?} */ (this))._raw.table, { header: header, footer: footer });
        (_a = (/** @type {?} */ (this))._raw.table.cols).push.apply(_a, tslib_1.__spread((/** @type {?} */ (defs))));
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    PblColumnFactory.prototype.header = /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    function () {
        var defs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            defs[_i] = arguments[_i];
        }
        /** @type {?} */
        var rowIndex = (/** @type {?} */ (this))._currentHeaderRow++;
        /** @type {?} */
        var rowOptions = (/** @type {?} */ (this)).processRowOptions(defs);
        /** @type {?} */
        var rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        var headers = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var def = {
                id: d.id,
                kind: 'header',
                rowIndex: rowIndex
            };
            return Object.assign(def, d);
        }));
        (/** @type {?} */ (this))._raw.header.push({
            rowIndex: rowIndex,
            rowClassName: rowClassName,
            cols: headers,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    PblColumnFactory.prototype.footer = /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    function () {
        var defs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            defs[_i] = arguments[_i];
        }
        /** @type {?} */
        var rowIndex = (/** @type {?} */ (this))._currentFooterRow++;
        /** @type {?} */
        var rowOptions = (/** @type {?} */ (this)).processRowOptions(defs);
        /** @type {?} */
        var rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        var footers = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) {
            /** @type {?} */
            var def = {
                id: d.id,
                kind: 'footer',
                rowIndex: rowIndex
            };
            return Object.assign(def, d);
        }));
        (/** @type {?} */ (this))._raw.footer.push({
            rowIndex: rowIndex,
            rowClassName: rowClassName,
            cols: footers,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    };
    /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    PblColumnFactory.prototype.headerGroup = /**
     * @template THIS
     * @this {THIS}
     * @param {...?} defs
     * @return {THIS}
     */
    function () {
        var defs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            defs[_i] = arguments[_i];
        }
        /** @type {?} */
        var rowIndex = (/** @type {?} */ (this))._currentHeaderRow++;
        /** @type {?} */
        var rowOptions = (/** @type {?} */ (this)).processRowOptions(defs, 'prop');
        /** @type {?} */
        var rowClassName = (/** @type {?} */ (this)).genRowClass(rowOptions, rowIndex);
        /** @type {?} */
        var headerGroups = defs.map((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return Object.assign({ rowIndex: rowIndex }, d); }));
        (/** @type {?} */ (this))._raw.headerGroup.push({
            rowIndex: rowIndex,
            rowClassName: rowClassName,
            cols: headerGroups,
            type: (rowOptions && rowOptions.type) || 'fixed',
        });
        return (/** @type {?} */ (this));
    };
    /**
     * @private
     * @param {?} defs
     * @param {?=} mustHaveProperty
     * @return {?}
     */
    PblColumnFactory.prototype.processRowOptions = /**
     * @private
     * @param {?} defs
     * @param {?=} mustHaveProperty
     * @return {?}
     */
    function (defs, mustHaveProperty) {
        if (mustHaveProperty === void 0) { mustHaveProperty = 'id'; }
        return defs[0][mustHaveProperty] ? undefined : defs.shift();
    };
    /**
     * @private
     * @param {?} rowOptions
     * @param {?} fallbackRowIndex
     * @return {?}
     */
    PblColumnFactory.prototype.genRowClass = /**
     * @private
     * @param {?} rowOptions
     * @param {?} fallbackRowIndex
     * @return {?}
     */
    function (rowOptions, fallbackRowIndex) {
        return (rowOptions && rowOptions.rowClassName) || "pbl-ngrid-row-index-" + fallbackRowIndex.toString();
    };
    /**
     * @private
     * @param {?} rowIndex
     * @param {?} headerGroupDefs
     * @param {?} table
     * @return {?}
     */
    PblColumnFactory.prototype.buildHeaderGroups = /**
     * @private
     * @param {?} rowIndex
     * @param {?} headerGroupDefs
     * @param {?} table
     * @return {?}
     */
    function (rowIndex, headerGroupDefs, table) {
        /** @type {?} */
        var headerGroup = [];
        // Building of header group rows requires some work.
        // The user defined groups might not cover all columns, creating gaps between group columns so we need to add placeholder groups to cover these gaps.
        // Moreover, the user might not specify a `prop`, which we might need to complete.
        // We do that for each header group row.
        //
        // The end goal is to return a list of `PblColumnGroup` that span over the entire columns of the grid.
        //
        // The logic is as follows:
        // For each column in the grid, find a matching column group - a group pointing at the column by having the same `prop`
        // If found, check it's span and skip X amount of columns where X is the span.
        // If a span is not defined then treat it as a greedy group that spans over all columns ahead until the next column that has a matching group column.
        //
        // If a column does not have a matching group column, search for group columns without a `prop` specified and when found set their `prop` to the current
        // column so we will now use them as if it's a user provided group for this column...
        //
        // If no group columns exists (or left), we create an ad-hoc group column and we will now use them as if it's a user provided group for this column...
        //
        /** @type {?} */
        var tableDefs = table.slice();
        /** @type {?} */
        var defs = headerGroupDefs.slice();
        var _loop_1 = function (i, len) {
            /** @type {?} */
            var orgProp = tableDefs[i].orgProp;
            /** @type {?} */
            var idx = defs.findIndex((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d.prop === orgProp; }));
            /** @type {?} */
            var columnGroupDef = idx !== -1
                ? defs.splice(idx, 1)[0]
                : defs.find((/**
                 * @param {?} d
                 * @return {?}
                 */
                function (d) { return !d.prop; })) || { prop: orgProp, rowIndex: rowIndex, span: undefined };
            /** @type {?} */
            var placeholder = idx === -1 && !!columnGroupDef.prop;
            columnGroupDef.prop = orgProp;
            columnGroupDef.rowIndex = rowIndex;
            /** @type {?} */
            var take = columnGroupDef.span;
            if (!(take >= 0)) {
                take = 0;
                var _loop_2 = function (z) {
                    if (defs.findIndex((/**
                     * @param {?} d
                     * @return {?}
                     */
                    function (d) { return d.prop === tableDefs[z].orgProp; })) === -1) {
                        take++;
                    }
                    else {
                        return "break";
                    }
                };
                for (var z = i + 1; z < len; z++) {
                    var state_1 = _loop_2(z);
                    if (state_1 === "break")
                        break;
                }
            }
            columnGroupDef.span = take;
            /** @type {?} */
            var group = new PblColumnGroup(columnGroupDef, tableDefs.slice(i, i + take + 1), placeholder);
            headerGroup.push(group);
            i += take;
            out_i_1 = i;
        };
        var out_i_1;
        for (var i = 0, len = tableDefs.length; i < len; i++) {
            _loop_1(i, len);
            i = out_i_1;
        }
        return headerGroup;
    };
    return PblColumnFactory;
}());
export { PblColumnFactory };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._raw;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._defaults;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._currentHeaderRow;
    /**
     * @type {?}
     * @private
     */
    PblColumnFactory.prototype._currentFooterRow;
}
/**
 * @return {?}
 */
export function columnFactory() {
    return new PblColumnFactory();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFTQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDckMsT0FBTyxFQUFFLGNBQWMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJFO0lBQUE7UUFDVSxTQUFJLEdBQWdDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDckcsY0FBUyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxtQkFBQSxFQUFFLEVBQWdDO1lBQ3pDLE1BQU0sRUFBRSxtQkFBQSxFQUFFLEVBQW9DO1lBQzlDLE1BQU0sRUFBRSxtQkFBQSxFQUFFLEVBQW9DO1NBQy9DLENBQUM7UUFFTSxzQkFBaUIsR0FBRyxDQUFDLENBQUM7UUFDdEIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBNlJoQyxDQUFDO0lBM1JDLHNCQUFJLDhDQUFnQjs7OztRQUFwQixjQUFpQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2pFLHNCQUFJLDhDQUFnQjs7OztRQUFwQixjQUFpQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7OztPQUFBOzs7OztJQUUxRCxrQ0FBaUI7Ozs7SUFBeEIsVUFBeUIsSUFBaUM7O1lBQ2xELENBQUMsR0FBRyxJQUFJLGdCQUFnQixFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1QixPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7Ozs7SUFFRCxnQ0FBSzs7O0lBQUw7UUFBQSxpQkF1Q0M7UUF0Q08sSUFBQSxTQUEwQixFQUF4Qix3QkFBUyxFQUFFLGNBQWE7O1lBRTFCLFVBQVUsR0FBRyxJQUFJLG1CQUFtQixFQUFFOztZQUV0QyxLQUFLLEdBQStCO1lBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRzs7OztZQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsSUFBSSxTQUFTLHNCQUFNLFNBQVMsQ0FBQyxLQUFLLEVBQUssQ0FBQyxHQUFJLFVBQVUsQ0FBQyxFQUF2RCxDQUF1RCxFQUFDO1NBQ3pGOztZQUNLLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUM7WUFDcEMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRO1lBQ3BCLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWTtZQUM1QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPO1lBQ3ZCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUc7Ozs7WUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLElBQUksYUFBYSxzQkFBTyxTQUFTLENBQUMsTUFBTSxFQUFLLENBQUMsRUFBSSxFQUFsRCxDQUFrRCxFQUFDO1NBQzNFLENBQUMsRUFMbUMsQ0FLbkMsRUFBQzs7WUFDRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDO1lBQ3BDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUTtZQUNwQixZQUFZLEVBQUUsQ0FBQyxDQUFDLFlBQVk7WUFDNUIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTztZQUN2QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxJQUFJLGFBQWEsc0JBQU0sU0FBUyxDQUFDLE1BQU0sRUFBSyxDQUFDLEVBQUcsRUFBaEQsQ0FBZ0QsRUFBRTtTQUMxRSxDQUFDLEVBTG1DLENBS25DLEVBQUM7O1lBQ0csV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRzs7OztRQUFFLFVBQUEsRUFBRSxJQUFJLE9BQUEsQ0FBQztZQUMvQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7WUFDckIsWUFBWSxFQUFFLEVBQUUsQ0FBQyxZQUFZO1lBQzdCLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLE9BQU87WUFDeEIsSUFBSSxFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUc7Ozs7WUFBRSxVQUFBLENBQUM7Z0JBQ25FLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxFQUFDO1NBQ0gsQ0FBQyxFQVI4QyxDQVE5QyxFQUFDO1FBRUgsT0FBTztZQUNMLFVBQVUsWUFBQTtZQUNWLEtBQUssT0FBQTtZQUNMLE1BQU0sUUFBQTtZQUNOLE1BQU0sUUFBQTtZQUNOLFdBQVcsYUFBQTtTQUNaLENBQUM7SUFDSixDQUFDOzs7Ozs7OztJQVVELGtDQUFPOzs7Ozs7O0lBQVAsVUFBUSxHQUFvRSxFQUFFLElBQTZDO1FBQTdDLHFCQUFBLEVBQUEsY0FBNkM7UUFDekgsbUJBQUEsSUFBSSxFQUFBLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMzQixPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQWdCRCxnQ0FBSzs7Ozs7O0lBQUw7O1FBQU0sY0FBd0c7YUFBeEcsVUFBd0csRUFBeEcscUJBQXdHLEVBQXhHLElBQXdHO1lBQXhHLHlCQUF3Rzs7O1lBQ3RHLFVBQVUsR0FBdUUsQ0FBQyxtQkFBQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQU87UUFDL0gsSUFBQSwwQkFBTSxFQUFFLDBCQUFNO1FBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxFQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFBLEtBQUEsbUJBQUEsSUFBSSxFQUFBLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUEsQ0FBQyxJQUFJLDRCQUFJLG1CQUFBLElBQUksRUFBeUIsR0FBRTtRQUM1RCxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7OztJQXlCRCxpQ0FBTTs7Ozs7O0lBQU47UUFBTyxjQUF3STthQUF4SSxVQUF3SSxFQUF4SSxxQkFBd0ksRUFBeEksSUFBd0k7WUFBeEkseUJBQXdJOzs7WUFDdkksUUFBUSxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLGlCQUFpQixFQUFFOztZQUNuQyxVQUFVLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDOztZQUN6QyxZQUFZLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7O1lBRXJELE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRzs7OztRQUFFLFVBQUMsQ0FBbUc7O2dCQUN0SCxHQUFHLEdBQTRCO2dCQUNuQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxVQUFBO2FBQ1Q7WUFDRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUMsRUFBQztRQUVGLG1CQUFBLElBQUksRUFBQSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ3BCLFFBQVEsVUFBQTtZQUNSLFlBQVksY0FBQTtZQUNaLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLENBQUMsVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPO1NBQ2pELENBQUMsQ0FBQztRQUNILE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7Ozs7O0lBeUJELGlDQUFNOzs7Ozs7SUFBTjtRQUFPLGNBQXdJO2FBQXhJLFVBQXdJLEVBQXhJLHFCQUF3SSxFQUF4SSxJQUF3STtZQUF4SSx5QkFBd0k7OztZQUN2SSxRQUFRLEdBQUcsbUJBQUEsSUFBSSxFQUFBLENBQUMsaUJBQWlCLEVBQUU7O1lBQ25DLFVBQVUsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7O1lBQ3pDLFlBQVksR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7WUFFckQsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsVUFBQyxDQUFtRzs7Z0JBQ3RILEdBQUcsR0FBNEI7Z0JBQ25DLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLFVBQUE7YUFDVDtZQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFDO1FBRUYsbUJBQUEsSUFBSSxFQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDcEIsUUFBUSxVQUFBO1lBQ1IsWUFBWSxjQUFBO1lBQ1osSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU87U0FDakQsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUEyQkQsc0NBQVc7Ozs7OztJQUFYO1FBQVksY0FBc0g7YUFBdEgsVUFBc0gsRUFBdEgscUJBQXNILEVBQXRILElBQXNIO1lBQXRILHlCQUFzSDs7O1lBQzFILFFBQVEsR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxpQkFBaUIsRUFBRTs7WUFDbkMsVUFBVSxHQUFHLG1CQUFBLElBQUksRUFBQSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7O1lBQ2pELFlBQVksR0FBRyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQzs7WUFFckQsWUFBWSxHQUFRLElBQUksQ0FBQyxHQUFHOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBOUIsQ0FBOEIsRUFBRTtRQUV6RSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN6QixRQUFRLFVBQUE7WUFDUixZQUFZLGNBQUE7WUFDWixJQUFJLEVBQUUsWUFBWTtZQUNsQixJQUFJLEVBQUUsQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU87U0FDakQsQ0FBQyxDQUFDO1FBRUgsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7SUFFTyw0Q0FBaUI7Ozs7OztJQUF6QixVQUEwQixJQUFXLEVBQUUsZ0JBQStCO1FBQS9CLGlDQUFBLEVBQUEsdUJBQStCO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlELENBQUM7Ozs7Ozs7SUFFTyxzQ0FBVzs7Ozs7O0lBQW5CLFVBQW9CLFVBQXFDLEVBQUUsZ0JBQXdCO1FBQ2pGLE9BQU8sQ0FBQyxVQUFVLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLHlCQUF1QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUksQ0FBQztJQUN6RyxDQUFDOzs7Ozs7OztJQUVPLDRDQUFpQjs7Ozs7OztJQUF6QixVQUEwQixRQUFnQixFQUFFLGVBQTJDLEVBQUUsS0FBa0I7O1lBQ25HLFdBQVcsR0FBcUIsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW1CbEMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUU7O1lBQ3pCLElBQUksR0FBRyxlQUFlLENBQUMsS0FBSyxFQUFFO2dDQUUzQixDQUFDLEVBQU0sR0FBRzs7Z0JBQ1gsT0FBTyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPOztnQkFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBbEIsQ0FBa0IsRUFBQzs7Z0JBQzlDLGNBQWMsR0FBNkIsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJOzs7O2dCQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFQLENBQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLFVBQUEsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFOztnQkFHdkUsV0FBVyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUk7WUFFdkQsY0FBYyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7WUFDOUIsY0FBYyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O2dCQUUvQixJQUFJLEdBQUcsY0FBYyxDQUFDLElBQUk7WUFDOUIsSUFBSSxDQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFHO2dCQUNsQixJQUFJLEdBQUcsQ0FBQyxDQUFDO3dDQUNBLENBQUM7b0JBQ1IsSUFBSSxJQUFJLENBQUMsU0FBUzs7OztvQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBL0IsQ0FBK0IsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUNoRSxJQUFJLEVBQUUsQ0FBQztxQkFDUjt5QkFDSTs7cUJBRUo7O2dCQU5ILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRTswQ0FBckIsQ0FBQzs7O2lCQU9UO2FBQ0Y7WUFDRCxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7Z0JBQ3JCLEtBQUssR0FBRyxJQUFJLGNBQWMsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUM7WUFDL0YsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixDQUFDLElBQUksSUFBSSxDQUFDO3NCQTVCSCxDQUFDOzs7UUFBVixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRTtvQkFBM0MsQ0FBQyxFQUFNLEdBQUc7WUFBVixDQUFDO1NBNkJUO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQXRTRCxJQXNTQzs7Ozs7OztJQXJTQyxnQ0FBNkc7Ozs7O0lBQzdHLHFDQUlFOzs7OztJQUVGLDZDQUE4Qjs7Ozs7SUFDOUIsNkNBQThCOzs7OztBQStSaEMsTUFBTSxVQUFVLGFBQWE7SUFDM0IsT0FBTyxJQUFJLGdCQUFnQixFQUFFLENBQUE7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sXG4gIFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIFBibE5ncmlkQ29sdW1uU2V0LFxuICBQYmxNZXRhUm93RGVmaW5pdGlvbnNcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW5Hcm91cCwgUGJsQ29sdW1uR3JvdXBTdG9yZSB9IGZyb20gJy4vZ3JvdXAtY29sdW1uJztcblxuZXhwb3J0IHR5cGUgQ09MVU1OID0gUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiB8IFBibENvbHVtbkdyb3VwO1xuXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uRmFjdG9yeSB7XG4gIHByaXZhdGUgX3JhdzogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0ID0geyB0YWJsZTogeyBjb2xzOiBbXSB9LCBoZWFkZXI6IFtdLCBmb290ZXI6IFtdLCBoZWFkZXJHcm91cDogW10gfTtcbiAgcHJpdmF0ZSBfZGVmYXVsdHMgPSB7XG4gICAgdGFibGU6IHt9IGFzIFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4sXG4gICAgaGVhZGVyOiB7fSBhcyBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPixcbiAgICBmb290ZXI6IHt9IGFzIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+LFxuICB9O1xuXG4gIHByaXZhdGUgX2N1cnJlbnRIZWFkZXJSb3cgPSAwO1xuICBwcml2YXRlIF9jdXJyZW50Rm9vdGVyUm93ID0gMDtcblxuICBnZXQgY3VycmVudEhlYWRlclJvdygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VycmVudEhlYWRlclJvdzsgfVxuICBnZXQgY3VycmVudEZvb3RlclJvdygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VycmVudEZvb3RlclJvdzsgfVxuXG4gIHN0YXRpYyBmcm9tRGVmaW5pdGlvblNldChkZWZzOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQpOiBQYmxDb2x1bW5GYWN0b3J5IHtcbiAgICBjb25zdCBmID0gbmV3IFBibENvbHVtbkZhY3RvcnkoKTtcbiAgICBPYmplY3QuYXNzaWduKGYuX3JhdywgZGVmcyk7XG4gICAgcmV0dXJuIGY7XG4gIH1cblxuICBidWlsZCgpOiBQYmxOZ3JpZENvbHVtblNldCB7XG4gICAgY29uc3QgeyBfZGVmYXVsdHMsIF9yYXcgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBncm91cFN0b3JlID0gbmV3IFBibENvbHVtbkdyb3VwU3RvcmUoKTtcblxuICAgIGNvbnN0IHRhYmxlOiBQYmxOZ3JpZENvbHVtblNldFsndGFibGUnXSA9IHtcbiAgICAgIGhlYWRlcjogX3Jhdy50YWJsZS5oZWFkZXIsXG4gICAgICBmb290ZXI6IF9yYXcudGFibGUuZm9vdGVyLFxuICAgICAgY29sczogX3Jhdy50YWJsZS5jb2xzLm1hcCggZCA9PiBuZXcgUGJsQ29sdW1uKHsgLi4uX2RlZmF1bHRzLnRhYmxlLCAuLi5kIH0sIGdyb3VwU3RvcmUpKSxcbiAgICB9O1xuICAgIGNvbnN0IGhlYWRlciA9IF9yYXcuaGVhZGVyLm1hcCggaCA9PiAoe1xuICAgICAgcm93SW5kZXg6IGgucm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWU6IGgucm93Q2xhc3NOYW1lLFxuICAgICAgdHlwZTogaC50eXBlIHx8ICdmaXhlZCcsXG4gICAgICBjb2xzOiBoLmNvbHMubWFwKCBjID0+IG5ldyBQYmxNZXRhQ29sdW1uKCB7IC4uLl9kZWZhdWx0cy5oZWFkZXIsIC4uLmMgfSApKSxcbiAgICB9KSk7XG4gICAgY29uc3QgZm9vdGVyID0gX3Jhdy5mb290ZXIubWFwKCBmID0+ICh7XG4gICAgICByb3dJbmRleDogZi5yb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZTogZi5yb3dDbGFzc05hbWUsXG4gICAgICB0eXBlOiBmLnR5cGUgfHwgJ2ZpeGVkJyxcbiAgICAgIGNvbHM6IGYuY29scy5tYXAoIGMgPT4gbmV3IFBibE1ldGFDb2x1bW4oeyAuLi5fZGVmYXVsdHMuZm9vdGVyLCAuLi5jIH0pIClcbiAgICB9KSk7XG4gICAgY29uc3QgaGVhZGVyR3JvdXAgPSBfcmF3LmhlYWRlckdyb3VwLm1hcCggaGcgPT4gKHtcbiAgICAgIHJvd0luZGV4OiBoZy5yb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZTogaGcucm93Q2xhc3NOYW1lLFxuICAgICAgdHlwZTogaGcudHlwZSB8fCAnZml4ZWQnLFxuICAgICAgY29sczogdGhpcy5idWlsZEhlYWRlckdyb3VwcyhoZy5yb3dJbmRleCwgaGcuY29scywgdGFibGUuY29scykubWFwKCBnID0+IHtcbiAgICAgICAgZ3JvdXBTdG9yZS5hZGQoZyk7XG4gICAgICAgIHJldHVybiBnO1xuICAgICAgfSksXG4gICAgfSkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwU3RvcmUsXG4gICAgICB0YWJsZSxcbiAgICAgIGhlYWRlcixcbiAgICAgIGZvb3RlcixcbiAgICAgIGhlYWRlckdyb3VwLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGNvbHVtbiBkZWZpbml0aW9uIGZvciBoZWFkZXIvZm9vdGVyIGNvbHVtbnMuXG4gICAqL1xuICBkZWZhdWx0KGRlZjogUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4sIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicpOiB0aGlzO1xuICAvKipcbiAgICogU2V0IHRoZSBkZWZhdWx0IGNvbHVtbiBkZWZpbml0aW9uIGZvciB0YWJsZSBjb2x1bW5zLlxuICAgKi9cbiAgZGVmYXVsdChkZWY6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4sIHR5cGU/OiAndGFibGUnKTogdGhpcztcbiAgZGVmYXVsdChkZWY6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4gfCBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiwgdHlwZTogJ3RhYmxlJyB8ICdoZWFkZXInIHwgJ2Zvb3RlcicgPSAndGFibGUnKTogdGhpcyB7XG4gICAgdGhpcy5fZGVmYXVsdHNbdHlwZV0gPSBkZWY7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGdyaWQgY29sdW1ucy5cbiAgICpcbiAgICogVGFibGUgY29sdW1ucyBhcmUgbWFuZGF0b3J5LCB0aGV5IGFyZSB0aGUgY29sdW1ucyB0aGF0IGRlZmluZSB0aGUgc3RydWN0dXJlIG9mIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogRWFjaCBjb2x1bW4gd2lsbCB1c3VhbGx5IHBvaW50IHRvIHByb3BlcnR5IG9uIHRoZSByb3csIGFsdGhvdWdoIHlvdSBjYW4gY3JlYXRlIGNvbHVtbnMgdGhhdCBkb2VzIG5vdFxuICAgKiBleGlzdCBvbiB0aGUgcm93IGFuZCBoYW5kbGUgdGhlaXIgcmVuZGVyaW5nIHdpdGggYSBjZWxsIHRlbXBsYXRlLlxuICAgKlxuICAgKiBFYWNoIGdyaWQgY29sdW1uIGlzIGFsc28gYSBoZWFkZXIgY29sdW1uIGFuZCBhIGZvb3RlciBjb2x1bW4gdGhhdCBkaXNwbGF5LlxuICAgKiBUaGUgaGVhZGVyIGFuZCBmb290ZXIgYXJlIGF1dG9tYXRpY2FsbHkgY3JlYXRlZCwgSWYgeW91IHdpc2ggbm90IHRvIHNob3cgdGhlbSBzZXQgaGVhZGVyUm93L2Zvb3RlclJvdyB0byBmYWxzZSBpbiBQYmxUYWJsZS5cbiAgICpcbiAgICovXG4gIHRhYmxlKHJvd09wdGlvbnM6IHsgaGVhZGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBmb290ZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSwgLi4uZGVmczogUGJsQ29sdW1uRGVmaW5pdGlvbltdKTogdGhpcztcbiAgdGFibGUoLi4uZGVmczogUGJsQ29sdW1uRGVmaW5pdGlvbltdKTogdGhpcztcbiAgdGFibGUoLi4uZGVmczogQXJyYXk8eyBoZWFkZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IGZvb3Rlcj86IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IHwgUGJsQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dPcHRpb25zOiB7IGhlYWRlcj86IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZm9vdGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gPSAoZGVmc1swXSBhcyBhbnkpLnByb3AgPyB7fSA6IGRlZnMuc2hpZnQoKSBhcyBhbnk7XG4gICAgY29uc3QgeyBoZWFkZXIsIGZvb3RlciB9ID0gcm93T3B0aW9ucztcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuX3Jhdy50YWJsZSwgeyBoZWFkZXIsIGZvb3RlciB9KTtcbiAgICB0aGlzLl9yYXcudGFibGUuY29scy5wdXNoKC4uLmRlZnMgYXMgUGJsQ29sdW1uRGVmaW5pdGlvbltdKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaGVhZGVyIHJvdyB3aXRoIGhlYWRlciBjb2x1bW5zLlxuICAgKiBDcmVhdGVzIGFuIGFkZGl0aW9uYWwgaGVhZGVyIHJvdyBpbiBwb3NpdGlvbiBgY3VycmVudEhlYWRlclJvd2AgdXNpbmcgdGhlIHByb3ZpZGVkIGhlYWRlciBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqIEVhY2ggZGVmaW5pdGlvbiByZXByZXNlbnQgYSBjZWxsLCB0aGUgY2VsbCdzIGRvZXMgbm90IGhhdmUgdG8gYWxpZ24gd2l0aCB0aGUgbGF5b3V0IG9mIGdyaWQgY29sdW1ucy5cbiAgICpcbiAgICogQWxsIGhlYWRlciByb3cgd2lsbCBwb3NpdGlvbiBCRUZPUkUgdGhlIGdyaWQgY29sdW1uIGhlYWRlciByb3cuXG4gICAqIEhlYWRlciBjb2x1bW5zIGFyZSBvcHRpb25hbC5cbiAgICogRWFjaCBjYWxsIHRvIGBoZWFkZXIoKWAgd2lsbCBjcmVhdGUgYSBuZXcgcm93LCBpbmNyZW1lbnRpbmcgdGhlIGBjdXJyZW50SGVhZGVyUm93YC5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogRXhhbXBsZTpcbiAgICogYGBganNcbiAgICogICBmYWN0b3J5LnRhYmxlKDEsIDIsIDMpXG4gICAqICAgICAuaGVhZGVyKGEsIGIsIGMpLmhlYWRlcihkLCBlLCBmKTtcbiAgICogYGBgXG4gICAqXG4gICAqIHdpbGwgcmVzdWx0IGluOlxuICAgKiAgIGhlYWRlcjEgLVxcPiAgYSBiIGNcbiAgICogICBoZWFkZXIyIC1cXD4gIGQgZSBmXG4gICAqICAgdGFibGUgICAtXFw+ICAxIDIgM1xuICAgKi9cbiAgaGVhZGVyKHJvd09wdGlvbnM6IFBibE1ldGFSb3dEZWZpbml0aW9ucywgLi4uZGVmczogQXJyYXk8UGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXM7XG4gIGhlYWRlciguLi5kZWZzOiBBcnJheTxQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcztcbiAgaGVhZGVyKC4uLmRlZnM6IEFycmF5PFBibE1ldGFSb3dEZWZpbml0aW9ucyB8IFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX2N1cnJlbnRIZWFkZXJSb3crKztcbiAgICBjb25zdCByb3dPcHRpb25zID0gdGhpcy5wcm9jZXNzUm93T3B0aW9ucyhkZWZzKTtcbiAgICBjb25zdCByb3dDbGFzc05hbWUgPSB0aGlzLmdlblJvd0NsYXNzKHJvd09wdGlvbnMsIHJvd0luZGV4KTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBkZWZzLm1hcCggKGQ6IFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbikgPT4ge1xuICAgICAgY29uc3QgZGVmOiBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiA9IHtcbiAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgIGtpbmQ6ICdoZWFkZXInLFxuICAgICAgICByb3dJbmRleFxuICAgICAgfTtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGRlZiwgZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9yYXcuaGVhZGVyLnB1c2goe1xuICAgICAgcm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWUsXG4gICAgICBjb2xzOiBoZWFkZXJzLFxuICAgICAgdHlwZTogKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5ldyBmb290ZXIgcm93IHdpdGggZm9vdGVyIGNvbHVtbnMuXG4gICAqIENyZWF0ZXMgYW4gYWRkaXRpb25hbCBmb290ZXIgcm93IGluIHBvc2l0aW9uIGBjdXJyZW50Rm9vdGVyUm93YCB1c2luZyB0aGUgcHJvdmlkZWQgZm9vdGVyIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICogRWFjaCBkZWZpbml0aW9uIHJlcHJlc2VudCBhIGNlbGwsIHRoZSBjZWxsJ3MgZG9lcyBub3QgaGF2ZSB0byBhbGlnbiB3aXRoIHRoZSBsYXlvdXQgb2YgZ3JpZCBjb2x1bW5zLlxuICAgKlxuICAgKiBBbGwgZm9vdGVyIHJvdyB3aWxsIHBvc2l0aW9uIEFGVEVSIHRoZSBncmlkIGNvbHVtbiBmb290ZXIgcm93LlxuICAgKiBGb290ZXIgY29sdW1ucyBhcmUgb3B0aW9uYWwuXG4gICAqIEVhY2ggY2FsbCB0byBgZm9vdGVyKClgIHdpbGwgY3JlYXRlIGEgbmV3IHJvdywgaW5jcmVtZW50aW5nIHRoZSBgY3VycmVudEZvb3RlclJvd2AuXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYGpzXG4gICAqICAgZmFjdG9yeS50YWJsZSgxLCAyLCAzKVxuICAgKiAgICAgLmZvb3RlcihhLCBiLCBjKS5mb290ZXIoZCwgZSwgZik7XG4gICAqIGBgYFxuICAgKlxuICAgKiB3aWxsIHJlc3VsdCBpbjpcbiAgICogICB0YWJsZSAgIC1cXD4gIDEgMiAzXG4gICAqICAgZm9vdGVyMSAtXFw+ICBhIGIgY1xuICAgKiAgIGZvb3RlcjIgLVxcPiAgZCBlIGZcbiAgICovXG4gIGZvb3Rlcihyb3dPcHRpb25zOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzO1xuICBmb290ZXIoLi4uZGVmczogQXJyYXk8UGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXM7XG4gIGZvb3RlciguLi5kZWZzOiBBcnJheTxQYmxNZXRhUm93RGVmaW5pdGlvbnMgfCBQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcyB7XG4gICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLl9jdXJyZW50Rm9vdGVyUm93Kys7XG4gICAgY29uc3Qgcm93T3B0aW9ucyA9IHRoaXMucHJvY2Vzc1Jvd09wdGlvbnMoZGVmcyk7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lID0gdGhpcy5nZW5Sb3dDbGFzcyhyb3dPcHRpb25zLCByb3dJbmRleCk7XG5cbiAgICBjb25zdCBmb290ZXJzID0gZGVmcy5tYXAoIChkOiBQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGRlZjogUGJsTWV0YUNvbHVtbkRlZmluaXRpb24gPSB7XG4gICAgICAgIGlkOiBkLmlkLFxuICAgICAgICBraW5kOiAnZm9vdGVyJyxcbiAgICAgICAgcm93SW5kZXhcbiAgICAgIH07XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZWYsIGQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fcmF3LmZvb3Rlci5wdXNoKHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lLFxuICAgICAgY29sczogZm9vdGVycyxcbiAgICAgIHR5cGU6IChyb3dPcHRpb25zICYmIHJvd09wdGlvbnMudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgaGVhZGVyIHJvdyB3aXRoIGhlYWRlciBncm91cCBjb2x1bW5zLlxuICAgKiBBIGhlYWRlciBncm91cCBjb2x1bW4gaXMgYSBjb2x1bW5zIGlzIGEgaGVhZGVyIGNvbHVtbnMgdGhhdCBzcGFucyBvbmUgb3IgbW9yZSBjb2x1bW5zLlxuICAgKlxuICAgKiBDcmVhdGUgYW4gYWRkaXRpb25hbCBoZWFkZXIgcm93IGluIHBvc2l0aW9uIGBjdXJyZW50SGVhZGVyUm93YCB1c2luZyB0aGUgcHJvdmlkZWQgaGVhZGVyIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICogRWFjaCBkZWZpbml0aW9uIHJlcHJlc2VudCBhIGNlbGwsIHRoZSBjZWxsJ3MgZG9lcyBub3QgaGF2ZSB0byBhbGlnbiB3aXRoIHRoZSBsYXlvdXQgb2YgZ3JpZCBjb2x1bW5zLlxuICAgKlxuICAgKiBBbGwgaGVhZGVyIHJvdyB3aWxsIHBvc2l0aW9uIEJFRk9SRSB0aGUgZ3JpZCBjb2x1bW4gaGVhZGVyIHJvdy5cbiAgICogSGVhZGVyIGNvbHVtbnMgYXJlIG9wdGlvbmFsLlxuICAgKiBFYWNoIGNhbGwgdG8gYGhlYWRlcigpYCB3aWxsIGNyZWF0ZSBhIG5ldyByb3csIGluY3JlbWVudGluZyB0aGUgYGN1cnJlbnRIZWFkZXJSb3dgLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBqc1xuICAgKiAgIGZhY3RvcnkudGFibGUoMSwgMiwgMylcbiAgICogICAgIC5oZWFkZXIoYSwgYiwgYykuaGVhZGVyKGQsIGUsIGYpO1xuICAgKiBgYGBcbiAgICpcbiAgICogd2lsbCByZXN1bHQgaW46XG4gICAqICAgaGVhZGVyMSAtXFw+ICBhIGIgY1xuICAgKiAgIGhlYWRlcjIgLVxcPiAgZCBlIGZcbiAgICogICB0YWJsZSAgIC1cXD4gIDEgMiAzXG4gICAqL1xuICBoZWFkZXJHcm91cChyb3dPcHRpb25zOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+Pik6IHRoaXM7XG4gIGhlYWRlckdyb3VwKC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+Pik6IHRoaXM7XG4gIGhlYWRlckdyb3VwKC4uLmRlZnM6IEFycmF5PFBibE1ldGFSb3dEZWZpbml0aW9ucyB8ICggUGljazxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24sICdwcm9wJz4gJiBQYXJ0aWFsPFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbj4pID4pOiB0aGlzIHtcbiAgICBjb25zdCByb3dJbmRleCA9IHRoaXMuX2N1cnJlbnRIZWFkZXJSb3crKztcbiAgICBjb25zdCByb3dPcHRpb25zID0gdGhpcy5wcm9jZXNzUm93T3B0aW9ucyhkZWZzLCAncHJvcCcpO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9IHRoaXMuZ2VuUm93Q2xhc3Mocm93T3B0aW9ucywgcm93SW5kZXgpO1xuXG4gICAgY29uc3QgaGVhZGVyR3JvdXBzOiBhbnkgPSBkZWZzLm1hcCggZCA9PiBPYmplY3QuYXNzaWduKHsgcm93SW5kZXggfSwgZCkgKTtcblxuICAgIHRoaXMuX3Jhdy5oZWFkZXJHcm91cC5wdXNoKHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lLFxuICAgICAgY29sczogaGVhZGVyR3JvdXBzLFxuICAgICAgdHlwZTogKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy50eXBlKSB8fCAnZml4ZWQnLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIHByb2Nlc3NSb3dPcHRpb25zKGRlZnM6IGFueVtdLCBtdXN0SGF2ZVByb3BlcnR5OiBzdHJpbmcgPSAnaWQnKTogUGJsTWV0YVJvd0RlZmluaXRpb25zIHtcbiAgICByZXR1cm4gZGVmc1swXVttdXN0SGF2ZVByb3BlcnR5XSA/IHVuZGVmaW5lZCA6IGRlZnMuc2hpZnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2VuUm93Q2xhc3Mocm93T3B0aW9uczogeyByb3dDbGFzc05hbWU/OiBzdHJpbmcgfSwgZmFsbGJhY2tSb3dJbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKHJvd09wdGlvbnMgJiYgcm93T3B0aW9ucy5yb3dDbGFzc05hbWUpIHx8IGBwYmwtbmdyaWQtcm93LWluZGV4LSR7ZmFsbGJhY2tSb3dJbmRleC50b1N0cmluZygpfWA7XG4gIH1cblxuICBwcml2YXRlIGJ1aWxkSGVhZGVyR3JvdXBzKHJvd0luZGV4OiBudW1iZXIsIGhlYWRlckdyb3VwRGVmczogUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uW10sIHRhYmxlOiBQYmxDb2x1bW5bXSk6IFBibENvbHVtbkdyb3VwW10ge1xuICAgIGNvbnN0IGhlYWRlckdyb3VwOiBQYmxDb2x1bW5Hcm91cFtdID0gW107XG5cbiAgICAvLyBCdWlsZGluZyBvZiBoZWFkZXIgZ3JvdXAgcm93cyByZXF1aXJlcyBzb21lIHdvcmsuXG4gICAgLy8gVGhlIHVzZXIgZGVmaW5lZCBncm91cHMgbWlnaHQgbm90IGNvdmVyIGFsbCBjb2x1bW5zLCBjcmVhdGluZyBnYXBzIGJldHdlZW4gZ3JvdXAgY29sdW1ucyBzbyB3ZSBuZWVkIHRvIGFkZCBwbGFjZWhvbGRlciBncm91cHMgdG8gY292ZXIgdGhlc2UgZ2Fwcy5cbiAgICAvLyBNb3Jlb3ZlciwgdGhlIHVzZXIgbWlnaHQgbm90IHNwZWNpZnkgYSBgcHJvcGAsIHdoaWNoIHdlIG1pZ2h0IG5lZWQgdG8gY29tcGxldGUuXG4gICAgLy8gV2UgZG8gdGhhdCBmb3IgZWFjaCBoZWFkZXIgZ3JvdXAgcm93LlxuICAgIC8vXG4gICAgLy8gVGhlIGVuZCBnb2FsIGlzIHRvIHJldHVybiBhIGxpc3Qgb2YgYFBibENvbHVtbkdyb3VwYCB0aGF0IHNwYW4gb3ZlciB0aGUgZW50aXJlIGNvbHVtbnMgb2YgdGhlIGdyaWQuXG4gICAgLy9cbiAgICAvLyBUaGUgbG9naWMgaXMgYXMgZm9sbG93czpcbiAgICAvLyBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGdyaWQsIGZpbmQgYSBtYXRjaGluZyBjb2x1bW4gZ3JvdXAgLSBhIGdyb3VwIHBvaW50aW5nIGF0IHRoZSBjb2x1bW4gYnkgaGF2aW5nIHRoZSBzYW1lIGBwcm9wYFxuICAgIC8vIElmIGZvdW5kLCBjaGVjayBpdCdzIHNwYW4gYW5kIHNraXAgWCBhbW91bnQgb2YgY29sdW1ucyB3aGVyZSBYIGlzIHRoZSBzcGFuLlxuICAgIC8vIElmIGEgc3BhbiBpcyBub3QgZGVmaW5lZCB0aGVuIHRyZWF0IGl0IGFzIGEgZ3JlZWR5IGdyb3VwIHRoYXQgc3BhbnMgb3ZlciBhbGwgY29sdW1ucyBhaGVhZCB1bnRpbCB0aGUgbmV4dCBjb2x1bW4gdGhhdCBoYXMgYSBtYXRjaGluZyBncm91cCBjb2x1bW4uXG4gICAgLy9cbiAgICAvLyBJZiBhIGNvbHVtbiBkb2VzIG5vdCBoYXZlIGEgbWF0Y2hpbmcgZ3JvdXAgY29sdW1uLCBzZWFyY2ggZm9yIGdyb3VwIGNvbHVtbnMgd2l0aG91dCBhIGBwcm9wYCBzcGVjaWZpZWQgYW5kIHdoZW4gZm91bmQgc2V0IHRoZWlyIGBwcm9wYCB0byB0aGUgY3VycmVudFxuICAgIC8vIGNvbHVtbiBzbyB3ZSB3aWxsIG5vdyB1c2UgdGhlbSBhcyBpZiBpdCdzIGEgdXNlciBwcm92aWRlZCBncm91cCBmb3IgdGhpcyBjb2x1bW4uLi5cbiAgICAvL1xuICAgIC8vIElmIG5vIGdyb3VwIGNvbHVtbnMgZXhpc3RzIChvciBsZWZ0KSwgd2UgY3JlYXRlIGFuIGFkLWhvYyBncm91cCBjb2x1bW4gYW5kIHdlIHdpbGwgbm93IHVzZSB0aGVtIGFzIGlmIGl0J3MgYSB1c2VyIHByb3ZpZGVkIGdyb3VwIGZvciB0aGlzIGNvbHVtbi4uLlxuICAgIC8vXG4gICAgY29uc3QgdGFibGVEZWZzID0gdGFibGUuc2xpY2UoKTtcbiAgICBjb25zdCBkZWZzID0gaGVhZGVyR3JvdXBEZWZzLnNsaWNlKCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGFibGVEZWZzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBvcmdQcm9wID0gdGFibGVEZWZzW2ldLm9yZ1Byb3A7XG4gICAgICBjb25zdCBpZHggPSBkZWZzLmZpbmRJbmRleCggZCA9PiBkLnByb3AgPT09IG9yZ1Byb3ApO1xuICAgICAgY29uc3QgY29sdW1uR3JvdXBEZWY6IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiA9IGlkeCAhPT0gLTFcbiAgICAgICAgPyBkZWZzLnNwbGljZShpZHgsIDEpWzBdXG4gICAgICAgIDogZGVmcy5maW5kKCBkID0+ICFkLnByb3AgKSB8fCB7IHByb3A6IG9yZ1Byb3AsIHJvd0luZGV4LCBzcGFuOiB1bmRlZmluZWQgfVxuICAgICAgO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlciA9IGlkeCA9PT0gLTEgJiYgISFjb2x1bW5Hcm91cERlZi5wcm9wO1xuXG4gICAgICBjb2x1bW5Hcm91cERlZi5wcm9wID0gb3JnUHJvcDtcbiAgICAgIGNvbHVtbkdyb3VwRGVmLnJvd0luZGV4ID0gcm93SW5kZXg7XG5cbiAgICAgIGxldCB0YWtlID0gY29sdW1uR3JvdXBEZWYuc3BhbjtcbiAgICAgIGlmICghICh0YWtlID49IDApICkge1xuICAgICAgICB0YWtlID0gMDtcbiAgICAgICAgZm9yIChsZXQgeiA9IGkrMTsgeiA8IGxlbjsgeisrKSB7XG4gICAgICAgICAgaWYgKGRlZnMuZmluZEluZGV4KCBkID0+IGQucHJvcCA9PT0gdGFibGVEZWZzW3pdLm9yZ1Byb3ApID09PSAtMSkge1xuICAgICAgICAgICAgdGFrZSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29sdW1uR3JvdXBEZWYuc3BhbiA9IHRha2U7XG4gICAgICBjb25zdCBncm91cCA9IG5ldyBQYmxDb2x1bW5Hcm91cChjb2x1bW5Hcm91cERlZiwgdGFibGVEZWZzLnNsaWNlKGksIGkgKyB0YWtlICsgMSksIHBsYWNlaG9sZGVyKTtcbiAgICAgIGhlYWRlckdyb3VwLnB1c2goZ3JvdXApO1xuICAgICAgaSArPSB0YWtlO1xuICAgIH1cblxuICAgIHJldHVybiBoZWFkZXJHcm91cDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uRmFjdG9yeSgpOiBQYmxDb2x1bW5GYWN0b3J5IHtcbiAgcmV0dXJuIG5ldyBQYmxDb2x1bW5GYWN0b3J5KClcbn1cbiJdfQ==