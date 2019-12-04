/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PblNgridComponent = /** @class */ (function () {
    function PblNgridComponent(injector, vcRef, elRef, differs, ngZone, cdr, config, registry, id) {
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
        var gridConfig = config.get('table');
        this.showHeader = gridConfig.showHeader;
        this.showFooter = gridConfig.showFooter;
        this.noFiller = gridConfig.noFiller;
        this.initExtApi();
        this.columnApi = ColumnApi.create(this, this._store, this._extApi);
        this.initPlugins(injector, elRef, vcRef);
    }
    PblNgridComponent_1 = PblNgridComponent;
    Object.defineProperty(PblNgridComponent.prototype, "showHeader", {
        /**
         * Show/Hide the header row.
         * Default: true
         */
        get: /**
         * Show/Hide the header row.
         * Default: true
         * @return {?}
         */
        function () { return this._showHeader; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showHeader = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblNgridComponent.prototype, "showFooter", {
        /**
         * Show/Hide the footer row.
         * Default: false
         */
        get: /**
         * Show/Hide the footer row.
         * Default: false
         * @return {?}
         */
        function () { return this._showFooter; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._showFooter = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblNgridComponent.prototype, "noFiller", {
        /**
         * When true, the filler is disabled.
         */
        get: /**
         * When true, the filler is disabled.
         * @return {?}
         */
        function () { return this._noFiller; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._noFiller = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblNgridComponent.prototype, "identityProp", {
        /// TODO(shlomiassaf): Remove in 1.0.0
        /**
         * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
         */
        get: 
        /// TODO(shlomiassaf): Remove in 1.0.0
        /**
         * @deprecated Use `pIndex` in the column definition. (Removed in 1.0.0)
         * @return {?}
         */
        function () { return this.__identityProp; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.__identityProp = value; setIdentityProp(this._store, value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "dataSource", {
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
        set: /**
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
        function (value) {
            if (value instanceof PblDataSource) {
                this.setDataSource(value);
            }
            else {
                this.setDataSource(createDS().onTrigger((/**
                 * @return {?}
                 */
                function () { return value || []; })).create());
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "ds", {
        get: /**
         * @return {?}
         */
        function () { return this._dataSource; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblNgridComponent.prototype, "usePagination", {
        get: /**
         * @return {?}
         */
        function () { return this._pagination; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (((/** @type {?} */ (value))) === '') {
                value = 'pageNumber';
            }
            if (value !== this._pagination) {
                this._pagination = value;
                this.setupPaginator();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "noCachePaginator", {
        get: /**
         * @return {?}
         */
        function () { return this._noCachePaginator; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (this._noCachePaginator !== value) {
                this._noCachePaginator = value;
                if (this.ds && this.ds.paginator) {
                    this.ds.paginator.noCacheMode = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "hideColumns", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hideColumns = value;
            this._hideColumnsDirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "fallbackMinHeight", {
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
        get: /**
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
        function () { return this._fallbackMinHeight; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceNumberProperty(value);
            if (this._fallbackMinHeight !== value) {
                this._fallbackMinHeight = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "metaColumnIds", {
        get: /**
         * @return {?}
         */
        function () { return this._store.metaColumnIds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "metaColumns", {
        get: /**
         * @return {?}
         */
        function () { return this._store.metaColumns; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "columnRowDef", {
        get: /**
         * @return {?}
         */
        function () { return { header: this._store.headerColumnDef, footer: this._store.footerColumnDef }; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "contextApi", {
        get: /**
         * @return {?}
         */
        function () { return this._extApi.contextApi; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridComponent.prototype, "viewport", {
        get: /**
         * @return {?}
         */
        function () { return this._viewport; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this._hideColumnsDirty) {
            this._hideColumnsDirty = false;
            /** @type {?} */
            var value = this._hideColumns;
            if (!this._colHideDiffer && value) {
                try {
                    this._colHideDiffer = this.differs.find(value).create();
                }
                catch (e) {
                    throw new Error("Cannot find a differ supporting object '" + value + ". hideColumns only supports binding to Iterables such as Arrays.");
                }
            }
        }
        if (this._colHideDiffer) {
            /** @type {?} */
            var hideColumns = this._hideColumns || [];
            /** @type {?} */
            var changes = this._colHideDiffer.diff(hideColumns);
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
    };
    /**
     * @return {?}
     */
    PblNgridComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // no need to unsubscribe, the reg service is per grid instance and it will destroy when this grid destroy.
        // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
        // the order here is very important, because component top of this grid will fire life cycle hooks AFTER this component
        // so if we have a top level component registering a template on top it will not show unless we listen.
        this.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var e_1, _a;
            /** @type {?} */
            var gridCell = false;
            /** @type {?} */
            var headerFooterCell = false;
            try {
                for (var changes_1 = tslib_1.__values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var c = changes_1_1.value;
                    switch (c.type) {
                        case 'tableCell':
                            gridCell = true;
                            break;
                        case 'headerCell':
                        case 'footerCell':
                            headerFooterCell = true;
                            break;
                        case 'noData':
                            _this.setupNoData();
                            break;
                        case 'paginator':
                            _this.setupPaginator();
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (gridCell) {
                _this.attachCustomCellTemplates();
            }
            if (headerFooterCell) {
                _this.attachCustomHeaderCellTemplates();
            }
        }));
    };
    /**
     * @return {?}
     */
    PblNgridComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.invalidateColumns();
        Object.defineProperty(this, 'isInit', { value: true });
        this._plugin.emitEvent({ kind: 'onInit' });
        this.setupPaginator();
        // Adding a div before the footer row view reference, this div will be used to fill up the space between header & footer rows
        /** @type {?} */
        var div = document.createElement('div');
        div.classList.add('pbl-ngrid-empty-spacer');
        this._cdkTable._element.insertBefore(div, this._cdkTable._footerRowOutlet.elementRef.nativeElement);
        this.listenToResize();
        // The following code will catch context focused events, find the HTML element of the cell and focus it.
        this.contextApi.focusChanged
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.curr) {
                /** @type {?} */
                var rowContext = _this.contextApi.findRowInView(event.curr.rowIdent);
                if (rowContext) {
                    /** @type {?} */
                    var view = (/** @type {?} */ (_this._cdkTable._rowOutlet.viewContainer.get(rowContext.index)));
                    if (view) {
                        /** @type {?} */
                        var cellViewIndex = _this.columnApi.renderIndexOf(_this.columnApi.columns[event.curr.colIndex]);
                        /** @type {?} */
                        var cellElement = view.rootNodes[0].querySelectorAll('pbl-ngrid-cell')[cellViewIndex];
                        if (cellElement) {
                            cellElement.focus();
                        }
                    }
                }
            }
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PblNgridComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        /** @type {?} */
        var processColumns = false;
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
    };
    /**
     * @return {?}
     */
    PblNgridComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var destroy = (/**
         * @return {?}
         */
        function () {
            _this._plugin.destroy();
            if (_this._viewport) {
                _this._cdkTable.detachViewPort();
            }
        });
        /** @type {?} */
        var p;
        this._plugin.emitEvent({ kind: 'onDestroy', wait: (/**
             * @param {?} _p
             * @return {?}
             */
            function (_p) { return p = _p; }) });
        if (p) {
            p.then(destroy).catch(destroy);
        }
        else {
            destroy();
        }
    };
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    PblNgridComponent.prototype.trackBy = /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    function (index, item) {
        return index;
    };
    /**
     * @param {?=} columnOrSortAlias
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    PblNgridComponent.prototype.setSort = /**
     * @param {?=} columnOrSortAlias
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    function (columnOrSortAlias, sort, skipUpdate) {
        if (skipUpdate === void 0) { skipUpdate = false; }
        if (!columnOrSortAlias || typeof columnOrSortAlias === 'boolean') {
            this.ds.setSort(!!columnOrSortAlias);
            return;
        }
        /** @type {?} */
        var column;
        if (typeof columnOrSortAlias === 'string') {
            column = this._store.columns.find((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.alias ? c.alias === columnOrSortAlias : (c.sort && c.id === columnOrSortAlias); }));
            if (!column && isDevMode()) {
                console.warn("Could not find column with alias \"" + columnOrSortAlias + "\".");
                return;
            }
        }
        else {
            column = columnOrSortAlias;
        }
        this.ds.setSort(column, sort, skipUpdate);
    };
    /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    PblNgridComponent.prototype.setFilter = /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    function (value, columns) {
        var e_2, _a;
        if (arguments.length > 0) {
            /** @type {?} */
            var columnInstances = void 0;
            if (Array.isArray(columns) && typeof columns[0] === 'string') {
                columnInstances = [];
                var _loop_1 = function (colId) {
                    /** @type {?} */
                    var column = this_1._store.columns.find((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return c.alias ? c.alias === colId : (c.id === colId); }));
                    if (!column && isDevMode()) {
                        console.warn("Could not find column with alias " + colId + " \"" + colId + "\".");
                        return { value: void 0 };
                    }
                    columnInstances.push(column);
                };
                var this_1 = this;
                try {
                    for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                        var colId = columns_1_1.value;
                        var state_1 = _loop_1(colId);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
                    }
                    finally { if (e_2) throw e_2.error; }
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
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PblNgridComponent.prototype.setDataSource = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        if (this._dataSource !== value) {
            // KILL ALL subscriptions for the previous datasource.
            if (this._dataSource) {
                UnRx.kill(this, this._dataSource);
            }
            /** @type {?} */
            var prev = this._dataSource;
            this._dataSource = value;
            this._cdkTable.dataSource = (/** @type {?} */ (value));
            this.setupPaginator();
            this.setupNoData(false);
            // clear the context, new datasource
            this._extApi.contextApi.clear();
            this._plugin.emitEvent({
                kind: 'onDataSource',
                prev: prev,
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
                function () { return _this._extApi.contextApi.clear(); }));
                // Run CD, scheduled as a micro-task, after each rendering
                value.onRenderDataChanging
                    .pipe(filter((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var event = _a.event;
                    return !event.isInitial && (event.pagination.changed || event.sort.changed || event.filter.changed);
                })), 
                // Context between the operations are not supported at the moment
                // Event for client side operations...
                // TODO: can we remove this? we clear the context with `onSourceChanging`
                tap((/**
                 * @return {?}
                 */
                function () { return !_this._store.primary && _this._extApi.contextApi.clear(); })), switchMap((/**
                 * @return {?}
                 */
                function () { return value.onRenderedDataChanged.pipe(take(1), mapTo(_this.ds.renderLength)); })), observeOn(asapScheduler), UnRx(this, value))
                    .subscribe((/**
                 * @param {?} previousRenderLength
                 * @return {?}
                 */
                function (previousRenderLength) {
                    // If the number of rendered items has changed the grid will update the data and run CD on it.
                    // so we only update the rows.
                    var cdkTable = _this._extApi.cdkTable;
                    if (previousRenderLength === _this.ds.renderLength) {
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
                function () { return _this.ds.renderLength; })), startWith(null), pairwise(), tap((/**
                 * @param {?} __0
                 * @return {?}
                 */
                function (_a) {
                    var _b = tslib_1.__read(_a, 2), prev = _b[0], curr = _b[1];
                    /** @type {?} */
                    var noDataShowing = !!_this._noDateEmbeddedVRef;
                    if ((curr > 0 && noDataShowing) || (curr === 0 && !noDataShowing)) {
                        _this.setupNoData();
                    }
                })), observeOn(animationFrameScheduler), // ww want to give the browser time to remove/add rows
                UnRx(this, value))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var el = _this.viewport.elementRef.nativeElement;
                    if (_this.ds.renderLength > 0 && _this._fallbackMinHeight > 0) {
                        /** @type {?} */
                        var h = Math.min(_this._fallbackMinHeight, _this.viewport.measureRenderedContentSize());
                        el.style.minHeight = h + 'px';
                    }
                    else {
                        el.style.minHeight = _this.viewport.enabled ? null : _this.viewport.measureRenderedContentSize() + 'px';
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
    };
    /**
     * Invalidates the header, including a full rebuild of column headers
     */
    /**
     * Invalidates the header, including a full rebuild of column headers
     * @return {?}
     */
    PblNgridComponent.prototype.invalidateColumns = /**
     * Invalidates the header, including a full rebuild of column headers
     * @return {?}
     */
    function () {
        this._plugin.emitEvent({ kind: 'beforeInvalidateHeaders' });
        /** @type {?} */
        var rebuildRows = this._store.allColumns.length > 0;
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
    };
    /**
     * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     */
    /**
     * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @return {?}
     */
    PblNgridComponent.prototype.resetColumnsWidth = /**
     * Updates the column sizes for all columns in the grid based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @return {?}
     */
    function () {
        resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
    };
    /**
     * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
     * @param dynamicWidthLogic - Optional logic container, if not set a new one is created.
     */
    /**
     * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
     * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
     * @return {?}
     */
    PblNgridComponent.prototype.syncColumnGroupsSize = /**
     * Update the size of all group columns in the grid based on the size of their visible children (not hidden).
     * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
     * @return {?}
     */
    function (dynamicWidthLogic) {
        var e_3, _a;
        if (!dynamicWidthLogic) {
            dynamicWidthLogic = this._extApi.dynamicColumnWidthFactory();
        }
        var _loop_2 = function (g) {
            // We go over all columns because g.columns does not represent the current owned columns of the group
            // it is static, representing the initial state.
            // Only columns hold their group owners.
            // TODO: find way to improve iteration
            /** @type {?} */
            var colSizeInfos = this_2._store.columns.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return !c.hidden && c.isInGroup(g); })).map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.sizeInfo; }));
            if (colSizeInfos.length > 0) {
                /** @type {?} */
                var groupWidth = dynamicWidthLogic.addGroup(colSizeInfos);
                g.minWidth = groupWidth;
                g.updateWidth(groupWidth + "px");
            }
            else {
                g.minWidth = undefined;
                g.updateWidth("0px");
            }
        };
        var this_2 = this;
        try {
            // From all meta columns (header/footer/headerGroup) we filter only `headerGroup` columns.
            // For each we calculate it's width from all of the columns that the headerGroup "groups".
            // We use the same strategy and the same RowWidthDynamicAggregator instance which will prevent duplicate calculations.
            // Note that we might have multiple header groups, i.e. same columns on multiple groups with different row index.
            for (var _b = tslib_1.__values(this._store.getAllHeaderGroup()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var g = _c.value;
                _loop_2(g);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    /**
     * @param {?=} columns
     * @return {?}
     */
    PblNgridComponent.prototype.resizeColumns = /**
     * @param {?=} columns
     * @return {?}
     */
    function (columns) {
        var _this = this;
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
        var rowWidth = this._extApi.dynamicColumnWidthFactory();
        this.syncColumnGroupsSize(rowWidth);
        // if this is a grid without groups
        if (rowWidth.minimumRowWidth === 0) {
            rowWidth.addGroup(columns.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.sizeInfo; })));
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
        function () {
            _this._cdkTable.syncRows('header');
            _this._plugin.emitEvent({ kind: 'onResizeRow' });
        }));
    };
    /**
     * Create an embedded view before or after the user projected content.
     */
    /**
     * Create an embedded view before or after the user projected content.
     * @template C
     * @param {?} location
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    PblNgridComponent.prototype.createView = /**
     * Create an embedded view before or after the user projected content.
     * @template C
     * @param {?} location
     * @param {?} templateRef
     * @param {?=} context
     * @param {?=} index
     * @return {?}
     */
    function (location, templateRef, context, index) {
        /** @type {?} */
        var vcRef = this.getInternalVcRef(location);
        /** @type {?} */
        var view = vcRef.createEmbeddedView(templateRef, context, index);
        view.detectChanges();
        return view;
    };
    /**
     * Remove an already created embedded view.
     * @param view - The view to remove
     * @param location - The location, if not set defaults to `before`
     * @returns true when a view was removed, false when not. (did not exist in the view container for the provided location)
     */
    /**
     * Remove an already created embedded view.
     * @param {?} view - The view to remove
     * @param {?} location - The location, if not set defaults to `before`
     * @return {?} true when a view was removed, false when not. (did not exist in the view container for the provided location)
     */
    PblNgridComponent.prototype.removeView = /**
     * Remove an already created embedded view.
     * @param {?} view - The view to remove
     * @param {?} location - The location, if not set defaults to `before`
     * @return {?} true when a view was removed, false when not. (did not exist in the view container for the provided location)
     */
    function (view, location) {
        /** @type {?} */
        var vcRef = this.getInternalVcRef(location);
        /** @type {?} */
        var idx = vcRef.indexOf(view);
        if (idx === -1) {
            return false;
        }
        else {
            vcRef.remove(idx);
            return true;
        }
    };
    /**
     * Resize all visible columns to fit content of the grid.
     * @param forceFixedWidth - When true will resize all columns with absolute pixel values, otherwise will keep the same format as originally set (% or none)
     */
    /**
     * Resize all visible columns to fit content of the grid.
     * @param {?=} options
     * @return {?}
     */
    PblNgridComponent.prototype.autoSizeColumnToFit = /**
     * Resize all visible columns to fit content of the grid.
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        var _a = this.viewport, innerWidth = _a.innerWidth, outerWidth = _a.outerWidth;
        // calculate auto-size on the width without scroll bar and take box model gaps into account
        // TODO: if no scroll bar exists the calc will not include it, next if more rows are added a scroll bar will appear...
        this.columnApi.autoSizeToFit(outerWidth - (outerWidth - innerWidth), options);
    };
    /**
     * @return {?}
     */
    PblNgridComponent.prototype.findInitialRowHeight = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var rowElement;
        if (this._cdkTable._rowOutlet.viewContainer.length) {
            /** @type {?} */
            var viewRef = (/** @type {?} */ (this._cdkTable._rowOutlet.viewContainer.get(0)));
            rowElement = viewRef.rootNodes[0];
            /** @type {?} */
            var height = getComputedStyle(rowElement).height;
            return parseInt(height, 10);
        }
        else if (this._vcRefBeforeContent) {
            rowElement = this._vcRefBeforeContent.length > 0
                ? ((/** @type {?} */ (this._vcRefBeforeContent.get(this._vcRefBeforeContent.length - 1)))).rootNodes[0]
                : this._vcRefBeforeContent.element.nativeElement;
            rowElement = (/** @type {?} */ (rowElement.nextElementSibling));
            rowElement.style.display = '';
            /** @type {?} */
            var height = getComputedStyle(rowElement).height;
            rowElement.style.display = 'none';
            return parseInt(height, 10);
        }
    };
    /**
     * @param {...?} cls
     * @return {?}
     */
    PblNgridComponent.prototype.addClass = /**
     * @param {...?} cls
     * @return {?}
     */
    function () {
        var e_4, _a;
        var cls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cls[_i] = arguments[_i];
        }
        try {
            for (var cls_1 = tslib_1.__values(cls), cls_1_1 = cls_1.next(); !cls_1_1.done; cls_1_1 = cls_1.next()) {
                var c = cls_1_1.value;
                this.elRef.nativeElement.classList.add(c);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (cls_1_1 && !cls_1_1.done && (_a = cls_1.return)) _a.call(cls_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    /**
     * @param {...?} cls
     * @return {?}
     */
    PblNgridComponent.prototype.removeClass = /**
     * @param {...?} cls
     * @return {?}
     */
    function () {
        var e_5, _a;
        var cls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cls[_i] = arguments[_i];
        }
        try {
            for (var cls_2 = tslib_1.__values(cls), cls_2_1 = cls_2.next(); !cls_2_1.done; cls_2_1 = cls_2.next()) {
                var c = cls_2_1.value;
                this.elRef.nativeElement.classList.remove(c);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (cls_2_1 && !cls_2_1.done && (_a = cls_2.return)) _a.call(cls_2);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    /**
     * @private
     * @param {?} injector
     * @param {?} elRef
     * @param {?} vcRef
     * @return {?}
     */
    PblNgridComponent.prototype.initPlugins = /**
     * @private
     * @param {?} injector
     * @param {?} elRef
     * @param {?} vcRef
     * @return {?}
     */
    function (injector, elRef, vcRef) {
        // Create an injector for the extensions/plugins
        // This injector allow plugins (that choose so) to provide a factory function for runtime use.
        // I.E: as if they we're created by angular via template...
        // This allows seamless plugin-to-plugin dependencies without requiring specific template syntax.
        // And also allows auto plugin binding (app wide) without the need for template syntax.
        /** @type {?} */
        var pluginInjector = Injector.create({
            providers: [
                { provide: ViewContainerRef, useValue: vcRef },
                { provide: ElementRef, useValue: elRef },
                { provide: ChangeDetectorRef, useValue: this.cdr },
            ],
            parent: injector,
        });
        this._plugin = PblNgridPluginContext.create(this, pluginInjector, this._extApi);
        bindToDataSource(this._plugin);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.listenToResize = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var resizeObserver;
        /** @type {?} */
        var ro$ = fromEventPattern((/**
         * @param {?} handler
         * @return {?}
         */
        function (handler) {
            if (!resizeObserver) {
                resizeObserver = new ResizeObserver(handler);
                resizeObserver.observe(_this.elRef.nativeElement);
            }
        }), (/**
         * @param {?} handler
         * @return {?}
         */
        function (handler) {
            if (resizeObserver) {
                resizeObserver.unobserve(_this.elRef.nativeElement);
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
        var skipValue = document.body.contains(this.elRef.nativeElement) ? 1 : 0;
        ro$
            .pipe(skip(skipValue), debounceTime(0, animationFrameScheduler), UnRx(this))
            .subscribe((/**
         * @param {?} args
         * @return {?}
         */
        function (args) {
            if (skipValue === 0) {
                skipValue = 1;
                /** @type {?} */
                var columns = _this._store.columns;
                columns.forEach((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.sizeInfo.updateSize(); }));
            }
            _this.onResize(args[0]);
        }));
    };
    /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    PblNgridComponent.prototype.onResize = /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        if (this._viewport) {
            this._viewport.checkViewportSize();
        }
        // this.resetColumnsWidth();
        this.resizeColumns();
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.initExtApi = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var onInit = [];
        /** @type {?} */
        var extApi = {
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
            function (fn) {
                if (extApi.grid.isInit) {
                    fn();
                }
                else {
                    if (onInit.length === 0) {
                        /** @type {?} */
                        var u_1 = extApi.events.subscribe((/**
                         * @param {?} e
                         * @return {?}
                         */
                        function (e) {
                            var e_6, _a;
                            if (e.kind === 'onInit') {
                                try {
                                    for (var onInit_1 = tslib_1.__values(onInit), onInit_1_1 = onInit_1.next(); !onInit_1_1.done; onInit_1_1 = onInit_1.next()) {
                                        var onInitFn = onInit_1_1.value;
                                        onInitFn();
                                    }
                                }
                                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                finally {
                                    try {
                                        if (onInit_1_1 && !onInit_1_1.done && (_a = onInit_1.return)) _a.call(onInit_1);
                                    }
                                    finally { if (e_6) throw e_6.error; }
                                }
                                u_1.unsubscribe();
                                onInit = u_1 = undefined;
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
            function (viewport) { return _this._viewport = viewport; }),
            dynamicColumnWidthFactory: (/**
             * @return {?}
             */
            function () {
                return new DynamicColumnWidthLogic(DYNAMIC_PADDING_BOX_MODEL_SPACE_STRATEGY);
            })
        };
        this._extApi = extApi;
    };
    /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    PblNgridComponent.prototype.setupNoData = /**
     * @private
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (this._noDateEmbeddedVRef) {
            this.removeView(this._noDateEmbeddedVRef, 'beforeContent');
            this._noDateEmbeddedVRef = undefined;
        }
        if (force === false) {
            return;
        }
        /** @type {?} */
        var noData = this._dataSource && this._dataSource.renderLength === 0;
        if (noData) {
            this.addClass('pbl-ngrid-empty');
        }
        else {
            this.removeClass('pbl-ngrid-empty');
        }
        if (noData || force === true) {
            /** @type {?} */
            var noDataTemplate = this.registry.getSingle('noData');
            if (noDataTemplate) {
                this._noDateEmbeddedVRef = this.createView('beforeContent', noDataTemplate.tRef, { $implicit: this }, 0);
            }
        }
    };
    /**
     * @private
     * @param {?} location
     * @return {?}
     */
    PblNgridComponent.prototype.getInternalVcRef = /**
     * @private
     * @param {?} location
     * @return {?}
     */
    function (location) {
        return location === 'beforeTable'
            ? this._vcRefBeforeTable
            : location === 'beforeContent' ? this._vcRefBeforeContent : this._vcRefAfterContent;
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.setupPaginator = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var paginationKillKey = 'pblPaginationKillKey';
        /** @type {?} */
        var usePagination = this.ds && this.usePagination;
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
                var paginatorTemplate = this.registry.getSingle('paginator');
                if (paginatorTemplate) {
                    this._paginatorEmbeddedVRef = this.createView('beforeContent', paginatorTemplate.tRef, { $implicit: this });
                }
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.attachCustomCellTemplates = /**
     * @private
     * @return {?}
     */
    function () {
        var e_7, _a;
        try {
            for (var _b = tslib_1.__values(this._store.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var col = _c.value;
                /** @type {?} */
                var cell = findCellDef(this.registry, col, 'tableCell', true);
                if (cell) {
                    col.cellTpl = cell.tRef;
                }
                else {
                    /** @type {?} */
                    var defaultCellTemplate = this.registry.getMultiDefault('tableCell');
                    col.cellTpl = defaultCellTemplate ? defaultCellTemplate.tRef : this._fbTableCell;
                }
                /** @type {?} */
                var editorCell = findCellDef(this.registry, col, 'editorCell', true);
                if (editorCell) {
                    col.editorTpl = editorCell.tRef;
                }
                else {
                    /** @type {?} */
                    var defaultCellTemplate = this.registry.getMultiDefault('editorCell');
                    col.editorTpl = defaultCellTemplate ? defaultCellTemplate.tRef : undefined;
                }
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.attachCustomHeaderCellTemplates = /**
     * @private
     * @return {?}
     */
    function () {
        var e_8, _a;
        /** @type {?} */
        var columns = [].concat(this._store.columns, this._store.metaColumns);
        /** @type {?} */
        var defaultHeaderCellTemplate = this.registry.getMultiDefault('headerCell') || { tRef: this._fbHeaderCell };
        /** @type {?} */
        var defaultFooterCellTemplate = this.registry.getMultiDefault('footerCell') || { tRef: this._fbFooterCell };
        try {
            for (var columns_2 = tslib_1.__values(columns), columns_2_1 = columns_2.next(); !columns_2_1.done; columns_2_1 = columns_2.next()) {
                var col = columns_2_1.value;
                if (isPblColumn(col)) {
                    /** @type {?} */
                    var headerCellDef = findCellDef(this.registry, col, 'headerCell', true) || defaultHeaderCellTemplate;
                    /** @type {?} */
                    var footerCellDef = findCellDef(this.registry, col, 'footerCell', true) || defaultFooterCellTemplate;
                    col.headerCellTpl = headerCellDef.tRef;
                    col.footerCellTpl = footerCellDef.tRef;
                }
                else {
                    if (col.header) {
                        /** @type {?} */
                        var headerCellDef = findCellDef(this.registry, col.header, 'headerCell', true) || defaultHeaderCellTemplate;
                        col.header.template = headerCellDef.tRef;
                    }
                    if (col.headerGroup) {
                        /** @type {?} */
                        var headerCellDef = findCellDef(this.registry, col.headerGroup, 'headerCell', true) || defaultHeaderCellTemplate;
                        col.headerGroup.template = headerCellDef.tRef;
                    }
                    if (col.footer) {
                        /** @type {?} */
                        var footerCellDef = findCellDef(this.registry, col.footer, 'footerCell', true) || defaultFooterCellTemplate;
                        col.footer.template = footerCellDef.tRef;
                    }
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (columns_2_1 && !columns_2_1.done && (_a = columns_2.return)) _a.call(columns_2);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.resetHeaderRowDefs = /**
     * @private
     * @return {?}
     */
    function () {
        var e_9, _a;
        if (this._headerRowDefs) {
            // The grid header (main, with column names) is always the last row def (index 0)
            // Because we want it to show last (after custom headers, group headers...) we first need to pull it and then push.
            this._cdkTable.clearHeaderRowDefs();
            /** @type {?} */
            var arr = this._headerRowDefs.toArray();
            arr.push(arr.shift());
            try {
                for (var arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                    var rowDef = arr_1_1.value;
                    this._cdkTable.addHeaderRowDef(rowDef);
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
                }
                finally { if (e_9) throw e_9.error; }
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridComponent.prototype.resetFooterRowDefs = /**
     * @private
     * @return {?}
     */
    function () {
        var e_10, _a;
        if (this._footerRowDefs) {
            this._cdkTable.clearFooterRowDefs();
            try {
                for (var _b = tslib_1.__values(this._footerRowDefs.toArray()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var rowDef = _c.value;
                    this._cdkTable.addFooterRowDef(rowDef);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
        }
    };
    var PblNgridComponent_1;
    PblNgridComponent.ctorParameters = function () { return [
        { type: Injector },
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: IterableDiffers },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: PblNgridConfigService },
        { type: PblNgridRegistryService },
        { type: String }
    ]; };
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
                                function () { return PblNgridComponent_1; }))],
                        },
                        {
                            provide: EXT_API_TOKEN,
                            useFactory: internalApiFactory,
                            deps: [forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return PblNgridComponent_1; }))],
                        },
                        {
                            provide: PblNgridMetaRowService,
                            useFactory: metaRowServiceFactory,
                            deps: [forwardRef((/**
                                 * @return {?}
                                 */
                                function () { return PblNgridComponent_1; }))],
                        }
                    ],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["pbl-ngrid{display:block}.pbl-ngrid-row-visually-hidden{border-top:0;border-bottom:0;clip:rect(0 0 0 0);height:0;min-height:0;max-height:0;overflow:hidden!important;visibility:collapse!important;outline:0;-webkit-appearance:none;-moz-appearance:none}.pbl-ngrid-row-hidden{display:none!important}.pbl-ngrid-container{position:relative;height:100%;width:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;box-sizing:border-box;display:-webkit-box;display:flex;overflow:auto;min-height:inherit}.pbl-ngrid-scroll-container{-webkit-box-flex:1;flex:1 1 auto;box-sizing:border-box;min-height:auto}.pbl-ngrid-scroll-container.cdk-virtual-scroll-disabled{-webkit-box-flex:1;flex:1 0 auto}.pbl-ngrid-sticky-row-scroll-container{position:fixed;overflow:hidden}.pbl-ngrid-empty-spacer{display:none}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper{min-height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 1 100%}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>*{-webkit-box-flex:0;flex:0 0 auto}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>.pbl-ngrid-empty-spacer{display:block;-webkit-box-flex:1;flex:1 1 auto}.pbl-ngrid-scrolling pbl-cdk-table{pointer-events:none}"]
                }] }
    ];
    /** @nocollapse */
    PblNgridComponent.ctorParameters = function () { return [
        { type: Injector },
        { type: ViewContainerRef },
        { type: ElementRef },
        { type: IterableDiffers },
        { type: NgZone },
        { type: ChangeDetectorRef },
        { type: PblNgridConfigService },
        { type: PblNgridRegistryService },
        { type: String, decorators: [{ type: Attribute, args: ['id',] }] }
    ]; };
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
    return PblNgridComponent;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5SCxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFFBQVEsRUFDUix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULGFBQWEsRUFDYixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUMzRSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxF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T0ExTXpDLGlCQUFpQixDQWs5QjdCO0lBQUQsd0JBQUM7Q0FBQSxJQUFBO1NBbDlCWSxpQkFBaUI7OztJQVU1Qix3Q0FBcUI7O0lBVXJCLHdDQUFxQjs7SUFTckIsc0NBQW1COzs7Ozs7Ozs7SUFTbkIsc0NBQXFFOzs7OztJQVFyRSwyQ0FBK0I7Ozs7O0lBcUUvQixvQ0FBa0U7O0lBb0NsRSwyQ0FBMkk7O0lBQzNJLCtDQUFvRTs7SUFFcEUscUNBQXNCOztJQUN0QixzQ0FBdUI7Ozs7O0lBRXZCLCtDQUErQjs7Ozs7SUFDL0Isd0NBQXNDOztJQUV0Qyw4Q0FBd0c7O0lBQ3hHLGdEQUE0Rzs7SUFDNUcsK0NBQTBHOztJQUMxRyx5Q0FBaUg7O0lBQ2pILDBDQUF1SDs7SUFDdkgsMENBQXVIOztJQUN2SCx5Q0FBbUU7O0lBQ25FLDJDQUEwRTs7SUFDMUUsMkNBQTBFOzs7OztJQVExRSxtQ0FBeUI7O0lBQ3pCLHNDQUFpQzs7SUFLakMsc0NBQW1DOzs7OztJQUNuQyxtQ0FBc0Q7Ozs7O0lBQ3RELDhDQUFtQzs7Ozs7SUFDbkMseUNBQStCOzs7OztJQUMvQiwyQ0FBK0M7Ozs7O0lBQy9DLGdEQUFrRDs7Ozs7SUFDbEQsbURBQXFEOzs7OztJQUNyRCx3Q0FBbUQ7Ozs7O0lBQ25ELDhDQUFrQzs7Ozs7SUFDbEMsNkNBQWlDOzs7OztJQUNqQyxzQ0FBeUQ7Ozs7O0lBQ3pELG9DQUF1Qzs7Ozs7SUFDdkMsb0NBQXlDOzs7OztJQUc3QixrQ0FBc0M7Ozs7O0lBQ3RDLG9DQUFnQzs7Ozs7SUFDaEMsbUNBQXNCOzs7OztJQUN0QixnQ0FBOEI7Ozs7O0lBQzlCLG1DQUFxQzs7SUFDckMscUNBQXdDOztJQUN4QywrQkFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCB7IGFzYXBTY2hlZHVsZXIsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBmcm9tRXZlbnRQYXR0ZXJuIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UsIHRhcCwgb2JzZXJ2ZU9uLCBzd2l0Y2hNYXAsIG1hcCwgbWFwVG8sIHN0YXJ0V2l0aCwgcGFpcndpc2UsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdG9yLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgTmdab25lLFxuICBpc0Rldk1vZGUsIGZvcndhcmRSZWYsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIERvQ2hlY2ssIEF0dHJpYnV0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrSGVhZGVyUm93RGVmLCBDZGtGb290ZXJSb3dEZWYsIENka1Jvd0RlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRQbHVnaW5Db250ZXh0IH0gZnJvbSAnLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkUGFnaW5hdG9yS2luZCB9IGZyb20gJy4uL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBEYXRhU291cmNlUHJlZGljYXRlLCBEYXRhU291cmNlRmlsdGVyVG9rZW4sIFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibERhdGFTb3VyY2UsIERhdGFTb3VyY2VPZiwgY3JlYXRlRFMgfSBmcm9tICcuLi9kYXRhLXNvdXJjZS9pbmRleCc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4vcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyByZXNldENvbHVtbldpZHRocyB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgZmluZENlbGxEZWYgfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2VsbC1kZWYnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBQYmxDb2x1bW5TdG9yZSwgUGJsTWV0YUNvbHVtblN0b3JlLCBQYmxOZ3JpZENvbHVtblNldCwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LCBpc1BibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgQ29udGV4dEFwaSwgUGJsTmdyaWRDb250ZXh0QXBpLCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYywgRFlOQU1JQ19QQURESU5HX0JPWF9NT0RFTF9TUEFDRV9TVFJBVEVHWSB9IGZyb20gJy4vY29sLXdpZHRoLWxvZ2ljL2R5bmFtaWMtY29sdW1uLXdpZHRoJztcbmltcG9ydCB7IENvbHVtbkFwaSwgQXV0b1NpemVUb0ZpdE9wdGlvbnMgfSBmcm9tICcuL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3dzL2luZGV4JztcblxuaW1wb3J0IHsgYmluZFRvRGF0YVNvdXJjZSB9IGZyb20gJy4vYmluZC10by1kYXRhc291cmNlJztcbmltcG9ydCAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnOyAvLyBMRUFWRSBUSElTLCBXRSBORUVEIElUIFNPIFRIRSBBVUdNRU5UQVRJT04gSU4gVEhFIEZJTEUgV0lMTCBMT0FELlxuXG5pbXBvcnQgeyBzZXRJZGVudGl0eVByb3AgfSBmcm9tICcuL25ncmlkLmRlcHJlY2F0ZS1hdC0xLjAuMCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcm5hbEFwaUZhY3RvcnkoZ3JpZDogeyBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTsgfSkgeyByZXR1cm4gZ3JpZC5fZXh0QXBpOyB9XG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luQ29udHJvbGxlckZhY3RvcnkoZ3JpZDogeyBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7IH0pIHsgcmV0dXJuIGdyaWQuX3BsdWdpbi5jb250cm9sbGVyOyB9XG5leHBvcnQgZnVuY3Rpb24gbWV0YVJvd1NlcnZpY2VGYWN0b3J5KGdyaWQ6IHsgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7IH0pIHsgcmV0dXJuIGdyaWQuX2V4dEFwaS5tZXRhUm93U2VydmljZTsgfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmdyaWQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vbmdyaWQuY29tcG9uZW50LnNjc3MnIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgIHVzZUZhY3Rvcnk6IHBsdWdpbkNvbnRyb2xsZXJGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEVYVF9BUElfVE9LRU4sXG4gICAgICB1c2VGYWN0b3J5OiBpbnRlcm5hbEFwaUZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogUGJsTmdyaWRNZXRhUm93U2VydmljZSxcbiAgICAgIHVzZUZhY3Rvcnk6IG1ldGFSb3dTZXJ2aWNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb21wb25lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgLyoqXG4gICAqIFNob3cvSGlkZSB0aGUgaGVhZGVyIHJvdy5cbiAgICogRGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93SGVhZGVyOyB9O1xuICBzZXQgc2hvd0hlYWRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dIZWFkZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaG93L0hpZGUgdGhlIGZvb3RlciByb3cuXG4gICAqIERlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBASW5wdXQoKSBnZXQgc2hvd0Zvb3RlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dGb290ZXI7IH07XG4gIHNldCBzaG93Rm9vdGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0Zvb3RlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3Nob3dGb290ZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgdGhlIGZpbGxlciBpcyBkaXNhYmxlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBub0ZpbGxlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vRmlsbGVyOyB9O1xuICBzZXQgbm9GaWxsZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ub0ZpbGxlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX25vRmlsbGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTZXQncyB0aGUgYmVoYXZpb3Igb2YgdGhlIGdyaWQgd2hlbiB0YWJiaW5nLlxuICAgKiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyBub25lIChyb3dzIGFuZCBjZWxscyBhcmUgbm90IGZvY3VzYWJsZSlcbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBmb2N1cyBtb2RlIGhhcyBhbiBlZmZlY3Qgb24gb3RoZXIgZnVuY3Rpb25zLCBmb3IgZXhhbXBsZSBhIGRldGFpbCByb3cgd2lsbCB0b2dnbGUgKG9wZW4vY2xvc2UpIHVzaW5nXG4gICAqIEVOVEVSIC8gU1BBQ0Ugb25seSB3aGVuIGZvY3VzTW9kZSBpcyBzZXQgdG8gYHJvd2AuXG4gICAqL1xuICBASW5wdXQoKSBmb2N1c01vZGU6ICdyb3cnIHwgJ2NlbGwnIHwgJ25vbmUnIHwgJycgfCBmYWxzZSB8IHVuZGVmaW5lZDtcblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBwSW5kZXhgIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbi4gKFJlbW92ZWQgaW4gMS4wLjApXG4gICAqL1xuICBASW5wdXQoKSBnZXQgaWRlbnRpdHlQcm9wKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9faWRlbnRpdHlQcm9wOyB9XG4gIHNldCBpZGVudGl0eVByb3AodmFsdWU6IHN0cmluZykgeyB0aGlzLl9faWRlbnRpdHlQcm9wID0gdmFsdWU7IHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdmFsdWUpOyB9XG4gIHByaXZhdGUgX19pZGVudGl0eVByb3A6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGdyaWQncyBzb3VyY2Ugb2YgZGF0YVxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGUgZ3JpZCdzIHNvdXJjZSBvZiBkYXRhLCB3aGljaCBjYW4gYmUgcHJvdmlkZWQgaW4gMiB3YXlzOlxuICAgKlxuICAgKiAtIERhdGFTb3VyY2VPZjxUPlxuICAgKiAtIFBibERhdGFTb3VyY2U8VD5cbiAgICpcbiAgICogVGhlIGdyaWQgb25seSB3b3JrcyB3aXRoIGBQYmxEYXRhU291cmNlPFQ+YCwgYERhdGFTb3VyY2VPZjxUPmAgaXMgYSBzaG9ydGN1dCBmb3IgcHJvdmlkaW5nXG4gICAqIHRoZSBkYXRhIGFycmF5IGRpcmVjdGx5LlxuICAgKlxuICAgKiBgRGF0YVNvdXJjZU9mPFQ+YCBjYW4gYmU6XG4gICAqXG4gICAqIC0gU2ltcGxlIGRhdGEgYXJyYXkgKGVhY2ggb2JqZWN0IHJlcHJlc2VudHMgb25lIGdyaWQgcm93KVxuICAgKiAtIFByb21pc2UgZm9yIGEgZGF0YSBhcnJheVxuICAgKiAtIFN0cmVhbSB0aGF0IGVtaXRzIGEgZGF0YSBhcnJheSBlYWNoIHRpbWUgdGhlIGFycmF5IGNoYW5nZXNcbiAgICpcbiAgICogV2hlbiBhIGBEYXRhU291cmNlT2Y8VD5gIGlzIHByb3ZpZGVkIGl0IGlzIGNvbnZlcnRlZCBpbnRvIGFuIGluc3RhbmNlIG9mIGBQYmxEYXRhU291cmNlPFQ+YC5cbiAgICpcbiAgICogVG8gYWNjZXNzIHRoZSBgUGJsRGF0YVNvdXJjZTxUPmAgaW5zdGFuY2UgdXNlIHRoZSBgZHNgIHByb3BlcnR5IChyZWFkb25seSkuXG4gICAqXG4gICAqIEl0IGlzIGhpZ2hseSByZWNvbW1lbmRlZCB0byB1c2UgYFBibERhdGFTb3VyY2U8VD5gIGRpcmVjdGx5LCB0aGUgZGF0YXNvdXJjZSBmYWN0b3J5IG1ha2VzIGl0IGVhc3kuXG4gICAqIEZvciBleGFtcGxlLCB3aGVuIGFuIGFycmF5IGlzIHByb3ZpZGVkIHRoZSBmYWN0b3J5IGlzIHVzZWQgdG8gY29udmVydCBpdCB0byBhIGRhdGFzb3VyY2U6XG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgY29sbGVjdGlvbjogVFtdID0gW107XG4gICAqIGNvbnN0IHBibERhdGFTb3VyY2UgPSBjcmVhdGVEUzxUPigpLm9uVHJpZ2dlciggKCkgPT4gY29sbGVjdGlvbiApLmNyZWF0ZSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogPiBUaGlzIGlzIGEgd3JpdGUtb25seSAoc2V0dGVyKSBwcm9wZXJ0eSB0aGF0IHRyaWdnZXJzIHRoZSBgc2V0RGF0YVNvdXJjZWAgbWV0aG9kLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGRhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4gfCBEYXRhU291cmNlT2Y8VD4pIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQYmxEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UoY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IHZhbHVlIHx8IFtdICkuY3JlYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkcygpOiBQYmxEYXRhU291cmNlPFQ+IHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7IH07XG5cbiAgQElucHV0KCkgZ2V0IHVzZVBhZ2luYXRpb24oKTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UgeyByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjsgfVxuICBzZXQgdXNlUGFnaW5hdGlvbih2YWx1ZTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UpIHtcbiAgICBpZiAoKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB2YWx1ZSA9ICdwYWdlTnVtYmVyJztcbiAgICB9XG4gICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5fcGFnaW5hdGlvbiApIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgbm9DYWNoZVBhZ2luYXRvcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7IH1cbiAgc2V0IG5vQ2FjaGVQYWdpbmF0b3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX25vQ2FjaGVQYWdpbmF0b3IgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5kcyAmJiB0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGlzIGdyaWQuXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zOiBQYmxOZ3JpZENvbHVtblNldCB8IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldDtcblxuICBASW5wdXQoKSBzZXQgaGlkZUNvbHVtbnModmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5faGlkZUNvbHVtbnMgPSB2YWx1ZTtcbiAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZhbGxiYWNrIGhlaWdodCBmb3IgXCJ0aGUgaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiLlxuICAgKiBUaGUgZmFsbGJhY2sgaXMgdXNlZCBvbmx5IHdoZW4gaXQgTE9XRVIgdGhhbiB0aGUgcmVuZGVyZWQgaGVpZ2h0LCBzbyBubyBlbXB0eSBnYXBzIGFyZSBjcmVhdGVkIHdoZW4gc2V0dGluZyB0aGUgZmFsbGJhY2suXG4gICAqXG4gICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyB0aGUgYXJlYSBpbiB3aGljaCBhbGwgZGF0YSByb3dzIGFyZSByZW5kZXJlZCBhbmQgYWxsIG1ldGEgKGhlYWRlci9mb290ZXIpIHJvd3MgdGhhdCBhcmUgb2YgdHlwZSBcInJvd1wiIG9yIFwic3RpY2t5XCIuXG4gICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBkZWZpbmVkIHRvIGNvbnN1bWUgYWxsIHRoZSBoZWlnaHQgbGVmdCBhZnRlciBhbGwgZXh0ZXJuYWwgb2JqZWN0cyBhcmUgcmVuZGVyZWQuXG4gICAqIEV4dGVybmFsIG9iamVjdHMgY2FuIGJlIGZpeGVkIG1ldGEgcm93cyAoaGVhZGVyL2Zvb3RlciksIHBhZ2luYXRpb24gcm93LCBhY3Rpb24gcm93IGV0Yy4uLlxuICAgKlxuICAgKiBJZiB0aGUgZ3JpZCBkb2VzIG5vdCBoYXZlIGEgaGVpZ2h0ICglIG9yIHB4KSB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBhbHdheXMgaGF2ZSBubyBoZWlnaHQgKDApLlxuICAgKiBJZiB0aGUgZ3JpZCBoYXMgYSBoZWlnaHQsIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGdldCB0aGUgaGVpZ2h0IGxlZnQsIHdoaWNoIGNhbiBhbHNvIGJlIDAgaWYgdGhlcmUgYXJlIGEgbG90IG9mIGV4dGVybmFsIG9iamVjdHMuXG4gICAqXG4gICAqIFRvIHNvbHZlIHRoZSBuby1oZWlnaHQgcHJvYmxlbSB3ZSB1c2UgdGhlIGZhbGxiYWNrTWluSGVpZ2h0IHByb3BlcnR5LlxuICAgKlxuICAgKiBXaGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGRpc2FibGVkIGFuZCBmYWxsYmFja01pbkhlaWdodCBpcyBub3Qgc2V0IHRoZSBncmlkIHdpbGwgc2V0IHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBoZWlnaHQgdG8gc2hvdyBhbGwgcm93cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gdXNpbmcgYSBmaXhlZCAocHgpIGhlaWdodCBmb3IgdGhlIGdyaWQsIGlmIHRoZSBoZWlnaHQgb2YgYWxsIGV4dGVybmFsIG9iamVjdHMgKyB0aGUgaGVpZ2h0IG9mIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBncmVhdGVyIHRoZW5cbiAgICogdGhlIGdyaWQncyBoZWlnaHQgYSB2ZXJ0aWNhbCBzY3JvbGwgYmFyIHdpbGwgc2hvdy5cbiAgICogSWYgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwicyBoZWlnaHQgd2lsbCBiZSBsb3dlciB0aGVuIGl0J3MgcmVuZGVyZWQgY29udGVudCBoZWlnaHQgYW5kIGFkZGl0aW9uYWwgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIGFwcGVhciwgd2hpY2ggaXMsIHVzdWFsbHksIG5vdCBnb29kLlxuICAgKlxuICAgKiBUbyBhdm9pZCB0aGlzLCBkb24ndCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIGZpeGVkIGhlaWdodCBmb3IgdGhlIGdyaWQuIEluc3RlYWQgdXNlIGZhbGxiYWNrTWluSGVpZ2h0IHRvZ2V0aGVyIHdpdGggYSBtaW4gaGVpZ2h0IGZvciB0aGUgZ3JpZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBmYWxsYmFja01pbkhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQ7IH1cbiAgc2V0IGZhbGxiYWNrTWluSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHJvd0NsYXNzVXBkYXRlOiB1bmRlZmluZWQgfCAoIChjb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pID0+ICggc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSApKTtcbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGVGcmVxOiAnaXRlbScgfCAnbmdEb0NoZWNrJyB8ICdub25lJyA9ICdpdGVtJztcblxuICByb3dGb2N1czogMCB8ICcnID0gJyc7XG4gIGNlbGxGb2N1czogMCB8ICcnID0gJyc7XG5cbiAgcHJpdmF0ZSBfZmFsbGJhY2tNaW5IZWlnaHQgPSAwO1xuICBwcml2YXRlIF9kYXRhU291cmNlOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZVRhYmxlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQmVmb3JlVGFibGU6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZUNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVDb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdhZnRlckNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZBZnRlckNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ZiVGFibGVDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYlRhYmxlQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiSGVhZGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJIZWFkZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiRm9vdGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJGb290ZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoQ2RrUm93RGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBfdGFibGVSb3dEZWY6IENka1Jvd0RlZjxUPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtIZWFkZXJSb3dEZWYpIF9oZWFkZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrSGVhZGVyUm93RGVmPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtGb290ZXJSb3dEZWYpIF9mb290ZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrRm9vdGVyUm93RGVmPjtcblxuICBnZXQgbWV0YUNvbHVtbklkcygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbklkcyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5JZHM7IH1cbiAgZ2V0IG1ldGFDb2x1bW5zKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1ucyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5Sb3dEZWYoKSB7IHJldHVybiB7IGhlYWRlcjogdGhpcy5fc3RvcmUuaGVhZGVyQ29sdW1uRGVmLCBmb290ZXI6IHRoaXMuX3N0b3JlLmZvb3RlckNvbHVtbkRlZiB9OyB9XG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCAoYWZ0ZXIgQWZ0ZXJWaWV3SW5pdClcbiAgICovXG4gIHJlYWRvbmx5IGlzSW5pdDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY29sdW1uQXBpOiBDb2x1bW5BcGk8VD47XG4gIGdldCBjb250ZXh0QXBpKCk6IFBibE5ncmlkQ29udGV4dEFwaTxUPiB7IHJldHVybiB0aGlzLl9leHRBcGkuY29udGV4dEFwaTsgfVxuXG4gIGdldCB2aWV3cG9ydCgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fdmlld3BvcnQ7IH1cblxuICBfY2RrVGFibGU6IFBibENka1RhYmxlQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIF9zdG9yZTogUGJsQ29sdW1uU3RvcmUgPSBuZXcgUGJsQ29sdW1uU3RvcmUoKTtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnNEaXJ0eTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnM6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jb2xIaWRlRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+O1xuICBwcml2YXRlIF9ub0RhdGVFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0b3JFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZTtcbiAgcHJpdmF0ZSBfbm9DYWNoZVBhZ2luYXRvciA9IGZhbHNlO1xuICBwcml2YXRlIF9taW5pbXVtUm93V2lkdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmlld3BvcnQ/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQ7XG4gIHByaXZhdGUgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0O1xuICBwcml2YXRlIF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdpZCcpIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgZ3JpZENvbmZpZyA9IGNvbmZpZy5nZXQoJ3RhYmxlJyk7XG4gICAgdGhpcy5zaG93SGVhZGVyID0gZ3JpZENvbmZpZy5zaG93SGVhZGVyO1xuICAgIHRoaXMuc2hvd0Zvb3RlciA9IGdyaWRDb25maWcuc2hvd0Zvb3RlcjtcbiAgICB0aGlzLm5vRmlsbGVyID0gZ3JpZENvbmZpZy5ub0ZpbGxlcjtcblxuICAgIHRoaXMuaW5pdEV4dEFwaSgpO1xuICAgIHRoaXMuY29sdW1uQXBpID0gQ29sdW1uQXBpLmNyZWF0ZTxUPih0aGlzLCB0aGlzLl9zdG9yZSwgdGhpcy5fZXh0QXBpKTtcbiAgICB0aGlzLmluaXRQbHVnaW5zKGluamVjdG9yLCBlbFJlZiwgdmNSZWYpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oaWRlQ29sdW1uc0RpcnR5KSB7XG4gICAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gZmFsc2U7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2hpZGVDb2x1bW5zO1xuICAgICAgaWYgKCF0aGlzLl9jb2xIaWRlRGlmZmVyICYmIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHZhbHVlKS5jcmVhdGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkaWZmZXIgc3VwcG9ydGluZyBvYmplY3QgJyR7dmFsdWV9LiBoaWRlQ29sdW1ucyBvbmx5IHN1cHBvcnRzIGJpbmRpbmcgdG8gSXRlcmFibGVzIHN1Y2ggYXMgQXJyYXlzLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb2xIaWRlRGlmZmVyKSB7XG4gICAgICBjb25zdCBoaWRlQ29sdW1ucyA9IHRoaXMuX2hpZGVDb2x1bW5zIHx8IFtdO1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2NvbEhpZGVEaWZmZXIuZGlmZihoaWRlQ29sdW1ucyk7XG4gICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLl9zdG9yZS5oaWRkZW4gPSBoaWRlQ29sdW1ucztcbiAgICAgICAgdGhpcy5fbWluaW11bVJvd1dpZHRoID0gJyc7XG5cbiAgICAgICAgLy8gVE9ETyhzaGxvbWlhc3NhZikgW3BlcmYsIDRdOiBSaWdodCBub3cgd2UgYXR0YWNoIGFsbCBjb2x1bW5zLCB3ZSBjYW4gaW1wcm92ZSBpdCBieSBhdHRhY2hpbmcgb25seSB0aG9zZSBcImFkZGVkXCIgKHdlIGtub3cgdGhlbSBmcm9tIFwiY2hhbmdlc1wiKVxuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5faGlkZUNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gbm8gbmVlZCB0byB1bnN1YnNjcmliZSwgdGhlIHJlZyBzZXJ2aWNlIGlzIHBlciBncmlkIGluc3RhbmNlIGFuZCBpdCB3aWxsIGRlc3Ryb3kgd2hlbiB0aGlzIGdyaWQgZGVzdHJveS5cbiAgICAvLyBBbHNvLCBhdCB0aGlzIHBvaW50IGluaXRpYWwgY2hhbmdlcyBmcm9tIHRlbXBsYXRlcyBwcm92aWRlZCBpbiB0aGUgY29udGVudCBhcmUgYWxyZWFkeSBpbnNpZGUgc28gdGhleSB3aWxsIG5vdCB0cmlnZ2VyXG4gICAgLy8gdGhlIG9yZGVyIGhlcmUgaXMgdmVyeSBpbXBvcnRhbnQsIGJlY2F1c2UgY29tcG9uZW50IHRvcCBvZiB0aGlzIGdyaWQgd2lsbCBmaXJlIGxpZmUgY3ljbGUgaG9va3MgQUZURVIgdGhpcyBjb21wb25lbnRcbiAgICAvLyBzbyBpZiB3ZSBoYXZlIGEgdG9wIGxldmVsIGNvbXBvbmVudCByZWdpc3RlcmluZyBhIHRlbXBsYXRlIG9uIHRvcCBpdCB3aWxsIG5vdCBzaG93IHVubGVzcyB3ZSBsaXN0ZW4uXG4gICAgdGhpcy5yZWdpc3RyeS5jaGFuZ2VzLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICBsZXQgZ3JpZENlbGwgPSBmYWxzZTtcbiAgICAgIGxldCBoZWFkZXJGb290ZXJDZWxsID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RhYmxlQ2VsbCc6XG4gICAgICAgICAgICBncmlkQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJDZWxsJzpcbiAgICAgICAgICBjYXNlICdmb290ZXJDZWxsJzpcbiAgICAgICAgICAgIGhlYWRlckZvb3RlckNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbm9EYXRhJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcic6XG4gICAgICAgICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGdyaWRDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgICAgaWYgKGhlYWRlckZvb3RlckNlbGwpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0luaXQnLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25Jbml0JyB9KTtcblxuICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcblxuICAgIC8vIEFkZGluZyBhIGRpdiBiZWZvcmUgdGhlIGZvb3RlciByb3cgdmlldyByZWZlcmVuY2UsIHRoaXMgZGl2IHdpbGwgYmUgdXNlZCB0byBmaWxsIHVwIHRoZSBzcGFjZSBiZXR3ZWVuIGhlYWRlciAmIGZvb3RlciByb3dzXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1lbXB0eS1zcGFjZXInKVxuICAgIHRoaXMuX2Nka1RhYmxlLl9lbGVtZW50Lmluc2VydEJlZm9yZShkaXYsIHRoaXMuX2Nka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmxpc3RlblRvUmVzaXplKCk7XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgd2lsbCBjYXRjaCBjb250ZXh0IGZvY3VzZWQgZXZlbnRzLCBmaW5kIHRoZSBIVE1MIGVsZW1lbnQgb2YgdGhlIGNlbGwgYW5kIGZvY3VzIGl0LlxuICAgIHRoaXMuY29udGV4dEFwaS5mb2N1c0NoYW5nZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmN1cnIpIHtcbiAgICAgICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5jb250ZXh0QXBpLmZpbmRSb3dJblZpZXcoZXZlbnQuY3Vyci5yb3dJZGVudCk7XG4gICAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KHJvd0NvbnRleHQuaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbFZpZXdJbmRleCA9IHRoaXMuY29sdW1uQXBpLnJlbmRlckluZGV4T2YodGhpcy5jb2x1bW5BcGkuY29sdW1uc1tldmVudC5jdXJyLmNvbEluZGV4XSlcbiAgICAgICAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSB2aWV3LnJvb3ROb2Rlc1swXS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtY2VsbCcpW2NlbGxWaWV3SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAoY2VsbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgcHJvY2Vzc0NvbHVtbnMgPSBmYWxzZTtcblxuICAgIGlmIChjaGFuZ2VzLmZvY3VzTW9kZSkge1xuICAgICAgdGhpcy5yb3dGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAncm93JyA/IDAgOiAnJztcbiAgICAgIHRoaXMuY2VsbEZvY3VzID0gdGhpcy5mb2N1c01vZGUgPT09ICdjZWxsJyA/IDAgOiAnJztcbiAgICB9XG5cbiAgICBpZiAoIGNoYW5nZXMuY29sdW1ucyAmJiB0aGlzLmlzSW5pdCApIHtcbiAgICAgIHByb2Nlc3NDb2x1bW5zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIHByb2Nlc3NDb2x1bW5zID09PSB0cnVlICkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9wbHVnaW4uZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBwOiBQcm9taXNlPHZvaWQ+O1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25EZXN0cm95Jywgd2FpdDogKF9wOiBQcm9taXNlPHZvaWQ+KSA9PiBwID0gX3AgfSk7XG4gICAgaWYgKHApIHtcbiAgICAgIHAudGhlbihkZXN0cm95KS5jYXRjaChkZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVCk6IGFueSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IHNvcnQgZGVmaW5pdGlvbnMuXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAsIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBzb3J0aW5nIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgb3IgYHNvcnRBbGlhc2AgcHJvcGVydGllcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXG4gICAqXG4gICAqIEBwYXJhbSBjb2x1bW5PclNvcnRBbGlhcyBBIGNvbHVtbiBpbnN0YW5jZSBvciBhIHN0cmluZyBtYXRjaGluZyBgUGJsQ29sdW1uLnNvcnRBbGlhc2Agb3IgYFBibENvbHVtbi5pZGAuXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhczogUGJsQ29sdW1uIHwgc3RyaW5nLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM/OiBQYmxDb2x1bW4gfCBzdHJpbmcgfCBib29sZWFuLCBzb3J0PzogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5PclNvcnRBbGlhcyB8fCB0eXBlb2YgY29sdW1uT3JTb3J0QWxpYXMgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5kcy5zZXRTb3J0KCEhY29sdW1uT3JTb3J0QWxpYXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb2x1bW46IFBibENvbHVtbjtcbiAgICBpZiAodHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnc3RyaW5nJykge1xuICAgICAgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2x1bW5PclNvcnRBbGlhcyA6IChjLnNvcnQgJiYgYy5pZCA9PT0gY29sdW1uT3JTb3J0QWxpYXMpICk7XG4gICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzIFwiJHtjb2x1bW5PclNvcnRBbGlhc31cIi5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4gPSBjb2x1bW5PclNvcnRBbGlhcztcbiAgICB9XG4gICAgdGhpcy5kcy5zZXRTb3J0KGNvbHVtbiwgc29ydCwgc2tpcFVwZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYC5cbiAgICovXG4gIHNldEZpbHRlcigpOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSBmdW5jdGlvbiBwcmVkaWNhdGUuXG4gICAqXG4gICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IERhdGFTb3VyY2VQcmVkaWNhdGUsIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgdmFsdWUgdG8gY29tcGFyZSB3aXRoIGFuZCBhIGxpc3Qgb2YgY29sdW1ucyB3aXRoIHRoZSB2YWx1ZXMgdG8gY29tcGFyZSB0by5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IGFueSwgY29sdW1uczogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIHNldEZpbHRlcih2YWx1ZT86IERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgY29sdW1ucz86IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjb2x1bW5JbnN0YW5jZXM6IFBibENvbHVtbltdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykgJiYgdHlwZW9mIGNvbHVtbnNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbElkIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbmQoIGMgPT4gYy5hbGlhcyA/IGMuYWxpYXMgPT09IGNvbElkIDogKGMuaWQgPT09IGNvbElkKSApO1xuICAgICAgICAgIGlmICghY29sdW1uICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzICR7Y29sSWR9IFwiJHtjb2xJZH1cIi5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29sdW1uSW5zdGFuY2VzLnB1c2goY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uSW5zdGFuY2VzID0gY29sdW1ucyBhcyBhbnk7XG4gICAgICB9XG4gICAgICB0aGlzLmRzLnNldEZpbHRlcih2YWx1ZSwgY29sdW1uSW5zdGFuY2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIoKTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT09IHZhbHVlKSB7XG4gICAgICAvLyBLSUxMIEFMTCBzdWJzY3JpcHRpb25zIGZvciB0aGUgcHJldmlvdXMgZGF0YXNvdXJjZS5cbiAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLl9kYXRhU291cmNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgICB0aGlzLl9kYXRhU291cmNlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5kYXRhU291cmNlID0gdmFsdWUgYXMgYW55O1xuXG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICB0aGlzLnNldHVwTm9EYXRhKGZhbHNlKTtcblxuICAgICAgLy8gY2xlYXIgdGhlIGNvbnRleHQsIG5ldyBkYXRhc291cmNlXG4gICAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuXG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHtcbiAgICAgICAga2luZDogJ29uRGF0YVNvdXJjZScsXG4gICAgICAgIHByZXYsXG4gICAgICAgIGN1cnI6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgdmFsdWUub25FcnJvci5waXBlKFVuUngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRvIHRoaXMgZXZlbnQgYmVjYXVzZSBpdCBmaXJlcyBiZWZvcmUgdGhlIGVudGlyZSBkYXRhLWNoYW5naW5nIHByb2Nlc3Mgc3RhcnRzLlxuICAgICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2UgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBpcyBmaXJlZCBhc3luYywganVzdCBiZWZvcmUgdGhlIGRhdGEgaXMgZW1pdHRlZC5cbiAgICAgICAgLy8gSXRzIG5vdCBlbm91Z2ggdG8gY2xlYXIgdGhlIGNvbnRleHQgd2hlbiBgc2V0RGF0YVNvdXJjZWAgaXMgY2FsbGVkLCB3ZSBhbHNvIG5lZWQgdG8gaGFuZGxlIGByZWZyZXNoYCBjYWxscyB3aGljaCB3aWxsIG5vdFxuICAgICAgICAvLyB0cmlnZ2VyIHRoaXMgbWV0aG9kLlxuICAgICAgICB2YWx1ZS5vblNvdXJjZUNoYW5naW5nLnBpcGUoVW5SeCh0aGlzLCB2YWx1ZSkpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApO1xuXG4gICAgICAgIC8vIFJ1biBDRCwgc2NoZWR1bGVkIGFzIGEgbWljcm8tdGFzaywgYWZ0ZXIgZWFjaCByZW5kZXJpbmdcbiAgICAgICAgdmFsdWUub25SZW5kZXJEYXRhQ2hhbmdpbmdcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlciggKHtldmVudH0pID0+ICFldmVudC5pc0luaXRpYWwgJiYgKGV2ZW50LnBhZ2luYXRpb24uY2hhbmdlZCB8fCBldmVudC5zb3J0LmNoYW5nZWQgfHwgZXZlbnQuZmlsdGVyLmNoYW5nZWQpKSxcbiAgICAgICAgICAgIC8vIENvbnRleHQgYmV0d2VlbiB0aGUgb3BlcmF0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBhdCB0aGUgbW9tZW50XG4gICAgICAgICAgICAvLyBFdmVudCBmb3IgY2xpZW50IHNpZGUgb3BlcmF0aW9ucy4uLlxuICAgICAgICAgICAgLy8gVE9ETzogY2FuIHdlIHJlbW92ZSB0aGlzPyB3ZSBjbGVhciB0aGUgY29udGV4dCB3aXRoIGBvblNvdXJjZUNoYW5naW5nYFxuICAgICAgICAgICAgdGFwKCAoKSA9PiAhdGhpcy5fc3RvcmUucHJpbWFyeSAmJiB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpICksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoICgpID0+IHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZC5waXBlKHRha2UoMSksIG1hcFRvKHRoaXMuZHMucmVuZGVyTGVuZ3RoKSkgKSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyKSxcbiAgICAgICAgICAgIFVuUngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIHByZXZpb3VzUmVuZGVyTGVuZ3RoID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBudW1iZXIgb2YgcmVuZGVyZWQgaXRlbXMgaGFzIGNoYW5nZWQgdGhlIGdyaWQgd2lsbCB1cGRhdGUgdGhlIGRhdGEgYW5kIHJ1biBDRCBvbiBpdC5cbiAgICAgICAgICAgIC8vIHNvIHdlIG9ubHkgdXBkYXRlIHRoZSByb3dzLlxuICAgICAgICAgICAgY29uc3QgeyBjZGtUYWJsZSB9ID0gdGhpcy5fZXh0QXBpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzUmVuZGVyTGVuZ3RoID09PSB0aGlzLmRzLnJlbmRlckxlbmd0aCkge1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cyh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3MoJ2Zvb3RlcicsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsaW5nIG5vIGRhdGEgb3ZlcmxheVxuICAgICAgICAvLyBIYW5kbGluZyBmYWxsYmFjayBtaW5pbXVtIGhlaWdodC5cbiAgICAgICAgdmFsdWUub25SZW5kZXJlZERhdGFDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoICgpID0+IHRoaXMuZHMucmVuZGVyTGVuZ3RoICksXG4gICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgICAgdGFwKCAoW3ByZXYsIGN1cnJdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vRGF0YVNob3dpbmcgPSAhIXRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZjtcbiAgICAgICAgICAgICAgaWYgKCAoY3VyciA+IDAgJiYgbm9EYXRhU2hvd2luZykgfHwgKGN1cnIgPT09IDAgJiYgIW5vRGF0YVNob3dpbmcpICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvYnNlcnZlT24oYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLCAvLyB3dyB3YW50IHRvIGdpdmUgdGhlIGJyb3dzZXIgdGltZSB0byByZW1vdmUvYWRkIHJvd3NcbiAgICAgICAgICAgIFVuUngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRzLnJlbmRlckxlbmd0aCA+IDAgJiYgdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGggPSBNYXRoLm1pbih0aGlzLl9mYWxsYmFja01pbkhlaWdodCwgdGhpcy52aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpKTtcbiAgICAgICAgICAgICAgZWwuc3R5bGUubWluSGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLnZpZXdwb3J0LmVuYWJsZWQgPyBudWxsIDogdGhpcy52aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpICsgJ3B4JztcbiAgICAgICAgICAgICAgLy8gVE9ETzogV2hlbiB2aWV3cG9ydCBpcyBkaXNhYmxlZCwgd2UgY2FuIHNraXAgdGhlIGNhbGwgdG8gbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSBhbmQgbGV0IHRoZSBicm93c2VyXG4gICAgICAgICAgICAgIC8vIGRvIHRoZSBqb2IgYnkgc2V0dGluZyBgY29udGFpbjogdW5zZXRgIGluIGBwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0YFxuXG4gICAgICAgICAgICAgIC8vIGVsLnN0eWxlLm1pbkhlaWdodCA9IG51bGw7XG4gICAgICAgICAgICAgIC8vIGVsLnN0eWxlLmNvbnRhaW4gPSB0aGlzLnZpZXdwb3J0LmVuYWJsZWQgPyBudWxsIDogJ3Vuc2V0JztcblxuICAgICAgICAgICAgICAvLyBVUERBVEU6IFRoaXMgd2lsbCBub3Qgd29yayBiZWNhdXNlIGl0IHdpbGwgY2F1c2UgdGhlIHdpZHRoIHRvIGJlIGluY29ycmVjdCB3aGVuIHVzZWQgd2l0aCB2U2Nyb2xsTm9uZVxuICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVjayB3aHk/XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIHRoZSBoZWFkZXIsIGluY2x1ZGluZyBhIGZ1bGwgcmVidWlsZCBvZiBjb2x1bW4gaGVhZGVyc1xuICAgKi9cbiAgaW52YWxpZGF0ZUNvbHVtbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdiZWZvcmVJbnZhbGlkYXRlSGVhZGVycycgfSk7XG5cbiAgICBjb25zdCByZWJ1aWxkUm93cyA9IHRoaXMuX3N0b3JlLmFsbENvbHVtbnMubGVuZ3RoID4gMDtcbiAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgIHRoaXMuX3N0b3JlLmludmFsaWRhdGUodGhpcy5jb2x1bW5zKTtcblxuICAgIHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdGhpcy5fX2lkZW50aXR5UHJvcCk7IC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIGluIDEuMC4wXG5cbiAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckhlYWRlclJvd0RlZnMoKTtcbiAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAvLyB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAvLyBhZnRlciBpbnZhbGlkYXRpbmcgdGhlIGhlYWRlcnMgd2Ugbm93IGhhdmUgb3B0aW9uYWwgaGVhZGVyL2hlYWRlckdyb3Vwcy9mb290ZXIgcm93cyBhZGRlZFxuICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZW1wbGF0ZSB3aXRoIHRoaXMgZGF0YSB3aGljaCB3aWxsIGNyZWF0ZSBuZXcgcm93cyAoaGVhZGVyL2Zvb3RlcilcbiAgICB0aGlzLnJlc2V0SGVhZGVyUm93RGVmcygpO1xuICAgIHRoaXMucmVzZXRGb290ZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICAvKiAgTm93IHdlIHdpbGwgZm9yY2UgY2xlYXJpbmcgYWxsIGRhdGEgcm93cyBhbmQgY3JlYXRpbmcgdGhlbSBiYWNrIGFnYWluIGlmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCB0aW1lIHdlIGludmFsaWRhdGUgdGhlIGNvbHVtbnMuLi5cblxuICAgICAgICBXaHk/IGZpcnN0LCBzb21lIGJhY2tncm91bmQ6XG5cbiAgICAgICAgSW52YWxpZGF0aW5nIHRoZSBzdG9yZSB3aWxsIHJlc3VsdCBpbiBuZXcgYFBibENvbHVtbmAgaW5zdGFuY2VzIChjbG9uZWQgb3IgY29tcGxldGVseSBuZXcpIGhlbGQgaW5zaWRlIGEgbmV3IGFycmF5IChhbGwgYXJyYXlzIGluIHRoZSBzdG9yZSBhcmUgcmUtY3JlYXRlZCBvbiBpbnZhbGlkYXRlKVxuICAgICAgICBOZXcgYXJyYXkgYW5kIG5ldyBpbnN0YW5jZXMgd2lsbCBhbHNvIHJlc3VsdCBpbiBuZXcgZGlyZWN0aXZlIGluc3RhbmNlcyBvZiBgUGJsTmdyaWRDb2x1bW5EZWZgIGZvciBldmVyeSBjb2x1bW4uXG5cbiAgICAgICAgRWFjaCBkYXRhIHJvdyBoYXMgZGF0YSBjZWxscyB3aXRoIHRoZSBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCBkaXJlY3RpdmUgKGBwYmwtbmdyaWQtY2VsbGApLlxuICAgICAgICBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCBoYXMgYSByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ29sdW1uRGVmYCB0aHJvdWdoIGRlcGVuZGVuY3kgaW5qZWN0aW9uLCBpLmUuIGl0IHdpbGwgbm90IHVwZGF0ZSB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24hXG5cbiAgICAgICAgTm93LCB0aGUgcHJvYmxlbTpcbiAgICAgICAgVGhlIGBDZGtUYWJsZWAgd2lsbCBjYWNoZSByb3dzIGFuZCB0aGVpciBjZWxscywgcmV1c2luZyB0aGVtIGZvciBwZXJmb3JtYW5jZS5cbiAgICAgICAgVGhpcyBtZWFucyB0aGF0IHRoZSBgUGJsTmdyaWRDb2x1bW5EZWZgIGluc3RhbmNlIGluc2lkZSBlYWNoIGNlbGwgd2lsbCBub3QgY2hhbmdlLlxuICAgICAgICBTbywgY3JlYXRpbmcgbmV3IGNvbHVtbnMgYW5kIGNvbHVtbkRlZnMgd2lsbCByZXN1bHQgaW4gc3RhbGUgY2VsbHMgd2l0aCByZWZlcmVuY2UgdG8gZGVhZCBpbnN0YW5jZXMgb2YgYFBibENvbHVtbmAgYW5kIGBQYmxOZ3JpZENvbHVtbkRlZmAuXG5cbiAgICAgICAgT25lIHNvbHV0aW9uIGlzIHRvIHJlZmFjdG9yIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIHRvIGdldCB0aGUgYFBibE5ncmlkQ29sdW1uRGVmYCB0aHJvdWdoIGRhdGEgYmluZGluZy5cbiAgICAgICAgV2hpbGUgdGhpcyB3aWxsIHdvcmsgaXQgd2lsbCBwdXQgbW9yZSB3b3JrIG9uIGVhY2ggY2VsbCB3aGlsZSBkb2luZyBDRCBhbmQgd2lsbCByZXF1aXJlIGNvbXBsZXggbG9naWMgdG8gaGFuZGxlIGVhY2ggY2hhbmdlIGJlY2F1c2UgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWBcbiAgICAgICAgYWxzbyBjcmVhdGUgYSBjb250ZXh0IHdoaWNoIGhhcyByZWZlcmVuY2UgdG8gYSBjb2x1bW4gdGh1cyBhIG5ldyBjb250ZXh0IGlzIHJlcXVpcmVkLlxuICAgICAgICBLZWVwaW5nIHRyYWNrIGZvciBhbGwgcmVmZXJlbmNlcyB3aWxsIGJlIGRpZmZpY3VsdCBhbmQgYnVncyBhcmUgbGlrZWx5IHRvIG9jY3VyLCB3aGljaCBhcmUgaGFyZCB0byB0cmFjay5cblxuICAgICAgICBUaGUgc2ltcGxlc3Qgc29sdXRpb24gaXMgdG8gZm9yY2UgdGhlIGdyaWQgdG8gcmVuZGVyIGFsbCBkYXRhIHJvd3MgZnJvbSBzY3JhdGNoIHdoaWNoIHdpbGwgZGVzdHJveSB0aGUgY2FjaGUgYW5kIGFsbCBjZWxsJ3Mgd2l0aCBpdCwgY3JlYXRpbmcgbmV3IG9uZSdzIHdpdGggcHJvcGVyIHJlZmVyZW5jZS5cblxuICAgICAgICBUaGUgc2ltcGxlIHNvbHV0aW9uIGlzIGN1cnJlbnRseSBwcmVmZXJyZWQgYmVjYXVzZTpcblxuICAgICAgICAtIEl0IGlzIGVhc2llciB0byBpbXBsZW1lbnQuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGFzc2VzcyB0aGUgaW1wYWN0LlxuICAgICAgICAtIEl0IGVmZmVjdHMgYSBzaW5nbGUgb3BlcmF0aW9uIChjaGFuZ2luZyB0byByZXNldHRpbmcgY29sdW1ucykgdGhhdCByYXJlbHkgaGFwcGVuXG5cbiAgICAgICAgVGhlIG9ubHkgaXNzdWUgaXMgd2l0aCB0aGUgYENka1RhYmxlYCBlbmNhcHN1bGF0aW5nIHRoZSBtZXRob2QgYF9mb3JjZVJlbmRlckRhdGFSb3dzKClgIHdoaWNoIGlzIHdoYXQgd2UgbmVlZC5cbiAgICAgICAgVGhlIHdvcmthcm91bmQgaXMgdG8gYXNzaWduIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHdpdGggdGhlIHNhbWUgdmFsdWUgaXQgYWxyZWFkeSBoYXMsIHdoaWNoIHdpbGwgY2F1c2UgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB0byBmaXJlLlxuICAgICAgICBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyBhIGdldHRlciB0aGF0IHRyaWdnZXJzIGBfZm9yY2VSZW5kZXJEYXRhUm93c2Agd2l0aG91dCBjaGVja2luZyB0aGUgdmFsdWUgY2hhbmdlZCwgcGVyZmVjdCBmaXQuXG4gICAgICAgIFRoZXJlIGlzIGEgcmlzayB3aXRoIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGJlaW5nIGNoYW5nZWQuLi5cbiAgICAgKi9cbiAgICBpZiAocmVidWlsZFJvd3MpIHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9IHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cztcbiAgICB9XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkludmFsaWRhdGVIZWFkZXJzJyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb2x1bW4gc2l6ZXMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSBncmlkIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXG4gICAqIFRoZSBmaW5hbCB3aWR0aCByZXByZXNlbnQgYSBzdGF0aWMgd2lkdGgsIGl0IGlzIHRoZSB2YWx1ZSBhcyBzZXQgaW4gdGhlIGRlZmluaXRpb24gKGV4Y2VwdCBjb2x1bW4gd2l0aG91dCB3aWR0aCwgd2hlcmUgdGhlIGNhbGN1bGF0ZWQgZ2xvYmFsIHdpZHRoIGlzIHNldCkuXG4gICAqL1xuICByZXNldENvbHVtbnNXaWR0aCgpOiB2b2lkIHtcbiAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzaXplIG9mIGFsbCBncm91cCBjb2x1bW5zIGluIHRoZSBncmlkIGJhc2VkIG9uIHRoZSBzaXplIG9mIHRoZWlyIHZpc2libGUgY2hpbGRyZW4gKG5vdCBoaWRkZW4pLlxuICAgKiBAcGFyYW0gZHluYW1pY1dpZHRoTG9naWMgLSBPcHRpb25hbCBsb2dpYyBjb250YWluZXIsIGlmIG5vdCBzZXQgYSBuZXcgb25lIGlzIGNyZWF0ZWQuXG4gICAqL1xuICBzeW5jQ29sdW1uR3JvdXBzU2l6ZShkeW5hbWljV2lkdGhMb2dpYz86IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKTogdm9pZCB7XG4gICAgaWYgKCFkeW5hbWljV2lkdGhMb2dpYykge1xuICAgICAgZHluYW1pY1dpZHRoTG9naWMgPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIH1cblxuICAgIC8vIEZyb20gYWxsIG1ldGEgY29sdW1ucyAoaGVhZGVyL2Zvb3Rlci9oZWFkZXJHcm91cCkgd2UgZmlsdGVyIG9ubHkgYGhlYWRlckdyb3VwYCBjb2x1bW5zLlxuICAgIC8vIEZvciBlYWNoIHdlIGNhbGN1bGF0ZSBpdCdzIHdpZHRoIGZyb20gYWxsIG9mIHRoZSBjb2x1bW5zIHRoYXQgdGhlIGhlYWRlckdyb3VwIFwiZ3JvdXBzXCIuXG4gICAgLy8gV2UgdXNlIHRoZSBzYW1lIHN0cmF0ZWd5IGFuZCB0aGUgc2FtZSBSb3dXaWR0aER5bmFtaWNBZ2dyZWdhdG9yIGluc3RhbmNlIHdoaWNoIHdpbGwgcHJldmVudCBkdXBsaWNhdGUgY2FsY3VsYXRpb25zLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGhlYWRlciBncm91cHMsIGkuZS4gc2FtZSBjb2x1bW5zIG9uIG11bHRpcGxlIGdyb3VwcyB3aXRoIGRpZmZlcmVudCByb3cgaW5kZXguXG4gICAgZm9yIChjb25zdCBnIG9mIHRoaXMuX3N0b3JlLmdldEFsbEhlYWRlckdyb3VwKCkpIHtcbiAgICAgIC8vIFdlIGdvIG92ZXIgYWxsIGNvbHVtbnMgYmVjYXVzZSBnLmNvbHVtbnMgZG9lcyBub3QgcmVwcmVzZW50IHRoZSBjdXJyZW50IG93bmVkIGNvbHVtbnMgb2YgdGhlIGdyb3VwXG4gICAgICAvLyBpdCBpcyBzdGF0aWMsIHJlcHJlc2VudGluZyB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICAgIC8vIE9ubHkgY29sdW1ucyBob2xkIHRoZWlyIGdyb3VwIG93bmVycy5cbiAgICAgIC8vIFRPRE86IGZpbmQgd2F5IHRvIGltcHJvdmUgaXRlcmF0aW9uXG4gICAgICBjb25zdCBjb2xTaXplSW5mb3MgPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbHRlciggYyA9PiAhYy5oaWRkZW4gJiYgYy5pc0luR3JvdXAoZykpLm1hcCggYyA9PiBjLnNpemVJbmZvICk7XG4gICAgICBpZiAoY29sU2l6ZUluZm9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBXaWR0aCA9IGR5bmFtaWNXaWR0aExvZ2ljLmFkZEdyb3VwKGNvbFNpemVJbmZvcyk7XG4gICAgICAgIGcubWluV2lkdGggPSBncm91cFdpZHRoO1xuICAgICAgICBnLnVwZGF0ZVdpZHRoKGAke2dyb3VwV2lkdGh9cHhgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGcubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYDBweGApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZUNvbHVtbnMoY29sdW1ucz86IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5zKSB7XG4gICAgICBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICB9XG5cbiAgICAvLyBwcm90ZWN0IGZyb20gcGVyLW1hdHVyZSByZXNpemUuXG4gICAgLy8gV2lsbCBoYXBwZW4gb24gYWRkaXRpb25hbCBoZWFkZXIvaGVhZGVyLWdyb3VwIHJvd3MgQU5EIEFMU08gd2hlbiB2U2Nyb2xsTm9uZSBpcyBzZXRcbiAgICAvLyBUaGlzIHdpbGwgY2F1c2Ugc2l6ZSBub3QgdG8gcG9wdWxhdGUgYmVjYXVzZSBpdCB0YWtlcyB0aW1lIHRvIHJlbmRlciB0aGUgcm93cywgc2luY2UgaXQncyBub3QgdmlydHVhbCBhbmQgaGFwcGVucyBpbW1lZGlhdGVseS5cbiAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHByb3RlY3Rpb24uXG4gICAgaWYgKCFjb2x1bW5zWzBdLnNpemVJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc3RvcmVzIGFuZCBjYWxjdWxhdGVzIHdpZHRoIGZvciBjb2x1bW5zIGFkZGVkIHRvIGl0LiBBZ2dyZWdhdGUncyB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGFkZGVkIGNvbHVtbnMuXG4gICAgY29uc3Qgcm93V2lkdGggPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIHRoaXMuc3luY0NvbHVtbkdyb3Vwc1NpemUocm93V2lkdGgpO1xuXG4gICAgLy8gaWYgdGhpcyBpcyBhIGdyaWQgd2l0aG91dCBncm91cHNcbiAgICBpZiAocm93V2lkdGgubWluaW11bVJvd1dpZHRoID09PSAwKSB7XG4gICAgICByb3dXaWR0aC5hZGRHcm91cChjb2x1bW5zLm1hcCggYyA9PiBjLnNpemVJbmZvICkpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBtYXggbG9jayBzdGF0ZSBoYXMgY2hhbmdlZCB3ZSBuZWVkIHRvIHVwZGF0ZSByZS1jYWxjdWxhdGUgdGhlIHN0YXRpYyB3aWR0aCdzIGFnYWluLlxuICAgIGlmIChyb3dXaWR0aC5tYXhXaWR0aExvY2tDaGFuZ2VkKSB7XG4gICAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoY29sdW1ucyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9taW5pbXVtUm93V2lkdGggKSB7XG4gICAgICAvLyBXZSBjYWxjdWxhdGUgdGhlIHRvdGFsIG1pbmltdW0gd2lkdGggb2YgdGhlIGdyaWRcbiAgICAgIC8vIFdlIGRvIGl0IG9uY2UsIHRvIHNldCB0aGUgbWluaW11bSB3aWR0aCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzZXR1cC5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBhcHBseSBzdHJhdGVneSBoZXJlLCB3ZSB3YW50IHRoZSBlbnRpcmUgbGVuZ3RoIG9mIHRoZSBncmlkIVxuICAgICAgdGhpcy5fY2RrVGFibGUubWluV2lkdGggPSByb3dXaWR0aC5taW5pbXVtUm93V2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJyk7XG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uUmVzaXplUm93JyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZW1iZWRkZWQgdmlldyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHVzZXIgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqL1xuICBjcmVhdGVWaWV3PEM+KGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxDPiwgY29udGV4dD86IEMsIGluZGV4PzogbnVtYmVyKTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbik7XG4gICAgY29uc3QgdmlldyA9IHZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZiwgY29udGV4dCwgaW5kZXgpO1xuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBhbHJlYWR5IGNyZWF0ZWQgZW1iZWRkZWQgdmlldy5cbiAgICogQHBhcmFtIHZpZXcgLSBUaGUgdmlldyB0byByZW1vdmVcbiAgICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uLCBpZiBub3Qgc2V0IGRlZmF1bHRzIHRvIGBiZWZvcmVgXG4gICAqIEByZXR1cm5zIHRydWUgd2hlbiBhIHZpZXcgd2FzIHJlbW92ZWQsIGZhbHNlIHdoZW4gbm90LiAoZGlkIG5vdCBleGlzdCBpbiB0aGUgdmlldyBjb250YWluZXIgZm9yIHRoZSBwcm92aWRlZCBsb2NhdGlvbilcbiAgICovXG4gIHJlbW92ZVZpZXcodmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT4sIGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBib29sZWFuIHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbik7XG4gICAgY29uc3QgaWR4ID0gdmNSZWYuaW5kZXhPZih2aWV3KTtcbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2Y1JlZi5yZW1vdmUoaWR4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgYWxsIHZpc2libGUgY29sdW1ucyB0byBmaXQgY29udGVudCBvZiB0aGUgZ3JpZC5cbiAgICogQHBhcmFtIGZvcmNlRml4ZWRXaWR0aCAtIFdoZW4gdHJ1ZSB3aWxsIHJlc2l6ZSBhbGwgY29sdW1ucyB3aXRoIGFic29sdXRlIHBpeGVsIHZhbHVlcywgb3RoZXJ3aXNlIHdpbGwga2VlcCB0aGUgc2FtZSBmb3JtYXQgYXMgb3JpZ2luYWxseSBzZXQgKCUgb3Igbm9uZSlcbiAgICovXG4gIGF1dG9TaXplQ29sdW1uVG9GaXQob3B0aW9ucz86IEF1dG9TaXplVG9GaXRPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgeyBpbm5lcldpZHRoLCBvdXRlcldpZHRoIH0gPSB0aGlzLnZpZXdwb3J0O1xuXG4gICAgLy8gY2FsY3VsYXRlIGF1dG8tc2l6ZSBvbiB0aGUgd2lkdGggd2l0aG91dCBzY3JvbGwgYmFyIGFuZCB0YWtlIGJveCBtb2RlbCBnYXBzIGludG8gYWNjb3VudFxuICAgIC8vIFRPRE86IGlmIG5vIHNjcm9sbCBiYXIgZXhpc3RzIHRoZSBjYWxjIHdpbGwgbm90IGluY2x1ZGUgaXQsIG5leHQgaWYgbW9yZSByb3dzIGFyZSBhZGRlZCBhIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIuLi5cbiAgICB0aGlzLmNvbHVtbkFwaS5hdXRvU2l6ZVRvRml0KG91dGVyV2lkdGggLSAob3V0ZXJXaWR0aCAtIGlubmVyV2lkdGgpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGZpbmRJbml0aWFsUm93SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IHJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldCgwKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgIHJvd0VsZW1lbnQgPSB2aWV3UmVmLnJvb3ROb2Rlc1swXTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUocm93RWxlbWVudCkuaGVpZ2h0O1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGhlaWdodCwgMTApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50KSB7XG4gICAgICByb3dFbGVtZW50ID0gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50Lmxlbmd0aCA+IDBcbiAgICAgICAgPyAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmdldCh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoIC0gMSkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXVxuICAgICAgICA6IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIDtcbiAgICAgIHJvd0VsZW1lbnQgPSByb3dFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByb3dFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNsYXNzKC4uLmNsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xzKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHVnaW5zKGluamVjdG9yOiBJbmplY3RvciwgZWxSZWY6IEVsZW1lbnRSZWY8YW55PiwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYW4gaW5qZWN0b3IgZm9yIHRoZSBleHRlbnNpb25zL3BsdWdpbnNcbiAgICAvLyBUaGlzIGluamVjdG9yIGFsbG93IHBsdWdpbnMgKHRoYXQgY2hvb3NlIHNvKSB0byBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvbiBmb3IgcnVudGltZSB1c2UuXG4gICAgLy8gSS5FOiBhcyBpZiB0aGV5IHdlJ3JlIGNyZWF0ZWQgYnkgYW5ndWxhciB2aWEgdGVtcGxhdGUuLi5cbiAgICAvLyBUaGlzIGFsbG93cyBzZWFtbGVzcyBwbHVnaW4tdG8tcGx1Z2luIGRlcGVuZGVuY2llcyB3aXRob3V0IHJlcXVpcmluZyBzcGVjaWZpYyB0ZW1wbGF0ZSBzeW50YXguXG4gICAgLy8gQW5kIGFsc28gYWxsb3dzIGF1dG8gcGx1Z2luIGJpbmRpbmcgKGFwcCB3aWRlKSB3aXRob3V0IHRoZSBuZWVkIGZvciB0ZW1wbGF0ZSBzeW50YXguXG4gICAgY29uc3QgcGx1Z2luSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogVmlld0NvbnRhaW5lclJlZiwgdXNlVmFsdWU6IHZjUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRWxlbWVudFJlZiwgdXNlVmFsdWU6IGVsUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ2hhbmdlRGV0ZWN0b3JSZWYsIHVzZVZhbHVlOiB0aGlzLmNkciB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogaW5qZWN0b3IsXG4gICAgfSk7XG4gICAgdGhpcy5fcGx1Z2luID0gUGJsTmdyaWRQbHVnaW5Db250ZXh0LmNyZWF0ZSh0aGlzLCBwbHVnaW5JbmplY3RvciwgdGhpcy5fZXh0QXBpKTtcbiAgICBiaW5kVG9EYXRhU291cmNlKHRoaXMuX3BsdWdpbik7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUmVzaXplKCk6IHZvaWQge1xuICAgIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICAgY29uc3Qgcm8kID0gZnJvbUV2ZW50UGF0dGVybjxbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0+KFxuICAgICAgaGFuZGxlciA9PiB7XG4gICAgICAgIGlmICghcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihoYW5kbGVyKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKHJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFNraXAgdGhlIGZpcnN0IGVtaXNzaW9uXG4gICAgLy8gRGVib3VuY2UgYWxsIHJlc2l6ZXMgdW50aWwgdGhlIG5leHQgY29tcGxldGUgYW5pbWF0aW9uIGZyYW1lIHdpdGhvdXQgYSByZXNpemVcbiAgICAvLyBmaW5hbGx5IG1hcHMgdG8gdGhlIGVudHJpZXMgY29sbGVjdGlvblxuICAgIC8vIFNLSVA6ICBXZSBzaG91bGQgc2tpcCB0aGUgZmlyc3QgZW1pc3Npb24gKGBza2lwKDEpYCkgYmVmb3JlIHdlIGRlYm91bmNlLCBzaW5jZSBpdHMgY2FsbGVkIHVwb24gY2FsbGluZyBcIm9ic2VydmVcIiBvbiB0aGUgcmVzaXplT2JzZXJ2ZXIuXG4gICAgLy8gICAgICAgIFRoZSBwcm9ibGVtIGlzIHRoYXQgc29tZSBncmlkIG1pZ2h0IHJlcXVpcmUgdGhpcyBiZWNhdXNlIHRoZXkgZG8gY2hhbmdlIHNpemUuXG4gICAgLy8gICAgICAgIEFuIGV4YW1wbGUgaXMgYSBncmlkIGluIGEgbWF0LXRhYiB0aGF0IGlzIGhpZGRlbiwgdGhlIGdyaWQgd2lsbCBoaXQgdGhlIHJlc2l6ZSBvbmUgd2hlbiB3ZSBmb2N1cyB0aGUgdGFiXG4gICAgLy8gICAgICAgIHdoaWNoIHdpbGwgcmVxdWlyZSBhIHJlc2l6ZSBoYW5kbGluZyBiZWNhdXNlIGl0J3MgaW5pdGlhbCBzaXplIGlzIDBcbiAgICAvLyAgICAgICAgVG8gd29ya2Fyb3VuZCB0aGlzLCB3ZSBvbmx5IHNraXAgZWxlbWVudHMgbm90IHlldCBhZGRlZCB0byB0aGUgRE9NLCB3aGljaCBtZWFucyB0aGV5IHdpbGwgbm90IHRyaWdnZXIgYSByZXNpemUgZXZlbnQuXG4gICAgbGV0IHNraXBWYWx1ZSA9IGRvY3VtZW50LmJvZHkuY29udGFpbnModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KSA/IDEgOiAwO1xuXG4gICAgcm8kXG4gICAgICAucGlwZShcbiAgICAgICAgc2tpcChza2lwVmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICBVblJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKGFyZ3M6IFtSZXNpemVPYnNlcnZlckVudHJ5W10sIFJlc2l6ZU9ic2VydmVyXSkgPT4ge1xuICAgICAgICBpZiAoc2tpcFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgc2tpcFZhbHVlID0gMTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goIGMgPT4gYy5zaXplSW5mby51cGRhdGVTaXplKCkgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUmVzaXplKGFyZ3NbMF0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uUmVzaXplKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgdGhpcy5fdmlld3BvcnQuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB9XG4gICAgLy8gdGhpcy5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXh0QXBpKCk6IHZvaWQge1xuICAgIGxldCBvbkluaXQ6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG4gICAgY29uc3QgZXh0QXBpID0ge1xuICAgICAgZ3JpZDogdGhpcyxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGdldCBjZGtUYWJsZSgpIHsgcmV0dXJuIGV4dEFwaS5ncmlkLl9jZGtUYWJsZTsgfSxcbiAgICAgIGdldCBldmVudHMoKSB7IHJldHVybiBleHRBcGkuZ3JpZC5fcGx1Z2luLmV2ZW50cyB9LFxuICAgICAgZ2V0IGNvbnRleHRBcGkoKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29udGV4dEFwaScsIHsgdmFsdWU6IG5ldyBDb250ZXh0QXBpPFQ+KGV4dEFwaSkgfSk7XG4gICAgICAgIHJldHVybiBleHRBcGkuY29udGV4dEFwaTtcbiAgICAgIH0sXG4gICAgICBnZXQgbWV0YVJvd1NlcnZpY2UoKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWV0YVJvd1NlcnZpY2UnLCB7IHZhbHVlOiBuZXcgUGJsTmdyaWRNZXRhUm93U2VydmljZTxUPihleHRBcGkpIH0pO1xuICAgICAgICByZXR1cm4gZXh0QXBpLm1ldGFSb3dTZXJ2aWNlO1xuICAgICAgfSxcbiAgICAgIG9uSW5pdDogKGZuOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGlmIChleHRBcGkuZ3JpZC5pc0luaXQpIHtcbiAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvbkluaXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgdSA9IGV4dEFwaS5ldmVudHMuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9uSW5pdEZuIG9mIG9uSW5pdCkge1xuICAgICAgICAgICAgICAgICAgb25Jbml0Rm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIG9uSW5pdCA9IHUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkluaXQucHVzaChmbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdG9yZTogdGhpcy5fc3RvcmUsXG4gICAgICBzZXRWaWV3cG9ydDogKHZpZXdwb3J0KSA9PiB0aGlzLl92aWV3cG9ydCA9IHZpZXdwb3J0LFxuICAgICAgZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeTogKCk6IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyhEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2V4dEFwaSA9IGV4dEFwaTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBOb0RhdGEoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZikge1xuICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGZvcmNlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vRGF0YSA9IHRoaXMuX2RhdGFTb3VyY2UgJiYgdGhpcy5fZGF0YVNvdXJjZS5yZW5kZXJMZW5ndGggPT09IDA7XG4gICAgaWYgKG5vRGF0YSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1lbXB0eScpO1xuICAgIH1cblxuICAgIGlmIChub0RhdGEgfHwgZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG5vRGF0YVRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRTaW5nbGUoJ25vRGF0YScpO1xuICAgICAgaWYgKG5vRGF0YVRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIG5vRGF0YVRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIGxvY2F0aW9uID09PSAnYmVmb3JlVGFibGUnXG4gICAgICA/IHRoaXMuX3ZjUmVmQmVmb3JlVGFibGVcbiAgICAgIDogbG9jYXRpb24gPT09ICdiZWZvcmVDb250ZW50JyA/IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCA6IHRoaXMuX3ZjUmVmQWZ0ZXJDb250ZW50XG4gICAgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFBhZ2luYXRvcigpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uS2lsbEtleSA9ICdwYmxQYWdpbmF0aW9uS2lsbEtleSc7XG4gICAgY29uc3QgdXNlUGFnaW5hdGlvbiA9IHRoaXMuZHMgJiYgdGhpcy51c2VQYWdpbmF0aW9uO1xuXG4gICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuZHMucGFnaW5hdGlvbiA9IHRoaXMuX3BhZ2luYXRpb247XG4gICAgICBpZiAodGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgVW5SeC5raWxsKHRoaXMsIHBhZ2luYXRpb25LaWxsS2V5KTtcbiAgICAgIGlmICh0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgICAgY29uc3QgcGFnaW5hdG9yVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgncGFnaW5hdG9yJyk7XG4gICAgICAgIGlmIChwYWdpbmF0b3JUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIHBhZ2luYXRvclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHRoaXMuX3N0b3JlLmNvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wsICd0YWJsZUNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggY2VsbCApIHtcbiAgICAgICAgY29sLmNlbGxUcGwgPSBjZWxsLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWZhdWx0Q2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ3RhYmxlQ2VsbCcpO1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGRlZmF1bHRDZWxsVGVtcGxhdGUgPyBkZWZhdWx0Q2VsbFRlbXBsYXRlLnRSZWYgOiB0aGlzLl9mYlRhYmxlQ2VsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWRpdG9yQ2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ2VkaXRvckNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggZWRpdG9yQ2VsbCApIHtcbiAgICAgICAgY29sLmVkaXRvclRwbCA9IGVkaXRvckNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZWRpdG9yQ2VsbCcpO1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uczogQXJyYXk8UGJsQ29sdW1uIHwgUGJsTWV0YUNvbHVtblN0b3JlPiA9IFtdLmNvbmNhdCh0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgY29uc3QgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdoZWFkZXJDZWxsJykgfHwgeyB0UmVmOiB0aGlzLl9mYkhlYWRlckNlbGwgfTtcbiAgICBjb25zdCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2Zvb3RlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiRm9vdGVyQ2VsbCB9O1xuICAgIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZjxUPih0aGlzLnJlZ2lzdHJ5LCBjb2wsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2Zvb3RlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb2wuaGVhZGVyQ2VsbFRwbCA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgY29sLmZvb3RlckNlbGxUcGwgPSBmb290ZXJDZWxsRGVmLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29sLmhlYWRlcikge1xuICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuaGVhZGVyLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlci50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmhlYWRlckdyb3VwKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXJHcm91cCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICAgIGNvbC5oZWFkZXJHcm91cC50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmZvb3Rlcikge1xuICAgICAgICAgIGNvbnN0IGZvb3RlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuZm9vdGVyLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmZvb3Rlci50ZW1wbGF0ZSA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRIZWFkZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dEZWZzKSB7XG4gICAgICAvLyBUaGUgZ3JpZCBoZWFkZXIgKG1haW4sIHdpdGggY29sdW1uIG5hbWVzKSBpcyBhbHdheXMgdGhlIGxhc3Qgcm93IGRlZiAoaW5kZXggMClcbiAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCBpdCB0byBzaG93IGxhc3QgKGFmdGVyIGN1c3RvbSBoZWFkZXJzLCBncm91cCBoZWFkZXJzLi4uKSB3ZSBmaXJzdCBuZWVkIHRvIHB1bGwgaXQgYW5kIHRoZW4gcHVzaC5cblxuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgICBjb25zdCBhcnIgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLnRvQXJyYXkoKTtcbiAgICAgIGFyci5wdXNoKGFyci5zaGlmdCgpKTtcblxuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgYXJyKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb290ZXJSb3dEZWZzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMuX2Zvb3RlclJvd0RlZnMudG9BcnJheSgpKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19