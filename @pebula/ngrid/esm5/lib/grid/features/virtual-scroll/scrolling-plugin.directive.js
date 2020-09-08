/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/scrolling-plugin.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsaW5nLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc2Nyb2xsaW5nLXBsdWdpbi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBRTFEO0lBbUJFLDJCQUFZLEtBQTJCLEVBQUUsVUFBb0MsRUFBRSxJQUFZO1FBQTNGLGlCQVdDOzs7Ozs7Ozs7Ozs7O1FBYlMsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDOztZQUdqRCxZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ25ELElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ25CLElBQUEseUJBQVE7Z0JBQ2hCLElBQUksUUFBUSxFQUFFO29CQUNaLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztvQkFBRSxVQUFBLFdBQVcsSUFBSSxPQUFBLElBQUksQ0FBQyxHQUFHOzs7b0JBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFoQyxDQUFnQyxFQUFFLEVBQWxELENBQWtELEVBQUUsQ0FBQztpQkFDbkc7Z0JBQ0QsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixZQUFZLEdBQUcsU0FBUyxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7Z0JBOUJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2lCQUNqQzs7OztnQkFKUSxpQkFBaUI7Z0JBRGpCLHdCQUF3QjtnQkFEUyxNQUFNOzs7NEJBcUI3QyxNQUFNOztJQWNULHdCQUFDO0NBQUEsQUEvQkQsSUErQkM7U0E1QlksaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7SUFjNUIsc0NBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbc2Nyb2xsaW5nXSdcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTY3JvbGxpbmc8VCA9IGFueT4ge1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbGluZyBzdGF0ZSBvZiByb3dzIGluIHRoZSB0YWJsZSBjaGFuZ2VzLlxuICAgKiBXaGVuIHNjcm9sbGluZyBzdGFydHMgYHRydWVgIGlzIGVtaXR0ZWQgYW5kIHdoZW4gdGhlIHNjcm9sbGluZyBlbmRzIGBmYWxzZWAgaXMgZW1pdHRlZC5cbiAgICpcbiAgICogVGhlIHRhYmxlIGlzIGluIFwic2Nyb2xsaW5nXCIgc3RhdGUgZnJvbSB0aGUgZmlyc3Qgc2Nyb2xsIGV2ZW50IGFuZCB1bnRpbCAyIGFuaW1hdGlvbiBmcmFtZXNcbiAgICogaGF2ZSBwYXNzZWQgd2l0aG91dCBhIHNjcm9sbCBldmVudC5cbiAgICpcbiAgICogV2hlbiBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIHRoZSBkaXJlY3Rpb246IC0xIG9yIDFcbiAgICogV2hlbiBub3Qgc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyAwLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8IC0xIHwgMCB8IDEgPigpO1xuXG4gIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPiwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCB6b25lOiBOZ1pvbmUpIHtcbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgY29uc3QgeyB2aWV3cG9ydCB9ID0gdGFibGU7XG4gICAgICAgIGlmICh2aWV3cG9ydCkge1xuICAgICAgICAgIHZpZXdwb3J0LnNjcm9sbGluZy5zdWJzY3JpYmUoIGlzU2Nyb2xsaW5nID0+IHpvbmUucnVuKCAoKSA9PiB0aGlzLnNjcm9sbGluZy5uZXh0KGlzU2Nyb2xsaW5nKSApICk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19