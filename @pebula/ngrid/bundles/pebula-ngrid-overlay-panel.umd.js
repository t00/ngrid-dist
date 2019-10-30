(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@pebula/ngrid'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('@angular/cdk/bidi'), require('@angular/cdk/overlay'), require('@angular/cdk/portal'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/overlay-panel', ['exports', '@pebula/ngrid', 'rxjs', 'rxjs/operators', '@angular/core', '@angular/cdk/bidi', '@angular/cdk/overlay', '@angular/cdk/portal', '@angular/common'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid['overlay-panel'] = {}), global.pebula.ngrid, global.rxjs, global.rxjs.operators, global.ng.core, global.ng.cdk.bidi, global.ng.cdk.overlay, global.ng.cdk.portal, global.ng.common));
}(this, (function (exports, ngrid, rxjs, operators, core, bidi, overlay, portal, common) { 'use strict';

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
     * @template T
     */
    var   /**
     * @template T
     */
    PblNgridOverlayPanelComponentExtension = /** @class */ (function (_super) {
        __extends(PblNgridOverlayPanelComponentExtension, _super);
        function PblNgridOverlayPanelComponentExtension(name, component, cfr, injector) {
            var _this = _super.call(this) || this;
            _this.component = component;
            _this.cfr = cfr;
            _this.injector = injector;
            _this.kind = 'overlayPanels';
            _this.projectContent = false;
            _this.name = name;
            return _this;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        PblNgridOverlayPanelComponentExtension.prototype.getFactory = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            return this.cfr.resolveComponentFactory(this.component);
        };
        /**
         * @param {?} context
         * @param {?} cmpRef
         * @return {?}
         */
        PblNgridOverlayPanelComponentExtension.prototype.onCreated = /**
         * @param {?} context
         * @param {?} cmpRef
         * @return {?}
         */
        function (context, cmpRef) {
            cmpRef.changeDetectorRef.markForCheck();
            cmpRef.changeDetectorRef.detectChanges();
        };
        return PblNgridOverlayPanelComponentExtension;
    }(ngrid.PblNgridMultiComponentRegistry));
    if (false) {
        /** @type {?} */
        PblNgridOverlayPanelComponentExtension.prototype.name;
        /** @type {?} */
        PblNgridOverlayPanelComponentExtension.prototype.kind;
        /** @type {?} */
        PblNgridOverlayPanelComponentExtension.prototype.projectContent;
        /** @type {?} */
        PblNgridOverlayPanelComponentExtension.prototype.component;
        /** @type {?} */
        PblNgridOverlayPanelComponentExtension.prototype.cfr;
        /** @type {?} */
        PblNgridOverlayPanelComponentExtension.prototype.injector;
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
    PblNgridOverlayPanelRef = /** @class */ (function () {
        function PblNgridOverlayPanelRef(overlayRef, data) {
            var _this = this;
            this.overlayRef = overlayRef;
            this.data = data;
            this._closed$ = new rxjs.Subject();
            this.closed = this._closed$.asObservable();
            this._closingActions(this, overlayRef)
                .pipe(operators.takeUntil(this.closed))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.close(); }));
        }
        /**
         * @return {?}
         */
        PblNgridOverlayPanelRef.prototype.close = /**
         * @return {?}
         */
        function () {
            if (this._closed$) {
                /** @type {?} */
                var closed$ = this._closed$;
                this._closed$ = undefined;
                closed$.next();
                closed$.complete();
                this.overlayRef.detach();
                this.overlayRef.dispose();
            }
        };
        /**
         * @private
         * @param {?} overlayPanelRef
         * @param {?} overlayRef
         * @return {?}
         */
        PblNgridOverlayPanelRef.prototype._closingActions = /**
         * @private
         * @param {?} overlayPanelRef
         * @param {?} overlayRef
         * @return {?}
         */
        function (overlayPanelRef, overlayRef) {
            /** @type {?} */
            var backdrop = (/** @type {?} */ (overlayRef)).backdropClick();
            /** @type {?} */
            var detachments = (/** @type {?} */ (overlayRef)).detachments();
            return rxjs.merge(backdrop, detachments, overlayPanelRef.closed);
        };
        return PblNgridOverlayPanelRef;
    }());
    if (false) {
        /** @type {?} */
        PblNgridOverlayPanelRef.prototype.closed;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanelRef.prototype._closed$;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanelRef.prototype.overlayRef;
        /** @type {?} */
        PblNgridOverlayPanelRef.prototype.data;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function PblNgridOverlayPanelConfig() { }
    if (false) {
        /** @type {?|undefined} */
        PblNgridOverlayPanelConfig.prototype.hasBackdrop;
        /** @type {?|undefined} */
        PblNgridOverlayPanelConfig.prototype.backdropClass;
        /** @type {?|undefined} */
        PblNgridOverlayPanelConfig.prototype.xPos;
        /** @type {?|undefined} */
        PblNgridOverlayPanelConfig.prototype.yPos;
        /** @type {?|undefined} */
        PblNgridOverlayPanelConfig.prototype.insetPos;
    }
    /** @type {?} */
    var DEFAULT_OVERLAY_PANEL_CONFIG = {
        hasBackdrop: false,
        xPos: 'center',
        yPos: 'center',
        insetPos: false,
    };
    var PblNgridOverlayPanelFactory = /** @class */ (function () {
        function PblNgridOverlayPanelFactory(_overlay, _dir) {
            this._overlay = _overlay;
            this._dir = _dir;
        }
        /**
         * @template T
         * @param {?} grid
         * @return {?}
         */
        PblNgridOverlayPanelFactory.prototype.create = /**
         * @template T
         * @param {?} grid
         * @return {?}
         */
        function (grid) {
            return new PblNgridOverlayPanel(this._overlay, this._dir, grid);
        };
        PblNgridOverlayPanelFactory.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        PblNgridOverlayPanelFactory.ctorParameters = function () { return [
            { type: overlay.Overlay },
            { type: bidi.Directionality }
        ]; };
        return PblNgridOverlayPanelFactory;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanelFactory.prototype._overlay;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanelFactory.prototype._dir;
    }
    /**
     * @template T
     */
    var   /**
     * @template T
     */
    PblNgridOverlayPanel = /** @class */ (function () {
        function PblNgridOverlayPanel(_overlay, _dir, grid) {
            this._overlay = _overlay;
            this._dir = _dir;
            this.grid = grid;
            /** @type {?} */
            var controller = ngrid.PblNgridPluginController.find(grid);
            this.injector = controller.injector;
            this.vcRef = controller.injector.get(core.ViewContainerRef);
            this._scrollStrategy = (/**
             * @return {?}
             */
            function () { return _overlay.scrollStrategies.reposition(); });
        }
        /**
         * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
         * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
         *
         * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
         * the rendered row index to use to get the cell from.
         *
         * > Note that this helper method does not allow targeting meta cells.
         */
        /**
         * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
         * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
         *
         * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
         * the rendered row index to use to get the cell from.
         *
         * > Note that this helper method does not allow targeting meta cells.
         * @template T
         * @param {?} extName
         * @param {?} columnId
         * @param {?} rowRenderPosition
         * @param {?=} config
         * @param {?=} data
         * @return {?}
         */
        PblNgridOverlayPanel.prototype.openGridCell = /**
         * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
         * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
         *
         * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
         * the rendered row index to use to get the cell from.
         *
         * > Note that this helper method does not allow targeting meta cells.
         * @template T
         * @param {?} extName
         * @param {?} columnId
         * @param {?} rowRenderPosition
         * @param {?=} config
         * @param {?=} data
         * @return {?}
         */
        function (extName, columnId, rowRenderPosition, config, data) {
            /** @type {?} */
            var column = this.grid.columnApi.findColumn(columnId);
            if (!column) {
                throw new Error('Could not find the column ' + columnId);
            }
            /** @type {?} */
            var section;
            /** @type {?} */
            var rowRenderIndex = 0;
            switch (rowRenderPosition) {
                case 'header':
                case 'footer':
                    section = rowRenderPosition;
                    break;
                default:
                    if (typeof rowRenderPosition === 'number') {
                        section = 'table';
                        rowRenderIndex = rowRenderPosition;
                    }
                    break;
            }
            if (!section) {
                throw new Error('Invalid "rowRenderPosition" provided, use "header", "footer" or any number >= 0.');
            }
            /** @type {?} */
            var el = column && column.columnDef.queryCellElements(section)[rowRenderIndex];
            if (!el) {
                throw new Error("Could not find a cell for the column " + columnId + " at render index " + rowRenderIndex);
            }
            return this.open(extName, new core.ElementRef(el), config, data);
        };
        /**
         * @template T
         * @param {?} extName
         * @param {?} source
         * @param {?=} config
         * @param {?=} data
         * @return {?}
         */
        PblNgridOverlayPanel.prototype.open = /**
         * @template T
         * @param {?} extName
         * @param {?} source
         * @param {?=} config
         * @param {?=} data
         * @return {?}
         */
        function (extName, source, config, data) {
            config = Object.assign(__assign({}, DEFAULT_OVERLAY_PANEL_CONFIG), config || {});
            /** @type {?} */
            var match = this.findNamesExtension(extName);
            if (!match) {
                throw new Error('Could not find the overlay panel with the name ' + extName);
            }
            /** @type {?} */
            var overlayRef = this._createOverlay(source, config);
            /** @type {?} */
            var overlayPanelRef = new PblNgridOverlayPanelRef(overlayRef, data);
            this._setPosition((/** @type {?} */ (overlayRef.getConfig().positionStrategy)), config);
            if (match instanceof ngrid.PblNgridMultiTemplateRegistry) {
                /** @type {?} */
                var tPortal = this._getTemplatePortal(match.tRef, overlayPanelRef);
                /** @type {?} */
                var viewRef = overlayRef.attach(tPortal);
                viewRef.markForCheck();
                viewRef.detectChanges();
            }
            else {
                /** @type {?} */
                var cPortal = this._getComponentPortal(overlayPanelRef, match);
                /** @type {?} */
                var cmpRef = overlayRef.attach(cPortal);
                match.onCreated(null, cmpRef);
            }
            overlayRef.updatePosition();
            return overlayPanelRef;
        };
        /**
         * This method creates the overlay from the provided menu's template and saves its
         * OverlayRef so that it can be attached to the DOM when openMenu is called.
         */
        /**
         * This method creates the overlay from the provided menu's template and saves its
         * OverlayRef so that it can be attached to the DOM when openMenu is called.
         * @private
         * @param {?} element
         * @param {?} config
         * @return {?}
         */
        PblNgridOverlayPanel.prototype._createOverlay = /**
         * This method creates the overlay from the provided menu's template and saves its
         * OverlayRef so that it can be attached to the DOM when openMenu is called.
         * @private
         * @param {?} element
         * @param {?} config
         * @return {?}
         */
        function (element, config) {
            /** @type {?} */
            var overlayConfig = this._getOverlayConfig(element, config);
            /** @type {?} */
            var overlayRef = this._overlay.create(overlayConfig);
            overlayRef.getConfig().hasBackdrop = !!config.hasBackdrop;
            // Consume the `keydownEvents` in order to prevent them from going to another overlay.
            // Ideally we'd also have our keyboard event logic in here, however doing so will
            // break anybody that may have implemented the `MatMenuPanel` themselves.
            overlayRef.keydownEvents().subscribe();
            return overlayRef;
        };
        /**
         * This method builds the configuration object needed to create the overlay, the OverlayState.
         * @returns OverlayConfig
         */
        /**
         * This method builds the configuration object needed to create the overlay, the OverlayState.
         * @private
         * @param {?} element
         * @param {?} config
         * @return {?} OverlayConfig
         */
        PblNgridOverlayPanel.prototype._getOverlayConfig = /**
         * This method builds the configuration object needed to create the overlay, the OverlayState.
         * @private
         * @param {?} element
         * @param {?} config
         * @return {?} OverlayConfig
         */
        function (element, config) {
            return new overlay.OverlayConfig({
                positionStrategy: this._overlay.position()
                    .flexibleConnectedTo(element)
                    .withLockedPosition(),
                backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
                // TODO: don't use the cdk's class, create it
                scrollStrategy: this._scrollStrategy(),
                direction: this._dir
            });
        };
        /**
         * @private
         * @param {?} tRef
         * @param {?} overlayPanelRef
         * @return {?}
         */
        PblNgridOverlayPanel.prototype._getTemplatePortal = /**
         * @private
         * @param {?} tRef
         * @param {?} overlayPanelRef
         * @return {?}
         */
        function (tRef, overlayPanelRef) {
            /** @type {?} */
            var context = {
                grid: this.grid,
                ref: overlayPanelRef,
            };
            return new portal.TemplatePortal(tRef, this.vcRef, context);
        };
        /**
         * @private
         * @param {?} overlayPanelRef
         * @param {?} componentExtension
         * @return {?}
         */
        PblNgridOverlayPanel.prototype._getComponentPortal = /**
         * @private
         * @param {?} overlayPanelRef
         * @param {?} componentExtension
         * @return {?}
         */
        function (overlayPanelRef, componentExtension) {
            /** @type {?} */
            var portalInjector = core.Injector.create({
                providers: [
                    { provide: PblNgridOverlayPanelRef, useValue: overlayPanelRef },
                ],
                parent: componentExtension.injector || this.injector,
            });
            return new portal.ComponentPortal(componentExtension.component, this.vcRef, portalInjector, componentExtension.cfr || null);
        };
        /**
         * @private
         * @param {?} positionStrategy
         * @param {?} config
         * @return {?}
         */
        PblNgridOverlayPanel.prototype._setPosition = /**
         * @private
         * @param {?} positionStrategy
         * @param {?} config
         * @return {?}
         */
        function (positionStrategy, config) {
            var _a = __read(config.xPos === 'center'
                ? ['center', 'center']
                : config.xPos === 'before' ? ['end', 'start'] : ['start', 'end'], 2), originX = _a[0], originFallbackX = _a[1];
            var _b = __read(config.yPos === 'center'
                ? ['center', 'center']
                : config.yPos === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], 2), overlayY = _b[0], overlayFallbackY = _b[1];
            var _c = __read([overlayY, overlayFallbackY], 2), originY = _c[0], originFallbackY = _c[1];
            var _d = __read([originX, originFallbackX], 2), overlayX = _d[0], overlayFallbackX = _d[1];
            /** @type {?} */
            var offsetY = 0;
            if (!config.insetPos) {
                if (overlayY !== 'center') {
                    originY = overlayY === 'top' ? 'bottom' : 'top';
                }
                if (overlayFallbackY !== 'center') {
                    originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
                }
            }
            positionStrategy.withPositions([
                { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
                { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
                {
                    originX: originX,
                    originY: originFallbackY,
                    overlayX: overlayX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY
                },
                {
                    originX: originFallbackX,
                    originY: originFallbackY,
                    overlayX: overlayFallbackX,
                    overlayY: overlayFallbackY,
                    offsetY: -offsetY
                }
            ]);
        };
        /**
         * @private
         * @param {?} extName
         * @return {?}
         */
        PblNgridOverlayPanel.prototype.findNamesExtension = /**
         * @private
         * @param {?} extName
         * @return {?}
         */
        function (extName) {
            /** @type {?} */
            var match;
            this.grid.registry.forMulti('overlayPanels', (/**
             * @param {?} values
             * @return {?}
             */
            function (values) {
                var e_1, _a;
                try {
                    for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                        var value = values_1_1.value;
                        if (value.name === extName) {
                            match = value;
                            return true;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }));
            return match;
        };
        return PblNgridOverlayPanel;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanel.prototype.vcRef;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanel.prototype.injector;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanel.prototype._scrollStrategy;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanel.prototype._overlay;
        /**
         * @type {?}
         * @private
         */
        PblNgridOverlayPanel.prototype._dir;
        /** @type {?} */
        PblNgridOverlayPanel.prototype.grid;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     * @template T
     */
    function PblNgridOverlayPanelContext() { }
    if (false) {
        /** @type {?} */
        PblNgridOverlayPanelContext.prototype.grid;
        /** @type {?} */
        PblNgridOverlayPanelContext.prototype.ref;
    }
    var PblNgridOverlayPanelDef = /** @class */ (function (_super) {
        __extends(PblNgridOverlayPanelDef, _super);
        function PblNgridOverlayPanelDef(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.kind = 'overlayPanels';
            return _this;
        }
        PblNgridOverlayPanelDef.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridOverlayPanelDef]' },] }
        ];
        /** @nocollapse */
        PblNgridOverlayPanelDef.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: ngrid.PblNgridRegistryService }
        ]; };
        PblNgridOverlayPanelDef.propDecorators = {
            name: [{ type: core.Input, args: ['pblNgridOverlayPanelDef',] }]
        };
        return PblNgridOverlayPanelDef;
    }(ngrid.PblNgridMultiTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridOverlayPanelDef.prototype.kind;
        /** @type {?} */
        PblNgridOverlayPanelDef.prototype.name;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridOverlayPanelModule = /** @class */ (function () {
        function PblNgridOverlayPanelModule() {
        }
        PblNgridOverlayPanelModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            overlay.OverlayModule,
                            bidi.BidiModule,
                        ],
                        declarations: [
                            PblNgridOverlayPanelDef,
                        ],
                        exports: [
                            PblNgridOverlayPanelDef,
                        ],
                        providers: [
                            PblNgridOverlayPanelFactory,
                        ],
                        entryComponents: [],
                    },] }
        ];
        return PblNgridOverlayPanelModule;
    }());

    exports.PblNgridOverlayPanel = PblNgridOverlayPanel;
    exports.PblNgridOverlayPanelComponentExtension = PblNgridOverlayPanelComponentExtension;
    exports.PblNgridOverlayPanelDef = PblNgridOverlayPanelDef;
    exports.PblNgridOverlayPanelFactory = PblNgridOverlayPanelFactory;
    exports.PblNgridOverlayPanelModule = PblNgridOverlayPanelModule;
    exports.PblNgridOverlayPanelRef = PblNgridOverlayPanelRef;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-overlay-panel.umd.js.map
