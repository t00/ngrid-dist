/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { AutoSizeVirtualScrollStrategy, ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { PblNgridComponent } from '../../table.component';
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
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
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
     * @param {?} table
     */
    constructor(el, table) {
        this.table = table;
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
    PblCdkVirtualScrollDirective.prototype.table;
    /* Skipping unhandled member: ;*/
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZmVhdHVyZXMvdmlydHVhbC1zY3JvbGwvc3RyYXRlZ2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU3RCxPQUFPLEVBQTRCLDhCQUE4QixFQUF5Qix1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xKLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXRHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztNQUlwRCxJQUFJOzs7OztBQUFHLFVBQVMsRUFBUSxFQUFFLEdBQVMsSUFBSSxDQUFDLENBQUE7O0FBRTlDLE1BQU0sT0FBTyx1QkFBdUI7SUFBcEM7UUFFRSxXQUFNLEdBQWlELElBQUksQ0FBQztRQUM1RCxXQUFNLEdBQWUsSUFBSSxDQUFDO1FBQzFCLHNCQUFpQixHQUFlLElBQUksQ0FBQztRQUNyQyx3QkFBbUIsR0FBZSxJQUFJLENBQUM7UUFDdkMsc0JBQWlCLEdBQWUsSUFBSSxDQUFDO1FBQ3JDLDRCQUF1QixHQUFlLElBQUksQ0FBQztRQUMzQyxrQkFBYSxHQUFzRCxJQUFJLENBQUM7SUFDMUUsQ0FBQztDQUFBOzs7SUFSQyxzREFBeUI7O0lBQ3pCLHlDQUE0RDs7SUFDNUQseUNBQTBCOztJQUMxQixvREFBcUM7O0lBQ3JDLHNEQUF1Qzs7SUFDdkMsb0RBQXFDOztJQUNyQywwREFBMkM7O0lBQzNDLGdEQUF3RTs7QUFHMUUsTUFBTSxPQUFPLHFCQUFzQixTQUFRLGdCQUFnQjs7Ozs7O0lBR3pELFNBQVMsQ0FBQyxLQUFnQixFQUFF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SUwsS0FBSzs7OztJQWpDTixvREFBcUI7O0lBVXJCLHFEQUFzQjs7SUFXdEIsb0RBQW1COztJQVVuQixvREFBbUI7O0lBaUJuQixrREFBNEM7Ozs7O0lBRzVDLHVEQUF1Qzs7Ozs7SUFHdkMsNkNBQThEOzs7OztJQUVyQiw2Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VOdW1iZXJQcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LCBGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IEF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBJdGVtU2l6ZUF2ZXJhZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuaW1wb3J0IHsgUCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5cbmNvbnN0IG5vb3AgPSBmdW5jdGlvbihudj86IGFueSwgbnYxPzogYW55KSB7IH07XG5cbmV4cG9ydCBjbGFzcyBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSBpbXBsZW1lbnRzIFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIHNjcm9sbGVkSW5kZXhDaGFuZ2U6IGFueTtcbiAgYXR0YWNoOiAodmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkgPT4gdm9pZCA9IG5vb3A7XG4gIGRldGFjaDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIG9uQ29udGVudFNjcm9sbGVkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25EYXRhTGVuZ3RoQ2hhbmdlZDogKCkgPT4gdm9pZCA9IG5vb3A7XG4gIG9uQ29udGVudFJlbmRlcmVkOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgb25SZW5kZXJlZE9mZnNldENoYW5nZWQ6ICgpID0+IHZvaWQgPSBub29wO1xuICBzY3JvbGxUb0luZGV4OiAoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yKSA9PiB2b2lkID0gbm9vcDtcbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxlSXRlbVNpemVBdmVyYWdlciBleHRlbmRzIEl0ZW1TaXplQXZlcmFnZXIge1xuICBwcml2YXRlIHJvd0luZm86IE5nZVZpcnR1YWxUYWJsZVJvd0luZm87XG5cbiAgYWRkU2FtcGxlKHJhbmdlOiBMaXN0UmFuZ2UsIHNpemU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnJvd0luZm8gJiYgdGhpcy5yb3dJbmZvLnJvd0xlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5hZGRTYW1wbGUocmFuZ2UsIHNpemUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBIHRlbXAgd29ya2Fyb3VuZCB0byBzb2x2ZSB0aGUgYWN0dWFsIHZzIHdhbnRlZCByZW5kZXJlZCByb3cgaXNzdWUgaW4gYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydGBcbiAgICpcbiAgICogYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKClgIHJldHVybiB0aGUgcm93cyB0aGF0IHRoZSB2aXJ0dWFsIGNvbnRhaW5lciB3YW50J3MgdGhlIHRhYmxlIHRvIHJlbmRlclxuICAgKiBob3dldmVyLCB0aGUgYWN0dWFsIHJlbmRlcmVkIHJvd3MgbWlnaHQgYmUgZGlmZmVyZW50LiBUaGlzIGlzIGEgcHJvYmxlbSBlc3BlY2lhbGx5IGluIGluaXQsIHdoZW4gdGhlIHJlbmRlcmVkIHJvd3MgYXJlIGFjdHVhbGx5IDBcbiAgICogYnV0IGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpYCByZXR1cm4gdGhlIGluaXRpYWwgcmFuZ2Ugb2Ygcm93cyB0aGF0IHNob3VsZCBiZSByZW5kZXJlZC4gVGhpcyByZXN1bHRzIGluIGEgd3JvbmdcbiAgICogY2FsY3VsYXRpb24gb2YgdGhlIGF2ZXJhZ2UgaXRlbSBzaXplIGluIGBJdGVtU2l6ZUF2ZXJhZ2VyYFxuICAgKlxuICAgKiBTRUU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iL2E5ZTU1MGU1YmY5M2NkNjhjMzQyZDFhNTBkODU3NmQ4ZjM4MTJlYmUvc3JjL2Nkay9zY3JvbGxpbmcvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQudHMjTDIxMi1MMjIwXG4gICAqL1xuICBzZXRSb3dJbmZvKHJvd0luZm86IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pOiB2b2lkIHtcbiAgICB0aGlzLnJvd0luZm8gPSByb3dJbmZvO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSBleHRlbmRzIEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG5cbiAgcHJpdmF0ZSBfbmdyaWRWaWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNpemU6IG51bWJlciwgbWluQnVmZmVyUHg6IG51bWJlciwgbWF4QnVmZmVyUHg6IG51bWJlcikge1xuICAgIHN1cGVyKGl0ZW1TaXplLCBtaW5CdWZmZXJQeCwgbWF4QnVmZmVyUHgpO1xuICB9XG5cbiAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHtcbiAgICBzdXBlci5hdHRhY2godGhpcy5fbmdyaWRWaWV3cG9ydCA9IHZpZXdwb3J0KTtcbiAgfVxuXG4gIG9uQ29udGVudFNjcm9sbGVkKCkge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zaGxvbWlhc3NhZi9uZ3JpZC9pc3N1ZXMvMTFcblxuICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIGFuIGlzc3VlIHdpdGggRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5XG4gICAgLy8gV2hlbjpcbiAgICAvLyAgICAtIFRoZSByZW5kZXJlZCBkYXRhIGlzIGNoYW5nZWQgc28gdGhlIGRhdGEgbGVuZ3RoIGlzIG5vdyBMT1dFUiB0aGVuIHRoZSBjdXJyZW50IHJhbmdlIChlbmQgLSBzdGFydClcbiAgICAvLyAgICAtIFRoZSByZW5kZXJpbmcgZGlyZWN0aW9uIGlzIHRvd2FyZHMgdGhlIHRvcCAoc3RhcnQgPiBlbmQpXG4gICAgLy9cbiAgICAvLyBGb3IgdGhlIGlzc3VlIHRvIG9jY3VyIGEgYmlnIGdhcCBiZXR3ZWVuIHRoZSBkYXRhIGxlbmd0aCBhbmQgdGhlIHJhbmdlIGxlbmd0aCAoZ2FwKSwgd2hpY2ggZG9lcyBub3QgaGFwcGVuIG9uIG5vcm1hbCBzY3JvbGxpbmdcbiAgICAvLyBidXQgb25seSB3aGVuIHRoZSBkYXRhIHNvdXJjZSBpcyByZXBsYWNlZCAoZS5nLiBmaWx0ZXJpbmcpLlxuICAgIC8vXG4gICAgLy8gSW4gc3VjaCBjYXNlcyBgb25EYXRhTGVuZ3RoQ2hhbmdlZGAgaXMgY2FsbGVkIHdoaWNoIHdpbGwgY2FsbCBgX3VwZGF0ZVJlbmRlcmVkUmFuZ2VgIHdoaWNoIHdpbGwgY2FsY3VsYXRlIGEgbmV3IHJhbmdlXG4gICAgLy8gdGhhdCBpcyBiaWcsIGl0IHdpbGwgZ2l2ZSB0aGUgYHN0YXJ0YCBhIG5ldyB2YWx1ZSB3aGljaCBjcmVhdGVzIHRoZSBiaWcgZ2FwLlxuICAgIC8vIEl0IHdpbGwgdGhlbiBjYWxjdWxhdGUgYSBuZXcgXCJlbmRcIiBhbmQgbGVhdmUgdGhlIFwic3RhcnRcIiBzbyB3ZSBoYXZlIGEgYmlnIGdhcCwgbGFyZ2VyIHRoZW4gdGhlIHZpZXdwb3J0IHNpemUuXG4gICAgLy8gQWZ0ZXIgdGhhdCBpdCB3aWxsIGNyZWF0ZSB0aGUgbmV3IG9mZnNldCB3aGljaCBpcyB0aGUgaXRlbVNpemUgKiBzdGFydCwgd2hpY2ggaXMgYSBiaXQgbG93ZXIgdGhlbiB0aGUgb2Zmc2V0IGJ1dCBpcyBsYXJnZSBhbmQgYWdhaW4gZG9lcyBub3QgZml0IHRoZSB2aWV3cG9ydCBzaXplXG4gICAgLy8gVGhlIHNjcm9sbCBjaGFuZ2Ugd2lsbCB0cmlnZ2VyIGBvbkNvbnRlbnRTY3JvbGxlZGAgd2hpY2ggd2lsbCBjYWxsIGBfdXBkYXRlUmVuZGVyZWRSYW5nZWAgYWdhaW4sXG4gICAgLy8gd2l0aCB0aGUgc2FtZSBvdXRjb21lLCByZWR1Y2luZyB0aGUgb2Zmc2V0IHNsaWdodGx5LCBjYWxsaW5nIGBvbkNvbnRlbnRTY3JvbGxlZGAgYWdhaW4uXG4gICAgLy8gSXQgd2lsbCByZXBlYXQgdW50aWwgcmVhY2hpbmcgdGhlIHByb3BlciBvZmZzZXQuXG4gICAgLy9cbiAgICAvLyBUaGUgYW1vdW50IG9mIG9mZnNldCByZWR1Y2VkIGVhY2ggdGltZSBpcyBhcHByb3ggdGhlIHNpemUgb2YgdGhlIGJ1ZmZlcnMuIChtaXgvbWF4IEJ1ZmZlcikuXG4gICAgLy9cbiAgICAvLyBUaGlzIHN0cmF0ZWd5IGlzIGhlcmUgb25seSBiZWNhdXNlIG9mIHRoaXMgZXJyb3IsIGl0IHdpbGwgbGV0IHRoZSBpbml0aWFsIHVwZGF0ZSBydW4gYW5kIGNhdGNoIGl0J3Mgc3Vic2VxdWVudCBzY3JvbGwgZXZlbnQuXG4gICAgaWYgKCF0aGlzLl9uZ3JpZFZpZXdwb3J0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCB7IHN0YXJ0LCBlbmQgfSA9IHRoaXMuX25ncmlkVmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpO1xuICAgIGNvbnN0IHJhbmdlTGVuZ3RoID0gZW5kIC0gc3RhcnQ7XG4gICAgY29uc3QgZGF0YUxlbmd0aCA9IHRoaXMuX25ncmlkVmlld3BvcnQuZ2V0RGF0YUxlbmd0aCgpO1xuICAgIGlmIChyYW5nZUxlbmd0aCA8IDAgJiYgZGF0YUxlbmd0aCA8IC1yYW5nZUxlbmd0aCkge1xuICAgICAgc3RhcnQgPSBkYXRhTGVuZ3RoIC0gZW5kO1xuICAgICAgdGhpcy5fbmdyaWRWaWV3cG9ydC5zZXRSZW5kZXJlZFJhbmdlKHsgc3RhcnQsIGVuZCB9KTtcbiAgICAgIHRoaXMuX25ncmlkVmlld3BvcnQuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KHRoaXMuaXRlbVNpemUgKiBzdGFydCk7XG4gICAgICAvLyB0aGlzLl9zY3JvbGxlZEluZGV4Q2hhbmdlLm5leHQoTWF0aC5mbG9vcihmaXJzdFZpc2libGVJbmRleCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdXBlci5vbkNvbnRlbnRTY3JvbGxlZCgpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSBleHRlbmRzIEF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IobWluQnVmZmVyUHg6IG51bWJlciwgbWF4QnVmZmVyUHg6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IGF2ZXJhZ2VyID0gbmV3IFRhYmxlSXRlbVNpemVBdmVyYWdlcigpKSB7XG4gICAgc3VwZXIobWluQnVmZmVyUHgsIG1heEJ1ZmZlclB4LCBhdmVyYWdlcik7XG4gIH1cbn1cblxuY29uc3QgVFlQRVM6IEFycmF5PCd2U2Nyb2xsRml4ZWQnIHwgJ3ZTY3JvbGxBdXRvJyB8ICd2U2Nyb2xsTm9uZSc+ID0gWyd2U2Nyb2xsQXV0bycsICd2U2Nyb2xsRml4ZWQnLCAndlNjcm9sbE5vbmUnXTtcblxuZXhwb3J0IGZ1bmN0aW9uIF92U2Nyb2xsU3RyYXRlZ3lGYWN0b3J5KGRpcmVjdGl2ZTogeyBfc2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTsgfSkge1xuICByZXR1cm4gZGlyZWN0aXZlLl9zY3JvbGxTdHJhdGVneTtcbn1cblxuLyoqIEEgdmlydHVhbCBzY3JvbGwgc3RyYXRlZ3kgdGhhdCBzdXBwb3J0cyB1bmtub3duIG9yIGR5bmFtaWMgc2l6ZSBpdGVtcy4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFt2U2Nyb2xsQXV0b10sIHBibC1uZ3JpZFt2U2Nyb2xsRml4ZWRdLCBwYmwtbmdyaWRbdlNjcm9sbE5vbmVdJyxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICAgIHVzZUV4aXN0aW5nOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLFxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICAgIC8qKlxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgKGluIHBpeGVscykuXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKlxuICAgKiBEZWZhdWx0OiAyMFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IHZTY3JvbGxBdXRvKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl92U2Nyb2xsQXV0bzsgfVxuICBzZXQgdlNjcm9sbEF1dG8odmFsdWU6IG51bWJlcikgeyB0aGlzLl92U2Nyb2xsQXV0byA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTsgfVxuICBfdlNjcm9sbEF1dG86IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHNpemUgb2YgdGhlIGl0ZW1zIGluIHRoZSBsaXN0IChpbiBwaXhlbHMpLlxuICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxGaXhlZGAgb25seSFcbiAgICpcbiAgICogRGVmYXVsdDogMjBcbiAgICovXG4gIEBJbnB1dCgpIGdldCB2U2Nyb2xsRml4ZWQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3ZTY3JvbGxGaXhlZDsgfVxuICBzZXQgdlNjcm9sbEZpeGVkKHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fdlNjcm9sbEZpeGVkID0gdmFsdWU7IH1cbiAgX3ZTY3JvbGxGaXhlZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgbWluaW11bSBhbW91bnQgb2YgYnVmZmVyIHJlbmRlcmVkIGJleW9uZCB0aGUgdmlld3BvcnQgKGluIHBpeGVscykuXG4gICAqIElmIHRoZSBhbW91bnQgb2YgYnVmZmVyIGRpcHMgYmVsb3cgdGhpcyBudW1iZXIsIG1vcmUgaXRlbXMgd2lsbCBiZSByZW5kZXJlZC4gRGVmYXVsdHMgdG8gMTAwcHguXG4gICAqXG4gICAqIFZhbGlkIGZvciBgdlNjcm9sbEF1dG9gIGFuZCBgdlNjcm9sbEZpeGVkYCBvbmx5IVxuICAgKiBEZWZhdWx0OiAxMDBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBtaW5CdWZmZXJQeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbWluQnVmZmVyUHg7IH1cbiAgc2V0IG1pbkJ1ZmZlclB4KHZhbHVlOiBudW1iZXIpIHsgdGhpcy5fbWluQnVmZmVyUHggPSBjb2VyY2VOdW1iZXJQcm9wZXJ0eSh2YWx1ZSk7IH1cbiAgX21pbkJ1ZmZlclB4ID0gMTAwO1xuXG4gIC8qKlxuICAgKiBUaGUgbnVtYmVyIG9mIHBpeGVscyB3b3J0aCBvZiBidWZmZXIgdG8gcmVuZGVyIGZvciB3aGVuIHJlbmRlcmluZyBuZXcgaXRlbXMuIERlZmF1bHRzIHRvIDIwMHB4LlxuICAgKlxuICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxBdXRvYCBhbmQgYHZTY3JvbGxGaXhlZGAgb25seSFcbiAgICogRGVmYXVsdDogMTAwXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbWF4QnVmZmVyUHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX21heEJ1ZmZlclB4OyB9XG4gIHNldCBtYXhCdWZmZXJQeCh2YWx1ZTogbnVtYmVyKSB7IHRoaXMuX21heEJ1ZmZlclB4ID0gY29lcmNlTnVtYmVyUHJvcGVydHkodmFsdWUpOyB9XG4gIF9tYXhCdWZmZXJQeCA9IDIwMDtcblxuICBASW5wdXQoKSBnZXQgd2hlZWxNb2RlKCk6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXIgeyByZXR1cm4gdGhpcy5fd2hlZWxNb2RlOyB9XG4gIHNldCB3aGVlbE1vZGUodmFsdWU6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlICdwYXNzaXZlJzpcbiAgICAgIGNhc2UgJ2Jsb2NraW5nJzpcbiAgICAgICB0aGlzLl93aGVlbE1vZGUgPSB2YWx1ZTtcbiAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IHdoZWVsTW9kZSA9IGNvZXJjZU51bWJlclByb3BlcnR5KHZhbHVlKTtcbiAgICAgICAgaWYgKHdoZWVsTW9kZSAmJiB3aGVlbE1vZGUgPj0gMSAmJiB3aGVlbE1vZGUgPD0gNjApIHtcbiAgICAgICAgICB0aGlzLl93aGVlbE1vZGUgPSB3aGVlbE1vZGU7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIF93aGVlbE1vZGU6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXI7XG5cbiAgLyoqIFRoZSBzY3JvbGwgc3RyYXRlZ3kgdXNlZCBieSB0aGlzIGRpcmVjdGl2ZS4gKi9cbiAgX3Njcm9sbFN0cmF0ZWd5OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgZ2V0IHR5cGUoKTogJ3ZTY3JvbGxGaXhlZCcgfCAndlNjcm9sbEF1dG8nIHwgJ3ZTY3JvbGxOb25lJyB7IHJldHVybiB0aGlzLl90eXBlOyB9O1xuICBwcml2YXRlIF90eXBlOiAndlNjcm9sbEZpeGVkJyB8ICd2U2Nyb2xsQXV0bycgfCAndlNjcm9sbE5vbmUnO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgcHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIGNvbnN0IHR5cGVzID0gVFlQRVMuZmlsdGVyKCB0ID0+IGVsLm5hdGl2ZUVsZW1lbnQuaGFzQXR0cmlidXRlKHQpKTtcblxuICAgIGlmICh0eXBlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdlNjcm9sbCBpbnN0cnVjdGlvbiwgb25seSBvbmUgdmFsdWUgaXMgYWxsb3c6ICR7SlNPTi5zdHJpbmdpZnkodHlwZXMpfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90eXBlID0gdHlwZXNbMF07XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl90eXBlKSB7XG4gICAgICBpZiAoJ192U2Nyb2xsRml4ZWQnIGluIDxhbnk+dGhpcykge1xuICAgICAgICB0aGlzLl90eXBlID0gJ3ZTY3JvbGxGaXhlZCc7XG4gICAgICB9IGVsc2UgaWYgKCdfdlNjcm9sbEF1dG8nIGluIDxhbnk+dGhpcykge1xuICAgICAgICB0aGlzLl90eXBlID0gJ3ZTY3JvbGxBdXRvJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3R5cGUgPSAndlNjcm9sbE5vbmUnO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgY2FzZSAndlNjcm9sbEZpeGVkJzpcbiAgICAgICAgaWYgKCF0aGlzLl92U2Nyb2xsRml4ZWQpIHtcbiAgICAgICAgICB0aGlzLnZTY3JvbGxGaXhlZCAgPSB0aGlzLnRhYmxlLmZpbmRJbml0aWFsUm93SGVpZ2h0KCkgfHwgNDg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSBuZXcgUGJsTmdyaWRGaXhlZFNpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kodGhpcy52U2Nyb2xsRml4ZWQsIHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ZTY3JvbGxBdXRvJzpcbiAgICAgICAgaWYgKCF0aGlzLl92U2Nyb2xsQXV0bykge1xuICAgICAgICAgIHRoaXMuX3ZTY3JvbGxBdXRvICA9IHRoaXMudGFibGUuZmluZEluaXRpYWxSb3dIZWlnaHQoKSB8fCA0ODtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9IG5ldyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KHRoaXMubWluQnVmZmVyUHgsIHRoaXMubWF4QnVmZmVyUHgsIG5ldyBUYWJsZUl0ZW1TaXplQXZlcmFnZXIodGhpcy5fdlNjcm9sbEF1dG8pKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9IG5ldyBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICBpZiAodGhpcy5fc2Nyb2xsU3RyYXRlZ3kpIHtcbiAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ3ZTY3JvbGxGaXhlZCc6XG4gICAgICAgICAgKHRoaXMuX3Njcm9sbFN0cmF0ZWd5IGFzIFBibE5ncmlkRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KVxuICAgICAgICAgICAgLnVwZGF0ZUl0ZW1BbmRCdWZmZXJTaXplKHRoaXMudlNjcm9sbEZpeGVkLCB0aGlzLm1pbkJ1ZmZlclB4LCB0aGlzLm1heEJ1ZmZlclB4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAndlNjcm9sbEF1dG8nOlxuICAgICAgICAgICh0aGlzLl9zY3JvbGxTdHJhdGVneSBhcyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KVxuICAgICAgICAgICAgLnVwZGF0ZUJ1ZmZlclNpemUodGhpcy5taW5CdWZmZXJQeCwgdGhpcy5tYXhCdWZmZXJQeCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNjcm9sbGVkSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHsgcmV0dXJuIHRoaXMuX3Njcm9sbFN0cmF0ZWd5LnNjcm9sbGVkSW5kZXhDaGFuZ2U7IH1cbiAgc2V0IHNjcm9sbGVkSW5kZXhDaGFuZ2UodmFsdWU6IE9ic2VydmFibGU8bnVtYmVyPikgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5zY3JvbGxlZEluZGV4Q2hhbmdlID0gdmFsdWU7IH1cbiAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kuYXR0YWNoKHZpZXdwb3J0KTsgfVxuICBkZXRhY2goKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5LmRldGFjaCgpOyB9XG4gIG9uQ29udGVudFNjcm9sbGVkKCk6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5vbkNvbnRlbnRTY3JvbGxlZCgpOyB9XG4gIG9uRGF0YUxlbmd0aENoYW5nZWQoKTogdm9pZCB7IHRoaXMuX3Njcm9sbFN0cmF0ZWd5Lm9uRGF0YUxlbmd0aENoYW5nZWQoKTsgfVxuICBvbkNvbnRlbnRSZW5kZXJlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25Db250ZW50UmVuZGVyZWQoKTsgfVxuICBvblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZCgpOiB2b2lkIHsgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kub25SZW5kZXJlZE9mZnNldENoYW5nZWQoKTsgfVxuICBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvcik6IHZvaWQgeyB0aGlzLl9zY3JvbGxTdHJhdGVneS5zY3JvbGxUb0luZGV4KGluZGV4LCBiZWhhdmlvcik7IH1cbn1cbiJdfQ==