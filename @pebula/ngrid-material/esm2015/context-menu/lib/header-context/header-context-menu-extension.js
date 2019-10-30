/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PblNgridMultiComponentRegistry } from '@pebula/ngrid';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
import { MatHeaderContextMenuTrigger } from './header-context-menu-trigger';
export class MatHeaderContextMenuExtension extends PblNgridMultiComponentRegistry {
    /**
     * @param {?} cfr
     */
    constructor(cfr) {
        super();
        this.cfr = cfr;
        this.name = 'matHeaderContextMenuTrigger';
        this.kind = 'dataHeaderExtensions';
        this.projectContent = false;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    shouldRender(context) {
        return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
    }
    /**
     * @param {?} context
     * @return {?}
     */
    getFactory(context) {
        return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
    }
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    onCreated(context, cmpRef) {
        cmpRef.instance.context = context;
        cmpRef.changeDetectorRef.markForCheck();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LWV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLDhCQUE4QixFQUFzQyxNQUFNLGVBQWUsQ0FBQztBQUVuRyxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RSxNQUFNLE9BQU8sNkJBQThCLFNBQVEsOEJBQW1GOzs7O0lBS3BJLFlBQW9CLEdBQTZCO1FBQUksS0FBSyxFQUFFLENBQUM7UUFBekMsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFKeEMsU0FBSSxHQUFrQyw2QkFBNkIsQ0FBQztRQUNwRSxTQUFJLEdBQTJCLHNCQUFzQixDQUFDO1FBQ3RELG1CQUFjLEdBQUcsS0FBSyxDQUFDO0lBRThCLENBQUM7Ozs7O0lBRS9ELFlBQVksQ0FBQyxPQUEyQztRQUN0RCxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzRSxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxPQUEyQztRQUNwRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUN2RSxDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBMkMsRUFBRSxNQUFpRDtRQUN0RyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbEMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFDLENBQUM7Q0FDRjs7O0lBbEJDLDZDQUE2RTs7SUFDN0UsNkNBQStEOztJQUMvRCx1REFBZ0M7Ozs7O0lBRXBCLDRDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnksIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXInO1xuXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ29udGV4dE1lbnVFeHRlbnNpb24gZXh0ZW5kcyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8TWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiB7XG4gIHJlYWRvbmx5IG5hbWU6ICdtYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXInID0gJ21hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcic7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuICByZWFkb25seSBwcm9qZWN0Q29udGVudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHsgc3VwZXIoKTsgfVxuXG4gIHNob3VsZFJlbmRlcihjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhY29udGV4dC5pbmplY3Rvci5nZXQoUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiwgZmFsc2UpO1xuICB9XG5cbiAgZ2V0RmFjdG9yeShjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KTogQ29tcG9uZW50RmFjdG9yeTxNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXI+IHtcbiAgICByZXR1cm4gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyKTtcbiAgfVxuXG4gIG9uQ3JlYXRlZChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCBjbXBSZWY6IENvbXBvbmVudFJlZjxNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXI+KTogdm9pZCB7XG4gICAgY21wUmVmLmluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19