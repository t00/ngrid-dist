/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBUXZEO0lBUUUsdUNBQW9CLElBQTRCLEVBQVUsSUFBd0Q7UUFBOUYsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFvRDtJQUFJLENBQUM7Ozs7SUFFdkgsdURBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRyxDQUFDOztnQkFaRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsTUFBTSxFQUFFLENBQUUsK0JBQStCLENBQUUsQ0FBQyxtREFBbUQ7aUJBQ2hHOzs7O2dCQVhRLGlCQUFpQjtnQkFGTixXQUFXOztJQXVCL0Isb0NBQUM7Q0FBQSxBQWJELElBYUM7U0FUWSw2QkFBNkI7OztJQUV4QyxpREFBMkI7Ozs7O0lBRWYsNkNBQW9DOzs7OztJQUFFLDZDQUFnRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBtYXJrcyB0aGUgdGVtcGxhdGUgYXMgYSBwcm9qZWN0ZWQgc2VjdGlvbiBpbnNpZGUgdGhlIGdyaWQuXG4gKiBUaGUgbG9jYXRpb24gb2YgdGhlIHByb2plY3QgY29udGVudCBpcyBzZXQgYnkgdGhlIHBvc2l0aW9uIGlucHV0LlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGRpcmVjdGl2ZSBjYW4gb25seSBiZSBzZXQgYXMgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSBncmlkLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRPdXRlclNlY3Rpb25dJyxcbiAgaW5wdXRzOiBbICdwb3NpdGlvbjpwYmxOZ3JpZE91dGVyU2VjdGlvbicgXSAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1pbnB1dC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdXRlclNlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwb3NpdGlvbjogJ3RvcCcgfCAnYm90dG9tJzsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1pbnB1dC1yZW5hbWVcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgdFJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfT4pIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQuY3JlYXRlVmlldyh0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJyA/ICdiZWZvcmVDb250ZW50JyA6ICdiZWZvcmVUYWJsZScsIHRoaXMudFJlZik7XG4gIH1cbn1cbiJdfQ==