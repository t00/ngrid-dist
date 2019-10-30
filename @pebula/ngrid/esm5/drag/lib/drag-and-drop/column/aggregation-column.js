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
/** @type {?} */
var _uniqueIdCounter = 0;
/**
 * @template T
 */
var PblNgridAggregationContainerDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridAggregationContainerDirective, _super);
    function PblNgridAggregationContainerDirective(table, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, // for v7 compat
    _document) {
        var _this = _super.apply(this, tslib_1.__spread(cdkDropList(element, dragDrop, changeDetectorRef, dir, group, dragDropRegistry, _document))) || this;
        _this.table = table;
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
            _this.table.columnApi.addGroupBy(item.data.column);
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
    PblNgridAggregationContainerDirective.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb24tY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2FnZ3JlZ2F0aW9uLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixRQUFRLEdBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsUUFBUSxFQUNSLGdCQUFnQixFQUNoQixXQUFXLEVBRVgsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7SUFLckQsZ0JBQWdCLEdBQUcsQ0FBQzs7OztBQUV4QjtJQWNvRSxpRUFBYztJQU1oRiwrQ0FBbUIsS0FBMkIsRUFDbEMsVUFBb0MsRUFDcEMsT0FBZ0MsRUFDaEMsUUFBa0IsRUFDbEIsaUJBQW9DLEVBQ3hCLEdBQW9CLEVBQ1IsS0FBcUMsRUFDakQsZ0JBQTZDLEVBQUUsZ0JBQWdCO0lBQzdDLFNBQWU7UUFSekQsZ0RBU1csV0FBVyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsV0ErQnBHO1FBeENrQixXQUFLLEdBQUwsS0FBSyxDQUFzQjtRQUw5QyxRQUFFLEdBQUcs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QkFDbkMsTUFBTSxFQUFFO3dCQUNOLDBEQUEwRDtxQkFDM0Q7b0JBQ0QsSUFBSSxFQUFFOzt3QkFDSixPQUFPLEVBQUUsZUFBZTt3QkFDeEIsTUFBTSxFQUFFLElBQUk7cUJBQ2I7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUscUNBQXFDLEVBQUU7cUJBQy9FO2lCQUNGOzs7O2dCQXRCUSxpQkFBaUI7Z0JBQUUsd0JBQXdCO2dCQWhCbEQsVUFBVTtnQkFRVixRQUFRO2dCQVZSLGlCQUFpQjtnQkFRVixjQUFjLHVCQTRDUixRQUFRO2dCQXpDckIsZ0JBQWdCLHVCQTBDSCxRQUFRLFlBQUksUUFBUTtnQkF0Q2pDLGdCQUFnQix1QkF1Q0gsUUFBUTtnREFDUixRQUFRLFlBQUksTUFBTSxTQUFDLFFBQVE7O0lBbUQxQyw0Q0FBQztDQUFBLEFBL0VELENBY29FLFdBQVcsR0FpRTlFO1NBakVZLHFDQUFxQzs7O0lBQ2hELG1EQUFvRTs7SUFDcEUsNERBQXNEOztJQUV0RCx3REFBbUI7Ozs7Ozs7O0lBbURuQix1RUFBK0I7O0lBRS9CLGdFQUF5Qzs7SUFDekMsK0RBQW9DOztJQXBEeEIsc0RBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bm8tb3V0cHV0LXJlbmFtZVxuXG5pbXBvcnQge1xuICBJbmplY3QsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFNraXBTZWxmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgRHJhZ0Ryb3AsXG4gIENka0Ryb3BMaXN0R3JvdXAsXG4gIENka0Ryb3BMaXN0LFxuICBDZGtEcmFnLFxuICBDREtfRFJPUF9MSVNULFxuICBEcmFnRHJvcFJlZ2lzdHJ5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsQ29sdW1uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBjZGtEcm9wTGlzdCB9IGZyb20gJy4uL3Y3LWNvbXBhdCc7XG5pbXBvcnQgeyBDZGtMYXp5RHJvcExpc3QgfSBmcm9tICcuLi9jb3JlL2xhenktZHJhZy1kcm9wJztcbmltcG9ydCB7IFBibERyYWdSZWYgfSBmcm9tICcuLi9jb3JlL2RyYWctcmVmJztcbmltcG9ydCB7IFBibERyb3BMaXN0UmVmIH0gZnJvbSAnLi4vY29yZS9kcm9wLWxpc3QtcmVmJztcbmltcG9ydCB7IFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZSB9IGZyb20gJy4vY29sdW1uLXJlb3JkZXItcGx1Z2luJztcblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsQWdncmVnYXRpb25Db250YWluZXJdJyxcbiAgZXhwb3J0QXM6ICdwYmxBZ2dyZWdhdGlvbkNvbnRhaW5lcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRBZ2dyZWdhdGlvbkNvbnRhaW5lckRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VD4ge1xuICBpZCA9IGBwYmwtbmdyaWQtY29sdW1uLWFnZ3JlZ2F0aW9uLWNvbnRhaW5lci0ke191bmlxdWVJZENvdW50ZXIrK31gO1xuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBwZW5kaW5nOiBQYmxDb2x1bW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgZHJhZ0Ryb3A6IERyYWdEcm9wLFxuICAgICAgICAgICAgICBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcj86IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBncm91cD86IENka0Ryb3BMaXN0R3JvdXA8Q2RrRHJvcExpc3Q+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkcmFnRHJvcFJlZ2lzdHJ5PzogRHJhZ0Ryb3BSZWdpc3RyeTxhbnksIGFueT4sIC8vIGZvciB2NyBjb21wYXRcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgX2RvY3VtZW50PzogYW55LCkge1xuICAgIHN1cGVyKC4uLmNka0Ryb3BMaXN0KGVsZW1lbnQsIGRyYWdEcm9wLCBjaGFuZ2VEZXRlY3RvclJlZiwgZGlyLCBncm91cCwgZHJhZ0Ryb3BSZWdpc3RyeSwgX2RvY3VtZW50KSk7XG4gICAgLy8gc3VwZXIoZWxlbWVudCwgZHJhZ0Ryb3AsIGNoYW5nZURldGVjdG9yUmVmLCBkaXIsIGdyb3VwKTtcbiAgICBjb25zdCByZW9yZGVyID0gcGx1Z2luQ3RybC5nZXRQbHVnaW4oJ2NvbHVtblJlb3JkZXInKTtcbiAgICByZW9yZGVyLmNvbm5lY3RlZFRvID0gdGhpcy5pZDtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuZHJvcHBlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gZXZlbnQuaXRlbSBhcyBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxhbnk+PjtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLnRhYmxlLmNvbHVtbkFwaS5hZGRHcm91cEJ5KGl0ZW0uZGF0YS5jb2x1bW4pO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmVudGVyZWRcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGV2ZW50Lml0ZW0gYXMgUGJsRHJhZ1JlZjxQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmU8YW55Pj47XG4gICAgICAgIHRoaXMucGVuZGluZyA9IGl0ZW0uZGF0YS5jb2x1bW47XG4gICAgICAgIGl0ZW0uZ2V0UGxhY2Vob2xkZXJFbGVtZW50KCkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIGl0ZW0uZGF0YS5nZXRDZWxscygpKSB7XG4gICAgICAgICAgYy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMucGJsRHJvcExpc3RSZWYuZXhpdGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIGl0ZW0uZ2V0UGxhY2Vob2xkZXJFbGVtZW50KCkuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgaXRlbS5kYXRhLmdldENlbGxzKCkpIHtcbiAgICAgICAgICBjLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAgIC8qIENka0xhenlEcm9wTGlzdCBzdGFydCAqL1xuICAvKipcbiAgICogU2VsZWN0b3IgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnQsIHN0YXJ0aW5nIGZyb21cbiAgICogdGhlIGBjZGtEcm9wTGlzdGAgZWxlbWVudCBhbmQgZ29pbmcgZG93biB0aGUgRE9NLiBQYXNzaW5nIGFuIGFsdGVybmF0ZSBkaXJlY3QgY29udGFpbmVyIGVsZW1lbnRcbiAgICogaXMgdXNlZnVsIHdoZW4gdGhlIGBjZGtEcm9wTGlzdGAgaXMgbm90IHRoZSBkaXJlY3QgcGFyZW50IChpLmUuIGFuY2VzdG9yIGJ1dCBub3QgZmF0aGVyKVxuICAgKiBvZiB0aGUgZHJhZ2dhYmxlIGVsZW1lbnRzLlxuICAgKi9cbiAgZGlyZWN0Q29udGFpbmVyRWxlbWVudDogc3RyaW5nO1xuICBnZXQgcGJsRHJvcExpc3RSZWYoKTogUGJsRHJvcExpc3RSZWY8YW55PiB7IHJldHVybiB0aGlzLl9kcm9wTGlzdFJlZiBhcyBhbnk7IH1cbiAgb3JpZ2luYWxFbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgX2RyYWdnYWJsZXNTZXQgPSBuZXcgU2V0PENka0RyYWc+KCk7XG4gIG5nT25Jbml0KCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7IH1cbiAgYWRkRHJhZyhkcmFnOiBDZGtEcmFnKTogdm9pZCB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmFkZERyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxuICByZW1vdmVEcmFnKGRyYWc6IENka0RyYWcpOiBib29sZWFuIHsgcmV0dXJuIENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUucmVtb3ZlRHJhZy5jYWxsKHRoaXMsIGRyYWcpOyB9XG4gIGJlZm9yZVN0YXJ0ZWQoKTogdm9pZCB7IENka0xhenlEcm9wTGlzdC5wcm90b3R5cGUuYmVmb3JlU3RhcnRlZC5jYWxsKHRoaXMpOyB9XG4gIC8qIENka0xhenlEcm9wTGlzdCBlbmQgKi9cblxufVxuIl19