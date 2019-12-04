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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbnRleHQvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBV3hDOzs7O0lBd0NFLHVCQUFtQixRQUFhLEVBQVMsU0FBaUIsRUFBVSxNQUErQjtRQUFoRixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXlCOzs7Ozs7Ozs7Ozs7Ozs7O1lBZTNGLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQjtRQUM3RCxJQUFJLGVBQWUsRUFBRTtZQUNuQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHOzs7Z0JBQUUsY0FBYSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7WUFFL0IsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtRQUNyQixJQUFBLHVDQUFPOztZQUNULEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTTtRQUUxQixLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFOztnQkFDcEQsV0FBVyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDaEYsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6QjtJQUNILENBQUM7SUF2Q0Qsc0JBQUksaUNBQU07UUFIVjs7V0FF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Q0FBb0I7Ozs7SUFBcEI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBN0hELElBNkhDOzs7Ozs7Ozs7O0lBM0hDLGtDQUFjOzs7OztJQUVkLDhCQUFlOzs7OztJQUVmLG9DQUFxQjs7Ozs7SUFFckIsOEJBQWU7Ozs7O0lBRWYsOEJBQWdCOzs7OztJQUVoQiw2QkFBZTs7Ozs7SUFFZiw2QkFBZTs7Ozs7SUFFZiw0QkFBYzs7SUFFZCxxQ0FBbUM7O0lBRW5DLG9DQUFxQjs7SUFDckIsa0NBQW1COzs7OztJQUduQiw4QkFBcUM7O0lBRXJDLDZCQUFvQzs7Ozs7SUFZcEMsOEJBQW1DOztJQUV2QixpQ0FBb0I7O0lBQUUsa0NBQXdCOzs7OztJQUFFLCtCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2VsbENvbnRleHRTdGF0ZSwgUm93Q29udGV4dFN0YXRlLCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibENlbGxDb250ZXh0IH0gZnJvbSAnLi9jZWxsJztcblxuZGVjbGFyZSBtb2R1bGUgJ0Bhbmd1bGFyL2Nkay90YWJsZS90eXBpbmdzL3Jvdy5kJyB7XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2RrQ2VsbE91dGxldFJvd0NvbnRleHQ8VD4ge1xuICAgIHBibFJvd0NvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENka0NlbGxPdXRsZXRNdWx0aVJvd0NvbnRleHQ8VD4ge1xuICAgIHBibFJvd0NvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsUm93Q29udGV4dDxUPiBpbXBsZW1lbnRzIFBibE5ncmlkUm93Q29udGV4dDxUPiB7XG4gIC8qKiBEYXRhIGZvciB0aGUgcm93IHRoYXQgdGhpcyBjZWxsIGlzIGxvY2F0ZWQgd2l0aGluLiAqL1xuICAkaW1wbGljaXQ/OiBUO1xuICAvKiogSW5kZXggb2YgdGhlIGRhdGEgb2JqZWN0IGluIHRoZSBwcm92aWRlZCBkYXRhIGFycmF5LiAqL1xuICBpbmRleD86IG51bWJlcjtcbiAgLyoqIEluZGV4IGxvY2F0aW9uIG9mIHRoZSByZW5kZXJlZCByb3cgdGhhdCB0aGlzIGNlbGwgaXMgbG9jYXRlZCB3aXRoaW4uICovXG4gIHJlbmRlckluZGV4PzogbnVtYmVyO1xuICAvKiogTGVuZ3RoIG9mIHRoZSBudW1iZXIgb2YgdG90YWwgcm93cy4gKi9cbiAgY291bnQ/OiBudW1iZXI7XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdy4gKi9cbiAgZmlyc3Q/OiBib29sZWFuO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIHRoZSBsYXN0IHJvdy4gKi9cbiAgbGFzdD86IGJvb2xlYW47XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gYSByb3cgd2l0aCBhbiBldmVuLW51bWJlcmVkIGluZGV4LiAqL1xuICBldmVuPzogYm9vbGVhbjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiBhIHJvdyB3aXRoIGFuIG9kZC1udW1iZXJlZCBpbmRleC4gKi9cbiAgb2RkPzogYm9vbGVhbjtcblxuICBncmlkSW5zdGFuY2U6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIGZpcnN0UmVuZGVyOiBib29sZWFuO1xuICBvdXRPZlZpZXc6IGJvb2xlYW47XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgY2VsbHMgY29udGV4dCBzdG9yZWQgaW4gdGhpcyByb3dcbiAgICovXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuY2VsbHMgJiYgdGhpcy5jZWxscy5sZW5ndGgpIHx8IDA7XG4gIH1cblxuICBnZXQgcGJsUm93Q29udGV4dCgpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4geyByZXR1cm4gdGhpczsgfVxuICBzZXQgcGJsUm93Q29udGV4dCh2YWx1ZTogUGJsTmdyaWRSb3dDb250ZXh0PFQ+KSB7IH1cblxuICBwcml2YXRlIGNlbGxzOiBQYmxDZWxsQ29udGV4dDxUPltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZGVudGl0eTogYW55LCBwdWJsaWMgZGF0YUluZGV4OiBudW1iZXIsIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPikge1xuICAgIC8qICBUT0RPOiBtYXRlcmlhbDIjMTQxOThcbiAgICAgICAgVGhlIHJvdyBjb250ZXh0IGNvbWUgZnJvbSB0aGUgYGNka2AgYW5kIGl0IGNhbiBiZSBvZiAyIHR5cGVzLCBkZXBlbmRpbmcgaWYgbXVsdGlwbGUgcm93IHRlbXBsYXRlcyBhcmUgdXNlZCBvciBub3QuXG4gICAgICAgIGBpbmRleGAgaXMgdXNlZCBmb3Igc2luZ2xlIHJvdyB0ZW1wbGF0ZSBtb2RlIGFuZCBgcmVuZGVySW5kZXhgIGZvciBtdWx0aSByb3cgdGVtcGxhdGUgbW9kZS5cblxuICAgICAgICBUaGVyZSBsaWJyYXJ5IGFuZC9vciBwbHVnaW5zIHJlcXVpcmUgYWNjZXNzIHRvIHRoZSByZW5kZXJlZCBpbmRleCBhbmQgaGF2aW5nIDIgbG9jYXRpb25zIGlzIGEgcHJvYmxlbS4uLlxuICAgICAgICBJdCdzIGEgYnVnIHRyYXAsIGFkZGluZyBtb3JlIGNvbXBsZXhpdHkgYW5kIHNvbWUgdGltZSBhY2Nlc3MgaXNzdWUgYmVjYXVzZSB0aGUgYENka1RhYmxlYCBpbnN0YW5jZSBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZS5cblxuICAgICAgICBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaGF2ZSBhIHNpbmdsZSBsb2NhdGlvbiBmb3IgdGhlIHJlbmRlcmVkIGluZGV4LlxuICAgICAgICBJIGNob3NlIHRvIGBpbmRleGAgYXMgdGhlIHNpbmdsZSBsb2NhdGlvbiBhbHRob3VnaCBgcmVuZGVySW5kZXhgIHdpbGwgcHJvYmFibHkgYmUgY2hvc2VuIGJ5IHRoZSBtYXRlcmlhbCB0ZWFtLlxuICAgICAgICBUaGlzIGlzIGJlY2F1c2UgaXQncyBsZXNzIGxpa2VseSB0byBvY2N1ciBhcyBtb3N0IHRhYmxlcyBkb2VzIG5vdCBoYXZlIG11bHRpIHJvdyB0ZW1wbGF0ZXMgKGRldGFpbCByb3cpXG4gICAgICAgIEEgcmVmYWN0b3Igd2lsbCBoYXZlIHRvIGJlIGRvbmUgaW4gdGhlIGZ1dHVyZS5cbiAgICAgICAgVGhlcmUgaXMgYSBwZW5kaW5nIGlzc3VlIHRvIGRvIHNvIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTQxOThcbiAgICAgICAgQWxzbyByZWxhdGVkOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE0MTk5XG4gICAgKi9cbiAgICBjb25zdCBhcHBseVdvcmthcm91bmQgPSBleHRBcGkuY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIGlmIChhcHBseVdvcmthcm91bmQpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaW5kZXgnLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLnJlbmRlckluZGV4OyB9IH0pO1xuICAgIH1cblxuICAgIHRoaXMuZ3JpZCA9IHRoaXMudGFibGUgPSBleHRBcGkuZ3JpZDtcblxuICAgIGNvbnN0IGNlbGxzID0gdGhpcy5jZWxscyA9IFtdO1xuICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gZXh0QXBpLmdyaWQuY29sdW1uQXBpO1xuICAgIGNvbnN0IGxlbiA9IGNvbHVtbnMubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IGxlbjsgY29sdW1uSW5kZXgrKykge1xuICAgICAgY29uc3QgY2VsbENvbnRleHQgPSBQYmxDZWxsQ29udGV4dC5jcmVhdGU8VD4odGhpcywgY29sdW1uc1tjb2x1bW5JbmRleF0sIGV4dEFwaSk7XG4gICAgICBjZWxscy5wdXNoKGNlbGxDb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFN0YXRlPFQgPSBhbnk+KGlkZW50aXR5OiBhbnksIGRhdGFJbmRleDogbnVtYmVyLCBjZWxsc0NvdW50OiBudW1iZXIpOiBSb3dDb250ZXh0U3RhdGU8VD4ge1xuICAgIGNvbnN0IGNlbGxzOiBDZWxsQ29udGV4dFN0YXRlPFQ+W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xuICAgICAgY2VsbHMucHVzaChQYmxDZWxsQ29udGV4dC5kZWZhdWx0U3RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB7IGlkZW50aXR5LCBkYXRhSW5kZXgsIGNlbGxzLCBmaXJzdFJlbmRlcjogdHJ1ZSB9O1xuICB9XG5cbiAgZ2V0U3RhdGUoKTogUm93Q29udGV4dFN0YXRlPFQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWRlbnRpdHk6IHRoaXMuaWRlbnRpdHksXG4gICAgICBkYXRhSW5kZXg6IHRoaXMuZGF0YUluZGV4LFxuICAgICAgZmlyc3RSZW5kZXI6IHRoaXMuZmlyc3RSZW5kZXIsXG4gICAgICBjZWxsczogdGhpcy5jZWxscy5tYXAoIGMgPT4gYy5nZXRTdGF0ZSgpICksXG4gICAgfTtcbiAgfVxuXG4gIGZyb21TdGF0ZShzdGF0ZTogUm93Q29udGV4dFN0YXRlPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5pZGVudGl0eSA9IHN0YXRlLmlkZW50aXR5O1xuICAgIHRoaXMuZmlyc3RSZW5kZXIgPSBzdGF0ZS5maXJzdFJlbmRlcjtcbiAgICB0aGlzLmRhdGFJbmRleCA9IHN0YXRlLmRhdGFJbmRleDtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5jZWxsc1tpXS5mcm9tU3RhdGUoc3RhdGUuY2VsbHNbaV0sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNvbnRleHQoY29udGV4dDogUm93Q29udGV4dDxUPik6IHZvaWQge1xuICAgIGNvbnRleHQuZGF0YUluZGV4ID0gdGhpcy5kYXRhSW5kZXg7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjZWxsIGNvbnRleHQgZm9yIHRoZSBjb2x1bW4gYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICogPiBUaGUgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gQUxMIGNvbHVtbnMgKE5PVCBSRU5ERVJFRCBDT0xVTU5TKVxuICAgKi9cbiAgY2VsbChpbmRleDogbnVtYmVyIHwgUGJsQ29sdW1uKTogUGJsQ2VsbENvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGlkeCA9IHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicgPyBpbmRleCA6IHRoaXMuZ3JpZC5jb2x1bW5BcGkuaW5kZXhPZihpbmRleCk7XG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbaWR4XTtcbiAgfVxuXG4gIGdldENlbGxzKCk6IFBibENlbGxDb250ZXh0PFQ+W10ge1xuICAgIHJldHVybiAodGhpcy5jZWxscyAmJiB0aGlzLmNlbGxzLnNsaWNlKCkpIHx8IFtdO1xuICB9XG5cbiAgdXBkYXRlQ2VsbChjZWxsOiBQYmxDZWxsQ29udGV4dDxUPik6IHZvaWQge1xuICAgIHRoaXMuY2VsbHNbY2VsbC5pbmRleF0gPSBjZWxsLmNsb25lKCk7XG4gIH1cbiAgICAvKipcbiAgICogVXBkYXRlcyB0aGUgYG91dE9mVmlld2AgcHJvcGVydHkuXG4gICAqL1xuICB1cGRhdGVPdXRPZlZpZXdTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLnVwZGF0ZU91dE9mVmlld1N0YXRlKHRoaXMpO1xuICB9XG59XG4iXX0=