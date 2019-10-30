/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridPluginController, PblNgridModule, PblNgridConfigService } from '@pebula/ngrid';
import { PLUGIN_KEY, PblNgridStatePluginDirective } from './state-plugin';
var PblNgridStatePluginModule = /** @class */ (function () {
    function PblNgridStatePluginModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var targetEventsConfig = configService.get(PLUGIN_KEY);
            if (targetEventsConfig && targetEventsConfig.autoEnable === true) {
                /** @type {?} */
                var pluginCtrl_1 = event.controller;
                /** @type {?} */
                var subscription_1 = pluginCtrl_1.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                function (evt) {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl_1.hasPlugin(PLUGIN_KEY)) {
                            /** @type {?} */
                            var instance = pluginCtrl_1.createPlugin(PLUGIN_KEY);
                            if (targetEventsConfig.autoEnableOptions) {
                                instance.loadOptions = targetEventsConfig.autoEnableOptions.loadOptions;
                                instance.saveOptions = targetEventsConfig.autoEnableOptions.saveOptions;
                            }
                        }
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }));
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
    PblNgridStatePluginModule.ctorParameters = function () { return [
        { type: PblNgridStatePluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridStatePluginModule;
}());
export { PblNgridStatePluginModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC1zdGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRyxPQUFPLEVBQUUsVUFBVSxFQUFFLDRCQUE0QixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUU7SUFlRSxtQ0FBb0MsWUFBdUMsRUFDL0QsYUFBb0M7UUFFaEQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLOztnQkFDVCxrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUN4RCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7O29CQUMxRCxZQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVU7O29CQUMvQixjQUFZLEdBQUcsWUFBVSxDQUFDLE1BQU07cUJBQ2pDLFNBQVM7Ozs7Z0JBQUUsVUFBQSxHQUFHO29CQUNiLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxZQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztnQ0FDL0IsUUFBUSxHQUFHLFlBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzRCQUNwRCxJQUFJLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFO2dDQUN4QyxRQUFRLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztnQ0FDeEUsUUFBUSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7NkJBQ3pFO3lCQUNGO3dCQUNELGNBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0IsY0FBWSxHQUFHLFNBQVMsQ0FBQztxQkFDMUI7Z0JBQ0gsQ0FBQyxFQUFDO2FBQ0w7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTNDRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osNEJBQTRCO3FCQUM3QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsNEJBQTRCO3FCQUM3QjtvQkFDRCxTQUFTLEVBQUUsRUFBRztvQkFDZCxlQUFlLEVBQUUsRUFBRztpQkFDckI7Ozs7Z0JBRW1ELHlCQUF5Qix1QkFBOUQsUUFBUSxZQUFJLFFBQVE7Z0JBbkJnQixxQkFBcUI7O0lBZ0R4RSxnQ0FBQztDQUFBLEFBNUNELElBNENDO1NBOUJZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUExVR0lOX0tFWSwgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSB9IGZyb20gJy4vc3RhdGUtcGx1Z2luJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQYmxOZ3JpZE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogWyBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFsgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGF0ZVBsdWdpbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRTdGF0ZVBsdWdpbk1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG5cbiAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RXZlbnRzQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUExVR0lOX0tFWSk7XG4gICAgICBpZiAodGFyZ2V0RXZlbnRzQ29uZmlnICYmIHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBldmVudC5jb250cm9sbGVyO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAuc3Vic2NyaWJlKCBldnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2dC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBMVUdJTl9LRVkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RXZlbnRzQ29uZmlnLmF1dG9FbmFibGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS5sb2FkT3B0aW9ucyA9IHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucy5sb2FkT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNhdmVPcHRpb25zID0gdGFyZ2V0RXZlbnRzQ29uZmlnLmF1dG9FbmFibGVPcHRpb25zLnNhdmVPcHRpb25zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=