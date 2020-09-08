/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/column/cell-dragger-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry, PblNgridPluginController } from '@pebula/ngrid';
import { COL_REORDER_PLUGIN_KEY } from './column-reorder-plugin';
/**
 * Marks the element as the resizer template for cells.
 */
var PblNgridCellDraggerRefDirective = /** @class */ (function (_super) {
    __extends(PblNgridCellDraggerRefDirective, _super);
    function PblNgridCellDraggerRefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.name = 'cellDragger';
        _this.kind = 'dataHeaderExtensions';
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PblNgridCellDraggerRefDirective.prototype.shouldRender = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
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
        var pluginCtrl = PblNgridPluginController.find(context.grid);
        return pluginCtrl.hasPlugin(COL_REORDER_PLUGIN_KEY);
    };
    PblNgridCellDraggerRefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridCellDraggerRef]' },] }
    ];
    /** @nocollapse */
    PblNgridCellDraggerRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridCellDraggerRefDirective;
}(PblNgridMultiTemplateRegistry));
export { PblNgridCellDraggerRefDirective };
if (false) {
    /** @type {?} */
    PblNgridCellDraggerRefDirective.prototype.name;
    /** @type {?} */
    PblNgridCellDraggerRefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kcmFnZ2VyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSw2QkFBNkIsRUFBc0Usd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckwsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFLakU7SUFDcUQsbURBQXlGO0lBRzVJLHlDQUFZLElBQXFELEVBQUUsUUFBaUM7UUFBcEcsWUFBd0csa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFHO1FBRnZILFVBQUksR0FBa0IsYUFBYSxDQUFDO1FBQ3BDLFVBQUksR0FBMkIsc0JBQXNCLENBQUM7O0lBQ2dFLENBQUM7Ozs7O0lBRWhJLHNEQUFZOzs7O0lBQVosVUFBYSxPQUEyQztRQUN0RCxvSUFBb0k7UUFDcEkseUpBQXlKO1FBQ3pKLDJEQUEyRDtRQUMzRCxFQUFFO1FBQ0YscUZBQXFGOzs7Ozs7O1lBRS9FLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUM5RCxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN0RCxDQUFDOztnQkFmRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUU7Ozs7Z0JBUi9CLFdBQVc7Z0JBQ3RCLHVCQUF1Qjs7SUF1QmhDLHNDQUFDO0NBQUEsQUFoQkQsQ0FDcUQsNkJBQTZCLEdBZWpGO1NBZlksK0JBQStCOzs7SUFDMUMsK0NBQTZDOztJQUM3QywrQ0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IENPTF9SRU9SREVSX1BMVUdJTl9LRVkgfSBmcm9tICcuL2NvbHVtbi1yZW9yZGVyLXBsdWdpbic7XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIHJlc2l6ZXIgdGVtcGxhdGUgZm9yIGNlbGxzLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRDZWxsRHJhZ2dlclJlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRHJhZ2dlclJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IGltcGxlbWVudHMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmIHtcbiAgcmVhZG9ubHkgbmFtZTogJ2NlbGxEcmFnZ2VyJyA9ICdjZWxsRHJhZ2dlcic7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgLy8gV2UgZG9udCBjaGVjayBmb3IgYGNvbnRleHQuY29sLnJlb3JkZXJgIGJlY2F1c2UgZXZlbiBpZiBhIHNwZWNpZmljIGNvbHVtbiBkb2VzIG5vdCBcInJlb3JkZXJcIiB3ZSBzdGlsbCBuZWVkIHRvIHJlbmRlciB0aGUgY2RrLWRyYWdcbiAgICAvLyBzbyB0aGUgY2RrLWRyb3AtbGlzdCB3aWxsIGJlIGF3YXJlIG9mIHRoaXMgaXRlbSwgc28gaWYgYW5vdGhlciBpdGVtIGRvZXMgcmVvcmRlciBpdCB3aWxsIGJlIGFibGUgdG8gbW92ZSB3aGlsZSB0YWtpbmcgdGhpcyBlbGVtZW50IGludG8gY29uc2lkZXJhdGlvbi5cbiAgICAvLyBJLkU6IEl0IGRvZXNuJ3QgcmVvcmRlciBidXQgaXQncyBwYXJ0IG9mIHRoZSBwbGF5Z3JvdW5kLlxuICAgIC8vXG4gICAgLy8gSG93ZXZlciwgd2hlbiB0aGUgcGx1Z2luIGRvZXMgbm90IGV4aXN0cyBmb3IgdGhpcyB0YWJsZSB3ZSBkb24ndCBuZWVkIHRvIHJlbmRlci4uLlxuXG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGNvbnRleHQuZ3JpZCk7XG4gICAgcmV0dXJuIHBsdWdpbkN0cmwuaGFzUGx1Z2luKENPTF9SRU9SREVSX1BMVUdJTl9LRVkpO1xuICB9XG59XG4iXX0=