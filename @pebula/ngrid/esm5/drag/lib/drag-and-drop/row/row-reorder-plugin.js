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
import { PblDragDrop } from '../core/drag-drop';
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
                        { provide: DragDrop, useExisting: PblDragDrop },
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
                        { provide: DragDrop, useExisting: PblDragDrop },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsZUFBZSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUMxRCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHdEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDOztJQVExQyxVQUFVLEdBQWlCLFlBQVk7O0lBRXpDLGdCQUFnQixHQUFHLENBQUM7U0FrQm1CLFNB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LFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLElBQUksRUFBRTs7d0JBQ0osT0FBTyxFQUFFLFVBQVU7d0JBQ25CLDJCQUEyQixFQUFFLHVCQUF1QjtxQkFDckQ7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO3dCQUMvQyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFO3FCQUM1RDtpQkFDRjs7OztnQkFySUMsVUFBVTtnQkFlVixXQUFXLHVCQXlKRSxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVEsWUFBSSxRQUFRO2dEQUMzQyxNQUFNLFNBQUMsUUFBUTtnQkFsSzVCLE1BQU07Z0JBRE4sZ0JBQWdCO2dEQXNLSCxNQUFNLFNBQUMsZUFBZTtnQkFqSzVCLGNBQWM7Z0JBR3JCLFFBQVE7Z0JBaEJSLGlCQUFpQjtnQkF3QlYsYUFBYSx1QkEySlAsUUFBUTtnQkFoS3JCLGdCQUFnQix1QkFpS0gsUUFBUTs7OzBCQXJDcEIsS0FBSyxTQUFDLGlCQUFpQjsyQ0ErRHZCLEtBQUssU0FBQyx5QkFBeUI7OEJBYy9CLEtBQUs7O0lBbUJSLCtCQUFDO0NBQUEsQUFuSEQsQ0FZdUQsT0FBTyxHQXVHN0Q7U0F2R1ksd0JBQXdCOzs7SUFDbkMsdURBQXNDOzs7OztJQXlCdEMsNENBQXdIOzs7OztJQUN4SCxtREFBK0g7Ozs7O0lBRS9ILDhDQUE2Qzs7SUFvRTdDLDhDQUFtQjs7SUFDbkIsZ0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBJbmplY3QsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNraXBTZWxmLFxyXG4gIFZpZXdDb250YWluZXJSZWYsXHJcbiAgTmdab25lLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcclxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcclxuaW1wb3J0IHtcclxuICBEcmFnRHJvcCxcclxuICBDZGtEcm9wTGlzdCxcclxuICBDZGtEcm9wTGlzdEdyb3VwLFxyXG4gIERyYWdEcm9wUmVnaXN0cnksXHJcbiAgQ2RrRHJhZyxcclxuICBDREtfRFJPUF9MSVNULFxyXG4gIENES19EUkFHX0NPTkZJRywgRHJhZ1JlZkNvbmZpZywgQ2RrRHJhZ0Ryb3AsIENka0RyYWdTdGFydFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcblxyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgTmdyaWRQbHVnaW4sIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5pbXBvcnQgeyBjZGtEcm9wTGlzdCwgY2RrRHJhZyB9IGZyb20gJy4uL3Y3LWNvbXBhdCc7XHJcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuLi9jb3JlL2Ryb3AtbGlzdC1yZWYnO1xyXG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi4vY29yZS9kcmFnLXJlZic7XHJcbmltcG9ydCB7IFBibERyYWdEcm9wIH0gZnJvbSAnLi4vY29yZS9kcmFnLWRyb3AnO1xyXG5cclxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xyXG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XHJcbiAgICByb3dSZW9yZGVyPzogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgUExVR0lOX0tFWTogJ3Jvd1Jlb3JkZXInID0gJ3Jvd1Jlb3JkZXInO1xyXG5cclxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xyXG5cclxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbcm93UmVvcmRlcl0nLFxyXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dSZW9yZGVyJyxcclxuICBpbnB1dHM6IFtcclxuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcclxuICBdLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcclxuICAgICdbaWRdJzogJ2lkJyxcclxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1kcmFnZ2luZ10nOiAnX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKScsXHJcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXHJcbiAgICAnW2NsYXNzLnBibC1yb3ctcmVvcmRlcl0nOiAncm93UmVvcmRlciAmJiAhdGhpcy5ncmlkLmRzPy5zb3J0LnNvcnQ/Lm9yZGVyICYmICF0aGlzLmdyaWQuZHM/LmZpbHRlcj8uZmlsdGVyJyxcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXHJcbiAgICB7IHByb3ZpZGU6IENka0Ryb3BMaXN0R3JvdXAsIHVzZVZhbHVlOiB1bmRlZmluZWQgfSxcclxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQ2RrTGF6eURyb3BMaXN0PFQsIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4ge1xyXG5cclxuICBpZCA9IGBwYmwtbmdyaWQtcm93LXJlb3JkZXItbGlzdC0ke191bmlxdWVJZENvdW50ZXIrK31gO1xyXG5cclxuICBASW5wdXQoKSBnZXQgcm93UmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Jvd1Jlb3JkZXI7IH07XHJcbiAgc2V0IHJvd1Jlb3JkZXIodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICAgIHRoaXMuX3Jvd1Jlb3JkZXIgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Jvd1Jlb3JkZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46IChncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4sXHJcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxyXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcclxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZ3JvdXA/OiBDZGtEcm9wTGlzdEdyb3VwPENka0Ryb3BMaXN0PixcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5PzogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sIC8vIGZvciB2NyBjb21wYXRcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnkpIHtcclxuICAgIHN1cGVyKC4uLmNka0Ryb3BMaXN0KGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCwgZHJhZ0Ryb3BSZWdpc3RyeSwgX2RvY3VtZW50KSk7XHJcbiAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xyXG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5kcm9wcGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnRHJvcDxUPikgPT4ge1xyXG4gICAgICBjb25zdCBpdGVtID0gZXZlbnQuaXRlbSBhcyBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmU8VD47XHJcblxyXG4gICAgICBjb25zdCBwcmV2aW91c0luZGV4ID0gZ3JpZC5kcy5zb3VyY2UuaW5kZXhPZihpdGVtLmRyYWdnZWRDb250ZXh0LnJvdyk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGV2ZW50LmN1cnJlbnRJbmRleCArIGdyaWQuZHMucmVuZGVyU3RhcnQ7XHJcblxyXG4gICAgICB0aGlzLmdyaWQuY29udGV4dEFwaS5jbGVhcigpO1xyXG4gICAgICB0aGlzLmdyaWQuZHMubW92ZUl0ZW0ocHJldmlvdXNJbmRleCwgY3VycmVudEluZGV4LCB0cnVlKTtcclxuICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiBDZGtMYXp5RHJvcExpc3Qgc3RhcnQgKi9cclxuICAvKipcclxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxyXG4gICAqIHRoZSBgY2RrRHJvcExpc3RgIGVsZW1lbnQgYW5kIGdvaW5nIGRvd24gdGhlIERPTS4gUGFzc2luZyBhbiBhbHRlcm5hdGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50XHJcbiAgICogaXMgdXNlZnVsIHdoZW4gdGhlIGBjZGtEcm9wTGlzdGAgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChpLmUuIGFuY2VzdG9yIGJ1dCBub3QgZmF0aGVyKVxyXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXHJcbiAgICovXHJcbiAgZGlyZWN0Q29udGFpbmVyRWxlbWVudDogc3RyaW5nID0gJy5wYmwtbmdyaWQtc2Nyb2xsLWNvbnRhaW5lcic7IC8vIHdlIG5lZWQgdGhpcyB0byBhbGxvdyBhdXRvLXNjcm9sbFxyXG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxhbnk+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxyXG4gIG9yaWdpbmFsRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XHJcbiAgX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxyXG4gIGFkZERyYWcoZHJhZzogQ2RrRHJhZyk6IHZvaWQgeyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5hZGREcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cclxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUucmVtb3ZlRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XHJcbiAgYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cclxuICAvKiBDZGtMYXp5RHJvcExpc3QgZW5kICovXHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcclxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xyXG4gIH1cclxufVxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRSb3dEcmFnXScsXHJcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZFJvd0RyYWcnLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXHJcbiAgICAnW2NsYXNzLmNkay1kcmFnLWRyYWdnaW5nXSc6ICdfZHJhZ1JlZi5pc0RyYWdnaW5nKCknLFxyXG4gIH0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7IHByb3ZpZGU6IERyYWdEcm9wLCB1c2VFeGlzdGluZzogUGJsRHJhZ0Ryb3AgfSxcclxuICAgIHsgcHJvdmlkZTogQ2RrRHJhZywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZSB9XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIENka0xhenlEcmFnPFQsIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4ge1xyXG4gIHJvb3RFbGVtZW50U2VsZWN0b3IgPSAncGJsLW5ncmlkLXJvdyc7XHJcblxyXG4gIGdldCBjb250ZXh0KCk6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcclxuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xyXG4gIH1cclxuXHJcbiAgQElucHV0KCdwYmxOZ3JpZFJvd0RyYWcnKSBzZXQgY29udGV4dCh2YWx1ZTogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj4pIHtcclxuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcclxuXHJcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gdGhpcy5wbHVnaW5DdHJsID0gdmFsdWUgJiYgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodmFsdWUuZ3JpZCk7XHJcbiAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DdHJsICYmIHBsdWdpbkN0cmwuZ2V0UGx1Z2luKFBMVUdJTl9LRVkpO1xyXG4gICAgdGhpcy5jZGtEcm9wTGlzdCA9IHBsdWdpbiB8fCB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3QgZHJhZ2dlZCBjb250ZXh0LlxyXG4gICAqXHJcbiAgICogVGhpcyBjb250ZXh0IGlzIG5vdCBzaW1pbGFyIHRvIHRoZSBgY29udGV4dGAgcHJvcGVydHkuXHJcbiAgICogVGhlIGBjb250ZXh0YCBwcm9wZXJ0eSBob2xkcyB0aGUgY3VycmVudCBjb250ZXh0IHdoaWNoIGlzIHNoYXJlZCBhbmQgdXBkYXRlZCBvbiBzY3JvbGwgc28gaWYgYSB1c2VyIHN0YXJ0IGEgZHJhZyBhbmQgdGhlbiBzY3JvbGxlZFxyXG4gICAqIHRoZSBjb250ZXh0IHdpbGwgcG9pbnQgdG8gdGhlIHJvdyBpbiB2aWV3IGFuZCBub3QgdGhlIG9yaWdpbmFsIGNlbGwuXHJcbiAgICovXHJcbiAgZ2V0IGRyYWdnZWRDb250ZXh0KCk6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcclxuICAgIHJldHVybiB0aGlzLl9kcmFnZ2VkQ29udGV4dDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2NvbnRleHQ6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+O1xyXG4gIHByaXZhdGUgX2RyYWdnZWRDb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PjtcclxuXHJcbiAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI7XHJcblxyXG4gIC8vIENUT1IgSVMgUkVRVUlSRUQgT1IgSVQgV09OVCBXT1JLIElOIEFPVFxyXG4gIC8vIFRPRE86IFRyeSB0byByZW1vdmUgd2hlbiBzdXBwb3J0aW5nIElWWVxyXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RST1BfTElTVCkgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZHJvcENvbnRhaW5lcjogQ2RrRHJvcExpc3QsXHJcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgICAgICAgX25nWm9uZTogTmdab25lLFxyXG4gICAgICAgICAgICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RSQUdfQ09ORklHKSBjb25maWc6IERyYWdSZWZDb25maWcsXHJcbiAgICAgICAgICAgICAgX2RpcjogRGlyZWN0aW9uYWxpdHksXHJcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxyXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcblxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsIC8vIGZvciB2NyBjb21wYXRcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwpIHtcclxuICAgIHN1cGVyKC4uLmNka0RyYWcoZWxlbWVudCwgZHJvcENvbnRhaW5lciwgX2RvY3VtZW50LCBfbmdab25lLCBfdmlld0NvbnRhaW5lclJlZiwgY29uZmlnLCBfZGlyLCBkcmFnRHJvcCwgX2NoYW5nZURldGVjdG9yUmVmLCB2aWV3cG9ydFJ1bGVyLCBkcmFnRHJvcFJlZ2lzdHJ5KSk7XHJcbiAgICAvLyBzdXBlcihcclxuICAgIC8vICAgZWxlbWVudCxcclxuICAgIC8vICAgZHJvcENvbnRhaW5lcixcclxuICAgIC8vICAgX2RvY3VtZW50LFxyXG4gICAgLy8gICBfbmdab25lLFxyXG4gICAgLy8gICBfdmlld0NvbnRhaW5lclJlZixcclxuICAgIC8vICAgY29uZmlnLFxyXG4gICAgLy8gICBfZGlyLFxyXG4gICAgLy8gICBkcmFnRHJvcCxcclxuICAgIC8vICAgX2NoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgLy8gKTtcclxuXHJcbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdTdGFydCkgPT4ge1xyXG4gICAgICBjb25zdCB7IGNvbCwgcm93LCBncmlkLCB2YWx1ZSB9ICA9IHRoaXMuX2NvbnRleHQ7XHJcbiAgICAgIHRoaXMuX2RyYWdnZWRDb250ZXh0ID0geyBjb2wsIHJvdywgZ3JpZCwgdmFsdWUgfTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xyXG4gICAgLyoqXHJcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgnY2RrRHJhZ1Jvb3RFbGVtZW50Q2xhc3MnKSBzZXQgcm9vdEVsZW1lbnRTZWxlY3RvckNsYXNzKHZhbHVlOiBzdHJpbmcpIHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnB1dC1yZW5hbWVcclxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XHJcbiAgICAgIGlmICh0aGlzLl9yb290Q2xhc3MpIHtcclxuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSguLi50aGlzLl9yb290Q2xhc3Muc3BsaXQoJyAnKSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoLi4udmFsdWUuc3BsaXQoJyAnKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuX3Jvb3RDbGFzcyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHBibERyYWdSZWYoKTogUGJsRHJhZ1JlZjxhbnk+IHsgcmV0dXJuIHRoaXMuX2RyYWdSZWYgYXMgYW55OyB9XHJcblxyXG4gIEBJbnB1dCgpIGdldCBjZGtEcm9wTGlzdCgpOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4geyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPjsgfVxyXG4gIHNldCBjZGtEcm9wTGlzdCh2YWx1ZTogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+KSB7XHJcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxyXG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcclxuICAgICAgdGhpcy5jZGtEcm9wTGlzdC5yZW1vdmVEcmFnKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcm9wQ29udGFpbmVyID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcclxuICAgICAgdmFsdWUuYWRkRHJhZyh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9yb290Q2xhc3M6IHN0cmluZztcclxuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcclxuICBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ0FmdGVyVmlld0luaXQuY2FsbCh0aGlzKTsgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7IH1cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XHJcbiAgLyogQ2RrTGF6eURyYWcgZW5kICovXHJcbn1cclxuIl19