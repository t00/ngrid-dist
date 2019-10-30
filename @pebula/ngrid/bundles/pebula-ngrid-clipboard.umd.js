(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('@angular/core'), require('@angular/common'), require('@pebula/utils'), require('@pebula/ngrid'), require('@pebula/ngrid/target-events')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/clipboard', ['exports', 'rxjs/operators', '@angular/core', '@angular/common', '@pebula/utils', '@pebula/ngrid', '@pebula/ngrid/target-events'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.clipboard = {}), global.rxjs.operators, global.ng.core, global.ng.common, global.pebula.utils, global.pebula.ngrid, global.pebula.ngrid['target-events']));
}(this, function (exports, operators, core, common, utils, ngrid, targetEvents) { 'use strict';

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
     * A service for copying text to the clipboard.
     *
     * Example usage:
     *
     * clipboard.copy("copy this text");
     */
    var Clipboard = /** @class */ (function () {
        function Clipboard(document) {
            this._document = document;
        }
        /**
        * Copies the provided text into the user's clipboard.
        *
        * @param text The string to copy.
        * @returns Whether the operation was successful.
        */
        /**
         * Copies the provided text into the user's clipboard.
         *
         * @param {?} text The string to copy.
         * @return {?} Whether the operation was successful.
         */
        Clipboard.prototype.copy = /**
         * Copies the provided text into the user's clipboard.
         *
         * @param {?} text The string to copy.
         * @return {?} Whether the operation was successful.
         */
        function (text) {
            /** @type {?} */
            var pendingCopy = this.beginCopy(text);
            /** @type {?} */
            var successful = pendingCopy.copy();
            pendingCopy.destroy();
            return successful;
        };
        /**
        * Prepares a string to be copied later. This is useful for large strings
        * which take too long to successfully render and be copied in the same tick.
        *
        * The caller must call `destroy` on the returned `PendingCopy`.
        *
        * @param text The string to copy.
        * @returns the pending copy operation.
        */
        /**
         * Prepares a string to be copied later. This is useful for large strings
         * which take too long to successfully render and be copied in the same tick.
         *
         * The caller must call `destroy` on the returned `PendingCopy`.
         *
         * @param {?} text The string to copy.
         * @return {?} the pending copy operation.
         */
        Clipboard.prototype.beginCopy = /**
         * Prepares a string to be copied later. This is useful for large strings
         * which take too long to successfully render and be copied in the same tick.
         *
         * The caller must call `destroy` on the returned `PendingCopy`.
         *
         * @param {?} text The string to copy.
         * @return {?} the pending copy operation.
         */
        function (text) {
            return new PendingCopy(text, this._document);
        };
        Clipboard.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        Clipboard.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        /** @nocollapse */ Clipboard.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(core.ɵɵinject(common.DOCUMENT)); }, token: Clipboard, providedIn: "root" });
        return Clipboard;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        Clipboard.prototype._document;
    }
    /**
     * A pending copy-to-clipboard operation.
     *
     * The implementation of copying text to the clipboard modifies the DOM and
     * forces a relayout. This relayout can take too long if the string is large,
     * causing the execCommand('copy') to happen too long after the user clicked.
     * This results in the browser refusing to copy. This object lets the
     * relayout happen in a separate tick from copying by providing a copy function
     * that can be called later.
     *
     * Destroy must be called when no longer in use, regardless of whether `copy` is
     * called.
     */
    var /**
     * A pending copy-to-clipboard operation.
     *
     * The implementation of copying text to the clipboard modifies the DOM and
     * forces a relayout. This relayout can take too long if the string is large,
     * causing the execCommand('copy') to happen too long after the user clicked.
     * This results in the browser refusing to copy. This object lets the
     * relayout happen in a separate tick from copying by providing a copy function
     * that can be called later.
     *
     * Destroy must be called when no longer in use, regardless of whether `copy` is
     * called.
     */
    PendingCopy = /** @class */ (function () {
        function PendingCopy(text, _document) {
            this._document = _document;
            /** @type {?} */
            var textarea = this._textarea = this._document.createElement('textarea');
            // Hide the element for display and accessibility.
            textarea.setAttribute('style', 'opacity: 0;');
            textarea.setAttribute('aria-hidden', 'true');
            textarea.value = text;
            this._document.body.appendChild(textarea);
        }
        /** Finishes copying the text. */
        /**
         * Finishes copying the text.
         * @return {?}
         */
        PendingCopy.prototype.copy = /**
         * Finishes copying the text.
         * @return {?}
         */
        function () {
            /** @type {?} */
            var textarea = this._textarea;
            /** @type {?} */
            var successful = false;
            try { // Older browsers could throw if copy is not supported.
                if (textarea) {
                    /** @type {?} */
                    var currentFocus = document.activeElement;
                    textarea.select();
                    successful = this._document.execCommand('copy');
                    if (currentFocus instanceof HTMLElement) {
                        currentFocus.focus();
                    }
                }
            }
            catch (_a) {
                // Discard error.
                // Initial setting of {@code successful} will represent failure here.
            }
            return successful;
        };
        /** Cleans up DOM changes used to perform the copy operation. */
        /**
         * Cleans up DOM changes used to perform the copy operation.
         * @return {?}
         */
        PendingCopy.prototype.destroy = /**
         * Cleans up DOM changes used to perform the copy operation.
         * @return {?}
         */
        function () {
            if (this._textarea) {
                this._document.body.removeChild(this._textarea);
                this._textarea = undefined;
            }
        };
        return PendingCopy;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PendingCopy.prototype._textarea;
        /**
         * @type {?}
         * @private
         */
        PendingCopy.prototype._document;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var IS_OSX = /^mac/.test(navigator.platform.toLowerCase());
    /** @type {?} */
    var DEFAULT_CELL_SEP = '\t';
    /** @type {?} */
    var DEFAULT_ROW_SEP = '\n';
    /** @type {?} */
    var PLUGIN_KEY = 'clipboard';
    var PblNgridClipboardPlugin = /** @class */ (function () {
        function PblNgridClipboardPlugin(grid, injector, pluginCtrl) {
            this.grid = grid;
            this.injector = injector;
            this.pluginCtrl = pluginCtrl;
            this.config = injector.get(ngrid.PblNgridConfigService);
            this.clipboard = injector.get(Clipboard);
            this.init();
        }
        PblNgridClipboardPlugin_1 = PblNgridClipboardPlugin;
        /**
         * @param {?} grid
         * @param {?} injector
         * @return {?}
         */
        PblNgridClipboardPlugin.create = /**
         * @param {?} grid
         * @param {?} injector
         * @return {?}
         */
        function (grid, injector) {
            /** @type {?} */
            var pluginCtrl = ngrid.PblNgridPluginController.find(grid);
            return new PblNgridClipboardPlugin_1(grid, injector, pluginCtrl);
        };
        /**
         * @return {?}
         */
        PblNgridClipboardPlugin.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._removePlugin(this.grid);
        };
        /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        PblNgridClipboardPlugin.prototype.isCopyEvent = /**
         * @protected
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof KeyboardEvent && event.key === 'c') {
                if ((!IS_OSX && event.ctrlKey) || (IS_OSX && event.metaKey)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * @protected
         * @return {?}
         */
        PblNgridClipboardPlugin.prototype.doCopy = /**
         * @protected
         * @return {?}
         */
        function () {
            var _this = this;
            var _a = this.config.get('clipboard', {}), cellSeparator = _a.cellSeparator, rowSeparator = _a.rowSeparator;
            var _b = this.getSelectedRowData(this.grid), rows = _b.rows, minIndex = _b.minIndex;
            /** @type {?} */
            var createRow = (/**
             * @param {?} row
             * @return {?}
             */
            function (row) { return row.slice(minIndex).join(_this.clpCellSep || cellSeparator || DEFAULT_CELL_SEP); });
            // For each row (collection of items), slice the initial items that are not copied across all selections
            this.clipboard.copy(rows.map(createRow).join(this.clpRowSep || rowSeparator || DEFAULT_ROW_SEP));
            // TODO: Consider using `beginCopy` to support large copy operations
        };
        /**
         * @protected
         * @param {?} grid
         * @return {?}
         */
        PblNgridClipboardPlugin.prototype.getSelectedRowData = /**
         * @protected
         * @param {?} grid
         * @return {?}
         */
        function (grid) {
            var e_1, _a;
            var columnApi = grid.columnApi, contextApi = grid.contextApi;
            /** @type {?} */
            var data = new Map();
            // The minIndex represents the first column being copied out of all visible columns (0 being the first visible column).
            // For every selected cell, the column is tracked and it's index is being set to `minIndex` if it is lower then the current `minIndex` (Math.Min).
            // We start with the biggest int but right away get a valid column index...
            // Later on, each row is sliced to remove the items in indices lower then the `minIndex`.
            //
            // All of this is to make the paste start without leading cell separators.
            /** @type {?} */
            var minIndex = Number.MAX_SAFE_INTEGER;
            try {
                for (var _b = __values(contextApi.selectedCells), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var point = _c.value;
                    /** @type {?} */
                    var col = columnApi.columns[point.colIndex];
                    if (col) {
                        /** @type {?} */
                        var colIndex = columnApi.renderIndexOf(col);
                        if (colIndex > -1) {
                            /** @type {?} */
                            var rowIndex = contextApi.findRowInCache(point.rowIdent).dataIndex;
                            /** @type {?} */
                            var dataItem = col.getValue(grid.ds.source[rowIndex]);
                            /** @type {?} */
                            var row = data.get(point.rowIdent) || [];
                            row[colIndex] = dataItem;
                            data.set(point.rowIdent, row);
                            minIndex = Math.min(minIndex, colIndex);
                        }
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
            return {
                minIndex: minIndex,
                rows: Array.from(data.values()),
            };
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridClipboardPlugin.prototype.init = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._removePlugin = this.pluginCtrl.setPlugin(PLUGIN_KEY, this);
            if (!this.pluginCtrl.hasPlugin('targetEvents')) {
                this.pluginCtrl.createPlugin('targetEvents');
            }
            /** @type {?} */
            var targetEvents = this.pluginCtrl.getPlugin('targetEvents');
            targetEvents.keyDown
                .pipe(operators.filter((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.isCopyEvent(event.source); })), utils.UnRx(this))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return _this.doCopy(); }));
        };
        var PblNgridClipboardPlugin_1;
        PblNgridClipboardPlugin.decorators = [
            { type: core.Directive, args: [{ selector: 'pbl-ngrid[clipboard]', exportAs: 'pblNgridClipboard' },] }
        ];
        /** @nocollapse */
        PblNgridClipboardPlugin.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: core.Injector },
            { type: ngrid.PblNgridPluginController }
        ]; };
        PblNgridClipboardPlugin.propDecorators = {
            clpCellSep: [{ type: core.Input }],
            clpRowSep: [{ type: core.Input }]
        };
        PblNgridClipboardPlugin = PblNgridClipboardPlugin_1 = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
            utils.UnRx(),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent, core.Injector, ngrid.PblNgridPluginController])
        ], PblNgridClipboardPlugin);
        return PblNgridClipboardPlugin;
    }());
    if (false) {
        /**
         * The separator to use when multiple cells are copied.
         * If not set, taken from `PblNgridConfig.clipboard.cellSeparator`
         * \@default \t
         * @type {?}
         */
        PblNgridClipboardPlugin.prototype.clpCellSep;
        /**
         * The separator to use when multiple rows are copied
         * If not set, taken from `PblNgridConfig.clipboard.rowSeparator`
         * \@default \n
         * @type {?}
         */
        PblNgridClipboardPlugin.prototype.clpRowSep;
        /**
         * @type {?}
         * @private
         */
        PblNgridClipboardPlugin.prototype.config;
        /**
         * @type {?}
         * @private
         */
        PblNgridClipboardPlugin.prototype.clipboard;
        /**
         * @type {?}
         * @private
         */
        PblNgridClipboardPlugin.prototype._removePlugin;
        /** @type {?} */
        PblNgridClipboardPlugin.prototype.grid;
        /**
         * @type {?}
         * @protected
         */
        PblNgridClipboardPlugin.prototype.injector;
        /**
         * @type {?}
         * @protected
         */
        PblNgridClipboardPlugin.prototype.pluginCtrl;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridClipboardPluginModule = /** @class */ (function () {
        function PblNgridClipboardPluginModule(parentModule, configService) {
            if (parentModule) {
                return;
            }
            ngrid.PblNgridPluginController.created
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var config = configService.get(PLUGIN_KEY, {});
                if (config.autoEnable === true) {
                    /** @type {?} */
                    var pluginCtrl_1 = event.controller;
                    pluginCtrl_1.events
                        .pipe(operators.filter((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return e.kind === 'onInit'; })), operators.first())
                        .subscribe((/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) {
                        if (!pluginCtrl_1.hasPlugin(PLUGIN_KEY)) {
                            pluginCtrl_1.createPlugin(PLUGIN_KEY);
                        }
                    }));
                }
            }));
        }
        PblNgridClipboardPluginModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, ngrid.PblNgridModule, targetEvents.PblNgridTargetEventsModule],
                        declarations: [PblNgridClipboardPlugin],
                        exports: [PblNgridClipboardPlugin],
                    },] }
        ];
        /** @nocollapse */
        PblNgridClipboardPluginModule.ctorParameters = function () { return [
            { type: PblNgridClipboardPluginModule, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: ngrid.PblNgridConfigService }
        ]; };
        return PblNgridClipboardPluginModule;
    }());

    exports.PLUGIN_KEY = PLUGIN_KEY;
    exports.PblNgridClipboardPlugin = PblNgridClipboardPlugin;
    exports.PblNgridClipboardPluginModule = PblNgridClipboardPluginModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pebula-ngrid-clipboard.umd.js.map
