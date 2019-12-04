/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridComponent } from '../ngrid.component';
/**
 * A directive that marks the template as a projected section inside the grid.
 * The location of the project content is set by the position input.
 *
 * Note that this directive can only be set as the content inside the grid.
 */
var PblNgridOuterSectionDirective = /** @class */ (function () {
    function PblNgridOuterSectionDirective(grid, tRef) {
        this.grid = grid;
        this.tRef = tRef;
    }
    /**
     * @return {?}
     */
    PblNgridOuterSectionDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.grid.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
    };
    PblNgridOuterSectionDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pblNgridOuterSection]',
                    inputs: ['position:pblNgridOuterSection'] // tslint:disable-line:use-input-property-decorator
                },] }
    ];
    /** @nocollapse */
    PblNgridOuterSectionDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: TemplateRef }
    ]; };
    return PblNgridOuterSectionDirective;
}());
export { PblNgridOuterSectionDirective };
if (false) {
    /** @type {?} */
    PblNgridOuterSectionDirective.prototype.position;
    /**
     * @type {?}
     * @private
     */
    PblNgridOuterSectionDirective.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridOuterSectionDirective.prototype.tRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7QUFRdkQ7SUFRRSx1Q0FBb0IsSUFBNEIsRUFBVSxJQUF3RDtRQUE5RixTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUFVLFNBQUksR0FBSixJQUFJLENBQW9EO0lBQUksQ0FBQzs7OztJQUV2SCx1REFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hHLENBQUM7O2dCQVpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxNQUFNLEVBQUUsQ0FBRSwrQkFBK0IsQ0FBRSxDQUFDLG1EQUFtRDtpQkFDaEc7Ozs7Z0JBWFEsaUJBQWlCO2dCQUZOLFdBQVc7O0lBdUIvQixvQ0FBQztDQUFBLEFBYkQsSUFhQztTQVRZLDZCQUE2Qjs7O0lBRXhDLGlEQUEyQjs7Ozs7SUFFZiw2Q0FBb0M7Ozs7O0lBQUUsNkNBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IG1hcmtzIHRoZSB0ZW1wbGF0ZSBhcyBhIHByb2plY3RlZCBzZWN0aW9uIGluc2lkZSB0aGUgZ3JpZC5cbiAqIFRoZSBsb2NhdGlvbiBvZiB0aGUgcHJvamVjdCBjb250ZW50IGlzIHNldCBieSB0aGUgcG9zaXRpb24gaW5wdXQuXG4gKlxuICogTm90ZSB0aGF0IHRoaXMgZGlyZWN0aXZlIGNhbiBvbmx5IGJlIHNldCBhcyB0aGUgY29udGVudCBpbnNpZGUgdGhlIGdyaWQuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZE91dGVyU2VjdGlvbl0nLFxuICBpbnB1dHM6IFsgJ3Bvc2l0aW9uOnBibE5ncmlkT3V0ZXJTZWN0aW9uJyBdIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvclxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHBvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSB0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuZ3JpZC5jcmVhdGVWaWV3KHRoaXMucG9zaXRpb24gPT09ICdib3R0b20nID8gJ2JlZm9yZUNvbnRlbnQnIDogJ2JlZm9yZVRhYmxlJywgdGhpcy50UmVmKTtcbiAgfVxufVxuIl19