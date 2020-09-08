/**
 * @fileoverview added by tsickle
 * Generated from: lib/target-events.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, PblNgridPluginController, PblNgridConfigService, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsPlugin, PblNgridTargetEventsPluginDirective, PLUGIN_KEY, runOnce } from './target-events/target-events-plugin';
import { PblNgridCellEditDirective } from './target-events/cell-edit.directive';
export class PblNgridTargetEventsModule {
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
                            pluginCtrl.createPlugin(PLUGIN_KEY);
                        }
                        subscription.unsubscribe();
                        subscription = undefined;
                    }
                }));
            }
        }));
    }
}
PblNgridTargetEventsModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce }, PblNgridTargetEventsPlugin);
PblNgridTargetEventsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule],
                declarations: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective],
                exports: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective]
            },] }
];
/** @nocollapse */
PblNgridTargetEventsModule.ctorParameters = () => [
    { type: PblNgridTargetEventsModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
if (false) {
    /** @type {?} */
    PblNgridTargetEventsModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsbUNBQW1DLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVJLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBT2hGLE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBSXJDLFlBQW9DLFlBQXdDLEVBQ2hFLGFBQW9DO1FBRWhELElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUzs7OztRQUFFLEtBQUssQ0FBQyxFQUFFOztrQkFDWixrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUN4RCxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7O3NCQUMxRCxVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVU7O29CQUMvQixZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU07cUJBQ2pDLFNBQVM7Ozs7Z0JBQUUsR0FBRyxDQUFDLEVBQUU7b0JBQ2hCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUNyQyxVQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUNyQzt3QkFDRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzNCLFlBQVksR0FBRyxTQUFTLENBQUM7cUJBQzFCO2dCQUNILENBQUMsRUFBQzthQUNMO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOztBQTFCZSx1Q0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSwwQkFBMEIsQ0FBRSxDQUFDOztZQVB6SCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7Z0JBQ3pELFlBQVksRUFBRSxDQUFFLG1DQUFtQyxFQUFFLHlCQUF5QixDQUFFO2dCQUNoRixPQUFPLEVBQUUsQ0FBRSxtQ0FBbUMsRUFBRSx5QkFBeUIsQ0FBRzthQUM3RTs7OztZQUttRCwwQkFBMEIsdUJBQS9ELFFBQVEsWUFBSSxRQUFRO1lBYmdCLHFCQUFxQjs7OztJQVd0RSx3Q0FBd0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbiwgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmUsIFBMVUdJTl9LRVksIHJ1bk9uY2UgfSBmcm9tICcuL3RhcmdldC1ldmVudHMvdGFyZ2V0LWV2ZW50cy1wbHVnaW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsRWRpdERpcmVjdGl2ZSB9IGZyb20gJy4vdGFyZ2V0LWV2ZW50cy9jZWxsLWVkaXQuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbkRpcmVjdGl2ZSwgUGJsTmdyaWRDZWxsRWRpdERpcmVjdGl2ZSAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnLCBydW5PbmNlIH0sIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luICk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG5cbiAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0RXZlbnRzQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUExVR0lOX0tFWSk7XG4gICAgICBpZiAodGFyZ2V0RXZlbnRzQ29uZmlnICYmIHRhcmdldEV2ZW50c0NvbmZpZy5hdXRvRW5hYmxlID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBldmVudC5jb250cm9sbGVyO1xuICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAuc3Vic2NyaWJlKCBldnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2dC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBMVUdJTl9LRVkpKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19