(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/cdk/overlay'), require('@angular/material/tooltip'), require('@pebula/ngrid'), require('@pebula/ngrid/target-events'), require('@angular/cdk/coercion'), require('@angular/cdk/a11y'), require('@angular/cdk/bidi'), require('@angular/cdk/scrolling'), require('@angular/cdk/platform')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/cell-tooltip', ['exports', '@angular/core', '@angular/common', '@angular/cdk/overlay', '@angular/material/tooltip', '@pebula/ngrid', '@pebula/ngrid/target-events', '@angular/cdk/coercion', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/cdk/scrolling', '@angular/cdk/platform'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material']['cell-tooltip'] = {}), global.ng.core, global.ng.common, global.ng.cdk.overlay, global.ng.material.tooltip, global.pebula.ngrid, global.pebula.ngrid['target-events'], global.ng.cdk.coercion, global.ng.cdk.a11y, global.ng.cdk.bidi, global.ng.cdk.scrolling, global.ng.cdk.platform));
}(this, (function (exports, core, common, overlay, tooltip, ngrid, targetEvents, coercion, a11y, bidi, scrolling, platform) { 'use strict';

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
     * Generated from: lib/cell-tooltip.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY = 'cellTooltip';
    var ɵ0 = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var element = (/** @type {?} */ ((event.cellTarget.firstElementChild || event.cellTarget)));
        return element.scrollWidth > element.offsetWidth;
    }, ɵ1 = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.cellTarget.innerText;
    };
    /** @type {?} */
    var DEFAULT_OPTIONS = {
        canShow: (ɵ0),
        message: (ɵ1)
    };
    /**
     * @record
     */
    function CellTooltipOptions() { }
    if (false) {
        /** @type {?|undefined} */
        CellTooltipOptions.prototype.canShow;
        /** @type {?|undefined} */
        CellTooltipOptions.prototype.message;
    }
    /**
     * @template T
     */
    var PblNgridCellTooltipDirective = /** @class */ (function () {
        function PblNgridCellTooltipDirective(table, injector, pluginCtrl) {
            var _this = this;
            this.table = table;
            this.injector = injector;
            this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
            /** @type {?} */
            var configService = injector.get(ngrid.PblNgridConfigService);
            this.initArgs = [
                injector.get(overlay.Overlay),
                null,
                injector.get(scrolling.ScrollDispatcher),
                injector.get(core.ViewContainerRef),
                injector.get(core.NgZone),
                injector.get(platform.Platform),
                injector.get(a11y.AriaDescriber),
                injector.get(a11y.FocusMonitor),
                injector.get(tooltip.MAT_TOOLTIP_SCROLL_STRATEGY),
                injector.get(bidi.Directionality),
                injector.get(tooltip.MAT_TOOLTIP_DEFAULT_OPTIONS),
            ];
            configService.onUpdate('cellTooltip')
                .pipe(ngrid.utils.unrx(this))
                .subscribe((/**
             * @param {?} cfg
             * @return {?}
             */
            function (cfg) { return _this.lastConfig = cfg.curr; }));
            if (table.isInit) {
                this.init(pluginCtrl);
            }
            else {
                /** @type {?} */
                var subscription_1 = pluginCtrl.events
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.kind === 'onInit') {
                        _this.init(pluginCtrl);
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }
        Object.defineProperty(PblNgridCellTooltipDirective.prototype, "canShow", {
            // tslint:disable-next-line:no-input-rename
            set: 
            // tslint:disable-next-line:no-input-rename
            /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (typeof value === 'function') {
                    this._canShow = value;
                }
                else if (((/** @type {?} */ (value))) === '') {
                    this._canShow = undefined;
                }
                else {
                    this._canShow = coercion.coerceBooleanProperty(value) ? (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return true; }) : (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return false; });
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @template T
         * @param {?} table
         * @param {?} injector
         * @return {?}
         */
        PblNgridCellTooltipDirective.create = /**
         * @template T
         * @param {?} table
         * @param {?} injector
         * @return {?}
         */
        function (table, injector) {
            return new PblNgridCellTooltipDirective(table, injector, ngrid.PblNgridPluginController.find(table));
        };
        /**
         * @return {?}
         */
        PblNgridCellTooltipDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._removePlugin(this.table);
            this.killTooltip();
            ngrid.utils.unrx.kill(this);
        };
        /**
         * @private
         * @param {?} pluginCtrl
         * @return {?}
         */
        PblNgridCellTooltipDirective.prototype.init = /**
         * @private
         * @param {?} pluginCtrl
         * @return {?}
         */
        function (pluginCtrl) {
            var _this = this;
            // Depends on target-events plugin
            // if it's not set, create it.
            /** @type {?} */
            var targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
            targetEventsPlugin.cellEnter
                .pipe(ngrid.utils.unrx(this))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.cellEnter(event); }));
            targetEventsPlugin.cellLeave
                .pipe(ngrid.utils.unrx(this))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.cellLeave(event); }));
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        PblNgridCellTooltipDirective.prototype.cellEnter = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.killTooltip();
            if (!this._canShow) {
                // TODO: this will set lastConfig / default option once
                // but if user changes lastConfig it will never update again...
                this.canShow = (this.lastConfig && this.lastConfig.canShow) || DEFAULT_OPTIONS.canShow;
            }
            if (this._canShow(event)) {
                /** @type {?} */
                var params = (/** @type {?} */ (this.initArgs.slice()));
                params[1] = new core.ElementRef(event.cellTarget);
                this.toolTip = new (tooltip.MatTooltip.bind.apply(tooltip.MatTooltip, __spread([void 0], params)))();
                /** @type {?} */
                var message = this.message || (this.lastConfig && this.lastConfig.message) || DEFAULT_OPTIONS.message;
                this.toolTip.message = message(event);
                if (this.position) {
                    this.toolTip.position = this.position;
                }
                if (this.tooltipClass) {
                    this.toolTip.tooltipClass = this.tooltipClass;
                }
                if (this.showDelay >= 0) {
                    this.toolTip.showDelay = this.showDelay;
                }
                if (this.hideDelay >= 0) {
                    this.toolTip.hideDelay = this.hideDelay;
                }
                this.toolTip.show();
            }
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        PblNgridCellTooltipDirective.prototype.cellLeave = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.killTooltip();
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridCellTooltipDirective.prototype.killTooltip = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.toolTip) {
                this.toolTip.hide();
                this.toolTip.ngOnDestroy();
                this.toolTip = undefined;
            }
        };
        PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
        PblNgridCellTooltipDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[cellTooltip]', exportAs: 'pblOverflowTooltip' },] }
        ];
        /** @nocollapse */
        PblNgridCellTooltipDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: core.Injector },
            { type: ngrid.PblNgridPluginController }
        ]; };
        PblNgridCellTooltipDirective.propDecorators = {
            canShow: [{ type: core.Input, args: ['cellTooltip',] }],
            message: [{ type: core.Input }],
            position: [{ type: core.Input }],
            tooltipClass: [{ type: core.Input }],
            showDelay: [{ type: core.Input }],
            hideDelay: [{ type: core.Input }]
        };
        return PblNgridCellTooltipDirective;
    }());
    if (false) {
        /** @type {?} */
        PblNgridCellTooltipDirective.PLUGIN_KEY;
        /** @type {?} */
        PblNgridCellTooltipDirective.prototype.message;
        /**
         * See Material docs for MatTooltip
         * @type {?}
         */
        PblNgridCellTooltipDirective.prototype.position;
        /**
         * See Material docs for MatTooltip
         * @type {?}
         */
        PblNgridCellTooltipDirective.prototype.tooltipClass;
        /**
         * See Material docs for MatTooltip
         * @type {?}
         */
        PblNgridCellTooltipDirective.prototype.showDelay;
        /**
         * See Material docs for MatTooltip
         * @type {?}
         */
        PblNgridCellTooltipDirective.prototype.hideDelay;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype.initArgs;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype.toolTip;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype.lastConfig;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype._removePlugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype._canShow;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblNgridCellTooltipDirective.prototype.injector;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/cell-tooltip.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridCellTooltipModule = /** @class */ (function () {
        function PblNgridCellTooltipModule(parentModule, configService) {
            if (parentModule) {
                return;
            }
            ngrid.PblNgridPluginController.created
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
                // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
                // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
                // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
                // CLI prod builds will remove the plugin's code.
                /** @type {?} */
                var cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
                if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
                    /** @type {?} */
                    var pluginCtrl_1 = event.controller;
                    /** @type {?} */
                    var subscription_1 = pluginCtrl_1.events
                        .subscribe((/**
                     * @param {?} evt
                     * @return {?}
                     */
                    function (evt) {
                        if (evt.kind === 'onInit') {
                            if (!pluginCtrl_1.hasPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY)) {
                                pluginCtrl_1.createPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY);
                            }
                            subscription_1.unsubscribe();
                            subscription_1 = undefined;
                        }
                    }));
                }
            }));
        }
        PblNgridCellTooltipModule.NGRID_PLUGIN = ngrid.ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
        PblNgridCellTooltipModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, tooltip.MatTooltipModule, overlay.OverlayModule, ngrid.PblNgridModule, targetEvents.PblNgridTargetEventsModule],
                        declarations: [PblNgridCellTooltipDirective],
                        exports: [PblNgridCellTooltipDirective, tooltip.MatTooltipModule],
                    },] }
        ];
        /** @nocollapse */
        PblNgridCellTooltipModule.ctorParameters = function () { return [
            { type: PblNgridCellTooltipModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: ngrid.PblNgridConfigService }
        ]; };
        return PblNgridCellTooltipModule;
    }());
    if (false) {
        /** @type {?} */
        PblNgridCellTooltipModule.NGRID_PLUGIN;
    }

    exports.PblNgridCellTooltipDirective = PblNgridCellTooltipDirective;
    exports.PblNgridCellTooltipModule = PblNgridCellTooltipModule;
    exports.ɵa = PLUGIN_KEY;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-cell-tooltip.umd.js.map
