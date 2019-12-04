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
                    // However, because we relay on the total grid minimum width updates to relatively even out the columns it will not work.
                    // Group cells will not cover all of the children, when we enlarge the width of a child in the group.
                    // This is because the max-width of the group is set proportional to the total min-width of the inner grid.
                    // For it to work we need to directly update the width of ALL OF THE GROUPS.
                    // this.column.columnDef.isDragging = true;
                    _this.column.sizeInfo.updateSize();
                    _this._lastWidth = _this._initialWidth = _this.column.columnDef.netWidth;
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
                _this.column.updateWidth(newWidth + "px");
                _this.grid.resetColumnsWidth();
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
            _this.grid.columnApi.resizeColumn(_this.column, _this._lastWidth + 'px');
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
                var col = value.col, grid = value.grid;
                if (isPblColumn(col)) {
                    this.column = col;
                    this.grid = grid;
                    return;
                }
            }
            this.column = this.grid = undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridDragResizeComponent.prototype, "table", {
        /** @deprecated use grid instead */
        get: /**
         * @deprecated use grid instead
         * @return {?}
         */
        function () { return this.grid; },
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
        this.grid.columnApi.autoSizeColumn(this.column);
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
    PblNgridDragResizeComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone },
        { type: ViewportRuler },
        { type: DragDropRegistry },
        { type: undefined },
        { type: Directionality }
    ]; };
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
        NgridPlugin({ id: PLUGIN_KEY, runOnce: extendGrid }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUYsT0FBTyxFQUF5RCxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDLE1BQU0sS0FBTyxVQUFVLEdBQW1CLGNBQWM7Ozs7O0lBR2xELDJCQUEyQixHQUFHLCtCQUErQixDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDOzs7OztJQUc5RSwwQkFBMEIsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9B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IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgT25EZXN0cm95LFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2RrRHJhZ0NvbmZpZywgRHJhZ0Ryb3BSZWdpc3RyeSwgQ0RLX0RSQUdfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxDb2x1bW4sIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBOZ3JpZFBsdWdpbiwgaXNQYmxDb2x1bW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IHRvZ2dsZU5hdGl2ZURyYWdJbnRlcmFjdGlvbnMgfSBmcm9tICcuL2Nkay1lbmNhcHN1bGF0ZWQtY29kZSc7XG5pbXBvcnQgeyBleHRlbmRHcmlkIH0gZnJvbSAnLi9leHRlbmQtZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjb2x1bW5SZXNpemU/OiBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjb2x1bW5SZXNpemUnID0gJ2NvbHVtblJlc2l6ZSc7XG5cbi8qKiBPcHRpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gYmluZCBhIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKiBPcHRpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gYmluZCBhbiBhY3RpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBhY3RpdmVFdmVudExpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IGZhbHNlfSk7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBydW5PbmNlOiBleHRlbmRHcmlkIH0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtZHJhZy1yZXNpemUnLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1jb2x1bW4tcmVzaXplcicsXG4gICAgJ1tzdHlsZS53aWR0aC5weF0nOiAnZ3JhYkFyZWFXaWR0aCcsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiAnLi9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL2NvbHVtbi1yZXNpemUuY29tcG9uZW50LnNjc3MnIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCkgc2V0IGNvbnRleHQodmFsdWU6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IHsgY29sLCBncmlkIH0gPSB2YWx1ZTtcbiAgICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICAgIHRoaXMuY29sdW1uID0gY29sO1xuICAgICAgICB0aGlzLmdyaWQgPSBncmlkO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29sdW1uID0gdGhpcy5ncmlkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhcmVhIChpbiBwaXhlbHMpIGluIHdoaWNoIHRoZSBoYW5kbGUgY2FuIGJlIGdyYWJiZWQgYW5kIHJlc2l6ZSB0aGUgY2VsbC5cbiAgICogRGVmYXVsdDogNlxuICAgKi9cbiAgQElucHV0KCkgZ3JhYkFyZWFXaWR0aCA9IDY7XG5cbiAgY29sdW1uOiBQYmxDb2x1bW47XG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIGdldCB0YWJsZSgpOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IHsgcmV0dXJuIHRoaXMuZ3JpZDsgfVxuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuXG4gIF9oYXNTdGFydGVkRHJhZ2dpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hhc01vdmVkOiBib29sZWFuO1xuICBwcml2YXRlIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3BvaW50ZXJNb3ZlU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wb2ludGVyVXBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3Njcm9sbFBvc2l0aW9uOiB7dG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcn07XG4gIHByaXZhdGUgX3BpY2t1cFBvc2l0aW9uT25QYWdlOiBQb2ludDtcbiAgcHJpdmF0ZSBfaW5pdGlhbFdpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX2xhc3RXaWR0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50SW5pdFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9kcmFnRHJvcFJlZ2lzdHJ5OiBEcmFnRHJvcFJlZ2lzdHJ5PFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCwgYW55PixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJBR19DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogQ2RrRHJhZ0NvbmZpZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSkge1xuICAgIF9kcmFnRHJvcFJlZ2lzdHJ5LnJlZ2lzdGVyRHJhZ0l0ZW0odGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byB3YWl0IGZvciB0aGUgem9uZSB0byBzdGFiaWxpemUsIGluIG9yZGVyIGZvciB0aGUgcmVmZXJlbmNlXG4gICAgLy8gZWxlbWVudCB0byBiZSBpbiB0aGUgcHJvcGVyIHBsYWNlIGluIHRoZSBET00uIFRoaXMgaXMgbW9zdGx5IHJlbGV2YW50XG4gICAgLy8gZm9yIGRyYWdnYWJsZSBlbGVtZW50cyBpbnNpZGUgcG9ydGFscyBzaW5jZSB0aGV5IGdldCBzdGFtcGVkIG91dCBpblxuICAgIC8vIHRoZWlyIG9yaWdpbmFsIERPTSBwb3NpdGlvbiBhbmQgdGhlbiB0aGV5IGdldCB0cmFuc2ZlcnJlZCB0byB0aGUgcG9ydGFsLlxuICAgIHRoaXMuX3Jvb3RFbGVtZW50SW5pdFN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCByb290RWxlbWVudCA9IHRoaXMuX3Jvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgIGNvbnN0IGNlbGwgPSByb290RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY29sdW1uLXJlc2l6ZScpO1xuICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fcG9pbnRlckRvd24sIGFjdGl2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIHJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9wb2ludGVyRG93biwgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIHRvZ2dsZU5hdGl2ZURyYWdJbnRlcmFjdGlvbnMocm9vdEVsZW1lbnQgLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX3BvaW50ZXJEb3duLCBhY3RpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gICAgICB0aGlzLl9yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fcG9pbnRlckRvd24sIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMuX3Jvb3RFbGVtZW50SW5pdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkucmVtb3ZlRHJhZ0l0ZW0odGhpcyk7XG4gICAgdGhpcy5fcmVtb3ZlU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snLCBbJyRldmVudCddKVxuICBvbkRvdWJsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5ncmlkLmNvbHVtbkFwaS5hdXRvU2l6ZUNvbHVtbih0aGlzLmNvbHVtbik7XG4gIH1cblxuICBfcG9pbnRlckRvd24gPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgdGhpcy5faW5pdGlhbGl6ZURyYWdTZXF1ZW5jZSh0aGlzLl9yb290RWxlbWVudCwgZXZlbnQpO1xuICB9XG5cbiAgICAvKipcbiAgICogU2V0cyB1cCB0aGUgZGlmZmVyZW50IHZhcmlhYmxlcyBhbmQgc3Vic2NyaXB0aW9uc1xuICAgKiB0aGF0IHdpbGwgYmUgbmVjZXNzYXJ5IGZvciB0aGUgZHJhZ2dpbmcgc2VxdWVuY2UuXG4gICAqIEBwYXJhbSByZWZlcmVuY2VFbGVtZW50IEVsZW1lbnQgdGhhdCBzdGFydGVkIHRoZSBkcmFnIHNlcXVlbmNlLlxuICAgKiBAcGFyYW0gZXZlbnQgQnJvd3NlciBldmVudCBvYmplY3QgdGhhdCBzdGFydGVkIHRoZSBzZXF1ZW5jZS5cbiAgICovXG4gIHByaXZhdGUgX2luaXRpYWxpemVEcmFnU2VxdWVuY2UocmVmZXJlbmNlRWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkge1xuICAgIC8vIEFsd2F5cyBzdG9wIHByb3BhZ2F0aW9uIGZvciB0aGUgZXZlbnQgdGhhdCBpbml0aWFsaXplc1xuICAgIC8vIHRoZSBkcmFnZ2luZyBzZXF1ZW5jZSwgaW4gb3JkZXIgdG8gcHJldmVudCBpdCBmcm9tIHBvdGVudGlhbGx5XG4gICAgLy8gc3RhcnRpbmcgYW5vdGhlciBzZXF1ZW5jZSBmb3IgYSBkcmFnZ2FibGUgcGFyZW50IHNvbWV3aGVyZSB1cCB0aGUgRE9NIHRyZWUuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAvLyBBYm9ydCBpZiB0aGUgdXNlciBpcyBhbHJlYWR5IGRyYWdnaW5nIG9yIGlzIHVzaW5nIGEgbW91c2UgYnV0dG9uIG90aGVyIHRoYW4gdGhlIHByaW1hcnkgb25lLlxuICAgIGlmICh0aGlzLl9pc0RyYWdnaW5nKCkgfHwgKCF0aGlzLl9pc1RvdWNoRXZlbnQoZXZlbnQpICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYXNTdGFydGVkRHJhZ2dpbmcgPSB0aGlzLl9oYXNNb3ZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlU3Vic2NyaXB0aW9uID0gdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5wb2ludGVyTW92ZVxuICAgICAgLnBpcGUoYXVkaXRUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSlcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fcG9pbnRlck1vdmUpO1xuICAgIHRoaXMuX3BvaW50ZXJVcFN1YnNjcmlwdGlvbiA9IHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkucG9pbnRlclVwLnN1YnNjcmliZSh0aGlzLl9wb2ludGVyVXApO1xuICAgIHRoaXMuX3Njcm9sbFBvc2l0aW9uID0gdGhpcy5fdmlld3BvcnRSdWxlci5nZXRWaWV3cG9ydFNjcm9sbFBvc2l0aW9uKCk7XG5cbiAgICB0aGlzLl9waWNrdXBQb3NpdGlvbk9uUGFnZSA9IHRoaXMuX2dldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudCk7XG4gICAgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5zdGFydERyYWdnaW5nKHRoaXMsIGV2ZW50KTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVyIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSB1c2VyIG1vdmVzIHRoZWlyIHBvaW50ZXIgYWZ0ZXIgdGhleSd2ZSBpbml0aWF0ZWQgYSBkcmFnLiAqL1xuICBwcml2YXRlIF9wb2ludGVyTW92ZSA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICBjb25zdCBwb2ludGVyUG9zaXRpb24gPSB0aGlzLl9nZXRQb2ludGVyUG9zaXRpb25PblBhZ2UoZXZlbnQpO1xuICAgIGNvbnN0IGRpc3RhbmNlWCA9IHBvaW50ZXJQb3NpdGlvbi54IC0gdGhpcy5fcGlja3VwUG9zaXRpb25PblBhZ2UueDtcbiAgICBjb25zdCBkaXN0YW5jZVkgPSBwb2ludGVyUG9zaXRpb24ueSAtIHRoaXMuX3BpY2t1cFBvc2l0aW9uT25QYWdlLnk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgLy8gT25seSBzdGFydCBkcmFnZ2luZyBhZnRlciB0aGUgdXNlciBoYXMgbW92ZWQgbW9yZSB0aGFuIHRoZSBtaW5pbXVtIGRpc3RhbmNlIGluIGVpdGhlclxuICAgICAgLy8gZGlyZWN0aW9uLiBOb3RlIHRoYXQgdGhpcyBpcyBwcmVmZXJhYmxlIG92ZXIgZG9pbmcgc29tZXRoaW5nIGxpa2UgYHNraXAobWluaW11bURpc3RhbmNlKWBcbiAgICAgIC8vIGluIHRoZSBgcG9pbnRlck1vdmVgIHN1YnNjcmlwdGlvbiwgYmVjYXVzZSB3ZSdyZSBub3QgZ3VhcmFudGVlZCB0byBoYXZlIG9uZSBtb3ZlIGV2ZW50XG4gICAgICAvLyBwZXIgcGl4ZWwgb2YgbW92ZW1lbnQgKGUuZy4gaWYgdGhlIHVzZXIgbW92ZXMgdGhlaXIgcG9pbnRlciBxdWlja2x5KS5cbiAgICAgIGlmIChNYXRoLmFicyhkaXN0YW5jZVgpICsgTWF0aC5hYnMoZGlzdGFuY2VZKSA+PSB0aGlzLl9jb25maWcuZHJhZ1N0YXJ0VGhyZXNob2xkKSB7XG4gICAgICAgIHRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZyA9IHRydWU7XG5cbiAgICAgICAgLy8gSXQgd2lsbCBiZSBhIGdvb2QgdGhpbmcgaWYgd2UgdHVybmVkIG9mIHRoZSBoZWFkZXIncyByZXNpemUgb2JzZXJ2ZXIgdG8gYm9vc3QgcGVyZm9ybWFuY2VcbiAgICAgICAgLy8gSG93ZXZlciwgYmVjYXVzZSB3ZSByZWxheSBvbiB0aGUgdG90YWwgZ3JpZCBtaW5pbXVtIHdpZHRoIHVwZGF0ZXMgdG8gcmVsYXRpdmVseSBldmVuIG91dCB0aGUgY29sdW1ucyBpdCB3aWxsIG5vdCB3b3JrLlxuICAgICAgICAvLyBHcm91cCBjZWxscyB3aWxsIG5vdCBjb3ZlciBhbGwgb2YgdGhlIGNoaWxkcmVuLCB3aGVuIHdlIGVubGFyZ2UgdGhlIHdpZHRoIG9mIGEgY2hpbGQgaW4gdGhlIGdyb3VwLlxuICAgICAgICAvLyBUaGlzIGlzIGJlY2F1c2UgdGhlIG1heC13aWR0aCBvZiB0aGUgZ3JvdXAgaXMgc2V0IHByb3BvcnRpb25hbCB0byB0aGUgdG90YWwgbWluLXdpZHRoIG9mIHRoZSBpbm5lciBncmlkLlxuICAgICAgICAvLyBGb3IgaXQgdG8gd29yayB3ZSBuZWVkIHRvIGRpcmVjdGx5IHVwZGF0ZSB0aGUgd2lkdGggb2YgQUxMIE9GIFRIRSBHUk9VUFMuXG4gICAgICAgIC8vIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNvbHVtbi5zaXplSW5mby51cGRhdGVTaXplKCk7XG4gICAgICAgIHRoaXMuX2xhc3RXaWR0aCA9IHRoaXMuX2luaXRpYWxXaWR0aCA9IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5uZXRXaWR0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9oYXNNb3ZlZCA9IHRydWU7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGxldCBuZXdXaWR0aCA9IE1hdGgubWF4KDAsIHRoaXMuX2luaXRpYWxXaWR0aCArIGRpc3RhbmNlWCk7XG5cbiAgICBpZiAobmV3V2lkdGggPiB0aGlzLmNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgbmV3V2lkdGggPSB0aGlzLmNvbHVtbi5tYXhXaWR0aDtcbiAgICB9IGVsc2UgaWYgKGRpc3RhbmNlWCA8IDAgJiYgbmV3V2lkdGggPCB0aGlzLmNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgbmV3V2lkdGggPSB0aGlzLmNvbHVtbi5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGFzdFdpZHRoICE9PSBuZXdXaWR0aCkge1xuICAgICAgdGhpcy5fbGFzdFdpZHRoID0gbmV3V2lkdGg7XG4gICAgICB0aGlzLmNvbHVtbi51cGRhdGVXaWR0aChgJHtuZXdXaWR0aH1weGApO1xuICAgICAgdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgICAvLyBgdGhpcy5jb2x1bW4udXBkYXRlV2lkdGhgIHdpbGwgdXBkYXRlIHRoZSBncmlkIHdpZHRoIGNlbGwgb25seSwgd2hpY2ggd2lsbCB0cmlnZ2VyIGEgcmVzaXplIHRoYXQgd2lsbCB1cGRhdGUgYWxsIG90aGVyIGNlbGxzXG4gICAgICAvLyBgdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKClgIHdpbGwgcmUtYWRqdXN0IGFsbCBvdGhlciBncmlkIHdpZHRoIGNlbGxzLCBhbmQgaWYgdGhlaXIgc2l6ZSBjaGFuZ2VzIHRoZXkgd2lsbCB0cmlnZ2VyIHRoZSByZXNpemUgZXZlbnQuLi5cbiAgICB9XG4gIH1cblxuICAvKiogSGFuZGxlciB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgdXNlciBsaWZ0cyB0aGVpciBwb2ludGVyIHVwLCBhZnRlciBpbml0aWF0aW5nIGEgZHJhZy4gKi9cbiAgcHJpdmF0ZSBfcG9pbnRlclVwID0gKCkgPT4ge1xuICAgIGlmICghdGhpcy5faXNEcmFnZ2luZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcmVtb3ZlU3Vic2NyaXB0aW9ucygpO1xuICAgIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkuc3RvcERyYWdnaW5nKHRoaXMpO1xuXG4gICAgaWYgKCF0aGlzLl9oYXNTdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmNvbHVtbi5jb2x1bW5EZWYuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZ3JpZC5jb2x1bW5BcGkucmVzaXplQ29sdW1uKHRoaXMuY29sdW1uLCB0aGlzLl9sYXN0V2lkdGggKyAncHgnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvaW50ZXJQb3NpdGlvbk9uUGFnZShldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBQb2ludCB7XG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLl9pc1RvdWNoRXZlbnQoZXZlbnQpID8gZXZlbnQudG91Y2hlc1swXSA6IGV2ZW50O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHBvaW50LnBhZ2VYIC0gdGhpcy5fc2Nyb2xsUG9zaXRpb24ubGVmdCxcbiAgICAgIHk6IHBvaW50LnBhZ2VZIC0gdGhpcy5fc2Nyb2xsUG9zaXRpb24udG9wXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzVG91Y2hFdmVudChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpOiBldmVudCBpcyBUb3VjaEV2ZW50IHtcbiAgICByZXR1cm4gZXZlbnQudHlwZS5zdGFydHNXaXRoKCd0b3VjaCcpO1xuICB9XG5cbiAgX2lzRHJhZ2dpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkuaXNEcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlU3Vic2NyaXB0aW9ucygpIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3BvaW50ZXJVcFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbmludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuIl19