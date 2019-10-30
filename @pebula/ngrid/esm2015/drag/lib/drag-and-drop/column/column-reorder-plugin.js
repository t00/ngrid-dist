import * as tslib_1 from "tslib";
var PblNgridColumnReorderPluginDirective_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-output-rename
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Directive, ElementRef, Input, Inject, SkipSelf, Output, Optional, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDrag, CDK_DROP_LIST, CdkDropListGroup, CdkDropList, CDK_DRAG_CONFIG, DragDropRegistry, } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, TablePlugin, PblNgridPluginController } from '@pebula/ngrid';
import { cdkDropList, cdkDrag } from '../v7-compat';
import { CdkLazyDropList, CdkLazyDrag } from '../core';
import { extendGrid } from './extend-grid';
/** @type {?} */
export const PLUGIN_KEY = 'columnReorder';
/** @type {?} */
let _uniqueIdCounter = 0;
/**
 * @template T
 */
let PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective_1 = /**
 * @template T
 */
class PblNgridColumnReorderPluginDirective extends CdkDropList {
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
        this.id = `pbl-ngrid-column-reorder-list-${_uniqueIdCounter++}`;
        this.orientation = 'horizontal';
        this.dragging = new BehaviorSubject(false);
        this._columnReorder = false;
        this._manualOverride = false;
        this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.directContainerElement = '.pbl-ngrid-header-row-main';
        this.dropped.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (!this.manualOverride) {
                this.table.columnApi.moveColumn(((/** @type {?} */ (event.item))).column, event.currentIndex);
            }
        }));
        this.dragging.subscribe((/**
         * @param {?} isDragging
         * @return {?}
         */
        isDragging => {
            /** @type {?} */
            const el = element.nativeElement;
            if (isDragging) {
                el.classList.add('pbl-ngrid-column-list-dragging');
            }
            else {
                el.classList.remove('pbl-ngrid-column-list-dragging');
            }
            this.lastSwap = undefined;
        }));
        this.monkeyPatchDropListRef();
    }
    /**
     * @return {?}
     */
    get columnReorder() { return this._columnReorder; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set columnReorder(value) {
        value = coerceBooleanProperty(value);
        this._columnReorder = value;
    }
    /**
     * When true, will not move the column on drop.
     * Instead you need to handle the dropped event.
     * @return {?}
     */
    get manualOverride() { return this._manualOverride; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set manualOverride(value) { this._manualOverride = coerceBooleanProperty(value); }
    // Stuff to workaround encapsulation in CdkDropList
    /**
     * @private
     * @return {?}
     */
    get pblGetItemIndexFromPointerPosition() {
        return ((/** @type {?} */ (this._dropListRef)))._getItemIndexFromPointerPosition.bind(this._dropListRef);
    }
    /**
     * @private
     * @return {?}
     */
    get pblGetPositionCacheItems() {
        return ((/** @type {?} */ (this._dropListRef)))._itemPositions;
    }
    /**
     * @return {?}
     */
    get pblDropListRef() { return (/** @type {?} */ (this._dropListRef)); }
    // ngOnInit(): void { CdkLazyDropList.prototype.ngOnInit.call(this); }
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
    // beforeStarted(): void { CdkLazyDropList.prototype.beforeStarted.call(this); }
    /* CdkLazyDropList end */
    /**
     * @return {?}
     */
    ngOnInit() {
        CdkLazyDropList.prototype.ngOnInit.call(this); // super.ngOnInit();
        this.dropped.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this._pblReset()));
        this.pblDropListRef.beforeExit.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => this._pblReset()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._removePlugin(this.table);
    }
    /* protected */ /**
     * @return {?}
     */
    beforeStarted() {
        CdkLazyDropList.prototype.beforeStarted.call(this); // super.beforeStarted();
        this.lastSorted = undefined;
        this.dragging.next(true);
    }
    /**
     * @private
     * @return {?}
     */
    _pblReset() {
        this.dragging.next(false);
        /** @type {?} */
        const siblings = this.pblGetPositionCacheItems;
        siblings.forEach((/**
         * @param {?} sibling
         * @param {?} index
         * @return {?}
         */
        (sibling, index) => {
            for (const c of sibling.drag.data.getCells()) {
                c.style.transform = ``;
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    monkeyPatchDropListRef() {
        const { _sortItem, enter } = this._dropListRef;
        this.pblDropListRef.enter = (/**
         * @param {?} item
         * @param {?} pointerX
         * @param {?} pointerY
         * @return {?}
         */
        (item, pointerX, pointerY) => {
            /** @type {?} */
            const lastSorted = this.lastSorted;
            this.lastSorted = undefined;
            if (lastSorted && lastSorted.drag === item) {
                /** @type {?} */
                const isHorizontal = this.orientation === 'horizontal';
                pointerX = lastSorted.clientRect.left + 1 - (isHorizontal ? lastSorted.offset : 0);
                pointerY = lastSorted.clientRect.top + 1 - (!isHorizontal ? lastSorted.offset : 0);
            }
            enter.call(this._dropListRef, item, pointerX, pointerY);
        });
        this.pblDropListRef._sortItem = (/**
         * @param {?} item
         * @param {?} pointerX
         * @param {?} pointerY
         * @param {?} pointerDelta
         * @return {?}
         */
        (item, pointerX, pointerY, pointerDelta) => {
            /** @type {?} */
            const siblings = this.pblGetPositionCacheItems;
            this.lastSorted = siblings.find((/**
             * @param {?} s
             * @return {?}
             */
            s => s.drag === item));
            /** @type {?} */
            const newIndex = this.pblGetItemIndexFromPointerPosition((/** @type {?} */ (item)), pointerX, pointerY, pointerDelta);
            if (newIndex === -1 && siblings.length > 0) {
                return;
            }
            /** @type {?} */
            const oldOrder = siblings.slice();
            /** @type {?} */
            const isHorizontal = this.orientation === 'horizontal';
            /** @type {?} */
            const siblingAtNewPosition = siblings[newIndex];
            if (siblingAtNewPosition.drag.data.column.wontBudge) {
                return;
            }
            // we now need to find if between current and new position there are items with `wontBudge`
            /** @type {?} */
            const itemAtOriginalPosition = this.lastSwap ? this.lastSwap : item;
            /** @type {?} */
            const currentIndex = siblings.findIndex((/**
             * @param {?} currentItem
             * @return {?}
             */
            currentItem => currentItem.drag === itemAtOriginalPosition));
            /** @type {?} */
            const start = Math.min(newIndex, currentIndex);
            /** @type {?} */
            const itemsDraggedOver = siblings.slice(start, Math.abs(newIndex - currentIndex) + start);
            for (const dragItem of itemsDraggedOver) {
                if (dragItem.drag.data.column.wontBudge && dragItem.drag !== item) {
                    return;
                }
            }
            // check if we move the item outside of locked group OR into a locked group... both are invalid.
            if (!item.data.column.checkGroupLockConstraint(siblingAtNewPosition.drag.data.column)) {
                return;
            }
            _sortItem.call(this._dropListRef, item, pointerX, pointerY, pointerDelta);
            this.lastSwap = siblingAtNewPosition.drag;
            if (isHorizontal) {
                siblings.forEach((/**
                 * @param {?} sibling
                 * @param {?} index
                 * @return {?}
                 */
                (sibling, index) => {
                    // Don't do anything if the position hasn't changed.
                    if (oldOrder[index] === sibling) {
                        return;
                    }
                    for (const c of sibling.drag.data.getCells()) {
                        c.style.transform = `translate3d(${sibling.offset}px, 0, 0)`;
                    }
                }));
            }
        });
    }
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
                    { provide: CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective_1 },
                ],
            },] }
];
/** @nocollapse */
PblNgridColumnReorderPluginDirective.ctorParameters = () => [
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
PblNgridColumnReorderPluginDirective.propDecorators = {
    columnReorder: [{ type: Input }],
    manualOverride: [{ type: Input }],
    dragging: [{ type: Output, args: ['cdkDropDragging',] }]
};
/**
 * @template T
 */
PblNgridColumnReorderPluginDirective = PblNgridColumnReorderPluginDirective_1 = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY, runOnce: extendGrid }),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
        PblNgridPluginController,
        ElementRef,
        DragDrop,
        ChangeDetectorRef,
        Directionality,
        CdkDropListGroup,
        DragDropRegistry, Object])
], PblNgridColumnReorderPluginDirective);
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
export class PblNgridColumnDragDirective extends CdkDrag {
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
        this.rootElementSelector = 'pbl-ngrid-header-cell';
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        this._context = value;
        this.column = value && value.col;
        /** @type {?} */
        const pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.table);
        /** @type {?} */
        const plugin = pluginCtrl && pluginCtrl.getPlugin(PLUGIN_KEY);
        this.cdkDropList = plugin || undefined;
        this.disabled = this.column && this.column.reorder ? false : true;
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
    // ngAfterViewInit(): void { CdkLazyDrag.prototype.ngAfterViewInit.call(this); super.ngAfterViewInit(); }
    /**
     * @return {?}
     */
    ngOnDestroy() { CdkLazyDrag.prototype.ngOnDestroy.call(this); super.ngOnDestroy(); }
    /* CdkLazyDrag end */
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        CdkLazyDrag.prototype.ngAfterViewInit.call(this);
        super.ngAfterViewInit();
        this._dragRef.beforeStarted.subscribe((/**
         * @return {?}
         */
        () => {
            const { cdkDropList } = this;
            if (cdkDropList && cdkDropList.columnReorder && this._context.col.reorder) {
                // we don't allow a new dragging session before the previous ends.
                // this sound impossible, but due to animation transitions its actually is.
                // if the `transitionend` is long enough, a new drag can start...
                //
                // the `disabled` state is checked by pointerDown AFTER calling before start so we can cancel the start...
                if (cdkDropList._dropListRef.isDragging()) {
                    return this.disabled = true;
                }
            }
        }));
        this.started.subscribe((/**
         * @return {?}
         */
        () => this._context.col.columnDef.isDragging = true));
        this.ended.subscribe((/**
         * @return {?}
         */
        () => this._context.col.columnDef.isDragging = false));
    }
    /**
     * @return {?}
     */
    getCells() {
        if (!this.cache) {
            this.cache = this._context.col.columnDef.queryCellElements('table');
        }
        return this.cache;
    }
    /**
     * @return {?}
     */
    reset() {
        super.reset();
        if (this.cache) {
            for (const el of this.cache) {
                el.style.transform = ``;
            }
            this.cache = undefined;
        }
    }
}
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
PblNgridColumnDragDirective.ctorParameters = () => [
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
PblNgridColumnDragDirective.propDecorators = {
    context: [{ type: Input, args: ['pblNgridColumnDrag',] }],
    rootElementSelectorClass: [{ type: Input, args: ['cdkDragRootElementClass',] }],
    cdkDropList: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxFQUVOLFFBQVEsRUFFUixnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBRVAsYUFBYSxFQUViLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsZUFBZSxFQUVmLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFhLHdCQUF3QixFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUN6SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUd2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVEzQyxNQUFNLE9BQU8sVUFBVSxHQUFvQixlQUFlOztJQUV0RCxnQkFBZ0IsR0FB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YztZQUdyQixRQUFRO1lBbEJSLGlCQUFpQjtZQTZCVixhQUFhLHVCQTRQUCxRQUFRO1lBOVByQixnQkFBZ0IsdUJBK1BILFFBQVE7OztzQkExQnBCLEtBQUssU0FBQyxvQkFBb0I7dUNBNkMxQixLQUFLLFNBQUMseUJBQXlCOzBCQWMvQixLQUFLOzs7O0lBL0ROLDBEQUE4Qzs7SUFFOUMsNkNBQWtCOzs7OztJQVdsQiwrQ0FBd0g7Ozs7O0lBQ3hILGlEQUE2Qzs7Ozs7SUFDN0MsNENBQTZCOztJQTZEN0IsaURBQW1COztJQUNuQixtREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1vdXRwdXQtcmVuYW1lXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgU2tpcFNlbGYsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgT25Jbml0LFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBOZ1pvbmUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBEcmFnRHJvcCxcbiAgQ2RrRHJhZyxcbiAgQ2RrRHJhZ0Ryb3AsXG4gIENES19EUk9QX0xJU1QsXG4gIERyYWdSZWYsXG4gIENka0Ryb3BMaXN0R3JvdXAsXG4gIENka0Ryb3BMaXN0LFxuICBDREtfRFJBR19DT05GSUcsXG4gIERyYWdSZWZDb25maWcsXG4gIERyYWdEcm9wUmVnaXN0cnksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgVGFibGVQbHVnaW4sIFBibENvbHVtbiwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENlbGxDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBjZGtEcm9wTGlzdCwgY2RrRHJhZyB9IGZyb20gJy4uL3Y3LWNvbXBhdCc7XG5pbXBvcnQgeyBDZGtMYXp5RHJvcExpc3QsIENka0xhenlEcmFnIH0gZnJvbSAnLi4vY29yZSc7XG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4uL2NvcmUvZHJvcC1saXN0LXJlZic7XG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi4vY29yZS9kcmFnLXJlZic7XG5pbXBvcnQgeyBleHRlbmRHcmlkIH0gZnJvbSAnLi9leHRlbmQtZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjb2x1bW5SZW9yZGVyPzogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnY29sdW1uUmVvcmRlcicgPSAnY29sdW1uUmVvcmRlcic7XG5cbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIHJ1bk9uY2U6IGV4dGVuZEdyaWQgfSlcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtjb2x1bW5SZW9yZGVyXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5SZW9yZGVyJyxcbiAgaW5wdXRzOiBbXG4gICAgJ2RpcmVjdENvbnRhaW5lckVsZW1lbnQ6Y2RrRHJvcExpc3REaXJlY3RDb250YWluZXJFbGVtZW50J1xuICBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ2Nkay1kcm9wLWxpc3QnLFxuICAgICdbaWRdJzogJ2lkJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtZHJhZ2dpbmddJzogJ19kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCknLFxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1yZWNlaXZpbmddJzogJ19kcm9wTGlzdFJlZi5pc1JlY2VpdmluZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENka0xhenlEcm9wTGlzdDxULCBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcbiAgaWQgPSBgcGJsLW5ncmlkLWNvbHVtbi1yZW9yZGVyLWxpc3QtJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcbiAgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgQElucHV0KCkgZ2V0IGNvbHVtblJlb3JkZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jb2x1bW5SZW9yZGVyOyB9O1xuICBzZXQgY29sdW1uUmVvcmRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICB0aGlzLl9jb2x1bW5SZW9yZGVyID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB3aWxsIG5vdCBtb3ZlIHRoZSBjb2x1bW4gb24gZHJvcC5cbiAgICogSW5zdGVhZCB5b3UgbmVlZCB0byBoYW5kbGUgdGhlIGRyb3BwZWQgZXZlbnQuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbWFudWFsT3ZlcnJpZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9tYW51YWxPdmVycmlkZTsgfTtcbiAgc2V0IG1hbnVhbE92ZXJyaWRlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX21hbnVhbE92ZXJyaWRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIEBPdXRwdXQoJ2Nka0Ryb3BEcmFnZ2luZycpIGRyYWdnaW5nOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBwcml2YXRlIF9jb2x1bW5SZW9yZGVyID0gZmFsc2U7XG4gIHByaXZhdGUgX21hbnVhbE92ZXJyaWRlID0gZmFsc2U7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIGxhc3RTd2FwOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47XG4gIHByaXZhdGUgbGFzdFNvcnRlZDogeyBkcmFnOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47IG9mZnNldDogbnVtYmVyOyBjbGllbnRSZWN0OiBDbGllbnRSZWN0OyB9O1xuXG4gIC8vIFN0dWZmIHRvIHdvcmthcm91bmQgZW5jYXBzdWxhdGlvbiBpbiBDZGtEcm9wTGlzdFxuICBwcml2YXRlIGdldCBwYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKCk6IChpdGVtOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4sIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIsIGRlbHRhPzoge3g6IG51bWJlciwgeTogbnVtYmVyfSkgPT4gbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2dldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24uYmluZCh0aGlzLl9kcm9wTGlzdFJlZik7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgcGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zKCk6IHsgZHJhZzogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+OyBvZmZzZXQ6IG51bWJlcjsgY2xpZW50UmVjdDogQ2xpZW50UmVjdDsgfVtdIHtcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2l0ZW1Qb3NpdGlvbnM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRyYWdEcm9wUmVnaXN0cnk/OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwgLy8gZm9yIHY3IGNvbXBhdFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnkpIHtcbiAgICBzdXBlciguLi5jZGtEcm9wTGlzdChlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXAsIGRyYWdEcm9wUmVnaXN0cnksIF9kb2N1bWVudCkpO1xuICAgICAvLyBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50ID0gJy5wYmwtbmdyaWQtaGVhZGVyLXJvdy1tYWluJztcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdEcm9wPFQsIGFueT4pID0+IHtcbiAgICAgIGlmICghdGhpcy5tYW51YWxPdmVycmlkZSkge1xuICAgICAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKChldmVudC5pdGVtIGFzIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPikuY29sdW1uLCBldmVudC5jdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFnZ2luZy5zdWJzY3JpYmUoIGlzRHJhZ2dpbmcgPT4ge1xuICAgICAgY29uc3QgZWwgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY29sdW1uLWxpc3QtZHJhZ2dpbmcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jb2x1bW4tbGlzdC1kcmFnZ2luZycpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0U3dhcCA9IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIHRoaXMubW9ua2V5UGF0Y2hEcm9wTGlzdFJlZigpO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgLy8gbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgLy8gYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgLy8gc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmJlZm9yZUV4aXQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IC8vIHN1cGVyLmJlZm9yZVN0YXJ0ZWQoKTtcbiAgICB0aGlzLmxhc3RTb3J0ZWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGJsUmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KGZhbHNlKTtcbiAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xuICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtb25rZXlQYXRjaERyb3BMaXN0UmVmKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgX3NvcnRJdGVtLCBlbnRlciB9ID0gdGhpcy5fZHJvcExpc3RSZWY7XG5cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmVudGVyID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGFzdFNvcnRlZCA9IHRoaXMubGFzdFNvcnRlZFxuICAgICAgdGhpcy5sYXN0U29ydGVkID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGxhc3RTb3J0ZWQgJiYgbGFzdFNvcnRlZC5kcmFnID09PSBpdGVtKSB7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgICAgcG9pbnRlclggPSBsYXN0U29ydGVkLmNsaWVudFJlY3QubGVmdCArIDEgLSAoaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcbiAgICAgICAgcG9pbnRlclkgPSBsYXN0U29ydGVkLmNsaWVudFJlY3QudG9wICsgMSAtICghaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcbiAgICAgIH1cbiAgICAgIGVudGVyLmNhbGwodGhpcy5fZHJvcExpc3RSZWYsIGl0ZW0sIHBvaW50ZXJYLCBwb2ludGVyWSk7XG4gICAgfTtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuX3NvcnRJdGVtID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlciwgcG9pbnRlckRlbHRhOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xuICAgICAgdGhpcy5sYXN0U29ydGVkID0gc2libGluZ3MuZmluZCggcyA9PiBzLmRyYWcgPT09IGl0ZW0gKTtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5wYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKGl0ZW0gYXMgRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XG4gICAgICBpZiAobmV3SW5kZXggPT09IC0xICYmIHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkT3JkZXIgPSBzaWJsaW5ncy5zbGljZSgpO1xuICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgY29uc3Qgc2libGluZ0F0TmV3UG9zaXRpb24gPSBzaWJsaW5nc1tuZXdJbmRleF07XG5cbiAgICAgIGlmIChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIG5vdyBuZWVkIHRvIGZpbmQgaWYgYmV0d2VlbiBjdXJyZW50IGFuZCBuZXcgcG9zaXRpb24gdGhlcmUgYXJlIGl0ZW1zIHdpdGggYHdvbnRCdWRnZWBcbiAgICAgIGNvbnN0IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gPSB0aGlzLmxhc3RTd2FwID8gdGhpcy5sYXN0U3dhcCA6IGl0ZW07XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBzaWJsaW5ncy5maW5kSW5kZXgoIGN1cnJlbnRJdGVtID0+IGN1cnJlbnRJdGVtLmRyYWcgPT09IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5taW4obmV3SW5kZXgsIGN1cnJlbnRJbmRleClcbiAgICAgIGNvbnN0IGl0ZW1zRHJhZ2dlZE92ZXIgPSBzaWJsaW5ncy5zbGljZShzdGFydCwgTWF0aC5hYnMobmV3SW5kZXggLSBjdXJyZW50SW5kZXgpICsgc3RhcnQpO1xuICAgICAgZm9yIChjb25zdCBkcmFnSXRlbSBvZiBpdGVtc0RyYWdnZWRPdmVyKSB7XG4gICAgICAgIGlmIChkcmFnSXRlbS5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSAmJiBkcmFnSXRlbS5kcmFnICE9PSBpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHdlIG1vdmUgdGhlIGl0ZW0gb3V0c2lkZSBvZiBsb2NrZWQgZ3JvdXAgT1IgaW50byBhIGxvY2tlZCBncm91cC4uLiBib3RoIGFyZSBpbnZhbGlkLlxuICAgICAgaWYgKCFpdGVtLmRhdGEuY29sdW1uLmNoZWNrR3JvdXBMb2NrQ29uc3RyYWludChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9zb3J0SXRlbS5jYWxsKHRoaXMuX2Ryb3BMaXN0UmVmLCBpdGVtLCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XG5cbiAgICAgIHRoaXMubGFzdFN3YXAgPSBzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnO1xuXG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhlIHBvc2l0aW9uIGhhc24ndCBjaGFuZ2VkLlxuICAgICAgICAgIGlmIChvbGRPcmRlcltpbmRleF0gPT09IHNpYmxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICAgICAgYy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtzaWJsaW5nLm9mZnNldH1weCwgMCwgMClgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDb2x1bW5EcmFnXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5EcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtEcmFnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2RrTGF6eURyYWc8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+LCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+IHtcbiAgcm9vdEVsZW1lbnRTZWxlY3RvciA9ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnO1xuXG4gIGNvbHVtbjogUGJsQ29sdW1uO1xuXG4gIEBJbnB1dCgncGJsTmdyaWRDb2x1bW5EcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAndGFibGUnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+Pikge1xuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcbiAgICB0aGlzLmNvbHVtbiA9IHZhbHVlICYmIHZhbHVlLmNvbDtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gdGhpcy5wbHVnaW5DdHJsID0gdmFsdWUgJiYgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodmFsdWUudGFibGUpO1xuICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbkN0cmwgJiYgcGx1Z2luQ3RybC5nZXRQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgdGhpcy5jZGtEcm9wTGlzdCA9IHBsdWdpbiB8fCB1bmRlZmluZWQ7XG4gICAgdGhpcy5kaXNhYmxlZCA9IHRoaXMuY29sdW1uICYmIHRoaXMuY29sdW1uLnJlb3JkZXIgPyBmYWxzZSA6IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9jb250ZXh0OiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ3RhYmxlJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj5cbiAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI7XG4gIHByaXZhdGUgY2FjaGU6IEhUTUxFbGVtZW50W107XG5cbiAgLy8gQ1RPUiBJUyBSRVFVSVJFRCBPUiBJVCBXT05UIFdPUksgSU4gQU9UXG4gIC8vIFRPRE86IFRyeSB0byByZW1vdmUgd2hlbiBzdXBwb3J0aW5nIElWWVxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJPUF9MSVNUKSBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBkcm9wQ29udGFpbmVyOiBDZGtEcm9wTGlzdCxcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RSQUdfQ09ORklHKSBjb25maWc6IERyYWdSZWZDb25maWcsXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG5cbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlciwgLy8gZm9yIHY3IGNvbXBhdFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5OiBEcmFnRHJvcFJlZ2lzdHJ5PGFueSwgYW55PiwpIHtcbiAgICBzdXBlciguLi5jZGtEcmFnKGVsZW1lbnQsIGRyb3BDb250YWluZXIsIF9kb2N1bWVudCwgX25nWm9uZSwgX3ZpZXdDb250YWluZXJSZWYsIGNvbmZpZywgX2RpciwgZHJhZ0Ryb3AsIF9jaGFuZ2VEZXRlY3RvclJlZiwgdmlld3BvcnRSdWxlciwgZHJhZ0Ryb3BSZWdpc3RyeSkpO1xuICAgIC8vIHN1cGVyKFxuICAgIC8vICAgZWxlbWVudCxcbiAgICAvLyAgIGRyb3BDb250YWluZXIsXG4gICAgLy8gICBfZG9jdW1lbnQsXG4gICAgLy8gICBfbmdab25lLFxuICAgIC8vICAgX3ZpZXdDb250YWluZXJSZWYsXG4gICAgLy8gICBjb25maWcsXG4gICAgLy8gICBfZGlyLFxuICAgIC8vICAgZHJhZ0Ryb3AsXG4gICAgLy8gICBfY2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgLy8gKTtcbiAgfVxuXG4gIC8qIENka0xhenlEcmFnIHN0YXJ0ICovXG4gIC8qKlxuICAgKiBBIGNsYXNzIHRvIHNldCB3aGVuIHRoZSByb290IGVsZW1lbnQgaXMgbm90IHRoZSBob3N0IGVsZW1lbnQuIChpLmUuIHdoZW4gYGNka0RyYWdSb290RWxlbWVudGAgaXMgdXNlZCkuXG4gICAqL1xuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9yb290Q2xhc3MgJiYgdGhpcy5faG9zdE5vdFJvb3QpIHtcbiAgICAgIGlmICh0aGlzLl9yb290Q2xhc3MpIHtcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PiB7IHJldHVybiB0aGlzLl9kcmFnUmVmIGFzIGFueTsgfVxuXG4gIEBJbnB1dCgpIGdldCBjZGtEcm9wTGlzdCgpOiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4geyByZXR1cm4gdGhpcy5kcm9wQ29udGFpbmVyIGFzIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPjsgfVxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPikge1xuICAgIC8vIFRPIFNVUFBPUlQgYGNka0Ryb3BMaXN0YCB2aWEgc3RyaW5nIGlucHV0IChJRCkgd2UgbmVlZCBhIHJlYWN0aXZlIHJlZ2lzdHJ5Li4uXG4gICAgaWYgKHRoaXMuY2RrRHJvcExpc3QpIHtcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5kcm9wQ29udGFpbmVyID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9kcmFnUmVmLl93aXRoRHJvcENvbnRhaW5lcih2YWx1ZS5fZHJvcExpc3RSZWYpO1xuICAgICAgdmFsdWUuYWRkRHJhZyh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBfcm9vdENsYXNzOiBzdHJpbmc7XG4gIF9ob3N0Tm90Um9vdCA9IGZhbHNlO1xuICBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgLy8gbmdBZnRlclZpZXdJbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7IHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdPbkRlc3Ryb3kuY2FsbCh0aGlzKTsgIHN1cGVyLm5nT25EZXN0cm95KCk7IH1cbiAgLyogQ2RrTGF6eURyYWcgZW5kICovXG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIENka0xhenlEcmFnLnByb3RvdHlwZS5uZ0FmdGVyVmlld0luaXQuY2FsbCh0aGlzKTtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcblxuICAgIHRoaXMuX2RyYWdSZWYuYmVmb3JlU3RhcnRlZC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgIGNvbnN0IHsgY2RrRHJvcExpc3QgfSA9IHRoaXM7XG4gICAgICBpZiAoY2RrRHJvcExpc3QgJiYgY2RrRHJvcExpc3QuY29sdW1uUmVvcmRlciAmJiB0aGlzLl9jb250ZXh0LmNvbC5yZW9yZGVyKSB7XG4gICAgICAgIC8vIHdlIGRvbid0IGFsbG93IGEgbmV3IGRyYWdnaW5nIHNlc3Npb24gYmVmb3JlIHRoZSBwcmV2aW91cyBlbmRzLlxuICAgICAgICAvLyB0aGlzIHNvdW5kIGltcG9zc2libGUsIGJ1dCBkdWUgdG8gYW5pbWF0aW9uIHRyYW5zaXRpb25zIGl0cyBhY3R1YWxseSBpcy5cbiAgICAgICAgLy8gaWYgdGhlIGB0cmFuc2l0aW9uZW5kYCBpcyBsb25nIGVub3VnaCwgYSBuZXcgZHJhZyBjYW4gc3RhcnQuLi5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhlIGBkaXNhYmxlZGAgc3RhdGUgaXMgY2hlY2tlZCBieSBwb2ludGVyRG93biBBRlRFUiBjYWxsaW5nIGJlZm9yZSBzdGFydCBzbyB3ZSBjYW4gY2FuY2VsIHRoZSBzdGFydC4uLlxuICAgICAgICBpZiAoY2RrRHJvcExpc3QuX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2NvbnRleHQuY29sLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gdHJ1ZSApO1xuICAgIHRoaXMuZW5kZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IGZhbHNlICk7XG4gIH1cblxuICBnZXRDZWxscygpOiBIVE1MRWxlbWVudFtdIHtcbiAgICBpZiAoIXRoaXMuY2FjaGUpIHtcbiAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoJ3RhYmxlJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNhY2hlO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgc3VwZXIucmVzZXQoKTtcbiAgICBpZiAodGhpcy5jYWNoZSkge1xuICAgICAgZm9yIChjb25zdCBlbCBvZiB0aGlzLmNhY2hlKSB7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgICAgfVxuICAgICAgdGhpcy5jYWNoZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==