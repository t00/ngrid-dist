/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/editing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { take } from 'rxjs/operators';
import { Directive, ElementRef, Input, NgZone } from '@angular/core';
export class PblNgridCellEditAutoFocusDirective {
    /**
     * @param {?} elRef
     * @param {?} ngZone
     */
    constructor(elRef, ngZone) {
        this.elRef = elRef;
        this.ngZone = ngZone;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        /** @type {?} */
        const doFocus = (/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const context = this.context;
            context.rowContext.updateOutOfViewState();
            if (context.editing && !context.rowContext.outOfView) {
                this.elRef.nativeElement.focus();
            }
        });
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            Promise.resolve().then((/**
             * @return {?}
             */
            () => {
                if (!this._destroyed) {
                    const { viewport } = this.context.grid;
                    if (viewport && viewport.isScrolling) {
                        viewport.scrolling.pipe(take(1)).subscribe(doFocus);
                    }
                    else {
                        doFocus();
                    }
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyed = true;
    }
}
PblNgridCellEditAutoFocusDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblCellEditAutoFocus]' },] }
];
/** @nocollapse */
PblNgridCellEditAutoFocusDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
PblNgridCellEditAutoFocusDirective.propDecorators = {
    context: [{ type: Input, args: ['pblCellEditAutoFocus',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2VkaXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFJL0YsTUFBTSxPQUFPLGtDQUFrQzs7Ozs7SUFPN0MsWUFBb0IsS0FBOEIsRUFBVSxNQUFjO1FBQXRELFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7Ozs7SUFFL0UsZUFBZTs7Y0FDUCxPQUFPOzs7UUFBRyxHQUFHLEVBQUU7O2tCQUNiLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztZQUM1QixPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDMUMsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUNqQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSTs7O1lBQUMsR0FBRyxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTswQkFDZCxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSTtvQkFDdEMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTt3QkFDcEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNyRDt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7OztZQW5DRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7WUFIZCxVQUFVO1lBQVMsTUFBTTs7O3NCQU96RCxLQUFLLFNBQUMsc0JBQXNCOzs7O0lBQTdCLHFEQUFpRTs7Ozs7SUFFakUsd0RBQTRCOzs7OztJQUVoQixtREFBc0M7Ozs7O0lBQUUsb0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibENlbGxFZGl0QXV0b0ZvY3VzXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncGJsQ2VsbEVkaXRBdXRvRm9jdXMnKSBjb250ZXh0OiBQYmxOZ3JpZENlbGxDb250ZXh0PGFueT47XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZG9Gb2N1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICBjb250ZXh0LnJvd0NvbnRleHQudXBkYXRlT3V0T2ZWaWV3U3RhdGUoKTtcbiAgICAgIGlmIChjb250ZXh0LmVkaXRpbmcgJiYgIWNvbnRleHQucm93Q29udGV4dC5vdXRPZlZpZXcpIHtcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHRoaXMuY29udGV4dC5ncmlkO1xuICAgICAgICAgIGlmICh2aWV3cG9ydCAmJiB2aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgICAgdmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKGRvRm9jdXMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb0ZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2Rlc3Ryb3llZCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==