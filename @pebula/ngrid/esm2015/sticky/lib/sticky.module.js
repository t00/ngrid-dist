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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O01BYWpHLE1BQU07Ozs7O0FBQUcsQ0FBSSxDQUFJLEVBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFPbkQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFDL0IsWUFBb0MsWUFBa0MsRUFDMUQsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7a0JBQ1osRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSztZQUNuQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxNQUFNO3FCQUNkLElBQUksQ0FBRSxNQUFNOzs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBRTtxQkFDbkQsU0FBUzs7OztnQkFBRSxLQUFLLENBQUMsRUFBRTs7MEJBQ1osa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7b0JBQzVELElBQUksa0JBQWtCLEVBQUU7d0JBQ3RCLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3ZFO3dCQUNELElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3ZFO3dCQUNELElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFOzRCQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDOUU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7NEJBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUMxRTtxQkFDRjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFyQ0YsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFFO2dCQUN6RCxZQUFZLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTtnQkFDL0MsT0FBTyxFQUFFLENBQUUsNkJBQTZCLENBQUU7YUFDM0M7Ozs7WUFFbUQsb0JBQW9CLHVCQUF6RCxRQUFRLFlBQUksUUFBUTtZQXRCZ0IscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUsIHNldFN0aWNreVJvdywgc2V0U3RpY2t5Q29sdW1ucyB9IGZyb20gJy4vc3RpY2t5L3N0aWNreS1wbHVnaW4nO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBzdGlja3lQbHVnaW4/OiB7XG4gICAgICBoZWFkZXJzPzogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj47XG4gICAgICBmb290ZXJzPzogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj47XG4gICAgICBjb2x1bW5TdGFydD86IEFycmF5PHN0cmluZyB8IG51bWJlcj47XG4gICAgICBjb2x1bW5FbmQ/OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBNQVBQRVIgPSA8VD4odjogVCk6IFtULCBib29sZWFuXSA9PiBbdiwgdHJ1ZV07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsgQ29tbW9uTW9kdWxlLCBDZGtUYWJsZU1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlIF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGlja3lNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkU3RpY2t5TW9kdWxlLFxuICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmNyZWF0ZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgeyB0YWJsZSwgY29udHJvbGxlciB9ID0gZXZlbnQ7XG4gICAgICAgIGlmIChjb250cm9sbGVyICYmICFjb250cm9sbGVyLmhhc1BsdWdpbignc3RpY2t5JykpIHtcbiAgICAgICAgICBjb250cm9sbGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvbkluaXQnICksIGZpcnN0KCkgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzdGlja3lQbHVnaW5Db25maWcgPSBjb25maWdTZXJ2aWNlLmdldCgnc3RpY2t5UGx1Z2luJyk7XG4gICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgIHNldFN0aWNreVJvdyh0YWJsZSwgJ2hlYWRlcicsIHN0aWNreVBsdWdpbkNvbmZpZy5oZWFkZXJzLm1hcChNQVBQRVIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5mb290ZXJzKSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lSb3codGFibGUsICdmb290ZXInLCBzdGlja3lQbHVnaW5Db25maWcuZm9vdGVycy5tYXAoTUFQUEVSKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcuY29sdW1uU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgIHNldFN0aWNreUNvbHVtbnModGFibGUsICdzdGFydCcsIHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5TdGFydC5tYXAoTUFQUEVSKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcuY29sdW1uRW5kKSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lDb2x1bW5zKHRhYmxlLCAnZW5kJywgc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtbkVuZC5tYXAoTUFQUEVSKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==