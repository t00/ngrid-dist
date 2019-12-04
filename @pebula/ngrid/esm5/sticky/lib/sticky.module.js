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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7O0lBYWpHLE1BQU07Ozs7O0FBQUcsVUFBSSxDQUFJLElBQW1CLE9BQUEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQVQsQ0FBUyxDQUFBOztBQUVuRDtJQU1FLDhCQUFvQyxZQUFrQyxFQUMxRCxhQUFvQztRQUM5QyxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPO1NBQ1I7UUFFRCx3QkFBd0IsQ0FBQyxPQUFPO2FBQzdCLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDUCxJQUFBLG1CQUFLLEVBQUUsNkJBQVU7WUFDekIsSUFBSSxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNqRCxVQUFVLENBQUMsTUFBTTtxQkFDZCxJQUFJLENBQUUsTUFBTTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFuQixDQUFtQixFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUU7cUJBQ25ELFNBQVM7Ozs7Z0JBQUUsVUFBQSxLQUFLOzt3QkFDVCxrQkFBa0IsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztvQkFDNUQsSUFBSSxrQkFBa0IsRUFBRTt3QkFDdEIsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7NEJBQzlCLFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDdkU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7NEJBQzlCLFlBQVksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDdkU7d0JBQ0QsSUFBSSxrQkFBa0IsQ0FBQyxXQUFXLEVBQUU7NEJBQ2xDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3lCQUM5RTt3QkFDRCxJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRTs0QkFDaEMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQzFFO3FCQUNGO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ047UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7O2dCQXJDRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7b0JBQ3pELFlBQVksRUFBRSxDQUFFLDZCQUE2QixDQUFFO29CQUMvQyxPQUFPLEVBQUUsQ0FBRSw2QkFBNkIsQ0FBRTtpQkFDM0M7Ozs7Z0JBRW1ELG9CQUFvQix1QkFBekQsUUFBUSxZQUFJLFFBQVE7Z0JBdEJnQixxQkFBcUI7O0lBc0R4RSwyQkFBQztDQUFBLEFBdENELElBc0NDO1NBakNZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbHRlciwgZmlyc3QgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlLCBzZXRTdGlja3lSb3csIHNldFN0aWNreUNvbHVtbnMgfSBmcm9tICcuL3N0aWNreS9zdGlja3ktcGx1Z2luJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgc3RpY2t5UGx1Z2luPzoge1xuICAgICAgaGVhZGVycz86IEFycmF5PCd0YWJsZScgfCBudW1iZXI+O1xuICAgICAgZm9vdGVycz86IEFycmF5PCd0YWJsZScgfCBudW1iZXI+O1xuICAgICAgY29sdW1uU3RhcnQ/OiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICAgICAgY29sdW1uRW5kPzogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgTUFQUEVSID0gPFQ+KHY6IFQpOiBbVCwgYm9vbGVhbl0gPT4gW3YsIHRydWVdO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RpY2t5TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZFN0aWNreU1vZHVsZSxcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5jcmVhdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdGFibGUsIGNvbnRyb2xsZXIgfSA9IGV2ZW50O1xuICAgICAgICBpZiAoY29udHJvbGxlciAmJiAhY29udHJvbGxlci5oYXNQbHVnaW4oJ3N0aWNreScpKSB7XG4gICAgICAgICAgY29udHJvbGxlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKCBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25Jbml0JyApLCBmaXJzdCgpIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgc3RpY2t5UGx1Z2luQ29uZmlnID0gY29uZmlnU2VydmljZS5nZXQoJ3N0aWNreVBsdWdpbicpO1xuICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0aWNreVBsdWdpbkNvbmZpZy5oZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lSb3codGFibGUsICdoZWFkZXInLCBzdGlja3lQbHVnaW5Db25maWcuaGVhZGVycy5tYXAoTUFQUEVSKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGlja3lQbHVnaW5Db25maWcuZm9vdGVycykge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Um93KHRhYmxlLCAnZm9vdGVyJywgc3RpY2t5UGx1Z2luQ29uZmlnLmZvb3RlcnMubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtblN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICBzZXRTdGlja3lDb2x1bW5zKHRhYmxlLCAnc3RhcnQnLCBzdGlja3lQbHVnaW5Db25maWcuY29sdW1uU3RhcnQubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5UGx1Z2luQ29uZmlnLmNvbHVtbkVuZCkge1xuICAgICAgICAgICAgICAgICAgc2V0U3RpY2t5Q29sdW1ucyh0YWJsZSwgJ2VuZCcsIHN0aWNreVBsdWdpbkNvbmZpZy5jb2x1bW5FbmQubWFwKE1BUFBFUikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=