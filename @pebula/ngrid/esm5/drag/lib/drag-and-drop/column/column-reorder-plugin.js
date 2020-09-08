/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/column/column-reorder-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread, __values } from "tslib";
// tslint:disable:no-output-rename
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Directive, ElementRef, Input, Inject, SkipSelf, Output, Optional, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDrag, CDK_DROP_LIST, CdkDropListGroup, CdkDropList, CDK_DRAG_CONFIG, } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblDragDrop } from '../core/drag-drop';
import { CdkLazyDropList, CdkLazyDrag } from '../core/lazy-drag-drop';
/** @type {?} */
export var COL_REORDER_PLUGIN_KEY = 'columnReorder';
/** @type {?} */
var _uniqueIdCounter = 0;
/**
 * @template T
 */
var PblNgridColumnReorderPluginDirective = /** @class */ (function (_super) {
    __extends(PblNgridColumnReorderPluginDirective, _super);
    function PblNgridColumnReorderPluginDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group) {
        var _this = _super.call(this, element, dragDrop, changeDetectorRef, dir, group) || this;
        _this.table = table;
        _this.id = "pbl-ngrid-column-reorder-list-" + _uniqueIdCounter++;
        _this.orientation = 'horizontal';
        _this.dragging = new BehaviorSubject(false);
        _this._columnReorder = false;
        _this._manualOverride = false;
        _this._draggablesSet = new Set();
        _this._removePlugin = pluginCtrl.setPlugin(COL_REORDER_PLUGIN_KEY, _this);
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
            value = coerceBooleanProperty(value);
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
        function (value) { this._manualOverride = coerceBooleanProperty(value); },
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
    PblNgridColumnReorderPluginDirective.decorators = [
        { type: Directive, args: [{
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
                        { provide: DragDrop, useExisting: PblDragDrop },
                        { provide: CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective },
                    ],
                },] }
    ];
    /** @nocollapse */
    PblNgridColumnReorderPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: ElementRef },
        { type: DragDrop },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    PblNgridColumnReorderPluginDirective.propDecorators = {
        columnReorder: [{ type: Input }],
        manualOverride: [{ type: Input }],
        dragging: [{ type: Output, args: ['cdkDropDragging',] }]
    };
    return PblNgridColumnReorderPluginDirective;
}(CdkDropList));
export { PblNgridColumnReorderPluginDirective };
if (false) {
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.id;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.orientation;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.dragging;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype._draggables;
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
    function PblNgridColumnDragDirective(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef) {
        var _this = _super.call(this, element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef) || this;
        _this.rootElementSelector = 'pbl-ngrid-header-cell';
        _this._hostNotRoot = false;
        return _this;
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
            var pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.grid);
            /** @type {?} */
            var plugin = pluginCtrl && pluginCtrl.getPlugin(COL_REORDER_PLUGIN_KEY);
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
        { type: Directive, args: [{
                    selector: '[pblNgridColumnDrag]',
                    exportAs: 'pblNgridColumnDrag',
                    host: {
                        // tslint:disable-line:use-host-property-decorator
                        'class': 'cdk-drag',
                        '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                    },
                    providers: [
                        { provide: DragDrop, useExisting: PblDragDrop },
                        { provide: CdkDrag, useExisting: PblNgridColumnDragDirective }
                    ]
                },] }
    ];
    /** @nocollapse */
    PblNgridColumnDragDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: CdkDropList, decorators: [{ type: Inject, args: [CDK_DROP_LIST,] }, { type: Optional }, { type: SkipSelf }] },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: ViewContainerRef },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_DRAG_CONFIG,] }] },
        { type: Directionality },
        { type: DragDrop },
        { type: ChangeDetectorRef }
    ]; };
    PblNgridColumnDragDirective.propDecorators = {
        context: [{ type: Input, args: ['pblNgridColumnDrag',] }],
        rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
        cdkDropList: [{ type: Input }]
    };
    return PblNgridColumnDragDirective;
}(CdkDrag));
export { PblNgridColumnDragDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUVOLFFBQVEsRUFFUixnQkFBZ0IsRUFDaEIsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBRVAsYUFBYSxFQUViLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsZUFBZSxHQUVoQixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBYSx3QkFBd0IsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDNUcsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0FBVXRFLE1BQU0sS0FBTyxzQkFBc0IsR0FBb0IsZUFBZTs7SUFFbEUsZ0JBQWdCLEdBQUcsQ0FBQzs7OztBQUV4QjtJQWlCbUUsd0RBQWM7SUFtQy9FLDhDQUFtQixLQUEyQixFQUNsQyxVQUFvQyxFQUNwQyxPQUFnQyxFQUNoQyxRQUFrQixFQUNsQixpQkFBb0MsRUFDeEIsR0FBb0Is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SCxNQUFNLFNBQUMsZUFBZTtnQkFsUTVCLGNBQWM7Z0JBR3JCLFFBQVE7Z0JBbkJSLGlCQUFpQjs7OzBCQThQaEIsS0FBSyxTQUFDLG9CQUFvQjsyQ0F5QzFCLEtBQUssU0FBQyx5QkFBeUI7OEJBYy9CLEtBQUs7O0lBeURSLGtDQUFDO0NBQUEsQUFqSUQsQ0FZMEQsT0FBTyxHQXFIaEU7U0FySFksMkJBQTJCOzs7SUFDdEMsMERBQThDOztJQUU5Qyw2Q0FBa0I7Ozs7O0lBV2xCLCtDQUF1SDs7Ozs7SUFDdkgsaURBQTZDOzs7OztJQUM3Qyw0Q0FBNkI7O0lBeUQ3QixpREFBbUI7O0lBQ25CLG1EQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW91dHB1dC1yZW5hbWVcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBTa2lwU2VsZixcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgRHJhZ0Ryb3AsXG4gIENka0RyYWcsXG4gIENka0RyYWdEcm9wLFxuICBDREtfRFJPUF9MSVNULFxuICBEcmFnUmVmLFxuICBDZGtEcm9wTGlzdEdyb3VwLFxuICBDZGtEcm9wTGlzdCxcbiAgQ0RLX0RSQUdfQ09ORklHLFxuICBEcmFnUmVmQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibENvbHVtbiwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENlbGxDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4uL2NvcmUvZHJhZy1kcm9wJztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNvbHVtblJlb3JkZXI/OiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IENPTF9SRU9SREVSX1BMVUdJTl9LRVk6ICdjb2x1bW5SZW9yZGVyJyA9ICdjb2x1bW5SZW9yZGVyJztcblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY29sdW1uUmVvcmRlcl0nLFxuICBleHBvcnRBczogJ3BibE5ncmlkQ29sdW1uUmVvcmRlcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG4gIGlkID0gYHBibC1uZ3JpZC1jb2x1bW4tcmVvcmRlci1saXN0LSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIEBJbnB1dCgpIGdldCBjb2x1bW5SZW9yZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY29sdW1uUmVvcmRlcjsgfTtcbiAgc2V0IGNvbHVtblJlb3JkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fY29sdW1uUmVvcmRlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgd2lsbCBub3QgbW92ZSB0aGUgY29sdW1uIG9uIGRyb3AuXG4gICAqIEluc3RlYWQgeW91IG5lZWQgdG8gaGFuZGxlIHRoZSBkcm9wcGVkIGV2ZW50LlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1hbnVhbE92ZXJyaWRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbWFudWFsT3ZlcnJpZGU7IH07XG4gIHNldCBtYW51YWxPdmVycmlkZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9tYW51YWxPdmVycmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBAT3V0cHV0KCdjZGtEcm9wRHJhZ2dpbmcnKSBkcmFnZ2luZzogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgX2RyYWdnYWJsZXM6IFF1ZXJ5TGlzdDxDZGtEcmFnPjtcblxuICBwcml2YXRlIF9jb2x1bW5SZW9yZGVyID0gZmFsc2U7XG4gIHByaXZhdGUgX21hbnVhbE92ZXJyaWRlID0gZmFsc2U7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIGxhc3RTd2FwOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47XG4gIHByaXZhdGUgbGFzdFNvcnRlZDogeyBkcmFnOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47IG9mZnNldDogbnVtYmVyOyBjbGllbnRSZWN0OiBDbGllbnRSZWN0OyB9O1xuXG4gIC8vIFN0dWZmIHRvIHdvcmthcm91bmQgZW5jYXBzdWxhdGlvbiBpbiBDZGtEcm9wTGlzdFxuICBwcml2YXRlIGdldCBwYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKCk6IChpdGVtOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4sIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIsIGRlbHRhPzoge3g6IG51bWJlciwgeTogbnVtYmVyfSkgPT4gbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2dldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24uYmluZCh0aGlzLl9kcm9wTGlzdFJlZik7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgcGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zKCk6IHsgZHJhZzogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+OyBvZmZzZXQ6IG51bWJlcjsgY2xpZW50UmVjdDogQ2xpZW50UmVjdDsgfVtdIHtcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2l0ZW1Qb3NpdGlvbnM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4pIHtcbiAgICBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKENPTF9SRU9SREVSX1BMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50ID0gJy5wYmwtbmdyaWQtaGVhZGVyLXJvdy1tYWluJztcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdEcm9wPFQsIGFueT4pID0+IHtcbiAgICAgIGlmICghdGhpcy5tYW51YWxPdmVycmlkZSkge1xuICAgICAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKChldmVudC5pdGVtIGFzIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPikuY29sdW1uLCBldmVudC5jdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFnZ2luZy5zdWJzY3JpYmUoIGlzRHJhZ2dpbmcgPT4ge1xuICAgICAgY29uc3QgZWwgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY29sdW1uLWxpc3QtZHJhZ2dpbmcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jb2x1bW4tbGlzdC1kcmFnZ2luZycpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0U3dhcCA9IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIHRoaXMubW9ua2V5UGF0Y2hEcm9wTGlzdFJlZigpO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgLy8gbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgLy8gYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgLy8gc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmJlZm9yZUV4aXQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IC8vIHN1cGVyLmJlZm9yZVN0YXJ0ZWQoKTtcbiAgICB0aGlzLmxhc3RTb3J0ZWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGJsUmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KGZhbHNlKTtcbiAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xuICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtb25rZXlQYXRjaERyb3BMaXN0UmVmKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgX3NvcnRJdGVtLCBlbnRlciB9ID0gdGhpcy5fZHJvcExpc3RSZWY7XG5cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmVudGVyID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGFzdFNvcnRlZCA9IHRoaXMubGFzdFNvcnRlZFxuICAgICAgdGhpcy5sYXN0U29ydGVkID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGxhc3RTb3J0ZWQgJiYgbGFzdFNvcnRlZC5kcmFnID09PSBpdGVtKSB7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgICAgcG9pbnRlclggPSBsYXN0U29ydGVkLmNsaWVudFJlY3QubGVmdCArIDEgLSAoaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcbiAgICAgICAgcG9pbnRlclkgPSBsYXN0U29ydGVkLmNsaWVudFJlY3QudG9wICsgMSAtICghaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcbiAgICAgIH1cbiAgICAgIGVudGVyLmNhbGwodGhpcy5fZHJvcExpc3RSZWYsIGl0ZW0sIHBvaW50ZXJYLCBwb2ludGVyWSk7XG4gICAgfTtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuX3NvcnRJdGVtID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlciwgcG9pbnRlckRlbHRhOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xuICAgICAgdGhpcy5sYXN0U29ydGVkID0gc2libGluZ3MuZmluZCggcyA9PiBzLmRyYWcgPT09IGl0ZW0gKTtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5wYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKGl0ZW0gYXMgRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XG4gICAgICBpZiAobmV3SW5kZXggPT09IC0xICYmIHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkT3JkZXIgPSBzaWJsaW5ncy5zbGljZSgpO1xuICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgY29uc3Qgc2libGluZ0F0TmV3UG9zaXRpb24gPSBzaWJsaW5nc1tuZXdJbmRleF07XG5cbiAgICAgIGlmIChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIG5vdyBuZWVkIHRvIGZpbmQgaWYgYmV0d2VlbiBjdXJyZW50IGFuZCBuZXcgcG9zaXRpb24gdGhlcmUgYXJlIGl0ZW1zIHdpdGggYHdvbnRCdWRnZWBcbiAgICAgIGNvbnN0IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gPSB0aGlzLmxhc3RTd2FwID8gdGhpcy5sYXN0U3dhcCA6IGl0ZW07XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBzaWJsaW5ncy5maW5kSW5kZXgoIGN1cnJlbnRJdGVtID0+IGN1cnJlbnRJdGVtLmRyYWcgPT09IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5taW4obmV3SW5kZXgsIGN1cnJlbnRJbmRleClcbiAgICAgIGNvbnN0IGl0ZW1zRHJhZ2dlZE92ZXIgPSBzaWJsaW5ncy5zbGljZShzdGFydCwgTWF0aC5hYnMobmV3SW5kZXggLSBjdXJyZW50SW5kZXgpICsgc3RhcnQpO1xuICAgICAgZm9yIChjb25zdCBkcmFnSXRlbSBvZiBpdGVtc0RyYWdnZWRPdmVyKSB7XG4gICAgICAgIGlmIChkcmFnSXRlbS5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSAmJiBkcmFnSXRlbS5kcmFnICE9PSBpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHdlIG1vdmUgdGhlIGl0ZW0gb3V0c2lkZSBvZiBsb2NrZWQgZ3JvdXAgT1IgaW50byBhIGxvY2tlZCBncm91cC4uLiBib3RoIGFyZSBpbnZhbGlkLlxuICAgICAgaWYgKCFpdGVtLmRhdGEuY29sdW1uLmNoZWNrR3JvdXBMb2NrQ29uc3RyYWludChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9zb3J0SXRlbS5jYWxsKHRoaXMuX2Ryb3BMaXN0UmVmLCBpdGVtLCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XG5cbiAgICAgIHRoaXMubGFzdFN3YXAgPSBzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnO1xuXG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhlIHBvc2l0aW9uIGhhc24ndCBjaGFuZ2VkLlxuICAgICAgICAgIGlmIChvbGRPcmRlcltpbmRleF0gPT09IHNpYmxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICAgICAgYy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtzaWJsaW5nLm9mZnNldH1weCwgMCwgMClgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDb2x1bW5EcmFnXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5EcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXG4gICAgeyBwcm92aWRlOiBDZGtEcmFnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2RrTGF6eURyYWc8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+LCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+IHtcbiAgcm9vdEVsZW1lbnRTZWxlY3RvciA9ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnO1xuXG4gIGNvbHVtbjogUGJsQ29sdW1uO1xuXG4gIEBJbnB1dCgncGJsTmdyaWRDb2x1bW5EcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xuICAgIHRoaXMuY29sdW1uID0gdmFsdWUgJiYgdmFsdWUuY29sO1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSB0aGlzLnBsdWdpbkN0cmwgPSB2YWx1ZSAmJiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh2YWx1ZS5ncmlkKTtcbiAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DdHJsICYmIHBsdWdpbkN0cmwuZ2V0UGx1Z2luKENPTF9SRU9SREVSX1BMVUdJTl9LRVkpO1xuICAgIHRoaXMuY2RrRHJvcExpc3QgPSBwbHVnaW4gfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLmNvbHVtbiAmJiB0aGlzLmNvbHVtbi5yZW9yZGVyID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj5cbiAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI7XG4gIHByaXZhdGUgY2FjaGU6IEhUTUxFbGVtZW50W107XG5cbiAgLy8gQ1RPUiBJUyBSRVFVSVJFRCBPUiBJVCBXT05UIFdPUksgSU4gQU9UXG4gIC8vIFRPRE86IFRyeSB0byByZW1vdmUgd2hlbiBzdXBwb3J0aW5nIElWWVxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJPUF9MSVNUKSBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBkcm9wQ29udGFpbmVyOiBDZGtEcm9wTGlzdCxcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RSQUdfQ09ORklHKSBjb25maWc6IERyYWdSZWZDb25maWcsXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihcbiAgICAgIGVsZW1lbnQsXG4gICAgICBkcm9wQ29udGFpbmVyLFxuICAgICAgX2RvY3VtZW50LFxuICAgICAgX25nWm9uZSxcbiAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgICAgY29uZmlnLFxuICAgICAgX2RpcixcbiAgICAgIGRyYWdEcm9wLFxuICAgICAgX2NoYW5nZURldGVjdG9yUmVmLFxuICAgICk7XG4gIH1cblxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xuICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICB0aGlzLl9kcmFnUmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICBjb25zdCB7IGNka0Ryb3BMaXN0IH0gPSB0aGlzO1xuICAgICAgaWYgKGNka0Ryb3BMaXN0ICYmIGNka0Ryb3BMaXN0LmNvbHVtblJlb3JkZXIgJiYgdGhpcy5fY29udGV4dC5jb2wucmVvcmRlcikge1xuICAgICAgICAvLyB3ZSBkb24ndCBhbGxvdyBhIG5ldyBkcmFnZ2luZyBzZXNzaW9uIGJlZm9yZSB0aGUgcHJldmlvdXMgZW5kcy5cbiAgICAgICAgLy8gdGhpcyBzb3VuZCBpbXBvc3NpYmxlLCBidXQgZHVlIHRvIGFuaW1hdGlvbiB0cmFuc2l0aW9ucyBpdHMgYWN0dWFsbHkgaXMuXG4gICAgICAgIC8vIGlmIHRoZSBgdHJhbnNpdGlvbmVuZGAgaXMgbG9uZyBlbm91Z2gsIGEgbmV3IGRyYWcgY2FuIHN0YXJ0Li4uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoZSBgZGlzYWJsZWRgIHN0YXRlIGlzIGNoZWNrZWQgYnkgcG9pbnRlckRvd24gQUZURVIgY2FsbGluZyBiZWZvcmUgc3RhcnQgc28gd2UgY2FuIGNhbmNlbCB0aGUgc3RhcnQuLi5cbiAgICAgICAgaWYgKGNka0Ryb3BMaXN0Ll9kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IHRydWUgKTtcbiAgICB0aGlzLmVuZGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSBmYWxzZSApO1xuICB9XG5cbiAgZ2V0Q2VsbHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlID0gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCd0YWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWNoZTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHN1cGVyLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuY2FjaGUpIHtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgdGhpcy5jYWNoZSkge1xuICAgICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2FjaGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=