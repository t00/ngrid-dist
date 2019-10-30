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
import { PEB_NGRID_CONFIG, PblNgridRegistryService, PblCdkTableComponent, PblNgridComponent, PblNgridRowComponent, PblNgridMetaRowContainerComponent, PblMetaRowDirective, PblNgridColumnDef, PblNgridHeaderCellDefDirective, PblNgridFooterCellDefDirective, PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridHeaderCellComponent, PblNgridCellDirective, PblNgridFooterCellDirective, PblNgridCellStyling, PblNgridOuterSectionDirective, PblNgridHeaderExtensionRefDirective, PblNgridNoDataRefDirective, PblNgridPaginatorRefDirective, PblColumnSizeObserver, PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling, PblNgridCellEditAutoFocusDirective, PblNgridConfigService, } from './table/index';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsNEJBQTRCLEVBQWdCLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFRLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUF1QixJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0ssT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxlQUFlLElBQUksa0JBQWtCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLG9CQUFvQixFQUNwQixpQkFBaUIsRUFFakIsb0JBQW9CLEVBQ3BCLGlDQUFpQyxFQUFFLG1CQUFtQixFQUN0RCxpQkFBaUIsRUFDakIsOEJBQThCLEVBQzlCLDhCQUE4QixFQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEIsRUFDeEQsMkJBQTJCLEVBQzNCLHFCQUFxQixFQUNyQiwyQkFBMkIsRUFFM0IsbUJBQW1CLEVBQ25CLDZCQUE2QixFQUM3QixtQ0FBbUMsRUFDbkMsMEJBQTBCLEVBQzFCLDZCQUE2QixFQUU3QixxQkFBcUIsRUFDckIsb0NBQW9DLEVBQUUsNEJBQTRCLEVBQUUsaUJBQWlCLEVBRXJGLGtDQUFrQyxFQUVsQyxxQkFBcUIsR0FDdEIsTUFBTSxlQUFlLENBQUM7O0FBRXZCLE1BQU0sS0FBTywwQkFBMEIsR0FBRyxJQUFJLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBQzs7OztBQUUxRix3Q0FPQzs7O0lBTkMsdUNBQXFCOzs7Ozs7SUFLckIsa0NBQWU7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QkFDcEIsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiw2QkFBNkI7d0JBQzdCLDhCQUE4Qjt3QkFDOUIsOEJBQThCO3dCQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEI7d0JBQ3hELDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBRTNCLHFCQUFxQjt3QkFDckIsb0NBQW9DLEVBQUUsNEJBQTRCLEVBQUUsaUJBQWlCO3dCQUVyRixrQ0FBa0M7d0JBRWxDLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3dCQUNuQiw2QkFBNkI7d0JBQzdCLG1DQUFtQzt3QkFDbkMsMEJBQTBCO3dCQUMxQiw2QkFBNkI7d0JBQzdCLDhCQUE4Qjt3QkFDOUIsOEJBQThCO3dCQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUI7d0JBQzNFLDJCQUEyQjt3QkFDM0IscUJBQXFCO3dCQUNyQiwyQkFBMkI7d0JBRTNCLHFCQUFxQjt3QkFDckIsNEJBQTRCO3dCQUU1QixrQ0FBa0M7d0JBRWxDLGlCQUFpQjtxQkFDbEI7aUJBQ0Y7Ozs7Z0JBMUdnSCxXQUFXO2dCQVMxSCx1QkFBdUI7NENBc0dWLE1BQU0sU0FBQywwQkFBMEIsY0FBRyxRQUFRLFlBQUksSUFBSTs7SUE4RG5FLHFCQUFDO0NBQUEsQUF0SEQsSUFzSEM7U0FsRVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIENvbXBvbmVudFJlZiwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIFR5cGUsIE9wdGlvbmFsLCBOZ01vZHVsZSwgTmdNb2R1bGVSZWYsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSBhcyBTY3JvbGxpbmdNb2R1bGVFeHAgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHtcbiAgUEVCX05HUklEX0NPTkZJRywgUGJsTmdyaWRDb25maWcsXG4gIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICBQYmxDZGtUYWJsZUNvbXBvbmVudCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG5cbiAgUGJsTmdyaWRSb3dDb21wb25lbnQsXG4gIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCwgUGJsTWV0YVJvd0RpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDb2x1bW5EZWYsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcblxuICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCwgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG5cbiAgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG59IGZyb20gJy4vdGFibGUvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NPTU1PTiBUQUJMRSBURU1QTEFURSBJTklUJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbW9uVGVtcGxhdGVJbml0IHtcbiAgY29tcG9uZW50OiBUeXBlPGFueT47XG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCB1c2UgdGhlIHJvb3QgcmVnaXN0cnkgc2VydmljZSAoZm9yIHRlbXBsYXRlcykuXG4gICAqIE90aGVyd2lzZSwgdXNlcyB0aGUgcHJvdmlkZWQgcmVnaXN0cnkgZnJvbSB0aGUgZGVwZW5kZW5jeSB0cmVlLlxuICAgKi9cbiAgcm9vdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogYW55IHtcbiAgcmV0dXJuIFtcbiAgICB7IHByb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogY29tcG9uZW50cyB9LFxuICAgIHsgcHJvdmlkZTogQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogY29tcG9uZW50cyB9LFxuICBdO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZSwgU2Nyb2xsaW5nTW9kdWxlRXhwLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQsIFBibE1ldGFSb3dEaXJlY3RpdmUsXG4gICAgUGJsQ2RrVGFibGVDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDb2x1bW5EZWYsXG4gICAgUGJsTmdyaWRSb3dDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsU3R5bGluZyxcbiAgICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlLFxuXG4gICAgUGJsQ29sdW1uU2l6ZU9ic2VydmVyLFxuICAgIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCwgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG5cbiAgICBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZFJvd0NvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICAgIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkU2Nyb2xsaW5nLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlLFxuXG4gICAgUGJsQ29sdW1uU2l6ZU9ic2VydmVyLFxuICAgIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTW9kdWxlIHtcblxuICBjb25zdHJ1Y3RvcihuZ1JlZjogTmdNb2R1bGVSZWY8YW55PixcbiAgICAgICAgICAgICAgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBASW5qZWN0KENPTU1PTl9UQUJMRV9URU1QTEFURV9JTklUKSBAT3B0aW9uYWwoKSBAU2VsZigpIGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdW10pIHtcbiAgICBpZiAoY29tcG9uZW50cykge1xuICAgICAgZm9yIChjb25zdCBtdWx0aSBvZiBjb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBtdWx0aSkge1xuICAgICAgICAgIGlmIChjLnJvb3QpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5ID0gcmVnaXN0cnkuZ2V0Um9vdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBQYmxOZ3JpZE1vZHVsZS5sb2FkQ29tbW9uVGVtcGxhdGVzKG5nUmVmLCBjLmNvbXBvbmVudCwgeyByZWdpc3RyeSwgZGVzdHJveTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGJsTmdyaWRDb25maWcsIGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQYmxOZ3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFBFQl9OR1JJRF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHMpLFxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgd2l0aENvbW1vbihjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IHByb3ZpZGVDb21tb24oY29tcG9uZW50cyksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkQ29tbW9uVGVtcGxhdGVzPFQ+KG5nUmVmOiBOZ01vZHVsZVJlZjxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFR5cGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFdoZW4gc2V0IHdpbGwgdXNlIGl0IGFzIGZpcnN0IHJlZ2lzdHJ5IGluIHRoZSBESSB0cmVlICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk/OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogV2hlbiBzZXQgd2lsbCBkZXN0cm95IHRoZSBjb21wb25lbnQgd2hlbiB0aGUgbW9kdWxlIGlzIGRlc3Ryb3llZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0cm95PzogYm9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgbGV0IHsgaW5qZWN0b3IgfSA9IG5nUmVmO1xuICAgIGNvbnN0IHsgcmVnaXN0cnksIGRlc3Ryb3kgfSA9IG9wdGlvbnMgfHwgKHt9IGFzIGFueSk7XG5cbiAgICBpZiAocmVnaXN0cnkpIHtcbiAgICAgIGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBbIHsgcHJvdmlkZTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIHVzZVZhbHVlOiByZWdpc3RyeS5nZXRSb290KCkgfSBdLFxuICAgICAgICBwYXJlbnQ6IG5nUmVmLmluamVjdG9yXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSBuZ1JlZi5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50KS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAoZGVzdHJveSkge1xuICAgICAgbmdSZWYub25EZXN0cm95KCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY21wUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfSBjYXRjaCggZXJyKSB7fVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNtcFJlZjtcbiAgfVxufVxuIl19