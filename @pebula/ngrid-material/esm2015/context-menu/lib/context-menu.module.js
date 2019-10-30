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
PblNgridContextMenuModule.ctorParameters = () => [
    { type: PblNgridContextMenuModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridRegistryService },
    { type: ComponentFactoryResolver },
    { type: PblNgridConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXpELE9BQU8sRUFBRSxjQUFjLEVBQUUscUJBQXFCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0YsT0FBTyxFQUFFLDBCQUEwQixFQUFFLHNDQUFzQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHakgsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDM0YsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDL0YsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDcEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUEwQjFGLE1BQU0sT0FBTyx5QkFBeUI7Ozs7Ozs7SUFDcEMsWUFBb0MsWUFBdUMsRUFDL0QsUUFBaUMsRUFDakMsR0FBNkIsRUFDN0IsYUFBb0M7UUFDOUMsSUFBSSxZQUFZLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsUUFBUSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxzQ0FBc0MsQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1SCxDQUFDOzs7WUFsQ0YsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLGFBQWE7b0JBQ2IsZUFBZTtvQkFDZixhQUFhO29CQUNiLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxjQUFjO29CQUNkLDBCQUEwQjtpQkFDM0I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLDJCQUEyQjtvQkFDM0Isa0NBQWtDO29CQUNsQyx1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxrQ0FBa0M7aUJBQ25DO2dCQUNELGVBQWUsRUFBRTtvQkFDZiwyQkFBMkI7b0JBQzNCLHVCQUF1QjtpQkFDeEI7YUFDRjs7OztZQUVtRCx5QkFBeUIsdUJBQTlELFFBQVEsWUFBSSxRQUFRO1lBbENhLHVCQUF1QjtZQVJoQyx3QkFBd0I7WUFRdEMscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvYnV0dG9uJztcbmltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTW9kdWxlLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbE1vZHVsZSwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb24gfSBmcm9tICdAcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNNb2R1bGUgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5pbXBvcnQgeyBNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIgfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUtdHJpZ2dlcic7XG5pbXBvcnQgeyBNYXRIZWFkZXJDb250ZXh0TWVudUV4dGVuc2lvbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUgfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L3N0eWxlcy9leGNlbC1zdHlsZS1oZWFkZXItbWVudSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgUGJsTmdyaWRNb2R1bGUsXG4gICAgUGJsTmdyaWRPdmVybGF5UGFuZWxNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLFxuICAgIFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sXG4gICAgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIsXG4gICAgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29udGV4dE1lbnVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IFBibE5ncmlkQ29udGV4dE1lbnVNb2R1bGUsXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgICAgICAgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIGNvbmZpZ1NlcnZpY2U6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVnaXN0cnkuYWRkTXVsdGkoJ2RhdGFIZWFkZXJFeHRlbnNpb25zJywgbmV3IE1hdEhlYWRlckNvbnRleHRNZW51RXh0ZW5zaW9uKGNmcikpO1xuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdvdmVybGF5UGFuZWxzJywgbmV3IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uKCdleGNlbE1lbnUnLCBNYXRFeGNlbFN0eWxlSGVhZGVyTWVudSwgY2ZyKSk7XG4gIH1cbn1cbiJdfQ==