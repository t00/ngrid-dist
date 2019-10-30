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
export class PblNgridOuterSectionDirective {
    // tslint:disable-line:no-input-rename
    /**
     * @param {?} table
     * @param {?} tRef
     */
    constructor(table, tRef) {
        this.table = table;
        this.tRef = tRef;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.table.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
    }
}
PblNgridOuterSectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridOuterSection]',
                inputs: ['position:pblNgridOuterSection'] // tslint:disable-line:use-input-property-decorator
            },] }
];
/** @nocollapse */
PblNgridOuterSectionDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: TemplateRef }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDOzs7Ozs7O0FBWXZELE1BQU0sT0FBTyw2QkFBNkI7Ozs7OztJQUl4QyxZQUFvQixLQUE2QixFQUFVLElBQXdEO1FBQS9GLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBb0Q7SUFBSSxDQUFDOzs7O0lBRXhILGVBQWU7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pHLENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQyxNQUFNLEVBQUUsQ0FBRSwrQkFBK0IsQ0FBRSxDQUFDLG1EQUFtRDthQUNoRzs7OztZQVhRLGlCQUFpQjtZQUZOLFdBQVc7Ozs7SUFnQjdCLGlEQUEyQjs7Ozs7SUFFZiw4Q0FBcUM7Ozs7O0lBQUUsNkNBQWdFIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5pbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmLCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUuY29tcG9uZW50JztcblxuLyoqXG4gKiBBIGRpcmVjdGl2ZSB0aGF0IG1hcmtzIHRoZSB0ZW1wbGF0ZSBhcyBhIHByb2plY3RlZCBzZWN0aW9uIGluc2lkZSB0aGUgdGFibGUuXG4gKiBUaGUgbG9jYXRpb24gb2YgdGhlIHByb2plY3QgY29udGVudCBpcyBzZXQgYnkgdGhlIHBvc2l0aW9uIGlucHV0LlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIGRpcmVjdGl2ZSBjYW4gb25seSBiZSBzZXQgYXMgdGhlIGNvbnRlbnQgaW5zaWRlIHRoZSB0YWJsZS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkT3V0ZXJTZWN0aW9uXScsXG4gIGlucHV0czogWyAncG9zaXRpb246cGJsTmdyaWRPdXRlclNlY3Rpb24nIF0gLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbSc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSB0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMudGFibGUuY3JlYXRlVmlldyh0aGlzLnBvc2l0aW9uID09PSAnYm90dG9tJyA/ICdiZWZvcmVDb250ZW50JyA6ICdiZWZvcmVUYWJsZScsIHRoaXMudFJlZik7XG4gIH1cbn1cbiJdfQ==