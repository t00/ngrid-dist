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
}
