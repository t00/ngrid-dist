/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    '(click)': 'openOverlayPanel()',
                },
                template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["div[mat-header-context-menu-trigger]{position:absolute;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7TUFFL0UsY0FBYyxHQUErQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBV3RHLE1BQU0sT0FBTywyQkFBMkI7Ozs7O0lBSXRDLFlBQW9CLE1BQTBDLEVBQVUsS0FBOEI7UUFBbEYsV0FBTSxHQUFOLE1BQU0sQ0FBb0M7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUF5QjtJQUFJLENBQUM7Ozs7SUFFM0csZ0JBQWdCOztjQUNSLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxjQUFjO1FBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckYsQ0FBQzs7O1lBbEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0NBQXNDO2dCQUNoRCxJQUFJLEVBQUU7b0JBQ0osU0FBUyxFQUFFLG9CQUFvQjtpQkFDaEM7Z0JBQ0QscUhBQWlEO2dCQUVqRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFaUSxrQ0FBa0M7WUFKdkIsVUFBVTs7OztJQW1CNUIsOENBQTRDOzs7OztJQUVoQyw2Q0FBa0Q7Ozs7O0lBQUUsNENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcgfSBmcm9tICdAcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luIH0gZnJvbSAnLi9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZSc7XG5cbmNvbnN0IERFRkFVTFRfQ09ORklHOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyA9IHsgaGFzQmFja2Ryb3A6IHRydWUsIHhQb3M6ICdhZnRlcicsIHlQb3M6ICdiZWxvdycgfTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W21hdC1oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXJdJyxcbiAgaG9zdDoge1xuICAgICcoY2xpY2spJzogJ29wZW5PdmVybGF5UGFuZWwoKScsXG4gIH0sXG4gIHRlbXBsYXRlVXJsOiBgLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIuaHRtbGAsXG4gIHN0eWxlVXJsczogWyBgLi9oZWFkZXItY29udGV4dC1tZW51LXRyaWdnZXIuc2Nzc2AgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIHtcblxuICBjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGx1Z2luOiBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luLCBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB9XG5cbiAgb3Blbk92ZXJsYXlQYW5lbCgpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLnBsdWdpbi5jb25maWcgfHwgREVGQVVMVF9DT05GSUc7XG4gICAgdGhpcy5wbHVnaW4ub3ZlcmxheVBhbmVsLm9wZW4odGhpcy5wbHVnaW4uc3R5bGUsIHRoaXMuZWxSZWYsIGNvbmZpZywgdGhpcy5jb250ZXh0KTtcbiAgfVxufVxuIl19