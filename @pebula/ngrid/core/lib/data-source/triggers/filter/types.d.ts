import { PblColumnDefinition } from '../../../models/column';
/**
 * A function the return true then the value should be included in the result or false when not.
 * This is a single column filter predicated, returning false will filter out the entire row but the
 * predicate is only intended to filter a specific column.
 */
export declare type DataSourceColumnPredicate = (filterValue: any, colValue: any, row?: any, col?: PblColumnDefinition) => boolean;
/**
 * A function the return true then the row should be included in the result or false when not.
 * @param row The row in the data source that the filter apply on
 * @param properties A list of column instances (`PblColumnDefinition`) to filter values by.
 */
export declare type DataSourcePredicate = (row: any, properties: PblColumnDefinition[]) => boolean;
export declare type DataSourceFilterToken = undefined | DataSourcePredicate | any;
export interface DataSourceFilterType {
    type: 'value' | 'predicate';
    columns: PblColumnDefinition[];
    filter: any | DataSourcePredicate;
}
export declare type DataSourceFilter = undefined | DataSourceFilterType;
