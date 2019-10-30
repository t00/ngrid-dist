import { PblColumnDefinition } from '../columns/types';
import { PblColumn } from '../columns/column';
import { PblMetaColumnStore } from '../columns/column-store';
import { StaticColumnWidthLogic } from '../col-width-logic/static-column-width';
/**
 * Given an object (item) and a path, returns the value at the path
 */
export declare function deepPathGet(item: any, col: PblColumnDefinition): any;
/**
 * Given an object (item) and a path, returns the value at the path
 */
export declare function deepPathSet(item: any, col: PblColumnDefinition, value: any): void;
/**
 * Updates the column sizes of the columns provided based on the column definition metadata for each column.
 * The final width represent a static width, it is the value as set in the definition (except column without width, where the calculated global width is set).
 */
export declare function resetColumnWidths(rowWidth: StaticColumnWidthLogic, tableColumns: PblColumn[], metaColumns: PblMetaColumnStore[], options?: {
    tableMarkForCheck?: boolean;
    metaMarkForCheck?: boolean;
}): void;
