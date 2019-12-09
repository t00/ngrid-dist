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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUNMLGFBQWEsRUFDYixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFckUscUJBQXFCLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSx3REFBd0QsRUFBRTs7SUFpQmhILFVBQVUsR0FBZ0IsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxRnpDLDBDQUFvQixLQUE2QixFQUFVLFVBQW9DLEVBQUUsTUFBNkI7UUFBMUcsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQU52RixZQUFPLEdBQXdCLHFCQUFxQixDQUFDO1FBTzNELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBQ3RELGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGlC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Q3RCO2FBQ0Y7Ozs7Ozs7OztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzlGO0lBQ0gsQ0FBQzs7Z0JBekgwQixpQkFBaUI7Z0JBQTJCLHdCQUF3QjtnQkFBVSxxQkFBcUI7OztnQkEvRC9ILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTs7OztnQkFoRDdDLGlCQUFpQjtnQkFDakIsd0JBQXdCO2dCQUp4QixxQkFBcUI7Ozs0QkF1RHBCLEtBQUs7eUJBa0NMLEtBQUssU0FBQyxvQkFBb0I7NkJBUTFCLEtBQUssU0FBQyxxQkFBcUI7aUNBUTNCLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcERLLGdDQUFnQztRQUg1QyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFFL0IsSUFBSSxFQUFFO2lEQThEc0IsaUJBQWlCLEVBQTJCLHdCQUF3QixFQUFVLHFCQUFxQjtPQTdEbkgsZ0NBQWdDLENBdUw1QztJQUFELHVDQUFDO0NBQUEsSUFBQTtTQXZMWSxnQ0FBZ0M7Ozs7Ozs7SUE0QzNDLHNEQUF1RTs7Ozs7Ozs7SUFRdkUsMERBQWlDOzs7OztJQUVqQyxtREFBeUI7Ozs7O0lBQ3pCLG1EQUE2RDs7Ozs7SUFDN0Qsc0RBQTBDOzs7OztJQUMxQyxtREFBNkI7Ozs7O0lBQzdCLHNEQUE4Qjs7Ozs7SUFDOUIseURBQStEOzs7OztJQUVuRCxpREFBcUM7Ozs7O0lBQUUsc0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQge1xuICBjb2x1bW5GYWN0b3J5LFxuICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gIFBibENvbHVtbkRlZmluaXRpb24sXG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgUGJsQ29sdW1uLFxuICBUYWJsZVBsdWdpbixcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbiwgTE9DQUxfQ09MVU1OX0RFRiwgVklSVFVBTF9SRUZSRVNIIH0gZnJvbSAnLi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbic7XG5pbXBvcnQgeyBnZXRDZWxsVmFsdWVUcmFuc2Zvcm1lZCwgY3JlYXRlVHJhbnNmb3JtZWRDb2x1bW4gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9IRUFERVJfQ09MVU1OID0geyBwcm9wOiAnX190cmFuc3Bvc2VfXycsIGNzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCBwYmwtbmdyaWQtdHJhbnNwb3NlZC1oZWFkZXItY2VsbCcgfTtcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRyYW5zcG9zZVBsdWdpbj86IHtcbiAgICAgIGhlYWRlcj86IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj47XG4gICAgICBkZWZhdWx0Q29sPzogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcbiAgICAgIG1hdGNoVGVtcGxhdGVzPzogYm9vbGVhbjtcbiAgICB9XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHRyYW5zcG9zZT86IFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlO1xuICB9XG59XG5jb25zdCBQTFVHSU5fS0VZOiAndHJhbnNwb3NlJyA9ICd0cmFuc3Bvc2UnO1xuXG4vKipcbiAqIFRyYW5zcG9zZSBwbHVnaW4uXG4gKlxuICogVGhpcyBwbHVnaW4gd2lsbCBzd2FwcyBhcm91bmQgdGhlIHJvd3MgYW5kIGNvbHVtbnMgb2YgdGhlIHRhYmxlLlxuICpcbiAqIEEgKipyZWd1bGFyIHRhYmxlKiogKG5vdCB0cmFuc3Bvc2VkKSByZXByZXNlbnRzIHJvd3MgaG9yaXpvbnRhbGx5OlxuICpcbiAqIC0gRWFjaCBob3Jpem9udGFsIHJvdyByZXByZXNlbnRzIGFuIGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXG4gKiAtIEVhY2ggdmVydGljYWwgY29sdW1uIHJlcHJlc2VudHMgdGhlIHNhbWUgcHJvcGVydHkgb2YgYWxsIHJvd3MgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogQSAqKnRyYW5zcG9zZWQqKiB0YWJsZSByZXByZXNlbnRzIHJvdyB2ZXJ0aWNhbGx5OlxuICpcbiAqIC0gRWFjaCBob3Jpem9udGFsIHJvdyByZXByZXNlbnRzIHRoZSBzYW1lIHByb3BlcnR5IG9mIGFsbCByb3dzIGluIHRoZSBjb2xsZWN0aW9uLlxuICogLSBFYWNoIHZlcnRpY2FsIHJvdyByZXByZXNlbnRzIGFuIGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogPiBOb3RlIHRoYXQgdHJhbnNwb3NpbmcgYSB0YWJsZSBtaWdodCBub3QgcGxheSBuaWNlIHdpdGggb3RoZXIgcGx1Z2lucyBhbmQvb3IgZmVhdHVyZXMuXG4gKiBGb3IgZXhhbXBsZSwgdXNpbmcgcGFnaW5hdGlvbiB3aXRoIHRyYW5zcG9zZSBtYWtlIG5vIHNlbnNlLlxuICovXG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbdHJhbnNwb3NlXScgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFRyYW5zcG9zZVBsdWdpbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgZ2V0IHRyYW5zcG9zZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuZW5hYmxlZDsgfTtcbiAgc2V0IHRyYW5zcG9zZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuZW5hYmxlZCkge1xuICAgICAgY29uc3QgaXNGaXJzdCA9IHRoaXMuZW5hYmxlZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5lbmFibGVkID0gdmFsdWU7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGlzYWJsZSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5hYmxlKCFpc0ZpcnN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sdW1uIGRlZmluaXRpb25zIGZvciB0aGUgbmV3IGhlYWRlciBjb2x1bW4sIHRoaXMgaXMgdGhlIGNvbHVtbiB0aGUgZmlyc3QgY29sdW1uIHRoYXRcbiAgICogd2lsbCBkaXNwbGF5IGFsbCB0aGUgaGVhZGVycy5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBvcHRpb25hbCB2YWx1ZSwgd2hlbiBub3Qgc2V0IGEgZGVmYXVsdCBjb2x1bW4gc2V0dGluZ3MgaXMgdXNlZDpcbiAgICpcbiAgICogYGBganNcbiAgICoge1xuICAgKiAgcHJvcDogJ19fdHJhbnNwb3NlX18nLFxuICAgKiAgY3NzOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsIHBibC1uZ3JpZC10cmFuc3Bvc2VkLWhlYWRlci1jZWxsJyxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hlbiBzZXQsIHRoZSBuZXcgY29sdW1uIHZhbHVlcyB3aWxsIG1lcmdlIGludG8gdGhlIGRlZmF1bHQgZGVmaW5pdGlvbnMsIG92ZXJyaWRpbmcgZXhpc3RpbmcgcHJvcGVydGllc1xuICAgKiBzZXQgb24gdGhlIGRlZmF1bHQgY29sdW1uIHNldHRpbmdzLlxuICAgKlxuICAgKiA+IFRoZSBoZWFkZXIgY29sdW1uIGJlaGF2ZSBsaWtlIGFueSBvdGhlciBjb2x1bW4gYW5kIHlvdSBjYW4gYWxzbyBwcm92aWRlIGRlZmluZSBpdCBpbiB0aGUgYGNvbHVtbmAgcHJvcGVydHkgb24gdGhlIHRhYmxlLlxuICAgKiBXaGVuIHVzaW5nIHRoaXMgYXBwcm9hY2ggdGhlIGNvbHVtbiBkZWZpbmVkIG9uIHRoZSB0YWJsZSBpcyB1c2VkIGFzIGlzIChubyBtZXJnaW5nKS4gSnVzdCBtYWtlIHN1cmUgeW91IHVzZSB0aGUgcmlnaHQgYHByb3BgIHZhbHVlIGZvciBpdC5cbiAgICogZS5nLiBpZiBgaGVhZGVyYCBpcyBub3Qgc2V0IGhlcmUgaXRzIGBfX3RyYW5zcG9zZV9fYCBvdGhlcndpc2UsIHRoZSBhY3R1YWwgYHByb3BgIHZhbHVlLlxuICAgKi9cbiAgQElucHV0KCd0cmFuc3Bvc2VIZWFkZXJDb2wnKSBzZXQgaGVhZGVyKHZhbHVlOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+KSB7XG4gICAgdGhpcy5faGVhZGVyID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9IRUFERVJfQ09MVU1OLCB2YWx1ZSB8fCB7fSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2x1bW4gZGVmaW5pdGlvbnMgdG8gYmUgdXNlZCBhcyB0aGUgYmFzZSBkZWZhdWx0IGRlZmluaXRpb25zIGZvciB0aGUgbmV3IHRyYW5zcG9zZWQgY29sdW1ucy5cbiAgICogVGhpcyBpcyBhbiBvcHRpb25hbCB2YWx1ZSwgd2hlbiBub3Qgc2V0IG5vIGRlZmF1bHQncyBhcmUgYXBwbGllZC5cbiAgICovXG4gIEBJbnB1dCgndHJhbnNwb3NlRGVmYXVsdENvbCcpIGRlZmF1bHRDb2w6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgd2lsbCB0cnkgdG8gdXNlIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBvZiB0aGUgY2VsbCwgaS5lLiB0aGUgdGVtcGxhdGUgdGhhdCB3b3VsZCBoYXZlIGJlZW4gdXNlZFxuICAgKiBpZiB3ZSBkaWQgbm90IHRyYW5zcG9zZSBhdCBhbGwuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KCkgbWF0Y2hUZW1wbGF0ZXM6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBlbmFibGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9oZWFkZXI6IFBibENvbHVtbkRlZmluaXRpb24gPSBERUZBVUxUX0hFQURFUl9DT0xVTU47XG4gIHByaXZhdGUgdGFibGVTdGF0ZTogVHJhbnNwb3NlVGFibGVTZXNzaW9uO1xuICBwcml2YXRlIGNvbHVtbnM6IFBibENvbHVtbltdO1xuICBwcml2YXRlIHNlbGZDb2x1bW46IFBibENvbHVtbjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgY29uc3QgdHJhbnNwb3NlUGx1Z2luID0gY29uZmlnLmdldCgndHJhbnNwb3NlUGx1Z2luJyk7XG4gICAgaWYgKHRyYW5zcG9zZVBsdWdpbikge1xuICAgICAgdGhpcy5oZWFkZXIgPSB0cmFuc3Bvc2VQbHVnaW4uaGVhZGVyO1xuICAgICAgdGhpcy5kZWZhdWx0Q29sID0gdHJhbnNwb3NlUGx1Z2luLmRlZmF1bHRDb2wgfHwge307XG4gICAgICB0aGlzLm1hdGNoVGVtcGxhdGVzID0gdHJhbnNwb3NlUGx1Z2luLm1hdGNoVGVtcGxhdGVzIHx8IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgICB0aGlzLmRpc2FibGUoZmFsc2UpO1xuICB9XG5cbiAgZGlzYWJsZSh1cGRhdGVUYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLnRhYmxlU3RhdGUpIHtcbiAgICAgIGNvbnN0IHsgdGFibGVTdGF0ZSB9ID0gdGhpcztcbiAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuc2VsZkNvbHVtbiA9IHRoaXMudGFibGVTdGF0ZSA9IHRoaXMuY29sdW1ucyA9IHRoaXMuc2VsZkNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgIHRhYmxlU3RhdGUuZGVzdHJveSh1cGRhdGVUYWJsZSk7XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlKHJlZnJlc2hEYXRhU291cmNlOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YWJsZVN0YXRlKSB7XG4gICAgICB0aGlzLmRpc2FibGUoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZUZhY3RvcnlXcmFwcGVyID0gKHJlc3VsdHM6IGFueVtdKSA9PiB7XG4gICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICBjb25zdCBsb2NhbDogUGJsTmdyaWRDb2x1bW5EZWZpbml0aW9uU2V0ID0gdGhpcy50YWJsZS5jb2x1bW5zID0gY29sdW1uRmFjdG9yeSgpXG4gICAgICAgICAgLmRlZmF1bHQodGhpcy5kZWZhdWx0Q29sIHx8IHt9KVxuICAgICAgICAgIC50YWJsZShcbiAgICAgICAgICAgIHRoaXMuc2VsZkNvbHVtbixcbiAgICAgICAgICAgIC4uLnJlc3VsdHMubWFwKGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMudGFibGVTdGF0ZS5jb2x1bW5zSW5wdXQ7XG4gICAgICAgIGxvY2FsLmhlYWRlciA9IHByZXYuaGVhZGVyO1xuICAgICAgICBsb2NhbC5oZWFkZXJHcm91cCA9IHByZXYuaGVhZGVyR3JvdXA7XG4gICAgICAgIGxvY2FsLmZvb3RlciA9IHByZXYuZm9vdGVyO1xuICAgICAgICBsb2NhbFtMT0NBTF9DT0xVTU5fREVGXSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy50YWJsZS5pbnZhbGlkYXRlQ29sdW1ucygpO1xuXG4gICAgICAgIGNvbnN0IG1hdGNoVGVtcGxhdGVzID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHRoaXMubWF0Y2hUZW1wbGF0ZXMpO1xuICAgICAgICBjb25zdCB7IHByb3AgfSA9IHRoaXMuX2hlYWRlcjtcbiAgICAgICAgY29uc3QgY29sdW1uS2V5c1RvUHJveHk6IEFycmF5PGtleW9mIFBibENvbHVtbj4gPSBbJ3R5cGUnXTtcblxuICAgICAgICBpZiAobWF0Y2hUZW1wbGF0ZXMpIHtcbiAgICAgICAgICBjb2x1bW5LZXlzVG9Qcm94eS5wdXNoKCdjZWxsVHBsJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiBUaGUgZm9sbG93aW5nIGxvZ2ljIGlzIG5vdCBmb3IgdGhlIGZhaW50IG9mIGhlYXJ0LlxuICAgICAgICAgICBCYXNpY2FsbHksIHRoZSB0cmFuc3Bvc2UgcGx1Z2luIGRvZXMgbm90IHN3YXAgdGhlIGFjdHVhbCBkYXRhIGJ1dCB0aGUgY29sdW1ucy5cbiAgICAgICAgICAgV2hlbiB0cmFuc3Bvc2luZywgYWxsIHJvd3Mgd2lsbCBzd2FwIHRvIGNvbHVtbnMgc28sIEEgbmV3IGNvbHVtbiBkZWZpbml0aW9uIGlzIGNyZWF0ZWQsXG4gICAgICAgICAgIHdpdGggY29sdW1ucyBlcXVhbCB0byB0aGUgdG90YWwgbnVtYmVyIG9yIGl0ZW1zIGluIHRoZSBkYXRhc291cmNlLlxuICAgICAgICAgICBFYWNoIGNvbHVtbiAobmV3IG9uZSkgcmVwcmVzZW50cyBhIHJvdyBzbyB3ZSBzYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBhY3R1YWwgcm93IGluIHRoZSBuZXcgY29sdW1uLlxuXG4gICAgICAgICAgIFRoZSBuZXh0IHN0ZXAgaXMgdG8gY3JlYXRlIGEgbmV3IGRhdGFzb3VyY2UsIHRoZSBuZXcgZGF0YXNvdXJjZSBpcyBzaW1wbHkgYSBjb2xsZWN0aW9uIG9mIGFsbCBvZiB0aGUgb3JpZ2luYWwgY29sdW1ucy5cblxuICAgICAgICAgICBOb3cgd2hlbiBgZ2V0VmFsdWVgIGlzIGNhbGxlZCBvbiB0aGUgbmV3IGNvbHVtbiBpdCBpcyBjYWxsZWQgd2l0aCBhIFwicm93XCIgd2hpY2ggaXMgdGhlIG9yaWdpbmFsIGNvbHVtbi5cbiAgICAgICAgICAgQmVjYXVzZSB0aGUgbmV3IGNvbHVtbiBoYXMgYSByZWZlcmVuY2UgdG8gdGhlIGFjdHVhbCAob3JpZ2luYWwpIHJvdyB3ZSBjYW4gY2FsbCB0aGUgYGdldFZhbHVlYCBvbiB0aGUgb2xkIGNvbHVtbiB3aXRoIHRoZSBhY3R1YWwgcm93LlxuXG4gICAgICAgICAgIEluIHRoaXMgcHJvY2VzcywgYWxsIG9mIHRoZSBjb2x1bW4gbWV0YWRhdGEgcmVsYXRlZCB0byB0aGUgcHJlc2VudGF0aW9uIGxheWVyIGlzIGxvc3QuIEZvciBleGFtcGxlLCBpZiBDU1MgY2xhc3NlcyB3aWxsXG4gICAgICAgICAgIG5vdCBiZSB0aGUgc2FtZSwgdGVtcGxhdGVzLCB0eXBlcyBldGMuLi4gVGhpcyBpcyBiZWNhdXNlIHdoZW4gdGhlIGdyaWQgcmVuZGVycyBhIGNlbGwgdGhhdCBjZWxsIGhhcyBhIHNpbmdsZSB0ZW1wbGF0ZSBhY3Jvc3NcbiAgICAgICAgICAgYWxsIHJvd3MgYnV0IG5vdyB3ZSBuZWVkIGEgZGlmZmVyZW50IHRlbXBsYXRlIGZvciBldmVyeSByb3cuXG5cbiAgICAgICAgICAgV2UgY2FuIHByb3h5IGEgKFZFUlkpIGxpbWl0ZWQgc2V0IG9mIG1ldGFkYXRhIHByb3BlcnRpZXMgcmVsYXRlZCB0byB0aGUgcHJlc2VudGF0aW9uIGxheWVyLCB2YWxpZCBvbmx5IG9uIHJlbmRlciB0aW1lLlxuICAgICAgICAgICBUaGlzIHJlbGF5cyBvbiB0aGUgZmFjdCB0aGF0IGVhY2ggcm93IGlzIHJlbmRlcmVkIGNvbXBsZXRlLCBzdGFydGluZyBmcm9tIHRoZSBmaXJzdCBjZWxsIHRvIHRoZSBsYXN0IHNvXG4gICAgICAgICAgIHdpdGggdGhhdCB3ZSBjYW4gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBjb2x1bW4gdGhhIHRoYXQgbm93IHJlcHJlc2VudHMgdGhlIHdob2xlIHJvdy5cbiAgICAgICAgICovXG4gICAgICAgIGxldCBjdXJyZW50Q29sdW1uOiBQYmxDb2x1bW47XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiB0aGlzLnRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucykge1xuICAgICAgICAgIGlmIChjLm9yZ1Byb3AgPT09IHByb3ApIHtcbiAgICAgICAgICAgIGMuZ2V0VmFsdWUgPSAocm93OiBQYmxDb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgY3VycmVudENvbHVtbiA9IHJvdztcbiAgICAgICAgICAgICAgcmV0dXJuIHJvdy5sYWJlbCBhcyBhbnk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLmdldFZhbHVlID0gZ2V0Q2VsbFZhbHVlVHJhbnNmb3JtZWQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb2x1bW5LZXlzVG9Qcm94eSkge1xuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYywga2V5LCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZ2V0OiAoKSA9PiBjdXJyZW50Q29sdW1uICYmIGN1cnJlbnRDb2x1bW5ba2V5XSwgc2V0OiB2YWx1ZSA9PiB7fSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICB0aGlzLnRhYmxlU3RhdGUgPSBuZXcgVHJhbnNwb3NlVGFibGVTZXNzaW9uKFxuICAgICAgdGhpcy50YWJsZSxcbiAgICAgIHRoaXMucGx1Z2luQ3RybCxcbiAgICAgICgpID0+IHRoaXMudXBkYXRlQ29sdW1ucyh0aGlzLnRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucyksXG4gICAgICBzb3VyY2VGYWN0b3J5V3JhcHBlcixcbiAgICApO1xuXG4gICAgaWYgKHJlZnJlc2hEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICAgIHRoaXMudGFibGUuZHMucmVmcmVzaCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50YWJsZS5kcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnRhYmxlLmRzLnJlZnJlc2goVklSVFVBTF9SRUZSRVNIKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbHVtbnMoY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBjb25zdCB7IHByb3AgfSA9IHRoaXMuX2hlYWRlcjtcbiAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1ucykge1xuICAgICAgaWYgKGMub3JnUHJvcCA9PT0gcHJvcCkge1xuICAgICAgICB0aGlzLnNlbGZDb2x1bW4gPSBjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5zZWxmQ29sdW1uKSB7XG4gICAgICAvLyBUT0RPOiBkb24ndCBhc3N1bWUgY29sdW1uc1swXVxuICAgICAgdGhpcy5zZWxmQ29sdW1uID0gbmV3IFBibENvbHVtbih0aGlzLl9oZWFkZXIsIHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29sdW1uU3RvcmUuZ3JvdXBTdG9yZSk7XG4gICAgfVxuICB9XG59XG4iXX0=