(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('@angular/core'), require('@pebula/ngrid'), require('@angular/common'), require('@angular/cdk/table')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/sticky', ['exports', 'rxjs/operators', '@angular/core', '@pebula/ngrid', '@angular/common', '@angular/cdk/table'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.sticky = {}), global.rxjs.operators, global.ng.core, global.pebula.ngrid, global.ng.common, global.ng.cdk.table));
}(this, (function (exports, operators, core, ngrid, common, table) { 'use strict';

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
    var PLUGIN_KEY = 'sticky';
    /**
     * @param {?} table
     * @param {?} type
     * @param {?} valueOrBulk
     * @param {?=} state
     * @return {?}
     */
    function setStickyRow(table, type, valueOrBulk, state) {
        var e_1, _a;
        /** @type {?} */
        var isHeader = type === 'header';
        /** @type {?} */
        var queryList = isHeader ? table._headerRowDefs : table._footerRowDefs;
        /** @type {?} */
        var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
        /** @type {?} */
        var addOneIfMainExists = (isHeader && table.showHeader) || (!isHeader && table.showFooter) ? 1 : 0;
        /** @type {?} */
        var changed;
        try {
            for (var bulk_1 = __values(bulk), bulk_1_1 = bulk_1.next(); !bulk_1_1.done; bulk_1_1 = bulk_1.next()) {
                var _b = __read(bulk_1_1.value, 2), value = _b[0], state_1 = _b[1];
                // the index from the user is 0 based or the table header/footer row.
                // we store them both, so we need to convert... our first is always the table header/footer and then we have the same order as the user's.
                /** @type {?} */
                var idx = value === 'table' ? 0 : value + addOneIfMainExists;
                if (!isHeader) {
                    // sticky-styler stickRows() methods will reverse the order of footer columns
                    // so we actually need to set another row to make the row we want sticky.
                    // we could reverse the collection, but choosing the opposite side is better.
                    // think [0, 1, 2, 3, 4] and we want 1. sticky-styler will reverse to [4, 3, 2, 1, 0] so doing nothing will stick 3.
                    // the opposite is length MINUS 1 MINUS index which is 5 - 1 - 1 which is 3, in the revered array its the row 1 which is what we wanted.
                    idx = (queryList.length - 1) - idx;
                }
                /** @type {?} */
                var rowDef = queryList.toArray()[idx];
                if (rowDef && rowDef.sticky !== state_1) {
                    rowDef.sticky = state_1;
                    changed = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bulk_1_1 && !bulk_1_1.done && (_a = bulk_1.return)) _a.call(bulk_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (changed) {
            if (isHeader) {
                table._cdkTable.updateStickyHeaderRowStyles();
            }
            else {
                table._cdkTable.updateStickyFooterRowStyles();
            }
        }
    }
    /**
     * @param {?} table
     * @param {?} type
     * @param {?} valueOrBulk
     * @param {?=} state
     * @return {?}
     */
    function setStickyColumns(table, type, valueOrBulk, state) {
        var e_2, _a;
        /** @type {?} */
        var bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
        /** @type {?} */
        var changed;
        var _loop_1 = function (columnId, state_2) {
            if (typeof columnId === 'string') {
                columnId = table.columnApi.visibleColumns.findIndex((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.orgProp === columnId; }));
            }
            /** @type {?} */
            var c = table.columnApi.visibleColumns[columnId];
            if (c) {
                changed = true;
                c.pin = state_2 ? type : undefined;
                if (type === 'end') {
                    c.columnDef.stickyEnd = state_2;
                    c.columnDef.sticky = false;
                }
                else {
                    c.columnDef.sticky = state_2;
                    c.columnDef.stickyEnd = false;
                }
            }
        };
        try {
            for (var bulk_2 = __values(bulk), bulk_2_1 = bulk_2.next(); !bulk_2_1.done; bulk_2_1 = bulk_2.next()) {
                var _b = __read(bulk_2_1.value, 2), columnId = _b[0], state_2 = _b[1];
                _loop_1(columnId, state_2);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (bulk_2_1 && !bulk_2_1.done && (_a = bulk_2.return)) _a.call(bulk_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (changed) {
            table._cdkTable.updateStickyColumnStyles();
        }
    }
    var PblNgridStickyPluginDirective = /** @class */ (function () {
        function PblNgridStickyPluginDirective(table, _differs, pluginCtrl) {
            var _this = this;
            this.table = table;
            this._differs = _differs;
            this.pluginCtrl = pluginCtrl;
            this._columnCache = { start: [], end: [] };
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            pluginCtrl.events
                .pipe(operators.filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.kind === 'onResizeRow'; })))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this.table._cdkTable.updateStickyHeaderRowStyles();
                _this.table._cdkTable.updateStickyColumnStyles();
                _this.table._cdkTable.updateStickyFooterRowStyles();
            }));
            pluginCtrl.events
                .pipe(operators.filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.kind === 'onInvalidateHeaders'; })))
                .subscribe((/**
             * @return {?}
             */
            function () {
                if (_this._startDiffer && _this.table.isInit) {
                    _this._startDiffer.diff([]);
                    _this.applyColumnDiff('start', _this._columnCache.start, _this._startDiffer);
                }
                if (_this._endDiffer && _this.table.isInit) {
                    _this._endDiffer.diff([]);
                    _this.applyColumnDiff('end', _this._columnCache.end, _this._endDiffer);
                }
            }));
        }
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnStart", {
            /**
             * Set the header rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main header row.
             *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             */
            set: /**
             * Set the header rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main header row.
             *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this._startDiffer) {
                    this._startDiffer = this._differs.find([]).create();
                }
                this.applyColumnDiff('start', value, this._startDiffer);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyColumnEnd", {
            /**
             * Set the footer rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main footer row.
             *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             */
            set: /**
             * Set the footer rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main footer row.
             *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this._endDiffer) {
                    this._endDiffer = this._differs.find([]).create();
                }
                this.applyColumnDiff('end', value, this._endDiffer);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyHeader", {
            /**
           * Set the header rows you want to apply sticky positioning to.
           * Valid values are:
           *   - `table` - Literal string `table` that will set the table's main header row.
           *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
           *
           * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
           * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
           */
            set: /**
             * Set the header rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main header row.
             *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this._headerDiffer) {
                    this._headerDiffer = this._differs.find([]).create();
                }
                this.applyRowDiff('header', value, this._headerDiffer);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridStickyPluginDirective.prototype, "stickyFooter", {
            /**
             * Set the footer rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main footer row.
             *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             */
            set: /**
             * Set the footer rows you want to apply sticky positioning to.
             * Valid values are:
             *   - `table` - Literal string `table` that will set the table's main footer row.
             *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
             *
             * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
             * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this._footerDiffer) {
                    this._footerDiffer = this._differs.find([]).create();
                }
                this.applyRowDiff('footer', value, this._footerDiffer);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridStickyPluginDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._removePlugin(this.table);
        };
        /**
         * @protected
         * @param {?} type
         * @param {?} value
         * @param {?} differ
         * @return {?}
         */
        PblNgridStickyPluginDirective.prototype.applyColumnDiff = /**
         * @protected
         * @param {?} type
         * @param {?} value
         * @param {?} differ
         * @return {?}
         */
        function (type, value, differ) {
            var _this = this;
            if (!this.table.isInit) {
                /** @type {?} */
                var unsub_1 = this.pluginCtrl.events.subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.kind === 'onInit') {
                        unsub_1.unsubscribe();
                        _this.applyColumnDiff(type, value, differ);
                    }
                }));
                return;
            }
            this._columnCache[type] = value || [];
            /** @type {?} */
            var changes = differ.diff(value || []);
            /** @type {?} */
            var bulk = [];
            changes.forEachOperation((/**
             * @param {?} record
             * @param {?} prevIndex
             * @param {?} currentIndex
             * @return {?}
             */
            function (record, prevIndex, currentIndex) {
                if (record.previousIndex == null) {
                    bulk.push([record.item, true]);
                }
                else if (currentIndex == null) {
                    bulk.push([record.item, false]);
                }
            }));
            if (bulk.length > 0) {
                setStickyColumns(this.table, type, bulk);
            }
        };
        /**
         * @protected
         * @param {?} type
         * @param {?} value
         * @param {?} differ
         * @return {?}
         */
        PblNgridStickyPluginDirective.prototype.applyRowDiff = /**
         * @protected
         * @param {?} type
         * @param {?} value
         * @param {?} differ
         * @return {?}
         */
        function (type, value, differ) {
            var _this = this;
            if (!this.table.isInit) {
                /** @type {?} */
                var unsub_2 = this.pluginCtrl.events.subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.kind === 'onInit') {
                        unsub_2.unsubscribe();
                        _this.applyRowDiff(type, value, differ);
                    }
                }));
                return;
            }
            /** @type {?} */
            var changes = differ.diff(value || []);
            /** @type {?} */
            var bulk = [];
            changes.forEachOperation((/**
             * @param {?} record
             * @param {?} prevIndex
             * @param {?} currentIndex
             * @return {?}
             */
            function (record, prevIndex, currentIndex) {
                if (record.previousIndex == null) {
                    bulk.push([record.item, true]);
                }
                else if (currentIndex == null) {
                    bulk.push([record.item, false]);
                }
            }));
            if (bulk.length > 0) {
                setStickyRow(this.table, type, bulk);
            }
        };
        PblNgridStickyPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: core.IterableDiffers },
            { type: ngrid.PblNgridPluginController }
        ]; };
        PblNgridStickyPluginDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]' },] }
        ];
        /** @nocollapse */
        PblNgridStickyPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: core.IterableDiffers },
            { type: ngrid.PblNgridPluginController }
        ]; };
        PblNgridStickyPluginDirective.propDecorators = {
            stickyColumnStart: [{ type: core.Input }],
            stickyColumnEnd: [{ type: core.Input }],
            stickyHeader: [{ type: core.Input }],
            stickyFooter: [{ type: core.Input }]
        };
        PblNgridStickyPluginDirective = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY }),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent,
                core.IterableDiffers,
                ngrid.PblNgridPluginController])
        ], PblNgridStickyPluginDirective);
        return PblNgridStickyPluginDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridStickyPluginDirective.prototype._startDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridStickyPluginDirective.prototype._endDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridStickyPluginDirective.prototype._headerDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridStickyPluginDirective.prototype._footerDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridStickyPluginDirective.prototype._columnCache;
        /**
         * @type {?}
         * @private
         */
        PblNgridStickyPluginDirective.prototype._removePlugin;
        /**
         * @type {?}
         * @protected
         */
        PblNgridStickyPluginDirective.prototype.table;
        /**
         * @type {?}
         * @protected
         */
        PblNgridStickyPluginDirective.prototype._differs;
        /**
         * @type {?}
         * @protected
         */
        PblNgridStickyPluginDirective.prototype.pluginCtrl;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var MAPPER = (/**
     * @template T
     * @param {?} v
     * @return {?}
     */
    function (v) { return [v, true]; });
    var ɵ0 = MAPPER;
    var PblNgridStickyModule = /** @class */ (function () {
        function PblNgridStickyModule(parentModule, configService) {
            if (parentModule) {
                return;
            }
            ngrid.PblNgridPluginController.created
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                var table = event.table, controller = event.controller;
                if (controller && !controller.hasPlugin('sticky')) {
                    controller.events
                        .pipe(operators.filter((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return e.kind === 'onInit'; })), operators.first())
                        .subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        /** @type {?} */
                        var stickyPluginConfig = configService.get('stickyPlugin');
                        if (stickyPluginConfig) {
                            if (stickyPluginConfig.headers) {
                                setStickyRow(table, 'header', stickyPluginConfig.headers.map(MAPPER));
                            }
                            if (stickyPluginConfig.footers) {
                                setStickyRow(table, 'footer', stickyPluginConfig.footers.map(MAPPER));
                            }
                            if (stickyPluginConfig.columnStart) {
                                setStickyColumns(table, 'start', stickyPluginConfig.columnStart.map(MAPPER));
                            }
                            if (stickyPluginConfig.columnEnd) {
                                setStickyColumns(table, 'end', stickyPluginConfig.columnEnd.map(MAPPER));
                            }
                        }
                    }));
                }
            }));
        }
        PblNgridStickyModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, table.CdkTableModule, ngrid.PblNgridModule],
                        declarations: [PblNgridStickyPluginDirective],
                        exports: [PblNgridStickyPluginDirective],
                    },] }
        ];
        /** @nocollapse */
        PblNgridStickyModule.ctorParameters = function () { return [
            { type: PblNgridStickyModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: ngrid.PblNgridConfigService }
        ]; };
        return PblNgridStickyModule;
    }());

    exports.PblNgridStickyModule = PblNgridStickyModule;
    exports.setStickyColumns = setStickyColumns;
    exports.setStickyRow = setStickyRow;
    exports.ɵa = PLUGIN_KEY;
    exports.ɵb = PblNgridStickyPluginDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-sticky.umd.js.map
