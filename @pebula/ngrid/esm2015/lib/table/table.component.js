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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGFBQWEsRUFBRSx1QkFBdUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlILE9BQU8sRUFDTCxhQUFhLEVBQ2IsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsUUFBUSxFQUNSLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixNQUFNLEVBQ04sU0FBUyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQzNFLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BGLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRWpGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxzQkFBc0IsQ0FBQztBQUMzRSxPQUFP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QUNsRCxtREFBcUQ7Ozs7O0lBQ3JELHdDQUFtRDs7Ozs7SUFDbkQsOENBQWtDOzs7OztJQUNsQyw2Q0FBaUM7Ozs7O0lBQ2pDLHNDQUF5RDs7Ozs7SUFDekQsb0NBQXVDOzs7OztJQUN2QyxvQ0FBeUM7Ozs7O0lBRzdCLGtDQUFzQzs7Ozs7SUFDdEMsb0NBQWdDOzs7OztJQUNoQyxtQ0FBc0I7Ozs7O0lBQ3RCLGdDQUE4Qjs7Ozs7SUFDOUIsbUNBQXFDOztJQUNyQyxxQ0FBd0M7O0lBQ3hDLCtCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIGZyb21FdmVudFBhdHRlcm4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgdGFwLCBvYnNlcnZlT24sIHN3aXRjaE1hcCwgbWFwLCBtYXBUbywgc3RhcnRXaXRoLCBwYWlyd2lzZSwgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSW5qZWN0b3IsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBOZ1pvbmUsXG4gIGlzRGV2TW9kZSwgZm9yd2FyZFJlZiwgSXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlciwgRG9DaGVjaywgQXR0cmlidXRlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtIZWFkZXJSb3dEZWYsIENka0Zvb3RlclJvd0RlZiwgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQgeyBFWFRfQVBJX1RPS0VOLCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkUGFnaW5hdG9yS2luZCB9IGZyb20gJy4uL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBEYXRhU291cmNlUHJlZGljYXRlLCBEYXRhU291cmNlRmlsdGVyVG9rZW4sIFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibERhdGFTb3VyY2UsIERhdGFTb3VyY2VPZiwgY3JlYXRlRFMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZS9pbmRleCc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyByZXNldENvbHVtbldpZHRocyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZmluZENlbGxEZWYgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2VsbC1kZWYnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBQYmxDb2x1bW5TdG9yZSwgUGJsTWV0YUNvbHVtblN0b3JlLCBQYmxOZ3JpZENvbHVtblNldCwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LCBpc1BibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgQ29udGV4dEFwaSwgUGJsTmdyaWRDb250ZXh0QXBpLCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWcnO1xuaW1wb3J0IHsgRHluYW1pY0NvbHVtbldpZHRoTG9naWMsIERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kgfSBmcm9tICcuL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyBDb2x1bW5BcGksIEF1dG9TaXplVG9GaXRPcHRpb25zIH0gZnJvbSAnLi9jb2x1bW4tYXBpJztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93cy9pbmRleCc7XG5cbmltcG9ydCB7IGJpbmRUb0RhdGFTb3VyY2UgfSBmcm9tICcuL2JpbmQtdG8tZGF0YXNvdXJjZSc7XG5pbXBvcnQgJy4vYmluZC10by1kYXRhc291cmNlJzsgLy8gTEVBVkUgVEhJUywgV0UgTkVFRCBJVCBTTyBUSEUgQVVHTUVOVEFUSU9OIElOIFRIRSBGSUxFIFdJTEwgTE9BRC5cblxuaW1wb3J0IHsgc2V0SWRlbnRpdHlQcm9wIH0gZnJvbSAnLi90YWJsZS5kZXByZWNhdGUtYXQtMS4wLjAnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxBcGlGYWN0b3J5KHRhYmxlOiB7IF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpOyB9KSB7IHJldHVybiB0YWJsZS5fZXh0QXBpOyB9XG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luQ29udHJvbGxlckZhY3RvcnkodGFibGU6IHsgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0OyB9KSB7IHJldHVybiB0YWJsZS5fcGx1Z2luLmNvbnRyb2xsZXI7IH1cbmV4cG9ydCBmdW5jdGlvbiBtZXRhUm93U2VydmljZUZhY3RvcnkodGFibGU6IHsgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7IH0pIHsgcmV0dXJuIHRhYmxlLl9leHRBcGkubWV0YVJvd1NlcnZpY2U7IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL3RhYmxlLmNvbXBvbmVudC5zY3NzJyBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICB1c2VGYWN0b3J5OiBwbHVnaW5Db250cm9sbGVyRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBFWFRfQVBJX1RPS0VOLFxuICAgICAgdXNlRmFjdG9yeTogaW50ZXJuYWxBcGlGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsXG4gICAgICB1c2VGYWN0b3J5OiBtZXRhUm93U2VydmljZUZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH1cbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29tcG9uZW50PFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBTaG93L0hpZGUgdGhlIGhlYWRlciByb3cuXG4gICAqIERlZmF1bHQ6IHRydWVcbiAgICovXG4gIEBJbnB1dCgpIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0hlYWRlcjsgfTtcbiAgc2V0IHNob3dIZWFkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93SGVhZGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2hvd0hlYWRlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBmb290ZXIgcm93LlxuICAgKiBEZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNob3dGb290ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93Rm9vdGVyOyB9O1xuICBzZXQgc2hvd0Zvb3Rlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dGb290ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaG93Rm9vdGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIHRoZSBmaWxsZXIgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbm9GaWxsZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0ZpbGxlcjsgfTtcbiAgc2V0IG5vRmlsbGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbm9GaWxsZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9ub0ZpbGxlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2V0J3MgdGhlIGJlaGF2aW9yIG9mIHRoZSB0YWJsZSB3aGVuIHRhYmJpbmcuXG4gICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIG5vbmUgKHJvd3MgYW5kIGNlbGxzIGFyZSBub3QgZm9jdXNhYmxlKVxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGZvY3VzIG1vZGUgaGFzIGFuIGVmZmVjdCBvbiBvdGhlciBmdW5jdGlvbnMsIGZvciBleGFtcGxlIGEgZGV0YWlsIHJvdyB3aWxsIHRvZ2dsZSAob3Blbi9jbG9zZSkgdXNpbmdcbiAgICogRU5URVIgLyBTUEFDRSBvbmx5IHdoZW4gZm9jdXNNb2RlIGlzIHNldCB0byBgcm93YC5cbiAgICovXG4gIEBJbnB1dCgpIGZvY3VzTW9kZTogJ3JvdycgfCAnY2VsbCcgfCAnbm9uZScgfCAnJyB8IGZhbHNlIHwgdW5kZWZpbmVkO1xuXG4gIC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIGluIDEuMC4wXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYHBJbmRleGAgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLiAoUmVtb3ZlZCBpbiAxLjAuMClcbiAgICovXG4gIEBJbnB1dCgpIGdldCBpZGVudGl0eVByb3AoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX19pZGVudGl0eVByb3A7IH1cbiAgc2V0IGlkZW50aXR5UHJvcCh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuX19pZGVudGl0eVByb3AgPSB2YWx1ZTsgc2V0SWRlbnRpdHlQcm9wKHRoaXMuX3N0b3JlLCB2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfX2lkZW50aXR5UHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFibGUncyBzb3VyY2Ugb2YgZGF0YVxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGUgdGFibGUncyBzb3VyY2Ugb2YgZGF0YSwgd2hpY2ggY2FuIGJlIHByb3ZpZGVkIGluIDIgd2F5czpcbiAgICpcbiAgICogLSBEYXRhU291cmNlT2Y8VD5cbiAgICogLSBQYmxEYXRhU291cmNlPFQ+XG4gICAqXG4gICAqIFRoZSB0YWJsZSBvbmx5IHdvcmtzIHdpdGggYFBibERhdGFTb3VyY2U8VD5gLCBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBhIHNob3J0Y3V0IGZvciBwcm92aWRpbmdcbiAgICogdGhlIGRhdGEgYXJyYXkgZGlyZWN0bHkuXG4gICAqXG4gICAqIGBEYXRhU291cmNlT2Y8VD5gIGNhbiBiZTpcbiAgICpcbiAgICogLSBTaW1wbGUgZGF0YSBhcnJheSAoZWFjaCBvYmplY3QgcmVwcmVzZW50cyBvbmUgdGFibGUgcm93KVxuICAgKiAtIFByb21pc2UgZm9yIGEgZGF0YSBhcnJheVxuICAgKiAtIFN0cmVhbSB0aGF0IGVtaXRzIGEgZGF0YSBhcnJheSBlYWNoIHRpbWUgdGhlIGFycmF5IGNoYW5nZXNcbiAgICpcbiAgICogV2hlbiBhIGBEYXRhU291cmNlT2Y8VD5gIGlzIHByb3ZpZGVkIGl0IGlzIGNvbnZlcnRlZCBpbnRvIGFuIGluc3RhbmNlIG9mIGBQYmxEYXRhU291cmNlPFQ+YC5cbiAgICpcbiAgICogVG8gYWNjZXNzIHRoZSBgUGJsRGF0YVNvdXJjZTxUPmAgaW5zdGFuY2UgdXNlIHRoZSBgZHNgIHByb3BlcnR5IChyZWFkb25seSkuXG4gICAqXG4gICAqIEl0IGlzIGhpZ2hseSByZWNvbW1lbmRlZCB0byB1c2UgYFBibERhdGFTb3VyY2U8VD5gIGRpcmVjdGx5LCB0aGUgZGF0YXNvdXJjZSBmYWN0b3J5IG1ha2VzIGl0IGVhc3kuXG4gICAqIEZvciBleGFtcGxlLCB3aGVuIGFuIGFycmF5IGlzIHByb3ZpZGVkIHRoZSBmYWN0b3J5IGlzIHVzZWQgdG8gY29udmVydCBpdCB0byBhIGRhdGFzb3VyY2U6XG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgY29sbGVjdGlvbjogVFtdID0gW107XG4gICAqIGNvbnN0IHBibERhdGFTb3VyY2UgPSBjcmVhdGVEUzxUPigpLm9uVHJpZ2dlciggKCkgPT4gY29sbGVjdGlvbiApLmNyZWF0ZSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogPiBUaGlzIGlzIGEgd3JpdGUtb25seSAoc2V0dGVyKSBwcm9wZXJ0eSB0aGF0IHRyaWdnZXJzIHRoZSBgc2V0RGF0YVNvdXJjZWAgbWV0aG9kLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGRhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4gfCBEYXRhU291cmNlT2Y8VD4pIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQYmxEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UoY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IHZhbHVlIHx8IFtdICkuY3JlYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkcygpOiBQYmxEYXRhU291cmNlPFQ+IHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7IH07XG5cbiAgQElucHV0KCkgZ2V0IHVzZVBhZ2luYXRpb24oKTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UgeyByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjsgfVxuICBzZXQgdXNlUGFnaW5hdGlvbih2YWx1ZTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UpIHtcbiAgICBpZiAoKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB2YWx1ZSA9ICdwYWdlTnVtYmVyJztcbiAgICB9XG4gICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5fcGFnaW5hdGlvbiApIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgbm9DYWNoZVBhZ2luYXRvcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7IH1cbiAgc2V0IG5vQ2FjaGVQYWdpbmF0b3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX25vQ2FjaGVQYWdpbmF0b3IgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5kcyAmJiB0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGlzIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uczogUGJsTmdyaWRDb2x1bW5TZXQgfCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ7XG5cbiAgQElucHV0KCkgc2V0IGhpZGVDb2x1bW5zKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2hpZGVDb2x1bW5zID0gdmFsdWU7XG4gICAgdGhpcy5faGlkZUNvbHVtbnNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQSBmYWxsYmFjayBoZWlnaHQgZm9yIFwidGhlIGlubmVyIHNjcm9sbCBjb250YWluZXJcIi5cbiAgICogVGhlIGZhbGxiYWNrIGlzIHVzZWQgb25seSB3aGVuIGl0IExPV0VSIHRoYW4gdGhlIHJlbmRlcmVkIGhlaWdodCwgc28gbm8gZW1wdHkgZ2FwcyBhcmUgY3JlYXRlZCB3aGVuIHNldHRpbmcgdGhlIGZhbGxiYWNrLlxuICAgKlxuICAgKiBUaGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgdGhlIGFyZWEgaW4gd2hpY2ggYWxsIGRhdGEgcm93cyBhcmUgcmVuZGVyZWQgYW5kIGFsbCBtZXRhIChoZWFkZXIvZm9vdGVyKSByb3dzIHRoYXQgYXJlIG9mIHR5cGUgXCJyb3dcIiBvciBcInN0aWNreVwiLlxuICAgKiBUaGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgZGVmaW5lZCB0byBjb25zdW1lIGFsbCB0aGUgaGVpZ2h0IGxlZnQgYWZ0ZXIgYWxsIGV4dGVybmFsIG9iamVjdHMgYXJlIHJlbmRlcmVkLlxuICAgKiBFeHRlcm5hbCBvYmplY3RzIGNhbiBiZSBmaXhlZCBtZXRhIHJvd3MgKGhlYWRlci9mb290ZXIpLCBwYWdpbmF0aW9uIHJvdywgYWN0aW9uIHJvdyBldGMuLi5cbiAgICpcbiAgICogSWYgdGhlIHRhYmxlIGRvZXMgbm90IGhhdmUgYSBoZWlnaHQgKCUgb3IgcHgpIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGFsd2F5cyBoYXZlIG5vIGhlaWdodCAoMCkuXG4gICAqIElmIHRoZSB0YWJsZSBoYXMgYSBoZWlnaHQsIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGdldCB0aGUgaGVpZ2h0IGxlZnQsIHdoaWNoIGNhbiBhbHNvIGJlIDAgaWYgdGhlcmUgYXJlIGEgbG90IG9mIGV4dGVybmFsIG9iamVjdHMuXG4gICAqXG4gICAqIFRvIHNvbHZlIHRoZSBuby1oZWlnaHQgcHJvYmxlbSB3ZSB1c2UgdGhlIGZhbGxiYWNrTWluSGVpZ2h0IHByb3BlcnR5LlxuICAgKlxuICAgKiBXaGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGRpc2FibGVkIGFuZCBmYWxsYmFja01pbkhlaWdodCBpcyBub3Qgc2V0IHRoZSB0YWJsZSB3aWxsIHNldCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaGVpZ2h0IHRvIHNob3cgYWxsIHJvd3MuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIHVzaW5nIGEgZml4ZWQgKHB4KSBoZWlnaHQgZm9yIHRoZSB0YWJsZSwgaWYgdGhlIGhlaWdodCBvZiBhbGwgZXh0ZXJuYWwgb2JqZWN0cyArIHRoZSBoZWlnaHQgb2YgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIGdyZWF0ZXIgdGhlblxuICAgKiB0aGUgdGFibGUncyBoZWlnaHQgYSB2ZXJ0aWNhbCBzY3JvbGwgYmFyIHdpbGwgc2hvdy5cbiAgICogSWYgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwicyBoZWlnaHQgd2lsbCBiZSBsb3dlciB0aGVuIGl0J3MgcmVuZGVyZWQgY29udGVudCBoZWlnaHQgYW5kIGFkZGl0aW9uYWwgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIGFwcGVhciwgd2hpY2ggaXMsIHVzdWFsbHksIG5vdCBnb29kLlxuICAgKlxuICAgKiBUbyBhdm9pZCB0aGlzLCBkb24ndCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIGZpeGVkIGhlaWdodCBmb3IgdGhlIHRhYmxlLiBJbnN0ZWFkIHVzZSBmYWxsYmFja01pbkhlaWdodCB0b2dldGhlciB3aXRoIGEgbWluIGhlaWdodCBmb3IgdGhlIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGZhbGxiYWNrTWluSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mYWxsYmFja01pbkhlaWdodDsgfVxuICBzZXQgZmFsbGJhY2tNaW5IZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mYWxsYmFja01pbkhlaWdodCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGU6IHVuZGVmaW5lZCB8ICggKGNvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPikgPT4gKCBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2xhc3M6IHN0cmluZ106IGFueSB9ICkpO1xuICBASW5wdXQoKSByb3dDbGFzc1VwZGF0ZUZyZXE6ICdpdGVtJyB8ICduZ0RvQ2hlY2snIHwgJ25vbmUnID0gJ2l0ZW0nO1xuXG4gIHJvd0ZvY3VzOiAwIHwgJycgPSAnJztcbiAgY2VsbEZvY3VzOiAwIHwgJycgPSAnJztcblxuICBwcml2YXRlIF9mYWxsYmFja01pbkhlaWdodCA9IDA7XG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IFBibERhdGFTb3VyY2U8VD47XG5cbiAgQFZpZXdDaGlsZCgnYmVmb3JlVGFibGUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVUYWJsZTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnYmVmb3JlQ29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkJlZm9yZUNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2FmdGVyQ29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkFmdGVyQ29udGVudDogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZmJUYWJsZUNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiVGFibGVDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZCgnZmJIZWFkZXJDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYkhlYWRlckNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZCgnZmJGb290ZXJDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYkZvb3RlckNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZChDZGtSb3dEZWYsIHsgc3RhdGljOiB0cnVlIH0pIF90YWJsZVJvd0RlZjogQ2RrUm93RGVmPFQ+O1xuICBAVmlld0NoaWxkcmVuKENka0hlYWRlclJvd0RlZikgX2hlYWRlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtIZWFkZXJSb3dEZWY+O1xuICBAVmlld0NoaWxkcmVuKENka0Zvb3RlclJvd0RlZikgX2Zvb3RlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtGb290ZXJSb3dEZWY+O1xuXG4gIGdldCBtZXRhQ29sdW1uSWRzKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1uSWRzJ10geyByZXR1cm4gdGhpcy5fc3RvcmUubWV0YUNvbHVtbklkczsgfVxuICBnZXQgbWV0YUNvbHVtbnMoKTogUGJsQ29sdW1uU3RvcmVbJ21ldGFDb2x1bW5zJ10geyByZXR1cm4gdGhpcy5fc3RvcmUubWV0YUNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtblJvd0RlZigpIHsgcmV0dXJuIHsgaGVhZGVyOiB0aGlzLl9zdG9yZS5oZWFkZXJDb2x1bW5EZWYsIGZvb3RlcjogdGhpcy5fc3RvcmUuZm9vdGVyQ29sdW1uRGVmIH07IH1cbiAgLyoqXG4gICAqIFRydWUgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkIChhZnRlciBBZnRlclZpZXdJbml0KVxuICAgKi9cbiAgcmVhZG9ubHkgaXNJbml0OiBib29sZWFuO1xuICByZWFkb25seSBjb2x1bW5BcGk6IENvbHVtbkFwaTxUPjtcbiAgZ2V0IGNvbnRleHRBcGkoKTogUGJsTmdyaWRDb250ZXh0QXBpPFQ+IHsgcmV0dXJuIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpOyB9XG5cbiAgZ2V0IHZpZXdwb3J0KCk6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl92aWV3cG9ydDsgfVxuXG4gIF9jZGtUYWJsZTogUGJsQ2RrVGFibGVDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgX3N0b3JlOiBQYmxDb2x1bW5TdG9yZSA9IG5ldyBQYmxDb2x1bW5TdG9yZSgpO1xuICBwcml2YXRlIF9oaWRlQ29sdW1uc0RpcnR5OiBib29sZWFuO1xuICBwcml2YXRlIF9oaWRlQ29sdW1uczogc3RyaW5nW107XG4gIHByaXZhdGUgX2NvbEhpZGVEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZz47XG4gIHByaXZhdGUgX25vRGF0ZUVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3BhZ2luYXRvckVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlO1xuICBwcml2YXRlIF9ub0NhY2hlUGFnaW5hdG9yID0gZmFsc2U7XG4gIHByaXZhdGUgX21pbmltdW1Sb3dXaWR0aDogc3RyaW5nO1xuICBwcml2YXRlIF92aWV3cG9ydD86IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudDtcbiAgcHJpdmF0ZSBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7XG4gIHByaXZhdGUgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD47XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ2lkJykgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0YWJsZUNvbmZpZyA9IGNvbmZpZy5nZXQoJ3RhYmxlJyk7XG4gICAgdGhpcy5zaG93SGVhZGVyID0gdGFibGVDb25maWcuc2hvd0hlYWRlcjtcbiAgICB0aGlzLnNob3dGb290ZXIgPSB0YWJsZUNvbmZpZy5zaG93Rm9vdGVyO1xuICAgIHRoaXMubm9GaWxsZXIgPSB0YWJsZUNvbmZpZy5ub0ZpbGxlcjtcblxuICAgIHRoaXMuaW5pdEV4dEFwaSgpO1xuICAgIHRoaXMuY29sdW1uQXBpID0gQ29sdW1uQXBpLmNyZWF0ZTxUPih0aGlzLCB0aGlzLl9zdG9yZSwgdGhpcy5fZXh0QXBpKTtcbiAgICB0aGlzLmluaXRQbHVnaW5zKGluamVjdG9yLCBlbFJlZiwgdmNSZWYpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oaWRlQ29sdW1uc0RpcnR5KSB7XG4gICAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gZmFsc2U7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2hpZGVDb2x1bW5zO1xuICAgICAgaWYgKCF0aGlzLl9jb2xIaWRlRGlmZmVyICYmIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHZhbHVlKS5jcmVhdGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkaWZmZXIgc3VwcG9ydGluZyBvYmplY3QgJyR7dmFsdWV9LiBoaWRlQ29sdW1ucyBvbmx5IHN1cHBvcnRzIGJpbmRpbmcgdG8gSXRlcmFibGVzIHN1Y2ggYXMgQXJyYXlzLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb2xIaWRlRGlmZmVyKSB7XG4gICAgICBjb25zdCBoaWRlQ29sdW1ucyA9IHRoaXMuX2hpZGVDb2x1bW5zIHx8IFtdO1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2NvbEhpZGVEaWZmZXIuZGlmZihoaWRlQ29sdW1ucyk7XG4gICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLl9zdG9yZS5oaWRkZW4gPSBoaWRlQ29sdW1ucztcbiAgICAgICAgdGhpcy5fbWluaW11bVJvd1dpZHRoID0gJyc7XG5cbiAgICAgICAgLy8gVE9ETyhzaGxvbWlhc3NhZikgW3BlcmYsIDRdOiBSaWdodCBub3cgd2UgYXR0YWNoIGFsbCBjb2x1bW5zLCB3ZSBjYW4gaW1wcm92ZSBpdCBieSBhdHRhY2hpbmcgb25seSB0aG9zZSBcImFkZGVkXCIgKHdlIGtub3cgdGhlbSBmcm9tIFwiY2hhbmdlc1wiKVxuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5faGlkZUNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gbm8gbmVlZCB0byB1bnN1YnNjcmliZSwgdGhlIHJlZyBzZXJ2aWNlIGlzIHBlciB0YWJsZSBpbnN0YW5jZSBhbmQgaXQgd2lsbCBkZXN0cm95IHdoZW4gdGhpcyB0YWJsZSBkZXN0cm95LlxuICAgIC8vIEFsc28sIGF0IHRoaXMgcG9pbnQgaW5pdGlhbCBjaGFuZ2VzIGZyb20gdGVtcGxhdGVzIHByb3ZpZGVkIGluIHRoZSBjb250ZW50IGFyZSBhbHJlYWR5IGluc2lkZSBzbyB0aGV5IHdpbGwgbm90IHRyaWdnZXJcbiAgICAvLyB0aGUgb3JkZXIgaGVyZSBpcyB2ZXJ5IGltcG9ydGFudCwgYmVjYXVzZSBjb21wb25lbnQgdG9wIG9mIHRoaXMgdGFibGUgd2lsbCBmaXJlIGxpZmUgY3ljbGUgaG9va3MgQUZURVIgdGhpcyBjb21wb25lbnRcbiAgICAvLyBzbyBpZiB3ZSBoYXZlIGEgdG9wIGxldmVsIGNvbXBvbmVudCByZWdpc3RlcmluZyBhIHRlbXBsYXRlIG9uIHRvcCBpdCB3aWxsIG5vdCBzaG93IHVubGVzcyB3ZSBsaXN0ZW4uXG4gICAgdGhpcy5yZWdpc3RyeS5jaGFuZ2VzLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICBsZXQgdGFibGVDZWxsID0gZmFsc2U7XG4gICAgICBsZXQgaGVhZGVyRm9vdGVyQ2VsbCA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICd0YWJsZUNlbGwnOlxuICAgICAgICAgICAgdGFibGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlckNlbGwnOlxuICAgICAgICAgIGNhc2UgJ2Zvb3RlckNlbGwnOlxuICAgICAgICAgICAgaGVhZGVyRm9vdGVyQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdub0RhdGEnOlxuICAgICAgICAgICAgdGhpcy5zZXR1cE5vRGF0YSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFnaW5hdG9yJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGFibGVDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgICAgaWYgKGhlYWRlckZvb3RlckNlbGwpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0luaXQnLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25Jbml0JyB9KTtcblxuICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcblxuICAgIC8vIEFkZGluZyBhIGRpdiBiZWZvcmUgdGhlIGZvb3RlciByb3cgdmlldyByZWZlcmVuY2UsIHRoaXMgZGl2IHdpbGwgYmUgdXNlZCB0byBmaWxsIHVwIHRoZSBzcGFjZSBiZXR3ZWVuIGhlYWRlciAmIGZvb3RlciByb3dzXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1lbXB0eS1zcGFjZXInKVxuICAgIHRoaXMuX2Nka1RhYmxlLl9lbGVtZW50Lmluc2VydEJlZm9yZShkaXYsIHRoaXMuX2Nka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmxpc3RlblRvUmVzaXplKCk7XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgd2lsbCBjYXRjaCBjb250ZXh0IGZvY3VzZWQgZXZlbnRzLCBmaW5kIHRoZSBIVE1MIGVsZW1lbnQgb2YgdGhlIGNlbGwgYW5kIGZvY3VzIGl0LlxuICAgIHRoaXMuY29udGV4dEFwaS5mb2N1c0NoYW5nZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmN1cnIpIHtcbiAgICAgICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5jb250ZXh0QXBpLmZpbmRSb3dJblZpZXcoZXZlbnQuY3Vyci5yb3dJZGVudCk7XG4gICAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KHJvd0NvbnRleHQuaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbFZpZXdJbmRleCA9IHRoaXMuY29sdW1uQXBpLnJlbmRlckluZGV4T2YodGhpcy5jb2x1bW5BcGkuY29sdW1uc1tldmVudC5jdXJyLmNvbEluZGV4XSlcbiAgICAgICAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSB2aWV3LnJvb3ROb2Rlc1swXS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtY2VsbCcpW2NlbGxWaWV3SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAoY2VsbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgcHJvY2Vzc0NvbHVtbnMgPSBmYWxzZTtcblxuICAgIGlmIChjaGFuZ2VzLmZvY3VzTW9kZSkge1xuICAgICAgdGhpcy5yb3dGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAncm93JyA/IDAgOiAnJztcbiAgICAgIHRoaXMuY2VsbEZvY3VzID0gdGhpcy5mb2N1c01vZGUgPT09ICdjZWxsJyA/IDAgOiAnJztcbiAgICB9XG5cbiAgICBpZiAoIGNoYW5nZXMuY29sdW1ucyAmJiB0aGlzLmlzSW5pdCApIHtcbiAgICAgIHByb2Nlc3NDb2x1bW5zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIHByb2Nlc3NDb2x1bW5zID09PSB0cnVlICkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9wbHVnaW4uZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBwOiBQcm9taXNlPHZvaWQ+O1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25EZXN0cm95Jywgd2FpdDogKF9wOiBQcm9taXNlPHZvaWQ+KSA9PiBwID0gX3AgfSk7XG4gICAgaWYgKHApIHtcbiAgICAgIHAudGhlbihkZXN0cm95KS5jYXRjaChkZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVCk6IGFueSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IHNvcnQgZGVmaW5pdGlvbnMuXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAsIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBzb3J0aW5nIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgb3IgYHNvcnRBbGlhc2AgcHJvcGVydGllcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXG4gICAqXG4gICAqIEBwYXJhbSBjb2x1bW5PclNvcnRBbGlhcyBBIGNvbHVtbiBpbnN0YW5jZSBvciBhIHN0cmluZyBtYXRjaGluZyBgUGJsQ29sdW1uLnNvcnRBbGlhc2Agb3IgYFBibENvbHVtbi5pZGAuXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhczogUGJsQ29sdW1uIHwgc3RyaW5nLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM/OiBQYmxDb2x1bW4gfCBzdHJpbmcgfCBib29sZWFuLCBzb3J0PzogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5PclNvcnRBbGlhcyB8fCB0eXBlb2YgY29sdW1uT3JTb3J0QWxpYXMgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5kcy5zZXRTb3J0KCEhY29sdW1uT3JTb3J0QWxpYXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb2x1bW46IFBibENvbHVtbjtcbiAgICBpZiAodHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnc3RyaW5nJykge1xuICAgICAgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2x1bW5PclNvcnRBbGlhcyA6IChjLnNvcnQgJiYgYy5pZCA9PT0gY29sdW1uT3JTb3J0QWxpYXMpICk7XG4gICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzIFwiJHtjb2x1bW5PclNvcnRBbGlhc31cIi5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4gPSBjb2x1bW5PclNvcnRBbGlhcztcbiAgICB9XG4gICAgdGhpcy5kcy5zZXRTb3J0KGNvbHVtbiwgc29ydCwgc2tpcFVwZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYC5cbiAgICovXG4gIHNldEZpbHRlcigpOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSBmdW5jdGlvbiBwcmVkaWNhdGUuXG4gICAqXG4gICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IERhdGFTb3VyY2VQcmVkaWNhdGUsIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgdmFsdWUgdG8gY29tcGFyZSB3aXRoIGFuZCBhIGxpc3Qgb2YgY29sdW1ucyB3aXRoIHRoZSB2YWx1ZXMgdG8gY29tcGFyZSB0by5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IGFueSwgY29sdW1uczogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIHNldEZpbHRlcih2YWx1ZT86IERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgY29sdW1ucz86IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjb2x1bW5JbnN0YW5jZXM6IFBibENvbHVtbltdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykgJiYgdHlwZW9mIGNvbHVtbnNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbElkIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbmQoIGMgPT4gYy5hbGlhcyA/IGMuYWxpYXMgPT09IGNvbElkIDogKGMuaWQgPT09IGNvbElkKSApO1xuICAgICAgICAgIGlmICghY29sdW1uICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzICR7Y29sSWR9IFwiJHtjb2xJZH1cIi5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29sdW1uSW5zdGFuY2VzLnB1c2goY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uSW5zdGFuY2VzID0gY29sdW1ucyBhcyBhbnk7XG4gICAgICB9XG4gICAgICB0aGlzLmRzLnNldEZpbHRlcih2YWx1ZSwgY29sdW1uSW5zdGFuY2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIoKTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT09IHZhbHVlKSB7XG4gICAgICAvLyBLSUxMIEFMTCBzdWJzY3JpcHRpb25zIGZvciB0aGUgcHJldmlvdXMgZGF0YXNvdXJjZS5cbiAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLl9kYXRhU291cmNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgICB0aGlzLl9kYXRhU291cmNlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5kYXRhU291cmNlID0gdmFsdWUgYXMgYW55O1xuXG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICB0aGlzLnNldHVwTm9EYXRhKGZhbHNlKTtcblxuICAgICAgLy8gY2xlYXIgdGhlIGNvbnRleHQsIG5ldyBkYXRhc291cmNlXG4gICAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuXG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHtcbiAgICAgICAga2luZDogJ29uRGF0YVNvdXJjZScsXG4gICAgICAgIHByZXYsXG4gICAgICAgIGN1cnI6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgdmFsdWUub25FcnJvci5waXBlKFVuUngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRvIHRoaXMgZXZlbnQgYmVjYXVzZSBpdCBmaXJlcyBiZWZvcmUgdGhlIGVudGlyZSBkYXRhLWNoYW5naW5nIHByb2Nlc3Mgc3RhcnRzLlxuICAgICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2UgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBpcyBmaXJlZCBhc3luYywganVzdCBiZWZvcmUgdGhlIGRhdGEgaXMgZW1pdHRlZC5cbiAgICAgICAgLy8gSXRzIG5vdCBlbm91Z2ggdG8gY2xlYXIgdGhlIGNvbnRleHQgd2hlbiBgc2V0RGF0YVNvdXJjZWAgaXMgY2FsbGVkLCB3ZSBhbHNvIG5lZWQgdG8gaGFuZGxlIGByZWZyZXNoYCBjYWxscyB3aGljaCB3aWxsIG5vdFxuICAgICAgICAvLyB0cmlnZ2VyIHRoaXMgbWV0aG9kLlxuICAgICAgICB2YWx1ZS5vblNvdXJjZUNoYW5naW5nLnBpcGUoVW5SeCh0aGlzLCB2YWx1ZSkpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApO1xuXG4gICAgICAgIC8vIFJ1biBDRCwgc2NoZWR1bGVkIGFzIGEgbWljcm8tdGFzaywgYWZ0ZXIgZWFjaCByZW5kZXJpbmdcbiAgICAgICAgdmFsdWUub25SZW5kZXJEYXRhQ2hhbmdpbmdcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlciggKHtldmVudH0pID0+ICFldmVudC5pc0luaXRpYWwgJiYgKGV2ZW50LnBhZ2luYXRpb24uY2hhbmdlZCB8fCBldmVudC5zb3J0LmNoYW5nZWQgfHwgZXZlbnQuZmlsdGVyLmNoYW5nZWQpKSxcbiAgICAgICAgICAgIC8vIENvbnRleHQgYmV0d2VlbiB0aGUgb3BlcmF0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBhdCB0aGUgbW9tZW50XG4gICAgICAgICAgICAvLyBFdmVudCBmb3IgY2xpZW50IHNpZGUgb3BlcmF0aW9ucy4uLlxuICAgICAgICAgICAgLy8gVE9ETzogY2FuIHdlIHJlbW92ZSB0aGlzPyB3ZSBjbGVhciB0aGUgY29udGV4dCB3aXRoIGBvblNvdXJjZUNoYW5naW5nYFxuICAgICAgICAgICAgdGFwKCAoKSA9PiAhdGhpcy5fc3RvcmUucHJpbWFyeSAmJiB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpICksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoICgpID0+IHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZC5waXBlKHRha2UoMSksIG1hcFRvKHRoaXMuZHMucmVuZGVyTGVuZ3RoKSkgKSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyKSxcbiAgICAgICAgICAgIFVuUngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIHByZXZpb3VzUmVuZGVyTGVuZ3RoID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBudW1iZXIgb2YgcmVuZGVyZWQgaXRlbXMgaGFzIGNoYW5nZWQgdGhlIHRhYmxlIHdpbGwgdXBkYXRlIHRoZSBkYXRhIGFuZCBydW4gQ0Qgb24gaXQuXG4gICAgICAgICAgICAvLyBzbyB3ZSBvbmx5IHVwZGF0ZSB0aGUgcm93cy5cbiAgICAgICAgICAgIGNvbnN0IHsgY2RrVGFibGUgfSA9IHRoaXMuX2V4dEFwaTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1JlbmRlckxlbmd0aCA9PT0gdGhpcy5kcy5yZW5kZXJMZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3ModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKCdmb290ZXInLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGluZyBubyBkYXRhIG92ZXJsYXlcbiAgICAgICAgLy8gSGFuZGxpbmcgZmFsbGJhY2sgbWluaW11bSBoZWlnaHQuXG4gICAgICAgIHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZFxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKCAoKSA9PiB0aGlzLmRzLnJlbmRlckxlbmd0aCApLFxuICAgICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICAgIHRhcCggKFtwcmV2LCBjdXJyXSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBub0RhdGFTaG93aW5nID0gISF0aGlzLl9ub0RhdGVFbWJlZGRlZFZSZWY7XG4gICAgICAgICAgICAgIGlmICggKGN1cnIgPiAwICYmIG5vRGF0YVNob3dpbmcpIHx8IChjdXJyID09PSAwICYmICFub0RhdGFTaG93aW5nKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTm9EYXRhKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb2JzZXJ2ZU9uKGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSwgLy8gd3cgd2FudCB0byBnaXZlIHRoZSBicm93c2VyIHRpbWUgdG8gcmVtb3ZlL2FkZCByb3dzXG4gICAgICAgICAgICBVblJ4KHRoaXMsIHZhbHVlKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kcy5yZW5kZXJMZW5ndGggPiAwICYmIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCBoID0gTWF0aC5taW4odGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQsIHRoaXMudmlld3BvcnQubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSk7XG4gICAgICAgICAgICAgIGVsLnN0eWxlLm1pbkhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuc3R5bGUubWluSGVpZ2h0ID0gdGhpcy52aWV3cG9ydC5lbmFibGVkID8gbnVsbCA6IHRoaXMudmlld3BvcnQubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSArICdweCc7XG4gICAgICAgICAgICAgIC8vIFRPRE86IFdoZW4gdmlld3BvcnQgaXMgZGlzYWJsZWQsIHdlIGNhbiBza2lwIHRoZSBjYWxsIHRvIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkgYW5kIGxldCB0aGUgYnJvd3NlclxuICAgICAgICAgICAgICAvLyBkbyB0aGUgam9iIGJ5IHNldHRpbmcgYGNvbnRhaW46IHVuc2V0YCBpbiBgcGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydGBcblxuICAgICAgICAgICAgICAvLyBlbC5zdHlsZS5taW5IZWlnaHQgPSBudWxsO1xuICAgICAgICAgICAgICAvLyBlbC5zdHlsZS5jb250YWluID0gdGhpcy52aWV3cG9ydC5lbmFibGVkID8gbnVsbCA6ICd1bnNldCc7XG5cbiAgICAgICAgICAgICAgLy8gVVBEQVRFOiBUaGlzIHdpbGwgbm90IHdvcmsgYmVjYXVzZSBpdCB3aWxsIGNhdXNlIHRoZSB3aWR0aCB0byBiZSBpbmNvcnJlY3Qgd2hlbiB1c2VkIHdpdGggdlNjcm9sbE5vbmVcbiAgICAgICAgICAgICAgLy8gVE9ETzogQ2hlY2sgd2h5P1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlcyB0aGUgaGVhZGVyLCBpbmNsdWRpbmcgYSBmdWxsIHJlYnVpbGQgb2YgY29sdW1uIGhlYWRlcnNcbiAgICovXG4gIGludmFsaWRhdGVDb2x1bW5zKCk6IHZvaWQge1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnYmVmb3JlSW52YWxpZGF0ZUhlYWRlcnMnIH0pO1xuXG4gICAgY29uc3QgcmVidWlsZFJvd3MgPSB0aGlzLl9zdG9yZS5hbGxDb2x1bW5zLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICB0aGlzLl9zdG9yZS5pbnZhbGlkYXRlKHRoaXMuY29sdW1ucyk7XG5cbiAgICBzZXRJZGVudGl0eVByb3AodGhpcy5fc3RvcmUsIHRoaXMuX19pZGVudGl0eVByb3ApOyAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuXG4gICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5fY2RrVGFibGUuY2xlYXJGb290ZXJSb3dEZWZzKCk7XG4gICAgLy8gdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgLy8gYWZ0ZXIgaW52YWxpZGF0aW5nIHRoZSBoZWFkZXJzIHdlIG5vdyBoYXZlIG9wdGlvbmFsIGhlYWRlci9oZWFkZXJHcm91cHMvZm9vdGVyIHJvd3MgYWRkZWRcbiAgICAvLyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgdGVtcGxhdGUgd2l0aCB0aGlzIGRhdGEgd2hpY2ggd2lsbCBjcmVhdGUgbmV3IHJvd3MgKGhlYWRlci9mb290ZXIpXG4gICAgdGhpcy5yZXNldEhlYWRlclJvd0RlZnMoKTtcbiAgICB0aGlzLnJlc2V0Rm9vdGVyUm93RGVmcygpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgLyogIE5vdyB3ZSB3aWxsIGZvcmNlIGNsZWFyaW5nIGFsbCBkYXRhIHJvd3MgYW5kIGNyZWF0aW5nIHRoZW0gYmFjayBhZ2FpbiBpZiB0aGlzIGlzIG5vdCB0aGUgZmlyc3QgdGltZSB3ZSBpbnZhbGlkYXRlIHRoZSBjb2x1bW5zLi4uXG5cbiAgICAgICAgV2h5PyBmaXJzdCwgc29tZSBiYWNrZ3JvdW5kOlxuXG4gICAgICAgIEludmFsaWRhdGluZyB0aGUgc3RvcmUgd2lsbCByZXN1bHQgaW4gbmV3IGBQYmxDb2x1bW5gIGluc3RhbmNlcyAoY2xvbmVkIG9yIGNvbXBsZXRlbHkgbmV3KSBoZWxkIGluc2lkZSBhIG5ldyBhcnJheSAoYWxsIGFycmF5cyBpbiB0aGUgc3RvcmUgYXJlIHJlLWNyZWF0ZWQgb24gaW52YWxpZGF0ZSlcbiAgICAgICAgTmV3IGFycmF5IGFuZCBuZXcgaW5zdGFuY2VzIHdpbGwgYWxzbyByZXN1bHQgaW4gbmV3IGRpcmVjdGl2ZSBpbnN0YW5jZXMgb2YgYFBibE5ncmlkQ29sdW1uRGVmYCBmb3IgZXZlcnkgY29sdW1uLlxuXG4gICAgICAgIEVhY2ggZGF0YSByb3cgaGFzIGRhdGEgY2VsbHMgd2l0aCB0aGUgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgZGlyZWN0aXZlIChgcGJsLW5ncmlkLWNlbGxgKS5cbiAgICAgICAgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgaGFzIGEgcmVmZXJlbmNlIHRvIGBQYmxOZ3JpZENvbHVtbkRlZmAgdGhyb3VnaCBkZXBlbmRlbmN5IGluamVjdGlvbiwgaS5lLiBpdCB3aWxsIG5vdCB1cGRhdGUgdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uIVxuXG4gICAgICAgIE5vdywgdGhlIHByb2JsZW06XG4gICAgICAgIFRoZSBgQ2RrVGFibGVgIHdpbGwgY2FjaGUgcm93cyBhbmQgdGhlaXIgY2VsbHMsIHJldXNpbmcgdGhlbSBmb3IgcGVyZm9ybWFuY2UuXG4gICAgICAgIFRoaXMgbWVhbnMgdGhhdCB0aGUgYFBibE5ncmlkQ29sdW1uRGVmYCBpbnN0YW5jZSBpbnNpZGUgZWFjaCBjZWxsIHdpbGwgbm90IGNoYW5nZS5cbiAgICAgICAgU28sIGNyZWF0aW5nIG5ldyBjb2x1bW5zIGFuZCBjb2x1bW5EZWZzIHdpbGwgcmVzdWx0IGluIHN0YWxlIGNlbGxzIHdpdGggcmVmZXJlbmNlIHRvIGRlYWQgaW5zdGFuY2VzIG9mIGBQYmxDb2x1bW5gIGFuZCBgUGJsTmdyaWRDb2x1bW5EZWZgLlxuXG4gICAgICAgIE9uZSBzb2x1dGlvbiBpcyB0byByZWZhY3RvciBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCB0byBnZXQgdGhlIGBQYmxOZ3JpZENvbHVtbkRlZmAgdGhyb3VnaCBkYXRhIGJpbmRpbmcuXG4gICAgICAgIFdoaWxlIHRoaXMgd2lsbCB3b3JrIGl0IHdpbGwgcHV0IG1vcmUgd29yayBvbiBlYWNoIGNlbGwgd2hpbGUgZG9pbmcgQ0QgYW5kIHdpbGwgcmVxdWlyZSBjb21wbGV4IGxvZ2ljIHRvIGhhbmRsZSBlYWNoIGNoYW5nZSBiZWNhdXNlIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgXG4gICAgICAgIGFsc28gY3JlYXRlIGEgY29udGV4dCB3aGljaCBoYXMgcmVmZXJlbmNlIHRvIGEgY29sdW1uIHRodXMgYSBuZXcgY29udGV4dCBpcyByZXF1aXJlZC5cbiAgICAgICAgS2VlcGluZyB0cmFjayBmb3IgYWxsIHJlZmVyZW5jZXMgd2lsbCBiZSBkaWZmaWN1bHQgYW5kIGJ1Z3MgYXJlIGxpa2VseSB0byBvY2N1ciwgd2hpY2ggYXJlIGhhcmQgdG8gdHJhY2suXG5cbiAgICAgICAgVGhlIHNpbXBsZXN0IHNvbHV0aW9uIGlzIHRvIGZvcmNlIHRoZSB0YWJsZSB0byByZW5kZXIgYWxsIGRhdGEgcm93cyBmcm9tIHNjcmF0Y2ggd2hpY2ggd2lsbCBkZXN0cm95IHRoZSBjYWNoZSBhbmQgYWxsIGNlbGwncyB3aXRoIGl0LCBjcmVhdGluZyBuZXcgb25lJ3Mgd2l0aCBwcm9wZXIgcmVmZXJlbmNlLlxuXG4gICAgICAgIFRoZSBzaW1wbGUgc29sdXRpb24gaXMgY3VycmVudGx5IHByZWZlcnJlZCBiZWNhdXNlOlxuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGltcGxlbWVudC5cbiAgICAgICAgLSBJdCBpcyBlYXNpZXIgdG8gYXNzZXNzIHRoZSBpbXBhY3QuXG4gICAgICAgIC0gSXQgZWZmZWN0cyBhIHNpbmdsZSBvcGVyYXRpb24gKGNoYW5naW5nIHRvIHJlc2V0dGluZyBjb2x1bW5zKSB0aGF0IHJhcmVseSBoYXBwZW5cblxuICAgICAgICBUaGUgb25seSBpc3N1ZSBpcyB3aXRoIHRoZSBgQ2RrVGFibGVgIGVuY2Fwc3VsYXRpbmcgdGhlIG1ldGhvZCBgX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWAgd2hpY2ggaXMgd2hhdCB3ZSBuZWVkLlxuICAgICAgICBUaGUgd29ya2Fyb3VuZCBpcyB0byBhc3NpZ24gYG11bHRpVGVtcGxhdGVEYXRhUm93c2Agd2l0aCB0aGUgc2FtZSB2YWx1ZSBpdCBhbHJlYWR5IGhhcywgd2hpY2ggd2lsbCBjYXVzZSBgX2ZvcmNlUmVuZGVyRGF0YVJvd3NgIHRvIGZpcmUuXG4gICAgICAgIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGlzIGEgZ2V0dGVyIHRoYXQgdHJpZ2dlcnMgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB3aXRob3V0IGNoZWNraW5nIHRoZSB2YWx1ZSBjaGFuZ2VkLCBwZXJmZWN0IGZpdC5cbiAgICAgICAgVGhlcmUgaXMgYSByaXNrIHdpdGggYG11bHRpVGVtcGxhdGVEYXRhUm93c2AgYmVpbmcgY2hhbmdlZC4uLlxuICAgICAqL1xuICAgIGlmIChyZWJ1aWxkUm93cykge1xuICAgICAgdGhpcy5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gdGhpcy5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIH1cbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uSW52YWxpZGF0ZUhlYWRlcnMnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzaXplcyBmb3IgYWxsIGNvbHVtbnMgaW4gdGhlIHRhYmxlIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXG4gICAqIFRoZSBmaW5hbCB3aWR0aCByZXByZXNlbnQgYSBzdGF0aWMgd2lkdGgsIGl0IGlzIHRoZSB2YWx1ZSBhcyBzZXQgaW4gdGhlIGRlZmluaXRpb24gKGV4Y2VwdCBjb2x1bW4gd2l0aG91dCB3aWR0aCwgd2hlcmUgdGhlIGNhbGN1bGF0ZWQgZ2xvYmFsIHdpZHRoIGlzIHNldCkuXG4gICAqL1xuICByZXNldENvbHVtbnNXaWR0aCgpOiB2b2lkIHtcbiAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzaXplIG9mIGFsbCBncm91cCBjb2x1bW5zIGluIHRoZSB0YWJsZSBiYXNlZCBvbiB0aGUgc2l6ZSBvZiB0aGVpciB2aXNpYmxlIGNoaWxkcmVuIChub3QgaGlkZGVuKS5cbiAgICogQHBhcmFtIGR5bmFtaWNXaWR0aExvZ2ljIC0gT3B0aW9uYWwgbG9naWMgY29udGFpbmVyLCBpZiBub3Qgc2V0IGEgbmV3IG9uZSBpcyBjcmVhdGVkLlxuICAgKi9cbiAgc3luY0NvbHVtbkdyb3Vwc1NpemUoZHluYW1pY1dpZHRoTG9naWM/OiBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyk6IHZvaWQge1xuICAgIGlmICghZHluYW1pY1dpZHRoTG9naWMpIHtcbiAgICAgIGR5bmFtaWNXaWR0aExvZ2ljID0gdGhpcy5fZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICB9XG5cbiAgICAvLyBGcm9tIGFsbCBtZXRhIGNvbHVtbnMgKGhlYWRlci9mb290ZXIvaGVhZGVyR3JvdXApIHdlIGZpbHRlciBvbmx5IGBoZWFkZXJHcm91cGAgY29sdW1ucy5cbiAgICAvLyBGb3IgZWFjaCB3ZSBjYWxjdWxhdGUgaXQncyB3aWR0aCBmcm9tIGFsbCBvZiB0aGUgY29sdW1ucyB0aGF0IHRoZSBoZWFkZXJHcm91cCBcImdyb3Vwc1wiLlxuICAgIC8vIFdlIHVzZSB0aGUgc2FtZSBzdHJhdGVneSBhbmQgdGhlIHNhbWUgUm93V2lkdGhEeW5hbWljQWdncmVnYXRvciBpbnN0YW5jZSB3aGljaCB3aWxsIHByZXZlbnQgZHVwbGljYXRlIGNhbGN1bGF0aW9ucy5cbiAgICAvLyBOb3RlIHRoYXQgd2UgbWlnaHQgaGF2ZSBtdWx0aXBsZSBoZWFkZXIgZ3JvdXBzLCBpLmUuIHNhbWUgY29sdW1ucyBvbiBtdWx0aXBsZSBncm91cHMgd2l0aCBkaWZmZXJlbnQgcm93IGluZGV4LlxuICAgIGZvciAoY29uc3QgZyBvZiB0aGlzLl9zdG9yZS5nZXRBbGxIZWFkZXJHcm91cCgpKSB7XG4gICAgICAvLyBXZSBnbyBvdmVyIGFsbCBjb2x1bW5zIGJlY2F1c2UgZy5jb2x1bW5zIGRvZXMgbm90IHJlcHJlc2VudCB0aGUgY3VycmVudCBvd25lZCBjb2x1bW5zIG9mIHRoZSBncm91cFxuICAgICAgLy8gaXQgaXMgc3RhdGljLCByZXByZXNlbnRpbmcgdGhlIGluaXRpYWwgc3RhdGUuXG4gICAgICAvLyBPbmx5IGNvbHVtbnMgaG9sZCB0aGVpciBncm91cCBvd25lcnMuXG4gICAgICAvLyBUT0RPOiBmaW5kIHdheSB0byBpbXByb3ZlIGl0ZXJhdGlvblxuICAgICAgY29uc3QgY29sU2l6ZUluZm9zID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maWx0ZXIoIGMgPT4gIWMuaGlkZGVuICYmIGMuaXNJbkdyb3VwKGcpKS5tYXAoIGMgPT4gYy5zaXplSW5mbyApO1xuICAgICAgaWYgKGNvbFNpemVJbmZvcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGdyb3VwV2lkdGggPSBkeW5hbWljV2lkdGhMb2dpYy5hZGRHcm91cChjb2xTaXplSW5mb3MpO1xuICAgICAgICBnLm1pbldpZHRoID0gZ3JvdXBXaWR0aDtcbiAgICAgICAgZy51cGRhdGVXaWR0aChgJHtncm91cFdpZHRofXB4YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnLm1pbldpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICBnLnVwZGF0ZVdpZHRoKGAwcHhgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXNpemVDb2x1bW5zKGNvbHVtbnM/OiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGlmICghY29sdW1ucykge1xuICAgICAgY29sdW1ucyA9IHRoaXMuX3N0b3JlLmNvbHVtbnM7XG4gICAgfVxuXG4gICAgLy8gcHJvdGVjdCBmcm9tIHBlci1tYXR1cmUgcmVzaXplLlxuICAgIC8vIFdpbGwgaGFwcGVuIG9uIGFkZGl0aW9uYWwgaGVhZGVyL2hlYWRlci1ncm91cCByb3dzIEFORCBBTFNPIHdoZW4gdlNjcm9sbE5vbmUgaXMgc2V0XG4gICAgLy8gVGhpcyB3aWxsIGNhdXNlIHNpemUgbm90IHRvIHBvcHVsYXRlIGJlY2F1c2UgaXQgdGFrZXMgdGltZSB0byByZW5kZXIgdGhlIHJvd3MsIHNpbmNlIGl0J3Mgbm90IHZpcnR1YWwgYW5kIGhhcHBlbnMgaW1tZWRpYXRlbHkuXG4gICAgLy8gVE9ETzogZmluZCBhIGJldHRlciBwcm90ZWN0aW9uLlxuICAgIGlmICghY29sdW1uc1swXS5zaXplSW5mbykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHN0b3JlcyBhbmQgY2FsY3VsYXRlcyB3aWR0aCBmb3IgY29sdW1ucyBhZGRlZCB0byBpdC4gQWdncmVnYXRlJ3MgdGhlIHRvdGFsIHdpZHRoIG9mIGFsbCBhZGRlZCBjb2x1bW5zLlxuICAgIGNvbnN0IHJvd1dpZHRoID0gdGhpcy5fZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICB0aGlzLnN5bmNDb2x1bW5Hcm91cHNTaXplKHJvd1dpZHRoKTtcblxuICAgIC8vIGlmIHRoaXMgaXMgYSB0YWJsZSB3aXRob3V0IGdyb3Vwc1xuICAgIGlmIChyb3dXaWR0aC5taW5pbXVtUm93V2lkdGggPT09IDApIHtcbiAgICAgIHJvd1dpZHRoLmFkZEdyb3VwKGNvbHVtbnMubWFwKCBjID0+IGMuc2l6ZUluZm8gKSk7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIG1heCBsb2NrIHN0YXRlIGhhcyBjaGFuZ2VkIHdlIG5lZWQgdG8gdXBkYXRlIHJlLWNhbGN1bGF0ZSB0aGUgc3RhdGljIHdpZHRoJ3MgYWdhaW4uXG4gICAgaWYgKHJvd1dpZHRoLm1heFdpZHRoTG9ja0NoYW5nZWQpIHtcbiAgICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuX3N0b3JlLmdldFN0YXRpY1dpZHRoKCksIHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgICAgIHRoaXMucmVzaXplQ29sdW1ucyhjb2x1bW5zKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21pbmltdW1Sb3dXaWR0aCApIHtcbiAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgdG90YWwgbWluaW11bSB3aWR0aCBvZiB0aGUgdGFibGVcbiAgICAgIC8vIFdlIGRvIGl0IG9uY2UsIHRvIHNldCB0aGUgbWluaW11bSB3aWR0aCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzZXR1cC5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBhcHBseSBzdHJhdGVneSBoZXJlLCB3ZSB3YW50IHRoZSBlbnRpcmUgbGVuZ3RoIG9mIHRoZSB0YWJsZSFcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm1pbldpZHRoID0gcm93V2lkdGgubWluaW11bVJvd1dpZHRoO1xuICAgIH1cblxuICAgIHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuICAgICAgdGhpcy5fY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicpO1xuICAgICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvblJlc2l6ZVJvdycgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGVtYmVkZGVkIHZpZXcgYmVmb3JlIG9yIGFmdGVyIHRoZSB1c2VyIHByb2plY3RlZCBjb250ZW50LlxuICAgKi9cbiAgY3JlYXRlVmlldzxDPihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8Qz4sIGNvbnRleHQ/OiBDLCBpbmRleD86IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmdldEludGVybmFsVmNSZWYobG9jYXRpb24pO1xuICAgIGNvbnN0IHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYsIGNvbnRleHQsIGluZGV4KTtcbiAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gYWxyZWFkeSBjcmVhdGVkIGVtYmVkZGVkIHZpZXcuXG4gICAqIEBwYXJhbSB2aWV3IC0gVGhlIHZpZXcgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSBsb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiwgaWYgbm90IHNldCBkZWZhdWx0cyB0byBgYmVmb3JlYFxuICAgKiBAcmV0dXJucyB0cnVlIHdoZW4gYSB2aWV3IHdhcyByZW1vdmVkLCBmYWxzZSB3aGVuIG5vdC4gKGRpZCBub3QgZXhpc3QgaW4gdGhlIHZpZXcgY29udGFpbmVyIGZvciB0aGUgcHJvdmlkZWQgbG9jYXRpb24pXG4gICAqL1xuICByZW1vdmVWaWV3KHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+LCBsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmdldEludGVybmFsVmNSZWYobG9jYXRpb24pO1xuICAgIGNvbnN0IGlkeCA9IHZjUmVmLmluZGV4T2Yodmlldyk7XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmNSZWYucmVtb3ZlKGlkeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIGFsbCB2aXNpYmxlIGNvbHVtbnMgdG8gZml0IGNvbnRlbnQgb2YgdGhlIHRhYmxlLlxuICAgKiBAcGFyYW0gZm9yY2VGaXhlZFdpZHRoIC0gV2hlbiB0cnVlIHdpbGwgcmVzaXplIGFsbCBjb2x1bW5zIHdpdGggYWJzb2x1dGUgcGl4ZWwgdmFsdWVzLCBvdGhlcndpc2Ugd2lsbCBrZWVwIHRoZSBzYW1lIGZvcm1hdCBhcyBvcmlnaW5hbGx5IHNldCAoJSBvciBub25lKVxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5Ub0ZpdChvcHRpb25zPzogQXV0b1NpemVUb0ZpdE9wdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGlubmVyV2lkdGgsIG91dGVyV2lkdGggfSA9IHRoaXMudmlld3BvcnQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgYXV0by1zaXplIG9uIHRoZSB3aWR0aCB3aXRob3V0IHNjcm9sbCBiYXIgYW5kIHRha2UgYm94IG1vZGVsIGdhcHMgaW50byBhY2NvdW50XG4gICAgLy8gVE9ETzogaWYgbm8gc2Nyb2xsIGJhciBleGlzdHMgdGhlIGNhbGMgd2lsbCBub3QgaW5jbHVkZSBpdCwgbmV4dCBpZiBtb3JlIHJvd3MgYXJlIGFkZGVkIGEgc2Nyb2xsIGJhciB3aWxsIGFwcGVhci4uLlxuICAgIHRoaXMuY29sdW1uQXBpLmF1dG9TaXplVG9GaXQob3V0ZXJXaWR0aCAtIChvdXRlcldpZHRoIC0gaW5uZXJXaWR0aCksIG9wdGlvbnMpO1xuICB9XG5cbiAgZmluZEluaXRpYWxSb3dIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBsZXQgcm93RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KDApIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgcm93RWxlbWVudCA9IHZpZXdSZWYucm9vdE5vZGVzWzBdO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQpIHtcbiAgICAgIHJvd0VsZW1lbnQgPSB0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoID4gMFxuICAgICAgICA/ICh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQuZ2V0KHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5sZW5ndGggLSAxKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdXG4gICAgICAgIDogdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgO1xuICAgICAgcm93RWxlbWVudCA9IHJvd0VsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgICAgcm93RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBjb25zdCBoZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHJvd0VsZW1lbnQpLmhlaWdodDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHJldHVybiBwYXJzZUludChoZWlnaHQsIDEwKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyguLi5jbHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjIG9mIGNscykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsdWdpbnMoaW5qZWN0b3I6IEluamVjdG9yLCBlbFJlZjogRWxlbWVudFJlZjxhbnk+LCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhbiBpbmplY3RvciBmb3IgdGhlIGV4dGVuc2lvbnMvcGx1Z2luc1xuICAgIC8vIFRoaXMgaW5qZWN0b3IgYWxsb3cgcGx1Z2lucyAodGhhdCBjaG9vc2Ugc28pIHRvIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uIGZvciBydW50aW1lIHVzZS5cbiAgICAvLyBJLkU6IGFzIGlmIHRoZXkgd2UncmUgY3JlYXRlZCBieSBhbmd1bGFyIHZpYSB0ZW1wbGF0ZS4uLlxuICAgIC8vIFRoaXMgYWxsb3dzIHNlYW1sZXNzIHBsdWdpbi10by1wbHVnaW4gZGVwZW5kZW5jaWVzIHdpdGhvdXQgcmVxdWlyaW5nIHNwZWNpZmljIHRlbXBsYXRlIHN5bnRheC5cbiAgICAvLyBBbmQgYWxzbyBhbGxvd3MgYXV0byBwbHVnaW4gYmluZGluZyAoYXBwIHdpZGUpIHdpdGhvdXQgdGhlIG5lZWQgZm9yIHRlbXBsYXRlIHN5bnRheC5cbiAgICBjb25zdCBwbHVnaW5JbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBWaWV3Q29udGFpbmVyUmVmLCB1c2VWYWx1ZTogdmNSZWYgfSxcbiAgICAgICAgeyBwcm92aWRlOiBFbGVtZW50UmVmLCB1c2VWYWx1ZTogZWxSZWYgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDaGFuZ2VEZXRlY3RvclJlZiwgdXNlVmFsdWU6IHRoaXMuY2RyIH0sXG4gICAgICBdLFxuICAgICAgcGFyZW50OiBpbmplY3RvcixcbiAgICB9KTtcbiAgICB0aGlzLl9wbHVnaW4gPSBQYmxOZ3JpZFBsdWdpbkNvbnRleHQuY3JlYXRlKHRoaXMsIHBsdWdpbkluamVjdG9yLCB0aGlzLl9leHRBcGkpO1xuICAgIGJpbmRUb0RhdGFTb3VyY2UodGhpcy5fcGx1Z2luKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9SZXNpemUoKTogdm9pZCB7XG4gICAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgICBjb25zdCBybyQgPSBmcm9tRXZlbnRQYXR0ZXJuPFtSZXNpemVPYnNlcnZlckVudHJ5W10sIFJlc2l6ZU9ic2VydmVyXT4oXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKCFyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGhhbmRsZXIpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZXIgPT4ge1xuICAgICAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gU2tpcCB0aGUgZmlyc3QgZW1pc3Npb25cbiAgICAvLyBEZWJvdW5jZSBhbGwgcmVzaXplcyB1bnRpbCB0aGUgbmV4dCBjb21wbGV0ZSBhbmltYXRpb24gZnJhbWUgd2l0aG91dCBhIHJlc2l6ZVxuICAgIC8vIGZpbmFsbHkgbWFwcyB0byB0aGUgZW50cmllcyBjb2xsZWN0aW9uXG4gICAgLy8gU0tJUDogIFdlIHNob3VsZCBza2lwIHRoZSBmaXJzdCBlbWlzc2lvbiAoYHNraXAoMSlgKSBiZWZvcmUgd2UgZGVib3VuY2UsIHNpbmNlIGl0cyBjYWxsZWQgdXBvbiBjYWxsaW5nIFwib2JzZXJ2ZVwiIG9uIHRoZSByZXNpemVPYnNlcnZlci5cbiAgICAvLyAgICAgICAgVGhlIHByb2JsZW0gaXMgdGhhdCBzb21lIHRhYmxlcyBtaWdodCByZXF1aXJlIHRoaXMgYmVjYXVzZSB0aGV5IGRvIGNoYW5nZSBzaXplLlxuICAgIC8vICAgICAgICBBbiBleGFtcGxlIGlzIGEgdGFibGUgaW4gYSBtYXQtdGFiIHRoYXQgaXMgaGlkZGVuLCB0aGUgdGFibGUgd2lsbCBoaXQgdGhlIHJlc2l6ZSBvbmUgd2hlbiB3ZSBmb2N1cyB0aGUgdGFiXG4gICAgLy8gICAgICAgIHdoaWNoIHdpbGwgcmVxdWlyZSBhIHJlc2l6ZSBoYW5kbGluZyBiZWNhdXNlIGl0J3MgaW5pdGlhbCBzaXplIGlzIDBcbiAgICAvLyAgICAgICAgVG8gd29ya2Fyb3VuZCB0aGlzLCB3ZSBvbmx5IHNraXAgZWxlbWVudHMgbm90IHlldCBhZGRlZCB0byB0aGUgRE9NLCB3aGljaCBtZWFucyB0aGV5IHdpbGwgbm90IHRyaWdnZXIgYSByZXNpemUgZXZlbnQuXG4gICAgbGV0IHNraXBWYWx1ZSA9IGRvY3VtZW50LmNvbnRhaW5zKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCkgPyAxIDogMDtcblxuICAgIHJvJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHNraXAoc2tpcFZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSxcbiAgICAgICAgVW5SeCh0aGlzKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChhcmdzOiBbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0pID0+IHtcbiAgICAgICAgaWYgKHNraXBWYWx1ZSA9PT0gMCkge1xuICAgICAgICAgIHNraXBWYWx1ZSA9IDE7XG4gICAgICAgICAgY29uc3QgY29sdW1ucyA9IHRoaXMuX3N0b3JlLmNvbHVtbnM7XG4gICAgICAgICAgY29sdW1ucy5mb3JFYWNoKCBjID0+IGMuc2l6ZUluZm8udXBkYXRlU2l6ZSgpICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblJlc2l6ZShhcmdzWzBdKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblJlc2l6ZShlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgIHRoaXMuX3ZpZXdwb3J0LmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgfVxuICAgIC8vIHRoaXMucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV4dEFwaSgpOiB2b2lkIHtcbiAgICBsZXQgb25Jbml0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IGV4dEFwaSA9IHtcbiAgICAgIHRhYmxlOiB0aGlzLFxuICAgICAgZWxlbWVudDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZ2V0IGNka1RhYmxlKCkgeyByZXR1cm4gZXh0QXBpLnRhYmxlLl9jZGtUYWJsZTsgfSxcbiAgICAgIGdldCBldmVudHMoKSB7IHJldHVybiBleHRBcGkudGFibGUuX3BsdWdpbi5ldmVudHMgfSxcbiAgICAgIGdldCBjb250ZXh0QXBpKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnRleHRBcGknLCB7IHZhbHVlOiBuZXcgQ29udGV4dEFwaTxUPihleHRBcGkpIH0pO1xuICAgICAgICByZXR1cm4gZXh0QXBpLmNvbnRleHRBcGk7XG4gICAgICB9LFxuICAgICAgZ2V0IG1ldGFSb3dTZXJ2aWNlKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21ldGFSb3dTZXJ2aWNlJywgeyB2YWx1ZTogbmV3IFBibE5ncmlkTWV0YVJvd1NlcnZpY2U8VD4oZXh0QXBpKSB9KTtcbiAgICAgICAgcmV0dXJuIGV4dEFwaS5tZXRhUm93U2VydmljZTtcbiAgICAgIH0sXG4gICAgICBvbkluaXQ6IChmbjogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBpZiAoZXh0QXBpLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9uSW5pdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCB1ID0gZXh0QXBpLmV2ZW50cy5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb25Jbml0Rm4gb2Ygb25Jbml0KSB7XG4gICAgICAgICAgICAgICAgICBvbkluaXRGbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgb25Jbml0ID0gdSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uSW5pdC5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbHVtblN0b3JlOiB0aGlzLl9zdG9yZSxcbiAgICAgIHNldFZpZXdwb3J0OiAodmlld3BvcnQpID0+IHRoaXMuX3ZpZXdwb3J0ID0gdmlld3BvcnQsXG4gICAgICBkeW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5OiAoKTogRHluYW1pY0NvbHVtbldpZHRoTG9naWMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZXh0QXBpID0gZXh0QXBpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE5vRGF0YShmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmKSB7XG4gICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9EYXRhID0gdGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLnJlbmRlckxlbmd0aCA9PT0gMDtcbiAgICBpZiAobm9EYXRhKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKCdwYmwtbmdyaWQtZW1wdHknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vRGF0YSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgbm9EYXRhVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgnbm9EYXRhJyk7XG4gICAgICBpZiAobm9EYXRhVGVtcGxhdGUpIHtcbiAgICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50Jywgbm9EYXRhVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gbG9jYXRpb24gPT09ICdiZWZvcmVUYWJsZSdcbiAgICAgID8gdGhpcy5fdmNSZWZCZWZvcmVUYWJsZVxuICAgICAgOiBsb2NhdGlvbiA9PT0gJ2JlZm9yZUNvbnRlbnQnID8gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50IDogdGhpcy5fdmNSZWZBZnRlckNvbnRlbnRcbiAgICA7XG4gIH1cblxuICBwcml2YXRlIHNldHVwUGFnaW5hdG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHBhZ2luYXRpb25LaWxsS2V5ID0gJ3BibFBhZ2luYXRpb25LaWxsS2V5JztcbiAgICBjb25zdCB1c2VQYWdpbmF0aW9uID0gdGhpcy5kcyAmJiB0aGlzLnVzZVBhZ2luYXRpb247XG5cbiAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgdGhpcy5kcy5wYWdpbmF0aW9uID0gdGhpcy5fcGFnaW5hdGlvbjtcbiAgICAgIGlmICh0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJbml0KSB7XG4gICAgICBVblJ4LmtpbGwodGhpcywgcGFnaW5hdGlvbktpbGxLZXkpO1xuICAgICAgaWYgKHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZikge1xuICAgICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgICB0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgICBjb25zdCBwYWdpbmF0b3JUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0U2luZ2xlKCdwYWdpbmF0b3InKTtcbiAgICAgICAgaWYgKHBhZ2luYXRvclRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50JywgcGFnaW5hdG9yVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5fc3RvcmUuY29sdW1ucykge1xuICAgICAgY29uc3QgY2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ3RhYmxlQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBjZWxsICkge1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgndGFibGVDZWxsJyk7XG4gICAgICAgIGNvbC5jZWxsVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHRoaXMuX2ZiVGFibGVDZWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlZGl0b3JDZWxsID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLCAnZWRpdG9yQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBlZGl0b3JDZWxsICkge1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZWRpdG9yQ2VsbC50UmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdENlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdlZGl0b3JDZWxsJyk7XG4gICAgICAgIGNvbC5lZGl0b3JUcGwgPSBkZWZhdWx0Q2VsbFRlbXBsYXRlID8gZGVmYXVsdENlbGxUZW1wbGF0ZS50UmVmIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW5zOiBBcnJheTxQYmxDb2x1bW4gfCBQYmxNZXRhQ29sdW1uU3RvcmU+ID0gW10uY29uY2F0KHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgICBjb25zdCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2hlYWRlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiSGVhZGVyQ2VsbCB9O1xuICAgIGNvbnN0IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZm9vdGVyQ2VsbCcpIHx8IHsgdFJlZjogdGhpcy5fZmJGb290ZXJDZWxsIH07XG4gICAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xuICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbCkpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb25zdCBmb290ZXJDZWxsRGVmID0gZmluZENlbGxEZWY8VD4odGhpcy5yZWdpc3RyeSwgY29sLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgIGNvbC5oZWFkZXJDZWxsVHBsID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICBjb2wuZm9vdGVyQ2VsbFRwbCA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2wuaGVhZGVyKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXIsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuaGVhZGVyLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgICBjb25zdCBoZWFkZXJDZWxsRGVmID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLmhlYWRlckdyb3VwLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlckdyb3VwLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuZm9vdGVyKSB7XG4gICAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5mb290ZXIsICdmb290ZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEZvb3RlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuZm9vdGVyLnRlbXBsYXRlID0gZm9vdGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhlYWRlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd0RlZnMpIHtcbiAgICAgIC8vIFRoZSB0YWJsZSBoZWFkZXIgKG1haW4sIHdpdGggY29sdW1uIG5hbWVzKSBpcyBhbHdheXMgdGhlIGxhc3Qgcm93IGRlZiAoaW5kZXggMClcbiAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCBpdCB0byBzaG93IGxhc3QgKGFmdGVyIGN1c3RvbSBoZWFkZXJzLCBncm91cCBoZWFkZXJzLi4uKSB3ZSBmaXJzdCBuZWVkIHRvIHB1bGwgaXQgYW5kIHRoZW4gcHVzaC5cblxuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgICBjb25zdCBhcnIgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLnRvQXJyYXkoKTtcbiAgICAgIGFyci5wdXNoKGFyci5zaGlmdCgpKTtcblxuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgYXJyKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb290ZXJSb3dEZWZzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMuX2Zvb3RlclJvd0RlZnMudG9BcnJheSgpKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19