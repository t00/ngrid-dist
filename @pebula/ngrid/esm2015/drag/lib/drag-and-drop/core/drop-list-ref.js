/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/core/drop-list-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC1saXN0LXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvcmUvZHJvcC1saXN0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFL0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUV0RCxNQUFNLE9BQU8sY0FBd0IsU0FBUSxXQUFjO0lBQTNEOzs7OztRQUVFLGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBZ0QsQ0FBQztJQVkzRSxDQUFDOzs7Ozs7O0lBVkMsV0FBVyxDQUFDLE9BQThDO1FBQ3hELHNHQUFzRztRQUN0RyxDQUFDLG1CQUFBLG1CQUFBLElBQUksRUFBQSxFQUFnRSxDQUFDLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4RyxPQUFPLG1CQUFBLElBQUksRUFBQSxDQUFDO0lBQ2QsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7Ozs7OztJQVpDLG9DQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERyb3BMaXN0UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQgeyBjb2VyY2VFbGVtZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuZXhwb3J0IGNsYXNzIFBibERyb3BMaXN0UmVmPFQgPSBhbnk+IGV4dGVuZHMgRHJvcExpc3RSZWY8VD4ge1xuICAvKiogRW1pdHMgcmlnaHQgYmVmb3JlIGRyYWdnaW5nIGhhcyBzdGFydGVkLiAqL1xuICBiZWZvcmVFeGl0ID0gbmV3IFN1YmplY3Q8eyBpdGVtOiBpbXBvcnQoJy4vZHJhZy1yZWYnKS5QYmxEcmFnUmVmPFQ+IH0+KCk7XG5cbiAgd2l0aEVsZW1lbnQoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBIVE1MRWxlbWVudCk6IHRoaXMge1xuICAgIC8vIFRPRE86IFdvcmthcm91bmQsIHNlZSBpZiB3ZSBjYW4gcHVzaCB0aGlzIHRocm91Z2ggaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNTA4NlxuICAgICh0aGlzIGFzIHsgLXJlYWRvbmx5IFtQIGluIGtleW9mIFBibERyb3BMaXN0UmVmXTogUGJsRHJvcExpc3RSZWZbUF0gfSkuZWxlbWVudCA9IGNvZXJjZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMuYmVmb3JlRXhpdC5jb21wbGV0ZSgpO1xuICAgIHN1cGVyLmRpc3Bvc2UoKTtcbiAgfVxufVxuIl19