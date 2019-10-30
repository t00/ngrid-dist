import { Directive, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { columnFactory, PblColumn, PblNgridComponent, PblNgridPluginController, PblNgridConfigService, TablePlugin, PblNgridModule } from '@pebula/ngrid';
import { __spread, __values, __decorate, __metadata } from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { isObservable, of, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LOCAL_COLUMN_DEF = Symbol('LOCAL_COLUMN_DEF');
/** @type {?} */
var VIRTUAL_REFRESH = {};
var TransposeTableSession = /** @class */ (function () {
    function TransposeTableSession(table, pluginCtrl, updateColumns, sourceFactoryWrapper) {
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
    TransposeTableSession.prototype.destroy = /**
     * @param {?} updateTable
     * @return {?}
     */
    function (updateTable) {
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
    };
    /**
     * @private
     * @return {?}
     */
    TransposeTableSession.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.headerRow = this.table.showHeader;
        this.table.showHeader = false;
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInvalidateHeaders' && _this.onInvalidateHeaders(); }));
        this.pluginCtrl.events
            .pipe(UnRx(this, this.table))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onDataSource' && _this.onDataSource(e.curr); }));
    };
    /**
     * @private
     * @return {?}
     */
    TransposeTableSession.prototype.onInvalidateHeaders = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.table.columns[LOCAL_COLUMN_DEF]) {
            this.columnsInput = this.table.columns;
            this.storeColumns = this.table.columnApi.visibleColumns;
            this.updateColumns();
        }
    };
    /**
     * @private
     * @param {?=} ds
     * @return {?}
     */
    TransposeTableSession.prototype.onDataSource = /**
     * @private
     * @param {?=} ds
     * @return {?}
     */
    function (ds) {
        var _this = this;
        this.unPatchDataSource();
        if (ds) {
            this.ds = ds;
            this.dsSourceFactory = ds.adapter.sourceFactory;
            this.ds.adapter.sourceFactory = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                /** @type {?} */
                var rawSource = event.data.changed && event.data.curr === VIRTUAL_REFRESH
                    ? _this.ds.source
                    : _this.dsSourceFactory(event);
                if (rawSource === false) {
                    return rawSource;
                }
                else if (_this.destroyed) {
                    _this.unPatchDataSource();
                    return _this.rawSource;
                }
                /** @type {?} */
                var obs = isObservable(rawSource)
                    ? rawSource
                    : Array.isArray(rawSource) ? of(rawSource) : from(rawSource) // promise...
                ;
                return obs
                    .pipe(tap((/**
                 * @param {?} source
                 * @return {?}
                 */
                function (source) { return _this.rawSource = source; })), map(_this.sourceFactoryWrapper));
            });
        }
    };
    /**
     * @private
     * @return {?}
     */
    TransposeTableSession.prototype.unPatchDataSource = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.ds) {
            this.ds.adapter.sourceFactory = this.dsSourceFactory;
            this.ds = this.dsSourceFactory = undefined;
        }
    };
    return TransposeTableSession;
}());
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
var TRANSFORM_ROW_REF = Symbol('TRANSFORM_ROW_REF');
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
    var _a;
    return { prop: "__transform_item_" + index + "__", data: (_a = {}, _a[TRANSFORM_ROW_REF] = row, _a) };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
/** @type {?} */
var PLUGIN_KEY = 'transpose';
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
var PblNgridTransposePluginDirective = /** @class */ (function () {
    function PblNgridTransposePluginDirective(table, pluginCtrl, config) {
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this._header = DEFAULT_HEADER_COLUMN;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        var transposePlugin = config.get('transposePlugin');
        if (transposePlugin) {
            this.header = transposePlugin.header;
            this.defaultCol = transposePlugin.defaultCol || {};
            this.matchTemplates = transposePlugin.matchTemplates || false;
        }
    }
    Object.defineProperty(PblNgridTransposePluginDirective.prototype, "transpose", {
        get: /**
         * @return {?}
         */
        function () { return this.enabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (value !== this.enabled) {
                /** @type {?} */
                var isFirst = this.enabled === undefined;
                this.enabled = value;
                if (!value) {
                    this.disable(true);
                }
                else {
                    this.enable(!isFirst);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblNgridTransposePluginDirective.prototype, "header", {
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
        set: /**
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
        function (value) {
            this._header = Object.assign({}, DEFAULT_HEADER_COLUMN, value || {});
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridTransposePluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.table);
        this.disable(false);
    };
    /**
     * @param {?} updateTable
     * @return {?}
     */
    PblNgridTransposePluginDirective.prototype.disable = /**
     * @param {?} updateTable
     * @return {?}
     */
    function (updateTable) {
        if (this.tableState) {
            var tableState = this.tableState;
            this.columns = this.selfColumn = this.tableState = this.columns = this.selfColumn = undefined;
            tableState.destroy(updateTable);
        }
    };
    /**
     * @param {?=} refreshDataSource
     * @return {?}
     */
    PblNgridTransposePluginDirective.prototype.enable = /**
     * @param {?=} refreshDataSource
     * @return {?}
     */
    function (refreshDataSource) {
        var _this = this;
        if (refreshDataSource === void 0) { refreshDataSource = false; }
        if (this.tableState) {
            this.disable(false);
        }
        /** @type {?} */
        var sourceFactoryWrapper = (/**
         * @param {?} results
         * @return {?}
         */
        function (results) {
            var _a, e_1, _b, e_2, _c;
            if (results) {
                /** @type {?} */
                var local = _this.table.columns = (_a = columnFactory()
                    .default(_this.defaultCol || {})).table.apply(_a, __spread([_this.selfColumn], results.map(createTransformedColumn))).build();
                /** @type {?} */
                var prev = _this.tableState.columnsInput;
                local.header = prev.header;
                local.headerGroup = prev.headerGroup;
                local.footer = prev.footer;
                local[LOCAL_COLUMN_DEF] = true;
                _this.table.invalidateColumns();
                /** @type {?} */
                var matchTemplates = coerceBooleanProperty(_this.matchTemplates);
                var prop = _this._header.prop;
                /** @type {?} */
                var columnKeysToProxy = ['type'];
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
                var currentColumn_1;
                try {
                    for (var _d = __values(_this.table.columnApi.visibleColumns), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var c = _e.value;
                        if (c.orgProp === prop) {
                            c.getValue = (/**
                             * @param {?} row
                             * @return {?}
                             */
                            function (row) {
                                currentColumn_1 = row;
                                return (/** @type {?} */ (row.label));
                            });
                        }
                        else {
                            c.getValue = getCellValueTransformed;
                            var _loop_1 = function (key) {
                                Object.defineProperty(c, key, { configurable: true, get: (/**
                                     * @return {?}
                                     */
                                    function () { return currentColumn_1 && currentColumn_1[key]; }), set: (/**
                                     * @param {?} value
                                     * @return {?}
                                     */
                                    function (value) { }) });
                            };
                            try {
                                for (var columnKeysToProxy_1 = __values(columnKeysToProxy), columnKeysToProxy_1_1 = columnKeysToProxy_1.next(); !columnKeysToProxy_1_1.done; columnKeysToProxy_1_1 = columnKeysToProxy_1.next()) {
                                    var key = columnKeysToProxy_1_1.value;
                                    _loop_1(key);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (columnKeysToProxy_1_1 && !columnKeysToProxy_1_1.done && (_c = columnKeysToProxy_1.return)) _c.call(columnKeysToProxy_1);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return _this.columns;
            }
            return results;
        });
        this.tableState = new TransposeTableSession(this.table, this.pluginCtrl, (/**
         * @return {?}
         */
        function () { return _this.updateColumns(_this.table.columnApi.visibleColumns); }), sourceFactoryWrapper);
        if (refreshDataSource) {
            this.pluginCtrl.extApi.contextApi.clear();
            this.table.ds.refresh();
        }
        else if (this.table.ds.length > 0) {
            this.table.ds.refresh(VIRTUAL_REFRESH);
        }
    };
    /**
     * @private
     * @param {?} columns
     * @return {?}
     */
    PblNgridTransposePluginDirective.prototype.updateColumns = /**
     * @private
     * @param {?} columns
     * @return {?}
     */
    function (columns) {
        var e_3, _a;
        var prop = this._header.prop;
        this.columns = [];
        try {
            for (var columns_1 = __values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                var c = columns_1_1.value;
                if (c.orgProp === prop) {
                    this.selfColumn = c;
                }
                else {
                    this.columns.push(c);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (columns_1_1 && !columns_1_1.done && (_a = columns_1.return)) _a.call(columns_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (!this.selfColumn) {
            // TODO: don't assume columns[0]
            this.selfColumn = new PblColumn(this._header, this.pluginCtrl.extApi.columnStore.groupStore);
        }
    };
    PblNgridTransposePluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: PblNgridConfigService }
    ]; };
    PblNgridTransposePluginDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[transpose]' },] }
    ];
    /** @nocollapse */
    PblNgridTransposePluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: PblNgridConfigService }
    ]; };
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
    return PblNgridTransposePluginDirective;
}());
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
var PblNgridTransposeModule = /** @class */ (function () {
    function PblNgridTransposeModule() {
    }
    PblNgridTransposeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatCheckboxModule, PblNgridModule],
                    declarations: [PblNgridTransposePluginDirective],
                    exports: [PblNgridTransposePluginDirective],
                },] }
    ];
    return PblNgridTransposeModule;
}());

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
