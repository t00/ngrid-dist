import { PblNgridEvent } from '../events/ngrid-events';
import { PblDataSource } from './data-source';
declare module '../events/ngrid-events' {
    interface PblNgridEventSourceMap {
        ds: true;
    }
    interface PblNgridEventsMap {
        onDataSource: PblNgridOnDataSourceEvent;
        onBeforeMoveItem: PblNgridOnBeforeMoveItemEvent;
    }
}
export interface PblNgridOnDataSourceEvent extends PblNgridEvent<'ds', 'onDataSource'> {
    prev: PblDataSource<any>;
    curr: PblDataSource<any>;
}
export interface PblNgridOnBeforeMoveItemEvent extends PblNgridEvent<'ds', 'onBeforeMoveItem'> {
    fromIndex: number;
    toIndex: number;
}
