/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                    const { viewport } = this.context.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9lZGl0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEMsT0FBTyxFQUFFLFNBQVMsRUFBaUIsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFJL0YsTUFBTSxPQUFPLGtDQUFrQzs7Ozs7SUFPN0MsWUFBb0IsS0FBOEIsRUFBVSxNQUFjO1FBQXRELFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFJLENBQUM7Ozs7SUFFL0UsZUFBZTs7Y0FDUCxPQUFPOzs7UUFBRyxHQUFHLEVBQUU7O2tCQUNiLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTztZQUM1QixPQUFPLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDMUMsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2xDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTtZQUNqQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSTs7O1lBQUMsR0FBRyxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTswQkFDZCxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztvQkFDdkMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTt3QkFDcEMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNyRDt5QkFBTTt3QkFDTCxPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjtZQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7OztZQW5DRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsd0JBQXdCLEVBQUU7Ozs7WUFIZCxVQUFVO1lBQVMsTUFBTTs7O3NCQU96RCxLQUFLLFNBQUMsc0JBQXNCOzs7O0lBQTdCLHFEQUFpRTs7Ozs7SUFFakUsd0RBQTRCOzs7OztJQUVoQixtREFBc0M7Ozs7O0lBQUUsb0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibENlbGxFZGl0QXV0b0ZvY3VzXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncGJsQ2VsbEVkaXRBdXRvRm9jdXMnKSBjb250ZXh0OiBQYmxOZ3JpZENlbGxDb250ZXh0PGFueT47XG5cbiAgcHJpdmF0ZSBfZGVzdHJveWVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3QgZG9Gb2N1cyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLmNvbnRleHQ7XG4gICAgICBjb250ZXh0LnJvd0NvbnRleHQudXBkYXRlT3V0T2ZWaWV3U3RhdGUoKTtcbiAgICAgIGlmIChjb250ZXh0LmVkaXRpbmcgJiYgIWNvbnRleHQucm93Q29udGV4dC5vdXRPZlZpZXcpIHtcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2Rlc3Ryb3llZCkge1xuICAgICAgICAgIGNvbnN0IHsgdmlld3BvcnQgfSA9IHRoaXMuY29udGV4dC50YWJsZTtcbiAgICAgICAgICBpZiAodmlld3BvcnQgJiYgdmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHZpZXdwb3J0LnNjcm9sbGluZy5waXBlKHRha2UoMSkpLnN1YnNjcmliZShkb0ZvY3VzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9Gb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95ZWQgPSB0cnVlO1xuICB9XG59XG4iXX0=