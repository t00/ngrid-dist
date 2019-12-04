/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter, map } from 'rxjs/operators';
import { isPblColumn } from './columns/column';
/**
 * @record
 */
export function AutoSizeToFitOptions() { }
if (false) {
    /**
     * When `px` will force all columns width to be in fixed pixels
     * When `%` will force all column width to be in %
     * otherwise (default) the width will be set in the same format it was originally set.
     * e.g.: If width was `33%` the new width will also be in %, or if width not set the new width will not be set as well.
     *
     * Does not apply when columnBehavior is set and returns a value.
     * @type {?|undefined}
     */
    AutoSizeToFitOptions.prototype.forceWidthType;
    /**
     * When true will keep the `minWidth` column definition (when set), otherwise will clear it.
     * Does not apply when columnBehavior is set and returns a value.
     * @type {?|undefined}
     */
    AutoSizeToFitOptions.prototype.keepMinWidth;
    /**
     * When true will keep the `maxWidth` column definition (when set), otherwise will clear it.
     * Does not apply when columnBehavior is set and returns a value.
     * @type {?|undefined}
     */
    AutoSizeToFitOptions.prototype.keepMaxWidth;
    /**
     * A function for per-column fine tuning of the process.
     * The function receives the `PblColumn`, its relative width (in %, 0 to 1) and total width (in pixels) and should return
     * an object describing how it should auto fit.
     *
     * When the function returns undefined the options are taken from the root.
     * @param {?} column
     * @return {?}
     */
    AutoSizeToFitOptions.prototype.columnBehavior = function (column) { };
}
/**
 * @template T
 */
var /**
 * @template T
 */
ColumnApi = /** @class */ (function () {
    function ColumnApi() {
    }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} grid
     * @param {?} store
     * @param {?} extApi
     * @return {?}
     */
    ColumnApi.create = 
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} grid
     * @param {?} store
     * @param {?} extApi
     * @return {?}
     */
    function (grid, store, extApi) {
        /** @type {?} */
        var instance = new ColumnApi();
        instance.grid = grid;
        instance.store = store;
        instance.extApi = extApi;
        return instance;
    };
    Object.defineProperty(ColumnApi.prototype, "groupByColumns", {
        get: /**
         * @return {?}
         */
        function () { return this.store.groupBy; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnApi.prototype, "visibleColumnIds", {
        get: /**
         * @return {?}
         */
        function () { return this.store.columnIds; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnApi.prototype, "visibleColumns", {
        get: /**
         * @return {?}
         */
        function () { return this.store.columns; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnApi.prototype, "columns", {
        get: /**
         * @return {?}
         */
        function () { return this.store.allColumns; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ColumnApi.prototype, "totalColumnWidthChange", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this._totalColumnWidthChange) {
                this._totalColumnWidthChange = this.extApi.events
                    .pipe(filter((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return event.kind === 'onResizeRow'; })), map((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return _this.grid.columnApi.visibleColumns.reduce((/**
                 * @param {?} p
                 * @param {?} c
                 * @return {?}
                 */
                function (p, c) { return p + c.sizeInfo.width; }), 0); })));
            }
            return this._totalColumnWidthChange;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     */
    /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     * @param {?} renderColumnIndex
     * @return {?}
     */
    ColumnApi.prototype.findColumnAt = /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     * @param {?} renderColumnIndex
     * @return {?}
     */
    function (renderColumnIndex) {
        return this.store.columns[renderColumnIndex];
    };
    /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     */
    /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     * @param {?} id
     * @return {?}
     */
    ColumnApi.prototype.findColumn = /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var result = this.store.find(id);
        if (result) {
            return result.data;
        }
    };
    /**
    * Returns the render index of column or -1 if not found.
    *
    * The render index represents the current location of the column in the group of visible columns.
    */
    /**
     * Returns the render index of column or -1 if not found.
     *
     * The render index represents the current location of the column in the group of visible columns.
     * @param {?} column
     * @return {?}
     */
    ColumnApi.prototype.renderIndexOf = /**
     * Returns the render index of column or -1 if not found.
     *
     * The render index represents the current location of the column in the group of visible columns.
     * @param {?} column
     * @return {?}
     */
    function (column) {
        /** @type {?} */
        var c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.columns.indexOf(c);
    };
    /**
     * Returns the index of a column or -1 if not found.
     */
    /**
     * Returns the index of a column or -1 if not found.
     * @param {?} column
     * @return {?}
     */
    ColumnApi.prototype.indexOf = /**
     * Returns the index of a column or -1 if not found.
     * @param {?} column
     * @return {?}
     */
    function (column) {
        /** @type {?} */
        var c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.allColumns.indexOf(c);
    };
    /**
     * Update the width of the column with the provided width.
     *
     * The width is set in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     *
     * Resizing the column will trigger a table width resizing event, updating column group if necessary.
     */
    /**
     * Update the width of the column with the provided width.
     *
     * The width is set in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     *
     * Resizing the column will trigger a table width resizing event, updating column group if necessary.
     * @param {?} column
     * @param {?} width
     * @return {?}
     */
    ColumnApi.prototype.resizeColumn = /**
     * Update the width of the column with the provided width.
     *
     * The width is set in px or % in the following format: ##% or ##px
     * Examples: '50%', '50px'
     *
     * Resizing the column will trigger a table width resizing event, updating column group if necessary.
     * @param {?} column
     * @param {?} width
     * @return {?}
     */
    function (column, width) {
        column.updateWidth(width);
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    };
    /**
     * Resize the column to best fit it's content.
     *
     * - Content: All of the cells rendered for this column (header, data and footer cells).
     * - Best fit: The width of the cell with the height width measured.
     *
     * The best fit found (width) is then used to call `resizeColumn()`.
     */
    /**
     * Resize the column to best fit it's content.
     *
     * - Content: All of the cells rendered for this column (header, data and footer cells).
     * - Best fit: The width of the cell with the height width measured.
     *
     * The best fit found (width) is then used to call `resizeColumn()`.
     * @param {?} column
     * @return {?}
     */
    ColumnApi.prototype.autoSizeColumn = /**
     * Resize the column to best fit it's content.
     *
     * - Content: All of the cells rendered for this column (header, data and footer cells).
     * - Best fit: The width of the cell with the height width measured.
     *
     * The best fit found (width) is then used to call `resizeColumn()`.
     * @param {?} column
     * @return {?}
     */
    function (column) {
        /** @type {?} */
        var size = this.findColumnAutoSize(column);
        this.resizeColumn(column, size + "px");
    };
    // tslint:disable-line:unified-signatures
    /**
     * @param {...?} columns
     * @return {?}
     */
    ColumnApi.prototype.autoSizeColumns = 
    // tslint:disable-line:unified-signatures
    /**
     * @param {...?} columns
     * @return {?}
     */
    function () {
        var e_1, _a;
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        /** @type {?} */
        var cols = columns.length > 0 ? columns : this.visibleColumns;
        try {
            for (var cols_1 = tslib_1.__values(cols), cols_1_1 = cols_1.next(); !cols_1_1.done; cols_1_1 = cols_1.next()) {
                var column = cols_1_1.value;
                /** @type {?} */
                var size = this.findColumnAutoSize(column);
                column.updateWidth(size + "px");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cols_1_1 && !cols_1_1.done && (_a = cols_1.return)) _a.call(cols_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    };
    /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     */
    /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     * @param {?} totalWidth
     * @param {?=} options
     * @return {?}
     */
    ColumnApi.prototype.autoSizeToFit = /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     * @param {?} totalWidth
     * @param {?=} options
     * @return {?}
     */
    function (totalWidth, options) {
        var e_2, _a;
        if (options === void 0) { options = {}; }
        /** @type {?} */
        var wLogic = this.extApi.dynamicColumnWidthFactory();
        var visibleColumns = this.visibleColumns;
        /** @type {?} */
        var columnBehavior = options.columnBehavior || (/** @type {?} */ (((/**
         * @return {?}
         */
        function () { return options; }))));
        /** @type {?} */
        var overflowTotalWidth = 0;
        /** @type {?} */
        var totalMinWidth = 0;
        /** @type {?} */
        var withMinWidth = [];
        /** @type {?} */
        var widthBreakouts = visibleColumns.map((/**
         * @param {?} column
         * @param {?} index
         * @return {?}
         */
        function (column, index) {
            /** @type {?} */
            var widthBreakout = wLogic.widthBreakout(column.sizeInfo);
            /** @type {?} */
            var instructions = tslib_1.__assign({}, (columnBehavior(column) || {}), options);
            overflowTotalWidth += widthBreakout.content;
            totalWidth -= widthBreakout.nonContent;
            if (instructions.keepMinWidth && column.minWidth) {
                totalMinWidth += column.minWidth;
                withMinWidth.push(index);
            }
            return tslib_1.__assign({}, widthBreakout, { instructions: instructions });
        }));
        /** @type {?} */
        var p = totalMinWidth / totalWidth;
        /** @type {?} */
        var level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
        try {
            for (var withMinWidth_1 = tslib_1.__values(withMinWidth), withMinWidth_1_1 = withMinWidth_1.next(); !withMinWidth_1_1.done; withMinWidth_1_1 = withMinWidth_1.next()) {
                var i = withMinWidth_1_1.value;
                /** @type {?} */
                var addition = level * (visibleColumns[i].minWidth / totalMinWidth);
                widthBreakouts[i].content += addition;
                overflowTotalWidth += addition;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (withMinWidth_1_1 && !withMinWidth_1_1.done && (_a = withMinWidth_1.return)) _a.call(withMinWidth_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        for (var i = 0; i < visibleColumns.length; i++) {
            /** @type {?} */
            var widthBreakout = widthBreakouts[i];
            /** @type {?} */
            var instructions = widthBreakout.instructions;
            /** @type {?} */
            var column = visibleColumns[i];
            /** @type {?} */
            var r = widthBreakout.content / overflowTotalWidth;
            if (!instructions.keepMinWidth || !column.minWidth) {
                column.minWidth = undefined;
            }
            if (!instructions.keepMaxWidth || !column.maxWidth) {
                column.maxWidth = undefined;
                column.checkMaxWidthLock(column.sizeInfo.width); // if its locked, we need to release...
            }
            // There are 3 scenarios when updating the column
            // 1) if it's a fixed width or we're force into fixed width
            // 2) Not fixed width and width is set (%)
            // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.grid.resetColumnsWidth()` )
            /** @type {?} */
            var width = void 0;
            var forceWidthType = instructions.forceWidthType;
            if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                width = totalWidth * r + "px";
            }
            else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                width = 100 * r + "%";
            } // else (3) -> the update is skipped and it will run through resetColumnsWidth
            if (width) {
                column.updateWidth(width);
            }
        }
        // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
        // It will also mark all columnDefs for check
        this.grid.resetColumnsWidth();
        this.grid.resizeColumns();
    };
    // tslint:disable-line:unified-signatures
    /**
     * @param {?} column
     * @param {?} anchor
     * @param {?=} skipRedraw
     * @return {?}
     */
    ColumnApi.prototype.moveColumn = 
    // tslint:disable-line:unified-signatures
    /**
     * @param {?} column
     * @param {?} anchor
     * @param {?=} skipRedraw
     * @return {?}
     */
    function (column, anchor, skipRedraw) {
        if (isPblColumn(anchor)) {
            /** @type {?} */
            var result = column === anchor ? false : this.store.moveColumn(column, anchor);
            if (result && skipRedraw !== true) {
                this.afterColumnPositionChange();
            }
            return result;
        }
        else {
            /** @type {?} */
            var a = this.findColumnAt(anchor);
            return a ? this.moveColumn(column, a) : false;
        }
    };
    /**
     * Swap positions between 2 existing columns.
     */
    /**
     * Swap positions between 2 existing columns.
     * @param {?} col1
     * @param {?} col2
     * @param {?=} skipRedraw
     * @return {?}
     */
    ColumnApi.prototype.swapColumns = /**
     * Swap positions between 2 existing columns.
     * @param {?} col1
     * @param {?} col2
     * @param {?=} skipRedraw
     * @return {?}
     */
    function (col1, col2, skipRedraw) {
        /** @type {?} */
        var result = this.store.swapColumns(col1, col2);
        if (result && skipRedraw !== true) {
            this.afterColumnPositionChange();
        }
        return result;
    };
    /**
     * @param {...?} column
     * @return {?}
     */
    ColumnApi.prototype.addGroupBy = /**
     * @param {...?} column
     * @return {?}
     */
    function () {
        var _a;
        var column = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            column[_i] = arguments[_i];
        }
        (_a = this.store).addGroupBy.apply(_a, tslib_1.__spread(column));
    };
    /**
     * @param {...?} column
     * @return {?}
     */
    ColumnApi.prototype.removeGroupBy = /**
     * @param {...?} column
     * @return {?}
     */
    function () {
        var _a;
        var column = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            column[_i] = arguments[_i];
        }
        (_a = this.store).removeGroupBy.apply(_a, tslib_1.__spread(column));
    };
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    ColumnApi.prototype.findColumnAutoSize = /**
     * @private
     * @param {?} column
     * @return {?}
     */
    function (column) {
        var e_3, _a;
        var columnDef = column.columnDef;
        /** @type {?} */
        var cells = columnDef.queryCellElements();
        /** @type {?} */
        var size = 0;
        try {
            for (var cells_1 = tslib_1.__values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
                var c = cells_1_1.value;
                /** @type {?} */
                var element = (/** @type {?} */ ((c.firstElementChild || c)));
                if (element.scrollWidth > size) {
                    size = element.scrollWidth + 1;
                    // we add 1 pixel because `element.scrollWidth` does not support subpixel values, the width is converted to an integer removing subpixel values (fractions).
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (cells_1_1 && !cells_1_1.done && (_a = cells_1.return)) _a.call(cells_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return size;
    };
    /**
     * @private
     * @return {?}
     */
    ColumnApi.prototype.afterColumnPositionChange = /**
     * @private
     * @return {?}
     */
    function () {
        this.extApi.contextApi.clear();
        this.store.updateGroups();
        this.grid.resetColumnsWidth();
        this.grid.resizeColumns();
    };
    return ColumnApi;
}());
/**
 * @template T
 */
export { ColumnApi };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype.grid;
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype.store;
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype.extApi;
    /**
     * @type {?}
     * @private
     */
    ColumnApi.prototype._totalColumnWidthChange;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFHMUQsMENBK0JDOzs7Ozs7Ozs7OztJQXRCQyw4Q0FBNEI7Ozs7OztJQU01Qiw0Q0FBdUI7Ozs7OztJQU12Qiw0Q0FBc0I7Ozs7Ozs7Ozs7SUFTdEIsc0VBQStIOzs7OztBQUdqSTs7OztJQXFDRTtJQUF3QixDQUFDO0lBbkN6QixnRkFBZ0Y7SUFDaEYsd0lBQXdJO0lBQ3hJLDBGQUEwRjtJQUMxRix5R0FBeUc7Ozs7Ozs7Ozs7OztJQUNsRyxnQkFBTTs7Ozs7Ozs7Ozs7O0lBQWIsVUFBaUIsSUFBMEIsRUFBRSxLQUFxQixFQUFFLE1BQTRCOztZQUN4RixRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUs7UUFFbkMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFekIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELHNCQUFJLHFDQUFjOzs7O1FBQWxCLGNBQW9DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNoRSxzQkFBSSx1Q0FBZ0I7Ozs7UUFBcEIsY0FBbUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2pFLHNCQUFJLHFDQUFjOzs7O1FBQWxCLGNBQW9DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNoRSxzQkFBSSw4QkFBTzs7OztRQUFYLGNBQTZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU1RCxzQkFBSSw2Q0FBc0I7Ozs7UUFBMUI7WUFBQSxpQkFTQztZQVJDLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07cUJBQzlDLElBQUksQ0FDSCxNQUFNOzs7O2dCQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQTVCLENBQTRCLEVBQUMsRUFDN0MsR0FBRzs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNOzs7OztnQkFBRSxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQXBCLENBQW9CLEdBQUUsQ0FBQyxDQUFFLEVBQTlFLENBQThFLEVBQUUsQ0FDM0YsQ0FBQzthQUNMO1lBQ0QsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFTRDs7T0FFRzs7Ozs7O0lBQ0gsZ0NBQVk7Ozs7O0lBQVosVUFBYSxpQkFBeUI7UUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHOzs7Ozs7OztJQUNILDhCQUFVOzs7Ozs7O0lBQVYsVUFBVyxFQUFVOztZQUNiLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbEMsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQ7Ozs7TUFJRTs7Ozs7Ozs7SUFDRixpQ0FBYTs7Ozs7OztJQUFiLFVBQWMsTUFBMEI7O1lBQ2hDLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDdkUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCwyQkFBTzs7Ozs7SUFBUCxVQUFRLE1BQTBCOztZQUMxQixDQUFDLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7Ozs7SUFDSCxnQ0FBWTs7Ozs7Ozs7Ozs7SUFBWixVQUFhLE1BQWlCLEVBQUUsS0FBYTtRQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLGlDQUFpQztRQUNqQyw2QkFBNkI7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7O0lBQ0gsa0NBQWM7Ozs7Ozs7Ozs7SUFBZCxVQUFlLE1BQWlCOztZQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBSyxJQUFJLE9BQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7OztJQWVELG1DQUFlOzs7Ozs7SUFBZjs7UUFBZ0IsaUJBQXVCO2FBQXZCLFVBQXVCLEVBQXZCLHFCQUF1QixFQUF2QixJQUF1QjtZQUF2Qiw0QkFBdUI7OztZQUMvQixJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWM7O1lBQy9ELEtBQXFCLElBQUEsU0FBQSxpQkFBQSxJQUFJLENBQUEsMEJBQUEsNENBQUU7Z0JBQXRCLElBQU0sTUFBTSxpQkFBQTs7b0JBQ1QsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxXQUFXLENBQUksSUFBSSxPQUFJLENBQUMsQ0FBQzthQUNqQzs7Ozs7Ozs7O1FBQ0QsaUNBQWlDO1FBQ2pDLDZCQUE2QjtJQUMvQixDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCxpQ0FBYTs7Ozs7O0lBQWIsVUFBYyxVQUFrQixFQUFFLE9BQWtDOztRQUFsQyx3QkFBQSxFQUFBLFlBQWtDOztZQUM1RCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRTtRQUM5QyxJQUFBLG9DQUFjOztZQUNoQixjQUFjLEdBQTJDLE9BQU8sQ0FBQyxjQUFjLElBQUksbUJBQUE7OztRQUFFLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTyxFQUFFLEVBQU87O1lBRTdHLGtCQUFrQixHQUFHLENBQUM7O1lBQ3RCLGFBQWEsR0FBRyxDQUFDOztZQUVmLFlBQVksR0FBYSxFQUFFOztZQUUzQixjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUc7Ozs7O1FBQUUsVUFBQyxNQUFNLEVBQUUsS0FBSzs7Z0JBQ2pELGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7O2dCQUNyRCxZQUFZLHdCQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFLLE9BQU8sQ0FBRTtZQUV0RSxrQkFBa0IsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzVDLFVBQVUsSUFBSSxhQUFhLENBQUMsVUFBVSxDQUFDO1lBRXZDLElBQUksWUFBWSxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNoRCxhQUFhLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDakMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMxQjtZQUVELDRCQUFZLGFBQWEsSUFBRSxZQUFZLGNBQUEsSUFBRztRQUM1QyxDQUFDLEVBQUM7O1lBRUksQ0FBQyxHQUFHLGFBQWEsR0FBRyxVQUFVOztZQUM5QixLQUFLLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEdBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztZQUNqRSxLQUFnQixJQUFBLGlCQUFBLGlCQUFBLFlBQVksQ0FBQSwwQ0FBQSxvRUFBRTtnQkFBekIsSUFBTSxDQUFDLHlCQUFBOztvQkFDSixRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7Z0JBQ3JFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDO2dCQUN0QyxrQkFBa0IsSUFBSSxRQUFRLENBQUM7YUFDaEM7Ozs7Ozs7OztRQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDeEMsYUFBYSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7O2dCQUNqQyxZQUFZLEdBQUcsYUFBYSxDQUFDLFlBQVk7O2dCQUN6QyxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTFCLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxHQUFHLGtCQUFrQjtZQUVwRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xELE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNsRCxNQUFNLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyx1Q0FBdUM7YUFDekY7Ozs7OztnQkFNRyxLQUFLLFNBQVE7WUFDVCxJQUFBLDRDQUFjO1lBQ3RCLElBQUksY0FBYyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLE1BQU07Z0JBQy9FLEtBQUssR0FBTSxVQUFVLEdBQUcsQ0FBQyxPQUFJLENBQUM7YUFDL0I7aUJBQU0sSUFBSSxjQUFjLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTTtnQkFDOUUsS0FBSyxHQUFNLEdBQUcsR0FBRyxDQUFDLE1BQUcsQ0FBQzthQUN2QixDQUFDLDhFQUE4RTtZQUVoRixJQUFJLEtBQUssRUFBRTtnQkFDVCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzNCO1NBRUY7UUFDRCwrSUFBK0k7UUFDL0ksNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7O0lBYUQsOEJBQVU7Ozs7Ozs7O0lBQVYsVUFBVyxNQUFpQixFQUFFLE1BQTBCLEVBQUUsVUFBb0I7UUFDNUUsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNqQixNQUFNLEdBQUcsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ2hGLElBQUksTUFBTSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO2FBQ2xDO1lBQ0QsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNOztnQkFDQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDbkMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7O0lBQ0gsK0JBQVc7Ozs7Ozs7SUFBWCxVQUFZLElBQWUsRUFBRSxJQUFlLEVBQUUsVUFBb0I7O1lBQzFELE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBQ2pELElBQUksTUFBTSxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDakMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7U0FDbEM7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzs7OztJQUVELDhCQUFVOzs7O0lBQVY7O1FBQVcsZ0JBQXNCO2FBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtZQUF0QiwyQkFBc0I7O1FBQVUsQ0FBQSxLQUFBLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxVQUFVLDRCQUFJLE1BQU0sR0FBRTtJQUFDLENBQUM7Ozs7O0lBQzlFLGlDQUFhOzs7O0lBQWI7O1FBQWMsZ0JBQXNCO2FBQXRCLFVBQXNCLEVBQXRCLHFCQUFzQixFQUF0QixJQUFzQjtZQUF0QiwyQkFBc0I7O1FBQVUsQ0FBQSxLQUFBLElBQUksQ0FBQyxLQUFLLENBQUEsQ0FBQyxhQUFhLDRCQUFJLE1BQU0sR0FBRTtJQUFDLENBQUM7Ozs7OztJQUU1RSxzQ0FBa0I7Ozs7O0lBQTFCLFVBQTJCLE1BQWlCOztRQUNsQyxJQUFBLDRCQUFTOztZQUNYLEtBQUssR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUU7O1lBQ3ZDLElBQUksR0FBRyxDQUFDOztZQUNaLEtBQWdCLElBQUEsVUFBQSxpQkFBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7Z0JBQWxCLElBQU0sQ0FBQyxrQkFBQTs7b0JBQ0osT0FBTyxHQUFHLG1CQUFBLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLENBQUMsQ0FBQyxFQUFlO2dCQUN6RCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFO29CQUM5QixJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQy9CLDRKQUE0SjtpQkFDN0o7YUFDRjs7Ozs7Ozs7O1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVPLDZDQUF5Qjs7OztJQUFqQztRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQWxRRCxJQWtRQzs7Ozs7Ozs7OztJQWxPQyx5QkFBbUM7Ozs7O0lBQ25DLDBCQUE4Qjs7Ozs7SUFDOUIsMkJBQXFDOzs7OztJQUNyQyw0Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBpc1BibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uU3RvcmUgfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvU2l6ZVRvRml0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGVuIGBweGAgd2lsbCBmb3JjZSBhbGwgY29sdW1ucyB3aWR0aCB0byBiZSBpbiBmaXhlZCBwaXhlbHNcbiAgICogV2hlbiBgJWAgd2lsbCBmb3JjZSBhbGwgY29sdW1uIHdpZHRoIHRvIGJlIGluICVcbiAgICogb3RoZXJ3aXNlIChkZWZhdWx0KSB0aGUgd2lkdGggd2lsbCBiZSBzZXQgaW4gdGhlIHNhbWUgZm9ybWF0IGl0IHdhcyBvcmlnaW5hbGx5IHNldC5cbiAgICogZS5nLjogSWYgd2lkdGggd2FzIGAzMyVgIHRoZSBuZXcgd2lkdGggd2lsbCBhbHNvIGJlIGluICUsIG9yIGlmIHdpZHRoIG5vdCBzZXQgdGhlIG5ldyB3aWR0aCB3aWxsIG5vdCBiZSBzZXQgYXMgd2VsbC5cbiAgICpcbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGZvcmNlV2lkdGhUeXBlPzogJyUnIHwgJ3B4JztcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwga2VlcCB0aGUgYG1pbldpZHRoYCBjb2x1bW4gZGVmaW5pdGlvbiAod2hlbiBzZXQpLCBvdGhlcndpc2Ugd2lsbCBjbGVhciBpdC5cbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGtlZXBNaW5XaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGtlZXAgdGhlIGBtYXhXaWR0aGAgY29sdW1uIGRlZmluaXRpb24gKHdoZW4gc2V0KSwgb3RoZXJ3aXNlIHdpbGwgY2xlYXIgaXQuXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBrZWVwTWF4V2lkdGg/OiBib29sZWFuXG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gZm9yIHBlci1jb2x1bW4gZmluZSB0dW5pbmcgb2YgdGhlIHByb2Nlc3MuXG4gICAqIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgYFBibENvbHVtbmAsIGl0cyByZWxhdGl2ZSB3aWR0aCAoaW4gJSwgMCB0byAxKSBhbmQgdG90YWwgd2lkdGggKGluIHBpeGVscykgYW5kIHNob3VsZCByZXR1cm5cbiAgICogYW4gb2JqZWN0IGRlc2NyaWJpbmcgaG93IGl0IHNob3VsZCBhdXRvIGZpdC5cbiAgICpcbiAgICogV2hlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyB1bmRlZmluZWQgdGhlIG9wdGlvbnMgYXJlIHRha2VuIGZyb20gdGhlIHJvb3QuXG4gICAqL1xuICBjb2x1bW5CZWhhdmlvcj8oY29sdW1uOiBQYmxDb2x1bW4pOiBQaWNrPEF1dG9TaXplVG9GaXRPcHRpb25zLCAnZm9yY2VXaWR0aFR5cGUnIHwgJ2tlZXBNaW5XaWR0aCcgfCAna2VlcE1heFdpZHRoJz4gfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BcGk8VD4ge1xuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQ+KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+LCBzdG9yZTogUGJsQ29sdW1uU3RvcmUsIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGkpOiBDb2x1bW5BcGk8VD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbHVtbkFwaTxUPigpO1xuXG4gICAgaW5zdGFuY2UuZ3JpZCA9IGdyaWQ7XG4gICAgaW5zdGFuY2Uuc3RvcmUgPSBzdG9yZTtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBnZXQgZ3JvdXBCeUNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5ncm91cEJ5OyB9XG4gIGdldCB2aXNpYmxlQ29sdW1uSWRzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uSWRzOyB9XG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zOyB9XG5cbiAgZ2V0IHRvdGFsQ29sdW1uV2lkdGhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBpZiAoIXRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2UgPSB0aGlzLmV4dEFwaS5ldmVudHNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmtpbmQgPT09ICdvblJlc2l6ZVJvdycpLFxuICAgICAgICAgIG1hcCggZSA9PiB0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLnJlZHVjZSggKHAsIGMpID0+IHAgKyBjLnNpemVJbmZvLndpZHRoLCAwICkgKSxcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2U7XG4gIH1cblxuICBwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIHN0b3JlOiBQYmxDb2x1bW5TdG9yZTtcbiAgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xuICBwcml2YXRlIF90b3RhbENvbHVtbldpZHRoQ2hhbmdlOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgUGJsQ29sdW1uYCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhlIGxpc3Qgb2YgcmVuZGVyZWQgY29sdW1ucyAoaS5lLiBub3QgaGlkZGVuKS5cbiAgICovXG4gIGZpbmRDb2x1bW5BdChyZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zW3JlbmRlckNvbHVtbkluZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gbWF0Y2hpbmcgcHJvdmlkZWQgYGlkYC5cbiAgICpcbiAgICogVGhlIHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gYWxsIGtub3duIGNvbHVtbnMuXG4gICAqL1xuICBmaW5kQ29sdW1uKGlkOiBzdHJpbmcpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuZmluZChpZCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJlbmRlciBpbmRleCBvZiBjb2x1bW4gb3IgLTEgaWYgbm90IGZvdW5kLlxuICAqXG4gICogVGhlIHJlbmRlciBpbmRleCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGxvY2F0aW9uIG9mIHRoZSBjb2x1bW4gaW4gdGhlIGdyb3VwIG9mIHZpc2libGUgY29sdW1ucy5cbiAgKi9cbiAgcmVuZGVySW5kZXhPZihjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnID8gdGhpcy5maW5kQ29sdW1uKGNvbHVtbikgOiBjb2x1bW47XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluZGV4IG9mIGEgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gd2l0aCB0aGUgcHJvdmlkZWQgd2lkdGguXG4gICAqXG4gICAqIFRoZSB3aWR0aCBpcyBzZXQgaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICpcbiAgICogUmVzaXppbmcgdGhlIGNvbHVtbiB3aWxsIHRyaWdnZXIgYSB0YWJsZSB3aWR0aCByZXNpemluZyBldmVudCwgdXBkYXRpbmcgY29sdW1uIGdyb3VwIGlmIG5lY2Vzc2FyeS5cbiAgICovXG4gIHJlc2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgd2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbHVtbi51cGRhdGVXaWR0aCh3aWR0aCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgdGhlIGNvbHVtbiB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIC0gQ29udGVudDogQWxsIG9mIHRoZSBjZWxscyByZW5kZXJlZCBmb3IgdGhpcyBjb2x1bW4gKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyIGNlbGxzKS5cbiAgICogLSBCZXN0IGZpdDogVGhlIHdpZHRoIG9mIHRoZSBjZWxsIHdpdGggdGhlIGhlaWdodCB3aWR0aCBtZWFzdXJlZC5cbiAgICpcbiAgICogVGhlIGJlc3QgZml0IGZvdW5kICh3aWR0aCkgaXMgdGhlbiB1c2VkIHRvIGNhbGwgYHJlc2l6ZUNvbHVtbigpYC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgdGhpcy5yZXNpemVDb2x1bW4oY29sdW1uLCBgJHtzaXplfXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSB2aXNpYmxlIGNvbHVtbnMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGxpc3Qgb2YgY29sdW1uIHByb3ZpZGVkLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBNYWtlIHN1cmUgeW91IGFyZSBub3QgcmVzaXppbmcgYW4gaGlkZGVuIGNvbHVtbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgY29sdW1ucyBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHMgPSBjb2x1bW5zLmxlbmd0aCA+IDAgPyBjb2x1bW5zIDogdGhpcy52aXNpYmxlQ29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2xzKSB7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICAgIGNvbHVtbi51cGRhdGVXaWR0aChgJHtzaXplfXB4YCk7XG4gICAgfVxuICAgIC8vIHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIC8vIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdGhlIHdpZHRoIHRvIGEgcHJvcG9ydGlvbmFsIHdpZHRoIHJlbGF0aXZlIHRvIHRoZSB0b3RhbCB3aWR0aCBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplVG9GaXQodG90YWxXaWR0aDogbnVtYmVyLCBvcHRpb25zOiBBdXRvU2l6ZVRvRml0T3B0aW9ucyA9IHt9KTogdm9pZCB7XG4gICAgY29uc3Qgd0xvZ2ljID0gdGhpcy5leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIGNvbnN0IHsgdmlzaWJsZUNvbHVtbnMgfSA9IHRoaXM7XG4gICAgY29uc3QgY29sdW1uQmVoYXZpb3I6IEF1dG9TaXplVG9GaXRPcHRpb25zWydjb2x1bW5CZWhhdmlvciddID0gb3B0aW9ucy5jb2x1bW5CZWhhdmlvciB8fCAoICgpID0+IG9wdGlvbnMgKSBhcyBhbnk7XG5cbiAgICBsZXQgb3ZlcmZsb3dUb3RhbFdpZHRoID0gMDtcbiAgICBsZXQgdG90YWxNaW5XaWR0aCA9IDA7XG5cbiAgICBjb25zdCB3aXRoTWluV2lkdGg6IG51bWJlcltdID0gW107XG5cbiAgICBjb25zdCB3aWR0aEJyZWFrb3V0cyA9IHZpc2libGVDb2x1bW5zLm1hcCggKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoQnJlYWtvdXQgPSB3TG9naWMud2lkdGhCcmVha291dChjb2x1bW4uc2l6ZUluZm8pO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0geyAuLi4oY29sdW1uQmVoYXZpb3IoY29sdW1uKSB8fCB7fSksIC4uLm9wdGlvbnMgfTtcblxuICAgICAgb3ZlcmZsb3dUb3RhbFdpZHRoICs9IHdpZHRoQnJlYWtvdXQuY29udGVudDtcbiAgICAgIHRvdGFsV2lkdGggLT0gd2lkdGhCcmVha291dC5ub25Db250ZW50O1xuXG4gICAgICBpZiAoaW5zdHJ1Y3Rpb25zLmtlZXBNaW5XaWR0aCAmJiBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgdG90YWxNaW5XaWR0aCArPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgICAgIHdpdGhNaW5XaWR0aC5wdXNoKGluZGV4KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4ud2lkdGhCcmVha291dCwgaW5zdHJ1Y3Rpb25zIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwID0gdG90YWxNaW5XaWR0aCAvIHRvdGFsV2lkdGg7XG4gICAgY29uc3QgbGV2ZWwgPSAob3ZlcmZsb3dUb3RhbFdpZHRoICogcCAgLSB0b3RhbE1pbldpZHRoKSAvICgxIC0gcCk7XG4gICAgZm9yIChjb25zdCBpIG9mIHdpdGhNaW5XaWR0aCkge1xuICAgICAgY29uc3QgYWRkaXRpb24gPSBsZXZlbCAqICh2aXNpYmxlQ29sdW1uc1tpXS5taW5XaWR0aCAvIHRvdGFsTWluV2lkdGgpXG4gICAgICB3aWR0aEJyZWFrb3V0c1tpXS5jb250ZW50ICs9IGFkZGl0aW9uO1xuICAgICAgb3ZlcmZsb3dUb3RhbFdpZHRoICs9IGFkZGl0aW9uO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlzaWJsZUNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHdpZHRoQnJlYWtvdXQgPSB3aWR0aEJyZWFrb3V0c1tpXTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IHdpZHRoQnJlYWtvdXQuaW5zdHJ1Y3Rpb25zO1xuICAgICAgY29uc3QgY29sdW1uID0gdmlzaWJsZUNvbHVtbnNbaV07XG5cbiAgICAgIGNvbnN0IHIgPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQgLyBvdmVyZmxvd1RvdGFsV2lkdGg7XG5cbiAgICAgIGlmICghaW5zdHJ1Y3Rpb25zLmtlZXBNaW5XaWR0aCB8fCAhY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmICghaW5zdHJ1Y3Rpb25zLmtlZXBNYXhXaWR0aCB8fCAhY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29sdW1uLmNoZWNrTWF4V2lkdGhMb2NrKGNvbHVtbi5zaXplSW5mby53aWR0aCk7IC8vIGlmIGl0cyBsb2NrZWQsIHdlIG5lZWQgdG8gcmVsZWFzZS4uLlxuICAgICAgfVxuXG4gICAgICAvLyBUaGVyZSBhcmUgMyBzY2VuYXJpb3Mgd2hlbiB1cGRhdGluZyB0aGUgY29sdW1uXG4gICAgICAvLyAxKSBpZiBpdCdzIGEgZml4ZWQgd2lkdGggb3Igd2UncmUgZm9yY2UgaW50byBmaXhlZCB3aWR0aFxuICAgICAgLy8gMikgTm90IGZpeGVkIHdpZHRoIGFuZCB3aWR0aCBpcyBzZXQgKCUpXG4gICAgICAvLyAzKSBOb3QgZml4ZWQgd2lkdGggYW4gd2lkdGggaXMgbm90IHNldCAoIHRoZSB3aWR0aCBkZXBlbmRzIG9uIHRoZSBjYWxjdWxhdGVkIGBkZWZhdWx0V2lkdGhgIGRvbmUgaW4gYHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpYCApXG4gICAgICBsZXQgd2lkdGg6IHN0cmluZztcbiAgICAgIGNvbnN0IHsgZm9yY2VXaWR0aFR5cGUgfSA9IGluc3RydWN0aW9ucztcbiAgICAgIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJ3B4JyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi5pc0ZpeGVkV2lkdGgpKSB7IC8vICgxKVxuICAgICAgICB3aWR0aCA9IGAke3RvdGFsV2lkdGggKiByfXB4YDtcbiAgICAgIH0gZWxzZSBpZiAoZm9yY2VXaWR0aFR5cGUgPT09ICclJyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi53aWR0aCkpIHsgLy8gKDIpXG4gICAgICAgIHdpZHRoID0gYCR7MTAwICogcn0lYDtcbiAgICAgIH0gLy8gZWxzZSAoMykgLT4gdGhlIHVwZGF0ZSBpcyBza2lwcGVkIGFuZCBpdCB3aWxsIHJ1biB0aHJvdWdoIHJlc2V0Q29sdW1uc1dpZHRoXG5cbiAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjb2x1bW4udXBkYXRlV2lkdGgod2lkdGgpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vIHdlIG5vdyByZXNldCB0aGUgY29sdW1uIHdpZHRocywgdGhpcyB3aWxsIGNhbGN1bGF0ZSBhIG5ldyBgZGVmYXVsdFdpZHRoYCBhbmQgc2V0IGl0IGluIGFsbCBjb2x1bW5zIGJ1dCB0aGUgcmVsZXZhbnQgb25lcyBhcmUgY29sdW1uIGZyb20gKDMpXG4gICAgLy8gSXQgd2lsbCBhbHNvIG1hcmsgYWxsIGNvbHVtbkRlZnMgZm9yIGNoZWNrXG4gICAgdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBhbmNob3JgIGNvbHVtbi5cbiAgICogVGhlIG5ldyBsb2NhdGlvbiBvZiB0aGUgYW5jaG9yIGNvbHVtbiB3aWxsIGJlIGl0J3Mgb3JpZ2luYWwgbG9jYXRpb24gcGx1cyBvciBtaW51cyAxLCBkZXBlbmRpbmcgb24gdGhlIGRlbHRhIGJldHdlZW5cbiAgICogdGhlIGNvbHVtbnMuIElmIHRoZSBvcmlnaW4gb2YgdGhlIGBjb2x1bW5gIGlzIGJlZm9yZSB0aGUgYGFuY2hvcmAgdGhlbiB0aGUgYW5jaG9yJ3MgbmV3IHBvc2l0aW9uIGlzIG1pbnVzIG9uZSwgb3RoZXJ3aXNlIHBsdXMgMS5cbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW47XG4gICAgLyoqXG4gICAqIE1vdmUgdGhlIHByb3ZpZGVkIGBjb2x1bW5gIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29sdW1uIGF0IGByZW5kZXJDb2x1bW5JbmRleGAuXG4gICAqIGByZW5kZXJDb2x1bW5JbmRleGAgbXVzdCBiZSBhIHZpc2libGUgY29sdW1uIChpLmUuIG5vdCBoaWRkZW4pXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCByZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uIHwgbnVtYmVyLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGlmIChpc1BibENvbHVtbihhbmNob3IpKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBjb2x1bW4gPT09IGFuY2hvciA/IGZhbHNlIDogdGhpcy5zdG9yZS5tb3ZlQ29sdW1uKGNvbHVtbiwgYW5jaG9yKTtcbiAgICAgIGlmIChyZXN1bHQgJiYgc2tpcFJlZHJhdyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLmZpbmRDb2x1bW5BdChhbmNob3IpO1xuICAgICAgcmV0dXJuIGEgPyB0aGlzLm1vdmVDb2x1bW4oY29sdW1uLCBhKSA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHBvc2l0aW9ucyBiZXR3ZWVuIDIgZXhpc3RpbmcgY29sdW1ucy5cbiAgICovXG4gIHN3YXBDb2x1bW5zKGNvbDE6IFBibENvbHVtbiwgY29sMjogUGJsQ29sdW1uLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuc3dhcENvbHVtbnMoY29sMSwgY29sMik7XG4gICAgaWYgKHJlc3VsdCAmJiBza2lwUmVkcmF3ICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFkZEdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQgeyB0aGlzLnN0b3JlLmFkZEdyb3VwQnkoLi4uY29sdW1uKTsgfVxuICByZW1vdmVHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHsgdGhpcy5zdG9yZS5yZW1vdmVHcm91cEJ5KC4uLmNvbHVtbik7IH1cblxuICBwcml2YXRlIGZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW46IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgeyBjb2x1bW5EZWYgfSA9IGNvbHVtbjtcbiAgICBjb25zdCBjZWxscyA9IGNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cygpO1xuICAgIGxldCBzaXplID0gMDtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2VsbHMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSAoYy5maXJzdEVsZW1lbnRDaGlsZCB8fCBjKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmIChlbGVtZW50LnNjcm9sbFdpZHRoID4gc2l6ZSkge1xuICAgICAgICBzaXplID0gZWxlbWVudC5zY3JvbGxXaWR0aCArIDE7XG4gICAgICAgIC8vIHdlIGFkZCAxIHBpeGVsIGJlY2F1c2UgYGVsZW1lbnQuc2Nyb2xsV2lkdGhgIGRvZXMgbm90IHN1cHBvcnQgc3VicGl4ZWwgdmFsdWVzLCB0aGUgd2lkdGggaXMgY29udmVydGVkIHRvIGFuIGludGVnZXIgcmVtb3Zpbmcgc3VicGl4ZWwgdmFsdWVzIChmcmFjdGlvbnMpLlxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgdGhpcy5zdG9yZS51cGRhdGVHcm91cHMoKTtcbiAgICB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLmdyaWQucmVzaXplQ29sdW1ucygpO1xuICB9XG59XG4iXX0=