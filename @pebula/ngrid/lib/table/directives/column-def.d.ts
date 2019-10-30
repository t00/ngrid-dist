import { KeyValueDiffers, KeyValueDiffer, OnDestroy, DoCheck } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { COLUMN } from '../columns';
import { PblNgridComponent } from '../table.component';
import { PblNgridExtensionApi } from '../../ext/table-ext-api';
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 */
export declare class PblNgridColumnDef<T extends COLUMN = COLUMN> extends CdkColumnDef implements DoCheck, OnDestroy {
    protected readonly _differs: KeyValueDiffers;
    protected extApi: PblNgridExtensionApi<any>;
    column: T;
    readonly isDirty: boolean;
    /**
     * The complete width definition for the column.
     * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     */
    readonly widths: [string, string, string];
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     */
    readonly netWidth: number;
    isDragging: boolean;
    table: PblNgridComponent<any>;
    protected _colDiffer: KeyValueDiffer<any, any>;
    private _column;
    private _isDirty;
    private _markedForCheck;
    /**
     * The complete width definition for the column.
     * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     */
    private _widths;
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     */
    private _netWidth;
    constructor(_differs: KeyValueDiffers, extApi: PblNgridExtensionApi<any>);
    /**
     * Marks this column for a lazy change detection check.
     * Lazy means it will run the check only when the diff is requested (i.e. querying the `hasChanged` property).
     * This allow aggregation of changes between CD cycles, i.e. calling `markForCheck()` multiple times within the same CD cycle does not hit performance.
     *
     * Once marked for check, `pblNgridColumnDef` handles it's dirty (`isDirty`) state automatically, when `isDirty` is true it will remain true until the
     * CD cycle ends, i.e. until `ngDoCheck()` hits. This means that only children of `pblNgridColumnDef` can relay on `isDirty`, all children will run their
     * `ngDoCheck()` before `ngDoCheck()` of `pblNgridColumnDef`.
     *
     * This is a how we notify all cell directives about changes in a column. It is done through angular CD logic and does not require manual
     * CD kicks and special channels between pblNgridColumnDef and it's children.
     */
    markForCheck(): void;
    /**
     * Update the width definitions for this column. [minWidth, width, maxWidth]
     * If an element is provided it will also apply the widths to the element.
     * @param width The new width
     * @param element Optional, an element to apply the width to, if not set will only update the width definitions.
     */
    updateWidth(width: string, element?: HTMLElement): void;
    /**
     * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
     */
    applyWidth(element: HTMLElement): void;
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     */
    queryCellElements(...filter: Array<'table' | 'header' | 'headerGroup' | 'footer' | 'footerGroup'>): HTMLElement[];
    /** @internal */
    ngDoCheck(): void;
    /** @internal */
    ngOnDestroy(): void;
    onResize(): void;
    updatePin(pin?: 'start' | 'end'): void;
    private attach;
    private detach;
}
