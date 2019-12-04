/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { columnFactory, PblNgridConfigService, PblColumnDefinition, PblNgridColumnDefinitionSet, PblNgridComponent, PblNgridPluginController, PblColumn, NgridPlugin, } from '@pebula/ngrid';
import { TransposeTableSession, LOCAL_COLUMN_DEF, VIRTUAL_REFRESH } from './transpose-table-session';
import { getCellValueTransformed, createTransformedColumn } from './utils';
/** @type {?} */
const DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
/** @type {?} */
const PLUGIN_KEY = 'transpose';
/**
 * Transpose plugin.
 *
 * This plugin will swaps around the rows and columns of the grid.
 *
 * A **regular grid** (not transposed) represents rows horizontally:
 *
 * - Each horizontal row represents an item in the collection.
 * - Each vertical column represents the same property of all rows in the collection.
 *
 * A **transposed** grid represents row vertically:
 *
 * - Each horizontal row represents the same property of all rows in the collection.
 * - Each vertical row represents an item in the collection.
 *
 * > Note that transposing a grid might not play nice with other plugins and/or features.
 * For example, using pagination with transpose make no sense.
 */
let PblNgridTransposePluginDirective = /**
 * Transpose plugin.
 *
 * This plugin will swaps around the rows and columns of the grid.
 *
 * A **regular grid** (not transposed) represents rows horizontally:
 *
 * - Each horizontal row represents an item in the collection.
 * - Each vertical column represents the same property of all rows in the collection.
 *
 * A **transposed** grid represents row vertically:
 *
 * - Each horizontal row represents the same property of all rows in the collection.
 * - Each vertical row represents an item in the collection.
 *
 * > Note that transposing a grid might not play nice with other plugins and/or features.
 * For example, using pagination with transpose make no sense.
 */
class PblNgridTransposePluginDirective {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     * @param {?} config
     */
    constructor(grid, pluginCtrl, config) {
        this.grid = grid;
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
     * > The header column behave like any other column and you can also provide define it in the `column` property on the grid.
     * When using this approach the column defined on the grid is used as is (no merging). Just make sure you use the right `prop` value for it.
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
        this._removePlugin(this.grid);
        this.disable(false);
    }
    /**
     * @param {?} updateTable
     * @return {?}
     */
    disable(updateTable) {
        if (this.gridState) {
            const { gridState: tableState } = this;
            this.columns = this.selfColumn = this.gridState = this.columns = this.selfColumn = undefined;
            tableState.destroy(updateTable);
        }
    }
    /**
     * @param {?=} refreshDataSource
     * @return {?}
     */
    enable(refreshDataSource = false) {
        if (this.gridState) {
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
                const local = this.grid.columns = columnFactory()
                    .default(this.defaultCol || {})
                    .table(this.selfColumn, ...results.map(createTransformedColumn))
                    .build();
                /** @type {?} */
                const prev = this.gridState.columnsInput;
                local.header = prev.header;
                local.headerGroup = prev.headerGroup;
                local.footer = prev.footer;
                local[LOCAL_COLUMN_DEF] = true;
                this.grid.invalidateColumns();
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
                for (const c of this.grid.columnApi.visibleColumns) {
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
        this.gridState = new TransposeTableSession(this.grid, this.pluginCtrl, (/**
         * @return {?}
         */
        () => this.updateColumns(this.grid.columnApi.visibleColumns)), sourceFactoryWrapper);
        if (refreshDataSource) {
            this.pluginCtrl.extApi.contextApi.clear();
            this.grid.ds.refresh();
        }
        else if (this.grid.ds.length > 0) {
            this.grid.ds.refresh(VIRTUAL_REFRESH);
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
 * This plugin will swaps around the rows and columns of the grid.
 *
 * A **regular grid** (not transposed) represents rows horizontally:
 *
 * - Each horizontal row represents an item in the collection.
 * - Each vertical column represents the same property of all rows in the collection.
 *
 * A **transposed** grid represents row vertically:
 *
 * - Each horizontal row represents the same property of all rows in the collection.
 * - Each vertical row represents an item in the collection.
 *
 * > Note that transposing a grid might not play nice with other plugins and/or features.
 * For example, using pagination with transpose make no sense.
 */
PblNgridTransposePluginDirective = tslib_1.__decorate([
    NgridPlugin({ id: PLUGIN_KEY }),
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
    PblNgridTransposePluginDirective.prototype.gridState;
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
    PblNgridTransposePluginDirective.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    PblNgridTransposePluginDirective.prototype.pluginCtrl;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUNMLGFBQWEsRUFDYixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7TUFFckUscUJBQXFCLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSx3REFBd0QsRUFBRTs7TUFpQmhILFVBQVUsR0FBZ0IsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdCOUIsZ0NBQWdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFBaEMsZ0NBQWdDOzs7Ozs7SUE2RDNDLFlBQW9CLElBQTRCLEVBQVUsVUFBb0MsRUFBRSxNQUE2QjtRQUF6RyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBTnRGLFlBQU8sR0FBd0IscUJBQXFCLENBQUM7UUFPM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENB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V0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlGO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBMUgyQixpQkFBaUI7WUFBMkIsd0JBQXdCO1lBQVUscUJBQXFCOzs7WUEvRDlILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztZQWhEN0MsaUJBQWlCO1lBQ2pCLHdCQUF3QjtZQUp4QixxQkFBcUI7Ozt3QkF1RHBCLEtBQUs7cUJBa0NMLEtBQUssU0FBQyxvQkFBb0I7eUJBUTFCLEtBQUssU0FBQyxxQkFBcUI7NkJBUTNCLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcERLLGdDQUFnQztJQUg1QyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFFL0IsSUFBSSxFQUFFOzZDQThEcUIsaUJBQWlCLEVBQTJCLHdCQUF3QixFQUFVLHFCQUFxQjtHQTdEbEgsZ0NBQWdDLENBdUw1QztTQXZMWSxnQ0FBZ0M7Ozs7Ozs7SUE0QzNDLHNEQUF1RTs7Ozs7Ozs7SUFRdkUsMERBQWlDOzs7OztJQUVqQyxtREFBeUI7Ozs7O0lBQ3pCLG1EQUE2RDs7Ozs7SUFDN0QscURBQXlDOzs7OztJQUN6QyxtREFBNkI7Ozs7O0lBQzdCLHNEQUE4Qjs7Ozs7SUFDOUIseURBQThEOzs7OztJQUVsRCxnREFBb0M7Ozs7O0lBQUUsc0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQge1xuICBjb2x1bW5GYWN0b3J5LFxuICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gIFBibENvbHVtbkRlZmluaXRpb24sXG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgUGJsQ29sdW1uLFxuICBOZ3JpZFBsdWdpbixcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbiwgTE9DQUxfQ09MVU1OX0RFRiwgVklSVFVBTF9SRUZSRVNIIH0gZnJvbSAnLi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbic7XG5pbXBvcnQgeyBnZXRDZWxsVmFsdWVUcmFuc2Zvcm1lZCwgY3JlYXRlVHJhbnNmb3JtZWRDb2x1bW4gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9IRUFERVJfQ09MVU1OID0geyBwcm9wOiAnX190cmFuc3Bvc2VfXycsIGNzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCBwYmwtbmdyaWQtdHJhbnNwb3NlZC1oZWFkZXItY2VsbCcgfTtcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdHJhbnNwb3NlUGx1Z2luPzoge1xuICAgICAgaGVhZGVyPzogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcbiAgICAgIGRlZmF1bHRDb2w/OiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+O1xuICAgICAgbWF0Y2hUZW1wbGF0ZXM/OiBib29sZWFuO1xuICAgIH1cbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgdHJhbnNwb3NlPzogUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cbmNvbnN0IFBMVUdJTl9LRVk6ICd0cmFuc3Bvc2UnID0gJ3RyYW5zcG9zZSc7XG5cbi8qKlxuICogVHJhbnNwb3NlIHBsdWdpbi5cbiAqXG4gKiBUaGlzIHBsdWdpbiB3aWxsIHN3YXBzIGFyb3VuZCB0aGUgcm93cyBhbmQgY29sdW1ucyBvZiB0aGUgZ3JpZC5cbiAqXG4gKiBBICoqcmVndWxhciBncmlkKiogKG5vdCB0cmFuc3Bvc2VkKSByZXByZXNlbnRzIHJvd3MgaG9yaXpvbnRhbGx5OlxuICpcbiAqIC0gRWFjaCBob3Jpem9udGFsIHJvdyByZXByZXNlbnRzIGFuIGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXG4gKiAtIEVhY2ggdmVydGljYWwgY29sdW1uIHJlcHJlc2VudHMgdGhlIHNhbWUgcHJvcGVydHkgb2YgYWxsIHJvd3MgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQSAqKnRyYW5zcG9zZWQqKiBncmlkIHJlcHJlc2VudHMgcm93IHZlcnRpY2FsbHk6XG4gKlxuICogLSBFYWNoIGhvcml6b250YWwgcm93IHJlcHJlc2VudHMgdGhlIHNhbWUgcHJvcGVydHkgb2YgYWxsIHJvd3MgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKiAtIEVhY2ggdmVydGljYWwgcm93IHJlcHJlc2VudHMgYW4gaXRlbSBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiA+IE5vdGUgdGhhdCB0cmFuc3Bvc2luZyBhIGdyaWQgbWlnaHQgbm90IHBsYXkgbmljZSB3aXRoIG90aGVyIHBsdWdpbnMgYW5kL29yIGZlYXR1cmVzLlxuICogRm9yIGV4YW1wbGUsIHVzaW5nIHBhZ2luYXRpb24gd2l0aCB0cmFuc3Bvc2UgbWFrZSBubyBzZW5zZS5cbiAqL1xuXG5ATmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW3RyYW5zcG9zZV0nIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGdldCB0cmFuc3Bvc2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmVuYWJsZWQ7IH07XG4gIHNldCB0cmFuc3Bvc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IGlzRmlyc3QgPSB0aGlzLmVuYWJsZWQgPT09IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHZhbHVlO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB0aGlzLmRpc2FibGUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVuYWJsZSghaXNGaXJzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhlIG5ldyBoZWFkZXIgY29sdW1uLCB0aGlzIGlzIHRoZSBjb2x1bW4gdGhlIGZpcnN0IGNvbHVtbiB0aGF0XG4gICAqIHdpbGwgZGlzcGxheSBhbGwgdGhlIGhlYWRlcnMuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gb3B0aW9uYWwgdmFsdWUsIHdoZW4gbm90IHNldCBhIGRlZmF1bHQgY29sdW1uIHNldHRpbmdzIGlzIHVzZWQ6XG4gICAqXG4gICAqIGBgYGpzXG4gICAqIHtcbiAgICogIHByb3A6ICdfX3RyYW5zcG9zZV9fJyxcbiAgICogIGNzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCBwYmwtbmdyaWQtdHJhbnNwb3NlZC1oZWFkZXItY2VsbCcsXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFdoZW4gc2V0LCB0aGUgbmV3IGNvbHVtbiB2YWx1ZXMgd2lsbCBtZXJnZSBpbnRvIHRoZSBkZWZhdWx0IGRlZmluaXRpb25zLCBvdmVycmlkaW5nIGV4aXN0aW5nIHByb3BlcnRpZXNcbiAgICogc2V0IG9uIHRoZSBkZWZhdWx0IGNvbHVtbiBzZXR0aW5ncy5cbiAgICpcbiAgICogPiBUaGUgaGVhZGVyIGNvbHVtbiBiZWhhdmUgbGlrZSBhbnkgb3RoZXIgY29sdW1uIGFuZCB5b3UgY2FuIGFsc28gcHJvdmlkZSBkZWZpbmUgaXQgaW4gdGhlIGBjb2x1bW5gIHByb3BlcnR5IG9uIHRoZSBncmlkLlxuICAgKiBXaGVuIHVzaW5nIHRoaXMgYXBwcm9hY2ggdGhlIGNvbHVtbiBkZWZpbmVkIG9uIHRoZSBncmlkIGlzIHVzZWQgYXMgaXMgKG5vIG1lcmdpbmcpLiBKdXN0IG1ha2Ugc3VyZSB5b3UgdXNlIHRoZSByaWdodCBgcHJvcGAgdmFsdWUgZm9yIGl0LlxuICAgKiBlLmcuIGlmIGBoZWFkZXJgIGlzIG5vdCBzZXQgaGVyZSBpdHMgYF9fdHJhbnNwb3NlX19gIG90aGVyd2lzZSwgdGhlIGFjdHVhbCBgcHJvcGAgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoJ3RyYW5zcG9zZUhlYWRlckNvbCcpIHNldCBoZWFkZXIodmFsdWU6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4pIHtcbiAgICB0aGlzLl9oZWFkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0hFQURFUl9DT0xVTU4sIHZhbHVlIHx8IHt9KVxuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyB0byBiZSB1c2VkIGFzIHRoZSBiYXNlIGRlZmF1bHQgZGVmaW5pdGlvbnMgZm9yIHRoZSBuZXcgdHJhbnNwb3NlZCBjb2x1bW5zLlxuICAgKiBUaGlzIGlzIGFuIG9wdGlvbmFsIHZhbHVlLCB3aGVuIG5vdCBzZXQgbm8gZGVmYXVsdCdzIGFyZSBhcHBsaWVkLlxuICAgKi9cbiAgQElucHV0KCd0cmFuc3Bvc2VEZWZhdWx0Q29sJykgZGVmYXVsdENvbDogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB3aWxsIHRyeSB0byB1c2UgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIG9mIHRoZSBjZWxsLCBpLmUuIHRoZSB0ZW1wbGF0ZSB0aGF0IHdvdWxkIGhhdmUgYmVlbiB1c2VkXG4gICAqIGlmIHdlIGRpZCBub3QgdHJhbnNwb3NlIGF0IGFsbC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBtYXRjaFRlbXBsYXRlczogYm9vbGVhbjtcblxuICBwcml2YXRlIGVuYWJsZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hlYWRlcjogUGJsQ29sdW1uRGVmaW5pdGlvbiA9IERFRkFVTFRfSEVBREVSX0NPTFVNTjtcbiAgcHJpdmF0ZSBncmlkU3RhdGU6IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbjtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgcHJpdmF0ZSBzZWxmQ29sdW1uOiBQYmxDb2x1bW47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcbiAgICBjb25zdCB0cmFuc3Bvc2VQbHVnaW4gPSBjb25maWcuZ2V0KCd0cmFuc3Bvc2VQbHVnaW4nKTtcbiAgICBpZiAodHJhbnNwb3NlUGx1Z2luKSB7XG4gICAgICB0aGlzLmhlYWRlciA9IHRyYW5zcG9zZVBsdWdpbi5oZWFkZXI7XG4gICAgICB0aGlzLmRlZmF1bHRDb2wgPSB0cmFuc3Bvc2VQbHVnaW4uZGVmYXVsdENvbCB8fCB7fTtcbiAgICAgIHRoaXMubWF0Y2hUZW1wbGF0ZXMgPSB0cmFuc3Bvc2VQbHVnaW4ubWF0Y2hUZW1wbGF0ZXMgfHwgZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gICAgdGhpcy5kaXNhYmxlKGZhbHNlKTtcbiAgfVxuXG4gIGRpc2FibGUodXBkYXRlVGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkU3RhdGUpIHtcbiAgICAgIGNvbnN0IHsgZ3JpZFN0YXRlOiB0YWJsZVN0YXRlIH0gPSB0aGlzO1xuICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5zZWxmQ29sdW1uID0gdGhpcy5ncmlkU3RhdGUgPSB0aGlzLmNvbHVtbnMgPSB0aGlzLnNlbGZDb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgICB0YWJsZVN0YXRlLmRlc3Ryb3kodXBkYXRlVGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZShyZWZyZXNoRGF0YVNvdXJjZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZFN0YXRlKSB7XG4gICAgICB0aGlzLmRpc2FibGUoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZUZhY3RvcnlXcmFwcGVyID0gKHJlc3VsdHM6IGFueVtdKSA9PiB7XG4gICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICBjb25zdCBsb2NhbDogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0ID0gdGhpcy5ncmlkLmNvbHVtbnMgPSBjb2x1bW5GYWN0b3J5KClcbiAgICAgICAgICAuZGVmYXVsdCh0aGlzLmRlZmF1bHRDb2wgfHwge30pXG4gICAgICAgICAgLnRhYmxlKFxuICAgICAgICAgICAgdGhpcy5zZWxmQ29sdW1uLFxuICAgICAgICAgICAgLi4ucmVzdWx0cy5tYXAoY3JlYXRlVHJhbnNmb3JtZWRDb2x1bW4pLFxuICAgICAgICAgIClcbiAgICAgICAgICAuYnVpbGQoKTtcblxuICAgICAgICBjb25zdCBwcmV2ID0gdGhpcy5ncmlkU3RhdGUuY29sdW1uc0lucHV0O1xuICAgICAgICBsb2NhbC5oZWFkZXIgPSBwcmV2LmhlYWRlcjtcbiAgICAgICAgbG9jYWwuaGVhZGVyR3JvdXAgPSBwcmV2LmhlYWRlckdyb3VwO1xuICAgICAgICBsb2NhbC5mb290ZXIgPSBwcmV2LmZvb3RlcjtcbiAgICAgICAgbG9jYWxbTE9DQUxfQ09MVU1OX0RFRl0gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZ3JpZC5pbnZhbGlkYXRlQ29sdW1ucygpO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoVGVtcGxhdGVzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHRoaXMubWF0Y2hUZW1wbGF0ZXMpO1xuICAgICAgICBjb25zdCB7IHByb3AgfSA9IHRoaXMuX2hlYWRlcjtcbiAgICAgICAgY29uc3QgY29sdW1uS2V5c1RvUHJveHk6IEFycmF5PGtleW9mIFBibENvbHVtbj4gPSBbJ3R5cGUnXTtcblxuICAgICAgICBpZiAobWF0Y2hUZW1wbGF0ZXMpIHtcbiAgICAgICAgICBjb2x1bW5LZXlzVG9Qcm94eS5wdXNoKCdjZWxsVHBsJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBUaGUgZm9sbG93aW5nIGxvZ2ljIGlzIG5vdCBmb3IgdGhlIGZhaW50IG9mIGhlYXJ0LlxuICAgICAgICAgICBCYXNpY2FsbHksIHRoZSB0cmFuc3Bvc2UgcGx1Z2luIGRvZXMgbm90IHN3YXAgdGhlIGFjdHVhbCBkYXRhIGJ1dCB0aGUgY29sdW1ucy5cbiAgICAgICAgICAgV2hlbiB0cmFuc3Bvc2luZywgYWxsIHJvd3Mgd2lsbCBzd2FwIHRvIGNvbHVtbnMgc28sIEEgbmV3IGNvbHVtbiBkZWZpbml0aW9uIGlzIGNyZWF0ZWQsXG4gICAgICAgICAgIHdpdGggY29sdW1ucyBlcXVhbCB0byB0aGUgdG90YWwgbnVtYmVyIG9yIGl0ZW1zIGluIHRoZSBkYXRhc291cmNlLlxuICAgICAgICAgICBFYWNoIGNvbHVtbiAobmV3IG9uZSkgcmVwcmVzZW50cyBhIHJvdyBzbyB3ZSBzYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBhY3R1YWwgcm93IGluIHRoZSBuZXcgY29sdW1uLlxuXG4gICAgICAgICAgIFRoZSBuZXh0IHN0ZXAgaXMgdG8gY3JlYXRlIGEgbmV3IGRhdGFzb3VyY2UsIHRoZSBuZXcgZGF0YXNvdXJjZSBpcyBzaW1wbHkgYSBjb2xsZWN0aW9uIG9mIGFsbCBvZiB0aGUgb3JpZ2luYWwgY29sdW1ucy5cblxuICAgICAgICAgICBOb3cgd2hlbiBgZ2V0VmFsdWVgIGlzIGNhbGxlZCBvbiB0aGUgbmV3IGNvbHVtbiBpdCBpcyBjYWxsZWQgd2l0aCBhIFwicm93XCIgd2hpY2ggaXMgdGhlIG9yaWdpbmFsIGNvbHVtbi5cbiAgICAgICAgICAgQmVjYXVzZSB0aGUgbmV3IGNvbHVtbiBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGFjdHVhbCAob3JpZ2luYWwpIHJvdyB3ZSBjYW4gY2FsbCB0aGUgYGdldFZhbHVlYCBvbiB0aGUgb2xkIGNvbHVtbiB3aXRoIHRoZSBhY3R1YWwgcm93LlxuXG4gICAgICAgICAgIEluIHRoaXMgcHJvY2VzcywgYWxsIG9mIHRoZSBjb2x1bW4gbWV0YWRhdGEgcmVsYXRlZCB0byB0aGUgcHJlc2VudGF0aW9uIGxheWVyIGlzIGxvc3QuIEZvciBleGFtcGxlLCBpZiBDU1MgY2xhc3NlcyB3aWxsXG4gICAgICAgICAgIG5vdCBiZSB0aGUgc2FtZSwgdGVtcGxhdGVzLCB0eXBlcyBldGMuLi4gVGhpcyBpcyBiZWNhdXNlIHdoZW4gdGhlIGdyaWQgcmVuZGVycyBhIGNlbGwgdGhhdCBjZWxsIGhhcyBhIHNpbmdsZSB0ZW1wbGF0ZSBhY3Jvc3NcbiAgICAgICAgICAgYWxsIHJvd3MgYnV0IG5vdyB3ZSBuZWVkIGEgZGlmZmVyZW50IHRlbXBsYXRlIGZvciBldmVyeSByb3cuXG5cbiAgICAgICAgICAgV2UgY2FuIHByb3h5IGEgKFZFUlkpIGxpbWl0ZWQgc2V0IG9mIG1ldGFkYXRhIHByb3BlcnRpZXMgcmVsYXRlZCB0byB0aGUgcHJlc2VudGF0aW9uIGxheWVyLCB2YWxpZCBvbmx5IG9uIHJlbmRlciB0aW1lLlxuICAgICAgICAgICBUaGlzIHJlbGF5cyBvbiB0aGUgZmFjdCB0aGF0IGVhY2ggcm93IGlzIHJlbmRlcmVkIGNvbXBsZXRlLCBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBjZWxsIHRvIHRoZSBsYXN0IHNvXG4gICAgICAgICAgIHdpdGggdGhhdCB3ZSBjYW4gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBjb2x1bW4gdGhhIHRoYXQgbm93IHJlcHJlc2VudHMgdGhlIHdob2xlIHJvdy5cbiAgICAgICAgICovXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uOiBQYmxDb2x1bW47XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zKSB7XG4gICAgICAgICAgaWYgKGMub3JnUHJvcCA9PT0gcHJvcCkge1xuICAgICAgICAgICAgYy5nZXRWYWx1ZSA9IChyb3c6IFBibENvbHVtbikgPT4ge1xuICAgICAgICAgICAgICBjdXJyZW50Q29sdW1uID0gcm93O1xuICAgICAgICAgICAgICByZXR1cm4gcm93LmxhYmVsIGFzIGFueTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGMuZ2V0VmFsdWUgPSBnZXRDZWxsVmFsdWVUcmFuc2Zvcm1lZDtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGNvbHVtbktleXNUb1Byb3h5KSB7XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjLCBrZXksIHsgY29uZmlndXJhYmxlOiB0cnVlLCBnZXQ6ICgpID0+IGN1cnJlbnRDb2x1bW4gJiYgY3VycmVudENvbHVtbltrZXldLCBzZXQ6IHZhbHVlID0+IHt9IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb2x1bW5zO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcblxuICAgIHRoaXMuZ3JpZFN0YXRlID0gbmV3IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbihcbiAgICAgIHRoaXMuZ3JpZCxcbiAgICAgIHRoaXMucGx1Z2luQ3RybCxcbiAgICAgICgpID0+IHRoaXMudXBkYXRlQ29sdW1ucyh0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zKSxcbiAgICAgIHNvdXJjZUZhY3RvcnlXcmFwcGVyLFxuICAgICk7XG5cbiAgICBpZiAocmVmcmVzaERhdGFTb3VyY2UpIHtcbiAgICAgIHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgICAgdGhpcy5ncmlkLmRzLnJlZnJlc2goKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZC5kcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmdyaWQuZHMucmVmcmVzaChWSVJUVUFMX1JFRlJFU0gpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29sdW1ucyhjb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IHsgcHJvcCB9ID0gdGhpcy5faGVhZGVyO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XG4gICAgICBpZiAoYy5vcmdQcm9wID09PSBwcm9wKSB7XG4gICAgICAgIHRoaXMuc2VsZkNvbHVtbiA9IGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNlbGZDb2x1bW4pIHtcbiAgICAgIC8vIFRPRE86IGRvbid0IGFzc3VtZSBjb2x1bW5zWzBdXG4gICAgICB0aGlzLnNlbGZDb2x1bW4gPSBuZXcgUGJsQ29sdW1uKHRoaXMuX2hlYWRlciwgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZS5ncm91cFN0b3JlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==