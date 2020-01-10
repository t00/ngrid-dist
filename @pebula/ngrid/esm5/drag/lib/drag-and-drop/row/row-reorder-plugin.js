/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Directive, ElementRef, Input, Inject, OnDestroy, Optional, SkipSelf, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDropList, CdkDropListGroup, DragDropRegistry, CdkDrag, CDK_DROP_LIST, CDK_DRAG_CONFIG, DragRefConfig, CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, NgridPlugin, PblNgridPluginController, PblNgridCellContext } from '@pebula/ngrid';
import { cdkDropList, cdkDrag } from '../v7-compat';
import { CdkLazyDropList, CdkLazyDrag } from '../core/lazy-drag-drop';
/** @type {?} */
var PLUGIN_KEY = 'rowReorder';
/** @type {?} */
var _uniqueIdCounter = 0;
var ɵ0 = undefined;
/**
 * @template T
 */
var PblNgridRowReorderPluginDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridRowReorderPluginDirective, _super);
    function PblNgridRowReorderPluginDirective(grid, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
        _this.grid = grid;
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
            var previousIndex = grid.ds.source.indexOf(item.draggedContext.row);
            /** @type {?} */
            var currentIndex = event.currentIndex + grid.ds.renderStart;
            _this.grid.contextApi.clear();
            _this.grid.ds.moveItem(previousIndex, currentIndex, true);
            _this.grid._cdkTable.syncRows('data');
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
            value = coerceBooleanProperty(value);
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
        this._removePlugin(this.grid);
    };
    var PblNgridRowReorderPluginDirective_1;
    PblNgridRowReorderPluginDirective.ctorParameters = function () { return [
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
    PblNgridRowReorderPluginDirective.decorators = [
        { type: Directive, args: [{
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
                        '[class.pbl-row-reorder]': 'rowReorder && !this.grid.ds?.sort.sort?.order && !this.grid.ds?.filter?.filter',
                    },
                    providers: [
                        { provide: CdkDropListGroup, useValue: ɵ0 },
                        { provide: CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective_1 },
                    ],
                },] }
    ];
    /** @nocollapse */
    PblNgridRowReorderPluginDirective.ctorParameters = function () { return [
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
    PblNgridRowReorderPluginDirective.propDecorators = {
        rowReorder: [{ type: Input }]
    };
    /**
     * @template T
     */
    PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective_1 = tslib_1.__decorate([
        NgridPlugin({ id: PLUGIN_KEY }),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
            PblNgridPluginController,
            ElementRef,
            DragDrop,
            ChangeDetectorRef,
            Directionality,
            CdkDropListGroup,
            DragDropRegistry, Object])
    ], PblNgridRowReorderPluginDirective);
    return PblNgridRowReorderPluginDirective;
}(CdkDropList));
export { PblNgridRowReorderPluginDirective };
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
    PblNgridRowReorderPluginDirective.prototype.grid;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
var PblNgridRowDragDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridRowDragDirective, _super);
    // CTOR IS REQUIRED OR IT WONT WORK IN AOT
    // TODO: Try to remove when supporting IVY
    function PblNgridRowDragDirective(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
    dragDropRegistry) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry))) || this;
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
            var _a = _this._context, col = _a.col, row = _a.row, grid = _a.grid, value = _a.value;
            _this._draggedContext = { col: col, row: row, grid: grid, value: value };
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
            var pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.grid);
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
        { type: Directive, args: [{
                    selector: '[pblNgridRowDrag]',
                    exportAs: 'pblNgridRowDrag',
                    host: {
                        // tslint:disable-line:use-host-property-decorator
                        'class': 'cdk-drag',
                        '[class.cdk-drag-dragging]': '_dragRef.isDragging()',
                    },
                    providers: [
                        { provide: CdkDrag, useExisting: PblNgridRowDragDirective }
                    ]
                },] }
    ];
    /** @nocollapse */
    PblNgridRowDragDirective.ctorParameters = function () { return [
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
    PblNgridRowDragDirective.propDecorators = {
        context: [{ type: Input, args: ['pblNgridRowDrag',] }],
        rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
        cdkDropList: [{ type: Input }]
    };
    return PblNgridRowDragDirective;
}(CdkDrag));
export { PblNgridRowDragDirective };
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsZUFBZSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUMxRCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBVWhFLFVBQVUsR0FBaUIsWUFBWTs7SUFFekMsZ0JBQWdCLEdBQUcsQ0FBQztTQWlCbUIsU0FBUzs7Ozs7SUFJWSw2REFBYztJQWE1RSwyQ0FBbUIsSUFBMEIsRUFDakMsVUFBb0MsRUFDcEMsT0FBZ0MsRUFDaEMsUUFBa0IsRUFDbEIsaUJBQW9DLEVBQ3hCLEdBQW9CLEVBQ1IsS0FBcUMsRUFDakQsZ0JBQTZDLEVBQUUsZ0JBQWdCO0lBQzdDLFNBQWU7UUFSekQsZ0RBU1csV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsV0FjcEc7UUF2QmtCLFVBQUksR0FBSixJQUFJLENBQXNCO1FBWDdDLFFBQUUsR0FBRyxnQ0FBOEIsZ0JBQWdCLEVBQUksQ0FBQztRQVFoRCxpQkFBVyxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7UUFtQzVCLDRCQUFzQixHQUFXLDZCQUE2QixDQUFDLENBQUMsb0NBQW9DO1FBR3BHLG9CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVcsQ0FBQztRQXpCbEMsMkRBQTJEO1FBQzNELEtBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsS0FBSSxDQUFDLENBQUM7UUFFNUQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQyxLQUFxQjs7Z0JBQ3RDLElBQUksR0FBRyxtQkFBQSxLQUFLLENBQUMsSUFBSSxFQUErQjs7Z0JBRWhELGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7O2dCQUMvRCxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVc7WUFFN0QsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0IsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekQsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsRUFBQyxDQUFDOztJQUNMLENBQUM7MENBcENVLGlDQUFpQztJQUk1QyxzQkFBYSx5REFBVTs7OztRQUF2QixjQUFxQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztRQUMvRCxVQUFlLEtBQWM7WUFDM0IsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7OztPQUo4RDtJQUFBLENBQUM7SUEwQ2hFLHNCQUFJLDZEQUFjOzs7Ozs7UUFBbEIsY0FBNEMsT0FBTyxtQkFBQSxJQUFJLENBQUMsWUFBWSxFQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7OztJQUc5RSxvREFBUTs7O0lBQVIsY0FBbUIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDbkUsbURBQU87Ozs7SUFBUCxVQUFRLElBQWEsSUFBVSxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMzRixzREFBVTs7OztJQUFWLFVBQVcsSUFBYSxJQUFhLE9BQU8sZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDcEcseURBQWE7OztJQUFiLGNBQXdCLGVBQWUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0UseUJBQXlCOzs7OztJQUV6Qix1REFBVzs7OztJQUFYO1FBQ0UsaUJBQU0sV0FBVyxXQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7O2dCQTdDd0IsaUJBQWlCO2dCQUNsQix3QkFBd0I7Z0JBQzNCLFVBQVU7Z0JBQ1QsUUFBUTtnQkFDQyxpQkFBaUI7Z0JBQ2xCLGNBQWM7Z0JBQ0EsZ0JBQWdCO2dCQUNqQixnQkFBZ0I7Ozs7Z0JBdEM1RCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsTUFBTSxFQUFFO3dCQUNOLDBEQUEwRDtxQkFDM0Q7b0JBQ0QsSUFBSSxFQUFFOzt3QkFDSixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsTUFBTSxFQUFFLElBQUk7d0JBQ1osZ0NBQWdDLEVBQUUsMkJBQTJCO3dCQUM3RCxpQ0FBaUMsRUFBRSw0QkFBNEI7d0JBQy9ELHlCQUF5QixFQUFFLGdGQUFnRjtxQkFDNUc7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsSUFBVyxFQUFFO3dCQUNsRCxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLG1DQUFpQyxFQUFFO3FCQUMzRTtpQkFDRjs7OztnQkFsQ1EsaUJBQWlCO2dCQUFlLHdCQUF3QjtnQkF4Qi9ELFVBQVU7Z0JBY1YsUUFBUTtnQkFoQlIsaUJBQWlCO2dCQWFWLGNBQWMsdUJBa0VSLFFBQVE7Z0JBN0RyQixnQkFBZ0IsdUJBOERILFFBQVEsWUFBSSxRQUFRO2dCQTdEakMsZ0JBQWdCLHVCQThESCxRQUFRO2dEQUNSLFFBQVEsWUFBSSxNQUFNLFNBQUMsUUFBUTs7OzZCQWpCdkMsS0FBSzs7Ozs7SUFKSyxpQ0FBaUM7UUFuQjdDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztpREFnQ0wsaUJBQWlCO1lBQ2xCLHdCQUF3QjtZQUMzQixVQUFVO1lBQ1QsUUFBUTtZQUNDLGlCQUFpQjtZQUNsQixjQUFjO1lBQ0EsZ0JBQWdCO1lBQ2pCLGdCQUFnQjtPQXBCaEQsaUNBQWlDLENBMkQ3QztJQUFELHdDQUFDO0NBQUEsQ0EzRCtELFdBQVcsR0EyRDFFO1NBM0RZLGlDQUFpQzs7O0lBRTVDLCtDQUF3RDs7Ozs7SUFReEQsd0RBQTRCOzs7OztJQUM1QiwwREFBOEQ7Ozs7Ozs7O0lBa0M5RCxtRUFBK0Q7O0lBRS9ELDREQUF5Qzs7SUFDekMsMkRBQW9DOztJQW5DeEIsaURBQWlDOzs7Ozs7QUFnRC9DO0lBV3VELG9EQUFVO0lBK0IvRCwwQ0FBMEM7SUFDMUMsMENBQTBDO0lBQzFDLGtDQUFZLE9BQWdDLEVBQ2UsYUFBMEIsRUFDdkQsU0FBYyxFQUNoQyxPQUFlLEVBQ2YsaUJBQW1DLEVBQ1YsTUFBcUIsRUFDOUMsSUFBb0IsRUFDcEIsUUFBa0IsRUFDbEIsa0JBQXFDLEVBRXpCLGFBQTRCLEVBQUUsZ0JBQWdCO0lBQzlDLGdCQUE0QztRQVhwRSxnREFZVyxPQUFPLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxXQW1CN0o7UUEvREQseUJBQW1CLEdBQUcsZUFBZSxDQUFDO1FBaUd0QyxrQkFBWSxHQUFHLEtBQUssQ0FBQztRQXBEbkIsU0FBUztRQUNULGFBQWE7UUFDYixtQkFBbUI7UUFDbkIsZUFBZTtRQUNmLGFBQWE7UUFDYix1QkFBdUI7UUFDdkIsWUFBWTtRQUNaLFVBQVU7UUFDVixjQUFjO1FBQ2Qsd0JBQXdCO1FBQ3hCLEtBQUs7UUFFTCxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVM7Ozs7UUFBRSxVQUFDLEtBQW1CO1lBQ3BDLElBQUEsbUJBQTBDLEVBQXhDLFlBQUcsRUFBRSxZQUFHLEVBQUUsY0FBSSxFQUFFLGdCQUF3QjtZQUNoRCxLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsR0FBRyxLQUFBLEVBQUUsR0FBRyxLQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQztRQUNuRCxDQUFDLEVBQUMsQ0FBQzs7SUFHTCxDQUFDO0lBN0RELHNCQUFJLDZDQUFPOzs7O1FBQVg7WUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzs7Ozs7UUFFRCxVQUFzQyxLQUE0RztZQUNoSixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQzs7Z0JBRWhCLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Z0JBQ2pGLE1BQU0sR0FBRyxVQUFVLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7WUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLElBQUksU0FBUyxDQUFDO1FBQ3pDLENBQUM7OztPQVJBO0lBaUJELHNCQUFJLG9EQUFjO1FBUGxCOzs7Ozs7V0FNRzs7Ozs7Ozs7O1FBQ0g7WUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUE4Q0Qsc0JBQXNDLDhEQUF3QjtRQUo5RCx1QkFBdUI7UUFDckI7O1NBRUM7Ozs7Ozs7UUFDSCxVQUErRCxLQUFhOztZQUMxRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2xELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsQ0FBQSxLQUFBLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxTQUFTLENBQUEsQ0FBQyxNQUFNLDRCQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFFO2lCQUN2RTtnQkFDRCxJQUFJLEtBQUssRUFBRTtvQkFDVCxDQUFBLEtBQUEsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLFNBQVMsQ0FBQSxDQUFDLEdBQUcsNEJBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRTtpQkFDMUQ7YUFDRjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksZ0RBQVU7Ozs7UUFBZCxjQUFvQyxPQUFPLG1CQUFBLElBQUksQ0FBQyxRQUFRLEVBQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRWxFLHNCQUFhLGlEQUFXOzs7O1FBQXhCLGNBQW1FLE9BQU8sbUJBQUEsSUFBSSxDQUFDLGFBQWEsRUFBd0MsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3ZJLFVBQWdCLEtBQTJDO1lBQ3pELGdGQUFnRjtZQUNoRixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7UUFDSCxDQUFDOzs7T0FYc0k7Ozs7SUFldkksMkNBQVE7OztJQUFSLGNBQW1CLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDL0Qsa0RBQWU7OztJQUFmLGNBQTBCLFdBQVcsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFNLGVBQWUsV0FBRSxDQUFDLENBQUMsQ0FBQzs7OztJQUN0Ryw4Q0FBVzs7O0lBQVgsY0FBc0IsV0FBVyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsaUJBQU0sV0FBVyxXQUFFLENBQUMsQ0FBQyxDQUFDOztnQkFoSDVGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7O3dCQUNKLE9BQU8sRUFBRSxVQUFVO3dCQUNuQiwyQkFBMkIsRUFBRSx1QkFBdUI7cUJBQ3JEO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFO3FCQUM1RDtpQkFDRjs7OztnQkFsSUMsVUFBVTtnQkFlVixXQUFXLHVCQXNKRSxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVEsWUFBSSxRQUFRO2dEQUMzQyxNQUFNLFNBQUMsUUFBUTtnQkEvSjVCLE1BQU07Z0JBRE4sZ0JBQWdCO2dEQW1LSCxNQUFNLFNBQUMsZUFBZTtnQkE5SjVCLGNBQWM7Z0JBR3JCLFFBQVE7Z0JBaEJSLGlCQUFpQjtnQkF3QlYsYUFBYSx1QkF3SlAsUUFBUTtnQkE3SnJCLGdCQUFnQix1QkE4SkgsUUFBUTs7OzBCQXJDcEIsS0FBSyxTQUFDLGlCQUFpQjsyQ0ErRHZCLEtBQUssU0FBQyx5QkFBeUI7OEJBYy9CLEtBQUs7O0lBbUJSLCtCQUFDO0NBQUEsQUFsSEQsQ0FXdUQsT0FBTyxHQXVHN0Q7U0F2R1ksd0JBQXdCOzs7SUFDbkMsdURBQXNDOzs7OztJQXlCdEMsNENBQXdIOzs7OztJQUN4SCxtREFBK0g7Ozs7O0lBRS9ILDhDQUE2Qzs7SUFvRTdDLDhDQUFtQjs7SUFDbkIsZ0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIERyYWdEcm9wLFxuICBDZGtEcm9wTGlzdCxcbiAgQ2RrRHJvcExpc3RHcm91cCxcbiAgRHJhZ0Ryb3BSZWdpc3RyeSxcbiAgQ2RrRHJhZyxcbiAgQ0RLX0RST1BfTElTVCxcbiAgQ0RLX0RSQUdfQ09ORklHLCBEcmFnUmVmQ29uZmlnLCBDZGtEcmFnRHJvcCwgQ2RrRHJhZ1N0YXJ0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgTmdyaWRQbHVnaW4sIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY2RrRHJvcExpc3QsIGNka0RyYWcgfSBmcm9tICcuLi92Ny1jb21wYXQnO1xuaW1wb3J0IHsgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZyB9IGZyb20gJy4uL2NvcmUvbGF6eS1kcmFnLWRyb3AnO1xuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuLi9jb3JlL2Ryb3AtbGlzdC1yZWYnO1xuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgcm93UmVvcmRlcj86IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAncm93UmVvcmRlcicgPSAncm93UmVvcmRlcic7XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtyb3dSZW9yZGVyXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dSZW9yZGVyJyxcbiAgaW5wdXRzOiBbXG4gICAgJ2RpcmVjdENvbnRhaW5lckVsZW1lbnQ6Y2RrRHJvcExpc3REaXJlY3RDb250YWluZXJFbGVtZW50J1xuICBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcm9wLWxpc3QnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1yZWNlaXZpbmddJzogJ19kcm9wTGlzdFJlZi5pc1JlY2VpdmluZygpJyxcbiAgICAnW2NsYXNzLnBibC1yb3ctcmVvcmRlcl0nOiAncm93UmVvcmRlciAmJiAhdGhpcy5ncmlkLmRzPy5zb3J0LnNvcnQ/Lm9yZGVyICYmICF0aGlzLmdyaWQuZHM/LmZpbHRlcj8uZmlsdGVyJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtEcm9wTGlzdEdyb3VwLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG5cbiAgaWQgPSBgcGJsLW5ncmlkLXJvdy1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICBASW5wdXQoKSBnZXQgcm93UmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Jvd1Jlb3JkZXI7IH07XG4gIHNldCByb3dSZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3Jvd1Jlb3JkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jvd1Jlb3JkZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4sXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI/OiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZ3JvdXA/OiBDZGtEcm9wTGlzdEdyb3VwPENka0Ryb3BMaXN0PixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeT86IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCAvLyBmb3IgdjcgY29tcGF0XG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudD86IGFueSkge1xuICAgIHN1cGVyKC4uLmNka0Ryb3BMaXN0KGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCwgZHJhZ0Ryb3BSZWdpc3RyeSwgX2RvY3VtZW50KSk7XG4gICAgLy8gc3VwZXIoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ0Ryb3A8VD4pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZTxUPjtcblxuICAgICAgY29uc3QgcHJldmlvdXNJbmRleCA9IGdyaWQuZHMuc291cmNlLmluZGV4T2YoaXRlbS5kcmFnZ2VkQ29udGV4dC5yb3cpO1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gZXZlbnQuY3VycmVudEluZGV4ICsgZ3JpZC5kcy5yZW5kZXJTdGFydDtcblxuICAgICAgdGhpcy5ncmlkLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICAgIHRoaXMuZ3JpZC5kcy5tb3ZlSXRlbShwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmcgPSAnLnBibC1uZ3JpZC1zY3JvbGwtY29udGFpbmVyJzsgLy8gd2UgbmVlZCB0aGlzIHRvIGFsbG93IGF1dG8tc2Nyb2xsXG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxhbnk+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkUm93RHJhZ10nLFxuICBleHBvcnRBczogJ3BibE5ncmlkUm93RHJhZycsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrRHJhZywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIENka0xhenlEcmFnPFQsIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4ge1xuICByb290RWxlbWVudFNlbGVjdG9yID0gJ3BibC1uZ3JpZC1yb3cnO1xuXG4gIGdldCBjb250ZXh0KCk6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIEBJbnB1dCgncGJsTmdyaWRSb3dEcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xuXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IHRoaXMucGx1Z2luQ3RybCA9IHZhbHVlICYmIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHZhbHVlLmdyaWQpO1xuICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbkN0cmwgJiYgcGx1Z2luQ3RybC5nZXRQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgdGhpcy5jZGtEcm9wTGlzdCA9IHBsdWdpbiB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IGRyYWdnZWQgY29udGV4dC5cbiAgICpcbiAgICogVGhpcyBjb250ZXh0IGlzIG5vdCBzaW1pbGFyIHRvIHRoZSBgY29udGV4dGAgcHJvcGVydHkuXG4gICAqIFRoZSBgY29udGV4dGAgcHJvcGVydHkgaG9sZHMgdGhlIGN1cnJlbnQgY29udGV4dCB3aGljaCBpcyBzaGFyZWQgYW5kIHVwZGF0ZWQgb24gc2Nyb2xsIHNvIGlmIGEgdXNlciBzdGFydCBhIGRyYWcgYW5kIHRoZW4gc2Nyb2xsZWRcbiAgICogdGhlIGNvbnRleHQgd2lsbCBwb2ludCB0byB0aGUgcm93IGluIHZpZXcgYW5kIG5vdCB0aGUgb3JpZ2luYWwgY2VsbC5cbiAgICovXG4gIGdldCBkcmFnZ2VkQ29udGV4dCgpOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRDb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj47XG4gIHByaXZhdGUgX2RyYWdnZWRDb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PjtcblxuICBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjtcblxuICAvLyBDVE9SIElTIFJFUVVJUkVEIE9SIElUIFdPTlQgV09SSyBJTiBBT1RcbiAgLy8gVE9ETzogVHJ5IHRvIHJlbW92ZSB3aGVuIHN1cHBvcnRpbmcgSVZZXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUk9QX0xJU1QpIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGRyb3BDb250YWluZXI6IENka0Ryb3BMaXN0LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgICAgICAgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJBR19DT05GSUcpIGNvbmZpZzogRHJhZ1JlZkNvbmZpZyxcbiAgICAgICAgICAgICAgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcblxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLCAvLyBmb3IgdjcgY29tcGF0XG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk6IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCkge1xuICAgIHN1cGVyKC4uLmNka0RyYWcoZWxlbWVudCwgZHJvcENvbnRhaW5lciwgX2RvY3VtZW50LCBfbmdab25lLCBfdmlld0NvbnRhaW5lclJlZiwgY29uZmlnLCBfZGlyLCBkcmFnRHJvcCwgX2NoYW5nZURldGVjdG9yUmVmLCB2aWV3cG9ydFJ1bGVyLCBkcmFnRHJvcFJlZ2lzdHJ5KSk7XG4gICAgLy8gc3VwZXIoXG4gICAgLy8gICBlbGVtZW50LFxuICAgIC8vICAgZHJvcENvbnRhaW5lcixcbiAgICAvLyAgIF9kb2N1bWVudCxcbiAgICAvLyAgIF9uZ1pvbmUsXG4gICAgLy8gICBfdmlld0NvbnRhaW5lclJlZixcbiAgICAvLyAgIGNvbmZpZyxcbiAgICAvLyAgIF9kaXIsXG4gICAgLy8gICBkcmFnRHJvcCxcbiAgICAvLyAgIF9jaGFuZ2VEZXRlY3RvclJlZixcbiAgICAvLyApO1xuXG4gICAgdGhpcy5zdGFydGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnU3RhcnQpID0+IHtcbiAgICAgIGNvbnN0IHsgY29sLCByb3csIGdyaWQsIHZhbHVlIH0gID0gdGhpcy5fY29udGV4dDtcbiAgICAgIHRoaXMuX2RyYWdnZWRDb250ZXh0ID0geyBjb2wsIHJvdywgZ3JpZCwgdmFsdWUgfTtcbiAgICB9KTtcblxuXG4gIH1cblxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xuICAgIC8qKlxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXG4gICAqL1xuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgIGlmICh0aGlzLl9yb290Q2xhc3MpIHtcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcmFnUmVmIGFzIGFueTsgfVxuXG4gIEBJbnB1dCgpIGdldCBjZGtEcm9wTGlzdCgpOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4geyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPjsgfVxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPikge1xuICAgIC8vIFRPIFNVUFBPUlQgYGNka0Ryb3BMaXN0YCB2aWEgc3RyaW5nIGlucHV0IChJRCkgd2UgbmVlZCBhIHJlYWN0aXZlIHJlZ2lzdHJ5Li4uXG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5kcm9wQ29udGFpbmVyID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9kcmFnUmVmLl93aXRoRHJvcENvbnRhaW5lcih2YWx1ZS5fZHJvcExpc3RSZWYpO1xuICAgICAgdmFsdWUuYWRkRHJhZyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfcm9vdENsYXNzOiBzdHJpbmc7XG4gIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xuICBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7IHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdPbkRlc3Ryb3kuY2FsbCh0aGlzKTsgIHN1cGVyLm5nT25EZXN0cm95KCk7IH1cbiAgLyogQ2RrTGF6eURyYWcgZW5kICovXG59XG4iXX0=