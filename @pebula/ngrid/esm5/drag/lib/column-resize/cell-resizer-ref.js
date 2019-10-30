/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry } from '@pebula/ngrid';
/**
 * Marks the element as the resizer template for cells.
 */
var PblNgridCellResizerRefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridCellResizerRefDirective, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1yZXNpemVyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9jb2x1bW4tcmVzaXplL2NlbGwtcmVzaXplci1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsNkJBQTZCLEVBQXNFLE1BQU0sZUFBZSxDQUFDOzs7O0FBSzNKO0lBQ3FELDJEQUF5RjtJQUk1SSx5Q0FBWSxJQUFxRCxFQUFFLFFBQWlDO1FBQXBHLFlBQXdHLGtCQUFNLElBQUksRUFBRSxRQUFRLENBQUMsU0FBRztRQUh2SCxVQUFJLEdBQWtCLGFBQWEsQ0FBQztRQUNwQyxVQUFJLEdBQTJCLHNCQUFzQixDQUFDOztJQUVnRSxDQUFDOzs7OztJQUVoSSxzREFBWTs7OztJQUFaLFVBQWEsT0FBMkM7UUFDdEQsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQzs7Z0JBVEYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7O2dCQU4vQixXQUFXO2dCQUN0Qix1QkFBdUI7O0lBZWhDLHNDQUFDO0NBQUEsQUFWRCxDQUNxRCw2QkFBNkIsR0FTakY7U0FUWSwrQkFBK0I7OztJQUMxQywrQ0FBNkM7O0lBQzdDLCtDQUErRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmLCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIHJlc2l6ZXIgdGVtcGxhdGUgZm9yIGNlbGxzLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRDZWxsUmVzaXplclJlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsUmVzaXplclJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IGltcGxlbWVudHMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmIHtcbiAgcmVhZG9ubHkgbmFtZTogJ2NlbGxSZXNpemVyJyA9ICdjZWxsUmVzaXplcic7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuXG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG5cbiAgc2hvdWxkUmVuZGVyKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFjb250ZXh0LmNvbC5yZXNpemU7XG4gIH1cbn1cbiJdfQ==