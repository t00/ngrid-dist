/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, EventEmitter, Output, NgZone } from '@angular/core';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { PblNgridComponent } from '../../ngrid.component';
/**
 * @template T
 */
var PblNgridScrolling = /** @class */ (function () {
    function PblNgridScrolling(table, pluginCtrl, zone) {
        var _this = this;
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
        var subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onInit') {
                var viewport = table.viewport;
                if (viewport) {
                    viewport.scrolling.subscribe((/**
                     * @param {?} isScrolling
                     * @return {?}
                     */
                    function (isScrolling) { return zone.run((/**
                     * @return {?}
                     */
                    function () { return _this.scrolling.next(isScrolling); })); }));
                }
                subscription.unsubscribe();
                subscription = undefined;
            }
        }));
    }
    PblNgridScrolling.decorators = [
        { type: Directive, args: [{
                    selector: 'pbl-ngrid[scrolling]'
                },] }
    ];
    /** @nocollapse */
    PblNgridScrolling.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: NgZone }
    ]; };
    PblNgridScrolling.propDecorators = {
        scrolling: [{ type: Output }]
    };
    return PblNgridScrolling;
}());
export { PblNgridScrolling };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsaW5nLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc2Nyb2xsaW5nLXBsdWdpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFFMUQ7SUFtQkUsMkJBQVksS0FBMkIsRUFBRSxVQUFvQyxFQUFFLElBQVk7UUFBM0YsaUJBV0M7Ozs7Ozs7Ozs7Ozs7UUFiUyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7O1lBR2pELFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDbkQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDbkIsSUFBQSx5QkFBUTtnQkFDaEIsSUFBSSxRQUFRLEVBQUU7b0JBQ1osUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTOzs7O29CQUFFLFVBQUEsV0FBVyxJQUFJLE9BQUEsSUFBSSxDQUFDLEdBQUc7OztvQkFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQWhDLENBQWdDLEVBQUUsRUFBbEQsQ0FBa0QsRUFBRSxDQUFDO2lCQUNuRztnQkFDRCxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzNCLFlBQVksR0FBRyxTQUFTLENBQUM7YUFDMUI7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDOztnQkE5QkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzs7O2dCQUpRLGlCQUFpQjtnQkFEakIsd0JBQXdCO2dCQURTLE1BQU07Ozs0QkFxQjdDLE1BQU07O0lBY1Qsd0JBQUM7Q0FBQSxBQS9CRCxJQStCQztTQTVCWSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7OztJQWM1QixzQ0FBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL25ncmlkLmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtzY3JvbGxpbmddJ1xufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFNjcm9sbGluZzxUID0gYW55PiB7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2Nyb2xsaW5nIHN0YXRlIG9mIHJvd3MgaW4gdGhlIHRhYmxlIGNoYW5nZXMuXG4gICAqIFdoZW4gc2Nyb2xsaW5nIHN0YXJ0cyBgdHJ1ZWAgaXMgZW1pdHRlZCBhbmQgd2hlbiB0aGUgc2Nyb2xsaW5nIGVuZHMgYGZhbHNlYCBpcyBlbWl0dGVkLlxuICAgKlxuICAgKiBUaGUgdGFibGUgaXMgaW4gXCJzY3JvbGxpbmdcIiBzdGF0ZSBmcm9tIHRoZSBmaXJzdCBzY3JvbGwgZXZlbnQgYW5kIHVudGlsIDIgYW5pbWF0aW9uIGZyYW1lc1xuICAgKiBoYXZlIHBhc3NlZCB3aXRob3V0IGEgc2Nyb2xsIGV2ZW50LlxuICAgKlxuICAgKiBXaGVuIHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgdGhlIGRpcmVjdGlvbjogLTEgb3IgMVxuICAgKiBXaGVuIG5vdCBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIDAuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsaW5nID0gbmV3IEV2ZW50RW1pdHRlcjwgLTEgfCAwIHwgMSA+KCk7XG5cbiAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIHpvbmU6IE5nWm9uZSkge1xuICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICBjb25zdCB7IHZpZXdwb3J0IH0gPSB0YWJsZTtcbiAgICAgICAgaWYgKHZpZXdwb3J0KSB7XG4gICAgICAgICAgdmlld3BvcnQuc2Nyb2xsaW5nLnN1YnNjcmliZSggaXNTY3JvbGxpbmcgPT4gem9uZS5ydW4oICgpID0+IHRoaXMuc2Nyb2xsaW5nLm5leHQoaXNTY3JvbGxpbmcpICkgKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=