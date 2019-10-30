/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { animationFrameScheduler, Subscription } from 'rxjs';
import { auditTime, take } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, Optional, NgZone, ViewEncapsulation } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { DragDropRegistry, CDK_DRAG_CONFIG } from '@angular/cdk/drag-drop';
import { PblColumn, TablePlugin } from '@pebula/ngrid';
import { toggleNativeDragInteractions } from './cdk-encapsulated-code';
import { extendGrid } from './extend-grid';
/** @type {?} */
export var PLUGIN_KEY = 'columnResize';
/**
 * Options that can be used to bind a passive event listener.
 * @type {?}
 */
var passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });
/**
 * Options that can be used to bind an active event listener.
 * @type {?}
 */
var activeEventListenerOptions = normalizePassiveListenerOptions({ passive: false });
var PblNgridDragResizeComponent = /** @class */ (function () {
    function PblNgridDragResizeComponent(element, _ngZone, _viewportRuler, _dragDropRegistry, _config, _dir) {
        var _this = this;
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
        function (event) {
            _this._initializeDragSequence(_this._rootElement, event);
        });
        /**
         * Handler that is invoked when the user moves their pointer after they've initiated a drag.
         */
        this._pointerMove = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var e_1, _a;
            /** @type {?} */
            var pointerPosition = _this._getPointerPositionOnPage(event);
            /** @type {?} */
            var distanceX = pointerPosition.x - _this._pickupPositionOnPage.x;
            /** @type {?} */
            var distanceY = pointerPosition.y - _this._pickupPositionOnPage.y;
            if (!_this._hasStartedDragging) {
                // Only start dragging after the user has moved more than the minimum distance in either
                // direction. Note that this is preferable over doing something like `skip(minimumDistance)`
                // in the `pointerMove` subscription, because we're not guaranteed to have one move event
                // per pixel of movement (e.g. if the user moves their pointer quickly).
                if (Math.abs(distanceX) + Math.abs(distanceY) >= _this._config.dragStartThreshold) {
                    _this._hasStartedDragging = true;
                    // It will be a good thing if we turned of the header's resize observer to boost performance
                    // However, because we relay on the total table minimum width updates to relatively even out the columns it will not work.
                    // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                    // This is because the max-width of the group is set proportional to the total min-width of the inner table.
                    // For it to work we need to directly update the width of ALL OF THE GROUPS.
                    // this.column.columnDef.isDragging = true;
                    _this.column.sizeInfo.updateSize();
                    _this._lastWidth = _this._initialWidth = _this.column.columnDef.netWidth;
                    _this.cache = _this.column.columnDef.queryCellElements('table', 'header', 'footer');
                }
                return;
            }
            _this._hasMoved = true;
            event.preventDefault();
            event.stopPropagation();
            /** @type {?} */
            var newWidth = Math.max(0, _this._initialWidth + distanceX);
            if (newWidth > _this.column.maxWidth) {
                newWidth = _this.column.maxWidth;
            }
            else if (distanceX < 0 && newWidth < _this.column.minWidth) {
                newWidth = _this.column.minWidth;
            }
            if (_this._lastWidth !== newWidth) {
                _this._lastWidth = newWidth;
                _this.column.width = newWidth + 'px';
                _this.table.resetColumnsWidth();
                try {
                    for (var _b = tslib_1.__values(_this.cache), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var el = _c.value;
                        _this.column.columnDef.applyWidth(el);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
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
        function () {
            if (!_this._isDragging()) {
                return;
            }
            _this._removeSubscriptions();
            _this._dragDropRegistry.stopDragging(_this);
            if (!_this._hasStartedDragging) {
                return;
            }
            // this.column.columnDef.isDragging = false;
            _this.table.columnApi.resizeColumn(_this.column, _this._lastWidth + 'px');
            // cleanup
            _this.cache = undefined;
        });
        _dragDropRegistry.registerDragItem(this);
    }
    Object.defineProperty(PblNgridDragResizeComponent.prototype, "context", {
        // tslint:disable-next-line:no-input-rename
        set: 
        // tslint:disable-next-line:no-input-rename
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                var col = value.col, table = value.table;
                if (col && col instanceof PblColumn) {
                    this.column = col;
                    this.table = table;
                    return;
                }
            }
            this.column = this.table = undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // We need to wait for the zone to stabilize, in order for the reference
        // element to be in the proper place in the DOM. This is mostly relevant
        // for draggable elements inside portals since they get stamped out in
        // their original DOM position and then they get transferred to the portal.
        this._rootElementInitSubscription = this._ngZone.onStable.asObservable().pipe(take(1)).subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var rootElement = _this._rootElement = _this._getRootElement();
            /** @type {?} */
            var cell = rootElement.parentElement;
            cell.classList.add('pbl-ngrid-column-resize');
            rootElement.addEventListener('mousedown', _this._pointerDown, activeEventListenerOptions);
            rootElement.addEventListener('touchstart', _this._pointerDown, passiveEventListenerOptions);
            toggleNativeDragInteractions(rootElement, false);
        }));
    };
    /**
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._rootElement) {
            this._rootElement.removeEventListener('mousedown', this._pointerDown, activeEventListenerOptions);
            this._rootElement.removeEventListener('touchstart', this._pointerDown, passiveEventListenerOptions);
        }
        this._rootElementInitSubscription.unsubscribe();
        this._dragDropRegistry.removeDragItem(this);
        this._removeSubscriptions();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype.onDoubleClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.table.columnApi.autoSizeColumn(this.column);
    };
    /**
   * Sets up the different variables and subscriptions
   * that will be necessary for the dragging sequence.
   * @param referenceElement Element that started the drag sequence.
   * @param event Browser event object that started the sequence.
   */
    /**
     * Sets up the different variables and subscriptions
     * that will be necessary for the dragging sequence.
     * @private
     * @param {?} referenceElement Element that started the drag sequence.
     * @param {?} event Browser event object that started the sequence.
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype._initializeDragSequence = /**
     * Sets up the different variables and subscriptions
     * that will be necessary for the dragging sequence.
     * @private
     * @param {?} referenceElement Element that started the drag sequence.
     * @param {?} event Browser event object that started the sequence.
     * @return {?}
     */
    function (referenceElement, event) {
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
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype._getPointerPositionOnPage = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var point = this._isTouchEvent(event) ? event.touches[0] : event;
        return {
            x: point.pageX - this._scrollPosition.left,
            y: point.pageY - this._scrollPosition.top
        };
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype._isTouchEvent = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return event.type.startsWith('touch');
    };
    /**
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype._isDragging = /**
     * @return {?}
     */
    function () {
        return this._dragDropRegistry.isDragging(this);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype._getRootElement = /**
     * @private
     * @return {?}
     */
    function () {
        return this.element.nativeElement;
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridDragResizeComponent.prototype._removeSubscriptions = /**
     * @private
     * @return {?}
     */
    function () {
        this._pointerMoveSubscription.unsubscribe();
        this._pointerUpSubscription.unsubscribe();
    };
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
    PblNgridDragResizeComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: ViewportRuler },
        { type: DragDropRegistry },
        { type: undefined, decorators: [{ type: Inject, args: [CDK_DRAG_CONFIG,] }] },
        { type: Directionality, decorators: [{ type: Optional }] }
    ]; };
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
    return PblNgridDragResizeComponent;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFhLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzSyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBaUIsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUYsT0FBTyxFQUFxQixTQUFTLEVBQTJCLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVEzQyxNQUFNLEtBQU8sVUFBVSxHQUFtQixjQUFjOzs7OztJQUdsRCwyQkFBMkIsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7Ozs7SUFHOUUsMEJBQTBCLEdBQUcsK0JBQStCLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUM7O0lBb0Rs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QixxREFBcUM7Ozs7O0lBQ3JDLHdEQUE2RTs7Ozs7SUFDN0UsOENBQXVEOzs7OztJQUN2RCwyQ0FBd0M7Ozs7O0FBcUt0RCxvQkFHQzs7O0lBRkMsa0JBQVU7O0lBQ1Ysa0JBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwsIE9uRGVzdHJveSwgTmdab25lLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2RrRHJhZ0NvbmZpZywgRHJhZ0Ryb3BSZWdpc3RyeSwgQ0RLX0RSQUdfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxDb2x1bW4sIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBUYWJsZVBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgdG9nZ2xlTmF0aXZlRHJhZ0ludGVyYWN0aW9ucyB9IGZyb20gJy4vY2RrLWVuY2Fwc3VsYXRlZC1jb2RlJztcbmltcG9ydCB7IGV4dGVuZEdyaWQgfSBmcm9tICcuL2V4dGVuZC1ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNvbHVtblJlc2l6ZT86IFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudDtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2NvbHVtblJlc2l6ZScgPSAnY29sdW1uUmVzaXplJztcblxuLyoqIE9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBiaW5kIGEgcGFzc2l2ZSBldmVudCBsaXN0ZW5lci4gKi9cbmNvbnN0IHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IHRydWV9KTtcblxuLyoqIE9wdGlvbnMgdGhhdCBjYW4gYmUgdXNlZCB0byBiaW5kIGFuIGFjdGl2ZSBldmVudCBsaXN0ZW5lci4gKi9cbmNvbnN0IGFjdGl2ZUV2ZW50TGlzdGVuZXJPcHRpb25zID0gbm9ybWFsaXplUGFzc2l2ZUxpc3RlbmVyT3B0aW9ucyh7cGFzc2l2ZTogZmFsc2V9KTtcblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIHJ1bk9uY2U6IGV4dGVuZEdyaWQgfSlcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1kcmFnLXJlc2l6ZScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLWNvbHVtbi1yZXNpemVyJyxcbiAgICAnW3N0eWxlLndpZHRoLnB4XSc6ICdncmFiQXJlYVdpZHRoJyxcbiAgfSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbHVtbi1yZXNpemUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuc2NzcycgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoKSBzZXQgY29udGV4dCh2YWx1ZTogUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55Pikge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgY29uc3QgeyBjb2wsIHRhYmxlIH0gPSB2YWx1ZTtcbiAgICAgIGlmIChjb2wgJiYgY29sIGluc3RhbmNlb2YgUGJsQ29sdW1uKSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sO1xuICAgICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb2x1bW4gPSB0aGlzLnRhYmxlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhcmVhIChpbiBwaXhlbHMpIGluIHdoaWNoIHRoZSBoYW5kbGUgY2FuIGJlIGdyYWJiZWQgYW5kIHJlc2l6ZSB0aGUgY2VsbC5cbiAgICogRGVmYXVsdDogNlxuICAgKi9cbiAgQElucHV0KCkgZ3JhYkFyZWFXaWR0aCA9IDY7XG5cbiAgY29sdW1uOiBQYmxDb2x1bW47XG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuXG4gIF9oYXNTdGFydGVkRHJhZ2dpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hhc01vdmVkOiBib29sZWFuO1xuICBwcml2YXRlIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BvaW50ZXJNb3ZlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wb2ludGVyVXBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3Njcm9sbFBvc2l0aW9uOiB7dG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcn07XG4gIHByaXZhdGUgX3BpY2t1cFBvc2l0aW9uT25QYWdlOiBQb2ludDtcbiAgcHJpdmF0ZSBfaW5pdGlhbFdpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX2xhc3RXaWR0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgY2FjaGU6IEhUTUxFbGVtZW50W107XG5cbiAgcHJpdmF0ZSBfcm9vdEVsZW1lbnRJbml0U3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3ZpZXdwb3J0UnVsZXI6IFZpZXdwb3J0UnVsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RyYWdEcm9wUmVnaXN0cnk6IERyYWdEcm9wUmVnaXN0cnk8UGJsTmdyaWREcmFnUmVzaXplQ29tcG9uZW50LCBhbnk+LFxuICAgICAgICAgICAgICBASW5qZWN0KENES19EUkFHX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBDZGtEcmFnQ29uZmlnLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5KSB7XG4gICAgX2RyYWdEcm9wUmVnaXN0cnkucmVnaXN0ZXJEcmFnSXRlbSh0aGlzKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBXZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSB6b25lIHRvIHN0YWJpbGl6ZSwgaW4gb3JkZXIgZm9yIHRoZSByZWZlcmVuY2VcbiAgICAvLyBlbGVtZW50IHRvIGJlIGluIHRoZSBwcm9wZXIgcGxhY2UgaW4gdGhlIERPTS4gVGhpcyBpcyBtb3N0bHkgcmVsZXZhbnRcbiAgICAvLyBmb3IgZHJhZ2dhYmxlIGVsZW1lbnRzIGluc2lkZSBwb3J0YWxzIHNpbmNlIHRoZXkgZ2V0IHN0YW1wZWQgb3V0IGluXG4gICAgLy8gdGhlaXIgb3JpZ2luYWwgRE9NIHBvc2l0aW9uIGFuZCB0aGVuIHRoZXkgZ2V0IHRyYW5zZmVycmVkIHRvIHRoZSBwb3J0YWwuXG4gICAgdGhpcy5fcm9vdEVsZW1lbnRJbml0U3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gdGhpcy5fcm9vdEVsZW1lbnQgPSB0aGlzLl9nZXRSb290RWxlbWVudCgpO1xuICAgICAgY29uc3QgY2VsbCA9IHJvb3RFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1jb2x1bW4tcmVzaXplJyk7XG4gICAgICByb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9wb2ludGVyRG93biwgYWN0aXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX3BvaW50ZXJEb3duLCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMpO1xuICAgICAgdG9nZ2xlTmF0aXZlRHJhZ0ludGVyYWN0aW9ucyhyb290RWxlbWVudCAsIGZhbHNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgdGhpcy5fcm9vdEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fcG9pbnRlckRvd24sIGFjdGl2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9wb2ludGVyRG93biwgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICB9XG4gICAgdGhpcy5fcm9vdEVsZW1lbnRJbml0U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5yZW1vdmVEcmFnSXRlbSh0aGlzKTtcbiAgICB0aGlzLl9yZW1vdmVTdWJzY3JpcHRpb25zKCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkYmxjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uRG91YmxlQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5hdXRvU2l6ZUNvbHVtbih0aGlzLmNvbHVtbik7XG4gIH1cblxuICBfcG9pbnRlckRvd24gPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZURyYWdTZXF1ZW5jZSh0aGlzLl9yb290RWxlbWVudCwgZXZlbnQpO1xuICB9XG5cbiAgICAvKipcbiAgICogU2V0cyB1cCB0aGUgZGlmZmVyZW50IHZhcmlhYmxlcyBhbmQgc3Vic2NyaXB0aW9uc1xuICAgKiB0aGF0IHdpbGwgYmUgbmVjZXNzYXJ5IGZvciB0aGUgZHJhZ2dpbmcgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSByZWZlcmVuY2VFbGVtZW50IEVsZW1lbnQgdGhhdCBzdGFydGVkIHRoZSBkcmFnIHNlcXVlbmNlLlxuICAgKiBAcGFyYW0gZXZlbnQgQnJvd3NlciBldmVudCBvYmplY3QgdGhhdCBzdGFydGVkIHRoZSBzZXF1ZW5jZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVEcmFnU2VxdWVuY2UocmVmZXJlbmNlRWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIC8vIEFsd2F5cyBzdG9wIHByb3BhZ2F0aW9uIGZvciB0aGUgZXZlbnQgdGhhdCBpbml0aWFsaXplc1xuICAgIC8vIHRoZSBkcmFnZ2luZyBzZXF1ZW5jZSwgaW4gb3JkZXIgdG8gcHJldmVudCBpdCBmcm9tIHBvdGVudGlhbGx5XG4gICAgLy8gc3RhcnRpbmcgYW5vdGhlciBzZXF1ZW5jZSBmb3IgYSBkcmFnZ2FibGUgcGFyZW50IHNvbWV3aGVyZSB1cCB0aGUgRE9NIHRyZWUuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAvLyBBYm9ydCBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGRyYWdnaW5nIG9yIGlzIHVzaW5nIGEgbW91c2UgYnV0dG9uIG90aGVyIHRoYW4gdGhlIHByaW1hcnkgb25lLlxuICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKCkgfHwgKCF0aGlzLl9pc1RvdWNoRXZlbnQoZXZlbnQpICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYXNTdGFydGVkRHJhZ2dpbmcgPSB0aGlzLl9oYXNNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5wb2ludGVyTW92ZVxuICAgICAgLnBpcGUoYXVkaXRUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSlcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fcG9pbnRlck1vdmUpO1xuICAgIHRoaXMuX3BvaW50ZXJVcFN1YnNjcmlwdGlvbiA9IHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkucG9pbnRlclVwLnN1YnNjcmliZSh0aGlzLl9wb2ludGVyVXApO1xuICAgIHRoaXMuX3Njcm9sbFBvc2l0aW9uID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFNjcm9sbFBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLl9waWNrdXBQb3NpdGlvbk9uUGFnZSA9IHRoaXMuX2dldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudCk7XG4gICAgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5zdGFydERyYWdnaW5nKHRoaXMsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVyIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSB1c2VyIG1vdmVzIHRoZWlyIHBvaW50ZXIgYWZ0ZXIgdGhleSd2ZSBpbml0aWF0ZWQgYSBkcmFnLiAqL1xuICBwcml2YXRlIF9wb2ludGVyTW92ZSA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICBjb25zdCBwb2ludGVyUG9zaXRpb24gPSB0aGlzLl9nZXRQb2ludGVyUG9zaXRpb25PblBhZ2UoZXZlbnQpO1xuICAgIGNvbnN0IGRpc3RhbmNlWCA9IHBvaW50ZXJQb3NpdGlvbi54IC0gdGhpcy5fcGlja3VwUG9zaXRpb25PblBhZ2UueDtcbiAgICBjb25zdCBkaXN0YW5jZVkgPSBwb2ludGVyUG9zaXRpb24ueSAtIHRoaXMuX3BpY2t1cFBvc2l0aW9uT25QYWdlLnk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgLy8gT25seSBzdGFydCBkcmFnZ2luZyBhZnRlciB0aGUgdXNlciBoYXMgbW92ZWQgbW9yZSB0aGFuIHRoZSBtaW5pbXVtIGRpc3RhbmNlIGluIGVpdGhlclxuICAgICAgLy8gZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhpcyBpcyBwcmVmZXJhYmxlIG92ZXIgZG9pbmcgc29tZXRoaW5nIGxpa2UgYHNraXAobWluaW11bURpc3RhbmNlKWBcbiAgICAgIC8vIGluIHRoZSBgcG9pbnRlck1vdmVgIHN1YnNjcmlwdGlvbiwgYmVjYXVzZSB3ZSdyZSBub3QgZ3VhcmFudGVlZCB0byBoYXZlIG9uZSBtb3ZlIGV2ZW50XG4gICAgICAvLyBwZXIgcGl4ZWwgb2YgbW92ZW1lbnQgKGUuZy4gaWYgdGhlIHVzZXIgbW92ZXMgdGhlaXIgcG9pbnRlciBxdWlja2x5KS5cbiAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVgpICsgTWF0aC5hYnMoZGlzdGFuY2VZKSA+PSB0aGlzLl9jb25maWcuZHJhZ1N0YXJ0VGhyZXNob2xkKSB7XG4gICAgICAgIHRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgLy8gSXQgd2lsbCBiZSBhIGdvb2QgdGhpbmcgaWYgd2UgdHVybmVkIG9mIHRoZSBoZWFkZXIncyByZXNpemUgb2JzZXJ2ZXIgdG8gYm9vc3QgcGVyZm9ybWFuY2VcbiAgICAgICAgLy8gSG93ZXZlciwgYmVjYXVzZSB3ZSByZWxheSBvbiB0aGUgdG90YWwgdGFibGUgbWluaW11bSB3aWR0aCB1cGRhdGVzIHRvIHJlbGF0aXZlbHkgZXZlbiBvdXQgdGhlIGNvbHVtbnMgaXQgd2lsbCBub3Qgd29yay5cbiAgICAgICAgLy8gR3JvdXAgY2VsbHMgd2lsbCBub3QgY292ZXIgYWxsIG9mIHRoZSBjaGlsZHJlbiwgd2hlbiB3ZSBlbmxhcmdlIHRoZSB3aWR0aCBvZiBhIGNoaWxkIGluIHRoZSBncm91cC5cbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZSBtYXgtd2lkdGggb2YgdGhlIGdyb3VwIGlzIHNldCBwcm9wb3J0aW9uYWwgdG8gdGhlIHRvdGFsIG1pbi13aWR0aCBvZiB0aGUgaW5uZXIgdGFibGUuXG4gICAgICAgIC8vIEZvciBpdCB0byB3b3JrIHdlIG5lZWQgdG8gZGlyZWN0bHkgdXBkYXRlIHRoZSB3aWR0aCBvZiBBTEwgT0YgVEhFIEdST1VQUy5cbiAgICAgICAgLy8gdGhpcy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuY29sdW1uLnNpemVJbmZvLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgdGhpcy5fbGFzdFdpZHRoID0gdGhpcy5faW5pdGlhbFdpZHRoID0gdGhpcy5jb2x1bW4uY29sdW1uRGVmLm5ldFdpZHRoO1xuICAgICAgICB0aGlzLmNhY2hlID0gdGhpcy5jb2x1bW4uY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCd0YWJsZScsICdoZWFkZXInLCAnZm9vdGVyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faGFzTW92ZWQgPSB0cnVlO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICBsZXQgbmV3V2lkdGggPSBNYXRoLm1heCgwLCB0aGlzLl9pbml0aWFsV2lkdGggKyBkaXN0YW5jZVgpO1xuXG4gICAgaWYgKG5ld1dpZHRoID4gdGhpcy5jb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgIG5ld1dpZHRoID0gdGhpcy5jb2x1bW4ubWF4V2lkdGg7XG4gICAgfSBlbHNlIGlmIChkaXN0YW5jZVggPCAwICYmIG5ld1dpZHRoIDwgdGhpcy5jb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgIG5ld1dpZHRoID0gdGhpcy5jb2x1bW4ubWluV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2xhc3RXaWR0aCAhPT0gbmV3V2lkdGgpIHtcbiAgICAgIHRoaXMuX2xhc3RXaWR0aCA9IG5ld1dpZHRoO1xuICAgICAgdGhpcy5jb2x1bW4ud2lkdGggPSBuZXdXaWR0aCArICdweCc7XG4gICAgICB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG5cbiAgICAgIGZvciAoY29uc3QgZWwgb2YgdGhpcy5jYWNoZSkge1xuICAgICAgICB0aGlzLmNvbHVtbi5jb2x1bW5EZWYuYXBwbHlXaWR0aChlbClcbiAgICAgIH1cbiAgICAgIC8vIHRoZSBhYm92ZSB3aWxsIGNoYW5nZSB0aGUgc2l6ZSBvZiBvbiBjb2x1bW4gQU5EIGJlY2F1c2Ugd2UgZGlkbid0IGRpc2FibGUgdGhlIHJlc2l6ZSBvYnNlcnZlciBpdCB3aWxsIHBvcCBhbiBldmVudC5cbiAgICAgIC8vIGlmIHRoZXJlIGFyZSBncm91cHMgaXQgd2lsbCBmaXJlIHRhYmxlLnJlc2l6ZUNvbHVtbnMoKTsgd2hpY2ggd2lsbCByZWNhbGN1bGF0ZSB0aGUgZ3JvdXBzLi4uXG4gICAgfVxuICB9XG5cbiAgLyoqIEhhbmRsZXIgdGhhdCBpcyBpbnZva2VkIHdoZW4gdGhlIHVzZXIgbGlmdHMgdGhlaXIgcG9pbnRlciB1cCwgYWZ0ZXIgaW5pdGlhdGluZyBhIGRyYWcuICovXG4gIHByaXZhdGUgX3BvaW50ZXJVcCA9ICgpID0+IHtcbiAgICBpZiAoIXRoaXMuX2lzRHJhZ2dpbmcoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3JlbW92ZVN1YnNjcmlwdGlvbnMoKTtcbiAgICB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnN0b3BEcmFnZ2luZyh0aGlzKTtcblxuICAgIGlmICghdGhpcy5faGFzU3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdGhpcy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5yZXNpemVDb2x1bW4odGhpcy5jb2x1bW4sIHRoaXMuX2xhc3RXaWR0aCArICdweCcpO1xuXG4gICAgLy8gY2xlYW51cFxuICAgIHRoaXMuY2FjaGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQb2ludGVyUG9zaXRpb25PblBhZ2UoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogUG9pbnQge1xuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5faXNUb3VjaEV2ZW50KGV2ZW50KSA/IGV2ZW50LnRvdWNoZXNbMF0gOiBldmVudDtcblxuICAgIHJldHVybiB7XG4gICAgICB4OiBwb2ludC5wYWdlWCAtIHRoaXMuX3Njcm9sbFBvc2l0aW9uLmxlZnQsXG4gICAgICB5OiBwb2ludC5wYWdlWSAtIHRoaXMuX3Njcm9sbFBvc2l0aW9uLnRvcFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9pc1RvdWNoRXZlbnQoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KTogZXZlbnQgaXMgVG91Y2hFdmVudCB7XG4gICAgcmV0dXJuIGV2ZW50LnR5cGUuc3RhcnRzV2l0aCgndG91Y2gnKTtcbiAgfVxuXG4gIF9pc0RyYWdnaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LmlzRHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG4gIHByaXZhdGUgX3JlbW92ZVN1YnNjcmlwdGlvbnMoKSB7XG4gICAgdGhpcy5fcG9pbnRlck1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9wb2ludGVyVXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbn1cbiJdfQ==