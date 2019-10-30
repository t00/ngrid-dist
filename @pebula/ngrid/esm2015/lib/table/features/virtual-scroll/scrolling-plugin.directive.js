/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Output, NgZone } from '@angular/core';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { PblNgridComponent } from '../../table.component';
/**
 * @template T
 */
export class PblNgridScrolling {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} zone
     */
    constructor(table, pluginCtrl, zone) {
        /**
         * Event emitted when the scrolling state of rows in the table changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The table is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         */
        this.scrolling = new EventEmitter();
        /** @type {?} */
        let subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onInit') {
                const { viewport } = table;
                if (viewport) {
                    viewport.scrolling.subscribe((/**
                     * @param {?} isScrolling
                     * @return {?}
                     */
                    isScrolling => zone.run((/**
                     * @return {?}
                     */
                    () => this.scrolling.next(isScrolling)))));
                }
                subscription.unsubscribe();
                subscription = undefined;
            }
        }));
    }
}
PblNgridScrolling.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[scrolling]'
            },] }
];
/** @nocollapse */
PblNgridScrolling.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: NgZone }
];
PblNgridScrolling.propDecorators = {
    scrolling: [{ type: Output }]
};
if (false) {
    /**
     * Event emitted when the scrolling state of rows in the table changes.
     * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
     *
     * The table is in "scrolling" state from the first scroll event and until 2 animation frames
     * have passed without a scroll event.
     *
     * When scrolling, the emitted value is the direction: -1 or 1
     * When not scrolling, the emitted value is 0.
     *
     * NOTE: This event runs outside the angular zone.
     * @type {?}
     */
    PblNgridScrolling.prototype.scrolling;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsaW5nLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3Njcm9sbGluZy1wbHVnaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBSzFELE1BQU0sT0FBTyxpQkFBaUI7Ozs7OztJQWdCNUIsWUFBWSxLQUEyQixFQUFFLFVBQW9DLEVBQUUsSUFBWTs7Ozs7Ozs7Ozs7OztRQUZqRixjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7O1lBR2pELFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTtZQUN0RCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO3NCQUNyQixFQUFFLFFBQVEsRUFBRSxHQUFHLEtBQUs7Z0JBQzFCLElBQUksUUFBUSxFQUFFO29CQUNaLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztvQkFBRSxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7b0JBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDO2lCQUNuRztnQkFDRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNCLFlBQVksR0FBRyxTQUFTLENBQUM7YUFDMUI7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDOzs7WUE5QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7Ozs7WUFKUSxpQkFBaUI7WUFEakIsd0JBQXdCO1lBRFMsTUFBTTs7O3dCQXFCN0MsTUFBTTs7Ozs7Ozs7Ozs7Ozs7OztJQUFQLHNDQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdGFibGUuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3Njcm9sbGluZ10nXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU2Nyb2xsaW5nPFQgPSBhbnk+IHtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzY3JvbGxpbmcgc3RhdGUgb2Ygcm93cyBpbiB0aGUgdGFibGUgY2hhbmdlcy5cbiAgICogV2hlbiBzY3JvbGxpbmcgc3RhcnRzIGB0cnVlYCBpcyBlbWl0dGVkIGFuZCB3aGVuIHRoZSBzY3JvbGxpbmcgZW5kcyBgZmFsc2VgIGlzIGVtaXR0ZWQuXG4gICAqXG4gICAqIFRoZSB0YWJsZSBpcyBpbiBcInNjcm9sbGluZ1wiIHN0YXRlIGZyb20gdGhlIGZpcnN0IHNjcm9sbCBldmVudCBhbmQgdW50aWwgMiBhbmltYXRpb24gZnJhbWVzXG4gICAqIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBzY3JvbGwgZXZlbnQuXG4gICAqXG4gICAqIFdoZW4gc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyB0aGUgZGlyZWN0aW9uOiAtMSBvciAxXG4gICAqIFdoZW4gbm90IHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgMC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPCAtMSB8IDAgfCAxID4oKTtcblxuICBjb25zdHJ1Y3Rvcih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD4sIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgem9uZTogTmdab25lKSB7XG4gICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHRhYmxlO1xuICAgICAgICBpZiAodmlld3BvcnQpIHtcbiAgICAgICAgICB2aWV3cG9ydC5zY3JvbGxpbmcuc3Vic2NyaWJlKCBpc1Njcm9sbGluZyA9PiB6b25lLnJ1biggKCkgPT4gdGhpcy5zY3JvbGxpbmcubmV4dChpc1Njcm9sbGluZykgKSApO1xuICAgICAgICB9XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==