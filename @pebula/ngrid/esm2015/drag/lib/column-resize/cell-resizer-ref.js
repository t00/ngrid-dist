/**
 * @fileoverview added by tsickle
 * Generated from: lib/column-resize/cell-resizer-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZXNpemVyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9jb2x1bW4tcmVzaXplL2NlbGwtcmVzaXplci1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsNkJBQTZCLEVBQXNFLE1BQU0sZUFBZSxDQUFDOzs7O0FBTTNKLE1BQU0sT0FBTywrQkFBZ0MsU0FBUSw2QkFBeUY7Ozs7O0lBSTVJLFlBQVksSUFBcUQsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFIckgsU0FBSSxHQUFrQixhQUFhLENBQUM7UUFDcEMsU0FBSSxHQUEyQixzQkFBc0IsQ0FBQztJQUVnRSxDQUFDOzs7OztJQUVoSSxZQUFZLENBQUMsT0FBMkM7UUFDdEQsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQzs7O1lBVEYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7O1lBTi9CLFdBQVc7WUFDdEIsdUJBQXVCOzs7O0lBTzlCLCtDQUE2Qzs7SUFDN0MsK0NBQStEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5LCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYsIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgcmVzaXplciB0ZW1wbGF0ZSBmb3IgY2VsbHMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZENlbGxSZXNpemVyUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxSZXNpemVyUmVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4gaW1wbGVtZW50cyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYge1xuICByZWFkb25seSBuYW1lOiAnY2VsbFJlc2l6ZXInID0gJ2NlbGxSZXNpemVyJztcbiAgcmVhZG9ubHkga2luZDogJ2RhdGFIZWFkZXJFeHRlbnNpb25zJyA9ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc7XG5cbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dD4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cblxuICBzaG91bGRSZW5kZXIoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNvbnRleHQuY29sLnJlc2l6ZTtcbiAgfVxufVxuIl19