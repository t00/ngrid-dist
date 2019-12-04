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
export class PblNgridOuterSectionDirective {
    // tslint:disable-line:no-input-rename
    /**
     * @param {?} grid
     * @param {?} tRef
     */
    constructor(grid, tRef) {
        this.grid = grid;
        this.tRef = tRef;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.grid.createView(this.position === 'bottom' ? 'beforeContent' : 'beforeTable', this.tRef);
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
    PblNgridOuterSectionDirective.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridOuterSectionDirective.prototype.tRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7Ozs7QUFZdkQsTUFBTSxPQUFPLDZCQUE2Qjs7Ozs7O0lBSXhDLFlBQW9CLElBQTRCLEVBQVUsSUFBd0Q7UUFBOUYsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFvRDtJQUFJLENBQUM7Ozs7SUFFdkgsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEcsQ0FBQzs7O1lBWkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx3QkFBd0I7Z0JBQ2xDLE1BQU0sRUFBRSxDQUFFLCtCQUErQixDQUFFLENBQUMsbURBQW1EO2FBQ2hHOzs7O1lBWFEsaUJBQWlCO1lBRk4sV0FBVzs7OztJQWdCN0IsaURBQTJCOzs7OztJQUVmLDZDQUFvQzs7Ozs7SUFBRSw2Q0FBZ0UiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbWFya3MgdGhlIHRlbXBsYXRlIGFzIGEgcHJvamVjdGVkIHNlY3Rpb24gaW5zaWRlIHRoZSBncmlkLlxuICogVGhlIGxvY2F0aW9uIG9mIHRoZSBwcm9qZWN0IGNvbnRlbnQgaXMgc2V0IGJ5IHRoZSBwb3NpdGlvbiBpbnB1dC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBkaXJlY3RpdmUgY2FuIG9ubHkgYmUgc2V0IGFzIHRoZSBjb250ZW50IGluc2lkZSB0aGUgZ3JpZC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkT3V0ZXJTZWN0aW9uXScsXG4gIGlucHV0czogWyAncG9zaXRpb246cGJsTmdyaWRPdXRlclNlY3Rpb24nIF0gLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaW5wdXQtcHJvcGVydHktZGVjb3JhdG9yXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbSc7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8taW5wdXQtcmVuYW1lXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHRSZWY6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IH0+KSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5ncmlkLmNyZWF0ZVZpZXcodGhpcy5wb3NpdGlvbiA9PT0gJ2JvdHRvbScgPyAnYmVmb3JlQ29udGVudCcgOiAnYmVmb3JlVGFibGUnLCB0aGlzLnRSZWYpO1xuICB9XG59XG4iXX0=