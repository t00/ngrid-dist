/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PblNgridModule } from '@pebula/ngrid';
import { PblNgridMatCheckboxSelectionDirective } from './checkbox-plugin.directive';
import { PblNgridCheckboxComponent } from './table-checkbox.component';
var PblNgridCheckboxModule = /** @class */ (function () {
    function PblNgridCheckboxModule() {
    }
    PblNgridCheckboxModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    exports: [PblNgridMatCheckboxSelectionDirective, PblNgridCheckboxComponent],
                    entryComponents: [PblNgridCheckboxComponent]
                },] }
    ];
    return PblNgridCheckboxModule;
}());
export { PblNgridCheckboxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zZWxlY3Rpb24tY29sdW1uLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWNoZWNrYm94Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvQyxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RTtJQUFBO0lBTXNDLENBQUM7O2dCQU50QyxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsQ0FBRTtvQkFDNUQsWUFBWSxFQUFFLENBQUUscUNBQXFDLEVBQUUseUJBQXlCLENBQUU7b0JBQ2xGLE9BQU8sRUFBRSxDQUFFLHFDQUFxQyxFQUFFLHlCQUF5QixDQUFFO29CQUM3RSxlQUFlLEVBQUUsQ0FBRSx5QkFBeUIsQ0FBRTtpQkFDL0M7O0lBQ3FDLDZCQUFDO0NBQUEsQUFOdkMsSUFNdUM7U0FBMUIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NoZWNrYm94JztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2NoZWNrYm94LXBsdWdpbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUsIE1hdENoZWNrYm94TW9kdWxlLCBQYmxOZ3JpZE1vZHVsZSBdLFxuICBkZWNsYXJhdGlvbnM6IFsgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSwgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCBdLFxuICBleHBvcnRzOiBbIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUsIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbIFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgXVxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENoZWNrYm94TW9kdWxlIHsgfVxuIl19