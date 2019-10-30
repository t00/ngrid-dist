/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
/** @type {?} */
var DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
var MatHeaderContextMenuTrigger = /** @class */ (function () {
    function MatHeaderContextMenuTrigger(plugin, elRef) {
        this.plugin = plugin;
        this.elRef = elRef;
    }
    /**
     * @return {?}
     */
    MatHeaderContextMenuTrigger.prototype.openOverlayPanel = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var config = this.plugin.config || DEFAULT_CONFIG;
        this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
    };
    MatHeaderContextMenuTrigger.decorators = [
        { type: Component, args: [{
                    selector: 'div[mat-header-context-menu-trigger]',
                    host: {
                        '(click)': 'openOverlayPanel()',
                    },
                    template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["div[mat-header-context-menu-trigger]{position:absolute;display:flex;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
                }] }
    ];
    /** @nocollapse */
    MatHeaderContextMenuTrigger.ctorParameters = function () { return [
        { type: PblNgridMatHeaderContextMenuPlugin },
        { type: ElementRef }
    ]; };
    return MatHeaderContextMenuTrigger;
}());
export { MatHeaderContextMenuTrigger };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUl6RSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7SUFFL0UsY0FBYyxHQUErQixFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0FBRXRHO0lBYUUscUNBQW9CLE1BQTBDLEVBQVUsS0FBOEI7UUFBbEYsV0FBTSxHQUFOLE1BQU0sQ0FBb0M7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUF5QjtJQUFJLENBQUM7Ozs7SUFFM0csc0RBQWdCOzs7SUFBaEI7O1lBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLGNBQWM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyRixDQUFDOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQ0FBc0M7b0JBQ2hELElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsb0JBQW9CO3FCQUNoQztvQkFDRCxxSEFBaUQ7b0JBRWpELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBWlEsa0NBQWtDO2dCQUp2QixVQUFVOztJQTJCOUIsa0NBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQVZZLDJCQUEyQjs7O0lBRXRDLDhDQUE0Qzs7Ozs7SUFFaEMsNkNBQWtEOzs7OztJQUFFLDRDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuaW1wb3J0IHsgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB9IGZyb20gJy4vaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUnO1xuXG5jb25zdCBERUZBVUxUX0NPTkZJRzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcgPSB7IGhhc0JhY2tkcm9wOiB0cnVlLCB4UG9zOiAnYWZ0ZXInLCB5UG9zOiAnYmVsb3cnIH07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdlttYXQtaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyXScsXG4gIGhvc3Q6IHtcbiAgICAnKGNsaWNrKSc6ICdvcGVuT3ZlcmxheVBhbmVsKCknLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogYC4vaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmh0bWxgLFxuICBzdHlsZVVybHM6IFsgYC4vaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLnNjc3NgIF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciB7XG5cbiAgY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbjogUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiwgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHsgfVxuXG4gIG9wZW5PdmVybGF5UGFuZWwoKSB7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5wbHVnaW4uY29uZmlnIHx8IERFRkFVTFRfQ09ORklHO1xuICAgIHRoaXMucGx1Z2luLm92ZXJsYXlQYW5lbC5vcGVuKHRoaXMucGx1Z2luLnN0eWxlLCB0aGlzLmVsUmVmLCBjb25maWcsIHRoaXMuY29udGV4dCk7XG4gIH1cbn1cbiJdfQ==