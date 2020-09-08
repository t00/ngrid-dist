/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngrid.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, InjectionToken, Injector, Optional, NgModule, NgModuleRef, Self, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule as ScrollingModuleExp } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { PEB_NGRID_CONFIG, PblNgridRegistryService, PblCdkTableComponent, PblNgridComponent, PblNgridRowComponent, PblNgridMetaRowContainerComponent, PblMetaRowDirective, PblNgridColumnDef, PblNgridHeaderCellDefDirective, PblNgridFooterCellDefDirective, PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridHeaderCellComponent, PblNgridCellDirective, PblNgridFooterCellDirective, PblNgridCellStyling, PblNgridOuterSectionDirective, PblNgridHeaderExtensionRefDirective, PblNgridNoDataRefDirective, PblNgridPaginatorRefDirective, PblColumnSizeObserver, PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling, PblNgridCellEditAutoFocusDirective, PblNgridConfigService, } from './grid/index';
/** @type {?} */
export const COMMON_TABLE_TEMPLATE_INIT = new InjectionToken('COMMON TABLE TEMPLATE INIT');
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
export class PblNgridModule {
    /**
     * @param {?} ngRef
     * @param {?} registry
     * @param {?} components
     */
    constructor(ngRef, registry, components) {
        // TODO: Remove this once issue fixed: https://github.com/angular/angular/issues/35580
        try {
            if (ngRef.componentFactoryResolver) {
                registry.getRoot(); // this line will keep the try/catch block in place when doing minification
            }
        }
        catch (err) {
            /** @type {?} */
            const parent = ((/** @type {?} */ (ngRef)))._parent;
            ((/** @type {?} */ (ngRef)))._r3Injector = parent;
        }
        if (components) {
            for (const multi of components) {
                for (const c of multi) {
                    if (c.root) {
                        registry = registry.getRoot();
                    }
                    PblNgridModule.loadCommonTemplates(ngRef, c.component, { registry, destroy: true });
                }
            }
        }
    }
    /**
     * @param {?} config
     * @param {?} components
     * @return {?}
     */
    static forRoot(config, components) {
        return {
            ngModule: PblNgridModule,
            providers: [
                { provide: PEB_NGRID_CONFIG, useValue: config },
                PblNgridConfigService,
                provideCommon(components),
            ]
        };
    }
    /**
     * @param {?} components
     * @return {?}
     */
    static withCommon(components) {
        return {
            ngModule: PblNgridModule,
            providers: provideCommon(components),
        };
    }
    /**
     * @template T
     * @param {?} ngRef
     * @param {?} component
     * @param {?=} options
     * @return {?}
     */
    static loadCommonTemplates(ngRef, component, options) {
        let { injector } = ngRef;
        const { registry, destroy } = options || ((/** @type {?} */ ({})));
        if (registry) {
            injector = Injector.create({
                providers: [{ provide: PblNgridRegistryService, useValue: registry.getRoot() }],
                parent: ngRef.injector
            });
        }
        /** @type {?} */
        const cmpRef = ngRef.componentFactoryResolver.resolveComponentFactory(component).create(injector);
        cmpRef.changeDetectorRef.detectChanges();
        if (destroy) {
            ngRef.onDestroy((/**
             * @return {?}
             */
            () => {
                try {
                    cmpRef.destroy();
                }
                catch (err) { }
            }));
        }
        return cmpRef;
    }
}
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
PblNgridModule.ctorParameters = () => [
    { type: NgModuleRef },
    { type: PblNgridRegistryService },
    { type: Array, decorators: [{ type: Inject, args: [COMMON_TABLE_TEMPLATE_INIT,] }, { type: Optional }, { type: Self }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9uZ3JpZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBRUwsTUFBTSxFQUNOLGNBQWMsRUFDZCxRQUFRLEVBRVIsUUFBUSxFQUNSLFFBQVEsRUFDUixXQUFXLEVBRVgsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZUFBZSxJQUFJLGtCQUFrQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsaUJBQWlCLEVBRWpCLG9CQUFvQixFQUNwQixpQ0FBaUMsRUFBRSxtQkFBbUIsRUFDdEQsaUJBQWlCLEVBQ2pCLDhCQUE4QixFQUM5Qiw4QkFBOEIsRUFDOUIsd0JBQXdCLEVBQUUsOEJBQThCLEVBQ3hELDJCQUEyQixFQUMzQixxQkFBcUIsRUFDckIsMkJBQTJCLEVBRTNCLG1CQUFtQixFQUNuQiw2QkFBNkIsRUFDN0IsbUNBQW1DLEVBQ25DLDBCQUEwQixFQUMxQiw2QkFBNkIsRUFFN0IscUJBQXFCLEVBQ3JCLG9DQUFvQyxFQUFFLDRCQUE0QixFQUFFLGlCQUFpQixFQUVyRixrQ0FBa0MsRUFFbEMscUJBQXFCLEdBQ3RCLE1BQU0sY0FBYyxDQUFDOztBQUV0QixNQUFNLE9BQU8sMEJBQTBCLEdBQUcsSUFBSSxjQUFjLENBQUMsNEJBQTRCLENBQUM7Ozs7QUFFMUYsd0NBT0M7OztJQU5DLHVDQUFxQjs7Ozs7O0lBS3JCLGtDQUFlOzs7Ozs7QUFHakIsTUFB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Q1AsWUFBWTtvQkFDWixlQUFlLEVBQUUsa0JBQWtCO29CQUNuQyxjQUFjO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixpQ0FBaUMsRUFBRSxtQkFBbUI7b0JBQ3RELG9CQUFvQjtvQkFDcEIsaUJBQWlCO29CQUNqQixvQkFBb0I7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsNkJBQTZCO29CQUM3QixtQ0FBbUM7b0JBQ25DLDBCQUEwQjtvQkFDMUIsNkJBQTZCO29CQUM3Qiw4QkFBOEI7b0JBQzlCLDhCQUE4QjtvQkFDOUIsd0JBQXdCLEVBQUUsOEJBQThCO29CQUN4RCwyQkFBMkI7b0JBQzNCLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUUzQixxQkFBcUI7b0JBQ3JCLG9DQUFvQyxFQUFFLDRCQUE0QixFQUFFLGlCQUFpQjtvQkFFckYsa0NBQWtDO29CQUVsQyxpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxvQkFBb0I7b0JBQ3BCLG1CQUFtQjtvQkFDbkIsNkJBQTZCO29CQUM3QixtQ0FBbUM7b0JBQ25DLDBCQUEwQjtvQkFDMUIsNkJBQTZCO29CQUM3Qiw4QkFBOEI7b0JBQzlCLDhCQUE4QjtvQkFDOUIsd0JBQXdCLEVBQUUsOEJBQThCLEVBQUUsaUJBQWlCO29CQUMzRSwyQkFBMkI7b0JBQzNCLHFCQUFxQjtvQkFDckIsMkJBQTJCO29CQUUzQixxQkFBcUI7b0JBQ3JCLDRCQUE0QjtvQkFFNUIsa0NBQWtDO29CQUVsQyxpQkFBaUI7aUJBQ2xCO2FBQ0Y7Ozs7WUE1R0MsV0FBVztZQVlYLHVCQUF1Qjt3Q0FxR1YsTUFBTSxTQUFDLDBCQUEwQixjQUFHLFFBQVEsWUFBSSxJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50UmVmLFxuICBJbmplY3QsXG4gIEluamVjdGlvblRva2VuLFxuICBJbmplY3RvcixcbiAgVHlwZSxcbiAgT3B0aW9uYWwsXG4gIE5nTW9kdWxlLFxuICBOZ01vZHVsZVJlZixcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgYXMgU2Nyb2xsaW5nTW9kdWxlRXhwIH0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgU2Nyb2xsaW5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBDZGtUYWJsZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7XG4gIFBFQl9OR1JJRF9DT05GSUcsIFBibE5ncmlkQ29uZmlnLFxuICBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgUGJsQ2RrVGFibGVDb21wb25lbnQsXG4gIFBibE5ncmlkQ29tcG9uZW50LFxuXG4gIFBibE5ncmlkUm93Q29tcG9uZW50LFxuICBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQsIFBibE1ldGFSb3dEaXJlY3RpdmUsXG4gIFBibE5ncmlkQ29sdW1uRGVmLFxuICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgUGJsTmdyaWRDZWxsRGlyZWN0aXZlLFxuICBQYmxOZ3JpZEZvb3RlckNlbGxEaXJlY3RpdmUsXG5cbiAgUGJsTmdyaWRDZWxsU3R5bGluZyxcbiAgUGJsTmdyaWRPdXRlclNlY3Rpb25EaXJlY3RpdmUsXG4gIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUsXG5cbiAgUGJsQ29sdW1uU2l6ZU9ic2VydmVyLFxuICBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQsIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIFBibE5ncmlkU2Nyb2xsaW5nLFxuXG4gIFBibE5ncmlkQ2VsbEVkaXRBdXRvRm9jdXNEaXJlY3RpdmUsXG5cbiAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxufSBmcm9tICcuL2dyaWQvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NPTU1PTiBUQUJMRSBURU1QTEFURSBJTklUJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbW9uVGVtcGxhdGVJbml0IHtcbiAgY29tcG9uZW50OiBUeXBlPGFueT47XG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCB1c2UgdGhlIHJvb3QgcmVnaXN0cnkgc2VydmljZSAoZm9yIHRlbXBsYXRlcykuXG4gICAqIE90aGVyd2lzZSwgdXNlcyB0aGUgcHJvdmlkZWQgcmVnaXN0cnkgZnJvbSB0aGUgZGVwZW5kZW5jeSB0cmVlLlxuICAgKi9cbiAgcm9vdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogYW55IHtcbiAgcmV0dXJuIFtcbiAgICB7IHByb3ZpZGU6IENPTU1PTl9UQUJMRV9URU1QTEFURV9JTklULCBtdWx0aTogdHJ1ZSwgdXNlVmFsdWU6IGNvbXBvbmVudHMgfSxcbiAgXTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBTY3JvbGxpbmdNb2R1bGUsIFNjcm9sbGluZ01vZHVsZUV4cCxcbiAgICBDZGtUYWJsZU1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGJsTmdyaWRNZXRhUm93Q29udGFpbmVyQ29tcG9uZW50LCBQYmxNZXRhUm93RGlyZWN0aXZlLFxuICAgIFBibENka1RhYmxlQ29tcG9uZW50LFxuICAgIFBibE5ncmlkQ29sdW1uRGVmLFxuICAgIFBibE5ncmlkUm93Q29tcG9uZW50LFxuICAgIFBibE5ncmlkQ2VsbFN0eWxpbmcsXG4gICAgUGJsTmdyaWRPdXRlclNlY3Rpb25EaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSxcblxuICAgIFBibENvbHVtblNpemVPYnNlcnZlcixcbiAgICBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQsIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIFBibE5ncmlkU2Nyb2xsaW5nLFxuXG4gICAgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSxcblxuICAgIFBibE5ncmlkQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUGJsTmdyaWRSb3dDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsU3R5bGluZyxcbiAgICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZFNjcm9sbGluZyxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSxcblxuICAgIFBibENvbHVtblNpemVPYnNlcnZlcixcbiAgICBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSxcblxuICAgIFBibE5ncmlkQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1vZHVsZSB7XG5cbiAgY29uc3RydWN0b3IobmdSZWY6IE5nTW9kdWxlUmVmPGFueT4sXG4gICAgICAgICAgICAgIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChDT01NT05fVEFCTEVfVEVNUExBVEVfSU5JVCkgQE9wdGlvbmFsKCkgQFNlbGYoKSBjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXVtdKSB7XG5cbiAgICAvLyBUT0RPOiBSZW1vdmUgdGhpcyBvbmNlIGlzc3VlIGZpeGVkOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zNTU4MFxuICAgIHRyeSB7XG4gICAgICBpZiAobmdSZWYuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyKSB7XG4gICAgICAgIHJlZ2lzdHJ5LmdldFJvb3QoKTsgLy8gdGhpcyBsaW5lIHdpbGwga2VlcCB0aGUgdHJ5L2NhdGNoIGJsb2NrIGluIHBsYWNlIHdoZW4gZG9pbmcgbWluaWZpY2F0aW9uXG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSAobmdSZWYgYXMgYW55KS5fcGFyZW50O1xuICAgICAgKG5nUmVmIGFzIGFueSkuX3IzSW5qZWN0b3IgPSBwYXJlbnQ7XG4gICAgfVxuXG4gICAgaWYgKGNvbXBvbmVudHMpIHtcbiAgICAgIGZvciAoY29uc3QgbXVsdGkgb2YgY29tcG9uZW50cykge1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgbXVsdGkpIHtcbiAgICAgICAgICBpZiAoYy5yb290KSB7XG4gICAgICAgICAgICByZWdpc3RyeSA9IHJlZ2lzdHJ5LmdldFJvb3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgUGJsTmdyaWRNb2R1bGUubG9hZENvbW1vblRlbXBsYXRlcyhuZ1JlZiwgYy5jb21wb25lbnQsIHsgcmVnaXN0cnksIGRlc3Ryb3k6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IFBibE5ncmlkQ29uZmlnLCBjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8UGJsTmdyaWRNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFBibE5ncmlkTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogUEVCX05HUklEX0NPTkZJRywgdXNlVmFsdWU6IGNvbmZpZyB9LFxuICAgICAgICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByb3ZpZGVDb21tb24oY29tcG9uZW50cyksXG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyB3aXRoQ29tbW9uKGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQYmxOZ3JpZE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IHByb3ZpZGVDb21tb24oY29tcG9uZW50cyksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkQ29tbW9uVGVtcGxhdGVzPFQ+KG5nUmVmOiBOZ01vZHVsZVJlZjxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFR5cGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogV2hlbiBzZXQgd2lsbCB1c2UgaXQgYXMgZmlyc3QgcmVnaXN0cnkgaW4gdGhlIERJIHRyZWUgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdHJ5PzogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogV2hlbiBzZXQgd2lsbCBkZXN0cm95IHRoZSBjb21wb25lbnQgd2hlbiB0aGUgbW9kdWxlIGlzIGRlc3Ryb3llZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc3Ryb3k/OiBib29sZWFuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBsZXQgeyBpbmplY3RvciB9ID0gbmdSZWY7XG4gICAgY29uc3QgeyByZWdpc3RyeSwgZGVzdHJveSB9ID0gb3B0aW9ucyB8fCAoe30gYXMgYW55KTtcblxuICAgIGlmIChyZWdpc3RyeSkge1xuICAgICAgaW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgICBwcm92aWRlcnM6IFsgeyBwcm92aWRlOiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSwgdXNlVmFsdWU6IHJlZ2lzdHJ5LmdldFJvb3QoKSB9IF0sXG4gICAgICAgIHBhcmVudDogbmdSZWYuaW5qZWN0b3JcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGNtcFJlZiA9IG5nUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxUPihjb21wb25lbnQpLmNyZWF0ZShpbmplY3Rvcik7XG4gICAgY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBpZiAoZGVzdHJveSkge1xuICAgICAgbmdSZWYub25EZXN0cm95KCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY21wUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfSBjYXRjaCggZXJyKSB7fVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNtcFJlZjtcbiAgfVxufVxuIl19