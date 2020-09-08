/**
 * @fileoverview added by tsickle
 * Generated from: lib/block-ui/directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the display element when the form is busy.
 */
var PblNgridBlockUiDefDirective = /** @class */ (function (_super) {
    __extends(PblNgridBlockUiDefDirective, _super);
    function PblNgridBlockUiDefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'blocker';
        return _this;
    }
    PblNgridBlockUiDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridBlockUiDef]' },] }
    ];
    /** @nocollapse */
    PblNgridBlockUiDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridBlockUiDefDirective;
}(PblNgridSingleTemplateRegistry));
export { PblNgridBlockUiDefDirective };
if (false) {
    /** @type {?} */
    PblNgridBlockUiDefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvYmxvY2stdWkvIiwic291cmNlcyI6WyJsaWIvYmxvY2stdWkvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFxQix1QkFBdUIsRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVczRztJQUNpRCwrQ0FBZ0Y7SUFFL0gscUNBQVksSUFBd0QsRUFBRSxRQUFpQztRQUF2RyxZQUEyRyxrQkFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQUc7UUFEMUgsVUFBSSxHQUFHLFNBQVMsQ0FBQzs7SUFDd0csQ0FBQzs7Z0JBSHBJLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztnQkFaM0IsV0FBVztnQkFDSCx1QkFBdUI7O0lBZW5ELGtDQUFDO0NBQUEsQUFKRCxDQUNpRCw4QkFBOEIsR0FHOUU7U0FIWSwyQkFBMkI7OztJQUN0QywyQ0FBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZScge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCB7XG4gICAgYmxvY2tlcj86IFBibE5ncmlkQmxvY2tVaURlZkRpcmVjdGl2ZTtcbiAgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgd2hlbiB0aGUgZm9ybSBpcyBidXN5LlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRCbG9ja1VpRGVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfSwgJ2Jsb2NrZXInPiB7XG4gIHJlYWRvbmx5IGtpbmQgPSAnYmxvY2tlcic7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IH0+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG4iXX0=