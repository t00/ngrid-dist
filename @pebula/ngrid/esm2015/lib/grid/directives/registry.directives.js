/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL3JlZ2lzdHJ5LmRpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBK0QsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNILE9BQU8sRUFBRSxlQUFlLEVBQTJCLE1BQU0sa0JBQWtCLENBQUM7QUFFNUUsT0FBTyxFQUF1RCx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7OztBQUVqSSxNQUFNLE9BQWdCLDhCQUE4Qjs7Ozs7SUFHbEQsWUFBbUIsSUFBb0IsRUFBWSxRQUFpQztRQUFqRSxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUksQ0FBQzs7OztJQUV6RixRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7OztJQVhDLDhDQUE4Qjs7SUFFbEIsOENBQTJCOzs7OztJQUFFLGtEQUEyQzs7Ozs7O0FBV3RGLE1BQU0sT0FBZ0IsNkJBQTZCOzs7OztJQUlqRCxZQUFtQixJQUFvQixFQUFZLFFBQWlDO1FBQWpFLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFBSSxDQUFDOzs7O0lBRXpGLFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNGOzs7SUFaQyw2Q0FBK0I7O0lBQy9CLDZDQUE4Qjs7SUFFbEIsNkNBQTJCOzs7OztJQUFFLGlEQUEyQzs7Ozs7O0FBV3RGLE1BQU0sT0FBZ0IsOEJBQThCO0NBZW5EOzs7SUFkQyw4Q0FBK0I7O0lBQy9CLDhDQUE4Qjs7Ozs7Ozs7O0lBUzlCLHdEQUFrQzs7Ozs7O0lBRWxDLDZFQUEyRjs7Ozs7QUFJN0YsTUFBTSxPQUFPLGtDQUE0QyxTQUFRLGVBQTZCOzs7O0lBRzVGLGdCQUEwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0lBTXBDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBVSxVQUFrRCxFQUFFLFFBQWtCOztjQUNsRyxRQUFRLEdBQUcsSUFBSSxrQ0FBa0MsRUFBSztRQUU1RCxRQUFRLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqRSxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7OztJQWhCQyxzREFBMkI7Ozs7OztBQWtCN0Isb0RBRUM7Ozs7OztJQURDLCtFQUF1RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEN6RSxNQUFNLE9BQU8sbUNBQW9DLFNBQVEsNkJBQXlGOzs7OztJQVFoSixZQUFZLElBQXFELEVBQUUsUUFBaUM7UUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBTHJILFNBQUksR0FBVyx5QkFBeUIsR0FBRyxtQ0FBbUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNyRixTQUFJLEdBQTJCLHNCQUFzQixDQUFDO0lBSWdFLENBQUM7O0FBUGpILHVDQUFHLEdBQUcsQ0FBQyxDQUFDOztZQUZ4QixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsOEJBQThCLEVBQUU7Ozs7WUFuSG5DLFdBQVc7WUFNK0IsdUJBQXVCOzs7MkJBb0hsRixLQUFLLFNBQUMsNEJBQTRCOzs7Ozs7O0lBTG5DLHdDQUF1Qjs7SUFFdkIsbURBQThGOztJQUM5RixtREFBK0Q7O0lBRS9ELDJEQUE2Rzs7Ozs7QUFTL0csTUFBTSxPQUFPLDZCQUE4QixTQUFRLDhCQUFrRjs7Ozs7SUFFbkksWUFBWSxJQUF3RCxFQUFFLFFBQWlDO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUR4SCxTQUFJLEdBQWdCLFdBQVcsQ0FBQztJQUN5RixDQUFDOzs7WUFIcEksU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFFOzs7O1lBbEk3QixXQUFXO1lBTStCLHVCQUF1Qjs7OztJQThIbkYsNkNBQXlDOzs7Ozs7Ozs7Ozs7OztBQWlCM0MsTUFBTSxPQUFPLDBCQUEyQixTQUFRLDhCQUErRTs7Ozs7SUFFN0gsWUFBWSxJQUF3RCxFQUFFLFFBQWlDO1FBQUksS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztRQUR4SCxTQUFJLEdBQWEsUUFBUSxDQUFDO0lBQytGLENBQUM7OztZQUhwSSxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7Ozs7WUFwSjFCLFdBQVc7WUFNK0IsdUJBQXVCOzs7O0lBZ0puRiwwQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcblxuaW1wb3J0IHsgRGlyZWN0aXZlLCBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkRlc3Ryb3ksIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgSW5qZWN0b3IsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vY2VsbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFNpbmdsZVJlZ2lzdHJ5TWFwLCBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAsIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTxULCBUS2luZCBleHRlbmRzIGtleW9mIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXA+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBhYnN0cmFjdCByZWFkb25seSBraW5kOiBUS2luZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdFJlZjogVGVtcGxhdGVSZWY8VD4sIHByb3RlY3RlZCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkuc2V0U2luZ2xlKHRoaXMua2luZCwgdGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUodGhpcy5raW5kLCAgdW5kZWZpbmVkKTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8VCwgVEtpbmQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBhYnN0cmFjdCByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGtpbmQ6IFRLaW5kO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0UmVmOiBUZW1wbGF0ZVJlZjxUPiwgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5hZGRNdWx0aSh0aGlzLmtpbmQsIHRoaXMgYXMgYW55KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0cnkucmVtb3ZlTXVsdGkodGhpcy5raW5kLCB0aGlzIGFzIGFueSk7XG4gIH1cbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxULCBUS2luZCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4ge1xuICBhYnN0cmFjdCByZWFkb25seSBuYW1lOiBzdHJpbmc7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGtpbmQ6IFRLaW5kO1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byB0cnVlIHRoZSBjb21wb25lbnQgd2lsbCBiZSBjcmVhdGVkIHdpdGggcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqIFNldHRpbmcgdG8gdHJ1ZSBkb2VzIG5vdCBlbnN1cmUgcHJvamVjdGlvbiwgdGhlIHByb2plY3Rpb24gaXMgZGV0ZXJtaW5lZCBieSB0aGUgY29udGV4dCBjcmVhdGluZyB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgSW4gdGhlIGNvbnRleHQgb2YgYGRhdGFIZWFkZXJFeHRlbnNpb25zYCB0aGUgcHJvamVjdGlvbiB3aWxsIGJlIHRoZSBjb250ZW50IG9mIHRoZSBjZWxsLCBvdGhlciBpbXBsZW1lbnRhdGlvbnNcbiAgICogbWlnaHQgbm90IGluY2x1ZGUgYSBwcm9qZWN0aW9uLlxuICAgKi9cbiAgcmVhZG9ubHkgcHJvamVjdENvbnRlbnQ/OiBib29sZWFuO1xuXG4gIGFic3RyYWN0IGdldEZhY3RvcnkoY29udGV4dDogUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4+KTogQ29tcG9uZW50RmFjdG9yeTxUPjtcbiAgb25DcmVhdGVkPyhjb250ZXh0OiBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4sIGNtcFJlZjogQ29tcG9uZW50UmVmPFQ+KTogdm9pZDtcbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ8VCA9IGFueT4gZXh0ZW5kcyBNZXRhQ2VsbENvbnRleHQ8VCwgUGJsQ29sdW1uPiB7XG4gIHJlYWRvbmx5IGluamVjdG9yOiBJbmplY3RvclxuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHsgc3VwZXIoKTsgfVxuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlRGF0ZUhlYWRlckN0eDxUID0gYW55PihoZWFkZXJDZWxsOiBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8UGJsQ29sdW1uPiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDxUPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDxUPigpO1xuXG4gICAgaW5zdGFuY2UuY29sID0gaGVhZGVyQ2VsbC5jb2x1bW5EZWYuY29sdW1uO1xuICAgIGluc3RhbmNlLmdyaWQgPSBoZWFkZXJDZWxsLmdyaWQ7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGluc3RhbmNlLCAnaW5qZWN0b3InLCB7IHZhbHVlOiBpbmplY3RvciB9KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25SZWY8VCA9IGFueT4ge1xuICBzaG91bGRSZW5kZXI/KGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ8VD4pOiBib29sZWFuO1xufVxuXG5cbi8qKlxuICogQSBnZW5lcmljLCBtdWx0aS1wdXJwb3NlIHRlbXBsYXRlIHJlZmVyZW5jZSBmb3IgZGF0YSBoZWFkZXIgZXh0ZW5zaW9ucy5cbiAqIFRoZSB0ZW1wbGF0ZSdzIGNvbnRleHQgaXMgYFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHRgOlxuICpcbiAqIGBgYHRzXG4gKiBpbnRlcmZhY2UgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB7XG4gKiAgIGNvbDogUGJsTWV0YUNvbHVtbjtcbiAqICAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAqICAgaW5qZWN0b3I6IEluamVjdG9yO1xuICogfVxuICogYGBgXG4gKlxuICogQnkgZGVmYXVsdCBpdCB3aWxsIHJlbmRlciBpZiByZWdpc3RlcmVkIGJ1dCBpdCBpcyBwb3NzaWJsZSB0byBwcm92aWRlIGEgcHJlZGljYXRlIHRvIGNvbmRpdGlvbmFsbHkgbG9hZCBpdC5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2ICpwYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZj1cImxldCBjdHhcIj48L2Rpdj5cbiAqIGBgYGBcbiAqXG4gKiBPciB3aXRoIGEgYHNob3VsZFJlbmRlcmAgcHJlZGljYXRlOlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmPVwic2hvdWxkUmVuZGVyOyBsZXQgY3R4XCI+PC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBBbmQgaW4gdGhlIGNvbXBvbmVudCB0aGUgdGVtcGxhdGUgaXMgZGVmaW5lZCBvbjpcbiAqXG4gKiBgYGB0c1xuICogY2xhc3MgTXlDb21wb25lbnQge1xuICpcbiAqICAgc2hvdWxkUmVuZGVyID0gKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpID0+IHtcbiAqICAgICAvLyBTb21lIGNvZGUgcmV0dXJuaW5nIHRydWUgb3IgZmFsc2VcbiAqICAgfVxuICogfVxuICogYGBgXG4gKlxuICogTm90ZSB0aGF0IHRoZSBgc2hvdWxkUmVuZGVyYCBwcmVkaWNhdGUgaXMgcnVuIG9uY2Ugd2hlbiB0aGUgaGVhZGVyIGluaXRpYWxpemUuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiBpbXBsZW1lbnRzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiB7XG4gIHByaXZhdGUgc3RhdGljIF9pZCA9IDA7XG5cbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gJ2dlbmVyaWNIZWFkZXJFeHRlbnNpb24tJyArIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlLl9pZCsrO1xuICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnID0gJ2RhdGFIZWFkZXJFeHRlbnNpb25zJztcblxuICBASW5wdXQoJ3BibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmJykgc2hvdWxkUmVuZGVyPzogKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dD4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgZGlzcGxheSBlbGVtZW50IGZvciBwYWdpbmF0aW9uXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1twYmxOZ3JpZFBhZ2luYXRvclJlZl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfSwgJ3BhZ2luYXRvcic+IHtcbiAgcmVhZG9ubHkga2luZDogJ3BhZ2luYXRvcicgPSAncGFnaW5hdG9yJztcbiAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8eyAkaW1wbGljaXQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4gfT4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cblxuLyoqXG4gKiBNYXJrcyB0aGUgZWxlbWVudCBhcyB0aGUgZGlzcGxheSBlbGVtZW50IHdoZW4gZ3JpZCBoYXMgbm8gZGF0YS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogICA8cGJsLW5ncmlkPlxuICogICAgIDxkaXYgKnBibE5ncmlkTm9EYXRhUmVmIHN0eWxlPVwiaGVpZ2h0OiAxMDAlOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclwiPlxuICogICAgICAgPHNwYW4+Tm8gRGF0YTwvc3Bhbj5cbiAqICAgICA8L2Rpdj5cbiAqICAgPC9wYmwtbmdyaWQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkTm9EYXRhUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAnbm9EYXRhJz4ge1xuICByZWFkb25seSBraW5kOiAnbm9EYXRhJyA9ICdub0RhdGEnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19