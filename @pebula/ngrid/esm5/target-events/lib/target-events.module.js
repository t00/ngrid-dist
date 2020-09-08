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
    PblNgridTargetEventsModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: runOnce }, PblNgridTargetEventsPlugin);
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
if (false) {
    /** @type {?} */
    PblNgridTargetEventsModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0LWV2ZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMvIiwic291cmNlcyI6WyJsaWIvdGFyZ2V0LWV2ZW50cy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsbUNBQW1DLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzVJLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRWhGO0lBU0Usb0NBQW9DLFlBQXdDLEVBQ2hFLGFBQW9DO1FBRWhELElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUVELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUzs7OztRQUFFLFVBQUEsS0FBSzs7Z0JBQ1Qsa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDeEQsSUFBSSxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztvQkFDMUQsWUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVOztvQkFDL0IsY0FBWSxHQUFHLFlBQVUsQ0FBQyxNQUFNO3FCQUNqQyxTQUFTOzs7O2dCQUFFLFVBQUEsR0FBRztvQkFDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO3dCQUN6QixJQUFJLENBQUMsWUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDckMsWUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDckM7d0JBQ0QsY0FBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMzQixjQUFZLEdBQUcsU0FBUyxDQUFDO3FCQUMxQjtnQkFDSCxDQUFDLEVBQUM7YUFDTDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQTFCZSx1Q0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLFNBQUEsRUFBRSxFQUFFLDBCQUEwQixDQUFFLENBQUM7O2dCQVB6SCxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7b0JBQ3pELFlBQVksRUFBRSxDQUFFLG1DQUFtQyxFQUFFLHlCQUF5QixDQUFFO29CQUNoRixPQUFPLEVBQUUsQ0FBRSxtQ0FBbUMsRUFBRSx5QkFBeUIsQ0FBRztpQkFDN0U7Ozs7Z0JBS21ELDBCQUEwQix1QkFBL0QsUUFBUSxZQUFJLFFBQVE7Z0JBYmdCLHFCQUFxQjs7SUFzQ3hFLGlDQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7U0E3QlksMEJBQTBCOzs7SUFFckMsd0NBQXdIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4sIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZLCBydW5PbmNlIH0gZnJvbSAnLi90YXJnZXQtZXZlbnRzL3RhcmdldC1ldmVudHMtcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmUgfSBmcm9tICcuL3RhcmdldC1ldmVudHMvY2VsbC1lZGl0LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBDZGtUYWJsZU1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luRGlyZWN0aXZlLCBQYmxOZ3JpZENlbGxFZGl0RGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW5EaXJlY3RpdmUsIFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmUgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUge1xuXG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJywgcnVuT25jZSB9LCBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbiApO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuXG4gIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldEV2ZW50c0NvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KFBMVUdJTl9LRVkpO1xuICAgICAgaWYgKHRhcmdldEV2ZW50c0NvbmZpZyAmJiB0YXJnZXRFdmVudHNDb25maWcuYXV0b0VuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZ0ID0+IHtcbiAgICAgICAgICAgIGlmIChldnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgaWYgKCFwbHVnaW5DdHJsLmhhc1BsdWdpbihQTFVHSU5fS0VZKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKFBMVUdJTl9LRVkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==