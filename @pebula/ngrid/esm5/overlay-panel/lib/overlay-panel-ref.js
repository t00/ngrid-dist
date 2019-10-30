/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * @template T
 */
var /**
 * @template T
 */
PblNgridOverlayPanelRef = /** @class */ (function () {
    function PblNgridOverlayPanelRef(overlayRef, data) {
        var _this = this;
        this.overlayRef = overlayRef;
        this.data = data;
        this._closed$ = new Subject();
        this.closed = this._closed$.asObservable();
        this._closingActions(this, overlayRef)
            .pipe(takeUntil(this.closed))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    }
    /**
     * @return {?}
     */
    PblNgridOverlayPanelRef.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this._closed$) {
            /** @type {?} */
            var closed$ = this._closed$;
            this._closed$ = undefined;
            closed$.next();
            closed$.complete();
            this.overlayRef.detach();
            this.overlayRef.dispose();
        }
    };
    /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} overlayRef
     * @return {?}
     */
    PblNgridOverlayPanelRef.prototype._closingActions = /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayPanelRef, overlayRef) {
        /** @type {?} */
        var backdrop = (/** @type {?} */ (overlayRef)).backdropClick();
        /** @type {?} */
        var detachments = (/** @type {?} */ (overlayRef)).detachments();
        return merge(backdrop, detachments, overlayPanelRef.closed);
    };
    return PblNgridOverlayPanelRef;
}());
/**
 * @template T
 */
export { PblNgridOverlayPanelRef };
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelRef.prototype.closed;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanelRef.prototype._closed$;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanelRef.prototype.overlayRef;
    /** @type {?} */
    PblNgridOverlayPanelRef.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUczQzs7OztJQUtFLGlDQUFvQixVQUFzQixFQUFrQixJQUFRO1FBQXBFLGlCQU9DO1FBUG1CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBa0IsU0FBSSxHQUFKLElBQUksQ0FBSTtRQUY1RCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUdyQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ25DLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUN2QjthQUNBLFNBQVM7OztRQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxFQUFFLEVBQVosQ0FBWSxFQUFDLENBQUM7SUFDbkMsQ0FBQzs7OztJQUVELHVDQUFLOzs7SUFBTDtRQUNFLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTs7Z0JBQ1gsT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7Ozs7O0lBRU8saURBQWU7Ozs7OztJQUF2QixVQUF3QixlQUF3QyxFQUFFLFVBQXNCOztZQUNoRixRQUFRLEdBQUcsbUJBQUEsVUFBVSxFQUFDLENBQUMsYUFBYSxFQUFFOztZQUN0QyxXQUFXLEdBQUcsbUJBQUEsVUFBVSxFQUFDLENBQUMsV0FBVyxFQUFFO1FBRTdDLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7Ozs7Ozs7SUE3QkMseUNBQXlCOzs7OztJQUN6QiwyQ0FBdUM7Ozs7O0lBRTNCLDZDQUE4Qjs7SUFBRSx1Q0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFQgPSBhbnk+IHtcblxuICBjbG9zZWQ6IE9ic2VydmFibGU8dm9pZD47XG4gIHByaXZhdGUgX2Nsb3NlZCQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb3ZlcmxheVJlZjogT3ZlcmxheVJlZiwgcHVibGljIHJlYWRvbmx5IGRhdGE/OiBUKSB7XG4gICAgdGhpcy5jbG9zZWQgPSB0aGlzLl9jbG9zZWQkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuX2Nsb3NpbmdBY3Rpb25zKHRoaXMsIG92ZXJsYXlSZWYpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuY2xvc2VkKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZSgpKTtcbiAgfVxuXG4gIGNsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jbG9zZWQkKSB7XG4gICAgICBjb25zdCBjbG9zZWQkID0gdGhpcy5fY2xvc2VkJDtcbiAgICAgIHRoaXMuX2Nsb3NlZCQgPSB1bmRlZmluZWQ7XG4gICAgICBjbG9zZWQkLm5leHQoKTtcbiAgICAgIGNsb3NlZCQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xvc2luZ0FjdGlvbnMob3ZlcmxheVBhbmVsUmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiwgb3ZlcmxheVJlZjogT3ZlcmxheVJlZikge1xuICAgIGNvbnN0IGJhY2tkcm9wID0gb3ZlcmxheVJlZiEuYmFja2Ryb3BDbGljaygpO1xuICAgIGNvbnN0IGRldGFjaG1lbnRzID0gb3ZlcmxheVJlZiEuZGV0YWNobWVudHMoKTtcblxuICAgIHJldHVybiBtZXJnZShiYWNrZHJvcCwgZGV0YWNobWVudHMsIG92ZXJsYXlQYW5lbFJlZi5jbG9zZWQpO1xuICB9XG59XG4iXX0=