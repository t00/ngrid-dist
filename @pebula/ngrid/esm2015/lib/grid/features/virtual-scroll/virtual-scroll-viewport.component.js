/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/virtual-scroll-viewport.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, Input, ChangeDetectorRef, ViewEncapsulation, NgZone, Output, Optional, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY, ScrollDispatcher, CdkScrollable, } from '@angular/cdk/scrolling';
import { unrx } from '../../utils';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { PblNgridConfigService } from '../../services/config';
import { PblNgridComponent } from '../../ngrid.component';
import { PblCdkVirtualScrollDirective, NoVirtualScrollStrategy, TableAutoSizeVirtualScrollStrategy } from './strategies';
/**
 * @param {?} config
 * @param {?=} scrollStrategy
 * @return {?}
 */
function resolveScrollStrategy(config, scrollStrategy) {
    if (!scrollStrategy && config.has('virtualScroll')) {
        /** @type {?} */
        const virtualScrollConfig = config.get('virtualScroll');
        if (typeof virtualScrollConfig.defaultStrategy === 'function') {
            scrollStrategy = virtualScrollConfig.defaultStrategy();
        }
    }
    return scrollStrategy || new TableAutoSizeVirtualScrollStrategy(100, 200);
}
export class PblCdkVirtualScrollViewportComponent extends CdkVirtualScrollViewport {
    /**
     * @param {?} elementRef
     * @param {?} cdr
     * @param {?} ngZone
     * @param {?} config
     * @param {?} pblScrollStrategy
     * @param {?} dir
     * @param {?} scrollDispatcher
     * @param {?} pluginCtrl
     * @param {?} grid
     */
    constructor(elementRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, pluginCtrl, grid) {
        super(elementRef, cdr, ngZone, pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy), dir, scrollDispatcher);
        this.cdr = cdr;
        this.pblScrollStrategy = pblScrollStrategy;
        this.grid = grid;
        /**
         * Event emitted when the scrolling state of rows in the grid changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The grid is in "scrolling" state from the first scroll event and until 2 animation frames
         * have passed without a scroll event.
         *
         * When scrolling, the emitted value is the direction: -1 or 1
         * When not scrolling, the emitted value is 0.
         *
         * NOTE: This event runs outside the angular zone.
         */
        this.scrolling = new EventEmitter();
        /**
         * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
         *
         * The frame rate value is the average frame rate from all measurements since the scrolling began.
         * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
         * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
         *
         * Valid on when virtual scrolling is enabled.
         *
         * NOTE: This event runs outside the angular zone.
         *
         * In the future the measurement logic might be replaced with the Frame Timing API
         * See:
         * - https://developers.google.com/web/updates/2014/11/frame-timing-api
         * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
         * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
         */
        this.scrollFrameRate = new EventEmitter();
        /**
         * The `scrollHeight` of the virtual scroll viewport.
         * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
         * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
         *
         * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
         * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
         * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
         *
         * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
         */
        this.scrollHeight = 0;
        this.ngeRenderedContentSize = 0;
        /// TODO(shlomiassaf): Remove when not supporting 8.1.2 and below
        /// COMPATIBILITY 8.1.2- <-> 8.1.3+
        /**
         * A string representing the `style.width` property value to be used for the spacer element.
         */
        this._totalContentWidth = '';
        /**
         * A string representing the `style.height` property value to be used for the spacer element.
         */
        this._totalContentHeight = '';
        /**
         * The transform used to scale the spacer to the same size as all content, including content that
         * is not currently rendered.
         * @deprecated
         */
        this._totalContentSizeTransform = '';
        this.offsetChange$ = new Subject();
        this._isScrolling = false;
        if (config.has('virtualScroll')) {
            this.wheelModeDefault = config.get('virtualScroll').wheelMode;
        }
        config.onUpdate('virtualScroll').pipe(unrx(this)).subscribe((/**
         * @param {?} change
         * @return {?}
         */
        change => this.wheelModeDefault = change.curr.wheelMode));
        if (pblScrollStrategy instanceof PblCdkVirtualScrollDirective) {
            this.enabled = pblScrollStrategy.type !== 'vScrollNone';
        }
        else {
            this.enabled = !(pblScrollStrategy instanceof NoVirtualScrollStrategy);
        }
        pluginCtrl.extApi.setViewport(this);
        this.offsetChange = this.offsetChange$.asObservable();
        this._minWidth$ = grid.columnApi.totalColumnWidthChange;
    }
    /**
     * @return {?}
     */
    get isScrolling() { return this._isScrolling; }
    /**
     * @return {?}
     */
    get wheelMode() {
        return ((/** @type {?} */ (this.pblScrollStrategy))).wheelMode || this.wheelModeDefault || 'passive';
    }
    /**
     * @return {?}
     */
    get innerWidth() {
        /** @type {?} */
        const innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
        return innerWidthHelper.getBoundingClientRect().width;
    }
    /**
     * @return {?}
     */
    get outerWidth() {
        return this.elementRef.nativeElement.getBoundingClientRect().width;
    }
    /**
     * @return {?}
     */
    get innerHeight() {
        /** @type {?} */
        const innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
        return innerWidthHelper.getBoundingClientRect().height;
    }
    /**
     * @return {?}
     */
    get outerHeight() {
        return this.elementRef.nativeElement.getBoundingClientRect().height;
    }
    /**
     * @return {?}
     */
    get scrollWidth() {
        return this.elementRef.nativeElement.scrollWidth;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.enabled) {
            super.ngOnInit();
        }
        else {
            CdkScrollable.prototype.ngOnInit.call(this);
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        () => this.initScrollWatcher()));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // If virtual scroll is disabled (`NoVirtualScrollStrategy`) we need to disable any effect applied
        // by the viewport, wrapping the content injected to it.
        // The main effect is the grid having height 0 at all times, unless the height is explicitly set.
        // This happens because the content taking out of the layout, wrapped in absolute positioning.
        // Additionally, the host itself (viewport) is set to contain: strict.
        const { grid } = this;
        if (this.enabled) {
            grid._cdkTable.attachViewPort();
        }
        this.scrolling
            .pipe(unrx(this))
            .subscribe((/**
         * @param {?} isScrolling
         * @return {?}
         */
        isScrolling => {
            this._isScrolling = !!isScrolling;
            if (isScrolling) {
                grid.addClass('pbl-ngrid-scrolling');
            }
            else {
                grid.removeClass('pbl-ngrid-scrolling');
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this.offsetChange$.complete();
        unrx.kill(this);
    }
    /**
     * @param {?} size
     * @return {?}
     */
    setTotalContentSize(size) {
        super.setTotalContentSize(size);
        // TODO(shlomiassaf)[perf, 3]: run this once... (aggregate all calls within the same animation frame)
        requestAnimationFrame((/**
         * @return {?}
         */
        () => {
            this.scrollHeight = this.elementRef.nativeElement.scrollHeight; //size;
            this.updateFiller();
            // We must trigger a change detection cycle because the filler div element is updated through bindings
            this.cdr.markForCheck();
        }));
    }
    /**
     * @return {?}
     */
    checkViewportSize() {
        // TODO: Check for changes in `CdkVirtualScrollViewport` source code, when resizing is handled!
        // see https://github.com/angular/material2/blob/28fb3abe77c5336e4739c820584ec99c23f1ae38/src/cdk/scrolling/virtual-scroll-viewport.ts#L341
        /** @type {?} */
        const prev = this.getViewportSize();
        super.checkViewportSize();
        if (prev !== this.getViewportSize()) {
            this.updateFiller();
        }
    }
    /**
     * Measure the combined size of all of the rendered items.
     * @return {?}
     */
    measureRenderedContentSize() {
        /** @type {?} */
        let size = super.measureRenderedContentSize();
        if (this.orientation === 'vertical') {
            size -= this.stickyRowHeaderContainer.offsetHeight + this.stickyRowFooterContainer.offsetHeight;
            // Compensate for hz scroll bar, if exists, only in non virtual scroll mode.
            if (!this.enabled) {
                size += this.outerHeight - this.innerHeight;
            }
        }
        return this.ngeRenderedContentSize = size;
    }
    /**
     * @private
     * @return {?}
     */
    updateFiller() {
        this.measureRenderedContentSize();
        if (this.grid.noFiller) {
            this.pblFillerHeight = undefined;
        }
        else {
            this.pblFillerHeight = this.getViewportSize() >= this.ngeRenderedContentSize ?
                `calc(100% - ${this.ngeRenderedContentSize}px)`
                : undefined;
        }
    }
    /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    onSourceLengthChange(prev, curr) {
        this.checkViewportSize();
        this.updateFiller();
    }
    /**
     * @param {?} forOf
     * @return {?}
     */
    attach(forOf) {
        super.attach(forOf);
        /** @type {?} */
        const scrollStrategy = this.pblScrollStrategy instanceof PblCdkVirtualScrollDirective
            ? this.pblScrollStrategy._scrollStrategy
            : this.pblScrollStrategy;
        if (scrollStrategy instanceof TableAutoSizeVirtualScrollStrategy) {
            scrollStrategy.averager.setRowInfo(forOf);
        }
    }
    /**
     * @param {?} offset
     * @param {?=} to
     * @return {?}
     */
    setRenderedContentOffset(offset, to = 'to-start') {
        super.setRenderedContentOffset(offset, to);
        if (this.enabled) {
            if (this.offset !== offset) {
                this.offset = offset;
                if (!this.isCDPending) {
                    this.isCDPending = true;
                    /** @type {?} */
                    const syncTransform = (/**
                     * @return {?}
                     */
                    () => { });
                    this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    () => Promise.resolve()
                        .then((/**
                     * @return {?}
                     */
                    () => syncTransform()))
                        .then((/**
                     * @return {?}
                     */
                    () => {
                        this.isCDPending = false;
                        this.offsetChange$.next(this.offset);
                    }))));
                }
            }
        }
    }
    /**
     * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
     * @private
     * @return {?}
     */
    initScrollWatcher() {
        /** @type {?} */
        let scrolling = 0;
        /** @type {?} */
        let lastOffset = this.measureScrollOffset();
        this.elementScrolled()
            .subscribe((/**
         * @return {?}
         */
        () => {
            /*  `scrolling` is a boolean flag that turns on with the first `scroll` events and ends after 2 browser animation frames have passed without a `scroll` event.
                This is an attempt to detect a scroll end event, which does not exist.
    
                `scrollFrameRate` is a number that represent a rough estimation of the frame rate by measuring the time passed between each request animation frame
                while the `scrolling` state is true. The frame rate value is the average frame rate from all measurements since the scrolling began.
                To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
                This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
    
            */
            if (scrolling === 0) {
                /*  The measure array holds values required for frame rate measurements.
                              [0] Storage for last timestamp taken
                              [1] The sum of all measurements taken (a measurement is the time between 2 snapshots)
                              [2] The count of all measurements
                              [3] The sum of all measurements taken WITHIN the current buffer window. This buffer is flushed into [1] every X ms (see buggerWindow const).
                          */
                /** @type {?} */
                const bufferWindow = 499;
                /** @type {?} */
                const measure = [performance.now(), 0, 0, 0];
                /** @type {?} */
                const offset = this.measureScrollOffset();
                if (lastOffset === offset) {
                    return;
                }
                /** @type {?} */
                const delta = lastOffset < offset ? 1 : -1;
                this.scrolling.next(delta);
                /** @type {?} */
                const raf = (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const time = -measure[0] + (measure[0] = performance.now());
                    if (time > 5) {
                        measure[1] += time;
                        measure[2] += 1;
                    }
                    if (scrolling === -1) {
                        scrolling = 0;
                        lastOffset = this.measureScrollOffset();
                        this.scrolling.next(0);
                    }
                    else {
                        if (measure[1] > bufferWindow) {
                            measure[3] += measure[1];
                            measure[1] = 0;
                            this.scrollFrameRate.emit(1000 / (measure[3] / measure[2]));
                        }
                        scrolling = scrolling === 1 ? -1 : 1;
                        requestAnimationFrame(raf);
                    }
                });
                requestAnimationFrame(raf);
            }
            scrolling++;
        }));
    }
}
PblCdkVirtualScrollViewportComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-cdk-virtual-scroll-viewport',
                template: "<p class=\"cdk-virtual-scroll-inner-width\"></p>\n<ng-content select=\".cdk-virtual-scroll-before-content-wrapper\"></ng-content>\n<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper [class.cdk-virtual-scroll-content-wrapper]=\"enabled\" style=\"width: 100%\" [style.minWidth.px]=\"_minWidth$ | async\">\n  <ng-content></ng-content>\n</div>\n\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div *ngIf=\"enabled\" class=\"cdk-virtual-scroll-spacer\"\n     [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"\n     [style.transform]=\"_totalContentSizeTransform\"></div>\n<div *ngIf=\"pblFillerHeight && enabled\"\n    class=\"pbl-ngrid-space-fill\"\n    [style.minWidth.px]=\"_minWidth$ | async\"\n    [style.top.px]=\"ngeRenderedContentSize\"\n    [style.height]=\"pblFillerHeight\"></div>\n",
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    class: 'cdk-virtual-scroll-viewport',
                    '[class.cdk-virtual-scroll-disabled]': '!enabled',
                    '[class.cdk-virtual-scroll-orientation-horizontal]': 'orientation === "horizontal"',
                    '[class.cdk-virtual-scroll-orientation-vertical]': 'orientation === "vertical"'
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["pbl-cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-inner-width{width:100%;height:100%;position:absolute;margin:0!important;padding:0!important}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;transform-origin:100% 0}.pbl-ngrid-space-fill{position:absolute;left:0;width:100%}"]
            }] }
];
/** @nocollapse */
PblCdkVirtualScrollViewportComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: PblNgridConfigService },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [VIRTUAL_SCROLL_STRATEGY,] }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: ScrollDispatcher },
    { type: PblNgridPluginController },
    { type: PblNgridComponent }
];
PblCdkVirtualScrollViewportComponent.propDecorators = {
    stickyRowHeaderContainer: [{ type: Input }],
    stickyRowFooterContainer: [{ type: Input }],
    scrolling: [{ type: Output }],
    scrollFrameRate: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.enabled;
    /**
     * Emits the offset (in pixels) of the rendered content every time it changes.
     * The emission is done OUTSIDE of angular (i.e. no change detection cycle is triggered).
     *
     * Note that when not enabled (i.e `NoVirtualScrollStrategy` is used) there are no emissions.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.offsetChange;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.stickyRowHeaderContainer;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.stickyRowFooterContainer;
    /**
     * Event emitted when the scrolling state of rows in the grid changes.
     * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
     *
     * The grid is in "scrolling" state from the first scroll event and until 2 animation frames
     * have passed without a scroll event.
     *
     * When scrolling, the emitted value is the direction: -1 or 1
     * When not scrolling, the emitted value is 0.
     *
     * NOTE: This event runs outside the angular zone.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.scrolling;
    /**
     * Emits an estimation of the current frame rate while scrolling, in a 500ms interval.
     *
     * The frame rate value is the average frame rate from all measurements since the scrolling began.
     * To estimate the frame rate, a significant number of measurements is required so value is emitted every 500 ms.
     * This means that a single scroll or short scroll bursts will not result in a `scrollFrameRate` emissions.
     *
     * Valid on when virtual scrolling is enabled.
     *
     * NOTE: This event runs outside the angular zone.
     *
     * In the future the measurement logic might be replaced with the Frame Timing API
     * See:
     * - https://developers.google.com/web/updates/2014/11/frame-timing-api
     * - https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
     * - https://github.com/googlearchive/frame-timing-polyfill/wiki/Explainer
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.scrollFrameRate;
    /**
     * The `scrollHeight` of the virtual scroll viewport.
     * The `scrollHeight` is updated by the virtual scroll (update logic and frequency depends on the strategy implementation) through
     * the `setTotalContentSize(size)` method. The input size is used to position a dummy spacer element at a position that mimics the `scrollHeight`.
     *
     * In theory, the size sent to `setTotalContentSize` should equal the `scrollHeight` value, once the browser update's the layout.
     * In reality it does not happen, sometimes they are not equal. Setting a size will result in a different `scrollHeight`.
     * This might be due to changes in measurements when handling sticky meta rows (moving back and forth)
     *
     * Because the position of the dummy spacer element is set through DI the layout will run in the next micro-task after the call to `setTotalContentSize`.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.scrollHeight;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.ngeRenderedContentSize;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.pblFillerHeight;
    /**
     * A string representing the `style.width` property value to be used for the spacer element.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype._totalContentWidth;
    /**
     * A string representing the `style.height` property value to be used for the spacer element.
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype._totalContentHeight;
    /**
     * The transform used to scale the spacer to the same size as all content, including content that
     * is not currently rendered.
     * @deprecated
     * @type {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype._totalContentSizeTransform;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype._minWidth$;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.offsetChange$;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.offset;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.isCDPending;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype._isScrolling;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.wheelModeDefault;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.cdr;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.pblScrollStrategy;
    /**
     * @type {?}
     * @private
     */
    PblCdkVirtualScrollViewportComponent.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUVMLFNBQVMsRUFDVCx1QkFBdUIsRUFDdkIsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsTUFBTSxFQUNOLE1BQU0sRUFDTixRQUFRLEdBR1QsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsdUJBQXVCLEVBRXZCLGdCQUFnQixFQUVoQixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSx1QkFBdUIsRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBWXpILFNBQVMscUJBQXFCLENBQUMsTUFBNkIsRUFBRSxjQUFzQztJQUNsRyxJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQUU7O2NBQzVDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxH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Qy9DLHdFQUErQzs7Ozs7Ozs7Ozs7Ozs7SUFjL0MseURBQXVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUJ2RCwrREFBdUQ7Ozs7Ozs7Ozs7Ozs7SUFhdkQsNERBQWlCOztJQUVqQixzRUFBMkI7O0lBQzNCLCtEQUF3Qjs7Ozs7SUErQnRCLGtFQUF3Qjs7Ozs7SUFFekIsbUVBQXlCOzs7Ozs7O0lBTTFCLDBFQUFnQzs7SUFHaEMsMERBQXdDOzs7OztJQUV4Qyw2REFBOEM7Ozs7O0lBQzlDLHNEQUF1Qjs7Ozs7SUFDdkIsMkRBQTZCOzs7OztJQUM3Qiw0REFBNkI7Ozs7O0lBRTdCLGdFQUFxRTs7Ozs7SUFHekQsbURBQThCOztJQUc5QixpRUFBNEY7Ozs7O0lBSTVGLG9EQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBPcHRpb25hbCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCxcbiAgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gIFZpcnR1YWxTY3JvbGxTdHJhdGVneSxcbiAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgQ2RrVmlydHVhbEZvck9mLFxuICBDZGtTY3JvbGxhYmxlLFxufSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgdW5yeCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xuaW1wb3J0IHsgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtZm9yLW9mJztcblxuZGVjbGFyZSBtb2R1bGUgJy4uLy4uL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHZpcnR1YWxTY3JvbGw/OiB7XG4gICAgICB3aGVlbE1vZGU/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcbiAgICAgIGRlZmF1bHRTdHJhdGVneT8oKTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIHNjcm9sbFN0cmF0ZWd5PzogVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgaWYgKCFzY3JvbGxTdHJhdGVneSAmJiBjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsQ29uZmlnID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpO1xuICAgIGlmICh0eXBlb2YgdmlydHVhbFNjcm9sbENvbmZpZy5kZWZhdWx0U3RyYXRlZ3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNjcm9sbFN0cmF0ZWd5ID0gdmlydHVhbFNjcm9sbENvbmZpZy5kZWZhdWx0U3RyYXRlZ3koKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2Nyb2xsU3RyYXRlZ3kgfHwgbmV3IFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3koMTAwLCAyMDApO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICd2aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuc2NzcycgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIGNsYXNzOiAnY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1kaXNhYmxlZF0nOiAnIWVuYWJsZWQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWxdJzogJ29yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24tdmVydGljYWxdJzogJ29yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCInXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCBleHRlbmRzIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBnZXQgaXNTY3JvbGxpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc1Njcm9sbGluZzsgfVxuICByZWFkb25seSBlbmFibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgb2Zmc2V0IChpbiBwaXhlbHMpIG9mIHRoZSByZW5kZXJlZCBjb250ZW50IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlcy5cbiAgICogVGhlIGVtaXNzaW9uIGlzIGRvbmUgT1VUU0lERSBvZiBhbmd1bGFyIChpLmUuIG5vIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgaXMgdHJpZ2dlcmVkKS5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gbm90IGVuYWJsZWQgKGkuZSBgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgIGlzIHVzZWQpIHRoZXJlIGFyZSBubyBlbWlzc2lvbnMuXG4gICAqL1xuICByZWFkb25seSBvZmZzZXRDaGFuZ2U6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBASW5wdXQoKSBzdGlja3lSb3dIZWFkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBzdGlja3lSb3dGb290ZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbGluZyBzdGF0ZSBvZiByb3dzIGluIHRoZSBncmlkIGNoYW5nZXMuXG4gICAqIFdoZW4gc2Nyb2xsaW5nIHN0YXJ0cyBgdHJ1ZWAgaXMgZW1pdHRlZCBhbmQgd2hlbiB0aGUgc2Nyb2xsaW5nIGVuZHMgYGZhbHNlYCBpcyBlbWl0dGVkLlxuICAgKlxuICAgKiBUaGUgZ3JpZCBpcyBpbiBcInNjcm9sbGluZ1wiIHN0YXRlIGZyb20gdGhlIGZpcnN0IHNjcm9sbCBldmVudCBhbmQgdW50aWwgMiBhbmltYXRpb24gZnJhbWVzXG4gICAqIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBzY3JvbGwgZXZlbnQuXG4gICAqXG4gICAqIFdoZW4gc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyB0aGUgZGlyZWN0aW9uOiAtMSBvciAxXG4gICAqIFdoZW4gbm90IHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgMC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPCAtMSB8IDAgfCAxID4oKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgY3VycmVudCBmcmFtZSByYXRlIHdoaWxlIHNjcm9sbGluZywgaW4gYSA1MDBtcyBpbnRlcnZhbC5cbiAgICpcbiAgICogVGhlIGZyYW1lIHJhdGUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2UgZnJhbWUgcmF0ZSBmcm9tIGFsbCBtZWFzdXJlbWVudHMgc2luY2UgdGhlIHNjcm9sbGluZyBiZWdhbi5cbiAgICogVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cbiAgICogVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cbiAgICpcbiAgICogVmFsaWQgb24gd2hlbiB2aXJ0dWFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKlxuICAgKiBJbiB0aGUgZnV0dXJlIHRoZSBtZWFzdXJlbWVudCBsb2dpYyBtaWdodCBiZSByZXBsYWNlZCB3aXRoIHRoZSBGcmFtZSBUaW1pbmcgQVBJXG4gICAqIFNlZTpcbiAgICogLSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdXBkYXRlcy8yMDE0LzExL2ZyYW1lLXRpbWluZy1hcGlcbiAgICogLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUGVyZm9ybWFuY2VPYnNlcnZlclxuICAgKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVhcmNoaXZlL2ZyYW1lLXRpbWluZy1wb2x5ZmlsbC93aWtpL0V4cGxhaW5lclxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbEZyYW1lUmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgb2YgdGhlIHZpcnR1YWwgc2Nyb2xsIHZpZXdwb3J0LlxuICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgaXMgdXBkYXRlZCBieSB0aGUgdmlydHVhbCBzY3JvbGwgKHVwZGF0ZSBsb2dpYyBhbmQgZnJlcXVlbmN5IGRlcGVuZHMgb24gdGhlIHN0cmF0ZWd5IGltcGxlbWVudGF0aW9uKSB0aHJvdWdoXG4gICAqIHRoZSBgc2V0VG90YWxDb250ZW50U2l6ZShzaXplKWAgbWV0aG9kLiBUaGUgaW5wdXQgc2l6ZSBpcyB1c2VkIHRvIHBvc2l0aW9uIGEgZHVtbXkgc3BhY2VyIGVsZW1lbnQgYXQgYSBwb3NpdGlvbiB0aGF0IG1pbWljcyB0aGUgYHNjcm9sbEhlaWdodGAuXG4gICAqXG4gICAqIEluIHRoZW9yeSwgdGhlIHNpemUgc2VudCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAgc2hvdWxkIGVxdWFsIHRoZSBgc2Nyb2xsSGVpZ2h0YCB2YWx1ZSwgb25jZSB0aGUgYnJvd3NlciB1cGRhdGUncyB0aGUgbGF5b3V0LlxuICAgKiBJbiByZWFsaXR5IGl0IGRvZXMgbm90IGhhcHBlbiwgc29tZXRpbWVzIHRoZXkgYXJlIG5vdCBlcXVhbC4gU2V0dGluZyBhIHNpemUgd2lsbCByZXN1bHQgaW4gYSBkaWZmZXJlbnQgYHNjcm9sbEhlaWdodGAuXG4gICAqIFRoaXMgbWlnaHQgYmUgZHVlIHRvIGNoYW5nZXMgaW4gbWVhc3VyZW1lbnRzIHdoZW4gaGFuZGxpbmcgc3RpY2t5IG1ldGEgcm93cyAobW92aW5nIGJhY2sgYW5kIGZvcnRoKVxuICAgKlxuICAgKiBCZWNhdXNlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZHVtbXkgc3BhY2VyIGVsZW1lbnQgaXMgc2V0IHRocm91Z2ggREkgdGhlIGxheW91dCB3aWxsIHJ1biBpbiB0aGUgbmV4dCBtaWNyby10YXNrIGFmdGVyIHRoZSBjYWxsIHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYC5cbiAgICovXG4gIHNjcm9sbEhlaWdodCA9IDA7XG5cbiAgbmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IDA7XG4gIHBibEZpbGxlckhlaWdodDogc3RyaW5nO1xuXG4gIGdldCB3aGVlbE1vZGUoKTogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ10ge1xuICAgIHJldHVybiAodGhpcy5wYmxTY3JvbGxTdHJhdGVneSBhcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlKS53aGVlbE1vZGUgfHwgdGhpcy53aGVlbE1vZGVEZWZhdWx0IHx8ICdwYXNzaXZlJztcbiAgfVxuXG4gIGdldCBpbm5lcldpZHRoKCk6IG51bWJlciB7XG4gICAgY29uc3QgaW5uZXJXaWR0aEhlbHBlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZGstdmlydHVhbC1zY3JvbGwtaW5uZXItd2lkdGgnKSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gaW5uZXJXaWR0aEhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBvdXRlcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG5cbiAgZ2V0IGlubmVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgY29uc3QgaW5uZXJXaWR0aEhlbHBlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZGstdmlydHVhbC1zY3JvbGwtaW5uZXItd2lkdGgnKSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gaW5uZXJXaWR0aEhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICBnZXQgb3V0ZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0IHNjcm9sbFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuICB9XG5cbiAgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgd2hlbiBub3Qgc3VwcG9ydGluZyA4LjEuMiBhbmQgYmVsb3dcbiAgLy8vIENPTVBBVElCSUxJVFkgOC4xLjItIDwtPiA4LjEuMytcbiAgICAvKiogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBgc3R5bGUud2lkdGhgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cbiAgICBfdG90YWxDb250ZW50V2lkdGggPSAnJztcbiAgICAvKiogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBgc3R5bGUuaGVpZ2h0YCBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB1c2VkIGZvciB0aGUgc3BhY2VyIGVsZW1lbnQuICovXG4gICBfdG90YWxDb250ZW50SGVpZ2h0ID0gJyc7XG4gICAgLyoqXG4gICAqIFRoZSB0cmFuc2Zvcm0gdXNlZCB0byBzY2FsZSB0aGUgc3BhY2VyIHRvIHRoZSBzYW1lIHNpemUgYXMgYWxsIGNvbnRlbnQsIGluY2x1ZGluZyBjb250ZW50IHRoYXRcbiAgICogaXMgbm90IGN1cnJlbnRseSByZW5kZXJlZC5cbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIF90b3RhbENvbnRlbnRTaXplVHJhbnNmb3JtID0gJyc7XG4gLy8vIENPTVBBVElCSUxJVFkgOC4xLjItIDwtPiA4LjEuMytcblxuICByZWFkb25seSBfbWluV2lkdGgkOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBvZmZzZXRDaGFuZ2UkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICBwcml2YXRlIG9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIGlzQ0RQZW5kaW5nOiBib29sZWFuO1xuICBwcml2YXRlIF9pc1Njcm9sbGluZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgd2hlZWxNb2RlRGVmYXVsdDogIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSkgcHVibGljIHBibFNjcm9sbFN0cmF0ZWd5OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZixcbiAgICAgICAgICBjZHIsXG4gICAgICAgICAgbmdab25lLFxuICAgICAgICAgIHBibFNjcm9sbFN0cmF0ZWd5ID0gcmVzb2x2ZVNjcm9sbFN0cmF0ZWd5KGNvbmZpZywgcGJsU2Nyb2xsU3RyYXRlZ3kpLFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyKTtcblxuICAgIGlmIChjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICAgIHRoaXMud2hlZWxNb2RlRGVmYXVsdCA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKS53aGVlbE1vZGU7XG4gICAgfVxuICAgIGNvbmZpZy5vblVwZGF0ZSgndmlydHVhbFNjcm9sbCcpLnBpcGUodW5yeCh0aGlzKSkuc3Vic2NyaWJlKCBjaGFuZ2UgPT4gdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY2hhbmdlLmN1cnIud2hlZWxNb2RlKTtcblxuICAgIGlmIChwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHBibFNjcm9sbFN0cmF0ZWd5LnR5cGUgIT09ICd2U2Nyb2xsTm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9ICEocGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSk7XG4gICAgfVxuICAgIHBsdWdpbkN0cmwuZXh0QXBpLnNldFZpZXdwb3J0KHRoaXMpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlID0gdGhpcy5vZmZzZXRDaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5fbWluV2lkdGgkID0gZ3JpZC5jb2x1bW5BcGkudG90YWxDb2x1bW5XaWR0aENoYW5nZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENka1Njcm9sbGFibGUucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCAoKSA9PiB0aGlzLmluaXRTY3JvbGxXYXRjaGVyKCkgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBJZiB2aXJ0dWFsIHNjcm9sbCBpcyBkaXNhYmxlZCAoYE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5YCkgd2UgbmVlZCB0byBkaXNhYmxlIGFueSBlZmZlY3QgYXBwbGllZFxuICAgIC8vIGJ5IHRoZSB2aWV3cG9ydCwgd3JhcHBpbmcgdGhlIGNvbnRlbnQgaW5qZWN0ZWQgdG8gaXQuXG4gICAgLy8gVGhlIG1haW4gZWZmZWN0IGlzIHRoZSBncmlkIGhhdmluZyBoZWlnaHQgMCBhdCBhbGwgdGltZXMsIHVubGVzcyB0aGUgaGVpZ2h0IGlzIGV4cGxpY2l0bHkgc2V0LlxuICAgIC8vIFRoaXMgaGFwcGVucyBiZWNhdXNlIHRoZSBjb250ZW50IHRha2luZyBvdXQgb2YgdGhlIGxheW91dCwgd3JhcHBlZCBpbiBhYnNvbHV0ZSBwb3NpdGlvbmluZy5cbiAgICAvLyBBZGRpdGlvbmFsbHksIHRoZSBob3N0IGl0c2VsZiAodmlld3BvcnQpIGlzIHNldCB0byBjb250YWluOiBzdHJpY3QuXG4gICAgY29uc3QgeyBncmlkIH0gPSB0aGlzO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGdyaWQuX2Nka1RhYmxlLmF0dGFjaFZpZXdQb3J0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zY3JvbGxpbmdcbiAgICAgIC5waXBlKHVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBpc1Njcm9sbGluZyA9PiB7XG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gISFpc1Njcm9sbGluZztcbiAgICAgICAgaWYgKGlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgZ3JpZC5hZGRDbGFzcygncGJsLW5ncmlkLXNjcm9sbGluZycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyaWQucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5jb21wbGV0ZSgpO1xuICAgIHVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHNldFRvdGFsQ29udGVudFNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIuc2V0VG90YWxDb250ZW50U2l6ZShzaXplKTtcblxuICAgIC8vIFRPRE8oc2hsb21pYXNzYWYpW3BlcmYsIDNdOiBydW4gdGhpcyBvbmNlLi4uIChhZ2dyZWdhdGUgYWxsIGNhbGxzIHdpdGhpbiB0aGUgc2FtZSBhbmltYXRpb24gZnJhbWUpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0OyAvL3NpemU7XG4gICAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICAgICAgLy8gV2UgbXVzdCB0cmlnZ2VyIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBiZWNhdXNlIHRoZSBmaWxsZXIgZGl2IGVsZW1lbnQgaXMgdXBkYXRlZCB0aHJvdWdoIGJpbmRpbmdzXG4gICAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9KVxuICB9XG5cbiAgY2hlY2tWaWV3cG9ydFNpemUoKSB7XG4gICAgLy8gVE9ETzogQ2hlY2sgZm9yIGNoYW5nZXMgaW4gYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydGAgc291cmNlIGNvZGUsIHdoZW4gcmVzaXppbmcgaXMgaGFuZGxlZCFcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvMjhmYjNhYmU3N2M1MzM2ZTQ3MzljODIwNTg0ZWM5OWMyM2YxYWUzOC9zcmMvY2RrL3Njcm9sbGluZy92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC50cyNMMzQxXG4gICAgY29uc3QgcHJldiA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCk7XG4gICAgc3VwZXIuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICBpZiAocHJldiAhPT0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKSkge1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWVhc3VyZSB0aGUgY29tYmluZWQgc2l6ZSBvZiBhbGwgb2YgdGhlIHJlbmRlcmVkIGl0ZW1zLiAqL1xuICBtZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpOiBudW1iZXIge1xuICAgIGxldCBzaXplID0gc3VwZXIubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTtcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgc2l6ZSAtPSB0aGlzLnN0aWNreVJvd0hlYWRlckNvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyB0aGlzLnN0aWNreVJvd0Zvb3RlckNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIC8vIENvbXBlbnNhdGUgZm9yIGh6IHNjcm9sbCBiYXIsIGlmIGV4aXN0cywgb25seSBpbiBub24gdmlydHVhbCBzY3JvbGwgbW9kZS5cbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgIHNpemUgKz0gdGhpcy5vdXRlckhlaWdodCAtIHRoaXMuaW5uZXJIZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5nZVJlbmRlcmVkQ29udGVudFNpemUgPSBzaXplO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGaWxsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLmdyaWQubm9GaWxsZXIpIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkgPj0gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID9cbiAgICAgICAgYGNhbGMoMTAwJSAtICR7dGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplfXB4KWBcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUxlbmd0aENoYW5nZShwcmV2OiBudW1iZXIsIGN1cnI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICB9XG5cbiAgYXR0YWNoKGZvck9mOiBDZGtWaXJ0dWFsRm9yT2Y8YW55PiAmIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pIHtcbiAgICBzdXBlci5hdHRhY2goZm9yT2YpO1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5wYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVcbiAgICAgID8gdGhpcy5wYmxTY3JvbGxTdHJhdGVneS5fc2Nyb2xsU3RyYXRlZ3lcbiAgICAgIDogdGhpcy5wYmxTY3JvbGxTdHJhdGVneVxuICAgIDtcbiAgICBpZiAoc2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KSB7XG4gICAgICBzY3JvbGxTdHJhdGVneS5hdmVyYWdlci5zZXRSb3dJbmZvKGZvck9mKTtcbiAgICB9XG4gIH1cblxuICBzZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0OiBudW1iZXIsIHRvOiAndG8tc3RhcnQnIHwgJ3RvLWVuZCcgPSAndG8tc3RhcnQnKSB7XG4gICAgc3VwZXIuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldCwgdG8pO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLm9mZnNldCAhPT0gb2Zmc2V0KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMuaXNDRFBlbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHN5bmNUcmFuc2Zvcm0gPSAoKSA9PiB7IH07XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHN5bmNUcmFuc2Zvcm0oKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5uZXh0KHRoaXMub2Zmc2V0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBzY3JvbGxpbmcgd2F0Y2hlciB3aGljaCB0cmFjayBzY3JvbGwgZXZlbnRzIGFuIGVtaXRzIGBzY3JvbGxpbmdgIGFuZCBgc2Nyb2xsRnJhbWVSYXRlYCBldmVudHMuXG4gICAqL1xuICBwcml2YXRlIGluaXRTY3JvbGxXYXRjaGVyKCk6IHZvaWQge1xuICAgIGxldCBzY3JvbGxpbmcgPSAwO1xuICAgIGxldCBsYXN0T2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgdGhpcy5lbGVtZW50U2Nyb2xsZWQoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8qICBgc2Nyb2xsaW5nYCBpcyBhIGJvb2xlYW4gZmxhZyB0aGF0IHR1cm5zIG9uIHdpdGggdGhlIGZpcnN0IGBzY3JvbGxgIGV2ZW50cyBhbmQgZW5kcyBhZnRlciAyIGJyb3dzZXIgYW5pbWF0aW9uIGZyYW1lcyBoYXZlIHBhc3NlZCB3aXRob3V0IGEgYHNjcm9sbGAgZXZlbnQuXG4gICAgICAgICAgICBUaGlzIGlzIGFuIGF0dGVtcHQgdG8gZGV0ZWN0IGEgc2Nyb2xsIGVuZCBldmVudCwgd2hpY2ggZG9lcyBub3QgZXhpc3QuXG5cbiAgICAgICAgICAgIGBzY3JvbGxGcmFtZVJhdGVgIGlzIGEgbnVtYmVyIHRoYXQgcmVwcmVzZW50IGEgcm91Z2ggZXN0aW1hdGlvbiBvZiB0aGUgZnJhbWUgcmF0ZSBieSBtZWFzdXJpbmcgdGhlIHRpbWUgcGFzc2VkIGJldHdlZW4gZWFjaCByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgd2hpbGUgdGhlIGBzY3JvbGxpbmdgIHN0YXRlIGlzIHRydWUuIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAgICAgICAgICBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgICAgICAgICAgVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cblxuICAgICAgICAqL1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID09PSAwKSB7XG4gICAgICAgICAgLyogIFRoZSBtZWFzdXJlIGFycmF5IGhvbGRzIHZhbHVlcyByZXF1aXJlZCBmb3IgZnJhbWUgcmF0ZSBtZWFzdXJlbWVudHMuXG4gICAgICAgICAgICAgIFswXSBTdG9yYWdlIGZvciBsYXN0IHRpbWVzdGFtcCB0YWtlblxuICAgICAgICAgICAgICBbMV0gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIChhIG1lYXN1cmVtZW50IGlzIHRoZSB0aW1lIGJldHdlZW4gMiBzbmFwc2hvdHMpXG4gICAgICAgICAgICAgIFsyXSBUaGUgY291bnQgb2YgYWxsIG1lYXN1cmVtZW50c1xuICAgICAgICAgICAgICBbM10gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIFdJVEhJTiB0aGUgY3VycmVudCBidWZmZXIgd2luZG93LiBUaGlzIGJ1ZmZlciBpcyBmbHVzaGVkIGludG8gWzFdIGV2ZXJ5IFggbXMgKHNlZSBidWdnZXJXaW5kb3cgY29uc3QpLlxuICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgYnVmZmVyV2luZG93ID0gNDk5O1xuICAgICAgICAgIGNvbnN0IG1lYXN1cmUgPSBbIHBlcmZvcm1hbmNlLm5vdygpLCAwLCAwLCAwIF07XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgaWYgKGxhc3RPZmZzZXQgPT09IG9mZnNldCkgeyByZXR1cm47IH1cbiAgICAgICAgICBjb25zdCBkZWx0YSA9IGxhc3RPZmZzZXQgPCBvZmZzZXQgPyAxIDogLTE7XG5cbiAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KGRlbHRhKTtcblxuICAgICAgICAgIGNvbnN0IHJhZiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSAtbWVhc3VyZVswXSArIChtZWFzdXJlWzBdID0gcGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiA1KSB7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMV0gKz0gdGltZTtcbiAgICAgICAgICAgICAgbWVhc3VyZVsyXSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gMDtcbiAgICAgICAgICAgICAgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtZWFzdXJlWzFdID4gYnVmZmVyV2luZG93KSB7XG4gICAgICAgICAgICAgICAgbWVhc3VyZVszXSArPSBtZWFzdXJlWzFdO1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbMV0gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRnJhbWVSYXRlLmVtaXQoMTAwMCAvIChtZWFzdXJlWzNdL21lYXN1cmVbMl0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY3JvbGxpbmcgPSBzY3JvbGxpbmcgPT09IDEgPyAtMSA6IDE7XG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsaW5nKys7XG4gICAgICB9KTtcbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBDU1NTdHlsZURlY2xhcmF0aW9uIHtcbiAgICBjb250YWluOiAnbm9uZScgfCAnc3RyaWN0JyB8ICdjb250ZW50JyB8ICdzaXplJyB8ICdsYXlvdXQnIHwgJ3N0eWxlJyB8ICdwYWludCcgfCAnaW5oZXJpdCcgfCAnaW5pdGlhbCcgfCAndW5zZXQnO1xuICB9XG59XG4iXX0=