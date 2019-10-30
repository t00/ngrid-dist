import { PblDataSource, DataSourceOf } from './data-source';
import { PblDataSourceConfigurableTriggers, PblDataSourceTriggerChangedEvent } from './data-source-adapter.types';
export declare class PblDataSourceFactory<T, TData = any> {
    private _adapter;
    private _dsOptions;
    private _onCreated;
    /**
     * Set the main trigger handler.
     * The trigger handler is the core of the datasource, responsible for returning the data collection.
     *
     * By default the handler is triggered only when the datasource is required.
     * This can happened when:
     *   - The table connected to the datasource.
     *   - A manual call to `PblDataSource.refresh()` was invoked.
     *
     * There are additional triggers (filter/sort/pagination) which occur when their values change, e.g. when
     * a filter has change or when a page in the paginator was changed.
     *
     * By default, these triggers are handled automatically, resulting in a client-side behavior for each of them.
     * For example, a client side paginator will move to the next page based on an already existing data collection (no need to fetch from the server).
     *
     * To handle additional trigger you need to explicitly set them using `setCustomTriggers`.
     */
    onTrigger(handler: (event: PblDataSourceTriggerChangedEvent<TData>) => (false | DataSourceOf<T>)): this;
    /**
     * A list of triggers that will be handled by the trigger handler.
     * By default all triggers are handled by the adapter, resulting in a client-side filter/sort/pagiantion that works out of the box.
     * To implement server side filtering, sorting and/or pagination specify which should be handled by the on trigger handler.
     *
     * You can mix and match, e.g. support only paging from the server, or only paging and sorting, and leave filtering for the client side.
     */
    setCustomTriggers(...triggers: Array<keyof PblDataSourceConfigurableTriggers>): this;
    /**
     * Skip the first trigger emission.
     * Use this for late binding, usually with a call to refresh() on the data source.
     *
     * Note that only the internal trigger call is skipped, a custom calls to refresh will go through
     */
    skipInitialTrigger(): this;
    keepAlive(): this;
    onCreated(handler: (dataSource: PblDataSource<T, TData>) => void): this;
    create(): PblDataSource<T, TData>;
}
export declare function createDS<T, TData = T[]>(): PblDataSourceFactory<T, TData>;
