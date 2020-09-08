/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/row/row-reorder-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
import { ChangeDetectorRef, Directive, ElementRef, Input, Inject, Optional, SkipSelf, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDropList, CdkDropListGroup, CdkDrag, CDK_DROP_LIST, CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { CdkLazyDropList, CdkLazyDrag } from '../core/lazy-drag-drop';
import { PblDragDrop } from '../core/drag-drop';
/** @type {?} */
export var ROW_REORDER_PLUGIN_KEY = 'rowReorder';
/** @type {?} */
var _uniqueIdCounter = 0;
var ɵ0 = undefined;
/**
 * @template T
 */
var PblNgridRowReorderPluginDirective = /** @class */ (function (_super) {
    __extends(PblNgridRowReorderPluginDirective, _super);
    function PblNgridRowReorderPluginDirective(grid, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group) {
        var _this = _super.call(this, element, dragDrop, changeDetectorRef, dir, group) || this;
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
        _this._removePlugin = pluginCtrl.setPlugin(ROW_REORDER_PLUGIN_KEY, _this);
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
                        { provide: CDK_DROP_LIST, useExisting: PblNgridRowReorderPluginDirective },
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
        { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
    PblNgridRowReorderPluginDirective.propDecorators = {
        rowReorder: [{ type: Input }]
    };
    return PblNgridRowReorderPluginDirective;
}(CdkDropList));
export { PblNgridRowReorderPluginDirective };
if (false) {
    /** @type {?} */
    PblNgridRowReorderPluginDirective.prototype.id;
    /** @type {?} */
    PblNgridRowReorderPluginDirective.prototype._draggables;
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
    __extends(PblNgridRowDragDirective, _super);
    // CTOR IS REQUIRED OR IT WONT WORK IN AOT
    // TODO: Try to remove when supporting IVY
    function PblNgridRowDragDirective(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef) {
        var _this = _super.call(this, element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef) || this;
        _this.rootElementSelector = 'pbl-ngrid-row';
        _this._hostNotRoot = false;
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
            var plugin = pluginCtrl && pluginCtrl.getPlugin(ROW_REORDER_PLUGIN_KEY);
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
        { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsT0FBTyxFQUNQLGFBQWEsRUFDYixlQUFlLEVBQ2hCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUNqRyxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFRaEQsTUFBTSxLQUFPLHNCQUFzQixHQUFpQixZQUFZOztJQUU1RCxnQkFBZ0IsR0FBRyxDQUFDO1NBaUJtQixTQUFTOzs7O0FBZnBEO0lBbUJnRSxxREFBYztJQWU1RSwyQ0FBbUIsSUFBMEIsRUFDakMsVUFBb0MsRUFDcEMsT0FBZ0MsRUFDaEMsUUFBa0IsRUFDbEIsaUJBQW9DLEVBQ3hCLEdBQW9CLEVBQ1IsS0FBcUM7UUFOekUsWUFPRSxrQkFBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlC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Q0FBQyxDQUFDLENBQUM7Ozs7SUFDdEcsOENBQVc7OztJQUFYLGNBQXNCLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLGlCQUFNLFdBQVcsV0FBRSxDQUFDLENBQUMsQ0FBQzs7Z0JBN0c1RixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0IsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFOzt3QkFDSixPQUFPLEVBQUUsVUFBVTt3QkFDbkIsMkJBQTJCLEVBQUUsdUJBQXVCO3FCQUNyRDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7d0JBQy9DLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUU7cUJBQzVEO2lCQUNGOzs7O2dCQWpJQyxVQUFVO2dCQWdCVixXQUFXLHVCQW9KRSxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVEsWUFBSSxRQUFRO2dEQUMzQyxNQUFNLFNBQUMsUUFBUTtnQkE5SjVCLE1BQU07Z0JBRE4sZ0JBQWdCO2dEQWtLSCxNQUFNLFNBQUMsZUFBZTtnQkE1SjVCLGNBQWM7Z0JBR3JCLFFBQVE7Z0JBakJSLGlCQUFpQjs7OzBCQTJJaEIsS0FBSyxTQUFDLGlCQUFpQjsyQ0EyRHZCLEtBQUssU0FBQyx5QkFBeUI7OEJBYy9CLEtBQUs7O0lBbUJSLCtCQUFDO0NBQUEsQUEvR0QsQ0FZdUQsT0FBTyxHQW1HN0Q7U0FuR1ksd0JBQXdCOzs7SUFDbkMsdURBQXNDOzs7OztJQXlCdEMsNENBQXdIOzs7OztJQUN4SCxtREFBK0g7Ozs7O0lBRS9ILDhDQUE2Qzs7SUFnRTdDLDhDQUFtQjs7SUFDbkIsZ0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgRHJhZ0Ryb3AsXG4gIENka0Ryb3BMaXN0LFxuICBDZGtEcm9wTGlzdEdyb3VwLFxuICBDZGtEcmFnLFxuICBDREtfRFJPUF9MSVNULFxuICBDREtfRFJBR19DT05GSUcsIERyYWdSZWZDb25maWcsIENka0RyYWdEcm9wLCBDZGtEcmFnU3RhcnRcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcbmltcG9ydCB7IFBibERyYWdEcm9wIH0gZnJvbSAnLi4vY29yZS9kcmFnLWRyb3AnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgcm93UmVvcmRlcj86IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUk9XX1JFT1JERVJfUExVR0lOX0tFWTogJ3Jvd1Jlb3JkZXInID0gJ3Jvd1Jlb3JkZXInO1xuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtyb3dSZW9yZGVyXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dSZW9yZGVyJyxcbiAgaW5wdXRzOiBbXG4gICAgJ2RpcmVjdENvbnRhaW5lckVsZW1lbnQ6Y2RrRHJvcExpc3REaXJlY3RDb250YWluZXJFbGVtZW50J1xuICBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcm9wLWxpc3QnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1yZWNlaXZpbmddJzogJ19kcm9wTGlzdFJlZi5pc1JlY2VpdmluZygpJyxcbiAgICAnW2NsYXNzLnBibC1yb3ctcmVvcmRlcl0nOiAncm93UmVvcmRlciAmJiAhdGhpcy5ncmlkLmRzPy5zb3J0LnNvcnQ/Lm9yZGVyICYmICF0aGlzLmdyaWQuZHM/LmZpbHRlcj8uZmlsdGVyJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXG4gICAgeyBwcm92aWRlOiBDZGtEcm9wTGlzdEdyb3VwLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG5cbiAgaWQgPSBgcGJsLW5ncmlkLXJvdy1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICBASW5wdXQoKSBnZXQgcm93UmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Jvd1Jlb3JkZXI7IH07XG4gIHNldCByb3dSZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3Jvd1Jlb3JkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIF9kcmFnZ2FibGVzOiBRdWVyeUxpc3Q8Q2RrRHJhZz47XG5cbiAgcHJpdmF0ZSBfcm93UmVvcmRlciA9IGZhbHNlO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46IChncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+KSB7XG4gICAgc3VwZXIoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihST1dfUkVPUkRFUl9QTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ0Ryb3A8VD4pID0+IHtcbiAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZTxUPjtcblxuICAgICAgY29uc3QgcHJldmlvdXNJbmRleCA9IGdyaWQuZHMuc291cmNlLmluZGV4T2YoaXRlbS5kcmFnZ2VkQ29udGV4dC5yb3cpO1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gZXZlbnQuY3VycmVudEluZGV4ICsgZ3JpZC5kcy5yZW5kZXJTdGFydDtcblxuICAgICAgdGhpcy5ncmlkLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICAgIHRoaXMuZ3JpZC5kcy5tb3ZlSXRlbShwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmcgPSAnLnBibC1uZ3JpZC1zY3JvbGwtY29udGFpbmVyJzsgLy8gd2UgbmVlZCB0aGlzIHRvIGFsbG93IGF1dG8tc2Nyb2xsXG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxhbnk+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkUm93RHJhZ10nLFxuICBleHBvcnRBczogJ3BibE5ncmlkUm93RHJhZycsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ2RrRHJhZywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIENka0xhenlEcmFnPFQsIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPj4ge1xuICByb290RWxlbWVudFNlbGVjdG9yID0gJ3BibC1uZ3JpZC1yb3cnO1xuXG4gIGdldCBjb250ZXh0KCk6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIEBJbnB1dCgncGJsTmdyaWRSb3dEcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xuXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IHRoaXMucGx1Z2luQ3RybCA9IHZhbHVlICYmIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHZhbHVlLmdyaWQpO1xuICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbkN0cmwgJiYgcGx1Z2luQ3RybC5nZXRQbHVnaW4oUk9XX1JFT1JERVJfUExVR0lOX0tFWSk7XG4gICAgdGhpcy5jZGtEcm9wTGlzdCA9IHBsdWdpbiB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IGRyYWdnZWQgY29udGV4dC5cbiAgICpcbiAgICogVGhpcyBjb250ZXh0IGlzIG5vdCBzaW1pbGFyIHRvIHRoZSBgY29udGV4dGAgcHJvcGVydHkuXG4gICAqIFRoZSBgY29udGV4dGAgcHJvcGVydHkgaG9sZHMgdGhlIGN1cnJlbnQgY29udGV4dCB3aGljaCBpcyBzaGFyZWQgYW5kIHVwZGF0ZWQgb24gc2Nyb2xsIHNvIGlmIGEgdXNlciBzdGFydCBhIGRyYWcgYW5kIHRoZW4gc2Nyb2xsZWRcbiAgICogdGhlIGNvbnRleHQgd2lsbCBwb2ludCB0byB0aGUgcm93IGluIHZpZXcgYW5kIG5vdCB0aGUgb3JpZ2luYWwgY2VsbC5cbiAgICovXG4gIGdldCBkcmFnZ2VkQ29udGV4dCgpOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRDb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj47XG4gIHByaXZhdGUgX2RyYWdnZWRDb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PjtcblxuICBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjtcblxuICAvLyBDVE9SIElTIFJFUVVJUkVEIE9SIElUIFdPTlQgV09SSyBJTiBBT1RcbiAgLy8gVE9ETzogVHJ5IHRvIHJlbW92ZSB3aGVuIHN1cHBvcnRpbmcgSVZZXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUk9QX0xJU1QpIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGRyb3BDb250YWluZXI6IENka0Ryb3BMaXN0LFxuICAgICAgICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgICAgICAgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJBR19DT05GSUcpIGNvbmZpZzogRHJhZ1JlZkNvbmZpZyxcbiAgICAgICAgICAgICAgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcbiAgICAgICAgICAgICAgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHN1cGVyKFxuICAgICAgZWxlbWVudCxcbiAgICAgIGRyb3BDb250YWluZXIsXG4gICAgICBfZG9jdW1lbnQsXG4gICAgICBfbmdab25lLFxuICAgICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgICBjb25maWcsXG4gICAgICBfZGlyLFxuICAgICAgZHJhZ0Ryb3AsXG4gICAgICBfY2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgKTtcblxuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ1N0YXJ0KSA9PiB7XG4gICAgICBjb25zdCB7IGNvbCwgcm93LCBncmlkLCB2YWx1ZSB9ICA9IHRoaXMuX2NvbnRleHQ7XG4gICAgICB0aGlzLl9kcmFnZ2VkQ29udGV4dCA9IHsgY29sLCByb3csIGdyaWQsIHZhbHVlIH07XG4gICAgfSk7XG5cblxuICB9XG5cbiAgLyogQ2RrTGF6eURyYWcgc3RhcnQgKi9cbiAgICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPGFueT4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xufVxuIl19