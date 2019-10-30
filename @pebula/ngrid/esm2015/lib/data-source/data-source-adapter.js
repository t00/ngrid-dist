/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject, combineLatest, of, from, isObservable, asapScheduler } from 'rxjs';
import { filter, map, switchMap, tap, debounceTime, observeOn } from 'rxjs/operators';
import { filter as filteringFn } from './filtering';
import { applySort } from './sorting';
import { createChangeContainer, fromRefreshDataWrapper, EMPTY } from './data-source-adapter.helpers';
/** @type {?} */
const CUSTOM_BEHAVIOR_TRIGGER_KEYS = ['sort', 'filter', 'pagination'];
/** @type {?} */
const TRIGGER_KEYS = [...CUSTOM_BEHAVIOR_TRIGGER_KEYS, 'data'];
/** @type {?} */
const SOURCE_CHANGING_TOKEN = {};
const ɵ0 = EMPTY;
/** @type {?} */
const DEFAULT_INITIAL_CACHE_STATE = { filter: EMPTY, sort: EMPTY, pagination: {}, data: ɵ0 };
/**
 * An adapter that handles changes
 * @template T, TData
 */
export class PblDataSourceAdapter {
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
     * @param {?} sourceFactory - A function that returns the datasource based on flow instructions.
     * The instructions are optional, they might or might not exist depending on the configuration of the adapter.
     * When `sourceFactory` returns false the entire trigger cycle is skipped.
     * @param {?=} config - A configuration object describing how this adapter should behave.
     */
    constructor(sourceFactory, config) {
        this.sourceFactory = sourceFactory;
        this.config = Object.assign({}, config || {});
        this.initStreams();
    }
    /**
     * @return {?}
     */
    dispose() {
        this._refresh$.complete();
        this._onSourceChange$.complete();
    }
    /**
     * @param {?=} data
     * @return {?}
     */
    refresh(data) {
        this._refresh$.next({ data });
    }
    /**
     * Clears the cache from any existing datasource trigger such as filter, sort etc.
     * @template P
     * @param {?} cacheKey
     * @return {?} The cached value or null if not there.
     */
    clearCache(cacheKey) {
        if (cacheKey in this.cache) {
            /** @type {?} */
            const prev = this.cache[cacheKey];
            this.cache[cacheKey] = DEFAULT_INITIAL_CACHE_STATE[cacheKey];
            return prev;
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} paginator
     * @return {?}
     */
    setPaginator(paginator) {
        this.paginator = paginator;
    }
    /**
     * @param {?} filter$
     * @param {?} sort$
     * @param {?} pagination$
     * @param {?=} initialState
     * @return {?}
     */
    updateProcessingLogic(filter$, sort$, pagination$, initialState = {}) {
        /** @type {?} */
        let updates = -1;
        /** @type {?} */
        const changedFilter = (/**
         * @param {?} e
         * @return {?}
         */
        e => updates === -1 || e.changed);
        /** @type {?} */
        const skipUpdate = (/**
         * @param {?} o
         * @return {?}
         */
        (o) => o.skipUpdate !== true);
        this._lastSource = undefined;
        this.cache = Object.assign({}, DEFAULT_INITIAL_CACHE_STATE, initialState);
        /** @type {?} */
        const combine = [
            filter$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => createChangeContainer('filter', value, this.cache))), filter(changedFilter)),
            sort$.pipe(filter(skipUpdate), map((/**
             * @param {?} value
             * @return {?}
             */
            value => createChangeContainer('sort', value, this.cache))), filter(changedFilter)),
            pagination$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => createChangeContainer('pagination', value, this.cache))), filter(changedFilter)),
            this._refresh$.pipe(map((/**
             * @param {?} value
             * @return {?}
             */
            value => fromRefreshDataWrapper(createChangeContainer('data', value, this.cache)))), filter(changedFilter)),
        ];
        /** @type {?} */
        const hasCustomBehavior = CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
         * @param {?} key
         * @return {?}
         */
        key => !!this.config[key]));
        return combineLatest(combine[0], combine[1], combine[2], combine[3])
            .pipe(
        // Defer to next loop cycle, until no more incoming.
        // We use an async schedular here (instead of asapSchedular) because we want to have the largest debounce window without compromising integrity
        // With an async schedular we know we will run after all micro-tasks but before "real" async operations.
        debounceTime(0), switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([filter, sort, pagination, data]) => {
            updates++; // if first, will be 0 now (starts from -1).
            // if first, will be 0 now (starts from -1).
            /** @type {?} */
            const event = {
                filter,
                sort,
                pagination,
                data,
                isInitial: updates === 0,
                updateTotalLength: (/**
                 * @param {?} totalLength
                 * @return {?}
                 */
                (totalLength) => {
                    if (this.paginator) {
                        this.paginator.total = totalLength;
                    }
                })
            };
            /** @type {?} */
            const runHandle = data.changed
                || (hasCustomBehavior && CUSTOM_BEHAVIOR_TRIGGER_KEYS.some((/**
                 * @param {?} k
                 * @return {?}
                 */
                k => !!this.config[k] && event[k].changed)));
            if (runHandle) {
                return this.runHandle(event).pipe(tap((/**
                 * @return {?}
                 */
                () => event.data.changed = true)), // if the user didn't return "false" from his handler, we infer data was changed!
                map((/**
                 * @param {?} data
                 * @return {?}
                 */
                data => ({ event, data }))));
            }
            else {
                return of({ event, data: this._lastSource });
            }
        })), map((/**
         * @param {?} response
         * @return {?}
         */
        response => {
            /** @type {?} */
            const config = this.config;
            /** @type {?} */
            const event = response.event;
            // mark which of the triggers has changes
            // The logic is based on the user's configuration and the incoming event
            /** @type {?} */
            const withChanges = {};
            for (const key of CUSTOM_BEHAVIOR_TRIGGER_KEYS) {
                if (!config[key] && (event.isInitial || event[key].changed)) {
                    withChanges[key] = true;
                }
            }
            // When data changed, apply some logic (caching, operational, etc...)
            if (event.data.changed) {
                // cache the data when it has changed.
                this._lastSource = response.data;
                if (config.sort) {
                    // When the user is sorting (i.e. server sorting), the last sort cached is always the last source we get from the user.
                    this._lastSortedSource = this._lastSource;
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
                    this._lastFilteredSource = this._lastSource;
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
                this._lastSortedSource = this.applySort(this._lastSource, event.sort.curr || event.sort.prev);
            }
            /** @type {?} */
            let data = this._lastSortedSource;
            // we check if filter was asked, but also if we have a filter we re-run
            // Only sorting is cached at this point filtering is always calculated
            if (withChanges.filter || (event.filter.curr && event.filter.curr.filter)) {
                data = this._lastFilteredSource = this.applyFilter(data, event.filter.curr || event.filter.prev);
            }
            if (withChanges.pagination) {
                data = this.applyPagination(data);
            }
            /** @type {?} */
            const clonedEvent = Object.assign({}, event);
            // We use `combineLatest` which caches pervious events, only new events are replaced.
            // We need to mark everything as NOT CHANGED, so subsequent calls will not have their changed flag set to true.
            //
            // We also clone the object so we can pass on the proper values.
            // We create shallow clones so complex objects (column in sort, user data in data) will not throw on circular.
            // For pagination we deep clone because it contains primitives and we need to also clone the internal change objects.
            for (const k of TRIGGER_KEYS) {
                clonedEvent[k] = k === 'pagination'
                    ? JSON.parse(JSON.stringify(event[k]))
                    : Object.assign({}, event[k]);
                event[k].changed = false;
            }
            event.pagination.page.changed = event.pagination.perPage.changed = false;
            return {
                event: clonedEvent,
                data,
                sorted: this._lastSortedSource,
                filtered: this._lastFilteredSource,
            };
        })));
    }
    /**
     * @protected
     * @param {?} data
     * @param {?} dataSourceFilter
     * @return {?}
     */
    applyFilter(data, dataSourceFilter) {
        data = filteringFn(data, dataSourceFilter);
        if (!this.config.pagination) {
            this.resetPagination(data.length);
        }
        return data;
    }
    /**
     * @protected
     * @param {?} data
     * @param {?} event
     * @return {?}
     */
    applySort(data, event) {
        return applySort(event.column, event.sort, data);
    }
    /**
     * @protected
     * @param {?} data
     * @return {?}
     */
    applyPagination(data) {
        if (this.paginator) {
            // Set the rendered rows length to the virtual page size. Fill in the data provided
            // from the index start until the end index or pagination size, whichever is smaller.
            /** @type {?} */
            const range = this.paginator.range;
            return data.slice(range[0], range[1]);
        }
        return data;
    }
    /**
     * @protected
     * @param {?} totalLength
     * @return {?}
     */
    resetPagination(totalLength) {
        if (this.paginator) {
            this.paginator.total = totalLength;
            this.paginator.page = totalLength > 0 ? 1 : 0;
        }
    }
    /* Note:  Currently this is only used in the constructor.
                However, if called elsewhere (i.e. if we can re-init the adapter) we need to track all code that is using
                `onSourceChanged` and or `onSourceChanging` and make it support the replacement of the observable.
                Because the API is public it will probably won't work so the best solution might be to switch
                `onSourceChanged` and `onSourceChanging` to subjects that are alive always and emit them internally in this class. */
    /**
     * @private
     * @return {?}
     */
    initStreams() {
        this._onSourceChange$ = new Subject();
        this.onSourceChanged = this._onSourceChange$.pipe(filter((/**
         * @param {?} d
         * @return {?}
         */
        d => d !== SOURCE_CHANGING_TOKEN)));
        this.onSourceChanging = this._onSourceChange$.pipe(filter((/**
         * @param {?} d
         * @return {?}
         */
        d => d === SOURCE_CHANGING_TOKEN)));
        this._refresh$ = new Subject();
        this._lastSource = undefined;
    }
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
    runHandle(event) {
        this._onSourceChange$.next(SOURCE_CHANGING_TOKEN);
        /** @type {?} */
        const result = this.sourceFactory(event);
        if (result === false) {
            return (/** @type {?} */ (of(false).pipe(filter((/**
             * @return {?}
             */
            () => false))))); // stop emissions if got false.
        }
        /** @type {?} */
        const obs = isObservable(result)
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
        data => Array.isArray(data) ? data : [])), tap((/**
         * @param {?} data
         * @return {?}
         */
        data => this._onSourceChange$.next(data))));
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBS3RGLE9BQU8sRUFBRSxNQUFNLElBQUksV0FBVyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFZdEMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLEtBQUssRUFBRSxNQUFNLCtCQUErQixDQUFDOztNQUUvRiw0QkFBNEIsR0FBbUQsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQzs7TUFDL0csWUFBWSxHQUF1QyxDQUFDLEdBQUcsNEJBQTRCLEVBQUUsTUFBTSxDQUFDOztNQUM1RixxQkFBcUIsR0FBRyxFQUFFO1dBRXdGLEtBQUs7O01BQXZILDJCQUEyQixHQUFtQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksSUFBTyxFQUFFOzs7OztBQUsvSCxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUQvQixZQUFtQixhQUFxRixFQUM1RixNQUFrRjtRQUQzRSxrQkFBYSxHQUFiLGFBQWEsQ0FBd0U7UUFFdEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFN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ZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIG9mLCBmcm9tLCBpc09ic2VydmFibGUsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRhcCwgZGVib3VuY2VUaW1lLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IERhdGFTb3VyY2VPZiB9IGZyb20gJy4vZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgUGJsUGFnaW5hdG9yLCBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudCB9IGZyb20gJy4uL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlLCBEYXRhU291cmNlRmlsdGVyIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBmaWx0ZXIgYXMgZmlsdGVyaW5nRm4gfSBmcm9tICcuL2ZpbHRlcmluZyc7XG5pbXBvcnQgeyBhcHBseVNvcnQgfSBmcm9tICcuL3NvcnRpbmcnO1xuXG5pbXBvcnQge1xuICBSZWZyZXNoRGF0YVdyYXBwZXIsXG4gIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycyxcbiAgUGJsRGF0YVNvdXJjZVRyaWdnZXJzLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlLFxuICBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCxcbiAgVHJpZ2dlckNoYW5nZWRFdmVudEZvcixcbiAgUGJsRGF0YVNvdXJjZUFkYXB0ZXJQcm9jZXNzZWRSZXN1bHQsXG59IGZyb20gJy4vZGF0YS1zb3VyY2UtYWRhcHRlci50eXBlcyc7XG5cbmltcG9ydCB7IGNyZWF0ZUNoYW5nZUNvbnRhaW5lciwgZnJvbVJlZnJlc2hEYXRhV3JhcHBlciwgRU1QVFkgfSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXIuaGVscGVycyc7XG5cbmNvbnN0IENVU1RPTV9CRUhBVklPUl9UUklHR0VSX0tFWVM6IEFycmF5PGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2Vycz4gPSBbJ3NvcnQnLCAnZmlsdGVyJywgJ3BhZ2luYXRpb24nXTtcbmNvbnN0IFRSSUdHRVJfS0VZUzogQXJyYXk8a2V5b2YgUGJsRGF0YVNvdXJjZVRyaWdnZXJzPiA9IFsuLi5DVVNUT01fQkVIQVZJT1JfVFJJR0dFUl9LRVlTLCAnZGF0YSddO1xuY29uc3QgU09VUkNFX0NIQU5HSU5HX1RPS0VOID0ge307XG5cbmNvbnN0IERFRkFVTFRfSU5JVElBTF9DQUNIRV9TVEFURTogUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZTxhbnk+ID0geyBmaWx0ZXI6IEVNUFRZLCBzb3J0OiBFTVBUWSwgcGFnaW5hdGlvbjoge30sIGRhdGE6IEVNUFRZIH07XG5cbi8qKlxuICogQW4gYWRhcHRlciB0aGF0IGhhbmRsZXMgY2hhbmdlc1xuICovXG5leHBvcnQgY2xhc3MgUGJsRGF0YVNvdXJjZUFkYXB0ZXI8VCA9IGFueSwgVERhdGEgPSBhbnk+IHtcbiAgb25Tb3VyY2VDaGFuZ2VkOiBPYnNlcnZhYmxlPFRbXT47XG4gIG9uU291cmNlQ2hhbmdpbmc6IE9ic2VydmFibGU8dm9pZD47XG5cbiAgcHJvdGVjdGVkIHBhZ2luYXRvcj86IFBibFBhZ2luYXRvcjxhbnk+O1xuICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogUGFydGlhbDxSZWNvcmQ8a2V5b2YgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLCBib29sZWFuPj47XG4gIHByaXZhdGUgY2FjaGU6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU8VERhdGE+O1xuICBwcml2YXRlIF9vblNvdXJjZUNoYW5nZSQ6IFN1YmplY3Q8YW55IHwgVFtdPjtcbiAgcHJpdmF0ZSBfcmVmcmVzaCQ6IFN1YmplY3Q8UmVmcmVzaERhdGFXcmFwcGVyPFREYXRhPj47XG4gIHByaXZhdGUgX2xhc3RTb3VyY2U6IFRbXTtcbiAgcHJpdmF0ZSBfbGFzdFNvcnRlZFNvdXJjZTogVFtdO1xuICBwcml2YXRlIF9sYXN0RmlsdGVyZWRTb3VyY2U6IFRbXTtcblxuICAvKipcbiAgICogQSBEYXRhIFNvdXJjZSBhZGFwdGVyIGNvbnRhaW5zIGZsb3cgbG9naWMgZm9yIHRoZSBkYXRhc291cmNlIGFuZCBzdWJzZXF1ZW50IGVtaXNzaW9ucyBvZiBkYXRhc291cmNlIGluc3RhbmNlcy5cbiAgICogVGhlIGxvZ2ljIGlzIGRldGVybWluZWQgYnkgdGhlIGNvbWJpbmF0aW9uIG9mIHRoZSBjb25maWcgb2JqZWN0IGFuZCB0aGUgc291cmNlRmFjdG9yeSBwcm92aWRlZCB0byB0aGlzIGFkYXB0ZXIsIG1ha2luZyB0aGlzIGFkYXB0ZXIgYWN0dWFsbHkgYSBjb250YWluZXIuXG4gICAqXG4gICAqIFRoZXJlIGFyZSA0IHRyaWdnZXJzIHRoYXQgYXJlIHJlc3BvbnNpYmxlIGZvciBkYXRhc291cmNlIGVtaXNzaW9ucywgd2hlbiBvbmUgb2YgdGhlbSBpcyB0cmlnZ2VyZWQgaXQgd2lsbCBpbnZva2UgdGhlIGBzb3VyY2VGYWN0b3J5YFxuICAgKiByZXR1cm5pbmcgYSBuZXcgZGF0YXNvdXJjZSwgaS5lLiBhIG5ldyBkYXRhc291cmNlIGVtaXNzaW9uLlxuICAgKlxuICAgKiBUaGUgdHJpZ2dlcnMgYXJlOiBmaWx0ZXIsIHNvcnQsIHBhZ2luYXRpb24gYW5kIHJlZnJlc2guXG4gICAqXG4gICAqIFRoZSByZWZyZXNoIHRyaWdnZXIgZG9lcyBub3QgZWZmZWN0IHRoZSBpbnB1dCBzZW50IHRvIHRoZSBgc291cmNlRmFjdG9yeWAgZnVuY3Rpb24sIGl0IGlzIGp1c3QgYSBtZWFuIHRvIGluaXRpYXRlIGEgY2FsbCB0byBjcmVhdGUgYSBuZXdcbiAgICogZGF0YXNvdXJjZSB3aXRob3V0IGNoYW5naW5nIHByZXZpb3VzIGZsb3cgdmFyaWFibGVzLlxuICAgKiBJdCdzIGltcG9ydGFudCB0byBub3RlIHRoYXQgY2FsbGluZyBgc291cmNlRmFjdG9yeWAgd2l0aCB0aGUgc2FtZSBpbnB1dCAyIG9yIG1vcmUgdGltZXMgZG9lcyBub3QgZ3VhcmFudGVlIGlkZW50aWNhbCByZXNwb25zZS4gRm9yIGV4YW1wbGVcbiAgICogY2FsbGluZyBhIHJlbW90ZSBzZXJ2ZXIgdGhhdCBtaWdodCBjaGFuZ2UgaXQncyBkYXRhIGJldHdlZW4gY2FsbHMuXG4gICAqXG4gICAqIEFsbCBvdGhlciB0cmlnZ2VycyAoMykgd2lsbCBjaGFuZ2UgdGhlIGlucHV0IHNlbnQgdG8gdGhlIGBzb3VyY2VGYWN0b3J5YCBmdW5jdGlvbiB3aGljaCB3aWxsIHVzZSB0aGVtIHRvIHJldHVybiBhIGRhdGFzb3VyY2UuXG4gICAqXG4gICAqIFRoZSBpbnB1dCBzZW50IHRvIGBzb3VyY2VGYWN0b3J5YCBpcyB0aGUgdmFsdWVzIHRoYXQgZWFjaCBvZiB0aGUgMyB0cmlnZ2VycyB5aWVsZHMsIHdoZW4gb25lIHRyaWdnZXIgY2hhbmdlcyBhIG5ldyB2YWx1ZSBmb3IgaXQgaXMgc2VudFxuICAgKiBhbmQgdGhlIGxhc3QgdmFsdWVzIG9mIHRoZSBvdGhlciAyIHRyaWdnZXJzIGlzIHNlbnQgd2l0aCBpdC4gaS5lLiB0aGUgY29tYmluYXRpb24gb2YgdGhlIGxhc3Qga25vd24gdmFsdWUgZm9yIGFsbCAzIHRyaWdnZXJzIGlzIHNlbnQuXG4gICAqXG4gICAqIFRvIGVuYWJsZSBzbWFydCBjYWNoaW5nIGFuZCBkYXRhIG1hbmFnZW1lbnQgYHNvdXJjZUZhY3RvcnlgIGRvZXMgbm90IGdldCB0aGUgcmF3IHZhbHVlcyBvZiBlYWNoIHRyaWdnZXIuIGBzb3VyY2VGYWN0b3J5YCB3aWxsIGdldFxuICAgKiBhbiBldmVudCBvYmplY3QgdGhhdCBjb250YWlucyBtZXRhZGF0YSBhYm91dCBlYWNoIHRyaWdnZXIsIHdoZXRoZXIgaXQgdHJpZ2dlcmVkIHRoZSBjaGFuZ2Ugb3Igbm90IGFzIHdlbGwgYXMgb2xkIGFuZCBuZXcgdmFsdWVzLlxuICAgKlxuICAgKiBUaGUgcmV0dXJuZWQgdmFsdWUgZnJvbSBgc291cmNlRmFjdG9yeWAgaXMgdGhlbiB1c2VkIGFzIHRoZSBkYXRhc291cmNlLCBhcHBseWluZyBhbGwgdHJpZ2dlcnMgdGhhdCBhcmUgbm90IG92ZXJyaWRkZW4gYnkgdGhlIHVzZXIuXG4gICAqIFRoZSByZXR1cm5lZCB2YWx1ZSBvZiBgc291cmNlRmFjdG9yeWAgY2FuIGJlIGEgYERhdGFTb3VyY2VPZmAgb3IgYGZhbHNlYC5cbiAgICogICAtIGBEYXRhU291cmNlT2ZgIG1lYW5zIGEgdmFsaWQgZGF0YXNvdXJjZSwgZWl0aGVyIG9ic2VydmFibGUvcHJvbWlzZSBvZiBhcnJheSBvciBhbiBhcnJheS5cbiAgICogICAtIGBmYWxzZWAgbWVhbnMgc2tpcCwgcmV0dXJuaW5nIGZhbHNlIHdpbGwgaW5zdHJ1Y3QgdGhlIGFkYXB0ZXIgdG8gc2tpcCBleGVjdXRpb24gZm9yIHRoaXMgdHJpZ2dlciBjeWNsZS5cbiAgICpcbiAgICogVXNpbmcgYSB0cmlnZ2VyIGlzIGEgYmluYXJ5IGNvbmZpZ3VyYXRpb24gb3B0aW9uLCB3aGVuIGEgdHJpZ2dlciBpcyB0dXJuZWQgb24gaXQgbWVhbnMgdGhhdCBjaGFuZ2VzIHRvIGl0IHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBgc291cmNlRmFjdG9yeWAuXG4gICAqIFdoZW4gYSB0cmlnZ2VyIGlzIHR1cm5lZCBvZmYgaXQgaXMgbm90IGxpc3RlbmVkIHRvIGFuZCBgdW5kZWZpbmVkYCB3aWxsIGJlIHNlbnQgYXMgYSB2YWx1ZSBmb3IgaXQgdG8gdGhlIGBzb3VyY2VGYWN0b3J5YC5cbiAgICpcbiAgICogVGhlIGFkYXB0ZXIgY29tZXMgd2l0aCBidWlsdCBpbiBmbG93IGxvZ2ljIGZvciBhbGwgMyB0cmlnZ2Vycywgd2hlbiBhIHRyaWdnZXIgaXMgdHVybmVkIG9mZiB0aGUgYWRhcHRlciB3aWxsIHRha2UgdGhlIHJlc3VsdCBvZiBgc291cmNlRmFjdG9yeWAgYW5kXG4gICAqIGFwcGx5IHRoZSBkZWZhdWx0IGJlaGF2aW9yIHRvIGl0LlxuICAgKlxuICAgKiBGb3IgYWxsIHRyaWdnZXJzLCB0aGUgZGVmYXVsdCBiZWhhdmlvciBtZWFucyBjbGllbnQgaW1wbGVtZW50YXRpb24uIEZvciBmaWx0ZXJpbmcsIGNsaWVudCBzaWRlIGZpbHRlcmluZy4gRm9yIHNvcnRpbmcsIGNsaWVudCBzaWRlIHNvcnRpbmcuXG4gICAqIEZvciBQYWdpbmF0aW9uLCBjbGllbnQgc2lkZSBwYWdpbmF0aW9uLlxuICAgKlxuICAgKiBZb3UgY2FuIG9wdCBpbiB0byBvbmUgb3IgbW9yZSB0cmlnZ2VycyBhbmQgaW1wbGVtZW50IHlvdXIgb3duIGJlaGF2aW9yIGluc2lkZSB0aGUgYHNvdXJjZUZhY3RvcnlgXG4gICAqIEBwYXJhbSBzb3VyY2VGYWN0b3J5IC0gQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGRhdGFzb3VyY2UgYmFzZWQgb24gZmxvdyBpbnN0cnVjdGlvbnMuXG4gICAqIFRoZSBpbnN0cnVjdGlvbnMgYXJlIG9wdGlvbmFsLCB0aGV5IG1pZ2h0IG9yIG1pZ2h0IG5vdCBleGlzdCBkZXBlbmRpbmcgb24gdGhlIGNvbmZpZ3VyYXRpb24gb2YgdGhlIGFkYXB0ZXIuXG4gICAqIFdoZW4gYHNvdXJjZUZhY3RvcnlgIHJldHVybnMgZmFsc2UgdGhlIGVudGlyZSB0cmlnZ2VyIGN5Y2xlIGlzIHNraXBwZWQuXG4gICAqIEBwYXJhbSBjb25maWcgLSBBIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGRlc2NyaWJpbmcgaG93IHRoaXMgYWRhcHRlciBzaG91bGQgYmVoYXZlLlxuICAgKi9cbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZUZhY3Rvcnk6IChldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQpID0+IChmYWxzZSB8IERhdGFTb3VyY2VPZjxUPiksXG4gICAgICAgICAgICAgIGNvbmZpZz86IGZhbHNlIHwgUGFydGlhbDxSZWNvcmQ8a2V5b2YgUGJsRGF0YVNvdXJjZUNvbmZpZ3VyYWJsZVRyaWdnZXJzLCBib29sZWFuPj4pIHtcbiAgICB0aGlzLmNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZyB8fCB7fSk7XG4gICAgdGhpcy5pbml0U3RyZWFtcygpO1xuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZyZXNoJC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX29uU291cmNlQ2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcmVmcmVzaChkYXRhPzogVERhdGEpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZyZXNoJC5uZXh0KHsgZGF0YSB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhcnMgdGhlIGNhY2hlIGZyb20gYW55IGV4aXN0aW5nIGRhdGFzb3VyY2UgdHJpZ2dlciBzdWNoIGFzIGZpbHRlciwgc29ydCBldGMuXG4gICAqIEByZXR1cm5zIFRoZSBjYWNoZWQgdmFsdWUgb3IgbnVsbCBpZiBub3QgdGhlcmUuXG4gICAqL1xuICBjbGVhckNhY2hlPFAgZXh0ZW5kcyBrZXlvZiBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPihjYWNoZUtleTogUCk6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU8VERhdGE+W1BdIHwgbnVsbCB7XG4gICAgaWYgKGNhY2hlS2V5IGluIHRoaXMuY2FjaGUpIHtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLmNhY2hlW2NhY2hlS2V5XTtcbiAgICAgIHRoaXMuY2FjaGVbY2FjaGVLZXldID0gREVGQVVMVF9JTklUSUFMX0NBQ0hFX1NUQVRFW2NhY2hlS2V5XTtcbiAgICAgIHJldHVybiBwcmV2O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzZXRQYWdpbmF0b3IocGFnaW5hdG9yOiBQYmxQYWdpbmF0b3I8YW55PiB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMucGFnaW5hdG9yID0gcGFnaW5hdG9yO1xuICB9XG5cbiAgdXBkYXRlUHJvY2Vzc2luZ0xvZ2ljKGZpbHRlciQ6IE9ic2VydmFibGU8RGF0YVNvdXJjZUZpbHRlcj4sXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3J0JDogT2JzZXJ2YWJsZTxQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlICYgeyBza2lwVXBkYXRlOiBib29sZWFuIH0+LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbiQ6IE9ic2VydmFibGU8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ+LFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFN0YXRlOiBQYXJ0aWFsPFBibERhdGFTb3VyY2VUcmlnZ2VyQ2FjaGU8VERhdGE+PiA9IHt9KTogT2JzZXJ2YWJsZTxQYmxEYXRhU291cmNlQWRhcHRlclByb2Nlc3NlZFJlc3VsdDxULCBURGF0YT4+IHtcbiAgICBsZXQgdXBkYXRlcyA9IC0xO1xuICAgIGNvbnN0IGNoYW5nZWRGaWx0ZXIgPSBlID0+IHVwZGF0ZXMgPT09IC0xIHx8IGUuY2hhbmdlZDtcbiAgICBjb25zdCBza2lwVXBkYXRlID0gKG86IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UgJiB7IHNraXBVcGRhdGU6IGJvb2xlYW4gfSkgPT4gby5za2lwVXBkYXRlICE9PSB0cnVlO1xuXG4gICAgdGhpcy5fbGFzdFNvdXJjZSA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuY2FjaGUgPSB7IC4uLkRFRkFVTFRfSU5JVElBTF9DQUNIRV9TVEFURSwgLi4uaW5pdGlhbFN0YXRlIH07XG5cbiAgICBjb25zdCBjb21iaW5lOiBbXG4gICAgICBPYnNlcnZhYmxlPFRyaWdnZXJDaGFuZ2VkRXZlbnRGb3I8J2ZpbHRlcic+PixcbiAgICAgIE9ic2VydmFibGU8VHJpZ2dlckNoYW5nZWRFdmVudEZvcjwnc29ydCc+PixcbiAgICAgIE9ic2VydmFibGU8VHJpZ2dlckNoYW5nZWRFdmVudEZvcjwncGFnaW5hdGlvbic+PixcbiAgICAgIE9ic2VydmFibGU8VHJpZ2dlckNoYW5nZWRFdmVudEZvcjwnZGF0YSc+PlxuICAgIF0gPSBbXG4gICAgICBmaWx0ZXIkLnBpcGUoIG1hcCggdmFsdWUgPT4gY3JlYXRlQ2hhbmdlQ29udGFpbmVyKCdmaWx0ZXInLCB2YWx1ZSwgdGhpcy5jYWNoZSkgKSwgZmlsdGVyKGNoYW5nZWRGaWx0ZXIpICksXG4gICAgICBzb3J0JC5waXBlKCBmaWx0ZXIoc2tpcFVwZGF0ZSksIG1hcCggdmFsdWUgPT4gY3JlYXRlQ2hhbmdlQ29udGFpbmVyKCdzb3J0JywgdmFsdWUsIHRoaXMuY2FjaGUpICksIGZpbHRlcihjaGFuZ2VkRmlsdGVyKSApLFxuICAgICAgcGFnaW5hdGlvbiQucGlwZSggbWFwKCB2YWx1ZSA9PiBjcmVhdGVDaGFuZ2VDb250YWluZXIoJ3BhZ2luYXRpb24nLCB2YWx1ZSwgdGhpcy5jYWNoZSkgKSwgZmlsdGVyKGNoYW5nZWRGaWx0ZXIpICksXG4gICAgICB0aGlzLl9yZWZyZXNoJC5waXBlKCBtYXAoIHZhbHVlID0+IGZyb21SZWZyZXNoRGF0YVdyYXBwZXIoY3JlYXRlQ2hhbmdlQ29udGFpbmVyKCdkYXRhJywgdmFsdWUsIHRoaXMuY2FjaGUpKSApLCBmaWx0ZXIoY2hhbmdlZEZpbHRlcikgKSxcbiAgICBdO1xuXG4gICAgY29uc3QgaGFzQ3VzdG9tQmVoYXZpb3IgPSBDVVNUT01fQkVIQVZJT1JfVFJJR0dFUl9LRVlTLnNvbWUoIGtleSA9PiAhIXRoaXMuY29uZmlnW2tleV0gKTtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KGNvbWJpbmVbMF0sIGNvbWJpbmVbMV0sIGNvbWJpbmVbMl0sIGNvbWJpbmVbM10pXG4gICAgICAucGlwZShcbiAgICAgICAgLy8gRGVmZXIgdG8gbmV4dCBsb29wIGN5Y2xlLCB1bnRpbCBubyBtb3JlIGluY29taW5nLlxuICAgICAgICAvLyBXZSB1c2UgYW4gYXN5bmMgc2NoZWR1bGFyIGhlcmUgKGluc3RlYWQgb2YgYXNhcFNjaGVkdWxhcikgYmVjYXVzZSB3ZSB3YW50IHRvIGhhdmUgdGhlIGxhcmdlc3QgZGVib3VuY2Ugd2luZG93IHdpdGhvdXQgY29tcHJvbWlzaW5nIGludGVncml0eVxuICAgICAgICAvLyBXaXRoIGFuIGFzeW5jIHNjaGVkdWxhciB3ZSBrbm93IHdlIHdpbGwgcnVuIGFmdGVyIGFsbCBtaWNyby10YXNrcyBidXQgYmVmb3JlIFwicmVhbFwiIGFzeW5jIG9wZXJhdGlvbnMuXG4gICAgICAgIGRlYm91bmNlVGltZSgwKSxcbiAgICAgICAgc3dpdGNoTWFwKCAoW2ZpbHRlciwgc29ydCwgcGFnaW5hdGlvbiwgZGF0YSBdKSA9PiB7XG4gICAgICAgICAgdXBkYXRlcysrOyAvLyBpZiBmaXJzdCwgd2lsbCBiZSAwIG5vdyAoc3RhcnRzIGZyb20gLTEpLlxuICAgICAgICAgIGNvbnN0IGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxURGF0YT4gPSB7XG4gICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgcGFnaW5hdGlvbixcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBpc0luaXRpYWw6IHVwZGF0ZXMgPT09IDAsXG4gICAgICAgICAgICB1cGRhdGVUb3RhbExlbmd0aDogKHRvdGFsTGVuZ3RoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yLnRvdGFsID0gdG90YWxMZW5ndGg7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgcnVuSGFuZGxlID0gZGF0YS5jaGFuZ2VkXG4gICAgICAgICAgICB8fCAoIGhhc0N1c3RvbUJlaGF2aW9yICYmIENVU1RPTV9CRUhBVklPUl9UUklHR0VSX0tFWVMuc29tZSggayA9PiAhIXRoaXMuY29uZmlnW2tdICYmIGV2ZW50W2tdLmNoYW5nZWQpICk7XG5cbiAgICAgICAgICBpZiAocnVuSGFuZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5IYW5kbGUoZXZlbnQpLnBpcGUoXG4gICAgICAgICAgICAgIHRhcCggKCkgPT4gZXZlbnQuZGF0YS5jaGFuZ2VkID0gdHJ1ZSApLCAvLyBpZiB0aGUgdXNlciBkaWRuJ3QgcmV0dXJuIFwiZmFsc2VcIiBmcm9tIGhpcyBoYW5kbGVyLCB3ZSBpbmZlciBkYXRhIHdhcyBjaGFuZ2VkIVxuICAgICAgICAgICAgICBtYXAoIGRhdGEgPT4gKHsgZXZlbnQsIGRhdGEgfSkpLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHsgZXZlbnQsIGRhdGE6IHRoaXMuX2xhc3RTb3VyY2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgbWFwKCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgY29uc3QgY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgICAgY29uc3QgZXZlbnQgPSByZXNwb25zZS5ldmVudDtcblxuICAgICAgICAgIC8vIG1hcmsgd2hpY2ggb2YgdGhlIHRyaWdnZXJzIGhhcyBjaGFuZ2VzXG4gICAgICAgICAgLy8gVGhlIGxvZ2ljIGlzIGJhc2VkIG9uIHRoZSB1c2VyJ3MgY29uZmlndXJhdGlvbiBhbmQgdGhlIGluY29taW5nIGV2ZW50XG4gICAgICAgICAgY29uc3Qgd2l0aENoYW5nZXM6IFBhcnRpYWw8UmVjb3JkPGtleW9mIFBibERhdGFTb3VyY2VDb25maWd1cmFibGVUcmlnZ2VycywgYm9vbGVhbj4+ID0ge307XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgQ1VTVE9NX0JFSEFWSU9SX1RSSUdHRVJfS0VZUykge1xuICAgICAgICAgICAgaWYgKCFjb25maWdba2V5XSAmJiAoZXZlbnQuaXNJbml0aWFsIHx8IGV2ZW50W2tleV0uY2hhbmdlZCkpIHtcbiAgICAgICAgICAgICAgd2l0aENoYW5nZXNba2V5XSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gV2hlbiBkYXRhIGNoYW5nZWQsIGFwcGx5IHNvbWUgbG9naWMgKGNhY2hpbmcsIG9wZXJhdGlvbmFsLCBldGMuLi4pXG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGEuY2hhbmdlZCkge1xuICAgICAgICAgICAgLy8gY2FjaGUgdGhlIGRhdGEgd2hlbiBpdCBoYXMgY2hhbmdlZC5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RTb3VyY2UgPSByZXNwb25zZS5kYXRhO1xuXG4gICAgICAgICAgICBpZiAoY29uZmlnLnNvcnQpIHtcbiAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBpcyBzb3J0aW5nIChpLmUuIHNlcnZlciBzb3J0aW5nKSwgdGhlIGxhc3Qgc29ydCBjYWNoZWQgaXMgYWx3YXlzIHRoZSBsYXN0IHNvdXJjZSB3ZSBnZXQgZnJvbSB0aGUgdXNlci5cbiAgICAgICAgICAgICAgdGhpcy5fbGFzdFNvcnRlZFNvdXJjZSA9IHRoaXMuX2xhc3RTb3VyY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXaGVuIHVzZXIgaXMgTk9UIHNvcnRpbmcgKHdlIHNvcnQgbG9jYWxseSkgQU5EIHRoZSBkYXRhIGhhcyBjaGFuZ2VkIHdlIG5lZWQgdG8gYXBwbHkgc29ydGluZyBvbiBpdFxuICAgICAgICAgICAgICAvLyB0aGlzIG1pZ2h0IGFscmVhZHkgYmUgdHJ1ZSAoaWYgc29ydGluZyB3YXMgdGhlIHRyaWdnZXIpLi4uXG4gICAgICAgICAgICAgIHdpdGhDaGFuZ2VzLnNvcnQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIC8vIGJlY2F1c2Ugd2Ugc29ydCBhbmQgdGhlbiBmaWx0ZXIsIGZpbHRlcmluZyB1cGRhdGVzIGFyZSBhbHNvIHRyaWdnZXJlZCBieSBzb3J0IHVwZGF0ZWRcbiAgICAgICAgICAgICAgd2l0aENoYW5nZXMuZmlsdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNvbmZpZy5maWx0ZXIpIHtcbiAgICAgICAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBpcyBmaWx0ZXJpbmcgKGkuZS4gc2VydmVyIGZpbHRlcmluZyksIHRoZSBsYXN0IGZpbHRlciBjYWNoZWQgaXMgYWx3YXlzIHRoZSBsYXN0IHNvdXJjZSB3ZSBnZXQgZnJvbSB0aGUgdXNlci5cbiAgICAgICAgICAgICAgdGhpcy5fbGFzdEZpbHRlcmVkU291cmNlID0gdGhpcy5fbGFzdFNvdXJjZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdoZW4gdXNlciBpcyBOT1QgZmlsdGVyaW5nICh3ZSBmaWx0ZXIgbG9jYWxseSkgQU5EIHRoZSBkYXRhIGhhcyBjaGFuZ2VkIHdlIG5lZWQgdG8gYXBwbHkgZmlsdGVyaW5nIG9uIGl0XG4gICAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgYWxyZWFkeSBiZSB0cnVlIChpZiBmaWx0ZXJpbmcgd2FzIHRoZSB0cmlnZ2VyKS4uLlxuICAgICAgICAgICAgICB3aXRoQ2hhbmdlcy5maWx0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdoZW4gdXNlciBpcyBOT1QgYXBwbHlpbmcgcGFnaW5hdGlvbiAod2UgcGFnaW5hdGUgbG9jYWxseSkgQU5EIGlmIHdlIChzb3J0IE9SIGZpbHRlcikgbG9jYWxseSB3ZSBhbHNvIG5lZWQgdG8gcGFnaW5hdGUgbG9jYWxseVxuICAgICAgICAgIGlmICghY29uZmlnLnBhZ2luYXRpb24gJiYgKHdpdGhDaGFuZ2VzLnNvcnQgfHwgd2l0aENoYW5nZXMuZmlsdGVyKSkge1xuICAgICAgICAgICAgd2l0aENoYW5nZXMucGFnaW5hdGlvbiA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm93LCBhcHBseTogc29ydCAtLT4gZmlsdGVyIC0tPiBwYWdpbmF0aW9uICAgICAoIE9SREVSIE1BVFRFUlMhISEgKVxuXG4gICAgICAgICAgaWYgKHdpdGhDaGFuZ2VzLnNvcnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RTb3J0ZWRTb3VyY2UgPSB0aGlzLmFwcGx5U29ydCh0aGlzLl9sYXN0U291cmNlLCBldmVudC5zb3J0LmN1cnIgfHwgZXZlbnQuc29ydC5wcmV2KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgZGF0YTogVFtdID0gdGhpcy5fbGFzdFNvcnRlZFNvdXJjZTtcblxuICAgICAgICAgIC8vIHdlIGNoZWNrIGlmIGZpbHRlciB3YXMgYXNrZWQsIGJ1dCBhbHNvIGlmIHdlIGhhdmUgYSBmaWx0ZXIgd2UgcmUtcnVuXG4gICAgICAgICAgLy8gT25seSBzb3J0aW5nIGlzIGNhY2hlZCBhdCB0aGlzIHBvaW50IGZpbHRlcmluZyBpcyBhbHdheXMgY2FsY3VsYXRlZFxuICAgICAgICAgIGlmICh3aXRoQ2hhbmdlcy5maWx0ZXIgfHwgKGV2ZW50LmZpbHRlci5jdXJyICYmIGV2ZW50LmZpbHRlci5jdXJyLmZpbHRlcikpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9sYXN0RmlsdGVyZWRTb3VyY2UgPSB0aGlzLmFwcGx5RmlsdGVyKGRhdGEsIGV2ZW50LmZpbHRlci5jdXJyIHx8IGV2ZW50LmZpbHRlci5wcmV2KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAod2l0aENoYW5nZXMucGFnaW5hdGlvbikge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuYXBwbHlQYWdpbmF0aW9uKGRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGNsb25lZEV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxURGF0YT4gPSB7IC4uLmV2ZW50IH07XG5cbiAgICAgICAgICAvLyBXZSB1c2UgYGNvbWJpbmVMYXRlc3RgIHdoaWNoIGNhY2hlcyBwZXJ2aW91cyBldmVudHMsIG9ubHkgbmV3IGV2ZW50cyBhcmUgcmVwbGFjZWQuXG4gICAgICAgICAgLy8gV2UgbmVlZCB0byBtYXJrIGV2ZXJ5dGhpbmcgYXMgTk9UIENIQU5HRUQsIHNvIHN1YnNlcXVlbnQgY2FsbHMgd2lsbCBub3QgaGF2ZSB0aGVpciBjaGFuZ2VkIGZsYWcgc2V0IHRvIHRydWUuXG4gICAgICAgICAgLy9cbiAgICAgICAgICAvLyBXZSBhbHNvIGNsb25lIHRoZSBvYmplY3Qgc28gd2UgY2FuIHBhc3Mgb24gdGhlIHByb3BlciB2YWx1ZXMuXG4gICAgICAgICAgLy8gV2UgY3JlYXRlIHNoYWxsb3cgY2xvbmVzIHNvIGNvbXBsZXggb2JqZWN0cyAoY29sdW1uIGluIHNvcnQsIHVzZXIgZGF0YSBpbiBkYXRhKSB3aWxsIG5vdCB0aHJvdyBvbiBjaXJjdWxhci5cbiAgICAgICAgICAvLyBGb3IgcGFnaW5hdGlvbiB3ZSBkZWVwIGNsb25lIGJlY2F1c2UgaXQgY29udGFpbnMgcHJpbWl0aXZlcyBhbmQgd2UgbmVlZCB0byBhbHNvIGNsb25lIHRoZSBpbnRlcm5hbCBjaGFuZ2Ugb2JqZWN0cy5cbiAgICAgICAgICBmb3IgKGNvbnN0IGsgb2YgVFJJR0dFUl9LRVlTKSB7XG4gICAgICAgICAgICBjbG9uZWRFdmVudFtrXSA9IGsgPT09ICdwYWdpbmF0aW9uJ1xuICAgICAgICAgICAgICA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZXZlbnRba10pKVxuICAgICAgICAgICAgICA6IHsgLi4uZXZlbnRba10gfVxuICAgICAgICAgICAgO1xuICAgICAgICAgICAgZXZlbnRba10uY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBldmVudC5wYWdpbmF0aW9uLnBhZ2UuY2hhbmdlZCA9IGV2ZW50LnBhZ2luYXRpb24ucGVyUGFnZS5jaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXZlbnQ6IGNsb25lZEV2ZW50LFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHNvcnRlZDogdGhpcy5fbGFzdFNvcnRlZFNvdXJjZSxcbiAgICAgICAgICAgIGZpbHRlcmVkOiB0aGlzLl9sYXN0RmlsdGVyZWRTb3VyY2UsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlGaWx0ZXIoZGF0YTogVFtdLCBkYXRhU291cmNlRmlsdGVyOiBEYXRhU291cmNlRmlsdGVyKTogVFtdIHtcbiAgICBkYXRhID0gZmlsdGVyaW5nRm4oZGF0YSwgZGF0YVNvdXJjZUZpbHRlcik7XG4gICAgaWYgKCF0aGlzLmNvbmZpZy5wYWdpbmF0aW9uKSB7XG4gICAgICB0aGlzLnJlc2V0UGFnaW5hdGlvbihkYXRhLmxlbmd0aCk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5U29ydChkYXRhOiBUW10sIGV2ZW50OiBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlKTogVFtdIHtcbiAgICByZXR1cm4gYXBwbHlTb3J0KGV2ZW50LmNvbHVtbiwgZXZlbnQuc29ydCwgZGF0YSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlQYWdpbmF0aW9uKGRhdGE6IFRbXSk6ICBUW10ge1xuICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgLy8gU2V0IHRoZSByZW5kZXJlZCByb3dzIGxlbmd0aCB0byB0aGUgdmlydHVhbCBwYWdlIHNpemUuIEZpbGwgaW4gdGhlIGRhdGEgcHJvdmlkZWRcbiAgICAgIC8vIGZyb20gdGhlIGluZGV4IHN0YXJ0IHVudGlsIHRoZSBlbmQgaW5kZXggb3IgcGFnaW5hdGlvbiBzaXplLCB3aGljaGV2ZXIgaXMgc21hbGxlci5cbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5wYWdpbmF0b3IucmFuZ2U7XG4gICAgICByZXR1cm4gZGF0YS5zbGljZShyYW5nZVswXSwgcmFuZ2VbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXNldFBhZ2luYXRpb24odG90YWxMZW5ndGg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy5wYWdpbmF0b3IudG90YWwgPSB0b3RhbExlbmd0aDtcbiAgICAgIHRoaXMucGFnaW5hdG9yLnBhZ2UgPSB0b3RhbExlbmd0aCA+IDAgPyAxIDogMDtcbiAgICB9XG4gIH1cblxuICAvKiBOb3RlOiAgQ3VycmVudGx5IHRoaXMgaXMgb25seSB1c2VkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgIEhvd2V2ZXIsIGlmIGNhbGxlZCBlbHNld2hlcmUgKGkuZS4gaWYgd2UgY2FuIHJlLWluaXQgdGhlIGFkYXB0ZXIpIHdlIG5lZWQgdG8gdHJhY2sgYWxsIGNvZGUgdGhhdCBpcyB1c2luZ1xuICAgICAgICAgICAgYG9uU291cmNlQ2hhbmdlZGAgYW5kIG9yIGBvblNvdXJjZUNoYW5naW5nYCBhbmQgbWFrZSBpdCBzdXBwb3J0IHRoZSByZXBsYWNlbWVudCBvZiB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAgICAgIEJlY2F1c2UgdGhlIEFQSSBpcyBwdWJsaWMgaXQgd2lsbCBwcm9iYWJseSB3b24ndCB3b3JrIHNvIHRoZSBiZXN0IHNvbHV0aW9uIG1pZ2h0IGJlIHRvIHN3aXRjaFxuICAgICAgICAgICAgYG9uU291cmNlQ2hhbmdlZGAgYW5kIGBvblNvdXJjZUNoYW5naW5nYCB0byBzdWJqZWN0cyB0aGF0IGFyZSBhbGl2ZSBhbHdheXMgYW5kIGVtaXQgdGhlbSBpbnRlcm5hbGx5IGluIHRoaXMgY2xhc3MuICovXG4gIHByaXZhdGUgaW5pdFN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fb25Tb3VyY2VDaGFuZ2UkID0gbmV3IFN1YmplY3Q8VFtdPigpO1xuICAgIHRoaXMub25Tb3VyY2VDaGFuZ2VkID0gdGhpcy5fb25Tb3VyY2VDaGFuZ2UkLnBpcGUoZmlsdGVyKCBkID0+IGQgIT09IFNPVVJDRV9DSEFOR0lOR19UT0tFTiApKTtcbiAgICB0aGlzLm9uU291cmNlQ2hhbmdpbmcgPSB0aGlzLl9vblNvdXJjZUNoYW5nZSQucGlwZShmaWx0ZXIoIGQgPT4gZCA9PT0gU09VUkNFX0NIQU5HSU5HX1RPS0VOICkpO1xuICAgIHRoaXMuX3JlZnJlc2gkID0gbmV3IFN1YmplY3Q8UmVmcmVzaERhdGFXcmFwcGVyPFREYXRhPj4oKTtcbiAgICB0aGlzLl9sYXN0U291cmNlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGUgdGhlIHVzZXItcHJvdmlkZWQgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBkYXRhIGNvbGxlY3Rpb24uXG4gICAqIFRoaXMgbWV0aG9kIHdyYXBzIGVhY2ggb2YgdGhlIHRyaWdnZXJzIHdpdGggYSBjb250YWluZXIgcHJvdmlkaW5nIG1ldGFkYXRhIGZvciB0aGUgdHJpZ2dlci4gKE9sZCB2YWx1ZSwgd2FzIGNoYW5nZWQ/IGFuZCBuZXcgdmFsdWUgaWYgY2hhbmdlZClcbiAgICogVGhpcyBpcyB3aGVyZSBhbGwgY2FjaGUgbG9naWMgaXMgbWFuYWdlZCAoY3JlYXRlQ2hhbmdlQ29udGFpbmVyKS5cbiAgICpcbiAgICogVG8gYnVpbGQgYSBkYXRhIGNvbGxlY3Rpb24gdGhlIGluZm9ybWF0aW9uIGZyb20gYWxsIHRyaWdnZXJzIGlzIHJlcXVpcmVkLCBldmVuIGlmIGl0IHdhcyBub3QgY2hhbmdlZC5cbiAgICogV2hlbiBhIHRyaWdnZXIgaXMgZmlyZWQgd2l0aCBhIG5ldyB2YWx1ZSB0aGUgbmV3IHZhbHVlIHJlcGxhY2VzIHRoZSBvbGQgdmFsdWUgZm9yIHRoZSB0cmlnZ2VyIGFuZCBhbGwgb3RoZXIgdHJpZ2dlcnMgd2lsbCBrZWVwIHRoZWlyIG9sZCB2YWx1ZS5cbiAgICogU2VuZGluZyB0aGUgdHJpZ2dlcnMgdG8gdGhlIGhhbmRsZXJzIGlzIG5vdCBlbm91Z2gsIHdlIGFsc28gbmVlZCB0byB0aGUgaGFuZGxlcnMgd2hpY2ggb2YgdGhlIHRyaWdnZXIncyBoYXZlIGNoYW5nZSBzbyB0aGV5IGNhbiByZXR1cm5cbiAgICogZGF0YSB3aXRob3V0IGRvaW5nIHJlZHVuZGFudCB3b3JrLlxuICAgKiBGb3IgZXhhbXBsZSwgZmV0Y2hpbmcgcGFnaW5hdGVkIGRhdGEgZnJvbSB0aGUgc2VydmVyIHJlcXVpcmVzIGEgY2FsbCB3aGVuZXZlciB0aGUgcGFnZXMgY2hhbmdlcyBidXQgaWYgdGhlIGZpbHRlcmluZyBpcyBsb2NhbCBmb3IgdGhlIGN1cnJlbnQgcGFnZVxuICAgKiBhbmQgdGhlIGZpbHRlciB0cmlnZ2VyIGlzIGZpcmVkIHRoZSBoYW5kbGVyIG5lZWRzIHRvIGtub3cgdGhhdCBwYWdpbmF0aW9uIGRpZCBub3QgY2hhbmdlIHNvIGl0IHdpbGwgbm90IGdvIGFuZCBmZXRjaCBkYXRhIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogVGhlIGhhbmRsZXIgY2FuIHJldHVybiBzZXZlcmFsIGRhdGEgc3RydWN0dXJlcywgb2JzZXJ2YWJsZSwgcHJvbWlzZSwgYXJyYXkgb3IgZmFsc2UuXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgbm9ybWFsaXplIHRoZSByZXNwb25zZSBpbnRvIGFuIG9ic2VydmFibGUgYW5kIG5vdGlmeSB0aGF0IHRoZSBzb3VyY2UgY2hhbmdlZCAob25Tb3VyY2VDaGFuZ2VkKS5cbiAgICpcbiAgICogV2hlbiB0aGUgcmVzcG9uc2UgaXMgZmFsc2UgdGhhdCBoYW5kbGVyIHdhbnRzIHRvIHNraXAgdGhpcyBjeWNsZSwgdGhpcyBtZWFucyB0aGF0IG9uU291cmNlQ2hhbmdlZCB3aWxsIG5vdCBlbWl0IGFuZFxuICAgKiBhIGRlYWQtZW5kIG9ic2VydmFibGUgaXMgcmV0dXJuZWQgKG9ic2VydmFibGUgdGhhdCB3aWxsIG5ldmVyIGVtaXQpLlxuICAgKi9cbiAgcHJpdmF0ZSBydW5IYW5kbGUoZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPik6IE9ic2VydmFibGU8VFtdPiB7XG4gICAgdGhpcy5fb25Tb3VyY2VDaGFuZ2UkLm5leHQoU09VUkNFX0NIQU5HSU5HX1RPS0VOKTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc291cmNlRmFjdG9yeShldmVudCk7XG4gICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBvZihmYWxzZSkucGlwZShmaWx0ZXIoICgpID0+IGZhbHNlICkpIGFzIGFueTsgLy8gc3RvcCBlbWlzc2lvbnMgaWYgZ290IGZhbHNlLlxuICAgIH1cblxuICAgIGNvbnN0IG9iczogT2JzZXJ2YWJsZTxUW10+ID0gaXNPYnNlcnZhYmxlKHJlc3VsdClcbiAgICAgID8gcmVzdWx0XG4gICAgICA6IEFycmF5LmlzQXJyYXkocmVzdWx0KVxuICAgICAgICA/IG9mKHJlc3VsdClcbiAgICAgICAgOiBmcm9tKHJlc3VsdCkgLy8gcHJvbWlzZS4uLlxuICAgIDtcblxuICAgIHJldHVybiBvYnMucGlwZShcbiAgICAgIC8vIHJ1biBhcyBhIG1pY3JvLXRhc2tcbiAgICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyLCAwKSxcbiAgICAgIG1hcCggZGF0YSA9PiBBcnJheS5pc0FycmF5KGRhdGEpID8gZGF0YSA6IFtdICksXG4gICAgICB0YXAoIGRhdGEgPT4gdGhpcy5fb25Tb3VyY2VDaGFuZ2UkLm5leHQoZGF0YSkgKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==