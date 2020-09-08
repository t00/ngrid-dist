/**
 * @fileoverview added by tsickle
 * Generated from: lib/target-events/focus-and-selection.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread, __values } from "tslib";
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
    function () { return targetEvents.grid.focusMode === 'cell'; });
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
    var contextApi = targetEvents.grid.contextApi;
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
        var _a = __read(direction, 2), moveH = _a[0], moveV = _a[1];
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
        contextApi.selectCells(__spread([sourceCellRef], hCells, vCells, innerCells), false, true);
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
            for (var _b = __values(rangeBetween(activeFocus.colIndex, cellContext.index)), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        contextApi.selectCells(__spread([activeFocus], hCells, vCells, innerCells), false, true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtYW5kLXNlbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2ZvY3VzLWFuZC1zZWxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUt0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7O0lBRXBGLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7O0lBQ3JELHNCQUFzQjs7OztBQUFHLFVBQUMsS0FBNkMsSUFBSyxPQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQTs7Ozs7O0FBRTNHLE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxZQUF3Qzs7UUFDeEUsZUFBZTs7O0lBQUcsY0FBTSxPQUFBLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBdEMsQ0FBc0MsQ0FBQTs7UUFFOUQsUUFBUSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUM7SUFFN0MsbUZBQW1GO0lBQ25GLFlBQVksQ0FBQyxPQUFPO1NBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDN0IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVyQyxtRUFBbUU7SUFDbkUsWUFBWSxDQUFDLFNBQVM7U0FDbkIsSUFBSSxDQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFDdkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUN2QixNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFDOUIsR0FBRzs7OztJQUFFLFVBQUEsS0FBSztRQUNSLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNoQyxDQUFDLEVBQUMsRUFDRixHQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLDBCQUEwQjtJQUN6RCxTQUFTOzs7SUFBRSxjQUFNLE9BQUEsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUE1RCxDQUE0RCxFQUFFLEVBQy9FLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFDdkIsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQy9CO1NBQ0EsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLENBQUMscUNBQXFDO0FBRXhHLENBQUM7Ozs7O0FBRUQsU0FBUyxjQUFjLENBQUMsWUFBd0M7SUFDdEQsSUFBQSx5Q0FBVTs7Ozs7OztJQUVsQixTQUFTLFNBQVMsQ0FBQyxRQUFhLEVBQUUsUUFBZ0IsRUFBRSxZQUFzQjtRQUN4RSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxVQUFBLEVBQUUsUUFBUSxVQUFBLEVBQUUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3RCxDQUFDOzs7OztJQUVELFNBQVMsZUFBZSxDQUFDLEtBQTZDO1FBQ3BFLElBQUksVUFBVSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNuRCx3Q0FBd0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRDthQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDOUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDMUIsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNMLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBRSxLQUFLLENBQUMsT0FBTyxDQUFFLENBQUMsQ0FBQzthQUMzQztTQUNGO2FBQU07WUFDTCxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkU7SUFDSCxDQUFDOzs7OztJQUVELFNBQVMsYUFBYSxDQUFDLEtBQTJDOztZQUMxRCxNQUFNLEdBQWtCLG1CQUFBLEtBQUssQ0FBQyxNQUFNLEVBQU87UUFDakQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7O2dCQUNoQixVQUFVLEdBQUcsS0FBSyxDQUFDLFVBQVU7O2dCQUUvQixLQUFLLEdBQVcsQ0FBQzs7Z0JBQ2pCLElBQUksU0FBVztZQUVuQixRQUFRLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ3RCLEtBQUssUUFBUTtvQkFDWCxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSyxVQUFVLEVBQUUsbURBQW1EO29CQUNsRSxJQUFJLEdBQUcsR0FBRyxDQUFDO29CQUNYLE1BQU07Z0JBQ1IsS0FBSyxVQUFVO29CQUNiLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFLLFdBQVcsRUFBRSxtREFBbUQ7b0JBQ25FLElBQUksR0FBRyxHQUFHLENBQUM7b0JBQ1gsTUFBTTtnQkFDUjtvQkFDRSxPQUFPO2FBQ1Y7O2dCQUVLLFdBQVcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzs7Z0JBQzVDLFdBQVcsR0FBRyxVQUFVLENBQUMsV0FBVyxJQUFJO2dCQUM1QyxRQUFRLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUN6QyxRQUFRLEVBQUUsV0FBVyxDQUFDLEtBQUs7YUFDNUI7WUFFRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNyQiw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDcEY7aUJBQU07Z0JBQ0wscUJBQXFCLENBQUMsV0FBVyxFQUFFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFBO2FBQzNFO1NBQ0Y7SUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBCRCxTQUFTLDZCQUE2QixDQUFDLGFBQTRCLEVBQUUsU0FBb0M7UUFDL0YsSUFBQSxpQ0FBUSxFQUFFLGlDQUFROztZQUNwQixlQUFlLEdBQUcsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDckQsSUFBQSx5QkFBMEIsRUFBekIsYUFBSyxFQUFFLGFBQWtCOztZQUUxQixJQUFJLEdBQUcsQ0FBRSxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBRTs7WUFDbkYsSUFBSSxHQUFHLENBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFFOztZQUV4RyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUNsRixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1gsQ0FBQyxJQUFJLEtBQUssQ0FBQztTQUNaO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1gsQ0FBQyxJQUFJLEtBQUssQ0FBQztTQUNaOztZQUVLLE1BQU0sR0FBb0IsRUFBRTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7O2dCQUNQLGFBQWEsR0FBRyxRQUFROztnQkFDeEIsUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQzlDLE9BQU8sUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztnQkFDbkQsYUFBYSxJQUFJLENBQUMsQ0FBQztnQkFDbkIsUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDakQ7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ2YsSUFBSSxRQUFRLEVBQUU7d0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsVUFBQSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO3FCQUNwRDtpQkFDRjtxQkFBTTtvQkFDTCxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2Q7YUFDRjtTQUNGOztZQUVLLE1BQU0sR0FBb0IsRUFBRztRQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7O2dCQUNQLGFBQWEsR0FBRyxRQUFROztnQkFDeEIsUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDaEUsT0FBTyxRQUFRLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3BELGFBQWEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDLENBQUM7Z0JBQ25ELFFBQVEsR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDOUQ7WUFFRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ2YsSUFBSSxRQUFRLEVBQUU7d0JBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsVUFBQSxFQUFFLENBQUMsQ0FBQztxQkFDeEQ7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUNkO2FBQ0Y7U0FFRjs7WUFFSyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDbEUsVUFBVSxDQUFDLFdBQVcsV0FBRyxhQUFhLEdBQUssTUFBTSxFQUFLLE1BQU0sRUFBSyxVQUFVLEdBQUksS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7Ozs7O0lBRUQsU0FBUyx3Q0FBd0MsQ0FBQyxLQUE2Qzs7O1lBQ3ZGLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTzs7WUFDM0IsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLElBQUk7WUFDNUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUN6QyxRQUFRLEVBQUUsV0FBVyxDQUFDLEtBQUs7U0FDNUI7O1lBQ0ssZUFBZSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzs7WUFFakUsTUFBTSxHQUFvQixFQUFFOztZQUM1QixNQUFNLEdBQW9CLEVBQUU7O1lBRWxDLEtBQWdCLElBQUEsS0FBQSxTQUFBLFlBQVksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBbEUsSUFBTSxDQUFDLFdBQUE7Z0JBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzlEOzs7Ozs7Ozs7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOztZQUV2RSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDOztZQUNsRixHQUFHLEdBQUcsZUFBZSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQzdCLEtBQUssR0FBRyxVQUFVLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDNUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUMzRTs7WUFDSyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7UUFDbEUsVUFBVSxDQUFDLFdBQVcsV0FBRyxXQUFXLEdBQUssTUFBTSxFQUFLLE1BQU0sRUFBSyxVQUFVLEdBQUksS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVGLENBQUM7Ozs7Ozs7OztJQVNELFNBQVMscUJBQXFCLENBQUMsYUFBNEIsRUFBRSxTQUFvQzs7WUFDekYsUUFBUSxHQUFHLFVBQVUsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQ3RGLElBQUksUUFBUSxFQUFFO1lBQ1osVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlHO0lBQ0gsQ0FBQztJQUVELE9BQU87UUFDTCxlQUFlLGlCQUFBO1FBQ2YsYUFBYSxlQUFBO1FBQ2Isd0NBQXdDLDBDQUFBO0tBQ3pDLENBQUE7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGFrZVVudGlsLCBzd2l0Y2hNYXAsIGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgVVBfQVJST1csIFJJR0hUX0FSUk9XLCBET1dOX0FSUk9XIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuaW1wb3J0IHsgR3JpZERhdGFQb2ludCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRSb3dFdmVudCwgUGJsTmdyaWRDZWxsRXZlbnQsIFBibE5ncmlkRGF0YUNlbGxFdmVudCB9IGZyb20gJy4vZXZlbnRzJztcbmltcG9ydCB7IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luIH0gZnJvbSAnLi90YXJnZXQtZXZlbnRzLXBsdWdpbic7XG5pbXBvcnQgeyBpc0NlbGxFdmVudCwgaXNEYXRhQ2VsbEV2ZW50LCByYW5nZUJldHdlZW4sIGdldElubmVyQ2VsbHNJblJlY3QgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgaXNPc3ggPSAvXm1hYy8udGVzdChuYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKSlcbmNvbnN0IGlzTWFpbk1vdXNlQnV0dG9uQ2xpY2sgPSAoZXZlbnQ6IFBibE5ncmlkRGF0YUNlbGxFdmVudDxhbnksIE1vdXNlRXZlbnQ+KSA9PiBldmVudC5zb3VyY2UuYnV0dG9uID09PSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRm9jdXNBbmRTZWxlY3Rpb24odGFyZ2V0RXZlbnRzOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbikge1xuICBjb25zdCBpc0NlbGxGb2N1c01vZGUgPSAoKSA9PiB0YXJnZXRFdmVudHMuZ3JpZC5mb2N1c01vZGUgPT09ICdjZWxsJztcblxuICBjb25zdCBoYW5kbGVycyA9IGNyZWF0ZUhhbmRsZXJzKHRhcmdldEV2ZW50cyk7XG5cbiAgLy8gSGFuZGxlIGFycmF5IGtleXMgbW92ZSAod2l0aCBzaGlmdCBmb3Igc2VsZWN0aW9uLCB3aXRob3V0IGZvciBjZWxsIGZvY3VzIGNoYW5nZSlcbiAgdGFyZ2V0RXZlbnRzLmtleURvd25cbiAgICAucGlwZShmaWx0ZXIoaXNDZWxsRm9jdXNNb2RlKSlcbiAgICAuc3Vic2NyaWJlKGhhbmRsZXJzLmhhbmRsZUtleURvd24pO1xuXG4gIC8vIEhhbmRsZSBtb3VzZSBkb3duIG9uIGNlbGwgKGZvY3VzKSBhbmQgdGhlbiBtb3ZpbmcgZm9yIHNlbGVjdGlvbi5cbiAgdGFyZ2V0RXZlbnRzLm1vdXNlRG93blxuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGlzQ2VsbEZvY3VzTW9kZSksXG4gICAgICBmaWx0ZXIoaXNEYXRhQ2VsbEV2ZW50KSxcbiAgICAgIGZpbHRlcihpc01haW5Nb3VzZUJ1dHRvbkNsaWNrKSxcbiAgICAgIHRhcCggZXZlbnQgPT4ge1xuICAgICAgICBldmVudC5zb3VyY2Uuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGV2ZW50LnNvdXJjZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSksXG4gICAgICB0YXAoaGFuZGxlcnMuaGFuZGxlTW91c2VEb3duKSwgLy8gaGFuZGxlIG1vdXNlIGRvd24gZm9jdXNcbiAgICAgIHN3aXRjaE1hcCggKCkgPT4gdGFyZ2V0RXZlbnRzLmNlbGxFbnRlci5waXBlKHRha2VVbnRpbCh0YXJnZXRFdmVudHMubW91c2VVcCkpICksXG4gICAgICBmaWx0ZXIoaXNEYXRhQ2VsbEV2ZW50KSxcbiAgICAgIGZpbHRlcihpc01haW5Nb3VzZUJ1dHRvbkNsaWNrKVxuICAgIClcbiAgICAuc3Vic2NyaWJlKGhhbmRsZXJzLmhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmUpOyAvLyBub3cgaGFuZGxlIG1vdmVtZW50cyB1bnRpbCBtb3VzZXVwXG5cbn1cblxuZnVuY3Rpb24gY3JlYXRlSGFuZGxlcnModGFyZ2V0RXZlbnRzOiBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbikge1xuICBjb25zdCB7IGNvbnRleHRBcGkgfSA9IHRhcmdldEV2ZW50cy5ncmlkO1xuXG4gIGZ1bmN0aW9uIGZvY3VzQ2VsbChyb3dJZGVudDogYW55LCBjb2xJbmRleDogbnVtYmVyLCBtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29udGV4dEFwaS5mb2N1c0NlbGwoeyByb3dJZGVudCwgY29sSW5kZXggfSwgbWFya0ZvckNoZWNrKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlRG93bihldmVudDogUGJsTmdyaWREYXRhQ2VsbEV2ZW50PGFueSwgTW91c2VFdmVudD4pOiB2b2lkIHtcbiAgICBpZiAoY29udGV4dEFwaS5mb2N1c2VkQ2VsbCAmJiBldmVudC5zb3VyY2Uuc2hpZnRLZXkpIHtcbiAgICAgIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5TW91c2VDbGlja0FuZE1vdmUoZXZlbnQpO1xuICAgIH0gZWxzZSBpZiAoaXNPc3ggPyBldmVudC5zb3VyY2UubWV0YUtleSA6IGV2ZW50LnNvdXJjZS5jdHJsS2V5KSB7XG4gICAgICBpZiAoZXZlbnQuY29udGV4dC5zZWxlY3RlZCkge1xuICAgICAgICBjb250ZXh0QXBpLnVuc2VsZWN0Q2VsbHMoWyBldmVudC5jb250ZXh0IF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGV4dEFwaS5zZWxlY3RDZWxscyhbIGV2ZW50LmNvbnRleHQgXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvY3VzQ2VsbChldmVudC5jb250ZXh0LnJvd0NvbnRleHQuaWRlbnRpdHksIGV2ZW50LmNvbnRleHQuaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUtleURvd24oZXZlbnQ6IFBibE5ncmlkUm93RXZlbnQgfCBQYmxOZ3JpZENlbGxFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHNvdXJjZTogS2V5Ym9hcmRFdmVudCA9IGV2ZW50LnNvdXJjZSBhcyBhbnk7XG4gICAgaWYgKGlzQ2VsbEV2ZW50KGV2ZW50KSkge1xuICAgICAgY29uc3Qgc291cmNlQ2VsbCA9IGV2ZW50LmNlbGxUYXJnZXQ7XG5cbiAgICAgIGxldCBjb2VmZjogMSB8IC0xID0gMTtcbiAgICAgIGxldCBheGlzOiAnaCcgfCAndic7XG5cbiAgICAgIHN3aXRjaCAoc291cmNlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSBVUF9BUlJPVzpcbiAgICAgICAgICBjb2VmZiA9IC0xO1xuICAgICAgICBjYXNlIERPV05fQVJST1c6IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6IG5vLXN3aXRjaC1jYXNlLWZhbGwtdGhyb3VnaFxuICAgICAgICAgIGF4aXMgPSAndic7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgICBjb2VmZiA9IC0xO1xuICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOiAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOiBuby1zd2l0Y2gtY2FzZS1mYWxsLXRocm91Z2hcbiAgICAgICAgICBheGlzID0gJ2gnO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY2VsbENvbnRleHQgPSBjb250ZXh0QXBpLmdldENlbGwoc291cmNlQ2VsbCk7XG4gICAgICBjb25zdCBhY3RpdmVGb2N1cyA9IGNvbnRleHRBcGkuZm9jdXNlZENlbGwgfHwge1xuICAgICAgICByb3dJZGVudDogY2VsbENvbnRleHQucm93Q29udGV4dC5pZGVudGl0eSxcbiAgICAgICAgY29sSW5kZXg6IGNlbGxDb250ZXh0LmluZGV4LFxuICAgICAgfTtcblxuICAgICAgaWYgKCEhc291cmNlLnNoaWZ0S2V5KSB7XG4gICAgICAgIGhhbmRsZVNlbGVjdGlvbkNoYW5nZUJ5QXJyb3dzKGFjdGl2ZUZvY3VzLCBheGlzID09PSAnaCcgPyBbY29lZmYsIDBdIDogWzAsIGNvZWZmXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGVTaW5nbGVJdGVtRm9jdXMoYWN0aXZlRm9jdXMsIGF4aXMgPT09ICdoJyA/IFtjb2VmZiwgMF0gOiBbMCwgY29lZmZdKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgc2VsZWN0aW9uIGNoYW5nZXMgY2F1c2VkIE9OTFkgYnkgdGhlIHVzZSBvZiB0aGUgYXJyb3cga2V5cyB3aXRoIFNISUZUIGtleS5cbiAgICpcbiAgICogVGhlIGltcGxlbWVudGF0aW9uIGlzIE5PVCBpbmNyZW1lbnRhbCwgaXQgd2lsbCByZS1jYWxjdWxhdGUgdGhlIHNlbGVjdGVkIGNlbGwgb24gZXZlcnkgYXJyb3cga2V5IHByZXNzIChldmVyeSBjYWxsIHRvIHRoaXMgZnVuY3Rpb24pLlxuICAgKlxuICAgKiBGaXJzdC4gQSBzaW1wbGUgYWRqYWNlbnQgY2VsbCBkZXRlY3Rpb24gaXMgcGVyZm9ybWVkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBjdXJyZW50IHNlbGVjdGVkIGNlbGxzIHJlbGF0aXZlIHRvIHRoZVxuICAgKiBzb3VyY2UgY2VsbCAodXN1YWxseSB0aGUgZm9jdXNlZCBjZWxsKS4gV2Ugb25seSBjYXJlIGFib3V0IDQgY2VsbHMsIGFkamFjZW50IHRvIHRoZSBzb3VyY2UgQ2VsbDogVG9wLCBMZWZ0LCBCb3R0b20sIFJpZ2h0XG4gICAqXG4gICAqICAgIOKUgiBUIOKUglxuICAgKiDilIDilIDilIDilLzilIDilIDilIDilLzilIDilIDilIBcbiAgICogIFIg4pSCIEMg4pSCIExcbiAgICog4pSA4pSA4pSA4pS84pSA4pSA4pSA4pS84pSA4pSA4pSAXG4gICAqICAgIOKUgiBCIOKUglxuICAgKlxuICAgKiBXZSBjYW4gb25seSBoYXZlIDEgcXVhcnRlciBzZWxlY3Rpb24gd2l0aCBBcnJvdyBzZWxlY3Rpb24gc28gaXQgVEwsIFRSLCBCUiBvciBCTCwgYW55IG90aGVyIHNldHVwIHdpbGwgY2xlYXIgdGhlIHNlbGVjdGlvbiBhbmQgc3RhcnQgZnJvbSBzY3JhdGNoLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB0aGUgbG9naWMgaW4gdGhpcyBmdW5jdGlvbiBpcyBmb3IgdXNlIHdpdGggYXJyb3cga2V5cyArIFNISUZUIGtleSwgb3RoZXIgc2VsZWN0aW9uIGxvZ2ljXG4gICAqIGRvZXMgbm90IGZpdCB0aGlzIHNjZW5hcmlvIChlLmcuIE1PVVNFIHNlbGVjdGlvbiBvciBBUlJPVyBLRVlTICsgQ1RSTCBLRVkgc2VsZWN0aW9uKVxuICAgKlxuICAgKiBAcGFyYW0gc291cmNlQ2VsbFJlZiBBIHBvaW50IHJlZmVyZW5jZSB0byB0aGUgc291cmNlIGNlbGwgdGhlIGRpcmVjdGlvbiBpcyByZWxhdGl2ZSB0b1xuICAgKiBAcGFyYW0gZGlyZWN0aW9uIFRoZSBkaXJlY3Rpb24gb2YgdGhlIG5ldyBjZWxsLlxuICAgKiBbMSB8IC0xLCAwXSAtPiBIT1JJWk9OVEFMXG4gICAqIFswLCAxIHwgLTFdIC0+IFZFUlRJQ0FMXG4gICAqL1xuICBmdW5jdGlvbiBoYW5kbGVTZWxlY3Rpb25DaGFuZ2VCeUFycm93cyhzb3VyY2VDZWxsUmVmOiBHcmlkRGF0YVBvaW50LCBkaXJlY3Rpb246IFswLCAxIHwgLTFdIHwgWzEgfCAtMSwgMF0pIHtcbiAgICBjb25zdCB7IHJvd0lkZW50LCBjb2xJbmRleCB9ID0gc291cmNlQ2VsbFJlZjtcbiAgICBjb25zdCBzb3VyY2VDZWxsU3RhdGUgPSBjb250ZXh0QXBpLmZpbmRSb3dJbkNhY2hlKHJvd0lkZW50KTtcbiAgICBjb25zdCBbbW92ZUgsIG1vdmVWXSA9IGRpcmVjdGlvbjtcblxuICAgIGNvbnN0IGhBZGogPSBbIHNvdXJjZUNlbGxTdGF0ZS5jZWxsc1tjb2xJbmRleCAtIDFdLCBzb3VyY2VDZWxsU3RhdGUuY2VsbHNbY29sSW5kZXggKyAxXSBdO1xuICAgIGNvbnN0IHZBZGogPSBbIGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUocm93SWRlbnQsIC0xLCB0cnVlKSwgY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShyb3dJZGVudCwgMSwgdHJ1ZSkgXTtcblxuICAgIGxldCBoID0gKGhBZGpbMF0gJiYgaEFkalswXS5zZWxlY3RlZCA/IC0xIDogMCkgKyAoaEFkalsxXSAmJiBoQWRqWzFdLnNlbGVjdGVkID8gMSA6IDApO1xuICAgIGxldCB2ID0gKHZBZGpbMF0gJiYgdkFkalswXS5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQgPyAtMSA6IDApICsgKHZBZGpbMV0gJiYgdkFkalsxXS5jZWxsc1tjb2xJbmRleF0uc2VsZWN0ZWQgPyAxIDogMCk7XG5cbiAgICBpZiAoaCA9PT0gMCkge1xuICAgICAgaCArPSBtb3ZlSDtcbiAgICB9XG4gICAgaWYgKHYgPT09IDApIHtcbiAgICAgIHYgKz0gbW92ZVY7XG4gICAgfVxuXG4gICAgY29uc3QgaENlbGxzOiBHcmlkRGF0YVBvaW50W10gPSBbXTtcbiAgICBpZiAoaCAhPT0gMCkge1xuICAgICAgbGV0IGhDb250ZXh0SW5kZXggPSBjb2xJbmRleDtcbiAgICAgIGxldCBoQ29udGV4dCA9IHNvdXJjZUNlbGxTdGF0ZS5jZWxsc1tjb2xJbmRleF07XG4gICAgICB3aGlsZSAoaENvbnRleHQgJiYgaENvbnRleHQuc2VsZWN0ZWQpIHtcbiAgICAgICAgaENlbGxzLnB1c2goeyByb3dJZGVudCwgY29sSW5kZXg6IGhDb250ZXh0SW5kZXggfSk7XG4gICAgICAgIGhDb250ZXh0SW5kZXggKz0gaDtcbiAgICAgICAgaENvbnRleHQgPSBzb3VyY2VDZWxsU3RhdGUuY2VsbHNbaENvbnRleHRJbmRleF07XG4gICAgICB9XG5cbiAgICAgIGlmIChtb3ZlSCkge1xuICAgICAgICBpZiAoaCA9PT0gbW92ZUgpIHtcbiAgICAgICAgICBpZiAoaENvbnRleHQpIHtcbiAgICAgICAgICAgIGhDZWxscy5wdXNoKHsgcm93SWRlbnQsIGNvbEluZGV4OiBoQ29udGV4dEluZGV4IH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoQ2VsbHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB2Q2VsbHM6IEdyaWREYXRhUG9pbnRbXSA9IFsgXTtcbiAgICBpZiAodiAhPT0gMCkge1xuICAgICAgbGV0IHZDb250ZXh0SWRlbnQgPSByb3dJZGVudDtcbiAgICAgIGxldCB2Q29udGV4dCA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUodkNvbnRleHRJZGVudCwgdiwgdHJ1ZSk7XG4gICAgICB3aGlsZSAodkNvbnRleHQgJiYgdkNvbnRleHQuY2VsbHNbY29sSW5kZXhdLnNlbGVjdGVkKSB7XG4gICAgICAgIHZDb250ZXh0SWRlbnQgPSB2Q29udGV4dC5pZGVudGl0eTtcbiAgICAgICAgdkNlbGxzLnB1c2goeyByb3dJZGVudDogdkNvbnRleHRJZGVudCwgY29sSW5kZXggfSk7XG4gICAgICAgIHZDb250ZXh0ID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZSh2Q29udGV4dElkZW50LCB2LCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdmVWKSB7XG4gICAgICAgIGlmICh2ID09PSBtb3ZlVikge1xuICAgICAgICAgIGlmICh2Q29udGV4dCkge1xuICAgICAgICAgICAgdkNlbGxzLnB1c2goeyByb3dJZGVudDogdkNvbnRleHQuaWRlbnRpdHksIGNvbEluZGV4IH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2Q2VsbHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH1cblxuICAgIGNvbnN0IGlubmVyQ2VsbHMgPSBnZXRJbm5lckNlbGxzSW5SZWN0KGNvbnRleHRBcGksIGhDZWxscywgdkNlbGxzKTtcbiAgICBjb250ZXh0QXBpLnNlbGVjdENlbGxzKFsgc291cmNlQ2VsbFJlZiwgLi4uaENlbGxzLCAuLi52Q2VsbHMsIC4uLmlubmVyQ2VsbHMgXSwgZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0aW9uQ2hhbmdlQnlNb3VzZUNsaWNrQW5kTW92ZShldmVudDogUGJsTmdyaWREYXRhQ2VsbEV2ZW50PGFueSwgTW91c2VFdmVudD4pIHtcbiAgICBjb25zdCBjZWxsQ29udGV4dCA9IGV2ZW50LmNvbnRleHQ7XG4gICAgY29uc3QgYWN0aXZlRm9jdXMgPSBjb250ZXh0QXBpLmZvY3VzZWRDZWxsIHx8IHtcbiAgICAgIHJvd0lkZW50OiBjZWxsQ29udGV4dC5yb3dDb250ZXh0LmlkZW50aXR5LFxuICAgICAgY29sSW5kZXg6IGNlbGxDb250ZXh0LmluZGV4LFxuICAgIH07XG4gICAgY29uc3QgZm9jdXNlZFJvd1N0YXRlID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShhY3RpdmVGb2N1cy5yb3dJZGVudCk7XG5cbiAgICBjb25zdCBoQ2VsbHM6IEdyaWREYXRhUG9pbnRbXSA9IFtdO1xuICAgIGNvbnN0IHZDZWxsczogR3JpZERhdGFQb2ludFtdID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGkgb2YgcmFuZ2VCZXR3ZWVuKGFjdGl2ZUZvY3VzLmNvbEluZGV4LCBjZWxsQ29udGV4dC5pbmRleCkpIHtcbiAgICAgIGhDZWxscy5wdXNoKHsgcm93SWRlbnQ6IGFjdGl2ZUZvY3VzLnJvd0lkZW50LCBjb2xJbmRleDogaSB9KTtcbiAgICB9XG4gICAgaENlbGxzLnB1c2goeyByb3dJZGVudDogYWN0aXZlRm9jdXMucm93SWRlbnQsIGNvbEluZGV4OiBjZWxsQ29udGV4dC5pbmRleCB9KTtcblxuICAgIGNvbnN0IHJvd0hlaWdodCA9IE1hdGguYWJzKGNlbGxDb250ZXh0LnJvd0NvbnRleHQuZGF0YUluZGV4IC0gZm9jdXNlZFJvd1N0YXRlLmRhdGFJbmRleCk7XG4gICAgY29uc3QgZGlyID0gZm9jdXNlZFJvd1N0YXRlLmRhdGFJbmRleCA+IGNlbGxDb250ZXh0LnJvd0NvbnRleHQuZGF0YUluZGV4ID8gLTEgOiAxO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHJvd0hlaWdodDsgaSsrKSB7XG4gICAgICBjb25zdCBzdGF0ZSA9IGNvbnRleHRBcGkuZmluZFJvd0luQ2FjaGUoYWN0aXZlRm9jdXMucm93SWRlbnQsIGRpciAqIGksIHRydWUpO1xuICAgICAgdkNlbGxzLnB1c2goeyByb3dJZGVudDogc3RhdGUuaWRlbnRpdHksIGNvbEluZGV4OiBhY3RpdmVGb2N1cy5jb2xJbmRleCB9KTtcbiAgICB9XG4gICAgY29uc3QgaW5uZXJDZWxscyA9IGdldElubmVyQ2VsbHNJblJlY3QoY29udGV4dEFwaSwgaENlbGxzLCB2Q2VsbHMpO1xuICAgIGNvbnRleHRBcGkuc2VsZWN0Q2VsbHMoWyBhY3RpdmVGb2N1cywgLi4uaENlbGxzLCAuLi52Q2VsbHMsIC4uLmlubmVyQ2VsbHMgXSwgZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3YXAgdGhlIGZvY3VzIGZyb20gdGhlIHNvdXJjZSBjZWxsIHRvIGEgc3RyYWlnaHQgYWRqYWNlbnQgY2VsbCAobm90IGRpYWdvbmFsKS5cbiAgICogQHBhcmFtIHNvdXJjZUNlbGxSZWYgQSBwb2ludCByZWZlcmVuY2UgdG8gdGhlIHNvdXJjZSBjZWxsIHRoZSBkaXJlY3Rpb24gaXMgcmVsYXRpdmUgdG9cbiAgICogQHBhcmFtIGRpcmVjdGlvbiBUaGUgZGlyZWN0aW9uIG9mIHRoZSBuZXcgY2VsbC5cbiAgICogWzEgfCAtMSwgMF0gLT4gSE9SSVpPTlRBTFxuICAgKiBbMCwgMSB8IC0xXSAtPiBWRVJUSUNBTFxuICAgKi9cbiAgZnVuY3Rpb24gaGFuZGxlU2luZ2xlSXRlbUZvY3VzKHNvdXJjZUNlbGxSZWY6IEdyaWREYXRhUG9pbnQsIGRpcmVjdGlvbjogWzAsIDEgfCAtMV0gfCBbMSB8IC0xLCAwXSkge1xuICAgIGNvbnN0IHJvd1N0YXRlID0gY29udGV4dEFwaS5maW5kUm93SW5DYWNoZShzb3VyY2VDZWxsUmVmLnJvd0lkZW50LCBkaXJlY3Rpb25bMV0sIHRydWUpO1xuICAgIGlmIChyb3dTdGF0ZSkge1xuICAgICAgY29udGV4dEFwaS5mb2N1c0NlbGwoeyByb3dJZGVudDogcm93U3RhdGUuaWRlbnRpdHksIGNvbEluZGV4OiBzb3VyY2VDZWxsUmVmLmNvbEluZGV4ICsgZGlyZWN0aW9uWzBdIH0sIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlTW91c2VEb3duLFxuICAgIGhhbmRsZUtleURvd24sXG4gICAgaGFuZGxlU2VsZWN0aW9uQ2hhbmdlQnlNb3VzZUNsaWNrQW5kTW92ZVxuICB9XG59XG5cbiJdfQ==