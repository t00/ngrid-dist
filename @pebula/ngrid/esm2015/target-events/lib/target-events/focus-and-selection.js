/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { takeUntil, switchMap, filter, tap } from 'rxjs/operators';
import { LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { isCellEvent, isDataCellEvent, rangeBetween, getInnerCellsInRect } from './utils';
/** @type {?} */
const isOsx = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
const isMainMouseButtonClick = (/**
 * @param {?} event
 * @return {?}
 */
(event) => event.source.button === 0);
const ɵ0 = isMainMouseButtonClick;
/**
 * @param {?} targetEvents
 * @return {?}
 */
export function handleFocusAndSelection(targetEvents) {
    /** @type {?} */
    const isCellFocusMode = (/**
     * @return {?}
     */
    () => targetEvents.table.focusMode === 'cell');
    /** @type {?} */
    const handlers = createHandlers(targetEvents);
    // Handle array keys move (with shift for selection, without for cell focus change)
    targetEvents.keyDown
        .pipe(filter(isCellFocusMode))
        .subscribe(handlers.handleKeyDown);
    // Handle mouse down on cell (focus) and then moving for selection.
    targetEvents.mouseDown
        .pipe(filter(isCellFocusMode), filter(isDataCellEvent), filter(isMainMouseButtonClick), tap((/**
     * @param {?} event
     * @return {?}
     */
    event => {
        event.source.stopPropagation();
        event.source.preventDefault();
    })), tap(handlers.handleMouseDown), // handle mouse down focus
    switchMap((/**
     * @return {?}
     */
    () => targetEvents.cellEnter.pipe(takeUntil(targetEvents.mouseUp)))), filter(isDataCellEvent), filter(isMainMouseButtonClick))
        .subscribe(handlers.handleSelectionChangeByMouseClickAndMove); // now handle movements until mouseup
}
/**
 * @param {?} targetEvents
 * @return {?}
 */
function createHandlers(targetEvents) {
    const { contextApi } = targetEvents.table;
    /**
     * @param {?} rowIdent
     * @param {?} colIndex
     * @param {?=} markForCheck
     * @return {?}
     */
    function focusCell(rowIdent, colIndex, markForCheck) {
        contextApi.focusCell({ rowIdent, colIndex }, markForCheck);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleMouseDown(event) {
        if (contextApi.focusedCell && event.source.shiftKey) {
            handleSelectionChangeByMouseClickAndMove(event);
        }
        else if (isOsx ? event.source.metaKey : event.source.ctrlKey) {
            if (event.context.selected) {
                contextApi.unselectCells([event.context]);
            }
            else {
                contextApi.selectCells([event.context]);
            }
        }
        else {
            focusCell(event.context.rowContext.identity, event.context.index);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleKeyDown(event) {
        /** @type {?} */
        const source = (/** @type {?} */ (event.source));
        if (isCellEvent(event)) {
            /** @type {?} */
            const sourceCell = event.cellTarget;
            /** @type {?} */
            let coeff = 1;
            /** @type {?} */
            let axis;
            switch (source.keyCode) {
                case UP_ARROW:
                    coeff = -1;
                case DOWN_ARROW: // tslint:disable-line: no-switch-case-fall-through
                    axis = 'v';
                    break;
                case LEFT_ARROW:
                    coeff = -1;
                case RIGHT_ARROW: // tslint:disable-line: no-switch-case-fall-through
                    axis = 'h';
                    break;
                default:
                    return;
            }
            /** @type {?} */
            const cellContext = contextApi.getCell(sourceCell);
            /** @type {?} */
            const activeFocus = contextApi.focusedCell || {
                rowIdent: cellContext.rowContext.identity,
                colIndex: cellContext.index,
            };
            if (!!source.shiftKey) {
                handleSelectionChangeByArrows(activeFocus, axis === 'h' ? [coeff, 0] : [0, coeff]);
            }
            else {
                handleSingleItemFocus(activeFocus, axis === 'h' ? [coeff, 0] : [0, coeff]);
            }
        }
    }
    /**
     * Handle selection changes caused ONLY by the use of the arrow keys with SHIFT key.
     *
     * The implementation is NOT incremental, it will re-calculate the selected cell on every arrow key press (every call to this function).
     *
     * First. A simple adjacent cell detection is performed to determine the direction of the current selected cells relative to the
     * source cell (usually the focused cell). We only care about 4 cells, adjacent to the source Cell: Top, Left, Bottom, Right
     *
     *    │ T │
     * ───┼───┼───
     *  R │ C │ L
     * ───┼───┼───
     *    │ B │
     *
     * We can only have 1 quarter selection with Arrow selection so it TL, TR, BR or BL, any other setup will clear the selection and start from scratch.
     *
     * > Note that the logic in this function is for use with arrow keys + SHIFT key, other selection logic
     * does not fit this scenario (e.g. MOUSE selection or ARROW KEYS + CTRL KEY selection)
     *
     * @param {?} sourceCellRef A point reference to the source cell the direction is relative to
     * @param {?} direction The direction of the new cell.
     * [1 | -1, 0] -> HORIZONTAL
     * [0, 1 | -1] -> VERTICAL
     * @return {?}
     */
    function handleSelectionChangeByArrows(sourceCellRef, direction) {
        const { rowIdent, colIndex } = sourceCellRef;
        /** @type {?} */
        const sourceCellState = contextApi.findRowInCache(rowIdent);
        const [moveH, moveV] = direction;
        /** @type {?} */
        const hAdj = [sourceCellState.cells[colIndex - 1], sourceCellState.cells[colIndex + 1]];
        /** @type {?} */
        const vAdj = [contextApi.findRowInCache(rowIdent, -1, true), contextApi.findRowInCache(rowIdent, 1, true)];
        /** @type {?} */
        let h = (hAdj[0] && hAdj[0].selected ? -1 : 0) + (hAdj[1] && hAdj[1].selected ? 1 : 0);
        /** @type {?} */
        let v = (vAdj[0] && vAdj[0].cells[colIndex].selected ? -1 : 0) + (vAdj[1] && vAdj[1].cells[colIndex].selected ? 1 : 0);
        if (h === 0) {
            h += moveH;
        }
        if (v === 0) {
            v += moveV;
        }
        /** @type {?} */
        const hCells = [];
        if (h !== 0) {
            /** @type {?} */
            let hContextIndex = colIndex;
            /** @type {?} */
            let hContext = sourceCellState.cells[colIndex];
            while (hContext && hContext.selected) {
                hCells.push({ rowIdent, colIndex: hContextIndex });
                hContextIndex += h;
                hContext = sourceCellState.cells[hContextIndex];
            }
            if (moveH) {
                if (h === moveH) {
                    if (hContext) {
                        hCells.push({ rowIdent, colIndex: hContextIndex });
                    }
                }
                else {
                    hCells.pop();
                }
            }
        }
        /** @type {?} */
        const vCells = [];
        if (v !== 0) {
            /** @type {?} */
            let vContextIdent = rowIdent;
            /** @type {?} */
            let vContext = contextApi.findRowInCache(vContextIdent, v, true);
            while (vContext && vContext.cells[colIndex].selected) {
                vContextIdent = vContext.identity;
                vCells.push({ rowIdent: vContextIdent, colIndex });
                vContext = contextApi.findRowInCache(vContextIdent, v, true);
            }
            if (moveV) {
                if (v === moveV) {
                    if (vContext) {
                        vCells.push({ rowIdent: vContext.identity, colIndex });
                    }
                }
                else {
                    vCells.pop();
                }
            }
        }
        /** @type {?} */
        const innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells([sourceCellRef, ...hCells, ...vCells, ...innerCells], false, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleSelectionChangeByMouseClickAndMove(event) {
        /** @type {?} */
        const cellContext = event.context;
        /** @type {?} */
        const activeFocus = contextApi.focusedCell || {
            rowIdent: cellContext.rowContext.identity,
            colIndex: cellContext.index,
        };
        /** @type {?} */
        const focusedRowState = contextApi.findRowInCache(activeFocus.rowIdent);
        /** @type {?} */
        const hCells = [];
        /** @type {?} */
        const vCells = [];
        for (const i of rangeBetween(activeFocus.colIndex, cellContext.index)) {
            hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: i });
        }
        hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: cellContext.index });
        /** @type {?} */
        const rowHeight = Math.abs(cellContext.rowContext.dataIndex - focusedRowState.dataIndex);
        /** @type {?} */
        const dir = focusedRowState.dataIndex > cellContext.rowContext.dataIndex ? -1 : 1;
        for (let i = 1; i <= rowHeight; i++) {
            /** @type {?} */
            const state = contextApi.findRowInCache(activeFocus.rowIdent, dir * i, true);
            vCells.push({ rowIdent: state.identity, colIndex: activeFocus.colIndex });
        }
        /** @type {?} */
        const innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells([activeFocus, ...hCells, ...vCells, ...innerCells], false, true);
    }
    /**
     * Swap the focus from the source cell to a straight adjacent cell (not diagonal).
     * @param {?} sourceCellRef A point reference to the source cell the direction is relative to
     * @param {?} direction The direction of the new cell.
     * [1 | -1, 0] -> HORIZONTAL
     * [0, 1 | -1] -> VERTICAL
     * @return {?}
     */
    function handleSingleItemFocus(sourceCellRef, direction) {
        /** @type {?} */
        const rowState = contextApi.findRowInCache(sourceCellRef.rowIdent, direction[1], true);
        if (rowState) {
            contextApi.focusCell({ rowIdent: rowState.identity, colIndex: sourceCellRef.colIndex + direction[0] }, true);
        }
    }
    return {
        handleMouseDown,
        handleKeyDown,
        handleSelectionChangeByMouseClickAndMove
    };
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtYW5kLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2ZvY3VzLWFuZC1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFLdEYsT0FBTyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDOztNQUVwRixLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDOztNQUNyRCxzQkFBc0I7Ozs7QUFBRyxDQUFDLEtBQTZDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQTs7Ozs7O0FBRTNHLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxZQUF3Qzs7VUFDeEUsZUFBZTs7O0lBQUcsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxDQUFBOztVQUUvRCxRQUFRLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztJQUU3QyxtRkFBbUY7SUFDbkYsWUFBWSxDQUFDLE9BQU87U0FDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJDLG1FQUFtRTtJQUNuRSxZQUFZLENBQUMsU0FBUztTQUNuQixJQUFJLENBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUN2QixNQUFN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QUFLLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0U7O2NBQ0ssVUFBVSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7Ozs7Ozs7O0lBU0QsU0FBUyxxQkFBcUIsQ0FBQyxhQUE0QixFQUFFLFNBQW9DOztjQUN6RixRQUFRLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDdEYsSUFBSSxRQUFRLEVBQUU7WUFDWixVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUc7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLGVBQWU7UUFDZixhQUFhO1FBQ2Isd0NBQXdDO0tBQ3pDLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZVVudGlsLCBzd2l0Y2hNYXAsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgVVBfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgR3JpZERhdGFQb2ludCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRSb3dFdmVudCwgUGJsTmdyaWRDZWxsRXZlbnQsIFBibE5ncmlkRGF0YUNlbGxFdmVudCB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCB7IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luIH0gZnJvbSAnLi90YXJnZXQtZXZlbnRzLXBsdWdpbic7XG5pbXBvcnQgeyBpc0NlbGxFdmVudCwgaXNEYXRhQ2VsbEV2ZW50LCByYW5nZUJldHdlZW4sIGdldElubmVyQ2VsbHNJblJlY3QgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgaXNPc3ggPSAvXm1hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKSlcbmNvbnN0IGlzTWFpbk1vdXNlQnV0dG9uQ2xpY2sgPSAoZXZlbnQ6IFBibE5ncmlkRGF0YUNlbGxFdmVudDxhbnksIE1vdXNlRXZlbnQ+KSA9PiBldmVudC5zb3VyY2UuYnV0dG9uID09PSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRm9jdXNBbmRTZWxlY3Rpb24odGFyZ2V0RXZlbnRzOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbikge1xuICBjb25zdCBpc0NlbGxGb2N1c01vZGUgPSAoKSA9PiB0YXJnZXRFdmVudHMudGFibGUuZm9jdXNNb2RlID09PSAnY2VsbCc7XG5cbiAgY29uc3QgaGFuZGxlcnMgPSBjcmVhdGVIYW5kbGVycyh0YXJnZXRFdmVudHMpO1xuXG4gIC8vIEhhbmRsZSBhcnJheSBrZXlzIG1vdmUgKHdpdGggc2hpZnQgZm9yIHNlbGVjdGlvbiwgd2l0aG91dCBmb3IgY2VsbCBmb2N1cyBjaGFuZ2UpXG4gIHRhcmdldEV2ZW50cy5rZXlEb3duXG4gICAgLnBpcGUoZmlsdGVyKGlzQ2VsbEZvY3VzTW9kZSkpXG4gICAgLnN1YnNjcmliZShoYW5kbGVycy5oYW5kbGVLZXlEb3duKTtcblxuICAvLyBIYW5kbGUgbW91c2UgZG93biBvbiBjZWxsIChmb2N1cykgYW5kIHRoZW4gbW92aW5nIGZvciBzZWxlY3Rpb24uXG4gIHRhcmdldEV2ZW50cy5tb3VzZURvd25cbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihpc0NlbGxGb2N1c01vZGUpLFxuICAgICAgZmlsdGVyKGlzRGF0YUNlbGxFdmVudCksXG4gICAgICBmaWx0ZXIoaXNNYWluTW91c2VCdXR0b25DbGljayksXG4gICAgICB0YXAoIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQuc291cmNlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5zb3VyY2UucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pLFxuICAgICAgdGFwKGhhbmRsZXJzLmhhbmRsZU1vdXNlRG93biksIC8vIGhhbmRsZSBtb3VzZSBkb3duIGZvY3VzXG4gICAgICBzd2l0Y2hNYXAoICgpID0+IHRhcmdldEV2ZW50cy5jZWxsRW50ZXIucGlwZSh0YWtlVW50aWwodGFyZ2V0RXZlbnRzLm1vdXNlVXApKSApLFxuICAgICAgZmlsdGVyKGlzRGF0YUNlbGxFdmVudCksXG4gICAgICBmaWx0ZXIoaXNNYWluTW91c2VCdXR0b25DbGljaylcbiAgICApXG4gICAgLnN1YnNjcmliZShoYW5kbGVycy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeU1vdXNlQ2xpY2tBbmRNb3ZlKTsgLy8gbm93IGhhbmRsZSBtb3ZlbWVudHMgdW50aWwgbW91c2V1cFxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhbmRsZXJzKHRhcmdldEV2ZW50czogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4pIHtcbiAgY29uc3QgeyBjb250ZXh0QXBpIH0gPSB0YXJnZXRFdmVudHMudGFibGU7XG5cbiAgZnVuY3Rpb24gZm9jdXNDZWxsKHJvd0lkZW50OiBhbnksIGNvbEluZGV4OiBudW1iZXIsIG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb250ZXh0QXBpLmZvY3VzQ2VsbCh7IHJvd0lkZW50LCBjb2xJbmRleCB9LCBtYXJrRm9yQ2hlY2spO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VEb3duKGV2ZW50OiBQYmxOZ3JpZERhdGFDZWxsRXZlbnQ8YW55LCBNb3VzZUV2ZW50Pik6IHZvaWQge1xuICAgIGlmIChjb250ZXh0QXBpLmZvY3VzZWRDZWxsICYmIGV2ZW50LnNvdXJjZS5zaGlmdEtleSkge1xuICAgICAgaGFuZGxlU2VsZWN0aW9uQ2hhbmdlQnlNb3VzZUNsaWNrQW5kTW92ZShldmVudCk7XG4gICAgfSBlbHNlIGlmIChpc09zeCA/IGV2ZW50LnNvdXJjZS5tZXRhS2V5IDogZXZlbnQuc291cmNlLmN0cmxLZXkpIHtcbiAgICAgIGlmIChldmVudC5jb250ZXh0LnNlbGVjdGVkKSB7XG4gICAgICAgIGNvbnRleHRBcGkudW5zZWxlY3RDZWxscyhbIGV2ZW50LmNvbnRleHQgXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0QXBpLnNlbGVjdENlbGxzKFsgZXZlbnQuY29udGV4dCBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9jdXNDZWxsKGV2ZW50LmNvbnRleHQucm93Q29udGV4dC5pZGVudGl0eSwgZXZlbnQuY29udGV4dC5pbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlS2V5RG93bihldmVudDogUGJsTmdyaWRSb3dFdmVudCB8IFBibE5ncmlkQ2VsbEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3Qgc291cmNlOiBLZXlib2FyZEV2ZW50ID0gZXZlbnQuc291cmNlIGFzIGFueTtcbiAgICBpZiAoaXNDZWxsRXZlbnQoZXZlbnQpKSB7XG4gICAgICBjb25zdCBzb3VyY2VDZWxsID0gZXZlbnQuY2VsbFRhcmdldDtcblxuICAgICAgbGV0IGNvZWZmOiAxIHwgLTEgPSAxO1xuICAgICAgbGV0IGF4aXM6ICdoJyB8ICd2JztcblxuICAgICAgc3dpdGNoIChzb3VyY2Uua2V5Q29kZSkge1xuICAgICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICAgIGNvZWZmID0gLTE7XG4gICAgICAgIGNhc2UgRE9XTl9BUlJPVzogLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8tc3dpdGNoLWNhc2UtZmFsbC10aHJvdWdoXG4gICAgICAgICAgYXhpcyA9ICd2JztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgIGNvZWZmID0gLTE7XG4gICAgICAgIGNhc2UgUklHSFRfQVJST1c6IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLXN3aXRjaC1jYXNlLWZhbGwtdGhyb3VnaFxuICAgICAgICAgIGF4aXMgPSAnaCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjZWxsQ29udGV4dCA9IGNvbnRleHRBcGkuZ2V0Q2VsbChzb3VyY2VDZWxsKTtcbiAgICAgIGNvbnN0IGFjdGl2ZUZvY3VzID0gY29udGV4dEFwaS5mb2N1c2VkQ2VsbCB8fCB7XG4gICAgICAgIHJvd0lkZW50OiBjZWxsQ29udGV4dC5yb3dDb250ZXh0LmlkZW50aXR5LFxuICAgICAgICBjb2xJbmRleDogY2VsbENvbnRleHQuaW5kZXgsXG4gICAgICB9O1xuXG4gICAgICBpZiAoISFzb3VyY2Uuc2hpZnRLZXkpIHtcbiAgICAgICAgaGFuZGxlU2VsZWN0aW9uQ2hhbmdlQnlBcnJvd3MoYWN0aXZlRm9jdXMsIGF4aXMgPT09ICdoJyA/IFtjb2VmZiwgMF0gOiBbMCwgY29lZmZdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhhbmRsZVNpbmdsZUl0ZW1Gb2N1cyhhY3RpdmVGb2N1cywgYXhpcyA9PT0gJ2gnID8gW2NvZWZmLCAwXSA6IFswLCBjb2VmZl0pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBzZWxlY3Rpb24gY2hhbmdlcyBjYXVzZWQgT05MWSBieSB0aGUgdXNlIG9mIHRoZSBhcnJvdyBrZXlzIHdpdGggU0hJRlQga2V5LlxuICAgKlxuICAgKiBUaGUgaW1wbGVtZW50YXRpb24gaXMgTk9UIGluY3JlbWVudGFsLCBpdCB3aWxsIHJlLWNhbGN1bGF0ZSB0aGUgc2VsZWN0ZWQgY2VsbCBvbiBldmVyeSBhcnJvdyBrZXkgcHJlc3MgKGV2ZXJ5IGNhbGwgdG8gdGhpcyBmdW5jdGlvbikuXG4gICAqXG4gICAqIEZpcnN0LiBBIHNpbXBsZSBhZGphY2VudCBjZWxsIGRldGVjdGlvbiBpcyBwZXJmb3JtZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGN1cnJlbnQgc2VsZWN0ZWQgY2VsbHMgcmVsYXRpdmUgdG8gdGhlXG4gICAqIHNvdXJjZSBjZWxsICh1c3VhbGx5IHRoZSBmb2N1c2VkIGNlbGwpLiBXZSBvbmx5IGNhcmUgYWJvdXQgNCBjZWxscywgYWRqYWNlbnQgdG8gdGhlIHNvdXJjZSBDZWxsOiBUb3AsIExlZnQsIEJvdHRvbSwgUmlnaHRcbiAgICpcbiAgICogICAg4pSCIFQg4pSCXG4gICAqIOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUvOKUgOKUgOKUgFxuICAgKiAgUiDilIIgQyDilIIgTFxuICAgKiDilIDilIDilIDilLzilIDilIDilIDilLzilIDilIDilIBcbiAgICogICAg4pSCIEIg4pSCXG4gICAqXG4gICAqIFdlIGNhbiBvbmx5IGhhdmUgMSBxdWFydGVyIHNlbGVjdGlvbiB3aXRoIEFycm93IHNlbGVjdGlvbiBzbyBpdCBUTCwgVFIsIEJSIG9yIEJMLCBhbnkgb3RoZXIgc2V0dXAgd2lsbCBjbGVhciB0aGUgc2VsZWN0aW9uIGFuZCBzdGFydCBmcm9tIHNjcmF0Y2guXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoZSBsb2dpYyBpbiB0aGlzIGZ1bmN0aW9uIGlzIGZvciB1c2Ugd2l0aCBhcnJvdyBrZXlzICsgU0hJRlQga2V5LCBvdGhlciBzZWxlY3Rpb24gbG9naWNcbiAgICogZG9lcyBub3QgZml0IHRoaXMgc2NlbmFyaW8gKGUuZy4gTU9VU0Ugc2VsZWN0aW9uIG9yIEFSUk9XIEtFWVMgKyBDVFJMIEtFWSBzZWxlY3Rpb24pXG4gICAqXG4gICAqIEBwYXJhbSBzb3VyY2VDZWxsUmVmIEEgcG9pbnQgcmVmZXJlbmNlIHRvIHRoZSBzb3VyY2UgY2VsbCB0aGUgZGlyZWN0aW9uIGlzIHJlbGF0aXZlIHRvXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiBvZiB0aGUgbmV3IGNlbGwuXG4gICAqIFsxIHwgLTEsIDBdIC0+IEhPUklaT05UQUxcbiAgICogWzAsIDEgfCAtMV0gLT4gVkVSVElDQUxcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5QXJyb3dzKHNvdXJjZUNlbGxSZWY6IEdyaWREYXRhUG9pbnQsIGRpcmVjdGlvbjogWzAsIDEgfCAtMV0gfCBbMSB8IC0xLCAwXSkge1xuICAgIGNvbnN0IHsgcm93SWRlbnQsIGNvbEluZGV4IH0gPSBzb3VyY2VDZWxsUmVmO1xuICAgIGNvbnN0IHNvdXJjZUNlbGxTdGF0ZSA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocm93SWRlbnQpO1xuICAgIGNvbnN0IFttb3ZlSCwgbW92ZVZdID0gZGlyZWN0aW9uO1xuXG4gICAgY29uc3QgaEFkaiA9IFsgc291cmNlQ2VsbFN0YXRlLmNlbGxzW2NvbEluZGV4IC0gMV0sIHNvdXJjZUNlbGxTdGF0ZS5jZWxsc1tjb2xJbmRleCArIDFdIF07XG4gICAgY29uc3QgdkFkaiA9IFsgY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShyb3dJZGVudCwgLTEsIHRydWUpLCBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHJvd0lkZW50LCAxLCB0cnVlKSBdO1xuXG4gICAgbGV0IGggPSAoaEFkalswXSAmJiBoQWRqWzBdLnNlbGVjdGVkID8gLTEgOiAwKSArIChoQWRqWzFdICYmIGhBZGpbMV0uc2VsZWN0ZWQgPyAxIDogMCk7XG4gICAgbGV0IHYgPSAodkFkalswXSAmJiB2QWRqWzBdLmNlbGxzW2NvbEluZGV4XS5zZWxlY3RlZCA/IC0xIDogMCkgKyAodkFkalsxXSAmJiB2QWRqWzFdLmNlbGxzW2NvbEluZGV4XS5zZWxlY3RlZCA/IDEgOiAwKTtcblxuICAgIGlmIChoID09PSAwKSB7XG4gICAgICBoICs9IG1vdmVIO1xuICAgIH1cbiAgICBpZiAodiA9PT0gMCkge1xuICAgICAgdiArPSBtb3ZlVjtcbiAgICB9XG5cbiAgICBjb25zdCBoQ2VsbHM6IEdyaWREYXRhUG9pbnRbXSA9IFtdO1xuICAgIGlmIChoICE9PSAwKSB7XG4gICAgICBsZXQgaENvbnRleHRJbmRleCA9IGNvbEluZGV4O1xuICAgICAgbGV0IGhDb250ZXh0ID0gc291cmNlQ2VsbFN0YXRlLmNlbGxzW2NvbEluZGV4XTtcbiAgICAgIHdoaWxlIChoQ29udGV4dCAmJiBoQ29udGV4dC5zZWxlY3RlZCkge1xuICAgICAgICBoQ2VsbHMucHVzaCh7IHJvd0lkZW50LCBjb2xJbmRleDogaENvbnRleHRJbmRleCB9KTtcbiAgICAgICAgaENvbnRleHRJbmRleCArPSBoO1xuICAgICAgICBoQ29udGV4dCA9IHNvdXJjZUNlbGxTdGF0ZS5jZWxsc1toQ29udGV4dEluZGV4XTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdmVIKSB7XG4gICAgICAgIGlmIChoID09PSBtb3ZlSCkge1xuICAgICAgICAgIGlmIChoQ29udGV4dCkge1xuICAgICAgICAgICAgaENlbGxzLnB1c2goeyByb3dJZGVudCwgY29sSW5kZXg6IGhDb250ZXh0SW5kZXggfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhDZWxscy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZDZWxsczogR3JpZERhdGFQb2ludFtdID0gWyBdO1xuICAgIGlmICh2ICE9PSAwKSB7XG4gICAgICBsZXQgdkNvbnRleHRJZGVudCA9IHJvd0lkZW50O1xuICAgICAgbGV0IHZDb250ZXh0ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZSh2Q29udGV4dElkZW50LCB2LCB0cnVlKTtcbiAgICAgIHdoaWxlICh2Q29udGV4dCAmJiB2Q29udGV4dC5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQpIHtcbiAgICAgICAgdkNvbnRleHRJZGVudCA9IHZDb250ZXh0LmlkZW50aXR5O1xuICAgICAgICB2Q2VsbHMucHVzaCh7IHJvd0lkZW50OiB2Q29udGV4dElkZW50LCBjb2xJbmRleCB9KTtcbiAgICAgICAgdkNvbnRleHQgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHZDb250ZXh0SWRlbnQsIHYsIHRydWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAobW92ZVYpIHtcbiAgICAgICAgaWYgKHYgPT09IG1vdmVWKSB7XG4gICAgICAgICAgaWYgKHZDb250ZXh0KSB7XG4gICAgICAgICAgICB2Q2VsbHMucHVzaCh7IHJvd0lkZW50OiB2Q29udGV4dC5pZGVudGl0eSwgY29sSW5kZXggfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZDZWxscy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgY29uc3QgaW5uZXJDZWxscyA9IGdldElubmVyQ2VsbHNJblJlY3QoY29udGV4dEFwaSwgaENlbGxzLCB2Q2VsbHMpO1xuICAgIGNvbnRleHRBcGkuc2VsZWN0Q2VsbHMoWyBzb3VyY2VDZWxsUmVmLCAuLi5oQ2VsbHMsIC4uLnZDZWxscywgLi4uaW5uZXJDZWxscyBdLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeU1vdXNlQ2xpY2tBbmRNb3ZlKGV2ZW50OiBQYmxOZ3JpZERhdGFDZWxsRXZlbnQ8YW55LCBNb3VzZUV2ZW50Pikge1xuICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gZXZlbnQuY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVGb2N1cyA9IGNvbnRleHRBcGkuZm9jdXNlZENlbGwgfHwge1xuICAgICAgcm93SWRlbnQ6IGNlbGxDb250ZXh0LnJvd0NvbnRleHQuaWRlbnRpdHksXG4gICAgICBjb2xJbmRleDogY2VsbENvbnRleHQuaW5kZXgsXG4gICAgfTtcbiAgICBjb25zdCBmb2N1c2VkUm93U3RhdGUgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKGFjdGl2ZUZvY3VzLnJvd0lkZW50KTtcblxuICAgIGNvbnN0IGhDZWxsczogR3JpZERhdGFQb2ludFtdID0gW107XG4gICAgY29uc3QgdkNlbGxzOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgaSBvZiByYW5nZUJldHdlZW4oYWN0aXZlRm9jdXMuY29sSW5kZXgsIGNlbGxDb250ZXh0LmluZGV4KSkge1xuICAgICAgaENlbGxzLnB1c2goeyByb3dJZGVudDogYWN0aXZlRm9jdXMucm93SWRlbnQsIGNvbEluZGV4OiBpIH0pO1xuICAgIH1cbiAgICBoQ2VsbHMucHVzaCh7IHJvd0lkZW50OiBhY3RpdmVGb2N1cy5yb3dJZGVudCwgY29sSW5kZXg6IGNlbGxDb250ZXh0LmluZGV4IH0pO1xuXG4gICAgY29uc3Qgcm93SGVpZ2h0ID0gTWF0aC5hYnMoY2VsbENvbnRleHQucm93Q29udGV4dC5kYXRhSW5kZXggLSBmb2N1c2VkUm93U3RhdGUuZGF0YUluZGV4KTtcbiAgICBjb25zdCBkaXIgPSBmb2N1c2VkUm93U3RhdGUuZGF0YUluZGV4ID4gY2VsbENvbnRleHQucm93Q29udGV4dC5kYXRhSW5kZXggPyAtMSA6IDE7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gcm93SGVpZ2h0OyBpKyspIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShhY3RpdmVGb2N1cy5yb3dJZGVudCwgZGlyICogaSwgdHJ1ZSk7XG4gICAgICB2Q2VsbHMucHVzaCh7IHJvd0lkZW50OiBzdGF0ZS5pZGVudGl0eSwgY29sSW5kZXg6IGFjdGl2ZUZvY3VzLmNvbEluZGV4IH0pO1xuICAgIH1cbiAgICBjb25zdCBpbm5lckNlbGxzID0gZ2V0SW5uZXJDZWxsc0luUmVjdChjb250ZXh0QXBpLCBoQ2VsbHMsIHZDZWxscyk7XG4gICAgY29udGV4dEFwaS5zZWxlY3RDZWxscyhbIGFjdGl2ZUZvY3VzLCAuLi5oQ2VsbHMsIC4uLnZDZWxscywgLi4uaW5uZXJDZWxscyBdLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU3dhcCB0aGUgZm9jdXMgZnJvbSB0aGUgc291cmNlIGNlbGwgdG8gYSBzdHJhaWdodCBhZGphY2VudCBjZWxsIChub3QgZGlhZ29uYWwpLlxuICAgKiBAcGFyYW0gc291cmNlQ2VsbFJlZiBBIHBvaW50IHJlZmVyZW5jZSB0byB0aGUgc291cmNlIGNlbGwgdGhlIGRpcmVjdGlvbiBpcyByZWxhdGl2ZSB0b1xuICAgKiBAcGFyYW0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gb2YgdGhlIG5ldyBjZWxsLlxuICAgKiBbMSB8IC0xLCAwXSAtPiBIT1JJWk9OVEFMXG4gICAqIFswLCAxIHwgLTFdIC0+IFZFUlRJQ0FMXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVTaW5nbGVJdGVtRm9jdXMoc291cmNlQ2VsbFJlZjogR3JpZERhdGFQb2ludCwgZGlyZWN0aW9uOiBbMCwgMSB8IC0xXSB8IFsxIHwgLTEsIDBdKSB7XG4gICAgY29uc3Qgcm93U3RhdGUgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHNvdXJjZUNlbGxSZWYucm93SWRlbnQsIGRpcmVjdGlvblsxXSwgdHJ1ZSk7XG4gICAgaWYgKHJvd1N0YXRlKSB7XG4gICAgICBjb250ZXh0QXBpLmZvY3VzQ2VsbCh7IHJvd0lkZW50OiByb3dTdGF0ZS5pZGVudGl0eSwgY29sSW5kZXg6IHNvdXJjZUNlbGxSZWYuY29sSW5kZXggKyBkaXJlY3Rpb25bMF0gfSwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVNb3VzZURvd24sXG4gICAgaGFuZGxlS2V5RG93bixcbiAgICBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeU1vdXNlQ2xpY2tBbmRNb3ZlXG4gIH1cbn1cblxuIl19