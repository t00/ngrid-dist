/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:use-host-property-decorator
import { Directive, TemplateRef, Input } from '@angular/core';
import { MetaCellContext } from '../context/index';
import { PblNgridRegistryService } from '../services/table-registry.service';
/**
 * @abstract
 * @template T, TKind
 */
var /**
 * @abstract
 * @template T, TKind
 */
PblNgridSingleTemplateRegistry = /** @class */ (function () {
    function PblNgridSingleTemplateRegistry(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    PblNgridSingleTemplateRegistry.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.registry.setSingle(this.kind, (/** @type {?} */ (this)));
    };
    /**
     * @return {?}
     */
    PblNgridSingleTemplateRegistry.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.registry.setSingle(this.kind, undefined);
    };
    return PblNgridSingleTemplateRegistry;
}());
/**
 * @abstract
 * @template T, TKind
 */
export { PblNgridSingleTemplateRegistry };
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
var /**
 * @abstract
 * @template T, TKind
 */
PblNgridMultiTemplateRegistry = /** @class */ (function () {
    function PblNgridMultiTemplateRegistry(tRef, registry) {
        this.tRef = tRef;
        this.registry = registry;
    }
    /**
     * @return {?}
     */
    PblNgridMultiTemplateRegistry.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.registry.addMulti(this.kind, (/** @type {?} */ (this)));
    };
    /**
     * @return {?}
     */
    PblNgridMultiTemplateRegistry.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.registry.removeMulti(this.kind, (/** @type {?} */ (this)));
    };
    return PblNgridMultiTemplateRegistry;
}());
/**
 * @abstract
 * @template T, TKind
 */
export { PblNgridMultiTemplateRegistry };
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
var /**
 * @abstract
 * @template T, TKind
 */
PblNgridMultiComponentRegistry = /** @class */ (function () {
    function PblNgridMultiComponentRegistry() {
    }
    return PblNgridMultiComponentRegistry;
}());
/**
 * @abstract
 * @template T, TKind
 */
export { PblNgridMultiComponentRegistry };
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
var /**
 * @template T
 */
PblNgridDataHeaderExtensionContext = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridDataHeaderExtensionContext, _super);
    function PblNgridDataHeaderExtensionContext() {
        return _super.call(this) || this;
    }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
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
    PblNgridDataHeaderExtensionContext.createDateHeaderCtx = 
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
    function (headerCell, injector) {
        /** @type {?} */
        var instance = new PblNgridDataHeaderExtensionContext();
        instance.col = headerCell.columnDef.column;
        instance.table = headerCell.table;
        Object.defineProperty(instance, 'injector', { value: injector });
        return instance;
    };
    return PblNgridDataHeaderExtensionContext;
}(MetaCellContext));
/**
 * @template T
 */
export { PblNgridDataHeaderExtensionContext };
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
var PblNgridHeaderExtensionRefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridHeaderExtensionRefDirective, _super);
    function PblNgridHeaderExtensionRefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.name = 'genericHeaderExtension-' + PblNgridHeaderExtensionRefDirective._id++;
        _this.kind = 'dataHeaderExtensions';
        return _this;
    }
    PblNgridHeaderExtensionRefDirective._id = 0;
    PblNgridHeaderExtensionRefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridHeaderExtensionRef]' },] }
    ];
    /** @nocollapse */
    PblNgridHeaderExtensionRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    PblNgridHeaderExtensionRefDirective.propDecorators = {
        shouldRender: [{ type: Input, args: ['pblNgridHeaderExtensionRef',] }]
    };
    return PblNgridHeaderExtensionRefDirective;
}(PblNgridMultiTemplateRegistry));
export { PblNgridHeaderExtensionRefDirective };
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
var PblNgridPaginatorRefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridPaginatorRefDirective, _super);
    function PblNgridPaginatorRefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'paginator';
        return _this;
    }
    PblNgridPaginatorRefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridPaginatorRef]' },] }
    ];
    /** @nocollapse */
    PblNgridPaginatorRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridPaginatorRefDirective;
}(PblNgridSingleTemplateRegistry));
export { PblNgridPaginatorRefDirective };
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
var PblNgridNoDataRefDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridNoDataRefDirective, _super);
    function PblNgridNoDataRefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'noData';
        return _this;
    }
    PblNgridNoDataRefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridNoDataRef]' },] }
    ];
    /** @nocollapse */
    PblNgridNoDataRefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridNoDataRefDirective;
}(PblNgridSingleTemplateRegistry));
export { PblNgridNoDataRefDirective };
if (false) {
    /** @type {?} */
    PblNgridNoDataRefDirective.prototype.kind;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9yZWdpc3RyeS5kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUErRCxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJM0gsT0FBTyxFQUFFLGVBQWUsRUFBMkIsTUFBTSxrQkFBa0IsQ0FBQztBQUU1RSxPQUFPLEVBQXVELHVCQUF1QixFQUFFLE1BQU0sb0NBQW9DLENBQUM7Ozs7O0FBRWxJOzs7OztJQUdFLHdDQUFtQixJQUFvQixFQUFZLFFBQWlDO1FBQWpFLFNBQUksR0FBSixJQUFJLENBQWdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBeUI7SUFBSSxDQUFDOzs7O0lBRXpGLGlEQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztJQUNsRCxDQUFDOzs7O0lBRUQsb0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRyxTQUFTLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0gscUNBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQzs7Ozs7Ozs7SUFYQyw4Q0FBOEI7O0lBRWxCLDhDQUEyQjs7Ozs7SUFBRSxrREFBMkM7Ozs7OztBQVd0Rjs7Ozs7SUFJRSx1Q0FBbUIsSUFBb0IsRUFBWSxRQUFpQztRQUFqRSxTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUFZLGFBQVEsR0FBUixRQUFRLENBQXlCO0lBQUksQ0FBQzs7OztJQUV6RixnREFBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxF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LFNBQUMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7Ozs7Z0JBcEoxQixXQUFXO2dCQU0rQix1QkFBdUI7O0lBa0pyRixpQ0FBQztDQUFBLEFBSkQsQ0FDZ0QsOEJBQThCLEdBRzdFO1NBSFksMEJBQTBCOzs7SUFDckMsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIE9uSW5pdCwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5LCBDb21wb25lbnRSZWYsIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQgfSBmcm9tICcuL2NlbGwnO1xuaW1wb3J0IHsgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwLCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRTaW5nbGVUZW1wbGF0ZVJlZ2lzdHJ5PFQsIFRLaW5kIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IGtpbmQ6IFRLaW5kO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0UmVmOiBUZW1wbGF0ZVJlZjxUPiwgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5zZXRTaW5nbGUodGhpcy5raW5kLCB0aGlzIGFzIGFueSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LnNldFNpbmdsZSh0aGlzLmtpbmQsICB1bmRlZmluZWQpO1xuICB9XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxULCBUS2luZCBleHRlbmRzIGtleW9mIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcD4gaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgYWJzdHJhY3QgcmVhZG9ubHkga2luZDogVEtpbmQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRSZWY6IFRlbXBsYXRlUmVmPFQ+LCBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJlZ2lzdHJ5LmFkZE11bHRpKHRoaXMua2luZCwgdGhpcyBhcyBhbnkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RyeS5yZW1vdmVNdWx0aSh0aGlzLmtpbmQsIHRoaXMgYXMgYW55KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGJsTmdyaWRNdWx0aUNvbXBvbmVudFJlZ2lzdHJ5PFQsIFRLaW5kIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPiB7XG4gIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcbiAgYWJzdHJhY3QgcmVhZG9ubHkga2luZDogVEtpbmQ7XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0IHRvIHRydWUgdGhlIGNvbXBvbmVudCB3aWxsIGJlIGNyZWF0ZWQgd2l0aCBwcm9qZWN0ZWQgY29udGVudC5cbiAgICogU2V0dGluZyB0byB0cnVlIGRvZXMgbm90IGVuc3VyZSBwcm9qZWN0aW9uLCB0aGUgcHJvamVjdGlvbiBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBjb250ZXh0IGNyZWF0aW5nIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBJbiB0aGUgY29udGV4dCBvZiBgZGF0YUhlYWRlckV4dGVuc2lvbnNgIHRoZSBwcm9qZWN0aW9uIHdpbGwgYmUgdGhlIGNvbnRlbnQgb2YgdGhlIGNlbGwsIG90aGVyIGltcGxlbWVudGF0aW9uc1xuICAgKiBtaWdodCBub3QgaW5jbHVkZSBhIHByb2plY3Rpb24uXG4gICAqL1xuICByZWFkb25seSBwcm9qZWN0Q29udGVudD86IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgZ2V0RmFjdG9yeShjb250ZXh0OiBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4pOiBDb21wb25lbnRGYWN0b3J5PFQ+O1xuICBvbkNyZWF0ZWQ/KGNvbnRleHQ6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPiwgY21wUmVmOiBDb21wb25lbnRSZWY8VD4pOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDxUID0gYW55PiBleHRlbmRzIE1ldGFDZWxsQ29udGV4dDxULCBQYmxDb2x1bW4+IHtcbiAgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yXG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpOyB9XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGVEYXRlSGVhZGVyQ3R4PFQgPSBhbnk+KGhlYWRlckNlbGw6IFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxQYmxDb2x1bW4+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+KCk7XG5cbiAgICBpbnN0YW5jZS5jb2wgPSBoZWFkZXJDZWxsLmNvbHVtbkRlZi5jb2x1bW47XG4gICAgaW5zdGFuY2UudGFibGUgPSBoZWFkZXJDZWxsLnRhYmxlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpbnN0YW5jZSwgJ2luamVjdG9yJywgeyB2YWx1ZTogaW5qZWN0b3IgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmPFQgPSBhbnk+IHtcbiAgc2hvdWxkUmVuZGVyPyhjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQ+KTogYm9vbGVhbjtcbn1cblxuXG4vKipcbiAqIEEgZ2VuZXJpYywgbXVsdGktcHVycG9zZSB0ZW1wbGF0ZSByZWZlcmVuY2UgZm9yIGRhdGEgaGVhZGVyIGV4dGVuc2lvbnMuXG4gKiBUaGUgdGVtcGxhdGUncyBjb250ZXh0IGlzIGBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0YDpcbiAqXG4gKiBgYGB0c1xuICogaW50ZXJmYWNlIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQge1xuICogICBjb2w6IFBibE1ldGFDb2x1bW47XG4gKiAgIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICogICBpbmplY3RvcjogSW5qZWN0b3I7XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0IGl0IHdpbGwgcmVuZGVyIGlmIHJlZ2lzdGVyZWQgYnV0IGl0IGlzIHBvc3NpYmxlIHRvIHByb3ZpZGUgYSBwcmVkaWNhdGUgdG8gY29uZGl0aW9uYWxseSBsb2FkIGl0LlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmPVwibGV0IGN0eFwiPjwvZGl2PlxuICogYGBgYFxuICpcbiAqIE9yIHdpdGggYSBgc2hvdWxkUmVuZGVyYCBwcmVkaWNhdGU6XG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqcGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWY9XCJzaG91bGRSZW5kZXI7IGxldCBjdHhcIj48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEFuZCBpbiB0aGUgY29tcG9uZW50IHRoZSB0ZW1wbGF0ZSBpcyBkZWZpbmVkIG9uOlxuICpcbiAqIGBgYHRzXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKlxuICogICBzaG91bGRSZW5kZXIgPSAoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCkgPT4ge1xuICogICAgIC8vIFNvbWUgY29kZSByZXR1cm5pbmcgdHJ1ZSBvciBmYWxzZVxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBOb3RlIHRoYXQgdGhlIGBzaG91bGRSZW5kZXJgIHByZWRpY2F0ZSBpcyBydW4gb25jZSB3aGVuIHRoZSBoZWFkZXIgaW5pdGlhbGl6ZS5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsICdkYXRhSGVhZGVyRXh0ZW5zaW9ucyc+IGltcGxlbWVudHMgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uUmVmIHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2lkID0gMDtcblxuICByZWFkb25seSBuYW1lOiBzdHJpbmcgPSAnZ2VuZXJpY0hlYWRlckV4dGVuc2lvbi0nICsgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUuX2lkKys7XG4gIHJlYWRvbmx5IGtpbmQ6ICdkYXRhSGVhZGVyRXh0ZW5zaW9ucycgPSAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xuXG4gIEBJbnB1dCgncGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWYnKSBzaG91bGRSZW5kZXI/OiAoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCkgPT4gYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgZm9yIHBhZ2luYXRpb25cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkUGFnaW5hdG9yUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAncGFnaW5hdG9yJz4ge1xuICByZWFkb25seSBraW5kOiAncGFnaW5hdG9yJyA9ICdwYWdpbmF0b3InO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuXG4vKipcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgd2hlbiB0YWJsZSBoYXMgbm8gZGF0YS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogICA8cGJsLW5ncmlkPlxuICogICAgIDxkaXYgKnBibE5ncmlkTm9EYXRhUmVmIHN0eWxlPVwiaGVpZ2h0OiAxMDAlOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclwiPlxuICogICAgICAgPHNwYW4+Tm8gRGF0YTwvc3Bhbj5cbiAqICAgICA8L2Rpdj5cbiAqICAgPC9wYmwtbmdyaWQ+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3BibE5ncmlkTm9EYXRhUmVmXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9LCAnbm9EYXRhJz4ge1xuICByZWFkb25seSBraW5kOiAnbm9EYXRhJyA9ICdub0RhdGEnO1xuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7ICRpbXBsaWNpdDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB9PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKSB7IHN1cGVyKHRSZWYsIHJlZ2lzdHJ5KTsgfVxufVxuIl19