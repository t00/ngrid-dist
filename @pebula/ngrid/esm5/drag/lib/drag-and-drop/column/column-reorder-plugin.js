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
import { CdkLazyDropList, CdkLazyDrag } from '../core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFDUCxXQUFXLEVBQ1gsYUFBYSxFQUNiLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLGVBQWUsRUFDZixhQUFhLEVBQ2IsZ0JBQWdCLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pILE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBR3ZELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDLE1BQU0sS0FBTyxVQUFVLEdBQW9CLGVBQWU7O0lBRXRELGdCQUFnQixHQUFHLENBQUM7Ozs7O0lBbUIyQyxnRUFBYztJQWlDL0UsOENBQW1CLEtBQTJCLEVBQ2xDLFVBQW9DLEVBQ3BDLE9BQWdDLEVBQ2hDLFFBQWtCLEVBQ2xCLGlCQUFvQyxFQUN4QixHQUFvQixFQUNSLEtBQXFDLEVBQ2pELGdCQUE2QyxFQUFFLGdCQUFnQjtJQUM3QyxTQUFlO1FBUnpELGdEQVNXLFdBQVcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLFdBc0JwRztRQS9Ca0IsV0FBSyxHQUFMLEtBQUssQ0FBc0I7UUFoQzlDLFFBQUUsR0FBRyxtQ0FBaUMsZ0JBQWdCLEVBQUksQ0FBQztRQUMzRCxpQkFBVyxHQUE4QixZQUFZLENBQUM7UUFlM0IsY0FBUSxHQUE2QixJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUU1RixvQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixxQkFBZSxHQUFHLEtBQUssQ0FBQztRQXdEaEMsb0JBQWMsR0FBRyxJQUFJLEdBQUcsRUFBVyxDQUFDO1FBakNqQywyREFBMkQ7UUFDNUQsS0FBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxLQUFJLENBQUMsQ0FBQztRQUU1RCxLQUFJLENBQUMsc0JBQXNCLEdBQUcsNEJBQTRCLENBQUM7UUFDM0QsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQyxLQUEwQjtZQUNqRCxJQUFJLENBQUMsS0FBSSxDQUFDLGNBQWMsRUFBRTtnQkFDeEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsbUJBQUEsS0FBSyxDQUFDLElBQUksRUFBa0MsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDNUc7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVILEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzs7OztRQUFFLFVBQUEsVUFBVTs7Z0JBQzNCLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYTtZQUNoQyxJQUFJLFVBQVUsRUFBRTtnQkFDZCxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2FBQ3BEO2lCQUFNO2dCQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7YUFDdkQ7WUFDRCxLQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUM1QixDQUFDLEVBQUMsQ0FBQztRQUVILEtBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDOztJQUNoQyxDQUFDOzZDQWhFVSxvQ0FBb0M7SUFJL0Msc0JBQWEsK0RBQWE7Ozs7UUFBMUIsY0FBd0MsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDckUsVUFBa0IsS0FBYztZQUM5QixLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDOUIsQ0FBQzs7O09BSm9FO0lBQUEsQ0FBQztJQVV0RSxzQkFBYSxnRUFBYztRQUozQjs7O1dBR0c7Ozs7OztRQUNILGNBQXlDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3ZFLFVBQW1CLEtBQWMsSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRHBCO0lBQUEsQ0FBQztJQVl4RSxzQkFBWSxvRkFBa0M7UUFEOUMsbURBQW1EOzs7Ozs7O1FBQ25EO1lBQ0UsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxZQUFZLEVBQU8sQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDN0YsQ0FBQzs7O09BQUE7SUFDRCxzQkFBWSwwRUFBd0I7Ozs7O1FBQXBDO1lBQ0UsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxZQUFZLEVBQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQztRQUNuRCxDQUFDOzs7T0FBQTtJQTJDRCxzQkFBSSxnRUFBYzs7OztRQUFsQixjQUFnRixPQUFPLG1CQUFBLElBQUksQ0FBQyxZQUFZLEVBQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBR2xILHNFQUFzRTs7Ozs7O0lBQ3RFLHNEQUFPOzs7Ozs7SUFBUCxVQUFRLElBQWEsSUFBVSxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMzRix5REFBVTs7OztJQUFWLFVBQVcsSUFBYSxJQUFhLE9BQU8sZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEcsZ0ZBQWdGO0lBQ2hGLHlCQUF5Qjs7Ozs7O0lBRXpCLHVEQUFROzs7Ozs7SUFBUjtRQUFBLGlCQUlDO1FBSEMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CO1FBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsU0FBUzs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixFQUFFLENBQUM7SUFDcEUsQ0FBQzs7OztJQUVELDBEQUFXOzs7SUFBWDtRQUNFLGlCQUFNLFdBQVcsV0FBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxlQUFlOzs7SUFBQyw0REFBYTs7O0lBQWI7UUFDZCxlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyx5QkFBeUI7UUFDN0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFFTyx3REFBUzs7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUNwQixRQUFRLEdBQUcsSUFBSSxDQUFDLHdCQUF3QjtRQUM5QyxRQUFRLENBQUMsT0FBTzs7Ozs7UUFBQyxVQUFDLE9BQU8sRUFBRSxLQUFLOzs7Z0JBQzlCLEtBQWdCLElBQUEsS0FBQSxpQkFBQSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBekMsSUFBTSxDQUFDLFdBQUE7b0JBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2lCQUN4Qjs7Ozs7Ozs7O1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7OztJQUVPLHFFQUFzQjs7OztJQUE5QjtRQUFBLGlCQThEQztRQTdETyxJQUFBLHNCQUF3QyxFQUF0Qyx3QkFBUyxFQUFFLGdCQUEyQjtRQUU5QyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUs7Ozs7OztRQUFHLFVBQUMsSUFBaUMsRUFBRSxRQUFnQixFQUFFLFFBQWdCOztnQkFDMUYsVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVO1lBQ2xDLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksVUFBVSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFOztvQkFDcEMsWUFBWSxHQUFHLEtBQUksQ0FBQyxXQUFXLEtBQUssWUFBWTtnQkFDdEQsUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEY7WUFDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUEsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUzs7Ozs7OztRQUFHLFVBQUMsSUFBaUMsRUFBRSxRQUFnQixFQUFFLFFBQWdCLEVBQUUsWUFBb0M7OztnQkFDcEksUUFBUSxHQUFHLEtBQUksQ0FBQyx3QkFBd0I7WUFDOUMsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSTs7OztZQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxFQUFFLENBQUM7O2dCQUNsRCxRQUFRLEdBQUcsS0FBSSxDQUFDLGtDQUFrQyxDQUFDLG1CQUFBLElBQUksRUFBMkMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQztZQUMzSSxJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDMUMsT0FBTzthQUNSOztnQkFDSyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRTs7Z0JBQzNCLFlBQVksR0FBRyxLQUFJLENBQUMsV0FBVyxLQUFLLFlBQVk7O2dCQUNoRCxvQkFBb0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO1lBRS9DLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUNuRCxPQUFPO2FBQ1I7OztnQkFHSyxzQkFBc0IsR0FBRyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJOztnQkFDN0QsWUFBWSxHQUFHLFFBQVEsQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQSxXQUFXLElBQUksT0FBQSxXQUFXLENBQUMsSUFBSSxLQUFLLHNCQUFzQixFQUEzQyxDQUEyQyxFQUFFOztnQkFDL0YsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQzs7Z0JBQ3hDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLEtBQUssQ0FBQzs7Z0JBQ3pGLEtBQXVCLElBQUEscUJBQUEsaUJBQUEsZ0JBQWdCLENBQUEsa0RBQUEsZ0ZBQUU7b0JBQXBDLElBQU0sUUFBUSw2QkFBQTtvQkFDakIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO3dCQUNqRSxPQUFPO3FCQUNSO2lCQUNGOzs7Ozs7Ozs7WUFFRCxnR0FBZ0c7WUFDaEcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3JGLE9BQU87YUFDUjtZQUVELFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUUxRSxLQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQztZQUUxQyxJQUFJLFlBQVksRUFBRTtnQkFDaEIsUUFBUSxDQUFDLE9BQU87Ozs7O2dCQUFDLFVBQUMsT0FBTyxFQUFFLEtBQUs7O29CQUM5QixvREFBb0Q7b0JBQ3BELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLE9BQU8sRUFBRTt3QkFDL0IsT0FBTztxQkFDUjs7d0JBRUQsS0FBZ0IsSUFBQSxLQUFBLGlCQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBLGdCQUFBLDRCQUFFOzRCQUF6QyxJQUFNLENBQUMsV0FBQTs0QkFDVixDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxpQkFBZSxPQUFPLENBQUMsTUFBTSxjQUFXLENBQUM7eUJBQzlEOzs7Ozs7Ozs7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQSxDQUFDO0lBQ0osQ0FBQzs7O2dCQTNJeUIsaUJBQWlCO2dCQUNuQix3QkFBd0I7Z0JBQzNCLFVBQVU7Z0JBQ1QsUUFBUTtnQkFDQyxpQkFBaUI7Z0JBQ2xCLGNBQWM7Z0JBQ0EsZ0JBQWdCO2dCQUNqQixnQkFBZ0I7Ozs7Z0JBeEQ1RCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBCQUEwQjtvQkFDcEMsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsTUFBTSxFQUFFO3dCQUNOLDBEQUEwRDtxQkFDM0Q7b0JBQ0QsSUFBSSxFQUFFOzt3QkFDSixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsTUFBTSxFQUFFLElBQUk7d0JBQ1osZ0NBQWdDLEVBQUUsMkJBQTJCO3dCQUM3RCxpQ0FBaUMsRUFBRSw0QkFBNEI7cUJBQ2hFO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLHNDQUFvQyxFQUFFO3FCQUM5RTtpQkFDRjs7OztnQkFqQ1EsaUJBQWlCO2dCQUEwQix3QkFBd0I7Z0JBN0IxRSxVQUFVO2dCQWdCVixRQUFRO2dCQWxCUixpQkFBaUI7Z0JBZVYsY0FBYyx1QkF3RlIsUUFBUTtnQkFoRnJCLGdCQUFnQix1QkFpRkgsUUFBUSxZQUFJLFFBQVE7Z0JBN0VqQyxnQkFBZ0IsdUJBOEVILFFBQVE7Z0RBQ1IsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFROzs7Z0NBckN2QyxLQUFLO2lDQVVMLEtBQUs7MkJBR0wsTUFBTSxTQUFDLGlCQUFpQjs7Ozs7SUFqQmQsb0NBQW9DO1FBakJoRCxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztpREFrRHpCLGlCQUFpQjtZQUNuQix3QkFBd0I7WUFDM0IsVUFBVTtZQUNULFFBQVE7WUFDQyxpQkFBaUI7WUFDbEIsY0FBYztZQUNBLGdCQUFnQjtZQUNqQixnQkFBZ0I7T0F4Q2hELG9DQUFvQyxDQTZLaEQ7SUFBRCwyQ0FBQztDQUFBLENBN0trRSxXQUFXLEdBNks3RTtTQTdLWSxvQ0FBb0M7OztJQUMvQyxrREFBMkQ7O0lBQzNELDJEQUFzRDs7SUFldEQsd0RBQW9HOzs7OztJQUVwRyw4REFBK0I7Ozs7O0lBQy9CLCtEQUFnQzs7Ozs7SUFDaEMsNkRBQStEOzs7OztJQUMvRCx3REFBMEQ7Ozs7O0lBQzFELDBEQUErRzs7Ozs7Ozs7SUFrRC9HLHNFQUErQjs7SUFFL0IsK0RBQXlDOztJQUN6Qyw4REFBb0M7O0lBM0N4QixxREFBa0M7Ozs7Ozs7QUE4SWhEO0lBVzBELHVEQUFVO0lBa0JsRSwwQ0FBMEM7SUFDMUMsMENBQTBDO0lBQzFDLHFDQUFZLE9BQWdDLEVBQ2UsYUFBMEIsRUFDdkQsU0FBYyxFQUNoQyxPQUFlLEVBQ2YsaUJBQW1DLEVBQ1YsTUFBcUIsRUFDOUMsSUFBb0IsRUFDcEIsUUFBa0IsRUFDbEIsa0JBQXFDLEVBRXpCLGFBQTRCLEVBQUUsZ0JBQWdCO0lBQzlDLGdCQUE0QztRQVhwRSxnREFZVyxPQUFPLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxXQVk3SjtRQTNDRCx5QkFBbUIsR0FBRyx1QkFBdUIsQ0FBQztRQTZFOUMsa0JBQVksR0FBRyxLQUFLLENBQUM7O1FBN0NuQixTQUFTO1FBQ1QsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixlQUFlO1FBQ2YsYUFBYTtRQUNiLHVCQUF1QjtRQUN2QixZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCx3QkFBd0I7UUFDeEIsS0FBSztJQUNQLENBQUM7SUF2Q0Qsc0JBQWlDLGdEQUFPOzs7OztRQUF4QyxVQUF5QyxLQUE0RztZQUNuSixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDOztnQkFDM0IsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOztnQkFDakYsTUFBTSxHQUFHLFVBQVUsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztZQUM3RCxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sSUFBSSxTQUFTLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTtJQXNDRCxzQkFBc0MsaUVBQXdCO1FBSjlELHVCQUF1QjtRQUN2Qjs7V0FFRzs7Ozs7OztRQUNILFVBQStELEtBQWE7O1lBQzFFLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNuQixDQUFBLEtBQUEsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQSxDQUFDLE1BQU0sNEJBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUU7aUJBQ3ZFO2dCQUNELElBQUksS0FBSyxFQUFFO29CQUNULENBQUEsS0FBQSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFBLENBQUMsR0FBRyw0QkFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFFO2lCQUMxRDthQUNGO1lBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxtREFBVTs7OztRQUFkLGNBQStELE9BQU8sbUJBQUEsSUFBSSxDQUFDLFFBQVEsRUFBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Ysc0JBQWEsb0RBQVc7Ozs7UUFBeEIsY0FBc0UsT0FBTyxtQkFBQSxJQUFJLENBQUMsYUFBYSxFQUEyQyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDN0ksVUFBZ0IsS0FBOEM7WUFDNUQsZ0ZBQWdGO1lBQ2hGLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztZQUMzQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDckQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQjtRQUNILENBQUM7OztPQVg0STs7OztJQWU3SSw4Q0FBUTs7O0lBQVIsY0FBbUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCx5R0FBeUc7Ozs7O0lBQ3pHLGlEQUFXOzs7OztJQUFYLGNBQXNCLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLGlCQUFNLFdBQVcsV0FBRSxDQUFDLENBQUMsQ0FBQztJQUMzRixxQkFBcUI7Ozs7O0lBRXJCLHFEQUFlOzs7O0lBQWY7UUFBQSxpQkFtQkM7UUFsQkMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELGlCQUFNLGVBQWUsV0FBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVM7OztRQUFFO1lBQzdCLElBQUEsK0JBQVc7WUFDbkIsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLGFBQWEsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3pFLGtFQUFrRTtnQkFDbEUsMkVBQTJFO2dCQUMzRSxpRUFBaUU7Z0JBQ2pFLEVBQUU7Z0JBQ0YsMEdBQTBHO2dCQUMxRyxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLEVBQUU7b0JBQ3pDLE9BQU8sS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQzdCO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUzs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxFQUE3QyxDQUE2QyxFQUFFLENBQUM7UUFDOUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQTlDLENBQThDLEVBQUUsQ0FBQztJQUMvRSxDQUFDOzs7O0lBRUQsOENBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRTtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDOzs7O0lBRUQsMkNBQUs7OztJQUFMOztRQUNFLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFOztnQkFDZCxLQUFpQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtvQkFBeEIsSUFBTSxFQUFFLFdBQUE7b0JBQ1gsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2lCQUN6Qjs7Ozs7Ozs7O1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7U0FDeEI7SUFDSCxDQUFDOztnQkFuSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLElBQUksRUFBRTs7d0JBQ0osT0FBTyxFQUFFLFVBQVU7d0JBQ25CLDJCQUEyQixFQUFFLHVCQUF1QjtxQkFDckQ7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUU7cUJBQy9EO2lCQUNGOzs7O2dCQXhQQyxVQUFVO2dCQXNCVixXQUFXLHVCQXdQRSxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVEsWUFBSSxRQUFRO2dEQUMzQyxNQUFNLFNBQUMsUUFBUTtnQkF0UTVCLE1BQU07Z0JBRE4sZ0JBQWdCO2dEQTBRSCxNQUFNLFNBQUMsZUFBZTtnQkFyUTVCLGNBQWM7Z0JBR3JCLFFBQVE7Z0JBbEJSLGlCQUFpQjtnQkE2QlYsYUFBYSx1QkE0UFAsUUFBUTtnQkE5UHJCLGdCQUFnQix1QkErUEgsUUFBUTs7OzBCQTFCcEIsS0FBSyxTQUFDLG9CQUFvQjsyQ0E2QzFCLEtBQUssU0FBQyx5QkFBeUI7OEJBYy9CLEtBQUs7O0lBeURSLGtDQUFDO0NBQUEsQUFwSUQsQ0FXMEQsT0FBTyxHQXlIaEU7U0F6SFksMkJBQTJCOzs7SUFDdEMsMERBQThDOztJQUU5Qyw2Q0FBa0I7Ozs7O0lBV2xCLCtDQUF1SDs7Ozs7SUFDdkgsaURBQTZDOzs7OztJQUM3Qyw0Q0FBNkI7O0lBNkQ3QixpREFBbUI7O0lBQ25CLG1EQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW91dHB1dC1yZW5hbWVcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBTa2lwU2VsZixcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIERyYWdEcm9wLFxuICBDZGtEcmFnLFxuICBDZGtEcmFnRHJvcCxcbiAgQ0RLX0RST1BfTElTVCxcbiAgRHJhZ1JlZixcbiAgQ2RrRHJvcExpc3RHcm91cCxcbiAgQ2RrRHJvcExpc3QsXG4gIENES19EUkFHX0NPTkZJRyxcbiAgRHJhZ1JlZkNvbmZpZyxcbiAgRHJhZ0Ryb3BSZWdpc3RyeSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBOZ3JpZFBsdWdpbiwgUGJsQ29sdW1uLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNka0Ryb3BMaXN0LCBjZGtEcmFnIH0gZnJvbSAnLi4vdjctY29tcGF0JztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcbmltcG9ydCB7IGV4dGVuZEdyaWQgfSBmcm9tICcuL2V4dGVuZC1ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNvbHVtblJlb3JkZXI/OiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjb2x1bW5SZW9yZGVyJyA9ICdjb2x1bW5SZW9yZGVyJztcblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ATmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgcnVuT25jZTogZXh0ZW5kR3JpZCB9KVxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW2NvbHVtblJlb3JkZXJdJyxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZENvbHVtblJlb3JkZXInLFxuICBpbnB1dHM6IFtcbiAgICAnZGlyZWN0Q29udGFpbmVyRWxlbWVudDpjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnXG4gIF0sXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyb3AtbGlzdCcsXG4gICAgJ1tpZF0nOiAnaWQnLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1kcmFnZ2luZ10nOiAnX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKScsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LXJlY2VpdmluZ10nOiAnX2Ryb3BMaXN0UmVmLmlzUmVjZWl2aW5nKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmUgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgQ2RrTGF6eURyb3BMaXN0PFQsIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4ge1xuICBpZCA9IGBwYmwtbmdyaWQtY29sdW1uLXJlb3JkZXItbGlzdC0ke191bmlxdWVJZENvdW50ZXIrK31gO1xuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBASW5wdXQoKSBnZXQgY29sdW1uUmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NvbHVtblJlb3JkZXI7IH07XG4gIHNldCBjb2x1bW5SZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX2NvbHVtblJlb3JkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIHdpbGwgbm90IG1vdmUgdGhlIGNvbHVtbiBvbiBkcm9wLlxuICAgKiBJbnN0ZWFkIHlvdSBuZWVkIHRvIGhhbmRsZSB0aGUgZHJvcHBlZCBldmVudC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBtYW51YWxPdmVycmlkZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX21hbnVhbE92ZXJyaWRlOyB9O1xuICBzZXQgbWFudWFsT3ZlcnJpZGUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fbWFudWFsT3ZlcnJpZGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgQE91dHB1dCgnY2RrRHJvcERyYWdnaW5nJykgZHJhZ2dpbmc6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIHByaXZhdGUgX2NvbHVtblJlb3JkZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWFudWFsT3ZlcnJpZGUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgbGFzdFN3YXA6IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PjtcbiAgcHJpdmF0ZSBsYXN0U29ydGVkOiB7IGRyYWc6IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+Pjsgb2Zmc2V0OiBudW1iZXI7IGNsaWVudFJlY3Q6IENsaWVudFJlY3Q7IH07XG5cbiAgLy8gU3R1ZmYgdG8gd29ya2Fyb3VuZCBlbmNhcHN1bGF0aW9uIGluIENka0Ryb3BMaXN0XG4gIHByaXZhdGUgZ2V0IHBibEdldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24oKTogKGl0ZW06IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PiwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlciwgZGVsdGE/OiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KSA9PiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5fZHJvcExpc3RSZWYgYXMgYW55KS5fZ2V0SXRlbUluZGV4RnJvbVBvaW50ZXJQb3NpdGlvbi5iaW5kKHRoaXMuX2Ryb3BMaXN0UmVmKTtcbiAgfVxuICBwcml2YXRlIGdldCBwYmxHZXRQb3NpdGlvbkNhY2hlSXRlbXMoKTogeyBkcmFnOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47IG9mZnNldDogbnVtYmVyOyBjbGllbnRSZWN0OiBDbGllbnRSZWN0OyB9W10ge1xuICAgIHJldHVybiAodGhpcy5fZHJvcExpc3RSZWYgYXMgYW55KS5faXRlbVBvc2l0aW9ucztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD4sXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI/OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZ3JvdXA/OiBDZGtEcm9wTGlzdEdyb3VwPENka0Ryb3BMaXN0PixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeT86IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCAvLyBmb3IgdjcgY29tcGF0XG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudD86IGFueSkge1xuICAgIHN1cGVyKC4uLmNka0Ryb3BMaXN0KGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCwgZHJhZ0Ryb3BSZWdpc3RyeSwgX2RvY3VtZW50KSk7XG4gICAgIC8vIHN1cGVyKGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQgPSAnLnBibC1uZ3JpZC1oZWFkZXItcm93LW1haW4nO1xuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ0Ryb3A8VCwgYW55PikgPT4ge1xuICAgICAgaWYgKCF0aGlzLm1hbnVhbE92ZXJyaWRlKSB7XG4gICAgICAgIHRoaXMudGFibGUuY29sdW1uQXBpLm1vdmVDb2x1bW4oKGV2ZW50Lml0ZW0gYXMgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+KS5jb2x1bW4sIGV2ZW50LmN1cnJlbnRJbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmRyYWdnaW5nLnN1YnNjcmliZSggaXNEcmFnZ2luZyA9PiB7XG4gICAgICBjb25zdCBlbCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICAgIGlmIChpc0RyYWdnaW5nKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jb2x1bW4tbGlzdC1kcmFnZ2luZycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNvbHVtbi1saXN0LWRyYWdnaW5nJyk7XG4gICAgICB9XG4gICAgICB0aGlzLmxhc3RTd2FwID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tb25rZXlQYXRjaERyb3BMaXN0UmVmKCk7XG4gIH1cblxuICAvKiBDZGtMYXp5RHJvcExpc3Qgc3RhcnQgKi9cbiAgLyoqXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXG4gICAqIHRoZSBgY2RrRHJvcExpc3RgIGVsZW1lbnQgYW5kIGdvaW5nIGRvd24gdGhlIERPTS4gUGFzc2luZyBhbiBhbHRlcm5hdGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50XG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cbiAgICovXG4gIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZztcbiAgZ2V0IHBibERyb3BMaXN0UmVmKCk6IFBibERyb3BMaXN0UmVmPFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XG4gIG9yaWdpbmFsRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xuICAvLyBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIGFkZERyYWcoZHJhZzogQ2RrRHJhZyk6IHZvaWQgeyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5hZGREcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgcmVtb3ZlRHJhZyhkcmFnOiBDZGtEcmFnKTogYm9vbGVhbiB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLnJlbW92ZURyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxuICAvLyBiZWZvcmVTdGFydGVkKCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmJlZm9yZVN0YXJ0ZWQuY2FsbCh0aGlzKTsgfVxuICAvKiBDZGtMYXp5RHJvcExpc3QgZW5kICovXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyAvLyBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIGUgPT4gdGhpcy5fcGJsUmVzZXQoKSApO1xuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuYmVmb3JlRXhpdC5zdWJzY3JpYmUoIGUgPT4gdGhpcy5fcGJsUmVzZXQoKSApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICAvKiBwcm90ZWN0ZWQgKi8gYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHtcbiAgICBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmJlZm9yZVN0YXJ0ZWQuY2FsbCh0aGlzKTsgLy8gc3VwZXIuYmVmb3JlU3RhcnRlZCgpO1xuICAgIHRoaXMubGFzdFNvcnRlZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRyYWdnaW5nLm5leHQodHJ1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9wYmxSZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLmRyYWdnaW5nLm5leHQoZmFsc2UpO1xuICAgIGNvbnN0IHNpYmxpbmdzID0gdGhpcy5wYmxHZXRQb3NpdGlvbkNhY2hlSXRlbXM7XG4gICAgc2libGluZ3MuZm9yRWFjaCgoc2libGluZywgaW5kZXgpID0+IHtcbiAgICAgIGZvciAoY29uc3QgYyBvZiBzaWJsaW5nLmRyYWcuZGF0YS5nZXRDZWxscygpKSB7XG4gICAgICAgIGMuc3R5bGUudHJhbnNmb3JtID0gYGA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG1vbmtleVBhdGNoRHJvcExpc3RSZWYoKTogdm9pZCB7XG4gICAgY29uc3QgeyBfc29ydEl0ZW0sIGVudGVyIH0gPSB0aGlzLl9kcm9wTGlzdFJlZjtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuZW50ZXIgPSAoaXRlbTogUGFyYW1ldGVyczx0eXBlb2YgZW50ZXI+WzBdLCBwb2ludGVyWDogbnVtYmVyLCBwb2ludGVyWTogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBsYXN0U29ydGVkID0gdGhpcy5sYXN0U29ydGVkXG4gICAgICB0aGlzLmxhc3RTb3J0ZWQgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAobGFzdFNvcnRlZCAmJiBsYXN0U29ydGVkLmRyYWcgPT09IGl0ZW0pIHtcbiAgICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgICBwb2ludGVyWCA9IGxhc3RTb3J0ZWQuY2xpZW50UmVjdC5sZWZ0ICsgMSAtIChpc0hvcml6b250YWwgPyBsYXN0U29ydGVkLm9mZnNldCA6IDApO1xuICAgICAgICBwb2ludGVyWSA9IGxhc3RTb3J0ZWQuY2xpZW50UmVjdC50b3AgKyAxIC0gKCFpc0hvcml6b250YWwgPyBsYXN0U29ydGVkLm9mZnNldCA6IDApO1xuICAgICAgfVxuICAgICAgZW50ZXIuY2FsbCh0aGlzLl9kcm9wTGlzdFJlZiwgaXRlbSwgcG9pbnRlclgsIHBvaW50ZXJZKTtcbiAgICB9O1xuXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5fc29ydEl0ZW0gPSAoaXRlbTogUGFyYW1ldGVyczx0eXBlb2YgZW50ZXI+WzBdLCBwb2ludGVyWDogbnVtYmVyLCBwb2ludGVyWTogbnVtYmVyLCBwb2ludGVyRGVsdGE6IHt4OiBudW1iZXIsIHk6IG51bWJlcn0pOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IHNpYmxpbmdzID0gdGhpcy5wYmxHZXRQb3NpdGlvbkNhY2hlSXRlbXM7XG4gICAgICB0aGlzLmxhc3RTb3J0ZWQgPSBzaWJsaW5ncy5maW5kKCBzID0+IHMuZHJhZyA9PT0gaXRlbSApO1xuICAgICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLnBibEdldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24oaXRlbSBhcyBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4sIHBvaW50ZXJYLCBwb2ludGVyWSwgcG9pbnRlckRlbHRhKTtcbiAgICAgIGlmIChuZXdJbmRleCA9PT0gLTEgJiYgc2libGluZ3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRPcmRlciA9IHNpYmxpbmdzLnNsaWNlKCk7XG4gICAgICBjb25zdCBpc0hvcml6b250YWwgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICBjb25zdCBzaWJsaW5nQXROZXdQb3NpdGlvbiA9IHNpYmxpbmdzW25ld0luZGV4XTtcblxuICAgICAgaWYgKHNpYmxpbmdBdE5ld1Bvc2l0aW9uLmRyYWcuZGF0YS5jb2x1bW4ud29udEJ1ZGdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gd2Ugbm93IG5lZWQgdG8gZmluZCBpZiBiZXR3ZWVuIGN1cnJlbnQgYW5kIG5ldyBwb3NpdGlvbiB0aGVyZSBhcmUgaXRlbXMgd2l0aCBgd29udEJ1ZGdlYFxuICAgICAgY29uc3QgaXRlbUF0T3JpZ2luYWxQb3NpdGlvbiA9IHRoaXMubGFzdFN3YXAgPyB0aGlzLmxhc3RTd2FwIDogaXRlbTtcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHNpYmxpbmdzLmZpbmRJbmRleCggY3VycmVudEl0ZW0gPT4gY3VycmVudEl0ZW0uZHJhZyA9PT0gaXRlbUF0T3JpZ2luYWxQb3NpdGlvbiApO1xuICAgICAgY29uc3Qgc3RhcnQgPSBNYXRoLm1pbihuZXdJbmRleCwgY3VycmVudEluZGV4KVxuICAgICAgY29uc3QgaXRlbXNEcmFnZ2VkT3ZlciA9IHNpYmxpbmdzLnNsaWNlKHN0YXJ0LCBNYXRoLmFicyhuZXdJbmRleCAtIGN1cnJlbnRJbmRleCkgKyBzdGFydCk7XG4gICAgICBmb3IgKGNvbnN0IGRyYWdJdGVtIG9mIGl0ZW1zRHJhZ2dlZE92ZXIpIHtcbiAgICAgICAgaWYgKGRyYWdJdGVtLmRyYWcuZGF0YS5jb2x1bW4ud29udEJ1ZGdlICYmIGRyYWdJdGVtLmRyYWcgIT09IGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgaWYgd2UgbW92ZSB0aGUgaXRlbSBvdXRzaWRlIG9mIGxvY2tlZCBncm91cCBPUiBpbnRvIGEgbG9ja2VkIGdyb3VwLi4uIGJvdGggYXJlIGludmFsaWQuXG4gICAgICBpZiAoIWl0ZW0uZGF0YS5jb2x1bW4uY2hlY2tHcm91cExvY2tDb25zdHJhaW50KHNpYmxpbmdBdE5ld1Bvc2l0aW9uLmRyYWcuZGF0YS5jb2x1bW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgX3NvcnRJdGVtLmNhbGwodGhpcy5fZHJvcExpc3RSZWYsIGl0ZW0sIHBvaW50ZXJYLCBwb2ludGVyWSwgcG9pbnRlckRlbHRhKTtcblxuICAgICAgdGhpcy5sYXN0U3dhcCA9IHNpYmxpbmdBdE5ld1Bvc2l0aW9uLmRyYWc7XG5cbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgc2libGluZ3MuZm9yRWFjaCgoc2libGluZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAvLyBEb24ndCBkbyBhbnl0aGluZyBpZiB0aGUgcG9zaXRpb24gaGFzbid0IGNoYW5nZWQuXG4gICAgICAgICAgaWYgKG9sZE9yZGVyW2luZGV4XSA9PT0gc2libGluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZvciAoY29uc3QgYyBvZiBzaWJsaW5nLmRyYWcuZGF0YS5nZXRDZWxscygpKSB7XG4gICAgICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3NpYmxpbmcub2Zmc2V0fXB4LCAwLCAwKWA7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZENvbHVtbkRyYWddJyxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZENvbHVtbkRyYWcnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnJyxcbiAgICAnW2NsYXNzLmNkay1kcmFnLWRyYWdnaW5nXSc6ICdfZHJhZ1JlZi5pc0RyYWdnaW5nKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka0RyYWcsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmUgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0RyYWc8VD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDZGtMYXp5RHJhZzxULCBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4sIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4ge1xuICByb290RWxlbWVudFNlbGVjdG9yID0gJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCc7XG5cbiAgY29sdW1uOiBQYmxDb2x1bW47XG5cbiAgQElucHV0KCdwYmxOZ3JpZENvbHVtbkRyYWcnKSBzZXQgY29udGV4dCh2YWx1ZTogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj4pIHtcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XG4gICAgdGhpcy5jb2x1bW4gPSB2YWx1ZSAmJiB2YWx1ZS5jb2w7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IHRoaXMucGx1Z2luQ3RybCA9IHZhbHVlICYmIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHZhbHVlLmdyaWQpO1xuICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbkN0cmwgJiYgcGx1Z2luQ3RybC5nZXRQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgdGhpcy5jZGtEcm9wTGlzdCA9IHBsdWdpbiB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuY29sdW1uICYmIHRoaXMuY29sdW1uLnJlb3JkZXIgPyBmYWxzZSA6IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9jb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PlxuICBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjtcbiAgcHJpdmF0ZSBjYWNoZTogSFRNTEVsZW1lbnRbXTtcblxuICAvLyBDVE9SIElTIFJFUVVJUkVEIE9SIElUIFdPTlQgV09SSyBJTiBBT1RcbiAgLy8gVE9ETzogVHJ5IHRvIHJlbW92ZSB3aGVuIHN1cHBvcnRpbmcgSVZZXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUk9QX0xJU1QpIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGRyb3BDb250YWluZXI6IENka0Ryb3BMaXN0LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgICAgICAgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJBR19DT05GSUcpIGNvbmZpZzogRHJhZ1JlZkNvbmZpZyxcbiAgICAgICAgICAgICAgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcblxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLCAvLyBmb3IgdjcgY29tcGF0XG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk6IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCkge1xuICAgIHN1cGVyKC4uLmNka0RyYWcoZWxlbWVudCwgZHJvcENvbnRhaW5lciwgX2RvY3VtZW50LCBfbmdab25lLCBfdmlld0NvbnRhaW5lclJlZiwgY29uZmlnLCBfZGlyLCBkcmFnRHJvcCwgX2NoYW5nZURldGVjdG9yUmVmLCB2aWV3cG9ydFJ1bGVyLCBkcmFnRHJvcFJlZ2lzdHJ5KSk7XG4gICAgLy8gc3VwZXIoXG4gICAgLy8gICBlbGVtZW50LFxuICAgIC8vICAgZHJvcENvbnRhaW5lcixcbiAgICAvLyAgIF9kb2N1bWVudCxcbiAgICAvLyAgIF9uZ1pvbmUsXG4gICAgLy8gICBfdmlld0NvbnRhaW5lclJlZixcbiAgICAvLyAgIGNvbmZpZyxcbiAgICAvLyAgIF9kaXIsXG4gICAgLy8gICBkcmFnRHJvcCxcbiAgICAvLyAgIF9jaGFuZ2VEZXRlY3RvclJlZixcbiAgICAvLyApO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyYWcgc3RhcnQgKi9cbiAgLyoqXG4gICAqIEEgY2xhc3MgdG8gc2V0IHdoZW4gdGhlIHJvb3QgZWxlbWVudCBpcyBub3QgdGhlIGhvc3QgZWxlbWVudC4gKGkuZS4gd2hlbiBgY2RrRHJhZ1Jvb3RFbGVtZW50YCBpcyB1c2VkKS5cbiAgICovXG4gIEBJbnB1dCgnY2RrRHJhZ1Jvb3RFbGVtZW50Q2xhc3MnKSBzZXQgcm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzKHZhbHVlOiBzdHJpbmcpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvb3RDbGFzcyAmJiB0aGlzLl9ob3N0Tm90Um9vdCkge1xuICAgICAgaWYgKHRoaXMuX3Jvb3RDbGFzcykge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSguLi50aGlzLl9yb290Q2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICB9XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoLi4udmFsdWUuc3BsaXQoJyAnKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3Jvb3RDbGFzcyA9IHZhbHVlO1xuICB9XG5cbiAgZ2V0IHBibERyYWdSZWYoKTogUGJsRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+IHsgcmV0dXJuIHRoaXMuX2RyYWdSZWYgYXMgYW55OyB9XG5cbiAgQElucHV0KCkgZ2V0IGNka0Ryb3BMaXN0KCk6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPiB7IHJldHVybiB0aGlzLmRyb3BDb250YWluZXIgYXMgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+OyB9XG4gIHNldCBjZGtEcm9wTGlzdCh2YWx1ZTogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+KSB7XG4gICAgLy8gVE8gU1VQUE9SVCBgY2RrRHJvcExpc3RgIHZpYSBzdHJpbmcgaW5wdXQgKElEKSB3ZSBuZWVkIGEgcmVhY3RpdmUgcmVnaXN0cnkuLi5cbiAgICBpZiAodGhpcy5jZGtEcm9wTGlzdCkge1xuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLmRyb3BDb250YWluZXIgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX2RyYWdSZWYuX3dpdGhEcm9wQ29udGFpbmVyKHZhbHVlLl9kcm9wTGlzdFJlZik7XG4gICAgICB2YWx1ZS5hZGREcmFnKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIF9yb290Q2xhc3M6IHN0cmluZztcbiAgX2hvc3ROb3RSb290ID0gZmFsc2U7XG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICAvLyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ0FmdGVyVmlld0luaXQuY2FsbCh0aGlzKTsgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7IH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uRGVzdHJveS5jYWxsKHRoaXMpOyAgc3VwZXIubmdPbkRlc3Ryb3koKTsgfVxuICAvKiBDZGtMYXp5RHJhZyBlbmQgKi9cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpO1xuICAgIHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpO1xuXG4gICAgdGhpcy5fZHJhZ1JlZi5iZWZvcmVTdGFydGVkLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgY29uc3QgeyBjZGtEcm9wTGlzdCB9ID0gdGhpcztcbiAgICAgIGlmIChjZGtEcm9wTGlzdCAmJiBjZGtEcm9wTGlzdC5jb2x1bW5SZW9yZGVyICYmIHRoaXMuX2NvbnRleHQuY29sLnJlb3JkZXIpIHtcbiAgICAgICAgLy8gd2UgZG9uJ3QgYWxsb3cgYSBuZXcgZHJhZ2dpbmcgc2Vzc2lvbiBiZWZvcmUgdGhlIHByZXZpb3VzIGVuZHMuXG4gICAgICAgIC8vIHRoaXMgc291bmQgaW1wb3NzaWJsZSwgYnV0IGR1ZSB0byBhbmltYXRpb24gdHJhbnNpdGlvbnMgaXRzIGFjdHVhbGx5IGlzLlxuICAgICAgICAvLyBpZiB0aGUgYHRyYW5zaXRpb25lbmRgIGlzIGxvbmcgZW5vdWdoLCBhIG5ldyBkcmFnIGNhbiBzdGFydC4uLlxuICAgICAgICAvL1xuICAgICAgICAvLyB0aGUgYGRpc2FibGVkYCBzdGF0ZSBpcyBjaGVja2VkIGJ5IHBvaW50ZXJEb3duIEFGVEVSIGNhbGxpbmcgYmVmb3JlIHN0YXJ0IHNvIHdlIGNhbiBjYW5jZWwgdGhlIHN0YXJ0Li4uXG4gICAgICAgIGlmIChjZGtEcm9wTGlzdC5fZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zdGFydGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSB0cnVlICk7XG4gICAgdGhpcy5lbmRlZC5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2NvbnRleHQuY29sLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gZmFsc2UgKTtcbiAgfVxuXG4gIGdldENlbGxzKCk6IEhUTUxFbGVtZW50W10ge1xuICAgIGlmICghdGhpcy5jYWNoZSkge1xuICAgICAgdGhpcy5jYWNoZSA9IHRoaXMuX2NvbnRleHQuY29sLmNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cygndGFibGUnKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FjaGU7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICBzdXBlci5yZXNldCgpO1xuICAgIGlmICh0aGlzLmNhY2hlKSB7XG4gICAgICBmb3IgKGNvbnN0IGVsIG9mIHRoaXMuY2FjaGUpIHtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNmb3JtID0gYGA7XG4gICAgICB9XG4gICAgICB0aGlzLmNhY2hlID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19