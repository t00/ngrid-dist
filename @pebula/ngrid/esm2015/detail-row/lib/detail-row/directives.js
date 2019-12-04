/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
import { Component, Directive, IterableDiffers, TemplateRef, } from '@angular/core';
import { CdkRowDef } from '@angular/cdk/table';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the display element for the detail row itself.
 */
export class PblNgridDetailRowDefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'detailRow';
    }
}
PblNgridDetailRowDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridDetailRowDef]' },] }
];
/** @nocollapse */
PblNgridDetailRowDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridDetailRowDefDirective.prototype.kind;
}
/**
 * @template T
 */
export class PblNgridDetailRowParentRefDirective extends CdkRowDef {
    /**
     * @param {?} template
     * @param {?} _differs
     * @param {?} registry
     */
    constructor(template, _differs, registry) {
        super(template, _differs);
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    clone() {
        /** @type {?} */
        const clone = Object.create(this);
        this._columnsDiffer = this.columns = undefined;
        return clone;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.registry.setSingle('detailRowParent', (/** @type {?} */ (this)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.registry.setSingle('detailRowParent', undefined);
    }
}
PblNgridDetailRowParentRefDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridDetailRowParentRef]',
                inputs: ['columns: pblNgridDetailRowParentRef', 'when: pblNgridDetailRowParentRefWhen'],
            },] }
];
/** @nocollapse */
PblNgridDetailRowParentRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: IterableDiffers },
    { type: PblNgridRegistryService }
];
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
export class PblNgridDefaultDetailRowParentComponent {
}
PblNgridDefaultDetailRowParentComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-default-detail-row-parent',
                template: `<pbl-ngrid-row *pblNgridDetailRowParentRef="let row; gridInstance as gridInstance" [grid]="gridInstance" [detailRow]="row"></pbl-ngrid-row>`
            }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZGV0YWlsLXJvdy8iLCJzb3VyY2VzIjpbImxpYi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxlQUFlLEVBR2YsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsOEJBQThCLEVBQXNCLE1BQU0sZUFBZSxDQUFDOzs7O0FBYTVHLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSw4QkFBb0U7Ozs7O0lBRXJILFlBQVksSUFBMEMsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEMUcsU0FBSSxHQUFnQixXQUFXLENBQUM7SUFDMkUsQ0FBQzs7O1lBSHRILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTs7OztZQWhCL0MsV0FBVztZQUlKLHVCQUF1Qjs7OztJQWM5Qiw2Q0FBeUM7Ozs7O0FBUTNDLE1BQU0sT0FBTyxtQ0FBdUMsU0FBUSxTQUFZOzs7Ozs7SUFFdEUsWUFBWSxRQUE0QyxFQUFFLFFBQXlCLEVBQVksUUFBaUM7UUFDOUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURtRSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUVoSSxDQUFDOzs7O0lBRUQsS0FBSzs7Y0FDRyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUMvQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsTUFBTSxFQUFFLENBQUMscUNBQXFDLEVBQUUsc0NBQXNDLENBQUM7YUFDeEY7Ozs7WUF6QkMsV0FBVztZQUhYLGVBQWU7WUFPUix1QkFBdUI7Ozs7Ozs7SUF3QnVELHVEQUEyQzs7Ozs7O0FBMkJsSSxNQUFNLE9BQU8sdUNBQXVDOzs7WUFKbkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQ0FBcUM7Z0JBQy9DLFFBQVEsRUFBRSw2SUFBNkk7YUFDeEoiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtSb3dEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5LCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwIHtcbiAgICBkZXRhaWxSb3dQYXJlbnQ/OiBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxhbnk+O1xuICAgIGRldGFpbFJvdz86IFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlO1xuICB9XG59XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCBmb3IgdGhlIGRldGFpbCByb3cgaXRzZWxmLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWREZXRhaWxSb3dEZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkUm93Q29udGV4dDxhbnk+LCAnZGV0YWlsUm93Jz4ge1xuICByZWFkb25seSBraW5kOiAnZGV0YWlsUm93JyA9ICdkZXRhaWxSb3cnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZFJvd0NvbnRleHQ8YW55Pj4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmXScsXG4gIGlucHV0czogWydjb2x1bW5zOiBwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZicsICd3aGVuOiBwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZldoZW4nXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8VD4gZXh0ZW5kcyBDZGtSb3dEZWY8VD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY29uc3RydWN0b3IodGVtcGxhdGU6IFRlbXBsYXRlUmVmPFBibE5ncmlkUm93Q29udGV4dDxUPj4sIF9kaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsIHByb3RlY3RlZCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHtcbiAgICBzdXBlcih0ZW1wbGF0ZSwgX2RpZmZlcnMpO1xuICB9XG5cbiAgY2xvbmUoKTogUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8VD4ge1xuICAgIGNvbnN0IGNsb25lID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICB0aGlzLl9jb2x1bW5zRGlmZmVyID0gdGhpcy5jb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0U2luZ2xlKCdkZXRhaWxSb3dQYXJlbnQnLCB0aGlzIGFzIGFueSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSgnZGV0YWlsUm93UGFyZW50JywgIHVuZGVmaW5lZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBVc2UgdG8gc2V0IHRoZSBhIGRlZmF1bHQgYHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmYCBpZiB0aGUgdXNlciBkaWQgbm90IHNldCBvbmUuXG4gKiBAaW50ZXJuYWxcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLWRlZmF1bHQtZGV0YWlsLXJvdy1wYXJlbnQnLFxuICB0ZW1wbGF0ZTogYDxwYmwtbmdyaWQtcm93ICpwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZj1cImxldCByb3c7IGdyaWRJbnN0YW5jZSBhcyBncmlkSW5zdGFuY2VcIiBbZ3JpZF09XCJncmlkSW5zdGFuY2VcIiBbZGV0YWlsUm93XT1cInJvd1wiPjwvcGJsLW5ncmlkLXJvdz5gLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQgeyB9XG4iXX0=