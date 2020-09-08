/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/strategies.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { AutoSizeVirtualScrollStrategy, ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { PblNgridComponent } from '../../ngrid.component';
/** @type {?} */
const noop = (/**
 * @param {?=} nv
 * @param {?=} nv1
 * @return {?}
 */
function (nv, nv1) { });
const ɵ0 = noop;
export class NoVirtualScrollStrategy {
    constructor() {
        this.attach = noop;
        this.detach = noop;
        this.onContentScrolled = noop;
        this.onDataLengthChanged = noop;
        this.onContentRendered = noop;
        this.onRenderedOffsetChanged = noop;
        this.scrollToIndex = noop;
    }
}
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
export class TableItemSizeAverager extends ItemSizeAverager {
    /**
     * @param {?} range
     * @param {?} size
     * @return {?}
     */
    addSample(range, size) {
        if (this.rowInfo && this.rowInfo.rowLength === 0) {
            this.reset();
        }
        else {
            super.addSample(range, size);
        }
    }
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
    setRowInfo(rowInfo) {
        this.rowInfo = rowInfo;
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    TableItemSizeAverager.prototype.rowInfo;
}
export class PblNgridFixedSizeVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    /**
     * @param {?} itemSize
     * @param {?} minBufferPx
     * @param {?} maxBufferPx
     */
    constructor(itemSize, minBufferPx, maxBufferPx) {
        super(itemSize, minBufferPx, maxBufferPx);
        this.itemSize = itemSize;
    }
    /**
     * @param {?} viewport
     * @return {?}
     */
    attach(viewport) {
        super.attach(this._ngridViewport = viewport);
    }
    /**
     * @return {?}
     */
    onContentScrolled() {
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
        let { start, end } = this._ngridViewport.getRenderedRange();
        /** @type {?} */
        const rangeLength = end - start;
        /** @type {?} */
        const dataLength = this._ngridViewport.getDataLength();
        if (rangeLength < 0 && dataLength < -rangeLength) {
            start = dataLength - end;
            this._ngridViewport.setRenderedRange({ start, end });
            this._ngridViewport.setRenderedContentOffset(this.itemSize * start);
            // this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
        }
        else {
            super.onContentScrolled();
        }
    }
}
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
export class TableAutoSizeVirtualScrollStrategy extends AutoSizeVirtualScrollStrategy {
    /**
     * @param {?} minBufferPx
     * @param {?} maxBufferPx
     * @param {?=} averager
     */
    constructor(minBufferPx, maxBufferPx, averager = new TableItemSizeAverager()) {
        super(minBufferPx, maxBufferPx, averager);
        this.averager = averager;
    }
}
if (false) {
    /** @type {?} */
    TableAutoSizeVirtualScrollStrategy.prototype.averager;
}
/** @type {?} */
const TYPES = ['vScrollAuto', 'vScrollFixed', 'vScrollNone'];
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
export class PblCdkVirtualScrollDirective {
    /**
     * @param {?} el
     * @param {?} grid
     */
    constructor(el, grid) {
        this.grid = grid;
        this._minBufferPx = 100;
        this._maxBufferPx = 200;
        /** @type {?} */
        const types = TYPES.filter((/**
         * @param {?} t
         * @return {?}
         */
        t => el.nativeElement.hasAttribute(t)));
        if (types.length > 1) {
            throw new Error(`Invalid vScroll instruction, only one value is allow: ${JSON.stringify(types)}`);
        }
        else {
            this._type = types[0];
        }
    }
    /**
     * The size of the items in the list (in pixels).
     * Valid for `vScrollFixed` only!
     *
     * Default: 20
     * @return {?}
     */
    get vScrollAuto() { return this._vScrollAuto; }
    /**
     * @param {?} value
     * @return {?}
     */
    set vScrollAuto(value) { this._vScrollAuto = coerceNumberProperty(value); }
    /**
     * The size of the items in the list (in pixels).
     * Valid for `vScrollFixed` only!
     *
     * Default: 20
     * @return {?}
     */
    get vScrollFixed() { return this._vScrollFixed; }
    /**
     * @param {?} value
     * @return {?}
     */
    set vScrollFixed(value) { this._vScrollFixed = value; }
    /**
     * The minimum amount of buffer rendered beyond the viewport (in pixels).
     * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     * @return {?}
     */
    get minBufferPx() { return this._minBufferPx; }
    /**
     * @param {?} value
     * @return {?}
     */
    set minBufferPx(value) { this._minBufferPx = coerceNumberProperty(value); }
    /**
     * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     * @return {?}
     */
    get maxBufferPx() { return this._maxBufferPx; }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxBufferPx(value) { this._maxBufferPx = coerceNumberProperty(value); }
    /**
     * @return {?}
     */
    get wheelMode() { return this._wheelMode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set wheelMode(value) {
        switch (value) {
            case 'passive':
            case 'blocking':
                this._wheelMode = value;
                break;
            default:
                /** @type {?} */
                const wheelMode = coerceNumberProperty(value);
                if (wheelMode && wheelMode >= 1 && wheelMode <= 60) {
                    this._wheelMode = wheelMode;
                }
                break;
        }
    }
    /**
     * @return {?}
     */
    get type() { return this._type; }
    ;
    /**
     * @return {?}
     */
    ngOnInit() {
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
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
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
    }
    /**
     * @return {?}
     */
    get scrolledIndexChange() { return this._scrollStrategy.scrolledIndexChange; }
    /**
     * @param {?} value
     * @return {?}
     */
    set scrolledIndexChange(value) { this._scrollStrategy.scrolledIndexChange = value; }
    /**
     * @param {?} viewport
     * @return {?}
     */
    attach(viewport) { this._scrollStrategy.attach(viewport); }
    /**
     * @return {?}
     */
    detach() { this._scrollStrategy.detach(); }
    /**
     * @return {?}
     */
    onContentScrolled() { this._scrollStrategy.onContentScrolled(); }
    /**
     * @return {?}
     */
    onDataLengthChanged() { this._scrollStrategy.onDataLengthChanged(); }
    /**
     * @return {?}
     */
    onContentRendered() { this._scrollStrategy.onContentRendered(); }
    /**
     * @return {?}
     */
    onRenderedOffsetChanged() { this._scrollStrategy.onRenderedOffsetChanged(); }
    /**
     * @param {?} index
     * @param {?} behavior
     * @return {?}
     */
    scrollToIndex(index, behavior) { this._scrollStrategy.scrollToIndex(index, behavior); }
}
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
PblCdkVirtualScrollDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: PblNgridComponent }
];
PblCdkVirtualScrollDirective.propDecorators = {
    vScrollAuto: [{ type: Input }],
    vScrollFixed: [{ type: Input }],
    minBufferPx: [{ type: Input }],
    maxBufferPx: [{ type: Input }],
    wheelMode: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9zdHJhdGVnaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQTRCLDhCQUE4QixFQUF5Qix1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xKLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztNQUlwRCxJQUFJOzs7OztBQUFHLFVBQVMsRUFBUSxFQUFFLEdBQVMsSUFBSSxDQUFDLENBQUE7O0FBRTlDLE1BQU0sT0FBTyx1QkFBdUI7SUFBcEM7UUFFRSxXQUFNLEdBQWlELElBQUksQ0FBQztRQUM1RCxXQUFNLEdBQWUsSUFBSSxDQUFDO1FBQzFCLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyx3QkFBbUIsR0FBZSxJQUFJLENBQUM7UUFDdkMsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLDRCQUF1QixHQUFlLElBQUksQ0FBQztRQUMzQyxrQkFBYSxHQUFzRCxJQUFJLENBQUM7SUFDMUUsQ0FBQztDQUFBOzs7SUFSQyxzREFBeUI7O0lBQ3pCLHlDQUE0RDs7SUFDNUQseUNBQTBCOztJQUMxQixvREFBcUM7O0lBQ3JDLHNEQUF1Qzs7SUFDdkMsb0RBQXFDOztJQUNyQywwREFBMkM7O0lBQzNDLGdEQUF3RTs7QUFHMUUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGdCQUFnQjs7Ozs7O0lBR3pELFNBQVMsQ0FBQyxLQUFnQixFQUFF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SUwsS0FBSzs7OztJQWpDTixvREFBcUI7O0lBVXJCLHFEQUFzQjs7SUFXdEIsb0RBQW1COztJQVVuQixvREFBbUI7O0lBaUJuQixrREFBNEM7Ozs7O0lBRzVDLHVEQUF1Qzs7Ozs7SUFHdkMsNkNBQThEOzs7OztJQUVyQiw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IEF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBJdGVtU2l6ZUF2ZXJhZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuaW1wb3J0IHsgUCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbihudj86IGFueSwgbnYxPzogYW55KSB7IH07XG5cbmV4cG9ydCBjbGFzcyBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSBpbXBsZW1lbnRzIFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIHNjcm9sbGVkSW5kZXhDaGFuZ2U6IGFueTtcbiAgYXR0YWNoOiAodmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkgPT4gdm9pZCA9IG5vb3A7XG4gIGRldGFjaDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIG9uQ29udGVudFNjcm9sbGVkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25EYXRhTGVuZ3RoQ2hhbmdlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIG9uQ29udGVudFJlbmRlcmVkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25SZW5kZXJlZE9mZnNldENoYW5nZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBzY3JvbGxUb0luZGV4OiAoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yKSA9PiB2b2lkID0gbm9vcDtcbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlSXRlbVNpemVBdmVyYWdlciBleHRlbmRzIEl0ZW1TaXplQXZlcmFnZXIge1xuICBwcml2YXRlIHJvd0luZm86IE5nZVZpcnR1YWxUYWJsZVJvd0luZm87XG5cbiAgYWRkU2FtcGxlKHJhbmdlOiBMaXN0UmFuZ2UsIHNpemU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnJvd0luZm8gJiYgdGhpcy5yb3dJbmZvLnJvd0xlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRTYW1wbGUocmFuZ2UsIHNpemUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHRlbXAgd29ya2Fyb3VuZCB0byBzb2x2ZSB0aGUgYWN0dWFsIHZzIHdhbnRlZCByZW5kZXJlZCByb3cgaXNzdWUgaW4gYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydGBcbiAgICpcbiAgICogYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKClgIHJldHVybiB0aGUgcm93cyB0aGF0IHRoZSB2aXJ0dWFsIGNvbnRhaW5lciB3YW50J3MgdGhlIGdyaWQgdG8gcmVuZGVyXG4gICAqIGhvd2V2ZXIsIHRoZSBhY3R1YWwgcmVuZGVyZWQgcm93cyBtaWdodCBiZSBkaWZmZXJlbnQuIFRoaXMgaXMgYSBwcm9ibGVtIGVzcGVjaWFsbHkgaW4gaW5pdCwgd2hlbiB0aGUgcmVuZGVyZWQgcm93cyBhcmUgYWN0dWFsbHkgMFxuICAgKiBidXQgYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKClgIHJldHVybiB0aGUgaW5pdGlhbCByYW5nZSBvZiByb3dzIHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLiBUaGlzIHJlc3VsdHMgaW4gYSB3cm9uZ1xuICAgKiBjYWxjdWxhdGlvbiBvZiB0aGUgYXZlcmFnZSBpdGVtIHNpemUgaW4gYEl0ZW1TaXplQXZlcmFnZXJgXG4gICAqXG4gICAqIFNFRTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvYTllNTUwZTViZjkzY2Q2OGMzNDJkMWE1MGQ4NTc2ZDhmMzgxMmViZS9zcmMvY2RrL3Njcm9sbGluZy92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC50cyNMMjEyLUwyMjBcbiAgICovXG4gIHNldFJvd0luZm8ocm93SW5mbzogTmdlVmlydHVhbFRhYmxlUm93SW5mbyk6IHZvaWQge1xuICAgIHRoaXMucm93SW5mbyA9IHJvd0luZm87XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGV4dGVuZHMgRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcblxuICBwcml2YXRlIF9uZ3JpZFZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2l6ZTogbnVtYmVyLCBtaW5CdWZmZXJQeDogbnVtYmVyLCBtYXhCdWZmZXJQeDogbnVtYmVyKSB7XG4gICAgc3VwZXIoaXRlbVNpemUsIG1pbkJ1ZmZlclB4LCBtYXhCdWZmZXJQeCk7XG4gIH1cblxuICBhdHRhY2godmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkge1xuICAgIHN1cGVyLmF0dGFjaCh0aGlzLl9uZ3JpZFZpZXdwb3J0ID0gdmlld3BvcnQpO1xuICB9XG5cbiAgb25Db250ZW50U2Nyb2xsZWQoKSB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3NobG9taWFzc2FmL25ncmlkL2lzc3Vlcy8xMVxuXG4gICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgYW4gaXNzdWUgd2l0aCBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lcbiAgICAvLyBXaGVuOlxuICAgIC8vICAgIC0gVGhlIHJlbmRlcmVkIGRhdGEgaXMgY2hhbmdlZCBzbyB0aGUgZGF0YSBsZW5ndGggaXMgbm93IExPV0VSIHRoZW4gdGhlIGN1cnJlbnQgcmFuZ2UgKGVuZCAtIHN0YXJ0KVxuICAgIC8vICAgIC0gVGhlIHJlbmRlcmluZyBkaXJlY3Rpb24gaXMgdG93YXJkcyB0aGUgdG9wIChzdGFydCA+IGVuZClcbiAgICAvL1xuICAgIC8vIEZvciB0aGUgaXNzdWUgdG8gb2NjdXIgYSBiaWcgZ2FwIGJldHdlZW4gdGhlIGRhdGEgbGVuZ3RoIGFuZCB0aGUgcmFuZ2UgbGVuZ3RoIChnYXApLCB3aGljaCBkb2VzIG5vdCBoYXBwZW4gb24gbm9ybWFsIHNjcm9sbGluZ1xuICAgIC8vIGJ1dCBvbmx5IHdoZW4gdGhlIGRhdGEgc291cmNlIGlzIHJlcGxhY2VkIChlLmcuIGZpbHRlcmluZykuXG4gICAgLy9cbiAgICAvLyBJbiBzdWNoIGNhc2VzIGBvbkRhdGFMZW5ndGhDaGFuZ2VkYCBpcyBjYWxsZWQgd2hpY2ggd2lsbCBjYWxsIGBfdXBkYXRlUmVuZGVyZWRSYW5nZWAgd2hpY2ggd2lsbCBjYWxjdWxhdGUgYSBuZXcgcmFuZ2VcbiAgICAvLyB0aGF0IGlzIGJpZywgaXQgd2lsbCBnaXZlIHRoZSBgc3RhcnRgIGEgbmV3IHZhbHVlIHdoaWNoIGNyZWF0ZXMgdGhlIGJpZyBnYXAuXG4gICAgLy8gSXQgd2lsbCB0aGVuIGNhbGN1bGF0ZSBhIG5ldyBcImVuZFwiIGFuZCBsZWF2ZSB0aGUgXCJzdGFydFwiIHNvIHdlIGhhdmUgYSBiaWcgZ2FwLCBsYXJnZXIgdGhlbiB0aGUgdmlld3BvcnQgc2l6ZS5cbiAgICAvLyBBZnRlciB0aGF0IGl0IHdpbGwgY3JlYXRlIHRoZSBuZXcgb2Zmc2V0IHdoaWNoIGlzIHRoZSBpdGVtU2l6ZSAqIHN0YXJ0LCB3aGljaCBpcyBhIGJpdCBsb3dlciB0aGVuIHRoZSBvZmZzZXQgYnV0IGlzIGxhcmdlIGFuZCBhZ2FpbiBkb2VzIG5vdCBmaXQgdGhlIHZpZXdwb3J0IHNpemVcbiAgICAvLyBUaGUgc2Nyb2xsIGNoYW5nZSB3aWxsIHRyaWdnZXIgYG9uQ29udGVudFNjcm9sbGVkYCB3aGljaCB3aWxsIGNhbGwgYF91cGRhdGVSZW5kZXJlZFJhbmdlYCBhZ2FpbixcbiAgICAvLyB3aXRoIHRoZSBzYW1lIG91dGNvbWUsIHJlZHVjaW5nIHRoZSBvZmZzZXQgc2xpZ2h0bHksIGNhbGxpbmcgYG9uQ29udGVudFNjcm9sbGVkYCBhZ2Fpbi5cbiAgICAvLyBJdCB3aWxsIHJlcGVhdCB1bnRpbCByZWFjaGluZyB0aGUgcHJvcGVyIG9mZnNldC5cbiAgICAvL1xuICAgIC8vIFRoZSBhbW91bnQgb2Ygb2Zmc2V0IHJlZHVjZWQgZWFjaCB0aW1lIGlzIGFwcHJveCB0aGUgc2l6ZSBvZiB0aGUgYnVmZmVycy4gKG1peC9tYXggQnVmZmVyKS5cbiAgICAvL1xuICAgIC8vIFRoaXMgc3RyYXRlZ3kgaXMgaGVyZSBvbmx5IGJlY2F1c2Ugb2YgdGhpcyBlcnJvciwgaXQgd2lsbCBsZXQgdGhlIGluaXRpYWwgdXBkYXRlIHJ1biBhbmQgY2F0Y2ggaXQncyBzdWJzZXF1ZW50IHNjcm9sbCBldmVudC5cbiAgICBpZiAoIXRoaXMuX25ncmlkVmlld3BvcnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHsgc3RhcnQsIGVuZCB9ID0gdGhpcy5fbmdyaWRWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKCk7XG4gICAgY29uc3QgcmFuZ2VMZW5ndGggPSBlbmQgLSBzdGFydDtcbiAgICBjb25zdCBkYXRhTGVuZ3RoID0gdGhpcy5fbmdyaWRWaWV3cG9ydC5nZXREYXRhTGVuZ3RoKCk7XG4gICAgaWYgKHJhbmdlTGVuZ3RoIDwgMCAmJiBkYXRhTGVuZ3RoIDwgLXJhbmdlTGVuZ3RoKSB7XG4gICAgICBzdGFydCA9IGRhdGFMZW5ndGggLSBlbmQ7XG4gICAgICB0aGlzLl9uZ3JpZFZpZXdwb3J0LnNldFJlbmRlcmVkUmFuZ2UoeyBzdGFydCwgZW5kIH0pO1xuICAgICAgdGhpcy5fbmdyaWRWaWV3cG9ydC5zZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQodGhpcy5pdGVtU2l6ZSAqIHN0YXJ0KTtcbiAgICAgIC8vIHRoaXMuX3Njcm9sbGVkSW5kZXhDaGFuZ2UubmV4dChNYXRoLmZsb29yKGZpcnN0VmlzaWJsZUluZGV4KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1cGVyLm9uQ29udGVudFNjcm9sbGVkKCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGV4dGVuZHMgQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBjb25zdHJ1Y3RvcihtaW5CdWZmZXJQeDogbnVtYmVyLCBtYXhCdWZmZXJQeDogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgYXZlcmFnZXIgPSBuZXcgVGFibGVJdGVtU2l6ZUF2ZXJhZ2VyKCkpIHtcbiAgICBzdXBlcihtaW5CdWZmZXJQeCwgbWF4QnVmZmVyUHgsIGF2ZXJhZ2VyKTtcbiAgfVxufVxuXG5jb25zdCBUWVBFUzogQXJyYXk8J3ZTY3JvbGxGaXhlZCcgfCAndlNjcm9sbEF1dG8nIHwgJ3ZTY3JvbGxOb25lJz4gPSBbJ3ZTY3JvbGxBdXRvJywgJ3ZTY3JvbGxGaXhlZCcsICd2U2Nyb2xsTm9uZSddO1xuXG5leHBvcnQgZnVuY3Rpb24gX3ZTY3JvbGxTdHJhdGVneUZhY3RvcnkoZGlyZWN0aXZlOiB7IF9zY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5OyB9KSB7XG4gIHJldHVybiBkaXJlY3RpdmUuX3Njcm9sbFN0cmF0ZWd5O1xufVxuXG4vKiogQSB2aXJ0dWFsIHNjcm9sbCBzdHJhdGVneSB0aGF0IHN1cHBvcnRzIHVua25vd24gb3IgZHluYW1pYyBzaXplIGl0ZW1zLiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3ZTY3JvbGxBdXRvXSwgcGJsLW5ncmlkW3ZTY3JvbGxGaXhlZF0sIHBibC1uZ3JpZFt2U2Nyb2xsTm9uZV0nLFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gICAgdXNlRXhpc3Rpbmc6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gICAgLyoqXG4gICAqIFRoZSBzaXplIG9mIHRoZSBpdGVtcyBpbiB0aGUgbGlzdCAoaW4gcGl4ZWxzKS5cbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXG4gICAqXG4gICAqIERlZmF1bHQ6IDIwXG4gICAqL1xuICBASW5wdXQoKSBnZXQgdlNjcm9sbEF1dG8oKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZTY3JvbGxBdXRvOyB9XG4gIHNldCB2U2Nyb2xsQXV0byh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX3ZTY3JvbGxBdXRvID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gIF92U2Nyb2xsQXV0bzogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgKGluIHBpeGVscykuXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKlxuICAgKiBEZWZhdWx0OiAyMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHZTY3JvbGxGaXhlZCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdlNjcm9sbEZpeGVkOyB9XG4gIHNldCB2U2Nyb2xsRml4ZWQodmFsdWU6IG51bWJlcikgeyB0aGlzLl92U2Nyb2xsRml4ZWQgPSB2YWx1ZTsgfVxuICBfdlNjcm9sbEZpeGVkOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGFtb3VudCBvZiBidWZmZXIgcmVuZGVyZWQgYmV5b25kIHRoZSB2aWV3cG9ydCAoaW4gcGl4ZWxzKS5cbiAgICogSWYgdGhlIGFtb3VudCBvZiBidWZmZXIgZGlwcyBiZWxvdyB0aGlzIG51bWJlciwgbW9yZSBpdGVtcyB3aWxsIGJlIHJlbmRlcmVkLiBEZWZhdWx0cyB0byAxMDBweC5cbiAgICpcbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsQXV0b2AgYW5kIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXG4gICAqIERlZmF1bHQ6IDEwMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1pbkJ1ZmZlclB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9taW5CdWZmZXJQeDsgfVxuICBzZXQgbWluQnVmZmVyUHgodmFsdWU6IG51bWJlcikgeyB0aGlzLl9taW5CdWZmZXJQeCA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBfbWluQnVmZmVyUHggPSAxMDA7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgcGl4ZWxzIHdvcnRoIG9mIGJ1ZmZlciB0byByZW5kZXIgZm9yIHdoZW4gcmVuZGVyaW5nIG5ldyBpdGVtcy4gRGVmYXVsdHMgdG8gMjAwcHguXG4gICAqXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEF1dG9gIGFuZCBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKiBEZWZhdWx0OiAxMDBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBtYXhCdWZmZXJQeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWF4QnVmZmVyUHg7IH1cbiAgc2V0IG1heEJ1ZmZlclB4KHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fbWF4QnVmZmVyUHggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgX21heEJ1ZmZlclB4ID0gMjAwO1xuXG4gIEBJbnB1dCgpIGdldCB3aGVlbE1vZGUoKTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlciB7IHJldHVybiB0aGlzLl93aGVlbE1vZGU7IH1cbiAgc2V0IHdoZWVsTW9kZSh2YWx1ZTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlcikge1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgIGNhc2UgJ3Bhc3NpdmUnOlxuICAgICAgY2FzZSAnYmxvY2tpbmcnOlxuICAgICAgIHRoaXMuX3doZWVsTW9kZSA9IHZhbHVlO1xuICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgd2hlZWxNb2RlID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpO1xuICAgICAgICBpZiAod2hlZWxNb2RlICYmIHdoZWVsTW9kZSA+PSAxICYmIHdoZWVsTW9kZSA8PSA2MCkge1xuICAgICAgICAgIHRoaXMuX3doZWVsTW9kZSA9IHdoZWVsTW9kZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgX3doZWVsTW9kZTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlcjtcblxuICAvKiogVGhlIHNjcm9sbCBzdHJhdGVneSB1c2VkIGJ5IHRoaXMgZGlyZWN0aXZlLiAqL1xuICBfc2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcblxuICBnZXQgdHlwZSgpOiAndlNjcm9sbEZpeGVkJyB8ICd2U2Nyb2xsQXV0bycgfCAndlNjcm9sbE5vbmUnIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH07XG4gIHByaXZhdGUgX3R5cGU6ICd2U2Nyb2xsRml4ZWQnIHwgJ3ZTY3JvbGxBdXRvJyB8ICd2U2Nyb2xsTm9uZSc7XG5cbiAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBjb25zdCB0eXBlcyA9IFRZUEVTLmZpbHRlciggdCA9PiBlbC5uYXRpdmVFbGVtZW50Lmhhc0F0dHJpYnV0ZSh0KSk7XG5cbiAgICBpZiAodHlwZXMubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHZTY3JvbGwgaW5zdHJ1Y3Rpb24sIG9ubHkgb25lIHZhbHVlIGlzIGFsbG93OiAke0pTT04uc3RyaW5naWZ5KHR5cGVzKX1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdHlwZSA9IHR5cGVzWzBdO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fdHlwZSkge1xuICAgICAgaWYgKCdfdlNjcm9sbEZpeGVkJyBpbiA8YW55PnRoaXMpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9ICd2U2Nyb2xsRml4ZWQnO1xuICAgICAgfSBlbHNlIGlmICgnX3ZTY3JvbGxBdXRvJyBpbiA8YW55PnRoaXMpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9ICd2U2Nyb2xsQXV0byc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl90eXBlID0gJ3ZTY3JvbGxOb25lJztcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgJ3ZTY3JvbGxGaXhlZCc6XG4gICAgICAgIGlmICghdGhpcy5fdlNjcm9sbEZpeGVkKSB7XG4gICAgICAgICAgdGhpcy52U2Nyb2xsRml4ZWQgID0gdGhpcy5ncmlkLmZpbmRJbml0aWFsUm93SGVpZ2h0KCkgfHwgNDg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBuZXcgUGJsTmdyaWRGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kodGhpcy52U2Nyb2xsRml4ZWQsIHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZTY3JvbGxBdXRvJzpcbiAgICAgICAgaWYgKCF0aGlzLl92U2Nyb2xsQXV0bykge1xuICAgICAgICAgIHRoaXMuX3ZTY3JvbGxBdXRvICA9IHRoaXMuZ3JpZC5maW5kSW5pdGlhbFJvd0hlaWdodCgpIHx8IDQ4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kodGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCwgbmV3IFRhYmxlSXRlbVNpemVBdmVyYWdlcih0aGlzLl92U2Nyb2xsQXV0bykpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gbmV3IE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxTdHJhdGVneSkge1xuICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgY2FzZSAndlNjcm9sbEZpeGVkJzpcbiAgICAgICAgICAodGhpcy5fc2Nyb2xsU3RyYXRlZ3kgYXMgUGJsTmdyaWRGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpXG4gICAgICAgICAgICAudXBkYXRlSXRlbUFuZEJ1ZmZlclNpemUodGhpcy52U2Nyb2xsRml4ZWQsIHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd2U2Nyb2xsQXV0byc6XG4gICAgICAgICAgKHRoaXMuX3Njcm9sbFN0cmF0ZWd5IGFzIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpXG4gICAgICAgICAgICAudXBkYXRlQnVmZmVyU2l6ZSh0aGlzLm1pbkJ1ZmZlclB4LCB0aGlzLm1heEJ1ZmZlclB4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgc2Nyb2xsZWRJbmRleENoYW5nZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4geyByZXR1cm4gdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuc2Nyb2xsZWRJbmRleENoYW5nZTsgfVxuICBzZXQgc2Nyb2xsZWRJbmRleENoYW5nZSh2YWx1ZTogT2JzZXJ2YWJsZTxudW1iZXI+KSB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LnNjcm9sbGVkSW5kZXhDaGFuZ2UgPSB2YWx1ZTsgfVxuICBhdHRhY2godmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5hdHRhY2godmlld3BvcnQpOyB9XG4gIGRldGFjaCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuZGV0YWNoKCk7IH1cbiAgb25Db250ZW50U2Nyb2xsZWQoKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5Lm9uQ29udGVudFNjcm9sbGVkKCk7IH1cbiAgb25EYXRhTGVuZ3RoQ2hhbmdlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25EYXRhTGVuZ3RoQ2hhbmdlZCgpOyB9XG4gIG9uQ29udGVudFJlbmRlcmVkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vbkNvbnRlbnRSZW5kZXJlZCgpOyB9XG4gIG9uUmVuZGVyZWRPZmZzZXRDaGFuZ2VkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZCgpOyB9XG4gIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LnNjcm9sbFRvSW5kZXgoaW5kZXgsIGJlaGF2aW9yKTsgfVxufVxuIl19