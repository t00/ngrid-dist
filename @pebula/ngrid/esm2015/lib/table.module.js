/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ANALYZE_FOR_ENTRY_COMPONENTS, Inject, InjectionToken, Injector, Optional, NgModule, NgModuleRef, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule as ScrollingModuleExp } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { PEB_NGRID_CONFIG, PblNgridRegistryService, PblCdkTableComponent, PblNgridComponent, PblNgridRowComponent, PblNgridMetaRowContainerComponent, PblMetaRowDirective, PblNgridColumnDef, PblNgridHeaderCellDefDirective, PblNgridFooterCellDefDirective, PblNgridCellDefDirective, PblNgridEditorCellDefDirective, PblNgridHeaderCellComponent, PblNgridCellDirective, PblNgridFooterCellDirective, PblNgridCellStyling, PblNgridOuterSectionDirective, PblNgridHeaderExtensionRefDirective, PblNgridNoDataRefDirective, PblNgridPaginatorRefDirective, PblColumnSizeObserver, PblCdkVirtualScrollViewportComponent, PblCdkVirtualScrollDirective, PblNgridScrolling, PblNgridCellEditAutoFocusDirective, PblNgridConfigService, } from './table/index';
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
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, multi: true, useValue: components },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSw0QkFBNEIsRUFBZ0IsTUFBTSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQVEsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQXVCLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGVBQWUsSUFBSSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUNMLGdCQUFnQixFQUNoQix1QkFBdUIsRUFDdkIsb0JBQW9CLEVBQ3BCLGlCQUFpQixFQUVqQixvQkFBb0IsRUFDcEIsaUNBQWlDLEVBQUUsbUJBQW1CLEVBQ3RELGlCQUFpQixFQUNqQiw4QkFBOEIsRUFDOUIsOEJBQThCLEVBQzlCLHdCQUF3QixFQUFFLDhCQUE4QixFQUN4RCwyQkFBMkIsRUFDM0IscUJBQXFCLEVBQ3JCLDJCQUEyQixFQUUzQixtQkFBbUIsRUFDbkIsNkJBQTZCLEVBQzdCLG1DQUFtQyxFQUNuQywwQkFBMEIsRUFDMUIsNkJBQTZCLEVBRTdCLHFCQUFxQixFQUNyQixvQ0FBb0MsRUFBRSw0QkFBNEIsRUFBRSxpQkFBaUIsRUFFckYsa0NBQWtDLEVBRWxDLHFCQUFxQixHQUN0QixNQUFNLGVBQWUsQ0FBQzs7QUFFdkIsTUFBTSxPQUFPLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFDLDRCQUE0QixDQUFDOzs7O0FBRTFGLHdDQU9DOzs7SUFOQyx1Q0FBcUI7Ozs7OztJQUtyQixrQ0FBZTs7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b0JBQzdCLG1DQUFtQztvQkFDbkMsMEJBQTBCO29CQUMxQiw2QkFBNkI7b0JBQzdCLDhCQUE4QjtvQkFDOUIsOEJBQThCO29CQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEI7b0JBQ3hELDJCQUEyQjtvQkFDM0IscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBRTNCLHFCQUFxQjtvQkFDckIsb0NBQW9DLEVBQUUsNEJBQTRCLEVBQUUsaUJBQWlCO29CQUVyRixrQ0FBa0M7b0JBRWxDLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG9CQUFvQjtvQkFDcEIsbUJBQW1CO29CQUNuQiw2QkFBNkI7b0JBQzdCLG1DQUFtQztvQkFDbkMsMEJBQTBCO29CQUMxQiw2QkFBNkI7b0JBQzdCLDhCQUE4QjtvQkFDOUIsOEJBQThCO29CQUM5Qix3QkFBd0IsRUFBRSw4QkFBOEIsRUFBRSxpQkFBaUI7b0JBQzNFLDJCQUEyQjtvQkFDM0IscUJBQXFCO29CQUNyQiwyQkFBMkI7b0JBRTNCLHFCQUFxQjtvQkFDckIsNEJBQTRCO29CQUU1QixrQ0FBa0M7b0JBRWxDLGlCQUFpQjtpQkFDbEI7YUFDRjs7OztZQTFHZ0gsV0FBVztZQVMxSCx1QkFBdUI7d0NBc0dWLE1BQU0sU0FBQywwQkFBMEIsY0FBRyxRQUFRLFlBQUksSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIENvbXBvbmVudFJlZiwgSW5qZWN0LCBJbmplY3Rpb25Ub2tlbiwgSW5qZWN0b3IsIFR5cGUsIE9wdGlvbmFsLCBOZ01vZHVsZSwgTmdNb2R1bGVSZWYsIE1vZHVsZVdpdGhQcm92aWRlcnMsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IFNjcm9sbGluZ01vZHVsZSBhcyBTY3JvbGxpbmdNb2R1bGVFeHAgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBTY3JvbGxpbmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IENka1RhYmxlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHtcbiAgUEVCX05HUklEX0NPTkZJRywgUGJsTmdyaWRDb25maWcsXG4gIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICBQYmxDZGtUYWJsZUNvbXBvbmVudCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG5cbiAgUGJsTmdyaWRSb3dDb21wb25lbnQsXG4gIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCwgUGJsTWV0YVJvd0RpcmVjdGl2ZSxcbiAgUGJsTmdyaWRDb2x1bW5EZWYsXG4gIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRWRpdG9yQ2VsbERlZkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50LFxuICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUsXG4gIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcblxuICBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIsXG4gIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCwgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG5cbiAgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSxcblxuICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG59IGZyb20gJy4vdGFibGUvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ0NPTU1PTiBUQUJMRSBURU1QTEFURSBJTklUJyk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tbW9uVGVtcGxhdGVJbml0IHtcbiAgY29tcG9uZW50OiBUeXBlPGFueT47XG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCB1c2UgdGhlIHJvb3QgcmVnaXN0cnkgc2VydmljZSAoZm9yIHRlbXBsYXRlcykuXG4gICAqIE90aGVyd2lzZSwgdXNlcyB0aGUgcHJvdmlkZWQgcmVnaXN0cnkgZnJvbSB0aGUgZGVwZW5kZW5jeSB0cmVlLlxuICAgKi9cbiAgcm9vdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogYW55IHtcbiAgcmV0dXJuIFtcbiAgICB7IHByb3ZpZGU6IEFOQUxZWkVfRk9SX0VOVFJZX0NPTVBPTkVOVFMsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogY29tcG9uZW50cyB9LFxuICAgIHsgcHJvdmlkZTogQ09NTU9OX1RBQkxFX1RFTVBMQVRFX0lOSVQsIG11bHRpOiB0cnVlLCB1c2VWYWx1ZTogY29tcG9uZW50cyB9LFxuICBdO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFNjcm9sbGluZ01vZHVsZSwgU2Nyb2xsaW5nTW9kdWxlRXhwLFxuICAgIENka1RhYmxlTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQsIFBibE1ldGFSb3dEaXJlY3RpdmUsXG4gICAgUGJsQ2RrVGFibGVDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDb2x1bW5EZWYsXG4gICAgUGJsTmdyaWRSb3dDb21wb25lbnQsXG4gICAgUGJsTmdyaWRDZWxsU3R5bGluZyxcbiAgICBQYmxOZ3JpZE91dGVyU2VjdGlvbkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZE5vRGF0YVJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZFBhZ2luYXRvclJlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZSwgUGJsTmdyaWRFZGl0b3JDZWxsRGVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlLFxuXG4gICAgUGJsQ29sdW1uU2l6ZU9ic2VydmVyLFxuICAgIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCwgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgUGJsTmdyaWRTY3JvbGxpbmcsXG5cbiAgICBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBQYmxOZ3JpZFJvd0NvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxTdHlsaW5nLFxuICAgIFBibE5ncmlkT3V0ZXJTZWN0aW9uRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkTm9EYXRhUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkUGFnaW5hdG9yUmVmRGlyZWN0aXZlLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbERlZkRpcmVjdGl2ZSxcbiAgICBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZEVkaXRvckNlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkU2Nyb2xsaW5nLFxuICAgIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudCxcbiAgICBQYmxOZ3JpZENlbGxEaXJlY3RpdmUsXG4gICAgUGJsTmdyaWRGb290ZXJDZWxsRGlyZWN0aXZlLFxuXG4gICAgUGJsQ29sdW1uU2l6ZU9ic2VydmVyLFxuICAgIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsXG5cbiAgICBQYmxOZ3JpZENlbGxFZGl0QXV0b0ZvY3VzRGlyZWN0aXZlLFxuXG4gICAgUGJsTmdyaWRDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTW9kdWxlIHtcblxuICBjb25zdHJ1Y3RvcihuZ1JlZjogTmdNb2R1bGVSZWY8YW55PixcbiAgICAgICAgICAgICAgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBASW5qZWN0KENPTU1PTl9UQUJMRV9URU1QTEFURV9JTklUKSBAT3B0aW9uYWwoKSBAU2VsZigpIGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdW10pIHtcbiAgICBpZiAoY29tcG9uZW50cykge1xuICAgICAgZm9yIChjb25zdCBtdWx0aSBvZiBjb21wb25lbnRzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBtdWx0aSkge1xuICAgICAgICAgIGlmIChjLnJvb3QpIHtcbiAgICAgICAgICAgIHJlZ2lzdHJ5ID0gcmVnaXN0cnkuZ2V0Um9vdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBQYmxOZ3JpZE1vZHVsZS5sb2FkQ29tbW9uVGVtcGxhdGVzKG5nUmVmLCBjLmNvbXBvbmVudCwgeyByZWdpc3RyeSwgZGVzdHJveTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGJsTmdyaWRDb25maWcsIGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBQYmxOZ3JpZE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFBFQl9OR1JJRF9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcbiAgICAgICAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHMpLFxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgd2l0aENvbW1vbihjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogUGJsTmdyaWRNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IHByb3ZpZGVDb21tb24oY29tcG9uZW50cyksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBsb2FkQ29tbW9uVGVtcGxhdGVzPFQ+KG5nUmVmOiBOZ01vZHVsZVJlZjxhbnk+LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IFR5cGU8VD4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM/OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqIFdoZW4gc2V0IHdpbGwgdXNlIGl0IGFzIGZpcnN0IHJlZ2lzdHJ5IGluIHRoZSBESSB0cmVlICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0cnk/OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiogV2hlbiBzZXQgd2lsbCBkZXN0cm95IHRoZSBjb21wb25lbnQgd2hlbiB0aGUgbW9kdWxlIGlzIGRlc3Ryb3llZC4gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0cm95PzogYm9vbGVhbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgbGV0IHsgaW5qZWN0b3IgfSA9IG5nUmVmO1xuICAgIGNvbnN0IHsgcmVnaXN0cnksIGRlc3Ryb3kgfSA9IG9wdGlvbnMgfHwgKHt9IGFzIGFueSk7XG5cbiAgICBpZiAocmVnaXN0cnkpIHtcbiAgICAgIGluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgICAgcHJvdmlkZXJzOiBbIHsgcHJvdmlkZTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIHVzZVZhbHVlOiByZWdpc3RyeS5nZXRSb290KCkgfSBdLFxuICAgICAgICBwYXJlbnQ6IG5nUmVmLmluamVjdG9yXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjbXBSZWYgPSBuZ1JlZi5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50KS5jcmVhdGUoaW5qZWN0b3IpO1xuICAgIGNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBpZiAoZGVzdHJveSkge1xuICAgICAgbmdSZWYub25EZXN0cm95KCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY21wUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgfSBjYXRjaCggZXJyKSB7fVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNtcFJlZjtcbiAgfVxufVxuIl19