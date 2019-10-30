/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { DropListRef } from '@angular/cdk/drag-drop';
import { coerceElement } from '@angular/cdk/coercion';
/**
 * @template T
 */
export class PblDropListRef extends DropListRef {
    constructor() {
        super(...arguments);
        /**
         * Emits right before dragging has started.
         */
        this.beforeExit = new Subject();
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} element
     * @return {THIS}
     */
    withElement(element) {
        // TODO: Workaround, see if we can push this through https://github.com/angular/material2/issues/15086
        ((/** @type {?} */ ((/** @type {?} */ (this))))).element = coerceElement(element);
        return (/** @type {?} */ (this));
    }
    /**
     * @return {?}
     */
    dispose() {
        this.beforeExit.complete();
        super.dispose();
    }
}
if (false) {
    /**
     * Emits right before dragging has started.
     * @type {?}
     */
    PblDropListRef.prototype.beforeExit;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1saXN0LXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvcmUvZHJvcC1saXN0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBSXRELE1BQU0sT0FBTyxjQUF3QixTQUFRLFdBQWM7SUFBM0Q7Ozs7O1FBRUUsZUFBVSxHQUFHLElBQUksT0FBTyxFQUEyQixDQUFDO0lBWXRELENBQUM7Ozs7Ozs7SUFWQyxXQUFXLENBQUMsT0FBOEM7UUFDeEQsc0dBQXNHO1FBQ3RHLENBQUMsbUJBQUEsbUJBQUEsSUFBSSxFQUFBLEVBQWdFLENBQUMsQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hHLE9BQU8sbUJBQUEsSUFBSSxFQUFBLENBQUM7SUFDZCxDQUFDOzs7O0lBRUQsT0FBTztRQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDRjs7Ozs7O0lBWkMsb0NBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHJvcExpc3RSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7IGNvZXJjZUVsZW1lbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi9kcmFnLXJlZic7XG5cbmV4cG9ydCBjbGFzcyBQYmxEcm9wTGlzdFJlZjxUID0gYW55PiBleHRlbmRzIERyb3BMaXN0UmVmPFQ+IHtcbiAgLyoqIEVtaXRzIHJpZ2h0IGJlZm9yZSBkcmFnZ2luZyBoYXMgc3RhcnRlZC4gKi9cbiAgYmVmb3JlRXhpdCA9IG5ldyBTdWJqZWN0PHsgaXRlbTogUGJsRHJhZ1JlZjxUPiB9PigpO1xuXG4gIHdpdGhFbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgSFRNTEVsZW1lbnQpOiB0aGlzIHtcbiAgICAvLyBUT0RPOiBXb3JrYXJvdW5kLCBzZWUgaWYgd2UgY2FuIHB1c2ggdGhpcyB0aHJvdWdoIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTUwODZcbiAgICAodGhpcyBhcyB7IC1yZWFkb25seSBbUCBpbiBrZXlvZiBQYmxEcm9wTGlzdFJlZl06IFBibERyb3BMaXN0UmVmW1BdIH0pLmVsZW1lbnQgPSBjb2VyY2VFbGVtZW50KGVsZW1lbnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLmJlZm9yZUV4aXQuY29tcGxldGUoKTtcbiAgICBzdXBlci5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==