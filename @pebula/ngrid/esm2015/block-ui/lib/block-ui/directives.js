/**
 * @fileoverview added by tsickle
 * Generated from: lib/block-ui/directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the display element when the form is busy.
 */
export class PblNgridBlockUiDefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'blocker';
    }
}
PblNgridBlockUiDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridBlockUiDef]' },] }
];
/** @nocollapse */
PblNgridBlockUiDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridBlockUiDefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvYmxvY2stdWkvIiwic291cmNlcyI6WyJsaWIvYmxvY2stdWkvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXFCLHVCQUF1QixFQUFFLDhCQUE4QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBWTNHLE1BQU0sT0FBTywyQkFBNEIsU0FBUSw4QkFBZ0Y7Ozs7O0lBRS9ILFlBQVksSUFBd0QsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEeEgsU0FBSSxHQUFHLFNBQVMsQ0FBQztJQUN3RyxDQUFDOzs7WUFIcEksU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7O1lBWjNCLFdBQVc7WUFDSCx1QkFBdUI7Ozs7SUFhakQsMkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9ncmlkLXJlZ2lzdHJ5LnNlcnZpY2UnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXAge1xuICAgIGJsb2NrZXI/OiBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmU7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgZGlzcGxheSBlbGVtZW50IHdoZW4gdGhlIGZvcm0gaXMgYnVzeS5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkQmxvY2tVaURlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PHsgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IH0sICdibG9ja2VyJz4ge1xuICByZWFkb25seSBraW5kID0gJ2Jsb2NrZXInO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19