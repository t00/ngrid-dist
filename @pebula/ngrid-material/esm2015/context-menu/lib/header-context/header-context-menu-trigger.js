/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/header-context-menu-trigger.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
/** @type {?} */
const DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
export class MatHeaderContextMenuTrigger {
    /**
     * @param {?} plugin
     * @param {?} elRef
     */
    constructor(plugin, elRef) {
        this.plugin = plugin;
        this.elRef = elRef;
    }
    /**
     * @return {?}
     */
    openOverlayPanel() {
        /** @type {?} */
        const config = this.plugin.config || DEFAULT_CONFIG;
        this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
    }
}
MatHeaderContextMenuTrigger.decorators = [
    { type: Component, args: [{
                selector: 'div[mat-header-context-menu-trigger]',
                host: {
                    class: 'mat-header-context-menu-trigger',
                    '(click)': 'openOverlayPanel()',
                },
                template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["div.mat-header-context-menu-trigger{position:absolute;display:flex;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
            }] }
];
/** @nocollapse */
MatHeaderContextMenuTrigger.ctorParameters = () => [
    { type: PblNgridMatHeaderContextMenuPlugin },
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    MatHeaderContextMenuTrigger.prototype.context;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuTrigger.prototype.plugin;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuTrigger.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJekUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0saUNBQWlDLENBQUM7O01BRS9FLGNBQWMsR0FBK0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQVl0RyxNQUFNLE9BQU8sMkJBQTJCOzs7OztJQUl0QyxZQUFvQixNQUEwQyxFQUFVLEtBQThCO1FBQWxGLFdBQU0sR0FBTixNQUFNLENBQW9DO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBeUI7SUFBSSxDQUFDOzs7O0lBRTNHLGdCQUFnQjs7Y0FDUixNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksY0FBYztRQUNuRCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7OztZQW5CRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNDQUFzQztnQkFDaEQsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxpQ0FBaUM7b0JBQ3hDLFNBQVMsRUFBRSxvQkFBb0I7aUJBQ2hDO2dCQUNELHFIQUFpRDtnQkFFakQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBYlEsa0NBQWtDO1lBSnZCLFVBQVU7Ozs7SUFvQjVCLDhDQUE0Qzs7Ozs7SUFFaEMsNkNBQWtEOzs7OztJQUFFLDRDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuXG5jb25zdCBERUZBVUxUX0NPTkZJRzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcgPSB7IGhhc0JhY2tkcm9wOiB0cnVlLCB4UG9zOiAnYWZ0ZXInLCB5UG9zOiAnYmVsb3cnIH07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdlttYXQtaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyXScsXG4gIGhvc3Q6IHtcbiAgICBjbGFzczogJ21hdC1oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXInLFxuICAgICcoY2xpY2spJzogJ29wZW5PdmVybGF5UGFuZWwoKScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBgLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIuaHRtbGAsXG4gIHN0eWxlVXJsczogWyBgLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIuc2Nzc2AgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIHtcblxuICBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLCBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB9XG5cbiAgb3Blbk92ZXJsYXlQYW5lbCgpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnBsdWdpbi5jb25maWcgfHwgREVGQVVMVF9DT05GSUc7XG4gICAgdGhpcy5wbHVnaW4ub3ZlcmxheVBhbmVsLm9wZW4odGhpcy5wbHVnaW4uc3R5bGUsIHRoaXMuZWxSZWYsIGNvbmZpZywgdGhpcy5jb250ZXh0KTtcbiAgfVxufVxuIl19