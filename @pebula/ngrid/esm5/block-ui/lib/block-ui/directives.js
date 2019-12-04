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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvYmxvY2stdWkvIiwic291cmNlcyI6WyJsaWIvYmxvY2stdWkvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQXFCLHVCQUF1QixFQUFFLDhCQUE4QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBVzNHO0lBQ2lELHVEQUFnRjtJQUUvSCxxQ0FBWSxJQUF3RCxFQUFFLFFBQWlDO1FBQXZHLFlBQTJHLGtCQUFNLElBQUksRUFBRSxRQUFRLENBQUMsU0FBRztRQUQxSCxVQUFJLEdBQUcsU0FBUyxDQUFDOztJQUN3RyxDQUFDOztnQkFIcEksU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7O2dCQVozQixXQUFXO2dCQUNILHVCQUF1Qjs7SUFlbkQsa0NBQUM7Q0FBQSxBQUpELENBQ2lELDhCQUE4QixHQUc5RTtTQUhZLDJCQUEyQjs7O0lBQ3RDLDJDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnkgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwIHtcbiAgICBibG9ja2VyPzogUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlO1xuICB9XG59XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCB3aGVuIHRoZSBmb3JtIGlzIGJ1c3kuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZEJsb2NrVWlEZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQmxvY2tVaURlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAnYmxvY2tlcic+IHtcbiAgcmVhZG9ubHkga2luZCA9ICdibG9ja2VyJztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfT4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cbiJdfQ==