/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/column-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class ColumnApi {
    /**
     * @private
     */
    constructor() { }
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
    static create(grid, store, extApi) {
        /** @type {?} */
        const instance = new ColumnApi();
        instance.grid = grid;
        instance.store = store;
        instance.extApi = extApi;
        return instance;
    }
    /**
     * @return {?}
     */
    get groupByColumns() { return this.store.groupBy; }
    /**
     * @return {?}
     */
    get visibleColumnIds() { return this.store.columnIds; }
    /**
     * @return {?}
     */
    get visibleColumns() { return this.store.columns; }
    /**
     * @return {?}
     */
    get columns() { return this.store.allColumns; }
    /**
     * @return {?}
     */
    get totalColumnWidthChange() {
        if (!this._totalColumnWidthChange) {
            this._totalColumnWidthChange = this.extApi.events
                .pipe(filter((/**
             * @param {?} event
             * @return {?}
             */
            event => event.kind === 'onResizeRow')), map((/**
             * @param {?} e
             * @return {?}
             */
            e => this.grid.columnApi.visibleColumns.reduce((/**
             * @param {?} p
             * @param {?} c
             * @return {?}
             */
            (p, c) => p + c.sizeInfo.width), 0))));
        }
        return this._totalColumnWidthChange;
    }
    /**
     * Returns the `PblColumn` at the specified index from the list of rendered columns (i.e. not hidden).
     * @param {?} renderColumnIndex
     * @return {?}
     */
    findColumnAt(renderColumnIndex) {
        return this.store.columns[renderColumnIndex];
    }
    /**
     * Returns the column matching provided `id`.
     *
     * The search is performed on all known columns.
     * @param {?} id
     * @return {?}
     */
    findColumn(id) {
        /** @type {?} */
        const result = this.store.find(id);
        if (result) {
            return result.data;
        }
    }
    /**
     * Returns the render index of column or -1 if not found.
     *
     * The render index represents the current location of the column in the group of visible columns.
     * @param {?} column
     * @return {?}
     */
    renderIndexOf(column) {
        /** @type {?} */
        const c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.columns.indexOf(c);
    }
    /**
     * Returns the index of a column or -1 if not found.
     * @param {?} column
     * @return {?}
     */
    indexOf(column) {
        /** @type {?} */
        const c = typeof column === 'string' ? this.findColumn(column) : column;
        return this.store.allColumns.indexOf(c);
    }
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
    resizeColumn(column, width) {
        column.updateWidth(width);
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    }
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
    autoSizeColumn(column) {
        /** @type {?} */
        const size = this.findColumnAutoSize(column);
        this.resizeColumn(column, `${size}px`);
    }
    // tslint:disable-line:unified-signatures
    /**
     * @param {...?} columns
     * @return {?}
     */
    autoSizeColumns(...columns) {
        /** @type {?} */
        const cols = columns.length > 0 ? columns : this.visibleColumns;
        for (const column of cols) {
            /** @type {?} */
            const size = this.findColumnAutoSize(column);
            column.updateWidth(`${size}px`);
        }
        // this.grid.resetColumnsWidth();
        // this.grid.resizeColumns();
    }
    /**
     * For each visible column in the table, resize the width to a proportional width relative to the total width provided.
     * @param {?} totalWidth
     * @param {?=} options
     * @return {?}
     */
    autoSizeToFit(totalWidth, options = {}) {
        /** @type {?} */
        const wLogic = this.extApi.dynamicColumnWidthFactory();
        const { visibleColumns } = this;
        /** @type {?} */
        const columnBehavior = options.columnBehavior || (/** @type {?} */ (((/**
         * @return {?}
         */
        () => options))));
        /** @type {?} */
        let overflowTotalWidth = 0;
        /** @type {?} */
        let totalMinWidth = 0;
        /** @type {?} */
        const withMinWidth = [];
        /** @type {?} */
        const widthBreakouts = visibleColumns.map((/**
         * @param {?} column
         * @param {?} index
         * @return {?}
         */
        (column, index) => {
            /** @type {?} */
            const widthBreakout = wLogic.widthBreakout(column.sizeInfo);
            /** @type {?} */
            const instructions = Object.assign(Object.assign({}, (columnBehavior(column) || {})), options);
            overflowTotalWidth += widthBreakout.content;
            totalWidth -= widthBreakout.nonContent;
            if (instructions.keepMinWidth && column.minWidth) {
                totalMinWidth += column.minWidth;
                withMinWidth.push(index);
            }
            return Object.assign(Object.assign({}, widthBreakout), { instructions });
        }));
        /** @type {?} */
        const p = totalMinWidth / totalWidth;
        /** @type {?} */
        const level = (overflowTotalWidth * p - totalMinWidth) / (1 - p);
        for (const i of withMinWidth) {
            /** @type {?} */
            const addition = level * (visibleColumns[i].minWidth / totalMinWidth);
            widthBreakouts[i].content += addition;
            overflowTotalWidth += addition;
        }
        for (let i = 0; i < visibleColumns.length; i++) {
            /** @type {?} */
            const widthBreakout = widthBreakouts[i];
            /** @type {?} */
            const instructions = widthBreakout.instructions;
            /** @type {?} */
            const column = visibleColumns[i];
            /** @type {?} */
            const r = widthBreakout.content / overflowTotalWidth;
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
            let width;
            const { forceWidthType } = instructions;
            if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                width = `${totalWidth * r}px`;
            }
            else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                width = `${100 * r}%`;
            } // else (3) -> the update is skipped and it will run through resetColumnsWidth
            if (width) {
                column.updateWidth(width);
            }
        }
        // we now reset the column widths, this will calculate a new `defaultWidth` and set it in all columns but the relevant ones are column from (3)
        // It will also mark all columnDefs for check
        this.grid.resetColumnsWidth();
        this.grid.resizeColumns();
    }
    // tslint:disable-line:unified-signatures
    /**
     * @param {?} column
     * @param {?} anchor
     * @param {?=} skipRedraw
     * @return {?}
     */
    moveColumn(column, anchor, skipRedraw) {
        if (isPblColumn(anchor)) {
            /** @type {?} */
            const result = column === anchor ? false : this.store.moveColumn(column, anchor);
            if (result && skipRedraw !== true) {
                this.afterColumnPositionChange();
            }
            return result;
        }
        else {
            /** @type {?} */
            const a = this.findColumnAt(anchor);
            return a ? this.moveColumn(column, a) : false;
        }
    }
    /**
     * Swap positions between 2 existing columns.
     * @param {?} col1
     * @param {?} col2
     * @param {?=} skipRedraw
     * @return {?}
     */
    swapColumns(col1, col2, skipRedraw) {
        /** @type {?} */
        const result = this.store.swapColumns(col1, col2);
        if (result && skipRedraw !== true) {
            this.afterColumnPositionChange();
        }
        return result;
    }
    /**
     * @param {...?} column
     * @return {?}
     */
    addGroupBy(...column) { this.store.addGroupBy(...column); }
    /**
     * @param {...?} column
     * @return {?}
     */
    removeGroupBy(...column) { this.store.removeGroupBy(...column); }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    findColumnAutoSize(column) {
        const { columnDef } = column;
        /** @type {?} */
        const cells = columnDef.queryCellElements();
        /** @type {?} */
        let size = 0;
        for (const c of cells) {
            /** @type {?} */
            const element = (/** @type {?} */ ((c.firstElementChild || c)));
            if (element.scrollWidth > size) {
                size = element.scrollWidth + 1;
                // we add 1 pixel because `element.scrollWidth` does not support subpixel values, the width is converted to an integer removing subpixel values (fractions).
            }
        }
        return size;
    }
    /**
     * @private
     * @return {?}
     */
    afterColumnPositionChange() {
        this.extApi.contextApi.clear();
        this.store.updateGroups();
        this.grid.resetColumnsWidth();
        this.grid.resizeColumns();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk3QyxPQUFPLEVBQWEsV0FBVyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFHMUQsMENBK0JDOzs7Ozs7Ozs7OztJQXRCQyw4Q0FBNEI7Ozs7OztJQU01Qiw0Q0FBdUI7Ozs7OztJQU12Qiw0Q0FBc0I7Ozs7Ozs7Ozs7SUFTdEIsc0VBQStIOzs7OztBQUdqSSxNQUFNLE9BQU8sU0FBUzs7OztJQXFDcEIsZ0JBQXdCLENBQUM7Ozs7Ozs7Ozs7OztJQS9CekIsTUFBTSxDQUFDLE1BQU0sQ0FBSSxJQUEwQixFQUFFLEtBQXFCLEVBQUUsTUFBNEI7O2NBQ3hGLFFBQVEsR0FBRyxJQUFJLFNBQVMsRUFBSztRQUVuQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV6QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDOzs7O0lBRUQsSUFBSSxjQUFjLEtBQWtCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ2hFLElBQUksZ0JBQWdCLEtBQWUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDakUsSUFBSSxjQUFjLEtBQWtCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ2hFLElBQUksT0FBTyxLQUFrQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7OztJQUU1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LENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM5RSxhQUFhLENBQUMsR0FBRyxNQUFtQixJQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7SUFFNUUsa0JBQWtCLENBQUMsTUFBaUI7Y0FDcEMsRUFBRSxTQUFTLEVBQUUsR0FBRyxNQUFNOztjQUN0QixLQUFLLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixFQUFFOztZQUN2QyxJQUFJLEdBQUcsQ0FBQztRQUNaLEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxFQUFFOztrQkFDZixPQUFPLEdBQUcsbUJBQUEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLElBQUksQ0FBQyxDQUFDLEVBQWU7WUFDekQsSUFBSSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRTtnQkFDOUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQiw0SkFBNEo7YUFDN0o7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFTyx5QkFBeUI7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7Ozs7OztJQWxPQyx5QkFBbUM7Ozs7O0lBQ25DLDBCQUE4Qjs7Ozs7SUFDOUIsMkJBQXFDOzs7OztJQUNyQyw0Q0FBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBpc1BibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uU3RvcmUgfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvU2l6ZVRvRml0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGVuIGBweGAgd2lsbCBmb3JjZSBhbGwgY29sdW1ucyB3aWR0aCB0byBiZSBpbiBmaXhlZCBwaXhlbHNcbiAgICogV2hlbiBgJWAgd2lsbCBmb3JjZSBhbGwgY29sdW1uIHdpZHRoIHRvIGJlIGluICVcbiAgICogb3RoZXJ3aXNlIChkZWZhdWx0KSB0aGUgd2lkdGggd2lsbCBiZSBzZXQgaW4gdGhlIHNhbWUgZm9ybWF0IGl0IHdhcyBvcmlnaW5hbGx5IHNldC5cbiAgICogZS5nLjogSWYgd2lkdGggd2FzIGAzMyVgIHRoZSBuZXcgd2lkdGggd2lsbCBhbHNvIGJlIGluICUsIG9yIGlmIHdpZHRoIG5vdCBzZXQgdGhlIG5ldyB3aWR0aCB3aWxsIG5vdCBiZSBzZXQgYXMgd2VsbC5cbiAgICpcbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGZvcmNlV2lkdGhUeXBlPzogJyUnIHwgJ3B4JztcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwga2VlcCB0aGUgYG1pbldpZHRoYCBjb2x1bW4gZGVmaW5pdGlvbiAod2hlbiBzZXQpLCBvdGhlcndpc2Ugd2lsbCBjbGVhciBpdC5cbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGtlZXBNaW5XaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGtlZXAgdGhlIGBtYXhXaWR0aGAgY29sdW1uIGRlZmluaXRpb24gKHdoZW4gc2V0KSwgb3RoZXJ3aXNlIHdpbGwgY2xlYXIgaXQuXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBrZWVwTWF4V2lkdGg/OiBib29sZWFuXG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gZm9yIHBlci1jb2x1bW4gZmluZSB0dW5pbmcgb2YgdGhlIHByb2Nlc3MuXG4gICAqIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgYFBibENvbHVtbmAsIGl0cyByZWxhdGl2ZSB3aWR0aCAoaW4gJSwgMCB0byAxKSBhbmQgdG90YWwgd2lkdGggKGluIHBpeGVscykgYW5kIHNob3VsZCByZXR1cm5cbiAgICogYW4gb2JqZWN0IGRlc2NyaWJpbmcgaG93IGl0IHNob3VsZCBhdXRvIGZpdC5cbiAgICpcbiAgICogV2hlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyB1bmRlZmluZWQgdGhlIG9wdGlvbnMgYXJlIHRha2VuIGZyb20gdGhlIHJvb3QuXG4gICAqL1xuICBjb2x1bW5CZWhhdmlvcj8oY29sdW1uOiBQYmxDb2x1bW4pOiBQaWNrPEF1dG9TaXplVG9GaXRPcHRpb25zLCAnZm9yY2VXaWR0aFR5cGUnIHwgJ2tlZXBNaW5XaWR0aCcgfCAna2VlcE1heFdpZHRoJz4gfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BcGk8VD4ge1xuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQ+KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+LCBzdG9yZTogUGJsQ29sdW1uU3RvcmUsIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGkpOiBDb2x1bW5BcGk8VD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IENvbHVtbkFwaTxUPigpO1xuXG4gICAgaW5zdGFuY2UuZ3JpZCA9IGdyaWQ7XG4gICAgaW5zdGFuY2Uuc3RvcmUgPSBzdG9yZTtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBnZXQgZ3JvdXBCeUNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5ncm91cEJ5OyB9XG4gIGdldCB2aXNpYmxlQ29sdW1uSWRzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uSWRzOyB9XG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zOyB9XG5cbiAgZ2V0IHRvdGFsQ29sdW1uV2lkdGhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBpZiAoIXRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2UpIHtcbiAgICAgIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2UgPSB0aGlzLmV4dEFwaS5ldmVudHNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50LmtpbmQgPT09ICdvblJlc2l6ZVJvdycpLFxuICAgICAgICAgIG1hcCggZSA9PiB0aGlzLmdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLnJlZHVjZSggKHAsIGMpID0+IHAgKyBjLnNpemVJbmZvLndpZHRoLCAwICkgKSxcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2U7XG4gIH1cblxuICBwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIHN0b3JlOiBQYmxDb2x1bW5TdG9yZTtcbiAgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xuICBwcml2YXRlIF90b3RhbENvbHVtbldpZHRoQ2hhbmdlOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgUGJsQ29sdW1uYCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhlIGxpc3Qgb2YgcmVuZGVyZWQgY29sdW1ucyAoaS5lLiBub3QgaGlkZGVuKS5cbiAgICovXG4gIGZpbmRDb2x1bW5BdChyZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zW3JlbmRlckNvbHVtbkluZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gbWF0Y2hpbmcgcHJvdmlkZWQgYGlkYC5cbiAgICpcbiAgICogVGhlIHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gYWxsIGtub3duIGNvbHVtbnMuXG4gICAqL1xuICBmaW5kQ29sdW1uKGlkOiBzdHJpbmcpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuZmluZChpZCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJlbmRlciBpbmRleCBvZiBjb2x1bW4gb3IgLTEgaWYgbm90IGZvdW5kLlxuICAqXG4gICogVGhlIHJlbmRlciBpbmRleCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGxvY2F0aW9uIG9mIHRoZSBjb2x1bW4gaW4gdGhlIGdyb3VwIG9mIHZpc2libGUgY29sdW1ucy5cbiAgKi9cbiAgcmVuZGVySW5kZXhPZihjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnID8gdGhpcy5maW5kQ29sdW1uKGNvbHVtbikgOiBjb2x1bW47XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluZGV4IG9mIGEgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gd2l0aCB0aGUgcHJvdmlkZWQgd2lkdGguXG4gICAqXG4gICAqIFRoZSB3aWR0aCBpcyBzZXQgaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICpcbiAgICogUmVzaXppbmcgdGhlIGNvbHVtbiB3aWxsIHRyaWdnZXIgYSB0YWJsZSB3aWR0aCByZXNpemluZyBldmVudCwgdXBkYXRpbmcgY29sdW1uIGdyb3VwIGlmIG5lY2Vzc2FyeS5cbiAgICovXG4gIHJlc2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgd2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbHVtbi51cGRhdGVXaWR0aCh3aWR0aCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgdGhlIGNvbHVtbiB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIC0gQ29udGVudDogQWxsIG9mIHRoZSBjZWxscyByZW5kZXJlZCBmb3IgdGhpcyBjb2x1bW4gKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyIGNlbGxzKS5cbiAgICogLSBCZXN0IGZpdDogVGhlIHdpZHRoIG9mIHRoZSBjZWxsIHdpdGggdGhlIGhlaWdodCB3aWR0aCBtZWFzdXJlZC5cbiAgICpcbiAgICogVGhlIGJlc3QgZml0IGZvdW5kICh3aWR0aCkgaXMgdGhlbiB1c2VkIHRvIGNhbGwgYHJlc2l6ZUNvbHVtbigpYC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgdGhpcy5yZXNpemVDb2x1bW4oY29sdW1uLCBgJHtzaXplfXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSB2aXNpYmxlIGNvbHVtbnMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGxpc3Qgb2YgY29sdW1uIHByb3ZpZGVkLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBNYWtlIHN1cmUgeW91IGFyZSBub3QgcmVzaXppbmcgYW4gaGlkZGVuIGNvbHVtbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgY29sdW1ucyBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHMgPSBjb2x1bW5zLmxlbmd0aCA+IDAgPyBjb2x1bW5zIDogdGhpcy52aXNpYmxlQ29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2xzKSB7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICAgIGNvbHVtbi51cGRhdGVXaWR0aChgJHtzaXplfXB4YCk7XG4gICAgfVxuICAgIC8vIHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIC8vIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdGhlIHdpZHRoIHRvIGEgcHJvcG9ydGlvbmFsIHdpZHRoIHJlbGF0aXZlIHRvIHRoZSB0b3RhbCB3aWR0aCBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplVG9GaXQodG90YWxXaWR0aDogbnVtYmVyLCBvcHRpb25zOiBBdXRvU2l6ZVRvRml0T3B0aW9ucyA9IHt9KTogdm9pZCB7XG4gICAgY29uc3Qgd0xvZ2ljID0gdGhpcy5leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpO1xuICAgIGNvbnN0IHsgdmlzaWJsZUNvbHVtbnMgfSA9IHRoaXM7XG4gICAgY29uc3QgY29sdW1uQmVoYXZpb3I6IEF1dG9TaXplVG9GaXRPcHRpb25zWydjb2x1bW5CZWhhdmlvciddID0gb3B0aW9ucy5jb2x1bW5CZWhhdmlvciB8fCAoICgpID0+IG9wdGlvbnMgKSBhcyBhbnk7XG5cbiAgICBsZXQgb3ZlcmZsb3dUb3RhbFdpZHRoID0gMDtcbiAgICBsZXQgdG90YWxNaW5XaWR0aCA9IDA7XG5cbiAgICBjb25zdCB3aXRoTWluV2lkdGg6IG51bWJlcltdID0gW107XG5cbiAgICBjb25zdCB3aWR0aEJyZWFrb3V0cyA9IHZpc2libGVDb2x1bW5zLm1hcCggKGNvbHVtbiwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHdpZHRoQnJlYWtvdXQgPSB3TG9naWMud2lkdGhCcmVha291dChjb2x1bW4uc2l6ZUluZm8pO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0geyAuLi4oY29sdW1uQmVoYXZpb3IoY29sdW1uKSB8fCB7fSksIC4uLm9wdGlvbnMgfTtcblxuICAgICAgb3ZlcmZsb3dUb3RhbFdpZHRoICs9IHdpZHRoQnJlYWtvdXQuY29udGVudDtcbiAgICAgIHRvdGFsV2lkdGggLT0gd2lkdGhCcmVha291dC5ub25Db250ZW50O1xuXG4gICAgICBpZiAoaW5zdHJ1Y3Rpb25zLmtlZXBNaW5XaWR0aCAmJiBjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgdG90YWxNaW5XaWR0aCArPSBjb2x1bW4ubWluV2lkdGg7XG4gICAgICAgIHdpdGhNaW5XaWR0aC5wdXNoKGluZGV4KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4ud2lkdGhCcmVha291dCwgaW5zdHJ1Y3Rpb25zIH07XG4gICAgfSk7XG5cbiAgICBjb25zdCBwID0gdG90YWxNaW5XaWR0aCAvIHRvdGFsV2lkdGg7XG4gICAgY29uc3QgbGV2ZWwgPSAob3ZlcmZsb3dUb3RhbFdpZHRoICogcCAgLSB0b3RhbE1pbldpZHRoKSAvICgxIC0gcCk7XG4gICAgZm9yIChjb25zdCBpIG9mIHdpdGhNaW5XaWR0aCkge1xuICAgICAgY29uc3QgYWRkaXRpb24gPSBsZXZlbCAqICh2aXNpYmxlQ29sdW1uc1tpXS5taW5XaWR0aCAvIHRvdGFsTWluV2lkdGgpXG4gICAgICB3aWR0aEJyZWFrb3V0c1tpXS5jb250ZW50ICs9IGFkZGl0aW9uO1xuICAgICAgb3ZlcmZsb3dUb3RhbFdpZHRoICs9IGFkZGl0aW9uO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmlzaWJsZUNvbHVtbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHdpZHRoQnJlYWtvdXQgPSB3aWR0aEJyZWFrb3V0c1tpXTtcbiAgICAgIGNvbnN0IGluc3RydWN0aW9ucyA9IHdpZHRoQnJlYWtvdXQuaW5zdHJ1Y3Rpb25zO1xuICAgICAgY29uc3QgY29sdW1uID0gdmlzaWJsZUNvbHVtbnNbaV07XG5cbiAgICAgIGNvbnN0IHIgPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQgLyBvdmVyZmxvd1RvdGFsV2lkdGg7XG5cbiAgICAgIGlmICghaW5zdHJ1Y3Rpb25zLmtlZXBNaW5XaWR0aCB8fCAhY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgIGNvbHVtbi5taW5XaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmICghaW5zdHJ1Y3Rpb25zLmtlZXBNYXhXaWR0aCB8fCAhY29sdW1uLm1heFdpZHRoKSB7XG4gICAgICAgIGNvbHVtbi5tYXhXaWR0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgY29sdW1uLmNoZWNrTWF4V2lkdGhMb2NrKGNvbHVtbi5zaXplSW5mby53aWR0aCk7IC8vIGlmIGl0cyBsb2NrZWQsIHdlIG5lZWQgdG8gcmVsZWFzZS4uLlxuICAgICAgfVxuXG4gICAgICAvLyBUaGVyZSBhcmUgMyBzY2VuYXJpb3Mgd2hlbiB1cGRhdGluZyB0aGUgY29sdW1uXG4gICAgICAvLyAxKSBpZiBpdCdzIGEgZml4ZWQgd2lkdGggb3Igd2UncmUgZm9yY2UgaW50byBmaXhlZCB3aWR0aFxuICAgICAgLy8gMikgTm90IGZpeGVkIHdpZHRoIGFuZCB3aWR0aCBpcyBzZXQgKCUpXG4gICAgICAvLyAzKSBOb3QgZml4ZWQgd2lkdGggYW4gd2lkdGggaXMgbm90IHNldCAoIHRoZSB3aWR0aCBkZXBlbmRzIG9uIHRoZSBjYWxjdWxhdGVkIGBkZWZhdWx0V2lkdGhgIGRvbmUgaW4gYHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpYCApXG4gICAgICBsZXQgd2lkdGg6IHN0cmluZztcbiAgICAgIGNvbnN0IHsgZm9yY2VXaWR0aFR5cGUgfSA9IGluc3RydWN0aW9ucztcbiAgICAgIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJ3B4JyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi5pc0ZpeGVkV2lkdGgpKSB7IC8vICgxKVxuICAgICAgICB3aWR0aCA9IGAke3RvdGFsV2lkdGggKiByfXB4YDtcbiAgICAgIH0gZWxzZSBpZiAoZm9yY2VXaWR0aFR5cGUgPT09ICclJyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi53aWR0aCkpIHsgLy8gKDIpXG4gICAgICAgIHdpZHRoID0gYCR7MTAwICogcn0lYDtcbiAgICAgIH0gLy8gZWxzZSAoMykgLT4gdGhlIHVwZGF0ZSBpcyBza2lwcGVkIGFuZCBpdCB3aWxsIHJ1biB0aHJvdWdoIHJlc2V0Q29sdW1uc1dpZHRoXG5cbiAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjb2x1bW4udXBkYXRlV2lkdGgod2lkdGgpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vIHdlIG5vdyByZXNldCB0aGUgY29sdW1uIHdpZHRocywgdGhpcyB3aWxsIGNhbGN1bGF0ZSBhIG5ldyBgZGVmYXVsdFdpZHRoYCBhbmQgc2V0IGl0IGluIGFsbCBjb2x1bW5zIGJ1dCB0aGUgcmVsZXZhbnQgb25lcyBhcmUgY29sdW1uIGZyb20gKDMpXG4gICAgLy8gSXQgd2lsbCBhbHNvIG1hcmsgYWxsIGNvbHVtbkRlZnMgZm9yIGNoZWNrXG4gICAgdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGBhbmNob3JgIGNvbHVtbi5cbiAgICogVGhlIG5ldyBsb2NhdGlvbiBvZiB0aGUgYW5jaG9yIGNvbHVtbiB3aWxsIGJlIGl0J3Mgb3JpZ2luYWwgbG9jYXRpb24gcGx1cyBvciBtaW51cyAxLCBkZXBlbmRpbmcgb24gdGhlIGRlbHRhIGJldHdlZW5cbiAgICogdGhlIGNvbHVtbnMuIElmIHRoZSBvcmlnaW4gb2YgdGhlIGBjb2x1bW5gIGlzIGJlZm9yZSB0aGUgYGFuY2hvcmAgdGhlbiB0aGUgYW5jaG9yJ3MgbmV3IHBvc2l0aW9uIGlzIG1pbnVzIG9uZSwgb3RoZXJ3aXNlIHBsdXMgMS5cbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW47XG4gICAgLyoqXG4gICAqIE1vdmUgdGhlIHByb3ZpZGVkIGBjb2x1bW5gIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29sdW1uIGF0IGByZW5kZXJDb2x1bW5JbmRleGAuXG4gICAqIGByZW5kZXJDb2x1bW5JbmRleGAgbXVzdCBiZSBhIHZpc2libGUgY29sdW1uIChpLmUuIG5vdCBoaWRkZW4pXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCByZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW47IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIGFuY2hvcjogUGJsQ29sdW1uIHwgbnVtYmVyLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGlmIChpc1BibENvbHVtbihhbmNob3IpKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBjb2x1bW4gPT09IGFuY2hvciA/IGZhbHNlIDogdGhpcy5zdG9yZS5tb3ZlQ29sdW1uKGNvbHVtbiwgYW5jaG9yKTtcbiAgICAgIGlmIChyZXN1bHQgJiYgc2tpcFJlZHJhdyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLmZpbmRDb2x1bW5BdChhbmNob3IpO1xuICAgICAgcmV0dXJuIGEgPyB0aGlzLm1vdmVDb2x1bW4oY29sdW1uLCBhKSA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHBvc2l0aW9ucyBiZXR3ZWVuIDIgZXhpc3RpbmcgY29sdW1ucy5cbiAgICovXG4gIHN3YXBDb2x1bW5zKGNvbDE6IFBibENvbHVtbiwgY29sMjogUGJsQ29sdW1uLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuc3dhcENvbHVtbnMoY29sMSwgY29sMik7XG4gICAgaWYgKHJlc3VsdCAmJiBza2lwUmVkcmF3ICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFkZEdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQgeyB0aGlzLnN0b3JlLmFkZEdyb3VwQnkoLi4uY29sdW1uKTsgfVxuICByZW1vdmVHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHsgdGhpcy5zdG9yZS5yZW1vdmVHcm91cEJ5KC4uLmNvbHVtbik7IH1cblxuICBwcml2YXRlIGZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW46IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgeyBjb2x1bW5EZWYgfSA9IGNvbHVtbjtcbiAgICBjb25zdCBjZWxscyA9IGNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cygpO1xuICAgIGxldCBzaXplID0gMDtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2VsbHMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSAoYy5maXJzdEVsZW1lbnRDaGlsZCB8fCBjKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmIChlbGVtZW50LnNjcm9sbFdpZHRoID4gc2l6ZSkge1xuICAgICAgICBzaXplID0gZWxlbWVudC5zY3JvbGxXaWR0aCArIDE7XG4gICAgICAgIC8vIHdlIGFkZCAxIHBpeGVsIGJlY2F1c2UgYGVsZW1lbnQuc2Nyb2xsV2lkdGhgIGRvZXMgbm90IHN1cHBvcnQgc3VicGl4ZWwgdmFsdWVzLCB0aGUgd2lkdGggaXMgY29udmVydGVkIHRvIGFuIGludGVnZXIgcmVtb3Zpbmcgc3VicGl4ZWwgdmFsdWVzIChmcmFjdGlvbnMpLlxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgdGhpcy5zdG9yZS51cGRhdGVHcm91cHMoKTtcbiAgICB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLmdyaWQucmVzaXplQ29sdW1ucygpO1xuICB9XG59XG4iXX0=