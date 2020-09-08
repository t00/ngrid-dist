/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-checkbox.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PblNgridModule, ngridPlugin } from '@pebula/ngrid';
import { PblNgridMatCheckboxSelectionDirective, PLUGIN_KEY } from './checkbox-plugin.directive';
import { PblNgridCheckboxComponent } from './table-checkbox.component';
var PblNgridCheckboxModule = /** @class */ (function () {
    function PblNgridCheckboxModule() {
    }
    PblNgridCheckboxModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatCheckboxSelectionDirective);
    PblNgridCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                    entryComponents: [PblNgridCheckboxComponent]
                },] }
    ];
    return PblNgridCheckboxModule;
}());
export { PblNgridCheckboxModule };
if (false) {
    /** @type {?} */
    PblNgridCheckboxModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RTtJQUFBO0lBU0EsQ0FBQztJQURpQixtQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDOztnQkFSdkcsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLENBQUU7b0JBQzVELFlBQVksRUFBRSxDQUFFLHFDQUFxQyxFQUFFLHlCQUF5QixDQUFFO29CQUNsRixPQUFPLEVBQUUsQ0FBRSxxQ0FBcUMsRUFBRSx5QkFBeUIsQ0FBRTs7b0JBRTdFLGVBQWUsRUFBRSxDQUFFLHlCQUF5QixDQUFFO2lCQUMvQzs7SUFHRCw2QkFBQztDQUFBLEFBVEQsSUFTQztTQUZZLHNCQUFzQjs7O0lBQ2pDLG9DQUFzRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSwgUExVR0lOX0tFWSB9IGZyb20gJy4vY2hlY2tib3gtcGx1Z2luLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSwgTWF0Q2hlY2tib3hNb2R1bGUsIFBibE5ncmlkTW9kdWxlIF0sXG4gIGRlY2xhcmF0aW9uczogWyBQYmxOZ3JpZE1hdENoZWNrYm94U2VsZWN0aW9uRGlyZWN0aXZlLCBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IF0sXG4gIGV4cG9ydHM6IFsgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSwgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCBdLFxuICAvLyBUT0RPOiByZW1vdmUgd2hlbiBWaWV3RW5naW5lIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgYW5ndWxhciAoVjExID8/PylcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENoZWNrYm94TW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSk7XG59XG4iXX0=