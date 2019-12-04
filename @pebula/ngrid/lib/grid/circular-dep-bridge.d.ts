/**
 * This file contains constants shared between modules (files) that if not extract will cause a circular dependency
 */
import { CdkColumnDef } from '@angular/cdk/table';
import { PblColumnTypeDefinition } from './columns/types';
export declare const COLUMN_EDITABLE_CELL_CLASS = "pbl-ngrid-editable-cell";
/**
 * Returns a css class unique to the column
 */
export declare function uniqueColumnCss(columnDef: CdkColumnDef): string;
/**
 * Returns a css class unique to the type of the column (columns might share types)
 */
export declare function uniqueColumnTypeCss(type: PblColumnTypeDefinition): string;
