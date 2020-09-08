/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/editing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { take } from 'rxjs/operators';
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
var PblNgridCellEditAutoFocusDirective = /** @class */ (function () {
    function PblNgridCellEditAutoFocusDirective(elRef, ngZone) {
        this.elRef = elRef;
        this.ngZone = ngZone;
    }
    /**
     * @return {?}
     */
    PblNgridCellEditAutoFocusDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var doFocus = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var context = _this.context;
            context.rowContext.updateOutOfViewState();
            if (context.editing && !context.rowContext.outOfView) {
                _this.elRef.nativeElement.focus();
            }
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            Promise.resolve().then((/**
             * @return {?}
             */
            function () {
                if (!_this._destroyed) {
                    var viewport = _this.context.grid.viewport;
                    if (viewport && viewport.isScrolling) {
                        viewport.scrolling.pipe(take(1)).subscribe(doFocus);
                    }
                    else {
                        doFocus();
                    }
                }
            }));
        }));
    };
    /**
     * @return {?}
     */
    PblNgridCellEditAutoFocusDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._destroyed = true;
    };
    PblNgridCellEditAutoFocusDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblCellEditAutoFocus]' },] }
    ];
    /** @nocollapse */
    PblNgridCellEditAutoFocusDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgZone }
    ]; };
    PblNgridCellEditAutoFocusDirective.propDecorators = {
        context: [{ type: Input, args: ['pblCellEditAutoFocus',] }]
    };
    return PblNgridCellEditAutoFocusDirective;
}());
export { PblNgridCellEditAutoFocusDirective };
if (false) {
    /** @type {?} */
    PblNgridCellEditAutoFocusDirective.prototype.context;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditAutoFocusDirective.prototype._destroyed;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditAutoFocusDirective.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditAutoFocusDirective.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2VkaXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHL0Y7SUFRRSw0Q0FBb0IsS0FBOEIsRUFBVSxNQUFjO1FBQXRELFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7Ozs7SUFFL0UsNERBQWU7OztJQUFmO1FBQUEsaUJBcUJDOztZQXBCTyxPQUFPOzs7UUFBRzs7Z0JBQ1IsT0FBTyxHQUFHLEtBQUksQ0FBQyxPQUFPO1lBQzVCLE9BQU8sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUMxQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtnQkFDcEQsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjs7O1FBQUM7WUFDNUIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUk7OztZQUFDO2dCQUNyQixJQUFJLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRTtvQkFDWixJQUFBLHNDQUFRO29CQUNoQixJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO3dCQUNwQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ3JEO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx3REFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDOztnQkFuQ0YsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFOzs7O2dCQUhkLFVBQVU7Z0JBQVMsTUFBTTs7OzBCQU96RCxLQUFLLFNBQUMsc0JBQXNCOztJQWdDL0IseUNBQUM7Q0FBQSxBQXBDRCxJQW9DQztTQW5DWSxrQ0FBa0M7OztJQUc3QyxxREFBaUU7Ozs7O0lBRWpFLHdEQUE0Qjs7Ozs7SUFFaEIsbURBQXNDOzs7OztJQUFFLG9EQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJWaWV3SW5pdCwgRWxlbWVudFJlZiwgSW5wdXQsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxDZWxsRWRpdEF1dG9Gb2N1c10nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3BibENlbGxFZGl0QXV0b0ZvY3VzJykgY29udGV4dDogUGJsTmdyaWRDZWxsQ29udGV4dDxhbnk+O1xuXG4gIHByaXZhdGUgX2Rlc3Ryb3llZDogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IGRvRm9jdXMgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jb250ZXh0O1xuICAgICAgY29udGV4dC5yb3dDb250ZXh0LnVwZGF0ZU91dE9mVmlld1N0YXRlKCk7XG4gICAgICBpZiAoY29udGV4dC5lZGl0aW5nICYmICFjb250ZXh0LnJvd0NvbnRleHQub3V0T2ZWaWV3KSB7XG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICBjb25zdCB7IHZpZXdwb3J0IH0gPSB0aGlzLmNvbnRleHQuZ3JpZDtcbiAgICAgICAgICBpZiAodmlld3BvcnQgJiYgdmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHZpZXdwb3J0LnNjcm9sbGluZy5waXBlKHRha2UoMSkpLnN1YnNjcmliZShkb0ZvY3VzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9Gb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=