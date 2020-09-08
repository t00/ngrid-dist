/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/core/drop-list-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Subject } from 'rxjs';
import { DropListRef } from '@angular/cdk/drag-drop';
import { coerceElement } from '@angular/cdk/coercion';
/**
 * @template T
 */
var /**
 * @template T
 */
PblDropListRef = /** @class */ (function (_super) {
    __extends(PblDropListRef, _super);
    function PblDropListRef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Emits right before dragging has started.
         */
        _this.beforeExit = new Subject();
        return _this;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} element
     * @return {THIS}
     */
    PblDropListRef.prototype.withElement = /**
     * @template THIS
     * @this {THIS}
     * @param {?} element
     * @return {THIS}
     */
    function (element) {
        // TODO: Workaround, see if we can push this through https://github.com/angular/material2/issues/15086
        ((/** @type {?} */ ((/** @type {?} */ (this))))).element = coerceElement(element);
        return (/** @type {?} */ (this));
    };
    /**
     * @return {?}
     */
    PblDropListRef.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this.beforeExit.complete();
        _super.prototype.dispose.call(this);
    };
    return PblDropListRef;
}(DropListRef));
/**
 * @template T
 */
export { PblDropListRef };
if (false) {
    /**
     * Emits right before dragging has started.
     * @type {?}
     */
    PblDropListRef.prototype.beforeExit;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1saXN0LXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvcmUvZHJvcC1saXN0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFdEQ7Ozs7SUFBNkMsa0NBQWM7SUFBM0Q7UUFBQSxxRUFjQzs7OztRQVpDLGdCQUFVLEdBQUcsSUFBSSxPQUFPLEVBQWdELENBQUM7O0lBWTNFLENBQUM7Ozs7Ozs7SUFWQyxvQ0FBVzs7Ozs7O0lBQVgsVUFBWSxPQUE4QztRQUN4RCxzR0FBc0c7UUFDdEcsQ0FBQyxtQkFBQSxtQkFBQSxJQUFJLEVBQUEsRUFBZ0UsQ0FBQyxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEcsT0FBTyxtQkFBQSxJQUFJLEVBQUEsQ0FBQztJQUNkLENBQUM7Ozs7SUFFRCxnQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLGlCQUFNLE9BQU8sV0FBRSxDQUFDO0lBQ2xCLENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFkRCxDQUE2QyxXQUFXLEdBY3ZEOzs7Ozs7Ozs7O0lBWkMsb0NBQXlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJvcExpc3RSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IGNvZXJjZUVsZW1lbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5leHBvcnQgY2xhc3MgUGJsRHJvcExpc3RSZWY8VCA9IGFueT4gZXh0ZW5kcyBEcm9wTGlzdFJlZjxUPiB7XG4gIC8qKiBFbWl0cyByaWdodCBiZWZvcmUgZHJhZ2dpbmcgaGFzIHN0YXJ0ZWQuICovXG4gIGJlZm9yZUV4aXQgPSBuZXcgU3ViamVjdDx7IGl0ZW06IGltcG9ydCgnLi9kcmFnLXJlZicpLlBibERyYWdSZWY8VD4gfT4oKTtcblxuICB3aXRoRWxlbWVudChlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiB8IEhUTUxFbGVtZW50KTogdGhpcyB7XG4gICAgLy8gVE9ETzogV29ya2Fyb3VuZCwgc2VlIGlmIHdlIGNhbiBwdXNoIHRoaXMgdGhyb3VnaCBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE1MDg2XG4gICAgKHRoaXMgYXMgeyAtcmVhZG9ubHkgW1AgaW4ga2V5b2YgUGJsRHJvcExpc3RSZWZdOiBQYmxEcm9wTGlzdFJlZltQXSB9KS5lbGVtZW50ID0gY29lcmNlRWxlbWVudChlbGVtZW50KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5iZWZvcmVFeGl0LmNvbXBsZXRlKCk7XG4gICAgc3VwZXIuZGlzcG9zZSgpO1xuICB9XG59XG4iXX0=