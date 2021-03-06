(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/icon'), require('@angular/material/button'), require('@angular/material/menu'), require('@angular/material/form-field'), require('@angular/material/input'), require('@pebula/ngrid'), require('@pebula/ngrid/overlay-panel')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/context-menu', ['exports', '@angular/core', '@angular/common', '@angular/material/icon', '@angular/material/button', '@angular/material/menu', '@angular/material/form-field', '@angular/material/input', '@pebula/ngrid', '@pebula/ngrid/overlay-panel'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material']['context-menu'] = {}), global.ng.core, global.ng.common, global.ng.material.icon, global.ng.material.button, global.ng.material.menu, global.ng.material.formField, global.ng.material.input, global.pebula.ngrid, global.pebula.ngrid['overlay-panel']));
}(this, (function (exports, core, common, icon, button, menu, formField, input, ngrid, overlayPanel) { 'use strict';

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
     * Generated from: lib/header-context/header-context-menu.directive.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY = 'matHeaderContextMenu';
    var PblNgridMatHeaderContextMenuPlugin = /** @class */ (function () {
        function PblNgridMatHeaderContextMenuPlugin(overlayPanelFactory, pluginCtrl) {
            this.pluginCtrl = pluginCtrl;
            this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.grid);
        }
        PblNgridMatHeaderContextMenuPlugin.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]', providers: [overlayPanel.PblNgridOverlayPanelFactory] },] }
        ];
        /** @nocollapse */
        PblNgridMatHeaderContextMenuPlugin.ctorParameters = function () { return [
            { type: overlayPanel.PblNgridOverlayPanelFactory },
            { type: ngrid.PblNgridPluginController }
        ]; };
        PblNgridMatHeaderContextMenuPlugin.propDecorators = {
            style: [{ type: core.Input, args: ['matHeaderContextMenu',] }],
            config: [{ type: core.Input }]
        };
        return PblNgridMatHeaderContextMenuPlugin;
    }());
    if (false) {
        /** @type {?} */
        PblNgridMatHeaderContextMenuPlugin.prototype.style;
        /** @type {?} */
        PblNgridMatHeaderContextMenuPlugin.prototype.config;
        /** @type {?} */
        PblNgridMatHeaderContextMenuPlugin.prototype.overlayPanel;
        /** @type {?} */
        PblNgridMatHeaderContextMenuPlugin.prototype.pluginCtrl;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/header-context/header-context-menu-trigger.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
    var MatHeaderContextMenuTrigger = /** @class */ (function () {
        function MatHeaderContextMenuTrigger(plugin, elRef) {
            this.plugin = plugin;
            this.elRef = elRef;
        }
        /**
         * @return {?}
         */
        MatHeaderContextMenuTrigger.prototype.openOverlayPanel = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var config = this.plugin.config || DEFAULT_CONFIG;
            this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
        };
        MatHeaderContextMenuTrigger.decorators = [
            { type: core.Component, args: [{
                        selector: 'div[mat-header-context-menu-trigger]',
                        host: {
                            class: 'mat-header-context-menu-trigger',
                            '(click)': 'openOverlayPanel()',
                        },
                        template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["div.mat-header-context-menu-trigger{position:absolute;display:flex;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
                    }] }
        ];
        /** @nocollapse */
        MatHeaderContextMenuTrigger.ctorParameters = function () { return [
            { type: PblNgridMatHeaderContextMenuPlugin },
            { type: core.ElementRef }
        ]; };
        return MatHeaderContextMenuTrigger;
    }());
    if (false) {
        /** @type {?} */
        MatHeaderContextMenuTrigger.prototype.context;
        /**
         * @type {?}
         * @private
         */
        MatHeaderContextMenuTrigger.prototype.plugin;
        /**
         * @type {?}
         * @private
         */
        MatHeaderContextMenuTrigger.prototype.elRef;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/header-context/header-context-menu-extension.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MatHeaderContextMenuExtension = /** @class */ (function (_super) {
        __extends(MatHeaderContextMenuExtension, _super);
        function MatHeaderContextMenuExtension(cfr) {
            var _this = _super.call(this) || this;
            _this.cfr = cfr;
            _this.name = 'matHeaderContextMenuTrigger';
            _this.kind = 'dataHeaderExtensions';
            _this.projectContent = false;
            return _this;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        MatHeaderContextMenuExtension.prototype.shouldRender = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
        };
        /**
         * @param {?} context
         * @return {?}
         */
        MatHeaderContextMenuExtension.prototype.getFactory = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
        };
        /**
         * @param {?} context
         * @param {?} cmpRef
         * @return {?}
         */
        MatHeaderContextMenuExtension.prototype.onCreated = /**
         * @param {?} context
         * @param {?} cmpRef
         * @return {?}
         */
        function (context, cmpRef) {
            cmpRef.instance.context = context;
            cmpRef.changeDetectorRef.markForCheck();
        };
        return MatHeaderContextMenuExtension;
    }(ngrid.PblNgridMultiComponentRegistry));
    if (false) {
        /** @type {?} */
        MatHeaderContextMenuExtension.prototype.name;
        /** @type {?} */
        MatHeaderContextMenuExtension.prototype.kind;
        /** @type {?} */
        MatHeaderContextMenuExtension.prototype.projectContent;
        /**
         * @type {?}
         * @private
         */
        MatHeaderContextMenuExtension.prototype.cfr;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/header-context/styles/excel-style-header-menu.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MatExcelStyleHeaderMenu = /** @class */ (function () {
        function MatExcelStyleHeaderMenu(ref) {
            this.ref = ref;
            this.currentFilter = '';
            this.column = ref.data.col;
            this.grid = ref.data.grid;
            if (this.grid.ds.sort.column === this.column) {
                this.currentSort = this.grid.ds.sort.sort.order;
            }
            this.currentPin = this.column.columnDef.sticky ? 'start' : this.column.columnDef.stickyEnd ? 'end' : undefined;
            /** @type {?} */
            var dsFilter = this.grid.ds.filter;
            if (dsFilter && dsFilter.type === 'value' && dsFilter.columns && dsFilter.columns.indexOf(this.column) >= 0) {
                this.currentFilter = dsFilter.filter;
            }
        }
        /**
         * @return {?}
         */
        MatExcelStyleHeaderMenu.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.matMenu.closed.subscribe((/**
             * @param {?} reason
             * @return {?}
             */
            function (reason) {
                _this.ref.close();
            }));
            /** @type {?} */
            var view = this.menuViewLocation.createEmbeddedView(this.matMenu.templateRef);
            this.matMenu.setElevation(0);
            this.matMenu.focusFirstItem('program');
            this.matMenu._resetAnimation();
            view.markForCheck();
            view.detectChanges();
            this.matMenu._startAnimation();
        };
        /**
         * @return {?}
         */
        MatExcelStyleHeaderMenu.prototype.hide = /**
         * @return {?}
         */
        function () {
            var e_1, _a;
            /** @type {?} */
            var hidden = [this.column.id];
            try {
                for (var _b = __values(this.grid.columnApi.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var col = _c.value;
                    if (col.hidden) {
                        hidden.push(col.id);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.grid.hideColumns = hidden;
        };
        /**
         * @param {?} sort
         * @return {?}
         */
        MatExcelStyleHeaderMenu.prototype.onSortToggle = /**
         * @param {?} sort
         * @return {?}
         */
        function (sort) {
            if (this.currentSort === sort) {
                this.grid.ds.setSort();
            }
            else {
                this.grid.ds.setSort(this.column, { order: sort });
            }
        };
        /**
         * @param {?} pin
         * @return {?}
         */
        MatExcelStyleHeaderMenu.prototype.onPinToggle = /**
         * @param {?} pin
         * @return {?}
         */
        function (pin) {
            if (this.currentPin === pin) {
                this.column.columnDef.updatePin();
            }
            else {
                this.column.columnDef.updatePin(pin);
            }
        };
        /**
         * @param {?} filterValue
         * @return {?}
         */
        MatExcelStyleHeaderMenu.prototype.filterColumn = /**
         * @param {?} filterValue
         * @return {?}
         */
        function (filterValue) {
            this.currentFilter = filterValue;
            if (!filterValue) {
                this.grid.setFilter();
            }
            else {
                this.grid.setFilter(filterValue.trim(), [this.column]);
            }
        };
        /**
         * @param {?} event
         * @return {?}
         */
        MatExcelStyleHeaderMenu.prototype.clickTrap = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            event.preventDefault();
            event.stopPropagation();
        };
        MatExcelStyleHeaderMenu.decorators = [
            { type: core.Component, args: [{
                        selector: 'mat-excel-style-header-menu',
                        template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n<ng-container #menuViewLocation></ng-container>\n",
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
                    }] }
        ];
        /** @nocollapse */
        MatExcelStyleHeaderMenu.ctorParameters = function () { return [
            { type: overlayPanel.PblNgridOverlayPanelRef }
        ]; };
        MatExcelStyleHeaderMenu.propDecorators = {
            matMenu: [{ type: core.ViewChild, args: ['columnMenu', { read: menu.MatMenu, static: true },] }],
            menuViewLocation: [{ type: core.ViewChild, args: ['menuViewLocation', { read: core.ViewContainerRef, static: true },] }]
        };
        return MatExcelStyleHeaderMenu;
    }());
    if (false) {
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.column;
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.grid;
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.matMenu;
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.menuViewLocation;
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.currentSort;
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.currentPin;
        /** @type {?} */
        MatExcelStyleHeaderMenu.prototype.currentFilter;
        /**
         * @type {?}
         * @private
         */
        MatExcelStyleHeaderMenu.prototype.ref;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/context-menu.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridContextMenuModule = /** @class */ (function () {
        function PblNgridContextMenuModule(parentModule, registry, cfr, configService) {
            if (parentModule) {
                return;
            }
            registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
            registry.addMulti('overlayPanels', new overlayPanel.PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
        }
        PblNgridContextMenuModule.NGRID_PLUGIN = ngrid.ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatHeaderContextMenuPlugin);
        PblNgridContextMenuModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            icon.MatIconModule,
                            button.MatButtonModule,
                            menu.MatMenuModule,
                            formField.MatFormFieldModule,
                            input.MatInputModule,
                            ngrid.PblNgridModule,
                            overlayPanel.PblNgridOverlayPanelModule,
                        ],
                        declarations: [
                            MatHeaderContextMenuTrigger,
                            PblNgridMatHeaderContextMenuPlugin,
                            MatExcelStyleHeaderMenu,
                        ],
                        exports: [
                            PblNgridMatHeaderContextMenuPlugin,
                        ],
                        entryComponents: [
                            // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                            MatHeaderContextMenuTrigger,
                            MatExcelStyleHeaderMenu,
                        ],
                    },] }
        ];
        /** @nocollapse */
        PblNgridContextMenuModule.ctorParameters = function () { return [
            { type: PblNgridContextMenuModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: ngrid.PblNgridRegistryService },
            { type: core.ComponentFactoryResolver },
            { type: ngrid.PblNgridConfigService }
        ]; };
        return PblNgridContextMenuModule;
    }());
    if (false) {
        /** @type {?} */
        PblNgridContextMenuModule.NGRID_PLUGIN;
    }

    exports.PblNgridContextMenuModule = PblNgridContextMenuModule;
    exports.ɵa = MatHeaderContextMenuTrigger;
    exports.ɵb = PLUGIN_KEY;
    exports.ɵc = PblNgridMatHeaderContextMenuPlugin;
    exports.ɵd = MatExcelStyleHeaderMenu;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-context-menu.umd.js.map
