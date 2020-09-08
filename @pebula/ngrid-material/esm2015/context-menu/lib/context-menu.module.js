/**
 * @fileoverview added by tsickle
 * Generated from: lib/context-menu.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PblNgridModule, PblNgridConfigService, PblNgridRegistryService, ngridPlugin } from '@pebula/ngrid';
import { PblNgridOverlayPanelModule, PblNgridOverlayPanelComponentExtension } from '@pebula/ngrid/overlay-panel';
import { MatHeaderContextMenuTrigger } from './header-context/header-context-menu-trigger';
import { MatHeaderContextMenuExtension } from './header-context/header-context-menu-extension';
import { PblNgridMatHeaderContextMenuPlugin, PLUGIN_KEY } from './header-context/header-context-menu.directive';
import { MatExcelStyleHeaderMenu } from './header-context/styles/excel-style-header-menu';
export class PblNgridContextMenuModule {
    /**
     * @param {?} parentModule
     * @param {?} registry
     * @param {?} cfr
     * @param {?} configService
     */
    constructor(parentModule, registry, cfr, configService) {
        if (parentModule) {
            return;
        }
        registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
        registry.addMulti('overlayPanels', new PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
    }
}
PblNgridContextMenuModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridMatHeaderContextMenuPlugin);
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
                    PblNgridOverlayPanelModule,
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
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                    MatHeaderContextMenuTrigger,
                    MatExcelStyleHeaderMenu,
                ],
            },] }
];
/** @nocollapse */
PblNgridContextMenuModule.ctorParameters = () => [
    { type: PblNgridContextMenuModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridRegistryService },
    { type: ComponentFactoryResolver },
    { type: PblNgridConfigService }
];
if (false) {
    /** @type {?} */
    PblNgridContextMenuModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVqSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUEyQjFGLE1BQU0sT0FBTyx5QkFBeUI7Ozs7Ozs7SUFHcEMsWUFBb0MsWUFBdUMsRUFDL0QsUUFBaUMsRUFDakMsR0FBNkIsRUFDN0IsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxzQ0FBc0MsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1SCxDQUFDOztBQVhlLHNDQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7O1lBMUJwRyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osYUFBYTtvQkFDYixlQUFlO29CQUNmLGFBQWE7b0JBQ2Isa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLGNBQWM7b0JBQ2QsMEJBQTBCO2lCQUMzQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osMkJBQTJCO29CQUMzQixrQ0FBa0M7b0JBQ2xDLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGtDQUFrQztpQkFDbkM7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLDJFQUEyRTtvQkFDM0UsMkJBQTJCO29CQUMzQix1QkFBdUI7aUJBQ3hCO2FBQ0Y7Ozs7WUFJbUQseUJBQXlCLHVCQUE5RCxRQUFRLFlBQUksUUFBUTtZQXBDYSx1QkFBdUI7WUFSaEMsd0JBQXdCO1lBUXRDLHFCQUFxQjs7OztJQWtDNUMsdUNBQW1HIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBuZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxNb2R1bGUsIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuaW1wb3J0IHsgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXInO1xuaW1wb3J0IHsgTWF0SGVhZGVyQ29udGV4dE1lbnVFeHRlbnNpb24gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUtZXh0ZW5zaW9uJztcbmltcG9ydCB7IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sIFBMVUdJTl9LRVkgfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51IH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC9zdHlsZXMvZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdE1lbnVNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlLFxuICAgIFBibE5ncmlkTW9kdWxlLFxuICAgIFBibE5ncmlkT3ZlcmxheVBhbmVsTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIsXG4gICAgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbixcbiAgICBNYXRFeGNlbFN0eWxlSGVhZGVyTWVudSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW1xuICAgIC8vIFRPRE86IHJlbW92ZSB3aGVuIFZpZXdFbmdpbmUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBieSBhbmd1bGFyIChWMTEgPz8/KVxuICAgIE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcixcbiAgICBNYXRFeGNlbFN0eWxlSGVhZGVyTWVudSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb250ZXh0TWVudU1vZHVsZSB7XG4gIHN0YXRpYyByZWFkb25seSBOR1JJRF9QTFVHSU4gPSBuZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0sIFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4pO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogUGJsTmdyaWRDb250ZXh0TWVudU1vZHVsZSxcbiAgICAgICAgICAgICAgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgY29uZmlnU2VydmljZTogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnZGF0YUhlYWRlckV4dGVuc2lvbnMnLCBuZXcgTWF0SGVhZGVyQ29udGV4dE1lbnVFeHRlbnNpb24oY2ZyKSk7XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ292ZXJsYXlQYW5lbHMnLCBuZXcgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb24oJ2V4Y2VsTWVudScsIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51LCBjZnIpKTtcbiAgfVxufVxuIl19