/**
 * @fileoverview added by tsickle
 * Generated from: lib/mat-sort-component-extension.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
var MatSortExtension = /** @class */ (function (_super) {
    __extends(MatSortExtension, _super);
    function MatSortExtension(cfr) {
        var _this = _super.call(this) || this;
        _this.cfr = cfr;
        _this.name = 'sortContainer';
        _this.kind = 'dataHeaderExtensions';
        _this.projectContent = true;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    MatSortExtension.prototype.shouldRender = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return !!context.col.sort && !!context.injector.get(MatSort, false);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    MatSortExtension.prototype.getFactory = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.cfr.resolveComponentFactory(MatSortHeader);
    };
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    MatSortExtension.prototype.onCreated = /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    function (context, cmpRef) {
        // We assign the ID and also verify that it does not exist on the `MatSort` container
        // It might exists on specific scenarios when a header is removed and added instantly but the "add" part happens before the teardown so the `MatSort` will throw.
        this.deregisterId(context, cmpRef.instance.id = context.col.id);
        cmpRef.changeDetectorRef.markForCheck();
    };
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     */
    /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     * @private
     * @param {?} context
     * @param {?} id
     * @return {?}
     */
    MatSortExtension.prototype.deregisterId = /**
     * Check that the current `MatSort` does not already have a sortable header with the provided id.
     * @private
     * @param {?} context
     * @param {?} id
     * @return {?}
     */
    function (context, id) {
        /** @type {?} */
        var matSort = context.injector.get(MatSort);
        /** @type {?} */
        var matSortHeader = matSort.sortables.get(id);
        if (matSortHeader) {
            matSort.deregister(matSortHeader);
        }
    };
    return MatSortExtension;
}(PblNgridMultiComponentRegistry));
export { MatSortExtension };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQtY29tcG9uZW50LWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc29ydC8iLCJzb3VyY2VzIjpbImxpYi9tYXQtc29ydC1jb21wb25lbnQtZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFaEUsT0FBTyxFQUFFLDhCQUE4QixFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUVuRztJQUFzQyxvQ0FBcUU7SUFLekcsMEJBQW9CLEdBQTZCO1FBQWpELFlBQ0UsaUJBQU8sU0FDUjtRQUZtQixTQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUp4QyxVQUFJLEdBQW9CLGVBQWUsQ0FBQztRQUN4QyxVQUFJLEdBQTJCLHNCQUFzQixDQUFDO1FBQ3RELG9CQUFjLEdBQUcsSUFBSSxDQUFDOztJQUkvQixDQUFDOzs7OztJQUVELHVDQUFZOzs7O0lBQVosVUFBYSxPQUEyQztRQUN0RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLENBQUM7Ozs7O0lBRUQscUNBQVU7Ozs7SUFBVixVQUFXLE9BQTJDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxDQUFDOzs7Ozs7SUFFRCxvQ0FBUzs7Ozs7SUFBVCxVQUFVLE9BQTJDLEVBQUUsTUFBbUM7UUFDeEYscUZBQXFGO1FBQ3JGLGlLQUFpSztRQUNqSyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7O0lBQ0ssdUNBQVk7Ozs7Ozs7SUFBcEIsVUFBcUIsT0FBMkMsRUFBRSxFQUFPOztZQUNqRSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQVUsT0FBTyxDQUFDOztZQUNoRCxhQUFhLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQy9DLElBQUksYUFBYSxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbENELENBQXNDLDhCQUE4QixHQWtDbkU7Ozs7SUFqQ0MsZ0NBQWlEOztJQUNqRCxnQ0FBK0Q7O0lBQy9ELDBDQUErQjs7Ozs7SUFFbkIsK0JBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNvcnQsIE1hdFNvcnRIZWFkZXIgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcblxuaW1wb3J0IHsgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmV4cG9ydCBjbGFzcyBNYXRTb3J0RXh0ZW5zaW9uIGV4dGVuZHMgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PE1hdFNvcnRIZWFkZXIsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IHtcbiAgcmVhZG9ubHkgbmFtZTogJ3NvcnRDb250YWluZXInID0gJ3NvcnRDb250YWluZXInO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcbiAgcmVhZG9ubHkgcHJvamVjdENvbnRlbnQgPSB0cnVlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgc2hvdWxkUmVuZGVyKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFjb250ZXh0LmNvbC5zb3J0ICYmICEhY29udGV4dC5pbmplY3Rvci5nZXQoTWF0U29ydCwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0RmFjdG9yeShjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogQ29tcG9uZW50RmFjdG9yeTxNYXRTb3J0SGVhZGVyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1hdFNvcnRIZWFkZXIpO1xuICB9XG5cbiAgb25DcmVhdGVkKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIGNtcFJlZjogQ29tcG9uZW50UmVmPE1hdFNvcnRIZWFkZXI+KTogdm9pZCB7XG4gICAgLy8gV2UgYXNzaWduIHRoZSBJRCBhbmQgYWxzbyB2ZXJpZnkgdGhhdCBpdCBkb2VzIG5vdCBleGlzdCBvbiB0aGUgYE1hdFNvcnRgIGNvbnRhaW5lclxuICAgIC8vIEl0IG1pZ2h0IGV4aXN0cyBvbiBzcGVjaWZpYyBzY2VuYXJpb3Mgd2hlbiBhIGhlYWRlciBpcyByZW1vdmVkIGFuZCBhZGRlZCBpbnN0YW50bHkgYnV0IHRoZSBcImFkZFwiIHBhcnQgaGFwcGVucyBiZWZvcmUgdGhlIHRlYXJkb3duIHNvIHRoZSBgTWF0U29ydGAgd2lsbCB0aHJvdy5cbiAgICB0aGlzLmRlcmVnaXN0ZXJJZChjb250ZXh0LCBjbXBSZWYuaW5zdGFuY2UuaWQgPSBjb250ZXh0LmNvbC5pZCk7XG4gICAgY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoYXQgdGhlIGN1cnJlbnQgYE1hdFNvcnRgIGRvZXMgbm90IGFscmVhZHkgaGF2ZSBhIHNvcnRhYmxlIGhlYWRlciB3aXRoIHRoZSBwcm92aWRlZCBpZC5cbiAgICovXG4gIHByaXZhdGUgZGVyZWdpc3RlcklkKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIGlkOiBhbnkpIHtcbiAgICBjb25zdCBtYXRTb3J0ID0gY29udGV4dC5pbmplY3Rvci5nZXQ8TWF0U29ydD4oTWF0U29ydCk7XG4gICAgY29uc3QgbWF0U29ydEhlYWRlciA9IG1hdFNvcnQuc29ydGFibGVzLmdldChpZClcbiAgICBpZiAobWF0U29ydEhlYWRlcikge1xuICAgICAgbWF0U29ydC5kZXJlZ2lzdGVyKG1hdFNvcnRIZWFkZXIpO1xuICAgIH1cbiAgfVxufVxuIl19