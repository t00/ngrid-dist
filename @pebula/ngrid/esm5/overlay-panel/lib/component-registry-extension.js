/**
 * @fileoverview added by tsickle
 * Generated from: lib/component-registry-extension.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
/**
 * @template T
 */
var /**
 * @template T
 */
PblNgridOverlayPanelComponentExtension = /** @class */ (function (_super) {
    __extends(PblNgridOverlayPanelComponentExtension, _super);
    function PblNgridOverlayPanelComponentExtension(name, component, cfr, injector) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.cfr = cfr;
        _this.injector = injector;
        _this.kind = 'overlayPanels';
        _this.projectContent = false;
        _this.name = name;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PblNgridOverlayPanelComponentExtension.prototype.getFactory = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.cfr.resolveComponentFactory(this.component);
    };
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    PblNgridOverlayPanelComponentExtension.prototype.onCreated = /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    function (context, cmpRef) {
        cmpRef.changeDetectorRef.markForCheck();
        cmpRef.changeDetectorRef.detectChanges();
    };
    return PblNgridOverlayPanelComponentExtension;
}(PblNgridMultiComponentRegistry));
/**
 * @template T
 */
export { PblNgridOverlayPanelComponentExtension };
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.name;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.kind;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.projectContent;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.component;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.cfr;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZ2lzdHJ5LWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQtcmVnaXN0cnktZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUUvRDs7OztJQUErRCwwREFBa0Q7SUFLL0csZ0RBQVksSUFBWSxFQUNMLFNBQWtCLEVBQ2xCLEdBQThCLEVBQzlCLFFBQW1CO1FBSHRDLFlBSUUsaUJBQU8sU0FFUjtRQUxrQixlQUFTLEdBQVQsU0FBUyxDQUFTO1FBQ2xCLFNBQUcsR0FBSCxHQUFHLENBQTJCO1FBQzlCLGNBQVEsR0FBUixRQUFRLENBQVc7UUFON0IsVUFBSSxHQUFvQixlQUFlLENBQUM7UUFDeEMsb0JBQWMsR0FBRyxLQUFLLENBQUM7UUFPOUIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0lBQ25CLENBQUM7Ozs7O0lBRUQsMkRBQVU7Ozs7SUFBVixVQUFXLE9BQVk7UUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDOzs7Ozs7SUFFRCwwREFBUzs7Ozs7SUFBVCxVQUFVLE9BQVksRUFBRSxNQUF1QjtRQUM3QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFDSCw2Q0FBQztBQUFELENBQUMsQUFyQkQsQ0FBK0QsOEJBQThCLEdBcUI1Rjs7Ozs7OztJQXBCQyxzREFBc0I7O0lBQ3RCLHNEQUFpRDs7SUFDakQsZ0VBQWdDOztJQUdwQiwyREFBeUI7O0lBQ3pCLHFEQUFxQzs7SUFDckMsMERBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnRSZWYsIFR5cGUsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50RmFjdG9yeSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248VD4gZXh0ZW5kcyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8VCwgJ292ZXJsYXlQYW5lbHMnPiB7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkga2luZDogJ292ZXJsYXlQYW5lbHMnID0gJ292ZXJsYXlQYW5lbHMnO1xuICByZWFkb25seSBwcm9qZWN0Q29udGVudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgcHVibGljIGNvbXBvbmVudDogVHlwZTxUPixcbiAgICAgICAgICAgICAgcHVibGljIGNmcj86IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHVibGljIGluamVjdG9yPzogSW5qZWN0b3IsKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0RmFjdG9yeShjb250ZXh0OiBhbnkpOiBDb21wb25lbnRGYWN0b3J5PFQ+IHtcbiAgICByZXR1cm4gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5jb21wb25lbnQpO1xuICB9XG5cbiAgb25DcmVhdGVkKGNvbnRleHQ6IGFueSwgY21wUmVmOiBDb21wb25lbnRSZWY8VD4pOiB2b2lkIHtcbiAgICBjbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxufVxuIl19