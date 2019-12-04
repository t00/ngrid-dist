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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2VkaXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUUsU0FBUyxFQUFpQixVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUkvRixNQUFNLE9BQU8sa0NBQWtDOzs7OztJQU83QyxZQUFvQixLQUE4QixFQUFVLE1BQWM7UUFBdEQsVUFBSyxHQUFMLEtBQUssQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQzs7OztJQUUvRSxlQUFlOztjQUNQLE9BQU87OztRQUFHLEdBQUcsRUFBRTs7a0JBQ2IsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPO1lBQzVCLE9BQU8sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUMxQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDbEM7UUFDSCxDQUFDLENBQUE7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFOzBCQUNkLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJO29CQUN0QyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO3dCQUNwQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ3JEO3lCQUFNO3dCQUNMLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2lCQUNGO1lBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQzs7O1lBbkNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTs7OztZQUhkLFVBQVU7WUFBUyxNQUFNOzs7c0JBT3pELEtBQUssU0FBQyxzQkFBc0I7Ozs7SUFBN0IscURBQWlFOzs7OztJQUVqRSx3REFBNEI7Ozs7O0lBRWhCLG1EQUFzQzs7Ozs7SUFBRSxvREFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEaXJlY3RpdmUsIEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsQ2VsbEVkaXRBdXRvRm9jdXNdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbEVkaXRBdXRvRm9jdXNEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdwYmxDZWxsRWRpdEF1dG9Gb2N1cycpIGNvbnRleHQ6IFBibE5ncmlkQ2VsbENvbnRleHQ8YW55PjtcblxuICBwcml2YXRlIF9kZXN0cm95ZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCBkb0ZvY3VzID0gKCkgPT4ge1xuICAgICAgY29uc3QgY29udGV4dCA9IHRoaXMuY29udGV4dDtcbiAgICAgIGNvbnRleHQucm93Q29udGV4dC51cGRhdGVPdXRPZlZpZXdTdGF0ZSgpO1xuICAgICAgaWYgKGNvbnRleHQuZWRpdGluZyAmJiAhY29udGV4dC5yb3dDb250ZXh0Lm91dE9mVmlldykge1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fZGVzdHJveWVkKSB7XG4gICAgICAgICAgY29uc3QgeyB2aWV3cG9ydCB9ID0gdGhpcy5jb250ZXh0LmdyaWQ7XG4gICAgICAgICAgaWYgKHZpZXdwb3J0ICYmIHZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICB2aWV3cG9ydC5zY3JvbGxpbmcucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoZG9Gb2N1cyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvRm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxufVxuIl19