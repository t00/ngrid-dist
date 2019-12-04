/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { AfterViewInit, Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, Input, ChangeDetectorRef, ViewEncapsulation, NgZone, Output, Optional, OnInit, OnDestroy, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY, VirtualScrollStrategy, ScrollDispatcher, CdkVirtualForOf, CdkScrollable, } from '@angular/cdk/scrolling';
import { UnRx } from '@pebula/utils';
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
let PblCdkVirtualScrollViewportComponent = class PblCdkVirtualScrollViewportComponent extends CdkVirtualScrollViewport {
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
        config.onUpdate('virtualScroll').pipe(UnRx(this)).subscribe((/**
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
            .pipe(UnRx(this))
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
};
PblCdkVirtualScrollViewportComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: PblNgridConfigService },
    { type: undefined },
    { type: Directionality },
    { type: ScrollDispatcher },
    { type: PblNgridPluginController },
    { type: PblNgridComponent }
];
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
                styles: ["pbl-cdk-virtual-scroll-viewport{display:block;position:relative;overflow:auto;contain:strict;-webkit-transform:translateZ(0);transform:translateZ(0);will-change:scroll-position;-webkit-overflow-scrolling:touch}pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{position:absolute;top:0;left:0;contain:content}[dir=rtl] pbl-cdk-virtual-scroll-viewport .cdk-virtual-scroll-content-wrapper{right:0;left:auto}.cdk-virtual-scroll-inner-width{width:100%;height:100%;position:absolute;margin:0!important;padding:0!important}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper{min-height:100%}.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-left:0;padding-right:0;margin-left:0;margin-right:0;border-left-width:0;border-right-width:0;outline:0}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper{min-width:100%}.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>dl:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ol:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>table:not([cdkVirtualFor]),.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper>ul:not([cdkVirtualFor]){padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;border-top-width:0;border-bottom-width:0;outline:0}.cdk-virtual-scroll-spacer{position:absolute;top:0;left:0;height:1px;width:1px;-webkit-transform-origin:0 0;transform-origin:0 0}[dir=rtl] .cdk-virtual-scroll-spacer{right:0;left:auto;-webkit-transform-origin:100% 0;transform-origin:100% 0}.pbl-ngrid-space-fill{position:absolute;left:0;width:100%}"]
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
PblCdkVirtualScrollViewportComponent = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [ElementRef,
        ChangeDetectorRef,
        NgZone,
        PblNgridConfigService, Object, Directionality,
        ScrollDispatcher,
        PblNgridPluginController,
        PblNgridComponent])
], PblCdkVirtualScrollViewportComponent);
export { PblCdkVirtualScrollViewportComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGFBQWEsR0FDZCxNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLGtDQUFrQyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFZekgsU0FBUyxxQkFBcUIsQ0FBQyxNQUE2QixFQUFFLGNBQXNDO0lBQ2xHLElBQUksQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLEdB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VCx3QkFBd0I7WUFFeEIsaUJBQWlCOzs7dUNBbUR2QixLQUFLO3VDQUNMLEtBQUs7d0JBY0wsTUFBTTs4QkFtQk4sTUFBTTs7QUEvQ0ksb0NBQW9DO0lBRGhELElBQUksRUFBRTs2Q0FtSG1CLFVBQVU7UUFDVCxpQkFBaUI7UUFDdEIsTUFBTTtRQUNOLHFCQUFxQixVQUVaLGNBQWM7UUFDYixnQkFBZ0I7UUFDdEIsd0JBQXdCO1FBQ3RCLGlCQUFpQjtHQTFIaEMsb0NBQW9DLENBdVVoRDtTQXZVWSxvQ0FBb0M7OztJQUcvQyx1REFBMEI7Ozs7Ozs7O0lBUTFCLDREQUEwQzs7SUFFMUMsd0VBQStDOztJQUMvQyx3RUFBK0M7Ozs7Ozs7Ozs7Ozs7O0lBYy9DLHlEQUF1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CdkQsK0RBQXVEOzs7Ozs7Ozs7Ozs7O0lBYXZELDREQUFpQjs7SUFFakIsc0VBQTJCOztJQUMzQiwrREFBd0I7Ozs7O0lBK0J0QixrRUFBd0I7Ozs7O0lBRXpCLG1FQUF5Qjs7Ozs7OztJQU0xQiwwRUFBZ0M7O0lBR2hDLDBEQUF3Qzs7Ozs7SUFFeEMsNkRBQThDOzs7OztJQUM5QyxzREFBdUI7Ozs7O0lBQ3ZCLDJEQUE2Qjs7Ozs7SUFDN0IsNERBQTZCOzs7OztJQUU3QixnRUFBcUU7Ozs7O0lBR3pELG1EQUE4Qjs7SUFHOUIsaUVBQTRGOzs7OztJQUk1RixvREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgT3B0aW9uYWwsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsXG4gIFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gIFNjcm9sbERpc3BhdGNoZXIsXG4gIENka1ZpcnR1YWxGb3JPZixcbiAgQ2RrU2Nyb2xsYWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLCBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcyc7XG5pbXBvcnQgeyBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuXG5kZWNsYXJlIG1vZHVsZSAnLi4vLi4vc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdmlydHVhbFNjcm9sbD86IHtcbiAgICAgIHdoZWVsTW9kZT86IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuICAgICAgZGVmYXVsdFN0cmF0ZWd5PygpOiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTY3JvbGxTdHJhdGVneShjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSwgc2Nyb2xsU3RyYXRlZ3k/OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpOiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBpZiAoIXNjcm9sbFN0cmF0ZWd5ICYmIGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxDb25maWcgPSBjb25maWcuZ2V0KCd2aXJ0dWFsU2Nyb2xsJyk7XG4gICAgaWYgKHR5cGVvZiB2aXJ0dWFsU2Nyb2xsQ29uZmlnLmRlZmF1bHRTdHJhdGVneSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2Nyb2xsU3RyYXRlZ3kgPSB2aXJ0dWFsU2Nyb2xsQ29uZmlnLmRlZmF1bHRTdHJhdGVneSgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY3JvbGxTdHJhdGVneSB8fCBuZXcgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSgxMDAsIDIwMCk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5zY3NzJyBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLWRpc2FibGVkXSc6ICchZW5hYmxlZCcsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24taG9yaXpvbnRhbF0nOiAnb3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi12ZXJ0aWNhbF0nOiAnb3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIidcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IGV4dGVuZHMgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBpc1Njcm9sbGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzU2Nyb2xsaW5nOyB9XG4gIHJlYWRvbmx5IGVuYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBvZmZzZXQgKGluIHBpeGVscykgb2YgdGhlIHJlbmRlcmVkIGNvbnRlbnQgZXZlcnkgdGltZSBpdCBjaGFuZ2VzLlxuICAgKiBUaGUgZW1pc3Npb24gaXMgZG9uZSBPVVRTSURFIG9mIGFuZ3VsYXIgKGkuZS4gbm8gY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBpcyB0cmlnZ2VyZWQpLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiBub3QgZW5hYmxlZCAoaS5lIGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWAgaXMgdXNlZCkgdGhlcmUgYXJlIG5vIGVtaXNzaW9ucy5cbiAgICovXG4gIHJlYWRvbmx5IG9mZnNldENoYW5nZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIEBJbnB1dCgpIHN0aWNreVJvd0hlYWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIHN0aWNreVJvd0Zvb3RlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2Nyb2xsaW5nIHN0YXRlIG9mIHJvd3MgaW4gdGhlIGdyaWQgY2hhbmdlcy5cbiAgICogV2hlbiBzY3JvbGxpbmcgc3RhcnRzIGB0cnVlYCBpcyBlbWl0dGVkIGFuZCB3aGVuIHRoZSBzY3JvbGxpbmcgZW5kcyBgZmFsc2VgIGlzIGVtaXR0ZWQuXG4gICAqXG4gICAqIFRoZSBncmlkIGlzIGluIFwic2Nyb2xsaW5nXCIgc3RhdGUgZnJvbSB0aGUgZmlyc3Qgc2Nyb2xsIGV2ZW50IGFuZCB1bnRpbCAyIGFuaW1hdGlvbiBmcmFtZXNcbiAgICogaGF2ZSBwYXNzZWQgd2l0aG91dCBhIHNjcm9sbCBldmVudC5cbiAgICpcbiAgICogV2hlbiBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIHRoZSBkaXJlY3Rpb246IC0xIG9yIDFcbiAgICogV2hlbiBub3Qgc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyAwLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8IC0xIHwgMCB8IDEgPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBlc3RpbWF0aW9uIG9mIHRoZSBjdXJyZW50IGZyYW1lIHJhdGUgd2hpbGUgc2Nyb2xsaW5nLCBpbiBhIDUwMG1zIGludGVydmFsLlxuICAgKlxuICAgKiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgKiBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgYSBzaW5nbGUgc2Nyb2xsIG9yIHNob3J0IHNjcm9sbCBidXJzdHMgd2lsbCBub3QgcmVzdWx0IGluIGEgYHNjcm9sbEZyYW1lUmF0ZWAgZW1pc3Npb25zLlxuICAgKlxuICAgKiBWYWxpZCBvbiB3aGVuIHZpcnR1YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIEluIHRoZSBmdXR1cmUgdGhlIG1lYXN1cmVtZW50IGxvZ2ljIG1pZ2h0IGJlIHJlcGxhY2VkIHdpdGggdGhlIEZyYW1lIFRpbWluZyBBUElcbiAgICogU2VlOlxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTQvMTEvZnJhbWUtdGltaW5nLWFwaVxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QZXJmb3JtYW5jZU9ic2VydmVyXG4gICAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZWFyY2hpdmUvZnJhbWUtdGltaW5nLXBvbHlmaWxsL3dpa2kvRXhwbGFpbmVyXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsRnJhbWVSYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBvZiB0aGUgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQuXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBpcyB1cGRhdGVkIGJ5IHRoZSB2aXJ0dWFsIHNjcm9sbCAodXBkYXRlIGxvZ2ljIGFuZCBmcmVxdWVuY3kgZGVwZW5kcyBvbiB0aGUgc3RyYXRlZ3kgaW1wbGVtZW50YXRpb24pIHRocm91Z2hcbiAgICogdGhlIGBzZXRUb3RhbENvbnRlbnRTaXplKHNpemUpYCBtZXRob2QuIFRoZSBpbnB1dCBzaXplIGlzIHVzZWQgdG8gcG9zaXRpb24gYSBkdW1teSBzcGFjZXIgZWxlbWVudCBhdCBhIHBvc2l0aW9uIHRoYXQgbWltaWNzIHRoZSBgc2Nyb2xsSGVpZ2h0YC5cbiAgICpcbiAgICogSW4gdGhlb3J5LCB0aGUgc2l6ZSBzZW50IHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYCBzaG91bGQgZXF1YWwgdGhlIGBzY3JvbGxIZWlnaHRgIHZhbHVlLCBvbmNlIHRoZSBicm93c2VyIHVwZGF0ZSdzIHRoZSBsYXlvdXQuXG4gICAqIEluIHJlYWxpdHkgaXQgZG9lcyBub3QgaGFwcGVuLCBzb21ldGltZXMgdGhleSBhcmUgbm90IGVxdWFsLiBTZXR0aW5nIGEgc2l6ZSB3aWxsIHJlc3VsdCBpbiBhIGRpZmZlcmVudCBgc2Nyb2xsSGVpZ2h0YC5cbiAgICogVGhpcyBtaWdodCBiZSBkdWUgdG8gY2hhbmdlcyBpbiBtZWFzdXJlbWVudHMgd2hlbiBoYW5kbGluZyBzdGlja3kgbWV0YSByb3dzIChtb3ZpbmcgYmFjayBhbmQgZm9ydGgpXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIHBvc2l0aW9uIG9mIHRoZSBkdW1teSBzcGFjZXIgZWxlbWVudCBpcyBzZXQgdGhyb3VnaCBESSB0aGUgbGF5b3V0IHdpbGwgcnVuIGluIHRoZSBuZXh0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNhbGwgdG8gYHNldFRvdGFsQ29udGVudFNpemVgLlxuICAgKi9cbiAgc2Nyb2xsSGVpZ2h0ID0gMDtcblxuICBuZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gMDtcbiAgcGJsRmlsbGVySGVpZ2h0OiBzdHJpbmc7XG5cbiAgZ2V0IHdoZWVsTW9kZSgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXSB7XG4gICAgcmV0dXJuICh0aGlzLnBibFNjcm9sbFN0cmF0ZWd5IGFzIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpLndoZWVsTW9kZSB8fCB0aGlzLndoZWVsTW9kZURlZmF1bHQgfHwgJ3Bhc3NpdmUnO1xuICB9XG5cbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG5cbiAgZ2V0IG91dGVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgaW5uZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIGdldCBvdXRlckhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICBnZXQgc2Nyb2xsV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gIH1cblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSB3aGVuIG5vdCBzdXBwb3J0aW5nIDguMS4yIGFuZCBiZWxvd1xuICAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS53aWR0aGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgIF90b3RhbENvbnRlbnRXaWR0aCA9ICcnO1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS5oZWlnaHRgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cbiAgIF90b3RhbENvbnRlbnRIZWlnaHQgPSAnJztcbiAgICAvKipcbiAgICogVGhlIHRyYW5zZm9ybSB1c2VkIHRvIHNjYWxlIHRoZSBzcGFjZXIgdG8gdGhlIHNhbWUgc2l6ZSBhcyBhbGwgY29udGVudCwgaW5jbHVkaW5nIGNvbnRlbnQgdGhhdFxuICAgKiBpcyBub3QgY3VycmVudGx5IHJlbmRlcmVkLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgX3RvdGFsQ29udGVudFNpemVUcmFuc2Zvcm0gPSAnJztcbiAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuXG4gIHJlYWRvbmx5IF9taW5XaWR0aCQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIG9mZnNldENoYW5nZSQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIHByaXZhdGUgb2Zmc2V0OiBudW1iZXI7XG4gIHByaXZhdGUgaXNDRFBlbmRpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB3aGVlbE1vZGVEZWZhdWx0OiAgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFZJUlRVQUxfU0NST0xMX1NUUkFURUdZKSBwdWJsaWMgcGJsU2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLFxuICAgICAgICAgIGNkcixcbiAgICAgICAgICBuZ1pvbmUsXG4gICAgICAgICAgcGJsU2Nyb2xsU3RyYXRlZ3kgPSByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnLCBwYmxTY3JvbGxTdHJhdGVneSksXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXIpO1xuXG4gICAgaWYgKGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgICAgdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpLndoZWVsTW9kZTtcbiAgICB9XG4gICAgY29uZmlnLm9uVXBkYXRlKCd2aXJ0dWFsU2Nyb2xsJykucGlwZShVblJ4KHRoaXMpKS5zdWJzY3JpYmUoIGNoYW5nZSA9PiB0aGlzLndoZWVsTW9kZURlZmF1bHQgPSBjaGFuZ2UuY3Vyci53aGVlbE1vZGUpO1xuXG4gICAgaWYgKHBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5lbmFibGVkID0gcGJsU2Nyb2xsU3RyYXRlZ3kudHlwZSAhPT0gJ3ZTY3JvbGxOb25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGVkID0gIShwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTtcbiAgICB9XG4gICAgcGx1Z2luQ3RybC5leHRBcGkuc2V0Vmlld3BvcnQodGhpcyk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UgPSB0aGlzLm9mZnNldENoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB0aGlzLl9taW5XaWR0aCQgPSBncmlkLmNvbHVtbkFwaS50b3RhbENvbHVtbldpZHRoQ2hhbmdlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2RrU2Nyb2xsYWJsZS5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoICgpID0+IHRoaXMuaW5pdFNjcm9sbFdhdGNoZXIoKSApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIC8vIElmIHZpcnR1YWwgc2Nyb2xsIGlzIGRpc2FibGVkIChgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgKSB3ZSBuZWVkIHRvIGRpc2FibGUgYW55IGVmZmVjdCBhcHBsaWVkXG4gICAgLy8gYnkgdGhlIHZpZXdwb3J0LCB3cmFwcGluZyB0aGUgY29udGVudCBpbmplY3RlZCB0byBpdC5cbiAgICAvLyBUaGUgbWFpbiBlZmZlY3QgaXMgdGhlIGdyaWQgaGF2aW5nIGhlaWdodCAwIGF0IGFsbCB0aW1lcywgdW5sZXNzIHRoZSBoZWlnaHQgaXMgZXhwbGljaXRseSBzZXQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIGJlY2F1c2UgdGhlIGNvbnRlbnQgdGFraW5nIG91dCBvZiB0aGUgbGF5b3V0LCB3cmFwcGVkIGluIGFic29sdXRlIHBvc2l0aW9uaW5nLlxuICAgIC8vIEFkZGl0aW9uYWxseSwgdGhlIGhvc3QgaXRzZWxmICh2aWV3cG9ydCkgaXMgc2V0IHRvIGNvbnRhaW46IHN0cmljdC5cbiAgICBjb25zdCB7IGdyaWQgfSA9IHRoaXM7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgZ3JpZC5fY2RrVGFibGUuYXR0YWNoVmlld1BvcnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjcm9sbGluZ1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGlzU2Nyb2xsaW5nID0+IHtcbiAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSAhIWlzU2Nyb2xsaW5nO1xuICAgICAgICBpZiAoaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICBncmlkLmFkZENsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JpZC5yZW1vdmVDbGFzcygncGJsLW5ncmlkLXNjcm9sbGluZycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzZXRUb3RhbENvbnRlbnRTaXplKHNpemU6IG51bWJlcikge1xuICAgIHN1cGVyLnNldFRvdGFsQ29udGVudFNpemUoc2l6ZSk7XG5cbiAgICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCAzXTogcnVuIHRoaXMgb25jZS4uLiAoYWdncmVnYXRlIGFsbCBjYWxscyB3aXRoaW4gdGhlIHNhbWUgYW5pbWF0aW9uIGZyYW1lKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDsgLy9zaXplO1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICAgIC8vIFdlIG11c3QgdHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgYmVjYXVzZSB0aGUgZmlsbGVyIGRpdiBlbGVtZW50IGlzIHVwZGF0ZWQgdGhyb3VnaCBiaW5kaW5nc1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSlcbiAgfVxuXG4gIGNoZWNrVmlld3BvcnRTaXplKCkge1xuICAgIC8vIFRPRE86IENoZWNrIGZvciBjaGFuZ2VzIGluIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRgIHNvdXJjZSBjb2RlLCB3aGVuIHJlc2l6aW5nIGlzIGhhbmRsZWQhXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iLzI4ZmIzYWJlNzdjNTMzNmU0NzM5YzgyMDU4NGVjOTljMjNmMWFlMzgvc3JjL2Nkay9zY3JvbGxpbmcvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQudHMjTDM0MVxuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgIHN1cGVyLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgaWYgKHByZXYgIT09IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1lYXN1cmUgdGhlIGNvbWJpbmVkIHNpemUgb2YgYWxsIG9mIHRoZSByZW5kZXJlZCBpdGVtcy4gKi9cbiAgbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTogbnVtYmVyIHtcbiAgICBsZXQgc2l6ZSA9IHN1cGVyLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHNpemUgLT0gdGhpcy5zdGlja3lSb3dIZWFkZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5zdGlja3lSb3dGb290ZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBDb21wZW5zYXRlIGZvciBoeiBzY3JvbGwgYmFyLCBpZiBleGlzdHMsIG9ubHkgaW4gbm9uIHZpcnR1YWwgc2Nyb2xsIG1vZGUuXG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICBzaXplICs9IHRoaXMub3V0ZXJIZWlnaHQgLSB0aGlzLmlubmVySGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmlsbGVyKCk6IHZvaWQge1xuICAgIHRoaXMubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTtcbiAgICBpZiAodGhpcy5ncmlkLm5vRmlsbGVyKSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYmxGaWxsZXJIZWlnaHQgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpID49IHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA/XG4gICAgICAgIGBjYWxjKDEwMCUgLSAke3RoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZX1weClgXG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgICA7XG4gICAgfVxuICB9XG5cbiAgb25Tb3VyY2VMZW5ndGhDaGFuZ2UocHJldjogbnVtYmVyLCBjdXJyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgfVxuXG4gIGF0dGFjaChmb3JPZjogQ2RrVmlydHVhbEZvck9mPGFueT4gJiBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvKSB7XG4gICAgc3VwZXIuYXR0YWNoKGZvck9mKTtcbiAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlXG4gICAgICA/IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kuX3Njcm9sbFN0cmF0ZWd5XG4gICAgICA6IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3lcbiAgICA7XG4gICAgaWYgKHNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSkge1xuICAgICAgc2Nyb2xsU3RyYXRlZ3kuYXZlcmFnZXIuc2V0Um93SW5mbyhmb3JPZik7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldDogbnVtYmVyLCB0bzogJ3RvLXN0YXJ0JyB8ICd0by1lbmQnID0gJ3RvLXN0YXJ0Jykge1xuICAgIHN1cGVyLnNldFJlbmRlcmVkQ29udGVudE9mZnNldChvZmZzZXQsIHRvKTtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ0RQZW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICBjb25zdCBzeW5jVHJhbnNmb3JtID0gKCkgPT4geyB9O1xuXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBzeW5jVHJhbnNmb3JtKCkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLm9mZnNldENoYW5nZSQubmV4dCh0aGlzLm9mZnNldCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgc2Nyb2xsaW5nIHdhdGNoZXIgd2hpY2ggdHJhY2sgc2Nyb2xsIGV2ZW50cyBhbiBlbWl0cyBgc2Nyb2xsaW5nYCBhbmQgYHNjcm9sbEZyYW1lUmF0ZWAgZXZlbnRzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0U2Nyb2xsV2F0Y2hlcigpOiB2b2lkIHtcbiAgICBsZXQgc2Nyb2xsaW5nID0gMDtcbiAgICBsZXQgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgIHRoaXMuZWxlbWVudFNjcm9sbGVkKClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvKiAgYHNjcm9sbGluZ2AgaXMgYSBib29sZWFuIGZsYWcgdGhhdCB0dXJucyBvbiB3aXRoIHRoZSBmaXJzdCBgc2Nyb2xsYCBldmVudHMgYW5kIGVuZHMgYWZ0ZXIgMiBicm93c2VyIGFuaW1hdGlvbiBmcmFtZXMgaGF2ZSBwYXNzZWQgd2l0aG91dCBhIGBzY3JvbGxgIGV2ZW50LlxuICAgICAgICAgICAgVGhpcyBpcyBhbiBhdHRlbXB0IHRvIGRldGVjdCBhIHNjcm9sbCBlbmQgZXZlbnQsIHdoaWNoIGRvZXMgbm90IGV4aXN0LlxuXG4gICAgICAgICAgICBgc2Nyb2xsRnJhbWVSYXRlYCBpcyBhIG51bWJlciB0aGF0IHJlcHJlc2VudCBhIHJvdWdoIGVzdGltYXRpb24gb2YgdGhlIGZyYW1lIHJhdGUgYnkgbWVhc3VyaW5nIHRoZSB0aW1lIHBhc3NlZCBiZXR3ZWVuIGVhY2ggcmVxdWVzdCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgICAgIHdoaWxlIHRoZSBgc2Nyb2xsaW5nYCBzdGF0ZSBpcyB0cnVlLiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgICAgICAgICAgVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cbiAgICAgICAgICAgIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXG5cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gMCkge1xuICAgICAgICAgIC8qICBUaGUgbWVhc3VyZSBhcnJheSBob2xkcyB2YWx1ZXMgcmVxdWlyZWQgZm9yIGZyYW1lIHJhdGUgbWVhc3VyZW1lbnRzLlxuICAgICAgICAgICAgICBbMF0gU3RvcmFnZSBmb3IgbGFzdCB0aW1lc3RhbXAgdGFrZW5cbiAgICAgICAgICAgICAgWzFdIFRoZSBzdW0gb2YgYWxsIG1lYXN1cmVtZW50cyB0YWtlbiAoYSBtZWFzdXJlbWVudCBpcyB0aGUgdGltZSBiZXR3ZWVuIDIgc25hcHNob3RzKVxuICAgICAgICAgICAgICBbMl0gVGhlIGNvdW50IG9mIGFsbCBtZWFzdXJlbWVudHNcbiAgICAgICAgICAgICAgWzNdIFRoZSBzdW0gb2YgYWxsIG1lYXN1cmVtZW50cyB0YWtlbiBXSVRISU4gdGhlIGN1cnJlbnQgYnVmZmVyIHdpbmRvdy4gVGhpcyBidWZmZXIgaXMgZmx1c2hlZCBpbnRvIFsxXSBldmVyeSBYIG1zIChzZWUgYnVnZ2VyV2luZG93IGNvbnN0KS5cbiAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGJ1ZmZlcldpbmRvdyA9IDQ5OTtcbiAgICAgICAgICBjb25zdCBtZWFzdXJlID0gWyBwZXJmb3JtYW5jZS5ub3coKSwgMCwgMCwgMCBdO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgIGlmIChsYXN0T2Zmc2V0ID09PSBvZmZzZXQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgY29uc3QgZGVsdGEgPSBsYXN0T2Zmc2V0IDwgb2Zmc2V0ID8gMSA6IC0xO1xuXG4gICAgICAgICAgdGhpcy5zY3JvbGxpbmcubmV4dChkZWx0YSk7XG5cbiAgICAgICAgICBjb25zdCByYWYgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gLW1lYXN1cmVbMF0gKyAobWVhc3VyZVswXSA9IHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICAgICAgICAgIGlmICh0aW1lID4gNSkge1xuICAgICAgICAgICAgICBtZWFzdXJlWzFdICs9IHRpbWU7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMl0gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY3JvbGxpbmcgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHNjcm9sbGluZyA9IDA7XG4gICAgICAgICAgICAgIGxhc3RPZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmcubmV4dCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobWVhc3VyZVsxXSA+IGJ1ZmZlcldpbmRvdykge1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbM10gKz0gbWVhc3VyZVsxXTtcbiAgICAgICAgICAgICAgICBtZWFzdXJlWzFdID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEZyYW1lUmF0ZS5lbWl0KDEwMDAgLyAobWVhc3VyZVszXS9tZWFzdXJlWzJdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gc2Nyb2xsaW5nID09PSAxID8gLTEgOiAxO1xuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICB9XG4gICAgICAgIHNjcm9sbGluZysrO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgQ1NTU3R5bGVEZWNsYXJhdGlvbiB7XG4gICAgY29udGFpbjogJ25vbmUnIHwgJ3N0cmljdCcgfCAnY29udGVudCcgfCAnc2l6ZScgfCAnbGF5b3V0JyB8ICdzdHlsZScgfCAncGFpbnQnIHwgJ2luaGVyaXQnIHwgJ2luaXRpYWwnIHwgJ3Vuc2V0JztcbiAgfVxufVxuIl19