/**
 * @fileoverview added by tsickle
 * Generated from: lib/data-source/data-source.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, Subject, of, asapScheduler } from 'rxjs';
import { mapTo, skip, observeOn, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { unrx } from '../grid/utils';
import { PblPagingPaginator, PblTokenPaginator } from '../paginator';
import { createFilter } from './filtering';
/** @type {?} */
const PROCESSING_SUBSCRIPTION_GROUP = {};
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
export class PblDataSource extends DataSource {
    /**
     * @param {?} adapter
     * @param {?=} options
     */
    constructor(adapter, options) {
        super();
        this._selection = new SelectionModel(true, []);
        this._tableConnectionChange$ = new Subject();
        this._onRenderDataChanging = new Subject();
        this._renderData$ = new BehaviorSubject([]);
        this._filter$ = new BehaviorSubject(undefined);
        this._sort$ = new BehaviorSubject({ column: null, sort: null, skipUpdate: false });
        this._onError$ = new Subject();
        options = options || {};
        this.adapter = adapter;
        this.onSourceChanging = this._adapter.onSourceChanging;
        // emit source changed event every time adapter gets new data
        this.onSourceChanged = this.adapter.onSourceChanged
            .pipe(observeOn(asapScheduler, 0), // emit on the end of the current turn (micro-task) to ensure `onSourceChanged` emission in `_updateProcessingLogic` run's first.
        mapTo(undefined));
        this.onRenderDataChanging = this._onRenderDataChanging.asObservable();
        this.onRenderedDataChanged = this._renderData$.pipe(skip(1), mapTo(undefined));
        this.onError = this._onError$.asObservable();
        this.tableConnectionChange = this._tableConnectionChange$.asObservable();
        this.keepAlive = options.keepAlive || false;
        this.skipInitial = options.skipInitial || false;
        this.sortChange = this._sort$.asObservable();
    }
    /**
     * @return {?}
     */
    get pagination() { return this._pagination; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pagination(value) {
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
    }
    /**
     * @return {?}
     */
    get adapter() { return this._adapter; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set adapter(value) {
        if (this._adapter !== value) {
            this._adapter = value;
            if (this.pagination) {
                this._adapter.setPaginator(this._paginator);
            }
        }
    }
    // TODO(1.0.0): remove
    /**
     * @deprecated BREAKING CHANGE: removed in 1.0.0 - Use renderedData instead.
     * @return {?}
     */
    get renderedRows() { return this._renderData$.value || []; }
    /**
     * Returns the starting index of the rendered data
     * @return {?}
     */
    get renderStart() { return this._lastRange ? this._lastRange.start : 0; }
    /**
     * @return {?}
     */
    get renderLength() { return this._renderData$.value.length; }
    /**
     * @return {?}
     */
    get renderedData() { return this._renderData$.value || []; }
    /**
     * The `source` with sorting applied.
     * Valid only when sorting is performed client-side.
     *
     * To get real-time notifications use `onRenderDataChanging`.
     * The sorted data is updated just before `onRenderDataChanging` fire.
     * @return {?}
     */
    get sortedData() { return (this._lastAdapterEvent && this._lastAdapterEvent.sorted) || []; }
    ;
    /**
     * The `source` with filtering applied.
     * Valid only when filtering is performed client-side.
     * If sorting is applied as well, the filtered results are also sorted.
     *
     * To get real-time notifications use `onRenderDataChanging`.
     * The filtered data is updated just before `onRenderDataChanging` fire.
     * @return {?}
     */
    get filteredData() { return (this._lastAdapterEvent && this._lastAdapterEvent.filtered) || []; }
    ;
    /**
     * @return {?}
     */
    get filter() { return this._filter$.value; }
    /**
     * @return {?}
     */
    get sort() { return this._sort$.value; }
    /**
     * @return {?}
     */
    get paginator() { return this._paginator; }
    /**
     * @return {?}
     */
    get length() { return this.source.length; }
    /**
     * @return {?}
     */
    get source() { return this._source || []; }
    /**
     * Represents selected items on the data source.
     * @return {?}
     */
    get selection() { return this._selection; }
    /**
     * A custom trigger that invokes a manual data source change with the provided data value in the `data` property at tht event.
     * @param {?=} data
     * @return {?}
     */
    refresh(data) {
        if (this._tableConnected) {
            this._adapter.refresh(data);
        }
        else {
            this._lastRefresh = data;
        }
    }
    /**
     * @param {?=} value
     * @param {?=} columns
     * @return {?}
     */
    setFilter(value, columns) {
        if (value && typeof value !== 'function' && (!columns || columns.length === 0)) {
            throw new Error('Invalid filter definitions, columns are mandatory when using a single value input.');
        }
        this._filter$.next(createFilter(value, columns || []));
    }
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
    syncFilter() {
        /** @type {?} */
        const currentFilter = this._adapter.clearCache('filter');
        if (currentFilter) {
            this.setFilter(currentFilter.filter, currentFilter.columns);
        }
    }
    /**
     * @param {?=} column
     * @param {?=} sort
     * @param {?=} skipUpdate
     * @return {?}
     */
    setSort(column, sort, skipUpdate = false) {
        if (!column || typeof column === 'boolean') {
            this._sort$.next({ column: null, sort: {}, skipUpdate: !!column });
        }
        else {
            this._sort$.next({ column, sort, skipUpdate });
        }
    }
    /**
     * @return {?}
     */
    dispose() {
        if (!this._disposed) {
            unrx.kill(this);
            this._adapter.dispose();
            this._onRenderDataChanging.complete();
            this._renderData$.complete();
            this._filter$.complete();
            this._sort$.complete();
            this._onError$.complete();
            this._disposed = true;
        }
    }
    /**
     * @param {?} cv
     * @return {?}
     */
    disconnect(cv) {
        this._lastRefresh = undefined;
        this._tableConnectionChange$.next(this._tableConnected = false);
        if (this.keepAlive === false) {
            this.dispose();
        }
    }
    /**
     * @param {?} cv
     * @return {?}
     */
    connect(cv) {
        if (this._disposed) {
            throw new Error('PblDataSource is disposed. Use `keepAlive` if you move datasource between tables.');
        }
        this._tableConnected = true;
        this._updateProcessingLogic(cv);
        this._tableConnectionChange$.next(this._tableConnected);
        return this._renderData$;
    }
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
    moveItem(fromIndex, toIndex, absolute = false) {
        if (absolute !== true && this._lastRange) {
            fromIndex = this._lastRange.start + fromIndex;
            toIndex = this._lastRange.start + toIndex;
        }
        if (this.length > 0) {
            moveItemInArray(this._source, fromIndex, toIndex);
            /** @type {?} */
            const data = this._lastRange
                ? this._source.slice(this._lastRange.start, this._lastRange.end)
                : this._source;
            this._renderData$.next(data);
        }
    }
    /**
     * @private
     * @param {?} cv
     * @return {?}
     */
    _updateProcessingLogic(cv) {
        /** @type {?} */
        const initialState = { filter: this.filter, sort: this.sort };
        /** @type {?} */
        const paginator = this._paginator;
        if (paginator) {
            initialState.pagination = { page: paginator.page, perPage: paginator.perPage };
        }
        /** @type {?} */
        const stream = this._adapter.updateProcessingLogic(this._filter$, this._sort$, paginator ? paginator.onChange : of(undefined), initialState);
        unrx.kill(this, PROCESSING_SUBSCRIPTION_GROUP);
        /** @type {?} */
        const trimToRange = (/**
         * @param {?} range
         * @param {?} data
         * @return {?}
         */
        (range, data) => data.slice(range.start, range.end));
        /** @type {?} */
        let skipViewChange;
        /** @type {?} */
        let lastEmittedSource;
        cv.viewChange
            .pipe(unrx(this, PROCESSING_SUBSCRIPTION_GROUP))
            .subscribe((/**
         * @param {?} range
         * @return {?}
         */
        range => {
            if (this._lastRange && this._lastRange.start === range.start && this._lastRange.end === range.end) {
                return;
            }
            this._lastRange = range;
            if (!skipViewChange) {
                if (range && lastEmittedSource && lastEmittedSource.length) {
                    this._renderData$.next(trimToRange(this._lastRange, lastEmittedSource));
                }
            }
        }));
        stream
            .pipe(unrx(this, PROCESSING_SUBSCRIPTION_GROUP), tap((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            lastEmittedSource = result.data;
            skipViewChange = true;
            this._onRenderDataChanging.next(this._lastAdapterEvent = result);
        })))
            .subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ({ data }) => {
            if (this._lastRange && data && data.length) {
                data = trimToRange(this._lastRange, data);
            }
            this._renderData$.next(data);
            skipViewChange = false;
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => { this._onError$.next(error); }));
        this._adapter.onSourceChanged
            .pipe(unrx(this, PROCESSING_SUBSCRIPTION_GROUP))
            .subscribe((/**
         * @param {?} source
         * @return {?}
         */
        source => this._source = source || []));
        if (this._lastRefresh !== undefined) {
            this._adapter.refresh(this._lastRefresh);
            this._lastRefresh = undefined;
        }
        else if (!this.skipInitial) {
            // _refresh$ is a Subject, we must emit once so combineLatest will work
            this.refresh();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLGVBQWUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGNBQWMsRUFBK0IsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXpELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUF1QyxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUUxRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sYUFBYSxDQUFDOztNQU1yQyw2QkFBNkIsR0FBRyxFQUFFOzs7O0FBRXhDLDBDQVlDOzs7Ozs7SUFSQyx5Q0FBb0I7Ozs7Ozs7O0lBT3BCLDJDQUFzQjs7Ozs7QUFHeEIsTUFBTSxPQUFPLGFBQW9DLFNBQVEsVUFBYTs7Ozs7SUFrSnBFLFlBQVksT0FBdUMsRUFBRSxPQUE4QjtRQUNqRixLQUFLLEVBQUUsQ0FBQztRQXBCUyxlQUFVLEdBQUcsSUFBSSxjQUFjLENBQUksSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRCQUF1QixHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7UUFDakQsMEJBQXFCLEdBQUcsSUFBSSxPQUFPLEVBQWlFLENBQUM7UUFDckcsaUJBQVksR0FBRyxJQUFJLGVBQWUsQ0FBTSxFQUFFLENBQUMsQ0FB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QUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQy9CO2FBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDNUIsdUVBQXVFO1lBQ3ZFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtJQUNILENBQUM7Q0FDRjs7Ozs7Ozs7Ozs7O0lBOVVDLHlDQUE0Qzs7Ozs7Ozs7Ozs7SUFVNUMsd0NBQTJDOzs7Ozs7Ozs7Ozs7O0lBWTNDLDZDQUF5Rzs7Ozs7Ozs7SUFPekcsOENBQWlEOztJQUNqRCxnQ0FBb0M7Ozs7O0lBSXBDLDhDQUFvRDs7SUFDcEQsbUNBQThEOzs7Ozs7SUFNOUQsa0NBQTRCOzs7Ozs7OztJQU81QixvQ0FBOEI7Ozs7O0lBK0M5QixtQ0FBZ0U7Ozs7O0lBQ2hFLGdEQUFvRTs7Ozs7SUFDcEUsOENBQXdIOzs7OztJQUN4SCxxQ0FBK0Q7Ozs7O0lBQy9ELGlDQUFrSDs7Ozs7SUFDbEgsK0JBQXlKOzs7OztJQUN6SixrQ0FBMkM7Ozs7O0lBRTNDLG1DQUF3Qzs7Ozs7SUFFeEMsb0NBQW1EOzs7OztJQUNuRCxpQ0FBdUM7Ozs7O0lBQ3ZDLGdDQUFxQjs7Ozs7SUFDckIsa0NBQTJCOzs7OztJQUMzQix3Q0FBaUM7Ozs7O0lBQ2pDLHFDQUE0Qjs7Ozs7SUFDNUIsbUNBQThCOzs7OztJQUM5QiwwQ0FBeUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QsIG9mLCBhc2FwU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXBUbywgc2tpcCwgb2JzZXJ2ZU9uLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFNlbGVjdGlvbk1vZGVsLCBDb2xsZWN0aW9uVmlld2VyLCBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBtb3ZlSXRlbUluQXJyYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgdW5yeCB9IGZyb20gJy4uL2dyaWQvdXRpbHMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vZ3JpZC9jb2x1bW5zJztcbmltcG9ydCB7IFBibE5ncmlkUGFnaW5hdG9yS2luZCwgUGJsUGFnaW5hdG9yLCBQYmxQYWdpbmdQYWdpbmF0b3IsIFBibFRva2VuUGFnaW5hdG9yIH0gZnJvbSAnLi4vcGFnaW5hdG9yJztcbmltcG9ydCB7IERhdGFTb3VyY2VQcmVkaWNhdGUsIERhdGFTb3VyY2VGaWx0ZXIsIERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgY3JlYXRlRmlsdGVyIH0gZnJvbSAnLi9maWx0ZXJpbmcnO1xuaW1wb3J0IHsgUGJsRGF0YVNvdXJjZUFkYXB0ZXIgfSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXInO1xuaW1wb3J0IHsgUGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZSwgUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQsIFBibERhdGFTb3VyY2VBZGFwdGVyUHJvY2Vzc2VkUmVzdWx0IH0gZnJvbSAnLi9kYXRhLXNvdXJjZS1hZGFwdGVyLnR5cGVzJztcblxuZXhwb3J0IHR5cGUgRGF0YVNvdXJjZU9mPFQ+ID0gVFtdIHwgUHJvbWlzZTxUW10+IHwgT2JzZXJ2YWJsZTxUW10+O1xuXG5jb25zdCBQUk9DRVNTSU5HX1NVQlNDUklQVElPTl9HUk9VUCA9IHt9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibERhdGFTb3VyY2VPcHRpb25zIHtcbiAgLyoqXG4gICAqIFdoZW4gc2V0IHRvIFRydWUgd2lsbCBub3QgZGlzY29ubmVjdCB1cG9uIHRhYmxlIGRpc2Nvbm5lY3Rpb24sIG90aGVyd2lzZSBkb2VzLlxuICAgKi9cbiAga2VlcEFsaXZlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNraXAgdGhlIGZpcnN0IHRyaWdnZXIgZW1pc3Npb24uXG4gICAqIFVzZSB0aGlzIGZvciBsYXRlIGJpbmRpbmcsIHVzdWFsbHkgd2l0aCBhIGNhbGwgdG8gcmVmcmVzaCgpIG9uIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogTm90ZSB0aGF0IG9ubHkgdGhlIGludGVybmFsIHRyaWdnZXIgY2FsbCBpcyBza2lwcGVkLCBhIGN1c3RvbSBjYWxscyB0byByZWZyZXNoIHdpbGwgZ28gdGhyb3VnaFxuICAgKi9cbiAgc2tpcEluaXRpYWw/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsRGF0YVNvdXJjZTxUID0gYW55LCBURGF0YSA9IGFueT4gZXh0ZW5kcyBEYXRhU291cmNlPFQ+IHtcblxuICBnZXQgcGFnaW5hdGlvbigpOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSB7IHJldHVybiB0aGlzLl9wYWdpbmF0aW9uOyB9XG4gIHNldCBwYWdpbmF0aW9uKHZhbHVlOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZSkge1xuICAgIGlmICh0aGlzLl9wYWdpbmF0aW9uICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fcGFnaW5hdGlvbiA9IHZhbHVlO1xuICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICBjYXNlICdwYWdlTnVtYmVyJzpcbiAgICAgICAgICB0aGlzLl9wYWdpbmF0b3IgPSBuZXcgUGJsUGFnaW5nUGFnaW5hdG9yKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Rva2VuJzpcbiAgICAgICAgICB0aGlzLl9wYWdpbmF0b3IgPSBuZXcgUGJsVG9rZW5QYWdpbmF0b3IoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aGlzLl9wYWdpbmF0b3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fYWRhcHRlcikge1xuICAgICAgICB0aGlzLl9hZGFwdGVyLnNldFBhZ2luYXRvcih0aGlzLl9wYWdpbmF0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIHRoYXQgZW1pdCBldmVudHMgd2hlbiBhbiBuZXcgaW5jb21pbmcgc291cmNlIGlzIGV4cGVjdGVkLCBiZWZvcmUgY2FsbGluZyB0aGUgdHJpZ2dlciBoYW5kbGVyIHRvIGdldCB0aGUgbmV3IHNvdXJjZS5cbiAgICogVGhpcyBldmVuIGlzIHVzdWFsbHkgZm9sbG93ZWQgYnkgdGhlIGBvblNvdXJjZUNoYW5nZWRgIGV2ZW50IGJ1dCBub3QgYWx3YXlzLiBUaGlzIGlzIGJlY2F1c2UgdGhlIHRyaWdnZXIgaGFuZGxlclxuICAgKiBjYW4gY2FuY2VsIHRoZSBvcGVyYXRpb24gKHdoZW4gaXQgcmV0dXJucyBmYWxzZSkgd2hpY2ggbWVhbnMgYW4gYG9uU291cmNlQ2hhbmdlZGAgZXZlbnQgd2lsbCBub3QgZmlyZS5cbiAgICpcbiAgICogRW1pc3Npb25zIG9jY3VyIHdoZW4gdGhlIHRyaWdnZXIgaGFuZGxlciBpcyBpbnZva2VkIGFuZCBhbHNvIHdoZW4gdGhlIHRyaWdnZXIgaGFuZGxlciByZXR1cm5lZCBhbiBvYnNlcnZhYmxlIGFuZCB0aGUgb2JzZXJ2YWJsZSBlbWl0cy5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgYSBtaWNyby10YXNrIGRlbGF5cyBpcyBhcHBsaWVkIGJldHdlZW4gdGhlIGBvblNvdXJjZUNoYW5naW5nYCBzdWJzZXF1ZW50IGBvblNvdXJjZUNoYW5nZWRgIGV2ZW50ICh3aGVuIGVtaXR0ZWQpLlxuICAgKi9cbiAgcmVhZG9ubHkgb25Tb3VyY2VDaGFuZ2luZzogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBlbWl0IGV2ZW50cyB3aGVuIGEgbmV3IHNvdXJjZSBoYXMgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSB0cmlnZ2VyIGhhbmRsZXIgYnV0IGJlZm9yZSBhbnkgcHJvY2Vzc2luZyBpcyBhcHBsaWVkLlxuICAgKiBFbWlzc2lvbnMgb2NjdXIgd2hlbiB0aGUgdHJpZ2dlciBoYW5kbGVyIGlzIGludm9rZWQgYW5kIGFsc28gd2hlbiB0aGUgdHJpZ2dlciBoYW5kbGVyIHJldHVybmVkIGFuIG9ic2VydmFibGUgYW5kIHRoZSBvYnNlcnZhYmxlIGVtaXRzLlxuICAgKlxuICAgKiBFeGFtcGxlczogQ2FsbGluZyBgcmVmcmVzaCgpYCwgZmlsdGVyIC8gc29ydCAvIHBhZ2luYXRpb24gZXZlbnRzLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB0aGUgYG9uU291cmNlQ2hhbmdlZGAgZmlyZWQgYmVmb3JlIHRoZSBkYXRhIGlzIHJlbmRlcmVkIGFuZSBiZWZvcmUgYW55IGNsaWVudC1zaWRlIGZpbHRlci9zb3J0L3BhZ2luYXRpb24gYXJlIGFwcGxpZWQuXG4gICAqIEl0IG9ubHkgaW5kaWNhdGVzIHRoYXQgdGhlIHNvdXJjZSBkYXRhLXNldCBpcyBub3cgdXBkYXRlZCBhbmQgdGhlIGdyaWQgaXMgYWJvdXQgdG8gYXBwbHkgbG9naWMgb24gdGhlIGRhdGEtc2V0IGFuZCB0aGVuIHJlbmRlciBpdC5cbiAgICovXG4gIHJlYWRvbmx5IG9uU291cmNlQ2hhbmdlZDogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBlbWl0IGV2ZW50cyB3aGVuIG5ldyBzb3VyY2UgaGFzIGJlZW4gcmVjZWl2ZWQgZnJvbSB0aGUgdHJpZ2dlciBoYW5kbGVyIGFuZCBhZnRlciBpdCB3YXMgcHJvY2Vzc2VkLlxuICAgKiBFbWlzc2lvbnMgd2lsbCBvY2N1ciBhZnRlciBgb25Tb3VyY2VDaGFuZ2VkYCBldmVudCBoYXMgYmVlbiBmaXJlZC5cbiAgICpcbiAgICogVGhlIG1haW4gZGlmZmVyZW5jZSBiZXR3ZWVuIGBvblNvdXJjZUNoYW5nZWRgIGFuZCBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGlzIGxvY2FsIHByb2Nlc3NpbmcgcGVyZm9ybWVkIGluIHRoZSBkYXRhc291cmNlLlxuICAgKiBUaGVzZSBhcmUgdXN1YWxseSBjbGllbnQtc2lkZSBvcGVyYXRpb25zIGxpa2UgZmlsdGVyL3NvcnQvcGFnaW5hdGlvbi4gSWYgYWxsIG9mIHRoZXNlIGV2ZW50cyBhcmUgaGFuZGxlZCBtYW51YWxseSAoY3VzdG9tKVxuICAgKiBpbiB0aGUgdHJpZ2dlciBoYW5kbGVyIHRoZW4gYG9uU291cmNlQ2hhbmdlZGAgYW5kIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgaGF2ZSBubyBkaWZmZXJlbmNlLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGFuZCBgb25SZW5kZXJlZERhdGFDaGFuZ2VkYCBhcmUgbm90IGNsb3NlbHkgcmVsYXRlZCBhcyBgb25SZW5kZXJlZERhdGFDaGFuZ2VkYCBmaXJlcyBhdFxuICAgKiBhIG11Y2ggbW9yZSByYXBpZCBwYWNlICh2aXJ0dWFsIHNjcm9sbCkuIFRoZSBuYW1lIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG4gICAqL1xuICByZWFkb25seSBvblJlbmRlckRhdGFDaGFuZ2luZzogT2JzZXJ2YWJsZTx7IGV2ZW50OiBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudDxURGF0YT4sIGRhdGE6IFRbXSB9PjtcbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBlbWl0IGV2ZW50cyB3aGVuIHRoZSBncmlkIGlzIGFib3V0IHRvIHJlbmRlciBkYXRhLlxuICAgKiBUaGUgcmVuZGVyZWQgZGF0YSBpcyB1cGRhdGVkIHdoZW4gdGhlIHNvdXJjZSBjaGFuZ2VkIG9yIHdoZW4gdGhlIGdyaWQgaXMgaW4gdmlydHVhbCBzY3JvbGwgbW9kZSBhbmQgdGhlIHVzZXIgaXMgc2Nyb2xsaW5nLlxuICAgKlxuICAgKiBFYWNoIGVtaXNzaW9uIHJlZmxlY3RzIGEgY2hhbmdlIGluIHRoZSBkYXRhIHRoYXQgdGhlIGdyaWQgaXMgcmVuZGVyaW5nLlxuICAgKi9cbiAgcmVhZG9ubHkgb25SZW5kZXJlZERhdGFDaGFuZ2VkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICByZWFkb25seSBvbkVycm9yOiBPYnNlcnZhYmxlPEVycm9yPjtcbiAgLyoqXG4gICAqIEFuIGV2ZW50IHRoYXQgZmlyZXMgd2hlbiB0aGUgY29ubmVjdGlvbiBzdGF0ZSB0byBhIHRhYmxlIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVhZG9ubHkgdGFibGVDb25uZWN0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICByZWFkb25seSBzb3J0Q2hhbmdlOiBPYnNlcnZhYmxlPFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2U+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHNldCB0byBUcnVlIHdpbGwgbm90IGRpc2Nvbm5lY3QgdXBvbiB0YWJsZSBkaXNjb25uZWN0aW9uLCBvdGhlcndpc2UgdW5zdWJzY3JpYmUgZnJvbSB0aGVcbiAgICogZGF0YXNvdXJjZSB3aGVuIHRoZSB0YWJsZSBkaXNjb25uZWN0cy5cbiAgICovXG4gIHJlYWRvbmx5IGtlZXBBbGl2ZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFNraXAgdGhlIGZpcnN0IHRyaWdnZXIgZW1pc3Npb24uXG4gICAqIFVzZSB0aGlzIGZvciBsYXRlIGJpbmRpbmcsIHVzdWFsbHkgd2l0aCBhIGNhbGwgdG8gcmVmcmVzaCgpIG9uIHRoZSBkYXRhIHNvdXJjZS5cbiAgICpcbiAgICogTm90ZSB0aGF0IG9ubHkgdGhlIGludGVybmFsIHRyaWdnZXIgY2FsbCBpcyBza2lwcGVkLCBhIGN1c3RvbSBjYWxscyB0byByZWZyZXNoIHdpbGwgZ28gdGhyb3VnaFxuICAgKi9cbiAgcmVhZG9ubHkgc2tpcEluaXRpYWw6IGJvb2xlYW47XG5cbiAgZ2V0IGFkYXB0ZXIoKTogUGJsRGF0YVNvdXJjZUFkYXB0ZXIgeyByZXR1cm4gdGhpcy5fYWRhcHRlcjsgfTtcbiAgc2V0IGFkYXB0ZXIodmFsdWU6IFBibERhdGFTb3VyY2VBZGFwdGVyKSB7XG4gICAgaWYgKHRoaXMuX2FkYXB0ZXIgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9hZGFwdGVyID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgIHRoaXMuX2FkYXB0ZXIuc2V0UGFnaW5hdG9yKHRoaXMuX3BhZ2luYXRvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETygxLjAuMCk6IHJlbW92ZVxuICAvKiogQGRlcHJlY2F0ZWQgQlJFQUtJTkcgQ0hBTkdFOiByZW1vdmVkIGluIDEuMC4wIC0gVXNlIHJlbmRlcmVkRGF0YSBpbnN0ZWFkLiAqL1xuICBnZXQgcmVuZGVyZWRSb3dzKCk6IFRbXSB7IHJldHVybiB0aGlzLl9yZW5kZXJEYXRhJC52YWx1ZSB8fCBbXTsgfVxuICAvKiogUmV0dXJucyB0aGUgc3RhcnRpbmcgaW5kZXggb2YgdGhlIHJlbmRlcmVkIGRhdGEgKi9cbiAgZ2V0IHJlbmRlclN0YXJ0KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9sYXN0UmFuZ2UgPyB0aGlzLl9sYXN0UmFuZ2Uuc3RhcnQgOiAwOyB9XG4gIGdldCByZW5kZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JlbmRlckRhdGEkLnZhbHVlLmxlbmd0aDsgfVxuICBnZXQgcmVuZGVyZWREYXRhKCk6IFRbXSB7IHJldHVybiB0aGlzLl9yZW5kZXJEYXRhJC52YWx1ZSB8fCBbXTsgfVxuICAvKipcbiAgICogVGhlIGBzb3VyY2VgIHdpdGggc29ydGluZyBhcHBsaWVkLlxuICAgKiBWYWxpZCBvbmx5IHdoZW4gc29ydGluZyBpcyBwZXJmb3JtZWQgY2xpZW50LXNpZGUuXG4gICAqXG4gICAqIFRvIGdldCByZWFsLXRpbWUgbm90aWZpY2F0aW9ucyB1c2UgYG9uUmVuZGVyRGF0YUNoYW5naW5nYC5cbiAgICogVGhlIHNvcnRlZCBkYXRhIGlzIHVwZGF0ZWQganVzdCBiZWZvcmUgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBmaXJlLlxuICAgKi9cbiAgZ2V0IHNvcnRlZERhdGEoKTogVFtdIHsgcmV0dXJuICh0aGlzLl9sYXN0QWRhcHRlckV2ZW50ICYmIHRoaXMuX2xhc3RBZGFwdGVyRXZlbnQuc29ydGVkKSB8fCBbXTsgfTtcbiAgLyoqXG4gICAqIFRoZSBgc291cmNlYCB3aXRoIGZpbHRlcmluZyBhcHBsaWVkLlxuICAgKiBWYWxpZCBvbmx5IHdoZW4gZmlsdGVyaW5nIGlzIHBlcmZvcm1lZCBjbGllbnQtc2lkZS5cbiAgICogSWYgc29ydGluZyBpcyBhcHBsaWVkIGFzIHdlbGwsIHRoZSBmaWx0ZXJlZCByZXN1bHRzIGFyZSBhbHNvIHNvcnRlZC5cbiAgICpcbiAgICogVG8gZ2V0IHJlYWwtdGltZSBub3RpZmljYXRpb25zIHVzZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgLlxuICAgKiBUaGUgZmlsdGVyZWQgZGF0YSBpcyB1cGRhdGVkIGp1c3QgYmVmb3JlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgZmlyZS5cbiAgICovXG4gIGdldCBmaWx0ZXJlZERhdGEoKTogVFtdIHsgcmV0dXJuICh0aGlzLl9sYXN0QWRhcHRlckV2ZW50ICYmIHRoaXMuX2xhc3RBZGFwdGVyRXZlbnQuZmlsdGVyZWQpIHx8IFtdOyB9O1xuXG4gIGdldCBmaWx0ZXIoKTogRGF0YVNvdXJjZUZpbHRlciB7IHJldHVybiB0aGlzLl9maWx0ZXIkLnZhbHVlOyB9XG4gIGdldCBzb3J0KCk6IFBibE5ncmlkRGF0YVNvdXJjZVNvcnRDaGFuZ2UgeyByZXR1cm4gdGhpcy5fc29ydCQudmFsdWU7IH1cbiAgZ2V0IHBhZ2luYXRvcigpOiBQYmxQYWdpbmF0b3I8YW55PiB7IHJldHVybiB0aGlzLl9wYWdpbmF0b3I7IH1cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnNvdXJjZS5sZW5ndGg7IH1cbiAgZ2V0IHNvdXJjZSgpOiBUW10geyByZXR1cm4gdGhpcy5fc291cmNlIHx8IFtdOyB9XG5cbiAgLyoqIFJlcHJlc2VudHMgc2VsZWN0ZWQgaXRlbXMgb24gdGhlIGRhdGEgc291cmNlLiAqL1xuICBnZXQgc2VsZWN0aW9uKCk6IFNlbGVjdGlvbk1vZGVsPFQ+IHsgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbjsgfVxuXG4gIHByb3RlY3RlZCByZWFkb25seSBfc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbk1vZGVsPFQ+KHRydWUsIFtdKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF90YWJsZUNvbm5lY3Rpb25DaGFuZ2UkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9vblJlbmRlckRhdGFDaGFuZ2luZyA9IG5ldyBTdWJqZWN0PHsgZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPiwgZGF0YTogVFtdIH0+KCk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfcmVuZGVyRGF0YSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFRbXT4oW10pO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2ZpbHRlciQ6IEJlaGF2aW9yU3ViamVjdDxEYXRhU291cmNlRmlsdGVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RGF0YVNvdXJjZUZpbHRlcj4odW5kZWZpbmVkKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zb3J0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSAmIHsgc2tpcFVwZGF0ZTogYm9vbGVhbiB9Pih7IGNvbHVtbjogbnVsbCwgc29ydDogbnVsbCwgc2tpcFVwZGF0ZTogZmFsc2UgfSk7XG4gIHByb3RlY3RlZCBfb25FcnJvciQgPSBuZXcgU3ViamVjdDxFcnJvcj4oKTtcblxuICBwcm90ZWN0ZWQgX3BhZ2luYXRvcjogUGJsUGFnaW5hdG9yPGFueT47XG5cbiAgcHJpdmF0ZSBfcGFnaW5hdGlvbjogUGJsTmdyaWRQYWdpbmF0b3JLaW5kIHwgZmFsc2U7XG4gIHByaXZhdGUgX2FkYXB0ZXI6IFBibERhdGFTb3VyY2VBZGFwdGVyO1xuICBwcml2YXRlIF9zb3VyY2U6IFRbXTtcbiAgcHJpdmF0ZSBfZGlzcG9zZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX3RhYmxlQ29ubmVjdGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9sYXN0UmVmcmVzaDogVERhdGE7XG4gIHByaXZhdGUgX2xhc3RSYW5nZTogTGlzdFJhbmdlO1xuICBwcml2YXRlIF9sYXN0QWRhcHRlckV2ZW50OiBQYmxEYXRhU291cmNlQWRhcHRlclByb2Nlc3NlZFJlc3VsdDxULCBURGF0YT47XG5cbiAgY29uc3RydWN0b3IoYWRhcHRlcjogUGJsRGF0YVNvdXJjZUFkYXB0ZXI8VCwgVERhdGE+LCBvcHRpb25zPzogUGJsRGF0YVNvdXJjZU9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgdGhpcy5hZGFwdGVyID0gYWRhcHRlcjtcblxuICAgIHRoaXMub25Tb3VyY2VDaGFuZ2luZyA9IHRoaXMuX2FkYXB0ZXIub25Tb3VyY2VDaGFuZ2luZztcbiAgICAvLyBlbWl0IHNvdXJjZSBjaGFuZ2VkIGV2ZW50IGV2ZXJ5IHRpbWUgYWRhcHRlciBnZXRzIG5ldyBkYXRhXG4gICAgdGhpcy5vblNvdXJjZUNoYW5nZWQgPSB0aGlzLmFkYXB0ZXIub25Tb3VyY2VDaGFuZ2VkXG4gICAgLnBpcGUoXG4gICAgICBvYnNlcnZlT24oYXNhcFNjaGVkdWxlciwgMCksIC8vIGVtaXQgb24gdGhlIGVuZCBvZiB0aGUgY3VycmVudCB0dXJuIChtaWNyby10YXNrKSB0byBlbnN1cmUgYG9uU291cmNlQ2hhbmdlZGAgZW1pc3Npb24gaW4gYF91cGRhdGVQcm9jZXNzaW5nTG9naWNgIHJ1bidzIGZpcnN0LlxuICAgICAgbWFwVG8odW5kZWZpbmVkKVxuICAgICk7XG4gICAgdGhpcy5vblJlbmRlckRhdGFDaGFuZ2luZyA9IHRoaXMuX29uUmVuZGVyRGF0YUNoYW5naW5nLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMub25SZW5kZXJlZERhdGFDaGFuZ2VkID0gdGhpcy5fcmVuZGVyRGF0YSQucGlwZShza2lwKDEpLCBtYXBUbyh1bmRlZmluZWQpKTtcbiAgICB0aGlzLm9uRXJyb3IgPSB0aGlzLl9vbkVycm9yJC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLnRhYmxlQ29ubmVjdGlvbkNoYW5nZSA9IHRoaXMuX3RhYmxlQ29ubmVjdGlvbkNoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB0aGlzLmtlZXBBbGl2ZSA9IG9wdGlvbnMua2VlcEFsaXZlIHx8IGZhbHNlO1xuICAgIHRoaXMuc2tpcEluaXRpYWwgPSBvcHRpb25zLnNraXBJbml0aWFsIHx8IGZhbHNlO1xuICAgIHRoaXMuc29ydENoYW5nZSA9IHRoaXMuX3NvcnQkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgY3VzdG9tIHRyaWdnZXIgdGhhdCBpbnZva2VzIGEgbWFudWFsIGRhdGEgc291cmNlIGNoYW5nZSB3aXRoIHRoZSBwcm92aWRlZCBkYXRhIHZhbHVlIGluIHRoZSBgZGF0YWAgcHJvcGVydHkgYXQgdGh0IGV2ZW50LlxuICAgKi9cbiAgcmVmcmVzaChkYXRhPzogVERhdGEpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGFibGVDb25uZWN0ZWQpIHtcbiAgICAgIHRoaXMuX2FkYXB0ZXIucmVmcmVzaChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGFzdFJlZnJlc2ggPSBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKi9cbiAgc2V0RmlsdGVyKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGZpbHRlciBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldCB1c2luZyBhIGZ1bmN0aW9uIHByZWRpY2F0ZS5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB1c2luZyBhIGN1c3RvbSBwcmVkaWNhdGUgZnVuY3Rpb24gYWxsIGxvZ2ljIGlzIHBhc3NlZCB0byB0aGUgcHJlZGljYXRlIGFuZCB0aGUgZGF0YXNvdXJjZSAvIGdyaWQgZG9lcyBub3QgaGFuZGxlIHRoZSBmaWx0ZXJpbmcgcHJvY2Vzcy5cbiAgICogVGhpcyBtZWFucyB0aGF0IGFueSBjb2x1bW4gc3BlY2lmaWMgZmlsdGVyLCBzZXQgaW4gdGhlIGNvbHVtbiBkZWZpbml0aW9ucyBpcyBpZ25vcmVkLCBpZiB5b3Ugd2FudCB0byB0YWtlIHRoZXNlIGZpbHRlcnMgaW50byBjb25zaWRlcmF0aW9uXG4gICAqIHVzZSB0aGUgY29sdW1uIGluc3RhbmNlIHByb3ZpZGVkIHRvIGlkZW50aWZ5IGFuZCB1c2UgdGhlc2UgZmlsdGVycyAodGhlIGBmaWx0ZXJgIHByb3BlcnR5IGluIGBQYmxDb2x1bW5gKS5cbiAgICovXG4gIHNldEZpbHRlcih2YWx1ZTogRGF0YVNvdXJjZVByZWRpY2F0ZSwgY29sdW1ucz86IFBibENvbHVtbltdKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgdmFsdWUgdG8gY29tcGFyZSB3aXRoIGFuZCBhIGxpc3Qgb2YgY29sdW1ucyB3aXRoIHRoZSB2YWx1ZXMgdG8gY29tcGFyZSB0by5cbiAgICpcbiAgICogV2hlbiBhIGNvbHVtbiBpbnN0YW5jZSBoYXMgYSBzcGVjaWZpYyBwcmVkaWNhdGUgc2V0IChgUGJsQ29sdW1uLmZpbHRlcmApIHRoZW4gaXQgd2lsbCBiZSB1c2VkLCBvdGhlcndpc2VcbiAgICogdGhlIGBnZW5lcmljQ29sdW1uUHJlZGljYXRlYCB3aWxsIGJlIHVzZWQuXG4gICAqL1xuICBzZXRGaWx0ZXIodmFsdWU6IGFueSwgY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkO1xuICBzZXRGaWx0ZXIodmFsdWU/OiBEYXRhU291cmNlRmlsdGVyVG9rZW4sIGNvbHVtbnM/OiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgIT09ICdmdW5jdGlvbicgJiYgKCFjb2x1bW5zIHx8IGNvbHVtbnMubGVuZ3RoID09PSAwKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZpbHRlciBkZWZpbml0aW9ucywgY29sdW1ucyBhcmUgbWFuZGF0b3J5IHdoZW4gdXNpbmcgYSBzaW5nbGUgdmFsdWUgaW5wdXQuJyk7XG4gICAgfVxuICAgIHRoaXMuX2ZpbHRlciQubmV4dChjcmVhdGVGaWx0ZXIodmFsdWUsIGNvbHVtbnMgfHwgW10pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWZyZXNoIHRoZSBmaWx0ZXJzIHJlc3VsdC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgc2hvdWxkIG9ubHkgYmUgdXNlZCB3aGVuIHVzaW5nIGEgcHJlZGljYXRlIGZ1bmN0aW9uIGZpbHRlciBhbmQgbm90IHRoZSBzaW1wbGUgdmFsdWUgZmlsdGVyLlxuICAgKiBJbiBnZW5lcmFsIHRoZSBmaWx0ZXIgaXMgcmVmcmVzaGVkIGV2ZXJ5IHRpbWUgaXQgaXMgc2V0IGFuZCBlYWNoIHRpbWUgdGhlIGRhdGEgaXMgdXBkYXRlZCBzbyBtYW51YWxseSByZWZyZXNoaW5nIGEgdmFsdWUgZmlsdGVyXG4gICAqIGhhcyBubyBpbXBhY3QuXG4gICAqXG4gICAqIEZvciBjdXN0b20gcHJlZGljYXRlIGZ1bmN0aW9uIGZpbHRlcnMgdGhpcyBtaWdodCBiZSB1c2VmdWwuXG4gICAqXG4gICAqL1xuICBzeW5jRmlsdGVyKCk6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRGaWx0ZXIgPSB0aGlzLl9hZGFwdGVyLmNsZWFyQ2FjaGUoJ2ZpbHRlcicpO1xuICAgIGlmIChjdXJyZW50RmlsdGVyKSB7XG4gICAgICB0aGlzLnNldEZpbHRlcihjdXJyZW50RmlsdGVyLmZpbHRlciwgY3VycmVudEZpbHRlci5jb2x1bW5zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGN1cnJlbnQgc29ydCBkZWZpbml0aW9ucy5cbiAgICogQHBhcmFtIHNraXBVcGRhdGUgV2hlbiB0cnVlIHdpbGwgbm90IHVwZGF0ZSB0aGUgZGF0YXNvdXJjZSwgdXNlIHRoaXMgd2hlbiB0aGUgZGF0YSBjb21lcyBzb3J0ZWQgYW5kIHlvdSB3YW50IHRvIHN5bmMgdGhlIGRlZmluaXRpb25zIHdpdGggdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqIGRlZmF1bHQgdG8gZmFsc2UuXG4gICAqL1xuICBzZXRTb3J0KHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgc29ydGluZyBkZWZpbml0aW9uIGZvciB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogQHBhcmFtIGNvbHVtblxuICAgKiBAcGFyYW0gc29ydFxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoY29sdW1uOiBQYmxDb2x1bW4sIHNvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24sIHNraXBVcGRhdGU/OiBib29sZWFuKTogdm9pZDtcbiAgc2V0U29ydChjb2x1bW4/OiBQYmxDb2x1bW4gfCBib29sZWFuLCBzb3J0PzogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKCFjb2x1bW4gfHwgdHlwZW9mIGNvbHVtbiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aGlzLl9zb3J0JC5uZXh0KHsgY29sdW1uOiBudWxsLCBzb3J0OiB7fSwgc2tpcFVwZGF0ZTogISFjb2x1bW4gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NvcnQkLm5leHQoeyBjb2x1bW4sIHNvcnQsIHNraXBVcGRhdGUgfSk7XG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2Rpc3Bvc2VkKSB7XG4gICAgICB1bnJ4LmtpbGwodGhpcyk7XG4gICAgICB0aGlzLl9hZGFwdGVyLmRpc3Bvc2UoKTtcbiAgICAgIHRoaXMuX29uUmVuZGVyRGF0YUNoYW5naW5nLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9yZW5kZXJEYXRhJC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5fZmlsdGVyJC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5fc29ydCQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX29uRXJyb3IkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9kaXNwb3NlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdChjdjogQ29sbGVjdGlvblZpZXdlcik6IHZvaWQge1xuICAgIHRoaXMuX2xhc3RSZWZyZXNoID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3RhYmxlQ29ubmVjdGlvbkNoYW5nZSQubmV4dCh0aGlzLl90YWJsZUNvbm5lY3RlZCA9IGZhbHNlKTtcbiAgICBpZiAodGhpcy5rZWVwQWxpdmUgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmRpc3Bvc2UoKTtcbiAgICB9XG4gIH1cblxuICBjb25uZWN0KGN2OiBDb2xsZWN0aW9uVmlld2VyKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICBpZiAodGhpcy5fZGlzcG9zZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUGJsRGF0YVNvdXJjZSBpcyBkaXNwb3NlZC4gVXNlIGBrZWVwQWxpdmVgIGlmIHlvdSBtb3ZlIGRhdGFzb3VyY2UgYmV0d2VlbiB0YWJsZXMuJyk7XG4gICAgfVxuICAgIHRoaXMuX3RhYmxlQ29ubmVjdGVkID0gdHJ1ZVxuICAgIHRoaXMuX3VwZGF0ZVByb2Nlc3NpbmdMb2dpYyhjdik7XG4gICAgdGhpcy5fdGFibGVDb25uZWN0aW9uQ2hhbmdlJC5uZXh0KHRoaXMuX3RhYmxlQ29ubmVjdGVkKTtcbiAgICByZXR1cm4gdGhpcy5fcmVuZGVyRGF0YSQ7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSdzIGFuIGl0ZW0gKGluIHRoZSBlbnRpcmUgc291cmNlKSBmcm9tIG9uZSBpbmRleCB0byB0aGUgb3RoZXIsIHB1c2hpbmcgdGhlIGl0ZW0gaW4gdGhlIGRlc3RpbmF0aW9uIG9uZSBpdGVtIGJhY2t3YXJkcy5cbiAgICpcbiAgICogTm90ZSB0aGF0IGlmIHRoZSByZW5kZXJlZCBkYXRhIGlzIGEgc3Vic2V0IG9mIHRoZSBlbnRpcmUgc291cmNlIChpLmUgdmlydHVhbCBzY3JvbGwgJiByYW5nZSkgdGhlIGluZGljZXMgYXJlIGNvbnNpZGVyZWRcbiAgICogbG9jYWwgdG8gdGhlIHJlbmRlcmVkIHZpZXcgYW5kIGFyZSB0cmFuc2xhdGVkIHRvIGZpdCB0aGUgZW50aXJlIHNvdXJjZS5cbiAgICpcbiAgICogVHAgZGlzYWJsZSB0aGlzIGJlaGF2aW9yLCBzZXQgdGhlIGBhYnNvbHV0ZWAgcGFyYW1ldGVyIHRvIGB0cnVlYFxuICAgKi9cbiAgbW92ZUl0ZW0oZnJvbUluZGV4OiBudW1iZXIsIHRvSW5kZXg6IG51bWJlciwgYWJzb2x1dGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmIChhYnNvbHV0ZSAhPT0gdHJ1ZSAmJiB0aGlzLl9sYXN0UmFuZ2UpIHtcbiAgICAgIGZyb21JbmRleCA9IHRoaXMuX2xhc3RSYW5nZS5zdGFydCArIGZyb21JbmRleDtcbiAgICAgIHRvSW5kZXggPSB0aGlzLl9sYXN0UmFuZ2Uuc3RhcnQgKyB0b0luZGV4O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLl9zb3VyY2UsIGZyb21JbmRleCwgdG9JbmRleClcbiAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9sYXN0UmFuZ2VcbiAgICAgICAgPyB0aGlzLl9zb3VyY2Uuc2xpY2UodGhpcy5fbGFzdFJhbmdlLnN0YXJ0LCB0aGlzLl9sYXN0UmFuZ2UuZW5kKVxuICAgICAgICA6IHRoaXMuX3NvdXJjZVxuICAgICAgO1xuICAgICAgdGhpcy5fcmVuZGVyRGF0YSQubmV4dChkYXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVQcm9jZXNzaW5nTG9naWMoY3Y6IENvbGxlY3Rpb25WaWV3ZXIpOiB2b2lkIHtcbiAgICBjb25zdCBpbml0aWFsU3RhdGU6IFBhcnRpYWw8UGJsRGF0YVNvdXJjZVRyaWdnZXJDYWNoZTxURGF0YT4+ID0geyBmaWx0ZXI6IHRoaXMuZmlsdGVyLCAgc29ydDogdGhpcy5zb3J0IH07XG4gICAgY29uc3QgcGFnaW5hdG9yID0gdGhpcy5fcGFnaW5hdG9yO1xuICAgIGlmIChwYWdpbmF0b3IpIHtcbiAgICAgIGluaXRpYWxTdGF0ZS5wYWdpbmF0aW9uID0geyBwYWdlOiBwYWdpbmF0b3IucGFnZSwgcGVyUGFnZTogcGFnaW5hdG9yLnBlclBhZ2UgfTtcbiAgICB9XG4gICAgY29uc3Qgc3RyZWFtID0gdGhpcy5fYWRhcHRlci51cGRhdGVQcm9jZXNzaW5nTG9naWMoXG4gICAgICB0aGlzLl9maWx0ZXIkLFxuICAgICAgdGhpcy5fc29ydCQsXG4gICAgICBwYWdpbmF0b3IgPyBwYWdpbmF0b3Iub25DaGFuZ2UgOiBvZih1bmRlZmluZWQpLFxuICAgICAgaW5pdGlhbFN0YXRlLFxuICAgICk7XG5cbiAgICB1bnJ4LmtpbGwodGhpcywgUFJPQ0VTU0lOR19TVUJTQ1JJUFRJT05fR1JPVVApXG5cbiAgICBjb25zdCB0cmltVG9SYW5nZSA9IChyYW5nZTogTGlzdFJhbmdlLCBkYXRhOiBhbnlbXSkgPT4gZGF0YS5zbGljZShyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKSA7XG5cbiAgICBsZXQgc2tpcFZpZXdDaGFuZ2U6IGJvb2xlYW47XG4gICAgbGV0IGxhc3RFbWl0dGVkU291cmNlOiBUW107XG5cbiAgICBjdi52aWV3Q2hhbmdlXG4gICAgICAucGlwZSh1bnJ4KHRoaXMsIFBST0NFU1NJTkdfU1VCU0NSSVBUSU9OX0dST1VQKSlcbiAgICAgIC5zdWJzY3JpYmUoIHJhbmdlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2xhc3RSYW5nZSAmJiB0aGlzLl9sYXN0UmFuZ2Uuc3RhcnQgPT09IHJhbmdlLnN0YXJ0ICYmIHRoaXMuX2xhc3RSYW5nZS5lbmQgPT09IHJhbmdlLmVuZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sYXN0UmFuZ2UgPSByYW5nZTtcbiAgICAgICAgaWYgKCFza2lwVmlld0NoYW5nZSkge1xuICAgICAgICAgIGlmIChyYW5nZSAmJiBsYXN0RW1pdHRlZFNvdXJjZSAmJiBsYXN0RW1pdHRlZFNvdXJjZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckRhdGEkLm5leHQodHJpbVRvUmFuZ2UodGhpcy5fbGFzdFJhbmdlLCBsYXN0RW1pdHRlZFNvdXJjZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICBzdHJlYW1cbiAgICAgIC5waXBlKFxuICAgICAgICB1bnJ4KHRoaXMsIFBST0NFU1NJTkdfU1VCU0NSSVBUSU9OX0dST1VQKSxcbiAgICAgICAgdGFwKCByZXN1bHQgPT4ge1xuICAgICAgICAgIGxhc3RFbWl0dGVkU291cmNlID0gcmVzdWx0LmRhdGE7XG4gICAgICAgICAgc2tpcFZpZXdDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuX29uUmVuZGVyRGF0YUNoYW5naW5nLm5leHQodGhpcy5fbGFzdEFkYXB0ZXJFdmVudCA9IHJlc3VsdCk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoe2RhdGF9KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2xhc3RSYW5nZSAmJiBkYXRhICYmIGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBkYXRhID0gdHJpbVRvUmFuZ2UodGhpcy5fbGFzdFJhbmdlLCBkYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fcmVuZGVyRGF0YSQubmV4dChkYXRhKTtcbiAgICAgICAgICBza2lwVmlld0NoYW5nZSA9IGZhbHNlO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvciA9PiB7IHRoaXMuX29uRXJyb3IkLm5leHQoZXJyb3IpIH1cbiAgICAgICk7XG5cbiAgICB0aGlzLl9hZGFwdGVyLm9uU291cmNlQ2hhbmdlZFxuICAgICAgLnBpcGUodW5yeCh0aGlzLCBQUk9DRVNTSU5HX1NVQlNDUklQVElPTl9HUk9VUCkpXG4gICAgICAuc3Vic2NyaWJlKCBzb3VyY2UgPT4gdGhpcy5fc291cmNlID0gc291cmNlIHx8IFtdICk7XG5cbiAgICBpZiAodGhpcy5fbGFzdFJlZnJlc2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fYWRhcHRlci5yZWZyZXNoKHRoaXMuX2xhc3RSZWZyZXNoKTtcbiAgICAgIHRoaXMuX2xhc3RSZWZyZXNoID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuc2tpcEluaXRpYWwpIHtcbiAgICAgIC8vIF9yZWZyZXNoJCBpcyBhIFN1YmplY3QsIHdlIG11c3QgZW1pdCBvbmNlIHNvIGNvbWJpbmVMYXRlc3Qgd2lsbCB3b3JrXG4gICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICB9XG4gIH1cbn1cblxuIl19