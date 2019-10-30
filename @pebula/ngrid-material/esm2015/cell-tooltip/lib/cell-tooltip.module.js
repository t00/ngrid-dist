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
export class PblNgridCellTooltipModule {
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
            // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
            // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
            // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
            // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
            // CLI prod builds will remove the plugin's code.
            /** @type {?} */
            const cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
            if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
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
                        if (!pluginCtrl.hasPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY)) {
                            pluginCtrl.createPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY);
                        }
                        subscription.unsubscribe();
                        subscription = undefined;
                    }
                }));
            }
        }));
    }
}
PblNgridCellTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule],
                declarations: [PblNgridCellTooltipDirective],
                exports: [PblNgridCellTooltipDirective, MatTooltipModule],
            },] }
];
/** @nocollapse */
PblNgridCellTooltipModule.ctorParameters = () => [
    { type: PblNgridCellTooltipModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTdELE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEcsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPeEUsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFDcEMsWUFBb0MsWUFBdUMsRUFDL0QsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7Ozs7Ozs7a0JBTVosaUJBQWlCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUM7WUFDcEYsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztzQkFDeEQsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVOztvQkFDL0IsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3FCQUNqQyxTQUFTOzs7O2dCQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO3dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDbEUsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDbEU7d0JBQ0QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMzQixZQUFZLEdBQUcsU0FBUyxDQUFDO3FCQUMxQjtnQkFDSCxDQUFDLEVBQUM7YUFDTDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7O1lBbENGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsQ0FBRTtnQkFDdEcsWUFBWSxFQUFFLENBQUUsNEJBQTRCLENBQUU7Z0JBQzlDLE9BQU8sRUFBRSxDQUFFLDRCQUE0QixFQUFFLGdCQUFnQixDQUFFO2FBQzVEOzs7O1lBRW1ELHlCQUF5Qix1QkFBOUQsUUFBUSxZQUFJLFFBQVE7WUFYZ0IscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnLi9jZWxsLXRvb2x0aXAuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUsIE1hdFRvb2x0aXBNb2R1bGUgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIC8vIERvIG5vdCByZW1vdmUgdGhlIGV4cGxpY2l0IHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWBcbiAgICAgICAgLy8gV2UgdXNlIGBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVlgIHRvIGNyZWF0ZSBhIGRpcmVjdCByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgXG4gICAgICAgIC8vIHdoaWNoIHdpbGwgZGlzYWJsZSBkZWFkIGNvZGUgZWxpbWluYXRpb24gZm9yIHRoZSBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZWAgcGx1Z2luLlxuICAgICAgICAvLyBJZiBpdCBpcyBub3Qgc2V0LCB1c2luZyB0aGUgcGx1Z2luIHdpbGwgb25seSB3b3JrIHdoZW4gaXQgaXMgdXNlZCBpbiB0ZW1wbGF0ZXMsIG90aGVyIHdpc2UsIGlmIHVzZWQgcHJvZ3JhbW1hdGljYWxseSAoYGF1dG9TZXRBbGxgKVxuICAgICAgICAvLyBDTEkgcHJvZCBidWlsZHMgd2lsbCByZW1vdmUgdGhlIHBsdWdpbidzIGNvZGUuXG4gICAgICAgIGNvbnN0IGNlbGxUb29sdGlwQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZS5QTFVHSU5fS0VZKTtcbiAgICAgICAgaWYgKGNlbGxUb29sdGlwQ29uZmlnICYmIGNlbGxUb29sdGlwQ29uZmlnLmF1dG9TZXRBbGwgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2dCA9PiB7XG4gICAgICAgICAgICAgIGlmIChldnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSkpIHtcbiAgICAgICAgICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=