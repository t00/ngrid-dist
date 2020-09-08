/**
 * @fileoverview added by tsickle
 * Generated from: lib/detail-row/directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZGV0YWlsLXJvdy8iLCJzb3VyY2VzIjpbImxpYi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZUFBZSxFQUdmLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLDhCQUE4QixFQUFzQixNQUFNLGVBQWUsQ0FBQzs7OztBQWE1RyxNQUFNLE9BQU8sNkJBQThCLFNBQVEsOEJBQW9FOzs7OztJQUVySCxZQUFZLElBQTBDLEVBQUUsUUFBaUM7UUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRDFHLFNBQUksR0FBZ0IsV0FBVyxDQUFDO0lBQzJFLENBQUM7OztZQUh0SCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7WUFoQi9DLFdBQVc7WUFJSix1QkFBdUI7Ozs7SUFjOUIsNkNBQXlDOzs7OztBQVEzQyxNQUFNLE9BQU8sbUNBQXVDLFNBQVEsU0FBWTs7Ozs7O0lBRXRFLFlBQVksUUFBNEMsRUFBRSxRQUF5QixFQUFZLFFBQWlDO1FBQzlILEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEbUUsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFFaEksQ0FBQzs7OztJQUVELEtBQUs7O2NBQ0csS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDL0MsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7O0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRyxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7WUF0QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSw4QkFBOEI7Z0JBQ3hDLE1BQU0sRUFBRSxDQUFDLHFDQUFxQyxFQUFFLHNDQUFzQyxDQUFDO2FBQ3hGOzs7O1lBekJDLFdBQVc7WUFIWCxlQUFlO1lBT1IsdUJBQXVCOzs7Ozs7O0lBd0J1RCx1REFBMkM7Ozs7OztBQTJCbEksTUFBTSxPQUFPLHVDQUF1Qzs7O1lBSm5ELFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUNBQXFDO2dCQUMvQyxRQUFRLEVBQUUsNklBQTZJO2FBQ3hKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIERpcmVjdGl2ZSxcbiAgSXRlcmFibGVEaWZmZXJzLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZScge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCB7XG4gICAgZGV0YWlsUm93UGFyZW50PzogUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmU8YW55PjtcbiAgICBkZXRhaWxSb3c/OiBQYmxOZ3JpZERldGFpbFJvd0RlZkRpcmVjdGl2ZTtcbiAgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgZm9yIHRoZSBkZXRhaWwgcm93IGl0c2VsZi5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkRGV0YWlsUm93RGVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd0RlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZFJvd0NvbnRleHQ8YW55PiwgJ2RldGFpbFJvdyc+IHtcbiAgcmVhZG9ubHkga2luZDogJ2RldGFpbFJvdycgPSAnZGV0YWlsUm93JztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRSb3dDb250ZXh0PGFueT4+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZl0nLFxuICBpbnB1dHM6IFsnY29sdW1uczogcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWYnLCAnd2hlbjogcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZXaGVuJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPFQ+IGV4dGVuZHMgQ2RrUm93RGVmPFQ+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZFJvd0NvbnRleHQ8VD4+LCBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLCBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7XG4gICAgc3VwZXIodGVtcGxhdGUsIF9kaWZmZXJzKTtcbiAgfVxuXG4gIGNsb25lKCk6IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlPFQ+IHtcbiAgICBjb25zdCBjbG9uZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgdGhpcy5fY29sdW1uc0RpZmZlciA9IHRoaXMuY29sdW1ucyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSgnZGV0YWlsUm93UGFyZW50JywgdGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUoJ2RldGFpbFJvd1BhcmVudCcsICB1bmRlZmluZWQpO1xuICB9XG59XG5cbi8qKlxuICogVXNlIHRvIHNldCB0aGUgYSBkZWZhdWx0IGBwYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZmAgaWYgdGhlIHVzZXIgZGlkIG5vdCBzZXQgb25lLlxuICogQGludGVybmFsXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1kZWZhdWx0LWRldGFpbC1yb3ctcGFyZW50JyxcbiAgdGVtcGxhdGU6IGA8cGJsLW5ncmlkLXJvdyAqcGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWY9XCJsZXQgcm93OyBncmlkSW5zdGFuY2UgYXMgZ3JpZEluc3RhbmNlXCIgW2dyaWRdPVwiZ3JpZEluc3RhbmNlXCIgW2RldGFpbFJvd109XCJyb3dcIj48L3BibC1uZ3JpZC1yb3c+YCxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IHsgfVxuIl19