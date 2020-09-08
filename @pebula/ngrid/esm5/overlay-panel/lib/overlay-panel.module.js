/**
 * @fileoverview added by tsickle
 * Generated from: lib/overlay-panel.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PblNgridOverlayPanelFactory } from './overlay-panel.service';
import { PblNgridOverlayPanelDef } from './overlay-panel-def';
var PblNgridOverlayPanelModule = /** @class */ (function () {
    function PblNgridOverlayPanelModule() {
    }
    PblNgridOverlayPanelModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        OverlayModule,
                        BidiModule,
                    ],
                    declarations: [
                        PblNgridOverlayPanelDef,
                    ],
                    exports: [
                        PblNgridOverlayPanelDef,
                    ],
                    providers: [
                        PblNgridOverlayPanelFactory,
                    ],
                },] }
    ];
    return PblNgridOverlayPanelModule;
}());
export { PblNgridOverlayPanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXJELE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlEO0lBQUE7SUFrQkEsQ0FBQzs7Z0JBbEJBLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLHVCQUF1QjtxQkFDeEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLHVCQUF1QjtxQkFDeEI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULDJCQUEyQjtxQkFDNUI7aUJBQ0Y7O0lBR0QsaUNBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQUZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQmlkaU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsRmFjdG9yeSB9IGZyb20gJy4vb3ZlcmxheS1wYW5lbC5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsRGVmIH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLWRlZic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgT3ZlcmxheU1vZHVsZSxcbiAgICBCaWRpTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQYmxOZ3JpZE92ZXJsYXlQYW5lbERlZixcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBibE5ncmlkT3ZlcmxheVBhbmVsRGVmLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsTW9kdWxlIHtcblxufVxuIl19