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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZGV0YWlsLXJvdy8iLCJzb3VyY2VzIjpbImxpYi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUdmLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLDhCQUE4QixFQUFzQixNQUFNLGVBQWUsQ0FBQzs7OztBQVk1RztJQUNtRCx5REFBb0U7SUFFckgsdUNBQVksSUFBMEMsRUFBRSxRQUFpQztRQUF6RixZQUE2RixrQkFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQUc7UUFENUcsVUFBSSxHQUFnQixXQUFXLENBQUM7O0lBQzJFLENBQUM7O2dCQUh0SCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7Z0JBaEIvQyxXQUFXO2dCQUlKLHVCQUF1Qjs7SUFnQmhDLG9DQUFDO0NBQUEsQUFKRCxDQUNtRCw4QkFBOEIsR0FHaEY7U0FIWSw2QkFBNkI7OztJQUN4Qyw2Q0FBeUM7Ozs7O0FBSTNDO0lBSTRELCtEQUFZO0lBRXRFLDZDQUFZLFFBQTRDLEVBQUUsUUFBeUIsRUFBWSxRQUFpQztRQUFoSSxZQUNFLGtCQUFNLFFBQVEsRUFBRSxRQUFRLENBQUMsU0FDMUI7UUFGOEYsY0FBUSxHQUFSLFFBQVEsQ0FBeUI7O0lBRWhJLENBQUM7Ozs7SUFFRCxtREFBSzs7O0lBQUw7O1lBQ1EsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDL0MsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsc0RBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQseURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUcsU0FBUyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsOEJBQThCO29CQUN4QyxNQUFNLEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxzQ0FBc0MsQ0FBQztpQkFDeEY7Ozs7Z0JBekJDLFdBQVc7Z0JBSFgsZUFBZTtnQkFPUix1QkFBdUI7O0lBeUNoQywwQ0FBQztDQUFBLEFBdkJELENBSTRELFNBQVMsR0FtQnBFO1NBbkJZLG1DQUFtQzs7Ozs7O0lBRXVDLHVEQUEyQzs7Ozs7O0FBdUJsSTtJQUFBO0lBSXVELENBQUM7O2dCQUp2RCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFDQUFxQztvQkFDL0MsUUFBUSxFQUFFLG1KQUE2STtpQkFDeEo7O0lBQ3NELDhDQUFDO0NBQUEsQUFKeEQsSUFJd0Q7U0FBM0MsdUNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy90YWJsZS1yZWdpc3RyeS5zZXJ2aWNlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwIHtcbiAgICBkZXRhaWxSb3dQYXJlbnQ/OiBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxhbnk+O1xuICAgIGRldGFpbFJvdz86IFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlO1xuICB9XG59XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCBmb3IgdGhlIGRldGFpbCByb3cgaXRzZWxmLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWREZXRhaWxSb3dEZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkUm93Q29udGV4dDxhbnk+LCAnZGV0YWlsUm93Jz4ge1xuICByZWFkb25seSBraW5kOiAnZGV0YWlsUm93JyA9ICdkZXRhaWxSb3cnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZFJvd0NvbnRleHQ8YW55Pj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmXScsXG4gIGlucHV0czogWydjb2x1bW5zOiBwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZicsICd3aGVuOiBwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZldoZW4nXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8VD4gZXh0ZW5kcyBDZGtSb3dEZWY8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IodGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkUm93Q29udGV4dDxUPj4sIF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByb3RlY3RlZCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHtcbiAgICBzdXBlcih0ZW1wbGF0ZSwgX2RpZmZlcnMpO1xuICB9XG5cbiAgY2xvbmUoKTogUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8VD4ge1xuICAgIGNvbnN0IGNsb25lID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICB0aGlzLl9jb2x1bW5zRGlmZmVyID0gdGhpcy5jb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0U2luZ2xlKCdkZXRhaWxSb3dQYXJlbnQnLCB0aGlzIGFzIGFueSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSgnZGV0YWlsUm93UGFyZW50JywgIHVuZGVmaW5lZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2UgdG8gc2V0IHRoZSBhIGRlZmF1bHQgYHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmYCBpZiB0aGUgdXNlciBkaWQgbm90IHNldCBvbmUuXG4gKiBAaW50ZXJuYWxcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWRlZmF1bHQtZGV0YWlsLXJvdy1wYXJlbnQnLFxuICB0ZW1wbGF0ZTogYDxwYmwtbmdyaWQtcm93ICpwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZj1cImxldCByb3c7IGdyaWRJbnN0YW5jZSBhcyBncmlkSW5zdGFuY2VcIiBbZ3JpZF09XCJncmlkSW5zdGFuY2VcIiBbZGV0YWlsUm93XT1cInJvd1wiPjwvcGJsLW5ncmlkLXJvdz5gLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQgeyB9XG4iXX0=