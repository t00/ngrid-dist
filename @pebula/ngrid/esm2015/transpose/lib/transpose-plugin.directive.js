/**
 * @fileoverview added by tsickle
 * Generated from: lib/transpose-plugin.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { filter, take } from 'rxjs/operators';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { columnFactory, PblNgridConfigService, PblNgridComponent, PblNgridPluginController, PblColumn, utils, } from '@pebula/ngrid';
import { TransposeTableSession, LOCAL_COLUMN_DEF, VIRTUAL_REFRESH } from './transpose-table-session';
import { getCellValueTransformed, createTransformedColumn } from './utils';
/** @type {?} */
const DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
/** @type {?} */
export const PLUGIN_KEY = 'transpose';
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
export class PblNgridTransposePluginDirective {
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
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInit')), take(1), utils.unrx(this, this.grid))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (this.enabled !== undefined) {
                this.updateState(undefined, this.enabled);
            }
        }));
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
        if (value !== this.enabled && this.grid.isInit) {
            this.updateState(this.enabled, value);
        }
        this.enabled = value;
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
        utils.unrx.kill(this);
    }
    /**
     * @param {?} updateTable
     * @return {?}
     */
    disable(updateTable) {
        if (this.gridState) {
            const { gridState } = this;
            this.columns = this.selfColumn = this.gridState = this.columns = this.selfColumn = undefined;
            gridState.destroy(updateTable);
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
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    updateState(prev, curr) {
        /** @type {?} */
        const isFirst = prev === undefined;
        if (!curr) {
            this.disable(true);
        }
        else {
            this.enable(!isFirst);
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUNMLGFBQWEsRUFDYixxQkFBcUIsRUFHckIsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsS0FBSyxHQUNOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxTQUFTLENBQUM7O01BRXJFLHFCQUFxQixHQUFHLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsd0RBQXdELEVBQUU7O0FBaUJ0SCxNQUFNLE9BQU8sVUFBVSxHQUFnQixXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JsRCxNQUFNLE9BQU8sZ0NBQWdDOzs7Ozs7SUF3RDNDLFlBQW9CLElBQTRCLEVBQVUsVUFBb0MsRUFBRSxNQUE2QjtRQUF6RyxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBTnRGLFlBQU8sR0FBd0IscUJBQXFCLENBQUM7UUFPM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Y0FDdEQsZUFBZSxHQUFH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ciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHtcbiAgY29sdW1uRmFjdG9yeSxcbiAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICBQYmxDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gIFBibENvbHVtbixcbiAgdXRpbHMsXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24sIExPQ0FMX0NPTFVNTl9ERUYsIFZJUlRVQUxfUkVGUkVTSCB9IGZyb20gJy4vdHJhbnNwb3NlLXRhYmxlLXNlc3Npb24nO1xuaW1wb3J0IHsgZ2V0Q2VsbFZhbHVlVHJhbnNmb3JtZWQsIGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IERFRkFVTFRfSEVBREVSX0NPTFVNTiA9IHsgcHJvcDogJ19fdHJhbnNwb3NlX18nLCBjc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwgcGJsLW5ncmlkLXRyYW5zcG9zZWQtaGVhZGVyLWNlbGwnIH07XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRyYW5zcG9zZVBsdWdpbj86IHtcbiAgICAgIGhlYWRlcj86IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj47XG4gICAgICBkZWZhdWx0Q29sPzogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcbiAgICAgIG1hdGNoVGVtcGxhdGVzPzogYm9vbGVhbjtcbiAgICB9XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHRyYW5zcG9zZT86IFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlO1xuICB9XG59XG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3RyYW5zcG9zZScgPSAndHJhbnNwb3NlJztcblxuLyoqXG4gKiBUcmFuc3Bvc2UgcGx1Z2luLlxuICpcbiAqIFRoaXMgcGx1Z2luIHdpbGwgc3dhcHMgYXJvdW5kIHRoZSByb3dzIGFuZCBjb2x1bW5zIG9mIHRoZSBncmlkLlxuICpcbiAqIEEgKipyZWd1bGFyIGdyaWQqKiAobm90IHRyYW5zcG9zZWQpIHJlcHJlc2VudHMgcm93cyBob3Jpem9udGFsbHk6XG4gKlxuICogLSBFYWNoIGhvcml6b250YWwgcm93IHJlcHJlc2VudHMgYW4gaXRlbSBpbiB0aGUgY29sbGVjdGlvbi5cbiAqIC0gRWFjaCB2ZXJ0aWNhbCBjb2x1bW4gcmVwcmVzZW50cyB0aGUgc2FtZSBwcm9wZXJ0eSBvZiBhbGwgcm93cyBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBBICoqdHJhbnNwb3NlZCoqIGdyaWQgcmVwcmVzZW50cyByb3cgdmVydGljYWxseTpcbiAqXG4gKiAtIEVhY2ggaG9yaXpvbnRhbCByb3cgcmVwcmVzZW50cyB0aGUgc2FtZSBwcm9wZXJ0eSBvZiBhbGwgcm93cyBpbiB0aGUgY29sbGVjdGlvbi5cbiAqIC0gRWFjaCB2ZXJ0aWNhbCByb3cgcmVwcmVzZW50cyBhbiBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqID4gTm90ZSB0aGF0IHRyYW5zcG9zaW5nIGEgZ3JpZCBtaWdodCBub3QgcGxheSBuaWNlIHdpdGggb3RoZXIgcGx1Z2lucyBhbmQvb3IgZmVhdHVyZXMuXG4gKiBGb3IgZXhhbXBsZSwgdXNpbmcgcGFnaW5hdGlvbiB3aXRoIHRyYW5zcG9zZSBtYWtlIG5vIHNlbnNlLlxuICovXG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFt0cmFuc3Bvc2VdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBnZXQgdHJhbnNwb3NlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5lbmFibGVkOyB9O1xuICBzZXQgdHJhbnNwb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5lbmFibGVkICYmIHRoaXMuZ3JpZC5pc0luaXQpIHtcbiAgICAgIHRoaXMudXBkYXRlU3RhdGUodGhpcy5lbmFibGVkLCB2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuZW5hYmxlZCA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhlIG5ldyBoZWFkZXIgY29sdW1uLCB0aGlzIGlzIHRoZSBjb2x1bW4gdGhlIGZpcnN0IGNvbHVtbiB0aGF0XG4gICAqIHdpbGwgZGlzcGxheSBhbGwgdGhlIGhlYWRlcnMuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gb3B0aW9uYWwgdmFsdWUsIHdoZW4gbm90IHNldCBhIGRlZmF1bHQgY29sdW1uIHNldHRpbmdzIGlzIHVzZWQ6XG4gICAqXG4gICAqIGBgYGpzXG4gICAqIHtcbiAgICogIHByb3A6ICdfX3RyYW5zcG9zZV9fJyxcbiAgICogIGNzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCBwYmwtbmdyaWQtdHJhbnNwb3NlZC1oZWFkZXItY2VsbCcsXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFdoZW4gc2V0LCB0aGUgbmV3IGNvbHVtbiB2YWx1ZXMgd2lsbCBtZXJnZSBpbnRvIHRoZSBkZWZhdWx0IGRlZmluaXRpb25zLCBvdmVycmlkaW5nIGV4aXN0aW5nIHByb3BlcnRpZXNcbiAgICogc2V0IG9uIHRoZSBkZWZhdWx0IGNvbHVtbiBzZXR0aW5ncy5cbiAgICpcbiAgICogPiBUaGUgaGVhZGVyIGNvbHVtbiBiZWhhdmUgbGlrZSBhbnkgb3RoZXIgY29sdW1uIGFuZCB5b3UgY2FuIGFsc28gcHJvdmlkZSBkZWZpbmUgaXQgaW4gdGhlIGBjb2x1bW5gIHByb3BlcnR5IG9uIHRoZSBncmlkLlxuICAgKiBXaGVuIHVzaW5nIHRoaXMgYXBwcm9hY2ggdGhlIGNvbHVtbiBkZWZpbmVkIG9uIHRoZSBncmlkIGlzIHVzZWQgYXMgaXMgKG5vIG1lcmdpbmcpLiBKdXN0IG1ha2Ugc3VyZSB5b3UgdXNlIHRoZSByaWdodCBgcHJvcGAgdmFsdWUgZm9yIGl0LlxuICAgKiBlLmcuIGlmIGBoZWFkZXJgIGlzIG5vdCBzZXQgaGVyZSBpdHMgYF9fdHJhbnNwb3NlX19gIG90aGVyd2lzZSwgdGhlIGFjdHVhbCBgcHJvcGAgdmFsdWUuXG4gICAqL1xuICBASW5wdXQoJ3RyYW5zcG9zZUhlYWRlckNvbCcpIHNldCBoZWFkZXIodmFsdWU6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj4pIHtcbiAgICB0aGlzLl9oZWFkZXIgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX0hFQURFUl9DT0xVTU4sIHZhbHVlIHx8IHt9KVxuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyB0byBiZSB1c2VkIGFzIHRoZSBiYXNlIGRlZmF1bHQgZGVmaW5pdGlvbnMgZm9yIHRoZSBuZXcgdHJhbnNwb3NlZCBjb2x1bW5zLlxuICAgKiBUaGlzIGlzIGFuIG9wdGlvbmFsIHZhbHVlLCB3aGVuIG5vdCBzZXQgbm8gZGVmYXVsdCdzIGFyZSBhcHBsaWVkLlxuICAgKi9cbiAgQElucHV0KCd0cmFuc3Bvc2VEZWZhdWx0Q29sJykgZGVmYXVsdENvbDogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCB3aWxsIHRyeSB0byB1c2UgdGhlIG9yaWdpbmFsIHRlbXBsYXRlIG9mIHRoZSBjZWxsLCBpLmUuIHRoZSB0ZW1wbGF0ZSB0aGF0IHdvdWxkIGhhdmUgYmVlbiB1c2VkXG4gICAqIGlmIHdlIGRpZCBub3QgdHJhbnNwb3NlIGF0IGFsbC5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqL1xuICBASW5wdXQoKSBtYXRjaFRlbXBsYXRlczogYm9vbGVhbjtcblxuICBwcml2YXRlIGVuYWJsZWQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2hlYWRlcjogUGJsQ29sdW1uRGVmaW5pdGlvbiA9IERFRkFVTFRfSEVBREVSX0NPTFVNTjtcbiAgcHJpdmF0ZSBncmlkU3RhdGU6IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbjtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgcHJpdmF0ZSBzZWxmQ29sdW1uOiBQYmxDb2x1bW47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcbiAgICBjb25zdCB0cmFuc3Bvc2VQbHVnaW4gPSBjb25maWcuZ2V0KCd0cmFuc3Bvc2VQbHVnaW4nKTtcbiAgICBpZiAodHJhbnNwb3NlUGx1Z2luKSB7XG4gICAgICB0aGlzLmhlYWRlciA9IHRyYW5zcG9zZVBsdWdpbi5oZWFkZXI7XG4gICAgICB0aGlzLmRlZmF1bHRDb2wgPSB0cmFuc3Bvc2VQbHVnaW4uZGVmYXVsdENvbCB8fCB7fTtcbiAgICAgIHRoaXMubWF0Y2hUZW1wbGF0ZXMgPSB0cmFuc3Bvc2VQbHVnaW4ubWF0Y2hUZW1wbGF0ZXMgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25Jbml0JyApLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICB1dGlscy51bnJ4KHRoaXMsIHRoaXMuZ3JpZClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBpZiAodGhpcy5lbmFibGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlKHVuZGVmaW5lZCwgdGhpcy5lbmFibGVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgICB0aGlzLmRpc2FibGUoZmFsc2UpO1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIGRpc2FibGUodXBkYXRlVGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkU3RhdGUpIHtcbiAgICAgIGNvbnN0IHsgZ3JpZFN0YXRlIH0gPSB0aGlzO1xuICAgICAgdGhpcy5jb2x1bW5zID0gdGhpcy5zZWxmQ29sdW1uID0gdGhpcy5ncmlkU3RhdGUgPSB0aGlzLmNvbHVtbnMgPSB0aGlzLnNlbGZDb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgICBncmlkU3RhdGUuZGVzdHJveSh1cGRhdGVUYWJsZSk7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlKHJlZnJlc2hEYXRhU291cmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkU3RhdGUpIHtcbiAgICAgIHRoaXMuZGlzYWJsZShmYWxzZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlRmFjdG9yeVdyYXBwZXIgPSAocmVzdWx0czogYW55W10pID0+IHtcbiAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsOiBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQgPSB0aGlzLmdyaWQuY29sdW1ucyA9IGNvbHVtbkZhY3RvcnkoKVxuICAgICAgICAgIC5kZWZhdWx0KHRoaXMuZGVmYXVsdENvbCB8fCB7fSlcbiAgICAgICAgICAudGFibGUoXG4gICAgICAgICAgICB0aGlzLnNlbGZDb2x1bW4sXG4gICAgICAgICAgICAuLi5yZXN1bHRzLm1hcChjcmVhdGVUcmFuc2Zvcm1lZENvbHVtbiksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLmdyaWRTdGF0ZS5jb2x1bW5zSW5wdXQ7XG4gICAgICAgIGxvY2FsLmhlYWRlciA9IHByZXYuaGVhZGVyO1xuICAgICAgICBsb2NhbC5oZWFkZXJHcm91cCA9IHByZXYuaGVhZGVyR3JvdXA7XG4gICAgICAgIGxvY2FsLmZvb3RlciA9IHByZXYuZm9vdGVyO1xuICAgICAgICBsb2NhbFtMT0NBTF9DT0xVTU5fREVGXSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5ncmlkLmludmFsaWRhdGVDb2x1bW5zKCk7XG5cbiAgICAgICAgY29uc3QgbWF0Y2hUZW1wbGF0ZXMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodGhpcy5tYXRjaFRlbXBsYXRlcyk7XG4gICAgICAgIGNvbnN0IHsgcHJvcCB9ID0gdGhpcy5faGVhZGVyO1xuICAgICAgICBjb25zdCBjb2x1bW5LZXlzVG9Qcm94eTogQXJyYXk8a2V5b2YgUGJsQ29sdW1uPiA9IFsndHlwZSddO1xuXG4gICAgICAgIGlmIChtYXRjaFRlbXBsYXRlcykge1xuICAgICAgICAgIGNvbHVtbktleXNUb1Byb3h5LnB1c2goJ2NlbGxUcGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFRoZSBmb2xsb3dpbmcgbG9naWMgaXMgbm90IGZvciB0aGUgZmFpbnQgb2YgaGVhcnQuXG4gICAgICAgICAgIEJhc2ljYWxseSwgdGhlIHRyYW5zcG9zZSBwbHVnaW4gZG9lcyBub3Qgc3dhcCB0aGUgYWN0dWFsIGRhdGEgYnV0IHRoZSBjb2x1bW5zLlxuICAgICAgICAgICBXaGVuIHRyYW5zcG9zaW5nLCBhbGwgcm93cyB3aWxsIHN3YXAgdG8gY29sdW1ucyBzbywgQSBuZXcgY29sdW1uIGRlZmluaXRpb24gaXMgY3JlYXRlZCxcbiAgICAgICAgICAgd2l0aCBjb2x1bW5zIGVxdWFsIHRvIHRoZSB0b3RhbCBudW1iZXIgb3IgaXRlbXMgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAgICAgICAgIEVhY2ggY29sdW1uIChuZXcgb25lKSByZXByZXNlbnRzIGEgcm93IHNvIHdlIHNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIGFjdHVhbCByb3cgaW4gdGhlIG5ldyBjb2x1bW4uXG5cbiAgICAgICAgICAgVGhlIG5leHQgc3RlcCBpcyB0byBjcmVhdGUgYSBuZXcgZGF0YXNvdXJjZSwgdGhlIG5ldyBkYXRhc291cmNlIGlzIHNpbXBseSBhIGNvbGxlY3Rpb24gb2YgYWxsIG9mIHRoZSBvcmlnaW5hbCBjb2x1bW5zLlxuXG4gICAgICAgICAgIE5vdyB3aGVuIGBnZXRWYWx1ZWAgaXMgY2FsbGVkIG9uIHRoZSBuZXcgY29sdW1uIGl0IGlzIGNhbGxlZCB3aXRoIGEgXCJyb3dcIiB3aGljaCBpcyB0aGUgb3JpZ2luYWwgY29sdW1uLlxuICAgICAgICAgICBCZWNhdXNlIHRoZSBuZXcgY29sdW1uIGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIChvcmlnaW5hbCkgcm93IHdlIGNhbiBjYWxsIHRoZSBgZ2V0VmFsdWVgIG9uIHRoZSBvbGQgY29sdW1uIHdpdGggdGhlIGFjdHVhbCByb3cuXG5cbiAgICAgICAgICAgSW4gdGhpcyBwcm9jZXNzLCBhbGwgb2YgdGhlIGNvbHVtbiBtZXRhZGF0YSByZWxhdGVkIHRvIHRoZSBwcmVzZW50YXRpb24gbGF5ZXIgaXMgbG9zdC4gRm9yIGV4YW1wbGUsIGlmIENTUyBjbGFzc2VzIHdpbGxcbiAgICAgICAgICAgbm90IGJlIHRoZSBzYW1lLCB0ZW1wbGF0ZXMsIHR5cGVzIGV0Yy4uLiBUaGlzIGlzIGJlY2F1c2Ugd2hlbiB0aGUgZ3JpZCByZW5kZXJzIGEgY2VsbCB0aGF0IGNlbGwgaGFzIGEgc2luZ2xlIHRlbXBsYXRlIGFjcm9zc1xuICAgICAgICAgICBhbGwgcm93cyBidXQgbm93IHdlIG5lZWQgYSBkaWZmZXJlbnQgdGVtcGxhdGUgZm9yIGV2ZXJ5IHJvdy5cblxuICAgICAgICAgICBXZSBjYW4gcHJveHkgYSAoVkVSWSkgbGltaXRlZCBzZXQgb2YgbWV0YWRhdGEgcHJvcGVydGllcyByZWxhdGVkIHRvIHRoZSBwcmVzZW50YXRpb24gbGF5ZXIsIHZhbGlkIG9ubHkgb24gcmVuZGVyIHRpbWUuXG4gICAgICAgICAgIFRoaXMgcmVsYXlzIG9uIHRoZSBmYWN0IHRoYXQgZWFjaCByb3cgaXMgcmVuZGVyZWQgY29tcGxldGUsIHN0YXJ0aW5nIGZyb20gdGhlIGZpcnN0IGNlbGwgdG8gdGhlIGxhc3Qgc29cbiAgICAgICAgICAgd2l0aCB0aGF0IHdlIGNhbiBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIG9yaWdpbmFsIGNvbHVtbiB0aGEgdGhhdCBub3cgcmVwcmVzZW50cyB0aGUgd2hvbGUgcm93LlxuICAgICAgICAgKi9cbiAgICAgICAgbGV0IGN1cnJlbnRDb2x1bW46IFBibENvbHVtbjtcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIHRoaXMuZ3JpZC5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICBpZiAoYy5vcmdQcm9wID09PSBwcm9wKSB7XG4gICAgICAgICAgICBjLmdldFZhbHVlID0gKHJvdzogUGJsQ29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW4gPSByb3c7XG4gICAgICAgICAgICAgIHJldHVybiByb3cubGFiZWwgYXMgYW55O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5nZXRWYWx1ZSA9IGdldENlbGxWYWx1ZVRyYW5zZm9ybWVkO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29sdW1uS2V5c1RvUHJveHkpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGMsIGtleSwgeyBjb25maWd1cmFibGU6IHRydWUsIGdldDogKCkgPT4gY3VycmVudENvbHVtbiAmJiBjdXJyZW50Q29sdW1uW2tleV0sIHNldDogdmFsdWUgPT4ge30gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgdGhpcy5ncmlkU3RhdGUgPSBuZXcgVHJhbnNwb3NlVGFibGVTZXNzaW9uKFxuICAgICAgdGhpcy5ncmlkLFxuICAgICAgdGhpcy5wbHVnaW5DdHJsLFxuICAgICAgKCkgPT4gdGhpcy51cGRhdGVDb2x1bW5zKHRoaXMuZ3JpZC5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMpLFxuICAgICAgc291cmNlRmFjdG9yeVdyYXBwZXIsXG4gICAgKTtcblxuICAgIGlmIChyZWZyZXNoRGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgICB0aGlzLmdyaWQuZHMucmVmcmVzaCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkLmRzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5yZWZyZXNoKFZJUlRVQUxfUkVGUkVTSCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTdGF0ZShwcmV2OiBib29sZWFuIHwgdW5kZWZpbmVkLCBjdXJyOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgaXNGaXJzdCA9IHByZXYgPT09IHVuZGVmaW5lZDtcbiAgICBpZiAoIWN1cnIpIHtcbiAgICAgIHRoaXMuZGlzYWJsZSh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGUoIWlzRmlyc3QpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ29sdW1ucyhjb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IHsgcHJvcCB9ID0gdGhpcy5faGVhZGVyO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIGZvciAoY29uc3QgYyBvZiBjb2x1bW5zKSB7XG4gICAgICBpZiAoYy5vcmdQcm9wID09PSBwcm9wKSB7XG4gICAgICAgIHRoaXMuc2VsZkNvbHVtbiA9IGM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbHVtbnMucHVzaChjKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF0aGlzLnNlbGZDb2x1bW4pIHtcbiAgICAgIC8vIFRPRE86IGRvbid0IGFzc3VtZSBjb2x1bW5zWzBdXG4gICAgICB0aGlzLnNlbGZDb2x1bW4gPSBuZXcgUGJsQ29sdW1uKHRoaXMuX2hlYWRlciwgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb2x1bW5TdG9yZS5ncm91cFN0b3JlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==