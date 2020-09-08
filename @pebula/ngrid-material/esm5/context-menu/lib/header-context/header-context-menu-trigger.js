/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/header-context-menu-trigger.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                        class: 'mat-header-context-menu-trigger',
                        '(click)': 'openOverlayPanel()',
                    },
                    template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["div.mat-header-context-menu-trigger{position:absolute;display:flex;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9jb250ZXh0LW1lbnUvIiwic291cmNlcyI6WyJsaWIvaGVhZGVyLWNvbnRleHQvaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJekUsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0saUNBQWlDLENBQUM7O0lBRS9FLGNBQWMsR0FBK0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUV0RztJQWNFLHFDQUFvQixNQUEwQyxFQUFVLEtBQThCO1FBQWxGLFdBQU0sR0FBTixNQUFNLENBQW9DO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBeUI7SUFBSSxDQUFDOzs7O0lBRTNHLHNEQUFnQjs7O0lBQWhCOztZQUNRLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxjQUFjO1FBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckYsQ0FBQzs7Z0JBbkJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0NBQXNDO29CQUNoRCxJQUFJLEVBQUU7d0JBQ0osS0FBSyxFQUFFLGlDQUFpQzt3QkFDeEMsU0FBUyxFQUFFLG9CQUFvQjtxQkFDaEM7b0JBQ0QscUhBQWlEO29CQUVqRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQWJRLGtDQUFrQztnQkFKdkIsVUFBVTs7SUE0QjlCLGtDQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FWWSwyQkFBMkI7OztJQUV0Qyw4Q0FBNEM7Ozs7O0lBRWhDLDZDQUFrRDs7Ozs7SUFBRSw0Q0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbCc7XG5cbmltcG9ydCB7IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcblxuY29uc3QgREVGQVVMVF9DT05GSUc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnID0geyBoYXNCYWNrZHJvcDogdHJ1ZSwgeFBvczogJ2FmdGVyJywgeVBvczogJ2JlbG93JyB9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbbWF0LWhlYWRlci1jb250ZXh0LW1lbnUtdHJpZ2dlcl0nLFxuICBob3N0OiB7XG4gICAgY2xhc3M6ICdtYXQtaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyJyxcbiAgICAnKGNsaWNrKSc6ICdvcGVuT3ZlcmxheVBhbmVsKCknLFxuICB9LFxuICB0ZW1wbGF0ZVVybDogYC4vaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmh0bWxgLFxuICBzdHlsZVVybHM6IFsgYC4vaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLnNjc3NgIF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEhlYWRlckNvbnRleHRNZW51VHJpZ2dlciB7XG5cbiAgY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBsdWdpbjogUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiwgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHsgfVxuXG4gIG9wZW5PdmVybGF5UGFuZWwoKSB7XG4gICAgY29uc3QgY29uZmlnID0gdGhpcy5wbHVnaW4uY29uZmlnIHx8IERFRkFVTFRfQ09ORklHO1xuICAgIHRoaXMucGx1Z2luLm92ZXJsYXlQYW5lbC5vcGVuKHRoaXMucGx1Z2luLnN0eWxlLCB0aGlzLmVsUmVmLCBjb25maWcsIHRoaXMuY29udGV4dCk7XG4gIH1cbn1cbiJdfQ==