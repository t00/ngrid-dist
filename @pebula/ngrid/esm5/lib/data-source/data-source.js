/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BehaviorSubject, Subject, of, asapScheduler } from 'rxjs';
import { mapTo, skip, observeOn, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { UnRx } from '@pebula/utils';
import { PblPagingPaginator, PblTokenPaginator } from '../paginator';
import { createFilter } from './filtering';
/** @type {?} */
var PROCESSING_SUBSCRIPTION_GROUP = {};
/**
 * @record
 */
export function PblDataSourceOptions() { }
if (false) {
    /**
     * When set to True will not disconnect upon table disconnection, otherwise does.
     * @type {?|undefined}
     */
    PblDataSourceOptions.prototype.keepAlive;
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @type {?|undefined}
     */
    PblDataSourceOptions.prototype.skipInitial;
}
/**
 * @template T, TData
 */
var /**
 * @template T, TData
 */
PblDataSource = /** @class */ (function (_super) {
    tslib_1.__extends(PblDataSource, _super);
    function PblDataSource(adapter, options) {
        var _this = _super.call(this) || this;
        _this._selection = new SelectionModel(true, []);
        _this._tableConnectionChange$ = new Subject();
        _this._onRenderDataChanging = new Subject();
        _this._renderData$ = new BehaviorSubject([]);
        _this._filter$ = new BehaviorSubject(undefined);
        _this._sort$ = new BehaviorSubject({ column: null, sort: null, skipUpdate: false });
        _this._onError$ = new Subject();
        options = options || {};
        _this.adapter = adapter;
        _this.onSourceChanging = _this._adapter.onSourceChanging;
        // emit source changed event every time adapter gets new data
        _this.onSourceChanged = _this.adapter.onSourceChanged
            .pipe(observeOn(asapScheduler, 0), // emit on the end of the current turn (micro-task) to ensure `onSourceChanged` emission in `_updateProcessingLogic` run's first.
        mapTo(undefined));
        _this.onRenderDataChanging = _this._onRenderDataChanging.asObservable();
        _this.onRenderedDataChanged = _this._renderData$.pipe(skip(1), mapTo(undefined));
        _this.onError = _this._onError$.asObservable();
        _this.tableConnectionChange = _this._tableConnectionChange$.asObservable();
        _this.keepAlive = options.keepAlive || false;
        _this.skipInitial = options.skipInitial || false;
        _this.sortChange = _this._sort$.asObservable();
        return _this;
    }
    Object.defineProperty(PblDataSource.prototype, "pagination", {
        get: /**
         * @return {?}
         */
        function () { return this._pagination; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._pagination !== value) {
                this._pagination = value;
                switch (value) {
                    case 'pageNumber':
                        this._paginator = new PblPagingPaginator();
                        break;
                    case 'token':
                        this._paginator = new PblTokenPaginator();
                        break;
                    default:
                        this._paginator = undefined;
                        break;
                }
                if (this._adapter) {
                    this._adapter.setPaginator(this._paginator);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "adapter", {
        get: /**
         * @return {?}
         */
        function () { return this._adapter; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._adapter !== value) {
                this._adapter = value;
                if (this.pagination) {
                    this._adapter.setPaginator(this._paginator);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblDataSource.prototype, "renderedRows", {
        // TODO(1.0.0): remove
        /** @deprecated BREAKING CHANGE: removed in 1.0.0 - Use renderedData instead. */
        get: 
        // TODO(1.0.0): remove
        /**
         * @deprecated BREAKING CHANGE: removed in 1.0.0 - Use renderedData instead.
         * @return {?}
         */
        function () { return this._renderData$.value || []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "renderStart", {
        /** Returns the starting index of the rendered data */
        get: /**
         * Returns the starting index of the rendered data
         * @return {?}
         */
        function () { return this._lastRange ? this._lastRange.start : 0; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "renderLength", {
        get: /**
         * @return {?}
         */
        function () { return this._renderData$.value.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "renderedData", {
        get: /**
         * @return {?}
         */
        function () { return this._renderData$.value || []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "sortedData", {
        /**
         * The `source` with sorting applied.
         * Valid only when sorting is performed client-side.
         *
         * To get real-time notifications use `onRenderDataChanging`.
         * The sorted data is updated just before `onRenderDataChanging` fire.
         */
        get: /**
         * The `source` with sorting applied.
         * Valid only when sorting is performed client-side.
         *
         * To get real-time notifications use `onRenderDataChanging`.
         * The sorted data is updated just before `onRenderDataChanging` fire.
         * @return {?}
         */
        function () { return (this._lastAdapterEvent && this._lastAdapterEvent.sorted) || []; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblDataSource.prototype, "filteredData", {
        /**
         * The `source` with filtering applied.
         * Valid only when filtering is performed client-side.
         * If sorting is applied as well, the filtered results are also sorted.
         *
         * To get real-time notifications use `onRenderDataChanging`.
         * The filtered data is updated just before `onRenderDataChanging` fire.
         */
        get: /**
         * The `source` with filtering applied.
         * Valid only when filtering is performed client-side.
         * If sorting is applied as well, the filtered results are also sorted.
         *
         * To get real-time notifications use `onRenderDataChanging`.
         * The filtered data is updated just before `onRenderDataChanging` fire.
         * @return {?}
         */
        function () { return (this._lastAdapterEvent && this._lastAdapterEvent.filtered) || []; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblDataSource.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () { return this._filter$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "sort", {
        get: /**
         * @return {?}
         */
        function () { return this._sort$.value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "paginator", {
        get: /**
         * @return {?}
         */
        function () { return this._paginator; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "length", {
        get: /**
         * @return {?}
         */
        function () { return this.source.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "source", {
        get: /**
         * @return {?}
         */
        function () { return this._source || []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblDataSource.prototype, "selection", {
        /** Represents selected items on the data source. */
        get: /**
         * Represents selected items on the data source.
         * @return {?}
         */
        function () { return this._selection; },
        enumerable: true,
        configurable: true
    });
    /**
     * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
     */
    /**
     * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
     * @param {?=} data
     * @return {?}
     */
    PblDataSource.prototype.refresh = /**
     * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        if (this._tableConnected) {
            this._adapter.refresh(data);
        }
        else {
            this._lastRefresh = data;
        }
    };
    /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    PblDataSource.prototype.setFilter = /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    function (value, columns) {
        if (value && typeof value !== 'function' && (!columns || columns.length === 0)) {
            throw new Error('Invalid filter definitions, columns are mandatory when using a single value input.');
        }
        this._filter$.next(createFilter(value, columns || []));
    };
    /**
     * Refresh the filters result.
     *
     * Note that this should only be used when using a predicate function filter and not the simple value filter.
     * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
     * has no impact.
     *
     * For custom predicate function filters this might be useful.
     *
     */
    /**
     * Refresh the filters result.
     *
     * Note that this should only be used when using a predicate function filter and not the simple value filter.
     * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
     * has no impact.
     *
     * For custom predicate function filters this might be useful.
     *
     * @return {?}
     */
    PblDataSource.prototype.syncFilter = /**
     * Refresh the filters result.
     *
     * Note that this should only be used when using a predicate function filter and not the simple value filter.
     * In general the filter is refreshed every time it is set and each time the data is updated so manually refreshing a value filter
     * has no impact.
     *
     * For custom predicate function filters this might be useful.
     *
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentFilter = this._adapter.clearCache('filter');
        if (currentFilter) {
            this.setFilter(currentFilter.filter, currentFilter.columns);
        }
    };
    /**
     * @param {?=} column
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    PblDataSource.prototype.setSort = /**
     * @param {?=} column
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    function (column, sort, skipUpdate) {
        if (skipUpdate === void 0) { skipUpdate = false; }
        if (!column || typeof column === 'boolean') {
            this._sort$.next({ column: null, sort: {}, skipUpdate: !!column });
        }
        else {
            this._sort$.next({ column: column, sort: sort, skipUpdate: skipUpdate });
        }
    };
    /**
     * @return {?}
     */
    PblDataSource.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (!this._disposed) {
            UnRx.kill(this);
            this._adapter.dispose();
            this._onRenderDataChanging.complete();
            this._renderData$.complete();
            this._filter$.complete();
            this._sort$.complete();
            this._onError$.complete();
            this._disposed = true;
        }
    };
    /**
     * @param {?} cv
     * @return {?}
     */
    PblDataSource.prototype.disconnect = /**
     * @param {?} cv
     * @return {?}
     */
    function (cv) {
        this._lastRefresh = undefined;
        this._tableConnectionChange$.next(this._tableConnected = false);
        if (this.keepAlive === false) {
            this.dispose();
        }
    };
    /**
     * @param {?} cv
     * @return {?}
     */
    PblDataSource.prototype.connect = /**
     * @param {?} cv
     * @return {?}
     */
    function (cv) {
        if (this._disposed) {
            throw new Error('PblDataSource is disposed. Use `keepAlive` if you move datasource between tables.');
        }
        this._tableConnected = true;
        this._updateProcessingLogic(cv);
        this._tableConnectionChange$.next(this._tableConnected);
        return this._renderData$;
    };
    /**
     * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
     *
     * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
     * local to the rendered view and are translated to fit the entire source.
     *
     * Tp disable this behavior, set the `absolute` parameter to `true`
     */
    /**
     * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
     *
     * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
     * local to the rendered view and are translated to fit the entire source.
     *
     * Tp disable this behavior, set the `absolute` parameter to `true`
     * @param {?} fromIndex
     * @param {?} toIndex
     * @param {?=} absolute
     * @return {?}
     */
    PblDataSource.prototype.moveItem = /**
     * Move's an item (in the entire source) from one index to the other, pushing the item in the destination one item backwards.
     *
     * Note that if the rendered data is a subset of the entire source (i.e virtual scroll & range) the indices are considered
     * local to the rendered view and are translated to fit the entire source.
     *
     * Tp disable this behavior, set the `absolute` parameter to `true`
     * @param {?} fromIndex
     * @param {?} toIndex
     * @param {?=} absolute
     * @return {?}
     */
    function (fromIndex, toIndex, absolute) {
        if (absolute === void 0) { absolute = false; }
        if (absolute !== true && this._lastRange) {
            fromIndex = this._lastRange.start + fromIndex;
            toIndex = this._lastRange.start + toIndex;
        }
        if (this.length > 0) {
            moveItemInArray(this._source, fromIndex, toIndex);
            /** @type {?} */
            var data = this._lastRange
                ? this._source.slice(this._lastRange.start, this._lastRange.end)
                : this._source;
            this._renderData$.next(data);
        }
    };
    /**
     * @private
     * @param {?} cv
     * @return {?}
     */
    PblDataSource.prototype._updateProcessingLogic = /**
     * @private
     * @param {?} cv
     * @return {?}
     */
    function (cv) {
        var _this = this;
        /** @type {?} */
        var initialState = { filter: this.filter, sort: this.sort };
        /** @type {?} */
        var paginator = this._paginator;
        if (paginator) {
            initialState.pagination = { page: paginator.page, perPage: paginator.perPage };
        }
        /** @type {?} */
        var stream = this._adapter.updateProcessingLogic(this._filter$, this._sort$, paginator ? paginator.onChange : of(undefined), initialState);
        UnRx.kill(this, PROCESSING_SUBSCRIPTION_GROUP);
        /** @type {?} */
        var trimToRange = (/**
         * @param {?} range
         * @param {?} data
         * @return {?}
         */
        function (range, data) { return data.slice(range.start, range.end); });
        /** @type {?} */
        var skipViewChange;
        /** @type {?} */
        var lastEmittedSource;
        cv.viewChange
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
            .subscribe((/**
         * @param {?} range
         * @return {?}
         */
        function (range) {
            if (_this._lastRange && _this._lastRange.start === range.start && _this._lastRange.end === range.end) {
                return;
            }
            _this._lastRange = range;
            if (!skipViewChange) {
                if (range && lastEmittedSource && lastEmittedSource.length) {
                    _this._renderData$.next(trimToRange(_this._lastRange, lastEmittedSource));
                }
            }
        }));
        stream
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP), tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            lastEmittedSource = result.data;
            skipViewChange = true;
            _this._onRenderDataChanging.next(_this._lastAdapterEvent = result);
        })))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var data = _a.data;
            if (_this._lastRange && data && data.length) {
                data = trimToRange(_this._lastRange, data);
            }
            _this._renderData$.next(data);
            skipViewChange = false;
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { _this._onError$.next(error); }));
        this._adapter.onSourceChanged
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        function (source) { return _this._source = source || []; }));
        if (this._lastRefresh !== undefined) {
            this._adapter.refresh(this._lastRefresh);
            this._lastRefresh = undefined;
        }
        else if (!this.skipInitial) {
            // _refresh$ is a Subject, we must emit once so combineLatest will work
            this.refresh();
        }
    };
    return PblDataSource;
}(DataSource));
/**
 * @template T, TData
 */
export { PblDataSource };
if (false) {
    /**
     * An observable that emit events when an new incoming source is expected, before calling the trigger handler to get the new source.
     * This even is usually followed by the `onSourceChanged` event but not always. This is because the trigger handler
     * can cancel the operation (when it returns false) which means an `onSourceChanged` event will not fire.
     *
     * Emissions occur when the trigger handler is invoked and also when the trigger handler returned an observable and the observable emits.
     *
     * > Note that a micro-task delays is applied between the `onSourceChanging` subsequent `onSourceChanged` event (when emitted).
     * @type {?}
     */
    PblDataSource.prototype.onSourceChanging;
    /**
     * An observable that emit events when a new source has been received from the trigger handler but before any processing is applied.
     * Emissions occur when the trigger handler is invoked and also when the trigger handler returned an observable and the observable emits.
     *
     * Examples: Calling `refresh()`, filter / sort / pagination events.
     *
     * > Note that the `onSourceChanged` fired before the data is rendered ane before any client-side filter/sort/pagination are applied.
     * It only indicates that the source data-set is now updated and the grid is about to apply logic on the data-set and then render it.
     * @type {?}
     */
    PblDataSource.prototype.onSourceChanged;
    /**
     * An observable that emit events when new source has been received from the trigger handler and after it was processed.
     * Emissions will occur after `onSourceChanged` event has been fired.
     *
     * The main difference between `onSourceChanged` and `onRenderDataChanging` is local processing performed in the datasource.
     * These are usually client-side operations like filter/sort/pagination. If all of these events are handled manually (custom)
     * in the trigger handler then `onSourceChanged` and `onRenderDataChanging` have no difference.
     *
     * > Note that `onRenderDataChanging` and `onRenderedDataChanged` are not closely related as `onRenderedDataChanged` fires at
     * a much more rapid pace (virtual scroll). The name `onRenderDataChanging` might change in the future.
     * @type {?}
     */
    PblDataSource.prototype.onRenderDataChanging;
    /**
     * An observable that emit events when the grid is about to render data.
     * The rendered data is updated when the source changed or when the grid is in virtual scroll mode and the user is scrolling.
     *
     * Each emission reflects a change in the data that the grid is rendering.
     * @type {?}
     */
    PblDataSource.prototype.onRenderedDataChanged;
    /** @type {?} */
    PblDataSource.prototype.onError;
    /**
     * An event that fires when the connection state to a table has changed.
     * @type {?}
     */
    PblDataSource.prototype.tableConnectionChange;
    /** @type {?} */
    PblDataSource.prototype.sortChange;
    /**
     * When set to True will not disconnect upon table disconnection, otherwise unsubscribe from the
     * datasource when the table disconnects.
     * @type {?}
     */
    PblDataSource.prototype.keepAlive;
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     * @type {?}
     */
    PblDataSource.prototype.skipInitial;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._selection;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._tableConnectionChange$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._onRenderDataChanging;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._renderData$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._filter$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._sort$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._onError$;
    /**
     * @type {?}
     * @protected
     */
    PblDataSource.prototype._paginator;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._pagination;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._source;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._disposed;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._tableConnected;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._lastRefresh;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._lastRange;
    /**
     * @type {?}
     * @private
     */
    PblDataSource.prototype._lastAdapterEvent;
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLGVBQWUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBK0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXpELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckMsT0FBTyxFQUF1QyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOztJQU1yQyw2QkFBNkIsR0FBRyxFQUFFOzs7O0FBRXhDLDBDQVlDOzs7Ozs7SUFSQyx5Q0FBb0I7Ozs7Ozs7O0lBT3BCLDJDQUFzQjs7Ozs7QUFHeEI7Ozs7SUFBeUQseUNBQWE7SUFrSnBFLHVCQUFZLE9BQXVDLEVBQUUsT0FBOEI7UUFBbkYsWUFDRSxpQkFBTyxTQW9CUjtRQXhDa0IsZ0JBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsNkJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNqRCwyQkFBcUIsR0FBRyxJQUFJLE9BQU8sRUFBaUUsQ0FBQztRQUNyRyxrQkFBWSxHQUFHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLGNBQVEsR0FBc0MsSUFBSSxlQUFlLENBQW1CLFNBQVMsQ0FBQyxDQUFDO1FBQy9GLFlBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBeUQsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0ksZUFBUyxHQUFHLElBQUksT0FBTyxFQUFTLENBQUM7UUFlekMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFFeEIsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7UUFDdkQsNkRBQTZEO1FBQzdELEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlO2FBQ2xELElBQUksQ0FDSCxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLGlJQUFpSTtRQUM5SixLQUFLLENBQUMsU0FBUyxDQUFDLENBQ2pCLENBQUM7UUFDRixLQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RFLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdDLEtBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFekUsS0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQztRQUM1QyxLQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO1FBQ2hELEtBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7SUFDL0MsQ0FBQztJQXJLRCxzQkFBSSxxQ0FBVTs7OztRQUFkLGNBQWtELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzVFLFVBQWUsS0FBb0M7WUFDakQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3pCLFFBQVEsS0FBSyxFQUFFO29CQUNiLEtBQUssWUFBWTt3QkFDZixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQzt3QkFDM0MsTUFBTTtvQkFDUixLQUFLLE9BQU87d0JBQ1YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7d0JBQzFDLE1BQU07b0JBQ1I7d0JBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7d0JBQzVCLE1BQU07aUJBQ1Q7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzdDO2FBQ0Y7UUFDSCxDQUFDOzs7T0FuQjJFO0lBZ0Y1RSxzQkFBSSxrQ0FBTzs7OztRQUFYLGNBQXNDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzdELFVBQVksS0FBMkI7WUFDckMsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM3QzthQUNGO1FBQ0gsQ0FBQzs7O09BUjREO0lBQUEsQ0FBQztJQVk5RCxzQkFBSSx1Q0FBWTtRQUZoQixzQkFBc0I7UUFDdEIsZ0ZBQWdGOzs7Ozs7O1FBQ2hGLGNBQTBCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFakUsc0JBQUksc0NBQVc7UUFEZixzREFBc0Q7Ozs7O1FBQ3RELGNBQTRCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2pGLHNCQUFJLHVDQUFZOzs7O1FBQWhCLGNBQTZCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckUsc0JBQUksdUNBQVk7Ozs7UUFBaEIsY0FBMEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQVFqRSxzQkFBSSxxQ0FBVTtRQVBkOzs7Ozs7V0FNRzs7Ozs7Ozs7O1FBQ0gsY0FBd0IsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBU2xHLHNCQUFJLHVDQUFZO1FBUmhCOzs7Ozs7O1dBT0c7Ozs7Ozs7Ozs7UUFDSCxjQUEwQixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFFdEcsc0JBQUksaUNBQU07Ozs7UUFBVixjQUFpQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDOUQsc0JBQUksK0JBQUk7Ozs7UUFBUixjQUEyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDdEUsc0JBQUksb0NBQVM7Ozs7UUFBYixjQUFxQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU5RCxzQkFBSSxpQ0FBTTs7OztRQUFWLGNBQXVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNuRCxzQkFBSSxpQ0FBTTs7OztRQUFWLGNBQW9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUdoRCxzQkFBSSxvQ0FBUztRQURiLG9EQUFvRDs7Ozs7UUFDcEQsY0FBcUMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUE0QzlEOztPQUVHOzs7Ozs7SUFDSCwrQkFBTzs7Ozs7SUFBUCxVQUFRLElBQVk7UUFDbEIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7OztJQXFCRCxpQ0FBUzs7Ozs7SUFBVCxVQUFVLEtBQTZCLEVBQUUsT0FBcUI7UUFDNUQsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM5RSxNQUFNLElBQUksS0FBSyxDQUFDLG9GQUFvRixDQUFDLENBQUM7U0FDdkc7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7Ozs7Ozs7Ozs7OztJQUNILGtDQUFVOzs7Ozs7Ozs7OztJQUFWOztZQUNRLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDeEQsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7Ozs7Ozs7SUFnQkQsK0JBQU87Ozs7OztJQUFQLFVBQVEsTUFBNEIsRUFBRSxJQUE2QixFQUFFLFVBQWtCO1FBQWxCLDJCQUFBLEVBQUEsa0JBQWtCO1FBQ3JGLElBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxJQUFJLE1BQUEsRUFBRSxVQUFVLFlBQUEsRUFBRSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7O0lBRUQsK0JBQU87OztJQUFQO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxrQ0FBVTs7OztJQUFWLFVBQVcsRUFBb0I7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDOUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwrQkFBTzs7OztJQUFQLFVBQVEsRUFBb0I7UUFDMUIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUZBQW1GLENBQUMsQ0FBQztTQUN0RztRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO1FBQzNCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7Ozs7SUFDSCxnQ0FBUTs7Ozs7Ozs7Ozs7O0lBQVIsVUFBUyxTQUFpQixFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQUFoQix5QkFBQSxFQUFBLGdCQUFnQjtRQUMzRCxJQUFJLFFBQVEsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUN4QyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQzlDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDM0M7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTs7Z0JBQzNDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVTtnQkFDMUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUNoRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU87WUFFaEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7Ozs7SUFFTyw4Q0FBc0I7Ozs7O0lBQTlCLFVBQStCLEVBQW9CO1FBQW5ELGlCQWlFQzs7WUFoRU8sWUFBWSxHQUE4QyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFHLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFOztZQUNuRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7UUFDakMsSUFBSSxTQUFTLEVBQUU7WUFDYixZQUFZLENBQUMsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoRjs7WUFDSyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FDaEQsSUFBSSxDQUFDLFFBQVEsRUFDYixJQUFJLENBQUMsTUFBTSxFQUNYLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUM5QyxZQUFZLENBQ2I7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxDQUFBOztZQUV4QyxXQUFXOzs7OztRQUFHLFVBQUMsS0FBZ0IsRUFBRSxJQUFXLElBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFsQyxDQUFrQyxDQUFBOztZQUVyRixjQUF1Qjs7WUFDdkIsaUJBQXNCO1FBRTFCLEVBQUUsQ0FBQyxVQUFVO2FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsNkJBQTZCLENBQUMsQ0FBQzthQUMvQyxTQUFTOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ2YsSUFBSSxLQUFJLENBQUMsVUFBVSxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDakcsT0FBTzthQUNSO1lBQ0QsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsSUFBSSxLQUFLLElBQUksaUJBQWlCLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFO29CQUMxRCxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUVMLE1BQU07YUFDSCxJQUFJLENBQ0gsSUFBSSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxFQUN6QyxHQUFHOzs7O1FBQUUsVUFBQSxNQUFNO1lBQ1QsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNoQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ25FLENBQUMsRUFBQyxDQUNIO2FBQ0EsU0FBUzs7OztRQUNSLFVBQUMsRUFBTTtnQkFBTCxjQUFJO1lBQ0osSUFBSSxLQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxJQUFJLEdBQUcsV0FBVyxDQUFDLEtBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0M7WUFDRCxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7Ozs7UUFDRCxVQUFBLEtBQUssSUFBTSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUMsRUFDeEMsQ0FBQztRQUVKLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZTthQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO2FBQy9DLFNBQVM7Ozs7UUFBRSxVQUFBLE1BQU0sSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFJLEVBQUUsRUFBM0IsQ0FBMkIsRUFBRSxDQUFDO1FBRXRELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDNUIsdUVBQXVFO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUE5V0QsQ0FBeUQsVUFBVSxHQThXbEU7Ozs7Ozs7Ozs7Ozs7Ozs7SUE5VUMseUNBQTRDOzs7Ozs7Ozs7OztJQVU1Qyx3Q0FBMkM7Ozs7Ozs7Ozs7Ozs7SUFZM0MsNkNBQXlHOzs7Ozs7OztJQU96Ryw4Q0FBaUQ7O0lBQ2pELGdDQUFvQzs7Ozs7SUFJcEMsOENBQW9EOztJQUNwRCxtQ0FBOEQ7Ozs7OztJQU05RCxrQ0FBNEI7Ozs7Ozs7O0lBTzVCLG9DQUE4Qjs7Ozs7SUErQzlCLG1DQUFnRTs7Ozs7SUFDaEUsZ0RBQW9FOzs7OztJQUNwRSw4Q0FBd0g7Ozs7O0lBQ3hILHFDQUErRDs7Ozs7SUFDL0QsaUNBQWtIOzs7OztJQUNsSCwrQkFBeUo7Ozs7O0lBQ3pKLGtDQUEyQzs7Ozs7SUFFM0MsbUNBQXdDOzs7OztJQUV4QyxvQ0FBbUQ7Ozs7O0lBQ25ELGlDQUF1Qzs7Ozs7SUFDdkMsZ0NBQXFCOzs7OztJQUNyQixrQ0FBMkI7Ozs7O0lBQzNCLHdDQUFpQzs7Ozs7SUFDakMscUNBQTRCOzs7OztJQUM1QixtQ0FBOEI7Ozs7O0lBQzlCLDBDQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgb2YsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcFRvLCBza2lwLCBvYnNlcnZlT24sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwsIENvbGxlY3Rpb25WaWV3ZXIsIExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2dyaWQvY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBhZ2luYXRvcktpbmQsIFBibFBhZ2luYXRvciwgUGJsUGFnaW5nUGFnaW5hdG9yLCBQYmxUb2tlblBhZ2luYXRvciB9IGZyb20gJy4uL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBEYXRhU291cmNlUHJlZGljYXRlLCBEYXRhU291cmNlRmlsdGVyLCBEYXRhU291cmNlRmlsdGVyVG9rZW4sIFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGNyZWF0ZUZpbHRlciB9IGZyb20gJy4vZmlsdGVyaW5nJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2VBZGFwdGVyIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS1hZGFwdGVyJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGUsIFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50LCBQYmxEYXRhU291cmNlQWRhcHRlclByb2Nlc3NlZFJlc3VsdCB9IGZyb20gJy4vZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcyc7XG5cbmV4cG9ydCB0eXBlIERhdGFTb3VyY2VPZjxUPiA9IFRbXSB8IFByb21pc2U8VFtdPiB8IE9ic2VydmFibGU8VFtdPjtcblxuY29uc3QgUFJPQ0VTU0lOR19TVUJTQ1JJUFRJT05fR1JPVVAgPSB7fTtcblxuZXhwb3J0IGludGVyZmFjZSBQYmxEYXRhU291cmNlT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byBUcnVlIHdpbGwgbm90IGRpc2Nvbm5lY3QgdXBvbiB0YWJsZSBkaXNjb25uZWN0aW9uLCBvdGhlcndpc2UgZG9lcy5cbiAgICovXG4gIGtlZXBBbGl2ZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTa2lwIHRoZSBmaXJzdCB0cmlnZ2VyIGVtaXNzaW9uLlxuICAgKiBVc2UgdGhpcyBmb3IgbGF0ZSBiaW5kaW5nLCB1c3VhbGx5IHdpdGggYSBjYWxsIHRvIHJlZnJlc2goKSBvbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBvbmx5IHRoZSBpbnRlcm5hbCB0cmlnZ2VyIGNhbGwgaXMgc2tpcHBlZCwgYSBjdXN0b20gY2FsbHMgdG8gcmVmcmVzaCB3aWxsIGdvIHRocm91Z2hcbiAgICovXG4gIHNraXBJbml0aWFsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFBibERhdGFTb3VyY2U8VCA9IGFueSwgVERhdGEgPSBhbnk+IGV4dGVuZHMgRGF0YVNvdXJjZTxUPiB7XG5cbiAgZ2V0IHBhZ2luYXRpb24oKTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UgeyByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjsgfVxuICBzZXQgcGFnaW5hdGlvbih2YWx1ZTogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2UpIHtcbiAgICBpZiAodGhpcy5fcGFnaW5hdGlvbiAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3BhZ2luYXRpb24gPSB2YWx1ZTtcbiAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSAncGFnZU51bWJlcic6XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yID0gbmV3IFBibFBhZ2luZ1BhZ2luYXRvcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0b2tlbic6XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yID0gbmV3IFBibFRva2VuUGFnaW5hdG9yKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5fcGFnaW5hdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2FkYXB0ZXIpIHtcbiAgICAgICAgdGhpcy5fYWRhcHRlci5zZXRQYWdpbmF0b3IodGhpcy5fcGFnaW5hdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXQgZXZlbnRzIHdoZW4gYW4gbmV3IGluY29taW5nIHNvdXJjZSBpcyBleHBlY3RlZCwgYmVmb3JlIGNhbGxpbmcgdGhlIHRyaWdnZXIgaGFuZGxlciB0byBnZXQgdGhlIG5ldyBzb3VyY2UuXG4gICAqIFRoaXMgZXZlbiBpcyB1c3VhbGx5IGZvbGxvd2VkIGJ5IHRoZSBgb25Tb3VyY2VDaGFuZ2VkYCBldmVudCBidXQgbm90IGFsd2F5cy4gVGhpcyBpcyBiZWNhdXNlIHRoZSB0cmlnZ2VyIGhhbmRsZXJcbiAgICogY2FuIGNhbmNlbCB0aGUgb3BlcmF0aW9uICh3aGVuIGl0IHJldHVybnMgZmFsc2UpIHdoaWNoIG1lYW5zIGFuIGBvblNvdXJjZUNoYW5nZWRgIGV2ZW50IHdpbGwgbm90IGZpcmUuXG4gICAqXG4gICAqIEVtaXNzaW9ucyBvY2N1ciB3aGVuIHRoZSB0cmlnZ2VyIGhhbmRsZXIgaXMgaW52b2tlZCBhbmQgYWxzbyB3aGVuIHRoZSB0cmlnZ2VyIGhhbmRsZXIgcmV0dXJuZWQgYW4gb2JzZXJ2YWJsZSBhbmQgdGhlIG9ic2VydmFibGUgZW1pdHMuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IGEgbWljcm8tdGFzayBkZWxheXMgaXMgYXBwbGllZCBiZXR3ZWVuIHRoZSBgb25Tb3VyY2VDaGFuZ2luZ2Agc3Vic2VxdWVudCBgb25Tb3VyY2VDaGFuZ2VkYCBldmVudCAod2hlbiBlbWl0dGVkKS5cbiAgICovXG4gIHJlYWRvbmx5IG9uU291cmNlQ2hhbmdpbmc6IE9ic2VydmFibGU8dm9pZD47XG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdCBldmVudHMgd2hlbiBhIG5ldyBzb3VyY2UgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgdHJpZ2dlciBoYW5kbGVyIGJ1dCBiZWZvcmUgYW55IHByb2Nlc3NpbmcgaXMgYXBwbGllZC5cbiAgICogRW1pc3Npb25zIG9jY3VyIHdoZW4gdGhlIHRyaWdnZXIgaGFuZGxlciBpcyBpbnZva2VkIGFuZCBhbHNvIHdoZW4gdGhlIHRyaWdnZXIgaGFuZGxlciByZXR1cm5lZCBhbiBvYnNlcnZhYmxlIGFuZCB0aGUgb2JzZXJ2YWJsZSBlbWl0cy5cbiAgICpcbiAgICogRXhhbXBsZXM6IENhbGxpbmcgYHJlZnJlc2goKWAsIGZpbHRlciAvIHNvcnQgLyBwYWdpbmF0aW9uIGV2ZW50cy5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhlIGBvblNvdXJjZUNoYW5nZWRgIGZpcmVkIGJlZm9yZSB0aGUgZGF0YSBpcyByZW5kZXJlZCBhbmUgYmVmb3JlIGFueSBjbGllbnQtc2lkZSBmaWx0ZXIvc29ydC9wYWdpbmF0aW9uIGFyZSBhcHBsaWVkLlxuICAgKiBJdCBvbmx5IGluZGljYXRlcyB0aGF0IHRoZSBzb3VyY2UgZGF0YS1zZXQgaXMgbm93IHVwZGF0ZWQgYW5kIHRoZSBncmlkIGlzIGFib3V0IHRvIGFwcGx5IGxvZ2ljIG9uIHRoZSBkYXRhLXNldCBhbmQgdGhlbiByZW5kZXIgaXQuXG4gICAqL1xuICByZWFkb25seSBvblNvdXJjZUNoYW5nZWQ6IE9ic2VydmFibGU8dm9pZD47XG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdCBldmVudHMgd2hlbiBuZXcgc291cmNlIGhhcyBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIHRyaWdnZXIgaGFuZGxlciBhbmQgYWZ0ZXIgaXQgd2FzIHByb2Nlc3NlZC5cbiAgICogRW1pc3Npb25zIHdpbGwgb2NjdXIgYWZ0ZXIgYG9uU291cmNlQ2hhbmdlZGAgZXZlbnQgaGFzIGJlZW4gZmlyZWQuXG4gICAqXG4gICAqIFRoZSBtYWluIGRpZmZlcmVuY2UgYmV0d2VlbiBgb25Tb3VyY2VDaGFuZ2VkYCBhbmQgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBpcyBsb2NhbCBwcm9jZXNzaW5nIHBlcmZvcm1lZCBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICogVGhlc2UgYXJlIHVzdWFsbHkgY2xpZW50LXNpZGUgb3BlcmF0aW9ucyBsaWtlIGZpbHRlci9zb3J0L3BhZ2luYXRpb24uIElmIGFsbCBvZiB0aGVzZSBldmVudHMgYXJlIGhhbmRsZWQgbWFudWFsbHkgKGN1c3RvbSlcbiAgICogaW4gdGhlIHRyaWdnZXIgaGFuZGxlciB0aGVuIGBvblNvdXJjZUNoYW5nZWRgIGFuZCBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGhhdmUgbm8gZGlmZmVyZW5jZS5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBhbmQgYG9uUmVuZGVyZWREYXRhQ2hhbmdlZGAgYXJlIG5vdCBjbG9zZWx5IHJlbGF0ZWQgYXMgYG9uUmVuZGVyZWREYXRhQ2hhbmdlZGAgZmlyZXMgYXRcbiAgICogYSBtdWNoIG1vcmUgcmFwaWQgcGFjZSAodmlydHVhbCBzY3JvbGwpLiBUaGUgbmFtZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuICAgKi9cbiAgcmVhZG9ubHkgb25SZW5kZXJEYXRhQ2hhbmdpbmc6IE9ic2VydmFibGU8eyBldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGE+LCBkYXRhOiBUW10gfT47XG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdCBldmVudHMgd2hlbiB0aGUgZ3JpZCBpcyBhYm91dCB0byByZW5kZXIgZGF0YS5cbiAgICogVGhlIHJlbmRlcmVkIGRhdGEgaXMgdXBkYXRlZCB3aGVuIHRoZSBzb3VyY2UgY2hhbmdlZCBvciB3aGVuIHRoZSBncmlkIGlzIGluIHZpcnR1YWwgc2Nyb2xsIG1vZGUgYW5kIHRoZSB1c2VyIGlzIHNjcm9sbGluZy5cbiAgICpcbiAgICogRWFjaCBlbWlzc2lvbiByZWZsZWN0cyBhIGNoYW5nZSBpbiB0aGUgZGF0YSB0aGF0IHRoZSBncmlkIGlzIHJlbmRlcmluZy5cbiAgICovXG4gIHJlYWRvbmx5IG9uUmVuZGVyZWREYXRhQ2hhbmdlZDogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcmVhZG9ubHkgb25FcnJvcjogT2JzZXJ2YWJsZTxFcnJvcj47XG4gIC8qKlxuICAgKiBBbiBldmVudCB0aGF0IGZpcmVzIHdoZW4gdGhlIGNvbm5lY3Rpb24gc3RhdGUgdG8gYSB0YWJsZSBoYXMgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5IHRhYmxlQ29ubmVjdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcmVhZG9ubHkgc29ydENoYW5nZTogT2JzZXJ2YWJsZTxQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlPjtcblxuICAvKipcbiAgICogV2hlbiBzZXQgdG8gVHJ1ZSB3aWxsIG5vdCBkaXNjb25uZWN0IHVwb24gdGFibGUgZGlzY29ubmVjdGlvbiwgb3RoZXJ3aXNlIHVuc3Vic2NyaWJlIGZyb20gdGhlXG4gICAqIGRhdGFzb3VyY2Ugd2hlbiB0aGUgdGFibGUgZGlzY29ubmVjdHMuXG4gICAqL1xuICByZWFkb25seSBrZWVwQWxpdmU6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBTa2lwIHRoZSBmaXJzdCB0cmlnZ2VyIGVtaXNzaW9uLlxuICAgKiBVc2UgdGhpcyBmb3IgbGF0ZSBiaW5kaW5nLCB1c3VhbGx5IHdpdGggYSBjYWxsIHRvIHJlZnJlc2goKSBvbiB0aGUgZGF0YSBzb3VyY2UuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBvbmx5IHRoZSBpbnRlcm5hbCB0cmlnZ2VyIGNhbGwgaXMgc2tpcHBlZCwgYSBjdXN0b20gY2FsbHMgdG8gcmVmcmVzaCB3aWxsIGdvIHRocm91Z2hcbiAgICovXG4gIHJlYWRvbmx5IHNraXBJbml0aWFsOiBib29sZWFuO1xuXG4gIGdldCBhZGFwdGVyKCk6IFBibERhdGFTb3VyY2VBZGFwdGVyIHsgcmV0dXJuIHRoaXMuX2FkYXB0ZXI7IH07XG4gIHNldCBhZGFwdGVyKHZhbHVlOiBQYmxEYXRhU291cmNlQWRhcHRlcikge1xuICAgIGlmICh0aGlzLl9hZGFwdGVyICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYWRhcHRlciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMucGFnaW5hdGlvbikge1xuICAgICAgICB0aGlzLl9hZGFwdGVyLnNldFBhZ2luYXRvcih0aGlzLl9wYWdpbmF0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8oMS4wLjApOiByZW1vdmVcbiAgLyoqIEBkZXByZWNhdGVkIEJSRUFLSU5HIENIQU5HRTogcmVtb3ZlZCBpbiAxLjAuMCAtIFVzZSByZW5kZXJlZERhdGEgaW5zdGVhZC4gKi9cbiAgZ2V0IHJlbmRlcmVkUm93cygpOiBUW10geyByZXR1cm4gdGhpcy5fcmVuZGVyRGF0YSQudmFsdWUgfHwgW107IH1cbiAgLyoqIFJldHVybnMgdGhlIHN0YXJ0aW5nIGluZGV4IG9mIHRoZSByZW5kZXJlZCBkYXRhICovXG4gIGdldCByZW5kZXJTdGFydCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbGFzdFJhbmdlID8gdGhpcy5fbGFzdFJhbmdlLnN0YXJ0IDogMDsgfVxuICBnZXQgcmVuZGVyTGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yZW5kZXJEYXRhJC52YWx1ZS5sZW5ndGg7IH1cbiAgZ2V0IHJlbmRlcmVkRGF0YSgpOiBUW10geyByZXR1cm4gdGhpcy5fcmVuZGVyRGF0YSQudmFsdWUgfHwgW107IH1cbiAgLyoqXG4gICAqIFRoZSBgc291cmNlYCB3aXRoIHNvcnRpbmcgYXBwbGllZC5cbiAgICogVmFsaWQgb25seSB3aGVuIHNvcnRpbmcgaXMgcGVyZm9ybWVkIGNsaWVudC1zaWRlLlxuICAgKlxuICAgKiBUbyBnZXQgcmVhbC10aW1lIG5vdGlmaWNhdGlvbnMgdXNlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AuXG4gICAqIFRoZSBzb3J0ZWQgZGF0YSBpcyB1cGRhdGVkIGp1c3QgYmVmb3JlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgZmlyZS5cbiAgICovXG4gIGdldCBzb3J0ZWREYXRhKCk6IFRbXSB7IHJldHVybiAodGhpcy5fbGFzdEFkYXB0ZXJFdmVudCAmJiB0aGlzLl9sYXN0QWRhcHRlckV2ZW50LnNvcnRlZCkgfHwgW107IH07XG4gIC8qKlxuICAgKiBUaGUgYHNvdXJjZWAgd2l0aCBmaWx0ZXJpbmcgYXBwbGllZC5cbiAgICogVmFsaWQgb25seSB3aGVuIGZpbHRlcmluZyBpcyBwZXJmb3JtZWQgY2xpZW50LXNpZGUuXG4gICAqIElmIHNvcnRpbmcgaXMgYXBwbGllZCBhcyB3ZWxsLCB0aGUgZmlsdGVyZWQgcmVzdWx0cyBhcmUgYWxzbyBzb3J0ZWQuXG4gICAqXG4gICAqIFRvIGdldCByZWFsLXRpbWUgbm90aWZpY2F0aW9ucyB1c2UgYG9uUmVuZGVyRGF0YUNoYW5naW5nYC5cbiAgICogVGhlIGZpbHRlcmVkIGRhdGEgaXMgdXBkYXRlZCBqdXN0IGJlZm9yZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGZpcmUuXG4gICAqL1xuICBnZXQgZmlsdGVyZWREYXRhKCk6IFRbXSB7IHJldHVybiAodGhpcy5fbGFzdEFkYXB0ZXJFdmVudCAmJiB0aGlzLl9sYXN0QWRhcHRlckV2ZW50LmZpbHRlcmVkKSB8fCBbXTsgfTtcblxuICBnZXQgZmlsdGVyKCk6IERhdGFTb3VyY2VGaWx0ZXIgeyByZXR1cm4gdGhpcy5fZmlsdGVyJC52YWx1ZTsgfVxuICBnZXQgc29ydCgpOiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlIHsgcmV0dXJuIHRoaXMuX3NvcnQkLnZhbHVlOyB9XG4gIGdldCBwYWdpbmF0b3IoKTogUGJsUGFnaW5hdG9yPGFueT4geyByZXR1cm4gdGhpcy5fcGFnaW5hdG9yOyB9XG5cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5zb3VyY2UubGVuZ3RoOyB9XG4gIGdldCBzb3VyY2UoKTogVFtdIHsgcmV0dXJuIHRoaXMuX3NvdXJjZSB8fCBbXTsgfVxuXG4gIC8qKiBSZXByZXNlbnRzIHNlbGVjdGVkIGl0ZW1zIG9uIHRoZSBkYXRhIHNvdXJjZS4gKi9cbiAgZ2V0IHNlbGVjdGlvbigpOiBTZWxlY3Rpb25Nb2RlbDxUPiB7IHJldHVybiB0aGlzLl9zZWxlY3Rpb247IH1cblxuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NlbGVjdGlvbiA9IG5ldyBTZWxlY3Rpb25Nb2RlbDxUPih0cnVlLCBbXSk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfdGFibGVDb25uZWN0aW9uQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfb25SZW5kZXJEYXRhQ2hhbmdpbmcgPSBuZXcgU3ViamVjdDx7IGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxURGF0YT4sIGRhdGE6IFRbXSB9PigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3JlbmRlckRhdGEkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUW10+KFtdKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9maWx0ZXIkOiBCZWhhdmlvclN1YmplY3Q8RGF0YVNvdXJjZUZpbHRlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PERhdGFTb3VyY2VGaWx0ZXI+KHVuZGVmaW5lZCk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfc29ydCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UgJiB7IHNraXBVcGRhdGU6IGJvb2xlYW4gfT4oeyBjb2x1bW46IG51bGwsIHNvcnQ6IG51bGwsIHNraXBVcGRhdGU6IGZhbHNlIH0pO1xuICBwcm90ZWN0ZWQgX29uRXJyb3IkID0gbmV3IFN1YmplY3Q8RXJyb3I+KCk7XG5cbiAgcHJvdGVjdGVkIF9wYWdpbmF0b3I6IFBibFBhZ2luYXRvcjxhbnk+O1xuXG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlO1xuICBwcml2YXRlIF9hZGFwdGVyOiBQYmxEYXRhU291cmNlQWRhcHRlcjtcbiAgcHJpdmF0ZSBfc291cmNlOiBUW107XG4gIHByaXZhdGUgX2Rpc3Bvc2VkOiBib29sZWFuO1xuICBwcml2YXRlIF90YWJsZUNvbm5lY3RlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfbGFzdFJlZnJlc2g6IFREYXRhO1xuICBwcml2YXRlIF9sYXN0UmFuZ2U6IExpc3RSYW5nZTtcbiAgcHJpdmF0ZSBfbGFzdEFkYXB0ZXJFdmVudDogUGJsRGF0YVNvdXJjZUFkYXB0ZXJQcm9jZXNzZWRSZXN1bHQ8VCwgVERhdGE+O1xuXG4gIGNvbnN0cnVjdG9yKGFkYXB0ZXI6IFBibERhdGFTb3VyY2VBZGFwdGVyPFQsIFREYXRhPiwgb3B0aW9ucz86IFBibERhdGFTb3VyY2VPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIHRoaXMuYWRhcHRlciA9IGFkYXB0ZXI7XG5cbiAgICB0aGlzLm9uU291cmNlQ2hhbmdpbmcgPSB0aGlzLl9hZGFwdGVyLm9uU291cmNlQ2hhbmdpbmc7XG4gICAgLy8gZW1pdCBzb3VyY2UgY2hhbmdlZCBldmVudCBldmVyeSB0aW1lIGFkYXB0ZXIgZ2V0cyBuZXcgZGF0YVxuICAgIHRoaXMub25Tb3VyY2VDaGFuZ2VkID0gdGhpcy5hZGFwdGVyLm9uU291cmNlQ2hhbmdlZFxuICAgIC5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKGFzYXBTY2hlZHVsZXIsIDApLCAvLyBlbWl0IG9uIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgdHVybiAobWljcm8tdGFzaykgdG8gZW5zdXJlIGBvblNvdXJjZUNoYW5nZWRgIGVtaXNzaW9uIGluIGBfdXBkYXRlUHJvY2Vzc2luZ0xvZ2ljYCBydW4ncyBmaXJzdC5cbiAgICAgIG1hcFRvKHVuZGVmaW5lZClcbiAgICApO1xuICAgIHRoaXMub25SZW5kZXJEYXRhQ2hhbmdpbmcgPSB0aGlzLl9vblJlbmRlckRhdGFDaGFuZ2luZy5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLm9uUmVuZGVyZWREYXRhQ2hhbmdlZCA9IHRoaXMuX3JlbmRlckRhdGEkLnBpcGUoc2tpcCgxKSwgbWFwVG8odW5kZWZpbmVkKSk7XG4gICAgdGhpcy5vbkVycm9yID0gdGhpcy5fb25FcnJvciQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy50YWJsZUNvbm5lY3Rpb25DaGFuZ2UgPSB0aGlzLl90YWJsZUNvbm5lY3Rpb25DaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5rZWVwQWxpdmUgPSBvcHRpb25zLmtlZXBBbGl2ZSB8fCBmYWxzZTtcbiAgICB0aGlzLnNraXBJbml0aWFsID0gb3B0aW9ucy5za2lwSW5pdGlhbCB8fCBmYWxzZTtcbiAgICB0aGlzLnNvcnRDaGFuZ2UgPSB0aGlzLl9zb3J0JC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGN1c3RvbSB0cmlnZ2VyIHRoYXQgaW52b2tlcyBhIG1hbnVhbCBkYXRhIHNvdXJjZSBjaGFuZ2Ugd2l0aCB0aGUgcHJvdmlkZWQgZGF0YSB2YWx1ZSBpbiB0aGUgYGRhdGFgIHByb3BlcnR5IGF0IHRodCBldmVudC5cbiAgICovXG4gIHJlZnJlc2goZGF0YT86IFREYXRhKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RhYmxlQ29ubmVjdGVkKSB7XG4gICAgICB0aGlzLl9hZGFwdGVyLnJlZnJlc2goZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xhc3RSZWZyZXNoID0gZGF0YTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICovXG4gIHNldEZpbHRlcigpOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSBmdW5jdGlvbiBwcmVkaWNhdGUuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHdoZW4gdXNpbmcgYSBjdXN0b20gcHJlZGljYXRlIGZ1bmN0aW9uIGFsbCBsb2dpYyBpcyBwYXNzZWQgdG8gdGhlIHByZWRpY2F0ZSBhbmQgdGhlIGRhdGFzb3VyY2UgLyBncmlkIGRvZXMgbm90IGhhbmRsZSB0aGUgZmlsdGVyaW5nIHByb2Nlc3MuXG4gICAqIFRoaXMgbWVhbnMgdGhhdCBhbnkgY29sdW1uIHNwZWNpZmljIGZpbHRlciwgc2V0IGluIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgaXMgaWdub3JlZCwgaWYgeW91IHdhbnQgdG8gdGFrZSB0aGVzZSBmaWx0ZXJzIGludG8gY29uc2lkZXJhdGlvblxuICAgKiB1c2UgdGhlIGNvbHVtbiBpbnN0YW5jZSBwcm92aWRlZCB0byBpZGVudGlmeSBhbmQgdXNlIHRoZXNlIGZpbHRlcnMgKHRoZSBgZmlsdGVyYCBwcm9wZXJ0eSBpbiBgUGJsQ29sdW1uYCkuXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IERhdGFTb3VyY2VQcmVkaWNhdGUsIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIHZhbHVlIHRvIGNvbXBhcmUgd2l0aCBhbmQgYSBsaXN0IG9mIGNvbHVtbnMgd2l0aCB0aGUgdmFsdWVzIHRvIGNvbXBhcmUgdG8uXG4gICAqXG4gICAqIFdoZW4gYSBjb2x1bW4gaW5zdGFuY2UgaGFzIGEgc3BlY2lmaWMgcHJlZGljYXRlIHNldCAoYFBibENvbHVtbi5maWx0ZXJgKSB0aGVuIGl0IHdpbGwgYmUgdXNlZCwgb3RoZXJ3aXNlXG4gICAqIHRoZSBgZ2VuZXJpY0NvbHVtblByZWRpY2F0ZWAgd2lsbCBiZSB1c2VkLlxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBhbnksIGNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZDtcbiAgc2V0RmlsdGVyKHZhbHVlPzogRGF0YVNvdXJjZUZpbHRlclRva2VuLCBjb2x1bW5zPzogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmICghY29sdW1ucyB8fCBjb2x1bW5zLmxlbmd0aCA9PT0gMCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmaWx0ZXIgZGVmaW5pdGlvbnMsIGNvbHVtbnMgYXJlIG1hbmRhdG9yeSB3aGVuIHVzaW5nIGEgc2luZ2xlIHZhbHVlIGlucHV0LicpO1xuICAgIH1cbiAgICB0aGlzLl9maWx0ZXIkLm5leHQoY3JlYXRlRmlsdGVyKHZhbHVlLCBjb2x1bW5zIHx8IFtdKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaCB0aGUgZmlsdGVycyByZXN1bHQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgd2hlbiB1c2luZyBhIHByZWRpY2F0ZSBmdW5jdGlvbiBmaWx0ZXIgYW5kIG5vdCB0aGUgc2ltcGxlIHZhbHVlIGZpbHRlci5cbiAgICogSW4gZ2VuZXJhbCB0aGUgZmlsdGVyIGlzIHJlZnJlc2hlZCBldmVyeSB0aW1lIGl0IGlzIHNldCBhbmQgZWFjaCB0aW1lIHRoZSBkYXRhIGlzIHVwZGF0ZWQgc28gbWFudWFsbHkgcmVmcmVzaGluZyBhIHZhbHVlIGZpbHRlclxuICAgKiBoYXMgbm8gaW1wYWN0LlxuICAgKlxuICAgKiBGb3IgY3VzdG9tIHByZWRpY2F0ZSBmdW5jdGlvbiBmaWx0ZXJzIHRoaXMgbWlnaHQgYmUgdXNlZnVsLlxuICAgKlxuICAgKi9cbiAgc3luY0ZpbHRlcigpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50RmlsdGVyID0gdGhpcy5fYWRhcHRlci5jbGVhckNhY2hlKCdmaWx0ZXInKTtcbiAgICBpZiAoY3VycmVudEZpbHRlcikge1xuICAgICAgdGhpcy5zZXRGaWx0ZXIoY3VycmVudEZpbHRlci5maWx0ZXIsIGN1cnJlbnRGaWx0ZXIuY29sdW1ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IHNvcnQgZGVmaW5pdGlvbnMuXG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIHNvcnRpbmcgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICogQHBhcmFtIHNvcnRcbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KGNvbHVtbjogUGJsQ29sdW1uLCBzb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlPzogYm9vbGVhbik6IHZvaWQ7XG4gIHNldFNvcnQoY29sdW1uPzogUGJsQ29sdW1uIHwgYm9vbGVhbiwgc29ydD86IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghY29sdW1uIHx8IHR5cGVvZiBjb2x1bW4gPT09ICdib29sZWFuJykge1xuICAgICAgdGhpcy5fc29ydCQubmV4dCh7IGNvbHVtbjogbnVsbCwgc29ydDoge30sIHNraXBVcGRhdGU6ICEhY29sdW1uIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zb3J0JC5uZXh0KHsgY29sdW1uLCBzb3J0LCBza2lwVXBkYXRlIH0pO1xuICAgIH1cbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9kaXNwb3NlZCkge1xuICAgICAgVW5SeC5raWxsKHRoaXMpO1xuICAgICAgdGhpcy5fYWRhcHRlci5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9vblJlbmRlckRhdGFDaGFuZ2luZy5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5fcmVuZGVyRGF0YSQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX2ZpbHRlciQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX3NvcnQkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9vbkVycm9yJC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5fZGlzcG9zZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY3Y6IENvbGxlY3Rpb25WaWV3ZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9sYXN0UmVmcmVzaCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl90YWJsZUNvbm5lY3Rpb25DaGFuZ2UkLm5leHQodGhpcy5fdGFibGVDb25uZWN0ZWQgPSBmYWxzZSk7XG4gICAgaWYgKHRoaXMua2VlcEFsaXZlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5kaXNwb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgY29ubmVjdChjdjogQ29sbGVjdGlvblZpZXdlcik6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgaWYgKHRoaXMuX2Rpc3Bvc2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BibERhdGFTb3VyY2UgaXMgZGlzcG9zZWQuIFVzZSBga2VlcEFsaXZlYCBpZiB5b3UgbW92ZSBkYXRhc291cmNlIGJldHdlZW4gdGFibGVzLicpO1xuICAgIH1cbiAgICB0aGlzLl90YWJsZUNvbm5lY3RlZCA9IHRydWVcbiAgICB0aGlzLl91cGRhdGVQcm9jZXNzaW5nTG9naWMoY3YpO1xuICAgIHRoaXMuX3RhYmxlQ29ubmVjdGlvbkNoYW5nZSQubmV4dCh0aGlzLl90YWJsZUNvbm5lY3RlZCk7XG4gICAgcmV0dXJuIHRoaXMuX3JlbmRlckRhdGEkO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmUncyBhbiBpdGVtIChpbiB0aGUgZW50aXJlIHNvdXJjZSkgZnJvbSBvbmUgaW5kZXggdG8gdGhlIG90aGVyLCBwdXNoaW5nIHRoZSBpdGVtIGluIHRoZSBkZXN0aW5hdGlvbiBvbmUgaXRlbSBiYWNrd2FyZHMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB0aGUgcmVuZGVyZWQgZGF0YSBpcyBhIHN1YnNldCBvZiB0aGUgZW50aXJlIHNvdXJjZSAoaS5lIHZpcnR1YWwgc2Nyb2xsICYgcmFuZ2UpIHRoZSBpbmRpY2VzIGFyZSBjb25zaWRlcmVkXG4gICAqIGxvY2FsIHRvIHRoZSByZW5kZXJlZCB2aWV3IGFuZCBhcmUgdHJhbnNsYXRlZCB0byBmaXQgdGhlIGVudGlyZSBzb3VyY2UuXG4gICAqXG4gICAqIFRwIGRpc2FibGUgdGhpcyBiZWhhdmlvciwgc2V0IHRoZSBgYWJzb2x1dGVgIHBhcmFtZXRlciB0byBgdHJ1ZWBcbiAgICovXG4gIG1vdmVJdGVtKGZyb21JbmRleDogbnVtYmVyLCB0b0luZGV4OiBudW1iZXIsIGFic29sdXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoYWJzb2x1dGUgIT09IHRydWUgJiYgdGhpcy5fbGFzdFJhbmdlKSB7XG4gICAgICBmcm9tSW5kZXggPSB0aGlzLl9sYXN0UmFuZ2Uuc3RhcnQgKyBmcm9tSW5kZXg7XG4gICAgICB0b0luZGV4ID0gdGhpcy5fbGFzdFJhbmdlLnN0YXJ0ICsgdG9JbmRleDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICBtb3ZlSXRlbUluQXJyYXkodGhpcy5fc291cmNlLCBmcm9tSW5kZXgsIHRvSW5kZXgpXG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5fbGFzdFJhbmdlXG4gICAgICAgID8gdGhpcy5fc291cmNlLnNsaWNlKHRoaXMuX2xhc3RSYW5nZS5zdGFydCwgdGhpcy5fbGFzdFJhbmdlLmVuZClcbiAgICAgICAgOiB0aGlzLl9zb3VyY2VcbiAgICAgIDtcbiAgICAgIHRoaXMuX3JlbmRlckRhdGEkLm5leHQoZGF0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlUHJvY2Vzc2luZ0xvZ2ljKGN2OiBDb2xsZWN0aW9uVmlld2VyKTogdm9pZCB7XG4gICAgY29uc3QgaW5pdGlhbFN0YXRlOiBQYXJ0aWFsPFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU8VERhdGE+PiA9IHsgZmlsdGVyOiB0aGlzLmZpbHRlciwgIHNvcnQ6IHRoaXMuc29ydCB9O1xuICAgIGNvbnN0IHBhZ2luYXRvciA9IHRoaXMuX3BhZ2luYXRvcjtcbiAgICBpZiAocGFnaW5hdG9yKSB7XG4gICAgICBpbml0aWFsU3RhdGUucGFnaW5hdGlvbiA9IHsgcGFnZTogcGFnaW5hdG9yLnBhZ2UsIHBlclBhZ2U6IHBhZ2luYXRvci5wZXJQYWdlIH07XG4gICAgfVxuICAgIGNvbnN0IHN0cmVhbSA9IHRoaXMuX2FkYXB0ZXIudXBkYXRlUHJvY2Vzc2luZ0xvZ2ljKFxuICAgICAgdGhpcy5fZmlsdGVyJCxcbiAgICAgIHRoaXMuX3NvcnQkLFxuICAgICAgcGFnaW5hdG9yID8gcGFnaW5hdG9yLm9uQ2hhbmdlIDogb2YodW5kZWZpbmVkKSxcbiAgICAgIGluaXRpYWxTdGF0ZSxcbiAgICApO1xuXG4gICAgVW5SeC5raWxsKHRoaXMsIFBST0NFU1NJTkdfU1VCU0NSSVBUSU9OX0dST1VQKVxuXG4gICAgY29uc3QgdHJpbVRvUmFuZ2UgPSAocmFuZ2U6IExpc3RSYW5nZSwgZGF0YTogYW55W10pID0+IGRhdGEuc2xpY2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCkgO1xuXG4gICAgbGV0IHNraXBWaWV3Q2hhbmdlOiBib29sZWFuO1xuICAgIGxldCBsYXN0RW1pdHRlZFNvdXJjZTogVFtdO1xuXG4gICAgY3Yudmlld0NoYW5nZVxuICAgICAgLnBpcGUoVW5SeCh0aGlzLCBQUk9DRVNTSU5HX1NVQlNDUklQVElPTl9HUk9VUCkpXG4gICAgICAuc3Vic2NyaWJlKCByYW5nZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9sYXN0UmFuZ2UgJiYgdGhpcy5fbGFzdFJhbmdlLnN0YXJ0ID09PSByYW5nZS5zdGFydCAmJiB0aGlzLl9sYXN0UmFuZ2UuZW5kID09PSByYW5nZS5lbmQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGFzdFJhbmdlID0gcmFuZ2U7XG4gICAgICAgIGlmICghc2tpcFZpZXdDaGFuZ2UpIHtcbiAgICAgICAgICBpZiAocmFuZ2UgJiYgbGFzdEVtaXR0ZWRTb3VyY2UgJiYgbGFzdEVtaXR0ZWRTb3VyY2UubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJEYXRhJC5uZXh0KHRyaW1Ub1JhbmdlKHRoaXMuX2xhc3RSYW5nZSwgbGFzdEVtaXR0ZWRTb3VyY2UpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgc3RyZWFtXG4gICAgICAucGlwZShcbiAgICAgICAgVW5SeCh0aGlzLCBQUk9DRVNTSU5HX1NVQlNDUklQVElPTl9HUk9VUCksXG4gICAgICAgIHRhcCggcmVzdWx0ID0+IHtcbiAgICAgICAgICBsYXN0RW1pdHRlZFNvdXJjZSA9IHJlc3VsdC5kYXRhO1xuICAgICAgICAgIHNraXBWaWV3Q2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLl9vblJlbmRlckRhdGFDaGFuZ2luZy5uZXh0KHRoaXMuX2xhc3RBZGFwdGVyRXZlbnQgPSByZXN1bHQpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKHtkYXRhfSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9sYXN0UmFuZ2UgJiYgZGF0YSAmJiBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgZGF0YSA9IHRyaW1Ub1JhbmdlKHRoaXMuX2xhc3RSYW5nZSwgZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuX3JlbmRlckRhdGEkLm5leHQoZGF0YSk7XG4gICAgICAgICAgc2tpcFZpZXdDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4geyB0aGlzLl9vbkVycm9yJC5uZXh0KGVycm9yKSB9XG4gICAgICApO1xuXG4gICAgdGhpcy5fYWRhcHRlci5vblNvdXJjZUNoYW5nZWRcbiAgICAgIC5waXBlKFVuUngodGhpcywgUFJPQ0VTU0lOR19TVUJTQ1JJUFRJT05fR1JPVVApKVxuICAgICAgLnN1YnNjcmliZSggc291cmNlID0+IHRoaXMuX3NvdXJjZSA9IHNvdXJjZSB8fCBbXSApO1xuXG4gICAgaWYgKHRoaXMuX2xhc3RSZWZyZXNoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2FkYXB0ZXIucmVmcmVzaCh0aGlzLl9sYXN0UmVmcmVzaCk7XG4gICAgICB0aGlzLl9sYXN0UmVmcmVzaCA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLnNraXBJbml0aWFsKSB7XG4gICAgICAvLyBfcmVmcmVzaCQgaXMgYSBTdWJqZWN0LCB3ZSBtdXN0IGVtaXQgb25jZSBzbyBjb21iaW5lTGF0ZXN0IHdpbGwgd29ya1xuICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgfVxuICB9XG59XG5cbiJdfQ==