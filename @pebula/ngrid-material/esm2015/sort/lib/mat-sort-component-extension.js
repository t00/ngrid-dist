/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQtY29tcG9uZW50LWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc29ydC8iLCJzb3VyY2VzIjpbImxpYi9tYXQtc29ydC1jb21wb25lbnQtZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWhFLE9BQU8sRUFBRSw4QkFBOEIsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFFbkcsTUFBTSxPQUFPLGdCQUFpQixTQUFRLDhCQUFxRTs7OztJQUt6RyxZQUFvQixHQUE2QjtRQUMvQyxLQUFLLEVBQUUsQ0FBQztRQURVLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBSnhDLFNBQUksR0FBb0IsZUFBZSxDQUFDO1FBQ3hDLFNBQUksR0FBMkIsc0JBQXNCLENBQUM7UUFDdEQsbUJBQWMsR0FBRyxJQUFJLENBQUM7SUFJL0IsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsT0FBMkM7UUFDdEQsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RSxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUEyQztRQUNwRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQTJDLEVBQUUsTUFBbUM7UUFDeEYscUZBQXFGO1FBQ3JGLGlLQUFpSztRQUNqSyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDOzs7Ozs7OztJQUtPLFlBQVksQ0FBQyxPQUEyQyxFQUFFLEVBQU87O2NBQ2pFLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBVSxPQUFPLENBQUM7O2NBQ2hELGFBQWEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDL0MsSUFBSSxhQUFhLEVBQUU7WUFDakIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Q0FDRjs7O0lBakNDLGdDQUFpRDs7SUFDakQsZ0NBQStEOztJQUMvRCwwQ0FBK0I7Ozs7O0lBRW5CLCtCQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTb3J0LCBNYXRTb3J0SGVhZGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5leHBvcnQgY2xhc3MgTWF0U29ydEV4dGVuc2lvbiBleHRlbmRzIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxNYXRTb3J0SGVhZGVyLCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiB7XG4gIHJlYWRvbmx5IG5hbWU6ICdzb3J0Q29udGFpbmVyJyA9ICdzb3J0Q29udGFpbmVyJztcbiAgcmVhZG9ubHkga2luZDogJ2RhdGFIZWFkZXJFeHRlbnNpb25zJyA9ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc7XG4gIHJlYWRvbmx5IHByb2plY3RDb250ZW50ID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhY29udGV4dC5jb2wuc29ydCAmJiAhIWNvbnRleHQuaW5qZWN0b3IuZ2V0KE1hdFNvcnQsIGZhbHNlKTtcbiAgfVxuXG4gIGdldEZhY3RvcnkoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IENvbXBvbmVudEZhY3Rvcnk8TWF0U29ydEhlYWRlcj4ge1xuICAgIHJldHVybiB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShNYXRTb3J0SGVhZGVyKTtcbiAgfVxuXG4gIG9uQ3JlYXRlZChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBjbXBSZWY6IENvbXBvbmVudFJlZjxNYXRTb3J0SGVhZGVyPik6IHZvaWQge1xuICAgIC8vIFdlIGFzc2lnbiB0aGUgSUQgYW5kIGFsc28gdmVyaWZ5IHRoYXQgaXQgZG9lcyBub3QgZXhpc3Qgb24gdGhlIGBNYXRTb3J0YCBjb250YWluZXJcbiAgICAvLyBJdCBtaWdodCBleGlzdHMgb24gc3BlY2lmaWMgc2NlbmFyaW9zIHdoZW4gYSBoZWFkZXIgaXMgcmVtb3ZlZCBhbmQgYWRkZWQgaW5zdGFudGx5IGJ1dCB0aGUgXCJhZGRcIiBwYXJ0IGhhcHBlbnMgYmVmb3JlIHRoZSB0ZWFyZG93biBzbyB0aGUgYE1hdFNvcnRgIHdpbGwgdGhyb3cuXG4gICAgdGhpcy5kZXJlZ2lzdGVySWQoY29udGV4dCwgY21wUmVmLmluc3RhbmNlLmlkID0gY29udGV4dC5jb2wuaWQpO1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB0aGF0IHRoZSBjdXJyZW50IGBNYXRTb3J0YCBkb2VzIG5vdCBhbHJlYWR5IGhhdmUgYSBzb3J0YWJsZSBoZWFkZXIgd2l0aCB0aGUgcHJvdmlkZWQgaWQuXG4gICAqL1xuICBwcml2YXRlIGRlcmVnaXN0ZXJJZChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBpZDogYW55KSB7XG4gICAgY29uc3QgbWF0U29ydCA9IGNvbnRleHQuaW5qZWN0b3IuZ2V0PE1hdFNvcnQ+KE1hdFNvcnQpO1xuICAgIGNvbnN0IG1hdFNvcnRIZWFkZXIgPSBtYXRTb3J0LnNvcnRhYmxlcy5nZXQoaWQpXG4gICAgaWYgKG1hdFNvcnRIZWFkZXIpIHtcbiAgICAgIG1hdFNvcnQuZGVyZWdpc3RlcihtYXRTb3J0SGVhZGVyKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==