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
import { PblNgridComponent } from '../../table.component';
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
     * @param {?} table
     */
    constructor(elementRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, pluginCtrl, table) {
        super(elementRef, cdr, ngZone, pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy), dir, scrollDispatcher);
        this.cdr = cdr;
        this.pblScrollStrategy = pblScrollStrategy;
        this.table = table;
        /**
         * Event emitted when the scrolling state of rows in the table changes.
         * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
         *
         * The table is in "scrolling" state from the first scroll event and until 2 animation frames
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
        /// COMPATIBILITY 8.1.2- <-> 8.1.3+
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
        // The main effect is the table having height 0 at all times, unless the height is explicitly set.
        // This happens because the content taking out of the layout, wrapped in absolute positioning.
        // Additionally, the host itself (viewport) is set to contain: strict.
        const { table } = this;
        if (this.enabled) {
            table._cdkTable.attachViewPort();
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
                table.addClass('pbl-ngrid-scrolling');
            }
            else {
                table.removeClass('pbl-ngrid-scrolling');
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
        if (this.table.noFiller) {
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
                template: "<p class=\"cdk-virtual-scroll-inner-width\"></p>\n<ng-content select=\".cdk-virtual-scroll-before-content-wrapper\"></ng-content>\n<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper [class.cdk-virtual-scroll-content-wrapper]=\"enabled\" style=\"width: 100%\" [style.minWidth.px]=\"minWidth\">\n  <ng-content></ng-content>\n</div>\n\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div *ngIf=\"enabled\" class=\"cdk-virtual-scroll-spacer\"\n     [style.width]=\"_totalContentWidth\" [style.height]=\"_totalContentHeight\"\n     [style.transform]=\"_totalContentSizeTransform\"></div>\n<div *ngIf=\"pblFillerHeight && enabled\"\n    class=\"pbl-ngrid-space-fill\"\n    [style.minWidth.px]=\"minWidth\"\n    [style.top.px]=\"ngeRenderedContentSize\"\n    [style.height]=\"pblFillerHeight\"></div>\n",
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
    minWidth: [{ type: Input }],
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
    PblCdkVirtualScrollViewportComponent.prototype.minWidth;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.stickyRowHeaderContainer;
    /** @type {?} */
    PblCdkVirtualScrollViewportComponent.prototype.stickyRowFooterContainer;
    /**
     * Event emitted when the scrolling state of rows in the table changes.
     * When scrolling starts `true` is emitted and when the scrolling ends `false` is emitted.
     *
     * The table is in "scrolling" state from the first scroll event and until 2 animation frames
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
    PblCdkVirtualScrollViewportComponent.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsU0FBUyxFQUNULHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSx1QkFBdUIsRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBWXpILFNBQVMscUJBQXFCLENBQUMsTUFBNkIsRUFBRSxjQUFzQztJQUNsRyxJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxH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QjtRQUN0QixNQUFNO1FBQ04scUJBQXFCLFVBRVosY0FBYztRQUNiLGdCQUFnQjtRQUN0Qix3QkFBd0I7UUFDckIsaUJBQWlCO0dBdEhqQyxvQ0FBb0MsQ0FpVWhEO1NBalVZLG9DQUFvQzs7O0lBRy9DLHVEQUEwQjs7Ozs7Ozs7SUFRMUIsNERBQTBDOztJQUUxQyx3REFBMEI7O0lBRTFCLHdFQUErQzs7SUFDL0Msd0VBQStDOzs7Ozs7Ozs7Ozs7OztJQWMvQyx5REFBdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQnZELCtEQUF1RDs7Ozs7Ozs7Ozs7OztJQWF2RCw0REFBaUI7O0lBRWpCLHNFQUEyQjs7SUFDM0IsK0RBQXdCOzs7OztJQTJCdEIsa0VBQXdCOzs7OztJQUV6QixtRUFBeUI7Ozs7Ozs7SUFNMUIsMEVBQWdDOzs7OztJQUdoQyw2REFBOEM7Ozs7O0lBQzlDLHNEQUF1Qjs7Ozs7SUFDdkIsMkRBQTZCOzs7OztJQUM3Qiw0REFBNkI7Ozs7O0lBRTdCLGdFQUFxRTs7Ozs7SUFHekQsbURBQThCOztJQUc5QixpRUFBNEY7Ozs7O0lBSTVGLHFEQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBPcHRpb25hbCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCxcbiAgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gIFZpcnR1YWxTY3JvbGxTdHJhdGVneSxcbiAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgQ2RrVmlydHVhbEZvck9mLFxuICBDZGtTY3JvbGxhYmxlLFxufSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzJztcbmltcG9ydCB7IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8gfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5cbmRlY2xhcmUgbW9kdWxlICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICB2aXJ0dWFsU2Nyb2xsPzoge1xuICAgICAgd2hlZWxNb2RlPzogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XG4gICAgICBkZWZhdWx0U3RyYXRlZ3k/KCk6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVNjcm9sbFN0cmF0ZWd5KGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBzY3JvbGxTdHJhdGVneT86IFZpcnR1YWxTY3JvbGxTdHJhdGVneSk6IFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIGlmICghc2Nyb2xsU3RyYXRlZ3kgJiYgY29uZmlnLmhhcygndmlydHVhbFNjcm9sbCcpKSB7XG4gICAgY29uc3QgdmlydHVhbFNjcm9sbENvbmZpZyA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKTtcbiAgICBpZiAodHlwZW9mIHZpcnR1YWxTY3JvbGxDb25maWcuZGVmYXVsdFN0cmF0ZWd5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzY3JvbGxTdHJhdGVneSA9IHZpcnR1YWxTY3JvbGxDb25maWcuZGVmYXVsdFN0cmF0ZWd5KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFN0cmF0ZWd5IHx8IG5ldyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KDEwMCwgMjAwKTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcsXG4gIHRlbXBsYXRlVXJsOiAndmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LnNjc3MnIF0sXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICBjbGFzczogJ2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtZGlzYWJsZWRdJzogJyFlbmFibGVkJyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi1ob3Jpem9udGFsXSc6ICdvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLXZlcnRpY2FsXSc6ICdvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgZXh0ZW5kcyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgZ2V0IGlzU2Nyb2xsaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNTY3JvbGxpbmc7IH1cbiAgcmVhZG9ubHkgZW5hYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBvZiB0aGUgcmVuZGVyZWQgY29udGVudCBldmVyeSB0aW1lIGl0IGNoYW5nZXMuXG4gICAqIFRoZSBlbWlzc2lvbiBpcyBkb25lIE9VVFNJREUgb2YgYW5ndWxhciAoaS5lLiBubyBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGlzIHRyaWdnZXJlZCkuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIG5vdCBlbmFibGVkIChpLmUgYE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5YCBpcyB1c2VkKSB0aGVyZSBhcmUgbm8gZW1pc3Npb25zLlxuICAgKi9cbiAgcmVhZG9ubHkgb2Zmc2V0Q2hhbmdlOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlcjtcblxuICBASW5wdXQoKSBzdGlja3lSb3dIZWFkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBzdGlja3lSb3dGb290ZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbGluZyBzdGF0ZSBvZiByb3dzIGluIHRoZSB0YWJsZSBjaGFuZ2VzLlxuICAgKiBXaGVuIHNjcm9sbGluZyBzdGFydHMgYHRydWVgIGlzIGVtaXR0ZWQgYW5kIHdoZW4gdGhlIHNjcm9sbGluZyBlbmRzIGBmYWxzZWAgaXMgZW1pdHRlZC5cbiAgICpcbiAgICogVGhlIHRhYmxlIGlzIGluIFwic2Nyb2xsaW5nXCIgc3RhdGUgZnJvbSB0aGUgZmlyc3Qgc2Nyb2xsIGV2ZW50IGFuZCB1bnRpbCAyIGFuaW1hdGlvbiBmcmFtZXNcbiAgICogaGF2ZSBwYXNzZWQgd2l0aG91dCBhIHNjcm9sbCBldmVudC5cbiAgICpcbiAgICogV2hlbiBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIHRoZSBkaXJlY3Rpb246IC0xIG9yIDFcbiAgICogV2hlbiBub3Qgc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyAwLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8IC0xIHwgMCB8IDEgPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBlc3RpbWF0aW9uIG9mIHRoZSBjdXJyZW50IGZyYW1lIHJhdGUgd2hpbGUgc2Nyb2xsaW5nLCBpbiBhIDUwMG1zIGludGVydmFsLlxuICAgKlxuICAgKiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgKiBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgYSBzaW5nbGUgc2Nyb2xsIG9yIHNob3J0IHNjcm9sbCBidXJzdHMgd2lsbCBub3QgcmVzdWx0IGluIGEgYHNjcm9sbEZyYW1lUmF0ZWAgZW1pc3Npb25zLlxuICAgKlxuICAgKiBWYWxpZCBvbiB3aGVuIHZpcnR1YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIEluIHRoZSBmdXR1cmUgdGhlIG1lYXN1cmVtZW50IGxvZ2ljIG1pZ2h0IGJlIHJlcGxhY2VkIHdpdGggdGhlIEZyYW1lIFRpbWluZyBBUElcbiAgICogU2VlOlxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTQvMTEvZnJhbWUtdGltaW5nLWFwaVxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QZXJmb3JtYW5jZU9ic2VydmVyXG4gICAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZWFyY2hpdmUvZnJhbWUtdGltaW5nLXBvbHlmaWxsL3dpa2kvRXhwbGFpbmVyXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsRnJhbWVSYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBvZiB0aGUgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQuXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBpcyB1cGRhdGVkIGJ5IHRoZSB2aXJ0dWFsIHNjcm9sbCAodXBkYXRlIGxvZ2ljIGFuZCBmcmVxdWVuY3kgZGVwZW5kcyBvbiB0aGUgc3RyYXRlZ3kgaW1wbGVtZW50YXRpb24pIHRocm91Z2hcbiAgICogdGhlIGBzZXRUb3RhbENvbnRlbnRTaXplKHNpemUpYCBtZXRob2QuIFRoZSBpbnB1dCBzaXplIGlzIHVzZWQgdG8gcG9zaXRpb24gYSBkdW1teSBzcGFjZXIgZWxlbWVudCBhdCBhIHBvc2l0aW9uIHRoYXQgbWltaWNzIHRoZSBgc2Nyb2xsSGVpZ2h0YC5cbiAgICpcbiAgICogSW4gdGhlb3J5LCB0aGUgc2l6ZSBzZW50IHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYCBzaG91bGQgZXF1YWwgdGhlIGBzY3JvbGxIZWlnaHRgIHZhbHVlLCBvbmNlIHRoZSBicm93c2VyIHVwZGF0ZSdzIHRoZSBsYXlvdXQuXG4gICAqIEluIHJlYWxpdHkgaXQgZG9lcyBub3QgaGFwcGVuLCBzb21ldGltZXMgdGhleSBhcmUgbm90IGVxdWFsLiBTZXR0aW5nIGEgc2l6ZSB3aWxsIHJlc3VsdCBpbiBhIGRpZmZlcmVudCBgc2Nyb2xsSGVpZ2h0YC5cbiAgICogVGhpcyBtaWdodCBiZSBkdWUgdG8gY2hhbmdlcyBpbiBtZWFzdXJlbWVudHMgd2hlbiBoYW5kbGluZyBzdGlja3kgbWV0YSByb3dzIChtb3ZpbmcgYmFjayBhbmQgZm9ydGgpXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIHBvc2l0aW9uIG9mIHRoZSBkdW1teSBzcGFjZXIgZWxlbWVudCBpcyBzZXQgdGhyb3VnaCBESSB0aGUgbGF5b3V0IHdpbGwgcnVuIGluIHRoZSBuZXh0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNhbGwgdG8gYHNldFRvdGFsQ29udGVudFNpemVgLlxuICAgKi9cbiAgc2Nyb2xsSGVpZ2h0ID0gMDtcblxuICBuZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gMDtcbiAgcGJsRmlsbGVySGVpZ2h0OiBzdHJpbmc7XG5cbiAgZ2V0IHdoZWVsTW9kZSgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXSB7XG4gICAgcmV0dXJuICh0aGlzLnBibFNjcm9sbFN0cmF0ZWd5IGFzIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpLndoZWVsTW9kZSB8fCB0aGlzLndoZWVsTW9kZURlZmF1bHQgfHwgJ3Bhc3NpdmUnO1xuICB9XG5cbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG5cbiAgZ2V0IG91dGVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgaW5uZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIGdldCBvdXRlckhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSB3aGVuIG5vdCBzdXBwb3J0aW5nIDguMS4yIGFuZCBiZWxvd1xuICAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS53aWR0aGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgIF90b3RhbENvbnRlbnRXaWR0aCA9ICcnO1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS5oZWlnaHRgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cbiAgIF90b3RhbENvbnRlbnRIZWlnaHQgPSAnJztcbiAgICAvKipcbiAgICogVGhlIHRyYW5zZm9ybSB1c2VkIHRvIHNjYWxlIHRoZSBzcGFjZXIgdG8gdGhlIHNhbWUgc2l6ZSBhcyBhbGwgY29udGVudCwgaW5jbHVkaW5nIGNvbnRlbnQgdGhhdFxuICAgKiBpcyBub3QgY3VycmVudGx5IHJlbmRlcmVkLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgX3RvdGFsQ29udGVudFNpemVUcmFuc2Zvcm0gPSAnJztcbiAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuXG4gIHByaXZhdGUgb2Zmc2V0Q2hhbmdlJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0NEUGVuZGluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHdoZWVsTW9kZURlZmF1bHQ6ICBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kpIHB1YmxpYyBwYmxTY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLFxuICAgICAgICAgIGNkcixcbiAgICAgICAgICBuZ1pvbmUsXG4gICAgICAgICAgcGJsU2Nyb2xsU3RyYXRlZ3kgPSByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnLCBwYmxTY3JvbGxTdHJhdGVneSksXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXIpO1xuXG4gICAgaWYgKGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgICAgdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpLndoZWVsTW9kZTtcbiAgICB9XG4gICAgY29uZmlnLm9uVXBkYXRlKCd2aXJ0dWFsU2Nyb2xsJykucGlwZShVblJ4KHRoaXMpKS5zdWJzY3JpYmUoIGNoYW5nZSA9PiB0aGlzLndoZWVsTW9kZURlZmF1bHQgPSBjaGFuZ2UuY3Vyci53aGVlbE1vZGUpO1xuXG4gICAgaWYgKHBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5lbmFibGVkID0gcGJsU2Nyb2xsU3RyYXRlZ3kudHlwZSAhPT0gJ3ZTY3JvbGxOb25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGVkID0gIShwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTtcbiAgICB9XG4gICAgcGx1Z2luQ3RybC5leHRBcGkuc2V0Vmlld3BvcnQodGhpcyk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UgPSB0aGlzLm9mZnNldENoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDZGtTY3JvbGxhYmxlLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4gdGhpcy5pbml0U2Nyb2xsV2F0Y2hlcigpICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgKGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWApIHdlIG5lZWQgdG8gZGlzYWJsZSBhbnkgZWZmZWN0IGFwcGxpZWRcbiAgICAvLyBieSB0aGUgdmlld3BvcnQsIHdyYXBwaW5nIHRoZSBjb250ZW50IGluamVjdGVkIHRvIGl0LlxuICAgIC8vIFRoZSBtYWluIGVmZmVjdCBpcyB0aGUgdGFibGUgaGF2aW5nIGhlaWdodCAwIGF0IGFsbCB0aW1lcywgdW5sZXNzIHRoZSBoZWlnaHQgaXMgZXhwbGljaXRseSBzZXQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIGJlY2F1c2UgdGhlIGNvbnRlbnQgdGFraW5nIG91dCBvZiB0aGUgbGF5b3V0LCB3cmFwcGVkIGluIGFic29sdXRlIHBvc2l0aW9uaW5nLlxuICAgIC8vIEFkZGl0aW9uYWxseSwgdGhlIGhvc3QgaXRzZWxmICh2aWV3cG9ydCkgaXMgc2V0IHRvIGNvbnRhaW46IHN0cmljdC5cbiAgICBjb25zdCB7IHRhYmxlIH0gPSB0aGlzO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRhYmxlLl9jZGtUYWJsZS5hdHRhY2hWaWV3UG9ydCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsaW5nXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggaXNTY3JvbGxpbmcgPT4ge1xuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9ICEhaXNTY3JvbGxpbmc7XG4gICAgICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgICAgIHRhYmxlLmFkZENsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFibGUucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2V0VG90YWxDb250ZW50U2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBzdXBlci5zZXRUb3RhbENvbnRlbnRTaXplKHNpemUpO1xuXG4gICAgLy8gVE9ETyhzaGxvbWlhc3NhZilbcGVyZiwgM106IHJ1biB0aGlzIG9uY2UuLi4gKGFnZ3JlZ2F0ZSBhbGwgY2FsbHMgd2l0aGluIHRoZSBzYW1lIGFuaW1hdGlvbiBmcmFtZSlcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7IC8vc2l6ZTtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgICAvLyBXZSBtdXN0IHRyaWdnZXIgYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGJlY2F1c2UgdGhlIGZpbGxlciBkaXYgZWxlbWVudCBpcyB1cGRhdGVkIHRocm91Z2ggYmluZGluZ3NcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pXG4gIH1cblxuICBjaGVja1ZpZXdwb3J0U2l6ZSgpIHtcbiAgICAvLyBUT0RPOiBDaGVjayBmb3IgY2hhbmdlcyBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YCBzb3VyY2UgY29kZSwgd2hlbiByZXNpemluZyBpcyBoYW5kbGVkIVxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi8yOGZiM2FiZTc3YzUzMzZlNDczOWM4MjA1ODRlYzk5YzIzZjFhZTM4L3NyYy9jZGsvc2Nyb2xsaW5nL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LnRzI0wzNDFcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICBzdXBlci5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIGlmIChwcmV2ICE9PSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNZWFzdXJlIHRoZSBjb21iaW5lZCBzaXplIG9mIGFsbCBvZiB0aGUgcmVuZGVyZWQgaXRlbXMuICovXG4gIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk6IG51bWJlciB7XG4gICAgbGV0IHNpemUgPSBzdXBlci5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICBzaXplIC09IHRoaXMuc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyLm9mZnNldEhlaWdodCArIHRoaXMuc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcblxuICAgICAgLy8gQ29tcGVuc2F0ZSBmb3IgaHogc2Nyb2xsIGJhciwgaWYgZXhpc3RzLCBvbmx5IGluIG5vbiB2aXJ0dWFsIHNjcm9sbCBtb2RlLlxuICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgc2l6ZSArPSB0aGlzLm91dGVySGVpZ2h0IC0gdGhpcy5pbm5lckhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IHNpemU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZpbGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMudGFibGUubm9GaWxsZXIpIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkgPj0gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID9cbiAgICAgICAgYGNhbGMoMTAwJSAtICR7dGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplfXB4KWBcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUxlbmd0aENoYW5nZShwcmV2OiBudW1iZXIsIGN1cnI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICB9XG5cbiAgYXR0YWNoKGZvck9mOiBDZGtWaXJ0dWFsRm9yT2Y8YW55PiAmIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pIHtcbiAgICBzdXBlci5hdHRhY2goZm9yT2YpO1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5wYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVcbiAgICAgID8gdGhpcy5wYmxTY3JvbGxTdHJhdGVneS5fc2Nyb2xsU3RyYXRlZ3lcbiAgICAgIDogdGhpcy5wYmxTY3JvbGxTdHJhdGVneVxuICAgIDtcbiAgICBpZiAoc2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KSB7XG4gICAgICBzY3JvbGxTdHJhdGVneS5hdmVyYWdlci5zZXRSb3dJbmZvKGZvck9mKTtcbiAgICB9XG4gIH1cblxuICBzZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0OiBudW1iZXIsIHRvOiAndG8tc3RhcnQnIHwgJ3RvLWVuZCcgPSAndG8tc3RhcnQnKSB7XG4gICAgc3VwZXIuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldCwgdG8pO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLm9mZnNldCAhPT0gb2Zmc2V0KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMuaXNDRFBlbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHN5bmNUcmFuc2Zvcm0gPSAoKSA9PiB7IH07XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHN5bmNUcmFuc2Zvcm0oKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5uZXh0KHRoaXMub2Zmc2V0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBzY3JvbGxpbmcgd2F0Y2hlciB3aGljaCB0cmFjayBzY3JvbGwgZXZlbnRzIGFuIGVtaXRzIGBzY3JvbGxpbmdgIGFuZCBgc2Nyb2xsRnJhbWVSYXRlYCBldmVudHMuXG4gICAqL1xuICBwcml2YXRlIGluaXRTY3JvbGxXYXRjaGVyKCk6IHZvaWQge1xuICAgIGxldCBzY3JvbGxpbmcgPSAwO1xuICAgIGxldCBsYXN0T2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgdGhpcy5lbGVtZW50U2Nyb2xsZWQoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8qICBgc2Nyb2xsaW5nYCBpcyBhIGJvb2xlYW4gZmxhZyB0aGF0IHR1cm5zIG9uIHdpdGggdGhlIGZpcnN0IGBzY3JvbGxgIGV2ZW50cyBhbmQgZW5kcyBhZnRlciAyIGJyb3dzZXIgYW5pbWF0aW9uIGZyYW1lcyBoYXZlIHBhc3NlZCB3aXRob3V0IGEgYHNjcm9sbGAgZXZlbnQuXG4gICAgICAgICAgICBUaGlzIGlzIGFuIGF0dGVtcHQgdG8gZGV0ZWN0IGEgc2Nyb2xsIGVuZCBldmVudCwgd2hpY2ggZG9lcyBub3QgZXhpc3QuXG5cbiAgICAgICAgICAgIGBzY3JvbGxGcmFtZVJhdGVgIGlzIGEgbnVtYmVyIHRoYXQgcmVwcmVzZW50IGEgcm91Z2ggZXN0aW1hdGlvbiBvZiB0aGUgZnJhbWUgcmF0ZSBieSBtZWFzdXJpbmcgdGhlIHRpbWUgcGFzc2VkIGJldHdlZW4gZWFjaCByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgd2hpbGUgdGhlIGBzY3JvbGxpbmdgIHN0YXRlIGlzIHRydWUuIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAgICAgICAgICBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgICAgICAgICAgVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cblxuICAgICAgICAqL1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID09PSAwKSB7XG4gICAgICAgICAgLyogIFRoZSBtZWFzdXJlIGFycmF5IGhvbGRzIHZhbHVlcyByZXF1aXJlZCBmb3IgZnJhbWUgcmF0ZSBtZWFzdXJlbWVudHMuXG4gICAgICAgICAgICAgIFswXSBTdG9yYWdlIGZvciBsYXN0IHRpbWVzdGFtcCB0YWtlblxuICAgICAgICAgICAgICBbMV0gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIChhIG1lYXN1cmVtZW50IGlzIHRoZSB0aW1lIGJldHdlZW4gMiBzbmFwc2hvdHMpXG4gICAgICAgICAgICAgIFsyXSBUaGUgY291bnQgb2YgYWxsIG1lYXN1cmVtZW50c1xuICAgICAgICAgICAgICBbM10gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIFdJVEhJTiB0aGUgY3VycmVudCBidWZmZXIgd2luZG93LiBUaGlzIGJ1ZmZlciBpcyBmbHVzaGVkIGludG8gWzFdIGV2ZXJ5IFggbXMgKHNlZSBidWdnZXJXaW5kb3cgY29uc3QpLlxuICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgYnVmZmVyV2luZG93ID0gNDk5O1xuICAgICAgICAgIGNvbnN0IG1lYXN1cmUgPSBbIHBlcmZvcm1hbmNlLm5vdygpLCAwLCAwLCAwIF07XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgaWYgKGxhc3RPZmZzZXQgPT09IG9mZnNldCkgeyByZXR1cm47IH1cbiAgICAgICAgICBjb25zdCBkZWx0YSA9IGxhc3RPZmZzZXQgPCBvZmZzZXQgPyAxIDogLTE7XG5cbiAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KGRlbHRhKTtcblxuICAgICAgICAgIGNvbnN0IHJhZiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSAtbWVhc3VyZVswXSArIChtZWFzdXJlWzBdID0gcGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiA1KSB7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMV0gKz0gdGltZTtcbiAgICAgICAgICAgICAgbWVhc3VyZVsyXSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gMDtcbiAgICAgICAgICAgICAgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtZWFzdXJlWzFdID4gYnVmZmVyV2luZG93KSB7XG4gICAgICAgICAgICAgICAgbWVhc3VyZVszXSArPSBtZWFzdXJlWzFdO1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbMV0gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRnJhbWVSYXRlLmVtaXQoMTAwMCAvIChtZWFzdXJlWzNdL21lYXN1cmVbMl0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY3JvbGxpbmcgPSBzY3JvbGxpbmcgPT09IDEgPyAtMSA6IDE7XG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsaW5nKys7XG4gICAgICB9KTtcbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBDU1NTdHlsZURlY2xhcmF0aW9uIHtcbiAgICBjb250YWluOiAnbm9uZScgfCAnc3RyaWN0JyB8ICdjb250ZW50JyB8ICdzaXplJyB8ICdsYXlvdXQnIHwgJ3N0eWxlJyB8ICdwYWludCcgfCAnaW5oZXJpdCcgfCAnaW5pdGlhbCcgfCAndW5zZXQnO1xuICB9XG59XG4iXX0=