/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry, PblNgridPluginController } from '@pebula/ngrid';
import { PLUGIN_KEY } from './column-reorder-plugin';
/**
 * Marks the element as the resizer template for cells.
 */
var PblNgridCellDraggerRefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridCellDraggerRefDirective, _super);
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
        var pluginCtrl = PblNgridPluginController.find(context.table);
        return pluginCtrl.hasPlugin(PLUGIN_KEY);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1kcmFnZ2VyLXJlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvZHJhZy8iLCJzb3VyY2VzIjpbImxpYi9kcmFnLWFuZC1kcm9wL2NvbHVtbi9jZWxsLWRyYWdnZXItcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLDZCQUE2QixFQUFzRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyTCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFLckQ7SUFDcUQsMkRBQXlGO0lBRzVJLHlDQUFZLElBQXFELEVBQUUsUUFBaUM7UUFBcEcsWUFBd0csa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxTQUFHO1FBRnZILFVBQUksR0FBa0IsYUFBYSxDQUFDO1FBQ3BDLFVBQUksR0FBMkIsc0JBQXNCLENBQUM7O0lBQ2dFLENBQUM7Ozs7O0lBRWhJLHNEQUFZOzs7O0lBQVosVUFBYSxPQUEyQztRQUN0RCxvSUFBb0k7UUFDcEkseUpBQXlKO1FBQ3pKLDJEQUEyRDtRQUMzRCxFQUFFO1FBQ0YscUZBQXFGOzs7Ozs7O1lBRS9FLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMvRCxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Z0JBZkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFFOzs7O2dCQVIvQixXQUFXO2dCQUN0Qix1QkFBdUI7O0lBdUJoQyxzQ0FBQztDQUFBLEFBaEJELENBQ3FELDZCQUE2QixHQWVqRjtTQWZZLCtCQUErQjs7O0lBQzFDLCtDQUE2Qzs7SUFDN0MsK0NBQStEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5LCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYsIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQTFVHSU5fS0VZIH0gZnJvbSAnLi9jb2x1bW4tcmVvcmRlci1wbHVnaW4nO1xuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSByZXNpemVyIHRlbXBsYXRlIGZvciBjZWxscy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkQ2VsbERyYWdnZXJSZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbERyYWdnZXJSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiBpbXBsZW1lbnRzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiB7XG4gIHJlYWRvbmx5IG5hbWU6ICdjZWxsRHJhZ2dlcicgPSAnY2VsbERyYWdnZXInO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dD4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cblxuICBzaG91bGRSZW5kZXIoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IGJvb2xlYW4ge1xuICAgIC8vIFdlIGRvbnQgY2hlY2sgZm9yIGBjb250ZXh0LmNvbC5yZW9yZGVyYCBiZWNhdXNlIGV2ZW4gaWYgYSBzcGVjaWZpYyBjb2x1bW4gZG9lcyBub3QgXCJyZW9yZGVyXCIgd2Ugc3RpbGwgbmVlZCB0byByZW5kZXIgdGhlIGNkay1kcmFnXG4gICAgLy8gc28gdGhlIGNkay1kcm9wLWxpc3Qgd2lsbCBiZSBhd2FyZSBvZiB0aGlzIGl0ZW0sIHNvIGlmIGFub3RoZXIgaXRlbSBkb2VzIHJlb3JkZXIgaXQgd2lsbCBiZSBhYmxlIHRvIG1vdmUgd2hpbGUgdGFraW5nIHRoaXMgZWxlbWVudCBpbnRvIGNvbnNpZGVyYXRpb24uXG4gICAgLy8gSS5FOiBJdCBkb2Vzbid0IHJlb3JkZXIgYnV0IGl0J3MgcGFydCBvZiB0aGUgcGxheWdyb3VuZC5cbiAgICAvL1xuICAgIC8vIEhvd2V2ZXIsIHdoZW4gdGhlIHBsdWdpbiBkb2VzIG5vdCBleGlzdHMgZm9yIHRoaXMgdGFibGUgd2UgZG9uJ3QgbmVlZCB0byByZW5kZXIuLi5cblxuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChjb250ZXh0LnRhYmxlKTtcbiAgICByZXR1cm4gcGx1Z2luQ3RybC5oYXNQbHVnaW4oUExVR0lOX0tFWSk7XG4gIH1cbn1cbiJdfQ==