/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { takeUntil, switchMap, filter, tap } from 'rxjs/operators';
import { LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';
import { isCellEvent, isDataCellEvent, rangeBetween, getInnerCellsInRect } from './utils';
/** @type {?} */
var isOsx = /^mac/.test(navigator.platform.toLowerCase());
/** @type {?} */
var isMainMouseButtonClick = (/**
 * @param {?} event
 * @return {?}
 */
function (event) { return event.source.button === 0; });
var ɵ0 = isMainMouseButtonClick;
/**
 * @param {?} targetEvents
 * @return {?}
 */
export function handleFocusAndSelection(targetEvents) {
    /** @type {?} */
    var isCellFocusMode = (/**
     * @return {?}
     */
    function () { return targetEvents.table.focusMode === 'cell'; });
    /** @type {?} */
    var handlers = createHandlers(targetEvents);
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
    function (event) {
        event.source.stopPropagation();
        event.source.preventDefault();
    })), tap(handlers.handleMouseDown), // handle mouse down focus
    switchMap((/**
     * @return {?}
     */
    function () { return targetEvents.cellEnter.pipe(takeUntil(targetEvents.mouseUp)); })), filter(isDataCellEvent), filter(isMainMouseButtonClick))
        .subscribe(handlers.handleSelectionChangeByMouseClickAndMove); // now handle movements until mouseup
}
/**
 * @param {?} targetEvents
 * @return {?}
 */
function createHandlers(targetEvents) {
    var contextApi = targetEvents.table.contextApi;
    /**
     * @param {?} rowIdent
     * @param {?} colIndex
     * @param {?=} markForCheck
     * @return {?}
     */
    function focusCell(rowIdent, colIndex, markForCheck) {
        contextApi.focusCell({ rowIdent: rowIdent, colIndex: colIndex }, markForCheck);
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
        var source = (/** @type {?} */ (event.source));
        if (isCellEvent(event)) {
            /** @type {?} */
            var sourceCell = event.cellTarget;
            /** @type {?} */
            var coeff = 1;
            /** @type {?} */
            var axis = void 0;
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
            var cellContext = contextApi.getCell(sourceCell);
            /** @type {?} */
            var activeFocus = contextApi.focusedCell || {
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
        var rowIdent = sourceCellRef.rowIdent, colIndex = sourceCellRef.colIndex;
        /** @type {?} */
        var sourceCellState = contextApi.findRowInCache(rowIdent);
        var _a = tslib_1.__read(direction, 2), moveH = _a[0], moveV = _a[1];
        /** @type {?} */
        var hAdj = [sourceCellState.cells[colIndex - 1], sourceCellState.cells[colIndex + 1]];
        /** @type {?} */
        var vAdj = [contextApi.findRowInCache(rowIdent, -1, true), contextApi.findRowInCache(rowIdent, 1, true)];
        /** @type {?} */
        var h = (hAdj[0] && hAdj[0].selected ? -1 : 0) + (hAdj[1] && hAdj[1].selected ? 1 : 0);
        /** @type {?} */
        var v = (vAdj[0] && vAdj[0].cells[colIndex].selected ? -1 : 0) + (vAdj[1] && vAdj[1].cells[colIndex].selected ? 1 : 0);
        if (h === 0) {
            h += moveH;
        }
        if (v === 0) {
            v += moveV;
        }
        /** @type {?} */
        var hCells = [];
        if (h !== 0) {
            /** @type {?} */
            var hContextIndex = colIndex;
            /** @type {?} */
            var hContext = sourceCellState.cells[colIndex];
            while (hContext && hContext.selected) {
                hCells.push({ rowIdent: rowIdent, colIndex: hContextIndex });
                hContextIndex += h;
                hContext = sourceCellState.cells[hContextIndex];
            }
            if (moveH) {
                if (h === moveH) {
                    if (hContext) {
                        hCells.push({ rowIdent: rowIdent, colIndex: hContextIndex });
                    }
                }
                else {
                    hCells.pop();
                }
            }
        }
        /** @type {?} */
        var vCells = [];
        if (v !== 0) {
            /** @type {?} */
            var vContextIdent = rowIdent;
            /** @type {?} */
            var vContext = contextApi.findRowInCache(vContextIdent, v, true);
            while (vContext && vContext.cells[colIndex].selected) {
                vContextIdent = vContext.identity;
                vCells.push({ rowIdent: vContextIdent, colIndex: colIndex });
                vContext = contextApi.findRowInCache(vContextIdent, v, true);
            }
            if (moveV) {
                if (v === moveV) {
                    if (vContext) {
                        vCells.push({ rowIdent: vContext.identity, colIndex: colIndex });
                    }
                }
                else {
                    vCells.pop();
                }
            }
        }
        /** @type {?} */
        var innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells(tslib_1.__spread([sourceCellRef], hCells, vCells, innerCells), false, true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    function handleSelectionChangeByMouseClickAndMove(event) {
        var e_1, _a;
        /** @type {?} */
        var cellContext = event.context;
        /** @type {?} */
        var activeFocus = contextApi.focusedCell || {
            rowIdent: cellContext.rowContext.identity,
            colIndex: cellContext.index,
        };
        /** @type {?} */
        var focusedRowState = contextApi.findRowInCache(activeFocus.rowIdent);
        /** @type {?} */
        var hCells = [];
        /** @type {?} */
        var vCells = [];
        try {
            for (var _b = tslib_1.__values(rangeBetween(activeFocus.colIndex, cellContext.index)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var i = _c.value;
                hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: i });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        hCells.push({ rowIdent: activeFocus.rowIdent, colIndex: cellContext.index });
        /** @type {?} */
        var rowHeight = Math.abs(cellContext.rowContext.dataIndex - focusedRowState.dataIndex);
        /** @type {?} */
        var dir = focusedRowState.dataIndex > cellContext.rowContext.dataIndex ? -1 : 1;
        for (var i = 1; i <= rowHeight; i++) {
            /** @type {?} */
            var state = contextApi.findRowInCache(activeFocus.rowIdent, dir * i, true);
            vCells.push({ rowIdent: state.identity, colIndex: activeFocus.colIndex });
        }
        /** @type {?} */
        var innerCells = getInnerCellsInRect(contextApi, hCells, vCells);
        contextApi.selectCells(tslib_1.__spread([activeFocus], hCells, vCells, innerCells), false, true);
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
        var rowState = contextApi.findRowInCache(sourceCellRef.rowIdent, direction[1], true);
        if (rowState) {
            contextApi.focusCell({ rowIdent: rowState.identity, colIndex: sourceCellRef.colIndex + direction[0] }, true);
        }
    }
    return {
        handleMouseDown: handleMouseDown,
        handleKeyDown: handleKeyDown,
        handleSelectionChangeByMouseClickAndMove: handleSelectionChangeByMouseClickAndMove
    };
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtYW5kLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2ZvY3VzLWFuZC1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBS3RGLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFcEYsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7SUFDckQsc0JBQXNCOzs7O0FBQUcsVUFBQyxLQUE2QyxJQUFLLE9BQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFBOzs7Ozs7QUFFM0csTUFBTSxVQUFVLHVCQUF1QixDQUFDLFlBQXdDOztRQUN4RSxlQUFlOzs7SUFBRyxjQUFNLE9BQUEsWUFBWSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssTUFBTSxFQUF2QyxDQUF1QyxDQUFBOztRQUUvRCxRQUFRLEdBQUcsY0FBYyxDQUFDLFlBQVksQ0FBQztJQUU3QyxtRkFBbUY7SUFDbkYsWUFBWSxDQUFDLE9BQU87U0FDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUM3QixTQUFTLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXJDLG1FQUFtRTtJQUNuRSxZQUFZLENBQUMsU0FBUztTQUNuQixJQUFJLENBQ0gsTUFBTSxDQUFDLGVBQWUs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SSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUM3QixLQUFLLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDO1lBQzVFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDM0U7O1lBQ0ssVUFBVSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ2xFLFVBQVUsQ0FBQyxXQUFXLG1CQUFHLFdBQVcsR0FBSyxNQUFNLEVBQUssTUFBTSxFQUFLLFVBQVUsR0FBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUYsQ0FBQzs7Ozs7Ozs7O0lBU0QsU0FBUyxxQkFBcUIsQ0FBQyxhQUE0QixFQUFFLFNBQW9DOztZQUN6RixRQUFRLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDdEYsSUFBSSxRQUFRLEVBQUU7WUFDWixVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDOUc7SUFDSCxDQUFDO0lBRUQsT0FBTztRQUNMLGVBQWUsaUJBQUE7UUFDZixhQUFhLGVBQUE7UUFDYix3Q0FBd0MsMENBQUE7S0FDekMsQ0FBQTtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YWtlVW50aWwsIHN3aXRjaE1hcCwgZmlsdGVyLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMRUZUX0FSUk9XLCBVUF9BUlJPVywgUklHSFRfQVJST1csIERPV05fQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5pbXBvcnQgeyBHcmlkRGF0YVBvaW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFJvd0V2ZW50LCBQYmxOZ3JpZENlbGxFdmVudCwgUGJsTmdyaWREYXRhQ2VsbEV2ZW50IH0gZnJvbSAnLi9ldmVudHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4gfSBmcm9tICcuL3RhcmdldC1ldmVudHMtcGx1Z2luJztcbmltcG9ydCB7IGlzQ2VsbEV2ZW50LCBpc0RhdGFDZWxsRXZlbnQsIHJhbmdlQmV0d2VlbiwgZ2V0SW5uZXJDZWxsc0luUmVjdCB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBpc09zeCA9IC9ebWFjLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpKVxuY29uc3QgaXNNYWluTW91c2VCdXR0b25DbGljayA9IChldmVudDogUGJsTmdyaWREYXRhQ2VsbEV2ZW50PGFueSwgTW91c2VFdmVudD4pID0+IGV2ZW50LnNvdXJjZS5idXR0b24gPT09IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVGb2N1c0FuZFNlbGVjdGlvbih0YXJnZXRFdmVudHM6IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luKSB7XG4gIGNvbnN0IGlzQ2VsbEZvY3VzTW9kZSA9ICgpID0+IHRhcmdldEV2ZW50cy50YWJsZS5mb2N1c01vZGUgPT09ICdjZWxsJztcblxuICBjb25zdCBoYW5kbGVycyA9IGNyZWF0ZUhhbmRsZXJzKHRhcmdldEV2ZW50cyk7XG5cbiAgLy8gSGFuZGxlIGFycmF5IGtleXMgbW92ZSAod2l0aCBzaGlmdCBmb3Igc2VsZWN0aW9uLCB3aXRob3V0IGZvciBjZWxsIGZvY3VzIGNoYW5nZSlcbiAgdGFyZ2V0RXZlbnRzLmtleURvd25cbiAgICAucGlwZShmaWx0ZXIoaXNDZWxsRm9jdXNNb2RlKSlcbiAgICAuc3Vic2NyaWJlKGhhbmRsZXJzLmhhbmRsZUtleURvd24pO1xuXG4gIC8vIEhhbmRsZSBtb3VzZSBkb3duIG9uIGNlbGwgKGZvY3VzKSBhbmQgdGhlbiBtb3ZpbmcgZm9yIHNlbGVjdGlvbi5cbiAgdGFyZ2V0RXZlbnRzLm1vdXNlRG93blxuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGlzQ2VsbEZvY3VzTW9kZSksXG4gICAgICBmaWx0ZXIoaXNEYXRhQ2VsbEV2ZW50KSxcbiAgICAgIGZpbHRlcihpc01haW5Nb3VzZUJ1dHRvbkNsaWNrKSxcbiAgICAgIHRhcCggZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5zb3VyY2Uuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSksXG4gICAgICB0YXAoaGFuZGxlcnMuaGFuZGxlTW91c2VEb3duKSwgLy8gaGFuZGxlIG1vdXNlIGRvd24gZm9jdXNcbiAgICAgIHN3aXRjaE1hcCggKCkgPT4gdGFyZ2V0RXZlbnRzLmNlbGxFbnRlci5waXBlKHRha2VVbnRpbCh0YXJnZXRFdmVudHMubW91c2VVcCkpICksXG4gICAgICBmaWx0ZXIoaXNEYXRhQ2VsbEV2ZW50KSxcbiAgICAgIGZpbHRlcihpc01haW5Nb3VzZUJ1dHRvbkNsaWNrKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKGhhbmRsZXJzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmUpOyAvLyBub3cgaGFuZGxlIG1vdmVtZW50cyB1bnRpbCBtb3VzZXVwXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFuZGxlcnModGFyZ2V0RXZlbnRzOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbikge1xuICBjb25zdCB7IGNvbnRleHRBcGkgfSA9IHRhcmdldEV2ZW50cy50YWJsZTtcblxuICBmdW5jdGlvbiBmb2N1c0NlbGwocm93SWRlbnQ6IGFueSwgY29sSW5kZXg6IG51bWJlciwgbWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnRleHRBcGkuZm9jdXNDZWxsKHsgcm93SWRlbnQsIGNvbEluZGV4IH0sIG1hcmtGb3JDaGVjayk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZXZlbnQ6IFBibE5ncmlkRGF0YUNlbGxFdmVudDxhbnksIE1vdXNlRXZlbnQ+KTogdm9pZCB7XG4gICAgaWYgKGNvbnRleHRBcGkuZm9jdXNlZENlbGwgJiYgZXZlbnQuc291cmNlLnNoaWZ0S2V5KSB7XG4gICAgICBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeU1vdXNlQ2xpY2tBbmRNb3ZlKGV2ZW50KTtcbiAgICB9IGVsc2UgaWYgKGlzT3N4ID8gZXZlbnQuc291cmNlLm1ldGFLZXkgOiBldmVudC5zb3VyY2UuY3RybEtleSkge1xuICAgICAgaWYgKGV2ZW50LmNvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgY29udGV4dEFwaS51bnNlbGVjdENlbGxzKFsgZXZlbnQuY29udGV4dCBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHRBcGkuc2VsZWN0Q2VsbHMoWyBldmVudC5jb250ZXh0IF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb2N1c0NlbGwoZXZlbnQuY29udGV4dC5yb3dDb250ZXh0LmlkZW50aXR5LCBldmVudC5jb250ZXh0LmluZGV4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGV2ZW50OiBQYmxOZ3JpZFJvd0V2ZW50IHwgUGJsTmdyaWRDZWxsRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBzb3VyY2U6IEtleWJvYXJkRXZlbnQgPSBldmVudC5zb3VyY2UgYXMgYW55O1xuICAgIGlmIChpc0NlbGxFdmVudChldmVudCkpIHtcbiAgICAgIGNvbnN0IHNvdXJjZUNlbGwgPSBldmVudC5jZWxsVGFyZ2V0O1xuXG4gICAgICBsZXQgY29lZmY6IDEgfCAtMSA9IDE7XG4gICAgICBsZXQgYXhpczogJ2gnIHwgJ3YnO1xuXG4gICAgICBzd2l0Y2ggKHNvdXJjZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgICAgY29lZmYgPSAtMTtcbiAgICAgICAgY2FzZSBET1dOX0FSUk9XOiAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1zd2l0Y2gtY2FzZS1mYWxsLXRocm91Z2hcbiAgICAgICAgICBheGlzID0gJ3YnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgICAgY29lZmYgPSAtMTtcbiAgICAgICAgY2FzZSBSSUdIVF9BUlJPVzogLy8gdHNsaW50OmRpc2FibGUtbGluZTogbm8tc3dpdGNoLWNhc2UtZmFsbC10aHJvdWdoXG4gICAgICAgICAgYXhpcyA9ICdoJztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbGxDb250ZXh0ID0gY29udGV4dEFwaS5nZXRDZWxsKHNvdXJjZUNlbGwpO1xuICAgICAgY29uc3QgYWN0aXZlRm9jdXMgPSBjb250ZXh0QXBpLmZvY3VzZWRDZWxsIHx8IHtcbiAgICAgICAgcm93SWRlbnQ6IGNlbGxDb250ZXh0LnJvd0NvbnRleHQuaWRlbnRpdHksXG4gICAgICAgIGNvbEluZGV4OiBjZWxsQ29udGV4dC5pbmRleCxcbiAgICAgIH07XG5cbiAgICAgIGlmICghIXNvdXJjZS5zaGlmdEtleSkge1xuICAgICAgICBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeUFycm93cyhhY3RpdmVGb2N1cywgYXhpcyA9PT0gJ2gnID8gW2NvZWZmLCAwXSA6IFswLCBjb2VmZl0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlU2luZ2xlSXRlbUZvY3VzKGFjdGl2ZUZvY3VzLCBheGlzID09PSAnaCcgPyBbY29lZmYsIDBdIDogWzAsIGNvZWZmXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHNlbGVjdGlvbiBjaGFuZ2VzIGNhdXNlZCBPTkxZIGJ5IHRoZSB1c2Ugb2YgdGhlIGFycm93IGtleXMgd2l0aCBTSElGVCBrZXkuXG4gICAqXG4gICAqIFRoZSBpbXBsZW1lbnRhdGlvbiBpcyBOT1QgaW5jcmVtZW50YWwsIGl0IHdpbGwgcmUtY2FsY3VsYXRlIHRoZSBzZWxlY3RlZCBjZWxsIG9uIGV2ZXJ5IGFycm93IGtleSBwcmVzcyAoZXZlcnkgY2FsbCB0byB0aGlzIGZ1bmN0aW9uKS5cbiAgICpcbiAgICogRmlyc3QuIEEgc2ltcGxlIGFkamFjZW50IGNlbGwgZGV0ZWN0aW9uIGlzIHBlcmZvcm1lZCB0byBkZXRlcm1pbmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgY3VycmVudCBzZWxlY3RlZCBjZWxscyByZWxhdGl2ZSB0byB0aGVcbiAgICogc291cmNlIGNlbGwgKHVzdWFsbHkgdGhlIGZvY3VzZWQgY2VsbCkuIFdlIG9ubHkgY2FyZSBhYm91dCA0IGNlbGxzLCBhZGphY2VudCB0byB0aGUgc291cmNlIENlbGw6IFRvcCwgTGVmdCwgQm90dG9tLCBSaWdodFxuICAgKlxuICAgKiAgICDilIIgVCDilIJcbiAgICog4pSA4pSA4pSA4pS84pSA4pSA4pSA4pS84pSA4pSA4pSAXG4gICAqICBSIOKUgiBDIOKUgiBMXG4gICAqIOKUgOKUgOKUgOKUvOKUgOKUgOKUgOKUvOKUgOKUgOKUgFxuICAgKiAgICDilIIgQiDilIJcbiAgICpcbiAgICogV2UgY2FuIG9ubHkgaGF2ZSAxIHF1YXJ0ZXIgc2VsZWN0aW9uIHdpdGggQXJyb3cgc2VsZWN0aW9uIHNvIGl0IFRMLCBUUiwgQlIgb3IgQkwsIGFueSBvdGhlciBzZXR1cCB3aWxsIGNsZWFyIHRoZSBzZWxlY3Rpb24gYW5kIHN0YXJ0IGZyb20gc2NyYXRjaC5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhlIGxvZ2ljIGluIHRoaXMgZnVuY3Rpb24gaXMgZm9yIHVzZSB3aXRoIGFycm93IGtleXMgKyBTSElGVCBrZXksIG90aGVyIHNlbGVjdGlvbiBsb2dpY1xuICAgKiBkb2VzIG5vdCBmaXQgdGhpcyBzY2VuYXJpbyAoZS5nLiBNT1VTRSBzZWxlY3Rpb24gb3IgQVJST1cgS0VZUyArIENUUkwgS0VZIHNlbGVjdGlvbilcbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZUNlbGxSZWYgQSBwb2ludCByZWZlcmVuY2UgdG8gdGhlIHNvdXJjZSBjZWxsIHRoZSBkaXJlY3Rpb24gaXMgcmVsYXRpdmUgdG9cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIG9mIHRoZSBuZXcgY2VsbC5cbiAgICogWzEgfCAtMSwgMF0gLT4gSE9SSVpPTlRBTFxuICAgKiBbMCwgMSB8IC0xXSAtPiBWRVJUSUNBTFxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uQ2hhbmdlQnlBcnJvd3Moc291cmNlQ2VsbFJlZjogR3JpZERhdGFQb2ludCwgZGlyZWN0aW9uOiBbMCwgMSB8IC0xXSB8IFsxIHwgLTEsIDBdKSB7XG4gICAgY29uc3QgeyByb3dJZGVudCwgY29sSW5kZXggfSA9IHNvdXJjZUNlbGxSZWY7XG4gICAgY29uc3Qgc291cmNlQ2VsbFN0YXRlID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShyb3dJZGVudCk7XG4gICAgY29uc3QgW21vdmVILCBtb3ZlVl0gPSBkaXJlY3Rpb247XG5cbiAgICBjb25zdCBoQWRqID0gWyBzb3VyY2VDZWxsU3RhdGUuY2VsbHNbY29sSW5kZXggLSAxXSwgc291cmNlQ2VsbFN0YXRlLmNlbGxzW2NvbEluZGV4ICsgMV0gXTtcbiAgICBjb25zdCB2QWRqID0gWyBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHJvd0lkZW50LCAtMSwgdHJ1ZSksIGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocm93SWRlbnQsIDEsIHRydWUpIF07XG5cbiAgICBsZXQgaCA9IChoQWRqWzBdICYmIGhBZGpbMF0uc2VsZWN0ZWQgPyAtMSA6IDApICsgKGhBZGpbMV0gJiYgaEFkalsxXS5zZWxlY3RlZCA/IDEgOiAwKTtcbiAgICBsZXQgdiA9ICh2QWRqWzBdICYmIHZBZGpbMF0uY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkID8gLTEgOiAwKSArICh2QWRqWzFdICYmIHZBZGpbMV0uY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkID8gMSA6IDApO1xuXG4gICAgaWYgKGggPT09IDApIHtcbiAgICAgIGggKz0gbW92ZUg7XG4gICAgfVxuICAgIGlmICh2ID09PSAwKSB7XG4gICAgICB2ICs9IG1vdmVWO1xuICAgIH1cblxuICAgIGNvbnN0IGhDZWxsczogR3JpZERhdGFQb2ludFtdID0gW107XG4gICAgaWYgKGggIT09IDApIHtcbiAgICAgIGxldCBoQ29udGV4dEluZGV4ID0gY29sSW5kZXg7XG4gICAgICBsZXQgaENvbnRleHQgPSBzb3VyY2VDZWxsU3RhdGUuY2VsbHNbY29sSW5kZXhdO1xuICAgICAgd2hpbGUgKGhDb250ZXh0ICYmIGhDb250ZXh0LnNlbGVjdGVkKSB7XG4gICAgICAgIGhDZWxscy5wdXNoKHsgcm93SWRlbnQsIGNvbEluZGV4OiBoQ29udGV4dEluZGV4IH0pO1xuICAgICAgICBoQ29udGV4dEluZGV4ICs9IGg7XG4gICAgICAgIGhDb250ZXh0ID0gc291cmNlQ2VsbFN0YXRlLmNlbGxzW2hDb250ZXh0SW5kZXhdO1xuICAgICAgfVxuXG4gICAgICBpZiAobW92ZUgpIHtcbiAgICAgICAgaWYgKGggPT09IG1vdmVIKSB7XG4gICAgICAgICAgaWYgKGhDb250ZXh0KSB7XG4gICAgICAgICAgICBoQ2VsbHMucHVzaCh7IHJvd0lkZW50LCBjb2xJbmRleDogaENvbnRleHRJbmRleCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaENlbGxzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdkNlbGxzOiBHcmlkRGF0YVBvaW50W10gPSBbIF07XG4gICAgaWYgKHYgIT09IDApIHtcbiAgICAgIGxldCB2Q29udGV4dElkZW50ID0gcm93SWRlbnQ7XG4gICAgICBsZXQgdkNvbnRleHQgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHZDb250ZXh0SWRlbnQsIHYsIHRydWUpO1xuICAgICAgd2hpbGUgKHZDb250ZXh0ICYmIHZDb250ZXh0LmNlbGxzW2NvbEluZGV4XS5zZWxlY3RlZCkge1xuICAgICAgICB2Q29udGV4dElkZW50ID0gdkNvbnRleHQuaWRlbnRpdHk7XG4gICAgICAgIHZDZWxscy5wdXNoKHsgcm93SWRlbnQ6IHZDb250ZXh0SWRlbnQsIGNvbEluZGV4IH0pO1xuICAgICAgICB2Q29udGV4dCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUodkNvbnRleHRJZGVudCwgdiwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb3ZlVikge1xuICAgICAgICBpZiAodiA9PT0gbW92ZVYpIHtcbiAgICAgICAgICBpZiAodkNvbnRleHQpIHtcbiAgICAgICAgICAgIHZDZWxscy5wdXNoKHsgcm93SWRlbnQ6IHZDb250ZXh0LmlkZW50aXR5LCBjb2xJbmRleCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdkNlbGxzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG5cbiAgICBjb25zdCBpbm5lckNlbGxzID0gZ2V0SW5uZXJDZWxsc0luUmVjdChjb250ZXh0QXBpLCBoQ2VsbHMsIHZDZWxscyk7XG4gICAgY29udGV4dEFwaS5zZWxlY3RDZWxscyhbIHNvdXJjZUNlbGxSZWYsIC4uLmhDZWxscywgLi4udkNlbGxzLCAuLi5pbm5lckNlbGxzIF0sIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmUoZXZlbnQ6IFBibE5ncmlkRGF0YUNlbGxFdmVudDxhbnksIE1vdXNlRXZlbnQ+KSB7XG4gICAgY29uc3QgY2VsbENvbnRleHQgPSBldmVudC5jb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZUZvY3VzID0gY29udGV4dEFwaS5mb2N1c2VkQ2VsbCB8fCB7XG4gICAgICByb3dJZGVudDogY2VsbENvbnRleHQucm93Q29udGV4dC5pZGVudGl0eSxcbiAgICAgIGNvbEluZGV4OiBjZWxsQ29udGV4dC5pbmRleCxcbiAgICB9O1xuICAgIGNvbnN0IGZvY3VzZWRSb3dTdGF0ZSA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoYWN0aXZlRm9jdXMucm93SWRlbnQpO1xuXG4gICAgY29uc3QgaENlbGxzOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcbiAgICBjb25zdCB2Q2VsbHM6IEdyaWREYXRhUG9pbnRbXSA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBpIG9mIHJhbmdlQmV0d2VlbihhY3RpdmVGb2N1cy5jb2xJbmRleCwgY2VsbENvbnRleHQuaW5kZXgpKSB7XG4gICAgICBoQ2VsbHMucHVzaCh7IHJvd0lkZW50OiBhY3RpdmVGb2N1cy5yb3dJZGVudCwgY29sSW5kZXg6IGkgfSk7XG4gICAgfVxuICAgIGhDZWxscy5wdXNoKHsgcm93SWRlbnQ6IGFjdGl2ZUZvY3VzLnJvd0lkZW50LCBjb2xJbmRleDogY2VsbENvbnRleHQuaW5kZXggfSk7XG5cbiAgICBjb25zdCByb3dIZWlnaHQgPSBNYXRoLmFicyhjZWxsQ29udGV4dC5yb3dDb250ZXh0LmRhdGFJbmRleCAtIGZvY3VzZWRSb3dTdGF0ZS5kYXRhSW5kZXgpO1xuICAgIGNvbnN0IGRpciA9IGZvY3VzZWRSb3dTdGF0ZS5kYXRhSW5kZXggPiBjZWxsQ29udGV4dC5yb3dDb250ZXh0LmRhdGFJbmRleCA/IC0xIDogMTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSByb3dIZWlnaHQ7IGkrKykge1xuICAgICAgY29uc3Qgc3RhdGUgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKGFjdGl2ZUZvY3VzLnJvd0lkZW50LCBkaXIgKiBpLCB0cnVlKTtcbiAgICAgIHZDZWxscy5wdXNoKHsgcm93SWRlbnQ6IHN0YXRlLmlkZW50aXR5LCBjb2xJbmRleDogYWN0aXZlRm9jdXMuY29sSW5kZXggfSk7XG4gICAgfVxuICAgIGNvbnN0IGlubmVyQ2VsbHMgPSBnZXRJbm5lckNlbGxzSW5SZWN0KGNvbnRleHRBcGksIGhDZWxscywgdkNlbGxzKTtcbiAgICBjb250ZXh0QXBpLnNlbGVjdENlbGxzKFsgYWN0aXZlRm9jdXMsIC4uLmhDZWxscywgLi4udkNlbGxzLCAuLi5pbm5lckNlbGxzIF0sIGZhbHNlLCB0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTd2FwIHRoZSBmb2N1cyBmcm9tIHRoZSBzb3VyY2UgY2VsbCB0byBhIHN0cmFpZ2h0IGFkamFjZW50IGNlbGwgKG5vdCBkaWFnb25hbCkuXG4gICAqIEBwYXJhbSBzb3VyY2VDZWxsUmVmIEEgcG9pbnQgcmVmZXJlbmNlIHRvIHRoZSBzb3VyY2UgY2VsbCB0aGUgZGlyZWN0aW9uIGlzIHJlbGF0aXZlIHRvXG4gICAqIEBwYXJhbSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiBvZiB0aGUgbmV3IGNlbGwuXG4gICAqIFsxIHwgLTEsIDBdIC0+IEhPUklaT05UQUxcbiAgICogWzAsIDEgfCAtMV0gLT4gVkVSVElDQUxcbiAgICovXG4gIGZ1bmN0aW9uIGhhbmRsZVNpbmdsZUl0ZW1Gb2N1cyhzb3VyY2VDZWxsUmVmOiBHcmlkRGF0YVBvaW50LCBkaXJlY3Rpb246IFswLCAxIHwgLTFdIHwgWzEgfCAtMSwgMF0pIHtcbiAgICBjb25zdCByb3dTdGF0ZSA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoc291cmNlQ2VsbFJlZi5yb3dJZGVudCwgZGlyZWN0aW9uWzFdLCB0cnVlKTtcbiAgICBpZiAocm93U3RhdGUpIHtcbiAgICAgIGNvbnRleHRBcGkuZm9jdXNDZWxsKHsgcm93SWRlbnQ6IHJvd1N0YXRlLmlkZW50aXR5LCBjb2xJbmRleDogc291cmNlQ2VsbFJlZi5jb2xJbmRleCArIGRpcmVjdGlvblswXSB9LCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhbmRsZU1vdXNlRG93bixcbiAgICBoYW5kbGVLZXlEb3duLFxuICAgIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmVcbiAgfVxufVxuXG4iXX0=