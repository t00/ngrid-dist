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
import { TablePlugin, isPblColumn } from '@pebula/ngrid';
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
            if (isPblColumn(col)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvY29sdW1uLXJlc2l6ZS9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDN0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQ0wsYUFBYSxFQUNiLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFMUYsT0FBTyxFQUF5RCxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hILE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDLE1BQU0sT0FBTyxVQUFVLEdBQW1CLGNBQWM7Ozs7O01BR2xELDJCQUEyQixHQUFHLCtCQUErQixDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDOzs7OztNQUc5RSwwQkFBMEIsR0FBRywrQkFBK0IsQ0FBQyxFQUFDLE9B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MkNBQXdDOzs7OztBQXFLdEQsb0JBR0M7OztJQUZDLGtCQUFVOztJQUNWLGtCQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPcHRpb25hbCxcbiAgT25EZXN0cm95LFxuICBOZ1pvbmUsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IFZpZXdwb3J0UnVsZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMgfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQ2RrRHJhZ0NvbmZpZywgRHJhZ0Ryb3BSZWdpc3RyeSwgQ0RLX0RSQUdfQ09ORklHIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxDb2x1bW4sIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBUYWJsZVBsdWdpbiwgaXNQYmxDb2x1bW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IHRvZ2dsZU5hdGl2ZURyYWdJbnRlcmFjdGlvbnMgfSBmcm9tICcuL2Nkay1lbmNhcHN1bGF0ZWQtY29kZSc7XG5pbXBvcnQgeyBleHRlbmRHcmlkIH0gZnJvbSAnLi9leHRlbmQtZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjb2x1bW5SZXNpemU/OiBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQ7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjb2x1bW5SZXNpemUnID0gJ2NvbHVtblJlc2l6ZSc7XG5cbi8qKiBPcHRpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gYmluZCBhIHBhc3NpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBwYXNzaXZlRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSBub3JtYWxpemVQYXNzaXZlTGlzdGVuZXJPcHRpb25zKHtwYXNzaXZlOiB0cnVlfSk7XG5cbi8qKiBPcHRpb25zIHRoYXQgY2FuIGJlIHVzZWQgdG8gYmluZCBhbiBhY3RpdmUgZXZlbnQgbGlzdGVuZXIuICovXG5jb25zdCBhY3RpdmVFdmVudExpc3RlbmVyT3B0aW9ucyA9IG5vcm1hbGl6ZVBhc3NpdmVMaXN0ZW5lck9wdGlvbnMoe3Bhc3NpdmU6IGZhbHNlfSk7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBydW5PbmNlOiBleHRlbmRHcmlkIH0pXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtZHJhZy1yZXNpemUnLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1jb2x1bW4tcmVzaXplcicsXG4gICAgJ1tzdHlsZS53aWR0aC5weF0nOiAnZ3JhYkFyZWFXaWR0aCcsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiAnLi9jb2x1bW4tcmVzaXplLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL2NvbHVtbi1yZXNpemUuY29tcG9uZW50LnNjc3MnIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERyYWdSZXNpemVDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCkgc2V0IGNvbnRleHQodmFsdWU6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueT4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIGNvbnN0IHsgY29sLCB0YWJsZSB9ID0gdmFsdWU7XG4gICAgICBpZiAoaXNQYmxDb2x1bW4oY29sKSkge1xuICAgICAgICB0aGlzLmNvbHVtbiA9IGNvbDtcbiAgICAgICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29sdW1uID0gdGhpcy50YWJsZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYXJlYSAoaW4gcGl4ZWxzKSBpbiB3aGljaCB0aGUgaGFuZGxlIGNhbiBiZSBncmFiYmVkIGFuZCByZXNpemUgdGhlIGNlbGwuXG4gICAqIERlZmF1bHQ6IDZcbiAgICovXG4gIEBJbnB1dCgpIGdyYWJBcmVhV2lkdGggPSA2O1xuXG4gIGNvbHVtbjogUGJsQ29sdW1uO1xuICB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICBfaGFzU3RhcnRlZERyYWdnaW5nOiBib29sZWFuO1xuICBwcml2YXRlIF9oYXNNb3ZlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9wb2ludGVyTW92ZVN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfcG9pbnRlclVwU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9zY3JvbGxQb3NpdGlvbjoge3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9O1xuICBwcml2YXRlIF9waWNrdXBQb3NpdGlvbk9uUGFnZTogUG9pbnQ7XG4gIHByaXZhdGUgX2luaXRpYWxXaWR0aDogbnVtYmVyO1xuICBwcml2YXRlIF9sYXN0V2lkdGg6IG51bWJlcjtcblxuICBwcml2YXRlIGNhY2hlOiBIVE1MRWxlbWVudFtdO1xuXG4gIHByaXZhdGUgX3Jvb3RFbGVtZW50SW5pdFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIF9kcmFnRHJvcFJlZ2lzdHJ5OiBEcmFnRHJvcFJlZ2lzdHJ5PFBibE5ncmlkRHJhZ1Jlc2l6ZUNvbXBvbmVudCwgYW55PixcbiAgICAgICAgICAgICAgQEluamVjdChDREtfRFJBR19DT05GSUcpIHByaXZhdGUgX2NvbmZpZzogQ2RrRHJhZ0NvbmZpZyxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSkge1xuICAgIF9kcmFnRHJvcFJlZ2lzdHJ5LnJlZ2lzdGVyRHJhZ0l0ZW0odGhpcyk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gV2UgbmVlZCB0byB3YWl0IGZvciB0aGUgem9uZSB0byBzdGFiaWxpemUsIGluIG9yZGVyIGZvciB0aGUgcmVmZXJlbmNlXG4gICAgLy8gZWxlbWVudCB0byBiZSBpbiB0aGUgcHJvcGVyIHBsYWNlIGluIHRoZSBET00uIFRoaXMgaXMgbW9zdGx5IHJlbGV2YW50XG4gICAgLy8gZm9yIGRyYWdnYWJsZSBlbGVtZW50cyBpbnNpZGUgcG9ydGFscyBzaW5jZSB0aGV5IGdldCBzdGFtcGVkIG91dCBpblxuICAgIC8vIHRoZWlyIG9yaWdpbmFsIERPTSBwb3NpdGlvbiBhbmQgdGhlbiB0aGV5IGdldCB0cmFuc2ZlcnJlZCB0byB0aGUgcG9ydGFsLlxuICAgIHRoaXMuX3Jvb3RFbGVtZW50SW5pdFN1YnNjcmlwdGlvbiA9IHRoaXMuX25nWm9uZS5vblN0YWJsZS5hc09ic2VydmFibGUoKS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBjb25zdCByb290RWxlbWVudCA9IHRoaXMuX3Jvb3RFbGVtZW50ID0gdGhpcy5fZ2V0Um9vdEVsZW1lbnQoKTtcbiAgICAgIGNvbnN0IGNlbGwgPSByb290RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtY29sdW1uLXJlc2l6ZScpO1xuICAgICAgcm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5fcG9pbnRlckRvd24sIGFjdGl2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIHJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9wb2ludGVyRG93biwgcGFzc2l2ZUV2ZW50TGlzdGVuZXJPcHRpb25zKTtcbiAgICAgIHRvZ2dsZU5hdGl2ZURyYWdJbnRlcmFjdGlvbnMocm9vdEVsZW1lbnQgLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuX3BvaW50ZXJEb3duLCBhY3RpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gICAgICB0aGlzLl9yb290RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fcG9pbnRlckRvd24sIHBhc3NpdmVFdmVudExpc3RlbmVyT3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMuX3Jvb3RFbGVtZW50SW5pdFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkucmVtb3ZlRHJhZ0l0ZW0odGhpcyk7XG4gICAgdGhpcy5fcmVtb3ZlU3Vic2NyaXB0aW9ucygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snLCBbJyRldmVudCddKVxuICBvbkRvdWJsZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy50YWJsZS5jb2x1bW5BcGkuYXV0b1NpemVDb2x1bW4odGhpcy5jb2x1bW4pO1xuICB9XG5cbiAgX3BvaW50ZXJEb3duID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgIHRoaXMuX2luaXRpYWxpemVEcmFnU2VxdWVuY2UodGhpcy5fcm9vdEVsZW1lbnQsIGV2ZW50KTtcbiAgfVxuXG4gICAgLyoqXG4gICAqIFNldHMgdXAgdGhlIGRpZmZlcmVudCB2YXJpYWJsZXMgYW5kIHN1YnNjcmlwdGlvbnNcbiAgICogdGhhdCB3aWxsIGJlIG5lY2Vzc2FyeSBmb3IgdGhlIGRyYWdnaW5nIHNlcXVlbmNlLlxuICAgKiBAcGFyYW0gcmVmZXJlbmNlRWxlbWVudCBFbGVtZW50IHRoYXQgc3RhcnRlZCB0aGUgZHJhZyBzZXF1ZW5jZS5cbiAgICogQHBhcmFtIGV2ZW50IEJyb3dzZXIgZXZlbnQgb2JqZWN0IHRoYXQgc3RhcnRlZCB0aGUgc2VxdWVuY2UuXG4gICAqL1xuICBwcml2YXRlIF9pbml0aWFsaXplRHJhZ1NlcXVlbmNlKHJlZmVyZW5jZUVsZW1lbnQ6IEhUTUxFbGVtZW50LCBldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpIHtcbiAgICAvLyBBbHdheXMgc3RvcCBwcm9wYWdhdGlvbiBmb3IgdGhlIGV2ZW50IHRoYXQgaW5pdGlhbGl6ZXNcbiAgICAvLyB0aGUgZHJhZ2dpbmcgc2VxdWVuY2UsIGluIG9yZGVyIHRvIHByZXZlbnQgaXQgZnJvbSBwb3RlbnRpYWxseVxuICAgIC8vIHN0YXJ0aW5nIGFub3RoZXIgc2VxdWVuY2UgZm9yIGEgZHJhZ2dhYmxlIHBhcmVudCBzb21ld2hlcmUgdXAgdGhlIERPTSB0cmVlLlxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgLy8gQWJvcnQgaWYgdGhlIHVzZXIgaXMgYWxyZWFkeSBkcmFnZ2luZyBvciBpcyB1c2luZyBhIG1vdXNlIGJ1dHRvbiBvdGhlciB0aGFuIHRoZSBwcmltYXJ5IG9uZS5cbiAgICBpZiAodGhpcy5faXNEcmFnZ2luZygpIHx8ICghdGhpcy5faXNUb3VjaEV2ZW50KGV2ZW50KSAmJiBldmVudC5idXR0b24gIT09IDApKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faGFzU3RhcnRlZERyYWdnaW5nID0gdGhpcy5faGFzTW92ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wb2ludGVyTW92ZVN1YnNjcmlwdGlvbiA9IHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkucG9pbnRlck1vdmVcbiAgICAgIC5waXBlKGF1ZGl0VGltZSgwLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlcikpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX3BvaW50ZXJNb3ZlKTtcbiAgICB0aGlzLl9wb2ludGVyVXBTdWJzY3JpcHRpb24gPSB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LnBvaW50ZXJVcC5zdWJzY3JpYmUodGhpcy5fcG9pbnRlclVwKTtcbiAgICB0aGlzLl9zY3JvbGxQb3NpdGlvbiA9IHRoaXMuX3ZpZXdwb3J0UnVsZXIuZ2V0Vmlld3BvcnRTY3JvbGxQb3NpdGlvbigpO1xuXG4gICAgdGhpcy5fcGlja3VwUG9zaXRpb25PblBhZ2UgPSB0aGlzLl9nZXRQb2ludGVyUG9zaXRpb25PblBhZ2UoZXZlbnQpO1xuICAgIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnkuc3RhcnREcmFnZ2luZyh0aGlzLCBldmVudCk7XG4gIH1cblxuICAvKiogSGFuZGxlciB0aGF0IGlzIGludm9rZWQgd2hlbiB0aGUgdXNlciBtb3ZlcyB0aGVpciBwb2ludGVyIGFmdGVyIHRoZXkndmUgaW5pdGlhdGVkIGEgZHJhZy4gKi9cbiAgcHJpdmF0ZSBfcG9pbnRlck1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XG4gICAgY29uc3QgcG9pbnRlclBvc2l0aW9uID0gdGhpcy5fZ2V0UG9pbnRlclBvc2l0aW9uT25QYWdlKGV2ZW50KTtcbiAgICBjb25zdCBkaXN0YW5jZVggPSBwb2ludGVyUG9zaXRpb24ueCAtIHRoaXMuX3BpY2t1cFBvc2l0aW9uT25QYWdlLng7XG4gICAgY29uc3QgZGlzdGFuY2VZID0gcG9pbnRlclBvc2l0aW9uLnkgLSB0aGlzLl9waWNrdXBQb3NpdGlvbk9uUGFnZS55O1xuXG4gICAgaWYgKCF0aGlzLl9oYXNTdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIC8vIE9ubHkgc3RhcnQgZHJhZ2dpbmcgYWZ0ZXIgdGhlIHVzZXIgaGFzIG1vdmVkIG1vcmUgdGhhbiB0aGUgbWluaW11bSBkaXN0YW5jZSBpbiBlaXRoZXJcbiAgICAgIC8vIGRpcmVjdGlvbi4gTm90ZSB0aGF0IHRoaXMgaXMgcHJlZmVyYWJsZSBvdmVyIGRvaW5nIHNvbWV0aGluZyBsaWtlIGBza2lwKG1pbmltdW1EaXN0YW5jZSlgXG4gICAgICAvLyBpbiB0aGUgYHBvaW50ZXJNb3ZlYCBzdWJzY3JpcHRpb24sIGJlY2F1c2Ugd2UncmUgbm90IGd1YXJhbnRlZWQgdG8gaGF2ZSBvbmUgbW92ZSBldmVudFxuICAgICAgLy8gcGVyIHBpeGVsIG9mIG1vdmVtZW50IChlLmcuIGlmIHRoZSB1c2VyIG1vdmVzIHRoZWlyIHBvaW50ZXIgcXVpY2tseSkuXG4gICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2VYKSArIE1hdGguYWJzKGRpc3RhbmNlWSkgPj0gdGhpcy5fY29uZmlnLmRyYWdTdGFydFRocmVzaG9sZCkge1xuICAgICAgICB0aGlzLl9oYXNTdGFydGVkRHJhZ2dpbmcgPSB0cnVlO1xuXG4gICAgICAgIC8vIEl0IHdpbGwgYmUgYSBnb29kIHRoaW5nIGlmIHdlIHR1cm5lZCBvZiB0aGUgaGVhZGVyJ3MgcmVzaXplIG9ic2VydmVyIHRvIGJvb3N0IHBlcmZvcm1hbmNlXG4gICAgICAgIC8vIEhvd2V2ZXIsIGJlY2F1c2Ugd2UgcmVsYXkgb24gdGhlIHRvdGFsIHRhYmxlIG1pbmltdW0gd2lkdGggdXBkYXRlcyB0byByZWxhdGl2ZWx5IGV2ZW4gb3V0IHRoZSBjb2x1bW5zIGl0IHdpbGwgbm90IHdvcmsuXG4gICAgICAgIC8vIEdyb3VwIGNlbGxzIHdpbGwgbm90IGNvdmVyIGFsbCBvZiB0aGUgY2hpbGRyZW4sIHdoZW4gd2UgZW5sYXJnZSB0aGUgd2lkdGggb2YgYSBjaGlsZCBpbiB0aGUgZ3JvdXAuXG4gICAgICAgIC8vIFRoaXMgaXMgYmVjYXVzZSB0aGUgbWF4LXdpZHRoIG9mIHRoZSBncm91cCBpcyBzZXQgcHJvcG9ydGlvbmFsIHRvIHRoZSB0b3RhbCBtaW4td2lkdGggb2YgdGhlIGlubmVyIHRhYmxlLlxuICAgICAgICAvLyBGb3IgaXQgdG8gd29yayB3ZSBuZWVkIHRvIGRpcmVjdGx5IHVwZGF0ZSB0aGUgd2lkdGggb2YgQUxMIE9GIFRIRSBHUk9VUFMuXG4gICAgICAgIC8vIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmNvbHVtbi5zaXplSW5mby51cGRhdGVTaXplKCk7XG4gICAgICAgIHRoaXMuX2xhc3RXaWR0aCA9IHRoaXMuX2luaXRpYWxXaWR0aCA9IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5uZXRXaWR0aDtcbiAgICAgICAgdGhpcy5jYWNoZSA9IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cygndGFibGUnLCAnaGVhZGVyJywgJ2Zvb3RlcicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2hhc01vdmVkID0gdHJ1ZTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgbGV0IG5ld1dpZHRoID0gTWF0aC5tYXgoMCwgdGhpcy5faW5pdGlhbFdpZHRoICsgZGlzdGFuY2VYKTtcblxuICAgIGlmIChuZXdXaWR0aCA+IHRoaXMuY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICBuZXdXaWR0aCA9IHRoaXMuY29sdW1uLm1heFdpZHRoO1xuICAgIH0gZWxzZSBpZiAoZGlzdGFuY2VYIDwgMCAmJiBuZXdXaWR0aCA8IHRoaXMuY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICBuZXdXaWR0aCA9IHRoaXMuY29sdW1uLm1pbldpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9sYXN0V2lkdGggIT09IG5ld1dpZHRoKSB7XG4gICAgICB0aGlzLl9sYXN0V2lkdGggPSBuZXdXaWR0aDtcbiAgICAgIHRoaXMuY29sdW1uLndpZHRoID0gbmV3V2lkdGggKyAncHgnO1xuICAgICAgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpO1xuXG4gICAgICBmb3IgKGNvbnN0IGVsIG9mIHRoaXMuY2FjaGUpIHtcbiAgICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLmFwcGx5V2lkdGgoZWwpXG4gICAgICB9XG4gICAgICAvLyB0aGUgYWJvdmUgd2lsbCBjaGFuZ2UgdGhlIHNpemUgb2Ygb24gY29sdW1uIEFORCBiZWNhdXNlIHdlIGRpZG4ndCBkaXNhYmxlIHRoZSByZXNpemUgb2JzZXJ2ZXIgaXQgd2lsbCBwb3AgYW4gZXZlbnQuXG4gICAgICAvLyBpZiB0aGVyZSBhcmUgZ3JvdXBzIGl0IHdpbGwgZmlyZSB0YWJsZS5yZXNpemVDb2x1bW5zKCk7IHdoaWNoIHdpbGwgcmVjYWxjdWxhdGUgdGhlIGdyb3Vwcy4uLlxuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVyIHRoYXQgaXMgaW52b2tlZCB3aGVuIHRoZSB1c2VyIGxpZnRzIHRoZWlyIHBvaW50ZXIgdXAsIGFmdGVyIGluaXRpYXRpbmcgYSBkcmFnLiAqL1xuICBwcml2YXRlIF9wb2ludGVyVXAgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLl9pc0RyYWdnaW5nKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9yZW1vdmVTdWJzY3JpcHRpb25zKCk7XG4gICAgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5zdG9wRHJhZ2dpbmcodGhpcyk7XG5cbiAgICBpZiAoIXRoaXMuX2hhc1N0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgdGhpcy50YWJsZS5jb2x1bW5BcGkucmVzaXplQ29sdW1uKHRoaXMuY29sdW1uLCB0aGlzLl9sYXN0V2lkdGggKyAncHgnKTtcblxuICAgIC8vIGNsZWFudXBcbiAgICB0aGlzLmNhY2hlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9pbnRlclBvc2l0aW9uT25QYWdlKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IFBvaW50IHtcbiAgICBjb25zdCBwb2ludCA9IHRoaXMuX2lzVG91Y2hFdmVudChldmVudCkgPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgeDogcG9pbnQucGFnZVggLSB0aGlzLl9zY3JvbGxQb3NpdGlvbi5sZWZ0LFxuICAgICAgeTogcG9pbnQucGFnZVkgLSB0aGlzLl9zY3JvbGxQb3NpdGlvbi50b3BcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNUb3VjaEV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCk6IGV2ZW50IGlzIFRvdWNoRXZlbnQge1xuICAgIHJldHVybiBldmVudC50eXBlLnN0YXJ0c1dpdGgoJ3RvdWNoJyk7XG4gIH1cblxuICBfaXNEcmFnZ2luZygpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeS5pc0RyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Um9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVTdWJzY3JpcHRpb25zKCkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcG9pbnRlclVwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59XG4iXX0=