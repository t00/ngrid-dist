/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/header-context-menu-extension.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LWV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSw4QkFBOEIsRUFBc0MsTUFBTSxlQUFlLENBQUM7QUFFbkcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDckYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFNUUsTUFBTSxPQUFPLDZCQUE4QixTQUFRLDhCQUFtRjs7OztJQUtwSSxZQUFvQixHQUE2QjtRQUFJLEtBQUssRUFBRSxDQUFDO1FBQXpDLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBSnhDLFNBQUksR0FBa0MsNkJBQTZCLENBQUM7UUFDcEUsU0FBSSxHQUEyQixzQkFBc0IsQ0FBQztRQUN0RCxtQkFBYyxHQUFHLEtBQUssQ0FBQztJQUU4QixDQUFDOzs7OztJQUUvRCxZQUFZLENBQUMsT0FBMkM7UUFDdEQsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBMkM7UUFDcEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDdkUsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQTJDLEVBQUUsTUFBaUQ7UUFDdEcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7OztJQWxCQyw2Q0FBNkU7O0lBQzdFLDZDQUErRDs7SUFDL0QsdURBQWdDOzs7OztJQUVwQiw0Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5LCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyJztcblxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNvbnRleHRNZW51RXh0ZW5zaW9uIGV4dGVuZHMgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4ge1xuICByZWFkb25seSBuYW1lOiAnbWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyJyA9ICdtYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXInO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcbiAgcmVhZG9ubHkgcHJvamVjdENvbnRlbnQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7IHN1cGVyKCk7IH1cblxuICBzaG91bGRSZW5kZXIoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIWNvbnRleHQuaW5qZWN0b3IuZ2V0KFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sIGZhbHNlKTtcbiAgfVxuXG4gIGdldEZhY3RvcnkoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCk6IENvbXBvbmVudEZhY3Rvcnk8TWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcik7XG4gIH1cblxuICBvbkNyZWF0ZWQoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgY21wUmVmOiBDb21wb25lbnRSZWY8TWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyPik6IHZvaWQge1xuICAgIGNtcFJlZi5pbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dDtcbiAgICBjbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==