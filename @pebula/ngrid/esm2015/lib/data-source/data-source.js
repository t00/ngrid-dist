/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject, Subject, of, asapScheduler } from 'rxjs';
import { mapTo, skip, observeOn, tap } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { UnRx } from '@pebula/utils';
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
            UnRx.kill(this);
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
        UnRx.kill(this, PROCESSING_SUBSCRIPTION_GROUP);
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
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
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
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP), tap((/**
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
            .pipe(UnRx(this, PROCESSING_SUBSCRIPTION_GROUP))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsZUFBZSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RCxPQUFPLEVBQUUsY0FBYyxFQUErQixNQUFNLDBCQUEwQixDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFekQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyQyxPQUFPLEVBQXVDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTFHLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxhQUFhLENBQUM7O01BTXJDLDZCQUE2QixHQUFHLEVBQUU7Ozs7QUFFeEMsMENBWUM7Ozs7OztJQVJDLHlDQUFvQjs7Ozs7Ozs7SUFPcEIsMkNBQXNCOzs7OztBQUd4QixNQUFNLE9BQU8sYUFBb0MsU0FBUSxVQUFhOzs7OztJQWtKcEUsWUFBWSxPQUF1QyxFQUFFLE9BQThCO1FBQ2pGLEtBQUssRUFBRSxDQUFDO1FBcEJTLGVBQVUsR0FBRyxJQUFJLGNBQWMsQ0FBSSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsNEJBQXVCLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNqRCwwQkFBcUIsR0FBRyxJQUFJLE9BQU8sRUFBaUUsQ0FBQztRQUNyRyxpQkFBWSxHQUFHLElBQUksZUFBZSxDQUFNLEVBQUUsQ0FBQyxDQUFD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QUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7U0FDL0I7YUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM1Qix1RUFBdUU7WUFDdkUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7Ozs7Ozs7SUE5VUMseUNBQTRDOzs7Ozs7Ozs7OztJQVU1Qyx3Q0FBMkM7Ozs7Ozs7Ozs7Ozs7SUFZM0MsNkNBQXlHOzs7Ozs7OztJQU96Ryw4Q0FBaUQ7O0lBQ2pELGdDQUFvQzs7Ozs7SUFJcEMsOENBQW9EOztJQUNwRCxtQ0FBOEQ7Ozs7OztJQU05RCxrQ0FBNEI7Ozs7Ozs7O0lBTzVCLG9DQUE4Qjs7Ozs7SUErQzlCLG1DQUFnRTs7Ozs7SUFDaEUsZ0RBQW9FOzs7OztJQUNwRSw4Q0FBd0g7Ozs7O0lBQ3hILHFDQUErRDs7Ozs7SUFDL0QsaUNBQWtIOzs7OztJQUNsSCwrQkFBeUo7Ozs7O0lBQ3pKLGtDQUEyQzs7Ozs7SUFFM0MsbUNBQXdDOzs7OztJQUV4QyxvQ0FBbUQ7Ozs7O0lBQ25ELGlDQUF1Qzs7Ozs7SUFDdkMsZ0NBQXFCOzs7OztJQUNyQixrQ0FBMkI7Ozs7O0lBQzNCLHdDQUFpQzs7Ozs7SUFDakMscUNBQTRCOzs7OztJQUM1QixtQ0FBOEI7Ozs7O0lBQzlCLDBDQUF5RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgU3ViamVjdCwgb2YsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcFRvLCBza2lwLCBvYnNlcnZlT24sIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgU2VsZWN0aW9uTW9kZWwsIENvbGxlY3Rpb25WaWV3ZXIsIExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IG1vdmVJdGVtSW5BcnJheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL3RhYmxlL2NvbHVtbnMnO1xuaW1wb3J0IHsgUGJsTmdyaWRQYWdpbmF0b3JLaW5kLCBQYmxQYWdpbmF0b3IsIFBibFBhZ2luZ1BhZ2luYXRvciwgUGJsVG9rZW5QYWdpbmF0b3IgfSBmcm9tICcuLi9wYWdpbmF0b3InO1xuaW1wb3J0IHsgRGF0YVNvdXJjZVByZWRpY2F0ZSwgRGF0YVNvdXJjZUZpbHRlciwgRGF0YVNvdXJjZUZpbHRlclRva2VuLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBjcmVhdGVGaWx0ZXIgfSBmcm9tICcuL2ZpbHRlcmluZyc7XG5pbXBvcnQgeyBQYmxEYXRhU291cmNlQWRhcHRlciB9IGZyb20gJy4vZGF0YS1zb3VyY2UtYWRhcHRlcic7XG5pbXBvcnQgeyBQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlLCBQYmxEYXRhU291cmNlVHJpZ2dlckNoYW5nZWRFdmVudCwgUGJsRGF0YVNvdXJjZUFkYXB0ZXJQcm9jZXNzZWRSZXN1bHQgfSBmcm9tICcuL2RhdGEtc291cmNlLWFkYXB0ZXIudHlwZXMnO1xuXG5leHBvcnQgdHlwZSBEYXRhU291cmNlT2Y8VD4gPSBUW10gfCBQcm9taXNlPFRbXT4gfCBPYnNlcnZhYmxlPFRbXT47XG5cbmNvbnN0IFBST0NFU1NJTkdfU1VCU0NSSVBUSU9OX0dST1VQID0ge307XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsRGF0YVNvdXJjZU9wdGlvbnMge1xuICAvKipcbiAgICogV2hlbiBzZXQgdG8gVHJ1ZSB3aWxsIG5vdCBkaXNjb25uZWN0IHVwb24gdGFibGUgZGlzY29ubmVjdGlvbiwgb3RoZXJ3aXNlIGRvZXMuXG4gICAqL1xuICBrZWVwQWxpdmU/OiBib29sZWFuO1xuICAvKipcbiAgICogU2tpcCB0aGUgZmlyc3QgdHJpZ2dlciBlbWlzc2lvbi5cbiAgICogVXNlIHRoaXMgZm9yIGxhdGUgYmluZGluZywgdXN1YWxseSB3aXRoIGEgY2FsbCB0byByZWZyZXNoKCkgb24gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgb25seSB0aGUgaW50ZXJuYWwgdHJpZ2dlciBjYWxsIGlzIHNraXBwZWQsIGEgY3VzdG9tIGNhbGxzIHRvIHJlZnJlc2ggd2lsbCBnbyB0aHJvdWdoXG4gICAqL1xuICBza2lwSW5pdGlhbD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxEYXRhU291cmNlPFQgPSBhbnksIFREYXRhID0gYW55PiBleHRlbmRzIERhdGFTb3VyY2U8VD4ge1xuXG4gIGdldCBwYWdpbmF0aW9uKCk6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlIHsgcmV0dXJuIHRoaXMuX3BhZ2luYXRpb247IH1cbiAgc2V0IHBhZ2luYXRpb24odmFsdWU6IFBibE5ncmlkUGFnaW5hdG9yS2luZCB8IGZhbHNlKSB7XG4gICAgaWYgKHRoaXMuX3BhZ2luYXRpb24gIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9wYWdpbmF0aW9uID0gdmFsdWU7XG4gICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ3BhZ2VOdW1iZXInOlxuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvciA9IG5ldyBQYmxQYWdpbmdQYWdpbmF0b3IoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndG9rZW4nOlxuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvciA9IG5ldyBQYmxUb2tlblBhZ2luYXRvcigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuX3BhZ2luYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9hZGFwdGVyKSB7XG4gICAgICAgIHRoaXMuX2FkYXB0ZXIuc2V0UGFnaW5hdG9yKHRoaXMuX3BhZ2luYXRvcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIG9ic2VydmFibGUgdGhhdCBlbWl0IGV2ZW50cyB3aGVuIGFuIG5ldyBpbmNvbWluZyBzb3VyY2UgaXMgZXhwZWN0ZWQsIGJlZm9yZSBjYWxsaW5nIHRoZSB0cmlnZ2VyIGhhbmRsZXIgdG8gZ2V0IHRoZSBuZXcgc291cmNlLlxuICAgKiBUaGlzIGV2ZW4gaXMgdXN1YWxseSBmb2xsb3dlZCBieSB0aGUgYG9uU291cmNlQ2hhbmdlZGAgZXZlbnQgYnV0IG5vdCBhbHdheXMuIFRoaXMgaXMgYmVjYXVzZSB0aGUgdHJpZ2dlciBoYW5kbGVyXG4gICAqIGNhbiBjYW5jZWwgdGhlIG9wZXJhdGlvbiAod2hlbiBpdCByZXR1cm5zIGZhbHNlKSB3aGljaCBtZWFucyBhbiBgb25Tb3VyY2VDaGFuZ2VkYCBldmVudCB3aWxsIG5vdCBmaXJlLlxuICAgKlxuICAgKiBFbWlzc2lvbnMgb2NjdXIgd2hlbiB0aGUgdHJpZ2dlciBoYW5kbGVyIGlzIGludm9rZWQgYW5kIGFsc28gd2hlbiB0aGUgdHJpZ2dlciBoYW5kbGVyIHJldHVybmVkIGFuIG9ic2VydmFibGUgYW5kIHRoZSBvYnNlcnZhYmxlIGVtaXRzLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCBhIG1pY3JvLXRhc2sgZGVsYXlzIGlzIGFwcGxpZWQgYmV0d2VlbiB0aGUgYG9uU291cmNlQ2hhbmdpbmdgIHN1YnNlcXVlbnQgYG9uU291cmNlQ2hhbmdlZGAgZXZlbnQgKHdoZW4gZW1pdHRlZCkuXG4gICAqL1xuICByZWFkb25seSBvblNvdXJjZUNoYW5naW5nOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXQgZXZlbnRzIHdoZW4gYSBuZXcgc291cmNlIGhhcyBiZWVuIHJlY2VpdmVkIGZyb20gdGhlIHRyaWdnZXIgaGFuZGxlciBidXQgYmVmb3JlIGFueSBwcm9jZXNzaW5nIGlzIGFwcGxpZWQuXG4gICAqIEVtaXNzaW9ucyBvY2N1ciB3aGVuIHRoZSB0cmlnZ2VyIGhhbmRsZXIgaXMgaW52b2tlZCBhbmQgYWxzbyB3aGVuIHRoZSB0cmlnZ2VyIGhhbmRsZXIgcmV0dXJuZWQgYW4gb2JzZXJ2YWJsZSBhbmQgdGhlIG9ic2VydmFibGUgZW1pdHMuXG4gICAqXG4gICAqIEV4YW1wbGVzOiBDYWxsaW5nIGByZWZyZXNoKClgLCBmaWx0ZXIgLyBzb3J0IC8gcGFnaW5hdGlvbiBldmVudHMuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoZSBgb25Tb3VyY2VDaGFuZ2VkYCBmaXJlZCBiZWZvcmUgdGhlIGRhdGEgaXMgcmVuZGVyZWQgYW5lIGJlZm9yZSBhbnkgY2xpZW50LXNpZGUgZmlsdGVyL3NvcnQvcGFnaW5hdGlvbiBhcmUgYXBwbGllZC5cbiAgICogSXQgb25seSBpbmRpY2F0ZXMgdGhhdCB0aGUgc291cmNlIGRhdGEtc2V0IGlzIG5vdyB1cGRhdGVkIGFuZCB0aGUgZ3JpZCBpcyBhYm91dCB0byBhcHBseSBsb2dpYyBvbiB0aGUgZGF0YS1zZXQgYW5kIHRoZW4gcmVuZGVyIGl0LlxuICAgKi9cbiAgcmVhZG9ubHkgb25Tb3VyY2VDaGFuZ2VkOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXQgZXZlbnRzIHdoZW4gbmV3IHNvdXJjZSBoYXMgYmVlbiByZWNlaXZlZCBmcm9tIHRoZSB0cmlnZ2VyIGhhbmRsZXIgYW5kIGFmdGVyIGl0IHdhcyBwcm9jZXNzZWQuXG4gICAqIEVtaXNzaW9ucyB3aWxsIG9jY3VyIGFmdGVyIGBvblNvdXJjZUNoYW5nZWRgIGV2ZW50IGhhcyBiZWVuIGZpcmVkLlxuICAgKlxuICAgKiBUaGUgbWFpbiBkaWZmZXJlbmNlIGJldHdlZW4gYG9uU291cmNlQ2hhbmdlZGAgYW5kIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgaXMgbG9jYWwgcHJvY2Vzc2luZyBwZXJmb3JtZWQgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqIFRoZXNlIGFyZSB1c3VhbGx5IGNsaWVudC1zaWRlIG9wZXJhdGlvbnMgbGlrZSBmaWx0ZXIvc29ydC9wYWdpbmF0aW9uLiBJZiBhbGwgb2YgdGhlc2UgZXZlbnRzIGFyZSBoYW5kbGVkIG1hbnVhbGx5IChjdXN0b20pXG4gICAqIGluIHRoZSB0cmlnZ2VyIGhhbmRsZXIgdGhlbiBgb25Tb3VyY2VDaGFuZ2VkYCBhbmQgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBoYXZlIG5vIGRpZmZlcmVuY2UuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IGBvblJlbmRlckRhdGFDaGFuZ2luZ2AgYW5kIGBvblJlbmRlcmVkRGF0YUNoYW5nZWRgIGFyZSBub3QgY2xvc2VseSByZWxhdGVkIGFzIGBvblJlbmRlcmVkRGF0YUNoYW5nZWRgIGZpcmVzIGF0XG4gICAqIGEgbXVjaCBtb3JlIHJhcGlkIHBhY2UgKHZpcnR1YWwgc2Nyb2xsKS4gVGhlIG5hbWUgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cbiAgICovXG4gIHJlYWRvbmx5IG9uUmVuZGVyRGF0YUNoYW5naW5nOiBPYnNlcnZhYmxlPHsgZXZlbnQ6IFBibERhdGFTb3VyY2VUcmlnZ2VyQ2hhbmdlZEV2ZW50PFREYXRhPiwgZGF0YTogVFtdIH0+O1xuICAvKipcbiAgICogQW4gb2JzZXJ2YWJsZSB0aGF0IGVtaXQgZXZlbnRzIHdoZW4gdGhlIGdyaWQgaXMgYWJvdXQgdG8gcmVuZGVyIGRhdGEuXG4gICAqIFRoZSByZW5kZXJlZCBkYXRhIGlzIHVwZGF0ZWQgd2hlbiB0aGUgc291cmNlIGNoYW5nZWQgb3Igd2hlbiB0aGUgZ3JpZCBpcyBpbiB2aXJ0dWFsIHNjcm9sbCBtb2RlIGFuZCB0aGUgdXNlciBpcyBzY3JvbGxpbmcuXG4gICAqXG4gICAqIEVhY2ggZW1pc3Npb24gcmVmbGVjdHMgYSBjaGFuZ2UgaW4gdGhlIGRhdGEgdGhhdCB0aGUgZ3JpZCBpcyByZW5kZXJpbmcuXG4gICAqL1xuICByZWFkb25seSBvblJlbmRlcmVkRGF0YUNoYW5nZWQ6IE9ic2VydmFibGU8dm9pZD47XG4gIHJlYWRvbmx5IG9uRXJyb3I6IE9ic2VydmFibGU8RXJyb3I+O1xuICAvKipcbiAgICogQW4gZXZlbnQgdGhhdCBmaXJlcyB3aGVuIHRoZSBjb25uZWN0aW9uIHN0YXRlIHRvIGEgdGFibGUgaGFzIGNoYW5nZWQuXG4gICAqL1xuICByZWFkb25seSB0YWJsZUNvbm5lY3Rpb25DaGFuZ2U6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHJlYWRvbmx5IHNvcnRDaGFuZ2U6IE9ic2VydmFibGU8UGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZT47XG5cbiAgLyoqXG4gICAqIFdoZW4gc2V0IHRvIFRydWUgd2lsbCBub3QgZGlzY29ubmVjdCB1cG9uIHRhYmxlIGRpc2Nvbm5lY3Rpb24sIG90aGVyd2lzZSB1bnN1YnNjcmliZSBmcm9tIHRoZVxuICAgKiBkYXRhc291cmNlIHdoZW4gdGhlIHRhYmxlIGRpc2Nvbm5lY3RzLlxuICAgKi9cbiAgcmVhZG9ubHkga2VlcEFsaXZlOiBib29sZWFuO1xuICAvKipcbiAgICogU2tpcCB0aGUgZmlyc3QgdHJpZ2dlciBlbWlzc2lvbi5cbiAgICogVXNlIHRoaXMgZm9yIGxhdGUgYmluZGluZywgdXN1YWxseSB3aXRoIGEgY2FsbCB0byByZWZyZXNoKCkgb24gdGhlIGRhdGEgc291cmNlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgb25seSB0aGUgaW50ZXJuYWwgdHJpZ2dlciBjYWxsIGlzIHNraXBwZWQsIGEgY3VzdG9tIGNhbGxzIHRvIHJlZnJlc2ggd2lsbCBnbyB0aHJvdWdoXG4gICAqL1xuICByZWFkb25seSBza2lwSW5pdGlhbDogYm9vbGVhbjtcblxuICBnZXQgYWRhcHRlcigpOiBQYmxEYXRhU291cmNlQWRhcHRlciB7IHJldHVybiB0aGlzLl9hZGFwdGVyOyB9O1xuICBzZXQgYWRhcHRlcih2YWx1ZTogUGJsRGF0YVNvdXJjZUFkYXB0ZXIpIHtcbiAgICBpZiAodGhpcy5fYWRhcHRlciAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2FkYXB0ZXIgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLnBhZ2luYXRpb24pIHtcbiAgICAgICAgdGhpcy5fYWRhcHRlci5zZXRQYWdpbmF0b3IodGhpcy5fcGFnaW5hdG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBUT0RPKDEuMC4wKTogcmVtb3ZlXG4gIC8qKiBAZGVwcmVjYXRlZCBCUkVBS0lORyBDSEFOR0U6IHJlbW92ZWQgaW4gMS4wLjAgLSBVc2UgcmVuZGVyZWREYXRhIGluc3RlYWQuICovXG4gIGdldCByZW5kZXJlZFJvd3MoKTogVFtdIHsgcmV0dXJuIHRoaXMuX3JlbmRlckRhdGEkLnZhbHVlIHx8IFtdOyB9XG4gIC8qKiBSZXR1cm5zIHRoZSBzdGFydGluZyBpbmRleCBvZiB0aGUgcmVuZGVyZWQgZGF0YSAqL1xuICBnZXQgcmVuZGVyU3RhcnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2xhc3RSYW5nZSA/IHRoaXMuX2xhc3RSYW5nZS5zdGFydCA6IDA7IH1cbiAgZ2V0IHJlbmRlckxlbmd0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcmVuZGVyRGF0YSQudmFsdWUubGVuZ3RoOyB9XG4gIGdldCByZW5kZXJlZERhdGEoKTogVFtdIHsgcmV0dXJuIHRoaXMuX3JlbmRlckRhdGEkLnZhbHVlIHx8IFtdOyB9XG4gIC8qKlxuICAgKiBUaGUgYHNvdXJjZWAgd2l0aCBzb3J0aW5nIGFwcGxpZWQuXG4gICAqIFZhbGlkIG9ubHkgd2hlbiBzb3J0aW5nIGlzIHBlcmZvcm1lZCBjbGllbnQtc2lkZS5cbiAgICpcbiAgICogVG8gZ2V0IHJlYWwtdGltZSBub3RpZmljYXRpb25zIHVzZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgLlxuICAgKiBUaGUgc29ydGVkIGRhdGEgaXMgdXBkYXRlZCBqdXN0IGJlZm9yZSBgb25SZW5kZXJEYXRhQ2hhbmdpbmdgIGZpcmUuXG4gICAqL1xuICBnZXQgc29ydGVkRGF0YSgpOiBUW10geyByZXR1cm4gKHRoaXMuX2xhc3RBZGFwdGVyRXZlbnQgJiYgdGhpcy5fbGFzdEFkYXB0ZXJFdmVudC5zb3J0ZWQpIHx8IFtdOyB9O1xuICAvKipcbiAgICogVGhlIGBzb3VyY2VgIHdpdGggZmlsdGVyaW5nIGFwcGxpZWQuXG4gICAqIFZhbGlkIG9ubHkgd2hlbiBmaWx0ZXJpbmcgaXMgcGVyZm9ybWVkIGNsaWVudC1zaWRlLlxuICAgKiBJZiBzb3J0aW5nIGlzIGFwcGxpZWQgYXMgd2VsbCwgdGhlIGZpbHRlcmVkIHJlc3VsdHMgYXJlIGFsc28gc29ydGVkLlxuICAgKlxuICAgKiBUbyBnZXQgcmVhbC10aW1lIG5vdGlmaWNhdGlvbnMgdXNlIGBvblJlbmRlckRhdGFDaGFuZ2luZ2AuXG4gICAqIFRoZSBmaWx0ZXJlZCBkYXRhIGlzIHVwZGF0ZWQganVzdCBiZWZvcmUgYG9uUmVuZGVyRGF0YUNoYW5naW5nYCBmaXJlLlxuICAgKi9cbiAgZ2V0IGZpbHRlcmVkRGF0YSgpOiBUW10geyByZXR1cm4gKHRoaXMuX2xhc3RBZGFwdGVyRXZlbnQgJiYgdGhpcy5fbGFzdEFkYXB0ZXJFdmVudC5maWx0ZXJlZCkgfHwgW107IH07XG5cbiAgZ2V0IGZpbHRlcigpOiBEYXRhU291cmNlRmlsdGVyIHsgcmV0dXJuIHRoaXMuX2ZpbHRlciQudmFsdWU7IH1cbiAgZ2V0IHNvcnQoKTogUGJsTmdyaWREYXRhU291cmNlU29ydENoYW5nZSB7IHJldHVybiB0aGlzLl9zb3J0JC52YWx1ZTsgfVxuICBnZXQgcGFnaW5hdG9yKCk6IFBibFBhZ2luYXRvcjxhbnk+IHsgcmV0dXJuIHRoaXMuX3BhZ2luYXRvcjsgfVxuXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuc291cmNlLmxlbmd0aDsgfVxuICBnZXQgc291cmNlKCk6IFRbXSB7IHJldHVybiB0aGlzLl9zb3VyY2UgfHwgW107IH1cblxuICAvKiogUmVwcmVzZW50cyBzZWxlY3RlZCBpdGVtcyBvbiB0aGUgZGF0YSBzb3VyY2UuICovXG4gIGdldCBzZWxlY3Rpb24oKTogU2VsZWN0aW9uTW9kZWw8VD4geyByZXR1cm4gdGhpcy5fc2VsZWN0aW9uOyB9XG5cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uTW9kZWw8VD4odHJ1ZSwgW10pO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3RhYmxlQ29ubmVjdGlvbkNoYW5nZSQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX29uUmVuZGVyRGF0YUNoYW5naW5nID0gbmV3IFN1YmplY3Q8eyBldmVudDogUGJsRGF0YVNvdXJjZVRyaWdnZXJDaGFuZ2VkRXZlbnQ8VERhdGE+LCBkYXRhOiBUW10gfT4oKTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IF9yZW5kZXJEYXRhJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VFtdPihbXSk7XG4gIHByb3RlY3RlZCByZWFkb25seSBfZmlsdGVyJDogQmVoYXZpb3JTdWJqZWN0PERhdGFTb3VyY2VGaWx0ZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxEYXRhU291cmNlRmlsdGVyPih1bmRlZmluZWQpO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgX3NvcnQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYmxOZ3JpZERhdGFTb3VyY2VTb3J0Q2hhbmdlICYgeyBza2lwVXBkYXRlOiBib29sZWFuIH0+KHsgY29sdW1uOiBudWxsLCBzb3J0OiBudWxsLCBza2lwVXBkYXRlOiBmYWxzZSB9KTtcbiAgcHJvdGVjdGVkIF9vbkVycm9yJCA9IG5ldyBTdWJqZWN0PEVycm9yPigpO1xuXG4gIHByb3RlY3RlZCBfcGFnaW5hdG9yOiBQYmxQYWdpbmF0b3I8YW55PjtcblxuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgfCBmYWxzZTtcbiAgcHJpdmF0ZSBfYWRhcHRlcjogUGJsRGF0YVNvdXJjZUFkYXB0ZXI7XG4gIHByaXZhdGUgX3NvdXJjZTogVFtdO1xuICBwcml2YXRlIF9kaXNwb3NlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfdGFibGVDb25uZWN0ZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2xhc3RSZWZyZXNoOiBURGF0YTtcbiAgcHJpdmF0ZSBfbGFzdFJhbmdlOiBMaXN0UmFuZ2U7XG4gIHByaXZhdGUgX2xhc3RBZGFwdGVyRXZlbnQ6IFBibERhdGFTb3VyY2VBZGFwdGVyUHJvY2Vzc2VkUmVzdWx0PFQsIFREYXRhPjtcblxuICBjb25zdHJ1Y3RvcihhZGFwdGVyOiBQYmxEYXRhU291cmNlQWRhcHRlcjxULCBURGF0YT4sIG9wdGlvbnM/OiBQYmxEYXRhU291cmNlT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICB0aGlzLmFkYXB0ZXIgPSBhZGFwdGVyO1xuXG4gICAgdGhpcy5vblNvdXJjZUNoYW5naW5nID0gdGhpcy5fYWRhcHRlci5vblNvdXJjZUNoYW5naW5nO1xuICAgIC8vIGVtaXQgc291cmNlIGNoYW5nZWQgZXZlbnQgZXZlcnkgdGltZSBhZGFwdGVyIGdldHMgbmV3IGRhdGFcbiAgICB0aGlzLm9uU291cmNlQ2hhbmdlZCA9IHRoaXMuYWRhcHRlci5vblNvdXJjZUNoYW5nZWRcbiAgICAucGlwZShcbiAgICAgIG9ic2VydmVPbihhc2FwU2NoZWR1bGVyLCAwKSwgLy8gZW1pdCBvbiB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHR1cm4gKG1pY3JvLXRhc2spIHRvIGVuc3VyZSBgb25Tb3VyY2VDaGFuZ2VkYCBlbWlzc2lvbiBpbiBgX3VwZGF0ZVByb2Nlc3NpbmdMb2dpY2AgcnVuJ3MgZmlyc3QuXG4gICAgICBtYXBUbyh1bmRlZmluZWQpXG4gICAgKTtcbiAgICB0aGlzLm9uUmVuZGVyRGF0YUNoYW5naW5nID0gdGhpcy5fb25SZW5kZXJEYXRhQ2hhbmdpbmcuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5vblJlbmRlcmVkRGF0YUNoYW5nZWQgPSB0aGlzLl9yZW5kZXJEYXRhJC5waXBlKHNraXAoMSksIG1hcFRvKHVuZGVmaW5lZCkpO1xuICAgIHRoaXMub25FcnJvciA9IHRoaXMuX29uRXJyb3IkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMudGFibGVDb25uZWN0aW9uQ2hhbmdlID0gdGhpcy5fdGFibGVDb25uZWN0aW9uQ2hhbmdlJC5hc09ic2VydmFibGUoKTtcblxuICAgIHRoaXMua2VlcEFsaXZlID0gb3B0aW9ucy5rZWVwQWxpdmUgfHwgZmFsc2U7XG4gICAgdGhpcy5za2lwSW5pdGlhbCA9IG9wdGlvbnMuc2tpcEluaXRpYWwgfHwgZmFsc2U7XG4gICAgdGhpcy5zb3J0Q2hhbmdlID0gdGhpcy5fc29ydCQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogQSBjdXN0b20gdHJpZ2dlciB0aGF0IGludm9rZXMgYSBtYW51YWwgZGF0YSBzb3VyY2UgY2hhbmdlIHdpdGggdGhlIHByb3ZpZGVkIGRhdGEgdmFsdWUgaW4gdGhlIGBkYXRhYCBwcm9wZXJ0eSBhdCB0aHQgZXZlbnQuXG4gICAqL1xuICByZWZyZXNoKGRhdGE/OiBURGF0YSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl90YWJsZUNvbm5lY3RlZCkge1xuICAgICAgdGhpcy5fYWRhcHRlci5yZWZyZXNoKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sYXN0UmVmcmVzaCA9IGRhdGE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQuXG4gICAqL1xuICBzZXRGaWx0ZXIoKTogdm9pZDtcbiAgLyoqXG4gICAqIFNldCB0aGUgZmlsdGVyIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0IHVzaW5nIGEgZnVuY3Rpb24gcHJlZGljYXRlLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIHVzaW5nIGEgY3VzdG9tIHByZWRpY2F0ZSBmdW5jdGlvbiBhbGwgbG9naWMgaXMgcGFzc2VkIHRvIHRoZSBwcmVkaWNhdGUgYW5kIHRoZSBkYXRhc291cmNlIC8gZ3JpZCBkb2VzIG5vdCBoYW5kbGUgdGhlIGZpbHRlcmluZyBwcm9jZXNzLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgYW55IGNvbHVtbiBzcGVjaWZpYyBmaWx0ZXIsIHNldCBpbiB0aGUgY29sdW1uIGRlZmluaXRpb25zIGlzIGlnbm9yZWQsIGlmIHlvdSB3YW50IHRvIHRha2UgdGhlc2UgZmlsdGVycyBpbnRvIGNvbnNpZGVyYXRpb25cbiAgICogdXNlIHRoZSBjb2x1bW4gaW5zdGFuY2UgcHJvdmlkZWQgdG8gaWRlbnRpZnkgYW5kIHVzZSB0aGVzZSBmaWx0ZXJzICh0aGUgYGZpbHRlcmAgcHJvcGVydHkgaW4gYFBibENvbHVtbmApLlxuICAgKi9cbiAgc2V0RmlsdGVyKHZhbHVlOiBEYXRhU291cmNlUHJlZGljYXRlLCBjb2x1bW5zPzogUGJsQ29sdW1uW10pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBmaWx0ZXIgZGVmaW5pdGlvbiBmb3IgdGhlIGN1cnJlbnQgZGF0YSBzZXQgdXNpbmcgYSB2YWx1ZSB0byBjb21wYXJlIHdpdGggYW5kIGEgbGlzdCBvZiBjb2x1bW5zIHdpdGggdGhlIHZhbHVlcyB0byBjb21wYXJlIHRvLlxuICAgKlxuICAgKiBXaGVuIGEgY29sdW1uIGluc3RhbmNlIGhhcyBhIHNwZWNpZmljIHByZWRpY2F0ZSBzZXQgKGBQYmxDb2x1bW4uZmlsdGVyYCkgdGhlbiBpdCB3aWxsIGJlIHVzZWQsIG90aGVyd2lzZVxuICAgKiB0aGUgYGdlbmVyaWNDb2x1bW5QcmVkaWNhdGVgIHdpbGwgYmUgdXNlZC5cbiAgICovXG4gIHNldEZpbHRlcih2YWx1ZTogYW55LCBjb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQ7XG4gIHNldEZpbHRlcih2YWx1ZT86IERhdGFTb3VyY2VGaWx0ZXJUb2tlbiwgY29sdW1ucz86IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJyAmJiAoIWNvbHVtbnMgfHwgY29sdW1ucy5sZW5ndGggPT09IDApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZmlsdGVyIGRlZmluaXRpb25zLCBjb2x1bW5zIGFyZSBtYW5kYXRvcnkgd2hlbiB1c2luZyBhIHNpbmdsZSB2YWx1ZSBpbnB1dC4nKTtcbiAgICB9XG4gICAgdGhpcy5fZmlsdGVyJC5uZXh0KGNyZWF0ZUZpbHRlcih2YWx1ZSwgY29sdW1ucyB8fCBbXSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZnJlc2ggdGhlIGZpbHRlcnMgcmVzdWx0LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBzaG91bGQgb25seSBiZSB1c2VkIHdoZW4gdXNpbmcgYSBwcmVkaWNhdGUgZnVuY3Rpb24gZmlsdGVyIGFuZCBub3QgdGhlIHNpbXBsZSB2YWx1ZSBmaWx0ZXIuXG4gICAqIEluIGdlbmVyYWwgdGhlIGZpbHRlciBpcyByZWZyZXNoZWQgZXZlcnkgdGltZSBpdCBpcyBzZXQgYW5kIGVhY2ggdGltZSB0aGUgZGF0YSBpcyB1cGRhdGVkIHNvIG1hbnVhbGx5IHJlZnJlc2hpbmcgYSB2YWx1ZSBmaWx0ZXJcbiAgICogaGFzIG5vIGltcGFjdC5cbiAgICpcbiAgICogRm9yIGN1c3RvbSBwcmVkaWNhdGUgZnVuY3Rpb24gZmlsdGVycyB0aGlzIG1pZ2h0IGJlIHVzZWZ1bC5cbiAgICpcbiAgICovXG4gIHN5bmNGaWx0ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudEZpbHRlciA9IHRoaXMuX2FkYXB0ZXIuY2xlYXJDYWNoZSgnZmlsdGVyJyk7XG4gICAgaWYgKGN1cnJlbnRGaWx0ZXIpIHtcbiAgICAgIHRoaXMuc2V0RmlsdGVyKGN1cnJlbnRGaWx0ZXIuZmlsdGVyLCBjdXJyZW50RmlsdGVyLmNvbHVtbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBzb3J0IGRlZmluaXRpb25zLlxuICAgKiBAcGFyYW0gc2tpcFVwZGF0ZSBXaGVuIHRydWUgd2lsbCBub3QgdXBkYXRlIHRoZSBkYXRhc291cmNlLCB1c2UgdGhpcyB3aGVuIHRoZSBkYXRhIGNvbWVzIHNvcnRlZCBhbmQgeW91IHdhbnQgdG8gc3luYyB0aGUgZGVmaW5pdGlvbnMgd2l0aCB0aGUgY3VycmVudCBkYXRhIHNldC5cbiAgICogZGVmYXVsdCB0byBmYWxzZS5cbiAgICovXG4gIHNldFNvcnQoc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICAvKipcbiAgICogU2V0IHRoZSBzb3J0aW5nIGRlZmluaXRpb24gZm9yIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBAcGFyYW0gY29sdW1uXG4gICAqIEBwYXJhbSBzb3J0XG4gICAqIEBwYXJhbSBza2lwVXBkYXRlIFdoZW4gdHJ1ZSB3aWxsIG5vdCB1cGRhdGUgdGhlIGRhdGFzb3VyY2UsIHVzZSB0aGlzIHdoZW4gdGhlIGRhdGEgY29tZXMgc29ydGVkIGFuZCB5b3Ugd2FudCB0byBzeW5jIHRoZSBkZWZpbml0aW9ucyB3aXRoIHRoZSBjdXJyZW50IGRhdGEgc2V0LlxuICAgKiBkZWZhdWx0IHRvIGZhbHNlLlxuICAgKi9cbiAgc2V0U29ydChjb2x1bW46IFBibENvbHVtbiwgc29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgc2tpcFVwZGF0ZT86IGJvb2xlYW4pOiB2b2lkO1xuICBzZXRTb3J0KGNvbHVtbj86IFBibENvbHVtbiB8IGJvb2xlYW4sIHNvcnQ/OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBza2lwVXBkYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAoIWNvbHVtbiB8fCB0eXBlb2YgY29sdW1uID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHRoaXMuX3NvcnQkLm5leHQoeyBjb2x1bW46IG51bGwsIHNvcnQ6IHt9LCBza2lwVXBkYXRlOiAhIWNvbHVtbiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc29ydCQubmV4dCh7IGNvbHVtbiwgc29ydCwgc2tpcFVwZGF0ZSB9KTtcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fZGlzcG9zZWQpIHtcbiAgICAgIFVuUngua2lsbCh0aGlzKTtcbiAgICAgIHRoaXMuX2FkYXB0ZXIuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fb25SZW5kZXJEYXRhQ2hhbmdpbmcuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX3JlbmRlckRhdGEkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9maWx0ZXIkLmNvbXBsZXRlKCk7XG4gICAgICB0aGlzLl9zb3J0JC5jb21wbGV0ZSgpO1xuICAgICAgdGhpcy5fb25FcnJvciQuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0KGN2OiBDb2xsZWN0aW9uVmlld2VyKTogdm9pZCB7XG4gICAgdGhpcy5fbGFzdFJlZnJlc2ggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fdGFibGVDb25uZWN0aW9uQ2hhbmdlJC5uZXh0KHRoaXMuX3RhYmxlQ29ubmVjdGVkID0gZmFsc2UpO1xuICAgIGlmICh0aGlzLmtlZXBBbGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZGlzcG9zZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3QoY3Y6IENvbGxlY3Rpb25WaWV3ZXIpOiBPYnNlcnZhYmxlPFRbXT4ge1xuICAgIGlmICh0aGlzLl9kaXNwb3NlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYmxEYXRhU291cmNlIGlzIGRpc3Bvc2VkLiBVc2UgYGtlZXBBbGl2ZWAgaWYgeW91IG1vdmUgZGF0YXNvdXJjZSBiZXR3ZWVuIHRhYmxlcy4nKTtcbiAgICB9XG4gICAgdGhpcy5fdGFibGVDb25uZWN0ZWQgPSB0cnVlXG4gICAgdGhpcy5fdXBkYXRlUHJvY2Vzc2luZ0xvZ2ljKGN2KTtcbiAgICB0aGlzLl90YWJsZUNvbm5lY3Rpb25DaGFuZ2UkLm5leHQodGhpcy5fdGFibGVDb25uZWN0ZWQpO1xuICAgIHJldHVybiB0aGlzLl9yZW5kZXJEYXRhJDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlJ3MgYW4gaXRlbSAoaW4gdGhlIGVudGlyZSBzb3VyY2UpIGZyb20gb25lIGluZGV4IHRvIHRoZSBvdGhlciwgcHVzaGluZyB0aGUgaXRlbSBpbiB0aGUgZGVzdGluYXRpb24gb25lIGl0ZW0gYmFja3dhcmRzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaWYgdGhlIHJlbmRlcmVkIGRhdGEgaXMgYSBzdWJzZXQgb2YgdGhlIGVudGlyZSBzb3VyY2UgKGkuZSB2aXJ0dWFsIHNjcm9sbCAmIHJhbmdlKSB0aGUgaW5kaWNlcyBhcmUgY29uc2lkZXJlZFxuICAgKiBsb2NhbCB0byB0aGUgcmVuZGVyZWQgdmlldyBhbmQgYXJlIHRyYW5zbGF0ZWQgdG8gZml0IHRoZSBlbnRpcmUgc291cmNlLlxuICAgKlxuICAgKiBUcCBkaXNhYmxlIHRoaXMgYmVoYXZpb3IsIHNldCB0aGUgYGFic29sdXRlYCBwYXJhbWV0ZXIgdG8gYHRydWVgXG4gICAqL1xuICBtb3ZlSXRlbShmcm9tSW5kZXg6IG51bWJlciwgdG9JbmRleDogbnVtYmVyLCBhYnNvbHV0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKGFic29sdXRlICE9PSB0cnVlICYmIHRoaXMuX2xhc3RSYW5nZSkge1xuICAgICAgZnJvbUluZGV4ID0gdGhpcy5fbGFzdFJhbmdlLnN0YXJ0ICsgZnJvbUluZGV4O1xuICAgICAgdG9JbmRleCA9IHRoaXMuX2xhc3RSYW5nZS5zdGFydCArIHRvSW5kZXg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgbW92ZUl0ZW1JbkFycmF5KHRoaXMuX3NvdXJjZSwgZnJvbUluZGV4LCB0b0luZGV4KVxuICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX2xhc3RSYW5nZVxuICAgICAgICA/IHRoaXMuX3NvdXJjZS5zbGljZSh0aGlzLl9sYXN0UmFuZ2Uuc3RhcnQsIHRoaXMuX2xhc3RSYW5nZS5lbmQpXG4gICAgICAgIDogdGhpcy5fc291cmNlXG4gICAgICA7XG4gICAgICB0aGlzLl9yZW5kZXJEYXRhJC5uZXh0KGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVByb2Nlc3NpbmdMb2dpYyhjdjogQ29sbGVjdGlvblZpZXdlcik6IHZvaWQge1xuICAgIGNvbnN0IGluaXRpYWxTdGF0ZTogUGFydGlhbDxQYmxEYXRhU291cmNlVHJpZ2dlckNhY2hlPFREYXRhPj4gPSB7IGZpbHRlcjogdGhpcy5maWx0ZXIsICBzb3J0OiB0aGlzLnNvcnQgfTtcbiAgICBjb25zdCBwYWdpbmF0b3IgPSB0aGlzLl9wYWdpbmF0b3I7XG4gICAgaWYgKHBhZ2luYXRvcikge1xuICAgICAgaW5pdGlhbFN0YXRlLnBhZ2luYXRpb24gPSB7IHBhZ2U6IHBhZ2luYXRvci5wYWdlLCBwZXJQYWdlOiBwYWdpbmF0b3IucGVyUGFnZSB9O1xuICAgIH1cbiAgICBjb25zdCBzdHJlYW0gPSB0aGlzLl9hZGFwdGVyLnVwZGF0ZVByb2Nlc3NpbmdMb2dpYyhcbiAgICAgIHRoaXMuX2ZpbHRlciQsXG4gICAgICB0aGlzLl9zb3J0JCxcbiAgICAgIHBhZ2luYXRvciA/IHBhZ2luYXRvci5vbkNoYW5nZSA6IG9mKHVuZGVmaW5lZCksXG4gICAgICBpbml0aWFsU3RhdGUsXG4gICAgKTtcblxuICAgIFVuUngua2lsbCh0aGlzLCBQUk9DRVNTSU5HX1NVQlNDUklQVElPTl9HUk9VUClcblxuICAgIGNvbnN0IHRyaW1Ub1JhbmdlID0gKHJhbmdlOiBMaXN0UmFuZ2UsIGRhdGE6IGFueVtdKSA9PiBkYXRhLnNsaWNlKHJhbmdlLnN0YXJ0LCByYW5nZS5lbmQpIDtcblxuICAgIGxldCBza2lwVmlld0NoYW5nZTogYm9vbGVhbjtcbiAgICBsZXQgbGFzdEVtaXR0ZWRTb3VyY2U6IFRbXTtcblxuICAgIGN2LnZpZXdDaGFuZ2VcbiAgICAgIC5waXBlKFVuUngodGhpcywgUFJPQ0VTU0lOR19TVUJTQ1JJUFRJT05fR1JPVVApKVxuICAgICAgLnN1YnNjcmliZSggcmFuZ2UgPT4ge1xuICAgICAgICBpZiAodGhpcy5fbGFzdFJhbmdlICYmIHRoaXMuX2xhc3RSYW5nZS5zdGFydCA9PT0gcmFuZ2Uuc3RhcnQgJiYgdGhpcy5fbGFzdFJhbmdlLmVuZCA9PT0gcmFuZ2UuZW5kKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhc3RSYW5nZSA9IHJhbmdlO1xuICAgICAgICBpZiAoIXNraXBWaWV3Q2hhbmdlKSB7XG4gICAgICAgICAgaWYgKHJhbmdlICYmIGxhc3RFbWl0dGVkU291cmNlICYmIGxhc3RFbWl0dGVkU291cmNlLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyRGF0YSQubmV4dCh0cmltVG9SYW5nZSh0aGlzLl9sYXN0UmFuZ2UsIGxhc3RFbWl0dGVkU291cmNlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHN0cmVhbVxuICAgICAgLnBpcGUoXG4gICAgICAgIFVuUngodGhpcywgUFJPQ0VTU0lOR19TVUJTQ1JJUFRJT05fR1JPVVApLFxuICAgICAgICB0YXAoIHJlc3VsdCA9PiB7XG4gICAgICAgICAgbGFzdEVtaXR0ZWRTb3VyY2UgPSByZXN1bHQuZGF0YTtcbiAgICAgICAgICBza2lwVmlld0NoYW5nZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5fb25SZW5kZXJEYXRhQ2hhbmdpbmcubmV4dCh0aGlzLl9sYXN0QWRhcHRlckV2ZW50ID0gcmVzdWx0KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICh7ZGF0YX0pID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fbGFzdFJhbmdlICYmIGRhdGEgJiYgZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0cmltVG9SYW5nZSh0aGlzLl9sYXN0UmFuZ2UsIGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9yZW5kZXJEYXRhJC5uZXh0KGRhdGEpO1xuICAgICAgICAgIHNraXBWaWV3Q2hhbmdlID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHsgdGhpcy5fb25FcnJvciQubmV4dChlcnJvcikgfVxuICAgICAgKTtcblxuICAgIHRoaXMuX2FkYXB0ZXIub25Tb3VyY2VDaGFuZ2VkXG4gICAgICAucGlwZShVblJ4KHRoaXMsIFBST0NFU1NJTkdfU1VCU0NSSVBUSU9OX0dST1VQKSlcbiAgICAgIC5zdWJzY3JpYmUoIHNvdXJjZSA9PiB0aGlzLl9zb3VyY2UgPSBzb3VyY2UgfHwgW10gKTtcblxuICAgIGlmICh0aGlzLl9sYXN0UmVmcmVzaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9hZGFwdGVyLnJlZnJlc2godGhpcy5fbGFzdFJlZnJlc2gpO1xuICAgICAgdGhpcy5fbGFzdFJlZnJlc2ggPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICghdGhpcy5za2lwSW5pdGlhbCkge1xuICAgICAgLy8gX3JlZnJlc2gkIGlzIGEgU3ViamVjdCwgd2UgbXVzdCBlbWl0IG9uY2Ugc28gY29tYmluZUxhdGVzdCB3aWxsIHdvcmtcbiAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgIH1cbiAgfVxufVxuXG4iXX0=