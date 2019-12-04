/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
    tslib_1.__extends(TableItemSizeAverager, _super);
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
    tslib_1.__extends(PblNgridFixedSizeVirtualScrollStrategy, _super);
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
    tslib_1.__extends(TableAutoSizeVirtualScrollStrategy, _super);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9zdHJhdGVnaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQTRCLDhCQUE4QixFQUF5Qix1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xKLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztJQUlwRCxJQUFJOzs7OztBQUFHLFVBQVMsRUFBUSxFQUFFLEdBQVMsSUFBSSxDQUFDLENBQUE7O0FBRTlDO0lBQUE7UUFFRSxXQUFNLEdBQWlELElBQUksQ0FBQztRQUM1RCxXQUFNLEdBQWUsSUFBSSxDQUFDO1FBQzFCLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyx3QkFBbUIsR0FBZSxJQUFJLENBQUM7UUFDdkMsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLDRCQUF1QixHQUFlLElBQUksQ0FBQztRQUMzQyxrQkFBYSxHQUFzRCxJQUFJLENBQUM7SUFDMUUsQ0FBQztJQUFELDhCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7Ozs7SUFSQyxzREFBeUI7O0lBQ3pCLHlDQUE0RDs7SUFDNUQseUNBQTBCOztJQUMxQixvREFBcUM7O0lBQ3JDLHNEQUF1Qzs7SUFDdkMsb0RBQXFDOztJQUNyQywwREFBMkM7O0lBQzNDLGdEQUF3RTs7QUFHMUU7SUFBMkMsaURBQWdCO0lBQTNEOztJQXdCQSxDQUFDOzs7Ozs7SUFyQkMseUNBQVM7Ozs7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QUMsQ0FBQyxDQUFDOzs7Ozs7SUFDbkYsb0RBQWE7Ozs7O0lBQWIsVUFBYyxLQUFhLEVBQUUsUUFBd0IsSUFBVSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztnQkF4SXRILFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUVBQXlFO29CQUNuRixTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQUUsdUJBQXVCOzRCQUNoQyxXQUFXLEVBQUUsNEJBQTRCO3lCQUMxQyxDQUFDO2lCQUNIOzs7O2dCQXhINkMsVUFBVTtnQkFPL0MsaUJBQWlCOzs7OEJBeUh2QixLQUFLOytCQVVMLEtBQUs7OEJBV0wsS0FBSzs4QkFVTCxLQUFLOzRCQUlMLEtBQUs7O0lBd0ZSLG1DQUFDO0NBQUEsQUF6SUQsSUF5SUM7U0FsSVksNEJBQTRCOzs7SUFTdkMsb0RBQXFCOztJQVVyQixxREFBc0I7O0lBV3RCLG9EQUFtQjs7SUFVbkIsb0RBQW1COztJQWlCbkIsa0RBQTRDOzs7OztJQUc1Qyx1REFBdUM7Ozs7O0lBR3ZDLDZDQUE4RDs7Ozs7SUFFckIsNENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29lcmNlTnVtYmVyUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgTGlzdFJhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwgRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFZJUlRVQUxfU0NST0xMX1NUUkFURUdZIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSwgSXRlbVNpemVBdmVyYWdlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay1leHBlcmltZW50YWwvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtZm9yLW9mJztcbmltcG9ydCB7IFAgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xuXG5jb25zdCBub29wID0gZnVuY3Rpb24obnY/OiBhbnksIG52MT86IGFueSkgeyB9O1xuXG5leHBvcnQgY2xhc3MgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgaW1wbGVtZW50cyBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBzY3JvbGxlZEluZGV4Q2hhbmdlOiBhbnk7XG4gIGF0dGFjaDogKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpID0+IHZvaWQgPSBub29wO1xuICBkZXRhY2g6ICgpID0+IHZvaWQgPSBub29wO1xuICBvbkNvbnRlbnRTY3JvbGxlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIG9uRGF0YUxlbmd0aENoYW5nZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBvbkNvbnRlbnRSZW5kZXJlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIG9uUmVuZGVyZWRPZmZzZXRDaGFuZ2VkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgc2Nyb2xsVG9JbmRleDogKGluZGV4OiBudW1iZXIsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvcikgPT4gdm9pZCA9IG5vb3A7XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZUl0ZW1TaXplQXZlcmFnZXIgZXh0ZW5kcyBJdGVtU2l6ZUF2ZXJhZ2VyIHtcbiAgcHJpdmF0ZSByb3dJbmZvOiBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvO1xuXG4gIGFkZFNhbXBsZShyYW5nZTogTGlzdFJhbmdlLCBzaXplOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5yb3dJbmZvICYmIHRoaXMucm93SW5mby5yb3dMZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIuYWRkU2FtcGxlKHJhbmdlLCBzaXplKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQSB0ZW1wIHdvcmthcm91bmQgdG8gc29sdmUgdGhlIGFjdHVhbCB2cyB3YW50ZWQgcmVuZGVyZWQgcm93IGlzc3VlIGluIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRgXG4gICAqXG4gICAqIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpYCByZXR1cm4gdGhlIHJvd3MgdGhhdCB0aGUgdmlydHVhbCBjb250YWluZXIgd2FudCdzIHRoZSBncmlkIHRvIHJlbmRlclxuICAgKiBob3dldmVyLCB0aGUgYWN0dWFsIHJlbmRlcmVkIHJvd3MgbWlnaHQgYmUgZGlmZmVyZW50LiBUaGlzIGlzIGEgcHJvYmxlbSBlc3BlY2lhbGx5IGluIGluaXQsIHdoZW4gdGhlIHJlbmRlcmVkIHJvd3MgYXJlIGFjdHVhbGx5IDBcbiAgICogYnV0IGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpYCByZXR1cm4gdGhlIGluaXRpYWwgcmFuZ2Ugb2Ygcm93cyB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC4gVGhpcyByZXN1bHRzIGluIGEgd3JvbmdcbiAgICogY2FsY3VsYXRpb24gb2YgdGhlIGF2ZXJhZ2UgaXRlbSBzaXplIGluIGBJdGVtU2l6ZUF2ZXJhZ2VyYFxuICAgKlxuICAgKiBTRUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iL2E5ZTU1MGU1YmY5M2NkNjhjMzQyZDFhNTBkODU3NmQ4ZjM4MTJlYmUvc3JjL2Nkay9zY3JvbGxpbmcvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQudHMjTDIxMi1MMjIwXG4gICAqL1xuICBzZXRSb3dJbmZvKHJvd0luZm86IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pOiB2b2lkIHtcbiAgICB0aGlzLnJvd0luZm8gPSByb3dJbmZvO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSBleHRlbmRzIEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG5cbiAgcHJpdmF0ZSBfbmdyaWRWaWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNpemU6IG51bWJlciwgbWluQnVmZmVyUHg6IG51bWJlciwgbWF4QnVmZmVyUHg6IG51bWJlcikge1xuICAgIHN1cGVyKGl0ZW1TaXplLCBtaW5CdWZmZXJQeCwgbWF4QnVmZmVyUHgpO1xuICB9XG5cbiAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHtcbiAgICBzdXBlci5hdHRhY2godGhpcy5fbmdyaWRWaWV3cG9ydCA9IHZpZXdwb3J0KTtcbiAgfVxuXG4gIG9uQ29udGVudFNjcm9sbGVkKCkge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaGxvbWlhc3NhZi9uZ3JpZC9pc3N1ZXMvMTFcblxuICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGFuIGlzc3VlIHdpdGggRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5XG4gICAgLy8gV2hlbjpcbiAgICAvLyAgICAtIFRoZSByZW5kZXJlZCBkYXRhIGlzIGNoYW5nZWQgc28gdGhlIGRhdGEgbGVuZ3RoIGlzIG5vdyBMT1dFUiB0aGVuIHRoZSBjdXJyZW50IHJhbmdlIChlbmQgLSBzdGFydClcbiAgICAvLyAgICAtIFRoZSByZW5kZXJpbmcgZGlyZWN0aW9uIGlzIHRvd2FyZHMgdGhlIHRvcCAoc3RhcnQgPiBlbmQpXG4gICAgLy9cbiAgICAvLyBGb3IgdGhlIGlzc3VlIHRvIG9jY3VyIGEgYmlnIGdhcCBiZXR3ZWVuIHRoZSBkYXRhIGxlbmd0aCBhbmQgdGhlIHJhbmdlIGxlbmd0aCAoZ2FwKSwgd2hpY2ggZG9lcyBub3QgaGFwcGVuIG9uIG5vcm1hbCBzY3JvbGxpbmdcbiAgICAvLyBidXQgb25seSB3aGVuIHRoZSBkYXRhIHNvdXJjZSBpcyByZXBsYWNlZCAoZS5nLiBmaWx0ZXJpbmcpLlxuICAgIC8vXG4gICAgLy8gSW4gc3VjaCBjYXNlcyBgb25EYXRhTGVuZ3RoQ2hhbmdlZGAgaXMgY2FsbGVkIHdoaWNoIHdpbGwgY2FsbCBgX3VwZGF0ZVJlbmRlcmVkUmFuZ2VgIHdoaWNoIHdpbGwgY2FsY3VsYXRlIGEgbmV3IHJhbmdlXG4gICAgLy8gdGhhdCBpcyBiaWcsIGl0IHdpbGwgZ2l2ZSB0aGUgYHN0YXJ0YCBhIG5ldyB2YWx1ZSB3aGljaCBjcmVhdGVzIHRoZSBiaWcgZ2FwLlxuICAgIC8vIEl0IHdpbGwgdGhlbiBjYWxjdWxhdGUgYSBuZXcgXCJlbmRcIiBhbmQgbGVhdmUgdGhlIFwic3RhcnRcIiBzbyB3ZSBoYXZlIGEgYmlnIGdhcCwgbGFyZ2VyIHRoZW4gdGhlIHZpZXdwb3J0IHNpemUuXG4gICAgLy8gQWZ0ZXIgdGhhdCBpdCB3aWxsIGNyZWF0ZSB0aGUgbmV3IG9mZnNldCB3aGljaCBpcyB0aGUgaXRlbVNpemUgKiBzdGFydCwgd2hpY2ggaXMgYSBiaXQgbG93ZXIgdGhlbiB0aGUgb2Zmc2V0IGJ1dCBpcyBsYXJnZSBhbmQgYWdhaW4gZG9lcyBub3QgZml0IHRoZSB2aWV3cG9ydCBzaXplXG4gICAgLy8gVGhlIHNjcm9sbCBjaGFuZ2Ugd2lsbCB0cmlnZ2VyIGBvbkNvbnRlbnRTY3JvbGxlZGAgd2hpY2ggd2lsbCBjYWxsIGBfdXBkYXRlUmVuZGVyZWRSYW5nZWAgYWdhaW4sXG4gICAgLy8gd2l0aCB0aGUgc2FtZSBvdXRjb21lLCByZWR1Y2luZyB0aGUgb2Zmc2V0IHNsaWdodGx5LCBjYWxsaW5nIGBvbkNvbnRlbnRTY3JvbGxlZGAgYWdhaW4uXG4gICAgLy8gSXQgd2lsbCByZXBlYXQgdW50aWwgcmVhY2hpbmcgdGhlIHByb3BlciBvZmZzZXQuXG4gICAgLy9cbiAgICAvLyBUaGUgYW1vdW50IG9mIG9mZnNldCByZWR1Y2VkIGVhY2ggdGltZSBpcyBhcHByb3ggdGhlIHNpemUgb2YgdGhlIGJ1ZmZlcnMuIChtaXgvbWF4IEJ1ZmZlcikuXG4gICAgLy9cbiAgICAvLyBUaGlzIHN0cmF0ZWd5IGlzIGhlcmUgb25seSBiZWNhdXNlIG9mIHRoaXMgZXJyb3IsIGl0IHdpbGwgbGV0IHRoZSBpbml0aWFsIHVwZGF0ZSBydW4gYW5kIGNhdGNoIGl0J3Mgc3Vic2VxdWVudCBzY3JvbGwgZXZlbnQuXG4gICAgaWYgKCF0aGlzLl9uZ3JpZFZpZXdwb3J0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuX25ncmlkVmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpO1xuICAgIGNvbnN0IHJhbmdlTGVuZ3RoID0gZW5kIC0gc3RhcnQ7XG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IHRoaXMuX25ncmlkVmlld3BvcnQuZ2V0RGF0YUxlbmd0aCgpO1xuICAgIGlmIChyYW5nZUxlbmd0aCA8IDAgJiYgZGF0YUxlbmd0aCA8IC1yYW5nZUxlbmd0aCkge1xuICAgICAgc3RhcnQgPSBkYXRhTGVuZ3RoIC0gZW5kO1xuICAgICAgdGhpcy5fbmdyaWRWaWV3cG9ydC5zZXRSZW5kZXJlZFJhbmdlKHsgc3RhcnQsIGVuZCB9KTtcbiAgICAgIHRoaXMuX25ncmlkVmlld3BvcnQuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KHRoaXMuaXRlbVNpemUgKiBzdGFydCk7XG4gICAgICAvLyB0aGlzLl9zY3JvbGxlZEluZGV4Q2hhbmdlLm5leHQoTWF0aC5mbG9vcihmaXJzdFZpc2libGVJbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5vbkNvbnRlbnRTY3JvbGxlZCgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSBleHRlbmRzIEF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IobWluQnVmZmVyUHg6IG51bWJlciwgbWF4QnVmZmVyUHg6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IGF2ZXJhZ2VyID0gbmV3IFRhYmxlSXRlbVNpemVBdmVyYWdlcigpKSB7XG4gICAgc3VwZXIobWluQnVmZmVyUHgsIG1heEJ1ZmZlclB4LCBhdmVyYWdlcik7XG4gIH1cbn1cblxuY29uc3QgVFlQRVM6IEFycmF5PCd2U2Nyb2xsRml4ZWQnIHwgJ3ZTY3JvbGxBdXRvJyB8ICd2U2Nyb2xsTm9uZSc+ID0gWyd2U2Nyb2xsQXV0bycsICd2U2Nyb2xsRml4ZWQnLCAndlNjcm9sbE5vbmUnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIF92U2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KGRpcmVjdGl2ZTogeyBfc2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTsgfSkge1xuICByZXR1cm4gZGlyZWN0aXZlLl9zY3JvbGxTdHJhdGVneTtcbn1cblxuLyoqIEEgdmlydHVhbCBzY3JvbGwgc3RyYXRlZ3kgdGhhdCBzdXBwb3J0cyB1bmtub3duIG9yIGR5bmFtaWMgc2l6ZSBpdGVtcy4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFt2U2Nyb2xsQXV0b10sIHBibC1uZ3JpZFt2U2Nyb2xsRml4ZWRdLCBwYmwtbmdyaWRbdlNjcm9sbE5vbmVdJyxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICAgIHVzZUV4aXN0aW5nOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgKGluIHBpeGVscykuXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKlxuICAgKiBEZWZhdWx0OiAyMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHZTY3JvbGxBdXRvKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92U2Nyb2xsQXV0bzsgfVxuICBzZXQgdlNjcm9sbEF1dG8odmFsdWU6IG51bWJlcikgeyB0aGlzLl92U2Nyb2xsQXV0byA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBfdlNjcm9sbEF1dG86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGl0ZW1zIGluIHRoZSBsaXN0IChpbiBwaXhlbHMpLlxuICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxGaXhlZGAgb25seSFcbiAgICpcbiAgICogRGVmYXVsdDogMjBcbiAgICovXG4gIEBJbnB1dCgpIGdldCB2U2Nyb2xsRml4ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZTY3JvbGxGaXhlZDsgfVxuICBzZXQgdlNjcm9sbEZpeGVkKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fdlNjcm9sbEZpeGVkID0gdmFsdWU7IH1cbiAgX3ZTY3JvbGxGaXhlZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBhbW91bnQgb2YgYnVmZmVyIHJlbmRlcmVkIGJleW9uZCB0aGUgdmlld3BvcnQgKGluIHBpeGVscykuXG4gICAqIElmIHRoZSBhbW91bnQgb2YgYnVmZmVyIGRpcHMgYmVsb3cgdGhpcyBudW1iZXIsIG1vcmUgaXRlbXMgd2lsbCBiZSByZW5kZXJlZC4gRGVmYXVsdHMgdG8gMTAwcHguXG4gICAqXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEF1dG9gIGFuZCBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKiBEZWZhdWx0OiAxMDBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBtaW5CdWZmZXJQeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluQnVmZmVyUHg7IH1cbiAgc2V0IG1pbkJ1ZmZlclB4KHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fbWluQnVmZmVyUHggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgX21pbkJ1ZmZlclB4ID0gMTAwO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHBpeGVscyB3b3J0aCBvZiBidWZmZXIgdG8gcmVuZGVyIGZvciB3aGVuIHJlbmRlcmluZyBuZXcgaXRlbXMuIERlZmF1bHRzIHRvIDIwMHB4LlxuICAgKlxuICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxBdXRvYCBhbmQgYHZTY3JvbGxGaXhlZGAgb25seSFcbiAgICogRGVmYXVsdDogMTAwXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbWF4QnVmZmVyUHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heEJ1ZmZlclB4OyB9XG4gIHNldCBtYXhCdWZmZXJQeCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX21heEJ1ZmZlclB4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gIF9tYXhCdWZmZXJQeCA9IDIwMDtcblxuICBASW5wdXQoKSBnZXQgd2hlZWxNb2RlKCk6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXIgeyByZXR1cm4gdGhpcy5fd2hlZWxNb2RlOyB9XG4gIHNldCB3aGVlbE1vZGUodmFsdWU6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlICdwYXNzaXZlJzpcbiAgICAgIGNhc2UgJ2Jsb2NraW5nJzpcbiAgICAgICB0aGlzLl93aGVlbE1vZGUgPSB2YWx1ZTtcbiAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IHdoZWVsTW9kZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHdoZWVsTW9kZSAmJiB3aGVlbE1vZGUgPj0gMSAmJiB3aGVlbE1vZGUgPD0gNjApIHtcbiAgICAgICAgICB0aGlzLl93aGVlbE1vZGUgPSB3aGVlbE1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIF93aGVlbE1vZGU6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXI7XG5cbiAgLyoqIFRoZSBzY3JvbGwgc3RyYXRlZ3kgdXNlZCBieSB0aGlzIGRpcmVjdGl2ZS4gKi9cbiAgX3Njcm9sbFN0cmF0ZWd5OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgZ2V0IHR5cGUoKTogJ3ZTY3JvbGxGaXhlZCcgfCAndlNjcm9sbEF1dG8nIHwgJ3ZTY3JvbGxOb25lJyB7IHJldHVybiB0aGlzLl90eXBlOyB9O1xuICBwcml2YXRlIF90eXBlOiAndlNjcm9sbEZpeGVkJyB8ICd2U2Nyb2xsQXV0bycgfCAndlNjcm9sbE5vbmUnO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29uc3QgdHlwZXMgPSBUWVBFUy5maWx0ZXIoIHQgPT4gZWwubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUodCkpO1xuXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2U2Nyb2xsIGluc3RydWN0aW9uLCBvbmx5IG9uZSB2YWx1ZSBpcyBhbGxvdzogJHtKU09OLnN0cmluZ2lmeSh0eXBlcyl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3R5cGUgPSB0eXBlc1swXTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3R5cGUpIHtcbiAgICAgIGlmICgnX3ZTY3JvbGxGaXhlZCcgaW4gPGFueT50aGlzKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAndlNjcm9sbEZpeGVkJztcbiAgICAgIH0gZWxzZSBpZiAoJ192U2Nyb2xsQXV0bycgaW4gPGFueT50aGlzKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAndlNjcm9sbEF1dG8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9ICd2U2Nyb2xsTm9uZSc7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICd2U2Nyb2xsRml4ZWQnOlxuICAgICAgICBpZiAoIXRoaXMuX3ZTY3JvbGxGaXhlZCkge1xuICAgICAgICAgIHRoaXMudlNjcm9sbEZpeGVkICA9IHRoaXMuZ3JpZC5maW5kSW5pdGlhbFJvd0hlaWdodCgpIHx8IDQ4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KHRoaXMudlNjcm9sbEZpeGVkLCB0aGlzLm1pbkJ1ZmZlclB4LCB0aGlzLm1heEJ1ZmZlclB4KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2U2Nyb2xsQXV0byc6XG4gICAgICAgIGlmICghdGhpcy5fdlNjcm9sbEF1dG8pIHtcbiAgICAgICAgICB0aGlzLl92U2Nyb2xsQXV0byAgPSB0aGlzLmdyaWQuZmluZEluaXRpYWxSb3dIZWlnaHQoKSB8fCA0ODtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9IG5ldyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgsIG5ldyBUYWJsZUl0ZW1TaXplQXZlcmFnZXIodGhpcy5fdlNjcm9sbEF1dG8pKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9IG5ldyBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3RyYXRlZ3kpIHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3ZTY3JvbGxGaXhlZCc6XG4gICAgICAgICAgKHRoaXMuX3Njcm9sbFN0cmF0ZWd5IGFzIFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KVxuICAgICAgICAgICAgLnVwZGF0ZUl0ZW1BbmRCdWZmZXJTaXplKHRoaXMudlNjcm9sbEZpeGVkLCB0aGlzLm1pbkJ1ZmZlclB4LCB0aGlzLm1heEJ1ZmZlclB4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndlNjcm9sbEF1dG8nOlxuICAgICAgICAgICh0aGlzLl9zY3JvbGxTdHJhdGVneSBhcyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KVxuICAgICAgICAgICAgLnVwZGF0ZUJ1ZmZlclNpemUodGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNjcm9sbGVkSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHsgcmV0dXJuIHRoaXMuX3Njcm9sbFN0cmF0ZWd5LnNjcm9sbGVkSW5kZXhDaGFuZ2U7IH1cbiAgc2V0IHNjcm9sbGVkSW5kZXhDaGFuZ2UodmFsdWU6IE9ic2VydmFibGU8bnVtYmVyPikgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5zY3JvbGxlZEluZGV4Q2hhbmdlID0gdmFsdWU7IH1cbiAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuYXR0YWNoKHZpZXdwb3J0KTsgfVxuICBkZXRhY2goKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LmRldGFjaCgpOyB9XG4gIG9uQ29udGVudFNjcm9sbGVkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vbkNvbnRlbnRTY3JvbGxlZCgpOyB9XG4gIG9uRGF0YUxlbmd0aENoYW5nZWQoKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5Lm9uRGF0YUxlbmd0aENoYW5nZWQoKTsgfVxuICBvbkNvbnRlbnRSZW5kZXJlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25Db250ZW50UmVuZGVyZWQoKTsgfVxuICBvblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25SZW5kZXJlZE9mZnNldENoYW5nZWQoKTsgfVxuICBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvcik6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5zY3JvbGxUb0luZGV4KGluZGV4LCBiZWhhdmlvcik7IH1cbn1cbiJdfQ==