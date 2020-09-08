/**
 * @fileoverview added by tsickle
 * Generated from: lib/clipboard.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { first, filter } from 'rxjs/operators';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridModule, PblNgridConfigService, PblNgridPluginController, ngridPlugin } from '@pebula/ngrid';
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
    PblNgridClipboardPluginModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridClipboardPlugin);
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
if (false) {
    /** @type {?} */
    PblNgridClipboardPluginModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvY2xpcGJvYXJkLyIsInNvdXJjZXMiOlsibGliL2NsaXBib2FyZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0csT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekUsT0FBTyxFQUFFLFVBQVUsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXpFO0lBU0UsdUNBQW9DLFlBQTJDLEVBQ25FLGFBQW9DO1FBRTlDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELHdCQUF3QixDQUFDLE9BQU87YUFDN0IsU0FBUzs7OztRQUFFLFVBQUEsS0FBSzs7Z0JBQ1QsTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQztZQUNoRCxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFOztvQkFDeEIsWUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVO2dCQUNuQyxZQUFVLENBQUMsTUFBTTtxQkFDZCxJQUFJLENBQ0gsTUFBTTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFuQixDQUFtQixFQUFFLEVBQ2xDLEtBQUssRUFBRSxDQUNSO3FCQUNBLFNBQVM7Ozs7Z0JBQUUsVUFBQSxDQUFDO29CQUNYLElBQUksQ0FBQyxZQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUNyQyxZQUFVLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUNyQztnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDO0lBekJlLDBDQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzs7Z0JBUDVHLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO29CQUNyRSxZQUFZLEVBQUUsQ0FBRSx1QkFBdUIsQ0FBRTtvQkFDekMsT0FBTyxFQUFFLENBQUUsdUJBQXVCLENBQUU7aUJBQ3JDOzs7O2dCQUttRCw2QkFBNkIsdUJBQWxFLFFBQVEsWUFBSSxRQUFRO2dCQWRWLHFCQUFxQjs7SUFzQzlDLG9DQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7U0E1QlksNkJBQTZCOzs7SUFFeEMsMkNBQTJHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlyc3QsIGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgbmdyaWRQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC90YXJnZXQtZXZlbnRzJztcblxuaW1wb3J0IHsgUExVR0lOX0tFWSwgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4gfSBmcm9tICcuL2NsaXBib2FyZC5wbHVnaW4nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZENsaXBib2FyZFBsdWdpbiBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2xpcGJvYXJkUGx1Z2luTW9kdWxlIHtcblxuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScgfSwgUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW4pO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDbGlwYm9hcmRQbHVnaW5Nb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuXG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSBjb25maWdTZXJ2aWNlLmdldChQTFVHSU5fS0VZLCB7fSk7XG4gICAgICAgIGlmIChjb25maWcuYXV0b0VuYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBldmVudC5jb250cm9sbGVyO1xuICAgICAgICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uSW5pdCcgKSxcbiAgICAgICAgICAgICAgZmlyc3QoKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXBsdWdpbkN0cmwuaGFzUGx1Z2luKFBMVUdJTl9LRVkpKSB7XG4gICAgICAgICAgICAgICAgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oUExVR0lOX0tFWSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19