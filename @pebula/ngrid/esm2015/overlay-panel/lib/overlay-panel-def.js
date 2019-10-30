/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, Input } from '@angular/core';
import { PblNgridMultiTemplateRegistry, PblNgridRegistryService } from '@pebula/ngrid';
/**
 * @record
 * @template T
 */
export function PblNgridOverlayPanelContext() { }
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelContext.prototype.grid;
    /** @type {?} */
    PblNgridOverlayPanelContext.prototype.ref;
}
export class PblNgridOverlayPanelDef extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'overlayPanels';
    }
}
PblNgridOverlayPanelDef.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridOverlayPanelDef]' },] }
];
/** @nocollapse */
PblNgridOverlayPanelDef.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
PblNgridOverlayPanelDef.propDecorators = {
    name: [{ type: Input, args: ['pblNgridOverlayPanelDef',] }]
};
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.kind;
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQXFCLDZCQUE2QixFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUcxRyxpREFHQzs7O0lBRkMsMkNBQTJCOztJQUMzQiwwQ0FBNkI7O0FBSS9CLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSw2QkFBaUU7Ozs7O0lBSzVHLFlBQVksSUFBb0MsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFIcEcsU0FBSSxHQUFvQixlQUFlLENBQUM7SUFHNkQsQ0FBQzs7O1lBTmhILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSwyQkFBMkIsRUFBRTs7OztZQVRoQyxXQUFXO1lBQzRCLHVCQUF1Qjs7O21CQVkvRSxLQUFLLFNBQUMseUJBQXlCOzs7O0lBRGhDLHVDQUFpRDs7SUFDakQsdUNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLXJlZic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0PFQgPSBhbnk+IHtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZE92ZXJsYXlQYW5lbERlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdmVybGF5UGFuZWxEZWYgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZENvbXBvbmVudCwgJ292ZXJsYXlQYW5lbHMnPiB7XG5cbiAgcmVhZG9ubHkga2luZDogJ292ZXJsYXlQYW5lbHMnID0gJ292ZXJsYXlQYW5lbHMnO1xuICBASW5wdXQoJ3BibE5ncmlkT3ZlcmxheVBhbmVsRGVmJykgbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ29tcG9uZW50PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19