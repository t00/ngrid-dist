/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngrid.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { Inject, InjectionToken, Injector, Optional, NgModule, NgModuleRef, Self, } from '@angular/core';
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
        { provide: COMMON_TABLE_TEMPLATE_INIT, multi: true, useValue: components },
    ];
}
var PblNgridModule = /** @class */ (function () {
    function PblNgridModule(ngRef, registry, components) {
        var e_1, _a, e_2, _b;
        // TODO: Remove this once issue fixed: https://github.com/angular/angular/issues/35580
        try {
            if (ngRef.componentFactoryResolver) {
                registry.getRoot(); // this line will keep the try/catch block in place when doing minification
            }
        }
        catch (err) {
            /** @type {?} */
            var parent_1 = ((/** @type {?} */ (ngRef)))._parent;
            ((/** @type {?} */ (ngRef)))._r3Injector = parent_1;
        }
        if (components) {
            try {
                for (var components_1 = __values(components), components_1_1 = components_1.next(); !components_1_1.done; components_1_1 = components_1.next()) {
                    var multi = components_1_1.value;
                    try {
                        for (var multi_1 = (e_2 = void 0, __values(multi)), multi_1_1 = multi_1.next(); !multi_1_1.done; multi_1_1 = multi_1.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUVMLE1BQU0sRUFDTixjQUFjLEVBQ2QsUUFBUSxFQUVSLFFBQVEsRUFDUixRQUFRLEVBQ1IsV0FBVyxFQUVYLElBQUksR0FDTCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUVqQixvQkFBb0IsRUFDcEIsaUNBQWlDLEVBQUUsbUJBQW1CLEVBQ3RELGlCQUFpQixFQUNqQiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUFFLDhCQUE4QixFQUN4RCwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUUzQixtQkFBbUIsRUFDbkIsNkJBQTZCLEVBQzdCLG1DQUFtQyxFQUNuQywwQkFBMEIsRUFDMUIsNkJBQTZCLEVBRTdCLHFCQUFxQixFQUNyQixvQ0FBb0MsRUFBRSw0QkFBNEIsRUFBRSxpQkFBaUIsRUFFckYsa0NBQWtDLEVBRWxDLHFCQUFxQixHQUN0QixNQUFNLGNBQWMsQ0FBQzs7QUFFdEIsTUFBTSxLQUFPLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFDLDRCQUE0QixDQUFDOzs7O0FBRTFGLHdDQU9DOzs7SUFOQyx1Q0FBcUI7Ozs7OztJQUtyQixrQ0FBZTs7Ozs7O0FBR2pCLE1B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RixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osZUFBZSxFQUFFLGtCQUFrQjt3QkFDbkMsY0FBYztxQkFDZjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osaUNBQWlDLEVBQUUsbUJBQW1CO3dCQUN0RCxvQkFBb0I7d0JBQ3BCLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0IsbUNBQW1DO3dCQUNuQywwQkFBMEI7d0JBQzFCLDZCQUE2Qjt3QkFDN0IsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLHdCQUF3QixFQUFFLDhCQUE4Qjt3QkFDeEQsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLDJCQUEyQjt3QkFFM0IscUJBQXFCO3dCQUNyQixvQ0FBb0MsRUFBRSw0QkFBNEIsRUFBRSxpQkFBaUI7d0JBRXJGLGtDQUFrQzt3QkFFbEMsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1Asb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLDZCQUE2Qjt3QkFDN0IsbUNBQW1DO3dCQUNuQywwQkFBMEI7d0JBQzFCLDZCQUE2Qjt3QkFDN0IsOEJBQThCO3dCQUM5Qiw4QkFBOEI7d0JBQzlCLHdCQUF3QixFQUFFLDhCQUE4QixFQUFFLGlCQUFpQjt3QkFDM0UsMkJBQTJCO3dCQUMzQixxQkFBcUI7d0JBQ3JCLDJCQUEyQjt3QkFFM0IscUJBQXFCO3dCQUNyQiw0QkFBNEI7d0JBRTVCLGtDQUFrQzt3QkFFbEMsaUJBQWlCO3FCQUNsQjtpQkFDRjs7OztnQkE1R0MsV0FBVztnQkFZWCx1QkFBdUI7NENBcUdWLE1BQU0sU0FBQywwQkFBMEIsY0FBRyxRQUFRLFlBQUksSUFBSTs7SUF3RW5FLHFCQUFDO0NBQUEsQUFoSUQsSUFnSUM7U0E1RVksY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudFJlZixcbiAgSW5qZWN0LFxuICBJbmplY3Rpb25Ub2tlbixcbiAgSW5qZWN0b3IsXG4gIFR5cGUsXG4gIE9wdGlvbmFsLFxuICBOZ01vZHVsZSxcbiAgTmdNb2R1bGVSZWYsXG4gIE1vZHVsZVdpdGhQcm92aWRlcnMsXG4gIFNlbGYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIGFzIFNjcm9sbGluZ01vZHVsZUV4cCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2Nyb2xsaW5nJztcbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQ2RrVGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQge1xuICBQRUJfTkdSSURfQ09ORklHLCBQYmxOZ3JpZENvbmZpZyxcbiAgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gIFBibENka1RhYmxlQ29tcG9uZW50LFxuICBQYmxOZ3JpZENvbXBvbmVudCxcblxuICBQYmxOZ3JpZFJvd0NvbXBvbmVudCxcbiAgUGJsTmdyaWRNZXRhUm93Q29udGFpbmVyQ29tcG9uZW50LCBQYmxNZXRhUm93RGlyZWN0aXZlLFxuICBQYmxOZ3JpZENvbHVtbkRlZixcbiAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQsXG4gIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlLFxuXG4gIFBibE5ncmlkQ2VsbFN0eWxpbmcsXG4gIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlLFxuXG4gIFBibENvbHVtblNpemVPYnNlcnZlcixcbiAgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50LCBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLCBQYmxOZ3JpZFNjcm9sbGluZyxcblxuICBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlLFxuXG4gIFBibE5ncmlkQ29uZmlnU2VydmljZSxcbn0gZnJvbSAnLi9ncmlkL2luZGV4JztcblxuZXhwb3J0IGNvbnN0IENPTU1PTl9UQUJMRV9URU1QTEFURV9JTklUID0gbmV3IEluamVjdGlvblRva2VuKCdDT01NT04gVEFCTEUgVEVNUExBVEUgSU5JVCcpO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbW1vblRlbXBsYXRlSW5pdCB7XG4gIGNvbXBvbmVudDogVHlwZTxhbnk+O1xuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwgdXNlIHRoZSByb290IHJlZ2lzdHJ5IHNlcnZpY2UgKGZvciB0ZW1wbGF0ZXMpLlxuICAgKiBPdGhlcndpc2UsIHVzZXMgdGhlIHByb3ZpZGVkIHJlZ2lzdHJ5IGZyb20gdGhlIGRlcGVuZGVuY3kgdHJlZS5cbiAgICovXG4gIHJvb3Q/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUNvbW1vbihjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXSk6IGFueSB7XG4gIHJldHVybiBbXG4gICAgeyBwcm92aWRlOiBDT01NT05fVEFCTEVfVEVNUExBVEVfSU5JVCwgbXVsdGk6IHRydWUsIHVzZVZhbHVlOiBjb21wb25lbnRzIH0sXG4gIF07XG59XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgU2Nyb2xsaW5nTW9kdWxlLCBTY3JvbGxpbmdNb2R1bGVFeHAsXG4gICAgQ2RrVGFibGVNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCwgUGJsTWV0YVJvd0RpcmVjdGl2ZSxcbiAgICBQYmxDZGtUYWJsZUNvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENvbHVtbkRlZixcbiAgICBQYmxOZ3JpZFJvd0NvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICAgIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gICAgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50LCBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLCBQYmxOZ3JpZFNjcm9sbGluZyxcblxuICAgIFBibE5ncmlkQ2VsbEVkaXRBdXRvRm9jdXNEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFBibE5ncmlkUm93Q29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbFN0eWxpbmcsXG4gICAgUGJsTmdyaWRPdXRlclNlY3Rpb25EaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbERpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gICAgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSxcblxuICAgIFBibE5ncmlkQ2VsbEVkaXRBdXRvRm9jdXNEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNb2R1bGUge1xuXG4gIGNvbnN0cnVjdG9yKG5nUmVmOiBOZ01vZHVsZVJlZjxhbnk+LFxuICAgICAgICAgICAgICByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQpIEBPcHRpb25hbCgpIEBTZWxmKCkgY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W11bXSkge1xuXG4gICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgb25jZSBpc3N1ZSBmaXhlZDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMzU1ODBcbiAgICB0cnkge1xuICAgICAgaWYgKG5nUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcikge1xuICAgICAgICByZWdpc3RyeS5nZXRSb290KCk7IC8vIHRoaXMgbGluZSB3aWxsIGtlZXAgdGhlIHRyeS9jYXRjaCBibG9jayBpbiBwbGFjZSB3aGVuIGRvaW5nIG1pbmlmaWNhdGlvblxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc3QgcGFyZW50ID0gKG5nUmVmIGFzIGFueSkuX3BhcmVudDtcbiAgICAgIChuZ1JlZiBhcyBhbnkpLl9yM0luamVjdG9yID0gcGFyZW50O1xuICAgIH1cblxuICAgIGlmIChjb21wb25lbnRzKSB7XG4gICAgICBmb3IgKGNvbnN0IG11bHRpIG9mIGNvbXBvbmVudHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIG11bHRpKSB7XG4gICAgICAgICAgaWYgKGMucm9vdCkge1xuICAgICAgICAgICAgcmVnaXN0cnkgPSByZWdpc3RyeS5nZXRSb290KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFBibE5ncmlkTW9kdWxlLmxvYWRDb21tb25UZW1wbGF0ZXMobmdSZWYsIGMuY29tcG9uZW50LCB7IHJlZ2lzdHJ5LCBkZXN0cm95OiB0cnVlIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBQYmxOZ3JpZENvbmZpZywgY29tcG9uZW50czogQ29tbW9uVGVtcGxhdGVJbml0W10pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFBibE5ncmlkTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQYmxOZ3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFBFQl9OR1JJRF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHMpLFxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgd2l0aENvbW1vbihjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8UGJsTmdyaWRNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFBibE5ncmlkTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHMpLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgbG9hZENvbW1vblRlbXBsYXRlczxUPihuZ1JlZjogTmdNb2R1bGVSZWY8YW55PixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBUeXBlPFQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zPzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFdoZW4gc2V0IHdpbGwgdXNlIGl0IGFzIGZpcnN0IHJlZ2lzdHJ5IGluIHRoZSBESSB0cmVlICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdpc3RyeT86IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFdoZW4gc2V0IHdpbGwgZGVzdHJveSB0aGUgY29tcG9uZW50IHdoZW4gdGhlIG1vZHVsZSBpcyBkZXN0cm95ZWQuICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0cm95PzogYm9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgbGV0IHsgaW5qZWN0b3IgfSA9IG5nUmVmO1xuICAgIGNvbnN0IHsgcmVnaXN0cnksIGRlc3Ryb3kgfSA9IG9wdGlvbnMgfHwgKHt9IGFzIGFueSk7XG5cbiAgICBpZiAocmVnaXN0cnkpIHtcbiAgICAgIGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBbIHsgcHJvdmlkZTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIHVzZVZhbHVlOiByZWdpc3RyeS5nZXRSb290KCkgfSBdLFxuICAgICAgICBwYXJlbnQ6IG5nUmVmLmluamVjdG9yXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSBuZ1JlZi5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50KS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKGRlc3Ryb3kpIHtcbiAgICAgIG5nUmVmLm9uRGVzdHJveSggKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNtcFJlZi5kZXN0cm95KCk7XG4gICAgICAgIH0gY2F0Y2goIGVycikge31cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBjbXBSZWY7XG4gIH1cbn1cbiJdfQ==