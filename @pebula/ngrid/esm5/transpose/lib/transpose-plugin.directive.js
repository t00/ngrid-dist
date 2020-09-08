/**
 * @fileoverview added by tsickle
 * Generated from: lib/transpose-plugin.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread, __values } from "tslib";
import { filter, take } from 'rxjs/operators';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { columnFactory, PblNgridConfigService, PblNgridComponent, PblNgridPluginController, PblColumn, utils, } from '@pebula/ngrid';
import { TransposeTableSession, LOCAL_COLUMN_DEF, VIRTUAL_REFRESH } from './transpose-table-session';
import { getCellValueTransformed, createTransformedColumn } from './utils';
/** @type {?} */
var DEFAULT_HEADER_COLUMN = { prop: '__transpose__', css: 'pbl-ngrid-header-cell pbl-ngrid-transposed-header-cell' };
/** @type {?} */
export var PLUGIN_KEY = 'transpose';
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
        var _this = this;
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
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInit'; })), take(1), utils.unrx(this, this.grid))
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (_this.enabled !== undefined) {
                _this.updateState(undefined, _this.enabled);
            }
        }));
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
            if (value !== this.enabled && this.grid.isInit) {
                this.updateState(this.enabled, value);
            }
            this.enabled = value;
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
        utils.unrx.kill(this);
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
            var gridState = this.gridState;
            this.columns = this.selfColumn = this.gridState = this.columns = this.selfColumn = undefined;
            gridState.destroy(updateTable);
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
                    .default(_this.defaultCol || {})).table.apply(_a, __spread([_this.selfColumn], results.map(createTransformedColumn))).build();
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
                    for (var _d = __values(_this.grid.columnApi.visibleColumns), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                                for (var columnKeysToProxy_1 = (e_2 = void 0, __values(columnKeysToProxy)), columnKeysToProxy_1_1 = columnKeysToProxy_1.next(); !columnKeysToProxy_1_1.done; columnKeysToProxy_1_1 = columnKeysToProxy_1.next()) {
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
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    PblNgridTransposePluginDirective.prototype.updateState = /**
     * @private
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    function (prev, curr) {
        /** @type {?} */
        var isFirst = prev === undefined;
        if (!curr) {
            this.disable(true);
        }
        else {
            this.enable(!isFirst);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3NlLXBsdWdpbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL3RyYW5zcG9zZS8iLCJzb3VyY2VzIjpbImxpYi90cmFuc3Bvc2UtcGx1Z2luLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRTlELE9BQU8sRUFDTCxhQUFhLEVBQ2IscUJBQXFCLEVBR3JCLGlCQUFpQixFQUNqQix3QkFBd0IsRUFDeEIsU0FBUyxFQUNULEtBQUssR0FDTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDckcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHVCQUF1QixFQUFFLE1BQU0sU0FBUyxDQUFDOztJQUVyRSxxQkFBcUIsR0FBRyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLHdEQUF3RCxFQUFFOztBQWlCdEgsTUFBTSxLQUFPLFVBQVUsR0FBZ0IsV0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCbEQ7SUF5REUsMENBQW9CLElBQTRCLEVBQVUsVUFBb0MsRUFBRSxNQUE2QjtRQUE3SCxpQkFvQkM7UUFwQm1CLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFOdEYsWUFBTyxHQUF3QixxQkFBcUIsQ0FBQztRQU8zRCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUN0RCxlQUFlLEdBQUcsTUFBTSxD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LHFCQUFxQjtpQ0FRM0IsS0FBSzs7SUF5SlIsdUNBQUM7Q0FBQSxBQXpNRCxJQXlNQztTQXhNWSxnQ0FBZ0M7Ozs7Ozs7SUF1QzNDLHNEQUF1RTs7Ozs7Ozs7SUFRdkUsMERBQWlDOzs7OztJQUVqQyxtREFBeUI7Ozs7O0lBQ3pCLG1EQUE2RDs7Ozs7SUFDN0QscURBQXlDOzs7OztJQUN6QyxtREFBNkI7Ozs7O0lBQzdCLHNEQUE4Qjs7Ozs7SUFDOUIseURBQThEOzs7OztJQUVsRCxnREFBb0M7Ozs7O0lBQUUsc0RBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQge1xuICBjb2x1bW5GYWN0b3J5LFxuICBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gIFBibENvbHVtbkRlZmluaXRpb24sXG4gIFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCxcbiAgUGJsTmdyaWRDb21wb25lbnQsXG4gIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgUGJsQ29sdW1uLFxuICB1dGlscyxcbn0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFRyYW5zcG9zZVRhYmxlU2Vzc2lvbiwgTE9DQUxfQ09MVU1OX0RFRiwgVklSVFVBTF9SRUZSRVNIIH0gZnJvbSAnLi90cmFuc3Bvc2UtdGFibGUtc2Vzc2lvbic7XG5pbXBvcnQgeyBnZXRDZWxsVmFsdWVUcmFuc2Zvcm1lZCwgY3JlYXRlVHJhbnNmb3JtZWRDb2x1bW4gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9IRUFERVJfQ09MVU1OID0geyBwcm9wOiAnX190cmFuc3Bvc2VfXycsIGNzczogJ3BibC1uZ3JpZC1oZWFkZXItY2VsbCBwYmwtbmdyaWQtdHJhbnNwb3NlZC1oZWFkZXItY2VsbCcgfTtcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdHJhbnNwb3NlUGx1Z2luPzoge1xuICAgICAgaGVhZGVyPzogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPjtcbiAgICAgIGRlZmF1bHRDb2w/OiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+O1xuICAgICAgbWF0Y2hUZW1wbGF0ZXM/OiBib29sZWFuO1xuICAgIH1cbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgdHJhbnNwb3NlPzogUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAndHJhbnNwb3NlJyA9ICd0cmFuc3Bvc2UnO1xuXG4vKipcbiAqIFRyYW5zcG9zZSBwbHVnaW4uXG4gKlxuICogVGhpcyBwbHVnaW4gd2lsbCBzd2FwcyBhcm91bmQgdGhlIHJvd3MgYW5kIGNvbHVtbnMgb2YgdGhlIGdyaWQuXG4gKlxuICogQSAqKnJlZ3VsYXIgZ3JpZCoqIChub3QgdHJhbnNwb3NlZCkgcmVwcmVzZW50cyByb3dzIGhvcml6b250YWxseTpcbiAqXG4gKiAtIEVhY2ggaG9yaXpvbnRhbCByb3cgcmVwcmVzZW50cyBhbiBpdGVtIGluIHRoZSBjb2xsZWN0aW9uLlxuICogLSBFYWNoIHZlcnRpY2FsIGNvbHVtbiByZXByZXNlbnRzIHRoZSBzYW1lIHByb3BlcnR5IG9mIGFsbCByb3dzIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIEEgKip0cmFuc3Bvc2VkKiogZ3JpZCByZXByZXNlbnRzIHJvdyB2ZXJ0aWNhbGx5OlxuICpcbiAqIC0gRWFjaCBob3Jpem9udGFsIHJvdyByZXByZXNlbnRzIHRoZSBzYW1lIHByb3BlcnR5IG9mIGFsbCByb3dzIGluIHRoZSBjb2xsZWN0aW9uLlxuICogLSBFYWNoIHZlcnRpY2FsIHJvdyByZXByZXNlbnRzIGFuIGl0ZW0gaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogPiBOb3RlIHRoYXQgdHJhbnNwb3NpbmcgYSBncmlkIG1pZ2h0IG5vdCBwbGF5IG5pY2Ugd2l0aCBvdGhlciBwbHVnaW5zIGFuZC9vciBmZWF0dXJlcy5cbiAqIEZvciBleGFtcGxlLCB1c2luZyBwYWdpbmF0aW9uIHdpdGggdHJhbnNwb3NlIG1ha2Ugbm8gc2Vuc2UuXG4gKi9cblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW3RyYW5zcG9zZV0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRUcmFuc3Bvc2VQbHVnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGdldCB0cmFuc3Bvc2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmVuYWJsZWQ7IH07XG4gIHNldCB0cmFuc3Bvc2UodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLmVuYWJsZWQgJiYgdGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgdGhpcy51cGRhdGVTdGF0ZSh0aGlzLmVuYWJsZWQsIHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5lbmFibGVkID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQ29sdW1uIGRlZmluaXRpb25zIGZvciB0aGUgbmV3IGhlYWRlciBjb2x1bW4sIHRoaXMgaXMgdGhlIGNvbHVtbiB0aGUgZmlyc3QgY29sdW1uIHRoYXRcbiAgICogd2lsbCBkaXNwbGF5IGFsbCB0aGUgaGVhZGVycy5cbiAgICpcbiAgICogVGhpcyBpcyBhbiBvcHRpb25hbCB2YWx1ZSwgd2hlbiBub3Qgc2V0IGEgZGVmYXVsdCBjb2x1bW4gc2V0dGluZ3MgaXMgdXNlZDpcbiAgICpcbiAgICogYGBganNcbiAgICoge1xuICAgKiAgcHJvcDogJ19fdHJhbnNwb3NlX18nLFxuICAgKiAgY3NzOiAncGJsLW5ncmlkLWhlYWRlci1jZWxsIHBibC1uZ3JpZC10cmFuc3Bvc2VkLWhlYWRlci1jZWxsJyxcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogV2hlbiBzZXQsIHRoZSBuZXcgY29sdW1uIHZhbHVlcyB3aWxsIG1lcmdlIGludG8gdGhlIGRlZmF1bHQgZGVmaW5pdGlvbnMsIG92ZXJyaWRpbmcgZXhpc3RpbmcgcHJvcGVydGllc1xuICAgKiBzZXQgb24gdGhlIGRlZmF1bHQgY29sdW1uIHNldHRpbmdzLlxuICAgKlxuICAgKiA+IFRoZSBoZWFkZXIgY29sdW1uIGJlaGF2ZSBsaWtlIGFueSBvdGhlciBjb2x1bW4gYW5kIHlvdSBjYW4gYWxzbyBwcm92aWRlIGRlZmluZSBpdCBpbiB0aGUgYGNvbHVtbmAgcHJvcGVydHkgb24gdGhlIGdyaWQuXG4gICAqIFdoZW4gdXNpbmcgdGhpcyBhcHByb2FjaCB0aGUgY29sdW1uIGRlZmluZWQgb24gdGhlIGdyaWQgaXMgdXNlZCBhcyBpcyAobm8gbWVyZ2luZykuIEp1c3QgbWFrZSBzdXJlIHlvdSB1c2UgdGhlIHJpZ2h0IGBwcm9wYCB2YWx1ZSBmb3IgaXQuXG4gICAqIGUuZy4gaWYgYGhlYWRlcmAgaXMgbm90IHNldCBoZXJlIGl0cyBgX190cmFuc3Bvc2VfX2Agb3RoZXJ3aXNlLCB0aGUgYWN0dWFsIGBwcm9wYCB2YWx1ZS5cbiAgICovXG4gIEBJbnB1dCgndHJhbnNwb3NlSGVhZGVyQ29sJykgc2V0IGhlYWRlcih2YWx1ZTogUGFydGlhbDxQYmxDb2x1bW5EZWZpbml0aW9uPikge1xuICAgIHRoaXMuX2hlYWRlciA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfSEVBREVSX0NPTFVNTiwgdmFsdWUgfHwge30pXG4gIH1cblxuICAvKipcbiAgICogQ29sdW1uIGRlZmluaXRpb25zIHRvIGJlIHVzZWQgYXMgdGhlIGJhc2UgZGVmYXVsdCBkZWZpbml0aW9ucyBmb3IgdGhlIG5ldyB0cmFuc3Bvc2VkIGNvbHVtbnMuXG4gICAqIFRoaXMgaXMgYW4gb3B0aW9uYWwgdmFsdWUsIHdoZW4gbm90IHNldCBubyBkZWZhdWx0J3MgYXJlIGFwcGxpZWQuXG4gICAqL1xuICBASW5wdXQoJ3RyYW5zcG9zZURlZmF1bHRDb2wnKSBkZWZhdWx0Q29sOiBQYXJ0aWFsPFBibENvbHVtbkRlZmluaXRpb24+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUsIHdpbGwgdHJ5IHRvIHVzZSB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgb2YgdGhlIGNlbGwsIGkuZS4gdGhlIHRlbXBsYXRlIHRoYXQgd291bGQgaGF2ZSBiZWVuIHVzZWRcbiAgICogaWYgd2UgZGlkIG5vdCB0cmFuc3Bvc2UgYXQgYWxsLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBmYWxzZS5cbiAgICovXG4gIEBJbnB1dCgpIG1hdGNoVGVtcGxhdGVzOiBib29sZWFuO1xuXG4gIHByaXZhdGUgZW5hYmxlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaGVhZGVyOiBQYmxDb2x1bW5EZWZpbml0aW9uID0gREVGQVVMVF9IRUFERVJfQ09MVU1OO1xuICBwcml2YXRlIGdyaWRTdGF0ZTogVHJhbnNwb3NlVGFibGVTZXNzaW9uO1xuICBwcml2YXRlIGNvbHVtbnM6IFBibENvbHVtbltdO1xuICBwcml2YXRlIHNlbGZDb2x1bW46IFBibENvbHVtbjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICAgIGNvbnN0IHRyYW5zcG9zZVBsdWdpbiA9IGNvbmZpZy5nZXQoJ3RyYW5zcG9zZVBsdWdpbicpO1xuICAgIGlmICh0cmFuc3Bvc2VQbHVnaW4pIHtcbiAgICAgIHRoaXMuaGVhZGVyID0gdHJhbnNwb3NlUGx1Z2luLmhlYWRlcjtcbiAgICAgIHRoaXMuZGVmYXVsdENvbCA9IHRyYW5zcG9zZVBsdWdpbi5kZWZhdWx0Q29sIHx8IHt9O1xuICAgICAgdGhpcy5tYXRjaFRlbXBsYXRlcyA9IHRyYW5zcG9zZVBsdWdpbi5tYXRjaFRlbXBsYXRlcyB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvbkluaXQnICksXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIHV0aWxzLnVucngodGhpcywgdGhpcy5ncmlkKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmVuYWJsZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGUodW5kZWZpbmVkLCB0aGlzLmVuYWJsZWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICAgIHRoaXMuZGlzYWJsZShmYWxzZSk7XG4gICAgdXRpbHMudW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgZGlzYWJsZSh1cGRhdGVUYWJsZTogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRTdGF0ZSkge1xuICAgICAgY29uc3QgeyBncmlkU3RhdGUgfSA9IHRoaXM7XG4gICAgICB0aGlzLmNvbHVtbnMgPSB0aGlzLnNlbGZDb2x1bW4gPSB0aGlzLmdyaWRTdGF0ZSA9IHRoaXMuY29sdW1ucyA9IHRoaXMuc2VsZkNvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICAgIGdyaWRTdGF0ZS5kZXN0cm95KHVwZGF0ZVRhYmxlKTtcbiAgICB9XG4gIH1cblxuICBlbmFibGUocmVmcmVzaERhdGFTb3VyY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWRTdGF0ZSkge1xuICAgICAgdGhpcy5kaXNhYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VGYWN0b3J5V3JhcHBlciA9IChyZXN1bHRzOiBhbnlbXSkgPT4ge1xuICAgICAgaWYgKHJlc3VsdHMpIHtcbiAgICAgICAgY29uc3QgbG9jYWw6IFBibE5ncmlkQ29sdW1uRGVmaW5pdGlvblNldCA9IHRoaXMuZ3JpZC5jb2x1bW5zID0gY29sdW1uRmFjdG9yeSgpXG4gICAgICAgICAgLmRlZmF1bHQodGhpcy5kZWZhdWx0Q29sIHx8IHt9KVxuICAgICAgICAgIC50YWJsZShcbiAgICAgICAgICAgIHRoaXMuc2VsZkNvbHVtbixcbiAgICAgICAgICAgIC4uLnJlc3VsdHMubWFwKGNyZWF0ZVRyYW5zZm9ybWVkQ29sdW1uKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLmJ1aWxkKCk7XG5cbiAgICAgICAgY29uc3QgcHJldiA9IHRoaXMuZ3JpZFN0YXRlLmNvbHVtbnNJbnB1dDtcbiAgICAgICAgbG9jYWwuaGVhZGVyID0gcHJldi5oZWFkZXI7XG4gICAgICAgIGxvY2FsLmhlYWRlckdyb3VwID0gcHJldi5oZWFkZXJHcm91cDtcbiAgICAgICAgbG9jYWwuZm9vdGVyID0gcHJldi5mb290ZXI7XG4gICAgICAgIGxvY2FsW0xPQ0FMX0NPTFVNTl9ERUZdID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmdyaWQuaW52YWxpZGF0ZUNvbHVtbnMoKTtcblxuICAgICAgICBjb25zdCBtYXRjaFRlbXBsYXRlcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh0aGlzLm1hdGNoVGVtcGxhdGVzKTtcbiAgICAgICAgY29uc3QgeyBwcm9wIH0gPSB0aGlzLl9oZWFkZXI7XG4gICAgICAgIGNvbnN0IGNvbHVtbktleXNUb1Byb3h5OiBBcnJheTxrZXlvZiBQYmxDb2x1bW4+ID0gWyd0eXBlJ107XG5cbiAgICAgICAgaWYgKG1hdGNoVGVtcGxhdGVzKSB7XG4gICAgICAgICAgY29sdW1uS2V5c1RvUHJveHkucHVzaCgnY2VsbFRwbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogVGhlIGZvbGxvd2luZyBsb2dpYyBpcyBub3QgZm9yIHRoZSBmYWludCBvZiBoZWFydC5cbiAgICAgICAgICAgQmFzaWNhbGx5LCB0aGUgdHJhbnNwb3NlIHBsdWdpbiBkb2VzIG5vdCBzd2FwIHRoZSBhY3R1YWwgZGF0YSBidXQgdGhlIGNvbHVtbnMuXG4gICAgICAgICAgIFdoZW4gdHJhbnNwb3NpbmcsIGFsbCByb3dzIHdpbGwgc3dhcCB0byBjb2x1bW5zIHNvLCBBIG5ldyBjb2x1bW4gZGVmaW5pdGlvbiBpcyBjcmVhdGVkLFxuICAgICAgICAgICB3aXRoIGNvbHVtbnMgZXF1YWwgdG8gdGhlIHRvdGFsIG51bWJlciBvciBpdGVtcyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICAgICAgICAgRWFjaCBjb2x1bW4gKG5ldyBvbmUpIHJlcHJlc2VudHMgYSByb3cgc28gd2Ugc2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgYWN0dWFsIHJvdyBpbiB0aGUgbmV3IGNvbHVtbi5cblxuICAgICAgICAgICBUaGUgbmV4dCBzdGVwIGlzIHRvIGNyZWF0ZSBhIG5ldyBkYXRhc291cmNlLCB0aGUgbmV3IGRhdGFzb3VyY2UgaXMgc2ltcGx5IGEgY29sbGVjdGlvbiBvZiBhbGwgb2YgdGhlIG9yaWdpbmFsIGNvbHVtbnMuXG5cbiAgICAgICAgICAgTm93IHdoZW4gYGdldFZhbHVlYCBpcyBjYWxsZWQgb24gdGhlIG5ldyBjb2x1bW4gaXQgaXMgY2FsbGVkIHdpdGggYSBcInJvd1wiIHdoaWNoIGlzIHRoZSBvcmlnaW5hbCBjb2x1bW4uXG4gICAgICAgICAgIEJlY2F1c2UgdGhlIG5ldyBjb2x1bW4gaGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBhY3R1YWwgKG9yaWdpbmFsKSByb3cgd2UgY2FuIGNhbGwgdGhlIGBnZXRWYWx1ZWAgb24gdGhlIG9sZCBjb2x1bW4gd2l0aCB0aGUgYWN0dWFsIHJvdy5cblxuICAgICAgICAgICBJbiB0aGlzIHByb2Nlc3MsIGFsbCBvZiB0aGUgY29sdW1uIG1ldGFkYXRhIHJlbGF0ZWQgdG8gdGhlIHByZXNlbnRhdGlvbiBsYXllciBpcyBsb3N0LiBGb3IgZXhhbXBsZSwgaWYgQ1NTIGNsYXNzZXMgd2lsbFxuICAgICAgICAgICBub3QgYmUgdGhlIHNhbWUsIHRlbXBsYXRlcywgdHlwZXMgZXRjLi4uIFRoaXMgaXMgYmVjYXVzZSB3aGVuIHRoZSBncmlkIHJlbmRlcnMgYSBjZWxsIHRoYXQgY2VsbCBoYXMgYSBzaW5nbGUgdGVtcGxhdGUgYWNyb3NzXG4gICAgICAgICAgIGFsbCByb3dzIGJ1dCBub3cgd2UgbmVlZCBhIGRpZmZlcmVudCB0ZW1wbGF0ZSBmb3IgZXZlcnkgcm93LlxuXG4gICAgICAgICAgIFdlIGNhbiBwcm94eSBhIChWRVJZKSBsaW1pdGVkIHNldCBvZiBtZXRhZGF0YSBwcm9wZXJ0aWVzIHJlbGF0ZWQgdG8gdGhlIHByZXNlbnRhdGlvbiBsYXllciwgdmFsaWQgb25seSBvbiByZW5kZXIgdGltZS5cbiAgICAgICAgICAgVGhpcyByZWxheXMgb24gdGhlIGZhY3QgdGhhdCBlYWNoIHJvdyBpcyByZW5kZXJlZCBjb21wbGV0ZSwgc3RhcnRpbmcgZnJvbSB0aGUgZmlyc3QgY2VsbCB0byB0aGUgbGFzdCBzb1xuICAgICAgICAgICB3aXRoIHRoYXQgd2UgY2FuIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgb3JpZ2luYWwgY29sdW1uIHRoYSB0aGF0IG5vdyByZXByZXNlbnRzIHRoZSB3aG9sZSByb3cuXG4gICAgICAgICAqL1xuICAgICAgICBsZXQgY3VycmVudENvbHVtbjogUGJsQ29sdW1uO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5ncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucykge1xuICAgICAgICAgIGlmIChjLm9yZ1Byb3AgPT09IHByb3ApIHtcbiAgICAgICAgICAgIGMuZ2V0VmFsdWUgPSAocm93OiBQYmxDb2x1bW4pID0+IHtcbiAgICAgICAgICAgICAgY3VycmVudENvbHVtbiA9IHJvdztcbiAgICAgICAgICAgICAgcmV0dXJuIHJvdy5sYWJlbCBhcyBhbnk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjLmdldFZhbHVlID0gZ2V0Q2VsbFZhbHVlVHJhbnNmb3JtZWQ7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBjb2x1bW5LZXlzVG9Qcm94eSkge1xuICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYywga2V5LCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgZ2V0OiAoKSA9PiBjdXJyZW50Q29sdW1uICYmIGN1cnJlbnRDb2x1bW5ba2V5XSwgc2V0OiB2YWx1ZSA9PiB7fSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29sdW1ucztcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICB0aGlzLmdyaWRTdGF0ZSA9IG5ldyBUcmFuc3Bvc2VUYWJsZVNlc3Npb24oXG4gICAgICB0aGlzLmdyaWQsXG4gICAgICB0aGlzLnBsdWdpbkN0cmwsXG4gICAgICAoKSA9PiB0aGlzLnVwZGF0ZUNvbHVtbnModGhpcy5ncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucyksXG4gICAgICBzb3VyY2VGYWN0b3J5V3JhcHBlcixcbiAgICApO1xuXG4gICAgaWYgKHJlZnJlc2hEYXRhU291cmNlKSB7XG4gICAgICB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICAgIHRoaXMuZ3JpZC5kcy5yZWZyZXNoKCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmdyaWQuZHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5ncmlkLmRzLnJlZnJlc2goVklSVFVBTF9SRUZSRVNIKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVN0YXRlKHByZXY6IGJvb2xlYW4gfCB1bmRlZmluZWQsIGN1cnI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBpc0ZpcnN0ID0gcHJldiA9PT0gdW5kZWZpbmVkO1xuICAgIGlmICghY3Vycikge1xuICAgICAgdGhpcy5kaXNhYmxlKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuYWJsZSghaXNGaXJzdCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVDb2x1bW5zKGNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgY29uc3QgeyBwcm9wIH0gPSB0aGlzLl9oZWFkZXI7XG4gICAgdGhpcy5jb2x1bW5zID0gW107XG4gICAgZm9yIChjb25zdCBjIG9mIGNvbHVtbnMpIHtcbiAgICAgIGlmIChjLm9yZ1Byb3AgPT09IHByb3ApIHtcbiAgICAgICAgdGhpcy5zZWxmQ29sdW1uID0gYztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY29sdW1ucy5wdXNoKGMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRoaXMuc2VsZkNvbHVtbikge1xuICAgICAgLy8gVE9ETzogZG9uJ3QgYXNzdW1lIGNvbHVtbnNbMF1cbiAgICAgIHRoaXMuc2VsZkNvbHVtbiA9IG5ldyBQYmxDb2x1bW4odGhpcy5faGVhZGVyLCB0aGlzLnBsdWdpbkN0cmwuZXh0QXBpLmNvbHVtblN0b3JlLmdyb3VwU3RvcmUpO1xuICAgIH1cbiAgfVxufVxuIl19