/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PblCellContext } from './cell';
/**
 * @template T
 */
var /**
 * @template T
 */
PblRowContext = /** @class */ (function () {
    function PblRowContext(identity, dataIndex, extApi) {
        this.identity = identity;
        this.dataIndex = dataIndex;
        this.extApi = extApi;
        /*  TODO: material2#14198
                The row context come from the `cdk` and it can be of 2 types, depending if multiple row templates are used or not.
                `index` is used for single row template mode and `renderIndex` for multi row template mode.
        
                There library and/or plugins require access to the rendered index and having 2 locations is a problem...
                It's a bug trap, adding more complexity and some time access issue because the `CdkTable` instance is not always available.
        
                This is a workaround for have a single location for the rendered index.
                I chose to `index` as the single location although `renderIndex` will probably be chosen by the material team.
                This is because it's less likely to occur as most tables does not have multi row templates (detail row)
                A refactor will have to be done in the future.
                There is a pending issue to do so in https://github.com/angular/material2/issues/14198
                Also related: https://github.com/angular/material2/issues/14199
            */
        /** @type {?} */
        var applyWorkaround = extApi.cdkTable.multiTemplateDataRows;
        if (applyWorkaround) {
            Object.defineProperty(this, 'index', { get: (/**
                 * @return {?}
                 */
                function () { return this.renderIndex; }) });
        }
        this.table = extApi.table;
        /** @type {?} */
        var cells = this.cells = [];
        var columns = extApi.table.columnApi.columns;
        /** @type {?} */
        var len = columns.length;
        for (var columnIndex = 0; columnIndex < len; columnIndex++) {
            /** @type {?} */
            var cellContext = PblCellContext.create(this, columns[columnIndex], extApi);
            cells.push(cellContext);
        }
    }
    Object.defineProperty(PblRowContext.prototype, "length", {
        /**
         * Returns the length of cells context stored in this row
         */
        get: /**
         * Returns the length of cells context stored in this row
         * @return {?}
         */
        function () {
            return (this.cells && this.cells.length) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblRowContext.prototype, "pblRowContext", {
        get: /**
         * @return {?}
         */
        function () { return this; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} identity
     * @param {?} dataIndex
     * @param {?} cellsCount
     * @return {?}
     */
    PblRowContext.defaultState = /**
     * @template T
     * @param {?} identity
     * @param {?} dataIndex
     * @param {?} cellsCount
     * @return {?}
     */
    function (identity, dataIndex, cellsCount) {
        /** @type {?} */
        var cells = [];
        for (var i = 0; i < cellsCount; i++) {
            cells.push(PblCellContext.defaultState());
        }
        return { identity: identity, dataIndex: dataIndex, cells: cells, firstRender: true };
    };
    /**
     * @return {?}
     */
    PblRowContext.prototype.getState = /**
     * @return {?}
     */
    function () {
        return {
            identity: this.identity,
            dataIndex: this.dataIndex,
            firstRender: this.firstRender,
            cells: this.cells.map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.getState(); })),
        };
    };
    /**
     * @param {?} state
     * @return {?}
     */
    PblRowContext.prototype.fromState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.identity = state.identity;
        this.firstRender = state.firstRender;
        this.dataIndex = state.dataIndex;
        for (var i = 0, len = this.cells.length; i < len; i++) {
            this.cells[i].fromState(state.cells[i], this);
        }
    };
    /**
     * @param {?} context
     * @return {?}
     */
    PblRowContext.prototype.updateContext = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        context.dataIndex = this.dataIndex;
        Object.assign(this, context);
    };
    /**
     * Returns the cell context for the column at the specified position.
     * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
     */
    /**
     * Returns the cell context for the column at the specified position.
     * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
     * @param {?} index
     * @return {?}
     */
    PblRowContext.prototype.cell = /**
     * Returns the cell context for the column at the specified position.
     * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var idx = typeof index === 'number' ? index : this.table.columnApi.indexOf(index);
        return this.cells[idx];
    };
    /**
     * @return {?}
     */
    PblRowContext.prototype.getCells = /**
     * @return {?}
     */
    function () {
        return (this.cells && this.cells.slice()) || [];
    };
    /**
     * @param {?} cell
     * @return {?}
     */
    PblRowContext.prototype.updateCell = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        this.cells[cell.index] = cell.clone();
    };
    /**
   * Updates the `outOfView` property.
   */
    /**
     * Updates the `outOfView` property.
     * @return {?}
     */
    PblRowContext.prototype.updateOutOfViewState = /**
     * Updates the `outOfView` property.
     * @return {?}
     */
    function () {
        this.extApi.contextApi.updateOutOfViewState(this);
    };
    return PblRowContext;
}());
/**
 * @template T
 */
export { PblRowContext };
if (false) {
    /**
     * Data for the row that this cell is located within.
     * @type {?}
     */
    PblRowContext.prototype.$implicit;
    /**
     * Index of the data object in the provided data array.
     * @type {?}
     */
    PblRowContext.prototype.index;
    /**
     * Index location of the rendered row that this cell is located within.
     * @type {?}
     */
    PblRowContext.prototype.renderIndex;
    /**
     * Length of the number of total rows.
     * @type {?}
     */
    PblRowContext.prototype.count;
    /**
     * True if this cell is contained in the first row.
     * @type {?}
     */
    PblRowContext.prototype.first;
    /**
     * True if this cell is contained in the last row.
     * @type {?}
     */
    PblRowContext.prototype.last;
    /**
     * True if this cell is contained in a row with an even-numbered index.
     * @type {?}
     */
    PblRowContext.prototype.even;
    /**
     * True if this cell is contained in a row with an odd-numbered index.
     * @type {?}
     */
    PblRowContext.prototype.odd;
    /** @type {?} */
    PblRowContext.prototype.gridInstance;
    /** @type {?} */
    PblRowContext.prototype.firstRender;
    /** @type {?} */
    PblRowContext.prototype.outOfView;
    /** @type {?} */
    PblRowContext.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblRowContext.prototype.cells;
    /** @type {?} */
    PblRowContext.prototype.identity;
    /** @type {?} */
    PblRowContext.prototype.dataIndex;
    /**
     * @type {?}
     * @private
     */
    PblRowContext.prototype.extApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb250ZXh0L3Jvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQVd4Qzs7OztJQW9DRSx1QkFBbUIsUUFBYSxFQUFTLFNBQWlCLEVBQVUsTUFBK0I7UUFBaEYsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5Qjs7Ozs7Ozs7Ozs7Ozs7OztZQWUzRixlQUFlLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUI7UUFDN0QsSUFBSSxlQUFlLEVBQUU7WUFDbkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRzs7O2dCQUFFLGNBQWEsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQ3hGO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDOztZQUVwQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQ3JCLElBQUEsd0NBQU87O1lBQ1QsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNO1FBRTFCLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUU7O2dCQUNwRCxXQUFXLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBSSxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNoRixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQXZDRCxzQkFBSSxpQ0FBTTtRQUhWOztXQUVHOzs7OztRQUNIO1lBQ0UsT0FB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LElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF6SEQsSUF5SEM7Ozs7Ozs7Ozs7SUF2SEMsa0NBQWM7Ozs7O0lBRWQsOEJBQWU7Ozs7O0lBRWYsb0NBQXFCOzs7OztJQUVyQiw4QkFBZTs7Ozs7SUFFZiw4QkFBZ0I7Ozs7O0lBRWhCLDZCQUFlOzs7OztJQUVmLDZCQUFlOzs7OztJQUVmLDRCQUFjOztJQUVkLHFDQUFtQzs7SUFFbkMsb0NBQXFCOztJQUNyQixrQ0FBbUI7O0lBQ25CLDhCQUFxQzs7Ozs7SUFZckMsOEJBQW1DOztJQUV2QixpQ0FBb0I7O0lBQUUsa0NBQXdCOzs7OztJQUFFLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb250ZXh0U3RhdGUsIFJvd0NvbnRleHRTdGF0ZSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAYW5ndWxhci9jZGsvdGFibGUvdHlwaW5ncy9yb3cuZCcge1xuICBleHBvcnQgaW50ZXJmYWNlIENka0NlbGxPdXRsZXRSb3dDb250ZXh0PFQ+IHtcbiAgICBwYmxSb3dDb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDZGtDZWxsT3V0bGV0TXVsdGlSb3dDb250ZXh0PFQ+IHtcbiAgICBwYmxSb3dDb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD47XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibFJvd0NvbnRleHQ8VD4gaW1wbGVtZW50cyBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4ge1xuICAvKiogRGF0YSBmb3IgdGhlIHJvdyB0aGF0IHRoaXMgY2VsbCBpcyBsb2NhdGVkIHdpdGhpbi4gKi9cbiAgJGltcGxpY2l0PzogVDtcbiAgLyoqIEluZGV4IG9mIHRoZSBkYXRhIG9iamVjdCBpbiB0aGUgcHJvdmlkZWQgZGF0YSBhcnJheS4gKi9cbiAgaW5kZXg/OiBudW1iZXI7XG4gIC8qKiBJbmRleCBsb2NhdGlvbiBvZiB0aGUgcmVuZGVyZWQgcm93IHRoYXQgdGhpcyBjZWxsIGlzIGxvY2F0ZWQgd2l0aGluLiAqL1xuICByZW5kZXJJbmRleD86IG51bWJlcjtcbiAgLyoqIExlbmd0aCBvZiB0aGUgbnVtYmVyIG9mIHRvdGFsIHJvd3MuICovXG4gIGNvdW50PzogbnVtYmVyO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIHRoZSBmaXJzdCByb3cuICovXG4gIGZpcnN0PzogYm9vbGVhbjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiB0aGUgbGFzdCByb3cuICovXG4gIGxhc3Q/OiBib29sZWFuO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIGEgcm93IHdpdGggYW4gZXZlbi1udW1iZXJlZCBpbmRleC4gKi9cbiAgZXZlbj86IGJvb2xlYW47XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gYSByb3cgd2l0aCBhbiBvZGQtbnVtYmVyZWQgaW5kZXguICovXG4gIG9kZD86IGJvb2xlYW47XG5cbiAgZ3JpZEluc3RhbmNlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICBmaXJzdFJlbmRlcjogYm9vbGVhbjtcbiAgb3V0T2ZWaWV3OiBib29sZWFuO1xuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiBjZWxscyBjb250ZXh0IHN0b3JlZCBpbiB0aGlzIHJvd1xuICAgKi9cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5jZWxscyAmJiB0aGlzLmNlbGxzLmxlbmd0aCkgfHwgMDtcbiAgfVxuXG4gIGdldCBwYmxSb3dDb250ZXh0KCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB7IHJldHVybiB0aGlzOyB9XG4gIHNldCBwYmxSb3dDb250ZXh0KHZhbHVlOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pIHsgfVxuXG4gIHByaXZhdGUgY2VsbHM6IFBibENlbGxDb250ZXh0PFQ+W107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGlkZW50aXR5OiBhbnksIHB1YmxpYyBkYXRhSW5kZXg6IG51bWJlciwgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgLyogIFRPRE86IG1hdGVyaWFsMiMxNDE5OFxuICAgICAgICBUaGUgcm93IGNvbnRleHQgY29tZSBmcm9tIHRoZSBgY2RrYCBhbmQgaXQgY2FuIGJlIG9mIDIgdHlwZXMsIGRlcGVuZGluZyBpZiBtdWx0aXBsZSByb3cgdGVtcGxhdGVzIGFyZSB1c2VkIG9yIG5vdC5cbiAgICAgICAgYGluZGV4YCBpcyB1c2VkIGZvciBzaW5nbGUgcm93IHRlbXBsYXRlIG1vZGUgYW5kIGByZW5kZXJJbmRleGAgZm9yIG11bHRpIHJvdyB0ZW1wbGF0ZSBtb2RlLlxuXG4gICAgICAgIFRoZXJlIGxpYnJhcnkgYW5kL29yIHBsdWdpbnMgcmVxdWlyZSBhY2Nlc3MgdG8gdGhlIHJlbmRlcmVkIGluZGV4IGFuZCBoYXZpbmcgMiBsb2NhdGlvbnMgaXMgYSBwcm9ibGVtLi4uXG4gICAgICAgIEl0J3MgYSBidWcgdHJhcCwgYWRkaW5nIG1vcmUgY29tcGxleGl0eSBhbmQgc29tZSB0aW1lIGFjY2VzcyBpc3N1ZSBiZWNhdXNlIHRoZSBgQ2RrVGFibGVgIGluc3RhbmNlIGlzIG5vdCBhbHdheXMgYXZhaWxhYmxlLlxuXG4gICAgICAgIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBoYXZlIGEgc2luZ2xlIGxvY2F0aW9uIGZvciB0aGUgcmVuZGVyZWQgaW5kZXguXG4gICAgICAgIEkgY2hvc2UgdG8gYGluZGV4YCBhcyB0aGUgc2luZ2xlIGxvY2F0aW9uIGFsdGhvdWdoIGByZW5kZXJJbmRleGAgd2lsbCBwcm9iYWJseSBiZSBjaG9zZW4gYnkgdGhlIG1hdGVyaWFsIHRlYW0uXG4gICAgICAgIFRoaXMgaXMgYmVjYXVzZSBpdCdzIGxlc3MgbGlrZWx5IHRvIG9jY3VyIGFzIG1vc3QgdGFibGVzIGRvZXMgbm90IGhhdmUgbXVsdGkgcm93IHRlbXBsYXRlcyAoZGV0YWlsIHJvdylcbiAgICAgICAgQSByZWZhY3RvciB3aWxsIGhhdmUgdG8gYmUgZG9uZSBpbiB0aGUgZnV0dXJlLlxuICAgICAgICBUaGVyZSBpcyBhIHBlbmRpbmcgaXNzdWUgdG8gZG8gc28gaW4gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNDE5OFxuICAgICAgICBBbHNvIHJlbGF0ZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTQxOTlcbiAgICAqL1xuICAgIGNvbnN0IGFwcGx5V29ya2Fyb3VuZCA9IGV4dEFwaS5jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gICAgaWYgKGFwcGx5V29ya2Fyb3VuZCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpbmRleCcsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMucmVuZGVySW5kZXg7IH0gfSk7XG4gICAgfVxuXG4gICAgdGhpcy50YWJsZSA9IGV4dEFwaS50YWJsZTtcblxuICAgIGNvbnN0IGNlbGxzID0gdGhpcy5jZWxscyA9IFtdO1xuICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gZXh0QXBpLnRhYmxlLmNvbHVtbkFwaTtcbiAgICBjb25zdCBsZW4gPSBjb2x1bW5zLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGNvbHVtbkluZGV4ID0gMDsgY29sdW1uSW5kZXggPCBsZW47IGNvbHVtbkluZGV4KyspIHtcbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gUGJsQ2VsbENvbnRleHQuY3JlYXRlPFQ+KHRoaXMsIGNvbHVtbnNbY29sdW1uSW5kZXhdLCBleHRBcGkpO1xuICAgICAgY2VsbHMucHVzaChjZWxsQ29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRTdGF0ZTxUID0gYW55PihpZGVudGl0eTogYW55LCBkYXRhSW5kZXg6IG51bWJlciwgY2VsbHNDb3VudDogbnVtYmVyKTogUm93Q29udGV4dFN0YXRlPFQ+IHtcbiAgICBjb25zdCBjZWxsczogQ2VsbENvbnRleHRTdGF0ZTxUPltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcbiAgICAgIGNlbGxzLnB1c2goUGJsQ2VsbENvbnRleHQuZGVmYXVsdFN0YXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4geyBpZGVudGl0eSwgZGF0YUluZGV4LCBjZWxscywgZmlyc3RSZW5kZXI6IHRydWUgfTtcbiAgfVxuXG4gIGdldFN0YXRlKCk6IFJvd0NvbnRleHRTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkZW50aXR5OiB0aGlzLmlkZW50aXR5LFxuICAgICAgZGF0YUluZGV4OiB0aGlzLmRhdGFJbmRleCxcbiAgICAgIGZpcnN0UmVuZGVyOiB0aGlzLmZpcnN0UmVuZGVyLFxuICAgICAgY2VsbHM6IHRoaXMuY2VsbHMubWFwKCBjID0+IGMuZ2V0U3RhdGUoKSApLFxuICAgIH07XG4gIH1cblxuICBmcm9tU3RhdGUoc3RhdGU6IFJvd0NvbnRleHRTdGF0ZTxUPik6IHZvaWQge1xuICAgIHRoaXMuaWRlbnRpdHkgPSBzdGF0ZS5pZGVudGl0eTtcbiAgICB0aGlzLmZpcnN0UmVuZGVyID0gc3RhdGUuZmlyc3RSZW5kZXI7XG4gICAgdGhpcy5kYXRhSW5kZXggPSBzdGF0ZS5kYXRhSW5kZXg7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMuY2VsbHNbaV0uZnJvbVN0YXRlKHN0YXRlLmNlbGxzW2ldLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVDb250ZXh0KGNvbnRleHQ6IFJvd0NvbnRleHQ8VD4pOiB2b2lkIHtcbiAgICBjb250ZXh0LmRhdGFJbmRleCA9IHRoaXMuZGF0YUluZGV4O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2VsbCBjb250ZXh0IGZvciB0aGUgY29sdW1uIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAqID4gVGhlIHBvc2l0aW9uIGlzIHJlbGF0aXZlIHRvIEFMTCBjb2x1bW5zIChOT1QgUkVOREVSRUQgQ09MVU1OUylcbiAgICovXG4gIGNlbGwoaW5kZXg6IG51bWJlciB8IFBibENvbHVtbik6IFBibENlbGxDb250ZXh0PFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBpZHggPSB0eXBlb2YgaW5kZXggPT09ICdudW1iZXInID8gaW5kZXggOiB0aGlzLnRhYmxlLmNvbHVtbkFwaS5pbmRleE9mKGluZGV4KTtcbiAgICByZXR1cm4gdGhpcy5jZWxsc1tpZHhdO1xuICB9XG5cbiAgZ2V0Q2VsbHMoKTogUGJsQ2VsbENvbnRleHQ8VD5bXSB7XG4gICAgcmV0dXJuICh0aGlzLmNlbGxzICYmIHRoaXMuY2VsbHMuc2xpY2UoKSkgfHwgW107XG4gIH1cblxuICB1cGRhdGVDZWxsKGNlbGw6IFBibENlbGxDb250ZXh0PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5jZWxsc1tjZWxsLmluZGV4XSA9IGNlbGwuY2xvbmUoKTtcbiAgfVxuICAgIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBgb3V0T2ZWaWV3YCBwcm9wZXJ0eS5cbiAgICovXG4gIHVwZGF0ZU91dE9mVmlld1N0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZXh0QXBpLmNvbnRleHRBcGkudXBkYXRlT3V0T2ZWaWV3U3RhdGUodGhpcyk7XG4gIH1cbn1cbiJdfQ==