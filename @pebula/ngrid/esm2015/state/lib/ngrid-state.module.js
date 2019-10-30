/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridPluginController, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
import { PLUGIN_KEY, PblNgridStatePluginDirective } from './state-plugin';
export class PblNgridStatePluginModule {
    /**
     * @param {?} parentModule
     * @param {?} configService
     */
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                /** @type {?} */
                const pluginCtrl = event.controller;
                /** @type {?} */
                let subscription = pluginCtrl.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                evt => {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl.hasPlugin(PLUGIN_KEY)) {
                            /** @type {?} */
                            const instance = pluginCtrl.createPlugin(PLUGIN_KEY);
                            if (targetEventsConfig.autoEnableOptions) {
                                instance.loadOptions = targetEventsConfig.autoEnableOptions.loadOptions;
                                instance.saveOptions = targetEventsConfig.autoEnableOptions.saveOptions;
                            }
                        }
                        subscription.unsubscribe();
                        subscription = undefined;
                    }
                }));
            }
        }));
    }
}
PblNgridStatePluginModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    PblNgridModule,
                ],
                declarations: [
                    PblNgridStatePluginDirective,
                ],
                exports: [
                    PblNgridStatePluginDirective,
                ],
                providers: [],
                entryComponents: [],
            },] }
];
/** @nocollapse */
PblNgridStatePluginModule.ctorParameters = () => [
    { type: PblNgridStatePluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC1zdGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUUsVUFBVSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFnQjFFLE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBQ3BDLFlBQW9DLFlBQXVDLEVBQy9ELGFBQW9DO1FBRWhELElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUzs7OztRQUFFLEtBQUssQ0FBQyxFQUFFOztrQkFDWixrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUN4RCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7O3NCQUMxRCxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVU7O29CQUMvQixZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU07cUJBQ2pDLFNBQVM7Ozs7Z0JBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztrQ0FDL0IsUUFBUSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzRCQUNwRCxJQUFJLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFO2dDQUN4QyxRQUFRLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztnQ0FDeEUsUUFBUSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7NkJBQ3pFO3lCQUNGO3dCQUNELFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0IsWUFBWSxHQUFHLFNBQVMsQ0FBQztxQkFDMUI7Z0JBQ0gsQ0FBQyxFQUFDO2FBQ0w7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7OztZQTNDRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osY0FBYztpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsNEJBQTRCO2lCQUM3QjtnQkFDRCxTQUFTLEVBQUUsRUFBRztnQkFDZCxlQUFlLEVBQUUsRUFBRzthQUNyQjs7OztZQUVtRCx5QkFBeUIsdUJBQTlELFFBQVEsWUFBSSxRQUFRO1lBbkJnQixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBMVUdJTl9LRVksIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUgfSBmcm9tICcuL3N0YXRlLXBsdWdpbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUGJsTmdyaWRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZFN0YXRlUGx1Z2luRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFsgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RhdGVQbHVnaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkU3RhdGVQbHVnaW5Nb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuXG4gIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEV2ZW50c0NvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KFBMVUdJTl9LRVkpO1xuICAgICAgaWYgKHRhcmdldEV2ZW50c0NvbmZpZyAmJiB0YXJnZXRFdmVudHNDb25maWcuYXV0b0VuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChldnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgaWYgKCFwbHVnaW5DdHJsLmhhc1BsdWdpbihQTFVHSU5fS0VZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UubG9hZE9wdGlvbnMgPSB0YXJnZXRFdmVudHNDb25maWcuYXV0b0VuYWJsZU9wdGlvbnMubG9hZE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zYXZlT3B0aW9ucyA9IHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucy5zYXZlT3B0aW9ucztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19