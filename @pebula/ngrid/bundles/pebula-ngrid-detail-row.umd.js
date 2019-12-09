(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/coercion'), require('@pebula/utils'), require('@pebula/ngrid'), require('@angular/cdk/table'), require('@angular/common'), require('@pebula/ngrid/target-events'), require('@angular/cdk/keycodes')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/detail-row', ['exports', '@angular/core', '@angular/cdk/coercion', '@pebula/utils', '@pebula/ngrid', '@angular/cdk/table', '@angular/common', '@pebula/ngrid/target-events', '@angular/cdk/keycodes'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['detail-row'] = {}), global.ng.core, global.ng.cdk.coercion, global.pebula.utils, global.pebula.ngrid, global.ng.cdk.table, global.ng.common, global.pebula.ngrid['target-events'], global.ng.cdk.keycodes));
}(this, (function (exports, core, coercion, utils, ngrid, table, common, targetEvents, keycodes) { 'use strict';

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
    /**
     * Marks the element as the display element for the detail row itself.
     */
    var PblNgridDetailRowDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridDetailRowDefDirective, _super);
        function PblNgridDetailRowDefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'detailRow';
            return _this;
        }
        PblNgridDetailRowDefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridDetailRowDef]' },] }
        ];
        /** @nocollapse */
        PblNgridDetailRowDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: ngrid.PblNgridRegistryService }
        ]; };
        return PblNgridDetailRowDefDirective;
    }(ngrid.PblNgridSingleTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridDetailRowDefDirective.prototype.kind;
    }
    /**
     * @template T
     */
    var PblNgridDetailRowParentRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridDetailRowParentRefDirective, _super);
        function PblNgridDetailRowParentRefDirective(template, _differs, registry) {
            var _this = _super.call(this, template, _differs) || this;
            _this.registry = registry;
            return _this;
        }
        /**
         * @return {?}
         */
        PblNgridDetailRowParentRefDirective.prototype.clone = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var clone = Object.create(this);
            this._columnsDiffer = this.columns = undefined;
            return clone;
        };
        /**
         * @return {?}
         */
        PblNgridDetailRowParentRefDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.registry.setSingle('detailRowParent', (/** @type {?} */ (this)));
        };
        /**
         * @return {?}
         */
        PblNgridDetailRowParentRefDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.registry.setSingle('detailRowParent', undefined);
        };
        PblNgridDetailRowParentRefDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridDetailRowParentRef]',
                        inputs: ['columns: pblNgridDetailRowParentRef', 'when: pblNgridDetailRowParentRefWhen'],
                    },] }
        ];
        /** @nocollapse */
        PblNgridDetailRowParentRefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: core.IterableDiffers },
            { type: ngrid.PblNgridRegistryService }
        ]; };
        return PblNgridDetailRowParentRefDirective;
    }(table.CdkRowDef));
    if (false) {
        /**
         * @type {?}
         * @protected
         */
        PblNgridDetailRowParentRefDirective.prototype.registry;
    }
    /**
     * Use to set the a default `pblNgridDetailRowParentRef` if the user did not set one.
     * \@internal
     */
    var PblNgridDefaultDetailRowParentComponent = /** @class */ (function () {
        function PblNgridDefaultDetailRowParentComponent() {
        }
        PblNgridDefaultDetailRowParentComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-default-detail-row-parent',
                        template: "<pbl-ngrid-row *pblNgridDetailRowParentRef=\"let row; gridInstance as gridInstance\" [grid]=\"gridInstance\" [detailRow]=\"row\"></pbl-ngrid-row>"
                    }] }
        ];
        return PblNgridDefaultDetailRowParentComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY = 'detailRow';
    /** @type {?} */
    var ROW_WHEN_TRUE = (/**
     * @return {?}
     */
    function () { return true; });
    /** @type {?} */
    var ROW_WHEN_FALSE = (/**
     * @return {?}
     */
    function () { return false; });
    /**
     * @template T
     * @param {?} table
     * @param {?} row
     * @param {?=} forceState
     * @return {?}
     */
    function toggleDetailRow(table, row, forceState) {
        /** @type {?} */
        var controller = ngrid.PblNgridPluginController.find(table);
        if (controller) {
            /** @type {?} */
            var plugin = controller.getPlugin(PLUGIN_KEY);
            if (plugin) {
                return plugin.toggleDetailRow(row, forceState);
            }
        }
    }
    /**
     * @record
     * @template T
     */
    function PblDetailsRowToggleEvent() { }
    if (false) {
        /** @type {?} */
        PblDetailsRowToggleEvent.prototype.row;
        /** @type {?} */
        PblDetailsRowToggleEvent.prototype.expended;
        /**
         * @return {?}
         */
        PblDetailsRowToggleEvent.prototype.toggle = function () { };
    }
    /**
     * @template T
     */
    var PblNgridDetailRowPluginDirective = /** @class */ (function () {
        function PblNgridDetailRowPluginDirective(table, pluginCtrl, injector) {
            var _this = this;
            this.table = table;
            this.injector = injector;
            /**
             * Set the behavior when the row's context is changed while the detail row is opened (another row is displayed in place of the current row).
             *
             * - ignore: don't do anything, leave as is (for manual intervention)
             * - close: close the detail row
             * - render: re-render the row with the new context
             *
             * The default behavior is `render`
             *
             * This scenario will pop-up when using pagination and the user move between pages or change the page size.
             * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
             *
             * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
             * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
             * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
             * this will allow updates on context change.
             *
             * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
             */
            this.whenContextChange = 'render';
            /**
             * Emits whenever a detail row instance is toggled on/off
             * Emits an event handler with the row, the toggle state and a toggle operation method.
             */
            this.toggleChange = new core.EventEmitter();
            /**
             * Emits whenever the row context has changed while the row is toggled open.
             * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
             *
             * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
             * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
             *
             * Emits an event handler with the row, the toggle state and a toggle operation method.
             */
            this.toggledRowContextChange = new core.EventEmitter();
            this._isSimpleRow = ROW_WHEN_TRUE;
            this._isDetailRow = ROW_WHEN_FALSE;
            this._detailRowRows = new Map();
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            /** @type {?} */
            var subscription = pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    subscription.unsubscribe();
                    subscription = undefined;
                    // Depends on target-events plugin
                    // if it's not set, create it.
                    if (!pluginCtrl.hasPlugin('targetEvents')) {
                        pluginCtrl.createPlugin('targetEvents');
                    }
                    table.registry.changes
                        .subscribe((/**
                     * @param {?} changes
                     * @return {?}
                     */
                    function (changes) {
                        var e_1, _a;
                        try {
                            for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                                var c = changes_1_1.value;
                                switch (c.type) {
                                    case 'detailRowParent':
                                        if (c.op === 'remove') {
                                            table._cdkTable.removeRowDef(c.value);
                                            _this._detailRowDef = undefined;
                                        }
                                        _this.setupDetailRowParent();
                                        // table._cdkTable.syncRows('data');
                                        break;
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }));
                    // if we start with an initial value, then update the table cause we didn't do that
                    // when it was set (we cant cause we're not init)
                    // otherwise just setup the parent.
                    if (_this._detailRow) {
                        _this.updateTable();
                    }
                    else {
                        _this.setupDetailRowParent();
                    }
                }
            }));
        }
        Object.defineProperty(PblNgridDetailRowPluginDirective.prototype, "detailRow", {
            /**
             * Detail row control (none / all rows / selective rows)
             *
             * A detail row is an additional row added below a row rendered with the context of the row above it.
             *
             * You can enable/disable detail row for the entire table by setting `detailRow` to true/false respectively.
             * To control detail row per row, provide a predicate.
             */
            get: /**
             * Detail row control (none / all rows / selective rows)
             *
             * A detail row is an additional row added below a row rendered with the context of the row above it.
             *
             * You can enable/disable detail row for the entire table by setting `detailRow` to true/false respectively.
             * To control detail row per row, provide a predicate.
             * @return {?}
             */
            function () { return this._detailRow; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._detailRow !== value) {
                    /** @type {?} */
                    var table = this.table;
                    if (typeof value === 'function') {
                        this._isSimpleRow = (/**
                         * @param {?} index
                         * @param {?} rowData
                         * @return {?}
                         */
                        function (index, rowData) { return !((/** @type {?} */ (value)))(index, rowData); });
                        this._isDetailRow = value;
                    }
                    else {
                        value = coercion.coerceBooleanProperty(value);
                        this._isDetailRow = value ? ROW_WHEN_TRUE : ROW_WHEN_FALSE;
                        this._isSimpleRow = value ? ROW_WHEN_FALSE : ROW_WHEN_TRUE;
                    }
                    this._detailRow = value;
                    if (table.isInit) {
                        this.updateTable();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridDetailRowPluginDirective.prototype, "singleDetailRow", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                value = coercion.coerceBooleanProperty(value);
                if (this._forceSingle !== value) {
                    this._forceSingle = value;
                    if (value && this._openedRow && this._openedRow.expended) {
                        this._detailRowRows.forEach((/**
                         * @param {?} r
                         * @return {?}
                         */
                        function (r) {
                            if (r.row !== _this._openedRow.row) {
                                r.toggle(false);
                            }
                        }));
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} detailRow
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.addDetailRow = /**
         * @param {?} detailRow
         * @return {?}
         */
        function (detailRow) {
            this._detailRowRows.set(detailRow.row, detailRow);
        };
        /**
         * @param {?} detailRow
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.removeDetailRow = /**
         * @param {?} detailRow
         * @return {?}
         */
        function (detailRow) {
            this._detailRowRows.delete(detailRow.row);
        };
        /**
         * @param {?} row
         * @param {?=} forceState
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.toggleDetailRow = /**
         * @param {?} row
         * @param {?=} forceState
         * @return {?}
         */
        function (row, forceState) {
            /** @type {?} */
            var detailRow = this._detailRowRows.get(row);
            if (detailRow) {
                detailRow.toggle(forceState);
                return detailRow.expended;
            }
        };
        /**
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this._defaultParentRef) {
                this._defaultParentRef.destroy();
            }
            this._removePlugin(this.table);
        };
        /** @internal */
        /**
         * \@internal
         * @param {?} event
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.detailRowToggled = /**
         * \@internal
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // logic for closing previous row
            /** @type {?} */
            var isSelf = this._openedRow && this._openedRow.row === event.row;
            if (event.expended) {
                if (this._forceSingle && this._openedRow && this._openedRow.expended && !isSelf) {
                    this._openedRow.toggle();
                }
                this._openedRow = event;
            }
            else if (isSelf) {
                this._openedRow = undefined;
            }
            this.toggleChange.emit(event);
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.setupDetailRowParent = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var table = this.table;
            /** @type {?} */
            var cdkTable = table._cdkTable;
            if (this._detailRowDef) {
                cdkTable.removeRowDef(this._detailRowDef);
                this._detailRowDef = undefined;
            }
            if (this.detailRow) {
                /** @type {?} */
                var detailRow = table.registry.getSingle('detailRowParent');
                if (detailRow) {
                    this._detailRowDef = detailRow = detailRow.clone();
                    Object.defineProperty(detailRow, 'columns', { enumerable: true, get: (/**
                         * @return {?}
                         */
                        function () { return table.columnApi.visibleColumnIds; }) });
                    Object.defineProperty(detailRow, 'when', { enumerable: true, get: (/**
                         * @return {?}
                         */
                        function () { return _this._isDetailRow; }) });
                    detailRow.ngOnChanges({ columns: { isFirstChange: (/**
                             * @return {?}
                             */
                            function () { return true; }), firstChange: true, currentValue: detailRow.columns, previousValue: null } });
                }
                else if (!this._defaultParentRef) {
                    // TODO: move to module? set in root registry? put elsewhere to avoid table sync (see event of registry change)...
                    this._defaultParentRef = this.injector.get(core.ComponentFactoryResolver)
                        .resolveComponentFactory(PblNgridDefaultDetailRowParentComponent)
                        .create(this.injector);
                    this._defaultParentRef.changeDetectorRef.detectChanges();
                    return;
                }
            }
            this.resetTableRowDefs();
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.resetTableRowDefs = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var table = this.table;
            if (this._detailRowDef) {
                this._detailRow === false
                    ? table._cdkTable.removeRowDef(this._detailRowDef)
                    : table._cdkTable.addRowDef(this._detailRowDef);
            }
        };
        /**
         * Update the table with detail row infor.
         * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
         */
        /**
         * Update the table with detail row infor.
         * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
         * @private
         * @return {?}
         */
        PblNgridDetailRowPluginDirective.prototype.updateTable = /**
         * Update the table with detail row infor.
         * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
         * @private
         * @return {?}
         */
        function () {
            this.table._tableRowDef.when = this._isSimpleRow;
            this.setupDetailRowParent();
            // Once we changed the `when` predicate on the `CdkRowDef` we must:
            //   1. Update the row cache (property `rowDefs`) to reflect the new change
            this.table._cdkTable.updateRowDefCache();
            //   2. re-render all rows.
            // The logic for re-rendering all rows is handled in `CdkTable._forceRenderDataRows()` which is a private method.
            // This is a workaround, assigning to `multiTemplateDataRows` will invoke the setter which
            // also calls `CdkTable._forceRenderDataRows()`
            // TODO: This is risky, the setter logic might change.
            // for example, if material will chack for change in `multiTemplateDataRows` setter from previous value...
            this.table._cdkTable.multiTemplateDataRows = !!this._detailRow;
        };
        PblNgridDetailRowPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController },
            { type: core.Injector }
        ]; };
        PblNgridDetailRowPluginDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid[detailRow]', exportAs: 'pblNgridDetailRow' },] }
        ];
        /** @nocollapse */
        PblNgridDetailRowPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController },
            { type: core.Injector }
        ]; };
        PblNgridDetailRowPluginDirective.propDecorators = {
            detailRow: [{ type: core.Input }],
            singleDetailRow: [{ type: core.Input }],
            excludeToggleFrom: [{ type: core.Input }],
            whenContextChange: [{ type: core.Input }],
            toggleChange: [{ type: core.Output }],
            toggledRowContextChange: [{ type: core.Output }]
        };
        /**
         * @template T
         */
        PblNgridDetailRowPluginDirective = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY }),
            utils.UnRx(),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent, ngrid.PblNgridPluginController, core.Injector])
        ], PblNgridDetailRowPluginDirective);
        return PblNgridDetailRowPluginDirective;
    }());
    if (false) {
        /**
         * A list of columns that will not trigger a detail row toggle when clicked.
         * @type {?}
         */
        PblNgridDetailRowPluginDirective.prototype.excludeToggleFrom;
        /**
         * Set the behavior when the row's context is changed while the detail row is opened (another row is displayed in place of the current row).
         *
         * - ignore: don't do anything, leave as is (for manual intervention)
         * - close: close the detail row
         * - render: re-render the row with the new context
         *
         * The default behavior is `render`
         *
         * This scenario will pop-up when using pagination and the user move between pages or change the page size.
         * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
         *
         * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
         * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
         * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
         * this will allow updates on context change.
         *
         * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
         * @type {?}
         */
        PblNgridDetailRowPluginDirective.prototype.whenContextChange;
        /**
         * Emits whenever a detail row instance is toggled on/off
         * Emits an event handler with the row, the toggle state and a toggle operation method.
         * @type {?}
         */
        PblNgridDetailRowPluginDirective.prototype.toggleChange;
        /**
         * Emits whenever the row context has changed while the row is toggled open.
         * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
         *
         * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
         * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
         *
         * Emits an event handler with the row, the toggle state and a toggle operation method.
         * @type {?}
         */
        PblNgridDetailRowPluginDirective.prototype.toggledRowContextChange;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._openedRow;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._forceSingle;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._isSimpleRow;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._isDetailRow;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._detailRowRows;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._detailRow;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._detailRowDef;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._defaultParentRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype._removePlugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowPluginDirective.prototype.injector;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridDetailRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridDetailRowComponent, _super);
        function PblNgridDetailRowComponent(extApi, el, vcRef) {
            var _this = _super.call(this, extApi, el) || this;
            _this.vcRef = vcRef;
            _this.opened = false;
            return _this;
        }
        PblNgridDetailRowComponent_1 = PblNgridDetailRowComponent;
        Object.defineProperty(PblNgridDetailRowComponent.prototype, "expended", {
            get: /**
             * @return {?}
             */
            function () {
                return this.opened;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridDetailRowComponent.prototype, "row", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.updateRow(); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridDetailRowComponent.prototype, "_element", {
            get: /**
             * @private
             * @return {?}
             */
            function () { return this.el.nativeElement; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var controller = ngrid.PblNgridPluginController.find(this.extApi.table);
            this.plugin = controller.getPlugin(PLUGIN_KEY); // TODO: THROW IF NO PLUGIN...
            this.plugin.addDetailRow(this);
            /** @type {?} */
            var tradeEvents = controller.getPlugin('targetEvents');
            tradeEvents.cellClick
                .pipe(utils.UnRx(this))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.type === 'data' && event.row === _this.context.$implicit) {
                    var excludeToggleFrom = _this.plugin.excludeToggleFrom;
                    if (!excludeToggleFrom || !excludeToggleFrom.some((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return event.column.id === c; }))) {
                        _this.toggle();
                    }
                }
            }));
            tradeEvents.rowClick
                .pipe(utils.UnRx(this))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (!event.root && event.type === 'data' && event.row === _this.context.$implicit) {
                    _this.toggle();
                }
            }));
        };
        /**
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.plugin.removeDetailRow(this);
        };
        /**
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.updateRow = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var prevIdentity = this.context && this.context.$implicit;
            _super.prototype.updateRow.call(this);
            if (this.opened) {
                /** @type {?} */
                var currIdentity = this.context && this.context.$implicit;
                if (currIdentity !== prevIdentity && currIdentity) {
                    switch (this.plugin.whenContextChange) {
                        case 'render':
                            this.render();
                            break;
                        case 'close':
                            this.toggle(false);
                            break;
                    }
                    this.plugin.toggledRowContextChange.next(this.createEvent());
                }
            }
        };
        /**
         * @param {?=} forceState
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.toggle = /**
         * @param {?=} forceState
         * @return {?}
         */
        function (forceState) {
            if (this.opened !== forceState) {
                if (this.opened) {
                    this.vcRef.clear();
                    this._element.classList.remove('pbl-row-detail-opened');
                }
                else {
                    this.render();
                }
                this.opened = this.vcRef.length > 0;
                if (this.opened) {
                    this._element.classList.add('pbl-row-detail-opened');
                }
                this.plugin.detailRowToggled(this.createEvent());
            }
        };
        /**
         * @internal
         */
        /**
         * \@internal
         * @param {?} event
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.handleKeydown = /**
         * \@internal
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.target === this._element) {
                /** @type {?} */
                var keyCode = event.keyCode;
                /** @type {?} */
                var isToggleKey = keyCode === keycodes.ENTER || keyCode === keycodes.SPACE;
                if (isToggleKey) {
                    event.preventDefault(); // prevents the page from scrolling down when pressing space
                    this.toggle();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.createEvent = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var event = Object.create(this);
            Object.defineProperty(event, 'row', { value: this.context.$implicit });
            return event;
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridDetailRowComponent.prototype.render = /**
         * @private
         * @return {?}
         */
        function () {
            this.vcRef.clear();
            if (this.context.$implicit) {
                /** @type {?} */
                var detailRowDef = this.context.table.registry.getSingle('detailRow');
                if (detailRowDef) {
                    this.vcRef.createEmbeddedView(detailRowDef.tRef, this.context);
                }
            }
        };
        var PblNgridDetailRowComponent_1;
        PblNgridDetailRowComponent.ctorParameters = function () { return [
            { type: undefined },
            { type: core.ElementRef },
            { type: core.ViewContainerRef }
        ]; };
        PblNgridDetailRowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-row[detailRow]',
                        exportAs: 'pblNgridDetailRow',
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            class: 'pbl-ngrid-row pbl-row-detail-parent',
                            role: 'row',
                            '[attr.tabindex]': 'grid?.rowFocus',
                            '(keydown)': 'handleKeydown($event)'
                        },
                        template: table.CDK_ROW_TEMPLATE,
                        providers: [
                            { provide: table.CdkRow, useExisting: PblNgridDetailRowComponent_1 }
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".pbl-row-detail-parent { position: relative; cursor: pointer; }"]
                    }] }
        ];
        /** @nocollapse */
        PblNgridDetailRowComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [ngrid.EXT_API_TOKEN,] }] },
            { type: core.ElementRef },
            { type: core.ViewContainerRef }
        ]; };
        PblNgridDetailRowComponent.propDecorators = {
            row: [{ type: core.Input, args: ['detailRow',] }]
        };
        PblNgridDetailRowComponent = PblNgridDetailRowComponent_1 = __decorate([
            utils.UnRx(),
            __metadata("design:paramtypes", [Object, core.ElementRef,
                core.ViewContainerRef])
        ], PblNgridDetailRowComponent);
        return PblNgridDetailRowComponent;
    }(ngrid.PblNgridRowComponent));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowComponent.prototype.opened;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowComponent.prototype.plugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridDetailRowComponent.prototype.vcRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DETAIL_ROW = [
        PblNgridDetailRowPluginDirective,
        PblNgridDetailRowComponent,
        PblNgridDetailRowParentRefDirective,
        PblNgridDetailRowDefDirective,
    ];
    var PblNgridDetailRowModule = /** @class */ (function () {
        function PblNgridDetailRowModule() {
        }
        PblNgridDetailRowModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, table.CdkTableModule, ngrid.PblNgridModule, targetEvents.PblNgridTargetEventsModule],
                        declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                        exports: [DETAIL_ROW],
                        entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent]
                    },] }
        ];
        return PblNgridDetailRowModule;
    }());

    exports.PblNgridDetailRowModule = PblNgridDetailRowModule;
    exports.toggleDetailRow = toggleDetailRow;
    exports.ɵa = PLUGIN_KEY;
    exports.ɵb = PblNgridDetailRowPluginDirective;
    exports.ɵc = PblNgridDetailRowComponent;
    exports.ɵd = PblNgridDetailRowDefDirective;
    exports.ɵe = PblNgridDetailRowParentRefDirective;
    exports.ɵf = PblNgridDefaultDetailRowParentComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-detail-row.umd.js.map
