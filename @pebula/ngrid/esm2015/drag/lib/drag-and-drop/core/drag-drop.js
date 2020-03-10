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
const DEFAULT_CONFIG = {
    dragStartThreshold: 5,
    pointerDirectionChangeThreshold: 5
};
/**
 * Service that allows for drag-and-drop functionality to be attached to DOM elements.
 */
export class PblDragDrop {
    /**
     * @param {?} _document
     * @param {?} _ngZone
     * @param {?} _viewportRuler
     * @param {?} _dragDropRegistry
     */
    constructor(_document, _ngZone, _viewportRuler, _dragDropRegistry) {
        this._document = _document;
        this._ngZone = _ngZone;
        this._viewportRuler = _viewportRuler;
        this._dragDropRegistry = _dragDropRegistry;
    }
    /**
     * Turns an element into a draggable item.
     * @template T
     * @param {?} element Element to which to attach the dragging functionality.
     * @param {?=} config Object used to configure the dragging behavior.
     * @return {?}
     */
    createDrag(element, config = DEFAULT_CONFIG) {
        return new PblDragRef(element, config, this._document, this._ngZone, this._viewportRuler, this._dragDropRegistry);
    }
    /**
     * Turns an element into a drop list.
     * @template T
     * @param {?} element Element to which to attach the drop list functionality.
     * @return {?}
     */
    createDropList(element) {
        return new PblDropListRef(element, this._dragDropRegistry, this._document, this._ngZone, this._viewportRuler);
    }
}
PblDragDrop.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
PblDragDrop.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: NgZone },
    { type: ViewportRuler },
    { type: DragDropRegistry }
];
/** @nocollapse */ PblDragDrop.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function PblDragDrop_Factory() { return new PblDragDrop(i0.ɵɵinject(i1.DOCUMENT), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.ViewportRuler), i0.ɵɵinject(i3.DragDropRegistry)); }, token: PblDragDrop, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29yZS9kcmFnLWRyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBdUMsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7O01BRzNDLGNBQWMsR0FBRztJQUNyQixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLCtCQUErQixFQUFFLENBQUM7Q0FDbkM7Ozs7QUFNRCxNQUFNLE9BQU8sV0FBVzs7Ozs7OztJQUN0QixZQUFzQyxTQUFjLEVBQ2hDLE9BQWUsRUFDZixjQUE2QixFQUM3QixpQkFBeUQ7UUFIdkMsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF3QztJQUFHLENBQUM7Ozs7Ozs7O0lBT2pGLFVBQVUsQ0FBVSxPQUE4QyxFQUM5QyxTQUF3QixjQUFjO1FBRXhELE9BQU8sSUFBSSxVQUFVLENBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2SCxDQUFDOzs7Ozs7O0lBTUQsY0FBYyxDQUFVLE9BQThDO1FBQ3BFLE9BQU8sSUFBSSxjQUFjLENBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ25ILENBQUM7OztZQXhCRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OzRDQUVqQixNQUFNLFNBQUMsUUFBUTtZQW5CRCxNQUFNO1lBRTFCLGFBQWE7WUFDd0IsZ0JBQWdCOzs7Ozs7OztJQWdCaEQsZ0NBQXdDOzs7OztJQUN4Qyw4QkFBdUI7Ozs7O0lBQ3ZCLHFDQUFxQzs7Ozs7SUFDckMsd0NBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBOZ1pvbmUsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuaW1wb3J0IHsgRHJhZ1JlZiwgRHJhZ1JlZkNvbmZpZywgRHJvcExpc3RSZWYsIERyYWdEcm9wUmVnaXN0cnkgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuXHJcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuL2RyYWctcmVmJ1xyXG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4vZHJvcC1saXN0LXJlZic7XHJcblxyXG4vKiogRGVmYXVsdCBjb25maWd1cmF0aW9uIHRvIGJlIHVzZWQgd2hlbiBjcmVhdGluZyBhIGBEcmFnUmVmYC4gKi9cclxuY29uc3QgREVGQVVMVF9DT05GSUcgPSB7XHJcbiAgZHJhZ1N0YXJ0VGhyZXNob2xkOiA1LFxyXG4gIHBvaW50ZXJEaXJlY3Rpb25DaGFuZ2VUaHJlc2hvbGQ6IDVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXJ2aWNlIHRoYXQgYWxsb3dzIGZvciBkcmFnLWFuZC1kcm9wIGZ1bmN0aW9uYWxpdHkgdG8gYmUgYXR0YWNoZWQgdG8gRE9NIGVsZW1lbnRzLlxyXG4gKi9cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXHJcbmV4cG9ydCBjbGFzcyBQYmxEcmFnRHJvcCB7XHJcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF92aWV3cG9ydFJ1bGVyOiBWaWV3cG9ydFJ1bGVyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RyYWdEcm9wUmVnaXN0cnk6IERyYWdEcm9wUmVnaXN0cnk8RHJhZ1JlZiwgRHJvcExpc3RSZWY+KSB7fVxyXG5cclxuICAvKipcclxuICAgKiBUdXJucyBhbiBlbGVtZW50IGludG8gYSBkcmFnZ2FibGUgaXRlbS5cclxuICAgKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHdoaWNoIHRvIGF0dGFjaCB0aGUgZHJhZ2dpbmcgZnVuY3Rpb25hbGl0eS5cclxuICAgKiBAcGFyYW0gY29uZmlnIE9iamVjdCB1c2VkIHRvIGNvbmZpZ3VyZSB0aGUgZHJhZ2dpbmcgYmVoYXZpb3IuXHJcbiAgICovXHJcbiAgY3JlYXRlRHJhZzxUID0gYW55PihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IEhUTUxFbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlnOiBEcmFnUmVmQ29uZmlnID0gREVGQVVMVF9DT05GSUcpOiBQYmxEcmFnUmVmPFQ+IHtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBibERyYWdSZWY8VD4oZWxlbWVudCwgY29uZmlnLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5fbmdab25lLCB0aGlzLl92aWV3cG9ydFJ1bGVyLCB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFR1cm5zIGFuIGVsZW1lbnQgaW50byBhIGRyb3AgbGlzdC5cclxuICAgKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHdoaWNoIHRvIGF0dGFjaCB0aGUgZHJvcCBsaXN0IGZ1bmN0aW9uYWxpdHkuXHJcbiAgICovXHJcbiAgY3JlYXRlRHJvcExpc3Q8VCA9IGFueT4oZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBIVE1MRWxlbWVudCk6IFBibERyb3BMaXN0UmVmPFQ+IHtcclxuICAgIHJldHVybiBuZXcgUGJsRHJvcExpc3RSZWY8VD4oZWxlbWVudCwgdGhpcy5fZHJhZ0Ryb3BSZWdpc3RyeSwgdGhpcy5fZG9jdW1lbnQsIHRoaXMuX25nWm9uZSwgdGhpcy5fdmlld3BvcnRSdWxlcik7XHJcbiAgfVxyXG59XHJcbiJdfQ==