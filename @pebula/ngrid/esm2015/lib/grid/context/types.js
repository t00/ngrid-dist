/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
export function CellContextState() { }
if (false) {
    /** @type {?} */
    CellContextState.prototype.editing;
    /** @type {?} */
    CellContextState.prototype.focused;
    /** @type {?} */
    CellContextState.prototype.selected;
}
/**
 * @record
 * @template T
 */
export function RowContextState() { }
if (false) {
    /** @type {?} */
    RowContextState.prototype.identity;
    /** @type {?} */
    RowContextState.prototype.dataIndex;
    /** @type {?} */
    RowContextState.prototype.cells;
    /** @type {?} */
    RowContextState.prototype.firstRender;
}
/**
 * A reference to a data cell on the grid.
 * @record
 */
export function GridDataPoint() { }
if (false) {
    /**
     * The row identity.
     * If the grid was set with an identity property use the value of the identity otherwise, use the location of the row in the datasource.
     * @type {?}
     */
    GridDataPoint.prototype.rowIdent;
    /**
     * The column index, relative to the column definition set provided to the grid.
     * Note that this is the absolute position, including hidden columns.
     * @type {?}
     */
    GridDataPoint.prototype.colIndex;
}
/**
 * @record
 */
export function PblNgridFocusChangedEvent() { }
if (false) {
    /** @type {?} */
    PblNgridFocusChangedEvent.prototype.prev;
    /** @type {?} */
    PblNgridFocusChangedEvent.prototype.curr;
}
/**
 * @record
 */
export function PblNgridSelectionChangedEvent() { }
if (false) {
    /** @type {?} */
    PblNgridSelectionChangedEvent.prototype.added;
    /** @type {?} */
    PblNgridSelectionChangedEvent.prototype.removed;
}
/**
 * @record
 * @template T, TCol
 */
export function PblNgridMetaCellContext() { }
if (false) {
    /** @type {?} */
    PblNgridMetaCellContext.prototype.$implicit;
    /** @type {?} */
    PblNgridMetaCellContext.prototype.col;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridMetaCellContext.prototype.table;
    /** @type {?} */
    PblNgridMetaCellContext.prototype.grid;
}
/**
 * @record
 * @template T, P
 */
export function PblNgridCellContext() { }
if (false) {
    /** @type {?} */
    PblNgridCellContext.prototype.rowContext;
    /** @type {?} */
    PblNgridCellContext.prototype.$implicit;
    /** @type {?} */
    PblNgridCellContext.prototype.row;
    /** @type {?} */
    PblNgridCellContext.prototype.value;
    /** @type {?} */
    PblNgridCellContext.prototype.col;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridCellContext.prototype.table;
    /** @type {?} */
    PblNgridCellContext.prototype.grid;
    /** @type {?} */
    PblNgridCellContext.prototype.index;
    /** @type {?} */
    PblNgridCellContext.prototype.editing;
    /** @type {?} */
    PblNgridCellContext.prototype.focused;
    /** @type {?} */
    PblNgridCellContext.prototype.selected;
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    PblNgridCellContext.prototype.startEdit = function (markForCheck) { };
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    PblNgridCellContext.prototype.stopEdit = function (markForCheck) { };
}
/**
 * @record
 * @template T
 */
export function PblNgridRowContext() { }
if (false) {
    /** @type {?} */
    PblNgridRowContext.prototype.identity;
    /**
     * When true, it is the first time that the row is rendered.
     * Once the row leaves the view this will be false and will not change.
     *
     * Note that rendered items might appear outside of the viewport if virtual scroll is not set and
     * when set but the row is rendered as part of the buffer.
     *
     * This is relevant only when virtual scroll is set.
     * @type {?}
     */
    PblNgridRowContext.prototype.firstRender;
    /**
     * When true, indicates that the row is rendered outside of the viewport.
     *
     * The indicator is updated when rows are rendered (i.e. not live, on scroll events).
     * Understanding this behavior is important!!!
     *
     * For live updated, you can use `updateOutOfViewState()` to trigger updates from a scroll stream. (keep track on performance)
     *
     * Note that when virtual scroll is enabled `true` indicates a buffer row.
     * @type {?}
     */
    PblNgridRowContext.prototype.outOfView;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridRowContext.prototype.table;
    /** @type {?} */
    PblNgridRowContext.prototype.grid;
    /**
     * Returns the length of cells context stored in this row
     * @type {?}
     */
    PblNgridRowContext.prototype.length;
    /**
     * @param {?} index
     * @return {?}
     */
    PblNgridRowContext.prototype.cell = function (index) { };
    /**
     * Returns a shallow copy of the current cell's context array.
     * @return {?}
     */
    PblNgridRowContext.prototype.getCells = function () { };
    /**
     * Updates the `outOfView` property.
     * @return {?}
     */
    PblNgridRowContext.prototype.updateOutOfViewState = function () { };
}
/**
 * @record
 * @template T
 */
export function PblNgridContextApi() { }
if (false) {
    /**
     * The reference to currently focused cell context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently focused cell does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @type {?}
     */
    PblNgridContextApi.prototype.focusedCell;
    /**
     * Notify when the focus has changed.
     *
     * > Note that the notification is not immediate, it will occur on the closest micro-task after the change.
     * @type {?}
     */
    PblNgridContextApi.prototype.focusChanged;
    /**
     * The reference to currently selected range of cell's context.
     * You can retrieve the actual context or context cell using `findRowInView` and / or `findRowInCache`.
     *
     * > Note that when virtual scroll is enabled the currently selected cells does not have to exist in the view.
     * If this is the case `findRowInView` will return undefined, use `findRowInCache` instead.
     * @type {?}
     */
    PblNgridContextApi.prototype.selectedCells;
    /**
     * Notify when the selected cells has changed.
     * @type {?}
     */
    PblNgridContextApi.prototype.selectionChanged;
    /**
     * Focus the provided cell.
     * If a cell is not provided will un-focus (blur) the currently focused cell (if there is one).
     * @param {?=} cellRef A Reference to the cell
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    PblNgridContextApi.prototype.focusCell = function (cellRef, markForCheck) { };
    /**
     * Select all provided cells.
     * @param {?} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @param {?=} clearCurrent Clear the current selection before applying the new selection.
     * Default to false (add to current).
     * @return {?}
     */
    PblNgridContextApi.prototype.selectCells = function (cellRefs, markForCheck, clearCurrent) { };
    /**
     * Unselect all provided cells.
     * If cells are not provided will un-select all currently selected cells.
     * @param {?=} cellRefs
     * @param {?=} markForCheck Mark the row for change detection
     * @return {?}
     */
    PblNgridContextApi.prototype.unselectCells = function (cellRefs, markForCheck) { };
    /**
     * Clear the current context.
     * This method will reset the context of all cells.
     *
     * In most cases, you do not need to run this method because it will automatically run when
     * the datasource is replaced (entire datasource instance).
     *
     * However, if you are keeping the same datasource but switching data internally (onTrigger)
     * you can clear the context using this method.
     * @return {?}
     */
    PblNgridContextApi.prototype.clear = function () { };
    /**
     * Try to find a specific row context, using the row identity, in the current view.
     * If the row is not in the view (or even not in the cache) it will return undefined, otherwise returns the row's context instance (`PblRowContext`)
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    PblNgridContextApi.prototype.findRowInView = function (rowIdentity) { };
    /**
     * Try to find a specific row context, using the row identity, in the context cache.
     * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
     * is only used as context for rows in view.
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @return {?}
     */
    PblNgridContextApi.prototype.findRowInCache = function (rowIdentity) { };
    /**
     * Try to find a specific row context, using the row identity, in the context cache.
     * Note that the cache does not hold the context itself but only the state that can later be used to retrieve a context instance. The context instance
     * is only used as context for rows in view.
     * @param {?} rowIdentity The row's identity. If a specific identity is used, please provide it otherwise provide the index of the row in the datasource.
     * @param {?} offset When set, returns the row at the offset from the row with the provided row identity. Can be any numeric value (e.g 5, -6, 4).
     * @param {?} create Whether to create a new state if the current state does not exist.
     * @return {?}
     */
    PblNgridContextApi.prototype.findRowInCache = function (rowIdentity, offset, create) { };
    /**
     * Get the row context in the specified index.
     *
     * The specified index refers to the rendered index and not the index in the data store.
     * If you are not using virtual scroll the rendered index is the same as the data index.
     *
     * > You can transform data < -- > render index's using the data source.
     * @param {?} rowIndex The RENDER index position of the row.
     * @return {?}
     */
    PblNgridContextApi.prototype.getRow = function (rowIndex) { };
    /**
     * @param {?} cell
     * @return {?}
     */
    PblNgridContextApi.prototype.getCell = function (cell) { };
    /**
     * Get the cell context in the specific row index and column index
     * @param {?} rowIndex The index position of the row.
     * @param {?} colIndex The index position of the column.
     * @return {?}
     */
    PblNgridContextApi.prototype.getCell = function (rowIndex, colIndex) { };
    /**
     * @param {?} cell
     * @return {?}
     */
    PblNgridContextApi.prototype.getDataItem = function (cell) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29udGV4dC90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWFBLHNDQUlDOzs7SUFIQyxtQ0FBaUI7O0lBQ2pCLG1DQUFpQjs7SUFDakIsb0NBQWtCOzs7Ozs7QUFHcEIscUNBS0M7OztJQUpDLG1DQUFjOztJQUNkLG9DQUFrQjs7SUFDbEIsZ0NBQTZCOztJQUM3QixzQ0FBcUI7Ozs7OztBQU12QixtQ0FXQzs7Ozs7OztJQU5DLGlDQUFjOzs7Ozs7SUFLZCxpQ0FBaUI7Ozs7O0FBS25CLCtDQUdDOzs7SUFGQyx5Q0FBZ0M7O0lBQ2hDLHlDQUFnQzs7Ozs7QUFHbEMsbURBR0M7OztJQUZDLDhDQUF1Qjs7SUFDdkIsZ0RBQXlCOzs7Ozs7QUFHM0IsNkNBT0M7OztJQU5DLDRDQUFzQzs7SUFDdEMsc0NBQVU7Ozs7O0lBR1Ysd0NBQTRCOztJQUM1Qix1Q0FBMkI7Ozs7OztBQUc3Qix5Q0FnQkM7OztJQWZDLHlDQUFrQzs7SUFDbEMsd0NBQWtDOztJQUNsQyxrQ0FBTzs7SUFDUCxvQ0FBVzs7SUFDWCxrQ0FBZTs7Ozs7SUFFZixvQ0FBNEI7O0lBQzVCLG1DQUEyQjs7SUFDM0Isb0NBQXVCOztJQUN2QixzQ0FBMEI7O0lBQzFCLHNDQUEwQjs7SUFDMUIsdUNBQTJCOzs7OztJQUUzQixzRUFBd0M7Ozs7O0lBQ3hDLHFFQUF1Qzs7Ozs7O0FBR3pDLHdDQThDQzs7O0lBN0NDLHNDQUFpQjs7Ozs7Ozs7Ozs7SUFXakIseUNBQXFCOzs7Ozs7Ozs7Ozs7SUFZckIsdUNBQW1COzs7OztJQUduQixtQ0FBcUM7O0lBQ3JDLGtDQUFvQzs7Ozs7SUFLcEMsb0NBQXdCOzs7OztJQUV4Qix5REFBd0Q7Ozs7O0lBS3hELHdEQUFxQzs7Ozs7SUFLckMsb0VBQTZCOzs7Ozs7QUFHL0Isd0NBOEdDOzs7Ozs7Ozs7O0lBckdDLHlDQUFnRDs7Ozs7OztJQU1oRCwwQ0FBNkQ7Ozs7Ozs7OztJQVM3RCwyQ0FBd0M7Ozs7O0lBSXhDLDhDQUFxRTs7Ozs7Ozs7SUFRckUsOEVBQTJFOzs7Ozs7Ozs7SUFTM0UsK0ZBQTZGOzs7Ozs7OztJQU83RixtRkFBa0Y7Ozs7Ozs7Ozs7OztJQVlsRixxREFBYzs7Ozs7OztJQU9kLHdFQUE4RDs7Ozs7Ozs7SUFROUQseUVBQWlFOzs7Ozs7Ozs7O0lBU2pFLHlGQUFrRzs7Ozs7Ozs7Ozs7SUFXbEcsOERBQTBFOzs7OztJQUUxRSwyREFBMkU7Ozs7Ozs7SUFNM0UseUVBQWdGOzs7OztJQUVoRiwrREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAYW5ndWxhci9jZGsvdGFibGUvdHlwaW5ncy90YWJsZS5kJyB7XG4gIGludGVyZmFjZSBSb3dDb250ZXh0PFQ+IHtcbiAgICBncmlkSW5zdGFuY2U6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2VsbENvbnRleHRTdGF0ZTxUID0gYW55PiB7XG4gIGVkaXRpbmc6IGJvb2xlYW47XG4gIGZvY3VzZWQ6IGJvb2xlYW47XG4gIHNlbGVjdGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NvbnRleHRTdGF0ZTxUID0gYW55PiB7XG4gIGlkZW50aXR5OiBhbnk7XG4gIGRhdGFJbmRleDogbnVtYmVyO1xuICBjZWxsczogQ2VsbENvbnRleHRTdGF0ZTxUPltdO1xuICBmaXJzdFJlbmRlcjogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byBhIGRhdGEgY2VsbCBvbiB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkRGF0YVBvaW50IHtcbiAgLyoqXG4gICAqIFRoZSByb3cgaWRlbnRpdHkuXG4gICAqIElmIHRoZSBncmlkIHdhcyBzZXQgd2l0aCBhbiBpZGVudGl0eSBwcm9wZXJ0eSB1c2UgdGhlIHZhbHVlIG9mIHRoZSBpZGVudGl0eSBvdGhlcndpc2UsIHVzZSB0aGUgbG9jYXRpb24gb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIHJvd0lkZW50OiBhbnk7XG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGluZGV4LCByZWxhdGl2ZSB0byB0aGUgY29sdW1uIGRlZmluaXRpb24gc2V0IHByb3ZpZGVkIHRvIHRoZSBncmlkLlxuICAgKiBOb3RlIHRoYXQgdGhpcyBpcyB0aGUgYWJzb2x1dGUgcG9zaXRpb24sIGluY2x1ZGluZyBoaWRkZW4gY29sdW1ucy5cbiAgICovXG4gIGNvbEluZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIENlbGxSZWZlcmVuY2UgPSBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQgfCBQYmxOZ3JpZENlbGxDb250ZXh0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQge1xuICBwcmV2OiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkO1xuICBjdXJyOiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU2VsZWN0aW9uQ2hhbmdlZEV2ZW50IHtcbiAgYWRkZWQ6IEdyaWREYXRhUG9pbnRbXTtcbiAgcmVtb3ZlZDogR3JpZERhdGFQb2ludFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQgPSBhbnksIFRDb2wgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uID0gUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbj4ge1xuICAkaW1wbGljaXQ6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+O1xuICBjb2w6IFRDb2w7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZENlbGxDb250ZXh0PFQgPSBhbnksIFAgZXh0ZW5kcyBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXAgPSBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXA+IHtcbiAgcm93Q29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+LFxuICAkaW1wbGljaXQ6IFBibE5ncmlkQ2VsbENvbnRleHQ8VD47XG4gIHJvdzogVCxcbiAgdmFsdWU6IGFueTtcbiAgY29sOiBQYmxDb2x1bW47XG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG4gIHJlYWRvbmx5IGVkaXRpbmc6IGJvb2xlYW47XG4gIHJlYWRvbmx5IGZvY3VzZWQ6IGJvb2xlYW47XG4gIHJlYWRvbmx5IHNlbGVjdGVkOiBib29sZWFuO1xuXG4gIHN0YXJ0RWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZDtcbiAgc3RvcEVkaXQobWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRSb3dDb250ZXh0PFQgPSBhbnk+IGV4dGVuZHMgUm93Q29udGV4dDxUPiB7XG4gIGlkZW50aXR5OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgaXQgaXMgdGhlIGZpcnN0IHRpbWUgdGhhdCB0aGUgcm93IGlzIHJlbmRlcmVkLlxuICAgKiBPbmNlIHRoZSByb3cgbGVhdmVzIHRoZSB2aWV3IHRoaXMgd2lsbCBiZSBmYWxzZSBhbmQgd2lsbCBub3QgY2hhbmdlLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgcmVuZGVyZWQgaXRlbXMgbWlnaHQgYXBwZWFyIG91dHNpZGUgb2YgdGhlIHZpZXdwb3J0IGlmIHZpcnR1YWwgc2Nyb2xsIGlzIG5vdCBzZXQgYW5kXG4gICAqIHdoZW4gc2V0IGJ1dCB0aGUgcm93IGlzIHJlbmRlcmVkIGFzIHBhcnQgb2YgdGhlIGJ1ZmZlci5cbiAgICpcbiAgICogVGhpcyBpcyByZWxldmFudCBvbmx5IHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgc2V0LlxuICAgKi9cbiAgZmlyc3RSZW5kZXI6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSwgaW5kaWNhdGVzIHRoYXQgdGhlIHJvdyBpcyByZW5kZXJlZCBvdXRzaWRlIG9mIHRoZSB2aWV3cG9ydC5cbiAgICpcbiAgICogVGhlIGluZGljYXRvciBpcyB1cGRhdGVkIHdoZW4gcm93cyBhcmUgcmVuZGVyZWQgKGkuZS4gbm90IGxpdmUsIG9uIHNjcm9sbCBldmVudHMpLlxuICAgKiBVbmRlcnN0YW5kaW5nIHRoaXMgYmVoYXZpb3IgaXMgaW1wb3J0YW50ISEhXG4gICAqXG4gICAqIEZvciBsaXZlIHVwZGF0ZWQsIHlvdSBjYW4gdXNlIGB1cGRhdGVPdXRPZlZpZXdTdGF0ZSgpYCB0byB0cmlnZ2VyIHVwZGF0ZXMgZnJvbSBhIHNjcm9sbCBzdHJlYW0uIChrZWVwIHRyYWNrIG9uIHBlcmZvcm1hbmNlKVxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIGB0cnVlYCBpbmRpY2F0ZXMgYSBidWZmZXIgcm93LlxuICAgKi9cbiAgb3V0T2ZWaWV3OiBib29sZWFuO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxlbmd0aCBvZiBjZWxscyBjb250ZXh0IHN0b3JlZCBpbiB0aGlzIHJvd1xuICAgKi9cbiAgcmVhZG9ubHkgbGVuZ3RoOiBudW1iZXI7XG5cbiAgY2VsbChpbmRleDogbnVtYmVyKTogUGJsTmdyaWRDZWxsQ29udGV4dDxUPiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhIHNoYWxsb3cgY29weSBvZiB0aGUgY3VycmVudCBjZWxsJ3MgY29udGV4dCBhcnJheS5cbiAgICovXG4gIGdldENlbGxzKCk6IFBibE5ncmlkQ2VsbENvbnRleHQ8VD5bXTtcblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgYG91dE9mVmlld2AgcHJvcGVydHkuXG4gICAqL1xuICB1cGRhdGVPdXRPZlZpZXdTdGF0ZSgpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ29udGV4dEFwaTxUID0gYW55PiB7XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gY3VycmVudGx5IGZvY3VzZWQgY2VsbCBjb250ZXh0LlxuICAgKiBZb3UgY2FuIHJldHJpZXZlIHRoZSBhY3R1YWwgY29udGV4dCBvciBjb250ZXh0IGNlbGwgdXNpbmcgYGZpbmRSb3dJblZpZXdgIGFuZCAvIG9yIGBmaW5kUm93SW5DYWNoZWAuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZW5hYmxlZCB0aGUgY3VycmVudGx5IGZvY3VzZWQgY2VsbCBkb2VzIG5vdCBoYXZlIHRvIGV4aXN0IGluIHRoZSB2aWV3LlxuICAgKiBJZiB0aGlzIGlzIHRoZSBjYXNlIGBmaW5kUm93SW5WaWV3YCB3aWxsIHJldHVybiB1bmRlZmluZWQsIHVzZSBgZmluZFJvd0luQ2FjaGVgIGluc3RlYWQuXG4gICAqL1xuICByZWFkb25seSBmb2N1c2VkQ2VsbDogR3JpZERhdGFQb2ludCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICogTm90aWZ5IHdoZW4gdGhlIGZvY3VzIGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB0aGUgbm90aWZpY2F0aW9uIGlzIG5vdCBpbW1lZGlhdGUsIGl0IHdpbGwgb2NjdXIgb24gdGhlIGNsb3Nlc3QgbWljcm8tdGFzayBhZnRlciB0aGUgY2hhbmdlLlxuICAgKi9cbiAgcmVhZG9ubHkgZm9jdXNDaGFuZ2VkOiBPYnNlcnZhYmxlPFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQ+O1xuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIGN1cnJlbnRseSBzZWxlY3RlZCByYW5nZSBvZiBjZWxsJ3MgY29udGV4dC5cbiAgICogWW91IGNhbiByZXRyaWV2ZSB0aGUgYWN0dWFsIGNvbnRleHQgb3IgY29udGV4dCBjZWxsIHVzaW5nIGBmaW5kUm93SW5WaWV3YCBhbmQgLyBvciBgZmluZFJvd0luQ2FjaGVgLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxscyBkb2VzIG5vdCBoYXZlIHRvIGV4aXN0IGluIHRoZSB2aWV3LlxuICAgKiBJZiB0aGlzIGlzIHRoZSBjYXNlIGBmaW5kUm93SW5WaWV3YCB3aWxsIHJldHVybiB1bmRlZmluZWQsIHVzZSBgZmluZFJvd0luQ2FjaGVgIGluc3RlYWQuXG4gICAqL1xuICByZWFkb25seSBzZWxlY3RlZENlbGxzOiBHcmlkRGF0YVBvaW50W107XG4gIC8qKlxuICAgKiBOb3RpZnkgd2hlbiB0aGUgc2VsZWN0ZWQgY2VsbHMgaGFzIGNoYW5nZWQuXG4gICAqL1xuICByZWFkb25seSBzZWxlY3Rpb25DaGFuZ2VkOiBPYnNlcnZhYmxlPFBibE5ncmlkU2VsZWN0aW9uQ2hhbmdlZEV2ZW50PjtcblxuICAvKipcbiAgICogRm9jdXMgdGhlIHByb3ZpZGVkIGNlbGwuXG4gICAqIElmIGEgY2VsbCBpcyBub3QgcHJvdmlkZWQgd2lsbCB1bi1mb2N1cyAoYmx1cikgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgKGlmIHRoZXJlIGlzIG9uZSkuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBtYXJrRm9yQ2hlY2sgTWFyayB0aGUgcm93IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqL1xuICBmb2N1c0NlbGwoY2VsbFJlZj86IENlbGxSZWZlcmVuY2UgfCBib29sZWFuLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogU2VsZWN0IGFsbCBwcm92aWRlZCBjZWxscy5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICogQHBhcmFtIGNsZWFyQ3VycmVudCBDbGVhciB0aGUgY3VycmVudCBzZWxlY3Rpb24gYmVmb3JlIGFwcGx5aW5nIHRoZSBuZXcgc2VsZWN0aW9uLlxuICAgKiBEZWZhdWx0IHRvIGZhbHNlIChhZGQgdG8gY3VycmVudCkuXG4gICAqL1xuICBzZWxlY3RDZWxscyhjZWxsUmVmczogQ2VsbFJlZmVyZW5jZVtdLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuLCBjbGVhckN1cnJlbnQ/OiBib29sZWFuKTogdm9pZDtcbiAgLyoqXG4gICAqIFVuc2VsZWN0IGFsbCBwcm92aWRlZCBjZWxscy5cbiAgICogSWYgY2VsbHMgYXJlIG5vdCBwcm92aWRlZCB3aWxsIHVuLXNlbGVjdCBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzLlxuICAgKiBAcGFyYW0gY2VsbFJlZiBBIFJlZmVyZW5jZSB0byB0aGUgY2VsbFxuICAgKiBAcGFyYW0gbWFya0ZvckNoZWNrIE1hcmsgdGhlIHJvdyBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgdW5zZWxlY3RDZWxscyhjZWxsUmVmcz86IENlbGxSZWZlcmVuY2VbXSB8IGJvb2xlYW4sIG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY3VycmVudCBjb250ZXh0LlxuICAgKiBUaGlzIG1ldGhvZCB3aWxsIHJlc2V0IHRoZSBjb250ZXh0IG9mIGFsbCBjZWxscy5cbiAgICpcbiAgICogSW4gbW9zdCBjYXNlcywgeW91IGRvIG5vdCBuZWVkIHRvIHJ1biB0aGlzIG1ldGhvZCBiZWNhdXNlIGl0IHdpbGwgYXV0b21hdGljYWxseSBydW4gd2hlblxuICAgKiB0aGUgZGF0YXNvdXJjZSBpcyByZXBsYWNlZCAoZW50aXJlIGRhdGFzb3VyY2UgaW5zdGFuY2UpLlxuICAgKlxuICAgKiBIb3dldmVyLCBpZiB5b3UgYXJlIGtlZXBpbmcgdGhlIHNhbWUgZGF0YXNvdXJjZSBidXQgc3dpdGNoaW5nIGRhdGEgaW50ZXJuYWxseSAob25UcmlnZ2VyKVxuICAgKiB5b3UgY2FuIGNsZWFyIHRoZSBjb250ZXh0IHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKi9cbiAgY2xlYXIoKTogdm9pZDtcblxuICAgIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY3VycmVudCB2aWV3LlxuICAgKiBJZiB0aGUgcm93IGlzIG5vdCBpbiB0aGUgdmlldyAob3IgZXZlbiBub3QgaW4gdGhlIGNhY2hlKSBpdCB3aWxsIHJldHVybiB1bmRlZmluZWQsIG90aGVyd2lzZSByZXR1cm5zIHRoZSByb3cncyBjb250ZXh0IGluc3RhbmNlIChgUGJsUm93Q29udGV4dGApXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqL1xuICBmaW5kUm93SW5WaWV3KHJvd0lkZW50aXR5OiBhbnkpOiBQYmxSb3dDb250ZXh0PFQ+IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY29udGV4dCBjYWNoZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWNoZSBkb2VzIG5vdCBob2xkIHRoZSBjb250ZXh0IGl0c2VsZiBidXQgb25seSB0aGUgc3RhdGUgdGhhdCBjYW4gbGF0ZXIgYmUgdXNlZCB0byByZXRyaWV2ZSBhIGNvbnRleHQgaW5zdGFuY2UuIFRoZSBjb250ZXh0IGluc3RhbmNlXG4gICAqIGlzIG9ubHkgdXNlZCBhcyBjb250ZXh0IGZvciByb3dzIGluIHZpZXcuXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqL1xuICBmaW5kUm93SW5DYWNoZShyb3dJZGVudGl0eTogYW55KTogUm93Q29udGV4dFN0YXRlPFQ+IHwgdW5kZWZpbmVkO1xuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3cgY29udGV4dCwgdXNpbmcgdGhlIHJvdyBpZGVudGl0eSwgaW4gdGhlIGNvbnRleHQgY2FjaGUuXG4gICAqIE5vdGUgdGhhdCB0aGUgY2FjaGUgZG9lcyBub3QgaG9sZCB0aGUgY29udGV4dCBpdHNlbGYgYnV0IG9ubHkgdGhlIHN0YXRlIHRoYXQgY2FuIGxhdGVyIGJlIHVzZWQgdG8gcmV0cmlldmUgYSBjb250ZXh0IGluc3RhbmNlLiBUaGUgY29udGV4dCBpbnN0YW5jZVxuICAgKiBpcyBvbmx5IHVzZWQgYXMgY29udGV4dCBmb3Igcm93cyBpbiB2aWV3LlxuICAgKiBAcGFyYW0gcm93SWRlbnRpdHkgVGhlIHJvdydzIGlkZW50aXR5LiBJZiBhIHNwZWNpZmljIGlkZW50aXR5IGlzIHVzZWQsIHBsZWFzZSBwcm92aWRlIGl0IG90aGVyd2lzZSBwcm92aWRlIHRoZSBpbmRleCBvZiB0aGUgcm93IGluIHRoZSBkYXRhc291cmNlLlxuICAgKiBAcGFyYW0gb2Zmc2V0IFdoZW4gc2V0LCByZXR1cm5zIHRoZSByb3cgYXQgdGhlIG9mZnNldCBmcm9tIHRoZSByb3cgd2l0aCB0aGUgcHJvdmlkZWQgcm93IGlkZW50aXR5LiBDYW4gYmUgYW55IG51bWVyaWMgdmFsdWUgKGUuZyA1LCAtNiwgNCkuXG4gICAqIEBwYXJhbSBjcmVhdGUgV2hldGhlciB0byBjcmVhdGUgYSBuZXcgc3RhdGUgaWYgdGhlIGN1cnJlbnQgc3RhdGUgZG9lcyBub3QgZXhpc3QuXG4gICAqL1xuICBmaW5kUm93SW5DYWNoZShyb3dJZGVudGl0eTogYW55LCBvZmZzZXQ6IG51bWJlciwgY3JlYXRlOiBib29sZWFuKTogUm93Q29udGV4dFN0YXRlPFQ+IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHJvdyBjb250ZXh0IGluIHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAqXG4gICAqIFRoZSBzcGVjaWZpZWQgaW5kZXggcmVmZXJzIHRvIHRoZSByZW5kZXJlZCBpbmRleCBhbmQgbm90IHRoZSBpbmRleCBpbiB0aGUgZGF0YSBzdG9yZS5cbiAgICogSWYgeW91IGFyZSBub3QgdXNpbmcgdmlydHVhbCBzY3JvbGwgdGhlIHJlbmRlcmVkIGluZGV4IGlzIHRoZSBzYW1lIGFzIHRoZSBkYXRhIGluZGV4LlxuICAgKlxuICAgKiA+IFlvdSBjYW4gdHJhbnNmb3JtIGRhdGEgPCAtLSA+IHJlbmRlciBpbmRleCdzIHVzaW5nIHRoZSBkYXRhIHNvdXJjZS5cbiAgICogQHBhcmFtIHJvd0luZGV4IFRoZSBSRU5ERVIgaW5kZXggcG9zaXRpb24gb2YgdGhlIHJvdy5cbiAgICovXG4gIGdldFJvdyhyb3dJbmRleDogbnVtYmVyIHwgSFRNTEVsZW1lbnQpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQ7XG5cbiAgZ2V0Q2VsbChjZWxsOiBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQpOiBQYmxOZ3JpZENlbGxDb250ZXh0IHwgdW5kZWZpbmVkXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNlbGwgY29udGV4dCBpbiB0aGUgc3BlY2lmaWMgcm93IGluZGV4IGFuZCBjb2x1bW4gaW5kZXhcbiAgICogQHBhcmFtIHJvd0luZGV4IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgcm93LlxuICAgKiBAcGFyYW0gY29sSW5kZXggVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSBjb2x1bW4uXG4gICAqL1xuICBnZXRDZWxsKHJvd0luZGV4OiBudW1iZXIsIGNvbEluZGV4OiBudW1iZXIpOiBQYmxOZ3JpZENlbGxDb250ZXh0PFQ+IHwgdW5kZWZpbmVkO1xuXG4gIGdldERhdGFJdGVtKGNlbGw6IENlbGxSZWZlcmVuY2UpOiBhbnk7XG59XG4iXX0=