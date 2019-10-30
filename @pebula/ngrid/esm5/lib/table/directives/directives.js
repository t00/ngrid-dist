/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef } from '@angular/core';
import { PblNgridComponent } from '../table.component';
/**
 * A directive that marks the template as a projected section inside the table.
 * The location of the project content is set by the position input.
 *
 * Note that this directive can only be set as the content inside the table.
 */
var PblNgridOuterSectionDirective = /** @class */ (function () {
    function PblNgridOuterSectionDirective(table, tRef) {
        this.table = table;
        this.tRef = tRef;
    }
    /**
     * @return {?}
     */
    PblNgridOuterSectionDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.table.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
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
    PblNgridOuterSectionDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridOuterSectionDirective.prototype.tRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBUXZEO0lBUUUsdUNBQW9CLEtBQTZCLEVBQVUsSUFBd0Q7UUFBL0YsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFvRDtJQUFJLENBQUM7Ozs7SUFFeEgsdURBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRyxDQUFDOztnQkFaRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsTUFBTSxFQUFFLENBQUUsK0JBQStCLENBQUUsQ0FBQyxtREFBbUQ7aUJBQ2hHOzs7O2dCQVhRLGlCQUFpQjtnQkFGTixXQUFXOztJQXVCL0Isb0NBQUM7Q0FBQSxBQWJELElBYUM7U0FUWSw2QkFBNkI7OztJQUV4QyxpREFBMkI7Ozs7O0lBRWYsOENBQXFDOzs7OztJQUFFLDZDQUFnRSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBtYXJrcyB0aGUgdGVtcGxhdGUgYXMgYSBwcm9qZWN0ZWQgc2VjdGlvbiBpbnNpZGUgdGhlIHRhYmxlLlxuICogVGhlIGxvY2F0aW9uIG9mIHRoZSBwcm9qZWN0IGNvbnRlbnQgaXMgc2V0IGJ5IHRoZSBwb3NpdGlvbiBpbnB1dC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBkaXJlY3RpdmUgY2FuIG9ubHkgYmUgc2V0IGFzIHRoZSBjb250ZW50IGluc2lkZSB0aGUgdGFibGUuXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZE91dGVyU2VjdGlvbl0nLFxuICBpbnB1dHM6IFsgJ3Bvc2l0aW9uOnBibE5ncmlkT3V0ZXJTZWN0aW9uJyBdIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWlucHV0LXByb3BlcnR5LWRlY29yYXRvclxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gIHBvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWlucHV0LXJlbmFtZVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgdFJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfT4pIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRhYmxlLmNyZWF0ZVZpZXcodGhpcy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScgPyAnYmVmb3JlQ29udGVudCcgOiAnYmVmb3JlVGFibGUnLCB0aGlzLnRSZWYpO1xuICB9XG59XG4iXX0=