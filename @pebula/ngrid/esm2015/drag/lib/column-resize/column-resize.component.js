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
import { NgridPlugin, isPblColumn } from '@pebula/ngrid';
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
                    // However, because we relay on the total grid minimum width updates to relatively even out the columns it will not work.
                    // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                    // This is because the max-width of the group is set proportional to the total min-width of the inner grid.
                    // For it to work we need to directly update the width of ALL OF THE GROUPS.
                    // this.column.columnDef.isDragging = true;
                    this.column.sizeInfo.updateSize();
                    this._lastWidth = this._initialWidth = this.column.columnDef.netWidth;
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
                this.column.updateWidth(`${newWidth}px`);
                this.grid.resetColumnsWidth();
                // `this.column.updateWidth` will update the grid width cell only, which will trigger a resize that will update all other cells
                // `this.grid.resetColumnsWidth()` will re-adjust all other grid width cells, and if their size changes they will trigger the resize event...
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
            this.grid.columnApi.resizeColumn(this.column, this._lastWidth + 'px');
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
            const { col, grid } = value;
            if (isPblColumn(col)) {
                this.column = col;
                this.grid = grid;
                return;
            }
        }
        this.column = this.grid = undefined;
    }
    /**
     * @deprecated use grid instead
     * @return {?}
     */
    get table() { return this.grid; }
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
        this.grid.columnApi.autoSizeColumn(this.column);
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
    NgridPlugin({ id: PLUGIN_KEY, runOnce: extendGrid }),
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
    PblNgridDragResizeComponent.prototype.grid;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUYsT0FBTyxFQUF5RCxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDLE1BQU0sT0FBTyxVQUFVLEdBQW1CLGNBQWM7Ozs7O01BR2xELDJCQUEyQixHQUFHLCtCQUErQixDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDOzs7OztNQUc5RSwwQkFBMEIsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9B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NUNDLFVBQVU7WUFNVixNQUFNO1lBS0MsYUFBYTtZQUVFLGdCQUFnQjs0Q0EwRXpCLE1BQU0sU0FBQyxlQUFlO1lBN0U1QixjQUFjLHVCQThFUixRQUFROzs7c0JBeENwQixLQUFLOzRCQWdCTCxLQUFLOzRCQXFETCxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOztBQXhFekIsMkJBQTJCO0lBWnZDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDOzZDQWtEdkIsVUFBVTtRQUNULE1BQU07UUFDQyxhQUFhO1FBQ1YsZ0JBQWdCLFVBRWpCLGNBQWM7R0EzQ3pDLDJCQUEyQixDQXNNdkM7U0F0TVksMkJBQTJCOzs7Ozs7O0lBbUJ0QyxvREFBMkI7O0lBRTNCLDZDQUFrQjs7SUFHbEIsMkNBQTZCOztJQUU3QiwwREFBNkI7Ozs7O0lBQzdCLGdEQUEyQjs7Ozs7SUFDM0IsbURBQWtDOzs7OztJQUNsQywrREFBc0Q7Ozs7O0lBQ3RELDZEQUFvRDs7Ozs7SUFDcEQsc0RBQXFEOzs7OztJQUNyRCw0REFBcUM7Ozs7O0lBQ3JDLG9EQUE4Qjs7Ozs7SUFDOUIsaURBQTJCOzs7OztJQUUzQixtRUFBMEQ7O0lBeUMxRCxtREFFQzs7Ozs7O0lBK0JELG1EQTZDQzs7Ozs7O0lBR0QsaURBY0M7O0lBdElXLDhDQUF1Qzs7Ozs7SUFDdkMsOENBQXVCOzs7OztJQUN2QixxREFBcUM7Ozs7O0lBQ3JDLHdEQUE2RTs7Ozs7SUFDN0UsOENBQXVEOzs7OztJQUN2RCwyQ0FBd0M7Ozs7O0FBNkp0RCxvQkFHQzs7O0lBRkMsa0JBQVU7O0lBQ1Ysa0JBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPbkRlc3Ryb3ksXG4gIE5nWm9uZSxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgVmlld3BvcnRSdWxlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBDZGtEcmFnQ29uZmlnLCBEcmFnRHJvcFJlZ2lzdHJ5LCBDREtfRFJBR19DT05GSUcgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibENvbHVtbiwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIE5ncmlkUGx1Z2luLCBpc1BibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgdG9nZ2xlTmF0aXZlRHJhZ0ludGVyYWN0aW9ucyB9IGZyb20gJy4vY2RrLWVuY2Fwc3VsYXRlZC1jb2RlJztcbmltcG9ydCB7IGV4dGVuZEdyaWQgfSBmcm9tICcuL2V4dGVuZC1ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNvbHVtblJlc2l6ZT86IFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NvbHVtblJlc2l6ZScgPSAnY29sdW1uUmVzaXplJztcblxuLyoqIE9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBiaW5kIGEgcGFzc2l2ZSBldmVudCBsaXN0ZW5lci4gKi9cbmNvbnN0IHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KTtcblxuLyoqIE9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBiaW5kIGFuIGFjdGl2ZSBldmVudCBsaXN0ZW5lci4gKi9cbmNvbnN0IGFjdGl2ZUV2ZW50TGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogZmFsc2V9KTtcblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIHJ1bk9uY2U6IGV4dGVuZEdyaWQgfSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1kcmFnLXJlc2l6ZScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWNvbHVtbi1yZXNpemVyJyxcbiAgICAnW3N0eWxlLndpZHRoLnB4XSc6ICdncmFiQXJlYVdpZHRoJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbHVtbi1yZXNpemUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuc2NzcycgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoKSBzZXQgY29udGV4dCh2YWx1ZTogUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgeyBjb2wsIGdyaWQgfSA9IHZhbHVlO1xuICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2w7XG4gICAgICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb2x1bW4gPSB0aGlzLmdyaWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFyZWEgKGluIHBpeGVscykgaW4gd2hpY2ggdGhlIGhhbmRsZSBjYW4gYmUgZ3JhYmJlZCBhbmQgcmVzaXplIHRoZSBjZWxsLlxuICAgKiBEZWZhdWx0OiA2XG4gICAqL1xuICBASW5wdXQoKSBncmFiQXJlYVdpZHRoID0gNjtcblxuICBjb2x1bW46IFBibENvbHVtbjtcbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgZ2V0IHRhYmxlKCk6IFBibE5ncmlkQ29tcG9uZW50PGFueT4geyByZXR1cm4gdGhpcy5ncmlkOyB9XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG5cbiAgX2hhc1N0YXJ0ZWREcmFnZ2luZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGFzTW92ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfcG9pbnRlck1vdmVTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BvaW50ZXJVcFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfc2Nyb2xsUG9zaXRpb246IHt0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfTtcbiAgcHJpdmF0ZSBfcGlja3VwUG9zaXRpb25PblBhZ2U6IFBvaW50O1xuICBwcml2YXRlIF9pbml0aWFsV2lkdGg6IG51bWJlcjtcbiAgcHJpdmF0ZSBfbGFzdFdpZHRoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfcm9vdEVsZW1lbnRJbml0U3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RyYWdEcm9wUmVnaXN0cnk6IERyYWdEcm9wUmVnaXN0cnk8UGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50LCBhbnk+LFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBDZGtEcmFnQ29uZmlnLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5KSB7XG4gICAgX2RyYWdEcm9wUmVnaXN0cnkucmVnaXN0ZXJEcmFnSXRlbSh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSB6b25lIHRvIHN0YWJpbGl6ZSwgaW4gb3JkZXIgZm9yIHRoZSByZWZlcmVuY2VcbiAgICAvLyBlbGVtZW50IHRvIGJlIGluIHRoZSBwcm9wZXIgcGxhY2UgaW4gdGhlIERPTS4gVGhpcyBpcyBtb3N0bHkgcmVsZXZhbnRcbiAgICAvLyBmb3IgZHJhZ2dhYmxlIGVsZW1lbnRzIGluc2lkZSBwb3J0YWxzIHNpbmNlIHRoZXkgZ2V0IHN0YW1wZWQgb3V0IGluXG4gICAgLy8gdGhlaXIgb3JpZ2luYWwgRE9NIHBvc2l0aW9uIGFuZCB0aGVuIHRoZXkgZ2V0IHRyYW5zZmVycmVkIHRvIHRoZSBwb3J0YWwuXG4gICAgdGhpcy5fcm9vdEVsZW1lbnRJbml0U3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gdGhpcy5fcm9vdEVsZW1lbnQgPSB0aGlzLl9nZXRSb290RWxlbWVudCgpO1xuICAgICAgY29uc3QgY2VsbCA9IHJvb3RFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jb2x1bW4tcmVzaXplJyk7XG4gICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9wb2ludGVyRG93biwgYWN0aXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX3BvaW50ZXJEb3duLCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgICAgdG9nZ2xlTmF0aXZlRHJhZ0ludGVyYWN0aW9ucyhyb290RWxlbWVudCAsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgdGhpcy5fcm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fcG9pbnRlckRvd24sIGFjdGl2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9wb2ludGVyRG93biwgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICB9XG4gICAgdGhpcy5fcm9vdEVsZW1lbnRJbml0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5yZW1vdmVEcmFnSXRlbSh0aGlzKTtcbiAgICB0aGlzLl9yZW1vdmVTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQuY29sdW1uQXBpLmF1dG9TaXplQ29sdW1uKHRoaXMuY29sdW1uKTtcbiAgfVxuXG4gIF9wb2ludGVyRG93biA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICB0aGlzLl9pbml0aWFsaXplRHJhZ1NlcXVlbmNlKHRoaXMuX3Jvb3RFbGVtZW50LCBldmVudCk7XG4gIH1cblxuICAgIC8qKlxuICAgKiBTZXRzIHVwIHRoZSBkaWZmZXJlbnQgdmFyaWFibGVzIGFuZCBzdWJzY3JpcHRpb25zXG4gICAqIHRoYXQgd2lsbCBiZSBuZWNlc3NhcnkgZm9yIHRoZSBkcmFnZ2luZyBzZXF1ZW5jZS5cbiAgICogQHBhcmFtIHJlZmVyZW5jZUVsZW1lbnQgRWxlbWVudCB0aGF0IHN0YXJ0ZWQgdGhlIGRyYWcgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSBldmVudCBCcm93c2VyIGV2ZW50IG9iamVjdCB0aGF0IHN0YXJ0ZWQgdGhlIHNlcXVlbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdGlhbGl6ZURyYWdTZXF1ZW5jZShyZWZlcmVuY2VFbGVtZW50OiBIVE1MRWxlbWVudCwgZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSB7XG4gICAgLy8gQWx3YXlzIHN0b3AgcHJvcGFnYXRpb24gZm9yIHRoZSBldmVudCB0aGF0IGluaXRpYWxpemVzXG4gICAgLy8gdGhlIGRyYWdnaW5nIHNlcXVlbmNlLCBpbiBvcmRlciB0byBwcmV2ZW50IGl0IGZyb20gcG90ZW50aWFsbHlcbiAgICAvLyBzdGFydGluZyBhbm90aGVyIHNlcXVlbmNlIGZvciBhIGRyYWdnYWJsZSBwYXJlbnQgc29tZXdoZXJlIHVwIHRoZSBET00gdHJlZS5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIC8vIEFib3J0IGlmIHRoZSB1c2VyIGlzIGFscmVhZHkgZHJhZ2dpbmcgb3IgaXMgdXNpbmcgYSBtb3VzZSBidXR0b24gb3RoZXIgdGhhbiB0aGUgcHJpbWFyeSBvbmUuXG4gICAgaWYgKHRoaXMuX2lzRHJhZ2dpbmcoKSB8fCAoIXRoaXMuX2lzVG91Y2hFdmVudChldmVudCkgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuX2hhc01vdmVkID0gZmFsc2U7XG4gICAgdGhpcy5fcG9pbnRlck1vdmVTdWJzY3JpcHRpb24gPSB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnBvaW50ZXJNb3ZlXG4gICAgICAucGlwZShhdWRpdFRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9wb2ludGVyTW92ZSk7XG4gICAgdGhpcy5fcG9pbnRlclVwU3Vic2NyaXB0aW9uID0gdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5wb2ludGVyVXAuc3Vic2NyaWJlKHRoaXMuX3BvaW50ZXJVcCk7XG4gICAgdGhpcy5fc2Nyb2xsUG9zaXRpb24gPSB0aGlzLl92aWV3cG9ydFJ1bGVyLmdldFZpZXdwb3J0U2Nyb2xsUG9zaXRpb24oKTtcblxuICAgIHRoaXMuX3BpY2t1cFBvc2l0aW9uT25QYWdlID0gdGhpcy5fZ2V0UG9pbnRlclBvc2l0aW9uT25QYWdlKGV2ZW50KTtcbiAgICB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnN0YXJ0RHJhZ2dpbmcodGhpcywgZXZlbnQpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXIgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIHVzZXIgbW92ZXMgdGhlaXIgcG9pbnRlciBhZnRlciB0aGV5J3ZlIGluaXRpYXRlZCBhIGRyYWcuICovXG4gIHByaXZhdGUgX3BvaW50ZXJNb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgIGNvbnN0IHBvaW50ZXJQb3NpdGlvbiA9IHRoaXMuX2dldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudCk7XG4gICAgY29uc3QgZGlzdGFuY2VYID0gcG9pbnRlclBvc2l0aW9uLnggLSB0aGlzLl9waWNrdXBQb3NpdGlvbk9uUGFnZS54O1xuICAgIGNvbnN0IGRpc3RhbmNlWSA9IHBvaW50ZXJQb3NpdGlvbi55IC0gdGhpcy5fcGlja3VwUG9zaXRpb25PblBhZ2UueTtcblxuICAgIGlmICghdGhpcy5faGFzU3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAvLyBPbmx5IHN0YXJ0IGRyYWdnaW5nIGFmdGVyIHRoZSB1c2VyIGhhcyBtb3ZlZCBtb3JlIHRoYW4gdGhlIG1pbmltdW0gZGlzdGFuY2UgaW4gZWl0aGVyXG4gICAgICAvLyBkaXJlY3Rpb24uIE5vdGUgdGhhdCB0aGlzIGlzIHByZWZlcmFibGUgb3ZlciBkb2luZyBzb21ldGhpbmcgbGlrZSBgc2tpcChtaW5pbXVtRGlzdGFuY2UpYFxuICAgICAgLy8gaW4gdGhlIGBwb2ludGVyTW92ZWAgc3Vic2NyaXB0aW9uLCBiZWNhdXNlIHdlJ3JlIG5vdCBndWFyYW50ZWVkIHRvIGhhdmUgb25lIG1vdmUgZXZlbnRcbiAgICAgIC8vIHBlciBwaXhlbCBvZiBtb3ZlbWVudCAoZS5nLiBpZiB0aGUgdXNlciBtb3ZlcyB0aGVpciBwb2ludGVyIHF1aWNrbHkpLlxuICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlWCkgKyBNYXRoLmFicyhkaXN0YW5jZVkpID49IHRoaXMuX2NvbmZpZy5kcmFnU3RhcnRUaHJlc2hvbGQpIHtcbiAgICAgICAgdGhpcy5faGFzU3RhcnRlZERyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICAvLyBJdCB3aWxsIGJlIGEgZ29vZCB0aGluZyBpZiB3ZSB0dXJuZWQgb2YgdGhlIGhlYWRlcidzIHJlc2l6ZSBvYnNlcnZlciB0byBib29zdCBwZXJmb3JtYW5jZVxuICAgICAgICAvLyBIb3dldmVyLCBiZWNhdXNlIHdlIHJlbGF5IG9uIHRoZSB0b3RhbCBncmlkIG1pbmltdW0gd2lkdGggdXBkYXRlcyB0byByZWxhdGl2ZWx5IGV2ZW4gb3V0IHRoZSBjb2x1bW5zIGl0IHdpbGwgbm90IHdvcmsuXG4gICAgICAgIC8vIEdyb3VwIGNlbGxzIHdpbGwgbm90IGNvdmVyIGFsbCBvZiB0aGUgY2hpbGRyZW4sIHdoZW4gd2UgZW5sYXJnZSB0aGUgd2lkdGggb2YgYSBjaGlsZCBpbiB0aGUgZ3JvdXAuXG4gICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGUgbWF4LXdpZHRoIG9mIHRoZSBncm91cCBpcyBzZXQgcHJvcG9ydGlvbmFsIHRvIHRoZSB0b3RhbCBtaW4td2lkdGggb2YgdGhlIGlubmVyIGdyaWQuXG4gICAgICAgIC8vIEZvciBpdCB0byB3b3JrIHdlIG5lZWQgdG8gZGlyZWN0bHkgdXBkYXRlIHRoZSB3aWR0aCBvZiBBTEwgT0YgVEhFIEdST1VQUy5cbiAgICAgICAgLy8gdGhpcy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY29sdW1uLnNpemVJbmZvLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fbGFzdFdpZHRoID0gdGhpcy5faW5pdGlhbFdpZHRoID0gdGhpcy5jb2x1bW4uY29sdW1uRGVmLm5ldFdpZHRoO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hhc01vdmVkID0gdHJ1ZTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgbGV0IG5ld1dpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy5faW5pdGlhbFdpZHRoICsgZGlzdGFuY2VYKTtcblxuICAgIGlmIChuZXdXaWR0aCA+IHRoaXMuY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICBuZXdXaWR0aCA9IHRoaXMuY29sdW1uLm1heFdpZHRoO1xuICAgIH0gZWxzZSBpZiAoZGlzdGFuY2VYIDwgMCAmJiBuZXdXaWR0aCA8IHRoaXMuY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICBuZXdXaWR0aCA9IHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9sYXN0V2lkdGggIT09IG5ld1dpZHRoKSB7XG4gICAgICB0aGlzLl9sYXN0V2lkdGggPSBuZXdXaWR0aDtcbiAgICAgIHRoaXMuY29sdW1uLnVwZGF0ZVdpZHRoKGAke25ld1dpZHRofXB4YCk7XG4gICAgICB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICAgIC8vIGB0aGlzLmNvbHVtbi51cGRhdGVXaWR0aGAgd2lsbCB1cGRhdGUgdGhlIGdyaWQgd2lkdGggY2VsbCBvbmx5LCB3aGljaCB3aWxsIHRyaWdnZXIgYSByZXNpemUgdGhhdCB3aWxsIHVwZGF0ZSBhbGwgb3RoZXIgY2VsbHNcbiAgICAgIC8vIGB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKWAgd2lsbCByZS1hZGp1c3QgYWxsIG90aGVyIGdyaWQgd2lkdGggY2VsbHMsIGFuZCBpZiB0aGVpciBzaXplIGNoYW5nZXMgdGhleSB3aWxsIHRyaWdnZXIgdGhlIHJlc2l6ZSBldmVudC4uLlxuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVyIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSB1c2VyIGxpZnRzIHRoZWlyIHBvaW50ZXIgdXAsIGFmdGVyIGluaXRpYXRpbmcgYSBkcmFnLiAqL1xuICBwcml2YXRlIF9wb2ludGVyVXAgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW1vdmVTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5zdG9wRHJhZ2dpbmcodGhpcyk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgdGhpcy5ncmlkLmNvbHVtbkFwaS5yZXNpemVDb2x1bW4odGhpcy5jb2x1bW4sIHRoaXMuX2xhc3RXaWR0aCArICdweCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9pbnRlclBvc2l0aW9uT25QYWdlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IFBvaW50IHtcbiAgICBjb25zdCBwb2ludCA9IHRoaXMuX2lzVG91Y2hFdmVudChldmVudCkgPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcG9pbnQucGFnZVggLSB0aGlzLl9zY3JvbGxQb3NpdGlvbi5sZWZ0LFxuICAgICAgeTogcG9pbnQucGFnZVkgLSB0aGlzLl9zY3JvbGxQb3NpdGlvbi50b3BcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNUb3VjaEV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IGV2ZW50IGlzIFRvdWNoRXZlbnQge1xuICAgIHJldHVybiBldmVudC50eXBlLnN0YXJ0c1dpdGgoJ3RvdWNoJyk7XG4gIH1cblxuICBfaXNEcmFnZ2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5pc0RyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVTdWJzY3JpcHRpb25zKCkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcG9pbnRlclVwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG4iXX0=