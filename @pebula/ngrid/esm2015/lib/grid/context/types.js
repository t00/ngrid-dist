/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/types.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvY29udGV4dC90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFhQSxzQ0FJQzs7O0lBSEMsbUNBQWlCOztJQUNqQixtQ0FBaUI7O0lBQ2pCLG9DQUFrQjs7Ozs7O0FBR3BCLHFDQUtDOzs7SUFKQyxtQ0FBYzs7SUFDZCxvQ0FBa0I7O0lBQ2xCLGdDQUE2Qjs7SUFDN0Isc0NBQXFCOzs7Ozs7QUFNdkIsbUNBV0M7Ozs7Ozs7SUFOQyxpQ0FBYzs7Ozs7O0lBS2QsaUNBQWlCOzs7OztBQUtuQiwrQ0FHQzs7O0lBRkMseUNBQWdDOztJQUNoQyx5Q0FBZ0M7Ozs7O0FBR2xDLG1EQUdDOzs7SUFGQyw4Q0FBdUI7O0lBQ3ZCLGdEQUF5Qjs7Ozs7O0FBRzNCLDZDQU9DOzs7SUFOQyw0Q0FBc0M7O0lBQ3RDLHNDQUFVOzs7OztJQUdWLHdDQUE0Qjs7SUFDNUIsdUNBQTJCOzs7Ozs7QUFHN0IseUNBZ0JDOzs7SUFmQyx5Q0FBa0M7O0lBQ2xDLHdDQUFrQzs7SUFDbEMsa0NBQU87O0lBQ1Asb0NBQVc7O0lBQ1gsa0NBQWU7Ozs7O0lBRWYsb0NBQTRCOztJQUM1QixtQ0FBMkI7O0lBQzNCLG9DQUF1Qjs7SUFDdkIsc0NBQTBCOztJQUMxQixzQ0FBMEI7O0lBQzFCLHVDQUEyQjs7Ozs7SUFFM0Isc0VBQXdDOzs7OztJQUN4QyxxRUFBdUM7Ozs7OztBQUd6Qyx3Q0E4Q0M7OztJQTdDQyxzQ0FBaUI7Ozs7Ozs7Ozs7O0lBV2pCLHlDQUFxQjs7Ozs7Ozs7Ozs7O0lBWXJCLHVDQUFtQjs7Ozs7SUFHbkIsbUNBQXFDOztJQUNyQyxrQ0FBb0M7Ozs7O0lBS3BDLG9DQUF3Qjs7Ozs7SUFFeEIseURBQXdEOzs7OztJQUt4RCx3REFBcUM7Ozs7O0lBS3JDLG9FQUE2Qjs7Ozs7O0FBRy9CLHdDQThHQzs7Ozs7Ozs7OztJQXJHQyx5Q0FBZ0Q7Ozs7Ozs7SUFNaEQsMENBQTZEOzs7Ozs7Ozs7SUFTN0QsMkNBQXdDOzs7OztJQUl4Qyw4Q0FBcUU7Ozs7Ozs7O0lBUXJFLDhFQUEyRTs7Ozs7Ozs7O0lBUzNFLCtGQUE2Rjs7Ozs7Ozs7SUFPN0YsbUZBQWtGOzs7Ozs7Ozs7Ozs7SUFZbEYscURBQWM7Ozs7Ozs7SUFPZCx3RUFBOEQ7Ozs7Ozs7O0lBUTlELHlFQUFpRTs7Ozs7Ozs7OztJQVNqRSx5RkFBa0c7Ozs7Ozs7Ozs7O0lBV2xHLDhEQUEwRTs7Ozs7SUFFMUUsMkRBQTJFOzs7Ozs7O0lBTTNFLHlFQUFnRjs7Ozs7SUFFaEYsK0RBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcCwgUGJsTWV0YUNvbHVtbiwgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi9yb3cnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQGFuZ3VsYXIvY2RrL3RhYmxlL3RhYmxlLmQnIHtcbiAgaW50ZXJmYWNlIFJvd0NvbnRleHQ8VD4ge1xuICAgIGdyaWRJbnN0YW5jZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDZWxsQ29udGV4dFN0YXRlPFQgPSBhbnk+IHtcbiAgZWRpdGluZzogYm9vbGVhbjtcbiAgZm9jdXNlZDogYm9vbGVhbjtcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUm93Q29udGV4dFN0YXRlPFQgPSBhbnk+IHtcbiAgaWRlbnRpdHk6IGFueTtcbiAgZGF0YUluZGV4OiBudW1iZXI7XG4gIGNlbGxzOiBDZWxsQ29udGV4dFN0YXRlPFQ+W107XG4gIGZpcnN0UmVuZGVyOiBib29sZWFuO1xufVxuXG4vKipcbiAqIEEgcmVmZXJlbmNlIHRvIGEgZGF0YSBjZWxsIG9uIHRoZSBncmlkLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdyaWREYXRhUG9pbnQge1xuICAvKipcbiAgICogVGhlIHJvdyBpZGVudGl0eS5cbiAgICogSWYgdGhlIGdyaWQgd2FzIHNldCB3aXRoIGFuIGlkZW50aXR5IHByb3BlcnR5IHVzZSB0aGUgdmFsdWUgb2YgdGhlIGlkZW50aXR5IG90aGVyd2lzZSwgdXNlIHRoZSBsb2NhdGlvbiBvZiB0aGUgcm93IGluIHRoZSBkYXRhc291cmNlLlxuICAgKi9cbiAgcm93SWRlbnQ6IGFueTtcbiAgLyoqXG4gICAqIFRoZSBjb2x1bW4gaW5kZXgsIHJlbGF0aXZlIHRvIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBzZXQgcHJvdmlkZWQgdG8gdGhlIGdyaWQuXG4gICAqIE5vdGUgdGhhdCB0aGlzIGlzIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiwgaW5jbHVkaW5nIGhpZGRlbiBjb2x1bW5zLlxuICAgKi9cbiAgY29sSW5kZXg6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQ2VsbFJlZmVyZW5jZSA9IEhUTUxFbGVtZW50IHwgR3JpZERhdGFQb2ludCB8IFBibE5ncmlkQ2VsbENvbnRleHQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudCB7XG4gIHByZXY6IEdyaWREYXRhUG9pbnQgfCB1bmRlZmluZWQ7XG4gIGN1cnI6IEdyaWREYXRhUG9pbnQgfCB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQge1xuICBhZGRlZDogR3JpZERhdGFQb2ludFtdO1xuICByZW1vdmVkOiBHcmlkRGF0YVBvaW50W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VCA9IGFueSwgVENvbCBleHRlbmRzIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gPSBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uPiB7XG4gICRpbXBsaWNpdDogUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VD47XG4gIGNvbDogVENvbDtcblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkQ2VsbENvbnRleHQ8VCA9IGFueSwgUCBleHRlbmRzIGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcCA9IGtleW9mIFBibENvbHVtblR5cGVEZWZpbml0aW9uRGF0YU1hcD4ge1xuICByb3dDb250ZXh0OiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4sXG4gICRpbXBsaWNpdDogUGJsTmdyaWRDZWxsQ29udGV4dDxUPjtcbiAgcm93OiBULFxuICB2YWx1ZTogYW55O1xuICBjb2w6IFBibENvbHVtbjtcbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcbiAgcmVhZG9ubHkgZWRpdGluZzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgZm9jdXNlZDogYm9vbGVhbjtcbiAgcmVhZG9ubHkgc2VsZWN0ZWQ6IGJvb2xlYW47XG5cbiAgc3RhcnRFZGl0KG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkO1xuICBzdG9wRWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZFJvd0NvbnRleHQ8VCA9IGFueT4gZXh0ZW5kcyBSb3dDb250ZXh0PFQ+IHtcbiAgaWRlbnRpdHk6IG51bWJlcjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBpdCBpcyB0aGUgZmlyc3QgdGltZSB0aGF0IHRoZSByb3cgaXMgcmVuZGVyZWQuXG4gICAqIE9uY2UgdGhlIHJvdyBsZWF2ZXMgdGhlIHZpZXcgdGhpcyB3aWxsIGJlIGZhbHNlIGFuZCB3aWxsIG5vdCBjaGFuZ2UuXG4gICAqXG4gICAqIE5vdGUgdGhhdCByZW5kZXJlZCBpdGVtcyBtaWdodCBhcHBlYXIgb3V0c2lkZSBvZiB0aGUgdmlld3BvcnQgaWYgdmlydHVhbCBzY3JvbGwgaXMgbm90IHNldCBhbmRcbiAgICogd2hlbiBzZXQgYnV0IHRoZSByb3cgaXMgcmVuZGVyZWQgYXMgcGFydCBvZiB0aGUgYnVmZmVyLlxuICAgKlxuICAgKiBUaGlzIGlzIHJlbGV2YW50IG9ubHkgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBzZXQuXG4gICAqL1xuICBmaXJzdFJlbmRlcjogYm9vbGVhbjtcblxuICAvKipcbiAgICogV2hlbiB0cnVlLCBpbmRpY2F0ZXMgdGhhdCB0aGUgcm93IGlzIHJlbmRlcmVkIG91dHNpZGUgb2YgdGhlIHZpZXdwb3J0LlxuICAgKlxuICAgKiBUaGUgaW5kaWNhdG9yIGlzIHVwZGF0ZWQgd2hlbiByb3dzIGFyZSByZW5kZXJlZCAoaS5lLiBub3QgbGl2ZSwgb24gc2Nyb2xsIGV2ZW50cykuXG4gICAqIFVuZGVyc3RhbmRpbmcgdGhpcyBiZWhhdmlvciBpcyBpbXBvcnRhbnQhISFcbiAgICpcbiAgICogRm9yIGxpdmUgdXBkYXRlZCwgeW91IGNhbiB1c2UgYHVwZGF0ZU91dE9mVmlld1N0YXRlKClgIHRvIHRyaWdnZXIgdXBkYXRlcyBmcm9tIGEgc2Nyb2xsIHN0cmVhbS4gKGtlZXAgdHJhY2sgb24gcGVyZm9ybWFuY2UpXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIHZpcnR1YWwgc2Nyb2xsIGlzIGVuYWJsZWQgYHRydWVgIGluZGljYXRlcyBhIGJ1ZmZlciByb3cuXG4gICAqL1xuICBvdXRPZlZpZXc6IGJvb2xlYW47XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbGVuZ3RoIG9mIGNlbGxzIGNvbnRleHQgc3RvcmVkIGluIHRoaXMgcm93XG4gICAqL1xuICByZWFkb25seSBsZW5ndGg6IG51bWJlcjtcblxuICBjZWxsKGluZGV4OiBudW1iZXIpOiBQYmxOZ3JpZENlbGxDb250ZXh0PFQ+IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc2hhbGxvdyBjb3B5IG9mIHRoZSBjdXJyZW50IGNlbGwncyBjb250ZXh0IGFycmF5LlxuICAgKi9cbiAgZ2V0Q2VsbHMoKTogUGJsTmdyaWRDZWxsQ29udGV4dDxUPltdO1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBgb3V0T2ZWaWV3YCBwcm9wZXJ0eS5cbiAgICovXG4gIHVwZGF0ZU91dE9mVmlld1N0YXRlKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRDb250ZXh0QXBpPFQgPSBhbnk+IHtcblxuICAvKipcbiAgICogVGhlIHJlZmVyZW5jZSB0byBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGNvbnRleHQuXG4gICAqIFlvdSBjYW4gcmV0cmlldmUgdGhlIGFjdHVhbCBjb250ZXh0IG9yIGNvbnRleHQgY2VsbCB1c2luZyBgZmluZFJvd0luVmlld2AgYW5kIC8gb3IgYGZpbmRSb3dJbkNhY2hlYC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgd2hlbiB2aXJ0dWFsIHNjcm9sbCBpcyBlbmFibGVkIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBjZWxsIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIHJlYWRvbmx5IGZvY3VzZWRDZWxsOiBHcmlkRGF0YVBvaW50IHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgKiBOb3RpZnkgd2hlbiB0aGUgZm9jdXMgaGFzIGNoYW5nZWQuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoZSBub3RpZmljYXRpb24gaXMgbm90IGltbWVkaWF0ZSwgaXQgd2lsbCBvY2N1ciBvbiB0aGUgY2xvc2VzdCBtaWNyby10YXNrIGFmdGVyIHRoZSBjaGFuZ2UuXG4gICAqL1xuICByZWFkb25seSBmb2N1c0NoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRGb2N1c0NoYW5nZWRFdmVudD47XG5cbiAgLyoqXG4gICAqIFRoZSByZWZlcmVuY2UgdG8gY3VycmVudGx5IHNlbGVjdGVkIHJhbmdlIG9mIGNlbGwncyBjb250ZXh0LlxuICAgKiBZb3UgY2FuIHJldHJpZXZlIHRoZSBhY3R1YWwgY29udGV4dCBvciBjb250ZXh0IGNlbGwgdXNpbmcgYGZpbmRSb3dJblZpZXdgIGFuZCAvIG9yIGBmaW5kUm93SW5DYWNoZWAuXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHdoZW4gdmlydHVhbCBzY3JvbGwgaXMgZW5hYmxlZCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGxzIGRvZXMgbm90IGhhdmUgdG8gZXhpc3QgaW4gdGhlIHZpZXcuXG4gICAqIElmIHRoaXMgaXMgdGhlIGNhc2UgYGZpbmRSb3dJblZpZXdgIHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgdXNlIGBmaW5kUm93SW5DYWNoZWAgaW5zdGVhZC5cbiAgICovXG4gIHJlYWRvbmx5IHNlbGVjdGVkQ2VsbHM6IEdyaWREYXRhUG9pbnRbXTtcbiAgLyoqXG4gICAqIE5vdGlmeSB3aGVuIHRoZSBzZWxlY3RlZCBjZWxscyBoYXMgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5IHNlbGVjdGlvbkNoYW5nZWQ6IE9ic2VydmFibGU8UGJsTmdyaWRTZWxlY3Rpb25DaGFuZ2VkRXZlbnQ+O1xuXG4gIC8qKlxuICAgKiBGb2N1cyB0aGUgcHJvdmlkZWQgY2VsbC5cbiAgICogSWYgYSBjZWxsIGlzIG5vdCBwcm92aWRlZCB3aWxsIHVuLWZvY3VzIChibHVyKSB0aGUgY3VycmVudGx5IGZvY3VzZWQgY2VsbCAoaWYgdGhlcmUgaXMgb25lKS5cbiAgICogQHBhcmFtIGNlbGxSZWYgQSBSZWZlcmVuY2UgdG8gdGhlIGNlbGxcbiAgICogQHBhcmFtIG1hcmtGb3JDaGVjayBNYXJrIHRoZSByb3cgZm9yIGNoYW5nZSBkZXRlY3Rpb25cbiAgICovXG4gIGZvY3VzQ2VsbChjZWxsUmVmPzogQ2VsbFJlZmVyZW5jZSB8IGJvb2xlYW4sIG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBTZWxlY3QgYWxsIHByb3ZpZGVkIGNlbGxzLlxuICAgKiBAcGFyYW0gY2VsbFJlZiBBIFJlZmVyZW5jZSB0byB0aGUgY2VsbFxuICAgKiBAcGFyYW0gbWFya0ZvckNoZWNrIE1hcmsgdGhlIHJvdyBmb3IgY2hhbmdlIGRldGVjdGlvblxuICAgKiBAcGFyYW0gY2xlYXJDdXJyZW50IENsZWFyIHRoZSBjdXJyZW50IHNlbGVjdGlvbiBiZWZvcmUgYXBwbHlpbmcgdGhlIG5ldyBzZWxlY3Rpb24uXG4gICAqIERlZmF1bHQgdG8gZmFsc2UgKGFkZCB0byBjdXJyZW50KS5cbiAgICovXG4gIHNlbGVjdENlbGxzKGNlbGxSZWZzOiBDZWxsUmVmZXJlbmNlW10sIG1hcmtGb3JDaGVjaz86IGJvb2xlYW4sIGNsZWFyQ3VycmVudD86IGJvb2xlYW4pOiB2b2lkO1xuICAvKipcbiAgICogVW5zZWxlY3QgYWxsIHByb3ZpZGVkIGNlbGxzLlxuICAgKiBJZiBjZWxscyBhcmUgbm90IHByb3ZpZGVkIHdpbGwgdW4tc2VsZWN0IGFsbCBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbHMuXG4gICAqIEBwYXJhbSBjZWxsUmVmIEEgUmVmZXJlbmNlIHRvIHRoZSBjZWxsXG4gICAqIEBwYXJhbSBtYXJrRm9yQ2hlY2sgTWFyayB0aGUgcm93IGZvciBjaGFuZ2UgZGV0ZWN0aW9uXG4gICAqL1xuICB1bnNlbGVjdENlbGxzKGNlbGxSZWZzPzogQ2VsbFJlZmVyZW5jZVtdIHwgYm9vbGVhbiwgbWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENsZWFyIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICAqIFRoaXMgbWV0aG9kIHdpbGwgcmVzZXQgdGhlIGNvbnRleHQgb2YgYWxsIGNlbGxzLlxuICAgKlxuICAgKiBJbiBtb3N0IGNhc2VzLCB5b3UgZG8gbm90IG5lZWQgdG8gcnVuIHRoaXMgbWV0aG9kIGJlY2F1c2UgaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHJ1biB3aGVuXG4gICAqIHRoZSBkYXRhc291cmNlIGlzIHJlcGxhY2VkIChlbnRpcmUgZGF0YXNvdXJjZSBpbnN0YW5jZSkuXG4gICAqXG4gICAqIEhvd2V2ZXIsIGlmIHlvdSBhcmUga2VlcGluZyB0aGUgc2FtZSBkYXRhc291cmNlIGJ1dCBzd2l0Y2hpbmcgZGF0YSBpbnRlcm5hbGx5IChvblRyaWdnZXIpXG4gICAqIHlvdSBjYW4gY2xlYXIgdGhlIGNvbnRleHQgdXNpbmcgdGhpcyBtZXRob2QuXG4gICAqL1xuICBjbGVhcigpOiB2b2lkO1xuXG4gICAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjdXJyZW50IHZpZXcuXG4gICAqIElmIHRoZSByb3cgaXMgbm90IGluIHRoZSB2aWV3IChvciBldmVuIG5vdCBpbiB0aGUgY2FjaGUpIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIHJldHVybnMgdGhlIHJvdydzIGNvbnRleHQgaW5zdGFuY2UgKGBQYmxSb3dDb250ZXh0YClcbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJblZpZXcocm93SWRlbnRpdHk6IGFueSk6IFBibFJvd0NvbnRleHQ8VD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRyeSB0byBmaW5kIGEgc3BlY2lmaWMgcm93IGNvbnRleHQsIHVzaW5nIHRoZSByb3cgaWRlbnRpdHksIGluIHRoZSBjb250ZXh0IGNhY2hlLlxuICAgKiBOb3RlIHRoYXQgdGhlIGNhY2hlIGRvZXMgbm90IGhvbGQgdGhlIGNvbnRleHQgaXRzZWxmIGJ1dCBvbmx5IHRoZSBzdGF0ZSB0aGF0IGNhbiBsYXRlciBiZSB1c2VkIHRvIHJldHJpZXZlIGEgY29udGV4dCBpbnN0YW5jZS4gVGhlIGNvbnRleHQgaW5zdGFuY2VcbiAgICogaXMgb25seSB1c2VkIGFzIGNvbnRleHQgZm9yIHJvd3MgaW4gdmlldy5cbiAgICogQHBhcmFtIHJvd0lkZW50aXR5IFRoZSByb3cncyBpZGVudGl0eS4gSWYgYSBzcGVjaWZpYyBpZGVudGl0eSBpcyB1c2VkLCBwbGVhc2UgcHJvdmlkZSBpdCBvdGhlcndpc2UgcHJvdmlkZSB0aGUgaW5kZXggb2YgdGhlIHJvdyBpbiB0aGUgZGF0YXNvdXJjZS5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnkpOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBUcnkgdG8gZmluZCBhIHNwZWNpZmljIHJvdyBjb250ZXh0LCB1c2luZyB0aGUgcm93IGlkZW50aXR5LCBpbiB0aGUgY29udGV4dCBjYWNoZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWNoZSBkb2VzIG5vdCBob2xkIHRoZSBjb250ZXh0IGl0c2VsZiBidXQgb25seSB0aGUgc3RhdGUgdGhhdCBjYW4gbGF0ZXIgYmUgdXNlZCB0byByZXRyaWV2ZSBhIGNvbnRleHQgaW5zdGFuY2UuIFRoZSBjb250ZXh0IGluc3RhbmNlXG4gICAqIGlzIG9ubHkgdXNlZCBhcyBjb250ZXh0IGZvciByb3dzIGluIHZpZXcuXG4gICAqIEBwYXJhbSByb3dJZGVudGl0eSBUaGUgcm93J3MgaWRlbnRpdHkuIElmIGEgc3BlY2lmaWMgaWRlbnRpdHkgaXMgdXNlZCwgcGxlYXNlIHByb3ZpZGUgaXQgb3RoZXJ3aXNlIHByb3ZpZGUgdGhlIGluZGV4IG9mIHRoZSByb3cgaW4gdGhlIGRhdGFzb3VyY2UuXG4gICAqIEBwYXJhbSBvZmZzZXQgV2hlbiBzZXQsIHJldHVybnMgdGhlIHJvdyBhdCB0aGUgb2Zmc2V0IGZyb20gdGhlIHJvdyB3aXRoIHRoZSBwcm92aWRlZCByb3cgaWRlbnRpdHkuIENhbiBiZSBhbnkgbnVtZXJpYyB2YWx1ZSAoZS5nIDUsIC02LCA0KS5cbiAgICogQHBhcmFtIGNyZWF0ZSBXaGV0aGVyIHRvIGNyZWF0ZSBhIG5ldyBzdGF0ZSBpZiB0aGUgY3VycmVudCBzdGF0ZSBkb2VzIG5vdCBleGlzdC5cbiAgICovXG4gIGZpbmRSb3dJbkNhY2hlKHJvd0lkZW50aXR5OiBhbnksIG9mZnNldDogbnVtYmVyLCBjcmVhdGU6IGJvb2xlYW4pOiBSb3dDb250ZXh0U3RhdGU8VD4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcm93IGNvbnRleHQgaW4gdGhlIHNwZWNpZmllZCBpbmRleC5cbiAgICpcbiAgICogVGhlIHNwZWNpZmllZCBpbmRleCByZWZlcnMgdG8gdGhlIHJlbmRlcmVkIGluZGV4IGFuZCBub3QgdGhlIGluZGV4IGluIHRoZSBkYXRhIHN0b3JlLlxuICAgKiBJZiB5b3UgYXJlIG5vdCB1c2luZyB2aXJ0dWFsIHNjcm9sbCB0aGUgcmVuZGVyZWQgaW5kZXggaXMgdGhlIHNhbWUgYXMgdGhlIGRhdGEgaW5kZXguXG4gICAqXG4gICAqID4gWW91IGNhbiB0cmFuc2Zvcm0gZGF0YSA8IC0tID4gcmVuZGVyIGluZGV4J3MgdXNpbmcgdGhlIGRhdGEgc291cmNlLlxuICAgKiBAcGFyYW0gcm93SW5kZXggVGhlIFJFTkRFUiBpbmRleCBwb3NpdGlvbiBvZiB0aGUgcm93LlxuICAgKi9cbiAgZ2V0Um93KHJvd0luZGV4OiBudW1iZXIgfCBIVE1MRWxlbWVudCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB8IHVuZGVmaW5lZDtcblxuICBnZXRDZWxsKGNlbGw6IEhUTUxFbGVtZW50IHwgR3JpZERhdGFQb2ludCk6IFBibE5ncmlkQ2VsbENvbnRleHQgfCB1bmRlZmluZWRcbiAgLyoqXG4gICAqIEdldCB0aGUgY2VsbCBjb250ZXh0IGluIHRoZSBzcGVjaWZpYyByb3cgaW5kZXggYW5kIGNvbHVtbiBpbmRleFxuICAgKiBAcGFyYW0gcm93SW5kZXggVGhlIGluZGV4IHBvc2l0aW9uIG9mIHRoZSByb3cuXG4gICAqIEBwYXJhbSBjb2xJbmRleCBUaGUgaW5kZXggcG9zaXRpb24gb2YgdGhlIGNvbHVtbi5cbiAgICovXG4gIGdldENlbGwocm93SW5kZXg6IG51bWJlciwgY29sSW5kZXg6IG51bWJlcik6IFBibE5ncmlkQ2VsbENvbnRleHQ8VD4gfCB1bmRlZmluZWQ7XG5cbiAgZ2V0RGF0YUl0ZW0oY2VsbDogQ2VsbFJlZmVyZW5jZSk6IGFueTtcbn1cbiJdfQ==