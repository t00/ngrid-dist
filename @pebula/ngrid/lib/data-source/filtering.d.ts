import { PblColumn } from '../table/columns';
import { DataSourceFilter, DataSourceFilterToken, DataSourceColumnPredicate } from './types';
export declare function createFilter(value: DataSourceFilterToken, columns: PblColumn[]): DataSourceFilter;
export declare function filter<T>(rawData: T[], filter: DataSourceFilter): T[];
/**
 * A generic column predicate that compares the inclusion (text) of the value in the column value.
 */
export declare const genericColumnPredicate: DataSourceColumnPredicate;
