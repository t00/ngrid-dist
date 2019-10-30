/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import ResizeObserver from 'resize-observer-polyfill';
import { asapScheduler, animationFrameScheduler, fromEventPattern } from 'rxjs';
import { filter, take, tap, observeOn, switchMap, map, mapTo, startWith, pairwise, debounceTime, skip } from 'rxjs/operators';
import { Component, ElementRef, Input, Injector, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList, ViewEncapsulation, ChangeDetectorRef, TemplateRef, ViewContainerRef, NgZone, isDevMode, forwardRef, IterableDiffers, Attribute, } from '@angular/core';
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
                    styles: ["pbl-ngrid{display:block}.pbl-ngrid-row-visually-hidden{border-top:0;border-bottom:0;clip:rect(0 0 0 0);height:0;min-height:0;max-height:0;overflow:hidden!important;visibility:collapse!important;outline:0;-webkit-appearance:none;-moz-appearance:none}.pbl-ngrid-row-hidden{display:none!important}.pbl-ngrid-container{position:relative;height:100%;width:100%;flex-direction:column;box-sizing:border-box;display:flex;overflow:auto;min-height:inherit}.pbl-ngrid-scroll-container{flex:1 1 auto;box-sizing:border-box;min-height:auto}.pbl-ngrid-scroll-container.cdk-virtual-scroll-disabled{flex:1 0 auto}.pbl-ngrid-sticky-row-scroll-container{position:fixed;overflow:hidden}.pbl-ngrid-empty-spacer{display:none}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper{min-height:100%;display:flex;flex-direction:column}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table{display:flex;flex-direction:column;flex:1 1 100%}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>*{flex:0 0 auto}.pbl-ngrid-empty .cdk-virtual-scroll-content-wrapper .pbl-cdk-table>.pbl-ngrid-empty-spacer{display:block;flex:1 1 auto}.pbl-ngrid-scrolling pbl-cdk-table{pointer-events:none}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsYUFBYSxFQUFFLHVCQUF1QixFQUFFLGdCQUFnQixFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUgsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUNMLFFBQVEsRUFDUix1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBRVQsaUJBQWlCLEVBSWpCLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsZ0JBQWdCLEVBRWhCLE1BQU0sRUFDTixTQUFTLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBMkIsU0FBUyxHQUMzRSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sc0JBQXNCLENBQUM7QUFDM0UsT0FBTyxFQUFFLHdCQUF3QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEYsT0FBTyxFQUFzRSxhQUFhLEVBQWdCLFFBQVEsRUFB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cjlCWSxpQkFBaUI7OztJQVU1Qix3Q0FBcUI7O0lBVXJCLHdDQUFxQjs7SUFTckIsc0NBQW1COzs7Ozs7Ozs7SUFTbkIsc0NBQXFFOzs7OztJQVFyRSwyQ0FBK0I7Ozs7O0lBcUUvQixvQ0FBa0U7O0lBb0NsRSwyQ0FBMkk7O0lBQzNJLCtDQUFvRTs7SUFFcEUscUNBQXNCOztJQUN0QixzQ0FBdUI7Ozs7O0lBRXZCLCtDQUErQjs7Ozs7SUFDL0Isd0NBQXNDOztJQUV0Qyw4Q0FBd0c7O0lBQ3hHLGdEQUE0Rzs7SUFDNUcsK0NBQTBHOztJQUMxRyx5Q0FBaUg7O0lBQ2pILDBDQUF1SDs7SUFDdkgsMENBQXVIOztJQUN2SCx5Q0FBbUU7O0lBQ25FLDJDQUEwRTs7SUFDMUUsMkNBQTBFOzs7OztJQVExRSxtQ0FBeUI7O0lBQ3pCLHNDQUFpQzs7SUFLakMsc0NBQW1DOzs7OztJQUNuQyxtQ0FBc0Q7Ozs7O0lBQ3RELDhDQUFtQzs7Ozs7SUFDbkMseUNBQStCOzs7OztJQUMvQiwyQ0FBK0M7Ozs7O0lBQy9DLGdEQUFrRDs7Ozs7SUFDbEQsbURBQXFEOzs7OztJQUNyRCx3Q0FBbUQ7Ozs7O0lBQ25ELDhDQUFrQzs7Ozs7SUFDbEMsNkNBQWlDOzs7OztJQUNqQyxzQ0FBeUQ7Ozs7O0lBQ3pELG9DQUF1Qzs7Ozs7SUFDdkMsb0NBQXlDOzs7OztJQUc3QixrQ0FBc0M7Ozs7O0lBQ3RDLG9DQUFnQzs7Ozs7SUFDaEMsbUNBQXNCOzs7OztJQUN0QixnQ0FBOEI7Ozs7O0lBQzlCLG1DQUFxQzs7SUFDckMscUNBQXdDOztJQUN4QywrQkFBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcbmltcG9ydCB7IGFzYXBTY2hlZHVsZXIsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBmcm9tRXZlbnRQYXR0ZXJuIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UsIHRhcCwgb2JzZXJ2ZU9uLCBzd2l0Y2hNYXAsIG1hcCwgbWFwVG8sIHN0YXJ0V2l0aCwgcGFpcndpc2UsIGRlYm91bmNlVGltZSwgc2tpcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEluamVjdG9yLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG4gIFF1ZXJ5TGlzdCxcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgTmdab25lLFxuICBpc0Rldk1vZGUsIGZvcndhcmRSZWYsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIERvQ2hlY2ssIEF0dHJpYnV0ZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSwgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQ2RrSGVhZGVyUm93RGVmLCBDZGtGb290ZXJSb3dEZWYsIENka1Jvd0RlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkUGx1Z2luQ29udGV4dCB9IGZyb20gJy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfSBmcm9tICcuLi9wYWdpbmF0b3InO1xuaW1wb3J0IHsgRGF0YVNvdXJjZVByZWRpY2F0ZSwgRGF0YVNvdXJjZUZpbHRlclRva2VuLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxEYXRhU291cmNlLCBEYXRhU291cmNlT2YsIGNyZWF0ZURTIH0gZnJvbSAnLi4vZGF0YS1zb3VyY2UvaW5kZXgnO1xuaW1wb3J0IHsgUGJsQ2RrVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgcmVzZXRDb2x1bW5XaWR0aHMgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGZpbmRDZWxsRGVmIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NlbGwtZGVmJztcbmltcG9ydCB7IFBibENvbHVtbiwgUGJsQ29sdW1uU3RvcmUsIFBibE1ldGFDb2x1bW5TdG9yZSwgUGJsTmdyaWRDb2x1bW5TZXQsIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCB9IGZyb20gJy4vY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgQ29udGV4dEFwaSwgUGJsTmdyaWRDb250ZXh0QXBpLCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL3RhYmxlLXJlZ2lzdHJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jb25maWcnO1xuaW1wb3J0IHsgRHluYW1pY0NvbHVtbldpZHRoTG9naWMsIERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kgfSBmcm9tICcuL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyBDb2x1bW5BcGksIEF1dG9TaXplVG9GaXRPcHRpb25zIH0gZnJvbSAnLi9jb2x1bW4tYXBpJztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93cy9pbmRleCc7XG5cbmltcG9ydCB7IGJpbmRUb0RhdGFTb3VyY2UgfSBmcm9tICcuL2JpbmQtdG8tZGF0YXNvdXJjZSc7XG5pbXBvcnQgJy4vYmluZC10by1kYXRhc291cmNlJzsgLy8gTEVBVkUgVEhJUywgV0UgTkVFRCBJVCBTTyBUSEUgQVVHTUVOVEFUSU9OIElOIFRIRSBGSUxFIFdJTEwgTE9BRC5cblxuaW1wb3J0IHsgc2V0SWRlbnRpdHlQcm9wIH0gZnJvbSAnLi90YWJsZS5kZXByZWNhdGUtYXQtMS4wLjAnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxBcGlGYWN0b3J5KHRhYmxlOiB7IF9leHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpOyB9KSB7IHJldHVybiB0YWJsZS5fZXh0QXBpOyB9XG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luQ29udHJvbGxlckZhY3RvcnkodGFibGU6IHsgX3BsdWdpbjogUGJsTmdyaWRQbHVnaW5Db250ZXh0OyB9KSB7IHJldHVybiB0YWJsZS5fcGx1Z2luLmNvbnRyb2xsZXI7IH1cbmV4cG9ydCBmdW5jdGlvbiBtZXRhUm93U2VydmljZUZhY3RvcnkodGFibGU6IHsgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7IH0pIHsgcmV0dXJuIHRhYmxlLl9leHRBcGkubWV0YVJvd1NlcnZpY2U7IH1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL3RhYmxlLmNvbXBvbmVudC5zY3NzJyBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICB1c2VGYWN0b3J5OiBwbHVnaW5Db250cm9sbGVyRmFjdG9yeSxcbiAgICAgIGRlcHM6IFtmb3J3YXJkUmVmKCgpID0+IFBibE5ncmlkQ29tcG9uZW50KV0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBFWFRfQVBJX1RPS0VOLFxuICAgICAgdXNlRmFjdG9yeTogaW50ZXJuYWxBcGlGYWN0b3J5LFxuICAgICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gUGJsTmdyaWRDb21wb25lbnQpXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsXG4gICAgICB1c2VGYWN0b3J5OiBtZXRhUm93U2VydmljZUZhY3RvcnksXG4gICAgICBkZXBzOiBbZm9yd2FyZFJlZigoKSA9PiBQYmxOZ3JpZENvbXBvbmVudCldLFxuICAgIH1cbiAgXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29tcG9uZW50PFQgPSBhbnk+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQWZ0ZXJWaWV3SW5pdCwgRG9DaGVjaywgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBTaG93L0hpZGUgdGhlIGhlYWRlciByb3cuXG4gICAqIERlZmF1bHQ6IHRydWVcbiAgICovXG4gIEBJbnB1dCgpIGdldCBzaG93SGVhZGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2hvd0hlYWRlcjsgfTtcbiAgc2V0IHNob3dIZWFkZXIodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zaG93SGVhZGVyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBfc2hvd0hlYWRlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2hvdy9IaWRlIHRoZSBmb290ZXIgcm93LlxuICAgKiBEZWZhdWx0OiBmYWxzZVxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHNob3dGb290ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zaG93Rm9vdGVyOyB9O1xuICBzZXQgc2hvd0Zvb3Rlcih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Nob3dGb290ZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9zaG93Rm9vdGVyOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIHRoZSBmaWxsZXIgaXMgZGlzYWJsZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbm9GaWxsZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9ub0ZpbGxlcjsgfTtcbiAgc2V0IG5vRmlsbGVyKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fbm9GaWxsZXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIF9ub0ZpbGxlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogU2V0J3MgdGhlIGJlaGF2aW9yIG9mIHRoZSB0YWJsZSB3aGVuIHRhYmJpbmcuXG4gICAqIFRoZSBkZWZhdWx0IGJlaGF2aW9yIGlzIG5vbmUgKHJvd3MgYW5kIGNlbGxzIGFyZSBub3QgZm9jdXNhYmxlKVxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhlIGZvY3VzIG1vZGUgaGFzIGFuIGVmZmVjdCBvbiBvdGhlciBmdW5jdGlvbnMsIGZvciBleGFtcGxlIGEgZGV0YWlsIHJvdyB3aWxsIHRvZ2dsZSAob3Blbi9jbG9zZSkgdXNpbmdcbiAgICogRU5URVIgLyBTUEFDRSBvbmx5IHdoZW4gZm9jdXNNb2RlIGlzIHNldCB0byBgcm93YC5cbiAgICovXG4gIEBJbnB1dCgpIGZvY3VzTW9kZTogJ3JvdycgfCAnY2VsbCcgfCAnbm9uZScgfCAnJyB8IGZhbHNlIHwgdW5kZWZpbmVkO1xuXG4gIC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIGluIDEuMC4wXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBVc2UgYHBJbmRleGAgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9uLiAoUmVtb3ZlZCBpbiAxLjAuMClcbiAgICovXG4gIEBJbnB1dCgpIGdldCBpZGVudGl0eVByb3AoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX19pZGVudGl0eVByb3A7IH1cbiAgc2V0IGlkZW50aXR5UHJvcCh2YWx1ZTogc3RyaW5nKSB7IHRoaXMuX19pZGVudGl0eVByb3AgPSB2YWx1ZTsgc2V0SWRlbnRpdHlQcm9wKHRoaXMuX3N0b3JlLCB2YWx1ZSk7IH1cbiAgcHJpdmF0ZSBfX2lkZW50aXR5UHJvcDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdGFibGUncyBzb3VyY2Ugb2YgZGF0YVxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiBUaGUgdGFibGUncyBzb3VyY2Ugb2YgZGF0YSwgd2hpY2ggY2FuIGJlIHByb3ZpZGVkIGluIDIgd2F5czpcbiAgICpcbiAgICogLSBEYXRhU291cmNlT2Y8VD5cbiAgICogLSBQYmxEYXRhU291cmNlPFQ+XG4gICAqXG4gICAqIFRoZSB0YWJsZSBvbmx5IHdvcmtzIHdpdGggYFBibERhdGFTb3VyY2U8VD5gLCBgRGF0YVNvdXJjZU9mPFQ+YCBpcyBhIHNob3J0Y3V0IGZvciBwcm92aWRpbmdcbiAgICogdGhlIGRhdGEgYXJyYXkgZGlyZWN0bHkuXG4gICAqXG4gICAqIGBEYXRhU291cmNlT2Y8VD5gIGNhbiBiZTpcbiAgICpcbiAgICogLSBTaW1wbGUgZGF0YSBhcnJheSAoZWFjaCBvYmplY3QgcmVwcmVzZW50cyBvbmUgdGFibGUgcm93KVxuICAgKiAtIFByb21pc2UgZm9yIGEgZGF0YSBhcnJheVxuICAgKiAtIFN0cmVhbSB0aGF0IGVtaXRzIGEgZGF0YSBhcnJheSBlYWNoIHRpbWUgdGhlIGFycmF5IGNoYW5nZXNcbiAgICpcbiAgICogV2hlbiBhIGBEYXRhU291cmNlT2Y8VD5gIGlzIHByb3ZpZGVkIGl0IGlzIGNvbnZlcnRlZCBpbnRvIGFuIGluc3RhbmNlIG9mIGBQYmxEYXRhU291cmNlPFQ+YC5cbiAgICpcbiAgICogVG8gYWNjZXNzIHRoZSBgUGJsRGF0YVNvdXJjZTxUPmAgaW5zdGFuY2UgdXNlIHRoZSBgZHNgIHByb3BlcnR5IChyZWFkb25seSkuXG4gICAqXG4gICAqIEl0IGlzIGhpZ2hseSByZWNvbW1lbmRlZCB0byB1c2UgYFBibERhdGFTb3VyY2U8VD5gIGRpcmVjdGx5LCB0aGUgZGF0YXNvdXJjZSBmYWN0b3J5IG1ha2VzIGl0IGVhc3kuXG4gICAqIEZvciBleGFtcGxlLCB3aGVuIGFuIGFycmF5IGlzIHByb3ZpZGVkIHRoZSBmYWN0b3J5IGlzIHVzZWQgdG8gY29udmVydCBpdCB0byBhIGRhdGFzb3VyY2U6XG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgY29sbGVjdGlvbjogVFtdID0gW107XG4gICAqIGNvbnN0IHBibERhdGFTb3VyY2UgPSBjcmVhdGVEUzxUPigpLm9uVHJpZ2dlciggKCkgPT4gY29sbGVjdGlvbiApLmNyZWF0ZSgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogPiBUaGlzIGlzIGEgd3JpdGUtb25seSAoc2V0dGVyKSBwcm9wZXJ0eSB0aGF0IHRyaWdnZXJzIHRoZSBgc2V0RGF0YVNvdXJjZWAgbWV0aG9kLlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGRhdGFTb3VyY2UodmFsdWU6IFBibERhdGFTb3VyY2U8VD4gfCBEYXRhU291cmNlT2Y8VD4pIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBQYmxEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UodmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNldERhdGFTb3VyY2UoY3JlYXRlRFM8VD4oKS5vblRyaWdnZXIoICgpID0+IHZhbHVlIHx8IFtdICkuY3JlYXRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBkcygpOiBQYmxEYXRhU291cmNlPFQ+IHsgcmV0dXJuIHRoaXMuX2RhdGFTb3VyY2U7IH07XG5cbiAgQElucHV0KCkgZ2V0IHVzZVBhZ2luYXRpb24oKTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UgeyByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjsgfVxuICBzZXQgdXNlUGFnaW5hdGlvbih2YWx1ZTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UpIHtcbiAgICBpZiAoKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB2YWx1ZSA9ICdwYWdlTnVtYmVyJztcbiAgICB9XG4gICAgaWYgKCB2YWx1ZSAhPT0gdGhpcy5fcGFnaW5hdGlvbiApIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSB2YWx1ZTtcbiAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgbm9DYWNoZVBhZ2luYXRvcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7IH1cbiAgc2V0IG5vQ2FjaGVQYWdpbmF0b3IodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX25vQ2FjaGVQYWdpbmF0b3IgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9ub0NhY2hlUGFnaW5hdG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5kcyAmJiB0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGRlZmluaXRpb25zIGZvciB0aGlzIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KCkgY29sdW1uczogUGJsTmdyaWRDb2x1bW5TZXQgfCBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQ7XG5cbiAgQElucHV0KCkgc2V0IGhpZGVDb2x1bW5zKHZhbHVlOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuX2hpZGVDb2x1bW5zID0gdmFsdWU7XG4gICAgdGhpcy5faGlkZUNvbHVtbnNEaXJ0eSA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQSBmYWxsYmFjayBoZWlnaHQgZm9yIFwidGhlIGlubmVyIHNjcm9sbCBjb250YWluZXJcIi5cbiAgICogVGhlIGZhbGxiYWNrIGlzIHVzZWQgb25seSB3aGVuIGl0IExPV0VSIHRoYW4gdGhlIHJlbmRlcmVkIGhlaWdodCwgc28gbm8gZW1wdHkgZ2FwcyBhcmUgY3JlYXRlZCB3aGVuIHNldHRpbmcgdGhlIGZhbGxiYWNrLlxuICAgKlxuICAgKiBUaGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgdGhlIGFyZWEgaW4gd2hpY2ggYWxsIGRhdGEgcm93cyBhcmUgcmVuZGVyZWQgYW5kIGFsbCBtZXRhIChoZWFkZXIvZm9vdGVyKSByb3dzIHRoYXQgYXJlIG9mIHR5cGUgXCJyb3dcIiBvciBcInN0aWNreVwiLlxuICAgKiBUaGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaXMgZGVmaW5lZCB0byBjb25zdW1lIGFsbCB0aGUgaGVpZ2h0IGxlZnQgYWZ0ZXIgYWxsIGV4dGVybmFsIG9iamVjdHMgYXJlIHJlbmRlcmVkLlxuICAgKiBFeHRlcm5hbCBvYmplY3RzIGNhbiBiZSBmaXhlZCBtZXRhIHJvd3MgKGhlYWRlci9mb290ZXIpLCBwYWdpbmF0aW9uIHJvdywgYWN0aW9uIHJvdyBldGMuLi5cbiAgICpcbiAgICogSWYgdGhlIHRhYmxlIGRvZXMgbm90IGhhdmUgYSBoZWlnaHQgKCUgb3IgcHgpIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGFsd2F5cyBoYXZlIG5vIGhlaWdodCAoMCkuXG4gICAqIElmIHRoZSB0YWJsZSBoYXMgYSBoZWlnaHQsIHRoZSBcImlubmVyIHNjcm9sbCBjb250YWluZXJcIiB3aWxsIGdldCB0aGUgaGVpZ2h0IGxlZnQsIHdoaWNoIGNhbiBhbHNvIGJlIDAgaWYgdGhlcmUgYXJlIGEgbG90IG9mIGV4dGVybmFsIG9iamVjdHMuXG4gICAqXG4gICAqIFRvIHNvbHZlIHRoZSBuby1oZWlnaHQgcHJvYmxlbSB3ZSB1c2UgdGhlIGZhbGxiYWNrTWluSGVpZ2h0IHByb3BlcnR5LlxuICAgKlxuICAgKiBXaGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGRpc2FibGVkIGFuZCBmYWxsYmFja01pbkhlaWdodCBpcyBub3Qgc2V0IHRoZSB0YWJsZSB3aWxsIHNldCB0aGUgXCJpbm5lciBzY3JvbGwgY29udGFpbmVyXCIgaGVpZ2h0IHRvIHNob3cgYWxsIHJvd3MuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIHVzaW5nIGEgZml4ZWQgKHB4KSBoZWlnaHQgZm9yIHRoZSB0YWJsZSwgaWYgdGhlIGhlaWdodCBvZiBhbGwgZXh0ZXJuYWwgb2JqZWN0cyArIHRoZSBoZWlnaHQgb2YgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwiIGlzIGdyZWF0ZXIgdGhlblxuICAgKiB0aGUgdGFibGUncyBoZWlnaHQgYSB2ZXJ0aWNhbCBzY3JvbGwgYmFyIHdpbGwgc2hvdy5cbiAgICogSWYgdGhlIFwiaW5uZXIgc2Nyb2xsIGNvbnRhaW5lclwicyBoZWlnaHQgd2lsbCBiZSBsb3dlciB0aGVuIGl0J3MgcmVuZGVyZWQgY29udGVudCBoZWlnaHQgYW5kIGFkZGl0aW9uYWwgdmVydGljYWwgc2Nyb2xsIGJhciB3aWxsIGFwcGVhciwgd2hpY2ggaXMsIHVzdWFsbHksIG5vdCBnb29kLlxuICAgKlxuICAgKiBUbyBhdm9pZCB0aGlzLCBkb24ndCB1c2UgZmFsbGJhY2tNaW5IZWlnaHQgdG9nZXRoZXIgd2l0aCBhIGZpeGVkIGhlaWdodCBmb3IgdGhlIHRhYmxlLiBJbnN0ZWFkIHVzZSBmYWxsYmFja01pbkhlaWdodCB0b2dldGhlciB3aXRoIGEgbWluIGhlaWdodCBmb3IgdGhlIHRhYmxlLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGZhbGxiYWNrTWluSGVpZ2h0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9mYWxsYmFja01pbkhlaWdodDsgfVxuICBzZXQgZmFsbGJhY2tNaW5IZWlnaHQodmFsdWU6IG51bWJlcikge1xuICAgIHZhbHVlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9mYWxsYmFja01pbkhlaWdodCAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgcm93Q2xhc3NVcGRhdGU6IHVuZGVmaW5lZCB8ICggKGNvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPikgPT4gKCBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2xhc3M6IHN0cmluZ106IGFueSB9ICkpO1xuICBASW5wdXQoKSByb3dDbGFzc1VwZGF0ZUZyZXE6ICdpdGVtJyB8ICduZ0RvQ2hlY2snIHwgJ25vbmUnID0gJ2l0ZW0nO1xuXG4gIHJvd0ZvY3VzOiAwIHwgJycgPSAnJztcbiAgY2VsbEZvY3VzOiAwIHwgJycgPSAnJztcblxuICBwcml2YXRlIF9mYWxsYmFja01pbkhlaWdodCA9IDA7XG4gIHByaXZhdGUgX2RhdGFTb3VyY2U6IFBibERhdGFTb3VyY2U8VD47XG5cbiAgQFZpZXdDaGlsZCgnYmVmb3JlVGFibGUnLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBfdmNSZWZCZWZvcmVUYWJsZTogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnYmVmb3JlQ29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkJlZm9yZUNvbnRlbnQ6IFZpZXdDb250YWluZXJSZWY7XG4gIEBWaWV3Q2hpbGQoJ2FmdGVyQ29udGVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIF92Y1JlZkFmdGVyQ29udGVudDogVmlld0NvbnRhaW5lclJlZjtcbiAgQFZpZXdDaGlsZCgnZmJUYWJsZUNlbGwnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSkgX2ZiVGFibGVDZWxsOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZCgnZmJIZWFkZXJDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYkhlYWRlckNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZCgnZmJGb290ZXJDZWxsJywgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pIF9mYkZvb3RlckNlbGw6IFRlbXBsYXRlUmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+PjtcbiAgQFZpZXdDaGlsZChDZGtSb3dEZWYsIHsgc3RhdGljOiB0cnVlIH0pIF90YWJsZVJvd0RlZjogQ2RrUm93RGVmPFQ+O1xuICBAVmlld0NoaWxkcmVuKENka0hlYWRlclJvd0RlZikgX2hlYWRlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtIZWFkZXJSb3dEZWY+O1xuICBAVmlld0NoaWxkcmVuKENka0Zvb3RlclJvd0RlZikgX2Zvb3RlclJvd0RlZnM6IFF1ZXJ5TGlzdDxDZGtGb290ZXJSb3dEZWY+O1xuXG4gIGdldCBtZXRhQ29sdW1uSWRzKCk6IFBibENvbHVtblN0b3JlWydtZXRhQ29sdW1uSWRzJ10geyByZXR1cm4gdGhpcy5fc3RvcmUubWV0YUNvbHVtbklkczsgfVxuICBnZXQgbWV0YUNvbHVtbnMoKTogUGJsQ29sdW1uU3RvcmVbJ21ldGFDb2x1bW5zJ10geyByZXR1cm4gdGhpcy5fc3RvcmUubWV0YUNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtblJvd0RlZigpIHsgcmV0dXJuIHsgaGVhZGVyOiB0aGlzLl9zdG9yZS5oZWFkZXJDb2x1bW5EZWYsIGZvb3RlcjogdGhpcy5fc3RvcmUuZm9vdGVyQ29sdW1uRGVmIH07IH1cbiAgLyoqXG4gICAqIFRydWUgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkIChhZnRlciBBZnRlclZpZXdJbml0KVxuICAgKi9cbiAgcmVhZG9ubHkgaXNJbml0OiBib29sZWFuO1xuICByZWFkb25seSBjb2x1bW5BcGk6IENvbHVtbkFwaTxUPjtcbiAgZ2V0IGNvbnRleHRBcGkoKTogUGJsTmdyaWRDb250ZXh0QXBpPFQ+IHsgcmV0dXJuIHRoaXMuX2V4dEFwaS5jb250ZXh0QXBpOyB9XG5cbiAgZ2V0IHZpZXdwb3J0KCk6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB8IHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLl92aWV3cG9ydDsgfVxuXG4gIF9jZGtUYWJsZTogUGJsQ2RrVGFibGVDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgX3N0b3JlOiBQYmxDb2x1bW5TdG9yZSA9IG5ldyBQYmxDb2x1bW5TdG9yZSgpO1xuICBwcml2YXRlIF9oaWRlQ29sdW1uc0RpcnR5OiBib29sZWFuO1xuICBwcml2YXRlIF9oaWRlQ29sdW1uczogc3RyaW5nW107XG4gIHByaXZhdGUgX2NvbEhpZGVEaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZz47XG4gIHByaXZhdGUgX25vRGF0ZUVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3BhZ2luYXRvckVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlO1xuICBwcml2YXRlIF9ub0NhY2hlUGFnaW5hdG9yID0gZmFsc2U7XG4gIHByaXZhdGUgX21pbmltdW1Sb3dXaWR0aDogc3RyaW5nO1xuICBwcml2YXRlIF92aWV3cG9ydD86IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudDtcbiAgcHJpdmF0ZSBfcGx1Z2luOiBQYmxOZ3JpZFBsdWdpbkNvbnRleHQ7XG4gIHByaXZhdGUgX2V4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD47XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0b3I6IEluamVjdG9yLCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyByZWdpc3RyeTogUGJsTmdyaWRSZWdpc3RyeVNlcnZpY2UsXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ2lkJykgcHVibGljIHJlYWRvbmx5IGlkOiBzdHJpbmcpIHtcbiAgICBjb25zdCB0YWJsZUNvbmZpZyA9IGNvbmZpZy5nZXQoJ3RhYmxlJyk7XG4gICAgdGhpcy5zaG93SGVhZGVyID0gdGFibGVDb25maWcuc2hvd0hlYWRlcjtcbiAgICB0aGlzLnNob3dGb290ZXIgPSB0YWJsZUNvbmZpZy5zaG93Rm9vdGVyO1xuICAgIHRoaXMubm9GaWxsZXIgPSB0YWJsZUNvbmZpZy5ub0ZpbGxlcjtcblxuICAgIHRoaXMuaW5pdEV4dEFwaSgpO1xuICAgIHRoaXMuY29sdW1uQXBpID0gQ29sdW1uQXBpLmNyZWF0ZTxUPih0aGlzLCB0aGlzLl9zdG9yZSwgdGhpcy5fZXh0QXBpKTtcbiAgICB0aGlzLmluaXRQbHVnaW5zKGluamVjdG9yLCBlbFJlZiwgdmNSZWYpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9oaWRlQ29sdW1uc0RpcnR5KSB7XG4gICAgICB0aGlzLl9oaWRlQ29sdW1uc0RpcnR5ID0gZmFsc2U7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2hpZGVDb2x1bW5zO1xuICAgICAgaWYgKCF0aGlzLl9jb2xIaWRlRGlmZmVyICYmIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHRoaXMuZGlmZmVycy5maW5kKHZhbHVlKS5jcmVhdGUoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgYSBkaWZmZXIgc3VwcG9ydGluZyBvYmplY3QgJyR7dmFsdWV9LiBoaWRlQ29sdW1ucyBvbmx5IHN1cHBvcnRzIGJpbmRpbmcgdG8gSXRlcmFibGVzIHN1Y2ggYXMgQXJyYXlzLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl9jb2xIaWRlRGlmZmVyKSB7XG4gICAgICBjb25zdCBoaWRlQ29sdW1ucyA9IHRoaXMuX2hpZGVDb2x1bW5zIHx8IFtdO1xuICAgICAgY29uc3QgY2hhbmdlcyA9IHRoaXMuX2NvbEhpZGVEaWZmZXIuZGlmZihoaWRlQ29sdW1ucyk7XG4gICAgICBpZiAoY2hhbmdlcykge1xuICAgICAgICB0aGlzLl9zdG9yZS5oaWRkZW4gPSBoaWRlQ29sdW1ucztcbiAgICAgICAgdGhpcy5fbWluaW11bVJvd1dpZHRoID0gJyc7XG5cbiAgICAgICAgLy8gVE9ETyhzaGxvbWlhc3NhZikgW3BlcmYsIDRdOiBSaWdodCBub3cgd2UgYXR0YWNoIGFsbCBjb2x1bW5zLCB3ZSBjYW4gaW1wcm92ZSBpdCBieSBhdHRhY2hpbmcgb25seSB0aG9zZSBcImFkZGVkXCIgKHdlIGtub3cgdGhlbSBmcm9tIFwiY2hhbmdlc1wiKVxuICAgICAgICB0aGlzLmF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLnN5bmNSb3dzKCdoZWFkZXInKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5faGlkZUNvbHVtbnMpIHtcbiAgICAgICAgdGhpcy5fY29sSGlkZURpZmZlciA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgLy8gbm8gbmVlZCB0byB1bnN1YnNjcmliZSwgdGhlIHJlZyBzZXJ2aWNlIGlzIHBlciB0YWJsZSBpbnN0YW5jZSBhbmQgaXQgd2lsbCBkZXN0cm95IHdoZW4gdGhpcyB0YWJsZSBkZXN0cm95LlxuICAgIC8vIEFsc28sIGF0IHRoaXMgcG9pbnQgaW5pdGlhbCBjaGFuZ2VzIGZyb20gdGVtcGxhdGVzIHByb3ZpZGVkIGluIHRoZSBjb250ZW50IGFyZSBhbHJlYWR5IGluc2lkZSBzbyB0aGV5IHdpbGwgbm90IHRyaWdnZXJcbiAgICAvLyB0aGUgb3JkZXIgaGVyZSBpcyB2ZXJ5IGltcG9ydGFudCwgYmVjYXVzZSBjb21wb25lbnQgdG9wIG9mIHRoaXMgdGFibGUgd2lsbCBmaXJlIGxpZmUgY3ljbGUgaG9va3MgQUZURVIgdGhpcyBjb21wb25lbnRcbiAgICAvLyBzbyBpZiB3ZSBoYXZlIGEgdG9wIGxldmVsIGNvbXBvbmVudCByZWdpc3RlcmluZyBhIHRlbXBsYXRlIG9uIHRvcCBpdCB3aWxsIG5vdCBzaG93IHVubGVzcyB3ZSBsaXN0ZW4uXG4gICAgdGhpcy5yZWdpc3RyeS5jaGFuZ2VzLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICBsZXQgdGFibGVDZWxsID0gZmFsc2U7XG4gICAgICBsZXQgaGVhZGVyRm9vdGVyQ2VsbCA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICd0YWJsZUNlbGwnOlxuICAgICAgICAgICAgdGFibGVDZWxsID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlckNlbGwnOlxuICAgICAgICAgIGNhc2UgJ2Zvb3RlckNlbGwnOlxuICAgICAgICAgICAgaGVhZGVyRm9vdGVyQ2VsbCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdub0RhdGEnOlxuICAgICAgICAgICAgdGhpcy5zZXR1cE5vRGF0YSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGFnaW5hdG9yJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodGFibGVDZWxsKSB7XG4gICAgICAgIHRoaXMuYXR0YWNoQ3VzdG9tQ2VsbFRlbXBsYXRlcygpO1xuICAgICAgfVxuICAgICAgaWYgKGhlYWRlckZvb3RlckNlbGwpIHtcbiAgICAgICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpc0luaXQnLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25Jbml0JyB9KTtcblxuICAgIHRoaXMuc2V0dXBQYWdpbmF0b3IoKTtcblxuICAgIC8vIEFkZGluZyBhIGRpdiBiZWZvcmUgdGhlIGZvb3RlciByb3cgdmlldyByZWZlcmVuY2UsIHRoaXMgZGl2IHdpbGwgYmUgdXNlZCB0byBmaWxsIHVwIHRoZSBzcGFjZSBiZXR3ZWVuIGhlYWRlciAmIGZvb3RlciByb3dzXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ3BibC1uZ3JpZC1lbXB0eS1zcGFjZXInKVxuICAgIHRoaXMuX2Nka1RhYmxlLl9lbGVtZW50Lmluc2VydEJlZm9yZShkaXYsIHRoaXMuX2Nka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmxpc3RlblRvUmVzaXplKCk7XG5cbiAgICAvLyBUaGUgZm9sbG93aW5nIGNvZGUgd2lsbCBjYXRjaCBjb250ZXh0IGZvY3VzZWQgZXZlbnRzLCBmaW5kIHRoZSBIVE1MIGVsZW1lbnQgb2YgdGhlIGNlbGwgYW5kIGZvY3VzIGl0LlxuICAgIHRoaXMuY29udGV4dEFwaS5mb2N1c0NoYW5nZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmN1cnIpIHtcbiAgICAgICAgICBjb25zdCByb3dDb250ZXh0ID0gdGhpcy5jb250ZXh0QXBpLmZpbmRSb3dJblZpZXcoZXZlbnQuY3Vyci5yb3dJZGVudCk7XG4gICAgICAgICAgaWYgKHJvd0NvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KHJvd0NvbnRleHQuaW5kZXgpIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgICAgICAgaWYgKHZpZXcpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbFZpZXdJbmRleCA9IHRoaXMuY29sdW1uQXBpLnJlbmRlckluZGV4T2YodGhpcy5jb2x1bW5BcGkuY29sdW1uc1tldmVudC5jdXJyLmNvbEluZGV4XSlcbiAgICAgICAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSB2aWV3LnJvb3ROb2Rlc1swXS5xdWVyeVNlbGVjdG9yQWxsKCdwYmwtbmdyaWQtY2VsbCcpW2NlbGxWaWV3SW5kZXhdO1xuICAgICAgICAgICAgICBpZiAoY2VsbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjZWxsRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBsZXQgcHJvY2Vzc0NvbHVtbnMgPSBmYWxzZTtcblxuICAgIGlmIChjaGFuZ2VzLmZvY3VzTW9kZSkge1xuICAgICAgdGhpcy5yb3dGb2N1cyA9IHRoaXMuZm9jdXNNb2RlID09PSAncm93JyA/IDAgOiAnJztcbiAgICAgIHRoaXMuY2VsbEZvY3VzID0gdGhpcy5mb2N1c01vZGUgPT09ICdjZWxsJyA/IDAgOiAnJztcbiAgICB9XG5cbiAgICBpZiAoIGNoYW5nZXMuY29sdW1ucyAmJiB0aGlzLmlzSW5pdCApIHtcbiAgICAgIHByb2Nlc3NDb2x1bW5zID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIHByb2Nlc3NDb2x1bW5zID09PSB0cnVlICkge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlQ29sdW1ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9wbHVnaW4uZGVzdHJveSgpO1xuICAgICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICAgIHRoaXMuX2Nka1RhYmxlLmRldGFjaFZpZXdQb3J0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBwOiBQcm9taXNlPHZvaWQ+O1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnb25EZXN0cm95Jywgd2FpdDogKF9wOiBQcm9taXNlPHZvaWQ+KSA9PiBwID0gX3AgfSk7XG4gICAgaWYgKHApIHtcbiAgICAgIHAudGhlbihkZXN0cm95KS5jYXRjaChkZXN0cm95KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIHRyYWNrQnkoaW5kZXg6IG51bWJlciwgaXRlbTogVCk6IGFueSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IHNvcnQgZGVmaW5pdGlvbnMuXG4gICAqIFRoaXMgbWV0aG9kIGlzIGEgcHJveHkgdG8gYFBibERhdGFTb3VyY2Uuc2V0U29ydGAsIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRTb3J0YFxuICAgKlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBzb3J0aW5nIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBhIHByb3h5IHRvIGBQYmxEYXRhU291cmNlLnNldFNvcnRgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgb3IgYHNvcnRBbGlhc2AgcHJvcGVydGllcy5cbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlIGBQYmxEYXRhU291cmNlLnNldFNvcnRgXG4gICAqXG4gICAqIEBwYXJhbSBjb2x1bW5PclNvcnRBbGlhcyBBIGNvbHVtbiBpbnN0YW5jZSBvciBhIHN0cmluZyBtYXRjaGluZyBgUGJsQ29sdW1uLnNvcnRBbGlhc2Agb3IgYFBibENvbHVtbi5pZGAuXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChjb2x1bW5PclNvcnRBbGlhczogUGJsQ29sdW1uIHwgc3RyaW5nLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHNldFNvcnQoY29sdW1uT3JTb3J0QWxpYXM/OiBQYmxDb2x1bW4gfCBzdHJpbmcgfCBib29sZWFuLCBzb3J0PzogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW5PclNvcnRBbGlhcyB8fCB0eXBlb2YgY29sdW1uT3JTb3J0QWxpYXMgPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5kcy5zZXRTb3J0KCEhY29sdW1uT3JTb3J0QWxpYXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb2x1bW46IFBibENvbHVtbjtcbiAgICBpZiAodHlwZW9mIGNvbHVtbk9yU29ydEFsaWFzID09PSAnc3RyaW5nJykge1xuICAgICAgY29sdW1uID0gdGhpcy5fc3RvcmUuY29sdW1ucy5maW5kKCBjID0+IGMuYWxpYXMgPyBjLmFsaWFzID09PSBjb2x1bW5PclNvcnRBbGlhcyA6IChjLnNvcnQgJiYgYy5pZCA9PT0gY29sdW1uT3JTb3J0QWxpYXMpICk7XG4gICAgICBpZiAoIWNvbHVtbiAmJiBpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzIFwiJHtjb2x1bW5PclNvcnRBbGlhc31cIi5gKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4gPSBjb2x1bW5PclNvcnRBbGlhcztcbiAgICB9XG4gICAgdGhpcy5kcy5zZXRTb3J0KGNvbHVtbiwgc29ydCwgc2tpcFVwZGF0ZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgLCBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWUgYFBibERhdGFTb3VyY2Uuc2V0RmlsdGVyYC5cbiAgICovXG4gIHNldEZpbHRlcigpOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSBmdW5jdGlvbiBwcmVkaWNhdGUuXG4gICAqXG4gICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IERhdGFTb3VyY2VQcmVkaWNhdGUsIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSB8IHN0cmluZ1tdKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgdmFsdWUgdG8gY29tcGFyZSB3aXRoIGFuZCBhIGxpc3Qgb2YgY29sdW1ucyB3aXRoIHRoZSB2YWx1ZXMgdG8gY29tcGFyZSB0by5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgYSBwcm94eSB0byBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgIHdpdGggdGhlIGFkZGVkIHN1Z2FyIG9mIHByb3ZpZGluZyBjb2x1bW4gYnkgc3RyaW5nIHRoYXQgbWF0Y2ggdGhlIGBpZGAgcHJvcGVydHkuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZSBgUGJsRGF0YVNvdXJjZS5zZXRGaWx0ZXJgXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IGFueSwgY29sdW1uczogUGJsQ29sdW1uW10gfCBzdHJpbmdbXSk6IHZvaWQ7XG4gIHNldEZpbHRlcih2YWx1ZT86IERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgY29sdW1ucz86IFBibENvbHVtbltdIHwgc3RyaW5nW10pOiB2b2lkIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBjb2x1bW5JbnN0YW5jZXM6IFBibENvbHVtbltdO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29sdW1ucykgJiYgdHlwZW9mIGNvbHVtbnNbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbHVtbkluc3RhbmNlcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNvbElkIG9mIGNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSB0aGlzLl9zdG9yZS5jb2x1bW5zLmZpbmQoIGMgPT4gYy5hbGlhcyA/IGMuYWxpYXMgPT09IGNvbElkIDogKGMuaWQgPT09IGNvbElkKSApO1xuICAgICAgICAgIGlmICghY29sdW1uICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYENvdWxkIG5vdCBmaW5kIGNvbHVtbiB3aXRoIGFsaWFzICR7Y29sSWR9IFwiJHtjb2xJZH1cIi5gKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29sdW1uSW5zdGFuY2VzLnB1c2goY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29sdW1uSW5zdGFuY2VzID0gY29sdW1ucyBhcyBhbnk7XG4gICAgICB9XG4gICAgICB0aGlzLmRzLnNldEZpbHRlcih2YWx1ZSwgY29sdW1uSW5zdGFuY2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcy5zZXRGaWx0ZXIoKTtcbiAgICB9XG4gIH1cblxuICBzZXREYXRhU291cmNlKHZhbHVlOiBQYmxEYXRhU291cmNlPFQ+KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2RhdGFTb3VyY2UgIT09IHZhbHVlKSB7XG4gICAgICAvLyBLSUxMIEFMTCBzdWJzY3JpcHRpb25zIGZvciB0aGUgcHJldmlvdXMgZGF0YXNvdXJjZS5cbiAgICAgIGlmICh0aGlzLl9kYXRhU291cmNlKSB7XG4gICAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLl9kYXRhU291cmNlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX2RhdGFTb3VyY2U7XG4gICAgICB0aGlzLl9kYXRhU291cmNlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZGtUYWJsZS5kYXRhU291cmNlID0gdmFsdWUgYXMgYW55O1xuXG4gICAgICB0aGlzLnNldHVwUGFnaW5hdG9yKCk7XG4gICAgICB0aGlzLnNldHVwTm9EYXRhKGZhbHNlKTtcblxuICAgICAgLy8gY2xlYXIgdGhlIGNvbnRleHQsIG5ldyBkYXRhc291cmNlXG4gICAgICB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuXG4gICAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHtcbiAgICAgICAga2luZDogJ29uRGF0YVNvdXJjZScsXG4gICAgICAgIHByZXYsXG4gICAgICAgIGN1cnI6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCB2YWx1ZSApIHtcbiAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgdmFsdWUub25FcnJvci5waXBlKFVuUngodGhpcywgdmFsdWUpKS5zdWJzY3JpYmUoY29uc29sZS5lcnJvci5iaW5kKGNvbnNvbGUpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIHJlZ2lzdGVyIHRvIHRoaXMgZXZlbnQgYmVjYXVzZSBpdCBmaXJlcyBiZWZvcmUgdGhlIGVudGlyZSBkYXRhLWNoYW5naW5nIHByb2Nlc3Mgc3RhcnRzLlxuICAgICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2UgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBpcyBmaXJlZCBhc3luYywganVzdCBiZWZvcmUgdGhlIGRhdGEgaXMgZW1pdHRlZC5cbiAgICAgICAgLy8gSXRzIG5vdCBlbm91Z2ggdG8gY2xlYXIgdGhlIGNvbnRleHQgd2hlbiBgc2V0RGF0YVNvdXJjZWAgaXMgY2FsbGVkLCB3ZSBhbHNvIG5lZWQgdG8gaGFuZGxlIGByZWZyZXNoYCBjYWxscyB3aGljaCB3aWxsIG5vdFxuICAgICAgICAvLyB0cmlnZ2VyIHRoaXMgbWV0aG9kLlxuICAgICAgICB2YWx1ZS5vblNvdXJjZUNoYW5naW5nLnBpcGUoVW5SeCh0aGlzLCB2YWx1ZSkpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKSApO1xuXG4gICAgICAgIC8vIFJ1biBDRCwgc2NoZWR1bGVkIGFzIGEgbWljcm8tdGFzaywgYWZ0ZXIgZWFjaCByZW5kZXJpbmdcbiAgICAgICAgdmFsdWUub25SZW5kZXJEYXRhQ2hhbmdpbmdcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGZpbHRlciggKHtldmVudH0pID0+ICFldmVudC5pc0luaXRpYWwgJiYgKGV2ZW50LnBhZ2luYXRpb24uY2hhbmdlZCB8fCBldmVudC5zb3J0LmNoYW5nZWQgfHwgZXZlbnQuZmlsdGVyLmNoYW5nZWQpKSxcbiAgICAgICAgICAgIC8vIENvbnRleHQgYmV0d2VlbiB0aGUgb3BlcmF0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCBhdCB0aGUgbW9tZW50XG4gICAgICAgICAgICAvLyBFdmVudCBmb3IgY2xpZW50IHNpZGUgb3BlcmF0aW9ucy4uLlxuICAgICAgICAgICAgLy8gVE9ETzogY2FuIHdlIHJlbW92ZSB0aGlzPyB3ZSBjbGVhciB0aGUgY29udGV4dCB3aXRoIGBvblNvdXJjZUNoYW5naW5nYFxuICAgICAgICAgICAgdGFwKCAoKSA9PiAhdGhpcy5fc3RvcmUucHJpbWFyeSAmJiB0aGlzLl9leHRBcGkuY29udGV4dEFwaS5jbGVhcigpICksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoICgpID0+IHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZC5waXBlKHRha2UoMSksIG1hcFRvKHRoaXMuZHMucmVuZGVyTGVuZ3RoKSkgKSxcbiAgICAgICAgICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyKSxcbiAgICAgICAgICAgIFVuUngodGhpcywgdmFsdWUpXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIHByZXZpb3VzUmVuZGVyTGVuZ3RoID0+IHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBudW1iZXIgb2YgcmVuZGVyZWQgaXRlbXMgaGFzIGNoYW5nZWQgdGhlIHRhYmxlIHdpbGwgdXBkYXRlIHRoZSBkYXRhIGFuZCBydW4gQ0Qgb24gaXQuXG4gICAgICAgICAgICAvLyBzbyB3ZSBvbmx5IHVwZGF0ZSB0aGUgcm93cy5cbiAgICAgICAgICAgIGNvbnN0IHsgY2RrVGFibGUgfSA9IHRoaXMuX2V4dEFwaTtcbiAgICAgICAgICAgIGlmIChwcmV2aW91c1JlbmRlckxlbmd0aCA9PT0gdGhpcy5kcy5yZW5kZXJMZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2RrVGFibGUuc3luY1Jvd3ModHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjZGtUYWJsZS5zeW5jUm93cygnaGVhZGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICAgIGNka1RhYmxlLnN5bmNSb3dzKCdmb290ZXInLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBIYW5kbGluZyBubyBkYXRhIG92ZXJsYXlcbiAgICAgICAgLy8gSGFuZGxpbmcgZmFsbGJhY2sgbWluaW11bSBoZWlnaHQuXG4gICAgICAgIHZhbHVlLm9uUmVuZGVyZWREYXRhQ2hhbmdlZFxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKCAoKSA9PiB0aGlzLmRzLnJlbmRlckxlbmd0aCApLFxuICAgICAgICAgICAgc3RhcnRXaXRoKG51bGwpLFxuICAgICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICAgIHRhcCggKFtwcmV2LCBjdXJyXSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBub0RhdGFTaG93aW5nID0gISF0aGlzLl9ub0RhdGVFbWJlZGRlZFZSZWY7XG4gICAgICAgICAgICAgIGlmICggKGN1cnIgPiAwICYmIG5vRGF0YVNob3dpbmcpIHx8IChjdXJyID09PSAwICYmICFub0RhdGFTaG93aW5nKSApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwTm9EYXRhKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgb2JzZXJ2ZU9uKGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSwgLy8gd3cgd2FudCB0byBnaXZlIHRoZSBicm93c2VyIHRpbWUgdG8gcmVtb3ZlL2FkZCByb3dzXG4gICAgICAgICAgICBVblJ4KHRoaXMsIHZhbHVlKVxuICAgICAgICAgIClcbiAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kcy5yZW5kZXJMZW5ndGggPiAwICYmIHRoaXMuX2ZhbGxiYWNrTWluSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCBoID0gTWF0aC5taW4odGhpcy5fZmFsbGJhY2tNaW5IZWlnaHQsIHRoaXMudmlld3BvcnQubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSk7XG4gICAgICAgICAgICAgIGVsLnN0eWxlLm1pbkhlaWdodCA9IGggKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuc3R5bGUubWluSGVpZ2h0ID0gdGhpcy52aWV3cG9ydC5lbmFibGVkID8gbnVsbCA6IHRoaXMudmlld3BvcnQubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKSArICdweCc7XG4gICAgICAgICAgICAgIC8vIFRPRE86IFdoZW4gdmlld3BvcnQgaXMgZGlzYWJsZWQsIHdlIGNhbiBza2lwIHRoZSBjYWxsIHRvIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCkgYW5kIGxldCB0aGUgYnJvd3NlclxuICAgICAgICAgICAgICAvLyBkbyB0aGUgam9iIGJ5IHNldHRpbmcgYGNvbnRhaW46IHVuc2V0YCBpbiBgcGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydGBcblxuICAgICAgICAgICAgICAvLyBlbC5zdHlsZS5taW5IZWlnaHQgPSBudWxsO1xuICAgICAgICAgICAgICAvLyBlbC5zdHlsZS5jb250YWluID0gdGhpcy52aWV3cG9ydC5lbmFibGVkID8gbnVsbCA6ICd1bnNldCc7XG5cbiAgICAgICAgICAgICAgLy8gVVBEQVRFOiBUaGlzIHdpbGwgbm90IHdvcmsgYmVjYXVzZSBpdCB3aWxsIGNhdXNlIHRoZSB3aWR0aCB0byBiZSBpbmNvcnJlY3Qgd2hlbiB1c2VkIHdpdGggdlNjcm9sbE5vbmVcbiAgICAgICAgICAgICAgLy8gVE9ETzogQ2hlY2sgd2h5P1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZhbGlkYXRlcyB0aGUgaGVhZGVyLCBpbmNsdWRpbmcgYSBmdWxsIHJlYnVpbGQgb2YgY29sdW1uIGhlYWRlcnNcbiAgICovXG4gIGludmFsaWRhdGVDb2x1bW5zKCk6IHZvaWQge1xuICAgIHRoaXMuX3BsdWdpbi5lbWl0RXZlbnQoeyBraW5kOiAnYmVmb3JlSW52YWxpZGF0ZUhlYWRlcnMnIH0pO1xuXG4gICAgY29uc3QgcmVidWlsZFJvd3MgPSB0aGlzLl9zdG9yZS5hbGxDb2x1bW5zLmxlbmd0aCA+IDA7XG4gICAgdGhpcy5fZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICB0aGlzLl9zdG9yZS5pbnZhbGlkYXRlKHRoaXMuY29sdW1ucyk7XG5cbiAgICBzZXRJZGVudGl0eVByb3AodGhpcy5fc3RvcmUsIHRoaXMuX19pZGVudGl0eVByb3ApOyAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSBpbiAxLjAuMFxuXG4gICAgdGhpcy5hdHRhY2hDdXN0b21DZWxsVGVtcGxhdGVzKCk7XG4gICAgdGhpcy5hdHRhY2hDdXN0b21IZWFkZXJDZWxsVGVtcGxhdGVzKCk7XG4gICAgdGhpcy5fY2RrVGFibGUuY2xlYXJIZWFkZXJSb3dEZWZzKCk7XG4gICAgdGhpcy5fY2RrVGFibGUuY2xlYXJGb290ZXJSb3dEZWZzKCk7XG4gICAgLy8gdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgLy8gYWZ0ZXIgaW52YWxpZGF0aW5nIHRoZSBoZWFkZXJzIHdlIG5vdyBoYXZlIG9wdGlvbmFsIGhlYWRlci9oZWFkZXJHcm91cHMvZm9vdGVyIHJvd3MgYWRkZWRcbiAgICAvLyB3ZSBuZWVkIHRvIHVwZGF0ZSB0aGUgdGVtcGxhdGUgd2l0aCB0aGlzIGRhdGEgd2hpY2ggd2lsbCBjcmVhdGUgbmV3IHJvd3MgKGhlYWRlci9mb290ZXIpXG4gICAgdGhpcy5yZXNldEhlYWRlclJvd0RlZnMoKTtcbiAgICB0aGlzLnJlc2V0Rm9vdGVyUm93RGVmcygpO1xuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgLyogIE5vdyB3ZSB3aWxsIGZvcmNlIGNsZWFyaW5nIGFsbCBkYXRhIHJvd3MgYW5kIGNyZWF0aW5nIHRoZW0gYmFjayBhZ2FpbiBpZiB0aGlzIGlzIG5vdCB0aGUgZmlyc3QgdGltZSB3ZSBpbnZhbGlkYXRlIHRoZSBjb2x1bW5zLi4uXG5cbiAgICAgICAgV2h5PyBmaXJzdCwgc29tZSBiYWNrZ3JvdW5kOlxuXG4gICAgICAgIEludmFsaWRhdGluZyB0aGUgc3RvcmUgd2lsbCByZXN1bHQgaW4gbmV3IGBQYmxDb2x1bW5gIGluc3RhbmNlcyAoY2xvbmVkIG9yIGNvbXBsZXRlbHkgbmV3KSBoZWxkIGluc2lkZSBhIG5ldyBhcnJheSAoYWxsIGFycmF5cyBpbiB0aGUgc3RvcmUgYXJlIHJlLWNyZWF0ZWQgb24gaW52YWxpZGF0ZSlcbiAgICAgICAgTmV3IGFycmF5IGFuZCBuZXcgaW5zdGFuY2VzIHdpbGwgYWxzbyByZXN1bHQgaW4gbmV3IGRpcmVjdGl2ZSBpbnN0YW5jZXMgb2YgYFBibE5ncmlkQ29sdW1uRGVmYCBmb3IgZXZlcnkgY29sdW1uLlxuXG4gICAgICAgIEVhY2ggZGF0YSByb3cgaGFzIGRhdGEgY2VsbHMgd2l0aCB0aGUgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgZGlyZWN0aXZlIChgcGJsLW5ncmlkLWNlbGxgKS5cbiAgICAgICAgYFBibE5ncmlkQ2VsbERpcmVjdGl2ZWAgaGFzIGEgcmVmZXJlbmNlIHRvIGBQYmxOZ3JpZENvbHVtbkRlZmAgdGhyb3VnaCBkZXBlbmRlbmN5IGluamVjdGlvbiwgaS5lLiBpdCB3aWxsIG5vdCB1cGRhdGUgdGhyb3VnaCBjaGFuZ2UgZGV0ZWN0aW9uIVxuXG4gICAgICAgIE5vdywgdGhlIHByb2JsZW06XG4gICAgICAgIFRoZSBgQ2RrVGFibGVgIHdpbGwgY2FjaGUgcm93cyBhbmQgdGhlaXIgY2VsbHMsIHJldXNpbmcgdGhlbSBmb3IgcGVyZm9ybWFuY2UuXG4gICAgICAgIFRoaXMgbWVhbnMgdGhhdCB0aGUgYFBibE5ncmlkQ29sdW1uRGVmYCBpbnN0YW5jZSBpbnNpZGUgZWFjaCBjZWxsIHdpbGwgbm90IGNoYW5nZS5cbiAgICAgICAgU28sIGNyZWF0aW5nIG5ldyBjb2x1bW5zIGFuZCBjb2x1bW5EZWZzIHdpbGwgcmVzdWx0IGluIHN0YWxlIGNlbGxzIHdpdGggcmVmZXJlbmNlIHRvIGRlYWQgaW5zdGFuY2VzIG9mIGBQYmxDb2x1bW5gIGFuZCBgUGJsTmdyaWRDb2x1bW5EZWZgLlxuXG4gICAgICAgIE9uZSBzb2x1dGlvbiBpcyB0byByZWZhY3RvciBgUGJsTmdyaWRDZWxsRGlyZWN0aXZlYCB0byBnZXQgdGhlIGBQYmxOZ3JpZENvbHVtbkRlZmAgdGhyb3VnaCBkYXRhIGJpbmRpbmcuXG4gICAgICAgIFdoaWxlIHRoaXMgd2lsbCB3b3JrIGl0IHdpbGwgcHV0IG1vcmUgd29yayBvbiBlYWNoIGNlbGwgd2hpbGUgZG9pbmcgQ0QgYW5kIHdpbGwgcmVxdWlyZSBjb21wbGV4IGxvZ2ljIHRvIGhhbmRsZSBlYWNoIGNoYW5nZSBiZWNhdXNlIGBQYmxOZ3JpZENlbGxEaXJlY3RpdmVgXG4gICAgICAgIGFsc28gY3JlYXRlIGEgY29udGV4dCB3aGljaCBoYXMgcmVmZXJlbmNlIHRvIGEgY29sdW1uIHRodXMgYSBuZXcgY29udGV4dCBpcyByZXF1aXJlZC5cbiAgICAgICAgS2VlcGluZyB0cmFjayBmb3IgYWxsIHJlZmVyZW5jZXMgd2lsbCBiZSBkaWZmaWN1bHQgYW5kIGJ1Z3MgYXJlIGxpa2VseSB0byBvY2N1ciwgd2hpY2ggYXJlIGhhcmQgdG8gdHJhY2suXG5cbiAgICAgICAgVGhlIHNpbXBsZXN0IHNvbHV0aW9uIGlzIHRvIGZvcmNlIHRoZSB0YWJsZSB0byByZW5kZXIgYWxsIGRhdGEgcm93cyBmcm9tIHNjcmF0Y2ggd2hpY2ggd2lsbCBkZXN0cm95IHRoZSBjYWNoZSBhbmQgYWxsIGNlbGwncyB3aXRoIGl0LCBjcmVhdGluZyBuZXcgb25lJ3Mgd2l0aCBwcm9wZXIgcmVmZXJlbmNlLlxuXG4gICAgICAgIFRoZSBzaW1wbGUgc29sdXRpb24gaXMgY3VycmVudGx5IHByZWZlcnJlZCBiZWNhdXNlOlxuXG4gICAgICAgIC0gSXQgaXMgZWFzaWVyIHRvIGltcGxlbWVudC5cbiAgICAgICAgLSBJdCBpcyBlYXNpZXIgdG8gYXNzZXNzIHRoZSBpbXBhY3QuXG4gICAgICAgIC0gSXQgZWZmZWN0cyBhIHNpbmdsZSBvcGVyYXRpb24gKGNoYW5naW5nIHRvIHJlc2V0dGluZyBjb2x1bW5zKSB0aGF0IHJhcmVseSBoYXBwZW5cblxuICAgICAgICBUaGUgb25seSBpc3N1ZSBpcyB3aXRoIHRoZSBgQ2RrVGFibGVgIGVuY2Fwc3VsYXRpbmcgdGhlIG1ldGhvZCBgX2ZvcmNlUmVuZGVyRGF0YVJvd3MoKWAgd2hpY2ggaXMgd2hhdCB3ZSBuZWVkLlxuICAgICAgICBUaGUgd29ya2Fyb3VuZCBpcyB0byBhc3NpZ24gYG11bHRpVGVtcGxhdGVEYXRhUm93c2Agd2l0aCB0aGUgc2FtZSB2YWx1ZSBpdCBhbHJlYWR5IGhhcywgd2hpY2ggd2lsbCBjYXVzZSBgX2ZvcmNlUmVuZGVyRGF0YVJvd3NgIHRvIGZpcmUuXG4gICAgICAgIGBtdWx0aVRlbXBsYXRlRGF0YVJvd3NgIGlzIGEgZ2V0dGVyIHRoYXQgdHJpZ2dlcnMgYF9mb3JjZVJlbmRlckRhdGFSb3dzYCB3aXRob3V0IGNoZWNraW5nIHRoZSB2YWx1ZSBjaGFuZ2VkLCBwZXJmZWN0IGZpdC5cbiAgICAgICAgVGhlcmUgaXMgYSByaXNrIHdpdGggYG11bHRpVGVtcGxhdGVEYXRhUm93c2AgYmVpbmcgY2hhbmdlZC4uLlxuICAgICAqL1xuICAgIGlmIChyZWJ1aWxkUm93cykge1xuICAgICAgdGhpcy5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzID0gdGhpcy5fY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIH1cbiAgICB0aGlzLl9wbHVnaW4uZW1pdEV2ZW50KHsga2luZDogJ29uSW52YWxpZGF0ZUhlYWRlcnMnIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbHVtbiBzaXplcyBmb3IgYWxsIGNvbHVtbnMgaW4gdGhlIHRhYmxlIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBtZXRhZGF0YSBmb3IgZWFjaCBjb2x1bW4uXG4gICAqIFRoZSBmaW5hbCB3aWR0aCByZXByZXNlbnQgYSBzdGF0aWMgd2lkdGgsIGl0IGlzIHRoZSB2YWx1ZSBhcyBzZXQgaW4gdGhlIGRlZmluaXRpb24gKGV4Y2VwdCBjb2x1bW4gd2l0aG91dCB3aWR0aCwgd2hlcmUgdGhlIGNhbGN1bGF0ZWQgZ2xvYmFsIHdpZHRoIGlzIHNldCkuXG4gICAqL1xuICByZXNldENvbHVtbnNXaWR0aChvcHRpb25zPzogeyB0YWJsZU1hcmtGb3JDaGVjaz86IGJvb2xlYW47IG1ldGFNYXJrRm9yQ2hlY2s/OiBib29sZWFuOyB9KTogdm9pZCB7XG4gICAgcmVzZXRDb2x1bW5XaWR0aHModGhpcy5fc3RvcmUuZ2V0U3RhdGljV2lkdGgoKSwgdGhpcy5fc3RvcmUuY29sdW1ucywgdGhpcy5fc3RvcmUubWV0YUNvbHVtbnMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc2l6ZSBvZiBhbGwgZ3JvdXAgY29sdW1ucyBpbiB0aGUgdGFibGUgYmFzZWQgb24gdGhlIHNpemUgb2YgdGhlaXIgdmlzaWJsZSBjaGlsZHJlbiAobm90IGhpZGRlbikuXG4gICAqIEBwYXJhbSBkeW5hbWljV2lkdGhMb2dpYyAtIE9wdGlvbmFsIGxvZ2ljIGNvbnRhaW5lciwgaWYgbm90IHNldCBhIG5ldyBvbmUgaXMgY3JlYXRlZC5cbiAgICovXG4gIHN5bmNDb2x1bW5Hcm91cHNTaXplKGR5bmFtaWNXaWR0aExvZ2ljPzogRHluYW1pY0NvbHVtbldpZHRoTG9naWMpOiB2b2lkIHtcbiAgICBpZiAoIWR5bmFtaWNXaWR0aExvZ2ljKSB7XG4gICAgICBkeW5hbWljV2lkdGhMb2dpYyA9IHRoaXMuX2V4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgfVxuXG4gICAgLy8gRnJvbSBhbGwgbWV0YSBjb2x1bW5zIChoZWFkZXIvZm9vdGVyL2hlYWRlckdyb3VwKSB3ZSBmaWx0ZXIgb25seSBgaGVhZGVyR3JvdXBgIGNvbHVtbnMuXG4gICAgLy8gRm9yIGVhY2ggd2UgY2FsY3VsYXRlIGl0J3Mgd2lkdGggZnJvbSBhbGwgb2YgdGhlIGNvbHVtbnMgdGhhdCB0aGUgaGVhZGVyR3JvdXAgXCJncm91cHNcIi5cbiAgICAvLyBXZSB1c2UgdGhlIHNhbWUgc3RyYXRlZ3kgYW5kIHRoZSBzYW1lIFJvd1dpZHRoRHluYW1pY0FnZ3JlZ2F0b3IgaW5zdGFuY2Ugd2hpY2ggd2lsbCBwcmV2ZW50IGR1cGxpY2F0ZSBjYWxjdWxhdGlvbnMuXG4gICAgLy8gTm90ZSB0aGF0IHdlIG1pZ2h0IGhhdmUgbXVsdGlwbGUgaGVhZGVyIGdyb3VwcywgaS5lLiBzYW1lIGNvbHVtbnMgb24gbXVsdGlwbGUgZ3JvdXBzIHdpdGggZGlmZmVyZW50IHJvdyBpbmRleC5cbiAgICBmb3IgKGNvbnN0IGcgb2YgdGhpcy5fc3RvcmUuZ2V0QWxsSGVhZGVyR3JvdXAoKSkge1xuICAgICAgLy8gV2UgZ28gb3ZlciBhbGwgY29sdW1ucyBiZWNhdXNlIGcuY29sdW1ucyBkb2VzIG5vdCByZXByZXNlbnQgdGhlIGN1cnJlbnQgb3duZWQgY29sdW1ucyBvZiB0aGUgZ3JvdXBcbiAgICAgIC8vIGl0IGlzIHN0YXRpYywgcmVwcmVzZW50aW5nIHRoZSBpbml0aWFsIHN0YXRlLlxuICAgICAgLy8gT25seSBjb2x1bW5zIGhvbGQgdGhlaXIgZ3JvdXAgb3duZXJzLlxuICAgICAgLy8gVE9ETzogZmluZCB3YXkgdG8gaW1wcm92ZSBpdGVyYXRpb25cbiAgICAgIGNvbnN0IGNvbFNpemVJbmZvcyA9IHRoaXMuX3N0b3JlLmNvbHVtbnMuZmlsdGVyKCBjID0+ICFjLmhpZGRlbiAmJiBjLmlzSW5Hcm91cChnKSkubWFwKCBjID0+IGMuc2l6ZUluZm8gKTtcbiAgICAgIGlmIChjb2xTaXplSW5mb3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBncm91cFdpZHRoID0gZHluYW1pY1dpZHRoTG9naWMuYWRkR3JvdXAoY29sU2l6ZUluZm9zKTtcbiAgICAgICAgZy5taW5XaWR0aCA9IGdyb3VwV2lkdGg7XG4gICAgICAgIGcudXBkYXRlV2lkdGgoYCR7Z3JvdXBXaWR0aH1weGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZy5taW5XaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgZy51cGRhdGVXaWR0aChgMHB4YCk7XG4gICAgICB9XG4gICAgICBpZiAoZy5jb2x1bW5EZWYpIHtcbiAgICAgICAgZy5jb2x1bW5EZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVzaXplQ29sdW1ucyhjb2x1bW5zPzogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBpZiAoIWNvbHVtbnMpIHtcbiAgICAgIGNvbHVtbnMgPSB0aGlzLl9zdG9yZS5jb2x1bW5zO1xuICAgIH1cblxuICAgIC8vIHByb3RlY3QgZnJvbSBwZXItbWF0dXJlIHJlc2l6ZS5cbiAgICAvLyBXaWxsIGhhcHBlbiBvbiBhZGRpdGlvbmFsIGhlYWRlci9oZWFkZXItZ3JvdXAgcm93cyBBTkQgQUxTTyB3aGVuIHZTY3JvbGxOb25lIGlzIHNldFxuICAgIC8vIFRoaXMgd2lsbCBjYXVzZSBzaXplIG5vdCB0byBwb3B1bGF0ZSBiZWNhdXNlIGl0IHRha2VzIHRpbWUgdG8gcmVuZGVyIHRoZSByb3dzLCBzaW5jZSBpdCdzIG5vdCB2aXJ0dWFsIGFuZCBoYXBwZW5zIGltbWVkaWF0ZWx5LlxuICAgIC8vIFRPRE86IGZpbmQgYSBiZXR0ZXIgcHJvdGVjdGlvbi5cbiAgICBpZiAoIWNvbHVtbnNbMF0uc2l6ZUluZm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzdG9yZXMgYW5kIGNhbGN1bGF0ZXMgd2lkdGggZm9yIGNvbHVtbnMgYWRkZWQgdG8gaXQuIEFnZ3JlZ2F0ZSdzIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgYWRkZWQgY29sdW1ucy5cbiAgICBjb25zdCByb3dXaWR0aCA9IHRoaXMuX2V4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgdGhpcy5zeW5jQ29sdW1uR3JvdXBzU2l6ZShyb3dXaWR0aCk7XG5cbiAgICAvLyBpZiB0aGlzIGlzIGEgdGFibGUgd2l0aG91dCBncm91cHNcbiAgICBpZiAocm93V2lkdGgubWluaW11bVJvd1dpZHRoID09PSAwKSB7XG4gICAgICByb3dXaWR0aC5hZGRHcm91cChjb2x1bW5zLm1hcCggYyA9PiBjLnNpemVJbmZvICkpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBtYXggbG9jayBzdGF0ZSBoYXMgY2hhbmdlZCB3ZSBuZWVkIHRvIHVwZGF0ZSByZS1jYWxjdWxhdGUgdGhlIHN0YXRpYyB3aWR0aCdzIGFnYWluLlxuICAgIGlmIChyb3dXaWR0aC5tYXhXaWR0aExvY2tDaGFuZ2VkKSB7XG4gICAgICByZXNldENvbHVtbldpZHRocyh0aGlzLl9zdG9yZS5nZXRTdGF0aWNXaWR0aCgpLCB0aGlzLl9zdG9yZS5jb2x1bW5zLCB0aGlzLl9zdG9yZS5tZXRhQ29sdW1ucywgeyB0YWJsZU1hcmtGb3JDaGVjazogdHJ1ZSB9KTtcbiAgICAgIHRoaXMucmVzaXplQ29sdW1ucyhjb2x1bW5zKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX21pbmltdW1Sb3dXaWR0aCApIHtcbiAgICAgIC8vIFdlIGNhbGN1bGF0ZSB0aGUgdG90YWwgbWluaW11bSB3aWR0aCBvZiB0aGUgdGFibGVcbiAgICAgIC8vIFdlIGRvIGl0IG9uY2UsIHRvIHNldCB0aGUgbWluaW11bSB3aWR0aCBiYXNlZCBvbiB0aGUgaW5pdGlhbCBzZXR1cC5cbiAgICAgIC8vIE5vdGUgdGhhdCB3ZSBkb24ndCBhcHBseSBzdHJhdGVneSBoZXJlLCB3ZSB3YW50IHRoZSBlbnRpcmUgbGVuZ3RoIG9mIHRoZSB0YWJsZSFcbiAgICAgIHRoaXMuX2Nka1RhYmxlLm1pbldpZHRoID0gcm93V2lkdGgubWluaW11bVJvd1dpZHRoO1xuICAgIH1cblxuICAgIHRoaXMubmdab25lLnJ1biggKCkgPT4ge1xuICAgICAgdGhpcy5fY2RrVGFibGUuc3luY1Jvd3MoJ2hlYWRlcicpO1xuICAgICAgdGhpcy5fcGx1Z2luLmVtaXRFdmVudCh7IGtpbmQ6ICdvblJlc2l6ZVJvdycgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGVtYmVkZGVkIHZpZXcgYmVmb3JlIG9yIGFmdGVyIHRoZSB1c2VyIHByb2plY3RlZCBjb250ZW50LlxuICAgKi9cbiAgY3JlYXRlVmlldzxDPihsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnLCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8Qz4sIGNvbnRleHQ/OiBDLCBpbmRleD86IG51bWJlcik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmdldEludGVybmFsVmNSZWYobG9jYXRpb24pO1xuICAgIGNvbnN0IHZpZXcgPSB2Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGVSZWYsIGNvbnRleHQsIGluZGV4KTtcbiAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICByZXR1cm4gdmlldztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gYWxyZWFkeSBjcmVhdGVkIGVtYmVkZGVkIHZpZXcuXG4gICAqIEBwYXJhbSB2aWV3IC0gVGhlIHZpZXcgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSBsb2NhdGlvbiAtIFRoZSBsb2NhdGlvbiwgaWYgbm90IHNldCBkZWZhdWx0cyB0byBgYmVmb3JlYFxuICAgKiBAcmV0dXJucyB0cnVlIHdoZW4gYSB2aWV3IHdhcyByZW1vdmVkLCBmYWxzZSB3aGVuIG5vdC4gKGRpZCBub3QgZXhpc3QgaW4gdGhlIHZpZXcgY29udGFpbmVyIGZvciB0aGUgcHJvdmlkZWQgbG9jYXRpb24pXG4gICAqL1xuICByZW1vdmVWaWV3KHZpZXc6IEVtYmVkZGVkVmlld1JlZjxhbnk+LCBsb2NhdGlvbjogJ2JlZm9yZVRhYmxlJyB8ICdiZWZvcmVDb250ZW50JyB8ICdhZnRlckNvbnRlbnQnKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmdldEludGVybmFsVmNSZWYobG9jYXRpb24pO1xuICAgIGNvbnN0IGlkeCA9IHZjUmVmLmluZGV4T2Yodmlldyk7XG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmNSZWYucmVtb3ZlKGlkeCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIGFsbCB2aXNpYmxlIGNvbHVtbnMgdG8gZml0IGNvbnRlbnQgb2YgdGhlIHRhYmxlLlxuICAgKiBAcGFyYW0gZm9yY2VGaXhlZFdpZHRoIC0gV2hlbiB0cnVlIHdpbGwgcmVzaXplIGFsbCBjb2x1bW5zIHdpdGggYWJzb2x1dGUgcGl4ZWwgdmFsdWVzLCBvdGhlcndpc2Ugd2lsbCBrZWVwIHRoZSBzYW1lIGZvcm1hdCBhcyBvcmlnaW5hbGx5IHNldCAoJSBvciBub25lKVxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5Ub0ZpdChvcHRpb25zPzogQXV0b1NpemVUb0ZpdE9wdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCB7IGlubmVyV2lkdGgsIG91dGVyV2lkdGggfSA9IHRoaXMudmlld3BvcnQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgYXV0by1zaXplIG9uIHRoZSB3aWR0aCB3aXRob3V0IHNjcm9sbCBiYXIgYW5kIHRha2UgYm94IG1vZGVsIGdhcHMgaW50byBhY2NvdW50XG4gICAgLy8gVE9ETzogaWYgbm8gc2Nyb2xsIGJhciBleGlzdHMgdGhlIGNhbGMgd2lsbCBub3QgaW5jbHVkZSBpdCwgbmV4dCBpZiBtb3JlIHJvd3MgYXJlIGFkZGVkIGEgc2Nyb2xsIGJhciB3aWxsIGFwcGVhci4uLlxuICAgIHRoaXMuY29sdW1uQXBpLmF1dG9TaXplVG9GaXQob3V0ZXJXaWR0aCAtIChvdXRlcldpZHRoIC0gaW5uZXJXaWR0aCksIG9wdGlvbnMpO1xuICB9XG5cbiAgZmluZEluaXRpYWxSb3dIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBsZXQgcm93RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX2Nka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lci5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB0aGlzLl9jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXIuZ2V0KDApIGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+O1xuICAgICAgcm93RWxlbWVudCA9IHZpZXdSZWYucm9vdE5vZGVzWzBdO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gZ2V0Q29tcHV0ZWRTdHlsZShyb3dFbGVtZW50KS5oZWlnaHQ7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoaGVpZ2h0LCAxMCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQpIHtcbiAgICAgIHJvd0VsZW1lbnQgPSB0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQubGVuZ3RoID4gMFxuICAgICAgICA/ICh0aGlzLl92Y1JlZkJlZm9yZUNvbnRlbnQuZ2V0KHRoaXMuX3ZjUmVmQmVmb3JlQ29udGVudC5sZW5ndGggLSAxKSBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdXG4gICAgICAgIDogdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50LmVsZW1lbnQubmF0aXZlRWxlbWVudFxuICAgICAgO1xuICAgICAgcm93RWxlbWVudCA9IHJvd0VsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nIGFzIEhUTUxFbGVtZW50O1xuICAgICAgcm93RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICBjb25zdCBoZWlnaHQgPSBnZXRDb21wdXRlZFN0eWxlKHJvd0VsZW1lbnQpLmhlaWdodDtcbiAgICAgIHJvd0VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHJldHVybiBwYXJzZUludChoZWlnaHQsIDEwKTtcbiAgICB9XG4gIH1cblxuICBhZGRDbGFzcyguLi5jbHM6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjIG9mIGNscykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoYyk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2xhc3MoLi4uY2xzOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgYyBvZiBjbHMpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5pdFBsdWdpbnMoaW5qZWN0b3I6IEluamVjdG9yLCBlbFJlZjogRWxlbWVudFJlZjxhbnk+LCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZik6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhbiBpbmplY3RvciBmb3IgdGhlIGV4dGVuc2lvbnMvcGx1Z2luc1xuICAgIC8vIFRoaXMgaW5qZWN0b3IgYWxsb3cgcGx1Z2lucyAodGhhdCBjaG9vc2Ugc28pIHRvIHByb3ZpZGUgYSBmYWN0b3J5IGZ1bmN0aW9uIGZvciBydW50aW1lIHVzZS5cbiAgICAvLyBJLkU6IGFzIGlmIHRoZXkgd2UncmUgY3JlYXRlZCBieSBhbmd1bGFyIHZpYSB0ZW1wbGF0ZS4uLlxuICAgIC8vIFRoaXMgYWxsb3dzIHNlYW1sZXNzIHBsdWdpbi10by1wbHVnaW4gZGVwZW5kZW5jaWVzIHdpdGhvdXQgcmVxdWlyaW5nIHNwZWNpZmljIHRlbXBsYXRlIHN5bnRheC5cbiAgICAvLyBBbmQgYWxzbyBhbGxvd3MgYXV0byBwbHVnaW4gYmluZGluZyAoYXBwIHdpZGUpIHdpdGhvdXQgdGhlIG5lZWQgZm9yIHRlbXBsYXRlIHN5bnRheC5cbiAgICBjb25zdCBwbHVnaW5JbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBWaWV3Q29udGFpbmVyUmVmLCB1c2VWYWx1ZTogdmNSZWYgfSxcbiAgICAgICAgeyBwcm92aWRlOiBFbGVtZW50UmVmLCB1c2VWYWx1ZTogZWxSZWYgfSxcbiAgICAgICAgeyBwcm92aWRlOiBDaGFuZ2VEZXRlY3RvclJlZiwgdXNlVmFsdWU6IHRoaXMuY2RyIH0sXG4gICAgICBdLFxuICAgICAgcGFyZW50OiBpbmplY3RvcixcbiAgICB9KTtcbiAgICB0aGlzLl9wbHVnaW4gPSBQYmxOZ3JpZFBsdWdpbkNvbnRleHQuY3JlYXRlKHRoaXMsIHBsdWdpbkluamVjdG9yLCB0aGlzLl9leHRBcGkpO1xuICAgIGJpbmRUb0RhdGFTb3VyY2UodGhpcy5fcGx1Z2luKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuVG9SZXNpemUoKTogdm9pZCB7XG4gICAgbGV0IHJlc2l6ZU9ic2VydmVyOiBSZXNpemVPYnNlcnZlcjtcbiAgICBjb25zdCBybyQgPSBmcm9tRXZlbnRQYXR0ZXJuPFtSZXNpemVPYnNlcnZlckVudHJ5W10sIFJlc2l6ZU9ic2VydmVyXT4oXG4gICAgICBoYW5kbGVyID0+IHtcbiAgICAgICAgaWYgKCFyZXNpemVPYnNlcnZlcikge1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGhhbmRsZXIpO1xuICAgICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZXIgPT4ge1xuICAgICAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgICByZXNpemVPYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgcmVzaXplT2JzZXJ2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gU2tpcCB0aGUgZmlyc3QgZW1pc3Npb25cbiAgICAvLyBEZWJvdW5jZSBhbGwgcmVzaXplcyB1bnRpbCB0aGUgbmV4dCBjb21wbGV0ZSBhbmltYXRpb24gZnJhbWUgd2l0aG91dCBhIHJlc2l6ZVxuICAgIC8vIGZpbmFsbHkgbWFwcyB0byB0aGUgZW50cmllcyBjb2xsZWN0aW9uXG4gICAgLy8gU0tJUDogIFdlIHNob3VsZCBza2lwIHRoZSBmaXJzdCBlbWlzc2lvbiAoYHNraXAoMSlgKSBiZWZvcmUgd2UgZGVib3VuY2UsIHNpbmNlIGl0cyBjYWxsZWQgdXBvbiBjYWxsaW5nIFwib2JzZXJ2ZVwiIG9uIHRoZSByZXNpemVPYnNlcnZlci5cbiAgICAvLyAgICAgICAgVGhlIHByb2JsZW0gaXMgdGhhdCBzb21lIHRhYmxlcyBtaWdodCByZXF1aXJlIHRoaXMgYmVjYXVzZSB0aGV5IGRvIGNoYW5nZSBzaXplLlxuICAgIC8vICAgICAgICBBbiBleGFtcGxlIGlzIGEgdGFibGUgaW4gYSBtYXQtdGFiIHRoYXQgaXMgaGlkZGVuLCB0aGUgdGFibGUgd2lsbCBoaXQgdGhlIHJlc2l6ZSBvbmUgd2hlbiB3ZSBmb2N1cyB0aGUgdGFiXG4gICAgLy8gICAgICAgIHdoaWNoIHdpbGwgcmVxdWlyZSBhIHJlc2l6ZSBoYW5kbGluZyBiZWNhdXNlIGl0J3MgaW5pdGlhbCBzaXplIGlzIDBcbiAgICAvLyAgICAgICAgVG8gd29ya2Fyb3VuZCB0aGlzLCB3ZSBvbmx5IHNraXAgZWxlbWVudHMgbm90IHlldCBhZGRlZCB0byB0aGUgRE9NLCB3aGljaCBtZWFucyB0aGV5IHdpbGwgbm90IHRyaWdnZXIgYSByZXNpemUgZXZlbnQuXG4gICAgbGV0IHNraXBWYWx1ZSA9IGRvY3VtZW50LmNvbnRhaW5zKHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudCkgPyAxIDogMDtcblxuICAgIHJvJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHNraXAoc2tpcFZhbHVlKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSxcbiAgICAgICAgVW5SeCh0aGlzKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIChhcmdzOiBbUmVzaXplT2JzZXJ2ZXJFbnRyeVtdLCBSZXNpemVPYnNlcnZlcl0pID0+IHtcbiAgICAgICAgaWYgKHNraXBWYWx1ZSA9PT0gMCkge1xuICAgICAgICAgIHNraXBWYWx1ZSA9IDE7XG4gICAgICAgICAgY29uc3QgY29sdW1ucyA9IHRoaXMuX3N0b3JlLmNvbHVtbnM7XG4gICAgICAgICAgY29sdW1ucy5mb3JFYWNoKCBjID0+IGMuc2l6ZUluZm8udXBkYXRlU2l6ZSgpICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vblJlc2l6ZShhcmdzWzBdKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBvblJlc2l6ZShlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgIHRoaXMuX3ZpZXdwb3J0LmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgfVxuICAgIHRoaXMucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdEV4dEFwaSgpOiB2b2lkIHtcbiAgICBsZXQgb25Jbml0OiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuICAgIGNvbnN0IGV4dEFwaSA9IHtcbiAgICAgIHRhYmxlOiB0aGlzLFxuICAgICAgZWxlbWVudDogdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LFxuICAgICAgZ2V0IGNka1RhYmxlKCkgeyByZXR1cm4gZXh0QXBpLnRhYmxlLl9jZGtUYWJsZTsgfSxcbiAgICAgIGdldCBldmVudHMoKSB7IHJldHVybiBleHRBcGkudGFibGUuX3BsdWdpbi5ldmVudHMgfSxcbiAgICAgIGdldCBjb250ZXh0QXBpKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2NvbnRleHRBcGknLCB7IHZhbHVlOiBuZXcgQ29udGV4dEFwaTxUPihleHRBcGkpIH0pO1xuICAgICAgICByZXR1cm4gZXh0QXBpLmNvbnRleHRBcGk7XG4gICAgICB9LFxuICAgICAgZ2V0IG1ldGFSb3dTZXJ2aWNlKCkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ21ldGFSb3dTZXJ2aWNlJywgeyB2YWx1ZTogbmV3IFBibE5ncmlkTWV0YVJvd1NlcnZpY2U8VD4oZXh0QXBpKSB9KTtcbiAgICAgICAgcmV0dXJuIGV4dEFwaS5tZXRhUm93U2VydmljZTtcbiAgICAgIH0sXG4gICAgICBvbkluaXQ6IChmbjogKCkgPT4gdm9pZCkgPT4ge1xuICAgICAgICBpZiAoZXh0QXBpLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9uSW5pdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGxldCB1ID0gZXh0QXBpLmV2ZW50cy5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoZS5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb25Jbml0Rm4gb2Ygb25Jbml0KSB7XG4gICAgICAgICAgICAgICAgICBvbkluaXRGbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1LnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgb25Jbml0ID0gdSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9uSW5pdC5wdXNoKGZuKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbHVtblN0b3JlOiB0aGlzLl9zdG9yZSxcbiAgICAgIHNldFZpZXdwb3J0OiAodmlld3BvcnQpID0+IHRoaXMuX3ZpZXdwb3J0ID0gdmlld3BvcnQsXG4gICAgICBkeW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5OiAoKTogRHluYW1pY0NvbHVtbldpZHRoTG9naWMgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IER5bmFtaWNDb2x1bW5XaWR0aExvZ2ljKERZTkFNSUNfUEFERElOR19CT1hfTU9ERUxfU1BBQ0VfU1RSQVRFR1kpO1xuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5fZXh0QXBpID0gZXh0QXBpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cE5vRGF0YShmb3JjZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmKSB7XG4gICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoZm9yY2UgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgbm9EYXRhID0gdGhpcy5fZGF0YVNvdXJjZSAmJiB0aGlzLl9kYXRhU291cmNlLnJlbmRlckxlbmd0aCA9PT0gMDtcbiAgICBpZiAobm9EYXRhKSB7XG4gICAgICB0aGlzLmFkZENsYXNzKCdwYmwtbmdyaWQtZW1wdHknKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVDbGFzcygncGJsLW5ncmlkLWVtcHR5Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vRGF0YSB8fCBmb3JjZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgbm9EYXRhVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldFNpbmdsZSgnbm9EYXRhJyk7XG4gICAgICBpZiAobm9EYXRhVGVtcGxhdGUpIHtcbiAgICAgICAgdGhpcy5fbm9EYXRlRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50Jywgbm9EYXRhVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRJbnRlcm5hbFZjUmVmKGxvY2F0aW9uOiAnYmVmb3JlVGFibGUnIHwgJ2JlZm9yZUNvbnRlbnQnIHwgJ2FmdGVyQ29udGVudCcpOiBWaWV3Q29udGFpbmVyUmVmIHtcbiAgICByZXR1cm4gbG9jYXRpb24gPT09ICdiZWZvcmVUYWJsZSdcbiAgICAgID8gdGhpcy5fdmNSZWZCZWZvcmVUYWJsZVxuICAgICAgOiBsb2NhdGlvbiA9PT0gJ2JlZm9yZUNvbnRlbnQnID8gdGhpcy5fdmNSZWZCZWZvcmVDb250ZW50IDogdGhpcy5fdmNSZWZBZnRlckNvbnRlbnRcbiAgICA7XG4gIH1cblxuICBwcml2YXRlIHNldHVwUGFnaW5hdG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHBhZ2luYXRpb25LaWxsS2V5ID0gJ3BibFBhZ2luYXRpb25LaWxsS2V5JztcbiAgICBjb25zdCB1c2VQYWdpbmF0aW9uID0gdGhpcy5kcyAmJiB0aGlzLnVzZVBhZ2luYXRpb247XG5cbiAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgdGhpcy5kcy5wYWdpbmF0aW9uID0gdGhpcy5fcGFnaW5hdGlvbjtcbiAgICAgIGlmICh0aGlzLmRzLnBhZ2luYXRvcikge1xuICAgICAgICB0aGlzLmRzLnBhZ2luYXRvci5ub0NhY2hlTW9kZSA9IHRoaXMuX25vQ2FjaGVQYWdpbmF0b3I7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJbml0KSB7XG4gICAgICBVblJ4LmtpbGwodGhpcywgcGFnaW5hdGlvbktpbGxLZXkpO1xuICAgICAgaWYgKHRoaXMuX3BhZ2luYXRvckVtYmVkZGVkVlJlZikge1xuICAgICAgICB0aGlzLnJlbW92ZVZpZXcodGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmLCAnYmVmb3JlQ29udGVudCcpO1xuICAgICAgICB0aGlzLl9wYWdpbmF0b3JFbWJlZGRlZFZSZWYgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAodXNlUGFnaW5hdGlvbikge1xuICAgICAgICBjb25zdCBwYWdpbmF0b3JUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0U2luZ2xlKCdwYWdpbmF0b3InKTtcbiAgICAgICAgaWYgKHBhZ2luYXRvclRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yRW1iZWRkZWRWUmVmID0gdGhpcy5jcmVhdGVWaWV3KCdiZWZvcmVDb250ZW50JywgcGFnaW5hdG9yVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaEN1c3RvbUNlbGxUZW1wbGF0ZXMoKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5fc3RvcmUuY29sdW1ucykge1xuICAgICAgY29uc3QgY2VsbCA9IGZpbmRDZWxsRGVmKHRoaXMucmVnaXN0cnksIGNvbCwgJ3RhYmxlQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBjZWxsICkge1xuICAgICAgICBjb2wuY2VsbFRwbCA9IGNlbGwudFJlZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgndGFibGVDZWxsJyk7XG4gICAgICAgIGNvbC5jZWxsVHBsID0gZGVmYXVsdENlbGxUZW1wbGF0ZSA/IGRlZmF1bHRDZWxsVGVtcGxhdGUudFJlZiA6IHRoaXMuX2ZiVGFibGVDZWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlZGl0b3JDZWxsID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLCAnZWRpdG9yQ2VsbCcsIHRydWUpO1xuICAgICAgaWYgKCBlZGl0b3JDZWxsICkge1xuICAgICAgICBjb2wuZWRpdG9yVHBsID0gZWRpdG9yQ2VsbC50UmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdENlbGxUZW1wbGF0ZSA9IHRoaXMucmVnaXN0cnkuZ2V0TXVsdGlEZWZhdWx0KCdlZGl0b3JDZWxsJyk7XG4gICAgICAgIGNvbC5lZGl0b3JUcGwgPSBkZWZhdWx0Q2VsbFRlbXBsYXRlID8gZGVmYXVsdENlbGxUZW1wbGF0ZS50UmVmIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoQ3VzdG9tSGVhZGVyQ2VsbFRlbXBsYXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBjb2x1bW5zOiBBcnJheTxQYmxDb2x1bW4gfCBQYmxNZXRhQ29sdW1uU3RvcmU+ID0gW10uY29uY2F0KHRoaXMuX3N0b3JlLmNvbHVtbnMsIHRoaXMuX3N0b3JlLm1ldGFDb2x1bW5zKTtcbiAgICBjb25zdCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlID0gdGhpcy5yZWdpc3RyeS5nZXRNdWx0aURlZmF1bHQoJ2hlYWRlckNlbGwnKSB8fCB7IHRSZWY6IHRoaXMuX2ZiSGVhZGVyQ2VsbCB9O1xuICAgIGNvbnN0IGRlZmF1bHRGb290ZXJDZWxsVGVtcGxhdGUgPSB0aGlzLnJlZ2lzdHJ5LmdldE11bHRpRGVmYXVsdCgnZm9vdGVyQ2VsbCcpIHx8IHsgdFJlZjogdGhpcy5fZmJGb290ZXJDZWxsIH07XG4gICAgZm9yIChjb25zdCBjb2wgb2YgY29sdW1ucykge1xuICAgICAgaWYgKGNvbCBpbnN0YW5jZW9mIFBibENvbHVtbikge1xuICAgICAgICBjb25zdCBoZWFkZXJDZWxsRGVmID0gZmluZENlbGxEZWY8VD4odGhpcy5yZWdpc3RyeSwgY29sLCAnaGVhZGVyQ2VsbCcsIHRydWUpIHx8IGRlZmF1bHRIZWFkZXJDZWxsVGVtcGxhdGU7XG4gICAgICAgIGNvbnN0IGZvb3RlckNlbGxEZWYgPSBmaW5kQ2VsbERlZjxUPih0aGlzLnJlZ2lzdHJ5LCBjb2wsICdmb290ZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEZvb3RlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgY29sLmhlYWRlckNlbGxUcGwgPSBoZWFkZXJDZWxsRGVmLnRSZWY7XG4gICAgICAgIGNvbC5mb290ZXJDZWxsVHBsID0gZm9vdGVyQ2VsbERlZi50UmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbC5oZWFkZXIpIHtcbiAgICAgICAgICBjb25zdCBoZWFkZXJDZWxsRGVmID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLmhlYWRlciwgJ2hlYWRlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0SGVhZGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICAgIGNvbC5oZWFkZXIudGVtcGxhdGUgPSBoZWFkZXJDZWxsRGVmLnRSZWY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbC5oZWFkZXJHcm91cCkge1xuICAgICAgICAgIGNvbnN0IGhlYWRlckNlbGxEZWYgPSBmaW5kQ2VsbERlZih0aGlzLnJlZ2lzdHJ5LCBjb2wuaGVhZGVyR3JvdXAsICdoZWFkZXJDZWxsJywgdHJ1ZSkgfHwgZGVmYXVsdEhlYWRlckNlbGxUZW1wbGF0ZTtcbiAgICAgICAgICBjb2wuaGVhZGVyR3JvdXAudGVtcGxhdGUgPSBoZWFkZXJDZWxsRGVmLnRSZWY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbC5mb290ZXIpIHtcbiAgICAgICAgICBjb25zdCBmb290ZXJDZWxsRGVmID0gZmluZENlbGxEZWYodGhpcy5yZWdpc3RyeSwgY29sLmZvb3RlciwgJ2Zvb3RlckNlbGwnLCB0cnVlKSB8fCBkZWZhdWx0Rm9vdGVyQ2VsbFRlbXBsYXRlO1xuICAgICAgICAgIGNvbC5mb290ZXIudGVtcGxhdGUgPSBmb290ZXJDZWxsRGVmLnRSZWY7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0SGVhZGVyUm93RGVmcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faGVhZGVyUm93RGVmcykge1xuICAgICAgLy8gVGhlIHRhYmxlIGhlYWRlciAobWFpbiwgd2l0aCBjb2x1bW4gbmFtZXMpIGlzIGFsd2F5cyB0aGUgbGFzdCByb3cgZGVmIChpbmRleCAwKVxuICAgICAgLy8gQmVjYXVzZSB3ZSB3YW50IGl0IHRvIHNob3cgbGFzdCAoYWZ0ZXIgY3VzdG9tIGhlYWRlcnMsIGdyb3VwIGhlYWRlcnMuLi4pIHdlIGZpcnN0IG5lZWQgdG8gcHVsbCBpdCBhbmQgdGhlbiBwdXNoLlxuXG4gICAgICB0aGlzLl9jZGtUYWJsZS5jbGVhckhlYWRlclJvd0RlZnMoKTtcbiAgICAgIGNvbnN0IGFyciA9IHRoaXMuX2hlYWRlclJvd0RlZnMudG9BcnJheSgpO1xuICAgICAgYXJyLnB1c2goYXJyLnNoaWZ0KCkpO1xuXG4gICAgICBmb3IgKGNvbnN0IHJvd0RlZiBvZiBhcnIpIHtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuYWRkSGVhZGVyUm93RGVmKHJvd0RlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZvb3RlclJvd0RlZnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Zvb3RlclJvd0RlZnMpIHtcbiAgICAgIHRoaXMuX2Nka1RhYmxlLmNsZWFyRm9vdGVyUm93RGVmcygpO1xuICAgICAgZm9yIChjb25zdCByb3dEZWYgb2YgdGhpcy5fZm9vdGVyUm93RGVmcy50b0FycmF5KCkpIHtcbiAgICAgICAgdGhpcy5fY2RrVGFibGUuYWRkRm9vdGVyUm93RGVmKHJvd0RlZik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=