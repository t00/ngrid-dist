/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DragDropRegistry } from '@angular/cdk/drag-drop';
import { PblDragRef } from './drag-ref';
import { PblDropListRef } from './drop-list-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/cdk/scrolling";
import * as i3 from "@angular/cdk/drag-drop";
/**
 * Default configuration to be used when creating a `DragRef`.
 * @type {?}
 */
var DEFAULT_CONFIG = {
    dragStartThreshold: 5,
    pointerDirectionChangeThreshold: 5
};
/**
 * Service that allows for drag-and-drop functionality to be attached to DOM elements.
 */
var PblDragDrop = /** @class */ (function () {
    function PblDragDrop(_document, _ngZone, _viewportRuler, _dragDropRegistry) {
        this._document = _document;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
    }
    /**
     * Turns an element into a draggable item.
     * @param element Element to which to attach the dragging functionality.
     * @param config Object used to configure the dragging behavior.
     */
    /**
     * Turns an element into a draggable item.
     * @template T
     * @param {?} element Element to which to attach the dragging functionality.
     * @param {?=} config Object used to configure the dragging behavior.
     * @return {?}
     */
    PblDragDrop.prototype.createDrag = /**
     * Turns an element into a draggable item.
     * @template T
     * @param {?} element Element to which to attach the dragging functionality.
     * @param {?=} config Object used to configure the dragging behavior.
     * @return {?}
     */
    function (element, config) {
        if (config === void 0) { config = DEFAULT_CONFIG; }
        return new PblDragRef(element, config, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry);
    };
    /**
     * Turns an element into a drop list.
     * @param element Element to which to attach the drop list functionality.
     */
    /**
     * Turns an element into a drop list.
     * @template T
     * @param {?} element Element to which to attach the drop list functionality.
     * @return {?}
     */
    PblDragDrop.prototype.createDropList = /**
     * Turns an element into a drop list.
     * @template T
     * @param {?} element Element to which to attach the drop list functionality.
     * @return {?}
     */
    function (element) {
        return new PblDropListRef(element, this._dragDropRegistry, this._document, this._ngZone, this._viewportRuler);
    };
    PblDragDrop.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    PblDragDrop.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: NgZone },
        { type: ViewportRuler },
        { type: DragDropRegistry }
    ]; };
    /** @nocollapse */ PblDragDrop.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PblDragDrop_Factory() { return new PblDragDrop(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.ViewportRuler), i0.ɵɵinject(i3.DragDropRegistry)); }, token: PblDragDrop, providedIn: "root" });
    return PblDragDrop;
}());
export { PblDragDrop };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._document;
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._viewportRuler;
    /**
     * @type {?}
     * @private
     */
    PblDragDrop.prototype._dragDropRegistry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29yZS9kcmFnLWRyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBdUMsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7O0lBRzNDLGNBQWMsR0FBRztJQUNyQixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLCtCQUErQixFQUFFLENBQUM7Q0FDbkM7Ozs7QUFLRDtJQUVFLHFCQUFzQyxTQUFjLEVBQ2hDLE9BQWUsRUFDZixjQUE2QixFQUM3QixpQkFBeUQ7UUFIdkMsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF3QztJQUFHLENBQUM7SUFFakY7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxnQ0FBVTs7Ozs7OztJQUFWLFVBQW9CLE9BQThDLEVBQzlDLE1BQXNDO1FBQXRDLHVCQUFBLEVBQUEsdUJBQXNDO1FBRXhELE9BQU8sSUFBSSxVQUFVLENBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2SCxDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsb0NBQWM7Ozs7OztJQUFkLFVBQXdCLE9BQThDO1FBQ3BFLE9BQU8sSUFBSSxjQUFjLENBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ25ILENBQUM7O2dCQXhCRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O2dEQUVqQixNQUFNLFNBQUMsUUFBUTtnQkFuQkQsTUFBTTtnQkFFMUIsYUFBYTtnQkFDd0IsZ0JBQWdCOzs7c0JBSDlEO0NBMENDLEFBekJELElBeUJDO1NBeEJZLFdBQVc7Ozs7OztJQUNWLGdDQUF3Qzs7Ozs7SUFDeEMsOEJBQXVCOzs7OztJQUN2QixxQ0FBcUM7Ozs7O0lBQ3JDLHdDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgTmdab25lLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgVmlld3BvcnRSdWxlcn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7IERyYWdSZWYsIERyYWdSZWZDb25maWcsIERyb3BMaXN0UmVmLCBEcmFnRHJvcFJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcblxyXG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi9kcmFnLXJlZidcclxuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuL2Ryb3AtbGlzdC1yZWYnO1xyXG5cclxuLyoqIERlZmF1bHQgY29uZmlndXJhdGlvbiB0byBiZSB1c2VkIHdoZW4gY3JlYXRpbmcgYSBgRHJhZ1JlZmAuICovXHJcbmNvbnN0IERFRkFVTFRfQ09ORklHID0ge1xyXG4gIGRyYWdTdGFydFRocmVzaG9sZDogNSxcclxuICBwb2ludGVyRGlyZWN0aW9uQ2hhbmdlVGhyZXNob2xkOiA1XHJcbn07XHJcblxyXG4vKipcclxuICogU2VydmljZSB0aGF0IGFsbG93cyBmb3IgZHJhZy1hbmQtZHJvcCBmdW5jdGlvbmFsaXR5IHRvIGJlIGF0dGFjaGVkIHRvIERPTSBlbGVtZW50cy5cclxuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgUGJsRHJhZ0Ryb3Age1xyXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcclxuICAgICAgICAgICAgICBwcml2YXRlIF9kcmFnRHJvcFJlZ2lzdHJ5OiBEcmFnRHJvcFJlZ2lzdHJ5PERyYWdSZWYsIERyb3BMaXN0UmVmPikge31cclxuXHJcbiAgLyoqXHJcbiAgICogVHVybnMgYW4gZWxlbWVudCBpbnRvIGEgZHJhZ2dhYmxlIGl0ZW0uXHJcbiAgICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byB3aGljaCB0byBhdHRhY2ggdGhlIGRyYWdnaW5nIGZ1bmN0aW9uYWxpdHkuXHJcbiAgICogQHBhcmFtIGNvbmZpZyBPYmplY3QgdXNlZCB0byBjb25maWd1cmUgdGhlIGRyYWdnaW5nIGJlaGF2aW9yLlxyXG4gICAqL1xyXG4gIGNyZWF0ZURyYWc8VCA9IGFueT4oZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBIVE1MRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZzogRHJhZ1JlZkNvbmZpZyA9IERFRkFVTFRfQ09ORklHKTogUGJsRHJhZ1JlZjxUPiB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQYmxEcmFnUmVmPFQ+KGVsZW1lbnQsIGNvbmZpZywgdGhpcy5fZG9jdW1lbnQsIHRoaXMuX25nWm9uZSwgdGhpcy5fdmlld3BvcnRSdWxlciwgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUdXJucyBhbiBlbGVtZW50IGludG8gYSBkcm9wIGxpc3QuXHJcbiAgICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byB3aGljaCB0byBhdHRhY2ggdGhlIGRyb3AgbGlzdCBmdW5jdGlvbmFsaXR5LlxyXG4gICAqL1xyXG4gIGNyZWF0ZURyb3BMaXN0PFQgPSBhbnk+KGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgSFRNTEVsZW1lbnQpOiBQYmxEcm9wTGlzdFJlZjxUPiB7XHJcbiAgICByZXR1cm4gbmV3IFBibERyb3BMaXN0UmVmPFQ+KGVsZW1lbnQsIHRoaXMuX2RyYWdEcm9wUmVnaXN0cnksIHRoaXMuX2RvY3VtZW50LCB0aGlzLl9uZ1pvbmUsIHRoaXMuX3ZpZXdwb3J0UnVsZXIpO1xyXG4gIH1cclxufVxyXG4iXX0=