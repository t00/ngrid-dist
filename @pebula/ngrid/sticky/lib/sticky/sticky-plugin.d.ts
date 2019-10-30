import { IterableDiffers, IterableDiffer, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        sticky?: PblNgridStickyPluginDirective;
    }
}
export declare const PLUGIN_KEY: 'sticky';
export declare function setStickyRow(table: PblNgridComponent<any>, type: 'header' | 'footer', bulk: Array<['table' | number, boolean]>): void;
export declare function setStickyRow(table: PblNgridComponent<any>, type: 'header' | 'footer', value: 'table' | number, state: boolean): void;
export declare function setStickyColumns(table: PblNgridComponent<any>, type: 'start' | 'end', bulk: Array<[string | number, boolean]>): void;
export declare function setStickyColumns(table: PblNgridComponent<any>, type: 'start' | 'end', value: string | number, state: boolean): void;
export declare class PblNgridStickyPluginDirective implements OnDestroy {
    protected readonly table: PblNgridComponent<any>;
    protected readonly _differs: IterableDiffers;
    protected readonly pluginCtrl: PblNgridPluginController;
    /**
     * Set the header rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `table` - Literal string `table` that will set the table's main header row.
     *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     */
    stickyColumnStart: Array<string | number>;
    /**
     * Set the footer rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `table` - Literal string `table` that will set the table's main footer row.
     *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     */
    stickyColumnEnd: Array<string | number>;
    /**
   * Set the header rows you want to apply sticky positioning to.
   * Valid values are:
   *   - `table` - Literal string `table` that will set the table's main header row.
   *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
   *
   * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
   * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
   */
    stickyHeader: Array<'table' | number>;
    /**
     * Set the footer rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `table` - Literal string `table` that will set the table's main footer row.
     *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     */
    stickyFooter: Array<'table' | number>;
    private _startDiffer;
    private _endDiffer;
    private _headerDiffer;
    private _footerDiffer;
    private _columnCache;
    private _removePlugin;
    constructor(table: PblNgridComponent<any>, _differs: IterableDiffers, pluginCtrl: PblNgridPluginController);
    ngOnDestroy(): void;
    protected applyColumnDiff(type: 'start' | 'end', value: Array<string | number>, differ: IterableDiffer<string | number>): void;
    protected applyRowDiff(type: 'header' | 'footer', value: Array<'table' | number>, differ: IterableDiffer<'table' | number>): void;
}
