/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { Component, ChangeDetectionStrategy, ElementRef, EventEmitter, Inject, Input, ChangeDetectorRef, ViewEncapsulation, NgZone, Output, Optional, } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY, ScrollDispatcher, CdkScrollable, } from '@angular/cdk/scrolling';
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
            this.cdr.detectChanges();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUV2QixnQkFBZ0IsRUFFaEIsYUFBYSxHQUNkLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsdUJBQXVCLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7OztBQVl6SCxTQUFTLHFCQUFxQixDQUFDLE1BQTZCLEVBQUUsY0FBc0M7SUFDbEcsSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFOztjQUM1QyxtQkFBbUIsR0FBRyxNQUFNLENBQUMs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QTBCOztJQUUxQix3RUFBK0M7O0lBQy9DLHdFQUErQzs7Ozs7Ozs7Ozs7Ozs7SUFjL0MseURBQXVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUJ2RCwrREFBdUQ7Ozs7Ozs7Ozs7Ozs7SUFhdkQsNERBQWlCOztJQUVqQixzRUFBMkI7O0lBQzNCLCtEQUF3Qjs7Ozs7SUEyQnRCLGtFQUF3Qjs7Ozs7SUFFekIsbUVBQXlCOzs7Ozs7O0lBTTFCLDBFQUFnQzs7Ozs7SUFHaEMsNkRBQThDOzs7OztJQUM5QyxzREFBdUI7Ozs7O0lBQ3ZCLDJEQUE2Qjs7Ozs7SUFDN0IsNERBQTZCOzs7OztJQUU3QixnRUFBcUU7Ozs7O0lBR3pELG1EQUE4Qjs7SUFHOUIsaUVBQTRGOzs7OztJQUk1RixxREFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgT3B0aW9uYWwsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsXG4gIFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gIFNjcm9sbERpc3BhdGNoZXIsXG4gIENka1ZpcnR1YWxGb3JPZixcbiAgQ2RrU2Nyb2xsYWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLCBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcyc7XG5pbXBvcnQgeyBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuXG5kZWNsYXJlIG1vZHVsZSAnLi4vLi4vc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdmlydHVhbFNjcm9sbD86IHtcbiAgICAgIHdoZWVsTW9kZT86IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuICAgICAgZGVmYXVsdFN0cmF0ZWd5PygpOiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTY3JvbGxTdHJhdGVneShjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSwgc2Nyb2xsU3RyYXRlZ3k/OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpOiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBpZiAoIXNjcm9sbFN0cmF0ZWd5ICYmIGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxDb25maWcgPSBjb25maWcuZ2V0KCd2aXJ0dWFsU2Nyb2xsJyk7XG4gICAgaWYgKHR5cGVvZiB2aXJ0dWFsU2Nyb2xsQ29uZmlnLmRlZmF1bHRTdHJhdGVneSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2Nyb2xsU3RyYXRlZ3kgPSB2aXJ0dWFsU2Nyb2xsQ29uZmlnLmRlZmF1bHRTdHJhdGVneSgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY3JvbGxTdHJhdGVneSB8fCBuZXcgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSgxMDAsIDIwMCk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5zY3NzJyBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLWRpc2FibGVkXSc6ICchZW5hYmxlZCcsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24taG9yaXpvbnRhbF0nOiAnb3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi12ZXJ0aWNhbF0nOiAnb3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIidcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IGV4dGVuZHMgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBpc1Njcm9sbGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzU2Nyb2xsaW5nOyB9XG4gIHJlYWRvbmx5IGVuYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBvZmZzZXQgKGluIHBpeGVscykgb2YgdGhlIHJlbmRlcmVkIGNvbnRlbnQgZXZlcnkgdGltZSBpdCBjaGFuZ2VzLlxuICAgKiBUaGUgZW1pc3Npb24gaXMgZG9uZSBPVVRTSURFIG9mIGFuZ3VsYXIgKGkuZS4gbm8gY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBpcyB0cmlnZ2VyZWQpLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiBub3QgZW5hYmxlZCAoaS5lIGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWAgaXMgdXNlZCkgdGhlcmUgYXJlIG5vIGVtaXNzaW9ucy5cbiAgICovXG4gIHJlYWRvbmx5IG9mZnNldENoYW5nZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIEBJbnB1dCgpIG1pbldpZHRoOiBudW1iZXI7XG5cbiAgQElucHV0KCkgc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgQElucHV0KCkgc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzY3JvbGxpbmcgc3RhdGUgb2Ygcm93cyBpbiB0aGUgdGFibGUgY2hhbmdlcy5cbiAgICogV2hlbiBzY3JvbGxpbmcgc3RhcnRzIGB0cnVlYCBpcyBlbWl0dGVkIGFuZCB3aGVuIHRoZSBzY3JvbGxpbmcgZW5kcyBgZmFsc2VgIGlzIGVtaXR0ZWQuXG4gICAqXG4gICAqIFRoZSB0YWJsZSBpcyBpbiBcInNjcm9sbGluZ1wiIHN0YXRlIGZyb20gdGhlIGZpcnN0IHNjcm9sbCBldmVudCBhbmQgdW50aWwgMiBhbmltYXRpb24gZnJhbWVzXG4gICAqIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBzY3JvbGwgZXZlbnQuXG4gICAqXG4gICAqIFdoZW4gc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyB0aGUgZGlyZWN0aW9uOiAtMSBvciAxXG4gICAqIFdoZW4gbm90IHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgMC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPCAtMSB8IDAgfCAxID4oKTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgY3VycmVudCBmcmFtZSByYXRlIHdoaWxlIHNjcm9sbGluZywgaW4gYSA1MDBtcyBpbnRlcnZhbC5cbiAgICpcbiAgICogVGhlIGZyYW1lIHJhdGUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2UgZnJhbWUgcmF0ZSBmcm9tIGFsbCBtZWFzdXJlbWVudHMgc2luY2UgdGhlIHNjcm9sbGluZyBiZWdhbi5cbiAgICogVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cbiAgICogVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cbiAgICpcbiAgICogVmFsaWQgb24gd2hlbiB2aXJ0dWFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKlxuICAgKiBJbiB0aGUgZnV0dXJlIHRoZSBtZWFzdXJlbWVudCBsb2dpYyBtaWdodCBiZSByZXBsYWNlZCB3aXRoIHRoZSBGcmFtZSBUaW1pbmcgQVBJXG4gICAqIFNlZTpcbiAgICogLSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdXBkYXRlcy8yMDE0LzExL2ZyYW1lLXRpbWluZy1hcGlcbiAgICogLSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUGVyZm9ybWFuY2VPYnNlcnZlclxuICAgKiAtIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGVhcmNoaXZlL2ZyYW1lLXRpbWluZy1wb2x5ZmlsbC93aWtpL0V4cGxhaW5lclxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbEZyYW1lUmF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgb2YgdGhlIHZpcnR1YWwgc2Nyb2xsIHZpZXdwb3J0LlxuICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgaXMgdXBkYXRlZCBieSB0aGUgdmlydHVhbCBzY3JvbGwgKHVwZGF0ZSBsb2dpYyBhbmQgZnJlcXVlbmN5IGRlcGVuZHMgb24gdGhlIHN0cmF0ZWd5IGltcGxlbWVudGF0aW9uKSB0aHJvdWdoXG4gICAqIHRoZSBgc2V0VG90YWxDb250ZW50U2l6ZShzaXplKWAgbWV0aG9kLiBUaGUgaW5wdXQgc2l6ZSBpcyB1c2VkIHRvIHBvc2l0aW9uIGEgZHVtbXkgc3BhY2VyIGVsZW1lbnQgYXQgYSBwb3NpdGlvbiB0aGF0IG1pbWljcyB0aGUgYHNjcm9sbEhlaWdodGAuXG4gICAqXG4gICAqIEluIHRoZW9yeSwgdGhlIHNpemUgc2VudCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAgc2hvdWxkIGVxdWFsIHRoZSBgc2Nyb2xsSGVpZ2h0YCB2YWx1ZSwgb25jZSB0aGUgYnJvd3NlciB1cGRhdGUncyB0aGUgbGF5b3V0LlxuICAgKiBJbiByZWFsaXR5IGl0IGRvZXMgbm90IGhhcHBlbiwgc29tZXRpbWVzIHRoZXkgYXJlIG5vdCBlcXVhbC4gU2V0dGluZyBhIHNpemUgd2lsbCByZXN1bHQgaW4gYSBkaWZmZXJlbnQgYHNjcm9sbEhlaWdodGAuXG4gICAqIFRoaXMgbWlnaHQgYmUgZHVlIHRvIGNoYW5nZXMgaW4gbWVhc3VyZW1lbnRzIHdoZW4gaGFuZGxpbmcgc3RpY2t5IG1ldGEgcm93cyAobW92aW5nIGJhY2sgYW5kIGZvcnRoKVxuICAgKlxuICAgKiBCZWNhdXNlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZHVtbXkgc3BhY2VyIGVsZW1lbnQgaXMgc2V0IHRocm91Z2ggREkgdGhlIGxheW91dCB3aWxsIHJ1biBpbiB0aGUgbmV4dCBtaWNyby10YXNrIGFmdGVyIHRoZSBjYWxsIHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYC5cbiAgICovXG4gIHNjcm9sbEhlaWdodCA9IDA7XG5cbiAgbmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IDA7XG4gIHBibEZpbGxlckhlaWdodDogc3RyaW5nO1xuXG4gIGdldCB3aGVlbE1vZGUoKTogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ10ge1xuICAgIHJldHVybiAodGhpcy5wYmxTY3JvbGxTdHJhdGVneSBhcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlKS53aGVlbE1vZGUgfHwgdGhpcy53aGVlbE1vZGVEZWZhdWx0IHx8ICdwYXNzaXZlJztcbiAgfVxuXG4gIGdldCBpbm5lcldpZHRoKCk6IG51bWJlciB7XG4gICAgY29uc3QgaW5uZXJXaWR0aEhlbHBlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZGstdmlydHVhbC1zY3JvbGwtaW5uZXItd2lkdGgnKSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gaW5uZXJXaWR0aEhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBvdXRlcldpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG5cbiAgZ2V0IGlubmVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgY29uc3QgaW5uZXJXaWR0aEhlbHBlciA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jZGstdmlydHVhbC1zY3JvbGwtaW5uZXItd2lkdGgnKSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gaW5uZXJXaWR0aEhlbHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICBnZXQgb3V0ZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB9XG5cbiAgLy8vIFRPRE8oc2hsb21pYXNzYWYpOiBSZW1vdmUgd2hlbiBub3Qgc3VwcG9ydGluZyA4LjEuMiBhbmQgYmVsb3dcbiAgLy8vIENPTVBBVElCSUxJVFkgOC4xLjItIDwtPiA4LjEuMytcbiAgICAvKiogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBgc3R5bGUud2lkdGhgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cbiAgICBfdG90YWxDb250ZW50V2lkdGggPSAnJztcbiAgICAvKiogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBgc3R5bGUuaGVpZ2h0YCBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB1c2VkIGZvciB0aGUgc3BhY2VyIGVsZW1lbnQuICovXG4gICBfdG90YWxDb250ZW50SGVpZ2h0ID0gJyc7XG4gICAgLyoqXG4gICAqIFRoZSB0cmFuc2Zvcm0gdXNlZCB0byBzY2FsZSB0aGUgc3BhY2VyIHRvIHRoZSBzYW1lIHNpemUgYXMgYWxsIGNvbnRlbnQsIGluY2x1ZGluZyBjb250ZW50IHRoYXRcbiAgICogaXMgbm90IGN1cnJlbnRseSByZW5kZXJlZC5cbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIF90b3RhbENvbnRlbnRTaXplVHJhbnNmb3JtID0gJyc7XG4gLy8vIENPTVBBVElCSUxJVFkgOC4xLjItIDwtPiA4LjEuMytcblxuICBwcml2YXRlIG9mZnNldENoYW5nZSQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIHByaXZhdGUgb2Zmc2V0OiBudW1iZXI7XG4gIHByaXZhdGUgaXNDRFBlbmRpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB3aGVlbE1vZGVEZWZhdWx0OiAgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFZJUlRVQUxfU0NST0xMX1NUUkFURUdZKSBwdWJsaWMgcGJsU2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZixcbiAgICAgICAgICBjZHIsXG4gICAgICAgICAgbmdab25lLFxuICAgICAgICAgIHBibFNjcm9sbFN0cmF0ZWd5ID0gcmVzb2x2ZVNjcm9sbFN0cmF0ZWd5KGNvbmZpZywgcGJsU2Nyb2xsU3RyYXRlZ3kpLFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyKTtcblxuICAgIGlmIChjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICAgIHRoaXMud2hlZWxNb2RlRGVmYXVsdCA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKS53aGVlbE1vZGU7XG4gICAgfVxuICAgIGNvbmZpZy5vblVwZGF0ZSgndmlydHVhbFNjcm9sbCcpLnBpcGUoVW5SeCh0aGlzKSkuc3Vic2NyaWJlKCBjaGFuZ2UgPT4gdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY2hhbmdlLmN1cnIud2hlZWxNb2RlKTtcblxuICAgIGlmIChwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHBibFNjcm9sbFN0cmF0ZWd5LnR5cGUgIT09ICd2U2Nyb2xsTm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9ICEocGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSk7XG4gICAgfVxuICAgIHBsdWdpbkN0cmwuZXh0QXBpLnNldFZpZXdwb3J0KHRoaXMpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlID0gdGhpcy5vZmZzZXRDaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ2RrU2Nyb2xsYWJsZS5wcm90b3R5cGUubmdPbkluaXQuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoICgpID0+IHRoaXMuaW5pdFNjcm9sbFdhdGNoZXIoKSApO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIC8vIElmIHZpcnR1YWwgc2Nyb2xsIGlzIGRpc2FibGVkIChgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgKSB3ZSBuZWVkIHRvIGRpc2FibGUgYW55IGVmZmVjdCBhcHBsaWVkXG4gICAgLy8gYnkgdGhlIHZpZXdwb3J0LCB3cmFwcGluZyB0aGUgY29udGVudCBpbmplY3RlZCB0byBpdC5cbiAgICAvLyBUaGUgbWFpbiBlZmZlY3QgaXMgdGhlIHRhYmxlIGhhdmluZyBoZWlnaHQgMCBhdCBhbGwgdGltZXMsIHVubGVzcyB0aGUgaGVpZ2h0IGlzIGV4cGxpY2l0bHkgc2V0LlxuICAgIC8vIFRoaXMgaGFwcGVucyBiZWNhdXNlIHRoZSBjb250ZW50IHRha2luZyBvdXQgb2YgdGhlIGxheW91dCwgd3JhcHBlZCBpbiBhYnNvbHV0ZSBwb3NpdGlvbmluZy5cbiAgICAvLyBBZGRpdGlvbmFsbHksIHRoZSBob3N0IGl0c2VsZiAodmlld3BvcnQpIGlzIHNldCB0byBjb250YWluOiBzdHJpY3QuXG4gICAgY29uc3QgeyB0YWJsZSB9ID0gdGhpcztcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICB0YWJsZS5fY2RrVGFibGUuYXR0YWNoVmlld1BvcnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLnNjcm9sbGluZ1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGlzU2Nyb2xsaW5nID0+IHtcbiAgICAgICAgdGhpcy5faXNTY3JvbGxpbmcgPSAhIWlzU2Nyb2xsaW5nO1xuICAgICAgICBpZiAoaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICB0YWJsZS5hZGRDbGFzcygncGJsLW5ncmlkLXNjcm9sbGluZycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRhYmxlLnJlbW92ZUNsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLm9mZnNldENoYW5nZSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHNldFRvdGFsQ29udGVudFNpemUoc2l6ZTogbnVtYmVyKSB7XG4gICAgc3VwZXIuc2V0VG90YWxDb250ZW50U2l6ZShzaXplKTtcblxuICAgIC8vIFRPRE8oc2hsb21pYXNzYWYpW3BlcmYsIDNdOiBydW4gdGhpcyBvbmNlLi4uIChhZ2dyZWdhdGUgYWxsIGNhbGxzIHdpdGhpbiB0aGUgc2FtZSBhbmltYXRpb24gZnJhbWUpXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0OyAvL3NpemU7XG4gICAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICAgICAgLy8gV2UgbXVzdCB0cmlnZ2VyIGEgY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBiZWNhdXNlIHRoZSBmaWxsZXIgZGl2IGVsZW1lbnQgaXMgdXBkYXRlZCB0aHJvdWdoIGJpbmRpbmdzXG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSlcbiAgfVxuXG4gIGNoZWNrVmlld3BvcnRTaXplKCkge1xuICAgIC8vIFRPRE86IENoZWNrIGZvciBjaGFuZ2VzIGluIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRgIHNvdXJjZSBjb2RlLCB3aGVuIHJlc2l6aW5nIGlzIGhhbmRsZWQhXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iLzI4ZmIzYWJlNzdjNTMzNmU0NzM5YzgyMDU4NGVjOTljMjNmMWFlMzgvc3JjL2Nkay9zY3JvbGxpbmcvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQudHMjTDM0MVxuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgIHN1cGVyLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgaWYgKHByZXYgIT09IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1lYXN1cmUgdGhlIGNvbWJpbmVkIHNpemUgb2YgYWxsIG9mIHRoZSByZW5kZXJlZCBpdGVtcy4gKi9cbiAgbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTogbnVtYmVyIHtcbiAgICBsZXQgc2l6ZSA9IHN1cGVyLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHNpemUgLT0gdGhpcy5zdGlja3lSb3dIZWFkZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5zdGlja3lSb3dGb290ZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBDb21wZW5zYXRlIGZvciBoeiBzY3JvbGwgYmFyLCBpZiBleGlzdHMsIG9ubHkgaW4gbm9uIHZpcnR1YWwgc2Nyb2xsIG1vZGUuXG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICBzaXplICs9IHRoaXMub3V0ZXJIZWlnaHQgLSB0aGlzLmlubmVySGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmlsbGVyKCk6IHZvaWQge1xuICAgIHRoaXMubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTtcbiAgICBpZiAodGhpcy50YWJsZS5ub0ZpbGxlcikge1xuICAgICAgdGhpcy5wYmxGaWxsZXJIZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKSA+PSB0aGlzLm5nZVJlbmRlcmVkQ29udGVudFNpemUgP1xuICAgICAgICBgY2FsYygxMDAlIC0gJHt0aGlzLm5nZVJlbmRlcmVkQ29udGVudFNpemV9cHgpYFxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgO1xuICAgIH1cbiAgfVxuXG4gIG9uU291cmNlTGVuZ3RoQ2hhbmdlKHByZXY6IG51bWJlciwgY3VycjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gIH1cblxuICBhdHRhY2goZm9yT2Y6IENka1ZpcnR1YWxGb3JPZjxhbnk+ICYgTmdlVmlydHVhbFRhYmxlUm93SW5mbykge1xuICAgIHN1cGVyLmF0dGFjaChmb3JPZik7XG4gICAgY29uc3Qgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVxuICAgICAgPyB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5Ll9zY3JvbGxTdHJhdGVneVxuICAgICAgOiB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5XG4gICAgO1xuICAgIGlmIChzY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpIHtcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LmF2ZXJhZ2VyLnNldFJvd0luZm8oZm9yT2YpO1xuICAgIH1cbiAgfVxuXG4gIHNldFJlbmRlcmVkQ29udGVudE9mZnNldChvZmZzZXQ6IG51bWJlciwgdG86ICd0by1zdGFydCcgfCAndG8tZW5kJyA9ICd0by1zdGFydCcpIHtcbiAgICBzdXBlci5zZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0LCB0byk7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgaWYgKHRoaXMub2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5pc0NEUGVuZGluZykge1xuICAgICAgICAgIHRoaXMuaXNDRFBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgY29uc3Qgc3luY1RyYW5zZm9ybSA9ICgpID0+IHsgfTtcblxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gc3luY1RyYW5zZm9ybSgpIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNDRFBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5vZmZzZXRDaGFuZ2UkLm5leHQodGhpcy5vZmZzZXQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIHNjcm9sbGluZyB3YXRjaGVyIHdoaWNoIHRyYWNrIHNjcm9sbCBldmVudHMgYW4gZW1pdHMgYHNjcm9sbGluZ2AgYW5kIGBzY3JvbGxGcmFtZVJhdGVgIGV2ZW50cy5cbiAgICovXG4gIHByaXZhdGUgaW5pdFNjcm9sbFdhdGNoZXIoKTogdm9pZCB7XG4gICAgbGV0IHNjcm9sbGluZyA9IDA7XG4gICAgbGV0IGxhc3RPZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICB0aGlzLmVsZW1lbnRTY3JvbGxlZCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLyogIGBzY3JvbGxpbmdgIGlzIGEgYm9vbGVhbiBmbGFnIHRoYXQgdHVybnMgb24gd2l0aCB0aGUgZmlyc3QgYHNjcm9sbGAgZXZlbnRzIGFuZCBlbmRzIGFmdGVyIDIgYnJvd3NlciBhbmltYXRpb24gZnJhbWVzIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBgc2Nyb2xsYCBldmVudC5cbiAgICAgICAgICAgIFRoaXMgaXMgYW4gYXR0ZW1wdCB0byBkZXRlY3QgYSBzY3JvbGwgZW5kIGV2ZW50LCB3aGljaCBkb2VzIG5vdCBleGlzdC5cblxuICAgICAgICAgICAgYHNjcm9sbEZyYW1lUmF0ZWAgaXMgYSBudW1iZXIgdGhhdCByZXByZXNlbnQgYSByb3VnaCBlc3RpbWF0aW9uIG9mIHRoZSBmcmFtZSByYXRlIGJ5IG1lYXN1cmluZyB0aGUgdGltZSBwYXNzZWQgYmV0d2VlbiBlYWNoIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgICAgICB3aGlsZSB0aGUgYHNjcm9sbGluZ2Agc3RhdGUgaXMgdHJ1ZS4gVGhlIGZyYW1lIHJhdGUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2UgZnJhbWUgcmF0ZSBmcm9tIGFsbCBtZWFzdXJlbWVudHMgc2luY2UgdGhlIHNjcm9sbGluZyBiZWdhbi5cbiAgICAgICAgICAgIFRvIGVzdGltYXRlIHRoZSBmcmFtZSByYXRlLCBhIHNpZ25pZmljYW50IG51bWJlciBvZiBtZWFzdXJlbWVudHMgaXMgcmVxdWlyZWQgc28gdmFsdWUgaXMgZW1pdHRlZCBldmVyeSA1MDAgbXMuXG4gICAgICAgICAgICBUaGlzIG1lYW5zIHRoYXQgYSBzaW5nbGUgc2Nyb2xsIG9yIHNob3J0IHNjcm9sbCBidXJzdHMgd2lsbCBub3QgcmVzdWx0IGluIGEgYHNjcm9sbEZyYW1lUmF0ZWAgZW1pc3Npb25zLlxuXG4gICAgICAgICovXG4gICAgICAgIGlmIChzY3JvbGxpbmcgPT09IDApIHtcbiAgICAgICAgICAvKiAgVGhlIG1lYXN1cmUgYXJyYXkgaG9sZHMgdmFsdWVzIHJlcXVpcmVkIGZvciBmcmFtZSByYXRlIG1lYXN1cmVtZW50cy5cbiAgICAgICAgICAgICAgWzBdIFN0b3JhZ2UgZm9yIGxhc3QgdGltZXN0YW1wIHRha2VuXG4gICAgICAgICAgICAgIFsxXSBUaGUgc3VtIG9mIGFsbCBtZWFzdXJlbWVudHMgdGFrZW4gKGEgbWVhc3VyZW1lbnQgaXMgdGhlIHRpbWUgYmV0d2VlbiAyIHNuYXBzaG90cylcbiAgICAgICAgICAgICAgWzJdIFRoZSBjb3VudCBvZiBhbGwgbWVhc3VyZW1lbnRzXG4gICAgICAgICAgICAgIFszXSBUaGUgc3VtIG9mIGFsbCBtZWFzdXJlbWVudHMgdGFrZW4gV0lUSElOIHRoZSBjdXJyZW50IGJ1ZmZlciB3aW5kb3cuIFRoaXMgYnVmZmVyIGlzIGZsdXNoZWQgaW50byBbMV0gZXZlcnkgWCBtcyAoc2VlIGJ1Z2dlcldpbmRvdyBjb25zdCkuXG4gICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBidWZmZXJXaW5kb3cgPSA0OTk7XG4gICAgICAgICAgY29uc3QgbWVhc3VyZSA9IFsgcGVyZm9ybWFuY2Uubm93KCksIDAsIDAsIDAgXTtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICBpZiAobGFzdE9mZnNldCA9PT0gb2Zmc2V0KSB7IHJldHVybjsgfVxuICAgICAgICAgIGNvbnN0IGRlbHRhID0gbGFzdE9mZnNldCA8IG9mZnNldCA/IDEgOiAtMTtcblxuICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nLm5leHQoZGVsdGEpO1xuXG4gICAgICAgICAgY29uc3QgcmFmID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IC1tZWFzdXJlWzBdICsgKG1lYXN1cmVbMF0gPSBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgICAgICBpZiAodGltZSA+IDUpIHtcbiAgICAgICAgICAgICAgbWVhc3VyZVsxXSArPSB0aW1lO1xuICAgICAgICAgICAgICBtZWFzdXJlWzJdICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2Nyb2xsaW5nID09PSAtMSkge1xuICAgICAgICAgICAgICBzY3JvbGxpbmcgPSAwO1xuICAgICAgICAgICAgICBsYXN0T2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nLm5leHQoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG1lYXN1cmVbMV0gPiBidWZmZXJXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICBtZWFzdXJlWzNdICs9IG1lYXN1cmVbMV07XG4gICAgICAgICAgICAgICAgbWVhc3VyZVsxXSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxGcmFtZVJhdGUuZW1pdCgxMDAwIC8gKG1lYXN1cmVbM10vbWVhc3VyZVsyXSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNjcm9sbGluZyA9IHNjcm9sbGluZyA9PT0gMSA/IC0xIDogMTtcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgfVxuICAgICAgICBzY3JvbGxpbmcrKztcbiAgICAgIH0pO1xuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIENTU1N0eWxlRGVjbGFyYXRpb24ge1xuICAgIGNvbnRhaW46ICdub25lJyB8ICdzdHJpY3QnIHwgJ2NvbnRlbnQnIHwgJ3NpemUnIHwgJ2xheW91dCcgfCAnc3R5bGUnIHwgJ3BhaW50JyB8ICdpbmhlcml0JyB8ICdpbml0aWFsJyB8ICd1bnNldCc7XG4gIH1cbn1cbiJdfQ==