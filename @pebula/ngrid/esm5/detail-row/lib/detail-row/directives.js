/**
 * @fileoverview added by tsickle
 * Generated from: lib/detail-row/directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
// tslint:disable:use-host-property-decorator
import { Component, Directive, IterableDiffers, TemplateRef, } from '@angular/core';
import { CdkRowDef } from '@angular/cdk/table';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the display element for the detail row itself.
 */
var PblNgridDetailRowDefDirective = /** @class */ (function (_super) {
    __extends(PblNgridDetailRowDefDirective, _super);
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
    __extends(PblNgridDetailRowParentRefDirective, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZGV0YWlsLXJvdy8iLCJzb3VyY2VzIjpbImxpYi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGVBQWUsRUFHZixXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRS9DLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSw4QkFBOEIsRUFBc0IsTUFBTSxlQUFlLENBQUM7Ozs7QUFZNUc7SUFDbUQsaURBQW9FO0lBRXJILHVDQUFZLElBQTBDLEVBQUUsUUFBaUM7UUFBekYsWUFBNkYsa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFHO1FBRDVHLFVBQUksR0FBZ0IsV0FBVyxDQUFDOztJQUMyRSxDQUFDOztnQkFIdEgsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFOzs7O2dCQWhCL0MsV0FBVztnQkFJSix1QkFBdUI7O0lBZ0JoQyxvQ0FBQztDQUFBLEFBSkQsQ0FDbUQsOEJBQThCLEdBR2hGO1NBSFksNkJBQTZCOzs7SUFDeEMsNkNBQXlDOzs7OztBQUkzQztJQUk0RCx1REFBWTtJQUV0RSw2Q0FBWSxRQUE0QyxFQUFFLFFBQXlCLEVBQVksUUFBaUM7UUFBaEksWUFDRSxrQkFBTSxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQzFCO1FBRjhGLGNBQVEsR0FBUixRQUFRLENBQXlCOztJQUVoSSxDQUFDOzs7O0lBRUQsbURBQUs7OztJQUFMOztZQUNRLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQy9DLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7OztJQUVELHNEQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7OztJQUVELHlEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7O2dCQXRCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsTUFBTSxFQUFFLENBQUMscUNBQXFDLEVBQUUsc0NBQXNDLENBQUM7aUJBQ3hGOzs7O2dCQXpCQyxXQUFXO2dCQUhYLGVBQWU7Z0JBT1IsdUJBQXVCOztJQXlDaEMsMENBQUM7Q0FBQSxBQXZCRCxDQUk0RCxTQUFTLEdBbUJwRTtTQW5CWSxtQ0FBbUM7Ozs7OztJQUV1Qyx1REFBMkM7Ozs7OztBQXVCbEk7SUFBQTtJQUl1RCxDQUFDOztnQkFKdkQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxxQ0FBcUM7b0JBQy9DLFFBQVEsRUFBRSxtSkFBNkk7aUJBQ3hKOztJQUNzRCw4Q0FBQztDQUFBLEFBSnhELElBSXdEO1NBQTNDLHVDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEaXJlY3RpdmUsXG4gIEl0ZXJhYmxlRGlmZmVycyxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1Jvd0RlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9ncmlkLXJlZ2lzdHJ5LnNlcnZpY2UnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXAge1xuICAgIGRldGFpbFJvd1BhcmVudD86IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPGFueT47XG4gICAgZGV0YWlsUm93PzogUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmU7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgZGlzcGxheSBlbGVtZW50IGZvciB0aGUgZGV0YWlsIHJvdyBpdHNlbGYuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZERldGFpbFJvd0RlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWRSb3dDb250ZXh0PGFueT4sICdkZXRhaWxSb3cnPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkZXRhaWxSb3cnID0gJ2RldGFpbFJvdyc7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkUm93Q29udGV4dDxhbnk+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZdJyxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmJywgJ3doZW46IHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmV2hlbiddLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxUPiBleHRlbmRzIENka1Jvd0RlZjxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8UGJsTmdyaWRSb3dDb250ZXh0PFQ+PiwgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkge1xuICAgIHN1cGVyKHRlbXBsYXRlLCBfZGlmZmVycyk7XG4gIH1cblxuICBjbG9uZSgpOiBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxUPiB7XG4gICAgY29uc3QgY2xvbmUgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIHRoaXMuX2NvbHVtbnNEaWZmZXIgPSB0aGlzLmNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUoJ2RldGFpbFJvd1BhcmVudCcsIHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0U2luZ2xlKCdkZXRhaWxSb3dQYXJlbnQnLCAgdW5kZWZpbmVkKTtcbiAgfVxufVxuXG4vKipcbiAqIFVzZSB0byBzZXQgdGhlIGEgZGVmYXVsdCBgcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZgIGlmIHRoZSB1c2VyIGRpZCBub3Qgc2V0IG9uZS5cbiAqIEBpbnRlcm5hbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtZGVmYXVsdC1kZXRhaWwtcm93LXBhcmVudCcsXG4gIHRlbXBsYXRlOiBgPHBibC1uZ3JpZC1yb3cgKnBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmPVwibGV0IHJvdzsgZ3JpZEluc3RhbmNlIGFzIGdyaWRJbnN0YW5jZVwiIFtncmlkXT1cImdyaWRJbnN0YW5jZVwiIFtkZXRhaWxSb3ddPVwicm93XCI+PC9wYmwtbmdyaWQtcm93PmAsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCB7IH1cbiJdfQ==