/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/column/cell-dragger-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry, PblNgridPluginController } from '@pebula/ngrid';
import { COL_REORDER_PLUGIN_KEY } from './column-reorder-plugin';
/**
 * Marks the element as the resizer template for cells.
 */
export class PblNgridCellDraggerRefDirective extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.name = 'cellDragger';
        this.kind = 'dataHeaderExtensions';
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
        // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
        // I.E: It doesn't reorder but it's part of the playground.
        //
        // However, when the plugin does not exists for this table we don't need to render...
        // We dont check for `context.col.reorder` because even if a specific column does not "reorder" we still need to render the cdk-drag
        // so the cdk-drop-list will be aware of this item, so if another item does reorder it will be able to move while taking this element into consideration.
        // I.E: It doesn't reorder but it's part of the playground.
        //
        // However, when the plugin does not exists for this table we don't need to render...
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(context.grid);
        return pluginCtrl.hasPlugin(COL_REORDER_PLUGIN_KEY);
    }
}
PblNgridCellDraggerRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridCellDraggerRef]' },] }
];
/** @nocollapse */
PblNgridCellDraggerRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridCellDraggerRefDirective.prototype.name;
    /** @type {?} */
    PblNgridCellDraggerRefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kcmFnZ2VyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFzRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyTCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQU1qRSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsNkJBQXlGOzs7OztJQUc1SSxZQUFZLElBQXFELEVBQUUsUUFBaUM7UUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRnJILFNBQUksR0FBa0IsYUFBYSxDQUFDO1FBQ3BDLFNBQUksR0FBMkIsc0JBQXNCLENBQUM7SUFDZ0UsQ0FBQzs7Ozs7SUFFaEksWUFBWSxDQUFDLE9BQTJDO1FBQ3RELG9JQUFvSTtRQUNwSSx5SkFBeUo7UUFDekosMkRBQTJEO1FBQzNELEVBQUU7UUFDRixxRkFBcUY7Ozs7Ozs7Y0FFL0UsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzlELE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7OztZQWZGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsRUFBRTs7OztZQVIvQixXQUFXO1lBQ3RCLHVCQUF1Qjs7OztJQVM5QiwrQ0FBNkM7O0lBQzdDLCtDQUErRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmLCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgQ09MX1JFT1JERVJfUExVR0lOX0tFWSB9IGZyb20gJy4vY29sdW1uLXJlb3JkZXItcGx1Z2luJztcblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgcmVzaXplciB0ZW1wbGF0ZSBmb3IgY2VsbHMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZENlbGxEcmFnZ2VyUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxEcmFnZ2VyUmVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4gaW1wbGVtZW50cyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYge1xuICByZWFkb25seSBuYW1lOiAnY2VsbERyYWdnZXInID0gJ2NlbGxEcmFnZ2VyJztcbiAgcmVhZG9ubHkga2luZDogJ2RhdGFIZWFkZXJFeHRlbnNpb25zJyA9ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG5cbiAgc2hvdWxkUmVuZGVyKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICAvLyBXZSBkb250IGNoZWNrIGZvciBgY29udGV4dC5jb2wucmVvcmRlcmAgYmVjYXVzZSBldmVuIGlmIGEgc3BlY2lmaWMgY29sdW1uIGRvZXMgbm90IFwicmVvcmRlclwiIHdlIHN0aWxsIG5lZWQgdG8gcmVuZGVyIHRoZSBjZGstZHJhZ1xuICAgIC8vIHNvIHRoZSBjZGstZHJvcC1saXN0IHdpbGwgYmUgYXdhcmUgb2YgdGhpcyBpdGVtLCBzbyBpZiBhbm90aGVyIGl0ZW0gZG9lcyByZW9yZGVyIGl0IHdpbGwgYmUgYWJsZSB0byBtb3ZlIHdoaWxlIHRha2luZyB0aGlzIGVsZW1lbnQgaW50byBjb25zaWRlcmF0aW9uLlxuICAgIC8vIEkuRTogSXQgZG9lc24ndCByZW9yZGVyIGJ1dCBpdCdzIHBhcnQgb2YgdGhlIHBsYXlncm91bmQuXG4gICAgLy9cbiAgICAvLyBIb3dldmVyLCB3aGVuIHRoZSBwbHVnaW4gZG9lcyBub3QgZXhpc3RzIGZvciB0aGlzIHRhYmxlIHdlIGRvbid0IG5lZWQgdG8gcmVuZGVyLi4uXG5cbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoY29udGV4dC5ncmlkKTtcbiAgICByZXR1cm4gcGx1Z2luQ3RybC5oYXNQbHVnaW4oQ09MX1JFT1JERVJfUExVR0lOX0tFWSk7XG4gIH1cbn1cbiJdfQ==