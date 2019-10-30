/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvYmxvY2stdWkvIiwic291cmNlcyI6WyJsaWIvYmxvY2stdWkvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBcUIsdUJBQXVCLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFZM0csTUFBTSxPQUFPLDJCQUE0QixTQUFRLDhCQUFnRjs7Ozs7SUFFL0gsWUFBWSxJQUF3RCxFQUFFLFFBQWlDO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUR4SCxTQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ3dHLENBQUM7OztZQUhwSSxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7Ozs7WUFaM0IsV0FBVztZQUNILHVCQUF1Qjs7OztJQWFqRCwyQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy90YWJsZS1yZWdpc3RyeS5zZXJ2aWNlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwIHtcbiAgICBibG9ja2VyPzogUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlO1xuICB9XG59XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCB3aGVuIHRoZSBmb3JtIGlzIGJ1c3kuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZEJsb2NrVWlEZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQmxvY2tVaURlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAnYmxvY2tlcic+IHtcbiAgcmVhZG9ubHkga2luZCA9ICdibG9ja2VyJztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfT4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cbiJdfQ==