(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/paginator'), require('@angular/material/select'), require('@angular/material/tooltip'), require('@angular/material/button'), require('@pebula/ngrid'), require('@angular/cdk/coercion'), require('@pebula/utils')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/paginator', ['exports', '@angular/core', '@angular/common', '@angular/material/paginator', '@angular/material/select', '@angular/material/tooltip', '@angular/material/button', '@pebula/ngrid', '@angular/cdk/coercion', '@pebula/utils'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material'].paginator = {}), global.ng.core, global.ng.common, global.ng.material.paginator, global.ng.material.select, global.ng.material.tooltip, global.ng.material.button, global.pebula.ngrid, global.ng.cdk.coercion, global.pebula.utils));
}(this, (function (exports, core, common, paginator, select, tooltip, button, ngrid, coercion, utils) { 'use strict';

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
    var DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
    var PblPaginatorComponent = /** @class */ (function () {
        function PblPaginatorComponent(table, _intl, cdr) {
            var _this = this;
            this._intl = _intl;
            this.cdr = cdr;
            this.pages = [];
            this.pageSizes = DEFAULT_PAGE_SIZE_OPTIONS.slice();
            this._hidePageSize = false;
            this._hideRangeSelect = false;
            if (table) {
                this.table = table;
            }
            _intl.changes
                .pipe(utils.UnRx(this))
                .subscribe((/**
             * @return {?}
             */
            function () { return _this.cdr.markForCheck(); }));
        }
        Object.defineProperty(PblPaginatorComponent.prototype, "pageSizeOptions", {
            get: /**
             * @return {?}
             */
            function () { return this._pageSizeOptions; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._pageSizeOptions = value;
                this.pageSizes = (value || DEFAULT_PAGE_SIZE_OPTIONS).slice();
                this.updatePageSizes();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPaginatorComponent.prototype, "paginator", {
            get: /**
             * @return {?}
             */
            function () { return this._paginator; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _this = this;
                if (this._paginator === value) {
                    return;
                }
                if (this._paginator) {
                    utils.UnRx.kill(this, this._paginator);
                }
                this._paginator = value;
                if (value) {
                    // pagination.onChange is BehaviorSubject so handlePageChange will trigger
                    value.onChange
                        .pipe(utils.UnRx(this, value))
                        .subscribe((/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) { return _this.handlePageChange(event); }));
                    this.updatePageSizes();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPaginatorComponent.prototype, "hidePageSize", {
            get: /**
             * @return {?}
             */
            function () { return this._hidePageSize; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._hidePageSize = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblPaginatorComponent.prototype, "hideRangeSelect", {
            get: /**
             * @return {?}
             */
            function () { return this._hideRangeSelect; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._hideRangeSelect = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         * @return {?}
         */
        PblPaginatorComponent.prototype.updatePageSizes = /**
         * @private
         * @return {?}
         */
        function () {
            if (this.paginator && this.pageSizes.indexOf(this.paginator.perPage) === -1) {
                this.pageSizes.push(this.paginator.perPage);
            }
            this.pageSizes.sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a - b; }));
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        PblPaginatorComponent.prototype.handlePageChange = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (this.pages.length !== this.paginator.totalPages) {
                /** @type {?} */
                var pages = this.pages = [];
                for (var i = 1, len = this.paginator.totalPages + 1; i < len; i++) {
                    pages.push(i);
                }
            }
            // this is required here to prevent `ExpressionChangedAfterItHasBeenCheckedError` when the component has or wrapped
            // by an ngIf
            this.cdr.detectChanges();
            this.cdr.markForCheck();
        };
        PblPaginatorComponent.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: paginator.MatPaginatorIntl },
            { type: core.ChangeDetectorRef }
        ]; };
        PblPaginatorComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-paginator',
                        template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div *ngIf=\"!hidePageSize\" class=\"mat-paginator-page-size\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field *ngIf=\"pageSizes.length > 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.perPage\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\"\n          (selectionChange)=\"paginator.perPage = $event.value\">\n          <mat-option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div *ngIf=\"paginator.kind ==='pageNumber'\" class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(paginator.page - 1, paginator.perPage, paginator.total)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"paginator.prevPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasPrev()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n\n      <mat-form-field *ngIf=\"!hideRangeSelect && paginator.kind ==='pageNumber' && pageSizes.length >= 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.page\"\n          [disabled]=\"paginator.totalPages === 1\"\n          (selectionChange)=\"paginator.page = $event.value\">\n          <mat-option *ngFor=\"let p of pages\" [value]=\"p\">{{p}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"paginator.nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasNext()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n",
                        host: {
                            'class': 'mat-paginator',
                        },
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mat-paginator-range-label{-webkit-box-flex:1;flex-grow:1}.mat-paginator-container{box-sizing:border-box}"]
                    }] }
        ];
        /** @nocollapse */
        PblPaginatorComponent.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent, decorators: [{ type: core.Optional }] },
            { type: paginator.MatPaginatorIntl },
            { type: core.ChangeDetectorRef }
        ]; };
        PblPaginatorComponent.propDecorators = {
            pageSizeOptions: [{ type: core.Input }],
            paginator: [{ type: core.Input }],
            table: [{ type: core.Input }],
            hidePageSize: [{ type: core.Input }],
            hideRangeSelect: [{ type: core.Input }]
        };
        PblPaginatorComponent = __decorate([
            utils.UnRx(),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent,
                paginator.MatPaginatorIntl,
                core.ChangeDetectorRef])
        ], PblPaginatorComponent);
        return PblPaginatorComponent;
    }());
    if (false) {
        /** @type {?} */
        PblPaginatorComponent.prototype.pages;
        /** @type {?} */
        PblPaginatorComponent.prototype.pageSizes;
        /** @type {?} */
        PblPaginatorComponent.prototype.table;
        /**
         * @type {?}
         * @private
         */
        PblPaginatorComponent.prototype._pageSizeOptions;
        /**
         * @type {?}
         * @private
         */
        PblPaginatorComponent.prototype._paginator;
        /**
         * @type {?}
         * @private
         */
        PblPaginatorComponent.prototype._hidePageSize;
        /**
         * @type {?}
         * @private
         */
        PblPaginatorComponent.prototype._hideRangeSelect;
        /** @type {?} */
        PblPaginatorComponent.prototype._intl;
        /**
         * @type {?}
         * @private
         */
        PblPaginatorComponent.prototype.cdr;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    // TODO: Remove MatPaginatorModule and the initial code in the constructor
    // set the styles in the SCSS.
    var PblNgridPaginatorModule = /** @class */ (function () {
        function PblNgridPaginatorModule(cf, injector) {
            // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
            cf.resolveComponentFactory(paginator.MatPaginator).create(injector);
        }
        PblNgridPaginatorModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, paginator.MatPaginatorModule, select.MatSelectModule, tooltip.MatTooltipModule, button.MatButtonModule, ngrid.PblNgridModule],
                        declarations: [PblPaginatorComponent],
                        exports: [PblPaginatorComponent],
                        entryComponents: [PblPaginatorComponent, paginator.MatPaginator]
                    },] }
        ];
        /** @nocollapse */
        PblNgridPaginatorModule.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        return PblNgridPaginatorModule;
    }());

    exports.PblNgridPaginatorModule = PblNgridPaginatorModule;
    exports.ɵa = PblPaginatorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-paginator.umd.js.map
