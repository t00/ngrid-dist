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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZGV0YWlsLXJvdy8iLCJzb3VyY2VzIjpbImxpYi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxlQUFlLEVBR2YsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsOEJBQThCLEVBQXNCLE1BQU0sZUFBZSxDQUFDOzs7O0FBYTVHLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSw4QkFBb0U7Ozs7O0lBRXJILFlBQVksSUFBMEMsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEMUcsU0FBSSxHQUFnQixXQUFXLENBQUM7SUFDMkUsQ0FBQzs7O1lBSHRILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTs7OztZQWhCL0MsV0FBVztZQUlKLHVCQUF1Qjs7OztJQWM5Qiw2Q0FBeUM7Ozs7O0FBUTNDLE1BQU0sT0FBTyxtQ0FBdUMsU0FBUSxTQUFZOzs7Ozs7SUFFdEUsWUFBWSxRQUE0QyxFQUFFLFFBQXlCLEVBQVksUUFBaUM7UUFDOUgsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQURtRSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUVoSSxDQUFDOzs7O0lBRUQsS0FBSzs7Y0FDRyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUMvQyxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtnQkFDeEMsTUFBTSxFQUFFLENBQUMscUNBQXFDLEVBQUUsc0NBQXNDLENBQUM7YUFDeEY7Ozs7WUF6QkMsV0FBVztZQUhYLGVBQWU7WUFPUix1QkFBdUI7Ozs7Ozs7SUF3QnVELHVEQUEyQzs7Ozs7O0FBMkJsSSxNQUFNLE9BQU8sdUNBQXVDOzs7WUFKbkQsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQ0FBcUM7Z0JBQy9DLFFBQVEsRUFBRSw2SUFBNkk7YUFDeEoiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGlyZWN0aXZlLFxuICBJdGVyYWJsZURpZmZlcnMsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtSb3dEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5LCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXAge1xuICAgIGRldGFpbFJvd1BhcmVudD86IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPGFueT47XG4gICAgZGV0YWlsUm93PzogUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmU7XG4gIH1cbn1cblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgZGlzcGxheSBlbGVtZW50IGZvciB0aGUgZGV0YWlsIHJvdyBpdHNlbGYuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZERldGFpbFJvd0RlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWRSb3dDb250ZXh0PGFueT4sICdkZXRhaWxSb3cnPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkZXRhaWxSb3cnID0gJ2RldGFpbFJvdyc7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkUm93Q29udGV4dDxhbnk+PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZdJyxcbiAgaW5wdXRzOiBbJ2NvbHVtbnM6IHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmJywgJ3doZW46IHBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmV2hlbiddLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxUPiBleHRlbmRzIENka1Jvd0RlZjxUPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8UGJsTmdyaWRSb3dDb250ZXh0PFQ+PiwgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkge1xuICAgIHN1cGVyKHRlbXBsYXRlLCBfZGlmZmVycyk7XG4gIH1cblxuICBjbG9uZSgpOiBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZTxUPiB7XG4gICAgY29uc3QgY2xvbmUgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgIHRoaXMuX2NvbHVtbnNEaWZmZXIgPSB0aGlzLmNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUoJ2RldGFpbFJvd1BhcmVudCcsIHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0U2luZ2xlKCdkZXRhaWxSb3dQYXJlbnQnLCAgdW5kZWZpbmVkKTtcbiAgfVxufVxuXG4vKipcbiAqIFVzZSB0byBzZXQgdGhlIGEgZGVmYXVsdCBgcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZgIGlmIHRoZSB1c2VyIGRpZCBub3Qgc2V0IG9uZS5cbiAqIEBpbnRlcm5hbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtZGVmYXVsdC1kZXRhaWwtcm93LXBhcmVudCcsXG4gIHRlbXBsYXRlOiBgPHBibC1uZ3JpZC1yb3cgKnBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmPVwibGV0IHJvdzsgZ3JpZEluc3RhbmNlIGFzIGdyaWRJbnN0YW5jZVwiIFtncmlkXT1cImdyaWRJbnN0YW5jZVwiIFtkZXRhaWxSb3ddPVwicm93XCI+PC9wYmwtbmdyaWQtcm93PmAsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCB7IH1cbiJdfQ==