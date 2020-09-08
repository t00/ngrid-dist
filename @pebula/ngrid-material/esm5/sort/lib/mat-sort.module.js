/**
 * @fileoverview added by tsickle
 * Generated from: lib/mat-sort.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule, MatSortHeader } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { PblNgridModule, PblNgridRegistryService, ngridPlugin } from '@pebula/ngrid';
import { PblNgridMatSortDirective, PLUGIN_KEY } from './mat-sort.directive';
import { MatSortExtension } from './mat-sort-component-extension';
var PblNgridMatSortModule = /** @class */ (function () {
    function PblNgridMatSortModule(registry, cfr) {
        this.registry = registry;
        registry.addMulti('dataHeaderExtensions', new MatSortExtension(cfr));
    }
    PblNgridMatSortModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatSortDirective);
    PblNgridMatSortModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatButtonModule, MatSortModule, PblNgridModule],
                    declarations: [PblNgridMatSortDirective],
                    exports: [PblNgridMatSortDirective, MatSortModule],
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                    entryComponents: [MatSortHeader],
                },] }
    ];
    /** @nocollapse */
    PblNgridMatSortModule.ctorParameters = function () { return [
        { type: PblNgridRegistryService },
        { type: ComponentFactoryResolver }
    ]; };
    return PblNgridMatSortModule;
}());
export { PblNgridMatSortModule };
if (false) {
    /** @type {?} */
    PblNgridMatSortModule.NGRID_PLUGIN;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortModule.prototype.registry;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTNELE9BQU8sRUFBRSxjQUFjLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVsRTtJQVVFLCtCQUFvQixRQUFpQyxFQUFFLEdBQTZCO1FBQWhFLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ25ELFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFKZSxrQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDOztnQkFSMUYsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBRTtvQkFDekUsWUFBWSxFQUFFLENBQUUsd0JBQXdCLENBQUU7b0JBQzFDLE9BQU8sRUFBRSxDQUFFLHdCQUF3QixFQUFFLGFBQWEsQ0FBRTs7b0JBRXBELGVBQWUsRUFBRSxDQUFFLGFBQWEsQ0FBRTtpQkFDbkM7Ozs7Z0JBVndCLHVCQUF1QjtnQkFMN0Isd0JBQXdCOztJQXNCM0MsNEJBQUM7Q0FBQSxBQWJELElBYUM7U0FOWSxxQkFBcUI7OztJQUNoQyxtQ0FBeUY7Ozs7O0lBRTdFLHlDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRTb3J0TW9kdWxlLCBNYXRTb3J0SGVhZGVyIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL21hdC1zb3J0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNYXRTb3J0RXh0ZW5zaW9uIH0gZnJvbSAnLi9tYXQtc29ydC1jb21wb25lbnQtZXh0ZW5zaW9uJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0U29ydE1vZHVsZSwgUGJsTmdyaWRNb2R1bGUgXSxcbiAgZGVjbGFyYXRpb25zOiBbIFBibE5ncmlkTWF0U29ydERpcmVjdGl2ZSBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkTWF0U29ydERpcmVjdGl2ZSwgTWF0U29ydE1vZHVsZSBdLFxuICAvLyBUT0RPOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjExID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIE1hdFNvcnRIZWFkZXIgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRTb3J0TW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIpIHtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCBuZXcgTWF0U29ydEV4dGVuc2lvbihjZnIpKTtcbiAgfVxufVxuIl19