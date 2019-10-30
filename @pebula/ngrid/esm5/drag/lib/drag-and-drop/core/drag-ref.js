/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    tslib_1.__extends(PblDragRef, _super);
    function PblDragRef() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, tslib_1.__spread(args)) || this;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2RyYWctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUVqRDs7OztJQUF5QyxzQ0FBVTtJQVlqRDtRQUFZLGNBQThDO2FBQTlDLFVBQThDLEVBQTlDLHFCQUE4QyxFQUE5QyxJQUE4QztZQUE5Qyx5QkFBOEM7O1FBQTFELGdEQUNXLElBQUksV0FPZDs7Ozs7O1FBYkQsd0JBQWtCLEdBQUcsSUFBSSxZQUFZLEVBR2pDLENBQUM7UUFJSCxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBRSxVQUFBLENBQUM7WUFDZCxJQUFBLHVCQUFTO1lBQ2pCLElBQUksU0FBUyxZQUFZLGNBQWMsRUFBRTtnQkFDdkMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSSxFQUFFLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsRUFBQyxDQUFDOztJQUNMLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7Ozs7O0lBQ0gsb0NBQWU7Ozs7Ozs7OztJQUFmLFVBQWdCLFdBQWtEO1FBQ2hFLGtHQUFrRztRQUNsRyw2QkFBNkI7UUFDN0IsSUFBSSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxrQkFBa0IsRUFBRTs7Z0JBQ3JCLE9BQU8sR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDO1lBQzFDLElBQUksbUJBQUEsSUFBSSxFQUFBLENBQUMsY0FBYyxFQUFFLEtBQUssT0FBTyxFQUFFO2dCQUNyQyxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFBLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7YUFDN0U7U0FDRjtRQUNELE9BQU8saUJBQU0sZUFBZSxZQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7SUFFRCw0QkFBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUF5QyxPQUFPLEdBMkMvQzs7Ozs7Ozs7Ozs7O0lBcENDLHdDQUdLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VFbGVtZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERyYWdSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuL2Ryb3AtbGlzdC1yZWYnO1xuXG5leHBvcnQgY2xhc3MgUGJsRHJhZ1JlZjxUID0gYW55PiBleHRlbmRzIERyYWdSZWY8VD4ge1xuXG4gIC8qKlxuICAgKiBGaXJlcyB3aGVuIHRoZSByb290IGVsZW1lbnQgY2hhbmdlc1xuICAgKlxuICAgKiA+IERvZXMgbm90IGVtaXQgb24gdGhlIGluaXRpYWwgc2V0dXAuXG4gICAqL1xuICByb290RWxlbWVudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBwcmV2OiBIVE1MRWxlbWVudDtcbiAgICBjdXJyOiBIVE1MRWxlbWVudDtcbiAgfT4oKTtcblxuICBjb25zdHJ1Y3RvciguLi5hcmdzOiBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8dHlwZW9mIERyYWdSZWY+KSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5leGl0ZWQuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgIGNvbnN0IHsgY29udGFpbmVyIH0gPSBlO1xuICAgICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIFBibERyb3BMaXN0UmVmKSB7XG4gICAgICAgIGNvbnRhaW5lci5iZWZvcmVFeGl0Lm5leHQoeyBpdGVtOiB0aGlzIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gYWx0ZXJuYXRlIGRyYWcgcm9vdCBlbGVtZW50LiBUaGUgcm9vdCBlbGVtZW50IGlzIHRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBtb3ZlZCBhc1xuICAgKiB0aGUgdXNlciBpcyBkcmFnZ2luZy4gUGFzc2luZyBhbiBhbHRlcm5hdGUgcm9vdCBlbGVtZW50IGlzIHVzZWZ1bCB3aGVuIHRyeWluZyB0byBlbmFibGVcbiAgICogZHJhZ2dpbmcgb24gYW4gZWxlbWVudCB0aGF0IHlvdSBtaWdodCBub3QgaGF2ZSBhY2Nlc3MgdG8uXG4gICAqL1xuICB3aXRoUm9vdEVsZW1lbnQocm9vdEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgSFRNTEVsZW1lbnQpOiB0aGlzIHtcbiAgICAvLyB0aGUgZmlyc3QgY2FsbCB0byBgd2l0aFJvb3RFbGVtZW50YCBjb21lcyBmcm9tIHRoZSBiYXNlIGNsYXNzLCBiZWZvcmUgd2UgY29uc3RydWN0IHRoZSBlbWl0dGVyLlxuICAgIC8vIFdlIGRvbid0IG5lZWQgaXQgYW55d2F5Li4uXG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnRDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29lcmNlRWxlbWVudChyb290RWxlbWVudCk7XG4gICAgICBpZiAodGhpcy5nZXRSb290RWxlbWVudCgpICE9PSBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnRDaGFuZ2VkLm5leHQoeyBwcmV2OiB0aGlzLmdldFJvb3RFbGVtZW50KCksIGN1cnI6IGVsZW1lbnQgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLndpdGhSb290RWxlbWVudChyb290RWxlbWVudCk7XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucm9vdEVsZW1lbnRDaGFuZ2VkLmNvbXBsZXRlKCk7XG4gICAgc3VwZXIuZGlzcG9zZSgpO1xuICB9XG59XG4iXX0=