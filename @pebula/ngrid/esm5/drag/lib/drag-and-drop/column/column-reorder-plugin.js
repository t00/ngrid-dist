/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:no-output-rename
import { BehaviorSubject } from 'rxjs';
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, Input, Inject, SkipSelf, Output, OnDestroy, Optional, OnInit, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDrag, CdkDragDrop, CDK_DROP_LIST, DragRef, CdkDropListGroup, CdkDropList, CDK_DRAG_CONFIG, DragRefConfig, DragDropRegistry, } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, NgridPlugin, PblColumn, PblNgridPluginController, PblNgridCellContext } from '@pebula/ngrid';
import { cdkDropList, cdkDrag } from '../v7-compat';
import { CdkLazyDropList, CdkLazyDrag, PblDragDrop } from '../core';
import { extendGrid } from './extend-grid';
/** @type {?} */
export var PLUGIN_KEY = 'columnReorder';
/** @type {?} */
var _uniqueIdCounter = 0;
/**
 * @template T
 */
var PblNgridColumnReorderPluginDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridColumnReorderPluginDirective, _super);
    function PblNgridColumnReorderPluginDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
        _this.table = table;
        _this.id = "pbl-ngrid-column-reorder-list-" + _uniqueIdCounter++;
        _this.orientation = 'horizontal';
        _this.dragging = new BehaviorSubject(false);
        _this._columnReorder = false;
        _this._manualOverride = false;
        _this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        _this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, _this);
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
                for (var _b = tslib_1.__values(sibling.drag.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var itemsDraggedOver_1 = tslib_1.__values(itemsDraggedOver), itemsDraggedOver_1_1 = itemsDraggedOver_1.next(); !itemsDraggedOver_1_1.done; itemsDraggedOver_1_1 = itemsDraggedOver_1.next()) {
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
                        for (var _b = tslib_1.__values(sibling.drag.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    PblNgridColumnReorderPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: ElementRef },
        { type: DragDrop },
        { type: ChangeDetectorRef },
        { type: Directionality },
        { type: CdkDropListGroup },
        { type: DragDropRegistry },
        { type: undefined }
    ]; };
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
                        { provide: CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective_1 },
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
        { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: DragDropRegistry, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    PblNgridColumnReorderPluginDirective.propDecorators = {
        columnReorder: [{ type: Input }],
        manualOverride: [{ type: Input }],
        dragging: [{ type: Output, args: ['cdkDropDragging',] }]
    };
    /**
     * @template T
     */
    PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective_1 = tslib_1.__decorate([
        NgridPlugin({ id: PLUGIN_KEY, runOnce: extendGrid }),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
            PblNgridPluginController,
            ElementRef,
            DragDrop,
            ChangeDetectorRef,
            Directionality,
            CdkDropListGroup,
            DragDropRegistry, Object])
    ], PblNgridColumnReorderPluginDirective);
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
    tslib_1.__extends(PblNgridColumnDragDirective, _super);
    // CTOR IS REQUIRED OR IT WONT WORK IN AOT
    // TODO: Try to remove when supporting IVY
    function PblNgridColumnDragDirective(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
    dragDropRegistry) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry))) || this;
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
            var pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.grid);
            /** @type {?} */
            var plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY);
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
                    (_a = this.getRootElement().classList).remove.apply(_a, tslib_1.__spread(this._rootClass.split(' ')));
                }
                if (value) {
                    (_b = this.getRootElement().classList).add.apply(_b, tslib_1.__spread(value.split(' ')));
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
                for (var _b = tslib_1.__values(this.cache), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        { type: ChangeDetectorRef },
        { type: ViewportRuler, decorators: [{ type: Optional }] },
        { type: DragDropRegistry, decorators: [{ type: Optional }] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFDUCxXQUFXLEVBQ1gsYUFBYSxFQUNiLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztB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LGdCQUFnQix1QkFpUUgsUUFBUTs7OzBCQTFCcEIsS0FBSyxTQUFDLG9CQUFvQjsyQ0E2QzFCLEtBQUssU0FBQyx5QkFBeUI7OEJBYy9CLEtBQUs7O0lBeURSLGtDQUFDO0NBQUEsQUFySUQsQ0FZMEQsT0FBTyxHQXlIaEU7U0F6SFksMkJBQTJCOzs7SUFDdEMsMERBQThDOztJQUU5Qyw2Q0FBa0I7Ozs7O0lBV2xCLCtDQUF1SDs7Ozs7SUFDdkgsaURBQTZDOzs7OztJQUM3Qyw0Q0FBNkI7O0lBNkQ3QixpREFBbUI7O0lBQ25CLG1EQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW91dHB1dC1yZW5hbWVcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgSW5qZWN0LFxyXG4gIFNraXBTZWxmLFxyXG4gIE91dHB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT3B0aW9uYWwsXHJcbiAgT25Jbml0LFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgTmdab25lLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHtcclxuICBEcmFnRHJvcCxcclxuICBDZGtEcmFnLFxyXG4gIENka0RyYWdEcm9wLFxyXG4gIENES19EUk9QX0xJU1QsXHJcbiAgRHJhZ1JlZixcclxuICBDZGtEcm9wTGlzdEdyb3VwLFxyXG4gIENka0Ryb3BMaXN0LFxyXG4gIENES19EUkFHX0NPTkZJRyxcclxuICBEcmFnUmVmQ29uZmlnLFxyXG4gIERyYWdEcm9wUmVnaXN0cnksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuXHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBOZ3JpZFBsdWdpbiwgUGJsQ29sdW1uLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcclxuaW1wb3J0IHsgY2RrRHJvcExpc3QsIGNka0RyYWcgfSBmcm9tICcuLi92Ny1jb21wYXQnO1xyXG5pbXBvcnQgeyBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnLCBQYmxEcmFnRHJvcCB9IGZyb20gJy4uL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4uL2NvcmUvZHJvcC1saXN0LXJlZic7XHJcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcclxuaW1wb3J0IHsgZXh0ZW5kR3JpZCB9IGZyb20gJy4vZXh0ZW5kLWdyaWQnO1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xyXG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XHJcbiAgICBjb2x1bW5SZW9yZGVyPzogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjb2x1bW5SZW9yZGVyJyA9ICdjb2x1bW5SZW9yZGVyJztcclxuXHJcbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcclxuXHJcbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBydW5PbmNlOiBleHRlbmRHcmlkIH0pXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW2NvbHVtblJlb3JkZXJdJyxcclxuICBleHBvcnRBczogJ3BibE5ncmlkQ29sdW1uUmVvcmRlcicsXHJcbiAgaW5wdXRzOiBbXHJcbiAgICAnZGlyZWN0Q29udGFpbmVyRWxlbWVudDpjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnXHJcbiAgXSxcclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXHJcbiAgICAnY2xhc3MnOiAnY2RrLWRyb3AtbGlzdCcsXHJcbiAgICAnW2lkXSc6ICdpZCcsXHJcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxyXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LXJlY2VpdmluZ10nOiAnX2Ryb3BMaXN0UmVmLmlzUmVjZWl2aW5nKCknLFxyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IERyYWdEcm9wLCB1c2VFeGlzdGluZzogUGJsRHJhZ0Ryb3AgfSxcclxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XHJcbiAgaWQgPSBgcGJsLW5ncmlkLWNvbHVtbi1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcclxuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcclxuXHJcbiAgQElucHV0KCkgZ2V0IGNvbHVtblJlb3JkZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jb2x1bW5SZW9yZGVyOyB9O1xyXG4gIHNldCBjb2x1bW5SZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgICB0aGlzLl9jb2x1bW5SZW9yZGVyID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHRydWUsIHdpbGwgbm90IG1vdmUgdGhlIGNvbHVtbiBvbiBkcm9wLlxyXG4gICAqIEluc3RlYWQgeW91IG5lZWQgdG8gaGFuZGxlIHRoZSBkcm9wcGVkIGV2ZW50LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGdldCBtYW51YWxPdmVycmlkZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21hbnVhbE92ZXJyaWRlOyB9O1xyXG4gIHNldCBtYW51YWxPdmVycmlkZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9tYW51YWxPdmVycmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cclxuXHJcbiAgQE91dHB1dCgnY2RrRHJvcERyYWdnaW5nJykgZHJhZ2dpbmc6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xyXG5cclxuICBwcml2YXRlIF9jb2x1bW5SZW9yZGVyID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfbWFudWFsT3ZlcnJpZGUgPSBmYWxzZTtcclxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcclxuICBwcml2YXRlIGxhc3RTd2FwOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47XHJcbiAgcHJpdmF0ZSBsYXN0U29ydGVkOiB7IGRyYWc6IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+Pjsgb2Zmc2V0OiBudW1iZXI7IGNsaWVudFJlY3Q6IENsaWVudFJlY3Q7IH07XHJcblxyXG4gIC8vIFN0dWZmIHRvIHdvcmthcm91bmQgZW5jYXBzdWxhdGlvbiBpbiBDZGtEcm9wTGlzdFxyXG4gIHByaXZhdGUgZ2V0IHBibEdldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24oKTogKGl0ZW06IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PiwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlciwgZGVsdGE/OiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KSA9PiBudW1iZXIge1xyXG4gICAgcmV0dXJuICh0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnkpLl9nZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uLmJpbmQodGhpcy5fZHJvcExpc3RSZWYpO1xyXG4gIH1cclxuICBwcml2YXRlIGdldCBwYmxHZXRQb3NpdGlvbkNhY2hlSXRlbXMoKTogeyBkcmFnOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47IG9mZnNldDogbnVtYmVyOyBjbGllbnRSZWN0OiBDbGllbnRSZWN0OyB9W10ge1xyXG4gICAgcmV0dXJuICh0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnkpLl9pdGVtUG9zaXRpb25zO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcclxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgICAgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxyXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI/OiBEaXJlY3Rpb25hbGl0eSxcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+LFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk/OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwgLy8gZm9yIHY3IGNvbXBhdFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudD86IGFueSkge1xyXG4gICAgc3VwZXIoLi4uY2RrRHJvcExpc3QoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwLCBkcmFnRHJvcFJlZ2lzdHJ5LCBfZG9jdW1lbnQpKTtcclxuICAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xyXG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50ID0gJy5wYmwtbmdyaWQtaGVhZGVyLXJvdy1tYWluJztcclxuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ0Ryb3A8VCwgYW55PikgPT4ge1xyXG4gICAgICBpZiAoIXRoaXMubWFudWFsT3ZlcnJpZGUpIHtcclxuICAgICAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKChldmVudC5pdGVtIGFzIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPikuY29sdW1uLCBldmVudC5jdXJyZW50SW5kZXgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmRyYWdnaW5nLnN1YnNjcmliZSggaXNEcmFnZ2luZyA9PiB7XHJcbiAgICAgIGNvbnN0IGVsID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG4gICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jb2x1bW4tbGlzdC1kcmFnZ2luZycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jb2x1bW4tbGlzdC1kcmFnZ2luZycpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubGFzdFN3YXAgPSB1bmRlZmluZWQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1vbmtleVBhdGNoRHJvcExpc3RSZWYoKTtcclxuICB9XHJcblxyXG4gIC8qIENka0xhenlEcm9wTGlzdCBzdGFydCAqL1xyXG4gIC8qKlxyXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXHJcbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcclxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXHJcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cclxuICAgKi9cclxuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XHJcbiAgZ2V0IHBibERyb3BMaXN0UmVmKCk6IFBibERyb3BMaXN0UmVmPFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XHJcbiAgb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcclxuICAvLyBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XHJcbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmFkZERyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxyXG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cclxuICAvLyBiZWZvcmVTdGFydGVkKCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmJlZm9yZVN0YXJ0ZWQuY2FsbCh0aGlzKTsgfVxyXG4gIC8qIENka0xhenlEcm9wTGlzdCBlbmQgKi9cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IC8vIHN1cGVyLm5nT25Jbml0KCk7XHJcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcclxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuYmVmb3JlRXhpdC5zdWJzY3JpYmUoIGUgPT4gdGhpcy5fcGJsUmVzZXQoKSApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xyXG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xyXG4gIH1cclxuXHJcbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XHJcbiAgICBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmJlZm9yZVN0YXJ0ZWQuY2FsbCh0aGlzKTsgLy8gc3VwZXIuYmVmb3JlU3RhcnRlZCgpO1xyXG4gICAgdGhpcy5sYXN0U29ydGVkID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcGJsUmVzZXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyYWdnaW5nLm5leHQoZmFsc2UpO1xyXG4gICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLnBibEdldFBvc2l0aW9uQ2FjaGVJdGVtcztcclxuICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XHJcbiAgICAgIGZvciAoY29uc3QgYyBvZiBzaWJsaW5nLmRyYWcuZGF0YS5nZXRDZWxscygpKSB7XHJcbiAgICAgICAgYy5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1vbmtleVBhdGNoRHJvcExpc3RSZWYoKTogdm9pZCB7XHJcbiAgICBjb25zdCB7IF9zb3J0SXRlbSwgZW50ZXIgfSA9IHRoaXMuX2Ryb3BMaXN0UmVmO1xyXG5cclxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuZW50ZXIgPSAoaXRlbTogUGFyYW1ldGVyczx0eXBlb2YgZW50ZXI+WzBdLCBwb2ludGVyWDogbnVtYmVyLCBwb2ludGVyWTogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IGxhc3RTb3J0ZWQgPSB0aGlzLmxhc3RTb3J0ZWRcclxuICAgICAgdGhpcy5sYXN0U29ydGVkID0gdW5kZWZpbmVkO1xyXG4gICAgICBpZiAobGFzdFNvcnRlZCAmJiBsYXN0U29ydGVkLmRyYWcgPT09IGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCc7XHJcbiAgICAgICAgcG9pbnRlclggPSBsYXN0U29ydGVkLmNsaWVudFJlY3QubGVmdCArIDEgLSAoaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcclxuICAgICAgICBwb2ludGVyWSA9IGxhc3RTb3J0ZWQuY2xpZW50UmVjdC50b3AgKyAxIC0gKCFpc0hvcml6b250YWwgPyBsYXN0U29ydGVkLm9mZnNldCA6IDApO1xyXG4gICAgICB9XHJcbiAgICAgIGVudGVyLmNhbGwodGhpcy5fZHJvcExpc3RSZWYsIGl0ZW0sIHBvaW50ZXJYLCBwb2ludGVyWSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuX3NvcnRJdGVtID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlciwgcG9pbnRlckRlbHRhOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KTogdm9pZCA9PiB7XHJcbiAgICAgIGNvbnN0IHNpYmxpbmdzID0gdGhpcy5wYmxHZXRQb3NpdGlvbkNhY2hlSXRlbXM7XHJcbiAgICAgIHRoaXMubGFzdFNvcnRlZCA9IHNpYmxpbmdzLmZpbmQoIHMgPT4gcy5kcmFnID09PSBpdGVtICk7XHJcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5wYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKGl0ZW0gYXMgRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XHJcbiAgICAgIGlmIChuZXdJbmRleCA9PT0gLTEgJiYgc2libGluZ3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBvbGRPcmRlciA9IHNpYmxpbmdzLnNsaWNlKCk7XHJcbiAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcclxuICAgICAgY29uc3Qgc2libGluZ0F0TmV3UG9zaXRpb24gPSBzaWJsaW5nc1tuZXdJbmRleF07XHJcblxyXG4gICAgICBpZiAoc2libGluZ0F0TmV3UG9zaXRpb24uZHJhZy5kYXRhLmNvbHVtbi53b250QnVkZ2UpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdlIG5vdyBuZWVkIHRvIGZpbmQgaWYgYmV0d2VlbiBjdXJyZW50IGFuZCBuZXcgcG9zaXRpb24gdGhlcmUgYXJlIGl0ZW1zIHdpdGggYHdvbnRCdWRnZWBcclxuICAgICAgY29uc3QgaXRlbUF0T3JpZ2luYWxQb3NpdGlvbiA9IHRoaXMubGFzdFN3YXAgPyB0aGlzLmxhc3RTd2FwIDogaXRlbTtcclxuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gc2libGluZ3MuZmluZEluZGV4KCBjdXJyZW50SXRlbSA9PiBjdXJyZW50SXRlbS5kcmFnID09PSBpdGVtQXRPcmlnaW5hbFBvc2l0aW9uICk7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5taW4obmV3SW5kZXgsIGN1cnJlbnRJbmRleClcclxuICAgICAgY29uc3QgaXRlbXNEcmFnZ2VkT3ZlciA9IHNpYmxpbmdzLnNsaWNlKHN0YXJ0LCBNYXRoLmFicyhuZXdJbmRleCAtIGN1cnJlbnRJbmRleCkgKyBzdGFydCk7XHJcbiAgICAgIGZvciAoY29uc3QgZHJhZ0l0ZW0gb2YgaXRlbXNEcmFnZ2VkT3Zlcikge1xyXG4gICAgICAgIGlmIChkcmFnSXRlbS5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSAmJiBkcmFnSXRlbS5kcmFnICE9PSBpdGVtKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjaGVjayBpZiB3ZSBtb3ZlIHRoZSBpdGVtIG91dHNpZGUgb2YgbG9ja2VkIGdyb3VwIE9SIGludG8gYSBsb2NrZWQgZ3JvdXAuLi4gYm90aCBhcmUgaW52YWxpZC5cclxuICAgICAgaWYgKCFpdGVtLmRhdGEuY29sdW1uLmNoZWNrR3JvdXBMb2NrQ29uc3RyYWludChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgX3NvcnRJdGVtLmNhbGwodGhpcy5fZHJvcExpc3RSZWYsIGl0ZW0sIHBvaW50ZXJYLCBwb2ludGVyWSwgcG9pbnRlckRlbHRhKTtcclxuXHJcbiAgICAgIHRoaXMubGFzdFN3YXAgPSBzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnO1xyXG5cclxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgcG9zaXRpb24gaGFzbid0IGNoYW5nZWQuXHJcbiAgICAgICAgICBpZiAob2xkT3JkZXJbaW5kZXhdID09PSBzaWJsaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xyXG4gICAgICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3NpYmxpbmcub2Zmc2V0fXB4LCAwLCAwKWA7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1twYmxOZ3JpZENvbHVtbkRyYWddJyxcclxuICBleHBvcnRBczogJ3BibE5ncmlkQ29sdW1uRHJhZycsXHJcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxyXG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnJyxcclxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxyXG4gICAgeyBwcm92aWRlOiBDZGtEcmFnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH1cclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2RrTGF6eURyYWc8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+LCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+IHtcclxuICByb290RWxlbWVudFNlbGVjdG9yID0gJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCc7XHJcblxyXG4gIGNvbHVtbjogUGJsQ29sdW1uO1xyXG5cclxuICBASW5wdXQoJ3BibE5ncmlkQ29sdW1uRHJhZycpIHNldCBjb250ZXh0KHZhbHVlOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+Pikge1xyXG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xyXG4gICAgdGhpcy5jb2x1bW4gPSB2YWx1ZSAmJiB2YWx1ZS5jb2w7XHJcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gdGhpcy5wbHVnaW5DdHJsID0gdmFsdWUgJiYgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodmFsdWUuZ3JpZCk7XHJcbiAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DdHJsICYmIHBsdWdpbkN0cmwuZ2V0UGx1Z2luKFBMVUdJTl9LRVkpO1xyXG4gICAgdGhpcy5jZGtEcm9wTGlzdCA9IHBsdWdpbiB8fCB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5jb2x1bW4gJiYgdGhpcy5jb2x1bW4ucmVvcmRlciA/IGZhbHNlIDogdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+XHJcbiAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI7XHJcbiAgcHJpdmF0ZSBjYWNoZTogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgLy8gQ1RPUiBJUyBSRVFVSVJFRCBPUiBJVCBXT05UIFdPUksgSU4gQU9UXHJcbiAgLy8gVE9ETzogVHJ5IHRvIHJlbW92ZSB3aGVuIHN1cHBvcnRpbmcgSVZZXHJcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJPUF9MSVNUKSBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBkcm9wQ29udGFpbmVyOiBDZGtEcm9wTGlzdCxcclxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICAgICAgICBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJBR19DT05GSUcpIGNvbmZpZzogRHJhZ1JlZkNvbmZpZyxcclxuICAgICAgICAgICAgICBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcclxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXHJcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlciwgLy8gZm9yIHY3IGNvbXBhdFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk6IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCkge1xyXG4gICAgc3VwZXIoLi4uY2RrRHJhZyhlbGVtZW50LCBkcm9wQ29udGFpbmVyLCBfZG9jdW1lbnQsIF9uZ1pvbmUsIF92aWV3Q29udGFpbmVyUmVmLCBjb25maWcsIF9kaXIsIGRyYWdEcm9wLCBfY2hhbmdlRGV0ZWN0b3JSZWYsIHZpZXdwb3J0UnVsZXIsIGRyYWdEcm9wUmVnaXN0cnkpKTtcclxuICAgIC8vIHN1cGVyKFxyXG4gICAgLy8gICBlbGVtZW50LFxyXG4gICAgLy8gICBkcm9wQ29udGFpbmVyLFxyXG4gICAgLy8gICBfZG9jdW1lbnQsXHJcbiAgICAvLyAgIF9uZ1pvbmUsXHJcbiAgICAvLyAgIF92aWV3Q29udGFpbmVyUmVmLFxyXG4gICAgLy8gICBjb25maWcsXHJcbiAgICAvLyAgIF9kaXIsXHJcbiAgICAvLyAgIGRyYWdEcm9wLFxyXG4gICAgLy8gICBfY2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAvLyApO1xyXG4gIH1cclxuXHJcbiAgLyogQ2RrTGF6eURyYWcgc3RhcnQgKi9cclxuICAvKipcclxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXHJcbiAgICovXHJcbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxyXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcclxuICAgICAgaWYgKHRoaXMuX3Jvb3RDbGFzcykge1xyXG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cclxuXHJcbiAgQElucHV0KCkgZ2V0IGNka0Ryb3BMaXN0KCk6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPiB7IHJldHVybiB0aGlzLmRyb3BDb250YWluZXIgYXMgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+OyB9XHJcbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcclxuICAgIC8vIFRPIFNVUFBPUlQgYGNka0Ryb3BMaXN0YCB2aWEgc3RyaW5nIGlucHV0IChJRCkgd2UgbmVlZCBhIHJlYWN0aXZlIHJlZ2lzdHJ5Li4uXHJcbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xyXG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyb3BDb250YWluZXIgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLl9kcmFnUmVmLl93aXRoRHJvcENvbnRhaW5lcih2YWx1ZS5fZHJvcExpc3RSZWYpO1xyXG4gICAgICB2YWx1ZS5hZGREcmFnKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xyXG4gIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xyXG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxyXG4gIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdPbkRlc3Ryb3kuY2FsbCh0aGlzKTsgIHN1cGVyLm5nT25EZXN0cm95KCk7IH1cclxuICAvKiBDZGtMYXp5RHJhZyBlbmQgKi9cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpO1xyXG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XHJcblxyXG4gICAgdGhpcy5fZHJhZ1JlZi5iZWZvcmVTdGFydGVkLnN1YnNjcmliZSggKCkgPT4ge1xyXG4gICAgICBjb25zdCB7IGNka0Ryb3BMaXN0IH0gPSB0aGlzO1xyXG4gICAgICBpZiAoY2RrRHJvcExpc3QgJiYgY2RrRHJvcExpc3QuY29sdW1uUmVvcmRlciAmJiB0aGlzLl9jb250ZXh0LmNvbC5yZW9yZGVyKSB7XHJcbiAgICAgICAgLy8gd2UgZG9uJ3QgYWxsb3cgYSBuZXcgZHJhZ2dpbmcgc2Vzc2lvbiBiZWZvcmUgdGhlIHByZXZpb3VzIGVuZHMuXHJcbiAgICAgICAgLy8gdGhpcyBzb3VuZCBpbXBvc3NpYmxlLCBidXQgZHVlIHRvIGFuaW1hdGlvbiB0cmFuc2l0aW9ucyBpdHMgYWN0dWFsbHkgaXMuXHJcbiAgICAgICAgLy8gaWYgdGhlIGB0cmFuc2l0aW9uZW5kYCBpcyBsb25nIGVub3VnaCwgYSBuZXcgZHJhZyBjYW4gc3RhcnQuLi5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIHRoZSBgZGlzYWJsZWRgIHN0YXRlIGlzIGNoZWNrZWQgYnkgcG9pbnRlckRvd24gQUZURVIgY2FsbGluZyBiZWZvcmUgc3RhcnQgc28gd2UgY2FuIGNhbmNlbCB0aGUgc3RhcnQuLi5cclxuICAgICAgICBpZiAoY2RrRHJvcExpc3QuX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IHRydWUgKTtcclxuICAgIHRoaXMuZW5kZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IGZhbHNlICk7XHJcbiAgfVxyXG5cclxuICBnZXRDZWxscygpOiBIVE1MRWxlbWVudFtdIHtcclxuICAgIGlmICghdGhpcy5jYWNoZSkge1xyXG4gICAgICB0aGlzLmNhY2hlID0gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCd0YWJsZScpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY2FjaGU7XHJcbiAgfVxyXG5cclxuICByZXNldCgpOiB2b2lkIHtcclxuICAgIHN1cGVyLnJlc2V0KCk7XHJcbiAgICBpZiAodGhpcy5jYWNoZSkge1xyXG4gICAgICBmb3IgKGNvbnN0IGVsIG9mIHRoaXMuY2FjaGUpIHtcclxuICAgICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmNhY2hlID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=