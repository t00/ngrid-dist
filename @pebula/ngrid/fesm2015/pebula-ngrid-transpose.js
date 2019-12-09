import { Directive, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { columnFactory, PblColumn, PblNgridComponent, PblNgridPluginController, PblNgridConfigService, TablePlugin, PblNgridModule } from '@pebula/ngrid';
import { __decorate, __metadata } from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { isObservable, of, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const LOCAL_COLUMN_DEF = Symbol('LOCAL_COLUMN_DEF');
/** @type {?} */
const VIRTUAL_REFRESH = {};
class TransposeTableSession {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} updateColumns
     * @param {?} sourceFactoryWrapper
     */
    constructor(table, pluginCtrl, updateColumns, sourceFactoryWrapper) {
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this.updateColumns = updateColumns;
        this.sourceFactoryWrapper = sourceFactoryWrapper;
        this.init();
        if (table.columns && table.columnApi.visibleColumns.length > 0) {
            this.onInvalidateHeaders();
        }
        this.onDataSource(this.table.ds);
    }
    /**
     * @param {?} updateTable
     * @return {?}
     */
    destroy(updateTable) {
        if (!this.destroyed) {
            this.destroyed = true;
            UnRx.kill(this, this.table);
            this.table.showHeader = this.headerRow;
            this.table.columns = this.columnsInput;
            if (updateTable) {
                this.table.invalidateColumns();
                this.table.ds.refresh(VIRTUAL_REFRESH);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    init() {
        this.headerRow = this.table.showHeader;
        this.table.showHeader = false;
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders' && this.onInvalidateHeaders()));
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onDataSource' && this.onDataSource(e.curr)));
    }
    /**
     * @private
     * @return {?}
     */
    onInvalidateHeaders() {
        if (!this.table.columns[LOCAL_COLUMN_DEF]) {
            this.columnsInput = this.table.columns;
            this.storeColumns = this.table.columnApi.visibleColumns;
            this.updateColumns();
        }
    }
    /**
     * @private
     * @param {?=} ds
     * @return {?}
     */
    onDataSource(ds) {
        this.unPatchDataSource();
        if (ds) {
            this.ds = ds;
            this.dsSourceFactory = ds.adapter.sourceFactory;
            this.ds.adapter.sourceFactory = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                /** @type {?} */
                const rawSource = event.data.changed && event.data.curr === VIRTUAL_REFRESH
                    ? this.ds.source
                    : this.dsSourceFactory(event);
                if (rawSource === false) {
                    return rawSource;
                }
                else if (this.destroyed) {
                    this.unPatchDataSource();
                    return this.rawSource;
                }
                /** @type {?} */
                const obs = isObservable(rawSource)
                    ? rawSource
                    : Array.isArray(rawSource) ? of(rawSource) : from(rawSource) // promise...
                ;
                return obs
                    .pipe(tap((/**
                 * @param {?} source
                 * @return {?}
                 */
                source => this.rawSource = source)), map(this.sourceFactoryWrapper));
            });
        }
    }
    /**
     * @private
     * @return {?}
     */
    unPatchDataSource() {
        if (this.ds) {
            this.ds.adapter.sourceFactory = this.dsSourceFactory;
            this.ds = this.dsSourceFactory = undefined;
        }
    }
}
if (false) {
    /** @type {?} */
    TransposeTableSession.prototype.dsSourceFactory;
    /** @type {?} */
    TransposeTableSession.prototype.ds;
    /** @type {?} */
    TransposeTableSession.prototype.columnsInput;
    /** @type {?} */
    TransposeTableSession.prototype.storeColumns;
    /** @type {?} */
    TransposeTableSession.prototype.headerRow;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.rawSource;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.table;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.pluginCtrl;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.updateColumns;
    /**
     * @type {?}
     * @private
     */
    TransposeTableSession.prototype.sourceFactoryWrapper;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const TRANSFORM_ROW_REF = Symbol('TRANSFORM_ROW_REF');
/**
 * @param {?} row
 * @return {?}
 */
function getCellValueAsHeader(row) {
    return row.label;
}
/**
 * @this {?}
 * @param {?} colAsRow
 * @return {?}
 */
function getCellValueTransformed(colAsRow) {
    return colAsRow.getValue(this.data[TRANSFORM_ROW_REF]);
}
/**
 * @param {?} row
 * @param {?} index
 * @return {?}
 */
function createTransformedColumn(row, index) {
    return { prop: `__transform_item_${index}__`, data: { [TRANSFORM_ROW_REF]: row } };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
PblNgridTransposePluginDirective = __decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, PblNgridConfigService])
], PblNgridTransposePluginDirective);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridTransposeModule {
}
PblNgridTransposeModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                declarations: [PblNgridTransposePluginDirective],
                exports: [PblNgridTransposePluginDirective],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridTransposeModule, PblNgridTransposePluginDirective as ɵa };
//# sourceMappingURL=pebula-ngrid-transpose.js.map
