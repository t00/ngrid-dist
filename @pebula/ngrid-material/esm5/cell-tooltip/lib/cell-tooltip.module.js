/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PblNgridModule, PblNgridPluginController, PblNgridConfigService } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PblNgridCellTooltipDirective } from './cell-tooltip.directive';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTdELE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFeEU7SUFNRSxtQ0FBb0MsWUFBdUMsRUFDL0QsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLOzs7Ozs7O2dCQU1ULGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDO1lBQ3BGLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTs7b0JBQ3hELFlBQVUsR0FBRyxLQUFLLENBQUMsVUFBVTs7b0JBQy9CLGNBQVksR0FBRyxZQUFVLENBQUMsTUFBTTtxQkFDakMsU0FBUzs7OztnQkFBRSxVQUFBLEdBQUc7b0JBQ2IsSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDekIsSUFBSSxDQUFDLFlBQVUsQ0FBQyxTQUFTLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQ2xFLFlBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQ2xFO3dCQUNELGNBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQzt3QkFDM0IsY0FBWSxHQUFHLFNBQVMsQ0FBQztxQkFDMUI7Z0JBQ0gsQ0FBQyxFQUFDO2FBQ0w7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQWxDRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLENBQUU7b0JBQ3RHLFlBQVksRUFBRSxDQUFFLDRCQUE0QixDQUFFO29CQUM5QyxPQUFPLEVBQUUsQ0FBRSw0QkFBNEIsRUFBRSxnQkFBZ0IsQ0FBRTtpQkFDNUQ7Ozs7Z0JBRW1ELHlCQUF5Qix1QkFBOUQsUUFBUSxZQUFJLFFBQVE7Z0JBWGdCLHFCQUFxQjs7SUF3Q3hFLGdDQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0E5QlkseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi9jZWxsLXRvb2x0aXAuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUsIE1hdFRvb2x0aXBNb2R1bGUgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIGV4cGxpY2l0IHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWBcbiAgICAgICAgLy8gV2UgdXNlIGBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVlgIHRvIGNyZWF0ZSBhIGRpcmVjdCByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgZGlzYWJsZSBkZWFkIGNvZGUgZWxpbWluYXRpb24gZm9yIHRoZSBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWAgcGx1Z2luLlxuICAgICAgICAvLyBJZiBpdCBpcyBub3Qgc2V0LCB1c2luZyB0aGUgcGx1Z2luIHdpbGwgb25seSB3b3JrIHdoZW4gaXQgaXMgdXNlZCBpbiB0ZW1wbGF0ZXMsIG90aGVyIHdpc2UsIGlmIHVzZWQgcHJvZ3JhbW1hdGljYWxseSAoYGF1dG9TZXRBbGxgKVxuICAgICAgICAvLyBDTEkgcHJvZCBidWlsZHMgd2lsbCByZW1vdmUgdGhlIHBsdWdpbidzIGNvZGUuXG4gICAgICAgIGNvbnN0IGNlbGxUb29sdGlwQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZS5QTFVHSU5fS0VZKTtcbiAgICAgICAgaWYgKGNlbGxUb29sdGlwQ29uZmlnICYmIGNlbGxUb29sdGlwQ29uZmlnLmF1dG9TZXRBbGwgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2dCA9PiB7XG4gICAgICAgICAgICAgIGlmIChldnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSkpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=