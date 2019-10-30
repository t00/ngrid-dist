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
import { PblNgridComponent, TablePlugin, PblNgridPluginController, PblNgridCellContext } from '@pebula/ngrid';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3Avcm93L3Jvdy1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFFBQVEsRUFDUixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsYUFBYSxFQUNiLGVBQWUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFDMUQsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOztNQVVoRSxVQUFVLEdBQWlCLFlBQVk7O0lBRXpDLGdCQUFnQixHQUFHLENBQUM7V0FpQm1CLFNBQVM7Ozs7SUFJdkMsaUNBQWlDOzs7TUFBakMsaUNBQTJDLFNBQVEsV0FB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QixNQUFNO1lBRE4sZ0JBQWdCOzRDQW1LSCxNQUFNLFNBQUMsZUFBZTtZQTlKNUIsY0FBYztZQUdyQixRQUFRO1lBaEJSLGlCQUFpQjtZQXdCVixhQUFhLHVCQXdKUCxRQUFRO1lBN0pyQixnQkFBZ0IsdUJBOEpILFFBQVE7OztzQkFyQ3BCLEtBQUssU0FBQyxpQkFBaUI7dUNBK0R2QixLQUFLLFNBQUMseUJBQXlCOzBCQWMvQixLQUFLOzs7O0lBbkZOLHVEQUFzQzs7Ozs7SUF5QnRDLDRDQUF5SDs7Ozs7SUFDekgsbURBQWdJOzs7OztJQUVoSSw4Q0FBNkM7O0lBb0U3Qyw4Q0FBbUI7O0lBQ25CLGdEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBEcmFnRHJvcCxcbiAgQ2RrRHJvcExpc3QsXG4gIENka0Ryb3BMaXN0R3JvdXAsXG4gIERyYWdEcm9wUmVnaXN0cnksXG4gIENka0RyYWcsXG4gIENES19EUk9QX0xJU1QsXG4gIENES19EUkFHX0NPTkZJRywgRHJhZ1JlZkNvbmZpZywgQ2RrRHJhZ0Ryb3AsIENka0RyYWdTdGFydFxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFRhYmxlUGx1Z2luLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IGNka0Ryb3BMaXN0LCBjZGtEcmFnIH0gZnJvbSAnLi4vdjctY29tcGF0JztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHJvd1Jlb3JkZXI/OiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ3Jvd1Jlb3JkZXInID0gJ3Jvd1Jlb3JkZXInO1xuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbcm93UmVvcmRlcl0nLFxuICBleHBvcnRBczogJ3BibE5ncmlkUm93UmVvcmRlcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gICAgJ1tjbGFzcy5wYmwtcm93LXJlb3JkZXJdJzogJ3Jvd1Jlb3JkZXIgJiYgIXRoaXMudGFibGUuZHM/LnNvcnQuc29ydD8ub3JkZXIgJiYgIXRoaXMudGFibGUuZHM/LmZpbHRlcj8uZmlsdGVyJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtEcm9wTGlzdEdyb3VwLCB1c2VWYWx1ZTogdW5kZWZpbmVkIH0sXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93UmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG5cbiAgaWQgPSBgcGJsLW5ncmlkLXJvdy1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcblxuICBASW5wdXQoKSBnZXQgcm93UmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Jvd1Jlb3JkZXI7IH07XG4gIHNldCByb3dSZW9yZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIHRoaXMuX3Jvd1Jlb3JkZXIgPSB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jvd1Jlb3JkZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5PzogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XG4gICAgc3VwZXIoLi4uY2RrRHJvcExpc3QoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwLCBkcmFnRHJvcFJlZ2lzdHJ5LCBfZG9jdW1lbnQpKTtcbiAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5kcm9wcGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnRHJvcDxUPikgPT4ge1xuICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlPFQ+O1xuXG4gICAgICBjb25zdCBwcmV2aW91c0luZGV4ID0gdGFibGUuZHMuc291cmNlLmluZGV4T2YoaXRlbS5kcmFnZ2VkQ29udGV4dC5yb3cpO1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gZXZlbnQuY3VycmVudEluZGV4ICsgdGFibGUuZHMucmVuZGVyU3RhcnQ7XG5cbiAgICAgIHRoaXMudGFibGUuY29udGV4dEFwaS5jbGVhcigpO1xuICAgICAgdGhpcy50YWJsZS5kcy5tb3ZlSXRlbShwcmV2aW91c0luZGV4LCBjdXJyZW50SW5kZXgsIHRydWUpO1xuICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qIENka0xhenlEcm9wTGlzdCBzdGFydCAqL1xuICAvKipcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcbiAgICogaXMgdXNlZnVsIHdoZW4gdGhlIGBjZGtEcm9wTGlzdGAgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChpLmUuIGFuY2VzdG9yIGJ1dCBub3QgZmF0aGVyKVxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICAgKi9cbiAgZGlyZWN0Q29udGFpbmVyRWxlbWVudDogc3RyaW5nID0gJy5wYmwtbmdyaWQtc2Nyb2xsLWNvbnRhaW5lcic7IC8vIHdlIG5lZWQgdGhpcyB0byBhbGxvdyBhdXRvLXNjcm9sbFxuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cbiAgb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmFkZERyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUucmVtb3ZlRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XG4gIC8qIENka0xhenlEcm9wTGlzdCBlbmQgKi9cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRSb3dEcmFnXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3dEcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtEcmFnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dEcmFnRGlyZWN0aXZlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJvd0RyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgQ2RrTGF6eURyYWc8VCwgUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG4gIHJvb3RFbGVtZW50U2VsZWN0b3IgPSAncGJsLW5ncmlkLXJvdyc7XG5cbiAgZ2V0IGNvbnRleHQoKTogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgfVxuXG4gIEBJbnB1dCgncGJsTmdyaWRSb3dEcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAndGFibGUnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+Pikge1xuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcblxuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSB0aGlzLnBsdWdpbkN0cmwgPSB2YWx1ZSAmJiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh2YWx1ZS50YWJsZSk7XG4gICAgY29uc3QgcGx1Z2luID0gcGx1Z2luQ3RybCAmJiBwbHVnaW5DdHJsLmdldFBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICB0aGlzLmNka0Ryb3BMaXN0ID0gcGx1Z2luIHx8IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIGxhc3QgZHJhZ2dlZCBjb250ZXh0LlxuICAgKlxuICAgKiBUaGlzIGNvbnRleHQgaXMgbm90IHNpbWlsYXIgdG8gdGhlIGBjb250ZXh0YCBwcm9wZXJ0eS5cbiAgICogVGhlIGBjb250ZXh0YCBwcm9wZXJ0eSBob2xkcyB0aGUgY3VycmVudCBjb250ZXh0IHdoaWNoIGlzIHNoYXJlZCBhbmQgdXBkYXRlZCBvbiBzY3JvbGwgc28gaWYgYSB1c2VyIHN0YXJ0IGEgZHJhZyBhbmQgdGhlbiBzY3JvbGxlZFxuICAgKiB0aGUgY29udGV4dCB3aWxsIHBvaW50IHRvIHRoZSByb3cgaW4gdmlldyBhbmQgbm90IHRoZSBvcmlnaW5hbCBjZWxsLlxuICAgKi9cbiAgZ2V0IGRyYWdnZWRDb250ZXh0KCk6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAndGFibGUnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdnZWRDb250ZXh0O1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+O1xuICBwcml2YXRlIF9kcmFnZ2VkQ29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICd0YWJsZSc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+O1xuXG4gIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyO1xuXG4gIC8vIENUT1IgSVMgUkVRVUlSRUQgT1IgSVQgV09OVCBXT1JLIElOIEFPVFxuICAvLyBUT0RPOiBUcnkgdG8gcmVtb3ZlIHdoZW4gc3VwcG9ydGluZyBJVllcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RST1BfTElTVCkgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZHJvcENvbnRhaW5lcjogQ2RrRHJvcExpc3QsXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgY29uZmlnOiBEcmFnUmVmQ29uZmlnLFxuICAgICAgICAgICAgICBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sKSB7XG4gICAgc3VwZXIoLi4uY2RrRHJhZyhlbGVtZW50LCBkcm9wQ29udGFpbmVyLCBfZG9jdW1lbnQsIF9uZ1pvbmUsIF92aWV3Q29udGFpbmVyUmVmLCBjb25maWcsIF9kaXIsIGRyYWdEcm9wLCBfY2hhbmdlRGV0ZWN0b3JSZWYsIHZpZXdwb3J0UnVsZXIsIGRyYWdEcm9wUmVnaXN0cnkpKTtcbiAgICAvLyBzdXBlcihcbiAgICAvLyAgIGVsZW1lbnQsXG4gICAgLy8gICBkcm9wQ29udGFpbmVyLFxuICAgIC8vICAgX2RvY3VtZW50LFxuICAgIC8vICAgX25nWm9uZSxcbiAgICAvLyAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgIC8vICAgY29uZmlnLFxuICAgIC8vICAgX2RpcixcbiAgICAvLyAgIGRyYWdEcm9wLFxuICAgIC8vICAgX2NoYW5nZURldGVjdG9yUmVmLFxuICAgIC8vICk7XG5cbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdTdGFydCkgPT4ge1xuICAgICAgY29uc3QgeyBjb2wsIHJvdywgdGFibGUsIHZhbHVlIH0gID0gdGhpcy5fY29udGV4dDtcbiAgICAgIHRoaXMuX2RyYWdnZWRDb250ZXh0ID0geyBjb2wsIHJvdywgdGFibGUsIHZhbHVlIH07XG4gICAgfSk7XG5cblxuICB9XG5cbiAgLyogQ2RrTGF6eURyYWcgc3RhcnQgKi9cbiAgICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPGFueT4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRSb3dSZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZFJvd1Jlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xufVxuIl19