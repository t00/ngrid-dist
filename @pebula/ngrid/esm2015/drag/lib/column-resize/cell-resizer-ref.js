/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the resizer template for cells.
 */
export class PblNgridCellResizerRefDirective extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.name = 'cellResizer';
        this.kind = 'dataHeaderExtensions';
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        return !!context.col.resize;
    }
}
PblNgridCellResizerRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridCellResizerRef]' },] }
];
/** @nocollapse */
PblNgridCellResizerRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridCellResizerRefDirective.prototype.name;
    /** @type {?} */
    PblNgridCellResizerRefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZXNpemVyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9jb2x1bW4tcmVzaXplL2NlbGwtcmVzaXplci1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSw2QkFBNkIsRUFBc0UsTUFBTSxlQUFlLENBQUM7Ozs7QUFNM0osTUFBTSxPQUFPLCtCQUFnQyxTQUFRLDZCQUF5Rjs7Ozs7SUFJNUksWUFBWSxJQUFxRCxFQUFFLFFBQWlDO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUhySCxTQUFJLEdBQWtCLGFBQWEsQ0FBQztRQUNwQyxTQUFJLEdBQTJCLHNCQUFzQixDQUFDO0lBRWdFLENBQUM7Ozs7O0lBRWhJLFlBQVksQ0FBQyxPQUEyQztRQUN0RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUM5QixDQUFDOzs7WUFURixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUU7Ozs7WUFOL0IsV0FBVztZQUN0Qix1QkFBdUI7Ozs7SUFPOUIsK0NBQTZDOztJQUM3QywrQ0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSByZXNpemVyIHRlbXBsYXRlIGZvciBjZWxscy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkQ2VsbFJlc2l6ZXJSZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbFJlc2l6ZXJSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiBpbXBsZW1lbnRzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiB7XG4gIHJlYWRvbmx5IG5hbWU6ICdjZWxsUmVzaXplcicgPSAnY2VsbFJlc2l6ZXInO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcblxuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhY29udGV4dC5jb2wucmVzaXplO1xuICB9XG59XG4iXX0=