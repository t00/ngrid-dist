/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/core/drag-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { EventEmitter } from '@angular/core';
import { coerceElement } from '@angular/cdk/coercion';
import { DragRef } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
/**
 * @template T
 */
export class PblDragRef extends DragRef {
    /**
     * @param {...?} args
     */
    constructor(...args) {
        super(...args);
        /**
         * Fires when the root element changes
         *
         * > Does not emit on the initial setup.
         */
        this.rootElementChanged = new EventEmitter();
        this.exited.subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            const { container } = e;
            if (container instanceof PblDropListRef) {
                container.beforeExit.next({ item: this });
            }
        }));
    }
    /**
     * Sets an alternate drag root element. The root element is the element that will be moved as
     * the user is dragging. Passing an alternate root element is useful when trying to enable
     * dragging on an element that you might not have access to.
     * @template THIS
     * @this {THIS}
     * @param {?} rootElement
     * @return {THIS}
     */
    withRootElement(rootElement) {
        // the first call to `withRootElement` comes from the base class, before we construct the emitter.
        // We don't need it anyway...
        if ((/** @type {?} */ (this)).rootElementChanged) {
            /** @type {?} */
            const element = coerceElement(rootElement);
            if ((/** @type {?} */ (this)).getRootElement() !== element) {
                (/** @type {?} */ (this)).rootElementChanged.next({ prev: (/** @type {?} */ (this)).getRootElement(), curr: element });
            }
        }
        return super.withRootElement(rootElement);
    }
    /**
     * @return {?}
     */
    dispose() {
        this.rootElementChanged.complete();
        super.dispose();
    }
}
if (false) {
    /**
     * Fires when the root element changes
     *
     * > Does not emit on the initial setup.
     * @type {?}
     */
    PblDragRef.prototype.rootElementChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2RyYWctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWpELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUVqRCxNQUFNLE9BQU8sVUFBb0IsU0FBUSxPQUFVOzs7O0lBWWpELFlBQVksR0FBRyxJQUEyQztRQUN4RCxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQzs7Ozs7O1FBTmpCLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUdqQyxDQUFDO1FBSUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUU7a0JBQ25CLEVBQUUsU0FBUyxFQUFFLEdBQUcsQ0FBQztZQUN2QixJQUFJLFNBQVMsWUFBWSxjQUFjLEVBQUU7Z0JBQ3ZDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDM0M7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7Ozs7SUFPRCxlQUFlLENBQUMsV0FBa0Q7UUFDaEUsa0dBQWtHO1FBQ2xHLDZCQUE2QjtRQUM3QixJQUFJLG1CQUFBLElBQUksRUFBQSxDQUFDLGtCQUFrQixFQUFFOztrQkFDckIsT0FBTyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDMUMsSUFBSSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxjQUFjLEVBQUUsS0FBSyxPQUFPLEVBQUU7Z0JBQ3JDLG1CQUFBLElBQUksRUFBQSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQUEsQ0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTthQUM3RTtTQUNGO1FBQ0QsT0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7Ozs7Ozs7O0lBcENDLHdDQUdLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VFbGVtZW50IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERyYWdSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsRHJvcExpc3RSZWYgfSBmcm9tICcuL2Ryb3AtbGlzdC1yZWYnO1xuXG5leHBvcnQgY2xhc3MgUGJsRHJhZ1JlZjxUID0gYW55PiBleHRlbmRzIERyYWdSZWY8VD4ge1xuXG4gIC8qKlxuICAgKiBGaXJlcyB3aGVuIHRoZSByb290IGVsZW1lbnQgY2hhbmdlc1xuICAgKlxuICAgKiA+IERvZXMgbm90IGVtaXQgb24gdGhlIGluaXRpYWwgc2V0dXAuXG4gICAqL1xuICByb290RWxlbWVudENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHtcbiAgICBwcmV2OiBIVE1MRWxlbWVudDtcbiAgICBjdXJyOiBIVE1MRWxlbWVudDtcbiAgfT4oKTtcblxuICBjb25zdHJ1Y3RvciguLi5hcmdzOiBDb25zdHJ1Y3RvclBhcmFtZXRlcnM8dHlwZW9mIERyYWdSZWY+KSB7XG4gICAgc3VwZXIoLi4uYXJncyk7XG4gICAgdGhpcy5leGl0ZWQuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgIGNvbnN0IHsgY29udGFpbmVyIH0gPSBlO1xuICAgICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIFBibERyb3BMaXN0UmVmKSB7XG4gICAgICAgIGNvbnRhaW5lci5iZWZvcmVFeGl0Lm5leHQoeyBpdGVtOiB0aGlzIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYW4gYWx0ZXJuYXRlIGRyYWcgcm9vdCBlbGVtZW50LiBUaGUgcm9vdCBlbGVtZW50IGlzIHRoZSBlbGVtZW50IHRoYXQgd2lsbCBiZSBtb3ZlZCBhc1xuICAgKiB0aGUgdXNlciBpcyBkcmFnZ2luZy4gUGFzc2luZyBhbiBhbHRlcm5hdGUgcm9vdCBlbGVtZW50IGlzIHVzZWZ1bCB3aGVuIHRyeWluZyB0byBlbmFibGVcbiAgICogZHJhZ2dpbmcgb24gYW4gZWxlbWVudCB0aGF0IHlvdSBtaWdodCBub3QgaGF2ZSBhY2Nlc3MgdG8uXG4gICAqL1xuICB3aXRoUm9vdEVsZW1lbnQocm9vdEVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+IHwgSFRNTEVsZW1lbnQpOiB0aGlzIHtcbiAgICAvLyB0aGUgZmlyc3QgY2FsbCB0byBgd2l0aFJvb3RFbGVtZW50YCBjb21lcyBmcm9tIHRoZSBiYXNlIGNsYXNzLCBiZWZvcmUgd2UgY29uc3RydWN0IHRoZSBlbWl0dGVyLlxuICAgIC8vIFdlIGRvbid0IG5lZWQgaXQgYW55d2F5Li4uXG4gICAgaWYgKHRoaXMucm9vdEVsZW1lbnRDaGFuZ2VkKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gY29lcmNlRWxlbWVudChyb290RWxlbWVudCk7XG4gICAgICBpZiAodGhpcy5nZXRSb290RWxlbWVudCgpICE9PSBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnRDaGFuZ2VkLm5leHQoeyBwcmV2OiB0aGlzLmdldFJvb3RFbGVtZW50KCksIGN1cnI6IGVsZW1lbnQgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLndpdGhSb290RWxlbWVudChyb290RWxlbWVudCk7XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIHRoaXMucm9vdEVsZW1lbnRDaGFuZ2VkLmNvbXBsZXRlKCk7XG4gICAgc3VwZXIuZGlzcG9zZSgpO1xuICB9XG59XG4iXX0=