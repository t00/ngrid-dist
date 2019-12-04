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
        var skipValue = document.contains(this.elRef.nativeElement) ? 1 : 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdyaWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL25ncmlkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsdUJBQXVCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5SCxPQUFPLEVBQ0wsYUFBYSxFQUNiLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFFBQVEsRUFDUix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsU0FBUyxFQUNULGFBQWEsRUFDYixpQkFBaUIsRUFDakIsV0FBVyxFQUNYLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsTUFBTSxFQUNOLFNBQVMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUMzRSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEYsT0FBTyxFQUFzRSxhQUFhLEVBQWdCLFFBQVEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWpKLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUM1QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEQsT0FBTyxFQUFhLGNBQWMsRUFBc0UsV0FBVyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ3ZJLE9BQU8sRUFBZ0QsVUFBVSxFQUEwQyxNQUFNLGlCQUFpQixDQUFDO0FBQ25JLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx3Q0FBd0MsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzNILE9BQU8sRUFBRSxTQUFTLEVBQXdCLE1BQU0sY0FBYyxDQUFDO0FBRS9ELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRTNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3hELE9BQU8sc0JBQXNCLENBQUMsQ0FBQyxvRUFBb0U7O0FBRW5HLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7QUFFN0QsTUFBTSxVQUFVLGtCQUFrQixDQUFDLElBQXdDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFDckcsTUFBTSxVQUFVLHVCQUF1QixDQUFDLElBQXlDLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7O0FBQ3RILE1BQU0sVUFBVSxxQkFBcUIsQ0FBQyxJQUF3QyxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzs7OztJQWdPckgsMkJBQVksUUFBa0IsRUFBRSxLQUF1QixFQUNuQyxLQUE4QixFQUM5QixPQUF3QixFQUN4QixNQUFjLEVBQ2QsR0FBc0IsRUFDdEIsTUFBNkIsRUFDOUIsUUFBaUMsRUFDUCxFQUFVO1FBTm5DLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBQzlCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM5QixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNQLE9BQUUsR0FBRixFQUFFLENBQVE7UUFuRDlDLHVCQUFrQixHQUFrQyxNQUFNLENBQUM7UUFFcEUsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBRWYsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBMEJ2QixXQUFNLEdBQW1CLElBQUksY0FBYyxFQUFFLENBQUM7UUFPOUMsc0JBQWlCLEdBQUcsS0FBSyxDQUFDOztZQWMxQixVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFFcEMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBSSxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7MEJBcE5VLGlCQUFpQjtJQU01QixzQkFBYSx5Q0FBVTtRQUp2Qjs7O1dBR0c7Ozs7OztRQUNILGNBQXFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQy9ELFVBQWUsS0FBYztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUg4RDtJQUFBLENBQUM7SUFVaEUsc0JBQWEseUNBQVU7UUFKdkI7OztXQUdHOzs7Ozs7UUFDSCxjQUFxQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7OztRQUMvRCxVQUFlLEtBQWM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7T0FIOEQ7SUFBQSxDQUFDO0lBU2hFLHNCQUFhLHVDQUFRO1FBSHJCOztXQUVHOzs7OztRQUNILGNBQW1DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzNELFVBQWEsS0FBYztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUgwRDtJQUFBLENBQUM7SUFtQjVELHNCQUFhLDJDQUFZO1FBSnpCLHNDQUFzQztRQUN0Qzs7V0FFRzs7Ozs7OztRQUNILGNBQXNDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ25FLFVBQWlCLEtBQWEsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BRGxDO0lBb0NuRSxzQkFBYSx5Q0FBVTtRQWhDdkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0ErQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQ0gsVUFBd0IsS0FBeUM7WUFDL0QsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFLLENBQUMsU0FBUzs7O2dCQUFFLGNBQU0sT0FBQSxLQUFLLElBQUksRUFBRSxFQUFYLENBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDM0U7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLGlDQUFFOzs7O1FBQU4sY0FBNkIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBRXhELHNCQUFhLDRDQUFhOzs7O1FBQTFCLGNBQThELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3hGLFVBQWtCLEtBQW9DO1lBQ3BELElBQUksQ0FBQyxtQkFBQSxLQUFLLEVBQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDekIsS0FBSyxHQUFHLFlBQVksQ0FBQzthQUN0QjtZQUNELElBQUssS0FBSyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUc7Z0JBQ2hDLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDdkI7UUFDSCxDQUFDOzs7T0FUdUY7SUFXeEYsc0JBQWEsK0NBQWdCOzs7O1FBQTdCLGNBQTJDLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDM0UsVUFBcUIsS0FBYztZQUNqQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssS0FBSyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2dCQUMvQixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7aUJBQ3ZDO2FBQ0Y7UUFDSCxDQUFDOzs7T0FUMEU7SUFnQjNFLHNCQUFhLDBDQUFXOzs7OztRQUF4QixVQUF5QixLQUFlO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUF1QkQsc0JBQWEsZ0RBQWlCO1FBckI5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FvQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBQ0gsY0FBMkMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzs7OztRQUM1RSxVQUFzQixLQUFhO1lBQ2pDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7YUFDakM7UUFDSCxDQUFDOzs7T0FOMkU7SUEyQjVFLHNCQUFJLDRDQUFhOzs7O1FBQWpCLGNBQXVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMxRixzQkFBSSwwQ0FBVzs7OztRQUFmLGNBQW1ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNwRixzQkFBSSwyQ0FBWTs7OztRQUFoQixjQUFxQixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFNM0csc0JBQUkseUNBQVU7Ozs7UUFBZCxjQUEwQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFM0Usc0JBQUksdUNBQVE7Ozs7UUFBWixjQUFtRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTs7OztJQWtDM0YscUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7Z0JBQ3pCLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWTtZQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxLQUFLLEVBQUU7Z0JBQ2pDLElBQUk7b0JBQ0YsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDekQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBMkMsS0FBSyxxRUFBa0UsQ0FBQyxDQUFDO2lCQUNySTthQUNGO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7O2dCQUNqQixXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFOztnQkFDckMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNyRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBRTNCLGdKQUFnSjtnQkFDaEosSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7Z0JBQ2pDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQzthQUNqQztTQUNGO0lBQ0gsQ0FBQzs7OztJQUVELDhDQUFrQjs7O0lBQWxCO1FBQUEsaUJBZ0NDO1FBL0JDLDJHQUEyRztRQUMzRyx5SEFBeUg7UUFDekgsdUhBQXVIO1FBQ3ZILHVHQUF1RztRQUN2RyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxPQUFPOzs7Z0JBQ2xDLFFBQVEsR0FBRyxLQUFLOztnQkFDaEIsZ0JBQWdCLEdBQUcsS0FBSzs7Z0JBQzVCLEtBQWdCLElBQUEsWUFBQSxpQkFBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7b0JBQXBCLElBQU0sQ0FBQyxvQkFBQTtvQkFDVixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQ2QsS0FBSyxXQUFXOzRCQUNkLFFBQVEsR0FBRyxJQUFJLENBQUM7NEJBQ2hCLE1BQU07d0JBQ1IsS0FBSyxZQUFZLENBQUM7d0JBQ2xCLEtBQUssWUFBWTs0QkFDZixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7NEJBQ3hCLE1BQU07d0JBQ1IsS0FBSyxRQUFROzRCQUNYLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzs0QkFDbkIsTUFBTTt3QkFDUixLQUFLLFdBQVc7NEJBQ2QsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzRCQUN0QixNQUFNO3FCQUNUO2lCQUNGOzs7Ozs7Ozs7WUFDRCxJQUFJLFFBQVEsRUFBRTtnQkFDWixLQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQzthQUNsQztZQUNELElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLEtBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO2FBQ3hDO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7O0lBRUQsMkNBQWU7OztJQUFmO1FBQUEsaUJBK0JDO1FBOUJDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7WUFHaEIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsd0dBQXdHO1FBQ3hHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWTthQUN6QixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ2YsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFOztvQkFDUixVQUFVLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3JFLElBQUksVUFBVSxFQUFFOzt3QkFDUixJQUFJLEdBQUcsbUJBQUEsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQXdCO29CQUNsRyxJQUFJLElBQUksRUFBRTs7NEJBQ0YsYUFBYSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7OzRCQUN6RixXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQzt3QkFDdkYsSUFBSSxXQUFXLEVBQUU7NEJBQ2YsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO3lCQUNyQjtxQkFDRjtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjs7WUFDNUIsY0FBYyxHQUFHLEtBQUs7UUFFMUIsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1NBQ3JEO1FBRUQsSUFBSyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUc7WUFDcEMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUVELElBQUssY0FBYyxLQUFLLElBQUksRUFBRztZQUM3QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7SUFFRCx1Q0FBVzs7O0lBQVg7UUFBQSxpQkFlQzs7WUFkTyxPQUFPOzs7UUFBRztZQUNkLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkIsSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixLQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ2pDO1FBQ0gsQ0FBQyxDQUFBOztZQUVHLENBQWdCO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJOzs7O1lBQUUsVUFBQyxFQUFpQixJQUFLLE9BQUEsQ0FBQyxHQUFHLEVBQUUsRUFBTixDQUFNLENBQUEsRUFBRSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLEVBQUU7WUFDTCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQzthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7Ozs7OztJQUVELG1DQUFPOzs7OztJQUFQLFVBQVEsS0FBYSxFQUFFLElBQU87UUFDNUIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7Ozs7O0lBcUJELG1DQUFPOzs7Ozs7SUFBUCxVQUFRLGlCQUFnRCxFQUFFLElBQTZCLEVBQUUsVUFBa0I7UUFBbEIsMkJBQUEsRUFBQSxrQkFBa0I7UUFDekcsSUFBSSxDQUFDLGlCQUFpQixJQUFJLE9BQU8saUJBQWlCLEtBQUssU0FBUyxFQUFFO1lBQ2hFLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3JDLE9BQU87U0FDUjs7WUFFRyxNQUFpQjtRQUNyQixJQUFJLE9BQU8saUJBQWlCLEtBQUssUUFBUSxFQUFFO1lBQ3pDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxpQkFBaUIsQ0FBQyxFQUFoRixDQUFnRixFQUFFLENBQUM7WUFDM0gsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUUsRUFBRTtnQkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyx3Q0FBcUMsaUJBQWlCLFFBQUksQ0FBQyxDQUFDO2dCQUN6RSxPQUFPO2FBQ1I7U0FDRjthQUFNO1lBQ0wsTUFBTSxHQUFHLGlCQUFpQixDQUFDO1NBQzVCO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM1QyxDQUFDOzs7Ozs7SUFzQkQscUNBQVM7Ozs7O0lBQVQsVUFBVSxLQUE2QixFQUFFLE9BQWdDOztRQUN2RSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztnQkFDcEIsZUFBZSxTQUFhO1lBQ2hDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQzVELGVBQWUsR0FBRyxFQUFFLENBQUM7d0NBQ1YsS0FBSzs7d0JBQ1IsTUFBTSxHQUFHLE9BQUssTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJOzs7O29CQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBOUMsQ0FBOEMsRUFBRTtvQkFDOUYsSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTLEVBQUUsRUFBRTt3QkFDMUIsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBb0MsS0FBSyxXQUFLLEtBQUssUUFBSSxDQUFDLENBQUM7O3FCQUV2RTtvQkFDRCxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O29CQU4vQixLQUFvQixJQUFBLFlBQUEsaUJBQUEsT0FBTyxDQUFBLGdDQUFBO3dCQUF0QixJQUFNLEtBQUssb0JBQUE7OENBQUwsS0FBSzs7O3FCQU9mOzs7Ozs7Ozs7YUFDRjtpQkFBTTtnQkFDTCxlQUFlLEdBQUcsbUJBQUEsT0FBTyxFQUFPLENBQUM7YUFDbEM7WUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDOzs7OztJQUVELHlDQUFhOzs7O0lBQWIsVUFBYyxLQUF1QjtRQUFyQyxpQkE2RkM7UUE1RkMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixzREFBc0Q7WUFDdEQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDbkM7O2dCQUVLLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVztZQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxtQkFBQSxLQUFLLEVBQU8sQ0FBQztZQUV6QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV4QixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxjQUFjO2dCQUNwQixJQUFJLE1BQUE7Z0JBQ0osSUFBSSxFQUFFLEtBQUs7YUFDWixDQUFDLENBQUM7WUFFSCxJQUFLLEtBQUssRUFBRztnQkFDWCxJQUFJLFNBQVMsRUFBRSxFQUFFO29CQUNmLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDOUU7Z0JBRUQsNkZBQTZGO2dCQUM3RixtR0FBbUc7Z0JBQ25HLDRIQUE0SDtnQkFDNUgsdUJBQXVCO2dCQUN2QixLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7Z0JBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUEvQixDQUErQixFQUFFLENBQUM7Z0JBRWxHLDBEQUEwRDtnQkFDMUQsS0FBSyxDQUFDLG9CQUFvQjtxQkFDdkIsSUFBSSxDQUNILE1BQU07Ozs7Z0JBQUUsVUFBQyxFQUFPO3dCQUFOLGdCQUFLO29CQUFNLE9BQUEsQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQTVGLENBQTRGLEVBQUM7Z0JBQ2xILGlFQUFpRTtnQkFDakUsc0NBQXNDO2dCQUN0Qyx5RUFBeUU7Z0JBQ3pFLEdBQUc7OztnQkFBRSxjQUFNLE9BQUEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBdkQsQ0FBdUQsRUFBRSxFQUNwRSxTQUFTOzs7Z0JBQUUsY0FBTSxPQUFBLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQXRFLENBQXNFLEVBQUUsRUFDekYsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUN4QixJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUNsQjtxQkFDQSxTQUFTOzs7O2dCQUFFLFVBQUEsb0JBQW9COzs7b0JBR3RCLElBQUEsaUNBQVE7b0JBQ2hCLElBQUksb0JBQW9CLEtBQUssS0FBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUU7d0JBQ2pELFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3pCO3lCQUFNO3dCQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUNsQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDbkM7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7Z0JBRUwsMkJBQTJCO2dCQUMzQixvQ0FBb0M7Z0JBQ3BDLEtBQUssQ0FBQyxxQkFBcUI7cUJBQ3hCLElBQUksQ0FDSCxHQUFHOzs7Z0JBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFwQixDQUFvQixFQUFFLEVBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFDZixRQUFRLEVBQUUsRUFDVixHQUFHOzs7O2dCQUFFLFVBQUMsRUFBWTt3QkFBWiwwQkFBWSxFQUFYLFlBQUksRUFBRSxZQUFJOzt3QkFDVCxhQUFhLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxtQkFBbUI7b0JBQ2hELElBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFHO3dCQUNuRSxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBQ3BCO2dCQUNILENBQUMsRUFBQyxFQUNGLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLHNEQUFzRDtnQkFDMUYsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FDbEI7cUJBQ0EsU0FBUzs7O2dCQUFDOzt3QkFDSCxFQUFFLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsYUFBYTtvQkFDakQsSUFBSSxLQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksS0FBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsRUFBRTs7NEJBQ3JELENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFLENBQUM7d0JBQ3ZGLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQy9CO3lCQUFNO3dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxJQUFJLENBQUM7d0JBQ3RHLDRHQUE0Rzt3QkFDNUcsOEVBQThFO3dCQUU5RSw2QkFBNkI7d0JBQzdCLDZEQUE2RDt3QkFFN0Qsd0dBQXdHO3dCQUN4RyxtQkFBbUI7cUJBQ3BCO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ047U0FDRjtJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7SUFDSCw2Q0FBaUI7Ozs7SUFBakI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7O1lBRXRELFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsc0NBQXNDO1FBRXpGLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQywrQkFBK0IsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDcEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFekIsNEZBQTRGO1FBQzVGLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQWdDRztRQUNILElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDO1NBQzdFO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7Ozs7OztJQUNILDZDQUFpQjs7Ozs7SUFBakI7UUFDRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsZ0RBQW9COzs7OztJQUFwQixVQUFxQixpQkFBMkM7O1FBQzlELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixpQkFBaUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDOUQ7Z0NBTVUsQ0FBQzs7Ozs7O2dCQUtKLFlBQVksR0FBRyxPQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztZQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQTNCLENBQTJCLEVBQUMsQ0FBQyxHQUFHOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsRUFBRTtZQUN6RyxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztvQkFDckIsVUFBVSxHQUFHLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7Z0JBQzNELENBQUMsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO2dCQUN4QixDQUFDLENBQUMsV0FBVyxDQUFJLFVBQVUsT0FBSSxDQUFDLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsQ0FBQyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7Ozs7WUFqQkgsMEZBQTBGO1lBQzFGLDBGQUEwRjtZQUMxRixzSEFBc0g7WUFDdEgsaUhBQWlIO1lBQ2pILEtBQWdCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUEsZ0JBQUE7Z0JBQTFDLElBQU0sQ0FBQyxXQUFBO3dCQUFELENBQUM7YUFjWDs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Ozs7SUFFRCx5Q0FBYTs7OztJQUFiLFVBQWMsT0FBcUI7UUFBbkMsaUJBd0NDO1FBdkNDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDL0I7UUFFRCxrQ0FBa0M7UUFDbEMsc0ZBQXNGO1FBQ3RGLGlJQUFpSTtRQUNqSSxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsT0FBTztTQUNSOzs7WUFHSyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsRUFBRTtRQUN6RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFcEMsbUNBQW1DO1FBQ25DLElBQUksUUFBUSxDQUFDLGVBQWUsS0FBSyxDQUFDLEVBQUU7WUFDbEMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRzs7OztZQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsNkZBQTZGO1FBQzdGLElBQUksUUFBUSxDQUFDLG1CQUFtQixFQUFFO1lBQ2hDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5RixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUc7WUFDM0IsbURBQW1EO1lBQ25ELHNFQUFzRTtZQUN0RSxpRkFBaUY7WUFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztTQUNwRDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRzs7O1FBQUU7WUFDZixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsQyxLQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7Ozs7Ozs7O0lBQ0gsc0NBQVU7Ozs7Ozs7OztJQUFWLFVBQWMsUUFBMEQsRUFBRSxXQUEyQixFQUFFLE9BQVcsRUFBRSxLQUFjOztZQUMxSCxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQzs7WUFDdkMsSUFBSSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQztRQUNsRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7Ozs7O09BS0c7Ozs7Ozs7SUFDSCxzQ0FBVTs7Ozs7O0lBQVYsVUFBVyxJQUEwQixFQUFFLFFBQTBEOztZQUN6RixLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQzs7WUFDdkMsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQy9CLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNO1lBQ0wsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsK0NBQW1COzs7OztJQUFuQixVQUFvQixPQUE4QjtRQUMxQyxJQUFBLGtCQUEwQyxFQUF4QywwQkFBVSxFQUFFLDBCQUE0QjtRQUVoRCwyRkFBMkY7UUFDM0Ysc0hBQXNIO1FBQ3RILElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRixDQUFDOzs7O0lBRUQsZ0RBQW9COzs7SUFBcEI7O1lBQ00sVUFBdUI7UUFDM0IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFOztnQkFDNUMsT0FBTyxHQUFHLG1CQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQXdCO1lBQ3RGLFVBQVUsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkFDNUIsTUFBTSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU07WUFDbEQsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDbkMsVUFBVSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDOUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUF3QixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDMUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUNqRDtZQUNELFVBQVUsR0FBRyxtQkFBQSxVQUFVLENBQUMsa0JBQWtCLEVBQWUsQ0FBQztZQUMxRCxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O2dCQUN4QixNQUFNLEdBQUcsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTTtZQUNsRCxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbEMsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxvQ0FBUTs7OztJQUFSOztRQUFTLGFBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQix3QkFBZ0I7OztZQUN2QixLQUFnQixJQUFBLFFBQUEsaUJBQUEsR0FBRyxDQUFBLHdCQUFBLHlDQUFFO2dCQUFoQixJQUFNLENBQUMsZ0JBQUE7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzQzs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Ozs7SUFFRCx1Q0FBVzs7OztJQUFYOztRQUFZLGFBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQix3QkFBZ0I7OztZQUMxQixLQUFnQixJQUFBLFFBQUEsaUJBQUEsR0FBRyxDQUFBLHdCQUFBLHlDQUFFO2dCQUFoQixJQUFNLENBQUMsZ0JBQUE7Z0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM5Qzs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Ozs7Ozs7SUFFTyx1Q0FBVzs7Ozs7OztJQUFuQixVQUFvQixRQUFrQixFQUFFLEtBQXNCLEVBQUUsS0FBdUI7Ozs7Ozs7WUFNL0UsY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDckMsU0FBUyxFQUFFO2dCQUNULEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7Z0JBQzlDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFO2dCQUN4QyxFQUFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTthQUNuRDtZQUNELE1BQU0sRUFBRSxRQUFRO1NBQ2pCLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7SUFFTywwQ0FBYzs7OztJQUF0QjtRQUFBLGlCQTBDQzs7WUF6Q0ssY0FBOEI7O1lBQzVCLEdBQUcsR0FBRyxnQkFBZ0I7Ozs7UUFDMUIsVUFBQSxPQUFPO1lBQ0wsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUM3QyxjQUFjLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDOzs7O1FBQ0QsVUFBQSxPQUFPO1lBQ0wsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLGNBQWMsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbkQsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM1QixjQUFjLEdBQUcsU0FBUyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxFQUNGOzs7Ozs7Ozs7O1lBVUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5FLEdBQUc7YUFDQSxJQUFJLENBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUNmLFlBQVksQ0FBQyxDQUFDLEVBQUUsdUJBQXVCLENBQUMsRUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNYO2FBQ0EsU0FBUzs7OztRQUFFLFVBQUMsSUFBNkM7WUFDeEQsSUFBSSxTQUFTLEtBQUssQ0FBQyxFQUFFO2dCQUNuQixTQUFTLEdBQUcsQ0FBQyxDQUFDOztvQkFDUixPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPO2dCQUNuQyxPQUFPLENBQUMsT0FBTzs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQXZCLENBQXVCLEVBQUUsQ0FBQzthQUNqRDtZQUNELEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7Ozs7SUFFTyxvQ0FBUTs7Ozs7SUFBaEIsVUFBaUIsT0FBOEI7UUFDN0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUNwQztRQUNELDRCQUE0QjtRQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7Ozs7SUFFTyxzQ0FBVTs7OztJQUFsQjtRQUFBLGlCQXdDQzs7WUF2Q0ssTUFBTSxHQUFzQixFQUFFOztZQUM1QixNQUFNLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWE7Ozs7WUFDakMsSUFBSSxRQUFRLEtBQUssT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7WUFDaEQsSUFBSSxNQUFNLEtBQUssT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUEsQ0FBQyxDQUFDOzs7O1lBQ2xELElBQUksVUFBVTtnQkFDWixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxVQUFVLENBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRixPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7OztZQUNELElBQUksY0FBYztnQkFDaEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxzQkFBc0IsQ0FBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hHLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQztZQUMvQixDQUFDO1lBQ0QsTUFBTTs7OztZQUFFLFVBQUMsRUFBYztnQkFDckIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDdEIsRUFBRSxFQUFFLENBQUM7aUJBQ047cUJBQU07b0JBQ0wsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7NEJBQ25CLEdBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7d0JBQUUsVUFBQSxDQUFDOzs0QkFDaEMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTs7b0NBQ3ZCLEtBQXVCLElBQUEsV0FBQSxpQkFBQSxNQUFNLENBQUEsOEJBQUEsa0RBQUU7d0NBQTFCLElBQU0sUUFBUSxtQkFBQTt3Q0FDakIsUUFBUSxFQUFFLENBQUM7cUNBQ1o7Ozs7Ozs7OztnQ0FDRCxHQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Z0NBQ2hCLE1BQU0sR0FBRyxHQUFDLEdBQUcsU0FBUyxDQUFDOzZCQUN4Qjt3QkFDSCxDQUFDLEVBQUM7cUJBQ0g7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDakI7WUFDSCxDQUFDLENBQUE7WUFDRCxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU07WUFDeEIsV0FBVzs7OztZQUFFLFVBQUMsUUFBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLEVBQXpCLENBQXlCLENBQUE7WUFDcEQseUJBQXlCOzs7WUFBRTtnQkFDekIsT0FBTyxJQUFJLHVCQUF1QixDQUFDLHdDQUF3QyxDQUFDLENBQUM7WUFDL0UsQ0FBQyxDQUFBO1NBQ0Y7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFTyx1Q0FBVzs7Ozs7SUFBbkIsVUFBb0IsS0FBZTtRQUNqQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO1lBQ25CLE9BQU87U0FDUjs7WUFFSyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksS0FBSyxDQUFDO1FBQ3RFLElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLE1BQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFOztnQkFDdEIsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUN4RCxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDMUc7U0FDRjtJQUNILENBQUM7Ozs7OztJQUVPLDRDQUFnQjs7Ozs7SUFBeEIsVUFBeUIsUUFBMEQ7UUFDakYsT0FBTyxRQUFRLEtBQUssYUFBYTtZQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQjtZQUN4QixDQUFDLENBQUMsUUFBUSxLQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQ3BGO0lBQ0gsQ0FBQzs7Ozs7SUFFTywwQ0FBYzs7OztJQUF0Qjs7WUFDUSxpQkFBaUIsR0FBRyxzQkFBc0I7O1lBQzFDLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxhQUFhO1FBRW5ELElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDdEMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQzthQUN4RDtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUNuQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxzQkFBc0IsR0FBRyxTQUFTLENBQUM7YUFDekM7WUFDRCxJQUFJLGFBQWEsRUFBRTs7b0JBQ1gsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO2dCQUM5RCxJQUFJLGlCQUFpQixFQUFFO29CQUNyQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7aUJBQzdHO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8scURBQXlCOzs7O0lBQWpDOzs7WUFDRSxLQUFrQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWxDLElBQU0sR0FBRyxXQUFBOztvQkFDTixJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUM7Z0JBQy9ELElBQUssSUFBSSxFQUFHO29CQUNWLEdBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDekI7cUJBQU07O3dCQUNDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQztvQkFDdEUsR0FBRyxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUNsRjs7b0JBRUssVUFBVSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDO2dCQUN0RSxJQUFLLFVBQVUsRUFBRztvQkFDaEIsR0FBRyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2lCQUNqQztxQkFBTTs7d0JBQ0MsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDO29CQUN2RSxHQUFHLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDNUU7YUFDRjs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Ozs7SUFFTywyREFBK0I7Ozs7SUFBdkM7OztZQUNRLE9BQU8sR0FBMEMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzs7WUFDeEcseUJBQXlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTs7WUFDdkcseUJBQXlCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRTs7WUFDN0csS0FBa0IsSUFBQSxZQUFBLGlCQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtnQkFBdEIsSUFBTSxHQUFHLG9CQUFBO2dCQUNaLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFOzt3QkFDZCxhQUFhLEdBQUcsV0FBVyxDQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSx5QkFBeUI7O3dCQUNuRyxhQUFhLEdBQUcsV0FBVyxDQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSx5QkFBeUI7b0JBQ3pHLEdBQUcsQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztvQkFDdkMsR0FBRyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO2lCQUN4QztxQkFBTTtvQkFDTCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7OzRCQUNSLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsSUFBSSx5QkFBeUI7d0JBQzdHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7cUJBQzFDO29CQUNELElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRTs7NEJBQ2IsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLHlCQUF5Qjt3QkFDbEgsR0FBRyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztxQkFDL0M7b0JBQ0QsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFOzs0QkFDUixhQUFhLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUkseUJBQXlCO3dCQUM3RyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO3FCQUMxQztpQkFDRjthQUNGOzs7Ozs7Ozs7SUFDSCxDQUFDOzs7OztJQUVPLDhDQUFrQjs7OztJQUExQjs7UUFDRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsaUZBQWlGO1lBQ2pGLG1IQUFtSDtZQUVuSCxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLENBQUM7O2dCQUM5QixHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7WUFDekMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7Z0JBRXRCLEtBQXFCLElBQUEsUUFBQSxpQkFBQSxHQUFHLENBQUEsd0JBQUEseUNBQUU7b0JBQXJCLElBQU0sTUFBTSxnQkFBQTtvQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEM7Ozs7Ozs7OztTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTyw4Q0FBa0I7Ozs7SUFBMUI7O1FBQ0UsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7Z0JBQ3BDLEtBQXFCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFBLGdCQUFBLDRCQUFFO29CQUEvQyxJQUFNLE1BQU0sV0FBQTtvQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEM7Ozs7Ozs7OztTQUNGO0lBQ0gsQ0FBQzs7O2dCQTd3QnFCLFFBQVE7Z0JBQVMsZ0JBQWdCO2dCQUM1QixVQUFVO2dCQUNSLGVBQWU7Z0JBQ2hCLE1BQU07Z0JBQ1QsaUJBQWlCO2dCQUNkLHFCQUFxQjtnQkFDcEIsdUJBQXVCOzs7O2dCQXBPckQsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixnN01BQXFDO29CQUVyQyxTQUFTLEVBQUU7d0JBQ1QsdUJBQXVCO3dCQUN2Qjs0QkFDRSxPQUFPLEVBQUUsd0JBQXdCOzRCQUNqQyxVQUFVLEVBQUUsdUJBQXVCOzRCQUNuQyxJQUFJLEVBQUUsQ0FBQyxVQUFVOzs7Z0NBQUMsY0FBTSxPQUFBLG1CQUFpQixFQUFqQixDQUFpQixFQUFDLENBQUM7eUJBQzVDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixVQUFVLEVBQUUsa0JBQWtCOzRCQUM5QixJQUFJLEVBQUUsQ0FBQyxVQUFVOzs7Z0NBQUMsY0FBTSxPQUFBLG1CQUFpQixFQUFqQixDQUFpQixFQUFDLENBQUM7eUJBQzVDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxzQkFBc0I7NEJBQy9CLFVBQVUsRUFBRSxxQkFBcUI7NEJBQ2pDLElBQUksRUFBRSxDQUFDLFVBQVU7OztnQ0FBQyxjQUFNLE9BQUEsbUJBQWlCLEVBQWpCLENBQWlCLEVBQUMsQ0FBQzt5QkFDNUM7cUJBQ0Y7b0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBeEVDLFFBQVE7Z0JBWVIsZ0JBQWdCO2dCQWRoQixVQUFVO2dCQWlCYSxlQUFlO2dCQUR0QyxNQUFNO2dCQUpOLGlCQUFpQjtnQkF1QlYscUJBQXFCO2dCQURyQix1QkFBdUI7NkNBcVBqQixTQUFTLFNBQUMsSUFBSTs7OzZCQXJNMUIsS0FBSzs2QkFVTCxLQUFLOzJCQVNMLEtBQUs7NEJBYUwsS0FBSzsrQkFNTCxLQUFLOzZCQW9DTCxLQUFLO2dDQVVMLEtBQUs7bUNBV0wsS0FBSzswQkFjTCxLQUFLOzhCQUVMLEtBQUs7b0NBMEJMLEtBQUs7aUNBUUwsS0FBSztxQ0FDTCxLQUFLO29DQVFMLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtzQ0FDakUsU0FBUyxTQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO3FDQUNuRSxTQUFTLFNBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7K0JBQ2xFLFNBQVMsU0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0NBQzVELFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0NBQzdELFNBQVMsU0FBQyxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7K0JBQzdELFNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2lDQUNyQyxZQUFZLFNBQUMsZUFBZTtpQ0FDNUIsWUFBWSxTQUFDLGVBQWU7Ozs7O0lBeEtsQixpQkFBaUI7UUFEN0IsSUFBSSxFQUFFO2lEQXFNaUIsUUFBUSxFQUFTLGdCQUFnQjtZQUM1QixVQUFVO1lBQ1IsZUFBZTtZQUNoQixNQUFNO1lBQ1QsaUJBQWlCO1lBQ2QscUJBQXFCO1lBQ3BCLHVCQUF1QjtPQTFNekMsaUJBQWlCLENBazlCN0I7SUFBRCx3QkFBQztDQUFBLElBQUE7U0FsOUJZLGlCQUFpQjs7O0lBVTVCLHdDQUFxQjs7SUFVckIsd0NBQXFCOztJQVNyQixzQ0FBbUI7Ozs7Ozs7OztJQVNuQixzQ0FBcUU7Ozs7O0lBUXJFLDJDQUErQjs7Ozs7SUFxRS9CLG9DQUFrRTs7SUFvQ2xFLDJDQUEySTs7SUFDM0ksK0NBQW9FOztJQUVwRSxxQ0FBc0I7O0lBQ3RCLHNDQUF1Qjs7Ozs7SUFFdkIsK0NBQStCOzs7OztJQUMvQix3Q0FBc0M7O0lBRXRDLDhDQUF3Rzs7SUFDeEcsZ0RBQTRHOztJQUM1RywrQ0FBMEc7O0lBQzFHLHlDQUFpSDs7SUFDakgsMENBQXVIOztJQUN2SCwwQ0FBdUg7O0lBQ3ZILHlDQUFtRTs7SUFDbkUsMkNBQTBFOztJQUMxRSwyQ0FBMEU7Ozs7O0lBUTFFLG1DQUF5Qjs7SUFDekIsc0NBQWlDOztJQUtqQyxzQ0FBbUM7Ozs7O0lBQ25DLG1DQUFzRDs7Ozs7SUFDdEQsOENBQW1DOzs7OztJQUNuQyx5Q0FBK0I7Ozs7O0lBQy9CLDJDQUErQzs7Ozs7SUFDL0MsZ0RBQWtEOzs7OztJQUNsRCxtREFBcUQ7Ozs7O0lBQ3JELHdDQUFtRDs7Ozs7SUFDbkQsOENBQWtDOzs7OztJQUNsQyw2Q0FBaUM7Ozs7O0lBQ2pDLHNDQUF5RDs7Ozs7SUFDekQsb0NBQXVDOzs7OztJQUN2QyxvQ0FBeUM7Ozs7O0lBRzdCLGtDQUFzQzs7Ozs7SUFDdEMsb0NBQWdDOzs7OztJQUNoQyxtQ0FBc0I7Ozs7O0lBQ3RCLGdDQUE4Qjs7Ozs7SUFDOUIsbUNBQXFDOztJQUNyQyxxQ0FBd0M7O0lBQ3hDLCtCQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuaW1wb3J0IHsgYXNhcFNjaGVkdWxlciwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIGZyb21FdmVudFBhdHRlcm4gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZSwgdGFwLCBvYnNlcnZlT24sIHN3aXRjaE1hcCwgbWFwLCBtYXBUbywgc3RhcnRXaXRoLCBwYWlyd2lzZSwgZGVib3VuY2VUaW1lLCBza2lwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgSW5qZWN0b3IsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBBZnRlckNvbnRlbnRJbml0LFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRW1iZWRkZWRWaWV3UmVmLFxuICBOZ1pvbmUsXG4gIGlzRGV2TW9kZSwgZm9yd2FyZFJlZiwgSXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlciwgRG9DaGVjaywgQXR0cmlidXRlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5LCBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDZGtIZWFkZXJSb3dEZWYsIENka0Zvb3RlclJvd0RlZiwgQ2RrUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQgeyBFWFRfQVBJX1RPS0VOLCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRQYWdpbmF0b3JLaW5kIH0gZnJvbSAnLi4vcGFnaW5hdG9yJztcbmltcG9ydCB7IERhdGFTb3VyY2VQcmVkaWNhdGUsIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsRGF0YVNvdXJjZSwgRGF0YVNvdXJjZU9mLCBjcmVhdGVEUyB9IGZyb20gJy4uL2RhdGEtc291cmNlL2luZGV4JztcbmltcG9ydCB7IFBibENka1RhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9wYmwtY2RrLXRhYmxlL3BibC1jZGstdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IHJlc2V0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBmaW5kQ2VsbERlZiB9IGZyb20gJy4vZGlyZWN0aXZlcy9jZWxsLWRlZic7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIFBibENvbHVtblN0b3JlLCBQYmxNZXRhQ29sdW1uU3RvcmUsIFBibE5ncmlkQ29sdW1uU2V0LCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsIGlzUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW5zJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBDb250ZXh0QXBpLCBQYmxOZ3JpZENvbnRleHRBcGksIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljLCBEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZIH0gZnJvbSAnLi9jb2wtd2lkdGgtbG9naWMvZHluYW1pYy1jb2x1bW4td2lkdGgnO1xuaW1wb3J0IHsgQ29sdW1uQXBpLCBBdXRvU2l6ZVRvRml0T3B0aW9ucyB9IGZyb20gJy4vY29sdW1uLWFwaSc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvd3MvaW5kZXgnO1xuXG5pbXBvcnQgeyBiaW5kVG9EYXRhU291cmNlIH0gZnJvbSAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnO1xuaW1wb3J0ICcuL2JpbmQtdG8tZGF0YXNvdXJjZSc7IC8vIExFQVZFIFRISVMsIFdFIE5FRUQgSVQgU08gVEhFIEFVR01FTlRBVElPTiBJTiBUSEUgRklMRSBXSUxMIExPQUQuXG5cbmltcG9ydCB7IHNldElkZW50aXR5UHJvcCB9IGZyb20gJy4vbmdyaWQuZGVwcmVjYXRlLWF0LTEuMC4wJztcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVybmFsQXBpRmFjdG9yeShncmlkOiB7IF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpOyB9KSB7IHJldHVybiBncmlkLl9leHRBcGk7IH1cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW5Db250cm9sbGVyRmFjdG9yeShncmlkOiB7IF9wbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dDsgfSkgeyByZXR1cm4gZ3JpZC5fcGx1Z2luLmNvbnRyb2xsZXI7IH1cbmV4cG9ydCBmdW5jdGlvbiBtZXRhUm93U2VydmljZUZhY3RvcnkoZ3JpZDogeyBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTsgfSkgeyByZXR1cm4gZ3JpZC5fZXh0QXBpLm1ldGFSb3dTZXJ2aWNlOyB9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3JpZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi9uZ3JpZC5jb21wb25lbnQuc2NzcycgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgdXNlRmFjdG9yeTogcGx1Z2luQ29udHJvbGxlckZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogRVhUX0FQSV9UT0tFTixcbiAgICAgIHVzZUZhY3Rvcnk6IGludGVybmFsQXBpRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogbWV0YVJvd1NlcnZpY2VGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBoZWFkZXIgcm93LlxuICAgKiBEZWZhdWx0OiB0cnVlXG4gICAqL1xuICBASW5wdXQoKSBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dIZWFkZXI7IH07XG4gIHNldCBzaG93SGVhZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3Nob3dIZWFkZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3cvSGlkZSB0aGUgZm9vdGVyIHJvdy5cbiAgICogRGVmYXVsdDogZmFsc2VcbiAgICovXG4gIEBJbnB1dCgpIGdldCBzaG93Rm9vdGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0Zvb3RlcjsgfTtcbiAgc2V0IHNob3dGb290ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93Rm9vdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2hvd0Zvb3RlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB0aGUgZmlsbGVyIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG5vRmlsbGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbm9GaWxsZXI7IH07XG4gIHNldCBub0ZpbGxlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX25vRmlsbGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfbm9GaWxsZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldCdzIHRoZSBiZWhhdmlvciBvZiB0aGUgZ3JpZCB3aGVuIHRhYmJpbmcuXG4gICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIG5vbmUgKHJvd3MgYW5kIGNlbGxzIGFyZSBub3QgZm9jdXNhYmxlKVxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGZvY3VzIG1vZGUgaGFzIGFuIGVmZmVjdCBvbiBvdGhlciBmdW5jdGlvbnMsIGZvciBleGFtcGxlIGEgZGV0YWlsIHJvdyB3aWxsIHRvZ2dsZSAob3Blbi9jbG9zZSkgdXNpbmdcbiAgICogRU5URVIgLyBTUEFDRSBvbmx5IHdoZW4gZm9jdXNNb2RlIGlzIHNldCB0byBgcm93YC5cbiAgICovXG4gIEBJbnB1dCgpIGZvY3VzTW9kZTogJ3JvdycgfCAnY2VsbCcgfCAnbm9uZScgfCAnJyB8IGZhbHNlIHwgdW5kZWZpbmVkO1xuXG4gIC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIGluIDEuMC4wXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYHBJbmRleGAgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLiAoUmVtb3ZlZCBpbiAxLjAuMClcbiAgICovXG4gIEBJbnB1dCgpIGdldCBpZGVudGl0eVByb3AoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX19pZGVudGl0eVByb3A7IH1cbiAgc2V0IGlkZW50aXR5UHJvcCh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuX19pZGVudGl0eVByb3AgPSB2YWx1ZTsgc2V0SWRlbnRpdHlQcm9wKHRoaXMuX3N0b3JlLCB2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfX2lkZW50aXR5UHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZ3JpZCdzIHNvdXJjZSBvZiBkYXRhXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIFRoZSBncmlkJ3Mgc291cmNlIG9mIGRhdGEsIHdoaWNoIGNhbiBiZSBwcm92aWRlZCBpbiAyIHdheXM6XG4gICAqXG4gICAqIC0gRGF0YVNvdXJjZU9mPFQ+XG4gICAqIC0gUGJsRGF0YVNvdXJjZTxUPlxuICAgKlxuICAgKiBUaGUgZ3JpZCBvbmx5IHdvcmtzIHdpdGggYFBibERhdGFTb3VyY2U8VD5gLCBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBhIHNob3J0Y3V0IGZvciBwcm92aWRpbmdcbiAgICogdGhlIGRhdGEgYXJyYXkgZGlyZWN0bHkuXG4gICAqXG4gICAqIGBEYXRhU291cmNlT2Y8VD5gIGNhbiBiZTpcbiAgICpcbiAgICogLSBTaW1wbGUgZGF0YSBhcnJheSAoZWFjaCBvYmplY3QgcmVwcmVzZW50cyBvbmUgZ3JpZCByb3cpXG4gICAqIC0gUHJvbWlzZSBmb3IgYSBkYXRhIGFycmF5XG4gICAqIC0gU3RyZWFtIHRoYXQgZW1pdHMgYSBkYXRhIGFycmF5IGVhY2ggdGltZSB0aGUgYXJyYXkgY2hhbmdlc1xuICAgKlxuICAgKiBXaGVuIGEgYERhdGFTb3VyY2VPZjxUPmAgaXMgcHJvdmlkZWQgaXQgaXMgY29udmVydGVkIGludG8gYW4gaW5zdGFuY2Ugb2YgYFBibERhdGFTb3VyY2U8VD5gLlxuICAgKlxuICAgKiBUbyBhY2Nlc3MgdGhlIGBQYmxEYXRhU291cmNlPFQ+YCBpbnN0YW5jZSB1c2UgdGhlIGBkc2AgcHJvcGVydHkgKHJlYWRvbmx5KS5cbiAgICpcbiAgICogSXQgaXMgaGlnaGx5IHJlY29tbWVuZGVkIHRvIHVzZSBgUGJsRGF0YVNvdXJjZTxUPmAgZGlyZWN0bHksIHRoZSBkYXRhc291cmNlIGZhY3RvcnkgbWFrZXMgaXQgZWFzeS5cbiAgICogRm9yIGV4YW1wbGUsIHdoZW4gYW4gYXJyYXkgaXMgcHJvdmlkZWQgdGhlIGZhY3RvcnkgaXMgdXNlZCB0byBjb252ZXJ0IGl0IHRvIGEgZGF0YXNvdXJjZTpcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBjb2xsZWN0aW9uOiBUW10gPSBbXTtcbiAgICogY29uc3QgcGJsRGF0YVNvdXJjZSA9IGNyZWF0ZURTPFQ+KCkub25UcmlnZ2VyKCAoKSA9PiBjb2xsZWN0aW9uICkuY3JlYXRlKCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiA+IFRoaXMgaXMgYSB3cml0ZS1vbmx5IChzZXR0ZXIpIHByb3BlcnR5IHRoYXQgdHJpZ2dlcnMgdGhlIGBzZXREYXRhU291cmNlYCBtZXRob2QuXG4gICAqL1xuICBASW5wdXQoKSBzZXQgZGF0YVNvdXJjZSh2YWx1ZTogUGJsRGF0YVNvdXJjZTxUPiB8IERhdGFTb3VyY2VPZjxUPikge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFBibERhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMuc2V0RGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YVNvdXJjZShjcmVhdGVEUzxUPigpLm9uVHJpZ2dlciggKCkgPT4gdmFsdWUgfHwgW10gKS5jcmVhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRzKCk6IFBibERhdGFTb3VyY2U8VD4geyByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTsgfTtcblxuICBASW5wdXQoKSBnZXQgdXNlUGFnaW5hdGlvbigpOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSB7IHJldHVybiB0aGlzLl9wYWdpbmF0aW9uOyB9XG4gIHNldCB1c2VQYWdpbmF0aW9uKHZhbHVlOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSkge1xuICAgIGlmICgodmFsdWUgYXMgYW55KSA9PT0gJycpIHtcbiAgICAgIHZhbHVlID0gJ3BhZ2VOdW1iZXInO1xuICAgIH1cbiAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl9wYWdpbmF0aW9uICkge1xuICAgICAgdGhpcy5fcGFnaW5hdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBub0NhY2hlUGFnaW5hdG9yKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbm9DYWNoZVBhZ2luYXRvcjsgfVxuICBzZXQgbm9DYWNoZVBhZ2luYXRvcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fbm9DYWNoZVBhZ2luYXRvciAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX25vQ2FjaGVQYWdpbmF0b3IgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmRzICYmIHRoaXMuZHMucGFnaW5hdG9yKSB7XG4gICAgICAgIHRoaXMuZHMucGFnaW5hdG9yLm5vQ2FjaGVNb2RlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgZm9yIHRoaXMgZ3JpZC5cbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnM6IFBibE5ncmlkQ29sdW1uU2V0IHwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0O1xuXG4gIEBJbnB1dCgpIHNldCBoaWRlQ29sdW1ucyh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9oaWRlQ29sdW1ucyA9IHZhbHVlO1xuICAgIHRoaXMuX2hpZGVDb2x1bW5zRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZmFsbGJhY2sgaGVpZ2h0IGZvciBcInRoZSBpbm5lciBzY3JvbGwgY29udGFpbmVyXCIuXG4gICAqIFRoZSBmYWxsYmFjayBpcyB1c2VkIG9ubHkgd2hlbiBpdCBMT1dFUiB0aGFuIHRoZSByZW5kZXJlZCBoZWlnaHQsIHNvIG5vIGVtcHR5IGdhcHMgYXJlIGNyZWF0ZWQgd2hlbiBzZXR0aW5nIHRoZSBmYWxsYmFjay5cbiAgICpcbiAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIHRoZSBhcmVhIGluIHdoaWNoIGFsbCBkYXRhIHJvd3MgYXJlIHJlbmRlcmVkIGFuZCBhbGwgbWV0YSAoaGVhZGVyL2Zvb3Rlcikgcm93cyB0aGF0IGFyZSBvZiB0eXBlIFwicm93XCIgb3IgXCJzdGlja3lcIi5cbiAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIGRlZmluZWQgdG8gY29uc3VtZSBhbGwgdGhlIGhlaWdodCBsZWZ0IGFmdGVyIGFsbCBleHRlcm5hbCBvYmplY3RzIGFyZSByZW5kZXJlZC5cbiAgICogRXh0ZXJuYWwgb2JqZWN0cyBjYW4gYmUgZml4ZWQgbWV0YSByb3dzIChoZWFkZXIvZm9vdGVyKSwgcGFnaW5hdGlvbiByb3csIGFjdGlvbiByb3cgZXRjLi4uXG4gICAqXG4gICAqIElmIHRoZSBncmlkIGRvZXMgbm90IGhhdmUgYSBoZWlnaHQgKCUgb3IgcHgpIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGFsd2F5cyBoYXZlIG5vIGhlaWdodCAoMCkuXG4gICAqIElmIHRoZSBncmlkIGhhcyBhIGhlaWdodCwgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIHdpbGwgZ2V0IHRoZSBoZWlnaHQgbGVmdCwgd2hpY2ggY2FuIGFsc28gYmUgMCBpZiB0aGVyZSBhcmUgYSBsb3Qgb2YgZXh0ZXJuYWwgb2JqZWN0cy5cbiAgICpcbiAgICogVG8gc29sdmUgdGhlIG5vLWhlaWdodCBwcm9ibGVtIHdlIHVzZSB0aGUgZmFsbGJhY2tNaW5IZWlnaHQgcHJvcGVydHkuXG4gICAqXG4gICAqIFdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgYW5kIGZhbGxiYWNrTWluSGVpZ2h0IGlzIG5vdCBzZXQgdGhlIGdyaWQgd2lsbCBzZXQgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGhlaWdodCB0byBzaG93IGFsbCByb3dzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiB1c2luZyBhIGZpeGVkIChweCkgaGVpZ2h0IGZvciB0aGUgZ3JpZCwgaWYgdGhlIGhlaWdodCBvZiBhbGwgZXh0ZXJuYWwgb2JqZWN0cyArIHRoZSBoZWlnaHQgb2YgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIGdyZWF0ZXIgdGhlblxuICAgKiB0aGUgZ3JpZCdzIGhlaWdodCBhIHZlcnRpY2FsIHNjcm9sbCBiYXIgd2lsbCBzaG93LlxuICAgKiBJZiB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCJzIGhlaWdodCB3aWxsIGJlIGxvd2VyIHRoZW4gaXQncyByZW5kZXJlZCBjb250ZW50IGhlaWdodCBhbmQgYWRkaXRpb25hbCB2ZXJ0aWNhbCBzY3JvbGwgYmFyIHdpbGwgYXBwZWFyLCB3aGljaCBpcywgdXN1YWxseSwgbm90IGdvb2QuXG4gICAqXG4gICAqIFRvIGF2b2lkIHRoaXMsIGRvbid0IHVzZSBmYWxsYmFja01pbkhlaWdodCB0b2dldGhlciB3aXRoIGEgZml4ZWQgaGVpZ2h0IGZvciB0aGUgZ3JpZC4gSW5zdGVhZCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIG1pbiBoZWlnaHQgZm9yIHRoZSBncmlkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGZhbGxiYWNrTWluSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mYWxsYmFja01pbkhlaWdodDsgfVxuICBzZXQgZmFsbGJhY2tNaW5IZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mYWxsYmFja01pbkhlaWdodCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGU6IHVuZGVmaW5lZCB8ICggKGNvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPikgPT4gKCBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2xhc3M6IHN0cmluZ106IGFueSB9ICkpO1xuICBASW5wdXQoKSByb3dDbGFzc1VwZGF0ZUZyZXE6ICdpdGVtJyB8ICduZ0RvQ2hlY2snIHwgJ25vbmUnID0gJ2l0ZW0nO1xuXG4gIHJvd0ZvY3VzOiAwIHwgJycgPSAnJztcbiAgY2VsbEZvY3VzOiAwIHwgJycgPSAnJztcblxuICBwcml2YXRlIF9mYWxsYmFja01pbkhlaWdodCA9IDA7XG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IFBibERhdGFTb3VyY2U8VD47XG5cbiAgQFZpZXdDaGlsZCgnYmVmb3JlVGFibGUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVUYWJsZTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnYmVmb3JlQ29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkJlZm9yZUNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2FmdGVyQ29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkFmdGVyQ29udGVudDogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZmJUYWJsZUNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiVGFibGVDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZCgnZmJIZWFkZXJDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYkhlYWRlckNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZCgnZmJGb290ZXJDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYkZvb3RlckNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZChDZGtSb3dEZWYsIHsgc3RhdGljOiB0cnVlIH0pIF90YWJsZVJvd0RlZjogQ2RrUm93RGVmPFQ+O1xuICBAVmlld0NoaWxkcmVuKENka0hlYWRlclJvd0RlZikgX2hlYWRlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtIZWFkZXJSb3dEZWY+O1xuICBAVmlld0NoaWxkcmVuKENka0Zvb3RlclJvd0RlZikgX2Zvb3RlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtGb290ZXJSb3dEZWY+O1xuXG4gIGdldCBtZXRhQ29sdW1uSWRzKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1uSWRzJ10geyByZXR1cm4gdGhpcy5fc3RvcmUubWV0YUNvbHVtbklkczsgfVxuICBnZXQgbWV0YUNvbHVtbnMoKTogUGJsQ29sdW1uU3RvcmVbJ21ldGFDb2x1bW5zJ10geyByZXR1cm4gdGhpcy5fc3RvcmUubWV0YUNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtblJvd0RlZigpIHsgcmV0dXJuIHsgaGVhZGVyOiB0aGlzLl9zdG9yZS5oZWFkZXJDb2x1bW5EZWYsIGZvb3RlcjogdGhpcy5fc3RvcmUuZm9vdGVyQ29sdW1uRGVmIH07IH1cbiAgLyoqXG4gICAqIFRydWUgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkIChhZnRlciBBZnRlclZpZXdJbml0KVxuICAgKi9cbiAgcmVhZG9ubHkgaXNJbml0OiBib29sZWFuO1xuICByZWFkb25seSBjb2x1bW5BcGk6IENvbHVtbkFwaTxUPjtcbiAgZ2V0IGNvbnRleHRBcGkoKTogUGJsTmdyaWRDb250ZXh0QXBpPFQ+IHsgcmV0dXJuIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpOyB9XG5cbiAgZ2V0IHZpZXdwb3J0KCk6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl92aWV3cG9ydDsgfVxuXG4gIF9jZGtUYWJsZTogUGJsQ2RrVGFibGVDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgX3N0b3JlOiBQYmxDb2x1bW5TdG9yZSA9IG5ldyBQYmxDb2x1bW5TdG9yZSgpO1xuICBwcml2YXRlIF9oaWRlQ29sdW1uc0RpcnR5OiBib29sZWFuO1xuICBwcml2YXRlIF9oaWRlQ29sdW1uczogc3RyaW5nW107XG4gIHByaXZhdGUgX2NvbEhpZGVEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZz47XG4gIHByaXZhdGUgX25vRGF0ZUVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3BhZ2luYXRvckVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlO1xuICBwcml2YXRlIF9ub0NhY2hlUGFnaW5hdG9yID0gZmFsc2U7XG4gIHByaXZhdGUgX21pbmltdW1Sb3dXaWR0aDogc3RyaW5nO1xuICBwcml2YXRlIF92aWV3cG9ydD86IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudDtcbiAgcHJpdmF0ZSBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7XG4gIHByaXZhdGUgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD47XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ2lkJykgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCBncmlkQ29uZmlnID0gY29uZmlnLmdldCgndGFibGUnKTtcbiAgICB0aGlzLnNob3dIZWFkZXIgPSBncmlkQ29uZmlnLnNob3dIZWFkZXI7XG4gICAgdGhpcy5zaG93Rm9vdGVyID0gZ3JpZENvbmZpZy5zaG93Rm9vdGVyO1xuICAgIHRoaXMubm9GaWxsZXIgPSBncmlkQ29uZmlnLm5vRmlsbGVyO1xuXG4gICAgdGhpcy5pbml0RXh0QXBpKCk7XG4gICAgdGhpcy5jb2x1bW5BcGkgPSBDb2x1bW5BcGkuY3JlYXRlPFQ+KHRoaXMsIHRoaXMuX3N0b3JlLCB0aGlzLl9leHRBcGkpO1xuICAgIHRoaXMuaW5pdFBsdWdpbnMoaW5qZWN0b3IsIGVsUmVmLCB2Y1JlZik7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hpZGVDb2x1bW5zRGlydHkpIHtcbiAgICAgIHRoaXMuX2hpZGVDb2x1bW5zRGlydHkgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5faGlkZUNvbHVtbnM7XG4gICAgICBpZiAoIXRoaXMuX2NvbEhpZGVEaWZmZXIgJiYgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLl9jb2xIaWRlRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodmFsdWUpLmNyZWF0ZSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBhIGRpZmZlciBzdXBwb3J0aW5nIG9iamVjdCAnJHt2YWx1ZX0uIGhpZGVDb2x1bW5zIG9ubHkgc3VwcG9ydHMgYmluZGluZyB0byBJdGVyYWJsZXMgc3VjaCBhcyBBcnJheXMuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbEhpZGVEaWZmZXIpIHtcbiAgICAgIGNvbnN0IGhpZGVDb2x1bW5zID0gdGhpcy5faGlkZUNvbHVtbnMgfHwgW107XG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fY29sSGlkZURpZmZlci5kaWZmKGhpZGVDb2x1bW5zKTtcbiAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmhpZGRlbiA9IGhpZGVDb2x1bW5zO1xuICAgICAgICB0aGlzLl9taW5pbXVtUm93V2lkdGggPSAnJztcblxuICAgICAgICAvLyBUT0RPKHNobG9taWFzc2FmKSBbcGVyZiwgNF06IFJpZ2h0IG5vdyB3ZSBhdHRhY2ggYWxsIGNvbHVtbnMsIHdlIGNhbiBpbXByb3ZlIGl0IGJ5IGF0dGFjaGluZyBvbmx5IHRob3NlIFwiYWRkZWRcIiAod2Uga25vdyB0aGVtIGZyb20gXCJjaGFuZ2VzXCIpXG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9oaWRlQ29sdW1ucykge1xuICAgICAgICB0aGlzLl9jb2xIaWRlRGlmZmVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBubyBuZWVkIHRvIHVuc3Vic2NyaWJlLCB0aGUgcmVnIHNlcnZpY2UgaXMgcGVyIGdyaWQgaW5zdGFuY2UgYW5kIGl0IHdpbGwgZGVzdHJveSB3aGVuIHRoaXMgZ3JpZCBkZXN0cm95LlxuICAgIC8vIEFsc28sIGF0IHRoaXMgcG9pbnQgaW5pdGlhbCBjaGFuZ2VzIGZyb20gdGVtcGxhdGVzIHByb3ZpZGVkIGluIHRoZSBjb250ZW50IGFyZSBhbHJlYWR5IGluc2lkZSBzbyB0aGV5IHdpbGwgbm90IHRyaWdnZXJcbiAgICAvLyB0aGUgb3JkZXIgaGVyZSBpcyB2ZXJ5IGltcG9ydGFudCwgYmVjYXVzZSBjb21wb25lbnQgdG9wIG9mIHRoaXMgZ3JpZCB3aWxsIGZpcmUgbGlmZSBjeWNsZSBob29rcyBBRlRFUiB0aGlzIGNvbXBvbmVudFxuICAgIC8vIHNvIGlmIHdlIGhhdmUgYSB0b3AgbGV2ZWwgY29tcG9uZW50IHJlZ2lzdGVyaW5nIGEgdGVtcGxhdGUgb24gdG9wIGl0IHdpbGwgbm90IHNob3cgdW5sZXNzIHdlIGxpc3Rlbi5cbiAgICB0aGlzLnJlZ2lzdHJ5LmNoYW5nZXMuc3Vic2NyaWJlKCBjaGFuZ2VzID0+IHtcbiAgICAgIGxldCBncmlkQ2VsbCA9IGZhbHNlO1xuICAgICAgbGV0IGhlYWRlckZvb3RlckNlbGwgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgYyBvZiBjaGFuZ2VzKSB7XG4gICAgICAgIHN3aXRjaCAoYy50eXBlKSB7XG4gICAgICAgICAgY2FzZSAndGFibGVDZWxsJzpcbiAgICAgICAgICAgIGdyaWRDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlckNlbGwnOlxuICAgICAgICAgIGNhc2UgJ2Zvb3RlckNlbGwnOlxuICAgICAgICAgICAgaGVhZGVyRm9vdGVyQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdub0RhdGEnOlxuICAgICAgICAgICAgdGhpcy5zZXR1cE5vRGF0YSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFnaW5hdG9yJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZ3JpZENlbGwpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgICB9XG4gICAgICBpZiAoaGVhZGVyRm9vdGVyQ2VsbCkge1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmludmFsaWRhdGVDb2x1bW5zKCk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzSW5pdCcsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkluaXQnIH0pO1xuXG4gICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuXG4gICAgLy8gQWRkaW5nIGEgZGl2IGJlZm9yZSB0aGUgZm9vdGVyIHJvdyB2aWV3IHJlZmVyZW5jZSwgdGhpcyBkaXYgd2lsbCBiZSB1c2VkIHRvIGZpbGwgdXAgdGhlIHNwYWNlIGJldHdlZW4gaGVhZGVyICYgZm9vdGVyIHJvd3NcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWVtcHR5LXNwYWNlcicpXG4gICAgdGhpcy5fY2RrVGFibGUuX2VsZW1lbnQuaW5zZXJ0QmVmb3JlKGRpdiwgdGhpcy5fY2RrVGFibGUuX2Zvb3RlclJvd091dGxldC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMubGlzdGVuVG9SZXNpemUoKTtcblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSB3aWxsIGNhdGNoIGNvbnRleHQgZm9jdXNlZCBldmVudHMsIGZpbmQgdGhlIEhUTUwgZWxlbWVudCBvZiB0aGUgY2VsbCBhbmQgZm9jdXMgaXQuXG4gICAgdGhpcy5jb250ZXh0QXBpLmZvY3VzQ2hhbmdlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuY3Vycikge1xuICAgICAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmNvbnRleHRBcGkuZmluZFJvd0luVmlldyhldmVudC5jdXJyLnJvd0lkZW50KTtcbiAgICAgICAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5nZXQocm93Q29udGV4dC5pbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgICBjb25zdCBjZWxsVmlld0luZGV4ID0gdGhpcy5jb2x1bW5BcGkucmVuZGVySW5kZXhPZih0aGlzLmNvbHVtbkFwaS5jb2x1bW5zW2V2ZW50LmN1cnIuY29sSW5kZXhdKVxuICAgICAgICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IHZpZXcucm9vdE5vZGVzWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1jZWxsJylbY2VsbFZpZXdJbmRleF07XG4gICAgICAgICAgICAgIGlmIChjZWxsRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCBwcm9jZXNzQ29sdW1ucyA9IGZhbHNlO1xuXG4gICAgaWYgKGNoYW5nZXMuZm9jdXNNb2RlKSB7XG4gICAgICB0aGlzLnJvd0ZvY3VzID0gdGhpcy5mb2N1c01vZGUgPT09ICdyb3cnID8gMCA6ICcnO1xuICAgICAgdGhpcy5jZWxsRm9jdXMgPSB0aGlzLmZvY3VzTW9kZSA9PT0gJ2NlbGwnID8gMCA6ICcnO1xuICAgIH1cblxuICAgIGlmICggY2hhbmdlcy5jb2x1bW5zICYmIHRoaXMuaXNJbml0ICkge1xuICAgICAgcHJvY2Vzc0NvbHVtbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICggcHJvY2Vzc0NvbHVtbnMgPT09IHRydWUgKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVDb2x1bW5zKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX3BsdWdpbi5kZXN0cm95KCk7XG4gICAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuZGV0YWNoVmlld1BvcnQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHA6IFByb21pc2U8dm9pZD47XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkRlc3Ryb3knLCB3YWl0OiAoX3A6IFByb21pc2U8dm9pZD4pID0+IHAgPSBfcCB9KTtcbiAgICBpZiAocCkge1xuICAgICAgcC50aGVuKGRlc3Ryb3kpLmNhdGNoKGRlc3Ryb3kpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tCeShpbmRleDogbnVtYmVyLCBpdGVtOiBUKTogYW55IHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGN1cnJlbnQgc29ydCBkZWZpbml0aW9ucy5cbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YCwgRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXG4gICAqXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIHNvcnRpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBvciBgc29ydEFsaWFzYCBwcm9wZXJ0aWVzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0U29ydGBcbiAgICpcbiAgICogQHBhcmFtIGNvbHVtbk9yU29ydEFsaWFzIEEgY29sdW1uIGluc3RhbmNlIG9yIGEgc3RyaW5nIG1hdGNoaW5nIGBQYmxDb2x1bW4uc29ydEFsaWFzYCBvciBgUGJsQ29sdW1uLmlkYC5cbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KGNvbHVtbk9yU29ydEFsaWFzOiBQYmxDb2x1bW4gfCBzdHJpbmcsIHNvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhcz86IFBibENvbHVtbiB8IHN0cmluZyB8IGJvb2xlYW4sIHNvcnQ/OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIWNvbHVtbk9yU29ydEFsaWFzIHx8IHR5cGVvZiBjb2x1bW5PclNvcnRBbGlhcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLmRzLnNldFNvcnQoISFjb2x1bW5PclNvcnRBbGlhcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbHVtbjogUGJsQ29sdW1uO1xuICAgIGlmICh0eXBlb2YgY29sdW1uT3JTb3J0QWxpYXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb2x1bW4gPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbmQoIGMgPT4gYy5hbGlhcyA/IGMuYWxpYXMgPT09IGNvbHVtbk9yU29ydEFsaWFzIDogKGMuc29ydCAmJiBjLmlkID09PSBjb2x1bW5PclNvcnRBbGlhcykgKTtcbiAgICAgIGlmICghY29sdW1uICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGZpbmQgY29sdW1uIHdpdGggYWxpYXMgXCIke2NvbHVtbk9yU29ydEFsaWFzfVwiLmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbiA9IGNvbHVtbk9yU29ydEFsaWFzO1xuICAgIH1cbiAgICB0aGlzLmRzLnNldFNvcnQoY29sdW1uLCBzb3J0LCBza2lwVXBkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAsIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLlxuICAgKi9cbiAgc2V0RmlsdGVyKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIGZ1bmN0aW9uIHByZWRpY2F0ZS5cbiAgICpcbiAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmBcbiAgICovXG4gIHNldEZpbHRlcih2YWx1ZTogRGF0YVNvdXJjZVByZWRpY2F0ZSwgY29sdW1ucz86IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSB2YWx1ZSB0byBjb21wYXJlIHdpdGggYW5kIGEgbGlzdCBvZiBjb2x1bW5zIHdpdGggdGhlIHZhbHVlcyB0byBjb21wYXJlIHRvLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmBcbiAgICovXG4gIHNldEZpbHRlcih2YWx1ZTogYW55LCBjb2x1bW5zOiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgc2V0RmlsdGVyKHZhbHVlPzogRGF0YVNvdXJjZUZpbHRlclRva2VuLCBjb2x1bW5zPzogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGNvbHVtbkluc3RhbmNlczogUGJsQ29sdW1uW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW5zKSAmJiB0eXBlb2YgY29sdW1uc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29sdW1uSW5zdGFuY2VzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY29sSWQgb2YgY29sdW1ucykge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmluZCggYyA9PiBjLmFsaWFzID8gYy5hbGlhcyA9PT0gY29sSWQgOiAoYy5pZCA9PT0gY29sSWQpICk7XG4gICAgICAgICAgaWYgKCFjb2x1bW4gJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGZpbmQgY29sdW1uIHdpdGggYWxpYXMgJHtjb2xJZH0gXCIke2NvbElkfVwiLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb2x1bW5JbnN0YW5jZXMucHVzaChjb2x1bW4pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5JbnN0YW5jZXMgPSBjb2x1bW5zIGFzIGFueTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHMuc2V0RmlsdGVyKHZhbHVlLCBjb2x1bW5JbnN0YW5jZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRzLnNldEZpbHRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHNldERhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIEtJTEwgQUxMIHN1YnNjcmlwdGlvbnMgZm9yIHRoZSBwcmV2aW91cyBkYXRhc291cmNlLlxuICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UpIHtcbiAgICAgICAgVW5SeC5raWxsKHRoaXMsIHRoaXMuX2RhdGFTb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLmRhdGFTb3VyY2UgPSB2YWx1ZSBhcyBhbnk7XG5cbiAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICAgIHRoaXMuc2V0dXBOb0RhdGEoZmFsc2UpO1xuXG4gICAgICAvLyBjbGVhciB0aGUgY29udGV4dCwgbmV3IGRhdGFzb3VyY2VcbiAgICAgIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG5cbiAgICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoe1xuICAgICAgICBraW5kOiAnb25EYXRhU291cmNlJyxcbiAgICAgICAgcHJldixcbiAgICAgICAgY3VycjogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIHZhbHVlICkge1xuICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICB2YWx1ZS5vbkVycm9yLnBpcGUoVW5SeCh0aGlzLCB2YWx1ZSkpLnN1YnNjcmliZShjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgcmVnaXN0ZXIgdG8gdGhpcyBldmVudCBiZWNhdXNlIGl0IGZpcmVzIGJlZm9yZSB0aGUgZW50aXJlIGRhdGEtY2hhbmdpbmcgcHJvY2VzcyBzdGFydHMuXG4gICAgICAgIC8vIFRoaXMgaXMgcmVxdWlyZWQgYmVjYXVzZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGlzIGZpcmVkIGFzeW5jLCBqdXN0IGJlZm9yZSB0aGUgZGF0YSBpcyBlbWl0dGVkLlxuICAgICAgICAvLyBJdHMgbm90IGVub3VnaCB0byBjbGVhciB0aGUgY29udGV4dCB3aGVuIGBzZXREYXRhU291cmNlYCBpcyBjYWxsZWQsIHdlIGFsc28gbmVlZCB0byBoYW5kbGUgYHJlZnJlc2hgIGNhbGxzIHdoaWNoIHdpbGwgbm90XG4gICAgICAgIC8vIHRyaWdnZXIgdGhpcyBtZXRob2QuXG4gICAgICAgIHZhbHVlLm9uU291cmNlQ2hhbmdpbmcucGlwZShVblJ4KHRoaXMsIHZhbHVlKSkuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpICk7XG5cbiAgICAgICAgLy8gUnVuIENELCBzY2hlZHVsZWQgYXMgYSBtaWNyby10YXNrLCBhZnRlciBlYWNoIHJlbmRlcmluZ1xuICAgICAgICB2YWx1ZS5vblJlbmRlckRhdGFDaGFuZ2luZ1xuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCAoe2V2ZW50fSkgPT4gIWV2ZW50LmlzSW5pdGlhbCAmJiAoZXZlbnQucGFnaW5hdGlvbi5jaGFuZ2VkIHx8IGV2ZW50LnNvcnQuY2hhbmdlZCB8fCBldmVudC5maWx0ZXIuY2hhbmdlZCkpLFxuICAgICAgICAgICAgLy8gQ29udGV4dCBiZXR3ZWVuIHRoZSBvcGVyYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIGF0IHRoZSBtb21lbnRcbiAgICAgICAgICAgIC8vIEV2ZW50IGZvciBjbGllbnQgc2lkZSBvcGVyYXRpb25zLi4uXG4gICAgICAgICAgICAvLyBUT0RPOiBjYW4gd2UgcmVtb3ZlIHRoaXM/IHdlIGNsZWFyIHRoZSBjb250ZXh0IHdpdGggYG9uU291cmNlQ2hhbmdpbmdgXG4gICAgICAgICAgICB0YXAoICgpID0+ICF0aGlzLl9zdG9yZS5wcmltYXJ5ICYmIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCkgKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCggKCkgPT4gdmFsdWUub25SZW5kZXJlZERhdGFDaGFuZ2VkLnBpcGUodGFrZSgxKSwgbWFwVG8odGhpcy5kcy5yZW5kZXJMZW5ndGgpKSApLFxuICAgICAgICAgICAgb2JzZXJ2ZU9uKGFzYXBTY2hlZHVsZXIpLFxuICAgICAgICAgICAgVW5SeCh0aGlzLCB2YWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSggcHJldmlvdXNSZW5kZXJMZW5ndGggPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlIG51bWJlciBvZiByZW5kZXJlZCBpdGVtcyBoYXMgY2hhbmdlZCB0aGUgZ3JpZCB3aWxsIHVwZGF0ZSB0aGUgZGF0YSBhbmQgcnVuIENEIG9uIGl0LlxuICAgICAgICAgICAgLy8gc28gd2Ugb25seSB1cGRhdGUgdGhlIHJvd3MuXG4gICAgICAgICAgICBjb25zdCB7IGNka1RhYmxlIH0gPSB0aGlzLl9leHRBcGk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNSZW5kZXJMZW5ndGggPT09IHRoaXMuZHMucmVuZGVyTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicsIHRydWUpO1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cygnZm9vdGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSGFuZGxpbmcgbm8gZGF0YSBvdmVybGF5XG4gICAgICAgIC8vIEhhbmRsaW5nIGZhbGxiYWNrIG1pbmltdW0gaGVpZ2h0LlxuICAgICAgICB2YWx1ZS5vblJlbmRlcmVkRGF0YUNoYW5nZWRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCggKCkgPT4gdGhpcy5kcy5yZW5kZXJMZW5ndGggKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgICAgICB0YXAoIChbcHJldiwgY3Vycl0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgbm9EYXRhU2hvd2luZyA9ICEhdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmO1xuICAgICAgICAgICAgICBpZiAoIChjdXJyID4gMCAmJiBub0RhdGFTaG93aW5nKSB8fCAoY3VyciA9PT0gMCAmJiAhbm9EYXRhU2hvd2luZykgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE5vRGF0YSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhbmltYXRpb25GcmFtZVNjaGVkdWxlciksIC8vIHd3IHdhbnQgdG8gZ2l2ZSB0aGUgYnJvd3NlciB0aW1lIHRvIHJlbW92ZS9hZGQgcm93c1xuICAgICAgICAgICAgVW5SeCh0aGlzLCB2YWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMudmlld3BvcnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMuZHMucmVuZGVyTGVuZ3RoID4gMCAmJiB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgaCA9IE1hdGgubWluKHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0LCB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkpO1xuICAgICAgICAgICAgICBlbC5zdHlsZS5taW5IZWlnaHQgPSBoICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMudmlld3BvcnQuZW5hYmxlZCA/IG51bGwgOiB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkgKyAncHgnO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBXaGVuIHZpZXdwb3J0IGlzIGRpc2FibGVkLCB3ZSBjYW4gc2tpcCB0aGUgY2FsbCB0byBtZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpIGFuZCBsZXQgdGhlIGJyb3dzZXJcbiAgICAgICAgICAgICAgLy8gZG8gdGhlIGpvYiBieSBzZXR0aW5nIGBjb250YWluOiB1bnNldGAgaW4gYHBibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRgXG5cbiAgICAgICAgICAgICAgLy8gZWwuc3R5bGUubWluSGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgICAgLy8gZWwuc3R5bGUuY29udGFpbiA9IHRoaXMudmlld3BvcnQuZW5hYmxlZCA/IG51bGwgOiAndW5zZXQnO1xuXG4gICAgICAgICAgICAgIC8vIFVQREFURTogVGhpcyB3aWxsIG5vdCB3b3JrIGJlY2F1c2UgaXQgd2lsbCBjYXVzZSB0aGUgd2lkdGggdG8gYmUgaW5jb3JyZWN0IHdoZW4gdXNlZCB3aXRoIHZTY3JvbGxOb25lXG4gICAgICAgICAgICAgIC8vIFRPRE86IENoZWNrIHdoeT9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52YWxpZGF0ZXMgdGhlIGhlYWRlciwgaW5jbHVkaW5nIGEgZnVsbCByZWJ1aWxkIG9mIGNvbHVtbiBoZWFkZXJzXG4gICAqL1xuICBpbnZhbGlkYXRlQ29sdW1ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ2JlZm9yZUludmFsaWRhdGVIZWFkZXJzJyB9KTtcblxuICAgIGNvbnN0IHJlYnVpbGRSb3dzID0gdGhpcy5fc3RvcmUuYWxsQ29sdW1ucy5sZW5ndGggPiAwO1xuICAgIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgdGhpcy5fc3RvcmUuaW52YWxpZGF0ZSh0aGlzLmNvbHVtbnMpO1xuXG4gICAgc2V0SWRlbnRpdHlQcm9wKHRoaXMuX3N0b3JlLCB0aGlzLl9faWRlbnRpdHlQcm9wKTsgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgaW4gMS4wLjBcblxuICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFySGVhZGVyUm93RGVmcygpO1xuICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFyRm9vdGVyUm93RGVmcygpO1xuICAgIC8vIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcblxuICAgIC8vIGFmdGVyIGludmFsaWRhdGluZyB0aGUgaGVhZGVycyB3ZSBub3cgaGF2ZSBvcHRpb25hbCBoZWFkZXIvaGVhZGVyR3JvdXBzL2Zvb3RlciByb3dzIGFkZGVkXG4gICAgLy8gd2UgbmVlZCB0byB1cGRhdGUgdGhlIHRlbXBsYXRlIHdpdGggdGhpcyBkYXRhIHdoaWNoIHdpbGwgY3JlYXRlIG5ldyByb3dzIChoZWFkZXIvZm9vdGVyKVxuICAgIHRoaXMucmVzZXRIZWFkZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5yZXNldEZvb3RlclJvd0RlZnMoKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIC8qICBOb3cgd2Ugd2lsbCBmb3JjZSBjbGVhcmluZyBhbGwgZGF0YSByb3dzIGFuZCBjcmVhdGluZyB0aGVtIGJhY2sgYWdhaW4gaWYgdGhpcyBpcyBub3QgdGhlIGZpcnN0IHRpbWUgd2UgaW52YWxpZGF0ZSB0aGUgY29sdW1ucy4uLlxuXG4gICAgICAgIFdoeT8gZmlyc3QsIHNvbWUgYmFja2dyb3VuZDpcblxuICAgICAgICBJbnZhbGlkYXRpbmcgdGhlIHN0b3JlIHdpbGwgcmVzdWx0IGluIG5ldyBgUGJsQ29sdW1uYCBpbnN0YW5jZXMgKGNsb25lZCBvciBjb21wbGV0ZWx5IG5ldykgaGVsZCBpbnNpZGUgYSBuZXcgYXJyYXkgKGFsbCBhcnJheXMgaW4gdGhlIHN0b3JlIGFyZSByZS1jcmVhdGVkIG9uIGludmFsaWRhdGUpXG4gICAgICAgIE5ldyBhcnJheSBhbmQgbmV3IGluc3RhbmNlcyB3aWxsIGFsc28gcmVzdWx0IGluIG5ldyBkaXJlY3RpdmUgaW5zdGFuY2VzIG9mIGBQYmxOZ3JpZENvbHVtbkRlZmAgZm9yIGV2ZXJ5IGNvbHVtbi5cblxuICAgICAgICBFYWNoIGRhdGEgcm93IGhhcyBkYXRhIGNlbGxzIHdpdGggdGhlIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIGRpcmVjdGl2ZSAoYHBibC1uZ3JpZC1jZWxsYCkuXG4gICAgICAgIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIGhhcyBhIHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDb2x1bW5EZWZgIHRocm91Z2ggZGVwZW5kZW5jeSBpbmplY3Rpb24sIGkuZS4gaXQgd2lsbCBub3QgdXBkYXRlIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiFcblxuICAgICAgICBOb3csIHRoZSBwcm9ibGVtOlxuICAgICAgICBUaGUgYENka1RhYmxlYCB3aWxsIGNhY2hlIHJvd3MgYW5kIHRoZWlyIGNlbGxzLCByZXVzaW5nIHRoZW0gZm9yIHBlcmZvcm1hbmNlLlxuICAgICAgICBUaGlzIG1lYW5zIHRoYXQgdGhlIGBQYmxOZ3JpZENvbHVtbkRlZmAgaW5zdGFuY2UgaW5zaWRlIGVhY2ggY2VsbCB3aWxsIG5vdCBjaGFuZ2UuXG4gICAgICAgIFNvLCBjcmVhdGluZyBuZXcgY29sdW1ucyBhbmQgY29sdW1uRGVmcyB3aWxsIHJlc3VsdCBpbiBzdGFsZSBjZWxscyB3aXRoIHJlZmVyZW5jZSB0byBkZWFkIGluc3RhbmNlcyBvZiBgUGJsQ29sdW1uYCBhbmQgYFBibE5ncmlkQ29sdW1uRGVmYC5cblxuICAgICAgICBPbmUgc29sdXRpb24gaXMgdG8gcmVmYWN0b3IgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgdG8gZ2V0IHRoZSBgUGJsTmdyaWRDb2x1bW5EZWZgIHRocm91Z2ggZGF0YSBiaW5kaW5nLlxuICAgICAgICBXaGlsZSB0aGlzIHdpbGwgd29yayBpdCB3aWxsIHB1dCBtb3JlIHdvcmsgb24gZWFjaCBjZWxsIHdoaWxlIGRvaW5nIENEIGFuZCB3aWxsIHJlcXVpcmUgY29tcGxleCBsb2dpYyB0byBoYW5kbGUgZWFjaCBjaGFuZ2UgYmVjYXVzZSBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYFxuICAgICAgICBhbHNvIGNyZWF0ZSBhIGNvbnRleHQgd2hpY2ggaGFzIHJlZmVyZW5jZSB0byBhIGNvbHVtbiB0aHVzIGEgbmV3IGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAgICAgIEtlZXBpbmcgdHJhY2sgZm9yIGFsbCByZWZlcmVuY2VzIHdpbGwgYmUgZGlmZmljdWx0IGFuZCBidWdzIGFyZSBsaWtlbHkgdG8gb2NjdXIsIHdoaWNoIGFyZSBoYXJkIHRvIHRyYWNrLlxuXG4gICAgICAgIFRoZSBzaW1wbGVzdCBzb2x1dGlvbiBpcyB0byBmb3JjZSB0aGUgZ3JpZCB0byByZW5kZXIgYWxsIGRhdGEgcm93cyBmcm9tIHNjcmF0Y2ggd2hpY2ggd2lsbCBkZXN0cm95IHRoZSBjYWNoZSBhbmQgYWxsIGNlbGwncyB3aXRoIGl0LCBjcmVhdGluZyBuZXcgb25lJ3Mgd2l0aCBwcm9wZXIgcmVmZXJlbmNlLlxuXG4gICAgICAgIFRoZSBzaW1wbGUgc29sdXRpb24gaXMgY3VycmVudGx5IHByZWZlcnJlZCBiZWNhdXNlOlxuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGltcGxlbWVudC5cbiAgICAgICAgLSBJdCBpcyBlYXNpZXIgdG8gYXNzZXNzIHRoZSBpbXBhY3QuXG4gICAgICAgIC0gSXQgZWZmZWN0cyBhIHNpbmdsZSBvcGVyYXRpb24gKGNoYW5naW5nIHRvIHJlc2V0dGluZyBjb2x1bW5zKSB0aGF0IHJhcmVseSBoYXBwZW5cblxuICAgICAgICBUaGUgb25seSBpc3N1ZSBpcyB3aXRoIHRoZSBgQ2RrVGFibGVgIGVuY2Fwc3VsYXRpbmcgdGhlIG1ldGhvZCBgX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWAgd2hpY2ggaXMgd2hhdCB3ZSBuZWVkLlxuICAgICAgICBUaGUgd29ya2Fyb3VuZCBpcyB0byBhc3NpZ24gYG11bHRpVGVtcGxhdGVEYXRhUm93c2Agd2l0aCB0aGUgc2FtZSB2YWx1ZSBpdCBhbHJlYWR5IGhhcywgd2hpY2ggd2lsbCBjYXVzZSBgX2ZvcmNlUmVuZGVyRGF0YVJvd3NgIHRvIGZpcmUuXG4gICAgICAgIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGlzIGEgZ2V0dGVyIHRoYXQgdHJpZ2dlcnMgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB3aXRob3V0IGNoZWNraW5nIHRoZSB2YWx1ZSBjaGFuZ2VkLCBwZXJmZWN0IGZpdC5cbiAgICAgICAgVGhlcmUgaXMgYSByaXNrIHdpdGggYG11bHRpVGVtcGxhdGVEYXRhUm93c2AgYmVpbmcgY2hhbmdlZC4uLlxuICAgICAqL1xuICAgIGlmIChyZWJ1aWxkUm93cykge1xuICAgICAgdGhpcy5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gdGhpcy5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIH1cbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uSW52YWxpZGF0ZUhlYWRlcnMnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzaXplcyBmb3IgYWxsIGNvbHVtbnMgaW4gdGhlIGdyaWQgYmFzZWQgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9uIG1ldGFkYXRhIGZvciBlYWNoIGNvbHVtbi5cbiAgICogVGhlIGZpbmFsIHdpZHRoIHJlcHJlc2VudCBhIHN0YXRpYyB3aWR0aCwgaXQgaXMgdGhlIHZhbHVlIGFzIHNldCBpbiB0aGUgZGVmaW5pdGlvbiAoZXhjZXB0IGNvbHVtbiB3aXRob3V0IHdpZHRoLCB3aGVyZSB0aGUgY2FsY3VsYXRlZCBnbG9iYWwgd2lkdGggaXMgc2V0KS5cbiAgICovXG4gIHJlc2V0Q29sdW1uc1dpZHRoKCk6IHZvaWQge1xuICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuX3N0b3JlLmdldFN0YXRpY1dpZHRoKCksIHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNpemUgb2YgYWxsIGdyb3VwIGNvbHVtbnMgaW4gdGhlIGdyaWQgYmFzZWQgb24gdGhlIHNpemUgb2YgdGhlaXIgdmlzaWJsZSBjaGlsZHJlbiAobm90IGhpZGRlbikuXG4gICAqIEBwYXJhbSBkeW5hbWljV2lkdGhMb2dpYyAtIE9wdGlvbmFsIGxvZ2ljIGNvbnRhaW5lciwgaWYgbm90IHNldCBhIG5ldyBvbmUgaXMgY3JlYXRlZC5cbiAgICovXG4gIHN5bmNDb2x1bW5Hcm91cHNTaXplKGR5bmFtaWNXaWR0aExvZ2ljPzogRHluYW1pY0NvbHVtbldpZHRoTG9naWMpOiB2b2lkIHtcbiAgICBpZiAoIWR5bmFtaWNXaWR0aExvZ2ljKSB7XG4gICAgICBkeW5hbWljV2lkdGhMb2dpYyA9IHRoaXMuX2V4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgfVxuXG4gICAgLy8gRnJvbSBhbGwgbWV0YSBjb2x1bW5zIChoZWFkZXIvZm9vdGVyL2hlYWRlckdyb3VwKSB3ZSBmaWx0ZXIgb25seSBgaGVhZGVyR3JvdXBgIGNvbHVtbnMuXG4gICAgLy8gRm9yIGVhY2ggd2UgY2FsY3VsYXRlIGl0J3Mgd2lkdGggZnJvbSBhbGwgb2YgdGhlIGNvbHVtbnMgdGhhdCB0aGUgaGVhZGVyR3JvdXAgXCJncm91cHNcIi5cbiAgICAvLyBXZSB1c2UgdGhlIHNhbWUgc3RyYXRlZ3kgYW5kIHRoZSBzYW1lIFJvd1dpZHRoRHluYW1pY0FnZ3JlZ2F0b3IgaW5zdGFuY2Ugd2hpY2ggd2lsbCBwcmV2ZW50IGR1cGxpY2F0ZSBjYWxjdWxhdGlvbnMuXG4gICAgLy8gTm90ZSB0aGF0IHdlIG1pZ2h0IGhhdmUgbXVsdGlwbGUgaGVhZGVyIGdyb3VwcywgaS5lLiBzYW1lIGNvbHVtbnMgb24gbXVsdGlwbGUgZ3JvdXBzIHdpdGggZGlmZmVyZW50IHJvdyBpbmRleC5cbiAgICBmb3IgKGNvbnN0IGcgb2YgdGhpcy5fc3RvcmUuZ2V0QWxsSGVhZGVyR3JvdXAoKSkge1xuICAgICAgLy8gV2UgZ28gb3ZlciBhbGwgY29sdW1ucyBiZWNhdXNlIGcuY29sdW1ucyBkb2VzIG5vdCByZXByZXNlbnQgdGhlIGN1cnJlbnQgb3duZWQgY29sdW1ucyBvZiB0aGUgZ3JvdXBcbiAgICAgIC8vIGl0IGlzIHN0YXRpYywgcmVwcmVzZW50aW5nIHRoZSBpbml0aWFsIHN0YXRlLlxuICAgICAgLy8gT25seSBjb2x1bW5zIGhvbGQgdGhlaXIgZ3JvdXAgb3duZXJzLlxuICAgICAgLy8gVE9ETzogZmluZCB3YXkgdG8gaW1wcm92ZSBpdGVyYXRpb25cbiAgICAgIGNvbnN0IGNvbFNpemVJbmZvcyA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmlsdGVyKCBjID0+ICFjLmhpZGRlbiAmJiBjLmlzSW5Hcm91cChnKSkubWFwKCBjID0+IGMuc2l6ZUluZm8gKTtcbiAgICAgIGlmIChjb2xTaXplSW5mb3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBncm91cFdpZHRoID0gZHluYW1pY1dpZHRoTG9naWMuYWRkR3JvdXAoY29sU2l6ZUluZm9zKTtcbiAgICAgICAgZy5taW5XaWR0aCA9IGdyb3VwV2lkdGg7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYCR7Z3JvdXBXaWR0aH1weGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZy5taW5XaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZy51cGRhdGVXaWR0aChgMHB4YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzaXplQ29sdW1ucyhjb2x1bW5zPzogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBpZiAoIWNvbHVtbnMpIHtcbiAgICAgIGNvbHVtbnMgPSB0aGlzLl9zdG9yZS5jb2x1bW5zO1xuICAgIH1cblxuICAgIC8vIHByb3RlY3QgZnJvbSBwZXItbWF0dXJlIHJlc2l6ZS5cbiAgICAvLyBXaWxsIGhhcHBlbiBvbiBhZGRpdGlvbmFsIGhlYWRlci9oZWFkZXItZ3JvdXAgcm93cyBBTkQgQUxTTyB3aGVuIHZTY3JvbGxOb25lIGlzIHNldFxuICAgIC8vIFRoaXMgd2lsbCBjYXVzZSBzaXplIG5vdCB0byBwb3B1bGF0ZSBiZWNhdXNlIGl0IHRha2VzIHRpbWUgdG8gcmVuZGVyIHRoZSByb3dzLCBzaW5jZSBpdCdzIG5vdCB2aXJ0dWFsIGFuZCBoYXBwZW5zIGltbWVkaWF0ZWx5LlxuICAgIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgcHJvdGVjdGlvbi5cbiAgICBpZiAoIWNvbHVtbnNbMF0uc2l6ZUluZm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzdG9yZXMgYW5kIGNhbGN1bGF0ZXMgd2lkdGggZm9yIGNvbHVtbnMgYWRkZWQgdG8gaXQuIEFnZ3JlZ2F0ZSdzIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgYWRkZWQgY29sdW1ucy5cbiAgICBjb25zdCByb3dXaWR0aCA9IHRoaXMuX2V4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgdGhpcy5zeW5jQ29sdW1uR3JvdXBzU2l6ZShyb3dXaWR0aCk7XG5cbiAgICAvLyBpZiB0aGlzIGlzIGEgZ3JpZCB3aXRob3V0IGdyb3Vwc1xuICAgIGlmIChyb3dXaWR0aC5taW5pbXVtUm93V2lkdGggPT09IDApIHtcbiAgICAgIHJvd1dpZHRoLmFkZEdyb3VwKGNvbHVtbnMubWFwKCBjID0+IGMuc2l6ZUluZm8gKSk7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIG1heCBsb2NrIHN0YXRlIGhhcyBjaGFuZ2VkIHdlIG5lZWQgdG8gdXBkYXRlIHJlLWNhbGN1bGF0ZSB0aGUgc3RhdGljIHdpZHRoJ3MgYWdhaW4uXG4gICAgaWYgKHJvd1dpZHRoLm1heFdpZHRoTG9ja0NoYW5nZWQpIHtcbiAgICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuX3N0b3JlLmdldFN0YXRpY1dpZHRoKCksIHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgICAgIHRoaXMucmVzaXplQ29sdW1ucyhjb2x1bW5zKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21pbmltdW1Sb3dXaWR0aCApIHtcbiAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgdG90YWwgbWluaW11bSB3aWR0aCBvZiB0aGUgZ3JpZFxuICAgICAgLy8gV2UgZG8gaXQgb25jZSwgdG8gc2V0IHRoZSBtaW5pbXVtIHdpZHRoIGJhc2VkIG9uIHRoZSBpbml0aWFsIHNldHVwLlxuICAgICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGFwcGx5IHN0cmF0ZWd5IGhlcmUsIHdlIHdhbnQgdGhlIGVudGlyZSBsZW5ndGggb2YgdGhlIGdyaWQhXG4gICAgICB0aGlzLl9jZGtUYWJsZS5taW5XaWR0aCA9IHJvd1dpZHRoLm1pbmltdW1Sb3dXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25SZXNpemVSb3cnIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBlbWJlZGRlZCB2aWV3IGJlZm9yZSBvciBhZnRlciB0aGUgdXNlciBwcm9qZWN0ZWQgY29udGVudC5cbiAgICovXG4gIGNyZWF0ZVZpZXc8Qz4obG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50JywgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEM+LCBjb250ZXh0PzogQywgaW5kZXg/OiBudW1iZXIpOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5nZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uKTtcbiAgICBjb25zdCB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlUmVmLCBjb250ZXh0LCBpbmRleCk7XG4gICAgdmlldy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGFscmVhZHkgY3JlYXRlZCBlbWJlZGRlZCB2aWV3LlxuICAgKiBAcGFyYW0gdmlldyAtIFRoZSB2aWV3IHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24sIGlmIG5vdCBzZXQgZGVmYXVsdHMgdG8gYGJlZm9yZWBcbiAgICogQHJldHVybnMgdHJ1ZSB3aGVuIGEgdmlldyB3YXMgcmVtb3ZlZCwgZmFsc2Ugd2hlbiBub3QuIChkaWQgbm90IGV4aXN0IGluIHRoZSB2aWV3IGNvbnRhaW5lciBmb3IgdGhlIHByb3ZpZGVkIGxvY2F0aW9uKVxuICAgKi9cbiAgcmVtb3ZlVmlldyh2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PiwgbG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50Jyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5nZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uKTtcbiAgICBjb25zdCBpZHggPSB2Y1JlZi5pbmRleE9mKHZpZXcpO1xuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZjUmVmLnJlbW92ZShpZHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSBhbGwgdmlzaWJsZSBjb2x1bW5zIHRvIGZpdCBjb250ZW50IG9mIHRoZSBncmlkLlxuICAgKiBAcGFyYW0gZm9yY2VGaXhlZFdpZHRoIC0gV2hlbiB0cnVlIHdpbGwgcmVzaXplIGFsbCBjb2x1bW5zIHdpdGggYWJzb2x1dGUgcGl4ZWwgdmFsdWVzLCBvdGhlcndpc2Ugd2lsbCBrZWVwIHRoZSBzYW1lIGZvcm1hdCBhcyBvcmlnaW5hbGx5IHNldCAoJSBvciBub25lKVxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5Ub0ZpdChvcHRpb25zPzogQXV0b1NpemVUb0ZpdE9wdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGlubmVyV2lkdGgsIG91dGVyV2lkdGggfSA9IHRoaXMudmlld3BvcnQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgYXV0by1zaXplIG9uIHRoZSB3aWR0aCB3aXRob3V0IHNjcm9sbCBiYXIgYW5kIHRha2UgYm94IG1vZGVsIGdhcHMgaW50byBhY2NvdW50XG4gICAgLy8gVE9ETzogaWYgbm8gc2Nyb2xsIGJhciBleGlzdHMgdGhlIGNhbGMgd2lsbCBub3QgaW5jbHVkZSBpdCwgbmV4dCBpZiBtb3JlIHJvd3MgYXJlIGFkZGVkIGEgc2Nyb2xsIGJhciB3aWxsIGFwcGVhci4uLlxuICAgIHRoaXMuY29sdW1uQXBpLmF1dG9TaXplVG9GaXQob3V0ZXJXaWR0aCAtIChvdXRlcldpZHRoIC0gaW5uZXJXaWR0aCksIG9wdGlvbnMpO1xuICB9XG5cbiAgZmluZEluaXRpYWxSb3dIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBsZXQgcm93RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KDApIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgcm93RWxlbWVudCA9IHZpZXdSZWYucm9vdE5vZGVzWzBdO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQpIHtcbiAgICAgIHJvd0VsZW1lbnQgPSB0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoID4gMFxuICAgICAgICA/ICh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQuZ2V0KHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5sZW5ndGggLSAxKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdXG4gICAgICAgIDogdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgO1xuICAgICAgcm93RWxlbWVudCA9IHJvd0VsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgICAgcm93RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBjb25zdCBoZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHJvd0VsZW1lbnQpLmhlaWdodDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHJldHVybiBwYXJzZUludChoZWlnaHQsIDEwKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyguLi5jbHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjIG9mIGNscykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsdWdpbnMoaW5qZWN0b3I6IEluamVjdG9yLCBlbFJlZjogRWxlbWVudFJlZjxhbnk+LCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhbiBpbmplY3RvciBmb3IgdGhlIGV4dGVuc2lvbnMvcGx1Z2luc1xuICAgIC8vIFRoaXMgaW5qZWN0b3IgYWxsb3cgcGx1Z2lucyAodGhhdCBjaG9vc2Ugc28pIHRvIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uIGZvciBydW50aW1lIHVzZS5cbiAgICAvLyBJLkU6IGFzIGlmIHRoZXkgd2UncmUgY3JlYXRlZCBieSBhbmd1bGFyIHZpYSB0ZW1wbGF0ZS4uLlxuICAgIC8vIFRoaXMgYWxsb3dzIHNlYW1sZXNzIHBsdWdpbi10by1wbHVnaW4gZGVwZW5kZW5jaWVzIHdpdGhvdXQgcmVxdWlyaW5nIHNwZWNpZmljIHRlbXBsYXRlIHN5bnRheC5cbiAgICAvLyBBbmQgYWxzbyBhbGxvd3MgYXV0byBwbHVnaW4gYmluZGluZyAoYXBwIHdpZGUpIHdpdGhvdXQgdGhlIG5lZWQgZm9yIHRlbXBsYXRlIHN5bnRheC5cbiAgICBjb25zdCBwbHVnaW5JbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBWaWV3Q29udGFpbmVyUmVmLCB1c2VWYWx1ZTogdmNSZWYgfSxcbiAgICAgICAgeyBwcm92aWRlOiBFbGVtZW50UmVmLCB1c2VWYWx1ZTogZWxSZWYgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDaGFuZ2VEZXRlY3RvclJlZiwgdXNlVmFsdWU6IHRoaXMuY2RyIH0sXG4gICAgICBdLFxuICAgICAgcGFyZW50OiBpbmplY3RvcixcbiAgICB9KTtcbiAgICB0aGlzLl9wbHVnaW4gPSBQYmxOZ3JpZFBsdWdpbkNvbnRleHQuY3JlYXRlKHRoaXMsIHBsdWdpbkluamVjdG9yLCB0aGlzLl9leHRBcGkpO1xuICAgIGJpbmRUb0RhdGFTb3VyY2UodGhpcy5fcGx1Z2luKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9SZXNpemUoKTogdm9pZCB7XG4gICAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgICBjb25zdCBybyQgPSBmcm9tRXZlbnRQYXR0ZXJuPFtSZXNpemVPYnNlcnZlckVudHJ5W10sIFJlc2l6ZU9ic2VydmVyXT4oXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKCFyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGhhbmRsZXIpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZXIgPT4ge1xuICAgICAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gU2tpcCB0aGUgZmlyc3QgZW1pc3Npb25cbiAgICAvLyBEZWJvdW5jZSBhbGwgcmVzaXplcyB1bnRpbCB0aGUgbmV4dCBjb21wbGV0ZSBhbmltYXRpb24gZnJhbWUgd2l0aG91dCBhIHJlc2l6ZVxuICAgIC8vIGZpbmFsbHkgbWFwcyB0byB0aGUgZW50cmllcyBjb2xsZWN0aW9uXG4gICAgLy8gU0tJUDogIFdlIHNob3VsZCBza2lwIHRoZSBmaXJzdCBlbWlzc2lvbiAoYHNraXAoMSlgKSBiZWZvcmUgd2UgZGVib3VuY2UsIHNpbmNlIGl0cyBjYWxsZWQgdXBvbiBjYWxsaW5nIFwib2JzZXJ2ZVwiIG9uIHRoZSByZXNpemVPYnNlcnZlci5cbiAgICAvLyAgICAgICAgVGhlIHByb2JsZW0gaXMgdGhhdCBzb21lIGdyaWQgbWlnaHQgcmVxdWlyZSB0aGlzIGJlY2F1c2UgdGhleSBkbyBjaGFuZ2Ugc2l6ZS5cbiAgICAvLyAgICAgICAgQW4gZXhhbXBsZSBpcyBhIGdyaWQgaW4gYSBtYXQtdGFiIHRoYXQgaXMgaGlkZGVuLCB0aGUgZ3JpZCB3aWxsIGhpdCB0aGUgcmVzaXplIG9uZSB3aGVuIHdlIGZvY3VzIHRoZSB0YWJcbiAgICAvLyAgICAgICAgd2hpY2ggd2lsbCByZXF1aXJlIGEgcmVzaXplIGhhbmRsaW5nIGJlY2F1c2UgaXQncyBpbml0aWFsIHNpemUgaXMgMFxuICAgIC8vICAgICAgICBUbyB3b3JrYXJvdW5kIHRoaXMsIHdlIG9ubHkgc2tpcCBlbGVtZW50cyBub3QgeWV0IGFkZGVkIHRvIHRoZSBET00sIHdoaWNoIG1lYW5zIHRoZXkgd2lsbCBub3QgdHJpZ2dlciBhIHJlc2l6ZSBldmVudC5cbiAgICBsZXQgc2tpcFZhbHVlID0gZG9jdW1lbnQuY29udGFpbnModGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KSA/IDEgOiAwO1xuXG4gICAgcm8kXG4gICAgICAucGlwZShcbiAgICAgICAgc2tpcChza2lwVmFsdWUpLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICBVblJ4KHRoaXMpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggKGFyZ3M6IFtSZXNpemVPYnNlcnZlckVudHJ5W10sIFJlc2l6ZU9ic2VydmVyXSkgPT4ge1xuICAgICAgICBpZiAoc2tpcFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgc2tpcFZhbHVlID0gMTtcbiAgICAgICAgICBjb25zdCBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICAgICAgICBjb2x1bW5zLmZvckVhY2goIGMgPT4gYy5zaXplSW5mby51cGRhdGVTaXplKCkgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uUmVzaXplKGFyZ3NbMF0pO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uUmVzaXplKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgdGhpcy5fdmlld3BvcnQuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB9XG4gICAgLy8gdGhpcy5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RXh0QXBpKCk6IHZvaWQge1xuICAgIGxldCBvbkluaXQ6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XG4gICAgY29uc3QgZXh0QXBpID0ge1xuICAgICAgZ3JpZDogdGhpcyxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGdldCBjZGtUYWJsZSgpIHsgcmV0dXJuIGV4dEFwaS5ncmlkLl9jZGtUYWJsZTsgfSxcbiAgICAgIGdldCBldmVudHMoKSB7IHJldHVybiBleHRBcGkuZ3JpZC5fcGx1Z2luLmV2ZW50cyB9LFxuICAgICAgZ2V0IGNvbnRleHRBcGkoKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnY29udGV4dEFwaScsIHsgdmFsdWU6IG5ldyBDb250ZXh0QXBpPFQ+KGV4dEFwaSkgfSk7XG4gICAgICAgIHJldHVybiBleHRBcGkuY29udGV4dEFwaTtcbiAgICAgIH0sXG4gICAgICBnZXQgbWV0YVJvd1NlcnZpY2UoKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWV0YVJvd1NlcnZpY2UnLCB7IHZhbHVlOiBuZXcgUGJsTmdyaWRNZXRhUm93U2VydmljZTxUPihleHRBcGkpIH0pO1xuICAgICAgICByZXR1cm4gZXh0QXBpLm1ldGFSb3dTZXJ2aWNlO1xuICAgICAgfSxcbiAgICAgIG9uSW5pdDogKGZuOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgICAgIGlmIChleHRBcGkuZ3JpZC5pc0luaXQpIHtcbiAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvbkluaXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgdSA9IGV4dEFwaS5ldmVudHMuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9uSW5pdEZuIG9mIG9uSW5pdCkge1xuICAgICAgICAgICAgICAgICAgb25Jbml0Rm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIG9uSW5pdCA9IHUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkluaXQucHVzaChmbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdG9yZTogdGhpcy5fc3RvcmUsXG4gICAgICBzZXRWaWV3cG9ydDogKHZpZXdwb3J0KSA9PiB0aGlzLl92aWV3cG9ydCA9IHZpZXdwb3J0LFxuICAgICAgZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeTogKCk6IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyhEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2V4dEFwaSA9IGV4dEFwaTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBOb0RhdGEoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZikge1xuICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGZvcmNlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vRGF0YSA9IHRoaXMuX2RhdGFTb3VyY2UgJiYgdGhpcy5fZGF0YVNvdXJjZS5yZW5kZXJMZW5ndGggPT09IDA7XG4gICAgaWYgKG5vRGF0YSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1lbXB0eScpO1xuICAgIH1cblxuICAgIGlmIChub0RhdGEgfHwgZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG5vRGF0YVRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRTaW5nbGUoJ25vRGF0YScpO1xuICAgICAgaWYgKG5vRGF0YVRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIG5vRGF0YVRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIGxvY2F0aW9uID09PSAnYmVmb3JlVGFibGUnXG4gICAgICA/IHRoaXMuX3ZjUmVmQmVmb3JlVGFibGVcbiAgICAgIDogbG9jYXRpb24gPT09ICdiZWZvcmVDb250ZW50JyA/IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCA6IHRoaXMuX3ZjUmVmQWZ0ZXJDb250ZW50XG4gICAgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFBhZ2luYXRvcigpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uS2lsbEtleSA9ICdwYmxQYWdpbmF0aW9uS2lsbEtleSc7XG4gICAgY29uc3QgdXNlUGFnaW5hdGlvbiA9IHRoaXMuZHMgJiYgdGhpcy51c2VQYWdpbmF0aW9uO1xuXG4gICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuZHMucGFnaW5hdGlvbiA9IHRoaXMuX3BhZ2luYXRpb247XG4gICAgICBpZiAodGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgVW5SeC5raWxsKHRoaXMsIHBhZ2luYXRpb25LaWxsS2V5KTtcbiAgICAgIGlmICh0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgICAgY29uc3QgcGFnaW5hdG9yVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgncGFnaW5hdG9yJyk7XG4gICAgICAgIGlmIChwYWdpbmF0b3JUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIHBhZ2luYXRvclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHRoaXMuX3N0b3JlLmNvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wsICd0YWJsZUNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggY2VsbCApIHtcbiAgICAgICAgY29sLmNlbGxUcGwgPSBjZWxsLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWZhdWx0Q2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ3RhYmxlQ2VsbCcpO1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGRlZmF1bHRDZWxsVGVtcGxhdGUgPyBkZWZhdWx0Q2VsbFRlbXBsYXRlLnRSZWYgOiB0aGlzLl9mYlRhYmxlQ2VsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWRpdG9yQ2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ2VkaXRvckNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggZWRpdG9yQ2VsbCApIHtcbiAgICAgICAgY29sLmVkaXRvclRwbCA9IGVkaXRvckNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZWRpdG9yQ2VsbCcpO1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uczogQXJyYXk8UGJsQ29sdW1uIHwgUGJsTWV0YUNvbHVtblN0b3JlPiA9IFtdLmNvbmNhdCh0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgY29uc3QgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdoZWFkZXJDZWxsJykgfHwgeyB0UmVmOiB0aGlzLl9mYkhlYWRlckNlbGwgfTtcbiAgICBjb25zdCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2Zvb3RlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiRm9vdGVyQ2VsbCB9O1xuICAgIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZjxUPih0aGlzLnJlZ2lzdHJ5LCBjb2wsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2Zvb3RlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb2wuaGVhZGVyQ2VsbFRwbCA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgY29sLmZvb3RlckNlbGxUcGwgPSBmb290ZXJDZWxsRGVmLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29sLmhlYWRlcikge1xuICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuaGVhZGVyLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlci50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmhlYWRlckdyb3VwKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXJHcm91cCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICAgIGNvbC5oZWFkZXJHcm91cC50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmZvb3Rlcikge1xuICAgICAgICAgIGNvbnN0IGZvb3RlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuZm9vdGVyLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmZvb3Rlci50ZW1wbGF0ZSA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRIZWFkZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dEZWZzKSB7XG4gICAgICAvLyBUaGUgZ3JpZCBoZWFkZXIgKG1haW4sIHdpdGggY29sdW1uIG5hbWVzKSBpcyBhbHdheXMgdGhlIGxhc3Qgcm93IGRlZiAoaW5kZXggMClcbiAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCBpdCB0byBzaG93IGxhc3QgKGFmdGVyIGN1c3RvbSBoZWFkZXJzLCBncm91cCBoZWFkZXJzLi4uKSB3ZSBmaXJzdCBuZWVkIHRvIHB1bGwgaXQgYW5kIHRoZW4gcHVzaC5cblxuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgICBjb25zdCBhcnIgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLnRvQXJyYXkoKTtcbiAgICAgIGFyci5wdXNoKGFyci5zaGlmdCgpKTtcblxuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgYXJyKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb290ZXJSb3dEZWZzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMuX2Zvb3RlclJvd0RlZnMudG9BcnJheSgpKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19