/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { PblCellContext } from './cell';
/**
 * @template T
 */
export class PblRowContext {
    /**
     * @param {?} identity
     * @param {?} dataIndex
     * @param {?} extApi
     */
    constructor(identity, dataIndex, extApi) {
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
        const applyWorkaround = extApi.cdkTable.multiTemplateDataRows;
        if (applyWorkaround) {
            Object.defineProperty(this, 'index', { get: (/**
                 * @return {?}
                 */
                function () { return this.renderIndex; }) });
        }
        this.table = extApi.table;
        /** @type {?} */
        const cells = this.cells = [];
        const { columns } = extApi.table.columnApi;
        /** @type {?} */
        const len = columns.length;
        for (let columnIndex = 0; columnIndex < len; columnIndex++) {
            /** @type {?} */
            const cellContext = PblCellContext.create(this, columns[columnIndex], extApi);
            cells.push(cellContext);
        }
    }
    /**
     * Returns the length of cells context stored in this row
     * @return {?}
     */
    get length() {
        return (this.cells && this.cells.length) || 0;
    }
    /**
     * @return {?}
     */
    get pblRowContext() { return this; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pblRowContext(value) { }
    /**
     * @template T
     * @param {?} identity
     * @param {?} dataIndex
     * @param {?} cellsCount
     * @return {?}
     */
    static defaultState(identity, dataIndex, cellsCount) {
        /** @type {?} */
        const cells = [];
        for (let i = 0; i < cellsCount; i++) {
            cells.push(PblCellContext.defaultState());
        }
        return { identity, dataIndex, cells, firstRender: true };
    }
    /**
     * @return {?}
     */
    getState() {
        return {
            identity: this.identity,
            dataIndex: this.dataIndex,
            firstRender: this.firstRender,
            cells: this.cells.map((/**
             * @param {?} c
             * @return {?}
             */
            c => c.getState())),
        };
    }
    /**
     * @param {?} state
     * @return {?}
     */
    fromState(state) {
        this.identity = state.identity;
        this.firstRender = state.firstRender;
        this.dataIndex = state.dataIndex;
        for (let i = 0, len = this.cells.length; i < len; i++) {
            this.cells[i].fromState(state.cells[i], this);
        }
    }
    /**
     * @param {?} context
     * @return {?}
     */
    updateContext(context) {
        context.dataIndex = this.dataIndex;
        Object.assign(this, context);
    }
    /**
     * Returns the cell context for the column at the specified position.
     * > The position is relative to ALL columns (NOT RENDERED COLUMNS)
     * @param {?} index
     * @return {?}
     */
    cell(index) {
        /** @type {?} */
        const idx = typeof index === 'number' ? index : this.table.columnApi.indexOf(index);
        return this.cells[idx];
    }
    /**
     * @return {?}
     */
    getCells() {
        return (this.cells && this.cells.slice()) || [];
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    updateCell(cell) {
        this.cells[cell.index] = cell.clone();
    }
    /**
     * Updates the `outOfView` property.
     * @return {?}
     */
    updateOutOfViewState() {
        this.extApi.contextApi.updateOutOfViewState(this);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb250ZXh0L3Jvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQVd4QyxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBb0N4QixZQUFtQixRQUFhLEVBQVMsU0FBaUIsRUFBVSxNQUErQjtRQUFoRixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXlCOzs7Ozs7Ozs7Ozs7Ozs7O2NBZTNGLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQjtRQUM3RCxJQUFJLGVBQWUsRUFBRTtZQUNuQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHOzs7Z0JBQUUsY0FBYSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7O2NBRXBCLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7Y0FDdkIsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVM7O2NBQ3BDLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTTtRQUUxQixLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFOztrQkFDcEQsV0FBVyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUksSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDaEYsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN6QjtJQUNI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OztJQUVkLDhCQUFlOzs7OztJQUVmLG9DQUFxQjs7Ozs7SUFFckIsOEJBQWU7Ozs7O0lBRWYsOEJBQWdCOzs7OztJQUVoQiw2QkFBZTs7Ozs7SUFFZiw2QkFBZTs7Ozs7SUFFZiw0QkFBYzs7SUFFZCxxQ0FBbUM7O0lBRW5DLG9DQUFxQjs7SUFDckIsa0NBQW1COztJQUNuQiw4QkFBcUM7Ozs7O0lBWXJDLDhCQUFtQzs7SUFFdkIsaUNBQW9COztJQUFFLGtDQUF3Qjs7Ozs7SUFBRSwrQkFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ29udGV4dFN0YXRlLCBSb3dDb250ZXh0U3RhdGUsIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuL2NlbGwnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQGFuZ3VsYXIvY2RrL3RhYmxlL3R5cGluZ3Mvcm93LmQnIHtcbiAgZXhwb3J0IGludGVyZmFjZSBDZGtDZWxsT3V0bGV0Um93Q29udGV4dDxUPiB7XG4gICAgcGJsUm93Q29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+O1xuICB9XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2RrQ2VsbE91dGxldE11bHRpUm93Q29udGV4dDxUPiB7XG4gICAgcGJsUm93Q29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxSb3dDb250ZXh0PFQ+IGltcGxlbWVudHMgUGJsTmdyaWRSb3dDb250ZXh0PFQ+IHtcbiAgLyoqIERhdGEgZm9yIHRoZSByb3cgdGhhdCB0aGlzIGNlbGwgaXMgbG9jYXRlZCB3aXRoaW4uICovXG4gICRpbXBsaWNpdD86IFQ7XG4gIC8qKiBJbmRleCBvZiB0aGUgZGF0YSBvYmplY3QgaW4gdGhlIHByb3ZpZGVkIGRhdGEgYXJyYXkuICovXG4gIGluZGV4PzogbnVtYmVyO1xuICAvKiogSW5kZXggbG9jYXRpb24gb2YgdGhlIHJlbmRlcmVkIHJvdyB0aGF0IHRoaXMgY2VsbCBpcyBsb2NhdGVkIHdpdGhpbi4gKi9cbiAgcmVuZGVySW5kZXg/OiBudW1iZXI7XG4gIC8qKiBMZW5ndGggb2YgdGhlIG51bWJlciBvZiB0b3RhbCByb3dzLiAqL1xuICBjb3VudD86IG51bWJlcjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiB0aGUgZmlyc3Qgcm93LiAqL1xuICBmaXJzdD86IGJvb2xlYW47XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGxhc3Qgcm93LiAqL1xuICBsYXN0PzogYm9vbGVhbjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiBhIHJvdyB3aXRoIGFuIGV2ZW4tbnVtYmVyZWQgaW5kZXguICovXG4gIGV2ZW4/OiBib29sZWFuO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIGEgcm93IHdpdGggYW4gb2RkLW51bWJlcmVkIGluZGV4LiAqL1xuICBvZGQ/OiBib29sZWFuO1xuXG4gIGdyaWRJbnN0YW5jZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgZmlyc3RSZW5kZXI6IGJvb2xlYW47XG4gIG91dE9mVmlldzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgY2VsbHMgY29udGV4dCBzdG9yZWQgaW4gdGhpcyByb3dcbiAgICovXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuY2VsbHMgJiYgdGhpcy5jZWxscy5sZW5ndGgpIHx8IDA7XG4gIH1cblxuICBnZXQgcGJsUm93Q29udGV4dCgpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4geyByZXR1cm4gdGhpczsgfVxuICBzZXQgcGJsUm93Q29udGV4dCh2YWx1ZTogUGJsTmdyaWRSb3dDb250ZXh0PFQ+KSB7IH1cblxuICBwcml2YXRlIGNlbGxzOiBQYmxDZWxsQ29udGV4dDxUPltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZGVudGl0eTogYW55LCBwdWJsaWMgZGF0YUluZGV4OiBudW1iZXIsIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPikge1xuICAgIC8qICBUT0RPOiBtYXRlcmlhbDIjMTQxOThcbiAgICAgICAgVGhlIHJvdyBjb250ZXh0IGNvbWUgZnJvbSB0aGUgYGNka2AgYW5kIGl0IGNhbiBiZSBvZiAyIHR5cGVzLCBkZXBlbmRpbmcgaWYgbXVsdGlwbGUgcm93IHRlbXBsYXRlcyBhcmUgdXNlZCBvciBub3QuXG4gICAgICAgIGBpbmRleGAgaXMgdXNlZCBmb3Igc2luZ2xlIHJvdyB0ZW1wbGF0ZSBtb2RlIGFuZCBgcmVuZGVySW5kZXhgIGZvciBtdWx0aSByb3cgdGVtcGxhdGUgbW9kZS5cblxuICAgICAgICBUaGVyZSBsaWJyYXJ5IGFuZC9vciBwbHVnaW5zIHJlcXVpcmUgYWNjZXNzIHRvIHRoZSByZW5kZXJlZCBpbmRleCBhbmQgaGF2aW5nIDIgbG9jYXRpb25zIGlzIGEgcHJvYmxlbS4uLlxuICAgICAgICBJdCdzIGEgYnVnIHRyYXAsIGFkZGluZyBtb3JlIGNvbXBsZXhpdHkgYW5kIHNvbWUgdGltZSBhY2Nlc3MgaXNzdWUgYmVjYXVzZSB0aGUgYENka1RhYmxlYCBpbnN0YW5jZSBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZS5cblxuICAgICAgICBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaGF2ZSBhIHNpbmdsZSBsb2NhdGlvbiBmb3IgdGhlIHJlbmRlcmVkIGluZGV4LlxuICAgICAgICBJIGNob3NlIHRvIGBpbmRleGAgYXMgdGhlIHNpbmdsZSBsb2NhdGlvbiBhbHRob3VnaCBgcmVuZGVySW5kZXhgIHdpbGwgcHJvYmFibHkgYmUgY2hvc2VuIGJ5IHRoZSBtYXRlcmlhbCB0ZWFtLlxuICAgICAgICBUaGlzIGlzIGJlY2F1c2UgaXQncyBsZXNzIGxpa2VseSB0byBvY2N1ciBhcyBtb3N0IHRhYmxlcyBkb2VzIG5vdCBoYXZlIG11bHRpIHJvdyB0ZW1wbGF0ZXMgKGRldGFpbCByb3cpXG4gICAgICAgIEEgcmVmYWN0b3Igd2lsbCBoYXZlIHRvIGJlIGRvbmUgaW4gdGhlIGZ1dHVyZS5cbiAgICAgICAgVGhlcmUgaXMgYSBwZW5kaW5nIGlzc3VlIHRvIGRvIHNvIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTQxOThcbiAgICAgICAgQWxzbyByZWxhdGVkOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE0MTk5XG4gICAgKi9cbiAgICBjb25zdCBhcHBseVdvcmthcm91bmQgPSBleHRBcGkuY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIGlmIChhcHBseVdvcmthcm91bmQpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaW5kZXgnLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLnJlbmRlckluZGV4OyB9IH0pO1xuICAgIH1cblxuICAgIHRoaXMudGFibGUgPSBleHRBcGkudGFibGU7XG5cbiAgICBjb25zdCBjZWxscyA9IHRoaXMuY2VsbHMgPSBbXTtcbiAgICBjb25zdCB7IGNvbHVtbnMgfSA9IGV4dEFwaS50YWJsZS5jb2x1bW5BcGk7XG4gICAgY29uc3QgbGVuID0gY29sdW1ucy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBjb2x1bW5JbmRleCA9IDA7IGNvbHVtbkluZGV4IDwgbGVuOyBjb2x1bW5JbmRleCsrKSB7XG4gICAgICBjb25zdCBjZWxsQ29udGV4dCA9IFBibENlbGxDb250ZXh0LmNyZWF0ZTxUPih0aGlzLCBjb2x1bW5zW2NvbHVtbkluZGV4XSwgZXh0QXBpKTtcbiAgICAgIGNlbGxzLnB1c2goY2VsbENvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0U3RhdGU8VCA9IGFueT4oaWRlbnRpdHk6IGFueSwgZGF0YUluZGV4OiBudW1iZXIsIGNlbGxzQ291bnQ6IG51bWJlcik6IFJvd0NvbnRleHRTdGF0ZTxUPiB7XG4gICAgY29uc3QgY2VsbHM6IENlbGxDb250ZXh0U3RhdGU8VD5bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XG4gICAgICBjZWxscy5wdXNoKFBibENlbGxDb250ZXh0LmRlZmF1bHRTdGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgaWRlbnRpdHksIGRhdGFJbmRleCwgY2VsbHMsIGZpcnN0UmVuZGVyOiB0cnVlIH07XG4gIH1cblxuICBnZXRTdGF0ZSgpOiBSb3dDb250ZXh0U3RhdGU8VD4ge1xuICAgIHJldHVybiB7XG4gICAgICBpZGVudGl0eTogdGhpcy5pZGVudGl0eSxcbiAgICAgIGRhdGFJbmRleDogdGhpcy5kYXRhSW5kZXgsXG4gICAgICBmaXJzdFJlbmRlcjogdGhpcy5maXJzdFJlbmRlcixcbiAgICAgIGNlbGxzOiB0aGlzLmNlbGxzLm1hcCggYyA9PiBjLmdldFN0YXRlKCkgKSxcbiAgICB9O1xuICB9XG5cbiAgZnJvbVN0YXRlKHN0YXRlOiBSb3dDb250ZXh0U3RhdGU8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmlkZW50aXR5ID0gc3RhdGUuaWRlbnRpdHk7XG4gICAgdGhpcy5maXJzdFJlbmRlciA9IHN0YXRlLmZpcnN0UmVuZGVyO1xuICAgIHRoaXMuZGF0YUluZGV4ID0gc3RhdGUuZGF0YUluZGV4O1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmNlbGxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0aGlzLmNlbGxzW2ldLmZyb21TdGF0ZShzdGF0ZS5jZWxsc1tpXSwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlQ29udGV4dChjb250ZXh0OiBSb3dDb250ZXh0PFQ+KTogdm9pZCB7XG4gICAgY29udGV4dC5kYXRhSW5kZXggPSB0aGlzLmRhdGFJbmRleDtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbnRleHQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNlbGwgY29udGV4dCBmb3IgdGhlIGNvbHVtbiBhdCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLlxuICAgKiA+IFRoZSBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byBBTEwgY29sdW1ucyAoTk9UIFJFTkRFUkVEIENPTFVNTlMpXG4gICAqL1xuICBjZWxsKGluZGV4OiBudW1iZXIgfCBQYmxDb2x1bW4pOiBQYmxDZWxsQ29udGV4dDxUPiB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgaWR4ID0gdHlwZW9mIGluZGV4ID09PSAnbnVtYmVyJyA/IGluZGV4IDogdGhpcy50YWJsZS5jb2x1bW5BcGkuaW5kZXhPZihpbmRleCk7XG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbaWR4XTtcbiAgfVxuXG4gIGdldENlbGxzKCk6IFBibENlbGxDb250ZXh0PFQ+W10ge1xuICAgIHJldHVybiAodGhpcy5jZWxscyAmJiB0aGlzLmNlbGxzLnNsaWNlKCkpIHx8IFtdO1xuICB9XG5cbiAgdXBkYXRlQ2VsbChjZWxsOiBQYmxDZWxsQ29udGV4dDxUPik6IHZvaWQge1xuICAgIHRoaXMuY2VsbHNbY2VsbC5pbmRleF0gPSBjZWxsLmNsb25lKCk7XG4gIH1cbiAgICAvKipcbiAgICogVXBkYXRlcyB0aGUgYG91dE9mVmlld2AgcHJvcGVydHkuXG4gICAqL1xuICB1cGRhdGVPdXRPZlZpZXdTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLnVwZGF0ZU91dE9mVmlld1N0YXRlKHRoaXMpO1xuICB9XG59XG4iXX0=