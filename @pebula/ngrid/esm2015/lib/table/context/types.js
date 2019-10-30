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
    /** @type {?} */
    PblNgridMetaCellContext.prototype.table;
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
    /** @type {?} */
    PblNgridCellContext.prototype.table;
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
    /** @type {?} */
    PblNgridRowContext.prototype.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2NvbnRleHQvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFhQSxzQ0FJQzs7O0lBSEMsbUNBQWlCOztJQUNqQixtQ0FBaUI7O0lBQ2pCLG9DQUFrQjs7Ozs7O0FBR3BCLHFDQUtDOzs7SUFKQyxtQ0FBYzs7SUFDZCxvQ0FBa0I7O0lBQ2xCLGdDQUE2Qjs7SUFDN0Isc0NBQXFCOzs7Ozs7QUFNdkIsbUNBV0M7Ozs7Ozs7SUFOQyxpQ0FBYzs7Ozs7O0lBS2QsaUNBQWlCOzs7OztBQUtuQiwrQ0FHQzs7O0lBRkMseUNBQWdDOztJQUNoQyx5Q0FBZ0M7Ozs7O0FBR2xDLG1EQUdDOzs7SUFGQyw4Q0FBdUI7O0lBQ3ZCLGdEQUF5Qjs7Ozs7O0FBRzNCLDZDQUlDOzs7SUFIQyw0Q0FBc0M7O0lBQ3RDLHNDQUFVOztJQUNWLHdDQUE0Qjs7Ozs7O0FBRzlCLHlDQWNDOzs7SUFiQyx5Q0FBa0M7O0lBQ2xDLHdDQUFrQzs7SUFDbEMsa0NBQU87O0lBQ1Asb0NBQVc7O0lBQ1gsa0NBQWU7O0lBQ2Ysb0NBQTRCOztJQUM1QixvQ0FBdUI7O0lBQ3ZCLHNDQUEwQjs7SUFDMUIsc0NBQTBCOztJQUMxQix1Q0FBMkI7Ozs7O0lBRTNCLHNFQUF3Qzs7Ozs7SUFDeEMscUVBQXVDOzs7Ozs7QUFHekMsd0NBNENDOzs7SUEzQ0Msc0NBQWlCOzs7Ozs7Ozs7OztJQVdqQix5Q0FBcUI7Ozs7Ozs7Ozs7OztJQVlyQix1Q0FBbUI7O0lBRW5CLG1DQUFxQzs7Ozs7SUFLckMsb0NBQXdCOzs7OztJQUV4Qix5REFBd0Q7Ozs7O0lBS3hELHdEQUFxQzs7Ozs7SUFLckMsb0VBQTZCOzs7Ozs7QUFHL0Isd0NBOEdDOzs7Ozs7Ozs7O0lBckdDLHlDQUFnRDs7Ozs7OztJQU1oRCwwQ0FBNkQ7Ozs7Ozs7OztJQVM3RCwyQ0FBd0M7Ozs7O0lBSXhDLDhDQUFxRTs7Ozs7Ozs7SUFRckUsOEVBQTJFOzs7Ozs7Ozs7SUFTM0UsK0ZBQTZGOzs7Ozs7OztJQU83RixtRkFBa0Y7Ozs7Ozs7Ozs7OztJQVlsRixxREFBYzs7Ozs7OztJQU9kLHdFQUE4RDs7Ozs7Ozs7SUFROUQseUVBQWlFOzs7Ozs7Ozs7O0lBU2pFLHlGQUFrRzs7Ozs7Ozs7Ozs7SUFXbEcsOERBQTBFOzs7OztJQUUxRSwyREFBMkU7Ozs7Ozs7SUFNM0UseUVBQWdGOzs7OztJQUVoRiwrREFBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uVHlwZURlZmluaXRpb25EYXRhTWFwLCBQYmxNZXRhQ29sdW1uLCBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAYW5ndWxhci9jZGsvdGFibGUvdHlwaW5ncy90YWJsZS5kJyB7XG4gIGludGVyZmFjZSBSb3dDb250ZXh0PFQ+IHtcbiAgICBncmlkSW5zdGFuY2U6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2VsbENvbnRleHRTdGF0ZTxUID0gYW55PiB7XG4gIGVkaXRpbmc6IGJvb2xlYW47XG4gIGZvY3VzZWQ6IGJvb2xlYW47XG4gIHNlbGVjdGVkOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvd0NvbnRleHRTdGF0ZTxUID0gYW55PiB7XG4gIGlkZW50aXR5OiBhbnk7XG4gIGRhdGFJbmRleDogbnVtYmVyO1xuICBjZWxsczogQ2VsbENvbnRleHRTdGF0ZTxUPltdO1xuICBmaXJzdFJlbmRlcjogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBBIHJlZmVyZW5jZSB0byBhIGRhdGEgY2VsbCBvbiB0aGUgZ3JpZC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBHcmlkRGF0YVBvaW50IHtcbiAgLyoqXG4gICAqIFRoZSByb3cgaWRlbnRpdHkuXG4gICAqIElmIHRoZSBncmlkIHdhcyBzZXQgd2l0aCBhbiBpZGVudGl0eSBwcm9wZXJ0eSB1c2UgdGhlIHZhbHVlIG9mIHRoZSBpZGVudGl0eSBvdGhlcndpc2UsIHVzZSB0aGUgbG9jYXRpb24gb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIHJvd0lkZW50OiBhbnk7XG4gIC8qKlxuICAgKiBUaGUgY29sdW1uIGluZGV4LCByZWxhdGl2ZSB0byB0aGUgY29sdW1uIGRlZmluaXRpb24gc2V0IHByb3ZpZGVkIHRvIHRoZSBncmlkLlxuICAgKiBOb3RlIHRoYXQgdGhpcyBpcyB0aGUgYWJzb2x1dGUgcG9zaXRpb24sIGluY2x1ZGluZyBoaWRkZW4gY29sdW1ucy5cbiAgICovXG4gIGNvbEluZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIENlbGxSZWZlcmVuY2UgPSBIVE1MRWxlbWVudCB8IEdyaWREYXRhUG9pbnQgfCBQYmxOZ3JpZENlbGxDb250ZXh0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkRm9jdXNDaGFuZ2VkRXZlbnQge1xuICBwcmV2OiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkO1xuICBjdXJyOiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkU2VsZWN0aW9uQ2hhbmdlZEV2ZW50IHtcbiAgYWRkZWQ6IEdyaWREYXRhUG9pbnRbXTtcbiAgcmVtb3ZlZDogR3JpZERhdGFQb2ludFtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQgPSBhbnksIFRDb2wgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uID0gUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbj4ge1xuICAkaW1wbGljaXQ6IFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQ+O1xuICBjb2w6IFRDb2w7XG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZENlbGxDb250ZXh0PFQgPSBhbnksIFAgZXh0ZW5kcyBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXAgPSBrZXlvZiBQYmxDb2x1bW5UeXBlRGVmaW5pdGlvbkRhdGFNYXA+IHtcbiAgcm93Q29udGV4dDogUGJsTmdyaWRSb3dDb250ZXh0PFQ+LFxuICAkaW1wbGljaXQ6IFBibE5ncmlkQ2VsbENvbnRleHQ8VD47XG4gIHJvdzogVCxcbiAgdmFsdWU6IGFueTtcbiAgY29sOiBQYmxDb2x1bW47XG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcbiAgcmVhZG9ubHkgZWRpdGluZzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgZm9jdXNlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgc3RhcnRFZGl0KG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkO1xuICBzdG9wRWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFJvd0NvbnRleHQ8VCA9IGFueT4gZXh0ZW5kcyBSb3dDb250ZXh0PFQ+IHtcbiAgaWRlbnRpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSByb3cgaXMgcmVuZGVyZWQuXG4gICAqIE9uY2UgdGhlIHJvdyBsZWF2ZXMgdGhlIHZpZXcgdGhpcyB3aWxsIGJlIGZhbHNlIGFuZCB3aWxsIG5vdCBjaGFuZ2UuXG4gICAqXG4gICAqIE5vdGUgdGhhdCByZW5kZXJlZCBpdGVtcyBtaWdodCBhcHBlYXIgb3V0c2lkZSBvZiB0aGUgdmlld3BvcnQgaWYgdmlydHVhbCBzY3JvbGwgaXMgbm90IHNldCBhbmRcbiAgICogd2hlbiBzZXQgYnV0IHRoZSByb3cgaXMgcmVuZGVyZWQgYXMgcGFydCBvZiB0aGUgYnVmZmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIHJlbGV2YW50IG9ubHkgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBzZXQuXG4gICAqL1xuICBmaXJzdFJlbmRlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBpbmRpY2F0ZXMgdGhhdCB0aGUgcm93IGlzIHJlbmRlcmVkIG91dHNpZGUgb2YgdGhlIHZpZXdwb3J0LlxuICAgKlxuICAgKiBUaGUgaW5kaWNhdG9yIGlzIHVwZGF0ZWQgd2hlbiByb3dzIGFyZSByZW5kZXJlZCAoaS5lLiBub3QgbGl2ZSwgb24gc2Nyb2xsIGV2ZW50cykuXG4gICAqIFVuZGVyc3RhbmRpbmcgdGhpcyBiZWhhdmlvciBpcyBpbXBvcnRhbnQhISFcbiAgICpcbiAgICogRm9yIGxpdmUgdXBkYXRlZCwgeW91IGNhbiB1c2UgYHVwZGF0ZU91dE9mVmlld1N0YXRlKClgIHRvIHRyaWdnZXIgdXBkYXRlcyBmcm9tIGEgc2Nyb2xsIHN0cmVhbS4gKGtlZXAgdHJhY2sgb24gcGVyZm9ybWFuY2UpXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgYHRydWVgIGluZGljYXRlcyBhIGJ1ZmZlciByb3cuXG4gICAqL1xuICBvdXRPZlZpZXc6IGJvb2xlYW47XG5cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsZW5ndGggb2YgY2VsbHMgY29udGV4dCBzdG9yZWQgaW4gdGhpcyByb3dcbiAgICovXG4gIHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xuXG4gIGNlbGwoaW5kZXg6IG51bWJlcik6IFBibE5ncmlkQ2VsbENvbnRleHQ8VD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzaGFsbG93IGNvcHkgb2YgdGhlIGN1cnJlbnQgY2VsbCdzIGNvbnRleHQgYXJyYXkuXG4gICAqL1xuICBnZXRDZWxscygpOiBQYmxOZ3JpZENlbGxDb250ZXh0PFQ+W107XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGBvdXRPZlZpZXdgIHByb3BlcnR5LlxuICAgKi9cbiAgdXBkYXRlT3V0T2ZWaWV3U3RhdGUoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZENvbnRleHRBcGk8VCA9IGFueT4ge1xuXG4gIC8qKlxuICAgKiBUaGUgcmVmZXJlbmNlIHRvIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgY29udGV4dC5cbiAgICogWW91IGNhbiByZXRyaWV2ZSB0aGUgYWN0dWFsIGNvbnRleHQgb3IgY29udGV4dCBjZWxsIHVzaW5nIGBmaW5kUm93SW5WaWV3YCBhbmQgLyBvciBgZmluZFJvd0luQ2FjaGVgLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgdGhlIGN1cnJlbnRseSBmb2N1c2VkIGNlbGwgZG9lcyBub3QgaGF2ZSB0byBleGlzdCBpbiB0aGUgdmlldy5cbiAgICogSWYgdGhpcyBpcyB0aGUgY2FzZSBgZmluZFJvd0luVmlld2Agd2lsbCByZXR1cm4gdW5kZWZpbmVkLCB1c2UgYGZpbmRSb3dJbkNhY2hlYCBpbnN0ZWFkLlxuICAgKi9cbiAgcmVhZG9ubHkgZm9jdXNlZENlbGw6IEdyaWREYXRhUG9pbnQgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBmb2N1cyBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhlIG5vdGlmaWNhdGlvbiBpcyBub3QgaW1tZWRpYXRlLCBpdCB3aWxsIG9jY3VyIG9uIHRoZSBjbG9zZXN0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNoYW5nZS5cbiAgICovXG4gIHJlYWRvbmx5IGZvY3VzQ2hhbmdlZDogT2JzZXJ2YWJsZTxQYmxOZ3JpZEZvY3VzQ2hhbmdlZEV2ZW50PjtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgc2VsZWN0ZWQgcmFuZ2Ugb2YgY2VsbCdzIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMgZG9lcyBub3QgaGF2ZSB0byBleGlzdCBpbiB0aGUgdmlldy5cbiAgICogSWYgdGhpcyBpcyB0aGUgY2FzZSBgZmluZFJvd0luVmlld2Agd2lsbCByZXR1cm4gdW5kZWZpbmVkLCB1c2UgYGZpbmRSb3dJbkNhY2hlYCBpbnN0ZWFkLlxuICAgKi9cbiAgcmVhZG9ubHkgc2VsZWN0ZWRDZWxsczogR3JpZERhdGFQb2ludFtdO1xuICAvKipcbiAgICogTm90aWZ5IHdoZW4gdGhlIHNlbGVjdGVkIGNlbGxzIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVhZG9ubHkgc2VsZWN0aW9uQ2hhbmdlZDogT2JzZXJ2YWJsZTxQYmxOZ3JpZFNlbGVjdGlvbkNoYW5nZWRFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvY3VzIHRoZSBwcm92aWRlZCBjZWxsLlxuICAgKiBJZiBhIGNlbGwgaXMgbm90IHByb3ZpZGVkIHdpbGwgdW4tZm9jdXMgKGJsdXIpIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIChpZiB0aGVyZSBpcyBvbmUpLlxuICAgKiBAcGFyYW0gY2VsbFJlZiBBIFJlZmVyZW5jZSB0byB0aGUgY2VsbFxuICAgKiBAcGFyYW0gbWFya0ZvckNoZWNrIE1hcmsgdGhlIHJvdyBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKi9cbiAgZm9jdXNDZWxsKGNlbGxSZWY/OiBDZWxsUmVmZXJlbmNlIHwgYm9vbGVhbiwgbWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIFNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBtYXJrRm9yQ2hlY2sgTWFyayB0aGUgcm93IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqIEBwYXJhbSBjbGVhckN1cnJlbnQgQ2xlYXIgdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJlZm9yZSBhcHBseWluZyB0aGUgbmV3IHNlbGVjdGlvbi5cbiAgICogRGVmYXVsdCB0byBmYWxzZSAoYWRkIHRvIGN1cnJlbnQpLlxuICAgKi9cbiAgc2VsZWN0Q2VsbHMoY2VsbFJlZnM6IENlbGxSZWZlcmVuY2VbXSwgbWFya0ZvckNoZWNrPzogYm9vbGVhbiwgY2xlYXJDdXJyZW50PzogYm9vbGVhbik6IHZvaWQ7XG4gIC8qKlxuICAgKiBVbnNlbGVjdCBhbGwgcHJvdmlkZWQgY2VsbHMuXG4gICAqIElmIGNlbGxzIGFyZSBub3QgcHJvdmlkZWQgd2lsbCB1bi1zZWxlY3QgYWxsIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxscy5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIHVuc2VsZWN0Q2VsbHMoY2VsbFJlZnM/OiBDZWxsUmVmZXJlbmNlW10gfCBib29sZWFuLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZDtcblxuICAvKipcbiAgICogQ2xlYXIgdGhlIGN1cnJlbnQgY29udGV4dC5cbiAgICogVGhpcyBtZXRob2Qgd2lsbCByZXNldCB0aGUgY29udGV4dCBvZiBhbGwgY2VsbHMuXG4gICAqXG4gICAqIEluIG1vc3QgY2FzZXMsIHlvdSBkbyBub3QgbmVlZCB0byBydW4gdGhpcyBtZXRob2QgYmVjYXVzZSBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgcnVuIHdoZW5cbiAgICogdGhlIGRhdGFzb3VyY2UgaXMgcmVwbGFjZWQgKGVudGlyZSBkYXRhc291cmNlIGluc3RhbmNlKS5cbiAgICpcbiAgICogSG93ZXZlciwgaWYgeW91IGFyZSBrZWVwaW5nIHRoZSBzYW1lIGRhdGFzb3VyY2UgYnV0IHN3aXRjaGluZyBkYXRhIGludGVybmFsbHkgKG9uVHJpZ2dlcilcbiAgICogeW91IGNhbiBjbGVhciB0aGUgY29udGV4dCB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICovXG4gIGNsZWFyKCk6IHZvaWQ7XG5cbiAgICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3cgY29udGV4dCwgdXNpbmcgdGhlIHJvdyBpZGVudGl0eSwgaW4gdGhlIGN1cnJlbnQgdmlldy5cbiAgICogSWYgdGhlIHJvdyBpcyBub3QgaW4gdGhlIHZpZXcgKG9yIGV2ZW4gbm90IGluIHRoZSBjYWNoZSkgaXQgd2lsbCByZXR1cm4gdW5kZWZpbmVkLCBvdGhlcndpc2UgcmV0dXJucyB0aGUgcm93J3MgY29udGV4dCBpbnN0YW5jZSAoYFBibFJvd0NvbnRleHRgKVxuICAgKiBAcGFyYW0gcm93SWRlbnRpdHkgVGhlIHJvdydzIGlkZW50aXR5LiBJZiBhIHNwZWNpZmljIGlkZW50aXR5IGlzIHVzZWQsIHBsZWFzZSBwcm92aWRlIGl0IG90aGVyd2lzZSBwcm92aWRlIHRoZSBpbmRleCBvZiB0aGUgcm93IGluIHRoZSBkYXRhc291cmNlLlxuICAgKi9cbiAgZmluZFJvd0luVmlldyhyb3dJZGVudGl0eTogYW55KTogUGJsUm93Q29udGV4dDxUPiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogVHJ5IHRvIGZpbmQgYSBzcGVjaWZpYyByb3cgY29udGV4dCwgdXNpbmcgdGhlIHJvdyBpZGVudGl0eSwgaW4gdGhlIGNvbnRleHQgY2FjaGUuXG4gICAqIE5vdGUgdGhhdCB0aGUgY2FjaGUgZG9lcyBub3QgaG9sZCB0aGUgY29udGV4dCBpdHNlbGYgYnV0IG9ubHkgdGhlIHN0YXRlIHRoYXQgY2FuIGxhdGVyIGJlIHVzZWQgdG8gcmV0cmlldmUgYSBjb250ZXh0IGluc3RhbmNlLiBUaGUgY29udGV4dCBpbnN0YW5jZVxuICAgKiBpcyBvbmx5IHVzZWQgYXMgY29udGV4dCBmb3Igcm93cyBpbiB2aWV3LlxuICAgKiBAcGFyYW0gcm93SWRlbnRpdHkgVGhlIHJvdydzIGlkZW50aXR5LiBJZiBhIHNwZWNpZmljIGlkZW50aXR5IGlzIHVzZWQsIHBsZWFzZSBwcm92aWRlIGl0IG90aGVyd2lzZSBwcm92aWRlIHRoZSBpbmRleCBvZiB0aGUgcm93IGluIHRoZSBkYXRhc291cmNlLlxuICAgKi9cbiAgZmluZFJvd0luQ2FjaGUocm93SWRlbnRpdHk6IGFueSk6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICogQHBhcmFtIG9mZnNldCBXaGVuIHNldCwgcmV0dXJucyB0aGUgcm93IGF0IHRoZSBvZmZzZXQgZnJvbSB0aGUgcm93IHdpdGggdGhlIHByb3ZpZGVkIHJvdyBpZGVudGl0eS4gQ2FuIGJlIGFueSBudW1lcmljIHZhbHVlIChlLmcgNSwgLTYsIDQpLlxuICAgKiBAcGFyYW0gY3JlYXRlIFdoZXRoZXIgdG8gY3JlYXRlIGEgbmV3IHN0YXRlIGlmIHRoZSBjdXJyZW50IHN0YXRlIGRvZXMgbm90IGV4aXN0LlxuICAgKi9cbiAgZmluZFJvd0luQ2FjaGUocm93SWRlbnRpdHk6IGFueSwgb2Zmc2V0OiBudW1iZXIsIGNyZWF0ZTogYm9vbGVhbik6IFJvd0NvbnRleHRTdGF0ZTxUPiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogR2V0IHRoZSByb3cgY29udGV4dCBpbiB0aGUgc3BlY2lmaWVkIGluZGV4LlxuICAgKlxuICAgKiBUaGUgc3BlY2lmaWVkIGluZGV4IHJlZmVycyB0byB0aGUgcmVuZGVyZWQgaW5kZXggYW5kIG5vdCB0aGUgaW5kZXggaW4gdGhlIGRhdGEgc3RvcmUuXG4gICAqIElmIHlvdSBhcmUgbm90IHVzaW5nIHZpcnR1YWwgc2Nyb2xsIHRoZSByZW5kZXJlZCBpbmRleCBpcyB0aGUgc2FtZSBhcyB0aGUgZGF0YSBpbmRleC5cbiAgICpcbiAgICogPiBZb3UgY2FuIHRyYW5zZm9ybSBkYXRhIDwgLS0gPiByZW5kZXIgaW5kZXgncyB1c2luZyB0aGUgZGF0YSBzb3VyY2UuXG4gICAqIEBwYXJhbSByb3dJbmRleCBUaGUgUkVOREVSIGluZGV4IHBvc2l0aW9uIG9mIHRoZSByb3cuXG4gICAqL1xuICBnZXRSb3cocm93SW5kZXg6IG51bWJlciB8IEhUTUxFbGVtZW50KTogUGJsTmdyaWRSb3dDb250ZXh0PFQ+IHwgdW5kZWZpbmVkO1xuXG4gIGdldENlbGwoY2VsbDogSFRNTEVsZW1lbnQgfCBHcmlkRGF0YVBvaW50KTogUGJsTmdyaWRDZWxsQ29udGV4dCB8IHVuZGVmaW5lZFxuICAvKipcbiAgICogR2V0IHRoZSBjZWxsIGNvbnRleHQgaW4gdGhlIHNwZWNpZmljIHJvdyBpbmRleCBhbmQgY29sdW1uIGluZGV4XG4gICAqIEBwYXJhbSByb3dJbmRleCBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIHJvdy5cbiAgICogQHBhcmFtIGNvbEluZGV4IFRoZSBpbmRleCBwb3NpdGlvbiBvZiB0aGUgY29sdW1uLlxuICAgKi9cbiAgZ2V0Q2VsbChyb3dJbmRleDogbnVtYmVyLCBjb2xJbmRleDogbnVtYmVyKTogUGJsTmdyaWRDZWxsQ29udGV4dDxUPiB8IHVuZGVmaW5lZDtcblxuICBnZXREYXRhSXRlbShjZWxsOiBDZWxsUmVmZXJlbmNlKTogYW55O1xufVxuIl19