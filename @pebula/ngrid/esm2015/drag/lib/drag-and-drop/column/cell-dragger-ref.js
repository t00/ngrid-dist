/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry, PblNgridPluginController } from '@pebula/ngrid';
import { PLUGIN_KEY } from './column-reorder-plugin';
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
        const pluginCtrl = PblNgridPluginController.find(context.table);
        return pluginCtrl.hasPlugin(PLUGIN_KEY);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kcmFnZ2VyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsNkJBQTZCLEVBQXNFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJMLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7OztBQU1yRCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsNkJBQXlGOzs7OztJQUc1SSxZQUFZLElBQXFELEVBQUUsUUFBaUM7UUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRnJILFNBQUksR0FBa0IsYUFBYSxDQUFDO1FBQ3BDLFNBQUksR0FBMkIsc0JBQXNCLENBQUM7SUFDZ0UsQ0FBQzs7Ozs7SUFFaEksWUFBWSxDQUFDLE9BQTJDO1FBQ3RELG9JQUFvSTtRQUNwSSx5SkFBeUo7UUFDekosMkRBQTJEO1FBQzNELEVBQUU7UUFDRixxRkFBcUY7Ozs7Ozs7Y0FFL0UsVUFBVSxHQUFHLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQy9ELE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7WUFmRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUU7Ozs7WUFSL0IsV0FBVztZQUN0Qix1QkFBdUI7Ozs7SUFTOUIsK0NBQTZDOztJQUM3QywrQ0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBMVUdJTl9LRVkgfSBmcm9tICcuL2NvbHVtbi1yZW9yZGVyLXBsdWdpbic7XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIHJlc2l6ZXIgdGVtcGxhdGUgZm9yIGNlbGxzLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRDZWxsRHJhZ2dlclJlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRHJhZ2dlclJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IGltcGxlbWVudHMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmIHtcbiAgcmVhZG9ubHkgbmFtZTogJ2NlbGxEcmFnZ2VyJyA9ICdjZWxsRHJhZ2dlcic7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgLy8gV2UgZG9udCBjaGVjayBmb3IgYGNvbnRleHQuY29sLnJlb3JkZXJgIGJlY2F1c2UgZXZlbiBpZiBhIHNwZWNpZmljIGNvbHVtbiBkb2VzIG5vdCBcInJlb3JkZXJcIiB3ZSBzdGlsbCBuZWVkIHRvIHJlbmRlciB0aGUgY2RrLWRyYWdcbiAgICAvLyBzbyB0aGUgY2RrLWRyb3AtbGlzdCB3aWxsIGJlIGF3YXJlIG9mIHRoaXMgaXRlbSwgc28gaWYgYW5vdGhlciBpdGVtIGRvZXMgcmVvcmRlciBpdCB3aWxsIGJlIGFibGUgdG8gbW92ZSB3aGlsZSB0YWtpbmcgdGhpcyBlbGVtZW50IGludG8gY29uc2lkZXJhdGlvbi5cbiAgICAvLyBJLkU6IEl0IGRvZXNuJ3QgcmVvcmRlciBidXQgaXQncyBwYXJ0IG9mIHRoZSBwbGF5Z3JvdW5kLlxuICAgIC8vXG4gICAgLy8gSG93ZXZlciwgd2hlbiB0aGUgcGx1Z2luIGRvZXMgbm90IGV4aXN0cyBmb3IgdGhpcyB0YWJsZSB3ZSBkb24ndCBuZWVkIHRvIHJlbmRlci4uLlxuXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGNvbnRleHQudGFibGUpO1xuICAgIHJldHVybiBwbHVnaW5DdHJsLmhhc1BsdWdpbihQTFVHSU5fS0VZKTtcbiAgfVxufVxuIl19