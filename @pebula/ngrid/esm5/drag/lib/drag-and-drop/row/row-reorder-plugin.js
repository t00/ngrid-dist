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
import { PblNgridComponent, TablePlugin, PblNgridPluginController, PblNgridCellContext } from '@pebula/ngrid';
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
    function PblNgridRowReorderPluginDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
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
        this._removePlugin(this.table);
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
                        '[class.pbl-row-reorder]': 'rowReorder && !this.table.ds?.sort.sort?.order && !this.table.ds?.filter?.filter',
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
        TablePlugin({ id: PLUGIN_KEY }),
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
    PblNgridRowReorderPluginDirective.prototype.table;
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
            var pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.table);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsZUFBZSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUMxRCxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUFFLG1CQUFtQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBVWhFLFVBQVUsR0FBaUIsWUFBWTs7SUFFekMsZ0JBQWdCLEdBQUcsQ0FBQztTQWlCbUIsU0FBUzs7Ozs7SUFJWSw2REFBYztJQWE1RSwyQ0FBbUIsS0FBMkIsRUFDbEMs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LEVBQUUsdUJBQXVCO3FCQUNyRDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBRTtxQkFDNUQ7aUJBQ0Y7Ozs7Z0JBbElDLFVBQVU7Z0JBZVYsV0FBVyx1QkFzSkUsTUFBTSxTQUFDLGFBQWEsY0FBRyxRQUFRLFlBQUksUUFBUTtnREFDM0MsTUFBTSxTQUFDLFFBQVE7Z0JBL0o1QixNQUFNO2dCQUROLGdCQUFnQjtnREFtS0gsTUFBTSxTQUFDLGVBQWU7Z0JBOUo1QixjQUFjO2dCQUdyQixRQUFRO2dCQWhCUixpQkFBaUI7Z0JBd0JWLGFBQWEsdUJBd0pQLFFBQVE7Z0JBN0pyQixnQkFBZ0IsdUJBOEpILFFBQVE7OzswQkFyQ3BCLEtBQUssU0FBQyxpQkFBaUI7MkNBK0R2QixLQUFLLFNBQUMseUJBQXlCOzhCQWMvQixLQUFLOztJQW1CUiwrQkFBQztDQUFBLEFBbEhELENBV3VELE9BQU8sR0F1RzdEO1NBdkdZLHdCQUF3Qjs7O0lBQ25DLHVEQUFzQzs7Ozs7SUF5QnRDLDRDQUF5SDs7Ozs7SUFDekgsbURBQWdJOzs7OztJQUVoSSw4Q0FBNkM7O0lBb0U3Qyw4Q0FBbUI7O0lBQ25CLGdEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBEcmFnRHJvcCxcbiAgQ2RrRHJvcExpc3QsXG4gIENka0Ryb3BMaXN0R3JvdXAsXG4gIERyYWdEcm9wUmVnaXN0cnksXG4gIENka0RyYWcsXG4gIENES19EUk9QX0xJU1QsXG4gIENES19EUkFHX0NPTkZJRywgRHJhZ1JlZkNvbmZpZywgQ2RrRHJhZ0Ryb3AsIENka0RyYWdTdGFydFxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFRhYmxlUGx1Z2luLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNka0Ryb3BMaXN0LCBjZGtEcmFnIH0gZnJvbSAnLi4vdjctY29tcGF0JztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHJvd1Jlb3JkZXI/OiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ3Jvd1Jlb3JkZXInID0gJ3Jvd1Jlb3JkZXInO1xuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbcm93UmVvcmRlcl0nLFxuICBleHBvcnRBczogJ3BibE5ncmlkUm93UmVvcmRlcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gICAgJ1tjbGFzcy5wYmwtcm93LXJlb3JkZXJdJzogJ3Jvd1Jlb3JkZXIgJiYgIXRoaXMudGFibGUuZHM/LnNvcnQuc29ydD8ub3JkZXIgJiYgIXRoaXMudGFibGUuZHM/LmZpbHRlcj8uZmlsdGVyJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtEcm9wTGlzdEdyb3VwLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG5cbiAgaWQgPSBgcGJsLW5ncmlkLXJvdy1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICBASW5wdXQoKSBnZXQgcm93UmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Jvd1Jlb3JkZXI7IH07XG4gIHNldCByb3dSZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3Jvd1Jlb3JkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jvd1Jlb3JkZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5PzogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XG4gICAgc3VwZXIoLi4uY2RrRHJvcExpc3QoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwLCBkcmFnRHJvcFJlZ2lzdHJ5LCBfZG9jdW1lbnQpKTtcbiAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5kcm9wcGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnRHJvcDxUPikgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlPFQ+O1xuXG4gICAgICBjb25zdCBwcmV2aW91c0luZGV4ID0gdGFibGUuZHMuc291cmNlLmluZGV4T2YoaXRlbS5kcmFnZ2VkQ29udGV4dC5yb3cpO1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gZXZlbnQuY3VycmVudEluZGV4ICsgdGFibGUuZHMucmVuZGVyU3RhcnQ7XG5cbiAgICAgIHRoaXMudGFibGUuY29udGV4dEFwaS5jbGVhcigpO1xuICAgICAgdGhpcy50YWJsZS5kcy5tb3ZlSXRlbShwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIENka0xhenlEcm9wTGlzdCBzdGFydCAqL1xuICAvKipcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcbiAgICogaXMgdXNlZnVsIHdoZW4gdGhlIGBjZGtEcm9wTGlzdGAgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChpLmUuIGFuY2VzdG9yIGJ1dCBub3QgZmF0aGVyKVxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICAgKi9cbiAgZGlyZWN0Q29udGFpbmVyRWxlbWVudDogc3RyaW5nID0gJy5wYmwtbmdyaWQtc2Nyb2xsLWNvbnRhaW5lcic7IC8vIHdlIG5lZWQgdGhpcyB0byBhbGxvdyBhdXRvLXNjcm9sbFxuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cbiAgb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmFkZERyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUucmVtb3ZlRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XG4gIC8qIENka0xhenlEcm9wTGlzdCBlbmQgKi9cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRSb3dEcmFnXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dEcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtEcmFnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgQ2RrTGF6eURyYWc8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG4gIHJvb3RFbGVtZW50U2VsZWN0b3IgPSAncGJsLW5ncmlkLXJvdyc7XG5cbiAgZ2V0IGNvbnRleHQoKTogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIEBJbnB1dCgncGJsTmdyaWRSb3dEcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAndGFibGUnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+Pikge1xuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcblxuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSB0aGlzLnBsdWdpbkN0cmwgPSB2YWx1ZSAmJiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh2YWx1ZS50YWJsZSk7XG4gICAgY29uc3QgcGx1Z2luID0gcGx1Z2luQ3RybCAmJiBwbHVnaW5DdHJsLmdldFBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICB0aGlzLmNka0Ryb3BMaXN0ID0gcGx1Z2luIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3QgZHJhZ2dlZCBjb250ZXh0LlxuICAgKlxuICAgKiBUaGlzIGNvbnRleHQgaXMgbm90IHNpbWlsYXIgdG8gdGhlIGBjb250ZXh0YCBwcm9wZXJ0eS5cbiAgICogVGhlIGBjb250ZXh0YCBwcm9wZXJ0eSBob2xkcyB0aGUgY3VycmVudCBjb250ZXh0IHdoaWNoIGlzIHNoYXJlZCBhbmQgdXBkYXRlZCBvbiBzY3JvbGwgc28gaWYgYSB1c2VyIHN0YXJ0IGEgZHJhZyBhbmQgdGhlbiBzY3JvbGxlZFxuICAgKiB0aGUgY29udGV4dCB3aWxsIHBvaW50IHRvIHRoZSByb3cgaW4gdmlldyBhbmQgbm90IHRoZSBvcmlnaW5hbCBjZWxsLlxuICAgKi9cbiAgZ2V0IGRyYWdnZWRDb250ZXh0KCk6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAndGFibGUnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRDb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+O1xuICBwcml2YXRlIF9kcmFnZ2VkQ29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+O1xuXG4gIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyO1xuXG4gIC8vIENUT1IgSVMgUkVRVUlSRUQgT1IgSVQgV09OVCBXT1JLIElOIEFPVFxuICAvLyBUT0RPOiBUcnkgdG8gcmVtb3ZlIHdoZW4gc3VwcG9ydGluZyBJVllcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RST1BfTElTVCkgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZHJvcENvbnRhaW5lcjogQ2RrRHJvcExpc3QsXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgY29uZmlnOiBEcmFnUmVmQ29uZmlnLFxuICAgICAgICAgICAgICBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sKSB7XG4gICAgc3VwZXIoLi4uY2RrRHJhZyhlbGVtZW50LCBkcm9wQ29udGFpbmVyLCBfZG9jdW1lbnQsIF9uZ1pvbmUsIF92aWV3Q29udGFpbmVyUmVmLCBjb25maWcsIF9kaXIsIGRyYWdEcm9wLCBfY2hhbmdlRGV0ZWN0b3JSZWYsIHZpZXdwb3J0UnVsZXIsIGRyYWdEcm9wUmVnaXN0cnkpKTtcbiAgICAvLyBzdXBlcihcbiAgICAvLyAgIGVsZW1lbnQsXG4gICAgLy8gICBkcm9wQ29udGFpbmVyLFxuICAgIC8vICAgX2RvY3VtZW50LFxuICAgIC8vICAgX25nWm9uZSxcbiAgICAvLyAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgIC8vICAgY29uZmlnLFxuICAgIC8vICAgX2RpcixcbiAgICAvLyAgIGRyYWdEcm9wLFxuICAgIC8vICAgX2NoYW5nZURldGVjdG9yUmVmLFxuICAgIC8vICk7XG5cbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdTdGFydCkgPT4ge1xuICAgICAgY29uc3QgeyBjb2wsIHJvdywgdGFibGUsIHZhbHVlIH0gID0gdGhpcy5fY29udGV4dDtcbiAgICAgIHRoaXMuX2RyYWdnZWRDb250ZXh0ID0geyBjb2wsIHJvdywgdGFibGUsIHZhbHVlIH07XG4gICAgfSk7XG5cblxuICB9XG5cbiAgLyogQ2RrTGF6eURyYWcgc3RhcnQgKi9cbiAgICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPGFueT4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xufVxuIl19