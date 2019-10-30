(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/checkbox'), require('@pebula/ngrid'), require('@angular/cdk/coercion'), require('@pebula/utils'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/transpose', ['exports', '@angular/core', '@angular/common', '@angular/material/checkbox', '@pebula/ngrid', '@angular/cdk/coercion', '@pebula/utils', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.transpose = {}), global.ng.core, global.ng.common, global.ng.material.checkbox, global.pebula.ngrid, global.ng.cdk.coercion, global.pebula.utils, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, common, checkbox, ngrid, coercion, utils, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var LOCAL_COLUMN_DEF = Symbol('LOCAL_COLUMN_DEF');
    /** @type {?} */
    var VIRTUAL_REFRESH = {};
    var TransposeTableSession = /** @class */ (function () {
        function TransposeTableSession(table, pluginCtrl, updateColumns, sourceFactoryWrapper) {
            this.table = table;
            this.pluginCtrl = pluginCtrl;
            this.updateColumns = updateColumns;
            this.sourceFactoryWrapper = sourceFactoryWrapper;
            this.init();
            if (table.columns && table.columnApi.visibleColumns.length > 0) {
                this.onInvalidateHeaders();
            }
            this.onDataSource(this.table.ds);
        }
        /**
         * @param {?} updateTable
         * @return {?}
         */
        TransposeTableSession.prototype.destroy = /**
         * @param {?} updateTable
         * @return {?}
         */
        function (updateTable) {
            if (!this.destroyed) {
                this.destroyed = true;
                utils.UnRx.kill(this, this.table);
                this.table.showHeader = this.headerRow;
                this.table.columns = this.columnsInput;
                if (updateTable) {
                    this.table.invalidateColumns();
                    this.table.ds.refresh(VIRTUAL_REFRESH);
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        TransposeTableSession.prototype.init = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this.headerRow = this.table.showHeader;
            this.table.showHeader = false;
            this.pluginCtrl.events
                .pipe(utils.UnRx(this, this.table))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.kind === 'onInvalidateHeaders' && _this.onInvalidateHeaders(); }));
            this.pluginCtrl.events
                .pipe(utils.UnRx(this, this.table))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.kind === 'onDataSource' && _this.onDataSource(e.curr); }));
        };
        /**
         * @private
         * @return {?}
         */
        TransposeTableSession.prototype.onInvalidateHeaders = /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.table.columns[LOCAL_COLUMN_DEF]) {
                this.columnsInput = this.table.columns;
                this.storeColumns = this.table.columnApi.visibleColumns;
                this.updateColumns();
            }
        };
        /**
         * @private
         * @param {?=} ds
         * @return {?}
         */
        TransposeTableSession.prototype.onDataSource = /**
         * @private
         * @param {?=} ds
         * @return {?}
         */
        function (ds) {
            var _this = this;
            this.unPatchDataSource();
            if (ds) {
                this.ds = ds;
                this.dsSourceFactory = ds.adapter.sourceFactory;
                this.ds.adapter.sourceFactory = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var rawSource = event.data.changed && event.data.curr === VIRTUAL_REFRESH
                        ? _this.ds.source
                        : _this.dsSourceFactory(event);
                    if (rawSource === false) {
                        return rawSource;
                    }
                    else if (_this.destroyed) {
                        _this.unPatchDataSource();
                        return _this.rawSource;
                    }
                    /** @type {?} */
                    var obs = rxjs.isObservable(rawSource)
                        ? rawSource
                        : Array.isArray(rawSource) ? rxjs.of(rawSource) : rxjs.from(rawSource) // promise...
                    ;
                    return obs
                        .pipe(operators.tap((/**
                     * @param {?} source
                     * @return {?}
                     */
                    function (source) { return _this.rawSource = source; })), operators.map(_this.sourceFactoryWrapper));
                });
            }
        };
        /**
         * @private
         * @return {?}
         */
        TransposeTableSession.prototype.unPatchDataSource = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.ds) {
                this.ds.adapter.sourceFactory = this.dsSourceFactory;
                this.ds = this.dsSourceFactory = undefined;
            }
        };
        return TransposeTableSession;
    }());
    if (false) {
        /** @type {?} */
        TransposeTableSession.prototype.dsSourceFactory;
        /** @type {?} */
        TransposeTableSession.prototype.ds;
        /** @type {?} */
        TransposeTableSession.prototype.columnsInput;
        /** @type {?} */
        TransposeTableSession.prototype.storeColumns;
        /** @type {?} */
        TransposeTableSession.prototype.headerRow;
        /**
         * @type {?}
         * @private
         */
        TransposeTableSession.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        TransposeTableSession.prototype.rawSource;
        /**
         * @type {?}
         * @private
         */
        TransposeTableSession.prototype.table;
        /**
         * @type {?}
         * @private
         */
        TransposeTableSession.prototype.pluginCtrl;
        /**
         * @type {?}
         * @private
         */
        TransposeTableSession.prototype.updateColumns;
        /**
         * @type {?}
         * @private
         */
        TransposeTableSession.prototype.sourceFactoryWrapper;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TRANSFORM_ROW_REF = Symbol('TRANSFORM_ROW_REF');
    /**
     * @param {?} row
     * @return {?}
     */
    function getCellValueAsHeader(row) {
        return row.label;
    }
    /**
     * @this {?}
     * @param {?} colAsRow
     * @return {?}
     */
    function getCellValueTransformed(colAsRow) {
        return colAsRow.getValue(this.data[TRANSFORM_ROW_REF]);
    }
    /**
     * @param {?} row
     * @param {?} index
     * @return {?}
     */
    function createTransformedColumn(row, index) {
        var _a;
        return { prop: "__transform_item_" + index + "__", data: (_a = {}, _a[TRANSFORM_ROW_REF] = row, _a) };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
    /** @type {?} */
    var PLUGIN_KEY = 'transpose';
    /**
     * Transpose plugin.
     *
     * This plugin will swaps around the rows and columns of the table.
     *
     * A **regular table** (not transposed) represents rows horizontally:
     *
     * - Each horizontal row represents an item in the collection.
     * - Each vertical column represents the same property of all rows in the collection.
     *
     * A **transposed** table represents row vertically:
     *
     * - Each horizontal row represents the same property of all rows in the collection.
     * - Each vertical row represents an item in the collection.
     *
     * > Note that transposing a table might not play nice with other plugins and/or features.
     * For example, using pagination with transpose make no sense.
     */
    var PblNgridTransposePluginDirective = /** @class */ (function () {
        function PblNgridTransposePluginDirective(table, pluginCtrl, config) {
            this.table = table;
            this.pluginCtrl = pluginCtrl;
            this._header = DEFAULT_HEADER_COLUMN;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            /** @type {?} */
            var transposePlugin = config.get('transposePlugin');
            if (transposePlugin) {
                this.header = transposePlugin.header;
                this.defaultCol = transposePlugin.defaultCol || {};
                this.matchTemplates = transposePlugin.matchTemplates || false;
            }
        }
        Object.defineProperty(PblNgridTransposePluginDirective.prototype, "transpose", {
            get: /**
             * @return {?}
             */
            function () { return this.enabled; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (value !== this.enabled) {
                    /** @type {?} */
                    var isFirst = this.enabled === undefined;
                    this.enabled = value;
                    if (!value) {
                        this.disable(true);
                    }
                    else {
                        this.enable(!isFirst);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridTransposePluginDirective.prototype, "header", {
            /**
             * Column definitions for the new header column, this is the column the first column that
             * will display all the headers.
             *
             * This is an optional value, when not set a default column settings is used:
             *
             * ```js
             * {
             *  prop: '__transpose__',
             *  css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell',
             * }
             * ```
             *
             * When set, the new column values will merge into the default definitions, overriding existing properties
             * set on the default column settings.
             *
             * > The header column behave like any other column and you can also provide define it in the `column` property on the table.
             * When using this approach the column defined on the table is used as is (no merging). Just make sure you use the right `prop` value for it.
             * e.g. if `header` is not set here its `__transpose__` otherwise, the actual `prop` value.
             */
            set: /**
             * Column definitions for the new header column, this is the column the first column that
             * will display all the headers.
             *
             * This is an optional value, when not set a default column settings is used:
             *
             * ```js
             * {
             *  prop: '__transpose__',
             *  css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell',
             * }
             * ```
             *
             * When set, the new column values will merge into the default definitions, overriding existing properties
             * set on the default column settings.
             *
             * > The header column behave like any other column and you can also provide define it in the `column` property on the table.
             * When using this approach the column defined on the table is used as is (no merging). Just make sure you use the right `prop` value for it.
             * e.g. if `header` is not set here its `__transpose__` otherwise, the actual `prop` value.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._header = Object.assign({}, DEFAULT_HEADER_COLUMN, value || {});
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridTransposePluginDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._removePlugin(this.table);
            this.disable(false);
        };
        /**
         * @param {?} updateTable
         * @return {?}
         */
        PblNgridTransposePluginDirective.prototype.disable = /**
         * @param {?} updateTable
         * @return {?}
         */
        function (updateTable) {
            if (this.tableState) {
                var tableState = this.tableState;
                this.columns = this.selfColumn = this.tableState = this.columns = this.selfColumn = undefined;
                tableState.destroy(updateTable);
            }
        };
        /**
         * @param {?=} refreshDataSource
         * @return {?}
         */
        PblNgridTransposePluginDirective.prototype.enable = /**
         * @param {?=} refreshDataSource
         * @return {?}
         */
        function (refreshDataSource) {
            var _this = this;
            if (refreshDataSource === void 0) { refreshDataSource = false; }
            if (this.tableState) {
                this.disable(false);
            }
            /** @type {?} */
            var sourceFactoryWrapper = (/**
             * @param {?} results
             * @return {?}
             */
            function (results) {
                var _a, e_1, _b, e_2, _c;
                if (results) {
                    /** @type {?} */
                    var local = _this.table.columns = (_a = ngrid.columnFactory()
                        .default(_this.defaultCol || {})).table.apply(_a, __spread([_this.selfColumn], results.map(createTransformedColumn))).build();
                    /** @type {?} */
                    var prev = _this.tableState.columnsInput;
                    local.header = prev.header;
                    local.headerGroup = prev.headerGroup;
                    local.footer = prev.footer;
                    local[LOCAL_COLUMN_DEF] = true;
                    _this.table.invalidateColumns();
                    /** @type {?} */
                    var matchTemplates = coercion.coerceBooleanProperty(_this.matchTemplates);
                    var prop = _this._header.prop;
                    /** @type {?} */
                    var columnKeysToProxy = ['type'];
                    if (matchTemplates) {
                        columnKeysToProxy.push('cellTpl');
                    }
                    /* The following logic is not for the faint of heart.
                               Basically, the transpose plugin does not swap the actual data but the columns.
                               When transposing, all rows will swap to columns so, A new column definition is created,
                               with columns equal to the total number or items in the datasource.
                               Each column (new one) represents a row so we save a reference to the actual row in the new column.
                    
                               The next step is to create a new datasource, the new datasource is simply a collection of all of the original columns.
                    
                               Now when `getValue` is called on the new column it is called with a "row" which is the original column.
                               Because the new column has a reference to the actual (original) row we can call the `getValue` on the old column with the actual row.
                    
                               In this process, all of the column metadata related to the presentation layer is lost. For example, if CSS classes will
                               not be the same, templates, types etc... This is because when the grid renders a cell that cell has a single template across
                               all rows but now we need a different template for every row.
                    
                               We can proxy a (VERY) limited set of metadata properties related to the presentation layer, valid only on render time.
                               This relays on the fact that each row is rendered complete, starting from the first cell to the last so
                               with that we can get a reference to the original column tha that now represents the whole row.
                             */
                    /** @type {?} */
                    var currentColumn_1;
                    try {
                        for (var _d = __values(_this.table.columnApi.visibleColumns), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var c = _e.value;
                            if (c.orgProp === prop) {
                                c.getValue = (/**
                                 * @param {?} row
                                 * @return {?}
                                 */
                                function (row) {
                                    currentColumn_1 = row;
                                    return (/** @type {?} */ (row.label));
                                });
                            }
                            else {
                                c.getValue = getCellValueTransformed;
                                var _loop_1 = function (key) {
                                    Object.defineProperty(c, key, { configurable: true, get: (/**
                                         * @return {?}
                                         */
                                        function () { return currentColumn_1 && currentColumn_1[key]; }), set: (/**
                                         * @param {?} value
                                         * @return {?}
                                         */
                                        function (value) { }) });
                                };
                                try {
                                    for (var columnKeysToProxy_1 = __values(columnKeysToProxy), columnKeysToProxy_1_1 = columnKeysToProxy_1.next(); !columnKeysToProxy_1_1.done; columnKeysToProxy_1_1 = columnKeysToProxy_1.next()) {
                                        var key = columnKeysToProxy_1_1.value;
                                        _loop_1(key);
                                    }
                                }
                                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                finally {
                                    try {
                                        if (columnKeysToProxy_1_1 && !columnKeysToProxy_1_1.done && (_c = columnKeysToProxy_1.return)) _c.call(columnKeysToProxy_1);
                                    }
                                    finally { if (e_2) throw e_2.error; }
                                }
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return _this.columns;
                }
                return results;
            });
            this.tableState = new TransposeTableSession(this.table, this.pluginCtrl, (/**
             * @return {?}
             */
            function () { return _this.updateColumns(_this.table.columnApi.visibleColumns); }), sourceFactoryWrapper);
            if (refreshDataSource) {
                this.pluginCtrl.extApi.contextApi.clear();
                this.table.ds.refresh();
            }
            else if (this.table.ds.length > 0) {
                this.table.ds.refresh(VIRTUAL_REFRESH);
            }
        };
        /**
         * @private
         * @param {?} columns
         * @return {?}
         */
        PblNgridTransposePluginDirective.prototype.updateColumns = /**
         * @private
         * @param {?} columns
         * @return {?}
         */
        function (columns) {
            var e_3, _a;
            var prop = this._header.prop;
            this.columns = [];
            try {
                for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var c = columns_1_1.value;
                    if (c.orgProp === prop) {
                        this.selfColumn = c;
                    }
                    else {
                        this.columns.push(c);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (!this.selfColumn) {
                // TODO: don't assume columns[0]
                this.selfColumn = new ngrid.PblColumn(this._header, this.pluginCtrl.extApi.columnStore.groupStore);
            }
        };
        PblNgridTransposePluginDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid[transpose]' },] }
        ];
        /** @nocollapse */
        PblNgridTransposePluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController },
            { type: ngrid.PblNgridConfigService }
        ]; };
        PblNgridTransposePluginDirective.propDecorators = {
            transpose: [{ type: core.Input }],
            header: [{ type: core.Input, args: ['transposeHeaderCol',] }],
            defaultCol: [{ type: core.Input, args: ['transposeDefaultCol',] }],
            matchTemplates: [{ type: core.Input }]
        };
        /**
         * Transpose plugin.
         *
         * This plugin will swaps around the rows and columns of the table.
         *
         * A **regular table** (not transposed) represents rows horizontally:
         *
         * - Each horizontal row represents an item in the collection.
         * - Each vertical column represents the same property of all rows in the collection.
         *
         * A **transposed** table represents row vertically:
         *
         * - Each horizontal row represents the same property of all rows in the collection.
         * - Each vertical row represents an item in the collection.
         *
         * > Note that transposing a table might not play nice with other plugins and/or features.
         * For example, using pagination with transpose make no sense.
         */
        PblNgridTransposePluginDirective = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY }),
            utils.UnRx(),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent, ngrid.PblNgridPluginController, ngrid.PblNgridConfigService])
        ], PblNgridTransposePluginDirective);
        return PblNgridTransposePluginDirective;
    }());
    if (false) {
        /**
         * Column definitions to be used as the base default definitions for the new transposed columns.
         * This is an optional value, when not set no default's are applied.
         * @type {?}
         */
        PblNgridTransposePluginDirective.prototype.defaultCol;
        /**
         * When true, will try to use the original template of the cell, i.e. the template that would have been used
         * if we did not transpose at all.
         *
         * Defaults to false.
         * @type {?}
         */
        PblNgridTransposePluginDirective.prototype.matchTemplates;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype.enabled;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype._header;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype.tableState;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype.columns;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype.selfColumn;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype._removePlugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblNgridTransposePluginDirective.prototype.pluginCtrl;
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridTransposeModule = /** @class */ (function () {
        function PblNgridTransposeModule() {
        }
        PblNgridTransposeModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, checkbox.MatCheckboxModule, ngrid.PblNgridModule],
                        declarations: [PblNgridTransposePluginDirective],
                        exports: [PblNgridTransposePluginDirective],
                    },] }
        ];
        return PblNgridTransposeModule;
    }());

    exports.PblNgridTransposeModule = PblNgridTransposeModule;
    exports.ɵa = PblNgridTransposePluginDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pebula-ngrid-transpose.umd.js.map
