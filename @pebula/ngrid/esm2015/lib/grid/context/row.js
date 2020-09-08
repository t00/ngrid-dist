/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.grid = this.table = extApi.grid;
        /** @type {?} */
        const cells = this.cells = [];
        const { columns } = extApi.grid.columnApi;
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
        const idx = typeof index === 'number' ? index : this.grid.columnApi.indexOf(index);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbnRleHQvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUEsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFFBQVEsQ0FBQzs7OztBQVd4QyxNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBd0N4QixZQUFtQixRQUFhLEVBQVMsU0FBaUIsRUFBVSxNQUErQjtRQUFoRixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQXlCOzs7Ozs7Ozs7Ozs7Ozs7O2NBZTNGLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLHFCQUFxQjtRQUM3RCxJQUFJLGVBQWUsRUFBRTtZQUNuQixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHOzs7Z0JBQUUsY0FBYSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxDQUFDLENBQUM7U0FDeEY7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7Y0FFL0IsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRTtjQUN2QixFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzs7Y0FDbkMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNO1FBRTFCLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUU7O2tCQUNwRCxXQUFXLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBSSxJQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNoRixLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcs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Ozs7Ozs7SUEzSEMsa0NBQWM7Ozs7O0lBRWQsOEJBQWU7Ozs7O0lBRWYsb0NBQXFCOzs7OztJQUVyQiw4QkFBZTs7Ozs7SUFFZiw4QkFBZ0I7Ozs7O0lBRWhCLDZCQUFlOzs7OztJQUVmLDZCQUFlOzs7OztJQUVmLDRCQUFjOztJQUVkLHFDQUFtQzs7SUFFbkMsb0NBQXFCOztJQUNyQixrQ0FBbUI7Ozs7O0lBR25CLDhCQUFxQzs7SUFFckMsNkJBQW9DOzs7OztJQVlwQyw4QkFBbUM7O0lBRXZCLGlDQUFvQjs7SUFBRSxrQ0FBd0I7Ozs7O0lBQUUsK0JBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ29udGV4dFN0YXRlLCBSb3dDb250ZXh0U3RhdGUsIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ2VsbENvbnRleHQgfSBmcm9tICcuL2NlbGwnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQGFuZ3VsYXIvY2RrL3RhYmxlL3Jvdy5kJyB7XG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2RrQ2VsbE91dGxldFJvd0NvbnRleHQ8VD4ge1xuICAgIHBibFJvd0NvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPjtcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIENka0NlbGxPdXRsZXRNdWx0aVJvd0NvbnRleHQ8VD4ge1xuICAgIHBibFJvd0NvbnRleHQ6IFBibE5ncmlkUm93Q29udGV4dDxUPjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsUm93Q29udGV4dDxUPiBpbXBsZW1lbnRzIFBibE5ncmlkUm93Q29udGV4dDxUPiB7XG4gIC8qKiBEYXRhIGZvciB0aGUgcm93IHRoYXQgdGhpcyBjZWxsIGlzIGxvY2F0ZWQgd2l0aGluLiAqL1xuICAkaW1wbGljaXQ/OiBUO1xuICAvKiogSW5kZXggb2YgdGhlIGRhdGEgb2JqZWN0IGluIHRoZSBwcm92aWRlZCBkYXRhIGFycmF5LiAqL1xuICBpbmRleD86IG51bWJlcjtcbiAgLyoqIEluZGV4IGxvY2F0aW9uIG9mIHRoZSByZW5kZXJlZCByb3cgdGhhdCB0aGlzIGNlbGwgaXMgbG9jYXRlZCB3aXRoaW4uICovXG4gIHJlbmRlckluZGV4PzogbnVtYmVyO1xuICAvKiogTGVuZ3RoIG9mIHRoZSBudW1iZXIgb2YgdG90YWwgcm93cy4gKi9cbiAgY291bnQ/OiBudW1iZXI7XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gdGhlIGZpcnN0IHJvdy4gKi9cbiAgZmlyc3Q/OiBib29sZWFuO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIHRoZSBsYXN0IHJvdy4gKi9cbiAgbGFzdD86IGJvb2xlYW47XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gYSByb3cgd2l0aCBhbiBldmVuLW51bWJlcmVkIGluZGV4LiAqL1xuICBldmVuPzogYm9vbGVhbjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiBhIHJvdyB3aXRoIGFuIG9kZC1udW1iZXJlZCBpbmRleC4gKi9cbiAgb2RkPzogYm9vbGVhbjtcblxuICBncmlkSW5zdGFuY2U6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIGZpcnN0UmVuZGVyOiBib29sZWFuO1xuICBvdXRPZlZpZXc6IGJvb2xlYW47XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgY2VsbHMgY29udGV4dCBzdG9yZWQgaW4gdGhpcyByb3dcbiAgICovXG4gIGdldCBsZW5ndGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuY2VsbHMgJiYgdGhpcy5jZWxscy5sZW5ndGgpIHx8IDA7XG4gIH1cblxuICBnZXQgcGJsUm93Q29udGV4dCgpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4geyByZXR1cm4gdGhpczsgfVxuICBzZXQgcGJsUm93Q29udGV4dCh2YWx1ZTogUGJsTmdyaWRSb3dDb250ZXh0PFQ+KSB7IH1cblxuICBwcml2YXRlIGNlbGxzOiBQYmxDZWxsQ29udGV4dDxUPltdO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZGVudGl0eTogYW55LCBwdWJsaWMgZGF0YUluZGV4OiBudW1iZXIsIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPikge1xuICAgIC8qICBUT0RPOiBtYXRlcmlhbDIjMTQxOThcbiAgICAgICAgVGhlIHJvdyBjb250ZXh0IGNvbWUgZnJvbSB0aGUgYGNka2AgYW5kIGl0IGNhbiBiZSBvZiAyIHR5cGVzLCBkZXBlbmRpbmcgaWYgbXVsdGlwbGUgcm93IHRlbXBsYXRlcyBhcmUgdXNlZCBvciBub3QuXG4gICAgICAgIGBpbmRleGAgaXMgdXNlZCBmb3Igc2luZ2xlIHJvdyB0ZW1wbGF0ZSBtb2RlIGFuZCBgcmVuZGVySW5kZXhgIGZvciBtdWx0aSByb3cgdGVtcGxhdGUgbW9kZS5cblxuICAgICAgICBUaGVyZSBsaWJyYXJ5IGFuZC9vciBwbHVnaW5zIHJlcXVpcmUgYWNjZXNzIHRvIHRoZSByZW5kZXJlZCBpbmRleCBhbmQgaGF2aW5nIDIgbG9jYXRpb25zIGlzIGEgcHJvYmxlbS4uLlxuICAgICAgICBJdCdzIGEgYnVnIHRyYXAsIGFkZGluZyBtb3JlIGNvbXBsZXhpdHkgYW5kIHNvbWUgdGltZSBhY2Nlc3MgaXNzdWUgYmVjYXVzZSB0aGUgYENka1RhYmxlYCBpbnN0YW5jZSBpcyBub3QgYWx3YXlzIGF2YWlsYWJsZS5cblxuICAgICAgICBUaGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgaGF2ZSBhIHNpbmdsZSBsb2NhdGlvbiBmb3IgdGhlIHJlbmRlcmVkIGluZGV4LlxuICAgICAgICBJIGNob3NlIHRvIGBpbmRleGAgYXMgdGhlIHNpbmdsZSBsb2NhdGlvbiBhbHRob3VnaCBgcmVuZGVySW5kZXhgIHdpbGwgcHJvYmFibHkgYmUgY2hvc2VuIGJ5IHRoZSBtYXRlcmlhbCB0ZWFtLlxuICAgICAgICBUaGlzIGlzIGJlY2F1c2UgaXQncyBsZXNzIGxpa2VseSB0byBvY2N1ciBhcyBtb3N0IHRhYmxlcyBkb2VzIG5vdCBoYXZlIG11bHRpIHJvdyB0ZW1wbGF0ZXMgKGRldGFpbCByb3cpXG4gICAgICAgIEEgcmVmYWN0b3Igd2lsbCBoYXZlIHRvIGJlIGRvbmUgaW4gdGhlIGZ1dHVyZS5cbiAgICAgICAgVGhlcmUgaXMgYSBwZW5kaW5nIGlzc3VlIHRvIGRvIHNvIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9pc3N1ZXMvMTQxOThcbiAgICAgICAgQWxzbyByZWxhdGVkOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE0MTk5XG4gICAgKi9cbiAgICBjb25zdCBhcHBseVdvcmthcm91bmQgPSBleHRBcGkuY2RrVGFibGUubXVsdGlUZW1wbGF0ZURhdGFSb3dzO1xuICAgIGlmIChhcHBseVdvcmthcm91bmQpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaW5kZXgnLCB7IGdldDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLnJlbmRlckluZGV4OyB9IH0pO1xuICAgIH1cblxuICAgIHRoaXMuZ3JpZCA9IHRoaXMudGFibGUgPSBleHRBcGkuZ3JpZDtcblxuICAgIGNvbnN0IGNlbGxzID0gdGhpcy5jZWxscyA9IFtdO1xuICAgIGNvbnN0IHsgY29sdW1ucyB9ID0gZXh0QXBpLmdyaWQuY29sdW1uQXBpO1xuICAgIGNvbnN0IGxlbiA9IGNvbHVtbnMubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IGxlbjsgY29sdW1uSW5kZXgrKykge1xuICAgICAgY29uc3QgY2VsbENvbnRleHQgPSBQYmxDZWxsQ29udGV4dC5jcmVhdGU8VD4odGhpcywgY29sdW1uc1tjb2x1bW5JbmRleF0sIGV4dEFwaSk7XG4gICAgICBjZWxscy5wdXNoKGNlbGxDb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFN0YXRlPFQgPSBhbnk+KGlkZW50aXR5OiBhbnksIGRhdGFJbmRleDogbnVtYmVyLCBjZWxsc0NvdW50OiBudW1iZXIpOiBSb3dDb250ZXh0U3RhdGU8VD4ge1xuICAgIGNvbnN0IGNlbGxzOiBDZWxsQ29udGV4dFN0YXRlPFQ+W10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xuICAgICAgY2VsbHMucHVzaChQYmxDZWxsQ29udGV4dC5kZWZhdWx0U3RhdGUoKSk7XG4gICAgfVxuICAgIHJldHVybiB7IGlkZW50aXR5LCBkYXRhSW5kZXgsIGNlbGxzLCBmaXJzdFJlbmRlcjogdHJ1ZSB9O1xuICB9XG5cbiAgZ2V0U3RhdGUoKTogUm93Q29udGV4dFN0YXRlPFQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgaWRlbnRpdHk6IHRoaXMuaWRlbnRpdHksXG4gICAgICBkYXRhSW5kZXg6IHRoaXMuZGF0YUluZGV4LFxuICAgICAgZmlyc3RSZW5kZXI6IHRoaXMuZmlyc3RSZW5kZXIsXG4gICAgICBjZWxsczogdGhpcy5jZWxscy5tYXAoIGMgPT4gYy5nZXRTdGF0ZSgpICksXG4gICAgfTtcbiAgfVxuXG4gIGZyb21TdGF0ZShzdGF0ZTogUm93Q29udGV4dFN0YXRlPFQ+KTogdm9pZCB7XG4gICAgdGhpcy5pZGVudGl0eSA9IHN0YXRlLmlkZW50aXR5O1xuICAgIHRoaXMuZmlyc3RSZW5kZXIgPSBzdGF0ZS5maXJzdFJlbmRlcjtcbiAgICB0aGlzLmRhdGFJbmRleCA9IHN0YXRlLmRhdGFJbmRleDtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGhpcy5jZWxsc1tpXS5mcm9tU3RhdGUoc3RhdGUuY2VsbHNbaV0sIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZUNvbnRleHQoY29udGV4dDogUm93Q29udGV4dDxUPik6IHZvaWQge1xuICAgIGNvbnRleHQuZGF0YUluZGV4ID0gdGhpcy5kYXRhSW5kZXg7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb250ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjZWxsIGNvbnRleHQgZm9yIHRoZSBjb2x1bW4gYXQgdGhlIHNwZWNpZmllZCBwb3NpdGlvbi5cbiAgICogPiBUaGUgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gQUxMIGNvbHVtbnMgKE5PVCBSRU5ERVJFRCBDT0xVTU5TKVxuICAgKi9cbiAgY2VsbChpbmRleDogbnVtYmVyIHwgUGJsQ29sdW1uKTogUGJsQ2VsbENvbnRleHQ8VD4gfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGlkeCA9IHR5cGVvZiBpbmRleCA9PT0gJ251bWJlcicgPyBpbmRleCA6IHRoaXMuZ3JpZC5jb2x1bW5BcGkuaW5kZXhPZihpbmRleCk7XG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbaWR4XTtcbiAgfVxuXG4gIGdldENlbGxzKCk6IFBibENlbGxDb250ZXh0PFQ+W10ge1xuICAgIHJldHVybiAodGhpcy5jZWxscyAmJiB0aGlzLmNlbGxzLnNsaWNlKCkpIHx8IFtdO1xuICB9XG5cbiAgdXBkYXRlQ2VsbChjZWxsOiBQYmxDZWxsQ29udGV4dDxUPik6IHZvaWQge1xuICAgIHRoaXMuY2VsbHNbY2VsbC5pbmRleF0gPSBjZWxsLmNsb25lKCk7XG4gIH1cbiAgICAvKipcbiAgICogVXBkYXRlcyB0aGUgYG91dE9mVmlld2AgcHJvcGVydHkuXG4gICAqL1xuICB1cGRhdGVPdXRPZlZpZXdTdGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLnVwZGF0ZU91dE9mVmlld1N0YXRlKHRoaXMpO1xuICB9XG59XG4iXX0=