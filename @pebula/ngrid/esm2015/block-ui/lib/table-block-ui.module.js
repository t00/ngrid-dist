/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-block-ui.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridBlockUiDefDirective } from './block-ui/directives';
import { PblNgridBlockUiPluginDirective, PLUGIN_KEY } from './block-ui/block-ui-plugin';
export class PblNgridBlockUiModule {
}
PblNgridBlockUiModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBlockUiPluginDirective);
PblNgridBlockUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule],
                declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
            },] }
];
if (false) {
    /** @type {?} */
    PblNgridBlockUiModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYmxvY2stdWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS1ibG9jay11aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBT3hGLE1BQU0sT0FBTyxxQkFBcUI7O0FBQ2hCLGtDQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLDhCQUE4QixDQUFDLENBQUM7O1lBTmhHLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBRTtnQkFDekQsWUFBWSxFQUFFLENBQUUsMkJBQTJCLEVBQUUsOEJBQThCLENBQUU7Z0JBQzdFLE9BQU8sRUFBRSxDQUFHLDJCQUEyQixFQUFFLDhCQUE4QixDQUFHO2FBQzNFOzs7O0lBRUMsbUNBQStGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlIH0gZnJvbSAnLi9ibG9jay11aS9kaXJlY3RpdmVzJztcbmltcG9ydCB7IFBibE5ncmlkQmxvY2tVaVBsdWdpbkRpcmVjdGl2ZSwgUExVR0lOX0tFWSB9IGZyb20gJy4vYmxvY2stdWkvYmxvY2stdWktcGx1Z2luJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIENka1RhYmxlTW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEJsb2NrVWlQbHVnaW5EaXJlY3RpdmUgXSxcbiAgZXhwb3J0czogWyAgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEJsb2NrVWlQbHVnaW5EaXJlY3RpdmUgIF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCbG9ja1VpTW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRCbG9ja1VpUGx1Z2luRGlyZWN0aXZlKTtcbn1cbiJdfQ==