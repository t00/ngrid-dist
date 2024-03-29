(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@pebula/ngrid'), require('rxjs'), require('@angular/cdk/coercion'), require('@pebula/ngrid/core'), require('@angular/common'), require('@angular/cdk/table')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/block-ui', ['exports', '@angular/core', '@pebula/ngrid', 'rxjs', '@angular/cdk/coercion', '@pebula/ngrid/core', '@angular/common', '@angular/cdk/table'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['block-ui'] = {}), global.ng.core, global.pebula.ngrid, global.rxjs, global.ng.cdk.coercion, global.pebula.ngrid.core, global.ng.common, global.ng.cdk.table));
}(this, (function (exports, i0, i1, rxjs, coercion, core, common, table) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

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
        return PblNgridBlockUiDefDirective;
    }(i1.PblNgridSingleTemplateRegistry));
    /** @nocollapse */ PblNgridBlockUiDefDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiDefDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: i1__namespace.PblNgridRegistryService }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridBlockUiDefDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBlockUiDefDirective, selector: "[pblNgridBlockUiDef]", usesInheritance: true, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiDefDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: '[pblNgridBlockUiDef]' }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: i1__namespace.PblNgridRegistryService }]; } });

    var PLUGIN_KEY = 'blockUi';
    var PblNgridBlockUiPluginDirective = /** @class */ (function () {
        function PblNgridBlockUiPluginDirective(grid, pluginCtrl) {
            var _this = this;
            this.grid = grid;
            this._blockInProgress = false;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            grid.registry.changes.subscribe(function (changes) {
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
            });
            pluginCtrl.onInit()
                .subscribe(function (isInitNow) {
                if (isInitNow && _this._blockUi && typeof _this._blockUi === 'boolean') {
                    _this.setupBlocker();
                }
            });
            pluginCtrl.events
                .subscribe(function (event) {
                if (event.kind === 'onDataSource') {
                    var prev = event.prev, curr = event.curr;
                    if (prev) {
                        core.unrx.kill(_this, prev);
                    }
                    curr.onSourceChanging
                        .pipe(core.unrx(_this, curr))
                        .subscribe(function () {
                        if (_this._blockUi === 'auto') {
                            _this._blockInProgress = true;
                            _this.setupBlocker();
                        }
                    });
                    curr.onSourceChanged
                        .pipe(core.unrx(_this, curr))
                        .subscribe(function () {
                        if (_this._blockUi === 'auto') {
                            _this._blockInProgress = false;
                            _this.setupBlocker();
                        }
                    });
                }
            });
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
            get: function () { return this._blockUi; },
            set: function (value) {
                var _this = this;
                var coerced = coercion.coerceBooleanProperty(value);
                if (coerced && (value === 'auto' || value === '')) {
                    coerced = 'auto';
                }
                if (rxjs.isObservable(value) && this._blockUi !== value) {
                    if (rxjs.isObservable(this._blockUi)) {
                        core.unrx.kill(this, this._blockUi);
                    }
                    this._blockUi = value;
                    value
                        .pipe(core.unrx(this, this._blockUi))
                        .subscribe(function (state) {
                        _this._blockInProgress = state;
                        _this.setupBlocker();
                    });
                }
                else if (this._blockUi !== coerced) {
                    this._blockUi = coerced;
                    if (coerced !== 'auto') {
                        this._blockInProgress = coerced;
                        this.setupBlocker();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        PblNgridBlockUiPluginDirective.prototype.ngOnDestroy = function () {
            core.unrx.kill(this);
            this._removePlugin(this.grid);
        };
        PblNgridBlockUiPluginDirective.prototype.setupBlocker = function () {
            if (this.grid.isInit) {
                var state = this._blockInProgress;
                if (state) {
                    if (!this._blockerEmbeddedVRef) {
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
            }
        };
        return PblNgridBlockUiPluginDirective;
    }());
    /** @nocollapse */ PblNgridBlockUiPluginDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiPluginDirective, deps: [{ token: i1__namespace.PblNgridComponent }, { token: i1__namespace.PblNgridPluginController }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    /** @nocollapse */ PblNgridBlockUiPluginDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.0.0", type: PblNgridBlockUiPluginDirective, selector: "pbl-ngrid[blockUi]", inputs: { blockUi: "blockUi" }, exportAs: ["blockUi"], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiPluginDirective, decorators: [{
                type: i0.Directive,
                args: [{ selector: 'pbl-ngrid[blockUi]', exportAs: 'blockUi' }]
            }], ctorParameters: function () { return [{ type: i1__namespace.PblNgridComponent }, { type: i1__namespace.PblNgridPluginController }]; }, propDecorators: { blockUi: [{
                    type: i0.Input
                }] } });

    var PblNgridBlockUiModule = /** @class */ (function () {
        function PblNgridBlockUiModule() {
        }
        return PblNgridBlockUiModule;
    }());
    PblNgridBlockUiModule.NGRID_PLUGIN = i1.ngridPlugin({ id: PLUGIN_KEY }, PblNgridBlockUiPluginDirective);
    /** @nocollapse */ PblNgridBlockUiModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    /** @nocollapse */ PblNgridBlockUiModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiModule, declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective], imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule], exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective] });
    /** @nocollapse */ PblNgridBlockUiModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiModule, imports: [[common.CommonModule, table.CdkTableModule, i1.PblNgridModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0__namespace, type: PblNgridBlockUiModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule, table.CdkTableModule, i1.PblNgridModule],
                        declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                        exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
                    }]
            }] });

    /**
     * Generated bundle index. Do not edit.
     */

    exports.PblNgridBlockUiDefDirective = PblNgridBlockUiDefDirective;
    exports.PblNgridBlockUiModule = PblNgridBlockUiModule;
    exports.PblNgridBlockUiPluginDirective = PblNgridBlockUiPluginDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-block-ui.umd.js.map
