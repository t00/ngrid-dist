/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { first, filter } from 'rxjs/operators';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridModule, PblNgridConfigService, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PLUGIN_KEY, PblNgridClipboardPlugin } from './clipboard.plugin';
var PblNgridClipboardPluginModule = /** @class */ (function () {
    function PblNgridClipboardPluginModule(parentModule, configService) {
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
            var config = configService.get(PLUGIN_KEY, {});
            if (config.autoEnable === true) {
                /** @type {?} */
                var pluginCtrl_1 = event.controller;
                pluginCtrl_1.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e.kind === 'onInit'; })), first())
                    .subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) {
                    if (!pluginCtrl_1.hasPlugin(PLUGIN_KEY)) {
                        pluginCtrl_1.createPlugin(PLUGIN_KEY);
                    }
                }));
            }
        }));
    }
    PblNgridClipboardPluginModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridClipboardPlugin],
                    exports: [PblNgridClipboardPlugin],
                },] }
    ];
    /** @nocollapse */
    PblNgridClipboardPluginModule.ctorParameters = function () { return [
        { type: PblNgridClipboardPluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridClipboardPluginModule;
}());
export { PblNgridClipboardPluginModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV6RTtJQU1FLHVDQUFvQyxZQUEyQyxFQUNuRSxhQUFvQztRQUU5QyxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFDRCx3QkFBd0IsQ0FBQyxPQUFPO2FBQzdCLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7O2dCQUNULE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7WUFDaEQsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTs7b0JBQ3hCLFlBQVUsR0FBRyxLQUFLLENBQUMsVUFBVTtnQkFDbkMsWUFBVSxDQUFDLE1BQU07cUJBQ2QsSUFBSSxDQUNILE1BQU07Ozs7Z0JBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBbkIsQ0FBbUIsRUFBRSxFQUNsQyxLQUFLLEVBQUUsQ0FDUjtxQkFDQSxTQUFTOzs7O2dCQUFFLFVBQUEsQ0FBQztvQkFDWCxJQUFJLENBQUMsWUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDckMsWUFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztxQkFDckM7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDTjtRQUNILENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBN0JGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO29CQUNyRSxZQUFZLEVBQUUsQ0FBRSx1QkFBdUIsQ0FBRTtvQkFDekMsT0FBTyxFQUFFLENBQUUsdUJBQXVCLENBQUU7aUJBQ3JDOzs7O2dCQUVtRCw2QkFBNkIsdUJBQWxFLFFBQVEsWUFBSSxRQUFRO2dCQVhWLHFCQUFxQjs7SUFtQzlDLG9DQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0F6QlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQTFVHSU5fS0VZLCBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiB9IGZyb20gJy4vY2xpcGJvYXJkLnBsdWdpbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4gXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW5Nb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luTW9kdWxlLFxuICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcblxuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoUExVR0lOX0tFWSwge30pO1xuICAgICAgICBpZiAoY29uZmlnLmF1dG9FbmFibGUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5DdHJsID0gZXZlbnQuY29udHJvbGxlcjtcbiAgICAgICAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvbkluaXQnICksXG4gICAgICAgICAgICAgIGZpcnN0KCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFwbHVnaW5DdHJsLmhhc1BsdWdpbihQTFVHSU5fS0VZKSkge1xuICAgICAgICAgICAgICAgIHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKFBMVUdJTl9LRVkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==