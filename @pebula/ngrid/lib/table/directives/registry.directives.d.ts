import { TemplateRef, OnInit, OnDestroy, ComponentFactory, ComponentRef, Injector } from '@angular/core';
import { PblColumn } from '../columns/column';
import { PblNgridComponent } from '../table.component';
import { MetaCellContext, PblNgridMetaCellContext } from '../context/index';
import { PblNgridHeaderCellComponent } from './cell';
import { PblNgridSingleRegistryMap, PblNgridMultiRegistryMap, PblNgridRegistryService } from '../services/table-registry.service';
export declare abstract class PblNgridSingleTemplateRegistry<T, TKind extends keyof PblNgridSingleRegistryMap> implements OnInit, OnDestroy {
    tRef: TemplateRef<T>;
    protected registry: PblNgridRegistryService;
    abstract readonly kind: TKind;
    constructor(tRef: TemplateRef<T>, registry: PblNgridRegistryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare abstract class PblNgridMultiTemplateRegistry<T, TKind extends keyof PblNgridMultiRegistryMap> implements OnInit, OnDestroy {
    tRef: TemplateRef<T>;
    protected registry: PblNgridRegistryService;
    abstract readonly name: string;
    abstract readonly kind: TKind;
    constructor(tRef: TemplateRef<T>, registry: PblNgridRegistryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
export declare abstract class PblNgridMultiComponentRegistry<T, TKind extends keyof PblNgridMultiRegistryMap> {
    abstract readonly name: string;
    abstract readonly kind: TKind;
    /**
     * When set to true the component will be created with projected content.
     * Setting to true does not ensure projection, the projection is determined by the context creating the component.
     *
     * For example, In the context of `dataHeaderExtensions` the projection will be the content of the cell, other implementations
     * might not include a projection.
     */
    readonly projectContent?: boolean;
    abstract getFactory(context: PblNgridMetaCellContext<any, PblColumn>): ComponentFactory<T>;
    onCreated?(context: PblNgridMetaCellContext<any, PblColumn>, cmpRef: ComponentRef<T>): void;
}
export declare class PblNgridDataHeaderExtensionContext<T = any> extends MetaCellContext<T, PblColumn> {
    readonly injector: Injector;
    protected constructor();
    static createDateHeaderCtx<T = any>(headerCell: PblNgridHeaderCellComponent<PblColumn>, injector: Injector): PblNgridDataHeaderExtensionContext<T>;
}
export interface PblNgridDataHeaderExtensionRef<T = any> {
    shouldRender?(context: PblNgridDataHeaderExtensionContext<T>): boolean;
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
export declare class PblNgridHeaderExtensionRefDirective extends PblNgridMultiTemplateRegistry<PblNgridDataHeaderExtensionContext, 'dataHeaderExtensions'> implements PblNgridDataHeaderExtensionRef {
    private static _id;
    readonly name: string;
    readonly kind: 'dataHeaderExtensions';
    shouldRender?: (context: PblNgridDataHeaderExtensionContext) => boolean;
    constructor(tRef: TemplateRef<PblNgridDataHeaderExtensionContext>, registry: PblNgridRegistryService);
}
/**
 * Marks the element as the display element for pagination
 */
export declare class PblNgridPaginatorRefDirective extends PblNgridSingleTemplateRegistry<{
    $implicit: PblNgridComponent<any>;
}, 'paginator'> {
    readonly kind: 'paginator';
    constructor(tRef: TemplateRef<{
        $implicit: PblNgridComponent<any>;
    }>, registry: PblNgridRegistryService);
}
/**
 * Marks the element as the display element when table has no data.
 *
 * @example
 * ```html
 *   <pbl-ngrid>
 *     <div *pblNgridNoDataRef style="height: 100%; display: flex; align-items: center; justify-content: center">
 *       <span>No Data</span>
 *     </div>
 *   </pbl-ngrid>
 * ```
 */
export declare class PblNgridNoDataRefDirective extends PblNgridSingleTemplateRegistry<{
    $implicit: PblNgridComponent<any>;
}, 'noData'> {
    readonly kind: 'noData';
    constructor(tRef: TemplateRef<{
        $implicit: PblNgridComponent<any>;
    }>, registry: PblNgridRegistryService);
}
