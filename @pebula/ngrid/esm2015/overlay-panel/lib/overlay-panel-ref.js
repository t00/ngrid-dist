/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * @template T
 */
export class PblNgridOverlayPanelRef {
    /**
     * @param {?} overlayRef
     * @param {?=} data
     */
    constructor(overlayRef, data) {
        this.overlayRef = overlayRef;
        this.data = data;
        this._closed$ = new Subject();
        this.closed = this._closed$.asObservable();
        this._closingActions(this, overlayRef)
            .pipe(takeUntil(this.closed))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * @return {?}
     */
    close() {
        if (this._closed$) {
            /** @type {?} */
            const closed$ = this._closed$;
            this._closed$ = undefined;
            closed$.next();
            closed$.complete();
            this.overlayRef.detach();
            this.overlayRef.dispose();
        }
    }
    /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} overlayRef
     * @return {?}
     */
    _closingActions(overlayPanelRef, overlayRef) {
        /** @type {?} */
        const backdrop = (/** @type {?} */ (overlayRef)).backdropClick();
        /** @type {?} */
        const detachments = (/** @type {?} */ (overlayRef)).detachments();
        return merge(backdrop, detachments, overlayPanelRef.closed);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1yZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUczQyxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQUtsQyxZQUFvQixVQUFzQixFQUFrQixJQUFRO1FBQWhELGVBQVUsR0FBVixVQUFVLENBQVk7UUFBa0IsU0FBSSxHQUFKLElBQUksQ0FBSTtRQUY1RCxhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUdyQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDO2FBQ25DLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUN2QjthQUNBLFNBQVM7OztRQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDO0lBQ25DLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFOztrQkFDWCxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVE7WUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDMUIsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7Ozs7SUFFTyxlQUFlLENBQUMsZUFBd0MsRUFBRSxVQUFzQjs7Y0FDaEYsUUFBUSxHQUFHLG1CQUFBLFVBQVUsRUFBQyxDQUFDLGFBQWEsRUFBRTs7Y0FDdEMsV0FBVyxHQUFHLG1CQUFBLFVBQVUsRUFBQyxDQUFDLFdBQVcsRUFBRTtRQUU3QyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Y7OztJQTdCQyx5Q0FBeUI7Ozs7O0lBQ3pCLDJDQUF1Qzs7Ozs7SUFFM0IsNkNBQThCOztJQUFFLHVDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1lcmdlLCBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY8VCA9IGFueT4ge1xuXG4gIGNsb3NlZDogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcHJpdmF0ZSBfY2xvc2VkJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBvdmVybGF5UmVmOiBPdmVybGF5UmVmLCBwdWJsaWMgcmVhZG9ubHkgZGF0YT86IFQpIHtcbiAgICB0aGlzLmNsb3NlZCA9IHRoaXMuX2Nsb3NlZCQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5fY2xvc2luZ0FjdGlvbnModGhpcywgb3ZlcmxheVJlZilcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5jbG9zZWQpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNsb3NlKCkpO1xuICB9XG5cbiAgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Nsb3NlZCQpIHtcbiAgICAgIGNvbnN0IGNsb3NlZCQgPSB0aGlzLl9jbG9zZWQkO1xuICAgICAgdGhpcy5fY2xvc2VkJCA9IHVuZGVmaW5lZDtcbiAgICAgIGNsb3NlZCQubmV4dCgpO1xuICAgICAgY2xvc2VkJC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRldGFjaCgpO1xuICAgICAgdGhpcy5vdmVybGF5UmVmLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbG9zaW5nQWN0aW9ucyhvdmVybGF5UGFuZWxSZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmLCBvdmVybGF5UmVmOiBPdmVybGF5UmVmKSB7XG4gICAgY29uc3QgYmFja2Ryb3AgPSBvdmVybGF5UmVmIS5iYWNrZHJvcENsaWNrKCk7XG4gICAgY29uc3QgZGV0YWNobWVudHMgPSBvdmVybGF5UmVmIS5kZXRhY2htZW50cygpO1xuXG4gICAgcmV0dXJuIG1lcmdlKGJhY2tkcm9wLCBkZXRhY2htZW50cywgb3ZlcmxheVBhbmVsUmVmLmNsb3NlZCk7XG4gIH1cbn1cbiJdfQ==