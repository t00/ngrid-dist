/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            const instructions = Object.assign({}, (columnBehavior(column) || {}), options);
            overflowTotalWidth += widthBreakout.content;
            totalWidth -= widthBreakout.nonContent;
            if (instructions.keepMinWidth && column.minWidth) {
                totalMinWidth += column.minWidth;
                withMinWidth.push(index);
            }
            return Object.assign({}, widthBreakout, { instructions });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW4tYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTdDLE9BQU8sRUFBYSxXQUFXLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7OztBQUcxRCwwQ0ErQkM7Ozs7Ozs7Ozs7O0lBdEJDLDhDQUE0Qjs7Ozs7O0lBTTVCLDRDQUF1Qjs7Ozs7O0lBTXZCLDRDQUFzQjs7Ozs7Ozs7OztJQVN0QixzRUFBK0g7Ozs7O0FBR2pJLE1BQU0sT0FBTyxTQUFTOzs7O0lBcUNwQixnQkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7O0lBL0J6QixNQUFNLENBQUMsTUFBTSxDQUFJLElBQTBCLEVBQUUsS0FBcUIsRUFBRSxNQUE0Qjs7Y0FDeEYsUUFBUSxHQUFHLElBQUksU0FBUyxFQUFLO1FBRW5DLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBRXpCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Ozs7SUFFRCxJQUFJLGNBQWMsS0FBa0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7SUFDaEUsSUFBSSxnQkFBZ0IsS0FBZSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7OztJQUNqRSxJQUFJLGNBQWMsS0FBa0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7SUFDaEUsSUFBSSxPQUFPLEtBQWtCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7O0lBRTVE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Q0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQzlFLGFBQWEsQ0FBQyxHQUFHLE1BQW1CLElBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQUU1RSxrQkFBa0IsQ0FBQyxNQUFpQjtjQUNwQyxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU07O2NBQ3RCLEtBQUssR0FBRyxTQUFTLENBQUMsaUJBQWlCLEVBQUU7O1lBQ3ZDLElBQUksR0FBRyxDQUFDO1FBQ1osS0FBSyxNQUFNLENBQUMsSUFBSSxLQUFLLEVBQUU7O2tCQUNmLE9BQU8sR0FBRyxtQkFBQSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLENBQUMsRUFBZTtZQUN6RCxJQUFJLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFO2dCQUM5QixJQUFJLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQy9CLDRKQUE0SjthQUM3SjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVPLHlCQUF5QjtRQUMvQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRjs7Ozs7O0lBbE9DLHlCQUFtQzs7Ozs7SUFDbkMsMEJBQThCOzs7OztJQUM5QiwyQkFBcUM7Ozs7O0lBQ3JDLDRDQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIGlzUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZSB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEF1dG9TaXplVG9GaXRPcHRpb25zIHtcbiAgLyoqXG4gICAqIFdoZW4gYHB4YCB3aWxsIGZvcmNlIGFsbCBjb2x1bW5zIHdpZHRoIHRvIGJlIGluIGZpeGVkIHBpeGVsc1xuICAgKiBXaGVuIGAlYCB3aWxsIGZvcmNlIGFsbCBjb2x1bW4gd2lkdGggdG8gYmUgaW4gJVxuICAgKiBvdGhlcndpc2UgKGRlZmF1bHQpIHRoZSB3aWR0aCB3aWxsIGJlIHNldCBpbiB0aGUgc2FtZSBmb3JtYXQgaXQgd2FzIG9yaWdpbmFsbHkgc2V0LlxuICAgKiBlLmcuOiBJZiB3aWR0aCB3YXMgYDMzJWAgdGhlIG5ldyB3aWR0aCB3aWxsIGFsc28gYmUgaW4gJSwgb3IgaWYgd2lkdGggbm90IHNldCB0aGUgbmV3IHdpZHRoIHdpbGwgbm90IGJlIHNldCBhcyB3ZWxsLlxuICAgKlxuICAgKiBEb2VzIG5vdCBhcHBseSB3aGVuIGNvbHVtbkJlaGF2aW9yIGlzIHNldCBhbmQgcmV0dXJucyBhIHZhbHVlLlxuICAgKi9cbiAgZm9yY2VXaWR0aFR5cGU/OiAnJScgfCAncHgnO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCBrZWVwIHRoZSBgbWluV2lkdGhgIGNvbHVtbiBkZWZpbml0aW9uICh3aGVuIHNldCksIG90aGVyd2lzZSB3aWxsIGNsZWFyIGl0LlxuICAgKiBEb2VzIG5vdCBhcHBseSB3aGVuIGNvbHVtbkJlaGF2aW9yIGlzIHNldCBhbmQgcmV0dXJucyBhIHZhbHVlLlxuICAgKi9cbiAga2VlcE1pbldpZHRoPzogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwga2VlcCB0aGUgYG1heFdpZHRoYCBjb2x1bW4gZGVmaW5pdGlvbiAod2hlbiBzZXQpLCBvdGhlcndpc2Ugd2lsbCBjbGVhciBpdC5cbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGtlZXBNYXhXaWR0aD86IGJvb2xlYW5cblxuICAvKipcbiAgICogQSBmdW5jdGlvbiBmb3IgcGVyLWNvbHVtbiBmaW5lIHR1bmluZyBvZiB0aGUgcHJvY2Vzcy5cbiAgICogVGhlIGZ1bmN0aW9uIHJlY2VpdmVzIHRoZSBgUGJsQ29sdW1uYCwgaXRzIHJlbGF0aXZlIHdpZHRoIChpbiAlLCAwIHRvIDEpIGFuZCB0b3RhbCB3aWR0aCAoaW4gcGl4ZWxzKSBhbmQgc2hvdWxkIHJldHVyblxuICAgKiBhbiBvYmplY3QgZGVzY3JpYmluZyBob3cgaXQgc2hvdWxkIGF1dG8gZml0LlxuICAgKlxuICAgKiBXaGVuIHRoZSBmdW5jdGlvbiByZXR1cm5zIHVuZGVmaW5lZCB0aGUgb3B0aW9ucyBhcmUgdGFrZW4gZnJvbSB0aGUgcm9vdC5cbiAgICovXG4gIGNvbHVtbkJlaGF2aW9yPyhjb2x1bW46IFBibENvbHVtbik6IFBpY2s8QXV0b1NpemVUb0ZpdE9wdGlvbnMsICdmb3JjZVdpZHRoVHlwZScgfCAna2VlcE1pbldpZHRoJyB8ICdrZWVwTWF4V2lkdGgnPiB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbHVtbkFwaTxUPiB7XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VD4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4sIHN0b3JlOiBQYmxDb2x1bW5TdG9yZSwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSk6IENvbHVtbkFwaTxUPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQ29sdW1uQXBpPFQ+KCk7XG5cbiAgICBpbnN0YW5jZS5ncmlkID0gZ3JpZDtcbiAgICBpbnN0YW5jZS5zdG9yZSA9IHN0b3JlO1xuICAgIGluc3RhbmNlLmV4dEFwaSA9IGV4dEFwaTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIGdldCBncm91cEJ5Q29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmdyb3VwQnk7IH1cbiAgZ2V0IHZpc2libGVDb2x1bW5JZHMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5JZHM7IH1cbiAgZ2V0IHZpc2libGVDb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uczsgfVxuICBnZXQgY29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnM7IH1cblxuICBnZXQgdG90YWxDb2x1bW5XaWR0aENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIGlmICghdGhpcy5fdG90YWxDb2x1bW5XaWR0aENoYW5nZSkge1xuICAgICAgdGhpcy5fdG90YWxDb2x1bW5XaWR0aENoYW5nZSA9IHRoaXMuZXh0QXBpLmV2ZW50c1xuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQua2luZCA9PT0gJ29uUmVzaXplUm93JyksXG4gICAgICAgICAgbWFwKCBlID0+IHRoaXMuZ3JpZC5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMucmVkdWNlKCAocCwgYykgPT4gcCArIGMuc2l6ZUluZm8ud2lkdGgsIDAgKSApLFxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fdG90YWxDb2x1bW5XaWR0aENoYW5nZTtcbiAgfVxuXG4gIHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgc3RvcmU6IFBibENvbHVtblN0b3JlO1xuICBwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG4gIHByaXZhdGUgX3RvdGFsQ29sdW1uV2lkdGhDaGFuZ2U6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBQYmxDb2x1bW5gIGF0IHRoZSBzcGVjaWZpZWQgaW5kZXggZnJvbSB0aGUgbGlzdCBvZiByZW5kZXJlZCBjb2x1bW5zIChpLmUuIG5vdCBoaWRkZW4pLlxuICAgKi9cbiAgZmluZENvbHVtbkF0KHJlbmRlckNvbHVtbkluZGV4OiBudW1iZXIpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnNbcmVuZGVyQ29sdW1uSW5kZXhdO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbHVtbiBtYXRjaGluZyBwcm92aWRlZCBgaWRgLlxuICAgKlxuICAgKiBUaGUgc2VhcmNoIGlzIHBlcmZvcm1lZCBvbiBhbGwga25vd24gY29sdW1ucy5cbiAgICovXG4gIGZpbmRDb2x1bW4oaWQ6IHN0cmluZyk6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5maW5kKGlkKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmRhdGE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogUmV0dXJucyB0aGUgcmVuZGVyIGluZGV4IG9mIGNvbHVtbiBvciAtMSBpZiBub3QgZm91bmQuXG4gICpcbiAgKiBUaGUgcmVuZGVyIGluZGV4IHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgbG9jYXRpb24gb2YgdGhlIGNvbHVtbiBpbiB0aGUgZ3JvdXAgb2YgdmlzaWJsZSBjb2x1bW5zLlxuICAqL1xuICByZW5kZXJJbmRleE9mKGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmRDb2x1bW4oY29sdW1uKSA6IGNvbHVtbjtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zLmluZGV4T2YoYyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgYSBjb2x1bW4gb3IgLTEgaWYgbm90IGZvdW5kLlxuICAgKi9cbiAgaW5kZXhPZihjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnID8gdGhpcy5maW5kQ29sdW1uKGNvbHVtbikgOiBjb2x1bW47XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYWxsQ29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbiB3aXRoIHRoZSBwcm92aWRlZCB3aWR0aC5cbiAgICpcbiAgICogVGhlIHdpZHRoIGlzIHNldCBpbiBweCBvciAlIGluIHRoZSBmb2xsb3dpbmcgZm9ybWF0OiAjIyUgb3IgIyNweFxuICAgKiBFeGFtcGxlczogJzUwJScsICc1MHB4J1xuICAgKlxuICAgKiBSZXNpemluZyB0aGUgY29sdW1uIHdpbGwgdHJpZ2dlciBhIHRhYmxlIHdpZHRoIHJlc2l6aW5nIGV2ZW50LCB1cGRhdGluZyBjb2x1bW4gZ3JvdXAgaWYgbmVjZXNzYXJ5LlxuICAgKi9cbiAgcmVzaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCB3aWR0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29sdW1uLnVwZGF0ZVdpZHRoKHdpZHRoKTtcbiAgICAvLyB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICAvLyB0aGlzLmdyaWQucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2l6ZSB0aGUgY29sdW1uIHRvIGJlc3QgZml0IGl0J3MgY29udGVudC5cbiAgICpcbiAgICogLSBDb250ZW50OiBBbGwgb2YgdGhlIGNlbGxzIHJlbmRlcmVkIGZvciB0aGlzIGNvbHVtbiAoaGVhZGVyLCBkYXRhIGFuZCBmb290ZXIgY2VsbHMpLlxuICAgKiAtIEJlc3QgZml0OiBUaGUgd2lkdGggb2YgdGhlIGNlbGwgd2l0aCB0aGUgaGVpZ2h0IHdpZHRoIG1lYXN1cmVkLlxuICAgKlxuICAgKiBUaGUgYmVzdCBmaXQgZm91bmQgKHdpZHRoKSBpcyB0aGVuIHVzZWQgdG8gY2FsbCBgcmVzaXplQ29sdW1uKClgLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICB0aGlzLnJlc2l6ZUNvbHVtbihjb2x1bW4sIGAke3NpemV9cHhgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCB2aXNpYmxlIGNvbHVtbiBpbiB0aGUgdGFibGUsIHJlc2l6ZSB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2ltcGx5IHJ1biBgYXV0b1NpemVDb2x1bW4oKWAgb24gdGhlIHZpc2libGUgY29sdW1ucyBpbiB0aGUgdGFibGUuXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtbnMoKTogdm9pZDtcbiAgLyoqXG4gICAqIEZvciBlYWNoIGNvbHVtbiBpbiB0aGUgbGlzdCBvZiBjb2x1bW4gcHJvdmlkZWQsIHJlc2l6ZSB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIE1ha2Ugc3VyZSB5b3UgYXJlIG5vdCByZXNpemluZyBhbiBoaWRkZW4gY29sdW1uLlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSBjb2x1bW5zIHByb3ZpZGVkLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKC4uLmNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZDsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbiAgYXV0b1NpemVDb2x1bW5zKC4uLmNvbHVtbnM6IFBibENvbHVtbltdKTogdm9pZCB7XG4gICAgY29uc3QgY29scyA9IGNvbHVtbnMubGVuZ3RoID4gMCA/IGNvbHVtbnMgOiB0aGlzLnZpc2libGVDb2x1bW5zO1xuICAgIGZvciAoY29uc3QgY29sdW1uIG9mIGNvbHMpIHtcbiAgICAgIGNvbnN0IHNpemUgPSB0aGlzLmZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW4pO1xuICAgICAgY29sdW1uLnVwZGF0ZVdpZHRoKGAke3NpemV9cHhgKTtcbiAgICB9XG4gICAgLy8gdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgLy8gdGhpcy5ncmlkLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCB2aXNpYmxlIGNvbHVtbiBpbiB0aGUgdGFibGUsIHJlc2l6ZSB0aGUgd2lkdGggdG8gYSBwcm9wb3J0aW9uYWwgd2lkdGggcmVsYXRpdmUgdG8gdGhlIHRvdGFsIHdpZHRoIHByb3ZpZGVkLlxuICAgKi9cbiAgYXV0b1NpemVUb0ZpdCh0b3RhbFdpZHRoOiBudW1iZXIsIG9wdGlvbnM6IEF1dG9TaXplVG9GaXRPcHRpb25zID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCB3TG9naWMgPSB0aGlzLmV4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgY29uc3QgeyB2aXNpYmxlQ29sdW1ucyB9ID0gdGhpcztcbiAgICBjb25zdCBjb2x1bW5CZWhhdmlvcjogQXV0b1NpemVUb0ZpdE9wdGlvbnNbJ2NvbHVtbkJlaGF2aW9yJ10gPSBvcHRpb25zLmNvbHVtbkJlaGF2aW9yIHx8ICggKCkgPT4gb3B0aW9ucyApIGFzIGFueTtcblxuICAgIGxldCBvdmVyZmxvd1RvdGFsV2lkdGggPSAwO1xuICAgIGxldCB0b3RhbE1pbldpZHRoID0gMDtcblxuICAgIGNvbnN0IHdpdGhNaW5XaWR0aDogbnVtYmVyW10gPSBbXTtcblxuICAgIGNvbnN0IHdpZHRoQnJlYWtvdXRzID0gdmlzaWJsZUNvbHVtbnMubWFwKCAoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGhCcmVha291dCA9IHdMb2dpYy53aWR0aEJyZWFrb3V0KGNvbHVtbi5zaXplSW5mbyk7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB7IC4uLihjb2x1bW5CZWhhdmlvcihjb2x1bW4pIHx8IHt9KSwgLi4ub3B0aW9ucyB9O1xuXG4gICAgICBvdmVyZmxvd1RvdGFsV2lkdGggKz0gd2lkdGhCcmVha291dC5jb250ZW50O1xuICAgICAgdG90YWxXaWR0aCAtPSB3aWR0aEJyZWFrb3V0Lm5vbkNvbnRlbnQ7XG5cbiAgICAgIGlmIChpbnN0cnVjdGlvbnMua2VlcE1pbldpZHRoICYmIGNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICB0b3RhbE1pbldpZHRoICs9IGNvbHVtbi5taW5XaWR0aDtcbiAgICAgICAgd2l0aE1pbldpZHRoLnB1c2goaW5kZXgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyAuLi53aWR0aEJyZWFrb3V0LCBpbnN0cnVjdGlvbnMgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHAgPSB0b3RhbE1pbldpZHRoIC8gdG90YWxXaWR0aDtcbiAgICBjb25zdCBsZXZlbCA9IChvdmVyZmxvd1RvdGFsV2lkdGggKiBwICAtIHRvdGFsTWluV2lkdGgpIC8gKDEgLSBwKTtcbiAgICBmb3IgKGNvbnN0IGkgb2Ygd2l0aE1pbldpZHRoKSB7XG4gICAgICBjb25zdCBhZGRpdGlvbiA9IGxldmVsICogKHZpc2libGVDb2x1bW5zW2ldLm1pbldpZHRoIC8gdG90YWxNaW5XaWR0aClcbiAgICAgIHdpZHRoQnJlYWtvdXRzW2ldLmNvbnRlbnQgKz0gYWRkaXRpb247XG4gICAgICBvdmVyZmxvd1RvdGFsV2lkdGggKz0gYWRkaXRpb247XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aXNpYmxlQ29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgd2lkdGhCcmVha291dCA9IHdpZHRoQnJlYWtvdXRzW2ldO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gd2lkdGhCcmVha291dC5pbnN0cnVjdGlvbnM7XG4gICAgICBjb25zdCBjb2x1bW4gPSB2aXNpYmxlQ29sdW1uc1tpXTtcblxuICAgICAgY29uc3QgciA9IHdpZHRoQnJlYWtvdXQuY29udGVudCAvIG92ZXJmbG93VG90YWxXaWR0aDtcblxuICAgICAgaWYgKCFpbnN0cnVjdGlvbnMua2VlcE1pbldpZHRoIHx8ICFjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgY29sdW1uLm1pbldpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKCFpbnN0cnVjdGlvbnMua2VlcE1heFdpZHRoIHx8ICFjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgICAgY29sdW1uLm1heFdpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICBjb2x1bW4uY2hlY2tNYXhXaWR0aExvY2soY29sdW1uLnNpemVJbmZvLndpZHRoKTsgLy8gaWYgaXRzIGxvY2tlZCwgd2UgbmVlZCB0byByZWxlYXNlLi4uXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZXJlIGFyZSAzIHNjZW5hcmlvcyB3aGVuIHVwZGF0aW5nIHRoZSBjb2x1bW5cbiAgICAgIC8vIDEpIGlmIGl0J3MgYSBmaXhlZCB3aWR0aCBvciB3ZSdyZSBmb3JjZSBpbnRvIGZpeGVkIHdpZHRoXG4gICAgICAvLyAyKSBOb3QgZml4ZWQgd2lkdGggYW5kIHdpZHRoIGlzIHNldCAoJSlcbiAgICAgIC8vIDMpIE5vdCBmaXhlZCB3aWR0aCBhbiB3aWR0aCBpcyBub3Qgc2V0ICggdGhlIHdpZHRoIGRlcGVuZHMgb24gdGhlIGNhbGN1bGF0ZWQgYGRlZmF1bHRXaWR0aGAgZG9uZSBpbiBgdGhpcy5ncmlkLnJlc2V0Q29sdW1uc1dpZHRoKClgIClcbiAgICAgIGxldCB3aWR0aDogc3RyaW5nO1xuICAgICAgY29uc3QgeyBmb3JjZVdpZHRoVHlwZSB9ID0gaW5zdHJ1Y3Rpb25zO1xuICAgICAgaWYgKGZvcmNlV2lkdGhUeXBlID09PSAncHgnIHx8ICghZm9yY2VXaWR0aFR5cGUgJiYgY29sdW1uLmlzRml4ZWRXaWR0aCkpIHsgLy8gKDEpXG4gICAgICAgIHdpZHRoID0gYCR7dG90YWxXaWR0aCAqIHJ9cHhgO1xuICAgICAgfSBlbHNlIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJyUnIHx8ICghZm9yY2VXaWR0aFR5cGUgJiYgY29sdW1uLndpZHRoKSkgeyAvLyAoMilcbiAgICAgICAgd2lkdGggPSBgJHsxMDAgKiByfSVgO1xuICAgICAgfSAvLyBlbHNlICgzKSAtPiB0aGUgdXBkYXRlIGlzIHNraXBwZWQgYW5kIGl0IHdpbGwgcnVuIHRocm91Z2ggcmVzZXRDb2x1bW5zV2lkdGhcblxuICAgICAgaWYgKHdpZHRoKSB7XG4gICAgICAgIGNvbHVtbi51cGRhdGVXaWR0aCh3aWR0aCk7XG4gICAgICB9XG5cbiAgICB9XG4gICAgLy8gd2Ugbm93IHJlc2V0IHRoZSBjb2x1bW4gd2lkdGhzLCB0aGlzIHdpbGwgY2FsY3VsYXRlIGEgbmV3IGBkZWZhdWx0V2lkdGhgIGFuZCBzZXQgaXQgaW4gYWxsIGNvbHVtbnMgYnV0IHRoZSByZWxldmFudCBvbmVzIGFyZSBjb2x1bW4gZnJvbSAoMylcbiAgICAvLyBJdCB3aWxsIGFsc28gbWFyayBhbGwgY29sdW1uRGVmcyBmb3IgY2hlY2tcbiAgICB0aGlzLmdyaWQucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLmdyaWQucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmUgdGhlIHByb3ZpZGVkIGBjb2x1bW5gIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYGFuY2hvcmAgY29sdW1uLlxuICAgKiBUaGUgbmV3IGxvY2F0aW9uIG9mIHRoZSBhbmNob3IgY29sdW1uIHdpbGwgYmUgaXQncyBvcmlnaW5hbCBsb2NhdGlvbiBwbHVzIG9yIG1pbnVzIDEsIGRlcGVuZGluZyBvbiB0aGUgZGVsdGEgYmV0d2VlblxuICAgKiB0aGUgY29sdW1ucy4gSWYgdGhlIG9yaWdpbiBvZiB0aGUgYGNvbHVtbmAgaXMgYmVmb3JlIHRoZSBgYW5jaG9yYCB0aGVuIHRoZSBhbmNob3IncyBuZXcgcG9zaXRpb24gaXMgbWludXMgb25lLCBvdGhlcndpc2UgcGx1cyAxLlxuICAgKi9cbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgYW5jaG9yOiBQYmxDb2x1bW4sIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbjtcbiAgICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4gYXQgYHJlbmRlckNvbHVtbkluZGV4YC5cbiAgICogYHJlbmRlckNvbHVtbkluZGV4YCBtdXN0IGJlIGEgdmlzaWJsZSBjb2x1bW4gKGkuZS4gbm90IGhpZGRlbilcbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIHJlbmRlckNvbHVtbkluZGV4OiBudW1iZXIsIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbjsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgYW5jaG9yOiBQYmxDb2x1bW4gfCBudW1iZXIsIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzUGJsQ29sdW1uKGFuY2hvcikpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbHVtbiA9PT0gYW5jaG9yID8gZmFsc2UgOiB0aGlzLnN0b3JlLm1vdmVDb2x1bW4oY29sdW1uLCBhbmNob3IpO1xuICAgICAgaWYgKHJlc3VsdCAmJiBza2lwUmVkcmF3ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYSA9IHRoaXMuZmluZENvbHVtbkF0KGFuY2hvcik7XG4gICAgICByZXR1cm4gYSA/IHRoaXMubW92ZUNvbHVtbihjb2x1bW4sIGEpIDogZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3YXAgcG9zaXRpb25zIGJldHdlZW4gMiBleGlzdGluZyBjb2x1bW5zLlxuICAgKi9cbiAgc3dhcENvbHVtbnMoY29sMTogUGJsQ29sdW1uLCBjb2wyOiBQYmxDb2x1bW4sIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5zd2FwQ29sdW1ucyhjb2wxLCBjb2wyKTtcbiAgICBpZiAocmVzdWx0ICYmIHNraXBSZWRyYXcgIT09IHRydWUpIHtcbiAgICAgIHRoaXMuYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYWRkR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7IHRoaXMuc3RvcmUuYWRkR3JvdXBCeSguLi5jb2x1bW4pOyB9XG4gIHJlbW92ZUdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQgeyB0aGlzLnN0b3JlLnJlbW92ZUdyb3VwQnkoLi4uY29sdW1uKTsgfVxuXG4gIHByaXZhdGUgZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbjogUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGNvbHVtbkRlZiB9ID0gY29sdW1uO1xuICAgIGNvbnN0IGNlbGxzID0gY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCk7XG4gICAgbGV0IHNpemUgPSAwO1xuICAgIGZvciAoY29uc3QgYyBvZiBjZWxscykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IChjLmZpcnN0RWxlbWVudENoaWxkIHx8IGMpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsV2lkdGggPiBzaXplKSB7XG4gICAgICAgIHNpemUgPSBlbGVtZW50LnNjcm9sbFdpZHRoICsgMTtcbiAgICAgICAgLy8gd2UgYWRkIDEgcGl4ZWwgYmVjYXVzZSBgZWxlbWVudC5zY3JvbGxXaWR0aGAgZG9lcyBub3Qgc3VwcG9ydCBzdWJwaXhlbCB2YWx1ZXMsIHRoZSB3aWR0aCBpcyBjb252ZXJ0ZWQgdG8gYW4gaW50ZWdlciByZW1vdmluZyBzdWJwaXhlbCB2YWx1ZXMgKGZyYWN0aW9ucykuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICB0aGlzLnN0b3JlLnVwZGF0ZUdyb3VwcygpO1xuICAgIHRoaXMuZ3JpZC5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKCk7XG4gIH1cbn1cbiJdfQ==