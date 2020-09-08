/**
 * @fileoverview added by tsickle
 * Generated from: lib/overlay-panel-ref.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHM0M7Ozs7SUFLRSxpQ0FBb0IsVUFBc0IsRUFBa0IsSUFBUTtRQUFwRSxpQkFPQztRQVBtQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQWtCLFNBQUksR0FBSixJQUFJLENBQUk7UUFGNUQsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFHckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQzthQUNuQyxJQUFJLENBQ0gsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDdkI7YUFDQSxTQUFTOzs7UUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLEtBQUssRUFBRSxFQUFaLENBQVksRUFBQyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCx1Q0FBSzs7O0lBQUw7UUFDRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7O2dCQUNYLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUTtZQUM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztZQUMxQixPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7Ozs7OztJQUVPLGlEQUFlOzs7Ozs7SUFBdkIsVUFBd0IsZUFBd0MsRUFBRSxVQUFzQjs7WUFDaEYsUUFBUSxHQUFHLG1CQUFBLFVBQVUsRUFBQyxDQUFDLGFBQWEsRUFBRTs7WUFDdEMsV0FBVyxHQUFHLG1CQUFBLFVBQVUsRUFBQyxDQUFDLFdBQVcsRUFBRTtRQUU3QyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDOzs7Ozs7O0lBN0JDLHlDQUF5Qjs7Ozs7SUFDekIsMkNBQXVDOzs7OztJQUUzQiw2Q0FBOEI7O0lBQUUsdUNBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE92ZXJsYXlSZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjxUID0gYW55PiB7XG5cbiAgY2xvc2VkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBwcml2YXRlIF9jbG9zZWQkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsIHB1YmxpYyByZWFkb25seSBkYXRhPzogVCkge1xuICAgIHRoaXMuY2xvc2VkID0gdGhpcy5fY2xvc2VkJC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLl9jbG9zaW5nQWN0aW9ucyh0aGlzLCBvdmVybGF5UmVmKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmNsb3NlZCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gIH1cblxuICBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2xvc2VkJCkge1xuICAgICAgY29uc3QgY2xvc2VkJCA9IHRoaXMuX2Nsb3NlZCQ7XG4gICAgICB0aGlzLl9jbG9zZWQkID0gdW5kZWZpbmVkO1xuICAgICAgY2xvc2VkJC5uZXh0KCk7XG4gICAgICBjbG9zZWQkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLm92ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NpbmdBY3Rpb25zKG92ZXJsYXlQYW5lbFJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYsIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYpIHtcbiAgICBjb25zdCBiYWNrZHJvcCA9IG92ZXJsYXlSZWYhLmJhY2tkcm9wQ2xpY2soKTtcbiAgICBjb25zdCBkZXRhY2htZW50cyA9IG92ZXJsYXlSZWYhLmRldGFjaG1lbnRzKCk7XG5cbiAgICByZXR1cm4gbWVyZ2UoYmFja2Ryb3AsIGRldGFjaG1lbnRzLCBvdmVybGF5UGFuZWxSZWYuY2xvc2VkKTtcbiAgfVxufVxuIl19