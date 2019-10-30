/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { columnFactory, PblNgridConfigService, PblNgridComponent, PblNgridPluginController, PblColumn, TablePlugin, } from '@pebula/ngrid';
import { TransposeTableSession, LOCAL_COLUMN_DEF, VIRTUAL_REFRESH } from './transpose-table-session';
import { getCellValueTransformed, createTransformedColumn } from './utils';
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
                    .default(_this.defaultCol || {})).table.apply(_a, tslib_1.__spread([_this.selfColumn], results.map(createTransformedColumn))).build();
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
                    for (var _d = tslib_1.__values(_this.table.columnApi.visibleColumns), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                                for (var columnKeysToProxy_1 = tslib_1.__values(columnKeysToProxy), columnKeysToProxy_1_1 = columnKeysToProxy_1.next(); !columnKeysToProxy_1_1.done; columnKeysToProxy_1_1 = columnKeysToProxy_1.next()) {
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
            for (var columns_1 = tslib_1.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
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
    PblNgridTransposePluginDirective = tslib_1.__decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, PblNgridConfigService])
    ], PblNgridTransposePluginDirective);
    return PblNgridTransposePluginDirective;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUNMLGFBQWEsRUFDYixxQkFBcUIsRUFHckIsaUJBQWlCLEVBQ2pCLHdCQUF3QixFQUN4QixTQUFTLEVBQ1QsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxTQUFTLENBQUM7O0lBRXJFLHFCQUFxQixHQUFHLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxHQUFHLEVBQUUsd0RBQXdELEVBQUU7O0lBaUJoSCxVQUFVLEdBQWdCLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUZ6QywwQ0FBb0IsS0FBNkIsRUFBVSxVQUFvQyxFQUFFLE1BQTZCO1FBQTFHLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFOdkYsWUFBTyxHQUF3QixxQkFBcUIsQ0FBQztRQU8zRCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUN0RCxlQUFlLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztRQUNyRCxJQUFJLGVBQWUs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LENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5RjtJQUNILENBQUM7O2dCQXhMRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7Ozs7Z0JBaEQ3QyxpQkFBaUI7Z0JBQ2pCLHdCQUF3QjtnQkFKeEIscUJBQXFCOzs7NEJBdURwQixLQUFLO3lCQWtDTCxLQUFLLFNBQUMsb0JBQW9COzZCQVExQixLQUFLLFNBQUMscUJBQXFCO2lDQVEzQixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXBESyxnQ0FBZ0M7UUFINUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBRS9CLElBQUksRUFBRTtpREE4RHNCLGlCQUFpQixFQUEyQix3QkFBd0IsRUFBVSxxQkFBcUI7T0E3RG5ILGdDQUFnQyxDQXVMNUM7SUFBRCx1Q0FBQztDQUFBLElBQUE7U0F2TFksZ0NBQWdDOzs7Ozs7O0lBNEMzQyxzREFBdUU7Ozs7Ozs7O0lBUXZFLDBEQUFpQzs7Ozs7SUFFakMsbURBQXlCOzs7OztJQUN6QixtREFBNkQ7Ozs7O0lBQzdELHNEQUEwQzs7Ozs7SUFDMUMsbURBQTZCOzs7OztJQUM3QixzREFBOEI7Ozs7O0lBQzlCLHlEQUErRDs7Ozs7SUFFbkQsaURBQXFDOzs7OztJQUFFLHNEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHtcbiAgY29sdW1uRmFjdG9yeSxcbiAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICBQYmxDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gIFBibENvbHVtbixcbiAgVGFibGVQbHVnaW4sXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24sIExPQ0FMX0NPTFVNTl9ERUYsIFZJUlRVQUxfUkVGUkVTSCB9IGZyb20gJy4vdHJhbnNwb3NlLXRhYmxlLXNlc3Npb24nO1xuaW1wb3J0IHsgZ2V0Q2VsbFZhbHVlVHJhbnNmb3JtZWQsIGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IERFRkFVTFRfSEVBREVSX0NPTFVNTiA9IHsgcHJvcDogJ19fdHJhbnNwb3NlX18nLCBjc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwgcGJsLW5ncmlkLXRyYW5zcG9zZWQtaGVhZGVyLWNlbGwnIH07XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICB0cmFuc3Bvc2VQbHVnaW4/OiB7XG4gICAgICBoZWFkZXI/OiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+O1xuICAgICAgZGVmYXVsdENvbD86IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj47XG4gICAgICBtYXRjaFRlbXBsYXRlcz86IGJvb2xlYW47XG4gICAgfVxuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICB0cmFuc3Bvc2U/OiBQYmxOZ3JpZFRyYW5zcG9zZVBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuY29uc3QgUExVR0lOX0tFWTogJ3RyYW5zcG9zZScgPSAndHJhbnNwb3NlJztcblxuLyoqXG4gKiBUcmFuc3Bvc2UgcGx1Z2luLlxuICpcbiAqIFRoaXMgcGx1Z2luIHdpbGwgc3dhcHMgYXJvdW5kIHRoZSByb3dzIGFuZCBjb2x1bW5zIG9mIHRoZSB0YWJsZS5cbiAqXG4gKiBBICoqcmVndWxhciB0YWJsZSoqIChub3QgdHJhbnNwb3NlZCkgcmVwcmVzZW50cyByb3dzIGhvcml6b250YWxseTpcbiAqXG4gKiAtIEVhY2ggaG9yaXpvbnRhbCByb3cgcmVwcmVzZW50cyBhbiBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxuICogLSBFYWNoIHZlcnRpY2FsIGNvbHVtbiByZXByZXNlbnRzIHRoZSBzYW1lIHByb3BlcnR5IG9mIGFsbCByb3dzIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEEgKip0cmFuc3Bvc2VkKiogdGFibGUgcmVwcmVzZW50cyByb3cgdmVydGljYWxseTpcbiAqXG4gKiAtIEVhY2ggaG9yaXpvbnRhbCByb3cgcmVwcmVzZW50cyB0aGUgc2FtZSBwcm9wZXJ0eSBvZiBhbGwgcm93cyBpbiB0aGUgY29sbGVjdGlvbi5cbiAqIC0gRWFjaCB2ZXJ0aWNhbCByb3cgcmVwcmVzZW50cyBhbiBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqID4gTm90ZSB0aGF0IHRyYW5zcG9zaW5nIGEgdGFibGUgbWlnaHQgbm90IHBsYXkgbmljZSB3aXRoIG90aGVyIHBsdWdpbnMgYW5kL29yIGZlYXR1cmVzLlxuICogRm9yIGV4YW1wbGUsIHVzaW5nIHBhZ2luYXRpb24gd2l0aCB0cmFuc3Bvc2UgbWFrZSBubyBzZW5zZS5cbiAqL1xuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW3RyYW5zcG9zZV0nIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGdldCB0cmFuc3Bvc2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmVuYWJsZWQ7IH07XG4gIHNldCB0cmFuc3Bvc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGNvbnN0IGlzRmlyc3QgPSB0aGlzLmVuYWJsZWQgPT09IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHZhbHVlO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB0aGlzLmRpc2FibGUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVuYWJsZSghaXNGaXJzdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhlIG5ldyBoZWFkZXIgY29sdW1uLCB0aGlzIGlzIHRoZSBjb2x1bW4gdGhlIGZpcnN0IGNvbHVtbiB0aGF0XG4gICAqIHdpbGwgZGlzcGxheSBhbGwgdGhlIGhlYWRlcnMuXG4gICAqXG4gICAqIFRoaXMgaXMgYW4gb3B0aW9uYWwgdmFsdWUsIHdoZW4gbm90IHNldCBhIGRlZmF1bHQgY29sdW1uIHNldHRpbmdzIGlzIHVzZWQ6XG4gICAqXG4gICAqIGBgYGpzXG4gICAqIHtcbiAgICogIHByb3A6ICdfX3RyYW5zcG9zZV9fJyxcbiAgICogIGNzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCBwYmwtbmdyaWQtdHJhbnNwb3NlZC1oZWFkZXItY2VsbCcsXG4gICAqIH1cbiAgICogYGBgXG4gICAqXG4gICAqIFdoZW4gc2V0LCB0aGUgbmV3IGNvbHVtbiB2YWx1ZXMgd2lsbCBtZXJnZSBpbnRvIHRoZSBkZWZhdWx0IGRlZmluaXRpb25zLCBvdmVycmlkaW5nIGV4aXN0aW5nIHByb3BlcnRpZXNcbiAgICogc2V0IG9uIHRoZSBkZWZhdWx0IGNvbHVtbiBzZXR0aW5ncy5cbiAgICpcbiAgICogPiBUaGUgaGVhZGVyIGNvbHVtbiBiZWhhdmUgbGlrZSBhbnkgb3RoZXIgY29sdW1uIGFuZCB5b3UgY2FuIGFsc28gcHJvdmlkZSBkZWZpbmUgaXQgaW4gdGhlIGBjb2x1bW5gIHByb3BlcnR5IG9uIHRoZSB0YWJsZS5cbiAgICogV2hlbiB1c2luZyB0aGlzIGFwcHJvYWNoIHRoZSBjb2x1bW4gZGVmaW5lZCBvbiB0aGUgdGFibGUgaXMgdXNlZCBhcyBpcyAobm8gbWVyZ2luZykuIEp1c3QgbWFrZSBzdXJlIHlvdSB1c2UgdGhlIHJpZ2h0IGBwcm9wYCB2YWx1ZSBmb3IgaXQuXG4gICAqIGUuZy4gaWYgYGhlYWRlcmAgaXMgbm90IHNldCBoZXJlIGl0cyBgX190cmFuc3Bvc2VfX2Agb3RoZXJ3aXNlLCB0aGUgYWN0dWFsIGBwcm9wYCB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dCgndHJhbnNwb3NlSGVhZGVyQ29sJykgc2V0IGhlYWRlcih2YWx1ZTogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPikge1xuICAgIHRoaXMuX2hlYWRlciA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfSEVBREVSX0NPTFVNTiwgdmFsdWUgfHwge30pXG4gIH1cblxuICAvKipcbiAgICogQ29sdW1uIGRlZmluaXRpb25zIHRvIGJlIHVzZWQgYXMgdGhlIGJhc2UgZGVmYXVsdCBkZWZpbml0aW9ucyBmb3IgdGhlIG5ldyB0cmFuc3Bvc2VkIGNvbHVtbnMuXG4gICAqIFRoaXMgaXMgYW4gb3B0aW9uYWwgdmFsdWUsIHdoZW4gbm90IHNldCBubyBkZWZhdWx0J3MgYXJlIGFwcGxpZWQuXG4gICAqL1xuICBASW5wdXQoJ3RyYW5zcG9zZURlZmF1bHRDb2wnKSBkZWZhdWx0Q29sOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIHdpbGwgdHJ5IHRvIHVzZSB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgb2YgdGhlIGNlbGwsIGkuZS4gdGhlIHRlbXBsYXRlIHRoYXQgd291bGQgaGF2ZSBiZWVuIHVzZWRcbiAgICogaWYgd2UgZGlkIG5vdCB0cmFuc3Bvc2UgYXQgYWxsLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIG1hdGNoVGVtcGxhdGVzOiBib29sZWFuO1xuXG4gIHByaXZhdGUgZW5hYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGVhZGVyOiBQYmxDb2x1bW5EZWZpbml0aW9uID0gREVGQVVMVF9IRUFERVJfQ09MVU1OO1xuICBwcml2YXRlIHRhYmxlU3RhdGU6IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbjtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBQYmxDb2x1bW5bXTtcbiAgcHJpdmF0ZSBzZWxmQ29sdW1uOiBQYmxDb2x1bW47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICAgIGNvbnN0IHRyYW5zcG9zZVBsdWdpbiA9IGNvbmZpZy5nZXQoJ3RyYW5zcG9zZVBsdWdpbicpO1xuICAgIGlmICh0cmFuc3Bvc2VQbHVnaW4pIHtcbiAgICAgIHRoaXMuaGVhZGVyID0gdHJhbnNwb3NlUGx1Z2luLmhlYWRlcjtcbiAgICAgIHRoaXMuZGVmYXVsdENvbCA9IHRyYW5zcG9zZVBsdWdpbi5kZWZhdWx0Q29sIHx8IHt9O1xuICAgICAgdGhpcy5tYXRjaFRlbXBsYXRlcyA9IHRyYW5zcG9zZVBsdWdpbi5tYXRjaFRlbXBsYXRlcyB8fCBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gICAgdGhpcy5kaXNhYmxlKGZhbHNlKTtcbiAgfVxuXG4gIGRpc2FibGUodXBkYXRlVGFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YWJsZVN0YXRlKSB7XG4gICAgICBjb25zdCB7IHRhYmxlU3RhdGUgfSA9IHRoaXM7XG4gICAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLnNlbGZDb2x1bW4gPSB0aGlzLnRhYmxlU3RhdGUgPSB0aGlzLmNvbHVtbnMgPSB0aGlzLnNlbGZDb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgICB0YWJsZVN0YXRlLmRlc3Ryb3kodXBkYXRlVGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIGVuYWJsZShyZWZyZXNoRGF0YVNvdXJjZTogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFibGVTdGF0ZSkge1xuICAgICAgdGhpcy5kaXNhYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VGYWN0b3J5V3JhcHBlciA9IChyZXN1bHRzOiBhbnlbXSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgY29uc3QgbG9jYWw6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCA9IHRoaXMudGFibGUuY29sdW1ucyA9IGNvbHVtbkZhY3RvcnkoKVxuICAgICAgICAgIC5kZWZhdWx0KHRoaXMuZGVmYXVsdENvbCB8fCB7fSlcbiAgICAgICAgICAudGFibGUoXG4gICAgICAgICAgICB0aGlzLnNlbGZDb2x1bW4sXG4gICAgICAgICAgICAuLi5yZXN1bHRzLm1hcChjcmVhdGVUcmFuc2Zvcm1lZENvbHVtbiksXG4gICAgICAgICAgKVxuICAgICAgICAgIC5idWlsZCgpO1xuXG4gICAgICAgIGNvbnN0IHByZXYgPSB0aGlzLnRhYmxlU3RhdGUuY29sdW1uc0lucHV0O1xuICAgICAgICBsb2NhbC5oZWFkZXIgPSBwcmV2LmhlYWRlcjtcbiAgICAgICAgbG9jYWwuaGVhZGVyR3JvdXAgPSBwcmV2LmhlYWRlckdyb3VwO1xuICAgICAgICBsb2NhbC5mb290ZXIgPSBwcmV2LmZvb3RlcjtcbiAgICAgICAgbG9jYWxbTE9DQUxfQ09MVU1OX0RFRl0gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGFibGUuaW52YWxpZGF0ZUNvbHVtbnMoKTtcblxuICAgICAgICBjb25zdCBtYXRjaFRlbXBsYXRlcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh0aGlzLm1hdGNoVGVtcGxhdGVzKTtcbiAgICAgICAgY29uc3QgeyBwcm9wIH0gPSB0aGlzLl9oZWFkZXI7XG4gICAgICAgIGNvbnN0IGNvbHVtbktleXNUb1Byb3h5OiBBcnJheTxrZXlvZiBQYmxDb2x1bW4+ID0gWyd0eXBlJ107XG5cbiAgICAgICAgaWYgKG1hdGNoVGVtcGxhdGVzKSB7XG4gICAgICAgICAgY29sdW1uS2V5c1RvUHJveHkucHVzaCgnY2VsbFRwbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogVGhlIGZvbGxvd2luZyBsb2dpYyBpcyBub3QgZm9yIHRoZSBmYWludCBvZiBoZWFydC5cbiAgICAgICAgICAgQmFzaWNhbGx5LCB0aGUgdHJhbnNwb3NlIHBsdWdpbiBkb2VzIG5vdCBzd2FwIHRoZSBhY3R1YWwgZGF0YSBidXQgdGhlIGNvbHVtbnMuXG4gICAgICAgICAgIFdoZW4gdHJhbnNwb3NpbmcsIGFsbCByb3dzIHdpbGwgc3dhcCB0byBjb2x1bW5zIHNvLCBBIG5ldyBjb2x1bW4gZGVmaW5pdGlvbiBpcyBjcmVhdGVkLFxuICAgICAgICAgICB3aXRoIGNvbHVtbnMgZXF1YWwgdG8gdGhlIHRvdGFsIG51bWJlciBvciBpdGVtcyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICAgICAgICAgRWFjaCBjb2x1bW4gKG5ldyBvbmUpIHJlcHJlc2VudHMgYSByb3cgc28gd2Ugc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIHJvdyBpbiB0aGUgbmV3IGNvbHVtbi5cblxuICAgICAgICAgICBUaGUgbmV4dCBzdGVwIGlzIHRvIGNyZWF0ZSBhIG5ldyBkYXRhc291cmNlLCB0aGUgbmV3IGRhdGFzb3VyY2UgaXMgc2ltcGx5IGEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIG9yaWdpbmFsIGNvbHVtbnMuXG5cbiAgICAgICAgICAgTm93IHdoZW4gYGdldFZhbHVlYCBpcyBjYWxsZWQgb24gdGhlIG5ldyBjb2x1bW4gaXQgaXMgY2FsbGVkIHdpdGggYSBcInJvd1wiIHdoaWNoIGlzIHRoZSBvcmlnaW5hbCBjb2x1bW4uXG4gICAgICAgICAgIEJlY2F1c2UgdGhlIG5ldyBjb2x1bW4gaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBhY3R1YWwgKG9yaWdpbmFsKSByb3cgd2UgY2FuIGNhbGwgdGhlIGBnZXRWYWx1ZWAgb24gdGhlIG9sZCBjb2x1bW4gd2l0aCB0aGUgYWN0dWFsIHJvdy5cblxuICAgICAgICAgICBJbiB0aGlzIHByb2Nlc3MsIGFsbCBvZiB0aGUgY29sdW1uIG1ldGFkYXRhIHJlbGF0ZWQgdG8gdGhlIHByZXNlbnRhdGlvbiBsYXllciBpcyBsb3N0LiBGb3IgZXhhbXBsZSwgaWYgQ1NTIGNsYXNzZXMgd2lsbFxuICAgICAgICAgICBub3QgYmUgdGhlIHNhbWUsIHRlbXBsYXRlcywgdHlwZXMgZXRjLi4uIFRoaXMgaXMgYmVjYXVzZSB3aGVuIHRoZSBncmlkIHJlbmRlcnMgYSBjZWxsIHRoYXQgY2VsbCBoYXMgYSBzaW5nbGUgdGVtcGxhdGUgYWNyb3NzXG4gICAgICAgICAgIGFsbCByb3dzIGJ1dCBub3cgd2UgbmVlZCBhIGRpZmZlcmVudCB0ZW1wbGF0ZSBmb3IgZXZlcnkgcm93LlxuXG4gICAgICAgICAgIFdlIGNhbiBwcm94eSBhIChWRVJZKSBsaW1pdGVkIHNldCBvZiBtZXRhZGF0YSBwcm9wZXJ0aWVzIHJlbGF0ZWQgdG8gdGhlIHByZXNlbnRhdGlvbiBsYXllciwgdmFsaWQgb25seSBvbiByZW5kZXIgdGltZS5cbiAgICAgICAgICAgVGhpcyByZWxheXMgb24gdGhlIGZhY3QgdGhhdCBlYWNoIHJvdyBpcyByZW5kZXJlZCBjb21wbGV0ZSwgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3QgY2VsbCB0byB0aGUgbGFzdCBzb1xuICAgICAgICAgICB3aXRoIHRoYXQgd2UgY2FuIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgY29sdW1uIHRoYSB0aGF0IG5vdyByZXByZXNlbnRzIHRoZSB3aG9sZSByb3cuXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgY3VycmVudENvbHVtbjogUGJsQ29sdW1uO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy50YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMpIHtcbiAgICAgICAgICBpZiAoYy5vcmdQcm9wID09PSBwcm9wKSB7XG4gICAgICAgICAgICBjLmdldFZhbHVlID0gKHJvdzogUGJsQ29sdW1uKSA9PiB7XG4gICAgICAgICAgICAgIGN1cnJlbnRDb2x1bW4gPSByb3c7XG4gICAgICAgICAgICAgIHJldHVybiByb3cubGFiZWwgYXMgYW55O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYy5nZXRWYWx1ZSA9IGdldENlbGxWYWx1ZVRyYW5zZm9ybWVkO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgY29sdW1uS2V5c1RvUHJveHkpIHtcbiAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGMsIGtleSwgeyBjb25maWd1cmFibGU6IHRydWUsIGdldDogKCkgPT4gY3VycmVudENvbHVtbiAmJiBjdXJyZW50Q29sdW1uW2tleV0sIHNldDogdmFsdWUgPT4ge30gfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbHVtbnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgdGhpcy50YWJsZVN0YXRlID0gbmV3IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbihcbiAgICAgIHRoaXMudGFibGUsXG4gICAgICB0aGlzLnBsdWdpbkN0cmwsXG4gICAgICAoKSA9PiB0aGlzLnVwZGF0ZUNvbHVtbnModGhpcy50YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMpLFxuICAgICAgc291cmNlRmFjdG9yeVdyYXBwZXIsXG4gICAgKTtcblxuICAgIGlmIChyZWZyZXNoRGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5wbHVnaW5DdHJsLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgICB0aGlzLnRhYmxlLmRzLnJlZnJlc2goKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMudGFibGUuZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy50YWJsZS5kcy5yZWZyZXNoKFZJUlRVQUxfUkVGUkVTSCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb2x1bW5zKGNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgY29uc3QgeyBwcm9wIH0gPSB0aGlzLl9oZWFkZXI7XG4gICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChjLm9yZ1Byb3AgPT09IHByb3ApIHtcbiAgICAgICAgdGhpcy5zZWxmQ29sdW1uID0gYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuc2VsZkNvbHVtbikge1xuICAgICAgLy8gVE9ETzogZG9uJ3QgYXNzdW1lIGNvbHVtbnNbMF1cbiAgICAgIHRoaXMuc2VsZkNvbHVtbiA9IG5ldyBQYmxDb2x1bW4odGhpcy5faGVhZGVyLCB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlLmdyb3VwU3RvcmUpO1xuICAgIH1cbiAgfVxufVxuIl19