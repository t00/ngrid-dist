import { AfterViewInit, ElementRef, Injector, QueryList, AfterContentInit, OnChanges, OnDestroy, SimpleChanges, ChangeDetectorRef, TemplateRef, ViewContainerRef, EmbeddedViewRef, NgZone, IterableDiffers, DoCheck } from '@angular/core';
import { CdkHeaderRowDef, CdkFooterRowDef, CdkRowDef } from '@angular/cdk/table';
import { PblNgridExtensionApi } from '../ext/grid-ext-api';
import { PblNgridPluginController, PblNgridPluginContext } from '../ext/plugin-control';
import { PblNgridPaginatorKind } from '../paginator';
import { DataSourcePredicate, PblNgridSortDefinition, PblDataSource, DataSourceOf } from '../data-source/index';
import { PblCdkTableComponent } from './pbl-cdk-table/pbl-cdk-table.component';
import { PblColumn, PblColumnStore, PblNgridColumnSet, PblNgridColumnDefinitionSet } from './columns';
import { PblNgridCellContext, PblNgridMetaCellContext, PblNgridContextApi, PblNgridRowContext } from './context/index';
import { PblNgridRegistryService } from './services/grid-registry.service';
import { PblNgridConfigService } from './services/config';
import { DynamicColumnWidthLogic } from './col-width-logic/dynamic-column-width';
import { ColumnApi, AutoSizeToFitOptions } from './column-api';
import { PblCdkVirtualScrollViewportComponent } from './features/virtual-scroll/virtual-scroll-viewport.component';
import { PblNgridMetaRowService } from './meta-rows/index';
import './bind-to-datasource';
import * as ɵngcc0 from '@angular/core';
export declare function internalApiFactory(grid: {
    _extApi: PblNgridExtensionApi;
}): PblNgridExtensionApi<any>;
export declare function pluginControllerFactory(grid: {
    _plugin: PblNgridPluginContext;
}): PblNgridPluginController<any>;
export declare function metaRowServiceFactory(grid: {
    _extApi: PblNgridExtensionApi;
}): PblNgridMetaRowService<any>;
export declare class PblNgridComponent<T = any> implements AfterContentInit, AfterViewInit, DoCheck, OnChanges, OnDestroy {
    private elRef;
    private differs;
    private ngZone;
    private cdr;
    private config;
    registry: PblNgridRegistryService;
    readonly id: string;
    /**
     * Show/Hide the header row.
     * Default: true
     */
    get showHeader(): boolean;
    set showHeader(value: boolean);
    _showHeader: boolean;
    /**
     * Show/Hide the footer row.
     * Default: false
     */
    get showFooter(): boolean;
    set showFooter(value: boolean);
    _showFooter: boolean;
    /**
     * When true, the filler is disabled.
     */
    get noFiller(): boolean;
    set noFiller(value: boolean);
    _noFiller: boolean;
    /**
     * Set's the behavior of the grid when tabbing.
     * The default behavior is none (rows and cells are not focusable)
     *
     * Note that the focus mode has an effect on other functions, for example a detail row will toggle (open/close) using
     * ENTER / SPACE only when focusMode is set to `row`.
     */
    focusMode: 'row' | 'cell' | 'none' | '' | false | undefined;
    /**
     * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
     */
    get identityProp(): string;
    set identityProp(value: string);
    private __identityProp;
    /**
     * The grid's source of data
     *
     * @remarks
     * The grid's source of data, which can be provided in 2 ways:
     *
     * - DataSourceOf<T>
     * - PblDataSource<T>
     *
     * The grid only works with `PblDataSource<T>`, `DataSourceOf<T>` is a shortcut for providing
     * the data array directly.
     *
     * `DataSourceOf<T>` can be:
     *
     * - Simple data array (each object represents one grid row)
     * - Promise for a data array
     * - Stream that emits a data array each time the array changes
     *
     * When a `DataSourceOf<T>` is provided it is converted into an instance of `PblDataSource<T>`.
     *
     * To access the `PblDataSource<T>` instance use the `ds` property (readonly).
     *
     * It is highly recommended to use `PblDataSource<T>` directly, the datasource factory makes it easy.
     * For example, when an array is provided the factory is used to convert it to a datasource:
     *
     * ```typescript
     * const collection: T[] = [];
     * const pblDataSource = createDS<T>().onTrigger( () => collection ).create();
     * ```
     *
     * > This is a write-only (setter) property that triggers the `setDataSource` method.
     */
    set dataSource(value: PblDataSource<T> | DataSourceOf<T>);
    get ds(): PblDataSource<T>;
    get usePagination(): PblNgridPaginatorKind | false;
    set usePagination(value: PblNgridPaginatorKind | false);
    get noCachePaginator(): boolean;
    set noCachePaginator(value: boolean);
    /**
     * The column definitions for this grid.
     */
    columns: PblNgridColumnSet | PblNgridColumnDefinitionSet;
    set hideColumns(value: string[]);
    /**
     * A fallback height for "the inner scroll container".
     * The fallback is used only when it LOWER than the rendered height, so no empty gaps are created when setting the fallback.
     *
     * The "inner scroll container" is the area in which all data rows are rendered and all meta (header/footer) rows that are of type "row" or "sticky".
     * The "inner scroll container" is defined to consume all the height left after all external objects are rendered.
     * External objects can be fixed meta rows (header/footer), pagination row, action row etc...
     *
     * If the grid does not have a height (% or px) the "inner scroll container" will always have no height (0).
     * If the grid has a height, the "inner scroll container" will get the height left, which can also be 0 if there are a lot of external objects.
     *
     * To solve the no-height problem we use the fallbackMinHeight property.
     *
     * When virtual scroll is disabled and fallbackMinHeight is not set the grid will set the "inner scroll container" height to show all rows.
     *
     * Note that when using a fixed (px) height for the grid, if the height of all external objects + the height of the "inner scroll container" is greater then
     * the grid's height a vertical scroll bar will show.
     * If the "inner scroll container"s height will be lower then it's rendered content height and additional vertical scroll bar will appear, which is, usually, not good.
     *
     * To avoid this, don't use fallbackMinHeight together with a fixed height for the grid. Instead use fallbackMinHeight together with a min height for the grid.
     */
    get fallbackMinHeight(): number;
    set fallbackMinHeight(value: number);
    rowClassUpdate: undefined | ((context: PblNgridRowContext<T>) => (string | string[] | Set<string> | {
        [klass: string]: any;
    }));
    rowClassUpdateFreq: 'item' | 'ngDoCheck' | 'none';
    rowFocus: 0 | '';
    cellFocus: 0 | '';
    private _fallbackMinHeight;
    private _dataSource;
    _vcRefBeforeTable: ViewContainerRef;
    _vcRefBeforeContent: ViewContainerRef;
    _vcRefAfterContent: ViewContainerRef;
    _fbTableCell: TemplateRef<PblNgridCellContext<T>>;
    _fbHeaderCell: TemplateRef<PblNgridMetaCellContext<T>>;
    _fbFooterCell: TemplateRef<PblNgridMetaCellContext<T>>;
    _tableRowDef: CdkRowDef<T>;
    _headerRowDefs: QueryList<CdkHeaderRowDef>;
    _footerRowDefs: QueryList<CdkFooterRowDef>;
    get metaColumnIds(): PblColumnStore['metaColumnIds'];
    get metaColumns(): PblColumnStore['metaColumns'];
    get columnRowDef(): {
        header: import("./columns").PblMetaRowDefinitions;
        footer: import("./columns").PblMetaRowDefinitions;
    };
    /**
     * True when the component is initialized (after AfterViewInit)
     */
    readonly isInit: boolean;
    readonly columnApi: ColumnApi<T>;
    get contextApi(): PblNgridContextApi<T>;
    get viewport(): PblCdkVirtualScrollViewportComponent | undefined;
    _cdkTable: PblCdkTableComponent<T>;
    private _store;
    private _hideColumnsDirty;
    private _hideColumns;
    private _colHideDiffer;
    private _noDateEmbeddedVRef;
    private _paginatorEmbeddedVRef;
    private _pagination;
    private _noCachePaginator;
    private _minimumRowWidth;
    private _viewport?;
    private _plugin;
    private _extApi;
    constructor(injector: Injector, vcRef: ViewContainerRef, elRef: ElementRef<HTMLElement>, differs: IterableDiffers, ngZone: NgZone, cdr: ChangeDetectorRef, config: PblNgridConfigService, registry: PblNgridRegistryService, id: string);
    ngDoCheck(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    trackBy(index: number, item: T): any;
    /**
     * Clear the current sort definitions.
     * This method is a proxy to `PblDataSource.setSort`, For more information see `PblDataSource.setSort`
     *
     * @param skipUpdate When true will not update the datasource, use this when the data comes sorted and you want to sync the definitions with the current data set.
     * default to false.
     */
    setSort(skipUpdate?: boolean): void;
    /**
     * Set the sorting definition for the current data set.
     *
     * This method is a proxy to `PblDataSource.setSort` with the added sugar of providing column by string that match the `id` or `sortAlias` properties.
     * For more information see `PblDataSource.setSort`
     *
     * @param columnOrSortAlias A column instance or a string matching `PblColumn.sortAlias` or `PblColumn.id`.
     * @param skipUpdate When true will not update the datasource, use this when the data comes sorted and you want to sync the definitions with the current data set.
     * default to false.
     */
    setSort(columnOrSortAlias: PblColumn | string, sort: PblNgridSortDefinition, skipUpdate?: boolean): void;
    /**
     * Clear the filter definition for the current data set.
     *
     * This method is a proxy to `PblDataSource.setFilter`, For more information see `PblDataSource.setFilter`.
     */
    setFilter(): void;
    /**
     * Set the filter definition for the current data set using a function predicate.
     *
    * This method is a proxy to `PblDataSource.setFilter` with the added sugar of providing column by string that match the `id` property.
     * For more information see `PblDataSource.setFilter`
     */
    setFilter(value: DataSourcePredicate, columns?: PblColumn[] | string[]): void;
    /**
     * Set the filter definition for the current data set using a value to compare with and a list of columns with the values to compare to.
     *
     * This method is a proxy to `PblDataSource.setFilter` with the added sugar of providing column by string that match the `id` property.
     * For more information see `PblDataSource.setFilter`
     */
    setFilter(value: any, columns: PblColumn[] | string[]): void;
    setDataSource(value: PblDataSource<T>): void;
    /**
     * Invalidates the header, including a full rebuild of column headers
     */
    invalidateColumns(): void;
    /**
     * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     */
    resetColumnsWidth(): void;
    /**
     * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
     * @param dynamicWidthLogic - Optional logic container, if not set a new one is created.
     */
    syncColumnGroupsSize(dynamicWidthLogic?: DynamicColumnWidthLogic): void;
    resizeColumns(columns?: PblColumn[]): void;
    /**
     * Create an embedded view before or after the user projected content.
     */
    createView<C>(location: 'beforeTable' | 'beforeContent' | 'afterContent', templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
    /**
     * Remove an already created embedded view.
     * @param view - The view to remove
     * @param location - The location, if not set defaults to `before`
     * @returns true when a view was removed, false when not. (did not exist in the view container for the provided location)
     */
    removeView(view: EmbeddedViewRef<any>, location: 'beforeTable' | 'beforeContent' | 'afterContent'): boolean;
    /**
     * Resize all visible columns to fit content of the grid.
     * @param forceFixedWidth - When true will resize all columns with absolute pixel values, otherwise will keep the same format as originally set (% or none)
     */
    autoSizeColumnToFit(options?: AutoSizeToFitOptions): void;
    findInitialRowHeight(): number;
    addClass(...cls: string[]): void;
    removeClass(...cls: string[]): void;
    private initPlugins;
    private listenToResize;
    private onResize;
    private initExtApi;
    private setupNoData;
    private getInternalVcRef;
    private setupPaginator;
    private attachCustomCellTemplates;
    private attachCustomHeaderCellTemplates;
    private resetHeaderRowDefs;
    private resetFooterRowDefs;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridComponent<any>, [null, null, null, null, null, null, null, null, { attribute: "id"; }]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblNgridComponent<any>, "pbl-ngrid", never, { "rowClassUpdateFreq": "rowClassUpdateFreq"; "showHeader": "showHeader"; "showFooter": "showFooter"; "noFiller": "noFiller"; "identityProp": "identityProp"; "dataSource": "dataSource"; "usePagination": "usePagination"; "noCachePaginator": "noCachePaginator"; "hideColumns": "hideColumns"; "fallbackMinHeight": "fallbackMinHeight"; "focusMode": "focusMode"; "columns": "columns"; "rowClassUpdate": "rowClassUpdate"; }, {}, never, ["*"]>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbIm5ncmlkLmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBJbmplY3RvciwgUXVlcnlMaXN0LCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcywgQ2hhbmdlRGV0ZWN0b3JSZWYsIFRlbXBsYXRlUmVmLCBWaWV3Q29udGFpbmVyUmVmLCBFbWJlZGRlZFZpZXdSZWYsIE5nWm9uZSwgSXRlcmFibGVEaWZmZXJzLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmLCBDZGtSb3dEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC9ncmlkLWV4dC1hcGknO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XHJcbmltcG9ydCB7IFBibE5ncmlkUGFnaW5hdG9yS2luZCB9IGZyb20gJy4uL3BhZ2luYXRvcic7XHJcbmltcG9ydCB7IERhdGFTb3VyY2VQcmVkaWNhdGUsIFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibERhdGFTb3VyY2UsIERhdGFTb3VyY2VPZiB9IGZyb20gJy4uL2RhdGEtc291cmNlL2luZGV4JztcclxuaW1wb3J0IHsgUGJsQ2RrVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQYmxDb2x1bW4sIFBibENvbHVtblN0b3JlLCBQYmxOZ3JpZENvbHVtblNldCwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0IH0gZnJvbSAnLi9jb2x1bW5zJztcclxuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkQ29udGV4dEFwaSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0L2luZGV4JztcclxuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnJztcclxuaW1wb3J0IHsgRHluYW1pY0NvbHVtbldpZHRoTG9naWMgfSBmcm9tICcuL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XHJcbmltcG9ydCB7IENvbHVtbkFwaSwgQXV0b1NpemVUb0ZpdE9wdGlvbnMgfSBmcm9tICcuL2NvbHVtbi1hcGknO1xyXG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93cy9pbmRleCc7XHJcbmltcG9ydCAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnO1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBpbnRlcm5hbEFwaUZhY3RvcnkoZ3JpZDoge1xyXG4gICAgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XHJcbn0pOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+O1xyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBwbHVnaW5Db250cm9sbGVyRmFjdG9yeShncmlkOiB7XHJcbiAgICBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7XHJcbn0pOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8YW55PjtcclxuZXhwb3J0IGRlY2xhcmUgZnVuY3Rpb24gbWV0YVJvd1NlcnZpY2VGYWN0b3J5KGdyaWQ6IHtcclxuICAgIF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xyXG59KTogUGJsTmdyaWRNZXRhUm93U2VydmljZTxhbnk+O1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZENvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgZWxSZWY7XHJcbiAgICBwcml2YXRlIGRpZmZlcnM7XHJcbiAgICBwcml2YXRlIG5nWm9uZTtcclxuICAgIHByaXZhdGUgY2RyO1xyXG4gICAgcHJpdmF0ZSBjb25maWc7XHJcbiAgICByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2U7XHJcbiAgICByZWFkb25seSBpZDogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBTaG93L0hpZGUgdGhlIGhlYWRlciByb3cuXHJcbiAgICAgKiBEZWZhdWx0OiB0cnVlXHJcbiAgICAgKi9cclxuICAgIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW47XHJcbiAgICBzZXQgc2hvd0hlYWRlcih2YWx1ZTogYm9vbGVhbik7XHJcbiAgICBfc2hvd0hlYWRlcjogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU2hvdy9IaWRlIHRoZSBmb290ZXIgcm93LlxyXG4gICAgICogRGVmYXVsdDogZmFsc2VcclxuICAgICAqL1xyXG4gICAgZ2V0IHNob3dGb290ZXIoKTogYm9vbGVhbjtcclxuICAgIHNldCBzaG93Rm9vdGVyKHZhbHVlOiBib29sZWFuKTtcclxuICAgIF9zaG93Rm9vdGVyOiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBXaGVuIHRydWUsIHRoZSBmaWxsZXIgaXMgZGlzYWJsZWQuXHJcbiAgICAgKi9cclxuICAgIGdldCBub0ZpbGxlcigpOiBib29sZWFuO1xyXG4gICAgc2V0IG5vRmlsbGVyKHZhbHVlOiBib29sZWFuKTtcclxuICAgIF9ub0ZpbGxlcjogYm9vbGVhbjtcclxuICAgIC8qKlxyXG4gICAgICogU2V0J3MgdGhlIGJlaGF2aW9yIG9mIHRoZSBncmlkIHdoZW4gdGFiYmluZy5cclxuICAgICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIG5vbmUgKHJvd3MgYW5kIGNlbGxzIGFyZSBub3QgZm9jdXNhYmxlKVxyXG4gICAgICpcclxuICAgICAqIE5vdGUgdGhhdCB0aGUgZm9jdXMgbW9kZSBoYXMgYW4gZWZmZWN0IG9uIG90aGVyIGZ1bmN0aW9ucywgZm9yIGV4YW1wbGUgYSBkZXRhaWwgcm93IHdpbGwgdG9nZ2xlIChvcGVuL2Nsb3NlKSB1c2luZ1xyXG4gICAgICogRU5URVIgLyBTUEFDRSBvbmx5IHdoZW4gZm9jdXNNb2RlIGlzIHNldCB0byBgcm93YC5cclxuICAgICAqL1xyXG4gICAgZm9jdXNNb2RlOiAncm93JyB8ICdjZWxsJyB8ICdub25lJyB8ICcnIHwgZmFsc2UgfCB1bmRlZmluZWQ7XHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBgcEluZGV4YCBpbiB0aGUgY29sdW1uIGRlZmluaXRpb24uIChSZW1vdmVkIGluIDEuMC4wKVxyXG4gICAgICovXHJcbiAgICBnZXQgaWRlbnRpdHlQcm9wKCk6IHN0cmluZztcclxuICAgIHNldCBpZGVudGl0eVByb3AodmFsdWU6IHN0cmluZyk7XHJcbiAgICBwcml2YXRlIF9faWRlbnRpdHlQcm9wO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgZ3JpZCdzIHNvdXJjZSBvZiBkYXRhXHJcbiAgICAgKlxyXG4gICAgICogQHJlbWFya3NcclxuICAgICAqIFRoZSBncmlkJ3Mgc291cmNlIG9mIGRhdGEsIHdoaWNoIGNhbiBiZSBwcm92aWRlZCBpbiAyIHdheXM6XHJcbiAgICAgKlxyXG4gICAgICogLSBEYXRhU291cmNlT2Y8VD5cclxuICAgICAqIC0gUGJsRGF0YVNvdXJjZTxUPlxyXG4gICAgICpcclxuICAgICAqIFRoZSBncmlkIG9ubHkgd29ya3Mgd2l0aCBgUGJsRGF0YVNvdXJjZTxUPmAsIGBEYXRhU291cmNlT2Y8VD5gIGlzIGEgc2hvcnRjdXQgZm9yIHByb3ZpZGluZ1xyXG4gICAgICogdGhlIGRhdGEgYXJyYXkgZGlyZWN0bHkuXHJcbiAgICAgKlxyXG4gICAgICogYERhdGFTb3VyY2VPZjxUPmAgY2FuIGJlOlxyXG4gICAgICpcclxuICAgICAqIC0gU2ltcGxlIGRhdGEgYXJyYXkgKGVhY2ggb2JqZWN0IHJlcHJlc2VudHMgb25lIGdyaWQgcm93KVxyXG4gICAgICogLSBQcm9taXNlIGZvciBhIGRhdGEgYXJyYXlcclxuICAgICAqIC0gU3RyZWFtIHRoYXQgZW1pdHMgYSBkYXRhIGFycmF5IGVhY2ggdGltZSB0aGUgYXJyYXkgY2hhbmdlc1xyXG4gICAgICpcclxuICAgICAqIFdoZW4gYSBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBwcm92aWRlZCBpdCBpcyBjb252ZXJ0ZWQgaW50byBhbiBpbnN0YW5jZSBvZiBgUGJsRGF0YVNvdXJjZTxUPmAuXHJcbiAgICAgKlxyXG4gICAgICogVG8gYWNjZXNzIHRoZSBgUGJsRGF0YVNvdXJjZTxUPmAgaW5zdGFuY2UgdXNlIHRoZSBgZHNgIHByb3BlcnR5IChyZWFkb25seSkuXHJcbiAgICAgKlxyXG4gICAgICogSXQgaXMgaGlnaGx5IHJlY29tbWVuZGVkIHRvIHVzZSBgUGJsRGF0YVNvdXJjZTxUPmAgZGlyZWN0bHksIHRoZSBkYXRhc291cmNlIGZhY3RvcnkgbWFrZXMgaXQgZWFzeS5cclxuICAgICAqIEZvciBleGFtcGxlLCB3aGVuIGFuIGFycmF5IGlzIHByb3ZpZGVkIHRoZSBmYWN0b3J5IGlzIHVzZWQgdG8gY29udmVydCBpdCB0byBhIGRhdGFzb3VyY2U6XHJcbiAgICAgKlxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogY29uc3QgY29sbGVjdGlvbjogVFtdID0gW107XHJcbiAgICAgKiBjb25zdCBwYmxEYXRhU291cmNlID0gY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IGNvbGxlY3Rpb24gKS5jcmVhdGUoKTtcclxuICAgICAqIGBgYFxyXG4gICAgICpcclxuICAgICAqID4gVGhpcyBpcyBhIHdyaXRlLW9ubHkgKHNldHRlcikgcHJvcGVydHkgdGhhdCB0cmlnZ2VycyB0aGUgYHNldERhdGFTb3VyY2VgIG1ldGhvZC5cclxuICAgICAqL1xyXG4gICAgc2V0IGRhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4gfCBEYXRhU291cmNlT2Y8VD4pO1xyXG4gICAgZ2V0IGRzKCk6IFBibERhdGFTb3VyY2U8VD47XHJcbiAgICBnZXQgdXNlUGFnaW5hdGlvbigpOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZTtcclxuICAgIHNldCB1c2VQYWdpbmF0aW9uKHZhbHVlOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSk7XHJcbiAgICBnZXQgbm9DYWNoZVBhZ2luYXRvcigpOiBib29sZWFuO1xyXG4gICAgc2V0IG5vQ2FjaGVQYWdpbmF0b3IodmFsdWU6IGJvb2xlYW4pO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGlzIGdyaWQuXHJcbiAgICAgKi9cclxuICAgIGNvbHVtbnM6IFBibE5ncmlkQ29sdW1uU2V0IHwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0O1xyXG4gICAgc2V0IGhpZGVDb2x1bW5zKHZhbHVlOiBzdHJpbmdbXSk7XHJcbiAgICAvKipcclxuICAgICAqIEEgZmFsbGJhY2sgaGVpZ2h0IGZvciBcInRoZSBpbm5lciBzY3JvbGwgY29udGFpbmVyXCIuXHJcbiAgICAgKiBUaGUgZmFsbGJhY2sgaXMgdXNlZCBvbmx5IHdoZW4gaXQgTE9XRVIgdGhhbiB0aGUgcmVuZGVyZWQgaGVpZ2h0LCBzbyBubyBlbXB0eSBnYXBzIGFyZSBjcmVhdGVkIHdoZW4gc2V0dGluZyB0aGUgZmFsbGJhY2suXHJcbiAgICAgKlxyXG4gICAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIHRoZSBhcmVhIGluIHdoaWNoIGFsbCBkYXRhIHJvd3MgYXJlIHJlbmRlcmVkIGFuZCBhbGwgbWV0YSAoaGVhZGVyL2Zvb3Rlcikgcm93cyB0aGF0IGFyZSBvZiB0eXBlIFwicm93XCIgb3IgXCJzdGlja3lcIi5cclxuICAgICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBkZWZpbmVkIHRvIGNvbnN1bWUgYWxsIHRoZSBoZWlnaHQgbGVmdCBhZnRlciBhbGwgZXh0ZXJuYWwgb2JqZWN0cyBhcmUgcmVuZGVyZWQuXHJcbiAgICAgKiBFeHRlcm5hbCBvYmplY3RzIGNhbiBiZSBmaXhlZCBtZXRhIHJvd3MgKGhlYWRlci9mb290ZXIpLCBwYWdpbmF0aW9uIHJvdywgYWN0aW9uIHJvdyBldGMuLi5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGUgZ3JpZCBkb2VzIG5vdCBoYXZlIGEgaGVpZ2h0ICglIG9yIHB4KSB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBhbHdheXMgaGF2ZSBubyBoZWlnaHQgKDApLlxyXG4gICAgICogSWYgdGhlIGdyaWQgaGFzIGEgaGVpZ2h0LCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBnZXQgdGhlIGhlaWdodCBsZWZ0LCB3aGljaCBjYW4gYWxzbyBiZSAwIGlmIHRoZXJlIGFyZSBhIGxvdCBvZiBleHRlcm5hbCBvYmplY3RzLlxyXG4gICAgICpcclxuICAgICAqIFRvIHNvbHZlIHRoZSBuby1oZWlnaHQgcHJvYmxlbSB3ZSB1c2UgdGhlIGZhbGxiYWNrTWluSGVpZ2h0IHByb3BlcnR5LlxyXG4gICAgICpcclxuICAgICAqIFdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgYW5kIGZhbGxiYWNrTWluSGVpZ2h0IGlzIG5vdCBzZXQgdGhlIGdyaWQgd2lsbCBzZXQgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGhlaWdodCB0byBzaG93IGFsbCByb3dzLlxyXG4gICAgICpcclxuICAgICAqIE5vdGUgdGhhdCB3aGVuIHVzaW5nIGEgZml4ZWQgKHB4KSBoZWlnaHQgZm9yIHRoZSBncmlkLCBpZiB0aGUgaGVpZ2h0IG9mIGFsbCBleHRlcm5hbCBvYmplY3RzICsgdGhlIGhlaWdodCBvZiB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgZ3JlYXRlciB0aGVuXHJcbiAgICAgKiB0aGUgZ3JpZCdzIGhlaWdodCBhIHZlcnRpY2FsIHNjcm9sbCBiYXIgd2lsbCBzaG93LlxyXG4gICAgICogSWYgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwicyBoZWlnaHQgd2lsbCBiZSBsb3dlciB0aGVuIGl0J3MgcmVuZGVyZWQgY29udGVudCBoZWlnaHQgYW5kIGFkZGl0aW9uYWwgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIGFwcGVhciwgd2hpY2ggaXMsIHVzdWFsbHksIG5vdCBnb29kLlxyXG4gICAgICpcclxuICAgICAqIFRvIGF2b2lkIHRoaXMsIGRvbid0IHVzZSBmYWxsYmFja01pbkhlaWdodCB0b2dldGhlciB3aXRoIGEgZml4ZWQgaGVpZ2h0IGZvciB0aGUgZ3JpZC4gSW5zdGVhZCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIG1pbiBoZWlnaHQgZm9yIHRoZSBncmlkLlxyXG4gICAgICovXHJcbiAgICBnZXQgZmFsbGJhY2tNaW5IZWlnaHQoKTogbnVtYmVyO1xyXG4gICAgc2V0IGZhbGxiYWNrTWluSGVpZ2h0KHZhbHVlOiBudW1iZXIpO1xyXG4gICAgcm93Q2xhc3NVcGRhdGU6IHVuZGVmaW5lZCB8ICgoY29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+KSA9PiAoc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHtcclxuICAgICAgICBba2xhc3M6IHN0cmluZ106IGFueTtcclxuICAgIH0pKTtcclxuICAgIHJvd0NsYXNzVXBkYXRlRnJlcTogJ2l0ZW0nIHwgJ25nRG9DaGVjaycgfCAnbm9uZSc7XHJcbiAgICByb3dGb2N1czogMCB8ICcnO1xyXG4gICAgY2VsbEZvY3VzOiAwIHwgJyc7XHJcbiAgICBwcml2YXRlIF9mYWxsYmFja01pbkhlaWdodDtcclxuICAgIHByaXZhdGUgX2RhdGFTb3VyY2U7XHJcbiAgICBfdmNSZWZCZWZvcmVUYWJsZTogVmlld0NvbnRhaW5lclJlZjtcclxuICAgIF92Y1JlZkJlZm9yZUNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgICBfdmNSZWZBZnRlckNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgICBfZmJUYWJsZUNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4+O1xyXG4gICAgX2ZiSGVhZGVyQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+O1xyXG4gICAgX2ZiRm9vdGVyQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+O1xyXG4gICAgX3RhYmxlUm93RGVmOiBDZGtSb3dEZWY8VD47XHJcbiAgICBfaGVhZGVyUm93RGVmczogUXVlcnlMaXN0PENka0hlYWRlclJvd0RlZj47XHJcbiAgICBfZm9vdGVyUm93RGVmczogUXVlcnlMaXN0PENka0Zvb3RlclJvd0RlZj47XHJcbiAgICBnZXQgbWV0YUNvbHVtbklkcygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbklkcyddO1xyXG4gICAgZ2V0IG1ldGFDb2x1bW5zKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1ucyddO1xyXG4gICAgZ2V0IGNvbHVtblJvd0RlZigpOiB7XHJcbiAgICAgICAgaGVhZGVyOiBpbXBvcnQoXCIuL2NvbHVtbnNcIikuUGJsTWV0YVJvd0RlZmluaXRpb25zO1xyXG4gICAgICAgIGZvb3RlcjogaW1wb3J0KFwiLi9jb2x1bW5zXCIpLlBibE1ldGFSb3dEZWZpbml0aW9ucztcclxuICAgIH07XHJcbiAgICAvKipcclxuICAgICAqIFRydWUgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkIChhZnRlciBBZnRlclZpZXdJbml0KVxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBpc0luaXQ6IGJvb2xlYW47XHJcbiAgICByZWFkb25seSBjb2x1bW5BcGk6IENvbHVtbkFwaTxUPjtcclxuICAgIGdldCBjb250ZXh0QXBpKCk6IFBibE5ncmlkQ29udGV4dEFwaTxUPjtcclxuICAgIGdldCB2aWV3cG9ydCgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfCB1bmRlZmluZWQ7XHJcbiAgICBfY2RrVGFibGU6IFBibENka1RhYmxlQ29tcG9uZW50PFQ+O1xyXG4gICAgcHJpdmF0ZSBfc3RvcmU7XHJcbiAgICBwcml2YXRlIF9oaWRlQ29sdW1uc0RpcnR5O1xyXG4gICAgcHJpdmF0ZSBfaGlkZUNvbHVtbnM7XHJcbiAgICBwcml2YXRlIF9jb2xIaWRlRGlmZmVyO1xyXG4gICAgcHJpdmF0ZSBfbm9EYXRlRW1iZWRkZWRWUmVmO1xyXG4gICAgcHJpdmF0ZSBfcGFnaW5hdG9yRW1iZWRkZWRWUmVmO1xyXG4gICAgcHJpdmF0ZSBfcGFnaW5hdGlvbjtcclxuICAgIHByaXZhdGUgX25vQ2FjaGVQYWdpbmF0b3I7XHJcbiAgICBwcml2YXRlIF9taW5pbXVtUm93V2lkdGg7XHJcbiAgICBwcml2YXRlIF92aWV3cG9ydD87XHJcbiAgICBwcml2YXRlIF9wbHVnaW47XHJcbiAgICBwcml2YXRlIF9leHRBcGk7XHJcbiAgICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycywgbmdab25lOiBOZ1pvbmUsIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLCByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsIGlkOiBzdHJpbmcpO1xyXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQ7XHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZDtcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgdHJhY2tCeShpbmRleDogbnVtYmVyLCBpdGVtOiBUKTogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhciB0aGUgY3VycmVudCBzb3J0IGRlZmluaXRpb25zLlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YCwgRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXHJcbiAgICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxyXG4gICAgICovXHJcbiAgICBzZXRTb3J0KHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBzb3J0aW5nIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBvciBgc29ydEFsaWFzYCBwcm9wZXJ0aWVzLlxyXG4gICAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGNvbHVtbk9yU29ydEFsaWFzIEEgY29sdW1uIGluc3RhbmNlIG9yIGEgc3RyaW5nIG1hdGNoaW5nIGBQYmxDb2x1bW4uc29ydEFsaWFzYCBvciBgUGJsQ29sdW1uLmlkYC5cclxuICAgICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxyXG4gICAgICogZGVmYXVsdCB0byBmYWxzZS5cclxuICAgICAqL1xyXG4gICAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhczogUGJsQ29sdW1uIHwgc3RyaW5nLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIENsZWFyIHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXHJcbiAgICAgKlxyXG4gICAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYC5cclxuICAgICAqL1xyXG4gICAgc2V0RmlsdGVyKCk6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgZnVuY3Rpb24gcHJlZGljYXRlLlxyXG4gICAgICpcclxuICAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXHJcbiAgICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxyXG4gICAgICovXHJcbiAgICBzZXRGaWx0ZXIodmFsdWU6IERhdGFTb3VyY2VQcmVkaWNhdGUsIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSB2YWx1ZSB0byBjb21wYXJlIHdpdGggYW5kIGEgbGlzdCBvZiBjb2x1bW5zIHdpdGggdGhlIHZhbHVlcyB0byBjb21wYXJlIHRvLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxyXG4gICAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmBcclxuICAgICAqL1xyXG4gICAgc2V0RmlsdGVyKHZhbHVlOiBhbnksIGNvbHVtbnM6IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkO1xyXG4gICAgc2V0RGF0YVNvdXJjZSh2YWx1ZTogUGJsRGF0YVNvdXJjZTxUPik6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEludmFsaWRhdGVzIHRoZSBoZWFkZXIsIGluY2x1ZGluZyBhIGZ1bGwgcmVidWlsZCBvZiBjb2x1bW4gaGVhZGVyc1xyXG4gICAgICovXHJcbiAgICBpbnZhbGlkYXRlQ29sdW1ucygpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBjb2x1bW4gc2l6ZXMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSBncmlkIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXHJcbiAgICAgKiBUaGUgZmluYWwgd2lkdGggcmVwcmVzZW50IGEgc3RhdGljIHdpZHRoLCBpdCBpcyB0aGUgdmFsdWUgYXMgc2V0IGluIHRoZSBkZWZpbml0aW9uIChleGNlcHQgY29sdW1uIHdpdGhvdXQgd2lkdGgsIHdoZXJlIHRoZSBjYWxjdWxhdGVkIGdsb2JhbCB3aWR0aCBpcyBzZXQpLlxyXG4gICAgICovXHJcbiAgICByZXNldENvbHVtbnNXaWR0aCgpOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGUgdGhlIHNpemUgb2YgYWxsIGdyb3VwIGNvbHVtbnMgaW4gdGhlIGdyaWQgYmFzZWQgb24gdGhlIHNpemUgb2YgdGhlaXIgdmlzaWJsZSBjaGlsZHJlbiAobm90IGhpZGRlbikuXHJcbiAgICAgKiBAcGFyYW0gZHluYW1pY1dpZHRoTG9naWMgLSBPcHRpb25hbCBsb2dpYyBjb250YWluZXIsIGlmIG5vdCBzZXQgYSBuZXcgb25lIGlzIGNyZWF0ZWQuXHJcbiAgICAgKi9cclxuICAgIHN5bmNDb2x1bW5Hcm91cHNTaXplKGR5bmFtaWNXaWR0aExvZ2ljPzogRHluYW1pY0NvbHVtbldpZHRoTG9naWMpOiB2b2lkO1xyXG4gICAgcmVzaXplQ29sdW1ucyhjb2x1bW5zPzogUGJsQ29sdW1uW10pOiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYW4gZW1iZWRkZWQgdmlldyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHVzZXIgcHJvamVjdGVkIGNvbnRlbnQuXHJcbiAgICAgKi9cclxuICAgIGNyZWF0ZVZpZXc8Qz4obG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50JywgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEM+LCBjb250ZXh0PzogQywgaW5kZXg/OiBudW1iZXIpOiBFbWJlZGRlZFZpZXdSZWY8Qz47XHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSBhbiBhbHJlYWR5IGNyZWF0ZWQgZW1iZWRkZWQgdmlldy5cclxuICAgICAqIEBwYXJhbSB2aWV3IC0gVGhlIHZpZXcgdG8gcmVtb3ZlXHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24sIGlmIG5vdCBzZXQgZGVmYXVsdHMgdG8gYGJlZm9yZWBcclxuICAgICAqIEByZXR1cm5zIHRydWUgd2hlbiBhIHZpZXcgd2FzIHJlbW92ZWQsIGZhbHNlIHdoZW4gbm90LiAoZGlkIG5vdCBleGlzdCBpbiB0aGUgdmlldyBjb250YWluZXIgZm9yIHRoZSBwcm92aWRlZCBsb2NhdGlvbilcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVmlldyh2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PiwgbG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50Jyk6IGJvb2xlYW47XHJcbiAgICAvKipcclxuICAgICAqIFJlc2l6ZSBhbGwgdmlzaWJsZSBjb2x1bW5zIHRvIGZpdCBjb250ZW50IG9mIHRoZSBncmlkLlxyXG4gICAgICogQHBhcmFtIGZvcmNlRml4ZWRXaWR0aCAtIFdoZW4gdHJ1ZSB3aWxsIHJlc2l6ZSBhbGwgY29sdW1ucyB3aXRoIGFic29sdXRlIHBpeGVsIHZhbHVlcywgb3RoZXJ3aXNlIHdpbGwga2VlcCB0aGUgc2FtZSBmb3JtYXQgYXMgb3JpZ2luYWxseSBzZXQgKCUgb3Igbm9uZSlcclxuICAgICAqL1xyXG4gICAgYXV0b1NpemVDb2x1bW5Ub0ZpdChvcHRpb25zPzogQXV0b1NpemVUb0ZpdE9wdGlvbnMpOiB2b2lkO1xyXG4gICAgZmluZEluaXRpYWxSb3dIZWlnaHQoKTogbnVtYmVyO1xyXG4gICAgYWRkQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQ7XHJcbiAgICByZW1vdmVDbGFzcyguLi5jbHM6IHN0cmluZ1tdKTogdm9pZDtcclxuICAgIHByaXZhdGUgaW5pdFBsdWdpbnM7XHJcbiAgICBwcml2YXRlIGxpc3RlblRvUmVzaXplO1xyXG4gICAgcHJpdmF0ZSBvblJlc2l6ZTtcclxuICAgIHByaXZhdGUgaW5pdEV4dEFwaTtcclxuICAgIHByaXZhdGUgc2V0dXBOb0RhdGE7XHJcbiAgICBwcml2YXRlIGdldEludGVybmFsVmNSZWY7XHJcbiAgICBwcml2YXRlIHNldHVwUGFnaW5hdG9yO1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzO1xyXG4gICAgcHJpdmF0ZSBhdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzO1xyXG4gICAgcHJpdmF0ZSByZXNldEhlYWRlclJvd0RlZnM7XHJcbiAgICBwcml2YXRlIHJlc2V0Rm9vdGVyUm93RGVmcztcclxufVxyXG4iXX0=