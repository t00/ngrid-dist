/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef, Input } from '@angular/core';
import { MetaCellContext } from '../context/index';
import { PblNgridRegistryService } from '../services/table-registry.service';
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
        instance.table = headerCell.table;
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
 *   table: PblNgridComponent<any>;
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
 * Marks the element as the display element when table has no data.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9yZWdpc3RyeS5kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQStELEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzSCxPQUFPLEVBQUUsZUFBZSxFQUEyQixNQUFNLGtCQUFrQixDQUFDO0FBRTVFLE9BQU8sRUFBdUQsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7Ozs7QUFFbEksTUFBTSxPQUFnQiw4QkFBOEI7Ozs7O0lBR2xELFlBQW1CLElBQW9CLEVBQVksUUFBaUM7UUFBakUsU0FBSSxHQUFKLElBQUksQ0FBZ0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUF5QjtJQUFJLENBQUM7Ozs7SUFFekYsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUcsU0FBUyxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGOzs7SUFYQyw4Q0FBOEI7O0lBRWxCLDhDQUEyQjs7Ozs7SUFBRSxrREFBMkM7Ozs7OztBQVd0RixNQUFNLE9BQWdCLDZCQUE2Qjs7Ozs7SUFJakQsWUFBbUIsSUFBb0IsRUFBWSxRQUFpQztRQUFqRSxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUksQ0FBQzs7OztJQUV6RixRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjs7O0lBWkMsNkNBQStCOztJQUMvQiw2Q0FBOEI7O0lBRWxCLDZDQUEyQjs7Ozs7SUFBRSxpREFBMkM7Ozs7OztBQVd0RixNQUFNLE9BQWdCLDhCQUE4QjtDQWVuRDs7O0lBZEMsOENBQStCOztJQUMvQiw4Q0FBOEI7Ozs7Ozs7OztJQVM5Qix3REFBa0M7Ozs7OztJQUVsQyw2RUFBMkY7Ozs7O0FBSTdGLE1BQU0sT0FBTyxrQ0FBNEMsU0FBUSxlQUE2Qjs7OztJQUc1RixnQkFBMEIsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQU1wQyxNQUFNLENBQUMsbUJBQW1CLENBQVUsVUFBa0QsRUFBRSxRQUFrQjs7Y0FDbEcsUUFBUSxHQUFHLElBQUksa0NBQWtDLEVBQUs7UUFFNUQsUUFBUSxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxRQUFRLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDbEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakUsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGOzs7SUFoQkMsc0RBQTJCOzs7Ozs7QUFrQjdCLG9EQUVDOzs7Ozs7SUFEQywrRUFBdUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDekUsTUFBTSxPQUFPLG1DQUFvQyxTQUFRLDZCQUF5Rjs7Ozs7SUFRaEosWUFBWSxJQUFxRCxFQUFFLFFBQWlDO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUxySCxTQUFJLEdBQVcseUJBQXlCLEdBQUcsbUNBQW1DLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckYsU0FBSSxHQUEyQixzQkFBc0IsQ0FBQztJQUlnRSxDQUFDOztBQVBqSCx1Q0FBRyxHQUFHLENBQUMsQ0FBQzs7WUFGeEIsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDhCQUE4QixFQUFFOzs7O1lBbkhuQyxXQUFXO1lBTStCLHVCQUF1Qjs7OzJCQW9IbEYsS0FBSyxTQUFDLDRCQUE0Qjs7Ozs7OztJQUxuQyx3Q0FBdUI7O0lBRXZCLG1EQUE4Rjs7SUFDOUYsbURBQStEOztJQUUvRCwyREFBNkc7Ozs7O0FBUy9HLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSw4QkFBa0Y7Ozs7O0lBRW5JLFlBQVksSUFBd0QsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEeEgsU0FBSSxHQUFnQixXQUFXLENBQUM7SUFDeUYsQ0FBQzs7O1lBSHBJLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBRTs7OztZQWxJN0IsV0FBVztZQU0rQix1QkFBdUI7Ozs7SUE4SG5GLDZDQUF5Qzs7Ozs7Ozs7Ozs7Ozs7QUFpQjNDLE1BQU0sT0FBTywwQkFBMkIsU0FBUSw4QkFBK0U7Ozs7O0lBRTdILFlBQVksSUFBd0QsRUFBRSxRQUFpQztRQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFEeEgsU0FBSSxHQUFhLFFBQVEsQ0FBQztJQUMrRixDQUFDOzs7WUFIcEksU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFOzs7O1lBcEoxQixXQUFXO1lBTStCLHVCQUF1Qjs7OztJQWdKbkYsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHsgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwLCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PFQsIFRLaW5kIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGtpbmQ6IFRLaW5kO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0UmVmOiBUZW1wbGF0ZVJlZjxUPiwgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUodGhpcy5raW5kLCB0aGlzIGFzIGFueSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSh0aGlzLmtpbmQsICB1bmRlZmluZWQpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxULCBUS2luZCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgYWJzdHJhY3QgcmVhZG9ubHkga2luZDogVEtpbmQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRSZWY6IFRlbXBsYXRlUmVmPFQ+LCBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LmFkZE11bHRpKHRoaXMua2luZCwgdGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5yZW1vdmVNdWx0aSh0aGlzLmtpbmQsIHRoaXMgYXMgYW55KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PFQsIFRLaW5kIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPiB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgYWJzdHJhY3QgcmVhZG9ubHkga2luZDogVEtpbmQ7XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0IHRvIHRydWUgdGhlIGNvbXBvbmVudCB3aWxsIGJlIGNyZWF0ZWQgd2l0aCBwcm9qZWN0ZWQgY29udGVudC5cbiAgICogU2V0dGluZyB0byB0cnVlIGRvZXMgbm90IGVuc3VyZSBwcm9qZWN0aW9uLCB0aGUgcHJvamVjdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBjb250ZXh0IGNyZWF0aW5nIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBJbiB0aGUgY29udGV4dCBvZiBgZGF0YUhlYWRlckV4dGVuc2lvbnNgIHRoZSBwcm9qZWN0aW9uIHdpbGwgYmUgdGhlIGNvbnRlbnQgb2YgdGhlIGNlbGwsIG90aGVyIGltcGxlbWVudGF0aW9uc1xuICAgKiBtaWdodCBub3QgaW5jbHVkZSBhIHByb2plY3Rpb24uXG4gICAqL1xuICByZWFkb25seSBwcm9qZWN0Q29udGVudD86IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgZ2V0RmFjdG9yeShjb250ZXh0OiBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4pOiBDb21wb25lbnRGYWN0b3J5PFQ+O1xuICBvbkNyZWF0ZWQ/KGNvbnRleHQ6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPiwgY21wUmVmOiBDb21wb25lbnRSZWY8VD4pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDxUID0gYW55PiBleHRlbmRzIE1ldGFDZWxsQ29udGV4dDxULCBQYmxDb2x1bW4+IHtcbiAgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yXG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGVEYXRlSGVhZGVyQ3R4PFQgPSBhbnk+KGhlYWRlckNlbGw6IFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxQYmxDb2x1bW4+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+KCk7XG5cbiAgICBpbnN0YW5jZS5jb2wgPSBoZWFkZXJDZWxsLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgaW5zdGFuY2UudGFibGUgPSBoZWFkZXJDZWxsLnRhYmxlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgJ2luamVjdG9yJywgeyB2YWx1ZTogaW5qZWN0b3IgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmPFQgPSBhbnk+IHtcbiAgc2hvdWxkUmVuZGVyPyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+KTogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIEEgZ2VuZXJpYywgbXVsdGktcHVycG9zZSB0ZW1wbGF0ZSByZWZlcmVuY2UgZm9yIGRhdGEgaGVhZGVyIGV4dGVuc2lvbnMuXG4gKiBUaGUgdGVtcGxhdGUncyBjb250ZXh0IGlzIGBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0YDpcbiAqXG4gKiBgYGB0c1xuICogaW50ZXJmYWNlIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQge1xuICogICBjb2w6IFBibE1ldGFDb2x1bW47XG4gKiAgIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICogICBpbmplY3RvcjogSW5qZWN0b3I7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0IGl0IHdpbGwgcmVuZGVyIGlmIHJlZ2lzdGVyZWQgYnV0IGl0IGlzIHBvc3NpYmxlIHRvIHByb3ZpZGUgYSBwcmVkaWNhdGUgdG8gY29uZGl0aW9uYWxseSBsb2FkIGl0LlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmPVwibGV0IGN0eFwiPjwvZGl2PlxuICogYGBgYFxuICpcbiAqIE9yIHdpdGggYSBgc2hvdWxkUmVuZGVyYCBwcmVkaWNhdGU6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqcGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWY9XCJzaG91bGRSZW5kZXI7IGxldCBjdHhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEFuZCBpbiB0aGUgY29tcG9uZW50IHRoZSB0ZW1wbGF0ZSBpcyBkZWZpbmVkIG9uOlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKlxuICogICBzaG91bGRSZW5kZXIgPSAoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCkgPT4ge1xuICogICAgIC8vIFNvbWUgY29kZSByZXR1cm5pbmcgdHJ1ZSBvciBmYWxzZVxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBOb3RlIHRoYXQgdGhlIGBzaG91bGRSZW5kZXJgIHByZWRpY2F0ZSBpcyBydW4gb25jZSB3aGVuIHRoZSBoZWFkZXIgaW5pdGlhbGl6ZS5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IGltcGxlbWVudHMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2lkID0gMDtcblxuICByZWFkb25seSBuYW1lOiBzdHJpbmcgPSAnZ2VuZXJpY0hlYWRlckV4dGVuc2lvbi0nICsgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUuX2lkKys7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuXG4gIEBJbnB1dCgncGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWYnKSBzaG91bGRSZW5kZXI/OiAoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCkgPT4gYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgZm9yIHBhZ2luYXRpb25cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkUGFnaW5hdG9yUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAncGFnaW5hdG9yJz4ge1xuICByZWFkb25seSBraW5kOiAncGFnaW5hdG9yJyA9ICdwYWdpbmF0b3InO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgd2hlbiB0YWJsZSBoYXMgbm8gZGF0YS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogICA8cGJsLW5ncmlkPlxuICogICAgIDxkaXYgKnBibE5ncmlkTm9EYXRhUmVmIHN0eWxlPVwiaGVpZ2h0OiAxMDAlOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclwiPlxuICogICAgICAgPHNwYW4+Tm8gRGF0YTwvc3Bhbj5cbiAqICAgICA8L2Rpdj5cbiAqICAgPC9wYmwtbmdyaWQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkTm9EYXRhUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAnbm9EYXRhJz4ge1xuICByZWFkb25seSBraW5kOiAnbm9EYXRhJyA9ICdub0RhdGEnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19