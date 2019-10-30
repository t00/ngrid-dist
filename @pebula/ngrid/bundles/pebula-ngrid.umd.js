(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('@angular/core'), require('@angular/cdk/table'), require('resize-observer-polyfill'), require('rxjs/operators'), require('@angular/cdk/coercion'), require('@pebula/utils'), require('@angular/cdk/collections'), require('@angular/cdk/drag-drop'), require('@angular/common'), require('@angular/cdk/platform'), require('@angular/cdk/bidi'), require('@angular/cdk/scrolling'), require('@angular/cdk-experimental/scrolling')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid', ['exports', 'rxjs', '@angular/core', '@angular/cdk/table', 'resize-observer-polyfill', 'rxjs/operators', '@angular/cdk/coercion', '@pebula/utils', '@angular/cdk/collections', '@angular/cdk/drag-drop', '@angular/common', '@angular/cdk/platform', '@angular/cdk/bidi', '@angular/cdk/scrolling', '@angular/cdk-experimental/scrolling'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = {}), global.rxjs, global.ng.core, global.ng.cdk.table, global.ResizeObserver, global.rxjs.operators, global.ng.cdk.coercion, global.pebula.utils, global.ng.cdk.collections, global.ng.cdk['drag-drop'], global.ng.common, global.ng.cdk.platform, global.ng.cdk.bidi, global.ng.cdk.scrolling, global.ng['cdk-experimental'].scrolling));
}(this, (function (exports, rxjs, core, table, ResizeObserver, operators, coercion, utils$1, collections, dragDrop, common, platform, bidi, scrolling, scrolling$1) { 'use strict';

    ResizeObserver = ResizeObserver && ResizeObserver.hasOwnProperty('default') ? ResizeObserver['default'] : ResizeObserver;

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
     * @record
     */
    function PblNgridConfig() { }
    if (false) {
        /** @type {?|undefined} */
        PblNgridConfig.prototype.table;
    }
    /** @type {?} */
    var DEFAULT_TABLE_CONFIG = {
        showHeader: true,
        showFooter: false,
        noFiller: false,
    };
    /** @type {?} */
    var PEB_NGRID_CONFIG = new core.InjectionToken('PEB_NGRID_CONFIG');
    var PblNgridConfigService = /** @class */ (function () {
        function PblNgridConfigService(_config) {
            var e_1, _a;
            this.config = new Map();
            this.configNotify = new Map();
            if (_config) {
                try {
                    for (var _b = __values(Object.keys(_config)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        ((/** @type {?} */ (this.config))).set(key, _config[key]);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            /** @type {?} */
            var tableConfig = this.config.get('table') || {};
            this.config.set('table', __assign({}, DEFAULT_TABLE_CONFIG, tableConfig));
        }
        /**
         * @param {?} section
         * @return {?}
         */
        PblNgridConfigService.prototype.has = /**
         * @param {?} section
         * @return {?}
         */
        function (section) {
            return this.config.has(section);
        };
        /**
         * @template T
         * @param {?} section
         * @param {?=} fallback
         * @return {?}
         */
        PblNgridConfigService.prototype.get = /**
         * @template T
         * @param {?} section
         * @param {?=} fallback
         * @return {?}
         */
        function (section, fallback) {
            return this.config.get(section) || fallback;
        };
        /**
         * @template T
         * @param {?} section
         * @param {?} value
         * @return {?}
         */
        PblNgridConfigService.prototype.set = /**
         * @template T
         * @param {?} section
         * @param {?} value
         * @return {?}
         */
        function (section, value) {
            /** @type {?} */
            var prev = this.get(section);
            value = Object.assign({}, value);
            Object.freeze(value);
            this.config.set(section, value);
            this.notify(section, value, prev);
        };
        /**
         * @template T
         * @param {?} section
         * @return {?}
         */
        PblNgridConfigService.prototype.onUpdate = /**
         * @template T
         * @param {?} section
         * @return {?}
         */
        function (section) {
            return this.getGetNotifier(section);
        };
        /**
         * @private
         * @template T
         * @param {?} section
         * @return {?}
         */
        PblNgridConfigService.prototype.getGetNotifier = /**
         * @private
         * @template T
         * @param {?} section
         * @return {?}
         */
        function (section) {
            /** @type {?} */
            var notifier = this.configNotify.get(section);
            if (!notifier) {
                this.configNotify.set(section, notifier = new rxjs.ReplaySubject(1));
            }
            return notifier;
        };
        /**
         * @private
         * @template T
         * @param {?} section
         * @param {?} curr
         * @param {?} prev
         * @return {?}
         */
        PblNgridConfigService.prototype.notify = /**
         * @private
         * @template T
         * @param {?} section
         * @param {?} curr
         * @param {?} prev
         * @return {?}
         */
        function (section, curr, prev) {
            this.getGetNotifier(section).next({ curr: curr, prev: prev });
        };
        PblNgridConfigService.decorators = [
            { type: core.Injectable, args: [{
                        providedIn: 'root',
                    },] }
        ];
        /** @nocollapse */
        PblNgridConfigService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [PEB_NGRID_CONFIG,] }] }
        ]; };
        /** @nocollapse */ PblNgridConfigService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PblNgridConfigService_Factory() { return new PblNgridConfigService(core.ɵɵinject(PEB_NGRID_CONFIG, 8)); }, token: PblNgridConfigService, providedIn: "root" });
        return PblNgridConfigService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridConfigService.prototype.config;
        /**
         * @type {?}
         * @private
         */
        PblNgridConfigService.prototype.configNotify;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * \@internal
     * @type {?}
     */
    var PLUGIN_STORE = new Map();
    /**
     * @record
     * @template P
     */
    function TablePluginMetadata() { }
    if (false) {
        /** @type {?} */
        TablePluginMetadata.prototype.id;
        /** @type {?|undefined} */
        TablePluginMetadata.prototype.factory;
        /** @type {?|undefined} */
        TablePluginMetadata.prototype.runOnce;
    }
    /**
     * @param {?} metadata
     * @return {?}
     */
    function TablePlugin(metadata) {
        if (metadata.runOnce) {
            metadata.runOnce();
        }
        return (/**
         * @param {?} target
         * @return {?}
         */
        function (target) {
            PLUGIN_STORE.set(metadata.id, __assign({}, metadata, { target: target }));
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var TABLE_PLUGIN_CONTEXT = new WeakMap();
    /**
     * \@internal
     * @template T
     */
    var   /**
     * \@internal
     * @template T
     */
    PblNgridPluginContext = /** @class */ (function () {
        function PblNgridPluginContext() {
            this._events = new rxjs.Subject();
            this.events = this._events.asObservable();
        }
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} table
         * @param {?} injector
         * @param {?} extApi
         * @return {?}
         */
        PblNgridPluginContext.create = 
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} table
         * @param {?} injector
         * @param {?} extApi
         * @return {?}
         */
        function (table, injector, extApi) {
            if (TABLE_PLUGIN_CONTEXT.has(table)) {
                throw new Error("Table is already registered for extensions.");
            }
            /** @type {?} */
            var instance = new PblNgridPluginContext();
            TABLE_PLUGIN_CONTEXT.set(table, instance);
            instance.table = table;
            instance.injector = injector;
            instance.extApi = extApi;
            instance.controller = new PblNgridPluginController(instance);
            return instance;
        };
        /**
         * @param {?} event
         * @return {?}
         */
        PblNgridPluginContext.prototype.emitEvent = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this._events.next(event);
        };
        /**
         * @return {?}
         */
        PblNgridPluginContext.prototype.destroy = /**
         * @return {?}
         */
        function () {
            if (!TABLE_PLUGIN_CONTEXT.has(this.table)) {
                throw new Error("Table is not registered.");
            }
            this._events.complete();
            TABLE_PLUGIN_CONTEXT.delete(this.table);
        };
        return PblNgridPluginContext;
    }());
    if (false) {
        /** @type {?} */
        PblNgridPluginContext.prototype.table;
        /** @type {?} */
        PblNgridPluginContext.prototype.injector;
        /** @type {?} */
        PblNgridPluginContext.prototype.extApi;
        /** @type {?} */
        PblNgridPluginContext.prototype.controller;
        /** @type {?} */
        PblNgridPluginContext.prototype.events;
        /**
         * @type {?}
         * @private
         */
        PblNgridPluginContext.prototype._events;
    }
    /**
     * @template T
     */
    var PblNgridPluginController = /** @class */ (function () {
        function PblNgridPluginController(context) {
            this.context = context;
            this.plugins = new Map();
            this.grid = context.table;
            this.extApi = context.extApi;
            this.events = context.events;
            PblNgridPluginController.created$.next({ table: this.grid, controller: this });
        }
        Object.defineProperty(PblNgridPluginController.prototype, "injector", {
            get: /**
             * @return {?}
             */
            function () { return this.context.injector; },
            enumerable: true,
            configurable: true
        });
        /**
         * @template T
         * @param {?} grid
         * @return {?}
         */
        PblNgridPluginController.find = /**
         * @template T
         * @param {?} grid
         * @return {?}
         */
        function (grid) {
            /** @type {?} */
            var context = TABLE_PLUGIN_CONTEXT.get(grid);
            if (context) {
                return context.controller;
            }
        };
        /**
         * @template P
         * @param {?} name
         * @return {?}
         */
        PblNgridPluginController.prototype.hasPlugin = /**
         * @template P
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return this.plugins.has(name);
        };
        /**
         * @template P
         * @param {?} name
         * @return {?}
         */
        PblNgridPluginController.prototype.getPlugin = /**
         * @template P
         * @param {?} name
         * @return {?}
         */
        function (name) {
            return (/** @type {?} */ (this.plugins.get(name)));
        };
        /**
         * Registers the `plugin` with the `name` with the `table`
         */
        /**
         * Registers the `plugin` with the `name` with the `table`
         * @template P
         * @param {?} name
         * @param {?} plugin
         * @return {?}
         */
        PblNgridPluginController.prototype.setPlugin = /**
         * Registers the `plugin` with the `name` with the `table`
         * @template P
         * @param {?} name
         * @param {?} plugin
         * @return {?}
         */
        function (name, plugin) {
            var _this = this;
            if (!PLUGIN_STORE.has(name)) {
                throw new Error("Unknown plugin " + name + ".");
            }
            if (this.plugins.has(name)) {
                throw new Error("Plugin " + name + " is not registered for this table.");
            }
            this.plugins.set(name, plugin);
            return (/**
             * @param {?} tbl
             * @return {?}
             */
            function (tbl) { return _this.grid === tbl && _this.plugins.delete(name); });
        };
        /**
         * @template P
         * @param {?} name
         * @return {?}
         */
        PblNgridPluginController.prototype.createPlugin = /**
         * @template P
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (!PLUGIN_STORE.has(name)) {
                throw new Error("Unknown plugin " + name + ".");
            }
            /** @type {?} */
            var metadata = PLUGIN_STORE.get(name);
            /** @type {?} */
            var methodName = metadata.factory;
            if (!methodName) {
                throw new Error("Invalid plugin configuration for " + name + ", no factory metadata.");
            }
            else if (typeof metadata.target[methodName] !== 'function') {
                throw new Error("Invalid plugin configuration for " + name + ", factory metadata does not point to a function.");
            }
            return metadata.target[methodName](this.grid, this.context.injector);
        };
        PblNgridPluginController.created$ = new rxjs.Subject();
        PblNgridPluginController.created = PblNgridPluginController.created$.asObservable();
        return PblNgridPluginController;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridPluginController.created$;
        /** @type {?} */
        PblNgridPluginController.created;
        /** @type {?} */
        PblNgridPluginController.prototype.extApi;
        /** @type {?} */
        PblNgridPluginController.prototype.events;
        /**
         * @type {?}
         * @private
         */
        PblNgridPluginController.prototype.grid;
        /**
         * @type {?}
         * @private
         */
        PblNgridPluginController.prototype.plugins;
        /**
         * @type {?}
         * @private
         */
        PblNgridPluginController.prototype.context;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var EXT_API_TOKEN = new core.InjectionToken('PBL_NGRID_EXTERNAL_API');
    /**
     * @record
     * @template T
     */
    function PblNgridExtensionApi() { }
    if (false) {
        /** @type {?} */
        PblNgridExtensionApi.prototype.table;
        /** @type {?} */
        PblNgridExtensionApi.prototype.element;
        /** @type {?} */
        PblNgridExtensionApi.prototype.cdkTable;
        /** @type {?} */
        PblNgridExtensionApi.prototype.columnStore;
        /** @type {?} */
        PblNgridExtensionApi.prototype.contextApi;
        /** @type {?} */
        PblNgridExtensionApi.prototype.events;
        /** @type {?} */
        PblNgridExtensionApi.prototype.metaRowService;
        /**
         * @param {?} fn
         * @return {?}
         */
        PblNgridExtensionApi.prototype.onInit = function (fn) { };
        /**
         * @param {?} viewport
         * @return {?}
         */
        PblNgridExtensionApi.prototype.setViewport = function (viewport) { };
        /**
         * @return {?}
         */
        PblNgridExtensionApi.prototype.dynamicColumnWidthFactory = function () { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} value
     * @param {?} columns
     * @return {?}
     */
    function createFilter(value, columns) {
        return value === undefined
            ? undefined
            : {
                columns: columns,
                type: typeof value === 'function' ? 'predicate' : 'value',
                filter: value
            };
    }
    /**
     * @template T
     * @param {?} rawData
     * @param {?} filter
     * @return {?}
     */
    function filter(rawData, filter) {
        if (!filter || !rawData || rawData.length === 0) {
            return rawData;
        }
        else {
            /** @type {?} */
            var cols_1 = filter.columns;
            if (filter.type === 'predicate') {
                /** @type {?} */
                var value_1 = (/** @type {?} */ (filter.filter));
                return rawData.filter((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return value_1(v, cols_1); }));
            }
            else if (filter.type === 'value') {
                /** @type {?} */
                var value_2 = typeof filter.filter.toLowerCase === 'function' ? filter.filter.toLowerCase() : filter.filter;
                return rawData.filter((/**
                 * @param {?} row
                 * @return {?}
                 */
                function (row) { return cols_1.some((/**
                 * @param {?} col
                 * @return {?}
                 */
                function (col) {
                    /** @type {?} */
                    var predicate = col.filter || genericColumnPredicate;
                    return predicate(col.filter ? filter.filter : value_2, col.getValue(row), row, col);
                })); }));
            }
        }
        return rawData;
    }
    /**
     * A generic column predicate that compares the inclusion (text) of the value in the column value.
     * @type {?}
     */
    var genericColumnPredicate = (/**
     * @param {?} filterValue
     * @param {?} colValue
     * @param {?=} row
     * @param {?=} col
     * @return {?}
     */
    function (filterValue, colValue, row, col) {
        return colValue && colValue.toString().toLowerCase().includes(filterValue);
    });

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Apply sorting on a collection, based on column and sort definitions.
     * If the sort definition doesn't have a sorting function the default sorter is used.
     * @template T
     * @param {?} column
     * @param {?} sort
     * @param {?} data
     * @return {?}
     */
    function applySort(column, sort, data) {
        if (!sort || !sort.order) {
            return data;
        }
        /** @type {?} */
        var sortFn = typeof sort.sortFn === 'function'
            ? sort.sortFn
            : typeof column.sort === 'function'
                ? column.sort
                : defaultSorter;
        return column && data
            ? sortFn(column, sort, data.slice())
            : data || [];
    }
    /**
     * @template T
     * @param {?} column
     * @param {?} sort
     * @param {?} data
     * @return {?}
     */
    function defaultSorter(column, sort, data) {
        return data.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) {
            /** @type {?} */
            var valueA = column.getValue(a);
            /** @type {?} */
            var valueB = column.getValue(b);
            valueA = isNaN(+valueA) ? valueA : +valueA;
            valueB = isNaN(+valueB) ? valueB : +valueB;
            return (valueA < valueB ? -1 : valueA === valueB ? 0 : 1) * (sort.order === 'asc' ? 1 : -1);
        }));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var EMPTY = Object.freeze({});
    /** @type {?} */
    var DEEP_COMPARATORS = {
        filter: /**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        function (prev, curr) {
            return prev.filter === curr.filter
                && prev.type == curr.type;
            // TODO: deep compare columns
            // && (prev.columns || []).join() === (curr.columns || []).join();
        },
        sort: /**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        function (prev, curr) {
            if (prev.column === curr.column) {
                /** @type {?} */
                var pSort = prev.sort || {};
                /** @type {?} */
                var cSort = curr.sort || {};
                return pSort.order === cSort.order && pSort.sortFn === cSort.sortFn;
            }
        },
        data: /**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        function (prev, curr) {
            return prev === curr;
        }
    };
    /**
     * @template T
     * @param {?} change
     * @return {?}
     */
    function fromRefreshDataWrapper(change) {
        return {
            changed: change.changed,
            prev: change.prev.data,
            curr: change.hasOwnProperty('curr') ? change.curr.data : change.prev.data,
        };
    }
    /**
     * @template P
     * @param {?} type
     * @param {?} value
     * @param {?} cache
     * @return {?}
     */
    function createChangeContainer(type, value, cache) {
        var e_1, _a;
        if (type === 'pagination') {
            /** @type {?} */
            var pagination_1 = (/** @type {?} */ ((value || {})));
            /** @type {?} */
            var cached_1 = cache['pagination'];
            // we compare weak because we dont want changes from undefined to null etc...
            /** @type {?} */
            var changedKeys = (/** @type {?} */ (Object.keys(pagination_1).filter((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return cached_1[k] != pagination_1[k][1] && k !== 'total'; }))));
            /** @type {?} */
            var event_1 = {
                changed: changedKeys.length > 0,
                page: createNotChangedEvent(cached_1.page),
                perPage: createNotChangedEvent(cached_1.perPage),
            };
            if (event_1.changed) {
                try {
                    for (var changedKeys_1 = __values(changedKeys), changedKeys_1_1 = changedKeys_1.next(); !changedKeys_1_1.done; changedKeys_1_1 = changedKeys_1.next()) {
                        var k = changedKeys_1_1.value;
                        event_1[k].changed = true;
                        event_1[k].prev = pagination_1[k][0];
                        event_1[k].curr = cached_1[k] = pagination_1[k][1];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (changedKeys_1_1 && !changedKeys_1_1.done && (_a = changedKeys_1.return)) _a.call(changedKeys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return (/** @type {?} */ (event_1));
        }
        else {
            value = value || EMPTY;
            /** @type {?} */
            var cachedValue = cache[type];
            if (value === cachedValue) {
                return (/** @type {?} */ (createNotChangedEvent(cachedValue)));
            }
            else if (value !== EMPTY && cachedValue !== EMPTY) {
                /** @type {?} */
                var fn = DEEP_COMPARATORS[(/** @type {?} */ (type))];
                if (fn(cachedValue, (/** @type {?} */ (value)))) {
                    return (/** @type {?} */ (createNotChangedEvent(cachedValue)));
                }
            }
            cache[type] = (/** @type {?} */ (value));
            return (/** @type {?} */ ({ changed: true, prev: cachedValue, curr: value }));
        }
    }
    /**
     * @template T
     * @param {?} value
     * @return {?}
     */
    function createNotChangedEvent(value) {
        return { changed: false, prev: value, curr: value };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var CUSTOM_BEHAVIOR_TRIGGER_KEYS = ['sort', 'filter', 'pagination'];
    /** @type {?} */
    var TRIGGER_KEYS = __spread(CUSTOM_BEHAVIOR_TRIGGER_KEYS, ['data']);
    /** @type {?} */
    var SOURCE_CHANGING_TOKEN = {};
    var ɵ0 = EMPTY;
    /** @type {?} */
    var DEFAULT_INITIAL_CACHE_STATE = { filter: EMPTY, sort: EMPTY, pagination: {}, data: ɵ0 };
    /**
     * An adapter that handles changes
     * @template T, TData
     */
    var   /**
     * An adapter that handles changes
     * @template T, TData
     */
    PblDataSourceAdapter = /** @class */ (function () {
        /**
         * A Data Source adapter contains flow logic for the datasource and subsequent emissions of datasource instances.
         * The logic is determined by the combination of the config object and the sourceFactory provided to this adapter, making this adapter actually a container.
         *
         * There are 4 triggers that are responsible for datasource emissions, when one of them is triggered it will invoke the `sourceFactory`
         * returning a new datasource, i.e. a new datasource emission.
         *
         * The triggers are: filter, sort, pagination and refresh.
         *
         * The refresh trigger does not effect the input sent to the `sourceFactory` function, it is just a mean to initiate a call to create a new
         * datasource without changing previous flow variables.
         * It's important to note that calling `sourceFactory` with the same input 2 or more times does not guarantee identical response. For example
         * calling a remote server that might change it's data between calls.
         *
         * All other triggers (3) will change the input sent to the `sourceFactory` function which will use them to return a datasource.
         *
         * The input sent to `sourceFactory` is the values that each of the 3 triggers yields, when one trigger changes a new value for it is sent
         * and the last values of the other 2 triggers is sent with it. i.e. the combination of the last known value for all 3 triggers is sent.
         *
         * To enable smart caching and data management `sourceFactory` does not get the raw values of each trigger. `sourceFactory` will get
         * an event object that contains metadata about each trigger, whether it triggered the change or not as well as old and new values.
         *
         * The returned value from `sourceFactory` is then used as the datasource, applying all triggers that are not overridden by the user.
         * The returned value of `sourceFactory` can be a `DataSourceOf` or `false`.
         *   - `DataSourceOf` means a valid datasource, either observable/promise of array or an array.
         *   - `false` means skip, returning false will instruct the adapter to skip execution for this trigger cycle.
         *
         * Using a trigger is a binary configuration option, when a trigger is turned on it means that changes to it will be passed to the `sourceFactory`.
         * When a trigger is turned off it is not listened to and `undefined` will be sent as a value for it to the `sourceFactory`.
         *
         * The adapter comes with built in flow logic for all 3 triggers, when a trigger is turned off the adapter will take the result of `sourceFactory` and
         * apply the default behavior to it.
         *
         * For all triggers, the default behavior means client implementation. For filtering, client side filtering. For sorting, client side sorting.
         * For Pagination, client side pagination.
         *
         * You can opt in to one or more triggers and implement your own behavior inside the `sourceFactory`
         * @param sourceFactory - A function that returns the datasource based on flow instructions.
         * The instructions are optional, they might or might not exist depending on the configuration of the adapter.
         * When `sourceFactory` returns false the entire trigger cycle is skipped.
         * @param config - A configuration object describing how this adapter should behave.
         */
        function PblDataSourceAdapter(sourceFactory, config) {
            this.sourceFactory = sourceFactory;
            this.config = Object.assign({}, config || {});
            this.initStreams();
        }
        /**
         * @return {?}
         */
        PblDataSourceAdapter.prototype.dispose = /**
         * @return {?}
         */
        function () {
            this._refresh$.complete();
            this._onSourceChange$.complete();
        };
        /**
         * @param {?=} data
         * @return {?}
         */
        PblDataSourceAdapter.prototype.refresh = /**
         * @param {?=} data
         * @return {?}
         */
        function (data) {
            this._refresh$.next({ data: data });
        };
        /**
         * Clears the cache from any existing datasource trigger such as filter, sort etc.
         * @returns The cached value or null if not there.
         */
        /**
         * Clears the cache from any existing datasource trigger such as filter, sort etc.
         * @template P
         * @param {?} cacheKey
         * @return {?} The cached value or null if not there.
         */
        PblDataSourceAdapter.prototype.clearCache = /**
         * Clears the cache from any existing datasource trigger such as filter, sort etc.
         * @template P
         * @param {?} cacheKey
         * @return {?} The cached value or null if not there.
         */
        function (cacheKey) {
            if (cacheKey in this.cache) {
                /** @type {?} */
                var prev = this.cache[cacheKey];
                this.cache[cacheKey] = DEFAULT_INITIAL_CACHE_STATE[cacheKey];
                return prev;
            }
            else {
                return null;
            }
        };
        /**
         * @param {?} paginator
         * @return {?}
         */
        PblDataSourceAdapter.prototype.setPaginator = /**
         * @param {?} paginator
         * @return {?}
         */
        function (paginator) {
            this.paginator = paginator;
        };
        /**
         * @param {?} filter$
         * @param {?} sort$
         * @param {?} pagination$
         * @param {?=} initialState
         * @return {?}
         */
        PblDataSourceAdapter.prototype.updateProcessingLogic = /**
         * @param {?} filter$
         * @param {?} sort$
         * @param {?} pagination$
         * @param {?=} initialState
         * @return {?}
         */
        function (filter$, sort$, pagination$, initialState) {
            var _this = this;
            if (initialState === void 0) { initialState = {}; }
            /** @type {?} */
            var updates = -1;
            /** @type {?} */
            var changedFilter = (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return updates === -1 || e.changed; });
            /** @type {?} */
            var skipUpdate = (/**
             * @param {?} o
             * @return {?}
             */
            function (o) { return o.skipUpdate !== true; });
            this._lastSource = undefined;
            this.cache = __assign({}, DEFAULT_INITIAL_CACHE_STATE, initialState);
            /** @type {?} */
            var combine = [
                filter$.pipe(operators.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return createChangeContainer('filter', value, _this.cache); })), operators.filter(changedFilter)),
                sort$.pipe(operators.filter(skipUpdate), operators.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return createChangeContainer('sort', value, _this.cache); })), operators.filter(changedFilter)),
                pagination$.pipe(operators.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return createChangeContainer('pagination', value, _this.cache); })), operators.filter(changedFilter)),
                this._refresh$.pipe(operators.map((/**
                 * @param {?} value
                 * @return {?}
                 */
                function (value) { return fromRefreshDataWrapper(createChangeContainer('data', value, _this.cache)); })), operators.filter(changedFilter)),
            ];
            /** @type {?} */
            var hasCustomBehavior = CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return !!_this.config[key]; }));
            return rxjs.combineLatest(combine[0], combine[1], combine[2], combine[3])
                .pipe(
            // Defer to next loop cycle, until no more incoming.
            // We use an async schedular here (instead of asapSchedular) because we want to have the largest debounce window without compromising integrity
            // With an async schedular we know we will run after all micro-tasks but before "real" async operations.
            operators.debounceTime(0), operators.switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = __read(_a, 4), filter = _b[0], sort = _b[1], pagination = _b[2], data = _b[3];
                updates++; // if first, will be 0 now (starts from -1).
                // if first, will be 0 now (starts from -1).
                /** @type {?} */
                var event = {
                    filter: filter,
                    sort: sort,
                    pagination: pagination,
                    data: data,
                    isInitial: updates === 0,
                    updateTotalLength: (/**
                     * @param {?} totalLength
                     * @return {?}
                     */
                    function (totalLength) {
                        if (_this.paginator) {
                            _this.paginator.total = totalLength;
                        }
                    })
                };
                /** @type {?} */
                var runHandle = data.changed
                    || (hasCustomBehavior && CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
                     * @param {?} k
                     * @return {?}
                     */
                    function (k) { return !!_this.config[k] && event[k].changed; })));
                if (runHandle) {
                    return _this.runHandle(event).pipe(operators.tap((/**
                     * @return {?}
                     */
                    function () { return event.data.changed = true; })), // if the user didn't return "false" from his handler, we infer data was changed!
                    operators.map((/**
                     * @param {?} data
                     * @return {?}
                     */
                    function (data) { return ({ event: event, data: data }); })));
                }
                else {
                    return rxjs.of({ event: event, data: _this._lastSource });
                }
            })), operators.map((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                var e_1, _a, e_2, _b;
                /** @type {?} */
                var config = _this.config;
                /** @type {?} */
                var event = response.event;
                // mark which of the triggers has changes
                // The logic is based on the user's configuration and the incoming event
                /** @type {?} */
                var withChanges = {};
                try {
                    for (var CUSTOM_BEHAVIOR_TRIGGER_KEYS_1 = __values(CUSTOM_BEHAVIOR_TRIGGER_KEYS), CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.next(); !CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.done; CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.next()) {
                        var key = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.value;
                        if (!config[key] && (event.isInitial || event[key].changed)) {
                            withChanges[key] = true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 && !CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.done && (_a = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.return)) _a.call(CUSTOM_BEHAVIOR_TRIGGER_KEYS_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // When data changed, apply some logic (caching, operational, etc...)
                if (event.data.changed) {
                    // cache the data when it has changed.
                    _this._lastSource = response.data;
                    if (config.sort) {
                        // When the user is sorting (i.e. server sorting), the last sort cached is always the last source we get from the user.
                        _this._lastSortedSource = _this._lastSource;
                    }
                    else {
                        // When user is NOT sorting (we sort locally) AND the data has changed we need to apply sorting on it
                        // this might already be true (if sorting was the trigger)...
                        withChanges.sort = true;
                        // because we sort and then filter, filtering updates are also triggered by sort updated
                        withChanges.filter = true;
                    }
                    if (config.filter) {
                        // When the user is filtering (i.e. server filtering), the last filter cached is always the last source we get from the user.
                        _this._lastFilteredSource = _this._lastSource;
                    }
                    else {
                        // When user is NOT filtering (we filter locally) AND the data has changed we need to apply filtering on it
                        // this might already be true (if filtering was the trigger)...
                        withChanges.filter = true;
                    }
                }
                // When user is NOT applying pagination (we paginate locally) AND if we (sort OR filter) locally we also need to paginate locally
                if (!config.pagination && (withChanges.sort || withChanges.filter)) {
                    withChanges.pagination = true;
                }
                // Now, apply: sort --> filter --> pagination     ( ORDER MATTERS!!! )
                if (withChanges.sort) {
                    _this._lastSortedSource = _this.applySort(_this._lastSource, event.sort.curr || event.sort.prev);
                }
                /** @type {?} */
                var data = _this._lastSortedSource;
                // we check if filter was asked, but also if we have a filter we re-run
                // Only sorting is cached at this point filtering is always calculated
                if (withChanges.filter || (event.filter.curr && event.filter.curr.filter)) {
                    data = _this._lastFilteredSource = _this.applyFilter(data, event.filter.curr || event.filter.prev);
                }
                if (withChanges.pagination) {
                    data = _this.applyPagination(data);
                }
                /** @type {?} */
                var clonedEvent = __assign({}, event);
                try {
                    // We use `combineLatest` which caches pervious events, only new events are replaced.
                    // We need to mark everything as NOT CHANGED, so subsequent calls will not have their changed flag set to true.
                    //
                    // We also clone the object so we can pass on the proper values.
                    // We create shallow clones so complex objects (column in sort, user data in data) will not throw on circular.
                    // For pagination we deep clone because it contains primitives and we need to also clone the internal change objects.
                    for (var TRIGGER_KEYS_1 = __values(TRIGGER_KEYS), TRIGGER_KEYS_1_1 = TRIGGER_KEYS_1.next(); !TRIGGER_KEYS_1_1.done; TRIGGER_KEYS_1_1 = TRIGGER_KEYS_1.next()) {
                        var k = TRIGGER_KEYS_1_1.value;
                        clonedEvent[k] = k === 'pagination'
                            ? JSON.parse(JSON.stringify(event[k]))
                            : __assign({}, event[k]);
                        event[k].changed = false;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (TRIGGER_KEYS_1_1 && !TRIGGER_KEYS_1_1.done && (_b = TRIGGER_KEYS_1.return)) _b.call(TRIGGER_KEYS_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                event.pagination.page.changed = event.pagination.perPage.changed = false;
                return {
                    event: clonedEvent,
                    data: data,
                    sorted: _this._lastSortedSource,
                    filtered: _this._lastFilteredSource,
                };
            })));
        };
        /**
         * @protected
         * @param {?} data
         * @param {?} dataSourceFilter
         * @return {?}
         */
        PblDataSourceAdapter.prototype.applyFilter = /**
         * @protected
         * @param {?} data
         * @param {?} dataSourceFilter
         * @return {?}
         */
        function (data, dataSourceFilter) {
            data = filter(data, dataSourceFilter);
            if (!this.config.pagination) {
                this.resetPagination(data.length);
            }
            return data;
        };
        /**
         * @protected
         * @param {?} data
         * @param {?} event
         * @return {?}
         */
        PblDataSourceAdapter.prototype.applySort = /**
         * @protected
         * @param {?} data
         * @param {?} event
         * @return {?}
         */
        function (data, event) {
            return applySort(event.column, event.sort, data);
        };
        /**
         * @protected
         * @param {?} data
         * @return {?}
         */
        PblDataSourceAdapter.prototype.applyPagination = /**
         * @protected
         * @param {?} data
         * @return {?}
         */
        function (data) {
            if (this.paginator) {
                // Set the rendered rows length to the virtual page size. Fill in the data provided
                // from the index start until the end index or pagination size, whichever is smaller.
                /** @type {?} */
                var range = this.paginator.range;
                return data.slice(range[0], range[1]);
            }
            return data;
        };
        /**
         * @protected
         * @param {?} totalLength
         * @return {?}
         */
        PblDataSourceAdapter.prototype.resetPagination = /**
         * @protected
         * @param {?} totalLength
         * @return {?}
         */
        function (totalLength) {
            if (this.paginator) {
                this.paginator.total = totalLength;
                this.paginator.page = totalLength > 0 ? 1 : 0;
            }
        };
        /* Note:  Currently this is only used in the constructor.
                  However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                  `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                  Because the API is public it will probably won't work so the best solution might be to switch
                  `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
        /* Note:  Currently this is only used in the constructor.
                    However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                    `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                    Because the API is public it will probably won't work so the best solution might be to switch
                    `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
        /**
         * @private
         * @return {?}
         */
        PblDataSourceAdapter.prototype.initStreams = /* Note:  Currently this is only used in the constructor.
                    However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                    `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                    Because the API is public it will probably won't work so the best solution might be to switch
                    `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
        /**
         * @private
         * @return {?}
         */
        function () {
            this._onSourceChange$ = new rxjs.Subject();
            this.onSourceChanged = this._onSourceChange$.pipe(operators.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d !== SOURCE_CHANGING_TOKEN; })));
            this.onSourceChanging = this._onSourceChange$.pipe(operators.filter((/**
             * @param {?} d
             * @return {?}
             */
            function (d) { return d === SOURCE_CHANGING_TOKEN; })));
            this._refresh$ = new rxjs.Subject();
            this._lastSource = undefined;
        };
        /**
         * Execute the user-provided function that returns the data collection.
         * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
         * This is where all cache logic is managed (createChangeContainer).
         *
         * To build a data collection the information from all triggers is required, even if it was not changed.
         * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
         * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
         * data without doing redundant work.
         * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
         * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
         *
         * The handler can return several data structures, observable, promise, array or false.
         * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
         *
         * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
         * a dead-end observable is returned (observable that will never emit).
         */
        /**
         * Execute the user-provided function that returns the data collection.
         * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
         * This is where all cache logic is managed (createChangeContainer).
         *
         * To build a data collection the information from all triggers is required, even if it was not changed.
         * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
         * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
         * data without doing redundant work.
         * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
         * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
         *
         * The handler can return several data structures, observable, promise, array or false.
         * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
         *
         * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
         * a dead-end observable is returned (observable that will never emit).
         * @private
         * @param {?} event
         * @return {?}
         */
        PblDataSourceAdapter.prototype.runHandle = /**
         * Execute the user-provided function that returns the data collection.
         * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
         * This is where all cache logic is managed (createChangeContainer).
         *
         * To build a data collection the information from all triggers is required, even if it was not changed.
         * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
         * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
         * data without doing redundant work.
         * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
         * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
         *
         * The handler can return several data structures, observable, promise, array or false.
         * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
         *
         * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
         * a dead-end observable is returned (observable that will never emit).
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var _this = this;
            this._onSourceChange$.next(SOURCE_CHANGING_TOKEN);
            /** @type {?} */
            var result = this.sourceFactory(event);
            if (result === false) {
                return (/** @type {?} */ (rxjs.of(false).pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return false; }))))); // stop emissions if got false.
            }
            /** @type {?} */
            var obs = rxjs.isObservable(result)
                ? result
                : Array.isArray(result)
                    ? rxjs.of(result)
                    : rxjs.from(result) // promise...
            ;
            return obs.pipe(
            // run as a micro-task
            operators.observeOn(rxjs.asapScheduler, 0), operators.map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return Array.isArray(data) ? data : []; })), operators.tap((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return _this._onSourceChange$.next(data); })));
        };
        return PblDataSourceAdapter;
    }());
    if (false) {
        /** @type {?} */
        PblDataSourceAdapter.prototype.onSourceChanged;
        /** @type {?} */
        PblDataSourceAdapter.prototype.onSourceChanging;
        /**
         * @type {?}
         * @protected
         */
        PblDataSourceAdapter.prototype.paginator;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype.config;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype.cache;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype._onSourceChange$;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype._refresh$;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype._lastSource;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype._lastSortedSource;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceAdapter.prototype._lastFilteredSource;
        /** @type {?} */
        PblDataSourceAdapter.prototype.sourceFactory;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * An object with properties representing the change in the paginator.
     * Each property point to a tuple with 2 items.
     * The first item is the old value, the 2nd item is the new value.
     *
     * The properties that can change are page, perPage and total.
     * @record
     * @template T
     */
    function PblPaginatorChangeEvent() { }
    if (false) {
        /** @type {?|undefined} */
        PblPaginatorChangeEvent.prototype.page;
        /** @type {?|undefined} */
        PblPaginatorChangeEvent.prototype.perPage;
        /** @type {?|undefined} */
        PblPaginatorChangeEvent.prototype.total;
    }
    /**
     * @record
     * @template TPage
     */
    function PblPaginator() { }
    if (false) {
        /** @type {?} */
        PblPaginator.prototype.kind;
        /**
         * When true will assume that the datasource represents a single page.
         * This is common in server side pagination where pervious data is not cached and each pages is fetched and set as is, i.e. the datasource
         * represents a single page at a time.
         *
         * For example, consider a paginator with 10 items per page, pointing to page 4.
         * When `noCacheMode` is set to `true` the range is [30, 39]
         * When `noCacheMode` is set to `false` the range is [0, 9]
         * @type {?}
         */
        PblPaginator.prototype.noCacheMode;
        /** @type {?} */
        PblPaginator.prototype.perPage;
        /** @type {?} */
        PblPaginator.prototype.page;
        /** @type {?} */
        PblPaginator.prototype.total;
        /** @type {?} */
        PblPaginator.prototype.totalPages;
        /** @type {?} */
        PblPaginator.prototype.range;
        /** @type {?} */
        PblPaginator.prototype.onChange;
        /**
         * @return {?}
         */
        PblPaginator.prototype.reset = function () { };
        /**
         * @param {?} value
         * @return {?}
         */
        PblPaginator.prototype.canMove = function (value) { };
        /**
         * @return {?}
         */
        PblPaginator.prototype.hasNext = function () { };
        /**
         * @return {?}
         */
        PblPaginator.prototype.hasPrev = function () { };
        /**
         * @param {?} value
         * @return {?}
         */
        PblPaginator.prototype.move = function (value) { };
        /**
         * @return {?}
         */
        PblPaginator.prototype.nextPage = function () { };
        /**
         * @return {?}
         */
        PblPaginator.prototype.prevPage = function () { };
    }
    var PblTokenPaginator = /** @class */ (function () {
        function PblTokenPaginator() {
            this.kind = 'token';
            this._perPage = 10;
            this._total = 0;
            this.onChange$ = new rxjs.BehaviorSubject({ page: [null, null] });
            this.onChange = this.onChange$.asObservable();
            this.reset();
        }
        Object.defineProperty(PblTokenPaginator.prototype, "perPage", {
            get: /**
             * @return {?}
             */
            function () { return this._perPage; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value < 1) {
                    throw new Error("Invalid total size value " + value);
                }
                if (this._perPage !== value) {
                    /** @type {?} */
                    var changes = { perPage: [this._perPage, this._perPage = value] };
                    this.emit(changes);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "page", {
            get: /**
             * @return {?}
             */
            function () { return this._page; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._page !== value) {
                    /** @type {?} */
                    var idx = this._tokens.indexOf(value);
                    if (idx === -1) {
                        throw new Error("Invalid page token " + value);
                    }
                    this._cursor = idx;
                    /** @type {?} */
                    var prev = this._page;
                    this._page = value;
                    this.emit({ page: [prev, value] });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "total", {
            get: /**
             * @return {?}
             */
            function () { return this._total; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                /** @type {?} */
                var changes = { total: [this._total, this._total = value] };
                this.emit(changes);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "totalPages", {
            get: /**
             * @return {?}
             */
            function () {
                return this._tokens.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblTokenPaginator.prototype, "range", {
            get: /**
             * @return {?}
             */
            function () {
                if (!this._range) {
                    /** @type {?} */
                    var start = (this._cursor) * this.perPage;
                    /** @type {?} */
                    var end = Math.min(this._total, start + this.perPage);
                    this._range = this.noCacheMode
                        ? [0, end - start]
                        : [start, end];
                }
                return this._range;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblTokenPaginator.prototype.reset = /**
         * @return {?}
         */
        function () {
            this._tokens = [null];
            this._cursor = 0;
            this._total = 0;
            this.page = null;
        };
        /**
         * @param {?} value
         * @return {?}
         */
        PblTokenPaginator.prototype.canMove = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return this._tokens.indexOf(value) > -1;
        };
        /**
         * @return {?}
         */
        PblTokenPaginator.prototype.hasNext = /**
         * @return {?}
         */
        function () { return this._cursor < this._tokens.length - 1; };
        /**
         * @return {?}
         */
        PblTokenPaginator.prototype.hasPrev = /**
         * @return {?}
         */
        function () { return this._cursor > 0; };
        /**
         * @param {?} value
         * @return {?}
         */
        PblTokenPaginator.prototype.move = /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.page = value; };
        /**
         * @return {?}
         */
        PblTokenPaginator.prototype.nextPage = /**
         * @return {?}
         */
        function () { this.page = this._tokens[++this._cursor]; };
        /**
         * @return {?}
         */
        PblTokenPaginator.prototype.prevPage = /**
         * @return {?}
         */
        function () { this.page = this._tokens[--this._cursor]; };
        /**
         * @param {?} value
         * @return {?}
         */
        PblTokenPaginator.prototype.addNext = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var nextPointer = this._cursor + 1;
            // if next pointer is not like what we got, set it and delete all after (invalidate them)
            if (this._tokens[nextPointer] !== value) {
                this._tokens[nextPointer] = value;
                this._tokens.splice(nextPointer + 1);
            }
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        PblTokenPaginator.prototype.emit = /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            this._range = undefined;
            if (this.queuedChanges) {
                Object.assign(this.queuedChanges, changes);
            }
            else {
                this.queuedChanges = changes;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.queuedChanges = undefined;
                    _this.onChange$.next(changes);
                }));
            }
        };
        return PblTokenPaginator;
    }());
    if (false) {
        /** @type {?} */
        PblTokenPaginator.prototype.kind;
        /** @type {?} */
        PblTokenPaginator.prototype.noCacheMode;
        /** @type {?} */
        PblTokenPaginator.prototype.onChange;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype.onChange$;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype.queuedChanges;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype._range;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype._perPage;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype._page;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype._total;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype._tokens;
        /**
         * @type {?}
         * @protected
         */
        PblTokenPaginator.prototype._cursor;
    }
    var PblPagingPaginator = /** @class */ (function () {
        function PblPagingPaginator() {
            this.kind = 'pageNumber';
            this._total = 0;
            this._perPage = 10;
            this._page = 1;
            this._totalPages = 0;
            this.onChange$ = new rxjs.BehaviorSubject({ page: [null, 1] });
            this.onChange = this.onChange$.asObservable();
        }
        Object.defineProperty(PblPagingPaginator.prototype, "perPage", {
            get: /**
             * @return {?}
             */
            function () { return this._perPage; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value < 1) {
                    throw new Error("Invalid total size value " + value);
                }
                if (this._perPage !== value) {
                    /** @type {?} */
                    var changes = { perPage: [this._perPage, this._perPage = value] };
                    /** @type {?} */
                    var prev = this._page;
                    this.calcPages();
                    if (prev !== this._page) {
                        changes.page = [prev, this._page];
                    }
                    this.emit(changes);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "page", {
            /**
             * Get / Set the current page
             */
            get: /**
             * Get / Set the current page
             * @return {?}
             */
            function () { return this._page; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value < 0 || value > this._totalPages) {
                    throw new Error("Invalid page index " + value);
                }
                if (this._page !== value) {
                    /** @type {?} */
                    var prev = this._page;
                    this._page = value;
                    this.emit({ page: [prev, value] });
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "total", {
            get: /**
             * @return {?}
             */
            function () { return this._total; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value < 0) {
                    throw new Error("Invalid total size value " + value);
                }
                if (this._total !== value) {
                    /** @type {?} */
                    var changes = { total: [this._total, this._total = value] };
                    /** @type {?} */
                    var prev = this._page;
                    this.calcPages();
                    if (prev !== this._page) {
                        changes.page = [prev, this._page];
                    }
                    this.emit(changes);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "totalPages", {
            /**
             * The amount of pages in this paginator
             */
            get: /**
             * The amount of pages in this paginator
             * @return {?}
             */
            function () {
                return this._totalPages;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPagingPaginator.prototype, "range", {
            get: /**
             * @return {?}
             */
            function () {
                if (!this._range) {
                    /** @type {?} */
                    var start = (this.page - 1) * this.perPage;
                    /** @type {?} */
                    var end = Math.min(this._total, start + this.perPage);
                    this._range = this.noCacheMode
                        ? [0, end - start]
                        : [start, end];
                }
                return this._range;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} value
         * @return {?}
         */
        PblPagingPaginator.prototype.canMove = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var p = this._page + value;
            return p >= 1 && p <= this.totalPages;
        };
        /**
         * @return {?}
         */
        PblPagingPaginator.prototype.hasNext = /**
         * @return {?}
         */
        function () { return this.canMove(1); };
        /**
         * @return {?}
         */
        PblPagingPaginator.prototype.hasPrev = /**
         * @return {?}
         */
        function () { return this.canMove(-1); };
        /**
         * @param {?} value
         * @return {?}
         */
        PblPagingPaginator.prototype.move = /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.page = this._page + value; };
        /**
         * @return {?}
         */
        PblPagingPaginator.prototype.nextPage = /**
         * @return {?}
         */
        function () { this.move(1); };
        /**
         * @return {?}
         */
        PblPagingPaginator.prototype.prevPage = /**
         * @return {?}
         */
        function () { this.move(-1); };
        /**
         * @return {?}
         */
        PblPagingPaginator.prototype.reset = /**
         * @return {?}
         */
        function () {
            this.page = 1;
        };
        /**
         * Calculate the number of pages.
         * returns true if the current page has changed due to calculation. (current page \> new pages value)
         */
        /**
         * Calculate the number of pages.
         * returns true if the current page has changed due to calculation. (current page \> new pages value)
         * @protected
         * @return {?}
         */
        PblPagingPaginator.prototype.calcPages = /**
         * Calculate the number of pages.
         * returns true if the current page has changed due to calculation. (current page \> new pages value)
         * @protected
         * @return {?}
         */
        function () {
            this._totalPages = Math.ceil(this._total / this.perPage);
            if (this._totalPages > 0 && this._page > this._totalPages) {
                this.page = this._totalPages;
            }
        };
        /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        PblPagingPaginator.prototype.emit = /**
         * @private
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var _this = this;
            this._range = undefined;
            if (this.queuedChanges) {
                Object.assign(this.queuedChanges, changes);
            }
            else {
                this.queuedChanges = changes;
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.queuedChanges = undefined;
                    _this.onChange$.next(changes);
                }));
            }
        };
        return PblPagingPaginator;
    }());
    if (false) {
        /** @type {?} */
        PblPagingPaginator.prototype.kind;
        /** @type {?} */
        PblPagingPaginator.prototype.noCacheMode;
        /** @type {?} */
        PblPagingPaginator.prototype.onChange;
        /**
         * @type {?}
         * @protected
         */
        PblPagingPaginator.prototype.onChange$;
        /**
         * @type {?}
         * @private
         */
        PblPagingPaginator.prototype._total;
        /**
         * @type {?}
         * @private
         */
        PblPagingPaginator.prototype._perPage;
        /**
         * @type {?}
         * @private
         */
        PblPagingPaginator.prototype._page;
        /**
         * @type {?}
         * @private
         */
        PblPagingPaginator.prototype._totalPages;
        /**
         * @type {?}
         * @private
         */
        PblPagingPaginator.prototype._range;
        /**
         * @type {?}
         * @private
         */
        PblPagingPaginator.prototype.queuedChanges;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PROCESSING_SUBSCRIPTION_GROUP = {};
    /**
     * @record
     */
    function PblDataSourceOptions() { }
    if (false) {
        /**
         * When set to True will not disconnect upon table disconnection, otherwise does.
         * @type {?|undefined}
         */
        PblDataSourceOptions.prototype.keepAlive;
        /**
         * Skip the first trigger emission.
         * Use this for late binding, usually with a call to refresh() on the data source.
         *
         * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
         * @type {?|undefined}
         */
        PblDataSourceOptions.prototype.skipInitial;
    }
    /**
     * @template T, TData
     */
    var   /**
     * @template T, TData
     */
    PblDataSource = /** @class */ (function (_super) {
        __extends(PblDataSource, _super);
        function PblDataSource(adapter, options) {
            var _this = _super.call(this) || this;
            _this._selection = new collections.SelectionModel(true, []);
            _this._tableConnectionChange$ = new rxjs.Subject();
            _this._onRenderDataChanging = new rxjs.Subject();
            _this._renderData$ = new rxjs.BehaviorSubject([]);
            _this._filter$ = new rxjs.BehaviorSubject(undefined);
            _this._sort$ = new rxjs.BehaviorSubject({ column: null, sort: null, skipUpdate: false });
            _this._onError$ = new rxjs.Subject();
            options = options || {};
            _this.adapter = adapter;
            _this.onSourceChanging = _this._adapter.onSourceChanging;
            // emit source changed event every time adapter gets new data
            _this.onSourceChanged = _this.adapter.onSourceChanged
                .pipe(operators.observeOn(rxjs.asapScheduler, 0), // emit on the end of the current turn (micro-task) to ensure `onSourceChanged` emission in `_updateProcessingLogic` run's first.
            operators.mapTo(undefined));
            _this.onRenderDataChanging = _this._onRenderDataChanging.asObservable();
            _this.onRenderedDataChanged = _this._renderData$.pipe(operators.skip(1), operators.mapTo(undefined));
            _this.onError = _this._onError$.asObservable();
            _this.tableConnectionChange = _this._tableConnectionChange$.asObservable();
            _this.keepAlive = options.keepAlive || false;
            _this.skipInitial = options.skipInitial || false;
            _this.sortChange = _this._sort$.asObservable();
            return _this;
        }
        Object.defineProperty(PblDataSource.prototype, "pagination", {
            get: /**
             * @return {?}
             */
            function () { return this._pagination; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._pagination !== value) {
                    this._pagination = value;
                    switch (value) {
                        case 'pageNumber':
                            this._paginator = new PblPagingPaginator();
                            break;
                        case 'token':
                            this._paginator = new PblTokenPaginator();
                            break;
                        default:
                            this._paginator = undefined;
                            break;
                    }
                    if (this._adapter) {
                        this._adapter.setPaginator(this._paginator);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "adapter", {
            get: /**
             * @return {?}
             */
            function () { return this._adapter; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._adapter !== value) {
                    this._adapter = value;
                    if (this.pagination) {
                        this._adapter.setPaginator(this._paginator);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblDataSource.prototype, "renderedRows", {
            // TODO(1.0.0): remove
            /** @deprecated BREAKING CHANGE: removed in 1.0.0 - Use renderedData instead. */
            get: 
            // TODO(1.0.0): remove
            /**
             * @deprecated BREAKING CHANGE: removed in 1.0.0 - Use renderedData instead.
             * @return {?}
             */
            function () { return this._renderData$.value || []; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "renderStart", {
            /** Returns the starting index of the rendered data */
            get: /**
             * Returns the starting index of the rendered data
             * @return {?}
             */
            function () { return this._lastRange ? this._lastRange.start : 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "renderLength", {
            get: /**
             * @return {?}
             */
            function () { return this._renderData$.value.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "renderedData", {
            get: /**
             * @return {?}
             */
            function () { return this._renderData$.value || []; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "sortedData", {
            /**
             * The `source` with sorting applied.
             * Valid only when sorting is performed client-side.
             *
             * To get real-time notifications use `onRenderDataChanging`.
             * The sorted data is updated just before `onRenderDataChanging` fire.
             */
            get: /**
             * The `source` with sorting applied.
             * Valid only when sorting is performed client-side.
             *
             * To get real-time notifications use `onRenderDataChanging`.
             * The sorted data is updated just before `onRenderDataChanging` fire.
             * @return {?}
             */
            function () { return (this._lastAdapterEvent && this._lastAdapterEvent.sorted) || []; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblDataSource.prototype, "filteredData", {
            /**
             * The `source` with filtering applied.
             * Valid only when filtering is performed client-side.
             * If sorting is applied as well, the filtered results are also sorted.
             *
             * To get real-time notifications use `onRenderDataChanging`.
             * The filtered data is updated just before `onRenderDataChanging` fire.
             */
            get: /**
             * The `source` with filtering applied.
             * Valid only when filtering is performed client-side.
             * If sorting is applied as well, the filtered results are also sorted.
             *
             * To get real-time notifications use `onRenderDataChanging`.
             * The filtered data is updated just before `onRenderDataChanging` fire.
             * @return {?}
             */
            function () { return (this._lastAdapterEvent && this._lastAdapterEvent.filtered) || []; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblDataSource.prototype, "filter", {
            get: /**
             * @return {?}
             */
            function () { return this._filter$.value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "sort", {
            get: /**
             * @return {?}
             */
            function () { return this._sort$.value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "paginator", {
            get: /**
             * @return {?}
             */
            function () { return this._paginator; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "length", {
            get: /**
             * @return {?}
             */
            function () { return this.source.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "source", {
            get: /**
             * @return {?}
             */
            function () { return this._source || []; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblDataSource.prototype, "selection", {
            /** Represents selected items on the data source. */
            get: /**
             * Represents selected items on the data source.
             * @return {?}
             */
            function () { return this._selection; },
            enumerable: true,
            configurable: true
        });
        /**
         * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
         */
        /**
         * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
         * @param {?=} data
         * @return {?}
         */
        PblDataSource.prototype.refresh = /**
         * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
         * @param {?=} data
         * @return {?}
         */
        function (data) {
            if (this._tableConnected) {
                this._adapter.refresh(data);
            }
            else {
                this._lastRefresh = data;
            }
        };
        /**
         * @param {?=} value
         * @param {?=} columns
         * @return {?}
         */
        PblDataSource.prototype.setFilter = /**
         * @param {?=} value
         * @param {?=} columns
         * @return {?}
         */
        function (value, columns) {
            if (value && typeof value !== 'function' && (!columns || columns.length === 0)) {
                throw new Error('Invalid filter definitions, columns are mandatory when using a single value input.');
            }
            this._filter$.next(createFilter(value, columns || []));
        };
        /**
         * Refresh the filters result.
         *
         * Note that this should only be used when using a predicate function filter and not the simple value filter.
         * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
         * has no impact.
         *
         * For custom predicate function filters this might be useful.
         *
         */
        /**
         * Refresh the filters result.
         *
         * Note that this should only be used when using a predicate function filter and not the simple value filter.
         * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
         * has no impact.
         *
         * For custom predicate function filters this might be useful.
         *
         * @return {?}
         */
        PblDataSource.prototype.syncFilter = /**
         * Refresh the filters result.
         *
         * Note that this should only be used when using a predicate function filter and not the simple value filter.
         * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
         * has no impact.
         *
         * For custom predicate function filters this might be useful.
         *
         * @return {?}
         */
        function () {
            /** @type {?} */
            var currentFilter = this._adapter.clearCache('filter');
            if (currentFilter) {
                this.setFilter(currentFilter.filter, currentFilter.columns);
            }
        };
        /**
         * @param {?=} column
         * @param {?=} sort
         * @param {?=} skipUpdate
         * @return {?}
         */
        PblDataSource.prototype.setSort = /**
         * @param {?=} column
         * @param {?=} sort
         * @param {?=} skipUpdate
         * @return {?}
         */
        function (column, sort, skipUpdate) {
            if (skipUpdate === void 0) { skipUpdate = false; }
            if (!column || typeof column === 'boolean') {
                this._sort$.next({ column: null, sort: {}, skipUpdate: !!column });
            }
            else {
                this._sort$.next({ column: column, sort: sort, skipUpdate: skipUpdate });
            }
        };
        /**
         * @return {?}
         */
        PblDataSource.prototype.dispose = /**
         * @return {?}
         */
        function () {
            if (!this._disposed) {
                utils$1.UnRx.kill(this);
                this._adapter.dispose();
                this._onRenderDataChanging.complete();
                this._renderData$.complete();
                this._filter$.complete();
                this._sort$.complete();
                this._onError$.complete();
                this._disposed = true;
            }
        };
        /**
         * @param {?} cv
         * @return {?}
         */
        PblDataSource.prototype.disconnect = /**
         * @param {?} cv
         * @return {?}
         */
        function (cv) {
            this._lastRefresh = undefined;
            this._tableConnectionChange$.next(this._tableConnected = false);
            if (this.keepAlive === false) {
                this.dispose();
            }
        };
        /**
         * @param {?} cv
         * @return {?}
         */
        PblDataSource.prototype.connect = /**
         * @param {?} cv
         * @return {?}
         */
        function (cv) {
            if (this._disposed) {
                throw new Error('PblDataSource is disposed. Use `keepAlive` if you move datasource between tables.');
            }
            this._tableConnected = true;
            this._updateProcessingLogic(cv);
            this._tableConnectionChange$.next(this._tableConnected);
            return this._renderData$;
        };
        /**
         * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
         *
         * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
         * local to the rendered view and are translated to fit the entire source.
         *
         * Tp disable this behavior, set the `absolute` parameter to `true`
         */
        /**
         * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
         *
         * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
         * local to the rendered view and are translated to fit the entire source.
         *
         * Tp disable this behavior, set the `absolute` parameter to `true`
         * @param {?} fromIndex
         * @param {?} toIndex
         * @param {?=} absolute
         * @return {?}
         */
        PblDataSource.prototype.moveItem = /**
         * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
         *
         * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
         * local to the rendered view and are translated to fit the entire source.
         *
         * Tp disable this behavior, set the `absolute` parameter to `true`
         * @param {?} fromIndex
         * @param {?} toIndex
         * @param {?=} absolute
         * @return {?}
         */
        function (fromIndex, toIndex, absolute) {
            if (absolute === void 0) { absolute = false; }
            if (absolute !== true && this._lastRange) {
                fromIndex = this._lastRange.start + fromIndex;
                toIndex = this._lastRange.start + toIndex;
            }
            if (this.length > 0) {
                dragDrop.moveItemInArray(this._source, fromIndex, toIndex);
                /** @type {?} */
                var data = this._lastRange
                    ? this._source.slice(this._lastRange.start, this._lastRange.end)
                    : this._source;
                this._renderData$.next(data);
            }
        };
        /**
         * @private
         * @param {?} cv
         * @return {?}
         */
        PblDataSource.prototype._updateProcessingLogic = /**
         * @private
         * @param {?} cv
         * @return {?}
         */
        function (cv) {
            var _this = this;
            /** @type {?} */
            var initialState = { filter: this.filter, sort: this.sort };
            /** @type {?} */
            var paginator = this._paginator;
            if (paginator) {
                initialState.pagination = { page: paginator.page, perPage: paginator.perPage };
            }
            /** @type {?} */
            var stream = this._adapter.updateProcessingLogic(this._filter$, this._sort$, paginator ? paginator.onChange : rxjs.of(undefined), initialState);
            utils$1.UnRx.kill(this, PROCESSING_SUBSCRIPTION_GROUP);
            /** @type {?} */
            var trimToRange = (/**
             * @param {?} range
             * @param {?} data
             * @return {?}
             */
            function (range, data) { return data.slice(range.start, range.end); });
            /** @type {?} */
            var skipViewChange;
            /** @type {?} */
            var lastEmittedSource;
            cv.viewChange
                .pipe(utils$1.UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
                .subscribe((/**
             * @param {?} range
             * @return {?}
             */
            function (range) {
                if (_this._lastRange && _this._lastRange.start === range.start && _this._lastRange.end === range.end) {
                    return;
                }
                _this._lastRange = range;
                if (!skipViewChange) {
                    if (range && lastEmittedSource && lastEmittedSource.length) {
                        _this._renderData$.next(trimToRange(_this._lastRange, lastEmittedSource));
                    }
                }
            }));
            stream
                .pipe(utils$1.UnRx(this, PROCESSING_SUBSCRIPTION_GROUP), operators.tap((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                lastEmittedSource = result.data;
                skipViewChange = true;
                _this._onRenderDataChanging.next(_this._lastAdapterEvent = result);
            })))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var data = _a.data;
                if (_this._lastRange && data && data.length) {
                    data = trimToRange(_this._lastRange, data);
                }
                _this._renderData$.next(data);
                skipViewChange = false;
            }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { _this._onError$.next(error); }));
            this._adapter.onSourceChanged
                .pipe(utils$1.UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
                .subscribe((/**
             * @param {?} source
             * @return {?}
             */
            function (source) { return _this._source = source || []; }));
            if (this._lastRefresh !== undefined) {
                this._adapter.refresh(this._lastRefresh);
                this._lastRefresh = undefined;
            }
            else if (!this.skipInitial) {
                // _refresh$ is a Subject, we must emit once so combineLatest will work
                this.refresh();
            }
        };
        return PblDataSource;
    }(table.DataSource));
    if (false) {
        /**
         * An observable that emit events when an new incoming source is expected, before calling the trigger handler to get the new source.
         * This even is usually followed by the `onSourceChanged` event but not always. This is because the trigger handler
         * can cancel the operation (when it returns false) which means an `onSourceChanged` event will not fire.
         *
         * Emissions occur when the trigger handler is invoked and also when the trigger handler returned an observable and the observable emits.
         *
         * > Note that a micro-task delays is applied between the `onSourceChanging` subsequent `onSourceChanged` event (when emitted).
         * @type {?}
         */
        PblDataSource.prototype.onSourceChanging;
        /**
         * An observable that emit events when a new source has been received from the trigger handler but before any processing is applied.
         * Emissions occur when the trigger handler is invoked and also when the trigger handler returned an observable and the observable emits.
         *
         * Examples: Calling `refresh()`, filter / sort / pagination events.
         *
         * > Note that the `onSourceChanged` fired before the data is rendered ane before any client-side filter/sort/pagination are applied.
         * It only indicates that the source data-set is now updated and the grid is about to apply logic on the data-set and then render it.
         * @type {?}
         */
        PblDataSource.prototype.onSourceChanged;
        /**
         * An observable that emit events when new source has been received from the trigger handler and after it was processed.
         * Emissions will occur after `onSourceChanged` event has been fired.
         *
         * The main difference between `onSourceChanged` and `onRenderDataChanging` is local processing performed in the datasource.
         * These are usually client-side operations like filter/sort/pagination. If all of these events are handled manually (custom)
         * in the trigger handler then `onSourceChanged` and `onRenderDataChanging` have no difference.
         *
         * > Note that `onRenderDataChanging` and `onRenderedDataChanged` are not closely related as `onRenderedDataChanged` fires at
         * a much more rapid pace (virtual scroll). The name `onRenderDataChanging` might change in the future.
         * @type {?}
         */
        PblDataSource.prototype.onRenderDataChanging;
        /**
         * An observable that emit events when the grid is about to render data.
         * The rendered data is updated when the source changed or when the grid is in virtual scroll mode and the user is scrolling.
         *
         * Each emission reflects a change in the data that the grid is rendering.
         * @type {?}
         */
        PblDataSource.prototype.onRenderedDataChanged;
        /** @type {?} */
        PblDataSource.prototype.onError;
        /**
         * An event that fires when the connection state to a table has changed.
         * @type {?}
         */
        PblDataSource.prototype.tableConnectionChange;
        /** @type {?} */
        PblDataSource.prototype.sortChange;
        /**
         * When set to True will not disconnect upon table disconnection, otherwise unsubscribe from the
         * datasource when the table disconnects.
         * @type {?}
         */
        PblDataSource.prototype.keepAlive;
        /**
         * Skip the first trigger emission.
         * Use this for late binding, usually with a call to refresh() on the data source.
         *
         * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
         * @type {?}
         */
        PblDataSource.prototype.skipInitial;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._selection;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._tableConnectionChange$;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._onRenderDataChanging;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._renderData$;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._filter$;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._sort$;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._onError$;
        /**
         * @type {?}
         * @protected
         */
        PblDataSource.prototype._paginator;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._pagination;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._adapter;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._source;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._disposed;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._tableConnected;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._lastRefresh;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._lastRange;
        /**
         * @type {?}
         * @private
         */
        PblDataSource.prototype._lastAdapterEvent;
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function AdapterParams() { }
    if (false) {
        /** @type {?|undefined} */
        AdapterParams.prototype.onTrigger;
        /** @type {?|undefined} */
        AdapterParams.prototype.customTriggers;
    }
    /**
     * @template T, TData
     */
    var   /**
     * @template T, TData
     */
    PblDataSourceFactory = /** @class */ (function () {
        function PblDataSourceFactory() {
            this._adapter = {};
            this._dsOptions = {};
        }
        /**
         * Set the main trigger handler.
         * The trigger handler is the core of the datasource, responsible for returning the data collection.
         *
         * By default the handler is triggered only when the datasource is required.
         * This can happened when:
         *   - The table connected to the datasource.
         *   - A manual call to `PblDataSource.refresh()` was invoked.
         *
         * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
         * a filter has change or when a page in the paginator was changed.
         *
         * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
         * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
         *
         * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
         */
        /**
         * Set the main trigger handler.
         * The trigger handler is the core of the datasource, responsible for returning the data collection.
         *
         * By default the handler is triggered only when the datasource is required.
         * This can happened when:
         *   - The table connected to the datasource.
         *   - A manual call to `PblDataSource.refresh()` was invoked.
         *
         * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
         * a filter has change or when a page in the paginator was changed.
         *
         * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
         * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
         *
         * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
         * @template THIS
         * @this {THIS}
         * @param {?} handler
         * @return {THIS}
         */
        PblDataSourceFactory.prototype.onTrigger = /**
         * Set the main trigger handler.
         * The trigger handler is the core of the datasource, responsible for returning the data collection.
         *
         * By default the handler is triggered only when the datasource is required.
         * This can happened when:
         *   - The table connected to the datasource.
         *   - A manual call to `PblDataSource.refresh()` was invoked.
         *
         * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
         * a filter has change or when a page in the paginator was changed.
         *
         * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
         * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
         *
         * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
         * @template THIS
         * @this {THIS}
         * @param {?} handler
         * @return {THIS}
         */
        function (handler) {
            (/** @type {?} */ (this))._adapter.onTrigger = handler;
            return (/** @type {?} */ (this));
        };
        /**
         * A list of triggers that will be handled by the trigger handler.
         * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
         * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
         *
         * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
         */
        /**
         * A list of triggers that will be handled by the trigger handler.
         * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
         * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
         *
         * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
         * @template THIS
         * @this {THIS}
         * @param {...?} triggers
         * @return {THIS}
         */
        PblDataSourceFactory.prototype.setCustomTriggers = /**
         * A list of triggers that will be handled by the trigger handler.
         * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
         * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
         *
         * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
         * @template THIS
         * @this {THIS}
         * @param {...?} triggers
         * @return {THIS}
         */
        function () {
            var e_1, _a;
            var triggers = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                triggers[_i] = arguments[_i];
            }
            if (triggers.length === 0) {
                (/** @type {?} */ (this))._adapter.customTriggers = false;
            }
            else {
                /** @type {?} */
                var customTriggers = (/** @type {?} */ (this))._adapter.customTriggers = {};
                try {
                    for (var triggers_1 = __values(triggers), triggers_1_1 = triggers_1.next(); !triggers_1_1.done; triggers_1_1 = triggers_1.next()) {
                        var t = triggers_1_1.value;
                        customTriggers[t] = true;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (triggers_1_1 && !triggers_1_1.done && (_a = triggers_1.return)) _a.call(triggers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return (/** @type {?} */ (this));
        };
        /**
         * Skip the first trigger emission.
         * Use this for late binding, usually with a call to refresh() on the data source.
         *
         * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
         */
        /**
         * Skip the first trigger emission.
         * Use this for late binding, usually with a call to refresh() on the data source.
         *
         * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        PblDataSourceFactory.prototype.skipInitialTrigger = /**
         * Skip the first trigger emission.
         * Use this for late binding, usually with a call to refresh() on the data source.
         *
         * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        function () {
            (/** @type {?} */ (this))._dsOptions.skipInitial = true;
            return (/** @type {?} */ (this));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        PblDataSourceFactory.prototype.keepAlive = /**
         * @template THIS
         * @this {THIS}
         * @return {THIS}
         */
        function () {
            (/** @type {?} */ (this))._dsOptions.keepAlive = true;
            return (/** @type {?} */ (this));
        };
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} handler
         * @return {THIS}
         */
        PblDataSourceFactory.prototype.onCreated = /**
         * @template THIS
         * @this {THIS}
         * @param {?} handler
         * @return {THIS}
         */
        function (handler) {
            (/** @type {?} */ (this))._onCreated = handler;
            return (/** @type {?} */ (this));
        };
        /**
         * @return {?}
         */
        PblDataSourceFactory.prototype.create = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var _adapter = this._adapter;
            /** @type {?} */
            var adapter = new PblDataSourceAdapter(_adapter.onTrigger, _adapter.customTriggers || false);
            /** @type {?} */
            var ds = new PblDataSource(adapter, this._dsOptions);
            if (this._onCreated) {
                this._onCreated(ds);
            }
            return ds;
        };
        return PblDataSourceFactory;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblDataSourceFactory.prototype._adapter;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceFactory.prototype._dsOptions;
        /**
         * @type {?}
         * @private
         */
        PblDataSourceFactory.prototype._onCreated;
    }
    /**
     * @template T, TData
     * @return {?}
     */
    function createDS() {
        return new PblDataSourceFactory();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // https://stackoverflow.com/questions/49579094/typescript-conditional-types-filter-out-readonly-properties-pick-only-requir

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Given an object (item) and a path, returns the value at the path
     * @param {?} item
     * @param {?} col
     * @return {?}
     */
    function deepPathGet(item, col) {
        var e_1, _a;
        if (col.path) {
            try {
                for (var _b = __values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var p = _c.value;
                    item = item[p];
                    if (!item)
                        return;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return item[col.prop];
    }
    /**
     * Given an object (item) and a path, returns the value at the path
     * @param {?} item
     * @param {?} col
     * @param {?} value
     * @return {?}
     */
    function deepPathSet(item, col, value) {
        var e_2, _a;
        if (col.path) {
            try {
                for (var _b = __values(col.path), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var p = _c.value;
                    item = item[p];
                    if (!item)
                        return;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        item[col.prop] = value;
    }
    /**
     * Updates the column sizes of the columns provided based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @param {?} rowWidth
     * @param {?} tableColumns
     * @param {?} metaColumns
     * @param {?=} options
     * @return {?}
     */
    function resetColumnWidths(rowWidth, tableColumns, metaColumns, options) {
        var e_3, _a, e_4, _b, e_5, _c;
        if (options === void 0) { options = {}; }
        var _d = rowWidth.defaultColumnWidth, pct = _d.pct, px = _d.px;
        /** @type {?} */
        var defaultWidth = "calc(" + pct + "% - " + px + "px)";
        /** @type {?} */
        var mark = !!options.tableMarkForCheck;
        try {
            for (var tableColumns_1 = __values(tableColumns), tableColumns_1_1 = tableColumns_1.next(); !tableColumns_1_1.done; tableColumns_1_1 = tableColumns_1.next()) {
                var c = tableColumns_1_1.value;
                c.setDefaultWidth(defaultWidth);
                c.updateWidth(mark);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (tableColumns_1_1 && !tableColumns_1_1.done && (_a = tableColumns_1.return)) _a.call(tableColumns_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        mark = !!options.metaMarkForCheck;
        try {
            for (var metaColumns_1 = __values(metaColumns), metaColumns_1_1 = metaColumns_1.next(); !metaColumns_1_1.done; metaColumns_1_1 = metaColumns_1.next()) {
                var m = metaColumns_1_1.value;
                try {
                    for (var _e = __values([m.header, m.footer]), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var c = _f.value;
                        if (c) {
                            c.updateWidth('');
                            if (mark) {
                                c.columnDef.markForCheck();
                            }
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_c = _e.return)) _c.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                // We don't handle groups because they are handled by `PblNgridComponent.resizeRows()`
                // which set the width for each.
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (metaColumns_1_1 && !metaColumns_1_1.done && (_b = metaColumns_1.return)) _b.call(metaColumns_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PblColumnTypeDefinitionDataMap() { }
    /**
     * Optional value to be used by the template when rendering the cell.
     * Any value is allowed, including functions which allow complex scenarios, for example rendering a cell based on values from other cells.
     * @record
     */
    function PblBaseColumnDefinition() { }
    if (false) {
        /**
         * A Unique ID for the column.
         * The ID must be unique across all columns, regardless of the type.
         * Columns with identical ID will share result in identical template.
         *
         * For example, having a header column and a footer column with the same id will result in the same cell presentation for both.
         *
         * > The ID is mandatory. Some implementation might use other values to auto-generate it and some might require it explicitly.
         * This is what it is optional.
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.id;
        /** @type {?|undefined} */
        PblBaseColumnDefinition.prototype.label;
        /**
         * The type of the values in this column.
         * This is an additional level for matching columns to templates, grouping templates for a type.
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.type;
        /**
         * CSS class that get applied on the header and cell.
         * You can apply unique header/cell styles using the element name.
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.css;
        /**
         * The width in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.width;
        /**
         * This minimum width in pixels
         * This is an absolute value, thus a number.
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.minWidth;
        /**
         * This maximum width in pixels
         * This is an absolute value, thus a number.
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.maxWidth;
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         * @type {?|undefined}
         */
        PblBaseColumnDefinition.prototype.data;
    }
    /**
     * @record
     */
    function PblMetaColumnDefinition() { }
    if (false) {
        /**
         * A Unique ID for the column.
         * @type {?}
         */
        PblMetaColumnDefinition.prototype.id;
        /** @type {?} */
        PblMetaColumnDefinition.prototype.kind;
        /**
         * The index (zero based) of the header row this column is attached to, used for multi-header setup.
         * When not set (undefined) the index is considered the LAST index.
         * @type {?}
         */
        PblMetaColumnDefinition.prototype.rowIndex;
    }
    /**
     * @record
     */
    function PblColumnGroupDefinition() { }
    if (false) {
        /**
         * A Unique ID for the column.
         * Auto-generated from the property
         * @type {?|undefined}
         */
        PblColumnGroupDefinition.prototype.id;
        /**
         * The index (zero based) of the header row this header group column is attached to, used for multi-header setup.
         * @type {?}
         */
        PblColumnGroupDefinition.prototype.rowIndex;
        /**
         * The table's column that is the first child column for this group.
         * @type {?}
         */
        PblColumnGroupDefinition.prototype.prop;
        /**
         * The total span of the group (excluding the first child - i.e. prop).
         * The span and prop are used to get the child columns of this group.
         * The span is not dynamic, once the columns are set they don't change.
         *
         * For example, if a we have a span of 2 and the column at the 2nd position is hidden it will still count as
         * being spanned although the UI will span only 1 column... (because the 2nd is hidden...)
         * @type {?}
         */
        PblColumnGroupDefinition.prototype.span;
    }
    /**
     * @record
     */
    function PblColumnDefinition() { }
    if (false) {
        /**
         * A Unique ID for the column.
         * Whe not set (recommend) it is auto-generated by concatenating the values of `prop` and ,
         * If you set this value manually, make sure it does not conflict with other columns!
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.id;
        /**
         * When set, defines this column as the primary index of the data-set with all values in this column being unique.
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.pIndex;
        /**
         * The property to display (from the row element)
         * You can use dot notation to display deep paths.
         * @type {?}
         */
        PblColumnDefinition.prototype.prop;
        /** @type {?|undefined} */
        PblColumnDefinition.prototype.headerType;
        /** @type {?|undefined} */
        PblColumnDefinition.prototype.footerType;
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
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.path;
        /** @type {?|undefined} */
        PblColumnDefinition.prototype.sort;
        /**
         * A custom predicate function to filter rows using the current column.
         *
         * Valid only when filtering by value.
         * See `PblDataSource.setFilter` for more information.
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.filter;
        /**
         * Indicates if the table is editable or not.
         * Note that an editable also requires an edit template to qualify as editable, this flag alone is not enough.
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.editable;
        /** @type {?|undefined} */
        PblColumnDefinition.prototype.pin;
        /**
         * @deprecated BREAKING CHANGE 1.0.0 - Use `alias` instead.
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.sortAlias;
        /**
         * An alias used to identify the column.
         * Useful when the server provides sort/filter metadata that does not have a 1:1 match with the column names.
         * e.g. Deep path props, property name convention mismatch, etc...
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.alias;
        /**
         * Optional transformer that control the value output from the combination of a column and a row.
         * The value returned from this transformer will be returned from `PblColumn.getValue`
         * @type {?|undefined}
         */
        PblColumnDefinition.prototype.transform;
    }
    /**
     * @record
     */
    function PblMetaRowDefinitions() { }
    if (false) {
        /** @type {?|undefined} */
        PblMetaRowDefinitions.prototype.rowClassName;
        /** @type {?|undefined} */
        PblMetaRowDefinitions.prototype.type;
    }
    /**
     * Represent a list of meta column's that together form a META ROW.
     * In other words, this is the definition of a row, using it's building blocks - the columns.
     *
     * > A row in the table represents a row in the datasource, A **meta row** does not, it can represent anything.
     * Meta rows are header, footer and header group.
     * @record
     * @template T
     */
    function PblColumnSet() { }
    if (false) {
        /** @type {?} */
        PblColumnSet.prototype.rowIndex;
        /** @type {?} */
        PblColumnSet.prototype.cols;
    }
    /**
     * Represent a complete column definition set for a table. (table, header, footer and headerGroup columns).
     *
     * `PblNgridColumnDefinitionSet` contains POJO objects (simple JSON like objects) for each column type (`PblColumnDefinition`, `PblMetaColumnDefinition` and `PblColumnGroupDefinition`)
     * which are later used to create runtime instance for each column type (`PblColumn`, `PblMetaColumn` and `PblColumnGroup`)
     *
     * Because `PblNgridColumnDefinitionSet` contains POJO objects it can be serialized easily.
     * @record
     */
    function PblNgridColumnDefinitionSet() { }
    if (false) {
        /** @type {?} */
        PblNgridColumnDefinitionSet.prototype.table;
        /** @type {?} */
        PblNgridColumnDefinitionSet.prototype.header;
        /** @type {?} */
        PblNgridColumnDefinitionSet.prototype.footer;
        /** @type {?} */
        PblNgridColumnDefinitionSet.prototype.headerGroup;
    }
    /**
     * Represent a complete column set for a table. (table, header, footer and headerGroup columns).
     *
     * `PblNgridColumnSet` contains runtime instances of for each column type (`PblColumn`, `PblMetaColumn` and `PblColumnGroup`)
     * which
     * @record
     */
    function PblNgridColumnSet() { }
    if (false) {
        /** @type {?} */
        PblNgridColumnSet.prototype.table;
        /** @type {?} */
        PblNgridColumnSet.prototype.header;
        /** @type {?} */
        PblNgridColumnSet.prototype.footer;
        /** @type {?} */
        PblNgridColumnSet.prototype.headerGroup;
        /** @type {?} */
        PblNgridColumnSet.prototype.groupStore;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var RE_PARSE_STYLE_LENGTH_UNIT = /((?:\d*\.)?\d+)(%|px)$/;
    /**
     * @param {?} exp
     * @return {?}
     */
    function parseStyleWidth(exp) {
        /** @type {?} */
        var match = RE_PARSE_STYLE_LENGTH_UNIT.exec(exp);
        if (match) {
            return { value: Number(match[1]), type: (/** @type {?} */ (match[2])) };
        }
    }
    /**
     * @template T
     * @param {?} def
     * @param {?} target
     * @return {?}
     */
    function initDefinitions(def, target) {
        /** @type {?} */
        var copyKeys = ['id', 'label', 'css', 'minWidth', 'width', 'maxWidth', 'type'];
        copyKeys.forEach((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k in def && (target[k] = def[k]); }));
        if (def.data) {
            target.data = Object.assign(target.data || {}, def.data);
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isColumnDefinition(obj) {
        // TODO: Get rid of this duckt-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
        return !!obj.prop && !obj.hasOwnProperty('span');
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isColumnGroupDefinition(obj) {
        // TODO: Get rid of this duckt-type type matching. Accept solid instances in PblTable.columns instead of interfaces.
        return !!obj.prop && obj.hasOwnProperty('span');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PBL_NGRID_META_COLUMN_MARK = Symbol('PblMetaColumn');
    /** @type {?} */
    var CLONE_PROPERTIES = ['kind', 'rowIndex'];
    /**
     * @param {?} def
     * @return {?}
     */
    function isPblMetaColumn(def) {
        return def instanceof PblMetaColumn || def[PBL_NGRID_META_COLUMN_MARK] === true;
    }
    var PblMetaColumn = /** @class */ (function () {
        function PblMetaColumn(def) {
            var e_1, _a;
            /**
             * A place to store things...
             * This must be an object, values are shadow-copied so persist data between multiple plugins.
             */
            this.data = {};
            this.defaultWidth = '';
            this[PBL_NGRID_META_COLUMN_MARK] = true;
            initDefinitions(def, this);
            try {
                for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                    var prop = CLONE_PROPERTIES_1_1.value;
                    if (prop in def) {
                        this[(/** @type {?} */ (prop))] = def[prop];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (CLONE_PROPERTIES_1_1 && !CLONE_PROPERTIES_1_1.done && (_a = CLONE_PROPERTIES_1.return)) _a.call(CLONE_PROPERTIES_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (!isPblMetaColumn(def)) {
                if (typeof def.type === 'string') {
                    this.type = (/** @type {?} */ ({ name: def.type }));
                }
            }
        }
        Object.defineProperty(PblMetaColumn.prototype, "width", {
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
        Object.defineProperty(PblMetaColumn.prototype, "parsedWidth", {
            //#endregion PblMetaColumnDefinition
            get: 
            //#endregion PblMetaColumnDefinition
            /**
             * @return {?}
             */
            function () { return this._parsedWidth; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblMetaColumn.prototype, "columnDef", {
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
        /**
         * @param {?} name
         * @return {?}
         */
        PblMetaColumn.extendProperty = /**
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
        PblMetaColumn.prototype.attach = /**
         * @param {?} columnDef
         * @return {?}
         */
        function (columnDef) {
            this.detach();
            this._columnDef = columnDef;
            this.columnDef.updateWidth(this.width || this.defaultWidth);
        };
        /**
         * @return {?}
         */
        PblMetaColumn.prototype.detach = /**
         * @return {?}
         */
        function () {
            this._columnDef = undefined;
        };
        /**
         * @param {?} fallbackDefault
         * @return {?}
         */
        PblMetaColumn.prototype.updateWidth = /**
         * @param {?} fallbackDefault
         * @return {?}
         */
        function (fallbackDefault) {
            this.defaultWidth = fallbackDefault || '';
            if (this.columnDef) {
                this.columnDef.updateWidth(this.width || fallbackDefault);
            }
        };
        return PblMetaColumn;
    }());
    if (false) {
        /**
         * A Unique ID for the column.
         * The ID must be unique across all columns, regardless of the type.
         * Columns with identical ID will share result in identical template.
         *
         * For example, having a header column and a footer column with the same id will result in the same cell presentation for both.
         * @type {?}
         */
        PblMetaColumn.prototype.id;
        /** @type {?} */
        PblMetaColumn.prototype.label;
        /**
         * The type of the values in this column.
         * This is an additional level for matching columns to templates, grouping templates for a type.
         * @type {?}
         */
        PblMetaColumn.prototype.type;
        /**
         * CSS class that get applied on the header and cell.
         * You can apply unique header/cell styles using the element name.
         * @type {?}
         */
        PblMetaColumn.prototype.css;
        /**
         * This minimum width in pixels
         * This is an absolute value, thus a number.
         * @type {?}
         */
        PblMetaColumn.prototype.minWidth;
        /**
         * This maximum width in pixels
         * This is an absolute value, thus a number.
         * @type {?}
         */
        PblMetaColumn.prototype.maxWidth;
        /**
         * A place to store things...
         * This must be an object, values are shadow-copied so persist data between multiple plugins.
         * @type {?}
         */
        PblMetaColumn.prototype.data;
        /** @type {?} */
        PblMetaColumn.prototype.kind;
        /**
         * The index (zero based) of the header row this column is attached to, used for multi-header setup.
         * When not set (undefined) the index is considered the LAST index.
         *
         * If you want to setup a multi header table with 2 header rows, set this to 0 for the first header row and for the 2nd header
         * row do not set a rowIndex.
         * @type {?}
         */
        PblMetaColumn.prototype.rowIndex;
        /**
         * Used by pbl-ngrid to apply a custom header/footer cell template, or the default when not set.
         * \@internal
         * @type {?}
         */
        PblMetaColumn.prototype.template;
        /**
         * When true indicates that the width is set with type pixels.
         * \@internal
         * @type {?}
         */
        PblMetaColumn.prototype.isFixedWidth;
        /**
         * @type {?}
         * @private
         */
        PblMetaColumn.prototype._width;
        /**
         * @type {?}
         * @private
         */
        PblMetaColumn.prototype._parsedWidth;
        /**
         * @type {?}
         * @private
         */
        PblMetaColumn.prototype._columnDef;
        /**
         * @type {?}
         * @private
         */
        PblMetaColumn.prototype.defaultWidth;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PBL_NGRID_COLUMN_GROUP_MARK = Symbol('PblColumnGroup');
    /** @type {?} */
    var CLONE_PROPERTIES$1 = [];
    /**
     * @param {?} def
     * @return {?}
     */
    function isPblColumnGroup(def) {
        return def instanceof PblColumnGroup || def[PBL_NGRID_COLUMN_GROUP_MARK] === true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    function getId(value) {
        return typeof value === 'string' ? value : value.id;
    }
    var PblColumnGroupStore = /** @class */ (function () {
        function PblColumnGroupStore() {
            this.store = new Map();
            this._all = [];
        }
        Object.defineProperty(PblColumnGroupStore.prototype, "all", {
            get: /**
             * @return {?}
             */
            function () { return this._all; },
            enumerable: true,
            configurable: true
        });
        /**
         * Attach a column to a group.
         */
        /**
         * Attach a column to a group.
         * @param {?} group
         * @param {?} column
         * @return {?}
         */
        PblColumnGroupStore.prototype.attach = /**
         * Attach a column to a group.
         * @param {?} group
         * @param {?} column
         * @return {?}
         */
        function (group, column) {
            /** @type {?} */
            var g = this._find(group);
            if (g) {
                g.activeColumns.add(getId(column));
                return true;
            }
            return false;
        };
        /**
         * Detach a column from a group.
         */
        /**
         * Detach a column from a group.
         * @param {?} group
         * @param {?} column
         * @return {?}
         */
        PblColumnGroupStore.prototype.detach = /**
         * Detach a column from a group.
         * @param {?} group
         * @param {?} column
         * @return {?}
         */
        function (group, column) {
            /** @type {?} */
            var g = this._find(group);
            if (g) {
                return g.activeColumns.delete(getId(column));
            }
            return false;
        };
        /**
         * Returns a list of `PblColumnGroup` that does not have columns attached.
         */
        /**
         * Returns a list of `PblColumnGroup` that does not have columns attached.
         * @return {?}
         */
        PblColumnGroupStore.prototype.findGhosts = /**
         * Returns a list of `PblColumnGroup` that does not have columns attached.
         * @return {?}
         */
        function () {
            return Array.from(this.store.values())
                .filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.activeColumns.size === 0; }))
                .map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.group; }));
        };
        /**
         * @param {?} group
         * @return {?}
         */
        PblColumnGroupStore.prototype.add = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            this.store.set(group.id, { group: group, activeColumns: new Set() });
            this.updateAll();
        };
        /**
         * @param {?} group
         * @return {?}
         */
        PblColumnGroupStore.prototype.remove = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            /** @type {?} */
            var g = this.find(group);
            if (g && this.store.delete(g.id)) {
                this.updateAll();
                return true;
            }
            return false;
        };
        /**
         * @param {?} group
         * @return {?}
         */
        PblColumnGroupStore.prototype.find = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            /** @type {?} */
            var g = this._find(group);
            if (g) {
                return g.group;
            }
        };
        /**
         * @return {?}
         */
        PblColumnGroupStore.prototype.clone = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var c = new PblColumnGroupStore();
            c.store = new Map(this.store);
            c.updateAll();
            return c;
        };
        /**
         * @private
         * @param {?} group
         * @return {?}
         */
        PblColumnGroupStore.prototype._find = /**
         * @private
         * @param {?} group
         * @return {?}
         */
        function (group) {
            return this.store.get(getId(group));
        };
        /**
         * @private
         * @return {?}
         */
        PblColumnGroupStore.prototype.updateAll = /**
         * @private
         * @return {?}
         */
        function () {
            this._all = Array.from(this.store.values()).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.group; }));
        };
        return PblColumnGroupStore;
    }());
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
    var PblColumnGroup = /** @class */ (function (_super) {
        __extends(PblColumnGroup, _super);
        function PblColumnGroup(def, columns, placeholder) {
            var e_1, _a, e_2, _b;
            if (placeholder === void 0) { placeholder = false; }
            var _this = _super.call(this, isPblColumnGroup(def)
                ? def
                : __assign({ id: "group-" + def.prop + "-span-" + def.span + "-row-" + def.rowIndex, kind: (/** @type {?} */ ('header')) }, ((/** @type {?} */ (def))))) || this;
            _this.placeholder = placeholder;
            _this[PBL_NGRID_COLUMN_GROUP_MARK] = true;
            _this.prop = def.prop;
            _this.span = def.span;
            _this.columns = columns;
            try {
                for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                    var c = columns_1_1.value;
                    c.markInGroup(_this);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES$1), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
                    var prop = CLONE_PROPERTIES_1_1.value;
                    if (prop in def) {
                        _this[(/** @type {?} */ (prop))] = def[prop];
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
            return _this;
        }
        Object.defineProperty(PblColumnGroup.prototype, "isVisible", {
            //#endregion PblColumnGroupDefinition
            /**
             * Returns the visible state of the column.
             * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
             */
            get: 
            //#endregion PblColumnGroupDefinition
            /**
             * Returns the visible state of the column.
             * The column is visible if AT LEAST ONE child column is visible (i.e. not hidden)
             * @return {?}
             */
            function () {
                return this.columns.some((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return !c.hidden; }));
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} name
         * @return {?}
         */
        PblColumnGroup.extendProperty = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            if (CLONE_PROPERTIES$1.indexOf(name) === -1) {
                CLONE_PROPERTIES$1.push(name);
            }
        };
        /**
         * @param {?=} columns
         * @return {?}
         */
        PblColumnGroup.prototype.createSlave = /**
         * @param {?=} columns
         * @return {?}
         */
        function (columns) {
            if (columns === void 0) { columns = []; }
            /** @type {?} */
            var slave = new PblColumnGroup(this, columns);
            slave.id += '-slave' + Date.now();
            slave.slaveOf = this;
            slave.template = this.template;
            return slave;
        };
        /**
         * @param {?} newColumn
         * @return {?}
         */
        PblColumnGroup.prototype.replace = /**
         * @param {?} newColumn
         * @return {?}
         */
        function (newColumn) {
            var id = newColumn.id;
            /** @type {?} */
            var idx = this.columns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id === id; }));
            if (idx > -1) {
                this.columns.splice(idx, 1, newColumn);
                return true;
            }
            return false;
        };
        return PblColumnGroup;
    }(PblMetaColumn));
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PBL_NGRID_COLUMN_MARK = Symbol('PblColumn');
    /** @type {?} */
    var CLONE_PROPERTIES$2 = ['pIndex', 'transform', 'filter', 'sort', 'alias', 'headerType', 'footerType', 'pin'];
    /**
     * @param {?} def
     * @return {?}
     */
    function isPblColumn(def) {
        return def instanceof PblColumn || def[PBL_NGRID_COLUMN_MARK] === true;
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
                    for (var _c = __values(Array.from(def._groups.values())), _d = _c.next(); !_d.done; _d = _c.next()) {
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
                for (var CLONE_PROPERTIES_1 = __values(CLONE_PROPERTIES$2), CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next(); !CLONE_PROPERTIES_1_1.done; CLONE_PROPERTIES_1_1 = CLONE_PROPERTIES_1.next()) {
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
            if (CLONE_PROPERTIES$2.indexOf(name) === -1) {
                CLONE_PROPERTIES$2.push(name);
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
                this.columnDef.updateWidth(this.width || this.defaultWidth);
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
         * @param {?} markForCheck
         * @param {?=} width
         * @return {?}
         */
        PblColumn.prototype.updateWidth = /**
         * @param {?} markForCheck
         * @param {?=} width
         * @return {?}
         */
        function (markForCheck, width) {
            if (width) {
                this.width = width;
            }
            var columnDef = this.columnDef;
            if (columnDef) {
                columnDef.updateWidth(this.width || this.defaultWidth || '');
                if (markForCheck) {
                    columnDef.markForCheck();
                }
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
                for (var groupIds_1 = __values(groupIds), groupIds_1_1 = groupIds_1.next(); !groupIds_1_1.done; groupIds_1_1 = groupIds_1.next()) {
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
            var _a = __read(columnGroups, 3), gPrev = _a[0], gCurr = _a[1], gNext = _a[2];
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
                function (d) { return new PblColumn(__assign({}, _defaults.table, d), groupStore); })),
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
                function (c) { return new PblMetaColumn(__assign({}, _defaults.header, c)); })),
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
                function (c) { return new PblMetaColumn(__assign({}, _defaults.footer, c)); }))
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
            // The end goal is to return a list of `PblColumnGroup` that span over the entire columns of the table.
            //
            // The logic is as follows:
            // For each column in the table, find a matching column group - a group pointing at the column by having the same `prop`
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
    function columnFactory() {
        return new PblColumnFactory();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A column width object representing the relative column using a combination of percentage and pixels.
     *
     * The percentage represent the total width of the column
     * The pixels represent the total fixed width, in pixels, that other columns occupy (these are columns with absolute width set).
     *
     * In a DOM element, the `ColumnWidth` object is represented via the `width` style property
     * and the value is set using the `calc()` CSS function: `width: calc({pct}% - {px}px);`.
     *
     * For example, the `ColumnWidth` object  `{ pct: 33, px: 25 }` is translated to `width: calc(33% - 25px);`
     *
     * \@internal
     * @record
     */
    function ColumnWidth() { }
    if (false) {
        /** @type {?} */
        ColumnWidth.prototype.pct;
        /** @type {?} */
        ColumnWidth.prototype.px;
    }
    /**
     * A column width calculator that, based on all of the columns, calculates the default column width
     * and minimum required row width.
     *
     * The default column width is the width for all columns that does not have a width setting defined.
     * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
     *
     * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
     * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
     *
     * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
     * This is why it outputs a default column width and not a column specific width.
     */
    var /**
     * A column width calculator that, based on all of the columns, calculates the default column width
     * and minimum required row width.
     *
     * The default column width is the width for all columns that does not have a width setting defined.
     * In addition, a `minimumRowWidth` is calculated, which represents the minimum width required width of the row, i.e. table.
     *
     * The `StaticColumnWidthLogic` does not take into account real-time DOM measurements (especially box-model metadata), hence "static".
     * It performs the calculation based on "dry" `PblColumn` metadata input from the user.
     *
     * The `StaticColumnWidthLogic` is less accurate and best used as a measurement baseline followed by a more accurate calculation.
     * This is why it outputs a default column width and not a column specific width.
     */
    StaticColumnWidthLogic = /** @class */ (function () {
        function StaticColumnWidthLogic() {
            this._agg = {
                pct: 0,
                // total agg fixed %
                px: 0,
                // total agg fixed px
                minRowWidth: 0,
                // total agg of min width
                pctCount: 0,
                // total columns with fixed %
                pxCount: 0,
                // total columns with fixed px
                count: 0 // total columns without a fixed value
            };
        }
        Object.defineProperty(StaticColumnWidthLogic.prototype, "minimumRowWidth", {
            get: /**
             * @return {?}
             */
            function () { return this._agg.minRowWidth; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StaticColumnWidthLogic.prototype, "defaultColumnWidth", {
            /**
             * Returns the calculated default width for a column.
             * This is the width for columns that does not have a specific width, adjusting them to fit the table.
             * It's important to run this method AFTER aggregating all columns through `addColumn()`.
             * The result contains 2 values, pct and px.
             * pct is the total width in percent that the column should spread taking into account columns with fixed % width.
             * px is the total width in pixels that the column should shrink taking into account columns with fixed pixel width.
             *
             * The algorithm is simple:
             *  1) Sum all columns with fixed percent width
             *  2) From the entire row width (100%) deduct the total fixed width (step 1).
             *     This result represents the % left for all columns without a fixed width (percent and pixel).
             *  3) Sum all columns with fixed pixel width.
             *     The result represent the total amount of width in pixel taken by columns with fixed width.
             *  4) Count all the columns without a fixed width.
             *
             *  For 2 & 3 we get values that we need to spread even between all of the columns without fixed width (percent and pixel).
             *  The exact width is the total percent left (2) minus the total width in pixel taken by columns with fixed with.
             *  We now need to divide the result from 2 & 3 by the result from 4.
             *
             * Both values should be used together on the `width` style property using the `calc` function:
             * e.g.: `calc(${pct}% - ${px}px)`
             *
             * This value is calculated every time it is called, use it once all columns are added.
             */
            get: /**
             * Returns the calculated default width for a column.
             * This is the width for columns that does not have a specific width, adjusting them to fit the table.
             * It's important to run this method AFTER aggregating all columns through `addColumn()`.
             * The result contains 2 values, pct and px.
             * pct is the total width in percent that the column should spread taking into account columns with fixed % width.
             * px is the total width in pixels that the column should shrink taking into account columns with fixed pixel width.
             *
             * The algorithm is simple:
             *  1) Sum all columns with fixed percent width
             *  2) From the entire row width (100%) deduct the total fixed width (step 1).
             *     This result represents the % left for all columns without a fixed width (percent and pixel).
             *  3) Sum all columns with fixed pixel width.
             *     The result represent the total amount of width in pixel taken by columns with fixed width.
             *  4) Count all the columns without a fixed width.
             *
             *  For 2 & 3 we get values that we need to spread even between all of the columns without fixed width (percent and pixel).
             *  The exact width is the total percent left (2) minus the total width in pixel taken by columns with fixed with.
             *  We now need to divide the result from 2 & 3 by the result from 4.
             *
             * Both values should be used together on the `width` style property using the `calc` function:
             * e.g.: `calc(${pct}% - ${px}px)`
             *
             * This value is calculated every time it is called, use it once all columns are added.
             * @return {?}
             */
            function () {
                /** @type {?} */
                var agg = this._agg;
                /** @type {?} */
                var pct = (100 - agg.pct) / agg.count;
                /** @type {?} */
                var px = agg.px / agg.count;
                return { pct: pct, px: px };
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} column
         * @return {?}
         */
        StaticColumnWidthLogic.prototype.addColumn = /**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var agg = this._agg;
            /** @type {?} */
            var width = column.parsedWidth;
            /** @type {?} */
            var minWidth = column.minWidth || 0;
            if (width) {
                switch (width.type) {
                    case '%':
                        agg.pctCount += 1;
                        agg.pct += width.value;
                        break;
                    case 'px':
                        agg.pxCount += 1;
                        agg.px += width.value;
                        minWidth = width.value;
                        break;
                    default:
                        throw new Error("Invalid width \"" + column.width + "\" in column " + column.prop + ". Valid values are ##% or ##px (50% / 50px)");
                }
            }
            else if (column.maxWidthLock) {
                agg.pxCount += 1;
                agg.px += column.maxWidth;
            }
            else {
                agg.count += 1;
            }
            agg.minRowWidth += minWidth;
        };
        return StaticColumnWidthLogic;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        StaticColumnWidthLogic.prototype._agg;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PblMetaColumnStore() { }
    if (false) {
        /** @type {?} */
        PblMetaColumnStore.prototype.id;
        /** @type {?|undefined} */
        PblMetaColumnStore.prototype.header;
        /** @type {?|undefined} */
        PblMetaColumnStore.prototype.footer;
        /** @type {?|undefined} */
        PblMetaColumnStore.prototype.headerGroup;
        /** @type {?|undefined} */
        PblMetaColumnStore.prototype.footerGroup;
    }
    /**
     * @record
     */
    function PblColumnStoreMetaRow() { }
    if (false) {
        /** @type {?} */
        PblColumnStoreMetaRow.prototype.rowDef;
        /** @type {?} */
        PblColumnStoreMetaRow.prototype.keys;
        /** @type {?|undefined} */
        PblColumnStoreMetaRow.prototype.isGroup;
    }
    var PblColumnStore = /** @class */ (function () {
        function PblColumnStore() {
            this._groupBy = [];
            this.byId = new Map();
            this.resetIds();
            this.resetColumns();
        }
        Object.defineProperty(PblColumnStore.prototype, "primary", {
            get: /**
             * @return {?}
             */
            function () { return this._primary; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblColumnStore.prototype, "hidden", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._hidden = value;
                this.setHidden();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblColumnStore.prototype, "groupBy", {
            get: /**
             * @return {?}
             */
            function () { return this._groupBy; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblColumnStore.prototype, "groupStore", {
            get: /**
             * @return {?}
             */
            function () { return this._groupStore; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {...?} column
         * @return {?}
         */
        PblColumnStore.prototype.addGroupBy = /**
         * @param {...?} column
         * @return {?}
         */
        function () {
            var _a;
            var column = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                column[_i] = arguments[_i];
            }
            (_a = this.groupBy).push.apply(_a, __spread(column));
            this.setHidden();
        };
        /**
         * @param {...?} column
         * @return {?}
         */
        PblColumnStore.prototype.removeGroupBy = /**
         * @param {...?} column
         * @return {?}
         */
        function () {
            var e_1, _a;
            var column = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                column[_i] = arguments[_i];
            }
            var _loop_1 = function (c) {
                /** @type {?} */
                var idx = this_1.groupBy.findIndex((/**
                 * @param {?} gbc
                 * @return {?}
                 */
                function (gbc) { return gbc.id === c.id; }));
                if (idx > -1) {
                    this_1.groupBy.splice(idx, 1);
                }
            };
            var this_1 = this;
            try {
                for (var column_1 = __values(column), column_1_1 = column_1.next(); !column_1_1.done; column_1_1 = column_1.next()) {
                    var c = column_1_1.value;
                    _loop_1(c);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (column_1_1 && !column_1_1.done && (_a = column_1.return)) _a.call(column_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.setHidden();
        };
        /**
         * Move the provided `column` to the position of the `anchor` column.
         * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
         * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
         */
        /**
         * Move the provided `column` to the position of the `anchor` column.
         * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
         * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
         * @param {?} column
         * @param {?} anchor
         * @return {?}
         */
        PblColumnStore.prototype.moveColumn = /**
         * Move the provided `column` to the position of the `anchor` column.
         * The new location of the anchor column will be it's original location plus or minus 1, depending on the delta between
         * the columns. If the origin of the `column` is before the `anchor` then the anchor's new position is minus one, otherwise plus 1.
         * @param {?} column
         * @param {?} anchor
         * @return {?}
         */
        function (column, anchor) {
            var _a = this, columns = _a.columns, columnIds = _a.columnIds, allColumns = _a.allColumns;
            /** @type {?} */
            var anchorIndex = columns.indexOf(anchor);
            /** @type {?} */
            var columnIndex = columns.indexOf(column);
            if (anchorIndex > -1 && columnIndex > -1) {
                moveItemInArray(columnIds, columnIndex, anchorIndex);
                moveItemInArray(columns, columnIndex, anchorIndex);
                if (this._allHidden && this._allHidden.length > 0) {
                    anchorIndex = allColumns.indexOf(anchor);
                    columnIndex = allColumns.indexOf(column);
                }
                moveItemInArray(allColumns, columnIndex, anchorIndex);
                return true;
            }
        };
        /**
         * @param {?} col1
         * @param {?} col2
         * @return {?}
         */
        PblColumnStore.prototype.swapColumns = /**
         * @param {?} col1
         * @param {?} col2
         * @return {?}
         */
        function (col1, col2) {
            /** @type {?} */
            var col1Index = this.columns.indexOf(col1);
            /** @type {?} */
            var col2Index = this.columns.indexOf(col2);
            if (col1Index > -1 && col2Index > -1) {
                var _a = this, columns = _a.columns, columnIds = _a.columnIds, allColumns = _a.allColumns;
                columns[col1Index] = col2;
                columns[col2Index] = col1;
                columnIds[col1Index] = col2.id;
                columnIds[col2Index] = col1.id;
                if (this._allHidden && this._allHidden.length > 0) {
                    col1Index = allColumns.indexOf(col1);
                    col2Index = allColumns.indexOf(col2);
                }
                allColumns[col1Index] = col2;
                allColumns[col2Index] = col1;
                return true;
            }
            return false;
        };
        /**
         * @param {?} id
         * @return {?}
         */
        PblColumnStore.prototype.find = /**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            return this.byId.get(id);
        };
        /**
         * @return {?}
         */
        PblColumnStore.prototype.getAllHeaderGroup = /**
         * @return {?}
         */
        function () {
            return this._groupStore ? this._groupStore.all : [];
        };
        /**
         * @return {?}
         */
        PblColumnStore.prototype.getStaticWidth = /**
         * @return {?}
         */
        function () {
            var e_2, _a;
            /** @type {?} */
            var rowWidth = new StaticColumnWidthLogic();
            try {
                for (var _b = __values(this.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var column = _c.value;
                    rowWidth.addColumn(column);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return rowWidth;
        };
        /**
         * @param {?} columnOrDefinitionSet
         * @return {?}
         */
        PblColumnStore.prototype.invalidate = /**
         * @param {?} columnOrDefinitionSet
         * @return {?}
         */
        function (columnOrDefinitionSet) {
            var e_3, _a, e_4, _b, e_5, _c, e_6, _d, e_7, _e, e_8, _f;
            /** @type {?} */
            var columnSet = this.lastSet = 'groupStore' in columnOrDefinitionSet
                ? columnOrDefinitionSet
                : PblColumnFactory.fromDefinitionSet(columnOrDefinitionSet).build();
            var groupStore = columnSet.groupStore, table = columnSet.table, header = columnSet.header, footer = columnSet.footer, headerGroup = columnSet.headerGroup;
            this._groupStore = groupStore.clone();
            /** @type {?} */
            var rowWidth = new StaticColumnWidthLogic();
            this.resetColumns();
            this.resetIds();
            /** @type {?} */
            var hidden = this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id; })));
            this.headerColumnDef = {
                rowClassName: (table.header && table.header.rowClassName) || '',
                type: (table.header && table.header.type) || 'fixed',
            };
            this.footerColumnDef = {
                rowClassName: (table.footer && table.footer.rowClassName) || '',
                type: (table.footer && table.footer.type) || 'fixed',
            };
            this._primary = undefined;
            try {
                for (var _g = __values(table.cols), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var def = _h.value;
                    /** @type {?} */
                    var column = void 0;
                    column = new PblColumn(def, this.groupStore);
                    /** @type {?} */
                    var columnRecord = this.getColumnRecord(column.id);
                    columnRecord.data = column;
                    this.allColumns.push(column);
                    column.hidden = hidden.indexOf(column.id) > -1;
                    if (!column.hidden) {
                        this.columns.push(column);
                        this.columnIds.push(column.id);
                        rowWidth.addColumn(column);
                    }
                    if (column.pIndex) {
                        if (this._primary && core.isDevMode()) {
                            console.warn("Multiple primary index columns defined: previous: \"" + this._primary.id + "\", current: \"" + column.id + "\"");
                        }
                        this._primary = column;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_a = _g.return)) _a.call(_g);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                for (var header_1 = __values(header), header_1_1 = header_1.next(); !header_1_1.done; header_1_1 = header_1.next()) {
                    var rowDef = header_1_1.value;
                    /** @type {?} */
                    var keys = [];
                    try {
                        for (var _j = __values(rowDef.cols), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var def = _k.value;
                            /** @type {?} */
                            var metaCol = this.getColumnRecord(def.id, this.metaColumns);
                            /** @type {?} */
                            var column = metaCol.header || (metaCol.header = new PblMetaColumn(def));
                            keys.push(column.id);
                        }
                    }
                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_5) throw e_5.error; }
                    }
                    this._metaRows.header[rowDef.rowIndex] = { rowDef: rowDef, keys: keys };
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (header_1_1 && !header_1_1.done && (_b = header_1.return)) _b.call(header_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            try {
                for (var headerGroup_1 = __values(headerGroup), headerGroup_1_1 = headerGroup_1.next(); !headerGroup_1_1.done; headerGroup_1_1 = headerGroup_1.next()) {
                    var rowDef = headerGroup_1_1.value;
                    this._updateGroup(rowDef);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (headerGroup_1_1 && !headerGroup_1_1.done && (_d = headerGroup_1.return)) _d.call(headerGroup_1);
                }
                finally { if (e_6) throw e_6.error; }
            }
            try {
                for (var footer_1 = __values(footer), footer_1_1 = footer_1.next(); !footer_1_1.done; footer_1_1 = footer_1.next()) {
                    var rowDef = footer_1_1.value;
                    /** @type {?} */
                    var keys = [];
                    try {
                        for (var _l = __values(rowDef.cols), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var def = _m.value;
                            /** @type {?} */
                            var metaCol = this.getColumnRecord(def.id, this.metaColumns);
                            /** @type {?} */
                            var column = metaCol.footer || (metaCol.footer = new PblMetaColumn(def));
                            keys.push(column.id);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_f = _l.return)) _f.call(_l);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    this._metaRows.footer.push({ rowDef: rowDef, keys: keys });
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (footer_1_1 && !footer_1_1.done && (_e = footer_1.return)) _e.call(footer_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            resetColumnWidths(rowWidth, this.columns, this.metaColumns);
        };
        /**
         * @param {...?} rowIndex
         * @return {?}
         */
        PblColumnStore.prototype.updateGroups = /**
         * @param {...?} rowIndex
         * @return {?}
         */
        function () {
            var e_9, _a, e_10, _b;
            var rowIndex = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                rowIndex[_i] = arguments[_i];
            }
            if (rowIndex.length === 0) {
                try {
                    for (var _c = __values(this.lastSet.headerGroup), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var rowDef = _d.value;
                        this._updateGroup(rowDef);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
            else {
                /** @type {?} */
                var rows = rowIndex.slice();
                try {
                    for (var _e = __values(this.lastSet.headerGroup), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var rowDef = _f.value;
                        /** @type {?} */
                        var idx = rows.indexOf(rowDef.rowIndex);
                        if (idx > -1) {
                            rows.splice(idx, 1);
                            this._updateGroup(rowDef);
                            if (rows.length === 0) {
                                return;
                            }
                        }
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        };
        /**
         * @private
         * @param {?} columnSet
         * @return {?}
         */
        PblColumnStore.prototype._updateGroup = /**
         * @private
         * @param {?} columnSet
         * @return {?}
         */
        function (columnSet) {
            var e_11, _a;
            /** @type {?} */
            var keys = [];
            /** @type {?} */
            var allKeys = [];
            /** @type {?} */
            var groups = [];
            for (var tIndex = 0; tIndex < this.columns.length; tIndex++) {
                /** @type {?} */
                var columns = [this.columns[tIndex - 1], this.columns[tIndex], this.columns[tIndex + 1]];
                /** @type {?} */
                var columnGroups = columns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c ? c.getGroupOfRow(columnSet.rowIndex) : undefined; }));
                // true when the group exists in one of the columns BUT NOT in the LAST COLUMN (i.e: Its a slave split)
                /** @type {?} */
                var groupExists = groups.lastIndexOf(columnGroups[1]) !== -1;
                /** @type {?} */
                var column = columns[1];
                /** @type {?} */
                var gColumn = column.groupLogic((/** @type {?} */ (columnGroups)), groupExists);
                if (gColumn !== columnGroups[1]) {
                    column.markNotInGroup(columnGroups[1]);
                    column.markInGroup(gColumn);
                }
                /** @type {?} */
                var metaCol = this.getColumnRecord(gColumn.id, this.metaColumns);
                if (!metaCol.headerGroup) {
                    metaCol.headerGroup = gColumn;
                }
                if (groups.lastIndexOf(gColumn) === -1) {
                    allKeys.push(gColumn.id);
                    if (gColumn.isVisible) {
                        keys.push(gColumn.id);
                    }
                }
                gColumn.replace(column);
                groups.push(gColumn);
            }
            var _loop_2 = function (ghost) {
                if (ghost.rowIndex === columnSet.rowIndex) {
                    var id_1 = ghost.id;
                    /** @type {?} */
                    var idx = allKeys.indexOf(id_1);
                    if (idx !== -1) {
                        allKeys.splice(idx, 1);
                        idx = keys.indexOf(id_1);
                        if (idx !== -1) {
                            keys.splice(idx, 1);
                        }
                        this_2.metaColumns.splice(this_2.metaColumns.findIndex((/**
                         * @param {?} m
                         * @return {?}
                         */
                        function (m) { return m.id === id_1; })), 1);
                    }
                    this_2._groupStore.remove(ghost);
                }
            };
            var this_2 = this;
            try {
                for (var _b = __values(this._groupStore.findGhosts()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var ghost = _c.value;
                    _loop_2(ghost);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_11) throw e_11.error; }
            }
            this.updateMetaRow('header', columnSet.rowIndex, { rowDef: columnSet, keys: keys, allKeys: allKeys, isGroup: true });
        };
        /**
         * @private
         * @template P
         * @param {?} type
         * @param {?} rowIndex
         * @param {?} value
         * @return {?}
         */
        PblColumnStore.prototype.updateMetaRow = /**
         * @private
         * @template P
         * @param {?} type
         * @param {?} rowIndex
         * @param {?} value
         * @return {?}
         */
        function (type, rowIndex, value) {
            /** @type {?} */
            var curr = this._metaRows[type][rowIndex] || {};
            this._metaRows[type][rowIndex] = Object.assign(curr, value);
        };
        /**
         * @private
         * @template T
         * @param {?} id
         * @param {?=} collection
         * @return {?}
         */
        PblColumnStore.prototype.getColumnRecord = /**
         * @private
         * @template T
         * @param {?} id
         * @param {?=} collection
         * @return {?}
         */
        function (id, collection) {
            /** @type {?} */
            var columnRecord = this.byId.get(id);
            if (!columnRecord) {
                this.byId.set(id, columnRecord = { id: id });
                if (collection) {
                    collection.push((/** @type {?} */ (columnRecord)));
                }
            }
            return (/** @type {?} */ (columnRecord));
        };
        /**
         * @private
         * @return {?}
         */
        PblColumnStore.prototype.setHidden = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            var e_12, _a, e_13, _b;
            this._allHidden = (this._hidden || []).concat(this._groupBy.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.id; })));
            this.columnIds = [];
            this.columns = [];
            try {
                for (var _c = __values(this.allColumns), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var c = _d.value;
                    c.hidden = this._allHidden.indexOf(c.id) > -1;
                    if (!c.hidden) {
                        this.columns.push(c);
                        this.columnIds.push(c.id);
                    }
                }
            }
            catch (e_12_1) { e_12 = { error: e_12_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_12) throw e_12.error; }
            }
            try {
                for (var _e = __values(this._metaRows.header), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var h = _f.value;
                    if (h.isGroup) {
                        h.keys = h.allKeys.filter((/**
                         * @param {?} key
                         * @return {?}
                         */
                        function (key) { return _this.find(key).headerGroup.isVisible; }));
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_13) throw e_13.error; }
            }
            resetColumnWidths(this.getStaticWidth(), this.columns, this.metaColumns);
        };
        /**
         * @private
         * @return {?}
         */
        PblColumnStore.prototype.resetColumns = /**
         * @private
         * @return {?}
         */
        function () {
            this.allColumns = [];
            this.columns = [];
            this.metaColumns = [];
            this.byId.clear();
        };
        /**
         * @private
         * @return {?}
         */
        PblColumnStore.prototype.resetIds = /**
         * @private
         * @return {?}
         */
        function () {
            this.columnIds = [];
            this._metaRows = this.metaColumnIds = { header: [], footer: [] };
        };
        return PblColumnStore;
    }());
    if (false) {
        /** @type {?} */
        PblColumnStore.prototype.metaColumnIds;
        /** @type {?} */
        PblColumnStore.prototype.metaColumns;
        /** @type {?} */
        PblColumnStore.prototype.columnIds;
        /** @type {?} */
        PblColumnStore.prototype.columns;
        /** @type {?} */
        PblColumnStore.prototype.allColumns;
        /** @type {?} */
        PblColumnStore.prototype.headerColumnDef;
        /** @type {?} */
        PblColumnStore.prototype.footerColumnDef;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype._primary;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype._metaRows;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype._hidden;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype._allHidden;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype._groupBy;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype.byId;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype._groupStore;
        /**
         * @type {?}
         * @private
         */
        PblColumnStore.prototype.lastSet;
    }
    /**
     * Moves an item one index in an array to another.
     * @template T
     * @param {?} array Array in which to move the item.
     * @param {?} fromIndex Starting index of the item.
     * @param {?} toIndex Index to which the item should be moved.
     * @return {?}
     */
    function moveItemInArray(array, fromIndex, toIndex) {
        /** @type {?} */
        var from = clamp(fromIndex, array.length - 1);
        /** @type {?} */
        var to = clamp(toIndex, array.length - 1);
        if (from === to) {
            return;
        }
        /** @type {?} */
        var target = array[from];
        /** @type {?} */
        var delta = to < from ? -1 : 1;
        for (var i = from; i !== to; i += delta) {
            array[i] = array[i + delta];
        }
        array[to] = target;
    }
    /**
     * Clamps a number between zero and a maximum.
     * @param {?} value
     * @param {?} max
     * @return {?}
     */
    function clamp(value, max) {
        return Math.max(0, Math.min(max, value));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ColumnSizeInfo = /** @class */ (function () {
        function ColumnSizeInfo(target) {
            this.target = target;
        }
        Object.defineProperty(ColumnSizeInfo.prototype, "column", {
            get: /**
             * @return {?}
             */
            function () { return this._column; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.attachColumn(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} column
         * @return {?}
         */
        ColumnSizeInfo.prototype.attachColumn = /**
         * @param {?} column
         * @return {?}
         */
        function (column) {
            this.detachColumn();
            if (column) {
                column.sizeInfo = this;
            }
            this._column = column;
        };
        /**
         * @return {?}
         */
        ColumnSizeInfo.prototype.detachColumn = /**
         * @return {?}
         */
        function () {
            if (this._column) {
                this._column.sizeInfo = undefined;
                this._column = undefined;
            }
        };
        /**
         * @return {?}
         */
        ColumnSizeInfo.prototype.updateSize = /**
         * @return {?}
         */
        function () {
            if (this.column && !this.column.columnDef.isDragging) {
                /** @type {?} */
                var el = this.target;
                /** @type {?} */
                var rect = el.getBoundingClientRect();
                this.width = rect.width;
                this.height = rect.height;
                this.style = getComputedStyle(el);
                this.column.columnDef.onResize();
            }
        };
        return ColumnSizeInfo;
    }());
    if (false) {
        /**
         * The height of the column (subpixel resolution)
         * @type {?}
         */
        ColumnSizeInfo.prototype.height;
        /**
         * The width of the column (subpixel resolution)
         * Note that this is the not the content width.
         * @type {?}
         */
        ColumnSizeInfo.prototype.width;
        /**
         * The computed style for this cell.
         * @type {?}
         */
        ColumnSizeInfo.prototype.style;
        /**
         * @type {?}
         * @protected
         */
        ColumnSizeInfo.prototype._column;
        /** @type {?} */
        ColumnSizeInfo.prototype.target;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function RegistryChangedEvent() { }
    if (false) {
        /** @type {?} */
        RegistryChangedEvent.prototype.op;
        /** @type {?} */
        RegistryChangedEvent.prototype.type;
        /** @type {?} */
        RegistryChangedEvent.prototype.value;
    }
    /**
     * A map of valid single-item value that can be registered, and their type.
     * @record
     */
    function PblNgridSingleRegistryMap() { }
    if (false) {
        /** @type {?|undefined} */
        PblNgridSingleRegistryMap.prototype.noData;
        /** @type {?|undefined} */
        PblNgridSingleRegistryMap.prototype.paginator;
    }
    /**
     * A map of valid multi-item value that can be registered, and their type (the single type, i.e. T in Array<T>)
     * @record
     */
    function PblNgridMultiRegistryMap() { }
    if (false) {
        /** @type {?|undefined} */
        PblNgridMultiRegistryMap.prototype.headerCell;
        /** @type {?|undefined} */
        PblNgridMultiRegistryMap.prototype.tableCell;
        /** @type {?|undefined} */
        PblNgridMultiRegistryMap.prototype.editorCell;
        /** @type {?|undefined} */
        PblNgridMultiRegistryMap.prototype.footerCell;
        /** @type {?|undefined} */
        PblNgridMultiRegistryMap.prototype.dataHeaderExtensions;
    }
    /**
     * A Registry for templates of table parts.
     *
     * The registry is hierarchical, where each instance of a registry has a parent which allows cascading templates.
     * The hierarchy is manged by angular DI.
     *
     * > The root registry does not have a parent.
     *
     * Each instance of a registry (including root) is a hierarchy by itself, composed of 2 internal levels.
     * The first level (L1 below) is used for fixed templates, the second level (L2 below) is used for dynamic templates.
     *
     * - Root Registry
     *   - Child Registry
     *     - ChildOfChild Registry
     *
     * In the example above there are 3 registries: Root, Child and ChildOfChild.
     *
     * When searching for a template in `ChildOfChild` it will search in the following order (top to bottom):
     *   - ChildOfChild
     *   - Child
     *   - Root
     *
     * If a registry does not contain the template the search will move to the next one.
     */
    var PblNgridRegistryService = /** @class */ (function () {
        function PblNgridRegistryService(_parent) {
            this._parent = _parent;
            this._multi = {};
            this._multiDefaults = {};
            this._singles = {};
            this.changes$ = new rxjs.Subject();
            this.changes = this.changes$.asObservable();
            if (this._parent) {
                this._parent.changes.pipe(utils$1.UnRx(this)).subscribe(this.changes$);
                this.root = this._parent.root;
            }
            else {
                this.root = this;
            }
        }
        Object.defineProperty(PblNgridRegistryService.prototype, "parent", {
            get: /**
             * @return {?}
             */
            function () { return this._parent; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridRegistryService.prototype.getRoot = /**
         * @return {?}
         */
        function () { return this.root; };
        /**
         * Returns the registered value for the single `kind`.
         * If not found will try to search the parent.
         */
        /**
         * Returns the registered value for the single `kind`.
         * If not found will try to search the parent.
         * @template P
         * @param {?} kind
         * @return {?}
         */
        PblNgridRegistryService.prototype.getSingle = /**
         * Returns the registered value for the single `kind`.
         * If not found will try to search the parent.
         * @template P
         * @param {?} kind
         * @return {?}
         */
        function (kind) {
            return this._singles[kind] || (this._parent && this._parent.getSingle(kind));
        };
        /**
         * @template P
         * @param {?} kind
         * @param {?} value
         * @return {?}
         */
        PblNgridRegistryService.prototype.setSingle = /**
         * @template P
         * @param {?} kind
         * @param {?} value
         * @return {?}
         */
        function (kind, value) {
            /** @type {?} */
            var previous = this.getSingle(kind);
            if (value !== previous) {
                this._singles[kind] = value;
                this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value: value });
            }
        };
        /**
         * Returns the registered default value for the multi `kind`.
         * If not found will try to search the parent.
         */
        /**
         * Returns the registered default value for the multi `kind`.
         * If not found will try to search the parent.
         * @template P
         * @param {?} kind
         * @return {?}
         */
        PblNgridRegistryService.prototype.getMultiDefault = /**
         * Returns the registered default value for the multi `kind`.
         * If not found will try to search the parent.
         * @template P
         * @param {?} kind
         * @return {?}
         */
        function (kind) {
            return this._multiDefaults[kind] || (this._parent && this._parent.getMultiDefault(kind));
        };
        /**
         * @template P
         * @param {?} kind
         * @param {?} value
         * @return {?}
         */
        PblNgridRegistryService.prototype.setMultiDefault = /**
         * @template P
         * @param {?} kind
         * @param {?} value
         * @return {?}
         */
        function (kind, value) {
            /** @type {?} */
            var previous = this.getMultiDefault(kind);
            if (value !== previous) {
                this._multiDefaults[kind] = value;
                this.emitChanges({ op: value ? 'add' : 'remove', type: kind, value: value });
            }
        };
        /**
         * Returns the registered values for the multi `kind`.
         * If not found WILL NOT search the parent.
         */
        /**
         * Returns the registered values for the multi `kind`.
         * If not found WILL NOT search the parent.
         * @template T
         * @param {?} kind
         * @return {?}
         */
        PblNgridRegistryService.prototype.getMulti = /**
         * Returns the registered values for the multi `kind`.
         * If not found WILL NOT search the parent.
         * @template T
         * @param {?} kind
         * @return {?}
         */
        function (kind) {
            return (/** @type {?} */ (this._multi[kind]));
        };
        /**
         * @template T
         * @param {?} kind
         * @param {?} cellDef
         * @return {?}
         */
        PblNgridRegistryService.prototype.addMulti = /**
         * @template T
         * @param {?} kind
         * @param {?} cellDef
         * @return {?}
         */
        function (kind, cellDef) {
            /** @type {?} */
            var multi = this.getMulti(kind) || (this._multi[kind] = []);
            multi.push(cellDef);
            if (cellDef.name === '*') {
                this.setMultiDefault(kind, cellDef);
            }
            this.emitChanges({ op: 'add', type: kind, value: cellDef });
        };
        /**
         * @template T
         * @param {?} kind
         * @param {?} cellDef
         * @return {?}
         */
        PblNgridRegistryService.prototype.removeMulti = /**
         * @template T
         * @param {?} kind
         * @param {?} cellDef
         * @return {?}
         */
        function (kind, cellDef) {
            /** @type {?} */
            var multi = this.getMulti(kind);
            if (multi) {
                /** @type {?} */
                var idx = multi.indexOf(cellDef);
                if (idx > -1) {
                    multi.splice(idx, 1);
                }
                this.emitChanges({ op: 'remove', type: kind, value: cellDef });
            }
        };
        /**
         * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
         * the root parent.
         *
         * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
         * If the `kind` does not exist the handler is not called moving on to the next parent.
         *
         * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
         *
         * @returns The number of times that handler was invoked, i.e 0 means no matches.
         */
        /**
         * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
         * the root parent.
         *
         * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
         * If the `kind` does not exist the handler is not called moving on to the next parent.
         *
         * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
         *
         * @template T
         * @param {?} kind
         * @param {?} handler
         * @return {?} The number of times that handler was invoked, i.e 0 means no matches.
         */
        PblNgridRegistryService.prototype.forMulti = /**
         * Iterate over all multi-registry value of the provided `kind` ascending order, starting from the last ancestor (this registry) up to
         * the root parent.
         *
         * Each time a collection for the `kind` is found the handler is invoked and then repeating the process on the parent.
         * If the `kind` does not exist the handler is not called moving on to the next parent.
         *
         * To bail out (stop the process and don't iterate to the next parent), return true from the handler.
         *
         * @template T
         * @param {?} kind
         * @param {?} handler
         * @return {?} The number of times that handler was invoked, i.e 0 means no matches.
         */
        function (kind, handler) {
            /** @type {?} */
            var registry = this;
            /** @type {?} */
            var hasSome = 0;
            while (registry) {
                /** @type {?} */
                var values = registry.getMulti(kind);
                if (values) {
                    hasSome++;
                    if (handler(values) === true) {
                        return;
                    }
                }
                registry = registry.parent;
            }
            return hasSome;
        };
        /**
         * @return {?}
         */
        PblNgridRegistryService.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.changes$.complete();
        };
        /**
         * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
         * When `bufferEnd()` is called it will flush all changes.
         *
         * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
         * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
         */
        /**
         * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
         * When `bufferEnd()` is called it will flush all changes.
         *
         * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
         * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
         * @return {?}
         */
        PblNgridRegistryService.prototype.bufferStart = /**
         * Delay all notifications sent through `changes` and buffer then until next call to `bufferEnd()`.
         * When `bufferEnd()` is called it will flush all changes.
         *
         * > It's important to note that buffering does not freeze the registry, adding and removing templates will change the
         * registry and will effect queries. Buffering block the `changes` event stream and nothing more.
         * @return {?}
         */
        function () {
            if (!this.root.bufferedData) {
                this.root.bufferedData = [];
            }
        };
        /**
         * @return {?}
         */
        PblNgridRegistryService.prototype.bufferEnd = /**
         * @return {?}
         */
        function () {
            if (this.root.bufferedData) {
                /** @type {?} */
                var data = this.root.bufferedData;
                this.root.bufferedData = undefined;
                this.emitChanges(data);
            }
        };
        /**
         * @private
         * @param {?} events
         * @return {?}
         */
        PblNgridRegistryService.prototype.emitChanges = /**
         * @private
         * @param {?} events
         * @return {?}
         */
        function (events) {
            var _a;
            /** @type {?} */
            var e = Array.isArray(events) ? events : [events];
            if (this.root.bufferedData) {
                (_a = this.root.bufferedData).push.apply(_a, __spread(e));
            }
            else {
                this.changes$.next(e);
            }
        };
        PblNgridRegistryService.ctorParameters = function () { return [
            { type: PblNgridRegistryService }
        ]; };
        PblNgridRegistryService.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        PblNgridRegistryService.ctorParameters = function () { return [
            { type: PblNgridRegistryService, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] }
        ]; };
        /** @nocollapse */ PblNgridRegistryService.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PblNgridRegistryService_Factory() { return new PblNgridRegistryService(core.ɵɵinject(PblNgridRegistryService, 12)); }, token: PblNgridRegistryService, providedIn: "root" });
        /**
         * A Registry for templates of table parts.
         *
         * The registry is hierarchical, where each instance of a registry has a parent which allows cascading templates.
         * The hierarchy is manged by angular DI.
         *
         * > The root registry does not have a parent.
         *
         * Each instance of a registry (including root) is a hierarchy by itself, composed of 2 internal levels.
         * The first level (L1 below) is used for fixed templates, the second level (L2 below) is used for dynamic templates.
         *
         * - Root Registry
         *   - Child Registry
         *     - ChildOfChild Registry
         *
         * In the example above there are 3 registries: Root, Child and ChildOfChild.
         *
         * When searching for a template in `ChildOfChild` it will search in the following order (top to bottom):
         *   - ChildOfChild
         *   - Child
         *   - Root
         *
         * If a registry does not contain the template the search will move to the next one.
         */
        PblNgridRegistryService = __decorate([
            utils$1.UnRx(),
            __metadata("design:paramtypes", [PblNgridRegistryService])
        ], PblNgridRegistryService);
        return PblNgridRegistryService;
    }());
    if (false) {
        /** @type {?} */
        PblNgridRegistryService.prototype.changes;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRegistryService.prototype.root;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRegistryService.prototype._multi;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRegistryService.prototype._multiDefaults;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRegistryService.prototype._singles;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRegistryService.prototype.changes$;
        /**
         * @type {?}
         * @private
         */
        PblNgridRegistryService.prototype._parent;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PblNgridCellDefDirectiveBase() { }
    if (false) {
        /** @type {?} */
        PblNgridCellDefDirectiveBase.prototype.name;
        /** @type {?} */
        PblNgridCellDefDirectiveBase.prototype.type;
    }
    /**
     * @abstract
     * @template Z
     */
    var   /**
     * @abstract
     * @template Z
     */
    PblNgridBaseCellDef = /** @class */ (function () {
        function PblNgridBaseCellDef(tRef, registry) {
            this.tRef = tRef;
            this.registry = registry;
        }
        /**
         * @return {?}
         */
        PblNgridBaseCellDef.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            // TODO: listen to property changes (name) and re-register cell
            if (this instanceof PblNgridHeaderCellDefDirective) {
                this.registry.addMulti('headerCell', this);
            }
            else if (this instanceof PblNgridCellDefDirective) {
                this.registry.addMulti('tableCell', this);
            }
            else if (this instanceof PblNgridEditorCellDefDirective) {
                this.registry.addMulti('editorCell', this);
            }
            else if (this instanceof PblNgridFooterCellDefDirective) {
                this.registry.addMulti('footerCell', this);
            }
        };
        /**
         * @return {?}
         */
        PblNgridBaseCellDef.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this instanceof PblNgridHeaderCellDefDirective) {
                this.registry.removeMulti('headerCell', this);
            }
            else if (this instanceof PblNgridCellDefDirective) {
                this.registry.removeMulti('tableCell', this);
            }
            else if (this instanceof PblNgridEditorCellDefDirective) {
                this.registry.removeMulti('editorCell', this);
            }
            else if (this instanceof PblNgridFooterCellDefDirective) {
                this.registry.removeMulti('footerCell', this);
            }
        };
        return PblNgridBaseCellDef;
    }());
    if (false) {
        /** @type {?} */
        PblNgridBaseCellDef.prototype.name;
        /** @type {?} */
        PblNgridBaseCellDef.prototype.type;
        /** @type {?} */
        PblNgridBaseCellDef.prototype.tRef;
        /**
         * @type {?}
         * @protected
         */
        PblNgridBaseCellDef.prototype.registry;
    }
    /**
     * Header Cell definition for the pbl-ngrid.
     * Captures the template of a column's data row header cell as well as header cell-specific properties.
     *
     * `pblNgridHeaderCellDef` does the same thing that `matHeaderCellDef` and `cdkHeaderCellDef` do with one difference,
     * `pblNgridHeaderCellDef` is independent and does not require a column definition parent, instead it accept the ID of
     * the header cell.
     *
     * NOTE: Defining '*' as id will declare the header cell template as default, replacing the table's default header cell template.
     *
     * Make sure you set the proper id of the property you want to override.
     * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
     * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
     * the `prop` is used (full with dot notation).
     * @template T
     */
    var PblNgridHeaderCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridHeaderCellDefDirective, _super);
        function PblNgridHeaderCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridHeaderCellDefDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridHeaderCellDef], [pblNgridHeaderCellTypeDef]',
                        inputs: [
                            'name:pblNgridHeaderCellDef',
                            'type:pblNgridHeaderCellTypeDef',
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblNgridHeaderCellDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        return PblNgridHeaderCellDefDirective;
    }(PblNgridBaseCellDef));
    /**
     * Cell definition for the pbl-ngrid.
     * Captures the template of a column's data row cell as well as cell-specific properties.
     *
     * `pblNgridCellDef` does the same thing that `matCellDef` and `cdkCellDef` do with one difference, `pblNgridCellDef` is
     * independent and does not require a column definition parent, instead it accept the ID of the cell.
     *
     * NOTE: Defining '*' as id will declare the cell template as default, replacing the table's default cell template.
     *
     * Make sure you set the proper id of the property you want to override.
     * When the `id` is set explicitly in the table column definition, this is not a problem but when if it's not set
     * the table generates a unique id based on a logic. If `name` is set the name is used, if no name is set
     * the `prop` is used (full with dot notation).
     * @template T, P
     */
    var PblNgridCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellDefDirective, _super);
        function PblNgridCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridCellDefDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridCellDef], [pblNgridCellTypeDef]',
                        inputs: [
                            'name:pblNgridCellDef',
                            'type:pblNgridCellTypeDef',
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblNgridCellDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        return PblNgridCellDefDirective;
    }(PblNgridBaseCellDef));
    if (false) {
        /** @type {?} */
        PblNgridCellDefDirective.prototype.type;
    }
    /**
     * @template T, P
     */
    var PblNgridEditorCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridEditorCellDefDirective, _super);
        function PblNgridEditorCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridEditorCellDefDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridCellEditorDef], [pblNgridCellEditorTypeDef]',
                        inputs: [
                            'name:pblNgridCellEditorDef',
                            'type:pblNgridCellEditorTypeDef',
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblNgridEditorCellDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        return PblNgridEditorCellDefDirective;
    }(PblNgridBaseCellDef));
    if (false) {
        /** @type {?} */
        PblNgridEditorCellDefDirective.prototype.type;
    }
    /**
     * @template T
     */
    var PblNgridFooterCellDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridFooterCellDefDirective, _super);
        function PblNgridFooterCellDefDirective(tRef, registry) {
            return _super.call(this, tRef, registry) || this;
        }
        PblNgridFooterCellDefDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridFooterCellDef], [pblNgridFooterCellTypeDef]',
                        inputs: [
                            'name:pblNgridFooterCellDef',
                            'type:pblNgridFooterCellTypeDef',
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblNgridFooterCellDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        return PblNgridFooterCellDefDirective;
    }(PblNgridBaseCellDef));
    /**
     * @template T
     * @param {?} cellDefs
     * @param {?} colDef
     * @param {?=} searchParent
     * @return {?}
     */
    function findCellDefById(cellDefs, colDef, searchParent) {
        var e_1, _a;
        try {
            for (var cellDefs_1 = __values(cellDefs), cellDefs_1_1 = cellDefs_1.next(); !cellDefs_1_1.done; cellDefs_1_1 = cellDefs_1.next()) {
                var cellDef = cellDefs_1_1.value;
                if (cellDef.type) {
                    if (colDef.type && cellDef.type === colDef.type.name) {
                        return cellDef;
                    }
                }
                else {
                    /** @type {?} */
                    var id = cellDef.name;
                    if (id === colDef.id) {
                        return cellDef;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cellDefs_1_1 && !cellDefs_1_1.done && (_a = cellDefs_1.return)) _a.call(cellDefs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    /**
     * @template T
     * @param {?} registry
     * @param {?} colDef
     * @param {?} kind
     * @param {?=} searchParent
     * @return {?}
     */
    function findCellDef(registry, colDef, kind, searchParent) {
        /** @type {?} */
        var cellDefs = registry.getMulti(kind);
        if (cellDefs) {
            /** @type {?} */
            var type = void 0;
            if (colDef instanceof PblColumn) {
                switch (kind) {
                    case 'headerCell':
                        if (colDef.headerType) {
                            type = { id: colDef.id, type: colDef.headerType };
                        }
                        break;
                    case 'footerCell':
                        if (colDef.footerType) {
                            type = { id: colDef.id, type: colDef.footerType };
                        }
                        break;
                }
            }
            if (!type) {
                type = colDef;
            }
            /** @type {?} */
            var match = findCellDefById(cellDefs, type);
            if (match) {
                return match;
            }
        }
        if (searchParent && registry.parent) {
            return findCellDef(registry.parent, (/** @type {?} */ (colDef)), (/** @type {?} */ (kind)), searchParent);
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function CellContextState() { }
    if (false) {
        /** @type {?} */
        CellContextState.prototype.editing;
        /** @type {?} */
        CellContextState.prototype.focused;
        /** @type {?} */
        CellContextState.prototype.selected;
    }
    /**
     * @record
     * @template T
     */
    function RowContextState() { }
    if (false) {
        /** @type {?} */
        RowContextState.prototype.identity;
        /** @type {?} */
        RowContextState.prototype.dataIndex;
        /** @type {?} */
        RowContextState.prototype.cells;
        /** @type {?} */
        RowContextState.prototype.firstRender;
    }
    /**
     * A reference to a data cell on the grid.
     * @record
     */
    function GridDataPoint() { }
    if (false) {
        /**
         * The row identity.
         * If the grid was set with an identity property use the value of the identity otherwise, use the location of the row in the datasource.
         * @type {?}
         */
        GridDataPoint.prototype.rowIdent;
        /**
         * The column index, relative to the column definition set provided to the grid.
         * Note that this is the absolute position, including hidden columns.
         * @type {?}
         */
        GridDataPoint.prototype.colIndex;
    }
    /**
     * @record
     */
    function PblNgridFocusChangedEvent() { }
    if (false) {
        /** @type {?} */
        PblNgridFocusChangedEvent.prototype.prev;
        /** @type {?} */
        PblNgridFocusChangedEvent.prototype.curr;
    }
    /**
     * @record
     */
    function PblNgridSelectionChangedEvent() { }
    if (false) {
        /** @type {?} */
        PblNgridSelectionChangedEvent.prototype.added;
        /** @type {?} */
        PblNgridSelectionChangedEvent.prototype.removed;
    }
    /**
     * @record
     * @template T, TCol
     */
    function PblNgridMetaCellContext() { }
    if (false) {
        /** @type {?} */
        PblNgridMetaCellContext.prototype.$implicit;
        /** @type {?} */
        PblNgridMetaCellContext.prototype.col;
        /** @type {?} */
        PblNgridMetaCellContext.prototype.table;
    }
    /**
     * @record
     * @template T, P
     */
    function PblNgridCellContext() { }
    if (false) {
        /** @type {?} */
        PblNgridCellContext.prototype.rowContext;
        /** @type {?} */
        PblNgridCellContext.prototype.$implicit;
        /** @type {?} */
        PblNgridCellContext.prototype.row;
        /** @type {?} */
        PblNgridCellContext.prototype.value;
        /** @type {?} */
        PblNgridCellContext.prototype.col;
        /** @type {?} */
        PblNgridCellContext.prototype.table;
        /** @type {?} */
        PblNgridCellContext.prototype.index;
        /** @type {?} */
        PblNgridCellContext.prototype.editing;
        /** @type {?} */
        PblNgridCellContext.prototype.focused;
        /** @type {?} */
        PblNgridCellContext.prototype.selected;
        /**
         * @param {?=} markForCheck
         * @return {?}
         */
        PblNgridCellContext.prototype.startEdit = function (markForCheck) { };
        /**
         * @param {?=} markForCheck
         * @return {?}
         */
        PblNgridCellContext.prototype.stopEdit = function (markForCheck) { };
    }
    /**
     * @record
     * @template T
     */
    function PblNgridRowContext() { }
    if (false) {
        /** @type {?} */
        PblNgridRowContext.prototype.identity;
        /**
         * When true, it is the first time that the row is rendered.
         * Once the row leaves the view this will be false and will not change.
         *
         * Note that rendered items might appear outside of the viewport if virtual scroll is not set and
         * when set but the row is rendered as part of the buffer.
         *
         * This is relevant only when virtual scroll is set.
         * @type {?}
         */
        PblNgridRowContext.prototype.firstRender;
        /**
         * When true, indicates that the row is rendered outside of the viewport.
         *
         * The indicator is updated when rows are rendered (i.e. not live, on scroll events).
         * Understanding this behavior is important!!!
         *
         * For live updated, you can use `updateOutOfViewState()` to trigger updates from a scroll stream. (keep track on performance)
         *
         * Note that when virtual scroll is enabled `true` indicates a buffer row.
         * @type {?}
         */
        PblNgridRowContext.prototype.outOfView;
        /** @type {?} */
        PblNgridRowContext.prototype.table;
        /**
         * Returns the length of cells context stored in this row
         * @type {?}
         */
        PblNgridRowContext.prototype.length;
        /**
         * @param {?} index
         * @return {?}
         */
        PblNgridRowContext.prototype.cell = function (index) { };
        /**
         * Returns a shallow copy of the current cell's context array.
         * @return {?}
         */
        PblNgridRowContext.prototype.getCells = function () { };
        /**
         * Updates the `outOfView` property.
         * @return {?}
         */
        PblNgridRowContext.prototype.updateOutOfViewState = function () { };
    }
    /**
     * @record
     * @template T
     */
    function PblNgridContextApi() { }
    if (false) {
        /**
         * The reference to currently focused cell context.
         * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
         *
         * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
         * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
         * @type {?}
         */
        PblNgridContextApi.prototype.focusedCell;
        /**
         * Notify when the focus has changed.
         *
         * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
         * @type {?}
         */
        PblNgridContextApi.prototype.focusChanged;
        /**
         * The reference to currently selected range of cell's context.
         * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
         *
         * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
         * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
         * @type {?}
         */
        PblNgridContextApi.prototype.selectedCells;
        /**
         * Notify when the selected cells has changed.
         * @type {?}
         */
        PblNgridContextApi.prototype.selectionChanged;
        /**
         * Focus the provided cell.
         * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
         * @param {?=} cellRef A Reference to the cell
         * @param {?=} markForCheck Mark the row for change detection
         * @return {?}
         */
        PblNgridContextApi.prototype.focusCell = function (cellRef, markForCheck) { };
        /**
         * Select all provided cells.
         * @param {?} cellRefs
         * @param {?=} markForCheck Mark the row for change detection
         * @param {?=} clearCurrent Clear the current selection before applying the new selection.
         * Default to false (add to current).
         * @return {?}
         */
        PblNgridContextApi.prototype.selectCells = function (cellRefs, markForCheck, clearCurrent) { };
        /**
         * Unselect all provided cells.
         * If cells are not provided will un-select all currently selected cells.
         * @param {?=} cellRefs
         * @param {?=} markForCheck Mark the row for change detection
         * @return {?}
         */
        PblNgridContextApi.prototype.unselectCells = function (cellRefs, markForCheck) { };
        /**
         * Clear the current context.
         * This method will reset the context of all cells.
         *
         * In most cases, you do not need to run this method because it will automatically run when
         * the datasource is replaced (entire datasource instance).
         *
         * However, if you are keeping the same datasource but switching data internally (onTrigger)
         * you can clear the context using this method.
         * @return {?}
         */
        PblNgridContextApi.prototype.clear = function () { };
        /**
         * Try to find a specific row context, using the row identity, in the current view.
         * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
         * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         * @return {?}
         */
        PblNgridContextApi.prototype.findRowInView = function (rowIdentity) { };
        /**
         * Try to find a specific row context, using the row identity, in the context cache.
         * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
         * is only used as context for rows in view.
         * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         * @return {?}
         */
        PblNgridContextApi.prototype.findRowInCache = function (rowIdentity) { };
        /**
         * Try to find a specific row context, using the row identity, in the context cache.
         * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
         * is only used as context for rows in view.
         * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         * @param {?} offset When set, returns the row at the offset from the row with the provided row identity. Can be any numeric value (e.g 5, -6, 4).
         * @param {?} create Whether to create a new state if the current state does not exist.
         * @return {?}
         */
        PblNgridContextApi.prototype.findRowInCache = function (rowIdentity, offset, create) { };
        /**
         * Get the row context in the specified index.
         *
         * The specified index refers to the rendered index and not the index in the data store.
         * If you are not using virtual scroll the rendered index is the same as the data index.
         *
         * > You can transform data < -- > render index's using the data source.
         * @param {?} rowIndex The RENDER index position of the row.
         * @return {?}
         */
        PblNgridContextApi.prototype.getRow = function (rowIndex) { };
        /**
         * @param {?} cell
         * @return {?}
         */
        PblNgridContextApi.prototype.getCell = function (cell) { };
        /**
         * Get the cell context in the specific row index and column index
         * @param {?} rowIndex The index position of the row.
         * @param {?} colIndex The index position of the column.
         * @return {?}
         */
        PblNgridContextApi.prototype.getCell = function (rowIndex, colIndex) { };
        /**
         * @param {?} cell
         * @return {?}
         */
        PblNgridContextApi.prototype.getDataItem = function (cell) { };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T, TCol
     */
    var   /**
     * @template T, TCol
     */
    MetaCellContext = /** @class */ (function () {
        function MetaCellContext() {
        }
        Object.defineProperty(MetaCellContext.prototype, "$implicit", {
            get: /**
             * @return {?}
             */
            function () { return this; },
            enumerable: true,
            configurable: true
        });
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T, TCol
         * @param {?} col
         * @param {?} table
         * @return {?}
         */
        MetaCellContext.create = 
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T, TCol
         * @param {?} col
         * @param {?} table
         * @return {?}
         */
        function (col, table) {
            /** @type {?} */
            var instance = new MetaCellContext();
            instance.col = col;
            instance.table = table;
            return instance;
        };
        return MetaCellContext;
    }());
    if (false) {
        /** @type {?} */
        MetaCellContext.prototype.col;
        /** @type {?} */
        MetaCellContext.prototype.table;
    }
    /**
     * @template T
     */
    var /**
     * @template T
     */
    PblCellContext = /** @class */ (function () {
        function PblCellContext() {
            this._editing = false;
            this._focused = false;
            this._selected = false;
        }
        Object.defineProperty(PblCellContext.prototype, "$implicit", {
            get: /**
             * @return {?}
             */
            function () { return this; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "row", {
            get: /**
             * @return {?}
             */
            function () { return this.rowContext.$implicit; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblCellContext.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this.col.getValue(this.row); },
            set: /**
             * @param {?} v
             * @return {?}
             */
            function (v) { this.col.setValue(this.row, v); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "rowContext", {
            get: /**
             * @return {?}
             */
            function () { return this._rowContext; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "editing", {
            get: /**
             * @return {?}
             */
            function () { return this._editing; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "focused", {
            get: /**
             * @return {?}
             */
            function () { return this._focused; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCellContext.prototype, "selected", {
            get: /**
             * @return {?}
             */
            function () { return this._selected; },
            enumerable: true,
            configurable: true
        });
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} rowContext
         * @param {?} col
         * @param {?} extApi
         * @return {?}
         */
        PblCellContext.create = 
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} rowContext
         * @param {?} col
         * @param {?} extApi
         * @return {?}
         */
        function (rowContext, col, extApi) {
            /** @type {?} */
            var instance = new PblCellContext();
            instance._rowContext = rowContext;
            instance.col = col;
            instance.extApi = extApi;
            Object.defineProperties(instance, {
                table: { value: extApi.table },
                index: { value: extApi.table.columnApi.indexOf(col) },
            });
            return instance;
        };
        /**
         * @template T
         * @return {?}
         */
        PblCellContext.defaultState = /**
         * @template T
         * @return {?}
         */
        function () {
            return { editing: false, focused: false, selected: false };
        };
        /**
         * @return {?}
         */
        PblCellContext.prototype.clone = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var ctx = PblCellContext.create(this._rowContext, this.col, this.extApi);
            ctx.fromState(this.getState(), this._rowContext, true);
            return ctx;
        };
        /**
         * @return {?}
         */
        PblCellContext.prototype.getState = /**
         * @return {?}
         */
        function () {
            return {
                editing: this._editing,
                focused: this._focused,
                selected: this._selected,
            };
        };
        /**
         * @param {?} state
         * @param {?} rowContext
         * @param {?=} skipRowUpdate
         * @return {?}
         */
        PblCellContext.prototype.fromState = /**
         * @param {?} state
         * @param {?} rowContext
         * @param {?=} skipRowUpdate
         * @return {?}
         */
        function (state, rowContext, skipRowUpdate) {
            /** @type {?} */
            var requiresReset = !skipRowUpdate && this._editing === state.editing;
            this._rowContext = rowContext;
            this._editing = state.editing;
            this._focused = state.focused;
            this._selected = state.selected;
            if (requiresReset) {
                rowContext.updateCell(this);
            }
        };
        /**
         * @param {?=} markForCheck
         * @return {?}
         */
        PblCellContext.prototype.startEdit = /**
         * @param {?=} markForCheck
         * @return {?}
         */
        function (markForCheck) {
            if (this.col.editorTpl && !this.editing) {
                this._editing = true;
                this._rowContext.updateCell(this);
                if (markForCheck) {
                    this.table._cdkTable.syncRows('data', true, this.rowContext.index);
                }
            }
        };
        /**
         * @param {?=} markForCheck
         * @return {?}
         */
        PblCellContext.prototype.stopEdit = /**
         * @param {?=} markForCheck
         * @return {?}
         */
        function (markForCheck) {
            if (this.editing && !this.table.viewport.isScrolling) {
                this._editing = false;
                this._rowContext.updateCell(this);
                if (markForCheck) {
                    this.table._cdkTable.syncRows('data', this.rowContext.index);
                }
            }
        };
        return PblCellContext;
    }());
    if (false) {
        /** @type {?} */
        PblCellContext.prototype.table;
        /** @type {?} */
        PblCellContext.prototype.index;
        /**
         * @type {?}
         * @private
         */
        PblCellContext.prototype._editing;
        /**
         * @type {?}
         * @private
         */
        PblCellContext.prototype._focused;
        /**
         * @type {?}
         * @private
         */
        PblCellContext.prototype._selected;
        /**
         * @type {?}
         * @private
         */
        PblCellContext.prototype._rowContext;
        /** @type {?} */
        PblCellContext.prototype.col;
        /**
         * @type {?}
         * @private
         */
        PblCellContext.prototype.extApi;
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    PblRowContext = /** @class */ (function () {
        function PblRowContext(identity, dataIndex, extApi) {
            this.identity = identity;
            this.dataIndex = dataIndex;
            this.extApi = extApi;
            /*  TODO: material2#14198
                    The row context come from the `cdk` and it can be of 2 types, depending if multiple row templates are used or not.
                    `index` is used for single row template mode and `renderIndex` for multi row template mode.
            
                    There library and/or plugins require access to the rendered index and having 2 locations is a problem...
                    It's a bug trap, adding more complexity and some time access issue because the `CdkTable` instance is not always available.
            
                    This is a workaround for have a single location for the rendered index.
                    I chose to `index` as the single location although `renderIndex` will probably be chosen by the material team.
                    This is because it's less likely to occur as most tables does not have multi row templates (detail row)
                    A refactor will have to be done in the future.
                    There is a pending issue to do so in https://github.com/angular/material2/issues/14198
                    Also related: https://github.com/angular/material2/issues/14199
                */
            /** @type {?} */
            var applyWorkaround = extApi.cdkTable.multiTemplateDataRows;
            if (applyWorkaround) {
                Object.defineProperty(this, 'index', { get: (/**
                     * @return {?}
                     */
                    function () { return this.renderIndex; }) });
            }
            this.table = extApi.table;
            /** @type {?} */
            var cells = this.cells = [];
            var columns = extApi.table.columnApi.columns;
            /** @type {?} */
            var len = columns.length;
            for (var columnIndex = 0; columnIndex < len; columnIndex++) {
                /** @type {?} */
                var cellContext = PblCellContext.create(this, columns[columnIndex], extApi);
                cells.push(cellContext);
            }
        }
        Object.defineProperty(PblRowContext.prototype, "length", {
            /**
             * Returns the length of cells context stored in this row
             */
            get: /**
             * Returns the length of cells context stored in this row
             * @return {?}
             */
            function () {
                return (this.cells && this.cells.length) || 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblRowContext.prototype, "pblRowContext", {
            get: /**
             * @return {?}
             */
            function () { return this; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { },
            enumerable: true,
            configurable: true
        });
        /**
         * @template T
         * @param {?} identity
         * @param {?} dataIndex
         * @param {?} cellsCount
         * @return {?}
         */
        PblRowContext.defaultState = /**
         * @template T
         * @param {?} identity
         * @param {?} dataIndex
         * @param {?} cellsCount
         * @return {?}
         */
        function (identity, dataIndex, cellsCount) {
            /** @type {?} */
            var cells = [];
            for (var i = 0; i < cellsCount; i++) {
                cells.push(PblCellContext.defaultState());
            }
            return { identity: identity, dataIndex: dataIndex, cells: cells, firstRender: true };
        };
        /**
         * @return {?}
         */
        PblRowContext.prototype.getState = /**
         * @return {?}
         */
        function () {
            return {
                identity: this.identity,
                dataIndex: this.dataIndex,
                firstRender: this.firstRender,
                cells: this.cells.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.getState(); })),
            };
        };
        /**
         * @param {?} state
         * @return {?}
         */
        PblRowContext.prototype.fromState = /**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            this.identity = state.identity;
            this.firstRender = state.firstRender;
            this.dataIndex = state.dataIndex;
            for (var i = 0, len = this.cells.length; i < len; i++) {
                this.cells[i].fromState(state.cells[i], this);
            }
        };
        /**
         * @param {?} context
         * @return {?}
         */
        PblRowContext.prototype.updateContext = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            context.dataIndex = this.dataIndex;
            Object.assign(this, context);
        };
        /**
         * Returns the cell context for the column at the specified position.
         * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
         */
        /**
         * Returns the cell context for the column at the specified position.
         * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
         * @param {?} index
         * @return {?}
         */
        PblRowContext.prototype.cell = /**
         * Returns the cell context for the column at the specified position.
         * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
         * @param {?} index
         * @return {?}
         */
        function (index) {
            /** @type {?} */
            var idx = typeof index === 'number' ? index : this.table.columnApi.indexOf(index);
            return this.cells[idx];
        };
        /**
         * @return {?}
         */
        PblRowContext.prototype.getCells = /**
         * @return {?}
         */
        function () {
            return (this.cells && this.cells.slice()) || [];
        };
        /**
         * @param {?} cell
         * @return {?}
         */
        PblRowContext.prototype.updateCell = /**
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            this.cells[cell.index] = cell.clone();
        };
        /**
       * Updates the `outOfView` property.
       */
        /**
         * Updates the `outOfView` property.
         * @return {?}
         */
        PblRowContext.prototype.updateOutOfViewState = /**
         * Updates the `outOfView` property.
         * @return {?}
         */
        function () {
            this.extApi.contextApi.updateOutOfViewState(this);
        };
        return PblRowContext;
    }());
    if (false) {
        /**
         * Data for the row that this cell is located within.
         * @type {?}
         */
        PblRowContext.prototype.$implicit;
        /**
         * Index of the data object in the provided data array.
         * @type {?}
         */
        PblRowContext.prototype.index;
        /**
         * Index location of the rendered row that this cell is located within.
         * @type {?}
         */
        PblRowContext.prototype.renderIndex;
        /**
         * Length of the number of total rows.
         * @type {?}
         */
        PblRowContext.prototype.count;
        /**
         * True if this cell is contained in the first row.
         * @type {?}
         */
        PblRowContext.prototype.first;
        /**
         * True if this cell is contained in the last row.
         * @type {?}
         */
        PblRowContext.prototype.last;
        /**
         * True if this cell is contained in a row with an even-numbered index.
         * @type {?}
         */
        PblRowContext.prototype.even;
        /**
         * True if this cell is contained in a row with an odd-numbered index.
         * @type {?}
         */
        PblRowContext.prototype.odd;
        /** @type {?} */
        PblRowContext.prototype.gridInstance;
        /** @type {?} */
        PblRowContext.prototype.firstRender;
        /** @type {?} */
        PblRowContext.prototype.outOfView;
        /** @type {?} */
        PblRowContext.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblRowContext.prototype.cells;
        /** @type {?} */
        PblRowContext.prototype.identity;
        /** @type {?} */
        PblRowContext.prototype.dataIndex;
        /**
         * @type {?}
         * @private
         */
        PblRowContext.prototype.extApi;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * IE 11 compatible matches implementation.
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    function matches(element, selector) {
        return element.matches ?
            element.matches(selector) :
            ((/** @type {?} */ (element)))['msMatchesSelector'](selector);
    }
    /**
     * IE 11 compatible closest implementation.
     * @param {?} element
     * @param {?} selector
     * @return {?}
     */
    function closest(element, selector) {
        if (!(element instanceof Node)) {
            return null;
        }
        /** @type {?} */
        var curr = element;
        while (curr != null && !(curr instanceof Element && matches(curr, selector))) {
            curr = curr.parentNode;
        }
        return (/** @type {?} */ ((curr || null)));
    }
    /**
     * @param {?} el
     * @return {?}
     */
    function findRowRenderedIndex(el) {
        /** @type {?} */
        var rows = Array.from(closest(el, 'pbl-cdk-table').querySelectorAll('pbl-ngrid-row'));
        return rows.indexOf(el);
    }
    /**
     * @param {?} el
     * @return {?}
     */
    function findCellRenderedIndex(el) {
        /** @type {?} */
        var rowEl = (/** @type {?} */ (closest(el, 'pbl-ngrid-row')));
        /** @type {?} */
        var cells = Array.from(rowEl.querySelectorAll('pbl-ngrid-cell'));
        return [findRowRenderedIndex(rowEl), cells.indexOf(el)];
    }
    /**
     * Resolves the context from one of the possible types in `CellReference`.
     * If the context is within the view it will return the `PblCellContext instance, otherwise it will
     * return a tuple with the first item being the row context state and the seconds item pointing to the cell index.
     *
     * If no context is found, returns undefined.
     * @param {?} cellRef
     * @param {?} context
     * @return {?}
     */
    function resolveCellReference(cellRef, context) {
        /** @type {?} */
        var rowIdent;
        /** @type {?} */
        var colIndex;
        if (isGridDataPoint(cellRef)) {
            rowIdent = cellRef.rowIdent;
            colIndex = cellRef.colIndex;
        }
        else if (isCellContext(cellRef)) {
            rowIdent = cellRef.rowContext.identity;
            colIndex = cellRef.index;
        }
        else {
            var _a = __read(findCellRenderedIndex(cellRef), 2), r = _a[0], c = _a[1];
            /** @type {?} */
            var rowContext = context.viewCache.get(r);
            if (rowContext) {
                /** @type {?} */
                var column = context.columnApi.findColumnAt(c);
                /** @type {?} */
                var columnIndex = context.columnApi.indexOf(column);
                return rowContext.cell(columnIndex);
            }
            else {
                return;
            }
        }
        /** @type {?} */
        var rowState = context.cache.get(rowIdent);
        if (rowState) {
            /** @type {?} */
            var rowContext = context.extApi.table.contextApi.findRowInView(rowState.identity);
            if (rowContext) {
                return rowContext.cell(colIndex);
            }
            else {
                /** @type {?} */
                var cellState = rowState.cells[colIndex];
                if (cellState) {
                    return [rowState, colIndex];
                }
            }
        }
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isGridDataPoint(obj) {
        return 'rowIdent' in obj && 'colIndex' in obj;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    function isCellContext(obj) {
        return 'rowContext' in obj && 'index' in obj;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var /**
     * @template T
     */
    ContextApi = /** @class */ (function () {
        function ContextApi(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.viewCache = new Map();
            this.cache = new Map();
            this.activeSelected = [];
            this.focusChanged$ = new rxjs.BehaviorSubject({ prev: undefined, curr: undefined });
            this.selectionChanged$ = new rxjs.Subject();
            /**
             * Notify when the focus has changed.
             *
             * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
             */
            this.focusChanged = this.focusChanged$
                .pipe(operators.buffer(this.focusChanged$.pipe(operators.debounceTime(0, rxjs.asapScheduler))), operators.map((/**
             * @param {?} events
             * @return {?}
             */
            function (events) { return ({ prev: events[0].prev, curr: events[events.length - 1].curr }); })));
            /**
             * Notify when the selected cells has changed.
             */
            this.selectionChanged = this.selectionChanged$.asObservable();
            this.vcRef = extApi.cdkTable._rowOutlet.viewContainer;
            this.columnApi = extApi.table.columnApi;
            extApi.events
                .pipe(operators.filter((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e.kind === 'onDestroy'; })))
                .subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.destroy(); }));
            /** @type {?} */
            var updateContext = (/**
             * @return {?}
             */
            function () {
                var e_1, _a;
                /** @type {?} */
                var viewPortRect = _this.getViewRect();
                /** @type {?} */
                var lastView = new Set(Array.from(_this.viewCache.values()).map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.identity; })));
                /** @type {?} */
                var unmatchedRefs = new Map();
                /** @type {?} */
                var keepProcessOutOfView = !!viewPortRect;
                for (var i = 0, len = _this.vcRef.length; i < len; i++) {
                    /** @type {?} */
                    var viewRef = _this.findViewRef(i);
                    /** @type {?} */
                    var rowContext = _this.findRowContext(viewRef, i);
                    _this.viewCache.set(i, rowContext);
                    lastView.delete(rowContext.identity);
                    // Identity did not change but context did change
                    // This is probably due to trackBy with index reference or that matched data on some property but the actual data reference changed.
                    // We log these and handle them later, they come in pair and we need to switch the context between the values in the pair.
                    // The pair is a 2 item tuple - 1st item is new index, 2nd item is the old index.
                    // We build the pairs, each pair is a switch
                    if (viewRef.context.$implicit !== rowContext.$implicit) {
                        /** @type {?} */
                        var pair = unmatchedRefs.get(rowContext.$implicit) || [-1, -1];
                        pair[1] = i;
                        unmatchedRefs.set(rowContext.$implicit, pair);
                        pair = unmatchedRefs.get(viewRef.context.$implicit) || [-1, -1];
                        pair[0] = i;
                        unmatchedRefs.set(viewRef.context.$implicit, pair);
                    }
                    if (keepProcessOutOfView) {
                        keepProcessOutOfView = processOutOfView(viewRef, viewPortRect, 'top');
                    }
                }
                if (unmatchedRefs.size > 0) {
                    // We have pairs but we can't just start switching because when the items move or swap we need
                    // to update their values and so we need to cache one of them.
                    // The operation will effect all items (N) between then origin and destination.
                    // When N === 2 its a swap, when N > 2 its a move.
                    // In both cases the first and last operations share the same object.
                    // Also, we need to make sure that the order of operations does not use the same row as the source more then once.
                    // For example, If I copy row 5 to to row 4 and then 4 to 3 I need to start from 3->4->5, if I do 5->4->3 I will get 5 in all rows.
                    //
                    // We use the source (pair[1]) for sorting, the sort order depends on the direction of the move (up/down).
                    /** @type {?} */
                    var arr = Array.from(unmatchedRefs.entries()).filter((/**
                     * @param {?} entry
                     * @return {?}
                     */
                    function (entry) {
                        /** @type {?} */
                        var pair = entry[1];
                        if (pair[0] === -1) {
                            return false;
                        }
                        else if (pair[1] === -1) {
                            /** @type {?} */
                            var to = _this.viewCache.get(pair[0]);
                            to.$implicit = entry[0];
                            return false;
                        }
                        return true;
                    })).map((/**
                     * @param {?} entry
                     * @return {?}
                     */
                    function (entry) { return entry[1]; }));
                    unmatchedRefs.clear();
                    if (arr.length) {
                        /** @type {?} */
                        var sortFn = arr[arr.length - 1][0] - arr[arr.length - 1][1] > 0 // check sort direction
                            ? (/**
                             * @param {?} a
                             * @param {?} b
                             * @return {?}
                             */
                            function (a, b) { return b[1] - a[1]; })
                            : (/**
                             * @param {?} a
                             * @param {?} b
                             * @return {?}
                             */
                            function (a, b) { return a[1] - b[1]; });
                        arr.sort(sortFn);
                        /** @type {?} */
                        var lastOp = {
                            data: _this.viewCache.get(arr[0][0]).$implicit,
                            state: _this.viewCache.get(arr[0][0]).getState(),
                            pair: arr.pop(),
                        };
                        try {
                            for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                                var pair = arr_1_1.value;
                                // What we're doing here is switching the context wrapped by `RotContext` while the `RowContext` preserve it's identity.
                                // Each row context has a state, which is valid for it's current context, if we switch context we must switch state as well and also
                                // cache it.
                                /** @type {?} */
                                var to_1 = _this.viewCache.get(pair[0]);
                                /** @type {?} */
                                var from = _this.viewCache.get(pair[1]);
                                /** @type {?} */
                                var state = from.getState();
                                state.identity = to_1.identity;
                                _this.cache.set(to_1.identity, state);
                                to_1.fromState(state);
                                to_1.$implicit = from.$implicit;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        /** @type {?} */
                        var to = _this.viewCache.get(lastOp.pair[0]);
                        lastOp.state.identity = to.identity;
                        _this.cache.set(to.identity, lastOp.state);
                        to.fromState(lastOp.state);
                        to.$implicit = lastOp.data;
                    }
                }
                if (viewPortRect) {
                    for (var i = _this.vcRef.length - 1; i > -1; i--) {
                        if (!processOutOfView(_this.findViewRef(i), viewPortRect, 'bottom')) {
                            break;
                        }
                    }
                }
                lastView.forEach((/**
                 * @param {?} ident
                 * @return {?}
                 */
                function (ident) { return _this.cache.get(ident).firstRender = false; }));
            });
            updateContext();
            extApi.cdkTable.onRenderRows.subscribe(updateContext);
        }
        Object.defineProperty(ContextApi.prototype, "focusedCell", {
            /**
             * The reference to currently focused cell context.
             * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
             *
             * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
             * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
             */
            get: /**
             * The reference to currently focused cell context.
             * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
             *
             * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
             * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
             * @return {?}
             */
            function () {
                return this.activeFocused ? __assign({}, this.activeFocused) : undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContextApi.prototype, "selectedCells", {
            /**
             * The reference to currently selected range of cell's context.
             * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
             *
             * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
             * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
             */
            get: /**
             * The reference to currently selected range of cell's context.
             * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
             *
             * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
             * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
             * @return {?}
             */
            function () {
                return this.activeSelected.slice();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Focus the provided cell.
         * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
         * @param cellRef A Reference to the cell
         * @param markForCheck Mark the row for change detection
         */
        /**
         * Focus the provided cell.
         * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
         * @param {?=} cellRef A Reference to the cell
         * @param {?=} markForCheck Mark the row for change detection
         * @return {?}
         */
        ContextApi.prototype.focusCell = /**
         * Focus the provided cell.
         * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
         * @param {?=} cellRef A Reference to the cell
         * @param {?=} markForCheck Mark the row for change detection
         * @return {?}
         */
        function (cellRef, markForCheck) {
            if (!cellRef || cellRef === true) {
                if (this.activeFocused) {
                    var _a = this.activeFocused, rowIdent = _a.rowIdent, colIndex = _a.colIndex;
                    this.activeFocused = undefined;
                    this.updateState(rowIdent, colIndex, { focused: false });
                    this.emitFocusChanged(this.activeFocused);
                    if (markForCheck) {
                        /** @type {?} */
                        var rowContext = this.findRowInView(rowIdent);
                        if (rowContext) {
                            this.extApi.table._cdkTable.syncRows('data', rowContext.index);
                        }
                    }
                }
            }
            else {
                /** @type {?} */
                var ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
                if (ref) {
                    this.focusCell(markForCheck);
                    if (ref instanceof PblCellContext) {
                        if (!ref.focused && !this.extApi.table.viewport.isScrolling) {
                            this.updateState(ref.rowContext.identity, ref.index, { focused: true });
                            this.activeFocused = { rowIdent: ref.rowContext.identity, colIndex: ref.index };
                            this.selectCells([this.activeFocused], markForCheck, true);
                            if (markForCheck) {
                                this.extApi.table._cdkTable.syncRows('data', ref.rowContext.index);
                            }
                        }
                    }
                    else {
                        this.updateState(ref[0].identity, ref[1], { focused: true });
                        this.activeFocused = { rowIdent: ref[0].identity, colIndex: ref[1] };
                    }
                    this.emitFocusChanged(this.activeFocused);
                }
            }
        };
        /**
         * Select all provided cells.
         * @param cellRef A Reference to the cell
         * @param markForCheck Mark the row for change detection
         * @param clearCurrent Clear the current selection before applying the new selection.
         * Default to false (add to current).
         */
        /**
         * Select all provided cells.
         * @param {?} cellRefs
         * @param {?=} markForCheck Mark the row for change detection
         * @param {?=} clearCurrent Clear the current selection before applying the new selection.
         * Default to false (add to current).
         * @return {?}
         */
        ContextApi.prototype.selectCells = /**
         * Select all provided cells.
         * @param {?} cellRefs
         * @param {?=} markForCheck Mark the row for change detection
         * @param {?=} clearCurrent Clear the current selection before applying the new selection.
         * Default to false (add to current).
         * @return {?}
         */
        function (cellRefs, markForCheck, clearCurrent) {
            var e_2, _a, _b;
            /** @type {?} */
            var toMarkRendered = new Set();
            if (clearCurrent) {
                this.unselectCells();
            }
            /** @type {?} */
            var added = [];
            try {
                for (var cellRefs_1 = __values(cellRefs), cellRefs_1_1 = cellRefs_1.next(); !cellRefs_1_1.done; cellRefs_1_1 = cellRefs_1.next()) {
                    var cellRef = cellRefs_1_1.value;
                    /** @type {?} */
                    var ref = resolveCellReference(cellRef, (/** @type {?} */ (this)));
                    if (ref instanceof PblCellContext) {
                        if (!ref.selected && !this.extApi.table.viewport.isScrolling) {
                            /** @type {?} */
                            var rowIdent = ref.rowContext.identity;
                            /** @type {?} */
                            var colIndex = ref.index;
                            this.updateState(rowIdent, colIndex, { selected: true });
                            /** @type {?} */
                            var dataPoint = { rowIdent: rowIdent, colIndex: colIndex };
                            this.activeSelected.push(dataPoint);
                            added.push(dataPoint);
                            if (markForCheck) {
                                toMarkRendered.add(ref.rowContext.index);
                            }
                        }
                    }
                    else if (ref) {
                        var _c = __read(ref, 2), rowState = _c[0], colIndex = _c[1];
                        if (!rowState.cells[colIndex].selected) {
                            this.updateState(rowState.identity, colIndex, { selected: true });
                            this.activeSelected.push({ rowIdent: rowState.identity, colIndex: colIndex });
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (cellRefs_1_1 && !cellRefs_1_1.done && (_a = cellRefs_1.return)) _a.call(cellRefs_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (toMarkRendered.size > 0) {
                (_b = this.extApi.table._cdkTable).syncRows.apply(_b, __spread(['data'], Array.from(toMarkRendered.values())));
            }
            this.selectionChanged$.next({ added: added, removed: [] });
        };
        /**
         * Unselect all provided cells.
         * If cells are not provided will un-select all currently selected cells.
         * @param cellRef A Reference to the cell
         * @param markForCheck Mark the row for change detection
         */
        /**
         * Unselect all provided cells.
         * If cells are not provided will un-select all currently selected cells.
         * @param {?=} cellRefs
         * @param {?=} markForCheck Mark the row for change detection
         * @return {?}
         */
        ContextApi.prototype.unselectCells = /**
         * Unselect all provided cells.
         * If cells are not provided will un-select all currently selected cells.
         * @param {?=} cellRefs
         * @param {?=} markForCheck Mark the row for change detection
         * @return {?}
         */
        function (cellRefs, markForCheck) {
            var e_3, _a, _b;
            /** @type {?} */
            var toMarkRendered = new Set();
            /** @type {?} */
            var toUnselect = this.activeSelected;
            /** @type {?} */
            var removeAll = true;
            if (Array.isArray(cellRefs)) {
                toUnselect = cellRefs;
                removeAll = false;
            }
            else {
                markForCheck = !!cellRefs;
                this.activeSelected = [];
            }
            /** @type {?} */
            var removed = [];
            var _loop_1 = function (cellRef) {
                /** @type {?} */
                var ref = resolveCellReference(cellRef, (/** @type {?} */ (this_1)));
                if (ref instanceof PblCellContext) {
                    if (ref.selected) {
                        /** @type {?} */
                        var rowIdent_1 = ref.rowContext.identity;
                        /** @type {?} */
                        var colIndex_1 = ref.index;
                        this_1.updateState(rowIdent_1, colIndex_1, { selected: false });
                        if (!removeAll) {
                            /** @type {?} */
                            var wasRemoved = utils$1.removeFromArray(this_1.activeSelected, (/**
                             * @param {?} item
                             * @return {?}
                             */
                            function (item) { return item.colIndex === colIndex_1 && item.rowIdent === rowIdent_1; }));
                            if (wasRemoved) {
                                removed.push({ rowIdent: rowIdent_1, colIndex: colIndex_1 });
                            }
                        }
                        if (markForCheck) {
                            toMarkRendered.add(ref.rowContext.index);
                        }
                    }
                }
                else if (ref) {
                    var _a = __read(ref, 2), rowState_1 = _a[0], colIndex_2 = _a[1];
                    if (rowState_1.cells[colIndex_2].selected) {
                        this_1.updateState(rowState_1.identity, colIndex_2, { selected: false });
                        if (!removeAll) {
                            /** @type {?} */
                            var wasRemoved = utils$1.removeFromArray(this_1.activeSelected, (/**
                             * @param {?} item
                             * @return {?}
                             */
                            function (item) { return item.colIndex === colIndex_2 && item.rowIdent === rowState_1.identity; }));
                            if (wasRemoved) {
                                removed.push({ rowIdent: rowState_1.identity, colIndex: colIndex_2 });
                            }
                        }
                    }
                }
            };
            var this_1 = this;
            try {
                for (var toUnselect_1 = __values(toUnselect), toUnselect_1_1 = toUnselect_1.next(); !toUnselect_1_1.done; toUnselect_1_1 = toUnselect_1.next()) {
                    var cellRef = toUnselect_1_1.value;
                    _loop_1(cellRef);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (toUnselect_1_1 && !toUnselect_1_1.done && (_a = toUnselect_1.return)) _a.call(toUnselect_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (toMarkRendered.size > 0) {
                (_b = this.extApi.table._cdkTable).syncRows.apply(_b, __spread(['data'], Array.from(toMarkRendered.values())));
            }
            this.selectionChanged$.next({ added: [], removed: removed });
        };
        /**
         * @return {?}
         */
        ContextApi.prototype.clear = /**
         * @return {?}
         */
        function () {
            for (var i = 0, len = this.vcRef.length; i < len; i++) {
                /** @type {?} */
                var viewRef = this.findViewRef(i);
                viewRef.context.pblRowContext = undefined;
            }
            this.viewCache.clear();
            this.cache.clear();
        };
        /**
         * @param {?} row
         * @return {?}
         */
        ContextApi.prototype.getRow = /**
         * @param {?} row
         * @return {?}
         */
        function (row) {
            /** @type {?} */
            var index = typeof row === 'number' ? row : findRowRenderedIndex(row);
            return this.rowContext(index);
        };
        /**
         * @param {?} rowOrCellElement
         * @param {?=} col
         * @return {?}
         */
        ContextApi.prototype.getCell = /**
         * @param {?} rowOrCellElement
         * @param {?=} col
         * @return {?}
         */
        function (rowOrCellElement, col) {
            if (typeof rowOrCellElement === 'number') {
                /** @type {?} */
                var rowContext = this.rowContext(rowOrCellElement);
                if (rowContext) {
                    return rowContext.cell(col);
                }
            }
            else {
                /** @type {?} */
                var ref = resolveCellReference(rowOrCellElement, (/** @type {?} */ (this)));
                if (ref instanceof PblCellContext) {
                    return ref;
                }
            }
        };
        /**
         * @param {?} cell
         * @return {?}
         */
        ContextApi.prototype.getDataItem = /**
         * @param {?} cell
         * @return {?}
         */
        function (cell) {
            /** @type {?} */
            var ref = resolveCellReference(cell, (/** @type {?} */ (this)));
            if (ref instanceof PblCellContext) {
                return ref.col.getValue(ref.rowContext.$implicit);
            }
            else if (ref) {
                /** @type {?} */
                var row = this.extApi.table.ds.source[ref[0].dataIndex];
                /** @type {?} */
                var column = this.extApi.table.columnApi.findColumnAt(ref[1]);
                return column.getValue(row);
            }
        };
        /**
         * @param {?} renderRowIndex
         * @param {?} column
         * @return {?}
         */
        ContextApi.prototype.createCellContext = /**
         * @param {?} renderRowIndex
         * @param {?} column
         * @return {?}
         */
        function (renderRowIndex, column) {
            /** @type {?} */
            var rowContext = this.rowContext(renderRowIndex);
            /** @type {?} */
            var colIndex = this.columnApi.indexOf(column);
            return rowContext.cell(colIndex);
        };
        /**
         * @param {?} renderRowIndex
         * @return {?}
         */
        ContextApi.prototype.rowContext = /**
         * @param {?} renderRowIndex
         * @return {?}
         */
        function (renderRowIndex) {
            return this.viewCache.get(renderRowIndex);
        };
        /**
         * @param {?} rowContext
         * @return {?}
         */
        ContextApi.prototype.updateOutOfViewState = /**
         * @param {?} rowContext
         * @return {?}
         */
        function (rowContext) {
            /** @type {?} */
            var viewPortRect = this.getViewRect();
            /** @type {?} */
            var viewRef = this.findViewRef(rowContext.index);
            processOutOfView(viewRef, viewPortRect);
        };
        /**
         * @param {?} rowIdentity
         * @param {?} rowStateOrCellIndex
         * @param {?=} cellState
         * @return {?}
         */
        ContextApi.prototype.updateState = /**
         * @param {?} rowIdentity
         * @param {?} rowStateOrCellIndex
         * @param {?=} cellState
         * @return {?}
         */
        function (rowIdentity, rowStateOrCellIndex, cellState) {
            /** @type {?} */
            var currentRowState = this.cache.get(rowIdentity);
            if (currentRowState) {
                if (typeof rowStateOrCellIndex === 'number') {
                    /** @type {?} */
                    var currentCellState = currentRowState.cells[rowStateOrCellIndex];
                    if (currentCellState) {
                        Object.assign(currentCellState, cellState);
                    }
                }
                else {
                    Object.assign(currentRowState, rowStateOrCellIndex);
                }
                /** @type {?} */
                var rowContext = this.findRowInView(rowIdentity);
                if (rowContext) {
                    rowContext.fromState(currentRowState);
                }
            }
        };
        /**
         * Try to find a specific row, using the row identity, in the current view.
         * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
         * @param rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         */
        /**
         * Try to find a specific row, using the row identity, in the current view.
         * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
         * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         * @return {?}
         */
        ContextApi.prototype.findRowInView = /**
         * Try to find a specific row, using the row identity, in the current view.
         * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
         * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
         * @return {?}
         */
        function (rowIdentity) {
            /** @type {?} */
            var rowState = this.cache.get(rowIdentity);
            if (rowState) {
                /** @type {?} */
                var renderRowIndex = rowState.dataIndex - this.extApi.table.ds.renderStart;
                /** @type {?} */
                var rowContext = this.viewCache.get(renderRowIndex);
                if (rowContext && rowContext.identity === rowIdentity) {
                    return rowContext;
                }
            }
        };
        /**
         * @param {?} rowIdentity
         * @param {?=} offset
         * @param {?=} create
         * @return {?}
         */
        ContextApi.prototype.findRowInCache = /**
         * @param {?} rowIdentity
         * @param {?=} offset
         * @param {?=} create
         * @return {?}
         */
        function (rowIdentity, offset, create) {
            /** @type {?} */
            var rowState = this.cache.get(rowIdentity);
            if (!offset) {
                return rowState;
            }
            else {
                /** @type {?} */
                var dataIndex = rowState.dataIndex + offset;
                /** @type {?} */
                var identity = this.getRowIdentity(dataIndex);
                if (identity !== null) {
                    /** @type {?} */
                    var result = this.findRowInCache(identity);
                    if (!result && create && dataIndex < this.extApi.table.ds.length) {
                        result = PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length);
                        this.cache.set(identity, result);
                    }
                    return result;
                }
            }
        };
        /**
         * @param {?} dataIndex
         * @param {?=} context
         * @return {?}
         */
        ContextApi.prototype.getRowIdentity = /**
         * @param {?} dataIndex
         * @param {?=} context
         * @return {?}
         */
        function (dataIndex, context) {
            var ds = this.extApi.table.ds;
            var primary = this.extApi.columnStore.primary;
            /** @type {?} */
            var row = context ? context.$implicit : ds.source[dataIndex];
            if (!row) {
                return null;
            }
            else {
                return primary ? primary.getValue(row) : dataIndex;
            }
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        ContextApi.prototype.findViewRef = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            return (/** @type {?} */ (this.vcRef.get(index)));
        };
        /**
         * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
         *
         * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
         * extending it for the table features.
         *
         * The process has 2 layers of cache:
         *
         * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
         * Each view ref (row) has a matching record in the `RowContext` view cache.
         *
         * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
         * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
         * when `RowContext` goes in/out of the viewport.
         *
         * @param viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
         * @param renderRowIndex The position of the view, relative to other rows.
         * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
         * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
         */
        /**
         * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
         *
         * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
         * extending it for the table features.
         *
         * The process has 2 layers of cache:
         *
         * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
         * Each view ref (row) has a matching record in the `RowContext` view cache.
         *
         * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
         * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
         * when `RowContext` goes in/out of the viewport.
         *
         * @private
         * @param {?} viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
         * @param {?} renderRowIndex The position of the view, relative to other rows.
         * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
         * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
         * @return {?}
         */
        ContextApi.prototype.findRowContext = /**
         * Find/Update/Create the `RowContext` for the provided `EmbeddedViewRef` at the provided render position.
         *
         * A `RowContext` object is a wrapper for the internal context of a row in `CdkTable` with the purpose of
         * extending it for the table features.
         *
         * The process has 2 layers of cache:
         *
         * - `RowContext` objects are stored in a view cache which is synced with the `CdkTable` row outlet viewRefs.
         * Each view ref (row) has a matching record in the `RowContext` view cache.
         *
         * - `RowContextState` object are stored in a cache which is synced with the items in the data source.
         * Each item in the datasource has a matching row `RowContextState` item (lazy), which is used to persist context
         * when `RowContext` goes in/out of the viewport.
         *
         * @private
         * @param {?} viewRef The `EmbeddedViewRef` holding the context that the returned `RowContext` should wrap
         * @param {?} renderRowIndex The position of the view, relative to other rows.
         * The position is required for caching the context state when a specific row is thrown out of the viewport (virtual scroll).
         * Each `RowContext` gets a unique identity using the position relative to the current render range in the data source.
         * @return {?}
         */
        function (viewRef, renderRowIndex) {
            var _this = this;
            var context = viewRef.context;
            /** @type {?} */
            var dataIndex = this.extApi.table.ds.renderStart + renderRowIndex;
            /** @type {?} */
            var identity = this.getRowIdentity(dataIndex, viewRef.context);
            /** @type {?} */
            var rowContext = (/** @type {?} */ (context.pblRowContext));
            if (!this.cache.has(identity)) {
                this.cache.set(identity, PblRowContext.defaultState(identity, dataIndex, this.columnApi.columns.length));
            }
            if (!rowContext) {
                rowContext = context.pblRowContext = new PblRowContext(identity, dataIndex, this.extApi);
                rowContext.updateContext(context);
                viewRef.onDestroy((/**
                 * @return {?}
                 */
                function () {
                    _this.viewCache.delete(renderRowIndex);
                    context.pblRowContext = undefined;
                }));
            }
            else if (rowContext.identity !== identity) {
                // save old state before applying new state
                this.cache.set(rowContext.identity, rowContext.getState());
                rowContext.updateContext(context);
                // We
                /** @type {?} */
                var gap = dataIndex - rowContext.dataIndex;
                if (gap > 0) {
                    /** @type {?} */
                    var siblingViewRef = this.findViewRef(renderRowIndex + gap);
                    /** @type {?} */
                    var siblingRowContext = siblingViewRef && (/** @type {?} */ (siblingViewRef.context.pblRowContext));
                    if (siblingRowContext) {
                        this.cache.set(siblingRowContext.identity, siblingRowContext.getState());
                    }
                }
            }
            else {
                return rowContext;
            }
            rowContext.fromState(this.cache.get(identity));
            return rowContext;
        };
        /**
         * @private
         * @return {?}
         */
        ContextApi.prototype.getViewRect = /**
         * @private
         * @return {?}
         */
        function () {
            return this.extApi.table.viewport.elementRef.nativeElement.getBoundingClientRect();
        };
        /**
         * @private
         * @param {?} curr
         * @return {?}
         */
        ContextApi.prototype.emitFocusChanged = /**
         * @private
         * @param {?} curr
         * @return {?}
         */
        function (curr) {
            this.focusChanged$.next({
                prev: this.focusChanged$.value.curr,
                curr: curr,
            });
        };
        /**
         * @private
         * @return {?}
         */
        ContextApi.prototype.destroy = /**
         * @private
         * @return {?}
         */
        function () {
            this.focusChanged$.complete();
            this.selectionChanged$.complete();
        };
        return ContextApi;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.viewCache;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.cache;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.vcRef;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.columnApi;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.activeFocused;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.activeSelected;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.focusChanged$;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.selectionChanged$;
        /**
         * Notify when the focus has changed.
         *
         * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
         * @type {?}
         */
        ContextApi.prototype.focusChanged;
        /**
         * Notify when the selected cells has changed.
         * @type {?}
         */
        ContextApi.prototype.selectionChanged;
        /**
         * @type {?}
         * @private
         */
        ContextApi.prototype.extApi;
    }
    /**
     * @param {?} viewRef
     * @param {?} viewPortRect
     * @param {?=} location
     * @return {?}
     */
    function processOutOfView(viewRef, viewPortRect, location) {
        /** @type {?} */
        var el = viewRef.rootNodes[0];
        /** @type {?} */
        var rowContext = viewRef.context.pblRowContext;
        /** @type {?} */
        var elRect = el.getBoundingClientRect();
        /** @type {?} */
        var isInsideOfView;
        switch (location) {
            case 'top':
                isInsideOfView = elRect.bottom >= viewPortRect.top;
                break;
            case 'bottom':
                isInsideOfView = elRect.top <= viewPortRect.bottom;
                break;
            default:
                isInsideOfView = (elRect.bottom >= viewPortRect.top && elRect.top <= viewPortRect.bottom);
                break;
        }
        if (isInsideOfView) {
            if (!rowContext.outOfView) {
                return false;
            }
            rowContext.outOfView = false;
        }
        else {
            rowContext.outOfView = true;
        }
        return true;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function BoxModelSpaceStrategy() { }
    if (false) {
        /**
         * @param {?} col
         * @return {?}
         */
        BoxModelSpaceStrategy.prototype.cell = function (col) { };
        /**
         * @param {?} col
         * @return {?}
         */
        BoxModelSpaceStrategy.prototype.groupCell = function (col) { };
        /**
         * @param {?} cols
         * @return {?}
         */
        BoxModelSpaceStrategy.prototype.group = function (cols) { };
    }
    /**
     * A column width calculator that calculates column width for a specific column or a group of columns.
     * It also provide the minimum required row width for the total columns added up to that point.
     *
     * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
     * It performs the calculation based on `PblColumn` and actual DOM size metadata.
     *
     * The `DynamicColumnWidthLogic` has 3 responsibilities:
     *
     * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
     * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
     *
     * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
     *
     * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
     *
     * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
     */
    var /**
     * A column width calculator that calculates column width for a specific column or a group of columns.
     * It also provide the minimum required row width for the total columns added up to that point.
     *
     * The `DynamicColumnWidthLogic` takes into account real-time DOM measurements (especially box-model metadata), hence "dynamic".
     * It performs the calculation based on `PblColumn` and actual DOM size metadata.
     *
     * The `DynamicColumnWidthLogic` has 3 responsibilities:
     *
     * - It is responsible for enforcing the `maxWidth` boundary constraint for every column it processes by calculating the actual width
     * of a column and calling `PblColumn.checkMaxWidthLock` to verify if max width lock has changed due to the new actual width.
     *
     * - It calculates the absolute width for a group of columns, so `PblCdkVirtualScrollViewportComponentGroupColumn` can have an exact size that wraps it's children.
     *
     * - It calculates the `minimumRowWidth`, which represents the minimum width required width of the row, i.e. table.
     *
     * > Note that an instance of `DynamicColumnWidthLogic` represents a one-time pass for all columns, for every run a new instance is required.
     */
    DynamicColumnWidthLogic = /** @class */ (function () {
        function DynamicColumnWidthLogic(strategy) {
            this.strategy = strategy;
            this.cols = new Map();
            this._minimumRowWidth = 0;
        }
        Object.defineProperty(DynamicColumnWidthLogic.prototype, "minimumRowWidth", {
            get: /**
             * @return {?}
             */
            function () { return this._minimumRowWidth; },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
         */
        /**
         * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
         * @param {?} columnInfo
         * @return {?}
         */
        DynamicColumnWidthLogic.prototype.widthBreakout = /**
         * Returns a breakout of the width of the column, breaking it into the width of the content and the rest of the width
         * @param {?} columnInfo
         * @return {?}
         */
        function (columnInfo) {
            /** @type {?} */
            var nonContent = this.strategy.cell(columnInfo);
            return {
                content: columnInfo.width - nonContent,
                nonContent: nonContent,
            };
        };
        /**
         * Add a column to the calculation.
         *
         * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
         * If the max width lock has changed the `maxWidthLockChanged` is set to true.
         *
         * A column that was previously added is ignored.
         *
         * Note that once `maxWidthLockChanged` is set to true it will never change.
         */
        /**
         * Add a column to the calculation.
         *
         * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
         * If the max width lock has changed the `maxWidthLockChanged` is set to true.
         *
         * A column that was previously added is ignored.
         *
         * Note that once `maxWidthLockChanged` is set to true it will never change.
         * @param {?} columnInfo
         * @return {?}
         */
        DynamicColumnWidthLogic.prototype.addColumn = /**
         * Add a column to the calculation.
         *
         * The operation will update the minimum required width and trigger a `checkMaxWidthLock` on the column.
         * If the max width lock has changed the `maxWidthLockChanged` is set to true.
         *
         * A column that was previously added is ignored.
         *
         * Note that once `maxWidthLockChanged` is set to true it will never change.
         * @param {?} columnInfo
         * @return {?}
         */
        function (columnInfo) {
            if (!this.cols.has(columnInfo)) {
                var column = columnInfo.column;
                /** @type {?} */
                var minWidth = column.minWidth || 0;
                if (column.isFixedWidth) {
                    minWidth = Math.max(column.parsedWidth.value, minWidth);
                }
                /** @type {?} */
                var nonContent = this.strategy.cell(columnInfo);
                /** @type {?} */
                var width = minWidth + nonContent;
                this.cols.set(columnInfo, width);
                this._minimumRowWidth += width;
                if (column.maxWidth) {
                    /** @type {?} */
                    var actualWidth = columnInfo.width - nonContent;
                    if (column.checkMaxWidthLock(actualWidth)) {
                        this.maxWidthLockChanged = true;
                    }
                }
            }
        };
        /**
         * Run each of the columns through `addColumn` and returns the sum of the width all columns using
         * the box model space strategy.
         *
         * The result represents the absolute width to be used in a `PblColumnGroup`.
         *
         * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
         * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
         */
        /**
         * Run each of the columns through `addColumn` and returns the sum of the width all columns using
         * the box model space strategy.
         *
         * The result represents the absolute width to be used in a `PblColumnGroup`.
         *
         * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
         * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
         * @param {?} columnInfos
         * @return {?}
         */
        DynamicColumnWidthLogic.prototype.addGroup = /**
         * Run each of the columns through `addColumn` and returns the sum of the width all columns using
         * the box model space strategy.
         *
         * The result represents the absolute width to be used in a `PblColumnGroup`.
         *
         * > Note that when a table has multiple column-group rows each column is the child of multiple group column, hence calling `addColumn` with the
         * same group more then once. However, since `addColumn()` ignores columns it already processed it is safe.
         * @param {?} columnInfos
         * @return {?}
         */
        function (columnInfos) {
            var e_1, _a;
            /** @type {?} */
            var sum = 0;
            try {
                for (var columnInfos_1 = __values(columnInfos), columnInfos_1_1 = columnInfos_1.next(); !columnInfos_1_1.done; columnInfos_1_1 = columnInfos_1.next()) {
                    var c = columnInfos_1_1.value;
                    this.addColumn(c);
                    sum += c.width;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columnInfos_1_1 && !columnInfos_1_1.done && (_a = columnInfos_1.return)) _a.call(columnInfos_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            sum -= this.strategy.group(columnInfos);
            return sum;
        };
        return DynamicColumnWidthLogic;
    }());
    if (false) {
        /**
         * When true, it indicates that one (or more) columns has changed the max width lock state.
         * \@readonly
         * @type {?}
         */
        DynamicColumnWidthLogic.prototype.maxWidthLockChanged;
        /**
         * @type {?}
         * @private
         */
        DynamicColumnWidthLogic.prototype.cols;
        /**
         * @type {?}
         * @private
         */
        DynamicColumnWidthLogic.prototype._minimumRowWidth;
        /**
         * @type {?}
         * @private
         */
        DynamicColumnWidthLogic.prototype.strategy;
        /* Skipping unhandled member: ;*/
    }
    /** @type {?} */
    var DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY = {
        cell: /**
         * @param {?} col
         * @return {?}
         */
        function (col) {
            /** @type {?} */
            var style = col.style;
            return parseInt(style.paddingLeft) + parseInt(style.paddingRight);
        },
        groupCell: /**
         * @param {?} col
         * @return {?}
         */
        function (col) {
            return 0;
        },
        group: /**
         * @param {?} cols
         * @return {?}
         */
        function (cols) {
            /** @type {?} */
            var len = cols.length;
            return len > 0 ? parseInt(cols[0].style.paddingLeft) + parseInt(cols[len - 1].style.paddingRight) : 0;
        }
    };

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function AutoSizeToFitOptions() { }
    if (false) {
        /**
         * When `px` will force all columns width to be in fixed pixels
         * When `%` will force all column width to be in %
         * otherwise (default) the width will be set in the same format it was originally set.
         * e.g.: If width was `33%` the new width will also be in %, or if width not set the new width will not be set as well.
         *
         * Does not apply when columnBehavior is set and returns a value.
         * @type {?|undefined}
         */
        AutoSizeToFitOptions.prototype.forceWidthType;
        /**
         * When true will keep the `minWidth` column definition (when set), otherwise will clear it.
         * Does not apply when columnBehavior is set and returns a value.
         * @type {?|undefined}
         */
        AutoSizeToFitOptions.prototype.keepMinWidth;
        /**
         * When true will keep the `maxWidth` column definition (when set), otherwise will clear it.
         * Does not apply when columnBehavior is set and returns a value.
         * @type {?|undefined}
         */
        AutoSizeToFitOptions.prototype.keepMaxWidth;
        /**
         * A function for per-column fine tuning of the process.
         * The function receives the `PblColumn`, its relative width (in %, 0 to 1) and total width (in pixels) and should return
         * an object describing how it should auto fit.
         *
         * When the function returns undefined the options are taken from the root.
         * @param {?} column
         * @return {?}
         */
        AutoSizeToFitOptions.prototype.columnBehavior = function (column) { };
    }
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    ColumnApi = /** @class */ (function () {
        function ColumnApi() {
        }
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} table
         * @param {?} store
         * @param {?} extApi
         * @return {?}
         */
        ColumnApi.create = 
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} table
         * @param {?} store
         * @param {?} extApi
         * @return {?}
         */
        function (table, store, extApi) {
            /** @type {?} */
            var instance = new ColumnApi();
            instance.table = table;
            instance.store = store;
            instance.extApi = extApi;
            return instance;
        };
        Object.defineProperty(ColumnApi.prototype, "groupByColumns", {
            get: /**
             * @return {?}
             */
            function () { return this.store.groupBy; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "visibleColumnIds", {
            get: /**
             * @return {?}
             */
            function () { return this.store.columnIds; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "visibleColumns", {
            get: /**
             * @return {?}
             */
            function () { return this.store.columns; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ColumnApi.prototype, "columns", {
            get: /**
             * @return {?}
             */
            function () { return this.store.allColumns; },
            enumerable: true,
            configurable: true
        });
        /**
         * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
         */
        /**
         * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
         * @param {?} renderColumnIndex
         * @return {?}
         */
        ColumnApi.prototype.findColumnAt = /**
         * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
         * @param {?} renderColumnIndex
         * @return {?}
         */
        function (renderColumnIndex) {
            return this.store.columns[renderColumnIndex];
        };
        /**
         * Returns the column matching provided `id`.
         *
         * The search is performed on all known columns.
         */
        /**
         * Returns the column matching provided `id`.
         *
         * The search is performed on all known columns.
         * @param {?} id
         * @return {?}
         */
        ColumnApi.prototype.findColumn = /**
         * Returns the column matching provided `id`.
         *
         * The search is performed on all known columns.
         * @param {?} id
         * @return {?}
         */
        function (id) {
            /** @type {?} */
            var result = this.store.find(id);
            if (result) {
                return result.data;
            }
        };
        /**
        * Returns the render index of column or -1 if not found.
        *
        * The render index represents the current location of the column in the group of visible columns.
        */
        /**
         * Returns the render index of column or -1 if not found.
         *
         * The render index represents the current location of the column in the group of visible columns.
         * @param {?} column
         * @return {?}
         */
        ColumnApi.prototype.renderIndexOf = /**
         * Returns the render index of column or -1 if not found.
         *
         * The render index represents the current location of the column in the group of visible columns.
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var c = typeof column === 'string' ? this.findColumn(column) : column;
            return this.store.columns.indexOf(c);
        };
        /**
         * Returns the index of a column or -1 if not found.
         */
        /**
         * Returns the index of a column or -1 if not found.
         * @param {?} column
         * @return {?}
         */
        ColumnApi.prototype.indexOf = /**
         * Returns the index of a column or -1 if not found.
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var c = typeof column === 'string' ? this.findColumn(column) : column;
            return this.store.allColumns.indexOf(c);
        };
        /**
         * Update the width of the column with the provided width.
         *
         * The width is set in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         *
         * Resizing the column will trigger a table width resizing event, updating column group if necessary.
         */
        /**
         * Update the width of the column with the provided width.
         *
         * The width is set in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         *
         * Resizing the column will trigger a table width resizing event, updating column group if necessary.
         * @param {?} column
         * @param {?} width
         * @return {?}
         */
        ColumnApi.prototype.resizeColumn = /**
         * Update the width of the column with the provided width.
         *
         * The width is set in px or % in the following format: ##% or ##px
         * Examples: '50%', '50px'
         *
         * Resizing the column will trigger a table width resizing event, updating column group if necessary.
         * @param {?} column
         * @param {?} width
         * @return {?}
         */
        function (column, width) {
            column.updateWidth(true, width);
            this.table.resetColumnsWidth();
            this.table.resizeColumns();
        };
        /**
         * Resize the column to best fit it's content.
         *
         * - Content: All of the cells rendered for this column (header, data and footer cells).
         * - Best fit: The width of the cell with the height width measured.
         *
         * The best fit found (width) is then used to call `resizeColumn()`.
         */
        /**
         * Resize the column to best fit it's content.
         *
         * - Content: All of the cells rendered for this column (header, data and footer cells).
         * - Best fit: The width of the cell with the height width measured.
         *
         * The best fit found (width) is then used to call `resizeColumn()`.
         * @param {?} column
         * @return {?}
         */
        ColumnApi.prototype.autoSizeColumn = /**
         * Resize the column to best fit it's content.
         *
         * - Content: All of the cells rendered for this column (header, data and footer cells).
         * - Best fit: The width of the cell with the height width measured.
         *
         * The best fit found (width) is then used to call `resizeColumn()`.
         * @param {?} column
         * @return {?}
         */
        function (column) {
            /** @type {?} */
            var size = this.findColumnAutoSize(column);
            this.resizeColumn(column, size + "px");
        };
        // tslint:disable-line:unified-signatures
        /**
         * @param {...?} columns
         * @return {?}
         */
        ColumnApi.prototype.autoSizeColumns = 
        // tslint:disable-line:unified-signatures
        /**
         * @param {...?} columns
         * @return {?}
         */
        function () {
            var e_1, _a;
            var columns = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                columns[_i] = arguments[_i];
            }
            /** @type {?} */
            var cols = columns.length > 0 ? columns : this.visibleColumns;
            try {
                for (var cols_1 = __values(cols), cols_1_1 = cols_1.next(); !cols_1_1.done; cols_1_1 = cols_1.next()) {
                    var column = cols_1_1.value;
                    /** @type {?} */
                    var size = this.findColumnAutoSize(column);
                    column.updateWidth(true, size + "px");
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (cols_1_1 && !cols_1_1.done && (_a = cols_1.return)) _a.call(cols_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.table.resetColumnsWidth();
            this.table.resizeColumns();
        };
        /**
         * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
         */
        /**
         * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
         * @param {?} totalWidth
         * @param {?=} options
         * @return {?}
         */
        ColumnApi.prototype.autoSizeToFit = /**
         * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
         * @param {?} totalWidth
         * @param {?=} options
         * @return {?}
         */
        function (totalWidth, options) {
            var e_2, _a;
            if (options === void 0) { options = {}; }
            /** @type {?} */
            var wLogic = this.extApi.dynamicColumnWidthFactory();
            var visibleColumns = this.visibleColumns;
            /** @type {?} */
            var columnBehavior = options.columnBehavior || (/** @type {?} */ (((/**
             * @return {?}
             */
            function () { return options; }))));
            /** @type {?} */
            var overflowTotalWidth = 0;
            /** @type {?} */
            var totalMinWidth = 0;
            /** @type {?} */
            var withMinWidth = [];
            /** @type {?} */
            var widthBreakouts = visibleColumns.map((/**
             * @param {?} column
             * @param {?} index
             * @return {?}
             */
            function (column, index) {
                /** @type {?} */
                var widthBreakout = wLogic.widthBreakout(column.sizeInfo);
                /** @type {?} */
                var instructions = columnBehavior(column) || options;
                overflowTotalWidth += widthBreakout.content;
                totalWidth -= widthBreakout.nonContent;
                if (instructions.keepMinWidth && column.minWidth) {
                    totalMinWidth += column.minWidth;
                    withMinWidth.push(index);
                }
                return __assign({}, widthBreakout, { instructions: instructions });
            }));
            /** @type {?} */
            var p = totalMinWidth / totalWidth;
            /** @type {?} */
            var level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
            try {
                for (var withMinWidth_1 = __values(withMinWidth), withMinWidth_1_1 = withMinWidth_1.next(); !withMinWidth_1_1.done; withMinWidth_1_1 = withMinWidth_1.next()) {
                    var i = withMinWidth_1_1.value;
                    /** @type {?} */
                    var addition = level * (visibleColumns[i].minWidth / totalMinWidth);
                    widthBreakouts[i].content += addition;
                    overflowTotalWidth += addition;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (withMinWidth_1_1 && !withMinWidth_1_1.done && (_a = withMinWidth_1.return)) _a.call(withMinWidth_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            /** @type {?} */
            var sum = [];
            for (var i = 0; i < visibleColumns.length; i++) {
                /** @type {?} */
                var widthBreakout = widthBreakouts[i];
                /** @type {?} */
                var instructions = widthBreakout.instructions;
                /** @type {?} */
                var column = visibleColumns[i];
                /** @type {?} */
                var r = widthBreakout.content / overflowTotalWidth;
                if (!instructions.keepMinWidth) {
                    column.minWidth = undefined;
                }
                if (!instructions.keepMaxWidth) {
                    column.maxWidth = undefined;
                    column.checkMaxWidthLock(column.sizeInfo.width); // if its locked, we need to release...
                }
                // There are 3 scenarios when updating the column
                // 1) if it's a fixed width or we're force into fixed width
                // 2) Not fixed width and width is set (%)
                // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.table.resetColumnsWidth()` )
                /** @type {?} */
                var width = void 0;
                var forceWidthType = instructions.forceWidthType;
                if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                    width = totalWidth * r + "px";
                }
                else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                    width = 100 * r + "%";
                } // else (3) -> the update is skipped and it will run through resetColumnsWidth
                if (width) {
                    // We're not updating the width width markForCheck set to true because it will be done right after in `this.table.resetColumnsWidth()`
                    column.updateWidth(false, width);
                }
            }
            // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
            // It will also mark all columnDef's for check
            this.table.resetColumnsWidth({ tableMarkForCheck: true });
            this.table.resizeColumns();
        };
        // tslint:disable-line:unified-signatures
        /**
         * @param {?} column
         * @param {?} anchor
         * @param {?=} skipRedraw
         * @return {?}
         */
        ColumnApi.prototype.moveColumn = 
        // tslint:disable-line:unified-signatures
        /**
         * @param {?} column
         * @param {?} anchor
         * @param {?=} skipRedraw
         * @return {?}
         */
        function (column, anchor, skipRedraw) {
            if (anchor instanceof PblColumn) {
                /** @type {?} */
                var result = column === anchor ? false : this.store.moveColumn(column, anchor);
                if (result && skipRedraw !== true) {
                    this.afterColumnPositionChange();
                }
                return result;
            }
            else {
                /** @type {?} */
                var a = this.findColumnAt(anchor);
                return a ? this.moveColumn(column, a) : false;
            }
        };
        /**
         * Swap positions between 2 existing columns.
         */
        /**
         * Swap positions between 2 existing columns.
         * @param {?} col1
         * @param {?} col2
         * @param {?=} skipRedraw
         * @return {?}
         */
        ColumnApi.prototype.swapColumns = /**
         * Swap positions between 2 existing columns.
         * @param {?} col1
         * @param {?} col2
         * @param {?=} skipRedraw
         * @return {?}
         */
        function (col1, col2, skipRedraw) {
            /** @type {?} */
            var result = this.store.swapColumns(col1, col2);
            if (result && skipRedraw !== true) {
                this.afterColumnPositionChange();
            }
            return result;
        };
        /**
         * @param {...?} column
         * @return {?}
         */
        ColumnApi.prototype.addGroupBy = /**
         * @param {...?} column
         * @return {?}
         */
        function () {
            var _a;
            var column = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                column[_i] = arguments[_i];
            }
            (_a = this.store).addGroupBy.apply(_a, __spread(column));
        };
        /**
         * @param {...?} column
         * @return {?}
         */
        ColumnApi.prototype.removeGroupBy = /**
         * @param {...?} column
         * @return {?}
         */
        function () {
            var _a;
            var column = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                column[_i] = arguments[_i];
            }
            (_a = this.store).removeGroupBy.apply(_a, __spread(column));
        };
        /**
         * @private
         * @param {?} column
         * @return {?}
         */
        ColumnApi.prototype.findColumnAutoSize = /**
         * @private
         * @param {?} column
         * @return {?}
         */
        function (column) {
            var e_3, _a;
            var columnDef = column.columnDef;
            /** @type {?} */
            var cells = columnDef.queryCellElements();
            /** @type {?} */
            var size = 0;
            try {
                for (var cells_1 = __values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
                    var c = cells_1_1.value;
                    /** @type {?} */
                    var element = (/** @type {?} */ ((c.firstElementChild || c)));
                    if (element.scrollWidth > size) {
                        size = element.scrollWidth + 1;
                        // we add 1 pixel because `element.scrollWidth` does not support subpixel values, the width is converted to an integer removing subpixel values (fractions).
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (cells_1_1 && !cells_1_1.done && (_a = cells_1.return)) _a.call(cells_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return size;
        };
        /**
         * @private
         * @return {?}
         */
        ColumnApi.prototype.afterColumnPositionChange = /**
         * @private
         * @return {?}
         */
        function () {
            this.extApi.contextApi.clear();
            this.store.updateGroups();
            this.table.resetColumnsWidth();
            this.table.resizeColumns();
        };
        return ColumnApi;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        ColumnApi.prototype.table;
        /**
         * @type {?}
         * @private
         */
        ColumnApi.prototype.store;
        /**
         * @type {?}
         * @private
         */
        ColumnApi.prototype.extApi;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function metaRowSectionFactory() {
        return { fixed: [], row: [], sticky: [], all: [] };
    }
    /**
     * @record
     */
    function MetaRowSection() { }
    if (false) {
        /** @type {?} */
        MetaRowSection.prototype.fixed;
        /** @type {?} */
        MetaRowSection.prototype.row;
        /** @type {?} */
        MetaRowSection.prototype.sticky;
        /** @type {?} */
        MetaRowSection.prototype.all;
    }
    /**
     * @template T
     */
    var PblNgridMetaRowService = /** @class */ (function () {
        function PblNgridMetaRowService(extApi) {
            var _this = this;
            this.extApi = extApi;
            this.header = metaRowSectionFactory();
            this.footer = metaRowSectionFactory();
            this.sync$ = new rxjs.Subject();
            this.hzScroll$ = new rxjs.Subject();
            this.sync = this.sync$ // TODO: complete
                .pipe(operators.debounceTime(0, rxjs.asapScheduler));
            this.hzScroll = this.hzScroll$.asObservable();
            extApi.onInit((/**
             * @return {?}
             */
            function () {
                var table = extApi.table;
                /** @type {?} */
                var hzOffset = table.viewport.measureScrollOffset('start');
                /** @type {?} */
                var trackScroll = true;
                table.viewport.elementScrolled()
                    .pipe(operators.filter((/**
                 * @return {?}
                 */
                function () { return trackScroll; })), operators.auditTime(0, rxjs.animationFrameScheduler))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var newOffset = table.viewport.measureScrollOffset('start');
                    if (hzOffset !== newOffset) {
                        _this.hzScroll$.next(hzOffset = newOffset);
                    }
                    else if (table.viewport.isScrolling) {
                        trackScroll = false;
                        table.viewport.scrolling
                            .pipe(operators.take(1))
                            .subscribe((/**
                         * @return {?}
                         */
                        function () { return trackScroll = true; }));
                    }
                }), null, (/**
                 * @return {?}
                 */
                function () { return _this.hzScroll$.complete(); }));
            }));
        }
        /**
         * @param {?} metaRow
         * @return {?}
         */
        PblNgridMetaRowService.prototype.addMetaRow = /**
         * @param {?} metaRow
         * @return {?}
         */
        function (metaRow) {
            var columnStore = this.extApi.columnStore;
            var _a = columnStore.metaColumnIds, header = _a.header, footer = _a.footer;
            /** @type {?} */
            var rowDef = metaRow.meta;
            if (rowDef === columnStore.footerColumnDef) {
                this.addToSection(this.footer, metaRow, 0);
            }
            else if (rowDef === columnStore.headerColumnDef) {
                this.addToSection(this.header, metaRow, columnStore.metaColumnIds.header.length);
            }
            else {
                /** @type {?} */
                var index = header.findIndex((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.rowDef === rowDef; }));
                if (index > -1) {
                    this.addToSection(this.header, metaRow, index);
                }
                else {
                    index = footer.findIndex((/**
                     * @param {?} h
                     * @return {?}
                     */
                    function (h) { return h.rowDef === rowDef; }));
                    if (index > -1) {
                        this.addToSection(this.footer, metaRow, index);
                    }
                    else {
                        throw new Error('Invalid operation');
                    }
                }
            }
            this.sync$.next();
        };
        /**
         * @param {?} metaRow
         * @return {?}
         */
        PblNgridMetaRowService.prototype.removeMetaRow = /**
         * @param {?} metaRow
         * @return {?}
         */
        function (metaRow) {
            /** @type {?} */
            var rowDef = metaRow.meta;
            /** @type {?} */
            var index = this.header.all.indexOf(metaRow.meta);
            if (index > -1) {
                this.header.all.splice(index, 1);
                index = this.header[rowDef.type].findIndex((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.rowDef === rowDef; }));
                this.header[rowDef.type].splice(index, 1);
            }
            else if ((index = this.footer.all.indexOf(metaRow.meta)) > -1) {
                this.footer.all.splice(index, 1);
                index = this.footer[rowDef.type].findIndex((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.rowDef === rowDef; }));
                this.footer[rowDef.type].splice(index, 1);
            }
        };
        /**
         * @private
         * @param {?} section
         * @param {?} metaRow
         * @param {?} index
         * @return {?}
         */
        PblNgridMetaRowService.prototype.addToSection = /**
         * @private
         * @param {?} section
         * @param {?} metaRow
         * @param {?} index
         * @return {?}
         */
        function (section, metaRow, index) {
            /** @type {?} */
            var rowDef = metaRow.meta;
            section[rowDef.type].push({ index: index, rowDef: rowDef, el: metaRow.elRef.nativeElement });
            section.all.push(rowDef);
        };
        PblNgridMetaRowService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PblNgridMetaRowService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [EXT_API_TOKEN,] }] }
        ]; };
        return PblNgridMetaRowService;
    }());
    if (false) {
        /** @type {?} */
        PblNgridMetaRowService.prototype.header;
        /** @type {?} */
        PblNgridMetaRowService.prototype.footer;
        /** @type {?} */
        PblNgridMetaRowService.prototype.sync;
        /** @type {?} */
        PblNgridMetaRowService.prototype.hzScroll;
        /**
         * @type {?}
         * @private
         */
        PblNgridMetaRowService.prototype.sync$;
        /**
         * @type {?}
         * @private
         */
        PblNgridMetaRowService.prototype.hzScroll$;
        /** @type {?} */
        PblNgridMetaRowService.prototype.extApi;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridMetaRowContainerComponent = /** @class */ (function () {
        function PblNgridMetaRowContainerComponent(metaRows, elRef) {
            var _this = this;
            this.metaRows = metaRows;
            this.element = elRef.nativeElement;
            metaRows.sync.pipe(utils$1.UnRx(this)).subscribe((/**
             * @return {?}
             */
            function () { return _this.syncRowDefinitions(); }));
            this.metaRows.extApi.events
                .pipe(utils$1.UnRx(this))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onResizeRow') {
                    _this._innerWidth = _this.metaRows.extApi.table.viewport.innerWidth;
                    _this._minWidth = _this.metaRows.extApi.cdkTable.minWidth;
                    _this._width = Math.max(_this._innerWidth, _this._minWidth);
                }
            }));
        }
        Object.defineProperty(PblNgridMetaRowContainerComponent.prototype, "type", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._type !== value) {
                    this.init(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * @private
         * @param {?} type
         * @return {?}
         */
        PblNgridMetaRowContainerComponent.prototype.init = /**
         * @private
         * @param {?} type
         * @return {?}
         */
        function (type) {
            var _this = this;
            if (type === 'header') {
                this._type = type;
            }
            else {
                this._type = 'footer';
            }
            /** @type {?} */
            var scrollContainerElement = this.element;
            scrollContainerElement.scrollLeft = this.metaRows.extApi.table.viewport.measureScrollOffset('start');
            this.metaRows.hzScroll
                .pipe(utils$1.UnRx(this))
                .subscribe((/**
             * @param {?} offset
             * @return {?}
             */
            function (offset) { return scrollContainerElement.scrollLeft = offset; }));
            this.metaRows.extApi.cdkTable.onRenderRows
                .pipe(utils$1.UnRx(this))
                .subscribe((/**
             * @return {?}
             */
            function () {
                _this._innerWidth = _this.metaRows.extApi.table.viewport.innerWidth;
                _this._width = Math.max(_this._innerWidth, _this._minWidth);
            }));
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridMetaRowContainerComponent.prototype.syncRowDefinitions = /**
         * @private
         * @return {?}
         */
        function () {
            var e_1, _a;
            this.defs = [];
            /** @type {?} */
            var isHeader = this._type === 'header';
            /** @type {?} */
            var section = isHeader ? this.metaRows.header : this.metaRows.footer;
            /** @type {?} */
            var container = this.element.firstElementChild;
            try {
                for (var _b = __values(section.fixed), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var def = _c.value;
                    this.defs.push(def);
                    container.appendChild(def.el);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        PblNgridMetaRowContainerComponent.ctorParameters = function () { return [
            { type: PblNgridMetaRowService },
            { type: core.ElementRef }
        ]; };
        PblNgridMetaRowContainerComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'div[pbl-ngrid-fixed-meta-row-container]',
                        template: "<div class=\"pbl-cdk-table\" [style.width.px]=\"_width\"></div>",
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            style: 'flex: 0 0 auto; overflow: hidden;',
                            '[style.width.px]': '_innerWidth',
                        }
                    }] }
        ];
        /** @nocollapse */
        PblNgridMetaRowContainerComponent.ctorParameters = function () { return [
            { type: PblNgridMetaRowService },
            { type: core.ElementRef }
        ]; };
        PblNgridMetaRowContainerComponent.propDecorators = {
            type: [{ type: core.Input, args: ['pbl-ngrid-fixed-meta-row-container',] }]
        };
        PblNgridMetaRowContainerComponent = __decorate([
            utils$1.UnRx(),
            __metadata("design:paramtypes", [PblNgridMetaRowService, core.ElementRef])
        ], PblNgridMetaRowContainerComponent);
        return PblNgridMetaRowContainerComponent;
    }());
    if (false) {
        /**
         * The inner width of the table, the viewport width of a row.
         * The width of the table minus scroll bar.
         * @type {?}
         */
        PblNgridMetaRowContainerComponent.prototype._innerWidth;
        /** @type {?} */
        PblNgridMetaRowContainerComponent.prototype._minWidth;
        /** @type {?} */
        PblNgridMetaRowContainerComponent.prototype._width;
        /**
         * @type {?}
         * @private
         */
        PblNgridMetaRowContainerComponent.prototype._type;
        /**
         * @type {?}
         * @private
         */
        PblNgridMetaRowContainerComponent.prototype.defs;
        /**
         * @type {?}
         * @private
         */
        PblNgridMetaRowContainerComponent.prototype.element;
        /** @type {?} */
        PblNgridMetaRowContainerComponent.prototype.metaRows;
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblMetaRowDirective = /** @class */ (function () {
        function PblMetaRowDirective(metaRows, elRef) {
            this.metaRows = metaRows;
            this.elRef = elRef;
        }
        Object.defineProperty(PblMetaRowDirective.prototype, "meta", {
            // tslint:disable-next-line:no-input-rename
            get: 
            // tslint:disable-next-line:no-input-rename
            /**
             * @return {?}
             */
            function () { return this._meta; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this._meta) {
                    this.update(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblMetaRowDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.metaRows.removeMetaRow(this);
        };
        /**
         * @private
         * @param {?} meta
         * @return {?}
         */
        PblMetaRowDirective.prototype.update = /**
         * @private
         * @param {?} meta
         * @return {?}
         */
        function (meta) {
            /** @type {?} */
            var oldMeta = this._meta;
            if (oldMeta) {
                if (oldMeta.rowClassName) {
                    this.elRef.nativeElement.classList.remove(oldMeta.rowClassName);
                }
                this.metaRows.removeMetaRow(this);
            }
            this._meta = meta;
            if (meta) {
                if (meta.rowClassName) {
                    this.elRef.nativeElement.classList.add(meta.rowClassName);
                }
                this.metaRows.addMetaRow(this);
            }
        };
        PblMetaRowDirective.ctorParameters = function () { return [
            { type: PblNgridMetaRowService },
            { type: core.ElementRef }
        ]; };
        PblMetaRowDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblMetaRow]',
                    },] }
        ];
        /** @nocollapse */
        PblMetaRowDirective.ctorParameters = function () { return [
            { type: PblNgridMetaRowService },
            { type: core.ElementRef }
        ]; };
        PblMetaRowDirective.propDecorators = {
            meta: [{ type: core.Input, args: ['pblMetaRow',] }]
        };
        PblMetaRowDirective = __decorate([
            utils$1.UnRx(),
            __metadata("design:paramtypes", [PblNgridMetaRowService, core.ElementRef])
        ], PblMetaRowDirective);
        return PblMetaRowDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblMetaRowDirective.prototype._meta;
        /** @type {?} */
        PblMetaRowDirective.prototype.metaRows;
        /** @type {?} */
        PblMetaRowDirective.prototype.elRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} plugin
     * @return {?}
     */
    function bindToDataSource(plugin) {
        plugin.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onDataSource') {
                var curr = event.curr, prev = event.prev;
                if (prev && prev.hostGrid === plugin.table) {
                    prev.hostGrid = undefined;
                }
                if (curr) {
                    curr.hostGrid = plugin.table;
                }
            }
            else if (event.kind === 'onDestroy') {
                /** @type {?} */
                var ds = plugin.table.ds;
                if (ds.hostGrid === plugin.table) {
                    ds.hostGrid = undefined;
                }
            }
        }));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} store
     * @param {?} identityProp
     * @return {?}
     */
    function setIdentityProp(store, identityProp) {
        if (store.allColumns.length > 0 && identityProp) {
            // STATES:
            //    1: identityProp but also primary
            //    2: identityProp, no primary, AND not found
            //    3: identityProp, no primary but found.
            /** @type {?} */
            var state = 1;
            if (!store.primary) {
                state = 2;
                /** @type {?} */
                var column = store.find(identityProp);
                if (column && column.data) {
                    state = 3;
                    store['_primary'] = column.data;
                }
            }
            if (core.isDevMode()) {
                /** @type {?} */
                var genericMsg = "The [identityProp] input is deprecated, please remove it and use \"pIndex\" on the column definition instead.";
                switch (state) {
                    case 1:
                        console.warn(genericMsg + "\nFound column \"" + store.primary.id + "\" defined with the new method (pIndex), ignoring \"" + identityProp + "\" set in [identityProp]");
                        break;
                    case 2:
                        console.warn(genericMsg + "\nCould not find a column defined with the new method (pIndex).\nTrying to locate the column \"" + identityProp + "\" defined in [identityProp] FAILED! with no match.\nAN IDENTITY COLUMN WAS NOT SET");
                        break;
                    case 3:
                        console.warn(genericMsg + "\nCould not find a column defined with the new method (pIndex).\nTrying to locate the column \"" + identityProp + "\" defined in [identityProp] SUCCEEDED!.\nUSING \"" + identityProp + "\" AS THE IDENTITY COLUMN.");
                        break;
                }
            }
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} table
     * @return {?}
     */
    function internalApiFactory(table) { return table._extApi; }
    /**
     * @param {?} table
     * @return {?}
     */
    function pluginControllerFactory(table) { return table._plugin.controller; }
    /**
     * @param {?} table
     * @return {?}
     */
    function metaRowServiceFactory(table) { return table._extApi.metaRowService; }
    /**
     * @template T
     */
    var PblNgridComponent = /** @class */ (function () {
        function PblNgridComponent(injector, vcRef, elRef, differs, ngZone, cdr, config, registry, id) {
            this.elRef = elRef;
            this.differs = differs;
            this.ngZone = ngZone;
            this.cdr = cdr;
            this.config = config;
            this.registry = registry;
            this.id = id;
            this.rowClassUpdateFreq = 'item';
            this.rowFocus = '';
            this.cellFocus = '';
            this._fallbackMinHeight = 0;
            this._store = new PblColumnStore();
            this._noCachePaginator = false;
            /** @type {?} */
            var tableConfig = config.get('table');
            this.showHeader = tableConfig.showHeader;
            this.showFooter = tableConfig.showFooter;
            this.noFiller = tableConfig.noFiller;
            this.initExtApi();
            this.columnApi = ColumnApi.create(this, this._store, this._extApi);
            this.initPlugins(injector, elRef, vcRef);
        }
        PblNgridComponent_1 = PblNgridComponent;
        Object.defineProperty(PblNgridComponent.prototype, "showHeader", {
            /**
             * Show/Hide the header row.
             * Default: true
             */
            get: /**
             * Show/Hide the header row.
             * Default: true
             * @return {?}
             */
            function () { return this._showHeader; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._showHeader = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "showFooter", {
            /**
             * Show/Hide the footer row.
             * Default: false
             */
            get: /**
             * Show/Hide the footer row.
             * Default: false
             * @return {?}
             */
            function () { return this._showFooter; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._showFooter = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "noFiller", {
            /**
             * When true, the filler is disabled.
             */
            get: /**
             * When true, the filler is disabled.
             * @return {?}
             */
            function () { return this._noFiller; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._noFiller = coercion.coerceBooleanProperty(value);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "identityProp", {
            /// TODO(shlomiassaf): Remove in 1.0.0
            /**
             * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
             */
            get: 
            /// TODO(shlomiassaf): Remove in 1.0.0
            /**
             * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
             * @return {?}
             */
            function () { return this.__identityProp; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.__identityProp = value; setIdentityProp(this._store, value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "dataSource", {
            /**
             * The table's source of data
             *
             * @remarks
             * The table's source of data, which can be provided in 2 ways:
             *
             * - DataSourceOf<T>
             * - PblDataSource<T>
             *
             * The table only works with `PblDataSource<T>`, `DataSourceOf<T>` is a shortcut for providing
             * the data array directly.
             *
             * `DataSourceOf<T>` can be:
             *
             * - Simple data array (each object represents one table row)
             * - Promise for a data array
             * - Stream that emits a data array each time the array changes
             *
             * When a `DataSourceOf<T>` is provided it is converted into an instance of `PblDataSource<T>`.
             *
             * To access the `PblDataSource<T>` instance use the `ds` property (readonly).
             *
             * It is highly recommended to use `PblDataSource<T>` directly, the datasource factory makes it easy.
             * For example, when an array is provided the factory is used to convert it to a datasource:
             *
             * ```typescript
             * const collection: T[] = [];
             * const pblDataSource = createDS<T>().onTrigger( () => collection ).create();
             * ```
             *
             * > This is a write-only (setter) property that triggers the `setDataSource` method.
             */
            set: /**
             * The table's source of data
             *
             * \@remarks
             * The table's source of data, which can be provided in 2 ways:
             *
             * - DataSourceOf<T>
             * - PblDataSource<T>
             *
             * The table only works with `PblDataSource<T>`, `DataSourceOf<T>` is a shortcut for providing
             * the data array directly.
             *
             * `DataSourceOf<T>` can be:
             *
             * - Simple data array (each object represents one table row)
             * - Promise for a data array
             * - Stream that emits a data array each time the array changes
             *
             * When a `DataSourceOf<T>` is provided it is converted into an instance of `PblDataSource<T>`.
             *
             * To access the `PblDataSource<T>` instance use the `ds` property (readonly).
             *
             * It is highly recommended to use `PblDataSource<T>` directly, the datasource factory makes it easy.
             * For example, when an array is provided the factory is used to convert it to a datasource:
             *
             * ```typescript
             * const collection: T[] = [];
             * const pblDataSource = createDS<T>().onTrigger( () => collection ).create();
             * ```
             *
             * > This is a write-only (setter) property that triggers the `setDataSource` method.
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value instanceof PblDataSource) {
                    this.setDataSource(value);
                }
                else {
                    this.setDataSource(createDS().onTrigger((/**
                     * @return {?}
                     */
                    function () { return value || []; })).create());
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "ds", {
            get: /**
             * @return {?}
             */
            function () { return this._dataSource; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridComponent.prototype, "usePagination", {
            get: /**
             * @return {?}
             */
            function () { return this._pagination; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (((/** @type {?} */ (value))) === '') {
                    value = 'pageNumber';
                }
                if (value !== this._pagination) {
                    this._pagination = value;
                    this.setupPaginator();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "noCachePaginator", {
            get: /**
             * @return {?}
             */
            function () { return this._noCachePaginator; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = coercion.coerceBooleanProperty(value);
                if (this._noCachePaginator !== value) {
                    this._noCachePaginator = value;
                    if (this.ds && this.ds.paginator) {
                        this.ds.paginator.noCacheMode = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "hideColumns", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._hideColumns = value;
                this._hideColumnsDirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "fallbackMinHeight", {
            /**
             * A fallback height for "the inner scroll container".
             * The fallback is used only when it LOWER than the rendered height, so no empty gaps are created when setting the fallback.
             *
             * The "inner scroll container" is the area in which all data rows are rendered and all meta (header/footer) rows that are of type "row" or "sticky".
             * The "inner scroll container" is defined to consume all the height left after all external objects are rendered.
             * External objects can be fixed meta rows (header/footer), pagination row, action row etc...
             *
             * If the table does not have a height (% or px) the "inner scroll container" will always have no height (0).
             * If the table has a height, the "inner scroll container" will get the height left, which can also be 0 if there are a lot of external objects.
             *
             * To solve the no-height problem we use the fallbackMinHeight property.
             *
             * When virtual scroll is disabled and fallbackMinHeight is not set the table will set the "inner scroll container" height to show all rows.
             *
             * Note that when using a fixed (px) height for the table, if the height of all external objects + the height of the "inner scroll container" is greater then
             * the table's height a vertical scroll bar will show.
             * If the "inner scroll container"s height will be lower then it's rendered content height and additional vertical scroll bar will appear, which is, usually, not good.
             *
             * To avoid this, don't use fallbackMinHeight together with a fixed height for the table. Instead use fallbackMinHeight together with a min height for the table.
             */
            get: /**
             * A fallback height for "the inner scroll container".
             * The fallback is used only when it LOWER than the rendered height, so no empty gaps are created when setting the fallback.
             *
             * The "inner scroll container" is the area in which all data rows are rendered and all meta (header/footer) rows that are of type "row" or "sticky".
             * The "inner scroll container" is defined to consume all the height left after all external objects are rendered.
             * External objects can be fixed meta rows (header/footer), pagination row, action row etc...
             *
             * If the table does not have a height (% or px) the "inner scroll container" will always have no height (0).
             * If the table has a height, the "inner scroll container" will get the height left, which can also be 0 if there are a lot of external objects.
             *
             * To solve the no-height problem we use the fallbackMinHeight property.
             *
             * When virtual scroll is disabled and fallbackMinHeight is not set the table will set the "inner scroll container" height to show all rows.
             *
             * Note that when using a fixed (px) height for the table, if the height of all external objects + the height of the "inner scroll container" is greater then
             * the table's height a vertical scroll bar will show.
             * If the "inner scroll container"s height will be lower then it's rendered content height and additional vertical scroll bar will appear, which is, usually, not good.
             *
             * To avoid this, don't use fallbackMinHeight together with a fixed height for the table. Instead use fallbackMinHeight together with a min height for the table.
             * @return {?}
             */
            function () { return this._fallbackMinHeight; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = coercion.coerceNumberProperty(value);
                if (this._fallbackMinHeight !== value) {
                    this._fallbackMinHeight = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "metaColumnIds", {
            get: /**
             * @return {?}
             */
            function () { return this._store.metaColumnIds; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "metaColumns", {
            get: /**
             * @return {?}
             */
            function () { return this._store.metaColumns; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "columnRowDef", {
            get: /**
             * @return {?}
             */
            function () { return { header: this._store.headerColumnDef, footer: this._store.footerColumnDef }; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "contextApi", {
            get: /**
             * @return {?}
             */
            function () { return this._extApi.contextApi; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridComponent.prototype, "viewport", {
            get: /**
             * @return {?}
             */
            function () { return this._viewport; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            if (this._hideColumnsDirty) {
                this._hideColumnsDirty = false;
                /** @type {?} */
                var value = this._hideColumns;
                if (!this._colHideDiffer && value) {
                    try {
                        this._colHideDiffer = this.differs.find(value).create();
                    }
                    catch (e) {
                        throw new Error("Cannot find a differ supporting object '" + value + ". hideColumns only supports binding to Iterables such as Arrays.");
                    }
                }
            }
            if (this._colHideDiffer) {
                /** @type {?} */
                var hideColumns = this._hideColumns || [];
                /** @type {?} */
                var changes = this._colHideDiffer.diff(hideColumns);
                if (changes) {
                    this._store.hidden = hideColumns;
                    this._minimumRowWidth = '';
                    // TODO(shlomiassaf) [perf, 4]: Right now we attach all columns, we can improve it by attaching only those "added" (we know them from "changes")
                    this.attachCustomCellTemplates();
                    this.attachCustomHeaderCellTemplates();
                    this._cdkTable.syncRows('header');
                }
                if (!this._hideColumns) {
                    this._colHideDiffer = undefined;
                }
            }
        };
        /**
         * @return {?}
         */
        PblNgridComponent.prototype.ngAfterContentInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // no need to unsubscribe, the reg service is per table instance and it will destroy when this table destroy.
            // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
            // the order here is very important, because component top of this table will fire life cycle hooks AFTER this component
            // so if we have a top level component registering a template on top it will not show unless we listen.
            this.registry.changes.subscribe((/**
             * @param {?} changes
             * @return {?}
             */
            function (changes) {
                var e_1, _a;
                /** @type {?} */
                var tableCell = false;
                /** @type {?} */
                var headerFooterCell = false;
                try {
                    for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                        var c = changes_1_1.value;
                        switch (c.type) {
                            case 'tableCell':
                                tableCell = true;
                                break;
                            case 'headerCell':
                            case 'footerCell':
                                headerFooterCell = true;
                                break;
                            case 'noData':
                                _this.setupNoData();
                                break;
                            case 'paginator':
                                _this.setupPaginator();
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
                if (tableCell) {
                    _this.attachCustomCellTemplates();
                }
                if (headerFooterCell) {
                    _this.attachCustomHeaderCellTemplates();
                }
            }));
        };
        /**
         * @return {?}
         */
        PblNgridComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.invalidateColumns();
            Object.defineProperty(this, 'isInit', { value: true });
            this._plugin.emitEvent({ kind: 'onInit' });
            this.setupPaginator();
            // Adding a div before the footer row view reference, this div will be used to fill up the space between header & footer rows
            /** @type {?} */
            var div = document.createElement('div');
            div.classList.add('pbl-ngrid-empty-spacer');
            this._cdkTable._element.insertBefore(div, this._cdkTable._footerRowOutlet.elementRef.nativeElement);
            this.listenToResize();
            // The following code will catch context focused events, find the HTML element of the cell and focus it.
            this.contextApi.focusChanged
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.curr) {
                    /** @type {?} */
                    var rowContext = _this.contextApi.findRowInView(event.curr.rowIdent);
                    if (rowContext) {
                        /** @type {?} */
                        var view = (/** @type {?} */ (_this._cdkTable._rowOutlet.viewContainer.get(rowContext.index)));
                        if (view) {
                            /** @type {?} */
                            var cellViewIndex = _this.columnApi.renderIndexOf(_this.columnApi.columns[event.curr.colIndex]);
                            /** @type {?} */
                            var cellElement = view.rootNodes[0].querySelectorAll('pbl-ngrid-cell')[cellViewIndex];
                            if (cellElement) {
                                cellElement.focus();
                            }
                        }
                    }
                }
            }));
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PblNgridComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            /** @type {?} */
            var processColumns = false;
            if (changes.focusMode) {
                this.rowFocus = this.focusMode === 'row' ? 0 : '';
                this.cellFocus = this.focusMode === 'cell' ? 0 : '';
            }
            if (changes.columns && this.isInit) {
                processColumns = true;
            }
            if (processColumns === true) {
                this.invalidateColumns();
            }
        };
        /**
         * @return {?}
         */
        PblNgridComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var destroy = (/**
             * @return {?}
             */
            function () {
                _this._plugin.destroy();
                if (_this._viewport) {
                    _this._cdkTable.detachViewPort();
                }
            });
            /** @type {?} */
            var p;
            this._plugin.emitEvent({ kind: 'onDestroy', wait: (/**
                 * @param {?} _p
                 * @return {?}
                 */
                function (_p) { return p = _p; }) });
            if (p) {
                p.then(destroy).catch(destroy);
            }
            else {
                destroy();
            }
        };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        PblNgridComponent.prototype.trackBy = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        function (index, item) {
            return index;
        };
        /**
         * @param {?=} columnOrSortAlias
         * @param {?=} sort
         * @param {?=} skipUpdate
         * @return {?}
         */
        PblNgridComponent.prototype.setSort = /**
         * @param {?=} columnOrSortAlias
         * @param {?=} sort
         * @param {?=} skipUpdate
         * @return {?}
         */
        function (columnOrSortAlias, sort, skipUpdate) {
            if (skipUpdate === void 0) { skipUpdate = false; }
            if (!columnOrSortAlias || typeof columnOrSortAlias === 'boolean') {
                this.ds.setSort(!!columnOrSortAlias);
                return;
            }
            /** @type {?} */
            var column;
            if (typeof columnOrSortAlias === 'string') {
                column = this._store.columns.find((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.alias ? c.alias === columnOrSortAlias : (c.sort && c.id === columnOrSortAlias); }));
                if (!column && core.isDevMode()) {
                    console.warn("Could not find column with alias \"" + columnOrSortAlias + "\".");
                    return;
                }
            }
            else {
                column = columnOrSortAlias;
            }
            this.ds.setSort(column, sort, skipUpdate);
        };
        /**
         * @param {?=} value
         * @param {?=} columns
         * @return {?}
         */
        PblNgridComponent.prototype.setFilter = /**
         * @param {?=} value
         * @param {?=} columns
         * @return {?}
         */
        function (value, columns) {
            var e_2, _a;
            if (arguments.length > 0) {
                /** @type {?} */
                var columnInstances = void 0;
                if (Array.isArray(columns) && typeof columns[0] === 'string') {
                    columnInstances = [];
                    var _loop_1 = function (colId) {
                        /** @type {?} */
                        var column = this_1._store.columns.find((/**
                         * @param {?} c
                         * @return {?}
                         */
                        function (c) { return c.alias ? c.alias === colId : (c.id === colId); }));
                        if (!column && core.isDevMode()) {
                            console.warn("Could not find column with alias " + colId + " \"" + colId + "\".");
                            return { value: void 0 };
                        }
                        columnInstances.push(column);
                    };
                    var this_1 = this;
                    try {
                        for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                            var colId = columns_1_1.value;
                            var state_1 = _loop_1(colId);
                            if (typeof state_1 === "object")
                                return state_1.value;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
                else {
                    columnInstances = (/** @type {?} */ (columns));
                }
                this.ds.setFilter(value, columnInstances);
            }
            else {
                this.ds.setFilter();
            }
        };
        /**
         * @param {?} value
         * @return {?}
         */
        PblNgridComponent.prototype.setDataSource = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this._dataSource !== value) {
                // KILL ALL subscriptions for the previous datasource.
                if (this._dataSource) {
                    utils$1.UnRx.kill(this, this._dataSource);
                }
                /** @type {?} */
                var prev = this._dataSource;
                this._dataSource = value;
                this._cdkTable.dataSource = (/** @type {?} */ (value));
                this.setupPaginator();
                this.setupNoData(false);
                // clear the context, new datasource
                this._extApi.contextApi.clear();
                this._plugin.emitEvent({
                    kind: 'onDataSource',
                    prev: prev,
                    curr: value
                });
                if (value) {
                    if (core.isDevMode()) {
                        value.onError.pipe(utils$1.UnRx(this, value)).subscribe(console.error.bind(console));
                    }
                    // We register to this event because it fires before the entire data-changing process starts.
                    // This is required because `onRenderDataChanging` is fired async, just before the data is emitted.
                    // Its not enough to clear the context when `setDataSource` is called, we also need to handle `refresh` calls which will not
                    // trigger this method.
                    value.onSourceChanging.pipe(utils$1.UnRx(this, value)).subscribe((/**
                     * @return {?}
                     */
                    function () { return _this._extApi.contextApi.clear(); }));
                    // Run CD, scheduled as a micro-task, after each rendering
                    value.onRenderDataChanging
                        .pipe(operators.filter((/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var event = _a.event;
                        return !event.isInitial && (event.pagination.changed || event.sort.changed || event.filter.changed);
                    })), 
                    // Context between the operations are not supported at the moment
                    // Event for client side operations...
                    // TODO: can we remove this? we clear the context with `onSourceChanging`
                    operators.tap((/**
                     * @return {?}
                     */
                    function () { return !_this._store.primary && _this._extApi.contextApi.clear(); })), operators.switchMap((/**
                     * @return {?}
                     */
                    function () { return value.onRenderedDataChanged.pipe(operators.take(1), operators.mapTo(_this.ds.renderLength)); })), operators.observeOn(rxjs.asapScheduler), utils$1.UnRx(this, value))
                        .subscribe((/**
                     * @param {?} previousRenderLength
                     * @return {?}
                     */
                    function (previousRenderLength) {
                        // If the number of rendered items has changed the table will update the data and run CD on it.
                        // so we only update the rows.
                        var cdkTable = _this._extApi.cdkTable;
                        if (previousRenderLength === _this.ds.renderLength) {
                            cdkTable.syncRows(true);
                        }
                        else {
                            cdkTable.syncRows('header', true);
                            cdkTable.syncRows('footer', true);
                        }
                    }));
                    // Handling no data overlay
                    // Handling fallback minimum height.
                    value.onRenderedDataChanged
                        .pipe(operators.map((/**
                     * @return {?}
                     */
                    function () { return _this.ds.renderLength; })), operators.startWith(null), operators.pairwise(), operators.tap((/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var _b = __read(_a, 2), prev = _b[0], curr = _b[1];
                        /** @type {?} */
                        var noDataShowing = !!_this._noDateEmbeddedVRef;
                        if ((curr > 0 && noDataShowing) || (curr === 0 && !noDataShowing)) {
                            _this.setupNoData();
                        }
                    })), operators.observeOn(rxjs.animationFrameScheduler), // ww want to give the browser time to remove/add rows
                    utils$1.UnRx(this, value))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var el = _this.viewport.elementRef.nativeElement;
                        if (_this.ds.renderLength > 0 && _this._fallbackMinHeight > 0) {
                            /** @type {?} */
                            var h = Math.min(_this._fallbackMinHeight, _this.viewport.measureRenderedContentSize());
                            el.style.minHeight = h + 'px';
                        }
                        else {
                            el.style.minHeight = _this.viewport.enabled ? null : _this.viewport.measureRenderedContentSize() + 'px';
                            // TODO: When viewport is disabled, we can skip the call to measureRenderedContentSize() and let the browser
                            // do the job by setting `contain: unset` in `pbl-cdk-virtual-scroll-viewport`
                            // el.style.minHeight = null;
                            // el.style.contain = this.viewport.enabled ? null : 'unset';
                            // UPDATE: This will not work because it will cause the width to be incorrect when used with vScrollNone
                            // TODO: Check why?
                        }
                    }));
                }
            }
        };
        /**
         * Invalidates the header, including a full rebuild of column headers
         */
        /**
         * Invalidates the header, including a full rebuild of column headers
         * @return {?}
         */
        PblNgridComponent.prototype.invalidateColumns = /**
         * Invalidates the header, including a full rebuild of column headers
         * @return {?}
         */
        function () {
            this._plugin.emitEvent({ kind: 'beforeInvalidateHeaders' });
            /** @type {?} */
            var rebuildRows = this._store.allColumns.length > 0;
            this._extApi.contextApi.clear();
            this._store.invalidate(this.columns);
            setIdentityProp(this._store, this.__identityProp); /// TODO(shlomiassaf): Remove in 1.0.0
            this.attachCustomCellTemplates();
            this.attachCustomHeaderCellTemplates();
            this._cdkTable.clearHeaderRowDefs();
            this._cdkTable.clearFooterRowDefs();
            // this.cdr.markForCheck();
            this.cdr.detectChanges();
            // after invalidating the headers we now have optional header/headerGroups/footer rows added
            // we need to update the template with this data which will create new rows (header/footer)
            this.resetHeaderRowDefs();
            this.resetFooterRowDefs();
            this.cdr.markForCheck();
            /*  Now we will force clearing all data rows and creating them back again if this is not the first time we invalidate the columns...
        
                Why? first, some background:
        
                Invalidating the store will result in new `PblColumn` instances (cloned or completely new) held inside a new array (all arrays in the store are re-created on invalidate)
                New array and new instances will also result in new directive instances of `PblNgridColumnDef` for every column.
        
                Each data row has data cells with the `PblNgridCellDirective` directive (`pbl-ngrid-cell`).
                `PblNgridCellDirective` has a reference to `PblNgridColumnDef` through dependency injection, i.e. it will not update through change detection!
        
                Now, the problem:
                The `CdkTable` will cache rows and their cells, reusing them for performance.
                This means that the `PblNgridColumnDef` instance inside each cell will not change.
                So, creating new columns and columnDefs will result in stale cells with reference to dead instances of `PblColumn` and `PblNgridColumnDef`.
        
                One solution is to refactor `PblNgridCellDirective` to get the `PblNgridColumnDef` through data binding.
                While this will work it will put more work on each cell while doing CD and will require complex logic to handle each change because `PblNgridCellDirective`
                also create a context which has reference to a column thus a new context is required.
                Keeping track for all references will be difficult and bugs are likely to occur, which are hard to track.
        
                The simplest solution is to force the table to render all data rows from scratch which will destroy the cache and all cell's with it, creating new one's with proper reference.
        
                The simple solution is currently preferred because:
        
                - It is easier to implement.
                - It is easier to assess the impact.
                - It effects a single operation (changing to resetting columns) that rarely happen
        
                The only issue is with the `CdkTable` encapsulating the method `_forceRenderDataRows()` which is what we need.
                The workaround is to assign `multiTemplateDataRows` with the same value it already has, which will cause `_forceRenderDataRows` to fire.
                `multiTemplateDataRows` is a getter that triggers `_forceRenderDataRows` without checking the value changed, perfect fit.
                There is a risk with `multiTemplateDataRows` being changed...
             */
            if (rebuildRows) {
                this._cdkTable.multiTemplateDataRows = this._cdkTable.multiTemplateDataRows;
            }
            this._plugin.emitEvent({ kind: 'onInvalidateHeaders' });
        };
        /**
         * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
         * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
         */
        /**
         * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
         * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
         * @param {?=} options
         * @return {?}
         */
        PblNgridComponent.prototype.resetColumnsWidth = /**
         * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
         * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns, options);
        };
        /**
         * Update the size of all group columns in the table based on the size of their visible children (not hidden).
         * @param dynamicWidthLogic - Optional logic container, if not set a new one is created.
         */
        /**
         * Update the size of all group columns in the table based on the size of their visible children (not hidden).
         * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
         * @return {?}
         */
        PblNgridComponent.prototype.syncColumnGroupsSize = /**
         * Update the size of all group columns in the table based on the size of their visible children (not hidden).
         * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
         * @return {?}
         */
        function (dynamicWidthLogic) {
            var e_3, _a;
            if (!dynamicWidthLogic) {
                dynamicWidthLogic = this._extApi.dynamicColumnWidthFactory();
            }
            var _loop_2 = function (g) {
                // We go over all columns because g.columns does not represent the current owned columns of the group
                // it is static, representing the initial state.
                // Only columns hold their group owners.
                // TODO: find way to improve iteration
                /** @type {?} */
                var colSizeInfos = this_2._store.columns.filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return !c.hidden && c.isInGroup(g); })).map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.sizeInfo; }));
                if (colSizeInfos.length > 0) {
                    /** @type {?} */
                    var groupWidth = dynamicWidthLogic.addGroup(colSizeInfos);
                    g.minWidth = groupWidth;
                    g.updateWidth(groupWidth + "px");
                }
                else {
                    g.minWidth = undefined;
                    g.updateWidth("0px");
                }
                if (g.columnDef) {
                    g.columnDef.markForCheck();
                }
            };
            var this_2 = this;
            try {
                // From all meta columns (header/footer/headerGroup) we filter only `headerGroup` columns.
                // For each we calculate it's width from all of the columns that the headerGroup "groups".
                // We use the same strategy and the same RowWidthDynamicAggregator instance which will prevent duplicate calculations.
                // Note that we might have multiple header groups, i.e. same columns on multiple groups with different row index.
                for (var _b = __values(this._store.getAllHeaderGroup()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var g = _c.value;
                    _loop_2(g);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        };
        /**
         * @param {?=} columns
         * @return {?}
         */
        PblNgridComponent.prototype.resizeColumns = /**
         * @param {?=} columns
         * @return {?}
         */
        function (columns) {
            var _this = this;
            if (!columns) {
                columns = this._store.columns;
            }
            // protect from per-mature resize.
            // Will happen on additional header/header-group rows AND ALSO when vScrollNone is set
            // This will cause size not to populate because it takes time to render the rows, since it's not virtual and happens immediately.
            // TODO: find a better protection.
            if (!columns[0].sizeInfo) {
                return;
            }
            // stores and calculates width for columns added to it. Aggregate's the total width of all added columns.
            /** @type {?} */
            var rowWidth = this._extApi.dynamicColumnWidthFactory();
            this.syncColumnGroupsSize(rowWidth);
            // if this is a table without groups
            if (rowWidth.minimumRowWidth === 0) {
                rowWidth.addGroup(columns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.sizeInfo; })));
            }
            // if the max lock state has changed we need to update re-calculate the static width's again.
            if (rowWidth.maxWidthLockChanged) {
                resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns, { tableMarkForCheck: true });
                this.resizeColumns(columns);
                return;
            }
            if (!this._minimumRowWidth) {
                // We calculate the total minimum width of the table
                // We do it once, to set the minimum width based on the initial setup.
                // Note that we don't apply strategy here, we want the entire length of the table!
                this._cdkTable.minWidth = rowWidth.minimumRowWidth;
            }
            this.ngZone.run((/**
             * @return {?}
             */
            function () {
                _this._cdkTable.syncRows('header');
                _this._plugin.emitEvent({ kind: 'onResizeRow' });
            }));
        };
        /**
         * Create an embedded view before or after the user projected content.
         */
        /**
         * Create an embedded view before or after the user projected content.
         * @template C
         * @param {?} location
         * @param {?} templateRef
         * @param {?=} context
         * @param {?=} index
         * @return {?}
         */
        PblNgridComponent.prototype.createView = /**
         * Create an embedded view before or after the user projected content.
         * @template C
         * @param {?} location
         * @param {?} templateRef
         * @param {?=} context
         * @param {?=} index
         * @return {?}
         */
        function (location, templateRef, context, index) {
            /** @type {?} */
            var vcRef = this.getInternalVcRef(location);
            /** @type {?} */
            var view = vcRef.createEmbeddedView(templateRef, context, index);
            view.detectChanges();
            return view;
        };
        /**
         * Remove an already created embedded view.
         * @param view - The view to remove
         * @param location - The location, if not set defaults to `before`
         * @returns true when a view was removed, false when not. (did not exist in the view container for the provided location)
         */
        /**
         * Remove an already created embedded view.
         * @param {?} view - The view to remove
         * @param {?} location - The location, if not set defaults to `before`
         * @return {?} true when a view was removed, false when not. (did not exist in the view container for the provided location)
         */
        PblNgridComponent.prototype.removeView = /**
         * Remove an already created embedded view.
         * @param {?} view - The view to remove
         * @param {?} location - The location, if not set defaults to `before`
         * @return {?} true when a view was removed, false when not. (did not exist in the view container for the provided location)
         */
        function (view, location) {
            /** @type {?} */
            var vcRef = this.getInternalVcRef(location);
            /** @type {?} */
            var idx = vcRef.indexOf(view);
            if (idx === -1) {
                return false;
            }
            else {
                vcRef.remove(idx);
                return true;
            }
        };
        /**
         * Resize all visible columns to fit content of the table.
         * @param forceFixedWidth - When true will resize all columns with absolute pixel values, otherwise will keep the same format as originally set (% or none)
         */
        /**
         * Resize all visible columns to fit content of the table.
         * @param {?=} options
         * @return {?}
         */
        PblNgridComponent.prototype.autoSizeColumnToFit = /**
         * Resize all visible columns to fit content of the table.
         * @param {?=} options
         * @return {?}
         */
        function (options) {
            var _a = this.viewport, innerWidth = _a.innerWidth, outerWidth = _a.outerWidth;
            // calculate auto-size on the width without scroll bar and take box model gaps into account
            // TODO: if no scroll bar exists the calc will not include it, next if more rows are added a scroll bar will appear...
            this.columnApi.autoSizeToFit(outerWidth - (outerWidth - innerWidth), options);
        };
        /**
         * @return {?}
         */
        PblNgridComponent.prototype.findInitialRowHeight = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var rowElement;
            if (this._cdkTable._rowOutlet.viewContainer.length) {
                /** @type {?} */
                var viewRef = (/** @type {?} */ (this._cdkTable._rowOutlet.viewContainer.get(0)));
                rowElement = viewRef.rootNodes[0];
                /** @type {?} */
                var height = getComputedStyle(rowElement).height;
                return parseInt(height, 10);
            }
            else if (this._vcRefBeforeContent) {
                rowElement = this._vcRefBeforeContent.length > 0
                    ? ((/** @type {?} */ (this._vcRefBeforeContent.get(this._vcRefBeforeContent.length - 1)))).rootNodes[0]
                    : this._vcRefBeforeContent.element.nativeElement;
                rowElement = (/** @type {?} */ (rowElement.nextElementSibling));
                rowElement.style.display = '';
                /** @type {?} */
                var height = getComputedStyle(rowElement).height;
                rowElement.style.display = 'none';
                return parseInt(height, 10);
            }
        };
        /**
         * @param {...?} cls
         * @return {?}
         */
        PblNgridComponent.prototype.addClass = /**
         * @param {...?} cls
         * @return {?}
         */
        function () {
            var e_4, _a;
            var cls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                cls[_i] = arguments[_i];
            }
            try {
                for (var cls_1 = __values(cls), cls_1_1 = cls_1.next(); !cls_1_1.done; cls_1_1 = cls_1.next()) {
                    var c = cls_1_1.value;
                    this.elRef.nativeElement.classList.add(c);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (cls_1_1 && !cls_1_1.done && (_a = cls_1.return)) _a.call(cls_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        };
        /**
         * @param {...?} cls
         * @return {?}
         */
        PblNgridComponent.prototype.removeClass = /**
         * @param {...?} cls
         * @return {?}
         */
        function () {
            var e_5, _a;
            var cls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                cls[_i] = arguments[_i];
            }
            try {
                for (var cls_2 = __values(cls), cls_2_1 = cls_2.next(); !cls_2_1.done; cls_2_1 = cls_2.next()) {
                    var c = cls_2_1.value;
                    this.elRef.nativeElement.classList.remove(c);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (cls_2_1 && !cls_2_1.done && (_a = cls_2.return)) _a.call(cls_2);
                }
                finally { if (e_5) throw e_5.error; }
            }
        };
        /**
         * @private
         * @param {?} injector
         * @param {?} elRef
         * @param {?} vcRef
         * @return {?}
         */
        PblNgridComponent.prototype.initPlugins = /**
         * @private
         * @param {?} injector
         * @param {?} elRef
         * @param {?} vcRef
         * @return {?}
         */
        function (injector, elRef, vcRef) {
            // Create an injector for the extensions/plugins
            // This injector allow plugins (that choose so) to provide a factory function for runtime use.
            // I.E: as if they we're created by angular via template...
            // This allows seamless plugin-to-plugin dependencies without requiring specific template syntax.
            // And also allows auto plugin binding (app wide) without the need for template syntax.
            /** @type {?} */
            var pluginInjector = core.Injector.create({
                providers: [
                    { provide: core.ViewContainerRef, useValue: vcRef },
                    { provide: core.ElementRef, useValue: elRef },
                    { provide: core.ChangeDetectorRef, useValue: this.cdr },
                ],
                parent: injector,
            });
            this._plugin = PblNgridPluginContext.create(this, pluginInjector, this._extApi);
            bindToDataSource(this._plugin);
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.listenToResize = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var resizeObserver;
            /** @type {?} */
            var ro$ = rxjs.fromEventPattern((/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) {
                if (!resizeObserver) {
                    resizeObserver = new ResizeObserver(handler);
                    resizeObserver.observe(_this.elRef.nativeElement);
                }
            }), (/**
             * @param {?} handler
             * @return {?}
             */
            function (handler) {
                if (resizeObserver) {
                    resizeObserver.unobserve(_this.elRef.nativeElement);
                    resizeObserver.disconnect();
                    resizeObserver = undefined;
                }
            }));
            // Skip the first emission
            // Debounce all resizes until the next complete animation frame without a resize
            // finally maps to the entries collection
            // SKIP:  We should skip the first emission (`skip(1)`) before we debounce, since its called upon calling "observe" on the resizeObserver.
            //        The problem is that some tables might require this because they do change size.
            //        An example is a table in a mat-tab that is hidden, the table will hit the resize one when we focus the tab
            //        which will require a resize handling because it's initial size is 0
            //        To workaround this, we only skip elements not yet added to the DOM, which means they will not trigger a resize event.
            /** @type {?} */
            var skipValue = document.contains(this.elRef.nativeElement) ? 1 : 0;
            ro$
                .pipe(operators.skip(skipValue), operators.debounceTime(0, rxjs.animationFrameScheduler), utils$1.UnRx(this))
                .subscribe((/**
             * @param {?} args
             * @return {?}
             */
            function (args) {
                if (skipValue === 0) {
                    skipValue = 1;
                    /** @type {?} */
                    var columns = _this._store.columns;
                    columns.forEach((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.sizeInfo.updateSize(); }));
                }
                _this.onResize(args[0]);
            }));
        };
        /**
         * @private
         * @param {?} entries
         * @return {?}
         */
        PblNgridComponent.prototype.onResize = /**
         * @private
         * @param {?} entries
         * @return {?}
         */
        function (entries) {
            if (this._viewport) {
                this._viewport.checkViewportSize();
            }
            this.resetColumnsWidth();
            this.resizeColumns();
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.initExtApi = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var onInit = [];
            /** @type {?} */
            var extApi = {
                table: this,
                element: this.elRef.nativeElement,
                /**
                 * @return {?}
                 */
                get cdkTable() { return extApi.table._cdkTable; },
                /**
                 * @return {?}
                 */
                get events() { return extApi.table._plugin.events; },
                /**
                 * @return {?}
                 */
                get contextApi() {
                    Object.defineProperty(this, 'contextApi', { value: new ContextApi(extApi) });
                    return extApi.contextApi;
                },
                /**
                 * @return {?}
                 */
                get metaRowService() {
                    Object.defineProperty(this, 'metaRowService', { value: new PblNgridMetaRowService(extApi) });
                    return extApi.metaRowService;
                },
                onInit: (/**
                 * @param {?} fn
                 * @return {?}
                 */
                function (fn) {
                    if (extApi.table.isInit) {
                        fn();
                    }
                    else {
                        if (onInit.length === 0) {
                            /** @type {?} */
                            var u_1 = extApi.events.subscribe((/**
                             * @param {?} e
                             * @return {?}
                             */
                            function (e) {
                                var e_6, _a;
                                if (e.kind === 'onInit') {
                                    try {
                                        for (var onInit_1 = __values(onInit), onInit_1_1 = onInit_1.next(); !onInit_1_1.done; onInit_1_1 = onInit_1.next()) {
                                            var onInitFn = onInit_1_1.value;
                                            onInitFn();
                                        }
                                    }
                                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                    finally {
                                        try {
                                            if (onInit_1_1 && !onInit_1_1.done && (_a = onInit_1.return)) _a.call(onInit_1);
                                        }
                                        finally { if (e_6) throw e_6.error; }
                                    }
                                    u_1.unsubscribe();
                                    onInit = u_1 = undefined;
                                }
                            }));
                        }
                        onInit.push(fn);
                    }
                }),
                columnStore: this._store,
                setViewport: (/**
                 * @param {?} viewport
                 * @return {?}
                 */
                function (viewport) { return _this._viewport = viewport; }),
                dynamicColumnWidthFactory: (/**
                 * @return {?}
                 */
                function () {
                    return new DynamicColumnWidthLogic(DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY);
                })
            };
            this._extApi = extApi;
        };
        /**
         * @private
         * @param {?=} force
         * @return {?}
         */
        PblNgridComponent.prototype.setupNoData = /**
         * @private
         * @param {?=} force
         * @return {?}
         */
        function (force) {
            if (this._noDateEmbeddedVRef) {
                this.removeView(this._noDateEmbeddedVRef, 'beforeContent');
                this._noDateEmbeddedVRef = undefined;
            }
            if (force === false) {
                return;
            }
            /** @type {?} */
            var noData = this._dataSource && this._dataSource.renderLength === 0;
            if (noData) {
                this.addClass('pbl-ngrid-empty');
            }
            else {
                this.removeClass('pbl-ngrid-empty');
            }
            if (noData || force === true) {
                /** @type {?} */
                var noDataTemplate = this.registry.getSingle('noData');
                if (noDataTemplate) {
                    this._noDateEmbeddedVRef = this.createView('beforeContent', noDataTemplate.tRef, { $implicit: this }, 0);
                }
            }
        };
        /**
         * @private
         * @param {?} location
         * @return {?}
         */
        PblNgridComponent.prototype.getInternalVcRef = /**
         * @private
         * @param {?} location
         * @return {?}
         */
        function (location) {
            return location === 'beforeTable'
                ? this._vcRefBeforeTable
                : location === 'beforeContent' ? this._vcRefBeforeContent : this._vcRefAfterContent;
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.setupPaginator = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var paginationKillKey = 'pblPaginationKillKey';
            /** @type {?} */
            var usePagination = this.ds && this.usePagination;
            if (usePagination) {
                this.ds.pagination = this._pagination;
                if (this.ds.paginator) {
                    this.ds.paginator.noCacheMode = this._noCachePaginator;
                }
            }
            if (this.isInit) {
                utils$1.UnRx.kill(this, paginationKillKey);
                if (this._paginatorEmbeddedVRef) {
                    this.removeView(this._paginatorEmbeddedVRef, 'beforeContent');
                    this._paginatorEmbeddedVRef = undefined;
                }
                if (usePagination) {
                    /** @type {?} */
                    var paginatorTemplate = this.registry.getSingle('paginator');
                    if (paginatorTemplate) {
                        this._paginatorEmbeddedVRef = this.createView('beforeContent', paginatorTemplate.tRef, { $implicit: this });
                    }
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.attachCustomCellTemplates = /**
         * @private
         * @return {?}
         */
        function () {
            var e_7, _a;
            try {
                for (var _b = __values(this._store.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var col = _c.value;
                    /** @type {?} */
                    var cell = findCellDef(this.registry, col, 'tableCell', true);
                    if (cell) {
                        col.cellTpl = cell.tRef;
                    }
                    else {
                        /** @type {?} */
                        var defaultCellTemplate = this.registry.getMultiDefault('tableCell');
                        col.cellTpl = defaultCellTemplate ? defaultCellTemplate.tRef : this._fbTableCell;
                    }
                    /** @type {?} */
                    var editorCell = findCellDef(this.registry, col, 'editorCell', true);
                    if (editorCell) {
                        col.editorTpl = editorCell.tRef;
                    }
                    else {
                        /** @type {?} */
                        var defaultCellTemplate = this.registry.getMultiDefault('editorCell');
                        col.editorTpl = defaultCellTemplate ? defaultCellTemplate.tRef : undefined;
                    }
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_7) throw e_7.error; }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.attachCustomHeaderCellTemplates = /**
         * @private
         * @return {?}
         */
        function () {
            var e_8, _a;
            /** @type {?} */
            var columns = [].concat(this._store.columns, this._store.metaColumns);
            /** @type {?} */
            var defaultHeaderCellTemplate = this.registry.getMultiDefault('headerCell') || { tRef: this._fbHeaderCell };
            /** @type {?} */
            var defaultFooterCellTemplate = this.registry.getMultiDefault('footerCell') || { tRef: this._fbFooterCell };
            try {
                for (var columns_2 = __values(columns), columns_2_1 = columns_2.next(); !columns_2_1.done; columns_2_1 = columns_2.next()) {
                    var col = columns_2_1.value;
                    if (col instanceof PblColumn) {
                        /** @type {?} */
                        var headerCellDef = findCellDef(this.registry, col, 'headerCell', true) || defaultHeaderCellTemplate;
                        /** @type {?} */
                        var footerCellDef = findCellDef(this.registry, col, 'footerCell', true) || defaultFooterCellTemplate;
                        col.headerCellTpl = headerCellDef.tRef;
                        col.footerCellTpl = footerCellDef.tRef;
                    }
                    else {
                        if (col.header) {
                            /** @type {?} */
                            var headerCellDef = findCellDef(this.registry, col.header, 'headerCell', true) || defaultHeaderCellTemplate;
                            col.header.template = headerCellDef.tRef;
                        }
                        if (col.headerGroup) {
                            /** @type {?} */
                            var headerCellDef = findCellDef(this.registry, col.headerGroup, 'headerCell', true) || defaultHeaderCellTemplate;
                            col.headerGroup.template = headerCellDef.tRef;
                        }
                        if (col.footer) {
                            /** @type {?} */
                            var footerCellDef = findCellDef(this.registry, col.footer, 'footerCell', true) || defaultFooterCellTemplate;
                            col.footer.template = footerCellDef.tRef;
                        }
                    }
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (columns_2_1 && !columns_2_1.done && (_a = columns_2.return)) _a.call(columns_2);
                }
                finally { if (e_8) throw e_8.error; }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.resetHeaderRowDefs = /**
         * @private
         * @return {?}
         */
        function () {
            var e_9, _a;
            if (this._headerRowDefs) {
                // The table header (main, with column names) is always the last row def (index 0)
                // Because we want it to show last (after custom headers, group headers...) we first need to pull it and then push.
                this._cdkTable.clearHeaderRowDefs();
                /** @type {?} */
                var arr = this._headerRowDefs.toArray();
                arr.push(arr.shift());
                try {
                    for (var arr_1 = __values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                        var rowDef = arr_1_1.value;
                        this._cdkTable.addHeaderRowDef(rowDef);
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridComponent.prototype.resetFooterRowDefs = /**
         * @private
         * @return {?}
         */
        function () {
            var e_10, _a;
            if (this._footerRowDefs) {
                this._cdkTable.clearFooterRowDefs();
                try {
                    for (var _b = __values(this._footerRowDefs.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var rowDef = _c.value;
                        this._cdkTable.addFooterRowDef(rowDef);
                    }
                }
                catch (e_10_1) { e_10 = { error: e_10_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_10) throw e_10.error; }
                }
            }
        };
        var PblNgridComponent_1;
        PblNgridComponent.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ViewContainerRef },
            { type: core.ElementRef },
            { type: core.IterableDiffers },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: PblNgridConfigService },
            { type: PblNgridRegistryService },
            { type: String }
        ]; };
        PblNgridComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid',
                        template: "<!-- TABLE HEADER ROW DEF -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-visually-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- TABLE FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- TABLE FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\" [minWidth]=\"_cdkTable?.minWidth\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n       <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- TABLE HEADER CELL DEF -->\n        <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- TABLE FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
                        providers: [
                            PblNgridRegistryService,
                            {
                                provide: PblNgridPluginController,
                                useFactory: pluginControllerFactory,
                                deps: [core.forwardRef((/**
                                     * @return {?}
                                     */
                                    function () { return PblNgridComponent_1; }))],
                            },
                            {
                                provide: EXT_API_TOKEN,
                                useFactory: internalApiFactory,
                                deps: [core.forwardRef((/**
                                     * @return {?}
                                     */
                                    function () { return PblNgridComponent_1; }))],
                            },
                            {
                                provide: PblNgridMetaRowService,
                                useFactory: metaRowServiceFactory,
                                deps: [core.forwardRef((/**
                                     * @return {?}
                                     */
                                    function () { return PblNgridComponent_1; }))],
                            }
                        ],
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["pbl-ngrid{display:block}.pbl-ngrid-row-visually-hidden{border-top:0;border-bottom:0;clip:rect(0 0 0 0);height:0;min-height:0;max-height:0;overflow:hidden!important;visibility:collapse!important;outline:0;-webkit-appearance:none;-moz-appearance:none}.pbl-ngrid-row-hidden{display:none!important}.pbl-ngrid-container{position:relative;height:100%;width:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;box-sizing:border-box;display:-webkit-box;display:flex;overflow:auto;min-height:inherit}.pbl-ngrid-scroll-container{-webkit-box-flex:1;flex:1 1 auto;box-sizing:border-box;min-height:auto}.pbl-ngrid-scroll-container.cdk-virtual-scroll-disabled{-webkit-box-flex:1;flex:1 0 auto}.pbl-ngrid-sticky-row-scroll-container{position:fixed;overflow:hidden}.pbl-ngrid-empty-spacer{display:none}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper{min-height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 1 100%}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>*{-webkit-box-flex:0;flex:0 0 auto}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>.pbl-ngrid-empty-spacer{display:block;-webkit-box-flex:1;flex:1 1 auto}.pbl-ngrid-scrolling pbl-cdk-table{pointer-events:none}"]
                    }] }
        ];
        /** @nocollapse */
        PblNgridComponent.ctorParameters = function () { return [
            { type: core.Injector },
            { type: core.ViewContainerRef },
            { type: core.ElementRef },
            { type: core.IterableDiffers },
            { type: core.NgZone },
            { type: core.ChangeDetectorRef },
            { type: PblNgridConfigService },
            { type: PblNgridRegistryService },
            { type: String, decorators: [{ type: core.Attribute, args: ['id',] }] }
        ]; };
        PblNgridComponent.propDecorators = {
            showHeader: [{ type: core.Input }],
            showFooter: [{ type: core.Input }],
            noFiller: [{ type: core.Input }],
            focusMode: [{ type: core.Input }],
            identityProp: [{ type: core.Input }],
            dataSource: [{ type: core.Input }],
            usePagination: [{ type: core.Input }],
            noCachePaginator: [{ type: core.Input }],
            columns: [{ type: core.Input }],
            hideColumns: [{ type: core.Input }],
            fallbackMinHeight: [{ type: core.Input }],
            rowClassUpdate: [{ type: core.Input }],
            rowClassUpdateFreq: [{ type: core.Input }],
            _vcRefBeforeTable: [{ type: core.ViewChild, args: ['beforeTable', { read: core.ViewContainerRef, static: true },] }],
            _vcRefBeforeContent: [{ type: core.ViewChild, args: ['beforeContent', { read: core.ViewContainerRef, static: true },] }],
            _vcRefAfterContent: [{ type: core.ViewChild, args: ['afterContent', { read: core.ViewContainerRef, static: true },] }],
            _fbTableCell: [{ type: core.ViewChild, args: ['fbTableCell', { read: core.TemplateRef, static: true },] }],
            _fbHeaderCell: [{ type: core.ViewChild, args: ['fbHeaderCell', { read: core.TemplateRef, static: true },] }],
            _fbFooterCell: [{ type: core.ViewChild, args: ['fbFooterCell', { read: core.TemplateRef, static: true },] }],
            _tableRowDef: [{ type: core.ViewChild, args: [table.CdkRowDef, { static: true },] }],
            _headerRowDefs: [{ type: core.ViewChildren, args: [table.CdkHeaderRowDef,] }],
            _footerRowDefs: [{ type: core.ViewChildren, args: [table.CdkFooterRowDef,] }]
        };
        /**
         * @template T
         */
        PblNgridComponent = PblNgridComponent_1 = __decorate([
            utils$1.UnRx(),
            __metadata("design:paramtypes", [core.Injector, core.ViewContainerRef,
                core.ElementRef,
                core.IterableDiffers,
                core.NgZone,
                core.ChangeDetectorRef,
                PblNgridConfigService,
                PblNgridRegistryService, String])
        ], PblNgridComponent);
        return PblNgridComponent;
    }());
    if (false) {
        /** @type {?} */
        PblNgridComponent.prototype._showHeader;
        /** @type {?} */
        PblNgridComponent.prototype._showFooter;
        /** @type {?} */
        PblNgridComponent.prototype._noFiller;
        /**
         * Set's the behavior of the table when tabbing.
         * The default behavior is none (rows and cells are not focusable)
         *
         * Note that the focus mode has an effect on other functions, for example a detail row will toggle (open/close) using
         * ENTER / SPACE only when focusMode is set to `row`.
         * @type {?}
         */
        PblNgridComponent.prototype.focusMode;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype.__identityProp;
        /**
         * The column definitions for this table.
         * @type {?}
         */
        PblNgridComponent.prototype.columns;
        /** @type {?} */
        PblNgridComponent.prototype.rowClassUpdate;
        /** @type {?} */
        PblNgridComponent.prototype.rowClassUpdateFreq;
        /** @type {?} */
        PblNgridComponent.prototype.rowFocus;
        /** @type {?} */
        PblNgridComponent.prototype.cellFocus;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._fallbackMinHeight;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._dataSource;
        /** @type {?} */
        PblNgridComponent.prototype._vcRefBeforeTable;
        /** @type {?} */
        PblNgridComponent.prototype._vcRefBeforeContent;
        /** @type {?} */
        PblNgridComponent.prototype._vcRefAfterContent;
        /** @type {?} */
        PblNgridComponent.prototype._fbTableCell;
        /** @type {?} */
        PblNgridComponent.prototype._fbHeaderCell;
        /** @type {?} */
        PblNgridComponent.prototype._fbFooterCell;
        /** @type {?} */
        PblNgridComponent.prototype._tableRowDef;
        /** @type {?} */
        PblNgridComponent.prototype._headerRowDefs;
        /** @type {?} */
        PblNgridComponent.prototype._footerRowDefs;
        /**
         * True when the component is initialized (after AfterViewInit)
         * @type {?}
         */
        PblNgridComponent.prototype.isInit;
        /** @type {?} */
        PblNgridComponent.prototype.columnApi;
        /** @type {?} */
        PblNgridComponent.prototype._cdkTable;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._store;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._hideColumnsDirty;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._hideColumns;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._colHideDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._noDateEmbeddedVRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._paginatorEmbeddedVRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._pagination;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._noCachePaginator;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._minimumRowWidth;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._viewport;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._plugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype._extApi;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype.elRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype.differs;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype.ngZone;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype.cdr;
        /**
         * @type {?}
         * @private
         */
        PblNgridComponent.prototype.config;
        /** @type {?} */
        PblNgridComponent.prototype.registry;
        /** @type {?} */
        PblNgridComponent.prototype.id;
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // https://github.com/angular/angular/blob/0bf810022a80ba1cbcff8aa471063a6f1352abbe/packages/common/src/directives/styling_differ.ts
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Used to diff and convert ngStyle/ngClass instructions into [style] and [class] bindings.
     *
     * ngStyle and ngClass both accept various forms of input and behave differently than that
     * of how [style] and [class] behave in Angular.
     *
     * The differences are:
     *  - ngStyle and ngClass both **watch** their binding values for changes each time CD runs
     *    while [style] and [class] bindings do not (they check for identity changes)
     *  - ngStyle allows for unit-based keys (e.g. `{'max-width.px':value}`) and [style] does not
     *  - ngClass supports arrays of class values and [class] only accepts map and string values
     *  - ngClass allows for multiple className keys (space-separated) within an array or map
     *     (as the * key) while [class] only accepts a simple key/value map object
     *
     * Having Angular understand and adapt to all the different forms of behavior is complicated
     * and unnecessary. Instead, ngClass and ngStyle should have their input values be converted
     * into something that the core-level [style] and [class] bindings understand.
     *
     * This [StylingDiffer] class handles this conversion by creating a new input value each time
     * the inner representation of the binding value have changed.
     *
     * ## Why do we care about ngStyle/ngClass?
     * The styling algorithm code (documented inside of `render3/interfaces/styling.ts`) needs to
     * respect and understand the styling values emitted through ngStyle and ngClass (when they
     * are present and used in a template).
     *
     * Instead of having these directives manage styling on their own, they should be included
     * into the Angular styling algorithm that exists for [style] and [class] bindings.
     *
     * Here's why:
     *
     * - If ngStyle/ngClass is used in combination with [style]/[class] bindings then the
     *   styles and classes would fall out of sync and be applied and updated at
     *   inconsistent times
     * - Both ngClass/ngStyle do not respect [class.name] and [style.prop] bindings
     *   (they will write over them given the right combination of events)
     *
     *   ```
     *   <!-- if `w1` is updated then it will always override `w2`
     *        if `w2` is updated then it will always override `w1`
     *        if both are updated at the same time then `w1` wins -->
     *   <div [ngStyle]="{width:w1}" [style.width]="w2">...</div>
     *
     *   <!-- if `w1` is updated then it will always lose to `w2`
     *        if `w2` is updated then it will always override `w1`
     *        if both are updated at the same time then `w2` wins -->
     *   <div [style]="{width:w1}" [style.width]="w2">...</div>
     *   ```
     * - ngClass/ngStyle were written as a directives and made use of maps, closures and other
     *   expensive data structures which were evaluated each time CD runs
     * @template T
     */
    var /**
     * Used to diff and convert ngStyle/ngClass instructions into [style] and [class] bindings.
     *
     * ngStyle and ngClass both accept various forms of input and behave differently than that
     * of how [style] and [class] behave in Angular.
     *
     * The differences are:
     *  - ngStyle and ngClass both **watch** their binding values for changes each time CD runs
     *    while [style] and [class] bindings do not (they check for identity changes)
     *  - ngStyle allows for unit-based keys (e.g. `{'max-width.px':value}`) and [style] does not
     *  - ngClass supports arrays of class values and [class] only accepts map and string values
     *  - ngClass allows for multiple className keys (space-separated) within an array or map
     *     (as the * key) while [class] only accepts a simple key/value map object
     *
     * Having Angular understand and adapt to all the different forms of behavior is complicated
     * and unnecessary. Instead, ngClass and ngStyle should have their input values be converted
     * into something that the core-level [style] and [class] bindings understand.
     *
     * This [StylingDiffer] class handles this conversion by creating a new input value each time
     * the inner representation of the binding value have changed.
     *
     * ## Why do we care about ngStyle/ngClass?
     * The styling algorithm code (documented inside of `render3/interfaces/styling.ts`) needs to
     * respect and understand the styling values emitted through ngStyle and ngClass (when they
     * are present and used in a template).
     *
     * Instead of having these directives manage styling on their own, they should be included
     * into the Angular styling algorithm that exists for [style] and [class] bindings.
     *
     * Here's why:
     *
     * - If ngStyle/ngClass is used in combination with [style]/[class] bindings then the
     *   styles and classes would fall out of sync and be applied and updated at
     *   inconsistent times
     * - Both ngClass/ngStyle do not respect [class.name] and [style.prop] bindings
     *   (they will write over them given the right combination of events)
     *
     *   ```
     *   <!-- if `w1` is updated then it will always override `w2`
     *        if `w2` is updated then it will always override `w1`
     *        if both are updated at the same time then `w1` wins -->
     *   <div [ngStyle]="{width:w1}" [style.width]="w2">...</div>
     *
     *   <!-- if `w1` is updated then it will always lose to `w2`
     *        if `w2` is updated then it will always override `w1`
     *        if both are updated at the same time then `w2` wins -->
     *   <div [style]="{width:w1}" [style.width]="w2">...</div>
     *   ```
     * - ngClass/ngStyle were written as a directives and made use of maps, closures and other
     *   expensive data structures which were evaluated each time CD runs
     * @template T
     */
    StylingDiffer = /** @class */ (function () {
        function StylingDiffer(_name, _options) {
            this._name = _name;
            this._options = _options;
            this.value = null;
            this._lastSetValue = null;
            this._lastSetValueType = 0 /* Null */;
            this._lastSetValueIdentityChange = false;
        }
        /**
         * Sets (updates) the styling value within the differ.
         *
         * Only when `hasValueChanged` is called then this new value will be evaluted
         * and checked against the previous value.
         *
         * @param value the new styling value provided from the ngClass/ngStyle binding
         */
        /**
         * Sets (updates) the styling value within the differ.
         *
         * Only when `hasValueChanged` is called then this new value will be evaluted
         * and checked against the previous value.
         *
         * @param {?} value the new styling value provided from the ngClass/ngStyle binding
         * @return {?}
         */
        StylingDiffer.prototype.setValue = /**
         * Sets (updates) the styling value within the differ.
         *
         * Only when `hasValueChanged` is called then this new value will be evaluted
         * and checked against the previous value.
         *
         * @param {?} value the new styling value provided from the ngClass/ngStyle binding
         * @return {?}
         */
        function (value) {
            if (Array.isArray(value)) {
                this._lastSetValueType = 4 /* Array */;
            }
            else if (value instanceof Set) {
                this._lastSetValueType = 8 /* Set */;
            }
            else if (value && typeof value === 'string') {
                if (!(this._options & 4 /* AllowStringValue */)) {
                    throw new Error(this._name + ' string values are not allowed');
                }
                this._lastSetValueType = 1 /* String */;
            }
            else {
                this._lastSetValueType = value ? 2 /* Map */ : 0 /* Null */;
            }
            this._lastSetValueIdentityChange = true;
            this._lastSetValue = value || null;
        };
        /**
         * Determines whether or not the value has changed.
         *
         * This function can be called right after `setValue()` is called, but it can also be
         * called incase the existing value (if it's a collection) changes internally. If the
         * value is indeed a collection it will do the necessary diffing work and produce a
         * new object value as assign that to `value`.
         *
         * @returns whether or not the value has changed in some way.
         */
        /**
         * Determines whether or not the value has changed.
         *
         * This function can be called right after `setValue()` is called, but it can also be
         * called incase the existing value (if it's a collection) changes internally. If the
         * value is indeed a collection it will do the necessary diffing work and produce a
         * new object value as assign that to `value`.
         *
         * @return {?} whether or not the value has changed in some way.
         */
        StylingDiffer.prototype.hasValueChanged = /**
         * Determines whether or not the value has changed.
         *
         * This function can be called right after `setValue()` is called, but it can also be
         * called incase the existing value (if it's a collection) changes internally. If the
         * value is indeed a collection it will do the necessary diffing work and produce a
         * new object value as assign that to `value`.
         *
         * @return {?} whether or not the value has changed in some way.
         */
        function () {
            /** @type {?} */
            var valueHasChanged = this._lastSetValueIdentityChange;
            if (!valueHasChanged && !(this._lastSetValueType & 14 /* Collection */))
                return false;
            /** @type {?} */
            var finalValue = null;
            /** @type {?} */
            var trimValues = (this._options & 1 /* TrimProperties */) ? true : false;
            /** @type {?} */
            var parseOutUnits = (this._options & 8 /* AllowUnits */) ? true : false;
            /** @type {?} */
            var allowSubKeys = (this._options & 2 /* AllowSubKeys */) ? true : false;
            switch (this._lastSetValueType) {
                // case 1: [input]="string"
                case 1 /* String */:
                    /** @type {?} */
                    var tokens = ((/** @type {?} */ (this._lastSetValue))).split(/\s+/g);
                    if (this._options & 16 /* ForceAsMap */) {
                        finalValue = {};
                        tokens.forEach((/**
                         * @param {?} token
                         * @param {?} i
                         * @return {?}
                         */
                        function (token, i) { return ((/** @type {?} */ (finalValue)))[token] = true; }));
                    }
                    else {
                        finalValue = tokens.reduce((/**
                         * @param {?} str
                         * @param {?} token
                         * @param {?} i
                         * @return {?}
                         */
                        function (str, token, i) { return str + (i ? ' ' : '') + token; }));
                    }
                    break;
                // case 2: [input]="{key:value}"
                case 2 /* Map */:
                    /** @type {?} */
                    var map = (/** @type {?} */ (this._lastSetValue));
                    /** @type {?} */
                    var keys = Object.keys(map);
                    if (!valueHasChanged) {
                        if (this.value) {
                            // we know that the classExp value exists and that it is
                            // a map (otherwise an identity change would have occurred)
                            valueHasChanged = mapHasChanged(keys, (/** @type {?} */ (this.value)), map);
                        }
                        else {
                            valueHasChanged = true;
                        }
                    }
                    if (valueHasChanged) {
                        finalValue =
                            bulidMapFromValues(this._name, trimValues, parseOutUnits, allowSubKeys, map, keys);
                    }
                    break;
                // case 3a: [input]="[str1, str2, ...]"
                // case 3b: [input]="Set"
                case 4 /* Array */:
                case 8 /* Set */:
                    /** @type {?} */
                    var values = Array.from((/** @type {?} */ (this._lastSetValue)));
                    if (!valueHasChanged) {
                        /** @type {?} */
                        var keys_1 = Object.keys((/** @type {?} */ (this.value)));
                        valueHasChanged = !arrayEqualsArray(keys_1, values);
                    }
                    if (valueHasChanged) {
                        finalValue =
                            bulidMapFromValues(this._name, trimValues, parseOutUnits, allowSubKeys, values);
                    }
                    break;
                // case 4: [input]="null|undefined"
                default:
                    finalValue = null;
                    break;
            }
            if (valueHasChanged) {
                ((/** @type {?} */ (this))).value = (/** @type {?} */ (finalValue));
            }
            return valueHasChanged;
        };
        return StylingDiffer;
    }());
    if (false) {
        /** @type {?} */
        StylingDiffer.prototype.value;
        /**
         * @type {?}
         * @private
         */
        StylingDiffer.prototype._lastSetValue;
        /**
         * @type {?}
         * @private
         */
        StylingDiffer.prototype._lastSetValueType;
        /**
         * @type {?}
         * @private
         */
        StylingDiffer.prototype._lastSetValueIdentityChange;
        /**
         * @type {?}
         * @private
         */
        StylingDiffer.prototype._name;
        /**
         * @type {?}
         * @private
         */
        StylingDiffer.prototype._options;
    }
    /** @enum {number} */
    var StylingDifferOptions = {
        None: 0,
        TrimProperties: 1,
        AllowSubKeys: 2,
        AllowStringValue: 4,
        AllowUnits: 8,
        ForceAsMap: 16,
    };
    /** @enum {number} */
    var StylingDifferValueTypes = {
        Null: 0,
        String: 1,
        Map: 2,
        Array: 4,
        Set: 8,
        Collection: 14,
    };
    /**
     * builds and returns a map based on the values input value
     *
     * If the `keys` param is provided then the `values` param is treated as a
     * string map. Otherwise `values` is treated as a string array.
     * @param {?} errorPrefix
     * @param {?} trim
     * @param {?} parseOutUnits
     * @param {?} allowSubKeys
     * @param {?} values
     * @param {?=} keys
     * @return {?}
     */
    function bulidMapFromValues(errorPrefix, trim, parseOutUnits, allowSubKeys, values, keys) {
        /** @type {?} */
        var map = {};
        if (keys) {
            // case 1: map
            for (var i = 0; i < keys.length; i++) {
                /** @type {?} */
                var key = keys[i];
                key = trim ? key.trim() : key;
                /** @type {?} */
                var value = ((/** @type {?} */ (values)))[key];
                setMapValues(map, key, value, parseOutUnits, allowSubKeys);
            }
        }
        else {
            // case 2: array
            for (var i = 0; i < values.length; i++) {
                /** @type {?} */
                var value = ((/** @type {?} */ (values)))[i];
                assertValidValue(errorPrefix, value);
                value = trim ? value.trim() : value;
                setMapValues(map, value, true, false, allowSubKeys);
            }
        }
        return map;
    }
    /**
     * @param {?} errorPrefix
     * @param {?} value
     * @return {?}
     */
    function assertValidValue(errorPrefix, value) {
        if (typeof value !== 'string') {
            throw new Error(errorPrefix + " can only toggle CSS classes expressed as strings, got " + value);
        }
    }
    /**
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @param {?} parseOutUnits
     * @param {?} allowSubKeys
     * @return {?}
     */
    function setMapValues(map, key, value, parseOutUnits, allowSubKeys) {
        if (allowSubKeys && key.indexOf(' ') > 0) {
            /** @type {?} */
            var innerKeys = key.split(/\s+/g);
            for (var j = 0; j < innerKeys.length; j++) {
                setIndividualMapValue(map, innerKeys[j], value, parseOutUnits);
            }
        }
        else {
            setIndividualMapValue(map, key, value, parseOutUnits);
        }
    }
    /**
     * @param {?} map
     * @param {?} key
     * @param {?} value
     * @param {?} parseOutUnits
     * @return {?}
     */
    function setIndividualMapValue(map, key, value, parseOutUnits) {
        if (parseOutUnits) {
            /** @type {?} */
            var values = normalizeStyleKeyAndValue(key, value);
            value = values.value;
            key = values.key;
        }
        map[key] = value;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function normalizeStyleKeyAndValue(key, value) {
        /** @type {?} */
        var index = key.indexOf('.');
        if (index > 0) {
            /** @type {?} */
            var unit = key.substr(index + 1);
            key = key.substring(0, index);
            if (value != null) { // we should not convert null values to string
                value += unit;
            }
        }
        return { key: key, value: value };
    }
    /**
     * @param {?} keys
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function mapHasChanged(keys, a, b) {
        /** @type {?} */
        var oldKeys = Object.keys(a);
        /** @type {?} */
        var newKeys = keys;
        // the keys are different which means the map changed
        if (!arrayEqualsArray(oldKeys, newKeys)) {
            return true;
        }
        for (var i = 0; i < newKeys.length; i++) {
            /** @type {?} */
            var key = newKeys[i];
            if (a[key] !== b[key]) {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function arrayEqualsArray(a, b) {
        if (a && b) {
            if (a.length !== b.length)
                return false;
            for (var i = 0; i < a.length; i++) {
                if (b.indexOf(a[i]) === -1)
                    return false;
            }
            return true;
        }
        return false;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PBL_NGRID_ROW_TEMPLATE = "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content>" + table.CDK_ROW_TEMPLATE + "<ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>";
    /**
     * @template T
     */
    var PblNgridRowComponent = /** @class */ (function (_super) {
        __extends(PblNgridRowComponent, _super);
        function PblNgridRowComponent(extApi, el) {
            var _this = _super.call(this) || this;
            _this.extApi = extApi;
            _this.el = el;
            if (extApi) {
                _this.grid = extApi.table;
            }
            return _this;
        }
        Object.defineProperty(PblNgridRowComponent.prototype, "row", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { value && this.updateRow(); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridRowComponent.prototype.updateRow = /**
         * @return {?}
         */
        function () {
            if (this.extApi) {
                if (!(this.rowRenderIndex >= 0)) {
                    this.getRend();
                }
                this.context = this.extApi.contextApi.rowContext(this.rowRenderIndex);
                this.el.nativeElement.setAttribute('row-id', (/** @type {?} */ (this.context.dataIndex)));
                this.el.nativeElement.setAttribute('row-key', this.context.identity);
                if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'item') {
                    this.updateHostClass();
                }
            }
        };
        /**
         * @return {?}
         */
        PblNgridRowComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () {
            if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'ngDoCheck') {
                this.updateHostClass();
            }
        };
        /**
         * @param {?} changes
         * @return {?}
         */
        PblNgridRowComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            if (!this.extApi) {
                if (!this.grid) {
                    throw new Error('"pbl-ngrid-row" is used outside the scope of a grid, you must provide a grid instance.');
                }
                /** @type {?} */
                var controller = PblNgridPluginController.find(this.grid);
                this.extApi = controller.extApi;
                this.updateRow();
            }
        };
        /**
         * @return {?}
         */
        PblNgridRowComponent.prototype.getRend = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var vcRef = this.extApi.cdkTable._rowOutlet.viewContainer;
            /** @type {?} */
            var len = vcRef.length - 1;
            for (var i = len; i > -1; i--) {
                /** @type {?} */
                var viewRef = (/** @type {?} */ (vcRef.get(i)));
                if (viewRef.rootNodes[0] === this.el.nativeElement) {
                    this.rowRenderIndex = i;
                    break;
                }
            }
        };
        /**
         * @protected
         * @return {?}
         */
        PblNgridRowComponent.prototype.updateHostClass = /**
         * @protected
         * @return {?}
         */
        function () {
            var e_1, _a, e_2, _b, e_3, _c;
            if (this.context) {
                /** @type {?} */
                var el = this.el.nativeElement;
                // if there is an updater, work with it
                // otherwise, clear previous classes that got applied (assumed a live binding change of the updater function)
                // users should be aware to tear down the updater only when they want to stop this feature, if the goal is just to toggle on/off
                // it's better to set the frequency to `none` and return nothing from the function (replace it) so the differ is not nuked.
                if (this.grid.rowClassUpdate) {
                    if (!this._classDiffer) {
                        this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
                        this._lastClass = new Set();
                    }
                    /** @type {?} */
                    var newValue = this.grid.rowClassUpdate(this.context);
                    this._classDiffer.setValue(newValue);
                    if (this._classDiffer.hasValueChanged()) {
                        /** @type {?} */
                        var lastClass = this._lastClass;
                        this._lastClass = new Set();
                        /** @type {?} */
                        var value = this._classDiffer.value || {};
                        try {
                            for (var _d = __values(Object.keys(value)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                var key = _e.value;
                                if (value[key]) {
                                    el.classList.add(key);
                                    this._lastClass.add(key);
                                }
                                else {
                                    el.classList.remove(key);
                                }
                                lastClass.delete(key);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (lastClass.size > 0) {
                            try {
                                for (var _f = __values(lastClass.values()), _g = _f.next(); !_g.done; _g = _f.next()) {
                                    var key = _g.value;
                                    el.classList.remove(key);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
                else if (this._classDiffer) {
                    /** @type {?} */
                    var value = this._classDiffer.value || {};
                    this._classDiffer = this._lastClass = undefined;
                    try {
                        for (var _h = __values(Object.keys(value)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var key = _j.value;
                            el.classList.remove(key);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        };
        PblNgridRowComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-row[row]',
                        template: PBL_NGRID_ROW_TEMPLATE,
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'pbl-ngrid-row',
                            'role': 'row',
                        },
                        providers: [
                            { provide: table.CdkRow, useExisting: PblNgridRowComponent }
                        ],
                        exportAs: 'pblNgridRow',
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    }] }
        ];
        /** @nocollapse */
        PblNgridRowComponent.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [EXT_API_TOKEN,] }] },
            { type: core.ElementRef }
        ]; };
        PblNgridRowComponent.propDecorators = {
            row: [{ type: core.Input }],
            grid: [{ type: core.Input }]
        };
        return PblNgridRowComponent;
    }(table.CdkRow));
    if (false) {
        /**
         * Optional grid instance, required only if the row is declared outside the scope of the grid.
         * @type {?}
         */
        PblNgridRowComponent.prototype.grid;
        /** @type {?} */
        PblNgridRowComponent.prototype.rowRenderIndex;
        /** @type {?} */
        PblNgridRowComponent.prototype.context;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowComponent.prototype._classDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowComponent.prototype._lastClass;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRowComponent.prototype.extApi;
        /**
         * @type {?}
         * @protected
         */
        PblNgridRowComponent.prototype.el;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template T, TKind
     */
    var   /**
     * @abstract
     * @template T, TKind
     */
    PblNgridSingleTemplateRegistry = /** @class */ (function () {
        function PblNgridSingleTemplateRegistry(tRef, registry) {
            this.tRef = tRef;
            this.registry = registry;
        }
        /**
         * @return {?}
         */
        PblNgridSingleTemplateRegistry.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.registry.setSingle(this.kind, (/** @type {?} */ (this)));
        };
        /**
         * @return {?}
         */
        PblNgridSingleTemplateRegistry.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.registry.setSingle(this.kind, undefined);
        };
        return PblNgridSingleTemplateRegistry;
    }());
    if (false) {
        /** @type {?} */
        PblNgridSingleTemplateRegistry.prototype.kind;
        /** @type {?} */
        PblNgridSingleTemplateRegistry.prototype.tRef;
        /**
         * @type {?}
         * @protected
         */
        PblNgridSingleTemplateRegistry.prototype.registry;
    }
    /**
     * @abstract
     * @template T, TKind
     */
    var   /**
     * @abstract
     * @template T, TKind
     */
    PblNgridMultiTemplateRegistry = /** @class */ (function () {
        function PblNgridMultiTemplateRegistry(tRef, registry) {
            this.tRef = tRef;
            this.registry = registry;
        }
        /**
         * @return {?}
         */
        PblNgridMultiTemplateRegistry.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.registry.addMulti(this.kind, (/** @type {?} */ (this)));
        };
        /**
         * @return {?}
         */
        PblNgridMultiTemplateRegistry.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.registry.removeMulti(this.kind, (/** @type {?} */ (this)));
        };
        return PblNgridMultiTemplateRegistry;
    }());
    if (false) {
        /** @type {?} */
        PblNgridMultiTemplateRegistry.prototype.name;
        /** @type {?} */
        PblNgridMultiTemplateRegistry.prototype.kind;
        /** @type {?} */
        PblNgridMultiTemplateRegistry.prototype.tRef;
        /**
         * @type {?}
         * @protected
         */
        PblNgridMultiTemplateRegistry.prototype.registry;
    }
    /**
     * @abstract
     * @template T, TKind
     */
    var   /**
     * @abstract
     * @template T, TKind
     */
    PblNgridMultiComponentRegistry = /** @class */ (function () {
        function PblNgridMultiComponentRegistry() {
        }
        return PblNgridMultiComponentRegistry;
    }());
    if (false) {
        /** @type {?} */
        PblNgridMultiComponentRegistry.prototype.name;
        /** @type {?} */
        PblNgridMultiComponentRegistry.prototype.kind;
        /**
         * When set to true the component will be created with projected content.
         * Setting to true does not ensure projection, the projection is determined by the context creating the component.
         *
         * For example, In the context of `dataHeaderExtensions` the projection will be the content of the cell, other implementations
         * might not include a projection.
         * @type {?}
         */
        PblNgridMultiComponentRegistry.prototype.projectContent;
        /**
         * @abstract
         * @param {?} context
         * @return {?}
         */
        PblNgridMultiComponentRegistry.prototype.getFactory = function (context) { };
    }
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    PblNgridDataHeaderExtensionContext = /** @class */ (function (_super) {
        __extends(PblNgridDataHeaderExtensionContext, _super);
        function PblNgridDataHeaderExtensionContext() {
            return _super.call(this) || this;
        }
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} headerCell
         * @param {?} injector
         * @return {?}
         */
        PblNgridDataHeaderExtensionContext.createDateHeaderCtx = 
        // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
        // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
        // forwardRef() will not help since it's not inject by angular, we instantiate the class..
        // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
        /**
         * @template T
         * @param {?} headerCell
         * @param {?} injector
         * @return {?}
         */
        function (headerCell, injector) {
            /** @type {?} */
            var instance = new PblNgridDataHeaderExtensionContext();
            instance.col = headerCell.columnDef.column;
            instance.table = headerCell.table;
            Object.defineProperty(instance, 'injector', { value: injector });
            return instance;
        };
        return PblNgridDataHeaderExtensionContext;
    }(MetaCellContext));
    if (false) {
        /** @type {?} */
        PblNgridDataHeaderExtensionContext.prototype.injector;
    }
    /**
     * @record
     * @template T
     */
    function PblNgridDataHeaderExtensionRef() { }
    if (false) {
        /**
         * @param {?} context
         * @return {?}
         */
        PblNgridDataHeaderExtensionRef.prototype.shouldRender = function (context) { };
    }
    /**
     * A generic, multi-purpose template reference for data header extensions.
     * The template's context is `PblNgridDataHeaderExtensionContext`:
     *
     * ```ts
     * interface PblNgridDataHeaderExtensionContext {
     *   col: PblMetaColumn;
     *   table: PblNgridComponent<any>;
     *   injector: Injector;
     * }
     * ```
     *
     * By default it will render if registered but it is possible to provide a predicate to conditionally load it.
     *
     * ```html
     * <div *pblNgridHeaderExtensionRef="let ctx"></div>
     * ````
     *
     * Or with a `shouldRender` predicate:
     *
     * ```html
     * <div *pblNgridHeaderExtensionRef="shouldRender; let ctx"></div>
     * ```
     *
     * And in the component the template is defined on:
     *
     * ```ts
     * class MyComponent {
     *
     *   shouldRender = (context: PblNgridDataHeaderExtensionContext) => {
     *     // Some code returning true or false
     *   }
     * }
     * ```
     *
     * Note that the `shouldRender` predicate is run once when the header initialize.
     */
    var PblNgridHeaderExtensionRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridHeaderExtensionRefDirective, _super);
        function PblNgridHeaderExtensionRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.name = 'genericHeaderExtension-' + PblNgridHeaderExtensionRefDirective._id++;
            _this.kind = 'dataHeaderExtensions';
            return _this;
        }
        PblNgridHeaderExtensionRefDirective._id = 0;
        PblNgridHeaderExtensionRefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridHeaderExtensionRef]' },] }
        ];
        /** @nocollapse */
        PblNgridHeaderExtensionRefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        PblNgridHeaderExtensionRefDirective.propDecorators = {
            shouldRender: [{ type: core.Input, args: ['pblNgridHeaderExtensionRef',] }]
        };
        return PblNgridHeaderExtensionRefDirective;
    }(PblNgridMultiTemplateRegistry));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridHeaderExtensionRefDirective._id;
        /** @type {?} */
        PblNgridHeaderExtensionRefDirective.prototype.name;
        /** @type {?} */
        PblNgridHeaderExtensionRefDirective.prototype.kind;
        /** @type {?} */
        PblNgridHeaderExtensionRefDirective.prototype.shouldRender;
    }
    /**
     * Marks the element as the display element for pagination
     */
    var PblNgridPaginatorRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridPaginatorRefDirective, _super);
        function PblNgridPaginatorRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'paginator';
            return _this;
        }
        PblNgridPaginatorRefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridPaginatorRef]' },] }
        ];
        /** @nocollapse */
        PblNgridPaginatorRefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        return PblNgridPaginatorRefDirective;
    }(PblNgridSingleTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridPaginatorRefDirective.prototype.kind;
    }
    /**
     * Marks the element as the display element when table has no data.
     *
     * \@example
     * ```html
     *   <pbl-ngrid>
     *     <div *pblNgridNoDataRef style="height: 100%; display: flex; align-items: center; justify-content: center">
     *       <span>No Data</span>
     *     </div>
     *   </pbl-ngrid>
     * ```
     */
    var PblNgridNoDataRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridNoDataRefDirective, _super);
        function PblNgridNoDataRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'noData';
            return _this;
        }
        PblNgridNoDataRefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridNoDataRef]' },] }
        ];
        /** @nocollapse */
        PblNgridNoDataRefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: PblNgridRegistryService }
        ]; };
        return PblNgridNoDataRefDirective;
    }(PblNgridSingleTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridNoDataRefDirective.prototype.kind;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A directive that marks the template as a projected section inside the table.
     * The location of the project content is set by the position input.
     *
     * Note that this directive can only be set as the content inside the table.
     */
    var PblNgridOuterSectionDirective = /** @class */ (function () {
        function PblNgridOuterSectionDirective(table, tRef) {
            this.table = table;
            this.tRef = tRef;
        }
        /**
         * @return {?}
         */
        PblNgridOuterSectionDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.table.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
        };
        PblNgridOuterSectionDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridOuterSection]',
                        inputs: ['position:pblNgridOuterSection'] // tslint:disable-line:use-input-property-decorator
                    },] }
        ];
        /** @nocollapse */
        PblNgridOuterSectionDirective.ctorParameters = function () { return [
            { type: PblNgridComponent },
            { type: core.TemplateRef }
        ]; };
        return PblNgridOuterSectionDirective;
    }());
    if (false) {
        /** @type {?} */
        PblNgridOuterSectionDirective.prototype.position;
        /**
         * @type {?}
         * @private
         */
        PblNgridOuterSectionDirective.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblNgridOuterSectionDirective.prototype.tRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This file contains constants shared between modules (files) that if not extract will cause a circular dependency
     */
    /** @type {?} */
    var COLUMN_NAME_CSS_PREFIX = 'pbl-ngrid-column';
    /** @type {?} */
    var COLUMN_EDITABLE_CELL_CLASS = 'pbl-ngrid-editable-cell';
    /**
     * Returns a css class unique to the column
     * @param {?} columnDef
     * @return {?}
     */
    function uniqueColumnCss(columnDef) {
        return COLUMN_NAME_CSS_PREFIX + "-" + columnDef.cssClassFriendlyName;
    }
    /**
     * Returns a css class unique to the type of the column (columns might share types)
     * @param {?} type
     * @return {?}
     */
    function uniqueColumnTypeCss(type) {
        return COLUMN_NAME_CSS_PREFIX + "-type-" + type.name;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /* TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO

      PblNgridColumnDef use's the default object KeyValueDiffer provides with angular.
      This differ will perform the diff on the entire object which IS NOT REQUIRED!
      We need to create a custom differ that does the diff on selected properties only.
    */
    /**
     * Column definition for the mat-table.
     * Defines a set of cells available for a table column.
     * @template T
     */
    var PblNgridColumnDef = /** @class */ (function (_super) {
        __extends(PblNgridColumnDef, _super);
        function PblNgridColumnDef(_differs, extApi) {
            var _this = _super.call(this) || this;
            _this._differs = _differs;
            _this.extApi = extApi;
            _this.isDragging = false;
            _this._isDirty = false;
            _this._markedForCheck = false;
            _this.table = extApi.table;
            return _this;
        }
        Object.defineProperty(PblNgridColumnDef.prototype, "column", {
            get: /**
             * @return {?}
             */
            function () { return this._column; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.attach(value); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridColumnDef.prototype, "isDirty", {
            get: /**
             * @return {?}
             */
            function () {
                if (this._markedForCheck && !this._isDirty) {
                    this._markedForCheck = false;
                    this._isDirty = !!this._colDiffer.diff(this._column);
                }
                return this._isDirty;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnDef.prototype, "widths", {
            /**
             * The complete width definition for the column.
             * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
             *
             * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
             */
            get: /**
             * The complete width definition for the column.
             * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
             *
             * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
             * @return {?}
             */
            function () { return this._widths; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnDef.prototype, "netWidth", {
            /**
             * The last net width of the column.
             * The net width is the absolute width of the column, without padding, border etc...
             */
            get: /**
             * The last net width of the column.
             * The net width is the absolute width of the column, without padding, border etc...
             * @return {?}
             */
            function () { return this._netWidth; },
            enumerable: true,
            configurable: true
        });
        /**
         * Marks this column for a lazy change detection check.
         * Lazy means it will run the check only when the diff is requested (i.e. querying the `hasChanged` property).
         * This allow aggregation of changes between CD cycles, i.e. calling `markForCheck()` multiple times within the same CD cycle does not hit performance.
         *
         * Once marked for check, `pblNgridColumnDef` handles it's dirty (`isDirty`) state automatically, when `isDirty` is true it will remain true until the
         * CD cycle ends, i.e. until `ngDoCheck()` hits. This means that only children of `pblNgridColumnDef` can relay on `isDirty`, all children will run their
         * `ngDoCheck()` before `ngDoCheck()` of `pblNgridColumnDef`.
         *
         * This is a how we notify all cell directives about changes in a column. It is done through angular CD logic and does not require manual
         * CD kicks and special channels between pblNgridColumnDef and it's children.
         */
        /**
         * Marks this column for a lazy change detection check.
         * Lazy means it will run the check only when the diff is requested (i.e. querying the `hasChanged` property).
         * This allow aggregation of changes between CD cycles, i.e. calling `markForCheck()` multiple times within the same CD cycle does not hit performance.
         *
         * Once marked for check, `pblNgridColumnDef` handles it's dirty (`isDirty`) state automatically, when `isDirty` is true it will remain true until the
         * CD cycle ends, i.e. until `ngDoCheck()` hits. This means that only children of `pblNgridColumnDef` can relay on `isDirty`, all children will run their
         * `ngDoCheck()` before `ngDoCheck()` of `pblNgridColumnDef`.
         *
         * This is a how we notify all cell directives about changes in a column. It is done through angular CD logic and does not require manual
         * CD kicks and special channels between pblNgridColumnDef and it's children.
         * @return {?}
         */
        PblNgridColumnDef.prototype.markForCheck = /**
         * Marks this column for a lazy change detection check.
         * Lazy means it will run the check only when the diff is requested (i.e. querying the `hasChanged` property).
         * This allow aggregation of changes between CD cycles, i.e. calling `markForCheck()` multiple times within the same CD cycle does not hit performance.
         *
         * Once marked for check, `pblNgridColumnDef` handles it's dirty (`isDirty`) state automatically, when `isDirty` is true it will remain true until the
         * CD cycle ends, i.e. until `ngDoCheck()` hits. This means that only children of `pblNgridColumnDef` can relay on `isDirty`, all children will run their
         * `ngDoCheck()` before `ngDoCheck()` of `pblNgridColumnDef`.
         *
         * This is a how we notify all cell directives about changes in a column. It is done through angular CD logic and does not require manual
         * CD kicks and special channels between pblNgridColumnDef and it's children.
         * @return {?}
         */
        function () {
            if (!this._colDiffer) {
                this._colDiffer = this._differs.find({}).create();
                this._colDiffer.diff({});
            }
            this._markedForCheck = true;
        };
        /**
         * Update the width definitions for this column. [minWidth, width, maxWidth]
         * If an element is provided it will also apply the widths to the element.
         * @param width The new width
         * @param element Optional, an element to apply the width to, if not set will only update the width definitions.
         */
        /**
         * Update the width definitions for this column. [minWidth, width, maxWidth]
         * If an element is provided it will also apply the widths to the element.
         * @param {?} width The new width
         * @param {?=} element Optional, an element to apply the width to, if not set will only update the width definitions.
         * @return {?}
         */
        PblNgridColumnDef.prototype.updateWidth = /**
         * Update the width definitions for this column. [minWidth, width, maxWidth]
         * If an element is provided it will also apply the widths to the element.
         * @param {?} width The new width
         * @param {?=} element Optional, an element to apply the width to, if not set will only update the width definitions.
         * @return {?}
         */
        function (width, element) {
            var isFixedWidth = this._column.isFixedWidth;
            /*  Setting the minimum width is based on the input.
                    If the original width is pixel fixed we will take the maximum between it and the min width.
                    If not, we will the take minWidth.
                    If none of the above worked we will try to see if the current width is set with %, if so it will be our min width.
                */
            /** @type {?} */
            var minWidthPx = isFixedWidth
                ? Math.max(this._column.parsedWidth.value, this._column.minWidth || 0)
                : this._column.minWidth;
            /** @type {?} */
            var minWidth = minWidthPx && minWidthPx + "px";
            if (!minWidth) {
                /** @type {?} */
                var parsed = parseStyleWidth(width);
                if (parsed && parsed.type === '%') {
                    minWidth = width;
                }
            }
            /** @type {?} */
            var maxWidth = isFixedWidth
                ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
                : this._column.maxWidth;
            this._widths = [minWidth || '', width, maxWidth ? maxWidth + "px" : width];
            if (element) {
                this.applyWidth(element);
            }
        };
        /**
         * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
         */
        /**
         * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
         * @param {?} element
         * @return {?}
         */
        PblNgridColumnDef.prototype.applyWidth = /**
         * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
         * @param {?} element
         * @return {?}
         */
        function (element) {
            setWidth(element, this.widths);
        };
        /**
         * Query for cell elements related to this column definition.
         *
         * This query is not cached - cache in implementation.
         */
        /**
         * Query for cell elements related to this column definition.
         *
         * This query is not cached - cache in implementation.
         * @param {...?} filter
         * @return {?}
         */
        PblNgridColumnDef.prototype.queryCellElements = /**
         * Query for cell elements related to this column definition.
         *
         * This query is not cached - cache in implementation.
         * @param {...?} filter
         * @return {?}
         */
        function () {
            var e_1, _a;
            var filter = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                filter[_i] = arguments[_i];
            }
            /** @type {?} */
            var cssId = "." + uniqueColumnCss(this);
            /** @type {?} */
            var query = [];
            if (filter.length === 0) {
                query.push(cssId);
            }
            else {
                try {
                    for (var filter_1 = __values(filter), filter_1_1 = filter_1.next(); !filter_1_1.done; filter_1_1 = filter_1.next()) {
                        var f = filter_1_1.value;
                        switch (f) {
                            case 'table':
                                query.push(".pbl-ngrid-cell" + cssId);
                                break;
                            case 'header':
                                query.push(".pbl-ngrid-header-cell" + cssId + ":not(.pbl-header-group-cell)");
                                break;
                            case 'headerGroup':
                                query.push(".pbl-header-group-cell" + cssId);
                                break;
                            case 'footer':
                                query.push(".pbl-ngrid-footer-cell" + cssId + ":not(.pbl-footer-group-cell)");
                                break;
                            case 'footerGroup':
                                query.push(".pbl-footer-group-cell" + cssId);
                                break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (filter_1_1 && !filter_1_1.done && (_a = filter_1.return)) _a.call(filter_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            // we query from the master table container and not CDKTable because of fixed meta rows
            return query.length === 0 ? [] : (/** @type {?} */ (Array.from(this.extApi.element.querySelectorAll(query.join(', ')))));
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        PblNgridColumnDef.prototype.ngDoCheck = /**
         * \@internal
         * @return {?}
         */
        function () {
            if (this._isDirty) {
                this._isDirty = false;
            }
        };
        /** @internal */
        /**
         * \@internal
         * @return {?}
         */
        PblNgridColumnDef.prototype.ngOnDestroy = /**
         * \@internal
         * @return {?}
         */
        function () { this.detach(); };
        /**
         * @return {?}
         */
        PblNgridColumnDef.prototype.onResize = /**
         * @return {?}
         */
        function () {
            if (isPblColumn(this.column)) {
                /** @type {?} */
                var prevNetWidth = this._netWidth;
                this._netWidth = this.extApi.dynamicColumnWidthFactory().widthBreakout(this.column.sizeInfo).content;
                if (prevNetWidth && prevNetWidth !== this._netWidth) {
                    /** @type {?} */
                    var width = this._netWidth + "px";
                    this._widths = [
                        this.widths[0] || width,
                        width,
                        width,
                    ];
                }
            }
        };
        /**
         * @param {?=} pin
         * @return {?}
         */
        PblNgridColumnDef.prototype.updatePin = /**
         * @param {?=} pin
         * @return {?}
         */
        function (pin) {
            this.sticky = this.stickyEnd = false;
            switch (pin) {
                case 'start':
                    this.sticky = true;
                    break;
                case 'end':
                    this.stickyEnd = true;
                    break;
            }
            if (this.table.isInit) {
                this.table._cdkTable.updateStickyColumnStyles();
            }
        };
        /**
         * @private
         * @param {?} column
         * @return {?}
         */
        PblNgridColumnDef.prototype.attach = /**
         * @private
         * @param {?} column
         * @return {?}
         */
        function (column) {
            if (this._column !== column) {
                this.detach();
                if (column) {
                    this._column = column;
                    ((/** @type {?} */ (column))).attach(this);
                    this.name = column.id.replace(/ /g, '_');
                    if (isPblColumn(column)) {
                        this.updatePin(column.pin);
                    }
                }
                if (this._colDiffer) {
                    this.markForCheck();
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridColumnDef.prototype.detach = /**
         * @private
         * @return {?}
         */
        function () {
            if (this._column) {
                this._column.detach();
                this._column = undefined;
            }
        };
        PblNgridColumnDef.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridColumnDef]',
                        providers: [
                            { provide: table.CdkColumnDef, useExisting: PblNgridColumnDef },
                            { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
                        ],
                    },] }
        ];
        /** @nocollapse */
        PblNgridColumnDef.ctorParameters = function () { return [
            { type: core.KeyValueDiffers },
            { type: undefined, decorators: [{ type: core.Inject, args: [EXT_API_TOKEN,] }] }
        ]; };
        PblNgridColumnDef.propDecorators = {
            column: [{ type: core.Input, args: ['pblNgridColumnDef',] }]
        };
        return PblNgridColumnDef;
    }(table.CdkColumnDef));
    if (false) {
        /** @type {?} */
        PblNgridColumnDef.prototype.isDragging;
        /** @type {?} */
        PblNgridColumnDef.prototype.table;
        /**
         * @type {?}
         * @protected
         */
        PblNgridColumnDef.prototype._colDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnDef.prototype._column;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnDef.prototype._isDirty;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnDef.prototype._markedForCheck;
        /**
         * The complete width definition for the column.
         * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
         *
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         * @type {?}
         * @private
         */
        PblNgridColumnDef.prototype._widths;
        /**
         * The last net width of the column.
         * The net width is the absolute width of the column, without padding, border etc...
         * @type {?}
         * @private
         */
        PblNgridColumnDef.prototype._netWidth;
        /**
         * @type {?}
         * @protected
         */
        PblNgridColumnDef.prototype._differs;
        /**
         * @type {?}
         * @protected
         */
        PblNgridColumnDef.prototype.extApi;
        /* Skipping unhandled member: ;*/
    }
    /**
     * Set the widths of an HTMLElement
     * @param {?} el The element to set widths to
     * @param {?} widths The widths, a tuple of 3 strings [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     * @return {?}
     */
    function setWidth(el, widths) {
        el.style.minWidth = widths[0];
        el.style.width = widths[1];
        el.style.maxWidth = widths[2];
        // TODO(shlomiassaf)[perf, 4]: Instead of using a tuple for width, use a CSSStyleDeclaration object and just assign the props
        // This will avoid the additional check for %
        // We will need to implement it in all places that `_widths` is updated in `PblNgridColumnDef`
        // Another TODO is to cache the previous `boxSizing` in any case the column definition changes.
        // When the column does not have an explicit `minWidth` set and when the `width` is set explicitly to a % value
        // the logic in `PblNgridColumnDef.updateWidth` will set `minWidth` to the same value in `width`
        // This will cause an overflow unless we apply the border-box model
        if (widths[0] && widths[0].endsWith('%')) {
            el.style.boxSizing = 'border-box';
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var HEADER_GROUP_CSS = "pbl-header-group-cell";
    /** @type {?} */
    var HEADER_GROUP_PLACE_HOLDER_CSS = "pbl-header-group-cell-placeholder";
    /**
     * @param {?} el
     * @param {?} column
     * @return {?}
     */
    function initCellElement(el, column) {
        var e_1, _a;
        el.classList.add(uniqueColumnCss(column.columnDef));
        if (column.type) {
            el.classList.add(uniqueColumnTypeCss(column.type));
        }
        if (column.css) {
            /** @type {?} */
            var css = column.css.split(' ');
            try {
                for (var css_1 = __values(css), css_1_1 = css_1.next(); !css_1_1.done; css_1_1 = css_1.next()) {
                    var c = css_1_1.value;
                    el.classList.add(c);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (css_1_1 && !css_1_1.done && (_a = css_1.return)) _a.call(css_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    /**
     * @param {?} el
     * @param {?} column
     * @return {?}
     */
    function initDataCellElement(el, column) {
        if (column.editable && column.editorTpl) {
            el.classList.add(COLUMN_EDITABLE_CELL_CLASS);
        }
    }
    /** @type {?} */
    var lastDataHeaderExtensions = new Map();
    /**
     * Header cell component.
     * The header cell component will render the header cell template and add the proper classes and role.
     *
     * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
     * These extensions add features to the cells either as a template instance or as a component instance.
     * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
     * @template T
     */
    var PblNgridHeaderCellComponent = /** @class */ (function (_super) {
        __extends(PblNgridHeaderCellComponent, _super);
        function PblNgridHeaderCellComponent(columnDef, table, elementRef, zone) {
            var _this = _super.call(this, columnDef, elementRef) || this;
            _this.columnDef = columnDef;
            _this.table = table;
            _this.elementRef = elementRef;
            _this.zone = zone;
            /** @type {?} */
            var column = columnDef.column;
            /** @type {?} */
            var el = _this.el = elementRef.nativeElement;
            if (column instanceof PblColumnGroup) {
                el.classList.add(HEADER_GROUP_CSS);
                if (column.placeholder) {
                    el.classList.add(HEADER_GROUP_PLACE_HOLDER_CSS);
                }
            }
            return _this;
        }
        /**
         * @return {?}
         */
        PblNgridHeaderCellComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var col = this.columnDef.column;
            if (col instanceof PblColumn) {
                this.cellCtx = PblNgridDataHeaderExtensionContext.createDateHeaderCtx((/** @type {?} */ (this)), this.vcRef.injector);
            }
            else {
                this.cellCtx = MetaCellContext.create(col, this.table);
            }
        };
        /**
         * @return {?}
         */
        PblNgridHeaderCellComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var col = this.columnDef.column;
            var vcRef = this.vcRef;
            /** @type {?} */
            var view;
            if (col instanceof PblColumn) {
                /** @type {?} */
                var context_1 = (/** @type {?} */ (this.cellCtx));
                view = vcRef.createEmbeddedView(col.headerCellTpl, context_1);
                this.zone.onStable
                    .pipe(operators.first())
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    _this.runHeaderExtensions(context_1, (/** @type {?} */ (view)));
                    /** @type {?} */
                    var v = vcRef.get(0);
                    // at this point the view might get destroyed, its possible...
                    if (!v.destroyed) {
                        v.detectChanges();
                    }
                }));
            }
            else {
                view = vcRef.createEmbeddedView(col.template, this.cellCtx);
            }
            view.detectChanges();
            this.columnDef.applyWidth(this.el);
            initCellElement(this.el, col);
        };
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        /**
         * @return {?}
         */
        PblNgridHeaderCellComponent.prototype.ngDoCheck = 
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        /**
         * @return {?}
         */
        function () {
            if (this.columnDef.isDirty) {
                this.columnDef.applyWidth(this.el);
            }
        };
        /**
         * @protected
         * @param {?} context
         * @param {?} view
         * @return {?}
         */
        PblNgridHeaderCellComponent.prototype.runHeaderExtensions = /**
         * @protected
         * @param {?} context
         * @param {?} view
         * @return {?}
         */
        function (context, view) {
            var _this = this;
            var e_2, _a;
            // we collect the first header extension for each unique name only once per table instance
            /** @type {?} */
            var extensions = lastDataHeaderExtensions.get(this.table);
            if (!extensions) {
                /** @type {?} */
                var dataHeaderExtensions_1 = new Map();
                this.table.registry.forMulti('dataHeaderExtensions', (/**
                 * @param {?} values
                 * @return {?}
                 */
                function (values) {
                    var e_3, _a;
                    try {
                        for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                            var value = values_1_1.value;
                            if (!dataHeaderExtensions_1.has(value.name)) {
                                dataHeaderExtensions_1.set(value.name, value);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }));
                extensions = Array.from(dataHeaderExtensions_1.values());
                lastDataHeaderExtensions.set(this.table, extensions);
                // destroy it on the next turn, we know all cells will render on the same turn.
                this.zone.onStable.pipe(operators.first()).subscribe((/**
                 * @return {?}
                 */
                function () { return lastDataHeaderExtensions.delete(_this.table); }));
            }
            var rootNodes = view.rootNodes;
            try {
                for (var extensions_1 = __values(extensions), extensions_1_1 = extensions_1.next(); !extensions_1_1.done; extensions_1_1 = extensions_1.next()) {
                    var ext = extensions_1_1.value;
                    if (!ext.shouldRender || ext.shouldRender(context)) {
                        if (ext instanceof PblNgridMultiTemplateRegistry) {
                            /** @type {?} */
                            var extView = this.vcRef.createEmbeddedView(ext.tRef, context);
                            extView.markForCheck();
                        }
                        else if (ext instanceof PblNgridMultiComponentRegistry) {
                            rootNodes = this.createComponent(ext, context, rootNodes);
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (extensions_1_1 && !extensions_1_1.done && (_a = extensions_1.return)) _a.call(extensions_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        /**
         * @protected
         * @param {?} ext
         * @param {?} context
         * @param {?} rootNodes
         * @return {?}
         */
        PblNgridHeaderCellComponent.prototype.createComponent = /**
         * @protected
         * @param {?} ext
         * @param {?} context
         * @param {?} rootNodes
         * @return {?}
         */
        function (ext, context, rootNodes) {
            /** @type {?} */
            var factory = ext.getFactory(context);
            /** @type {?} */
            var projectedContent = [];
            if (ext.projectContent) {
                projectedContent.push(rootNodes);
            }
            /** @type {?} */
            var cmpRef = this.vcRef.createComponent(factory, 0, null, projectedContent);
            if (ext.projectContent) {
                rootNodes = [cmpRef.location.nativeElement];
            }
            if (ext.onCreated) {
                ext.onCreated(context, cmpRef);
            }
            return rootNodes;
        };
        PblNgridHeaderCellComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-header-cell',
                        host: {
                            class: 'pbl-ngrid-header-cell',
                            role: 'columnheader',
                        },
                        exportAs: 'ngridHeaderCell',
                        template: "<ng-container #vcRef></ng-container>",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    }] }
        ];
        /** @nocollapse */
        PblNgridHeaderCellComponent.ctorParameters = function () { return [
            { type: PblNgridColumnDef },
            { type: PblNgridComponent },
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        PblNgridHeaderCellComponent.propDecorators = {
            vcRef: [{ type: core.ViewChild, args: ['vcRef', { read: core.ViewContainerRef, static: true },] }]
        };
        return PblNgridHeaderCellComponent;
    }(table.CdkHeaderCell));
    if (false) {
        /** @type {?} */
        PblNgridHeaderCellComponent.prototype.vcRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridHeaderCellComponent.prototype.el;
        /** @type {?} */
        PblNgridHeaderCellComponent.prototype.cellCtx;
        /** @type {?} */
        PblNgridHeaderCellComponent.prototype.columnDef;
        /** @type {?} */
        PblNgridHeaderCellComponent.prototype.table;
        /** @type {?} */
        PblNgridHeaderCellComponent.prototype.elementRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridHeaderCellComponent.prototype.zone;
    }
    /**
     * Cell template container that adds the right classes and role.
     */
    var PblNgridCellDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellDirective, _super);
        function PblNgridCellDirective(colDef, elementRef) {
            var _this = _super.call(this, colDef, elementRef) || this;
            _this.colDef = colDef;
            _this.focused = false;
            _this.selected = false;
            _this.colIndex = _this.colDef.table.columnApi.indexOf((/** @type {?} */ (colDef.column)));
            _this.el = elementRef.nativeElement;
            colDef.applyWidth(_this.el);
            initCellElement(_this.el, colDef.column);
            initDataCellElement(_this.el, (/** @type {?} */ (colDef.column)));
            return _this;
        }
        Object.defineProperty(PblNgridCellDirective.prototype, "rowCtx", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value !== this._rowCtx) {
                    this._rowCtx = value;
                    this.ngDoCheck();
                }
            },
            enumerable: true,
            configurable: true
        });
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        /**
         * @return {?}
         */
        PblNgridCellDirective.prototype.ngDoCheck = 
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        /**
         * @return {?}
         */
        function () {
            if (this.colDef.isDirty) {
                this.colDef.applyWidth(this.el);
            }
            if (this._rowCtx) {
                /** @type {?} */
                var cellContext = this.cellCtx = this._rowCtx.cell(this.colIndex);
                if (cellContext.focused !== this.focused) {
                    if (this.focused = cellContext.focused) {
                        this.el.classList.add('pbl-ngrid-cell-focused');
                    }
                    else {
                        this.el.classList.remove('pbl-ngrid-cell-focused');
                    }
                }
                if (this.cellCtx.selected !== this.selected) {
                    if (this.selected = cellContext.selected) {
                        this.el.classList.add('pbl-ngrid-cell-selected');
                    }
                    else {
                        this.el.classList.remove('pbl-ngrid-cell-selected');
                    }
                }
            }
        };
        PblNgridCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'pbl-ngrid-cell',
                        host: {
                            'class': 'pbl-ngrid-cell',
                            'role': 'gridcell',
                        },
                        exportAs: 'pblNgridCell',
                    },] }
        ];
        /** @nocollapse */
        PblNgridCellDirective.ctorParameters = function () { return [
            { type: PblNgridColumnDef },
            { type: core.ElementRef }
        ]; };
        PblNgridCellDirective.propDecorators = {
            rowCtx: [{ type: core.Input }]
        };
        return PblNgridCellDirective;
    }(table.CdkCell));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridCellDirective.prototype._rowCtx;
        /** @type {?} */
        PblNgridCellDirective.prototype.cellCtx;
        /**
         * The position of the column def among all columns regardless of visibility.
         * @type {?}
         * @private
         */
        PblNgridCellDirective.prototype.colIndex;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellDirective.prototype.el;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellDirective.prototype.focused;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellDirective.prototype.selected;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellDirective.prototype.colDef;
    }
    var PblNgridFooterCellDirective = /** @class */ (function (_super) {
        __extends(PblNgridFooterCellDirective, _super);
        function PblNgridFooterCellDirective(columnDef, table, elementRef) {
            var _this = _super.call(this, columnDef, elementRef) || this;
            _this.columnDef = columnDef;
            _this.table = table;
            _this.el = elementRef.nativeElement;
            /** @type {?} */
            var column = columnDef.column;
            columnDef.applyWidth(_this.el);
            initCellElement(_this.el, column);
            return _this;
        }
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        /**
         * @return {?}
         */
        PblNgridFooterCellDirective.prototype.ngDoCheck = 
        // TODO: smart diff handling... handle all diffs, not just width, and change only when required.
        /**
         * @return {?}
         */
        function () {
            if (this.columnDef.isDirty) {
                this.columnDef.applyWidth(this.el);
            }
        };
        /**
         * @return {?}
         */
        PblNgridFooterCellDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.cellCtx = MetaCellContext.create(this.columnDef.column, this.table);
        };
        PblNgridFooterCellDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'pbl-ngrid-footer-cell',
                        host: {
                            'class': 'pbl-ngrid-footer-cell',
                            'role': 'gridcell',
                        },
                        exportAs: 'ngridFooterCell',
                    },] }
        ];
        /** @nocollapse */
        PblNgridFooterCellDirective.ctorParameters = function () { return [
            { type: PblNgridColumnDef },
            { type: PblNgridComponent },
            { type: core.ElementRef }
        ]; };
        return PblNgridFooterCellDirective;
    }(table.CdkFooterCell));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridFooterCellDirective.prototype.el;
        /** @type {?} */
        PblNgridFooterCellDirective.prototype.cellCtx;
        /**
         * @type {?}
         * @private
         */
        PblNgridFooterCellDirective.prototype.columnDef;
        /** @type {?} */
        PblNgridFooterCellDirective.prototype.table;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*
        We're using `StylingDiffer`, which is an exact copy of the style differ used for `ngStyle` and `ngClass`.
        The class is not exposed so we use a hard-copy.
        `StylingDiffer` is used only when IVY is enabled but here we've adopted it to be used in both modes. (pre IVY and IVY)
    */
    /**
     * Bind to the class / style attributes of the container of a cell template.
     * For class bindings use [ngridCellClass] and for style bindings use [ngridCellStyle].
     *
     * This is like [ngClass] or [ngStyle] but not for the host of the directive but to it's parent.
     *
     * - [ngridCellClass] accepts the same type of values that [ngClass] does.
     * - [ngridCellStyle] accepts the same type of values that [ngStyle] does.
     *
     * ## Example
     *
     * We want to create a new cell type called "balance" that represents the balance of a bank account.
     * We also want to have different background color, green if the account balance if positive and red if it's negative.
     *
     * ```html
     * <div *pblNgridCellTypeDef="'balance'; value as value"
     *      [ngClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
     * </div>
     * ```
     *
     * The example above will work but the background will not fill the entire cell, only the `div` it is applied on.
     * This is because the container of the `div` has internal styling that apply padding (among other styles) to the cell.
     *
     * The container is controlled internally by ngrid, but you can access it's style / class attributes using this directive.
     *
     * ```html
     * <div *pblNgridCellTypeDef="'balance'; value as value"
     *      [ngridCellClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
     * </div>
     * ```
     *
     * > Because style / class is applied on the parent and the parent can have multiple children it is possible to apply this directive
     * on multiple children, do not do this as it will have unexpected results.
     */
    var PblNgridCellStyling = /** @class */ (function () {
        function PblNgridCellStyling(elRef) {
            this.elRef = elRef;
            this._lastStyle = new Set();
            this._lastClass = new Set();
        }
        Object.defineProperty(PblNgridCellStyling.prototype, "style", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this._styleDiffer) {
                    this._styleDiffer = new StylingDiffer('NgStyle', 8 /* AllowUnits */);
                }
                this._styleDiffer.setValue(value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridCellStyling.prototype, "klass", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (!this._classDiffer) {
                    this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
                }
                this._classDiffer.setValue(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridCellStyling.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this._parent = this.elRef.nativeElement.parentElement;
            this.updateParent();
        };
        /**
         * @return {?}
         */
        PblNgridCellStyling.prototype.ngDoCheck = /**
         * @return {?}
         */
        function () { this, this.updateParent(); };
        /**
         * @private
         * @return {?}
         */
        PblNgridCellStyling.prototype.updateParent = /**
         * @private
         * @return {?}
         */
        function () {
            var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
            if (this._parent) {
                if (this._styleDiffer && this._styleDiffer.hasValueChanged()) {
                    /** @type {?} */
                    var lastStyle = this._lastStyle;
                    this._lastStyle = new Set();
                    try {
                        for (var _e = __values(Object.keys(this._styleDiffer.value)), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var key = _f.value;
                            this._parent.style[key] = this._styleDiffer.value[key];
                            lastStyle.delete(key);
                            this._lastStyle.add(key);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (lastStyle.size > 0) {
                        try {
                            for (var _g = __values(lastStyle.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var key = _h.value;
                                this._parent.style[key] = null;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                if (this._classDiffer && this._classDiffer.hasValueChanged()) {
                    /** @type {?} */
                    var lastClass = this._lastClass;
                    this._lastClass = new Set();
                    try {
                        for (var _j = __values(Object.keys(this._classDiffer.value)), _k = _j.next(); !_k.done; _k = _j.next()) {
                            var key = _k.value;
                            if (this._classDiffer.value[key]) {
                                this._parent.classList.add(key);
                                this._lastClass.add(key);
                            }
                            else {
                                this._parent.classList.remove(key);
                            }
                            lastClass.delete(key);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    if (lastClass.size > 0) {
                        try {
                            for (var _l = __values(lastClass.values()), _m = _l.next(); !_m.done; _m = _l.next()) {
                                var key = _m.value;
                                this._parent.classList.remove(key);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                }
            }
        };
        PblNgridCellStyling.decorators = [
            { type: core.Directive, args: [{ selector: '[ngridCellStyle], [ngridCellClass]' },] }
        ];
        /** @nocollapse */
        PblNgridCellStyling.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        PblNgridCellStyling.propDecorators = {
            style: [{ type: core.Input, args: ['ngridCellStyle',] }],
            klass: [{ type: core.Input, args: ['ngridCellClass',] }]
        };
        return PblNgridCellStyling;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridCellStyling.prototype._styleDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellStyling.prototype._classDiffer;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellStyling.prototype._parent;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellStyling.prototype._lastStyle;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellStyling.prototype._lastClass;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellStyling.prototype.elRef;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridCellEditAutoFocusDirective = /** @class */ (function () {
        function PblNgridCellEditAutoFocusDirective(elRef, ngZone) {
            this.elRef = elRef;
            this.ngZone = ngZone;
        }
        /**
         * @return {?}
         */
        PblNgridCellEditAutoFocusDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var doFocus = (/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var context = _this.context;
                context.rowContext.updateOutOfViewState();
                if (context.editing && !context.rowContext.outOfView) {
                    _this.elRef.nativeElement.focus();
                }
            });
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () {
                Promise.resolve().then((/**
                 * @return {?}
                 */
                function () {
                    if (!_this._destroyed) {
                        var viewport = _this.context.table.viewport;
                        if (viewport && viewport.isScrolling) {
                            viewport.scrolling.pipe(operators.take(1)).subscribe(doFocus);
                        }
                        else {
                            doFocus();
                        }
                    }
                }));
            }));
        };
        /**
         * @return {?}
         */
        PblNgridCellEditAutoFocusDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._destroyed = true;
        };
        PblNgridCellEditAutoFocusDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblCellEditAutoFocus]' },] }
        ];
        /** @nocollapse */
        PblNgridCellEditAutoFocusDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone }
        ]; };
        PblNgridCellEditAutoFocusDirective.propDecorators = {
            context: [{ type: core.Input, args: ['pblCellEditAutoFocus',] }]
        };
        return PblNgridCellEditAutoFocusDirective;
    }());
    if (false) {
        /** @type {?} */
        PblNgridCellEditAutoFocusDirective.prototype.context;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellEditAutoFocusDirective.prototype._destroyed;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellEditAutoFocusDirective.prototype.elRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellEditAutoFocusDirective.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Returns the split range from an aggregated range.
     * An aggregated range describes the range of header, data and footer rows currently in view.
     * This function will split the range into core section, each having it's own range.
     *
     * Note that an aggregated range can span over a single section, all sections or just 2 sections.
     * If a section is not part of the aggregated range it's range is invalid, i.e: ListRange.start >= ListRange.end.
     *
     * @param {?} range The aggregated range
     * @param {?} headerLen The total length of header rows in the table
     * @param {?} dataLen The total length of data rows in the table
     * @return {?} A tuple containing the ranges [header, data, footer].
     */
    function splitRange(range, headerLen, dataLen) {
        return [
            { start: range.start, end: headerLen },
            { start: Math.max(0, range.start - headerLen), end: Math.max(0, range.end - headerLen) },
            { start: 0, end: Math.max(0, range.end - (dataLen + headerLen)) },
        ];
    }
    /**
     * Update sticky positioning values to the rows to match virtual scroll content offset.
     * This function should run after `CdkTable` updated the sticky rows.
     *
     * ## Why
     * `CdkTable` applies sticky positioning to rows by setting top/bottom value to `0px`.
     * Virtual scroll use's a container with an offset to simulate the scrolling.
     *
     * The 2 does not work together, the virtual scroll offset will throw the sticky row out of bound, thus the top/bottom value must be compensated
     * based on the offset.
     * @param {?} offset
     * @param {?} rows
     * @param {?} stickyState
     * @param {?} type
     * @return {?}
     */
    function updateStickyRows(offset, rows, stickyState, type) {
        /** @type {?} */
        var coeff = type === 'top' ? -1 : 1;
        /** @type {?} */
        var agg = 0;
        if (coeff === 1) {
            rows = rows.slice().reverse();
        }
        for (var i in rows) {
            if (stickyState[i]) {
                /** @type {?} */
                var row = rows[i];
                row.style[type] = coeff * (offset + (coeff * agg)) + "px";
                agg += row.getBoundingClientRect().height; // TODO: cache this and update cache actively (size change)
                row.style.display = null;
            }
        }
    }
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified view within the specified range.
     * Throws an error if the range includes items that are not currently rendered.
     *
     * > This is function is identical to `CdkVirtualForOf.measureRangeSize` with minor adjustments
     * @param {?} viewContainer
     * @param {?} range
     * @param {?} renderedRange
     * @param {?} orientation
     * @param {?=} stickyState
     * @return {?}
     */
    function measureRangeSize(viewContainer, range, renderedRange, orientation, stickyState) {
        if (stickyState === void 0) { stickyState = []; }
        if (range.start >= range.end) {
            return 0;
        }
        if (range.start < renderedRange.start || range.end > renderedRange.end) {
            throw Error("Error: attempted to measure an item that isn't rendered.");
        }
        // The index into the list of rendered views for the first item in the range.
        /** @type {?} */
        var renderedStartIndex = range.start - renderedRange.start;
        // The length of the range we're measuring.
        /** @type {?} */
        var rangeLen = range.end - range.start;
        // Loop over all root nodes for all items in the range and sum up their size.
        /** @type {?} */
        var totalSize = 0;
        /** @type {?} */
        var i = rangeLen;
        while (i--) {
            /** @type {?} */
            var index = i + renderedStartIndex;
            if (!stickyState[index]) {
                /** @type {?} */
                var view = (/** @type {?} */ (viewContainer.get(index)));
                /** @type {?} */
                var j = view ? view.rootNodes.length : 0;
                while (j--) {
                    totalSize += getSize(orientation, view.rootNodes[j]);
                }
            }
        }
        return totalSize;
    }
    /**
     * Helper to extract size from a DOM Node.
     * @param {?} orientation
     * @param {?} node
     * @return {?}
     */
    function getSize(orientation, node) {
        /** @type {?} */
        var el = (/** @type {?} */ (node));
        if (!el.getBoundingClientRect) {
            return 0;
        }
        /** @type {?} */
        var rect = el.getBoundingClientRect();
        return orientation == 'horizontal' ? rect.width : rect.height;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * A class that manages the life cycle of sticky meta rows (header & footer) while scrolling.
     * Sticky meta rows are moved to containers outside of the table so they do not depend on the `position: sticky` property.
     *
     * For `position: sticky` to work, a reference position is required (`top` for header, `bottom` for footer) which must reflect the current
     * offset measured by the virtual scroll viewport (this position compensate the offset of virtual scroll so the position is leveled, i.e. like top 0)
     *
     * When the user scroll's:
     * - The offset changes by the browser
     * - The virtual scroll will detect the new offset and update the wrapper with the new offset.
     *
     * There is a time gap between the operations above which causes rows to flicker in and out of view, this is why we move them to a fixed location.
     */
    var /**
     * A class that manages the life cycle of sticky meta rows (header & footer) while scrolling.
     * Sticky meta rows are moved to containers outside of the table so they do not depend on the `position: sticky` property.
     *
     * For `position: sticky` to work, a reference position is required (`top` for header, `bottom` for footer) which must reflect the current
     * offset measured by the virtual scroll viewport (this position compensate the offset of virtual scroll so the position is leveled, i.e. like top 0)
     *
     * When the user scroll's:
     * - The offset changes by the browser
     * - The virtual scroll will detect the new offset and update the wrapper with the new offset.
     *
     * There is a time gap between the operations above which causes rows to flicker in and out of view, this is why we move them to a fixed location.
     */
    MetaRowStickyScroll = /** @class */ (function () {
        function MetaRowStickyScroll(viewport, viewPortEl, metaRows) {
            this.viewport = viewport;
            this.viewPortEl = viewPortEl;
            this.metaRows = metaRows;
            this.runningHeader = false;
            this.runningFooter = false;
            this.canMoveHeader = true;
            this.canMoveFooter = true;
            this.movedFooterRows = [];
            this.movedHeaderRows = [];
        }
        /**
         * @return {?}
         */
        MetaRowStickyScroll.prototype.canMove = /**
         * @return {?}
         */
        function () {
            return this.canMoveHeader || this.canMoveFooter;
        };
        /**
         * @return {?}
         */
        MetaRowStickyScroll.prototype.isRunning = /**
         * @return {?}
         */
        function () {
            return this.runningHeader || this.runningFooter;
        };
        /**
         * @param {?} offset
         * @param {?} viewPortElRect
         * @return {?}
         */
        MetaRowStickyScroll.prototype.move = /**
         * @param {?} offset
         * @param {?} viewPortElRect
         * @return {?}
         */
        function (offset, viewPortElRect) {
            this.moveHeader(offset, viewPortElRect);
            this.moveFooter(offset, viewPortElRect);
            return this.isRunning() && !this.canMoveHeader && !this.canMoveFooter;
        };
        /**
         * @param {?} renderedContentOffset
         * @return {?}
         */
        MetaRowStickyScroll.prototype.restore = /**
         * @param {?} renderedContentOffset
         * @return {?}
         */
        function (renderedContentOffset) {
            var _a = this.metaRows, header = _a.header, footer = _a.footer;
            if (this.restoreHeader()) {
                updateStickyRows(renderedContentOffset, header.rows, header.sticky, 'top');
            }
            if (this.restoreFooter()) {
                updateStickyRows(renderedContentOffset, footer.rows, footer.sticky, 'bottom');
            }
        };
        /**
         * @private
         * @param {?} offset
         * @param {?} viewPortElRect
         * @return {?}
         */
        MetaRowStickyScroll.prototype.moveHeader = /**
         * @private
         * @param {?} offset
         * @param {?} viewPortElRect
         * @return {?}
         */
        function (offset, viewPortElRect) {
            if (!this.runningHeader || this.canMoveHeader) {
                this.runningHeader = true;
                this.canMoveHeader = false;
                /** @type {?} */
                var stickyAndRendered = [];
                /** @type {?} */
                var headerRows = this.metaRows.header;
                /** @type {?} */
                var mostTopRect = void 0;
                for (var i = 0, len = headerRows.rows.length; i < len; i++) {
                    /** @type {?} */
                    var rowEl = headerRows.rows[i];
                    if (headerRows.sticky[i]) {
                        /** @type {?} */
                        var elRect = rowEl.getBoundingClientRect();
                        if (headerRows.rendered[i]) {
                            /** @type {?} */
                            var calc = elRect.top - viewPortElRect.top - offset;
                            // if after the scroll the element is still in view, return
                            if (calc >= 0 || -calc < viewPortElRect.height) {
                                this.canMoveHeader = true;
                                return;
                            }
                        }
                        if (!mostTopRect) {
                            mostTopRect = elRect;
                        }
                        stickyAndRendered.push(i);
                    }
                }
                if (stickyAndRendered.length) {
                    this.viewport.stickyRowHeaderContainer.style.top = mostTopRect.top + 'px';
                    this.cloneAndMoveRow(this.viewport.stickyRowHeaderContainer, headerRows.rows, stickyAndRendered, this.movedHeaderRows);
                }
            }
        };
        /**
         * @private
         * @param {?} offset
         * @param {?} viewPortElRect
         * @return {?}
         */
        MetaRowStickyScroll.prototype.moveFooter = /**
         * @private
         * @param {?} offset
         * @param {?} viewPortElRect
         * @return {?}
         */
        function (offset, viewPortElRect) {
            if (!this.runningFooter || this.canMoveFooter) {
                this.runningFooter = true;
                this.canMoveFooter = false;
                /** @type {?} */
                var stickyAndRendered = [];
                /** @type {?} */
                var footerRows = this.metaRows.footer;
                /** @type {?} */
                var mostTopRect = void 0;
                for (var i = 0, len = footerRows.rows.length; i < len; i++) {
                    /** @type {?} */
                    var rowEl = footerRows.rows[i];
                    if (footerRows.sticky[i]) {
                        /** @type {?} */
                        var elRect = rowEl.getBoundingClientRect();
                        if (footerRows.rendered[i]) {
                            /** @type {?} */
                            var calc = elRect.bottom - viewPortElRect.bottom + offset;
                            // if after the scroll the element is still in view, return
                            if (calc >= 0 && calc < viewPortElRect.height) {
                                this.canMoveFooter = true;
                                return;
                            }
                        }
                        mostTopRect = elRect;
                        stickyAndRendered.push(i);
                    }
                }
                if (stickyAndRendered.length) {
                    this.viewport.stickyRowFooterContainer.style.bottom = "calc(100% - " + mostTopRect.bottom + "px)";
                    this.cloneAndMoveRow(this.viewport.stickyRowFooterContainer, footerRows.rows, stickyAndRendered, this.movedFooterRows);
                }
            }
        };
        /**
         * @private
         * @return {?}
         */
        MetaRowStickyScroll.prototype.restoreHeader = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.runningHeader) {
                /** @type {?} */
                var movedHeaderRows = this.movedHeaderRows;
                this.movedHeaderRows = [];
                this.restoreRows(movedHeaderRows, this.metaRows.header.rows);
                this.runningHeader = false;
                this.canMoveHeader = true;
                return true;
            }
            return false;
        };
        /**
         * @private
         * @return {?}
         */
        MetaRowStickyScroll.prototype.restoreFooter = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.runningFooter) {
                /** @type {?} */
                var movedFooterRows = this.movedFooterRows;
                this.movedFooterRows = [];
                this.restoreRows(movedFooterRows, this.metaRows.footer.rows);
                this.runningFooter = false;
                this.canMoveFooter = true;
                return true;
            }
            return false;
        };
        /**
         * @private
         * @param {?} stickyRowContainer
         * @param {?} rows
         * @param {?} stickyAndRendered
         * @param {?} restoreRef
         * @return {?}
         */
        MetaRowStickyScroll.prototype.cloneAndMoveRow = /**
         * @private
         * @param {?} stickyRowContainer
         * @param {?} rows
         * @param {?} stickyAndRendered
         * @param {?} restoreRef
         * @return {?}
         */
        function (stickyRowContainer, rows, stickyAndRendered, restoreRef) {
            var e_1, _a;
            /** @type {?} */
            var innerRowContainer = (/** @type {?} */ (stickyRowContainer.firstElementChild));
            stickyRowContainer.style.width = this.viewport.innerWidth + 'px';
            innerRowContainer.style.transform = "translateX(-" + this.viewPortEl.scrollLeft + "px)";
            try {
                for (var stickyAndRendered_1 = __values(stickyAndRendered), stickyAndRendered_1_1 = stickyAndRendered_1.next(); !stickyAndRendered_1_1.done; stickyAndRendered_1_1 = stickyAndRendered_1.next()) {
                    var i = stickyAndRendered_1_1.value;
                    /** @type {?} */
                    var rowEl = rows[i];
                    /** @type {?} */
                    var clone = (/** @type {?} */ (rowEl.cloneNode()));
                    clone.style.width = '0';
                    rowEl.style.top = rowEl.style.bottom = rowEl.style.position = '';
                    rowEl.parentElement.insertBefore(clone, rowEl);
                    innerRowContainer.appendChild(rowEl);
                    restoreRef.push([rowEl, clone, i]);
                    // Assign the clone to be the sticky row element, this will ensure that stick row updates
                    // will set the `top` on an actual element in the viewport, thus updating with each layout reflow.
                    // if not set, when we return the original row it's `top` value will be true but will not show because it will not trigger a reflow.
                    rows[i] = clone;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (stickyAndRendered_1_1 && !stickyAndRendered_1_1.done && (_a = stickyAndRendered_1.return)) _a.call(stickyAndRendered_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        /**
         * @private
         * @param {?} restoreRef
         * @param {?} rows
         * @return {?}
         */
        MetaRowStickyScroll.prototype.restoreRows = /**
         * @private
         * @param {?} restoreRef
         * @param {?} rows
         * @return {?}
         */
        function (restoreRef, rows) {
            var e_2, _a;
            try {
                for (var restoreRef_1 = __values(restoreRef), restoreRef_1_1 = restoreRef_1.next(); !restoreRef_1_1.done; restoreRef_1_1 = restoreRef_1.next()) {
                    var _b = __read(restoreRef_1_1.value, 3), rowEl = _b[0], clone = _b[1], index = _b[2];
                    rowEl.style.position = clone.style.position;
                    rowEl.style.zIndex = clone.style.zIndex;
                    rowEl.style.top = clone.style.top;
                    rowEl.style.bottom = clone.style.bottom;
                    clone.parentElement.insertBefore(rowEl, clone);
                    clone.parentElement.removeChild(clone);
                    rows[index] = rowEl;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (restoreRef_1_1 && !restoreRef_1_1.done && (_a = restoreRef_1.return)) _a.call(restoreRef_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        return MetaRowStickyScroll;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.runningHeader;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.runningFooter;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.canMoveHeader;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.canMoveFooter;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.movedFooterRows;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.movedHeaderRows;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.viewport;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.viewPortEl;
        /**
         * @type {?}
         * @private
         */
        MetaRowStickyScroll.prototype.metaRows;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var FIXED_HEADER_MODE = true;
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function sortByIndex(a, b) { return a.index - b.index; }
    ;
    /**
     * @record
     */
    function NgeVirtualTableRowInfo() { }
    if (false) {
        /** @type {?} */
        NgeVirtualTableRowInfo.prototype.headerLength;
        /** @type {?} */
        NgeVirtualTableRowInfo.prototype.rowLength;
        /** @type {?} */
        NgeVirtualTableRowInfo.prototype.footerLength;
    }
    /**
     * @template T
     */
    var /**
     * @template T
     */
    PblVirtualScrollForOf = /** @class */ (function () {
        function PblVirtualScrollForOf(extApi, ngZone) {
            var _this = this;
            this.extApi = extApi;
            this.ngZone = ngZone;
            this.destroyed = new rxjs.Subject();
            this.renderedContentOffset = 0;
            /**
             * The length of meta rows [0] = header [1] = footer
             */
            this.metaRows = [0, 0];
            this.header = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
            this.footer = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
            this.table = extApi.table;
            this.cdkTable = extApi.cdkTable;
            this.viewport = extApi.table.viewport;
            this.viewChange = this.cdkTable.viewChange;
            PblNgridPluginController.find(extApi.table).events
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onDataSource') {
                    _this.detachView();
                    _this.attachView(event.curr);
                }
            }));
            this.attachView(extApi.table.ds);
            extApi.metaRowService.sync
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var headers = extApi.metaRowService.header.row.concat(extApi.metaRowService.header.sticky).sort(sortByIndex);
                /** @type {?} */
                var footers = extApi.metaRowService.footer.row.concat(extApi.metaRowService.footer.sticky).sort(sortByIndex);
                _this.header.rows = headers.map((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.el; }));
                _this.header.sticky = headers.map((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.rowDef.type === 'sticky'; }));
                _this.footer.rows = footers.map((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.el; }));
                _this.footer.sticky = footers.map((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.rowDef.type === 'sticky'; }));
                updateStickyRows(_this.renderedContentOffset, _this.header.rows, _this.header.sticky, 'top');
                updateStickyRows(_this.renderedContentOffset, _this.footer.rows, _this.footer.sticky, 'bottom');
            }));
            if (FIXED_HEADER_MODE) {
                /** @type {?} */
                var offset_1 = 0;
                /** @type {?} */
                var viewPort_1 = this.viewport.elementRef.nativeElement;
                /** @type {?} */
                var metaRowStickyScroll_1 = new MetaRowStickyScroll(this.viewport, viewPort_1, { header: this.header, footer: this.footer });
                /** @type {?} */
                var scrollPosition_1;
                /** @type {?} */
                var wheelListen_1 = (/**
                 * @return {?}
                 */
                function () { return viewPort_1.addEventListener('wheel', handler_1, true); });
                /** @type {?} */
                var wheelUnListen_1 = (/**
                 * @return {?}
                 */
                function () { return viewPort_1.removeEventListener('wheel', handler_1, true); });
                /** @type {?} */
                var updateScrollPosition_1 = (/**
                 * @return {?}
                 */
                function () { return scrollPosition_1 = (_this.viewport.measureScrollOffset()) / (_this.viewport.scrollHeight - _this.viewport.getViewportSize()); });
                /** @type {?} */
                var handler_1 = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.deltaY) {
                        if ((scrollPosition_1 === 1 && event.deltaY > 0) || (offset_1 === 0 && event.deltaY < 0)) {
                            return;
                        }
                        /** @type {?} */
                        var newOffset = offset_1 + event.deltaY;
                        newOffset = Math.min(_this.viewport.scrollHeight, Math.max(0, newOffset));
                        if (newOffset !== offset_1) {
                            offset_1 = newOffset;
                            if (metaRowStickyScroll_1.canMove() && metaRowStickyScroll_1.move(event.deltaY, viewPort_1.getBoundingClientRect())) {
                                /** @type {?} */
                                var scrollEnd$ = _this.viewport.scrolling.pipe(operators.filter((/**
                                 * @param {?} s
                                 * @return {?}
                                 */
                                function (s) { return !s; })));
                                /** @type {?} */
                                var restore_1 = (/**
                                 * @return {?}
                                 */
                                function () {
                                    metaRowStickyScroll_1.restore(_this.renderedContentOffset);
                                    updateScrollPosition_1();
                                });
                                /** @type {?} */
                                var removedEvent_1 = false;
                                if (_this.viewport.wheelMode !== 'blocking') {
                                    /** @type {?} */
                                    var wheelMode_1 = _this.viewport.wheelMode;
                                    if (wheelMode_1 === 'passive') {
                                        wheelUnListen_1();
                                        _this.viewport.scrolling.pipe(operators.debounceTime(150), operators.filter((/**
                                         * @param {?} s
                                         * @return {?}
                                         */
                                        function (s) { return !s; })), operators.take(1))
                                            .subscribe((/**
                                         * @return {?}
                                         */
                                        function () {
                                            restore_1();
                                            wheelListen_1();
                                        }));
                                    }
                                    else {
                                        _this.viewport.scrollFrameRate
                                            .pipe(operators.takeUntil(scrollEnd$.pipe(operators.take(1))))
                                            .subscribe((/**
                                         * @param {?} frameRate
                                         * @return {?}
                                         */
                                        function (frameRate) {
                                            if (!removedEvent_1 && frameRate < wheelMode_1) {
                                                wheelUnListen_1();
                                                removedEvent_1 = true;
                                            }
                                        }), null, (/**
                                         * @return {?}
                                         */
                                        function () {
                                            /** @type {?} */
                                            var lastWheel$ = rxjs.fromEvent(viewPort_1, 'wheel').pipe(operators.debounceTime(50), operators.take(1));
                                            rxjs.race(lastWheel$, (/** @type {?} */ (rxjs.timer(51))))
                                                .subscribe((/**
                                             * @return {?}
                                             */
                                            function () {
                                                restore_1();
                                                if (removedEvent_1) {
                                                    wheelListen_1();
                                                }
                                            }));
                                            // we restore back after 100 ms, for some reason, if it's immediate, we hit a cycle of wheel/scroll/no-scroll and not wheel/scroll/WAIIIIIT/no-scrol
                                            // TODO: maybe we can measure time between no-scrolling and wheel to find this MS value
                                            //        OR, register a temp `wheel` listener that will detect wheel end and re-register the original handler.
                                        }));
                                    }
                                }
                                else {
                                    scrollEnd$.pipe(operators.take(1)).subscribe(restore_1);
                                }
                            }
                        }
                        _this.viewport.scrollToOffset(offset_1);
                        event.preventDefault();
                        event.stopPropagation();
                        return true;
                    }
                });
                updateScrollPosition_1();
                wheelListen_1();
                this.viewport.scrolling.subscribe((/**
                 * @param {?} isScrolling
                 * @return {?}
                 */
                function (isScrolling) {
                    if (!isScrolling) {
                        offset_1 = _this.viewport.measureScrollOffset();
                    }
                }));
            }
            this.viewport.offsetChange
                .pipe(operators.takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} offset
             * @return {?}
             */
            function (offset) {
                if (_this.renderedContentOffset !== offset) {
                    _this.renderedContentOffset = offset;
                    updateStickyRows(offset, _this.header.rows, _this.header.sticky, 'top');
                    updateStickyRows(offset, _this.footer.rows, _this.footer.sticky, 'bottom');
                }
            }));
        }
        Object.defineProperty(PblVirtualScrollForOf.prototype, "headerLength", {
            get: /**
             * @return {?}
             */
            function () { return this.header.rows.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblVirtualScrollForOf.prototype, "rowLength", {
            get: /**
             * @return {?}
             */
            function () { return this.vcRefs.data.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblVirtualScrollForOf.prototype, "footerLength", {
            get: /**
             * @return {?}
             */
            function () { return this.footer.rows.length; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblVirtualScrollForOf.prototype, "vcRefs", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                /** @type {?} */
                var value = {
                    header: this.cdkTable._headerRowOutlet.viewContainer,
                    data: this.cdkTable._rowOutlet.viewContainer,
                    footer: this.cdkTable._footerRowOutlet.viewContainer,
                };
                Object.defineProperty(this, 'vcRefs', { value: value, configurable: true });
                return value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Measures the combined size (width for horizontal orientation, height for vertical) of all items
         * in the specified range. Throws an error if the range includes items that are not currently
         * rendered.
         */
        /**
         * Measures the combined size (width for horizontal orientation, height for vertical) of all items
         * in the specified range. Throws an error if the range includes items that are not currently
         * rendered.
         * @param {?} range
         * @param {?} orientation
         * @return {?}
         */
        PblVirtualScrollForOf.prototype.measureRangeSize = /**
         * Measures the combined size (width for horizontal orientation, height for vertical) of all items
         * in the specified range. Throws an error if the range includes items that are not currently
         * rendered.
         * @param {?} range
         * @param {?} orientation
         * @return {?}
         */
        function (range, orientation) {
            if (range.start >= range.end) {
                return 0;
            }
            /** @type {?} */
            var renderedRanges = this._renderedRanges;
            /** @type {?} */
            var ranges = splitRange(range, this.metaRows[0], this.ds.length);
            /** @type {?} */
            var stickyStates = [this.header.sticky, [], this.footer.sticky];
            /** @type {?} */
            var vcRefs = [this.vcRefs.header, this.vcRefs.data, this.vcRefs.footer];
            /** @type {?} */
            var vcRefSizeReducer = (/**
             * @param {?} total
             * @param {?} vcRef
             * @param {?} index
             * @return {?}
             */
            function (total, vcRef, index) {
                return total + measureRangeSize(vcRef, ranges[index], renderedRanges[index], orientation, stickyStates[index]);
            });
            return vcRefs.reduce(vcRefSizeReducer, 0);
        };
        /**
         * @return {?}
         */
        PblVirtualScrollForOf.prototype.destroy = /**
         * @return {?}
         */
        function () {
            this.detachView();
            this.destroyed.next();
            this.destroyed.complete();
        };
        /**
         * @private
         * @param {?} ds
         * @return {?}
         */
        PblVirtualScrollForOf.prototype.attachView = /**
         * @private
         * @param {?} ds
         * @return {?}
         */
        function (ds) {
            var _this = this;
            if (ds) {
                this.ds = ds;
                this._renderedRanges = [{ start: 0, end: 0 }, this.cdkTable.viewChange.value, { start: 0, end: 0 }];
                this.viewport.renderedRangeStream
                    .pipe(operators.takeUntil(this.destroyed))
                    .subscribe((/**
                 * @param {?} range
                 * @return {?}
                 */
                function (range) {
                    if (_this.headerLength + _this.footerLength === 0) { // if no row/sticky meta rows, move on...
                        _this._renderedRanges = [{ start: 0, end: 0 }, range, { start: 0, end: 0 }];
                        return _this.cdkTable.viewChange.next(range);
                    }
                    /*  WHAT IS GOING ON HERE? */
                    /*  Table rows are split into 3 sections: Header, Data, Footer.
                        In the virtual playground only DATA rows are dynamic. Header & Footer rows are fixed.
          
                        The `CdkTable` works the same, also have the same sections with a stream API for DATA rows only.
                        `CdkTable.viewChange.next(RANGE)` will emit to the datasource which will result in a new data section from the datasource.
          
                        `CdkTable` alone does not support virtual scrolling, to achieve it we use a virtual scroll viewport which wraps the entire `CdkTable`.
                        This means that ALL sections are wrapped (hence scrolled over) but only DATA rows are moving...
          
                        Each emission of `ListRange` in `renderedRangeStream` is based on size calculation of ALL sections (see `measureRangeSize` above)
                        and we need to extract the relevant range for DATA rows only and pass it on to the table.
          
                        To make this work we need to extract Header/Footer rows based on the starting position of the range and handle them as well.
                        Because the table will only handle the scrolling of DATA rows we need to update HEADER/FOOTER rows to show/hide based on the range.
          
                        Because Header/Footer rows are fixed we do this by hiding them with `display: none`, unless they are sticky / pinned.
                        One exception is the main header row, which we hide virtually because we need it to render and reflect the cell size.
          
                        We first extract the actual ranges for each section and update the `CdkTable` with the DATA row range.
                        We then wait for the rows to render, which is the time for us to also "render" Header/Footer rows...
                        We don't "render" them per-se, they are already rendered, we just show/hide them based on the range and state (sticky).
                        This is important, hiding will cause the total height of the scroll container to shrink to the size it should be.
                        We defer this operation to run AFTER the rows are rendered (not immediately) because an immediate change will trigger
                        a change in the scroll container size resulting in a scroll event that will bring us back here but this time with
                        a height that does not fit the range. Immediate change removes rows (Header/Footer) before the new range is applied.
                        Only after the rows are rendered we can show/hide the Header/Footer rows.
                    */
                    // Extracting actual ranges for each section.
                    _this._renderedRanges = splitRange(range, _this.metaRows[0], ds.length);
                    var _a = __read(_this._renderedRanges, 3), header = _a[0], data = _a[1], footer = _a[2];
                    _this.cdkTable.onRenderRows.pipe(operators.take(1)).subscribe((/**
                     * @return {?}
                     */
                    function () {
                        // We update the header DOM elements in reverse, skipping the last (first when reversed) DOM element.
                        // The skipped element is the table's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
                        // An hidden row is one that is out of range AND not sticky
                        if (_this.headerLength > 0) {
                            /** @type {?} */
                            var htmlRows = _this.header.rows;
                            /** @type {?} */
                            var renderedRows = _this.header.rendered;
                            /** @type {?} */
                            var stickyRows = _this.header.sticky;
                            /** @type {?} */
                            var rowIndex = 0;
                            for (var len = _this.header.sticky.length - 1; rowIndex < len; rowIndex++) {
                                // assign rendered state + if not rendered and not sticky, set display to "none"
                                htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]
                                    ? 'none'
                                    : null;
                            }
                            // Here we update the main header row, when we need to hide it we apply a class that will hide it virtually, i.e. not showing but keeping internal layout.
                            if (!(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]) {
                                htmlRows[rowIndex].classList.add('pbl-ngrid-row-visually-hidden');
                            }
                            else if (_this.table.showHeader && htmlRows[rowIndex]) {
                                htmlRows[rowIndex].classList.remove('pbl-ngrid-row-visually-hidden');
                            }
                        }
                        if (_this.footerLength > 0) {
                            /** @type {?} */
                            var htmlRows = _this.footer.rows;
                            /** @type {?} */
                            var renderedRows = _this.footer.rendered;
                            /** @type {?} */
                            var stickyRows = _this.footer.sticky;
                            /** @type {?} */
                            var rowIndex = 0;
                            for (var len = _this.footer.sticky.length; rowIndex < len; rowIndex++) {
                                // assign rendered state + if not rendered and not sticky, set display to "none"
                                htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex < footer.end) && !stickyRows[rowIndex]
                                    ? 'none'
                                    : null;
                            }
                        }
                    }));
                    _this.cdkTable.viewChange.next(data);
                }));
                // add meta rows to the total row count.
                this.dataStream = ds.onRenderDataChanging
                    .pipe(operators.takeUntil(this.destroyed), operators.map((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var data = _a.data;
                    /** @type {?} */
                    var metaRows = _this.metaRows = [_this.header.rows.length, _this.footer.rows.length];
                    return new Array(data.length + metaRows[0] + metaRows[1]);
                })));
                ds.onRenderedDataChanged
                    .pipe(operators.takeUntil(this.destroyed), operators.map((/**
                 * @return {?}
                 */
                function () { return ds.length; })), operators.startWith(0), operators.pairwise(), operators.filter((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), prev = _b[0], curr = _b[1];
                    return prev !== curr;
                })))
                    .subscribe((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = __read(_a, 2), prev = _b[0], curr = _b[1];
                    _this.ngZone.onStable.pipe(operators.take(1)).subscribe((/**
                     * @return {?}
                     */
                    function () { return _this.viewport.onSourceLengthChange(prev, curr); }));
                }));
                this.viewport.attach((/** @type {?} */ (this)));
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblVirtualScrollForOf.prototype.detachView = /**
         * @private
         * @return {?}
         */
        function () {
            this.ds = undefined;
            this.viewport.detach();
        };
        return PblVirtualScrollForOf;
    }());
    if (false) {
        /** @type {?} */
        PblVirtualScrollForOf.prototype.viewChange;
        /** @type {?} */
        PblVirtualScrollForOf.prototype.dataStream;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.destroyed;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.ds;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.renderedContentOffset;
        /**
         * A tuple containing the last known ranges [header, data, footer]
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype._renderedRanges;
        /**
         * The length of meta rows [0] = header [1] = footer
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.metaRows;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.header;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.footer;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.cdkTable;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.viewport;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.extApi;
        /**
         * @type {?}
         * @private
         */
        PblVirtualScrollForOf.prototype.ngZone;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Wrapper for the CdkTable that extends it's functionality to support various table features.
     * This wrapper also applies Material Design table styles (i.e. `MatTable` styles).
     *
     * Most of the extensions are done using mixins, this is mostly for clarity and separation of the features added.
     * This approach will allow easy removal when a feature is no longer required/implemented natively.
     * @template T
     */
    var PblCdkTableComponent = /** @class */ (function (_super) {
        __extends(PblCdkTableComponent, _super);
        function PblCdkTableComponent(_differs, _changeDetectorRef, _elementRef, role, _dir, injector, table, extApi, _document, platform) {
            var _this = _super.call(this, _differs, _changeDetectorRef, _elementRef, role, _dir, _document, platform) || this;
            _this.injector = injector;
            _this.table = table;
            _this.extApi = extApi;
            _this._minWidth = null;
            //#endregion CSS-CLASS-CONTROL
            //#region CLEAR-ROW-DEFS
            // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
            _this._cachedRowDefs = { header: new Set(), footer: new Set() }; //tslint:disable-line
            _this.table._cdkTable = _this;
            _this.trackBy = _this.table.trackBy;
            extApi.events.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                if (e.kind === 'beforeInvalidateHeaders') {
                    if (_this._lastSticky) {
                        _this._lastSticky.queryCellElements('header', 'table', 'footer')
                            .forEach((/**
                         * @param {?} el
                         * @return {?}
                         */
                        function (el) { return el.classList.remove('pbl-ngrid-sticky-start'); }));
                        _this._lastSticky = undefined;
                    }
                    if (_this._lastStickyEnd) {
                        _this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                            .forEach((/**
                         * @param {?} el
                         * @return {?}
                         */
                        function (el) { return el.classList.remove('pbl-ngrid-sticky-end'); }));
                        _this._lastStickyEnd = undefined;
                    }
                }
            }));
            return _this;
        }
        Object.defineProperty(PblCdkTableComponent.prototype, "_element", {
            get: /**
             * @return {?}
             */
            function () { return this._elementRef.nativeElement; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkTableComponent.prototype, "onRenderRows", {
            get: /**
             * @return {?}
             */
            function () {
                if (!this.onRenderRows$) {
                    this.onRenderRows$ = new rxjs.Subject();
                }
                return this.onRenderRows$.asObservable();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkTableComponent.prototype, "minWidth", {
            get: /**
             * @return {?}
             */
            function () { return this._minWidth; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._minWidth = value || null;
                this._element.style.minWidth = value ? value + 'px' : null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.updateStickyColumnStyles = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this._isStickyPending) {
                return;
            }
            this._isStickyPending = true;
            Promise.resolve()
                .then((/**
             * @return {?}
             */
            function () {
                _this._isStickyPending = false;
                _this._updateStickyColumnStyles();
            }));
        };
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            if (this.onRenderRows$) {
                this.onRenderRows$.complete();
            }
            this.virtualScrollDestroy();
        };
        //#region CSS-CLASS-CONTROL
        //#region CSS-CLASS-CONTROL
        /**
         * @param {?} cssClassName
         * @return {?}
         */
        PblCdkTableComponent.prototype.addClass = 
        //#region CSS-CLASS-CONTROL
        /**
         * @param {?} cssClassName
         * @return {?}
         */
        function (cssClassName) {
            this._element.classList.add(cssClassName);
        };
        /**
         * @param {?} cssClassName
         * @return {?}
         */
        PblCdkTableComponent.prototype.removeClass = /**
         * @param {?} cssClassName
         * @return {?}
         */
        function (cssClassName) {
            this._element.classList.remove(cssClassName);
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        //tslint:disable-line
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @param {?} headerRowDef
         * @return {?}
         */
        PblCdkTableComponent.prototype.addHeaderRowDef = 
        //tslint:disable-line
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @param {?} headerRowDef
         * @return {?}
         */
        function (headerRowDef) {
            _super.prototype.addHeaderRowDef.call(this, headerRowDef);
            this._cachedRowDefs.header.add(headerRowDef);
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.clearHeaderRowDefs = 
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            var header = this._cachedRowDefs.header;
            try {
                for (var _b = __values(Array.from(header.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var rowDef = _c.value;
                    this.removeHeaderRowDef(rowDef);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            header.clear();
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @param {?} footerRowDef
         * @return {?}
         */
        PblCdkTableComponent.prototype.addFooterRowDef = 
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @param {?} footerRowDef
         * @return {?}
         */
        function (footerRowDef) {
            _super.prototype.addFooterRowDef.call(this, footerRowDef);
            this._cachedRowDefs.footer.add(footerRowDef);
        };
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.clearFooterRowDefs = 
        // TODO: remove if https://github.com/angular/material2/pull/13000 is pushed
        /**
         * @return {?}
         */
        function () {
            var e_2, _a;
            var footer = this._cachedRowDefs.footer;
            try {
                for (var _b = __values(Array.from(footer.values())), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var rowDef = _c.value;
                    this.removeFooterRowDef(rowDef);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            footer.clear();
        };
        //tslint:disable-line
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.attachViewPort = 
        //tslint:disable-line
        /**
         * @return {?}
         */
        function () {
            this.detachViewPort();
            this.forOf = new PblVirtualScrollForOf(this.extApi, this.injector.get(core.NgZone));
        };
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.detachViewPort = /**
         * @return {?}
         */
        function () {
            if (this.forOf) {
                this.forOf.destroy();
                this.forOf = undefined;
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblCdkTableComponent.prototype.virtualScrollDestroy = /**
         * @private
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this.detachViewPort();
        };
        //#endregion VIRTUAL-SCROLL
        /**
         * An alias for `_cacheRowDefs()`
         */
        //#endregion VIRTUAL-SCROLL
        /**
         * An alias for `_cacheRowDefs()`
         * @return {?}
         */
        PblCdkTableComponent.prototype.updateRowDefCache = 
        //#endregion VIRTUAL-SCROLL
        /**
         * An alias for `_cacheRowDefs()`
         * @return {?}
         */
        function () {
            ((/** @type {?} */ (this)))._cacheRowDefs();
        };
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.renderRows = /**
         * @return {?}
         */
        function () {
            _super.prototype.renderRows.call(this);
            // The problem of inheritance right at your face
            // Because material does not allow us to control the context generation for a row we need to get clever.
            // https://github.com/angular/components/issues/14199
            // TODO: If they do allow controlling context generation, remove this and apply their solution.
            /** @type {?} */
            var viewContainer = this._rowOutlet.viewContainer;
            for (var renderIndex = 0, count = viewContainer.length; renderIndex < count; renderIndex++) {
                /** @type {?} */
                var viewRef = (/** @type {?} */ (viewContainer.get(renderIndex)));
                /** @type {?} */
                var context = viewRef.context;
                context.gridInstance = this.table;
            }
            if (this.onRenderRows$) {
                this.onRenderRows$.next(this._rowOutlet);
            }
        };
        /**
         * @param {?=} rowType
         * @param {...?} rows
         * @return {?}
         */
        PblCdkTableComponent.prototype.syncRows = /**
         * @param {?=} rowType
         * @param {...?} rows
         * @return {?}
         */
        function (rowType) {
            if (rowType === void 0) { rowType = false; }
            var rows = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                rows[_i - 1] = arguments[_i];
            }
            /** @type {?} */
            var detectChanges = typeof rowType === 'boolean'
                ? rowType
                : typeof rows[0] === 'boolean'
                    ? rows.shift()
                    : false;
            /** @type {?} */
            var vcRef;
            switch (rowType) {
                case 'header':
                    vcRef = this._headerRowOutlet.viewContainer;
                    break;
                case 'data':
                    vcRef = this._rowOutlet.viewContainer;
                    break;
                case 'footer':
                    vcRef = this._footerRowOutlet.viewContainer;
                    break;
                default: // boolean or 'all'
                    this._changeDetectorRef.markForCheck();
                    if (detectChanges) {
                        this._changeDetectorRef.detectChanges();
                    }
                    return;
            }
            /** @type {?} */
            var useSpecificRows = rows.length > 0;
            /** @type {?} */
            var count = useSpecificRows ? rows.length : vcRef.length;
            for (var renderIndex = 0; renderIndex < count; renderIndex++) {
                /** @type {?} */
                var viewRef = (/** @type {?} */ (vcRef.get(useSpecificRows ? rows[renderIndex] : renderIndex)));
                if (viewRef) {
                    viewRef.markForCheck();
                    if (detectChanges) {
                        viewRef.detectChanges();
                    }
                }
            }
        };
        /**
         * @return {?}
         */
        PblCdkTableComponent.prototype.pblForceRenderDataRows = /**
         * @return {?}
         */
        function () {
            try {
                ((/** @type {?} */ (this)))._forceRenderDataRows();
            }
            catch (ex) {
                this.multiTemplateDataRows = this.multiTemplateDataRows;
            }
        };
        /**
         * @private
         * @return {?}
         */
        PblCdkTableComponent.prototype._updateStickyColumnStyles = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var columns = this.table.columnApi.visibleColumns;
            /** @type {?} */
            var sticky;
            /** @type {?} */
            var stickyEnd;
            for (var i = 0, len = columns.length; i < len; i++) {
                if (columns[i].columnDef && columns[i].columnDef.sticky) {
                    sticky = columns[i].columnDef;
                }
            }
            for (var i = columns.length - 1; i > -1; i--) {
                if (columns[i].columnDef && columns[i].columnDef.stickyEnd) {
                    stickyEnd = columns[i].columnDef;
                }
            }
            if (this._lastSticky) {
                this._lastSticky.queryCellElements('header', 'table', 'footer')
                    .forEach((/**
                 * @param {?} el
                 * @return {?}
                 */
                function (el) { return el.classList.remove('pbl-ngrid-sticky-start'); }));
            }
            if (sticky) {
                sticky.queryCellElements('header', 'table', 'footer')
                    .forEach((/**
                 * @param {?} el
                 * @return {?}
                 */
                function (el) { return el.classList.add('pbl-ngrid-sticky-start'); }));
            }
            this._lastSticky = sticky;
            if (this._lastStickyEnd) {
                this._lastStickyEnd.queryCellElements('header', 'table', 'footer')
                    .forEach((/**
                 * @param {?} el
                 * @return {?}
                 */
                function (el) { return el.classList.remove('pbl-ngrid-sticky-end'); }));
            }
            if (stickyEnd) {
                stickyEnd.queryCellElements('header', 'table', 'footer')
                    .forEach((/**
                 * @param {?} el
                 * @return {?}
                 */
                function (el) { return el.classList.add('pbl-ngrid-sticky-end'); }));
            }
            this._lastStickyEnd = stickyEnd;
            _super.prototype.updateStickyColumnStyles.call(this);
        };
        PblCdkTableComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-cdk-table',
                        exportAs: 'pblCdkTable',
                        template: table.CDK_TABLE_TEMPLATE,
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'pbl-cdk-table',
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: [".pbl-cdk-table{display:block}.pbl-ngrid-footer-row,.pbl-ngrid-header-row,.pbl-ngrid-row{display:-webkit-box;display:flex;border-width:0 0 1px;border-style:solid;-webkit-box-align:center;align-items:center;box-sizing:border-box;position:relative}.pbl-ngrid-footer-row::after,.pbl-ngrid-header-row::after,.pbl-ngrid-row::after{display:inline-block;min-height:inherit;content:''}.pbl-ngrid-cell,.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;overflow:hidden;word-wrap:break-word;min-height:inherit}.pbl-ngrid-header-cell.pbl-header-group-cell{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.pbl-ngrid-header-cell.pbl-header-group-cell.pbl-header-group-cell-placeholder{border:none}.pbl-ngrid-footer-cell,.pbl-ngrid-header-cell{position:relative}.pbl-ngrid-cell{cursor:default;outline:0}.pbl-ngrid-editable-cell{cursor:text}"]
                    }] }
        ];
        /** @nocollapse */
        PblCdkTableComponent.ctorParameters = function () { return [
            { type: core.IterableDiffers },
            { type: core.ChangeDetectorRef },
            { type: core.ElementRef },
            { type: String, decorators: [{ type: core.Attribute, args: ['role',] }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: core.Injector },
            { type: PblNgridComponent },
            { type: undefined, decorators: [{ type: core.Inject, args: [EXT_API_TOKEN,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: platform.Platform }
        ]; };
        return PblCdkTableComponent;
    }(table.CdkTable));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype._minWidth;
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype.onRenderRows$;
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype._lastSticky;
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype._lastStickyEnd;
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype._isStickyPending;
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype._cachedRowDefs;
        /**
         * @type {?}
         * @private
         */
        PblCdkTableComponent.prototype.forOf;
        /**
         * @type {?}
         * @protected
         */
        PblCdkTableComponent.prototype.injector;
        /**
         * @type {?}
         * @protected
         */
        PblCdkTableComponent.prototype.table;
        /**
         * @type {?}
         * @protected
         */
        PblCdkTableComponent.prototype.extApi;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PBL_NGRID_MAP = new Map();
    var PblNgridGroupHeaderSizeController = /** @class */ (function () {
        function PblNgridGroupHeaderSizeController(table) {
            var _this = this;
            this.table = table;
            this.columns = [];
            this.entries = new WeakMap();
            this.ro = new ResizeObserver((/**
             * @param {?} entries
             * @return {?}
             */
            function (entries) {
                requestAnimationFrame((/**
                 * @return {?}
                 */
                function () { return _this.onResize(entries); }));
            }));
        }
        /**
         * @param {?} table
         * @return {?}
         */
        PblNgridGroupHeaderSizeController.get = /**
         * @param {?} table
         * @return {?}
         */
        function (table) {
            /** @type {?} */
            var controller = PBL_NGRID_MAP.get(table);
            if (!controller) {
                controller = new PblNgridGroupHeaderSizeController(table);
                PBL_NGRID_MAP.set(table, controller);
            }
            return controller;
        };
        /**
         * @param {?} col
         * @return {?}
         */
        PblNgridGroupHeaderSizeController.prototype.add = /**
         * @param {?} col
         * @return {?}
         */
        function (col) {
            this.entries.set(col.target, col);
            this.ro.observe(col.target);
            this.columns.push(col);
        };
        /**
         * @param {?} col
         * @return {?}
         */
        PblNgridGroupHeaderSizeController.prototype.remove = /**
         * @param {?} col
         * @return {?}
         */
        function (col) {
            this.ro.unobserve(col.target);
            this.entries.delete(col.target);
            /** @type {?} */
            var idx = this.columns.indexOf(col);
            if (idx > -1) {
                this.columns.splice(idx, 1);
            }
            if (this.columns.length === 0) {
                this.ro.disconnect();
                PBL_NGRID_MAP.delete(this.table);
            }
        };
        /**
         * @private
         * @param {?} entries
         * @return {?}
         */
        PblNgridGroupHeaderSizeController.prototype.onResize = /**
         * @private
         * @param {?} entries
         * @return {?}
         */
        function (entries) {
            var e_1, _a, e_2, _b;
            /** @type {?} */
            var resized = [];
            try {
                for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                    var entry = entries_1_1.value;
                    /** @type {?} */
                    var o = this.entries.get(entry.target);
                    if (o) {
                        resized.push(o);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (resized.length > 0) {
                /** @type {?} */
                var isDragging = false;
                try {
                    for (var resized_1 = __values(resized), resized_1_1 = resized_1.next(); !resized_1_1.done; resized_1_1 = resized_1.next()) {
                        var c = resized_1_1.value;
                        isDragging = isDragging || c.column.columnDef.isDragging;
                        c.updateSize();
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (resized_1_1 && !resized_1_1.done && (_b = resized_1.return)) _b.call(resized_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                if (!isDragging) {
                    this.table.resizeColumns(this.columns.map((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.column; })));
                }
            }
        };
        return PblNgridGroupHeaderSizeController;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridGroupHeaderSizeController.prototype.entries;
        /**
         * @type {?}
         * @private
         */
        PblNgridGroupHeaderSizeController.prototype.ro;
        /**
         * @type {?}
         * @private
         */
        PblNgridGroupHeaderSizeController.prototype.columns;
        /**
         * @type {?}
         * @private
         */
        PblNgridGroupHeaderSizeController.prototype.table;
    }
    /**
     * A directive that listen to size changes from the element of a cell, using ResizeObserver.
     * When a change occurs it will emit it to the PblTable host of this directive, along with all other observed columns for the table.
     *
     * In other words, all columns of a table, marked with `PblColumnSizeObserver`, will be sent.
     *
     * Because most of the size changes concern all columns of a row and because ResizeObserver will emit them all in the same event
     * an entire row should emit once, with all columns.
     */
    var PblColumnSizeObserver = /** @class */ (function (_super) {
        __extends(PblColumnSizeObserver, _super);
        function PblColumnSizeObserver(el, table) {
            var _this = _super.call(this, el.nativeElement) || this;
            _this.controller = PblNgridGroupHeaderSizeController.get(table);
            return _this;
        }
        Object.defineProperty(PblColumnSizeObserver.prototype, "column", {
            get: /**
             * @return {?}
             */
            function () { return this._column; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this.attachColumn(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblColumnSizeObserver.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            this.controller.add(this);
        };
        /**
         * @return {?}
         */
        PblColumnSizeObserver.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.controller.remove(this);
            this.detachColumn();
        };
        PblColumnSizeObserver.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid-cell[observeSize], pbl-ngrid-header-cell[observeSize]' },] }
        ];
        /** @nocollapse */
        PblColumnSizeObserver.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: PblNgridComponent }
        ]; };
        PblColumnSizeObserver.propDecorators = {
            column: [{ type: core.Input, args: ['observeSize',] }]
        };
        return PblColumnSizeObserver;
    }(ColumnSizeInfo));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblColumnSizeObserver.prototype.controller;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var noop = (/**
     * @param {?=} nv
     * @param {?=} nv1
     * @return {?}
     */
    function (nv, nv1) { });
    var ɵ0$1 = noop;
    var NoVirtualScrollStrategy = /** @class */ (function () {
        function NoVirtualScrollStrategy() {
            this.attach = noop;
            this.detach = noop;
            this.onContentScrolled = noop;
            this.onDataLengthChanged = noop;
            this.onContentRendered = noop;
            this.onRenderedOffsetChanged = noop;
            this.scrollToIndex = noop;
        }
        return NoVirtualScrollStrategy;
    }());
    if (false) {
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.scrolledIndexChange;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.attach;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.detach;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.onContentScrolled;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.onDataLengthChanged;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.onContentRendered;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.onRenderedOffsetChanged;
        /** @type {?} */
        NoVirtualScrollStrategy.prototype.scrollToIndex;
    }
    var TableItemSizeAverager = /** @class */ (function (_super) {
        __extends(TableItemSizeAverager, _super);
        function TableItemSizeAverager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @param {?} range
         * @param {?} size
         * @return {?}
         */
        TableItemSizeAverager.prototype.addSample = /**
         * @param {?} range
         * @param {?} size
         * @return {?}
         */
        function (range, size) {
            if (this.rowInfo && this.rowInfo.rowLength === 0) {
                this.reset();
            }
            else {
                _super.prototype.addSample.call(this, range, size);
            }
        };
        /**
         * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
         *
         * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
         * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
         * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
         * calculation of the average item size in `ItemSizeAverager`
         *
         * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
         */
        /**
         * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
         *
         * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
         * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
         * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
         * calculation of the average item size in `ItemSizeAverager`
         *
         * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
         * @param {?} rowInfo
         * @return {?}
         */
        TableItemSizeAverager.prototype.setRowInfo = /**
         * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
         *
         * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
         * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
         * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
         * calculation of the average item size in `ItemSizeAverager`
         *
         * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
         * @param {?} rowInfo
         * @return {?}
         */
        function (rowInfo) {
            this.rowInfo = rowInfo;
        };
        return TableItemSizeAverager;
    }(scrolling$1.ItemSizeAverager));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        TableItemSizeAverager.prototype.rowInfo;
    }
    var PblNgridFixedSizeVirtualScrollStrategy = /** @class */ (function (_super) {
        __extends(PblNgridFixedSizeVirtualScrollStrategy, _super);
        function PblNgridFixedSizeVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
            var _this = _super.call(this, itemSize, minBufferPx, maxBufferPx) || this;
            _this.itemSize = itemSize;
            return _this;
        }
        /**
         * @param {?} viewport
         * @return {?}
         */
        PblNgridFixedSizeVirtualScrollStrategy.prototype.attach = /**
         * @param {?} viewport
         * @return {?}
         */
        function (viewport) {
            _super.prototype.attach.call(this, this._ngridViewport = viewport);
        };
        /**
         * @return {?}
         */
        PblNgridFixedSizeVirtualScrollStrategy.prototype.onContentScrolled = /**
         * @return {?}
         */
        function () {
            // https://github.com/shlomiassaf/ngrid/issues/11
            // This is a workaround an issue with FixedSizeVirtualScrollStrategy
            // When:
            //    - The rendered data is changed so the data length is now LOWER then the current range (end - start)
            //    - The rendering direction is towards the top (start > end)
            //
            // For the issue to occur a big gap between the data length and the range length (gap), which does not happen on normal scrolling
            // but only when the data source is replaced (e.g. filtering).
            //
            // In such cases `onDataLengthChanged` is called which will call `_updateRenderedRange` which will calculate a new range
            // that is big, it will give the `start` a new value which creates the big gap.
            // It will then calculate a new "end" and leave the "start" so we have a big gap, larger then the viewport size.
            // After that it will create the new offset which is the itemSize * start, which is a bit lower then the offset but is large and again does not fit the viewport size
            // The scroll change will trigger `onContentScrolled` which will call `_updateRenderedRange` again,
            // with the same outcome, reducing the offset slightly, calling `onContentScrolled` again.
            // It will repeat until reaching the proper offset.
            //
            // The amount of offset reduced each time is approx the size of the buffers. (mix/max Buffer).
            //
            // This strategy is here only because of this error, it will let the initial update run and catch it's subsequent scroll event.
            if (!this._ngridViewport) {
                return;
            }
            var _a = this._ngridViewport.getRenderedRange(), start = _a.start, end = _a.end;
            /** @type {?} */
            var rangeLength = end - start;
            /** @type {?} */
            var dataLength = this._ngridViewport.getDataLength();
            if (rangeLength < 0 && dataLength < -rangeLength) {
                start = dataLength - end;
                this._ngridViewport.setRenderedRange({ start: start, end: end });
                this._ngridViewport.setRenderedContentOffset(this.itemSize * start);
                // this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
            }
            else {
                _super.prototype.onContentScrolled.call(this);
            }
        };
        return PblNgridFixedSizeVirtualScrollStrategy;
    }(scrolling.FixedSizeVirtualScrollStrategy));
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridFixedSizeVirtualScrollStrategy.prototype._ngridViewport;
        /**
         * @type {?}
         * @private
         */
        PblNgridFixedSizeVirtualScrollStrategy.prototype.itemSize;
    }
    var TableAutoSizeVirtualScrollStrategy = /** @class */ (function (_super) {
        __extends(TableAutoSizeVirtualScrollStrategy, _super);
        function TableAutoSizeVirtualScrollStrategy(minBufferPx, maxBufferPx, averager) {
            if (averager === void 0) { averager = new TableItemSizeAverager(); }
            var _this = _super.call(this, minBufferPx, maxBufferPx, averager) || this;
            _this.averager = averager;
            return _this;
        }
        return TableAutoSizeVirtualScrollStrategy;
    }(scrolling$1.AutoSizeVirtualScrollStrategy));
    if (false) {
        /** @type {?} */
        TableAutoSizeVirtualScrollStrategy.prototype.averager;
    }
    /** @type {?} */
    var TYPES = ['vScrollAuto', 'vScrollFixed', 'vScrollNone'];
    /**
     * @param {?} directive
     * @return {?}
     */
    function _vScrollStrategyFactory(directive) {
        return directive._scrollStrategy;
    }
    /**
     * A virtual scroll strategy that supports unknown or dynamic size items.
     */
    var PblCdkVirtualScrollDirective = /** @class */ (function () {
        function PblCdkVirtualScrollDirective(el, table) {
            this.table = table;
            this._minBufferPx = 100;
            this._maxBufferPx = 200;
            /** @type {?} */
            var types = TYPES.filter((/**
             * @param {?} t
             * @return {?}
             */
            function (t) { return el.nativeElement.hasAttribute(t); }));
            if (types.length > 1) {
                throw new Error("Invalid vScroll instruction, only one value is allow: " + JSON.stringify(types));
            }
            else {
                this._type = types[0];
            }
        }
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "vScrollAuto", {
            /**
           * The size of the items in the list (in pixels).
           * Valid for `vScrollFixed` only!
           *
           * Default: 20
           */
            get: /**
             * The size of the items in the list (in pixels).
             * Valid for `vScrollFixed` only!
             *
             * Default: 20
             * @return {?}
             */
            function () { return this._vScrollAuto; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._vScrollAuto = coercion.coerceNumberProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "vScrollFixed", {
            /**
             * The size of the items in the list (in pixels).
             * Valid for `vScrollFixed` only!
             *
             * Default: 20
             */
            get: /**
             * The size of the items in the list (in pixels).
             * Valid for `vScrollFixed` only!
             *
             * Default: 20
             * @return {?}
             */
            function () { return this._vScrollFixed; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._vScrollFixed = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "minBufferPx", {
            /**
             * The minimum amount of buffer rendered beyond the viewport (in pixels).
             * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
             *
             * Valid for `vScrollAuto` and `vScrollFixed` only!
             * Default: 100
             */
            get: /**
             * The minimum amount of buffer rendered beyond the viewport (in pixels).
             * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
             *
             * Valid for `vScrollAuto` and `vScrollFixed` only!
             * Default: 100
             * @return {?}
             */
            function () { return this._minBufferPx; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._minBufferPx = coercion.coerceNumberProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "maxBufferPx", {
            /**
             * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
             *
             * Valid for `vScrollAuto` and `vScrollFixed` only!
             * Default: 100
             */
            get: /**
             * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
             *
             * Valid for `vScrollAuto` and `vScrollFixed` only!
             * Default: 100
             * @return {?}
             */
            function () { return this._maxBufferPx; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._maxBufferPx = coercion.coerceNumberProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "wheelMode", {
            get: /**
             * @return {?}
             */
            function () { return this._wheelMode; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                switch (value) {
                    case 'passive':
                    case 'blocking':
                        this._wheelMode = value;
                        break;
                    default:
                        /** @type {?} */
                        var wheelMode = coercion.coerceNumberProperty(value);
                        if (wheelMode && wheelMode >= 1 && wheelMode <= 60) {
                            this._wheelMode = wheelMode;
                        }
                        break;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "type", {
            get: /**
             * @return {?}
             */
            function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        ;
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            if (!this._type) {
                if ('_vScrollFixed' in (/** @type {?} */ (this))) {
                    this._type = 'vScrollFixed';
                }
                else if ('_vScrollAuto' in (/** @type {?} */ (this))) {
                    this._type = 'vScrollAuto';
                }
                else {
                    this._type = 'vScrollNone';
                }
            }
            switch (this.type) {
                case 'vScrollFixed':
                    if (!this._vScrollFixed) {
                        this.vScrollFixed = this.table.findInitialRowHeight() || 48;
                    }
                    this._scrollStrategy = new PblNgridFixedSizeVirtualScrollStrategy(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                    break;
                case 'vScrollAuto':
                    if (!this._vScrollAuto) {
                        this._vScrollAuto = this.table.findInitialRowHeight() || 48;
                    }
                    this._scrollStrategy = new TableAutoSizeVirtualScrollStrategy(this.minBufferPx, this.maxBufferPx, new TableItemSizeAverager(this._vScrollAuto));
                    break;
                default:
                    this._scrollStrategy = new NoVirtualScrollStrategy();
                    break;
            }
        };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            if (this._scrollStrategy) {
                switch (this.type) {
                    case 'vScrollFixed':
                        ((/** @type {?} */ (this._scrollStrategy)))
                            .updateItemAndBufferSize(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                        break;
                    case 'vScrollAuto':
                        ((/** @type {?} */ (this._scrollStrategy)))
                            .updateBufferSize(this.minBufferPx, this.maxBufferPx);
                        break;
                    default:
                        break;
                }
            }
        };
        Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "scrolledIndexChange", {
            get: /**
             * @return {?}
             */
            function () { return this._scrollStrategy.scrolledIndexChange; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._scrollStrategy.scrolledIndexChange = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} viewport
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.attach = /**
         * @param {?} viewport
         * @return {?}
         */
        function (viewport) { this._scrollStrategy.attach(viewport); };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.detach = /**
         * @return {?}
         */
        function () { this._scrollStrategy.detach(); };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.onContentScrolled = /**
         * @return {?}
         */
        function () { this._scrollStrategy.onContentScrolled(); };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.onDataLengthChanged = /**
         * @return {?}
         */
        function () { this._scrollStrategy.onDataLengthChanged(); };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.onContentRendered = /**
         * @return {?}
         */
        function () { this._scrollStrategy.onContentRendered(); };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.onRenderedOffsetChanged = /**
         * @return {?}
         */
        function () { this._scrollStrategy.onRenderedOffsetChanged(); };
        /**
         * @param {?} index
         * @param {?} behavior
         * @return {?}
         */
        PblCdkVirtualScrollDirective.prototype.scrollToIndex = /**
         * @param {?} index
         * @param {?} behavior
         * @return {?}
         */
        function (index, behavior) { this._scrollStrategy.scrollToIndex(index, behavior); };
        PblCdkVirtualScrollDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'pbl-ngrid[vScrollAuto], pbl-ngrid[vScrollFixed], pbl-ngrid[vScrollNone]',
                        providers: [{
                                provide: scrolling.VIRTUAL_SCROLL_STRATEGY,
                                useExisting: PblCdkVirtualScrollDirective,
                            }],
                    },] }
        ];
        /** @nocollapse */
        PblCdkVirtualScrollDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: PblNgridComponent }
        ]; };
        PblCdkVirtualScrollDirective.propDecorators = {
            vScrollAuto: [{ type: core.Input }],
            vScrollFixed: [{ type: core.Input }],
            minBufferPx: [{ type: core.Input }],
            maxBufferPx: [{ type: core.Input }],
            wheelMode: [{ type: core.Input }]
        };
        return PblCdkVirtualScrollDirective;
    }());
    if (false) {
        /** @type {?} */
        PblCdkVirtualScrollDirective.prototype._vScrollAuto;
        /** @type {?} */
        PblCdkVirtualScrollDirective.prototype._vScrollFixed;
        /** @type {?} */
        PblCdkVirtualScrollDirective.prototype._minBufferPx;
        /** @type {?} */
        PblCdkVirtualScrollDirective.prototype._maxBufferPx;
        /** @type {?} */
        PblCdkVirtualScrollDirective.prototype._wheelMode;
        /**
         * The scroll strategy used by this directive.
         * @type {?}
         */
        PblCdkVirtualScrollDirective.prototype._scrollStrategy;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollDirective.prototype._type;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollDirective.prototype.table;
        /* Skipping unhandled member: ;*/
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} config
     * @param {?=} scrollStrategy
     * @return {?}
     */
    function resolveScrollStrategy(config, scrollStrategy) {
        if (!scrollStrategy && config.has('virtualScroll')) {
            /** @type {?} */
            var virtualScrollConfig = config.get('virtualScroll');
            if (typeof virtualScrollConfig.defaultStrategy === 'function') {
                scrollStrategy = virtualScrollConfig.defaultStrategy();
            }
        }
        return scrollStrategy || new TableAutoSizeVirtualScrollStrategy(100, 200);
    }
    var PblCdkVirtualScrollViewportComponent = /** @class */ (function (_super) {
        __extends(PblCdkVirtualScrollViewportComponent, _super);
        function PblCdkVirtualScrollViewportComponent(elementRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, pluginCtrl, table) {
            var _this = _super.call(this, elementRef, cdr, ngZone, pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy), dir, scrollDispatcher) || this;
            _this.cdr = cdr;
            _this.pblScrollStrategy = pblScrollStrategy;
            _this.table = table;
            /**
             * Event emitted when the scrolling state of rows in the table changes.
             * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
             *
             * The table is in "scrolling" state from the first scroll event and until 2 animation frames
             * have passed without a scroll event.
             *
             * When scrolling, the emitted value is the direction: -1 or 1
             * When not scrolling, the emitted value is 0.
             *
             * NOTE: This event runs outside the angular zone.
             */
            _this.scrolling = new core.EventEmitter();
            /**
             * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
             *
             * The frame rate value is the average frame rate from all measurements since the scrolling began.
             * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
             * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
             *
             * Valid on when virtual scrolling is enabled.
             *
             * NOTE: This event runs outside the angular zone.
             *
             * In the future the measurement logic might be replaced with the Frame Timing API
             * See:
             * - https://developers.google.com/web/updates/2014/11/frame-timing-api
             * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
             * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
             */
            _this.scrollFrameRate = new core.EventEmitter();
            /**
             * The `scrollHeight` of the virtual scroll viewport.
             * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
             * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
             *
             * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
             * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
             * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
             *
             * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
             */
            _this.scrollHeight = 0;
            _this.ngeRenderedContentSize = 0;
            /// TODO(shlomiassaf): Remove when not supporting 8.1.2 and below
            /// COMPATIBILITY 8.1.2- <-> 8.1.3+
            /**
             * A string representing the `style.width` property value to be used for the spacer element.
             */
            _this._totalContentWidth = '';
            /**
             * A string representing the `style.height` property value to be used for the spacer element.
             */
            _this._totalContentHeight = '';
            /**
             * The transform used to scale the spacer to the same size as all content, including content that
             * is not currently rendered.
             * @deprecated
             */
            _this._totalContentSizeTransform = '';
            /// COMPATIBILITY 8.1.2- <-> 8.1.3+
            _this.offsetChange$ = new rxjs.Subject();
            _this._isScrolling = false;
            if (config.has('virtualScroll')) {
                _this.wheelModeDefault = config.get('virtualScroll').wheelMode;
            }
            config.onUpdate('virtualScroll').pipe(utils$1.UnRx(_this)).subscribe((/**
             * @param {?} change
             * @return {?}
             */
            function (change) { return _this.wheelModeDefault = change.curr.wheelMode; }));
            if (pblScrollStrategy instanceof PblCdkVirtualScrollDirective) {
                _this.enabled = pblScrollStrategy.type !== 'vScrollNone';
            }
            else {
                _this.enabled = !(pblScrollStrategy instanceof NoVirtualScrollStrategy);
            }
            pluginCtrl.extApi.setViewport(_this);
            _this.offsetChange = _this.offsetChange$.asObservable();
            return _this;
        }
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "isScrolling", {
            get: /**
             * @return {?}
             */
            function () { return this._isScrolling; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "wheelMode", {
            get: /**
             * @return {?}
             */
            function () {
                return ((/** @type {?} */ (this.pblScrollStrategy))).wheelMode || this.wheelModeDefault || 'passive';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "innerWidth", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
                return innerWidthHelper.getBoundingClientRect().width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "outerWidth", {
            get: /**
             * @return {?}
             */
            function () {
                return this.elementRef.nativeElement.getBoundingClientRect().width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "innerHeight", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
                return innerWidthHelper.getBoundingClientRect().height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "outerHeight", {
            get: /**
             * @return {?}
             */
            function () {
                return this.elementRef.nativeElement.getBoundingClientRect().height;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.enabled) {
                _super.prototype.ngOnInit.call(this);
            }
            else {
                scrolling.CdkScrollable.prototype.ngOnInit.call(this);
            }
            this.ngZone.runOutsideAngular((/**
             * @return {?}
             */
            function () { return _this.initScrollWatcher(); }));
        };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // If virtual scroll is disabled (`NoVirtualScrollStrategy`) we need to disable any effect applied
            // by the viewport, wrapping the content injected to it.
            // The main effect is the table having height 0 at all times, unless the height is explicitly set.
            // This happens because the content taking out of the layout, wrapped in absolute positioning.
            // Additionally, the host itself (viewport) is set to contain: strict.
            var table = this.table;
            if (this.enabled) {
                table._cdkTable.attachViewPort();
            }
            this.scrolling
                .pipe(utils$1.UnRx(this))
                .subscribe((/**
             * @param {?} isScrolling
             * @return {?}
             */
            function (isScrolling) {
                _this._isScrolling = !!isScrolling;
                if (isScrolling) {
                    table.addClass('pbl-ngrid-scrolling');
                }
                else {
                    table.removeClass('pbl-ngrid-scrolling');
                }
            }));
        };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this.offsetChange$.complete();
        };
        /**
         * @param {?} size
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.setTotalContentSize = /**
         * @param {?} size
         * @return {?}
         */
        function (size) {
            var _this = this;
            _super.prototype.setTotalContentSize.call(this, size);
            // TODO(shlomiassaf)[perf, 3]: run this once... (aggregate all calls within the same animation frame)
            requestAnimationFrame((/**
             * @return {?}
             */
            function () {
                _this.scrollHeight = _this.elementRef.nativeElement.scrollHeight; //size;
                _this.updateFiller();
                // We must trigger a change detection cycle because the filler div element is updated through bindings
                _this.cdr.detectChanges();
            }));
        };
        /**
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.checkViewportSize = /**
         * @return {?}
         */
        function () {
            // TODO: Check for changes in `CdkVirtualScrollViewport` source code, when resizing is handled!
            // see https://github.com/angular/material2/blob/28fb3abe77c5336e4739c820584ec99c23f1ae38/src/cdk/scrolling/virtual-scroll-viewport.ts#L341
            /** @type {?} */
            var prev = this.getViewportSize();
            _super.prototype.checkViewportSize.call(this);
            if (prev !== this.getViewportSize()) {
                this.updateFiller();
            }
        };
        /** Measure the combined size of all of the rendered items. */
        /**
         * Measure the combined size of all of the rendered items.
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.measureRenderedContentSize = /**
         * Measure the combined size of all of the rendered items.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var size = _super.prototype.measureRenderedContentSize.call(this);
            if (this.orientation === 'vertical') {
                size -= this.stickyRowHeaderContainer.offsetHeight + this.stickyRowFooterContainer.offsetHeight;
                // Compensate for hz scroll bar, if exists, only in non virtual scroll mode.
                if (!this.enabled) {
                    size += this.outerHeight - this.innerHeight;
                }
            }
            return this.ngeRenderedContentSize = size;
        };
        /**
         * @private
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.updateFiller = /**
         * @private
         * @return {?}
         */
        function () {
            this.measureRenderedContentSize();
            if (this.table.noFiller) {
                this.pblFillerHeight = undefined;
            }
            else {
                this.pblFillerHeight = this.getViewportSize() >= this.ngeRenderedContentSize ?
                    "calc(100% - " + this.ngeRenderedContentSize + "px)"
                    : undefined;
            }
        };
        /**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.onSourceLengthChange = /**
         * @param {?} prev
         * @param {?} curr
         * @return {?}
         */
        function (prev, curr) {
            this.checkViewportSize();
            this.updateFiller();
        };
        /**
         * @param {?} forOf
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.attach = /**
         * @param {?} forOf
         * @return {?}
         */
        function (forOf) {
            _super.prototype.attach.call(this, forOf);
            /** @type {?} */
            var scrollStrategy = this.pblScrollStrategy instanceof PblCdkVirtualScrollDirective
                ? this.pblScrollStrategy._scrollStrategy
                : this.pblScrollStrategy;
            if (scrollStrategy instanceof TableAutoSizeVirtualScrollStrategy) {
                scrollStrategy.averager.setRowInfo(forOf);
            }
        };
        /**
         * @param {?} offset
         * @param {?=} to
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.setRenderedContentOffset = /**
         * @param {?} offset
         * @param {?=} to
         * @return {?}
         */
        function (offset, to) {
            var _this = this;
            if (to === void 0) { to = 'to-start'; }
            _super.prototype.setRenderedContentOffset.call(this, offset, to);
            if (this.enabled) {
                if (this.offset !== offset) {
                    this.offset = offset;
                    if (!this.isCDPending) {
                        this.isCDPending = true;
                        /** @type {?} */
                        var syncTransform_1 = (/**
                         * @return {?}
                         */
                        function () { });
                        this.ngZone.runOutsideAngular((/**
                         * @return {?}
                         */
                        function () { return Promise.resolve()
                            .then((/**
                         * @return {?}
                         */
                        function () { return syncTransform_1(); }))
                            .then((/**
                         * @return {?}
                         */
                        function () {
                            _this.isCDPending = false;
                            _this.offsetChange$.next(_this.offset);
                        })); }));
                    }
                }
            }
        };
        /**
         * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
         */
        /**
         * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
         * @private
         * @return {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.initScrollWatcher = /**
         * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var scrolling = 0;
            /** @type {?} */
            var lastOffset = this.measureScrollOffset();
            this.elementScrolled()
                .subscribe((/**
             * @return {?}
             */
            function () {
                /*  `scrolling` is a boolean flag that turns on with the first `scroll` events and ends after 2 browser animation frames have passed without a `scroll` event.
                    This is an attempt to detect a scroll end event, which does not exist.
        
                    `scrollFrameRate` is a number that represent a rough estimation of the frame rate by measuring the time passed between each request animation frame
                    while the `scrolling` state is true. The frame rate value is the average frame rate from all measurements since the scrolling began.
                    To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
                    This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
        
                */
                if (scrolling === 0) {
                    /*  The measure array holds values required for frame rate measurements.
                                  [0] Storage for last timestamp taken
                                  [1] The sum of all measurements taken (a measurement is the time between 2 snapshots)
                                  [2] The count of all measurements
                                  [3] The sum of all measurements taken WITHIN the current buffer window. This buffer is flushed into [1] every X ms (see buggerWindow const).
                              */
                    /** @type {?} */
                    var bufferWindow_1 = 499;
                    /** @type {?} */
                    var measure_1 = [performance.now(), 0, 0, 0];
                    /** @type {?} */
                    var offset = _this.measureScrollOffset();
                    if (lastOffset === offset) {
                        return;
                    }
                    /** @type {?} */
                    var delta = lastOffset < offset ? 1 : -1;
                    _this.scrolling.next(delta);
                    /** @type {?} */
                    var raf_1 = (/**
                     * @return {?}
                     */
                    function () {
                        /** @type {?} */
                        var time = -measure_1[0] + (measure_1[0] = performance.now());
                        if (time > 5) {
                            measure_1[1] += time;
                            measure_1[2] += 1;
                        }
                        if (scrolling === -1) {
                            scrolling = 0;
                            lastOffset = _this.measureScrollOffset();
                            _this.scrolling.next(0);
                        }
                        else {
                            if (measure_1[1] > bufferWindow_1) {
                                measure_1[3] += measure_1[1];
                                measure_1[1] = 0;
                                _this.scrollFrameRate.emit(1000 / (measure_1[3] / measure_1[2]));
                            }
                            scrolling = scrolling === 1 ? -1 : 1;
                            requestAnimationFrame(raf_1);
                        }
                    });
                    requestAnimationFrame(raf_1);
                }
                scrolling++;
            }));
        };
        PblCdkVirtualScrollViewportComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: PblNgridConfigService },
            { type: undefined },
            { type: bidi.Directionality },
            { type: scrolling.ScrollDispatcher },
            { type: PblNgridPluginController },
            { type: PblNgridComponent }
        ]; };
        PblCdkVirtualScrollViewportComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-cdk-virtual-scroll-viewport',
                        template: "<p class=\"cdk-virtual-scroll-inner-width\"></p>\n<ng-content select=\".cdk-virtual-scroll-before-content-wrapper\"></ng-content>\n<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper [class.cdk-virtual-scroll-content-wrapper]=\"enabled\" style=\"width: 100%\" [style.minWidth.px]=\"minWidth\">\n  <ng-content></ng-content>\n</div>\n\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div *ngIf=\"enabled\" class=\"cdk-virtual-scroll-spacer\"\n     [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"\n     [style.transform]=\"_totalContentSizeTransform\"></div>\n<div *ngIf=\"pblFillerHeight && enabled\"\n    class=\"pbl-ngrid-space-fill\"\n    [style.minWidth.px]=\"minWidth\"\n    [style.top.px]=\"ngeRenderedContentSize\"\n    [style.height]=\"pblFillerHeight\"></div>\n",
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            class: 'cdk-virtual-scroll-viewport',
                            '[class.cdk-virtual-scroll-disabled]': '!enabled',
                            '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                            '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"'
                        },
                        encapsulation: core.ViewEncapsulation.None,
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        styles: ["pbl-cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;-webkit-transform:translateZ(0);transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-inner-width{width:100%;height:100%;position:absolute;margin:0!important;padding:0!important}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;-webkit-transform-origin:0 0;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;-webkit-transform-origin:100% 0;transform-origin:100% 0}.pbl-ngrid-space-fill{position:absolute;left:0;width:100%}"]
                    }] }
        ];
        /** @nocollapse */
        PblCdkVirtualScrollViewportComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.ChangeDetectorRef },
            { type: core.NgZone },
            { type: PblNgridConfigService },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [scrolling.VIRTUAL_SCROLL_STRATEGY,] }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: scrolling.ScrollDispatcher },
            { type: PblNgridPluginController },
            { type: PblNgridComponent }
        ]; };
        PblCdkVirtualScrollViewportComponent.propDecorators = {
            minWidth: [{ type: core.Input }],
            stickyRowHeaderContainer: [{ type: core.Input }],
            stickyRowFooterContainer: [{ type: core.Input }],
            scrolling: [{ type: core.Output }],
            scrollFrameRate: [{ type: core.Output }]
        };
        PblCdkVirtualScrollViewportComponent = __decorate([
            utils$1.UnRx(),
            __metadata("design:paramtypes", [core.ElementRef,
                core.ChangeDetectorRef,
                core.NgZone,
                PblNgridConfigService, Object, bidi.Directionality,
                scrolling.ScrollDispatcher,
                PblNgridPluginController,
                PblNgridComponent])
        ], PblCdkVirtualScrollViewportComponent);
        return PblCdkVirtualScrollViewportComponent;
    }(scrolling.CdkVirtualScrollViewport));
    if (false) {
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.enabled;
        /**
         * Emits the offset (in pixels) of the rendered content every time it changes.
         * The emission is done OUTSIDE of angular (i.e. no change detection cycle is triggered).
         *
         * Note that when not enabled (i.e `NoVirtualScrollStrategy` is used) there are no emissions.
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.offsetChange;
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.minWidth;
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.stickyRowHeaderContainer;
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.stickyRowFooterContainer;
        /**
         * Event emitted when the scrolling state of rows in the table changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The table is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.scrolling;
        /**
         * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
         *
         * The frame rate value is the average frame rate from all measurements since the scrolling began.
         * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
         * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
         *
         * Valid on when virtual scrolling is enabled.
         *
         * NOTE: This event runs outside the angular zone.
         *
         * In the future the measurement logic might be replaced with the Frame Timing API
         * See:
         * - https://developers.google.com/web/updates/2014/11/frame-timing-api
         * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
         * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.scrollFrameRate;
        /**
         * The `scrollHeight` of the virtual scroll viewport.
         * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
         * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
         *
         * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
         * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
         * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
         *
         * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype.scrollHeight;
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.ngeRenderedContentSize;
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.pblFillerHeight;
        /**
         * A string representing the `style.width` property value to be used for the spacer element.
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype._totalContentWidth;
        /**
         * A string representing the `style.height` property value to be used for the spacer element.
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype._totalContentHeight;
        /**
         * The transform used to scale the spacer to the same size as all content, including content that
         * is not currently rendered.
         * @deprecated
         * @type {?}
         */
        PblCdkVirtualScrollViewportComponent.prototype._totalContentSizeTransform;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype.offsetChange$;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype.offset;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype.isCDPending;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype._isScrolling;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype.wheelModeDefault;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype.cdr;
        /** @type {?} */
        PblCdkVirtualScrollViewportComponent.prototype.pblScrollStrategy;
        /**
         * @type {?}
         * @private
         */
        PblCdkVirtualScrollViewportComponent.prototype.table;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     */
    var PblNgridScrolling = /** @class */ (function () {
        function PblNgridScrolling(table, pluginCtrl, zone) {
            var _this = this;
            /**
             * Event emitted when the scrolling state of rows in the table changes.
             * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
             *
             * The table is in "scrolling" state from the first scroll event and until 2 animation frames
             * have passed without a scroll event.
             *
             * When scrolling, the emitted value is the direction: -1 or 1
             * When not scrolling, the emitted value is 0.
             *
             * NOTE: This event runs outside the angular zone.
             */
            this.scrolling = new core.EventEmitter();
            /** @type {?} */
            var subscription = pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    var viewport = table.viewport;
                    if (viewport) {
                        viewport.scrolling.subscribe((/**
                         * @param {?} isScrolling
                         * @return {?}
                         */
                        function (isScrolling) { return zone.run((/**
                         * @return {?}
                         */
                        function () { return _this.scrolling.next(isScrolling); })); }));
                    }
                    subscription.unsubscribe();
                    subscription = undefined;
                }
            }));
        }
        PblNgridScrolling.decorators = [
            { type: core.Directive, args: [{
                        selector: 'pbl-ngrid[scrolling]'
                    },] }
        ];
        /** @nocollapse */
        PblNgridScrolling.ctorParameters = function () { return [
            { type: PblNgridComponent },
            { type: PblNgridPluginController },
            { type: core.NgZone }
        ]; };
        PblNgridScrolling.propDecorators = {
            scrolling: [{ type: core.Output }]
        };
        return PblNgridScrolling;
    }());
    if (false) {
        /**
         * Event emitted when the scrolling state of rows in the table changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The table is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         * @type {?}
         */
        PblNgridScrolling.prototype.scrolling;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var COMMON_TABLE_TEMPLATE_INIT = new core.InjectionToken('COMMON TABLE TEMPLATE INIT');
    /**
     * @record
     */
    function CommonTemplateInit() { }
    if (false) {
        /** @type {?} */
        CommonTemplateInit.prototype.component;
        /**
         * When true will use the root registry service (for templates).
         * Otherwise, uses the provided registry from the dependency tree.
         * @type {?|undefined}
         */
        CommonTemplateInit.prototype.root;
    }
    /**
     * @param {?} components
     * @return {?}
     */
    function provideCommon(components) {
        return [
            { provide: core.ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: components },
            { provide: COMMON_TABLE_TEMPLATE_INIT, multi: true, useValue: components },
        ];
    }
    var PblNgridModule = /** @class */ (function () {
        function PblNgridModule(ngRef, registry, components) {
            var e_1, _a, e_2, _b;
            if (components) {
                try {
                    for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                        var multi = components_1_1.value;
                        try {
                            for (var multi_1 = __values(multi), multi_1_1 = multi_1.next(); !multi_1_1.done; multi_1_1 = multi_1.next()) {
                                var c = multi_1_1.value;
                                if (c.root) {
                                    registry = registry.getRoot();
                                }
                                PblNgridModule.loadCommonTemplates(ngRef, c.component, { registry: registry, destroy: true });
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (multi_1_1 && !multi_1_1.done && (_b = multi_1.return)) _b.call(multi_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        }
        /**
         * @param {?} config
         * @param {?} components
         * @return {?}
         */
        PblNgridModule.forRoot = /**
         * @param {?} config
         * @param {?} components
         * @return {?}
         */
        function (config, components) {
            return {
                ngModule: PblNgridModule,
                providers: [
                    { provide: PEB_NGRID_CONFIG, useValue: config },
                    PblNgridConfigService,
                    provideCommon(components),
                ]
            };
        };
        /**
         * @param {?} components
         * @return {?}
         */
        PblNgridModule.withCommon = /**
         * @param {?} components
         * @return {?}
         */
        function (components) {
            return {
                ngModule: PblNgridModule,
                providers: provideCommon(components),
            };
        };
        /**
         * @template T
         * @param {?} ngRef
         * @param {?} component
         * @param {?=} options
         * @return {?}
         */
        PblNgridModule.loadCommonTemplates = /**
         * @template T
         * @param {?} ngRef
         * @param {?} component
         * @param {?=} options
         * @return {?}
         */
        function (ngRef, component, options) {
            var injector = ngRef.injector;
            var _a = options || ((/** @type {?} */ ({}))), registry = _a.registry, destroy = _a.destroy;
            if (registry) {
                injector = core.Injector.create({
                    providers: [{ provide: PblNgridRegistryService, useValue: registry.getRoot() }],
                    parent: ngRef.injector
                });
            }
            /** @type {?} */
            var cmpRef = ngRef.componentFactoryResolver.resolveComponentFactory(component).create(injector);
            cmpRef.changeDetectorRef.detectChanges();
            if (destroy) {
                ngRef.onDestroy((/**
                 * @return {?}
                 */
                function () {
                    try {
                        cmpRef.destroy();
                    }
                    catch (err) { }
                }));
            }
            return cmpRef;
        };
        PblNgridModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            scrolling.ScrollingModule, scrolling$1.ScrollingModule,
                            table.CdkTableModule,
                        ],
                        declarations: [
                            PblNgridMetaRowContainerComponent, PblMetaRowDirective,
                            PblCdkTableComponent,
                            PblNgridColumnDef,
                            PblNgridRowComponent,
                            PblNgridCellStyling,
                            PblNgridOuterSectionDirective,
                            PblNgridHeaderExtensionRefDirective,
                            PblNgridNoDataRefDirective,
                            PblNgridPaginatorRefDirective,
                            PblNgridHeaderCellDefDirective,
                            PblNgridFooterCellDefDirective,
                            PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
                            PblNgridHeaderCellComponent,
                            PblNgridCellDirective,
                            PblNgridFooterCellDirective,
                            PblColumnSizeObserver,
                            PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling,
                            PblNgridCellEditAutoFocusDirective,
                            PblNgridComponent,
                        ],
                        exports: [
                            PblNgridRowComponent,
                            PblNgridCellStyling,
                            PblNgridOuterSectionDirective,
                            PblNgridHeaderExtensionRefDirective,
                            PblNgridNoDataRefDirective,
                            PblNgridPaginatorRefDirective,
                            PblNgridHeaderCellDefDirective,
                            PblNgridFooterCellDefDirective,
                            PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
                            PblNgridHeaderCellComponent,
                            PblNgridCellDirective,
                            PblNgridFooterCellDirective,
                            PblColumnSizeObserver,
                            PblCdkVirtualScrollDirective,
                            PblNgridCellEditAutoFocusDirective,
                            PblNgridComponent,
                        ],
                    },] }
        ];
        /** @nocollapse */
        PblNgridModule.ctorParameters = function () { return [
            { type: core.NgModuleRef },
            { type: PblNgridRegistryService },
            { type: Array, decorators: [{ type: core.Inject, args: [COMMON_TABLE_TEMPLATE_INIT,] }, { type: core.Optional }, { type: core.Self }] }
        ]; };
        return PblNgridModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var utils = {
        isPblColumn: isPblColumn,
        isPblMetaColumn: isPblMetaColumn,
        isPblColumnGroup: isPblColumnGroup,
    };

    exports.ColumnApi = ColumnApi;
    exports.EXT_API_TOKEN = EXT_API_TOKEN;
    exports.NoVirtualScrollStrategy = NoVirtualScrollStrategy;
    exports.PBL_NGRID_ROW_TEMPLATE = PBL_NGRID_ROW_TEMPLATE;
    exports.PEB_NGRID_CONFIG = PEB_NGRID_CONFIG;
    exports.PblColumn = PblColumn;
    exports.PblColumnFactory = PblColumnFactory;
    exports.PblColumnGroup = PblColumnGroup;
    exports.PblDataSource = PblDataSource;
    exports.PblDataSourceAdapter = PblDataSourceAdapter;
    exports.PblDataSourceFactory = PblDataSourceFactory;
    exports.PblMetaColumn = PblMetaColumn;
    exports.PblNgridCellDefDirective = PblNgridCellDefDirective;
    exports.PblNgridCellStyling = PblNgridCellStyling;
    exports.PblNgridComponent = PblNgridComponent;
    exports.PblNgridConfigService = PblNgridConfigService;
    exports.PblNgridDataHeaderExtensionContext = PblNgridDataHeaderExtensionContext;
    exports.PblNgridFooterCellDefDirective = PblNgridFooterCellDefDirective;
    exports.PblNgridHeaderCellDefDirective = PblNgridHeaderCellDefDirective;
    exports.PblNgridModule = PblNgridModule;
    exports.PblNgridMultiComponentRegistry = PblNgridMultiComponentRegistry;
    exports.PblNgridMultiTemplateRegistry = PblNgridMultiTemplateRegistry;
    exports.PblNgridNoDataRefDirective = PblNgridNoDataRefDirective;
    exports.PblNgridPluginController = PblNgridPluginController;
    exports.PblNgridRegistryService = PblNgridRegistryService;
    exports.PblNgridRowComponent = PblNgridRowComponent;
    exports.PblNgridSingleTemplateRegistry = PblNgridSingleTemplateRegistry;
    exports.PblPagingPaginator = PblPagingPaginator;
    exports.PblRowContext = PblRowContext;
    exports.PblTokenPaginator = PblTokenPaginator;
    exports.TableAutoSizeVirtualScrollStrategy = TableAutoSizeVirtualScrollStrategy;
    exports.TablePlugin = TablePlugin;
    exports.applySort = applySort;
    exports.columnFactory = columnFactory;
    exports.createDS = createDS;
    exports.provideCommon = provideCommon;
    exports.utils = utils;
    exports.ɵa = PblNgridHeaderExtensionRefDirective;
    exports.ɵb = PblNgridPaginatorRefDirective;
    exports.ɵba = PblNgridScrolling;
    exports.ɵbb = PblNgridPluginContext;
    exports.ɵbc = COMMON_TABLE_TEMPLATE_INIT;
    exports.ɵc = PblNgridOuterSectionDirective;
    exports.ɵd = PblNgridHeaderCellComponent;
    exports.ɵe = PblNgridCellDirective;
    exports.ɵf = PblNgridFooterCellDirective;
    exports.ɵg = PblNgridBaseCellDef;
    exports.ɵh = PblNgridEditorCellDefDirective;
    exports.ɵi = PblNgridColumnDef;
    exports.ɵj = PblNgridCellEditAutoFocusDirective;
    exports.ɵk = PblNgridMetaRowContainerComponent;
    exports.ɵl = PblMetaRowDirective;
    exports.ɵm = PblNgridMetaRowService;
    exports.ɵn = isPblMetaColumn;
    exports.ɵo = isPblColumn;
    exports.ɵp = isPblColumnGroup;
    exports.ɵq = PblColumnGroupStore;
    exports.ɵr = ColumnSizeInfo;
    exports.ɵs = MetaCellContext;
    exports.ɵt = PblCdkTableComponent;
    exports.ɵu = internalApiFactory;
    exports.ɵv = pluginControllerFactory;
    exports.ɵw = metaRowServiceFactory;
    exports.ɵx = PblColumnSizeObserver;
    exports.ɵy = PblCdkVirtualScrollViewportComponent;
    exports.ɵz = PblCdkVirtualScrollDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid.umd.js.map
