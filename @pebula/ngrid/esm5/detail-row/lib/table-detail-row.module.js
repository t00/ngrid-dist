/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-detail-row.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PblNgridDetailRowParentRefDirective, PblNgridDetailRowDefDirective, PblNgridDefaultDetailRowParentComponent } from './detail-row/directives';
import { PblNgridDetailRowPluginDirective, PLUGIN_KEY } from './detail-row/detail-row-plugin';
import { PblNgridDetailRowComponent } from './detail-row/row';
/** @type {?} */
var DETAIL_ROW = [
    PblNgridDetailRowPluginDirective,
    PblNgridDetailRowComponent,
    PblNgridDetailRowParentRefDirective,
    PblNgridDetailRowDefDirective,
];
var PblNgridDetailRowModule = /** @class */ (function () {
    function PblNgridDetailRowModule() {
    }
    PblNgridDetailRowModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridDetailRowPluginDirective);
    PblNgridDetailRowModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                    exports: [DETAIL_ROW],
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                    entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent],
                },] }
    ];
    return PblNgridDetailRowModule;
}());
export { PblNgridDetailRowModule };
if (false) {
    /** @type {?} */
    PblNgridDetailRowModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGV0YWlsLXJvdy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvdGFibGUtZGV0YWlsLXJvdy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLDZCQUE2QixFQUFFLHVDQUF1QyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEosT0FBTyxFQUFFLGdDQUFnQyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUV4RCxVQUFVLEdBQUc7SUFDakIsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixtQ0FBbUM7SUFDbkMsNkJBQTZCO0NBQzlCO0FBRUQ7SUFBQTtJQVNBLENBQUM7SUFEaUIsb0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQzs7Z0JBUmxHLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSwwQkFBMEIsQ0FBRTtvQkFDckYsWUFBWSxFQUFFLENBQUUsVUFBVSxFQUFFLHVDQUF1QyxDQUFFO29CQUNyRSxPQUFPLEVBQUUsQ0FBRSxVQUFVLENBQUU7O29CQUV2QixlQUFlLEVBQUUsQ0FBRSwwQkFBMEIsRUFBRSx1Q0FBdUMsQ0FBRTtpQkFDekY7O0lBR0QsOEJBQUM7Q0FBQSxBQVRELElBU0M7U0FGWSx1QkFBdUI7OztJQUNsQyxxQ0FBaUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93UGFyZW50UmVmRGlyZWN0aXZlLCBQYmxOZ3JpZERldGFpbFJvd0RlZkRpcmVjdGl2ZSwgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWwtcm93L2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL2RldGFpbC1yb3cvZGV0YWlsLXJvdy1wbHVnaW4nO1xuaW1wb3J0IHsgUGJsTmdyaWREZXRhaWxSb3dDb21wb25lbnQgfSBmcm9tICcuL2RldGFpbC1yb3cvcm93JztcblxuY29uc3QgREVUQUlMX1JPVyA9IFtcbiAgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmUsXG4gIFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50LFxuICBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmUsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGUsIFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZFRhcmdldEV2ZW50c01vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgREVUQUlMX1JPVywgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgREVUQUlMX1JPVyBdLFxuICAvLyBUT0RPOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjExID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50LCBQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREZXRhaWxSb3dNb2R1bGUge1xuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9LCBQYmxOZ3JpZERldGFpbFJvd1BsdWdpbkRpcmVjdGl2ZSk7XG59XG4iXX0=