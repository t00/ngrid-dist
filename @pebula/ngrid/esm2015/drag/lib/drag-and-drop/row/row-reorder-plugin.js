import * as tslib_1 from "tslib";
var PblNgridRowReorderPluginDirective_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const PLUGIN_KEY = 'rowReorder';
/** @type {?} */
let _uniqueIdCounter = 0;
const ɵ0 = undefined;
/**
 * @template T
 */
let PblNgridRowReorderPluginDirective = PblNgridRowReorderPluginDirective_1 = /**
 * @template T
 */
class PblNgridRowReorderPluginDirective extends CdkDropList {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     * @param {?} element
     * @param {?} dragDrop
     * @param {?} changeDetectorRef
     * @param {?=} dir
     * @param {?=} group
     * @param {?=} dragDropRegistry
     * @param {?=} _document
     */
    constructor(grid, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        super(...cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document));
        this.grid = grid;
        this.id = `pbl-ngrid-row-reorder-list-${_uniqueIdCounter++}`;
        this._rowReorder = false;
        /* CdkLazyDropList start */
        /**
         * Selector that will be used to determine the direct container element, starting from
         * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
         * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
         * of the draggable elements.
         */
        this.directContainerElement = '.pbl-ngrid-scroll-container'; // we need this to allow auto-scroll
        this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.dropped.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const item = (/** @type {?} */ (event.item));
            /** @type {?} */
            const previousIndex = grid.ds.source.indexOf(item.draggedContext.row);
            /** @type {?} */
            const currentIndex = event.currentIndex + grid.ds.renderStart;
            this.grid.contextApi.clear();
            this.grid.ds.moveItem(previousIndex, currentIndex, true);
            this.grid._cdkTable.syncRows('data');
        }));
    }
    /**
     * @return {?}
     */
    get rowReorder() { return this._rowReorder; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set rowReorder(value) {
        value = coerceBooleanProperty(value);
        this._rowReorder = value;
    }
    // we need this to allow auto-scroll
    /**
     * @return {?}
     */
    get pblDropListRef() { return (/** @type {?} */ (this._dropListRef)); }
    /**
     * @return {?}
     */
    ngOnInit() { CdkLazyDropList.prototype.ngOnInit.call(this); }
    /**
     * @param {?} drag
     * @return {?}
     */
    addDrag(drag) { return CdkLazyDropList.prototype.addDrag.call(this, drag); }
    /**
     * @param {?} drag
     * @return {?}
     */
    removeDrag(drag) { return CdkLazyDropList.prototype.removeDrag.call(this, drag); }
    /**
     * @return {?}
     */
    beforeStarted() { CdkLazyDropList.prototype.beforeStarted.call(this); }
    /* CdkLazyDropList end */
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removePlugin(this.grid);
    }
};
PblNgridRowReorderPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: ElementRef },
    { type: DragDrop },
    { type: ChangeDetectorRef },
    { type: Directionality },
    { type: CdkDropListGroup },
    { type: DragDropRegistry },
    { type: undefined }
];
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
PblNgridRowReorderPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: ElementRef },
    { type: DragDrop },
    { type: ChangeDetectorRef },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: DragDropRegistry, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
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
export class PblNgridRowDragDirective extends CdkDrag {
    // CTOR IS REQUIRED OR IT WONT WORK IN AOT
    // TODO: Try to remove when supporting IVY
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
     * @param {?} dragDropRegistry
     */
    constructor(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, // for v7 compat
    dragDropRegistry) {
        super(...cdkDrag(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef, viewportRuler, dragDropRegistry));
        this.rootElementSelector = 'pbl-ngrid-row';
        this._hostNotRoot = false;
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
        this.started.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            const { col, row, grid, value } = this._context;
            this._draggedContext = { col, row, grid, value };
        }));
    }
    /**
     * @return {?}
     */
    get context() {
        return this._context;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        /** @type {?} */
        const pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.grid);
        /** @type {?} */
        const plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY);
        this.cdkDropList = plugin || undefined;
    }
    /**
     * Reference to the last dragged context.
     *
     * This context is not similar to the `context` property.
     * The `context` property holds the current context which is shared and updated on scroll so if a user start a drag and then scrolled
     * the context will point to the row in view and not the original cell.
     * @return {?}
     */
    get draggedContext() {
        return this._draggedContext;
    }
    /* CdkLazyDrag start */
    /**
     * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
     * @param {?} value
     * @return {?}
     */
    set rootElementSelectorClass(value) {
        if (value !== this._rootClass && this._hostNotRoot) {
            if (this._rootClass) {
                this.getRootElement().classList.remove(...this._rootClass.split(' '));
            }
            if (value) {
                this.getRootElement().classList.add(...value.split(' '));
            }
        }
        this._rootClass = value;
    }
    /**
     * @return {?}
     */
    get pblDragRef() { return (/** @type {?} */ (this._dragRef)); }
    /**
     * @return {?}
     */
    get cdkDropList() { return (/** @type {?} */ (this.dropContainer)); }
    /**
     * @param {?} value
     * @return {?}
     */
    set cdkDropList(value) {
        // TO SUPPORT `cdkDropList` via string input (ID) we need a reactive registry...
        if (this.cdkDropList) {
            this.cdkDropList.removeDrag(this);
        }
        this.dropContainer = value;
        if (value) {
            this._dragRef._withDropContainer(value._dropListRef);
            value.addDrag(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() { CdkLazyDrag.prototype.ngOnInit.call(this); }
    /**
     * @return {?}
     */
    ngAfterViewInit() { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
    /**
     * @return {?}
     */
    ngOnDestroy() { CdkLazyDrag.prototype.ngOnDestroy.call(this); super.ngOnDestroy(); }
}
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
PblNgridRowDragDirective.ctorParameters = () => [
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
];
PblNgridRowDragDirective.propDecorators = {
    context: [{ type: Input, args: ['pblNgridRowDrag',] }],
    rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
    cdkDropList: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFFBQVEsRUFDUixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsYUFBYSxFQUNiLGVBQWUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFDMUQsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR3RFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7TUFRMUMsVUFBVSxHQUFpQixZQUFZOztJQUV6QyxnQkFBZ0IsR0FBRyxDQUFDO1dBa0JtQixT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T0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsd0JBQXdCLEVBQUU7aUJBQzVEO2FBQ0Y7Ozs7WUFySUMsVUFBVTtZQWVWLFdBQVcsdUJBeUpFLE1BQU0sU0FBQyxhQUFhLGNBQUcsUUFBUSxZQUFJLFFBQVE7NENBQzNDLE1BQU0sU0FBQyxRQUFRO1lBbEs1QixNQUFNO1lBRE4sZ0JBQWdCOzRDQXNLSCxNQUFNLFNBQUMsZUFBZTtZQWpLNUIsY0FBYztZQUdyQixRQUFRO1lBaEJSLGlCQUFpQjtZQXdCVixhQUFhLHVCQTJKUCxRQUFRO1lBaEtyQixnQkFBZ0IsdUJBaUtILFFBQVE7OztzQkFyQ3BCLEtBQUssU0FBQyxpQkFBaUI7dUNBK0R2QixLQUFLLFNBQUMseUJBQXlCOzBCQWMvQixLQUFLOzs7O0lBbkZOLHVEQUFzQzs7Ozs7SUF5QnRDLDRDQUF3SDs7Ozs7SUFDeEgsbURBQStIOzs7OztJQUUvSCw4Q0FBNkM7O0lBb0U3Qyw4Q0FBbUI7O0lBQ25CLGdEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgSW5qZWN0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBTa2lwU2VsZixcclxuICBWaWV3Q29udGFpbmVyUmVmLFxyXG4gIE5nWm9uZSxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XHJcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XHJcbmltcG9ydCB7XHJcbiAgRHJhZ0Ryb3AsXHJcbiAgQ2RrRHJvcExpc3QsXHJcbiAgQ2RrRHJvcExpc3RHcm91cCxcclxuICBEcmFnRHJvcFJlZ2lzdHJ5LFxyXG4gIENka0RyYWcsXHJcbiAgQ0RLX0RST1BfTElTVCxcclxuICBDREtfRFJBR19DT05GSUcsIERyYWdSZWZDb25maWcsIENka0RyYWdEcm9wLCBDZGtEcmFnU3RhcnRcclxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5cclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIE5ncmlkUGx1Z2luLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcclxuaW1wb3J0IHsgY2RrRHJvcExpc3QsIGNka0RyYWcgfSBmcm9tICcuLi92Ny1jb21wYXQnO1xyXG5pbXBvcnQgeyBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnIH0gZnJvbSAnLi4vY29yZS9sYXp5LWRyYWctZHJvcCc7XHJcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcclxuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xyXG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4uL2NvcmUvZHJhZy1kcm9wJztcclxuXHJcbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcclxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xyXG4gICAgcm93UmVvcmRlcj86IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IFBMVUdJTl9LRVk6ICdyb3dSZW9yZGVyJyA9ICdyb3dSZW9yZGVyJztcclxuXHJcbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcclxuXHJcbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3Jvd1Jlb3JkZXJdJyxcclxuICBleHBvcnRBczogJ3BibE5ncmlkUm93UmVvcmRlcicsXHJcbiAgaW5wdXRzOiBbXHJcbiAgICAnZGlyZWN0Q29udGFpbmVyRWxlbWVudDpjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnXHJcbiAgXSxcclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXHJcbiAgICAnY2xhc3MnOiAnY2RrLWRyb3AtbGlzdCcsXHJcbiAgICAnW2lkXSc6ICdpZCcsXHJcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxyXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LXJlY2VpdmluZ10nOiAnX2Ryb3BMaXN0UmVmLmlzUmVjZWl2aW5nKCknLFxyXG4gICAgJ1tjbGFzcy5wYmwtcm93LXJlb3JkZXJdJzogJ3Jvd1Jlb3JkZXIgJiYgIXRoaXMuZ3JpZC5kcz8uc29ydC5zb3J0Py5vcmRlciAmJiAhdGhpcy5ncmlkLmRzPy5maWx0ZXI/LmZpbHRlcicsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxyXG4gICAgeyBwcm92aWRlOiBDZGtEcm9wTGlzdEdyb3VwLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH0sXHJcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmUgfSxcclxuICBdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENka0xhenlEcm9wTGlzdDxULCBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcclxuXHJcbiAgaWQgPSBgcGJsLW5ncmlkLXJvdy1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcclxuXHJcbiAgQElucHV0KCkgZ2V0IHJvd1Jlb3JkZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yb3dSZW9yZGVyOyB9O1xyXG4gIHNldCByb3dSZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XHJcbiAgICB0aGlzLl9yb3dSZW9yZGVyID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yb3dSZW9yZGVyID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcclxuXHJcbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxyXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcclxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXHJcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4sXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeT86IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCAvLyBmb3IgdjcgY29tcGF0XHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XHJcbiAgICBzdXBlciguLi5jZGtEcm9wTGlzdChlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXAsIGRyYWdEcm9wUmVnaXN0cnksIF9kb2N1bWVudCkpO1xyXG4gICAgLy8gc3VwZXIoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwKTtcclxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ0Ryb3A8VD4pID0+IHtcclxuICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlPFQ+O1xyXG5cclxuICAgICAgY29uc3QgcHJldmlvdXNJbmRleCA9IGdyaWQuZHMuc291cmNlLmluZGV4T2YoaXRlbS5kcmFnZ2VkQ29udGV4dC5yb3cpO1xyXG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBldmVudC5jdXJyZW50SW5kZXggKyBncmlkLmRzLnJlbmRlclN0YXJ0O1xyXG5cclxuICAgICAgdGhpcy5ncmlkLmNvbnRleHRBcGkuY2xlYXIoKTtcclxuICAgICAgdGhpcy5ncmlkLmRzLm1vdmVJdGVtKHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCwgdHJ1ZSk7XHJcbiAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cclxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxyXG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcclxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxyXG4gICAqL1xyXG4gIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZyA9ICcucGJsLW5ncmlkLXNjcm9sbC1jb250YWluZXInOyAvLyB3ZSBuZWVkIHRoaXMgdG8gYWxsb3cgYXV0by1zY3JvbGxcclxuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cclxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG4gIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xyXG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cclxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XHJcbiAgcmVtb3ZlRHJhZyhkcmFnOiBDZGtEcmFnKTogYm9vbGVhbiB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLnJlbW92ZURyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxyXG4gIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XHJcbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkUm93RHJhZ10nLFxyXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dEcmFnJyxcclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXHJcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxyXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXHJcbiAgICB7IHByb3ZpZGU6IENka0RyYWcsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmUgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0RyYWc8VD4gaW1wbGVtZW50cyBDZGtMYXp5RHJhZzxULCBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcclxuICByb290RWxlbWVudFNlbGVjdG9yID0gJ3BibC1uZ3JpZC1yb3cnO1xyXG5cclxuICBnZXQgY29udGV4dCgpOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgncGJsTmdyaWRSb3dEcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcblxyXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IHRoaXMucGx1Z2luQ3RybCA9IHZhbHVlICYmIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHZhbHVlLmdyaWQpO1xyXG4gICAgY29uc3QgcGx1Z2luID0gcGx1Z2luQ3RybCAmJiBwbHVnaW5DdHJsLmdldFBsdWdpbihQTFVHSU5fS0VZKTtcclxuICAgIHRoaXMuY2RrRHJvcExpc3QgPSBwbHVnaW4gfHwgdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBsYXN0IGRyYWdnZWQgY29udGV4dC5cclxuICAgKlxyXG4gICAqIFRoaXMgY29udGV4dCBpcyBub3Qgc2ltaWxhciB0byB0aGUgYGNvbnRleHRgIHByb3BlcnR5LlxyXG4gICAqIFRoZSBgY29udGV4dGAgcHJvcGVydHkgaG9sZHMgdGhlIGN1cnJlbnQgY29udGV4dCB3aGljaCBpcyBzaGFyZWQgYW5kIHVwZGF0ZWQgb24gc2Nyb2xsIHNvIGlmIGEgdXNlciBzdGFydCBhIGRyYWcgYW5kIHRoZW4gc2Nyb2xsZWRcclxuICAgKiB0aGUgY29udGV4dCB3aWxsIHBvaW50IHRvIHRoZSByb3cgaW4gdmlldyBhbmQgbm90IHRoZSBvcmlnaW5hbCBjZWxsLlxyXG4gICAqL1xyXG4gIGdldCBkcmFnZ2VkQ29udGV4dCgpOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZHJhZ2dlZENvbnRleHQ7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PjtcclxuICBwcml2YXRlIF9kcmFnZ2VkQ29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj47XHJcblxyXG4gIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyO1xyXG5cclxuICAvLyBDVE9SIElTIFJFUVVJUkVEIE9SIElUIFdPTlQgV09SSyBJTiBBT1RcclxuICAvLyBUT0RPOiBUcnkgdG8gcmVtb3ZlIHdoZW4gc3VwcG9ydGluZyBJVllcclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUk9QX0xJU1QpIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGRyb3BDb250YWluZXI6IENka0Ryb3BMaXN0LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgY29uZmlnOiBEcmFnUmVmQ29uZmlnLFxyXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcclxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG5cclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLCAvLyBmb3IgdjcgY29tcGF0XHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sKSB7XHJcbiAgICBzdXBlciguLi5jZGtEcmFnKGVsZW1lbnQsIGRyb3BDb250YWluZXIsIF9kb2N1bWVudCwgX25nWm9uZSwgX3ZpZXdDb250YWluZXJSZWYsIGNvbmZpZywgX2RpciwgZHJhZ0Ryb3AsIF9jaGFuZ2VEZXRlY3RvclJlZiwgdmlld3BvcnRSdWxlciwgZHJhZ0Ryb3BSZWdpc3RyeSkpO1xyXG4gICAgLy8gc3VwZXIoXHJcbiAgICAvLyAgIGVsZW1lbnQsXHJcbiAgICAvLyAgIGRyb3BDb250YWluZXIsXHJcbiAgICAvLyAgIF9kb2N1bWVudCxcclxuICAgIC8vICAgX25nWm9uZSxcclxuICAgIC8vICAgX3ZpZXdDb250YWluZXJSZWYsXHJcbiAgICAvLyAgIGNvbmZpZyxcclxuICAgIC8vICAgX2RpcixcclxuICAgIC8vICAgZHJhZ0Ryb3AsXHJcbiAgICAvLyAgIF9jaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIC8vICk7XHJcblxyXG4gICAgdGhpcy5zdGFydGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnU3RhcnQpID0+IHtcclxuICAgICAgY29uc3QgeyBjb2wsIHJvdywgZ3JpZCwgdmFsdWUgfSAgPSB0aGlzLl9jb250ZXh0O1xyXG4gICAgICB0aGlzLl9kcmFnZ2VkQ29udGV4dCA9IHsgY29sLCByb3csIGdyaWQsIHZhbHVlIH07XHJcbiAgICB9KTtcclxuXHJcblxyXG4gIH1cclxuXHJcbiAgLyogQ2RrTGF6eURyYWcgc3RhcnQgKi9cclxuICAgIC8qKlxyXG4gICAqIEEgY2xhc3MgdG8gc2V0IHdoZW4gdGhlIHJvb3QgZWxlbWVudCBpcyBub3QgdGhlIGhvc3QgZWxlbWVudC4gKGkuZS4gd2hlbiBgY2RrRHJhZ1Jvb3RFbGVtZW50YCBpcyB1c2VkKS5cclxuICAgKi9cclxuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvb3RDbGFzcyAmJiB0aGlzLl9ob3N0Tm90Um9vdCkge1xyXG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcmFnUmVmIGFzIGFueTsgfVxyXG5cclxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cclxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPikge1xyXG4gICAgLy8gVE8gU1VQUE9SVCBgY2RrRHJvcExpc3RgIHZpYSBzdHJpbmcgaW5wdXQgKElEKSB3ZSBuZWVkIGEgcmVhY3RpdmUgcmVnaXN0cnkuLi5cclxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XHJcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcclxuICAgIH1cclxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RyYWdSZWYuX3dpdGhEcm9wQ29udGFpbmVyKHZhbHVlLl9kcm9wTGlzdFJlZik7XHJcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfcm9vdENsYXNzOiBzdHJpbmc7XHJcbiAgX2hvc3ROb3RSb290ID0gZmFsc2U7XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7IHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyB9XHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uRGVzdHJveS5jYWxsKHRoaXMpOyAgc3VwZXIubmdPbkRlc3Ryb3koKTsgfVxyXG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xyXG59XHJcbiJdfQ==