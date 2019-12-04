import * as tslib_1 from "tslib";
var PblNgridColumnReorderPluginDirective_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
PblNgridColumnReorderPluginDirective.ctorParameters = () => [
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
        const pluginCtrl = this.pluginCtrl = value && PblNgridPluginController.find(value.grid);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBQ1AsV0FBVyxFQUNYLGFBQWEsRUFDYixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUd2RCxPQUFP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RSxXQUFXLEVBQUUsMkJBQTJCLEVBQUU7aUJBQy9EO2FBQ0Y7Ozs7WUF4UEMsVUFBVTtZQXNCVixXQUFXLHVCQXdQRSxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVEsWUFBSSxRQUFROzRDQUMzQyxNQUFNLFNBQUMsUUFBUTtZQXRRNUIsTUFBTTtZQUROLGdCQUFnQjs0Q0EwUUgsTUFBTSxTQUFDLGVBQWU7WUFyUTVCLGNBQWM7WUFHckIsUUFBUTtZQWxCUixpQkFBaUI7WUE2QlYsYUFBYSx1QkE0UFAsUUFBUTtZQTlQckIsZ0JBQWdCLHVCQStQSCxRQUFROzs7c0JBMUJwQixLQUFLLFNBQUMsb0JBQW9CO3VDQTZDMUIsS0FBSyxTQUFDLHlCQUF5QjswQkFjL0IsS0FBSzs7OztJQS9ETiwwREFBOEM7O0lBRTlDLDZDQUFrQjs7Ozs7SUFXbEIsK0NBQXVIOzs7OztJQUN2SCxpREFBNkM7Ozs7O0lBQzdDLDRDQUE2Qjs7SUE2RDdCLGlEQUFtQjs7SUFDbkIsbURBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tb3V0cHV0LXJlbmFtZVxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIFNraXBTZWxmLFxuICBPdXRwdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIE9uSW5pdCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgRHJhZ0Ryb3AsXG4gIENka0RyYWcsXG4gIENka0RyYWdEcm9wLFxuICBDREtfRFJPUF9MSVNULFxuICBEcmFnUmVmLFxuICBDZGtEcm9wTGlzdEdyb3VwLFxuICBDZGtEcm9wTGlzdCxcbiAgQ0RLX0RSQUdfQ09ORklHLFxuICBEcmFnUmVmQ29uZmlnLFxuICBEcmFnRHJvcFJlZ2lzdHJ5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIE5ncmlkUGx1Z2luLCBQYmxDb2x1bW4sIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgY2RrRHJvcExpc3QsIGNka0RyYWcgfSBmcm9tICcuLi92Ny1jb21wYXQnO1xuaW1wb3J0IHsgQ2RrTGF6eURyb3BMaXN0LCBDZGtMYXp5RHJhZyB9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuLi9jb3JlL2Ryb3AtbGlzdC1yZWYnO1xuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xuaW1wb3J0IHsgZXh0ZW5kR3JpZCB9IGZyb20gJy4vZXh0ZW5kLWdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgY29sdW1uUmVvcmRlcj86IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NvbHVtblJlb3JkZXInID0gJ2NvbHVtblJlb3JkZXInO1xuXG5sZXQgX3VuaXF1ZUlkQ291bnRlciA9IDA7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBydW5PbmNlOiBleHRlbmRHcmlkIH0pXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY29sdW1uUmVvcmRlcl0nLFxuICBleHBvcnRBczogJ3BibE5ncmlkQ29sdW1uUmVvcmRlcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG4gIGlkID0gYHBibC1uZ3JpZC1jb2x1bW4tcmVvcmRlci1saXN0LSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIEBJbnB1dCgpIGdldCBjb2x1bW5SZW9yZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY29sdW1uUmVvcmRlcjsgfTtcbiAgc2V0IGNvbHVtblJlb3JkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fY29sdW1uUmVvcmRlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgd2lsbCBub3QgbW92ZSB0aGUgY29sdW1uIG9uIGRyb3AuXG4gICAqIEluc3RlYWQgeW91IG5lZWQgdG8gaGFuZGxlIHRoZSBkcm9wcGVkIGV2ZW50LlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1hbnVhbE92ZXJyaWRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbWFudWFsT3ZlcnJpZGU7IH07XG4gIHNldCBtYW51YWxPdmVycmlkZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9tYW51YWxPdmVycmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBAT3V0cHV0KCdjZGtEcm9wRHJhZ2dpbmcnKSBkcmFnZ2luZzogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgcHJpdmF0ZSBfY29sdW1uUmVvcmRlciA9IGZhbHNlO1xuICBwcml2YXRlIF9tYW51YWxPdmVycmlkZSA9IGZhbHNlO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBsYXN0U3dhcDogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+O1xuICBwcml2YXRlIGxhc3RTb3J0ZWQ6IHsgZHJhZzogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+OyBvZmZzZXQ6IG51bWJlcjsgY2xpZW50UmVjdDogQ2xpZW50UmVjdDsgfTtcblxuICAvLyBTdHVmZiB0byB3b3JrYXJvdW5kIGVuY2Fwc3VsYXRpb24gaW4gQ2RrRHJvcExpc3RcbiAgcHJpdmF0ZSBnZXQgcGJsR2V0SXRlbUluZGV4RnJvbVBvaW50ZXJQb3NpdGlvbigpOiAoaXRlbTogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBwb2ludGVyWDogbnVtYmVyLCBwb2ludGVyWTogbnVtYmVyLCBkZWx0YT86IHt4OiBudW1iZXIsIHk6IG51bWJlcn0pID0+IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnkpLl9nZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uLmJpbmQodGhpcy5fZHJvcExpc3RSZWYpO1xuICB9XG4gIHByaXZhdGUgZ2V0IHBibEdldFBvc2l0aW9uQ2FjaGVJdGVtcygpOiB7IGRyYWc6IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+Pjsgb2Zmc2V0OiBudW1iZXI7IGNsaWVudFJlY3Q6IENsaWVudFJlY3Q7IH1bXSB7XG4gICAgcmV0dXJuICh0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnkpLl9pdGVtUG9zaXRpb25zO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5PzogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XG4gICAgc3VwZXIoLi4uY2RrRHJvcExpc3QoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwLCBkcmFnRHJvcFJlZ2lzdHJ5LCBfZG9jdW1lbnQpKTtcbiAgICAgLy8gc3VwZXIoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwKTtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHRoaXMuZGlyZWN0Q29udGFpbmVyRWxlbWVudCA9ICcucGJsLW5ncmlkLWhlYWRlci1yb3ctbWFpbic7XG4gICAgdGhpcy5kcm9wcGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnRHJvcDxULCBhbnk+KSA9PiB7XG4gICAgICBpZiAoIXRoaXMubWFudWFsT3ZlcnJpZGUpIHtcbiAgICAgICAgdGhpcy50YWJsZS5jb2x1bW5BcGkubW92ZUNvbHVtbigoZXZlbnQuaXRlbSBhcyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4pLmNvbHVtbiwgZXZlbnQuY3VycmVudEluZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZHJhZ2dpbmcuc3Vic2NyaWJlKCBpc0RyYWdnaW5nID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgaWYgKGlzRHJhZ2dpbmcpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNvbHVtbi1saXN0LWRyYWdnaW5nJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtY29sdW1uLWxpc3QtZHJhZ2dpbmcnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubGFzdFN3YXAgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1vbmtleVBhdGNoRHJvcExpc3RSZWYoKTtcbiAgfVxuXG4gIC8qIENka0xhenlEcm9wTGlzdCBzdGFydCAqL1xuICAvKipcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcbiAgICogaXMgdXNlZnVsIHdoZW4gdGhlIGBjZGtEcm9wTGlzdGAgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChpLmUuIGFuY2VzdG9yIGJ1dCBub3QgZmF0aGVyKVxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICAgKi9cbiAgZGlyZWN0Q29udGFpbmVyRWxlbWVudDogc3RyaW5nO1xuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8UGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cbiAgb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XG4gIC8vIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmFkZERyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUucmVtb3ZlRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIC8vIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XG4gIC8qIENka0xhenlEcm9wTGlzdCBlbmQgKi9cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IC8vIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5kcm9wcGVkLnN1YnNjcmliZSggZSA9PiB0aGlzLl9wYmxSZXNldCgpICk7XG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5iZWZvcmVFeGl0LnN1YnNjcmliZSggZSA9PiB0aGlzLl9wYmxSZXNldCgpICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxuXG4gIC8qIHByb3RlY3RlZCAqLyBiZWZvcmVTdGFydGVkKCk6IHZvaWQge1xuICAgIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyAvLyBzdXBlci5iZWZvcmVTdGFydGVkKCk7XG4gICAgdGhpcy5sYXN0U29ydGVkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZHJhZ2dpbmcubmV4dCh0cnVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3BibFJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuZHJhZ2dpbmcubmV4dChmYWxzZSk7XG4gICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLnBibEdldFBvc2l0aW9uQ2FjaGVJdGVtcztcbiAgICBzaWJsaW5ncy5mb3JFYWNoKChzaWJsaW5nLCBpbmRleCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBjIG9mIHNpYmxpbmcuZHJhZy5kYXRhLmdldENlbGxzKCkpIHtcbiAgICAgICAgYy5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbW9ua2V5UGF0Y2hEcm9wTGlzdFJlZigpOiB2b2lkIHtcbiAgICBjb25zdCB7IF9zb3J0SXRlbSwgZW50ZXIgfSA9IHRoaXMuX2Ryb3BMaXN0UmVmO1xuXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5lbnRlciA9IChpdGVtOiBQYXJhbWV0ZXJzPHR5cGVvZiBlbnRlcj5bMF0sIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IGxhc3RTb3J0ZWQgPSB0aGlzLmxhc3RTb3J0ZWRcbiAgICAgIHRoaXMubGFzdFNvcnRlZCA9IHVuZGVmaW5lZDtcbiAgICAgIGlmIChsYXN0U29ydGVkICYmIGxhc3RTb3J0ZWQuZHJhZyA9PT0gaXRlbSkge1xuICAgICAgICBjb25zdCBpc0hvcml6b250YWwgPSB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIHBvaW50ZXJYID0gbGFzdFNvcnRlZC5jbGllbnRSZWN0LmxlZnQgKyAxIC0gKGlzSG9yaXpvbnRhbCA/IGxhc3RTb3J0ZWQub2Zmc2V0IDogMCk7XG4gICAgICAgIHBvaW50ZXJZID0gbGFzdFNvcnRlZC5jbGllbnRSZWN0LnRvcCArIDEgLSAoIWlzSG9yaXpvbnRhbCA/IGxhc3RTb3J0ZWQub2Zmc2V0IDogMCk7XG4gICAgICB9XG4gICAgICBlbnRlci5jYWxsKHRoaXMuX2Ryb3BMaXN0UmVmLCBpdGVtLCBwb2ludGVyWCwgcG9pbnRlclkpO1xuICAgIH07XG5cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLl9zb3J0SXRlbSA9IChpdGVtOiBQYXJhbWV0ZXJzPHR5cGVvZiBlbnRlcj5bMF0sIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIsIHBvaW50ZXJEZWx0YToge3g6IG51bWJlciwgeTogbnVtYmVyfSk6IHZvaWQgPT4ge1xuICAgICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLnBibEdldFBvc2l0aW9uQ2FjaGVJdGVtcztcbiAgICAgIHRoaXMubGFzdFNvcnRlZCA9IHNpYmxpbmdzLmZpbmQoIHMgPT4gcy5kcmFnID09PSBpdGVtICk7XG4gICAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMucGJsR2V0SXRlbUluZGV4RnJvbVBvaW50ZXJQb3NpdGlvbihpdGVtIGFzIERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PiwgcG9pbnRlclgsIHBvaW50ZXJZLCBwb2ludGVyRGVsdGEpO1xuICAgICAgaWYgKG5ld0luZGV4ID09PSAtMSAmJiBzaWJsaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZE9yZGVyID0gc2libGluZ3Muc2xpY2UoKTtcbiAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgIGNvbnN0IHNpYmxpbmdBdE5ld1Bvc2l0aW9uID0gc2libGluZ3NbbmV3SW5kZXhdO1xuXG4gICAgICBpZiAoc2libGluZ0F0TmV3UG9zaXRpb24uZHJhZy5kYXRhLmNvbHVtbi53b250QnVkZ2UpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB3ZSBub3cgbmVlZCB0byBmaW5kIGlmIGJldHdlZW4gY3VycmVudCBhbmQgbmV3IHBvc2l0aW9uIHRoZXJlIGFyZSBpdGVtcyB3aXRoIGB3b250QnVkZ2VgXG4gICAgICBjb25zdCBpdGVtQXRPcmlnaW5hbFBvc2l0aW9uID0gdGhpcy5sYXN0U3dhcCA/IHRoaXMubGFzdFN3YXAgOiBpdGVtO1xuICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gc2libGluZ3MuZmluZEluZGV4KCBjdXJyZW50SXRlbSA9PiBjdXJyZW50SXRlbS5kcmFnID09PSBpdGVtQXRPcmlnaW5hbFBvc2l0aW9uICk7XG4gICAgICBjb25zdCBzdGFydCA9IE1hdGgubWluKG5ld0luZGV4LCBjdXJyZW50SW5kZXgpXG4gICAgICBjb25zdCBpdGVtc0RyYWdnZWRPdmVyID0gc2libGluZ3Muc2xpY2Uoc3RhcnQsIE1hdGguYWJzKG5ld0luZGV4IC0gY3VycmVudEluZGV4KSArIHN0YXJ0KTtcbiAgICAgIGZvciAoY29uc3QgZHJhZ0l0ZW0gb2YgaXRlbXNEcmFnZ2VkT3Zlcikge1xuICAgICAgICBpZiAoZHJhZ0l0ZW0uZHJhZy5kYXRhLmNvbHVtbi53b250QnVkZ2UgJiYgZHJhZ0l0ZW0uZHJhZyAhPT0gaXRlbSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayBpZiB3ZSBtb3ZlIHRoZSBpdGVtIG91dHNpZGUgb2YgbG9ja2VkIGdyb3VwIE9SIGludG8gYSBsb2NrZWQgZ3JvdXAuLi4gYm90aCBhcmUgaW52YWxpZC5cbiAgICAgIGlmICghaXRlbS5kYXRhLmNvbHVtbi5jaGVja0dyb3VwTG9ja0NvbnN0cmFpbnQoc2libGluZ0F0TmV3UG9zaXRpb24uZHJhZy5kYXRhLmNvbHVtbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBfc29ydEl0ZW0uY2FsbCh0aGlzLl9kcm9wTGlzdFJlZiwgaXRlbSwgcG9pbnRlclgsIHBvaW50ZXJZLCBwb2ludGVyRGVsdGEpO1xuXG4gICAgICB0aGlzLmxhc3RTd2FwID0gc2libGluZ0F0TmV3UG9zaXRpb24uZHJhZztcblxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICBzaWJsaW5ncy5mb3JFYWNoKChzaWJsaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoZSBwb3NpdGlvbiBoYXNuJ3QgY2hhbmdlZC5cbiAgICAgICAgICBpZiAob2xkT3JkZXJbaW5kZXhdID09PSBzaWJsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChjb25zdCBjIG9mIHNpYmxpbmcuZHJhZy5kYXRhLmdldENlbGxzKCkpIHtcbiAgICAgICAgICAgIGMuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7c2libGluZy5vZmZzZXR9cHgsIDAsIDApYDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ29sdW1uRHJhZ10nLFxuICBleHBvcnRBczogJ3BibE5ncmlkQ29sdW1uRHJhZycsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxuICAgICdbY2xhc3MuY2RrLWRyYWctZHJhZ2dpbmddJzogJ19kcmFnUmVmLmlzRHJhZ2dpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrRHJhZywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJhZzxUPiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENka0xhenlEcmFnPFQsIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPiwgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PiB7XG4gIHJvb3RFbGVtZW50U2VsZWN0b3IgPSAncGJsLW5ncmlkLWhlYWRlci1jZWxsJztcblxuICBjb2x1bW46IFBibENvbHVtbjtcblxuICBASW5wdXQoJ3BibE5ncmlkQ29sdW1uRHJhZycpIHNldCBjb250ZXh0KHZhbHVlOiBQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdjb2wnIHwgJ2dyaWQnPiAmIFBhcnRpYWw8UGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAncm93JyB8ICd2YWx1ZSc+Pikge1xuICAgIHRoaXMuX2NvbnRleHQgPSB2YWx1ZTtcbiAgICB0aGlzLmNvbHVtbiA9IHZhbHVlICYmIHZhbHVlLmNvbDtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gdGhpcy5wbHVnaW5DdHJsID0gdmFsdWUgJiYgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodmFsdWUuZ3JpZCk7XG4gICAgY29uc3QgcGx1Z2luID0gcGx1Z2luQ3RybCAmJiBwbHVnaW5DdHJsLmdldFBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICB0aGlzLmNka0Ryb3BMaXN0ID0gcGx1Z2luIHx8IHVuZGVmaW5lZDtcbiAgICB0aGlzLmRpc2FibGVkID0gdGhpcy5jb2x1bW4gJiYgdGhpcy5jb2x1bW4ucmVvcmRlciA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRleHQ6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+XG4gIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyO1xuICBwcml2YXRlIGNhY2hlOiBIVE1MRWxlbWVudFtdO1xuXG4gIC8vIENUT1IgSVMgUkVRVUlSRUQgT1IgSVQgV09OVCBXT1JLIElOIEFPVFxuICAvLyBUT0RPOiBUcnkgdG8gcmVtb3ZlIHdoZW4gc3VwcG9ydGluZyBJVllcbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RST1BfTElTVCkgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZHJvcENvbnRhaW5lcjogQ2RrRHJvcExpc3QsXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgY29uZmlnOiBEcmFnUmVmQ29uZmlnLFxuICAgICAgICAgICAgICBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sKSB7XG4gICAgc3VwZXIoLi4uY2RrRHJhZyhlbGVtZW50LCBkcm9wQ29udGFpbmVyLCBfZG9jdW1lbnQsIF9uZ1pvbmUsIF92aWV3Q29udGFpbmVyUmVmLCBjb25maWcsIF9kaXIsIGRyYWdEcm9wLCBfY2hhbmdlRGV0ZWN0b3JSZWYsIHZpZXdwb3J0UnVsZXIsIGRyYWdEcm9wUmVnaXN0cnkpKTtcbiAgICAvLyBzdXBlcihcbiAgICAvLyAgIGVsZW1lbnQsXG4gICAgLy8gICBkcm9wQ29udGFpbmVyLFxuICAgIC8vICAgX2RvY3VtZW50LFxuICAgIC8vICAgX25nWm9uZSxcbiAgICAvLyAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgIC8vICAgY29uZmlnLFxuICAgIC8vICAgX2RpcixcbiAgICAvLyAgIGRyYWdEcm9wLFxuICAgIC8vICAgX2NoYW5nZURldGVjdG9yUmVmLFxuICAgIC8vICk7XG4gIH1cblxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xuICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICB0aGlzLl9kcmFnUmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICBjb25zdCB7IGNka0Ryb3BMaXN0IH0gPSB0aGlzO1xuICAgICAgaWYgKGNka0Ryb3BMaXN0ICYmIGNka0Ryb3BMaXN0LmNvbHVtblJlb3JkZXIgJiYgdGhpcy5fY29udGV4dC5jb2wucmVvcmRlcikge1xuICAgICAgICAvLyB3ZSBkb24ndCBhbGxvdyBhIG5ldyBkcmFnZ2luZyBzZXNzaW9uIGJlZm9yZSB0aGUgcHJldmlvdXMgZW5kcy5cbiAgICAgICAgLy8gdGhpcyBzb3VuZCBpbXBvc3NpYmxlLCBidXQgZHVlIHRvIGFuaW1hdGlvbiB0cmFuc2l0aW9ucyBpdHMgYWN0dWFsbHkgaXMuXG4gICAgICAgIC8vIGlmIHRoZSBgdHJhbnNpdGlvbmVuZGAgaXMgbG9uZyBlbm91Z2gsIGEgbmV3IGRyYWcgY2FuIHN0YXJ0Li4uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoZSBgZGlzYWJsZWRgIHN0YXRlIGlzIGNoZWNrZWQgYnkgcG9pbnRlckRvd24gQUZURVIgY2FsbGluZyBiZWZvcmUgc3RhcnQgc28gd2UgY2FuIGNhbmNlbCB0aGUgc3RhcnQuLi5cbiAgICAgICAgaWYgKGNka0Ryb3BMaXN0Ll9kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IHRydWUgKTtcbiAgICB0aGlzLmVuZGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSBmYWxzZSApO1xuICB9XG5cbiAgZ2V0Q2VsbHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlID0gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCd0YWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWNoZTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHN1cGVyLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuY2FjaGUpIHtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgdGhpcy5jYWNoZSkge1xuICAgICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2FjaGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=