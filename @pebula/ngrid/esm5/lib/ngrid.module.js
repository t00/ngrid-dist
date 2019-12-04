/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ANALYZE_FOR_ENTRY_COMPONENTS, Inject, InjectionToken, Injector, Optional, NgModule, NgModuleRef, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule as ScrollingModuleExp } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { PEB_NGRID_CONFIG, PblNgridRegistryService, PblCdkTableComponent, PblNgridComponent, PblNgridRowComponent, PblNgridMetaRowContainerComponent, PblMetaRowDirective, PblNgridColumnDef, PblNgridHeaderCellDefDirective, PblNgridFooterCellDefDirective, PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridHeaderCellComponent, PblNgridCellDirective, PblNgridFooterCellDirective, PblNgridCellStyling, PblNgridOuterSectionDirective, PblNgridHeaderExtensionRefDirective, PblNgridNoDataRefDirective, PblNgridPaginatorRefDirective, PblColumnSizeObserver, PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling, PblNgridCellEditAutoFocusDirective, PblNgridConfigService, } from './grid/index';
/** @type {?} */
export var COMMON_TABLE_TEMPLATE_INIT = new InjectionToken('COMMON TABLE TEMPLATE INIT');
/**
 * @record
 */
export function CommonTemplateInit() { }
if (false) {
    /** @type {?} */
    CommonTemplateInit.prototype.component;
    /**
     * When true will use the root registry service (for templates).
     * Otherwise, uses the provided registry from the dependency tree.
     * @type {?|undefined}
     */
    CommonTemplateInit.prototype.root;
}
/**
 * @param {?} components
 * @return {?}
 */
export function provideCommon(components) {
    return [
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: components },
        { provide: COMMON_TABLE_TEMPLATE_INIT, multi: true, useValue: components },
    ];
}
var PblNgridModule = /** @class */ (function () {
    function PblNgridModule(ngRef, registry, components) {
        var e_1, _a, e_2, _b;
        if (components) {
            try {
                for (var components_1 = tslib_1.__values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                    var multi = components_1_1.value;
                    try {
                        for (var multi_1 = tslib_1.__values(multi), multi_1_1 = multi_1.next(); !multi_1_1.done; multi_1_1 = multi_1.next()) {
                            var c = multi_1_1.value;
                            if (c.root) {
                                registry = registry.getRoot();
                            }
                            PblNgridModule.loadCommonTemplates(ngRef, c.component, { registry: registry, destroy: true });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (multi_1_1 && !multi_1_1.done && (_b = multi_1.return)) _b.call(multi_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (components_1_1 && !components_1_1.done && (_a = components_1.return)) _a.call(components_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    /**
     * @param {?} config
     * @param {?} components
     * @return {?}
     */
    PblNgridModule.forRoot = /**
     * @param {?} config
     * @param {?} components
     * @return {?}
     */
    function (config, components) {
        return {
            ngModule: PblNgridModule,
            providers: [
                { provide: PEB_NGRID_CONFIG, useValue: config },
                PblNgridConfigService,
                provideCommon(components),
            ]
        };
    };
    /**
     * @param {?} components
     * @return {?}
     */
    PblNgridModule.withCommon = /**
     * @param {?} components
     * @return {?}
     */
    function (components) {
        return {
            ngModule: PblNgridModule,
            providers: provideCommon(components),
        };
    };
    /**
     * @template T
     * @param {?} ngRef
     * @param {?} component
     * @param {?=} options
     * @return {?}
     */
    PblNgridModule.loadCommonTemplates = /**
     * @template T
     * @param {?} ngRef
     * @param {?} component
     * @param {?=} options
     * @return {?}
     */
    function (ngRef, component, options) {
        var injector = ngRef.injector;
        var _a = options || ((/** @type {?} */ ({}))), registry = _a.registry, destroy = _a.destroy;
        if (registry) {
            injector = Injector.create({
                providers: [{ provide: PblNgridRegistryService, useValue: registry.getRoot() }],
                parent: ngRef.injector
            });
        }
        /** @type {?} */
        var cmpRef = ngRef.componentFactoryResolver.resolveComponentFactory(component).create(injector);
        cmpRef.changeDetectorRef.detectChanges();
        if (destroy) {
            ngRef.onDestroy((/**
             * @return {?}
             */
            function () {
                try {
                    cmpRef.destroy();
                }
                catch (err) { }
            }));
        }
        return cmpRef;
    };
    PblNgridModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ScrollingModule, ScrollingModuleExp,
                        CdkTableModule,
                    ],
                    declarations: [
                        PblNgridMetaRowContainerComponent, PblMetaRowDirective,
                        PblCdkTableComponent,
                        PblNgridColumnDef,
                        PblNgridRowComponent,
                        PblNgridCellStyling,
                        PblNgridOuterSectionDirective,
                        PblNgridHeaderExtensionRefDirective,
                        PblNgridNoDataRefDirective,
                        PblNgridPaginatorRefDirective,
                        PblNgridHeaderCellDefDirective,
                        PblNgridFooterCellDefDirective,
                        PblNgridCellDefDirective, PblNgridEditorCellDefDirective,
                        PblNgridHeaderCellComponent,
                        PblNgridCellDirective,
                        PblNgridFooterCellDirective,
                        PblColumnSizeObserver,
                        PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling,
                        PblNgridCellEditAutoFocusDirective,
                        PblNgridComponent,
                    ],
                    exports: [
                        PblNgridRowComponent,
                        PblNgridCellStyling,
                        PblNgridOuterSectionDirective,
                        PblNgridHeaderExtensionRefDirective,
                        PblNgridNoDataRefDirective,
                        PblNgridPaginatorRefDirective,
                        PblNgridHeaderCellDefDirective,
                        PblNgridFooterCellDefDirective,
                        PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridScrolling,
                        PblNgridHeaderCellComponent,
                        PblNgridCellDirective,
                        PblNgridFooterCellDirective,
                        PblColumnSizeObserver,
                        PblCdkVirtualScrollDirective,
                        PblNgridCellEditAutoFocusDirective,
                        PblNgridComponent,
                    ],
                },] }
    ];
    /** @nocollapse */
    PblNgridModule.ctorParameters = function () { return [
        { type: NgModuleRef },
        { type: PblNgridRegistryService },
        { type: Array, decorators: [{ type: Inject, args: [COMMON_TABLE_TEMPLATE_INIT,] }, { type: Optional }, { type: Self }] }
    ]; };
    return PblNgridModule;
}());
export { PblNgridModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsNEJBQTRCLEVBQWdCLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFRLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUF1QixJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0ssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLElBQUksa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLG9CQUFvQixFQUNwQixpQkFBaUIsRUFFakIsb0JBQW9CLEVBQ3BCLGlDQUFpQyxFQUFFLG1CQUFtQixFQUN0RCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEIsRUFDeEQsMkJBQTJCLEVBQzNCLHFCQUFxQixFQUNyQiwyQkFBMkIsRUFFM0IsbUJBQW1CLEVBQ25CLDZCQUE2QixFQUM3QixtQ0FBbUMsRUFDbkMsMEJBQTBCLEVBQzFCLDZCQUE2QixFQUU3QixxQkFBcUIsRUFDckIsb0NBQW9DLEVBQUUsNEJBQTRCLEVBQUUsaUJBQWlCLEVBRXJGLGtDQUFrQyxFQUVsQyxxQkFBcUIsR0FDdEIsTUFBTSxjQUFjLENBQUM7O0FBRXRCLE1BQU0sS0FBTywwQkFBMEIsR0FBRyxJQUFJLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQzs7OztBQUUxRix3Q0FPQzs7O0lBTkMsdUNBQXFCOzs7Ozs7SUFLckIsa0NBQWU7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QkFDcEIsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiw2QkFBNkI7d0JBQzdCLDhCQUE4Qjt3QkFDOUIsOEJBQThCO3dCQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEI7d0JBQ3hELDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBRTNCLHFCQUFxQjt3QkFDckIsb0NBQW9DLEVBQUUsNEJBQTRCLEVBQUUsaUJBQWlCO3dCQUVyRixrQ0FBa0M7d0JBRWxDLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiw2QkFBNkI7d0JBQzdCLDhCQUE4Qjt3QkFDOUIsOEJBQThCO3dCQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUI7d0JBQzNFLDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBRTNCLHFCQUFxQjt3QkFDckIsNEJBQTRCO3dCQUU1QixrQ0FBa0M7d0JBRWxDLGlCQUFpQjtxQkFDbEI7aUJBQ0Y7Ozs7Z0JBMUdnSCxXQUFXO2dCQVMxSCx1QkFBdUI7NENBc0dWLE1BQU0sU0FBQywwQkFBMEIsY0FBRyxRQUFRLFlBQUksSUFBSTs7SUE4RG5FLHFCQUFDO0NBQUEsQUF0SEQsSUFzSEM7U0FsRVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIENvbXBvbmVudFJlZiwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIFR5cGUsIE9wdGlvbmFsLCBOZ01vZHVsZSwgTmdNb2R1bGVSZWYsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSBhcyBTY3JvbGxpbmdNb2R1bGVFeHAgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHtcbiAgUEVCX05HUklEX0NPTkZJRywgUGJsTmdyaWRDb25maWcsXG4gIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICBQYmxDZGtUYWJsZUNvbXBvbmVudCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG5cbiAgUGJsTmdyaWRSb3dDb21wb25lbnQsXG4gIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCwgUGJsTWV0YVJvd0RpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDb2x1bW5EZWYsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcblxuICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCwgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG5cbiAgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG59IGZyb20gJy4vZ3JpZC9pbmRleCc7XG5cbmV4cG9ydCBjb25zdCBDT01NT05fVEFCTEVfVEVNUExBVEVfSU5JVCA9IG5ldyBJbmplY3Rpb25Ub2tlbignQ09NTU9OIFRBQkxFIFRFTVBMQVRFIElOSVQnKTtcblxuZXhwb3J0IGludGVyZmFjZSBDb21tb25UZW1wbGF0ZUluaXQge1xuICBjb21wb25lbnQ6IFR5cGU8YW55PjtcbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIHVzZSB0aGUgcm9vdCByZWdpc3RyeSBzZXJ2aWNlIChmb3IgdGVtcGxhdGVzKS5cbiAgICogT3RoZXJ3aXNlLCB1c2VzIHRoZSBwcm92aWRlZCByZWdpc3RyeSBmcm9tIHRoZSBkZXBlbmRlbmN5IHRyZWUuXG4gICAqL1xuICByb290PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVDb21tb24oY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W10pOiBhbnkge1xuICByZXR1cm4gW1xuICAgIHsgcHJvdmlkZTogQU5BTFlaRV9GT1JfRU5UUllfQ09NUE9ORU5UUywgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiBjb21wb25lbnRzIH0sXG4gICAgeyBwcm92aWRlOiBDT01NT05fVEFCTEVfVEVNUExBVEVfSU5JVCwgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiBjb21wb25lbnRzIH0sXG4gIF07XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVFeHAsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCwgUGJsTWV0YVJvd0RpcmVjdGl2ZSxcbiAgICBQYmxDZGtUYWJsZUNvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENvbHVtbkRlZixcbiAgICBQYmxOZ3JpZFJvd0NvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICAgIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gICAgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50LCBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLCBQYmxOZ3JpZFNjcm9sbGluZyxcblxuICAgIFBibE5ncmlkQ2VsbEVkaXRBdXRvRm9jdXNEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBibE5ncmlkUm93Q29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbFN0eWxpbmcsXG4gICAgUGJsTmdyaWRPdXRlclNlY3Rpb25EaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gICAgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSxcblxuICAgIFBibE5ncmlkQ2VsbEVkaXRBdXRvRm9jdXNEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNb2R1bGUge1xuXG4gIGNvbnN0cnVjdG9yKG5nUmVmOiBOZ01vZHVsZVJlZjxhbnk+LFxuICAgICAgICAgICAgICByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQpIEBPcHRpb25hbCgpIEBTZWxmKCkgY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W11bXSkge1xuICAgIGlmIChjb21wb25lbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IG11bHRpIG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIG11bHRpKSB7XG4gICAgICAgICAgaWYgKGMucm9vdCkge1xuICAgICAgICAgICAgcmVnaXN0cnkgPSByZWdpc3RyeS5nZXRSb290KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFBibE5ncmlkTW9kdWxlLmxvYWRDb21tb25UZW1wbGF0ZXMobmdSZWYsIGMuY29tcG9uZW50LCB7IHJlZ2lzdHJ5LCBkZXN0cm95OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYmxOZ3JpZENvbmZpZywgY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFBibE5ncmlkTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogUEVCX05HUklEX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByb3ZpZGVDb21tb24oY29tcG9uZW50cyksXG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyB3aXRoQ29tbW9uKGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQYmxOZ3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogcHJvdmlkZUNvbW1vbihjb21wb25lbnRzKSxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGxvYWRDb21tb25UZW1wbGF0ZXM8VD4obmdSZWY6IE5nTW9kdWxlUmVmPGFueT4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudDogVHlwZTxUPixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz86IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogV2hlbiBzZXQgd2lsbCB1c2UgaXQgYXMgZmlyc3QgcmVnaXN0cnkgaW4gdGhlIERJIHRyZWUgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RyeT86IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKiBXaGVuIHNldCB3aWxsIGRlc3Ryb3kgdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBtb2R1bGUgaXMgZGVzdHJveWVkLiAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3Ryb3k/OiBib29sZWFuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBsZXQgeyBpbmplY3RvciB9ID0gbmdSZWY7XG4gICAgY29uc3QgeyByZWdpc3RyeSwgZGVzdHJveSB9ID0gb3B0aW9ucyB8fCAoe30gYXMgYW55KTtcblxuICAgIGlmIChyZWdpc3RyeSkge1xuICAgICAgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IFsgeyBwcm92aWRlOiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgdXNlVmFsdWU6IHJlZ2lzdHJ5LmdldFJvb3QoKSB9IF0sXG4gICAgICAgIHBhcmVudDogbmdSZWYuaW5qZWN0b3JcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNtcFJlZiA9IG5nUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxUPihjb21wb25lbnQpLmNyZWF0ZShpbmplY3Rvcik7XG4gICAgY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcblxuICAgIGlmIChkZXN0cm95KSB7XG4gICAgICBuZ1JlZi5vbkRlc3Ryb3koICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjbXBSZWYuZGVzdHJveSgpO1xuICAgICAgICB9IGNhdGNoKCBlcnIpIHt9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY21wUmVmO1xuICB9XG59XG4iXX0=