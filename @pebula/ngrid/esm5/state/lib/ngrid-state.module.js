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
    PblNgridStatePluginModule.ctorParameters = function () { return [
        { type: PblNgridStatePluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridStatePluginModule;
}());
export { PblNgridStatePluginModule };
if (false) {
    /** @type {?} */
    PblNgridStatePluginModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQtc3RhdGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC1zdGF0ZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSw0QkFBNEIsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRjtJQWlCRSxtQ0FBb0MsWUFBdUMsRUFDL0QsYUFBb0M7UUFFaEQsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLOztnQkFDVCxrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUN4RCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7O29CQUMxRCxZQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVU7O29CQUMvQixjQUFZLEdBQUcsWUFBVSxDQUFDLE1BQU07cUJBQ2pDLFNBQVM7Ozs7Z0JBQUUsVUFBQSxHQUFHO29CQUNiLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxZQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFOztnQ0FDL0IsUUFBUSxHQUFHLFlBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDOzRCQUNwRCxJQUFJLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFO2dDQUN4QyxRQUFRLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztnQ0FDeEUsUUFBUSxDQUFDLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUM7NkJBQ3pFO3lCQUNGO3dCQUNELGNBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0IsY0FBWSxHQUFHLFNBQVMsQ0FBQztxQkFDMUI7Z0JBQ0gsQ0FBQyxFQUFDO2FBQ0w7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7SUE5QmUsc0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7Z0JBZjFJLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixjQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRTt3QkFDWiw0QkFBNEI7cUJBQzdCO29CQUNELE9BQU8sRUFBRTt3QkFDUCw0QkFBNEI7cUJBQzdCO29CQUNELFNBQVMsRUFBRSxFQUFHO2lCQUNmOzs7O2dCQUttRCx5QkFBeUIsdUJBQTlELFFBQVEsWUFBSSxRQUFRO2dCQXRCZ0IscUJBQXFCOztJQW1EeEUsZ0NBQUM7Q0FBQSxBQTlDRCxJQThDQztTQWpDWSx5QkFBeUI7OztJQUVwQyx1Q0FBeUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyByZWdpc3RlckJ1aWx0SW5IYW5kbGVycyB9IGZyb20gJy4vY29yZS9idWlsdC1pbi1oYW5kbGVycy9fcmVnaXN0ZXInO1xuaW1wb3J0IHsgUGJsTmdyaWRTdGF0ZVBsdWdpbiwgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSwgUExVR0lOX0tFWSB9IGZyb20gJy4vc3RhdGUtcGx1Z2luJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBQYmxOZ3JpZE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUsXG4gIF0sXG4gIHByb3ZpZGVyczogWyBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0YXRlUGx1Z2luTW9kdWxlIHtcblxuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScsIHJ1bk9uY2U6IHJlZ2lzdGVyQnVpbHRJbkhhbmRsZXJzIH0sIFBibE5ncmlkU3RhdGVQbHVnaW4pO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRTdGF0ZVBsdWdpbk1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG5cbiAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RXZlbnRzQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUExVR0lOX0tFWSk7XG4gICAgICBpZiAodGFyZ2V0RXZlbnRzQ29uZmlnICYmIHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBldmVudC5jb250cm9sbGVyO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAuc3Vic2NyaWJlKCBldnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2dC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBMVUdJTl9LRVkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0RXZlbnRzQ29uZmlnLmF1dG9FbmFibGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICBpbnN0YW5jZS5sb2FkT3B0aW9ucyA9IHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlT3B0aW9ucy5sb2FkT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLnNhdmVPcHRpb25zID0gdGFyZ2V0RXZlbnRzQ29uZmlnLmF1dG9FbmFibGVPcHRpb25zLnNhdmVPcHRpb25zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=