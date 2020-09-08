/**
 * @fileoverview added by tsickle
 * Generated from: lib/mat-sort-component-extension.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
export class MatSortExtension extends PblNgridMultiComponentRegistry {
    /**
     * @param {?} cfr
     */
    constructor(cfr) {
        super();
        this.cfr = cfr;
        this.name = 'sortContainer';
        this.kind = 'dataHeaderExtensions';
        this.projectContent = true;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        return !!context.col.sort && !!context.injector.get(MatSort, false);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    getFactory(context) {
        return this.cfr.resolveComponentFactory(MatSortHeader);
    }
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    onCreated(context, cmpRef) {
        // We assign the ID and also verify that it does not exist on the `MatSort` container
        // It might exists on specific scenarios when a header is removed and added instantly but the "add" part happens before the teardown so the `MatSort` will throw.
        this.deregisterId(context, cmpRef.instance.id = context.col.id);
        cmpRef.changeDetectorRef.markForCheck();
    }
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     * @private
     * @param {?} context
     * @param {?} id
     * @return {?}
     */
    deregisterId(context, id) {
        /** @type {?} */
        const matSort = context.injector.get(MatSort);
        /** @type {?} */
        const matSortHeader = matSort.sortables.get(id);
        if (matSortHeader) {
            matSort.deregister(matSortHeader);
        }
    }
}
if (false) {
    /** @type {?} */
    MatSortExtension.prototype.name;
    /** @type {?} */
    MatSortExtension.prototype.kind;
    /** @type {?} */
    MatSortExtension.prototype.projectContent;
    /**
     * @type {?}
     * @private
     */
    MatSortExtension.prototype.cfr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQtY29tcG9uZW50LWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc29ydC8iLCJzb3VyY2VzIjpbImxpYi9tYXQtc29ydC1jb21wb25lbnQtZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVoRSxPQUFPLEVBQUUsOEJBQThCLEVBQXNDLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSw4QkFBcUU7Ozs7SUFLekcsWUFBb0IsR0FBNkI7UUFDL0MsS0FBSyxFQUFFLENBQUM7UUFEVSxRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUp4QyxTQUFJLEdBQW9CLGVBQWUsQ0FBQztRQUN4QyxTQUFJLEdBQTJCLHNCQUFzQixDQUFDO1FBQ3RELG1CQUFjLEdBQUcsSUFBSSxDQUFDO0lBSS9CLENBQUM7Ozs7O0lBRUQsWUFBWSxDQUFDLE9BQTJDO1FBQ3RELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBMkM7UUFDcEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7OztJQUVELFNBQVMsQ0FBQyxPQUEyQyxFQUFFLE1BQW1DO1FBQ3hGLHFGQUFxRjtRQUNyRixpS0FBaUs7UUFDakssSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRSxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUMsQ0FBQzs7Ozs7Ozs7SUFLTyxZQUFZLENBQUMsT0FBMkMsRUFBRSxFQUFPOztjQUNqRSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQVUsT0FBTyxDQUFDOztjQUNoRCxhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9DLElBQUksYUFBYSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0NBQ0Y7OztJQWpDQyxnQ0FBaUQ7O0lBQ2pELGdDQUErRDs7SUFDL0QsMENBQStCOzs7OztJQUVuQiwrQkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0U29ydCwgTWF0U29ydEhlYWRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZXhwb3J0IGNsYXNzIE1hdFNvcnRFeHRlbnNpb24gZXh0ZW5kcyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8TWF0U29ydEhlYWRlciwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4ge1xuICByZWFkb25seSBuYW1lOiAnc29ydENvbnRhaW5lcicgPSAnc29ydENvbnRhaW5lcic7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuICByZWFkb25seSBwcm9qZWN0Q29udGVudCA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBzaG91bGRSZW5kZXIoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNvbnRleHQuY29sLnNvcnQgJiYgISFjb250ZXh0LmluamVjdG9yLmdldChNYXRTb3J0LCBmYWxzZSk7XG4gIH1cblxuICBnZXRGYWN0b3J5KGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpOiBDb21wb25lbnRGYWN0b3J5PE1hdFNvcnRIZWFkZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTWF0U29ydEhlYWRlcik7XG4gIH1cblxuICBvbkNyZWF0ZWQoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgY21wUmVmOiBDb21wb25lbnRSZWY8TWF0U29ydEhlYWRlcj4pOiB2b2lkIHtcbiAgICAvLyBXZSBhc3NpZ24gdGhlIElEIGFuZCBhbHNvIHZlcmlmeSB0aGF0IGl0IGRvZXMgbm90IGV4aXN0IG9uIHRoZSBgTWF0U29ydGAgY29udGFpbmVyXG4gICAgLy8gSXQgbWlnaHQgZXhpc3RzIG9uIHNwZWNpZmljIHNjZW5hcmlvcyB3aGVuIGEgaGVhZGVyIGlzIHJlbW92ZWQgYW5kIGFkZGVkIGluc3RhbnRseSBidXQgdGhlIFwiYWRkXCIgcGFydCBoYXBwZW5zIGJlZm9yZSB0aGUgdGVhcmRvd24gc28gdGhlIGBNYXRTb3J0YCB3aWxsIHRocm93LlxuICAgIHRoaXMuZGVyZWdpc3RlcklkKGNvbnRleHQsIGNtcFJlZi5pbnN0YW5jZS5pZCA9IGNvbnRleHQuY29sLmlkKTtcbiAgICBjbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhhdCB0aGUgY3VycmVudCBgTWF0U29ydGAgZG9lcyBub3QgYWxyZWFkeSBoYXZlIGEgc29ydGFibGUgaGVhZGVyIHdpdGggdGhlIHByb3ZpZGVkIGlkLlxuICAgKi9cbiAgcHJpdmF0ZSBkZXJlZ2lzdGVySWQoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgaWQ6IGFueSkge1xuICAgIGNvbnN0IG1hdFNvcnQgPSBjb250ZXh0LmluamVjdG9yLmdldDxNYXRTb3J0PihNYXRTb3J0KTtcbiAgICBjb25zdCBtYXRTb3J0SGVhZGVyID0gbWF0U29ydC5zb3J0YWJsZXMuZ2V0KGlkKVxuICAgIGlmIChtYXRTb3J0SGVhZGVyKSB7XG4gICAgICBtYXRTb3J0LmRlcmVnaXN0ZXIobWF0U29ydEhlYWRlcik7XG4gICAgfVxuICB9XG59XG4iXX0=