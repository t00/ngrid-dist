/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PblNgridModule, PblNgridConfigService, PblNgridRegistryService } from '@pebula/ngrid';
import { PblNgridOverlayPanelModule, PblNgridOverlayPanelComponentExtension } from '@pebula/ngrid/overlay-panel';
import { MatHeaderContextMenuTrigger } from './header-context/header-context-menu-trigger';
import { MatHeaderContextMenuExtension } from './header-context/header-context-menu-extension';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context/header-context-menu.directive';
import { MatExcelStyleHeaderMenu } from './header-context/styles/excel-style-header-menu';
var PblNgridContextMenuModule = /** @class */ (function () {
    function PblNgridContextMenuModule(parentModule, registry, cfr, configService) {
        if (parentModule) {
            return;
        }
        registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
        registry.addMulti('overlayPanels', new PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
    }
    PblNgridContextMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatFormFieldModule,
                        MatInputModule,
                        PblNgridModule,
                        PblNgridOverlayPanelModule
                    ],
                    declarations: [
                        MatHeaderContextMenuTrigger,
                        PblNgridMatHeaderContextMenuPlugin,
                        MatExcelStyleHeaderMenu,
                    ],
                    exports: [
                        PblNgridMatHeaderContextMenuPlugin,
                    ],
                    entryComponents: [
                        MatHeaderContextMenuTrigger,
                        MatExcelStyleHeaderMenu,
                    ],
                },] }
    ];
    /** @nocollapse */
    PblNgridContextMenuModule.ctorParameters = function () { return [
        { type: PblNgridContextMenuModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridRegistryService },
        { type: ComponentFactoryResolver },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridContextMenuModule;
}());
export { PblNgridContextMenuModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLHNDQUFzQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHakgsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDM0YsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDL0YsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDcEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFFMUY7SUF5QkUsbUNBQW9DLFlBQXVDLEVBQy9ELFFBQWlDLEVBQ2pDLEdBQTZCLEVBQzdCLGFBQW9DO1FBQzlDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsSUFBSSw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksc0NBQXNDLENBQUMsV0FBVyxFQUFFLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUgsQ0FBQzs7Z0JBbENGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3dCQUNiLGVBQWU7d0JBQ2YsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsY0FBYzt3QkFDZCwwQkFBMEI7cUJBQzNCO29CQUNELFlBQVksRUFBRTt3QkFDWiwyQkFBMkI7d0JBQzNCLGtDQUFrQzt3QkFDbEMsdUJBQXVCO3FCQUN4QjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asa0NBQWtDO3FCQUNuQztvQkFDRCxlQUFlLEVBQUU7d0JBQ2YsMkJBQTJCO3dCQUMzQix1QkFBdUI7cUJBQ3hCO2lCQUNGOzs7O2dCQUVtRCx5QkFBeUIsdUJBQTlELFFBQVEsWUFBSSxRQUFRO2dCQWxDYSx1QkFBdUI7Z0JBUmhDLHdCQUF3QjtnQkFRdEMscUJBQXFCOztJQTRDOUMsZ0NBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQVhZLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgU2tpcFNlbGYsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pY29uJztcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbic7XG5pbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5pbXBvcnQgeyBNYXRGb3JtRmllbGRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaW5wdXQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1vZHVsZSwgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxNb2R1bGUsIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcbmltcG9ydCB7IFBibE5ncmlkVGFyZ2V0RXZlbnRzTW9kdWxlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC90YXJnZXQtZXZlbnRzJztcblxuaW1wb3J0IHsgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXInO1xuaW1wb3J0IHsgTWF0SGVhZGVyQ29udGV4dE1lbnVFeHRlbnNpb24gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51IH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC9zdHlsZXMvZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFBibE5ncmlkTW9kdWxlLFxuICAgIFBibE5ncmlkT3ZlcmxheVBhbmVsTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcixcbiAgICBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLFxuICAgIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbixcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLFxuICAgIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbnRleHRNZW51TW9kdWxlIHtcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZENvbnRleHRNZW51TW9kdWxlLFxuICAgICAgICAgICAgICByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdkYXRhSGVhZGVyRXh0ZW5zaW9ucycsIG5ldyBNYXRIZWFkZXJDb250ZXh0TWVudUV4dGVuc2lvbihjZnIpKTtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnb3ZlcmxheVBhbmVscycsIG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbignZXhjZWxNZW51JywgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUsIGNmcikpO1xuICB9XG59XG4iXX0=