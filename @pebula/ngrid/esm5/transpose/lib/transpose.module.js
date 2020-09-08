/**
 * @fileoverview added by tsickle
 * Generated from: lib/transpose.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridTransposePluginDirective, PLUGIN_KEY } from './transpose-plugin.directive';
var PblNgridTransposeModule = /** @class */ (function () {
    function PblNgridTransposeModule() {
    }
    PblNgridTransposeModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridTransposePluginDirective);
    PblNgridTransposeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, PblNgridModule],
                    declarations: [PblNgridTransposePluginDirective],
                    exports: [PblNgridTransposePluginDirective],
                },] }
    ];
    return PblNgridTransposeModule;
}());
export { PblNgridTransposeModule };
if (false) {
    /** @type {?} */
    PblNgridTransposeModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdHJhbnNwb3NlLyIsInNvdXJjZXMiOlsibGliL3RyYW5zcG9zZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsVUFBVSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFNUY7SUFBQTtJQU9BLENBQUM7SUFEaUIsb0NBQVksR0FBRyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQzs7Z0JBTmxHLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLEVBQUUsY0FBYyxDQUFFO29CQUN6QyxZQUFZLEVBQUUsQ0FBRSxnQ0FBZ0MsQ0FBRTtvQkFDbEQsT0FBTyxFQUFFLENBQUUsZ0NBQWdDLENBQUU7aUJBQzlDOztJQUdELDhCQUFDO0NBQUEsQUFQRCxJQU9DO1NBRlksdUJBQXVCOzs7SUFDbEMscUNBQWlHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL3RyYW5zcG9zZS1wbHVnaW4uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZFRyYW5zcG9zZVBsdWdpbkRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVHJhbnNwb3NlTW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmUpO1xufVxuIl19