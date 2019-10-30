/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
import { MatHeaderContextMenuTrigger } from './header-context-menu-trigger';
var MatHeaderContextMenuExtension = /** @class */ (function (_super) {
    tslib_1.__extends(MatHeaderContextMenuExtension, _super);
    function MatHeaderContextMenuExtension(cfr) {
        var _this = _super.call(this) || this;
        _this.cfr = cfr;
        _this.name = 'matHeaderContextMenuTrigger';
        _this.kind = 'dataHeaderExtensions';
        _this.projectContent = false;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    MatHeaderContextMenuExtension.prototype.shouldRender = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    MatHeaderContextMenuExtension.prototype.getFactory = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
    };
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    MatHeaderContextMenuExtension.prototype.onCreated = /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    function (context, cmpRef) {
        cmpRef.instance.context = context;
        cmpRef.changeDetectorRef.markForCheck();
    };
    return MatHeaderContextMenuExtension;
}(PblNgridMultiComponentRegistry));
export { MatHeaderContextMenuExtension };
if (false) {
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.name;
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.kind;
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.projectContent;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuExtension.prototype.cfr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LWV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSw4QkFBOEIsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFFbkcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFNUU7SUFBbUQseURBQW1GO0lBS3BJLHVDQUFvQixHQUE2QjtRQUFqRCxZQUFxRCxpQkFBTyxTQUFHO1FBQTNDLFNBQUcsR0FBSCxHQUFHLENBQTBCO1FBSnhDLFVBQUksR0FBa0MsNkJBQTZCLENBQUM7UUFDcEUsVUFBSSxHQUEyQixzQkFBc0IsQ0FBQztRQUN0RCxvQkFBYyxHQUFHLEtBQUssQ0FBQzs7SUFFOEIsQ0FBQzs7Ozs7SUFFL0Qsb0RBQVk7Ozs7SUFBWixVQUFhLE9BQTJDO1FBQ3RELE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNFLENBQUM7Ozs7O0lBRUQsa0RBQVU7Ozs7SUFBVixVQUFXLE9BQTJDO1FBQ3BELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7OztJQUVELGlEQUFTOzs7OztJQUFULFVBQVUsT0FBMkMsRUFBRSxNQUFpRDtRQUN0RyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDSCxvQ0FBQztBQUFELENBQUMsQUFuQkQsQ0FBbUQsOEJBQThCLEdBbUJoRjs7OztJQWxCQyw2Q0FBNkU7O0lBQzdFLDZDQUErRDs7SUFDL0QsdURBQWdDOzs7OztJQUVwQiw0Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyJztcblxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNvbnRleHRNZW51RXh0ZW5zaW9uIGV4dGVuZHMgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4ge1xuICByZWFkb25seSBuYW1lOiAnbWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyJyA9ICdtYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXInO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcbiAgcmVhZG9ubHkgcHJvamVjdENvbnRlbnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IHN1cGVyKCk7IH1cblxuICBzaG91bGRSZW5kZXIoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNvbnRleHQuaW5qZWN0b3IuZ2V0KFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sIGZhbHNlKTtcbiAgfVxuXG4gIGdldEZhY3RvcnkoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IENvbXBvbmVudEZhY3Rvcnk8TWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcik7XG4gIH1cblxuICBvbkNyZWF0ZWQoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgY21wUmVmOiBDb21wb25lbnRSZWY8TWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyPik6IHZvaWQge1xuICAgIGNtcFJlZi5pbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcbiAgICBjbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==