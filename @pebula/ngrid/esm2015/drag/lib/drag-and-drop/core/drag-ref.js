/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RyYWcvIiwic291cmNlcyI6WyJsaWIvZHJhZy1hbmQtZHJvcC9jb3JlL2RyYWctcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRWpELE1BQU0sT0FBTyxVQUFvQixTQUFRLE9BQVU7Ozs7SUFZakQsWUFBWSxHQUFHLElBQTJDO1FBQ3hELEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDOzs7Ozs7UUFOakIsdUJBQWtCLEdBQUcsSUFBSSxZQUFZLEVBR2pDLENBQUM7UUFJSCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRTtrQkFDbkIsRUFBRSxTQUFTLEVBQUUsR0FBRyxDQUFDO1lBQ3ZCLElBQUksU0FBUyxZQUFZLGNBQWMsRUFBRTtnQkFDdkMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7Ozs7OztJQU9ELGVBQWUsQ0FBQyxXQUFrRDtRQUNoRSxrR0FBa0c7UUFDbEcsNkJBQTZCO1FBQzdCLElBQUksbUJBQUEsSUFBSSxFQUFBLENBQUMsa0JBQWtCLEVBQUU7O2tCQUNyQixPQUFPLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUMxQyxJQUFJLG1CQUFBLElBQUksRUFBQSxDQUFDLGNBQWMsRUFBRSxLQUFLLE9BQU8sRUFBRTtnQkFDckMsbUJBQUEsSUFBSSxFQUFBLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBQSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO2FBQzdFO1NBQ0Y7UUFDRCxPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7OztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2xCLENBQUM7Q0FDRjs7Ozs7Ozs7SUFwQ0Msd0NBR0siLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUVsZW1lbnQgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgRHJhZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuXG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4vZHJvcC1saXN0LXJlZic7XG5cbmV4cG9ydCBjbGFzcyBQYmxEcmFnUmVmPFQgPSBhbnk+IGV4dGVuZHMgRHJhZ1JlZjxUPiB7XG5cbiAgLyoqXG4gICAqIEZpcmVzIHdoZW4gdGhlIHJvb3QgZWxlbWVudCBjaGFuZ2VzXG4gICAqXG4gICAqID4gRG9lcyBub3QgZW1pdCBvbiB0aGUgaW5pdGlhbCBzZXR1cC5cbiAgICovXG4gIHJvb3RFbGVtZW50Q2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHByZXY6IEhUTUxFbGVtZW50O1xuICAgIGN1cnI6IEhUTUxFbGVtZW50O1xuICB9PigpO1xuXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IENvbnN0cnVjdG9yUGFyYW1ldGVyczx0eXBlb2YgRHJhZ1JlZj4pIHtcbiAgICBzdXBlciguLi5hcmdzKTtcbiAgICB0aGlzLmV4aXRlZC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgY29uc3QgeyBjb250YWluZXIgfSA9IGU7XG4gICAgICBpZiAoY29udGFpbmVyIGluc3RhbmNlb2YgUGJsRHJvcExpc3RSZWYpIHtcbiAgICAgICAgY29udGFpbmVyLmJlZm9yZUV4aXQubmV4dCh7IGl0ZW06IHRoaXMgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBhbiBhbHRlcm5hdGUgZHJhZyByb290IGVsZW1lbnQuIFRoZSByb290IGVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIG1vdmVkIGFzXG4gICAqIHRoZSB1c2VyIGlzIGRyYWdnaW5nLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSByb290IGVsZW1lbnQgaXMgdXNlZnVsIHdoZW4gdHJ5aW5nIHRvIGVuYWJsZVxuICAgKiBkcmFnZ2luZyBvbiBhbiBlbGVtZW50IHRoYXQgeW91IG1pZ2h0IG5vdCBoYXZlIGFjY2VzcyB0by5cbiAgICovXG4gIHdpdGhSb290RWxlbWVudChyb290RWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4gfCBIVE1MRWxlbWVudCk6IHRoaXMge1xuICAgIC8vIHRoZSBmaXJzdCBjYWxsIHRvIGB3aXRoUm9vdEVsZW1lbnRgIGNvbWVzIGZyb20gdGhlIGJhc2UgY2xhc3MsIGJlZm9yZSB3ZSBjb25zdHJ1Y3QgdGhlIGVtaXR0ZXIuXG4gICAgLy8gV2UgZG9uJ3QgbmVlZCBpdCBhbnl3YXkuLi5cbiAgICBpZiAodGhpcy5yb290RWxlbWVudENoYW5nZWQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBjb2VyY2VFbGVtZW50KHJvb3RFbGVtZW50KTtcbiAgICAgIGlmICh0aGlzLmdldFJvb3RFbGVtZW50KCkgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudENoYW5nZWQubmV4dCh7IHByZXY6IHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwgY3VycjogZWxlbWVudCB9KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3VwZXIud2l0aFJvb3RFbGVtZW50KHJvb3RFbGVtZW50KTtcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5yb290RWxlbWVudENoYW5nZWQuY29tcGxldGUoKTtcbiAgICBzdXBlci5kaXNwb3NlKCk7XG4gIH1cbn1cbiJdfQ==