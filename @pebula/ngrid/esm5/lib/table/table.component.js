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
import { EXT_API_TOKEN } from '../ext/table-ext-api';
import { PblNgridPluginController, PblNgridPluginContext } from '../ext/plugin-control';
import { PblDataSource, createDS } from '../data-source/index';
import { resetColumnWidths } from './utils';
import { findCellDef } from './directives/cell-def';
import { PblColumn, PblColumnStore } from './columns';
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
        var tableConfig = config.get('table');
        this.showHeader = tableConfig.showHeader;
        this.showFooter = tableConfig.showFooter;
        this.noFiller = tableConfig.noFiller;
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
         * The table's source of data
         *
         * @remarks
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
         */
        set: /**
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
         */
        get: /**
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
        // no need to unsubscribe, the reg service is per table instance and it will destroy when this table destroy.
        // Also, at this point initial changes from templates provided in the content are already inside so they will not trigger
        // the order here is very important, because component top of this table will fire life cycle hooks AFTER this component
        // so if we have a top level component registering a template on top it will not show unless we listen.
        this.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var e_1, _a;
            /** @type {?} */
            var tableCell = false;
            /** @type {?} */
            var headerFooterCell = false;
            try {
                for (var changes_1 = tslib_1.__values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var c = changes_1_1.value;
                    switch (c.type) {
                        case 'tableCell':
                            tableCell = true;
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
            if (tableCell) {
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
                    // If the number of rendered items has changed the table will update the data and run CD on it.
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
    };
    /**
     * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     */
    /**
     * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @param {?=} options
     * @return {?}
     */
    PblNgridComponent.prototype.resetColumnsWidth = /**
     * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns, options);
    };
    /**
     * Update the size of all group columns in the table based on the size of their visible children (not hidden).
     * @param dynamicWidthLogic - Optional logic container, if not set a new one is created.
     */
    /**
     * Update the size of all group columns in the table based on the size of their visible children (not hidden).
     * @param {?=} dynamicWidthLogic - Optional logic container, if not set a new one is created.
     * @return {?}
     */
    PblNgridComponent.prototype.syncColumnGroupsSize = /**
     * Update the size of all group columns in the table based on the size of their visible children (not hidden).
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
            if (g.columnDef) {
                g.columnDef.markForCheck();
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
        // if this is a table without groups
        if (rowWidth.minimumRowWidth === 0) {
            rowWidth.addGroup(columns.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.sizeInfo; })));
        }
        // if the max lock state has changed we need to update re-calculate the static width's again.
        if (rowWidth.maxWidthLockChanged) {
            resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns, { tableMarkForCheck: true });
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
     * Resize all visible columns to fit content of the table.
     * @param forceFixedWidth - When true will resize all columns with absolute pixel values, otherwise will keep the same format as originally set (% or none)
     */
    /**
     * Resize all visible columns to fit content of the table.
     * @param {?=} options
     * @return {?}
     */
    PblNgridComponent.prototype.autoSizeColumnToFit = /**
     * Resize all visible columns to fit content of the table.
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
        //        The problem is that some tables might require this because they do change size.
        //        An example is a table in a mat-tab that is hidden, the table will hit the resize one when we focus the tab
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
        this.resetColumnsWidth();
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
            function (fn) {
                if (extApi.table.isInit) {
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
                if (col instanceof PblColumn) {
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
            // The table header (main, with column names) is always the last row def (index 0)
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
                    template: "<!-- TABLE HEADER ROW DEF -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-visually-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- TABLE FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- TABLE FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\" [minWidth]=\"_cdkTable?.minWidth\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n       <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- TABLE HEADER CELL DEF -->\n        <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- TABLE FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUgsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBQ1IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FDM0UsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8s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b3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgZnJvbUV2ZW50UGF0dGVybiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCB0YXAsIG9ic2VydmVPbiwgc3dpdGNoTWFwLCBtYXAsIG1hcFRvLCBzdGFydFdpdGgsIHBhaXJ3aXNlLCBkZWJvdW5jZVRpbWUsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3RvcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIE5nWm9uZSxcbiAgaXNEZXZNb2RlLCBmb3J3YXJkUmVmLCBJdGVyYWJsZURpZmZlcnMsIEl0ZXJhYmxlRGlmZmVyLCBEb0NoZWNrLCBBdHRyaWJ1dGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmLCBDZGtSb3dEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRQYWdpbmF0b3JLaW5kIH0gZnJvbSAnLi4vcGFnaW5hdG9yJztcbmltcG9ydCB7IERhdGFTb3VyY2VQcmVkaWNhdGUsIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsRGF0YVNvdXJjZSwgRGF0YVNvdXJjZU9mLCBjcmVhdGVEUyB9IGZyb20gJy4uL2RhdGEtc291cmNlL2luZGV4JztcbmltcG9ydCB7IFBibENka1RhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9wYmwtY2RrLXRhYmxlL3BibC1jZGstdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IHJlc2V0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBmaW5kQ2VsbERlZiB9IGZyb20gJy4vZGlyZWN0aXZlcy9jZWxsLWRlZic7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIFBibENvbHVtblN0b3JlLCBQYmxNZXRhQ29sdW1uU3RvcmUsIFBibE5ncmlkQ29sdW1uU2V0LCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQgfSBmcm9tICcuL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIENvbnRleHRBcGksIFBibE5ncmlkQ29udGV4dEFwaSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90YWJsZS1yZWdpc3RyeS5zZXJ2aWNlJztcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlnJztcbmltcG9ydCB7IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljLCBEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZIH0gZnJvbSAnLi9jb2wtd2lkdGgtbG9naWMvZHluYW1pYy1jb2x1bW4td2lkdGgnO1xuaW1wb3J0IHsgQ29sdW1uQXBpLCBBdXRvU2l6ZVRvRml0T3B0aW9ucyB9IGZyb20gJy4vY29sdW1uLWFwaSc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvd3MvaW5kZXgnO1xuXG5pbXBvcnQgeyBiaW5kVG9EYXRhU291cmNlIH0gZnJvbSAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnO1xuaW1wb3J0ICcuL2JpbmQtdG8tZGF0YXNvdXJjZSc7IC8vIExFQVZFIFRISVMsIFdFIE5FRUQgSVQgU08gVEhFIEFVR01FTlRBVElPTiBJTiBUSEUgRklMRSBXSUxMIExPQUQuXG5cbmltcG9ydCB7IHNldElkZW50aXR5UHJvcCB9IGZyb20gJy4vdGFibGUuZGVwcmVjYXRlLWF0LTEuMC4wJztcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVybmFsQXBpRmFjdG9yeSh0YWJsZTogeyBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTsgfSkgeyByZXR1cm4gdGFibGUuX2V4dEFwaTsgfVxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbkNvbnRyb2xsZXJGYWN0b3J5KHRhYmxlOiB7IF9wbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dDsgfSkgeyByZXR1cm4gdGFibGUuX3BsdWdpbi5jb250cm9sbGVyOyB9XG5leHBvcnQgZnVuY3Rpb24gbWV0YVJvd1NlcnZpY2VGYWN0b3J5KHRhYmxlOiB7IF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpOyB9KSB7IHJldHVybiB0YWJsZS5fZXh0QXBpLm1ldGFSb3dTZXJ2aWNlOyB9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi90YWJsZS5jb21wb25lbnQuc2NzcycgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgdXNlRmFjdG9yeTogcGx1Z2luQ29udHJvbGxlckZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogRVhUX0FQSV9UT0tFTixcbiAgICAgIHVzZUZhY3Rvcnk6IGludGVybmFsQXBpRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLFxuICAgICAgdXNlRmFjdG9yeTogbWV0YVJvd1NlcnZpY2VGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9XG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbXBvbmVudDxUID0gYW55PiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0luaXQsIERvQ2hlY2ssIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBoZWFkZXIgcm93LlxuICAgKiBEZWZhdWx0OiB0cnVlXG4gICAqL1xuICBASW5wdXQoKSBnZXQgc2hvd0hlYWRlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dIZWFkZXI7IH07XG4gIHNldCBzaG93SGVhZGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0hlYWRlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3Nob3dIZWFkZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNob3cvSGlkZSB0aGUgZm9vdGVyIHJvdy5cbiAgICogRGVmYXVsdDogZmFsc2VcbiAgICovXG4gIEBJbnB1dCgpIGdldCBzaG93Rm9vdGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0Zvb3RlcjsgfTtcbiAgc2V0IHNob3dGb290ZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93Rm9vdGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2hvd0Zvb3RlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB0aGUgZmlsbGVyIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG5vRmlsbGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbm9GaWxsZXI7IH07XG4gIHNldCBub0ZpbGxlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX25vRmlsbGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfbm9GaWxsZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFNldCdzIHRoZSBiZWhhdmlvciBvZiB0aGUgdGFibGUgd2hlbiB0YWJiaW5nLlxuICAgKiBUaGUgZGVmYXVsdCBiZWhhdmlvciBpcyBub25lIChyb3dzIGFuZCBjZWxscyBhcmUgbm90IGZvY3VzYWJsZSlcbiAgICpcbiAgICogTm90ZSB0aGF0IHRoZSBmb2N1cyBtb2RlIGhhcyBhbiBlZmZlY3Qgb24gb3RoZXIgZnVuY3Rpb25zLCBmb3IgZXhhbXBsZSBhIGRldGFpbCByb3cgd2lsbCB0b2dnbGUgKG9wZW4vY2xvc2UpIHVzaW5nXG4gICAqIEVOVEVSIC8gU1BBQ0Ugb25seSB3aGVuIGZvY3VzTW9kZSBpcyBzZXQgdG8gYHJvd2AuXG4gICAqL1xuICBASW5wdXQoKSBmb2N1c01vZGU6ICdyb3cnIHwgJ2NlbGwnIHwgJ25vbmUnIHwgJycgfCBmYWxzZSB8IHVuZGVmaW5lZDtcblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBwSW5kZXhgIGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbi4gKFJlbW92ZWQgaW4gMS4wLjApXG4gICAqL1xuICBASW5wdXQoKSBnZXQgaWRlbnRpdHlQcm9wKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9faWRlbnRpdHlQcm9wOyB9XG4gIHNldCBpZGVudGl0eVByb3AodmFsdWU6IHN0cmluZykgeyB0aGlzLl9faWRlbnRpdHlQcm9wID0gdmFsdWU7IHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdmFsdWUpOyB9XG4gIHByaXZhdGUgX19pZGVudGl0eVByb3A6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHRhYmxlJ3Mgc291cmNlIG9mIGRhdGFcbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhlIHRhYmxlJ3Mgc291cmNlIG9mIGRhdGEsIHdoaWNoIGNhbiBiZSBwcm92aWRlZCBpbiAyIHdheXM6XG4gICAqXG4gICAqIC0gRGF0YVNvdXJjZU9mPFQ+XG4gICAqIC0gUGJsRGF0YVNvdXJjZTxUPlxuICAgKlxuICAgKiBUaGUgdGFibGUgb25seSB3b3JrcyB3aXRoIGBQYmxEYXRhU291cmNlPFQ+YCwgYERhdGFTb3VyY2VPZjxUPmAgaXMgYSBzaG9ydGN1dCBmb3IgcHJvdmlkaW5nXG4gICAqIHRoZSBkYXRhIGFycmF5IGRpcmVjdGx5LlxuICAgKlxuICAgKiBgRGF0YVNvdXJjZU9mPFQ+YCBjYW4gYmU6XG4gICAqXG4gICAqIC0gU2ltcGxlIGRhdGEgYXJyYXkgKGVhY2ggb2JqZWN0IHJlcHJlc2VudHMgb25lIHRhYmxlIHJvdylcbiAgICogLSBQcm9taXNlIGZvciBhIGRhdGEgYXJyYXlcbiAgICogLSBTdHJlYW0gdGhhdCBlbWl0cyBhIGRhdGEgYXJyYXkgZWFjaCB0aW1lIHRoZSBhcnJheSBjaGFuZ2VzXG4gICAqXG4gICAqIFdoZW4gYSBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBwcm92aWRlZCBpdCBpcyBjb252ZXJ0ZWQgaW50byBhbiBpbnN0YW5jZSBvZiBgUGJsRGF0YVNvdXJjZTxUPmAuXG4gICAqXG4gICAqIFRvIGFjY2VzcyB0aGUgYFBibERhdGFTb3VyY2U8VD5gIGluc3RhbmNlIHVzZSB0aGUgYGRzYCBwcm9wZXJ0eSAocmVhZG9ubHkpLlxuICAgKlxuICAgKiBJdCBpcyBoaWdobHkgcmVjb21tZW5kZWQgdG8gdXNlIGBQYmxEYXRhU291cmNlPFQ+YCBkaXJlY3RseSwgdGhlIGRhdGFzb3VyY2UgZmFjdG9yeSBtYWtlcyBpdCBlYXN5LlxuICAgKiBGb3IgZXhhbXBsZSwgd2hlbiBhbiBhcnJheSBpcyBwcm92aWRlZCB0aGUgZmFjdG9yeSBpcyB1c2VkIHRvIGNvbnZlcnQgaXQgdG8gYSBkYXRhc291cmNlOlxuICAgKlxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IGNvbGxlY3Rpb246IFRbXSA9IFtdO1xuICAgKiBjb25zdCBwYmxEYXRhU291cmNlID0gY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IGNvbGxlY3Rpb24gKS5jcmVhdGUoKTtcbiAgICogYGBgXG4gICAqXG4gICAqID4gVGhpcyBpcyBhIHdyaXRlLW9ubHkgKHNldHRlcikgcHJvcGVydHkgdGhhdCB0cmlnZ2VycyB0aGUgYHNldERhdGFTb3VyY2VgIG1ldGhvZC5cbiAgICovXG4gIEBJbnB1dCgpIHNldCBkYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+IHwgRGF0YVNvdXJjZU9mPFQ+KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgUGJsRGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5zZXREYXRhU291cmNlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXREYXRhU291cmNlKGNyZWF0ZURTPFQ+KCkub25UcmlnZ2VyKCAoKSA9PiB2YWx1ZSB8fCBbXSApLmNyZWF0ZSgpKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZHMoKTogUGJsRGF0YVNvdXJjZTxUPiB7IHJldHVybiB0aGlzLl9kYXRhU291cmNlOyB9O1xuXG4gIEBJbnB1dCgpIGdldCB1c2VQYWdpbmF0aW9uKCk6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlIHsgcmV0dXJuIHRoaXMuX3BhZ2luYXRpb247IH1cbiAgc2V0IHVzZVBhZ2luYXRpb24odmFsdWU6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlKSB7XG4gICAgaWYgKCh2YWx1ZSBhcyBhbnkpID09PSAnJykge1xuICAgICAgdmFsdWUgPSAncGFnZU51bWJlcic7XG4gICAgfVxuICAgIGlmICggdmFsdWUgIT09IHRoaXMuX3BhZ2luYXRpb24gKSB7XG4gICAgICB0aGlzLl9wYWdpbmF0aW9uID0gdmFsdWU7XG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IG5vQ2FjaGVQYWdpbmF0b3IoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yOyB9XG4gIHNldCBub0NhY2hlUGFnaW5hdG9yKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9ub0NhY2hlUGFnaW5hdG9yICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fbm9DYWNoZVBhZ2luYXRvciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuZHMgJiYgdGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGNvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhpcyB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGNvbHVtbnM6IFBibE5ncmlkQ29sdW1uU2V0IHwgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0O1xuXG4gIEBJbnB1dCgpIHNldCBoaWRlQ29sdW1ucyh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICB0aGlzLl9oaWRlQ29sdW1ucyA9IHZhbHVlO1xuICAgIHRoaXMuX2hpZGVDb2x1bW5zRGlydHkgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZmFsbGJhY2sgaGVpZ2h0IGZvciBcInRoZSBpbm5lciBzY3JvbGwgY29udGFpbmVyXCIuXG4gICAqIFRoZSBmYWxsYmFjayBpcyB1c2VkIG9ubHkgd2hlbiBpdCBMT1dFUiB0aGFuIHRoZSByZW5kZXJlZCBoZWlnaHQsIHNvIG5vIGVtcHR5IGdhcHMgYXJlIGNyZWF0ZWQgd2hlbiBzZXR0aW5nIHRoZSBmYWxsYmFjay5cbiAgICpcbiAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIHRoZSBhcmVhIGluIHdoaWNoIGFsbCBkYXRhIHJvd3MgYXJlIHJlbmRlcmVkIGFuZCBhbGwgbWV0YSAoaGVhZGVyL2Zvb3Rlcikgcm93cyB0aGF0IGFyZSBvZiB0eXBlIFwicm93XCIgb3IgXCJzdGlja3lcIi5cbiAgICogVGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIGRlZmluZWQgdG8gY29uc3VtZSBhbGwgdGhlIGhlaWdodCBsZWZ0IGFmdGVyIGFsbCBleHRlcm5hbCBvYmplY3RzIGFyZSByZW5kZXJlZC5cbiAgICogRXh0ZXJuYWwgb2JqZWN0cyBjYW4gYmUgZml4ZWQgbWV0YSByb3dzIChoZWFkZXIvZm9vdGVyKSwgcGFnaW5hdGlvbiByb3csIGFjdGlvbiByb3cgZXRjLi4uXG4gICAqXG4gICAqIElmIHRoZSB0YWJsZSBkb2VzIG5vdCBoYXZlIGEgaGVpZ2h0ICglIG9yIHB4KSB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBhbHdheXMgaGF2ZSBubyBoZWlnaHQgKDApLlxuICAgKiBJZiB0aGUgdGFibGUgaGFzIGEgaGVpZ2h0LCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgd2lsbCBnZXQgdGhlIGhlaWdodCBsZWZ0LCB3aGljaCBjYW4gYWxzbyBiZSAwIGlmIHRoZXJlIGFyZSBhIGxvdCBvZiBleHRlcm5hbCBvYmplY3RzLlxuICAgKlxuICAgKiBUbyBzb2x2ZSB0aGUgbm8taGVpZ2h0IHByb2JsZW0gd2UgdXNlIHRoZSBmYWxsYmFja01pbkhlaWdodCBwcm9wZXJ0eS5cbiAgICpcbiAgICogV2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBkaXNhYmxlZCBhbmQgZmFsbGJhY2tNaW5IZWlnaHQgaXMgbm90IHNldCB0aGUgdGFibGUgd2lsbCBzZXQgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGhlaWdodCB0byBzaG93IGFsbCByb3dzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiB1c2luZyBhIGZpeGVkIChweCkgaGVpZ2h0IGZvciB0aGUgdGFibGUsIGlmIHRoZSBoZWlnaHQgb2YgYWxsIGV4dGVybmFsIG9iamVjdHMgKyB0aGUgaGVpZ2h0IG9mIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBncmVhdGVyIHRoZW5cbiAgICogdGhlIHRhYmxlJ3MgaGVpZ2h0IGEgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIHNob3cuXG4gICAqIElmIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcInMgaGVpZ2h0IHdpbGwgYmUgbG93ZXIgdGhlbiBpdCdzIHJlbmRlcmVkIGNvbnRlbnQgaGVpZ2h0IGFuZCBhZGRpdGlvbmFsIHZlcnRpY2FsIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIsIHdoaWNoIGlzLCB1c3VhbGx5LCBub3QgZ29vZC5cbiAgICpcbiAgICogVG8gYXZvaWQgdGhpcywgZG9uJ3QgdXNlIGZhbGxiYWNrTWluSGVpZ2h0IHRvZ2V0aGVyIHdpdGggYSBmaXhlZCBoZWlnaHQgZm9yIHRoZSB0YWJsZS4gSW5zdGVhZCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIG1pbiBoZWlnaHQgZm9yIHRoZSB0YWJsZS5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBmYWxsYmFja01pbkhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQ7IH1cbiAgc2V0IGZhbGxiYWNrTWluSGVpZ2h0KHZhbHVlOiBudW1iZXIpIHtcbiAgICB2YWx1ZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIHJvd0NsYXNzVXBkYXRlOiB1bmRlZmluZWQgfCAoIChjb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pID0+ICggc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSApKTtcbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGVGcmVxOiAnaXRlbScgfCAnbmdEb0NoZWNrJyB8ICdub25lJyA9ICdpdGVtJztcblxuICByb3dGb2N1czogMCB8ICcnID0gJyc7XG4gIGNlbGxGb2N1czogMCB8ICcnID0gJyc7XG5cbiAgcHJpdmF0ZSBfZmFsbGJhY2tNaW5IZWlnaHQgPSAwO1xuICBwcml2YXRlIF9kYXRhU291cmNlOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZVRhYmxlJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQmVmb3JlVGFibGU6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2JlZm9yZUNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVDb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdhZnRlckNvbnRlbnQnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZBZnRlckNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2ZiVGFibGVDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYlRhYmxlQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiSGVhZGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJIZWFkZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoJ2ZiRm9vdGVyQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJGb290ZXJDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxUPj47XG4gIEBWaWV3Q2hpbGQoQ2RrUm93RGVmLCB7IHN0YXRpYzogdHJ1ZSB9KSBfdGFibGVSb3dEZWY6IENka1Jvd0RlZjxUPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtIZWFkZXJSb3dEZWYpIF9oZWFkZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrSGVhZGVyUm93RGVmPjtcbiAgQFZpZXdDaGlsZHJlbihDZGtGb290ZXJSb3dEZWYpIF9mb290ZXJSb3dEZWZzOiBRdWVyeUxpc3Q8Q2RrRm9vdGVyUm93RGVmPjtcblxuICBnZXQgbWV0YUNvbHVtbklkcygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbklkcyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5JZHM7IH1cbiAgZ2V0IG1ldGFDb2x1bW5zKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1ucyddIHsgcmV0dXJuIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5Sb3dEZWYoKSB7IHJldHVybiB7IGhlYWRlcjogdGhpcy5fc3RvcmUuaGVhZGVyQ29sdW1uRGVmLCBmb290ZXI6IHRoaXMuX3N0b3JlLmZvb3RlckNvbHVtbkRlZiB9OyB9XG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZCAoYWZ0ZXIgQWZ0ZXJWaWV3SW5pdClcbiAgICovXG4gIHJlYWRvbmx5IGlzSW5pdDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgY29sdW1uQXBpOiBDb2x1bW5BcGk8VD47XG4gIGdldCBjb250ZXh0QXBpKCk6IFBibE5ncmlkQ29udGV4dEFwaTxUPiB7IHJldHVybiB0aGlzLl9leHRBcGkuY29udGV4dEFwaTsgfVxuXG4gIGdldCB2aWV3cG9ydCgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfCB1bmRlZmluZWQgeyByZXR1cm4gdGhpcy5fdmlld3BvcnQ7IH1cblxuICBfY2RrVGFibGU6IFBibENka1RhYmxlQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIF9zdG9yZTogUGJsQ29sdW1uU3RvcmUgPSBuZXcgUGJsQ29sdW1uU3RvcmUoKTtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnNEaXJ0eTogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGlkZUNvbHVtbnM6IHN0cmluZ1tdO1xuICBwcml2YXRlIF9jb2xIaWRlRGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmc+O1xuICBwcml2YXRlIF9ub0RhdGVFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0b3JFbWJlZGRlZFZSZWY6IEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZTtcbiAgcHJpdmF0ZSBfbm9DYWNoZVBhZ2luYXRvciA9IGZhbHNlO1xuICBwcml2YXRlIF9taW5pbXVtUm93V2lkdGg6IHN0cmluZztcbiAgcHJpdmF0ZSBfdmlld3BvcnQ/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQ7XG4gIHByaXZhdGUgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0O1xuICBwcml2YXRlIF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGluamVjdG9yOiBJbmplY3RvciwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGRpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBwdWJsaWMgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgICAgICAgICAgICBAQXR0cmlidXRlKCdpZCcpIHB1YmxpYyByZWFkb25seSBpZDogc3RyaW5nKSB7XG4gICAgY29uc3QgdGFibGVDb25maWcgPSBjb25maWcuZ2V0KCd0YWJsZScpO1xuICAgIHRoaXMuc2hvd0hlYWRlciA9IHRhYmxlQ29uZmlnLnNob3dIZWFkZXI7XG4gICAgdGhpcy5zaG93Rm9vdGVyID0gdGFibGVDb25maWcuc2hvd0Zvb3RlcjtcbiAgICB0aGlzLm5vRmlsbGVyID0gdGFibGVDb25maWcubm9GaWxsZXI7XG5cbiAgICB0aGlzLmluaXRFeHRBcGkoKTtcbiAgICB0aGlzLmNvbHVtbkFwaSA9IENvbHVtbkFwaS5jcmVhdGU8VD4odGhpcywgdGhpcy5fc3RvcmUsIHRoaXMuX2V4dEFwaSk7XG4gICAgdGhpcy5pbml0UGx1Z2lucyhpbmplY3RvciwgZWxSZWYsIHZjUmVmKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGlkZUNvbHVtbnNEaXJ0eSkge1xuICAgICAgdGhpcy5faGlkZUNvbHVtbnNEaXJ0eSA9IGZhbHNlO1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9oaWRlQ29sdW1ucztcbiAgICAgIGlmICghdGhpcy5fY29sSGlkZURpZmZlciAmJiB2YWx1ZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMuX2NvbEhpZGVEaWZmZXIgPSB0aGlzLmRpZmZlcnMuZmluZCh2YWx1ZSkuY3JlYXRlKCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIGEgZGlmZmVyIHN1cHBvcnRpbmcgb2JqZWN0ICcke3ZhbHVlfS4gaGlkZUNvbHVtbnMgb25seSBzdXBwb3J0cyBiaW5kaW5nIHRvIEl0ZXJhYmxlcyBzdWNoIGFzIEFycmF5cy5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5fY29sSGlkZURpZmZlcikge1xuICAgICAgY29uc3QgaGlkZUNvbHVtbnMgPSB0aGlzLl9oaWRlQ29sdW1ucyB8fCBbXTtcbiAgICAgIGNvbnN0IGNoYW5nZXMgPSB0aGlzLl9jb2xIaWRlRGlmZmVyLmRpZmYoaGlkZUNvbHVtbnMpO1xuICAgICAgaWYgKGNoYW5nZXMpIHtcbiAgICAgICAgdGhpcy5fc3RvcmUuaGlkZGVuID0gaGlkZUNvbHVtbnM7XG4gICAgICAgIHRoaXMuX21pbmltdW1Sb3dXaWR0aCA9ICcnO1xuXG4gICAgICAgIC8vIFRPRE8oc2hsb21pYXNzYWYpIFtwZXJmLCA0XTogUmlnaHQgbm93IHdlIGF0dGFjaCBhbGwgY29sdW1ucywgd2UgY2FuIGltcHJvdmUgaXQgYnkgYXR0YWNoaW5nIG9ubHkgdGhvc2UgXCJhZGRlZFwiICh3ZSBrbm93IHRoZW0gZnJvbSBcImNoYW5nZXNcIilcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMuX2hpZGVDb2x1bW5zKSB7XG4gICAgICAgIHRoaXMuX2NvbEhpZGVEaWZmZXIgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIG5vIG5lZWQgdG8gdW5zdWJzY3JpYmUsIHRoZSByZWcgc2VydmljZSBpcyBwZXIgdGFibGUgaW5zdGFuY2UgYW5kIGl0IHdpbGwgZGVzdHJveSB3aGVuIHRoaXMgdGFibGUgZGVzdHJveS5cbiAgICAvLyBBbHNvLCBhdCB0aGlzIHBvaW50IGluaXRpYWwgY2hhbmdlcyBmcm9tIHRlbXBsYXRlcyBwcm92aWRlZCBpbiB0aGUgY29udGVudCBhcmUgYWxyZWFkeSBpbnNpZGUgc28gdGhleSB3aWxsIG5vdCB0cmlnZ2VyXG4gICAgLy8gdGhlIG9yZGVyIGhlcmUgaXMgdmVyeSBpbXBvcnRhbnQsIGJlY2F1c2UgY29tcG9uZW50IHRvcCBvZiB0aGlzIHRhYmxlIHdpbGwgZmlyZSBsaWZlIGN5Y2xlIGhvb2tzIEFGVEVSIHRoaXMgY29tcG9uZW50XG4gICAgLy8gc28gaWYgd2UgaGF2ZSBhIHRvcCBsZXZlbCBjb21wb25lbnQgcmVnaXN0ZXJpbmcgYSB0ZW1wbGF0ZSBvbiB0b3AgaXQgd2lsbCBub3Qgc2hvdyB1bmxlc3Mgd2UgbGlzdGVuLlxuICAgIHRoaXMucmVnaXN0cnkuY2hhbmdlcy5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgbGV0IHRhYmxlQ2VsbCA9IGZhbHNlO1xuICAgICAgbGV0IGhlYWRlckZvb3RlckNlbGwgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgYyBvZiBjaGFuZ2VzKSB7XG4gICAgICAgIHN3aXRjaCAoYy50eXBlKSB7XG4gICAgICAgICAgY2FzZSAndGFibGVDZWxsJzpcbiAgICAgICAgICAgIHRhYmxlQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJDZWxsJzpcbiAgICAgICAgICBjYXNlICdmb290ZXJDZWxsJzpcbiAgICAgICAgICAgIGhlYWRlckZvb3RlckNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbm9EYXRhJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcic6XG4gICAgICAgICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRhYmxlQ2VsbCkge1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgIH1cbiAgICAgIGlmIChoZWFkZXJGb290ZXJDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaW52YWxpZGF0ZUNvbHVtbnMoKTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXNJbml0JywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uSW5pdCcgfSk7XG5cbiAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG5cbiAgICAvLyBBZGRpbmcgYSBkaXYgYmVmb3JlIHRoZSBmb290ZXIgcm93IHZpZXcgcmVmZXJlbmNlLCB0aGlzIGRpdiB3aWxsIGJlIHVzZWQgdG8gZmlsbCB1cCB0aGUgc3BhY2UgYmV0d2VlbiBoZWFkZXIgJiBmb290ZXIgcm93c1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtZW1wdHktc3BhY2VyJylcbiAgICB0aGlzLl9jZGtUYWJsZS5fZWxlbWVudC5pbnNlcnRCZWZvcmUoZGl2LCB0aGlzLl9jZGtUYWJsZS5fZm9vdGVyUm93T3V0bGV0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5saXN0ZW5Ub1Jlc2l6ZSgpO1xuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBjb2RlIHdpbGwgY2F0Y2ggY29udGV4dCBmb2N1c2VkIGV2ZW50cywgZmluZCB0aGUgSFRNTCBlbGVtZW50IG9mIHRoZSBjZWxsIGFuZCBmb2N1cyBpdC5cbiAgICB0aGlzLmNvbnRleHRBcGkuZm9jdXNDaGFuZ2VkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5jdXJyKSB7XG4gICAgICAgICAgY29uc3Qgcm93Q29udGV4dCA9IHRoaXMuY29udGV4dEFwaS5maW5kUm93SW5WaWV3KGV2ZW50LmN1cnIucm93SWRlbnQpO1xuICAgICAgICAgIGlmIChyb3dDb250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldChyb3dDb250ZXh0LmluZGV4KSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgICAgICAgIGlmICh2aWV3KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxWaWV3SW5kZXggPSB0aGlzLmNvbHVtbkFwaS5yZW5kZXJJbmRleE9mKHRoaXMuY29sdW1uQXBpLmNvbHVtbnNbZXZlbnQuY3Vyci5jb2xJbmRleF0pXG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gdmlldy5yb290Tm9kZXNbMF0ucXVlcnlTZWxlY3RvckFsbCgncGJsLW5ncmlkLWNlbGwnKVtjZWxsVmlld0luZGV4XTtcbiAgICAgICAgICAgICAgaWYgKGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgbGV0IHByb2Nlc3NDb2x1bW5zID0gZmFsc2U7XG5cbiAgICBpZiAoY2hhbmdlcy5mb2N1c01vZGUpIHtcbiAgICAgIHRoaXMucm93Rm9jdXMgPSB0aGlzLmZvY3VzTW9kZSA9PT0gJ3JvdycgPyAwIDogJyc7XG4gICAgICB0aGlzLmNlbGxGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAnY2VsbCcgPyAwIDogJyc7XG4gICAgfVxuXG4gICAgaWYgKCBjaGFuZ2VzLmNvbHVtbnMgJiYgdGhpcy5pc0luaXQgKSB7XG4gICAgICBwcm9jZXNzQ29sdW1ucyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCBwcm9jZXNzQ29sdW1ucyA9PT0gdHJ1ZSApIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUNvbHVtbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgICAgdGhpcy5fcGx1Z2luLmRlc3Ryb3koKTtcbiAgICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5kZXRhY2hWaWV3UG9ydCgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsZXQgcDogUHJvbWlzZTx2b2lkPjtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uRGVzdHJveScsIHdhaXQ6IChfcDogUHJvbWlzZTx2b2lkPikgPT4gcCA9IF9wIH0pO1xuICAgIGlmIChwKSB7XG4gICAgICBwLnRoZW4oZGVzdHJveSkuY2F0Y2goZGVzdHJveSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IFQpOiBhbnkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBzb3J0IGRlZmluaXRpb25zLlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0U29ydGBcbiAgICpcbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgc29ydGluZyBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIG9yIGBzb3J0QWxpYXNgIHByb3BlcnRpZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gY29sdW1uT3JTb3J0QWxpYXMgQSBjb2x1bW4gaW5zdGFuY2Ugb3IgYSBzdHJpbmcgbWF0Y2hpbmcgYFBibENvbHVtbi5zb3J0QWxpYXNgIG9yIGBQYmxDb2x1bW4uaWRgLlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM6IFBibENvbHVtbiB8IHN0cmluZywgc29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICBzZXRTb3J0KGNvbHVtbk9yU29ydEFsaWFzPzogUGJsQ29sdW1uIHwgc3RyaW5nIHwgYm9vbGVhbiwgc29ydD86IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghY29sdW1uT3JTb3J0QWxpYXMgfHwgdHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuZHMuc2V0U29ydCghIWNvbHVtbk9yU29ydEFsaWFzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29sdW1uOiBQYmxDb2x1bW47XG4gICAgaWYgKHR5cGVvZiBjb2x1bW5PclNvcnRBbGlhcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbHVtbiA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmluZCggYyA9PiBjLmFsaWFzID8gYy5hbGlhcyA9PT0gY29sdW1uT3JTb3J0QWxpYXMgOiAoYy5zb3J0ICYmIGMuaWQgPT09IGNvbHVtbk9yU29ydEFsaWFzKSApO1xuICAgICAgaWYgKCFjb2x1bW4gJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBjb2x1bW4gd2l0aCBhbGlhcyBcIiR7Y29sdW1uT3JTb3J0QWxpYXN9XCIuYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uID0gY29sdW1uT3JTb3J0QWxpYXM7XG4gICAgfVxuICAgIHRoaXMuZHMuc2V0U29ydChjb2x1bW4sIHNvcnQsIHNraXBVcGRhdGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCwgRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAuXG4gICAqL1xuICBzZXRGaWx0ZXIoKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgZnVuY3Rpb24gcHJlZGljYXRlLlxuICAgKlxuICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBEYXRhU291cmNlUHJlZGljYXRlLCBjb2x1bW5zPzogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIHZhbHVlIHRvIGNvbXBhcmUgd2l0aCBhbmQgYSBsaXN0IG9mIGNvbHVtbnMgd2l0aCB0aGUgdmFsdWVzIHRvIGNvbXBhcmUgdG8uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYCB3aXRoIHRoZSBhZGRlZCBzdWdhciBvZiBwcm92aWRpbmcgY29sdW1uIGJ5IHN0cmluZyB0aGF0IG1hdGNoIHRoZSBgaWRgIHByb3BlcnR5LlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYFxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBhbnksIGNvbHVtbnM6IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkO1xuICBzZXRGaWx0ZXIodmFsdWU/OiBEYXRhU291cmNlRmlsdGVyVG9rZW4sIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgY29sdW1uSW5zdGFuY2VzOiBQYmxDb2x1bW5bXTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbHVtbnMpICYmIHR5cGVvZiBjb2x1bW5zWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb2x1bW5JbnN0YW5jZXMgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjb2xJZCBvZiBjb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2xJZCA6IChjLmlkID09PSBjb2xJZCkgKTtcbiAgICAgICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBDb3VsZCBub3QgZmluZCBjb2x1bW4gd2l0aCBhbGlhcyAke2NvbElkfSBcIiR7Y29sSWR9XCIuYCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbHVtbkluc3RhbmNlcy5wdXNoKGNvbHVtbik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IGNvbHVtbnMgYXMgYW55O1xuICAgICAgfVxuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIodmFsdWUsIGNvbHVtbkluc3RhbmNlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHMuc2V0RmlsdGVyKCk7XG4gICAgfVxuICB9XG5cbiAgc2V0RGF0YVNvdXJjZSh2YWx1ZTogUGJsRGF0YVNvdXJjZTxUPik6IHZvaWQge1xuICAgIGlmICh0aGlzLl9kYXRhU291cmNlICE9PSB2YWx1ZSkge1xuICAgICAgLy8gS0lMTCBBTEwgc3Vic2NyaXB0aW9ucyBmb3IgdGhlIHByZXZpb3VzIGRhdGFzb3VyY2UuXG4gICAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSkge1xuICAgICAgICBVblJ4LmtpbGwodGhpcywgdGhpcy5fZGF0YVNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9kYXRhU291cmNlO1xuICAgICAgdGhpcy5fZGF0YVNvdXJjZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RrVGFibGUuZGF0YVNvdXJjZSA9IHZhbHVlIGFzIGFueTtcblxuICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgICAgdGhpcy5zZXR1cE5vRGF0YShmYWxzZSk7XG5cbiAgICAgIC8vIGNsZWFyIHRoZSBjb250ZXh0LCBuZXcgZGF0YXNvdXJjZVxuICAgICAgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcblxuICAgICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7XG4gICAgICAgIGtpbmQ6ICdvbkRhdGFTb3VyY2UnLFxuICAgICAgICBwcmV2LFxuICAgICAgICBjdXJyOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICggdmFsdWUgKSB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIHZhbHVlLm9uRXJyb3IucGlwZShVblJ4KHRoaXMsIHZhbHVlKSkuc3Vic2NyaWJlKGNvbnNvbGUuZXJyb3IuYmluZChjb25zb2xlKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSByZWdpc3RlciB0byB0aGlzIGV2ZW50IGJlY2F1c2UgaXQgZmlyZXMgYmVmb3JlIHRoZSBlbnRpcmUgZGF0YS1jaGFuZ2luZyBwcm9jZXNzIHN0YXJ0cy5cbiAgICAgICAgLy8gVGhpcyBpcyByZXF1aXJlZCBiZWNhdXNlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgaXMgZmlyZWQgYXN5bmMsIGp1c3QgYmVmb3JlIHRoZSBkYXRhIGlzIGVtaXR0ZWQuXG4gICAgICAgIC8vIEl0cyBub3QgZW5vdWdoIHRvIGNsZWFyIHRoZSBjb250ZXh0IHdoZW4gYHNldERhdGFTb3VyY2VgIGlzIGNhbGxlZCwgd2UgYWxzbyBuZWVkIHRvIGhhbmRsZSBgcmVmcmVzaGAgY2FsbHMgd2hpY2ggd2lsbCBub3RcbiAgICAgICAgLy8gdHJpZ2dlciB0aGlzIG1ldGhvZC5cbiAgICAgICAgdmFsdWUub25Tb3VyY2VDaGFuZ2luZy5waXBlKFVuUngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCkgKTtcblxuICAgICAgICAvLyBSdW4gQ0QsIHNjaGVkdWxlZCBhcyBhIG1pY3JvLXRhc2ssIGFmdGVyIGVhY2ggcmVuZGVyaW5nXG4gICAgICAgIHZhbHVlLm9uUmVuZGVyRGF0YUNoYW5naW5nXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoICh7ZXZlbnR9KSA9PiAhZXZlbnQuaXNJbml0aWFsICYmIChldmVudC5wYWdpbmF0aW9uLmNoYW5nZWQgfHwgZXZlbnQuc29ydC5jaGFuZ2VkIHx8IGV2ZW50LmZpbHRlci5jaGFuZ2VkKSksXG4gICAgICAgICAgICAvLyBDb250ZXh0IGJldHdlZW4gdGhlIG9wZXJhdGlvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgYXQgdGhlIG1vbWVudFxuICAgICAgICAgICAgLy8gRXZlbnQgZm9yIGNsaWVudCBzaWRlIG9wZXJhdGlvbnMuLi5cbiAgICAgICAgICAgIC8vIFRPRE86IGNhbiB3ZSByZW1vdmUgdGhpcz8gd2UgY2xlYXIgdGhlIGNvbnRleHQgd2l0aCBgb25Tb3VyY2VDaGFuZ2luZ2BcbiAgICAgICAgICAgIHRhcCggKCkgPT4gIXRoaXMuX3N0b3JlLnByaW1hcnkgJiYgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCAoKSA9PiB2YWx1ZS5vblJlbmRlcmVkRGF0YUNoYW5nZWQucGlwZSh0YWtlKDEpLCBtYXBUbyh0aGlzLmRzLnJlbmRlckxlbmd0aCkpICksXG4gICAgICAgICAgICBvYnNlcnZlT24oYXNhcFNjaGVkdWxlciksXG4gICAgICAgICAgICBVblJ4KHRoaXMsIHZhbHVlKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCBwcmV2aW91c1JlbmRlckxlbmd0aCA9PiB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbnVtYmVyIG9mIHJlbmRlcmVkIGl0ZW1zIGhhcyBjaGFuZ2VkIHRoZSB0YWJsZSB3aWxsIHVwZGF0ZSB0aGUgZGF0YSBhbmQgcnVuIENEIG9uIGl0LlxuICAgICAgICAgICAgLy8gc28gd2Ugb25seSB1cGRhdGUgdGhlIHJvd3MuXG4gICAgICAgICAgICBjb25zdCB7IGNka1RhYmxlIH0gPSB0aGlzLl9leHRBcGk7XG4gICAgICAgICAgICBpZiAocHJldmlvdXNSZW5kZXJMZW5ndGggPT09IHRoaXMuZHMucmVuZGVyTGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicsIHRydWUpO1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cygnZm9vdGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSGFuZGxpbmcgbm8gZGF0YSBvdmVybGF5XG4gICAgICAgIC8vIEhhbmRsaW5nIGZhbGxiYWNrIG1pbmltdW0gaGVpZ2h0LlxuICAgICAgICB2YWx1ZS5vblJlbmRlcmVkRGF0YUNoYW5nZWRcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCggKCkgPT4gdGhpcy5kcy5yZW5kZXJMZW5ndGggKSxcbiAgICAgICAgICAgIHN0YXJ0V2l0aChudWxsKSxcbiAgICAgICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgICAgICB0YXAoIChbcHJldiwgY3Vycl0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgbm9EYXRhU2hvd2luZyA9ICEhdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmO1xuICAgICAgICAgICAgICBpZiAoIChjdXJyID4gMCAmJiBub0RhdGFTaG93aW5nKSB8fCAoY3VyciA9PT0gMCAmJiAhbm9EYXRhU2hvd2luZykgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cE5vRGF0YSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhbmltYXRpb25GcmFtZVNjaGVkdWxlciksIC8vIHd3IHdhbnQgdG8gZ2l2ZSB0aGUgYnJvd3NlciB0aW1lIHRvIHJlbW92ZS9hZGQgcm93c1xuICAgICAgICAgICAgVW5SeCh0aGlzLCB2YWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMudmlld3BvcnQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgaWYgKHRoaXMuZHMucmVuZGVyTGVuZ3RoID4gMCAmJiB0aGlzLl9mYWxsYmFja01pbkhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgaCA9IE1hdGgubWluKHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0LCB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkpO1xuICAgICAgICAgICAgICBlbC5zdHlsZS5taW5IZWlnaHQgPSBoICsgJ3B4JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsLnN0eWxlLm1pbkhlaWdodCA9IHRoaXMudmlld3BvcnQuZW5hYmxlZCA/IG51bGwgOiB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkgKyAncHgnO1xuICAgICAgICAgICAgICAvLyBUT0RPOiBXaGVuIHZpZXdwb3J0IGlzIGRpc2FibGVkLCB3ZSBjYW4gc2tpcCB0aGUgY2FsbCB0byBtZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpIGFuZCBsZXQgdGhlIGJyb3dzZXJcbiAgICAgICAgICAgICAgLy8gZG8gdGhlIGpvYiBieSBzZXR0aW5nIGBjb250YWluOiB1bnNldGAgaW4gYHBibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRgXG5cbiAgICAgICAgICAgICAgLy8gZWwuc3R5bGUubWluSGVpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgICAgLy8gZWwuc3R5bGUuY29udGFpbiA9IHRoaXMudmlld3BvcnQuZW5hYmxlZCA/IG51bGwgOiAndW5zZXQnO1xuXG4gICAgICAgICAgICAgIC8vIFVQREFURTogVGhpcyB3aWxsIG5vdCB3b3JrIGJlY2F1c2UgaXQgd2lsbCBjYXVzZSB0aGUgd2lkdGggdG8gYmUgaW5jb3JyZWN0IHdoZW4gdXNlZCB3aXRoIHZTY3JvbGxOb25lXG4gICAgICAgICAgICAgIC8vIFRPRE86IENoZWNrIHdoeT9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW52YWxpZGF0ZXMgdGhlIGhlYWRlciwgaW5jbHVkaW5nIGEgZnVsbCByZWJ1aWxkIG9mIGNvbHVtbiBoZWFkZXJzXG4gICAqL1xuICBpbnZhbGlkYXRlQ29sdW1ucygpOiB2b2lkIHtcbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ2JlZm9yZUludmFsaWRhdGVIZWFkZXJzJyB9KTtcblxuICAgIGNvbnN0IHJlYnVpbGRSb3dzID0gdGhpcy5fc3RvcmUuYWxsQ29sdW1ucy5sZW5ndGggPiAwO1xuICAgIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgdGhpcy5fc3RvcmUuaW52YWxpZGF0ZSh0aGlzLmNvbHVtbnMpO1xuXG4gICAgc2V0SWRlbnRpdHlQcm9wKHRoaXMuX3N0b3JlLCB0aGlzLl9faWRlbnRpdHlQcm9wKTsgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgaW4gMS4wLjBcblxuICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgIHRoaXMuYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpO1xuICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFySGVhZGVyUm93RGVmcygpO1xuICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFyRm9vdGVyUm93RGVmcygpO1xuICAgIC8vIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcblxuICAgIC8vIGFmdGVyIGludmFsaWRhdGluZyB0aGUgaGVhZGVycyB3ZSBub3cgaGF2ZSBvcHRpb25hbCBoZWFkZXIvaGVhZGVyR3JvdXBzL2Zvb3RlciByb3dzIGFkZGVkXG4gICAgLy8gd2UgbmVlZCB0byB1cGRhdGUgdGhlIHRlbXBsYXRlIHdpdGggdGhpcyBkYXRhIHdoaWNoIHdpbGwgY3JlYXRlIG5ldyByb3dzIChoZWFkZXIvZm9vdGVyKVxuICAgIHRoaXMucmVzZXRIZWFkZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5yZXNldEZvb3RlclJvd0RlZnMoKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcblxuICAgIC8qICBOb3cgd2Ugd2lsbCBmb3JjZSBjbGVhcmluZyBhbGwgZGF0YSByb3dzIGFuZCBjcmVhdGluZyB0aGVtIGJhY2sgYWdhaW4gaWYgdGhpcyBpcyBub3QgdGhlIGZpcnN0IHRpbWUgd2UgaW52YWxpZGF0ZSB0aGUgY29sdW1ucy4uLlxuXG4gICAgICAgIFdoeT8gZmlyc3QsIHNvbWUgYmFja2dyb3VuZDpcblxuICAgICAgICBJbnZhbGlkYXRpbmcgdGhlIHN0b3JlIHdpbGwgcmVzdWx0IGluIG5ldyBgUGJsQ29sdW1uYCBpbnN0YW5jZXMgKGNsb25lZCBvciBjb21wbGV0ZWx5IG5ldykgaGVsZCBpbnNpZGUgYSBuZXcgYXJyYXkgKGFsbCBhcnJheXMgaW4gdGhlIHN0b3JlIGFyZSByZS1jcmVhdGVkIG9uIGludmFsaWRhdGUpXG4gICAgICAgIE5ldyBhcnJheSBhbmQgbmV3IGluc3RhbmNlcyB3aWxsIGFsc28gcmVzdWx0IGluIG5ldyBkaXJlY3RpdmUgaW5zdGFuY2VzIG9mIGBQYmxOZ3JpZENvbHVtbkRlZmAgZm9yIGV2ZXJ5IGNvbHVtbi5cblxuICAgICAgICBFYWNoIGRhdGEgcm93IGhhcyBkYXRhIGNlbGxzIHdpdGggdGhlIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIGRpcmVjdGl2ZSAoYHBibC1uZ3JpZC1jZWxsYCkuXG4gICAgICAgIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIGhhcyBhIHJlZmVyZW5jZSB0byBgUGJsTmdyaWRDb2x1bW5EZWZgIHRocm91Z2ggZGVwZW5kZW5jeSBpbmplY3Rpb24sIGkuZS4gaXQgd2lsbCBub3QgdXBkYXRlIHRocm91Z2ggY2hhbmdlIGRldGVjdGlvbiFcblxuICAgICAgICBOb3csIHRoZSBwcm9ibGVtOlxuICAgICAgICBUaGUgYENka1RhYmxlYCB3aWxsIGNhY2hlIHJvd3MgYW5kIHRoZWlyIGNlbGxzLCByZXVzaW5nIHRoZW0gZm9yIHBlcmZvcm1hbmNlLlxuICAgICAgICBUaGlzIG1lYW5zIHRoYXQgdGhlIGBQYmxOZ3JpZENvbHVtbkRlZmAgaW5zdGFuY2UgaW5zaWRlIGVhY2ggY2VsbCB3aWxsIG5vdCBjaGFuZ2UuXG4gICAgICAgIFNvLCBjcmVhdGluZyBuZXcgY29sdW1ucyBhbmQgY29sdW1uRGVmcyB3aWxsIHJlc3VsdCBpbiBzdGFsZSBjZWxscyB3aXRoIHJlZmVyZW5jZSB0byBkZWFkIGluc3RhbmNlcyBvZiBgUGJsQ29sdW1uYCBhbmQgYFBibE5ncmlkQ29sdW1uRGVmYC5cblxuICAgICAgICBPbmUgc29sdXRpb24gaXMgdG8gcmVmYWN0b3IgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgdG8gZ2V0IHRoZSBgUGJsTmdyaWRDb2x1bW5EZWZgIHRocm91Z2ggZGF0YSBiaW5kaW5nLlxuICAgICAgICBXaGlsZSB0aGlzIHdpbGwgd29yayBpdCB3aWxsIHB1dCBtb3JlIHdvcmsgb24gZWFjaCBjZWxsIHdoaWxlIGRvaW5nIENEIGFuZCB3aWxsIHJlcXVpcmUgY29tcGxleCBsb2dpYyB0byBoYW5kbGUgZWFjaCBjaGFuZ2UgYmVjYXVzZSBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYFxuICAgICAgICBhbHNvIGNyZWF0ZSBhIGNvbnRleHQgd2hpY2ggaGFzIHJlZmVyZW5jZSB0byBhIGNvbHVtbiB0aHVzIGEgbmV3IGNvbnRleHQgaXMgcmVxdWlyZWQuXG4gICAgICAgIEtlZXBpbmcgdHJhY2sgZm9yIGFsbCByZWZlcmVuY2VzIHdpbGwgYmUgZGlmZmljdWx0IGFuZCBidWdzIGFyZSBsaWtlbHkgdG8gb2NjdXIsIHdoaWNoIGFyZSBoYXJkIHRvIHRyYWNrLlxuXG4gICAgICAgIFRoZSBzaW1wbGVzdCBzb2x1dGlvbiBpcyB0byBmb3JjZSB0aGUgdGFibGUgdG8gcmVuZGVyIGFsbCBkYXRhIHJvd3MgZnJvbSBzY3JhdGNoIHdoaWNoIHdpbGwgZGVzdHJveSB0aGUgY2FjaGUgYW5kIGFsbCBjZWxsJ3Mgd2l0aCBpdCwgY3JlYXRpbmcgbmV3IG9uZSdzIHdpdGggcHJvcGVyIHJlZmVyZW5jZS5cblxuICAgICAgICBUaGUgc2ltcGxlIHNvbHV0aW9uIGlzIGN1cnJlbnRseSBwcmVmZXJyZWQgYmVjYXVzZTpcblxuICAgICAgICAtIEl0IGlzIGVhc2llciB0byBpbXBsZW1lbnQuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGFzc2VzcyB0aGUgaW1wYWN0LlxuICAgICAgICAtIEl0IGVmZmVjdHMgYSBzaW5nbGUgb3BlcmF0aW9uIChjaGFuZ2luZyB0byByZXNldHRpbmcgY29sdW1ucykgdGhhdCByYXJlbHkgaGFwcGVuXG5cbiAgICAgICAgVGhlIG9ubHkgaXNzdWUgaXMgd2l0aCB0aGUgYENka1RhYmxlYCBlbmNhcHN1bGF0aW5nIHRoZSBtZXRob2QgYF9mb3JjZVJlbmRlckRhdGFSb3dzKClgIHdoaWNoIGlzIHdoYXQgd2UgbmVlZC5cbiAgICAgICAgVGhlIHdvcmthcm91bmQgaXMgdG8gYXNzaWduIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIHdpdGggdGhlIHNhbWUgdmFsdWUgaXQgYWxyZWFkeSBoYXMsIHdoaWNoIHdpbGwgY2F1c2UgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB0byBmaXJlLlxuICAgICAgICBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBpcyBhIGdldHRlciB0aGF0IHRyaWdnZXJzIGBfZm9yY2VSZW5kZXJEYXRhUm93c2Agd2l0aG91dCBjaGVja2luZyB0aGUgdmFsdWUgY2hhbmdlZCwgcGVyZmVjdCBmaXQuXG4gICAgICAgIFRoZXJlIGlzIGEgcmlzayB3aXRoIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGJlaW5nIGNoYW5nZWQuLi5cbiAgICAgKi9cbiAgICBpZiAocmVidWlsZFJvd3MpIHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cyA9IHRoaXMuX2Nka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cztcbiAgICB9XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkludmFsaWRhdGVIZWFkZXJzJyB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBjb2x1bW4gc2l6ZXMgZm9yIGFsbCBjb2x1bW5zIGluIHRoZSB0YWJsZSBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb24gbWV0YWRhdGEgZm9yIGVhY2ggY29sdW1uLlxuICAgKiBUaGUgZmluYWwgd2lkdGggcmVwcmVzZW50IGEgc3RhdGljIHdpZHRoLCBpdCBpcyB0aGUgdmFsdWUgYXMgc2V0IGluIHRoZSBkZWZpbml0aW9uIChleGNlcHQgY29sdW1uIHdpdGhvdXQgd2lkdGgsIHdoZXJlIHRoZSBjYWxjdWxhdGVkIGdsb2JhbCB3aWR0aCBpcyBzZXQpLlxuICAgKi9cbiAgcmVzZXRDb2x1bW5zV2lkdGgob3B0aW9ucz86IHsgdGFibGVNYXJrRm9yQ2hlY2s/OiBib29sZWFuOyBtZXRhTWFya0ZvckNoZWNrPzogYm9vbGVhbjsgfSk6IHZvaWQge1xuICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuX3N0b3JlLmdldFN0YXRpY1dpZHRoKCksIHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNpemUgb2YgYWxsIGdyb3VwIGNvbHVtbnMgaW4gdGhlIHRhYmxlIGJhc2VkIG9uIHRoZSBzaXplIG9mIHRoZWlyIHZpc2libGUgY2hpbGRyZW4gKG5vdCBoaWRkZW4pLlxuICAgKiBAcGFyYW0gZHluYW1pY1dpZHRoTG9naWMgLSBPcHRpb25hbCBsb2dpYyBjb250YWluZXIsIGlmIG5vdCBzZXQgYSBuZXcgb25lIGlzIGNyZWF0ZWQuXG4gICAqL1xuICBzeW5jQ29sdW1uR3JvdXBzU2l6ZShkeW5hbWljV2lkdGhMb2dpYz86IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKTogdm9pZCB7XG4gICAgaWYgKCFkeW5hbWljV2lkdGhMb2dpYykge1xuICAgICAgZHluYW1pY1dpZHRoTG9naWMgPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIH1cblxuICAgIC8vIEZyb20gYWxsIG1ldGEgY29sdW1ucyAoaGVhZGVyL2Zvb3Rlci9oZWFkZXJHcm91cCkgd2UgZmlsdGVyIG9ubHkgYGhlYWRlckdyb3VwYCBjb2x1bW5zLlxuICAgIC8vIEZvciBlYWNoIHdlIGNhbGN1bGF0ZSBpdCdzIHdpZHRoIGZyb20gYWxsIG9mIHRoZSBjb2x1bW5zIHRoYXQgdGhlIGhlYWRlckdyb3VwIFwiZ3JvdXBzXCIuXG4gICAgLy8gV2UgdXNlIHRoZSBzYW1lIHN0cmF0ZWd5IGFuZCB0aGUgc2FtZSBSb3dXaWR0aER5bmFtaWNBZ2dyZWdhdG9yIGluc3RhbmNlIHdoaWNoIHdpbGwgcHJldmVudCBkdXBsaWNhdGUgY2FsY3VsYXRpb25zLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGhlYWRlciBncm91cHMsIGkuZS4gc2FtZSBjb2x1bW5zIG9uIG11bHRpcGxlIGdyb3VwcyB3aXRoIGRpZmZlcmVudCByb3cgaW5kZXguXG4gICAgZm9yIChjb25zdCBnIG9mIHRoaXMuX3N0b3JlLmdldEFsbEhlYWRlckdyb3VwKCkpIHtcbiAgICAgIC8vIFdlIGdvIG92ZXIgYWxsIGNvbHVtbnMgYmVjYXVzZSBnLmNvbHVtbnMgZG9lcyBub3QgcmVwcmVzZW50IHRoZSBjdXJyZW50IG93bmVkIGNvbHVtbnMgb2YgdGhlIGdyb3VwXG4gICAgICAvLyBpdCBpcyBzdGF0aWMsIHJlcHJlc2VudGluZyB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICAgIC8vIE9ubHkgY29sdW1ucyBob2xkIHRoZWlyIGdyb3VwIG93bmVycy5cbiAgICAgIC8vIFRPRE86IGZpbmQgd2F5IHRvIGltcHJvdmUgaXRlcmF0aW9uXG4gICAgICBjb25zdCBjb2xTaXplSW5mb3MgPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbHRlciggYyA9PiAhYy5oaWRkZW4gJiYgYy5pc0luR3JvdXAoZykpLm1hcCggYyA9PiBjLnNpemVJbmZvICk7XG4gICAgICBpZiAoY29sU2l6ZUluZm9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBXaWR0aCA9IGR5bmFtaWNXaWR0aExvZ2ljLmFkZEdyb3VwKGNvbFNpemVJbmZvcyk7XG4gICAgICAgIGcubWluV2lkdGggPSBncm91cFdpZHRoO1xuICAgICAgICBnLnVwZGF0ZVdpZHRoKGAke2dyb3VwV2lkdGh9cHhgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGcubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYDBweGApO1xuICAgICAgfVxuICAgICAgaWYgKGcuY29sdW1uRGVmKSB7XG4gICAgICAgIGcuY29sdW1uRGVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZUNvbHVtbnMoY29sdW1ucz86IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5zKSB7XG4gICAgICBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICB9XG5cbiAgICAvLyBwcm90ZWN0IGZyb20gcGVyLW1hdHVyZSByZXNpemUuXG4gICAgLy8gV2lsbCBoYXBwZW4gb24gYWRkaXRpb25hbCBoZWFkZXIvaGVhZGVyLWdyb3VwIHJvd3MgQU5EIEFMU08gd2hlbiB2U2Nyb2xsTm9uZSBpcyBzZXRcbiAgICAvLyBUaGlzIHdpbGwgY2F1c2Ugc2l6ZSBub3QgdG8gcG9wdWxhdGUgYmVjYXVzZSBpdCB0YWtlcyB0aW1lIHRvIHJlbmRlciB0aGUgcm93cywgc2luY2UgaXQncyBub3QgdmlydHVhbCBhbmQgaGFwcGVucyBpbW1lZGlhdGVseS5cbiAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHByb3RlY3Rpb24uXG4gICAgaWYgKCFjb2x1bW5zWzBdLnNpemVJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc3RvcmVzIGFuZCBjYWxjdWxhdGVzIHdpZHRoIGZvciBjb2x1bW5zIGFkZGVkIHRvIGl0LiBBZ2dyZWdhdGUncyB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGFkZGVkIGNvbHVtbnMuXG4gICAgY29uc3Qgcm93V2lkdGggPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIHRoaXMuc3luY0NvbHVtbkdyb3Vwc1NpemUocm93V2lkdGgpO1xuXG4gICAgLy8gaWYgdGhpcyBpcyBhIHRhYmxlIHdpdGhvdXQgZ3JvdXBzXG4gICAgaWYgKHJvd1dpZHRoLm1pbmltdW1Sb3dXaWR0aCA9PT0gMCkge1xuICAgICAgcm93V2lkdGguYWRkR3JvdXAoY29sdW1ucy5tYXAoIGMgPT4gYy5zaXplSW5mbyApKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgbWF4IGxvY2sgc3RhdGUgaGFzIGNoYW5nZWQgd2UgbmVlZCB0byB1cGRhdGUgcmUtY2FsY3VsYXRlIHRoZSBzdGF0aWMgd2lkdGgncyBhZ2Fpbi5cbiAgICBpZiAocm93V2lkdGgubWF4V2lkdGhMb2NrQ2hhbmdlZCkge1xuICAgICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5fc3RvcmUuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5fc3RvcmUuY29sdW1ucywgdGhpcy5fc3RvcmUubWV0YUNvbHVtbnMsIHsgdGFibGVNYXJrRm9yQ2hlY2s6IHRydWUgfSk7XG4gICAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoY29sdW1ucyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9taW5pbXVtUm93V2lkdGggKSB7XG4gICAgICAvLyBXZSBjYWxjdWxhdGUgdGhlIHRvdGFsIG1pbmltdW0gd2lkdGggb2YgdGhlIHRhYmxlXG4gICAgICAvLyBXZSBkbyBpdCBvbmNlLCB0byBzZXQgdGhlIG1pbmltdW0gd2lkdGggYmFzZWQgb24gdGhlIGluaXRpYWwgc2V0dXAuXG4gICAgICAvLyBOb3RlIHRoYXQgd2UgZG9uJ3QgYXBwbHkgc3RyYXRlZ3kgaGVyZSwgd2Ugd2FudCB0aGUgZW50aXJlIGxlbmd0aCBvZiB0aGUgdGFibGUhXG4gICAgICB0aGlzLl9jZGtUYWJsZS5taW5XaWR0aCA9IHJvd1dpZHRoLm1pbmltdW1Sb3dXaWR0aDtcbiAgICB9XG5cbiAgICB0aGlzLm5nWm9uZS5ydW4oICgpID0+IHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25SZXNpemVSb3cnIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBlbWJlZGRlZCB2aWV3IGJlZm9yZSBvciBhZnRlciB0aGUgdXNlciBwcm9qZWN0ZWQgY29udGVudC5cbiAgICovXG4gIGNyZWF0ZVZpZXc8Qz4obG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50JywgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPEM+LCBjb250ZXh0PzogQywgaW5kZXg/OiBudW1iZXIpOiBFbWJlZGRlZFZpZXdSZWY8Qz4ge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5nZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uKTtcbiAgICBjb25zdCB2aWV3ID0gdmNSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRlbXBsYXRlUmVmLCBjb250ZXh0LCBpbmRleCk7XG4gICAgdmlldy5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgcmV0dXJuIHZpZXc7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGFscmVhZHkgY3JlYXRlZCBlbWJlZGRlZCB2aWV3LlxuICAgKiBAcGFyYW0gdmlldyAtIFRoZSB2aWV3IHRvIHJlbW92ZVxuICAgKiBAcGFyYW0gbG9jYXRpb24gLSBUaGUgbG9jYXRpb24sIGlmIG5vdCBzZXQgZGVmYXVsdHMgdG8gYGJlZm9yZWBcbiAgICogQHJldHVybnMgdHJ1ZSB3aGVuIGEgdmlldyB3YXMgcmVtb3ZlZCwgZmFsc2Ugd2hlbiBub3QuIChkaWQgbm90IGV4aXN0IGluIHRoZSB2aWV3IGNvbnRhaW5lciBmb3IgdGhlIHByb3ZpZGVkIGxvY2F0aW9uKVxuICAgKi9cbiAgcmVtb3ZlVmlldyh2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PiwgbG9jYXRpb246ICdiZWZvcmVUYWJsZScgfCAnYmVmb3JlQ29udGVudCcgfCAnYWZ0ZXJDb250ZW50Jyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5nZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uKTtcbiAgICBjb25zdCBpZHggPSB2Y1JlZi5pbmRleE9mKHZpZXcpO1xuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZjUmVmLnJlbW92ZShpZHgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSBhbGwgdmlzaWJsZSBjb2x1bW5zIHRvIGZpdCBjb250ZW50IG9mIHRoZSB0YWJsZS5cbiAgICogQHBhcmFtIGZvcmNlRml4ZWRXaWR0aCAtIFdoZW4gdHJ1ZSB3aWxsIHJlc2l6ZSBhbGwgY29sdW1ucyB3aXRoIGFic29sdXRlIHBpeGVsIHZhbHVlcywgb3RoZXJ3aXNlIHdpbGwga2VlcCB0aGUgc2FtZSBmb3JtYXQgYXMgb3JpZ2luYWxseSBzZXQgKCUgb3Igbm9uZSlcbiAgICovXG4gIGF1dG9TaXplQ29sdW1uVG9GaXQob3B0aW9ucz86IEF1dG9TaXplVG9GaXRPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgeyBpbm5lcldpZHRoLCBvdXRlcldpZHRoIH0gPSB0aGlzLnZpZXdwb3J0O1xuXG4gICAgLy8gY2FsY3VsYXRlIGF1dG8tc2l6ZSBvbiB0aGUgd2lkdGggd2l0aG91dCBzY3JvbGwgYmFyIGFuZCB0YWtlIGJveCBtb2RlbCBnYXBzIGludG8gYWNjb3VudFxuICAgIC8vIFRPRE86IGlmIG5vIHNjcm9sbCBiYXIgZXhpc3RzIHRoZSBjYWxjIHdpbGwgbm90IGluY2x1ZGUgaXQsIG5leHQgaWYgbW9yZSByb3dzIGFyZSBhZGRlZCBhIHNjcm9sbCBiYXIgd2lsbCBhcHBlYXIuLi5cbiAgICB0aGlzLmNvbHVtbkFwaS5hdXRvU2l6ZVRvRml0KG91dGVyV2lkdGggLSAob3V0ZXJXaWR0aCAtIGlubmVyV2lkdGgpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGZpbmRJbml0aWFsUm93SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgbGV0IHJvd0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIubGVuZ3RoKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmdldCgwKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICAgIHJvd0VsZW1lbnQgPSB2aWV3UmVmLnJvb3ROb2Rlc1swXTtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUocm93RWxlbWVudCkuaGVpZ2h0O1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGhlaWdodCwgMTApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50KSB7XG4gICAgICByb3dFbGVtZW50ID0gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50Lmxlbmd0aCA+IDBcbiAgICAgICAgPyAodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmdldCh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoIC0gMSkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT4pLnJvb3ROb2Rlc1swXVxuICAgICAgICA6IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5lbGVtZW50Lm5hdGl2ZUVsZW1lbnRcbiAgICAgIDtcbiAgICAgIHJvd0VsZW1lbnQgPSByb3dFbGVtZW50Lm5leHRFbGVtZW50U2libGluZyBhcyBIVE1MRWxlbWVudDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByb3dFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgYWRkQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKGMpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUNsYXNzKC4uLmNsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xzKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGluaXRQbHVnaW5zKGluamVjdG9yOiBJbmplY3RvciwgZWxSZWY6IEVsZW1lbnRSZWY8YW55PiwgdmNSZWY6IFZpZXdDb250YWluZXJSZWYpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYW4gaW5qZWN0b3IgZm9yIHRoZSBleHRlbnNpb25zL3BsdWdpbnNcbiAgICAvLyBUaGlzIGluamVjdG9yIGFsbG93IHBsdWdpbnMgKHRoYXQgY2hvb3NlIHNvKSB0byBwcm92aWRlIGEgZmFjdG9yeSBmdW5jdGlvbiBmb3IgcnVudGltZSB1c2UuXG4gICAgLy8gSS5FOiBhcyBpZiB0aGV5IHdlJ3JlIGNyZWF0ZWQgYnkgYW5ndWxhciB2aWEgdGVtcGxhdGUuLi5cbiAgICAvLyBUaGlzIGFsbG93cyBzZWFtbGVzcyBwbHVnaW4tdG8tcGx1Z2luIGRlcGVuZGVuY2llcyB3aXRob3V0IHJlcXVpcmluZyBzcGVjaWZpYyB0ZW1wbGF0ZSBzeW50YXguXG4gICAgLy8gQW5kIGFsc28gYWxsb3dzIGF1dG8gcGx1Z2luIGJpbmRpbmcgKGFwcCB3aWRlKSB3aXRob3V0IHRoZSBuZWVkIGZvciB0ZW1wbGF0ZSBzeW50YXguXG4gICAgY29uc3QgcGx1Z2luSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogVmlld0NvbnRhaW5lclJlZiwgdXNlVmFsdWU6IHZjUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogRWxlbWVudFJlZiwgdXNlVmFsdWU6IGVsUmVmIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQ2hhbmdlRGV0ZWN0b3JSZWYsIHVzZVZhbHVlOiB0aGlzLmNkciB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogaW5qZWN0b3IsXG4gICAgfSk7XG4gICAgdGhpcy5fcGx1Z2luID0gUGJsTmdyaWRQbHVnaW5Db250ZXh0LmNyZWF0ZSh0aGlzLCBwbHVnaW5JbmplY3RvciwgdGhpcy5fZXh0QXBpKTtcbiAgICBiaW5kVG9EYXRhU291cmNlKHRoaXMuX3BsdWdpbik7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlblRvUmVzaXplKCk6IHZvaWQge1xuICAgIGxldCByZXNpemVPYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXI7XG4gICAgY29uc3Qgcm8kID0gZnJvbUV2ZW50UGF0dGVybjxbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0+KFxuICAgICAgaGFuZGxlciA9PiB7XG4gICAgICAgIGlmICghcmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihoYW5kbGVyKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKHJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFNraXAgdGhlIGZpcnN0IGVtaXNzaW9uXG4gICAgLy8gRGVib3VuY2UgYWxsIHJlc2l6ZXMgdW50aWwgdGhlIG5leHQgY29tcGxldGUgYW5pbWF0aW9uIGZyYW1lIHdpdGhvdXQgYSByZXNpemVcbiAgICAvLyBmaW5hbGx5IG1hcHMgdG8gdGhlIGVudHJpZXMgY29sbGVjdGlvblxuICAgIC8vIFNLSVA6ICBXZSBzaG91bGQgc2tpcCB0aGUgZmlyc3QgZW1pc3Npb24gKGBza2lwKDEpYCkgYmVmb3JlIHdlIGRlYm91bmNlLCBzaW5jZSBpdHMgY2FsbGVkIHVwb24gY2FsbGluZyBcIm9ic2VydmVcIiBvbiB0aGUgcmVzaXplT2JzZXJ2ZXIuXG4gICAgLy8gICAgICAgIFRoZSBwcm9ibGVtIGlzIHRoYXQgc29tZSB0YWJsZXMgbWlnaHQgcmVxdWlyZSB0aGlzIGJlY2F1c2UgdGhleSBkbyBjaGFuZ2Ugc2l6ZS5cbiAgICAvLyAgICAgICAgQW4gZXhhbXBsZSBpcyBhIHRhYmxlIGluIGEgbWF0LXRhYiB0aGF0IGlzIGhpZGRlbiwgdGhlIHRhYmxlIHdpbGwgaGl0IHRoZSByZXNpemUgb25lIHdoZW4gd2UgZm9jdXMgdGhlIHRhYlxuICAgIC8vICAgICAgICB3aGljaCB3aWxsIHJlcXVpcmUgYSByZXNpemUgaGFuZGxpbmcgYmVjYXVzZSBpdCdzIGluaXRpYWwgc2l6ZSBpcyAwXG4gICAgLy8gICAgICAgIFRvIHdvcmthcm91bmQgdGhpcywgd2Ugb25seSBza2lwIGVsZW1lbnRzIG5vdCB5ZXQgYWRkZWQgdG8gdGhlIERPTSwgd2hpY2ggbWVhbnMgdGhleSB3aWxsIG5vdCB0cmlnZ2VyIGEgcmVzaXplIGV2ZW50LlxuICAgIGxldCBza2lwVmFsdWUgPSBkb2N1bWVudC5jb250YWlucyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpID8gMSA6IDA7XG5cbiAgICBybyRcbiAgICAgIC5waXBlKFxuICAgICAgICBza2lwKHNraXBWYWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgwLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciksXG4gICAgICAgIFVuUngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoYXJnczogW1Jlc2l6ZU9ic2VydmVyRW50cnlbXSwgUmVzaXplT2JzZXJ2ZXJdKSA9PiB7XG4gICAgICAgIGlmIChza2lwVmFsdWUgPT09IDApIHtcbiAgICAgICAgICBza2lwVmFsdWUgPSAxO1xuICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLl9zdG9yZS5jb2x1bW5zO1xuICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCggYyA9PiBjLnNpemVJbmZvLnVwZGF0ZVNpemUoKSApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25SZXNpemUoYXJnc1swXSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25SZXNpemUoZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICB0aGlzLl92aWV3cG9ydC5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIH1cbiAgICB0aGlzLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRFeHRBcGkoKTogdm9pZCB7XG4gICAgbGV0IG9uSW5pdDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcbiAgICBjb25zdCBleHRBcGkgPSB7XG4gICAgICB0YWJsZTogdGhpcyxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGdldCBjZGtUYWJsZSgpIHsgcmV0dXJuIGV4dEFwaS50YWJsZS5fY2RrVGFibGU7IH0sXG4gICAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gZXh0QXBpLnRhYmxlLl9wbHVnaW4uZXZlbnRzIH0sXG4gICAgICBnZXQgY29udGV4dEFwaSgpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb250ZXh0QXBpJywgeyB2YWx1ZTogbmV3IENvbnRleHRBcGk8VD4oZXh0QXBpKSB9KTtcbiAgICAgICAgcmV0dXJuIGV4dEFwaS5jb250ZXh0QXBpO1xuICAgICAgfSxcbiAgICAgIGdldCBtZXRhUm93U2VydmljZSgpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXRhUm93U2VydmljZScsIHsgdmFsdWU6IG5ldyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlPFQ+KGV4dEFwaSkgfSk7XG4gICAgICAgIHJldHVybiBleHRBcGkubWV0YVJvd1NlcnZpY2U7XG4gICAgICB9LFxuICAgICAgb25Jbml0OiAoZm46ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgaWYgKGV4dEFwaS50YWJsZS5pc0luaXQpIHtcbiAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvbkluaXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgdSA9IGV4dEFwaS5ldmVudHMuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9uSW5pdEZuIG9mIG9uSW5pdCkge1xuICAgICAgICAgICAgICAgICAgb25Jbml0Rm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIG9uSW5pdCA9IHUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkluaXQucHVzaChmbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdG9yZTogdGhpcy5fc3RvcmUsXG4gICAgICBzZXRWaWV3cG9ydDogKHZpZXdwb3J0KSA9PiB0aGlzLl92aWV3cG9ydCA9IHZpZXdwb3J0LFxuICAgICAgZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeTogKCk6IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyhEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2V4dEFwaSA9IGV4dEFwaTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBOb0RhdGEoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZikge1xuICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGZvcmNlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vRGF0YSA9IHRoaXMuX2RhdGFTb3VyY2UgJiYgdGhpcy5fZGF0YVNvdXJjZS5yZW5kZXJMZW5ndGggPT09IDA7XG4gICAgaWYgKG5vRGF0YSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1lbXB0eScpO1xuICAgIH1cblxuICAgIGlmIChub0RhdGEgfHwgZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG5vRGF0YVRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRTaW5nbGUoJ25vRGF0YScpO1xuICAgICAgaWYgKG5vRGF0YVRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIG5vRGF0YVRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIGxvY2F0aW9uID09PSAnYmVmb3JlVGFibGUnXG4gICAgICA/IHRoaXMuX3ZjUmVmQmVmb3JlVGFibGVcbiAgICAgIDogbG9jYXRpb24gPT09ICdiZWZvcmVDb250ZW50JyA/IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCA6IHRoaXMuX3ZjUmVmQWZ0ZXJDb250ZW50XG4gICAgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFBhZ2luYXRvcigpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uS2lsbEtleSA9ICdwYmxQYWdpbmF0aW9uS2lsbEtleSc7XG4gICAgY29uc3QgdXNlUGFnaW5hdGlvbiA9IHRoaXMuZHMgJiYgdGhpcy51c2VQYWdpbmF0aW9uO1xuXG4gICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuZHMucGFnaW5hdGlvbiA9IHRoaXMuX3BhZ2luYXRpb247XG4gICAgICBpZiAodGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgVW5SeC5raWxsKHRoaXMsIHBhZ2luYXRpb25LaWxsS2V5KTtcbiAgICAgIGlmICh0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgICAgY29uc3QgcGFnaW5hdG9yVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgncGFnaW5hdG9yJyk7XG4gICAgICAgIGlmIChwYWdpbmF0b3JUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIHBhZ2luYXRvclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHRoaXMuX3N0b3JlLmNvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wsICd0YWJsZUNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggY2VsbCApIHtcbiAgICAgICAgY29sLmNlbGxUcGwgPSBjZWxsLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWZhdWx0Q2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ3RhYmxlQ2VsbCcpO1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGRlZmF1bHRDZWxsVGVtcGxhdGUgPyBkZWZhdWx0Q2VsbFRlbXBsYXRlLnRSZWYgOiB0aGlzLl9mYlRhYmxlQ2VsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWRpdG9yQ2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ2VkaXRvckNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggZWRpdG9yQ2VsbCApIHtcbiAgICAgICAgY29sLmVkaXRvclRwbCA9IGVkaXRvckNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZWRpdG9yQ2VsbCcpO1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uczogQXJyYXk8UGJsQ29sdW1uIHwgUGJsTWV0YUNvbHVtblN0b3JlPiA9IFtdLmNvbmNhdCh0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgY29uc3QgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdoZWFkZXJDZWxsJykgfHwgeyB0UmVmOiB0aGlzLl9mYkhlYWRlckNlbGwgfTtcbiAgICBjb25zdCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2Zvb3RlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiRm9vdGVyQ2VsbCB9O1xuICAgIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChjb2wgaW5zdGFuY2VvZiBQYmxDb2x1bW4pIHtcbiAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb25zdCBmb290ZXJDZWxsRGVmID0gZmluZENlbGxEZWY8VD4odGhpcy5yZWdpc3RyeSwgY29sLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgIGNvbC5oZWFkZXJDZWxsVHBsID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICBjb2wuZm9vdGVyQ2VsbFRwbCA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjb2wuaGVhZGVyKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXIsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuaGVhZGVyLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuaGVhZGVyR3JvdXApIHtcbiAgICAgICAgICBjb25zdCBoZWFkZXJDZWxsRGVmID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLmhlYWRlckdyb3VwLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlckdyb3VwLnRlbXBsYXRlID0gaGVhZGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb2wuZm9vdGVyKSB7XG4gICAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5mb290ZXIsICdmb290ZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEZvb3RlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuZm9vdGVyLnRlbXBsYXRlID0gZm9vdGVyQ2VsbERlZi50UmVmO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEhlYWRlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hlYWRlclJvd0RlZnMpIHtcbiAgICAgIC8vIFRoZSB0YWJsZSBoZWFkZXIgKG1haW4sIHdpdGggY29sdW1uIG5hbWVzKSBpcyBhbHdheXMgdGhlIGxhc3Qgcm93IGRlZiAoaW5kZXggMClcbiAgICAgIC8vIEJlY2F1c2Ugd2Ugd2FudCBpdCB0byBzaG93IGxhc3QgKGFmdGVyIGN1c3RvbSBoZWFkZXJzLCBncm91cCBoZWFkZXJzLi4uKSB3ZSBmaXJzdCBuZWVkIHRvIHB1bGwgaXQgYW5kIHRoZW4gcHVzaC5cblxuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgICBjb25zdCBhcnIgPSB0aGlzLl9oZWFkZXJSb3dEZWZzLnRvQXJyYXkoKTtcbiAgICAgIGFyci5wdXNoKGFyci5zaGlmdCgpKTtcblxuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgYXJyKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEhlYWRlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRGb290ZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb290ZXJSb3dEZWZzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIHRoaXMuX2Zvb3RlclJvd0RlZnMudG9BcnJheSgpKSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmFkZEZvb3RlclJvd0RlZihyb3dEZWYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19