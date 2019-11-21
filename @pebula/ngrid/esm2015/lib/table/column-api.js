/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * @param {?} table
     * @param {?} store
     * @param {?} extApi
     * @return {?}
     */
    static create(table, store, extApi) {
        /** @type {?} */
        const instance = new ColumnApi();
        instance.table = table;
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
        // this.table.resetColumnsWidth();
        // this.table.resizeColumns();
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
        // this.table.resetColumnsWidth();
        // this.table.resizeColumns();
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
            // 3) Not fixed width an width is not set ( the width depends on the calculated `defaultWidth` done in `this.table.resetColumnsWidth()` )
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
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
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
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29sdW1uLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFhLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBRzFELDBDQStCQzs7Ozs7Ozs7Ozs7SUF0QkMsOENBQTRCOzs7Ozs7SUFNNUIsNENBQXVCOzs7Ozs7SUFNdkIsNENBQXNCOzs7Ozs7Ozs7O0lBU3RCLHNFQUErSDs7Ozs7QUFHakksTUFBTSxPQUFPLFNBQVM7Ozs7SUF5QnBCLGdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7SUFuQnpCLE1BQU0sQ0FBQyxNQUFNLENBQUksS0FBMkIsRUFBRSxLQUFxQixFQUFFLE1BQTRCOztjQUN6RixRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUs7UUFFbkMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFekIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELElBQUksY0FBYyxLQUFrQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7OztJQUNoRSxJQUFJLGdCQUFnQixLQUFlLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ2pFLElBQUksY0FBYyxLQUFrQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7OztJQUNoRSxJQUFJLE9BQU8sS0FBa0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQVc1RCxZQUFZLENBQUMsaUJBQXlCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxP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SUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFTyx5QkFBeUI7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7Ozs7OztJQWpPQywwQkFBb0M7Ozs7O0lBQ3BDLDBCQUE4Qjs7Ozs7SUFDOUIsMkJBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtbiwgaXNQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibENvbHVtblN0b3JlIH0gZnJvbSAnLi9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b1NpemVUb0ZpdE9wdGlvbnMge1xuICAvKipcbiAgICogV2hlbiBgcHhgIHdpbGwgZm9yY2UgYWxsIGNvbHVtbnMgd2lkdGggdG8gYmUgaW4gZml4ZWQgcGl4ZWxzXG4gICAqIFdoZW4gYCVgIHdpbGwgZm9yY2UgYWxsIGNvbHVtbiB3aWR0aCB0byBiZSBpbiAlXG4gICAqIG90aGVyd2lzZSAoZGVmYXVsdCkgdGhlIHdpZHRoIHdpbGwgYmUgc2V0IGluIHRoZSBzYW1lIGZvcm1hdCBpdCB3YXMgb3JpZ2luYWxseSBzZXQuXG4gICAqIGUuZy46IElmIHdpZHRoIHdhcyBgMzMlYCB0aGUgbmV3IHdpZHRoIHdpbGwgYWxzbyBiZSBpbiAlLCBvciBpZiB3aWR0aCBub3Qgc2V0IHRoZSBuZXcgd2lkdGggd2lsbCBub3QgYmUgc2V0IGFzIHdlbGwuXG4gICAqXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBmb3JjZVdpZHRoVHlwZT86ICclJyB8ICdweCc7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGtlZXAgdGhlIGBtaW5XaWR0aGAgY29sdW1uIGRlZmluaXRpb24gKHdoZW4gc2V0KSwgb3RoZXJ3aXNlIHdpbGwgY2xlYXIgaXQuXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBrZWVwTWluV2lkdGg/OiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCBrZWVwIHRoZSBgbWF4V2lkdGhgIGNvbHVtbiBkZWZpbml0aW9uICh3aGVuIHNldCksIG90aGVyd2lzZSB3aWxsIGNsZWFyIGl0LlxuICAgKiBEb2VzIG5vdCBhcHBseSB3aGVuIGNvbHVtbkJlaGF2aW9yIGlzIHNldCBhbmQgcmV0dXJucyBhIHZhbHVlLlxuICAgKi9cbiAga2VlcE1heFdpZHRoPzogYm9vbGVhblxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIGZvciBwZXItY29sdW1uIGZpbmUgdHVuaW5nIG9mIHRoZSBwcm9jZXNzLlxuICAgKiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGBQYmxDb2x1bW5gLCBpdHMgcmVsYXRpdmUgd2lkdGggKGluICUsIDAgdG8gMSkgYW5kIHRvdGFsIHdpZHRoIChpbiBwaXhlbHMpIGFuZCBzaG91bGQgcmV0dXJuXG4gICAqIGFuIG9iamVjdCBkZXNjcmliaW5nIGhvdyBpdCBzaG91bGQgYXV0byBmaXQuXG4gICAqXG4gICAqIFdoZW4gdGhlIGZ1bmN0aW9uIHJldHVybnMgdW5kZWZpbmVkIHRoZSBvcHRpb25zIGFyZSB0YWtlbiBmcm9tIHRoZSByb290LlxuICAgKi9cbiAgY29sdW1uQmVoYXZpb3I/KGNvbHVtbjogUGJsQ29sdW1uKTogUGljazxBdXRvU2l6ZVRvRml0T3B0aW9ucywgJ2ZvcmNlV2lkdGhUeXBlJyB8ICdrZWVwTWluV2lkdGgnIHwgJ2tlZXBNYXhXaWR0aCc+IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgQ29sdW1uQXBpPFQ+IHtcblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUPih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD4sIHN0b3JlOiBQYmxDb2x1bW5TdG9yZSwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaSk6IENvbHVtbkFwaTxUPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgQ29sdW1uQXBpPFQ+KCk7XG5cbiAgICBpbnN0YW5jZS50YWJsZSA9IHRhYmxlO1xuICAgIGluc3RhbmNlLnN0b3JlID0gc3RvcmU7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgZ2V0IGdyb3VwQnlDb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUuZ3JvdXBCeTsgfVxuICBnZXQgdmlzaWJsZUNvbHVtbklkcygpOiBzdHJpbmdbXSB7IHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbklkczsgfVxuICBnZXQgdmlzaWJsZUNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zOyB9XG4gIGdldCBjb2x1bW5zKCk6IFBibENvbHVtbltdIHsgcmV0dXJuIHRoaXMuc3RvcmUuYWxsQ29sdW1uczsgfVxuXG4gIHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIHN0b3JlOiBQYmxDb2x1bW5TdG9yZTtcbiAgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYFBibENvbHVtbmAgYXQgdGhlIHNwZWNpZmllZCBpbmRleCBmcm9tIHRoZSBsaXN0IG9mIHJlbmRlcmVkIGNvbHVtbnMgKGkuZS4gbm90IGhpZGRlbikuXG4gICAqL1xuICBmaW5kQ29sdW1uQXQocmVuZGVyQ29sdW1uSW5kZXg6IG51bWJlcik6IFBibENvbHVtbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uc1tyZW5kZXJDb2x1bW5JbmRleF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29sdW1uIG1hdGNoaW5nIHByb3ZpZGVkIGBpZGAuXG4gICAqXG4gICAqIFRoZSBzZWFyY2ggaXMgcGVyZm9ybWVkIG9uIGFsbCBrbm93biBjb2x1bW5zLlxuICAgKi9cbiAgZmluZENvbHVtbihpZDogc3RyaW5nKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnN0b3JlLmZpbmQoaWQpO1xuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQuZGF0YTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBSZXR1cm5zIHRoZSByZW5kZXIgaW5kZXggb2YgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgKlxuICAqIFRoZSByZW5kZXIgaW5kZXggcmVwcmVzZW50cyB0aGUgY3VycmVudCBsb2NhdGlvbiBvZiB0aGUgY29sdW1uIGluIHRoZSBncm91cCBvZiB2aXNpYmxlIGNvbHVtbnMuXG4gICovXG4gIHJlbmRlckluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiBhIGNvbHVtbiBvciAtMSBpZiBub3QgZm91bmQuXG4gICAqL1xuICBpbmRleE9mKGNvbHVtbjogc3RyaW5nIHwgUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbHVtbiA9PT0gJ3N0cmluZycgPyB0aGlzLmZpbmRDb2x1bW4oY29sdW1uKSA6IGNvbHVtbjtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zLmluZGV4T2YoYyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uIHdpdGggdGhlIHByb3ZpZGVkIHdpZHRoLlxuICAgKlxuICAgKiBUaGUgd2lkdGggaXMgc2V0IGluIHB4IG9yICUgaW4gdGhlIGZvbGxvd2luZyBmb3JtYXQ6ICMjJSBvciAjI3B4XG4gICAqIEV4YW1wbGVzOiAnNTAlJywgJzUwcHgnXG4gICAqXG4gICAqIFJlc2l6aW5nIHRoZSBjb2x1bW4gd2lsbCB0cmlnZ2VyIGEgdGFibGUgd2lkdGggcmVzaXppbmcgZXZlbnQsIHVwZGF0aW5nIGNvbHVtbiBncm91cCBpZiBuZWNlc3NhcnkuXG4gICAqL1xuICByZXNpemVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIHdpZHRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb2x1bW4udXBkYXRlV2lkdGgod2lkdGgpO1xuICAgIC8vIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICAvLyB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNpemUgdGhlIGNvbHVtbiB0byBiZXN0IGZpdCBpdCdzIGNvbnRlbnQuXG4gICAqXG4gICAqIC0gQ29udGVudDogQWxsIG9mIHRoZSBjZWxscyByZW5kZXJlZCBmb3IgdGhpcyBjb2x1bW4gKGhlYWRlciwgZGF0YSBhbmQgZm9vdGVyIGNlbGxzKS5cbiAgICogLSBCZXN0IGZpdDogVGhlIHdpZHRoIG9mIHRoZSBjZWxsIHdpdGggdGhlIGhlaWdodCB3aWR0aCBtZWFzdXJlZC5cbiAgICpcbiAgICogVGhlIGJlc3QgZml0IGZvdW5kICh3aWR0aCkgaXMgdGhlbiB1c2VkIHRvIGNhbGwgYHJlc2l6ZUNvbHVtbigpYC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgdGhpcy5yZXNpemVDb2x1bW4oY29sdW1uLCBgJHtzaXplfXB4YCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGVhY2ggdmlzaWJsZSBjb2x1bW4gaW4gdGhlIHRhYmxlLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHNpbXBseSBydW4gYGF1dG9TaXplQ29sdW1uKClgIG9uIHRoZSB2aXNpYmxlIGNvbHVtbnMgaW4gdGhlIHRhYmxlLlxuICAgKi9cbiAgYXV0b1NpemVDb2x1bW5zKCk6IHZvaWQ7XG4gIC8qKlxuICAgKiBGb3IgZWFjaCBjb2x1bW4gaW4gdGhlIGxpc3Qgb2YgY29sdW1uIHByb3ZpZGVkLCByZXNpemUgdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiBNYWtlIHN1cmUgeW91IGFyZSBub3QgcmVzaXppbmcgYW4gaGlkZGVuIGNvbHVtbi5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgY29sdW1ucyBwcm92aWRlZC5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQ7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGF1dG9TaXplQ29sdW1ucyguLi5jb2x1bW5zOiBQYmxDb2x1bW5bXSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbHMgPSBjb2x1bW5zLmxlbmd0aCA+IDAgPyBjb2x1bW5zIDogdGhpcy52aXNpYmxlQ29sdW1ucztcbiAgICBmb3IgKGNvbnN0IGNvbHVtbiBvZiBjb2xzKSB7XG4gICAgICBjb25zdCBzaXplID0gdGhpcy5maW5kQ29sdW1uQXV0b1NpemUoY29sdW1uKTtcbiAgICAgIGNvbHVtbi51cGRhdGVXaWR0aChgJHtzaXplfXB4YCk7XG4gICAgfVxuICAgIC8vIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICAvLyB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCB2aXNpYmxlIGNvbHVtbiBpbiB0aGUgdGFibGUsIHJlc2l6ZSB0aGUgd2lkdGggdG8gYSBwcm9wb3J0aW9uYWwgd2lkdGggcmVsYXRpdmUgdG8gdGhlIHRvdGFsIHdpZHRoIHByb3ZpZGVkLlxuICAgKi9cbiAgYXV0b1NpemVUb0ZpdCh0b3RhbFdpZHRoOiBudW1iZXIsIG9wdGlvbnM6IEF1dG9TaXplVG9GaXRPcHRpb25zID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCB3TG9naWMgPSB0aGlzLmV4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgY29uc3QgeyB2aXNpYmxlQ29sdW1ucyB9ID0gdGhpcztcbiAgICBjb25zdCBjb2x1bW5CZWhhdmlvcjogQXV0b1NpemVUb0ZpdE9wdGlvbnNbJ2NvbHVtbkJlaGF2aW9yJ10gPSBvcHRpb25zLmNvbHVtbkJlaGF2aW9yIHx8ICggKCkgPT4gb3B0aW9ucyApIGFzIGFueTtcblxuICAgIGxldCBvdmVyZmxvd1RvdGFsV2lkdGggPSAwO1xuICAgIGxldCB0b3RhbE1pbldpZHRoID0gMDtcblxuICAgIGNvbnN0IHdpdGhNaW5XaWR0aDogbnVtYmVyW10gPSBbXTtcblxuICAgIGNvbnN0IHdpZHRoQnJlYWtvdXRzID0gdmlzaWJsZUNvbHVtbnMubWFwKCAoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGhCcmVha291dCA9IHdMb2dpYy53aWR0aEJyZWFrb3V0KGNvbHVtbi5zaXplSW5mbyk7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB7IC4uLihjb2x1bW5CZWhhdmlvcihjb2x1bW4pIHx8IHt9KSwgLi4ub3B0aW9ucyB9O1xuXG4gICAgICBvdmVyZmxvd1RvdGFsV2lkdGggKz0gd2lkdGhCcmVha291dC5jb250ZW50O1xuICAgICAgdG90YWxXaWR0aCAtPSB3aWR0aEJyZWFrb3V0Lm5vbkNvbnRlbnQ7XG5cbiAgICAgIGlmIChpbnN0cnVjdGlvbnMua2VlcE1pbldpZHRoICYmIGNvbHVtbi5taW5XaWR0aCkge1xuICAgICAgICB0b3RhbE1pbldpZHRoICs9IGNvbHVtbi5taW5XaWR0aDtcbiAgICAgICAgd2l0aE1pbldpZHRoLnB1c2goaW5kZXgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyAuLi53aWR0aEJyZWFrb3V0LCBpbnN0cnVjdGlvbnMgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHAgPSB0b3RhbE1pbldpZHRoIC8gdG90YWxXaWR0aDtcbiAgICBjb25zdCBsZXZlbCA9IChvdmVyZmxvd1RvdGFsV2lkdGggKiBwICAtIHRvdGFsTWluV2lkdGgpIC8gKDEgLSBwKTtcbiAgICBmb3IgKGNvbnN0IGkgb2Ygd2l0aE1pbldpZHRoKSB7XG4gICAgICBjb25zdCBhZGRpdGlvbiA9IGxldmVsICogKHZpc2libGVDb2x1bW5zW2ldLm1pbldpZHRoIC8gdG90YWxNaW5XaWR0aClcbiAgICAgIHdpZHRoQnJlYWtvdXRzW2ldLmNvbnRlbnQgKz0gYWRkaXRpb247XG4gICAgICBvdmVyZmxvd1RvdGFsV2lkdGggKz0gYWRkaXRpb247XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2aXNpYmxlQ29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgd2lkdGhCcmVha291dCA9IHdpZHRoQnJlYWtvdXRzW2ldO1xuICAgICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gd2lkdGhCcmVha291dC5pbnN0cnVjdGlvbnM7XG4gICAgICBjb25zdCBjb2x1bW4gPSB2aXNpYmxlQ29sdW1uc1tpXTtcblxuICAgICAgY29uc3QgciA9IHdpZHRoQnJlYWtvdXQuY29udGVudCAvIG92ZXJmbG93VG90YWxXaWR0aDtcblxuICAgICAgaWYgKCFpbnN0cnVjdGlvbnMua2VlcE1pbldpZHRoIHx8ICFjb2x1bW4ubWluV2lkdGgpIHtcbiAgICAgICAgY29sdW1uLm1pbldpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKCFpbnN0cnVjdGlvbnMua2VlcE1heFdpZHRoIHx8ICFjb2x1bW4ubWF4V2lkdGgpIHtcbiAgICAgICAgY29sdW1uLm1heFdpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgICBjb2x1bW4uY2hlY2tNYXhXaWR0aExvY2soY29sdW1uLnNpemVJbmZvLndpZHRoKTsgLy8gaWYgaXRzIGxvY2tlZCwgd2UgbmVlZCB0byByZWxlYXNlLi4uXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZXJlIGFyZSAzIHNjZW5hcmlvcyB3aGVuIHVwZGF0aW5nIHRoZSBjb2x1bW5cbiAgICAgIC8vIDEpIGlmIGl0J3MgYSBmaXhlZCB3aWR0aCBvciB3ZSdyZSBmb3JjZSBpbnRvIGZpeGVkIHdpZHRoXG4gICAgICAvLyAyKSBOb3QgZml4ZWQgd2lkdGggYW5kIHdpZHRoIGlzIHNldCAoJSlcbiAgICAgIC8vIDMpIE5vdCBmaXhlZCB3aWR0aCBhbiB3aWR0aCBpcyBub3Qgc2V0ICggdGhlIHdpZHRoIGRlcGVuZHMgb24gdGhlIGNhbGN1bGF0ZWQgYGRlZmF1bHRXaWR0aGAgZG9uZSBpbiBgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpYCApXG4gICAgICBsZXQgd2lkdGg6IHN0cmluZztcbiAgICAgIGNvbnN0IHsgZm9yY2VXaWR0aFR5cGUgfSA9IGluc3RydWN0aW9ucztcbiAgICAgIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJ3B4JyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi5pc0ZpeGVkV2lkdGgpKSB7IC8vICgxKVxuICAgICAgICB3aWR0aCA9IGAke3RvdGFsV2lkdGggKiByfXB4YDtcbiAgICAgIH0gZWxzZSBpZiAoZm9yY2VXaWR0aFR5cGUgPT09ICclJyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi53aWR0aCkpIHsgLy8gKDIpXG4gICAgICAgIHdpZHRoID0gYCR7MTAwICogcn0lYDtcbiAgICAgIH0gLy8gZWxzZSAoMykgLT4gdGhlIHVwZGF0ZSBpcyBza2lwcGVkIGFuZCBpdCB3aWxsIHJ1biB0aHJvdWdoIHJlc2V0Q29sdW1uc1dpZHRoXG5cbiAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICBjb2x1bW4udXBkYXRlV2lkdGgod2lkdGgpO1xuICAgICAgfVxuXG4gICAgfVxuICAgIC8vIHdlIG5vdyByZXNldCB0aGUgY29sdW1uIHdpZHRocywgdGhpcyB3aWxsIGNhbGN1bGF0ZSBhIG5ldyBgZGVmYXVsdFdpZHRoYCBhbmQgc2V0IGl0IGluIGFsbCBjb2x1bW5zIGJ1dCB0aGUgcmVsZXZhbnQgb25lcyBhcmUgY29sdW1uIGZyb20gKDMpXG4gICAgLy8gSXQgd2lsbCBhbHNvIG1hcmsgYWxsIGNvbHVtbkRlZnMgZm9yIGNoZWNrXG4gICAgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpO1xuICAgIHRoaXMudGFibGUucmVzaXplQ29sdW1ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdmUgdGhlIHByb3ZpZGVkIGBjb2x1bW5gIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYGFuY2hvcmAgY29sdW1uLlxuICAgKiBUaGUgbmV3IGxvY2F0aW9uIG9mIHRoZSBhbmNob3IgY29sdW1uIHdpbGwgYmUgaXQncyBvcmlnaW5hbCBsb2NhdGlvbiBwbHVzIG9yIG1pbnVzIDEsIGRlcGVuZGluZyBvbiB0aGUgZGVsdGEgYmV0d2VlblxuICAgKiB0aGUgY29sdW1ucy4gSWYgdGhlIG9yaWdpbiBvZiB0aGUgYGNvbHVtbmAgaXMgYmVmb3JlIHRoZSBgYW5jaG9yYCB0aGVuIHRoZSBhbmNob3IncyBuZXcgcG9zaXRpb24gaXMgbWludXMgb25lLCBvdGhlcndpc2UgcGx1cyAxLlxuICAgKi9cbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgYW5jaG9yOiBQYmxDb2x1bW4sIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbjtcbiAgICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4gYXQgYHJlbmRlckNvbHVtbkluZGV4YC5cbiAgICogYHJlbmRlckNvbHVtbkluZGV4YCBtdXN0IGJlIGEgdmlzaWJsZSBjb2x1bW4gKGkuZS4gbm90IGhpZGRlbilcbiAgICovXG4gIG1vdmVDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4sIHJlbmRlckNvbHVtbkluZGV4OiBudW1iZXIsIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbjsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1bmlmaWVkLXNpZ25hdHVyZXNcbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgYW5jaG9yOiBQYmxDb2x1bW4gfCBudW1iZXIsIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzUGJsQ29sdW1uKGFuY2hvcikpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbHVtbiA9PT0gYW5jaG9yID8gZmFsc2UgOiB0aGlzLnN0b3JlLm1vdmVDb2x1bW4oY29sdW1uLCBhbmNob3IpO1xuICAgICAgaWYgKHJlc3VsdCAmJiBza2lwUmVkcmF3ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYSA9IHRoaXMuZmluZENvbHVtbkF0KGFuY2hvcik7XG4gICAgICByZXR1cm4gYSA/IHRoaXMubW92ZUNvbHVtbihjb2x1bW4sIGEpIDogZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN3YXAgcG9zaXRpb25zIGJldHdlZW4gMiBleGlzdGluZyBjb2x1bW5zLlxuICAgKi9cbiAgc3dhcENvbHVtbnMoY29sMTogUGJsQ29sdW1uLCBjb2wyOiBQYmxDb2x1bW4sIHNraXBSZWRyYXc/OiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5zdG9yZS5zd2FwQ29sdW1ucyhjb2wxLCBjb2wyKTtcbiAgICBpZiAocmVzdWx0ICYmIHNraXBSZWRyYXcgIT09IHRydWUpIHtcbiAgICAgIHRoaXMuYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYWRkR3JvdXBCeSguLi5jb2x1bW46IFBibENvbHVtbltdKTogdm9pZCB7IHRoaXMuc3RvcmUuYWRkR3JvdXBCeSguLi5jb2x1bW4pOyB9XG4gIHJlbW92ZUdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQgeyB0aGlzLnN0b3JlLnJlbW92ZUdyb3VwQnkoLi4uY29sdW1uKTsgfVxuXG4gIHByaXZhdGUgZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbjogUGJsQ29sdW1uKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IGNvbHVtbkRlZiB9ID0gY29sdW1uO1xuICAgIGNvbnN0IGNlbGxzID0gY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKCk7XG4gICAgbGV0IHNpemUgPSAwO1xuICAgIGZvciAoY29uc3QgYyBvZiBjZWxscykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IChjLmZpcnN0RWxlbWVudENoaWxkIHx8IGMpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgaWYgKGVsZW1lbnQuc2Nyb2xsV2lkdGggPiBzaXplKSB7XG4gICAgICAgIHNpemUgPSBlbGVtZW50LnNjcm9sbFdpZHRoICsgMTtcbiAgICAgICAgLy8gd2UgYWRkIDEgcGl4ZWwgYmVjYXVzZSBgZWxlbWVudC5zY3JvbGxXaWR0aGAgZG9lcyBub3Qgc3VwcG9ydCBzdWJwaXhlbCB2YWx1ZXMsIHRoZSB3aWR0aCBpcyBjb252ZXJ0ZWQgdG8gYW4gaW50ZWdlciByZW1vdmluZyBzdWJwaXhlbCB2YWx1ZXMgKGZyYWN0aW9ucykuXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzaXplO1xuICB9XG5cbiAgcHJpdmF0ZSBhZnRlckNvbHVtblBvc2l0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuZXh0QXBpLmNvbnRleHRBcGkuY2xlYXIoKTtcbiAgICB0aGlzLnN0b3JlLnVwZGF0ZUdyb3VwcygpO1xuICAgIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxufVxuIl19