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
var PblNgridContextMenuModule = /** @class */ (function () {
    function PblNgridContextMenuModule(parentModule, registry, cfr, configService) {
        if (parentModule) {
            return;
        }
        registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
        registry.addMulti('overlayPanels', new PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
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
    PblNgridContextMenuModule.ctorParameters = function () { return [
        { type: PblNgridContextMenuModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridRegistryService },
        { type: ComponentFactoryResolver },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridContextMenuModule;
}());
export { PblNgridContextMenuModule };
if (false) {
    /** @type {?} */
    PblNgridContextMenuModule.NGRID_PLUGIN;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1tZW51Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY29udGV4dC1tZW51LyIsInNvdXJjZXMiOlsibGliL2NvbnRleHQtbWVudS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLHFCQUFxQixFQUFFLHVCQUF1QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsc0NBQXNDLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUVqSCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUMzRixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMvRixPQUFPLEVBQUUsa0NBQWtDLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFFMUY7SUE0QkUsbUNBQW9DLFlBQXVDLEVBQy9ELFFBQWlDLEVBQ2pDLEdBQTZCLEVBQzdCLGFBQW9DO1FBQzlDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE9BQU87U0FDUjtRQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsSUFBSSw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksc0NBQXNDLENBQUMsV0FBVyxFQUFFLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUgsQ0FBQztJQVhlLHNDQUFZLEdBQUcsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxFQUFFLGtDQUFrQyxDQUFDLENBQUM7O2dCQTFCcEcsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsY0FBYzt3QkFDZCxjQUFjO3dCQUNkLDBCQUEwQjtxQkFDM0I7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLDJCQUEyQjt3QkFDM0Isa0NBQWtDO3dCQUNsQyx1QkFBdUI7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxrQ0FBa0M7cUJBQ25DO29CQUNELGVBQWUsRUFBRTt3QkFDZiwyRUFBMkU7d0JBQzNFLDJCQUEyQjt3QkFDM0IsdUJBQXVCO3FCQUN4QjtpQkFDRjs7OztnQkFJbUQseUJBQXlCLHVCQUE5RCxRQUFRLFlBQUksUUFBUTtnQkFwQ2EsdUJBQXVCO2dCQVJoQyx3QkFBd0I7Z0JBUXRDLHFCQUFxQjs7SUE4QzlDLGdDQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7U0FiWSx5QkFBeUI7OztJQUNwQyx1Q0FBbUciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcblxuaW1wb3J0IHsgUGJsTmdyaWRNb2R1bGUsIFBibE5ncmlkQ29uZmlnU2VydmljZSwgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIG5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbE1vZHVsZSwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb24gfSBmcm9tICdAcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwnO1xuXG5pbXBvcnQgeyBNYXRIZWFkZXJDb250ZXh0TWVudVRyaWdnZXIgfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUtdHJpZ2dlcic7XG5pbXBvcnQgeyBNYXRIZWFkZXJDb250ZXh0TWVudUV4dGVuc2lvbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS1leHRlbnNpb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiwgUExVR0lOX0tFWSB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUgfSBmcm9tICcuL2hlYWRlci1jb250ZXh0L3N0eWxlcy9leGNlbC1zdHlsZS1oZWFkZXItbWVudSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgTWF0SWNvbk1vZHVsZSxcbiAgICBNYXRCdXR0b25Nb2R1bGUsXG4gICAgTWF0TWVudU1vZHVsZSxcbiAgICBNYXRGb3JtRmllbGRNb2R1bGUsXG4gICAgTWF0SW5wdXRNb2R1bGUsXG4gICAgUGJsTmdyaWRNb2R1bGUsXG4gICAgUGJsTmdyaWRPdmVybGF5UGFuZWxNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlcixcbiAgICBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLFxuICAgIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbixcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgLy8gVE9ETzogcmVtb3ZlIHdoZW4gVmlld0VuZ2luZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGFuZ3VsYXIgKFYxMSA/Pz8pXG4gICAgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyLFxuICAgIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbnRleHRNZW51TW9kdWxlIHtcbiAgc3RhdGljIHJlYWRvbmx5IE5HUklEX1BMVUdJTiA9IG5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSwgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbik7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBQYmxOZ3JpZENvbnRleHRNZW51TW9kdWxlLFxuICAgICAgICAgICAgICByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBjb25maWdTZXJ2aWNlOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlZ2lzdHJ5LmFkZE11bHRpKCdkYXRhSGVhZGVyRXh0ZW5zaW9ucycsIG5ldyBNYXRIZWFkZXJDb250ZXh0TWVudUV4dGVuc2lvbihjZnIpKTtcbiAgICByZWdpc3RyeS5hZGRNdWx0aSgnb3ZlcmxheVBhbmVscycsIG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbignZXhjZWxNZW51JywgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUsIGNmcikpO1xuICB9XG59XG4iXX0=