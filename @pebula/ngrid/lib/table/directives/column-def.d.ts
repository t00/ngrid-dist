import { OnDestroy, EventEmitter } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { COLUMN } from '../columns';
import { PblNgridComponent } from '../table.component';
import { PblNgridExtensionApi } from '../../ext/table-ext-api';
export declare type UpdateWidthReason = 'attach' | 'update' | 'resize';
export interface WidthChangeEvent {
    reason: UpdateWidthReason;
}
/**
 * Represents a runtime column definition for a user-defined column definitions.
 *
 * User defined column definitions are `PblColumn`, `PblMetaColumn`, `PblColumnGroup` etc...
 * They represent static column definitions and `PblNgridColumnDef` is the runtime instance of them.
 *
 */
export declare class PblNgridColumnDef<T extends COLUMN = COLUMN> extends CdkColumnDef implements OnDestroy {
    protected extApi: PblNgridExtensionApi<any>;
    column: T;
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
    /**
     * An event emitted when width of this column has changed.
     */
    widthChange: EventEmitter<WidthChangeEvent>;
    private _column;
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
    private widthBreakout;
    constructor(extApi: PblNgridExtensionApi<any>);
    /**
     * Update the "widths" for this column and when width has changed.
     *
     * The "widths" are the 3 values representing a width of a cell: [minWidth, width, maxWidth],
     * this method is given the width and will calculate the minWidth and maxWidth based on the column definitions.
     *
     * If at least one value of "widths" has changed, fires the `widthChange` event with the `reason` provided.
     *
     * The reason can be used to optionally update the relevant cells, based on the source (reason) of the update.
     * - attach: This runtime column definition instance was attached to a static column definition instance.
     * - update: The width value was updated in the static column definition instance , which triggered a width update to the runtime column definition instance
     * - resize: A resize event to the header PblColumn cell was triggered, the width of the static column definition is not updated, only the runtime value is.
     *
     * Note that this updates the width of the column-def instance, not the column definitions width itself.
     * Only when `reason === 'update'` it means that the column definition was updated and triggered this update
     *
     * @param width The new width
     * @param reason The reason for this change
     */
    updateWidth(width: string, reason: UpdateWidthReason): void;
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
    ngOnDestroy(): void;
    onResize(): void;
    updatePin(pin?: 'start' | 'end'): void;
    private attach;
    private detach;
}
