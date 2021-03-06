(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/table'), require('@pebula/ngrid'), require('rxjs'), require('@angular/cdk/coercion')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/block-ui', ['exports', '@angular/core', '@angular/common', '@angular/cdk/table', '@pebula/ngrid', 'rxjs', '@angular/cdk/coercion'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['block-ui'] = {}), global.ng.core, global.ng.common, global.ng.cdk.table, global.pebula.ngrid, global.rxjs, global.ng.cdk.coercion));
}(this, (function (exports, core, common, table, ngrid, rxjs, coercion) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
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
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/block-ui/directives.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Marks the element as the display element when the form is busy.
     */
    var PblNgridBlockUiDefDirective = /** @class */ (function (_super) {
        __extends(PblNgridBlockUiDefDirective, _super);
        function PblNgridBlockUiDefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'blocker';
            return _this;
        }
        PblNgridBlockUiDefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridBlockUiDef]' },] }
        ];
        /** @nocollapse */
        PblNgridBlockUiDefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: ngrid.PblNgridRegistryService }
        ]; };
        return PblNgridBlockUiDefDirective;
    }(ngrid.PblNgridSingleTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridBlockUiDefDirective.prototype.kind;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/block-ui/block-ui-plugin.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY = 'blockUi';
    /**
     * @template T
     */
    var PblNgridBlockUiPluginDirective = /** @class */ (function () {
        function PblNgridBlockUiPluginDirective(grid, pluginCtrl) {
            var _this = this;
            this.grid = grid;
            this._blockInProgress = false;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            grid.registry.changes.subscribe((/**
             * @param {?} changes
             * @return {?}
             */
            function (changes) {
                var e_1, _a;
                try {
                    for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                        var c = changes_1_1.value;
                        switch (c.type) {
                            case 'blocker':
                                _this.setupBlocker();
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
            pluginCtrl.events
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onDataSource') {
                    var prev = event.prev, curr = event.curr;
                    if (prev) {
                        ngrid.utils.unrx.kill(_this, prev);
                    }
                    curr.onSourceChanging
                        .pipe(ngrid.utils.unrx(_this, curr))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        if (_this._blockUi === 'auto') {
                            _this._blockInProgress = true;
                            _this.setupBlocker();
                        }
                    }));
                    curr.onSourceChanged
                        .pipe(ngrid.utils.unrx(_this, curr))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () {
                        if (_this._blockUi === 'auto') {
                            _this._blockInProgress = false;
                            _this.setupBlocker();
                        }
                    }));
                }
            }));
        }
        Object.defineProperty(PblNgridBlockUiPluginDirective.prototype, "blockUi", {
            /**
             * Blocks the UI with the template defined via `PblNgridBlockUiDefDirective`.
             * If a template does not exist blocking is ignored.
             *
             * There are 3 operation modes, the modes are set based on the input value:
             *   - Auto mode (INPUT: 'auto')
             *     The UI will be blocked automatically based on datasource changes.
             *
             *    - Manual mode (INPUT: boolean)
             *     The UI will be block is toggled based on the value, i.e. `true` will block and false will unblock.
             *
             *   - Notification mode (INPUT: Observable<boolean>)
             *     Similar to Manual mode but controlled by a stream boolean value.
             *
             * **Note about Notification mode**
             * Notification mode accepts an observable, at the point where the value is set the block state does not change (if it was "on" it will stay "on" and vice versa)
             * It will only change on the first emission, this is important to understand.
             *
             * For example, if the current block state is off and we pass a `Subject`, the state remains off until the next emission
             * of the `Subject` is `true`. If it already emitted `true` before the assignment it will not be taken into account. This is why
             * using `BehaviouralSubject` is preferred.
             *
             * Also note that when sending an observable it is treated as "notifier", do not send cold observable as they get subscribed to.
             * For example, sending the returned value from `HttpClient` will probably result in 2 HTTP calls, if you already subscribed to it
             * > The default value is `auto` which means that `<pbl-ngrid blockUi>` is similar to `<pbl-ngrid blockUi="auto">`
             */
            get: /**
             * Blocks the UI with the template defined via `PblNgridBlockUiDefDirective`.
             * If a template does not exist blocking is ignored.
             *
             * There are 3 operation modes, the modes are set based on the input value:
             *   - Auto mode (INPUT: 'auto')
             *     The UI will be blocked automatically based on datasource changes.
             *
             *    - Manual mode (INPUT: boolean)
             *     The UI will be block is toggled based on the value, i.e. `true` will block and false will unblock.
             *
             *   - Notification mode (INPUT: Observable<boolean>)
             *     Similar to Manual mode but controlled by a stream boolean value.
             *
             * **Note about Notification mode**
             * Notification mode accepts an observable, at the point where the value is set the block state does not change (if it was "on" it will stay "on" and vice versa)
             * It will only change on the first emission, this is important to understand.
             *
             * For example, if the current block state is off and we pass a `Subject`, the state remains off until the next emission
             * of the `Subject` is `true`. If it already emitted `true` before the assignment it will not be taken into account. This is why
             * using `BehaviouralSubject` is preferred.
             *
             * Also note that when sending an observable it is treated as "notifier", do not send cold observable as they get subscribed to.
             * For example, sending the returned value from `HttpClient` will probably result in 2 HTTP calls, if you already subscribed to it
             * > The default value is `auto` which means that `<pbl-ngrid blockUi>` is similar to `<pbl-ngrid blockUi="auto">`
             * @return {?}
             */
            function () { return this._blockUi; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                /** @type {?} */
                var coerced = coercion.coerceBooleanProperty(value);
                if (coerced && (value === 'auto' || ((/** @type {?} */ (value))) === '')) {
                    coerced = 'auto';
                }
                if (rxjs.isObservable(value) && this._blockUi !== value) {
                    if (rxjs.isObservable(this._blockUi)) {
                        ngrid.utils.unrx.kill(this, this._blockUi);
                    }
                    this._blockUi = value;
                    value.pipe(ngrid.utils.unrx(this, this._blockUi)).subscribe((/**
                     * @param {?} state
                     * @return {?}
                     */
                    function (state) {
                        _this._blockInProgress = state;
                        _this.setupBlocker();
                    }));
                }
                else if (this._blockUi !== coerced) {
                    this._blockUi = coerced;
                    if (coerced !== 'auto') {
                        this._blockInProgress = coerced;
                        this.setupBlocker();
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridBlockUiPluginDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            ngrid.utils.unrx.kill(this);
            this._removePlugin(this.grid);
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridBlockUiPluginDirective.prototype.setupBlocker = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var state = this._blockInProgress;
            if (state) {
                if (!this._blockerEmbeddedVRef) {
                    /** @type {?} */
                    var blockerTemplate = this.grid.registry.getSingle('blocker');
                    if (blockerTemplate) {
                        this._blockerEmbeddedVRef = this.grid.createView('afterContent', blockerTemplate.tRef, { $implicit: this.grid });
                        this._blockerEmbeddedVRef.detectChanges();
                    }
                }
            }
            else if (this._blockerEmbeddedVRef) {
                this.grid.removeView(this._blockerEmbeddedVRef, 'afterContent');
                this._blockerEmbeddedVRef = undefined;
            }
        };
        PblNgridBlockUiPluginDirective.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid[blockUi]', exportAs: 'blockUi' },] }
        ];
        /** @nocollapse */
        PblNgridBlockUiPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController }
        ]; };
        PblNgridBlockUiPluginDirective.propDecorators = {
            blockUi: [{ type: core.Input }]
        };
        return PblNgridBlockUiPluginDirective;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridBlockUiPluginDirective.prototype._blockInProgress;
        /**
         * @type {?}
         * @private
         */
        PblNgridBlockUiPluginDirective.prototype._blockUi;
        /**
         * @type {?}
         * @private
         */
        PblNgridBlockUiPluginDirective.prototype._blockerEmbeddedVRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridBlockUiPluginDirective.prototype._removePlugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridBlockUiPluginDirective.prototype.grid;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/table-block-ui.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridBlockUiModule = /** @class */ (function () {
        function PblNgridBlockUiModule() {
        }
        PblNgridBlockUiModule.NGRID_PLUGIN = ngrid.ngridPlugin({ id: PLUGIN_KEY }, PblNgridBlockUiPluginDirective);
        PblNgridBlockUiModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, table.CdkTableModule, ngrid.PblNgridModule],
                        declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                        exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
                    },] }
        ];
        return PblNgridBlockUiModule;
    }());
    if (false) {
        /** @type {?} */
        PblNgridBlockUiModule.NGRID_PLUGIN;
    }

    exports.PblNgridBlockUiModule = PblNgridBlockUiModule;
    exports.ɵa = PblNgridBlockUiDefDirective;
    exports.ɵb = PLUGIN_KEY;
    exports.ɵc = PblNgridBlockUiPluginDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-block-ui.umd.js.map
