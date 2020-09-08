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
const DETAIL_ROW = [
    PblNgridDetailRowPluginDirective,
    PblNgridDetailRowComponent,
    PblNgridDetailRowParentRefDirective,
    PblNgridDetailRowDefDirective,
];
export class PblNgridDetailRowModule {
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
if (false) {
    /** @type {?} */
    PblNgridDetailRowModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGV0YWlsLXJvdy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2RldGFpbC1yb3cvIiwic291cmNlcyI6WyJsaWIvdGFibGUtZGV0YWlsLXJvdy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFekUsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLDZCQUE2QixFQUFFLHVDQUF1QyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdEosT0FBTyxFQUFFLGdDQUFnQyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOztNQUV4RCxVQUFVLEdBQUc7SUFDakIsZ0NBQWdDO0lBQ2hDLDBCQUEwQjtJQUMxQixtQ0FBbUM7SUFDbkMsNkJBQTZCO0NBQzlCO0FBU0QsTUFBTSxPQUFPLHVCQUF1Qjs7QUFDbEIsb0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQzs7WUFSbEcsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLDBCQUEwQixDQUFFO2dCQUNyRixZQUFZLEVBQUUsQ0FBRSxVQUFVLEVBQUUsdUNBQXVDLENBQUU7Z0JBQ3JFLE9BQU8sRUFBRSxDQUFFLFVBQVUsQ0FBRTs7Z0JBRXZCLGVBQWUsRUFBRSxDQUFFLDBCQUEwQixFQUFFLHVDQUF1QyxDQUFFO2FBQ3pGOzs7O0lBRUMscUNBQWlHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZERldGFpbFJvd1BhcmVudFJlZkRpcmVjdGl2ZSwgUGJsTmdyaWREZXRhaWxSb3dEZWZEaXJlY3RpdmUsIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCB9IGZyb20gJy4vZGV0YWlsLXJvdy9kaXJlY3RpdmVzJztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9kZXRhaWwtcm93L2RldGFpbC1yb3ctcGx1Z2luJztcbmltcG9ydCB7IFBibE5ncmlkRGV0YWlsUm93Q29tcG9uZW50IH0gZnJvbSAnLi9kZXRhaWwtcm93L3Jvdyc7XG5cbmNvbnN0IERFVEFJTF9ST1cgPSBbXG4gIFBibE5ncmlkRGV0YWlsUm93UGx1Z2luRGlyZWN0aXZlLFxuICBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCxcbiAgUGJsTmdyaWREZXRhaWxSb3dQYXJlbnRSZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRGV0YWlsUm93RGVmRGlyZWN0aXZlLFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIERFVEFJTF9ST1csIFBibE5ncmlkRGVmYXVsdERldGFpbFJvd1BhcmVudENvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIERFVEFJTF9ST1cgXSxcbiAgLy8gVE9ETzogcmVtb3ZlIHdoZW4gVmlld0VuZ2luZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGFuZ3VsYXIgKFYxMSA/Pz8pXG4gIGVudHJ5Q29tcG9uZW50czogWyBQYmxOZ3JpZERldGFpbFJvd0NvbXBvbmVudCwgUGJsTmdyaWREZWZhdWx0RGV0YWlsUm93UGFyZW50Q29tcG9uZW50IF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGV0YWlsUm93TW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWREZXRhaWxSb3dQbHVnaW5EaXJlY3RpdmUpO1xufVxuIl19