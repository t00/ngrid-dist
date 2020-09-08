/**
 * @fileoverview added by tsickle
 * Generated from: lib/sticky.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { filter, first } from 'rxjs/operators';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, PblNgridPluginController, PblNgridConfigService, ngridPlugin } from '@pebula/ngrid';
import { PblNgridStickyPluginDirective, setStickyRow, setStickyColumns, PLUGIN_KEY } from './sticky/sticky-plugin';
/** @type {?} */
const MAPPER = (/**
 * @template T
 * @param {?} v
 * @return {?}
 */
(v) => [v, true]);
const ɵ0 = MAPPER;
export class PblNgridStickyModule {
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
            const { table, controller } = event;
            if (controller && !controller.hasPlugin('sticky')) {
                controller.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e.kind === 'onInit')), first())
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    /** @type {?} */
                    const stickyPluginConfig = configService.get('stickyPlugin');
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
}
PblNgridStickyModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridStickyPluginDirective);
PblNgridStickyModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule],
                declarations: [PblNgridStickyPluginDirective],
                exports: [PblNgridStickyPluginDirective],
            },] }
];
/** @nocollapse */
PblNgridStickyModule.ctorParameters = () => [
    { type: PblNgridStickyModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];
if (false) {
    /** @type {?} */
    PblNgridStickyModule.NGRID_PLUGIN;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxjQUFjLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7O01BYTdHLE1BQU07Ozs7O0FBQUcsQ0FBSSxDQUFJLEVBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFPbkQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFJL0IsWUFBb0MsWUFBa0MsRUFDMUQsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7a0JBQ1osRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSztZQUNuQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxNQUFNO3FCQUNkLElBQUksQ0FBRSxNQUFNOzs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBRTtxQkFDbkQsU0FBUzs7OztnQkFBRSxLQUFLLENBQUMsRUFBRTs7MEJBQ1osa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7b0JBQzVELElBQUksa0JBQWtCLEVBQUU7d0JBQ3RCLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3ZFO3dCQUNELElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3ZFO3dCQUNELElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFOzRCQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDOUU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7NEJBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUMxRTtxQkFDRjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOztBQWpDZSxpQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDOztZQVAvRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7Z0JBQ3pELFlBQVksRUFBRSxDQUFFLDZCQUE2QixDQUFFO2dCQUMvQyxPQUFPLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTthQUMzQzs7OztZQUttRCxvQkFBb0IsdUJBQXpELFFBQVEsWUFBSSxRQUFRO1lBekJnQixxQkFBcUI7Ozs7SUF1QnRFLGtDQUE4RiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbHRlciwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSwgc2V0U3RpY2t5Um93LCBzZXRTdGlja3lDb2x1bW5zLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9zdGlja3kvc3RpY2t5LXBsdWdpbic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHN0aWNreVBsdWdpbj86IHtcbiAgICAgIGhlYWRlcnM/OiBBcnJheTwndGFibGUnIHwgbnVtYmVyPjtcbiAgICAgIGZvb3RlcnM/OiBBcnJheTwndGFibGUnIHwgbnVtYmVyPjtcbiAgICAgIGNvbHVtblN0YXJ0PzogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcbiAgICAgIGNvbHVtbkVuZD86IEFycmF5PHN0cmluZyB8IG51bWJlcj47XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IE1BUFBFUiA9IDxUPih2OiBUKTogW1QsIGJvb2xlYW5dID0+IFt2LCB0cnVlXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0aWNreU1vZHVsZSB7XG5cbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRTdGlja3lNb2R1bGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuY3JlYXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCB7IHRhYmxlLCBjb250cm9sbGVyIH0gPSBldmVudDtcbiAgICAgICAgaWYgKGNvbnRyb2xsZXIgJiYgIWNvbnRyb2xsZXIuaGFzUGx1Z2luKCdzdGlja3knKSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZXZlbnRzXG4gICAgICAgICAgICAucGlwZSggZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uSW5pdCcgKSwgZmlyc3QoKSApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVBsdWdpbkNvbmZpZyA9IGNvbmZpZ1NlcnZpY2UuZ2V0KCdzdGlja3lQbHVnaW4nKTtcbiAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZykge1xuICAgICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcuaGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Um93KHRhYmxlLCAnaGVhZGVyJywgc3RpY2t5UGx1Z2luQ29uZmlnLmhlYWRlcnMubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmZvb3RlcnMpIHtcbiAgICAgICAgICAgICAgICAgIHNldFN0aWNreVJvdyh0YWJsZSwgJ2Zvb3RlcicsIHN0aWNreVBsdWdpbkNvbmZpZy5mb290ZXJzLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5TdGFydCkge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Q29sdW1ucyh0YWJsZSwgJ3N0YXJ0Jywgc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtblN0YXJ0Lm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5FbmQpIHtcbiAgICAgICAgICAgICAgICAgIHNldFN0aWNreUNvbHVtbnModGFibGUsICdlbmQnLCBzdGlja3lQbHVnaW5Db25maWcuY29sdW1uRW5kLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19