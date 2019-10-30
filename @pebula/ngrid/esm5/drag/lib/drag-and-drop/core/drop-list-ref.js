/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    tslib_1.__extends(PblDropListRef, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1saXN0LXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvcmUvZHJvcC1saXN0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUl0RDs7OztJQUE2QywwQ0FBYztJQUEzRDtRQUFBLHFFQWNDOzs7O1FBWkMsZ0JBQVUsR0FBRyxJQUFJLE9BQU8sRUFBMkIsQ0FBQzs7SUFZdEQsQ0FBQzs7Ozs7OztJQVZDLG9DQUFXOzs7Ozs7SUFBWCxVQUFZLE9BQThDO1FBQ3hELHNHQUFzRztRQUN0RyxDQUFDLG1CQUFBLG1CQUFBLElBQUksRUFBQSxFQUFnRSxDQUFDLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELGdDQUFPOzs7SUFBUDtRQUNFLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsaUJBQU0sT0FBTyxXQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWRELENBQTZDLFdBQVcsR0FjdkQ7Ozs7Ozs7Ozs7SUFaQyxvQ0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEcm9wTGlzdFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgY29lcmNlRWxlbWVudCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuL2RyYWctcmVmJztcblxuZXhwb3J0IGNsYXNzIFBibERyb3BMaXN0UmVmPFQgPSBhbnk+IGV4dGVuZHMgRHJvcExpc3RSZWY8VD4ge1xuICAvKiogRW1pdHMgcmlnaHQgYmVmb3JlIGRyYWdnaW5nIGhhcyBzdGFydGVkLiAqL1xuICBiZWZvcmVFeGl0ID0gbmV3IFN1YmplY3Q8eyBpdGVtOiBQYmxEcmFnUmVmPFQ+IH0+KCk7XG5cbiAgd2l0aEVsZW1lbnQoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBIVE1MRWxlbWVudCk6IHRoaXMge1xuICAgIC8vIFRPRE86IFdvcmthcm91bmQsIHNlZSBpZiB3ZSBjYW4gcHVzaCB0aGlzIHRocm91Z2ggaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNTA4NlxuICAgICh0aGlzIGFzIHsgLXJlYWRvbmx5IFtQIGluIGtleW9mIFBibERyb3BMaXN0UmVmXTogUGJsRHJvcExpc3RSZWZbUF0gfSkuZWxlbWVudCA9IGNvZXJjZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuYmVmb3JlRXhpdC5jb21wbGV0ZSgpO1xuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIl19