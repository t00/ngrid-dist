/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/strategies.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { AutoSizeVirtualScrollStrategy, ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { PblNgridComponent } from '../../ngrid.component';
/** @type {?} */
var noop = (/**
 * @param {?=} nv
 * @param {?=} nv1
 * @return {?}
 */
function (nv, nv1) { });
var ɵ0 = noop;
var NoVirtualScrollStrategy = /** @class */ (function () {
    function NoVirtualScrollStrategy() {
        this.attach = noop;
        this.detach = noop;
        this.onContentScrolled = noop;
        this.onDataLengthChanged = noop;
        this.onContentRendered = noop;
        this.onRenderedOffsetChanged = noop;
        this.scrollToIndex = noop;
    }
    return NoVirtualScrollStrategy;
}());
export { NoVirtualScrollStrategy };
if (false) {
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.scrolledIndexChange;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.attach;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.detach;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onContentScrolled;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onDataLengthChanged;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onContentRendered;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.onRenderedOffsetChanged;
    /** @type {?} */
    NoVirtualScrollStrategy.prototype.scrollToIndex;
}
var TableItemSizeAverager = /** @class */ (function (_super) {
    __extends(TableItemSizeAverager, _super);
    function TableItemSizeAverager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} range
     * @param {?} size
     * @return {?}
     */
    TableItemSizeAverager.prototype.addSample = /**
     * @param {?} range
     * @param {?} size
     * @return {?}
     */
    function (range, size) {
        if (this.rowInfo && this.rowInfo.rowLength === 0) {
            this.reset();
        }
        else {
            _super.prototype.addSample.call(this, range, size);
        }
    };
    /**
     * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
     *
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the grid to render
     * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
     * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
     * calculation of the average item size in `ItemSizeAverager`
     *
     * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
     */
    /**
     * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
     *
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the grid to render
     * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
     * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
     * calculation of the average item size in `ItemSizeAverager`
     *
     * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
     * @param {?} rowInfo
     * @return {?}
     */
    TableItemSizeAverager.prototype.setRowInfo = /**
     * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
     *
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the grid to render
     * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
     * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
     * calculation of the average item size in `ItemSizeAverager`
     *
     * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
     * @param {?} rowInfo
     * @return {?}
     */
    function (rowInfo) {
        this.rowInfo = rowInfo;
    };
    return TableItemSizeAverager;
}(ItemSizeAverager));
export { TableItemSizeAverager };
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableItemSizeAverager.prototype.rowInfo;
}
var PblNgridFixedSizeVirtualScrollStrategy = /** @class */ (function (_super) {
    __extends(PblNgridFixedSizeVirtualScrollStrategy, _super);
    function PblNgridFixedSizeVirtualScrollStrategy(itemSize, minBufferPx, maxBufferPx) {
        var _this = _super.call(this, itemSize, minBufferPx, maxBufferPx) || this;
        _this.itemSize = itemSize;
        return _this;
    }
    /**
     * @param {?} viewport
     * @return {?}
     */
    PblNgridFixedSizeVirtualScrollStrategy.prototype.attach = /**
     * @param {?} viewport
     * @return {?}
     */
    function (viewport) {
        _super.prototype.attach.call(this, this._ngridViewport = viewport);
    };
    /**
     * @return {?}
     */
    PblNgridFixedSizeVirtualScrollStrategy.prototype.onContentScrolled = /**
     * @return {?}
     */
    function () {
        // https://github.com/shlomiassaf/ngrid/issues/11
        // This is a workaround an issue with FixedSizeVirtualScrollStrategy
        // When:
        //    - The rendered data is changed so the data length is now LOWER then the current range (end - start)
        //    - The rendering direction is towards the top (start > end)
        //
        // For the issue to occur a big gap between the data length and the range length (gap), which does not happen on normal scrolling
        // but only when the data source is replaced (e.g. filtering).
        //
        // In such cases `onDataLengthChanged` is called which will call `_updateRenderedRange` which will calculate a new range
        // that is big, it will give the `start` a new value which creates the big gap.
        // It will then calculate a new "end" and leave the "start" so we have a big gap, larger then the viewport size.
        // After that it will create the new offset which is the itemSize * start, which is a bit lower then the offset but is large and again does not fit the viewport size
        // The scroll change will trigger `onContentScrolled` which will call `_updateRenderedRange` again,
        // with the same outcome, reducing the offset slightly, calling `onContentScrolled` again.
        // It will repeat until reaching the proper offset.
        //
        // The amount of offset reduced each time is approx the size of the buffers. (mix/max Buffer).
        //
        // This strategy is here only because of this error, it will let the initial update run and catch it's subsequent scroll event.
        if (!this._ngridViewport) {
            return;
        }
        var _a = this._ngridViewport.getRenderedRange(), start = _a.start, end = _a.end;
        /** @type {?} */
        var rangeLength = end - start;
        /** @type {?} */
        var dataLength = this._ngridViewport.getDataLength();
        if (rangeLength < 0 && dataLength < -rangeLength) {
            start = dataLength - end;
            this._ngridViewport.setRenderedRange({ start: start, end: end });
            this._ngridViewport.setRenderedContentOffset(this.itemSize * start);
            // this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
        }
        else {
            _super.prototype.onContentScrolled.call(this);
        }
    };
    return PblNgridFixedSizeVirtualScrollStrategy;
}(FixedSizeVirtualScrollStrategy));
export { PblNgridFixedSizeVirtualScrollStrategy };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridFixedSizeVirtualScrollStrategy.prototype._ngridViewport;
    /**
     * @type {?}
     * @private
     */
    PblNgridFixedSizeVirtualScrollStrategy.prototype.itemSize;
}
var TableAutoSizeVirtualScrollStrategy = /** @class */ (function (_super) {
    __extends(TableAutoSizeVirtualScrollStrategy, _super);
    function TableAutoSizeVirtualScrollStrategy(minBufferPx, maxBufferPx, averager) {
        if (averager === void 0) { averager = new TableItemSizeAverager(); }
        var _this = _super.call(this, minBufferPx, maxBufferPx, averager) || this;
        _this.averager = averager;
        return _this;
    }
    return TableAutoSizeVirtualScrollStrategy;
}(AutoSizeVirtualScrollStrategy));
export { TableAutoSizeVirtualScrollStrategy };
if (false) {
    /** @type {?} */
    TableAutoSizeVirtualScrollStrategy.prototype.averager;
}
/** @type {?} */
var TYPES = ['vScrollAuto', 'vScrollFixed', 'vScrollNone'];
/**
 * @param {?} directive
 * @return {?}
 */
export function _vScrollStrategyFactory(directive) {
    return directive._scrollStrategy;
}
/**
 * A virtual scroll strategy that supports unknown or dynamic size items.
 */
var PblCdkVirtualScrollDirective = /** @class */ (function () {
    function PblCdkVirtualScrollDirective(el, grid) {
        this.grid = grid;
        this._minBufferPx = 100;
        this._maxBufferPx = 200;
        /** @type {?} */
        var types = TYPES.filter((/**
         * @param {?} t
         * @return {?}
         */
        function (t) { return el.nativeElement.hasAttribute(t); }));
        if (types.length > 1) {
            throw new Error("Invalid vScroll instruction, only one value is allow: " + JSON.stringify(types));
        }
        else {
            this._type = types[0];
        }
    }
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "vScrollAuto", {
        /**
       * The size of the items in the list (in pixels).
       * Valid for `vScrollFixed` only!
       *
       * Default: 20
       */
        get: /**
         * The size of the items in the list (in pixels).
         * Valid for `vScrollFixed` only!
         *
         * Default: 20
         * @return {?}
         */
        function () { return this._vScrollAuto; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._vScrollAuto = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "vScrollFixed", {
        /**
         * The size of the items in the list (in pixels).
         * Valid for `vScrollFixed` only!
         *
         * Default: 20
         */
        get: /**
         * The size of the items in the list (in pixels).
         * Valid for `vScrollFixed` only!
         *
         * Default: 20
         * @return {?}
         */
        function () { return this._vScrollFixed; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._vScrollFixed = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "minBufferPx", {
        /**
         * The minimum amount of buffer rendered beyond the viewport (in pixels).
         * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
         *
         * Valid for `vScrollAuto` and `vScrollFixed` only!
         * Default: 100
         */
        get: /**
         * The minimum amount of buffer rendered beyond the viewport (in pixels).
         * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
         *
         * Valid for `vScrollAuto` and `vScrollFixed` only!
         * Default: 100
         * @return {?}
         */
        function () { return this._minBufferPx; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._minBufferPx = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "maxBufferPx", {
        /**
         * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
         *
         * Valid for `vScrollAuto` and `vScrollFixed` only!
         * Default: 100
         */
        get: /**
         * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
         *
         * Valid for `vScrollAuto` and `vScrollFixed` only!
         * Default: 100
         * @return {?}
         */
        function () { return this._maxBufferPx; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._maxBufferPx = coerceNumberProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "wheelMode", {
        get: /**
         * @return {?}
         */
        function () { return this._wheelMode; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            switch (value) {
                case 'passive':
                case 'blocking':
                    this._wheelMode = value;
                    break;
                default:
                    /** @type {?} */
                    var wheelMode = coerceNumberProperty(value);
                    if (wheelMode && wheelMode >= 1 && wheelMode <= 60) {
                        this._wheelMode = wheelMode;
                    }
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () { return this._type; },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this._type) {
            if ('_vScrollFixed' in (/** @type {?} */ (this))) {
                this._type = 'vScrollFixed';
            }
            else if ('_vScrollAuto' in (/** @type {?} */ (this))) {
                this._type = 'vScrollAuto';
            }
            else {
                this._type = 'vScrollNone';
            }
        }
        switch (this.type) {
            case 'vScrollFixed':
                if (!this._vScrollFixed) {
                    this.vScrollFixed = this.grid.findInitialRowHeight() || 48;
                }
                this._scrollStrategy = new PblNgridFixedSizeVirtualScrollStrategy(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                break;
            case 'vScrollAuto':
                if (!this._vScrollAuto) {
                    this._vScrollAuto = this.grid.findInitialRowHeight() || 48;
                }
                this._scrollStrategy = new TableAutoSizeVirtualScrollStrategy(this.minBufferPx, this.maxBufferPx, new TableItemSizeAverager(this._vScrollAuto));
                break;
            default:
                this._scrollStrategy = new NoVirtualScrollStrategy();
                break;
        }
    };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (this._scrollStrategy) {
            switch (this.type) {
                case 'vScrollFixed':
                    ((/** @type {?} */ (this._scrollStrategy)))
                        .updateItemAndBufferSize(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                    break;
                case 'vScrollAuto':
                    ((/** @type {?} */ (this._scrollStrategy)))
                        .updateBufferSize(this.minBufferPx, this.maxBufferPx);
                    break;
                default:
                    break;
            }
        }
    };
    Object.defineProperty(PblCdkVirtualScrollDirective.prototype, "scrolledIndexChange", {
        get: /**
         * @return {?}
         */
        function () { return this._scrollStrategy.scrolledIndexChange; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._scrollStrategy.scrolledIndexChange = value; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} viewport
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.attach = /**
     * @param {?} viewport
     * @return {?}
     */
    function (viewport) { this._scrollStrategy.attach(viewport); };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.detach = /**
     * @return {?}
     */
    function () { this._scrollStrategy.detach(); };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.onContentScrolled = /**
     * @return {?}
     */
    function () { this._scrollStrategy.onContentScrolled(); };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.onDataLengthChanged = /**
     * @return {?}
     */
    function () { this._scrollStrategy.onDataLengthChanged(); };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.onContentRendered = /**
     * @return {?}
     */
    function () { this._scrollStrategy.onContentRendered(); };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.onRenderedOffsetChanged = /**
     * @return {?}
     */
    function () { this._scrollStrategy.onRenderedOffsetChanged(); };
    /**
     * @param {?} index
     * @param {?} behavior
     * @return {?}
     */
    PblCdkVirtualScrollDirective.prototype.scrollToIndex = /**
     * @param {?} index
     * @param {?} behavior
     * @return {?}
     */
    function (index, behavior) { this._scrollStrategy.scrollToIndex(index, behavior); };
    PblCdkVirtualScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'pbl-ngrid[vScrollAuto], pbl-ngrid[vScrollFixed], pbl-ngrid[vScrollNone]',
                    providers: [{
                            provide: VIRTUAL_SCROLL_STRATEGY,
                            useExisting: PblCdkVirtualScrollDirective,
                        }],
                },] }
    ];
    /** @nocollapse */
    PblCdkVirtualScrollDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: PblNgridComponent }
    ]; };
    PblCdkVirtualScrollDirective.propDecorators = {
        vScrollAuto: [{ type: Input }],
        vScrollFixed: [{ type: Input }],
        minBufferPx: [{ type: Input }],
        maxBufferPx: [{ type: Input }],
        wheelMode: [{ type: Input }]
    };
    return PblCdkVirtualScrollDirective;
}());
export { PblCdkVirtualScrollDirective };
if (false) {
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._vScrollAuto;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._vScrollFixed;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._minBufferPx;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._maxBufferPx;
    /** @type {?} */
    PblCdkVirtualScrollDirective.prototype._wheelMode;
    /**
     * The scroll strategy used by this directive.
     * @type {?}
     */
    PblCdkVirtualScrollDirective.prototype._scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollDirective.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollDirective.prototype.grid;
    /* Skipping unhandled member: ;*/
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9zdHJhdGVnaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0QsT0FBTyxFQUE0Qiw4QkFBOEIsRUFBeUIsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsSixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV0RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFJcEQsSUFBSTs7Ozs7QUFBRyxVQUFTLEVBQVEsRUFBRSxHQUFTLElBQUksQ0FBQyxDQUFBOztBQUU5QztJQUFBO1FBRUUsV0FBTSxHQUFpRCxJQUFJLENBQUM7UUFDNUQsV0FBTSxHQUFlLElBQUksQ0FBQztRQUMxQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMsd0JBQW1CLEdBQWUsSUFBSSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyw0QkFBdUIsR0FBZSxJQUFJLENBQUM7UUFDM0Msa0JBQWEsR0FBc0QsSUFBSSxDQUFDO0lBQzFFLENBQUM7SUFBRCw4QkFBQztBQUFELENBQUMsQUFURCxJQVNDOzs7O0lBUkMsc0RBQXlCOztJQUN6Qix5Q0FBNEQ7O0lBQzVELHlDQUEwQjs7SUFDMUIsb0RBQXFDOztJQUNyQyxzREFBdUM7O0lBQ3ZDLG9EQUFxQzs7SUFDckMsMERBQTJDOztJQUMzQyxnREFBd0U7O0FBRzFFO0lBQTJDLHlDQUFnQjtJQUEzRDs7SUF3QkEsQ0FBQzs7Ozs7O0lBckJDLHlDQUFTOzs7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QUFDLENBQUMsQ0FBQzs7Ozs7O0lBQ25GLG9EQUFhOzs7OztJQUFiLFVBQWMsS0FBYSxFQUFFLFFBQXdCLElBQVUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBeEl0SCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlFQUF5RTtvQkFDbkYsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLHVCQUF1Qjs0QkFDaEMsV0FBVyxFQUFFLDRCQUE0Qjt5QkFDMUMsQ0FBQztpQkFDSDs7OztnQkF4SDZDLFVBQVU7Z0JBTy9DLGlCQUFpQjs7OzhCQXlIdkIsS0FBSzsrQkFVTCxLQUFLOzhCQVdMLEtBQUs7OEJBVUwsS0FBSzs0QkFJTCxLQUFLOztJQXdGUixtQ0FBQztDQUFBLEFBeklELElBeUlDO1NBbElZLDRCQUE0Qjs7O0lBU3ZDLG9EQUFxQjs7SUFVckIscURBQXNCOztJQVd0QixvREFBbUI7O0lBVW5CLG9EQUFtQjs7SUFpQm5CLGtEQUE0Qzs7Ozs7SUFHNUMsdURBQXVDOzs7OztJQUd2Qyw2Q0FBOEQ7Ozs7O0lBRXJCLDRDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsIEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIEl0ZW1TaXplQXZlcmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8gfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5pbXBvcnQgeyBQIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuY29uc3Qgbm9vcCA9IGZ1bmN0aW9uKG52PzogYW55LCBudjE/OiBhbnkpIHsgfTtcblxuZXhwb3J0IGNsYXNzIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGltcGxlbWVudHMgVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgc2Nyb2xsZWRJbmRleENoYW5nZTogYW55O1xuICBhdHRhY2g6ICh2aWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KSA9PiB2b2lkID0gbm9vcDtcbiAgZGV0YWNoOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25Db250ZW50U2Nyb2xsZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBvbkRhdGFMZW5ndGhDaGFuZ2VkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25Db250ZW50UmVuZGVyZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBvblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHNjcm9sbFRvSW5kZXg6IChpbmRleDogbnVtYmVyLCBiZWhhdmlvcjogU2Nyb2xsQmVoYXZpb3IpID0+IHZvaWQgPSBub29wO1xufVxuXG5leHBvcnQgY2xhc3MgVGFibGVJdGVtU2l6ZUF2ZXJhZ2VyIGV4dGVuZHMgSXRlbVNpemVBdmVyYWdlciB7XG4gIHByaXZhdGUgcm93SW5mbzogTmdlVmlydHVhbFRhYmxlUm93SW5mbztcblxuICBhZGRTYW1wbGUocmFuZ2U6IExpc3RSYW5nZSwgc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucm93SW5mbyAmJiB0aGlzLnJvd0luZm8ucm93TGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZFNhbXBsZShyYW5nZSwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdGVtcCB3b3JrYXJvdW5kIHRvIHNvbHZlIHRoZSBhY3R1YWwgdnMgd2FudGVkIHJlbmRlcmVkIHJvdyBpc3N1ZSBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YFxuICAgKlxuICAgKiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LmdldFJlbmRlcmVkUmFuZ2UoKWAgcmV0dXJuIHRoZSByb3dzIHRoYXQgdGhlIHZpcnR1YWwgY29udGFpbmVyIHdhbnQncyB0aGUgZ3JpZCB0byByZW5kZXJcbiAgICogaG93ZXZlciwgdGhlIGFjdHVhbCByZW5kZXJlZCByb3dzIG1pZ2h0IGJlIGRpZmZlcmVudC4gVGhpcyBpcyBhIHByb2JsZW0gZXNwZWNpYWxseSBpbiBpbml0LCB3aGVuIHRoZSByZW5kZXJlZCByb3dzIGFyZSBhY3R1YWxseSAwXG4gICAqIGJ1dCBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LmdldFJlbmRlcmVkUmFuZ2UoKWAgcmV0dXJuIHRoZSBpbml0aWFsIHJhbmdlIG9mIHJvd3MgdGhhdCBzaG91bGQgYmUgcmVuZGVyZWQuIFRoaXMgcmVzdWx0cyBpbiBhIHdyb25nXG4gICAqIGNhbGN1bGF0aW9uIG9mIHRoZSBhdmVyYWdlIGl0ZW0gc2l6ZSBpbiBgSXRlbVNpemVBdmVyYWdlcmBcbiAgICpcbiAgICogU0VFOiBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi9hOWU1NTBlNWJmOTNjZDY4YzM0MmQxYTUwZDg1NzZkOGYzODEyZWJlL3NyYy9jZGsvc2Nyb2xsaW5nL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LnRzI0wyMTItTDIyMFxuICAgKi9cbiAgc2V0Um93SW5mbyhyb3dJbmZvOiBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvKTogdm9pZCB7XG4gICAgdGhpcy5yb3dJbmZvID0gcm93SW5mbztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgZXh0ZW5kcyBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuXG4gIHByaXZhdGUgX25ncmlkVmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TaXplOiBudW1iZXIsIG1pbkJ1ZmZlclB4OiBudW1iZXIsIG1heEJ1ZmZlclB4OiBudW1iZXIpIHtcbiAgICBzdXBlcihpdGVtU2l6ZSwgbWluQnVmZmVyUHgsIG1heEJ1ZmZlclB4KTtcbiAgfVxuXG4gIGF0dGFjaCh2aWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KSB7XG4gICAgc3VwZXIuYXR0YWNoKHRoaXMuX25ncmlkVmlld3BvcnQgPSB2aWV3cG9ydCk7XG4gIH1cblxuICBvbkNvbnRlbnRTY3JvbGxlZCgpIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc2hsb21pYXNzYWYvbmdyaWQvaXNzdWVzLzExXG5cbiAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCBhbiBpc3N1ZSB3aXRoIEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneVxuICAgIC8vIFdoZW46XG4gICAgLy8gICAgLSBUaGUgcmVuZGVyZWQgZGF0YSBpcyBjaGFuZ2VkIHNvIHRoZSBkYXRhIGxlbmd0aCBpcyBub3cgTE9XRVIgdGhlbiB0aGUgY3VycmVudCByYW5nZSAoZW5kIC0gc3RhcnQpXG4gICAgLy8gICAgLSBUaGUgcmVuZGVyaW5nIGRpcmVjdGlvbiBpcyB0b3dhcmRzIHRoZSB0b3AgKHN0YXJ0ID4gZW5kKVxuICAgIC8vXG4gICAgLy8gRm9yIHRoZSBpc3N1ZSB0byBvY2N1ciBhIGJpZyBnYXAgYmV0d2VlbiB0aGUgZGF0YSBsZW5ndGggYW5kIHRoZSByYW5nZSBsZW5ndGggKGdhcCksIHdoaWNoIGRvZXMgbm90IGhhcHBlbiBvbiBub3JtYWwgc2Nyb2xsaW5nXG4gICAgLy8gYnV0IG9ubHkgd2hlbiB0aGUgZGF0YSBzb3VyY2UgaXMgcmVwbGFjZWQgKGUuZy4gZmlsdGVyaW5nKS5cbiAgICAvL1xuICAgIC8vIEluIHN1Y2ggY2FzZXMgYG9uRGF0YUxlbmd0aENoYW5nZWRgIGlzIGNhbGxlZCB3aGljaCB3aWxsIGNhbGwgYF91cGRhdGVSZW5kZXJlZFJhbmdlYCB3aGljaCB3aWxsIGNhbGN1bGF0ZSBhIG5ldyByYW5nZVxuICAgIC8vIHRoYXQgaXMgYmlnLCBpdCB3aWxsIGdpdmUgdGhlIGBzdGFydGAgYSBuZXcgdmFsdWUgd2hpY2ggY3JlYXRlcyB0aGUgYmlnIGdhcC5cbiAgICAvLyBJdCB3aWxsIHRoZW4gY2FsY3VsYXRlIGEgbmV3IFwiZW5kXCIgYW5kIGxlYXZlIHRoZSBcInN0YXJ0XCIgc28gd2UgaGF2ZSBhIGJpZyBnYXAsIGxhcmdlciB0aGVuIHRoZSB2aWV3cG9ydCBzaXplLlxuICAgIC8vIEFmdGVyIHRoYXQgaXQgd2lsbCBjcmVhdGUgdGhlIG5ldyBvZmZzZXQgd2hpY2ggaXMgdGhlIGl0ZW1TaXplICogc3RhcnQsIHdoaWNoIGlzIGEgYml0IGxvd2VyIHRoZW4gdGhlIG9mZnNldCBidXQgaXMgbGFyZ2UgYW5kIGFnYWluIGRvZXMgbm90IGZpdCB0aGUgdmlld3BvcnQgc2l6ZVxuICAgIC8vIFRoZSBzY3JvbGwgY2hhbmdlIHdpbGwgdHJpZ2dlciBgb25Db250ZW50U2Nyb2xsZWRgIHdoaWNoIHdpbGwgY2FsbCBgX3VwZGF0ZVJlbmRlcmVkUmFuZ2VgIGFnYWluLFxuICAgIC8vIHdpdGggdGhlIHNhbWUgb3V0Y29tZSwgcmVkdWNpbmcgdGhlIG9mZnNldCBzbGlnaHRseSwgY2FsbGluZyBgb25Db250ZW50U2Nyb2xsZWRgIGFnYWluLlxuICAgIC8vIEl0IHdpbGwgcmVwZWF0IHVudGlsIHJlYWNoaW5nIHRoZSBwcm9wZXIgb2Zmc2V0LlxuICAgIC8vXG4gICAgLy8gVGhlIGFtb3VudCBvZiBvZmZzZXQgcmVkdWNlZCBlYWNoIHRpbWUgaXMgYXBwcm94IHRoZSBzaXplIG9mIHRoZSBidWZmZXJzLiAobWl4L21heCBCdWZmZXIpLlxuICAgIC8vXG4gICAgLy8gVGhpcyBzdHJhdGVneSBpcyBoZXJlIG9ubHkgYmVjYXVzZSBvZiB0aGlzIGVycm9yLCBpdCB3aWxsIGxldCB0aGUgaW5pdGlhbCB1cGRhdGUgcnVuIGFuZCBjYXRjaCBpdCdzIHN1YnNlcXVlbnQgc2Nyb2xsIGV2ZW50LlxuICAgIGlmICghdGhpcy5fbmdyaWRWaWV3cG9ydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgeyBzdGFydCwgZW5kIH0gPSB0aGlzLl9uZ3JpZFZpZXdwb3J0LmdldFJlbmRlcmVkUmFuZ2UoKTtcbiAgICBjb25zdCByYW5nZUxlbmd0aCA9IGVuZCAtIHN0YXJ0O1xuICAgIGNvbnN0IGRhdGFMZW5ndGggPSB0aGlzLl9uZ3JpZFZpZXdwb3J0LmdldERhdGFMZW5ndGgoKTtcbiAgICBpZiAocmFuZ2VMZW5ndGggPCAwICYmIGRhdGFMZW5ndGggPCAtcmFuZ2VMZW5ndGgpIHtcbiAgICAgIHN0YXJ0ID0gZGF0YUxlbmd0aCAtIGVuZDtcbiAgICAgIHRoaXMuX25ncmlkVmlld3BvcnQuc2V0UmVuZGVyZWRSYW5nZSh7IHN0YXJ0LCBlbmQgfSk7XG4gICAgICB0aGlzLl9uZ3JpZFZpZXdwb3J0LnNldFJlbmRlcmVkQ29udGVudE9mZnNldCh0aGlzLml0ZW1TaXplICogc3RhcnQpO1xuICAgICAgLy8gdGhpcy5fc2Nyb2xsZWRJbmRleENoYW5nZS5uZXh0KE1hdGguZmxvb3IoZmlyc3RWaXNpYmxlSW5kZXgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIub25Db250ZW50U2Nyb2xsZWQoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgZXh0ZW5kcyBBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKG1pbkJ1ZmZlclB4OiBudW1iZXIsIG1heEJ1ZmZlclB4OiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBhdmVyYWdlciA9IG5ldyBUYWJsZUl0ZW1TaXplQXZlcmFnZXIoKSkge1xuICAgIHN1cGVyKG1pbkJ1ZmZlclB4LCBtYXhCdWZmZXJQeCwgYXZlcmFnZXIpO1xuICB9XG59XG5cbmNvbnN0IFRZUEVTOiBBcnJheTwndlNjcm9sbEZpeGVkJyB8ICd2U2Nyb2xsQXV0bycgfCAndlNjcm9sbE5vbmUnPiA9IFsndlNjcm9sbEF1dG8nLCAndlNjcm9sbEZpeGVkJywgJ3ZTY3JvbGxOb25lJ107XG5cbmV4cG9ydCBmdW5jdGlvbiBfdlNjcm9sbFN0cmF0ZWd5RmFjdG9yeShkaXJlY3RpdmU6IHsgX3Njcm9sbFN0cmF0ZWd5OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3k7IH0pIHtcbiAgcmV0dXJuIGRpcmVjdGl2ZS5fc2Nyb2xsU3RyYXRlZ3k7XG59XG5cbi8qKiBBIHZpcnR1YWwgc2Nyb2xsIHN0cmF0ZWd5IHRoYXQgc3VwcG9ydHMgdW5rbm93biBvciBkeW5hbWljIHNpemUgaXRlbXMuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbdlNjcm9sbEF1dG9dLCBwYmwtbmdyaWRbdlNjcm9sbEZpeGVkXSwgcGJsLW5ncmlkW3ZTY3JvbGxOb25lXScsXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSxcbiAgICB1c2VFeGlzdGluZzogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSxcbiAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGl0ZW1zIGluIHRoZSBsaXN0IChpbiBwaXhlbHMpLlxuICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxGaXhlZGAgb25seSFcbiAgICpcbiAgICogRGVmYXVsdDogMjBcbiAgICovXG4gIEBJbnB1dCgpIGdldCB2U2Nyb2xsQXV0bygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdlNjcm9sbEF1dG87IH1cbiAgc2V0IHZTY3JvbGxBdXRvKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fdlNjcm9sbEF1dG8gPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgX3ZTY3JvbGxBdXRvOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCAoaW4gcGl4ZWxzKS5cbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXG4gICAqXG4gICAqIERlZmF1bHQ6IDIwXG4gICAqL1xuICBASW5wdXQoKSBnZXQgdlNjcm9sbEZpeGVkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92U2Nyb2xsRml4ZWQ7IH1cbiAgc2V0IHZTY3JvbGxGaXhlZCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX3ZTY3JvbGxGaXhlZCA9IHZhbHVlOyB9XG4gIF92U2Nyb2xsRml4ZWQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIG1pbmltdW0gYW1vdW50IG9mIGJ1ZmZlciByZW5kZXJlZCBiZXlvbmQgdGhlIHZpZXdwb3J0IChpbiBwaXhlbHMpLlxuICAgKiBJZiB0aGUgYW1vdW50IG9mIGJ1ZmZlciBkaXBzIGJlbG93IHRoaXMgbnVtYmVyLCBtb3JlIGl0ZW1zIHdpbGwgYmUgcmVuZGVyZWQuIERlZmF1bHRzIHRvIDEwMHB4LlxuICAgKlxuICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxBdXRvYCBhbmQgYHZTY3JvbGxGaXhlZGAgb25seSFcbiAgICogRGVmYXVsdDogMTAwXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbWluQnVmZmVyUHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21pbkJ1ZmZlclB4OyB9XG4gIHNldCBtaW5CdWZmZXJQeCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX21pbkJ1ZmZlclB4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gIF9taW5CdWZmZXJQeCA9IDEwMDtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBwaXhlbHMgd29ydGggb2YgYnVmZmVyIHRvIHJlbmRlciBmb3Igd2hlbiByZW5kZXJpbmcgbmV3IGl0ZW1zLiBEZWZhdWx0cyB0byAyMDBweC5cbiAgICpcbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsQXV0b2AgYW5kIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXG4gICAqIERlZmF1bHQ6IDEwMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1heEJ1ZmZlclB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9tYXhCdWZmZXJQeDsgfVxuICBzZXQgbWF4QnVmZmVyUHgodmFsdWU6IG51bWJlcikgeyB0aGlzLl9tYXhCdWZmZXJQeCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBfbWF4QnVmZmVyUHggPSAyMDA7XG5cbiAgQElucHV0KCkgZ2V0IHdoZWVsTW9kZSgpOiAncGFzc2l2ZScgfCAnYmxvY2tpbmcnIHwgbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3doZWVsTW9kZTsgfVxuICBzZXQgd2hlZWxNb2RlKHZhbHVlOiAncGFzc2l2ZScgfCAnYmxvY2tpbmcnIHwgbnVtYmVyKSB7XG4gICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgY2FzZSAncGFzc2l2ZSc6XG4gICAgICBjYXNlICdibG9ja2luZyc6XG4gICAgICAgdGhpcy5fd2hlZWxNb2RlID0gdmFsdWU7XG4gICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zdCB3aGVlbE1vZGUgPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICAgIGlmICh3aGVlbE1vZGUgJiYgd2hlZWxNb2RlID49IDEgJiYgd2hlZWxNb2RlIDw9IDYwKSB7XG4gICAgICAgICAgdGhpcy5fd2hlZWxNb2RlID0gd2hlZWxNb2RlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBfd2hlZWxNb2RlOiAncGFzc2l2ZScgfCAnYmxvY2tpbmcnIHwgbnVtYmVyO1xuXG4gIC8qKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHVzZWQgYnkgdGhpcyBkaXJlY3RpdmUuICovXG4gIF9zY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xuXG4gIGdldCB0eXBlKCk6ICd2U2Nyb2xsRml4ZWQnIHwgJ3ZTY3JvbGxBdXRvJyB8ICd2U2Nyb2xsTm9uZScgeyByZXR1cm4gdGhpcy5fdHlwZTsgfTtcbiAgcHJpdmF0ZSBfdHlwZTogJ3ZTY3JvbGxGaXhlZCcgfCAndlNjcm9sbEF1dG8nIHwgJ3ZTY3JvbGxOb25lJztcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbnN0IHR5cGVzID0gVFlQRVMuZmlsdGVyKCB0ID0+IGVsLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKHQpKTtcblxuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdlNjcm9sbCBpbnN0cnVjdGlvbiwgb25seSBvbmUgdmFsdWUgaXMgYWxsb3c6ICR7SlNPTi5zdHJpbmdpZnkodHlwZXMpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90eXBlID0gdHlwZXNbMF07XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90eXBlKSB7XG4gICAgICBpZiAoJ192U2Nyb2xsRml4ZWQnIGluIDxhbnk+dGhpcykge1xuICAgICAgICB0aGlzLl90eXBlID0gJ3ZTY3JvbGxGaXhlZCc7XG4gICAgICB9IGVsc2UgaWYgKCdfdlNjcm9sbEF1dG8nIGluIDxhbnk+dGhpcykge1xuICAgICAgICB0aGlzLl90eXBlID0gJ3ZTY3JvbGxBdXRvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAndlNjcm9sbE5vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAndlNjcm9sbEZpeGVkJzpcbiAgICAgICAgaWYgKCF0aGlzLl92U2Nyb2xsRml4ZWQpIHtcbiAgICAgICAgICB0aGlzLnZTY3JvbGxGaXhlZCAgPSB0aGlzLmdyaWQuZmluZEluaXRpYWxSb3dIZWlnaHQoKSB8fCA0ODtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9IG5ldyBQYmxOZ3JpZEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSh0aGlzLnZTY3JvbGxGaXhlZCwgdGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndlNjcm9sbEF1dG8nOlxuICAgICAgICBpZiAoIXRoaXMuX3ZTY3JvbGxBdXRvKSB7XG4gICAgICAgICAgdGhpcy5fdlNjcm9sbEF1dG8gID0gdGhpcy5ncmlkLmZpbmRJbml0aWFsUm93SGVpZ2h0KCkgfHwgNDg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBuZXcgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSh0aGlzLm1pbkJ1ZmZlclB4LCB0aGlzLm1heEJ1ZmZlclB4LCBuZXcgVGFibGVJdGVtU2l6ZUF2ZXJhZ2VyKHRoaXMuX3ZTY3JvbGxBdXRvKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBuZXcgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3koKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgaWYgKHRoaXMuX3Njcm9sbFN0cmF0ZWd5KSB7XG4gICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICBjYXNlICd2U2Nyb2xsRml4ZWQnOlxuICAgICAgICAgICh0aGlzLl9zY3JvbGxTdHJhdGVneSBhcyBQYmxOZ3JpZEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSlcbiAgICAgICAgICAgIC51cGRhdGVJdGVtQW5kQnVmZmVyU2l6ZSh0aGlzLnZTY3JvbGxGaXhlZCwgdGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3ZTY3JvbGxBdXRvJzpcbiAgICAgICAgICAodGhpcy5fc2Nyb2xsU3RyYXRlZ3kgYXMgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSlcbiAgICAgICAgICAgIC51cGRhdGVCdWZmZXJTaXplKHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldCBzY3JvbGxlZEluZGV4Q2hhbmdlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7IHJldHVybiB0aGlzLl9zY3JvbGxTdHJhdGVneS5zY3JvbGxlZEluZGV4Q2hhbmdlOyB9XG4gIHNldCBzY3JvbGxlZEluZGV4Q2hhbmdlKHZhbHVlOiBPYnNlcnZhYmxlPG51bWJlcj4pIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuc2Nyb2xsZWRJbmRleENoYW5nZSA9IHZhbHVlOyB9XG4gIGF0dGFjaCh2aWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LmF0dGFjaCh2aWV3cG9ydCk7IH1cbiAgZGV0YWNoKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5kZXRhY2goKTsgfVxuICBvbkNvbnRlbnRTY3JvbGxlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25Db250ZW50U2Nyb2xsZWQoKTsgfVxuICBvbkRhdGFMZW5ndGhDaGFuZ2VkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vbkRhdGFMZW5ndGhDaGFuZ2VkKCk7IH1cbiAgb25Db250ZW50UmVuZGVyZWQoKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5Lm9uQ29udGVudFJlbmRlcmVkKCk7IH1cbiAgb25SZW5kZXJlZE9mZnNldENoYW5nZWQoKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5Lm9uUmVuZGVyZWRPZmZzZXRDaGFuZ2VkKCk7IH1cbiAgc2Nyb2xsVG9JbmRleChpbmRleDogbnVtYmVyLCBiZWhhdmlvcjogU2Nyb2xsQmVoYXZpb3IpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuc2Nyb2xsVG9JbmRleChpbmRleCwgYmVoYXZpb3IpOyB9XG59XG4iXX0=