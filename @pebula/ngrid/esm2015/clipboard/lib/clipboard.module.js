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
export class PblNgridClipboardPluginModule {
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
            const config = configService.get(PLUGIN_KEY, {});
            if (config.autoEnable === true) {
                /** @type {?} */
                const pluginCtrl = event.controller;
                pluginCtrl.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e.kind === 'onInit')), first())
                    .subscribe((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    if (!pluginCtrl.hasPlugin(PLUGIN_KEY)) {
                        pluginCtrl.createPlugin(PLUGIN_KEY);
                    }
                }));
            }
        }));
    }
}
PblNgridClipboardPluginModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, PblNgridModule, PblNgridTargetEventsModule],
                declarations: [PblNgridClipboardPlugin],
                exports: [PblNgridClipboardPlugin],
            },] }
];
/** @nocollapse */
PblNgridClipboardPluginModule.ctorParameters = () => [
    { type: PblNgridClipboardPluginModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpFLE9BQU8sRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQU96RSxNQUFNLE9BQU8sNkJBQTZCOzs7OztJQUN4QyxZQUFvQyxZQUEyQyxFQUNuRSxhQUFvQztRQUU5QyxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFDRCx3QkFBd0IsQ0FBQyxPQUFPO2FBQzdCLFNBQVM7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTs7a0JBQ1osTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztZQUNoRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztzQkFDeEIsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVO2dCQUNuQyxVQUFVLENBQUMsTUFBTTtxQkFDZCxJQUFJLENBQ0gsTUFBTTs7OztnQkFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFLEVBQ2xDLEtBQUssRUFBRSxDQUNSO3FCQUNBLFNBQVM7Ozs7Z0JBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQ3JDLFVBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3JDO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ047UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7OztZQTdCRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsQ0FBRTtnQkFDckUsWUFBWSxFQUFFLENBQUUsdUJBQXVCLENBQUU7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFFLHVCQUF1QixDQUFFO2FBQ3JDOzs7O1lBRW1ELDZCQUE2Qix1QkFBbEUsUUFBUSxZQUFJLFFBQVE7WUFYVixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaXJzdCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkQ29uZmlnU2VydmljZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmltcG9ydCB7IFBMVUdJTl9LRVksIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIH0gZnJvbSAnLi9jbGlwYm9hcmQucGx1Z2luJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4gXSxcbiAgZXhwb3J0czogWyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbk1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW5Nb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuXG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBjb25maWdTZXJ2aWNlLmdldChQTFVHSU5fS0VZLCB7fSk7XG4gICAgICAgIGlmIChjb25maWcuYXV0b0VuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBldmVudC5jb250cm9sbGVyO1xuICAgICAgICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uSW5pdCcgKSxcbiAgICAgICAgICAgICAgZmlyc3QoKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBMVUdJTl9LRVkpKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19