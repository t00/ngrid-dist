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
        return new PblDropListRef(element, this._dragDropRegistry, this._document);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29yZS9kcmFnLWRyb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBYyxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBdUMsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUvRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ3ZDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7O0lBRzNDLGNBQWMsR0FBRztJQUNyQixrQkFBa0IsRUFBRSxDQUFDO0lBQ3JCLCtCQUErQixFQUFFLENBQUM7Q0FDbkM7Ozs7QUFLRDtJQUVFLHFCQUFzQyxTQUFjLEVBQ2hDLE9BQWUsRUFDZixjQUE2QixFQUM3QixpQkFBeUQ7UUFIdkMsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0Isc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF3QztJQUFHLENBQUM7SUFFakY7Ozs7T0FJRzs7Ozs7Ozs7SUFDSCxnQ0FBVTs7Ozs7OztJQUFWLFVBQW9CLE9BQThDLEVBQ3BELE1BQXNDO1FBQXRDLHVCQUFBLEVBQUEsdUJBQXNDO1FBRWxELE9BQU8sSUFBSSxVQUFVLENBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDdkYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7OztJQUNILG9DQUFjOzs7Ozs7SUFBZCxVQUF3QixPQUE4QztRQUNwRSxPQUFPLElBQUksY0FBYyxDQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7O2dCQXpCRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7O2dEQUVqQixNQUFNLFNBQUMsUUFBUTtnQkFuQkQsTUFBTTtnQkFFMUIsYUFBYTtnQkFDd0IsZ0JBQWdCOzs7c0JBSDlEO0NBMkNDLEFBMUJELElBMEJDO1NBekJZLFdBQVc7Ozs7OztJQUNWLGdDQUF3Qzs7Ozs7SUFDeEMsOEJBQXVCOzs7OztJQUN2QixxQ0FBcUM7Ozs7O0lBQ3JDLHdDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCwgTmdab25lLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBWaWV3cG9ydFJ1bGVyfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IERyYWdSZWYsIERyYWdSZWZDb25maWcsIERyb3BMaXN0UmVmLCBEcmFnRHJvcFJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuL2RyYWctcmVmJ1xuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuL2Ryb3AtbGlzdC1yZWYnO1xuXG4vKiogRGVmYXVsdCBjb25maWd1cmF0aW9uIHRvIGJlIHVzZWQgd2hlbiBjcmVhdGluZyBhIGBEcmFnUmVmYC4gKi9cbmNvbnN0IERFRkFVTFRfQ09ORklHID0ge1xuICBkcmFnU3RhcnRUaHJlc2hvbGQ6IDUsXG4gIHBvaW50ZXJEaXJlY3Rpb25DaGFuZ2VUaHJlc2hvbGQ6IDVcbn07XG5cbi8qKlxuICogU2VydmljZSB0aGF0IGFsbG93cyBmb3IgZHJhZy1hbmQtZHJvcCBmdW5jdGlvbmFsaXR5IHRvIGJlIGF0dGFjaGVkIHRvIERPTSBlbGVtZW50cy5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgUGJsRHJhZ0Ryb3Age1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZHJhZ0Ryb3BSZWdpc3RyeTogRHJhZ0Ryb3BSZWdpc3RyeTxEcmFnUmVmLCBEcm9wTGlzdFJlZj4pIHt9XG5cbiAgLyoqXG4gICAqIFR1cm5zIGFuIGVsZW1lbnQgaW50byBhIGRyYWdnYWJsZSBpdGVtLlxuICAgKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIHdoaWNoIHRvIGF0dGFjaCB0aGUgZHJhZ2dpbmcgZnVuY3Rpb25hbGl0eS5cbiAgICogQHBhcmFtIGNvbmZpZyBPYmplY3QgdXNlZCB0byBjb25maWd1cmUgdGhlIGRyYWdnaW5nIGJlaGF2aW9yLlxuICAgKi9cbiAgY3JlYXRlRHJhZzxUID0gYW55PihlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgIGNvbmZpZzogRHJhZ1JlZkNvbmZpZyA9IERFRkFVTFRfQ09ORklHKTogUGJsRHJhZ1JlZjxUPiB7XG5cbiAgICByZXR1cm4gbmV3IFBibERyYWdSZWY8VD4oZWxlbWVudCwgY29uZmlnLCB0aGlzLl9kb2N1bWVudCwgdGhpcy5fbmdab25lLCB0aGlzLl92aWV3cG9ydFJ1bGVyLFxuICAgICAgICB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUdXJucyBhbiBlbGVtZW50IGludG8gYSBkcm9wIGxpc3QuXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gd2hpY2ggdG8gYXR0YWNoIHRoZSBkcm9wIGxpc3QgZnVuY3Rpb25hbGl0eS5cbiAgICovXG4gIGNyZWF0ZURyb3BMaXN0PFQgPSBhbnk+KGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgSFRNTEVsZW1lbnQpOiBQYmxEcm9wTGlzdFJlZjxUPiB7XG4gICAgcmV0dXJuIG5ldyBQYmxEcm9wTGlzdFJlZjxUPihlbGVtZW50LCB0aGlzLl9kcmFnRHJvcFJlZ2lzdHJ5LCB0aGlzLl9kb2N1bWVudCk7XG4gIH1cbn1cbiJdfQ==