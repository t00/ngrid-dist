/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/column/column-reorder-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:no-output-rename
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, Directive, ElementRef, Input, Inject, SkipSelf, Output, Optional, ViewContainerRef, NgZone, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DragDrop, CdkDrag, CDK_DROP_LIST, CdkDropListGroup, CdkDropList, CDK_DRAG_CONFIG, } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblDragDrop } from '../core/drag-drop';
import { CdkLazyDropList, CdkLazyDrag } from '../core/lazy-drag-drop';
/** @type {?} */
export const COL_REORDER_PLUGIN_KEY = 'columnReorder';
/** @type {?} */
let _uniqueIdCounter = 0;
/**
 * @template T
 */
export class PblNgridColumnReorderPluginDirective extends CdkDropList {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} element
     * @param {?} dragDrop
     * @param {?} changeDetectorRef
     * @param {?=} dir
     * @param {?=} group
     */
    constructor(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group) {
        super(element, dragDrop, changeDetectorRef, dir, group);
        this.table = table;
        this.id = `pbl-ngrid-column-reorder-list-${_uniqueIdCounter++}`;
        this.orientation = 'horizontal';
        this.dragging = new BehaviorSubject(false);
        this._columnReorder = false;
        this._manualOverride = false;
        this._draggablesSet = new Set();
        this._removePlugin = pluginCtrl.setPlugin(COL_REORDER_PLUGIN_KEY, this);
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
}
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
                    { provide: CDK_DROP_LIST, useExisting: PblNgridColumnReorderPluginDirective },
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
    { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
PblNgridColumnReorderPluginDirective.propDecorators = {
    columnReorder: [{ type: Input }],
    manualOverride: [{ type: Input }],
    dragging: [{ type: Output, args: ['cdkDropDragging',] }]
};
if (false) {
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.id;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.orientation;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype.dragging;
    /** @type {?} */
    PblNgridColumnReorderPluginDirective.prototype._draggables;
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
     */
    constructor(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef) {
        super(element, dropContainer, _document, _ngZone, _viewContainerRef, config, _dir, dragDrop, _changeDetectorRef);
        this.rootElementSelector = 'pbl-ngrid-header-cell';
        this._hostNotRoot = false;
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
        const plugin = pluginCtrl && pluginCtrl.getPlugin(COL_REORDER_PLUGIN_KEY);
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
    { type: ChangeDetectorRef }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlb3JkZXItcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2NvbHVtbi1yZW9yZGVyLXBsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRXZDLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEVBRU4sUUFBUSxFQUVSLGdCQUFnQixFQUNoQixNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsUUFBUSxFQUNSLE9BQU8sRUFFUCxhQUFhLEVBRWIsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxlQUFlLEdBRWhCLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLGlCQUFpQixFQUFhLHdCQUF3QixFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFVdEUsTUFBTSxPQUFPLHNCQUFzQixHQUFvQixlQUFlOztJQUVsRSxnQkFBZ0IsR0FBRyxDQUFDOzs7O0FBbUJ4QixNQUFNLE9BQU8sb0NBQThDLFNBQVEsV0FBYzs7Ozs7Ozs7OztJQW1DL0UsWUFBbUIsS0FBMkIsRUFDbEMsVUFBb0MsRUFDcEMsT0FBZ0MsRUFDaEMsUUFBa0IsRUFD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QUU7O29CQUNKLE9BQU8sRUFBRSxVQUFVO29CQUNuQiwyQkFBMkIsRUFBRSx1QkFBdUI7aUJBQ3JEO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRTtvQkFDL0MsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSwyQkFBMkIsRUFBRTtpQkFDL0Q7YUFDRjs7OztZQXRQQyxVQUFVO1lBdUJWLFdBQVcsdUJBcVBFLE1BQU0sU0FBQyxhQUFhLGNBQUcsUUFBUSxZQUFJLFFBQVE7NENBQzNDLE1BQU0sU0FBQyxRQUFRO1lBcFE1QixNQUFNO1lBRE4sZ0JBQWdCOzRDQXdRSCxNQUFNLFNBQUMsZUFBZTtZQWxRNUIsY0FBYztZQUdyQixRQUFRO1lBbkJSLGlCQUFpQjs7O3NCQThQaEIsS0FBSyxTQUFDLG9CQUFvQjt1Q0F5QzFCLEtBQUssU0FBQyx5QkFBeUI7MEJBYy9CLEtBQUs7Ozs7SUEzRE4sMERBQThDOztJQUU5Qyw2Q0FBa0I7Ozs7O0lBV2xCLCtDQUF1SDs7Ozs7SUFDdkgsaURBQTZDOzs7OztJQUM3Qyw0Q0FBNkI7O0lBeUQ3QixpREFBbUI7O0lBQ25CLG1EQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm5vLW91dHB1dC1yZW5hbWVcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBTa2lwU2VsZixcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIE5nWm9uZSxcbiAgUXVlcnlMaXN0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgRHJhZ0Ryb3AsXG4gIENka0RyYWcsXG4gIENka0RyYWdEcm9wLFxuICBDREtfRFJPUF9MSVNULFxuICBEcmFnUmVmLFxuICBDZGtEcm9wTGlzdEdyb3VwLFxuICBDZGtEcm9wTGlzdCxcbiAgQ0RLX0RSQUdfQ09ORklHLFxuICBEcmFnUmVmQ29uZmlnLFxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibENvbHVtbiwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENlbGxDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4uL2NvcmUvZHJhZy1kcm9wJztcbmltcG9ydCB7IENka0xhenlEcm9wTGlzdCwgQ2RrTGF6eURyYWcgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNvbHVtblJlb3JkZXI/OiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IENPTF9SRU9SREVSX1BMVUdJTl9LRVk6ICdjb2x1bW5SZW9yZGVyJyA9ICdjb2x1bW5SZW9yZGVyJztcblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY29sdW1uUmVvcmRlcl0nLFxuICBleHBvcnRBczogJ3BibE5ncmlkQ29sdW1uUmVvcmRlcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gICAgJ1tjbGFzcy5jZGstZHJvcC1saXN0LWRyYWdnaW5nXSc6ICdfZHJvcExpc3RSZWYuaXNEcmFnZ2luZygpJyxcbiAgICAnW2NsYXNzLmNkay1kcm9wLWxpc3QtcmVjZWl2aW5nXSc6ICdfZHJvcExpc3RSZWYuaXNSZWNlaXZpbmcoKScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uUmVvcmRlclBsdWdpbkRpcmVjdGl2ZSB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcm9wTGlzdDxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+PiB7XG4gIGlkID0gYHBibC1uZ3JpZC1jb2x1bW4tcmVvcmRlci1saXN0LSR7X3VuaXF1ZUlkQ291bnRlcisrfWA7XG4gIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIEBJbnB1dCgpIGdldCBjb2x1bW5SZW9yZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY29sdW1uUmVvcmRlcjsgfTtcbiAgc2V0IGNvbHVtblJlb3JkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgdGhpcy5fY29sdW1uUmVvcmRlciA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgd2lsbCBub3QgbW92ZSB0aGUgY29sdW1uIG9uIGRyb3AuXG4gICAqIEluc3RlYWQgeW91IG5lZWQgdG8gaGFuZGxlIHRoZSBkcm9wcGVkIGV2ZW50LlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1hbnVhbE92ZXJyaWRlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbWFudWFsT3ZlcnJpZGU7IH07XG4gIHNldCBtYW51YWxPdmVycmlkZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9tYW51YWxPdmVycmlkZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBAT3V0cHV0KCdjZGtEcm9wRHJhZ2dpbmcnKSBkcmFnZ2luZzogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgX2RyYWdnYWJsZXM6IFF1ZXJ5TGlzdDxDZGtEcmFnPjtcblxuICBwcml2YXRlIF9jb2x1bW5SZW9yZGVyID0gZmFsc2U7XG4gIHByaXZhdGUgX21hbnVhbE92ZXJyaWRlID0gZmFsc2U7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIGxhc3RTd2FwOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47XG4gIHByaXZhdGUgbGFzdFNvcnRlZDogeyBkcmFnOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj47IG9mZnNldDogbnVtYmVyOyBjbGllbnRSZWN0OiBDbGllbnRSZWN0OyB9O1xuXG4gIC8vIFN0dWZmIHRvIHdvcmthcm91bmQgZW5jYXBzdWxhdGlvbiBpbiBDZGtEcm9wTGlzdFxuICBwcml2YXRlIGdldCBwYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKCk6IChpdGVtOiBEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4sIHBvaW50ZXJYOiBudW1iZXIsIHBvaW50ZXJZOiBudW1iZXIsIGRlbHRhPzoge3g6IG51bWJlciwgeTogbnVtYmVyfSkgPT4gbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2dldEl0ZW1JbmRleEZyb21Qb2ludGVyUG9zaXRpb24uYmluZCh0aGlzLl9kcm9wTGlzdFJlZik7XG4gIH1cbiAgcHJpdmF0ZSBnZXQgcGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zKCk6IHsgZHJhZzogRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+OyBvZmZzZXQ6IG51bWJlcjsgY2xpZW50UmVjdDogQ2xpZW50UmVjdDsgfVtdIHtcbiAgICByZXR1cm4gKHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueSkuX2l0ZW1Qb3NpdGlvbnM7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4pIHtcbiAgICBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKENPTF9SRU9SREVSX1BMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5kaXJlY3RDb250YWluZXJFbGVtZW50ID0gJy5wYmwtbmdyaWQtaGVhZGVyLXJvdy1tYWluJztcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCAoZXZlbnQ6IENka0RyYWdEcm9wPFQsIGFueT4pID0+IHtcbiAgICAgIGlmICghdGhpcy5tYW51YWxPdmVycmlkZSkge1xuICAgICAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5tb3ZlQ29sdW1uKChldmVudC5pdGVtIGFzIFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPikuY29sdW1uLCBldmVudC5jdXJyZW50SW5kZXgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5kcmFnZ2luZy5zdWJzY3JpYmUoIGlzRHJhZ2dpbmcgPT4ge1xuICAgICAgY29uc3QgZWwgPSBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoaXNEcmFnZ2luZykge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY29sdW1uLWxpc3QtZHJhZ2dpbmcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1jb2x1bW4tbGlzdC1kcmFnZ2luZycpO1xuICAgICAgfVxuICAgICAgdGhpcy5sYXN0U3dhcCA9IHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIHRoaXMubW9ua2V5UGF0Y2hEcm9wTGlzdFJlZigpO1xuICB9XG5cbiAgLyogQ2RrTGF6eURyb3BMaXN0IHN0YXJ0ICovXG4gIC8qKlxuICAgKiBTZWxlY3RvciB0aGF0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudCwgc3RhcnRpbmcgZnJvbVxuICAgKiB0aGUgYGNka0Ryb3BMaXN0YCBlbGVtZW50IGFuZCBnb2luZyBkb3duIHRoZSBET00uIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIGRpcmVjdCBjb250YWluZXIgZWxlbWVudFxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXG4gICAqIG9mIHRoZSBkcmFnZ2FibGUgZWxlbWVudHMuXG4gICAqL1xuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XG4gIGdldCBwYmxEcm9wTGlzdFJlZigpOiBQYmxEcm9wTGlzdFJlZjxQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4+IHsgcmV0dXJuIHRoaXMuX2Ryb3BMaXN0UmVmIGFzIGFueTsgfVxuICBvcmlnaW5hbEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcbiAgLy8gbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgfVxuICBhZGREcmFnKGRyYWc6IENka0RyYWcpOiB2b2lkIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYWRkRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgLy8gYmVmb3JlU3RhcnRlZCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IH1cbiAgLyogQ2RrTGF6eURyb3BMaXN0IGVuZCAqL1xuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTsgLy8gc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLmRyb3BwZWQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmJlZm9yZUV4aXQuc3Vic2NyaWJlKCBlID0+IHRoaXMuX3BibFJlc2V0KCkgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgLyogcHJvdGVjdGVkICovIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7XG4gICAgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5iZWZvcmVTdGFydGVkLmNhbGwodGhpcyk7IC8vIHN1cGVyLmJlZm9yZVN0YXJ0ZWQoKTtcbiAgICB0aGlzLmxhc3RTb3J0ZWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KHRydWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcGJsUmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5kcmFnZ2luZy5uZXh0KGZhbHNlKTtcbiAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xuICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICBjLnN0eWxlLnRyYW5zZm9ybSA9IGBgO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBtb25rZXlQYXRjaERyb3BMaXN0UmVmKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgX3NvcnRJdGVtLCBlbnRlciB9ID0gdGhpcy5fZHJvcExpc3RSZWY7XG5cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmVudGVyID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlcik6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbGFzdFNvcnRlZCA9IHRoaXMubGFzdFNvcnRlZFxuICAgICAgdGhpcy5sYXN0U29ydGVkID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKGxhc3RTb3J0ZWQgJiYgbGFzdFNvcnRlZC5kcmFnID09PSBpdGVtKSB7XG4gICAgICAgIGNvbnN0IGlzSG9yaXpvbnRhbCA9IHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgICAgcG9pbnRlclggPSBsYXN0U29ydGVkLmNsaWVudFJlY3QubGVmdCArIDEgLSAoaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcbiAgICAgICAgcG9pbnRlclkgPSBsYXN0U29ydGVkLmNsaWVudFJlY3QudG9wICsgMSAtICghaXNIb3Jpem9udGFsID8gbGFzdFNvcnRlZC5vZmZzZXQgOiAwKTtcbiAgICAgIH1cbiAgICAgIGVudGVyLmNhbGwodGhpcy5fZHJvcExpc3RSZWYsIGl0ZW0sIHBvaW50ZXJYLCBwb2ludGVyWSk7XG4gICAgfTtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuX3NvcnRJdGVtID0gKGl0ZW06IFBhcmFtZXRlcnM8dHlwZW9mIGVudGVyPlswXSwgcG9pbnRlclg6IG51bWJlciwgcG9pbnRlclk6IG51bWJlciwgcG9pbnRlckRlbHRhOiB7eDogbnVtYmVyLCB5OiBudW1iZXJ9KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBzaWJsaW5ncyA9IHRoaXMucGJsR2V0UG9zaXRpb25DYWNoZUl0ZW1zO1xuICAgICAgdGhpcy5sYXN0U29ydGVkID0gc2libGluZ3MuZmluZCggcyA9PiBzLmRyYWcgPT09IGl0ZW0gKTtcbiAgICAgIGNvbnN0IG5ld0luZGV4ID0gdGhpcy5wYmxHZXRJdGVtSW5kZXhGcm9tUG9pbnRlclBvc2l0aW9uKGl0ZW0gYXMgRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+LCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XG4gICAgICBpZiAobmV3SW5kZXggPT09IC0xICYmIHNpYmxpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkT3JkZXIgPSBzaWJsaW5ncy5zbGljZSgpO1xuICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgY29uc3Qgc2libGluZ0F0TmV3UG9zaXRpb24gPSBzaWJsaW5nc1tuZXdJbmRleF07XG5cbiAgICAgIGlmIChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIG5vdyBuZWVkIHRvIGZpbmQgaWYgYmV0d2VlbiBjdXJyZW50IGFuZCBuZXcgcG9zaXRpb24gdGhlcmUgYXJlIGl0ZW1zIHdpdGggYHdvbnRCdWRnZWBcbiAgICAgIGNvbnN0IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gPSB0aGlzLmxhc3RTd2FwID8gdGhpcy5sYXN0U3dhcCA6IGl0ZW07XG4gICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBzaWJsaW5ncy5maW5kSW5kZXgoIGN1cnJlbnRJdGVtID0+IGN1cnJlbnRJdGVtLmRyYWcgPT09IGl0ZW1BdE9yaWdpbmFsUG9zaXRpb24gKTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5taW4obmV3SW5kZXgsIGN1cnJlbnRJbmRleClcbiAgICAgIGNvbnN0IGl0ZW1zRHJhZ2dlZE92ZXIgPSBzaWJsaW5ncy5zbGljZShzdGFydCwgTWF0aC5hYnMobmV3SW5kZXggLSBjdXJyZW50SW5kZXgpICsgc3RhcnQpO1xuICAgICAgZm9yIChjb25zdCBkcmFnSXRlbSBvZiBpdGVtc0RyYWdnZWRPdmVyKSB7XG4gICAgICAgIGlmIChkcmFnSXRlbS5kcmFnLmRhdGEuY29sdW1uLndvbnRCdWRnZSAmJiBkcmFnSXRlbS5kcmFnICE9PSBpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIGlmIHdlIG1vdmUgdGhlIGl0ZW0gb3V0c2lkZSBvZiBsb2NrZWQgZ3JvdXAgT1IgaW50byBhIGxvY2tlZCBncm91cC4uLiBib3RoIGFyZSBpbnZhbGlkLlxuICAgICAgaWYgKCFpdGVtLmRhdGEuY29sdW1uLmNoZWNrR3JvdXBMb2NrQ29uc3RyYWludChzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnLmRhdGEuY29sdW1uKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIF9zb3J0SXRlbS5jYWxsKHRoaXMuX2Ryb3BMaXN0UmVmLCBpdGVtLCBwb2ludGVyWCwgcG9pbnRlclksIHBvaW50ZXJEZWx0YSk7XG5cbiAgICAgIHRoaXMubGFzdFN3YXAgPSBzaWJsaW5nQXROZXdQb3NpdGlvbi5kcmFnO1xuXG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgIHNpYmxpbmdzLmZvckVhY2goKHNpYmxpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgdGhlIHBvc2l0aW9uIGhhc24ndCBjaGFuZ2VkLlxuICAgICAgICAgIGlmIChvbGRPcmRlcltpbmRleF0gPT09IHNpYmxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGMgb2Ygc2libGluZy5kcmFnLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICAgICAgYy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtzaWJsaW5nLm9mZnNldH1weCwgMCwgMClgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDb2x1bW5EcmFnXScsXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRDb2x1bW5EcmFnJyxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJhZycsXG4gICAgJ1tjbGFzcy5jZGstZHJhZy1kcmFnZ2luZ10nOiAnX2RyYWdSZWYuaXNEcmFnZ2luZygpJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBEcmFnRHJvcCwgdXNlRXhpc3Rpbmc6IFBibERyYWdEcm9wIH0sXG4gICAgeyBwcm92aWRlOiBDZGtEcmFnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlIH1cbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VCA9IGFueT4gZXh0ZW5kcyBDZGtEcmFnPFQ+IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgQ2RrTGF6eURyYWc8VCwgUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+LCBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8VD4+IHtcbiAgcm9vdEVsZW1lbnRTZWxlY3RvciA9ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwnO1xuXG4gIGNvbHVtbjogUGJsQ29sdW1uO1xuXG4gIEBJbnB1dCgncGJsTmdyaWRDb2x1bW5EcmFnJykgc2V0IGNvbnRleHQodmFsdWU6IFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ2NvbCcgfCAnZ3JpZCc+ICYgUGFydGlhbDxQaWNrPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4sICdyb3cnIHwgJ3ZhbHVlJz4+KSB7XG4gICAgdGhpcy5fY29udGV4dCA9IHZhbHVlO1xuICAgIHRoaXMuY29sdW1uID0gdmFsdWUgJiYgdmFsdWUuY29sO1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSB0aGlzLnBsdWdpbkN0cmwgPSB2YWx1ZSAmJiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh2YWx1ZS5ncmlkKTtcbiAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5DdHJsICYmIHBsdWdpbkN0cmwuZ2V0UGx1Z2luKENPTF9SRU9SREVSX1BMVUdJTl9LRVkpO1xuICAgIHRoaXMuY2RrRHJvcExpc3QgPSBwbHVnaW4gfHwgdW5kZWZpbmVkO1xuICAgIHRoaXMuZGlzYWJsZWQgPSB0aGlzLmNvbHVtbiAmJiB0aGlzLmNvbHVtbi5yZW9yZGVyID8gZmFsc2UgOiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGV4dDogUGljazxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+LCAnY29sJyB8ICdncmlkJz4gJiBQYXJ0aWFsPFBpY2s8UGJsTmdyaWRDZWxsQ29udGV4dDxUPiwgJ3JvdycgfCAndmFsdWUnPj5cbiAgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI7XG4gIHByaXZhdGUgY2FjaGU6IEhUTUxFbGVtZW50W107XG5cbiAgLy8gQ1RPUiBJUyBSRVFVSVJFRCBPUiBJVCBXT05UIFdPUksgSU4gQU9UXG4gIC8vIFRPRE86IFRyeSB0byByZW1vdmUgd2hlbiBzdXBwb3J0aW5nIElWWVxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJPUF9MSVNUKSBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBkcm9wQ29udGFpbmVyOiBDZGtEcm9wTGlzdCxcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50OiBhbnksXG4gICAgICAgICAgICAgIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgX3ZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RSQUdfQ09ORklHKSBjb25maWc6IERyYWdSZWZDb25maWcsXG4gICAgICAgICAgICAgIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBzdXBlcihcbiAgICAgIGVsZW1lbnQsXG4gICAgICBkcm9wQ29udGFpbmVyLFxuICAgICAgX2RvY3VtZW50LFxuICAgICAgX25nWm9uZSxcbiAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxuICAgICAgY29uZmlnLFxuICAgICAgX2RpcixcbiAgICAgIGRyYWdEcm9wLFxuICAgICAgX2NoYW5nZURldGVjdG9yUmVmLFxuICAgICk7XG4gIH1cblxuICAvKiBDZGtMYXp5RHJhZyBzdGFydCAqL1xuICAvKipcbiAgICogQSBjbGFzcyB0byBzZXQgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGlzIG5vdCB0aGUgaG9zdCBlbGVtZW50LiAoaS5lLiB3aGVuIGBjZGtEcmFnUm9vdEVsZW1lbnRgIGlzIHVzZWQpLlxuICAgKi9cbiAgQElucHV0KCdjZGtEcmFnUm9vdEVsZW1lbnRDbGFzcycpIHNldCByb290RWxlbWVudFNlbGVjdG9yQ2xhc3ModmFsdWU6IHN0cmluZykgeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fcm9vdENsYXNzICYmIHRoaXMuX2hvc3ROb3RSb290KSB7XG4gICAgICBpZiAodGhpcy5fcm9vdENsYXNzKSB7XG4gICAgICAgIHRoaXMuZ2V0Um9vdEVsZW1lbnQoKS5jbGFzc0xpc3QucmVtb3ZlKC4uLnRoaXMuX3Jvb3RDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB0aGlzLmdldFJvb3RFbGVtZW50KCkuY2xhc3NMaXN0LmFkZCguLi52YWx1ZS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcm9vdENsYXNzID0gdmFsdWU7XG4gIH1cblxuICBnZXQgcGJsRHJhZ1JlZigpOiBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxUPj4geyByZXR1cm4gdGhpcy5fZHJhZ1JlZiBhcyBhbnk7IH1cblxuICBASW5wdXQoKSBnZXQgY2RrRHJvcExpc3QoKTogUGJsTmdyaWRDb2x1bW5SZW9yZGVyUGx1Z2luRGlyZWN0aXZlPFQ+IHsgcmV0dXJuIHRoaXMuZHJvcENvbnRhaW5lciBhcyBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD47IH1cbiAgc2V0IGNka0Ryb3BMaXN0KHZhbHVlOiBQYmxOZ3JpZENvbHVtblJlb3JkZXJQbHVnaW5EaXJlY3RpdmU8VD4pIHtcbiAgICAvLyBUTyBTVVBQT1JUIGBjZGtEcm9wTGlzdGAgdmlhIHN0cmluZyBpbnB1dCAoSUQpIHdlIG5lZWQgYSByZWFjdGl2ZSByZWdpc3RyeS4uLlxuICAgIGlmICh0aGlzLmNka0Ryb3BMaXN0KSB7XG4gICAgICB0aGlzLmNka0Ryb3BMaXN0LnJlbW92ZURyYWcodGhpcyk7XG4gICAgfVxuICAgIHRoaXMuZHJvcENvbnRhaW5lciA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5fZHJhZ1JlZi5fd2l0aERyb3BDb250YWluZXIodmFsdWUuX2Ryb3BMaXN0UmVmKTtcbiAgICAgIHZhbHVlLmFkZERyYWcodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgX3Jvb3RDbGFzczogc3RyaW5nO1xuICBfaG9zdE5vdFJvb3QgPSBmYWxzZTtcbiAgbmdPbkluaXQoKTogdm9pZCB7IENka0xhenlEcmFnLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nQWZ0ZXJWaWV3SW5pdC5jYWxsKHRoaXMpOyBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTsgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgQ2RrTGF6eURyYWcucHJvdG90eXBlLm5nT25EZXN0cm95LmNhbGwodGhpcyk7ICBzdXBlci5uZ09uRGVzdHJveSgpOyB9XG4gIC8qIENka0xhenlEcmFnIGVuZCAqL1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBDZGtMYXp5RHJhZy5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0LmNhbGwodGhpcyk7XG4gICAgc3VwZXIubmdBZnRlclZpZXdJbml0KCk7XG5cbiAgICB0aGlzLl9kcmFnUmVmLmJlZm9yZVN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICBjb25zdCB7IGNka0Ryb3BMaXN0IH0gPSB0aGlzO1xuICAgICAgaWYgKGNka0Ryb3BMaXN0ICYmIGNka0Ryb3BMaXN0LmNvbHVtblJlb3JkZXIgJiYgdGhpcy5fY29udGV4dC5jb2wucmVvcmRlcikge1xuICAgICAgICAvLyB3ZSBkb24ndCBhbGxvdyBhIG5ldyBkcmFnZ2luZyBzZXNzaW9uIGJlZm9yZSB0aGUgcHJldmlvdXMgZW5kcy5cbiAgICAgICAgLy8gdGhpcyBzb3VuZCBpbXBvc3NpYmxlLCBidXQgZHVlIHRvIGFuaW1hdGlvbiB0cmFuc2l0aW9ucyBpdHMgYWN0dWFsbHkgaXMuXG4gICAgICAgIC8vIGlmIHRoZSBgdHJhbnNpdGlvbmVuZGAgaXMgbG9uZyBlbm91Z2gsIGEgbmV3IGRyYWcgY2FuIHN0YXJ0Li4uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoZSBgZGlzYWJsZWRgIHN0YXRlIGlzIGNoZWNrZWQgYnkgcG9pbnRlckRvd24gQUZURVIgY2FsbGluZyBiZWZvcmUgc3RhcnQgc28gd2UgY2FuIGNhbmNlbCB0aGUgc3RhcnQuLi5cbiAgICAgICAgaWYgKGNka0Ryb3BMaXN0Ll9kcm9wTGlzdFJlZi5pc0RyYWdnaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnN0YXJ0ZWQuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9jb250ZXh0LmNvbC5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IHRydWUgKTtcbiAgICB0aGlzLmVuZGVkLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSBmYWxzZSApO1xuICB9XG5cbiAgZ2V0Q2VsbHMoKTogSFRNTEVsZW1lbnRbXSB7XG4gICAgaWYgKCF0aGlzLmNhY2hlKSB7XG4gICAgICB0aGlzLmNhY2hlID0gdGhpcy5fY29udGV4dC5jb2wuY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCd0YWJsZScpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jYWNoZTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHN1cGVyLnJlc2V0KCk7XG4gICAgaWYgKHRoaXMuY2FjaGUpIHtcbiAgICAgIGZvciAoY29uc3QgZWwgb2YgdGhpcy5jYWNoZSkge1xuICAgICAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgYDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2FjaGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=