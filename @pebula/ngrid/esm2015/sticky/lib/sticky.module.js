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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O01BYWpHLE1BQU07Ozs7O0FBQUcsQ0FBSSxDQUFJLEVBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTs7QUFPbkQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFDL0IsWUFBb0MsWUFBa0MsRUFDMUQsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBRUQsd0JBQXdCLENBQUMsT0FBTzthQUM3QixTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7a0JBQ1osRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsS0FBSztZQUNuQyxJQUFJLFVBQVUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2pELFVBQVUsQ0FBQyxNQUFNO3FCQUNkLElBQUksQ0FBRSxNQUFNOzs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBRTtxQkFDbkQsU0FBUzs7OztnQkFBRSxLQUFLLENBQUMsRUFBRTs7MEJBQ1osa0JBQWtCLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7b0JBQzVELElBQUksa0JBQWtCLEVBQUU7d0JBQ3RCLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3ZFO3dCQUNELElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFOzRCQUM5QixZQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQ3ZFO3dCQUNELElBQUksa0JBQWtCLENBQUMsV0FBVyxFQUFFOzRCQUNsQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDOUU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUU7NEJBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUMxRTtxQkFDRjtnQkFDSCxDQUFDLEVBQUMsQ0FBQzthQUNOO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7WUFyQ0YsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFFO2dCQUN6RCxZQUFZLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTtnQkFDL0MsT0FBTyxFQUFFLENBQUUsNkJBQTZCLENBQUU7YUFDM0M7Ozs7WUFFbUQsb0JBQW9CLHVCQUF6RCxRQUFRLFlBQUksUUFBUTtZQXRCZ0IscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyLCBmaXJzdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUsIHNldFN0aWNreVJvdywgc2V0U3RpY2t5Q29sdW1ucyB9IGZyb20gJy4vc3RpY2t5L3N0aWNreS1wbHVnaW4nO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvdGFibGUvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgc3RpY2t5UGx1Z2luPzoge1xuICAgICAgaGVhZGVycz86IEFycmF5PCd0YWJsZScgfCBudW1iZXI+O1xuICAgICAgZm9vdGVycz86IEFycmF5PCd0YWJsZScgfCBudW1iZXI+O1xuICAgICAgY29sdW1uU3RhcnQ/OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICAgICAgY29sdW1uRW5kPzogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgTUFQUEVSID0gPFQ+KHY6IFQpOiBbVCwgYm9vbGVhbl0gPT4gW3YsIHRydWVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RpY2t5TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZFN0aWNreU1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGFibGUsIGNvbnRyb2xsZXIgfSA9IGV2ZW50O1xuICAgICAgICBpZiAoY29udHJvbGxlciAmJiAhY29udHJvbGxlci5oYXNQbHVnaW4oJ3N0aWNreScpKSB7XG4gICAgICAgICAgY29udHJvbGxlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKCBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25Jbml0JyApLCBmaXJzdCgpIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RpY2t5UGx1Z2luQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoJ3N0aWNreVBsdWdpbicpO1xuICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lSb3codGFibGUsICdoZWFkZXInLCBzdGlja3lQbHVnaW5Db25maWcuaGVhZGVycy5tYXAoTUFQUEVSKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcuZm9vdGVycykge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Um93KHRhYmxlLCAnZm9vdGVyJywgc3RpY2t5UGx1Z2luQ29uZmlnLmZvb3RlcnMubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lDb2x1bW5zKHRhYmxlLCAnc3RhcnQnLCBzdGlja3lQbHVnaW5Db25maWcuY29sdW1uU3RhcnQubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtbkVuZCkge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Q29sdW1ucyh0YWJsZSwgJ2VuZCcsIHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5FbmQubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=