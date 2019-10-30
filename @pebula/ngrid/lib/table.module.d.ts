import { ComponentRef, InjectionToken, Type, NgModuleRef, ModuleWithProviders } from '@angular/core';
import { PblNgridConfig, PblNgridRegistryService } from './table/index';
export declare const COMMON_TABLE_TEMPLATE_INIT: InjectionToken<{}>;
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
    static forRoot(config: PblNgridConfig, components: CommonTemplateInit[]): ModuleWithProviders;
    static withCommon(components: CommonTemplateInit[]): ModuleWithProviders;
    static loadCommonTemplates<T>(ngRef: NgModuleRef<any>, component: Type<T>, options?: {
        /** When set will use it as first registry in the DI tree */
        registry?: PblNgridRegistryService;
        /** When set will destroy the component when the module is destroyed. */
        destroy?: boolean;
    }): ComponentRef<T>;
}
