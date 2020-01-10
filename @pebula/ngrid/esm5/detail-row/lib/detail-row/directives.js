/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-host-property-decorator
import { Component, Directive, IterableDiffers, TemplateRef, } from '@angular/core';
import { CdkRowDef } from '@angular/cdk/table';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the display element for the detail row itself.
 */
var PblNgridDetailRowDefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridDetailRowDefDirective, _super);
    function PblNgridDetailRowDefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'detailRow';
        return _this;
    }
    PblNgridDetailRowDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridDetailRowDef]' },] }
    ];
    /** @nocollapse */
    PblNgridDetailRowDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridDetailRowDefDirective;
}(PblNgridSingleTemplateRegistry));
export { PblNgridDetailRowDefDirective };
if (false) {
    /** @type {?} */
    PblNgridDetailRowDefDirective.prototype.kind;
}
/**
 * @template T
 */
var PblNgridDetailRowParentRefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridDetailRowParentRefDirective, _super);
    function PblNgridDetailRowParentRefDirective(template, _differs, registry) {
        var _this = _super.call(this, template, _differs) || this;
        _this.registry = registry;
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridDetailRowParentRefDirective.prototype.clone = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var clone = Object.create(this);
        this._columnsDiffer = this.columns = undefined;
        return clone;
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowParentRefDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.registry.setSingle('detailRowParent', (/** @type {?} */ (this)));
    };
    /**
     * @return {?}
     */
    PblNgridDetailRowParentRefDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.registry.setSingle('detailRowParent', undefined);
    };
    PblNgridDetailRowParentRefDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pblNgridDetailRowParentRef]',
                    inputs: ['columns: pblNgridDetailRowParentRef', 'when: pblNgridDetailRowParentRefWhen'],
                },] }
    ];
    /** @nocollapse */
    PblNgridDetailRowParentRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: IterableDiffers },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridDetailRowParentRefDirective;
}(CdkRowDef));
export { PblNgridDetailRowParentRefDirective };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    PblNgridDetailRowParentRefDirective.prototype.registry;
}
/**
 * Use to set the a default `pblNgridDetailRowParentRef` if the user did not set one.
 * \@internal
 */
var PblNgridDefaultDetailRowParentComponent = /** @class */ (function () {
    function PblNgridDefaultDetailRowParentComponent() {
    }
    PblNgridDefaultDetailRowParentComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbl-ngrid-default-detail-row-parent',
                    template: "<pbl-ngrid-row *pblNgridDetailRowParentRef=\"let row; gridInstance as gridInstance\" [grid]=\"gridInstance\" [detailRow]=\"row\"></pbl-ngrid-row>"
                }] }
    ];
    return PblNgridDefaultDetailRowParentComponent;
}());
export { PblNgridDefaultDetailRowParentComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZGV0YWlsLXJvdy8iLCJzb3VyY2VzIjpbImxpYi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUdmLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLDhCQUE4QixFQUFzQixNQUFNLGVBQWUsQ0FBQzs7OztBQVk1RztJQUNtRCx5REFBb0U7SUFFckgsdUNBQVksSUFBMEMsRUFBRSxRQUFpQztRQUF6RixZQUE2RixrQkFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQUc7UUFENUcsVUFBSSxHQUFnQixXQUFXLENBQUM7O0lBQzJFLENBQUM7O2dCQUh0SCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7Z0JBaEIvQyxXQUFXO2dCQUlKLHVCQUF1Qjs7SUFnQmhDLG9DQUFDO0NBQUEsQUFKRCxDQUNtRCw4QkFBOEIsR0FHaEY7U0FIWSw2QkFBNkI7OztJQUN4Qyw2Q0FBeUM7Ozs7O0FBSTNDO0lBSTRELCtEQUFZO0lBRXRFLDZDQUFZLFFBQTRDLEVBQUUsUUFBeUIsRUFBWSxRQUFpQztRQUFoSSxZQUNFLGtCQUFNLFFBQVEsRUFBRSxRQUFRLENBQUMsU0FDMUI7UUFGOEYsY0FBUSxHQUFSLFFBQVEsQ0FBeUI7O0lBRWhJLENBQUM7Ozs7SUFFRCxtREFBSzs7O0lBQUw7O1lBQ1EsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDL0MsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsc0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQseURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUcsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxNQUFNLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxzQ0FBc0MsQ0FBQztpQkFDeEY7Ozs7Z0JBekJDLFdBQVc7Z0JBSFgsZUFBZTtnQkFPUix1QkFBdUI7O0lBeUNoQywwQ0FBQztDQUFBLEFBdkJELENBSTRELFNBQVMsR0FtQnBFO1NBbkJZLG1DQUFtQzs7Ozs7O0lBRXVDLHVEQUEyQzs7Ozs7O0FBdUJsSTtJQUFBO0lBSXVELENBQUM7O2dCQUp2RCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsUUFBUSxFQUFFLG1KQUE2STtpQkFDeEo7O0lBQ3NELDhDQUFDO0NBQUEsQUFKeEQsSUFJd0Q7U0FBM0MsdUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZScge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCB7XG4gICAgZGV0YWlsUm93UGFyZW50PzogUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8YW55PjtcbiAgICBkZXRhaWxSb3c/OiBQYmxOZ3JpZERldGFpbFJvd0RlZkRpcmVjdGl2ZTtcbiAgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgZm9yIHRoZSBkZXRhaWwgcm93IGl0c2VsZi5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkRGV0YWlsUm93RGVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd0RlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZFJvd0NvbnRleHQ8YW55PiwgJ2RldGFpbFJvdyc+IHtcbiAgcmVhZG9ubHkga2luZDogJ2RldGFpbFJvdycgPSAnZGV0YWlsUm93JztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRSb3dDb250ZXh0PGFueT4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZl0nLFxuICBpbnB1dHM6IFsnY29sdW1uczogcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWYnLCAnd2hlbjogcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZXaGVuJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrUm93RGVmPFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZFJvd0NvbnRleHQ8VD4+LCBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7XG4gICAgc3VwZXIodGVtcGxhdGUsIF9kaWZmZXJzKTtcbiAgfVxuXG4gIGNsb25lKCk6IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPFQ+IHtcbiAgICBjb25zdCBjbG9uZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgdGhpcy5fY29sdW1uc0RpZmZlciA9IHRoaXMuY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSgnZGV0YWlsUm93UGFyZW50JywgdGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUoJ2RldGFpbFJvd1BhcmVudCcsICB1bmRlZmluZWQpO1xuICB9XG59XG5cbi8qKlxuICogVXNlIHRvIHNldCB0aGUgYSBkZWZhdWx0IGBwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZmAgaWYgdGhlIHVzZXIgZGlkIG5vdCBzZXQgb25lLlxuICogQGludGVybmFsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1kZWZhdWx0LWRldGFpbC1yb3ctcGFyZW50JyxcbiAgdGVtcGxhdGU6IGA8cGJsLW5ncmlkLXJvdyAqcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWY9XCJsZXQgcm93OyBncmlkSW5zdGFuY2UgYXMgZ3JpZEluc3RhbmNlXCIgW2dyaWRdPVwiZ3JpZEluc3RhbmNlXCIgW2RldGFpbFJvd109XCJyb3dcIj48L3BibC1uZ3JpZC1yb3c+YCxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IHsgfVxuIl19