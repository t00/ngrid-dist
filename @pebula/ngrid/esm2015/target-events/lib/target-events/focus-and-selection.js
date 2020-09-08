/**
 * @fileoverview added by tsickle
 * Generated from: lib/target-events/focus-and-selection.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    () => targetEvents.grid.focusMode === 'cell');
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
    const { contextApi } = targetEvents.grid;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtYW5kLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2ZvY3VzLWFuZC1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBS3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7TUFFcEYsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7TUFDckQsc0JBQXNCOzs7O0FBQUcsQ0FBQyxLQUE2QyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUE7Ozs7OztBQUUzRyxNQUFNLFVBQVUsdUJBQXVCLENBQUMsWUFBd0M7O1VBQ3hFLGVBQWU7OztJQUFHLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sQ0FBQTs7VUFFOUQsUUFBUSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFFN0MsbUZBQW1GO0lBQ25GLFlBQVksQ0FBQyxPQUFPO1NBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVyQyxtRUFBbUU7SUFDbkUsWUFBWSxDQUFDLFNBQVM7U0FDbkIsSUFBSSxDQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFDdkIsTUFB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S0FBSyxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUM1RSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQzNFOztjQUNLLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNsRSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUUsV0FBVyxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsTUFBTSxFQUFFLEdBQUcsVUFBVSxDQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVGLENBQUM7Ozs7Ozs7OztJQVNELFNBQVMscUJBQXFCLENBQUMsYUFBNEIsRUFBRSxTQUFvQzs7Y0FDekYsUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQ3RGLElBQUksUUFBUSxFQUFFO1lBQ1osVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlHO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxlQUFlO1FBQ2YsYUFBYTtRQUNiLHdDQUF3QztLQUN6QyxDQUFBO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRha2VVbnRpbCwgc3dpdGNoTWFwLCBmaWx0ZXIsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExFRlRfQVJST1csIFVQX0FSUk9XLCBSSUdIVF9BUlJPVywgRE9XTl9BUlJPVyB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbmltcG9ydCB7IEdyaWREYXRhUG9pbnQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkUm93RXZlbnQsIFBibE5ncmlkQ2VsbEV2ZW50LCBQYmxOZ3JpZERhdGFDZWxsRXZlbnQgfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbiB9IGZyb20gJy4vdGFyZ2V0LWV2ZW50cy1wbHVnaW4nO1xuaW1wb3J0IHsgaXNDZWxsRXZlbnQsIGlzRGF0YUNlbGxFdmVudCwgcmFuZ2VCZXR3ZWVuLCBnZXRJbm5lckNlbGxzSW5SZWN0IH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGlzT3N4ID0gL15tYWMvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkpXG5jb25zdCBpc01haW5Nb3VzZUJ1dHRvbkNsaWNrID0gKGV2ZW50OiBQYmxOZ3JpZERhdGFDZWxsRXZlbnQ8YW55LCBNb3VzZUV2ZW50PikgPT4gZXZlbnQuc291cmNlLmJ1dHRvbiA9PT0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUZvY3VzQW5kU2VsZWN0aW9uKHRhcmdldEV2ZW50czogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4pIHtcbiAgY29uc3QgaXNDZWxsRm9jdXNNb2RlID0gKCkgPT4gdGFyZ2V0RXZlbnRzLmdyaWQuZm9jdXNNb2RlID09PSAnY2VsbCc7XG5cbiAgY29uc3QgaGFuZGxlcnMgPSBjcmVhdGVIYW5kbGVycyh0YXJnZXRFdmVudHMpO1xuXG4gIC8vIEhhbmRsZSBhcnJheSBrZXlzIG1vdmUgKHdpdGggc2hpZnQgZm9yIHNlbGVjdGlvbiwgd2l0aG91dCBmb3IgY2VsbCBmb2N1cyBjaGFuZ2UpXG4gIHRhcmdldEV2ZW50cy5rZXlEb3duXG4gICAgLnBpcGUoZmlsdGVyKGlzQ2VsbEZvY3VzTW9kZSkpXG4gICAgLnN1YnNjcmliZShoYW5kbGVycy5oYW5kbGVLZXlEb3duKTtcblxuICAvLyBIYW5kbGUgbW91c2UgZG93biBvbiBjZWxsIChmb2N1cykgYW5kIHRoZW4gbW92aW5nIGZvciBzZWxlY3Rpb24uXG4gIHRhcmdldEV2ZW50cy5tb3VzZURvd25cbiAgICAucGlwZShcbiAgICAgIGZpbHRlcihpc0NlbGxGb2N1c01vZGUpLFxuICAgICAgZmlsdGVyKGlzRGF0YUNlbGxFdmVudCksXG4gICAgICBmaWx0ZXIoaXNNYWluTW91c2VCdXR0b25DbGljayksXG4gICAgICB0YXAoIGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQuc291cmNlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudC5zb3VyY2UucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pLFxuICAgICAgdGFwKGhhbmRsZXJzLmhhbmRsZU1vdXNlRG93biksIC8vIGhhbmRsZSBtb3VzZSBkb3duIGZvY3VzXG4gICAgICBzd2l0Y2hNYXAoICgpID0+IHRhcmdldEV2ZW50cy5jZWxsRW50ZXIucGlwZSh0YWtlVW50aWwodGFyZ2V0RXZlbnRzLm1vdXNlVXApKSApLFxuICAgICAgZmlsdGVyKGlzRGF0YUNlbGxFdmVudCksXG4gICAgICBmaWx0ZXIoaXNNYWluTW91c2VCdXR0b25DbGljaylcbiAgICApXG4gICAgLnN1YnNjcmliZShoYW5kbGVycy5oYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeU1vdXNlQ2xpY2tBbmRNb3ZlKTsgLy8gbm93IGhhbmRsZSBtb3ZlbWVudHMgdW50aWwgbW91c2V1cFxuXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUhhbmRsZXJzKHRhcmdldEV2ZW50czogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4pIHtcbiAgY29uc3QgeyBjb250ZXh0QXBpIH0gPSB0YXJnZXRFdmVudHMuZ3JpZDtcblxuICBmdW5jdGlvbiBmb2N1c0NlbGwocm93SWRlbnQ6IGFueSwgY29sSW5kZXg6IG51bWJlciwgbWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnRleHRBcGkuZm9jdXNDZWxsKHsgcm93SWRlbnQsIGNvbEluZGV4IH0sIG1hcmtGb3JDaGVjayk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQ6IFBibE5ncmlkRGF0YUNlbGxFdmVudDxhbnksIE1vdXNlRXZlbnQ+KTogdm9pZCB7XG4gICAgaWYgKGNvbnRleHRBcGkuZm9jdXNlZENlbGwgJiYgZXZlbnQuc291cmNlLnNoaWZ0S2V5KSB7XG4gICAgICBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeU1vdXNlQ2xpY2tBbmRNb3ZlKGV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzT3N4ID8gZXZlbnQuc291cmNlLm1ldGFLZXkgOiBldmVudC5zb3VyY2UuY3RybEtleSkge1xuICAgICAgaWYgKGV2ZW50LmNvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgY29udGV4dEFwaS51bnNlbGVjdENlbGxzKFsgZXZlbnQuY29udGV4dCBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHRBcGkuc2VsZWN0Q2VsbHMoWyBldmVudC5jb250ZXh0IF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb2N1c0NlbGwoZXZlbnQuY29udGV4dC5yb3dDb250ZXh0LmlkZW50aXR5LCBldmVudC5jb250ZXh0LmluZGV4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50OiBQYmxOZ3JpZFJvd0V2ZW50IHwgUGJsTmdyaWRDZWxsRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2U6IEtleWJvYXJkRXZlbnQgPSBldmVudC5zb3VyY2UgYXMgYW55O1xuICAgIGlmIChpc0NlbGxFdmVudChldmVudCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZUNlbGwgPSBldmVudC5jZWxsVGFyZ2V0O1xuXG4gICAgICBsZXQgY29lZmY6IDEgfCAtMSA9IDE7XG4gICAgICBsZXQgYXhpczogJ2gnIHwgJ3YnO1xuXG4gICAgICBzd2l0Y2ggKHNvdXJjZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgY29lZmYgPSAtMTtcbiAgICAgICAgY2FzZSBET1dOX0FSUk9XOiAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1zd2l0Y2gtY2FzZS1mYWxsLXRocm91Z2hcbiAgICAgICAgICBheGlzID0gJ3YnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgY29lZmYgPSAtMTtcbiAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzogLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8tc3dpdGNoLWNhc2UtZmFsbC10aHJvdWdoXG4gICAgICAgICAgYXhpcyA9ICdoJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gY29udGV4dEFwaS5nZXRDZWxsKHNvdXJjZUNlbGwpO1xuICAgICAgY29uc3QgYWN0aXZlRm9jdXMgPSBjb250ZXh0QXBpLmZvY3VzZWRDZWxsIHx8IHtcbiAgICAgICAgcm93SWRlbnQ6IGNlbGxDb250ZXh0LnJvd0NvbnRleHQuaWRlbnRpdHksXG4gICAgICAgIGNvbEluZGV4OiBjZWxsQ29udGV4dC5pbmRleCxcbiAgICAgIH07XG5cbiAgICAgIGlmICghIXNvdXJjZS5zaGlmdEtleSkge1xuICAgICAgICBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeUFycm93cyhhY3RpdmVGb2N1cywgYXhpcyA9PT0gJ2gnID8gW2NvZWZmLCAwXSA6IFswLCBjb2VmZl0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlU2luZ2xlSXRlbUZvY3VzKGFjdGl2ZUZvY3VzLCBheGlzID09PSAnaCcgPyBbY29lZmYsIDBdIDogWzAsIGNvZWZmXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHNlbGVjdGlvbiBjaGFuZ2VzIGNhdXNlZCBPTkxZIGJ5IHRoZSB1c2Ugb2YgdGhlIGFycm93IGtleXMgd2l0aCBTSElGVCBrZXkuXG4gICAqXG4gICAqIFRoZSBpbXBsZW1lbnRhdGlvbiBpcyBOT1QgaW5jcmVtZW50YWwsIGl0IHdpbGwgcmUtY2FsY3VsYXRlIHRoZSBzZWxlY3RlZCBjZWxsIG9uIGV2ZXJ5IGFycm93IGtleSBwcmVzcyAoZXZlcnkgY2FsbCB0byB0aGlzIGZ1bmN0aW9uKS5cbiAgICpcbiAgICogRmlyc3QuIEEgc2ltcGxlIGFkamFjZW50IGNlbGwgZGV0ZWN0aW9uIGlzIHBlcmZvcm1lZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgY3VycmVudCBzZWxlY3RlZCBjZWxscyByZWxhdGl2ZSB0byB0aGVcbiAgICogc291cmNlIGNlbGwgKHVzdWFsbHkgdGhlIGZvY3VzZWQgY2VsbCkuIFdlIG9ubHkgY2FyZSBhYm91dCA0IGNlbGxzLCBhZGphY2VudCB0byB0aGUgc291cmNlIENlbGw6IFRvcCwgTGVmdCwgQm90dG9tLCBSaWdodFxuICAgKlxuICAgKiAgICDilIIgVCDilIJcbiAgICog4pSA4pSA4pSA4pS84pSA4pSA4pSA4pS84pSA4pSA4pSAXG4gICAqICBSIOKUgiBDIOKUgiBMXG4gICAqIOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUvOKUgOKUgOKUgFxuICAgKiAgICDilIIgQiDilIJcbiAgICpcbiAgICogV2UgY2FuIG9ubHkgaGF2ZSAxIHF1YXJ0ZXIgc2VsZWN0aW9uIHdpdGggQXJyb3cgc2VsZWN0aW9uIHNvIGl0IFRMLCBUUiwgQlIgb3IgQkwsIGFueSBvdGhlciBzZXR1cCB3aWxsIGNsZWFyIHRoZSBzZWxlY3Rpb24gYW5kIHN0YXJ0IGZyb20gc2NyYXRjaC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhlIGxvZ2ljIGluIHRoaXMgZnVuY3Rpb24gaXMgZm9yIHVzZSB3aXRoIGFycm93IGtleXMgKyBTSElGVCBrZXksIG90aGVyIHNlbGVjdGlvbiBsb2dpY1xuICAgKiBkb2VzIG5vdCBmaXQgdGhpcyBzY2VuYXJpbyAoZS5nLiBNT1VTRSBzZWxlY3Rpb24gb3IgQVJST1cgS0VZUyArIENUUkwgS0VZIHNlbGVjdGlvbilcbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZUNlbGxSZWYgQSBwb2ludCByZWZlcmVuY2UgdG8gdGhlIHNvdXJjZSBjZWxsIHRoZSBkaXJlY3Rpb24gaXMgcmVsYXRpdmUgdG9cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIG9mIHRoZSBuZXcgY2VsbC5cbiAgICogWzEgfCAtMSwgMF0gLT4gSE9SSVpPTlRBTFxuICAgKiBbMCwgMSB8IC0xXSAtPiBWRVJUSUNBTFxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uQ2hhbmdlQnlBcnJvd3Moc291cmNlQ2VsbFJlZjogR3JpZERhdGFQb2ludCwgZGlyZWN0aW9uOiBbMCwgMSB8IC0xXSB8IFsxIHwgLTEsIDBdKSB7XG4gICAgY29uc3QgeyByb3dJZGVudCwgY29sSW5kZXggfSA9IHNvdXJjZUNlbGxSZWY7XG4gICAgY29uc3Qgc291cmNlQ2VsbFN0YXRlID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShyb3dJZGVudCk7XG4gICAgY29uc3QgW21vdmVILCBtb3ZlVl0gPSBkaXJlY3Rpb247XG5cbiAgICBjb25zdCBoQWRqID0gWyBzb3VyY2VDZWxsU3RhdGUuY2VsbHNbY29sSW5kZXggLSAxXSwgc291cmNlQ2VsbFN0YXRlLmNlbGxzW2NvbEluZGV4ICsgMV0gXTtcbiAgICBjb25zdCB2QWRqID0gWyBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHJvd0lkZW50LCAtMSwgdHJ1ZSksIGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocm93SWRlbnQsIDEsIHRydWUpIF07XG5cbiAgICBsZXQgaCA9IChoQWRqWzBdICYmIGhBZGpbMF0uc2VsZWN0ZWQgPyAtMSA6IDApICsgKGhBZGpbMV0gJiYgaEFkalsxXS5zZWxlY3RlZCA/IDEgOiAwKTtcbiAgICBsZXQgdiA9ICh2QWRqWzBdICYmIHZBZGpbMF0uY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkID8gLTEgOiAwKSArICh2QWRqWzFdICYmIHZBZGpbMV0uY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkID8gMSA6IDApO1xuXG4gICAgaWYgKGggPT09IDApIHtcbiAgICAgIGggKz0gbW92ZUg7XG4gICAgfVxuICAgIGlmICh2ID09PSAwKSB7XG4gICAgICB2ICs9IG1vdmVWO1xuICAgIH1cblxuICAgIGNvbnN0IGhDZWxsczogR3JpZERhdGFQb2ludFtdID0gW107XG4gICAgaWYgKGggIT09IDApIHtcbiAgICAgIGxldCBoQ29udGV4dEluZGV4ID0gY29sSW5kZXg7XG4gICAgICBsZXQgaENvbnRleHQgPSBzb3VyY2VDZWxsU3RhdGUuY2VsbHNbY29sSW5kZXhdO1xuICAgICAgd2hpbGUgKGhDb250ZXh0ICYmIGhDb250ZXh0LnNlbGVjdGVkKSB7XG4gICAgICAgIGhDZWxscy5wdXNoKHsgcm93SWRlbnQsIGNvbEluZGV4OiBoQ29udGV4dEluZGV4IH0pO1xuICAgICAgICBoQ29udGV4dEluZGV4ICs9IGg7XG4gICAgICAgIGhDb250ZXh0ID0gc291cmNlQ2VsbFN0YXRlLmNlbGxzW2hDb250ZXh0SW5kZXhdO1xuICAgICAgfVxuXG4gICAgICBpZiAobW92ZUgpIHtcbiAgICAgICAgaWYgKGggPT09IG1vdmVIKSB7XG4gICAgICAgICAgaWYgKGhDb250ZXh0KSB7XG4gICAgICAgICAgICBoQ2VsbHMucHVzaCh7IHJvd0lkZW50LCBjb2xJbmRleDogaENvbnRleHRJbmRleCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaENlbGxzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdkNlbGxzOiBHcmlkRGF0YVBvaW50W10gPSBbIF07XG4gICAgaWYgKHYgIT09IDApIHtcbiAgICAgIGxldCB2Q29udGV4dElkZW50ID0gcm93SWRlbnQ7XG4gICAgICBsZXQgdkNvbnRleHQgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHZDb250ZXh0SWRlbnQsIHYsIHRydWUpO1xuICAgICAgd2hpbGUgKHZDb250ZXh0ICYmIHZDb250ZXh0LmNlbGxzW2NvbEluZGV4XS5zZWxlY3RlZCkge1xuICAgICAgICB2Q29udGV4dElkZW50ID0gdkNvbnRleHQuaWRlbnRpdHk7XG4gICAgICAgIHZDZWxscy5wdXNoKHsgcm93SWRlbnQ6IHZDb250ZXh0SWRlbnQsIGNvbEluZGV4IH0pO1xuICAgICAgICB2Q29udGV4dCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUodkNvbnRleHRJZGVudCwgdiwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb3ZlVikge1xuICAgICAgICBpZiAodiA9PT0gbW92ZVYpIHtcbiAgICAgICAgICBpZiAodkNvbnRleHQpIHtcbiAgICAgICAgICAgIHZDZWxscy5wdXNoKHsgcm93SWRlbnQ6IHZDb250ZXh0LmlkZW50aXR5LCBjb2xJbmRleCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdkNlbGxzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBjb25zdCBpbm5lckNlbGxzID0gZ2V0SW5uZXJDZWxsc0luUmVjdChjb250ZXh0QXBpLCBoQ2VsbHMsIHZDZWxscyk7XG4gICAgY29udGV4dEFwaS5zZWxlY3RDZWxscyhbIHNvdXJjZUNlbGxSZWYsIC4uLmhDZWxscywgLi4udkNlbGxzLCAuLi5pbm5lckNlbGxzIF0sIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmUoZXZlbnQ6IFBibE5ncmlkRGF0YUNlbGxFdmVudDxhbnksIE1vdXNlRXZlbnQ+KSB7XG4gICAgY29uc3QgY2VsbENvbnRleHQgPSBldmVudC5jb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZUZvY3VzID0gY29udGV4dEFwaS5mb2N1c2VkQ2VsbCB8fCB7XG4gICAgICByb3dJZGVudDogY2VsbENvbnRleHQucm93Q29udGV4dC5pZGVudGl0eSxcbiAgICAgIGNvbEluZGV4OiBjZWxsQ29udGV4dC5pbmRleCxcbiAgICB9O1xuICAgIGNvbnN0IGZvY3VzZWRSb3dTdGF0ZSA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoYWN0aXZlRm9jdXMucm93SWRlbnQpO1xuXG4gICAgY29uc3QgaENlbGxzOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcbiAgICBjb25zdCB2Q2VsbHM6IEdyaWREYXRhUG9pbnRbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpIG9mIHJhbmdlQmV0d2VlbihhY3RpdmVGb2N1cy5jb2xJbmRleCwgY2VsbENvbnRleHQuaW5kZXgpKSB7XG4gICAgICBoQ2VsbHMucHVzaCh7IHJvd0lkZW50OiBhY3RpdmVGb2N1cy5yb3dJZGVudCwgY29sSW5kZXg6IGkgfSk7XG4gICAgfVxuICAgIGhDZWxscy5wdXNoKHsgcm93SWRlbnQ6IGFjdGl2ZUZvY3VzLnJvd0lkZW50LCBjb2xJbmRleDogY2VsbENvbnRleHQuaW5kZXggfSk7XG5cbiAgICBjb25zdCByb3dIZWlnaHQgPSBNYXRoLmFicyhjZWxsQ29udGV4dC5yb3dDb250ZXh0LmRhdGFJbmRleCAtIGZvY3VzZWRSb3dTdGF0ZS5kYXRhSW5kZXgpO1xuICAgIGNvbnN0IGRpciA9IGZvY3VzZWRSb3dTdGF0ZS5kYXRhSW5kZXggPiBjZWxsQ29udGV4dC5yb3dDb250ZXh0LmRhdGFJbmRleCA/IC0xIDogMTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSByb3dIZWlnaHQ7IGkrKykge1xuICAgICAgY29uc3Qgc3RhdGUgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKGFjdGl2ZUZvY3VzLnJvd0lkZW50LCBkaXIgKiBpLCB0cnVlKTtcbiAgICAgIHZDZWxscy5wdXNoKHsgcm93SWRlbnQ6IHN0YXRlLmlkZW50aXR5LCBjb2xJbmRleDogYWN0aXZlRm9jdXMuY29sSW5kZXggfSk7XG4gICAgfVxuICAgIGNvbnN0IGlubmVyQ2VsbHMgPSBnZXRJbm5lckNlbGxzSW5SZWN0KGNvbnRleHRBcGksIGhDZWxscywgdkNlbGxzKTtcbiAgICBjb250ZXh0QXBpLnNlbGVjdENlbGxzKFsgYWN0aXZlRm9jdXMsIC4uLmhDZWxscywgLi4udkNlbGxzLCAuLi5pbm5lckNlbGxzIF0sIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHRoZSBmb2N1cyBmcm9tIHRoZSBzb3VyY2UgY2VsbCB0byBhIHN0cmFpZ2h0IGFkamFjZW50IGNlbGwgKG5vdCBkaWFnb25hbCkuXG4gICAqIEBwYXJhbSBzb3VyY2VDZWxsUmVmIEEgcG9pbnQgcmVmZXJlbmNlIHRvIHRoZSBzb3VyY2UgY2VsbCB0aGUgZGlyZWN0aW9uIGlzIHJlbGF0aXZlIHRvXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiBvZiB0aGUgbmV3IGNlbGwuXG4gICAqIFsxIHwgLTEsIDBdIC0+IEhPUklaT05UQUxcbiAgICogWzAsIDEgfCAtMV0gLT4gVkVSVElDQUxcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVNpbmdsZUl0ZW1Gb2N1cyhzb3VyY2VDZWxsUmVmOiBHcmlkRGF0YVBvaW50LCBkaXJlY3Rpb246IFswLCAxIHwgLTFdIHwgWzEgfCAtMSwgMF0pIHtcbiAgICBjb25zdCByb3dTdGF0ZSA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoc291cmNlQ2VsbFJlZi5yb3dJZGVudCwgZGlyZWN0aW9uWzFdLCB0cnVlKTtcbiAgICBpZiAocm93U3RhdGUpIHtcbiAgICAgIGNvbnRleHRBcGkuZm9jdXNDZWxsKHsgcm93SWRlbnQ6IHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleDogc291cmNlQ2VsbFJlZi5jb2xJbmRleCArIGRpcmVjdGlvblswXSB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhbmRsZU1vdXNlRG93bixcbiAgICBoYW5kbGVLZXlEb3duLFxuICAgIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmVcbiAgfVxufVxuXG4iXX0=