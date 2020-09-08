/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/ngrid.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import ResizeObserver from 'resize-observer-polyfill';
import { asapScheduler, animationFrameScheduler, fromEventPattern } from 'rxjs';
import { filter, take, tap, observeOn, switchMap, map, mapTo, startWith, pairwise, debounceTime, skip } from 'rxjs/operators';
import { Component, ElementRef, Input, Injector, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectorRef, TemplateRef, ViewContainerRef, NgZone, isDevMode, forwardRef, IterableDiffers, Attribute, } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { CdkHeaderRowDef, CdkFooterRowDef, CdkRowDef } from '@angular/cdk/table';
import { unrx } from './utils';
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
export class PblNgridComponent {
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
            unrx.kill(this);
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
                unrx.kill(this, this._dataSource);
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
                    value.onError.pipe(unrx(this, value)).subscribe(console.error.bind(console));
                }
                // We register to this event because it fires before the entire data-changing process starts.
                // This is required because `onRenderDataChanging` is fired async, just before the data is emitted.
                // Its not enough to clear the context when `setDataSource` is called, we also need to handle `refresh` calls which will not
                // trigger this method.
                value.onSourceChanging.pipe(unrx(this, value)).subscribe((/**
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
                () => value.onRenderedDataChanged.pipe(take(1), mapTo(this.ds.renderLength)))), observeOn(asapScheduler), unrx(this, value))
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
                unrx(this, value))
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
        let skipValue = document.body.contains(this.elRef.nativeElement) ? 1 : 0;
        ro$
            .pipe(skip(skipValue), debounceTime(0, animationFrameScheduler), unrx(this))
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
            unrx.kill(this, paginationKillKey);
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
}
PblNgridComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid',
                template: "<!-- GRID HEADER ROW DEF - THE MAIN HEADER OF THE GRID -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- DUPLICATE HEADER FOR THE MAIN HEADER, NEVER SEEN (NOT VISUAL), USED FOR RESIZING -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds;\"\n                [pblMetaRow]=\"columnRowDef.header\" gridWidthRow\n                data-rowtype=\"header\"\n                style=\"visibility: hidden !important;\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-row-visually-hidden\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- GRID FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- GRID FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- GRID HEADER CELL DEF -->\n        <pbl-ngrid-header-cell *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- GRID FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- GRID RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
                providers: [
                    PblNgridRegistryService,
                    {
                        provide: PblNgridPluginController,
                        useFactory: pluginControllerFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent))],
                    },
                    {
                        provide: EXT_API_TOKEN,
                        useFactory: internalApiFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent))],
                    },
                    {
                        provide: PblNgridMetaRowService,
                        useFactory: metaRowServiceFactory,
                        deps: [forwardRef((/**
                             * @return {?}
                             */
                            () => PblNgridComponent))],
                    }
                ],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: ["pbl-ngrid{display:block}.pbl-ngrid-row-visually-hidden{border-top:0;border-bottom:0;clip:rect(0 0 0 0);height:0;min-height:0;max-height:0;overflow:hidden!important;visibility:collapse!important;outline:0;-webkit-appearance:none;-moz-appearance:none}.pbl-ngrid-row-hidden{display:none!important}.pbl-ngrid-container{position:relative;height:100%;width:100%;flex-direction:column;box-sizing:border-box;display:flex;overflow:auto;min-height:inherit}.pbl-ngrid-scroll-container{flex:1 1 auto;box-sizing:border-box;min-height:auto}.pbl-ngrid-scroll-container.cdk-virtual-scroll-disabled{flex:1 0 auto}.pbl-ngrid-sticky-row-scroll-container{position:fixed;overflow:hidden}.pbl-ngrid-empty-spacer{display:none}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper{min-height:100%;display:flex;flex-direction:column}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table{display:flex;flex-direction:column;flex:1 1 100%}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>*{flex:0 0 auto}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>.pbl-ngrid-empty-spacer{display:block;flex:1 1 auto}.pbl-ngrid-scrolling pbl-cdk-table{pointer-events:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5SCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUNSLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFFVCxpQkFBaUIsRUFJakIsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxnQkFBZ0IsRUFFaEIsTUFBTSxFQUNOLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUEyQixTQUFTLEdBQzNFLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUV4RixPQUFPLEVBQXNFLGFBQWEsRUFBZ0IsUUFBUSxFQUFF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RUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7MkJBQzdELFNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzZCQUNyQyxZQUFZLFNBQUMsZUFBZTs2QkFDNUIsWUFBWSxTQUFDLGVBQWU7Ozs7SUE5SjdCLHdDQUFxQjs7SUFVckIsd0NBQXFCOztJQVNyQixzQ0FBbUI7Ozs7Ozs7OztJQVNuQixzQ0FBcUU7Ozs7O0lBUXJFLDJDQUErQjs7Ozs7SUFxRS9CLG9DQUFrRTs7SUFvQ2xFLDJDQUEySTs7SUFDM0ksK0NBQW9FOztJQUVwRSxxQ0FBc0I7O0lBQ3RCLHNDQUF1Qjs7Ozs7SUFFdkIsK0NBQStCOzs7OztJQUMvQix3Q0FBc0M7O0lBRXRDLDhDQUF3Rzs7SUFDeEcsZ0RBQTRHOztJQUM1RywrQ0FBMEc7O0lBQzFHLHlDQUFpSDs7SUFDakgsMENBQXVIOztJQUN2SCwwQ0FBdUg7O0lBQ3ZILHlDQUFtRTs7SUFDbkUsMkNBQTBFOztJQUMxRSwyQ0FBMEU7Ozs7O0lBUTFFLG1DQUF5Qjs7SUFDekIsc0NBQWlDOztJQUtqQyxzQ0FBbUM7Ozs7O0lBQ25DLG1DQUFzRDs7Ozs7SUFDdEQsOENBQW1DOzs7OztJQUNuQyx5Q0FBK0I7Ozs7O0lBQy9CLDJDQUErQzs7Ozs7SUFDL0MsZ0RBQWtEOzs7OztJQUNsRCxtREFBcUQ7Ozs7O0lBQ3JELHdDQUFtRDs7Ozs7SUFDbkQsOENBQWtDOzs7OztJQUNsQyw2Q0FBaUM7Ozs7O0lBQ2pDLHNDQUF5RDs7Ozs7SUFDekQsb0NBQXVDOzs7OztJQUN2QyxvQ0FBeUM7Ozs7O0lBRzdCLGtDQUFzQzs7Ozs7SUFDdEMsb0NBQWdDOzs7OztJQUNoQyxtQ0FBc0I7Ozs7O0lBQ3RCLGdDQUE4Qjs7Ozs7SUFDOUIsbUNBQXFDOztJQUNyQyxxQ0FBd0M7O0lBQ3hDLCtCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIGZyb21FdmVudFBhdHRlcm4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgdGFwLCBvYnNlcnZlT24sIHN3aXRjaE1hcCwgbWFwLCBtYXBUbywgc3RhcnRXaXRoLCBwYWlyd2lzZSwgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSW5qZWN0b3IsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBOZ1pvbmUsXG4gIGlzRGV2TW9kZSwgZm9yd2FyZFJlZiwgSXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlciwgRG9DaGVjaywgQXR0cmlidXRlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtIZWFkZXJSb3dEZWYsIENka0Zvb3RlclJvd0RlZiwgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgdW5yeCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkUGFnaW5hdG9yS2luZCB9IGZyb20gJy4uL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBEYXRhU291cmNlUHJlZGljYXRlLCBEYXRhU291cmNlRmlsdGVyVG9rZW4sIFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibERhdGFTb3VyY2UsIERhdGFTb3VyY2VPZiwgY3JlYXRlRFMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZS9pbmRleCc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyByZXNldENvbHVtbldpZHRocyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZmluZENlbGxEZWYgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2VsbC1kZWYnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBQYmxDb2x1bW5TdG9yZSwgUGJsTWV0YUNvbHVtblN0b3JlLCBQYmxOZ3JpZENvbHVtblNldCwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LCBpc1BibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgQ29udGV4dEFwaSwgUGJsTmdyaWRDb250ZXh0QXBpLCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYywgRFlOQU1JQ19QQURESU5HX0JPWF9NT0RFTF9TUEFDRV9TVFJBVEVHWSB9IGZyb20gJy4vY29sLXdpZHRoLWxvZ2ljL2R5bmFtaWMtY29sdW1uLXdpZHRoJztcbmltcG9ydCB7IENvbHVtbkFwaSwgQXV0b1NpemVUb0ZpdE9wdGlvbnMgfSBmcm9tICcuL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3dzL2luZGV4JztcblxuaW1wb3J0IHsgYmluZFRvRGF0YVNvdXJjZSB9IGZyb20gJy4vYmluZC10by1kYXRhc291cmNlJztcbmltcG9ydCAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnOyAvLyBMRUFWRSBUSElTLCBXRSBORUVEIElUIFNPIFRIRSBBVUdNRU5UQVRJT04gSU4gVEhFIEZJTEUgV0lMTCBMT0FELlxuXG5pbXBvcnQgeyBzZXRJZGVudGl0eVByb3AgfSBmcm9tICcuL25ncmlkLmRlcHJlY2F0ZS1hdC0xLjAuMCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcm5hbEFwaUZhY3RvcnkoZ3JpZDogeyBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTsgfSkgeyByZXR1cm4gZ3JpZC5fZXh0QXBpOyB9XG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luQ29udHJvbGxlckZhY3RvcnkoZ3JpZDogeyBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7IH0pIHsgcmV0dXJuIGdyaWQuX3BsdWdpbi5jb250cm9sbGVyOyB9XG5leHBvcnQgZnVuY3Rpb24gbWV0YVJvd1NlcnZpY2VGYWN0b3J5KGdyaWQ6IHsgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7IH0pIHsgcmV0dXJuIGdyaWQuX2V4dEFwaS5tZXRhUm93U2VydmljZTsgfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmdyaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vbmdyaWQuY29tcG9uZW50LnNjc3MnIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgIHVzZUZhY3Rvcnk6IHBsdWdpbkNvbnRyb2xsZXJGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEVYVF9BUElfVE9LRU4sXG4gICAgICB1c2VGYWN0b3J5OiBpbnRlcm5hbEFwaUZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogUGJsTmdyaWRNZXRhUm93U2VydmljZSxcbiAgICAgIHVzZUZhY3Rvcnk6IG1ldGFSb3dTZXJ2aWNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb21wb25lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgLyoqXG4gICAqIFNob3cvSGlkZSB0aGUgaGVhZGVyIHJvdy5cbiAgICogRGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93SGVhZGVyOyB9O1xuICBzZXQgc2hvd0hlYWRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dIZWFkZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaG93L0hpZGUgdGhlIGZvb3RlciByb3cuXG4gICAqIERlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBASW5wdXQoKSBnZXQgc2hvd0Zvb3RlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dGb290ZXI7IH07XG4gIHNldCBzaG93Rm9vdGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0Zvb3RlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3Nob3dGb290ZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgdGhlIGZpbGxlciBpcyBkaXNhYmxlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBub0ZpbGxlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vRmlsbGVyOyB9O1xuICBzZXQgbm9GaWxsZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ub0ZpbGxlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX25vRmlsbGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTZXQncyB0aGUgYmVoYXZpb3Igb2YgdGhlIGdyaWQgd2hlbiB0YWJiaW5nLlxuICAgKiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyBub25lIChyb3dzIGFuZCBjZWxscyBhcmUgbm90IGZvY3VzYWJsZSlcbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBmb2N1cyBtb2RlIGhhcyBhbiBlZmZlY3Qgb24gb3RoZXIgZnVuY3Rpb25zLCBmb3IgZXhhbXBsZSBhIGRldGFpbCByb3cgd2lsbCB0b2dnbGUgKG9wZW4vY2xvc2UpIHVzaW5nXG4gICAqIEVOVEVSIC8gU1BBQ0Ugb25seSB3aGVuIGZvY3VzTW9kZSBpcyBzZXQgdG8gYHJvd2AuXG4gICAqL1xuICBASW5wdXQoKSBmb2N1c01vZGU6ICdyb3cnIHwgJ2NlbGwnIHwgJ25vbmUnIHwgJycgfCBmYWxzZSB8IHVuZGVmaW5lZDtcblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBwSW5kZXhgIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbi4gKFJlbW92ZWQgaW4gMS4wLjApXG4gICAqL1xuICBASW5wdXQoKSBnZXQgaWRlbnRpdHlQcm9wKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9faWRlbnRpdHlQcm9wOyB9XG4gIHNldCBpZGVudGl0eVByb3AodmFsdWU6IHN0cmluZykgeyB0aGlzLl9faWRlbnRpdHlQcm9wID0gdmFsdWU7IHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdmFsdWUpOyB9XG4gIHByaXZhdGUgX19pZGVudGl0eVByb3A6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGdyaWQncyBzb3VyY2Ugb2YgZGF0YVxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGUgZ3JpZCdzIHNvdXJjZSBvZiBkYXRhLCB3aGljaCBjYW4gYmUgcHJvdmlkZWQgaW4gMiB3YXlzOlxuICAgKlxuICAgKiAtIERhdGFTb3VyY2VPZjxUPlxuICAgKiAtIFBibERhdGFTb3VyY2U8VD5cbiAgICpcbiAgICogVGhlIGdyaWQgb25seSB3b3JrcyB3aXRoIGBQYmxEYXRhU291cmNlPFQ+YCwgYERhdGFTb3VyY2VPZjxUPmAgaXMgYSBzaG9ydGN1dCBmb3IgcHJvdmlkaW5nXG4gICAqIHRoZSBkYXRhIGFycmF5IGRpcmVjdGx5LlxuICAgKlxuICAgKiBgRGF0YVNvdXJjZU9mPFQ+YCBjYW4gYmU6XG4gICAqXG4gICAqIC0gU2ltcGxlIGRhdGEgYXJyYXkgKGVhY2ggb2JqZWN0IHJlcHJlc2VudHMgb25lIGdyaWQgcm93KVxuICAgKiAtIFByb21pc2UgZm9yIGEgZGF0YSBhcnJheVxuICAgKiAtIFN0cmVhbSB0aGF0IGVtaXRzIGEgZGF0YSBhcnJheSBlYWNoIHRpbWUgdGhlIGFycmF5IGNoYW5nZXNcbiAgICpcbiAgICogV2hlbiBhIGBEYXRhU291cmNlT2Y8VD5gIGlzIHByb3ZpZGVkIGl0IGlzIGNvbnZlcnRlZCBpbnRvIGFuIGluc3RhbmNlIG9mIGBQYmxEYXRhU291cmNlPFQ+YC5cbiAgICpcbiAgICogVG8gYWNjZXNzIHRoZSBgUGJsRGF0YVNvdXJjZTxUPmAgaW5zdGFuY2UgdXNlIHRoZSBgZHNgIHByb3BlcnR5IChyZWFkb25seSkuXG4gICAqXG4gICAqIEl0IGlzIGhpZ2hseSByZWNvbW1lbmRlZCB0byB1c2UgYFBibERhdGFTb3VyY2U8VD5gIGRpcmVjdGx5LCB0aGUgZGF0YXNvdXJjZSBmYWN0b3J5IG1ha2VzIGl0IGVhc3kuXG4gICAqIEZvciBleGFtcGxlLCB3aGVuIGFuIGFycmF5IGlzIHByb3ZpZGVkIHRoZSBmYWN0b3J5IGlzIHVzZWQgdG8gY29udmVydCBpdCB0byBhIGRhdGFzb3VyY2U6XG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgY29sbGVjdGlvbjogVFtdID0gW107XG4gICAqIGNvbnN0IHBibERhdGFTb3VyY2UgPSBjcmVhdGVEUzxUPigpLm9uVHJpZ2dlciggKCkgPT4gY29sbGVjdGlvbiApLmNyZWF0ZSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogPiBUaGlzIGlzIGEgd3JpdGUtb25seSAoc2V0dGVyKSBwcm9wZXJ0eSB0aGF0IHRyaWdnZXJzIHRoZSBgc2V0RGF0YVNvdXJjZWAgbWV0aG9kLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGRhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4gfCBEYXRhU291cmNlT2Y8VD4pIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQYmxEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UoY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IHZhbHVlIHx8IFtdICkuY3JlYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkcygpOiBQYmxEYXRhU291cmNlPFQ+IHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7IH07XG5cbiAgQElucHV0KCkgZ2V0IHVzZVBhZ2luYXRpb24oKTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UgeyByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjsgfVxuICBzZXQgdXNlUGFnaW5hdGlvbih2YWx1ZTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UpIHtcbiAgICBpZiAoKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB2YWx1ZSA9ICdwYWdlTnVtYmVyJztcbiAgICB9XG4gICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5fcGFnaW5hdGlvbiApIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgbm9DYWNoZVBhZ2luYXRvcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7IH1cbiAgc2V0IG5vQ2FjaGVQYWdpbmF0b3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX25vQ2FjaGVQYWdpbmF0b3IgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5kcyAmJiB0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGlzIGdyaWQuXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zOiBQYmxOZ3JpZENvbHVtblNldCB8IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldDtcblxuICBASW5wdXQoKSBzZXQgaGlkZUNvbHVtbnModmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5faGlkZUNvbHVtbnMgPSB2YWx1ZTtcbiAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZhbGxiYWNrIGhlaWdodCBmb3IgXCJ0aGUgaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiLlxuICAgKiBUaGUgZmFsbGJhY2sgaXMgdXNlZCBvbmx5IHdoZW4gaXQgTE9XRVIgdGhhbiB0aGUgcmVuZGVyZWQgaGVpZ2h0LCBzbyBubyBlbXB0eSBnYXBzIGFyZSBjcmVhdGVkIHdoZW4gc2V0dGluZyB0aGUgZmFsbGJhY2suXG4gICAqXG4gICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyB0aGUgYXJlYSBpbiB3aGljaCBhbGwgZGF0YSByb3dzIGFyZSByZW5kZXJlZCBhbmQgYWxsIG1ldGEgKGhlYWRlci9mb290ZXIpIHJvd3MgdGhhdCBhcmUgb2YgdHlwZSBcInJvd1wiIG9yIFwic3RpY2t5XCIuXG4gICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBkZWZpbmVkIHRvIGNvbnN1bWUgYWxsIHRoZSBoZWlnaHQgbGVmdCBhZnRlciBhbGwgZXh0ZXJuYWwgb2JqZWN0cyBhcmUgcmVuZGVyZWQuXG4gICAqIEV4dGVybmFsIG9iamVjdHMgY2FuIGJlIGZpeGVkIG1ldGEgcm93cyAoaGVhZGVyL2Zvb3RlciksIHBhZ2luYXRpb24gcm93LCBhY3Rpb24gcm93IGV0Yy4uLlxuICAgKlxuICAgKiBJZiB0aGUgZ3JpZCBkb2VzIG5vdCBoYXZlIGEgaGVpZ2h0ICglIG9yIHB4KSB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBhbHdheXMgaGF2ZSBubyBoZWlnaHQgKDApLlxuICAgKiBJZiB0aGUgZ3JpZCBoYXMgYSBoZWlnaHQsIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGdldCB0aGUgaGVpZ2h0IGxlZnQsIHdoaWNoIGNhbiBhbHNvIGJlIDAgaWYgdGhlcmUgYXJlIGEgbG90IG9mIGV4dGVybmFsIG9iamVjdHMuXG4gICAqXG4gICAqIFRvIHNvbHZlIHRoZSBuby1oZWlnaHQgcHJvYmxlbSB3ZSB1c2UgdGhlIGZhbGxiYWNrTWluSGVpZ2h0IHByb3BlcnR5LlxuICAgKlxuICAgKiBXaGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGRpc2FibGVkIGFuZCBmYWxsYmFja01pbkhlaWdodCBpcyBub3Qgc2V0IHRoZSBncmlkIHdpbGwgc2V0IHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBoZWlnaHQgdG8gc2hvdyBhbGwgcm93cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gdXNpbmcgYSBmaXhlZCAocHgpIGhlaWdodCBmb3IgdGhlIGdyaWQsIGlmIHRoZSBoZWlnaHQgb2YgYWxsIGV4dGVybmFsIG9iamVjdHMgKyB0aGUgaGVpZ2h0IG9mIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBncmVhdGVyIHRoZW5cbiAgICogdGhlIGdyaWQncyBoZWlnaHQgYSB2ZXJ0aWNhbCBzY3JvbGwgYmFyIHdpbGwgc2hvdy5cbiAgICogSWYgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwicyBoZWlnaHQgd2lsbCBiZSBsb3dlciB0aGVuIGl0J3MgcmVuZGVyZWQgY29udGVudCBoZWlnaHQgYW5kIGFkZGl0aW9uYWwgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIGFwcGVhciwgd2hpY2ggaXMsIHVzdWFsbHksIG5vdCBnb29kLlxuICAgKlxuICAgKiBUbyBhdm9pZCB0aGlzLCBkb24ndCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIGZpeGVkIGhlaWdodCBmb3IgdGhlIGdyaWQuIEluc3RlYWQgdXNlIGZhbGxiYWNrTWluSGVpZ2h0IHRvZ2V0aGVyIHdpdGggYSBtaW4gaGVpZ2h0IGZvciB0aGUgZ3JpZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBmYWxsYmFja01pbkhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQ7IH1cbiAgc2V0IGZhbGxiYWNrTWluSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHJvd0NsYXNzVXBkYXRlOiB1bmRlZmluZWQgfCAoIChjb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pID0+ICggc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSApKTtcbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGVGcmVxOiAnaXRlbScgfCAnbmdEb0NoZWNrJyB8ICdub25lJyA9ICdpdGVtJztcblxuICByb3dGb2N1czogMCB8ICcnID0gJyc7XG4gIGNlbGxGb2N1czogMCB8ICcnID0gJyc7XG5cbiAgcHJpdmF0ZSBfZmFsbGJhY2tNaW5IZWlnaHQgPSAwO1xuICBwcml2YXRlIF9kYXRhU291cmNlOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZVRhYmxlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQmVmb3JlVGFibGU6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZUNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVDb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdhZnRlckNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZBZnRlckNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ZiVGFibGVDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYlRhYmxlQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiSGVhZGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJIZWFkZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiRm9vdGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJGb290ZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoQ2RrUm93RGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBfdGFibGVSb3dEZWY6IENka1Jvd0RlZjxUPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtIZWFkZXJSb3dEZWYpIF9oZWFkZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrSGVhZGVyUm93RGVmPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtGb290ZXJSb3dEZWYpIF9mb290ZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrRm9vdGVyUm93RGVmPjtcblxuICBnZXQgbWV0YUNvbHVtbklkcygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbklkcyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5JZHM7IH1cbiAgZ2V0IG1ldGFDb2x1bW5zKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1ucyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5Sb3dEZWYoKSB7IHJldHVybiB7IGhlYWRlcjogdGhpcy5fc3RvcmUuaGVhZGVyQ29sdW1uRGVmLCBmb290ZXI6IHRoaXMuX3N0b3JlLmZvb3RlckNvbHVtbkRlZiB9OyB9XG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCAoYWZ0ZXIgQWZ0ZXJWaWV3SW5pdClcbiAgICovXG4gIHJlYWRvbmx5IGlzSW5pdDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY29sdW1uQXBpOiBDb2x1bW5BcGk8VD47XG4gIGdldCBjb250ZXh0QXBpKCk6IFBibE5ncmlkQ29udGV4dEFwaTxUPiB7IHJldHVybiB0aGlzLl9leHRBcGkuY29udGV4dEFwaTsgfVxuXG4gIGdldCB2aWV3cG9ydCgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fdmlld3BvcnQ7IH1cblxuICBfY2RrVGFibGU6IFBibENka1RhYmxlQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIF9zdG9yZTogUGJsQ29sdW1uU3RvcmUgPSBuZXcgUGJsQ29sdW1uU3RvcmUoKTtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnNEaXJ0eTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnM6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jb2xIaWRlRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+O1xuICBwcml2YXRlIF9ub0RhdGVFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0b3JFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZTtcbiAgcHJpdmF0ZSBfbm9DYWNoZVBhZ2luYXRvciA9IGZhbHNlO1xuICBwcml2YXRlIF9taW5pbXVtUm93V2lkdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmlld3BvcnQ/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQ7XG4gIHByaXZhdGUgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0O1xuICBwcml2YXRlIF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdpZCcpIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZ3JpZENvbmZpZyA9IGNvbmZpZy5nZXQoJ3RhYmxlJyk7XG4gICAgdGhpcy5zaG93SGVhZGVyID0gZ3JpZENvbmZpZy5zaG93SGVhZGVyO1xuICAgIHRoaXMuc2hvd0Zvb3RlciA9IGdyaWRDb25maWcuc2hvd0Zvb3RlcjtcbiAgICB0aGlzLm5vRmlsbGVyID0gZ3JpZENvbmZpZy5ub0ZpbGxlcjtcblxuICAgIHRoaXMuaW5pdEV4dEFwaSgpO1xuICAgIHRoaXMuY29sdW1uQXBpID0gQ29sdW1uQXBpLmNyZWF0ZTxUPih0aGlzLCB0aGlzLl9zdG9yZSwgdGhpcy5fZXh0QXBpKTtcbiAgICB0aGlzLmluaXRQbHVnaW5zKGluamVjdG9yLCBlbFJlZiwgdmNSZWYpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oaWRlQ29sdW1uc0RpcnR5KSB7XG4gICAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gZmFsc2U7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2hpZGVDb2x1bW5zO1xuICAgICAgaWYgKCF0aGlzLl9jb2xIaWRlRGlmZmVyICYmIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHZhbHVlKS5jcmVhdGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkaWZmZXIgc3VwcG9ydGluZyBvYmplY3QgJyR7dmFsdWV9LiBoaWRlQ29sdW1ucyBvbmx5IHN1cHBvcnRzIGJpbmRpbmcgdG8gSXRlcmFibGVzIHN1Y2ggYXMgQXJyYXlzLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb2xIaWRlRGlmZmVyKSB7XG4gICAgICBjb25zdCBoaWRlQ29sdW1ucyA9IHRoaXMuX2hpZGVDb2x1bW5zIHx8IFtdO1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2NvbEhpZGVEaWZmZXIuZGlmZihoaWRlQ29sdW1ucyk7XG4gICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLl9zdG9yZS5oaWRkZW4gPSBoaWRlQ29sdW1ucztcbiAgICAgICAgdGhpcy5fbWluaW11bVJvd1dpZHRoID0gJyc7XG5cbiAgICAgICAgLy8gVE9ETyhzaGxvbWlhc3NhZikgW3BlcmYsIDRdOiBSaWdodCBub3cgd2UgYXR0YWNoIGFsbCBjb2x1bW5zLCB3ZSBjYW4gaW1wcm92ZSBpdCBieSBhdHRhY2hpbmcgb25seSB0aG9zZSBcImFkZGVkXCIgKHdlIGtub3cgdGhlbSBmcm9tIFwiY2hhbmdlc1wiKVxuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5faGlkZUNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gbm8gbmVlZCB0byB1bnN1YnNjcmliZSwgdGhlIHJlZyBzZXJ2aWNlIGlzIHBlciBncmlkIGluc3RhbmNlIGFuZCBpdCB3aWxsIGRlc3Ryb3kgd2hlbiB0aGlzIGdyaWQgZGVzdHJveS5cbiAgICAvLyBBbHNvLCBhdCB0aGlzIHBvaW50IGluaXRpYWwgY2hhbmdlcyBmcm9tIHRlbXBsYXRlcyBwcm92aWRlZCBpbiB0aGUgY29udGVudCBhcmUgYWxyZWFkeSBpbnNpZGUgc28gdGhleSB3aWxsIG5vdCB0cmlnZ2VyXG4gICAgLy8gdGhlIG9yZGVyIGhlcmUgaXMgdmVyeSBpbXBvcnRhbnQsIGJlY2F1c2UgY29tcG9uZW50IHRvcCBvZiB0aGlzIGdyaWQgd2lsbCBmaXJlIGxpZmUgY3ljbGUgaG9va3MgQUZURVIgdGhpcyBjb21wb25lbnRcbiAgICAvLyBzbyBpZiB3ZSBoYXZlIGEgdG9wIGxldmVsIGNvbXBvbmVudCByZWdpc3RlcmluZyBhIHRlbXBsYXRlIG9uIHRvcCBpdCB3aWxsIG5vdCBzaG93IHVubGVzcyB3ZSBsaXN0ZW4uXG4gICAgdGhpcy5yZWdpc3RyeS5jaGFuZ2VzLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICBsZXQgZ3JpZENlbGwgPSBmYWxzZTtcbiAgICAgIGxldCBoZWFkZXJGb290ZXJDZWxsID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RhYmxlQ2VsbCc6XG4gICAgICAgICAgICBncmlkQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJDZWxsJzpcbiAgICAgICAgICBjYXNlICdmb290ZXJDZWxsJzpcbiAgICAgICAgICAgIGhlYWRlckZvb3RlckNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbm9EYXRhJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcic6XG4gICAgICAgICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGdyaWRDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgICAgaWYgKGhlYWRlckZvb3RlckNlbGwpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0luaXQnLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25Jbml0JyB9KTtcblxuICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcblxuICAgIC8vIEFkZGluZyBhIGRpdiBiZWZvcmUgdGhlIGZvb3RlciByb3cgdmlldyByZWZlcmVuY2UsIHRoaXMgZGl2IHdpbGwgYmUgdXNlZCB0byBmaWxsIHVwIHRoZSBzcGFjZSBiZXR3ZWVuIGhlYWRlciAmIGZvb3RlciByb3dzXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1lbXB0eS1zcGFjZXInKVxuICAgIHRoaXMuX2Nka1RhYmxlLl9lbGVtZW50Lmluc2VydEJlZm9yZShkaXYsIHRoaXMuX2Nka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmxpc3RlblRvUmVzaXplKCk7XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgd2lsbCBjYXRjaCBjb250ZXh0IGZvY3VzZWQgZXZlbnRzLCBmaW5kIHRoZSBIVE1MIGVsZW1lbnQgb2YgdGhlIGNlbGwgYW5kIGZvY3VzIGl0LlxuICAgIHRoaXMuY29udGV4dEFwaS5mb2N1c0NoYW5nZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmN1cnIpIHtcbiAgICAgICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5jb250ZXh0QXBpLmZpbmRSb3dJblZpZXcoZXZlbnQuY3Vyci5yb3dJZGVudCk7XG4gICAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KHJvd0NvbnRleHQuaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbFZpZXdJbmRleCA9IHRoaXMuY29sdW1uQXBpLnJlbmRlckluZGV4T2YodGhpcy5jb2x1bW5BcGkuY29sdW1uc1tldmVudC5jdXJyLmNvbEluZGV4XSlcbiAgICAgICAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSB2aWV3LnJvb3ROb2Rlc1swXS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtY2VsbCcpW2NlbGxWaWV3SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAoY2VsbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgcHJvY2Vzc0NvbHVtbnMgPSBmYWxzZTtcblxuICAgIGlmIChjaGFuZ2VzLmZvY3VzTW9kZSkge1xuICAgICAgdGhpcy5yb3dGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAncm93JyA/IDAgOiAnJztcbiAgICAgIHRoaXMuY2VsbEZvY3VzID0gdGhpcy5mb2N1c01vZGUgPT09ICdjZWxsJyA/IDAgOiAnJztcbiAgICB9XG5cbiAgICBpZiAoIGNoYW5nZXMuY29sdW1ucyAmJiB0aGlzLmlzSW5pdCApIHtcbiAgICAgIHByb2Nlc3NDb2x1bW5zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIHByb2Nlc3NDb2x1bW5zID09PSB0cnVlICkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9wbHVnaW4uZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgICB9XG4gICAgICB1bnJ4LmtpbGwodGhpcyk7XG4gICAgfTtcblxuICAgIGxldCBwOiBQcm9taXNlPHZvaWQ+O1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25EZXN0cm95Jywgd2FpdDogKF9wOiBQcm9taXNlPHZvaWQ+KSA9PiBwID0gX3AgfSk7XG4gICAgaWYgKHApIHtcbiAgICAgIHAudGhlbihkZXN0cm95KS5jYXRjaChkZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVCk6IGFueSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IHNvcnQgZGVmaW5pdGlvbnMuXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAsIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBzb3J0aW5nIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgb3IgYHNvcnRBbGlhc2AgcHJvcGVydGllcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXG4gICAqXG4gICAqIEBwYXJhbSBjb2x1bW5PclNvcnRBbGlhcyBBIGNvbHVtbiBpbnN0YW5jZSBvciBhIHN0cmluZyBtYXRjaGluZyBgUGJsQ29sdW1uLnNvcnRBbGlhc2Agb3IgYFBibENvbHVtbi5pZGAuXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhczogUGJsQ29sdW1uIHwgc3RyaW5nLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM/OiBQYmxDb2x1bW4gfCBzdHJpbmcgfCBib29sZWFuLCBzb3J0PzogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5PclNvcnRBbGlhcyB8fCB0eXBlb2YgY29sdW1uT3JTb3J0QWxpYXMgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5kcy5zZXRTb3J0KCEhY29sdW1uT3JTb3J0QWxpYXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb2x1bW46IFBibENvbHVtbjtcbiAgICBpZiAodHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnc3RyaW5nJykge1xuICAgICAgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2x1bW5PclNvcnRBbGlhcyA6IChjLnNvcnQgJiYgYy5pZCA9PT0gY29sdW1uT3JTb3J0QWxpYXMpICk7XG4gICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzIFwiJHtjb2x1bW5PclNvcnRBbGlhc31cIi5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4gPSBjb2x1bW5PclNvcnRBbGlhcztcbiAgICB9XG4gICAgdGhpcy5kcy5zZXRTb3J0KGNvbHVtbiwgc29ydCwgc2tpcFVwZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYC5cbiAgICovXG4gIHNldEZpbHRlcigpOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSBmdW5jdGlvbiBwcmVkaWNhdGUuXG4gICAqXG4gICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IERhdGFTb3VyY2VQcmVkaWNhdGUsIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgdmFsdWUgdG8gY29tcGFyZSB3aXRoIGFuZCBhIGxpc3Qgb2YgY29sdW1ucyB3aXRoIHRoZSB2YWx1ZXMgdG8gY29tcGFyZSB0by5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IGFueSwgY29sdW1uczogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIHNldEZpbHRlcih2YWx1ZT86IERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgY29sdW1ucz86IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjb2x1bW5JbnN0YW5jZXM6IFBibENvbHVtbltdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykgJiYgdHlwZW9mIGNvbHVtbnNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbElkIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbmQoIGMgPT4gYy5hbGlhcyA/IGMuYWxpYXMgPT09IGNvbElkIDogKGMuaWQgPT09IGNvbElkKSApO1xuICAgICAgICAgIGlmICghY29sdW1uICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzICR7Y29sSWR9IFwiJHtjb2xJZH1cIi5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29sdW1uSW5zdGFuY2VzLnB1c2goY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uSW5zdGFuY2VzID0gY29sdW1ucyBhcyBhbnk7XG4gICAgICB9XG4gICAgICB0aGlzLmRzLnNldEZpbHRlcih2YWx1ZSwgY29sdW1uSW5zdGFuY2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIoKTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT09IHZhbHVlKSB7XG4gICAgICAvLyBLSUxMIEFMTCBzdWJzY3JpcHRpb25zIGZvciB0aGUgcHJldmlvdXMgZGF0YXNvdXJjZS5cbiAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgIHVucngua2lsbCh0aGlzLCB0aGlzLl9kYXRhU291cmNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgICB0aGlzLl9kYXRhU291cmNlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5kYXRhU291cmNlID0gdmFsdWUgYXMgYW55O1xuXG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICB0aGlzLnNldHVwTm9EYXRhKGZhbHNlKTtcblxuICAgICAgLy8gY2xlYXIgdGhlIGNvbnRleHQsIG5ldyBkYXRhc291cmNlXG4gICAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuXG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHtcbiAgICAgICAga2luZDogJ29uRGF0YVNvdXJjZScsXG4gICAgICAgIHByZXYsXG4gICAgICAgIGN1cnI6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgdmFsdWUub25FcnJvci5waXBlKHVucngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRvIHRoaXMgZXZlbnQgYmVjYXVzZSBpdCBmaXJlcyBiZWZvcmUgdGhlIGVudGlyZSBkYXRhLWNoYW5naW5nIHByb2Nlc3Mgc3RhcnRzLlxuICAgICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2UgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBpcyBmaXJlZCBhc3luYywganVzdCBiZWZvcmUgdGhlIGRhdGEgaXMgZW1pdHRlZC5cbiAgICAgICAgLy8gSXRzIG5vdCBlbm91Z2ggdG8gY2xlYXIgdGhlIGNvbnRleHQgd2hlbiBgc2V0RGF0YVNvdXJjZWAgaXMgY2FsbGVkLCB3ZSBhbHNvIG5lZWQgdG8gaGFuZGxlIGByZWZyZXNoYCBjYWxscyB3aGljaCB3aWxsIG5vdFxuICAgICAgICAvLyB0cmlnZ2VyIHRoaXMgbWV0aG9kLlxuICAgICAgICB2YWx1ZS5vblNvdXJjZUNoYW5naW5nLnBpcGUodW5yeCh0aGlzLCB2YWx1ZSkpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApO1xuXG4gICAgICAgIC8vIFJ1biBDRCwgc2NoZWR1bGVkIGFzIGEgbWljcm8tdGFzaywgYWZ0ZXIgZWFjaCByZW5kZXJpbmdcbiAgICAgICAgdmFsdWUub25SZW5kZXJEYXRhQ2hhbmdpbmdcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlciggKHtldmVudH0pID0+ICFldmVudC5pc0luaXRpYWwgJiYgKGV2ZW50LnBhZ2luYXRpb24uY2hhbmdlZCB8fCBldmVudC5zb3J0LmNoYW5nZWQgfHwgZXZlbnQuZmlsdGVyLmNoYW5nZWQpKSxcbiAgICAgICAgICAgIC8vIENvbnRleHQgYmV0d2VlbiB0aGUgb3BlcmF0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBhdCB0aGUgbW9tZW50XG4gICAgICAgICAgICAvLyBFdmVudCBmb3IgY2xpZW50IHNpZGUgb3BlcmF0aW9ucy4uLlxuICAgICAgICAgICAgLy8gVE9ETzogY2FuIHdlIHJlbW92ZSB0aGlzPyB3ZSBjbGVhciB0aGUgY29udGV4dCB3aXRoIGBvblNvdXJjZUNoYW5naW5nYFxuICAgICAgICAgICAgdGFwKCAoKSA9PiAhdGhpcy5fc3RvcmUucHJpbWFyeSAmJiB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpICksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoICgpID0+IHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZC5waXBlKHRha2UoMSksIG1hcFRvKHRoaXMuZHMucmVuZGVyTGVuZ3RoKSkgKSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyKSxcbiAgICAgICAgICAgIHVucngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIHByZXZpb3VzUmVuZGVyTGVuZ3RoID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBudW1iZXIgb2YgcmVuZGVyZWQgaXRlbXMgaGFzIGNoYW5nZWQgdGhlIGdyaWQgd2lsbCB1cGRhdGUgdGhlIGRhdGEgYW5kIHJ1biBDRCBvbiBpdC5cbiAgICAgICAgICAgIC8vIHNvIHdlIG9ubHkgdXBkYXRlIHRoZSByb3dzLlxuICAgICAgICAgICAgY29uc3QgeyBjZGtUYWJsZSB9ID0gdGhpcy5fZXh0QXBpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzUmVuZGVyTGVuZ3RoID09PSB0aGlzLmRzLnJlbmRlckxlbmd0aCkge1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cyh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3MoJ2Zvb3RlcicsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsaW5nIG5vIGRhdGEgb3ZlcmxheVxuICAgICAgICAvLyBIYW5kbGluZyBmYWxsYmFjayBtaW5pbXVtIGhlaWdodC5cbiAgICAgICAgdmFsdWUub25SZW5kZXJlZERhdGFDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoICgpID0+IHRoaXMuZHMucmVuZGVyTGVuZ3RoICksXG4gICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgICAgdGFwKCAoW3ByZXYsIGN1cnJdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vRGF0YVNob3dpbmcgPSAhIXRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZjtcbiAgICAgICAgICAgICAgaWYgKCAoY3VyciA+IDAgJiYgbm9EYXRhU2hvd2luZykgfHwgKGN1cnIgPT09IDAgJiYgIW5vRGF0YVNob3dpbmcpICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvYnNlcnZlT24oYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLCAvLyB3dyB3YW50IHRvIGdpdmUgdGhlIGJyb3dzZXIgdGltZSB0byByZW1vdmUvYWRkIHJvd3NcbiAgICAgICAgICAgIHVucngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRzLnJlbmRlckxlbmd0aCA+IDAgJiYgdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGggPSBNYXRoLm1pbih0aGlzLl9mYWxsYmFja01pbkhlaWdodCwgdGhpcy52aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpKTtcbiAgICAgICAgICAgICAgZWwuc3R5bGUubWluSGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLnZpZXdwb3J0LmVuYWJsZWQgPyBudWxsIDogdGhpcy52aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpICsgJ3B4JztcbiAgICAgICAgICAgICAgLy8gVE9ETzogV2hlbiB2aWV3cG9ydCBpcyBkaXNhYmxlZCwgd2UgY2FuIHNraXAgdGhlIGNhbGwgdG8gbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSBhbmQgbGV0IHRoZSBicm93c2VyXG4gICAgICAgICAgICAgIC8vIGRvIHRoZSBqb2IgYnkgc2V0dGluZyBgY29udGFpbjogdW5zZXRgIGluIGBwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0YFxuXG4gICAgICAgICAgICAgIC8vIGVsLnN0eWxlLm1pbkhlaWdodCA9IG51bGw7XG4gICAgICAgICAgICAgIC8vIGVsLnN0eWxlLmNvbnRhaW4gPSB0aGlzLnZpZXdwb3J0LmVuYWJsZWQgPyBudWxsIDogJ3Vuc2V0JztcblxuICAgICAgICAgICAgICAvLyBVUERBVEU6IFRoaXMgd2lsbCBub3Qgd29yayBiZWNhdXNlIGl0IHdpbGwgY2F1c2UgdGhlIHdpZHRoIHRvIGJlIGluY29ycmVjdCB3aGVuIHVzZWQgd2l0aCB2U2Nyb2xsTm9uZVxuICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVjayB3aHk/XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIHRoZSBoZWFkZXIsIGluY2x1ZGluZyBhIGZ1bGwgcmVidWlsZCBvZiBjb2x1bW4gaGVhZGVyc1xuICAgKi9cbiAgaW52YWxpZGF0ZUNvbHVtbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdiZWZvcmVJbnZhbGlkYXRlSGVhZGVycycgfSk7XG5cbiAgICBjb25zdCByZWJ1aWxkUm93cyA9IHRoaXMuX3N0b3JlLmFsbENvbHVtbnMubGVuZ3RoID4gMDtcbiAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgIHRoaXMuX3N0b3JlLmludmFsaWRhdGUodGhpcy5jb2x1bW5zKTtcblxuICAgIHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdGhpcy5fX2lkZW50aXR5UHJvcCk7IC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIGluIDEuMC4wXG5cbiAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckhlYWRlclJvd0RlZnMoKTtcbiAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAvLyB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAvLyBhZnRlciBpbnZhbGlkYXRpbmcgdGhlIGhlYWRlcnMgd2Ugbm93IGhhdmUgb3B0aW9uYWwgaGVhZGVyL2hlYWRlckdyb3Vwcy9mb290ZXIgcm93cyBhZGRlZFxuICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZW1wbGF0ZSB3aXRoIHRoaXMgZGF0YSB3aGljaCB3aWxsIGNyZWF0ZSBuZXcgcm93cyAoaGVhZGVyL2Zvb3RlcilcbiAgICB0aGlzLnJlc2V0SGVhZGVyUm93RGVmcygpO1xuICAgIHRoaXMucmVzZXRGb290ZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICAvKiAgTm93IHdlIHdpbGwgZm9yY2UgY2xlYXJpbmcgYWxsIGRhdGEgcm93cyBhbmQgY3JlYXRpbmcgdGhlbSBiYWNrIGFnYWluIGlmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCB0aW1lIHdlIGludmFsaWRhdGUgdGhlIGNvbHVtbnMuLi5cblxuICAgICAgICBXaHk/IGZpcnN0LCBzb21lIGJhY2tncm91bmQ6XG5cbiAgICAgICAgSW52YWxpZGF0aW5nIHRoZSBzdG9yZSB3aWxsIHJlc3VsdCBpbiBuZXcgYFBibENvbHVtbmAgaW5zdGFuY2VzIChjbG9uZWQgb3IgY29tcGxldGVseSBuZXcpIGhlbGQgaW5zaWRlIGEgbmV3IGFycmF5IChhbGwgYXJyYXlzIGluIHRoZSBzdG9yZSBhcmUgcmUtY3JlYXRlZCBvbiBpbnZhbGlkYXRlKVxuICAgICAgICBOZXcgYXJyYXkgYW5kIG5ldyBpbnN0YW5jZXMgd2lsbCBhbHNvIHJlc3VsdCBpbiBuZXcgZGlyZWN0aXZlIGluc3RhbmNlcyBvZiBgUGJsTmdyaWRDb2x1bW5EZWZgIGZvciBldmVyeSBjb2x1bW4uXG5cbiAgICAgICAgRWFjaCBkYXRhIHJvdyBoYXMgZGF0YSBjZWxscyB3aXRoIHRoZSBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCBkaXJlY3RpdmUgKGBwYmwtbmdyaWQtY2VsbGApLlxuICAgICAgICBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCBoYXMgYSByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ29sdW1uRGVmYCB0aHJvdWdoIGRlcGVuZGVuY3kgaW5qZWN0aW9uLCBpLmUuIGl0IHdpbGwgbm90IHVwZGF0ZSB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24hXG5cbiAgICAgICAgTm93LCB0aGUgcHJvYmxlbTpcbiAgICAgICAgVGhlIGBDZGtUYWJsZWAgd2lsbCBjYWNoZSByb3dzIGFuZCB0aGVpciBjZWxscywgcmV1c2luZyB0aGVtIGZvciBwZXJmb3JtYW5jZS5cbiAgICAgICAgVGhpcyBtZWFucyB0aGF0IHRoZSBgUGJsTmdyaWRDb2x1bW5EZWZgIGluc3RhbmNlIGluc2lkZSBlYWNoIGNlbGwgd2lsbCBub3QgY2hhbmdlLlxuICAgICAgICBTbywgY3JlYXRpbmcgbmV3IGNvbHVtbnMgYW5kIGNvbHVtbkRlZnMgd2lsbCByZXN1bHQgaW4gc3RhbGUgY2VsbHMgd2l0aCByZWZlcmVuY2UgdG8gZGVhZCBpbnN0YW5jZXMgb2YgYFBibENvbHVtbmAgYW5kIGBQYmxOZ3JpZENvbHVtbkRlZmAuXG5cbiAgICAgICAgT25lIHNvbHV0aW9uIGlzIHRvIHJlZmFjdG9yIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIHRvIGdldCB0aGUgYFBibE5ncmlkQ29sdW1uRGVmYCB0aHJvdWdoIGRhdGEgYmluZGluZy5cbiAgICAgICAgV2hpbGUgdGhpcyB3aWxsIHdvcmsgaXQgd2lsbCBwdXQgbW9yZSB3b3JrIG9uIGVhY2ggY2VsbCB3aGlsZSBkb2luZyBDRCBhbmQgd2lsbCByZXF1aXJlIGNvbXBsZXggbG9naWMgdG8gaGFuZGxlIGVhY2ggY2hhbmdlIGJlY2F1c2UgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWBcbiAgICAgICAgYWxzbyBjcmVhdGUgYSBjb250ZXh0IHdoaWNoIGhhcyByZWZlcmVuY2UgdG8gYSBjb2x1bW4gdGh1cyBhIG5ldyBjb250ZXh0IGlzIHJlcXVpcmVkLlxuICAgICAgICBLZWVwaW5nIHRyYWNrIGZvciBhbGwgcmVmZXJlbmNlcyB3aWxsIGJlIGRpZmZpY3VsdCBhbmQgYnVncyBhcmUgbGlrZWx5IHRvIG9jY3VyLCB3aGljaCBhcmUgaGFyZCB0byB0cmFjay5cblxuICAgICAgICBUaGUgc2ltcGxlc3Qgc29sdXRpb24gaXMgdG8gZm9yY2UgdGhlIGdyaWQgdG8gcmVuZGVyIGFsbCBkYXRhIHJvd3MgZnJvbSBzY3JhdGNoIHdoaWNoIHdpbGwgZGVzdHJveSB0aGUgY2FjaGUgYW5kIGFsbCBjZWxsJ3Mgd2l0aCBpdCwgY3JlYXRpbmcgbmV3IG9uZSdzIHdpdGggcHJvcGVyIHJlZmVyZW5jZS5cblxuICAgICAgICBUaGUgc2ltcGxlIHNvbHV0aW9uIGlzIGN1cnJlbnRseSBwcmVmZXJyZWQgYmVjYXVzZTpcblxuICAgICAgICAtIEl0IGlzIGVhc2llciB0byBpbXBsZW1lbnQuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGFzc2VzcyB0aGUgaW1wYWN0LlxuICAgICAgICAtIEl0IGVmZmVjdHMgYSBzaW5nbGUgb3BlcmF0aW9uIChjaGFuZ2luZyB0byByZXNldHRpbmcgY29sdW1ucykgdGhhdCByYXJlbHkgaGFwcGVuXG5cbiAgICAgICAgVGhlIG9ubHkgaXNzdWUgaXMgd2l0aCB0aGUgYENka1RhYmxlYCBlbmNhcHN1bGF0aW5nIHRoZSBtZXRob2QgYF9mb3JjZVJlbmRlckRhdGFSb3dzKClgIHdoaWNoIGlzIHdoYXQgd2UgbmVlZC5cbiAgICAgICAgVGhlIHdvcmthcm91bmQgaXMgdG8gYXNzaWduIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHdpdGggdGhlIHNhbWUgdmFsdWUgaXQgYWxyZWFkeSBoYXMsIHdoaWNoIHdpbGwgY2F1c2UgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB0byBmaXJlLlxuICAgICAgICBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyBhIGdldHRlciB0aGF0IHRyaWdnZXJzIGBfZm9yY2VSZW5kZXJEYXRhUm93c2Agd2l0aG91dCBjaGVja2luZyB0aGUgdmFsdWUgY2hhbmdlZCwgcGVyZmVjdCBmaXQuXG4gICAgICAgIFRoZXJlIGlzIGEgcmlzayB3aXRoIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGJlaW5nIGNoYW5nZWQuLi5cbiAgICAgKi9cbiAgICBpZiAocmVidWlsZFJvd3MpIHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9IHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cztcbiAgICB9XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkludmFsaWRhdGVIZWFkZXJzJyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb2x1bW4gc2l6ZXMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSBncmlkIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXG4gICAqIFRoZSBmaW5hbCB3aWR0aCByZXByZXNlbnQgYSBzdGF0aWMgd2lkdGgsIGl0IGlzIHRoZSB2YWx1ZSBhcyBzZXQgaW4gdGhlIGRlZmluaXRpb24gKGV4Y2VwdCBjb2x1bW4gd2l0aG91dCB3aWR0aCwgd2hlcmUgdGhlIGNhbGN1bGF0ZWQgZ2xvYmFsIHdpZHRoIGlzIHNldCkuXG4gICAqL1xuICByZXNldENvbHVtbnNXaWR0aCgpOiB2b2lkIHtcbiAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzaXplIG9mIGFsbCBncm91cCBjb2x1bW5zIGluIHRoZSBncmlkIGJhc2VkIG9uIHRoZSBzaXplIG9mIHRoZWlyIHZpc2libGUgY2hpbGRyZW4gKG5vdCBoaWRkZW4pLlxuICAgKiBAcGFyYW0gZHluYW1pY1dpZHRoTG9naWMgLSBPcHRpb25hbCBsb2dpYyBjb250YWluZXIsIGlmIG5vdCBzZXQgYSBuZXcgb25lIGlzIGNyZWF0ZWQuXG4gICAqL1xuICBzeW5jQ29sdW1uR3JvdXBzU2l6ZShkeW5hbWljV2lkdGhMb2dpYz86IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKTogdm9pZCB7XG4gICAgaWYgKCFkeW5hbWljV2lkdGhMb2dpYykge1xuICAgICAgZHluYW1pY1dpZHRoTG9naWMgPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIH1cblxuICAgIC8vIEZyb20gYWxsIG1ldGEgY29sdW1ucyAoaGVhZGVyL2Zvb3Rlci9oZWFkZXJHcm91cCkgd2UgZmlsdGVyIG9ubHkgYGhlYWRlckdyb3VwYCBjb2x1bW5zLlxuICAgIC8vIEZvciBlYWNoIHdlIGNhbGN1bGF0ZSBpdCdzIHdpZHRoIGZyb20gYWxsIG9mIHRoZSBjb2x1bW5zIHRoYXQgdGhlIGhlYWRlckdyb3VwIFwiZ3JvdXBzXCIuXG4gICAgLy8gV2UgdXNlIHRoZSBzYW1lIHN0cmF0ZWd5IGFuZCB0aGUgc2FtZSBSb3dXaWR0aER5bmFtaWNBZ2dyZWdhdG9yIGluc3RhbmNlIHdoaWNoIHdpbGwgcHJldmVudCBkdXBsaWNhdGUgY2FsY3VsYXRpb25zLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGhlYWRlciBncm91cHMsIGkuZS4gc2FtZSBjb2x1bW5zIG9uIG11bHRpcGxlIGdyb3VwcyB3aXRoIGRpZmZlcmVudCByb3cgaW5kZXguXG4gICAgZm9yIChjb25zdCBnIG9mIHRoaXMuX3N0b3JlLmdldEFsbEhlYWRlckdyb3VwKCkpIHtcbiAgICAgIC8vIFdlIGdvIG92ZXIgYWxsIGNvbHVtbnMgYmVjYXVzZSBnLmNvbHVtbnMgZG9lcyBub3QgcmVwcmVzZW50IHRoZSBjdXJyZW50IG93bmVkIGNvbHVtbnMgb2YgdGhlIGdyb3VwXG4gICAgICAvLyBpdCBpcyBzdGF0aWMsIHJlcHJlc2VudGluZyB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICAgIC8vIE9ubHkgY29sdW1ucyBob2xkIHRoZWlyIGdyb3VwIG93bmVycy5cbiAgICAgIC8vIFRPRE86IGZpbmQgd2F5IHRvIGltcHJvdmUgaXRlcmF0aW9uXG4gICAgICBjb25zdCBjb2xTaXplSW5mb3MgPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbHRlciggYyA9PiAhYy5oaWRkZW4gJiYgYy5pc0luR3JvdXAoZykpLm1hcCggYyA9PiBjLnNpemVJbmZvICk7XG4gICAgICBpZiAoY29sU2l6ZUluZm9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBXaWR0aCA9IGR5bmFtaWNXaWR0aExvZ2ljLmFkZEdyb3VwKGNvbFNpemVJbmZvcyk7XG4gICAgICAgIGcubWluV2lkdGggPSBncm91cFdpZHRoO1xuICAgICAgICBnLnVwZGF0ZVdpZHRoKGAke2dyb3VwV2lkdGh9cHhgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGcubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYDBweGApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZUNvbHVtbnMoY29sdW1ucz86IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5zKSB7XG4gICAgICBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICB9XG5cbiAgICAvLyBwcm90ZWN0IGZyb20gcGVyLW1hdHVyZSByZXNpemUuXG4gICAgLy8gV2lsbCBoYXBwZW4gb24gYWRkaXRpb25hbCBoZWFkZXIvaGVhZGVyLWdyb3VwIHJvd3MgQU5EIEFMU08gd2hlbiB2U2Nyb2xsTm9uZSBpcyBzZXRcbiAgICAvLyBUaGlzIHdpbGwgY2F1c2Ugc2l6ZSBub3QgdG8gcG9wdWxhdGUgYmVjYXVzZSBpdCB0YWtlcyB0aW1lIHRvIHJlbmRlciB0aGUgcm93cywgc2luY2UgaXQncyBub3QgdmlydHVhbCBhbmQgaGFwcGVucyBpbW1lZGlhdGVseS5cbiAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHByb3RlY3Rpb24uXG4gICAgaWYgKCFjb2x1bW5zWzBdLnNpemVJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc3RvcmVzIGFuZCBjYWxjdWxhdGVzIHdpZHRoIGZvciBjb2x1bW5zIGFkZGVkIHRvIGl0LiBBZ2dyZWdhdGUncyB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGFkZGVkIGNvbHVtbnMuXG4gICAgY29uc3Qgcm93V2lkdGggPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIHRoaXMuc3luY0NvbHVtbkdyb3Vwc1NpemUocm93V2lkdGgpO1xuXG4gICAgLy8gaWYgdGhpcyBpcyBhIGdyaWQgd2l0aG91dCBncm91cHNcbiAgICBpZiAocm93V2lkdGgubWluaW11bVJvd1dpZHRoID09PSAwKSB7XG4gICAgICByb3dXaWR0aC5hZGRHcm91cChjb2x1bW5zLm1hcCggYyA9PiBjLnNpemVJbmZvICkpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBtYXggbG9jayBzdGF0ZSBoYXMgY2hhbmdlZCB3ZSBuZWVkIHRvIHVwZGF0ZSByZS1jYWxjdWxhdGUgdGhlIHN0YXRpYyB3aWR0aCdzIGFnYWluLlxuICAgIGlmIChyb3dXaWR0aC5tYXhXaWR0aExvY2tDaGFuZ2VkKSB7XG4gICAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoY29sdW1ucyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9taW5pbXVtUm93V2lkdGggKSB7XG4gICAgICAvLyBXZSBjYWxjdWxhdGUgdGhlIHRvdGFsIG1pbmltdW0gd2lkdGggb2YgdGhlIGdyaWRcbiAgICAgIC8vIFdlIGRvIGl0IG9uY2UsIHRvIHNldCB0aGUgbWluaW11bSB3aWR0aCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzZXR1cC5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBhcHBseSBzdHJhdGVneSBoZXJlLCB3ZSB3YW50IHRoZSBlbnRpcmUgbGVuZ3RoIG9mIHRoZSBncmlkIVxuICAgICAgdGhpcy5fY2RrVGFibGUubWluV2lkdGggPSByb3dXaWR0aC5taW5pbXVtUm93V2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJyk7XG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uUmVzaXplUm93JyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZW1iZWRkZWQgdmlldyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHVzZXIgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqL1xuICBjcmVhdGVWaWV3PEM+KGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxDPiwgY29udGV4dD86IEMsIGluZGV4PzogbnVtYmVyKTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbik7XG4gICAgY29uc3QgdmlldyA9IHZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZiwgY29udGV4dCwgaW5kZXgpO1xuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBhbHJlYWR5IGNyZWF0ZWQgZW1iZWRkZWQgdmlldy5cbiAgICogQHBhcmFtIHZpZXcgLSBUaGUgdmlldyB0byByZW1vdmVcbiAgICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uLCBpZiBub3Qgc2V0IGRlZmF1bHRzIHRvIGBiZWZvcmVgXG4gICAqIEByZXR1cm5zIHRydWUgd2hlbiBhIHZpZXcgd2FzIHJlbW92ZWQsIGZhbHNlIHdoZW4gbm90LiAoZGlkIG5vdCBleGlzdCBpbiB0aGUgdmlldyBjb250YWluZXIgZm9yIHRoZSBwcm92aWRlZCBsb2NhdGlvbilcbiAgICovXG4gIHJlbW92ZVZpZXcodmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT4sIGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBib29sZWFuIHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbik7XG4gICAgY29uc3QgaWR4ID0gdmNSZWYuaW5kZXhPZih2aWV3KTtcbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2Y1JlZi5yZW1vdmUoaWR4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgYWxsIHZpc2libGUgY29sdW1ucyB0byBmaXQgY29udGVudCBvZiB0aGUgZ3JpZC5cbiAgICogQHBhcmFtIGZvcmNlRml4ZWRXaWR0aCAtIFdoZW4gdHJ1ZSB3aWxsIHJlc2l6ZSBhbGwgY29sdW1ucyB3aXRoIGFic29sdXRlIHBpeGVsIHZhbHVlcywgb3RoZXJ3aXNlIHdpbGwga2VlcCB0aGUgc2FtZSBmb3JtYXQgYXMgb3JpZ2luYWxseSBzZXQgKCUgb3Igbm9uZSlcbiAgICovXG4gIGF1dG9TaXplQ29sdW1uVG9GaXQob3B0aW9ucz86IEF1dG9TaXplVG9GaXRPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgeyBpbm5lcldpZHRoLCBvdXRlcldpZHRoIH0gPSB0aGlzLnZpZXdwb3J0O1xuXG4gICAgLy8gY2FsY3VsYXRlIGF1dG8tc2l6ZSBvbiB0aGUgd2lkdGggd2l0aG91dCBzY3JvbGwgYmFyIGFuZCB0YWtlIGJveCBtb2RlbCBnYXBzIGludG8gYWNjb3VudFxuICAgIC8vIFRPRE86IGlmIG5vIHNjcm9sbCBiYXIgZXhpc3RzIHRoZSBjYWxjIHdpbGwgbm90IGluY2x1ZGUgaXQsIG5leHQgaWYgbW9yZSByb3dzIGFyZSBhZGRlZCBhIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIuLi5cbiAgICB0aGlzLmNvbHVtbkFwaS5hdXRvU2l6ZVRvRml0KG91dGVyV2lkdGggLSAob3V0ZXJXaWR0aCAtIGlubmVyV2lkdGgpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGZpbmRJbml0aWFsUm93SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IHJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldCgwKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgIHJvd0VsZW1lbnQgPSB2aWV3UmVmLnJvb3ROb2Rlc1swXTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUocm93RWxlbWVudCkuaGVpZ2h0O1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGhlaWdodCwgMTApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50KSB7XG4gICAgICByb3dFbGVtZW50ID0gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50Lmxlbmd0aCA+IDBcbiAgICAgICAgPyAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmdldCh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoIC0gMSkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXVxuICAgICAgICA6IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIDtcbiAgICAgIHJvd0VsZW1lbnQgPSByb3dFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByb3dFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNsYXNzKC4uLmNsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xzKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHVnaW5zKGluamVjdG9yOiBJbmplY3RvciwgZWxSZWY6IEVsZW1lbnRSZWY8YW55PiwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYW4gaW5qZWN0b3IgZm9yIHRoZSBleHRlbnNpb25zL3BsdWdpbnNcbiAgICAvLyBUaGlzIGluamVjdG9yIGFsbG93IHBsdWdpbnMgKHRoYXQgY2hvb3NlIHNvKSB0byBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvbiBmb3IgcnVudGltZSB1c2UuXG4gICAgLy8gSS5FOiBhcyBpZiB0aGV5IHdlJ3JlIGNyZWF0ZWQgYnkgYW5ndWxhciB2aWEgdGVtcGxhdGUuLi5cbiAgICAvLyBUaGlzIGFsbG93cyBzZWFtbGVzcyBwbHVnaW4tdG8tcGx1Z2luIGRlcGVuZGVuY2llcyB3aXRob3V0IHJlcXVpcmluZyBzcGVjaWZpYyB0ZW1wbGF0ZSBzeW50YXguXG4gICAgLy8gQW5kIGFsc28gYWxsb3dzIGF1dG8gcGx1Z2luIGJpbmRpbmcgKGFwcCB3aWRlKSB3aXRob3V0IHRoZSBuZWVkIGZvciB0ZW1wbGF0ZSBzeW50YXguXG4gICAgY29uc3QgcGx1Z2luSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogVmlld0NvbnRhaW5lclJlZiwgdXNlVmFsdWU6IHZjUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRWxlbWVudFJlZiwgdXNlVmFsdWU6IGVsUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ2hhbmdlRGV0ZWN0b3JSZWYsIHVzZVZhbHVlOiB0aGlzLmNkciB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogaW5qZWN0b3IsXG4gICAgfSk7XG4gICAgdGhpcy5fcGx1Z2luID0gUGJsTmdyaWRQbHVnaW5Db250ZXh0LmNyZWF0ZSh0aGlzLCBwbHVnaW5JbmplY3RvciwgdGhpcy5fZXh0QXBpKTtcbiAgICBiaW5kVG9EYXRhU291cmNlKHRoaXMuX3BsdWdpbik7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUmVzaXplKCk6IHZvaWQge1xuICAgIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICAgY29uc3Qgcm8kID0gZnJvbUV2ZW50UGF0dGVybjxbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0+KFxuICAgICAgaGFuZGxlciA9PiB7XG4gICAgICAgIGlmICghcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihoYW5kbGVyKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKHJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFNraXAgdGhlIGZpcnN0IGVtaXNzaW9uXG4gICAgLy8gRGVib3VuY2UgYWxsIHJlc2l6ZXMgdW50aWwgdGhlIG5leHQgY29tcGxldGUgYW5pbWF0aW9uIGZyYW1lIHdpdGhvdXQgYSByZXNpemVcbiAgICAvLyBmaW5hbGx5IG1hcHMgdG8gdGhlIGVudHJpZXMgY29sbGVjdGlvblxuICAgIC8vIFNLSVA6ICBXZSBzaG91bGQgc2tpcCB0aGUgZmlyc3QgZW1pc3Npb24gKGBza2lwKDEpYCkgYmVmb3JlIHdlIGRlYm91bmNlLCBzaW5jZSBpdHMgY2FsbGVkIHVwb24gY2FsbGluZyBcIm9ic2VydmVcIiBvbiB0aGUgcmVzaXplT2JzZXJ2ZXIuXG4gICAgLy8gICAgICAgIFRoZSBwcm9ibGVtIGlzIHRoYXQgc29tZSBncmlkIG1pZ2h0IHJlcXVpcmUgdGhpcyBiZWNhdXNlIHRoZXkgZG8gY2hhbmdlIHNpemUuXG4gICAgLy8gICAgICAgIEFuIGV4YW1wbGUgaXMgYSBncmlkIGluIGEgbWF0LXRhYiB0aGF0IGlzIGhpZGRlbiwgdGhlIGdyaWQgd2lsbCBoaXQgdGhlIHJlc2l6ZSBvbmUgd2hlbiB3ZSBmb2N1cyB0aGUgdGFiXG4gICAgLy8gICAgICAgIHdoaWNoIHdpbGwgcmVxdWlyZSBhIHJlc2l6ZSBoYW5kbGluZyBiZWNhdXNlIGl0J3MgaW5pdGlhbCBzaXplIGlzIDBcbiAgICAvLyAgICAgICAgVG8gd29ya2Fyb3VuZCB0aGlzLCB3ZSBvbmx5IHNraXAgZWxlbWVudHMgbm90IHlldCBhZGRlZCB0byB0aGUgRE9NLCB3aGljaCBtZWFucyB0aGV5IHdpbGwgbm90IHRyaWdnZXIgYSByZXNpemUgZXZlbnQuXG4gICAgbGV0IHNraXBWYWx1ZSA9IGRvY3VtZW50LmJvZHkuY29udGFpbnModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KSA/IDEgOiAwO1xuXG4gICAgcm8kXG4gICAgICAucGlwZShcbiAgICAgICAgc2tpcChza2lwVmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICB1bnJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKGFyZ3M6IFtSZXNpemVPYnNlcnZlckVudHJ5W10sIFJlc2l6ZU9ic2VydmVyXSkgPT4ge1xuICAgICAgICBpZiAoc2tpcFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgc2tpcFZhbHVlID0gMTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goIGMgPT4gYy5zaXplSW5mby51cGRhdGVTaXplKCkgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUmVzaXplKGFyZ3NbMF0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uUmVzaXplKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgdGhpcy5fdmlld3BvcnQuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB9XG4gICAgLy8gdGhpcy5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXh0QXBpKCk6IHZvaWQge1xuICAgIGxldCBvbkluaXQ6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG4gICAgY29uc3QgZXh0QXBpID0ge1xuICAgICAgZ3JpZDogdGhpcyxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGdldCBjZGtUYWJsZSgpIHsgcmV0dXJuIGV4dEFwaS5ncmlkLl9jZGtUYWJsZTsgfSxcbiAgICAgIGdldCBldmVudHMoKSB7IHJldHVybiBleHRBcGkuZ3JpZC5fcGx1Z2luLmV2ZW50cyB9LFxuICAgICAgZ2V0IGNvbnRleHRBcGkoKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29udGV4dEFwaScsIHsgdmFsdWU6IG5ldyBDb250ZXh0QXBpPFQ+KGV4dEFwaSkgfSk7XG4gICAgICAgIHJldHVybiBleHRBcGkuY29udGV4dEFwaTtcbiAgICAgIH0sXG4gICAgICBnZXQgbWV0YVJvd1NlcnZpY2UoKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWV0YVJvd1NlcnZpY2UnLCB7IHZhbHVlOiBuZXcgUGJsTmdyaWRNZXRhUm93U2VydmljZTxUPihleHRBcGkpIH0pO1xuICAgICAgICByZXR1cm4gZXh0QXBpLm1ldGFSb3dTZXJ2aWNlO1xuICAgICAgfSxcbiAgICAgIG9uSW5pdDogKGZuOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGlmIChleHRBcGkuZ3JpZC5pc0luaXQpIHtcbiAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvbkluaXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgdSA9IGV4dEFwaS5ldmVudHMuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9uSW5pdEZuIG9mIG9uSW5pdCkge1xuICAgICAgICAgICAgICAgICAgb25Jbml0Rm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIG9uSW5pdCA9IHUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkluaXQucHVzaChmbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdG9yZTogdGhpcy5fc3RvcmUsXG4gICAgICBzZXRWaWV3cG9ydDogKHZpZXdwb3J0KSA9PiB0aGlzLl92aWV3cG9ydCA9IHZpZXdwb3J0LFxuICAgICAgZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeTogKCk6IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyhEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2V4dEFwaSA9IGV4dEFwaTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBOb0RhdGEoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZikge1xuICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGZvcmNlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vRGF0YSA9IHRoaXMuX2RhdGFTb3VyY2UgJiYgdGhpcy5fZGF0YVNvdXJjZS5yZW5kZXJMZW5ndGggPT09IDA7XG4gICAgaWYgKG5vRGF0YSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1lbXB0eScpO1xuICAgIH1cblxuICAgIGlmIChub0RhdGEgfHwgZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG5vRGF0YVRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRTaW5nbGUoJ25vRGF0YScpO1xuICAgICAgaWYgKG5vRGF0YVRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIG5vRGF0YVRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIGxvY2F0aW9uID09PSAnYmVmb3JlVGFibGUnXG4gICAgICA/IHRoaXMuX3ZjUmVmQmVmb3JlVGFibGVcbiAgICAgIDogbG9jYXRpb24gPT09ICdiZWZvcmVDb250ZW50JyA/IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCA6IHRoaXMuX3ZjUmVmQWZ0ZXJDb250ZW50XG4gICAgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFBhZ2luYXRvcigpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uS2lsbEtleSA9ICdwYmxQYWdpbmF0aW9uS2lsbEtleSc7XG4gICAgY29uc3QgdXNlUGFnaW5hdGlvbiA9IHRoaXMuZHMgJiYgdGhpcy51c2VQYWdpbmF0aW9uO1xuXG4gICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuZHMucGFnaW5hdGlvbiA9IHRoaXMuX3BhZ2luYXRpb247XG4gICAgICBpZiAodGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgdW5yeC5raWxsKHRoaXMsIHBhZ2luYXRpb25LaWxsS2V5KTtcbiAgICAgIGlmICh0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgICAgY29uc3QgcGFnaW5hdG9yVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgncGFnaW5hdG9yJyk7XG4gICAgICAgIGlmIChwYWdpbmF0b3JUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIHBhZ2luYXRvclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHRoaXMuX3N0b3JlLmNvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wsICd0YWJsZUNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggY2VsbCApIHtcbiAgICAgICAgY29sLmNlbGxUcGwgPSBjZWxsLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWZhdWx0Q2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ3RhYmxlQ2VsbCcpO1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGRlZmF1bHRDZWxsVGVtcGxhdGUgPyBkZWZhdWx0Q2VsbFRlbXBsYXRlLnRSZWYgOiB0aGlzLl9mYlRhYmxlQ2VsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWRpdG9yQ2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ2VkaXRvckNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggZWRpdG9yQ2VsbCApIHtcbiAgICAgICAgY29sLmVkaXRvclRwbCA9IGVkaXRvckNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZWRpdG9yQ2VsbCcpO1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uczogQXJyYXk8UGJsQ29sdW1uIHwgUGJsTWV0YUNvbHVtblN0b3JlPiA9IFtdLmNvbmNhdCh0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgY29uc3QgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdoZWFkZXJDZWxsJykgfHwgeyB0UmVmOiB0aGlzLl9mYkhlYWRlckNlbGwgfTtcbiAgICBjb25zdCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2Zvb3RlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiRm9vdGVyQ2VsbCB9O1xuICAgIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZjxUPih0aGlzLnJlZ2lzdHJ5LCBjb2wsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2Zvb3RlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb2wuaGVhZGVyQ2VsbFRwbCA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgY29sLmZvb3RlckNlbGxUcGwgPSBmb290ZXJDZWxsRGVmLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29sLmhlYWRlcikge1xuICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuaGVhZGVyLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlci50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmhlYWRlckdyb3VwKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXJHcm91cCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICAgIGNvbC5oZWFkZXJHcm91cC50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmZvb3Rlcikge1xuICAgICAgICAgIGNvbnN0IGZvb3RlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuZm9vdGVyLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmZvb3Rlci50ZW1wbGF0ZSA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRIZWFkZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dEZWZzKSB7XG4gICAgICAvLyBUaGUgZ3JpZCBoZWFkZXIgKG1haW4sIHdpdGggY29sdW1uIG5hbWVzKSBpcyBhbHdheXMgdGhlIGxhc3Qgcm93IGRlZiAoaW5kZXggMClcbiAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCBpdCB0byBzaG93IGxhc3QgKGFmdGVyIGN1c3RvbSBoZWFkZXJzLCBncm91cCBoZWFkZXJzLi4uKSB3ZSBmaXJzdCBuZWVkIHRvIHB1bGwgaXQgYW5kIHRoZW4gcHVzaC5cblxuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgICBjb25zdCBhcnIgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLnRvQXJyYXkoKTtcbiAgICAgIGFyci5wdXNoKGFyci5zaGlmdCgpKTtcblxuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgYXJyKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb290ZXJSb3dEZWZzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMuX2Zvb3RlclJvd0RlZnMudG9BcnJheSgpKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19