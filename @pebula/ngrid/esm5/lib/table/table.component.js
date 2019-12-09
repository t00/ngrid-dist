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
     * @return {?}
     */
    PblNgridComponent.prototype.resetColumnsWidth = /**
     * Updates the column sizes for all columns in the table based on the column definition metadata for each column.
     * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
     * @return {?}
     */
    function () {
        resetColumnWidths(this._store.getStaticWidth(), this._store.columns, this._store.metaColumns);
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
                    template: "<!-- TABLE HEADER ROW DEF -->\n<cdk-header-row *cdkHeaderRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.header?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.header\"\n                data-rowtype=\"header\"\n                class=\"pbl-ngrid-header-row pbl-ngrid-header-row-main\"\n                [class.pbl-ngrid-row-visually-hidden]=\"!showHeader\"></cdk-header-row>\n\n<!-- MULTI-HEADER ROW DEF & MULTI-HEADER GROUP ROW DEFINITION TEMPLATES -->\n<ng-container *ngFor=\"let row of metaColumnIds.header;\">\n  <cdk-header-row *cdkHeaderRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-header\" class=\"pbl-ngrid-header-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-header-row>\n</ng-container>\n\n<!-- TABLE FOOTER ROW DEF -->\n<cdk-footer-row *cdkFooterRowDef=\"columnApi.visibleColumnIds; sticky: columnRowDef.footer?.type === 'sticky'\"\n                [pblMetaRow]=\"columnRowDef.footer\"\n                data-rowtype=\"footer\"\n                class=\"pbl-ngrid-footer-row\"\n                [class.pbl-ngrid-row-hidden]=\"!showFooter\"></cdk-footer-row> <!-- TABLE FOOTER ROW DEF -->\n<!-- MULTI-FOOTER ROW DEF -->\n<ng-container *ngFor=\"let row of metaColumnIds.footer\">   <!-- MULTI-FOOTER ROW DEF -->\n  <cdk-footer-row *cdkFooterRowDef=\"row.keys; sticky: row.rowDef.type === 'sticky'\"\n                  [pblMetaRow]=\"row.rowDef\"\n                  data-rowtype=\"meta-footer\" class=\"pbl-ngrid-footer-row\"\n                  [class.pbl-meta-group-row]=\"row.isGroup\"></cdk-footer-row>\n</ng-container>\n\n<div class=\"pbl-ngrid-container\">\n  <ng-container #beforeTable></ng-container>\n  <div pbl-ngrid-fixed-meta-row-container=\"header\"></div>\n  <pbl-cdk-virtual-scroll-viewport class=\"pbl-ngrid-scroll-container\"\n                                   [stickyRowHeaderContainer]=\"stickyRowHeaderContainer\" [stickyRowFooterContainer]=\"stickyRowFooterContainer\">\n    <pbl-cdk-table tabindex=\"-1\">\n      <!-- Row templates. The columns used are set at the row template level -->\n\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let meta of metaColumns\">\n        <ng-container *ngIf=\"(meta.header || meta.headerGroup) as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-header-cell #hCell=\"ngridHeaderCell\" *cdkHeaderCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: hCell.cellCtx\"></ng-container>\n          </pbl-ngrid-header-cell>\n        </ng-container>\n        <ng-container *ngIf=\"meta.footer as c\" [pblNgridColumnDef]=\"c\">\n          <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n            <ng-container *ngTemplateOutlet=\"c.template; context: fCell.cellCtx\"></ng-container>\n          </pbl-ngrid-footer-cell>\n        </ng-container>\n      </ng-container>\n      <!-- MULTI-HEADER/FOOTER CELL DEF -->\n\n       <!-- HEADER-RECORD-FOOTER CELL DEF -->\n      <ng-container *ngFor=\"let c of columnApi.visibleColumns;\" [pblNgridColumnDef]=\"c\">\n        <!-- TABLE HEADER CELL DEF -->\n        <pbl-ngrid-header-cell *cdkHeaderCellDef=\"let row\" [observeSize]=\"c\"></pbl-ngrid-header-cell>\n        <!-- RECORD CELL DEF -->\n        <pbl-ngrid-cell #cell=\"pblNgridCell\" *cdkCellDef=\"let row; pblRowContext as pblRowContext\"\n                        [rowCtx]=\"pblRowContext\" [attr.tabindex]=\"cellFocus\" [attr.id]=\"c.id\">\n          <ng-container *ngTemplateOutlet=\"cell.cellCtx?.editing ? c.editorTpl : c.cellTpl; context: cell.cellCtx\"></ng-container>\n        </pbl-ngrid-cell>\n\n        <!-- TABLE FOOTER CELL DEF -->\n        <pbl-ngrid-footer-cell #fCell=\"ngridFooterCell\" *cdkFooterCellDef>\n          <ng-container *ngTemplateOutlet=\"c.footerCellTpl; context: fCell.cellCtx\"></ng-container>\n        </pbl-ngrid-footer-cell>\n      </ng-container>\n      <!-- HEADER-RECORD-FOOTER CELL DEF -->\n\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n      <pbl-ngrid-row *cdkRowDef=\"let row; columns: columnApi.visibleColumnIds;\" [row]=\"row\"></pbl-ngrid-row>\n      <!-- TABLE RECORD ROW DEFINITION TEMPLATES -->\n    </pbl-cdk-table>\n  </pbl-cdk-virtual-scroll-viewport>\n  <div pbl-ngrid-fixed-meta-row-container=\"footer\"></div>\n  <ng-container #beforeContent>\n    <!-- This dummy row is used to extract an initial row height -->\n    <pbl-ngrid-row row style=\"display: none\"></pbl-ngrid-row>\n  </ng-container>\n  <ng-content></ng-content>\n  <ng-container #afterContent></ng-container>\n\n  <!-- Placeholder for header/footer scroll containers that will get populated with header/meta roles when the following conditions are met:\n       - Virtual scrolling is enabled\n       - Rows are rendered in the viewport\n       - Container is scrolling\n\n       The placeholder is fixed so the browsers does not use sticky positioning while scrolling, which takes the rows out of view while scrolling.\n       While scrolling the rows are moved into this placeholder and when scrolling ends they return to their original positioning.\n\n       The actual rows are added into the internal div, within the placeholder.\n       The top container get the proper width and the internal header gets the scroll offset (horizontal) that matches the current offset.\n       This has an effect only when scrolling with the wheel within a long scrolling session.\n\n       Implementation is in the virtual scroll viewport (more precisely in `PblVirtualScrollForOf`)\n  -->\n  <div #stickyRowHeaderContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- HEADERS -->\n  <div #stickyRowFooterContainer class=\"pbl-ngrid-sticky-row-scroll-container\"><div [style.minWidth.px]=\"_cdkTable?.minWidth\"></div></div> <!-- FOOTERS -->\n</div>\n\n<ng-template #fbTableCell let-value=\"value\"><div>{{value}}</div></ng-template>\n<ng-template #fbHeaderCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n<ng-template #fbFooterCell let-column=\"col\"><div>{{column.label}}</div></ng-template>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUgsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBQ1IsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFNBQVMsRUFDVCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLE1BQU0sRUFDTixTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FDM0UsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEYsT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFakYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLHNCQUFzQixDQUFDO0FBQzNFLE9BQU8s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O09BMU16QyxpQkFBaUIsQ0FrOUI3QjtJQUFELHdCQUFDO0NBQUEsSUFBQTtTQWw5QlksaUJBQWlCOzs7SUFVNUIsd0NBQXFCOztJQVVyQix3Q0FBcUI7O0lBU3JCLHNDQUFtQjs7Ozs7Ozs7O0lBU25CLHNDQUFxRTs7Ozs7SUFRckUsMkNBQStCOzs7OztJQXFFL0Isb0NBQWtFOztJQW9DbEUsMkNBQTJJOztJQUMzSSwrQ0FBb0U7O0lBRXBFLHFDQUFzQjs7SUFDdEIsc0NBQXVCOzs7OztJQUV2QiwrQ0FBK0I7Ozs7O0lBQy9CLHdDQUFzQzs7SUFFdEMsOENBQXdHOztJQUN4RyxnREFBNEc7O0lBQzVHLCtDQUEwRzs7SUFDMUcseUNBQWlIOztJQUNqSCwwQ0FBdUg7O0lBQ3ZILDBDQUF1SDs7SUFDdkgseUNBQW1FOztJQUNuRSwyQ0FBMEU7O0lBQzFFLDJDQUEwRTs7Ozs7SUFRMUUsbUNBQXlCOztJQUN6QixzQ0FBaUM7O0lBS2pDLHNDQUFtQzs7Ozs7SUFDbkMsbUNBQXNEOzs7OztJQUN0RCw4Q0FBbUM7Ozs7O0lBQ25DLHlDQUErQjs7Ozs7SUFDL0IsMkNBQStDOzs7OztJQUMvQyxnREFBa0Q7Ozs7O0lBQ2xELG1EQUFxRDs7Ozs7SUFDckQsd0NBQW1EOzs7OztJQUNuRCw4Q0FBa0M7Ozs7O0lBQ2xDLDZDQUFpQzs7Ozs7SUFDakMsc0NBQXlEOzs7OztJQUN6RCxvQ0FBdUM7Ozs7O0lBQ3ZDLG9DQUF5Qzs7Ozs7SUFHN0Isa0NBQXNDOzs7OztJQUN0QyxvQ0FBZ0M7Ozs7O0lBQ2hDLG1DQUFzQjs7Ozs7SUFDdEIsZ0NBQThCOzs7OztJQUM5QixtQ0FBcUM7O0lBQ3JDLHFDQUF3Qzs7SUFDeEMsK0JBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5pbXBvcnQgeyBhc2FwU2NoZWR1bGVyLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgZnJvbUV2ZW50UGF0dGVybiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlLCB0YXAsIG9ic2VydmVPbiwgc3dpdGNoTWFwLCBtYXAsIG1hcFRvLCBzdGFydFdpdGgsIHBhaXJ3aXNlLCBkZWJvdW5jZVRpbWUsIHNraXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBJbmplY3RvcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuLFxuICBRdWVyeUxpc3QsXG4gIEFmdGVyQ29udGVudEluaXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIE5nWm9uZSxcbiAgaXNEZXZNb2RlLCBmb3J3YXJkUmVmLCBJdGVyYWJsZURpZmZlcnMsIEl0ZXJhYmxlRGlmZmVyLCBEb0NoZWNrLCBBdHRyaWJ1dGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHksIGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENka0hlYWRlclJvd0RlZiwgQ2RrRm9vdGVyUm93RGVmLCBDZGtSb3dEZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZFBsdWdpbkNvbnRleHQgfSBmcm9tICcuLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRQYWdpbmF0b3JLaW5kIH0gZnJvbSAnLi4vcGFnaW5hdG9yJztcbmltcG9ydCB7IERhdGFTb3VyY2VQcmVkaWNhdGUsIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsRGF0YVNvdXJjZSwgRGF0YVNvdXJjZU9mLCBjcmVhdGVEUyB9IGZyb20gJy4uL2RhdGEtc291cmNlL2luZGV4JztcbmltcG9ydCB7IFBibENka1RhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi9wYmwtY2RrLXRhYmxlL3BibC1jZGstdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IHJlc2V0Q29sdW1uV2lkdGhzIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBmaW5kQ2VsbERlZiB9IGZyb20gJy4vZGlyZWN0aXZlcy9jZWxsLWRlZic7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIFBibENvbHVtblN0b3JlLCBQYmxNZXRhQ29sdW1uU3RvcmUsIFBibE5ncmlkQ29sdW1uU2V0LCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsIGlzUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW5zJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBDb250ZXh0QXBpLCBQYmxOZ3JpZENvbnRleHRBcGksIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvdGFibGUtcmVnaXN0cnkuc2VydmljZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2NvbmZpZyc7XG5pbXBvcnQgeyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYywgRFlOQU1JQ19QQURESU5HX0JPWF9NT0RFTF9TUEFDRV9TVFJBVEVHWSB9IGZyb20gJy4vY29sLXdpZHRoLWxvZ2ljL2R5bmFtaWMtY29sdW1uLXdpZHRoJztcbmltcG9ydCB7IENvbHVtbkFwaSwgQXV0b1NpemVUb0ZpdE9wdGlvbnMgfSBmcm9tICcuL2NvbHVtbi1hcGknO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3dzL2luZGV4JztcblxuaW1wb3J0IHsgYmluZFRvRGF0YVNvdXJjZSB9IGZyb20gJy4vYmluZC10by1kYXRhc291cmNlJztcbmltcG9ydCAnLi9iaW5kLXRvLWRhdGFzb3VyY2UnOyAvLyBMRUFWRSBUSElTLCBXRSBORUVEIElUIFNPIFRIRSBBVUdNRU5UQVRJT04gSU4gVEhFIEZJTEUgV0lMTCBMT0FELlxuXG5pbXBvcnQgeyBzZXRJZGVudGl0eVByb3AgfSBmcm9tICcuL3RhYmxlLmRlcHJlY2F0ZS1hdC0xLjAuMCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnRlcm5hbEFwaUZhY3RvcnkodGFibGU6IHsgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7IH0pIHsgcmV0dXJuIHRhYmxlLl9leHRBcGk7IH1cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW5Db250cm9sbGVyRmFjdG9yeSh0YWJsZTogeyBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7IH0pIHsgcmV0dXJuIHRhYmxlLl9wbHVnaW4uY29udHJvbGxlcjsgfVxuZXhwb3J0IGZ1bmN0aW9uIG1ldGFSb3dTZXJ2aWNlRmFjdG9yeSh0YWJsZTogeyBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTsgfSkgeyByZXR1cm4gdGFibGUuX2V4dEFwaS5tZXRhUm93U2VydmljZTsgfVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vdGFibGUuY29tcG9uZW50LnNjc3MnIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgIHVzZUZhY3Rvcnk6IHBsdWdpbkNvbnRyb2xsZXJGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEVYVF9BUElfVE9LRU4sXG4gICAgICB1c2VGYWN0b3J5OiBpbnRlcm5hbEFwaUZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogUGJsTmdyaWRNZXRhUm93U2VydmljZSxcbiAgICAgIHVzZUZhY3Rvcnk6IG1ldGFSb3dTZXJ2aWNlRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfVxuICBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb21wb25lbnQ8VCA9IGFueT4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBEb0NoZWNrLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgLyoqXG4gICAqIFNob3cvSGlkZSB0aGUgaGVhZGVyIHJvdy5cbiAgICogRGVmYXVsdDogdHJ1ZVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNob3dIZWFkZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93SGVhZGVyOyB9O1xuICBzZXQgc2hvd0hlYWRlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dIZWFkZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaG93SGVhZGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTaG93L0hpZGUgdGhlIGZvb3RlciByb3cuXG4gICAqIERlZmF1bHQ6IGZhbHNlXG4gICAqL1xuICBASW5wdXQoKSBnZXQgc2hvd0Zvb3RlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3Nob3dGb290ZXI7IH07XG4gIHNldCBzaG93Rm9vdGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2hvd0Zvb3RlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX3Nob3dGb290ZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgdGhlIGZpbGxlciBpcyBkaXNhYmxlZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBub0ZpbGxlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vRmlsbGVyOyB9O1xuICBzZXQgbm9GaWxsZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9ub0ZpbGxlciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgX25vRmlsbGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBTZXQncyB0aGUgYmVoYXZpb3Igb2YgdGhlIHRhYmxlIHdoZW4gdGFiYmluZy5cbiAgICogVGhlIGRlZmF1bHQgYmVoYXZpb3IgaXMgbm9uZSAocm93cyBhbmQgY2VsbHMgYXJlIG5vdCBmb2N1c2FibGUpXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGUgZm9jdXMgbW9kZSBoYXMgYW4gZWZmZWN0IG9uIG90aGVyIGZ1bmN0aW9ucywgZm9yIGV4YW1wbGUgYSBkZXRhaWwgcm93IHdpbGwgdG9nZ2xlIChvcGVuL2Nsb3NlKSB1c2luZ1xuICAgKiBFTlRFUiAvIFNQQUNFIG9ubHkgd2hlbiBmb2N1c01vZGUgaXMgc2V0IHRvIGByb3dgLlxuICAgKi9cbiAgQElucHV0KCkgZm9jdXNNb2RlOiAncm93JyB8ICdjZWxsJyB8ICdub25lJyB8ICcnIHwgZmFsc2UgfCB1bmRlZmluZWQ7XG5cbiAgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgaW4gMS4wLjBcbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIFVzZSBgcEluZGV4YCBpbiB0aGUgY29sdW1uIGRlZmluaXRpb24uIChSZW1vdmVkIGluIDEuMC4wKVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGlkZW50aXR5UHJvcCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fX2lkZW50aXR5UHJvcDsgfVxuICBzZXQgaWRlbnRpdHlQcm9wKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5fX2lkZW50aXR5UHJvcCA9IHZhbHVlOyBzZXRJZGVudGl0eVByb3AodGhpcy5fc3RvcmUsIHZhbHVlKTsgfVxuICBwcml2YXRlIF9faWRlbnRpdHlQcm9wOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSB0YWJsZSdzIHNvdXJjZSBvZiBkYXRhXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIFRoZSB0YWJsZSdzIHNvdXJjZSBvZiBkYXRhLCB3aGljaCBjYW4gYmUgcHJvdmlkZWQgaW4gMiB3YXlzOlxuICAgKlxuICAgKiAtIERhdGFTb3VyY2VPZjxUPlxuICAgKiAtIFBibERhdGFTb3VyY2U8VD5cbiAgICpcbiAgICogVGhlIHRhYmxlIG9ubHkgd29ya3Mgd2l0aCBgUGJsRGF0YVNvdXJjZTxUPmAsIGBEYXRhU291cmNlT2Y8VD5gIGlzIGEgc2hvcnRjdXQgZm9yIHByb3ZpZGluZ1xuICAgKiB0aGUgZGF0YSBhcnJheSBkaXJlY3RseS5cbiAgICpcbiAgICogYERhdGFTb3VyY2VPZjxUPmAgY2FuIGJlOlxuICAgKlxuICAgKiAtIFNpbXBsZSBkYXRhIGFycmF5IChlYWNoIG9iamVjdCByZXByZXNlbnRzIG9uZSB0YWJsZSByb3cpXG4gICAqIC0gUHJvbWlzZSBmb3IgYSBkYXRhIGFycmF5XG4gICAqIC0gU3RyZWFtIHRoYXQgZW1pdHMgYSBkYXRhIGFycmF5IGVhY2ggdGltZSB0aGUgYXJyYXkgY2hhbmdlc1xuICAgKlxuICAgKiBXaGVuIGEgYERhdGFTb3VyY2VPZjxUPmAgaXMgcHJvdmlkZWQgaXQgaXMgY29udmVydGVkIGludG8gYW4gaW5zdGFuY2Ugb2YgYFBibERhdGFTb3VyY2U8VD5gLlxuICAgKlxuICAgKiBUbyBhY2Nlc3MgdGhlIGBQYmxEYXRhU291cmNlPFQ+YCBpbnN0YW5jZSB1c2UgdGhlIGBkc2AgcHJvcGVydHkgKHJlYWRvbmx5KS5cbiAgICpcbiAgICogSXQgaXMgaGlnaGx5IHJlY29tbWVuZGVkIHRvIHVzZSBgUGJsRGF0YVNvdXJjZTxUPmAgZGlyZWN0bHksIHRoZSBkYXRhc291cmNlIGZhY3RvcnkgbWFrZXMgaXQgZWFzeS5cbiAgICogRm9yIGV4YW1wbGUsIHdoZW4gYW4gYXJyYXkgaXMgcHJvdmlkZWQgdGhlIGZhY3RvcnkgaXMgdXNlZCB0byBjb252ZXJ0IGl0IHRvIGEgZGF0YXNvdXJjZTpcbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBjb2xsZWN0aW9uOiBUW10gPSBbXTtcbiAgICogY29uc3QgcGJsRGF0YVNvdXJjZSA9IGNyZWF0ZURTPFQ+KCkub25UcmlnZ2VyKCAoKSA9PiBjb2xsZWN0aW9uICkuY3JlYXRlKCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiA+IFRoaXMgaXMgYSB3cml0ZS1vbmx5IChzZXR0ZXIpIHByb3BlcnR5IHRoYXQgdHJpZ2dlcnMgdGhlIGBzZXREYXRhU291cmNlYCBtZXRob2QuXG4gICAqL1xuICBASW5wdXQoKSBzZXQgZGF0YVNvdXJjZSh2YWx1ZTogUGJsRGF0YVNvdXJjZTxUPiB8IERhdGFTb3VyY2VPZjxUPikge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIFBibERhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMuc2V0RGF0YVNvdXJjZSh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YVNvdXJjZShjcmVhdGVEUzxUPigpLm9uVHJpZ2dlciggKCkgPT4gdmFsdWUgfHwgW10gKS5jcmVhdGUoKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGRzKCk6IFBibERhdGFTb3VyY2U8VD4geyByZXR1cm4gdGhpcy5fZGF0YVNvdXJjZTsgfTtcblxuICBASW5wdXQoKSBnZXQgdXNlUGFnaW5hdGlvbigpOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSB7IHJldHVybiB0aGlzLl9wYWdpbmF0aW9uOyB9XG4gIHNldCB1c2VQYWdpbmF0aW9uKHZhbHVlOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSkge1xuICAgIGlmICgodmFsdWUgYXMgYW55KSA9PT0gJycpIHtcbiAgICAgIHZhbHVlID0gJ3BhZ2VOdW1iZXInO1xuICAgIH1cbiAgICBpZiAoIHZhbHVlICE9PSB0aGlzLl9wYWdpbmF0aW9uICkge1xuICAgICAgdGhpcy5fcGFnaW5hdGlvbiA9IHZhbHVlO1xuICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBub0NhY2hlUGFnaW5hdG9yKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fbm9DYWNoZVBhZ2luYXRvcjsgfVxuICBzZXQgbm9DYWNoZVBhZ2luYXRvcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fbm9DYWNoZVBhZ2luYXRvciAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX25vQ2FjaGVQYWdpbmF0b3IgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmRzICYmIHRoaXMuZHMucGFnaW5hdG9yKSB7XG4gICAgICAgIHRoaXMuZHMucGFnaW5hdG9yLm5vQ2FjaGVNb2RlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgZm9yIHRoaXMgdGFibGUuXG4gICAqL1xuICBASW5wdXQoKSBjb2x1bW5zOiBQYmxOZ3JpZENvbHVtblNldCB8IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldDtcblxuICBASW5wdXQoKSBzZXQgaGlkZUNvbHVtbnModmFsdWU6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5faGlkZUNvbHVtbnMgPSB2YWx1ZTtcbiAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZhbGxiYWNrIGhlaWdodCBmb3IgXCJ0aGUgaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiLlxuICAgKiBUaGUgZmFsbGJhY2sgaXMgdXNlZCBvbmx5IHdoZW4gaXQgTE9XRVIgdGhhbiB0aGUgcmVuZGVyZWQgaGVpZ2h0LCBzbyBubyBlbXB0eSBnYXBzIGFyZSBjcmVhdGVkIHdoZW4gc2V0dGluZyB0aGUgZmFsbGJhY2suXG4gICAqXG4gICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyB0aGUgYXJlYSBpbiB3aGljaCBhbGwgZGF0YSByb3dzIGFyZSByZW5kZXJlZCBhbmQgYWxsIG1ldGEgKGhlYWRlci9mb290ZXIpIHJvd3MgdGhhdCBhcmUgb2YgdHlwZSBcInJvd1wiIG9yIFwic3RpY2t5XCIuXG4gICAqIFRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBpcyBkZWZpbmVkIHRvIGNvbnN1bWUgYWxsIHRoZSBoZWlnaHQgbGVmdCBhZnRlciBhbGwgZXh0ZXJuYWwgb2JqZWN0cyBhcmUgcmVuZGVyZWQuXG4gICAqIEV4dGVybmFsIG9iamVjdHMgY2FuIGJlIGZpeGVkIG1ldGEgcm93cyAoaGVhZGVyL2Zvb3RlciksIHBhZ2luYXRpb24gcm93LCBhY3Rpb24gcm93IGV0Yy4uLlxuICAgKlxuICAgKiBJZiB0aGUgdGFibGUgZG9lcyBub3QgaGF2ZSBhIGhlaWdodCAoJSBvciBweCkgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIHdpbGwgYWx3YXlzIGhhdmUgbm8gaGVpZ2h0ICgwKS5cbiAgICogSWYgdGhlIHRhYmxlIGhhcyBhIGhlaWdodCwgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIHdpbGwgZ2V0IHRoZSBoZWlnaHQgbGVmdCwgd2hpY2ggY2FuIGFsc28gYmUgMCBpZiB0aGVyZSBhcmUgYSBsb3Qgb2YgZXh0ZXJuYWwgb2JqZWN0cy5cbiAgICpcbiAgICogVG8gc29sdmUgdGhlIG5vLWhlaWdodCBwcm9ibGVtIHdlIHVzZSB0aGUgZmFsbGJhY2tNaW5IZWlnaHQgcHJvcGVydHkuXG4gICAqXG4gICAqIFdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgYW5kIGZhbGxiYWNrTWluSGVpZ2h0IGlzIG5vdCBzZXQgdGhlIHRhYmxlIHdpbGwgc2V0IHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiBoZWlnaHQgdG8gc2hvdyBhbGwgcm93cy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gdXNpbmcgYSBmaXhlZCAocHgpIGhlaWdodCBmb3IgdGhlIHRhYmxlLCBpZiB0aGUgaGVpZ2h0IG9mIGFsbCBleHRlcm5hbCBvYmplY3RzICsgdGhlIGhlaWdodCBvZiB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgZ3JlYXRlciB0aGVuXG4gICAqIHRoZSB0YWJsZSdzIGhlaWdodCBhIHZlcnRpY2FsIHNjcm9sbCBiYXIgd2lsbCBzaG93LlxuICAgKiBJZiB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCJzIGhlaWdodCB3aWxsIGJlIGxvd2VyIHRoZW4gaXQncyByZW5kZXJlZCBjb250ZW50IGhlaWdodCBhbmQgYWRkaXRpb25hbCB2ZXJ0aWNhbCBzY3JvbGwgYmFyIHdpbGwgYXBwZWFyLCB3aGljaCBpcywgdXN1YWxseSwgbm90IGdvb2QuXG4gICAqXG4gICAqIFRvIGF2b2lkIHRoaXMsIGRvbid0IHVzZSBmYWxsYmFja01pbkhlaWdodCB0b2dldGhlciB3aXRoIGEgZml4ZWQgaGVpZ2h0IGZvciB0aGUgdGFibGUuIEluc3RlYWQgdXNlIGZhbGxiYWNrTWluSGVpZ2h0IHRvZ2V0aGVyIHdpdGggYSBtaW4gaGVpZ2h0IGZvciB0aGUgdGFibGUuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgZmFsbGJhY2tNaW5IZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0OyB9XG4gIHNldCBmYWxsYmFja01pbkhlaWdodCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSByb3dDbGFzc1VwZGF0ZTogdW5kZWZpbmVkIHwgKCAoY29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+KSA9PiAoIHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gKSk7XG4gIEBJbnB1dCgpIHJvd0NsYXNzVXBkYXRlRnJlcTogJ2l0ZW0nIHwgJ25nRG9DaGVjaycgfCAnbm9uZScgPSAnaXRlbSc7XG5cbiAgcm93Rm9jdXM6IDAgfCAnJyA9ICcnO1xuICBjZWxsRm9jdXM6IDAgfCAnJyA9ICcnO1xuXG4gIHByaXZhdGUgX2ZhbGxiYWNrTWluSGVpZ2h0ID0gMDtcbiAgcHJpdmF0ZSBfZGF0YVNvdXJjZTogUGJsRGF0YVNvdXJjZTxUPjtcblxuICBAVmlld0NoaWxkKCdiZWZvcmVUYWJsZScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkJlZm9yZVRhYmxlOiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdiZWZvcmVDb250ZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQmVmb3JlQ29udGVudDogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnYWZ0ZXJDb250ZW50JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgX3ZjUmVmQWZ0ZXJDb250ZW50OiBWaWV3Q29udGFpbmVyUmVmO1xuICBAVmlld0NoaWxkKCdmYlRhYmxlQ2VsbCcsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfZmJUYWJsZUNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ2VsbENvbnRleHQ8VD4+O1xuICBAVmlld0NoaWxkKCdmYkhlYWRlckNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiSGVhZGVyQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+O1xuICBAVmlld0NoaWxkKCdmYkZvb3RlckNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiRm9vdGVyQ2VsbDogVGVtcGxhdGVSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD4+O1xuICBAVmlld0NoaWxkKENka1Jvd0RlZiwgeyBzdGF0aWM6IHRydWUgfSkgX3RhYmxlUm93RGVmOiBDZGtSb3dEZWY8VD47XG4gIEBWaWV3Q2hpbGRyZW4oQ2RrSGVhZGVyUm93RGVmKSBfaGVhZGVyUm93RGVmczogUXVlcnlMaXN0PENka0hlYWRlclJvd0RlZj47XG4gIEBWaWV3Q2hpbGRyZW4oQ2RrRm9vdGVyUm93RGVmKSBfZm9vdGVyUm93RGVmczogUXVlcnlMaXN0PENka0Zvb3RlclJvd0RlZj47XG5cbiAgZ2V0IG1ldGFDb2x1bW5JZHMoKTogUGJsQ29sdW1uU3RvcmVbJ21ldGFDb2x1bW5JZHMnXSB7IHJldHVybiB0aGlzLl9zdG9yZS5tZXRhQ29sdW1uSWRzOyB9XG4gIGdldCBtZXRhQ29sdW1ucygpOiBQYmxDb2x1bW5TdG9yZVsnbWV0YUNvbHVtbnMnXSB7IHJldHVybiB0aGlzLl9zdG9yZS5tZXRhQ29sdW1uczsgfVxuICBnZXQgY29sdW1uUm93RGVmKCkgeyByZXR1cm4geyBoZWFkZXI6IHRoaXMuX3N0b3JlLmhlYWRlckNvbHVtbkRlZiwgZm9vdGVyOiB0aGlzLl9zdG9yZS5mb290ZXJDb2x1bW5EZWYgfTsgfVxuICAvKipcbiAgICogVHJ1ZSB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQgKGFmdGVyIEFmdGVyVmlld0luaXQpXG4gICAqL1xuICByZWFkb25seSBpc0luaXQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGNvbHVtbkFwaTogQ29sdW1uQXBpPFQ+O1xuICBnZXQgY29udGV4dEFwaSgpOiBQYmxOZ3JpZENvbnRleHRBcGk8VD4geyByZXR1cm4gdGhpcy5fZXh0QXBpLmNvbnRleHRBcGk7IH1cblxuICBnZXQgdmlld3BvcnQoKTogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IHwgdW5kZWZpbmVkIHsgcmV0dXJuIHRoaXMuX3ZpZXdwb3J0OyB9XG5cbiAgX2Nka1RhYmxlOiBQYmxDZGtUYWJsZUNvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBfc3RvcmU6IFBibENvbHVtblN0b3JlID0gbmV3IFBibENvbHVtblN0b3JlKCk7XG4gIHByaXZhdGUgX2hpZGVDb2x1bW5zRGlydHk6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hpZGVDb2x1bW5zOiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSBfY29sSGlkZURpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nPjtcbiAgcHJpdmF0ZSBfbm9EYXRlRW1iZWRkZWRWUmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBfcGFnaW5hdG9yRW1iZWRkZWRWUmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBfcGFnaW5hdGlvbjogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2U7XG4gIHByaXZhdGUgX25vQ2FjaGVQYWdpbmF0b3IgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbWluaW11bVJvd1dpZHRoOiBzdHJpbmc7XG4gIHByaXZhdGUgX3ZpZXdwb3J0PzogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50O1xuICBwcml2YXRlIF9wbHVnaW46IFBibE5ncmlkUGx1Z2luQ29udGV4dDtcbiAgcHJpdmF0ZSBfZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPjtcblxuICBjb25zdHJ1Y3RvcihpbmplY3RvcjogSW5qZWN0b3IsIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBkaWZmZXJzOiBJdGVyYWJsZURpZmZlcnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICAgICAgICAgICAgQEF0dHJpYnV0ZSgnaWQnKSBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHRhYmxlQ29uZmlnID0gY29uZmlnLmdldCgndGFibGUnKTtcbiAgICB0aGlzLnNob3dIZWFkZXIgPSB0YWJsZUNvbmZpZy5zaG93SGVhZGVyO1xuICAgIHRoaXMuc2hvd0Zvb3RlciA9IHRhYmxlQ29uZmlnLnNob3dGb290ZXI7XG4gICAgdGhpcy5ub0ZpbGxlciA9IHRhYmxlQ29uZmlnLm5vRmlsbGVyO1xuXG4gICAgdGhpcy5pbml0RXh0QXBpKCk7XG4gICAgdGhpcy5jb2x1bW5BcGkgPSBDb2x1bW5BcGkuY3JlYXRlPFQ+KHRoaXMsIHRoaXMuX3N0b3JlLCB0aGlzLl9leHRBcGkpO1xuICAgIHRoaXMuaW5pdFBsdWdpbnMoaW5qZWN0b3IsIGVsUmVmLCB2Y1JlZik7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2hpZGVDb2x1bW5zRGlydHkpIHtcbiAgICAgIHRoaXMuX2hpZGVDb2x1bW5zRGlydHkgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5faGlkZUNvbHVtbnM7XG4gICAgICBpZiAoIXRoaXMuX2NvbEhpZGVEaWZmZXIgJiYgdmFsdWUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLl9jb2xIaWRlRGlmZmVyID0gdGhpcy5kaWZmZXJzLmZpbmQodmFsdWUpLmNyZWF0ZSgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgZmluZCBhIGRpZmZlciBzdXBwb3J0aW5nIG9iamVjdCAnJHt2YWx1ZX0uIGhpZGVDb2x1bW5zIG9ubHkgc3VwcG9ydHMgYmluZGluZyB0byBJdGVyYWJsZXMgc3VjaCBhcyBBcnJheXMuYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbEhpZGVEaWZmZXIpIHtcbiAgICAgIGNvbnN0IGhpZGVDb2x1bW5zID0gdGhpcy5faGlkZUNvbHVtbnMgfHwgW107XG4gICAgICBjb25zdCBjaGFuZ2VzID0gdGhpcy5fY29sSGlkZURpZmZlci5kaWZmKGhpZGVDb2x1bW5zKTtcbiAgICAgIGlmIChjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmhpZGRlbiA9IGhpZGVDb2x1bW5zO1xuICAgICAgICB0aGlzLl9taW5pbXVtUm93V2lkdGggPSAnJztcblxuICAgICAgICAvLyBUT0RPKHNobG9taWFzc2FmKSBbcGVyZiwgNF06IFJpZ2h0IG5vdyB3ZSBhdHRhY2ggYWxsIGNvbHVtbnMsIHdlIGNhbiBpbXByb3ZlIGl0IGJ5IGF0dGFjaGluZyBvbmx5IHRob3NlIFwiYWRkZWRcIiAod2Uga25vdyB0aGVtIGZyb20gXCJjaGFuZ2VzXCIpXG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLl9oaWRlQ29sdW1ucykge1xuICAgICAgICB0aGlzLl9jb2xIaWRlRGlmZmVyID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBubyBuZWVkIHRvIHVuc3Vic2NyaWJlLCB0aGUgcmVnIHNlcnZpY2UgaXMgcGVyIHRhYmxlIGluc3RhbmNlIGFuZCBpdCB3aWxsIGRlc3Ryb3kgd2hlbiB0aGlzIHRhYmxlIGRlc3Ryb3kuXG4gICAgLy8gQWxzbywgYXQgdGhpcyBwb2ludCBpbml0aWFsIGNoYW5nZXMgZnJvbSB0ZW1wbGF0ZXMgcHJvdmlkZWQgaW4gdGhlIGNvbnRlbnQgYXJlIGFscmVhZHkgaW5zaWRlIHNvIHRoZXkgd2lsbCBub3QgdHJpZ2dlclxuICAgIC8vIHRoZSBvcmRlciBoZXJlIGlzIHZlcnkgaW1wb3J0YW50LCBiZWNhdXNlIGNvbXBvbmVudCB0b3Agb2YgdGhpcyB0YWJsZSB3aWxsIGZpcmUgbGlmZSBjeWNsZSBob29rcyBBRlRFUiB0aGlzIGNvbXBvbmVudFxuICAgIC8vIHNvIGlmIHdlIGhhdmUgYSB0b3AgbGV2ZWwgY29tcG9uZW50IHJlZ2lzdGVyaW5nIGEgdGVtcGxhdGUgb24gdG9wIGl0IHdpbGwgbm90IHNob3cgdW5sZXNzIHdlIGxpc3Rlbi5cbiAgICB0aGlzLnJlZ2lzdHJ5LmNoYW5nZXMuc3Vic2NyaWJlKCBjaGFuZ2VzID0+IHtcbiAgICAgIGxldCB0YWJsZUNlbGwgPSBmYWxzZTtcbiAgICAgIGxldCBoZWFkZXJGb290ZXJDZWxsID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ3RhYmxlQ2VsbCc6XG4gICAgICAgICAgICB0YWJsZUNlbGwgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyQ2VsbCc6XG4gICAgICAgICAgY2FzZSAnZm9vdGVyQ2VsbCc6XG4gICAgICAgICAgICBoZWFkZXJGb290ZXJDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25vRGF0YSc6XG4gICAgICAgICAgICB0aGlzLnNldHVwTm9EYXRhKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdwYWdpbmF0b3InOlxuICAgICAgICAgICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh0YWJsZUNlbGwpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgICB9XG4gICAgICBpZiAoaGVhZGVyRm9vdGVyQ2VsbCkge1xuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmludmFsaWRhdGVDb2x1bW5zKCk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2lzSW5pdCcsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkluaXQnIH0pO1xuXG4gICAgdGhpcy5zZXR1cFBhZ2luYXRvcigpO1xuXG4gICAgLy8gQWRkaW5nIGEgZGl2IGJlZm9yZSB0aGUgZm9vdGVyIHJvdyB2aWV3IHJlZmVyZW5jZSwgdGhpcyBkaXYgd2lsbCBiZSB1c2VkIHRvIGZpbGwgdXAgdGhlIHNwYWNlIGJldHdlZW4gaGVhZGVyICYgZm9vdGVyIHJvd3NcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLWVtcHR5LXNwYWNlcicpXG4gICAgdGhpcy5fY2RrVGFibGUuX2VsZW1lbnQuaW5zZXJ0QmVmb3JlKGRpdiwgdGhpcy5fY2RrVGFibGUuX2Zvb3RlclJvd091dGxldC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMubGlzdGVuVG9SZXNpemUoKTtcblxuICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSB3aWxsIGNhdGNoIGNvbnRleHQgZm9jdXNlZCBldmVudHMsIGZpbmQgdGhlIEhUTUwgZWxlbWVudCBvZiB0aGUgY2VsbCBhbmQgZm9jdXMgaXQuXG4gICAgdGhpcy5jb250ZXh0QXBpLmZvY3VzQ2hhbmdlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuY3Vycikge1xuICAgICAgICAgIGNvbnN0IHJvd0NvbnRleHQgPSB0aGlzLmNvbnRleHRBcGkuZmluZFJvd0luVmlldyhldmVudC5jdXJyLnJvd0lkZW50KTtcbiAgICAgICAgICBpZiAocm93Q29udGV4dCkge1xuICAgICAgICAgICAgY29uc3QgdmlldyA9IHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5nZXQocm93Q29udGV4dC5pbmRleCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICAgICAgICBpZiAodmlldykge1xuICAgICAgICAgICAgICBjb25zdCBjZWxsVmlld0luZGV4ID0gdGhpcy5jb2x1bW5BcGkucmVuZGVySW5kZXhPZih0aGlzLmNvbHVtbkFwaS5jb2x1bW5zW2V2ZW50LmN1cnIuY29sSW5kZXhdKVxuICAgICAgICAgICAgICBjb25zdCBjZWxsRWxlbWVudCA9IHZpZXcucm9vdE5vZGVzWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJ3BibC1uZ3JpZC1jZWxsJylbY2VsbFZpZXdJbmRleF07XG4gICAgICAgICAgICAgIGlmIChjZWxsRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGxldCBwcm9jZXNzQ29sdW1ucyA9IGZhbHNlO1xuXG4gICAgaWYgKGNoYW5nZXMuZm9jdXNNb2RlKSB7XG4gICAgICB0aGlzLnJvd0ZvY3VzID0gdGhpcy5mb2N1c01vZGUgPT09ICdyb3cnID8gMCA6ICcnO1xuICAgICAgdGhpcy5jZWxsRm9jdXMgPSB0aGlzLmZvY3VzTW9kZSA9PT0gJ2NlbGwnID8gMCA6ICcnO1xuICAgIH1cblxuICAgIGlmICggY2hhbmdlcy5jb2x1bW5zICYmIHRoaXMuaXNJbml0ICkge1xuICAgICAgcHJvY2Vzc0NvbHVtbnMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICggcHJvY2Vzc0NvbHVtbnMgPT09IHRydWUgKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVDb2x1bW5zKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX3BsdWdpbi5kZXN0cm95KCk7XG4gICAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuZGV0YWNoVmlld1BvcnQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgbGV0IHA6IFByb21pc2U8dm9pZD47XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvbkRlc3Ryb3knLCB3YWl0OiAoX3A6IFByb21pc2U8dm9pZD4pID0+IHAgPSBfcCB9KTtcbiAgICBpZiAocCkge1xuICAgICAgcC50aGVuKGRlc3Ryb3kpLmNhdGNoKGRlc3Ryb3kpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgdHJhY2tCeShpbmRleDogbnVtYmVyLCBpdGVtOiBUKTogYW55IHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGN1cnJlbnQgc29ydCBkZWZpbml0aW9ucy5cbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YCwgRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXG4gICAqXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIHNvcnRpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBvciBgc29ydEFsaWFzYCBwcm9wZXJ0aWVzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0U29ydGBcbiAgICpcbiAgICogQHBhcmFtIGNvbHVtbk9yU29ydEFsaWFzIEEgY29sdW1uIGluc3RhbmNlIG9yIGEgc3RyaW5nIG1hdGNoaW5nIGBQYmxDb2x1bW4uc29ydEFsaWFzYCBvciBgUGJsQ29sdW1uLmlkYC5cbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KGNvbHVtbk9yU29ydEFsaWFzOiBQYmxDb2x1bW4gfCBzdHJpbmcsIHNvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhcz86IFBibENvbHVtbiB8IHN0cmluZyB8IGJvb2xlYW4sIHNvcnQ/OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIWNvbHVtbk9yU29ydEFsaWFzIHx8IHR5cGVvZiBjb2x1bW5PclNvcnRBbGlhcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLmRzLnNldFNvcnQoISFjb2x1bW5PclNvcnRBbGlhcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbHVtbjogUGJsQ29sdW1uO1xuICAgIGlmICh0eXBlb2YgY29sdW1uT3JTb3J0QWxpYXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb2x1bW4gPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbmQoIGMgPT4gYy5hbGlhcyA/IGMuYWxpYXMgPT09IGNvbHVtbk9yU29ydEFsaWFzIDogKGMuc29ydCAmJiBjLmlkID09PSBjb2x1bW5PclNvcnRBbGlhcykgKTtcbiAgICAgIGlmICghY29sdW1uICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGZpbmQgY29sdW1uIHdpdGggYWxpYXMgXCIke2NvbHVtbk9yU29ydEFsaWFzfVwiLmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbiA9IGNvbHVtbk9yU29ydEFsaWFzO1xuICAgIH1cbiAgICB0aGlzLmRzLnNldFNvcnQoY29sdW1uLCBzb3J0LCBza2lwVXBkYXRlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAsIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLlxuICAgKi9cbiAgc2V0RmlsdGVyKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIGZ1bmN0aW9uIHByZWRpY2F0ZS5cbiAgICpcbiAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmBcbiAgICovXG4gIHNldEZpbHRlcih2YWx1ZTogRGF0YVNvdXJjZVByZWRpY2F0ZSwgY29sdW1ucz86IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSB2YWx1ZSB0byBjb21wYXJlIHdpdGggYW5kIGEgbGlzdCBvZiBjb2x1bW5zIHdpdGggdGhlIHZhbHVlcyB0byBjb21wYXJlIHRvLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmAgd2l0aCB0aGUgYWRkZWQgc3VnYXIgb2YgcHJvdmlkaW5nIGNvbHVtbiBieSBzdHJpbmcgdGhhdCBtYXRjaCB0aGUgYGlkYCBwcm9wZXJ0eS5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldEZpbHRlcmBcbiAgICovXG4gIHNldEZpbHRlcih2YWx1ZTogYW55LCBjb2x1bW5zOiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgc2V0RmlsdGVyKHZhbHVlPzogRGF0YVNvdXJjZUZpbHRlclRva2VuLCBjb2x1bW5zPzogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGNvbHVtbkluc3RhbmNlczogUGJsQ29sdW1uW107XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShjb2x1bW5zKSAmJiB0eXBlb2YgY29sdW1uc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29sdW1uSW5zdGFuY2VzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgY29sSWQgb2YgY29sdW1ucykge1xuICAgICAgICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmluZCggYyA9PiBjLmFsaWFzID8gYy5hbGlhcyA9PT0gY29sSWQgOiAoYy5pZCA9PT0gY29sSWQpICk7XG4gICAgICAgICAgaWYgKCFjb2x1bW4gJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgQ291bGQgbm90IGZpbmQgY29sdW1uIHdpdGggYWxpYXMgJHtjb2xJZH0gXCIke2NvbElkfVwiLmApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb2x1bW5JbnN0YW5jZXMucHVzaChjb2x1bW4pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5JbnN0YW5jZXMgPSBjb2x1bW5zIGFzIGFueTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZHMuc2V0RmlsdGVyKHZhbHVlLCBjb2x1bW5JbnN0YW5jZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRzLnNldEZpbHRlcigpO1xuICAgIH1cbiAgfVxuXG4gIHNldERhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZGF0YVNvdXJjZSAhPT0gdmFsdWUpIHtcbiAgICAgIC8vIEtJTEwgQUxMIHN1YnNjcmlwdGlvbnMgZm9yIHRoZSBwcmV2aW91cyBkYXRhc291cmNlLlxuICAgICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UpIHtcbiAgICAgICAgVW5SeC5raWxsKHRoaXMsIHRoaXMuX2RhdGFTb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fZGF0YVNvdXJjZTtcbiAgICAgIHRoaXMuX2RhdGFTb3VyY2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLmRhdGFTb3VyY2UgPSB2YWx1ZSBhcyBhbnk7XG5cbiAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICAgIHRoaXMuc2V0dXBOb0RhdGEoZmFsc2UpO1xuXG4gICAgICAvLyBjbGVhciB0aGUgY29udGV4dCwgbmV3IGRhdGFzb3VyY2VcbiAgICAgIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG5cbiAgICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoe1xuICAgICAgICBraW5kOiAnb25EYXRhU291cmNlJyxcbiAgICAgICAgcHJldixcbiAgICAgICAgY3VycjogdmFsdWVcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIHZhbHVlICkge1xuICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICB2YWx1ZS5vbkVycm9yLnBpcGUoVW5SeCh0aGlzLCB2YWx1ZSkpLnN1YnNjcmliZShjb25zb2xlLmVycm9yLmJpbmQoY29uc29sZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UgcmVnaXN0ZXIgdG8gdGhpcyBldmVudCBiZWNhdXNlIGl0IGZpcmVzIGJlZm9yZSB0aGUgZW50aXJlIGRhdGEtY2hhbmdpbmcgcHJvY2VzcyBzdGFydHMuXG4gICAgICAgIC8vIFRoaXMgaXMgcmVxdWlyZWQgYmVjYXVzZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGlzIGZpcmVkIGFzeW5jLCBqdXN0IGJlZm9yZSB0aGUgZGF0YSBpcyBlbWl0dGVkLlxuICAgICAgICAvLyBJdHMgbm90IGVub3VnaCB0byBjbGVhciB0aGUgY29udGV4dCB3aGVuIGBzZXREYXRhU291cmNlYCBpcyBjYWxsZWQsIHdlIGFsc28gbmVlZCB0byBoYW5kbGUgYHJlZnJlc2hgIGNhbGxzIHdoaWNoIHdpbGwgbm90XG4gICAgICAgIC8vIHRyaWdnZXIgdGhpcyBtZXRob2QuXG4gICAgICAgIHZhbHVlLm9uU291cmNlQ2hhbmdpbmcucGlwZShVblJ4KHRoaXMsIHZhbHVlKSkuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpICk7XG5cbiAgICAgICAgLy8gUnVuIENELCBzY2hlZHVsZWQgYXMgYSBtaWNyby10YXNrLCBhZnRlciBlYWNoIHJlbmRlcmluZ1xuICAgICAgICB2YWx1ZS5vblJlbmRlckRhdGFDaGFuZ2luZ1xuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKCAoe2V2ZW50fSkgPT4gIWV2ZW50LmlzSW5pdGlhbCAmJiAoZXZlbnQucGFnaW5hdGlvbi5jaGFuZ2VkIHx8IGV2ZW50LnNvcnQuY2hhbmdlZCB8fCBldmVudC5maWx0ZXIuY2hhbmdlZCkpLFxuICAgICAgICAgICAgLy8gQ29udGV4dCBiZXR3ZWVuIHRoZSBvcGVyYXRpb25zIGFyZSBub3Qgc3VwcG9ydGVkIGF0IHRoZSBtb21lbnRcbiAgICAgICAgICAgIC8vIEV2ZW50IGZvciBjbGllbnQgc2lkZSBvcGVyYXRpb25zLi4uXG4gICAgICAgICAgICAvLyBUT0RPOiBjYW4gd2UgcmVtb3ZlIHRoaXM/IHdlIGNsZWFyIHRoZSBjb250ZXh0IHdpdGggYG9uU291cmNlQ2hhbmdpbmdgXG4gICAgICAgICAgICB0YXAoICgpID0+ICF0aGlzLl9zdG9yZS5wcmltYXJ5ICYmIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCkgKSxcbiAgICAgICAgICAgIHN3aXRjaE1hcCggKCkgPT4gdmFsdWUub25SZW5kZXJlZERhdGFDaGFuZ2VkLnBpcGUodGFrZSgxKSwgbWFwVG8odGhpcy5kcy5yZW5kZXJMZW5ndGgpKSApLFxuICAgICAgICAgICAgb2JzZXJ2ZU9uKGFzYXBTY2hlZHVsZXIpLFxuICAgICAgICAgICAgVW5SeCh0aGlzLCB2YWx1ZSlcbiAgICAgICAgICApXG4gICAgICAgICAgLnN1YnNjcmliZSggcHJldmlvdXNSZW5kZXJMZW5ndGggPT4ge1xuICAgICAgICAgICAgLy8gSWYgdGhlIG51bWJlciBvZiByZW5kZXJlZCBpdGVtcyBoYXMgY2hhbmdlZCB0aGUgdGFibGUgd2lsbCB1cGRhdGUgdGhlIGRhdGEgYW5kIHJ1biBDRCBvbiBpdC5cbiAgICAgICAgICAgIC8vIHNvIHdlIG9ubHkgdXBkYXRlIHRoZSByb3dzLlxuICAgICAgICAgICAgY29uc3QgeyBjZGtUYWJsZSB9ID0gdGhpcy5fZXh0QXBpO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzUmVuZGVyTGVuZ3RoID09PSB0aGlzLmRzLnJlbmRlckxlbmd0aCkge1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cyh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3MoJ2Zvb3RlcicsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEhhbmRsaW5nIG5vIGRhdGEgb3ZlcmxheVxuICAgICAgICAvLyBIYW5kbGluZyBmYWxsYmFjayBtaW5pbXVtIGhlaWdodC5cbiAgICAgICAgdmFsdWUub25SZW5kZXJlZERhdGFDaGFuZ2VkXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoICgpID0+IHRoaXMuZHMucmVuZGVyTGVuZ3RoICksXG4gICAgICAgICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgICAgdGFwKCAoW3ByZXYsIGN1cnJdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5vRGF0YVNob3dpbmcgPSAhIXRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZjtcbiAgICAgICAgICAgICAgaWYgKCAoY3VyciA+IDAgJiYgbm9EYXRhU2hvd2luZykgfHwgKGN1cnIgPT09IDAgJiYgIW5vRGF0YVNob3dpbmcpICkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBOb0RhdGEoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvYnNlcnZlT24oYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLCAvLyB3dyB3YW50IHRvIGdpdmUgdGhlIGJyb3dzZXIgdGltZSB0byByZW1vdmUvYWRkIHJvd3NcbiAgICAgICAgICAgIFVuUngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgICAgIGlmICh0aGlzLmRzLnJlbmRlckxlbmd0aCA+IDAgJiYgdGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGggPSBNYXRoLm1pbih0aGlzLl9mYWxsYmFja01pbkhlaWdodCwgdGhpcy52aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpKTtcbiAgICAgICAgICAgICAgZWwuc3R5bGUubWluSGVpZ2h0ID0gaCArICdweCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5zdHlsZS5taW5IZWlnaHQgPSB0aGlzLnZpZXdwb3J0LmVuYWJsZWQgPyBudWxsIDogdGhpcy52aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpICsgJ3B4JztcbiAgICAgICAgICAgICAgLy8gVE9ETzogV2hlbiB2aWV3cG9ydCBpcyBkaXNhYmxlZCwgd2UgY2FuIHNraXAgdGhlIGNhbGwgdG8gbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSBhbmQgbGV0IHRoZSBicm93c2VyXG4gICAgICAgICAgICAgIC8vIGRvIHRoZSBqb2IgYnkgc2V0dGluZyBgY29udGFpbjogdW5zZXRgIGluIGBwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0YFxuXG4gICAgICAgICAgICAgIC8vIGVsLnN0eWxlLm1pbkhlaWdodCA9IG51bGw7XG4gICAgICAgICAgICAgIC8vIGVsLnN0eWxlLmNvbnRhaW4gPSB0aGlzLnZpZXdwb3J0LmVuYWJsZWQgPyBudWxsIDogJ3Vuc2V0JztcblxuICAgICAgICAgICAgICAvLyBVUERBVEU6IFRoaXMgd2lsbCBub3Qgd29yayBiZWNhdXNlIGl0IHdpbGwgY2F1c2UgdGhlIHdpZHRoIHRvIGJlIGluY29ycmVjdCB3aGVuIHVzZWQgd2l0aCB2U2Nyb2xsTm9uZVxuICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVjayB3aHk/XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEludmFsaWRhdGVzIHRoZSBoZWFkZXIsIGluY2x1ZGluZyBhIGZ1bGwgcmVidWlsZCBvZiBjb2x1bW4gaGVhZGVyc1xuICAgKi9cbiAgaW52YWxpZGF0ZUNvbHVtbnMoKTogdm9pZCB7XG4gICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdiZWZvcmVJbnZhbGlkYXRlSGVhZGVycycgfSk7XG5cbiAgICBjb25zdCByZWJ1aWxkUm93cyA9IHRoaXMuX3N0b3JlLmFsbENvbHVtbnMubGVuZ3RoID4gMDtcbiAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgIHRoaXMuX3N0b3JlLmludmFsaWRhdGUodGhpcy5jb2x1bW5zKTtcblxuICAgIHNldElkZW50aXR5UHJvcCh0aGlzLl9zdG9yZSwgdGhpcy5fX2lkZW50aXR5UHJvcCk7IC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIGluIDEuMC4wXG5cbiAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICB0aGlzLmF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTtcbiAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckhlYWRlclJvd0RlZnMoKTtcbiAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckZvb3RlclJvd0RlZnMoKTtcbiAgICAvLyB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICAvLyBhZnRlciBpbnZhbGlkYXRpbmcgdGhlIGhlYWRlcnMgd2Ugbm93IGhhdmUgb3B0aW9uYWwgaGVhZGVyL2hlYWRlckdyb3Vwcy9mb290ZXIgcm93cyBhZGRlZFxuICAgIC8vIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSB0ZW1wbGF0ZSB3aXRoIHRoaXMgZGF0YSB3aGljaCB3aWxsIGNyZWF0ZSBuZXcgcm93cyAoaGVhZGVyL2Zvb3RlcilcbiAgICB0aGlzLnJlc2V0SGVhZGVyUm93RGVmcygpO1xuICAgIHRoaXMucmVzZXRGb290ZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG5cbiAgICAvKiAgTm93IHdlIHdpbGwgZm9yY2UgY2xlYXJpbmcgYWxsIGRhdGEgcm93cyBhbmQgY3JlYXRpbmcgdGhlbSBiYWNrIGFnYWluIGlmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCB0aW1lIHdlIGludmFsaWRhdGUgdGhlIGNvbHVtbnMuLi5cblxuICAgICAgICBXaHk/IGZpcnN0LCBzb21lIGJhY2tncm91bmQ6XG5cbiAgICAgICAgSW52YWxpZGF0aW5nIHRoZSBzdG9yZSB3aWxsIHJlc3VsdCBpbiBuZXcgYFBibENvbHVtbmAgaW5zdGFuY2VzIChjbG9uZWQgb3IgY29tcGxldGVseSBuZXcpIGhlbGQgaW5zaWRlIGEgbmV3IGFycmF5IChhbGwgYXJyYXlzIGluIHRoZSBzdG9yZSBhcmUgcmUtY3JlYXRlZCBvbiBpbnZhbGlkYXRlKVxuICAgICAgICBOZXcgYXJyYXkgYW5kIG5ldyBpbnN0YW5jZXMgd2lsbCBhbHNvIHJlc3VsdCBpbiBuZXcgZGlyZWN0aXZlIGluc3RhbmNlcyBvZiBgUGJsTmdyaWRDb2x1bW5EZWZgIGZvciBldmVyeSBjb2x1bW4uXG5cbiAgICAgICAgRWFjaCBkYXRhIHJvdyBoYXMgZGF0YSBjZWxscyB3aXRoIHRoZSBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCBkaXJlY3RpdmUgKGBwYmwtbmdyaWQtY2VsbGApLlxuICAgICAgICBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCBoYXMgYSByZWZlcmVuY2UgdG8gYFBibE5ncmlkQ29sdW1uRGVmYCB0aHJvdWdoIGRlcGVuZGVuY3kgaW5qZWN0aW9uLCBpLmUuIGl0IHdpbGwgbm90IHVwZGF0ZSB0aHJvdWdoIGNoYW5nZSBkZXRlY3Rpb24hXG5cbiAgICAgICAgTm93LCB0aGUgcHJvYmxlbTpcbiAgICAgICAgVGhlIGBDZGtUYWJsZWAgd2lsbCBjYWNoZSByb3dzIGFuZCB0aGVpciBjZWxscywgcmV1c2luZyB0aGVtIGZvciBwZXJmb3JtYW5jZS5cbiAgICAgICAgVGhpcyBtZWFucyB0aGF0IHRoZSBgUGJsTmdyaWRDb2x1bW5EZWZgIGluc3RhbmNlIGluc2lkZSBlYWNoIGNlbGwgd2lsbCBub3QgY2hhbmdlLlxuICAgICAgICBTbywgY3JlYXRpbmcgbmV3IGNvbHVtbnMgYW5kIGNvbHVtbkRlZnMgd2lsbCByZXN1bHQgaW4gc3RhbGUgY2VsbHMgd2l0aCByZWZlcmVuY2UgdG8gZGVhZCBpbnN0YW5jZXMgb2YgYFBibENvbHVtbmAgYW5kIGBQYmxOZ3JpZENvbHVtbkRlZmAuXG5cbiAgICAgICAgT25lIHNvbHV0aW9uIGlzIHRvIHJlZmFjdG9yIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgIHRvIGdldCB0aGUgYFBibE5ncmlkQ29sdW1uRGVmYCB0aHJvdWdoIGRhdGEgYmluZGluZy5cbiAgICAgICAgV2hpbGUgdGhpcyB3aWxsIHdvcmsgaXQgd2lsbCBwdXQgbW9yZSB3b3JrIG9uIGVhY2ggY2VsbCB3aGlsZSBkb2luZyBDRCBhbmQgd2lsbCByZXF1aXJlIGNvbXBsZXggbG9naWMgdG8gaGFuZGxlIGVhY2ggY2hhbmdlIGJlY2F1c2UgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWBcbiAgICAgICAgYWxzbyBjcmVhdGUgYSBjb250ZXh0IHdoaWNoIGhhcyByZWZlcmVuY2UgdG8gYSBjb2x1bW4gdGh1cyBhIG5ldyBjb250ZXh0IGlzIHJlcXVpcmVkLlxuICAgICAgICBLZWVwaW5nIHRyYWNrIGZvciBhbGwgcmVmZXJlbmNlcyB3aWxsIGJlIGRpZmZpY3VsdCBhbmQgYnVncyBhcmUgbGlrZWx5IHRvIG9jY3VyLCB3aGljaCBhcmUgaGFyZCB0byB0cmFjay5cblxuICAgICAgICBUaGUgc2ltcGxlc3Qgc29sdXRpb24gaXMgdG8gZm9yY2UgdGhlIHRhYmxlIHRvIHJlbmRlciBhbGwgZGF0YSByb3dzIGZyb20gc2NyYXRjaCB3aGljaCB3aWxsIGRlc3Ryb3kgdGhlIGNhY2hlIGFuZCBhbGwgY2VsbCdzIHdpdGggaXQsIGNyZWF0aW5nIG5ldyBvbmUncyB3aXRoIHByb3BlciByZWZlcmVuY2UuXG5cbiAgICAgICAgVGhlIHNpbXBsZSBzb2x1dGlvbiBpcyBjdXJyZW50bHkgcHJlZmVycmVkIGJlY2F1c2U6XG5cbiAgICAgICAgLSBJdCBpcyBlYXNpZXIgdG8gaW1wbGVtZW50LlxuICAgICAgICAtIEl0IGlzIGVhc2llciB0byBhc3Nlc3MgdGhlIGltcGFjdC5cbiAgICAgICAgLSBJdCBlZmZlY3RzIGEgc2luZ2xlIG9wZXJhdGlvbiAoY2hhbmdpbmcgdG8gcmVzZXR0aW5nIGNvbHVtbnMpIHRoYXQgcmFyZWx5IGhhcHBlblxuXG4gICAgICAgIFRoZSBvbmx5IGlzc3VlIGlzIHdpdGggdGhlIGBDZGtUYWJsZWAgZW5jYXBzdWxhdGluZyB0aGUgbWV0aG9kIGBfZm9yY2VSZW5kZXJEYXRhUm93cygpYCB3aGljaCBpcyB3aGF0IHdlIG5lZWQuXG4gICAgICAgIFRoZSB3b3JrYXJvdW5kIGlzIHRvIGFzc2lnbiBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCB3aXRoIHRoZSBzYW1lIHZhbHVlIGl0IGFscmVhZHkgaGFzLCB3aGljaCB3aWxsIGNhdXNlIGBfZm9yY2VSZW5kZXJEYXRhUm93c2AgdG8gZmlyZS5cbiAgICAgICAgYG11bHRpVGVtcGxhdGVEYXRhUm93c2AgaXMgYSBnZXR0ZXIgdGhhdCB0cmlnZ2VycyBgX2ZvcmNlUmVuZGVyRGF0YVJvd3NgIHdpdGhvdXQgY2hlY2tpbmcgdGhlIHZhbHVlIGNoYW5nZWQsIHBlcmZlY3QgZml0LlxuICAgICAgICBUaGVyZSBpcyBhIHJpc2sgd2l0aCBgbXVsdGlUZW1wbGF0ZURhdGFSb3dzYCBiZWluZyBjaGFuZ2VkLi4uXG4gICAgICovXG4gICAgaWYgKHJlYnVpbGRSb3dzKSB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3MgPSB0aGlzLl9jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gICAgfVxuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25JbnZhbGlkYXRlSGVhZGVycycgfSk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29sdW1uIHNpemVzIGZvciBhbGwgY29sdW1ucyBpbiB0aGUgdGFibGUgYmFzZWQgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9uIG1ldGFkYXRhIGZvciBlYWNoIGNvbHVtbi5cbiAgICogVGhlIGZpbmFsIHdpZHRoIHJlcHJlc2VudCBhIHN0YXRpYyB3aWR0aCwgaXQgaXMgdGhlIHZhbHVlIGFzIHNldCBpbiB0aGUgZGVmaW5pdGlvbiAoZXhjZXB0IGNvbHVtbiB3aXRob3V0IHdpZHRoLCB3aGVyZSB0aGUgY2FsY3VsYXRlZCBnbG9iYWwgd2lkdGggaXMgc2V0KS5cbiAgICovXG4gIHJlc2V0Q29sdW1uc1dpZHRoKCk6IHZvaWQge1xuICAgIHJlc2V0Q29sdW1uV2lkdGhzKHRoaXMuX3N0b3JlLmdldFN0YXRpY1dpZHRoKCksIHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNpemUgb2YgYWxsIGdyb3VwIGNvbHVtbnMgaW4gdGhlIHRhYmxlIGJhc2VkIG9uIHRoZSBzaXplIG9mIHRoZWlyIHZpc2libGUgY2hpbGRyZW4gKG5vdCBoaWRkZW4pLlxuICAgKiBAcGFyYW0gZHluYW1pY1dpZHRoTG9naWMgLSBPcHRpb25hbCBsb2dpYyBjb250YWluZXIsIGlmIG5vdCBzZXQgYSBuZXcgb25lIGlzIGNyZWF0ZWQuXG4gICAqL1xuICBzeW5jQ29sdW1uR3JvdXBzU2l6ZShkeW5hbWljV2lkdGhMb2dpYz86IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKTogdm9pZCB7XG4gICAgaWYgKCFkeW5hbWljV2lkdGhMb2dpYykge1xuICAgICAgZHluYW1pY1dpZHRoTG9naWMgPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIH1cblxuICAgIC8vIEZyb20gYWxsIG1ldGEgY29sdW1ucyAoaGVhZGVyL2Zvb3Rlci9oZWFkZXJHcm91cCkgd2UgZmlsdGVyIG9ubHkgYGhlYWRlckdyb3VwYCBjb2x1bW5zLlxuICAgIC8vIEZvciBlYWNoIHdlIGNhbGN1bGF0ZSBpdCdzIHdpZHRoIGZyb20gYWxsIG9mIHRoZSBjb2x1bW5zIHRoYXQgdGhlIGhlYWRlckdyb3VwIFwiZ3JvdXBzXCIuXG4gICAgLy8gV2UgdXNlIHRoZSBzYW1lIHN0cmF0ZWd5IGFuZCB0aGUgc2FtZSBSb3dXaWR0aER5bmFtaWNBZ2dyZWdhdG9yIGluc3RhbmNlIHdoaWNoIHdpbGwgcHJldmVudCBkdXBsaWNhdGUgY2FsY3VsYXRpb25zLlxuICAgIC8vIE5vdGUgdGhhdCB3ZSBtaWdodCBoYXZlIG11bHRpcGxlIGhlYWRlciBncm91cHMsIGkuZS4gc2FtZSBjb2x1bW5zIG9uIG11bHRpcGxlIGdyb3VwcyB3aXRoIGRpZmZlcmVudCByb3cgaW5kZXguXG4gICAgZm9yIChjb25zdCBnIG9mIHRoaXMuX3N0b3JlLmdldEFsbEhlYWRlckdyb3VwKCkpIHtcbiAgICAgIC8vIFdlIGdvIG92ZXIgYWxsIGNvbHVtbnMgYmVjYXVzZSBnLmNvbHVtbnMgZG9lcyBub3QgcmVwcmVzZW50IHRoZSBjdXJyZW50IG93bmVkIGNvbHVtbnMgb2YgdGhlIGdyb3VwXG4gICAgICAvLyBpdCBpcyBzdGF0aWMsIHJlcHJlc2VudGluZyB0aGUgaW5pdGlhbCBzdGF0ZS5cbiAgICAgIC8vIE9ubHkgY29sdW1ucyBob2xkIHRoZWlyIGdyb3VwIG93bmVycy5cbiAgICAgIC8vIFRPRE86IGZpbmQgd2F5IHRvIGltcHJvdmUgaXRlcmF0aW9uXG4gICAgICBjb25zdCBjb2xTaXplSW5mb3MgPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbHRlciggYyA9PiAhYy5oaWRkZW4gJiYgYy5pc0luR3JvdXAoZykpLm1hcCggYyA9PiBjLnNpemVJbmZvICk7XG4gICAgICBpZiAoY29sU2l6ZUluZm9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZ3JvdXBXaWR0aCA9IGR5bmFtaWNXaWR0aExvZ2ljLmFkZEdyb3VwKGNvbFNpemVJbmZvcyk7XG4gICAgICAgIGcubWluV2lkdGggPSBncm91cFdpZHRoO1xuICAgICAgICBnLnVwZGF0ZVdpZHRoKGAke2dyb3VwV2lkdGh9cHhgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGcubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYDBweGApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZUNvbHVtbnMoY29sdW1ucz86IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5zKSB7XG4gICAgICBjb2x1bW5zID0gdGhpcy5fc3RvcmUuY29sdW1ucztcbiAgICB9XG5cbiAgICAvLyBwcm90ZWN0IGZyb20gcGVyLW1hdHVyZSByZXNpemUuXG4gICAgLy8gV2lsbCBoYXBwZW4gb24gYWRkaXRpb25hbCBoZWFkZXIvaGVhZGVyLWdyb3VwIHJvd3MgQU5EIEFMU08gd2hlbiB2U2Nyb2xsTm9uZSBpcyBzZXRcbiAgICAvLyBUaGlzIHdpbGwgY2F1c2Ugc2l6ZSBub3QgdG8gcG9wdWxhdGUgYmVjYXVzZSBpdCB0YWtlcyB0aW1lIHRvIHJlbmRlciB0aGUgcm93cywgc2luY2UgaXQncyBub3QgdmlydHVhbCBhbmQgaGFwcGVucyBpbW1lZGlhdGVseS5cbiAgICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIHByb3RlY3Rpb24uXG4gICAgaWYgKCFjb2x1bW5zWzBdLnNpemVJbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gc3RvcmVzIGFuZCBjYWxjdWxhdGVzIHdpZHRoIGZvciBjb2x1bW5zIGFkZGVkIHRvIGl0LiBBZ2dyZWdhdGUncyB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGFkZGVkIGNvbHVtbnMuXG4gICAgY29uc3Qgcm93V2lkdGggPSB0aGlzLl9leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIHRoaXMuc3luY0NvbHVtbkdyb3Vwc1NpemUocm93V2lkdGgpO1xuXG4gICAgLy8gaWYgdGhpcyBpcyBhIHRhYmxlIHdpdGhvdXQgZ3JvdXBzXG4gICAgaWYgKHJvd1dpZHRoLm1pbmltdW1Sb3dXaWR0aCA9PT0gMCkge1xuICAgICAgcm93V2lkdGguYWRkR3JvdXAoY29sdW1ucy5tYXAoIGMgPT4gYy5zaXplSW5mbyApKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgbWF4IGxvY2sgc3RhdGUgaGFzIGNoYW5nZWQgd2UgbmVlZCB0byB1cGRhdGUgcmUtY2FsY3VsYXRlIHRoZSBzdGF0aWMgd2lkdGgncyBhZ2Fpbi5cbiAgICBpZiAocm93V2lkdGgubWF4V2lkdGhMb2NrQ2hhbmdlZCkge1xuICAgICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5fc3RvcmUuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5fc3RvcmUuY29sdW1ucywgdGhpcy5fc3RvcmUubWV0YUNvbHVtbnMpO1xuICAgICAgdGhpcy5yZXNpemVDb2x1bW5zKGNvbHVtbnMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fbWluaW11bVJvd1dpZHRoICkge1xuICAgICAgLy8gV2UgY2FsY3VsYXRlIHRoZSB0b3RhbCBtaW5pbXVtIHdpZHRoIG9mIHRoZSB0YWJsZVxuICAgICAgLy8gV2UgZG8gaXQgb25jZSwgdG8gc2V0IHRoZSBtaW5pbXVtIHdpZHRoIGJhc2VkIG9uIHRoZSBpbml0aWFsIHNldHVwLlxuICAgICAgLy8gTm90ZSB0aGF0IHdlIGRvbid0IGFwcGx5IHN0cmF0ZWd5IGhlcmUsIHdlIHdhbnQgdGhlIGVudGlyZSBsZW5ndGggb2YgdGhlIHRhYmxlIVxuICAgICAgdGhpcy5fY2RrVGFibGUubWluV2lkdGggPSByb3dXaWR0aC5taW5pbXVtUm93V2lkdGg7XG4gICAgfVxuXG4gICAgdGhpcy5uZ1pvbmUucnVuKCAoKSA9PiB7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJyk7XG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uUmVzaXplUm93JyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZW1iZWRkZWQgdmlldyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIHVzZXIgcHJvamVjdGVkIGNvbnRlbnQuXG4gICAqL1xuICBjcmVhdGVWaWV3PEM+KGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcsIHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxDPiwgY29udGV4dD86IEMsIGluZGV4PzogbnVtYmVyKTogRW1iZWRkZWRWaWV3UmVmPEM+IHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbik7XG4gICAgY29uc3QgdmlldyA9IHZjUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZVJlZiwgY29udGV4dCwgaW5kZXgpO1xuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBhbHJlYWR5IGNyZWF0ZWQgZW1iZWRkZWQgdmlldy5cbiAgICogQHBhcmFtIHZpZXcgLSBUaGUgdmlldyB0byByZW1vdmVcbiAgICogQHBhcmFtIGxvY2F0aW9uIC0gVGhlIGxvY2F0aW9uLCBpZiBub3Qgc2V0IGRlZmF1bHRzIHRvIGBiZWZvcmVgXG4gICAqIEByZXR1cm5zIHRydWUgd2hlbiBhIHZpZXcgd2FzIHJlbW92ZWQsIGZhbHNlIHdoZW4gbm90LiAoZGlkIG5vdCBleGlzdCBpbiB0aGUgdmlldyBjb250YWluZXIgZm9yIHRoZSBwcm92aWRlZCBsb2NhdGlvbilcbiAgICovXG4gIHJlbW92ZVZpZXcodmlldzogRW1iZWRkZWRWaWV3UmVmPGFueT4sIGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBib29sZWFuIHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbik7XG4gICAgY29uc3QgaWR4ID0gdmNSZWYuaW5kZXhPZih2aWV3KTtcbiAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2Y1JlZi5yZW1vdmUoaWR4KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgYWxsIHZpc2libGUgY29sdW1ucyB0byBmaXQgY29udGVudCBvZiB0aGUgdGFibGUuXG4gICAqIEBwYXJhbSBmb3JjZUZpeGVkV2lkdGggLSBXaGVuIHRydWUgd2lsbCByZXNpemUgYWxsIGNvbHVtbnMgd2l0aCBhYnNvbHV0ZSBwaXhlbCB2YWx1ZXMsIG90aGVyd2lzZSB3aWxsIGtlZXAgdGhlIHNhbWUgZm9ybWF0IGFzIG9yaWdpbmFsbHkgc2V0ICglIG9yIG5vbmUpXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtblRvRml0KG9wdGlvbnM/OiBBdXRvU2l6ZVRvRml0T3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IHsgaW5uZXJXaWR0aCwgb3V0ZXJXaWR0aCB9ID0gdGhpcy52aWV3cG9ydDtcblxuICAgIC8vIGNhbGN1bGF0ZSBhdXRvLXNpemUgb24gdGhlIHdpZHRoIHdpdGhvdXQgc2Nyb2xsIGJhciBhbmQgdGFrZSBib3ggbW9kZWwgZ2FwcyBpbnRvIGFjY291bnRcbiAgICAvLyBUT0RPOiBpZiBubyBzY3JvbGwgYmFyIGV4aXN0cyB0aGUgY2FsYyB3aWxsIG5vdCBpbmNsdWRlIGl0LCBuZXh0IGlmIG1vcmUgcm93cyBhcmUgYWRkZWQgYSBzY3JvbGwgYmFyIHdpbGwgYXBwZWFyLi4uXG4gICAgdGhpcy5jb2x1bW5BcGkuYXV0b1NpemVUb0ZpdChvdXRlcldpZHRoIC0gKG91dGVyV2lkdGggLSBpbm5lcldpZHRoKSwgb3B0aW9ucyk7XG4gIH1cblxuICBmaW5kSW5pdGlhbFJvd0hlaWdodCgpOiBudW1iZXIge1xuICAgIGxldCByb3dFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBpZiAodGhpcy5fY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5nZXQoMCkgYXMgRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gICAgICByb3dFbGVtZW50ID0gdmlld1JlZi5yb290Tm9kZXNbMF07XG4gICAgICBjb25zdCBoZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHJvd0VsZW1lbnQpLmhlaWdodDtcbiAgICAgIHJldHVybiBwYXJzZUludChoZWlnaHQsIDEwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCkge1xuICAgICAgcm93RWxlbWVudCA9IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5sZW5ndGggPiAwXG4gICAgICAgID8gKHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5nZXQodGhpcy5fdmNSZWZCZWZvcmVDb250ZW50Lmxlbmd0aCAtIDEpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KS5yb290Tm9kZXNbMF1cbiAgICAgICAgOiB0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQuZWxlbWVudC5uYXRpdmVFbGVtZW50XG4gICAgICA7XG4gICAgICByb3dFbGVtZW50ID0gcm93RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICByb3dFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIGNvbnN0IGhlaWdodCA9IGdldENvbXB1dGVkU3R5bGUocm93RWxlbWVudCkuaGVpZ2h0O1xuICAgICAgcm93RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGhlaWdodCwgMTApO1xuICAgIH1cbiAgfVxuXG4gIGFkZENsYXNzKC4uLmNsczogc3RyaW5nW10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2xzKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVDbGFzcyguLi5jbHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjIG9mIGNscykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpbml0UGx1Z2lucyhpbmplY3RvcjogSW5qZWN0b3IsIGVsUmVmOiBFbGVtZW50UmVmPGFueT4sIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGFuIGluamVjdG9yIGZvciB0aGUgZXh0ZW5zaW9ucy9wbHVnaW5zXG4gICAgLy8gVGhpcyBpbmplY3RvciBhbGxvdyBwbHVnaW5zICh0aGF0IGNob29zZSBzbykgdG8gcHJvdmlkZSBhIGZhY3RvcnkgZnVuY3Rpb24gZm9yIHJ1bnRpbWUgdXNlLlxuICAgIC8vIEkuRTogYXMgaWYgdGhleSB3ZSdyZSBjcmVhdGVkIGJ5IGFuZ3VsYXIgdmlhIHRlbXBsYXRlLi4uXG4gICAgLy8gVGhpcyBhbGxvd3Mgc2VhbWxlc3MgcGx1Z2luLXRvLXBsdWdpbiBkZXBlbmRlbmNpZXMgd2l0aG91dCByZXF1aXJpbmcgc3BlY2lmaWMgdGVtcGxhdGUgc3ludGF4LlxuICAgIC8vIEFuZCBhbHNvIGFsbG93cyBhdXRvIHBsdWdpbiBiaW5kaW5nIChhcHAgd2lkZSkgd2l0aG91dCB0aGUgbmVlZCBmb3IgdGVtcGxhdGUgc3ludGF4LlxuICAgIGNvbnN0IHBsdWdpbkluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFZpZXdDb250YWluZXJSZWYsIHVzZVZhbHVlOiB2Y1JlZiB9LFxuICAgICAgICB7IHByb3ZpZGU6IEVsZW1lbnRSZWYsIHVzZVZhbHVlOiBlbFJlZiB9LFxuICAgICAgICB7IHByb3ZpZGU6IENoYW5nZURldGVjdG9yUmVmLCB1c2VWYWx1ZTogdGhpcy5jZHIgfSxcbiAgICAgIF0sXG4gICAgICBwYXJlbnQ6IGluamVjdG9yLFxuICAgIH0pO1xuICAgIHRoaXMuX3BsdWdpbiA9IFBibE5ncmlkUGx1Z2luQ29udGV4dC5jcmVhdGUodGhpcywgcGx1Z2luSW5qZWN0b3IsIHRoaXMuX2V4dEFwaSk7XG4gICAgYmluZFRvRGF0YVNvdXJjZSh0aGlzLl9wbHVnaW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBsaXN0ZW5Ub1Jlc2l6ZSgpOiB2b2lkIHtcbiAgICBsZXQgcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyO1xuICAgIGNvbnN0IHJvJCA9IGZyb21FdmVudFBhdHRlcm48W1Jlc2l6ZU9ic2VydmVyRW50cnlbXSwgUmVzaXplT2JzZXJ2ZXJdPihcbiAgICAgIGhhbmRsZXIgPT4ge1xuICAgICAgICBpZiAoIXJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaGFuZGxlcik7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFuZGxlciA9PiB7XG4gICAgICAgIGlmIChyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBTa2lwIHRoZSBmaXJzdCBlbWlzc2lvblxuICAgIC8vIERlYm91bmNlIGFsbCByZXNpemVzIHVudGlsIHRoZSBuZXh0IGNvbXBsZXRlIGFuaW1hdGlvbiBmcmFtZSB3aXRob3V0IGEgcmVzaXplXG4gICAgLy8gZmluYWxseSBtYXBzIHRvIHRoZSBlbnRyaWVzIGNvbGxlY3Rpb25cbiAgICAvLyBTS0lQOiAgV2Ugc2hvdWxkIHNraXAgdGhlIGZpcnN0IGVtaXNzaW9uIChgc2tpcCgxKWApIGJlZm9yZSB3ZSBkZWJvdW5jZSwgc2luY2UgaXRzIGNhbGxlZCB1cG9uIGNhbGxpbmcgXCJvYnNlcnZlXCIgb24gdGhlIHJlc2l6ZU9ic2VydmVyLlxuICAgIC8vICAgICAgICBUaGUgcHJvYmxlbSBpcyB0aGF0IHNvbWUgdGFibGVzIG1pZ2h0IHJlcXVpcmUgdGhpcyBiZWNhdXNlIHRoZXkgZG8gY2hhbmdlIHNpemUuXG4gICAgLy8gICAgICAgIEFuIGV4YW1wbGUgaXMgYSB0YWJsZSBpbiBhIG1hdC10YWIgdGhhdCBpcyBoaWRkZW4sIHRoZSB0YWJsZSB3aWxsIGhpdCB0aGUgcmVzaXplIG9uZSB3aGVuIHdlIGZvY3VzIHRoZSB0YWJcbiAgICAvLyAgICAgICAgd2hpY2ggd2lsbCByZXF1aXJlIGEgcmVzaXplIGhhbmRsaW5nIGJlY2F1c2UgaXQncyBpbml0aWFsIHNpemUgaXMgMFxuICAgIC8vICAgICAgICBUbyB3b3JrYXJvdW5kIHRoaXMsIHdlIG9ubHkgc2tpcCBlbGVtZW50cyBub3QgeWV0IGFkZGVkIHRvIHRoZSBET00sIHdoaWNoIG1lYW5zIHRoZXkgd2lsbCBub3QgdHJpZ2dlciBhIHJlc2l6ZSBldmVudC5cbiAgICBsZXQgc2tpcFZhbHVlID0gZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQpID8gMSA6IDA7XG5cbiAgICBybyRcbiAgICAgIC5waXBlKFxuICAgICAgICBza2lwKHNraXBWYWx1ZSksXG4gICAgICAgIGRlYm91bmNlVGltZSgwLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciksXG4gICAgICAgIFVuUngodGhpcyksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCAoYXJnczogW1Jlc2l6ZU9ic2VydmVyRW50cnlbXSwgUmVzaXplT2JzZXJ2ZXJdKSA9PiB7XG4gICAgICAgIGlmIChza2lwVmFsdWUgPT09IDApIHtcbiAgICAgICAgICBza2lwVmFsdWUgPSAxO1xuICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSB0aGlzLl9zdG9yZS5jb2x1bW5zO1xuICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCggYyA9PiBjLnNpemVJbmZvLnVwZGF0ZVNpemUoKSApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub25SZXNpemUoYXJnc1swXSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25SZXNpemUoZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICB0aGlzLl92aWV3cG9ydC5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIH1cbiAgICAvLyB0aGlzLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRFeHRBcGkoKTogdm9pZCB7XG4gICAgbGV0IG9uSW5pdDogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcbiAgICBjb25zdCBleHRBcGkgPSB7XG4gICAgICB0YWJsZTogdGhpcyxcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCxcbiAgICAgIGdldCBjZGtUYWJsZSgpIHsgcmV0dXJuIGV4dEFwaS50YWJsZS5fY2RrVGFibGU7IH0sXG4gICAgICBnZXQgZXZlbnRzKCkgeyByZXR1cm4gZXh0QXBpLnRhYmxlLl9wbHVnaW4uZXZlbnRzIH0sXG4gICAgICBnZXQgY29udGV4dEFwaSgpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb250ZXh0QXBpJywgeyB2YWx1ZTogbmV3IENvbnRleHRBcGk8VD4oZXh0QXBpKSB9KTtcbiAgICAgICAgcmV0dXJuIGV4dEFwaS5jb250ZXh0QXBpO1xuICAgICAgfSxcbiAgICAgIGdldCBtZXRhUm93U2VydmljZSgpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXRhUm93U2VydmljZScsIHsgdmFsdWU6IG5ldyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlPFQ+KGV4dEFwaSkgfSk7XG4gICAgICAgIHJldHVybiBleHRBcGkubWV0YVJvd1NlcnZpY2U7XG4gICAgICB9LFxuICAgICAgb25Jbml0OiAoZm46ICgpID0+IHZvaWQpID0+IHtcbiAgICAgICAgaWYgKGV4dEFwaS50YWJsZS5pc0luaXQpIHtcbiAgICAgICAgICBmbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChvbkluaXQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgdSA9IGV4dEFwaS5ldmVudHMuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9uSW5pdEZuIG9mIG9uSW5pdCkge1xuICAgICAgICAgICAgICAgICAgb25Jbml0Rm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdS51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIG9uSW5pdCA9IHUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbkluaXQucHVzaChmbik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb2x1bW5TdG9yZTogdGhpcy5fc3RvcmUsXG4gICAgICBzZXRWaWV3cG9ydDogKHZpZXdwb3J0KSA9PiB0aGlzLl92aWV3cG9ydCA9IHZpZXdwb3J0LFxuICAgICAgZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeTogKCk6IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBEeW5hbWljQ29sdW1uV2lkdGhMb2dpYyhEWU5BTUlDX1BBRERJTkdfQk9YX01PREVMX1NQQUNFX1NUUkFURUdZKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMuX2V4dEFwaSA9IGV4dEFwaTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBOb0RhdGEoZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZikge1xuICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKGZvcmNlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5vRGF0YSA9IHRoaXMuX2RhdGFTb3VyY2UgJiYgdGhpcy5fZGF0YVNvdXJjZS5yZW5kZXJMZW5ndGggPT09IDA7XG4gICAgaWYgKG5vRGF0YSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1lbXB0eScpO1xuICAgIH1cblxuICAgIGlmIChub0RhdGEgfHwgZm9yY2UgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IG5vRGF0YVRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRTaW5nbGUoJ25vRGF0YScpO1xuICAgICAgaWYgKG5vRGF0YVRlbXBsYXRlKSB7XG4gICAgICAgIHRoaXMuX25vRGF0ZUVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIG5vRGF0YVRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0sIDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0SW50ZXJuYWxWY1JlZihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogVmlld0NvbnRhaW5lclJlZiB7XG4gICAgcmV0dXJuIGxvY2F0aW9uID09PSAnYmVmb3JlVGFibGUnXG4gICAgICA/IHRoaXMuX3ZjUmVmQmVmb3JlVGFibGVcbiAgICAgIDogbG9jYXRpb24gPT09ICdiZWZvcmVDb250ZW50JyA/IHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudCA6IHRoaXMuX3ZjUmVmQWZ0ZXJDb250ZW50XG4gICAgO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cFBhZ2luYXRvcigpOiB2b2lkIHtcbiAgICBjb25zdCBwYWdpbmF0aW9uS2lsbEtleSA9ICdwYmxQYWdpbmF0aW9uS2lsbEtleSc7XG4gICAgY29uc3QgdXNlUGFnaW5hdGlvbiA9IHRoaXMuZHMgJiYgdGhpcy51c2VQYWdpbmF0aW9uO1xuXG4gICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgIHRoaXMuZHMucGFnaW5hdGlvbiA9IHRoaXMuX3BhZ2luYXRpb247XG4gICAgICBpZiAodGhpcy5kcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgdGhpcy5kcy5wYWdpbmF0b3Iubm9DYWNoZU1vZGUgPSB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5pdCkge1xuICAgICAgVW5SeC5raWxsKHRoaXMsIHBhZ2luYXRpb25LaWxsS2V5KTtcbiAgICAgIGlmICh0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVWaWV3KHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiwgJ2JlZm9yZUNvbnRlbnQnKTtcbiAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKHVzZVBhZ2luYXRpb24pIHtcbiAgICAgICAgY29uc3QgcGFnaW5hdG9yVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgncGFnaW5hdG9yJyk7XG4gICAgICAgIGlmIChwYWdpbmF0b3JUZW1wbGF0ZSkge1xuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZiA9IHRoaXMuY3JlYXRlVmlldygnYmVmb3JlQ29udGVudCcsIHBhZ2luYXRvclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY29sIG9mIHRoaXMuX3N0b3JlLmNvbHVtbnMpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wsICd0YWJsZUNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggY2VsbCApIHtcbiAgICAgICAgY29sLmNlbGxUcGwgPSBjZWxsLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkZWZhdWx0Q2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ3RhYmxlQ2VsbCcpO1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGRlZmF1bHRDZWxsVGVtcGxhdGUgPyBkZWZhdWx0Q2VsbFRlbXBsYXRlLnRSZWYgOiB0aGlzLl9mYlRhYmxlQ2VsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWRpdG9yQ2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ2VkaXRvckNlbGwnLCB0cnVlKTtcbiAgICAgIGlmICggZWRpdG9yQ2VsbCApIHtcbiAgICAgICAgY29sLmVkaXRvclRwbCA9IGVkaXRvckNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZWRpdG9yQ2VsbCcpO1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUhlYWRlckNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgY29uc3QgY29sdW1uczogQXJyYXk8UGJsQ29sdW1uIHwgUGJsTWV0YUNvbHVtblN0b3JlPiA9IFtdLmNvbmNhdCh0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucyk7XG4gICAgY29uc3QgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdoZWFkZXJDZWxsJykgfHwgeyB0UmVmOiB0aGlzLl9mYkhlYWRlckNlbGwgfTtcbiAgICBjb25zdCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2Zvb3RlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiRm9vdGVyQ2VsbCB9O1xuICAgIGZvciAoY29uc3QgY29sIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChpc1BibENvbHVtbihjb2wpKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZjxUPih0aGlzLnJlZ2lzdHJ5LCBjb2wsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgY29uc3QgZm9vdGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmPFQ+KHRoaXMucmVnaXN0cnksIGNvbCwgJ2Zvb3RlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICBjb2wuaGVhZGVyQ2VsbFRwbCA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgY29sLmZvb3RlckNlbGxUcGwgPSBmb290ZXJDZWxsRGVmLnRSZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29sLmhlYWRlcikge1xuICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuaGVhZGVyLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmhlYWRlci50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmhlYWRlckdyb3VwKSB7XG4gICAgICAgICAgY29uc3QgaGVhZGVyQ2VsbERlZiA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbC5oZWFkZXJHcm91cCwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICAgIGNvbC5oZWFkZXJHcm91cC50ZW1wbGF0ZSA9IGhlYWRlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sLmZvb3Rlcikge1xuICAgICAgICAgIGNvbnN0IGZvb3RlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuZm9vdGVyLCAnZm9vdGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgICAgY29sLmZvb3Rlci50ZW1wbGF0ZSA9IGZvb3RlckNlbGxEZWYudFJlZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRIZWFkZXJSb3dEZWZzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oZWFkZXJSb3dEZWZzKSB7XG4gICAgICAvLyBUaGUgdGFibGUgaGVhZGVyIChtYWluLCB3aXRoIGNvbHVtbiBuYW1lcykgaXMgYWx3YXlzIHRoZSBsYXN0IHJvdyBkZWYgKGluZGV4IDApXG4gICAgICAvLyBCZWNhdXNlIHdlIHdhbnQgaXQgdG8gc2hvdyBsYXN0IChhZnRlciBjdXN0b20gaGVhZGVycywgZ3JvdXAgaGVhZGVycy4uLikgd2UgZmlyc3QgbmVlZCB0byBwdWxsIGl0IGFuZCB0aGVuIHB1c2guXG5cbiAgICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFySGVhZGVyUm93RGVmcygpO1xuICAgICAgY29uc3QgYXJyID0gdGhpcy5faGVhZGVyUm93RGVmcy50b0FycmF5KCk7XG4gICAgICBhcnIucHVzaChhcnIuc2hpZnQoKSk7XG5cbiAgICAgIGZvciAoY29uc3Qgcm93RGVmIG9mIGFycikge1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5hZGRIZWFkZXJSb3dEZWYocm93RGVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0Rm9vdGVyUm93RGVmcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9vdGVyUm93RGVmcykge1xuICAgICAgdGhpcy5fY2RrVGFibGUuY2xlYXJGb290ZXJSb3dEZWZzKCk7XG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiB0aGlzLl9mb290ZXJSb3dEZWZzLnRvQXJyYXkoKSkge1xuICAgICAgICB0aGlzLl9jZGtUYWJsZS5hZGRGb290ZXJSb3dEZWYocm93RGVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==