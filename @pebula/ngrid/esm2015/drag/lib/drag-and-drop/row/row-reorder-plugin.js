import * as tslib_1 from "tslib";
var PblNgridRowReorderPluginDirective_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, Input, Inject, Optional, SkipSelf, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDropList, CdkDropListGroup, DragDropRegistry, CdkDrag, CDK_DROP_LIST, CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, TablePlugin, PblNgridPluginController } from '@pebula/ngrid';
import { cdkDropList, cdkDrag } from '../v7-compat';
import { CdkLazyDropList, CdkLazyDrag } from '../core/lazy-drag-drop';
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
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} element
     * @param {?} dragDrop
     * @param {?} changeDetectorRef
     * @param {?=} dir
     * @param {?=} group
     * @param {?=} dragDropRegistry
     * @param {?=} _document
     */
    constructor(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        super(...cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document));
        this.table = table;
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
            const previousIndex = table.ds.source.indexOf(item.draggedContext.row);
            /** @type {?} */
            const currentIndex = event.currentIndex + table.ds.renderStart;
            this.table.contextApi.clear();
            this.table.ds.moveItem(previousIndex, currentIndex, true);
            this.table._cdkTable.syncRows('data');
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
        this._removePlugin(this.table);
    }
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
                    '[class.pbl-row-reorder]': 'rowReorder && !this.table.ds?.sort.sort?.order && !this.table.ds?.filter?.filter',
                },
                providers: [
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
            const { col, row, table, value } = this._context;
            this._draggedContext = { col, row, table, value };
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
        const pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.table);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxhQUFhLEVBQ2IsZUFBZSxFQUNoQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHdCQUF3QixFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztNQVVoRSxVQUFVLEdBQWlCLFlBQVk7O0lBRXpDLGdCQUFnQixHQUFHLENBQUM7V0FpQm1CLFNBQVM7Ozs7SUFJdkMsaUNBQWlDOzs7TUFBakMsaUNBQTJDLFNBQVEsV0FBYzs7Ozs7Ozs7Ozs7O0lBYTVFLFlBQW1CLEtBQTJCLEVBQ2xDLFVBQW9DLEVBQ3BDLE9B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Qjt1Q0ErRHZCLEtBQUssU0FBQyx5QkFBeUI7MEJBYy9CLEtBQUs7Ozs7SUFuRk4sdURBQXNDOzs7OztJQXlCdEMsNENBQXlIOzs7OztJQUN6SCxtREFBZ0k7Ozs7O0lBRWhJLDhDQUE2Qzs7SUFvRTdDLDhDQUFtQjs7SUFDbkIsZ0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIERyYWdEcm9wLFxuICBDZGtEcm9wTGlzdCxcbiAgQ2RrRHJvcExpc3RHcm91cCxcbiAgRHJhZ0Ryb3BSZWdpc3RyeSxcbiAgQ2RrRHJhZyxcbiAgQ0RLX0RST1BfTElTVCxcbiAgQ0RLX0RSQUdfQ09ORklHLCBEcmFnUmVmQ29uZmlnLCBDZGtEcmFnRHJvcCwgQ2RrRHJhZ1N0YXJ0XG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgVGFibGVQbHVnaW4sIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY2RrRHJvcExpc3QsIGNka0RyYWcgfSBmcm9tICcuLi92Ny1jb21wYXQnO1xuaW1wb3J0IHsgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZyB9IGZyb20gJy4uL2NvcmUvbGF6eS1kcmFnLWRyb3AnO1xuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuLi9jb3JlL2Ryb3AtbGlzdC1yZWYnO1xuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgcm93UmVvcmRlcj86IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAncm93UmVvcmRlcicgPSAncm93UmVvcmRlcic7XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtyb3dSZW9yZGVyXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dSZW9yZGVyJyxcbiAgaW5wdXRzOiBbXG4gICAgJ2RpcmVjdENvbnRhaW5lckVsZW1lbnQ6Y2RrRHJvcExpc3REaXJlY3RDb250YWluZXJFbGVtZW50J1xuICBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcm9wLWxpc3QnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1yZWNlaXZpbmddJzogJ19kcm9wTGlzdFJlZi5pc1JlY2VpdmluZygpJyxcbiAgICAnW2NsYXNzLnBibC1yb3ctcmVvcmRlcl0nOiAncm93UmVvcmRlciAmJiAhdGhpcy50YWJsZS5kcz8uc29ydC5zb3J0Py5vcmRlciAmJiAhdGhpcy50YWJsZS5kcz8uZmlsdGVyPy5maWx0ZXInLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka0Ryb3BMaXN0R3JvdXAsIHVzZVZhbHVlOiB1bmRlZmluZWQgfSxcbiAgICB7IHByb3ZpZGU6IENES19EUk9QX0xJU1QsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmUgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENka0xhenlEcm9wTGlzdDxULCBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcblxuICBpZCA9IGBwYmwtbmdyaWQtcm93LXJlb3JkZXItbGlzdC0ke191bmlxdWVJZENvdW50ZXIrK31gO1xuXG4gIEBJbnB1dCgpIGdldCByb3dSZW9yZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcm93UmVvcmRlcjsgfTtcbiAgc2V0IHJvd1Jlb3JkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fcm93UmVvcmRlciA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcm93UmVvcmRlciA9IGZhbHNlO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk/OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwgLy8gZm9yIHY3IGNvbXBhdFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnkpIHtcbiAgICBzdXBlciguLi5jZGtEcm9wTGlzdChlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXAsIGRyYWdEcm9wUmVnaXN0cnksIF9kb2N1bWVudCkpO1xuICAgIC8vIHN1cGVyKGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdEcm9wPFQ+KSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gZXZlbnQuaXRlbSBhcyBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmU8VD47XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzSW5kZXggPSB0YWJsZS5kcy5zb3VyY2UuaW5kZXhPZihpdGVtLmRyYWdnZWRDb250ZXh0LnJvdyk7XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBldmVudC5jdXJyZW50SW5kZXggKyB0YWJsZS5kcy5yZW5kZXJTdGFydDtcblxuICAgICAgdGhpcy50YWJsZS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgICB0aGlzLnRhYmxlLmRzLm1vdmVJdGVtKHByZXZpb3VzSW5kZXgsIGN1cnJlbnRJbmRleCwgdHJ1ZSk7XG4gICAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScpO1xuICAgIH0pO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmcgPSAnLnBibC1uZ3JpZC1zY3JvbGwtY29udGFpbmVyJzsgLy8gd2UgbmVlZCB0aGlzIHRvIGFsbG93IGF1dG8tc2Nyb2xsXG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxhbnk+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZFJvd0RyYWddJyxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZFJvd0RyYWcnLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcmFnJyxcbiAgICAnW2NsYXNzLmNkay1kcmFnLWRyYWdnaW5nXSc6ICdfZHJhZ1JlZi5pc0RyYWdnaW5nKCknLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka0RyYWcsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmUgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93RHJhZ0RpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0RyYWc8VD4gaW1wbGVtZW50cyBDZGtMYXp5RHJhZzxULCBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcbiAgcm9vdEVsZW1lbnRTZWxlY3RvciA9ICdwYmwtbmdyaWQtcm93JztcblxuICBnZXQgY29udGV4dCgpOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ3RhYmxlJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj4ge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0O1xuICB9XG5cbiAgQElucHV0KCdwYmxOZ3JpZFJvd0RyYWcnKSBzZXQgY29udGV4dCh2YWx1ZTogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xuXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IHRoaXMucGx1Z2luQ3RybCA9IHZhbHVlICYmIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHZhbHVlLnRhYmxlKTtcbiAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DdHJsICYmIHBsdWdpbkN0cmwuZ2V0UGx1Z2luKFBMVUdJTl9LRVkpO1xuICAgIHRoaXMuY2RrRHJvcExpc3QgPSBwbHVnaW4gfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgbGFzdCBkcmFnZ2VkIGNvbnRleHQuXG4gICAqXG4gICAqIFRoaXMgY29udGV4dCBpcyBub3Qgc2ltaWxhciB0byB0aGUgYGNvbnRleHRgIHByb3BlcnR5LlxuICAgKiBUaGUgYGNvbnRleHRgIHByb3BlcnR5IGhvbGRzIHRoZSBjdXJyZW50IGNvbnRleHQgd2hpY2ggaXMgc2hhcmVkIGFuZCB1cGRhdGVkIG9uIHNjcm9sbCBzbyBpZiBhIHVzZXIgc3RhcnQgYSBkcmFnIGFuZCB0aGVuIHNjcm9sbGVkXG4gICAqIHRoZSBjb250ZXh0IHdpbGwgcG9pbnQgdG8gdGhlIHJvdyBpbiB2aWV3IGFuZCBub3QgdGhlIG9yaWdpbmFsIGNlbGwuXG4gICAqL1xuICBnZXQgZHJhZ2dlZENvbnRleHQoKTogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ2dlZENvbnRleHQ7XG4gIH1cblxuICBwcml2YXRlIF9jb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ3RhYmxlJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj47XG4gIHByaXZhdGUgX2RyYWdnZWRDb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ3RhYmxlJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj47XG5cbiAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI7XG5cbiAgLy8gQ1RPUiBJUyBSRVFVSVJFRCBPUiBJVCBXT05UIFdPUksgSU4gQU9UXG4gIC8vIFRPRE86IFRyeSB0byByZW1vdmUgd2hlbiBzdXBwb3J0aW5nIElWWVxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJPUF9MSVNUKSBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBkcm9wQ29udGFpbmVyOiBDZGtEcm9wTGlzdCxcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RSQUdfQ09ORklHKSBjb25maWc6IERyYWdSZWZDb25maWcsXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlciwgLy8gZm9yIHY3IGNvbXBhdFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwpIHtcbiAgICBzdXBlciguLi5jZGtEcmFnKGVsZW1lbnQsIGRyb3BDb250YWluZXIsIF9kb2N1bWVudCwgX25nWm9uZSwgX3ZpZXdDb250YWluZXJSZWYsIGNvbmZpZywgX2RpciwgZHJhZ0Ryb3AsIF9jaGFuZ2VEZXRlY3RvclJlZiwgdmlld3BvcnRSdWxlciwgZHJhZ0Ryb3BSZWdpc3RyeSkpO1xuICAgIC8vIHN1cGVyKFxuICAgIC8vICAgZWxlbWVudCxcbiAgICAvLyAgIGRyb3BDb250YWluZXIsXG4gICAgLy8gICBfZG9jdW1lbnQsXG4gICAgLy8gICBfbmdab25lLFxuICAgIC8vICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgLy8gICBjb25maWcsXG4gICAgLy8gICBfZGlyLFxuICAgIC8vICAgZHJhZ0Ryb3AsXG4gICAgLy8gICBfY2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgLy8gKTtcblxuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoIChldmVudDogQ2RrRHJhZ1N0YXJ0KSA9PiB7XG4gICAgICBjb25zdCB7IGNvbCwgcm93LCB0YWJsZSwgdmFsdWUgfSAgPSB0aGlzLl9jb250ZXh0O1xuICAgICAgdGhpcy5fZHJhZ2dlZENvbnRleHQgPSB7IGNvbCwgcm93LCB0YWJsZSwgdmFsdWUgfTtcbiAgICB9KTtcblxuXG4gIH1cblxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xuICAgIC8qKlxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXG4gICAqL1xuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgIGlmICh0aGlzLl9yb290Q2xhc3MpIHtcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcmFnUmVmIGFzIGFueTsgfVxuXG4gIEBJbnB1dCgpIGdldCBjZGtEcm9wTGlzdCgpOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4geyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPjsgfVxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPikge1xuICAgIC8vIFRPIFNVUFBPUlQgYGNka0Ryb3BMaXN0YCB2aWEgc3RyaW5nIGlucHV0IChJRCkgd2UgbmVlZCBhIHJlYWN0aXZlIHJlZ2lzdHJ5Li4uXG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5kcm9wQ29udGFpbmVyID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9kcmFnUmVmLl93aXRoRHJvcENvbnRhaW5lcih2YWx1ZS5fZHJvcExpc3RSZWYpO1xuICAgICAgdmFsdWUuYWRkRHJhZyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfcm9vdENsYXNzOiBzdHJpbmc7XG4gIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xuICBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7IHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdPbkRlc3Ryb3kuY2FsbCh0aGlzKTsgIHN1cGVyLm5nT25EZXN0cm95KCk7IH1cbiAgLyogQ2RrTGF6eURyYWcgZW5kICovXG59XG4iXX0=