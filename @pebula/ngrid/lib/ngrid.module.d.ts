import { ComponentRef, InjectionToken, Type, NgModuleRef, ModuleWithProviders } from '@angular/core';
import { PblNgridConfig, PblNgridRegistryService } from './grid/index';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from './grid/meta-rows/meta-row-container';
import * as ɵngcc2 from './grid/meta-rows/meta-row.directive';
import * as ɵngcc3 from './grid/pbl-cdk-table/pbl-cdk-table.component';
import * as ɵngcc4 from './grid/directives/column-def';
import * as ɵngcc5 from './grid/directives/row';
import * as ɵngcc6 from './grid/directives/cell-style-class/index';
import * as ɵngcc7 from './grid/directives/directives';
import * as ɵngcc8 from './grid/directives/registry.directives';
import * as ɵngcc9 from './grid/directives/cell-def';
import * as ɵngcc10 from './grid/directives/cell';
import * as ɵngcc11 from './grid/features/column-size-observer/column-size-observer.directive';
import * as ɵngcc12 from './grid/features/virtual-scroll/virtual-scroll-viewport.component';
import * as ɵngcc13 from './grid/features/virtual-scroll/strategies';
import * as ɵngcc14 from './grid/features/virtual-scroll/scrolling-plugin.directive';
import * as ɵngcc15 from './grid/directives/editing';
import * as ɵngcc16 from './grid/ngrid.component';
import * as ɵngcc17 from '@angular/common';
import * as ɵngcc18 from '@angular/cdk/scrolling';
import * as ɵngcc19 from '@angular/cdk-experimental/scrolling';
import * as ɵngcc20 from '@angular/cdk/table';
export declare const COMMON_TABLE_TEMPLATE_INIT: InjectionToken<unknown>;
export interface CommonTemplateInit {
    component: Type<any>;
    /**
     * When true will use the root registry service (for templates).
     * Otherwise, uses the provided registry from the dependency tree.
     */
    root?: boolean;
}
export declare function provideCommon(components: CommonTemplateInit[]): any;
export declare class PblNgridModule {
    constructor(ngRef: NgModuleRef<any>, registry: PblNgridRegistryService, components: CommonTemplateInit[][]);
    static forRoot(config: PblNgridConfig, components: CommonTemplateInit[]): ModuleWithProviders<PblNgridModule>;
    static withCommon(components: CommonTemplateInit[]): ModuleWithProviders<PblNgridModule>;
    static loadCommonTemplates<T>(ngRef: NgModuleRef<any>, component: Type<T>, options?: {
        /** When set will use it as first registry in the DI tree */
        registry?: PblNgridRegistryService;
        /** When set will destroy the component when the module is destroyed. */
        destroy?: boolean;
    }): ComponentRef<T>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDefWithMeta<PblNgridModule, [typeof ɵngcc1.PblNgridMetaRowContainerComponent, typeof ɵngcc2.PblMetaRowDirective, typeof ɵngcc3.PblCdkTableComponent, typeof ɵngcc4.PblNgridColumnDef, typeof ɵngcc5.PblNgridRowComponent, typeof ɵngcc6.PblNgridCellStyling, typeof ɵngcc7.PblNgridOuterSectionDirective, typeof ɵngcc8.PblNgridHeaderExtensionRefDirective, typeof ɵngcc8.PblNgridNoDataRefDirective, typeof ɵngcc8.PblNgridPaginatorRefDirective, typeof ɵngcc9.PblNgridHeaderCellDefDirective, typeof ɵngcc9.PblNgridFooterCellDefDirective, typeof ɵngcc9.PblNgridCellDefDirective, typeof ɵngcc9.PblNgridEditorCellDefDirective, typeof ɵngcc10.PblNgridHeaderCellComponent, typeof ɵngcc10.PblNgridCellDirective, typeof ɵngcc10.PblNgridFooterCellDirective, typeof ɵngcc11.PblColumnSizeObserver, typeof ɵngcc12.PblCdkVirtualScrollViewportComponent, typeof ɵngcc13.PblCdkVirtualScrollDirective, typeof ɵngcc14.PblNgridScrolling, typeof ɵngcc15.PblNgridCellEditAutoFocusDirective, typeof ɵngcc16.PblNgridComponent], [typeof ɵngcc17.CommonModule, typeof ɵngcc18.ScrollingModule, typeof ɵngcc19.ScrollingModule, typeof ɵngcc20.CdkTableModule], [typeof ɵngcc5.PblNgridRowComponent, typeof ɵngcc6.PblNgridCellStyling, typeof ɵngcc7.PblNgridOuterSectionDirective, typeof ɵngcc8.PblNgridHeaderExtensionRefDirective, typeof ɵngcc8.PblNgridNoDataRefDirective, typeof ɵngcc8.PblNgridPaginatorRefDirective, typeof ɵngcc9.PblNgridHeaderCellDefDirective, typeof ɵngcc9.PblNgridFooterCellDefDirective, typeof ɵngcc9.PblNgridCellDefDirective, typeof ɵngcc9.PblNgridEditorCellDefDirective, typeof ɵngcc14.PblNgridScrolling, typeof ɵngcc10.PblNgridHeaderCellComponent, typeof ɵngcc10.PblNgridCellDirective, typeof ɵngcc10.PblNgridFooterCellDirective, typeof ɵngcc11.PblColumnSizeObserver, typeof ɵngcc13.PblCdkVirtualScrollDirective, typeof ɵngcc15.PblNgridCellEditAutoFocusDirective, typeof ɵngcc16.PblNgridComponent]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDef<PblNgridModule>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQubW9kdWxlLmQudHMiLCJzb3VyY2VzIjpbIm5ncmlkLm1vZHVsZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0aW9uVG9rZW4sIFR5cGUsIE5nTW9kdWxlUmVmLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnLCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4vZ3JpZC9pbmRleCc7XHJcbmV4cG9ydCBkZWNsYXJlIGNvbnN0IENPTU1PTl9UQUJMRV9URU1QTEFURV9JTklUOiBJbmplY3Rpb25Ub2tlbjx1bmtub3duPjtcclxuZXhwb3J0IGludGVyZmFjZSBDb21tb25UZW1wbGF0ZUluaXQge1xyXG4gICAgY29tcG9uZW50OiBUeXBlPGFueT47XHJcbiAgICAvKipcclxuICAgICAqIFdoZW4gdHJ1ZSB3aWxsIHVzZSB0aGUgcm9vdCByZWdpc3RyeSBzZXJ2aWNlIChmb3IgdGVtcGxhdGVzKS5cclxuICAgICAqIE90aGVyd2lzZSwgdXNlcyB0aGUgcHJvdmlkZWQgcmVnaXN0cnkgZnJvbSB0aGUgZGVwZW5kZW5jeSB0cmVlLlxyXG4gICAgICovXHJcbiAgICByb290PzogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBwcm92aWRlQ29tbW9uKGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogYW55O1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZE1vZHVsZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihuZ1JlZjogTmdNb2R1bGVSZWY8YW55PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLCBjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXVtdKTtcclxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGJsTmdyaWRDb25maWcsIGNvbXBvbmVudHM6IENvbW1vblRlbXBsYXRlSW5pdFtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQYmxOZ3JpZE1vZHVsZT47XHJcbiAgICBzdGF0aWMgd2l0aENvbW1vbihjb21wb25lbnRzOiBDb21tb25UZW1wbGF0ZUluaXRbXSk6IE1vZHVsZVdpdGhQcm92aWRlcnM8UGJsTmdyaWRNb2R1bGU+O1xyXG4gICAgc3RhdGljIGxvYWRDb21tb25UZW1wbGF0ZXM8VD4obmdSZWY6IE5nTW9kdWxlUmVmPGFueT4sIGNvbXBvbmVudDogVHlwZTxUPiwgb3B0aW9ucz86IHtcclxuICAgICAgICAvKiogV2hlbiBzZXQgd2lsbCB1c2UgaXQgYXMgZmlyc3QgcmVnaXN0cnkgaW4gdGhlIERJIHRyZWUgKi9cclxuICAgICAgICByZWdpc3RyeT86IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlO1xyXG4gICAgICAgIC8qKiBXaGVuIHNldCB3aWxsIGRlc3Ryb3kgdGhlIGNvbXBvbmVudCB3aGVuIHRoZSBtb2R1bGUgaXMgZGVzdHJveWVkLiAqL1xyXG4gICAgICAgIGRlc3Ryb3k/OiBib29sZWFuO1xyXG4gICAgfSk6IENvbXBvbmVudFJlZjxUPjtcclxufVxyXG4iXX0=