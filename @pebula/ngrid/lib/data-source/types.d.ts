import { PblColumn } from '../table/columns/column';
export declare type PblNgridSortOrder = 'asc' | 'desc';
export interface PblNgridSortInstructions {
    order?: PblNgridSortOrder;
}
/**
 * Event fired when sort changes.
 */
export interface PblNgridSortDefinition extends PblNgridSortInstructions {
    sortFn?: PblNgridSorter;
}
/**
 * A function that can sort a dataset based on `PblNgridSortInstructions`
 */
export interface PblNgridSorter<T = any> {
    (column: PblColumn, sort: PblNgridSortInstructions, data: T[]): T[];
}
export interface PblNgridDataSourceSortChange {
    column: PblColumn;
    sort: PblNgridSortDefinition;
}
/**
 * A function the return true then the value should be included in the result or false when not.
 * This is a single column filter predicated, returning false will filter out the entire row but the
 * predicate is only intended to filter a specific column.
 */
export declare type DataSourceColumnPredicate = (filterValue: any, colValue: any, row?: any, col?: PblColumn) => boolean;
/**
 * A function the return true then the row should be included in the result or false when not.
 * @param row The row in the data source that the filter apply on
 * @param properties A list of column instances (`PblColumn`) to filter values by.
 */
export declare type DataSourcePredicate = (row: any, properties: PblColumn[]) => boolean;
export declare type DataSourceFilterToken = undefined | DataSourcePredicate | any;
export interface DataSourceFilterType {
    type: 'value' | 'predicate';
    columns: PblColumn[];
    filter: any | DataSourcePredicate;
}
export declare type DataSourceFilter = undefined | DataSourceFilterType;
