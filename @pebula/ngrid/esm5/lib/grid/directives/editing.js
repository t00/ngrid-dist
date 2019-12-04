/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2VkaXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsU0FBUyxFQUFpQixVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUcvRjtJQVFFLDRDQUFvQixLQUE4QixFQUFVLE1BQWM7UUFBdEQsVUFBSyxHQUFMLEtBQUssQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQzs7OztJQUUvRSw0REFBZTs7O0lBQWY7UUFBQSxpQkFxQkM7O1lBcEJPLE9BQU87OztRQUFHOztnQkFDUixPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU87WUFDNUIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzFDLElBQUksT0FBTyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO2dCQUNwRCxLQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNsQztRQUNILENBQUMsQ0FBQTtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCOzs7UUFBQztZQUM1QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSTs7O1lBQUM7Z0JBQ3JCLElBQUksQ0FBQyxLQUFJLENBQUMsVUFBVSxFQUFFO29CQUNaLElBQUEsc0NBQVE7b0JBQ2hCLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUU7d0JBQ3BDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDckQ7eUJBQU07d0JBQ0wsT0FBTyxFQUFFLENBQUM7cUJBQ1g7aUJBQ0Y7WUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELHdEQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7O2dCQW5DRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7Z0JBSGQsVUFBVTtnQkFBUyxNQUFNOzs7MEJBT3pELEtBQUssU0FBQyxzQkFBc0I7O0lBZ0MvQix5Q0FBQztDQUFBLEFBcENELElBb0NDO1NBbkNZLGtDQUFrQzs7O0lBRzdDLHFEQUFpRTs7Ozs7SUFFakUsd0RBQTRCOzs7OztJQUVoQixtREFBc0M7Ozs7O0lBQUUsb0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibENlbGxFZGl0QXV0b0ZvY3VzXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncGJsQ2VsbEVkaXRBdXRvRm9jdXMnKSBjb250ZXh0OiBQYmxOZ3JpZENlbGxDb250ZXh0PGFueT47XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZG9Gb2N1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICBjb250ZXh0LnJvd0NvbnRleHQudXBkYXRlT3V0T2ZWaWV3U3RhdGUoKTtcbiAgICAgIGlmIChjb250ZXh0LmVkaXRpbmcgJiYgIWNvbnRleHQucm93Q29udGV4dC5vdXRPZlZpZXcpIHtcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHRoaXMuY29udGV4dC5ncmlkO1xuICAgICAgICAgIGlmICh2aWV3cG9ydCAmJiB2aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgICAgdmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKGRvRm9jdXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb0ZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==