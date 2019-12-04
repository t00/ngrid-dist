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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2NvbnRleHQvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFNQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7O0FBV3hDLE1BQU0sT0FBTyxhQUFhOzs7Ozs7SUF3Q3hCLFlBQW1CLFFBQWEsRUFBUyxTQUFpQixFQUFVLE1BQStCO1FBQWhGLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FlM0YsZUFBZSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCO1FBQzdELElBQUksZUFBZSxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUc7OztnQkFBRSxjQUFhLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFFLENBQUMsQ0FBQztTQUN4RjtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDOztjQUUvQixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFO2NBQ3ZCLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTOztjQUNuQyxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU07UUFFMUIsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRTs7a0JBQ3BELFdBQVcsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFJLElBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDO1lBQ2hGLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxD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Ozs7OztJQTNIQyxrQ0FBYzs7Ozs7SUFFZCw4QkFBZTs7Ozs7SUFFZixvQ0FBcUI7Ozs7O0lBRXJCLDhCQUFlOzs7OztJQUVmLDhCQUFnQjs7Ozs7SUFFaEIsNkJBQWU7Ozs7O0lBRWYsNkJBQWU7Ozs7O0lBRWYsNEJBQWM7O0lBRWQscUNBQW1DOztJQUVuQyxvQ0FBcUI7O0lBQ3JCLGtDQUFtQjs7Ozs7SUFHbkIsOEJBQXFDOztJQUVyQyw2QkFBb0M7Ozs7O0lBWXBDLDhCQUFtQzs7SUFFdkIsaUNBQW9COztJQUFFLGtDQUF3Qjs7Ozs7SUFBRSwrQkFBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb250ZXh0U3RhdGUsIFJvd0NvbnRleHRTdGF0ZSwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4vY2VsbCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAYW5ndWxhci9jZGsvdGFibGUvdHlwaW5ncy9yb3cuZCcge1xuICBleHBvcnQgaW50ZXJmYWNlIENka0NlbGxPdXRsZXRSb3dDb250ZXh0PFQ+IHtcbiAgICBwYmxSb3dDb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD47XG4gIH1cbiAgZXhwb3J0IGludGVyZmFjZSBDZGtDZWxsT3V0bGV0TXVsdGlSb3dDb250ZXh0PFQ+IHtcbiAgICBwYmxSb3dDb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD47XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibFJvd0NvbnRleHQ8VD4gaW1wbGVtZW50cyBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4ge1xuICAvKiogRGF0YSBmb3IgdGhlIHJvdyB0aGF0IHRoaXMgY2VsbCBpcyBsb2NhdGVkIHdpdGhpbi4gKi9cbiAgJGltcGxpY2l0PzogVDtcbiAgLyoqIEluZGV4IG9mIHRoZSBkYXRhIG9iamVjdCBpbiB0aGUgcHJvdmlkZWQgZGF0YSBhcnJheS4gKi9cbiAgaW5kZXg/OiBudW1iZXI7XG4gIC8qKiBJbmRleCBsb2NhdGlvbiBvZiB0aGUgcmVuZGVyZWQgcm93IHRoYXQgdGhpcyBjZWxsIGlzIGxvY2F0ZWQgd2l0aGluLiAqL1xuICByZW5kZXJJbmRleD86IG51bWJlcjtcbiAgLyoqIExlbmd0aCBvZiB0aGUgbnVtYmVyIG9mIHRvdGFsIHJvd3MuICovXG4gIGNvdW50PzogbnVtYmVyO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIHRoZSBmaXJzdCByb3cuICovXG4gIGZpcnN0PzogYm9vbGVhbjtcbiAgLyoqIFRydWUgaWYgdGhpcyBjZWxsIGlzIGNvbnRhaW5lZCBpbiB0aGUgbGFzdCByb3cuICovXG4gIGxhc3Q/OiBib29sZWFuO1xuICAvKiogVHJ1ZSBpZiB0aGlzIGNlbGwgaXMgY29udGFpbmVkIGluIGEgcm93IHdpdGggYW4gZXZlbi1udW1iZXJlZCBpbmRleC4gKi9cbiAgZXZlbj86IGJvb2xlYW47XG4gIC8qKiBUcnVlIGlmIHRoaXMgY2VsbCBpcyBjb250YWluZWQgaW4gYSByb3cgd2l0aCBhbiBvZGQtbnVtYmVyZWQgaW5kZXguICovXG4gIG9kZD86IGJvb2xlYW47XG5cbiAgZ3JpZEluc3RhbmNlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICBmaXJzdFJlbmRlcjogYm9vbGVhbjtcbiAgb3V0T2ZWaWV3OiBib29sZWFuO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIGNlbGxzIGNvbnRleHQgc3RvcmVkIGluIHRoaXMgcm93XG4gICAqL1xuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuICh0aGlzLmNlbGxzICYmIHRoaXMuY2VsbHMubGVuZ3RoKSB8fCAwO1xuICB9XG5cbiAgZ2V0IHBibFJvd0NvbnRleHQoKTogUGJsTmdyaWRSb3dDb250ZXh0PFQ+IHsgcmV0dXJuIHRoaXM7IH1cbiAgc2V0IHBibFJvd0NvbnRleHQodmFsdWU6IFBibE5ncmlkUm93Q29udGV4dDxUPikgeyB9XG5cbiAgcHJpdmF0ZSBjZWxsczogUGJsQ2VsbENvbnRleHQ8VD5bXTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWRlbnRpdHk6IGFueSwgcHVibGljIGRhdGFJbmRleDogbnVtYmVyLCBwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4pIHtcbiAgICAvKiAgVE9ETzogbWF0ZXJpYWwyIzE0MTk4XG4gICAgICAgIFRoZSByb3cgY29udGV4dCBjb21lIGZyb20gdGhlIGBjZGtgIGFuZCBpdCBjYW4gYmUgb2YgMiB0eXBlcywgZGVwZW5kaW5nIGlmIG11bHRpcGxlIHJvdyB0ZW1wbGF0ZXMgYXJlIHVzZWQgb3Igbm90LlxuICAgICAgICBgaW5kZXhgIGlzIHVzZWQgZm9yIHNpbmdsZSByb3cgdGVtcGxhdGUgbW9kZSBhbmQgYHJlbmRlckluZGV4YCBmb3IgbXVsdGkgcm93IHRlbXBsYXRlIG1vZGUuXG5cbiAgICAgICAgVGhlcmUgbGlicmFyeSBhbmQvb3IgcGx1Z2lucyByZXF1aXJlIGFjY2VzcyB0byB0aGUgcmVuZGVyZWQgaW5kZXggYW5kIGhhdmluZyAyIGxvY2F0aW9ucyBpcyBhIHByb2JsZW0uLi5cbiAgICAgICAgSXQncyBhIGJ1ZyB0cmFwLCBhZGRpbmcgbW9yZSBjb21wbGV4aXR5IGFuZCBzb21lIHRpbWUgYWNjZXNzIGlzc3VlIGJlY2F1c2UgdGhlIGBDZGtUYWJsZWAgaW5zdGFuY2UgaXMgbm90IGFsd2F5cyBhdmFpbGFibGUuXG5cbiAgICAgICAgVGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIGhhdmUgYSBzaW5nbGUgbG9jYXRpb24gZm9yIHRoZSByZW5kZXJlZCBpbmRleC5cbiAgICAgICAgSSBjaG9zZSB0byBgaW5kZXhgIGFzIHRoZSBzaW5nbGUgbG9jYXRpb24gYWx0aG91Z2ggYHJlbmRlckluZGV4YCB3aWxsIHByb2JhYmx5IGJlIGNob3NlbiBieSB0aGUgbWF0ZXJpYWwgdGVhbS5cbiAgICAgICAgVGhpcyBpcyBiZWNhdXNlIGl0J3MgbGVzcyBsaWtlbHkgdG8gb2NjdXIgYXMgbW9zdCB0YWJsZXMgZG9lcyBub3QgaGF2ZSBtdWx0aSByb3cgdGVtcGxhdGVzIChkZXRhaWwgcm93KVxuICAgICAgICBBIHJlZmFjdG9yIHdpbGwgaGF2ZSB0byBiZSBkb25lIGluIHRoZSBmdXR1cmUuXG4gICAgICAgIFRoZXJlIGlzIGEgcGVuZGluZyBpc3N1ZSB0byBkbyBzbyBpbiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvaXNzdWVzLzE0MTk4XG4gICAgICAgIEFsc28gcmVsYXRlZDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2lzc3Vlcy8xNDE5OVxuICAgICovXG4gICAgY29uc3QgYXBwbHlXb3JrYXJvdW5kID0gZXh0QXBpLmNka1RhYmxlLm11bHRpVGVtcGxhdGVEYXRhUm93cztcbiAgICBpZiAoYXBwbHlXb3JrYXJvdW5kKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2luZGV4JywgeyBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5yZW5kZXJJbmRleDsgfSB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmdyaWQgPSB0aGlzLnRhYmxlID0gZXh0QXBpLmdyaWQ7XG5cbiAgICBjb25zdCBjZWxscyA9IHRoaXMuY2VsbHMgPSBbXTtcbiAgICBjb25zdCB7IGNvbHVtbnMgfSA9IGV4dEFwaS5ncmlkLmNvbHVtbkFwaTtcbiAgICBjb25zdCBsZW4gPSBjb2x1bW5zLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGNvbHVtbkluZGV4ID0gMDsgY29sdW1uSW5kZXggPCBsZW47IGNvbHVtbkluZGV4KyspIHtcbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gUGJsQ2VsbENvbnRleHQuY3JlYXRlPFQ+KHRoaXMsIGNvbHVtbnNbY29sdW1uSW5kZXhdLCBleHRBcGkpO1xuICAgICAgY2VsbHMucHVzaChjZWxsQ29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRTdGF0ZTxUID0gYW55PihpZGVudGl0eTogYW55LCBkYXRhSW5kZXg6IG51bWJlciwgY2VsbHNDb3VudDogbnVtYmVyKTogUm93Q29udGV4dFN0YXRlPFQ+IHtcbiAgICBjb25zdCBjZWxsczogQ2VsbENvbnRleHRTdGF0ZTxUPltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcbiAgICAgIGNlbGxzLnB1c2goUGJsQ2VsbENvbnRleHQuZGVmYXVsdFN0YXRlKCkpO1xuICAgIH1cbiAgICByZXR1cm4geyBpZGVudGl0eSwgZGF0YUluZGV4LCBjZWxscywgZmlyc3RSZW5kZXI6IHRydWUgfTtcbiAgfVxuXG4gIGdldFN0YXRlKCk6IFJvd0NvbnRleHRTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkZW50aXR5OiB0aGlzLmlkZW50aXR5LFxuICAgICAgZGF0YUluZGV4OiB0aGlzLmRhdGFJbmRleCxcbiAgICAgIGZpcnN0UmVuZGVyOiB0aGlzLmZpcnN0UmVuZGVyLFxuICAgICAgY2VsbHM6IHRoaXMuY2VsbHMubWFwKCBjID0+IGMuZ2V0U3RhdGUoKSApLFxuICAgIH07XG4gIH1cblxuICBmcm9tU3RhdGUoc3RhdGU6IFJvd0NvbnRleHRTdGF0ZTxUPik6IHZvaWQge1xuICAgIHRoaXMuaWRlbnRpdHkgPSBzdGF0ZS5pZGVudGl0eTtcbiAgICB0aGlzLmZpcnN0UmVuZGVyID0gc3RhdGUuZmlyc3RSZW5kZXI7XG4gICAgdGhpcy5kYXRhSW5kZXggPSBzdGF0ZS5kYXRhSW5kZXg7XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRoaXMuY2VsbHNbaV0uZnJvbVN0YXRlKHN0YXRlLmNlbGxzW2ldLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVDb250ZXh0KGNvbnRleHQ6IFJvd0NvbnRleHQ8VD4pOiB2b2lkIHtcbiAgICBjb250ZXh0LmRhdGFJbmRleCA9IHRoaXMuZGF0YUluZGV4O1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29udGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2VsbCBjb250ZXh0IGZvciB0aGUgY29sdW1uIGF0IHRoZSBzcGVjaWZpZWQgcG9zaXRpb24uXG4gICAqID4gVGhlIHBvc2l0aW9uIGlzIHJlbGF0aXZlIHRvIEFMTCBjb2x1bW5zIChOT1QgUkVOREVSRUQgQ09MVU1OUylcbiAgICovXG4gIGNlbGwoaW5kZXg6IG51bWJlciB8IFBibENvbHVtbik6IFBibENlbGxDb250ZXh0PFQ+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBpZHggPSB0eXBlb2YgaW5kZXggPT09ICdudW1iZXInID8gaW5kZXggOiB0aGlzLmdyaWQuY29sdW1uQXBpLmluZGV4T2YoaW5kZXgpO1xuICAgIHJldHVybiB0aGlzLmNlbGxzW2lkeF07XG4gIH1cblxuICBnZXRDZWxscygpOiBQYmxDZWxsQ29udGV4dDxUPltdIHtcbiAgICByZXR1cm4gKHRoaXMuY2VsbHMgJiYgdGhpcy5jZWxscy5zbGljZSgpKSB8fCBbXTtcbiAgfVxuXG4gIHVwZGF0ZUNlbGwoY2VsbDogUGJsQ2VsbENvbnRleHQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmNlbGxzW2NlbGwuaW5kZXhdID0gY2VsbC5jbG9uZSgpO1xuICB9XG4gICAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGBvdXRPZlZpZXdgIHByb3BlcnR5LlxuICAgKi9cbiAgdXBkYXRlT3V0T2ZWaWV3U3RhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5leHRBcGkuY29udGV4dEFwaS51cGRhdGVPdXRPZlZpZXdTdGF0ZSh0aGlzKTtcbiAgfVxufVxuIl19