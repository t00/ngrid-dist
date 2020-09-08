import { TemplateRef, OnInit, OnDestroy, ComponentFactory, ComponentRef, Injector } from '@angular/core';
import { PblColumn } from '../columns/column';
import { PblNgridComponent } from '../ngrid.component';
import { MetaCellContext, PblNgridMetaCellContext } from '../context/index';
import { PblNgridHeaderCellComponent } from './cell';
import { PblNgridSingleRegistryMap, PblNgridMultiRegistryMap, PblNgridRegistryService } from '../services/grid-registry.service';
import * as ɵngcc0 from '@angular/core';
export declare abstract class PblNgridSingleTemplateRegistry<T, TKind extends keyof PblNgridSingleRegistryMap> implements OnInit, OnDestroy {
    tRef: TemplateRef<T>;
    protected registry: PblNgridRegistryService;
    abstract readonly kind: TKind;
    constructor(tRef: TemplateRef<T>, registry: PblNgridRegistryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridSingleTemplateRegistry<any, any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridSingleTemplateRegistry<any, any>, never, never, {}, {}, never>;
}
export declare abstract class PblNgridMultiTemplateRegistry<T, TKind extends keyof PblNgridMultiRegistryMap> implements OnInit, OnDestroy {
    tRef: TemplateRef<T>;
    protected registry: PblNgridRegistryService;
    abstract readonly name: string;
    abstract readonly kind: TKind;
    constructor(tRef: TemplateRef<T>, registry: PblNgridRegistryService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridMultiTemplateRegistry<any, any>, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridMultiTemplateRegistry<any, any>, never, never, {}, {}, never>;
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
export declare class PblNgridHeaderExtensionRefDirective extends PblNgridMultiTemplateRegistry<PblNgridDataHeaderExtensionContext, 'dataHeaderExtensions'> implements PblNgridDataHeaderExtensionRef {
    private static _id;
    readonly name: string;
    readonly kind: 'dataHeaderExtensions';
    shouldRender?: (context: PblNgridDataHeaderExtensionContext) => boolean;
    constructor(tRef: TemplateRef<PblNgridDataHeaderExtensionContext>, registry: PblNgridRegistryService);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridHeaderExtensionRefDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridHeaderExtensionRefDirective, "[pblNgridHeaderExtensionRef]", never, { "shouldRender": "pblNgridHeaderExtensionRef"; }, {}, never>;
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridPaginatorRefDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridPaginatorRefDirective, "[pblNgridPaginatorRef]", never, {}, {}, never>;
}
/**
 * Marks the element as the display element when grid has no data.
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridNoDataRefDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridNoDataRefDirective, "[pblNgridNoDataRef]", never, {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuZGlyZWN0aXZlcy5kLnRzIiwic291cmNlcyI6WyJyZWdpc3RyeS5kaXJlY3RpdmVzLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiwgT25Jbml0LCBPbkRlc3Ryb3ksIENvbXBvbmVudEZhY3RvcnksIENvbXBvbmVudFJlZiwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcclxuaW1wb3J0IHsgUGJsTmdyaWRIZWFkZXJDZWxsQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxsJztcclxuaW1wb3J0IHsgUGJsTmdyaWRTaW5nbGVSZWdpc3RyeU1hcCwgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwLCBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XHJcbmV4cG9ydCBkZWNsYXJlIGFic3RyYWN0IGNsYXNzIFBibE5ncmlkU2luZ2xlVGVtcGxhdGVSZWdpc3RyeTxULCBUS2luZCBleHRlbmRzIGtleW9mIFBibE5ncmlkU2luZ2xlUmVnaXN0cnlNYXA+IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgdFJlZjogVGVtcGxhdGVSZWY8VD47XHJcbiAgICBwcm90ZWN0ZWQgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlO1xyXG4gICAgYWJzdHJhY3QgcmVhZG9ubHkga2luZDogVEtpbmQ7XHJcbiAgICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxUPiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGFic3RyYWN0IGNsYXNzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFQsIFRLaW5kIGV4dGVuZHMga2V5b2YgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwPiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHRSZWY6IFRlbXBsYXRlUmVmPFQ+O1xyXG4gICAgcHJvdGVjdGVkIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZTtcclxuICAgIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICAgIGFic3RyYWN0IHJlYWRvbmx5IGtpbmQ6IFRLaW5kO1xyXG4gICAgY29uc3RydWN0b3IodFJlZjogVGVtcGxhdGVSZWY8VD4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSk7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBhYnN0cmFjdCBjbGFzcyBQYmxOZ3JpZE11bHRpQ29tcG9uZW50UmVnaXN0cnk8VCwgVEtpbmQgZXh0ZW5kcyBrZXlvZiBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXA+IHtcclxuICAgIGFic3RyYWN0IHJlYWRvbmx5IG5hbWU6IHN0cmluZztcclxuICAgIGFic3RyYWN0IHJlYWRvbmx5IGtpbmQ6IFRLaW5kO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHNldCB0byB0cnVlIHRoZSBjb21wb25lbnQgd2lsbCBiZSBjcmVhdGVkIHdpdGggcHJvamVjdGVkIGNvbnRlbnQuXHJcbiAgICAgKiBTZXR0aW5nIHRvIHRydWUgZG9lcyBub3QgZW5zdXJlIHByb2plY3Rpb24sIHRoZSBwcm9qZWN0aW9uIGlzIGRldGVybWluZWQgYnkgdGhlIGNvbnRleHQgY3JlYXRpbmcgdGhlIGNvbXBvbmVudC5cclxuICAgICAqXHJcbiAgICAgKiBGb3IgZXhhbXBsZSwgSW4gdGhlIGNvbnRleHQgb2YgYGRhdGFIZWFkZXJFeHRlbnNpb25zYCB0aGUgcHJvamVjdGlvbiB3aWxsIGJlIHRoZSBjb250ZW50IG9mIHRoZSBjZWxsLCBvdGhlciBpbXBsZW1lbnRhdGlvbnNcclxuICAgICAqIG1pZ2h0IG5vdCBpbmNsdWRlIGEgcHJvamVjdGlvbi5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgcHJvamVjdENvbnRlbnQ/OiBib29sZWFuO1xyXG4gICAgYWJzdHJhY3QgZ2V0RmFjdG9yeShjb250ZXh0OiBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4pOiBDb21wb25lbnRGYWN0b3J5PFQ+O1xyXG4gICAgb25DcmVhdGVkPyhjb250ZXh0OiBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxhbnksIFBibENvbHVtbj4sIGNtcFJlZjogQ29tcG9uZW50UmVmPFQ+KTogdm9pZDtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PFQgPSBhbnk+IGV4dGVuZHMgTWV0YUNlbGxDb250ZXh0PFQsIFBibENvbHVtbj4ge1xyXG4gICAgcmVhZG9ubHkgaW5qZWN0b3I6IEluamVjdG9yO1xyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCk7XHJcbiAgICBzdGF0aWMgY3JlYXRlRGF0ZUhlYWRlckN0eDxUID0gYW55PihoZWFkZXJDZWxsOiBQYmxOZ3JpZEhlYWRlckNlbGxDb21wb25lbnQ8UGJsQ29sdW1uPiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dDxUPjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZjxUID0gYW55PiB7XHJcbiAgICBzaG91bGRSZW5kZXI/KGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ8VD4pOiBib29sZWFuO1xyXG59XHJcbi8qKlxyXG4gKiBBIGdlbmVyaWMsIG11bHRpLXB1cnBvc2UgdGVtcGxhdGUgcmVmZXJlbmNlIGZvciBkYXRhIGhlYWRlciBleHRlbnNpb25zLlxyXG4gKiBUaGUgdGVtcGxhdGUncyBjb250ZXh0IGlzIGBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0YDpcclxuICpcclxuICogYGBgdHNcclxuICogaW50ZXJmYWNlIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQge1xyXG4gKiAgIGNvbDogUGJsTWV0YUNvbHVtbjtcclxuICogICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gKiAgIGluamVjdG9yOiBJbmplY3RvcjtcclxuICogfVxyXG4gKiBgYGBcclxuICpcclxuICogQnkgZGVmYXVsdCBpdCB3aWxsIHJlbmRlciBpZiByZWdpc3RlcmVkIGJ1dCBpdCBpcyBwb3NzaWJsZSB0byBwcm92aWRlIGEgcHJlZGljYXRlIHRvIGNvbmRpdGlvbmFsbHkgbG9hZCBpdC5cclxuICpcclxuICogYGBgaHRtbFxyXG4gKiA8ZGl2ICpwYmxOZ3JpZEhlYWRlckV4dGVuc2lvblJlZj1cImxldCBjdHhcIj48L2Rpdj5cclxuICogYGBgYFxyXG4gKlxyXG4gKiBPciB3aXRoIGEgYHNob3VsZFJlbmRlcmAgcHJlZGljYXRlOlxyXG4gKlxyXG4gKiBgYGBodG1sXHJcbiAqIDxkaXYgKnBibE5ncmlkSGVhZGVyRXh0ZW5zaW9uUmVmPVwic2hvdWxkUmVuZGVyOyBsZXQgY3R4XCI+PC9kaXY+XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBBbmQgaW4gdGhlIGNvbXBvbmVudCB0aGUgdGVtcGxhdGUgaXMgZGVmaW5lZCBvbjpcclxuICpcclxuICogYGBgdHNcclxuICogY2xhc3MgTXlDb21wb25lbnQge1xyXG4gKlxyXG4gKiAgIHNob3VsZFJlbmRlciA9IChjb250ZXh0OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0KSA9PiB7XHJcbiAqICAgICAvLyBTb21lIGNvZGUgcmV0dXJuaW5nIHRydWUgb3IgZmFsc2VcclxuICogICB9XHJcbiAqIH1cclxuICogYGBgXHJcbiAqXHJcbiAqIE5vdGUgdGhhdCB0aGUgYHNob3VsZFJlbmRlcmAgcHJlZGljYXRlIGlzIHJ1biBvbmNlIHdoZW4gdGhlIGhlYWRlciBpbml0aWFsaXplLlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRIZWFkZXJFeHRlbnNpb25SZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0LCAnZGF0YUhlYWRlckV4dGVuc2lvbnMnPiBpbXBsZW1lbnRzIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvblJlZiB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaWQ7XHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcbiAgICByZWFkb25seSBraW5kOiAnZGF0YUhlYWRlckV4dGVuc2lvbnMnO1xyXG4gICAgc2hvdWxkUmVuZGVyPzogKGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQpID0+IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKTtcclxufVxyXG4vKipcclxuICogTWFya3MgdGhlIGVsZW1lbnQgYXMgdGhlIGRpc3BsYXkgZWxlbWVudCBmb3IgcGFnaW5hdGlvblxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRQYWdpbmF0b3JSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8e1xyXG4gICAgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG59LCAncGFnaW5hdG9yJz4ge1xyXG4gICAgcmVhZG9ubHkga2luZDogJ3BhZ2luYXRvcic7XHJcbiAgICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7XHJcbiAgICAgICAgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgfT4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSk7XHJcbn1cclxuLyoqXHJcbiAqIE1hcmtzIHRoZSBlbGVtZW50IGFzIHRoZSBkaXNwbGF5IGVsZW1lbnQgd2hlbiBncmlkIGhhcyBubyBkYXRhLlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgYGBodG1sXHJcbiAqICAgPHBibC1uZ3JpZD5cclxuICogICAgIDxkaXYgKnBibE5ncmlkTm9EYXRhUmVmIHN0eWxlPVwiaGVpZ2h0OiAxMDAlOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlclwiPlxyXG4gKiAgICAgICA8c3Bhbj5ObyBEYXRhPC9zcGFuPlxyXG4gKiAgICAgPC9kaXY+XHJcbiAqICAgPC9wYmwtbmdyaWQ+XHJcbiAqIGBgYFxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWROb0RhdGFSZWZEaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFNpbmdsZVRlbXBsYXRlUmVnaXN0cnk8e1xyXG4gICAgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG59LCAnbm9EYXRhJz4ge1xyXG4gICAgcmVhZG9ubHkga2luZDogJ25vRGF0YSc7XHJcbiAgICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjx7XHJcbiAgICAgICAgJGltcGxpY2l0OiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgfT4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSk7XHJcbn1cclxuIl19