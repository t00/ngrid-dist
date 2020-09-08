/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.grid = this.table = extApi.grid;
        /** @type {?} */
        var cells = this.cells = [];
        var columns = extApi.grid.columnApi.columns;
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
        var idx = typeof index === 'number' ? index : this.grid.columnApi.indexOf(index);
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
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblRowContext.prototype.table;
    /** @type {?} */
    PblRowContext.prototype.grid;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbnRleHQvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQVd4Qzs7OztJQXdDRSx1QkFBbUIsUUFBYSxFQUFTLFNBQWlCLEVBQVUsTUFBK0I7UUFBaEYsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUFTLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUF5Qjs7Ozs7Ozs7Ozs7Ozs7OztZQWUzRixlQUFlLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUI7UUFDN0QsSUFBSSxlQUFlLEVBQUU7WUFDbkIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRzs7O2dCQUFFLGNBQWEsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsQ0FBQyxDQUFDO1NBQ3hGO1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7O1lBRS9CLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDckIsSUFBQSx1Q0FBTzs7WUFDVCxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU07UUFFMUIsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRTs7Z0JBQ3BELFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFJLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDO1lBQ2hGLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDekI7SUFDSCxDQUFDO0lBdkNELHNCQUFJLGlDQUFNO1FBSFY7O1dB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NENBQW9COzs7O0lBQXBCO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTdIRCxJQTZIQzs7Ozs7Ozs7OztJQTNIQyxrQ0FBYzs7Ozs7SUFFZCw4QkFBZTs7Ozs7SUFFZixvQ0FBcUI7Ozs7O0lBRXJCLDhCQUFlOzs7OztJQUVmLDhCQUFnQjs7Ozs7SUFFaEIsNkJBQWU7Ozs7O0lBRWYsNkJBQWU7Ozs7O0lBRWYsNEJBQWM7O0lBRWQscUNBQW1DOztJQUVuQyxvQ0FBcUI7O0lBQ3JCLGtDQUFtQjs7Ozs7SUFHbkIsOEJBQXFDOztJQUVyQyw2QkFBb0M7Ozs7O0lBWXBDLDhCQUFtQzs7SUFFdkIsaUNBQW9COztJQUFFLGtDQUF3Qjs7Ozs7SUFBRSwrQkFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb250ZXh0U3RhdGUsIFJvd0NvbnRleHRTdGF0ZSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAYW5ndWxhci9jZGsvdGFibGUvcm93LmQnIHtcbiAgZXhwb3J0IGludGVyZmFjZSBDZGtDZWxsT3V0bGV0Um93Q29udGV4dDxUPiB7XG4gICAgcGJsUm93Q29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+O1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2RrQ2VsbE91dGxldE11bHRpUm93Q29udGV4dDxUPiB7XG4gICAgcGJsUm93Q29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxSb3dDb250ZXh0PFQ+IGltcGxlbWVudHMgUGJsTmdyaWRSb3dDb250ZXh0PFQ+IHtcbiAgLyoqIERhdGEgZm9yIHRoZSByb3cgdGhhdCB0aGlzIGNlbGwgaXMgbG9jYXRlZCB3aXRoaW4uICovXG4gICRpbXBsaWNpdD86IFQ7XG4gIC8qKiBJbmRleCBvZiB0aGUgZGF0YSBvYmplY3QgaW4gdGhlIHByb3ZpZGVkIGRhdGEgYXJyYXkuICovXG4gIGluZGV4PzogbnVtYmVyO1xuICAvKiogSW5kZXggbG9jYXRpb24gb2YgdGhlIHJlbmRlcmVkIHJvdyB0aGF0IHRoaXMgY2VsbCBpcyBsb2NhdGVkIHdpdGhpbi4gKi9cbiAgcmVuZGVySW5kZXg/OiBudW1iZXI7XG4gIC8qKiBMZW5ndGggb2YgdGhlIG51bWJlciBvZiB0b3RhbCByb3dzLiAqL1xuICBjb3VudD86IG51bWJlcjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgcm93LiAqL1xuICBmaXJzdD86IGJvb2xlYW47XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGxhc3Qgcm93LiAqL1xuICBsYXN0PzogYm9vbGVhbjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiBhIHJvdyB3aXRoIGFuIGV2ZW4tbnVtYmVyZWQgaW5kZXguICovXG4gIGV2ZW4/OiBib29sZWFuO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIGEgcm93IHdpdGggYW4gb2RkLW51bWJlcmVkIGluZGV4LiAqL1xuICBvZGQ/OiBib29sZWFuO1xuXG4gIGdyaWRJbnN0YW5jZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgZmlyc3RSZW5kZXI6IGJvb2xlYW47XG4gIG91dE9mVmlldzogYm9vbGVhbjtcblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiBjZWxscyBjb250ZXh0IHN0b3JlZCBpbiB0aGlzIHJvd1xuICAgKi9cbiAgZ2V0IGxlbmd0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5jZWxscyAmJiB0aGlzLmNlbGxzLmxlbmd0aCkgfHwgMDtcbiAgfVxuXG4gIGdldCBwYmxSb3dDb250ZXh0KCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB7IHJldHVybiB0aGlzOyB9XG4gIHNldCBwYmxSb3dDb250ZXh0KHZhbHVlOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4pIHsgfVxuXG4gIHByaXZhdGUgY2VsbHM6IFBibENlbGxDb250ZXh0PFQ+W107XG5cbiAgY29uc3RydWN0b3IocHVibGljIGlkZW50aXR5OiBhbnksIHB1YmxpYyBkYXRhSW5kZXg6IG51bWJlciwgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgLyogIFRPRE86IG1hdGVyaWFsMiMxNDE5OFxuICAgICAgICBUaGUgcm93IGNvbnRleHQgY29tZSBmcm9tIHRoZSBgY2RrYCBhbmQgaXQgY2FuIGJlIG9mIDIgdHlwZXMsIGRlcGVuZGluZyBpZiBtdWx0aXBsZSByb3cgdGVtcGxhdGVzIGFyZSB1c2VkIG9yIG5vdC5cbiAgICAgICAgYGluZGV4YCBpcyB1c2VkIGZvciBzaW5nbGUgcm93IHRlbXBsYXRlIG1vZGUgYW5kIGByZW5kZXJJbmRleGAgZm9yIG11bHRpIHJvdyB0ZW1wbGF0ZSBtb2RlLlxuXG4gICAgICAgIFRoZXJlIGxpYnJhcnkgYW5kL29yIHBsdWdpbnMgcmVxdWlyZSBhY2Nlc3MgdG8gdGhlIHJlbmRlcmVkIGluZGV4IGFuZCBoYXZpbmcgMiBsb2NhdGlvbnMgaXMgYSBwcm9ibGVtLi4uXG4gICAgICAgIEl0J3MgYSBidWcgdHJhcCwgYWRkaW5nIG1vcmUgY29tcGxleGl0eSBhbmQgc29tZSB0aW1lIGFjY2VzcyBpc3N1ZSBiZWNhdXNlIHRoZSBgQ2RrVGFibGVgIGluc3RhbmNlIGlzIG5vdCBhbHdheXMgYXZhaWxhYmxlLlxuXG4gICAgICAgIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciBoYXZlIGEgc2luZ2xlIGxvY2F0aW9uIGZvciB0aGUgcmVuZGVyZWQgaW5kZXguXG4gICAgICAgIEkgY2hvc2UgdG8gYGluZGV4YCBhcyB0aGUgc2luZ2xlIGxvY2F0aW9uIGFsdGhvdWdoIGByZW5kZXJJbmRleGAgd2lsbCBwcm9iYWJseSBiZSBjaG9zZW4gYnkgdGhlIG1hdGVyaWFsIHRlYW0uXG4gICAgICAgIFRoaXMgaXMgYmVjYXVzZSBpdCdzIGxlc3MgbGlrZWx5IHRvIG9jY3VyIGFzIG1vc3QgdGFibGVzIGRvZXMgbm90IGhhdmUgbXVsdGkgcm93IHRlbXBsYXRlcyAoZGV0YWlsIHJvdylcbiAgICAgICAgQSByZWZhY3RvciB3aWxsIGhhdmUgdG8gYmUgZG9uZSBpbiB0aGUgZnV0dXJlLlxuICAgICAgICBUaGVyZSBpcyBhIHBlbmRpbmcgaXNzdWUgdG8gZG8gc28gaW4gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNDE5OFxuICAgICAgICBBbHNvIHJlbGF0ZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTQxOTlcbiAgICAqL1xuICAgIGNvbnN0IGFwcGx5V29ya2Fyb3VuZCA9IGV4dEFwaS5jZGtUYWJsZS5tdWx0aVRlbXBsYXRlRGF0YVJvd3M7XG4gICAgaWYgKGFwcGx5V29ya2Fyb3VuZCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpbmRleCcsIHsgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMucmVuZGVySW5kZXg7IH0gfSk7XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkID0gdGhpcy50YWJsZSA9IGV4dEFwaS5ncmlkO1xuXG4gICAgY29uc3QgY2VsbHMgPSB0aGlzLmNlbGxzID0gW107XG4gICAgY29uc3QgeyBjb2x1bW5zIH0gPSBleHRBcGkuZ3JpZC5jb2x1bW5BcGk7XG4gICAgY29uc3QgbGVuID0gY29sdW1ucy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBjb2x1bW5JbmRleCA9IDA7IGNvbHVtbkluZGV4IDwgbGVuOyBjb2x1bW5JbmRleCsrKSB7XG4gICAgICBjb25zdCBjZWxsQ29udGV4dCA9IFBibENlbGxDb250ZXh0LmNyZWF0ZTxUPih0aGlzLCBjb2x1bW5zW2NvbHVtbkluZGV4XSwgZXh0QXBpKTtcbiAgICAgIGNlbGxzLnB1c2goY2VsbENvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0U3RhdGU8VCA9IGFueT4oaWRlbnRpdHk6IGFueSwgZGF0YUluZGV4OiBudW1iZXIsIGNlbGxzQ291bnQ6IG51bWJlcik6IFJvd0NvbnRleHRTdGF0ZTxUPiB7XG4gICAgY29uc3QgY2VsbHM6IENlbGxDb250ZXh0U3RhdGU8VD5bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XG4gICAgICBjZWxscy5wdXNoKFBibENlbGxDb250ZXh0LmRlZmF1bHRTdGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgaWRlbnRpdHksIGRhdGFJbmRleCwgY2VsbHMsIGZpcnN0UmVuZGVyOiB0cnVlIH07XG4gIH1cblxuICBnZXRTdGF0ZSgpOiBSb3dDb250ZXh0U3RhdGU8VD4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZGVudGl0eTogdGhpcy5pZGVudGl0eSxcbiAgICAgIGRhdGFJbmRleDogdGhpcy5kYXRhSW5kZXgsXG4gICAgICBmaXJzdFJlbmRlcjogdGhpcy5maXJzdFJlbmRlcixcbiAgICAgIGNlbGxzOiB0aGlzLmNlbGxzLm1hcCggYyA9PiBjLmdldFN0YXRlKCkgKSxcbiAgICB9O1xuICB9XG5cbiAgZnJvbVN0YXRlKHN0YXRlOiBSb3dDb250ZXh0U3RhdGU8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmlkZW50aXR5ID0gc3RhdGUuaWRlbnRpdHk7XG4gICAgdGhpcy5maXJzdFJlbmRlciA9IHN0YXRlLmZpcnN0UmVuZGVyO1xuICAgIHRoaXMuZGF0YUluZGV4ID0gc3RhdGUuZGF0YUluZGV4O1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmNlbGxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLmNlbGxzW2ldLmZyb21TdGF0ZShzdGF0ZS5jZWxsc1tpXSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ29udGV4dChjb250ZXh0OiBSb3dDb250ZXh0PFQ+KTogdm9pZCB7XG4gICAgY29udGV4dC5kYXRhSW5kZXggPSB0aGlzLmRhdGFJbmRleDtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNlbGwgY29udGV4dCBmb3IgdGhlIGNvbHVtbiBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICAgKiA+IFRoZSBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byBBTEwgY29sdW1ucyAoTk9UIFJFTkRFUkVEIENPTFVNTlMpXG4gICAqL1xuICBjZWxsKGluZGV4OiBudW1iZXIgfCBQYmxDb2x1bW4pOiBQYmxDZWxsQ29udGV4dDxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaWR4ID0gdHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJyA/IGluZGV4IDogdGhpcy5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGluZGV4KTtcbiAgICByZXR1cm4gdGhpcy5jZWxsc1tpZHhdO1xuICB9XG5cbiAgZ2V0Q2VsbHMoKTogUGJsQ2VsbENvbnRleHQ8VD5bXSB7XG4gICAgcmV0dXJuICh0aGlzLmNlbGxzICYmIHRoaXMuY2VsbHMuc2xpY2UoKSkgfHwgW107XG4gIH1cblxuICB1cGRhdGVDZWxsKGNlbGw6IFBibENlbGxDb250ZXh0PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5jZWxsc1tjZWxsLmluZGV4XSA9IGNlbGwuY2xvbmUoKTtcbiAgfVxuICAgIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBgb3V0T2ZWaWV3YCBwcm9wZXJ0eS5cbiAgICovXG4gIHVwZGF0ZU91dE9mVmlld1N0YXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZXh0QXBpLmNvbnRleHRBcGkudXBkYXRlT3V0T2ZWaWV3U3RhdGUodGhpcyk7XG4gIH1cbn1cbiJdfQ==