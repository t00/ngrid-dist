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
export class PblNgridCheckboxModule {
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
if (false) {
    /** @type {?} */
    PblNgridCheckboxModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQ0FBcUMsRUFBRSxVQUFVLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNoRyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVN2RSxNQUFNLE9BQU8sc0JBQXNCOztBQUNqQixtQ0FBWSxHQUFHLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxxQ0FBcUMsQ0FBQyxDQUFDOztZQVJ2RyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBRTtnQkFDNUQsWUFBWSxFQUFFLENBQUUscUNBQXFDLEVBQUUseUJBQXlCLENBQUU7Z0JBQ2xGLE9BQU8sRUFBRSxDQUFFLHFDQUFxQyxFQUFFLHlCQUF5QixDQUFFOztnQkFFN0UsZUFBZSxFQUFFLENBQUUseUJBQXlCLENBQUU7YUFDL0M7Ozs7SUFFQyxvQ0FBc0ciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgbmdyaWRQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUsIFBMVUdJTl9LRVkgfSBmcm9tICcuL2NoZWNrYm94LXBsdWdpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdENoZWNrYm94TW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSwgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUsIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgXSxcbiAgLy8gVE9ETzogcmVtb3ZlIHdoZW4gVmlld0VuZ2luZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGFuZ3VsYXIgKFYxMSA/Pz8pXG4gIGVudHJ5Q29tcG9uZW50czogWyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IF1cbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDaGVja2JveE1vZHVsZSB7XG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0sIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUpO1xufVxuIl19