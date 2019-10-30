/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animationFrameScheduler, Subscription } from 'rxjs';
import { auditTime, take } from 'rxjs/operators';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, Optional, OnDestroy, NgZone, ViewEncapsulation } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { CdkDragConfig, DragDropRegistry, CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop';
import { PblColumn, TablePlugin } from '@pebula/ngrid';
import { toggleNativeDragInteractions } from './cdk-encapsulated-code';
import { extendGrid } from './extend-grid';
/** @type {?} */
export const PLUGIN_KEY = 'columnResize';
/**
 * Options that can be used to bind a passive event listener.
 * @type {?}
 */
const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * Options that can be used to bind an active event listener.
 * @type {?}
 */
const activeEventListenerOptions = normalizePassiveListenerOptions({ passive: false });
let PblNgridDragResizeComponent = class PblNgridDragResizeComponent {
    /**
     * @param {?} element
     * @param {?} _ngZone
     * @param {?} _viewportRuler
     * @param {?} _dragDropRegistry
     * @param {?} _config
     * @param {?} _dir
     */
    constructor(element, _ngZone, _viewportRuler, _dragDropRegistry, _config, _dir) {
        this.element = element;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
        this._config = _config;
        this._dir = _dir;
        /**
         * The area (in pixels) in which the handle can be grabbed and resize the cell.
         * Default: 6
         */
        this.grabAreaWidth = 6;
        this._pointerMoveSubscription = Subscription.EMPTY;
        this._pointerUpSubscription = Subscription.EMPTY;
        this._rootElementInitSubscription = Subscription.EMPTY;
        this._pointerDown = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this._initializeDragSequence(this._rootElement, event);
        });
        /**
         * Handler that is invoked when the user moves their pointer after they've initiated a drag.
         */
        this._pointerMove = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            /** @type {?} */
            const pointerPosition = this._getPointerPositionOnPage(event);
            /** @type {?} */
            const distanceX = pointerPosition.x - this._pickupPositionOnPage.x;
            /** @type {?} */
            const distanceY = pointerPosition.y - this._pickupPositionOnPage.y;
            if (!this._hasStartedDragging) {
                // Only start dragging after the user has moved more than the minimum distance in either
                // direction. Note that this is preferable over doing something like `skip(minimumDistance)`
                // in the `pointerMove` subscription, because we're not guaranteed to have one move event
                // per pixel of movement (e.g. if the user moves their pointer quickly).
                if (Math.abs(distanceX) + Math.abs(distanceY) >= this._config.dragStartThreshold) {
                    this._hasStartedDragging = true;
                    // It will be a good thing if we turned of the header's resize observer to boost performance
                    // However, because we relay on the total table minimum width updates to relatively even out the columns it will not work.
                    // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                    // This is because the max-width of the group is set proportional to the total min-width of the inner table.
                    // For it to work we need to directly update the width of ALL OF THE GROUPS.
                    // this.column.columnDef.isDragging = true;
                    this.column.sizeInfo.updateSize();
                    this._lastWidth = this._initialWidth = this.column.columnDef.netWidth;
                    this.cache = this.column.columnDef.queryCellElements('table', 'header', 'footer');
                }
                return;
            }
            this._hasMoved = true;
            event.preventDefault();
            event.stopPropagation();
            /** @type {?} */
            let newWidth = Math.max(0, this._initialWidth + distanceX);
            if (newWidth > this.column.maxWidth) {
                newWidth = this.column.maxWidth;
            }
            else if (distanceX < 0 && newWidth < this.column.minWidth) {
                newWidth = this.column.minWidth;
            }
            if (this._lastWidth !== newWidth) {
                this._lastWidth = newWidth;
                this.column.width = newWidth + 'px';
                this.table.resetColumnsWidth();
                for (const el of this.cache) {
                    this.column.columnDef.applyWidth(el);
                }
                // the above will change the size of on column AND because we didn't disable the resize observer it will pop an event.
                // if there are groups it will fire table.resizeColumns(); which will recalculate the groups...
            }
        });
        /**
         * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
         */
        this._pointerUp = (/**
         * @return {?}
         */
        () => {
            if (!this._isDragging()) {
                return;
            }
            this._removeSubscriptions();
            this._dragDropRegistry.stopDragging(this);
            if (!this._hasStartedDragging) {
                return;
            }
            // this.column.columnDef.isDragging = false;
            this.table.columnApi.resizeColumn(this.column, this._lastWidth + 'px');
            // cleanup
            this.cache = undefined;
        });
        _dragDropRegistry.registerDragItem(this);
    }
    // tslint:disable-next-line:no-input-rename
    /**
     * @param {?} value
     * @return {?}
     */
    set context(value) {
        if (value) {
            const { col, table } = value;
            if (col && col instanceof PblColumn) {
                this.column = col;
                this.table = table;
                return;
            }
        }
        this.column = this.table = undefined;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // We need to wait for the zone to stabilize, in order for the reference
        // element to be in the proper place in the DOM. This is mostly relevant
        // for draggable elements inside portals since they get stamped out in
        // their original DOM position and then they get transferred to the portal.
        this._rootElementInitSubscription = this._ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const rootElement = this._rootElement = this._getRootElement();
            /** @type {?} */
            const cell = rootElement.parentElement;
            cell.classList.add('pbl-ngrid-column-resize');
            rootElement.addEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
            rootElement.addEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
            toggleNativeDragInteractions(rootElement, false);
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._rootElement) {
            this._rootElement.removeEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
            this._rootElement.removeEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
        }
        this._rootElementInitSubscription.unsubscribe();
        this._dragDropRegistry.removeDragItem(this);
        this._removeSubscriptions();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDoubleClick(event) {
        this.table.columnApi.autoSizeColumn(this.column);
    }
    /**
     * Sets up the different variables and subscriptions
     * that will be necessary for the dragging sequence.
     * @private
     * @param {?} referenceElement Element that started the drag sequence.
     * @param {?} event Browser event object that started the sequence.
     * @return {?}
     */
    _initializeDragSequence(referenceElement, event) {
        // Always stop propagation for the event that initializes
        // the dragging sequence, in order to prevent it from potentially
        // starting another sequence for a draggable parent somewhere up the DOM tree.
        event.stopPropagation();
        // Abort if the user is already dragging or is using a mouse button other than the primary one.
        if (this._isDragging() || (!this._isTouchEvent(event) && event.button !== 0)) {
            return;
        }
        this._hasStartedDragging = this._hasMoved = false;
        this._pointerMoveSubscription = this._dragDropRegistry.pointerMove
            .pipe(auditTime(0, animationFrameScheduler))
            .subscribe(this._pointerMove);
        this._pointerUpSubscription = this._dragDropRegistry.pointerUp.subscribe(this._pointerUp);
        this._scrollPosition = this._viewportRuler.getViewportScrollPosition();
        this._pickupPositionOnPage = this._getPointerPositionOnPage(event);
        this._dragDropRegistry.startDragging(this, event);
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _getPointerPositionOnPage(event) {
        /** @type {?} */
        const point = this._isTouchEvent(event) ? event.touches[0] : event;
        return {
            x: point.pageX - this._scrollPosition.left,
            y: point.pageY - this._scrollPosition.top
        };
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    _isTouchEvent(event) {
        return event.type.startsWith('touch');
    }
    /**
     * @return {?}
     */
    _isDragging() {
        return this._dragDropRegistry.isDragging(this);
    }
    /**
     * @private
     * @return {?}
     */
    _getRootElement() {
        return this.element.nativeElement;
    }
    /**
     * @private
     * @return {?}
     */
    _removeSubscriptions() {
        this._pointerMoveSubscription.unsubscribe();
        this._pointerUpSubscription.unsubscribe();
    }
};
PblNgridDragResizeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ViewportRuler },
    { type: DragDropRegistry },
    { type: undefined },
    { type: Directionality }
];
PblNgridDragResizeComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-drag-resize',
                // tslint:disable-line:component-selector
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'pbl-ngrid-column-resizer',
                    '[style.width.px]': 'grabAreaWidth',
                },
                template: "<ng-content></ng-content>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".pbl-ngrid-column-resizer{position:absolute;right:0;height:100%;cursor:col-resize;z-index:50000}"]
            }] }
];
/** @nocollapse */
PblNgridDragResizeComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: ViewportRuler },
    { type: DragDropRegistry },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_DRAG_CONFIG,] }] },
    { type: Directionality, decorators: [{ type: Optional }] }
];
PblNgridDragResizeComponent.propDecorators = {
    context: [{ type: Input }],
    grabAreaWidth: [{ type: Input }],
    onDoubleClick: [{ type: HostListener, args: ['dblclick', ['$event'],] }]
};
PblNgridDragResizeComponent = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY, runOnce: extendGrid }),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        NgZone,
        ViewportRuler,
        DragDropRegistry, Object, Directionality])
], PblNgridDragResizeComponent);
export { PblNgridDragResizeComponent };
if (false) {
    /**
     * The area (in pixels) in which the handle can be grabbed and resize the cell.
     * Default: 6
     * @type {?}
     */
    PblNgridDragResizeComponent.prototype.grabAreaWidth;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype.column;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype.table;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype._hasStartedDragging;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._hasMoved;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._rootElement;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerMoveSubscription;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerUpSubscription;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._scrollPosition;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pickupPositionOnPage;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._initialWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._lastWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._rootElementInitSubscription;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype._pointerDown;
    /**
     * Handler that is invoked when the user moves their pointer after they've initiated a drag.
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerMove;
    /**
     * Handler that is invoked when the user lifts their pointer up, after initiating a drag.
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._pointerUp;
    /** @type {?} */
    PblNgridDragResizeComponent.prototype.element;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._dragDropRegistry;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._config;
    /**
     * @type {?}
     * @private
     */
    PblNgridDragResizeComponent.prototype._dir;
}
/**
 * @record
 */
function Point() { }
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0ssT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTFGLE9BQU8sRUFBcUIsU0FBUyxFQUEyQixXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRM0MsTUFBTSxPQUFPLFVBQVUsR0FBbUIsY0FBYzs7Ozs7TUFHbEQsMkJBQTJCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7Ozs7O01BRzlFLDBCQUEwQixHQUFHLCtCQUErQixDQUFDLEVBQUMsT0FB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O0lBQ3ZELDJDQUF3Qzs7Ozs7QUFxS3RELG9CQUdDOzs7SUFGQyxrQkFBVTs7SUFDVixrQkFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgT25EZXN0cm95LCBOZ1pvbmUsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDZGtEcmFnQ29uZmlnLCBEcmFnRHJvcFJlZ2lzdHJ5LCBDREtfRFJBR19DT05GSUcgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibENvbHVtbiwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyB0b2dnbGVOYXRpdmVEcmFnSW50ZXJhY3Rpb25zIH0gZnJvbSAnLi9jZGstZW5jYXBzdWxhdGVkLWNvZGUnO1xuaW1wb3J0IHsgZXh0ZW5kR3JpZCB9IGZyb20gJy4vZXh0ZW5kLWdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgY29sdW1uUmVzaXplPzogUGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnY29sdW1uUmVzaXplJyA9ICdjb2x1bW5SZXNpemUnO1xuXG4vKiogT3B0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGJpbmQgYSBwYXNzaXZlIGV2ZW50IGxpc3RlbmVyLiAqL1xuY29uc3QgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogdHJ1ZX0pO1xuXG4vKiogT3B0aW9ucyB0aGF0IGNhbiBiZSB1c2VkIHRvIGJpbmQgYW4gYWN0aXZlIGV2ZW50IGxpc3RlbmVyLiAqL1xuY29uc3QgYWN0aXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiBmYWxzZX0pO1xuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgcnVuT25jZTogZXh0ZW5kR3JpZCB9KVxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWRyYWctcmVzaXplJywgLy8gdHNsaW50OmRpc2FibGUtbGluZTpjb21wb25lbnQtc2VsZWN0b3JcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtY29sdW1uLXJlc2l6ZXInLFxuICAgICdbc3R5bGUud2lkdGgucHhdJzogJ2dyYWJBcmVhV2lkdGgnLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogJy4vY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC5zY3NzJyBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgpIHNldCBjb250ZXh0KHZhbHVlOiBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnk+KSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCB7IGNvbCwgdGFibGUgfSA9IHZhbHVlO1xuICAgICAgaWYgKGNvbCAmJiBjb2wgaW5zdGFuY2VvZiBQYmxDb2x1bW4pIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2w7XG4gICAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbHVtbiA9IHRoaXMudGFibGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFyZWEgKGluIHBpeGVscykgaW4gd2hpY2ggdGhlIGhhbmRsZSBjYW4gYmUgZ3JhYmJlZCBhbmQgcmVzaXplIHRoZSBjZWxsLlxuICAgKiBEZWZhdWx0OiA2XG4gICAqL1xuICBASW5wdXQoKSBncmFiQXJlYVdpZHRoID0gNjtcblxuICBjb2x1bW46IFBibENvbHVtbjtcbiAgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG5cbiAgX2hhc1N0YXJ0ZWREcmFnZ2luZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGFzTW92ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcG9pbnRlck1vdmVTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BvaW50ZXJVcFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfc2Nyb2xsUG9zaXRpb246IHt0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfTtcbiAgcHJpdmF0ZSBfcGlja3VwUG9zaXRpb25PblBhZ2U6IFBvaW50O1xuICBwcml2YXRlIF9pbml0aWFsV2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbGFzdFdpZHRoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBjYWNoZTogSFRNTEVsZW1lbnRbXTtcblxuICBwcml2YXRlIF9yb290RWxlbWVudEluaXRTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQsIGFueT4sXG4gICAgICAgICAgICAgIEBJbmplY3QoQ0RLX0RSQUdfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IENka0RyYWdDb25maWcsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHkpIHtcbiAgICBfZHJhZ0Ryb3BSZWdpc3RyeS5yZWdpc3RlckRyYWdJdGVtKHRoaXMpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIC8vIFdlIG5lZWQgdG8gd2FpdCBmb3IgdGhlIHpvbmUgdG8gc3RhYmlsaXplLCBpbiBvcmRlciBmb3IgdGhlIHJlZmVyZW5jZVxuICAgIC8vIGVsZW1lbnQgdG8gYmUgaW4gdGhlIHByb3BlciBwbGFjZSBpbiB0aGUgRE9NLiBUaGlzIGlzIG1vc3RseSByZWxldmFudFxuICAgIC8vIGZvciBkcmFnZ2FibGUgZWxlbWVudHMgaW5zaWRlIHBvcnRhbHMgc2luY2UgdGhleSBnZXQgc3RhbXBlZCBvdXQgaW5cbiAgICAvLyB0aGVpciBvcmlnaW5hbCBET00gcG9zaXRpb24gYW5kIHRoZW4gdGhleSBnZXQgdHJhbnNmZXJyZWQgdG8gdGhlIHBvcnRhbC5cbiAgICB0aGlzLl9yb290RWxlbWVudEluaXRTdWJzY3JpcHRpb24gPSB0aGlzLl9uZ1pvbmUub25TdGFibGUuYXNPYnNlcnZhYmxlKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc3Qgcm9vdEVsZW1lbnQgPSB0aGlzLl9yb290RWxlbWVudCA9IHRoaXMuX2dldFJvb3RFbGVtZW50KCk7XG4gICAgICBjb25zdCBjZWxsID0gcm9vdEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWNvbHVtbi1yZXNpemUnKTtcbiAgICAgIHJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX3BvaW50ZXJEb3duLCBhY3RpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fcG9pbnRlckRvd24sIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gICAgICB0b2dnbGVOYXRpdmVEcmFnSW50ZXJhY3Rpb25zKHJvb3RFbGVtZW50ICwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICB0aGlzLl9yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9wb2ludGVyRG93biwgYWN0aXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgICAgdGhpcy5fcm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX3BvaW50ZXJEb3duLCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgIH1cbiAgICB0aGlzLl9yb290RWxlbWVudEluaXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnJlbW92ZURyYWdJdGVtKHRoaXMpO1xuICAgIHRoaXMuX3JlbW92ZVN1YnNjcmlwdGlvbnMoKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgb25Eb3VibGVDbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuY29sdW1uQXBpLmF1dG9TaXplQ29sdW1uKHRoaXMuY29sdW1uKTtcbiAgfVxuXG4gIF9wb2ludGVyRG93biA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICB0aGlzLl9pbml0aWFsaXplRHJhZ1NlcXVlbmNlKHRoaXMuX3Jvb3RFbGVtZW50LCBldmVudCk7XG4gIH1cblxuICAgIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBkaWZmZXJlbnQgdmFyaWFibGVzIGFuZCBzdWJzY3JpcHRpb25zXG4gICAqIHRoYXQgd2lsbCBiZSBuZWNlc3NhcnkgZm9yIHRoZSBkcmFnZ2luZyBzZXF1ZW5jZS5cbiAgICogQHBhcmFtIHJlZmVyZW5jZUVsZW1lbnQgRWxlbWVudCB0aGF0IHN0YXJ0ZWQgdGhlIGRyYWcgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSBldmVudCBCcm93c2VyIGV2ZW50IG9iamVjdCB0aGF0IHN0YXJ0ZWQgdGhlIHNlcXVlbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZURyYWdTZXF1ZW5jZShyZWZlcmVuY2VFbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgLy8gQWx3YXlzIHN0b3AgcHJvcGFnYXRpb24gZm9yIHRoZSBldmVudCB0aGF0IGluaXRpYWxpemVzXG4gICAgLy8gdGhlIGRyYWdnaW5nIHNlcXVlbmNlLCBpbiBvcmRlciB0byBwcmV2ZW50IGl0IGZyb20gcG90ZW50aWFsbHlcbiAgICAvLyBzdGFydGluZyBhbm90aGVyIHNlcXVlbmNlIGZvciBhIGRyYWdnYWJsZSBwYXJlbnQgc29tZXdoZXJlIHVwIHRoZSBET00gdHJlZS5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIC8vIEFib3J0IGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgZHJhZ2dpbmcgb3IgaXMgdXNpbmcgYSBtb3VzZSBidXR0b24gb3RoZXIgdGhhbiB0aGUgcHJpbWFyeSBvbmUuXG4gICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcoKSB8fCAoIXRoaXMuX2lzVG91Y2hFdmVudChldmVudCkgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuX2hhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5fcG9pbnRlck1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnBvaW50ZXJNb3ZlXG4gICAgICAucGlwZShhdWRpdFRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9wb2ludGVyTW92ZSk7XG4gICAgdGhpcy5fcG9pbnRlclVwU3Vic2NyaXB0aW9uID0gdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5wb2ludGVyVXAuc3Vic2NyaWJlKHRoaXMuX3BvaW50ZXJVcCk7XG4gICAgdGhpcy5fc2Nyb2xsUG9zaXRpb24gPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcblxuICAgIHRoaXMuX3BpY2t1cFBvc2l0aW9uT25QYWdlID0gdGhpcy5fZ2V0UG9pbnRlclBvc2l0aW9uT25QYWdlKGV2ZW50KTtcbiAgICB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnN0YXJ0RHJhZ2dpbmcodGhpcywgZXZlbnQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXIgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIHVzZXIgbW92ZXMgdGhlaXIgcG9pbnRlciBhZnRlciB0aGV5J3ZlIGluaXRpYXRlZCBhIGRyYWcuICovXG4gIHByaXZhdGUgX3BvaW50ZXJNb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgIGNvbnN0IHBvaW50ZXJQb3NpdGlvbiA9IHRoaXMuX2dldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudCk7XG4gICAgY29uc3QgZGlzdGFuY2VYID0gcG9pbnRlclBvc2l0aW9uLnggLSB0aGlzLl9waWNrdXBQb3NpdGlvbk9uUGFnZS54O1xuICAgIGNvbnN0IGRpc3RhbmNlWSA9IHBvaW50ZXJQb3NpdGlvbi55IC0gdGhpcy5fcGlja3VwUG9zaXRpb25PblBhZ2UueTtcblxuICAgIGlmICghdGhpcy5faGFzU3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAvLyBPbmx5IHN0YXJ0IGRyYWdnaW5nIGFmdGVyIHRoZSB1c2VyIGhhcyBtb3ZlZCBtb3JlIHRoYW4gdGhlIG1pbmltdW0gZGlzdGFuY2UgaW4gZWl0aGVyXG4gICAgICAvLyBkaXJlY3Rpb24uIE5vdGUgdGhhdCB0aGlzIGlzIHByZWZlcmFibGUgb3ZlciBkb2luZyBzb21ldGhpbmcgbGlrZSBgc2tpcChtaW5pbXVtRGlzdGFuY2UpYFxuICAgICAgLy8gaW4gdGhlIGBwb2ludGVyTW92ZWAgc3Vic2NyaXB0aW9uLCBiZWNhdXNlIHdlJ3JlIG5vdCBndWFyYW50ZWVkIHRvIGhhdmUgb25lIG1vdmUgZXZlbnRcbiAgICAgIC8vIHBlciBwaXhlbCBvZiBtb3ZlbWVudCAoZS5nLiBpZiB0aGUgdXNlciBtb3ZlcyB0aGVpciBwb2ludGVyIHF1aWNrbHkpLlxuICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWCkgKyBNYXRoLmFicyhkaXN0YW5jZVkpID49IHRoaXMuX2NvbmZpZy5kcmFnU3RhcnRUaHJlc2hvbGQpIHtcbiAgICAgICAgdGhpcy5faGFzU3RhcnRlZERyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBJdCB3aWxsIGJlIGEgZ29vZCB0aGluZyBpZiB3ZSB0dXJuZWQgb2YgdGhlIGhlYWRlcidzIHJlc2l6ZSBvYnNlcnZlciB0byBib29zdCBwZXJmb3JtYW5jZVxuICAgICAgICAvLyBIb3dldmVyLCBiZWNhdXNlIHdlIHJlbGF5IG9uIHRoZSB0b3RhbCB0YWJsZSBtaW5pbXVtIHdpZHRoIHVwZGF0ZXMgdG8gcmVsYXRpdmVseSBldmVuIG91dCB0aGUgY29sdW1ucyBpdCB3aWxsIG5vdCB3b3JrLlxuICAgICAgICAvLyBHcm91cCBjZWxscyB3aWxsIG5vdCBjb3ZlciBhbGwgb2YgdGhlIGNoaWxkcmVuLCB3aGVuIHdlIGVubGFyZ2UgdGhlIHdpZHRoIG9mIGEgY2hpbGQgaW4gdGhlIGdyb3VwLlxuICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlIG1heC13aWR0aCBvZiB0aGUgZ3JvdXAgaXMgc2V0IHByb3BvcnRpb25hbCB0byB0aGUgdG90YWwgbWluLXdpZHRoIG9mIHRoZSBpbm5lciB0YWJsZS5cbiAgICAgICAgLy8gRm9yIGl0IHRvIHdvcmsgd2UgbmVlZCB0byBkaXJlY3RseSB1cGRhdGUgdGhlIHdpZHRoIG9mIEFMTCBPRiBUSEUgR1JPVVBTLlxuICAgICAgICAvLyB0aGlzLmNvbHVtbi5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jb2x1bW4uc2l6ZUluZm8udXBkYXRlU2l6ZSgpO1xuICAgICAgICB0aGlzLl9sYXN0V2lkdGggPSB0aGlzLl9pbml0aWFsV2lkdGggPSB0aGlzLmNvbHVtbi5jb2x1bW5EZWYubmV0V2lkdGg7XG4gICAgICAgIHRoaXMuY2FjaGUgPSB0aGlzLmNvbHVtbi5jb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoJ3RhYmxlJywgJ2hlYWRlcicsICdmb290ZXInKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYXNNb3ZlZCA9IHRydWU7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGxldCBuZXdXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMuX2luaXRpYWxXaWR0aCArIGRpc3RhbmNlWCk7XG5cbiAgICBpZiAobmV3V2lkdGggPiB0aGlzLmNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgbmV3V2lkdGggPSB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgICB9IGVsc2UgaWYgKGRpc3RhbmNlWCA8IDAgJiYgbmV3V2lkdGggPCB0aGlzLmNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgbmV3V2lkdGggPSB0aGlzLmNvbHVtbi5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGFzdFdpZHRoICE9PSBuZXdXaWR0aCkge1xuICAgICAgdGhpcy5fbGFzdFdpZHRoID0gbmV3V2lkdGg7XG4gICAgICB0aGlzLmNvbHVtbi53aWR0aCA9IG5ld1dpZHRoICsgJ3B4JztcbiAgICAgIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcblxuICAgICAgZm9yIChjb25zdCBlbCBvZiB0aGlzLmNhY2hlKSB7XG4gICAgICAgIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5hcHBseVdpZHRoKGVsKVxuICAgICAgfVxuICAgICAgLy8gdGhlIGFib3ZlIHdpbGwgY2hhbmdlIHRoZSBzaXplIG9mIG9uIGNvbHVtbiBBTkQgYmVjYXVzZSB3ZSBkaWRuJ3QgZGlzYWJsZSB0aGUgcmVzaXplIG9ic2VydmVyIGl0IHdpbGwgcG9wIGFuIGV2ZW50LlxuICAgICAgLy8gaWYgdGhlcmUgYXJlIGdyb3VwcyBpdCB3aWxsIGZpcmUgdGFibGUucmVzaXplQ29sdW1ucygpOyB3aGljaCB3aWxsIHJlY2FsY3VsYXRlIHRoZSBncm91cHMuLi5cbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlciB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgdXNlciBsaWZ0cyB0aGVpciBwb2ludGVyIHVwLCBhZnRlciBpbml0aWF0aW5nIGEgZHJhZy4gKi9cbiAgcHJpdmF0ZSBfcG9pbnRlclVwID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5faXNEcmFnZ2luZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVtb3ZlU3Vic2NyaXB0aW9ucygpO1xuICAgIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkuc3RvcERyYWdnaW5nKHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLl9oYXNTdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmNvbHVtbi5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMudGFibGUuY29sdW1uQXBpLnJlc2l6ZUNvbHVtbih0aGlzLmNvbHVtbiwgdGhpcy5fbGFzdFdpZHRoICsgJ3B4Jyk7XG5cbiAgICAvLyBjbGVhbnVwXG4gICAgdGhpcy5jYWNoZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBQb2ludCB7XG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLl9pc1RvdWNoRXZlbnQoZXZlbnQpID8gZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHBvaW50LnBhZ2VYIC0gdGhpcy5fc2Nyb2xsUG9zaXRpb24ubGVmdCxcbiAgICAgIHk6IHBvaW50LnBhZ2VZIC0gdGhpcy5fc2Nyb2xsUG9zaXRpb24udG9wXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzVG91Y2hFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBldmVudCBpcyBUb3VjaEV2ZW50IHtcbiAgICByZXR1cm4gZXZlbnQudHlwZS5zdGFydHNXaXRoKCd0b3VjaCcpO1xuICB9XG5cbiAgX2lzRHJhZ2dpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkuaXNEcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlU3Vic2NyaXB0aW9ucygpIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3BvaW50ZXJVcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbmludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuIl19