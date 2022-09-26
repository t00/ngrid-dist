import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
import * as i0 from "@angular/core";
import * as i1 from "./header-context-menu.directive";
import * as i2 from "@angular/material/icon";
const DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
export class MatHeaderContextMenuTrigger {
    constructor(plugin, elRef) {
        this.plugin = plugin;
        this.elRef = elRef;
    }
    openOverlayPanel() {
        const config = this.plugin.config || DEFAULT_CONFIG;
        this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
    }
}
/** @nocollapse */ MatHeaderContextMenuTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MatHeaderContextMenuTrigger, deps: [{ token: i1.PblNgridMatHeaderContextMenuPlugin }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
/** @nocollapse */ MatHeaderContextMenuTrigger.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.0.0", type: MatHeaderContextMenuTrigger, selector: "div[mat-header-context-menu-trigger]", host: { listeners: { "click": "openOverlayPanel()" }, classAttribute: "mat-header-context-menu-trigger" }, ngImport: i0, template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n", styles: ["div.mat-header-context-menu-trigger{position:absolute;display:flex;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:#100}[dir=rtl] div.mat-header-context-menu-trigger{right:unset;left:0;margin-right:unset;margin-left:12px}"], components: [{ type: i2.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }], encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.0.0", ngImport: i0, type: MatHeaderContextMenuTrigger, decorators: [{
            type: Component,
            args: [{
                    selector: 'div[mat-header-context-menu-trigger]',
                    host: {
                        class: 'mat-header-context-menu-trigger',
                        '(click)': 'openOverlayPanel()',
                    },
                    templateUrl: `./header-context-menu-trigger.html`,
                    styleUrls: [`./header-context-menu-trigger.scss`],
                    encapsulation: ViewEncapsulation.None,
                }]
        }], ctorParameters: function () { return [{ type: i1.PblNgridMatHeaderContextMenuPlugin }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9uZ3JpZC1tYXRlcmlhbC9jb250ZXh0LW1lbnUvc3JjL2xpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS9zcmMvbGliL2hlYWRlci1jb250ZXh0L2hlYWRlci1jb250ZXh0LW1lbnUtdHJpZ2dlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSXpFLE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7O0FBRXJGLE1BQU0sY0FBYyxHQUErQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFZdkcsTUFBTSxPQUFPLDJCQUEyQjtJQUl0QyxZQUFvQixNQUEwQyxFQUFVLEtBQThCO1FBQWxGLFdBQU0sR0FBTixNQUFNLENBQW9DO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBeUI7SUFBSSxDQUFDO0lBRTNHLGdCQUFnQjtRQUNkLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLGNBQWMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7OzJJQVRVLDJCQUEyQjsrSEFBM0IsMkJBQTJCLHVMQ2xCeEMsMkdBQ0E7MkZEaUJhLDJCQUEyQjtrQkFWdkMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGlDQUFpQzt3QkFDeEMsU0FBUyxFQUFFLG9CQUFvQjtxQkFDaEM7b0JBQ0QsV0FBVyxFQUFFLG9DQUFvQztvQkFDakQsU0FBUyxFQUFFLENBQUUsb0NBQW9DLENBQUU7b0JBQ25ELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuXG5jb25zdCBERUZBVUxUX0NPTkZJRzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcgPSB7IGhhc0JhY2tkcm9wOiB0cnVlLCB4UG9zOiAnYWZ0ZXInLCB5UG9zOiAnYmVsb3cnIH07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdlttYXQtaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ21hdC1oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXInLFxuICAgICcoY2xpY2spJzogJ29wZW5PdmVybGF5UGFuZWwoKScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBgLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIuaHRtbGAsXG4gIHN0eWxlVXJsczogWyBgLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIuc2Nzc2AgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIHtcblxuICBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLCBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB9XG5cbiAgb3Blbk92ZXJsYXlQYW5lbCgpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnBsdWdpbi5jb25maWcgfHwgREVGQVVMVF9DT05GSUc7XG4gICAgdGhpcy5wbHVnaW4ub3ZlcmxheVBhbmVsLm9wZW4odGhpcy5wbHVnaW4uc3R5bGUsIHRoaXMuZWxSZWYsIGNvbmZpZywgdGhpcy5jb250ZXh0KTtcbiAgfVxufVxuIiwiPG1hdC1pY29uIHN0eWxlPVwiaGVpZ2h0OiAxNnB4OyB3aWR0aDogMTZweDsgZm9udC1zaXplOiAxNnB4OyBsaW5lLWhlaWdodDogMTZweDtcIj5tb3JlX3ZlcnQ8L21hdC1pY29uPlxuIl19