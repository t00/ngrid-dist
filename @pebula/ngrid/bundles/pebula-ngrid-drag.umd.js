(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs/operators'), require('@angular/core'), require('@angular/cdk/drag-drop'), require('rxjs'), require('@angular/cdk/coercion'), require('@angular/common'), require('@angular/cdk/bidi'), require('@angular/cdk/scrolling'), require('@pebula/ngrid'), require('@angular/cdk/platform')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid/drag', ['exports', 'rxjs/operators', '@angular/core', '@angular/cdk/drag-drop', 'rxjs', '@angular/cdk/coercion', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/scrolling', '@pebula/ngrid', '@angular/cdk/platform'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula.ngrid = global.pebula.ngrid || {}, global.pebula.ngrid.drag = {}), global.rxjs.operators, global.ng.core, global.ng.cdk['drag-drop'], global.rxjs, global.ng.cdk.coercion, global.ng.common, global.ng.cdk.bidi, global.ng.cdk.scrolling, global.pebula.ngrid, global.ng.cdk.platform));
}(this, function (exports, operators, core, dragDrop, rxjs, coercion, common, bidi, scrolling, ngrid, platform) { 'use strict';

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
    var /**
     * @template T
     */
    PblDropListRef = /** @class */ (function (_super) {
        __extends(PblDropListRef, _super);
        function PblDropListRef() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /**
             * Emits right before dragging has started.
             */
            _this.beforeExit = new rxjs.Subject();
            return _this;
        }
        /**
         * @template THIS
         * @this {THIS}
         * @param {?} element
         * @return {THIS}
         */
        PblDropListRef.prototype.withElement = /**
         * @template THIS
         * @this {THIS}
         * @param {?} element
         * @return {THIS}
         */
        function (element) {
            // TODO: Workaround, see if we can push this through https://github.com/angular/material2/issues/15086
            ((/** @type {?} */ ((/** @type {?} */ (this))))).element = coercion.coerceElement(element);
            return (/** @type {?} */ (this));
        };
        /**
         * @return {?}
         */
        PblDropListRef.prototype.dispose = /**
         * @return {?}
         */
        function () {
            this.beforeExit.complete();
            _super.prototype.dispose.call(this);
        };
        return PblDropListRef;
    }(dragDrop.DropListRef));
    if (false) {
        /**
         * Emits right before dragging has started.
         * @type {?}
         */
        PblDropListRef.prototype.beforeExit;
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
    PblDragRef = /** @class */ (function (_super) {
        __extends(PblDragRef, _super);
        function PblDragRef() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, __spread(args)) || this;
            /**
             * Fires when the root element changes
             *
             * > Does not emit on the initial setup.
             */
            _this.rootElementChanged = new core.EventEmitter();
            _this.exited.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                var container = e.container;
                if (container instanceof PblDropListRef) {
                    container.beforeExit.next({ item: _this });
                }
            }));
            return _this;
        }
        /**
         * Sets an alternate drag root element. The root element is the element that will be moved as
         * the user is dragging. Passing an alternate root element is useful when trying to enable
         * dragging on an element that you might not have access to.
         */
        /**
         * Sets an alternate drag root element. The root element is the element that will be moved as
         * the user is dragging. Passing an alternate root element is useful when trying to enable
         * dragging on an element that you might not have access to.
         * @template THIS
         * @this {THIS}
         * @param {?} rootElement
         * @return {THIS}
         */
        PblDragRef.prototype.withRootElement = /**
         * Sets an alternate drag root element. The root element is the element that will be moved as
         * the user is dragging. Passing an alternate root element is useful when trying to enable
         * dragging on an element that you might not have access to.
         * @template THIS
         * @this {THIS}
         * @param {?} rootElement
         * @return {THIS}
         */
        function (rootElement) {
            // the first call to `withRootElement` comes from the base class, before we construct the emitter.
            // We don't need it anyway...
            if ((/** @type {?} */ (this)).rootElementChanged) {
                /** @type {?} */
                var element = coercion.coerceElement(rootElement);
                if ((/** @type {?} */ (this)).getRootElement() !== element) {
                    (/** @type {?} */ (this)).rootElementChanged.next({ prev: (/** @type {?} */ (this)).getRootElement(), curr: element });
                }
            }
            return _super.prototype.withRootElement.call(this, rootElement);
        };
        /**
         * @return {?}
         */
        PblDragRef.prototype.dispose = /**
         * @return {?}
         */
        function () {
            this.rootElementChanged.complete();
            _super.prototype.dispose.call(this);
        };
        return PblDragRef;
    }(dragDrop.DragRef));
    if (false) {
        /**
         * Fires when the root element changes
         *
         * > Does not emit on the initial setup.
         * @type {?}
         */
        PblDragRef.prototype.rootElementChanged;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T, DRef
     */
    var CdkLazyDropList = /** @class */ (function (_super) {
        __extends(CdkLazyDropList, _super);
        function CdkLazyDropList() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /* private */ _this._draggablesSet = new Set();
            return _this;
        }
        Object.defineProperty(CdkLazyDropList.prototype, "pblDropListRef", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dropListRef)); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CdkLazyDropList.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.pblDropListRef instanceof PblDropListRef === false) {
                throw new Error('Invalid `DropListRef` injection, the ref is not an instance of PblDropListRef');
            }
            this._dropListRef.beforeStarted.subscribe((/**
             * @return {?}
             */
            function () { return _this.beforeStarted(); }));
        };
        /**
         * @param {?} drag
         * @return {?}
         */
        CdkLazyDropList.prototype.addDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) {
            this._draggablesSet.add(drag);
            this._draggables.reset(Array.from(this._draggablesSet.values()));
            this._draggables.notifyOnChanges(); // TODO: notify with asap schedular and obs$
        };
        /**
         * @param {?} drag
         * @return {?}
         */
        CdkLazyDropList.prototype.removeDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) {
            /** @type {?} */
            var result = this._draggablesSet.delete(drag);
            if (result) {
                this._draggables.reset(Array.from(this._draggablesSet.values()));
                this._draggables.notifyOnChanges(); // TODO: notify with asap schedular and obs$
            }
            return result;
        };
        /* protected */ /* protected */ /**
         * @return {?}
         */
        CdkLazyDropList.prototype.beforeStarted = /* protected */ /**
         * @return {?}
         */
        function () {
            // This is a workaround for https://github.com/angular/material2/pull/14153
            // Working around the missing capability for selecting a container element that is not the drop container host.
            if (!this.originalElement) {
                this.originalElement = this.element;
            }
            if (this.directContainerElement) {
                /** @type {?} */
                var element = (/** @type {?} */ (this.originalElement.nativeElement.querySelector(this.directContainerElement)));
                this.element = new core.ElementRef(element);
            }
            else {
                this.element = this.originalElement;
            }
            this.pblDropListRef.withElement(this.element);
        };
        CdkLazyDropList.decorators = [
            { type: core.Directive, args: [{
                        selector: '[cdkLazyDropList]',
                        exportAs: 'cdkLazyDropList',
                        providers: [
                            { provide: dragDrop.CDK_DROP_LIST, useClass: CdkLazyDropList },
                        ],
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                        }
                    },] }
        ];
        CdkLazyDropList.propDecorators = {
            directContainerElement: [{ type: core.Input, args: ['cdkDropListDirectContainerElement',] }]
        };
        return CdkLazyDropList;
    }(dragDrop.CdkDropList));
    if (false) {
        /**
         * Selector that will be used to determine the direct container element, starting from
         * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
         * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
         * of the draggable elements.
         * @type {?}
         */
        CdkLazyDropList.prototype.directContainerElement;
        /** @type {?} */
        CdkLazyDropList.prototype._draggables;
        /** @type {?} */
        CdkLazyDropList.prototype.originalElement;
        /** @type {?} */
        CdkLazyDropList.prototype._draggablesSet;
    }
    /**
     * @template T, Z, DRef
     */
    var CdkLazyDrag = /** @class */ (function (_super) {
        __extends(CdkLazyDrag, _super);
        function CdkLazyDrag() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /* private */ _this._hostNotRoot = false;
            return _this;
        }
        Object.defineProperty(CdkLazyDrag.prototype, "rootElementSelectorClass", {
            /**
             * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
             */
            set: /**
             * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _a, _b;
                if (value !== this._rootClass && this._hostNotRoot) {
                    if (this._rootClass) {
                        (_a = this.getRootElement().classList).remove.apply(_a, __spread(this._rootClass.split(' ')));
                    }
                    if (value) {
                        (_b = this.getRootElement().classList).add.apply(_b, __spread(value.split(' ')));
                    }
                }
                this._rootClass = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CdkLazyDrag.prototype, "pblDragRef", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dragRef)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CdkLazyDrag.prototype, "cdkDropList", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this.dropContainer)); },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
                if (this.cdkDropList) {
                    this.cdkDropList.removeDrag(this);
                }
                this.dropContainer = value;
                if (value) {
                    this._dragRef._withDropContainer(value._dropListRef);
                    value.addDrag(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        CdkLazyDrag.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.pblDragRef instanceof PblDragRef === false) {
                throw new Error('Invalid `DragRef` injection, the ref is not an instance of PblDragRef');
            }
            this.pblDragRef.rootElementChanged.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                var _a, _b;
                /** @type {?} */
                var rootElementSelectorClass = _this._rootClass;
                /** @type {?} */
                var hostNotRoot = _this.element.nativeElement !== event.curr;
                if (rootElementSelectorClass) {
                    if (_this._hostNotRoot) {
                        (_a = event.prev.classList).remove.apply(_a, __spread(rootElementSelectorClass.split(' ')));
                    }
                    if (hostNotRoot) {
                        (_b = event.curr.classList).add.apply(_b, __spread(rootElementSelectorClass.split(' ')));
                    }
                }
                _this._hostNotRoot = hostNotRoot;
            }));
        };
        // This is a workaround for https://github.com/angular/material2/pull/14158
        // Working around the issue of drop container is not the direct parent (father) of a drag item.
        // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
        // This is a workaround for https://github.com/angular/material2/pull/14158
        // Working around the issue of drop container is not the direct parent (father) of a drag item.
        // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
        /**
         * @return {?}
         */
        CdkLazyDrag.prototype.ngAfterViewInit = 
        // This is a workaround for https://github.com/angular/material2/pull/14158
        // Working around the issue of drop container is not the direct parent (father) of a drag item.
        // The entire ngAfterViewInit() overriding method can be removed if PR accepted.
        /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.started.subscribe((/**
             * @param {?} startedEvent
             * @return {?}
             */
            function (startedEvent) {
                if (_this.dropContainer) {
                    /** @type {?} */
                    var element_1 = _this.getRootElement();
                    /** @type {?} */
                    var initialRootElementParent_1 = (/** @type {?} */ (element_1.parentNode));
                    if (!element_1.nextSibling && initialRootElementParent_1 !== _this.dropContainer.element.nativeElement) {
                        _this.ended.pipe(operators.take(1)).subscribe((/**
                         * @param {?} endedEvent
                         * @return {?}
                         */
                        function (endedEvent) { return initialRootElementParent_1.appendChild(element_1); }));
                    }
                }
            }));
            /* super.ngAfterViewInit(); */
        };
        /**
         * @return {?}
         */
        CdkLazyDrag.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this.cdkDropList) {
                this.cdkDropList.removeDrag(this);
            }
            /* super.ngOnDestroy(); */
        };
        CdkLazyDrag.decorators = [
            { type: core.Directive, args: [{
                        selector: '[cdkLazyDrag]',
                        exportAs: 'cdkLazyDrag',
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drag',
                            '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                        },
                    },] }
        ];
        CdkLazyDrag.propDecorators = {
            rootElementSelectorClass: [{ type: core.Input, args: ['cdkDragRootElementClass',] }],
            cdkDropList: [{ type: core.Input }]
        };
        return CdkLazyDrag;
    }(dragDrop.CdkDrag));
    if (false) {
        /** @type {?} */
        CdkLazyDrag.prototype._rootClass;
        /** @type {?} */
        CdkLazyDrag.prototype._hostNotRoot;
    }
    /**
     * Handle that can be used to drag and CdkDrag instance.
     */
    var PblDragHandle = /** @class */ (function (_super) {
        __extends(PblDragHandle, _super);
        function PblDragHandle(element, parentDrag) {
            var _this = _super.call(this, element, parentDrag) || this;
            _this.element = element;
            return _this;
        }
        PblDragHandle.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblDragHandle]',
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drag-handle'
                        },
                        providers: [
                            {
                                provide: dragDrop.CdkDragHandle,
                                useExisting: PblDragHandle
                            }
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblDragHandle.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: dragDrop.CdkDrag, decorators: [{ type: core.Optional }] }
        ]; };
        return PblDragHandle;
    }(dragDrop.CdkDragHandle));
    if (false) {
        /** @type {?} */
        PblDragHandle.prototype.element;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var isMaterial7 = dragDrop.CdkDropList.length === 7;
    /**
     * @param {?} element
     * @param {?} dragDrop
     * @param {?} changeDetectorRef
     * @param {?=} dir
     * @param {?=} group
     * @param {?=} dragDropRegistry
     * @param {?=} document
     * @return {?}
     */
    function cdkDropList(element, dragDrop, changeDetectorRef, dir, group, 
    // for v7 compat
    dragDropRegistry, document) {
        return isMaterial7
            ? (/** @type {?} */ ([element, (/** @type {?} */ (dragDropRegistry)), changeDetectorRef, dir, group, document, dragDrop]))
            : [element, dragDrop, changeDetectorRef, dir, group];
    }
    /**
     * @param {?} element
     * @param {?} dropContainer
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} config
     * @param {?} _dir
     * @param {?} dragDrop
     * @param {?} _changeDetectorRef
     * @param {?} viewportRuler
     * @param {?=} dragDropRegistry
     * @return {?}
     */
    function cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, 
    // for v7 compat
    viewportRuler, dragDropRegistry) {
        return isMaterial7
            ? (/** @type {?} */ ([element, dropContainer, _document, _ngZone, _viewContainerRef, viewportRuler, dragDropRegistry, config, _dir, dragDrop]))
            : [element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef];
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY = 'rowReorder';
    /** @type {?} */
    var _uniqueIdCounter = 0;
    var ɵ0 = undefined;
    /**
     * @template T
     */
    var PblNgridRowReorderPluginDirective = /** @class */ (function (_super) {
        __extends(PblNgridRowReorderPluginDirective, _super);
        function PblNgridRowReorderPluginDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
        _document) {
            var _this = _super.apply(this, __spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
            _this.table = table;
            _this.id = "pbl-ngrid-row-reorder-list-" + _uniqueIdCounter++;
            _this._rowReorder = false;
            /* CdkLazyDropList start */
            /**
             * Selector that will be used to determine the direct container element, starting from
             * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
             * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
             * of the draggable elements.
             */
            _this.directContainerElement = '.pbl-ngrid-scroll-container'; // we need this to allow auto-scroll
            _this._draggablesSet = new Set();
            // super(element, dragDrop, changeDetectorRef, dir, group);
            _this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, _this);
            _this.dropped.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var item = (/** @type {?} */ (event.item));
                /** @type {?} */
                var previousIndex = table.ds.source.indexOf(item.draggedContext.row);
                /** @type {?} */
                var currentIndex = event.currentIndex + table.ds.renderStart;
                _this.table.contextApi.clear();
                _this.table.ds.moveItem(previousIndex, currentIndex, true);
                _this.table._cdkTable.syncRows('data');
            }));
            return _this;
        }
        PblNgridRowReorderPluginDirective_1 = PblNgridRowReorderPluginDirective;
        Object.defineProperty(PblNgridRowReorderPluginDirective.prototype, "rowReorder", {
            get: /**
             * @return {?}
             */
            function () { return this._rowReorder; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = coercion.coerceBooleanProperty(value);
                this._rowReorder = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridRowReorderPluginDirective.prototype, "pblDropListRef", {
            get: 
            // we need this to allow auto-scroll
            /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dropListRef)); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridRowReorderPluginDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { CdkLazyDropList.prototype.ngOnInit.call(this); };
        /**
         * @param {?} drag
         * @return {?}
         */
        PblNgridRowReorderPluginDirective.prototype.addDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) { return CdkLazyDropList.prototype.addDrag.call(this, drag); };
        /**
         * @param {?} drag
         * @return {?}
         */
        PblNgridRowReorderPluginDirective.prototype.removeDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) { return CdkLazyDropList.prototype.removeDrag.call(this, drag); };
        /**
         * @return {?}
         */
        PblNgridRowReorderPluginDirective.prototype.beforeStarted = /**
         * @return {?}
         */
        function () { CdkLazyDropList.prototype.beforeStarted.call(this); };
        /* CdkLazyDropList end */
        /* CdkLazyDropList end */
        /**
         * @return {?}
         */
        PblNgridRowReorderPluginDirective.prototype.ngOnDestroy = /* CdkLazyDropList end */
        /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this._removePlugin(this.table);
        };
        var PblNgridRowReorderPluginDirective_1;
        PblNgridRowReorderPluginDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'pbl-ngrid[rowReorder]',
                        exportAs: 'pblNgridRowReorder',
                        inputs: [
                            'directContainerElement:cdkDropListDirectContainerElement'
                        ],
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                            '[class.pbl-row-reorder]': 'rowReorder && !this.table.ds?.sort.sort?.order && !this.table.ds?.filter?.filter',
                        },
                        providers: [
                            { provide: dragDrop.CdkDropListGroup, useValue: ɵ0 },
                            { provide: dragDrop.CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective_1 },
                        ],
                    },] }
        ];
        /** @nocollapse */
        PblNgridRowReorderPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController },
            { type: core.ElementRef },
            { type: dragDrop.DragDrop },
            { type: core.ChangeDetectorRef },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: dragDrop.CdkDropListGroup, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: dragDrop.DragDropRegistry, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        PblNgridRowReorderPluginDirective.propDecorators = {
            rowReorder: [{ type: core.Input }]
        };
        /**
         * @template T
         */
        PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective_1 = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY }),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent,
                ngrid.PblNgridPluginController,
                core.ElementRef,
                dragDrop.DragDrop,
                core.ChangeDetectorRef,
                bidi.Directionality,
                dragDrop.CdkDropListGroup,
                dragDrop.DragDropRegistry, Object])
        ], PblNgridRowReorderPluginDirective);
        return PblNgridRowReorderPluginDirective;
    }(dragDrop.CdkDropList));
    if (false) {
        /** @type {?} */
        PblNgridRowReorderPluginDirective.prototype.id;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowReorderPluginDirective.prototype._rowReorder;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowReorderPluginDirective.prototype._removePlugin;
        /**
         * Selector that will be used to determine the direct container element, starting from
         * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
         * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
         * of the draggable elements.
         * @type {?}
         */
        PblNgridRowReorderPluginDirective.prototype.directContainerElement;
        /** @type {?} */
        PblNgridRowReorderPluginDirective.prototype.originalElement;
        /** @type {?} */
        PblNgridRowReorderPluginDirective.prototype._draggablesSet;
        /** @type {?} */
        PblNgridRowReorderPluginDirective.prototype.table;
        /* Skipping unhandled member: ;*/
    }
    /**
     * @template T
     */
    var PblNgridRowDragDirective = /** @class */ (function (_super) {
        __extends(PblNgridRowDragDirective, _super);
        // CTOR IS REQUIRED OR IT WONT WORK IN AOT
        // TODO: Try to remove when supporting IVY
        function PblNgridRowDragDirective(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
        dragDropRegistry) {
            var _this = _super.apply(this, __spread(cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry))) || this;
            _this.rootElementSelector = 'pbl-ngrid-row';
            _this._hostNotRoot = false;
            // super(
            //   element,
            //   dropContainer,
            //   _document,
            //   _ngZone,
            //   _viewContainerRef,
            //   config,
            //   _dir,
            //   dragDrop,
            //   _changeDetectorRef,
            // );
            _this.started.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                var _a = _this._context, col = _a.col, row = _a.row, table = _a.table, value = _a.value;
                _this._draggedContext = { col: col, row: row, table: table, value: value };
            }));
            return _this;
        }
        Object.defineProperty(PblNgridRowDragDirective.prototype, "context", {
            get: /**
             * @return {?}
             */
            function () {
                return this._context;
            },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._context = value;
                /** @type {?} */
                var pluginCtrl = this.pluginCtrl = value && ngrid.PblNgridPluginController.find(value.table);
                /** @type {?} */
                var plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY);
                this.cdkDropList = plugin || undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridRowDragDirective.prototype, "draggedContext", {
            /**
             * Reference to the last dragged context.
             *
             * This context is not similar to the `context` property.
             * The `context` property holds the current context which is shared and updated on scroll so if a user start a drag and then scrolled
             * the context will point to the row in view and not the original cell.
             */
            get: /**
             * Reference to the last dragged context.
             *
             * This context is not similar to the `context` property.
             * The `context` property holds the current context which is shared and updated on scroll so if a user start a drag and then scrolled
             * the context will point to the row in view and not the original cell.
             * @return {?}
             */
            function () {
                return this._draggedContext;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridRowDragDirective.prototype, "rootElementSelectorClass", {
            /* CdkLazyDrag start */
            /**
           * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
           */
            set: /* CdkLazyDrag start */
            /**
             * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _a, _b;
                if (value !== this._rootClass && this._hostNotRoot) {
                    if (this._rootClass) {
                        (_a = this.getRootElement().classList).remove.apply(_a, __spread(this._rootClass.split(' ')));
                    }
                    if (value) {
                        (_b = this.getRootElement().classList).add.apply(_b, __spread(value.split(' ')));
                    }
                }
                this._rootClass = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridRowDragDirective.prototype, "pblDragRef", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dragRef)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridRowDragDirective.prototype, "cdkDropList", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this.dropContainer)); },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
                if (this.cdkDropList) {
                    this.cdkDropList.removeDrag(this);
                }
                this.dropContainer = value;
                if (value) {
                    this._dragRef._withDropContainer(value._dropListRef);
                    value.addDrag(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridRowDragDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { CdkLazyDrag.prototype.ngOnInit.call(this); };
        /**
         * @return {?}
         */
        PblNgridRowDragDirective.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () { CdkLazyDrag.prototype.ngAfterViewInit.call(this); _super.prototype.ngAfterViewInit.call(this); };
        /**
         * @return {?}
         */
        PblNgridRowDragDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () { CdkLazyDrag.prototype.ngOnDestroy.call(this); _super.prototype.ngOnDestroy.call(this); };
        PblNgridRowDragDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridRowDrag]',
                        exportAs: 'pblNgridRowDrag',
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drag',
                            '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                        },
                        providers: [
                            { provide: dragDrop.CdkDrag, useExisting: PblNgridRowDragDirective }
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblNgridRowDragDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: dragDrop.CdkDropList, decorators: [{ type: core.Inject, args: [dragDrop.CDK_DROP_LIST,] }, { type: core.Optional }, { type: core.SkipSelf }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.NgZone },
            { type: core.ViewContainerRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [dragDrop.CDK_DRAG_CONFIG,] }] },
            { type: bidi.Directionality },
            { type: dragDrop.DragDrop },
            { type: core.ChangeDetectorRef },
            { type: scrolling.ViewportRuler, decorators: [{ type: core.Optional }] },
            { type: dragDrop.DragDropRegistry, decorators: [{ type: core.Optional }] }
        ]; };
        PblNgridRowDragDirective.propDecorators = {
            context: [{ type: core.Input, args: ['pblNgridRowDrag',] }],
            rootElementSelectorClass: [{ type: core.Input, args: ['cdkDragRootElementClass',] }],
            cdkDropList: [{ type: core.Input }]
        };
        return PblNgridRowDragDirective;
    }(dragDrop.CdkDrag));
    if (false) {
        /** @type {?} */
        PblNgridRowDragDirective.prototype.rootElementSelector;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowDragDirective.prototype._context;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowDragDirective.prototype._draggedContext;
        /**
         * @type {?}
         * @private
         */
        PblNgridRowDragDirective.prototype.pluginCtrl;
        /** @type {?} */
        PblNgridRowDragDirective.prototype._rootClass;
        /** @type {?} */
        PblNgridRowDragDirective.prototype._hostNotRoot;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Default configuration to be used when creating a `DragRef`.
     * @type {?}
     */
    var DEFAULT_CONFIG = {
        dragStartThreshold: 5,
        pointerDirectionChangeThreshold: 5
    };
    /**
     * Service that allows for drag-and-drop functionality to be attached to DOM elements.
     */
    var PblDragDrop = /** @class */ (function () {
        function PblDragDrop(_document, _ngZone, _viewportRuler, _dragDropRegistry) {
            this._document = _document;
            this._ngZone = _ngZone;
            this._viewportRuler = _viewportRuler;
            this._dragDropRegistry = _dragDropRegistry;
        }
        /**
         * Turns an element into a draggable item.
         * @param element Element to which to attach the dragging functionality.
         * @param config Object used to configure the dragging behavior.
         */
        /**
         * Turns an element into a draggable item.
         * @template T
         * @param {?} element Element to which to attach the dragging functionality.
         * @param {?=} config Object used to configure the dragging behavior.
         * @return {?}
         */
        PblDragDrop.prototype.createDrag = /**
         * Turns an element into a draggable item.
         * @template T
         * @param {?} element Element to which to attach the dragging functionality.
         * @param {?=} config Object used to configure the dragging behavior.
         * @return {?}
         */
        function (element, config) {
            if (config === void 0) { config = DEFAULT_CONFIG; }
            return new PblDragRef(element, config, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry);
        };
        /**
         * Turns an element into a drop list.
         * @param element Element to which to attach the drop list functionality.
         */
        /**
         * Turns an element into a drop list.
         * @template T
         * @param {?} element Element to which to attach the drop list functionality.
         * @return {?}
         */
        PblDragDrop.prototype.createDropList = /**
         * Turns an element into a drop list.
         * @template T
         * @param {?} element Element to which to attach the drop list functionality.
         * @return {?}
         */
        function (element) {
            return new PblDropListRef(element, this._dragDropRegistry, this._document);
        };
        PblDragDrop.decorators = [
            { type: core.Injectable, args: [{ providedIn: 'root' },] }
        ];
        /** @nocollapse */
        PblDragDrop.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.NgZone },
            { type: scrolling.ViewportRuler },
            { type: dragDrop.DragDropRegistry }
        ]; };
        /** @nocollapse */ PblDragDrop.ngInjectableDef = core.ɵɵdefineInjectable({ factory: function PblDragDrop_Factory() { return new PblDragDrop(core.ɵɵinject(common.DOCUMENT), core.ɵɵinject(core.NgZone), core.ɵɵinject(scrolling.ViewportRuler), core.ɵɵinject(dragDrop.DragDropRegistry)); }, token: PblDragDrop, providedIn: "root" });
        return PblDragDrop;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        PblDragDrop.prototype._document;
        /**
         * @type {?}
         * @private
         */
        PblDragDrop.prototype._ngZone;
        /**
         * @type {?}
         * @private
         */
        PblDragDrop.prototype._viewportRuler;
        /**
         * @type {?}
         * @private
         */
        PblDragDrop.prototype._dragDropRegistry;
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
     * @this {?}
     * @param {?} column
     * @return {?}
     */
    function checkGroupLockConstraint(column) {
        var e_1, _a;
        try {
            for (var _b = __values(this.groups), _c = _b.next(); !_c.done; _c = _b.next()) {
                var id = _c.value;
                /** @type {?} */
                var g = this.groupStore.find(id);
                if (g && g.lockColumns && !column.isInGroup(g)) {
                    return false;
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
        return true;
    }
    /**
     * @return {?}
     */
    function extendGrid() {
        ngrid.PblColumn.extendProperty('reorder');
        ngrid.PblColumn.extendProperty('wontBudge');
        ngrid.PblColumnGroup.extendProperty('lockColumns');
        ngrid.PblColumn.prototype.checkGroupLockConstraint = (/**
         * @this {?}
         * @param {?} column
         * @return {?}
         */
        function (column) {
            return checkGroupLockConstraint.call(this, column) && checkGroupLockConstraint.call(column, this);
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY$1 = 'columnReorder';
    /** @type {?} */
    var _uniqueIdCounter$1 = 0;
    /**
     * @template T
     */
    var PblNgridColumnReorderPluginDirective = /** @class */ (function (_super) {
        __extends(PblNgridColumnReorderPluginDirective, _super);
        function PblNgridColumnReorderPluginDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
        _document) {
            var _this = _super.apply(this, __spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
            _this.table = table;
            _this.id = "pbl-ngrid-column-reorder-list-" + _uniqueIdCounter$1++;
            _this.orientation = 'horizontal';
            _this.dragging = new rxjs.BehaviorSubject(false);
            _this._columnReorder = false;
            _this._manualOverride = false;
            _this._draggablesSet = new Set();
            // super(element, dragDrop, changeDetectorRef, dir, group);
            _this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY$1, _this);
            _this.directContainerElement = '.pbl-ngrid-header-row-main';
            _this.dropped.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (!_this.manualOverride) {
                    _this.table.columnApi.moveColumn(((/** @type {?} */ (event.item))).column, event.currentIndex);
                }
            }));
            _this.dragging.subscribe((/**
             * @param {?} isDragging
             * @return {?}
             */
            function (isDragging) {
                /** @type {?} */
                var el = element.nativeElement;
                if (isDragging) {
                    el.classList.add('pbl-ngrid-column-list-dragging');
                }
                else {
                    el.classList.remove('pbl-ngrid-column-list-dragging');
                }
                _this.lastSwap = undefined;
            }));
            _this.monkeyPatchDropListRef();
            return _this;
        }
        PblNgridColumnReorderPluginDirective_1 = PblNgridColumnReorderPluginDirective;
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "columnReorder", {
            get: /**
             * @return {?}
             */
            function () { return this._columnReorder; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                value = coercion.coerceBooleanProperty(value);
                this._columnReorder = value;
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "manualOverride", {
            /**
             * When true, will not move the column on drop.
             * Instead you need to handle the dropped event.
             */
            get: /**
             * When true, will not move the column on drop.
             * Instead you need to handle the dropped event.
             * @return {?}
             */
            function () { return this._manualOverride; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) { this._manualOverride = coercion.coerceBooleanProperty(value); },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "pblGetItemIndexFromPointerPosition", {
            // Stuff to workaround encapsulation in CdkDropList
            get: 
            // Stuff to workaround encapsulation in CdkDropList
            /**
             * @private
             * @return {?}
             */
            function () {
                return ((/** @type {?} */ (this._dropListRef)))._getItemIndexFromPointerPosition.bind(this._dropListRef);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "pblGetPositionCacheItems", {
            get: /**
             * @private
             * @return {?}
             */
            function () {
                return ((/** @type {?} */ (this._dropListRef)))._itemPositions;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnReorderPluginDirective.prototype, "pblDropListRef", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dropListRef)); },
            enumerable: true,
            configurable: true
        });
        // ngOnInit(): void { CdkLazyDropList.prototype.ngOnInit.call(this); }
        // ngOnInit(): void { CdkLazyDropList.prototype.ngOnInit.call(this); }
        /**
         * @param {?} drag
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.addDrag = 
        // ngOnInit(): void { CdkLazyDropList.prototype.ngOnInit.call(this); }
        /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) { return CdkLazyDropList.prototype.addDrag.call(this, drag); };
        /**
         * @param {?} drag
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.removeDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) { return CdkLazyDropList.prototype.removeDrag.call(this, drag); };
        // beforeStarted(): void { CdkLazyDropList.prototype.beforeStarted.call(this); }
        /* CdkLazyDropList end */
        // beforeStarted(): void { CdkLazyDropList.prototype.beforeStarted.call(this); }
        /* CdkLazyDropList end */
        /**
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.ngOnInit = 
        // beforeStarted(): void { CdkLazyDropList.prototype.beforeStarted.call(this); }
        /* CdkLazyDropList end */
        /**
         * @return {?}
         */
        function () {
            var _this = this;
            CdkLazyDropList.prototype.ngOnInit.call(this); // super.ngOnInit();
            this.dropped.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this._pblReset(); }));
            this.pblDropListRef.beforeExit.subscribe((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this._pblReset(); }));
        };
        /**
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            _super.prototype.ngOnDestroy.call(this);
            this._removePlugin(this.table);
        };
        /* protected */ /* protected */ /**
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.beforeStarted = /* protected */ /**
         * @return {?}
         */
        function () {
            CdkLazyDropList.prototype.beforeStarted.call(this); // super.beforeStarted();
            this.lastSorted = undefined;
            this.dragging.next(true);
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype._pblReset = /**
         * @private
         * @return {?}
         */
        function () {
            this.dragging.next(false);
            /** @type {?} */
            var siblings = this.pblGetPositionCacheItems;
            siblings.forEach((/**
             * @param {?} sibling
             * @param {?} index
             * @return {?}
             */
            function (sibling, index) {
                var e_1, _a;
                try {
                    for (var _b = __values(sibling.drag.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.style.transform = "";
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.monkeyPatchDropListRef = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            var _a = this._dropListRef, _sortItem = _a._sortItem, enter = _a.enter;
            this.pblDropListRef.enter = (/**
             * @param {?} item
             * @param {?} pointerX
             * @param {?} pointerY
             * @return {?}
             */
            function (item, pointerX, pointerY) {
                /** @type {?} */
                var lastSorted = _this.lastSorted;
                _this.lastSorted = undefined;
                if (lastSorted && lastSorted.drag === item) {
                    /** @type {?} */
                    var isHorizontal = _this.orientation === 'horizontal';
                    pointerX = lastSorted.clientRect.left + 1 - (isHorizontal ? lastSorted.offset : 0);
                    pointerY = lastSorted.clientRect.top + 1 - (!isHorizontal ? lastSorted.offset : 0);
                }
                enter.call(_this._dropListRef, item, pointerX, pointerY);
            });
            this.pblDropListRef._sortItem = (/**
             * @param {?} item
             * @param {?} pointerX
             * @param {?} pointerY
             * @param {?} pointerDelta
             * @return {?}
             */
            function (item, pointerX, pointerY, pointerDelta) {
                var e_2, _a;
                /** @type {?} */
                var siblings = _this.pblGetPositionCacheItems;
                _this.lastSorted = siblings.find((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) { return s.drag === item; }));
                /** @type {?} */
                var newIndex = _this.pblGetItemIndexFromPointerPosition((/** @type {?} */ (item)), pointerX, pointerY, pointerDelta);
                if (newIndex === -1 && siblings.length > 0) {
                    return;
                }
                /** @type {?} */
                var oldOrder = siblings.slice();
                /** @type {?} */
                var isHorizontal = _this.orientation === 'horizontal';
                /** @type {?} */
                var siblingAtNewPosition = siblings[newIndex];
                if (siblingAtNewPosition.drag.data.column.wontBudge) {
                    return;
                }
                // we now need to find if between current and new position there are items with `wontBudge`
                /** @type {?} */
                var itemAtOriginalPosition = _this.lastSwap ? _this.lastSwap : item;
                /** @type {?} */
                var currentIndex = siblings.findIndex((/**
                 * @param {?} currentItem
                 * @return {?}
                 */
                function (currentItem) { return currentItem.drag === itemAtOriginalPosition; }));
                /** @type {?} */
                var start = Math.min(newIndex, currentIndex);
                /** @type {?} */
                var itemsDraggedOver = siblings.slice(start, Math.abs(newIndex - currentIndex) + start);
                try {
                    for (var itemsDraggedOver_1 = __values(itemsDraggedOver), itemsDraggedOver_1_1 = itemsDraggedOver_1.next(); !itemsDraggedOver_1_1.done; itemsDraggedOver_1_1 = itemsDraggedOver_1.next()) {
                        var dragItem = itemsDraggedOver_1_1.value;
                        if (dragItem.drag.data.column.wontBudge && dragItem.drag !== item) {
                            return;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (itemsDraggedOver_1_1 && !itemsDraggedOver_1_1.done && (_a = itemsDraggedOver_1.return)) _a.call(itemsDraggedOver_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                // check if we move the item outside of locked group OR into a locked group... both are invalid.
                if (!item.data.column.checkGroupLockConstraint(siblingAtNewPosition.drag.data.column)) {
                    return;
                }
                _sortItem.call(_this._dropListRef, item, pointerX, pointerY, pointerDelta);
                _this.lastSwap = siblingAtNewPosition.drag;
                if (isHorizontal) {
                    siblings.forEach((/**
                     * @param {?} sibling
                     * @param {?} index
                     * @return {?}
                     */
                    function (sibling, index) {
                        var e_3, _a;
                        // Don't do anything if the position hasn't changed.
                        if (oldOrder[index] === sibling) {
                            return;
                        }
                        try {
                            for (var _b = __values(sibling.drag.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var c = _c.value;
                                c.style.transform = "translate3d(" + sibling.offset + "px, 0, 0)";
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }));
                }
            });
        };
        var PblNgridColumnReorderPluginDirective_1;
        PblNgridColumnReorderPluginDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: 'pbl-ngrid[columnReorder]',
                        exportAs: 'pblNgridColumnReorder',
                        inputs: [
                            'directContainerElement:cdkDropListDirectContainerElement'
                        ],
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                            '[class.cdk-drop-list-dragging]': '_dropListRef.isDragging()',
                            '[class.cdk-drop-list-receiving]': '_dropListRef.isReceiving()',
                        },
                        providers: [
                            { provide: dragDrop.CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective_1 },
                        ],
                    },] }
        ];
        /** @nocollapse */
        PblNgridColumnReorderPluginDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController },
            { type: core.ElementRef },
            { type: dragDrop.DragDrop },
            { type: core.ChangeDetectorRef },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: dragDrop.CdkDropListGroup, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: dragDrop.DragDropRegistry, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        PblNgridColumnReorderPluginDirective.propDecorators = {
            columnReorder: [{ type: core.Input }],
            manualOverride: [{ type: core.Input }],
            dragging: [{ type: core.Output, args: ['cdkDropDragging',] }]
        };
        /**
         * @template T
         */
        PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective_1 = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY$1, runOnce: extendGrid }),
            __metadata("design:paramtypes", [ngrid.PblNgridComponent,
                ngrid.PblNgridPluginController,
                core.ElementRef,
                dragDrop.DragDrop,
                core.ChangeDetectorRef,
                bidi.Directionality,
                dragDrop.CdkDropListGroup,
                dragDrop.DragDropRegistry, Object])
        ], PblNgridColumnReorderPluginDirective);
        return PblNgridColumnReorderPluginDirective;
    }(dragDrop.CdkDropList));
    if (false) {
        /** @type {?} */
        PblNgridColumnReorderPluginDirective.prototype.id;
        /** @type {?} */
        PblNgridColumnReorderPluginDirective.prototype.orientation;
        /** @type {?} */
        PblNgridColumnReorderPluginDirective.prototype.dragging;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnReorderPluginDirective.prototype._columnReorder;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnReorderPluginDirective.prototype._manualOverride;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnReorderPluginDirective.prototype._removePlugin;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnReorderPluginDirective.prototype.lastSwap;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnReorderPluginDirective.prototype.lastSorted;
        /**
         * Selector that will be used to determine the direct container element, starting from
         * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
         * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
         * of the draggable elements.
         * @type {?}
         */
        PblNgridColumnReorderPluginDirective.prototype.directContainerElement;
        /** @type {?} */
        PblNgridColumnReorderPluginDirective.prototype.originalElement;
        /** @type {?} */
        PblNgridColumnReorderPluginDirective.prototype._draggablesSet;
        /** @type {?} */
        PblNgridColumnReorderPluginDirective.prototype.table;
        /* Skipping unhandled member: ;*/
        /* Skipping unhandled member: ;*/
    }
    /**
     * @template T
     */
    var PblNgridColumnDragDirective = /** @class */ (function (_super) {
        __extends(PblNgridColumnDragDirective, _super);
        // CTOR IS REQUIRED OR IT WONT WORK IN AOT
        // TODO: Try to remove when supporting IVY
        function PblNgridColumnDragDirective(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
        dragDropRegistry) {
            var _this = _super.apply(this, __spread(cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry))) || this;
            _this.rootElementSelector = 'pbl-ngrid-header-cell';
            _this._hostNotRoot = false;
            return _this;
            // super(
            //   element,
            //   dropContainer,
            //   _document,
            //   _ngZone,
            //   _viewContainerRef,
            //   config,
            //   _dir,
            //   dragDrop,
            //   _changeDetectorRef,
            // );
        }
        Object.defineProperty(PblNgridColumnDragDirective.prototype, "context", {
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                this._context = value;
                this.column = value && value.col;
                /** @type {?} */
                var pluginCtrl = this.pluginCtrl = value && ngrid.PblNgridPluginController.find(value.table);
                /** @type {?} */
                var plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY$1);
                this.cdkDropList = plugin || undefined;
                this.disabled = this.column && this.column.reorder ? false : true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnDragDirective.prototype, "rootElementSelectorClass", {
            /* CdkLazyDrag start */
            /**
             * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
             */
            set: /* CdkLazyDrag start */
            /**
             * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
             * @param {?} value
             * @return {?}
             */
            function (value) {
                var _a, _b;
                if (value !== this._rootClass && this._hostNotRoot) {
                    if (this._rootClass) {
                        (_a = this.getRootElement().classList).remove.apply(_a, __spread(this._rootClass.split(' ')));
                    }
                    if (value) {
                        (_b = this.getRootElement().classList).add.apply(_b, __spread(value.split(' ')));
                    }
                }
                this._rootClass = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnDragDirective.prototype, "pblDragRef", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dragRef)); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PblNgridColumnDragDirective.prototype, "cdkDropList", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this.dropContainer)); },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
                if (this.cdkDropList) {
                    this.cdkDropList.removeDrag(this);
                }
                this.dropContainer = value;
                if (value) {
                    this._dragRef._withDropContainer(value._dropListRef);
                    value.addDrag(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridColumnDragDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { CdkLazyDrag.prototype.ngOnInit.call(this); };
        // ngAfterViewInit(): void { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
        // ngAfterViewInit(): void { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
        /**
         * @return {?}
         */
        PblNgridColumnDragDirective.prototype.ngOnDestroy = 
        // ngAfterViewInit(): void { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
        /**
         * @return {?}
         */
        function () { CdkLazyDrag.prototype.ngOnDestroy.call(this); _super.prototype.ngOnDestroy.call(this); };
        /* CdkLazyDrag end */
        /* CdkLazyDrag end */
        /**
         * @return {?}
         */
        PblNgridColumnDragDirective.prototype.ngAfterViewInit = /* CdkLazyDrag end */
        /**
         * @return {?}
         */
        function () {
            var _this = this;
            CdkLazyDrag.prototype.ngAfterViewInit.call(this);
            _super.prototype.ngAfterViewInit.call(this);
            this._dragRef.beforeStarted.subscribe((/**
             * @return {?}
             */
            function () {
                var cdkDropList = _this.cdkDropList;
                if (cdkDropList && cdkDropList.columnReorder && _this._context.col.reorder) {
                    // we don't allow a new dragging session before the previous ends.
                    // this sound impossible, but due to animation transitions its actually is.
                    // if the `transitionend` is long enough, a new drag can start...
                    //
                    // the `disabled` state is checked by pointerDown AFTER calling before start so we can cancel the start...
                    if (cdkDropList._dropListRef.isDragging()) {
                        return _this.disabled = true;
                    }
                }
            }));
            this.started.subscribe((/**
             * @return {?}
             */
            function () { return _this._context.col.columnDef.isDragging = true; }));
            this.ended.subscribe((/**
             * @return {?}
             */
            function () { return _this._context.col.columnDef.isDragging = false; }));
        };
        /**
         * @return {?}
         */
        PblNgridColumnDragDirective.prototype.getCells = /**
         * @return {?}
         */
        function () {
            if (!this.cache) {
                this.cache = this._context.col.columnDef.queryCellElements('table');
            }
            return this.cache;
        };
        /**
         * @return {?}
         */
        PblNgridColumnDragDirective.prototype.reset = /**
         * @return {?}
         */
        function () {
            var e_4, _a;
            _super.prototype.reset.call(this);
            if (this.cache) {
                try {
                    for (var _b = __values(this.cache), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var el = _c.value;
                        el.style.transform = "";
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                this.cache = undefined;
            }
        };
        PblNgridColumnDragDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblNgridColumnDrag]',
                        exportAs: 'pblNgridColumnDrag',
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drag',
                            '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                        },
                        providers: [
                            { provide: dragDrop.CdkDrag, useExisting: PblNgridColumnDragDirective }
                        ]
                    },] }
        ];
        /** @nocollapse */
        PblNgridColumnDragDirective.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: dragDrop.CdkDropList, decorators: [{ type: core.Inject, args: [dragDrop.CDK_DROP_LIST,] }, { type: core.Optional }, { type: core.SkipSelf }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
            { type: core.NgZone },
            { type: core.ViewContainerRef },
            { type: undefined, decorators: [{ type: core.Inject, args: [dragDrop.CDK_DRAG_CONFIG,] }] },
            { type: bidi.Directionality },
            { type: dragDrop.DragDrop },
            { type: core.ChangeDetectorRef },
            { type: scrolling.ViewportRuler, decorators: [{ type: core.Optional }] },
            { type: dragDrop.DragDropRegistry, decorators: [{ type: core.Optional }] }
        ]; };
        PblNgridColumnDragDirective.propDecorators = {
            context: [{ type: core.Input, args: ['pblNgridColumnDrag',] }],
            rootElementSelectorClass: [{ type: core.Input, args: ['cdkDragRootElementClass',] }],
            cdkDropList: [{ type: core.Input }]
        };
        return PblNgridColumnDragDirective;
    }(dragDrop.CdkDrag));
    if (false) {
        /** @type {?} */
        PblNgridColumnDragDirective.prototype.rootElementSelector;
        /** @type {?} */
        PblNgridColumnDragDirective.prototype.column;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnDragDirective.prototype._context;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnDragDirective.prototype.pluginCtrl;
        /**
         * @type {?}
         * @private
         */
        PblNgridColumnDragDirective.prototype.cache;
        /** @type {?} */
        PblNgridColumnDragDirective.prototype._rootClass;
        /** @type {?} */
        PblNgridColumnDragDirective.prototype._hostNotRoot;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Code from angular/material2 repository
     * File: https://github.com/angular/material2/blob/master/src/cdk/drag-drop/drag-styling.ts
     * Commit: https://github.com/angular/material2/blob/9cd3132607b4d5ae242291df41fb02dc7a453da8/src/cdk/drag-drop/drag-styling.ts
     *
     * This code is not public but required for the drag so duplicated here.
     **/
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Extended CSSStyleDeclaration that includes a couple of drag-related
     * properties that aren't in the built-in TS typings.
     * @record
     */
    function DragCSSStyleDeclaration() { }
    if (false) {
        /** @type {?} */
        DragCSSStyleDeclaration.prototype.webkitUserDrag;
        /** @type {?} */
        DragCSSStyleDeclaration.prototype.MozUserSelect;
    }
    /**
     * Shallow-extends a stylesheet object with another stylesheet object.
     * \@docs-private
     * @param {?} dest
     * @param {?} source
     * @return {?}
     */
    function extendStyles(dest, source) {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                dest[(/** @type {?} */ (key))] = source[(/** @type {?} */ (key))];
            }
        }
        return dest;
    }
    /**
     * Toggles whether the native drag interactions should be enabled for an element.
     * \@docs-private
     * @param {?} element Element on which to toggle the drag interactions.
     * @param {?} enable Whether the drag interactions should be enabled.
     * @return {?}
     */
    function toggleNativeDragInteractions(element, enable) {
        /** @type {?} */
        var userSelect = enable ? '' : 'none';
        extendStyles(element.style, {
            touchAction: enable ? '' : 'none',
            webkitUserDrag: enable ? '' : 'none',
            webkitTapHighlightColor: enable ? '' : 'transparent',
            userSelect: userSelect,
            msUserSelect: userSelect,
            webkitUserSelect: userSelect,
            MozUserSelect: userSelect
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function extendGrid$1() {
        ngrid.PblColumn.extendProperty('resize');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var PLUGIN_KEY$2 = 'columnResize';
    /**
     * Options that can be used to bind a passive event listener.
     * @type {?}
     */
    var passiveEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: true });
    /**
     * Options that can be used to bind an active event listener.
     * @type {?}
     */
    var activeEventListenerOptions = platform.normalizePassiveListenerOptions({ passive: false });
    var PblNgridDragResizeComponent = /** @class */ (function () {
        function PblNgridDragResizeComponent(element, _ngZone, _viewportRuler, _dragDropRegistry, _config, _dir) {
            var _this = this;
            this.element = element;
            this._ngZone = _ngZone;
            this._viewportRuler = _viewportRuler;
            this._dragDropRegistry = _dragDropRegistry;
            this._config = _config;
            this._dir = _dir;
            /**
             * The area (in pixels) in which the handle can be grabbed and resize the cell.
             * Default: 6
             */
            this.grabAreaWidth = 6;
            this._pointerMoveSubscription = rxjs.Subscription.EMPTY;
            this._pointerUpSubscription = rxjs.Subscription.EMPTY;
            this._rootElementInitSubscription = rxjs.Subscription.EMPTY;
            this._pointerDown = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                _this._initializeDragSequence(_this._rootElement, event);
            });
            /**
             * Handler that is invoked when the user moves their pointer after they've initiated a drag.
             */
            this._pointerMove = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                var e_1, _a;
                /** @type {?} */
                var pointerPosition = _this._getPointerPositionOnPage(event);
                /** @type {?} */
                var distanceX = pointerPosition.x - _this._pickupPositionOnPage.x;
                /** @type {?} */
                var distanceY = pointerPosition.y - _this._pickupPositionOnPage.y;
                if (!_this._hasStartedDragging) {
                    // Only start dragging after the user has moved more than the minimum distance in either
                    // direction. Note that this is preferable over doing something like `skip(minimumDistance)`
                    // in the `pointerMove` subscription, because we're not guaranteed to have one move event
                    // per pixel of movement (e.g. if the user moves their pointer quickly).
                    if (Math.abs(distanceX) + Math.abs(distanceY) >= _this._config.dragStartThreshold) {
                        _this._hasStartedDragging = true;
                        // It will be a good thing if we turned of the header's resize observer to boost performance
                        // However, because we relay on the total table minimum width updates to relatively even out the columns it will not work.
                        // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                        // This is because the max-width of the group is set proportional to the total min-width of the inner table.
                        // For it to work we need to directly update the width of ALL OF THE GROUPS.
                        // this.column.columnDef.isDragging = true;
                        _this.column.sizeInfo.updateSize();
                        _this._lastWidth = _this._initialWidth = _this.column.columnDef.netWidth;
                        _this.cache = _this.column.columnDef.queryCellElements('table', 'header', 'footer');
                    }
                    return;
                }
                _this._hasMoved = true;
                event.preventDefault();
                event.stopPropagation();
                /** @type {?} */
                var newWidth = Math.max(0, _this._initialWidth + distanceX);
                if (newWidth > _this.column.maxWidth) {
                    newWidth = _this.column.maxWidth;
                }
                else if (distanceX < 0 && newWidth < _this.column.minWidth) {
                    newWidth = _this.column.minWidth;
                }
                if (_this._lastWidth !== newWidth) {
                    _this._lastWidth = newWidth;
                    _this.column.width = newWidth + 'px';
                    _this.table.resetColumnsWidth();
                    try {
                        for (var _b = __values(_this.cache), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var el = _c.value;
                            _this.column.columnDef.applyWidth(el);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    // the above will change the size of on column AND because we didn't disable the resize observer it will pop an event.
                    // if there are groups it will fire table.resizeColumns(); which will recalculate the groups...
                }
            });
            /**
             * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
             */
            this._pointerUp = (/**
             * @return {?}
             */
            function () {
                if (!_this._isDragging()) {
                    return;
                }
                _this._removeSubscriptions();
                _this._dragDropRegistry.stopDragging(_this);
                if (!_this._hasStartedDragging) {
                    return;
                }
                // this.column.columnDef.isDragging = false;
                _this.table.columnApi.resizeColumn(_this.column, _this._lastWidth + 'px');
                // cleanup
                _this.cache = undefined;
            });
            _dragDropRegistry.registerDragItem(this);
        }
        Object.defineProperty(PblNgridDragResizeComponent.prototype, "context", {
            // tslint:disable-next-line:no-input-rename
            set: 
            // tslint:disable-next-line:no-input-rename
            /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    var col = value.col, table = value.table;
                    if (col && col instanceof ngrid.PblColumn) {
                        this.column = col;
                        this.table = table;
                        return;
                    }
                }
                this.column = this.table = undefined;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            // We need to wait for the zone to stabilize, in order for the reference
            // element to be in the proper place in the DOM. This is mostly relevant
            // for draggable elements inside portals since they get stamped out in
            // their original DOM position and then they get transferred to the portal.
            this._rootElementInitSubscription = this._ngZone.onStable.asObservable().pipe(operators.take(1)).subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var rootElement = _this._rootElement = _this._getRootElement();
                /** @type {?} */
                var cell = rootElement.parentElement;
                cell.classList.add('pbl-ngrid-column-resize');
                rootElement.addEventListener('mousedown', _this._pointerDown, activeEventListenerOptions);
                rootElement.addEventListener('touchstart', _this._pointerDown, passiveEventListenerOptions);
                toggleNativeDragInteractions(rootElement, false);
            }));
        };
        /**
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            if (this._rootElement) {
                this._rootElement.removeEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
                this._rootElement.removeEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
            }
            this._rootElementInitSubscription.unsubscribe();
            this._dragDropRegistry.removeDragItem(this);
            this._removeSubscriptions();
        };
        /**
         * @param {?} event
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype.onDoubleClick = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.table.columnApi.autoSizeColumn(this.column);
        };
        /**
       * Sets up the different variables and subscriptions
       * that will be necessary for the dragging sequence.
       * @param referenceElement Element that started the drag sequence.
       * @param event Browser event object that started the sequence.
       */
        /**
         * Sets up the different variables and subscriptions
         * that will be necessary for the dragging sequence.
         * @private
         * @param {?} referenceElement Element that started the drag sequence.
         * @param {?} event Browser event object that started the sequence.
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype._initializeDragSequence = /**
         * Sets up the different variables and subscriptions
         * that will be necessary for the dragging sequence.
         * @private
         * @param {?} referenceElement Element that started the drag sequence.
         * @param {?} event Browser event object that started the sequence.
         * @return {?}
         */
        function (referenceElement, event) {
            // Always stop propagation for the event that initializes
            // the dragging sequence, in order to prevent it from potentially
            // starting another sequence for a draggable parent somewhere up the DOM tree.
            event.stopPropagation();
            // Abort if the user is already dragging or is using a mouse button other than the primary one.
            if (this._isDragging() || (!this._isTouchEvent(event) && event.button !== 0)) {
                return;
            }
            this._hasStartedDragging = this._hasMoved = false;
            this._pointerMoveSubscription = this._dragDropRegistry.pointerMove
                .pipe(operators.auditTime(0, rxjs.animationFrameScheduler))
                .subscribe(this._pointerMove);
            this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
            this._scrollPosition = this._viewportRuler.getViewportScrollPosition();
            this._pickupPositionOnPage = this._getPointerPositionOnPage(event);
            this._dragDropRegistry.startDragging(this, event);
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype._getPointerPositionOnPage = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var point = this._isTouchEvent(event) ? event.touches[0] : event;
            return {
                x: point.pageX - this._scrollPosition.left,
                y: point.pageY - this._scrollPosition.top
            };
        };
        /**
         * @private
         * @param {?} event
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype._isTouchEvent = /**
         * @private
         * @param {?} event
         * @return {?}
         */
        function (event) {
            return event.type.startsWith('touch');
        };
        /**
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype._isDragging = /**
         * @return {?}
         */
        function () {
            return this._dragDropRegistry.isDragging(this);
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype._getRootElement = /**
         * @private
         * @return {?}
         */
        function () {
            return this.element.nativeElement;
        };
        /**
         * @private
         * @return {?}
         */
        PblNgridDragResizeComponent.prototype._removeSubscriptions = /**
         * @private
         * @return {?}
         */
        function () {
            this._pointerMoveSubscription.unsubscribe();
            this._pointerUpSubscription.unsubscribe();
        };
        PblNgridDragResizeComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-drag-resize',
                        // tslint:disable-line:component-selector
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'pbl-ngrid-column-resizer',
                            '[style.width.px]': 'grabAreaWidth',
                        },
                        template: "<ng-content></ng-content>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".pbl-ngrid-column-resizer{position:absolute;right:0;height:100%;cursor:col-resize;z-index:50000}"]
                    }] }
        ];
        /** @nocollapse */
        PblNgridDragResizeComponent.ctorParameters = function () { return [
            { type: core.ElementRef },
            { type: core.NgZone },
            { type: scrolling.ViewportRuler },
            { type: dragDrop.DragDropRegistry },
            { type: undefined, decorators: [{ type: core.Inject, args: [dragDrop.CDK_DRAG_CONFIG,] }] },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] }
        ]; };
        PblNgridDragResizeComponent.propDecorators = {
            context: [{ type: core.Input }],
            grabAreaWidth: [{ type: core.Input }],
            onDoubleClick: [{ type: core.HostListener, args: ['dblclick', ['$event'],] }]
        };
        PblNgridDragResizeComponent = __decorate([
            ngrid.TablePlugin({ id: PLUGIN_KEY$2, runOnce: extendGrid$1 }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.NgZone,
                scrolling.ViewportRuler,
                dragDrop.DragDropRegistry, Object, bidi.Directionality])
        ], PblNgridDragResizeComponent);
        return PblNgridDragResizeComponent;
    }());
    if (false) {
        /**
         * The area (in pixels) in which the handle can be grabbed and resize the cell.
         * Default: 6
         * @type {?}
         */
        PblNgridDragResizeComponent.prototype.grabAreaWidth;
        /** @type {?} */
        PblNgridDragResizeComponent.prototype.column;
        /** @type {?} */
        PblNgridDragResizeComponent.prototype.table;
        /** @type {?} */
        PblNgridDragResizeComponent.prototype._hasStartedDragging;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._hasMoved;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._rootElement;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._pointerMoveSubscription;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._pointerUpSubscription;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._scrollPosition;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._pickupPositionOnPage;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._initialWidth;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._lastWidth;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype.cache;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._rootElementInitSubscription;
        /** @type {?} */
        PblNgridDragResizeComponent.prototype._pointerDown;
        /**
         * Handler that is invoked when the user moves their pointer after they've initiated a drag.
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._pointerMove;
        /**
         * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._pointerUp;
        /** @type {?} */
        PblNgridDragResizeComponent.prototype.element;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._ngZone;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._viewportRuler;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._dragDropRegistry;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._config;
        /**
         * @type {?}
         * @private
         */
        PblNgridDragResizeComponent.prototype._dir;
    }
    /**
     * @record
     */
    function Point() { }
    if (false) {
        /** @type {?} */
        Point.prototype.x;
        /** @type {?} */
        Point.prototype.y;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Marks the element as the resizer template for cells.
     */
    var PblNgridCellDraggerRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellDraggerRefDirective, _super);
        function PblNgridCellDraggerRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.name = 'cellDragger';
            _this.kind = 'dataHeaderExtensions';
            return _this;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        PblNgridCellDraggerRefDirective.prototype.shouldRender = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
            // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
            // I.E: It doesn't reorder but it's part of the playground.
            //
            // However, when the plugin does not exists for this table we don't need to render...
            // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
            // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
            // I.E: It doesn't reorder but it's part of the playground.
            //
            // However, when the plugin does not exists for this table we don't need to render...
            /** @type {?} */
            var pluginCtrl = ngrid.PblNgridPluginController.find(context.table);
            return pluginCtrl.hasPlugin(PLUGIN_KEY$1);
        };
        PblNgridCellDraggerRefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridCellDraggerRef]' },] }
        ];
        /** @nocollapse */
        PblNgridCellDraggerRefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: ngrid.PblNgridRegistryService }
        ]; };
        return PblNgridCellDraggerRefDirective;
    }(ngrid.PblNgridMultiTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridCellDraggerRefDirective.prototype.name;
        /** @type {?} */
        PblNgridCellDraggerRefDirective.prototype.kind;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var _uniqueIdCounter$2 = 0;
    /**
     * @template T
     */
    var PblNgridAggregationContainerDirective = /** @class */ (function (_super) {
        __extends(PblNgridAggregationContainerDirective, _super);
        function PblNgridAggregationContainerDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
        _document) {
            var _this = _super.apply(this, __spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
            _this.table = table;
            _this.id = "pbl-ngrid-column-aggregation-container-" + _uniqueIdCounter$2++;
            _this.orientation = 'horizontal';
            _this._draggablesSet = new Set();
            // super(element, dragDrop, changeDetectorRef, dir, group);
            /** @type {?} */
            var reorder = pluginCtrl.getPlugin('columnReorder');
            reorder.connectedTo = _this.id;
            _this.pblDropListRef.dropped
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var item = (/** @type {?} */ (event.item));
                _this.pending = undefined;
                _this.table.columnApi.addGroupBy(item.data.column);
            }));
            _this.pblDropListRef.entered
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                var e_1, _a;
                /** @type {?} */
                var item = (/** @type {?} */ (event.item));
                _this.pending = item.data.column;
                item.getPlaceholderElement().style.display = 'none';
                try {
                    for (var _b = __values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.style.display = 'none';
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }));
            _this.pblDropListRef.exited
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                var e_2, _a;
                /** @type {?} */
                var item = (/** @type {?} */ (event.item));
                _this.pending = undefined;
                item.getPlaceholderElement().style.display = '';
                try {
                    for (var _b = __values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var c = _c.value;
                        c.style.display = '';
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }));
            return _this;
        }
        Object.defineProperty(PblNgridAggregationContainerDirective.prototype, "pblDropListRef", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._dropListRef)); },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        PblNgridAggregationContainerDirective.prototype.ngOnInit = /**
         * @return {?}
         */
        function () { CdkLazyDropList.prototype.ngOnInit.call(this); };
        /**
         * @param {?} drag
         * @return {?}
         */
        PblNgridAggregationContainerDirective.prototype.addDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) { return CdkLazyDropList.prototype.addDrag.call(this, drag); };
        /**
         * @param {?} drag
         * @return {?}
         */
        PblNgridAggregationContainerDirective.prototype.removeDrag = /**
         * @param {?} drag
         * @return {?}
         */
        function (drag) { return CdkLazyDropList.prototype.removeDrag.call(this, drag); };
        /**
         * @return {?}
         */
        PblNgridAggregationContainerDirective.prototype.beforeStarted = /**
         * @return {?}
         */
        function () { CdkLazyDropList.prototype.beforeStarted.call(this); };
        PblNgridAggregationContainerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[pblAggregationContainer]',
                        exportAs: 'pblAggregationContainer',
                        inputs: [
                            'directContainerElement:cdkDropListDirectContainerElement'
                        ],
                        host: {
                            // tslint:disable-line:use-host-property-decorator
                            'class': 'cdk-drop-list',
                            '[id]': 'id',
                        },
                        providers: [
                            { provide: dragDrop.CDK_DROP_LIST, useExisting: PblNgridAggregationContainerDirective },
                        ],
                    },] }
        ];
        /** @nocollapse */
        PblNgridAggregationContainerDirective.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent },
            { type: ngrid.PblNgridPluginController },
            { type: core.ElementRef },
            { type: dragDrop.DragDrop },
            { type: core.ChangeDetectorRef },
            { type: bidi.Directionality, decorators: [{ type: core.Optional }] },
            { type: dragDrop.CdkDropListGroup, decorators: [{ type: core.Optional }, { type: core.SkipSelf }] },
            { type: dragDrop.DragDropRegistry, decorators: [{ type: core.Optional }] },
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] }
        ]; };
        return PblNgridAggregationContainerDirective;
    }(dragDrop.CdkDropList));
    if (false) {
        /** @type {?} */
        PblNgridAggregationContainerDirective.prototype.id;
        /** @type {?} */
        PblNgridAggregationContainerDirective.prototype.orientation;
        /** @type {?} */
        PblNgridAggregationContainerDirective.prototype.pending;
        /**
         * Selector that will be used to determine the direct container element, starting from
         * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
         * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
         * of the draggable elements.
         * @type {?}
         */
        PblNgridAggregationContainerDirective.prototype.directContainerElement;
        /** @type {?} */
        PblNgridAggregationContainerDirective.prototype.originalElement;
        /** @type {?} */
        PblNgridAggregationContainerDirective.prototype._draggablesSet;
        /** @type {?} */
        PblNgridAggregationContainerDirective.prototype.table;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * Marks the element as the resizer template for cells.
     */
    var PblNgridCellResizerRefDirective = /** @class */ (function (_super) {
        __extends(PblNgridCellResizerRefDirective, _super);
        function PblNgridCellResizerRefDirective(tRef, registry) {
            var _this = _super.call(this, tRef, registry) || this;
            _this.name = 'cellResizer';
            _this.kind = 'dataHeaderExtensions';
            return _this;
        }
        /**
         * @param {?} context
         * @return {?}
         */
        PblNgridCellResizerRefDirective.prototype.shouldRender = /**
         * @param {?} context
         * @return {?}
         */
        function (context) {
            return !!context.col.resize;
        };
        PblNgridCellResizerRefDirective.decorators = [
            { type: core.Directive, args: [{ selector: '[pblNgridCellResizerRef]' },] }
        ];
        /** @nocollapse */
        PblNgridCellResizerRefDirective.ctorParameters = function () { return [
            { type: core.TemplateRef },
            { type: ngrid.PblNgridRegistryService }
        ]; };
        return PblNgridCellResizerRefDirective;
    }(ngrid.PblNgridMultiTemplateRegistry));
    if (false) {
        /** @type {?} */
        PblNgridCellResizerRefDirective.prototype.name;
        /** @type {?} */
        PblNgridCellResizerRefDirective.prototype.kind;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DragPluginDefaultTemplatesComponent = /** @class */ (function () {
        function DragPluginDefaultTemplatesComponent() {
        }
        DragPluginDefaultTemplatesComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'pbl-drag-plugin-default-templates',
                        template: "<pbl-ngrid-drag-resize *pblNgridCellResizerRef=\"let ctx\" [context]=\"ctx\"></pbl-ngrid-drag-resize>\n<span *pblNgridCellDraggerRef=\"let ctx\" [pblNgridColumnDrag]=\"ctx\" cdkDragRootElementClass=\"cdk-drag\"></span>",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None
                    }] }
        ];
        return DragPluginDefaultTemplatesComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PblNgridDragModule = /** @class */ (function () {
        function PblNgridDragModule() {
        }
        /**
         * @return {?}
         */
        PblNgridDragModule.withDefaultTemplates = /**
         * @return {?}
         */
        function () {
            return {
                ngModule: PblNgridDragModule,
                providers: ngrid.provideCommon([{ component: DragPluginDefaultTemplatesComponent }]),
            };
        };
        PblNgridDragModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            ngrid.PblNgridModule,
                            dragDrop.DragDropModule
                        ],
                        declarations: [
                            DragPluginDefaultTemplatesComponent,
                            CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                            PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                            PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                            PblNgridAggregationContainerDirective,
                            PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                        ],
                        exports: [
                            dragDrop.DragDropModule,
                            CdkLazyDropList, CdkLazyDrag, PblDragHandle,
                            PblNgridRowReorderPluginDirective, PblNgridRowDragDirective,
                            PblNgridColumnReorderPluginDirective, PblNgridColumnDragDirective, PblNgridCellDraggerRefDirective,
                            PblNgridAggregationContainerDirective,
                            PblNgridDragResizeComponent, PblNgridCellResizerRefDirective,
                        ],
                        providers: [
                            PblDragDrop,
                            { provide: dragDrop.DragDrop, useExisting: PblDragDrop },
                        ],
                        entryComponents: [DragPluginDefaultTemplatesComponent],
                    },] }
        ];
        return PblNgridDragModule;
    }());

    exports.CdkLazyDrag = CdkLazyDrag;
    exports.CdkLazyDropList = CdkLazyDropList;
    exports.PblDragHandle = PblDragHandle;
    exports.PblNgridColumnDragDirective = PblNgridColumnDragDirective;
    exports.PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective;
    exports.PblNgridDragModule = PblNgridDragModule;
    exports.PblNgridDragResizeComponent = PblNgridDragResizeComponent;
    exports.PblNgridRowDragDirective = PblNgridRowDragDirective;
    exports.PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective;
    exports.ɵa = PLUGIN_KEY$1;
    exports.ɵb = PLUGIN_KEY$2;
    exports.ɵc = extendGrid;
    exports.ɵd = extendGrid$1;
    exports.ɵe = DragPluginDefaultTemplatesComponent;
    exports.ɵf = PblNgridCellDraggerRefDirective;
    exports.ɵg = PblNgridAggregationContainerDirective;
    exports.ɵh = PblNgridCellResizerRefDirective;
    exports.ɵi = PblDragDrop;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pebula-ngrid-drag.umd.js.map
