/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        column.updateWidth(true, width);
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
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
            column.updateWidth(true, `${size}px`);
        }
        this.table.resetColumnsWidth();
        this.table.resizeColumns();
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
            const instructions = columnBehavior(column) || options;
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
        /** @type {?} */
        let sum = [];
        for (let i = 0; i < visibleColumns.length; i++) {
            /** @type {?} */
            const widthBreakout = widthBreakouts[i];
            /** @type {?} */
            const instructions = widthBreakout.instructions;
            /** @type {?} */
            const column = visibleColumns[i];
            /** @type {?} */
            const r = widthBreakout.content / overflowTotalWidth;
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
            let width;
            const { forceWidthType } = instructions;
            if (forceWidthType === 'px' || (!forceWidthType && column.isFixedWidth)) { // (1)
                width = `${totalWidth * r}px`;
            }
            else if (forceWidthType === '%' || (!forceWidthType && column.width)) { // (2)
                width = `${100 * r}%`;
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
    }
    // tslint:disable-line:unified-signatures
    /**
     * @param {?} column
     * @param {?} anchor
     * @param {?=} skipRedraw
     * @return {?}
     */
    moveColumn(column, anchor, skipRedraw) {
        if (anchor instanceof PblColumn) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWFwaS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29sdW1uLWFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBRzdDLDBDQStCQzs7Ozs7Ozs7Ozs7SUF0QkMsOENBQTRCOzs7Ozs7SUFNNUIsNENBQXVCOzs7Ozs7SUFNdkIsNENBQXNCOzs7Ozs7Ozs7O0lBU3RCLHNFQUErSDs7Ozs7QUFHakksTUFBTSxPQUFPLFNBQVM7Ozs7SUF5QnBCLGdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7SUFuQnpCLE1BQU0sQ0FBQyxNQUFNLENBQUksS0FBMkIsRUFBRSxLQUFxQixFQUFFLE1BQTRCOztjQUN6RixRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUs7UUFFbkMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFekIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQzs7OztJQUVELElBQUksY0FBYyxLQUFrQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7OztJQUNoRSxJQUFJLGdCQUFnQixLQUFlLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ2pFLElBQUksY0FBYyxLQUFrQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7OztJQUNoRSxJQUFJLE9BQU8sS0FBa0IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7OztJQVc1RCxZQUFZLENBQUMsaUJBQXlCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxP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QUFDLEVBQWU7WUFDekQsSUFBSSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksRUFBRTtnQkFDOUIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQiw0SkFBNEo7YUFDN0o7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7Ozs7SUFFTyx5QkFBeUI7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7Ozs7OztJQW5PQywwQkFBb0M7Ozs7O0lBQ3BDLDBCQUE4Qjs7Ozs7SUFDOUIsMkJBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsQ29sdW1uU3RvcmUgfSBmcm9tICcuL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBBdXRvU2l6ZVRvRml0T3B0aW9ucyB7XG4gIC8qKlxuICAgKiBXaGVuIGBweGAgd2lsbCBmb3JjZSBhbGwgY29sdW1ucyB3aWR0aCB0byBiZSBpbiBmaXhlZCBwaXhlbHNcbiAgICogV2hlbiBgJWAgd2lsbCBmb3JjZSBhbGwgY29sdW1uIHdpZHRoIHRvIGJlIGluICVcbiAgICogb3RoZXJ3aXNlIChkZWZhdWx0KSB0aGUgd2lkdGggd2lsbCBiZSBzZXQgaW4gdGhlIHNhbWUgZm9ybWF0IGl0IHdhcyBvcmlnaW5hbGx5IHNldC5cbiAgICogZS5nLjogSWYgd2lkdGggd2FzIGAzMyVgIHRoZSBuZXcgd2lkdGggd2lsbCBhbHNvIGJlIGluICUsIG9yIGlmIHdpZHRoIG5vdCBzZXQgdGhlIG5ldyB3aWR0aCB3aWxsIG5vdCBiZSBzZXQgYXMgd2VsbC5cbiAgICpcbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGZvcmNlV2lkdGhUeXBlPzogJyUnIHwgJ3B4JztcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwga2VlcCB0aGUgYG1pbldpZHRoYCBjb2x1bW4gZGVmaW5pdGlvbiAod2hlbiBzZXQpLCBvdGhlcndpc2Ugd2lsbCBjbGVhciBpdC5cbiAgICogRG9lcyBub3QgYXBwbHkgd2hlbiBjb2x1bW5CZWhhdmlvciBpcyBzZXQgYW5kIHJldHVybnMgYSB2YWx1ZS5cbiAgICovXG4gIGtlZXBNaW5XaWR0aD86IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGtlZXAgdGhlIGBtYXhXaWR0aGAgY29sdW1uIGRlZmluaXRpb24gKHdoZW4gc2V0KSwgb3RoZXJ3aXNlIHdpbGwgY2xlYXIgaXQuXG4gICAqIERvZXMgbm90IGFwcGx5IHdoZW4gY29sdW1uQmVoYXZpb3IgaXMgc2V0IGFuZCByZXR1cm5zIGEgdmFsdWUuXG4gICAqL1xuICBrZWVwTWF4V2lkdGg/OiBib29sZWFuXG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gZm9yIHBlci1jb2x1bW4gZmluZSB0dW5pbmcgb2YgdGhlIHByb2Nlc3MuXG4gICAqIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgYFBibENvbHVtbmAsIGl0cyByZWxhdGl2ZSB3aWR0aCAoaW4gJSwgMCB0byAxKSBhbmQgdG90YWwgd2lkdGggKGluIHBpeGVscykgYW5kIHNob3VsZCByZXR1cm5cbiAgICogYW4gb2JqZWN0IGRlc2NyaWJpbmcgaG93IGl0IHNob3VsZCBhdXRvIGZpdC5cbiAgICpcbiAgICogV2hlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyB1bmRlZmluZWQgdGhlIG9wdGlvbnMgYXJlIHRha2VuIGZyb20gdGhlIHJvb3QuXG4gICAqL1xuICBjb2x1bW5CZWhhdmlvcj8oY29sdW1uOiBQYmxDb2x1bW4pOiBQaWNrPEF1dG9TaXplVG9GaXRPcHRpb25zLCAnZm9yY2VXaWR0aFR5cGUnIHwgJ2tlZXBNaW5XaWR0aCcgfCAna2VlcE1heFdpZHRoJz4gfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5BcGk8VD4ge1xuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQ+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPiwgc3RvcmU6IFBibENvbHVtblN0b3JlLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpKTogQ29sdW1uQXBpPFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBDb2x1bW5BcGk8VD4oKTtcblxuICAgIGluc3RhbmNlLnRhYmxlID0gdGFibGU7XG4gICAgaW5zdGFuY2Uuc3RvcmUgPSBzdG9yZTtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBnZXQgZ3JvdXBCeUNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5ncm91cEJ5OyB9XG4gIGdldCB2aXNpYmxlQ29sdW1uSWRzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1uSWRzOyB9XG4gIGdldCB2aXNpYmxlQ29sdW1ucygpOiBQYmxDb2x1bW5bXSB7IHJldHVybiB0aGlzLnN0b3JlLmNvbHVtbnM7IH1cbiAgZ2V0IGNvbHVtbnMoKTogUGJsQ29sdW1uW10geyByZXR1cm4gdGhpcy5zdG9yZS5hbGxDb2x1bW5zOyB9XG5cbiAgcHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgc3RvcmU6IFBibENvbHVtblN0b3JlO1xuICBwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBgUGJsQ29sdW1uYCBhdCB0aGUgc3BlY2lmaWVkIGluZGV4IGZyb20gdGhlIGxpc3Qgb2YgcmVuZGVyZWQgY29sdW1ucyAoaS5lLiBub3QgaGlkZGVuKS5cbiAgICovXG4gIGZpbmRDb2x1bW5BdChyZW5kZXJDb2x1bW5JbmRleDogbnVtYmVyKTogUGJsQ29sdW1uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5jb2x1bW5zW3JlbmRlckNvbHVtbkluZGV4XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjb2x1bW4gbWF0Y2hpbmcgcHJvdmlkZWQgYGlkYC5cbiAgICpcbiAgICogVGhlIHNlYXJjaCBpcyBwZXJmb3JtZWQgb24gYWxsIGtub3duIGNvbHVtbnMuXG4gICAqL1xuICBmaW5kQ29sdW1uKGlkOiBzdHJpbmcpOiBQYmxDb2x1bW4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuZmluZChpZCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdC5kYXRhO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIFJldHVybnMgdGhlIHJlbmRlciBpbmRleCBvZiBjb2x1bW4gb3IgLTEgaWYgbm90IGZvdW5kLlxuICAqXG4gICogVGhlIHJlbmRlciBpbmRleCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGxvY2F0aW9uIG9mIHRoZSBjb2x1bW4gaW4gdGhlIGdyb3VwIG9mIHZpc2libGUgY29sdW1ucy5cbiAgKi9cbiAgcmVuZGVySW5kZXhPZihjb2x1bW46IHN0cmluZyB8IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgYyA9IHR5cGVvZiBjb2x1bW4gPT09ICdzdHJpbmcnID8gdGhpcy5maW5kQ29sdW1uKGNvbHVtbikgOiBjb2x1bW47XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuY29sdW1ucy5pbmRleE9mKGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGluZGV4IG9mIGEgY29sdW1uIG9yIC0xIGlmIG5vdCBmb3VuZC5cbiAgICovXG4gIGluZGV4T2YoY29sdW1uOiBzdHJpbmcgfCBQYmxDb2x1bW4pOiBudW1iZXIge1xuICAgIGNvbnN0IGMgPSB0eXBlb2YgY29sdW1uID09PSAnc3RyaW5nJyA/IHRoaXMuZmluZENvbHVtbihjb2x1bW4pIDogY29sdW1uO1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmFsbENvbHVtbnMuaW5kZXhPZihjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gd2l0aCB0aGUgcHJvdmlkZWQgd2lkdGguXG4gICAqXG4gICAqIFRoZSB3aWR0aCBpcyBzZXQgaW4gcHggb3IgJSBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDogIyMlIG9yICMjcHhcbiAgICogRXhhbXBsZXM6ICc1MCUnLCAnNTBweCdcbiAgICpcbiAgICogUmVzaXppbmcgdGhlIGNvbHVtbiB3aWxsIHRyaWdnZXIgYSB0YWJsZSB3aWR0aCByZXNpemluZyBldmVudCwgdXBkYXRpbmcgY29sdW1uIGdyb3VwIGlmIG5lY2Vzc2FyeS5cbiAgICovXG4gIHJlc2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgd2lkdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbHVtbi51cGRhdGVXaWR0aCh0cnVlLCB3aWR0aClcbiAgICB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy50YWJsZS5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzaXplIHRoZSBjb2x1bW4gdG8gYmVzdCBmaXQgaXQncyBjb250ZW50LlxuICAgKlxuICAgKiAtIENvbnRlbnQ6IEFsbCBvZiB0aGUgY2VsbHMgcmVuZGVyZWQgZm9yIHRoaXMgY29sdW1uIChoZWFkZXIsIGRhdGEgYW5kIGZvb3RlciBjZWxscykuXG4gICAqIC0gQmVzdCBmaXQ6IFRoZSB3aWR0aCBvZiB0aGUgY2VsbCB3aXRoIHRoZSBoZWlnaHQgd2lkdGggbWVhc3VyZWQuXG4gICAqXG4gICAqIFRoZSBiZXN0IGZpdCBmb3VuZCAod2lkdGgpIGlzIHRoZW4gdXNlZCB0byBjYWxsIGByZXNpemVDb2x1bW4oKWAuXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLmZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW4pO1xuICAgIHRoaXMucmVzaXplQ29sdW1uKGNvbHVtbiwgYCR7c2l6ZX1weGApO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHZpc2libGUgY29sdW1uIGluIHRoZSB0YWJsZSwgcmVzaXplIHRvIGJlc3QgZml0IGl0J3MgY29udGVudC5cbiAgICpcbiAgICogVGhpcyBtZXRob2Qgd2lsbCBzaW1wbHkgcnVuIGBhdXRvU2l6ZUNvbHVtbigpYCBvbiB0aGUgdmlzaWJsZSBjb2x1bW5zIGluIHRoZSB0YWJsZS5cbiAgICovXG4gIGF1dG9TaXplQ29sdW1ucygpOiB2b2lkO1xuICAvKipcbiAgICogRm9yIGVhY2ggY29sdW1uIGluIHRoZSBsaXN0IG9mIGNvbHVtbiBwcm92aWRlZCwgcmVzaXplIHRvIGJlc3QgZml0IGl0J3MgY29udGVudC5cbiAgICpcbiAgICogTWFrZSBzdXJlIHlvdSBhcmUgbm90IHJlc2l6aW5nIGFuIGhpZGRlbiBjb2x1bW4uXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgc2ltcGx5IHJ1biBgYXV0b1NpemVDb2x1bW4oKWAgb24gdGhlIGNvbHVtbnMgcHJvdmlkZWQuXG4gICAqL1xuICBhdXRvU2l6ZUNvbHVtbnMoLi4uY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICBhdXRvU2l6ZUNvbHVtbnMoLi4uY29sdW1uczogUGJsQ29sdW1uW10pOiB2b2lkIHtcbiAgICBjb25zdCBjb2xzID0gY29sdW1ucy5sZW5ndGggPiAwID8gY29sdW1ucyA6IHRoaXMudmlzaWJsZUNvbHVtbnM7XG4gICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29scykge1xuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMuZmluZENvbHVtbkF1dG9TaXplKGNvbHVtbik7XG4gICAgICBjb2x1bW4udXBkYXRlV2lkdGgodHJ1ZSwgYCR7c2l6ZX1weGApXG4gICAgfVxuICAgIHRoaXMudGFibGUucmVzZXRDb2x1bW5zV2lkdGgoKTtcbiAgICB0aGlzLnRhYmxlLnJlc2l6ZUNvbHVtbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCB2aXNpYmxlIGNvbHVtbiBpbiB0aGUgdGFibGUsIHJlc2l6ZSB0aGUgd2lkdGggdG8gYSBwcm9wb3J0aW9uYWwgd2lkdGggcmVsYXRpdmUgdG8gdGhlIHRvdGFsIHdpZHRoIHByb3ZpZGVkLlxuICAgKi9cbiAgYXV0b1NpemVUb0ZpdCh0b3RhbFdpZHRoOiBudW1iZXIsIG9wdGlvbnM6IEF1dG9TaXplVG9GaXRPcHRpb25zID0ge30pOiB2b2lkIHtcbiAgICBjb25zdCB3TG9naWMgPSB0aGlzLmV4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCk7XG4gICAgY29uc3QgeyB2aXNpYmxlQ29sdW1ucyB9ID0gdGhpcztcbiAgICBjb25zdCBjb2x1bW5CZWhhdmlvcjogQXV0b1NpemVUb0ZpdE9wdGlvbnNbJ2NvbHVtbkJlaGF2aW9yJ10gPSBvcHRpb25zLmNvbHVtbkJlaGF2aW9yIHx8ICggKCkgPT4gb3B0aW9ucyApIGFzIGFueTtcblxuICAgIGxldCBvdmVyZmxvd1RvdGFsV2lkdGggPSAwO1xuICAgIGxldCB0b3RhbE1pbldpZHRoID0gMDtcblxuICAgIGNvbnN0IHdpdGhNaW5XaWR0aDogbnVtYmVyW10gPSBbXTtcblxuICAgIGNvbnN0IHdpZHRoQnJlYWtvdXRzID0gdmlzaWJsZUNvbHVtbnMubWFwKCAoY29sdW1uLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgd2lkdGhCcmVha291dCA9IHdMb2dpYy53aWR0aEJyZWFrb3V0KGNvbHVtbi5zaXplSW5mbyk7XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSBjb2x1bW5CZWhhdmlvcihjb2x1bW4pIHx8IG9wdGlvbnM7XG5cbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSB3aWR0aEJyZWFrb3V0LmNvbnRlbnQ7XG4gICAgICB0b3RhbFdpZHRoIC09IHdpZHRoQnJlYWtvdXQubm9uQ29udGVudDtcblxuICAgICAgaWYgKGluc3RydWN0aW9ucy5rZWVwTWluV2lkdGggJiYgY29sdW1uLm1pbldpZHRoKSB7XG4gICAgICAgIHRvdGFsTWluV2lkdGggKz0gY29sdW1uLm1pbldpZHRoO1xuICAgICAgICB3aXRoTWluV2lkdGgucHVzaChpbmRleCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IC4uLndpZHRoQnJlYWtvdXQsIGluc3RydWN0aW9ucyB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcCA9IHRvdGFsTWluV2lkdGggLyB0b3RhbFdpZHRoO1xuICAgIGNvbnN0IGxldmVsID0gKG92ZXJmbG93VG90YWxXaWR0aCAqIHAgIC0gdG90YWxNaW5XaWR0aCkgLyAoMSAtIHApO1xuICAgIGZvciAoY29uc3QgaSBvZiB3aXRoTWluV2lkdGgpIHtcbiAgICAgIGNvbnN0IGFkZGl0aW9uID0gbGV2ZWwgKiAodmlzaWJsZUNvbHVtbnNbaV0ubWluV2lkdGggLyB0b3RhbE1pbldpZHRoKVxuICAgICAgd2lkdGhCcmVha291dHNbaV0uY29udGVudCArPSBhZGRpdGlvbjtcbiAgICAgIG92ZXJmbG93VG90YWxXaWR0aCArPSBhZGRpdGlvbjtcbiAgICB9XG5cbiAgICBsZXQgc3VtID1bXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZpc2libGVDb2x1bW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB3aWR0aEJyZWFrb3V0ID0gd2lkdGhCcmVha291dHNbaV07XG4gICAgICBjb25zdCBpbnN0cnVjdGlvbnMgPSB3aWR0aEJyZWFrb3V0Lmluc3RydWN0aW9ucztcbiAgICAgIGNvbnN0IGNvbHVtbiA9IHZpc2libGVDb2x1bW5zW2ldO1xuXG4gICAgICBjb25zdCByID0gd2lkdGhCcmVha291dC5jb250ZW50IC8gb3ZlcmZsb3dUb3RhbFdpZHRoO1xuXG4gICAgICBpZiAoIWluc3RydWN0aW9ucy5rZWVwTWluV2lkdGgpIHtcbiAgICAgICAgY29sdW1uLm1pbldpZHRoID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKCFpbnN0cnVjdGlvbnMua2VlcE1heFdpZHRoKSB7XG4gICAgICAgICBjb2x1bW4ubWF4V2lkdGggPSB1bmRlZmluZWQ7XG4gICAgICAgICBjb2x1bW4uY2hlY2tNYXhXaWR0aExvY2soY29sdW1uLnNpemVJbmZvLndpZHRoKTsgLy8gaWYgaXRzIGxvY2tlZCwgd2UgbmVlZCB0byByZWxlYXNlLi4uXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZXJlIGFyZSAzIHNjZW5hcmlvcyB3aGVuIHVwZGF0aW5nIHRoZSBjb2x1bW5cbiAgICAgIC8vIDEpIGlmIGl0J3MgYSBmaXhlZCB3aWR0aCBvciB3ZSdyZSBmb3JjZSBpbnRvIGZpeGVkIHdpZHRoXG4gICAgICAvLyAyKSBOb3QgZml4ZWQgd2lkdGggYW5kIHdpZHRoIGlzIHNldCAoJSlcbiAgICAgIC8vIDMpIE5vdCBmaXhlZCB3aWR0aCBhbiB3aWR0aCBpcyBub3Qgc2V0ICggdGhlIHdpZHRoIGRlcGVuZHMgb24gdGhlIGNhbGN1bGF0ZWQgYGRlZmF1bHRXaWR0aGAgZG9uZSBpbiBgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpYCApXG4gICAgICBsZXQgd2lkdGg6IHN0cmluZztcbiAgICAgIGNvbnN0IHsgZm9yY2VXaWR0aFR5cGUgfSA9IGluc3RydWN0aW9ucztcbiAgICAgIGlmIChmb3JjZVdpZHRoVHlwZSA9PT0gJ3B4JyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi5pc0ZpeGVkV2lkdGgpKSB7IC8vICgxKVxuICAgICAgICB3aWR0aCA9IGAke3RvdGFsV2lkdGggKiByfXB4YDtcbiAgICAgIH0gZWxzZSBpZiAoZm9yY2VXaWR0aFR5cGUgPT09ICclJyB8fCAoIWZvcmNlV2lkdGhUeXBlICYmIGNvbHVtbi53aWR0aCkpIHsgLy8gKDIpXG4gICAgICAgIHdpZHRoID0gYCR7MTAwICogcn0lYDtcbiAgICAgIH0gLy8gZWxzZSAoMykgLT4gdGhlIHVwZGF0ZSBpcyBza2lwcGVkIGFuZCBpdCB3aWxsIHJ1biB0aHJvdWdoIHJlc2V0Q29sdW1uc1dpZHRoXG5cbiAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICAvLyBXZSdyZSBub3QgdXBkYXRpbmcgdGhlIHdpZHRoIHdpZHRoIG1hcmtGb3JDaGVjayBzZXQgdG8gdHJ1ZSBiZWNhdXNlIGl0IHdpbGwgYmUgZG9uZSByaWdodCBhZnRlciBpbiBgdGhpcy50YWJsZS5yZXNldENvbHVtbnNXaWR0aCgpYFxuICAgICAgICBjb2x1bW4udXBkYXRlV2lkdGgoZmFsc2UsIHdpZHRoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgICAvLyB3ZSBub3cgcmVzZXQgdGhlIGNvbHVtbiB3aWR0aHMsIHRoaXMgd2lsbCBjYWxjdWxhdGUgYSBuZXcgYGRlZmF1bHRXaWR0aGAgYW5kIHNldCBpdCBpbiBhbGwgY29sdW1ucyBidXQgdGhlIHJlbGV2YW50IG9uZXMgYXJlIGNvbHVtbiBmcm9tICgzKVxuICAgIC8vIEl0IHdpbGwgYWxzbyBtYXJrIGFsbCBjb2x1bW5EZWYncyBmb3IgY2hlY2tcbiAgICB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKHsgdGFibGVNYXJrRm9yQ2hlY2s6IHRydWUgfSk7XG4gICAgdGhpcy50YWJsZS5yZXNpemVDb2x1bW5zKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZSB0aGUgcHJvdmlkZWQgYGNvbHVtbmAgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgYW5jaG9yYCBjb2x1bW4uXG4gICAqIFRoZSBuZXcgbG9jYXRpb24gb2YgdGhlIGFuY2hvciBjb2x1bW4gd2lsbCBiZSBpdCdzIG9yaWdpbmFsIGxvY2F0aW9uIHBsdXMgb3IgbWludXMgMSwgZGVwZW5kaW5nIG9uIHRoZSBkZWx0YSBiZXR3ZWVuXG4gICAqIHRoZSBjb2x1bW5zLiBJZiB0aGUgb3JpZ2luIG9mIHRoZSBgY29sdW1uYCBpcyBiZWZvcmUgdGhlIGBhbmNob3JgIHRoZW4gdGhlIGFuY2hvcidzIG5ldyBwb3NpdGlvbiBpcyBtaW51cyBvbmUsIG90aGVyd2lzZSBwbHVzIDEuXG4gICAqL1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuO1xuICAgIC8qKlxuICAgKiBNb3ZlIHRoZSBwcm92aWRlZCBgY29sdW1uYCB0byB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBhdCBgcmVuZGVyQ29sdW1uSW5kZXhgLlxuICAgKiBgcmVuZGVyQ29sdW1uSW5kZXhgIG11c3QgYmUgYSB2aXNpYmxlIGNvbHVtbiAoaS5lLiBub3QgaGlkZGVuKVxuICAgKi9cbiAgbW92ZUNvbHVtbihjb2x1bW46IFBibENvbHVtbiwgcmVuZGVyQ29sdW1uSW5kZXg6IG51bWJlciwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuOyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICBtb3ZlQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uLCBhbmNob3I6IFBibENvbHVtbiB8IG51bWJlciwgc2tpcFJlZHJhdz86IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoYW5jaG9yIGluc3RhbmNlb2YgUGJsQ29sdW1uKSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBjb2x1bW4gPT09IGFuY2hvciA/IGZhbHNlIDogdGhpcy5zdG9yZS5tb3ZlQ29sdW1uKGNvbHVtbiwgYW5jaG9yKTtcbiAgICAgIGlmIChyZXN1bHQgJiYgc2tpcFJlZHJhdyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGEgPSB0aGlzLmZpbmRDb2x1bW5BdChhbmNob3IpO1xuICAgICAgcmV0dXJuIGEgPyB0aGlzLm1vdmVDb2x1bW4oY29sdW1uLCBhKSA6IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHBvc2l0aW9ucyBiZXR3ZWVuIDIgZXhpc3RpbmcgY29sdW1ucy5cbiAgICovXG4gIHN3YXBDb2x1bW5zKGNvbDE6IFBibENvbHVtbiwgY29sMjogUGJsQ29sdW1uLCBza2lwUmVkcmF3PzogYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuc3RvcmUuc3dhcENvbHVtbnMoY29sMSwgY29sMik7XG4gICAgaWYgKHJlc3VsdCAmJiBza2lwUmVkcmF3ICE9PSB0cnVlKSB7XG4gICAgICB0aGlzLmFmdGVyQ29sdW1uUG9zaXRpb25DaGFuZ2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGFkZEdyb3VwQnkoLi4uY29sdW1uOiBQYmxDb2x1bW5bXSk6IHZvaWQgeyB0aGlzLnN0b3JlLmFkZEdyb3VwQnkoLi4uY29sdW1uKTsgfVxuICByZW1vdmVHcm91cEJ5KC4uLmNvbHVtbjogUGJsQ29sdW1uW10pOiB2b2lkIHsgdGhpcy5zdG9yZS5yZW1vdmVHcm91cEJ5KC4uLmNvbHVtbik7IH1cblxuICBwcml2YXRlIGZpbmRDb2x1bW5BdXRvU2l6ZShjb2x1bW46IFBibENvbHVtbik6IG51bWJlciB7XG4gICAgY29uc3QgeyBjb2x1bW5EZWYgfSA9IGNvbHVtbjtcbiAgICBjb25zdCBjZWxscyA9IGNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cygpO1xuICAgIGxldCBzaXplID0gMDtcbiAgICBmb3IgKGNvbnN0IGMgb2YgY2VsbHMpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSAoYy5maXJzdEVsZW1lbnRDaGlsZCB8fCBjKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGlmIChlbGVtZW50LnNjcm9sbFdpZHRoID4gc2l6ZSkge1xuICAgICAgICBzaXplID0gZWxlbWVudC5zY3JvbGxXaWR0aCArIDE7XG4gICAgICAgIC8vIHdlIGFkZCAxIHBpeGVsIGJlY2F1c2UgYGVsZW1lbnQuc2Nyb2xsV2lkdGhgIGRvZXMgbm90IHN1cHBvcnQgc3VicGl4ZWwgdmFsdWVzLCB0aGUgd2lkdGggaXMgY29udmVydGVkIHRvIGFuIGludGVnZXIgcmVtb3Zpbmcgc3VicGl4ZWwgdmFsdWVzIChmcmFjdGlvbnMpLlxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgYWZ0ZXJDb2x1bW5Qb3NpdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLmNsZWFyKCk7XG4gICAgdGhpcy5zdG9yZS51cGRhdGVHcm91cHMoKTtcbiAgICB0aGlzLnRhYmxlLnJlc2V0Q29sdW1uc1dpZHRoKCk7XG4gICAgdGhpcy50YWJsZS5yZXNpemVDb2x1bW5zKCk7XG4gIH1cbn1cbiJdfQ==