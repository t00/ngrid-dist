/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/registry.directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef, Input } from '@angular/core';
import { MetaCellContext } from '../context/index';
import { PblNgridRegistryService } from '../services/grid-registry.service';
/**
 * @abstract
 * @template T, TKind
 */
export class PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.registry.setSingle(this.kind, (/** @type {?} */ (this)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.registry.setSingle(this.kind, undefined);
    }
}
if (false) {
    /** @type {?} */
    PblNgridSingleTemplateRegistry.prototype.kind;
    /** @type {?} */
    PblNgridSingleTemplateRegistry.prototype.tRef;
    /**
     * @type {?}
     * @protected
     */
    PblNgridSingleTemplateRegistry.prototype.registry;
}
/**
 * @abstract
 * @template T, TKind
 */
export class PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.registry.addMulti(this.kind, (/** @type {?} */ (this)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.registry.removeMulti(this.kind, (/** @type {?} */ (this)));
    }
}
if (false) {
    /** @type {?} */
    PblNgridMultiTemplateRegistry.prototype.name;
    /** @type {?} */
    PblNgridMultiTemplateRegistry.prototype.kind;
    /** @type {?} */
    PblNgridMultiTemplateRegistry.prototype.tRef;
    /**
     * @type {?}
     * @protected
     */
    PblNgridMultiTemplateRegistry.prototype.registry;
}
/**
 * @abstract
 * @template T, TKind
 */
export class PblNgridMultiComponentRegistry {
}
if (false) {
    /** @type {?} */
    PblNgridMultiComponentRegistry.prototype.name;
    /** @type {?} */
    PblNgridMultiComponentRegistry.prototype.kind;
    /**
     * When set to true the component will be created with projected content.
     * Setting to true does not ensure projection, the projection is determined by the context creating the component.
     *
     * For example, In the context of `dataHeaderExtensions` the projection will be the content of the cell, other implementations
     * might not include a projection.
     * @type {?}
     */
    PblNgridMultiComponentRegistry.prototype.projectContent;
    /**
     * @abstract
     * @param {?} context
     * @return {?}
     */
    PblNgridMultiComponentRegistry.prototype.getFactory = function (context) { };
}
/**
 * @template T
 */
export class PblNgridDataHeaderExtensionContext extends MetaCellContext {
    /**
     * @protected
     */
    constructor() { super(); }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} headerCell
     * @param {?} injector
     * @return {?}
     */
    static createDateHeaderCtx(headerCell, injector) {
        /** @type {?} */
        const instance = new PblNgridDataHeaderExtensionContext();
        instance.col = headerCell.columnDef.column;
        instance.grid = headerCell.grid;
        Object.defineProperty(instance, 'injector', { value: injector });
        return instance;
    }
}
if (false) {
    /** @type {?} */
    PblNgridDataHeaderExtensionContext.prototype.injector;
}
/**
 * @record
 * @template T
 */
export function PblNgridDataHeaderExtensionRef() { }
if (false) {
    /**
     * @param {?} context
     * @return {?}
     */
    PblNgridDataHeaderExtensionRef.prototype.shouldRender = function (context) { };
}
/**
 * A generic, multi-purpose template reference for data header extensions.
 * The template's context is `PblNgridDataHeaderExtensionContext`:
 *
 * ```ts
 * interface PblNgridDataHeaderExtensionContext {
 *   col: PblMetaColumn;
 *   grid: PblNgridComponent<any>;
 *   injector: Injector;
 * }
 * ```
 *
 * By default it will render if registered but it is possible to provide a predicate to conditionally load it.
 *
 * ```html
 * <div *pblNgridHeaderExtensionRef="let ctx"></div>
 * ````
 *
 * Or with a `shouldRender` predicate:
 *
 * ```html
 * <div *pblNgridHeaderExtensionRef="shouldRender; let ctx"></div>
 * ```
 *
 * And in the component the template is defined on:
 *
 * ```ts
 * class MyComponent {
 *
 *   shouldRender = (context: PblNgridDataHeaderExtensionContext) => {
 *     // Some code returning true or false
 *   }
 * }
 * ```
 *
 * Note that the `shouldRender` predicate is run once when the header initialize.
 */
export class PblNgridHeaderExtensionRefDirective extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.name = 'genericHeaderExtension-' + PblNgridHeaderExtensionRefDirective._id++;
        this.kind = 'dataHeaderExtensions';
    }
}
PblNgridHeaderExtensionRefDirective._id = 0;
PblNgridHeaderExtensionRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridHeaderExtensionRef]' },] }
];
/** @nocollapse */
PblNgridHeaderExtensionRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
PblNgridHeaderExtensionRefDirective.propDecorators = {
    shouldRender: [{ type: Input, args: ['pblNgridHeaderExtensionRef',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridHeaderExtensionRefDirective._id;
    /** @type {?} */
    PblNgridHeaderExtensionRefDirective.prototype.name;
    /** @type {?} */
    PblNgridHeaderExtensionRefDirective.prototype.kind;
    /** @type {?} */
    PblNgridHeaderExtensionRefDirective.prototype.shouldRender;
}
/**
 * Marks the element as the display element for pagination
 */
export class PblNgridPaginatorRefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'paginator';
    }
}
PblNgridPaginatorRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridPaginatorRef]' },] }
];
/** @nocollapse */
PblNgridPaginatorRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridPaginatorRefDirective.prototype.kind;
}
/**
 * Marks the element as the display element when grid has no data.
 *
 * \@example
 * ```html
 *   <pbl-ngrid>
 *     <div *pblNgridNoDataRef style="height: 100%; display: flex; align-items: center; justify-content: center">
 *       <span>No Data</span>
 *     </div>
 *   </pbl-ngrid>
 * ```
 */
export class PblNgridNoDataRefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'noData';
    }
}
PblNgridNoDataRefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridNoDataRef]' },] }
];
/** @nocollapse */
PblNgridNoDataRefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridNoDataRefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL3JlZ2lzdHJ5LmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQStELEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzSCxPQUFPLEVBQUUsZUFBZSxFQUEyQixNQUFNLGtCQUFrQixDQUFDO0FBRTVFLE9BQU8sRUFBdUQsdUJBQXVCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7QUFFakksTUFBTSxPQUFnQiw4QkFBOEI7Ozs7O0lBR2xELFlBQW1CLElBQW9CLEVBQVksUUFBaUM7UUFBakUsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUFJLENBQUM7Ozs7SUFFekYsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUcsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGOzs7SUFYQyw4Q0FBOEI7O0lBRWxCLDhDQUEyQjs7Ozs7SUFBRSxrREFBMkM7Ozs7OztBQVd0RixNQUFNLE9BQWdCLDZCQUE2Qjs7Ozs7SUFJakQsWUFBbUIsSUFBb0IsRUFBWSxRQUFpQztRQUFqRSxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUksQ0FBQzs7OztJQUV6RixRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjs7O0lBWkMsNkNBQStCOztJQUMvQiw2Q0FBOEI7O0lBRWxCLDZDQUEyQjs7Ozs7SUFBRSxpREFBMkM7Ozs7OztBQVd0RixNQUFNLE9BQWdCLDhCQUE4QjtDQWVuRDs7O0lBZEMsOENBQStCOztJQUMvQiw4Q0FBOEI7Ozs7Ozs7OztJQVM5Qix3REFBa0M7Ozs7OztJQUVsQyw2RUFBMkY7Ozs7O0FBSTdGLE1BQU0sT0FBTyxrQ0FBNEMsU0FBUSxlQUE2Qjs7OztJQUc1RixnQkFBMEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQU1wQyxNQUFNLENBQUMsbUJBQW1CLENBQVUsVUFBa0QsRUFBRSxRQUFrQjs7Y0FDbEcsUUFBUSxHQUFHLElBQUksa0NBQWtDLEVBQUs7UUFFNUQsUUFBUSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxRQUFRLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDaEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakUsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGOzs7SUFoQkMsc0RBQTJCOzs7Ozs7QUFrQjdCLG9EQUVDOzs7Ozs7SUFEQywrRUFBdUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDekUsTUFBTSxPQUFPLG1DQUFvQyxTQUFRLDZCQUF5Rjs7Ozs7SUFRaEosWUFBWSxJQUFxRCxFQUFFLFFBQWlDO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUxySCxTQUFJLEdBQVcseUJBQXlCLEdBQUcsbUNBQW1DLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckYsU0FBSSxHQUEyQixzQkFBc0IsQ0FBQztJQUlnRSxDQUFDOztBQVBqSCx1Q0FBRyxHQUFHLENBQUMsQ0FBQzs7WUFGeEIsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDhCQUE4QixFQUFFOzs7O1lBbkhuQyxXQUFXO1lBTStCLHVCQUF1Qjs7OzJCQW9IbEYsS0FBSyxTQUFDLDRCQUE0Qjs7Ozs7OztJQUxuQyx3Q0FBdUI7O0lBRXZCLG1EQUE4Rjs7SUFDOUYsbURBQStEOztJQUUvRCwyREFBNkc7Ozs7O0FBUy9HLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSw4QkFBa0Y7Ozs7O0lBRW5JLFlBQVksSUFBd0QsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEeEgsU0FBSSxHQUFnQixXQUFXLENBQUM7SUFDeUYsQ0FBQzs7O1lBSHBJLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTs7OztZQWxJN0IsV0FBVztZQU0rQix1QkFBdUI7Ozs7SUE4SG5GLDZDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUFpQjNDLE1BQU0sT0FBTywwQkFBMkIsU0FBUSw4QkFBK0U7Ozs7O0lBRTdILFlBQVksSUFBd0QsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEeEgsU0FBSSxHQUFhLFFBQVEsQ0FBQztJQUMrRixDQUFDOzs7WUFIcEksU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFOzs7O1lBcEoxQixXQUFXO1lBTStCLHVCQUF1Qjs7OztJQWdKbkYsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHsgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwLCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8VCwgVEtpbmQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgYWJzdHJhY3QgcmVhZG9ubHkga2luZDogVEtpbmQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRSZWY6IFRlbXBsYXRlUmVmPFQ+LCBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSh0aGlzLmtpbmQsIHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0U2luZ2xlKHRoaXMua2luZCwgIHVuZGVmaW5lZCk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFQsIFRLaW5kIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgYWJzdHJhY3QgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICBhYnN0cmFjdCByZWFkb25seSBraW5kOiBUS2luZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdFJlZjogVGVtcGxhdGVSZWY8VD4sIHByb3RlY3RlZCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuYWRkTXVsdGkodGhpcy5raW5kLCB0aGlzIGFzIGFueSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnJlbW92ZU11bHRpKHRoaXMua2luZCwgdGhpcyBhcyBhbnkpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8VCwgVEtpbmQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+IHtcbiAgYWJzdHJhY3QgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xuICBhYnN0cmFjdCByZWFkb25seSBraW5kOiBUS2luZDtcblxuICAvKipcbiAgICogV2hlbiBzZXQgdG8gdHJ1ZSB0aGUgY29tcG9uZW50IHdpbGwgYmUgY3JlYXRlZCB3aXRoIHByb2plY3RlZCBjb250ZW50LlxuICAgKiBTZXR0aW5nIHRvIHRydWUgZG9lcyBub3QgZW5zdXJlIHByb2plY3Rpb24sIHRoZSBwcm9qZWN0aW9uIGlzIGRldGVybWluZWQgYnkgdGhlIGNvbnRleHQgY3JlYXRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIEluIHRoZSBjb250ZXh0IG9mIGBkYXRhSGVhZGVyRXh0ZW5zaW9uc2AgdGhlIHByb2plY3Rpb24gd2lsbCBiZSB0aGUgY29udGVudCBvZiB0aGUgY2VsbCwgb3RoZXIgaW1wbGVtZW50YXRpb25zXG4gICAqIG1pZ2h0IG5vdCBpbmNsdWRlIGEgcHJvamVjdGlvbi5cbiAgICovXG4gIHJlYWRvbmx5IHByb2plY3RDb250ZW50PzogYm9vbGVhbjtcblxuICBhYnN0cmFjdCBnZXRGYWN0b3J5KGNvbnRleHQ6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPik6IENvbXBvbmVudEZhY3Rvcnk8VD47XG4gIG9uQ3JlYXRlZD8oY29udGV4dDogUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+LCBjbXBSZWY6IENvbXBvbmVudFJlZjxUPik6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQgPSBhbnk+IGV4dGVuZHMgTWV0YUNlbGxDb250ZXh0PFQsIFBibENvbHVtbj4ge1xuICByZWFkb25seSBpbmplY3RvcjogSW5qZWN0b3JcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7IHN1cGVyKCk7IH1cblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZURhdGVIZWFkZXJDdHg8VCA9IGFueT4oaGVhZGVyQ2VsbDogUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50PFBibENvbHVtbj4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ8VD4oKTtcblxuICAgIGluc3RhbmNlLmNvbCA9IGhlYWRlckNlbGwuY29sdW1uRGVmLmNvbHVtbjtcbiAgICBpbnN0YW5jZS5ncmlkID0gaGVhZGVyQ2VsbC5ncmlkO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgJ2luamVjdG9yJywgeyB2YWx1ZTogaW5qZWN0b3IgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmPFQgPSBhbnk+IHtcbiAgc2hvdWxkUmVuZGVyPyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+KTogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIEEgZ2VuZXJpYywgbXVsdGktcHVycG9zZSB0ZW1wbGF0ZSByZWZlcmVuY2UgZm9yIGRhdGEgaGVhZGVyIGV4dGVuc2lvbnMuXG4gKiBUaGUgdGVtcGxhdGUncyBjb250ZXh0IGlzIGBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0YDpcbiAqXG4gKiBgYGB0c1xuICogaW50ZXJmYWNlIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQge1xuICogICBjb2w6IFBibE1ldGFDb2x1bW47XG4gKiAgIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG4gKiAgIGluamVjdG9yOiBJbmplY3RvcjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEJ5IGRlZmF1bHQgaXQgd2lsbCByZW5kZXIgaWYgcmVnaXN0ZXJlZCBidXQgaXQgaXMgcG9zc2libGUgdG8gcHJvdmlkZSBhIHByZWRpY2F0ZSB0byBjb25kaXRpb25hbGx5IGxvYWQgaXQuXG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqcGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWY9XCJsZXQgY3R4XCI+PC9kaXY+XG4gKiBgYGBgXG4gKlxuICogT3Igd2l0aCBhIGBzaG91bGRSZW5kZXJgIHByZWRpY2F0ZTpcbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2ICpwYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZj1cInNob3VsZFJlbmRlcjsgbGV0IGN0eFwiPjwvZGl2PlxuICogYGBgXG4gKlxuICogQW5kIGluIHRoZSBjb21wb25lbnQgdGhlIHRlbXBsYXRlIGlzIGRlZmluZWQgb246XG4gKlxuICogYGBgdHNcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqXG4gKiAgIHNob3VsZFJlbmRlciA9IChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KSA9PiB7XG4gKiAgICAgLy8gU29tZSBjb2RlIHJldHVybmluZyB0cnVlIG9yIGZhbHNlXG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIE5vdGUgdGhhdCB0aGUgYHNob3VsZFJlbmRlcmAgcHJlZGljYXRlIGlzIHJ1biBvbmNlIHdoZW4gdGhlIGhlYWRlciBpbml0aWFsaXplLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgJ2RhdGFIZWFkZXJFeHRlbnNpb25zJz4gaW1wbGVtZW50cyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWYge1xuICBwcml2YXRlIHN0YXRpYyBfaWQgPSAwO1xuXG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZyA9ICdnZW5lcmljSGVhZGVyRXh0ZW5zaW9uLScgKyBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZS5faWQrKztcbiAgcmVhZG9ubHkga2luZDogJ2RhdGFIZWFkZXJFeHRlbnNpb25zJyA9ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc7XG5cbiAgQElucHV0KCdwYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZicpIHNob3VsZFJlbmRlcj86IChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCBmb3IgcGFnaW5hdGlvblxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRQYWdpbmF0b3JSZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PHsgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IH0sICdwYWdpbmF0b3InPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICdwYWdpbmF0b3InID0gJ3BhZ2luYXRvcic7XG4gIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPHsgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IH0+LCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgc3VwZXIodFJlZiwgcmVnaXN0cnkpOyB9XG59XG5cbi8qKlxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCB3aGVuIGdyaWQgaGFzIG5vIGRhdGEuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqICAgPHBibC1uZ3JpZD5cbiAqICAgICA8ZGl2ICpwYmxOZ3JpZE5vRGF0YVJlZiBzdHlsZT1cImhlaWdodDogMTAwJTsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXJcIj5cbiAqICAgICAgIDxzcGFuPk5vIERhdGE8L3NwYW4+XG4gKiAgICAgPC9kaXY+XG4gKiAgIDwvcGJsLW5ncmlkPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZE5vRGF0YVJlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfSwgJ25vRGF0YSc+IHtcbiAgcmVhZG9ubHkga2luZDogJ25vRGF0YScgPSAnbm9EYXRhJztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfT4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cbiJdfQ==