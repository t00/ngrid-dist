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
PblNgridCellTooltipModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
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
if (false) {
    /** @type {?} */
    PblNgridCellTooltipModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUV6RSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsVUFBVSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFPcEYsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFHcEMsWUFBb0MsWUFBdUMsRUFDL0QsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7Ozs7Ozs7a0JBTVosaUJBQWlCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUM7WUFDcEYsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztzQkFDeEQsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVOztvQkFDL0IsWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNO3FCQUNqQyxTQUFTOzs7O2dCQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNoQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO3dCQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDbEUsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDbEU7d0JBQ0QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3dCQUMzQixZQUFZLEdBQUcsU0FBUyxDQUFDO3FCQUMxQjtnQkFDSCxDQUFDLEVBQUM7YUFDTDtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7QUE5QmUsc0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDOztZQU5qSCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsMEJBQTBCLENBQUU7Z0JBQ3RHLFlBQVksRUFBRSxDQUFFLDRCQUE0QixDQUFFO2dCQUM5QyxPQUFPLEVBQUUsQ0FBRSw0QkFBNEIsRUFBRSxnQkFBZ0IsQ0FBRTthQUM1RDs7OztZQUltRCx5QkFBeUIsdUJBQTlELFFBQVEsWUFBSSxRQUFRO1lBYmdCLHFCQUFxQjs7OztJQVd0RSx1Q0FBZ0giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9jZWxsLXRvb2x0aXAuZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdFRvb2x0aXBNb2R1bGUsIE92ZXJsYXlNb2R1bGUsIFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUsIE1hdFRvb2x0aXBNb2R1bGUgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsVG9vbHRpcE1vZHVsZSB7XG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJyB9LCBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkQ2VsbFRvb2x0aXBNb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAvLyBEbyBub3QgcmVtb3ZlIHRoZSBleHBsaWNpdCByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgXG4gICAgICAgIC8vIFdlIHVzZSBgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZS5QTFVHSU5fS0VZYCB0byBjcmVhdGUgYSBkaXJlY3QgcmVmZXJlbmNlIHRvIGBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlYFxuICAgICAgICAvLyB3aGljaCB3aWxsIGRpc2FibGUgZGVhZCBjb2RlIGVsaW1pbmF0aW9uIGZvciB0aGUgYFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmVgIHBsdWdpbi5cbiAgICAgICAgLy8gSWYgaXQgaXMgbm90IHNldCwgdXNpbmcgdGhlIHBsdWdpbiB3aWxsIG9ubHkgd29yayB3aGVuIGl0IGlzIHVzZWQgaW4gdGVtcGxhdGVzLCBvdGhlciB3aXNlLCBpZiB1c2VkIHByb2dyYW1tYXRpY2FsbHkgKGBhdXRvU2V0QWxsYClcbiAgICAgICAgLy8gQ0xJIHByb2QgYnVpbGRzIHdpbGwgcmVtb3ZlIHRoZSBwbHVnaW4ncyBjb2RlLlxuICAgICAgICBjb25zdCBjZWxsVG9vbHRpcENvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmUuUExVR0lOX0tFWSk7XG4gICAgICAgIGlmIChjZWxsVG9vbHRpcENvbmZpZyAmJiBjZWxsVG9vbHRpcENvbmZpZy5hdXRvU2V0QWxsID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgcGx1Z2luQ3RybCA9IGV2ZW50LmNvbnRyb2xsZXI7XG4gICAgICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldnQgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXZ0LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwbHVnaW5DdHJsLmhhc1BsdWdpbihQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVkpKSB7XG4gICAgICAgICAgICAgICAgICBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbihQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlLlBMVUdJTl9LRVkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19