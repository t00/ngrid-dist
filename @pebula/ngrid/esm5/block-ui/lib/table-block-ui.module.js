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
var PblNgridBlockUiModule = /** @class */ (function () {
    function PblNgridBlockUiModule() {
    }
    PblNgridBlockUiModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBlockUiPluginDirective);
    PblNgridBlockUiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                    exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
                },] }
    ];
    return PblNgridBlockUiModule;
}());
export { PblNgridBlockUiModule };
if (false) {
    /** @type {?} */
    PblNgridBlockUiModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtYmxvY2stdWkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS1ibG9jay11aS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXhGO0lBQUE7SUFPQSxDQUFDO0lBRGlCLGtDQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLDhCQUE4QixDQUFDLENBQUM7O2dCQU5oRyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUU7b0JBQ3pELFlBQVksRUFBRSxDQUFFLDJCQUEyQixFQUFFLDhCQUE4QixDQUFFO29CQUM3RSxPQUFPLEVBQUUsQ0FBRywyQkFBMkIsRUFBRSw4QkFBOEIsQ0FBRztpQkFDM0U7O0lBR0QsNEJBQUM7Q0FBQSxBQVBELElBT0M7U0FGWSxxQkFBcUI7OztJQUNoQyxtQ0FBK0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUgfSBmcm9tICcuL2Jsb2NrLXVpL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRCbG9ja1VpUGx1Z2luRGlyZWN0aXZlLCBQTFVHSU5fS0VZIH0gZnJvbSAnLi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4nO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgQ2RrVGFibGVNb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUsIFBibE5ncmlkQmxvY2tVaVBsdWdpbkRpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbICBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmUsIFBibE5ncmlkQmxvY2tVaVBsdWdpbkRpcmVjdGl2ZSAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJsb2NrVWlNb2R1bGUge1xuICBzdGF0aWMgcmVhZG9ubHkgTkdSSURfUExVR0lOID0gbmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9LCBQYmxOZ3JpZEJsb2NrVWlQbHVnaW5EaXJlY3RpdmUpO1xufVxuIl19