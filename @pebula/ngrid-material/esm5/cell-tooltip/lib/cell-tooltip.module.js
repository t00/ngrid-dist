/**
 * @fileoverview added by tsickle
 * Generated from: lib/cell-tooltip.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PblNgridModule, PblNgridPluginController, PblNgridConfigService, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PblNgridCellTooltipDirective, PLUGIN_KEY } from './cell-tooltip.directive';
var PblNgridCellTooltipModule = /** @class */ (function () {
    function PblNgridCellTooltipModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
            // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
            // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
            // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
            // CLI prod builds will remove the plugin's code.
            /** @type {?} */
            var cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
            if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
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
                        if (!pluginCtrl_1.hasPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY)) {
                            pluginCtrl_1.createPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY);
                        }
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }));
    }
    PblNgridCellTooltipModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
    PblNgridCellTooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridCellTooltipDirective],
                    exports: [PblNgridCellTooltipDirective, MatTooltipModule],
                },] }
    ];
    /** @nocollapse */
    PblNgridCellTooltipModule.ctorParameters = function () { return [
        { type: PblNgridCellTooltipModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridCellTooltipModule;
}());
export { PblNgridCellTooltipModule };
if (false) {
    /** @type {?} */
    PblNgridCellTooltipModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFcEY7SUFRRSxtQ0FBb0MsWUFBdUMsRUFDL0QsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLOzs7Ozs7O2dCQU1ULGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDO1lBQ3BGLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTs7b0JBQ3hELFlBQVUsR0FBRyxLQUFLLENBQUMsVUFBVTs7b0JBQy9CLGNBQVksR0FBRyxZQUFVLENBQUMsTUFBTTtxQkFDakMsU0FBUzs7OztnQkFBRSxVQUFBLEdBQUc7b0JBQ2IsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDekIsSUFBSSxDQUFDLFlBQVUsQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQ2xFLFlBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ2xFO3dCQUNELGNBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0IsY0FBWSxHQUFHLFNBQVMsQ0FBQztxQkFDMUI7Z0JBQ0gsQ0FBQyxFQUFDO2FBQ0w7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7SUE5QmUsc0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDOztnQkFOakgsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO29CQUN0RyxZQUFZLEVBQUUsQ0FBRSw0QkFBNEIsQ0FBRTtvQkFDOUMsT0FBTyxFQUFFLENBQUUsNEJBQTRCLEVBQUUsZ0JBQWdCLENBQUU7aUJBQzVEOzs7O2dCQUltRCx5QkFBeUIsdUJBQTlELFFBQVEsWUFBSSxRQUFRO2dCQWJnQixxQkFBcUI7O0lBMEN4RSxnQ0FBQztDQUFBLEFBckNELElBcUNDO1NBaENZLHlCQUF5Qjs7O0lBQ3BDLHVDQUFnSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBPdmVybGF5TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgTWF0VG9vbHRpcE1vZHVsZSwgT3ZlcmxheU1vZHVsZSwgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSwgTWF0VG9vbHRpcE1vZHVsZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxUb29sdGlwTW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnIH0sIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIGV4cGxpY2l0IHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWBcbiAgICAgICAgLy8gV2UgdXNlIGBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVlgIHRvIGNyZWF0ZSBhIGRpcmVjdCByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgZGlzYWJsZSBkZWFkIGNvZGUgZWxpbWluYXRpb24gZm9yIHRoZSBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWAgcGx1Z2luLlxuICAgICAgICAvLyBJZiBpdCBpcyBub3Qgc2V0LCB1c2luZyB0aGUgcGx1Z2luIHdpbGwgb25seSB3b3JrIHdoZW4gaXQgaXMgdXNlZCBpbiB0ZW1wbGF0ZXMsIG90aGVyIHdpc2UsIGlmIHVzZWQgcHJvZ3JhbW1hdGljYWxseSAoYGF1dG9TZXRBbGxgKVxuICAgICAgICAvLyBDTEkgcHJvZCBidWlsZHMgd2lsbCByZW1vdmUgdGhlIHBsdWdpbidzIGNvZGUuXG4gICAgICAgIGNvbnN0IGNlbGxUb29sdGlwQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZS5QTFVHSU5fS0VZKTtcbiAgICAgICAgaWYgKGNlbGxUb29sdGlwQ29uZmlnICYmIGNlbGxUb29sdGlwQ29uZmlnLmF1dG9TZXRBbGwgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2dCA9PiB7XG4gICAgICAgICAgICAgIGlmIChldnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSkpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=