/**
 * @fileoverview added by tsickle
 * Generated from: lib/column-resize/cell-resizer-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the resizer template for cells.
 */
var PblNgridCellResizerRefDirective = /** @class */ (function (_super) {
    __extends(PblNgridCellResizerRefDirective, _super);
    function PblNgridCellResizerRefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.name = 'cellResizer';
        _this.kind = 'dataHeaderExtensions';
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PblNgridCellResizerRefDirective.prototype.shouldRender = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return !!context.col.resize;
    };
    PblNgridCellResizerRefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridCellResizerRef]' },] }
    ];
    /** @nocollapse */
    PblNgridCellResizerRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridCellResizerRefDirective;
}(PblNgridMultiTemplateRegistry));
export { PblNgridCellResizerRefDirective };
if (false) {
    /** @type {?} */
    PblNgridCellResizerRefDirective.prototype.name;
    /** @type {?} */
    PblNgridCellResizerRefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZXNpemVyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9jb2x1bW4tcmVzaXplL2NlbGwtcmVzaXplci1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFzRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUszSjtJQUNxRCxtREFBeUY7SUFJNUkseUNBQVksSUFBcUQsRUFBRSxRQUFpQztRQUFwRyxZQUF3RyxrQkFBTSxJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQUc7UUFIdkgsVUFBSSxHQUFrQixhQUFhLENBQUM7UUFDcEMsVUFBSSxHQUEyQixzQkFBc0IsQ0FBQzs7SUFFZ0UsQ0FBQzs7Ozs7SUFFaEksc0RBQVk7Ozs7SUFBWixVQUFhLE9BQTJDO1FBQ3RELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7O2dCQVRGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRTs7OztnQkFOL0IsV0FBVztnQkFDdEIsdUJBQXVCOztJQWVoQyxzQ0FBQztDQUFBLEFBVkQsQ0FDcUQsNkJBQTZCLEdBU2pGO1NBVFksK0JBQStCOzs7SUFDMUMsK0NBQTZDOztJQUM3QywrQ0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSByZXNpemVyIHRlbXBsYXRlIGZvciBjZWxscy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkQ2VsbFJlc2l6ZXJSZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbFJlc2l6ZXJSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiBpbXBsZW1lbnRzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiB7XG4gIHJlYWRvbmx5IG5hbWU6ICdjZWxsUmVzaXplcicgPSAnY2VsbFJlc2l6ZXInO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcblxuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhY29udGV4dC5jb2wucmVzaXplO1xuICB9XG59XG4iXX0=