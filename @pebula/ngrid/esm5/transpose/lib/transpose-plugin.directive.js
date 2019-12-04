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
var DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
/** @type {?} */
var PLUGIN_KEY = 'transpose';
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
var PblNgridTransposePluginDirective = /** @class */ (function () {
    function PblNgridTransposePluginDirective(grid, pluginCtrl, config) {
        this.grid = grid;
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
         * > The header column behave like any other column and you can also provide define it in the `column` property on the grid.
         * When using this approach the column defined on the grid is used as is (no merging). Just make sure you use the right `prop` value for it.
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
         * > The header column behave like any other column and you can also provide define it in the `column` property on the grid.
         * When using this approach the column defined on the grid is used as is (no merging). Just make sure you use the right `prop` value for it.
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
        this._removePlugin(this.grid);
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
        if (this.gridState) {
            var tableState = this.gridState;
            this.columns = this.selfColumn = this.gridState = this.columns = this.selfColumn = undefined;
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
        if (this.gridState) {
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
                var local = _this.grid.columns = (_a = columnFactory()
                    .default(_this.defaultCol || {})).table.apply(_a, tslib_1.__spread([_this.selfColumn], results.map(createTransformedColumn))).build();
                /** @type {?} */
                var prev = _this.gridState.columnsInput;
                local.header = prev.header;
                local.headerGroup = prev.headerGroup;
                local.footer = prev.footer;
                local[LOCAL_COLUMN_DEF] = true;
                _this.grid.invalidateColumns();
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
                    for (var _d = tslib_1.__values(_this.grid.columnApi.visibleColumns), _e = _d.next(); !_e.done; _e = _d.next()) {
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
        this.gridState = new TransposeTableSession(this.grid, this.pluginCtrl, (/**
         * @return {?}
         */
        function () { return _this.updateColumns(_this.grid.columnApi.visibleColumns); }), sourceFactoryWrapper);
        if (refreshDataSource) {
            this.pluginCtrl.extApi.contextApi.clear();
            this.grid.ds.refresh();
        }
        else if (this.grid.ds.length > 0) {
            this.grid.ds.refresh(VIRTUAL_REFRESH);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUNMLGFBQWEsRUFDYixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLDJCQUEyQixFQUMzQixpQkFBaUIsRUFDakIsd0JBQXdCLEVBQ3hCLFNBQVMsRUFDVCxXQUFXLEdBQ1osTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFckUscUJBQXFCLEdBQUcsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSx3REFBd0QsRUFBRTs7SUFpQmhILFVBQVUsR0FBZ0IsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxRnpDLDBDQUFvQixJQUE0QixFQUFVLFVBQW9DLEVBQUUsTUFBNkI7UUFBekcsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQU50RixZQUFPLEdBQXdCLHFCQUFxQixDQUFDO1FBTzNELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBQ3RELGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGlC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QUN0QjthQUNGOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixnQ0FBZ0M7WUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM5RjtJQUNILENBQUM7O2dCQXpIeUIsaUJBQWlCO2dCQUEyQix3QkFBd0I7Z0JBQVUscUJBQXFCOzs7Z0JBL0Q5SCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7Ozs7Z0JBaEQ3QyxpQkFBaUI7Z0JBQ2pCLHdCQUF3QjtnQkFKeEIscUJBQXFCOzs7NEJBdURwQixLQUFLO3lCQWtDTCxLQUFLLFNBQUMsb0JBQW9COzZCQVExQixLQUFLLFNBQUMscUJBQXFCO2lDQVEzQixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXBESyxnQ0FBZ0M7UUFINUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBRS9CLElBQUksRUFBRTtpREE4RHFCLGlCQUFpQixFQUEyQix3QkFBd0IsRUFBVSxxQkFBcUI7T0E3RGxILGdDQUFnQyxDQXVMNUM7SUFBRCx1Q0FBQztDQUFBLElBQUE7U0F2TFksZ0NBQWdDOzs7Ozs7O0lBNEMzQyxzREFBdUU7Ozs7Ozs7O0lBUXZFLDBEQUFpQzs7Ozs7SUFFakMsbURBQXlCOzs7OztJQUN6QixtREFBNkQ7Ozs7O0lBQzdELHFEQUF5Qzs7Ozs7SUFDekMsbURBQTZCOzs7OztJQUM3QixzREFBOEI7Ozs7O0lBQzlCLHlEQUE4RDs7Ozs7SUFFbEQsZ0RBQW9DOzs7OztJQUFFLHNEQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHtcbiAgY29sdW1uRmFjdG9yeSxcbiAgUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICBQYmxDb2x1bW5EZWZpbml0aW9uLFxuICBQYmxOZ3JpZENvbHVtbkRlZmluaXRpb25TZXQsXG4gIFBibE5ncmlkQ29tcG9uZW50LFxuICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gIFBibENvbHVtbixcbiAgTmdyaWRQbHVnaW4sXG59IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24sIExPQ0FMX0NPTFVNTl9ERUYsIFZJUlRVQUxfUkVGUkVTSCB9IGZyb20gJy4vdHJhbnNwb3NlLXRhYmxlLXNlc3Npb24nO1xuaW1wb3J0IHsgZ2V0Q2VsbFZhbHVlVHJhbnNmb3JtZWQsIGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IERFRkFVTFRfSEVBREVSX0NPTFVNTiA9IHsgcHJvcDogJ19fdHJhbnNwb3NlX18nLCBjc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwgcGJsLW5ncmlkLXRyYW5zcG9zZWQtaGVhZGVyLWNlbGwnIH07XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHRyYW5zcG9zZVBsdWdpbj86IHtcbiAgICAgIGhlYWRlcj86IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj47XG4gICAgICBkZWZhdWx0Q29sPzogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcbiAgICAgIG1hdGNoVGVtcGxhdGVzPzogYm9vbGVhbjtcbiAgICB9XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHRyYW5zcG9zZT86IFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlO1xuICB9XG59XG5jb25zdCBQTFVHSU5fS0VZOiAndHJhbnNwb3NlJyA9ICd0cmFuc3Bvc2UnO1xuXG4vKipcbiAqIFRyYW5zcG9zZSBwbHVnaW4uXG4gKlxuICogVGhpcyBwbHVnaW4gd2lsbCBzd2FwcyBhcm91bmQgdGhlIHJvd3MgYW5kIGNvbHVtbnMgb2YgdGhlIGdyaWQuXG4gKlxuICogQSAqKnJlZ3VsYXIgZ3JpZCoqIChub3QgdHJhbnNwb3NlZCkgcmVwcmVzZW50cyByb3dzIGhvcml6b250YWxseTpcbiAqXG4gKiAtIEVhY2ggaG9yaXpvbnRhbCByb3cgcmVwcmVzZW50cyBhbiBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxuICogLSBFYWNoIHZlcnRpY2FsIGNvbHVtbiByZXByZXNlbnRzIHRoZSBzYW1lIHByb3BlcnR5IG9mIGFsbCByb3dzIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEEgKip0cmFuc3Bvc2VkKiogZ3JpZCByZXByZXNlbnRzIHJvdyB2ZXJ0aWNhbGx5OlxuICpcbiAqIC0gRWFjaCBob3Jpem9udGFsIHJvdyByZXByZXNlbnRzIHRoZSBzYW1lIHByb3BlcnR5IG9mIGFsbCByb3dzIGluIHRoZSBjb2xsZWN0aW9uLlxuICogLSBFYWNoIHZlcnRpY2FsIHJvdyByZXByZXNlbnRzIGFuIGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogPiBOb3RlIHRoYXQgdHJhbnNwb3NpbmcgYSBncmlkIG1pZ2h0IG5vdCBwbGF5IG5pY2Ugd2l0aCBvdGhlciBwbHVnaW5zIGFuZC9vciBmZWF0dXJlcy5cbiAqIEZvciBleGFtcGxlLCB1c2luZyBwYWdpbmF0aW9uIHdpdGggdHJhbnNwb3NlIG1ha2Ugbm8gc2Vuc2UuXG4gKi9cblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFt0cmFuc3Bvc2VdJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkVHJhbnNwb3NlUGx1Z2luRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBnZXQgdHJhbnNwb3NlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5lbmFibGVkOyB9O1xuICBzZXQgdHJhbnNwb3NlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5lbmFibGVkKSB7XG4gICAgICBjb25zdCBpc0ZpcnN0ID0gdGhpcy5lbmFibGVkID09PSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmVuYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbmFibGUoIWlzRmlyc3QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2x1bW4gZGVmaW5pdGlvbnMgZm9yIHRoZSBuZXcgaGVhZGVyIGNvbHVtbiwgdGhpcyBpcyB0aGUgY29sdW1uIHRoZSBmaXJzdCBjb2x1bW4gdGhhdFxuICAgKiB3aWxsIGRpc3BsYXkgYWxsIHRoZSBoZWFkZXJzLlxuICAgKlxuICAgKiBUaGlzIGlzIGFuIG9wdGlvbmFsIHZhbHVlLCB3aGVuIG5vdCBzZXQgYSBkZWZhdWx0IGNvbHVtbiBzZXR0aW5ncyBpcyB1c2VkOlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiB7XG4gICAqICBwcm9wOiAnX190cmFuc3Bvc2VfXycsXG4gICAqICBjc3M6ICdwYmwtbmdyaWQtaGVhZGVyLWNlbGwgcGJsLW5ncmlkLXRyYW5zcG9zZWQtaGVhZGVyLWNlbGwnLFxuICAgKiB9XG4gICAqIGBgYFxuICAgKlxuICAgKiBXaGVuIHNldCwgdGhlIG5ldyBjb2x1bW4gdmFsdWVzIHdpbGwgbWVyZ2UgaW50byB0aGUgZGVmYXVsdCBkZWZpbml0aW9ucywgb3ZlcnJpZGluZyBleGlzdGluZyBwcm9wZXJ0aWVzXG4gICAqIHNldCBvbiB0aGUgZGVmYXVsdCBjb2x1bW4gc2V0dGluZ3MuXG4gICAqXG4gICAqID4gVGhlIGhlYWRlciBjb2x1bW4gYmVoYXZlIGxpa2UgYW55IG90aGVyIGNvbHVtbiBhbmQgeW91IGNhbiBhbHNvIHByb3ZpZGUgZGVmaW5lIGl0IGluIHRoZSBgY29sdW1uYCBwcm9wZXJ0eSBvbiB0aGUgZ3JpZC5cbiAgICogV2hlbiB1c2luZyB0aGlzIGFwcHJvYWNoIHRoZSBjb2x1bW4gZGVmaW5lZCBvbiB0aGUgZ3JpZCBpcyB1c2VkIGFzIGlzIChubyBtZXJnaW5nKS4gSnVzdCBtYWtlIHN1cmUgeW91IHVzZSB0aGUgcmlnaHQgYHByb3BgIHZhbHVlIGZvciBpdC5cbiAgICogZS5nLiBpZiBgaGVhZGVyYCBpcyBub3Qgc2V0IGhlcmUgaXRzIGBfX3RyYW5zcG9zZV9fYCBvdGhlcndpc2UsIHRoZSBhY3R1YWwgYHByb3BgIHZhbHVlLlxuICAgKi9cbiAgQElucHV0KCd0cmFuc3Bvc2VIZWFkZXJDb2wnKSBzZXQgaGVhZGVyKHZhbHVlOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+KSB7XG4gICAgdGhpcy5faGVhZGVyID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9IRUFERVJfQ09MVU1OLCB2YWx1ZSB8fCB7fSlcbiAgfVxuXG4gIC8qKlxuICAgKiBDb2x1bW4gZGVmaW5pdGlvbnMgdG8gYmUgdXNlZCBhcyB0aGUgYmFzZSBkZWZhdWx0IGRlZmluaXRpb25zIGZvciB0aGUgbmV3IHRyYW5zcG9zZWQgY29sdW1ucy5cbiAgICogVGhpcyBpcyBhbiBvcHRpb25hbCB2YWx1ZSwgd2hlbiBub3Qgc2V0IG5vIGRlZmF1bHQncyBhcmUgYXBwbGllZC5cbiAgICovXG4gIEBJbnB1dCgndHJhbnNwb3NlRGVmYXVsdENvbCcpIGRlZmF1bHRDb2w6IFBhcnRpYWw8UGJsQ29sdW1uRGVmaW5pdGlvbj47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgd2lsbCB0cnkgdG8gdXNlIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBvZiB0aGUgY2VsbCwgaS5lLiB0aGUgdGVtcGxhdGUgdGhhdCB3b3VsZCBoYXZlIGJlZW4gdXNlZFxuICAgKiBpZiB3ZSBkaWQgbm90IHRyYW5zcG9zZSBhdCBhbGwuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKi9cbiAgQElucHV0KCkgbWF0Y2hUZW1wbGF0ZXM6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBlbmFibGVkOiBib29sZWFuO1xuICBwcml2YXRlIF9oZWFkZXI6IFBibENvbHVtbkRlZmluaXRpb24gPSBERUZBVUxUX0hFQURFUl9DT0xVTU47XG4gIHByaXZhdGUgZ3JpZFN0YXRlOiBUcmFuc3Bvc2VUYWJsZVNlc3Npb247XG4gIHByaXZhdGUgY29sdW1uczogUGJsQ29sdW1uW107XG4gIHByaXZhdGUgc2VsZkNvbHVtbjogUGJsQ29sdW1uO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46IChncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gICAgY29uc3QgdHJhbnNwb3NlUGx1Z2luID0gY29uZmlnLmdldCgndHJhbnNwb3NlUGx1Z2luJyk7XG4gICAgaWYgKHRyYW5zcG9zZVBsdWdpbikge1xuICAgICAgdGhpcy5oZWFkZXIgPSB0cmFuc3Bvc2VQbHVnaW4uaGVhZGVyO1xuICAgICAgdGhpcy5kZWZhdWx0Q29sID0gdHJhbnNwb3NlUGx1Z2luLmRlZmF1bHRDb2wgfHwge307XG4gICAgICB0aGlzLm1hdGNoVGVtcGxhdGVzID0gdHJhbnNwb3NlUGx1Z2luLm1hdGNoVGVtcGxhdGVzIHx8IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICAgIHRoaXMuZGlzYWJsZShmYWxzZSk7XG4gIH1cblxuICBkaXNhYmxlKHVwZGF0ZVRhYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZFN0YXRlKSB7XG4gICAgICBjb25zdCB7IGdyaWRTdGF0ZTogdGFibGVTdGF0ZSB9ID0gdGhpcztcbiAgICAgIHRoaXMuY29sdW1ucyA9IHRoaXMuc2VsZkNvbHVtbiA9IHRoaXMuZ3JpZFN0YXRlID0gdGhpcy5jb2x1bW5zID0gdGhpcy5zZWxmQ29sdW1uID0gdW5kZWZpbmVkO1xuICAgICAgdGFibGVTdGF0ZS5kZXN0cm95KHVwZGF0ZVRhYmxlKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGUocmVmcmVzaERhdGFTb3VyY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRTdGF0ZSkge1xuICAgICAgdGhpcy5kaXNhYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VGYWN0b3J5V3JhcHBlciA9IChyZXN1bHRzOiBhbnlbXSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgY29uc3QgbG9jYWw6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCA9IHRoaXMuZ3JpZC5jb2x1bW5zID0gY29sdW1uRmFjdG9yeSgpXG4gICAgICAgICAgLmRlZmF1bHQodGhpcy5kZWZhdWx0Q29sIHx8IHt9KVxuICAgICAgICAgIC50YWJsZShcbiAgICAgICAgICAgIHRoaXMuc2VsZkNvbHVtbixcbiAgICAgICAgICAgIC4uLnJlc3VsdHMubWFwKGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuZ3JpZFN0YXRlLmNvbHVtbnNJbnB1dDtcbiAgICAgICAgbG9jYWwuaGVhZGVyID0gcHJldi5oZWFkZXI7XG4gICAgICAgIGxvY2FsLmhlYWRlckdyb3VwID0gcHJldi5oZWFkZXJHcm91cDtcbiAgICAgICAgbG9jYWwuZm9vdGVyID0gcHJldi5mb290ZXI7XG4gICAgICAgIGxvY2FsW0xPQ0FMX0NPTFVNTl9ERUZdID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmdyaWQuaW52YWxpZGF0ZUNvbHVtbnMoKTtcblxuICAgICAgICBjb25zdCBtYXRjaFRlbXBsYXRlcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh0aGlzLm1hdGNoVGVtcGxhdGVzKTtcbiAgICAgICAgY29uc3QgeyBwcm9wIH0gPSB0aGlzLl9oZWFkZXI7XG4gICAgICAgIGNvbnN0IGNvbHVtbktleXNUb1Byb3h5OiBBcnJheTxrZXlvZiBQYmxDb2x1bW4+ID0gWyd0eXBlJ107XG5cbiAgICAgICAgaWYgKG1hdGNoVGVtcGxhdGVzKSB7XG4gICAgICAgICAgY29sdW1uS2V5c1RvUHJveHkucHVzaCgnY2VsbFRwbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogVGhlIGZvbGxvd2luZyBsb2dpYyBpcyBub3QgZm9yIHRoZSBmYWludCBvZiBoZWFydC5cbiAgICAgICAgICAgQmFzaWNhbGx5LCB0aGUgdHJhbnNwb3NlIHBsdWdpbiBkb2VzIG5vdCBzd2FwIHRoZSBhY3R1YWwgZGF0YSBidXQgdGhlIGNvbHVtbnMuXG4gICAgICAgICAgIFdoZW4gdHJhbnNwb3NpbmcsIGFsbCByb3dzIHdpbGwgc3dhcCB0byBjb2x1bW5zIHNvLCBBIG5ldyBjb2x1bW4gZGVmaW5pdGlvbiBpcyBjcmVhdGVkLFxuICAgICAgICAgICB3aXRoIGNvbHVtbnMgZXF1YWwgdG8gdGhlIHRvdGFsIG51bWJlciBvciBpdGVtcyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICAgICAgICAgRWFjaCBjb2x1bW4gKG5ldyBvbmUpIHJlcHJlc2VudHMgYSByb3cgc28gd2Ugc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIHJvdyBpbiB0aGUgbmV3IGNvbHVtbi5cblxuICAgICAgICAgICBUaGUgbmV4dCBzdGVwIGlzIHRvIGNyZWF0ZSBhIG5ldyBkYXRhc291cmNlLCB0aGUgbmV3IGRhdGFzb3VyY2UgaXMgc2ltcGx5IGEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIG9yaWdpbmFsIGNvbHVtbnMuXG5cbiAgICAgICAgICAgTm93IHdoZW4gYGdldFZhbHVlYCBpcyBjYWxsZWQgb24gdGhlIG5ldyBjb2x1bW4gaXQgaXMgY2FsbGVkIHdpdGggYSBcInJvd1wiIHdoaWNoIGlzIHRoZSBvcmlnaW5hbCBjb2x1bW4uXG4gICAgICAgICAgIEJlY2F1c2UgdGhlIG5ldyBjb2x1bW4gaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBhY3R1YWwgKG9yaWdpbmFsKSByb3cgd2UgY2FuIGNhbGwgdGhlIGBnZXRWYWx1ZWAgb24gdGhlIG9sZCBjb2x1bW4gd2l0aCB0aGUgYWN0dWFsIHJvdy5cblxuICAgICAgICAgICBJbiB0aGlzIHByb2Nlc3MsIGFsbCBvZiB0aGUgY29sdW1uIG1ldGFkYXRhIHJlbGF0ZWQgdG8gdGhlIHByZXNlbnRhdGlvbiBsYXllciBpcyBsb3N0LiBGb3IgZXhhbXBsZSwgaWYgQ1NTIGNsYXNzZXMgd2lsbFxuICAgICAgICAgICBub3QgYmUgdGhlIHNhbWUsIHRlbXBsYXRlcywgdHlwZXMgZXRjLi4uIFRoaXMgaXMgYmVjYXVzZSB3aGVuIHRoZSBncmlkIHJlbmRlcnMgYSBjZWxsIHRoYXQgY2VsbCBoYXMgYSBzaW5nbGUgdGVtcGxhdGUgYWNyb3NzXG4gICAgICAgICAgIGFsbCByb3dzIGJ1dCBub3cgd2UgbmVlZCBhIGRpZmZlcmVudCB0ZW1wbGF0ZSBmb3IgZXZlcnkgcm93LlxuXG4gICAgICAgICAgIFdlIGNhbiBwcm94eSBhIChWRVJZKSBsaW1pdGVkIHNldCBvZiBtZXRhZGF0YSBwcm9wZXJ0aWVzIHJlbGF0ZWQgdG8gdGhlIHByZXNlbnRhdGlvbiBsYXllciwgdmFsaWQgb25seSBvbiByZW5kZXIgdGltZS5cbiAgICAgICAgICAgVGhpcyByZWxheXMgb24gdGhlIGZhY3QgdGhhdCBlYWNoIHJvdyBpcyByZW5kZXJlZCBjb21wbGV0ZSwgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3QgY2VsbCB0byB0aGUgbGFzdCBzb1xuICAgICAgICAgICB3aXRoIHRoYXQgd2UgY2FuIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgY29sdW1uIHRoYSB0aGF0IG5vdyByZXByZXNlbnRzIHRoZSB3aG9sZSByb3cuXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgY3VycmVudENvbHVtbjogUGJsQ29sdW1uO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5ncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucykge1xuICAgICAgICAgIGlmIChjLm9yZ1Byb3AgPT09IHByb3ApIHtcbiAgICAgICAgICAgIGMuZ2V0VmFsdWUgPSAocm93OiBQYmxDb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgY3VycmVudENvbHVtbiA9IHJvdztcbiAgICAgICAgICAgICAgcmV0dXJuIHJvdy5sYWJlbCBhcyBhbnk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLmdldFZhbHVlID0gZ2V0Q2VsbFZhbHVlVHJhbnNmb3JtZWQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb2x1bW5LZXlzVG9Qcm94eSkge1xuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYywga2V5LCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZ2V0OiAoKSA9PiBjdXJyZW50Q29sdW1uICYmIGN1cnJlbnRDb2x1bW5ba2V5XSwgc2V0OiB2YWx1ZSA9PiB7fSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICB0aGlzLmdyaWRTdGF0ZSA9IG5ldyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24oXG4gICAgICB0aGlzLmdyaWQsXG4gICAgICB0aGlzLnBsdWdpbkN0cmwsXG4gICAgICAoKSA9PiB0aGlzLnVwZGF0ZUNvbHVtbnModGhpcy5ncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucyksXG4gICAgICBzb3VyY2VGYWN0b3J5V3JhcHBlcixcbiAgICApO1xuXG4gICAgaWYgKHJlZnJlc2hEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICAgIHRoaXMuZ3JpZC5kcy5yZWZyZXNoKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdyaWQuZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5ncmlkLmRzLnJlZnJlc2goVklSVFVBTF9SRUZSRVNIKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbHVtbnMoY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBjb25zdCB7IHByb3AgfSA9IHRoaXMuX2hlYWRlcjtcbiAgICB0aGlzLmNvbHVtbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY29sdW1ucykge1xuICAgICAgaWYgKGMub3JnUHJvcCA9PT0gcHJvcCkge1xuICAgICAgICB0aGlzLnNlbGZDb2x1bW4gPSBjO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2x1bW5zLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdGhpcy5zZWxmQ29sdW1uKSB7XG4gICAgICAvLyBUT0RPOiBkb24ndCBhc3N1bWUgY29sdW1uc1swXVxuICAgICAgdGhpcy5zZWxmQ29sdW1uID0gbmV3IFBibENvbHVtbih0aGlzLl9oZWFkZXIsIHRoaXMucGx1Z2luQ3RybC5leHRBcGkuY29sdW1uU3RvcmUuZ3JvdXBTdG9yZSk7XG4gICAgfVxuICB9XG59XG4iXX0=