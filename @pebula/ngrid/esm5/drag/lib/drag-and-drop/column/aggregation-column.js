/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:no-output-rename
import { Inject, ChangeDetectorRef, Directive, ElementRef, Optional, SkipSelf, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDropListGroup, CdkDropList, CDK_DROP_LIST, DragDropRegistry, } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { cdkDropList } from '../v7-compat';
import { CdkLazyDropList } from '../core/lazy-drag-drop';
import { PblDragDrop } from '../core';
/** @type {?} */
var _uniqueIdCounter = 0;
/**
 * @template T
 */
var PblNgridAggregationContainerDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridAggregationContainerDirective, _super);
    function PblNgridAggregationContainerDirective(grid, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
        _this.grid = grid;
        _this.id = "pbl-ngrid-column-aggregation-container-" + _uniqueIdCounter++;
        _this.orientation = 'horizontal';
        _this._draggablesSet = new Set();
        // super(element, dragDrop, changeDetectorRef, dir, group);
        /** @type {?} */
        var reorder = pluginCtrl.getPlugin('columnReorder');
        reorder.connectedTo = _this.id;
        _this.pblDropListRef.dropped
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var item = (/** @type {?} */ (event.item));
            _this.pending = undefined;
            _this.grid.columnApi.addGroupBy(item.data.column);
        }));
        _this.pblDropListRef.entered
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var e_1, _a;
            /** @type {?} */
            var item = (/** @type {?} */ (event.item));
            _this.pending = item.data.column;
            item.getPlaceholderElement().style.display = 'none';
            try {
                for (var _b = tslib_1.__values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    c.style.display = 'none';
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }));
        _this.pblDropListRef.exited
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            var e_2, _a;
            /** @type {?} */
            var item = (/** @type {?} */ (event.item));
            _this.pending = undefined;
            item.getPlaceholderElement().style.display = '';
            try {
                for (var _b = tslib_1.__values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    c.style.display = '';
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }));
        return _this;
    }
    Object.defineProperty(PblNgridAggregationContainerDirective.prototype, "pblDropListRef", {
        get: /**
         * @return {?}
         */
        function () { return (/** @type {?} */ (this._dropListRef)); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridAggregationContainerDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { CdkLazyDropList.prototype.ngOnInit.call(this); };
    /**
     * @param {?} drag
     * @return {?}
     */
    PblNgridAggregationContainerDirective.prototype.addDrag = /**
     * @param {?} drag
     * @return {?}
     */
    function (drag) { return CdkLazyDropList.prototype.addDrag.call(this, drag); };
    /**
     * @param {?} drag
     * @return {?}
     */
    PblNgridAggregationContainerDirective.prototype.removeDrag = /**
     * @param {?} drag
     * @return {?}
     */
    function (drag) { return CdkLazyDropList.prototype.removeDrag.call(this, drag); };
    /**
     * @return {?}
     */
    PblNgridAggregationContainerDirective.prototype.beforeStarted = /**
     * @return {?}
     */
    function () { CdkLazyDropList.prototype.beforeStarted.call(this); };
    PblNgridAggregationContainerDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pblAggregationContainer]',
                    exportAs: 'pblAggregationContainer',
                    inputs: [
                        'directContainerElement:cdkDropListDirectContainerElement'
                    ],
                    host: {
                        // tslint:disable-line:use-host-property-decorator
                        'class': 'cdk-drop-list',
                        '[id]': 'id',
                    },
                    providers: [
                        { provide: DragDrop, useExisting: PblDragDrop },
                        { provide: CDK_DROP_LIST, useExisting: PblNgridAggregationContainerDirective },
                    ],
                },] }
    ];
    /** @nocollapse */
    PblNgridAggregationContainerDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: ElementRef },
        { type: DragDrop },
        { type: ChangeDetectorRef },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: DragDropRegistry, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
    ]; };
    return PblNgridAggregationContainerDirective;
}(CdkDropList));
export { PblNgridAggregationContainerDirective };
if (false) {
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.id;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.orientation;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.pending;
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     * @type {?}
     */
    PblNgridAggregationContainerDirective.prototype.directContainerElement;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.originalElement;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype._draggablesSet;
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb24tY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2FnZ3JlZ2F0aW9uLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixXQUFXLEVBRVgsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUl6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sU0FBUyxDQUFDOztJQUVsQyxnQkFBZ0IsR0FBRyxDQUFDOzs7O0FBRXhCO0lBZW9FLGlFQUFjO0lBTWhGLCtDQUFtQixJQUEwQixFQUNqQyxVQUFvQyxFQUNwQyxPQUFnQyxFQUNoQyxRQUFrQixFQUNsQixpQkFBb0MsRUFDeEIsR0FBb0IsRUFDUixLQUFxQyxFQUNqRCxnQkFBNkMsRUFBRSxnQkFBZ0I7SUFDN0MsU0FBZTtRQVJ6RCxnREFTVyxXQUFXLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxXQStCcEc7UUF4Q2tCLFVBQUksR0FBSixJQUFJLENBQXNCO1FBTDdDLFFBQUUsR0FBRyw0Q0FBMEMsZ0JBQWdCLEVBQUksQ0FBQztRQUNwRSxpQkFBVyxHQUE4QixZQUFZLENBQUM7UUF3RHRELG9CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVcsQ0FBQzs7O1lBekM1QixPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFDckQsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDO1FBRTlCLEtBQUksQ0FBQyxjQUFjLENBQUMsT0FBTzthQUN4QixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLOztnQkFDVCxJQUFJLEdBQUcsbUJBQUEsS0FBSyxDQUFDLElBQUksRUFBZ0Q7WUFDdkUsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxFQUFDLENBQUM7UUFFTCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU87YUFDeEIsU0FBUzs7OztRQUFFLFVBQUEsS0FBSzs7O2dCQUNULElBQUksR0FBRyxtQkFBQSxLQUFLLENBQUMsSUFBSSxFQUFnRDtZQUN2RSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztnQkFDcEQsS0FBZ0IsSUFBQSxLQUFBLGlCQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUEsZ0JBQUEsNEJBQUU7b0JBQWpDLElBQU0sQ0FBQyxXQUFBO29CQUNWLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztpQkFDMUI7Ozs7Ozs7OztRQUNILENBQUMsRUFBQyxDQUFDO1FBRUwsS0FBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNO2FBQ3ZCLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7OztnQkFDVCxJQUFJLEdBQUcsbUJBQUEsS0FBSyxDQUFDLElBQUksRUFBZ0Q7WUFDdkUsS0FBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7WUFDekIsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7O2dCQUNoRCxLQUFnQixJQUFBLEtBQUEsaUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQSxnQkFBQSw0QkFBRTtvQkFBakMsSUFBTSxDQUFDLFdBQUE7b0JBQ1YsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2lCQUN0Qjs7Ozs7Ozs7O1FBQ0gsQ0FBQyxFQUFDLENBQUM7O0lBQ1AsQ0FBQztJQVVELHNCQUFJLGlFQUFjOzs7O1FBQWxCLGNBQTRDLE9BQU8sbUJBQUEsSUFBSSxDQUFDLFlBQVksRUFBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7SUFHOUUsd0RBQVE7OztJQUFSLGNBQW1CLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ25FLHVEQUFPOzs7O0lBQVAsVUFBUSxJQUFhLElBQVUsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDM0YsMERBQVU7Ozs7SUFBVixVQUFXLElBQWEsSUFBYSxPQUFPLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBQ3BHLDZEQUFhOzs7SUFBYixjQUF3QixlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkE3RTlFLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMkJBQTJCO29CQUNyQyxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxNQUFNLEVBQUU7d0JBQ04sMERBQTBEO3FCQUMzRDtvQkFDRCxJQUFJLEVBQUU7O3dCQUNKLE9BQU8sRUFBRSxlQUFlO3dCQUN4QixNQUFNLEVBQUUsSUFBSTtxQkFDYjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUU7d0JBQy9DLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUscUNBQXFDLEVBQUU7cUJBQy9FO2lCQUNGOzs7O2dCQXhCUSxpQkFBaUI7Z0JBQUUsd0JBQXdCO2dCQWhCbEQsVUFBVTtnQkFRVixRQUFRO2dCQVZSLGlCQUFpQjtnQkFRVixjQUFjLHVCQThDUixRQUFRO2dCQTNDckIsZ0JBQWdCLHVCQTRDSCxRQUFRLFlBQUksUUFBUTtnQkF4Q2pDLGdCQUFnQix1QkF5Q0gsUUFBUTtnREFDUixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7O0lBbUQxQyw0Q0FBQztDQUFBLEFBaEZELENBZW9FLFdBQVcsR0FpRTlFO1NBakVZLHFDQUFxQzs7O0lBQ2hELG1EQUFvRTs7SUFDcEUsNERBQXNEOztJQUV0RCx3REFBbUI7Ozs7Ozs7O0lBbURuQix1RUFBK0I7O0lBRS9CLGdFQUF5Qzs7SUFDekMsK0RBQW9DOztJQXBEeEIscURBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tb3V0cHV0LXJlbmFtZVxyXG5cclxuaW1wb3J0IHtcclxuICBJbmplY3QsXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9wdGlvbmFsLFxyXG4gIFNraXBTZWxmLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xyXG5pbXBvcnQge1xyXG4gIERyYWdEcm9wLFxyXG4gIENka0Ryb3BMaXN0R3JvdXAsXHJcbiAgQ2RrRHJvcExpc3QsXHJcbiAgQ2RrRHJhZyxcclxuICBDREtfRFJPUF9MSVNULFxyXG4gIERyYWdEcm9wUmVnaXN0cnksXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XHJcblxyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxDb2x1bW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcclxuaW1wb3J0IHsgY2RrRHJvcExpc3QgfSBmcm9tICcuLi92Ny1jb21wYXQnO1xyXG5pbXBvcnQgeyBDZGtMYXp5RHJvcExpc3QgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUGJsRHJhZ1JlZiB9IGZyb20gJy4uL2NvcmUvZHJhZy1yZWYnO1xyXG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4uL2NvcmUvZHJvcC1saXN0LXJlZic7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLXJlb3JkZXItcGx1Z2luJztcclxuaW1wb3J0IHsgUGJsRHJhZ0Ryb3AgfSBmcm9tICcuLi9jb3JlJztcclxuXHJcbmxldCBfdW5pcXVlSWRDb3VudGVyID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3BibEFnZ3JlZ2F0aW9uQ29udGFpbmVyXScsXHJcbiAgZXhwb3J0QXM6ICdwYmxBZ2dyZWdhdGlvbkNvbnRhaW5lcicsXHJcbiAgaW5wdXRzOiBbXHJcbiAgICAnZGlyZWN0Q29udGFpbmVyRWxlbWVudDpjZGtEcm9wTGlzdERpcmVjdENvbnRhaW5lckVsZW1lbnQnXHJcbiAgXSxcclxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXHJcbiAgICAnY2xhc3MnOiAnY2RrLWRyb3AtbGlzdCcsXHJcbiAgICAnW2lkXSc6ICdpZCcsXHJcbiAgfSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxyXG4gICAgeyBwcm92aWRlOiBDREtfRFJPUF9MSVNULCB1c2VFeGlzdGluZzogUGJsTmdyaWRBZ2dyZWdhdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9LFxyXG4gIF0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEFnZ3JlZ2F0aW9uQ29udGFpbmVyRGlyZWN0aXZlPFQgPSBhbnk+IGV4dGVuZHMgQ2RrRHJvcExpc3Q8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3ksIENka0xhenlEcm9wTGlzdDxUPiB7XHJcbiAgaWQgPSBgcGJsLW5ncmlkLWNvbHVtbi1hZ2dyZWdhdGlvbi1jb250YWluZXItJHtfdW5pcXVlSWRDb3VudGVyKyt9YDtcclxuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcclxuXHJcbiAgcGVuZGluZzogUGJsQ29sdW1uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4sXHJcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxyXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxyXG4gICAgICAgICAgICAgIGRyYWdEcm9wOiBEcmFnRHJvcCxcclxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXHJcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgZ3JvdXA/OiBDZGtEcm9wTGlzdEdyb3VwPENka0Ryb3BMaXN0PixcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5PzogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sIC8vIGZvciB2NyBjb21wYXRcclxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KERPQ1VNRU5UKSBfZG9jdW1lbnQ/OiBhbnksKSB7XHJcbiAgICBzdXBlciguLi5jZGtEcm9wTGlzdChlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXAsIGRyYWdEcm9wUmVnaXN0cnksIF9kb2N1bWVudCkpO1xyXG4gICAgLy8gc3VwZXIoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwKTtcclxuICAgIGNvbnN0IHJlb3JkZXIgPSBwbHVnaW5DdHJsLmdldFBsdWdpbignY29sdW1uUmVvcmRlcicpO1xyXG4gICAgcmVvcmRlci5jb25uZWN0ZWRUbyA9IHRoaXMuaWQ7XHJcblxyXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5kcm9wcGVkXHJcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcclxuICAgICAgICBjb25zdCBpdGVtID0gZXZlbnQuaXRlbSBhcyBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxhbnk+PjtcclxuICAgICAgICB0aGlzLnBlbmRpbmcgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5ncmlkLmNvbHVtbkFwaS5hZGRHcm91cEJ5KGl0ZW0uZGF0YS5jb2x1bW4pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmVudGVyZWRcclxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xyXG4gICAgICAgIHRoaXMucGVuZGluZyA9IGl0ZW0uZGF0YS5jb2x1bW47XHJcbiAgICAgICAgaXRlbS5nZXRQbGFjZWhvbGRlckVsZW1lbnQoKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBpdGVtLmRhdGEuZ2V0Q2VsbHMoKSkge1xyXG4gICAgICAgICAgYy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5leGl0ZWRcclxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xyXG4gICAgICAgIHRoaXMucGVuZGluZyA9IHVuZGVmaW5lZDtcclxuICAgICAgICBpdGVtLmdldFBsYWNlaG9sZGVyRWxlbWVudCgpLnN0eWxlLmRpc3BsYXkgPSAnJztcclxuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgaXRlbS5kYXRhLmdldENlbGxzKCkpIHtcclxuICAgICAgICAgIGMuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAgIC8qIENka0xhenlEcm9wTGlzdCBzdGFydCAqL1xyXG4gIC8qKlxyXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXHJcbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcclxuICAgKiBpcyB1c2VmdWwgd2hlbiB0aGUgYGNka0Ryb3BMaXN0YCBpcyBub3QgdGhlIGRpcmVjdCBwYXJlbnQgKGkuZS4gYW5jZXN0b3IgYnV0IG5vdCBmYXRoZXIpXHJcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cclxuICAgKi9cclxuICBkaXJlY3RDb250YWluZXJFbGVtZW50OiBzdHJpbmc7XHJcbiAgZ2V0IHBibERyb3BMaXN0UmVmKCk6IFBibERyb3BMaXN0UmVmPGFueT4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XHJcbiAgb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcclxuICBfZHJhZ2dhYmxlc1NldCA9IG5ldyBTZXQ8Q2RrRHJhZz4oKTtcclxuICBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XHJcbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmFkZERyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxyXG4gIHJlbW92ZURyYWcoZHJhZzogQ2RrRHJhZyk6IGJvb2xlYW4geyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5yZW1vdmVEcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cclxuICBiZWZvcmVTdGFydGVkKCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmJlZm9yZVN0YXJ0ZWQuY2FsbCh0aGlzKTsgfVxyXG4gIC8qIENka0xhenlEcm9wTGlzdCBlbmQgKi9cclxuXHJcbn1cclxuIl19