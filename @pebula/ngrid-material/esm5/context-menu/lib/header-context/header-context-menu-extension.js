/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/header-context-menu-extension.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
import { MatHeaderContextMenuTrigger } from './header-context-menu-trigger';
var MatHeaderContextMenuExtension = /** @class */ (function (_super) {
    __extends(MatHeaderContextMenuExtension, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LWV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsOEJBQThCLEVBQXNDLE1BQU0sZUFBZSxDQUFDO0FBRW5HLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRTVFO0lBQW1ELGlEQUFtRjtJQUtwSSx1Q0FBb0IsR0FBNkI7UUFBakQsWUFBcUQsaUJBQU8sU0FBRztRQUEzQyxTQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUp4QyxVQUFJLEdBQWtDLDZCQUE2QixDQUFDO1FBQ3BFLFVBQUksR0FBMkIsc0JBQXNCLENBQUM7UUFDdEQsb0JBQWMsR0FBRyxLQUFLLENBQUM7O0lBRThCLENBQUM7Ozs7O0lBRS9ELG9EQUFZOzs7O0lBQVosVUFBYSxPQUEyQztRQUN0RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUVELGtEQUFVOzs7O0lBQVYsVUFBVyxPQUEyQztRQUNwRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7Ozs7SUFFRCxpREFBUzs7Ozs7SUFBVCxVQUFVLE9BQTJDLEVBQUUsTUFBaUQ7UUFDdEcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBQ0gsb0NBQUM7QUFBRCxDQUFDLEFBbkJELENBQW1ELDhCQUE4QixHQW1CaEY7Ozs7SUFsQkMsNkNBQTZFOztJQUM3RSw2Q0FBK0Q7O0lBQy9ELHVEQUFnQzs7Ozs7SUFFcEIsNENBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50RmFjdG9yeSwgQ29tcG9uZW50UmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIgfSBmcm9tICcuL2hlYWRlci1jb250ZXh0LW1lbnUtdHJpZ2dlcic7XG5cbmV4cG9ydCBjbGFzcyBNYXRIZWFkZXJDb250ZXh0TWVudUV4dGVuc2lvbiBleHRlbmRzIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IHtcbiAgcmVhZG9ubHkgbmFtZTogJ21hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcicgPSAnbWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyJztcbiAgcmVhZG9ubHkga2luZDogJ2RhdGFIZWFkZXJFeHRlbnNpb25zJyA9ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc7XG4gIHJlYWRvbmx5IHByb2plY3RDb250ZW50ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikgeyBzdXBlcigpOyB9XG5cbiAgc2hvdWxkUmVuZGVyKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISFjb250ZXh0LmluamVjdG9yLmdldChQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLCBmYWxzZSk7XG4gIH1cblxuICBnZXRGYWN0b3J5KGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpOiBDb21wb25lbnRGYWN0b3J5PE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcj4ge1xuICAgIHJldHVybiB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIpO1xuICB9XG5cbiAgb25DcmVhdGVkKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIGNtcFJlZjogQ29tcG9uZW50UmVmPE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcj4pOiB2b2lkIHtcbiAgICBjbXBSZWYuaW5zdGFuY2UuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iXX0=