/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { filter, first } from 'rxjs/operators';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, PblNgridPluginController, PblNgridConfigService } from '@pebula/ngrid';
import { PblNgridStickyPluginDirective, setStickyRow, setStickyColumns } from './sticky/sticky-plugin';
/** @type {?} */
var MAPPER = (/**
 * @template T
 * @param {?} v
 * @return {?}
 */
function (v) { return [v, true]; });
var ɵ0 = MAPPER;
var PblNgridStickyModule = /** @class */ (function () {
    function PblNgridStickyModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var table = event.table, controller = event.controller;
            if (controller && !controller.hasPlugin('sticky')) {
                controller.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e.kind === 'onInit'; })), first())
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var stickyPluginConfig = configService.get('stickyPlugin');
                    if (stickyPluginConfig) {
                        if (stickyPluginConfig.headers) {
                            setStickyRow(table, 'header', stickyPluginConfig.headers.map(MAPPER));
                        }
                        if (stickyPluginConfig.footers) {
                            setStickyRow(table, 'footer', stickyPluginConfig.footers.map(MAPPER));
                        }
                        if (stickyPluginConfig.columnStart) {
                            setStickyColumns(table, 'start', stickyPluginConfig.columnStart.map(MAPPER));
                        }
                        if (stickyPluginConfig.columnEnd) {
                            setStickyColumns(table, 'end', stickyPluginConfig.columnEnd.map(MAPPER));
                        }
                    }
                }));
            }
        }));
    }
    PblNgridStickyModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridStickyPluginDirective],
                    exports: [PblNgridStickyPluginDirective],
                },] }
    ];
    /** @nocollapse */
    PblNgridStickyModule.ctorParameters = function () { return [
        { type: PblNgridStickyModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridStickyModule;
}());
export { PblNgridStickyModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBYWpHLE1BQU07Ozs7O0FBQUcsVUFBSSxDQUFJLElBQW1CLE9BQUEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQVQsQ0FBUyxDQUFBOztBQUVuRDtJQU1FLDhCQUFvQyxZQUFrQyxFQUMxRCxhQUFvQztRQUM5QyxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFFRCx3QkFBd0IsQ0FBQyxPQUFPO2FBQzdCLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDUCxJQUFBLG1CQUFLLEVBQUUsNkJBQVU7WUFDekIsSUFBSSxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxVQUFVLENBQUMsTUFBTTtxQkFDZCxJQUFJLENBQUUsTUFBTTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFuQixDQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUU7cUJBQ25ELFNBQVM7Ozs7Z0JBQUUsVUFBQSxLQUFLOzt3QkFDVCxrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztvQkFDNUQsSUFBSSxrQkFBa0IsRUFBRTt3QkFDdEIsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7NEJBQzlCLFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDdkU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7NEJBQzlCLFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDdkU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7NEJBQ2xDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUM5RTt3QkFDRCxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRTs0QkFDaEMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQzFFO3FCQUNGO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ047UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXJDRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7b0JBQ3pELFlBQVksRUFBRSxDQUFFLDZCQUE2QixDQUFFO29CQUMvQyxPQUFPLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTtpQkFDM0M7Ozs7Z0JBRW1ELG9CQUFvQix1QkFBekQsUUFBUSxZQUFJLFFBQVE7Z0JBdEJnQixxQkFBcUI7O0lBc0R4RSwyQkFBQztDQUFBLEFBdENELElBc0NDO1NBakNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbHRlciwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlLCBzZXRTdGlja3lSb3csIHNldFN0aWNreUNvbHVtbnMgfSBmcm9tICcuL3N0aWNreS9zdGlja3ktcGx1Z2luJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHN0aWNreVBsdWdpbj86IHtcbiAgICAgIGhlYWRlcnM/OiBBcnJheTwndGFibGUnIHwgbnVtYmVyPjtcbiAgICAgIGZvb3RlcnM/OiBBcnJheTwndGFibGUnIHwgbnVtYmVyPjtcbiAgICAgIGNvbHVtblN0YXJ0PzogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcbiAgICAgIGNvbHVtbkVuZD86IEFycmF5PHN0cmluZyB8IG51bWJlcj47XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IE1BUFBFUiA9IDxUPih2OiBUKTogW1QsIGJvb2xlYW5dID0+IFt2LCB0cnVlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0aWNreU1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRTdGlja3lNb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCB7IHRhYmxlLCBjb250cm9sbGVyIH0gPSBldmVudDtcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgIWNvbnRyb2xsZXIuaGFzUGx1Z2luKCdzdGlja3knKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZXZlbnRzXG4gICAgICAgICAgICAucGlwZSggZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uSW5pdCcgKSwgZmlyc3QoKSApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVBsdWdpbkNvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdzdGlja3lQbHVnaW4nKTtcbiAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcuaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Um93KHRhYmxlLCAnaGVhZGVyJywgc3RpY2t5UGx1Z2luQ29uZmlnLmhlYWRlcnMubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmZvb3RlcnMpIHtcbiAgICAgICAgICAgICAgICAgIHNldFN0aWNreVJvdyh0YWJsZSwgJ2Zvb3RlcicsIHN0aWNreVBsdWdpbkNvbmZpZy5mb290ZXJzLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5TdGFydCkge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Q29sdW1ucyh0YWJsZSwgJ3N0YXJ0Jywgc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtblN0YXJ0Lm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5FbmQpIHtcbiAgICAgICAgICAgICAgICAgIHNldFN0aWNreUNvbHVtbnModGFibGUsICdlbmQnLCBzdGlja3lQbHVnaW5Db25maWcuY29sdW1uRW5kLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19