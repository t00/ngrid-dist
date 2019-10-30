/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { PblColumn } from './columns/column';
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
     * @param {?} table
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
     * @param {?} table
     * @param {?} store
     * @param {?} extApi
     * @return {?}
     */
    function (table, store, extApi) {
        /** @type {?} */
        var instance = new ColumnApi();
        instance.table = table;
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
        column.updateWidth(true, width);
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
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
                column.updateWidth(true, size + "px");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (cols_1_1 && !cols_1_1.done && (_a = cols_1.return)) _a.call(cols_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
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
            var instructions = columnBehavior(column) || options;
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
        /** @type {?} */
        var sum = [];
        for (var i = 0; i < visibleColumns.length; i++) {
            /** @type {?} */
            var widthBreakout = widthBreakouts[i];
            /** @type {?} */
            var instructions = widthBreakout.instructions;
            /** @type {?} */
            var column = visibleColumns[i];
            /** @type {?} */
            var r = widthBreakout.content / overflowTotalWidth;
            if (!instructions.keepMinWidth) {
                column.minWidth = undefined;
            }
            if (!instructions.keepMaxWidth) {
                column.maxWidth = undefined;
                column.checkMaxWidthLock(column.sizeInfo.width); // if its locked, we need to release...
            }
            // There are 3 scenarios when updating the column
            // 1) if it's a fixed width or we're force into fixed width
            // 2) Not fixed width and width is set (%)
            // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.table.resetColumnsWidth()` )
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
                // We're not updating the width width markForCheck set to true because it will be done right after in `this.table.resetColumnsWidth()`
                column.updateWidth(false, width);
            }
        }
        // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
        // It will also mark all columnDef's for check
        this.table.resetColumnsWidth({ tableMarkForCheck: true });
        this.table.resizeColumns();
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
        if (anchor instanceof PblColumn) {
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
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
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
    ColumnApi.prototype.table;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29sdW1uLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUc3QywwQ0ErQkM7Ozs7Ozs7Ozs7O0lBdEJDLDhDQUE0Qjs7Ozs7O0lBTTVCLDRDQUF1Qjs7Ozs7O0lBTXZCLDRDQUFzQjs7Ozs7Ozs7OztJQVN0QixzRUFBK0g7Ozs7O0FBR2pJOzs7O0lBeUJFO0lBQXdCLENBQUM7SUF2QnpCLGdGQUFnRjtJQUNoRix3SUFBd0k7SUFDeEksMEZBQTBGO0lBQzFGLHlHQUF5Rzs7Ozs7Ozs7Ozs7O0lBQ2xHLGdCQUFNOzs7Ozs7Ozs7Ozs7SUFBYixVQUFpQixLQUEyQixFQUFFLEtBQXFCLEVBQUUsTUFBNEI7O1lBQ3pGLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBSztRQUVuQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQUkscUNBQWM7Ozs7UUFBbEIsY0FBb0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2hFLHNCQUFJLHVDQUFnQjs7OztRQUFwQixjQUFtQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDakUsc0JBQUkscUNBQWM7Ozs7UUFBbEIsY0FBb0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2hFLHNCQUFJLDhCQUFPOzs7O1FBQVgsY0FBNkIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBUTVEOztPQUVHOzs7Ozs7SUFDSCxnQ0FBWTs7Ozs7SUFBWixVQUFhLGlCQUF5QjtRQUNwQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsOEJBQVU7Ozs7Ozs7SUFBVixVQUFXLEVBQVU7O1lBQ2IsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUNsQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRDs7OztNQUlFOzs7Ozs7OztJQUNGLGlDQUFhOzs7Ozs7O0lBQWIsVUFBYyxNQUEwQjs7WUFDaEMsQ0FBQyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUN2RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7Ozs7OztJQUNILDJCQUFPOzs7OztJQUFQLFVBQVEsTUFBMEI7O1lBQzFCLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU07UUFDdkUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7O09BT0c7Ozs7Ozs7Ozs7OztJQUNILGdDQUFZOzs7Ozs7Ozs7OztJQUFaLFVBQWEsTUFBaUIsRUFBRSxLQUFhO1FBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7OztPQU9HOzs7Ozs7Ozs7OztJQUNILGtDQUFjOzs7Ozs7Ozs7O0lBQWQsVUFBZSxNQUFpQjs7WUFDeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUssSUFBSSxPQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7Ozs7SUFlRCxtQ0FBZTs7Ozs7O0lBQWY7O1FBQWdCLGlCQUF1QjthQUF2QixVQUF1QixFQUF2QixxQkFBdUIsRUFBdkIsSUFBdUI7WUFBdkIsNEJBQXVCOzs7WUFDL0IsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjOztZQUMvRCxLQUFxQixJQUFBLFNBQUEsaUJBQUEsSUFBSSxDQUFBLDBCQUFBLDRDQUFFO2dCQUF0QixJQUFNLE1BQU0saUJBQUE7O29CQUNULElBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dCQUM1QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBSyxJQUFJLE9BQUksQ0FBQyxDQUFBO2FBQ3RDOzs7Ozs7Ozs7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7Ozs7Ozs7SUFDSCxpQ0FBYTs7Ozs7O0lBQWIsVUFBYyxVQUFrQixFQUFFLE9BQWtDOztRQUFsQyx3QkFBQSxFQUFBLFlBQWtDOztZQUM1RCxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRTtRQUM5QyxJQUFBLG9DQUFjOztZQUNoQixjQUFjLEdBQTJDLE9BQU8sQ0FBQyxjQUFjLElBQUksbUJBQUE7OztRQUFFLGNBQU0sT0FBQSxPQUFPLEVBQVAsQ0FBTyxFQUFFLEVBQU87O1lBRTdHLGtCQUFrQixHQUFHLENBQUM7O1lBQ3RCLGFBQWEsR0FBRyxDQUFDOztZQUVmLFlBQVksR0FBYSxFQUFFOztZQUUzQixjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUc7Ozs7O1FBQUUsVUFBQyxNQUFNLEVBQUUsS0FBSzs7Z0JBQ2pELGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7O2dCQUNyRCxZQUFZLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU87WUFFdEQsa0JBQWtCLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUM1QyxVQUFVLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQztZQUV2QyxJQUFJLFlBQVksQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDaEQsYUFBYSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDMUI7WUFFRCw0QkFBWSxhQUFhLElBQUUsWUFBWSxjQUFBLElBQUc7UUFDNUMsQ0FBQyxFQUFDOztZQUVJLENBQUMsR0FBRyxhQUFhLEdBQUcsVUFBVTs7WUFDOUIsS0FBSyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxHQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7WUFDakUsS0FBZ0IsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUEsb0VBQUU7Z0JBQXpCLElBQU0sQ0FBQyx5QkFBQTs7b0JBQ0osUUFBUSxHQUFHLEtBQUssR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO2dCQUNyRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQztnQkFDdEMsa0JBQWtCLElBQUksUUFBUSxDQUFDO2FBQ2hDOzs7Ozs7Ozs7O1lBRUcsR0FBRyxHQUFFLEVBQUU7UUFDWCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3hDLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDOztnQkFDakMsWUFBWSxHQUFHLGFBQWEsQ0FBQyxZQUFZOztnQkFDekMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUM7O2dCQUUxQixDQUFDLEdBQUcsYUFBYSxDQUFDLE9BQU8sR0FBRyxrQkFBa0I7WUFFcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQzlCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2FBQzdCO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO2dCQUM1QixNQUFNLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLHVDQUF1QzthQUMxRjs7Ozs7O2dCQU1HLEtBQUssU0FBUTtZQUNULElBQUEsNENBQWM7WUFDdEIsSUFBSSxjQUFjLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsTUFBTTtnQkFDL0UsS0FBSyxHQUFNLFVBQVUsR0FBRyxDQUFDLE9BQUksQ0FBQzthQUMvQjtpQkFBTSxJQUFJLGNBQWMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNO2dCQUM5RSxLQUFLLEdBQU0sR0FBRyxHQUFHLENBQUMsTUFBRyxDQUFDO2FBQ3ZCLENBQUMsOEVBQThFO1lBRWhGLElBQUksS0FBSyxFQUFFO2dCQUNULHNJQUFzSTtnQkFDdEksTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDbEM7U0FFRjtRQUNELCtJQUErSTtRQUMvSSw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDOzs7Ozs7OztJQWFELDhCQUFVOzs7Ozs7OztJQUFWLFVBQVcsTUFBaUIsRUFBRSxNQUEwQixFQUFFLFVBQW9CO1FBQzVFLElBQUksTUFBTSxZQUFZLFNBQVMsRUFBRTs7Z0JBQ3pCLE1BQU0sR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDaEYsSUFBSSxNQUFNLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtnQkFDakMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7YUFDbEM7WUFDRCxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU07O2dCQUNDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRDs7T0FFRzs7Ozs7Ozs7SUFDSCwrQkFBVzs7Ozs7OztJQUFYLFVBQVksSUFBZSxFQUFFLElBQWUsRUFBRSxVQUFvQjs7WUFDMUQsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDakQsSUFBSSxNQUFNLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtZQUNqQyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNsQztRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Ozs7O0lBRUQsOEJBQVU7Ozs7SUFBVjs7UUFBVyxnQkFBc0I7YUFBdEIsVUFBc0IsRUFBdEIscUJBQXNCLEVBQXRCLElBQXNCO1lBQXRCLDJCQUFzQjs7UUFBVSxDQUFBLEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLFVBQVUsNEJBQUksTUFBTSxHQUFFO0lBQUMsQ0FBQzs7Ozs7SUFDOUUsaUNBQWE7Ozs7SUFBYjs7UUFBYyxnQkFBc0I7YUFBdEIsVUFBc0IsRUFBdEIscUJBQXNCLEVBQXRCLElBQXNCO1lBQXRCLDJCQUFzQjs7UUFBVSxDQUFBLEtBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQSxDQUFDLGFBQWEsNEJBQUksTUFBTSxHQUFFO0lBQUMsQ0FBQzs7Ozs7O0lBRTVFLHNDQUFrQjs7Ozs7SUFBMUIsVUFBMkIsTUFBaUI7O1FBQ2xDLElBQUEsNEJBQVM7O1lBQ1gsS0FBSyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRTs7WUFDdkMsSUFBSSxHQUFHLENBQUM7O1lBQ1osS0FBZ0IsSUFBQSxVQUFBLGlCQUFBLEtBQUssQ0FBQSw0QkFBQSwrQ0FBRTtnQkFBbEIsSUFBTSxDQUFDLGtCQUFBOztvQkFDSixPQUFPLEdBQUcsbUJBQUEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLEVBQWU7Z0JBQ3pELElBQUksT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLEVBQUU7b0JBQzlCLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztvQkFDL0IsNEpBQTRKO2lCQUM3SjthQUNGOzs7Ozs7Ozs7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7O0lBRU8sNkNBQXlCOzs7O0lBQWpDO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBeFBELElBd1BDOzs7Ozs7Ozs7O0lBbk9DLDBCQUFvQzs7Ozs7SUFDcEMsMEJBQThCOzs7OztJQUM5QiwyQkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9TaXplVG9GaXRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFdoZW4gYHB4YCB3aWxsIGZvcmNlIGFsbCBjb2x1bW5zIHdpZHRoIHRvIGJlIGluIGZpeGVkIHBpeGVsc1xuICAgKiBXaGVuIGAlYCB3aWxsIGZvcmNlIGFsbCBjb2x1bW4gd2lkdGggdG8gYmUgaW4gJVxuICAgKiBvdGhlcndpc2UgKGRlZmF1bHQpIHRoZSB3aWR0aCB3aWxsIGJlIHNldCBpbiB0aGUgc2FtZSBmb3JtYXQgaXQgd2FzIG9yaWdpbmFsbHkgc2V0LlxuICAgKiBlLmcuOiBJZiB3aWR0aCB3YXMgYDMzJWAgdGhlIG5ldyB3aWR0aCB3aWxsIGFsc28gYmUgaW4gJSwgb3IgaWYgd2lkdGggbm90IHNldCB0aGUgbmV3IHdpZHRoIHdpbGwgbm90IGJlIHNldCBhcyB3ZWxsLlxuICAgKlxuICAgKiBEb2VzIG5vdCBhcHBseSB3aGVuIGNvbHVtbkJlaGF2aW9yIGlzIHNldCBhbmQgcmV0dXJucyBhIHZhbHVlLlxuICAgKi9cbiAgZm9yY2VXaWR0aFR5cGU/OiAnJScgfCAncHgnO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCBrZWVwIHRoZSBgbWluV2lkdGhgIGNvbHVtbiBkZWZpbml0aW9uICh3aGVuIHNldCksIG90aGVyd2lzZSB3aWxsIGNsZWFyIGl0LlxuICAgKiBEb2VzIG5vdCBhcHBseSB3aGVuIGNvbHVtbkJlaGF2aW9yIGlzIHNldCBhbmQgcmV0dXJucyBhIHZhbHVlLlxuICAgKi9cbiAga2VlcE1pbldpZHRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwga2VlcCB0aGUgYG1heFdpZHRoYCBjb2x1bW4gZGVmaW5pdGlvbiAod2hlbiBzZXQpLCBvdGhlcndpc2Ugd2lsbCBjbGVhciBpdC5cbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGtlZXBNYXhXaWR0aD86IGJvb2xlYW5cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiBmb3IgcGVyLWNvbHVtbiBmaW5lIHR1bmluZyBvZiB0aGUgcHJvY2Vzcy5cbiAgICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBgUGJsQ29sdW1uYCwgaXRzIHJlbGF0aXZlIHdpZHRoIChpbiAlLCAwIHRvIDEpIGFuZCB0b3RhbCB3aWR0aCAoaW4gcGl4ZWxzKSBhbmQgc2hvdWxkIHJldHVyblxuICAgKiBhbiBvYmplY3QgZGVzY3JpYmluZyBob3cgaXQgc2hvdWxkIGF1dG8gZml0LlxuICAgKlxuICAgKiBXaGVuIHRoZSBmdW5jdGlvbiByZXR1cm5zIHVuZGVmaW5lZCB0aGUgb3B0aW9ucyBhcmUgdGFrZW4gZnJvbSB0aGUgcm9vdC5cbiAgICovXG4gIGNvbHVtbkJlaGF2aW9yPyhjb2x1bW46IFBibENvbHVtbik6IFBpY2s8QXV0b1NpemVUb0ZpdE9wdGlvbnMsICdmb3JjZVdpZHRoVHlwZScgfCAna2VlcE1pbldpZHRoJyB8ICdrZWVwTWF4V2lkdGgnPiB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbHVtbkFwaTxUPiB7XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VD4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+LCBzdG9yZTogUGJsQ29sdW1uU3RvcmUsIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGkpOiBDb2x1bW5BcGk8VD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbHVtbkFwaTxUPigpO1xuXG4gICAgaW5zdGFuY2UudGFibGUgPSB0YWJsZTtcbiAgICBpbnN0YW5jZS5zdG9yZSA9IHN0b3JlO1xuICAgIGluc3RhbmNlLmV4dEFwaSA9IGV4dEFwaTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIGdldCBncm91cEJ5Q29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmdyb3VwQnk7IH1cbiAgZ2V0IHZpc2libGVDb2x1bW5JZHMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5JZHM7IH1cbiAgZ2V0IHZpc2libGVDb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uczsgfVxuICBnZXQgY29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnM7IH1cblxuICBwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBzdG9yZTogUGJsQ29sdW1uU3RvcmU7XG4gIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBQYmxDb2x1bW5gIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggZnJvbSB0aGUgbGlzdCBvZiByZW5kZXJlZCBjb2x1bW5zIChpLmUuIG5vdCBoaWRkZW4pLlxuICAgKi9cbiAgZmluZENvbHVtbkF0KHJlbmRlckNvbHVtbkluZGV4OiBudW1iZXIpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnNbcmVuZGVyQ29sdW1uSW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbHVtbiBtYXRjaGluZyBwcm92aWRlZCBgaWRgLlxuICAgKlxuICAgKiBUaGUgc2VhcmNoIGlzIHBlcmZvcm1lZCBvbiBhbGwga25vd24gY29sdW1ucy5cbiAgICovXG4gIGZpbmRDb2x1bW4oaWQ6IHN0cmluZyk6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5maW5kKGlkKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgcmVuZGVyIGluZGV4IG9mIGNvbHVtbiBvciAtMSBpZiBub3QgZm91bmQuXG4gICpcbiAgKiBUaGUgcmVuZGVyIGluZGV4IHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgbG9jYXRpb24gb2YgdGhlIGNvbHVtbiBpbiB0aGUgZ3JvdXAgb2YgdmlzaWJsZSBjb2x1bW5zLlxuICAqL1xuICByZW5kZXJJbmRleE9mKGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmRDb2x1bW4oY29sdW1uKSA6IGNvbHVtbjtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zLmluZGV4T2YoYyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgYSBjb2x1bW4gb3IgLTEgaWYgbm90IGZvdW5kLlxuICAgKi9cbiAgaW5kZXhPZihjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnID8gdGhpcy5maW5kQ29sdW1uKGNvbHVtbikgOiBjb2x1bW47XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYWxsQ29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbiB3aXRoIHRoZSBwcm92aWRlZCB3aWR0aC5cbiAgICpcbiAgICogVGhlIHdpZHRoIGlzIHNldCBpbiBweCBvciAlIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiAjIyUgb3IgIyNweFxuICAgKiBFeGFtcGxlczogJzUwJScsICc1MHB4J1xuICAgKlxuICAgKiBSZXNpemluZyB0aGUgY29sdW1uIHdpbGwgdHJpZ2dlciBhIHRhYmxlIHdpZHRoIHJlc2l6aW5nIGV2ZW50LCB1cGRhdGluZyBjb2x1bW4gZ3JvdXAgaWYgbmVjZXNzYXJ5LlxuICAgKi9cbiAgcmVzaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCB3aWR0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29sdW1uLnVwZGF0ZVdpZHRoKHRydWUsIHdpZHRoKVxuICAgIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgdGhlIGNvbHVtbiB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIC0gQ29udGVudDogQWxsIG9mIHRoZSBjZWxscyByZW5kZXJlZCBmb3IgdGhpcyBjb2x1bW4gKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyIGNlbGxzKS5cbiAgICogLSBCZXN0IGZpdDogVGhlIHdpZHRoIG9mIHRoZSBjZWxsIHdpdGggdGhlIGhlaWdodCB3aWR0aCBtZWFzdXJlZC5cbiAgICpcbiAgICogVGhlIGJlc3QgZml0IGZvdW5kICh3aWR0aCkgaXMgdGhlbiB1c2VkIHRvIGNhbGwgYHJlc2l6ZUNvbHVtbigpYC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgdGhpcy5yZXNpemVDb2x1bW4oY29sdW1uLCBgJHtzaXplfXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSB2aXNpYmxlIGNvbHVtbnMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGxpc3Qgb2YgY29sdW1uIHByb3ZpZGVkLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBNYWtlIHN1cmUgeW91IGFyZSBub3QgcmVzaXppbmcgYW4gaGlkZGVuIGNvbHVtbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgY29sdW1ucyBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHMgPSBjb2x1bW5zLmxlbmd0aCA+IDAgPyBjb2x1bW5zIDogdGhpcy52aXNpYmxlQ29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2xzKSB7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICAgIGNvbHVtbi51cGRhdGVXaWR0aCh0cnVlLCBgJHtzaXplfXB4YClcbiAgICB9XG4gICAgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMudGFibGUucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHZpc2libGUgY29sdW1uIGluIHRoZSB0YWJsZSwgcmVzaXplIHRoZSB3aWR0aCB0byBhIHByb3BvcnRpb25hbCB3aWR0aCByZWxhdGl2ZSB0byB0aGUgdG90YWwgd2lkdGggcHJvdmlkZWQuXG4gICAqL1xuICBhdXRvU2l6ZVRvRml0KHRvdGFsV2lkdGg6IG51bWJlciwgb3B0aW9uczogQXV0b1NpemVUb0ZpdE9wdGlvbnMgPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IHdMb2dpYyA9IHRoaXMuZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICBjb25zdCB7IHZpc2libGVDb2x1bW5zIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNvbHVtbkJlaGF2aW9yOiBBdXRvU2l6ZVRvRml0T3B0aW9uc1snY29sdW1uQmVoYXZpb3InXSA9IG9wdGlvbnMuY29sdW1uQmVoYXZpb3IgfHwgKCAoKSA9PiBvcHRpb25zICkgYXMgYW55O1xuXG4gICAgbGV0IG92ZXJmbG93VG90YWxXaWR0aCA9IDA7XG4gICAgbGV0IHRvdGFsTWluV2lkdGggPSAwO1xuXG4gICAgY29uc3Qgd2l0aE1pbldpZHRoOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3Qgd2lkdGhCcmVha291dHMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoIChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd0xvZ2ljLndpZHRoQnJlYWtvdXQoY29sdW1uLnNpemVJbmZvKTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IGNvbHVtbkJlaGF2aW9yKGNvbHVtbikgfHwgb3B0aW9ucztcblxuICAgICAgb3ZlcmZsb3dUb3RhbFdpZHRoICs9IHdpZHRoQnJlYWtvdXQuY29udGVudDtcbiAgICAgIHRvdGFsV2lkdGggLT0gd2lkdGhCcmVha291dC5ub25Db250ZW50O1xuXG4gICAgICBpZiAoaW5zdHJ1Y3Rpb25zLmtlZXBNaW5XaWR0aCAmJiBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgdG90YWxNaW5XaWR0aCArPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgICAgIHdpdGhNaW5XaWR0aC5wdXNoKGluZGV4KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4ud2lkdGhCcmVha291dCwgaW5zdHJ1Y3Rpb25zIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwID0gdG90YWxNaW5XaWR0aCAvIHRvdGFsV2lkdGg7XG4gICAgY29uc3QgbGV2ZWwgPSAob3ZlcmZsb3dUb3RhbFdpZHRoICogcCAgLSB0b3RhbE1pbldpZHRoKSAvICgxIC0gcCk7XG4gICAgZm9yIChjb25zdCBpIG9mIHdpdGhNaW5XaWR0aCkge1xuICAgICAgY29uc3QgYWRkaXRpb24gPSBsZXZlbCAqICh2aXNpYmxlQ29sdW1uc1tpXS5taW5XaWR0aCAvIHRvdGFsTWluV2lkdGgpXG4gICAgICB3aWR0aEJyZWFrb3V0c1tpXS5jb250ZW50ICs9IGFkZGl0aW9uO1xuICAgICAgb3ZlcmZsb3dUb3RhbFdpZHRoICs9IGFkZGl0aW9uO1xuICAgIH1cblxuICAgIGxldCBzdW0gPVtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlzaWJsZUNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHdpZHRoQnJlYWtvdXQgPSB3aWR0aEJyZWFrb3V0c1tpXTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IHdpZHRoQnJlYWtvdXQuaW5zdHJ1Y3Rpb25zO1xuICAgICAgY29uc3QgY29sdW1uID0gdmlzaWJsZUNvbHVtbnNbaV07XG5cbiAgICAgIGNvbnN0IHIgPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQgLyBvdmVyZmxvd1RvdGFsV2lkdGg7XG5cbiAgICAgIGlmICghaW5zdHJ1Y3Rpb25zLmtlZXBNaW5XaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWF4V2lkdGgpIHtcbiAgICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgIGNvbHVtbi5jaGVja01heFdpZHRoTG9jayhjb2x1bW4uc2l6ZUluZm8ud2lkdGgpOyAvLyBpZiBpdHMgbG9ja2VkLCB3ZSBuZWVkIHRvIHJlbGVhc2UuLi5cbiAgICAgIH1cblxuICAgICAgLy8gVGhlcmUgYXJlIDMgc2NlbmFyaW9zIHdoZW4gdXBkYXRpbmcgdGhlIGNvbHVtblxuICAgICAgLy8gMSkgaWYgaXQncyBhIGZpeGVkIHdpZHRoIG9yIHdlJ3JlIGZvcmNlIGludG8gZml4ZWQgd2lkdGhcbiAgICAgIC8vIDIpIE5vdCBmaXhlZCB3aWR0aCBhbmQgd2lkdGggaXMgc2V0ICglKVxuICAgICAgLy8gMykgTm90IGZpeGVkIHdpZHRoIGFuIHdpZHRoIGlzIG5vdCBzZXQgKCB0aGUgd2lkdGggZGVwZW5kcyBvbiB0aGUgY2FsY3VsYXRlZCBgZGVmYXVsdFdpZHRoYCBkb25lIGluIGB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKClgIClcbiAgICAgIGxldCB3aWR0aDogc3RyaW5nO1xuICAgICAgY29uc3QgeyBmb3JjZVdpZHRoVHlwZSB9ID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgaWYgKGZvcmNlV2lkdGhUeXBlID09PSAncHgnIHx8ICghZm9yY2VXaWR0aFR5cGUgJiYgY29sdW1uLmlzRml4ZWRXaWR0aCkpIHsgLy8gKDEpXG4gICAgICAgIHdpZHRoID0gYCR7dG90YWxXaWR0aCAqIHJ9cHhgO1xuICAgICAgfSBlbHNlIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJyUnIHx8ICghZm9yY2VXaWR0aFR5cGUgJiYgY29sdW1uLndpZHRoKSkgeyAvLyAoMilcbiAgICAgICAgd2lkdGggPSBgJHsxMDAgKiByfSVgO1xuICAgICAgfSAvLyBlbHNlICgzKSAtPiB0aGUgdXBkYXRlIGlzIHNraXBwZWQgYW5kIGl0IHdpbGwgcnVuIHRocm91Z2ggcmVzZXRDb2x1bW5zV2lkdGhcblxuICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIC8vIFdlJ3JlIG5vdCB1cGRhdGluZyB0aGUgd2lkdGggd2lkdGggbWFya0ZvckNoZWNrIHNldCB0byB0cnVlIGJlY2F1c2UgaXQgd2lsbCBiZSBkb25lIHJpZ2h0IGFmdGVyIGluIGB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKClgXG4gICAgICAgIGNvbHVtbi51cGRhdGVXaWR0aChmYWxzZSwgd2lkdGgpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vIHdlIG5vdyByZXNldCB0aGUgY29sdW1uIHdpZHRocywgdGhpcyB3aWxsIGNhbGN1bGF0ZSBhIG5ldyBgZGVmYXVsdFdpZHRoYCBhbmQgc2V0IGl0IGluIGFsbCBjb2x1bW5zIGJ1dCB0aGUgcmVsZXZhbnQgb25lcyBhcmUgY29sdW1uIGZyb20gKDMpXG4gICAgLy8gSXQgd2lsbCBhbHNvIG1hcmsgYWxsIGNvbHVtbkRlZidzIGZvciBjaGVja1xuICAgIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoeyB0YWJsZU1hcmtGb3JDaGVjazogdHJ1ZSB9KTtcbiAgICB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBhbmNob3JgIGNvbHVtbi5cbiAgICogVGhlIG5ldyBsb2NhdGlvbiBvZiB0aGUgYW5jaG9yIGNvbHVtbiB3aWxsIGJlIGl0J3Mgb3JpZ2luYWwgbG9jYXRpb24gcGx1cyBvciBtaW51cyAxLCBkZXBlbmRpbmcgb24gdGhlIGRlbHRhIGJldHdlZW5cbiAgICogdGhlIGNvbHVtbnMuIElmIHRoZSBvcmlnaW4gb2YgdGhlIGBjb2x1bW5gIGlzIGJlZm9yZSB0aGUgYGFuY2hvcmAgdGhlbiB0aGUgYW5jaG9yJ3MgbmV3IHBvc2l0aW9uIGlzIG1pbnVzIG9uZSwgb3RoZXJ3aXNlIHBsdXMgMS5cbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW47XG4gICAgLyoqXG4gICAqIE1vdmUgdGhlIHByb3ZpZGVkIGBjb2x1bW5gIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29sdW1uIGF0IGByZW5kZXJDb2x1bW5JbmRleGAuXG4gICAqIGByZW5kZXJDb2x1bW5JbmRleGAgbXVzdCBiZSBhIHZpc2libGUgY29sdW1uIChpLmUuIG5vdCBoaWRkZW4pXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCByZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uIHwgbnVtYmVyLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGlmIChhbmNob3IgaW5zdGFuY2VvZiBQYmxDb2x1bW4pIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbHVtbiA9PT0gYW5jaG9yID8gZmFsc2UgOiB0aGlzLnN0b3JlLm1vdmVDb2x1bW4oY29sdW1uLCBhbmNob3IpO1xuICAgICAgaWYgKHJlc3VsdCAmJiBza2lwUmVkcmF3ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYSA9IHRoaXMuZmluZENvbHVtbkF0KGFuY2hvcik7XG4gICAgICByZXR1cm4gYSA/IHRoaXMubW92ZUNvbHVtbihjb2x1bW4sIGEpIDogZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3YXAgcG9zaXRpb25zIGJldHdlZW4gMiBleGlzdGluZyBjb2x1bW5zLlxuICAgKi9cbiAgc3dhcENvbHVtbnMoY29sMTogUGJsQ29sdW1uLCBjb2wyOiBQYmxDb2x1bW4sIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5zd2FwQ29sdW1ucyhjb2wxLCBjb2wyKTtcbiAgICBpZiAocmVzdWx0ICYmIHNraXBSZWRyYXcgIT09IHRydWUpIHtcbiAgICAgIHRoaXMuYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYWRkR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7IHRoaXMuc3RvcmUuYWRkR3JvdXBCeSguLi5jb2x1bW4pOyB9XG4gIHJlbW92ZUdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQgeyB0aGlzLnN0b3JlLnJlbW92ZUdyb3VwQnkoLi4uY29sdW1uKTsgfVxuXG4gIHByaXZhdGUgZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbjogUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGNvbHVtbkRlZiB9ID0gY29sdW1uO1xuICAgIGNvbnN0IGNlbGxzID0gY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCk7XG4gICAgbGV0IHNpemUgPSAwO1xuICAgIGZvciAoY29uc3QgYyBvZiBjZWxscykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IChjLmZpcnN0RWxlbWVudENoaWxkIHx8IGMpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsV2lkdGggPiBzaXplKSB7XG4gICAgICAgIHNpemUgPSBlbGVtZW50LnNjcm9sbFdpZHRoICsgMTtcbiAgICAgICAgLy8gd2UgYWRkIDEgcGl4ZWwgYmVjYXVzZSBgZWxlbWVudC5zY3JvbGxXaWR0aGAgZG9lcyBub3Qgc3VwcG9ydCBzdWJwaXhlbCB2YWx1ZXMsIHRoZSB3aWR0aCBpcyBjb252ZXJ0ZWQgdG8gYW4gaW50ZWdlciByZW1vdmluZyBzdWJwaXhlbCB2YWx1ZXMgKGZyYWN0aW9ucykuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICB0aGlzLnN0b3JlLnVwZGF0ZUdyb3VwcygpO1xuICAgIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxufVxuIl19