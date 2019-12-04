import * as tslib_1 from "tslib";
var PblNgridComponent_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import ResizeObserver from 'resize-observer-polyfill';
import { asapScheduler, animationFrameScheduler, fromEventPattern } from 'rxjs';
import { filter, take, tap, observeOn, switchMap, map, mapTo, startWith, pairwise, debounceTime, skip } from 'rxjs/operators';
import { AfterViewInit, Component, ElementRef, Input, Injector, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList, AfterContentInit, ViewEncapsulation, OnChanges, OnDestroy, SimpleChanges, ChangeDetectorRef, TemplateRef, ViewContainerRef, EmbeddedViewRef, NgZone, isDevMode, forwardRef, IterableDiffers, IterableDiffer, DoCheck, Attribute, } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkHeaderRowDef, CdkFooterRowDef, CdkRowDef } from '@angular/cdk/table';
import { UnRx } from '@pebula/utils';
import { EXT_API_TOKEN } from '../ext/grid-ext-api';
import { PblNgridPluginController, PblNgridPluginContext } from '../ext/plugin-control';
import { PblDataSource, createDS } from '../data-source/index';
import { resetColumnWidths } from './utils';
import { findCellDef } from './directives/cell-def';
import { PblColumnStore, isPblColumn } from './columns';
import { ContextApi } from './context/index';
import { PblNgridRegistryService } from './services/grid-registry.service';
import { PblNgridConfigService } from './services/config';
import { DynamicColumnWidthLogic, DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY } from './col-width-logic/dynamic-column-width';
import { ColumnApi } from './column-api';
import { PblNgridMetaRowService } from './meta-rows/index';
import { bindToDataSource } from './bind-to-datasource';
import './bind-to-datasource'; // LEAVE THIS, WE NEED IT SO THE AUGMENTATION IN THE FILE WILL LOAD.
// LEAVE THIS, WE NEED IT SO THE AUGMENTATION IN THE FILE WILL LOAD.
import { setIdentityProp } from './ngrid.deprecate-at-1.0.0';
/**
 * @param {?} grid
 * @return {?}
 */
export function internalApiFactory(grid) { return grid._extApi; }
/**
 * @param {?} grid
 * @return {?}
 */
export function pluginControllerFactory(grid) { return grid._plugin.controller; }
/**
 * @param {?} grid
 * @return {?}
 */
export function metaRowServiceFactory(grid) { return grid._extApi.metaRowService; }
/**
 * @template T
 */
let PblNgridComponent = PblNgridComponent_1 = /**
 * @template T
 */
class PblNgridComponent {
    /**
     * @param {?} injector
     * @param {?} vcRef
     * @param {?} elRef
     * @param {?} differs
     * @param {?} ngZone
     * @param {?} cdr
     * @param {?} config
     * @param {?} registry
     * @param {?} id
     */
    constructor(injector, vcRef, elRef, differs, ngZone, cdr, config, registry, id) {
        this.elRef = elRef;
        this.differs = differs;
        this.ngZone = ngZone;
        this.cdr = cdr;
        this.config = config;
        this.registry = registry;
        this.id = id;
        this.rowClassUpdateFreq = 'item';
        this.rowFocus = '';
        this.cellFocus = '';
        this._fallbackMinHeight = 0;
        this._store = new PblColumnStore();
        this._noCachePaginator = false;
        /** @type {?} */
        const gridConfig = config.get('table');
        this.showHeader = gridConfig.showHeader;
        this.showFooter = gridConfig.showFooter;
        this.noFiller = gridConfig.noFiller;
        this.initExtApi();
        this.columnApi = ColumnApi.create(this, this._store, this._extApi);
        this.initPlugins(injector, elRef, vcRef);
    }
    /**
     * Show/Hide the header row.
     * Default: true
     * @return {?}
     */
    get showHeader() { return this._showHeader; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set showHeader(value) {
        this._showHeader = coerceBooleanProperty(value);
    }
    /**
     * Show/Hide the footer row.
     * Default: false
     * @return {?}
     */
    get showFooter() { return this._showFooter; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set showFooter(value) {
        this._showFooter = coerceBooleanProperty(value);
    }
    /**
     * When true, the filler is disabled.
     * @return {?}
     */
    get noFiller() { return this._noFiller; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set noFiller(value) {
        this._noFiller = coerceBooleanProperty(value);
    }
    /// TODO(shlomiassaf): Remove in 1.0.0
    /**
     * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
     * @return {?}
     */
    get identityProp() { return this.__identityProp; }
    /**
     * @param {?} value
     * @return {?}
     */
    set identityProp(value) { this.__identityProp = value; setIdentityProp(this._store, value); }
    /**
     * The grid's source of data
     *
     * \@remarks
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
     * @param {?} value
     * @return {?}
     */
    set dataSource(value) {
        if (value instanceof PblDataSource) {
            this.setDataSource(value);
        }
        else {
            this.setDataSource(createDS().onTrigger((/**
             * @return {?}
             */
            () => value || [])).create());
        }
    }
    /**
     * @return {?}
     */
    get ds() { return this._dataSource; }
    ;
    /**
     * @return {?}
     */
    get usePagination() { return this._pagination; }
    /**
     * @param {?} value
     * @return {?}
     */
    set usePagination(value) {
        if (((/** @type {?} */ (value))) === '') {
            value = 'pageNumber';
        }
        if (value !== this._pagination) {
            this._pagination = value;
            this.setupPaginator();
        }
    }
    /**
     * @return {?}
     */
    get noCachePaginator() { return this._noCachePaginator; }
    /**
     * @param {?} value
     * @return {?}
     */
    set noCachePaginator(value) {
        value = coerceBooleanProperty(value);
        if (this._noCachePaginator !== value) {
            this._noCachePaginator = value;
            if (this.ds && this.ds.paginator) {
                this.ds.paginator.noCacheMode = value;
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hideColumns(value) {
        this._hideColumns = value;
        this._hideColumnsDirty = true;
    }
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
     * @return {?}
     */
    get fallbackMinHeight() { return this._fallbackMinHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set fallbackMinHeight(value) {
        value = coerceNumberProperty(value);
        if (this._fallbackMinHeight !== value) {
            this._fallbackMinHeight = value;
        }
    }
    /**
     * @return {?}
     */
    get metaColumnIds() { return this._store.metaColumnIds; }
    /**
     * @return {?}
     */
    get metaColumns() { return this._store.metaColumns; }
    /**
     * @return {?}
     */
    get columnRowDef() { return { header: this._store.headerColumnDef, footer: this._store.footerColumnDef }; }
    /**
     * @return {?}
     */
    get contextApi() { return this._extApi.contextApi; }
    /**
     * @return {?}
     */
    get viewport() { return this._viewport; }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this._hideColumnsDirty) {
            this._hideColumnsDirty = false;
            /** @type {?} */
            const value = this._hideColumns;
            if (!this._colHideDiffer && value) {
                try {
                    this._colHideDiffer = this.differs.find(value).create();
                }
                catch (e) {
                    throw new Error(`Cannot find a differ supporting object '${value}. hideColumns only supports binding to Iterables such as Arrays.`);
                }
            }
        }
        if (this._colHideDiffer) {
            /** @type {?} */
            const hideColumns = this._hideColumns || [];
            /** @type {?} */
            const changes = this._colHideDiffer.diff(hideColumns);
            if (changes) {
                this._store.hidden = hideColumns;
                this._minimumRowWidth = '';
                // TODO(shlomiassaf) [perf, 4]: Right now we attach all columns, we can improve it by attaching only those "added" (we know them from "changes")
                this.attachCustomCellTemplates();
                this.attachCustomHeaderCellTemplates();
                this._cdkTable.syncRows('header');
            }
            if (!this._hideColumns) {
                this._colHideDiffer = undefined;
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // no need to unsubscribe, the reg service is per grid instance and it will destroy when this grid destroy.
        // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
        // the order here is very important, because component top of this grid will fire life cycle hooks AFTER this component
        // so if we have a top level component registering a template on top it will not show unless we listen.
        this.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        changes => {
            /** @type {?} */
            let gridCell = false;
            /** @type {?} */
            let headerFooterCell = false;
            for (const c of changes) {
                switch (c.type) {
                    case 'tableCell':
                        gridCell = true;
                        break;
                    case 'headerCell':
                    case 'footerCell':
                        headerFooterCell = true;
                        break;
                    case 'noData':
                        this.setupNoData();
                        break;
                    case 'paginator':
                        this.setupPaginator();
                        break;
                }
            }
            if (gridCell) {
                this.attachCustomCellTemplates();
            }
            if (headerFooterCell) {
                this.attachCustomHeaderCellTemplates();
            }
        }));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.invalidateColumns();
        Object.defineProperty(this, 'isInit', { value: true });
        this._plugin.emitEvent({ kind: 'onInit' });
        this.setupPaginator();
        // Adding a div before the footer row view reference, this div will be used to fill up the space between header & footer rows
        /** @type {?} */
        const div = document.createElement('div');
        div.classList.add('pbl-ngrid-empty-spacer');
        this._cdkTable._element.insertBefore(div, this._cdkTable._footerRowOutlet.elementRef.nativeElement);
        this.listenToResize();
        // The following code will catch context focused events, find the HTML element of the cell and focus it.
        this.contextApi.focusChanged
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.curr) {
                /** @type {?} */
                const rowContext = this.contextApi.findRowInView(event.curr.rowIdent);
                if (rowContext) {
                    /** @type {?} */
                    const view = (/** @type {?} */ (this._cdkTable._rowOutlet.viewContainer.get(rowContext.index)));
                    if (view) {
                        /** @type {?} */
                        const cellViewIndex = this.columnApi.renderIndexOf(this.columnApi.columns[event.curr.colIndex]);
                        /** @type {?} */
                        const cellElement = view.rootNodes[0].querySelectorAll('pbl-ngrid-cell')[cellViewIndex];
                        if (cellElement) {
                            cellElement.focus();
                        }
                    }
                }
            }
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        /** @type {?} */
        let processColumns = false;
        if (changes.focusMode) {
            this.rowFocus = this.focusMode === 'row' ? 0 : '';
            this.cellFocus = this.focusMode === 'cell' ? 0 : '';
        }
        if (changes.columns && this.isInit) {
            processColumns = true;
        }
        if (processColumns === true) {
            this.invalidateColumns();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        /** @type {?} */
        const destroy = (/**
         * @return {?}
         */
        () => {
            this._plugin.destroy();
            if (this._viewport) {
                this._cdkTable.detachViewPort();
            }
        });
        /** @type {?} */
        let p;
        this._plugin.emitEvent({ kind: 'onDestroy', wait: (/**
             * @param {?} _p
             * @return {?}
             */
            (_p) => p = _p) });
        if (p) {
            p.then(destroy).catch(destroy);
        }
        else {
            destroy();
        }
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackBy(index, item) {
        return index;
    }
    /**
     * @param {?=} columnOrSortAlias
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    setSort(columnOrSortAlias, sort, skipUpdate = false) {
        if (!columnOrSortAlias || typeof columnOrSortAlias === 'boolean') {
            this.ds.setSort(!!columnOrSortAlias);
            return;
        }
        /** @type {?} */
        let column;
        if (typeof columnOrSortAlias === 'string') {
            column = this._store.columns.find((/**
             * @param {?} c
             * @return {?}
             */
            c => c.alias ? c.alias === columnOrSortAlias : (c.sort && c.id === columnOrSortAlias)));
            if (!column && isDevMode()) {
                console.warn(`Could not find column with alias "${columnOrSortAlias}".`);
                return;
            }
        }
        else {
            column = columnOrSortAlias;
        }
        this.ds.setSort(column, sort, skipUpdate);
    }
    /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    setFilter(value, columns) {
        if (arguments.length > 0) {
            /** @type {?} */
            let columnInstances;
            if (Array.isArray(columns) && typeof columns[0] === 'string') {
                columnInstances = [];
                for (const colId of columns) {
                    /** @type {?} */
                    const column = this._store.columns.find((/**
                     * @param {?} c
                     * @return {?}
                     */
                    c => c.alias ? c.alias === colId : (c.id === colId)));
                    if (!column && isDevMode()) {
                        console.warn(`Could not find column with alias ${colId} "${colId}".`);
                        return;
                    }
                    columnInstances.push(column);
                }
            }
            else {
                columnInstances = (/** @type {?} */ (columns));
            }
            this.ds.setFilter(value, columnInstances);
        }
        else {
            this.ds.setFilter();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDataSource(value) {
        if (this._dataSource !== value) {
            // KILL ALL subscriptions for the previous datasource.
            if (this._dataSource) {
                UnRx.kill(this, this._dataSource);
            }
            /** @type {?} */
            const prev = this._dataSource;
            this._dataSource = value;
            this._cdkTable.dataSource = (/** @type {?} */ (value));
            this.setupPaginator();
            this.setupNoData(false);
            // clear the context, new datasource
            this._extApi.contextApi.clear();
            this._plugin.emitEvent({
                kind: 'onDataSource',
                prev,
                curr: value
            });
            if (value) {
                if (isDevMode()) {
                    value.onError.pipe(UnRx(this, value)).subscribe(console.error.bind(console));
                }
                // We register to this event because it fires before the entire data-changing process starts.
                // This is required because `onRenderDataChanging` is fired async, just before the data is emitted.
                // Its not enough to clear the context when `setDataSource` is called, we also need to handle `refresh` calls which will not
                // trigger this method.
                value.onSourceChanging.pipe(UnRx(this, value)).subscribe((/**
                 * @return {?}
                 */
                () => this._extApi.contextApi.clear()));
                // Run CD, scheduled as a micro-task, after each rendering
                value.onRenderDataChanging
                    .pipe(filter((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ({ event }) => !event.isInitial && (event.pagination.changed || event.sort.changed || event.filter.changed))), 
                // Context between the operations are not supported at the moment
                // Event for client side operations...
                // TODO: can we remove this? we clear the context with `onSourceChanging`
                tap((/**
                 * @return {?}
                 */
                () => !this._store.primary && this._extApi.contextApi.clear())), switchMap((/**
                 * @return {?}
                 */
                () => value.onRenderedDataChanged.pipe(take(1), mapTo(this.ds.renderLength)))), observeOn(asapScheduler), UnRx(this, value))
                    .subscribe((/**
                 * @param {?} previousRenderLength
                 * @return {?}
                 */
                previousRenderLength => {
                    // If the number of rendered items has changed the grid will update the data and run CD on it.
                    // so we only update the rows.
                    const { cdkTable } = this._extApi;
                    if (previousRenderLength === this.ds.renderLength) {
                        cdkTable.syncRows(true);
                    }
                    else {
                        cdkTable.syncRows('header', true);
                        cdkTable.syncRows('footer', true);
                    }
                }));
                // Handling no data overlay
                // Handling fallback minimum height.
                value.onRenderedDataChanged
                    .pipe(map((/**
                 * @return {?}
                 */
                () => this.ds.renderLength)), startWith(null), pairwise(), tap((/**
                 * @param {?} __0
                 * @return {?}
                 */
                ([prev, curr]) => {
                    /** @type {?} */
                    const noDataShowing = !!this._noDateEmbeddedVRef;
                    if ((curr > 0 && noDataShowing) || (curr === 0 && !noDataShowing)) {
                        this.setupNoData();
                    }
                })), observeOn(animationFrameScheduler), // ww want to give the browser time to remove/add rows
                UnRx(this, value))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const el = this.viewport.elementRef.nativeElement;
                    if (this.ds.renderLength > 0 && this._fallbackMinHeight > 0) {
                        /** @type {?} */
                        const h = Math.min(this._fallbackMinHeight, this.viewport.measureRenderedContentSize());
                        el.style.minHeight = h + 'px';
                    }
                    else {
                        el.style.minHeight = this.viewport.enabled ? null : this.viewport.measureRenderedContentSize() + 'px';
                        // TODO: When viewport is disabled, we can skip the call to measureRenderedContentSize() and let the browser
                        // do the job by setting `contain: unset` in `pbl-cdk-virtual-scroll-viewport`
                        // el.style.minHeight = null;
                        // el.style.contain = this.viewport.enabled ? null : 'unset';
                        // UPDATE: This will not work because it will cause the width to be incorrect when used with vScrollNone
                        // TODO: Check why?
                    }
                }));
            }
        }
    }
    /**
     * Invalidates the header, including a full rebuild of column headers
     * @return {?}
     */
    invalidateColumns() {
        this._plugin.emitEvent({ kind: 'beforeInvalidateHeaders' });
        /** @type {?} */
        const rebuildRows = this._store.allColumns.length > 0;
        this._extApi.contextApi.clear();
        this._store.invalidate(this.columns);
        setIdentityProp(this._store, this.__identityProp); /// TODO(shlomiassaf): Remove in 1.0.0
        this.attachCustomCellTemplates();
        this.attachCustomHeaderCellTemplates();
        this._cdkTable.clearHeaderRowDefs();
        this._cdkTable.clearFooterRowDefs();
        // this.cdr.markForCheck();
        this.cdr.detectChanges();
        // after invalidating the headers we now have optional header/headerGroups/footer rows added
        // we need to update the template with this data which will create new rows (header/footer)
        this.resetHeaderRowDefs();
        this.resetFooterRowDefs();
        this.cdr.markForCheck();
        /*  Now we will force clearing all data rows and creating them back again if this is not the first time we invalidate the columns...
    
            Why? first, some background:
    
            Invalidating the store will result in new `PblColumn` instances (cloned or completely new) held inside a new array (all arrays in the store are re-created on invalidate)
            New array and new instances will also result in new directive instances of `PblNgridColumnDef` for every column.
    
            Each data row has data cells with the `PblNgridCellDirective` directive (`pbl-ngrid-cell`).
            `PblNgridCellDirective` has a reference to `PblNgridColumnDef` through dependency injection, i.e. it will not update through change detection!
    
            Now, the problem:
            The `CdkTable` will cache rows and their cells, reusing them for performance.
            This means that the `PblNgridColumnDef` instance inside each cell will not change.
            So, creating new columns and columnDefs will result in stale cells with reference to dead instances of `PblColumn` and `PblNgridColumnDef`.
    
            One solution is to refactor `PblNgridCellDirective` to get the `PblNgridColumnDef` through data binding.
            While this will work it will put more work on each cell while doing CD and will require complex logic to handle each change because `PblNgridCellDirective`
            also create a context which has reference to a column thus a new context is required.
            Keeping track for all references will be difficult and bugs are likely to occur, which are hard to track.
    
            The simplest solution is to force the grid to render all data rows from scratch which will destroy the cache and all cell's with it, creating new one's with proper reference.
    
            The simple solution is currently preferred because:
    
            - It is easier to implement.
            - It is easier to assess the impact.
            - It effects a single operation (changing to resetting columns) that rarely happen
    
            The only issue is with the `CdkTable` encapsulating the method `_forceRenderDataRows()` which is what we need.
            The workaround is to assign `multiTemplateDataRows` with the same value it already has, which will cause `_forceRenderDataRows` to fire.
            `multiTemplateDataRows` is a getter that triggers `_forceRenderDataRows` without checking the value changed, perfect fit.
            There is a risk with `multiTemplateDataRows` being changed...
         */
        if (rebuildRows) {
            this._cdkTable.multiTemplateDataRows = this._cdkTable.multiTemplateDataRows;
        }
        this._plugin.emitEvent({ kind: 'onInvalidateHeaders' });
    }
    /**
     * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @return {?}
     */
    resetColumnsWidth() {
        resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
    }
    /**
     * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
     * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
     * @return {?}
     */
    syncColumnGroupsSize(dynamicWidthLogic) {
        if (!dynamicWidthLogic) {
            dynamicWidthLogic = this._extApi.dynamicColumnWidthFactory();
        }
        // From all meta columns (header/footer/headerGroup) we filter only `headerGroup` columns.
        // For each we calculate it's width from all of the columns that the headerGroup "groups".
        // We use the same strategy and the same RowWidthDynamicAggregator instance which will prevent duplicate calculations.
        // Note that we might have multiple header groups, i.e. same columns on multiple groups with different row index.
        for (const g of this._store.getAllHeaderGroup()) {
            // We go over all columns because g.columns does not represent the current owned columns of the group
            // it is static, representing the initial state.
            // Only columns hold their group owners.
            // TODO: find way to improve iteration
            /** @type {?} */
            const colSizeInfos = this._store.columns.filter((/**
             * @param {?} c
             * @return {?}
             */
            c => !c.hidden && c.isInGroup(g))).map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.sizeInfo));
            if (colSizeInfos.length > 0) {
                /** @type {?} */
                const groupWidth = dynamicWidthLogic.addGroup(colSizeInfos);
                g.minWidth = groupWidth;
                g.updateWidth(`${groupWidth}px`);
            }
            else {
                g.minWidth = undefined;
                g.updateWidth(`0px`);
            }
        }
    }
    /**
     * @param {?=} columns
     * @return {?}
     */
    resizeColumns(columns) {
        if (!columns) {
            columns = this._store.columns;
        }
        // protect from per-mature resize.
        // Will happen on additional header/header-group rows AND ALSO when vScrollNone is set
        // This will cause size not to populate because it takes time to render the rows, since it's not virtual and happens immediately.
        // TODO: find a better protection.
        if (!columns[0].sizeInfo) {
            return;
        }
        // stores and calculates width for columns added to it. Aggregate's the total width of all added columns.
        /** @type {?} */
        const rowWidth = this._extApi.dynamicColumnWidthFactory();
        this.syncColumnGroupsSize(rowWidth);
        // if this is a grid without groups
        if (rowWidth.minimumRowWidth === 0) {
            rowWidth.addGroup(columns.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.sizeInfo)));
        }
        // if the max lock state has changed we need to update re-calculate the static width's again.
        if (rowWidth.maxWidthLockChanged) {
            resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
            this.resizeColumns(columns);
            return;
        }
        if (!this._minimumRowWidth) {
            // We calculate the total minimum width of the grid
            // We do it once, to set the minimum width based on the initial setup.
            // Note that we don't apply strategy here, we want the entire length of the grid!
            this._cdkTable.minWidth = rowWidth.minimumRowWidth;
        }
        this.ngZone.run((/**
         * @return {?}
         */
        () => {
            this._cdkTable.syncRows('header');
            this._plugin.emitEvent({ kind: 'onResizeRow' });
        }));
    }
    /**
     * Create an embedded view before or after the user projected content.
     * @template C
     * @param {?} location
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    createView(location, templateRef, context, index) {
        /** @type {?} */
        const vcRef = this.getInternalVcRef(location);
        /** @type {?} */
        const view = vcRef.createEmbeddedView(templateRef, context, index);
        view.detectChanges();
        return view;
    }
    /**
     * Remove an already created embedded view.
     * @param {?} view - The view to remove
     * @param {?} location - The location, if not set defaults to `before`
     * @return {?} true when a view was removed, false when not. (did not exist in the view container for the provided location)
     */
    removeView(view, location) {
        /** @type {?} */
        const vcRef = this.getInternalVcRef(location);
        /** @type {?} */
        const idx = vcRef.indexOf(view);
        if (idx === -1) {
            return false;
        }
        else {
            vcRef.remove(idx);
            return true;
        }
    }
    /**
     * Resize all visible columns to fit content of the grid.
     * @param {?=} options
     * @return {?}
     */
    autoSizeColumnToFit(options) {
        const { innerWidth, outerWidth } = this.viewport;
        // calculate auto-size on the width without scroll bar and take box model gaps into account
        // TODO: if no scroll bar exists the calc will not include it, next if more rows are added a scroll bar will appear...
        this.columnApi.autoSizeToFit(outerWidth - (outerWidth - innerWidth), options);
    }
    /**
     * @return {?}
     */
    findInitialRowHeight() {
        /** @type {?} */
        let rowElement;
        if (this._cdkTable._rowOutlet.viewContainer.length) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (this._cdkTable._rowOutlet.viewContainer.get(0)));
            rowElement = viewRef.rootNodes[0];
            /** @type {?} */
            const height = getComputedStyle(rowElement).height;
            return parseInt(height, 10);
        }
        else if (this._vcRefBeforeContent) {
            rowElement = this._vcRefBeforeContent.length > 0
                ? ((/** @type {?} */ (this._vcRefBeforeContent.get(this._vcRefBeforeContent.length - 1)))).rootNodes[0]
                : this._vcRefBeforeContent.element.nativeElement;
            rowElement = (/** @type {?} */ (rowElement.nextElementSibling));
            rowElement.style.display = '';
            /** @type {?} */
            const height = getComputedStyle(rowElement).height;
            rowElement.style.display = 'none';
            return parseInt(height, 10);
        }
    }
    /**
     * @param {...?} cls
     * @return {?}
     */
    addClass(...cls) {
        for (const c of cls) {
            this.elRef.nativeElement.classList.add(c);
        }
    }
    /**
     * @param {...?} cls
     * @return {?}
     */
    removeClass(...cls) {
        for (const c of cls) {
            this.elRef.nativeElement.classList.remove(c);
        }
    }
    /**
     * @private
     * @param {?} injector
     * @param {?} elRef
     * @param {?} vcRef
     * @return {?}
     */
    initPlugins(injector, elRef, vcRef) {
        // Create an injector for the extensions/plugins
        // This injector allow plugins (that choose so) to provide a factory function for runtime use.
        // I.E: as if they we're created by angular via template...
        // This allows seamless plugin-to-plugin dependencies without requiring specific template syntax.
        // And also allows auto plugin binding (app wide) without the need for template syntax.
        /** @type {?} */
        const pluginInjector = Injector.create({
            providers: [
                { provide: ViewContainerRef, useValue: vcRef },
                { provide: ElementRef, useValue: elRef },
                { provide: ChangeDetectorRef, useValue: this.cdr },
            ],
            parent: injector,
        });
        this._plugin = PblNgridPluginContext.create(this, pluginInjector, this._extApi);
        bindToDataSource(this._plugin);
    }
    /**
     * @private
     * @return {?}
     */
    listenToResize() {
        /** @type {?} */
        let resizeObserver;
        /** @type {?} */
        const ro$ = fromEventPattern((/**
         * @param {?} handler
         * @return {?}
         */
        handler => {
            if (!resizeObserver) {
                resizeObserver = new ResizeObserver(handler);
                resizeObserver.observe(this.elRef.nativeElement);
            }
        }), (/**
         * @param {?} handler
         * @return {?}
         */
        handler => {
            if (resizeObserver) {
                resizeObserver.unobserve(this.elRef.nativeElement);
                resizeObserver.disconnect();
                resizeObserver = undefined;
            }
        }));
        // Skip the first emission
        // Debounce all resizes until the next complete animation frame without a resize
        // finally maps to the entries collection
        // SKIP:  We should skip the first emission (`skip(1)`) before we debounce, since its called upon calling "observe" on the resizeObserver.
        //        The problem is that some grid might require this because they do change size.
        //        An example is a grid in a mat-tab that is hidden, the grid will hit the resize one when we focus the tab
        //        which will require a resize handling because it's initial size is 0
        //        To workaround this, we only skip elements not yet added to the DOM, which means they will not trigger a resize event.
        /** @type {?} */
        let skipValue = document.contains(this.elRef.nativeElement) ? 1 : 0;
        ro$
            .pipe(skip(skipValue), debounceTime(0, animationFrameScheduler), UnRx(this))
            .subscribe((/**
         * @param {?} args
         * @return {?}
         */
        (args) => {
            if (skipValue === 0) {
                skipValue = 1;
                /** @type {?} */
                const columns = this._store.columns;
                columns.forEach((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.sizeInfo.updateSize()));
            }
            this.onResize(args[0]);
        }));
    }
    /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    onResize(entries) {
        if (this._viewport) {
            this._viewport.checkViewportSize();
        }
        // this.resetColumnsWidth();
        this.resizeColumns();
    }
    /**
     * @private
     * @return {?}
     */
    initExtApi() {
        /** @type {?} */
        let onInit = [];
        /** @type {?} */
        const extApi = {
            grid: this,
            element: this.elRef.nativeElement,
            /**
             * @return {?}
             */
            get cdkTable() { return extApi.grid._cdkTable; },
            /**
             * @return {?}
             */
            get events() { return extApi.grid._plugin.events; },
            /**
             * @return {?}
             */
            get contextApi() {
                Object.defineProperty(this, 'contextApi', { value: new ContextApi(extApi) });
                return extApi.contextApi;
            },
            /**
             * @return {?}
             */
            get metaRowService() {
                Object.defineProperty(this, 'metaRowService', { value: new PblNgridMetaRowService(extApi) });
                return extApi.metaRowService;
            },
            onInit: (/**
             * @param {?} fn
             * @return {?}
             */
            (fn) => {
                if (extApi.grid.isInit) {
                    fn();
                }
                else {
                    if (onInit.length === 0) {
                        /** @type {?} */
                        let u = extApi.events.subscribe((/**
                         * @param {?} e
                         * @return {?}
                         */
                        e => {
                            if (e.kind === 'onInit') {
                                for (const onInitFn of onInit) {
                                    onInitFn();
                                }
                                u.unsubscribe();
                                onInit = u = undefined;
                            }
                        }));
                    }
                    onInit.push(fn);
                }
            }),
            columnStore: this._store,
            setViewport: (/**
             * @param {?} viewport
             * @return {?}
             */
            (viewport) => this._viewport = viewport),
            dynamicColumnWidthFactory: (/**
             * @return {?}
             */
            () => {
                return new DynamicColumnWidthLogic(DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY);
            })
        };
        this._extApi = extApi;
    }
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    setupNoData(force) {
        if (this._noDateEmbeddedVRef) {
            this.removeView(this._noDateEmbeddedVRef, 'beforeContent');
            this._noDateEmbeddedVRef = undefined;
        }
        if (force === false) {
            return;
        }
        /** @type {?} */
        const noData = this._dataSource && this._dataSource.renderLength === 0;
        if (noData) {
            this.addClass('pbl-ngrid-empty');
        }
        else {
            this.removeClass('pbl-ngrid-empty');
        }
        if (noData || force === true) {
            /** @type {?} */
            const noDataTemplate = this.registry.getSingle('noData');
            if (noDataTemplate) {
                this._noDateEmbeddedVRef = this.createView('beforeContent', noDataTemplate.tRef, { $implicit: this }, 0);
            }
        }
    }
    /**
     * @private
     * @param {?} location
     * @return {?}
     */
    getInternalVcRef(location) {
        return location === 'beforeTable'
            ? this._vcRefBeforeTable
            : location === 'beforeContent' ? this._vcRefBeforeContent : this._vcRefAfterContent;
    }
    /**
     * @private
     * @return {?}
     */
    setupPaginator() {
        /** @type {?} */
        const paginationKillKey = 'pblPaginationKillKey';
        /** @type {?} */
        const usePagination = this.ds && this.usePagination;
        if (usePagination) {
            this.ds.pagination = this._pagination;
            if (this.ds.paginator) {
                this.ds.paginator.noCacheMode = this._noCachePaginator;
            }
        }
        if (this.isInit) {
            UnRx.kill(this, paginationKillKey);
            if (this._paginatorEmbeddedVRef) {
                this.removeView(this._paginatorEmbeddedVRef, 'beforeContent');
                this._paginatorEmbeddedVRef = undefined;
            }
            if (usePagination) {
                /** @type {?} */
                const paginatorTemplate = this.registry.getSingle('paginator');
                if (paginatorTemplate) {
                    this._paginatorEmbeddedVRef = this.createView('beforeContent', paginatorTemplate.tRef, { $implicit: this });
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    attachCustomCellTemplates() {
        for (const col of this._store.columns) {
            /** @type {?} */
            const cell = findCellDef(this.registry, col, 'tableCell', true);
            if (cell) {
                col.cellTpl = cell.tRef;
            }
            else {
                /** @type {?} */
                const defaultCellTemplate = this.registry.getMultiDefault('tableCell');
                col.cellTpl = defaultCellTemplate ? defaultCellTemplate.tRef : this._fbTableCell;
            }
            /** @type {?} */
            const editorCell = findCellDef(this.registry, col, 'editorCell', true);
            if (editorCell) {
                col.editorTpl = editorCell.tRef;
            }
            else {
                /** @type {?} */
                const defaultCellTemplate = this.registry.getMultiDefault('editorCell');
                col.editorTpl = defaultCellTemplate ? defaultCellTemplate.tRef : undefined;
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    attachCustomHeaderCellTemplates() {
        /** @type {?} */
        const columns = [].concat(this._store.columns, this._store.metaColumns);
        /** @type {?} */
        const defaultHeaderCellTemplate = this.registry.getMultiDefault('headerCell') || { tRef: this._fbHeaderCell };
        /** @type {?} */
        const defaultFooterCellTemplate = this.registry.getMultiDefault('footerCell') || { tRef: this._fbFooterCell };
        for (const col of columns) {
            if (isPblColumn(col)) {
                /** @type {?} */
                const headerCellDef = findCellDef(this.registry, col, 'headerCell', true) || defaultHeaderCellTemplate;
                /** @type {?} */
                const footerCellDef = findCellDef(this.registry, col, 'footerCell', true) || defaultFooterCellTemplate;
                col.headerCellTpl = headerCellDef.tRef;
                col.footerCellTpl = footerCellDef.tRef;
            }
            else {
                if (col.header) {
                    /** @type {?} */
                    const headerCellDef = findCellDef(this.registry, col.header, 'headerCell', true) || defaultHeaderCellTemplate;
                    col.header.template = headerCellDef.tRef;
                }
                if (col.headerGroup) {
                    /** @type {?} */
                    const headerCellDef = findCellDef(this.registry, col.headerGroup, 'headerCell', true) || defaultHeaderCellTemplate;
                    col.headerGroup.template = headerCellDef.tRef;
                }
                if (col.footer) {
                    /** @type {?} */
                    const footerCellDef = findCellDef(this.registry, col.footer, 'footerCell', true) || defaultFooterCellTemplate;
                    col.footer.template = footerCellDef.tRef;
                }
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetHeaderRowDefs() {
        if (this._headerRowDefs) {
            // The grid header (main, with column names) is always the last row def (index 0)
            // Because we want it to show last (after custom headers, group headers...) we first need to pull it and then push.
            this._cdkTable.clearHeaderRowDefs();
            /** @type {?} */
            const arr = this._headerRowDefs.toArray();
            arr.push(arr.shift());
            for (const rowDef of arr) {
                this._cdkTable.addHeaderRowDef(rowDef);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    resetFooterRowDefs() {
        if (this._footerRowDefs) {
            this._cdkTable.clearFooterRowDefs();
            for (const rowDef of this._footerRowDefs.toArray()) {
                this._cdkTable.addFooterRowDef(rowDef);
            }
        }
    }
};
PblNgridComponent.ctorParameters = () => [
    { type: Injector },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: IterableDiffers },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: PblNgridConfigService },
    { type: PblNgridRegistryService },
    { type: String }
];
PblNgridComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid',
                template: "<!-- GRID HEADER ROW DEF - THE MAIN HEADER OF THE GRID -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- DUPLICATE HEADER FOR THE MAIN HEADER, NEVER SEEN (NOT VISUAL), USED FOR RESIZING -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds;\"\n                [pblMetaRow]=\"columnRowDef.header\" gridWidthRow\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-row-visually-hidden\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- GRID FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- GRID FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- GRID HEADER CELL DEF -->\n        <pbl-ngrid-header-cell *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- GRID FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
                providers: [
                    PblNgridRegistryService,
                    {
                        provide: PblNgridPluginController,
                        useFactory: pluginControllerFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent_1))],
                    },
                    {
                        provide: EXT_API_TOKEN,
                        useFactory: internalApiFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent_1))],
                    },
                    {
                        provide: PblNgridMetaRowService,
                        useFactory: metaRowServiceFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent_1))],
                    }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["pbl-ngrid{display:block}.pbl-ngrid-row-visually-hidden{border-top:0;border-bottom:0;clip:rect(0 0 0 0);height:0;min-height:0;max-height:0;overflow:hidden!important;visibility:collapse!important;outline:0;-webkit-appearance:none;-moz-appearance:none}.pbl-ngrid-row-hidden{display:none!important}.pbl-ngrid-container{position:relative;height:100%;width:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;box-sizing:border-box;display:-webkit-box;display:flex;overflow:auto;min-height:inherit}.pbl-ngrid-scroll-container{-webkit-box-flex:1;flex:1 1 auto;box-sizing:border-box;min-height:auto}.pbl-ngrid-scroll-container.cdk-virtual-scroll-disabled{-webkit-box-flex:1;flex:1 0 auto}.pbl-ngrid-sticky-row-scroll-container{position:fixed;overflow:hidden}.pbl-ngrid-empty-spacer{display:none}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper{min-height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 1 100%}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>*{-webkit-box-flex:0;flex:0 0 auto}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>.pbl-ngrid-empty-spacer{display:block;-webkit-box-flex:1;flex:1 1 auto}.pbl-ngrid-scrolling pbl-cdk-table{pointer-events:none}"]
            }] }
];
/** @nocollapse */
PblNgridComponent.ctorParameters = () => [
    { type: Injector },
    { type: ViewContainerRef },
    { type: ElementRef },
    { type: IterableDiffers },
    { type: NgZone },
    { type: ChangeDetectorRef },
    { type: PblNgridConfigService },
    { type: PblNgridRegistryService },
    { type: String, decorators: [{ type: Attribute, args: ['id',] }] }
];
PblNgridComponent.propDecorators = {
    showHeader: [{ type: Input }],
    showFooter: [{ type: Input }],
    noFiller: [{ type: Input }],
    focusMode: [{ type: Input }],
    identityProp: [{ type: Input }],
    dataSource: [{ type: Input }],
    usePagination: [{ type: Input }],
    noCachePaginator: [{ type: Input }],
    columns: [{ type: Input }],
    hideColumns: [{ type: Input }],
    fallbackMinHeight: [{ type: Input }],
    rowClassUpdate: [{ type: Input }],
    rowClassUpdateFreq: [{ type: Input }],
    _vcRefBeforeTable: [{ type: ViewChild, args: ['beforeTable', { read: ViewContainerRef, static: true },] }],
    _vcRefBeforeContent: [{ type: ViewChild, args: ['beforeContent', { read: ViewContainerRef, static: true },] }],
    _vcRefAfterContent: [{ type: ViewChild, args: ['afterContent', { read: ViewContainerRef, static: true },] }],
    _fbTableCell: [{ type: ViewChild, args: ['fbTableCell', { read: TemplateRef, static: true },] }],
    _fbHeaderCell: [{ type: ViewChild, args: ['fbHeaderCell', { read: TemplateRef, static: true },] }],
    _fbFooterCell: [{ type: ViewChild, args: ['fbFooterCell', { read: TemplateRef, static: true },] }],
    _tableRowDef: [{ type: ViewChild, args: [CdkRowDef, { static: true },] }],
    _headerRowDefs: [{ type: ViewChildren, args: [CdkHeaderRowDef,] }],
    _footerRowDefs: [{ type: ViewChildren, args: [CdkFooterRowDef,] }]
};
/**
 * @template T
 */
PblNgridComponent = PblNgridComponent_1 = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [Injector, ViewContainerRef,
        ElementRef,
        IterableDiffers,
        NgZone,
        ChangeDetectorRef,
        PblNgridConfigService,
        PblNgridRegistryService, String])
], PblNgridComponent);
export { PblNgridComponent };
if (false) {
    /** @type {?} */
    PblNgridComponent.prototype._showHeader;
    /** @type {?} */
    PblNgridComponent.prototype._showFooter;
    /** @type {?} */
    PblNgridComponent.prototype._noFiller;
    /**
     * Set's the behavior of the grid when tabbing.
     * The default behavior is none (rows and cells are not focusable)
     *
     * Note that the focus mode has an effect on other functions, for example a detail row will toggle (open/close) using
     * ENTER / SPACE only when focusMode is set to `row`.
     * @type {?}
     */
    PblNgridComponent.prototype.focusMode;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.__identityProp;
    /**
     * The column definitions for this grid.
     * @type {?}
     */
    PblNgridComponent.prototype.columns;
    /** @type {?} */
    PblNgridComponent.prototype.rowClassUpdate;
    /** @type {?} */
    PblNgridComponent.prototype.rowClassUpdateFreq;
    /** @type {?} */
    PblNgridComponent.prototype.rowFocus;
    /** @type {?} */
    PblNgridComponent.prototype.cellFocus;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._fallbackMinHeight;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._dataSource;
    /** @type {?} */
    PblNgridComponent.prototype._vcRefBeforeTable;
    /** @type {?} */
    PblNgridComponent.prototype._vcRefBeforeContent;
    /** @type {?} */
    PblNgridComponent.prototype._vcRefAfterContent;
    /** @type {?} */
    PblNgridComponent.prototype._fbTableCell;
    /** @type {?} */
    PblNgridComponent.prototype._fbHeaderCell;
    /** @type {?} */
    PblNgridComponent.prototype._fbFooterCell;
    /** @type {?} */
    PblNgridComponent.prototype._tableRowDef;
    /** @type {?} */
    PblNgridComponent.prototype._headerRowDefs;
    /** @type {?} */
    PblNgridComponent.prototype._footerRowDefs;
    /**
     * True when the component is initialized (after AfterViewInit)
     * @type {?}
     */
    PblNgridComponent.prototype.isInit;
    /** @type {?} */
    PblNgridComponent.prototype.columnApi;
    /** @type {?} */
    PblNgridComponent.prototype._cdkTable;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._store;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._hideColumnsDirty;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._hideColumns;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._colHideDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._noDateEmbeddedVRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._paginatorEmbeddedVRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._pagination;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._noCachePaginator;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._minimumRowWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._viewport;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._plugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype._extApi;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.elRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.differs;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.cdr;
    /**
     * @type {?}
     * @private
     */
    PblNgridComponent.prototype.config;
    /** @type {?} */
    PblNgridComponent.prototype.registry;
    /** @type {?} */
    PblNgridComponent.prototype.id;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUgsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBQ1IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FDM0UsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLHFCQUFxQixDQUFDO0FBQzFFLE9BQU8s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Q2xELG1EQUFxRDs7Ozs7SUFDckQsd0NBQW1EOzs7OztJQUNuRCw4Q0FBa0M7Ozs7O0lBQ2xDLDZDQUFpQzs7Ozs7SUFDakMsc0NBQXlEOzs7OztJQUN6RCxvQ0FBdUM7Ozs7O0lBQ3ZDLG9DQUF5Qzs7Ozs7SUFHN0Isa0NBQXNDOzs7OztJQUN0QyxvQ0FBZ0M7Ozs7O0lBQ2hDLG1DQUFzQjs7Ozs7SUFDdEIsZ0NBQThCOzs7OztJQUM5QixtQ0FBcUM7O0lBQ3JDLHFDQUF3Qzs7SUFDeEMsK0JBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgZnJvbUV2ZW50UGF0dGVybiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCB0YXAsIG9ic2VydmVPbiwgc3dpdGNoTWFwLCBtYXAsIG1hcFRvLCBzdGFydFdpdGgsIHBhaXJ3aXNlLCBkZWJvdW5jZVRpbWUsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3RvcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIE5nWm9uZSxcbiAgaXNEZXZNb2RlLCBmb3J3YXJkUmVmLCBJdGVyYWJsZURpZmZlcnMsIEl0ZXJhYmxlRGlmZmVyLCBEb0NoZWNrLCBBdHRyaWJ1dGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmLCBDZGtSb3dEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfSBmcm9tICcuLi9wYWdpbmF0b3InO1xuaW1wb3J0IHsgRGF0YVNvdXJjZVByZWRpY2F0ZSwgRGF0YVNvdXJjZUZpbHRlclRva2VuLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxEYXRhU291cmNlLCBEYXRhU291cmNlT2YsIGNyZWF0ZURTIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2UvaW5kZXgnO1xuaW1wb3J0IHsgUGJsQ2RrVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgcmVzZXRDb2x1bW5XaWR0aHMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGZpbmRDZWxsRGVmIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NlbGwtZGVmJztcbmltcG9ydCB7IFBibENvbHVtbiwgUGJsQ29sdW1uU3RvcmUsIFBibE1ldGFDb2x1bW5TdG9yZSwgUGJsTmdyaWRDb2x1bW5TZXQsIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCwgaXNQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIENvbnRleHRBcGksIFBibE5ncmlkQ29udGV4dEFwaSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ncmlkLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWcnO1xuaW1wb3J0IHsgRHluYW1pY0NvbHVtbldpZHRoTG9naWMsIERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kgfSBmcm9tICcuL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyBDb2x1bW5BcGksIEF1dG9TaXplVG9GaXRPcHRpb25zIH0gZnJvbSAnLi9jb2x1bW4tYXBpJztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93cy9pbmRleCc7XG5cbmltcG9ydCB7IGJpbmRUb0RhdGFTb3VyY2UgfSBmcm9tICcuL2JpbmQtdG8tZGF0YXNvdXJjZSc7XG5pbXBvcnQgJy4vYmluZC10by1kYXRhc291cmNlJzsgLy8gTEVBVkUgVEhJUywgV0UgTkVFRCBJVCBTTyBUSEUgQVVHTUVOVEFUSU9OIElOIFRIRSBGSUxFIFdJTEwgTE9BRC5cblxuaW1wb3J0IHsgc2V0SWRlbnRpdHlQcm9wIH0gZnJvbSAnLi9uZ3JpZC5kZXByZWNhdGUtYXQtMS4wLjAnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxBcGlGYWN0b3J5KGdyaWQ6IHsgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7IH0pIHsgcmV0dXJuIGdyaWQuX2V4dEFwaTsgfVxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbkNvbnRyb2xsZXJGYWN0b3J5KGdyaWQ6IHsgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0OyB9KSB7IHJldHVybiBncmlkLl9wbHVnaW4uY29udHJvbGxlcjsgfVxuZXhwb3J0IGZ1bmN0aW9uIG1ldGFSb3dTZXJ2aWNlRmFjdG9yeShncmlkOiB7IF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpOyB9KSB7IHJldHVybiBncmlkLl9leHRBcGkubWV0YVJvd1NlcnZpY2U7IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25ncmlkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL25ncmlkLmNvbXBvbmVudC5zY3NzJyBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICB1c2VGYWN0b3J5OiBwbHVnaW5Db250cm9sbGVyRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBFWFRfQVBJX1RPS0VOLFxuICAgICAgdXNlRmFjdG9yeTogaW50ZXJuYWxBcGlGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsXG4gICAgICB1c2VGYWN0b3J5OiBtZXRhUm93U2VydmljZUZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH1cbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29tcG9uZW50PFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBTaG93L0hpZGUgdGhlIGhlYWRlciByb3cuXG4gICAqIERlZmF1bHQ6IHRydWVcbiAgICovXG4gIEBJbnB1dCgpIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0hlYWRlcjsgfTtcbiAgc2V0IHNob3dIZWFkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93SGVhZGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2hvd0hlYWRlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBmb290ZXIgcm93LlxuICAgKiBEZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNob3dGb290ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93Rm9vdGVyOyB9O1xuICBzZXQgc2hvd0Zvb3Rlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dGb290ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaG93Rm9vdGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIHRoZSBmaWxsZXIgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbm9GaWxsZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0ZpbGxlcjsgfTtcbiAgc2V0IG5vRmlsbGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbm9GaWxsZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9ub0ZpbGxlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2V0J3MgdGhlIGJlaGF2aW9yIG9mIHRoZSBncmlkIHdoZW4gdGFiYmluZy5cbiAgICogVGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgbm9uZSAocm93cyBhbmQgY2VsbHMgYXJlIG5vdCBmb2N1c2FibGUpXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgZm9jdXMgbW9kZSBoYXMgYW4gZWZmZWN0IG9uIG90aGVyIGZ1bmN0aW9ucywgZm9yIGV4YW1wbGUgYSBkZXRhaWwgcm93IHdpbGwgdG9nZ2xlIChvcGVuL2Nsb3NlKSB1c2luZ1xuICAgKiBFTlRFUiAvIFNQQUNFIG9ubHkgd2hlbiBmb2N1c01vZGUgaXMgc2V0IHRvIGByb3dgLlxuICAgKi9cbiAgQElucHV0KCkgZm9jdXNNb2RlOiAncm93JyB8ICdjZWxsJyB8ICdub25lJyB8ICcnIHwgZmFsc2UgfCB1bmRlZmluZWQ7XG5cbiAgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgaW4gMS4wLjBcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgcEluZGV4YCBpbiB0aGUgY29sdW1uIGRlZmluaXRpb24uIChSZW1vdmVkIGluIDEuMC4wKVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGlkZW50aXR5UHJvcCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fX2lkZW50aXR5UHJvcDsgfVxuICBzZXQgaWRlbnRpdHlQcm9wKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5fX2lkZW50aXR5UHJvcCA9IHZhbHVlOyBzZXRJZGVudGl0eVByb3AodGhpcy5fc3RvcmUsIHZhbHVlKTsgfVxuICBwcml2YXRlIF9faWRlbnRpdHlQcm9wOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBncmlkJ3Mgc291cmNlIG9mIGRhdGFcbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhlIGdyaWQncyBzb3VyY2Ugb2YgZGF0YSwgd2hpY2ggY2FuIGJlIHByb3ZpZGVkIGluIDIgd2F5czpcbiAgICpcbiAgICogLSBEYXRhU291cmNlT2Y8VD5cbiAgICogLSBQYmxEYXRhU291cmNlPFQ+XG4gICAqXG4gICAqIFRoZSBncmlkIG9ubHkgd29ya3Mgd2l0aCBgUGJsRGF0YVNvdXJjZTxUPmAsIGBEYXRhU291cmNlT2Y8VD5gIGlzIGEgc2hvcnRjdXQgZm9yIHByb3ZpZGluZ1xuICAgKiB0aGUgZGF0YSBhcnJheSBkaXJlY3RseS5cbiAgICpcbiAgICogYERhdGFTb3VyY2VPZjxUPmAgY2FuIGJlOlxuICAgKlxuICAgKiAtIFNpbXBsZSBkYXRhIGFycmF5IChlYWNoIG9iamVjdCByZXByZXNlbnRzIG9uZSBncmlkIHJvdylcbiAgICogLSBQcm9taXNlIGZvciBhIGRhdGEgYXJyYXlcbiAgICogLSBTdHJlYW0gdGhhdCBlbWl0cyBhIGRhdGEgYXJyYXkgZWFjaCB0aW1lIHRoZSBhcnJheSBjaGFuZ2VzXG4gICAqXG4gICAqIFdoZW4gYSBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBwcm92aWRlZCBpdCBpcyBjb252ZXJ0ZWQgaW50byBhbiBpbnN0YW5jZSBvZiBgUGJsRGF0YVNvdXJjZTxUPmAuXG4gICAqXG4gICAqIFRvIGFjY2VzcyB0aGUgYFBibERhdGFTb3VyY2U8VD5gIGluc3RhbmNlIHVzZSB0aGUgYGRzYCBwcm9wZXJ0eSAocmVhZG9ubHkpLlxuICAgKlxuICAgKiBJdCBpcyBoaWdobHkgcmVjb21tZW5kZWQgdG8gdXNlIGBQYmxEYXRhU291cmNlPFQ+YCBkaXJlY3RseSwgdGhlIGRhdGFzb3VyY2UgZmFjdG9yeSBtYWtlcyBpdCBlYXN5LlxuICAgKiBGb3IgZXhhbXBsZSwgd2hlbiBhbiBhcnJheSBpcyBwcm92aWRlZCB0aGUgZmFjdG9yeSBpcyB1c2VkIHRvIGNvbnZlcnQgaXQgdG8gYSBkYXRhc291cmNlOlxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGNvbGxlY3Rpb246IFRbXSA9IFtdO1xuICAgKiBjb25zdCBwYmxEYXRhU291cmNlID0gY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IGNvbGxlY3Rpb24gKS5jcmVhdGUoKTtcbiAgICogYGBgXG4gICAqXG4gICAqID4gVGhpcyBpcyBhIHdyaXRlLW9ubHkgKHNldHRlcikgcHJvcGVydHkgdGhhdCB0cmlnZ2VycyB0aGUgYHNldERhdGFTb3VyY2VgIG1ldGhvZC5cbiAgICovXG4gIEBJbnB1dCgpIHNldCBkYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+IHwgRGF0YVNvdXJjZU9mPFQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUGJsRGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5zZXREYXRhU291cmNlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhU291cmNlKGNyZWF0ZURTPFQ+KCkub25UcmlnZ2VyKCAoKSA9PiB2YWx1ZSB8fCBbXSApLmNyZWF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZHMoKTogUGJsRGF0YVNvdXJjZTxUPiB7IHJldHVybiB0aGlzLl9kYXRhU291cmNlOyB9O1xuXG4gIEBJbnB1dCgpIGdldCB1c2VQYWdpbmF0aW9uKCk6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlIHsgcmV0dXJuIHRoaXMuX3BhZ2luYXRpb247IH1cbiAgc2V0IHVzZVBhZ2luYXRpb24odmFsdWU6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlKSB7XG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpID09PSAnJykge1xuICAgICAgdmFsdWUgPSAncGFnZU51bWJlcic7XG4gICAgfVxuICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3BhZ2luYXRpb24gKSB7XG4gICAgICB0aGlzLl9wYWdpbmF0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IG5vQ2FjaGVQYWdpbmF0b3IoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yOyB9XG4gIHNldCBub0NhY2hlUGFnaW5hdG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9ub0NhY2hlUGFnaW5hdG9yICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbm9DYWNoZVBhZ2luYXRvciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZHMgJiYgdGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhpcyBncmlkLlxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uczogUGJsTmdyaWRDb2x1bW5TZXQgfCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ7XG5cbiAgQElucHV0KCkgc2V0IGhpZGVDb2x1bW5zKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2hpZGVDb2x1bW5zID0gdmFsdWU7XG4gICAgdGhpcy5faGlkZUNvbHVtbnNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQSBmYWxsYmFjayBoZWlnaHQgZm9yIFwidGhlIGlubmVyIHNjcm9sbCBjb250YWluZXJcIi5cbiAgICogVGhlIGZhbGxiYWNrIGlzIHVzZWQgb25seSB3aGVuIGl0IExPV0VSIHRoYW4gdGhlIHJlbmRlcmVkIGhlaWdodCwgc28gbm8gZW1wdHkgZ2FwcyBhcmUgY3JlYXRlZCB3aGVuIHNldHRpbmcgdGhlIGZhbGxiYWNrLlxuICAgKlxuICAgKiBUaGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgdGhlIGFyZWEgaW4gd2hpY2ggYWxsIGRhdGEgcm93cyBhcmUgcmVuZGVyZWQgYW5kIGFsbCBtZXRhIChoZWFkZXIvZm9vdGVyKSByb3dzIHRoYXQgYXJlIG9mIHR5cGUgXCJyb3dcIiBvciBcInN0aWNreVwiLlxuICAgKiBUaGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgZGVmaW5lZCB0byBjb25zdW1lIGFsbCB0aGUgaGVpZ2h0IGxlZnQgYWZ0ZXIgYWxsIGV4dGVybmFsIG9iamVjdHMgYXJlIHJlbmRlcmVkLlxuICAgKiBFeHRlcm5hbCBvYmplY3RzIGNhbiBiZSBmaXhlZCBtZXRhIHJvd3MgKGhlYWRlci9mb290ZXIpLCBwYWdpbmF0aW9uIHJvdywgYWN0aW9uIHJvdyBldGMuLi5cbiAgICpcbiAgICogSWYgdGhlIGdyaWQgZG9lcyBub3QgaGF2ZSBhIGhlaWdodCAoJSBvciBweCkgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIHdpbGwgYWx3YXlzIGhhdmUgbm8gaGVpZ2h0ICgwKS5cbiAgICogSWYgdGhlIGdyaWQgaGFzIGEgaGVpZ2h0LCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBnZXQgdGhlIGhlaWdodCBsZWZ0LCB3aGljaCBjYW4gYWxzbyBiZSAwIGlmIHRoZXJlIGFyZSBhIGxvdCBvZiBleHRlcm5hbCBvYmplY3RzLlxuICAgKlxuICAgKiBUbyBzb2x2ZSB0aGUgbm8taGVpZ2h0IHByb2JsZW0gd2UgdXNlIHRoZSBmYWxsYmFja01pbkhlaWdodCBwcm9wZXJ0eS5cbiAgICpcbiAgICogV2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBkaXNhYmxlZCBhbmQgZmFsbGJhY2tNaW5IZWlnaHQgaXMgbm90IHNldCB0aGUgZ3JpZCB3aWxsIHNldCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaGVpZ2h0IHRvIHNob3cgYWxsIHJvd3MuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIHVzaW5nIGEgZml4ZWQgKHB4KSBoZWlnaHQgZm9yIHRoZSBncmlkLCBpZiB0aGUgaGVpZ2h0IG9mIGFsbCBleHRlcm5hbCBvYmplY3RzICsgdGhlIGhlaWdodCBvZiB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgZ3JlYXRlciB0aGVuXG4gICAqIHRoZSBncmlkJ3MgaGVpZ2h0IGEgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIHNob3cuXG4gICAqIElmIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcInMgaGVpZ2h0IHdpbGwgYmUgbG93ZXIgdGhlbiBpdCdzIHJlbmRlcmVkIGNvbnRlbnQgaGVpZ2h0IGFuZCBhZGRpdGlvbmFsIHZlcnRpY2FsIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIsIHdoaWNoIGlzLCB1c3VhbGx5LCBub3QgZ29vZC5cbiAgICpcbiAgICogVG8gYXZvaWQgdGhpcywgZG9uJ3QgdXNlIGZhbGxiYWNrTWluSGVpZ2h0IHRvZ2V0aGVyIHdpdGggYSBmaXhlZCBoZWlnaHQgZm9yIHRoZSBncmlkLiBJbnN0ZWFkIHVzZSBmYWxsYmFja01pbkhlaWdodCB0b2dldGhlciB3aXRoIGEgbWluIGhlaWdodCBmb3IgdGhlIGdyaWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgZmFsbGJhY2tNaW5IZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0OyB9XG4gIHNldCBmYWxsYmFja01pbkhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSByb3dDbGFzc1VwZGF0ZTogdW5kZWZpbmVkIHwgKCAoY29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+KSA9PiAoIHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gKSk7XG4gIEBJbnB1dCgpIHJvd0NsYXNzVXBkYXRlRnJlcTogJ2l0ZW0nIHwgJ25nRG9DaGVjaycgfCAnbm9uZScgPSAnaXRlbSc7XG5cbiAgcm93Rm9jdXM6IDAgfCAnJyA9ICcnO1xuICBjZWxsRm9jdXM6IDAgfCAnJyA9ICcnO1xuXG4gIHByaXZhdGUgX2ZhbGxiYWNrTWluSGVpZ2h0ID0gMDtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogUGJsRGF0YVNvdXJjZTxUPjtcblxuICBAVmlld0NoaWxkKCdiZWZvcmVUYWJsZScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkJlZm9yZVRhYmxlOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdiZWZvcmVDb250ZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQmVmb3JlQ29udGVudDogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnYWZ0ZXJDb250ZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQWZ0ZXJDb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdmYlRhYmxlQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJUYWJsZUNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4+O1xuICBAVmlld0NoaWxkKCdmYkhlYWRlckNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiSGVhZGVyQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+O1xuICBAVmlld0NoaWxkKCdmYkZvb3RlckNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiRm9vdGVyQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+O1xuICBAVmlld0NoaWxkKENka1Jvd0RlZiwgeyBzdGF0aWM6IHRydWUgfSkgX3RhYmxlUm93RGVmOiBDZGtSb3dEZWY8VD47XG4gIEBWaWV3Q2hpbGRyZW4oQ2RrSGVhZGVyUm93RGVmKSBfaGVhZGVyUm93RGVmczogUXVlcnlMaXN0PENka0hlYWRlclJvd0RlZj47XG4gIEBWaWV3Q2hpbGRyZW4oQ2RrRm9vdGVyUm93RGVmKSBfZm9vdGVyUm93RGVmczogUXVlcnlMaXN0PENka0Zvb3RlclJvd0RlZj47XG5cbiAgZ2V0IG1ldGFDb2x1bW5JZHMoKTogUGJsQ29sdW1uU3RvcmVbJ21ldGFDb2x1bW5JZHMnXSB7IHJldHVybiB0aGlzLl9zdG9yZS5tZXRhQ29sdW1uSWRzOyB9XG4gIGdldCBtZXRhQ29sdW1ucygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbnMnXSB7IHJldHVybiB0aGlzLl9zdG9yZS5tZXRhQ29sdW1uczsgfVxuICBnZXQgY29sdW1uUm93RGVmKCkgeyByZXR1cm4geyBoZWFkZXI6IHRoaXMuX3N0b3JlLmhlYWRlckNvbHVtbkRlZiwgZm9vdGVyOiB0aGlzLl9zdG9yZS5mb290ZXJDb2x1bW5EZWYgfTsgfVxuICAvKipcbiAgICogVHJ1ZSB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQgKGFmdGVyIEFmdGVyVmlld0luaXQpXG4gICAqL1xuICByZWFkb25seSBpc0luaXQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGNvbHVtbkFwaTogQ29sdW1uQXBpPFQ+O1xuICBnZXQgY29udGV4dEFwaSgpOiBQYmxOZ3JpZENvbnRleHRBcGk8VD4geyByZXR1cm4gdGhpcy5fZXh0QXBpLmNvbnRleHRBcGk7IH1cblxuICBnZXQgdmlld3BvcnQoKTogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0OyB9XG5cbiAgX2Nka1RhYmxlOiBQYmxDZGtUYWJsZUNvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBfc3RvcmU6IFBibENvbHVtblN0b3JlID0gbmV3IFBibENvbHVtblN0b3JlKCk7XG4gIHByaXZhdGUgX2hpZGVDb2x1bW5zRGlydHk6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hpZGVDb2x1bW5zOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfY29sSGlkZURpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbm9EYXRlRW1iZWRkZWRWUmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBfcGFnaW5hdG9yRW1iZWRkZWRWUmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBfcGFnaW5hdGlvbjogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2U7XG4gIHByaXZhdGUgX25vQ2FjaGVQYWdpbmF0b3IgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWluaW11bVJvd1dpZHRoOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZpZXdwb3J0PzogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50O1xuICBwcml2YXRlIF9wbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dDtcbiAgcHJpdmF0ZSBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPjtcblxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgICAgICAgQEF0dHJpYnV0ZSgnaWQnKSBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGdyaWRDb25maWcgPSBjb25maWcuZ2V0KCd0YWJsZScpO1xuICAgIHRoaXMuc2hvd0hlYWRlciA9IGdyaWRDb25maWcuc2hvd0hlYWRlcjtcbiAgICB0aGlzLnNob3dGb290ZXIgPSBncmlkQ29uZmlnLnNob3dGb290ZXI7XG4gICAgdGhpcy5ub0ZpbGxlciA9IGdyaWRDb25maWcubm9GaWxsZXI7XG5cbiAgICB0aGlzLmluaXRFeHRBcGkoKTtcbiAgICB0aGlzLmNvbHVtbkFwaSA9IENvbHVtbkFwaS5jcmVhdGU8VD4odGhpcywgdGhpcy5fc3RvcmUsIHRoaXMuX2V4dEFwaSk7XG4gICAgdGhpcy5pbml0UGx1Z2lucyhpbmplY3RvciwgZWxSZWYsIHZjUmVmKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZUNvbHVtbnNEaXJ0eSkge1xuICAgICAgdGhpcy5faGlkZUNvbHVtbnNEaXJ0eSA9IGZhbHNlO1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9oaWRlQ29sdW1ucztcbiAgICAgIGlmICghdGhpcy5fY29sSGlkZURpZmZlciAmJiB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX2NvbEhpZGVEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZSkuY3JlYXRlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGEgZGlmZmVyIHN1cHBvcnRpbmcgb2JqZWN0ICcke3ZhbHVlfS4gaGlkZUNvbHVtbnMgb25seSBzdXBwb3J0cyBiaW5kaW5nIHRvIEl0ZXJhYmxlcyBzdWNoIGFzIEFycmF5cy5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fY29sSGlkZURpZmZlcikge1xuICAgICAgY29uc3QgaGlkZUNvbHVtbnMgPSB0aGlzLl9oaWRlQ29sdW1ucyB8fCBbXTtcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9jb2xIaWRlRGlmZmVyLmRpZmYoaGlkZUNvbHVtbnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuaGlkZGVuID0gaGlkZUNvbHVtbnM7XG4gICAgICAgIHRoaXMuX21pbmltdW1Sb3dXaWR0aCA9ICcnO1xuXG4gICAgICAgIC8vIFRPRE8oc2hsb21pYXNzYWYpIFtwZXJmLCA0XTogUmlnaHQgbm93IHdlIGF0dGFjaCBhbGwgY29sdW1ucywgd2UgY2FuIGltcHJvdmUgaXQgYnkgYXR0YWNoaW5nIG9ubHkgdGhvc2UgXCJhZGRlZFwiICh3ZSBrbm93IHRoZW0gZnJvbSBcImNoYW5nZXNcIilcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX2hpZGVDb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuX2NvbEhpZGVEaWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIG5vIG5lZWQgdG8gdW5zdWJzY3JpYmUsIHRoZSByZWcgc2VydmljZSBpcyBwZXIgZ3JpZCBpbnN0YW5jZSBhbmQgaXQgd2lsbCBkZXN0cm95IHdoZW4gdGhpcyBncmlkIGRlc3Ryb3kuXG4gICAgLy8gQWxzbywgYXQgdGhpcyBwb2ludCBpbml0aWFsIGNoYW5nZXMgZnJvbSB0ZW1wbGF0ZXMgcHJvdmlkZWQgaW4gdGhlIGNvbnRlbnQgYXJlIGFscmVhZHkgaW5zaWRlIHNvIHRoZXkgd2lsbCBub3QgdHJpZ2dlclxuICAgIC8vIHRoZSBvcmRlciBoZXJlIGlzIHZlcnkgaW1wb3J0YW50LCBiZWNhdXNlIGNvbXBvbmVudCB0b3Agb2YgdGhpcyBncmlkIHdpbGwgZmlyZSBsaWZlIGN5Y2xlIGhvb2tzIEFGVEVSIHRoaXMgY29tcG9uZW50XG4gICAgLy8gc28gaWYgd2UgaGF2ZSBhIHRvcCBsZXZlbCBjb21wb25lbnQgcmVnaXN0ZXJpbmcgYSB0ZW1wbGF0ZSBvbiB0b3AgaXQgd2lsbCBub3Qgc2hvdyB1bmxlc3Mgd2UgbGlzdGVuLlxuICAgIHRoaXMucmVnaXN0cnkuY2hhbmdlcy5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgbGV0IGdyaWRDZWxsID0gZmFsc2U7XG4gICAgICBsZXQgaGVhZGVyRm9vdGVyQ2VsbCA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICd0YWJsZUNlbGwnOlxuICAgICAgICAgICAgZ3JpZENlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyQ2VsbCc6XG4gICAgICAgICAgY2FzZSAnZm9vdGVyQ2VsbCc6XG4gICAgICAgICAgICBoZWFkZXJGb290ZXJDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25vRGF0YSc6XG4gICAgICAgICAgICB0aGlzLnNldHVwTm9EYXRhKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYWdpbmF0b3InOlxuICAgICAgICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChncmlkQ2VsbCkge1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgIH1cbiAgICAgIGlmIChoZWFkZXJGb290ZXJDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW52YWxpZGF0ZUNvbHVtbnMoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNJbml0JywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uSW5pdCcgfSk7XG5cbiAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG5cbiAgICAvLyBBZGRpbmcgYSBkaXYgYmVmb3JlIHRoZSBmb290ZXIgcm93IHZpZXcgcmVmZXJlbmNlLCB0aGlzIGRpdiB3aWxsIGJlIHVzZWQgdG8gZmlsbCB1cCB0aGUgc3BhY2UgYmV0d2VlbiBoZWFkZXIgJiBmb290ZXIgcm93c1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtZW1wdHktc3BhY2VyJylcbiAgICB0aGlzLl9jZGtUYWJsZS5fZWxlbWVudC5pbnNlcnRCZWZvcmUoZGl2LCB0aGlzLl9jZGtUYWJsZS5fZm9vdGVyUm93T3V0bGV0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5saXN0ZW5Ub1Jlc2l6ZSgpO1xuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIHdpbGwgY2F0Y2ggY29udGV4dCBmb2N1c2VkIGV2ZW50cywgZmluZCB0aGUgSFRNTCBlbGVtZW50IG9mIHRoZSBjZWxsIGFuZCBmb2N1cyBpdC5cbiAgICB0aGlzLmNvbnRleHRBcGkuZm9jdXNDaGFuZ2VkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5jdXJyKSB7XG4gICAgICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMuY29udGV4dEFwaS5maW5kUm93SW5WaWV3KGV2ZW50LmN1cnIucm93SWRlbnQpO1xuICAgICAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldChyb3dDb250ZXh0LmluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgICAgICAgIGlmICh2aWV3KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxWaWV3SW5kZXggPSB0aGlzLmNvbHVtbkFwaS5yZW5kZXJJbmRleE9mKHRoaXMuY29sdW1uQXBpLmNvbHVtbnNbZXZlbnQuY3Vyci5jb2xJbmRleF0pXG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gdmlldy5yb290Tm9kZXNbMF0ucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLWNlbGwnKVtjZWxsVmlld0luZGV4XTtcbiAgICAgICAgICAgICAgaWYgKGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IHByb2Nlc3NDb2x1bW5zID0gZmFsc2U7XG5cbiAgICBpZiAoY2hhbmdlcy5mb2N1c01vZGUpIHtcbiAgICAgIHRoaXMucm93Rm9jdXMgPSB0aGlzLmZvY3VzTW9kZSA9PT0gJ3JvdycgPyAwIDogJyc7XG4gICAgICB0aGlzLmNlbGxGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAnY2VsbCcgPyAwIDogJyc7XG4gICAgfVxuXG4gICAgaWYgKCBjaGFuZ2VzLmNvbHVtbnMgJiYgdGhpcy5pc0luaXQgKSB7XG4gICAgICBwcm9jZXNzQ29sdW1ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCBwcm9jZXNzQ29sdW1ucyA9PT0gdHJ1ZSApIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUNvbHVtbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcGx1Z2luLmRlc3Ryb3koKTtcbiAgICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5kZXRhY2hWaWV3UG9ydCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcDogUHJvbWlzZTx2b2lkPjtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uRGVzdHJveScsIHdhaXQ6IChfcDogUHJvbWlzZTx2b2lkPikgPT4gcCA9IF9wIH0pO1xuICAgIGlmIChwKSB7XG4gICAgICBwLnRoZW4oZGVzdHJveSkuY2F0Y2goZGVzdHJveSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IFQpOiBhbnkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBzb3J0IGRlZmluaXRpb25zLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0U29ydGBcbiAgICpcbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgc29ydGluZyBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIG9yIGBzb3J0QWxpYXNgIHByb3BlcnRpZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gY29sdW1uT3JTb3J0QWxpYXMgQSBjb2x1bW4gaW5zdGFuY2Ugb3IgYSBzdHJpbmcgbWF0Y2hpbmcgYFBibENvbHVtbi5zb3J0QWxpYXNgIG9yIGBQYmxDb2x1bW4uaWRgLlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM6IFBibENvbHVtbiB8IHN0cmluZywgc29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICBzZXRTb3J0KGNvbHVtbk9yU29ydEFsaWFzPzogUGJsQ29sdW1uIHwgc3RyaW5nIHwgYm9vbGVhbiwgc29ydD86IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghY29sdW1uT3JTb3J0QWxpYXMgfHwgdHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZHMuc2V0U29ydCghIWNvbHVtbk9yU29ydEFsaWFzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29sdW1uOiBQYmxDb2x1bW47XG4gICAgaWYgKHR5cGVvZiBjb2x1bW5PclNvcnRBbGlhcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbHVtbiA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmluZCggYyA9PiBjLmFsaWFzID8gYy5hbGlhcyA9PT0gY29sdW1uT3JTb3J0QWxpYXMgOiAoYy5zb3J0ICYmIGMuaWQgPT09IGNvbHVtbk9yU29ydEFsaWFzKSApO1xuICAgICAgaWYgKCFjb2x1bW4gJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBjb2x1bW4gd2l0aCBhbGlhcyBcIiR7Y29sdW1uT3JTb3J0QWxpYXN9XCIuYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uID0gY29sdW1uT3JTb3J0QWxpYXM7XG4gICAgfVxuICAgIHRoaXMuZHMuc2V0U29ydChjb2x1bW4sIHNvcnQsIHNraXBVcGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCwgRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAuXG4gICAqL1xuICBzZXRGaWx0ZXIoKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgZnVuY3Rpb24gcHJlZGljYXRlLlxuICAgKlxuICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBEYXRhU291cmNlUHJlZGljYXRlLCBjb2x1bW5zPzogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIHZhbHVlIHRvIGNvbXBhcmUgd2l0aCBhbmQgYSBsaXN0IG9mIGNvbHVtbnMgd2l0aCB0aGUgdmFsdWVzIHRvIGNvbXBhcmUgdG8uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBhbnksIGNvbHVtbnM6IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkO1xuICBzZXRGaWx0ZXIodmFsdWU/OiBEYXRhU291cmNlRmlsdGVyVG9rZW4sIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgY29sdW1uSW5zdGFuY2VzOiBQYmxDb2x1bW5bXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbnMpICYmIHR5cGVvZiBjb2x1bW5zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2x1bW5JbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2xJZCA6IChjLmlkID09PSBjb2xJZCkgKTtcbiAgICAgICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBjb2x1bW4gd2l0aCBhbGlhcyAke2NvbElkfSBcIiR7Y29sSWR9XCIuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbHVtbkluc3RhbmNlcy5wdXNoKGNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IGNvbHVtbnMgYXMgYW55O1xuICAgICAgfVxuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIodmFsdWUsIGNvbHVtbkluc3RhbmNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHMuc2V0RmlsdGVyKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YVNvdXJjZSh2YWx1ZTogUGJsRGF0YVNvdXJjZTxUPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSB2YWx1ZSkge1xuICAgICAgLy8gS0lMTCBBTEwgc3Vic2NyaXB0aW9ucyBmb3IgdGhlIHByZXZpb3VzIGRhdGFzb3VyY2UuXG4gICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSkge1xuICAgICAgICBVblJ4LmtpbGwodGhpcywgdGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9kYXRhU291cmNlO1xuICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RrVGFibGUuZGF0YVNvdXJjZSA9IHZhbHVlIGFzIGFueTtcblxuICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgICAgdGhpcy5zZXR1cE5vRGF0YShmYWxzZSk7XG5cbiAgICAgIC8vIGNsZWFyIHRoZSBjb250ZXh0LCBuZXcgZGF0YXNvdXJjZVxuICAgICAgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcblxuICAgICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7XG4gICAgICAgIGtpbmQ6ICdvbkRhdGFTb3VyY2UnLFxuICAgICAgICBwcmV2LFxuICAgICAgICBjdXJyOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICggdmFsdWUgKSB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIHZhbHVlLm9uRXJyb3IucGlwZShVblJ4KHRoaXMsIHZhbHVlKSkuc3Vic2NyaWJlKGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSByZWdpc3RlciB0byB0aGlzIGV2ZW50IGJlY2F1c2UgaXQgZmlyZXMgYmVmb3JlIHRoZSBlbnRpcmUgZGF0YS1jaGFuZ2luZyBwcm9jZXNzIHN0YXJ0cy5cbiAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCBiZWNhdXNlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgaXMgZmlyZWQgYXN5bmMsIGp1c3QgYmVmb3JlIHRoZSBkYXRhIGlzIGVtaXR0ZWQuXG4gICAgICAgIC8vIEl0cyBub3QgZW5vdWdoIHRvIGNsZWFyIHRoZSBjb250ZXh0IHdoZW4gYHNldERhdGFTb3VyY2VgIGlzIGNhbGxlZCwgd2UgYWxzbyBuZWVkIHRvIGhhbmRsZSBgcmVmcmVzaGAgY2FsbHMgd2hpY2ggd2lsbCBub3RcbiAgICAgICAgLy8gdHJpZ2dlciB0aGlzIG1ldGhvZC5cbiAgICAgICAgdmFsdWUub25Tb3VyY2VDaGFuZ2luZy5waXBlKFVuUngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCkgKTtcblxuICAgICAgICAvLyBSdW4gQ0QsIHNjaGVkdWxlZCBhcyBhIG1pY3JvLXRhc2ssIGFmdGVyIGVhY2ggcmVuZGVyaW5nXG4gICAgICAgIHZhbHVlLm9uUmVuZGVyRGF0YUNoYW5naW5nXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoICh7ZXZlbnR9KSA9PiAhZXZlbnQuaXNJbml0aWFsICYmIChldmVudC5wYWdpbmF0aW9uLmNoYW5nZWQgfHwgZXZlbnQuc29ydC5jaGFuZ2VkIHx8IGV2ZW50LmZpbHRlci5jaGFuZ2VkKSksXG4gICAgICAgICAgICAvLyBDb250ZXh0IGJldHdlZW4gdGhlIG9wZXJhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgYXQgdGhlIG1vbWVudFxuICAgICAgICAgICAgLy8gRXZlbnQgZm9yIGNsaWVudCBzaWRlIG9wZXJhdGlvbnMuLi5cbiAgICAgICAgICAgIC8vIFRPRE86IGNhbiB3ZSByZW1vdmUgdGhpcz8gd2UgY2xlYXIgdGhlIGNvbnRleHQgd2l0aCBgb25Tb3VyY2VDaGFuZ2luZ2BcbiAgICAgICAgICAgIHRhcCggKCkgPT4gIXRoaXMuX3N0b3JlLnByaW1hcnkgJiYgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCAoKSA9PiB2YWx1ZS5vblJlbmRlcmVkRGF0YUNoYW5nZWQucGlwZSh0YWtlKDEpLCBtYXBUbyh0aGlzLmRzLnJlbmRlckxlbmd0aCkpICksXG4gICAgICAgICAgICBvYnNlcnZlT24oYXNhcFNjaGVkdWxlciksXG4gICAgICAgICAgICBVblJ4KHRoaXMsIHZhbHVlKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCBwcmV2aW91c1JlbmRlckxlbmd0aCA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIHJlbmRlcmVkIGl0ZW1zIGhhcyBjaGFuZ2VkIHRoZSBncmlkIHdpbGwgdXBkYXRlIHRoZSBkYXRhIGFuZCBydW4gQ0Qgb24gaXQuXG4gICAgICAgICAgICAvLyBzbyB3ZSBvbmx5IHVwZGF0ZSB0aGUgcm93cy5cbiAgICAgICAgICAgIGNvbnN0IHsgY2RrVGFibGUgfSA9IHRoaXMuX2V4dEFwaTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1JlbmRlckxlbmd0aCA9PT0gdGhpcy5kcy5yZW5kZXJMZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3ModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKCdmb290ZXInLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGluZyBubyBkYXRhIG92ZXJsYXlcbiAgICAgICAgLy8gSGFuZGxpbmcgZmFsbGJhY2sgbWluaW11bSBoZWlnaHQuXG4gICAgICAgIHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZFxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKCAoKSA9PiB0aGlzLmRzLnJlbmRlckxlbmd0aCApLFxuICAgICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICAgIHRhcCggKFtwcmV2LCBjdXJyXSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBub0RhdGFTaG93aW5nID0gISF0aGlzLl9ub0RhdGVFbWJlZGRlZFZSZWY7XG4gICAgICAgICAgICAgIGlmICggKGN1cnIgPiAwICYmIG5vRGF0YVNob3dpbmcpIHx8IChjdXJyID09PSAwICYmICFub0RhdGFTaG93aW5nKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTm9EYXRhKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb2JzZXJ2ZU9uKGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSwgLy8gd3cgd2FudCB0byBnaXZlIHRoZSBicm93c2VyIHRpbWUgdG8gcmVtb3ZlL2FkZCByb3dzXG4gICAgICAgICAgICBVblJ4KHRoaXMsIHZhbHVlKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kcy5yZW5kZXJMZW5ndGggPiAwICYmIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCBoID0gTWF0aC5taW4odGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQsIHRoaXMudmlld3BvcnQubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSk7XG4gICAgICAgICAgICAgIGVsLnN0eWxlLm1pbkhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuc3R5bGUubWluSGVpZ2h0ID0gdGhpcy52aWV3cG9ydC5lbmFibGVkID8gbnVsbCA6IHRoaXMudmlld3BvcnQubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSArICdweCc7XG4gICAgICAgICAgICAgIC8vIFRPRE86IFdoZW4gdmlld3BvcnQgaXMgZGlzYWJsZWQsIHdlIGNhbiBza2lwIHRoZSBjYWxsIHRvIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkgYW5kIGxldCB0aGUgYnJvd3NlclxuICAgICAgICAgICAgICAvLyBkbyB0aGUgam9iIGJ5IHNldHRpbmcgYGNvbnRhaW46IHVuc2V0YCBpbiBgcGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydGBcblxuICAgICAgICAgICAgICAvLyBlbC5zdHlsZS5taW5IZWlnaHQgPSBudWxsO1xuICAgICAgICAgICAgICAvLyBlbC5zdHlsZS5jb250YWluID0gdGhpcy52aWV3cG9ydC5lbmFibGVkID8gbnVsbCA6ICd1bnNldCc7XG5cbiAgICAgICAgICAgICAgLy8gVVBEQVRFOiBUaGlzIHdpbGwgbm90IHdvcmsgYmVjYXVzZSBpdCB3aWxsIGNhdXNlIHRoZSB3aWR0aCB0byBiZSBpbmNvcnJlY3Qgd2hlbiB1c2VkIHdpdGggdlNjcm9sbE5vbmVcbiAgICAgICAgICAgICAgLy8gVE9ETzogQ2hlY2sgd2h5P1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlcyB0aGUgaGVhZGVyLCBpbmNsdWRpbmcgYSBmdWxsIHJlYnVpbGQgb2YgY29sdW1uIGhlYWRlcnNcbiAgICovXG4gIGludmFsaWRhdGVDb2x1bW5zKCk6IHZvaWQge1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnYmVmb3JlSW52YWxpZGF0ZUhlYWRlcnMnIH0pO1xuXG4gICAgY29uc3QgcmVidWlsZFJvd3MgPSB0aGlzLl9zdG9yZS5hbGxDb2x1bW5zLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICB0aGlzLl9zdG9yZS5pbnZhbGlkYXRlKHRoaXMuY29sdW1ucyk7XG5cbiAgICBzZXRJZGVudGl0eVByb3AodGhpcy5fc3RvcmUsIHRoaXMuX19pZGVudGl0eVByb3ApOyAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuXG4gICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5fY2RrVGFibGUuY2xlYXJGb290ZXJSb3dEZWZzKCk7XG4gICAgLy8gdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgLy8gYWZ0ZXIgaW52YWxpZGF0aW5nIHRoZSBoZWFkZXJzIHdlIG5vdyBoYXZlIG9wdGlvbmFsIGhlYWRlci9oZWFkZXJHcm91cHMvZm9vdGVyIHJvd3MgYWRkZWRcbiAgICAvLyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgdGVtcGxhdGUgd2l0aCB0aGlzIGRhdGEgd2hpY2ggd2lsbCBjcmVhdGUgbmV3IHJvd3MgKGhlYWRlci9mb290ZXIpXG4gICAgdGhpcy5yZXNldEhlYWRlclJvd0RlZnMoKTtcbiAgICB0aGlzLnJlc2V0Rm9vdGVyUm93RGVmcygpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgLyogIE5vdyB3ZSB3aWxsIGZvcmNlIGNsZWFyaW5nIGFsbCBkYXRhIHJvd3MgYW5kIGNyZWF0aW5nIHRoZW0gYmFjayBhZ2FpbiBpZiB0aGlzIGlzIG5vdCB0aGUgZmlyc3QgdGltZSB3ZSBpbnZhbGlkYXRlIHRoZSBjb2x1bW5zLi4uXG5cbiAgICAgICAgV2h5PyBmaXJzdCwgc29tZSBiYWNrZ3JvdW5kOlxuXG4gICAgICAgIEludmFsaWRhdGluZyB0aGUgc3RvcmUgd2lsbCByZXN1bHQgaW4gbmV3IGBQYmxDb2x1bW5gIGluc3RhbmNlcyAoY2xvbmVkIG9yIGNvbXBsZXRlbHkgbmV3KSBoZWxkIGluc2lkZSBhIG5ldyBhcnJheSAoYWxsIGFycmF5cyBpbiB0aGUgc3RvcmUgYXJlIHJlLWNyZWF0ZWQgb24gaW52YWxpZGF0ZSlcbiAgICAgICAgTmV3IGFycmF5IGFuZCBuZXcgaW5zdGFuY2VzIHdpbGwgYWxzbyByZXN1bHQgaW4gbmV3IGRpcmVjdGl2ZSBpbnN0YW5jZXMgb2YgYFBibE5ncmlkQ29sdW1uRGVmYCBmb3IgZXZlcnkgY29sdW1uLlxuXG4gICAgICAgIEVhY2ggZGF0YSByb3cgaGFzIGRhdGEgY2VsbHMgd2l0aCB0aGUgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgZGlyZWN0aXZlIChgcGJsLW5ncmlkLWNlbGxgKS5cbiAgICAgICAgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgaGFzIGEgcmVmZXJlbmNlIHRvIGBQYmxOZ3JpZENvbHVtbkRlZmAgdGhyb3VnaCBkZXBlbmRlbmN5IGluamVjdGlvbiwgaS5lLiBpdCB3aWxsIG5vdCB1cGRhdGUgdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uIVxuXG4gICAgICAgIE5vdywgdGhlIHByb2JsZW06XG4gICAgICAgIFRoZSBgQ2RrVGFibGVgIHdpbGwgY2FjaGUgcm93cyBhbmQgdGhlaXIgY2VsbHMsIHJldXNpbmcgdGhlbSBmb3IgcGVyZm9ybWFuY2UuXG4gICAgICAgIFRoaXMgbWVhbnMgdGhhdCB0aGUgYFBibE5ncmlkQ29sdW1uRGVmYCBpbnN0YW5jZSBpbnNpZGUgZWFjaCBjZWxsIHdpbGwgbm90IGNoYW5nZS5cbiAgICAgICAgU28sIGNyZWF0aW5nIG5ldyBjb2x1bW5zIGFuZCBjb2x1bW5EZWZzIHdpbGwgcmVzdWx0IGluIHN0YWxlIGNlbGxzIHdpdGggcmVmZXJlbmNlIHRvIGRlYWQgaW5zdGFuY2VzIG9mIGBQYmxDb2x1bW5gIGFuZCBgUGJsTmdyaWRDb2x1bW5EZWZgLlxuXG4gICAgICAgIE9uZSBzb2x1dGlvbiBpcyB0byByZWZhY3RvciBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCB0byBnZXQgdGhlIGBQYmxOZ3JpZENvbHVtbkRlZmAgdGhyb3VnaCBkYXRhIGJpbmRpbmcuXG4gICAgICAgIFdoaWxlIHRoaXMgd2lsbCB3b3JrIGl0IHdpbGwgcHV0IG1vcmUgd29yayBvbiBlYWNoIGNlbGwgd2hpbGUgZG9pbmcgQ0QgYW5kIHdpbGwgcmVxdWlyZSBjb21wbGV4IGxvZ2ljIHRvIGhhbmRsZSBlYWNoIGNoYW5nZSBiZWNhdXNlIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgXG4gICAgICAgIGFsc28gY3JlYXRlIGEgY29udGV4dCB3aGljaCBoYXMgcmVmZXJlbmNlIHRvIGEgY29sdW1uIHRodXMgYSBuZXcgY29udGV4dCBpcyByZXF1aXJlZC5cbiAgICAgICAgS2VlcGluZyB0cmFjayBmb3IgYWxsIHJlZmVyZW5jZXMgd2lsbCBiZSBkaWZmaWN1bHQgYW5kIGJ1Z3MgYXJlIGxpa2VseSB0byBvY2N1ciwgd2hpY2ggYXJlIGhhcmQgdG8gdHJhY2suXG5cbiAgICAgICAgVGhlIHNpbXBsZXN0IHNvbHV0aW9uIGlzIHRvIGZvcmNlIHRoZSBncmlkIHRvIHJlbmRlciBhbGwgZGF0YSByb3dzIGZyb20gc2NyYXRjaCB3aGljaCB3aWxsIGRlc3Ryb3kgdGhlIGNhY2hlIGFuZCBhbGwgY2VsbCdzIHdpdGggaXQsIGNyZWF0aW5nIG5ldyBvbmUncyB3aXRoIHByb3BlciByZWZlcmVuY2UuXG5cbiAgICAgICAgVGhlIHNpbXBsZSBzb2x1dGlvbiBpcyBjdXJyZW50bHkgcHJlZmVycmVkIGJlY2F1c2U6XG5cbiAgICAgICAgLSBJdCBpcyBlYXNpZXIgdG8gaW1wbGVtZW50LlxuICAgICAgICAtIEl0IGlzIGVhc2llciB0byBhc3Nlc3MgdGhlIGltcGFjdC5cbiAgICAgICAgLSBJdCBlZmZlY3RzIGEgc2luZ2xlIG9wZXJhdGlvbiAoY2hhbmdpbmcgdG8gcmVzZXR0aW5nIGNvbHVtbnMpIHRoYXQgcmFyZWx5IGhhcHBlblxuXG4gICAgICAgIFRoZSBvbmx5IGlzc3VlIGlzIHdpdGggdGhlIGBDZGtUYWJsZWAgZW5jYXBzdWxhdGluZyB0aGUgbWV0aG9kIGBfZm9yY2VSZW5kZXJEYXRhUm93cygpYCB3aGljaCBpcyB3aGF0IHdlIG5lZWQuXG4gICAgICAgIFRoZSB3b3JrYXJvdW5kIGlzIHRvIGFzc2lnbiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCB3aXRoIHRoZSBzYW1lIHZhbHVlIGl0IGFscmVhZHkgaGFzLCB3aGljaCB3aWxsIGNhdXNlIGBfZm9yY2VSZW5kZXJEYXRhUm93c2AgdG8gZmlyZS5cbiAgICAgICAgYG11bHRpVGVtcGxhdGVEYXRhUm93c2AgaXMgYSBnZXR0ZXIgdGhhdCB0cmlnZ2VycyBgX2ZvcmNlUmVuZGVyRGF0YVJvd3NgIHdpdGhvdXQgY2hlY2tpbmcgdGhlIHZhbHVlIGNoYW5nZWQsIHBlcmZlY3QgZml0LlxuICAgICAgICBUaGVyZSBpcyBhIHJpc2sgd2l0aCBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBiZWluZyBjaGFuZ2VkLi4uXG4gICAgICovXG4gICAgaWYgKHJlYnVpbGRSb3dzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3MgPSB0aGlzLl9jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gICAgfVxuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25JbnZhbGlkYXRlSGVhZGVycycgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29sdW1uIHNpemVzIGZvciBhbGwgY29sdW1ucyBpbiB0aGUgZ3JpZCBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gbWV0YWRhdGEgZm9yIGVhY2ggY29sdW1uLlxuICAgKiBUaGUgZmluYWwgd2lkdGggcmVwcmVzZW50IGEgc3RhdGljIHdpZHRoLCBpdCBpcyB0aGUgdmFsdWUgYXMgc2V0IGluIHRoZSBkZWZpbml0aW9uIChleGNlcHQgY29sdW1uIHdpdGhvdXQgd2lkdGgsIHdoZXJlIHRoZSBjYWxjdWxhdGVkIGdsb2JhbCB3aWR0aCBpcyBzZXQpLlxuICAgKi9cbiAgcmVzZXRDb2x1bW5zV2lkdGgoKTogdm9pZCB7XG4gICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5fc3RvcmUuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5fc3RvcmUuY29sdW1ucywgdGhpcy5fc3RvcmUubWV0YUNvbHVtbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc2l6ZSBvZiBhbGwgZ3JvdXAgY29sdW1ucyBpbiB0aGUgZ3JpZCBiYXNlZCBvbiB0aGUgc2l6ZSBvZiB0aGVpciB2aXNpYmxlIGNoaWxkcmVuIChub3QgaGlkZGVuKS5cbiAgICogQHBhcmFtIGR5bmFtaWNXaWR0aExvZ2ljIC0gT3B0aW9uYWwgbG9naWMgY29udGFpbmVyLCBpZiBub3Qgc2V0IGEgbmV3IG9uZSBpcyBjcmVhdGVkLlxuICAgKi9cbiAgc3luY0NvbHVtbkdyb3Vwc1NpemUoZHluYW1pY1dpZHRoTG9naWM/OiBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyk6IHZvaWQge1xuICAgIGlmICghZHluYW1pY1dpZHRoTG9naWMpIHtcbiAgICAgIGR5bmFtaWNXaWR0aExvZ2ljID0gdGhpcy5fZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICB9XG5cbiAgICAvLyBGcm9tIGFsbCBtZXRhIGNvbHVtbnMgKGhlYWRlci9mb290ZXIvaGVhZGVyR3JvdXApIHdlIGZpbHRlciBvbmx5IGBoZWFkZXJHcm91cGAgY29sdW1ucy5cbiAgICAvLyBGb3IgZWFjaCB3ZSBjYWxjdWxhdGUgaXQncyB3aWR0aCBmcm9tIGFsbCBvZiB0aGUgY29sdW1ucyB0aGF0IHRoZSBoZWFkZXJHcm91cCBcImdyb3Vwc1wiLlxuICAgIC8vIFdlIHVzZSB0aGUgc2FtZSBzdHJhdGVneSBhbmQgdGhlIHNhbWUgUm93V2lkdGhEeW5hbWljQWdncmVnYXRvciBpbnN0YW5jZSB3aGljaCB3aWxsIHByZXZlbnQgZHVwbGljYXRlIGNhbGN1bGF0aW9ucy5cbiAgICAvLyBOb3RlIHRoYXQgd2UgbWlnaHQgaGF2ZSBtdWx0aXBsZSBoZWFkZXIgZ3JvdXBzLCBpLmUuIHNhbWUgY29sdW1ucyBvbiBtdWx0aXBsZSBncm91cHMgd2l0aCBkaWZmZXJlbnQgcm93IGluZGV4LlxuICAgIGZvciAoY29uc3QgZyBvZiB0aGlzLl9zdG9yZS5nZXRBbGxIZWFkZXJHcm91cCgpKSB7XG4gICAgICAvLyBXZSBnbyBvdmVyIGFsbCBjb2x1bW5zIGJlY2F1c2UgZy5jb2x1bW5zIGRvZXMgbm90IHJlcHJlc2VudCB0aGUgY3VycmVudCBvd25lZCBjb2x1bW5zIG9mIHRoZSBncm91cFxuICAgICAgLy8gaXQgaXMgc3RhdGljLCByZXByZXNlbnRpbmcgdGhlIGluaXRpYWwgc3RhdGUuXG4gICAgICAvLyBPbmx5IGNvbHVtbnMgaG9sZCB0aGVpciBncm91cCBvd25lcnMuXG4gICAgICAvLyBUT0RPOiBmaW5kIHdheSB0byBpbXByb3ZlIGl0ZXJhdGlvblxuICAgICAgY29uc3QgY29sU2l6ZUluZm9zID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maWx0ZXIoIGMgPT4gIWMuaGlkZGVuICYmIGMuaXNJbkdyb3VwKGcpKS5tYXAoIGMgPT4gYy5zaXplSW5mbyApO1xuICAgICAgaWYgKGNvbFNpemVJbmZvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwV2lkdGggPSBkeW5hbWljV2lkdGhMb2dpYy5hZGRHcm91cChjb2xTaXplSW5mb3MpO1xuICAgICAgICBnLm1pbldpZHRoID0gZ3JvdXBXaWR0aDtcbiAgICAgICAgZy51cGRhdGVXaWR0aChgJHtncm91cFdpZHRofXB4YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnLm1pbldpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICBnLnVwZGF0ZVdpZHRoKGAwcHhgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNpemVDb2x1bW5zKGNvbHVtbnM/OiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGlmICghY29sdW1ucykge1xuICAgICAgY29sdW1ucyA9IHRoaXMuX3N0b3JlLmNvbHVtbnM7XG4gICAgfVxuXG4gICAgLy8gcHJvdGVjdCBmcm9tIHBlci1tYXR1cmUgcmVzaXplLlxuICAgIC8vIFdpbGwgaGFwcGVuIG9uIGFkZGl0aW9uYWwgaGVhZGVyL2hlYWRlci1ncm91cCByb3dzIEFORCBBTFNPIHdoZW4gdlNjcm9sbE5vbmUgaXMgc2V0XG4gICAgLy8gVGhpcyB3aWxsIGNhdXNlIHNpemUgbm90IHRvIHBvcHVsYXRlIGJlY2F1c2UgaXQgdGFrZXMgdGltZSB0byByZW5kZXIgdGhlIHJvd3MsIHNpbmNlIGl0J3Mgbm90IHZpcnR1YWwgYW5kIGhhcHBlbnMgaW1tZWRpYXRlbHkuXG4gICAgLy8gVE9ETzogZmluZCBhIGJldHRlciBwcm90ZWN0aW9uLlxuICAgIGlmICghY29sdW1uc1swXS5zaXplSW5mbykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHN0b3JlcyBhbmQgY2FsY3VsYXRlcyB3aWR0aCBmb3IgY29sdW1ucyBhZGRlZCB0byBpdC4gQWdncmVnYXRlJ3MgdGhlIHRvdGFsIHdpZHRoIG9mIGFsbCBhZGRlZCBjb2x1bW5zLlxuICAgIGNvbnN0IHJvd1dpZHRoID0gdGhpcy5fZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICB0aGlzLnN5bmNDb2x1bW5Hcm91cHNTaXplKHJvd1dpZHRoKTtcblxuICAgIC8vIGlmIHRoaXMgaXMgYSBncmlkIHdpdGhvdXQgZ3JvdXBzXG4gICAgaWYgKHJvd1dpZHRoLm1pbmltdW1Sb3dXaWR0aCA9PT0gMCkge1xuICAgICAgcm93V2lkdGguYWRkR3JvdXAoY29sdW1ucy5tYXAoIGMgPT4gYy5zaXplSW5mbyApKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgbWF4IGxvY2sgc3RhdGUgaGFzIGNoYW5nZWQgd2UgbmVlZCB0byB1cGRhdGUgcmUtY2FsY3VsYXRlIHRoZSBzdGF0aWMgd2lkdGgncyBhZ2Fpbi5cbiAgICBpZiAocm93V2lkdGgubWF4V2lkdGhMb2NrQ2hhbmdlZCkge1xuICAgICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5fc3RvcmUuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5fc3RvcmUuY29sdW1ucywgdGhpcy5fc3RvcmUubWV0YUNvbHVtbnMpO1xuICAgICAgdGhpcy5yZXNpemVDb2x1bW5zKGNvbHVtbnMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbWluaW11bVJvd1dpZHRoICkge1xuICAgICAgLy8gV2UgY2FsY3VsYXRlIHRoZSB0b3RhbCBtaW5pbXVtIHdpZHRoIG9mIHRoZSBncmlkXG4gICAgICAvLyBXZSBkbyBpdCBvbmNlLCB0byBzZXQgdGhlIG1pbmltdW0gd2lkdGggYmFzZWQgb24gdGhlIGluaXRpYWwgc2V0dXAuXG4gICAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgYXBwbHkgc3RyYXRlZ3kgaGVyZSwgd2Ugd2FudCB0aGUgZW50aXJlIGxlbmd0aCBvZiB0aGUgZ3JpZCFcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm1pbldpZHRoID0gcm93V2lkdGgubWluaW11bVJvd1dpZHRoO1xuICAgIH1cblxuICAgIHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuICAgICAgdGhpcy5fY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicpO1xuICAgICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvblJlc2l6ZVJvdycgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGVtYmVkZGVkIHZpZXcgYmVmb3JlIG9yIGFmdGVyIHRoZSB1c2VyIHByb2plY3RlZCBjb250ZW50LlxuICAgKi9cbiAgY3JlYXRlVmlldzxDPihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8Qz4sIGNvbnRleHQ/OiBDLCBpbmRleD86IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmdldEludGVybmFsVmNSZWYobG9jYXRpb24pO1xuICAgIGNvbnN0IHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYsIGNvbnRleHQsIGluZGV4KTtcbiAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gYWxyZWFkeSBjcmVhdGVkIGVtYmVkZGVkIHZpZXcuXG4gICAqIEBwYXJhbSB2aWV3IC0gVGhlIHZpZXcgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSBsb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiwgaWYgbm90IHNldCBkZWZhdWx0cyB0byBgYmVmb3JlYFxuICAgKiBAcmV0dXJucyB0cnVlIHdoZW4gYSB2aWV3IHdhcyByZW1vdmVkLCBmYWxzZSB3aGVuIG5vdC4gKGRpZCBub3QgZXhpc3QgaW4gdGhlIHZpZXcgY29udGFpbmVyIGZvciB0aGUgcHJvdmlkZWQgbG9jYXRpb24pXG4gICAqL1xuICByZW1vdmVWaWV3KHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+LCBsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmdldEludGVybmFsVmNSZWYobG9jYXRpb24pO1xuICAgIGNvbnN0IGlkeCA9IHZjUmVmLmluZGV4T2Yodmlldyk7XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmNSZWYucmVtb3ZlKGlkeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIGFsbCB2aXNpYmxlIGNvbHVtbnMgdG8gZml0IGNvbnRlbnQgb2YgdGhlIGdyaWQuXG4gICAqIEBwYXJhbSBmb3JjZUZpeGVkV2lkdGggLSBXaGVuIHRydWUgd2lsbCByZXNpemUgYWxsIGNvbHVtbnMgd2l0aCBhYnNvbHV0ZSBwaXhlbCB2YWx1ZXMsIG90aGVyd2lzZSB3aWxsIGtlZXAgdGhlIHNhbWUgZm9ybWF0IGFzIG9yaWdpbmFsbHkgc2V0ICglIG9yIG5vbmUpXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtblRvRml0KG9wdGlvbnM/OiBBdXRvU2l6ZVRvRml0T3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IHsgaW5uZXJXaWR0aCwgb3V0ZXJXaWR0aCB9ID0gdGhpcy52aWV3cG9ydDtcblxuICAgIC8vIGNhbGN1bGF0ZSBhdXRvLXNpemUgb24gdGhlIHdpZHRoIHdpdGhvdXQgc2Nyb2xsIGJhciBhbmQgdGFrZSBib3ggbW9kZWwgZ2FwcyBpbnRvIGFjY291bnRcbiAgICAvLyBUT0RPOiBpZiBubyBzY3JvbGwgYmFyIGV4aXN0cyB0aGUgY2FsYyB3aWxsIG5vdCBpbmNsdWRlIGl0LCBuZXh0IGlmIG1vcmUgcm93cyBhcmUgYWRkZWQgYSBzY3JvbGwgYmFyIHdpbGwgYXBwZWFyLi4uXG4gICAgdGhpcy5jb2x1bW5BcGkuYXV0b1NpemVUb0ZpdChvdXRlcldpZHRoIC0gKG91dGVyV2lkdGggLSBpbm5lcldpZHRoKSwgb3B0aW9ucyk7XG4gIH1cblxuICBmaW5kSW5pdGlhbFJvd0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCByb3dFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBpZiAodGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5nZXQoMCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICByb3dFbGVtZW50ID0gdmlld1JlZi5yb290Tm9kZXNbMF07XG4gICAgICBjb25zdCBoZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHJvd0VsZW1lbnQpLmhlaWdodDtcbiAgICAgIHJldHVybiBwYXJzZUludChoZWlnaHQsIDEwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCkge1xuICAgICAgcm93RWxlbWVudCA9IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5sZW5ndGggPiAwXG4gICAgICAgID8gKHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5nZXQodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50Lmxlbmd0aCAtIDEpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF1cbiAgICAgICAgOiB0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICA7XG4gICAgICByb3dFbGVtZW50ID0gcm93RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICByb3dFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIGNvbnN0IGhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUocm93RWxlbWVudCkuaGVpZ2h0O1xuICAgICAgcm93RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGhlaWdodCwgMTApO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzKC4uLmNsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xzKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDbGFzcyguLi5jbHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjIG9mIGNscykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGx1Z2lucyhpbmplY3RvcjogSW5qZWN0b3IsIGVsUmVmOiBFbGVtZW50UmVmPGFueT4sIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGFuIGluamVjdG9yIGZvciB0aGUgZXh0ZW5zaW9ucy9wbHVnaW5zXG4gICAgLy8gVGhpcyBpbmplY3RvciBhbGxvdyBwbHVnaW5zICh0aGF0IGNob29zZSBzbykgdG8gcHJvdmlkZSBhIGZhY3RvcnkgZnVuY3Rpb24gZm9yIHJ1bnRpbWUgdXNlLlxuICAgIC8vIEkuRTogYXMgaWYgdGhleSB3ZSdyZSBjcmVhdGVkIGJ5IGFuZ3VsYXIgdmlhIHRlbXBsYXRlLi4uXG4gICAgLy8gVGhpcyBhbGxvd3Mgc2VhbWxlc3MgcGx1Z2luLXRvLXBsdWdpbiBkZXBlbmRlbmNpZXMgd2l0aG91dCByZXF1aXJpbmcgc3BlY2lmaWMgdGVtcGxhdGUgc3ludGF4LlxuICAgIC8vIEFuZCBhbHNvIGFsbG93cyBhdXRvIHBsdWdpbiBiaW5kaW5nIChhcHAgd2lkZSkgd2l0aG91dCB0aGUgbmVlZCBmb3IgdGVtcGxhdGUgc3ludGF4LlxuICAgIGNvbnN0IHBsdWdpbkluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFZpZXdDb250YWluZXJSZWYsIHVzZVZhbHVlOiB2Y1JlZiB9LFxuICAgICAgICB7IHByb3ZpZGU6IEVsZW1lbnRSZWYsIHVzZVZhbHVlOiBlbFJlZiB9LFxuICAgICAgICB7IHByb3ZpZGU6IENoYW5nZURldGVjdG9yUmVmLCB1c2VWYWx1ZTogdGhpcy5jZHIgfSxcbiAgICAgIF0sXG4gICAgICBwYXJlbnQ6IGluamVjdG9yLFxuICAgIH0pO1xuICAgIHRoaXMuX3BsdWdpbiA9IFBibE5ncmlkUGx1Z2luQ29udGV4dC5jcmVhdGUodGhpcywgcGx1Z2luSW5qZWN0b3IsIHRoaXMuX2V4dEFwaSk7XG4gICAgYmluZFRvRGF0YVNvdXJjZSh0aGlzLl9wbHVnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Ub1Jlc2l6ZSgpOiB2b2lkIHtcbiAgICBsZXQgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuICAgIGNvbnN0IHJvJCA9IGZyb21FdmVudFBhdHRlcm48W1Jlc2l6ZU9ic2VydmVyRW50cnlbXSwgUmVzaXplT2JzZXJ2ZXJdPihcbiAgICAgIGhhbmRsZXIgPT4ge1xuICAgICAgICBpZiAoIXJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaGFuZGxlcik7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFuZGxlciA9PiB7XG4gICAgICAgIGlmIChyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBTa2lwIHRoZSBmaXJzdCBlbWlzc2lvblxuICAgIC8vIERlYm91bmNlIGFsbCByZXNpemVzIHVudGlsIHRoZSBuZXh0IGNvbXBsZXRlIGFuaW1hdGlvbiBmcmFtZSB3aXRob3V0IGEgcmVzaXplXG4gICAgLy8gZmluYWxseSBtYXBzIHRvIHRoZSBlbnRyaWVzIGNvbGxlY3Rpb25cbiAgICAvLyBTS0lQOiAgV2Ugc2hvdWxkIHNraXAgdGhlIGZpcnN0IGVtaXNzaW9uIChgc2tpcCgxKWApIGJlZm9yZSB3ZSBkZWJvdW5jZSwgc2luY2UgaXRzIGNhbGxlZCB1cG9uIGNhbGxpbmcgXCJvYnNlcnZlXCIgb24gdGhlIHJlc2l6ZU9ic2VydmVyLlxuICAgIC8vICAgICAgICBUaGUgcHJvYmxlbSBpcyB0aGF0IHNvbWUgZ3JpZCBtaWdodCByZXF1aXJlIHRoaXMgYmVjYXVzZSB0aGV5IGRvIGNoYW5nZSBzaXplLlxuICAgIC8vICAgICAgICBBbiBleGFtcGxlIGlzIGEgZ3JpZCBpbiBhIG1hdC10YWIgdGhhdCBpcyBoaWRkZW4sIHRoZSBncmlkIHdpbGwgaGl0IHRoZSByZXNpemUgb25lIHdoZW4gd2UgZm9jdXMgdGhlIHRhYlxuICAgIC8vICAgICAgICB3aGljaCB3aWxsIHJlcXVpcmUgYSByZXNpemUgaGFuZGxpbmcgYmVjYXVzZSBpdCdzIGluaXRpYWwgc2l6ZSBpcyAwXG4gICAgLy8gICAgICAgIFRvIHdvcmthcm91bmQgdGhpcywgd2Ugb25seSBza2lwIGVsZW1lbnRzIG5vdCB5ZXQgYWRkZWQgdG8gdGhlIERPTSwgd2hpY2ggbWVhbnMgdGhleSB3aWxsIG5vdCB0cmlnZ2VyIGEgcmVzaXplIGV2ZW50LlxuICAgIGxldCBza2lwVmFsdWUgPSBkb2N1bWVudC5jb250YWlucyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpID8gMSA6IDA7XG5cbiAgICBybyRcbiAgICAgIC5waXBlKFxuICAgICAgICBza2lwKHNraXBWYWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgwLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciksXG4gICAgICAgIFVuUngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoYXJnczogW1Jlc2l6ZU9ic2VydmVyRW50cnlbXSwgUmVzaXplT2JzZXJ2ZXJdKSA9PiB7XG4gICAgICAgIGlmIChza2lwVmFsdWUgPT09IDApIHtcbiAgICAgICAgICBza2lwVmFsdWUgPSAxO1xuICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLl9zdG9yZS5jb2x1bW5zO1xuICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCggYyA9PiBjLnNpemVJbmZvLnVwZGF0ZVNpemUoKSApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25SZXNpemUoYXJnc1swXSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25SZXNpemUoZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICB0aGlzLl92aWV3cG9ydC5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIH1cbiAgICAvLyB0aGlzLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRFeHRBcGkoKTogdm9pZCB7XG4gICAgbGV0IG9uSW5pdDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcbiAgICBjb25zdCBleHRBcGkgPSB7XG4gICAgICBncmlkOiB0aGlzLFxuICAgICAgZWxlbWVudDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZ2V0IGNka1RhYmxlKCkgeyByZXR1cm4gZXh0QXBpLmdyaWQuX2Nka1RhYmxlOyB9LFxuICAgICAgZ2V0IGV2ZW50cygpIHsgcmV0dXJuIGV4dEFwaS5ncmlkLl9wbHVnaW4uZXZlbnRzIH0sXG4gICAgICBnZXQgY29udGV4dEFwaSgpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb250ZXh0QXBpJywgeyB2YWx1ZTogbmV3IENvbnRleHRBcGk8VD4oZXh0QXBpKSB9KTtcbiAgICAgICAgcmV0dXJuIGV4dEFwaS5jb250ZXh0QXBpO1xuICAgICAgfSxcbiAgICAgIGdldCBtZXRhUm93U2VydmljZSgpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXRhUm93U2VydmljZScsIHsgdmFsdWU6IG5ldyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlPFQ+KGV4dEFwaSkgfSk7XG4gICAgICAgIHJldHVybiBleHRBcGkubWV0YVJvd1NlcnZpY2U7XG4gICAgICB9LFxuICAgICAgb25Jbml0OiAoZm46ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgaWYgKGV4dEFwaS5ncmlkLmlzSW5pdCkge1xuICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9uSW5pdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCB1ID0gZXh0QXBpLmV2ZW50cy5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb25Jbml0Rm4gb2Ygb25Jbml0KSB7XG4gICAgICAgICAgICAgICAgICBvbkluaXRGbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgb25Jbml0ID0gdSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uSW5pdC5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbHVtblN0b3JlOiB0aGlzLl9zdG9yZSxcbiAgICAgIHNldFZpZXdwb3J0OiAodmlld3BvcnQpID0+IHRoaXMuX3ZpZXdwb3J0ID0gdmlld3BvcnQsXG4gICAgICBkeW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5OiAoKTogRHluYW1pY0NvbHVtbldpZHRoTG9naWMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZXh0QXBpID0gZXh0QXBpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE5vRGF0YShmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmKSB7XG4gICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9EYXRhID0gdGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLnJlbmRlckxlbmd0aCA9PT0gMDtcbiAgICBpZiAobm9EYXRhKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKCdwYmwtbmdyaWQtZW1wdHknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vRGF0YSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgbm9EYXRhVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgnbm9EYXRhJyk7XG4gICAgICBpZiAobm9EYXRhVGVtcGxhdGUpIHtcbiAgICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50Jywgbm9EYXRhVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gbG9jYXRpb24gPT09ICdiZWZvcmVUYWJsZSdcbiAgICAgID8gdGhpcy5fdmNSZWZCZWZvcmVUYWJsZVxuICAgICAgOiBsb2NhdGlvbiA9PT0gJ2JlZm9yZUNvbnRlbnQnID8gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50IDogdGhpcy5fdmNSZWZBZnRlckNvbnRlbnRcbiAgICA7XG4gIH1cblxuICBwcml2YXRlIHNldHVwUGFnaW5hdG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHBhZ2luYXRpb25LaWxsS2V5ID0gJ3BibFBhZ2luYXRpb25LaWxsS2V5JztcbiAgICBjb25zdCB1c2VQYWdpbmF0aW9uID0gdGhpcy5kcyAmJiB0aGlzLnVzZVBhZ2luYXRpb247XG5cbiAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgdGhpcy5kcy5wYWdpbmF0aW9uID0gdGhpcy5fcGFnaW5hdGlvbjtcbiAgICAgIGlmICh0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJbml0KSB7XG4gICAgICBVblJ4LmtpbGwodGhpcywgcGFnaW5hdGlvbktpbGxLZXkpO1xuICAgICAgaWYgKHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZikge1xuICAgICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgICB0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgICBjb25zdCBwYWdpbmF0b3JUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0U2luZ2xlKCdwYWdpbmF0b3InKTtcbiAgICAgICAgaWYgKHBhZ2luYXRvclRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50JywgcGFnaW5hdG9yVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5fc3RvcmUuY29sdW1ucykge1xuICAgICAgY29uc3QgY2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ3RhYmxlQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBjZWxsICkge1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgndGFibGVDZWxsJyk7XG4gICAgICAgIGNvbC5jZWxsVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHRoaXMuX2ZiVGFibGVDZWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlZGl0b3JDZWxsID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLCAnZWRpdG9yQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBlZGl0b3JDZWxsICkge1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZWRpdG9yQ2VsbC50UmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdENlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdlZGl0b3JDZWxsJyk7XG4gICAgICAgIGNvbC5lZGl0b3JUcGwgPSBkZWZhdWx0Q2VsbFRlbXBsYXRlID8gZGVmYXVsdENlbGxUZW1wbGF0ZS50UmVmIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW5zOiBBcnJheTxQYmxDb2x1bW4gfCBQYmxNZXRhQ29sdW1uU3RvcmU+ID0gW10uY29uY2F0KHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgICBjb25zdCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2hlYWRlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiSGVhZGVyQ2VsbCB9O1xuICAgIGNvbnN0IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZm9vdGVyQ2VsbCcpIHx8IHsgdFJlZjogdGhpcy5fZmJGb290ZXJDZWxsIH07XG4gICAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xuICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb25zdCBmb290ZXJDZWxsRGVmID0gZmluZENlbGxEZWY8VD4odGhpcy5yZWdpc3RyeSwgY29sLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgIGNvbC5oZWFkZXJDZWxsVHBsID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICBjb2wuZm9vdGVyQ2VsbFRwbCA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2wuaGVhZGVyKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXIsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuaGVhZGVyLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgICBjb25zdCBoZWFkZXJDZWxsRGVmID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLmhlYWRlckdyb3VwLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlckdyb3VwLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuZm9vdGVyKSB7XG4gICAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5mb290ZXIsICdmb290ZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEZvb3RlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuZm9vdGVyLnRlbXBsYXRlID0gZm9vdGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhlYWRlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd0RlZnMpIHtcbiAgICAgIC8vIFRoZSBncmlkIGhlYWRlciAobWFpbiwgd2l0aCBjb2x1bW4gbmFtZXMpIGlzIGFsd2F5cyB0aGUgbGFzdCByb3cgZGVmIChpbmRleCAwKVxuICAgICAgLy8gQmVjYXVzZSB3ZSB3YW50IGl0IHRvIHNob3cgbGFzdCAoYWZ0ZXIgY3VzdG9tIGhlYWRlcnMsIGdyb3VwIGhlYWRlcnMuLi4pIHdlIGZpcnN0IG5lZWQgdG8gcHVsbCBpdCBhbmQgdGhlbiBwdXNoLlxuXG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckhlYWRlclJvd0RlZnMoKTtcbiAgICAgIGNvbnN0IGFyciA9IHRoaXMuX2hlYWRlclJvd0RlZnMudG9BcnJheSgpO1xuICAgICAgYXJyLnB1c2goYXJyLnNoaWZ0KCkpO1xuXG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBhcnIpIHtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuYWRkSGVhZGVyUm93RGVmKHJvd0RlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZvb3RlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Zvb3RlclJvd0RlZnMpIHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFyRm9vdGVyUm93RGVmcygpO1xuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgdGhpcy5fZm9vdGVyUm93RGVmcy50b0FycmF5KCkpIHtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuYWRkRm9vdGVyUm93RGVmKHJvd0RlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=