/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { columnFactory, PblNgridConfigService, PblColumnDefinition, PblNgridColumnDefinitionSet, PblNgridComponent, PblNgridPluginController, PblColumn, TablePlugin, } from '@pebula/ngrid';
import { TransposeTableSession, LOCAL_COLUMN_DEF, VIRTUAL_REFRESH } from './transpose-table-session';
import { getCellValueTransformed, createTransformedColumn } from './utils';
/** @type {?} */
const DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
/** @type {?} */
const PLUGIN_KEY = 'transpose';
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
let PblNgridTransposePluginDirective = /**
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
class PblNgridTransposePluginDirective {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} config
     */
    constructor(table, pluginCtrl, config) {
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this._header = DEFAULT_HEADER_COLUMN;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        const transposePlugin = config.get('transposePlugin');
        if (transposePlugin) {
            this.header = transposePlugin.header;
            this.defaultCol = transposePlugin.defaultCol || {};
            this.matchTemplates = transposePlugin.matchTemplates || false;
        }
    }
    /**
     * @return {?}
     */
    get transpose() { return this.enabled; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set transpose(value) {
        value = coerceBooleanProperty(value);
        if (value !== this.enabled) {
            /** @type {?} */
            const isFirst = this.enabled === undefined;
            this.enabled = value;
            if (!value) {
                this.disable(true);
            }
            else {
                this.enable(!isFirst);
            }
        }
    }
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
     * @param {?} value
     * @return {?}
     */
    set header(value) {
        this._header = Object.assign({}, DEFAULT_HEADER_COLUMN, value || {});
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.table);
        this.disable(false);
    }
    /**
     * @param {?} updateTable
     * @return {?}
     */
    disable(updateTable) {
        if (this.tableState) {
            const { tableState } = this;
            this.columns = this.selfColumn = this.tableState = this.columns = this.selfColumn = undefined;
            tableState.destroy(updateTable);
        }
    }
    /**
     * @param {?=} refreshDataSource
     * @return {?}
     */
    enable(refreshDataSource = false) {
        if (this.tableState) {
            this.disable(false);
        }
        /** @type {?} */
        const sourceFactoryWrapper = (/**
         * @param {?} results
         * @return {?}
         */
        (results) => {
            if (results) {
                /** @type {?} */
                const local = this.table.columns = columnFactory()
                    .default(this.defaultCol || {})
                    .table(this.selfColumn, ...results.map(createTransformedColumn))
                    .build();
                /** @type {?} */
                const prev = this.tableState.columnsInput;
                local.header = prev.header;
                local.headerGroup = prev.headerGroup;
                local.footer = prev.footer;
                local[LOCAL_COLUMN_DEF] = true;
                this.table.invalidateColumns();
                /** @type {?} */
                const matchTemplates = coerceBooleanProperty(this.matchTemplates);
                const { prop } = this._header;
                /** @type {?} */
                const columnKeysToProxy = ['type'];
                if (matchTemplates) {
                    columnKeysToProxy.push('cellTpl');
                }
                /* The following logic is not for the faint of heart.
                           Basically, the transpose plugin does not swap the actual data but the columns.
                           When transposing, all rows will swap to columns so, A new column definition is created,
                           with columns equal to the total number or items in the datasource.
                           Each column (new one) represents a row so we save a reference to the actual row in the new column.
                
                           The next step is to create a new datasource, the new datasource is simply a collection of all of the original columns.
                
                           Now when `getValue` is called on the new column it is called with a "row" which is the original column.
                           Because the new column has a reference to the actual (original) row we can call the `getValue` on the old column with the actual row.
                
                           In this process, all of the column metadata related to the presentation layer is lost. For example, if CSS classes will
                           not be the same, templates, types etc... This is because when the grid renders a cell that cell has a single template across
                           all rows but now we need a different template for every row.
                
                           We can proxy a (VERY) limited set of metadata properties related to the presentation layer, valid only on render time.
                           This relays on the fact that each row is rendered complete, starting from the first cell to the last so
                           with that we can get a reference to the original column tha that now represents the whole row.
                         */
                /** @type {?} */
                let currentColumn;
                for (const c of this.table.columnApi.visibleColumns) {
                    if (c.orgProp === prop) {
                        c.getValue = (/**
                         * @param {?} row
                         * @return {?}
                         */
                        (row) => {
                            currentColumn = row;
                            return (/** @type {?} */ (row.label));
                        });
                    }
                    else {
                        c.getValue = getCellValueTransformed;
                        for (const key of columnKeysToProxy) {
                            Object.defineProperty(c, key, { configurable: true, get: (/**
                                 * @return {?}
                                 */
                                () => currentColumn && currentColumn[key]), set: (/**
                                 * @param {?} value
                                 * @return {?}
                                 */
                                value => { }) });
                        }
                    }
                }
                return this.columns;
            }
            return results;
        });
        this.tableState = new TransposeTableSession(this.table, this.pluginCtrl, (/**
         * @return {?}
         */
        () => this.updateColumns(this.table.columnApi.visibleColumns)), sourceFactoryWrapper);
        if (refreshDataSource) {
            this.pluginCtrl.extApi.contextApi.clear();
            this.table.ds.refresh();
        }
        else if (this.table.ds.length > 0) {
            this.table.ds.refresh(VIRTUAL_REFRESH);
        }
    }
    /**
     * @private
     * @param {?} columns
     * @return {?}
     */
    updateColumns(columns) {
        const { prop } = this._header;
        this.columns = [];
        for (const c of columns) {
            if (c.orgProp === prop) {
                this.selfColumn = c;
            }
            else {
                this.columns.push(c);
            }
        }
        if (!this.selfColumn) {
            // TODO: don't assume columns[0]
            this.selfColumn = new PblColumn(this._header, this.pluginCtrl.extApi.columnStore.groupStore);
        }
    }
};
PblNgridTransposePluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: PblNgridConfigService }
];
PblNgridTransposePluginDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[transpose]' },] }
];
/** @nocollapse */
PblNgridTransposePluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: PblNgridConfigService }
];
PblNgridTransposePluginDirective.propDecorators = {
    transpose: [{ type: Input }],
    header: [{ type: Input, args: ['transposeHeaderCol',] }],
    defaultCol: [{ type: Input, args: ['transposeDefaultCol',] }],
    matchTemplates: [{ type: Input }]
};
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
PblNgridTransposePluginDirective = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, PblNgridConfigService])
], PblNgridTransposePluginDirective);
export { PblNgridTransposePluginDirective };
if (false) {
    /**
     * Column definitions to be used as the base default definitions for the new transposed columns.
     * This is an optional value, when not set no default's are applied.
     * @type {?}
     */
    PblNgridTransposePluginDirective.prototype.defaultCol;
    /**
     * When true, will try to use the original template of the cell, i.e. the template that would have been used
     * if we did not transpose at all.
     *
     * Defaults to false.
     * @type {?}
     */
    PblNgridTransposePluginDirective.prototype.matchTemplates;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.enabled;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype._header;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.tableState;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.columns;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.selfColumn;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.pluginCtrl;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUNMLGFBQWEsRUFDYixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7TUFFckUscUJBQXFCLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSx3REFBd0QsRUFBRTs7TUFpQmhILFVBQVUsR0FBZ0IsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdCOUIsZ0NBQWdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBaEMsZ0NBQWdDOzs7Ozs7SUE2RDNDLFlBQW9CLEtBQTZCLEVBQVUsVUFBb0MsRUFBRSxNQUE2QjtRQUExRyxVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBTnZGLFlBQU8sR0FBd0IscUJBQXFCLENBQUM7UUFPM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENB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VUFBVSxDQUFDLENBQUM7U0FDOUY7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUExSDRCLGlCQUFpQjtZQUEyQix3QkFBd0I7WUFBVSxxQkFBcUI7OztZQS9EL0gsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7O1lBaEQ3QyxpQkFBaUI7WUFDakIsd0JBQXdCO1lBSnhCLHFCQUFxQjs7O3dCQXVEcEIsS0FBSztxQkFrQ0wsS0FBSyxTQUFDLG9CQUFvQjt5QkFRMUIsS0FBSyxTQUFDLHFCQUFxQjs2QkFRM0IsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFwREssZ0NBQWdDO0lBSDVDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUUvQixJQUFJLEVBQUU7NkNBOERzQixpQkFBaUIsRUFBMkIsd0JBQXdCLEVBQVUscUJBQXFCO0dBN0RuSCxnQ0FBZ0MsQ0F1TDVDO1NBdkxZLGdDQUFnQzs7Ozs7OztJQTRDM0Msc0RBQXVFOzs7Ozs7OztJQVF2RSwwREFBaUM7Ozs7O0lBRWpDLG1EQUF5Qjs7Ozs7SUFDekIsbURBQTZEOzs7OztJQUM3RCxzREFBMEM7Ozs7O0lBQzFDLG1EQUE2Qjs7Ozs7SUFDN0Isc0RBQThCOzs7OztJQUM5Qix5REFBK0Q7Ozs7O0lBRW5ELGlEQUFxQzs7Ozs7SUFBRSxzREFBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7XG4gIGNvbHVtbkZhY3RvcnksXG4gIFBibE5ncmlkQ29uZmlnU2VydmljZSxcbiAgUGJsQ29sdW1uRGVmaW5pdGlvbixcbiAgUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0LFxuICBQYmxOZ3JpZENvbXBvbmVudCxcbiAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICBQYmxDb2x1bW4sXG4gIFRhYmxlUGx1Z2luLFxufSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgVHJhbnNwb3NlVGFibGVTZXNzaW9uLCBMT0NBTF9DT0xVTU5fREVGLCBWSVJUVUFMX1JFRlJFU0ggfSBmcm9tICcuL3RyYW5zcG9zZS10YWJsZS1zZXNzaW9uJztcbmltcG9ydCB7IGdldENlbGxWYWx1ZVRyYW5zZm9ybWVkLCBjcmVhdGVUcmFuc2Zvcm1lZENvbHVtbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBERUZBVUxUX0hFQURFUl9DT0xVTU4gPSB7IHByb3A6ICdfX3RyYW5zcG9zZV9fJywgY3NzOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsIHBibC1uZ3JpZC10cmFuc3Bvc2VkLWhlYWRlci1jZWxsJyB9O1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvdGFibGUvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdHJhbnNwb3NlUGx1Z2luPzoge1xuICAgICAgaGVhZGVyPzogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcbiAgICAgIGRlZmF1bHRDb2w/OiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+O1xuICAgICAgbWF0Y2hUZW1wbGF0ZXM/OiBib29sZWFuO1xuICAgIH1cbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgdHJhbnNwb3NlPzogUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cbmNvbnN0IFBMVUdJTl9LRVk6ICd0cmFuc3Bvc2UnID0gJ3RyYW5zcG9zZSc7XG5cbi8qKlxuICogVHJhbnNwb3NlIHBsdWdpbi5cbiAqXG4gKiBUaGlzIHBsdWdpbiB3aWxsIHN3YXBzIGFyb3VuZCB0aGUgcm93cyBhbmQgY29sdW1ucyBvZiB0aGUgdGFibGUuXG4gKlxuICogQSAqKnJlZ3VsYXIgdGFibGUqKiAobm90IHRyYW5zcG9zZWQpIHJlcHJlc2VudHMgcm93cyBob3Jpem9udGFsbHk6XG4gKlxuICogLSBFYWNoIGhvcml6b250YWwgcm93IHJlcHJlc2VudHMgYW4gaXRlbSBpbiB0aGUgY29sbGVjdGlvbi5cbiAqIC0gRWFjaCB2ZXJ0aWNhbCBjb2x1bW4gcmVwcmVzZW50cyB0aGUgc2FtZSBwcm9wZXJ0eSBvZiBhbGwgcm93cyBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBBICoqdHJhbnNwb3NlZCoqIHRhYmxlIHJlcHJlc2VudHMgcm93IHZlcnRpY2FsbHk6XG4gKlxuICogLSBFYWNoIGhvcml6b250YWwgcm93IHJlcHJlc2VudHMgdGhlIHNhbWUgcHJvcGVydHkgb2YgYWxsIHJvd3MgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKiAtIEVhY2ggdmVydGljYWwgcm93IHJlcHJlc2VudHMgYW4gaXRlbSBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiA+IE5vdGUgdGhhdCB0cmFuc3Bvc2luZyBhIHRhYmxlIG1pZ2h0IG5vdCBwbGF5IG5pY2Ugd2l0aCBvdGhlciBwbHVnaW5zIGFuZC9vciBmZWF0dXJlcy5cbiAqIEZvciBleGFtcGxlLCB1c2luZyBwYWdpbmF0aW9uIHdpdGggdHJhbnNwb3NlIG1ha2Ugbm8gc2Vuc2UuXG4gKi9cblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFt0cmFuc3Bvc2VdJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBnZXQgdHJhbnNwb3NlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5lbmFibGVkOyB9O1xuICBzZXQgdHJhbnNwb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5lbmFibGVkKSB7XG4gICAgICBjb25zdCBpc0ZpcnN0ID0gdGhpcy5lbmFibGVkID09PSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmVuYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbmFibGUoIWlzRmlyc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2x1bW4gZGVmaW5pdGlvbnMgZm9yIHRoZSBuZXcgaGVhZGVyIGNvbHVtbiwgdGhpcyBpcyB0aGUgY29sdW1uIHRoZSBmaXJzdCBjb2x1bW4gdGhhdFxuICAgKiB3aWxsIGRpc3BsYXkgYWxsIHRoZSBoZWFkZXJzLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIG9wdGlvbmFsIHZhbHVlLCB3aGVuIG5vdCBzZXQgYSBkZWZhdWx0IGNvbHVtbiBzZXR0aW5ncyBpcyB1c2VkOlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiB7XG4gICAqICBwcm9wOiAnX190cmFuc3Bvc2VfXycsXG4gICAqICBjc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwgcGJsLW5ncmlkLXRyYW5zcG9zZWQtaGVhZGVyLWNlbGwnLFxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBXaGVuIHNldCwgdGhlIG5ldyBjb2x1bW4gdmFsdWVzIHdpbGwgbWVyZ2UgaW50byB0aGUgZGVmYXVsdCBkZWZpbml0aW9ucywgb3ZlcnJpZGluZyBleGlzdGluZyBwcm9wZXJ0aWVzXG4gICAqIHNldCBvbiB0aGUgZGVmYXVsdCBjb2x1bW4gc2V0dGluZ3MuXG4gICAqXG4gICAqID4gVGhlIGhlYWRlciBjb2x1bW4gYmVoYXZlIGxpa2UgYW55IG90aGVyIGNvbHVtbiBhbmQgeW91IGNhbiBhbHNvIHByb3ZpZGUgZGVmaW5lIGl0IGluIHRoZSBgY29sdW1uYCBwcm9wZXJ0eSBvbiB0aGUgdGFibGUuXG4gICAqIFdoZW4gdXNpbmcgdGhpcyBhcHByb2FjaCB0aGUgY29sdW1uIGRlZmluZWQgb24gdGhlIHRhYmxlIGlzIHVzZWQgYXMgaXMgKG5vIG1lcmdpbmcpLiBKdXN0IG1ha2Ugc3VyZSB5b3UgdXNlIHRoZSByaWdodCBgcHJvcGAgdmFsdWUgZm9yIGl0LlxuICAgKiBlLmcuIGlmIGBoZWFkZXJgIGlzIG5vdCBzZXQgaGVyZSBpdHMgYF9fdHJhbnNwb3NlX19gIG90aGVyd2lzZSwgdGhlIGFjdHVhbCBgcHJvcGAgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoJ3RyYW5zcG9zZUhlYWRlckNvbCcpIHNldCBoZWFkZXIodmFsdWU6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4pIHtcbiAgICB0aGlzLl9oZWFkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0hFQURFUl9DT0xVTU4sIHZhbHVlIHx8IHt9KVxuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyB0byBiZSB1c2VkIGFzIHRoZSBiYXNlIGRlZmF1bHQgZGVmaW5pdGlvbnMgZm9yIHRoZSBuZXcgdHJhbnNwb3NlZCBjb2x1bW5zLlxuICAgKiBUaGlzIGlzIGFuIG9wdGlvbmFsIHZhbHVlLCB3aGVuIG5vdCBzZXQgbm8gZGVmYXVsdCdzIGFyZSBhcHBsaWVkLlxuICAgKi9cbiAgQElucHV0KCd0cmFuc3Bvc2VEZWZhdWx0Q29sJykgZGVmYXVsdENvbDogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB3aWxsIHRyeSB0byB1c2UgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIG9mIHRoZSBjZWxsLCBpLmUuIHRoZSB0ZW1wbGF0ZSB0aGF0IHdvdWxkIGhhdmUgYmVlbiB1c2VkXG4gICAqIGlmIHdlIGRpZCBub3QgdHJhbnNwb3NlIGF0IGFsbC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBtYXRjaFRlbXBsYXRlczogYm9vbGVhbjtcblxuICBwcml2YXRlIGVuYWJsZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hlYWRlcjogUGJsQ29sdW1uRGVmaW5pdGlvbiA9IERFRkFVTFRfSEVBREVSX0NPTFVNTjtcbiAgcHJpdmF0ZSB0YWJsZVN0YXRlOiBUcmFuc3Bvc2VUYWJsZVNlc3Npb247XG4gIHByaXZhdGUgY29sdW1uczogUGJsQ29sdW1uW107XG4gIHByaXZhdGUgc2VsZkNvbHVtbjogUGJsQ29sdW1uO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcbiAgICBjb25zdCB0cmFuc3Bvc2VQbHVnaW4gPSBjb25maWcuZ2V0KCd0cmFuc3Bvc2VQbHVnaW4nKTtcbiAgICBpZiAodHJhbnNwb3NlUGx1Z2luKSB7XG4gICAgICB0aGlzLmhlYWRlciA9IHRyYW5zcG9zZVBsdWdpbi5oZWFkZXI7XG4gICAgICB0aGlzLmRlZmF1bHRDb2wgPSB0cmFuc3Bvc2VQbHVnaW4uZGVmYXVsdENvbCB8fCB7fTtcbiAgICAgIHRoaXMubWF0Y2hUZW1wbGF0ZXMgPSB0cmFuc3Bvc2VQbHVnaW4ubWF0Y2hUZW1wbGF0ZXMgfHwgZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICAgIHRoaXMuZGlzYWJsZShmYWxzZSk7XG4gIH1cblxuICBkaXNhYmxlKHVwZGF0ZVRhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFibGVTdGF0ZSkge1xuICAgICAgY29uc3QgeyB0YWJsZVN0YXRlIH0gPSB0aGlzO1xuICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5zZWxmQ29sdW1uID0gdGhpcy50YWJsZVN0YXRlID0gdGhpcy5jb2x1bW5zID0gdGhpcy5zZWxmQ29sdW1uID0gdW5kZWZpbmVkO1xuICAgICAgdGFibGVTdGF0ZS5kZXN0cm95KHVwZGF0ZVRhYmxlKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGUocmVmcmVzaERhdGFTb3VyY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhYmxlU3RhdGUpIHtcbiAgICAgIHRoaXMuZGlzYWJsZShmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlRmFjdG9yeVdyYXBwZXIgPSAocmVzdWx0czogYW55W10pID0+IHtcbiAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQgPSB0aGlzLnRhYmxlLmNvbHVtbnMgPSBjb2x1bW5GYWN0b3J5KClcbiAgICAgICAgICAuZGVmYXVsdCh0aGlzLmRlZmF1bHRDb2wgfHwge30pXG4gICAgICAgICAgLnRhYmxlKFxuICAgICAgICAgICAgdGhpcy5zZWxmQ29sdW1uLFxuICAgICAgICAgICAgLi4ucmVzdWx0cy5tYXAoY3JlYXRlVHJhbnNmb3JtZWRDb2x1bW4pLFxuICAgICAgICAgIClcbiAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICBjb25zdCBwcmV2ID0gdGhpcy50YWJsZVN0YXRlLmNvbHVtbnNJbnB1dDtcbiAgICAgICAgbG9jYWwuaGVhZGVyID0gcHJldi5oZWFkZXI7XG4gICAgICAgIGxvY2FsLmhlYWRlckdyb3VwID0gcHJldi5oZWFkZXJHcm91cDtcbiAgICAgICAgbG9jYWwuZm9vdGVyID0gcHJldi5mb290ZXI7XG4gICAgICAgIGxvY2FsW0xPQ0FMX0NPTFVNTl9ERUZdID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnRhYmxlLmludmFsaWRhdGVDb2x1bW5zKCk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hUZW1wbGF0ZXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodGhpcy5tYXRjaFRlbXBsYXRlcyk7XG4gICAgICAgIGNvbnN0IHsgcHJvcCB9ID0gdGhpcy5faGVhZGVyO1xuICAgICAgICBjb25zdCBjb2x1bW5LZXlzVG9Qcm94eTogQXJyYXk8a2V5b2YgUGJsQ29sdW1uPiA9IFsndHlwZSddO1xuXG4gICAgICAgIGlmIChtYXRjaFRlbXBsYXRlcykge1xuICAgICAgICAgIGNvbHVtbktleXNUb1Byb3h5LnB1c2goJ2NlbGxUcGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFRoZSBmb2xsb3dpbmcgbG9naWMgaXMgbm90IGZvciB0aGUgZmFpbnQgb2YgaGVhcnQuXG4gICAgICAgICAgIEJhc2ljYWxseSwgdGhlIHRyYW5zcG9zZSBwbHVnaW4gZG9lcyBub3Qgc3dhcCB0aGUgYWN0dWFsIGRhdGEgYnV0IHRoZSBjb2x1bW5zLlxuICAgICAgICAgICBXaGVuIHRyYW5zcG9zaW5nLCBhbGwgcm93cyB3aWxsIHN3YXAgdG8gY29sdW1ucyBzbywgQSBuZXcgY29sdW1uIGRlZmluaXRpb24gaXMgY3JlYXRlZCxcbiAgICAgICAgICAgd2l0aCBjb2x1bW5zIGVxdWFsIHRvIHRoZSB0b3RhbCBudW1iZXIgb3IgaXRlbXMgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAgICAgICAgIEVhY2ggY29sdW1uIChuZXcgb25lKSByZXByZXNlbnRzIGEgcm93IHNvIHdlIHNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIGFjdHVhbCByb3cgaW4gdGhlIG5ldyBjb2x1bW4uXG5cbiAgICAgICAgICAgVGhlIG5leHQgc3RlcCBpcyB0byBjcmVhdGUgYSBuZXcgZGF0YXNvdXJjZSwgdGhlIG5ldyBkYXRhc291cmNlIGlzIHNpbXBseSBhIGNvbGxlY3Rpb24gb2YgYWxsIG9mIHRoZSBvcmlnaW5hbCBjb2x1bW5zLlxuXG4gICAgICAgICAgIE5vdyB3aGVuIGBnZXRWYWx1ZWAgaXMgY2FsbGVkIG9uIHRoZSBuZXcgY29sdW1uIGl0IGlzIGNhbGxlZCB3aXRoIGEgXCJyb3dcIiB3aGljaCBpcyB0aGUgb3JpZ2luYWwgY29sdW1uLlxuICAgICAgICAgICBCZWNhdXNlIHRoZSBuZXcgY29sdW1uIGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIChvcmlnaW5hbCkgcm93IHdlIGNhbiBjYWxsIHRoZSBgZ2V0VmFsdWVgIG9uIHRoZSBvbGQgY29sdW1uIHdpdGggdGhlIGFjdHVhbCByb3cuXG5cbiAgICAgICAgICAgSW4gdGhpcyBwcm9jZXNzLCBhbGwgb2YgdGhlIGNvbHVtbiBtZXRhZGF0YSByZWxhdGVkIHRvIHRoZSBwcmVzZW50YXRpb24gbGF5ZXIgaXMgbG9zdC4gRm9yIGV4YW1wbGUsIGlmIENTUyBjbGFzc2VzIHdpbGxcbiAgICAgICAgICAgbm90IGJlIHRoZSBzYW1lLCB0ZW1wbGF0ZXMsIHR5cGVzIGV0Yy4uLiBUaGlzIGlzIGJlY2F1c2Ugd2hlbiB0aGUgZ3JpZCByZW5kZXJzIGEgY2VsbCB0aGF0IGNlbGwgaGFzIGEgc2luZ2xlIHRlbXBsYXRlIGFjcm9zc1xuICAgICAgICAgICBhbGwgcm93cyBidXQgbm93IHdlIG5lZWQgYSBkaWZmZXJlbnQgdGVtcGxhdGUgZm9yIGV2ZXJ5IHJvdy5cblxuICAgICAgICAgICBXZSBjYW4gcHJveHkgYSAoVkVSWSkgbGltaXRlZCBzZXQgb2YgbWV0YWRhdGEgcHJvcGVydGllcyByZWxhdGVkIHRvIHRoZSBwcmVzZW50YXRpb24gbGF5ZXIsIHZhbGlkIG9ubHkgb24gcmVuZGVyIHRpbWUuXG4gICAgICAgICAgIFRoaXMgcmVsYXlzIG9uIHRoZSBmYWN0IHRoYXQgZWFjaCByb3cgaXMgcmVuZGVyZWQgY29tcGxldGUsIHN0YXJ0aW5nIGZyb20gdGhlIGZpcnN0IGNlbGwgdG8gdGhlIGxhc3Qgc29cbiAgICAgICAgICAgd2l0aCB0aGF0IHdlIGNhbiBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIGNvbHVtbiB0aGEgdGhhdCBub3cgcmVwcmVzZW50cyB0aGUgd2hvbGUgcm93LlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW46IFBibENvbHVtbjtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMudGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zKSB7XG4gICAgICAgICAgaWYgKGMub3JnUHJvcCA9PT0gcHJvcCkge1xuICAgICAgICAgICAgYy5nZXRWYWx1ZSA9IChyb3c6IFBibENvbHVtbikgPT4ge1xuICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uID0gcm93O1xuICAgICAgICAgICAgICByZXR1cm4gcm93LmxhYmVsIGFzIGFueTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMuZ2V0VmFsdWUgPSBnZXRDZWxsVmFsdWVUcmFuc2Zvcm1lZDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbHVtbktleXNUb1Byb3h5KSB7XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjLCBrZXksIHsgY29uZmlndXJhYmxlOiB0cnVlLCBnZXQ6ICgpID0+IGN1cnJlbnRDb2x1bW4gJiYgY3VycmVudENvbHVtbltrZXldLCBzZXQ6IHZhbHVlID0+IHt9IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5zO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcblxuICAgIHRoaXMudGFibGVTdGF0ZSA9IG5ldyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24oXG4gICAgICB0aGlzLnRhYmxlLFxuICAgICAgdGhpcy5wbHVnaW5DdHJsLFxuICAgICAgKCkgPT4gdGhpcy51cGRhdGVDb2x1bW5zKHRoaXMudGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zKSxcbiAgICAgIHNvdXJjZUZhY3RvcnlXcmFwcGVyLFxuICAgICk7XG5cbiAgICBpZiAocmVmcmVzaERhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgICAgdGhpcy50YWJsZS5kcy5yZWZyZXNoKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnRhYmxlLmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMudGFibGUuZHMucmVmcmVzaChWSVJUVUFMX1JFRlJFU0gpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29sdW1ucyhjb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IHsgcHJvcCB9ID0gdGhpcy5faGVhZGVyO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XG4gICAgICBpZiAoYy5vcmdQcm9wID09PSBwcm9wKSB7XG4gICAgICAgIHRoaXMuc2VsZkNvbHVtbiA9IGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNlbGZDb2x1bW4pIHtcbiAgICAgIC8vIFRPRE86IGRvbid0IGFzc3VtZSBjb2x1bW5zWzBdXG4gICAgICB0aGlzLnNlbGZDb2x1bW4gPSBuZXcgUGJsQ29sdW1uKHRoaXMuX2hlYWRlciwgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZS5ncm91cFN0b3JlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==