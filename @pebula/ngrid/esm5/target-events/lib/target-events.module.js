/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, PblNgridPluginController, PblNgridConfigService } from '@pebula/ngrid';
import { PblNgridTargetEventsPluginDirective, PLUGIN_KEY } from './target-events/target-events-plugin';
import { PblNgridCellEditDirective } from './target-events/cell-edit.directive';
var PblNgridTargetEventsModule = /** @class */ (function () {
    function PblNgridTargetEventsModule(parentModule, configService) {
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
                            pluginCtrl_1.createPlugin(PLUGIN_KEY);
                        }
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }));
    }
    PblNgridTargetEventsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective],
                    exports: [PblNgridTargetEventsPluginDirective, PblNgridCellEditDirective]
                },] }
    ];
    /** @nocollapse */
    PblNgridTargetEventsModule.ctorParameters = function () { return [
        { type: PblNgridTargetEventsModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridTargetEventsModule;
}());
export { PblNgridTargetEventsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEcsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3ZHLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRWhGO0lBTUUsb0NBQW9DLFlBQXdDLEVBQ2hFLGFBQW9DO1FBRWhELElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUzs7OztRQUFFLFVBQUEsS0FBSzs7Z0JBQ1Qsa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDeEQsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztvQkFDMUQsWUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVOztvQkFDL0IsY0FBWSxHQUFHLFlBQVUsQ0FBQyxNQUFNO3FCQUNqQyxTQUFTOzs7O2dCQUFFLFVBQUEsR0FBRztvQkFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO3dCQUN6QixJQUFJLENBQUMsWUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDckMsWUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDckM7d0JBQ0QsY0FBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMzQixjQUFZLEdBQUcsU0FBUyxDQUFDO3FCQUMxQjtnQkFDSCxDQUFDLEVBQUM7YUFDTDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBOUJGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBRTtvQkFDekQsWUFBWSxFQUFFLENBQUUsbUNBQW1DLEVBQUUseUJBQXlCLENBQUU7b0JBQ2hGLE9BQU8sRUFBRSxDQUFFLG1DQUFtQyxFQUFFLHlCQUF5QixDQUFHO2lCQUM3RTs7OztnQkFFbUQsMEJBQTBCLHVCQUEvRCxRQUFRLFlBQUksUUFBUTtnQkFWZ0IscUJBQXFCOztJQW1DeEUsaUNBQUM7Q0FBQSxBQS9CRCxJQStCQztTQTFCWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi90YXJnZXQtZXZlbnRzL3RhcmdldC1ldmVudHMtcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmUgfSBmcm9tICcuL3RhcmdldC1ldmVudHMvY2VsbC1lZGl0LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBDZGtUYWJsZU1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZENlbGxFZGl0RGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmUgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlLFxuICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcblxuICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWRcbiAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRFdmVudHNDb25maWcgPSBjb25maWdTZXJ2aWNlLmdldChQTFVHSU5fS0VZKTtcbiAgICAgIGlmICh0YXJnZXRFdmVudHNDb25maWcgJiYgdGFyZ2V0RXZlbnRzQ29uZmlnLmF1dG9FbmFibGUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgcGx1Z2luQ3RybCA9IGV2ZW50LmNvbnRyb2xsZXI7XG4gICAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAgIC5zdWJzY3JpYmUoIGV2dCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZ0LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICAgIGlmICghcGx1Z2luQ3RybC5oYXNQbHVnaW4oUExVR0lOX0tFWSkpIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbihQTFVHSU5fS0VZKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=