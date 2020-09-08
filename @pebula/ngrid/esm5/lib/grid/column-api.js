/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/column-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __spread, __values } from "tslib";
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
            for (var cols_1 = __values(cols), cols_1_1 = cols_1.next(); !cols_1_1.done; cols_1_1 = cols_1.next()) {
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
            var instructions = __assign(__assign({}, (columnBehavior(column) || {})), options);
            overflowTotalWidth += widthBreakout.content;
            totalWidth -= widthBreakout.nonContent;
            if (instructions.keepMinWidth && column.minWidth) {
                totalMinWidth += column.minWidth;
                withMinWidth.push(index);
            }
            return __assign(__assign({}, widthBreakout), { instructions: instructions });
        }));
        /** @type {?} */
        var p = totalMinWidth / totalWidth;
        /** @type {?} */
        var level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
        try {
            for (var withMinWidth_1 = __values(withMinWidth), withMinWidth_1_1 = withMinWidth_1.next(); !withMinWidth_1_1.done; withMinWidth_1_1 = withMinWidth_1.next()) {
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
        (_a = this.store).addGroupBy.apply(_a, __spread(column));
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
        (_a = this.store).removeGroupBy.apply(_a, __spread(column));
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
            for (var cells_1 = __values(cells), cells_1_1 = cells_1.next(); !cells_1_1.done; cells_1_1 = cells_1.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJN0MsT0FBTyxFQUFhLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBRzFELDBDQStCQzs7Ozs7Ozs7Ozs7SUF0QkMsOENBQTRCOzs7Ozs7SUFNNUIsNENBQXVCOzs7Ozs7SUFNdkIsNENBQXNCOzs7Ozs7Ozs7O0lBU3RCLHNFQUErSDs7Ozs7QUFHakk7Ozs7SUFxQ0U7SUFBd0IsQ0FBQztJQW5DekIsZ0ZBQWdGO0lBQ2hGLHdJQUF3STtJQUN4SSwwRkFBMEY7SUFDMUYseUdBQXlHOzs7Ozs7Ozs7Ozs7SUFDbEcsZ0JBQU07Ozs7Ozs7Ozs7OztJQUFiLFVBQWlCLElBQTBCLEVBQUUsS0FBcUIsRUFBRSxNQUE0Qjs7WUFDeEYsUUFBUSxHQUFHLElBQUksU0FBUyxFQUFLO1FBRW5DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXpCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxzQkFBSSxxQ0FBYzs7OztRQUFsQixjQUFvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDaEUsc0JBQUksdUNBQWdCOzs7O1FBQXBCLGNBQW1DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNqRSxzQkFBSSxxQ0FBYzs7OztRQUFsQixjQUFvQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMs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SUFBQSxVQUFBLFNBQUEsS0FBSyxDQUFBLDRCQUFBLCtDQUFFO2dCQUFsQixJQUFNLENBQUMsa0JBQUE7O29CQUNKLE9BQU8sR0FBRyxtQkFBQSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsRUFBZTtnQkFDekQsSUFBSSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRTtvQkFDOUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO29CQUMvQiw0SkFBNEo7aUJBQzdKO2FBQ0Y7Ozs7Ozs7OztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFTyw2Q0FBeUI7Ozs7SUFBakM7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFsUUQsSUFrUUM7Ozs7Ozs7Ozs7SUFsT0MseUJBQW1DOzs7OztJQUNuQywwQkFBOEI7Ozs7O0lBQzlCLDJCQUFxQzs7Ozs7SUFDckMsNENBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtbiwgaXNQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtblN0b3JlIH0gZnJvbSAnLi9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b1NpemVUb0ZpdE9wdGlvbnMge1xuICAvKipcbiAgICogV2hlbiBgcHhgIHdpbGwgZm9yY2UgYWxsIGNvbHVtbnMgd2lkdGggdG8gYmUgaW4gZml4ZWQgcGl4ZWxzXG4gICAqIFdoZW4gYCVgIHdpbGwgZm9yY2UgYWxsIGNvbHVtbiB3aWR0aCB0byBiZSBpbiAlXG4gICAqIG90aGVyd2lzZSAoZGVmYXVsdCkgdGhlIHdpZHRoIHdpbGwgYmUgc2V0IGluIHRoZSBzYW1lIGZvcm1hdCBpdCB3YXMgb3JpZ2luYWxseSBzZXQuXG4gICAqIGUuZy46IElmIHdpZHRoIHdhcyBgMzMlYCB0aGUgbmV3IHdpZHRoIHdpbGwgYWxzbyBiZSBpbiAlLCBvciBpZiB3aWR0aCBub3Qgc2V0IHRoZSBuZXcgd2lkdGggd2lsbCBub3QgYmUgc2V0IGFzIHdlbGwuXG4gICAqXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBmb3JjZVdpZHRoVHlwZT86ICclJyB8ICdweCc7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGtlZXAgdGhlIGBtaW5XaWR0aGAgY29sdW1uIGRlZmluaXRpb24gKHdoZW4gc2V0KSwgb3RoZXJ3aXNlIHdpbGwgY2xlYXIgaXQuXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBrZWVwTWluV2lkdGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCBrZWVwIHRoZSBgbWF4V2lkdGhgIGNvbHVtbiBkZWZpbml0aW9uICh3aGVuIHNldCksIG90aGVyd2lzZSB3aWxsIGNsZWFyIGl0LlxuICAgKiBEb2VzIG5vdCBhcHBseSB3aGVuIGNvbHVtbkJlaGF2aW9yIGlzIHNldCBhbmQgcmV0dXJucyBhIHZhbHVlLlxuICAgKi9cbiAga2VlcE1heFdpZHRoPzogYm9vbGVhblxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIGZvciBwZXItY29sdW1uIGZpbmUgdHVuaW5nIG9mIHRoZSBwcm9jZXNzLlxuICAgKiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGBQYmxDb2x1bW5gLCBpdHMgcmVsYXRpdmUgd2lkdGggKGluICUsIDAgdG8gMSkgYW5kIHRvdGFsIHdpZHRoIChpbiBwaXhlbHMpIGFuZCBzaG91bGQgcmV0dXJuXG4gICAqIGFuIG9iamVjdCBkZXNjcmliaW5nIGhvdyBpdCBzaG91bGQgYXV0byBmaXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIGZ1bmN0aW9uIHJldHVybnMgdW5kZWZpbmVkIHRoZSBvcHRpb25zIGFyZSB0YWtlbiBmcm9tIHRoZSByb290LlxuICAgKi9cbiAgY29sdW1uQmVoYXZpb3I/KGNvbHVtbjogUGJsQ29sdW1uKTogUGljazxBdXRvU2l6ZVRvRml0T3B0aW9ucywgJ2ZvcmNlV2lkdGhUeXBlJyB8ICdrZWVwTWluV2lkdGgnIHwgJ2tlZXBNYXhXaWR0aCc+IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgQ29sdW1uQXBpPFQ+IHtcblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUPihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPiwgc3RvcmU6IFBibENvbHVtblN0b3JlLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpKTogQ29sdW1uQXBpPFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDb2x1bW5BcGk8VD4oKTtcblxuICAgIGluc3RhbmNlLmdyaWQgPSBncmlkO1xuICAgIGluc3RhbmNlLnN0b3JlID0gc3RvcmU7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgZ2V0IGdyb3VwQnlDb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUuZ3JvdXBCeTsgfVxuICBnZXQgdmlzaWJsZUNvbHVtbklkcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbklkczsgfVxuICBnZXQgdmlzaWJsZUNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUuYWxsQ29sdW1uczsgfVxuXG4gIGdldCB0b3RhbENvbHVtbldpZHRoQ2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgaWYgKCF0aGlzLl90b3RhbENvbHVtbldpZHRoQ2hhbmdlKSB7XG4gICAgICB0aGlzLl90b3RhbENvbHVtbldpZHRoQ2hhbmdlID0gdGhpcy5leHRBcGkuZXZlbnRzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC5raW5kID09PSAnb25SZXNpemVSb3cnKSxcbiAgICAgICAgICBtYXAoIGUgPT4gdGhpcy5ncmlkLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5yZWR1Y2UoIChwLCBjKSA9PiBwICsgYy5zaXplSW5mby53aWR0aCwgMCApICksXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl90b3RhbENvbHVtbldpZHRoQ2hhbmdlO1xuICB9XG5cbiAgcHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBzdG9yZTogUGJsQ29sdW1uU3RvcmU7XG4gIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTtcbiAgcHJpdmF0ZSBfdG90YWxDb2x1bW5XaWR0aENoYW5nZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYFBibENvbHVtbmAgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0IG9mIHJlbmRlcmVkIGNvbHVtbnMgKGkuZS4gbm90IGhpZGRlbikuXG4gICAqL1xuICBmaW5kQ29sdW1uQXQocmVuZGVyQ29sdW1uSW5kZXg6IG51bWJlcik6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uc1tyZW5kZXJDb2x1bW5JbmRleF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29sdW1uIG1hdGNoaW5nIHByb3ZpZGVkIGBpZGAuXG4gICAqXG4gICAqIFRoZSBzZWFyY2ggaXMgcGVyZm9ybWVkIG9uIGFsbCBrbm93biBjb2x1bW5zLlxuICAgKi9cbiAgZmluZENvbHVtbihpZDogc3RyaW5nKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0b3JlLmZpbmQoaWQpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSByZW5kZXIgaW5kZXggb2YgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgKlxuICAqIFRoZSByZW5kZXIgaW5kZXggcmVwcmVzZW50cyB0aGUgY3VycmVudCBsb2NhdGlvbiBvZiB0aGUgY29sdW1uIGluIHRoZSBncm91cCBvZiB2aXNpYmxlIGNvbHVtbnMuXG4gICovXG4gIHJlbmRlckluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiBhIGNvbHVtbiBvciAtMSBpZiBub3QgZm91bmQuXG4gICAqL1xuICBpbmRleE9mKGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmRDb2x1bW4oY29sdW1uKSA6IGNvbHVtbjtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zLmluZGV4T2YoYyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uIHdpdGggdGhlIHByb3ZpZGVkIHdpZHRoLlxuICAgKlxuICAgKiBUaGUgd2lkdGggaXMgc2V0IGluIHB4IG9yICUgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6ICMjJSBvciAjI3B4XG4gICAqIEV4YW1wbGVzOiAnNTAlJywgJzUwcHgnXG4gICAqXG4gICAqIFJlc2l6aW5nIHRoZSBjb2x1bW4gd2lsbCB0cmlnZ2VyIGEgdGFibGUgd2lkdGggcmVzaXppbmcgZXZlbnQsIHVwZGF0aW5nIGNvbHVtbiBncm91cCBpZiBuZWNlc3NhcnkuXG4gICAqL1xuICByZXNpemVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIHdpZHRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb2x1bW4udXBkYXRlV2lkdGgod2lkdGgpO1xuICAgIC8vIHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIC8vIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIHRoZSBjb2x1bW4gdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiAtIENvbnRlbnQ6IEFsbCBvZiB0aGUgY2VsbHMgcmVuZGVyZWQgZm9yIHRoaXMgY29sdW1uIChoZWFkZXIsIGRhdGEgYW5kIGZvb3RlciBjZWxscykuXG4gICAqIC0gQmVzdCBmaXQ6IFRoZSB3aWR0aCBvZiB0aGUgY2VsbCB3aXRoIHRoZSBoZWlnaHQgd2lkdGggbWVhc3VyZWQuXG4gICAqXG4gICAqIFRoZSBiZXN0IGZpdCBmb3VuZCAod2lkdGgpIGlzIHRoZW4gdXNlZCB0byBjYWxsIGByZXNpemVDb2x1bW4oKWAuXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW4pO1xuICAgIHRoaXMucmVzaXplQ29sdW1uKGNvbHVtbiwgYCR7c2l6ZX1weGApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHZpc2libGUgY29sdW1uIGluIHRoZSB0YWJsZSwgcmVzaXplIHRvIGJlc3QgZml0IGl0J3MgY29udGVudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgdmlzaWJsZSBjb2x1bW5zIGluIHRoZSB0YWJsZS5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucygpOiB2b2lkO1xuICAvKipcbiAgICogRm9yIGVhY2ggY29sdW1uIGluIHRoZSBsaXN0IG9mIGNvbHVtbiBwcm92aWRlZCwgcmVzaXplIHRvIGJlc3QgZml0IGl0J3MgY29udGVudC5cbiAgICpcbiAgICogTWFrZSBzdXJlIHlvdSBhcmUgbm90IHJlc2l6aW5nIGFuIGhpZGRlbiBjb2x1bW4uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2ltcGx5IHJ1biBgYXV0b1NpemVDb2x1bW4oKWAgb24gdGhlIGNvbHVtbnMgcHJvdmlkZWQuXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtbnMoLi4uY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICBhdXRvU2l6ZUNvbHVtbnMoLi4uY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBjb25zdCBjb2xzID0gY29sdW1ucy5sZW5ndGggPiAwID8gY29sdW1ucyA6IHRoaXMudmlzaWJsZUNvbHVtbnM7XG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29scykge1xuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgICBjb2x1bW4udXBkYXRlV2lkdGgoYCR7c2l6ZX1weGApO1xuICAgIH1cbiAgICAvLyB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICAvLyB0aGlzLmdyaWQucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHZpc2libGUgY29sdW1uIGluIHRoZSB0YWJsZSwgcmVzaXplIHRoZSB3aWR0aCB0byBhIHByb3BvcnRpb25hbCB3aWR0aCByZWxhdGl2ZSB0byB0aGUgdG90YWwgd2lkdGggcHJvdmlkZWQuXG4gICAqL1xuICBhdXRvU2l6ZVRvRml0KHRvdGFsV2lkdGg6IG51bWJlciwgb3B0aW9uczogQXV0b1NpemVUb0ZpdE9wdGlvbnMgPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IHdMb2dpYyA9IHRoaXMuZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICBjb25zdCB7IHZpc2libGVDb2x1bW5zIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNvbHVtbkJlaGF2aW9yOiBBdXRvU2l6ZVRvRml0T3B0aW9uc1snY29sdW1uQmVoYXZpb3InXSA9IG9wdGlvbnMuY29sdW1uQmVoYXZpb3IgfHwgKCAoKSA9PiBvcHRpb25zICkgYXMgYW55O1xuXG4gICAgbGV0IG92ZXJmbG93VG90YWxXaWR0aCA9IDA7XG4gICAgbGV0IHRvdGFsTWluV2lkdGggPSAwO1xuXG4gICAgY29uc3Qgd2l0aE1pbldpZHRoOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3Qgd2lkdGhCcmVha291dHMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoIChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd0xvZ2ljLndpZHRoQnJlYWtvdXQoY29sdW1uLnNpemVJbmZvKTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IHsgLi4uKGNvbHVtbkJlaGF2aW9yKGNvbHVtbikgfHwge30pLCAuLi5vcHRpb25zIH07XG5cbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQ7XG4gICAgICB0b3RhbFdpZHRoIC09IHdpZHRoQnJlYWtvdXQubm9uQ29udGVudDtcblxuICAgICAgaWYgKGluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggJiYgY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgIHRvdGFsTWluV2lkdGggKz0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICB3aXRoTWluV2lkdGgucHVzaChpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IC4uLndpZHRoQnJlYWtvdXQsIGluc3RydWN0aW9ucyB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcCA9IHRvdGFsTWluV2lkdGggLyB0b3RhbFdpZHRoO1xuICAgIGNvbnN0IGxldmVsID0gKG92ZXJmbG93VG90YWxXaWR0aCAqIHAgIC0gdG90YWxNaW5XaWR0aCkgLyAoMSAtIHApO1xuICAgIGZvciAoY29uc3QgaSBvZiB3aXRoTWluV2lkdGgpIHtcbiAgICAgIGNvbnN0IGFkZGl0aW9uID0gbGV2ZWwgKiAodmlzaWJsZUNvbHVtbnNbaV0ubWluV2lkdGggLyB0b3RhbE1pbldpZHRoKVxuICAgICAgd2lkdGhCcmVha291dHNbaV0uY29udGVudCArPSBhZGRpdGlvbjtcbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSBhZGRpdGlvbjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2libGVDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd2lkdGhCcmVha291dHNbaV07XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB3aWR0aEJyZWFrb3V0Lmluc3RydWN0aW9ucztcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHZpc2libGVDb2x1bW5zW2ldO1xuXG4gICAgICBjb25zdCByID0gd2lkdGhCcmVha291dC5jb250ZW50IC8gb3ZlcmZsb3dUb3RhbFdpZHRoO1xuXG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggfHwgIWNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWF4V2lkdGggfHwgIWNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbHVtbi5jaGVja01heFdpZHRoTG9jayhjb2x1bW4uc2l6ZUluZm8ud2lkdGgpOyAvLyBpZiBpdHMgbG9ja2VkLCB3ZSBuZWVkIHRvIHJlbGVhc2UuLi5cbiAgICAgIH1cblxuICAgICAgLy8gVGhlcmUgYXJlIDMgc2NlbmFyaW9zIHdoZW4gdXBkYXRpbmcgdGhlIGNvbHVtblxuICAgICAgLy8gMSkgaWYgaXQncyBhIGZpeGVkIHdpZHRoIG9yIHdlJ3JlIGZvcmNlIGludG8gZml4ZWQgd2lkdGhcbiAgICAgIC8vIDIpIE5vdCBmaXhlZCB3aWR0aCBhbmQgd2lkdGggaXMgc2V0ICglKVxuICAgICAgLy8gMykgTm90IGZpeGVkIHdpZHRoIGFuIHdpZHRoIGlzIG5vdCBzZXQgKCB0aGUgd2lkdGggZGVwZW5kcyBvbiB0aGUgY2FsY3VsYXRlZCBgZGVmYXVsdFdpZHRoYCBkb25lIGluIGB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKWAgKVxuICAgICAgbGV0IHdpZHRoOiBzdHJpbmc7XG4gICAgICBjb25zdCB7IGZvcmNlV2lkdGhUeXBlIH0gPSBpbnN0cnVjdGlvbnM7XG4gICAgICBpZiAoZm9yY2VXaWR0aFR5cGUgPT09ICdweCcgfHwgKCFmb3JjZVdpZHRoVHlwZSAmJiBjb2x1bW4uaXNGaXhlZFdpZHRoKSkgeyAvLyAoMSlcbiAgICAgICAgd2lkdGggPSBgJHt0b3RhbFdpZHRoICogcn1weGA7XG4gICAgICB9IGVsc2UgaWYgKGZvcmNlV2lkdGhUeXBlID09PSAnJScgfHwgKCFmb3JjZVdpZHRoVHlwZSAmJiBjb2x1bW4ud2lkdGgpKSB7IC8vICgyKVxuICAgICAgICB3aWR0aCA9IGAkezEwMCAqIHJ9JWA7XG4gICAgICB9IC8vIGVsc2UgKDMpIC0+IHRoZSB1cGRhdGUgaXMgc2tpcHBlZCBhbmQgaXQgd2lsbCBydW4gdGhyb3VnaCByZXNldENvbHVtbnNXaWR0aFxuXG4gICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgY29sdW1uLnVwZGF0ZVdpZHRoKHdpZHRoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvLyB3ZSBub3cgcmVzZXQgdGhlIGNvbHVtbiB3aWR0aHMsIHRoaXMgd2lsbCBjYWxjdWxhdGUgYSBuZXcgYGRlZmF1bHRXaWR0aGAgYW5kIHNldCBpdCBpbiBhbGwgY29sdW1ucyBidXQgdGhlIHJlbGV2YW50IG9uZXMgYXJlIGNvbHVtbiBmcm9tICgzKVxuICAgIC8vIEl0IHdpbGwgYWxzbyBtYXJrIGFsbCBjb2x1bW5EZWZzIGZvciBjaGVja1xuICAgIHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgYW5jaG9yYCBjb2x1bW4uXG4gICAqIFRoZSBuZXcgbG9jYXRpb24gb2YgdGhlIGFuY2hvciBjb2x1bW4gd2lsbCBiZSBpdCdzIG9yaWdpbmFsIGxvY2F0aW9uIHBsdXMgb3IgbWludXMgMSwgZGVwZW5kaW5nIG9uIHRoZSBkZWx0YSBiZXR3ZWVuXG4gICAqIHRoZSBjb2x1bW5zLiBJZiB0aGUgb3JpZ2luIG9mIHRoZSBgY29sdW1uYCBpcyBiZWZvcmUgdGhlIGBhbmNob3JgIHRoZW4gdGhlIGFuY2hvcidzIG5ldyBwb3NpdGlvbiBpcyBtaW51cyBvbmUsIG90aGVyd2lzZSBwbHVzIDEuXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuO1xuICAgIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBhdCBgcmVuZGVyQ29sdW1uSW5kZXhgLlxuICAgKiBgcmVuZGVyQ29sdW1uSW5kZXhgIG11c3QgYmUgYSB2aXNpYmxlIGNvbHVtbiAoaS5lLiBub3QgaGlkZGVuKVxuICAgKi9cbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgcmVuZGVyQ29sdW1uSW5kZXg6IG51bWJlciwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiB8IG51bWJlciwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoaXNQYmxDb2x1bW4oYW5jaG9yKSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gY29sdW1uID09PSBhbmNob3IgPyBmYWxzZSA6IHRoaXMuc3RvcmUubW92ZUNvbHVtbihjb2x1bW4sIGFuY2hvcik7XG4gICAgICBpZiAocmVzdWx0ICYmIHNraXBSZWRyYXcgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5hZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhID0gdGhpcy5maW5kQ29sdW1uQXQoYW5jaG9yKTtcbiAgICAgIHJldHVybiBhID8gdGhpcy5tb3ZlQ29sdW1uKGNvbHVtbiwgYSkgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3dhcCBwb3NpdGlvbnMgYmV0d2VlbiAyIGV4aXN0aW5nIGNvbHVtbnMuXG4gICAqL1xuICBzd2FwQ29sdW1ucyhjb2wxOiBQYmxDb2x1bW4sIGNvbDI6IFBibENvbHVtbiwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0b3JlLnN3YXBDb2x1bW5zKGNvbDEsIGNvbDIpO1xuICAgIGlmIChyZXN1bHQgJiYgc2tpcFJlZHJhdyAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5hZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhZGRHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHsgdGhpcy5zdG9yZS5hZGRHcm91cEJ5KC4uLmNvbHVtbik7IH1cbiAgcmVtb3ZlR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7IHRoaXMuc3RvcmUucmVtb3ZlR3JvdXBCeSguLi5jb2x1bW4pOyB9XG5cbiAgcHJpdmF0ZSBmaW5kQ29sdW1uQXV0b1NpemUoY29sdW1uOiBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IHsgY29sdW1uRGVmIH0gPSBjb2x1bW47XG4gICAgY29uc3QgY2VsbHMgPSBjb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoKTtcbiAgICBsZXQgc2l6ZSA9IDA7XG4gICAgZm9yIChjb25zdCBjIG9mIGNlbGxzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gKGMuZmlyc3RFbGVtZW50Q2hpbGQgfHwgYykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoZWxlbWVudC5zY3JvbGxXaWR0aCA+IHNpemUpIHtcbiAgICAgICAgc2l6ZSA9IGVsZW1lbnQuc2Nyb2xsV2lkdGggKyAxO1xuICAgICAgICAvLyB3ZSBhZGQgMSBwaXhlbCBiZWNhdXNlIGBlbGVtZW50LnNjcm9sbFdpZHRoYCBkb2VzIG5vdCBzdXBwb3J0IHN1YnBpeGVsIHZhbHVlcywgdGhlIHdpZHRoIGlzIGNvbnZlcnRlZCB0byBhbiBpbnRlZ2VyIHJlbW92aW5nIHN1YnBpeGVsIHZhbHVlcyAoZnJhY3Rpb25zKS5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNpemU7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgIHRoaXMuc3RvcmUudXBkYXRlR3JvdXBzKCk7XG4gICAgdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxufVxuIl19