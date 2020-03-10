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
import { CdkLazyDropList, CdkLazyDrag, PblDragDrop } from '../core';
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
                    { provide: DragDrop, useExisting: PblDragDrop },
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
                    { provide: DragDrop, useExisting: PblDragDrop },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV2QyxPQUFPLEVBQ0wsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUzQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBQ1AsV0FBVyxFQUNYLGFBQWEsRUFDYixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxlQUFlLEVBQ2YsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUV2RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxTQUFTLENBQUM7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QUUsdUJBQXVCO2lCQUNyRDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7b0JBQy9DLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsMkJBQTJCLEVBQUU7aUJBQy9EO2FBQ0Y7Ozs7WUExUEMsVUFBVTtZQXNCVixXQUFXLHVCQTBQRSxNQUFNLFNBQUMsYUFBYSxjQUFHLFFBQVEsWUFBSSxRQUFROzRDQUMzQyxNQUFNLFNBQUMsUUFBUTtZQXhRNUIsTUFBTTtZQUROLGdCQUFnQjs0Q0E0UUgsTUFBTSxTQUFDLGVBQWU7WUF2UTVCLGNBQWM7WUFHckIsUUFBUTtZQWxCUixpQkFBaUI7WUE2QlYsYUFBYSx1QkE4UFAsUUFBUTtZQWhRckIsZ0JBQWdCLHVCQWlRSCxRQUFROzs7c0JBMUJwQixLQUFLLFNBQUMsb0JBQW9CO3VDQTZDMUIsS0FBSyxTQUFDLHlCQUF5QjswQkFjL0IsS0FBSzs7OztJQS9ETiwwREFBOEM7O0lBRTlDLDZDQUFrQjs7Ozs7SUFXbEIsK0NBQXVIOzs7OztJQUN2SCxpREFBNkM7Ozs7O0lBQzdDLDRDQUE2Qjs7SUE2RDdCLGlEQUFtQjs7SUFDbkIsbURBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tb3V0cHV0LXJlbmFtZVxyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBJbnB1dCxcclxuICBJbmplY3QsXHJcbiAgU2tpcFNlbGYsXHJcbiAgT3V0cHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBPbkluaXQsXHJcbiAgVmlld0NvbnRhaW5lclJlZixcclxuICBOZ1pvbmUsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xyXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xyXG5pbXBvcnQge1xyXG4gIERyYWdEcm9wLFxyXG4gIENka0RyYWcsXHJcbiAgQ2RrRHJhZ0Ryb3AsXHJcbiAgQ0RLX0RST1BfTElTVCxcclxuICBEcmFnUmVmLFxyXG4gIENka0Ryb3BMaXN0R3JvdXAsXHJcbiAgQ2RrRHJvcExpc3QsXHJcbiAgQ0RLX0RSQUdfQ09ORklHLFxyXG4gIERyYWdSZWZDb25maWcsXHJcbiAgRHJhZ0Ryb3BSZWdpc3RyeSxcclxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xyXG5cclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIE5ncmlkUGx1Z2luLCBQYmxDb2x1bW4sIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5pbXBvcnQgeyBjZGtEcm9wTGlzdCwgY2RrRHJhZyB9IGZyb20gJy4uL3Y3LWNvbXBhdCc7XHJcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcsIFBibERyYWdEcm9wIH0gZnJvbSAnLi4vY29yZSc7XHJcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcclxuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xyXG5pbXBvcnQgeyBleHRlbmRHcmlkIH0gZnJvbSAnLi9leHRlbmQtZ3JpZCc7XHJcblxyXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XHJcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcclxuICAgIGNvbHVtblJlb3JkZXI/OiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NvbHVtblJlb3JkZXInID0gJ2NvbHVtblJlb3JkZXInO1xyXG5cclxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xyXG5cclxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIHJ1bk9uY2U6IGV4dGVuZEdyaWQgfSlcclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY29sdW1uUmVvcmRlcl0nLFxyXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5SZW9yZGVyJyxcclxuICBpbnB1dHM6IFtcclxuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcclxuICBdLFxyXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcclxuICAgICdbaWRdJzogJ2lkJyxcclxuICAgICdbY2xhc3MuY2RrLWRyb3AtbGlzdC1kcmFnZ2luZ10nOiAnX2Ryb3BMaXN0UmVmLmlzRHJhZ2dpbmcoKScsXHJcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxyXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIENka0xhenlEcm9wTGlzdDxULCBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHtcclxuICBpZCA9IGBwYmwtbmdyaWQtY29sdW1uLXJlb3JkZXItbGlzdC0ke191bmlxdWVJZENvdW50ZXIrK31gO1xyXG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xyXG5cclxuICBASW5wdXQoKSBnZXQgY29sdW1uUmVvcmRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2NvbHVtblJlb3JkZXI7IH07XHJcbiAgc2V0IGNvbHVtblJlb3JkZXIodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcclxuICAgIHRoaXMuX2NvbHVtblJlb3JkZXIgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gdHJ1ZSwgd2lsbCBub3QgbW92ZSB0aGUgY29sdW1uIG9uIGRyb3AuXHJcbiAgICogSW5zdGVhZCB5b3UgbmVlZCB0byBoYW5kbGUgdGhlIGRyb3BwZWQgZXZlbnQuXHJcbiAgICovXHJcbiAgQElucHV0KCkgZ2V0IG1hbnVhbE92ZXJyaWRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbWFudWFsT3ZlcnJpZGU7IH07XHJcbiAgc2V0IG1hbnVhbE92ZXJyaWRlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX21hbnVhbE92ZXJyaWRlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxyXG5cclxuICBAT3V0cHV0KCdjZGtEcm9wRHJhZ2dpbmcnKSBkcmFnZ2luZzogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XHJcblxyXG4gIHByaXZhdGUgX2NvbHVtblJlb3JkZXIgPSBmYWxzZTtcclxuICBwcml2YXRlIF9tYW51YWxPdmVycmlkZSA9IGZhbHNlO1xyXG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xyXG4gIHByaXZhdGUgbGFzdFN3YXA6IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PjtcclxuICBwcml2YXRlIGxhc3RTb3J0ZWQ6IHsgZHJhZzogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+OyBvZmZzZXQ6IG51bWJlcjsgY2xpZW50UmVjdDogQ2xpZW50UmVjdDsgfTtcclxuXHJcbiAgLy8gU3R1ZmYgdG8gd29ya2Fyb3VuZCBlbmNhcHN1bGF0aW9uIGluIENka0Ryb3BMaXN0XHJcbiAgcHJpdmF0ZSBnZXQgcGJsR2V0SXRlbUluZGV4RnJvbVBvaW50ZXJQb3NpdGlvbigpOiAoaXRlbTogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBwb2ludGVyWDogbnVtYmVyLCBwb2ludGVyWTogbnVtYmVyLCBkZWx0YT86IHt4OiBudW1iZXIsIHk6IG51bWJlcn0pID0+IG51bWJlciB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2dldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24uYmluZCh0aGlzLl9kcm9wTGlzdFJlZik7XHJcbiAgfVxyXG4gIHByaXZhdGUgZ2V0IHBibEdldFBvc2l0aW9uQ2FjaGVJdGVtcygpOiB7IGRyYWc6IERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+Pjsgb2Zmc2V0OiBudW1iZXI7IGNsaWVudFJlY3Q6IENsaWVudFJlY3Q7IH1bXSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2l0ZW1Qb3NpdGlvbnM7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxyXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcclxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXHJcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4sXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeT86IERyYWdEcm9wUmVnaXN0cnk8YW55LCBhbnk+LCAvLyBmb3IgdjcgY29tcGF0XHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55KSB7XHJcbiAgICBzdXBlciguLi5jZGtEcm9wTGlzdChlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXAsIGRyYWdEcm9wUmVnaXN0cnksIF9kb2N1bWVudCkpO1xyXG4gICAgIC8vIHN1cGVyKGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCk7XHJcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmRpcmVjdENvbnRhaW5lckVsZW1lbnQgPSAnLnBibC1uZ3JpZC1oZWFkZXItcm93LW1haW4nO1xyXG4gICAgdGhpcy5kcm9wcGVkLnN1YnNjcmliZSggKGV2ZW50OiBDZGtEcmFnRHJvcDxULCBhbnk+KSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5tYW51YWxPdmVycmlkZSkge1xyXG4gICAgICAgIHRoaXMudGFibGUuY29sdW1uQXBpLm1vdmVDb2x1bW4oKGV2ZW50Lml0ZW0gYXMgUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+KS5jb2x1bW4sIGV2ZW50LmN1cnJlbnRJbmRleCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZHJhZ2dpbmcuc3Vic2NyaWJlKCBpc0RyYWdnaW5nID0+IHtcclxuICAgICAgY29uc3QgZWwgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIGlmIChpc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNvbHVtbi1saXN0LWRyYWdnaW5nJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLWNvbHVtbi1saXN0LWRyYWdnaW5nJyk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5sYXN0U3dhcCA9IHVuZGVmaW5lZDtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMubW9ua2V5UGF0Y2hEcm9wTGlzdFJlZigpO1xyXG4gIH1cclxuXHJcbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXHJcbiAgLyoqXHJcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cclxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxyXG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcclxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxyXG4gICAqL1xyXG4gIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZztcclxuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8UGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cclxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG4gIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xyXG4gIC8vIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cclxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XHJcbiAgcmVtb3ZlRHJhZyhkcmFnOiBDZGtEcmFnKTogYm9vbGVhbiB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLnJlbW92ZURyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxyXG4gIC8vIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XHJcbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgLy8gc3VwZXIubmdPbkluaXQoKTtcclxuICAgIHRoaXMuZHJvcHBlZC5zdWJzY3JpYmUoIGUgPT4gdGhpcy5fcGJsUmVzZXQoKSApO1xyXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5iZWZvcmVFeGl0LnN1YnNjcmliZSggZSA9PiB0aGlzLl9wYmxSZXNldCgpICk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XHJcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XHJcbiAgfVxyXG5cclxuICAvKiBwcm90ZWN0ZWQgKi8gYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHtcclxuICAgIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyAvLyBzdXBlci5iZWZvcmVTdGFydGVkKCk7XHJcbiAgICB0aGlzLmxhc3RTb3J0ZWQgPSB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmRyYWdnaW5nLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wYmxSZXNldCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZHJhZ2dpbmcubmV4dChmYWxzZSk7XHJcbiAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xyXG4gICAgc2libGluZ3MuZm9yRWFjaCgoc2libGluZywgaW5kZXgpID0+IHtcclxuICAgICAgZm9yIChjb25zdCBjIG9mIHNpYmxpbmcuZHJhZy5kYXRhLmdldENlbGxzKCkpIHtcclxuICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbW9ua2V5UGF0Y2hEcm9wTGlzdFJlZigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHsgX3NvcnRJdGVtLCBlbnRlciB9ID0gdGhpcy5fZHJvcExpc3RSZWY7XHJcblxyXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5lbnRlciA9IChpdGVtOiBQYXJhbWV0ZXJzPHR5cGVvZiBlbnRlcj5bMF0sIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgICAgY29uc3QgbGFzdFNvcnRlZCA9IHRoaXMubGFzdFNvcnRlZFxyXG4gICAgICB0aGlzLmxhc3RTb3J0ZWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgIGlmIChsYXN0U29ydGVkICYmIGxhc3RTb3J0ZWQuZHJhZyA9PT0gaXRlbSkge1xyXG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcclxuICAgICAgICBwb2ludGVyWCA9IGxhc3RTb3J0ZWQuY2xpZW50UmVjdC5sZWZ0ICsgMSAtIChpc0hvcml6b250YWwgPyBsYXN0U29ydGVkLm9mZnNldCA6IDApO1xyXG4gICAgICAgIHBvaW50ZXJZID0gbGFzdFNvcnRlZC5jbGllbnRSZWN0LnRvcCArIDEgLSAoIWlzSG9yaXpvbnRhbCA/IGxhc3RTb3J0ZWQub2Zmc2V0IDogMCk7XHJcbiAgICAgIH1cclxuICAgICAgZW50ZXIuY2FsbCh0aGlzLl9kcm9wTGlzdFJlZiwgaXRlbSwgcG9pbnRlclgsIHBvaW50ZXJZKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5fc29ydEl0ZW0gPSAoaXRlbTogUGFyYW1ldGVyczx0eXBlb2YgZW50ZXI+WzBdLCBwb2ludGVyWDogbnVtYmVyLCBwb2ludGVyWTogbnVtYmVyLCBwb2ludGVyRGVsdGE6IHt4OiBudW1iZXIsIHk6IG51bWJlcn0pOiB2b2lkID0+IHtcclxuICAgICAgY29uc3Qgc2libGluZ3MgPSB0aGlzLnBibEdldFBvc2l0aW9uQ2FjaGVJdGVtcztcclxuICAgICAgdGhpcy5sYXN0U29ydGVkID0gc2libGluZ3MuZmluZCggcyA9PiBzLmRyYWcgPT09IGl0ZW0gKTtcclxuICAgICAgY29uc3QgbmV3SW5kZXggPSB0aGlzLnBibEdldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24oaXRlbSBhcyBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4sIHBvaW50ZXJYLCBwb2ludGVyWSwgcG9pbnRlckRlbHRhKTtcclxuICAgICAgaWYgKG5ld0luZGV4ID09PSAtMSAmJiBzaWJsaW5ncy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IG9sZE9yZGVyID0gc2libGluZ3Muc2xpY2UoKTtcclxuICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnO1xyXG4gICAgICBjb25zdCBzaWJsaW5nQXROZXdQb3NpdGlvbiA9IHNpYmxpbmdzW25ld0luZGV4XTtcclxuXHJcbiAgICAgIGlmIChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gd2Ugbm93IG5lZWQgdG8gZmluZCBpZiBiZXR3ZWVuIGN1cnJlbnQgYW5kIG5ldyBwb3NpdGlvbiB0aGVyZSBhcmUgaXRlbXMgd2l0aCBgd29udEJ1ZGdlYFxyXG4gICAgICBjb25zdCBpdGVtQXRPcmlnaW5hbFBvc2l0aW9uID0gdGhpcy5sYXN0U3dhcCA/IHRoaXMubGFzdFN3YXAgOiBpdGVtO1xyXG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBzaWJsaW5ncy5maW5kSW5kZXgoIGN1cnJlbnRJdGVtID0+IGN1cnJlbnRJdGVtLmRyYWcgPT09IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gKTtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBNYXRoLm1pbihuZXdJbmRleCwgY3VycmVudEluZGV4KVxyXG4gICAgICBjb25zdCBpdGVtc0RyYWdnZWRPdmVyID0gc2libGluZ3Muc2xpY2Uoc3RhcnQsIE1hdGguYWJzKG5ld0luZGV4IC0gY3VycmVudEluZGV4KSArIHN0YXJ0KTtcclxuICAgICAgZm9yIChjb25zdCBkcmFnSXRlbSBvZiBpdGVtc0RyYWdnZWRPdmVyKSB7XHJcbiAgICAgICAgaWYgKGRyYWdJdGVtLmRyYWcuZGF0YS5jb2x1bW4ud29udEJ1ZGdlICYmIGRyYWdJdGVtLmRyYWcgIT09IGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNoZWNrIGlmIHdlIG1vdmUgdGhlIGl0ZW0gb3V0c2lkZSBvZiBsb2NrZWQgZ3JvdXAgT1IgaW50byBhIGxvY2tlZCBncm91cC4uLiBib3RoIGFyZSBpbnZhbGlkLlxyXG4gICAgICBpZiAoIWl0ZW0uZGF0YS5jb2x1bW4uY2hlY2tHcm91cExvY2tDb25zdHJhaW50KHNpYmxpbmdBdE5ld1Bvc2l0aW9uLmRyYWcuZGF0YS5jb2x1bW4pKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBfc29ydEl0ZW0uY2FsbCh0aGlzLl9kcm9wTGlzdFJlZiwgaXRlbSwgcG9pbnRlclgsIHBvaW50ZXJZLCBwb2ludGVyRGVsdGEpO1xyXG5cclxuICAgICAgdGhpcy5sYXN0U3dhcCA9IHNpYmxpbmdBdE5ld1Bvc2l0aW9uLmRyYWc7XHJcblxyXG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgc2libGluZ3MuZm9yRWFjaCgoc2libGluZywgaW5kZXgpID0+IHtcclxuICAgICAgICAgIC8vIERvbid0IGRvIGFueXRoaW5nIGlmIHRoZSBwb3NpdGlvbiBoYXNuJ3QgY2hhbmdlZC5cclxuICAgICAgICAgIGlmIChvbGRPcmRlcltpbmRleF0gPT09IHNpYmxpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGZvciAoY29uc3QgYyBvZiBzaWJsaW5nLmRyYWcuZGF0YS5nZXRDZWxscygpKSB7XHJcbiAgICAgICAgICAgIGMuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7c2libGluZy5vZmZzZXR9cHgsIDAsIDApYDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ29sdW1uRHJhZ10nLFxyXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5EcmFnJyxcclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXHJcbiAgICAnY2xhc3MnOiAnY2RrLWRyYWcnLFxyXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcclxuICB9LFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXHJcbiAgICB7IHByb3ZpZGU6IENka0RyYWcsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmUgfVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0RyYWc8VD4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDZGtMYXp5RHJhZzxULCBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4sIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4ge1xyXG4gIHJvb3RFbGVtZW50U2VsZWN0b3IgPSAncGJsLW5ncmlkLWhlYWRlci1jZWxsJztcclxuXHJcbiAgY29sdW1uOiBQYmxDb2x1bW47XHJcblxyXG4gIEBJbnB1dCgncGJsTmdyaWRDb2x1bW5EcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XHJcbiAgICB0aGlzLl9jb250ZXh0ID0gdmFsdWU7XHJcbiAgICB0aGlzLmNvbHVtbiA9IHZhbHVlICYmIHZhbHVlLmNvbDtcclxuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSB0aGlzLnBsdWdpbkN0cmwgPSB2YWx1ZSAmJiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh2YWx1ZS5ncmlkKTtcclxuICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbkN0cmwgJiYgcGx1Z2luQ3RybC5nZXRQbHVnaW4oUExVR0lOX0tFWSk7XHJcbiAgICB0aGlzLmNka0Ryb3BMaXN0ID0gcGx1Z2luIHx8IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLmNvbHVtbiAmJiB0aGlzLmNvbHVtbi5yZW9yZGVyID8gZmFsc2UgOiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj5cclxuICBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjtcclxuICBwcml2YXRlIGNhY2hlOiBIVE1MRWxlbWVudFtdO1xyXG5cclxuICAvLyBDVE9SIElTIFJFUVVJUkVEIE9SIElUIFdPTlQgV09SSyBJTiBBT1RcclxuICAvLyBUT0RPOiBUcnkgdG8gcmVtb3ZlIHdoZW4gc3VwcG9ydGluZyBJVllcclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcclxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUk9QX0xJU1QpIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGRyb3BDb250YWluZXI6IENka0Ryb3BMaXN0LFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcclxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgY29uZmlnOiBEcmFnUmVmQ29uZmlnLFxyXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxyXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcclxuICAgICAgICAgICAgICBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG5cclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSB2aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLCAvLyBmb3IgdjcgY29tcGF0XHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sKSB7XHJcbiAgICBzdXBlciguLi5jZGtEcmFnKGVsZW1lbnQsIGRyb3BDb250YWluZXIsIF9kb2N1bWVudCwgX25nWm9uZSwgX3ZpZXdDb250YWluZXJSZWYsIGNvbmZpZywgX2RpciwgZHJhZ0Ryb3AsIF9jaGFuZ2VEZXRlY3RvclJlZiwgdmlld3BvcnRSdWxlciwgZHJhZ0Ryb3BSZWdpc3RyeSkpO1xyXG4gICAgLy8gc3VwZXIoXHJcbiAgICAvLyAgIGVsZW1lbnQsXHJcbiAgICAvLyAgIGRyb3BDb250YWluZXIsXHJcbiAgICAvLyAgIF9kb2N1bWVudCxcclxuICAgIC8vICAgX25nWm9uZSxcclxuICAgIC8vICAgX3ZpZXdDb250YWluZXJSZWYsXHJcbiAgICAvLyAgIGNvbmZpZyxcclxuICAgIC8vICAgX2RpcixcclxuICAgIC8vICAgZHJhZ0Ryb3AsXHJcbiAgICAvLyAgIF9jaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIC8vICk7XHJcbiAgfVxyXG5cclxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xyXG4gIC8qKlxyXG4gICAqIEEgY2xhc3MgdG8gc2V0IHdoZW4gdGhlIHJvb3QgZWxlbWVudCBpcyBub3QgdGhlIGhvc3QgZWxlbWVudC4gKGkuZS4gd2hlbiBgY2RrRHJhZ1Jvb3RFbGVtZW50YCBpcyB1c2VkKS5cclxuICAgKi9cclxuICBASW5wdXQoJ2Nka0RyYWdSb290RWxlbWVudENsYXNzJykgc2V0IHJvb3RFbGVtZW50U2VsZWN0b3JDbGFzcyh2YWx1ZTogc3RyaW5nKSB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXHJcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX3Jvb3RDbGFzcyAmJiB0aGlzLl9ob3N0Tm90Um9vdCkge1xyXG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSb290RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoLi4udGhpcy5fcm9vdENsYXNzLnNwbGl0KCcgJykpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKC4uLnZhbHVlLnNwbGl0KCcgJykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLl9yb290Q2xhc3MgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBwYmxEcmFnUmVmKCk6IFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPFQ+PiB7IHJldHVybiB0aGlzLl9kcmFnUmVmIGFzIGFueTsgfVxyXG5cclxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cclxuICBzZXQgY2RrRHJvcExpc3QodmFsdWU6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZTxUPikge1xyXG4gICAgLy8gVE8gU1VQUE9SVCBgY2RrRHJvcExpc3RgIHZpYSBzdHJpbmcgaW5wdXQgKElEKSB3ZSBuZWVkIGEgcmVhY3RpdmUgcmVnaXN0cnkuLi5cclxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XHJcbiAgICAgIHRoaXMuY2RrRHJvcExpc3QucmVtb3ZlRHJhZyh0aGlzKTtcclxuICAgIH1cclxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuX2RyYWdSZWYuX3dpdGhEcm9wQ29udGFpbmVyKHZhbHVlLl9kcm9wTGlzdFJlZik7XHJcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfcm9vdENsYXNzOiBzdHJpbmc7XHJcbiAgX2hvc3ROb3RSb290ID0gZmFsc2U7XHJcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XHJcbiAgLy8gbmdBZnRlclZpZXdJbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7IHN1cGVyLm5nQWZ0ZXJWaWV3SW5pdCgpOyB9XHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uRGVzdHJveS5jYWxsKHRoaXMpOyAgc3VwZXIubmdPbkRlc3Ryb3koKTsgfVxyXG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7XHJcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcclxuXHJcbiAgICB0aGlzLl9kcmFnUmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHsgY2RrRHJvcExpc3QgfSA9IHRoaXM7XHJcbiAgICAgIGlmIChjZGtEcm9wTGlzdCAmJiBjZGtEcm9wTGlzdC5jb2x1bW5SZW9yZGVyICYmIHRoaXMuX2NvbnRleHQuY29sLnJlb3JkZXIpIHtcclxuICAgICAgICAvLyB3ZSBkb24ndCBhbGxvdyBhIG5ldyBkcmFnZ2luZyBzZXNzaW9uIGJlZm9yZSB0aGUgcHJldmlvdXMgZW5kcy5cclxuICAgICAgICAvLyB0aGlzIHNvdW5kIGltcG9zc2libGUsIGJ1dCBkdWUgdG8gYW5pbWF0aW9uIHRyYW5zaXRpb25zIGl0cyBhY3R1YWxseSBpcy5cclxuICAgICAgICAvLyBpZiB0aGUgYHRyYW5zaXRpb25lbmRgIGlzIGxvbmcgZW5vdWdoLCBhIG5ldyBkcmFnIGNhbiBzdGFydC4uLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gdGhlIGBkaXNhYmxlZGAgc3RhdGUgaXMgY2hlY2tlZCBieSBwb2ludGVyRG93biBBRlRFUiBjYWxsaW5nIGJlZm9yZSBzdGFydCBzbyB3ZSBjYW4gY2FuY2VsIHRoZSBzdGFydC4uLlxyXG4gICAgICAgIGlmIChjZGtEcm9wTGlzdC5fZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc3RhcnRlZC5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2NvbnRleHQuY29sLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gdHJ1ZSApO1xyXG4gICAgdGhpcy5lbmRlZC5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2NvbnRleHQuY29sLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gZmFsc2UgKTtcclxuICB9XHJcblxyXG4gIGdldENlbGxzKCk6IEhUTUxFbGVtZW50W10ge1xyXG4gICAgaWYgKCF0aGlzLmNhY2hlKSB7XHJcbiAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoJ3RhYmxlJyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jYWNoZTtcclxuICB9XHJcblxyXG4gIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgc3VwZXIucmVzZXQoKTtcclxuICAgIGlmICh0aGlzLmNhY2hlKSB7XHJcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgdGhpcy5jYWNoZSkge1xyXG4gICAgICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2FjaGUgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==