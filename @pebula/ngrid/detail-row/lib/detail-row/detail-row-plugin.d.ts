import { EventEmitter, Injector, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridDetailRowComponent } from './row';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        detailRow?: PblNgridDetailRowPluginDirective<any>;
    }
}
export declare const PLUGIN_KEY: 'detailRow';
export declare const ROW_WHEN_TRUE: () => boolean;
export declare const ROW_WHEN_FALSE: () => boolean;
export declare function toggleDetailRow<T = any>(table: PblNgridComponent<T>, row: T, forceState?: boolean): boolean | void;
export interface PblDetailsRowToggleEvent<T = any> {
    row: T;
    expended: boolean;
    toggle(): void;
}
export declare class PblNgridDetailRowPluginDirective<T> implements OnDestroy {
    private table;
    private injector;
    /**
     * Detail row control (none / all rows / selective rows)
     *
     * A detail row is an additional row added below a row rendered with the context of the row above it.
     *
     * You can enable/disable detail row for the entire table by setting `detailRow` to true/false respectively.
     * To control detail row per row, provide a predicate.
     */
    detailRow: ((index: number, rowData: T) => boolean) | boolean;
    singleDetailRow: boolean;
    /**
     * A list of columns that will not trigger a detail row toggle when clicked.
     */
    excludeToggleFrom: string[];
    /**
     * Set the behavior when the row's context is changed while the detail row is opened (another row is displayed in place of the current row).
     *
     * - ignore: don't do anything, leave as is (for manual intervention)
     * - close: close the detail row
     * - render: re-render the row with the new context
     *
     * The default behavior is `render`
     *
     * This scenario will pop-up when using pagination and the user move between pages or change the page size.
     * It might also happen when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
     *
     * The `ignore` phase, when used, will not trigger an update, leaving the detail row opened and showing data from the previous row.
     * The `ignore` is intended for use with `toggledRowContextChange`, which will emit when the row context has changed, this will allow the developer to
     * toggle the row (mimic `close`) or update the context manually. For example, if toggling open the detail row invokes a "fetch" operation that retrieves data for the detail row
     * this will allow updates on context change.
     *
     * > Note that `toggledRowContextChange` fires regardless of the value set in `whenContextChange`
     */
    whenContextChange: 'ignore' | 'close' | 'render';
    /**
     * Emits whenever a detail row instance is toggled on/off
     * Emits an event handler with the row, the toggle state and a toggle operation method.
     */
    toggleChange: EventEmitter<PblDetailsRowToggleEvent<T>>;
    /**
     * Emits whenever the row context has changed while the row is toggled open.
     * This scenario is unique and will occur only when a detail row is opened AND the parent row has changed.
     *
     * For example, when using pagination and the user navigates to the next/previous set or when the rows per page size is changed.
     * It might also occur when the data is updated due to custom refresh calls on the datasource or any other scenario that might invoke a datasource update.
     *
     * Emits an event handler with the row, the toggle state and a toggle operation method.
     */
    toggledRowContextChange: EventEmitter<PblDetailsRowToggleEvent<T>>;
    private _openedRow?;
    private _forceSingle;
    private _isSimpleRow;
    private _isDetailRow;
    private _detailRowRows;
    private _detailRow;
    private _detailRowDef;
    private _defaultParentRef;
    private _removePlugin;
    constructor(table: PblNgridComponent<any>, pluginCtrl: PblNgridPluginController<T>, injector: Injector);
    addDetailRow(detailRow: PblNgridDetailRowComponent): void;
    removeDetailRow(detailRow: PblNgridDetailRowComponent): void;
    toggleDetailRow(row: any, forceState?: boolean): boolean | void;
    ngOnDestroy(): void;
    /** @internal */
    detailRowToggled(event: PblDetailsRowToggleEvent<T>): void;
    private setupDetailRowParent;
    private resetTableRowDefs;
    /**
     * Update the table with detail row infor.
     * Instead of calling for a change detection cycle we can assign the new predicates directly to the cdkRowDef instances.
     */
    private updateTable;
}
