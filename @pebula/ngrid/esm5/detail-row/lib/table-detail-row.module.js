/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { PblNgridDetailRowParentRefDirective, PblNgridDetailRowDefDirective, PblNgridDefaultDetailRowParentComponent } from './detail-row/directives';
import { PblNgridDetailRowPluginDirective } from './detail-row/detail-row-plugin';
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
    PblNgridDetailRowModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [DETAIL_ROW, PblNgridDefaultDetailRowParentComponent],
                    exports: [DETAIL_ROW],
                    entryComponents: [PblNgridDetailRowComponent, PblNgridDefaultDetailRowParentComponent]
                },] }
    ];
    return PblNgridDetailRowModule;
}());
export { PblNgridDetailRowModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGV0YWlsLXJvdy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvdGFibGUtZGV0YWlsLXJvdy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXpFLE9BQU8sRUFBRSxtQ0FBbUMsRUFBRSw2QkFBNkIsRUFBRSx1Q0FBdUMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RKLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztJQUV4RCxVQUFVLEdBQUc7SUFDakIsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixtQ0FBbUM7SUFDbkMsNkJBQTZCO0NBQzlCO0FBRUQ7SUFBQTtJQU11QyxDQUFDOztnQkFOdkMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO29CQUNyRixZQUFZLEVBQUUsQ0FBRSxVQUFVLEVBQUUsdUNBQXVDLENBQUU7b0JBQ3JFLE9BQU8sRUFBRSxDQUFFLFVBQVUsQ0FBRTtvQkFDdkIsZUFBZSxFQUFFLENBQUUsMEJBQTBCLEVBQUUsdUNBQXVDLENBQUU7aUJBQ3pGOztJQUNzQyw4QkFBQztDQUFBLEFBTnhDLElBTXdDO1NBQTNCLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZSwgUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmUsIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCB9IGZyb20gJy4vZGV0YWlsLXJvdy9kaXJlY3RpdmVzJztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlIH0gZnJvbSAnLi9kZXRhaWwtcm93L2RldGFpbC1yb3ctcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWwtcm93L3Jvdyc7XG5cbmNvbnN0IERFVEFJTF9ST1cgPSBbXG4gIFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlLFxuICBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCxcbiAgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIERFVEFJTF9ST1csIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIERFVEFJTF9ST1cgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50LCBQYmxOZ3JpZERlZmF1bHREZXRhaWxSb3dQYXJlbnRDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERldGFpbFJvd01vZHVsZSB7IH1cbiJdfQ==