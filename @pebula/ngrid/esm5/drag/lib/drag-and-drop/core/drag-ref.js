/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/core/drag-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __read, __spread } from "tslib";
import { EventEmitter } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import { DragRef } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
/**
 * @template T
 */
var /**
 * @template T
 */
PblDragRef = /** @class */ (function (_super) {
    __extends(PblDragRef, _super);
    function PblDragRef() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, __spread(args)) || this;
        /**
         * Fires when the root element changes
         *
         * > Does not emit on the initial setup.
         */
        _this.rootElementChanged = new EventEmitter();
        _this.exited.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            var container = e.container;
            if (container instanceof PblDropListRef) {
                container.beforeExit.next({ item: _this });
            }
        }));
        return _this;
    }
    /**
     * Sets an alternate drag root element. The root element is the element that will be moved as
     * the user is dragging. Passing an alternate root element is useful when trying to enable
     * dragging on an element that you might not have access to.
     */
    /**
     * Sets an alternate drag root element. The root element is the element that will be moved as
     * the user is dragging. Passing an alternate root element is useful when trying to enable
     * dragging on an element that you might not have access to.
     * @template THIS
     * @this {THIS}
     * @param {?} rootElement
     * @return {THIS}
     */
    PblDragRef.prototype.withRootElement = /**
     * Sets an alternate drag root element. The root element is the element that will be moved as
     * the user is dragging. Passing an alternate root element is useful when trying to enable
     * dragging on an element that you might not have access to.
     * @template THIS
     * @this {THIS}
     * @param {?} rootElement
     * @return {THIS}
     */
    function (rootElement) {
        // the first call to `withRootElement` comes from the base class, before we construct the emitter.
        // We don't need it anyway...
        if ((/** @type {?} */ (this)).rootElementChanged) {
            /** @type {?} */
            var element = coerceElement(rootElement);
            if ((/** @type {?} */ (this)).getRootElement() !== element) {
                (/** @type {?} */ (this)).rootElementChanged.next({ prev: (/** @type {?} */ (this)).getRootElement(), curr: element });
            }
        }
        return _super.prototype.withRootElement.call(this, rootElement);
    };
    /**
     * @return {?}
     */
    PblDragRef.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.rootElementChanged.complete();
        _super.prototype.dispose.call(this);
    };
    return PblDragRef;
}(DragRef));
/**
 * @template T
 */
export { PblDragRef };
if (false) {
    /**
     * Fires when the root element changes
     *
     * > Does not emit on the initial setup.
     * @type {?}
     */
    PblDragRef.prototype.rootElementChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2RyYWctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFFakQ7Ozs7SUFBeUMsOEJBQVU7SUFZakQ7UUFBWSxjQUE4QzthQUE5QyxVQUE4QyxFQUE5QyxxQkFBOEMsRUFBOUMsSUFBOEM7WUFBOUMseUJBQThDOztRQUExRCx3Q0FDVyxJQUFJLFdBT2Q7Ozs7OztRQWJELHdCQUFrQixHQUFHLElBQUksWUFBWSxFQUdqQyxDQUFDO1FBSUgsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ2QsSUFBQSx1QkFBUztZQUNqQixJQUFJLFNBQVMsWUFBWSxjQUFjLEVBQUU7Z0JBQ3ZDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUksRUFBRSxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLEVBQUMsQ0FBQzs7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRzs7Ozs7Ozs7OztJQUNILG9DQUFlOzs7Ozs7Ozs7SUFBZixVQUFnQixXQUFrRDtRQUNoRSxrR0FBa0c7UUFDbEcsNkJBQTZCO1FBQzdCLElBQUksbUJBQUEsSUFBSSxFQUFBLENBQUMsa0JBQWtCLEVBQUU7O2dCQUNyQixPQUFPLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxJQUFJLG1CQUFBLElBQUksRUFBQSxDQUFDLGNBQWMsRUFBRSxLQUFLLE9BQU8sRUFBRTtnQkFDckMsbUJBQUEsSUFBSSxFQUFBLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBQSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO2FBQzdFO1NBQ0Y7UUFDRCxPQUFPLGlCQUFNLGVBQWUsWUFBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7O0lBRUQsNEJBQU87OztJQUFQO1FBQ0UsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUEzQ0QsQ0FBeUMsT0FBTyxHQTJDL0M7Ozs7Ozs7Ozs7OztJQXBDQyx3Q0FHSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlRWxlbWVudCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBEcmFnUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi9kcm9wLWxpc3QtcmVmJztcblxuZXhwb3J0IGNsYXNzIFBibERyYWdSZWY8VCA9IGFueT4gZXh0ZW5kcyBEcmFnUmVmPFQ+IHtcblxuICAvKipcbiAgICogRmlyZXMgd2hlbiB0aGUgcm9vdCBlbGVtZW50IGNoYW5nZXNcbiAgICpcbiAgICogPiBEb2VzIG5vdCBlbWl0IG9uIHRoZSBpbml0aWFsIHNldHVwLlxuICAgKi9cbiAgcm9vdEVsZW1lbnRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgcHJldjogSFRNTEVsZW1lbnQ7XG4gICAgY3VycjogSFRNTEVsZW1lbnQ7XG4gIH0+KCk7XG5cbiAgY29uc3RydWN0b3IoLi4uYXJnczogQ29uc3RydWN0b3JQYXJhbWV0ZXJzPHR5cGVvZiBEcmFnUmVmPikge1xuICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgIHRoaXMuZXhpdGVkLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICBjb25zdCB7IGNvbnRhaW5lciB9ID0gZTtcbiAgICAgIGlmIChjb250YWluZXIgaW5zdGFuY2VvZiBQYmxEcm9wTGlzdFJlZikge1xuICAgICAgICBjb250YWluZXIuYmVmb3JlRXhpdC5uZXh0KHsgaXRlbTogdGhpcyB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGFuIGFsdGVybmF0ZSBkcmFnIHJvb3QgZWxlbWVudC4gVGhlIHJvb3QgZWxlbWVudCBpcyB0aGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgbW92ZWQgYXNcbiAgICogdGhlIHVzZXIgaXMgZHJhZ2dpbmcuIFBhc3NpbmcgYW4gYWx0ZXJuYXRlIHJvb3QgZWxlbWVudCBpcyB1c2VmdWwgd2hlbiB0cnlpbmcgdG8gZW5hYmxlXG4gICAqIGRyYWdnaW5nIG9uIGFuIGVsZW1lbnQgdGhhdCB5b3UgbWlnaHQgbm90IGhhdmUgYWNjZXNzIHRvLlxuICAgKi9cbiAgd2l0aFJvb3RFbGVtZW50KHJvb3RFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IEhUTUxFbGVtZW50KTogdGhpcyB7XG4gICAgLy8gdGhlIGZpcnN0IGNhbGwgdG8gYHdpdGhSb290RWxlbWVudGAgY29tZXMgZnJvbSB0aGUgYmFzZSBjbGFzcywgYmVmb3JlIHdlIGNvbnN0cnVjdCB0aGUgZW1pdHRlci5cbiAgICAvLyBXZSBkb24ndCBuZWVkIGl0IGFueXdheS4uLlxuICAgIGlmICh0aGlzLnJvb3RFbGVtZW50Q2hhbmdlZCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGNvZXJjZUVsZW1lbnQocm9vdEVsZW1lbnQpO1xuICAgICAgaWYgKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSAhPT0gZWxlbWVudCkge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50Q2hhbmdlZC5uZXh0KHsgcHJldjogdGhpcy5nZXRSb290RWxlbWVudCgpLCBjdXJyOiBlbGVtZW50IH0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdXBlci53aXRoUm9vdEVsZW1lbnQocm9vdEVsZW1lbnQpO1xuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvb3RFbGVtZW50Q2hhbmdlZC5jb21wbGV0ZSgpO1xuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIl19