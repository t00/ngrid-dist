/**
 * @fileoverview added by tsickle
 * Generated from: lib/drag-and-drop/column/aggregation-column.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __values } from "tslib";
// tslint:disable:no-output-rename
import { ChangeDetectorRef, Directive, ElementRef, Optional, SkipSelf, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDropListGroup, CdkDropList, CDK_DROP_LIST, } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { CdkLazyDropList } from '../core/lazy-drag-drop';
import { PblDragDrop } from '../core/drag-drop';
/** @type {?} */
var _uniqueIdCounter = 0;
/**
 * @template T
 */
var PblNgridAggregationContainerDirective = /** @class */ (function (_super) {
    __extends(PblNgridAggregationContainerDirective, _super);
    function PblNgridAggregationContainerDirective(grid, pluginCtrl, element, dragDrop, changeDetectorRef, dir, group) {
        var _this = _super.call(this, element, dragDrop, changeDetectorRef, dir, group) || this;
        _this.grid = grid;
        _this.id = "pbl-ngrid-column-aggregation-container-" + _uniqueIdCounter++;
        _this.orientation = 'horizontal';
        _this._draggablesSet = new Set();
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
                for (var _b = __values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                for (var _b = __values(item.data.getCells()), _c = _b.next(); !_c.done; _c = _b.next()) {
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
        { type: CdkDropListGroup, decorators: [{ type: Optional }, { type: SkipSelf }] }
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
    /** @type {?} */
    PblNgridAggregationContainerDirective.prototype._draggables;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRpb24tY29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2RyYWctYW5kLWRyb3AvY29sdW1uL2FnZ3JlZ2F0aW9uLWNvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsVUFBVSxFQUVWLFFBQVEsRUFDUixRQUFRLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCxRQUFRLEVBQ1IsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFFWCxhQUFhLEdBRWQsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBSXpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7SUFFNUMsZ0JBQWdCLEdBQUcsQ0FBQzs7OztBQUV4QjtJQWVvRSx5REFBYztJQU9oRiwrQ0FBbUIsSUFBMEIsRUFDakMsVUFBb0MsRUFDcEMsT0FBZ0MsRUFDaEMsUUFBa0IsRUFDbEIsaUJBQW9DLEVBQ3hCLEdBQW9CLEVBQ1IsS0FBcUM7UUFOekUsWUFPRSxrQkFBTSxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsU0E4QnhEO1FBckNrQixVQUFJLEdBQUosSUFBSSxDQUFzQjtRQU43QyxRQUFFLEdBQUcsNENBQTBDLGdCQUFnQixFQUFJLENBQUM7UUFDcEUsaUJBQVcsR0FBOEIsWUFBWSxDQUFDO1FBc0R0RCxvQkFBYyxHQUFHLElBQUksR0FBRyxFQUFXLENBQUM7O1lBekM1QixPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FB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T0FBTyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFO3dCQUMvQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLHFDQUFxQyxFQUFFO3FCQUMvRTtpQkFDRjs7OztnQkF2QlEsaUJBQWlCO2dCQUFFLHdCQUF3QjtnQkFoQmxELFVBQVU7Z0JBUVYsUUFBUTtnQkFWUixpQkFBaUI7Z0JBUVYsY0FBYyx1QkE4Q1IsUUFBUTtnQkEzQ3JCLGdCQUFnQix1QkE0Q0gsUUFBUSxZQUFJLFFBQVE7O0lBa0RuQyw0Q0FBQztDQUFBLEFBOUVELENBZW9FLFdBQVcsR0ErRDlFO1NBL0RZLHFDQUFxQzs7O0lBQ2hELG1EQUFvRTs7SUFDcEUsNERBQXNEOztJQUV0RCx3REFBbUI7O0lBQ25CLDREQUFnQzs7Ozs7Ozs7SUFnRGhDLHVFQUErQjs7SUFFL0IsZ0VBQXlDOztJQUN6QywrREFBb0M7O0lBakR4QixxREFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTpuby1vdXRwdXQtcmVuYW1lXG5cbmltcG9ydCB7XG4gIEluamVjdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgT25EZXN0cm95LFxuICBPcHRpb25hbCxcbiAgU2tpcFNlbGYsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIERyYWdEcm9wLFxuICBDZGtEcm9wTGlzdEdyb3VwLFxuICBDZGtEcm9wTGlzdCxcbiAgQ2RrRHJhZyxcbiAgQ0RLX0RST1BfTElTVCxcbiAgRHJhZ0Ryb3BSZWdpc3RyeSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibENvbHVtbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgQ2RrTGF6eURyb3BMaXN0IH0gZnJvbSAnLi4vY29yZS9sYXp5LWRyYWctZHJvcCc7XG5pbXBvcnQgeyBQYmxEcmFnUmVmIH0gZnJvbSAnLi4vY29yZS9kcmFnLXJlZic7XG5pbXBvcnQgeyBQYmxEcm9wTGlzdFJlZiB9IGZyb20gJy4uL2NvcmUvZHJvcC1saXN0LXJlZic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRyYWdEaXJlY3RpdmUgfSBmcm9tICcuL2NvbHVtbi1yZW9yZGVyLXBsdWdpbic7XG5pbXBvcnQgeyBQYmxEcmFnRHJvcCB9IGZyb20gJy4uL2NvcmUvZHJhZy1kcm9wJztcblxubGV0IF91bmlxdWVJZENvdW50ZXIgPSAwO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsQWdncmVnYXRpb25Db250YWluZXJdJyxcbiAgZXhwb3J0QXM6ICdwYmxBZ2dyZWdhdGlvbkNvbnRhaW5lcicsXG4gIGlucHV0czogW1xuICAgICdkaXJlY3RDb250YWluZXJFbGVtZW50OmNka0Ryb3BMaXN0RGlyZWN0Q29udGFpbmVyRWxlbWVudCdcbiAgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdjZGstZHJvcC1saXN0JyxcbiAgICAnW2lkXSc6ICdpZCcsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogRHJhZ0Ryb3AsIHVzZUV4aXN0aW5nOiBQYmxEcmFnRHJvcCB9LFxuICAgIHsgcHJvdmlkZTogQ0RLX0RST1BfTElTVCwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQWdncmVnYXRpb25Db250YWluZXJEaXJlY3RpdmUgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRBZ2dyZWdhdGlvbkNvbnRhaW5lckRpcmVjdGl2ZTxUID0gYW55PiBleHRlbmRzIENka0Ryb3BMaXN0PFQ+IGltcGxlbWVudHMgT25EZXN0cm95LCBDZGtMYXp5RHJvcExpc3Q8VD4ge1xuICBpZCA9IGBwYmwtbmdyaWQtY29sdW1uLWFnZ3JlZ2F0aW9uLWNvbnRhaW5lci0ke191bmlxdWVJZENvdW50ZXIrK31gO1xuICBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBwZW5kaW5nOiBQYmxDb2x1bW47XG4gIF9kcmFnZ2FibGVzOiBRdWVyeUxpc3Q8Q2RrRHJhZz47XG5cbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+LFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBkcmFnRHJvcDogRHJhZ0Ryb3AsXG4gICAgICAgICAgICAgIGNoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyPzogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIGdyb3VwPzogQ2RrRHJvcExpc3RHcm91cDxDZGtEcm9wTGlzdD4pIHtcbiAgICBzdXBlcihlbGVtZW50LCBkcmFnRHJvcCwgY2hhbmdlRGV0ZWN0b3JSZWYsIGRpciwgZ3JvdXApO1xuICAgIGNvbnN0IHJlb3JkZXIgPSBwbHVnaW5DdHJsLmdldFBsdWdpbignY29sdW1uUmVvcmRlcicpO1xuICAgIHJlb3JkZXIuY29ubmVjdGVkVG8gPSB0aGlzLmlkO1xuXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5kcm9wcGVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZ3JpZC5jb2x1bW5BcGkuYWRkR3JvdXBCeShpdGVtLmRhdGEuY29sdW1uKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5wYmxEcm9wTGlzdFJlZi5lbnRlcmVkXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBldmVudC5pdGVtIGFzIFBibERyYWdSZWY8UGJsTmdyaWRDb2x1bW5EcmFnRGlyZWN0aXZlPGFueT4+O1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBpdGVtLmRhdGEuY29sdW1uO1xuICAgICAgICBpdGVtLmdldFBsYWNlaG9sZGVyRWxlbWVudCgpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGZvciAoY29uc3QgYyBvZiBpdGVtLmRhdGEuZ2V0Q2VsbHMoKSkge1xuICAgICAgICAgIGMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLnBibERyb3BMaXN0UmVmLmV4aXRlZFxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpdGVtID0gZXZlbnQuaXRlbSBhcyBQYmxEcmFnUmVmPFBibE5ncmlkQ29sdW1uRHJhZ0RpcmVjdGl2ZTxhbnk+PjtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICBpdGVtLmdldFBsYWNlaG9sZGVyRWxlbWVudCgpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgZm9yIChjb25zdCBjIG9mIGl0ZW0uZGF0YS5nZXRDZWxscygpKSB7XG4gICAgICAgICAgYy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgICAvKiBDZGtMYXp5RHJvcExpc3Qgc3RhcnQgKi9cbiAgLyoqXG4gICAqIFNlbGVjdG9yIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50LCBzdGFydGluZyBmcm9tXG4gICAqIHRoZSBgY2RrRHJvcExpc3RgIGVsZW1lbnQgYW5kIGdvaW5nIGRvd24gdGhlIERPTS4gUGFzc2luZyBhbiBhbHRlcm5hdGUgZGlyZWN0IGNvbnRhaW5lciBlbGVtZW50XG4gICAqIGlzIHVzZWZ1bCB3aGVuIHRoZSBgY2RrRHJvcExpc3RgIGlzIG5vdCB0aGUgZGlyZWN0IHBhcmVudCAoaS5lLiBhbmNlc3RvciBidXQgbm90IGZhdGhlcilcbiAgICogb2YgdGhlIGRyYWdnYWJsZSBlbGVtZW50cy5cbiAgICovXG4gIGRpcmVjdENvbnRhaW5lckVsZW1lbnQ6IHN0cmluZztcbiAgZ2V0IHBibERyb3BMaXN0UmVmKCk6IFBibERyb3BMaXN0UmVmPGFueT4geyByZXR1cm4gdGhpcy5fZHJvcExpc3RSZWYgYXMgYW55OyB9XG4gIG9yaWdpbmFsRWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG4gIF9kcmFnZ2FibGVzU2V0ID0gbmV3IFNldDxDZGtEcmFnPigpO1xuICBuZ09uSW5pdCgpOiB2b2lkIHsgQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpOyB9XG4gIGFkZERyYWcoZHJhZzogQ2RrRHJhZyk6IHZvaWQgeyByZXR1cm4gQ2RrTGF6eURyb3BMaXN0LnByb3RvdHlwZS5hZGREcmFnLmNhbGwodGhpcywgZHJhZyk7IH1cbiAgcmVtb3ZlRHJhZyhkcmFnOiBDZGtEcmFnKTogYm9vbGVhbiB7IHJldHVybiBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLnJlbW92ZURyYWcuY2FsbCh0aGlzLCBkcmFnKTsgfVxuICBiZWZvcmVTdGFydGVkKCk6IHZvaWQgeyBDZGtMYXp5RHJvcExpc3QucHJvdG90eXBlLmJlZm9yZVN0YXJ0ZWQuY2FsbCh0aGlzKTsgfVxuICAvKiBDZGtMYXp5RHJvcExpc3QgZW5kICovXG5cbn1cbiJdfQ==