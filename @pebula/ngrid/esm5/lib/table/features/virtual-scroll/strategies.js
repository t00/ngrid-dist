/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { AutoSizeVirtualScrollStrategy, ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { PblNgridComponent } from '../../table.component';
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
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
     * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
     * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
     * calculation of the average item size in `ItemSizeAverager`
     *
     * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
     */
    /**
     * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
     *
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
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
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
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
    function PblCdkVirtualScrollDirective(el, table) {
        this.table = table;
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
                    this.vScrollFixed = this.table.findInitialRowHeight() || 48;
                }
                this._scrollStrategy = new PblNgridFixedSizeVirtualScrollStrategy(this.vScrollFixed, this.minBufferPx, this.maxBufferPx);
                break;
            case 'vScrollAuto':
                if (!this._vScrollAuto) {
                    this._vScrollAuto = this.table.findInitialRowHeight() || 48;
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
    PblCdkVirtualScrollDirective.prototype.table;
    /* Skipping unhandled member: ;*/
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc3RyYXRlZ2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFN0QsT0FBTyxFQUE0Qiw4QkFBOEIsRUFBeUIsdUJBQXVCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsSixPQUFPLEVBQUUsNkJBQTZCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUV0RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7SUFJcEQsSUFBSTs7Ozs7QUFBRyxVQUFTLEVBQVEsRUFBRSxHQUFTLElBQUksQ0FBQyxDQUFBOztBQUU5QztJQUFBO1FBRUUsV0FBTSxHQUFpRCxJQUFJLENBQUM7UUFDNUQsV0FBTSxHQUFlLElBQUksQ0FBQztRQUMxQixzQkFBaUIsR0FBZSxJQUFJLENBQUM7UUFDckMsd0JBQW1CLEdBQWUsSUFBSSxDQUFDO1FBQ3ZDLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyw0QkFBdUIsR0FBZSxJQUFJLENBQUM7UUFDM0Msa0JBQWEsR0FBc0QsSUFBSSxDQUFDO0lBQzFFLENBQUM7SUFBRCw4QkFBQztBQUFELENBQUMsQUFURCxJQVNDOzs7O0lBUkMsc0RBQXlCOztJQUN6Qix5Q0FBNEQ7O0lBQzVELHlDQUEwQjs7SUFDMUIsb0RBQXFDOztJQUNyQyxzREFBdUM7O0lBQ3ZDLG9EQUFxQzs7SUFDckMsMERBQTJDOztJQUMzQyxnREFBd0U7O0FBRzFFO0lBQTJDLGlEQUFnQjtJQUEzRDs7SUF3QkEsQ0FBQzs7Ozs7O0lBckJDLHlDQUFTOzs7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QUFDLENBQUMsQ0FBQzs7Ozs7O0lBQ25GLG9EQUFhOzs7OztJQUFiLFVBQWMsS0FBYSxFQUFFLFFBQXdCLElBQVUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBeEl0SCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlFQUF5RTtvQkFDbkYsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLHVCQUF1Qjs0QkFDaEMsV0FBVyxFQUFFLDRCQUE0Qjt5QkFDMUMsQ0FBQztpQkFDSDs7OztnQkF4SDZDLFVBQVU7Z0JBTy9DLGlCQUFpQjs7OzhCQXlIdkIsS0FBSzsrQkFVTCxLQUFLOzhCQVdMLEtBQUs7OEJBVUwsS0FBSzs0QkFJTCxLQUFLOztJQXdGUixtQ0FBQztDQUFBLEFBeklELElBeUlDO1NBbElZLDRCQUE0Qjs7O0lBU3ZDLG9EQUFxQjs7SUFVckIscURBQXNCOztJQVd0QixvREFBbUI7O0lBVW5CLG9EQUFtQjs7SUFpQm5CLGtEQUE0Qzs7Ozs7SUFHNUMsdURBQXVDOzs7OztJQUd2Qyw2Q0FBOEQ7Ozs7O0lBRXJCLDZDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZU51bWJlclByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsIEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIEl0ZW1TaXplQXZlcmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8gfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5pbXBvcnQgeyBQIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcblxuY29uc3Qgbm9vcCA9IGZ1bmN0aW9uKG52PzogYW55LCBudjE/OiBhbnkpIHsgfTtcblxuZXhwb3J0IGNsYXNzIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGltcGxlbWVudHMgVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgc2Nyb2xsZWRJbmRleENoYW5nZTogYW55O1xuICBhdHRhY2g6ICh2aWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KSA9PiB2b2lkID0gbm9vcDtcbiAgZGV0YWNoOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25Db250ZW50U2Nyb2xsZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBvbkRhdGFMZW5ndGhDaGFuZ2VkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25Db250ZW50UmVuZGVyZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBvblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIHNjcm9sbFRvSW5kZXg6IChpbmRleDogbnVtYmVyLCBiZWhhdmlvcjogU2Nyb2xsQmVoYXZpb3IpID0+IHZvaWQgPSBub29wO1xufVxuXG5leHBvcnQgY2xhc3MgVGFibGVJdGVtU2l6ZUF2ZXJhZ2VyIGV4dGVuZHMgSXRlbVNpemVBdmVyYWdlciB7XG4gIHByaXZhdGUgcm93SW5mbzogTmdlVmlydHVhbFRhYmxlUm93SW5mbztcblxuICBhZGRTYW1wbGUocmFuZ2U6IExpc3RSYW5nZSwgc2l6ZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucm93SW5mbyAmJiB0aGlzLnJvd0luZm8ucm93TGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLmFkZFNhbXBsZShyYW5nZSwgc2l6ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEEgdGVtcCB3b3JrYXJvdW5kIHRvIHNvbHZlIHRoZSBhY3R1YWwgdnMgd2FudGVkIHJlbmRlcmVkIHJvdyBpc3N1ZSBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YFxuICAgKlxuICAgKiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LmdldFJlbmRlcmVkUmFuZ2UoKWAgcmV0dXJuIHRoZSByb3dzIHRoYXQgdGhlIHZpcnR1YWwgY29udGFpbmVyIHdhbnQncyB0aGUgdGFibGUgdG8gcmVuZGVyXG4gICAqIGhvd2V2ZXIsIHRoZSBhY3R1YWwgcmVuZGVyZWQgcm93cyBtaWdodCBiZSBkaWZmZXJlbnQuIFRoaXMgaXMgYSBwcm9ibGVtIGVzcGVjaWFsbHkgaW4gaW5pdCwgd2hlbiB0aGUgcmVuZGVyZWQgcm93cyBhcmUgYWN0dWFsbHkgMFxuICAgKiBidXQgYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKClgIHJldHVybiB0aGUgaW5pdGlhbCByYW5nZSBvZiByb3dzIHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLiBUaGlzIHJlc3VsdHMgaW4gYSB3cm9uZ1xuICAgKiBjYWxjdWxhdGlvbiBvZiB0aGUgYXZlcmFnZSBpdGVtIHNpemUgaW4gYEl0ZW1TaXplQXZlcmFnZXJgXG4gICAqXG4gICAqIFNFRTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvYTllNTUwZTViZjkzY2Q2OGMzNDJkMWE1MGQ4NTc2ZDhmMzgxMmViZS9zcmMvY2RrL3Njcm9sbGluZy92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC50cyNMMjEyLUwyMjBcbiAgICovXG4gIHNldFJvd0luZm8ocm93SW5mbzogTmdlVmlydHVhbFRhYmxlUm93SW5mbyk6IHZvaWQge1xuICAgIHRoaXMucm93SW5mbyA9IHJvd0luZm87XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGV4dGVuZHMgRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcblxuICBwcml2YXRlIF9uZ3JpZFZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2l6ZTogbnVtYmVyLCBtaW5CdWZmZXJQeDogbnVtYmVyLCBtYXhCdWZmZXJQeDogbnVtYmVyKSB7XG4gICAgc3VwZXIoaXRlbVNpemUsIG1pbkJ1ZmZlclB4LCBtYXhCdWZmZXJQeCk7XG4gIH1cblxuICBhdHRhY2godmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkge1xuICAgIHN1cGVyLmF0dGFjaCh0aGlzLl9uZ3JpZFZpZXdwb3J0ID0gdmlld3BvcnQpO1xuICB9XG5cbiAgb25Db250ZW50U2Nyb2xsZWQoKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NobG9taWFzc2FmL25ncmlkL2lzc3Vlcy8xMVxuXG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgYW4gaXNzdWUgd2l0aCBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lcbiAgICAvLyBXaGVuOlxuICAgIC8vICAgIC0gVGhlIHJlbmRlcmVkIGRhdGEgaXMgY2hhbmdlZCBzbyB0aGUgZGF0YSBsZW5ndGggaXMgbm93IExPV0VSIHRoZW4gdGhlIGN1cnJlbnQgcmFuZ2UgKGVuZCAtIHN0YXJ0KVxuICAgIC8vICAgIC0gVGhlIHJlbmRlcmluZyBkaXJlY3Rpb24gaXMgdG93YXJkcyB0aGUgdG9wIChzdGFydCA+IGVuZClcbiAgICAvL1xuICAgIC8vIEZvciB0aGUgaXNzdWUgdG8gb2NjdXIgYSBiaWcgZ2FwIGJldHdlZW4gdGhlIGRhdGEgbGVuZ3RoIGFuZCB0aGUgcmFuZ2UgbGVuZ3RoIChnYXApLCB3aGljaCBkb2VzIG5vdCBoYXBwZW4gb24gbm9ybWFsIHNjcm9sbGluZ1xuICAgIC8vIGJ1dCBvbmx5IHdoZW4gdGhlIGRhdGEgc291cmNlIGlzIHJlcGxhY2VkIChlLmcuIGZpbHRlcmluZykuXG4gICAgLy9cbiAgICAvLyBJbiBzdWNoIGNhc2VzIGBvbkRhdGFMZW5ndGhDaGFuZ2VkYCBpcyBjYWxsZWQgd2hpY2ggd2lsbCBjYWxsIGBfdXBkYXRlUmVuZGVyZWRSYW5nZWAgd2hpY2ggd2lsbCBjYWxjdWxhdGUgYSBuZXcgcmFuZ2VcbiAgICAvLyB0aGF0IGlzIGJpZywgaXQgd2lsbCBnaXZlIHRoZSBgc3RhcnRgIGEgbmV3IHZhbHVlIHdoaWNoIGNyZWF0ZXMgdGhlIGJpZyBnYXAuXG4gICAgLy8gSXQgd2lsbCB0aGVuIGNhbGN1bGF0ZSBhIG5ldyBcImVuZFwiIGFuZCBsZWF2ZSB0aGUgXCJzdGFydFwiIHNvIHdlIGhhdmUgYSBiaWcgZ2FwLCBsYXJnZXIgdGhlbiB0aGUgdmlld3BvcnQgc2l6ZS5cbiAgICAvLyBBZnRlciB0aGF0IGl0IHdpbGwgY3JlYXRlIHRoZSBuZXcgb2Zmc2V0IHdoaWNoIGlzIHRoZSBpdGVtU2l6ZSAqIHN0YXJ0LCB3aGljaCBpcyBhIGJpdCBsb3dlciB0aGVuIHRoZSBvZmZzZXQgYnV0IGlzIGxhcmdlIGFuZCBhZ2FpbiBkb2VzIG5vdCBmaXQgdGhlIHZpZXdwb3J0IHNpemVcbiAgICAvLyBUaGUgc2Nyb2xsIGNoYW5nZSB3aWxsIHRyaWdnZXIgYG9uQ29udGVudFNjcm9sbGVkYCB3aGljaCB3aWxsIGNhbGwgYF91cGRhdGVSZW5kZXJlZFJhbmdlYCBhZ2FpbixcbiAgICAvLyB3aXRoIHRoZSBzYW1lIG91dGNvbWUsIHJlZHVjaW5nIHRoZSBvZmZzZXQgc2xpZ2h0bHksIGNhbGxpbmcgYG9uQ29udGVudFNjcm9sbGVkYCBhZ2Fpbi5cbiAgICAvLyBJdCB3aWxsIHJlcGVhdCB1bnRpbCByZWFjaGluZyB0aGUgcHJvcGVyIG9mZnNldC5cbiAgICAvL1xuICAgIC8vIFRoZSBhbW91bnQgb2Ygb2Zmc2V0IHJlZHVjZWQgZWFjaCB0aW1lIGlzIGFwcHJveCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVycy4gKG1peC9tYXggQnVmZmVyKS5cbiAgICAvL1xuICAgIC8vIFRoaXMgc3RyYXRlZ3kgaXMgaGVyZSBvbmx5IGJlY2F1c2Ugb2YgdGhpcyBlcnJvciwgaXQgd2lsbCBsZXQgdGhlIGluaXRpYWwgdXBkYXRlIHJ1biBhbmQgY2F0Y2ggaXQncyBzdWJzZXF1ZW50IHNjcm9sbCBldmVudC5cbiAgICBpZiAoIXRoaXMuX25ncmlkVmlld3BvcnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5fbmdyaWRWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKCk7XG4gICAgY29uc3QgcmFuZ2VMZW5ndGggPSBlbmQgLSBzdGFydDtcbiAgICBjb25zdCBkYXRhTGVuZ3RoID0gdGhpcy5fbmdyaWRWaWV3cG9ydC5nZXREYXRhTGVuZ3RoKCk7XG4gICAgaWYgKHJhbmdlTGVuZ3RoIDwgMCAmJiBkYXRhTGVuZ3RoIDwgLXJhbmdlTGVuZ3RoKSB7XG4gICAgICBzdGFydCA9IGRhdGFMZW5ndGggLSBlbmQ7XG4gICAgICB0aGlzLl9uZ3JpZFZpZXdwb3J0LnNldFJlbmRlcmVkUmFuZ2UoeyBzdGFydCwgZW5kIH0pO1xuICAgICAgdGhpcy5fbmdyaWRWaWV3cG9ydC5zZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQodGhpcy5pdGVtU2l6ZSAqIHN0YXJ0KTtcbiAgICAgIC8vIHRoaXMuX3Njcm9sbGVkSW5kZXhDaGFuZ2UubmV4dChNYXRoLmZsb29yKGZpcnN0VmlzaWJsZUluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLm9uQ29udGVudFNjcm9sbGVkKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGV4dGVuZHMgQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihtaW5CdWZmZXJQeDogbnVtYmVyLCBtYXhCdWZmZXJQeDogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgYXZlcmFnZXIgPSBuZXcgVGFibGVJdGVtU2l6ZUF2ZXJhZ2VyKCkpIHtcbiAgICBzdXBlcihtaW5CdWZmZXJQeCwgbWF4QnVmZmVyUHgsIGF2ZXJhZ2VyKTtcbiAgfVxufVxuXG5jb25zdCBUWVBFUzogQXJyYXk8J3ZTY3JvbGxGaXhlZCcgfCAndlNjcm9sbEF1dG8nIHwgJ3ZTY3JvbGxOb25lJz4gPSBbJ3ZTY3JvbGxBdXRvJywgJ3ZTY3JvbGxGaXhlZCcsICd2U2Nyb2xsTm9uZSddO1xuXG5leHBvcnQgZnVuY3Rpb24gX3ZTY3JvbGxTdHJhdGVneUZhY3RvcnkoZGlyZWN0aXZlOiB7IF9zY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5OyB9KSB7XG4gIHJldHVybiBkaXJlY3RpdmUuX3Njcm9sbFN0cmF0ZWd5O1xufVxuXG4vKiogQSB2aXJ0dWFsIHNjcm9sbCBzdHJhdGVneSB0aGF0IHN1cHBvcnRzIHVua25vd24gb3IgZHluYW1pYyBzaXplIGl0ZW1zLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3ZTY3JvbGxBdXRvXSwgcGJsLW5ncmlkW3ZTY3JvbGxGaXhlZF0sIHBibC1uZ3JpZFt2U2Nyb2xsTm9uZV0nLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gICAgdXNlRXhpc3Rpbmc6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gICAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCAoaW4gcGl4ZWxzKS5cbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXG4gICAqXG4gICAqIERlZmF1bHQ6IDIwXG4gICAqL1xuICBASW5wdXQoKSBnZXQgdlNjcm9sbEF1dG8oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZTY3JvbGxBdXRvOyB9XG4gIHNldCB2U2Nyb2xsQXV0byh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX3ZTY3JvbGxBdXRvID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gIF92U2Nyb2xsQXV0bzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgKGluIHBpeGVscykuXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKlxuICAgKiBEZWZhdWx0OiAyMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHZTY3JvbGxGaXhlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdlNjcm9sbEZpeGVkOyB9XG4gIHNldCB2U2Nyb2xsRml4ZWQodmFsdWU6IG51bWJlcikgeyB0aGlzLl92U2Nyb2xsRml4ZWQgPSB2YWx1ZTsgfVxuICBfdlNjcm9sbEZpeGVkOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGFtb3VudCBvZiBidWZmZXIgcmVuZGVyZWQgYmV5b25kIHRoZSB2aWV3cG9ydCAoaW4gcGl4ZWxzKS5cbiAgICogSWYgdGhlIGFtb3VudCBvZiBidWZmZXIgZGlwcyBiZWxvdyB0aGlzIG51bWJlciwgbW9yZSBpdGVtcyB3aWxsIGJlIHJlbmRlcmVkLiBEZWZhdWx0cyB0byAxMDBweC5cbiAgICpcbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsQXV0b2AgYW5kIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXG4gICAqIERlZmF1bHQ6IDEwMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1pbkJ1ZmZlclB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW5CdWZmZXJQeDsgfVxuICBzZXQgbWluQnVmZmVyUHgodmFsdWU6IG51bWJlcikgeyB0aGlzLl9taW5CdWZmZXJQeCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBfbWluQnVmZmVyUHggPSAxMDA7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgcGl4ZWxzIHdvcnRoIG9mIGJ1ZmZlciB0byByZW5kZXIgZm9yIHdoZW4gcmVuZGVyaW5nIG5ldyBpdGVtcy4gRGVmYXVsdHMgdG8gMjAwcHguXG4gICAqXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEF1dG9gIGFuZCBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKiBEZWZhdWx0OiAxMDBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBtYXhCdWZmZXJQeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4QnVmZmVyUHg7IH1cbiAgc2V0IG1heEJ1ZmZlclB4KHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fbWF4QnVmZmVyUHggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgX21heEJ1ZmZlclB4ID0gMjAwO1xuXG4gIEBJbnB1dCgpIGdldCB3aGVlbE1vZGUoKTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlciB7IHJldHVybiB0aGlzLl93aGVlbE1vZGU7IH1cbiAgc2V0IHdoZWVsTW9kZSh2YWx1ZTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlcikge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgJ3Bhc3NpdmUnOlxuICAgICAgY2FzZSAnYmxvY2tpbmcnOlxuICAgICAgIHRoaXMuX3doZWVsTW9kZSA9IHZhbHVlO1xuICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgd2hlZWxNb2RlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAod2hlZWxNb2RlICYmIHdoZWVsTW9kZSA+PSAxICYmIHdoZWVsTW9kZSA8PSA2MCkge1xuICAgICAgICAgIHRoaXMuX3doZWVsTW9kZSA9IHdoZWVsTW9kZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgX3doZWVsTW9kZTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlcjtcblxuICAvKiogVGhlIHNjcm9sbCBzdHJhdGVneSB1c2VkIGJ5IHRoaXMgZGlyZWN0aXZlLiAqL1xuICBfc2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcblxuICBnZXQgdHlwZSgpOiAndlNjcm9sbEZpeGVkJyB8ICd2U2Nyb2xsQXV0bycgfCAndlNjcm9sbE5vbmUnIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH07XG4gIHByaXZhdGUgX3R5cGU6ICd2U2Nyb2xsRml4ZWQnIHwgJ3ZTY3JvbGxBdXRvJyB8ICd2U2Nyb2xsTm9uZSc7XG5cbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgY29uc3QgdHlwZXMgPSBUWVBFUy5maWx0ZXIoIHQgPT4gZWwubmF0aXZlRWxlbWVudC5oYXNBdHRyaWJ1dGUodCkpO1xuXG4gICAgaWYgKHR5cGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB2U2Nyb2xsIGluc3RydWN0aW9uLCBvbmx5IG9uZSB2YWx1ZSBpcyBhbGxvdzogJHtKU09OLnN0cmluZ2lmeSh0eXBlcyl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3R5cGUgPSB0eXBlc1swXTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3R5cGUpIHtcbiAgICAgIGlmICgnX3ZTY3JvbGxGaXhlZCcgaW4gPGFueT50aGlzKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAndlNjcm9sbEZpeGVkJztcbiAgICAgIH0gZWxzZSBpZiAoJ192U2Nyb2xsQXV0bycgaW4gPGFueT50aGlzKSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAndlNjcm9sbEF1dG8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9ICd2U2Nyb2xsTm9uZSc7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICBjYXNlICd2U2Nyb2xsRml4ZWQnOlxuICAgICAgICBpZiAoIXRoaXMuX3ZTY3JvbGxGaXhlZCkge1xuICAgICAgICAgIHRoaXMudlNjcm9sbEZpeGVkICA9IHRoaXMudGFibGUuZmluZEluaXRpYWxSb3dIZWlnaHQoKSB8fCA0ODtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9IG5ldyBQYmxOZ3JpZEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSh0aGlzLnZTY3JvbGxGaXhlZCwgdGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndlNjcm9sbEF1dG8nOlxuICAgICAgICBpZiAoIXRoaXMuX3ZTY3JvbGxBdXRvKSB7XG4gICAgICAgICAgdGhpcy5fdlNjcm9sbEF1dG8gID0gdGhpcy50YWJsZS5maW5kSW5pdGlhbFJvd0hlaWdodCgpIHx8IDQ4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kodGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCwgbmV3IFRhYmxlSXRlbVNpemVBdmVyYWdlcih0aGlzLl92U2Nyb2xsQXV0bykpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdHJhdGVneSkge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAndlNjcm9sbEZpeGVkJzpcbiAgICAgICAgICAodGhpcy5fc2Nyb2xsU3RyYXRlZ3kgYXMgUGJsTmdyaWRGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpXG4gICAgICAgICAgICAudXBkYXRlSXRlbUFuZEJ1ZmZlclNpemUodGhpcy52U2Nyb2xsRml4ZWQsIHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd2U2Nyb2xsQXV0byc6XG4gICAgICAgICAgKHRoaXMuX3Njcm9sbFN0cmF0ZWd5IGFzIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpXG4gICAgICAgICAgICAudXBkYXRlQnVmZmVyU2l6ZSh0aGlzLm1pbkJ1ZmZlclB4LCB0aGlzLm1heEJ1ZmZlclB4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgc2Nyb2xsZWRJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4geyByZXR1cm4gdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuc2Nyb2xsZWRJbmRleENoYW5nZTsgfVxuICBzZXQgc2Nyb2xsZWRJbmRleENoYW5nZSh2YWx1ZTogT2JzZXJ2YWJsZTxudW1iZXI+KSB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LnNjcm9sbGVkSW5kZXhDaGFuZ2UgPSB2YWx1ZTsgfVxuICBhdHRhY2godmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5hdHRhY2godmlld3BvcnQpOyB9XG4gIGRldGFjaCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuZGV0YWNoKCk7IH1cbiAgb25Db250ZW50U2Nyb2xsZWQoKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5Lm9uQ29udGVudFNjcm9sbGVkKCk7IH1cbiAgb25EYXRhTGVuZ3RoQ2hhbmdlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25EYXRhTGVuZ3RoQ2hhbmdlZCgpOyB9XG4gIG9uQ29udGVudFJlbmRlcmVkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vbkNvbnRlbnRSZW5kZXJlZCgpOyB9XG4gIG9uUmVuZGVyZWRPZmZzZXRDaGFuZ2VkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZCgpOyB9XG4gIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LnNjcm9sbFRvSW5kZXgoaW5kZXgsIGJlaGF2aW9yKTsgfVxufVxuIl19