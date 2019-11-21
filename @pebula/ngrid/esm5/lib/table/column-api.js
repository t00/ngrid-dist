/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        column.updateWidth(width);
        // this.table.resetColumnsWidth();
        // this.table.resizeColumns();
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
        // this.table.resetColumnsWidth();
        // this.table.resizeColumns();
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
                column.updateWidth(width);
            }
        }
        // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
        // It will also mark all columnDefs for check
        this.table.resetColumnsWidth();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29sdW1uLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLE9BQU8sRUFBYSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUcxRCwwQ0ErQkM7Ozs7Ozs7Ozs7O0lBdEJDLDhDQUE0Qjs7Ozs7O0lBTTVCLDRDQUF1Qjs7Ozs7O0lBTXZCLDRDQUFzQjs7Ozs7Ozs7OztJQVN0QixzRUFBK0g7Ozs7O0FBR2pJOzs7O0lBeUJFO0lBQXdCLENBQUM7SUF2QnpCLGdGQUFnRjtJQUNoRix3SUFBd0k7SUFDeEksMEZBQTBGO0lBQzFGLHlHQUF5Rzs7Ozs7Ozs7Ozs7O0lBQ2xHLGdCQUFNOzs7Ozs7Ozs7Ozs7SUFBYixVQUFpQixLQUEyQixFQUFFLEtBQXFCLEVBQUUsTUFBNEI7O1lBQ3pGLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBSztRQUVuQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsc0JBQUkscUNBQWM7Ozs7UUFBbEIsY0FBb0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2hFLHNCQUFJLHVDQUFnQjs7OztRQUFwQixjQUFtQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDakUsc0JBQUkscUNBQWM7Ozs7UUFBbEIsY0FBb0MsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2hFLHNCQUFJLDhCQUFPOzs7O1FBQVgsY0FBNkIsT0FBTyxJQUFJ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Qzs7Ozs7SUFDcEMsMEJBQThCOzs7OztJQUM5QiwyQkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBpc1BibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uU3RvcmUgfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvU2l6ZVRvRml0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGVuIGBweGAgd2lsbCBmb3JjZSBhbGwgY29sdW1ucyB3aWR0aCB0byBiZSBpbiBmaXhlZCBwaXhlbHNcbiAgICogV2hlbiBgJWAgd2lsbCBmb3JjZSBhbGwgY29sdW1uIHdpZHRoIHRvIGJlIGluICVcbiAgICogb3RoZXJ3aXNlIChkZWZhdWx0KSB0aGUgd2lkdGggd2lsbCBiZSBzZXQgaW4gdGhlIHNhbWUgZm9ybWF0IGl0IHdhcyBvcmlnaW5hbGx5IHNldC5cbiAgICogZS5nLjogSWYgd2lkdGggd2FzIGAzMyVgIHRoZSBuZXcgd2lkdGggd2lsbCBhbHNvIGJlIGluICUsIG9yIGlmIHdpZHRoIG5vdCBzZXQgdGhlIG5ldyB3aWR0aCB3aWxsIG5vdCBiZSBzZXQgYXMgd2VsbC5cbiAgICpcbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGZvcmNlV2lkdGhUeXBlPzogJyUnIHwgJ3B4JztcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwga2VlcCB0aGUgYG1pbldpZHRoYCBjb2x1bW4gZGVmaW5pdGlvbiAod2hlbiBzZXQpLCBvdGhlcndpc2Ugd2lsbCBjbGVhciBpdC5cbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGtlZXBNaW5XaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGtlZXAgdGhlIGBtYXhXaWR0aGAgY29sdW1uIGRlZmluaXRpb24gKHdoZW4gc2V0KSwgb3RoZXJ3aXNlIHdpbGwgY2xlYXIgaXQuXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBrZWVwTWF4V2lkdGg/OiBib29sZWFuXG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gZm9yIHBlci1jb2x1bW4gZmluZSB0dW5pbmcgb2YgdGhlIHByb2Nlc3MuXG4gICAqIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgYFBibENvbHVtbmAsIGl0cyByZWxhdGl2ZSB3aWR0aCAoaW4gJSwgMCB0byAxKSBhbmQgdG90YWwgd2lkdGggKGluIHBpeGVscykgYW5kIHNob3VsZCByZXR1cm5cbiAgICogYW4gb2JqZWN0IGRlc2NyaWJpbmcgaG93IGl0IHNob3VsZCBhdXRvIGZpdC5cbiAgICpcbiAgICogV2hlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyB1bmRlZmluZWQgdGhlIG9wdGlvbnMgYXJlIHRha2VuIGZyb20gdGhlIHJvb3QuXG4gICAqL1xuICBjb2x1bW5CZWhhdmlvcj8oY29sdW1uOiBQYmxDb2x1bW4pOiBQaWNrPEF1dG9TaXplVG9GaXRPcHRpb25zLCAnZm9yY2VXaWR0aFR5cGUnIHwgJ2tlZXBNaW5XaWR0aCcgfCAna2VlcE1heFdpZHRoJz4gfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BcGk8VD4ge1xuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQ+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPiwgc3RvcmU6IFBibENvbHVtblN0b3JlLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpKTogQ29sdW1uQXBpPFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDb2x1bW5BcGk8VD4oKTtcblxuICAgIGluc3RhbmNlLnRhYmxlID0gdGFibGU7XG4gICAgaW5zdGFuY2Uuc3RvcmUgPSBzdG9yZTtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBnZXQgZ3JvdXBCeUNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5ncm91cEJ5OyB9XG4gIGdldCB2aXNpYmxlQ29sdW1uSWRzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uSWRzOyB9XG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zOyB9XG5cbiAgcHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgc3RvcmU6IFBibENvbHVtblN0b3JlO1xuICBwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgUGJsQ29sdW1uYCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhlIGxpc3Qgb2YgcmVuZGVyZWQgY29sdW1ucyAoaS5lLiBub3QgaGlkZGVuKS5cbiAgICovXG4gIGZpbmRDb2x1bW5BdChyZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zW3JlbmRlckNvbHVtbkluZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gbWF0Y2hpbmcgcHJvdmlkZWQgYGlkYC5cbiAgICpcbiAgICogVGhlIHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gYWxsIGtub3duIGNvbHVtbnMuXG4gICAqL1xuICBmaW5kQ29sdW1uKGlkOiBzdHJpbmcpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuZmluZChpZCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJlbmRlciBpbmRleCBvZiBjb2x1bW4gb3IgLTEgaWYgbm90IGZvdW5kLlxuICAqXG4gICogVGhlIHJlbmRlciBpbmRleCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGxvY2F0aW9uIG9mIHRoZSBjb2x1bW4gaW4gdGhlIGdyb3VwIG9mIHZpc2libGUgY29sdW1ucy5cbiAgKi9cbiAgcmVuZGVySW5kZXhPZihjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnID8gdGhpcy5maW5kQ29sdW1uKGNvbHVtbikgOiBjb2x1bW47XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluZGV4IG9mIGEgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gd2l0aCB0aGUgcHJvdmlkZWQgd2lkdGguXG4gICAqXG4gICAqIFRoZSB3aWR0aCBpcyBzZXQgaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICpcbiAgICogUmVzaXppbmcgdGhlIGNvbHVtbiB3aWxsIHRyaWdnZXIgYSB0YWJsZSB3aWR0aCByZXNpemluZyBldmVudCwgdXBkYXRpbmcgY29sdW1uIGdyb3VwIGlmIG5lY2Vzc2FyeS5cbiAgICovXG4gIHJlc2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgd2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbHVtbi51cGRhdGVXaWR0aCh3aWR0aCk7XG4gICAgLy8gdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIC8vIHRoaXMudGFibGUucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSB0aGUgY29sdW1uIHRvIGJlc3QgZml0IGl0J3MgY29udGVudC5cbiAgICpcbiAgICogLSBDb250ZW50OiBBbGwgb2YgdGhlIGNlbGxzIHJlbmRlcmVkIGZvciB0aGlzIGNvbHVtbiAoaGVhZGVyLCBkYXRhIGFuZCBmb290ZXIgY2VsbHMpLlxuICAgKiAtIEJlc3QgZml0OiBUaGUgd2lkdGggb2YgdGhlIGNlbGwgd2l0aCB0aGUgaGVpZ2h0IHdpZHRoIG1lYXN1cmVkLlxuICAgKlxuICAgKiBUaGUgYmVzdCBmaXQgZm91bmQgKHdpZHRoKSBpcyB0aGVuIHVzZWQgdG8gY2FsbCBgcmVzaXplQ29sdW1uKClgLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICB0aGlzLnJlc2l6ZUNvbHVtbihjb2x1bW4sIGAke3NpemV9cHhgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCB2aXNpYmxlIGNvbHVtbiBpbiB0aGUgdGFibGUsIHJlc2l6ZSB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2ltcGx5IHJ1biBgYXV0b1NpemVDb2x1bW4oKWAgb24gdGhlIHZpc2libGUgY29sdW1ucyBpbiB0aGUgdGFibGUuXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtbnMoKTogdm9pZDtcbiAgLyoqXG4gICAqIEZvciBlYWNoIGNvbHVtbiBpbiB0aGUgbGlzdCBvZiBjb2x1bW4gcHJvdmlkZWQsIHJlc2l6ZSB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIE1ha2Ugc3VyZSB5b3UgYXJlIG5vdCByZXNpemluZyBhbiBoaWRkZW4gY29sdW1uLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSBjb2x1bW5zIHByb3ZpZGVkLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKC4uLmNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZDsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbiAgYXV0b1NpemVDb2x1bW5zKC4uLmNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgY29uc3QgY29scyA9IGNvbHVtbnMubGVuZ3RoID4gMCA/IGNvbHVtbnMgOiB0aGlzLnZpc2libGVDb2x1bW5zO1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHMpIHtcbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLmZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW4pO1xuICAgICAgY29sdW1uLnVwZGF0ZVdpZHRoKGAke3NpemV9cHhgKTtcbiAgICB9XG4gICAgLy8gdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIC8vIHRoaXMudGFibGUucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHZpc2libGUgY29sdW1uIGluIHRoZSB0YWJsZSwgcmVzaXplIHRoZSB3aWR0aCB0byBhIHByb3BvcnRpb25hbCB3aWR0aCByZWxhdGl2ZSB0byB0aGUgdG90YWwgd2lkdGggcHJvdmlkZWQuXG4gICAqL1xuICBhdXRvU2l6ZVRvRml0KHRvdGFsV2lkdGg6IG51bWJlciwgb3B0aW9uczogQXV0b1NpemVUb0ZpdE9wdGlvbnMgPSB7fSk6IHZvaWQge1xuICAgIGNvbnN0IHdMb2dpYyA9IHRoaXMuZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKTtcbiAgICBjb25zdCB7IHZpc2libGVDb2x1bW5zIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNvbHVtbkJlaGF2aW9yOiBBdXRvU2l6ZVRvRml0T3B0aW9uc1snY29sdW1uQmVoYXZpb3InXSA9IG9wdGlvbnMuY29sdW1uQmVoYXZpb3IgfHwgKCAoKSA9PiBvcHRpb25zICkgYXMgYW55O1xuXG4gICAgbGV0IG92ZXJmbG93VG90YWxXaWR0aCA9IDA7XG4gICAgbGV0IHRvdGFsTWluV2lkdGggPSAwO1xuXG4gICAgY29uc3Qgd2l0aE1pbldpZHRoOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3Qgd2lkdGhCcmVha291dHMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoIChjb2x1bW4sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd0xvZ2ljLndpZHRoQnJlYWtvdXQoY29sdW1uLnNpemVJbmZvKTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IHsgLi4uKGNvbHVtbkJlaGF2aW9yKGNvbHVtbikgfHwge30pLCAuLi5vcHRpb25zIH07XG5cbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQ7XG4gICAgICB0b3RhbFdpZHRoIC09IHdpZHRoQnJlYWtvdXQubm9uQ29udGVudDtcblxuICAgICAgaWYgKGluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggJiYgY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgIHRvdGFsTWluV2lkdGggKz0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICB3aXRoTWluV2lkdGgucHVzaChpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IC4uLndpZHRoQnJlYWtvdXQsIGluc3RydWN0aW9ucyB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcCA9IHRvdGFsTWluV2lkdGggLyB0b3RhbFdpZHRoO1xuICAgIGNvbnN0IGxldmVsID0gKG92ZXJmbG93VG90YWxXaWR0aCAqIHAgIC0gdG90YWxNaW5XaWR0aCkgLyAoMSAtIHApO1xuICAgIGZvciAoY29uc3QgaSBvZiB3aXRoTWluV2lkdGgpIHtcbiAgICAgIGNvbnN0IGFkZGl0aW9uID0gbGV2ZWwgKiAodmlzaWJsZUNvbHVtbnNbaV0ubWluV2lkdGggLyB0b3RhbE1pbldpZHRoKVxuICAgICAgd2lkdGhCcmVha291dHNbaV0uY29udGVudCArPSBhZGRpdGlvbjtcbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSBhZGRpdGlvbjtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2libGVDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd2lkdGhCcmVha291dHNbaV07XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB3aWR0aEJyZWFrb3V0Lmluc3RydWN0aW9ucztcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHZpc2libGVDb2x1bW5zW2ldO1xuXG4gICAgICBjb25zdCByID0gd2lkdGhCcmVha291dC5jb250ZW50IC8gb3ZlcmZsb3dUb3RhbFdpZHRoO1xuXG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggfHwgIWNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWluV2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWF4V2lkdGggfHwgIWNvbHVtbi5tYXhXaWR0aCkge1xuICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgIGNvbHVtbi5jaGVja01heFdpZHRoTG9jayhjb2x1bW4uc2l6ZUluZm8ud2lkdGgpOyAvLyBpZiBpdHMgbG9ja2VkLCB3ZSBuZWVkIHRvIHJlbGVhc2UuLi5cbiAgICAgIH1cblxuICAgICAgLy8gVGhlcmUgYXJlIDMgc2NlbmFyaW9zIHdoZW4gdXBkYXRpbmcgdGhlIGNvbHVtblxuICAgICAgLy8gMSkgaWYgaXQncyBhIGZpeGVkIHdpZHRoIG9yIHdlJ3JlIGZvcmNlIGludG8gZml4ZWQgd2lkdGhcbiAgICAgIC8vIDIpIE5vdCBmaXhlZCB3aWR0aCBhbmQgd2lkdGggaXMgc2V0ICglKVxuICAgICAgLy8gMykgTm90IGZpeGVkIHdpZHRoIGFuIHdpZHRoIGlzIG5vdCBzZXQgKCB0aGUgd2lkdGggZGVwZW5kcyBvbiB0aGUgY2FsY3VsYXRlZCBgZGVmYXVsdFdpZHRoYCBkb25lIGluIGB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKClgIClcbiAgICAgIGxldCB3aWR0aDogc3RyaW5nO1xuICAgICAgY29uc3QgeyBmb3JjZVdpZHRoVHlwZSB9ID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgaWYgKGZvcmNlV2lkdGhUeXBlID09PSAncHgnIHx8ICghZm9yY2VXaWR0aFR5cGUgJiYgY29sdW1uLmlzRml4ZWRXaWR0aCkpIHsgLy8gKDEpXG4gICAgICAgIHdpZHRoID0gYCR7dG90YWxXaWR0aCAqIHJ9cHhgO1xuICAgICAgfSBlbHNlIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJyUnIHx8ICghZm9yY2VXaWR0aFR5cGUgJiYgY29sdW1uLndpZHRoKSkgeyAvLyAoMilcbiAgICAgICAgd2lkdGggPSBgJHsxMDAgKiByfSVgO1xuICAgICAgfSAvLyBlbHNlICgzKSAtPiB0aGUgdXBkYXRlIGlzIHNraXBwZWQgYW5kIGl0IHdpbGwgcnVuIHRocm91Z2ggcmVzZXRDb2x1bW5zV2lkdGhcblxuICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNvbHVtbi51cGRhdGVXaWR0aCh3aWR0aCk7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy8gd2Ugbm93IHJlc2V0IHRoZSBjb2x1bW4gd2lkdGhzLCB0aGlzIHdpbGwgY2FsY3VsYXRlIGEgbmV3IGBkZWZhdWx0V2lkdGhgIGFuZCBzZXQgaXQgaW4gYWxsIGNvbHVtbnMgYnV0IHRoZSByZWxldmFudCBvbmVzIGFyZSBjb2x1bW4gZnJvbSAoMylcbiAgICAvLyBJdCB3aWxsIGFsc28gbWFyayBhbGwgY29sdW1uRGVmcyBmb3IgY2hlY2tcbiAgICB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy50YWJsZS5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgYW5jaG9yYCBjb2x1bW4uXG4gICAqIFRoZSBuZXcgbG9jYXRpb24gb2YgdGhlIGFuY2hvciBjb2x1bW4gd2lsbCBiZSBpdCdzIG9yaWdpbmFsIGxvY2F0aW9uIHBsdXMgb3IgbWludXMgMSwgZGVwZW5kaW5nIG9uIHRoZSBkZWx0YSBiZXR3ZWVuXG4gICAqIHRoZSBjb2x1bW5zLiBJZiB0aGUgb3JpZ2luIG9mIHRoZSBgY29sdW1uYCBpcyBiZWZvcmUgdGhlIGBhbmNob3JgIHRoZW4gdGhlIGFuY2hvcidzIG5ldyBwb3NpdGlvbiBpcyBtaW51cyBvbmUsIG90aGVyd2lzZSBwbHVzIDEuXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuO1xuICAgIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBhdCBgcmVuZGVyQ29sdW1uSW5kZXhgLlxuICAgKiBgcmVuZGVyQ29sdW1uSW5kZXhgIG11c3QgYmUgYSB2aXNpYmxlIGNvbHVtbiAoaS5lLiBub3QgaGlkZGVuKVxuICAgKi9cbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgcmVuZGVyQ29sdW1uSW5kZXg6IG51bWJlciwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiB8IG51bWJlciwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoaXNQYmxDb2x1bW4oYW5jaG9yKSkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gY29sdW1uID09PSBhbmNob3IgPyBmYWxzZSA6IHRoaXMuc3RvcmUubW92ZUNvbHVtbihjb2x1bW4sIGFuY2hvcik7XG4gICAgICBpZiAocmVzdWx0ICYmIHNraXBSZWRyYXcgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5hZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhID0gdGhpcy5maW5kQ29sdW1uQXQoYW5jaG9yKTtcbiAgICAgIHJldHVybiBhID8gdGhpcy5tb3ZlQ29sdW1uKGNvbHVtbiwgYSkgOiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3dhcCBwb3NpdGlvbnMgYmV0d2VlbiAyIGV4aXN0aW5nIGNvbHVtbnMuXG4gICAqL1xuICBzd2FwQ29sdW1ucyhjb2wxOiBQYmxDb2x1bW4sIGNvbDI6IFBibENvbHVtbiwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0b3JlLnN3YXBDb2x1bW5zKGNvbDEsIGNvbDIpO1xuICAgIGlmIChyZXN1bHQgJiYgc2tpcFJlZHJhdyAhPT0gdHJ1ZSkge1xuICAgICAgdGhpcy5hZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBhZGRHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHsgdGhpcy5zdG9yZS5hZGRHcm91cEJ5KC4uLmNvbHVtbik7IH1cbiAgcmVtb3ZlR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7IHRoaXMuc3RvcmUucmVtb3ZlR3JvdXBCeSguLi5jb2x1bW4pOyB9XG5cbiAgcHJpdmF0ZSBmaW5kQ29sdW1uQXV0b1NpemUoY29sdW1uOiBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IHsgY29sdW1uRGVmIH0gPSBjb2x1bW47XG4gICAgY29uc3QgY2VsbHMgPSBjb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoKTtcbiAgICBsZXQgc2l6ZSA9IDA7XG4gICAgZm9yIChjb25zdCBjIG9mIGNlbGxzKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gKGMuZmlyc3RFbGVtZW50Q2hpbGQgfHwgYykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBpZiAoZWxlbWVudC5zY3JvbGxXaWR0aCA+IHNpemUpIHtcbiAgICAgICAgc2l6ZSA9IGVsZW1lbnQuc2Nyb2xsV2lkdGggKyAxO1xuICAgICAgICAvLyB3ZSBhZGQgMSBwaXhlbCBiZWNhdXNlIGBlbGVtZW50LnNjcm9sbFdpZHRoYCBkb2VzIG5vdCBzdXBwb3J0IHN1YnBpeGVsIHZhbHVlcywgdGhlIHdpZHRoIGlzIGNvbnZlcnRlZCB0byBhbiBpbnRlZ2VyIHJlbW92aW5nIHN1YnBpeGVsIHZhbHVlcyAoZnJhY3Rpb25zKS5cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNpemU7XG4gIH1cblxuICBwcml2YXRlIGFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5leHRBcGkuY29udGV4dEFwaS5jbGVhcigpO1xuICAgIHRoaXMuc3RvcmUudXBkYXRlR3JvdXBzKCk7XG4gICAgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMudGFibGUucmVzaXplQ29sdW1ucygpO1xuICB9XG59XG4iXX0=