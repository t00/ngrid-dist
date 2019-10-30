/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the display element when the form is busy.
 */
var PblNgridBlockUiDefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridBlockUiDefDirective, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvYmxvY2stdWkvIiwic291cmNlcyI6WyJsaWIvYmxvY2stdWkvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXFCLHVCQUF1QixFQUFFLDhCQUE4QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBVzNHO0lBQ2lELHVEQUFnRjtJQUUvSCxxQ0FBWSxJQUF3RCxFQUFFLFFBQWlDO1FBQXZHLFlBQTJHLGtCQUFNLElBQUksRUFBRSxRQUFRLENBQUMsU0FBRztRQUQxSCxVQUFJLEdBQUcsU0FBUyxDQUFDOztJQUN3RyxDQUFDOztnQkFIcEksU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7O2dCQVozQixXQUFXO2dCQUNILHVCQUF1Qjs7SUFlbkQsa0NBQUM7Q0FBQSxBQUpELENBQ2lELDhCQUE4QixHQUc5RTtTQUhZLDJCQUEyQjs7O0lBQ3RDLDJDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnkgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXAge1xuICAgIGJsb2NrZXI/OiBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmU7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgZGlzcGxheSBlbGVtZW50IHdoZW4gdGhlIGZvcm0gaXMgYnVzeS5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkQmxvY2tVaURlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PHsgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IH0sICdibG9ja2VyJz4ge1xuICByZWFkb25seSBraW5kID0gJ2Jsb2NrZXInO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19