/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject, combineLatest, of, from, isObservable, asapScheduler } from 'rxjs';
import { filter, map, switchMap, tap, debounceTime, observeOn } from 'rxjs/operators';
import { filter as filteringFn } from './filtering';
import { applySort } from './sorting';
import { createChangeContainer, fromRefreshDataWrapper, EMPTY } from './data-source-adapter.helpers';
/** @type {?} */
var CUSTOM_BEHAVIOR_TRIGGER_KEYS = ['sort', 'filter', 'pagination'];
/** @type {?} */
var TRIGGER_KEYS = tslib_1.__spread(CUSTOM_BEHAVIOR_TRIGGER_KEYS, ['data']);
/** @type {?} */
var SOURCE_CHANGING_TOKEN = {};
var ɵ0 = EMPTY;
/** @type {?} */
var DEFAULT_INITIAL_CACHE_STATE = { filter: EMPTY, sort: EMPTY, pagination: {}, data: ɵ0 };
/**
 * An adapter that handles changes
 * @template T, TData
 */
var /**
 * An adapter that handles changes
 * @template T, TData
 */
PblDataSourceAdapter = /** @class */ (function () {
    /**
     * A Data Source adapter contains flow logic for the datasource and subsequent emissions of datasource instances.
     * The logic is determined by the combination of the config object and the sourceFactory provided to this adapter, making this adapter actually a container.
     *
     * There are 4 triggers that are responsible for datasource emissions, when one of them is triggered it will invoke the `sourceFactory`
     * returning a new datasource, i.e. a new datasource emission.
     *
     * The triggers are: filter, sort, pagination and refresh.
     *
     * The refresh trigger does not effect the input sent to the `sourceFactory` function, it is just a mean to initiate a call to create a new
     * datasource without changing previous flow variables.
     * It's important to note that calling `sourceFactory` with the same input 2 or more times does not guarantee identical response. For example
     * calling a remote server that might change it's data between calls.
     *
     * All other triggers (3) will change the input sent to the `sourceFactory` function which will use them to return a datasource.
     *
     * The input sent to `sourceFactory` is the values that each of the 3 triggers yields, when one trigger changes a new value for it is sent
     * and the last values of the other 2 triggers is sent with it. i.e. the combination of the last known value for all 3 triggers is sent.
     *
     * To enable smart caching and data management `sourceFactory` does not get the raw values of each trigger. `sourceFactory` will get
     * an event object that contains metadata about each trigger, whether it triggered the change or not as well as old and new values.
     *
     * The returned value from `sourceFactory` is then used as the datasource, applying all triggers that are not overridden by the user.
     * The returned value of `sourceFactory` can be a `DataSourceOf` or `false`.
     *   - `DataSourceOf` means a valid datasource, either observable/promise of array or an array.
     *   - `false` means skip, returning false will instruct the adapter to skip execution for this trigger cycle.
     *
     * Using a trigger is a binary configuration option, when a trigger is turned on it means that changes to it will be passed to the `sourceFactory`.
     * When a trigger is turned off it is not listened to and `undefined` will be sent as a value for it to the `sourceFactory`.
     *
     * The adapter comes with built in flow logic for all 3 triggers, when a trigger is turned off the adapter will take the result of `sourceFactory` and
     * apply the default behavior to it.
     *
     * For all triggers, the default behavior means client implementation. For filtering, client side filtering. For sorting, client side sorting.
     * For Pagination, client side pagination.
     *
     * You can opt in to one or more triggers and implement your own behavior inside the `sourceFactory`
     * @param sourceFactory - A function that returns the datasource based on flow instructions.
     * The instructions are optional, they might or might not exist depending on the configuration of the adapter.
     * When `sourceFactory` returns false the entire trigger cycle is skipped.
     * @param config - A configuration object describing how this adapter should behave.
     */
    function PblDataSourceAdapter(sourceFactory, config) {
        this.sourceFactory = sourceFactory;
        this.config = Object.assign({}, config || {});
        this.initStreams();
    }
    /**
     * @return {?}
     */
    PblDataSourceAdapter.prototype.dispose = /**
     * @return {?}
     */
    function () {
        this._refresh$.complete();
        this._onSourceChange$.complete();
    };
    /**
     * @param {?=} data
     * @return {?}
     */
    PblDataSourceAdapter.prototype.refresh = /**
     * @param {?=} data
     * @return {?}
     */
    function (data) {
        this._refresh$.next({ data: data });
    };
    /**
     * Clears the cache from any existing datasource trigger such as filter, sort etc.
     * @returns The cached value or null if not there.
     */
    /**
     * Clears the cache from any existing datasource trigger such as filter, sort etc.
     * @template P
     * @param {?} cacheKey
     * @return {?} The cached value or null if not there.
     */
    PblDataSourceAdapter.prototype.clearCache = /**
     * Clears the cache from any existing datasource trigger such as filter, sort etc.
     * @template P
     * @param {?} cacheKey
     * @return {?} The cached value or null if not there.
     */
    function (cacheKey) {
        if (cacheKey in this.cache) {
            /** @type {?} */
            var prev = this.cache[cacheKey];
            this.cache[cacheKey] = DEFAULT_INITIAL_CACHE_STATE[cacheKey];
            return prev;
        }
        else {
            return null;
        }
    };
    /**
     * @param {?} paginator
     * @return {?}
     */
    PblDataSourceAdapter.prototype.setPaginator = /**
     * @param {?} paginator
     * @return {?}
     */
    function (paginator) {
        this.paginator = paginator;
    };
    /**
     * @param {?} filter$
     * @param {?} sort$
     * @param {?} pagination$
     * @param {?=} initialState
     * @return {?}
     */
    PblDataSourceAdapter.prototype.updateProcessingLogic = /**
     * @param {?} filter$
     * @param {?} sort$
     * @param {?} pagination$
     * @param {?=} initialState
     * @return {?}
     */
    function (filter$, sort$, pagination$, initialState) {
        var _this = this;
        if (initialState === void 0) { initialState = {}; }
        /** @type {?} */
        var updates = -1;
        /** @type {?} */
        var changedFilter = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return updates === -1 || e.changed; });
        /** @type {?} */
        var skipUpdate = (/**
         * @param {?} o
         * @return {?}
         */
        function (o) { return o.skipUpdate !== true; });
        this._lastSource = undefined;
        this.cache = tslib_1.__assign({}, DEFAULT_INITIAL_CACHE_STATE, initialState);
        /** @type {?} */
        var combine = [
            filter$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return createChangeContainer('filter', value, _this.cache); })), filter(changedFilter)),
            sort$.pipe(filter(skipUpdate), map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return createChangeContainer('sort', value, _this.cache); })), filter(changedFilter)),
            pagination$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return createChangeContainer('pagination', value, _this.cache); })), filter(changedFilter)),
            this._refresh$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return fromRefreshDataWrapper(createChangeContainer('data', value, _this.cache)); })), filter(changedFilter)),
        ];
        /** @type {?} */
        var hasCustomBehavior = CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return !!_this.config[key]; }));
        return combineLatest(combine[0], combine[1], combine[2], combine[3])
            .pipe(
        // Defer to next loop cycle, until no more incoming.
        // We use an async schedular here (instead of asapSchedular) because we want to have the largest debounce window without compromising integrity
        // With an async schedular we know we will run after all micro-tasks but before "real" async operations.
        debounceTime(0), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 4), filter = _b[0], sort = _b[1], pagination = _b[2], data = _b[3];
            updates++; // if first, will be 0 now (starts from -1).
            // if first, will be 0 now (starts from -1).
            /** @type {?} */
            var event = {
                filter: filter,
                sort: sort,
                pagination: pagination,
                data: data,
                isInitial: updates === 0,
                updateTotalLength: (/**
                 * @param {?} totalLength
                 * @return {?}
                 */
                function (totalLength) {
                    if (_this.paginator) {
                        _this.paginator.total = totalLength;
                    }
                })
            };
            /** @type {?} */
            var runHandle = data.changed
                || (hasCustomBehavior && CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return !!_this.config[k] && event[k].changed; })));
            if (runHandle) {
                return _this.runHandle(event).pipe(tap((/**
                 * @return {?}
                 */
                function () { return event.data.changed = true; })), // if the user didn't return "false" from his handler, we infer data was changed!
                map((/**
                 * @param {?} data
                 * @return {?}
                 */
                function (data) { return ({ event: event, data: data }); })));
            }
            else {
                return of({ event: event, data: _this._lastSource });
            }
        })), map((/**
         * @param {?} response
         * @return {?}
         */
        function (response) {
            var e_1, _a, e_2, _b;
            /** @type {?} */
            var config = _this.config;
            /** @type {?} */
            var event = response.event;
            // mark which of the triggers has changes
            // The logic is based on the user's configuration and the incoming event
            /** @type {?} */
            var withChanges = {};
            try {
                for (var CUSTOM_BEHAVIOR_TRIGGER_KEYS_1 = tslib_1.__values(CUSTOM_BEHAVIOR_TRIGGER_KEYS), CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.next(); !CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.done; CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.next()) {
                    var key = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.value;
                    if (!config[key] && (event.isInitial || event[key].changed)) {
                        withChanges[key] = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1 && !CUSTOM_BEHAVIOR_TRIGGER_KEYS_1_1.done && (_a = CUSTOM_BEHAVIOR_TRIGGER_KEYS_1.return)) _a.call(CUSTOM_BEHAVIOR_TRIGGER_KEYS_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // When data changed, apply some logic (caching, operational, etc...)
            if (event.data.changed) {
                // cache the data when it has changed.
                _this._lastSource = response.data;
                if (config.sort) {
                    // When the user is sorting (i.e. server sorting), the last sort cached is always the last source we get from the user.
                    _this._lastSortedSource = _this._lastSource;
                }
                else {
                    // When user is NOT sorting (we sort locally) AND the data has changed we need to apply sorting on it
                    // this might already be true (if sorting was the trigger)...
                    withChanges.sort = true;
                    // because we sort and then filter, filtering updates are also triggered by sort updated
                    withChanges.filter = true;
                }
                if (config.filter) {
                    // When the user is filtering (i.e. server filtering), the last filter cached is always the last source we get from the user.
                    _this._lastFilteredSource = _this._lastSource;
                }
                else {
                    // When user is NOT filtering (we filter locally) AND the data has changed we need to apply filtering on it
                    // this might already be true (if filtering was the trigger)...
                    withChanges.filter = true;
                }
            }
            // When user is NOT applying pagination (we paginate locally) AND if we (sort OR filter) locally we also need to paginate locally
            if (!config.pagination && (withChanges.sort || withChanges.filter)) {
                withChanges.pagination = true;
            }
            // Now, apply: sort --> filter --> pagination     ( ORDER MATTERS!!! )
            if (withChanges.sort) {
                _this._lastSortedSource = _this.applySort(_this._lastSource, event.sort.curr || event.sort.prev);
            }
            /** @type {?} */
            var data = _this._lastSortedSource;
            // we check if filter was asked, but also if we have a filter we re-run
            // Only sorting is cached at this point filtering is always calculated
            if (withChanges.filter || (event.filter.curr && event.filter.curr.filter)) {
                data = _this._lastFilteredSource = _this.applyFilter(data, event.filter.curr || event.filter.prev);
            }
            if (withChanges.pagination) {
                data = _this.applyPagination(data);
            }
            /** @type {?} */
            var clonedEvent = tslib_1.__assign({}, event);
            try {
                // We use `combineLatest` which caches pervious events, only new events are replaced.
                // We need to mark everything as NOT CHANGED, so subsequent calls will not have their changed flag set to true.
                //
                // We also clone the object so we can pass on the proper values.
                // We create shallow clones so complex objects (column in sort, user data in data) will not throw on circular.
                // For pagination we deep clone because it contains primitives and we need to also clone the internal change objects.
                for (var TRIGGER_KEYS_1 = tslib_1.__values(TRIGGER_KEYS), TRIGGER_KEYS_1_1 = TRIGGER_KEYS_1.next(); !TRIGGER_KEYS_1_1.done; TRIGGER_KEYS_1_1 = TRIGGER_KEYS_1.next()) {
                    var k = TRIGGER_KEYS_1_1.value;
                    clonedEvent[k] = k === 'pagination'
                        ? JSON.parse(JSON.stringify(event[k]))
                        : tslib_1.__assign({}, event[k]);
                    event[k].changed = false;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (TRIGGER_KEYS_1_1 && !TRIGGER_KEYS_1_1.done && (_b = TRIGGER_KEYS_1.return)) _b.call(TRIGGER_KEYS_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            event.pagination.page.changed = event.pagination.perPage.changed = false;
            return {
                event: clonedEvent,
                data: data,
                sorted: _this._lastSortedSource,
                filtered: _this._lastFilteredSource,
            };
        })));
    };
    /**
     * @protected
     * @param {?} data
     * @param {?} dataSourceFilter
     * @return {?}
     */
    PblDataSourceAdapter.prototype.applyFilter = /**
     * @protected
     * @param {?} data
     * @param {?} dataSourceFilter
     * @return {?}
     */
    function (data, dataSourceFilter) {
        data = filteringFn(data, dataSourceFilter);
        if (!this.config.pagination) {
            this.resetPagination(data.length);
        }
        return data;
    };
    /**
     * @protected
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    PblDataSourceAdapter.prototype.applySort = /**
     * @protected
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    function (data, event) {
        return applySort(event.column, event.sort, data);
    };
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    PblDataSourceAdapter.prototype.applyPagination = /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (this.paginator) {
            // Set the rendered rows length to the virtual page size. Fill in the data provided
            // from the index start until the end index or pagination size, whichever is smaller.
            /** @type {?} */
            var range = this.paginator.range;
            return data.slice(range[0], range[1]);
        }
        return data;
    };
    /**
     * @protected
     * @param {?} totalLength
     * @return {?}
     */
    PblDataSourceAdapter.prototype.resetPagination = /**
     * @protected
     * @param {?} totalLength
     * @return {?}
     */
    function (totalLength) {
        if (this.paginator) {
            this.paginator.total = totalLength;
            this.paginator.page = totalLength > 0 ? 1 : 0;
        }
    };
    /* Note:  Currently this is only used in the constructor.
              However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
              `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
              Because the API is public it will probably won't work so the best solution might be to switch
              `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
    /* Note:  Currently this is only used in the constructor.
                However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                Because the API is public it will probably won't work so the best solution might be to switch
                `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
    /**
     * @private
     * @return {?}
     */
    PblDataSourceAdapter.prototype.initStreams = /* Note:  Currently this is only used in the constructor.
                However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                Because the API is public it will probably won't work so the best solution might be to switch
                `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
    /**
     * @private
     * @return {?}
     */
    function () {
        this._onSourceChange$ = new Subject();
        this.onSourceChanged = this._onSourceChange$.pipe(filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d !== SOURCE_CHANGING_TOKEN; })));
        this.onSourceChanging = this._onSourceChange$.pipe(filter((/**
         * @param {?} d
         * @return {?}
         */
        function (d) { return d === SOURCE_CHANGING_TOKEN; })));
        this._refresh$ = new Subject();
        this._lastSource = undefined;
    };
    /**
     * Execute the user-provided function that returns the data collection.
     * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
     * This is where all cache logic is managed (createChangeContainer).
     *
     * To build a data collection the information from all triggers is required, even if it was not changed.
     * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
     * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
     * data without doing redundant work.
     * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
     * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
     *
     * The handler can return several data structures, observable, promise, array or false.
     * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
     *
     * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
     * a dead-end observable is returned (observable that will never emit).
     */
    /**
     * Execute the user-provided function that returns the data collection.
     * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
     * This is where all cache logic is managed (createChangeContainer).
     *
     * To build a data collection the information from all triggers is required, even if it was not changed.
     * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
     * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
     * data without doing redundant work.
     * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
     * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
     *
     * The handler can return several data structures, observable, promise, array or false.
     * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
     *
     * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
     * a dead-end observable is returned (observable that will never emit).
     * @private
     * @param {?} event
     * @return {?}
     */
    PblDataSourceAdapter.prototype.runHandle = /**
     * Execute the user-provided function that returns the data collection.
     * This method wraps each of the triggers with a container providing metadata for the trigger. (Old value, was changed? and new value if changed)
     * This is where all cache logic is managed (createChangeContainer).
     *
     * To build a data collection the information from all triggers is required, even if it was not changed.
     * When a trigger is fired with a new value the new value replaces the old value for the trigger and all other triggers will keep their old value.
     * Sending the triggers to the handlers is not enough, we also need to the handlers which of the trigger's have change so they can return
     * data without doing redundant work.
     * For example, fetching paginated data from the server requires a call whenever the pages changes but if the filtering is local for the current page
     * and the filter trigger is fired the handler needs to know that pagination did not change so it will not go and fetch data from the server.
     *
     * The handler can return several data structures, observable, promise, array or false.
     * This method will normalize the response into an observable and notify that the source changed (onSourceChanged).
     *
     * When the response is false that handler wants to skip this cycle, this means that onSourceChanged will not emit and
     * a dead-end observable is returned (observable that will never emit).
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        this._onSourceChange$.next(SOURCE_CHANGING_TOKEN);
        /** @type {?} */
        var result = this.sourceFactory(event);
        if (result === false) {
            return (/** @type {?} */ (of(false).pipe(filter((/**
             * @return {?}
             */
            function () { return false; }))))); // stop emissions if got false.
        }
        /** @type {?} */
        var obs = isObservable(result)
            ? result
            : Array.isArray(result)
                ? of(result)
                : from(result) // promise...
        ;
        return obs.pipe(
        // run as a micro-task
        observeOn(asapScheduler, 0), map((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return Array.isArray(data) ? data : []; })), tap((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this._onSourceChange$.next(data); })));
    };
    return PblDataSourceAdapter;
}());
/**
 * An adapter that handles changes
 * @template T, TData
 */
export { PblDataSourceAdapter };
if (false) {
    /** @type {?} */
    PblDataSourceAdapter.prototype.onSourceChanged;
    /** @type {?} */
    PblDataSourceAdapter.prototype.onSourceChanging;
    /**
     * @type {?}
     * @protected
     */
    PblDataSourceAdapter.prototype.paginator;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype.config;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype.cache;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._onSourceChange$;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._refresh$;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._lastSource;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._lastSortedSource;
    /**
     * @type {?}
     * @private
     */
    PblDataSourceAdapter.prototype._lastFilteredSource;
    /** @type {?} */
    PblDataSourceAdapter.prototype.sourceFactory;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsYUFBYSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt0RixPQUFPLEVBQUUsTUFBTSxJQUFJLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBWXRDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxLQUFLLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7SUFFL0YsNEJBQTRCLEdBQW1ELENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUM7O0lBQy9HLFlBQVksb0JBQTJDLDRCQUE0QixHQUFFLE1BQU0sRUFBQzs7SUFDNUYscUJBQXFCLEdBQUcsRUFBRTtTQUV3RixLQUFLOztJQUF2SCwyQkFBMkIsR0FBbUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLElBQU8sRUFBRTs7Ozs7QUFLL0g7Ozs7O0lBYUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUNHO0lBQ0gsOEJBQW1CLGFBQXFGLEVBQzVGLE1BQWtGO1FBRDNFLGtCQUFhLEdBQWIsYUFBYSxDQUF3RTtRQUV0RyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENB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TUFBTSxDQUFDLENBQUMsYUFBYTs7UUFHaEMsT0FBTyxHQUFHLENBQUMsSUFBSTtRQUNiLHNCQUFzQjtRQUN0QixTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUMzQixHQUFHOzs7O1FBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBL0IsQ0FBK0IsRUFBRSxFQUM5QyxHQUFHOzs7O1FBQUUsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFoQyxDQUFnQyxFQUFFLENBQ2hELENBQUM7SUFDSixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBL1RELElBK1RDOzs7Ozs7OztJQTlUQywrQ0FBaUM7O0lBQ2pDLGdEQUFtQzs7Ozs7SUFFbkMseUNBQXdDOzs7OztJQUN4QyxzQ0FBMkY7Ozs7O0lBQzNGLHFDQUFnRDs7Ozs7SUFDaEQsZ0RBQTZDOzs7OztJQUM3Qyx5Q0FBc0Q7Ozs7O0lBQ3RELDJDQUF5Qjs7Ozs7SUFDekIsaURBQStCOzs7OztJQUMvQixtREFBaUM7O0lBNENyQiw2Q0FBNEYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBvZiwgZnJvbSwgaXNPYnNlcnZhYmxlLCBhc2FwU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YXAsIGRlYm91bmNlVGltZSwgb2JzZXJ2ZU9uIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBEYXRhU291cmNlT2YgfSBmcm9tICcuL2RhdGEtc291cmNlJztcbmltcG9ydCB7IFBibFBhZ2luYXRvciwgUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQgfSBmcm9tICcuLi9wYWdpbmF0b3InO1xuaW1wb3J0IHsgUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSwgRGF0YVNvdXJjZUZpbHRlciB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgZmlsdGVyIGFzIGZpbHRlcmluZ0ZuIH0gZnJvbSAnLi9maWx0ZXJpbmcnO1xuaW1wb3J0IHsgYXBwbHlTb3J0IH0gZnJvbSAnLi9zb3J0aW5nJztcblxuaW1wb3J0IHtcbiAgUmVmcmVzaERhdGFXcmFwcGVyLFxuICBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnMsXG4gIFBibERhdGFTb3VyY2VUcmlnZ2VycyxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZSxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQsXG4gIFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3IsXG4gIFBibERhdGFTb3VyY2VBZGFwdGVyUHJvY2Vzc2VkUmVzdWx0LFxufSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXIudHlwZXMnO1xuXG5pbXBvcnQgeyBjcmVhdGVDaGFuZ2VDb250YWluZXIsIGZyb21SZWZyZXNoRGF0YVdyYXBwZXIsIEVNUFRZIH0gZnJvbSAnLi9kYXRhLXNvdXJjZS1hZGFwdGVyLmhlbHBlcnMnO1xuXG5jb25zdCBDVVNUT01fQkVIQVZJT1JfVFJJR0dFUl9LRVlTOiBBcnJheTxrZXlvZiBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnM+ID0gWydzb3J0JywgJ2ZpbHRlcicsICdwYWdpbmF0aW9uJ107XG5jb25zdCBUUklHR0VSX0tFWVM6IEFycmF5PGtleW9mIFBibERhdGFTb3VyY2VUcmlnZ2Vycz4gPSBbLi4uQ1VTVE9NX0JFSEFWSU9SX1RSSUdHRVJfS0VZUywgJ2RhdGEnXTtcbmNvbnN0IFNPVVJDRV9DSEFOR0lOR19UT0tFTiA9IHt9O1xuXG5jb25zdCBERUZBVUxUX0lOSVRJQUxfQ0FDSEVfU1RBVEU6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU8YW55PiA9IHsgZmlsdGVyOiBFTVBUWSwgc29ydDogRU1QVFksIHBhZ2luYXRpb246IHt9LCBkYXRhOiBFTVBUWSB9O1xuXG4vKipcbiAqIEFuIGFkYXB0ZXIgdGhhdCBoYW5kbGVzIGNoYW5nZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFBibERhdGFTb3VyY2VBZGFwdGVyPFQgPSBhbnksIFREYXRhID0gYW55PiB7XG4gIG9uU291cmNlQ2hhbmdlZDogT2JzZXJ2YWJsZTxUW10+O1xuICBvblNvdXJjZUNoYW5naW5nOiBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4gIHByb3RlY3RlZCBwYWdpbmF0b3I/OiBQYmxQYWdpbmF0b3I8YW55PjtcbiAgcHJpdmF0ZSByZWFkb25seSBjb25maWc6IFBhcnRpYWw8UmVjb3JkPGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycywgYm9vbGVhbj4+O1xuICBwcml2YXRlIGNhY2hlOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFREYXRhPjtcbiAgcHJpdmF0ZSBfb25Tb3VyY2VDaGFuZ2UkOiBTdWJqZWN0PGFueSB8IFRbXT47XG4gIHByaXZhdGUgX3JlZnJlc2gkOiBTdWJqZWN0PFJlZnJlc2hEYXRhV3JhcHBlcjxURGF0YT4+O1xuICBwcml2YXRlIF9sYXN0U291cmNlOiBUW107XG4gIHByaXZhdGUgX2xhc3RTb3J0ZWRTb3VyY2U6IFRbXTtcbiAgcHJpdmF0ZSBfbGFzdEZpbHRlcmVkU291cmNlOiBUW107XG5cbiAgLyoqXG4gICAqIEEgRGF0YSBTb3VyY2UgYWRhcHRlciBjb250YWlucyBmbG93IGxvZ2ljIGZvciB0aGUgZGF0YXNvdXJjZSBhbmQgc3Vic2VxdWVudCBlbWlzc2lvbnMgb2YgZGF0YXNvdXJjZSBpbnN0YW5jZXMuXG4gICAqIFRoZSBsb2dpYyBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBjb21iaW5hdGlvbiBvZiB0aGUgY29uZmlnIG9iamVjdCBhbmQgdGhlIHNvdXJjZUZhY3RvcnkgcHJvdmlkZWQgdG8gdGhpcyBhZGFwdGVyLCBtYWtpbmcgdGhpcyBhZGFwdGVyIGFjdHVhbGx5IGEgY29udGFpbmVyLlxuICAgKlxuICAgKiBUaGVyZSBhcmUgNCB0cmlnZ2VycyB0aGF0IGFyZSByZXNwb25zaWJsZSBmb3IgZGF0YXNvdXJjZSBlbWlzc2lvbnMsIHdoZW4gb25lIG9mIHRoZW0gaXMgdHJpZ2dlcmVkIGl0IHdpbGwgaW52b2tlIHRoZSBgc291cmNlRmFjdG9yeWBcbiAgICogcmV0dXJuaW5nIGEgbmV3IGRhdGFzb3VyY2UsIGkuZS4gYSBuZXcgZGF0YXNvdXJjZSBlbWlzc2lvbi5cbiAgICpcbiAgICogVGhlIHRyaWdnZXJzIGFyZTogZmlsdGVyLCBzb3J0LCBwYWdpbmF0aW9uIGFuZCByZWZyZXNoLlxuICAgKlxuICAgKiBUaGUgcmVmcmVzaCB0cmlnZ2VyIGRvZXMgbm90IGVmZmVjdCB0aGUgaW5wdXQgc2VudCB0byB0aGUgYHNvdXJjZUZhY3RvcnlgIGZ1bmN0aW9uLCBpdCBpcyBqdXN0IGEgbWVhbiB0byBpbml0aWF0ZSBhIGNhbGwgdG8gY3JlYXRlIGEgbmV3XG4gICAqIGRhdGFzb3VyY2Ugd2l0aG91dCBjaGFuZ2luZyBwcmV2aW91cyBmbG93IHZhcmlhYmxlcy5cbiAgICogSXQncyBpbXBvcnRhbnQgdG8gbm90ZSB0aGF0IGNhbGxpbmcgYHNvdXJjZUZhY3RvcnlgIHdpdGggdGhlIHNhbWUgaW5wdXQgMiBvciBtb3JlIHRpbWVzIGRvZXMgbm90IGd1YXJhbnRlZSBpZGVudGljYWwgcmVzcG9uc2UuIEZvciBleGFtcGxlXG4gICAqIGNhbGxpbmcgYSByZW1vdGUgc2VydmVyIHRoYXQgbWlnaHQgY2hhbmdlIGl0J3MgZGF0YSBiZXR3ZWVuIGNhbGxzLlxuICAgKlxuICAgKiBBbGwgb3RoZXIgdHJpZ2dlcnMgKDMpIHdpbGwgY2hhbmdlIHRoZSBpbnB1dCBzZW50IHRvIHRoZSBgc291cmNlRmFjdG9yeWAgZnVuY3Rpb24gd2hpY2ggd2lsbCB1c2UgdGhlbSB0byByZXR1cm4gYSBkYXRhc291cmNlLlxuICAgKlxuICAgKiBUaGUgaW5wdXQgc2VudCB0byBgc291cmNlRmFjdG9yeWAgaXMgdGhlIHZhbHVlcyB0aGF0IGVhY2ggb2YgdGhlIDMgdHJpZ2dlcnMgeWllbGRzLCB3aGVuIG9uZSB0cmlnZ2VyIGNoYW5nZXMgYSBuZXcgdmFsdWUgZm9yIGl0IGlzIHNlbnRcbiAgICogYW5kIHRoZSBsYXN0IHZhbHVlcyBvZiB0aGUgb3RoZXIgMiB0cmlnZ2VycyBpcyBzZW50IHdpdGggaXQuIGkuZS4gdGhlIGNvbWJpbmF0aW9uIG9mIHRoZSBsYXN0IGtub3duIHZhbHVlIGZvciBhbGwgMyB0cmlnZ2VycyBpcyBzZW50LlxuICAgKlxuICAgKiBUbyBlbmFibGUgc21hcnQgY2FjaGluZyBhbmQgZGF0YSBtYW5hZ2VtZW50IGBzb3VyY2VGYWN0b3J5YCBkb2VzIG5vdCBnZXQgdGhlIHJhdyB2YWx1ZXMgb2YgZWFjaCB0cmlnZ2VyLiBgc291cmNlRmFjdG9yeWAgd2lsbCBnZXRcbiAgICogYW4gZXZlbnQgb2JqZWN0IHRoYXQgY29udGFpbnMgbWV0YWRhdGEgYWJvdXQgZWFjaCB0cmlnZ2VyLCB3aGV0aGVyIGl0IHRyaWdnZXJlZCB0aGUgY2hhbmdlIG9yIG5vdCBhcyB3ZWxsIGFzIG9sZCBhbmQgbmV3IHZhbHVlcy5cbiAgICpcbiAgICogVGhlIHJldHVybmVkIHZhbHVlIGZyb20gYHNvdXJjZUZhY3RvcnlgIGlzIHRoZW4gdXNlZCBhcyB0aGUgZGF0YXNvdXJjZSwgYXBwbHlpbmcgYWxsIHRyaWdnZXJzIHRoYXQgYXJlIG5vdCBvdmVycmlkZGVuIGJ5IHRoZSB1c2VyLlxuICAgKiBUaGUgcmV0dXJuZWQgdmFsdWUgb2YgYHNvdXJjZUZhY3RvcnlgIGNhbiBiZSBhIGBEYXRhU291cmNlT2ZgIG9yIGBmYWxzZWAuXG4gICAqICAgLSBgRGF0YVNvdXJjZU9mYCBtZWFucyBhIHZhbGlkIGRhdGFzb3VyY2UsIGVpdGhlciBvYnNlcnZhYmxlL3Byb21pc2Ugb2YgYXJyYXkgb3IgYW4gYXJyYXkuXG4gICAqICAgLSBgZmFsc2VgIG1lYW5zIHNraXAsIHJldHVybmluZyBmYWxzZSB3aWxsIGluc3RydWN0IHRoZSBhZGFwdGVyIHRvIHNraXAgZXhlY3V0aW9uIGZvciB0aGlzIHRyaWdnZXIgY3ljbGUuXG4gICAqXG4gICAqIFVzaW5nIGEgdHJpZ2dlciBpcyBhIGJpbmFyeSBjb25maWd1cmF0aW9uIG9wdGlvbiwgd2hlbiBhIHRyaWdnZXIgaXMgdHVybmVkIG9uIGl0IG1lYW5zIHRoYXQgY2hhbmdlcyB0byBpdCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgYHNvdXJjZUZhY3RvcnlgLlxuICAgKiBXaGVuIGEgdHJpZ2dlciBpcyB0dXJuZWQgb2ZmIGl0IGlzIG5vdCBsaXN0ZW5lZCB0byBhbmQgYHVuZGVmaW5lZGAgd2lsbCBiZSBzZW50IGFzIGEgdmFsdWUgZm9yIGl0IHRvIHRoZSBgc291cmNlRmFjdG9yeWAuXG4gICAqXG4gICAqIFRoZSBhZGFwdGVyIGNvbWVzIHdpdGggYnVpbHQgaW4gZmxvdyBsb2dpYyBmb3IgYWxsIDMgdHJpZ2dlcnMsIHdoZW4gYSB0cmlnZ2VyIGlzIHR1cm5lZCBvZmYgdGhlIGFkYXB0ZXIgd2lsbCB0YWtlIHRoZSByZXN1bHQgb2YgYHNvdXJjZUZhY3RvcnlgIGFuZFxuICAgKiBhcHBseSB0aGUgZGVmYXVsdCBiZWhhdmlvciB0byBpdC5cbiAgICpcbiAgICogRm9yIGFsbCB0cmlnZ2VycywgdGhlIGRlZmF1bHQgYmVoYXZpb3IgbWVhbnMgY2xpZW50IGltcGxlbWVudGF0aW9uLiBGb3IgZmlsdGVyaW5nLCBjbGllbnQgc2lkZSBmaWx0ZXJpbmcuIEZvciBzb3J0aW5nLCBjbGllbnQgc2lkZSBzb3J0aW5nLlxuICAgKiBGb3IgUGFnaW5hdGlvbiwgY2xpZW50IHNpZGUgcGFnaW5hdGlvbi5cbiAgICpcbiAgICogWW91IGNhbiBvcHQgaW4gdG8gb25lIG9yIG1vcmUgdHJpZ2dlcnMgYW5kIGltcGxlbWVudCB5b3VyIG93biBiZWhhdmlvciBpbnNpZGUgdGhlIGBzb3VyY2VGYWN0b3J5YFxuICAgKiBAcGFyYW0gc291cmNlRmFjdG9yeSAtIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBkYXRhc291cmNlIGJhc2VkIG9uIGZsb3cgaW5zdHJ1Y3Rpb25zLlxuICAgKiBUaGUgaW5zdHJ1Y3Rpb25zIGFyZSBvcHRpb25hbCwgdGhleSBtaWdodCBvciBtaWdodCBub3QgZXhpc3QgZGVwZW5kaW5nIG9uIHRoZSBjb25maWd1cmF0aW9uIG9mIHRoZSBhZGFwdGVyLlxuICAgKiBXaGVuIGBzb3VyY2VGYWN0b3J5YCByZXR1cm5zIGZhbHNlIHRoZSBlbnRpcmUgdHJpZ2dlciBjeWNsZSBpcyBza2lwcGVkLlxuICAgKiBAcGFyYW0gY29uZmlnIC0gQSBjb25maWd1cmF0aW9uIG9iamVjdCBkZXNjcmliaW5nIGhvdyB0aGlzIGFkYXB0ZXIgc2hvdWxkIGJlaGF2ZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzb3VyY2VGYWN0b3J5OiAoZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50KSA9PiAoZmFsc2UgfCBEYXRhU291cmNlT2Y8VD4pLFxuICAgICAgICAgICAgICBjb25maWc/OiBmYWxzZSB8IFBhcnRpYWw8UmVjb3JkPGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycywgYm9vbGVhbj4+KSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcgfHwge30pO1xuICAgIHRoaXMuaW5pdFN0cmVhbXMoKTtcbiAgfVxuXG4gIGRpc3Bvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaCQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9vblNvdXJjZUNoYW5nZSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHJlZnJlc2goZGF0YT86IFREYXRhKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaCQubmV4dCh7IGRhdGEgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRoZSBjYWNoZSBmcm9tIGFueSBleGlzdGluZyBkYXRhc291cmNlIHRyaWdnZXIgc3VjaCBhcyBmaWx0ZXIsIHNvcnQgZXRjLlxuICAgKiBAcmV0dXJucyBUaGUgY2FjaGVkIHZhbHVlIG9yIG51bGwgaWYgbm90IHRoZXJlLlxuICAgKi9cbiAgY2xlYXJDYWNoZTxQIGV4dGVuZHMga2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZT4oY2FjaGVLZXk6IFApOiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFREYXRhPltQXSB8IG51bGwge1xuICAgIGlmIChjYWNoZUtleSBpbiB0aGlzLmNhY2hlKSB7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5jYWNoZVtjYWNoZUtleV07XG4gICAgICB0aGlzLmNhY2hlW2NhY2hlS2V5XSA9IERFRkFVTFRfSU5JVElBTF9DQUNIRV9TVEFURVtjYWNoZUtleV07XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0UGFnaW5hdG9yKHBhZ2luYXRvcjogUGJsUGFnaW5hdG9yPGFueT4gfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2luYXRvciA9IHBhZ2luYXRvcjtcbiAgfVxuXG4gIHVwZGF0ZVByb2Nlc3NpbmdMb2dpYyhmaWx0ZXIkOiBPYnNlcnZhYmxlPERhdGFTb3VyY2VGaWx0ZXI+LFxuICAgICAgICAgICAgICAgICAgICAgICAgc29ydCQ6IE9ic2VydmFibGU8UGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSAmIHsgc2tpcFVwZGF0ZTogYm9vbGVhbiB9PixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb24kOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PixcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxTdGF0ZTogUGFydGlhbDxQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFREYXRhPj4gPSB7fSk6IE9ic2VydmFibGU8UGJsRGF0YVNvdXJjZUFkYXB0ZXJQcm9jZXNzZWRSZXN1bHQ8VCwgVERhdGE+PiB7XG4gICAgbGV0IHVwZGF0ZXMgPSAtMTtcbiAgICBjb25zdCBjaGFuZ2VkRmlsdGVyID0gZSA9PiB1cGRhdGVzID09PSAtMSB8fCBlLmNoYW5nZWQ7XG4gICAgY29uc3Qgc2tpcFVwZGF0ZSA9IChvOiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlICYgeyBza2lwVXBkYXRlOiBib29sZWFuIH0pID0+IG8uc2tpcFVwZGF0ZSAhPT0gdHJ1ZTtcblxuICAgIHRoaXMuX2xhc3RTb3VyY2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLmNhY2hlID0geyAuLi5ERUZBVUxUX0lOSVRJQUxfQ0FDSEVfU1RBVEUsIC4uLmluaXRpYWxTdGF0ZSB9O1xuXG4gICAgY29uc3QgY29tYmluZTogW1xuICAgICAgT2JzZXJ2YWJsZTxUcmlnZ2VyQ2hhbmdlZEV2ZW50Rm9yPCdmaWx0ZXInPj4sXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J3NvcnQnPj4sXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J3BhZ2luYXRpb24nPj4sXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J2RhdGEnPj5cbiAgICBdID0gW1xuICAgICAgZmlsdGVyJC5waXBlKCBtYXAoIHZhbHVlID0+IGNyZWF0ZUNoYW5nZUNvbnRhaW5lcignZmlsdGVyJywgdmFsdWUsIHRoaXMuY2FjaGUpICksIGZpbHRlcihjaGFuZ2VkRmlsdGVyKSApLFxuICAgICAgc29ydCQucGlwZSggZmlsdGVyKHNraXBVcGRhdGUpLCBtYXAoIHZhbHVlID0+IGNyZWF0ZUNoYW5nZUNvbnRhaW5lcignc29ydCcsIHZhbHVlLCB0aGlzLmNhY2hlKSApLCBmaWx0ZXIoY2hhbmdlZEZpbHRlcikgKSxcbiAgICAgIHBhZ2luYXRpb24kLnBpcGUoIG1hcCggdmFsdWUgPT4gY3JlYXRlQ2hhbmdlQ29udGFpbmVyKCdwYWdpbmF0aW9uJywgdmFsdWUsIHRoaXMuY2FjaGUpICksIGZpbHRlcihjaGFuZ2VkRmlsdGVyKSApLFxuICAgICAgdGhpcy5fcmVmcmVzaCQucGlwZSggbWFwKCB2YWx1ZSA9PiBmcm9tUmVmcmVzaERhdGFXcmFwcGVyKGNyZWF0ZUNoYW5nZUNvbnRhaW5lcignZGF0YScsIHZhbHVlLCB0aGlzLmNhY2hlKSkgKSwgZmlsdGVyKGNoYW5nZWRGaWx0ZXIpICksXG4gICAgXTtcblxuICAgIGNvbnN0IGhhc0N1c3RvbUJlaGF2aW9yID0gQ1VTVE9NX0JFSEFWSU9SX1RSSUdHRVJfS0VZUy5zb21lKCBrZXkgPT4gISF0aGlzLmNvbmZpZ1trZXldICk7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChjb21iaW5lWzBdLCBjb21iaW5lWzFdLCBjb21iaW5lWzJdLCBjb21iaW5lWzNdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIC8vIERlZmVyIHRvIG5leHQgbG9vcCBjeWNsZSwgdW50aWwgbm8gbW9yZSBpbmNvbWluZy5cbiAgICAgICAgLy8gV2UgdXNlIGFuIGFzeW5jIHNjaGVkdWxhciBoZXJlIChpbnN0ZWFkIG9mIGFzYXBTY2hlZHVsYXIpIGJlY2F1c2Ugd2Ugd2FudCB0byBoYXZlIHRoZSBsYXJnZXN0IGRlYm91bmNlIHdpbmRvdyB3aXRob3V0IGNvbXByb21pc2luZyBpbnRlZ3JpdHlcbiAgICAgICAgLy8gV2l0aCBhbiBhc3luYyBzY2hlZHVsYXIgd2Uga25vdyB3ZSB3aWxsIHJ1biBhZnRlciBhbGwgbWljcm8tdGFza3MgYnV0IGJlZm9yZSBcInJlYWxcIiBhc3luYyBvcGVyYXRpb25zLlxuICAgICAgICBkZWJvdW5jZVRpbWUoMCksXG4gICAgICAgIHN3aXRjaE1hcCggKFtmaWx0ZXIsIHNvcnQsIHBhZ2luYXRpb24sIGRhdGEgXSkgPT4ge1xuICAgICAgICAgIHVwZGF0ZXMrKzsgLy8gaWYgZmlyc3QsIHdpbGwgYmUgMCBub3cgKHN0YXJ0cyBmcm9tIC0xKS5cbiAgICAgICAgICBjb25zdCBldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGE+ID0ge1xuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIHBhZ2luYXRpb24sXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgaXNJbml0aWFsOiB1cGRhdGVzID09PSAwLFxuICAgICAgICAgICAgdXBkYXRlVG90YWxMZW5ndGg6ICh0b3RhbExlbmd0aCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvci50b3RhbCA9IHRvdGFsTGVuZ3RoO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHJ1bkhhbmRsZSA9IGRhdGEuY2hhbmdlZFxuICAgICAgICAgICAgfHwgKCBoYXNDdXN0b21CZWhhdmlvciAmJiBDVVNUT01fQkVIQVZJT1JfVFJJR0dFUl9LRVlTLnNvbWUoIGsgPT4gISF0aGlzLmNvbmZpZ1trXSAmJiBldmVudFtrXS5jaGFuZ2VkKSApO1xuXG4gICAgICAgICAgaWYgKHJ1bkhhbmRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuSGFuZGxlKGV2ZW50KS5waXBlKFxuICAgICAgICAgICAgICB0YXAoICgpID0+IGV2ZW50LmRhdGEuY2hhbmdlZCA9IHRydWUgKSwgLy8gaWYgdGhlIHVzZXIgZGlkbid0IHJldHVybiBcImZhbHNlXCIgZnJvbSBoaXMgaGFuZGxlciwgd2UgaW5mZXIgZGF0YSB3YXMgY2hhbmdlZCFcbiAgICAgICAgICAgICAgbWFwKCBkYXRhID0+ICh7IGV2ZW50LCBkYXRhIH0pKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7IGV2ZW50LCBkYXRhOiB0aGlzLl9sYXN0U291cmNlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG1hcCggcmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHRoaXMuY29uZmlnO1xuICAgICAgICAgIGNvbnN0IGV2ZW50ID0gcmVzcG9uc2UuZXZlbnQ7XG5cbiAgICAgICAgICAvLyBtYXJrIHdoaWNoIG9mIHRoZSB0cmlnZ2VycyBoYXMgY2hhbmdlc1xuICAgICAgICAgIC8vIFRoZSBsb2dpYyBpcyBiYXNlZCBvbiB0aGUgdXNlcidzIGNvbmZpZ3VyYXRpb24gYW5kIHRoZSBpbmNvbWluZyBldmVudFxuICAgICAgICAgIGNvbnN0IHdpdGhDaGFuZ2VzOiBQYXJ0aWFsPFJlY29yZDxrZXlvZiBQYmxEYXRhU291cmNlQ29uZmlndXJhYmxlVHJpZ2dlcnMsIGJvb2xlYW4+PiA9IHt9O1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIENVU1RPTV9CRUhBVklPUl9UUklHR0VSX0tFWVMpIHtcbiAgICAgICAgICAgIGlmICghY29uZmlnW2tleV0gJiYgKGV2ZW50LmlzSW5pdGlhbCB8fCBldmVudFtrZXldLmNoYW5nZWQpKSB7XG4gICAgICAgICAgICAgIHdpdGhDaGFuZ2VzW2tleV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdoZW4gZGF0YSBjaGFuZ2VkLCBhcHBseSBzb21lIGxvZ2ljIChjYWNoaW5nLCBvcGVyYXRpb25hbCwgZXRjLi4uKVxuICAgICAgICAgIGlmIChldmVudC5kYXRhLmNoYW5nZWQpIHtcbiAgICAgICAgICAgIC8vIGNhY2hlIHRoZSBkYXRhIHdoZW4gaXQgaGFzIGNoYW5nZWQuXG4gICAgICAgICAgICB0aGlzLl9sYXN0U291cmNlID0gcmVzcG9uc2UuZGF0YTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5zb3J0KSB7XG4gICAgICAgICAgICAgIC8vIFdoZW4gdGhlIHVzZXIgaXMgc29ydGluZyAoaS5lLiBzZXJ2ZXIgc29ydGluZyksIHRoZSBsYXN0IHNvcnQgY2FjaGVkIGlzIGFsd2F5cyB0aGUgbGFzdCBzb3VyY2Ugd2UgZ2V0IGZyb20gdGhlIHVzZXIuXG4gICAgICAgICAgICAgIHRoaXMuX2xhc3RTb3J0ZWRTb3VyY2UgPSB0aGlzLl9sYXN0U291cmNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2hlbiB1c2VyIGlzIE5PVCBzb3J0aW5nICh3ZSBzb3J0IGxvY2FsbHkpIEFORCB0aGUgZGF0YSBoYXMgY2hhbmdlZCB3ZSBuZWVkIHRvIGFwcGx5IHNvcnRpbmcgb24gaXRcbiAgICAgICAgICAgICAgLy8gdGhpcyBtaWdodCBhbHJlYWR5IGJlIHRydWUgKGlmIHNvcnRpbmcgd2FzIHRoZSB0cmlnZ2VyKS4uLlxuICAgICAgICAgICAgICB3aXRoQ2hhbmdlcy5zb3J0ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAvLyBiZWNhdXNlIHdlIHNvcnQgYW5kIHRoZW4gZmlsdGVyLCBmaWx0ZXJpbmcgdXBkYXRlcyBhcmUgYWxzbyB0cmlnZ2VyZWQgYnkgc29ydCB1cGRhdGVkXG4gICAgICAgICAgICAgIHdpdGhDaGFuZ2VzLmZpbHRlciA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjb25maWcuZmlsdGVyKSB7XG4gICAgICAgICAgICAgIC8vIFdoZW4gdGhlIHVzZXIgaXMgZmlsdGVyaW5nIChpLmUuIHNlcnZlciBmaWx0ZXJpbmcpLCB0aGUgbGFzdCBmaWx0ZXIgY2FjaGVkIGlzIGFsd2F5cyB0aGUgbGFzdCBzb3VyY2Ugd2UgZ2V0IGZyb20gdGhlIHVzZXIuXG4gICAgICAgICAgICAgIHRoaXMuX2xhc3RGaWx0ZXJlZFNvdXJjZSA9IHRoaXMuX2xhc3RTb3VyY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXaGVuIHVzZXIgaXMgTk9UIGZpbHRlcmluZyAod2UgZmlsdGVyIGxvY2FsbHkpIEFORCB0aGUgZGF0YSBoYXMgY2hhbmdlZCB3ZSBuZWVkIHRvIGFwcGx5IGZpbHRlcmluZyBvbiBpdFxuICAgICAgICAgICAgICAvLyB0aGlzIG1pZ2h0IGFscmVhZHkgYmUgdHJ1ZSAoaWYgZmlsdGVyaW5nIHdhcyB0aGUgdHJpZ2dlcikuLi5cbiAgICAgICAgICAgICAgd2l0aENoYW5nZXMuZmlsdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBXaGVuIHVzZXIgaXMgTk9UIGFwcGx5aW5nIHBhZ2luYXRpb24gKHdlIHBhZ2luYXRlIGxvY2FsbHkpIEFORCBpZiB3ZSAoc29ydCBPUiBmaWx0ZXIpIGxvY2FsbHkgd2UgYWxzbyBuZWVkIHRvIHBhZ2luYXRlIGxvY2FsbHlcbiAgICAgICAgICBpZiAoIWNvbmZpZy5wYWdpbmF0aW9uICYmICh3aXRoQ2hhbmdlcy5zb3J0IHx8IHdpdGhDaGFuZ2VzLmZpbHRlcikpIHtcbiAgICAgICAgICAgIHdpdGhDaGFuZ2VzLnBhZ2luYXRpb24gPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIE5vdywgYXBwbHk6IHNvcnQgLS0+IGZpbHRlciAtLT4gcGFnaW5hdGlvbiAgICAgKCBPUkRFUiBNQVRURVJTISEhIClcblxuICAgICAgICAgIGlmICh3aXRoQ2hhbmdlcy5zb3J0KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0U29ydGVkU291cmNlID0gdGhpcy5hcHBseVNvcnQodGhpcy5fbGFzdFNvdXJjZSwgZXZlbnQuc29ydC5jdXJyIHx8IGV2ZW50LnNvcnQucHJldik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGRhdGE6IFRbXSA9IHRoaXMuX2xhc3RTb3J0ZWRTb3VyY2U7XG5cbiAgICAgICAgICAvLyB3ZSBjaGVjayBpZiBmaWx0ZXIgd2FzIGFza2VkLCBidXQgYWxzbyBpZiB3ZSBoYXZlIGEgZmlsdGVyIHdlIHJlLXJ1blxuICAgICAgICAgIC8vIE9ubHkgc29ydGluZyBpcyBjYWNoZWQgYXQgdGhpcyBwb2ludCBmaWx0ZXJpbmcgaXMgYWx3YXlzIGNhbGN1bGF0ZWRcbiAgICAgICAgICBpZiAod2l0aENoYW5nZXMuZmlsdGVyIHx8IChldmVudC5maWx0ZXIuY3VyciAmJiBldmVudC5maWx0ZXIuY3Vyci5maWx0ZXIpKSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5fbGFzdEZpbHRlcmVkU291cmNlID0gdGhpcy5hcHBseUZpbHRlcihkYXRhLCBldmVudC5maWx0ZXIuY3VyciB8fCBldmVudC5maWx0ZXIucHJldik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHdpdGhDaGFuZ2VzLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmFwcGx5UGFnaW5hdGlvbihkYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjbG9uZWRFdmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGE+ID0geyAuLi5ldmVudCB9O1xuXG4gICAgICAgICAgLy8gV2UgdXNlIGBjb21iaW5lTGF0ZXN0YCB3aGljaCBjYWNoZXMgcGVydmlvdXMgZXZlbnRzLCBvbmx5IG5ldyBldmVudHMgYXJlIHJlcGxhY2VkLlxuICAgICAgICAgIC8vIFdlIG5lZWQgdG8gbWFyayBldmVyeXRoaW5nIGFzIE5PVCBDSEFOR0VELCBzbyBzdWJzZXF1ZW50IGNhbGxzIHdpbGwgbm90IGhhdmUgdGhlaXIgY2hhbmdlZCBmbGFnIHNldCB0byB0cnVlLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gV2UgYWxzbyBjbG9uZSB0aGUgb2JqZWN0IHNvIHdlIGNhbiBwYXNzIG9uIHRoZSBwcm9wZXIgdmFsdWVzLlxuICAgICAgICAgIC8vIFdlIGNyZWF0ZSBzaGFsbG93IGNsb25lcyBzbyBjb21wbGV4IG9iamVjdHMgKGNvbHVtbiBpbiBzb3J0LCB1c2VyIGRhdGEgaW4gZGF0YSkgd2lsbCBub3QgdGhyb3cgb24gY2lyY3VsYXIuXG4gICAgICAgICAgLy8gRm9yIHBhZ2luYXRpb24gd2UgZGVlcCBjbG9uZSBiZWNhdXNlIGl0IGNvbnRhaW5zIHByaW1pdGl2ZXMgYW5kIHdlIG5lZWQgdG8gYWxzbyBjbG9uZSB0aGUgaW50ZXJuYWwgY2hhbmdlIG9iamVjdHMuXG4gICAgICAgICAgZm9yIChjb25zdCBrIG9mIFRSSUdHRVJfS0VZUykge1xuICAgICAgICAgICAgY2xvbmVkRXZlbnRba10gPSBrID09PSAncGFnaW5hdGlvbidcbiAgICAgICAgICAgICAgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGV2ZW50W2tdKSlcbiAgICAgICAgICAgICAgOiB7IC4uLmV2ZW50W2tdIH1cbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIGV2ZW50W2tdLmNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZlbnQucGFnaW5hdGlvbi5wYWdlLmNoYW5nZWQgPSBldmVudC5wYWdpbmF0aW9uLnBlclBhZ2UuY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGV2ZW50OiBjbG9uZWRFdmVudCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBzb3J0ZWQ6IHRoaXMuX2xhc3RTb3J0ZWRTb3VyY2UsXG4gICAgICAgICAgICBmaWx0ZXJlZDogdGhpcy5fbGFzdEZpbHRlcmVkU291cmNlLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5RmlsdGVyKGRhdGE6IFRbXSwgZGF0YVNvdXJjZUZpbHRlcjogRGF0YVNvdXJjZUZpbHRlcik6IFRbXSB7XG4gICAgZGF0YSA9IGZpbHRlcmluZ0ZuKGRhdGEsIGRhdGFTb3VyY2VGaWx0ZXIpO1xuICAgIGlmICghdGhpcy5jb25maWcucGFnaW5hdGlvbikge1xuICAgICAgdGhpcy5yZXNldFBhZ2luYXRpb24oZGF0YS5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBseVNvcnQoZGF0YTogVFtdLCBldmVudDogUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSk6IFRbXSB7XG4gICAgcmV0dXJuIGFwcGx5U29ydChldmVudC5jb2x1bW4sIGV2ZW50LnNvcnQsIGRhdGEpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5UGFnaW5hdGlvbihkYXRhOiBUW10pOiAgVFtdIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgIC8vIFNldCB0aGUgcmVuZGVyZWQgcm93cyBsZW5ndGggdG8gdGhlIHZpcnR1YWwgcGFnZSBzaXplLiBGaWxsIGluIHRoZSBkYXRhIHByb3ZpZGVkXG4gICAgICAvLyBmcm9tIHRoZSBpbmRleCBzdGFydCB1bnRpbCB0aGUgZW5kIGluZGV4IG9yIHBhZ2luYXRpb24gc2l6ZSwgd2hpY2hldmVyIGlzIHNtYWxsZXIuXG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMucGFnaW5hdG9yLnJhbmdlO1xuICAgICAgcmV0dXJuIGRhdGEuc2xpY2UocmFuZ2VbMF0sIHJhbmdlWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzZXRQYWdpbmF0aW9uKHRvdGFsTGVuZ3RoOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdpbmF0b3IpIHtcbiAgICAgIHRoaXMucGFnaW5hdG9yLnRvdGFsID0gdG90YWxMZW5ndGg7XG4gICAgICB0aGlzLnBhZ2luYXRvci5wYWdlID0gdG90YWxMZW5ndGggPiAwID8gMSA6IDA7XG4gICAgfVxuICB9XG5cbiAgLyogTm90ZTogIEN1cnJlbnRseSB0aGlzIGlzIG9ubHkgdXNlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAgICAgICAgICBIb3dldmVyLCBpZiBjYWxsZWQgZWxzZXdoZXJlIChpLmUuIGlmIHdlIGNhbiByZS1pbml0IHRoZSBhZGFwdGVyKSB3ZSBuZWVkIHRvIHRyYWNrIGFsbCBjb2RlIHRoYXQgaXMgdXNpbmdcbiAgICAgICAgICAgIGBvblNvdXJjZUNoYW5nZWRgIGFuZCBvciBgb25Tb3VyY2VDaGFuZ2luZ2AgYW5kIG1ha2UgaXQgc3VwcG9ydCB0aGUgcmVwbGFjZW1lbnQgb2YgdGhlIG9ic2VydmFibGUuXG4gICAgICAgICAgICBCZWNhdXNlIHRoZSBBUEkgaXMgcHVibGljIGl0IHdpbGwgcHJvYmFibHkgd29uJ3Qgd29yayBzbyB0aGUgYmVzdCBzb2x1dGlvbiBtaWdodCBiZSB0byBzd2l0Y2hcbiAgICAgICAgICAgIGBvblNvdXJjZUNoYW5nZWRgIGFuZCBgb25Tb3VyY2VDaGFuZ2luZ2AgdG8gc3ViamVjdHMgdGhhdCBhcmUgYWxpdmUgYWx3YXlzIGFuZCBlbWl0IHRoZW0gaW50ZXJuYWxseSBpbiB0aGlzIGNsYXNzLiAqL1xuICBwcml2YXRlIGluaXRTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX29uU291cmNlQ2hhbmdlJCA9IG5ldyBTdWJqZWN0PFRbXT4oKTtcbiAgICB0aGlzLm9uU291cmNlQ2hhbmdlZCA9IHRoaXMuX29uU291cmNlQ2hhbmdlJC5waXBlKGZpbHRlciggZCA9PiBkICE9PSBTT1VSQ0VfQ0hBTkdJTkdfVE9LRU4gKSk7XG4gICAgdGhpcy5vblNvdXJjZUNoYW5naW5nID0gdGhpcy5fb25Tb3VyY2VDaGFuZ2UkLnBpcGUoZmlsdGVyKCBkID0+IGQgPT09IFNPVVJDRV9DSEFOR0lOR19UT0tFTiApKTtcbiAgICB0aGlzLl9yZWZyZXNoJCA9IG5ldyBTdWJqZWN0PFJlZnJlc2hEYXRhV3JhcHBlcjxURGF0YT4+KCk7XG4gICAgdGhpcy5fbGFzdFNvdXJjZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlIHRoZSB1c2VyLXByb3ZpZGVkIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgZGF0YSBjb2xsZWN0aW9uLlxuICAgKiBUaGlzIG1ldGhvZCB3cmFwcyBlYWNoIG9mIHRoZSB0cmlnZ2VycyB3aXRoIGEgY29udGFpbmVyIHByb3ZpZGluZyBtZXRhZGF0YSBmb3IgdGhlIHRyaWdnZXIuIChPbGQgdmFsdWUsIHdhcyBjaGFuZ2VkPyBhbmQgbmV3IHZhbHVlIGlmIGNoYW5nZWQpXG4gICAqIFRoaXMgaXMgd2hlcmUgYWxsIGNhY2hlIGxvZ2ljIGlzIG1hbmFnZWQgKGNyZWF0ZUNoYW5nZUNvbnRhaW5lcikuXG4gICAqXG4gICAqIFRvIGJ1aWxkIGEgZGF0YSBjb2xsZWN0aW9uIHRoZSBpbmZvcm1hdGlvbiBmcm9tIGFsbCB0cmlnZ2VycyBpcyByZXF1aXJlZCwgZXZlbiBpZiBpdCB3YXMgbm90IGNoYW5nZWQuXG4gICAqIFdoZW4gYSB0cmlnZ2VyIGlzIGZpcmVkIHdpdGggYSBuZXcgdmFsdWUgdGhlIG5ldyB2YWx1ZSByZXBsYWNlcyB0aGUgb2xkIHZhbHVlIGZvciB0aGUgdHJpZ2dlciBhbmQgYWxsIG90aGVyIHRyaWdnZXJzIHdpbGwga2VlcCB0aGVpciBvbGQgdmFsdWUuXG4gICAqIFNlbmRpbmcgdGhlIHRyaWdnZXJzIHRvIHRoZSBoYW5kbGVycyBpcyBub3QgZW5vdWdoLCB3ZSBhbHNvIG5lZWQgdG8gdGhlIGhhbmRsZXJzIHdoaWNoIG9mIHRoZSB0cmlnZ2VyJ3MgaGF2ZSBjaGFuZ2Ugc28gdGhleSBjYW4gcmV0dXJuXG4gICAqIGRhdGEgd2l0aG91dCBkb2luZyByZWR1bmRhbnQgd29yay5cbiAgICogRm9yIGV4YW1wbGUsIGZldGNoaW5nIHBhZ2luYXRlZCBkYXRhIGZyb20gdGhlIHNlcnZlciByZXF1aXJlcyBhIGNhbGwgd2hlbmV2ZXIgdGhlIHBhZ2VzIGNoYW5nZXMgYnV0IGlmIHRoZSBmaWx0ZXJpbmcgaXMgbG9jYWwgZm9yIHRoZSBjdXJyZW50IHBhZ2VcbiAgICogYW5kIHRoZSBmaWx0ZXIgdHJpZ2dlciBpcyBmaXJlZCB0aGUgaGFuZGxlciBuZWVkcyB0byBrbm93IHRoYXQgcGFnaW5hdGlvbiBkaWQgbm90IGNoYW5nZSBzbyBpdCB3aWxsIG5vdCBnbyBhbmQgZmV0Y2ggZGF0YSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIFRoZSBoYW5kbGVyIGNhbiByZXR1cm4gc2V2ZXJhbCBkYXRhIHN0cnVjdHVyZXMsIG9ic2VydmFibGUsIHByb21pc2UsIGFycmF5IG9yIGZhbHNlLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIG5vcm1hbGl6ZSB0aGUgcmVzcG9uc2UgaW50byBhbiBvYnNlcnZhYmxlIGFuZCBub3RpZnkgdGhhdCB0aGUgc291cmNlIGNoYW5nZWQgKG9uU291cmNlQ2hhbmdlZCkuXG4gICAqXG4gICAqIFdoZW4gdGhlIHJlc3BvbnNlIGlzIGZhbHNlIHRoYXQgaGFuZGxlciB3YW50cyB0byBza2lwIHRoaXMgY3ljbGUsIHRoaXMgbWVhbnMgdGhhdCBvblNvdXJjZUNoYW5nZWQgd2lsbCBub3QgZW1pdCBhbmRcbiAgICogYSBkZWFkLWVuZCBvYnNlcnZhYmxlIGlzIHJldHVybmVkIChvYnNlcnZhYmxlIHRoYXQgd2lsbCBuZXZlciBlbWl0KS5cbiAgICovXG4gIHByaXZhdGUgcnVuSGFuZGxlKGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxURGF0YT4pOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIHRoaXMuX29uU291cmNlQ2hhbmdlJC5uZXh0KFNPVVJDRV9DSEFOR0lOR19UT0tFTik7XG5cbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNvdXJjZUZhY3RvcnkoZXZlbnQpO1xuICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gb2YoZmFsc2UpLnBpcGUoZmlsdGVyKCAoKSA9PiBmYWxzZSApKSBhcyBhbnk7IC8vIHN0b3AgZW1pc3Npb25zIGlmIGdvdCBmYWxzZS5cbiAgICB9XG5cbiAgICBjb25zdCBvYnM6IE9ic2VydmFibGU8VFtdPiA9IGlzT2JzZXJ2YWJsZShyZXN1bHQpXG4gICAgICA/IHJlc3VsdFxuICAgICAgOiBBcnJheS5pc0FycmF5KHJlc3VsdClcbiAgICAgICAgPyBvZihyZXN1bHQpXG4gICAgICAgIDogZnJvbShyZXN1bHQpIC8vIHByb21pc2UuLi5cbiAgICA7XG5cbiAgICByZXR1cm4gb2JzLnBpcGUoXG4gICAgICAvLyBydW4gYXMgYSBtaWNyby10YXNrXG4gICAgICBvYnNlcnZlT24oYXNhcFNjaGVkdWxlciwgMCksXG4gICAgICBtYXAoIGRhdGEgPT4gQXJyYXkuaXNBcnJheShkYXRhKSA/IGRhdGEgOiBbXSApLFxuICAgICAgdGFwKCBkYXRhID0+IHRoaXMuX29uU291cmNlQ2hhbmdlJC5uZXh0KGRhdGEpIClcbiAgICApO1xuICB9XG59XG4iXX0=