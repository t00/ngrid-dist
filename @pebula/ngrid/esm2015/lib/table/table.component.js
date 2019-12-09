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
import { EXT_API_TOKEN } from '../ext/table-ext-api';
import { PblNgridPluginController, PblNgridPluginContext } from '../ext/plugin-control';
import { PblDataSource, createDS } from '../data-source/index';
import { resetColumnWidths } from './utils';
import { findCellDef } from './directives/cell-def';
import { PblColumnStore, isPblColumn } from './columns';
import { ContextApi } from './context/index';
import { PblNgridRegistryService } from './services/table-registry.service';
import { PblNgridConfigService } from './services/config';
import { DynamicColumnWidthLogic, DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY } from './col-width-logic/dynamic-column-width';
import { ColumnApi } from './column-api';
import { PblNgridMetaRowService } from './meta-rows/index';
import { bindToDataSource } from './bind-to-datasource';
import './bind-to-datasource'; // LEAVE THIS, WE NEED IT SO THE AUGMENTATION IN THE FILE WILL LOAD.
// LEAVE THIS, WE NEED IT SO THE AUGMENTATION IN THE FILE WILL LOAD.
import { setIdentityProp } from './table.deprecate-at-1.0.0';
/**
 * @param {?} table
 * @return {?}
 */
export function internalApiFactory(table) { return table._extApi; }
/**
 * @param {?} table
 * @return {?}
 */
export function pluginControllerFactory(table) { return table._plugin.controller; }
/**
 * @param {?} table
 * @return {?}
 */
export function metaRowServiceFactory(table) { return table._extApi.metaRowService; }
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
        const tableConfig = config.get('table');
        this.showHeader = tableConfig.showHeader;
        this.showFooter = tableConfig.showFooter;
        this.noFiller = tableConfig.noFiller;
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
     * The table's source of data
     *
     * \@remarks
     * The table's source of data, which can be provided in 2 ways:
     *
     * - DataSourceOf<T>
     * - PblDataSource<T>
     *
     * The table only works with `PblDataSource<T>`, `DataSourceOf<T>` is a shortcut for providing
     * the data array directly.
     *
     * `DataSourceOf<T>` can be:
     *
     * - Simple data array (each object represents one table row)
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
     * If the table does not have a height (% or px) the "inner scroll container" will always have no height (0).
     * If the table has a height, the "inner scroll container" will get the height left, which can also be 0 if there are a lot of external objects.
     *
     * To solve the no-height problem we use the fallbackMinHeight property.
     *
     * When virtual scroll is disabled and fallbackMinHeight is not set the table will set the "inner scroll container" height to show all rows.
     *
     * Note that when using a fixed (px) height for the table, if the height of all external objects + the height of the "inner scroll container" is greater then
     * the table's height a vertical scroll bar will show.
     * If the "inner scroll container"s height will be lower then it's rendered content height and additional vertical scroll bar will appear, which is, usually, not good.
     *
     * To avoid this, don't use fallbackMinHeight together with a fixed height for the table. Instead use fallbackMinHeight together with a min height for the table.
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
        // no need to unsubscribe, the reg service is per table instance and it will destroy when this table destroy.
        // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
        // the order here is very important, because component top of this table will fire life cycle hooks AFTER this component
        // so if we have a top level component registering a template on top it will not show unless we listen.
        this.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        changes => {
            /** @type {?} */
            let tableCell = false;
            /** @type {?} */
            let headerFooterCell = false;
            for (const c of changes) {
                switch (c.type) {
                    case 'tableCell':
                        tableCell = true;
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
            if (tableCell) {
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
                    // If the number of rendered items has changed the table will update the data and run CD on it.
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
    
            The simplest solution is to force the table to render all data rows from scratch which will destroy the cache and all cell's with it, creating new one's with proper reference.
    
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
     * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @return {?}
     */
    resetColumnsWidth() {
        resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
    }
    /**
     * Update the size of all group columns in the table based on the size of their visible children (not hidden).
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
        // if this is a table without groups
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
            // We calculate the total minimum width of the table
            // We do it once, to set the minimum width based on the initial setup.
            // Note that we don't apply strategy here, we want the entire length of the table!
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
     * Resize all visible columns to fit content of the table.
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
        //        The problem is that some tables might require this because they do change size.
        //        An example is a table in a mat-tab that is hidden, the table will hit the resize one when we focus the tab
        //        which will require a resize handling because it's initial size is 0
        //        To workaround this, we only skip elements not yet added to the DOM, which means they will not trigger a resize event.
        /** @type {?} */
        let skipValue = document.body.contains(this.elRef.nativeElement) ? 1 : 0;
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
            table: this,
            element: this.elRef.nativeElement,
            /**
             * @return {?}
             */
            get cdkTable() { return extApi.table._cdkTable; },
            /**
             * @return {?}
             */
            get events() { return extApi.table._plugin.events; },
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
                if (extApi.table.isInit) {
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
            // The table header (main, with column names) is always the last row def (index 0)
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
                template: "<!-- TABLE HEADER ROW DEF -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-visually-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- TABLE FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- TABLE FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n       <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- TABLE HEADER CELL DEF -->\n        <pbl-ngrid-header-cell *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- TABLE FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
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
     * Set's the behavior of the table when tabbing.
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
     * The column definitions for this table.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlILE9BQU8sRUFDTCxhQUFhLEVBQ2IsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUNSLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQzNFLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFP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QUFrRDs7Ozs7SUFDbEQsbURBQXFEOzs7OztJQUNyRCx3Q0FBbUQ7Ozs7O0lBQ25ELDhDQUFrQzs7Ozs7SUFDbEMsNkNBQWlDOzs7OztJQUNqQyxzQ0FBeUQ7Ozs7O0lBQ3pELG9DQUF1Qzs7Ozs7SUFDdkMsb0NBQXlDOzs7OztJQUc3QixrQ0FBc0M7Ozs7O0lBQ3RDLG9DQUFnQzs7Ozs7SUFDaEMsbUNBQXNCOzs7OztJQUN0QixnQ0FBOEI7Ozs7O0lBQzlCLG1DQUFxQzs7SUFDckMscUNBQXdDOztJQUN4QywrQkFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCB7IGFzYXBTY2hlZHVsZXIsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBmcm9tRXZlbnRQYXR0ZXJuIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UsIHRhcCwgb2JzZXJ2ZU9uLCBzd2l0Y2hNYXAsIG1hcCwgbWFwVG8sIHN0YXJ0V2l0aCwgcGFpcndpc2UsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdG9yLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgTmdab25lLFxuICBpc0Rldk1vZGUsIGZvcndhcmRSZWYsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIERvQ2hlY2ssIEF0dHJpYnV0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrSGVhZGVyUm93RGVmLCBDZGtGb290ZXJSb3dEZWYsIENka1Jvd0RlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfSBmcm9tICcuLi9wYWdpbmF0b3InO1xuaW1wb3J0IHsgRGF0YVNvdXJjZVByZWRpY2F0ZSwgRGF0YVNvdXJjZUZpbHRlclRva2VuLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxEYXRhU291cmNlLCBEYXRhU291cmNlT2YsIGNyZWF0ZURTIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2UvaW5kZXgnO1xuaW1wb3J0IHsgUGJsQ2RrVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgcmVzZXRDb2x1bW5XaWR0aHMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGZpbmRDZWxsRGVmIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NlbGwtZGVmJztcbmltcG9ydCB7IFBibENvbHVtbiwgUGJsQ29sdW1uU3RvcmUsIFBibE1ldGFDb2x1bW5TdG9yZSwgUGJsTmdyaWRDb2x1bW5TZXQsIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCwgaXNQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIENvbnRleHRBcGksIFBibE5ncmlkQ29udGV4dEFwaSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90YWJsZS1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljLCBEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZIH0gZnJvbSAnLi9jb2wtd2lkdGgtbG9naWMvZHluYW1pYy1jb2x1bW4td2lkdGgnO1xuaW1wb3J0IHsgQ29sdW1uQXBpLCBBdXRvU2l6ZVRvRml0T3B0aW9ucyB9IGZyb20gJy4vY29sdW1uLWFwaSc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvd3MvaW5kZXgnO1xuXG5pbXBvcnQgeyBiaW5kVG9EYXRhU291cmNlIH0gZnJvbSAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnO1xuaW1wb3J0ICcuL2JpbmQtdG8tZGF0YXNvdXJjZSc7IC8vIExFQVZFIFRISVMsIFdFIE5FRUQgSVQgU08gVEhFIEFVR01FTlRBVElPTiBJTiBUSEUgRklMRSBXSUxMIExPQUQuXG5cbmltcG9ydCB7IHNldElkZW50aXR5UHJvcCB9IGZyb20gJy4vdGFibGUuZGVwcmVjYXRlLWF0LTEuMC4wJztcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVybmFsQXBpRmFjdG9yeSh0YWJsZTogeyBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTsgfSkgeyByZXR1cm4gdGFibGUuX2V4dEFwaTsgfVxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbkNvbnRyb2xsZXJGYWN0b3J5KHRhYmxlOiB7IF9wbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dDsgfSkgeyByZXR1cm4gdGFibGUuX3BsdWdpbi5jb250cm9sbGVyOyB9XG5leHBvcnQgZnVuY3Rpb24gbWV0YVJvd1NlcnZpY2VGYWN0b3J5KHRhYmxlOiB7IF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpOyB9KSB7IHJldHVybiB0YWJsZS5fZXh0QXBpLm1ldGFSb3dTZXJ2aWNlOyB9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi90YWJsZS5jb21wb25lbnQuc2NzcycgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgdXNlRmFjdG9yeTogcGx1Z2luQ29udHJvbGxlckZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogRVhUX0FQSV9UT0tFTixcbiAgICAgIHVzZUZhY3Rvcnk6IGludGVybmFsQXBpRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogbWV0YVJvd1NlcnZpY2VGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBoZWFkZXIgcm93LlxuICAgKiBEZWZhdWx0OiB0cnVlXG4gICAqL1xuICBASW5wdXQoKSBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dIZWFkZXI7IH07XG4gIHNldCBzaG93SGVhZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3Nob3dIZWFkZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3cvSGlkZSB0aGUgZm9vdGVyIHJvdy5cbiAgICogRGVmYXVsdDogZmFsc2VcbiAgICovXG4gIEBJbnB1dCgpIGdldCBzaG93Rm9vdGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0Zvb3RlcjsgfTtcbiAgc2V0IHNob3dGb290ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93Rm9vdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2hvd0Zvb3RlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB0aGUgZmlsbGVyIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG5vRmlsbGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbm9GaWxsZXI7IH07XG4gIHNldCBub0ZpbGxlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX25vRmlsbGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfbm9GaWxsZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldCdzIHRoZSBiZWhhdmlvciBvZiB0aGUgdGFibGUgd2hlbiB0YWJiaW5nLlxuICAgKiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyBub25lIChyb3dzIGFuZCBjZWxscyBhcmUgbm90IGZvY3VzYWJsZSlcbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBmb2N1cyBtb2RlIGhhcyBhbiBlZmZlY3Qgb24gb3RoZXIgZnVuY3Rpb25zLCBmb3IgZXhhbXBsZSBhIGRldGFpbCByb3cgd2lsbCB0b2dnbGUgKG9wZW4vY2xvc2UpIHVzaW5nXG4gICAqIEVOVEVSIC8gU1BBQ0Ugb25seSB3aGVuIGZvY3VzTW9kZSBpcyBzZXQgdG8gYHJvd2AuXG4gICAqL1xuICBASW5wdXQoKSBmb2N1c01vZGU6ICdyb3cnIHwgJ2NlbGwnIHwgJ25vbmUnIHwgJycgfCBmYWxzZSB8IHVuZGVmaW5lZDtcblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBwSW5kZXhgIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbi4gKFJlbW92ZWQgaW4gMS4wLjApXG4gICAqL1xuICBASW5wdXQoKSBnZXQgaWRlbnRpdHlQcm9wKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9faWRlbnRpdHlQcm9wOyB9XG4gIHNldCBpZGVudGl0eVByb3AodmFsdWU6IHN0cmluZykgeyB0aGlzLl9faWRlbnRpdHlQcm9wID0gdmFsdWU7IHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdmFsdWUpOyB9XG4gIHByaXZhdGUgX19pZGVudGl0eVByb3A6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRhYmxlJ3Mgc291cmNlIG9mIGRhdGFcbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhlIHRhYmxlJ3Mgc291cmNlIG9mIGRhdGEsIHdoaWNoIGNhbiBiZSBwcm92aWRlZCBpbiAyIHdheXM6XG4gICAqXG4gICAqIC0gRGF0YVNvdXJjZU9mPFQ+XG4gICAqIC0gUGJsRGF0YVNvdXJjZTxUPlxuICAgKlxuICAgKiBUaGUgdGFibGUgb25seSB3b3JrcyB3aXRoIGBQYmxEYXRhU291cmNlPFQ+YCwgYERhdGFTb3VyY2VPZjxUPmAgaXMgYSBzaG9ydGN1dCBmb3IgcHJvdmlkaW5nXG4gICAqIHRoZSBkYXRhIGFycmF5IGRpcmVjdGx5LlxuICAgKlxuICAgKiBgRGF0YVNvdXJjZU9mPFQ+YCBjYW4gYmU6XG4gICAqXG4gICAqIC0gU2ltcGxlIGRhdGEgYXJyYXkgKGVhY2ggb2JqZWN0IHJlcHJlc2VudHMgb25lIHRhYmxlIHJvdylcbiAgICogLSBQcm9taXNlIGZvciBhIGRhdGEgYXJyYXlcbiAgICogLSBTdHJlYW0gdGhhdCBlbWl0cyBhIGRhdGEgYXJyYXkgZWFjaCB0aW1lIHRoZSBhcnJheSBjaGFuZ2VzXG4gICAqXG4gICAqIFdoZW4gYSBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBwcm92aWRlZCBpdCBpcyBjb252ZXJ0ZWQgaW50byBhbiBpbnN0YW5jZSBvZiBgUGJsRGF0YVNvdXJjZTxUPmAuXG4gICAqXG4gICAqIFRvIGFjY2VzcyB0aGUgYFBibERhdGFTb3VyY2U8VD5gIGluc3RhbmNlIHVzZSB0aGUgYGRzYCBwcm9wZXJ0eSAocmVhZG9ubHkpLlxuICAgKlxuICAgKiBJdCBpcyBoaWdobHkgcmVjb21tZW5kZWQgdG8gdXNlIGBQYmxEYXRhU291cmNlPFQ+YCBkaXJlY3RseSwgdGhlIGRhdGFzb3VyY2UgZmFjdG9yeSBtYWtlcyBpdCBlYXN5LlxuICAgKiBGb3IgZXhhbXBsZSwgd2hlbiBhbiBhcnJheSBpcyBwcm92aWRlZCB0aGUgZmFjdG9yeSBpcyB1c2VkIHRvIGNvbnZlcnQgaXQgdG8gYSBkYXRhc291cmNlOlxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGNvbGxlY3Rpb246IFRbXSA9IFtdO1xuICAgKiBjb25zdCBwYmxEYXRhU291cmNlID0gY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IGNvbGxlY3Rpb24gKS5jcmVhdGUoKTtcbiAgICogYGBgXG4gICAqXG4gICAqID4gVGhpcyBpcyBhIHdyaXRlLW9ubHkgKHNldHRlcikgcHJvcGVydHkgdGhhdCB0cmlnZ2VycyB0aGUgYHNldERhdGFTb3VyY2VgIG1ldGhvZC5cbiAgICovXG4gIEBJbnB1dCgpIHNldCBkYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+IHwgRGF0YVNvdXJjZU9mPFQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUGJsRGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5zZXREYXRhU291cmNlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhU291cmNlKGNyZWF0ZURTPFQ+KCkub25UcmlnZ2VyKCAoKSA9PiB2YWx1ZSB8fCBbXSApLmNyZWF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZHMoKTogUGJsRGF0YVNvdXJjZTxUPiB7IHJldHVybiB0aGlzLl9kYXRhU291cmNlOyB9O1xuXG4gIEBJbnB1dCgpIGdldCB1c2VQYWdpbmF0aW9uKCk6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlIHsgcmV0dXJuIHRoaXMuX3BhZ2luYXRpb247IH1cbiAgc2V0IHVzZVBhZ2luYXRpb24odmFsdWU6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlKSB7XG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpID09PSAnJykge1xuICAgICAgdmFsdWUgPSAncGFnZU51bWJlcic7XG4gICAgfVxuICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3BhZ2luYXRpb24gKSB7XG4gICAgICB0aGlzLl9wYWdpbmF0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IG5vQ2FjaGVQYWdpbmF0b3IoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yOyB9XG4gIHNldCBub0NhY2hlUGFnaW5hdG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9ub0NhY2hlUGFnaW5hdG9yICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbm9DYWNoZVBhZ2luYXRvciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZHMgJiYgdGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhpcyB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnM6IFBibE5ncmlkQ29sdW1uU2V0IHwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0O1xuXG4gIEBJbnB1dCgpIHNldCBoaWRlQ29sdW1ucyh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9oaWRlQ29sdW1ucyA9IHZhbHVlO1xuICAgIHRoaXMuX2hpZGVDb2x1bW5zRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZmFsbGJhY2sgaGVpZ2h0IGZvciBcInRoZSBpbm5lciBzY3JvbGwgY29udGFpbmVyXCIuXG4gICAqIFRoZSBmYWxsYmFjayBpcyB1c2VkIG9ubHkgd2hlbiBpdCBMT1dFUiB0aGFuIHRoZSByZW5kZXJlZCBoZWlnaHQsIHNvIG5vIGVtcHR5IGdhcHMgYXJlIGNyZWF0ZWQgd2hlbiBzZXR0aW5nIHRoZSBmYWxsYmFjay5cbiAgICpcbiAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIHRoZSBhcmVhIGluIHdoaWNoIGFsbCBkYXRhIHJvd3MgYXJlIHJlbmRlcmVkIGFuZCBhbGwgbWV0YSAoaGVhZGVyL2Zvb3Rlcikgcm93cyB0aGF0IGFyZSBvZiB0eXBlIFwicm93XCIgb3IgXCJzdGlja3lcIi5cbiAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIGRlZmluZWQgdG8gY29uc3VtZSBhbGwgdGhlIGhlaWdodCBsZWZ0IGFmdGVyIGFsbCBleHRlcm5hbCBvYmplY3RzIGFyZSByZW5kZXJlZC5cbiAgICogRXh0ZXJuYWwgb2JqZWN0cyBjYW4gYmUgZml4ZWQgbWV0YSByb3dzIChoZWFkZXIvZm9vdGVyKSwgcGFnaW5hdGlvbiByb3csIGFjdGlvbiByb3cgZXRjLi4uXG4gICAqXG4gICAqIElmIHRoZSB0YWJsZSBkb2VzIG5vdCBoYXZlIGEgaGVpZ2h0ICglIG9yIHB4KSB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBhbHdheXMgaGF2ZSBubyBoZWlnaHQgKDApLlxuICAgKiBJZiB0aGUgdGFibGUgaGFzIGEgaGVpZ2h0LCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBnZXQgdGhlIGhlaWdodCBsZWZ0LCB3aGljaCBjYW4gYWxzbyBiZSAwIGlmIHRoZXJlIGFyZSBhIGxvdCBvZiBleHRlcm5hbCBvYmplY3RzLlxuICAgKlxuICAgKiBUbyBzb2x2ZSB0aGUgbm8taGVpZ2h0IHByb2JsZW0gd2UgdXNlIHRoZSBmYWxsYmFja01pbkhlaWdodCBwcm9wZXJ0eS5cbiAgICpcbiAgICogV2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBkaXNhYmxlZCBhbmQgZmFsbGJhY2tNaW5IZWlnaHQgaXMgbm90IHNldCB0aGUgdGFibGUgd2lsbCBzZXQgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGhlaWdodCB0byBzaG93IGFsbCByb3dzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiB1c2luZyBhIGZpeGVkIChweCkgaGVpZ2h0IGZvciB0aGUgdGFibGUsIGlmIHRoZSBoZWlnaHQgb2YgYWxsIGV4dGVybmFsIG9iamVjdHMgKyB0aGUgaGVpZ2h0IG9mIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBncmVhdGVyIHRoZW5cbiAgICogdGhlIHRhYmxlJ3MgaGVpZ2h0IGEgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIHNob3cuXG4gICAqIElmIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcInMgaGVpZ2h0IHdpbGwgYmUgbG93ZXIgdGhlbiBpdCdzIHJlbmRlcmVkIGNvbnRlbnQgaGVpZ2h0IGFuZCBhZGRpdGlvbmFsIHZlcnRpY2FsIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIsIHdoaWNoIGlzLCB1c3VhbGx5LCBub3QgZ29vZC5cbiAgICpcbiAgICogVG8gYXZvaWQgdGhpcywgZG9uJ3QgdXNlIGZhbGxiYWNrTWluSGVpZ2h0IHRvZ2V0aGVyIHdpdGggYSBmaXhlZCBoZWlnaHQgZm9yIHRoZSB0YWJsZS4gSW5zdGVhZCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIG1pbiBoZWlnaHQgZm9yIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBmYWxsYmFja01pbkhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQ7IH1cbiAgc2V0IGZhbGxiYWNrTWluSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHJvd0NsYXNzVXBkYXRlOiB1bmRlZmluZWQgfCAoIChjb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pID0+ICggc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSApKTtcbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGVGcmVxOiAnaXRlbScgfCAnbmdEb0NoZWNrJyB8ICdub25lJyA9ICdpdGVtJztcblxuICByb3dGb2N1czogMCB8ICcnID0gJyc7XG4gIGNlbGxGb2N1czogMCB8ICcnID0gJyc7XG5cbiAgcHJpdmF0ZSBfZmFsbGJhY2tNaW5IZWlnaHQgPSAwO1xuICBwcml2YXRlIF9kYXRhU291cmNlOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZVRhYmxlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQmVmb3JlVGFibGU6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZUNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVDb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdhZnRlckNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZBZnRlckNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ZiVGFibGVDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYlRhYmxlQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiSGVhZGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJIZWFkZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiRm9vdGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJGb290ZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoQ2RrUm93RGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBfdGFibGVSb3dEZWY6IENka1Jvd0RlZjxUPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtIZWFkZXJSb3dEZWYpIF9oZWFkZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrSGVhZGVyUm93RGVmPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtGb290ZXJSb3dEZWYpIF9mb290ZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrRm9vdGVyUm93RGVmPjtcblxuICBnZXQgbWV0YUNvbHVtbklkcygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbklkcyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5JZHM7IH1cbiAgZ2V0IG1ldGFDb2x1bW5zKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1ucyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5Sb3dEZWYoKSB7IHJldHVybiB7IGhlYWRlcjogdGhpcy5fc3RvcmUuaGVhZGVyQ29sdW1uRGVmLCBmb290ZXI6IHRoaXMuX3N0b3JlLmZvb3RlckNvbHVtbkRlZiB9OyB9XG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCAoYWZ0ZXIgQWZ0ZXJWaWV3SW5pdClcbiAgICovXG4gIHJlYWRvbmx5IGlzSW5pdDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY29sdW1uQXBpOiBDb2x1bW5BcGk8VD47XG4gIGdldCBjb250ZXh0QXBpKCk6IFBibE5ncmlkQ29udGV4dEFwaTxUPiB7IHJldHVybiB0aGlzLl9leHRBcGkuY29udGV4dEFwaTsgfVxuXG4gIGdldCB2aWV3cG9ydCgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fdmlld3BvcnQ7IH1cblxuICBfY2RrVGFibGU6IFBibENka1RhYmxlQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIF9zdG9yZTogUGJsQ29sdW1uU3RvcmUgPSBuZXcgUGJsQ29sdW1uU3RvcmUoKTtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnNEaXJ0eTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnM6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jb2xIaWRlRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+O1xuICBwcml2YXRlIF9ub0RhdGVFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0b3JFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZTtcbiAgcHJpdmF0ZSBfbm9DYWNoZVBhZ2luYXRvciA9IGZhbHNlO1xuICBwcml2YXRlIF9taW5pbXVtUm93V2lkdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmlld3BvcnQ/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQ7XG4gIHByaXZhdGUgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0O1xuICBwcml2YXRlIF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdpZCcpIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdGFibGVDb25maWcgPSBjb25maWcuZ2V0KCd0YWJsZScpO1xuICAgIHRoaXMuc2hvd0hlYWRlciA9IHRhYmxlQ29uZmlnLnNob3dIZWFkZXI7XG4gICAgdGhpcy5zaG93Rm9vdGVyID0gdGFibGVDb25maWcuc2hvd0Zvb3RlcjtcbiAgICB0aGlzLm5vRmlsbGVyID0gdGFibGVDb25maWcubm9GaWxsZXI7XG5cbiAgICB0aGlzLmluaXRFeHRBcGkoKTtcbiAgICB0aGlzLmNvbHVtbkFwaSA9IENvbHVtbkFwaS5jcmVhdGU8VD4odGhpcywgdGhpcy5fc3RvcmUsIHRoaXMuX2V4dEFwaSk7XG4gICAgdGhpcy5pbml0UGx1Z2lucyhpbmplY3RvciwgZWxSZWYsIHZjUmVmKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZUNvbHVtbnNEaXJ0eSkge1xuICAgICAgdGhpcy5faGlkZUNvbHVtbnNEaXJ0eSA9IGZhbHNlO1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9oaWRlQ29sdW1ucztcbiAgICAgIGlmICghdGhpcy5fY29sSGlkZURpZmZlciAmJiB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX2NvbEhpZGVEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZSkuY3JlYXRlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGEgZGlmZmVyIHN1cHBvcnRpbmcgb2JqZWN0ICcke3ZhbHVlfS4gaGlkZUNvbHVtbnMgb25seSBzdXBwb3J0cyBiaW5kaW5nIHRvIEl0ZXJhYmxlcyBzdWNoIGFzIEFycmF5cy5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fY29sSGlkZURpZmZlcikge1xuICAgICAgY29uc3QgaGlkZUNvbHVtbnMgPSB0aGlzLl9oaWRlQ29sdW1ucyB8fCBbXTtcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9jb2xIaWRlRGlmZmVyLmRpZmYoaGlkZUNvbHVtbnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuaGlkZGVuID0gaGlkZUNvbHVtbnM7XG4gICAgICAgIHRoaXMuX21pbmltdW1Sb3dXaWR0aCA9ICcnO1xuXG4gICAgICAgIC8vIFRPRE8oc2hsb21pYXNzYWYpIFtwZXJmLCA0XTogUmlnaHQgbm93IHdlIGF0dGFjaCBhbGwgY29sdW1ucywgd2UgY2FuIGltcHJvdmUgaXQgYnkgYXR0YWNoaW5nIG9ubHkgdGhvc2UgXCJhZGRlZFwiICh3ZSBrbm93IHRoZW0gZnJvbSBcImNoYW5nZXNcIilcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX2hpZGVDb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuX2NvbEhpZGVEaWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIG5vIG5lZWQgdG8gdW5zdWJzY3JpYmUsIHRoZSByZWcgc2VydmljZSBpcyBwZXIgdGFibGUgaW5zdGFuY2UgYW5kIGl0IHdpbGwgZGVzdHJveSB3aGVuIHRoaXMgdGFibGUgZGVzdHJveS5cbiAgICAvLyBBbHNvLCBhdCB0aGlzIHBvaW50IGluaXRpYWwgY2hhbmdlcyBmcm9tIHRlbXBsYXRlcyBwcm92aWRlZCBpbiB0aGUgY29udGVudCBhcmUgYWxyZWFkeSBpbnNpZGUgc28gdGhleSB3aWxsIG5vdCB0cmlnZ2VyXG4gICAgLy8gdGhlIG9yZGVyIGhlcmUgaXMgdmVyeSBpbXBvcnRhbnQsIGJlY2F1c2UgY29tcG9uZW50IHRvcCBvZiB0aGlzIHRhYmxlIHdpbGwgZmlyZSBsaWZlIGN5Y2xlIGhvb2tzIEFGVEVSIHRoaXMgY29tcG9uZW50XG4gICAgLy8gc28gaWYgd2UgaGF2ZSBhIHRvcCBsZXZlbCBjb21wb25lbnQgcmVnaXN0ZXJpbmcgYSB0ZW1wbGF0ZSBvbiB0b3AgaXQgd2lsbCBub3Qgc2hvdyB1bmxlc3Mgd2UgbGlzdGVuLlxuICAgIHRoaXMucmVnaXN0cnkuY2hhbmdlcy5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgbGV0IHRhYmxlQ2VsbCA9IGZhbHNlO1xuICAgICAgbGV0IGhlYWRlckZvb3RlckNlbGwgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgYyBvZiBjaGFuZ2VzKSB7XG4gICAgICAgIHN3aXRjaCAoYy50eXBlKSB7XG4gICAgICAgICAgY2FzZSAndGFibGVDZWxsJzpcbiAgICAgICAgICAgIHRhYmxlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJDZWxsJzpcbiAgICAgICAgICBjYXNlICdmb290ZXJDZWxsJzpcbiAgICAgICAgICAgIGhlYWRlckZvb3RlckNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbm9EYXRhJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcic6XG4gICAgICAgICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRhYmxlQ2VsbCkge1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgIH1cbiAgICAgIGlmIChoZWFkZXJGb290ZXJDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW52YWxpZGF0ZUNvbHVtbnMoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNJbml0JywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uSW5pdCcgfSk7XG5cbiAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG5cbiAgICAvLyBBZGRpbmcgYSBkaXYgYmVmb3JlIHRoZSBmb290ZXIgcm93IHZpZXcgcmVmZXJlbmNlLCB0aGlzIGRpdiB3aWxsIGJlIHVzZWQgdG8gZmlsbCB1cCB0aGUgc3BhY2UgYmV0d2VlbiBoZWFkZXIgJiBmb290ZXIgcm93c1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtZW1wdHktc3BhY2VyJylcbiAgICB0aGlzLl9jZGtUYWJsZS5fZWxlbWVudC5pbnNlcnRCZWZvcmUoZGl2LCB0aGlzLl9jZGtUYWJsZS5fZm9vdGVyUm93T3V0bGV0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5saXN0ZW5Ub1Jlc2l6ZSgpO1xuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIHdpbGwgY2F0Y2ggY29udGV4dCBmb2N1c2VkIGV2ZW50cywgZmluZCB0aGUgSFRNTCBlbGVtZW50IG9mIHRoZSBjZWxsIGFuZCBmb2N1cyBpdC5cbiAgICB0aGlzLmNvbnRleHRBcGkuZm9jdXNDaGFuZ2VkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5jdXJyKSB7XG4gICAgICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMuY29udGV4dEFwaS5maW5kUm93SW5WaWV3KGV2ZW50LmN1cnIucm93SWRlbnQpO1xuICAgICAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldChyb3dDb250ZXh0LmluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgICAgICAgIGlmICh2aWV3KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxWaWV3SW5kZXggPSB0aGlzLmNvbHVtbkFwaS5yZW5kZXJJbmRleE9mKHRoaXMuY29sdW1uQXBpLmNvbHVtbnNbZXZlbnQuY3Vyci5jb2xJbmRleF0pXG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gdmlldy5yb290Tm9kZXNbMF0ucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLWNlbGwnKVtjZWxsVmlld0luZGV4XTtcbiAgICAgICAgICAgICAgaWYgKGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IHByb2Nlc3NDb2x1bW5zID0gZmFsc2U7XG5cbiAgICBpZiAoY2hhbmdlcy5mb2N1c01vZGUpIHtcbiAgICAgIHRoaXMucm93Rm9jdXMgPSB0aGlzLmZvY3VzTW9kZSA9PT0gJ3JvdycgPyAwIDogJyc7XG4gICAgICB0aGlzLmNlbGxGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAnY2VsbCcgPyAwIDogJyc7XG4gICAgfVxuXG4gICAgaWYgKCBjaGFuZ2VzLmNvbHVtbnMgJiYgdGhpcy5pc0luaXQgKSB7XG4gICAgICBwcm9jZXNzQ29sdW1ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCBwcm9jZXNzQ29sdW1ucyA9PT0gdHJ1ZSApIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUNvbHVtbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcGx1Z2luLmRlc3Ryb3koKTtcbiAgICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5kZXRhY2hWaWV3UG9ydCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcDogUHJvbWlzZTx2b2lkPjtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uRGVzdHJveScsIHdhaXQ6IChfcDogUHJvbWlzZTx2b2lkPikgPT4gcCA9IF9wIH0pO1xuICAgIGlmIChwKSB7XG4gICAgICBwLnRoZW4oZGVzdHJveSkuY2F0Y2goZGVzdHJveSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IFQpOiBhbnkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBzb3J0IGRlZmluaXRpb25zLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0U29ydGBcbiAgICpcbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgc29ydGluZyBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIG9yIGBzb3J0QWxpYXNgIHByb3BlcnRpZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gY29sdW1uT3JTb3J0QWxpYXMgQSBjb2x1bW4gaW5zdGFuY2Ugb3IgYSBzdHJpbmcgbWF0Y2hpbmcgYFBibENvbHVtbi5zb3J0QWxpYXNgIG9yIGBQYmxDb2x1bW4uaWRgLlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM6IFBibENvbHVtbiB8IHN0cmluZywgc29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICBzZXRTb3J0KGNvbHVtbk9yU29ydEFsaWFzPzogUGJsQ29sdW1uIHwgc3RyaW5nIHwgYm9vbGVhbiwgc29ydD86IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghY29sdW1uT3JTb3J0QWxpYXMgfHwgdHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZHMuc2V0U29ydCghIWNvbHVtbk9yU29ydEFsaWFzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29sdW1uOiBQYmxDb2x1bW47XG4gICAgaWYgKHR5cGVvZiBjb2x1bW5PclNvcnRBbGlhcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbHVtbiA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmluZCggYyA9PiBjLmFsaWFzID8gYy5hbGlhcyA9PT0gY29sdW1uT3JTb3J0QWxpYXMgOiAoYy5zb3J0ICYmIGMuaWQgPT09IGNvbHVtbk9yU29ydEFsaWFzKSApO1xuICAgICAgaWYgKCFjb2x1bW4gJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBjb2x1bW4gd2l0aCBhbGlhcyBcIiR7Y29sdW1uT3JTb3J0QWxpYXN9XCIuYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uID0gY29sdW1uT3JTb3J0QWxpYXM7XG4gICAgfVxuICAgIHRoaXMuZHMuc2V0U29ydChjb2x1bW4sIHNvcnQsIHNraXBVcGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCwgRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAuXG4gICAqL1xuICBzZXRGaWx0ZXIoKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgZnVuY3Rpb24gcHJlZGljYXRlLlxuICAgKlxuICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBEYXRhU291cmNlUHJlZGljYXRlLCBjb2x1bW5zPzogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIHZhbHVlIHRvIGNvbXBhcmUgd2l0aCBhbmQgYSBsaXN0IG9mIGNvbHVtbnMgd2l0aCB0aGUgdmFsdWVzIHRvIGNvbXBhcmUgdG8uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBhbnksIGNvbHVtbnM6IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkO1xuICBzZXRGaWx0ZXIodmFsdWU/OiBEYXRhU291cmNlRmlsdGVyVG9rZW4sIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgY29sdW1uSW5zdGFuY2VzOiBQYmxDb2x1bW5bXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbnMpICYmIHR5cGVvZiBjb2x1bW5zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2x1bW5JbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2xJZCA6IChjLmlkID09PSBjb2xJZCkgKTtcbiAgICAgICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBjb2x1bW4gd2l0aCBhbGlhcyAke2NvbElkfSBcIiR7Y29sSWR9XCIuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbHVtbkluc3RhbmNlcy5wdXNoKGNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IGNvbHVtbnMgYXMgYW55O1xuICAgICAgfVxuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIodmFsdWUsIGNvbHVtbkluc3RhbmNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHMuc2V0RmlsdGVyKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YVNvdXJjZSh2YWx1ZTogUGJsRGF0YVNvdXJjZTxUPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSB2YWx1ZSkge1xuICAgICAgLy8gS0lMTCBBTEwgc3Vic2NyaXB0aW9ucyBmb3IgdGhlIHByZXZpb3VzIGRhdGFzb3VyY2UuXG4gICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSkge1xuICAgICAgICBVblJ4LmtpbGwodGhpcywgdGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9kYXRhU291cmNlO1xuICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RrVGFibGUuZGF0YVNvdXJjZSA9IHZhbHVlIGFzIGFueTtcblxuICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgICAgdGhpcy5zZXR1cE5vRGF0YShmYWxzZSk7XG5cbiAgICAgIC8vIGNsZWFyIHRoZSBjb250ZXh0LCBuZXcgZGF0YXNvdXJjZVxuICAgICAgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcblxuICAgICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7XG4gICAgICAgIGtpbmQ6ICdvbkRhdGFTb3VyY2UnLFxuICAgICAgICBwcmV2LFxuICAgICAgICBjdXJyOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICggdmFsdWUgKSB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIHZhbHVlLm9uRXJyb3IucGlwZShVblJ4KHRoaXMsIHZhbHVlKSkuc3Vic2NyaWJlKGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSByZWdpc3RlciB0byB0aGlzIGV2ZW50IGJlY2F1c2UgaXQgZmlyZXMgYmVmb3JlIHRoZSBlbnRpcmUgZGF0YS1jaGFuZ2luZyBwcm9jZXNzIHN0YXJ0cy5cbiAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCBiZWNhdXNlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgaXMgZmlyZWQgYXN5bmMsIGp1c3QgYmVmb3JlIHRoZSBkYXRhIGlzIGVtaXR0ZWQuXG4gICAgICAgIC8vIEl0cyBub3QgZW5vdWdoIHRvIGNsZWFyIHRoZSBjb250ZXh0IHdoZW4gYHNldERhdGFTb3VyY2VgIGlzIGNhbGxlZCwgd2UgYWxzbyBuZWVkIHRvIGhhbmRsZSBgcmVmcmVzaGAgY2FsbHMgd2hpY2ggd2lsbCBub3RcbiAgICAgICAgLy8gdHJpZ2dlciB0aGlzIG1ldGhvZC5cbiAgICAgICAgdmFsdWUub25Tb3VyY2VDaGFuZ2luZy5waXBlKFVuUngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCkgKTtcblxuICAgICAgICAvLyBSdW4gQ0QsIHNjaGVkdWxlZCBhcyBhIG1pY3JvLXRhc2ssIGFmdGVyIGVhY2ggcmVuZGVyaW5nXG4gICAgICAgIHZhbHVlLm9uUmVuZGVyRGF0YUNoYW5naW5nXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoICh7ZXZlbnR9KSA9PiAhZXZlbnQuaXNJbml0aWFsICYmIChldmVudC5wYWdpbmF0aW9uLmNoYW5nZWQgfHwgZXZlbnQuc29ydC5jaGFuZ2VkIHx8IGV2ZW50LmZpbHRlci5jaGFuZ2VkKSksXG4gICAgICAgICAgICAvLyBDb250ZXh0IGJldHdlZW4gdGhlIG9wZXJhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgYXQgdGhlIG1vbWVudFxuICAgICAgICAgICAgLy8gRXZlbnQgZm9yIGNsaWVudCBzaWRlIG9wZXJhdGlvbnMuLi5cbiAgICAgICAgICAgIC8vIFRPRE86IGNhbiB3ZSByZW1vdmUgdGhpcz8gd2UgY2xlYXIgdGhlIGNvbnRleHQgd2l0aCBgb25Tb3VyY2VDaGFuZ2luZ2BcbiAgICAgICAgICAgIHRhcCggKCkgPT4gIXRoaXMuX3N0b3JlLnByaW1hcnkgJiYgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCAoKSA9PiB2YWx1ZS5vblJlbmRlcmVkRGF0YUNoYW5nZWQucGlwZSh0YWtlKDEpLCBtYXBUbyh0aGlzLmRzLnJlbmRlckxlbmd0aCkpICksXG4gICAgICAgICAgICBvYnNlcnZlT24oYXNhcFNjaGVkdWxlciksXG4gICAgICAgICAgICBVblJ4KHRoaXMsIHZhbHVlKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCBwcmV2aW91c1JlbmRlckxlbmd0aCA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIHJlbmRlcmVkIGl0ZW1zIGhhcyBjaGFuZ2VkIHRoZSB0YWJsZSB3aWxsIHVwZGF0ZSB0aGUgZGF0YSBhbmQgcnVuIENEIG9uIGl0LlxuICAgICAgICAgICAgLy8gc28gd2Ugb25seSB1cGRhdGUgdGhlIHJvd3MuXG4gICAgICAgICAgICBjb25zdCB7IGNka1RhYmxlIH0gPSB0aGlzLl9leHRBcGk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNSZW5kZXJMZW5ndGggPT09IHRoaXMuZHMucmVuZGVyTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicsIHRydWUpO1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cygnZm9vdGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSGFuZGxpbmcgbm8gZGF0YSBvdmVybGF5XG4gICAgICAgIC8vIEhhbmRsaW5nIGZhbGxiYWNrIG1pbmltdW0gaGVpZ2h0LlxuICAgICAgICB2YWx1ZS5vblJlbmRlcmVkRGF0YUNoYW5nZWRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCggKCkgPT4gdGhpcy5kcy5yZW5kZXJMZW5ndGggKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgICAgICB0YXAoIChbcHJldiwgY3Vycl0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgbm9EYXRhU2hvd2luZyA9ICEhdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmO1xuICAgICAgICAgICAgICBpZiAoIChjdXJyID4gMCAmJiBub0RhdGFTaG93aW5nKSB8fCAoY3VyciA9PT0gMCAmJiAhbm9EYXRhU2hvd2luZykgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE5vRGF0YSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhbmltYXRpb25GcmFtZVNjaGVkdWxlciksIC8vIHd3IHdhbnQgdG8gZ2l2ZSB0aGUgYnJvd3NlciB0aW1lIHRvIHJlbW92ZS9hZGQgcm93c1xuICAgICAgICAgICAgVW5SeCh0aGlzLCB2YWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMudmlld3BvcnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMuZHMucmVuZGVyTGVuZ3RoID4gMCAmJiB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgaCA9IE1hdGgubWluKHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0LCB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkpO1xuICAgICAgICAgICAgICBlbC5zdHlsZS5taW5IZWlnaHQgPSBoICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMudmlld3BvcnQuZW5hYmxlZCA/IG51bGwgOiB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkgKyAncHgnO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBXaGVuIHZpZXdwb3J0IGlzIGRpc2FibGVkLCB3ZSBjYW4gc2tpcCB0aGUgY2FsbCB0byBtZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpIGFuZCBsZXQgdGhlIGJyb3dzZXJcbiAgICAgICAgICAgICAgLy8gZG8gdGhlIGpvYiBieSBzZXR0aW5nIGBjb250YWluOiB1bnNldGAgaW4gYHBibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRgXG5cbiAgICAgICAgICAgICAgLy8gZWwuc3R5bGUubWluSGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgICAgLy8gZWwuc3R5bGUuY29udGFpbiA9IHRoaXMudmlld3BvcnQuZW5hYmxlZCA/IG51bGwgOiAndW5zZXQnO1xuXG4gICAgICAgICAgICAgIC8vIFVQREFURTogVGhpcyB3aWxsIG5vdCB3b3JrIGJlY2F1c2UgaXQgd2lsbCBjYXVzZSB0aGUgd2lkdGggdG8gYmUgaW5jb3JyZWN0IHdoZW4gdXNlZCB3aXRoIHZTY3JvbGxOb25lXG4gICAgICAgICAgICAgIC8vIFRPRE86IENoZWNrIHdoeT9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52YWxpZGF0ZXMgdGhlIGhlYWRlciwgaW5jbHVkaW5nIGEgZnVsbCByZWJ1aWxkIG9mIGNvbHVtbiBoZWFkZXJzXG4gICAqL1xuICBpbnZhbGlkYXRlQ29sdW1ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ2JlZm9yZUludmFsaWRhdGVIZWFkZXJzJyB9KTtcblxuICAgIGNvbnN0IHJlYnVpbGRSb3dzID0gdGhpcy5fc3RvcmUuYWxsQ29sdW1ucy5sZW5ndGggPiAwO1xuICAgIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgdGhpcy5fc3RvcmUuaW52YWxpZGF0ZSh0aGlzLmNvbHVtbnMpO1xuXG4gICAgc2V0SWRlbnRpdHlQcm9wKHRoaXMuX3N0b3JlLCB0aGlzLl9faWRlbnRpdHlQcm9wKTsgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgaW4gMS4wLjBcblxuICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFySGVhZGVyUm93RGVmcygpO1xuICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFyRm9vdGVyUm93RGVmcygpO1xuICAgIC8vIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcblxuICAgIC8vIGFmdGVyIGludmFsaWRhdGluZyB0aGUgaGVhZGVycyB3ZSBub3cgaGF2ZSBvcHRpb25hbCBoZWFkZXIvaGVhZGVyR3JvdXBzL2Zvb3RlciByb3dzIGFkZGVkXG4gICAgLy8gd2UgbmVlZCB0byB1cGRhdGUgdGhlIHRlbXBsYXRlIHdpdGggdGhpcyBkYXRhIHdoaWNoIHdpbGwgY3JlYXRlIG5ldyByb3dzIChoZWFkZXIvZm9vdGVyKVxuICAgIHRoaXMucmVzZXRIZWFkZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5yZXNldEZvb3RlclJvd0RlZnMoKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIC8qICBOb3cgd2Ugd2lsbCBmb3JjZSBjbGVhcmluZyBhbGwgZGF0YSByb3dzIGFuZCBjcmVhdGluZyB0aGVtIGJhY2sgYWdhaW4gaWYgdGhpcyBpcyBub3QgdGhlIGZpcnN0IHRpbWUgd2UgaW52YWxpZGF0ZSB0aGUgY29sdW1ucy4uLlxuXG4gICAgICAgIFdoeT8gZmlyc3QsIHNvbWUgYmFja2dyb3VuZDpcblxuICAgICAgICBJbnZhbGlkYXRpbmcgdGhlIHN0b3JlIHdpbGwgcmVzdWx0IGluIG5ldyBgUGJsQ29sdW1uYCBpbnN0YW5jZXMgKGNsb25lZCBvciBjb21wbGV0ZWx5IG5ldykgaGVsZCBpbnNpZGUgYSBuZXcgYXJyYXkgKGFsbCBhcnJheXMgaW4gdGhlIHN0b3JlIGFyZSByZS1jcmVhdGVkIG9uIGludmFsaWRhdGUpXG4gICAgICAgIE5ldyBhcnJheSBhbmQgbmV3IGluc3RhbmNlcyB3aWxsIGFsc28gcmVzdWx0IGluIG5ldyBkaXJlY3RpdmUgaW5zdGFuY2VzIG9mIGBQYmxOZ3JpZENvbHVtbkRlZmAgZm9yIGV2ZXJ5IGNvbHVtbi5cblxuICAgICAgICBFYWNoIGRhdGEgcm93IGhhcyBkYXRhIGNlbGxzIHdpdGggdGhlIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIGRpcmVjdGl2ZSAoYHBibC1uZ3JpZC1jZWxsYCkuXG4gICAgICAgIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIGhhcyBhIHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDb2x1bW5EZWZgIHRocm91Z2ggZGVwZW5kZW5jeSBpbmplY3Rpb24sIGkuZS4gaXQgd2lsbCBub3QgdXBkYXRlIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiFcblxuICAgICAgICBOb3csIHRoZSBwcm9ibGVtOlxuICAgICAgICBUaGUgYENka1RhYmxlYCB3aWxsIGNhY2hlIHJvd3MgYW5kIHRoZWlyIGNlbGxzLCByZXVzaW5nIHRoZW0gZm9yIHBlcmZvcm1hbmNlLlxuICAgICAgICBUaGlzIG1lYW5zIHRoYXQgdGhlIGBQYmxOZ3JpZENvbHVtbkRlZmAgaW5zdGFuY2UgaW5zaWRlIGVhY2ggY2VsbCB3aWxsIG5vdCBjaGFuZ2UuXG4gICAgICAgIFNvLCBjcmVhdGluZyBuZXcgY29sdW1ucyBhbmQgY29sdW1uRGVmcyB3aWxsIHJlc3VsdCBpbiBzdGFsZSBjZWxscyB3aXRoIHJlZmVyZW5jZSB0byBkZWFkIGluc3RhbmNlcyBvZiBgUGJsQ29sdW1uYCBhbmQgYFBibE5ncmlkQ29sdW1uRGVmYC5cblxuICAgICAgICBPbmUgc29sdXRpb24gaXMgdG8gcmVmYWN0b3IgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgdG8gZ2V0IHRoZSBgUGJsTmdyaWRDb2x1bW5EZWZgIHRocm91Z2ggZGF0YSBiaW5kaW5nLlxuICAgICAgICBXaGlsZSB0aGlzIHdpbGwgd29yayBpdCB3aWxsIHB1dCBtb3JlIHdvcmsgb24gZWFjaCBjZWxsIHdoaWxlIGRvaW5nIENEIGFuZCB3aWxsIHJlcXVpcmUgY29tcGxleCBsb2dpYyB0byBoYW5kbGUgZWFjaCBjaGFuZ2UgYmVjYXVzZSBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYFxuICAgICAgICBhbHNvIGNyZWF0ZSBhIGNvbnRleHQgd2hpY2ggaGFzIHJlZmVyZW5jZSB0byBhIGNvbHVtbiB0aHVzIGEgbmV3IGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAgICAgIEtlZXBpbmcgdHJhY2sgZm9yIGFsbCByZWZlcmVuY2VzIHdpbGwgYmUgZGlmZmljdWx0IGFuZCBidWdzIGFyZSBsaWtlbHkgdG8gb2NjdXIsIHdoaWNoIGFyZSBoYXJkIHRvIHRyYWNrLlxuXG4gICAgICAgIFRoZSBzaW1wbGVzdCBzb2x1dGlvbiBpcyB0byBmb3JjZSB0aGUgdGFibGUgdG8gcmVuZGVyIGFsbCBkYXRhIHJvd3MgZnJvbSBzY3JhdGNoIHdoaWNoIHdpbGwgZGVzdHJveSB0aGUgY2FjaGUgYW5kIGFsbCBjZWxsJ3Mgd2l0aCBpdCwgY3JlYXRpbmcgbmV3IG9uZSdzIHdpdGggcHJvcGVyIHJlZmVyZW5jZS5cblxuICAgICAgICBUaGUgc2ltcGxlIHNvbHV0aW9uIGlzIGN1cnJlbnRseSBwcmVmZXJyZWQgYmVjYXVzZTpcblxuICAgICAgICAtIEl0IGlzIGVhc2llciB0byBpbXBsZW1lbnQuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGFzc2VzcyB0aGUgaW1wYWN0LlxuICAgICAgICAtIEl0IGVmZmVjdHMgYSBzaW5nbGUgb3BlcmF0aW9uIChjaGFuZ2luZyB0byByZXNldHRpbmcgY29sdW1ucykgdGhhdCByYXJlbHkgaGFwcGVuXG5cbiAgICAgICAgVGhlIG9ubHkgaXNzdWUgaXMgd2l0aCB0aGUgYENka1RhYmxlYCBlbmNhcHN1bGF0aW5nIHRoZSBtZXRob2QgYF9mb3JjZVJlbmRlckRhdGFSb3dzKClgIHdoaWNoIGlzIHdoYXQgd2UgbmVlZC5cbiAgICAgICAgVGhlIHdvcmthcm91bmQgaXMgdG8gYXNzaWduIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHdpdGggdGhlIHNhbWUgdmFsdWUgaXQgYWxyZWFkeSBoYXMsIHdoaWNoIHdpbGwgY2F1c2UgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB0byBmaXJlLlxuICAgICAgICBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyBhIGdldHRlciB0aGF0IHRyaWdnZXJzIGBfZm9yY2VSZW5kZXJEYXRhUm93c2Agd2l0aG91dCBjaGVja2luZyB0aGUgdmFsdWUgY2hhbmdlZCwgcGVyZmVjdCBmaXQuXG4gICAgICAgIFRoZXJlIGlzIGEgcmlzayB3aXRoIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGJlaW5nIGNoYW5nZWQuLi5cbiAgICAgKi9cbiAgICBpZiAocmVidWlsZFJvd3MpIHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9IHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cztcbiAgICB9XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkludmFsaWRhdGVIZWFkZXJzJyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb2x1bW4gc2l6ZXMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSB0YWJsZSBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gbWV0YWRhdGEgZm9yIGVhY2ggY29sdW1uLlxuICAgKiBUaGUgZmluYWwgd2lkdGggcmVwcmVzZW50IGEgc3RhdGljIHdpZHRoLCBpdCBpcyB0aGUgdmFsdWUgYXMgc2V0IGluIHRoZSBkZWZpbml0aW9uIChleGNlcHQgY29sdW1uIHdpdGhvdXQgd2lkdGgsIHdoZXJlIHRoZSBjYWxjdWxhdGVkIGdsb2JhbCB3aWR0aCBpcyBzZXQpLlxuICAgKi9cbiAgcmVzZXRDb2x1bW5zV2lkdGgoKTogdm9pZCB7XG4gICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5fc3RvcmUuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5fc3RvcmUuY29sdW1ucywgdGhpcy5fc3RvcmUubWV0YUNvbHVtbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc2l6ZSBvZiBhbGwgZ3JvdXAgY29sdW1ucyBpbiB0aGUgdGFibGUgYmFzZWQgb24gdGhlIHNpemUgb2YgdGhlaXIgdmlzaWJsZSBjaGlsZHJlbiAobm90IGhpZGRlbikuXG4gICAqIEBwYXJhbSBkeW5hbWljV2lkdGhMb2dpYyAtIE9wdGlvbmFsIGxvZ2ljIGNvbnRhaW5lciwgaWYgbm90IHNldCBhIG5ldyBvbmUgaXMgY3JlYXRlZC5cbiAgICovXG4gIHN5bmNDb2x1bW5Hcm91cHNTaXplKGR5bmFtaWNXaWR0aExvZ2ljPzogRHluYW1pY0NvbHVtbldpZHRoTG9naWMpOiB2b2lkIHtcbiAgICBpZiAoIWR5bmFtaWNXaWR0aExvZ2ljKSB7XG4gICAgICBkeW5hbWljV2lkdGhMb2dpYyA9IHRoaXMuX2V4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgfVxuXG4gICAgLy8gRnJvbSBhbGwgbWV0YSBjb2x1bW5zIChoZWFkZXIvZm9vdGVyL2hlYWRlckdyb3VwKSB3ZSBmaWx0ZXIgb25seSBgaGVhZGVyR3JvdXBgIGNvbHVtbnMuXG4gICAgLy8gRm9yIGVhY2ggd2UgY2FsY3VsYXRlIGl0J3Mgd2lkdGggZnJvbSBhbGwgb2YgdGhlIGNvbHVtbnMgdGhhdCB0aGUgaGVhZGVyR3JvdXAgXCJncm91cHNcIi5cbiAgICAvLyBXZSB1c2UgdGhlIHNhbWUgc3RyYXRlZ3kgYW5kIHRoZSBzYW1lIFJvd1dpZHRoRHluYW1pY0FnZ3JlZ2F0b3IgaW5zdGFuY2Ugd2hpY2ggd2lsbCBwcmV2ZW50IGR1cGxpY2F0ZSBjYWxjdWxhdGlvbnMuXG4gICAgLy8gTm90ZSB0aGF0IHdlIG1pZ2h0IGhhdmUgbXVsdGlwbGUgaGVhZGVyIGdyb3VwcywgaS5lLiBzYW1lIGNvbHVtbnMgb24gbXVsdGlwbGUgZ3JvdXBzIHdpdGggZGlmZmVyZW50IHJvdyBpbmRleC5cbiAgICBmb3IgKGNvbnN0IGcgb2YgdGhpcy5fc3RvcmUuZ2V0QWxsSGVhZGVyR3JvdXAoKSkge1xuICAgICAgLy8gV2UgZ28gb3ZlciBhbGwgY29sdW1ucyBiZWNhdXNlIGcuY29sdW1ucyBkb2VzIG5vdCByZXByZXNlbnQgdGhlIGN1cnJlbnQgb3duZWQgY29sdW1ucyBvZiB0aGUgZ3JvdXBcbiAgICAgIC8vIGl0IGlzIHN0YXRpYywgcmVwcmVzZW50aW5nIHRoZSBpbml0aWFsIHN0YXRlLlxuICAgICAgLy8gT25seSBjb2x1bW5zIGhvbGQgdGhlaXIgZ3JvdXAgb3duZXJzLlxuICAgICAgLy8gVE9ETzogZmluZCB3YXkgdG8gaW1wcm92ZSBpdGVyYXRpb25cbiAgICAgIGNvbnN0IGNvbFNpemVJbmZvcyA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmlsdGVyKCBjID0+ICFjLmhpZGRlbiAmJiBjLmlzSW5Hcm91cChnKSkubWFwKCBjID0+IGMuc2l6ZUluZm8gKTtcbiAgICAgIGlmIChjb2xTaXplSW5mb3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBncm91cFdpZHRoID0gZHluYW1pY1dpZHRoTG9naWMuYWRkR3JvdXAoY29sU2l6ZUluZm9zKTtcbiAgICAgICAgZy5taW5XaWR0aCA9IGdyb3VwV2lkdGg7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYCR7Z3JvdXBXaWR0aH1weGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZy5taW5XaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZy51cGRhdGVXaWR0aChgMHB4YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzaXplQ29sdW1ucyhjb2x1bW5zPzogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBpZiAoIWNvbHVtbnMpIHtcbiAgICAgIGNvbHVtbnMgPSB0aGlzLl9zdG9yZS5jb2x1bW5zO1xuICAgIH1cblxuICAgIC8vIHByb3RlY3QgZnJvbSBwZXItbWF0dXJlIHJlc2l6ZS5cbiAgICAvLyBXaWxsIGhhcHBlbiBvbiBhZGRpdGlvbmFsIGhlYWRlci9oZWFkZXItZ3JvdXAgcm93cyBBTkQgQUxTTyB3aGVuIHZTY3JvbGxOb25lIGlzIHNldFxuICAgIC8vIFRoaXMgd2lsbCBjYXVzZSBzaXplIG5vdCB0byBwb3B1bGF0ZSBiZWNhdXNlIGl0IHRha2VzIHRpbWUgdG8gcmVuZGVyIHRoZSByb3dzLCBzaW5jZSBpdCdzIG5vdCB2aXJ0dWFsIGFuZCBoYXBwZW5zIGltbWVkaWF0ZWx5LlxuICAgIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgcHJvdGVjdGlvbi5cbiAgICBpZiAoIWNvbHVtbnNbMF0uc2l6ZUluZm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzdG9yZXMgYW5kIGNhbGN1bGF0ZXMgd2lkdGggZm9yIGNvbHVtbnMgYWRkZWQgdG8gaXQuIEFnZ3JlZ2F0ZSdzIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgYWRkZWQgY29sdW1ucy5cbiAgICBjb25zdCByb3dXaWR0aCA9IHRoaXMuX2V4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgdGhpcy5zeW5jQ29sdW1uR3JvdXBzU2l6ZShyb3dXaWR0aCk7XG5cbiAgICAvLyBpZiB0aGlzIGlzIGEgdGFibGUgd2l0aG91dCBncm91cHNcbiAgICBpZiAocm93V2lkdGgubWluaW11bVJvd1dpZHRoID09PSAwKSB7XG4gICAgICByb3dXaWR0aC5hZGRHcm91cChjb2x1bW5zLm1hcCggYyA9PiBjLnNpemVJbmZvICkpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBtYXggbG9jayBzdGF0ZSBoYXMgY2hhbmdlZCB3ZSBuZWVkIHRvIHVwZGF0ZSByZS1jYWxjdWxhdGUgdGhlIHN0YXRpYyB3aWR0aCdzIGFnYWluLlxuICAgIGlmIChyb3dXaWR0aC5tYXhXaWR0aExvY2tDaGFuZ2VkKSB7XG4gICAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoY29sdW1ucyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9taW5pbXVtUm93V2lkdGggKSB7XG4gICAgICAvLyBXZSBjYWxjdWxhdGUgdGhlIHRvdGFsIG1pbmltdW0gd2lkdGggb2YgdGhlIHRhYmxlXG4gICAgICAvLyBXZSBkbyBpdCBvbmNlLCB0byBzZXQgdGhlIG1pbmltdW0gd2lkdGggYmFzZWQgb24gdGhlIGluaXRpYWwgc2V0dXAuXG4gICAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgYXBwbHkgc3RyYXRlZ3kgaGVyZSwgd2Ugd2FudCB0aGUgZW50aXJlIGxlbmd0aCBvZiB0aGUgdGFibGUhXG4gICAgICB0aGlzLl9jZGtUYWJsZS5taW5XaWR0aCA9IHJvd1dpZHRoLm1pbmltdW1Sb3dXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25SZXNpemVSb3cnIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBlbWJlZGRlZCB2aWV3IGJlZm9yZSBvciBhZnRlciB0aGUgdXNlciBwcm9qZWN0ZWQgY29udGVudC5cbiAgICovXG4gIGNyZWF0ZVZpZXc8Qz4obG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50JywgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEM+LCBjb250ZXh0PzogQywgaW5kZXg/OiBudW1iZXIpOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5nZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uKTtcbiAgICBjb25zdCB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlUmVmLCBjb250ZXh0LCBpbmRleCk7XG4gICAgdmlldy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGFscmVhZHkgY3JlYXRlZCBlbWJlZGRlZCB2aWV3LlxuICAgKiBAcGFyYW0gdmlldyAtIFRoZSB2aWV3IHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24sIGlmIG5vdCBzZXQgZGVmYXVsdHMgdG8gYGJlZm9yZWBcbiAgICogQHJldHVybnMgdHJ1ZSB3aGVuIGEgdmlldyB3YXMgcmVtb3ZlZCwgZmFsc2Ugd2hlbiBub3QuIChkaWQgbm90IGV4aXN0IGluIHRoZSB2aWV3IGNvbnRhaW5lciBmb3IgdGhlIHByb3ZpZGVkIGxvY2F0aW9uKVxuICAgKi9cbiAgcmVtb3ZlVmlldyh2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PiwgbG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50Jyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5nZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uKTtcbiAgICBjb25zdCBpZHggPSB2Y1JlZi5pbmRleE9mKHZpZXcpO1xuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZjUmVmLnJlbW92ZShpZHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSBhbGwgdmlzaWJsZSBjb2x1bW5zIHRvIGZpdCBjb250ZW50IG9mIHRoZSB0YWJsZS5cbiAgICogQHBhcmFtIGZvcmNlRml4ZWRXaWR0aCAtIFdoZW4gdHJ1ZSB3aWxsIHJlc2l6ZSBhbGwgY29sdW1ucyB3aXRoIGFic29sdXRlIHBpeGVsIHZhbHVlcywgb3RoZXJ3aXNlIHdpbGwga2VlcCB0aGUgc2FtZSBmb3JtYXQgYXMgb3JpZ2luYWxseSBzZXQgKCUgb3Igbm9uZSlcbiAgICovXG4gIGF1dG9TaXplQ29sdW1uVG9GaXQob3B0aW9ucz86IEF1dG9TaXplVG9GaXRPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgeyBpbm5lcldpZHRoLCBvdXRlcldpZHRoIH0gPSB0aGlzLnZpZXdwb3J0O1xuXG4gICAgLy8gY2FsY3VsYXRlIGF1dG8tc2l6ZSBvbiB0aGUgd2lkdGggd2l0aG91dCBzY3JvbGwgYmFyIGFuZCB0YWtlIGJveCBtb2RlbCBnYXBzIGludG8gYWNjb3VudFxuICAgIC8vIFRPRE86IGlmIG5vIHNjcm9sbCBiYXIgZXhpc3RzIHRoZSBjYWxjIHdpbGwgbm90IGluY2x1ZGUgaXQsIG5leHQgaWYgbW9yZSByb3dzIGFyZSBhZGRlZCBhIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIuLi5cbiAgICB0aGlzLmNvbHVtbkFwaS5hdXRvU2l6ZVRvRml0KG91dGVyV2lkdGggLSAob3V0ZXJXaWR0aCAtIGlubmVyV2lkdGgpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGZpbmRJbml0aWFsUm93SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IHJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldCgwKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgIHJvd0VsZW1lbnQgPSB2aWV3UmVmLnJvb3ROb2Rlc1swXTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUocm93RWxlbWVudCkuaGVpZ2h0O1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGhlaWdodCwgMTApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50KSB7XG4gICAgICByb3dFbGVtZW50ID0gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50Lmxlbmd0aCA+IDBcbiAgICAgICAgPyAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmdldCh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoIC0gMSkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXVxuICAgICAgICA6IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIDtcbiAgICAgIHJvd0VsZW1lbnQgPSByb3dFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByb3dFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNsYXNzKC4uLmNsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xzKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHVnaW5zKGluamVjdG9yOiBJbmplY3RvciwgZWxSZWY6IEVsZW1lbnRSZWY8YW55PiwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYW4gaW5qZWN0b3IgZm9yIHRoZSBleHRlbnNpb25zL3BsdWdpbnNcbiAgICAvLyBUaGlzIGluamVjdG9yIGFsbG93IHBsdWdpbnMgKHRoYXQgY2hvb3NlIHNvKSB0byBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvbiBmb3IgcnVudGltZSB1c2UuXG4gICAgLy8gSS5FOiBhcyBpZiB0aGV5IHdlJ3JlIGNyZWF0ZWQgYnkgYW5ndWxhciB2aWEgdGVtcGxhdGUuLi5cbiAgICAvLyBUaGlzIGFsbG93cyBzZWFtbGVzcyBwbHVnaW4tdG8tcGx1Z2luIGRlcGVuZGVuY2llcyB3aXRob3V0IHJlcXVpcmluZyBzcGVjaWZpYyB0ZW1wbGF0ZSBzeW50YXguXG4gICAgLy8gQW5kIGFsc28gYWxsb3dzIGF1dG8gcGx1Z2luIGJpbmRpbmcgKGFwcCB3aWRlKSB3aXRob3V0IHRoZSBuZWVkIGZvciB0ZW1wbGF0ZSBzeW50YXguXG4gICAgY29uc3QgcGx1Z2luSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogVmlld0NvbnRhaW5lclJlZiwgdXNlVmFsdWU6IHZjUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRWxlbWVudFJlZiwgdXNlVmFsdWU6IGVsUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ2hhbmdlRGV0ZWN0b3JSZWYsIHVzZVZhbHVlOiB0aGlzLmNkciB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogaW5qZWN0b3IsXG4gICAgfSk7XG4gICAgdGhpcy5fcGx1Z2luID0gUGJsTmdyaWRQbHVnaW5Db250ZXh0LmNyZWF0ZSh0aGlzLCBwbHVnaW5JbmplY3RvciwgdGhpcy5fZXh0QXBpKTtcbiAgICBiaW5kVG9EYXRhU291cmNlKHRoaXMuX3BsdWdpbik7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUmVzaXplKCk6IHZvaWQge1xuICAgIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICAgY29uc3Qgcm8kID0gZnJvbUV2ZW50UGF0dGVybjxbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0+KFxuICAgICAgaGFuZGxlciA9PiB7XG4gICAgICAgIGlmICghcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihoYW5kbGVyKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKHJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFNraXAgdGhlIGZpcnN0IGVtaXNzaW9uXG4gICAgLy8gRGVib3VuY2UgYWxsIHJlc2l6ZXMgdW50aWwgdGhlIG5leHQgY29tcGxldGUgYW5pbWF0aW9uIGZyYW1lIHdpdGhvdXQgYSByZXNpemVcbiAgICAvLyBmaW5hbGx5IG1hcHMgdG8gdGhlIGVudHJpZXMgY29sbGVjdGlvblxuICAgIC8vIFNLSVA6ICBXZSBzaG91bGQgc2tpcCB0aGUgZmlyc3QgZW1pc3Npb24gKGBza2lwKDEpYCkgYmVmb3JlIHdlIGRlYm91bmNlLCBzaW5jZSBpdHMgY2FsbGVkIHVwb24gY2FsbGluZyBcIm9ic2VydmVcIiBvbiB0aGUgcmVzaXplT2JzZXJ2ZXIuXG4gICAgLy8gICAgICAgIFRoZSBwcm9ibGVtIGlzIHRoYXQgc29tZSB0YWJsZXMgbWlnaHQgcmVxdWlyZSB0aGlzIGJlY2F1c2UgdGhleSBkbyBjaGFuZ2Ugc2l6ZS5cbiAgICAvLyAgICAgICAgQW4gZXhhbXBsZSBpcyBhIHRhYmxlIGluIGEgbWF0LXRhYiB0aGF0IGlzIGhpZGRlbiwgdGhlIHRhYmxlIHdpbGwgaGl0IHRoZSByZXNpemUgb25lIHdoZW4gd2UgZm9jdXMgdGhlIHRhYlxuICAgIC8vICAgICAgICB3aGljaCB3aWxsIHJlcXVpcmUgYSByZXNpemUgaGFuZGxpbmcgYmVjYXVzZSBpdCdzIGluaXRpYWwgc2l6ZSBpcyAwXG4gICAgLy8gICAgICAgIFRvIHdvcmthcm91bmQgdGhpcywgd2Ugb25seSBza2lwIGVsZW1lbnRzIG5vdCB5ZXQgYWRkZWQgdG8gdGhlIERPTSwgd2hpY2ggbWVhbnMgdGhleSB3aWxsIG5vdCB0cmlnZ2VyIGEgcmVzaXplIGV2ZW50LlxuICAgIGxldCBza2lwVmFsdWUgPSBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCkgPyAxIDogMDtcblxuICAgIHJvJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHNraXAoc2tpcFZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSxcbiAgICAgICAgVW5SeCh0aGlzKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChhcmdzOiBbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0pID0+IHtcbiAgICAgICAgaWYgKHNraXBWYWx1ZSA9PT0gMCkge1xuICAgICAgICAgIHNraXBWYWx1ZSA9IDE7XG4gICAgICAgICAgY29uc3QgY29sdW1ucyA9IHRoaXMuX3N0b3JlLmNvbHVtbnM7XG4gICAgICAgICAgY29sdW1ucy5mb3JFYWNoKCBjID0+IGMuc2l6ZUluZm8udXBkYXRlU2l6ZSgpICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblJlc2l6ZShhcmdzWzBdKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblJlc2l6ZShlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgIHRoaXMuX3ZpZXdwb3J0LmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgfVxuICAgIC8vIHRoaXMucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV4dEFwaSgpOiB2b2lkIHtcbiAgICBsZXQgb25Jbml0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IGV4dEFwaSA9IHtcbiAgICAgIHRhYmxlOiB0aGlzLFxuICAgICAgZWxlbWVudDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZ2V0IGNka1RhYmxlKCkgeyByZXR1cm4gZXh0QXBpLnRhYmxlLl9jZGtUYWJsZTsgfSxcbiAgICAgIGdldCBldmVudHMoKSB7IHJldHVybiBleHRBcGkudGFibGUuX3BsdWdpbi5ldmVudHMgfSxcbiAgICAgIGdldCBjb250ZXh0QXBpKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnRleHRBcGknLCB7IHZhbHVlOiBuZXcgQ29udGV4dEFwaTxUPihleHRBcGkpIH0pO1xuICAgICAgICByZXR1cm4gZXh0QXBpLmNvbnRleHRBcGk7XG4gICAgICB9LFxuICAgICAgZ2V0IG1ldGFSb3dTZXJ2aWNlKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21ldGFSb3dTZXJ2aWNlJywgeyB2YWx1ZTogbmV3IFBibE5ncmlkTWV0YVJvd1NlcnZpY2U8VD4oZXh0QXBpKSB9KTtcbiAgICAgICAgcmV0dXJuIGV4dEFwaS5tZXRhUm93U2VydmljZTtcbiAgICAgIH0sXG4gICAgICBvbkluaXQ6IChmbjogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBpZiAoZXh0QXBpLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9uSW5pdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCB1ID0gZXh0QXBpLmV2ZW50cy5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb25Jbml0Rm4gb2Ygb25Jbml0KSB7XG4gICAgICAgICAgICAgICAgICBvbkluaXRGbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgb25Jbml0ID0gdSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uSW5pdC5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbHVtblN0b3JlOiB0aGlzLl9zdG9yZSxcbiAgICAgIHNldFZpZXdwb3J0OiAodmlld3BvcnQpID0+IHRoaXMuX3ZpZXdwb3J0ID0gdmlld3BvcnQsXG4gICAgICBkeW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5OiAoKTogRHluYW1pY0NvbHVtbldpZHRoTG9naWMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZXh0QXBpID0gZXh0QXBpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE5vRGF0YShmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmKSB7XG4gICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9EYXRhID0gdGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLnJlbmRlckxlbmd0aCA9PT0gMDtcbiAgICBpZiAobm9EYXRhKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKCdwYmwtbmdyaWQtZW1wdHknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vRGF0YSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgbm9EYXRhVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgnbm9EYXRhJyk7XG4gICAgICBpZiAobm9EYXRhVGVtcGxhdGUpIHtcbiAgICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50Jywgbm9EYXRhVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gbG9jYXRpb24gPT09ICdiZWZvcmVUYWJsZSdcbiAgICAgID8gdGhpcy5fdmNSZWZCZWZvcmVUYWJsZVxuICAgICAgOiBsb2NhdGlvbiA9PT0gJ2JlZm9yZUNvbnRlbnQnID8gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50IDogdGhpcy5fdmNSZWZBZnRlckNvbnRlbnRcbiAgICA7XG4gIH1cblxuICBwcml2YXRlIHNldHVwUGFnaW5hdG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHBhZ2luYXRpb25LaWxsS2V5ID0gJ3BibFBhZ2luYXRpb25LaWxsS2V5JztcbiAgICBjb25zdCB1c2VQYWdpbmF0aW9uID0gdGhpcy5kcyAmJiB0aGlzLnVzZVBhZ2luYXRpb247XG5cbiAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgdGhpcy5kcy5wYWdpbmF0aW9uID0gdGhpcy5fcGFnaW5hdGlvbjtcbiAgICAgIGlmICh0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJbml0KSB7XG4gICAgICBVblJ4LmtpbGwodGhpcywgcGFnaW5hdGlvbktpbGxLZXkpO1xuICAgICAgaWYgKHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZikge1xuICAgICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgICB0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgICBjb25zdCBwYWdpbmF0b3JUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0U2luZ2xlKCdwYWdpbmF0b3InKTtcbiAgICAgICAgaWYgKHBhZ2luYXRvclRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50JywgcGFnaW5hdG9yVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5fc3RvcmUuY29sdW1ucykge1xuICAgICAgY29uc3QgY2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ3RhYmxlQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBjZWxsICkge1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgndGFibGVDZWxsJyk7XG4gICAgICAgIGNvbC5jZWxsVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHRoaXMuX2ZiVGFibGVDZWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlZGl0b3JDZWxsID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLCAnZWRpdG9yQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBlZGl0b3JDZWxsICkge1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZWRpdG9yQ2VsbC50UmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdENlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdlZGl0b3JDZWxsJyk7XG4gICAgICAgIGNvbC5lZGl0b3JUcGwgPSBkZWZhdWx0Q2VsbFRlbXBsYXRlID8gZGVmYXVsdENlbGxUZW1wbGF0ZS50UmVmIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW5zOiBBcnJheTxQYmxDb2x1bW4gfCBQYmxNZXRhQ29sdW1uU3RvcmU+ID0gW10uY29uY2F0KHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgICBjb25zdCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2hlYWRlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiSGVhZGVyQ2VsbCB9O1xuICAgIGNvbnN0IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZm9vdGVyQ2VsbCcpIHx8IHsgdFJlZjogdGhpcy5fZmJGb290ZXJDZWxsIH07XG4gICAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xuICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb25zdCBmb290ZXJDZWxsRGVmID0gZmluZENlbGxEZWY8VD4odGhpcy5yZWdpc3RyeSwgY29sLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgIGNvbC5oZWFkZXJDZWxsVHBsID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICBjb2wuZm9vdGVyQ2VsbFRwbCA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2wuaGVhZGVyKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXIsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuaGVhZGVyLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgICBjb25zdCBoZWFkZXJDZWxsRGVmID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLmhlYWRlckdyb3VwLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlckdyb3VwLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuZm9vdGVyKSB7XG4gICAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5mb290ZXIsICdmb290ZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEZvb3RlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuZm9vdGVyLnRlbXBsYXRlID0gZm9vdGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhlYWRlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd0RlZnMpIHtcbiAgICAgIC8vIFRoZSB0YWJsZSBoZWFkZXIgKG1haW4sIHdpdGggY29sdW1uIG5hbWVzKSBpcyBhbHdheXMgdGhlIGxhc3Qgcm93IGRlZiAoaW5kZXggMClcbiAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCBpdCB0byBzaG93IGxhc3QgKGFmdGVyIGN1c3RvbSBoZWFkZXJzLCBncm91cCBoZWFkZXJzLi4uKSB3ZSBmaXJzdCBuZWVkIHRvIHB1bGwgaXQgYW5kIHRoZW4gcHVzaC5cblxuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgICBjb25zdCBhcnIgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLnRvQXJyYXkoKTtcbiAgICAgIGFyci5wdXNoKGFyci5zaGlmdCgpKTtcblxuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgYXJyKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb290ZXJSb3dEZWZzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMuX2Zvb3RlclJvd0RlZnMudG9BcnJheSgpKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19