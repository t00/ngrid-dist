/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngrid-state.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridPluginController, PblNgridModule, PblNgridConfigService, ngridPlugin } from '@pebula/ngrid';
import { registerBuiltInHandlers } from './core/built-in-handlers/_register';
import { PblNgridStatePlugin, PblNgridStatePluginDirective, PLUGIN_KEY } from './state-plugin';
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
PblNgridStatePluginModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }, PblNgridStatePlugin);
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
            },] }
];
/** @nocollapse */
PblNgridStatePluginModule.ctorParameters = () => [
    { type: PblNgridStatePluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
if (false) {
    /** @type {?} */
    PblNgridStatePluginModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC1zdGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSw0QkFBNEIsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWUvRixNQUFNLE9BQU8seUJBQXlCOzs7OztJQUlwQyxZQUFvQyxZQUF1QyxFQUMvRCxhQUFvQztRQUVoRCxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFFRCx3QkFBd0IsQ0FBQyxPQUFPO2FBQzdCLFNBQVM7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTs7a0JBQ1osa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDeEQsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztzQkFDMUQsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVOztvQkFDL0IsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3FCQUNqQyxTQUFTOzs7O2dCQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO3dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTs7a0NBQy9CLFFBQVEsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs0QkFDcEQsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRTtnQ0FDeEMsUUFBUSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7Z0NBQ3hFLFFBQVEsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDOzZCQUN6RTt5QkFDRjt3QkFDRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzNCLFlBQVksR0FBRyxTQUFTLENBQUM7cUJBQzFCO2dCQUNILENBQUMsRUFBQzthQUNMO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztBQTlCZSxzQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDOztZQWYxSSxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osY0FBYztpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osNEJBQTRCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsNEJBQTRCO2lCQUM3QjtnQkFDRCxTQUFTLEVBQUUsRUFBRzthQUNmOzs7O1lBS21ELHlCQUF5Qix1QkFBOUQsUUFBUSxZQUFJLFFBQVE7WUF0QmdCLHFCQUFxQjs7OztJQW9CdEUsdUNBQXlJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkQ29uZmlnU2VydmljZSwgbmdyaWRQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgcmVnaXN0ZXJCdWlsdEluSGFuZGxlcnMgfSBmcm9tICcuL2NvcmUvYnVpbHQtaW4taGFuZGxlcnMvX3JlZ2lzdGVyJztcbmltcG9ydCB7IFBibE5ncmlkU3RhdGVQbHVnaW4sIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL3N0YXRlLXBsdWdpbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUGJsTmdyaWRNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZFN0YXRlUGx1Z2luRGlyZWN0aXZlLFxuICBdLFxuICBwcm92aWRlcnM6IFsgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGF0ZVBsdWdpbk1vZHVsZSB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnLCBydW5PbmNlOiByZWdpc3RlckJ1aWx0SW5IYW5kbGVycyB9LCBQYmxOZ3JpZFN0YXRlUGx1Z2luKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkU3RhdGVQbHVnaW5Nb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuXG4gIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEV2ZW50c0NvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KFBMVUdJTl9LRVkpO1xuICAgICAgaWYgKHRhcmdldEV2ZW50c0NvbmZpZyAmJiB0YXJnZXRFdmVudHNDb25maWcuYXV0b0VuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChldnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgaWYgKCFwbHVnaW5DdHJsLmhhc1BsdWdpbihQTFVHSU5fS0VZKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UubG9hZE9wdGlvbnMgPSB0YXJnZXRFdmVudHNDb25maWcuYXV0b0VuYWJsZU9wdGlvbnMubG9hZE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS5zYXZlT3B0aW9ucyA9IHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucy5zYXZlT3B0aW9ucztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19