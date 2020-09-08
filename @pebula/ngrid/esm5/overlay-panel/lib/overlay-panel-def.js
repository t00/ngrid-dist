/**
 * @fileoverview added by tsickle
 * Generated from: lib/overlay-panel-def.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
var PblNgridOverlayPanelDef = /** @class */ (function (_super) {
    __extends(PblNgridOverlayPanelDef, _super);
    function PblNgridOverlayPanelDef(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'overlayPanels';
        return _this;
    }
    PblNgridOverlayPanelDef.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridOverlayPanelDef]' },] }
    ];
    /** @nocollapse */
    PblNgridOverlayPanelDef.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    PblNgridOverlayPanelDef.propDecorators = {
        name: [{ type: Input, args: ['pblNgridOverlayPanelDef',] }]
    };
    return PblNgridOverlayPanelDef;
}(PblNgridMultiTemplateRegistry));
export { PblNgridOverlayPanelDef };
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.kind;
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBcUIsNkJBQTZCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBRzFHLGlEQUdDOzs7SUFGQywyQ0FBMkI7O0lBQzNCLDBDQUE2Qjs7QUFHL0I7SUFDNkMsMkNBQWlFO0lBSzVHLGlDQUFZLElBQW9DLEVBQUUsUUFBaUM7UUFBbkYsWUFBdUYsa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFHO1FBSHRHLFVBQUksR0FBb0IsZUFBZSxDQUFDOztJQUc2RCxDQUFDOztnQkFOaEgsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDJCQUEyQixFQUFFOzs7O2dCQVRoQyxXQUFXO2dCQUM0Qix1QkFBdUI7Ozt1QkFZL0UsS0FBSyxTQUFDLHlCQUF5Qjs7SUFHbEMsOEJBQUM7Q0FBQSxBQVBELENBQzZDLDZCQUE2QixHQU16RTtTQU5ZLHVCQUF1Qjs7O0lBRWxDLHVDQUFpRDs7SUFDakQsdUNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLXJlZic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0PFQgPSBhbnk+IHtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZE92ZXJsYXlQYW5lbERlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdmVybGF5UGFuZWxEZWYgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZENvbXBvbmVudCwgJ292ZXJsYXlQYW5lbHMnPiB7XG5cbiAgcmVhZG9ubHkga2luZDogJ292ZXJsYXlQYW5lbHMnID0gJ292ZXJsYXlQYW5lbHMnO1xuICBASW5wdXQoJ3BibE5ncmlkT3ZlcmxheVBhbmVsRGVmJykgbmFtZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ29tcG9uZW50PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19