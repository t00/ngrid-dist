/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    tslib_1.__extends(PblNgridOverlayPanelDef, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFxQiw2QkFBNkIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFHMUcsaURBR0M7OztJQUZDLDJDQUEyQjs7SUFDM0IsMENBQTZCOztBQUcvQjtJQUM2QyxtREFBaUU7SUFLNUcsaUNBQVksSUFBb0MsRUFBRSxRQUFpQztRQUFuRixZQUF1RixrQkFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQUc7UUFIdEcsVUFBSSxHQUFvQixlQUFlLENBQUM7O0lBRzZELENBQUM7O2dCQU5oSCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMkJBQTJCLEVBQUU7Ozs7Z0JBVGhDLFdBQVc7Z0JBQzRCLHVCQUF1Qjs7O3VCQVkvRSxLQUFLLFNBQUMseUJBQXlCOztJQUdsQyw4QkFBQztDQUFBLEFBUEQsQ0FDNkMsNkJBQTZCLEdBTXpFO1NBTlksdUJBQXVCOzs7SUFFbEMsdUNBQWlEOztJQUNqRCx1Q0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5LCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYgfSBmcm9tICcuL292ZXJsYXktcGFuZWwtcmVmJztcblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQ8VCA9IGFueT4ge1xuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjtcbn1cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkT3ZlcmxheVBhbmVsRGVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbERlZiBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkQ29tcG9uZW50LCAnb3ZlcmxheVBhbmVscyc+IHtcblxuICByZWFkb25seSBraW5kOiAnb3ZlcmxheVBhbmVscycgPSAnb3ZlcmxheVBhbmVscyc7XG4gIEBJbnB1dCgncGJsTmdyaWRPdmVybGF5UGFuZWxEZWYnKSBuYW1lOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRDb21wb25lbnQ+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG4iXX0=