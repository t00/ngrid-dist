/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
/**
 * @template T
 */
var /**
 * @template T
 */
PblNgridOverlayPanelComponentExtension = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridOverlayPanelComponentExtension, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LXJlZ2lzdHJ5LWV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbC8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnQtcmVnaXN0cnktZXh0ZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRS9EOzs7O0lBQStELGtFQUFrRDtJQUsvRyxnREFBWSxJQUFZLEVBQ0wsU0FBa0IsRUFDbEIsR0FBOEIsRUFDOUIsUUFBbUI7UUFIdEMsWUFJRSxpQkFBTyxTQUVSO1FBTGtCLGVBQVMsR0FBVCxTQUFTLENBQVM7UUFDbEIsU0FBRyxHQUFILEdBQUcsQ0FBMkI7UUFDOUIsY0FBUSxHQUFSLFFBQVEsQ0FBVztRQU43QixVQUFJLEdBQW9CLGVBQWUsQ0FBQztRQUN4QyxvQkFBYyxHQUFHLEtBQUssQ0FBQztRQU85QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7SUFDbkIsQ0FBQzs7Ozs7SUFFRCwyREFBVTs7OztJQUFWLFVBQVcsT0FBWTtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7OztJQUVELDBEQUFTOzs7OztJQUFULFVBQVUsT0FBWSxFQUFFLE1BQXVCO1FBQzdDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUNILDZDQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUErRCw4QkFBOEIsR0FxQjVGOzs7Ozs7O0lBcEJDLHNEQUFzQjs7SUFDdEIsc0RBQWlEOztJQUNqRCxnRUFBZ0M7O0lBR3BCLDJEQUF5Qjs7SUFDekIscURBQXFDOztJQUNyQywwREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IENvbXBvbmVudFJlZiwgVHlwZSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRGYWN0b3J5LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbjxUPiBleHRlbmRzIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxULCAnb3ZlcmxheVBhbmVscyc+IHtcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICByZWFkb25seSBraW5kOiAnb3ZlcmxheVBhbmVscycgPSAnb3ZlcmxheVBhbmVscyc7XG4gIHJlYWRvbmx5IHByb2plY3RDb250ZW50ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICBwdWJsaWMgY29tcG9uZW50OiBUeXBlPFQ+LFxuICAgICAgICAgICAgICBwdWJsaWMgY2ZyPzogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwdWJsaWMgaW5qZWN0b3I/OiBJbmplY3RvciwpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXRGYWN0b3J5KGNvbnRleHQ6IGFueSk6IENvbXBvbmVudEZhY3Rvcnk8VD4ge1xuICAgIHJldHVybiB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLmNvbXBvbmVudCk7XG4gIH1cblxuICBvbkNyZWF0ZWQoY29udGV4dDogYW55LCBjbXBSZWY6IENvbXBvbmVudFJlZjxUPik6IHZvaWQge1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICBjbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG59XG4iXX0=