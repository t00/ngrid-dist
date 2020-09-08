/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/factory.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __spread } from "tslib";
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
            function (d) { return new PblColumn(__assign(__assign({}, _defaults.table), d), groupStore); })),
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
            function (c) { return new PblMetaColumn(__assign(__assign({}, _defaults.header), c)); })),
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
            function (c) { return new PblMetaColumn(__assign(__assign({}, _defaults.footer), c)); }))
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
        (_a = (/** @type {?} */ (this))._raw.table.cols).push.apply(_a, __spread((/** @type {?} */ (defs))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBU0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUlyRTtJQUFBO1FBQ1UsU0FBSSxHQUFnQyxFQUFFLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3JHLGNBQVMsR0FBRztZQUNsQixLQUFLLEVBQUUsbUJBQUEsRUFBRSxFQUFnQztZQUN6QyxNQUFNLEVBQUUsbUJBQUEsRUFBRSxFQUFvQztZQUM5QyxNQUFNLEVBQUUsbUJBQUEsRUFBRSxFQUFvQztTQUMvQyxDQUFDO1FBRU0sc0JBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLHNCQUFpQixHQUFHLENBQUMsQ0FBQztJQTZSaEMsQ0FBQztJQTNSQyxzQkFBSSw4Q0FBZ0I7Ozs7UUFBcEIsY0FBaUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNqRSxzQkFBSSw4Q0FBZ0I7Ozs7UUFBcEIsY0FBaUMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7Ozs7SUFFMUQsa0NBQWlCOzs7O0lBQXhCLFVBQXlCLElBQWlDOztZQUNsRCxDQUFDLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRTtRQUNoQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIs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Riw2Q0FBOEI7Ozs7O0lBQzlCLDZDQUE4Qjs7Ozs7QUErUmhDLE1BQU0sVUFBVSxhQUFhO0lBQzNCLE9BQU8sSUFBSSxnQkFBZ0IsRUFBRSxDQUFBO0FBQy9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLFxuICBQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LFxuICBQYmxOZ3JpZENvbHVtblNldCxcbiAgUGJsTWV0YVJvd0RlZmluaXRpb25zXG59IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4vbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uR3JvdXAsIFBibENvbHVtbkdyb3VwU3RvcmUgfSBmcm9tICcuL2dyb3VwLWNvbHVtbic7XG5cbmV4cG9ydCB0eXBlIENPTFVNTiA9IFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cDtcblxuZXhwb3J0IGNsYXNzIFBibENvbHVtbkZhY3Rvcnkge1xuICBwcml2YXRlIF9yYXc6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCA9IHsgdGFibGU6IHsgY29sczogW10gfSwgaGVhZGVyOiBbXSwgZm9vdGVyOiBbXSwgaGVhZGVyR3JvdXA6IFtdIH07XG4gIHByaXZhdGUgX2RlZmF1bHRzID0ge1xuICAgIHRhYmxlOiB7fSBhcyBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+LFxuICAgIGhlYWRlcjoge30gYXMgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4sXG4gICAgZm9vdGVyOiB7fSBhcyBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPixcbiAgfTtcblxuICBwcml2YXRlIF9jdXJyZW50SGVhZGVyUm93ID0gMDtcbiAgcHJpdmF0ZSBfY3VycmVudEZvb3RlclJvdyA9IDA7XG5cbiAgZ2V0IGN1cnJlbnRIZWFkZXJSb3coKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRIZWFkZXJSb3c7IH1cbiAgZ2V0IGN1cnJlbnRGb290ZXJSb3coKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRGb290ZXJSb3c7IH1cblxuICBzdGF0aWMgZnJvbURlZmluaXRpb25TZXQoZGVmczogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0KTogUGJsQ29sdW1uRmFjdG9yeSB7XG4gICAgY29uc3QgZiA9IG5ldyBQYmxDb2x1bW5GYWN0b3J5KCk7XG4gICAgT2JqZWN0LmFzc2lnbihmLl9yYXcsIGRlZnMpO1xuICAgIHJldHVybiBmO1xuICB9XG5cbiAgYnVpbGQoKTogUGJsTmdyaWRDb2x1bW5TZXQge1xuICAgIGNvbnN0IHsgX2RlZmF1bHRzLCBfcmF3IH0gPSB0aGlzO1xuXG4gICAgY29uc3QgZ3JvdXBTdG9yZSA9IG5ldyBQYmxDb2x1bW5Hcm91cFN0b3JlKCk7XG5cbiAgICBjb25zdCB0YWJsZTogUGJsTmdyaWRDb2x1bW5TZXRbJ3RhYmxlJ10gPSB7XG4gICAgICBoZWFkZXI6IF9yYXcudGFibGUuaGVhZGVyLFxuICAgICAgZm9vdGVyOiBfcmF3LnRhYmxlLmZvb3RlcixcbiAgICAgIGNvbHM6IF9yYXcudGFibGUuY29scy5tYXAoIGQgPT4gbmV3IFBibENvbHVtbih7IC4uLl9kZWZhdWx0cy50YWJsZSwgLi4uZCB9LCBncm91cFN0b3JlKSksXG4gICAgfTtcbiAgICBjb25zdCBoZWFkZXIgPSBfcmF3LmhlYWRlci5tYXAoIGggPT4gKHtcbiAgICAgIHJvd0luZGV4OiBoLnJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lOiBoLnJvd0NsYXNzTmFtZSxcbiAgICAgIHR5cGU6IGgudHlwZSB8fCAnZml4ZWQnLFxuICAgICAgY29sczogaC5jb2xzLm1hcCggYyA9PiBuZXcgUGJsTWV0YUNvbHVtbiggeyAuLi5fZGVmYXVsdHMuaGVhZGVyLCAuLi5jIH0gKSksXG4gICAgfSkpO1xuICAgIGNvbnN0IGZvb3RlciA9IF9yYXcuZm9vdGVyLm1hcCggZiA9PiAoe1xuICAgICAgcm93SW5kZXg6IGYucm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWU6IGYucm93Q2xhc3NOYW1lLFxuICAgICAgdHlwZTogZi50eXBlIHx8ICdmaXhlZCcsXG4gICAgICBjb2xzOiBmLmNvbHMubWFwKCBjID0+IG5ldyBQYmxNZXRhQ29sdW1uKHsgLi4uX2RlZmF1bHRzLmZvb3RlciwgLi4uYyB9KSApXG4gICAgfSkpO1xuICAgIGNvbnN0IGhlYWRlckdyb3VwID0gX3Jhdy5oZWFkZXJHcm91cC5tYXAoIGhnID0+ICh7XG4gICAgICByb3dJbmRleDogaGcucm93SW5kZXgsXG4gICAgICByb3dDbGFzc05hbWU6IGhnLnJvd0NsYXNzTmFtZSxcbiAgICAgIHR5cGU6IGhnLnR5cGUgfHwgJ2ZpeGVkJyxcbiAgICAgIGNvbHM6IHRoaXMuYnVpbGRIZWFkZXJHcm91cHMoaGcucm93SW5kZXgsIGhnLmNvbHMsIHRhYmxlLmNvbHMpLm1hcCggZyA9PiB7XG4gICAgICAgIGdyb3VwU3RvcmUuYWRkKGcpO1xuICAgICAgICByZXR1cm4gZztcbiAgICAgIH0pLFxuICAgIH0pKTtcblxuICAgIHJldHVybiB7XG4gICAgICBncm91cFN0b3JlLFxuICAgICAgdGFibGUsXG4gICAgICBoZWFkZXIsXG4gICAgICBmb290ZXIsXG4gICAgICBoZWFkZXJHcm91cCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgaGVhZGVyL2Zvb3RlciBjb2x1bW5zLlxuICAgKi9cbiAgZGVmYXVsdChkZWY6IFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInKTogdGhpcztcbiAgLyoqXG4gICAqIFNldCB0aGUgZGVmYXVsdCBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGFibGUgY29sdW1ucy5cbiAgICovXG4gIGRlZmF1bHQoZGVmOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+LCB0eXBlPzogJ3RhYmxlJyk6IHRoaXM7XG4gIGRlZmF1bHQoZGVmOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+IHwgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4sIHR5cGU6ICd0YWJsZScgfCAnaGVhZGVyJyB8ICdmb290ZXInID0gJ3RhYmxlJyk6IHRoaXMge1xuICAgIHRoaXMuX2RlZmF1bHRzW3R5cGVdID0gZGVmO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBncmlkIGNvbHVtbnMuXG4gICAqXG4gICAqIFRhYmxlIGNvbHVtbnMgYXJlIG1hbmRhdG9yeSwgdGhleSBhcmUgdGhlIGNvbHVtbnMgdGhhdCBkZWZpbmUgdGhlIHN0cnVjdHVyZSBvZiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIEVhY2ggY29sdW1uIHdpbGwgdXN1YWxseSBwb2ludCB0byBwcm9wZXJ0eSBvbiB0aGUgcm93LCBhbHRob3VnaCB5b3UgY2FuIGNyZWF0ZSBjb2x1bW5zIHRoYXQgZG9lcyBub3RcbiAgICogZXhpc3Qgb24gdGhlIHJvdyBhbmQgaGFuZGxlIHRoZWlyIHJlbmRlcmluZyB3aXRoIGEgY2VsbCB0ZW1wbGF0ZS5cbiAgICpcbiAgICogRWFjaCBncmlkIGNvbHVtbiBpcyBhbHNvIGEgaGVhZGVyIGNvbHVtbiBhbmQgYSBmb290ZXIgY29sdW1uIHRoYXQgZGlzcGxheS5cbiAgICogVGhlIGhlYWRlciBhbmQgZm9vdGVyIGFyZSBhdXRvbWF0aWNhbGx5IGNyZWF0ZWQsIElmIHlvdSB3aXNoIG5vdCB0byBzaG93IHRoZW0gc2V0IGhlYWRlclJvdy9mb290ZXJSb3cgdG8gZmFsc2UgaW4gUGJsVGFibGUuXG4gICAqXG4gICAqL1xuICB0YWJsZShyb3dPcHRpb25zOiB7IGhlYWRlcj86IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZm9vdGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zIH0sIC4uLmRlZnM6IFBibENvbHVtbkRlZmluaXRpb25bXSk6IHRoaXM7XG4gIHRhYmxlKC4uLmRlZnM6IFBibENvbHVtbkRlZmluaXRpb25bXSk6IHRoaXM7XG4gIHRhYmxlKC4uLmRlZnM6IEFycmF5PHsgaGVhZGVyPzogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBmb290ZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSB8IFBibENvbHVtbkRlZmluaXRpb24+KTogdGhpcyB7XG4gICAgY29uc3Qgcm93T3B0aW9uczogeyBoZWFkZXI/OiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IGZvb3Rlcj86IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9ID0gKGRlZnNbMF0gYXMgYW55KS5wcm9wID8ge30gOiBkZWZzLnNoaWZ0KCkgYXMgYW55O1xuICAgIGNvbnN0IHsgaGVhZGVyLCBmb290ZXIgfSA9IHJvd09wdGlvbnM7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLl9yYXcudGFibGUsIHsgaGVhZGVyLCBmb290ZXIgfSk7XG4gICAgdGhpcy5fcmF3LnRhYmxlLmNvbHMucHVzaCguLi5kZWZzIGFzIFBibENvbHVtbkRlZmluaXRpb25bXSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGhlYWRlciByb3cgd2l0aCBoZWFkZXIgY29sdW1ucy5cbiAgICogQ3JlYXRlcyBhbiBhZGRpdGlvbmFsIGhlYWRlciByb3cgaW4gcG9zaXRpb24gYGN1cnJlbnRIZWFkZXJSb3dgIHVzaW5nIHRoZSBwcm92aWRlZCBoZWFkZXIgY29sdW1uIGRlZmluaXRpb25zLlxuICAgKiBFYWNoIGRlZmluaXRpb24gcmVwcmVzZW50IGEgY2VsbCwgdGhlIGNlbGwncyBkb2VzIG5vdCBoYXZlIHRvIGFsaWduIHdpdGggdGhlIGxheW91dCBvZiBncmlkIGNvbHVtbnMuXG4gICAqXG4gICAqIEFsbCBoZWFkZXIgcm93IHdpbGwgcG9zaXRpb24gQkVGT1JFIHRoZSBncmlkIGNvbHVtbiBoZWFkZXIgcm93LlxuICAgKiBIZWFkZXIgY29sdW1ucyBhcmUgb3B0aW9uYWwuXG4gICAqIEVhY2ggY2FsbCB0byBgaGVhZGVyKClgIHdpbGwgY3JlYXRlIGEgbmV3IHJvdywgaW5jcmVtZW50aW5nIHRoZSBgY3VycmVudEhlYWRlclJvd2AuXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIEV4YW1wbGU6XG4gICAqIGBgYGpzXG4gICAqICAgZmFjdG9yeS50YWJsZSgxLCAyLCAzKVxuICAgKiAgICAgLmhlYWRlcihhLCBiLCBjKS5oZWFkZXIoZCwgZSwgZik7XG4gICAqIGBgYFxuICAgKlxuICAgKiB3aWxsIHJlc3VsdCBpbjpcbiAgICogICBoZWFkZXIxIC1cXD4gIGEgYiBjXG4gICAqICAgaGVhZGVyMiAtXFw+ICBkIGUgZlxuICAgKiAgIHRhYmxlICAgLVxcPiAgMSAyIDNcbiAgICovXG4gIGhlYWRlcihyb3dPcHRpb25zOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMsIC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzO1xuICBoZWFkZXIoLi4uZGVmczogQXJyYXk8UGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXM7XG4gIGhlYWRlciguLi5kZWZzOiBBcnJheTxQYmxNZXRhUm93RGVmaW5pdGlvbnMgfCBQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcyB7XG4gICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLl9jdXJyZW50SGVhZGVyUm93Kys7XG4gICAgY29uc3Qgcm93T3B0aW9ucyA9IHRoaXMucHJvY2Vzc1Jvd09wdGlvbnMoZGVmcyk7XG4gICAgY29uc3Qgcm93Q2xhc3NOYW1lID0gdGhpcy5nZW5Sb3dDbGFzcyhyb3dPcHRpb25zLCByb3dJbmRleCk7XG5cbiAgICBjb25zdCBoZWFkZXJzID0gZGVmcy5tYXAoIChkOiBQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24pID0+IHtcbiAgICAgIGNvbnN0IGRlZjogUGJsTWV0YUNvbHVtbkRlZmluaXRpb24gPSB7XG4gICAgICAgIGlkOiBkLmlkLFxuICAgICAgICBraW5kOiAnaGVhZGVyJyxcbiAgICAgICAgcm93SW5kZXhcbiAgICAgIH07XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZWYsIGQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fcmF3LmhlYWRlci5wdXNoKHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgcm93Q2xhc3NOYW1lLFxuICAgICAgY29sczogaGVhZGVycyxcbiAgICAgIHR5cGU6IChyb3dPcHRpb25zICYmIHJvd09wdGlvbnMudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgZm9vdGVyIHJvdyB3aXRoIGZvb3RlciBjb2x1bW5zLlxuICAgKiBDcmVhdGVzIGFuIGFkZGl0aW9uYWwgZm9vdGVyIHJvdyBpbiBwb3NpdGlvbiBgY3VycmVudEZvb3RlclJvd2AgdXNpbmcgdGhlIHByb3ZpZGVkIGZvb3RlciBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqIEVhY2ggZGVmaW5pdGlvbiByZXByZXNlbnQgYSBjZWxsLCB0aGUgY2VsbCdzIGRvZXMgbm90IGhhdmUgdG8gYWxpZ24gd2l0aCB0aGUgbGF5b3V0IG9mIGdyaWQgY29sdW1ucy5cbiAgICpcbiAgICogQWxsIGZvb3RlciByb3cgd2lsbCBwb3NpdGlvbiBBRlRFUiB0aGUgZ3JpZCBjb2x1bW4gZm9vdGVyIHJvdy5cbiAgICogRm9vdGVyIGNvbHVtbnMgYXJlIG9wdGlvbmFsLlxuICAgKiBFYWNoIGNhbGwgdG8gYGZvb3RlcigpYCB3aWxsIGNyZWF0ZSBhIG5ldyByb3csIGluY3JlbWVudGluZyB0aGUgYGN1cnJlbnRGb290ZXJSb3dgLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBFeGFtcGxlOlxuICAgKiBgYGBqc1xuICAgKiAgIGZhY3RvcnkudGFibGUoMSwgMiwgMylcbiAgICogICAgIC5mb290ZXIoYSwgYiwgYykuZm9vdGVyKGQsIGUsIGYpO1xuICAgKiBgYGBcbiAgICpcbiAgICogd2lsbCByZXN1bHQgaW46XG4gICAqICAgdGFibGUgICAtXFw+ICAxIDIgM1xuICAgKiAgIGZvb3RlcjEgLVxcPiAgYSBiIGNcbiAgICogICBmb290ZXIyIC1cXD4gIGQgZSBmXG4gICAqL1xuICBmb290ZXIocm93T3B0aW9uczogUGJsTWV0YVJvd0RlZmluaXRpb25zLCAuLi5kZWZzOiBBcnJheTxQaWNrPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uLCAnaWQnPiAmIFBhcnRpYWw8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24+ICYgUGJsQmFzZUNvbHVtbkRlZmluaXRpb24+KTogdGhpcztcbiAgZm9vdGVyKC4uLmRlZnM6IEFycmF5PFBpY2s8UGJsTWV0YUNvbHVtbkRlZmluaXRpb24sICdpZCc+ICYgUGFydGlhbDxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbj4gJiBQYmxCYXNlQ29sdW1uRGVmaW5pdGlvbj4pOiB0aGlzO1xuICBmb290ZXIoLi4uZGVmczogQXJyYXk8UGJsTWV0YVJvd0RlZmluaXRpb25zIHwgUGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uPik6IHRoaXMge1xuICAgIGNvbnN0IHJvd0luZGV4ID0gdGhpcy5fY3VycmVudEZvb3RlclJvdysrO1xuICAgIGNvbnN0IHJvd09wdGlvbnMgPSB0aGlzLnByb2Nlc3NSb3dPcHRpb25zKGRlZnMpO1xuICAgIGNvbnN0IHJvd0NsYXNzTmFtZSA9IHRoaXMuZ2VuUm93Q2xhc3Mocm93T3B0aW9ucywgcm93SW5kZXgpO1xuXG4gICAgY29uc3QgZm9vdGVycyA9IGRlZnMubWFwKCAoZDogUGljazxQYmxNZXRhQ29sdW1uRGVmaW5pdGlvbiwgJ2lkJz4gJiBQYXJ0aWFsPFBibE1ldGFDb2x1bW5EZWZpbml0aW9uPiAmIFBibEJhc2VDb2x1bW5EZWZpbml0aW9uKSA9PiB7XG4gICAgICBjb25zdCBkZWY6IFBibE1ldGFDb2x1bW5EZWZpbml0aW9uID0ge1xuICAgICAgICBpZDogZC5pZCxcbiAgICAgICAga2luZDogJ2Zvb3RlcicsXG4gICAgICAgIHJvd0luZGV4XG4gICAgICB9O1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZGVmLCBkKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3Jhdy5mb290ZXIucHVzaCh7XG4gICAgICByb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZSxcbiAgICAgIGNvbHM6IGZvb3RlcnMsXG4gICAgICB0eXBlOiAocm93T3B0aW9ucyAmJiByb3dPcHRpb25zLnR5cGUpIHx8ICdmaXhlZCcsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGhlYWRlciByb3cgd2l0aCBoZWFkZXIgZ3JvdXAgY29sdW1ucy5cbiAgICogQSBoZWFkZXIgZ3JvdXAgY29sdW1uIGlzIGEgY29sdW1ucyBpcyBhIGhlYWRlciBjb2x1bW5zIHRoYXQgc3BhbnMgb25lIG9yIG1vcmUgY29sdW1ucy5cbiAgICpcbiAgICogQ3JlYXRlIGFuIGFkZGl0aW9uYWwgaGVhZGVyIHJvdyBpbiBwb3NpdGlvbiBgY3VycmVudEhlYWRlclJvd2AgdXNpbmcgdGhlIHByb3ZpZGVkIGhlYWRlciBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqIEVhY2ggZGVmaW5pdGlvbiByZXByZXNlbnQgYSBjZWxsLCB0aGUgY2VsbCdzIGRvZXMgbm90IGhhdmUgdG8gYWxpZ24gd2l0aCB0aGUgbGF5b3V0IG9mIGdyaWQgY29sdW1ucy5cbiAgICpcbiAgICogQWxsIGhlYWRlciByb3cgd2lsbCBwb3NpdGlvbiBCRUZPUkUgdGhlIGdyaWQgY29sdW1uIGhlYWRlciByb3cuXG4gICAqIEhlYWRlciBjb2x1bW5zIGFyZSBvcHRpb25hbC5cbiAgICogRWFjaCBjYWxsIHRvIGBoZWFkZXIoKWAgd2lsbCBjcmVhdGUgYSBuZXcgcm93LCBpbmNyZW1lbnRpbmcgdGhlIGBjdXJyZW50SGVhZGVyUm93YC5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogRXhhbXBsZTpcbiAgICogYGBganNcbiAgICogICBmYWN0b3J5LnRhYmxlKDEsIDIsIDMpXG4gICAqICAgICAuaGVhZGVyKGEsIGIsIGMpLmhlYWRlcihkLCBlLCBmKTtcbiAgICogYGBgXG4gICAqXG4gICAqIHdpbGwgcmVzdWx0IGluOlxuICAgKiAgIGhlYWRlcjEgLVxcPiAgYSBiIGNcbiAgICogICBoZWFkZXIyIC1cXD4gIGQgZSBmXG4gICAqICAgdGFibGUgICAtXFw+ICAxIDIgM1xuICAgKi9cbiAgaGVhZGVyR3JvdXAocm93T3B0aW9uczogUGJsTWV0YVJvd0RlZmluaXRpb25zLCAuLi5kZWZzOiBBcnJheTxQaWNrPFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiwgJ3Byb3AnPiAmIFBhcnRpYWw8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uPj4pOiB0aGlzO1xuICBoZWFkZXJHcm91cCguLi5kZWZzOiBBcnJheTxQaWNrPFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbiwgJ3Byb3AnPiAmIFBhcnRpYWw8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uPj4pOiB0aGlzO1xuICBoZWFkZXJHcm91cCguLi5kZWZzOiBBcnJheTxQYmxNZXRhUm93RGVmaW5pdGlvbnMgfCAoIFBpY2s8UGJsQ29sdW1uR3JvdXBEZWZpbml0aW9uLCAncHJvcCc+ICYgUGFydGlhbDxQYmxDb2x1bW5Hcm91cERlZmluaXRpb24+KSA+KTogdGhpcyB7XG4gICAgY29uc3Qgcm93SW5kZXggPSB0aGlzLl9jdXJyZW50SGVhZGVyUm93Kys7XG4gICAgY29uc3Qgcm93T3B0aW9ucyA9IHRoaXMucHJvY2Vzc1Jvd09wdGlvbnMoZGVmcywgJ3Byb3AnKTtcbiAgICBjb25zdCByb3dDbGFzc05hbWUgPSB0aGlzLmdlblJvd0NsYXNzKHJvd09wdGlvbnMsIHJvd0luZGV4KTtcblxuICAgIGNvbnN0IGhlYWRlckdyb3VwczogYW55ID0gZGVmcy5tYXAoIGQgPT4gT2JqZWN0LmFzc2lnbih7IHJvd0luZGV4IH0sIGQpICk7XG5cbiAgICB0aGlzLl9yYXcuaGVhZGVyR3JvdXAucHVzaCh7XG4gICAgICByb3dJbmRleCxcbiAgICAgIHJvd0NsYXNzTmFtZSxcbiAgICAgIGNvbHM6IGhlYWRlckdyb3VwcyxcbiAgICAgIHR5cGU6IChyb3dPcHRpb25zICYmIHJvd09wdGlvbnMudHlwZSkgfHwgJ2ZpeGVkJyxcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBwcm9jZXNzUm93T3B0aW9ucyhkZWZzOiBhbnlbXSwgbXVzdEhhdmVQcm9wZXJ0eTogc3RyaW5nID0gJ2lkJyk6IFBibE1ldGFSb3dEZWZpbml0aW9ucyB7XG4gICAgcmV0dXJuIGRlZnNbMF1bbXVzdEhhdmVQcm9wZXJ0eV0gPyB1bmRlZmluZWQgOiBkZWZzLnNoaWZ0KCk7XG4gIH1cblxuICBwcml2YXRlIGdlblJvd0NsYXNzKHJvd09wdGlvbnM6IHsgcm93Q2xhc3NOYW1lPzogc3RyaW5nIH0sIGZhbGxiYWNrUm93SW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIChyb3dPcHRpb25zICYmIHJvd09wdGlvbnMucm93Q2xhc3NOYW1lKSB8fCBgcGJsLW5ncmlkLXJvdy1pbmRleC0ke2ZhbGxiYWNrUm93SW5kZXgudG9TdHJpbmcoKX1gO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEhlYWRlckdyb3Vwcyhyb3dJbmRleDogbnVtYmVyLCBoZWFkZXJHcm91cERlZnM6IFBibENvbHVtbkdyb3VwRGVmaW5pdGlvbltdLCB0YWJsZTogUGJsQ29sdW1uW10pOiBQYmxDb2x1bW5Hcm91cFtdIHtcbiAgICBjb25zdCBoZWFkZXJHcm91cDogUGJsQ29sdW1uR3JvdXBbXSA9IFtdO1xuXG4gICAgLy8gQnVpbGRpbmcgb2YgaGVhZGVyIGdyb3VwIHJvd3MgcmVxdWlyZXMgc29tZSB3b3JrLlxuICAgIC8vIFRoZSB1c2VyIGRlZmluZWQgZ3JvdXBzIG1pZ2h0IG5vdCBjb3ZlciBhbGwgY29sdW1ucywgY3JlYXRpbmcgZ2FwcyBiZXR3ZWVuIGdyb3VwIGNvbHVtbnMgc28gd2UgbmVlZCB0byBhZGQgcGxhY2Vob2xkZXIgZ3JvdXBzIHRvIGNvdmVyIHRoZXNlIGdhcHMuXG4gICAgLy8gTW9yZW92ZXIsIHRoZSB1c2VyIG1pZ2h0IG5vdCBzcGVjaWZ5IGEgYHByb3BgLCB3aGljaCB3ZSBtaWdodCBuZWVkIHRvIGNvbXBsZXRlLlxuICAgIC8vIFdlIGRvIHRoYXQgZm9yIGVhY2ggaGVhZGVyIGdyb3VwIHJvdy5cbiAgICAvL1xuICAgIC8vIFRoZSBlbmQgZ29hbCBpcyB0byByZXR1cm4gYSBsaXN0IG9mIGBQYmxDb2x1bW5Hcm91cGAgdGhhdCBzcGFuIG92ZXIgdGhlIGVudGlyZSBjb2x1bW5zIG9mIHRoZSBncmlkLlxuICAgIC8vXG4gICAgLy8gVGhlIGxvZ2ljIGlzIGFzIGZvbGxvd3M6XG4gICAgLy8gRm9yIGVhY2ggY29sdW1uIGluIHRoZSBncmlkLCBmaW5kIGEgbWF0Y2hpbmcgY29sdW1uIGdyb3VwIC0gYSBncm91cCBwb2ludGluZyBhdCB0aGUgY29sdW1uIGJ5IGhhdmluZyB0aGUgc2FtZSBgcHJvcGBcbiAgICAvLyBJZiBmb3VuZCwgY2hlY2sgaXQncyBzcGFuIGFuZCBza2lwIFggYW1vdW50IG9mIGNvbHVtbnMgd2hlcmUgWCBpcyB0aGUgc3Bhbi5cbiAgICAvLyBJZiBhIHNwYW4gaXMgbm90IGRlZmluZWQgdGhlbiB0cmVhdCBpdCBhcyBhIGdyZWVkeSBncm91cCB0aGF0IHNwYW5zIG92ZXIgYWxsIGNvbHVtbnMgYWhlYWQgdW50aWwgdGhlIG5leHQgY29sdW1uIHRoYXQgaGFzIGEgbWF0Y2hpbmcgZ3JvdXAgY29sdW1uLlxuICAgIC8vXG4gICAgLy8gSWYgYSBjb2x1bW4gZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGdyb3VwIGNvbHVtbiwgc2VhcmNoIGZvciBncm91cCBjb2x1bW5zIHdpdGhvdXQgYSBgcHJvcGAgc3BlY2lmaWVkIGFuZCB3aGVuIGZvdW5kIHNldCB0aGVpciBgcHJvcGAgdG8gdGhlIGN1cnJlbnRcbiAgICAvLyBjb2x1bW4gc28gd2Ugd2lsbCBub3cgdXNlIHRoZW0gYXMgaWYgaXQncyBhIHVzZXIgcHJvdmlkZWQgZ3JvdXAgZm9yIHRoaXMgY29sdW1uLi4uXG4gICAgLy9cbiAgICAvLyBJZiBubyBncm91cCBjb2x1bW5zIGV4aXN0cyAob3IgbGVmdCksIHdlIGNyZWF0ZSBhbiBhZC1ob2MgZ3JvdXAgY29sdW1uIGFuZCB3ZSB3aWxsIG5vdyB1c2UgdGhlbSBhcyBpZiBpdCdzIGEgdXNlciBwcm92aWRlZCBncm91cCBmb3IgdGhpcyBjb2x1bW4uLi5cbiAgICAvL1xuICAgIGNvbnN0IHRhYmxlRGVmcyA9IHRhYmxlLnNsaWNlKCk7XG4gICAgY29uc3QgZGVmcyA9IGhlYWRlckdyb3VwRGVmcy5zbGljZSgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRhYmxlRGVmcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3Qgb3JnUHJvcCA9IHRhYmxlRGVmc1tpXS5vcmdQcm9wO1xuICAgICAgY29uc3QgaWR4ID0gZGVmcy5maW5kSW5kZXgoIGQgPT4gZC5wcm9wID09PSBvcmdQcm9wKTtcbiAgICAgIGNvbnN0IGNvbHVtbkdyb3VwRGVmOiBQYmxDb2x1bW5Hcm91cERlZmluaXRpb24gPSBpZHggIT09IC0xXG4gICAgICAgID8gZGVmcy5zcGxpY2UoaWR4LCAxKVswXVxuICAgICAgICA6IGRlZnMuZmluZCggZCA9PiAhZC5wcm9wICkgfHwgeyBwcm9wOiBvcmdQcm9wLCByb3dJbmRleCwgc3BhbjogdW5kZWZpbmVkIH1cbiAgICAgIDtcblxuICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBpZHggPT09IC0xICYmICEhY29sdW1uR3JvdXBEZWYucHJvcDtcblxuICAgICAgY29sdW1uR3JvdXBEZWYucHJvcCA9IG9yZ1Byb3A7XG4gICAgICBjb2x1bW5Hcm91cERlZi5yb3dJbmRleCA9IHJvd0luZGV4O1xuXG4gICAgICBsZXQgdGFrZSA9IGNvbHVtbkdyb3VwRGVmLnNwYW47XG4gICAgICBpZiAoISAodGFrZSA+PSAwKSApIHtcbiAgICAgICAgdGFrZSA9IDA7XG4gICAgICAgIGZvciAobGV0IHogPSBpKzE7IHogPCBsZW47IHorKykge1xuICAgICAgICAgIGlmIChkZWZzLmZpbmRJbmRleCggZCA9PiBkLnByb3AgPT09IHRhYmxlRGVmc1t6XS5vcmdQcm9wKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRha2UrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbHVtbkdyb3VwRGVmLnNwYW4gPSB0YWtlO1xuICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgUGJsQ29sdW1uR3JvdXAoY29sdW1uR3JvdXBEZWYsIHRhYmxlRGVmcy5zbGljZShpLCBpICsgdGFrZSArIDEpLCBwbGFjZWhvbGRlcik7XG4gICAgICBoZWFkZXJHcm91cC5wdXNoKGdyb3VwKTtcbiAgICAgIGkgKz0gdGFrZTtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVhZGVyR3JvdXA7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbHVtbkZhY3RvcnkoKTogUGJsQ29sdW1uRmFjdG9yeSB7XG4gIHJldHVybiBuZXcgUGJsQ29sdW1uRmFjdG9yeSgpXG59XG4iXX0=