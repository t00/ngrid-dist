import { OnDestroy } from '@angular/core';
import { PblNgridConfigService, PblColumnDefinition, PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/table/services/config' {
    interface PblNgridConfig {
        transposePlugin?: {
            header?: Partial<PblColumnDefinition>;
            defaultCol?: Partial<PblColumnDefinition>;
            matchTemplates?: boolean;
        };
    }
}
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        transpose?: PblNgridTransposePluginDirective;
    }
}
/**
 * Transpose plugin.
 *
 * This plugin will swaps around the rows and columns of the table.
 *
 * A **regular table** (not transposed) represents rows horizontally:
 *
 * - Each horizontal row represents an item in the collection.
 * - Each vertical column represents the same property of all rows in the collection.
 *
 * A **transposed** table represents row vertically:
 *
 * - Each horizontal row represents the same property of all rows in the collection.
 * - Each vertical row represents an item in the collection.
 *
 * > Note that transposing a table might not play nice with other plugins and/or features.
 * For example, using pagination with transpose make no sense.
 */
export declare class PblNgridTransposePluginDirective implements OnDestroy {
    private table;
    private pluginCtrl;
    transpose: boolean;
    /**
     * Column definitions for the new header column, this is the column the first column that
     * will display all the headers.
     *
     * This is an optional value, when not set a default column settings is used:
     *
     * ```js
     * {
     *  prop: '__transpose__',
     *  css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell',
     * }
     * ```
     *
     * When set, the new column values will merge into the default definitions, overriding existing properties
     * set on the default column settings.
     *
     * > The header column behave like any other column and you can also provide define it in the `column` property on the table.
     * When using this approach the column defined on the table is used as is (no merging). Just make sure you use the right `prop` value for it.
     * e.g. if `header` is not set here its `__transpose__` otherwise, the actual `prop` value.
     */
    header: Partial<PblColumnDefinition>;
    /**
     * Column definitions to be used as the base default definitions for the new transposed columns.
     * This is an optional value, when not set no default's are applied.
     */
    defaultCol: Partial<PblColumnDefinition>;
    /**
     * When true, will try to use the original template of the cell, i.e. the template that would have been used
     * if we did not transpose at all.
     *
     * Defaults to false.
     */
    matchTemplates: boolean;
    private enabled;
    private _header;
    private tableState;
    private columns;
    private selfColumn;
    private _removePlugin;
    constructor(table: PblNgridComponent<any>, pluginCtrl: PblNgridPluginController, config: PblNgridConfigService);
    ngOnDestroy(): void;
    disable(updateTable: boolean): void;
    enable(refreshDataSource?: boolean): void;
    private updateColumns;
}
