/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/virtual-scroll-viewport.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends } from "tslib";
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
        var virtualScrollConfig = config.get('virtualScroll');
        if (typeof virtualScrollConfig.defaultStrategy === 'function') {
            scrollStrategy = virtualScrollConfig.defaultStrategy();
        }
    }
    return scrollStrategy || new TableAutoSizeVirtualScrollStrategy(100, 200);
}
var PblCdkVirtualScrollViewportComponent = /** @class */ (function (_super) {
    __extends(PblCdkVirtualScrollViewportComponent, _super);
    function PblCdkVirtualScrollViewportComponent(elementRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, pluginCtrl, grid) {
        var _this = _super.call(this, elementRef, cdr, ngZone, pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy), dir, scrollDispatcher) || this;
        _this.cdr = cdr;
        _this.pblScrollStrategy = pblScrollStrategy;
        _this.grid = grid;
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
        _this.scrolling = new EventEmitter();
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
        _this.scrollFrameRate = new EventEmitter();
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
        _this.scrollHeight = 0;
        _this.ngeRenderedContentSize = 0;
        /// TODO(shlomiassaf): Remove when not supporting 8.1.2 and below
        /// COMPATIBILITY 8.1.2- <-> 8.1.3+
        /**
         * A string representing the `style.width` property value to be used for the spacer element.
         */
        _this._totalContentWidth = '';
        /**
         * A string representing the `style.height` property value to be used for the spacer element.
         */
        _this._totalContentHeight = '';
        /**
         * The transform used to scale the spacer to the same size as all content, including content that
         * is not currently rendered.
         * @deprecated
         */
        _this._totalContentSizeTransform = '';
        _this.offsetChange$ = new Subject();
        _this._isScrolling = false;
        if (config.has('virtualScroll')) {
            _this.wheelModeDefault = config.get('virtualScroll').wheelMode;
        }
        config.onUpdate('virtualScroll').pipe(unrx(_this)).subscribe((/**
         * @param {?} change
         * @return {?}
         */
        function (change) { return _this.wheelModeDefault = change.curr.wheelMode; }));
        if (pblScrollStrategy instanceof PblCdkVirtualScrollDirective) {
            _this.enabled = pblScrollStrategy.type !== 'vScrollNone';
        }
        else {
            _this.enabled = !(pblScrollStrategy instanceof NoVirtualScrollStrategy);
        }
        pluginCtrl.extApi.setViewport(_this);
        _this.offsetChange = _this.offsetChange$.asObservable();
        _this._minWidth$ = grid.columnApi.totalColumnWidthChange;
        return _this;
    }
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "isScrolling", {
        get: /**
         * @return {?}
         */
        function () { return this._isScrolling; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "wheelMode", {
        get: /**
         * @return {?}
         */
        function () {
            return ((/** @type {?} */ (this.pblScrollStrategy))).wheelMode || this.wheelModeDefault || 'passive';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "innerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
            return innerWidthHelper.getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "outerWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "innerHeight", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var innerWidthHelper = (/** @type {?} */ (this.elementRef.nativeElement.querySelector('.cdk-virtual-scroll-inner-width')));
            return innerWidthHelper.getBoundingClientRect().height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "outerHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.getBoundingClientRect().height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCdkVirtualScrollViewportComponent.prototype, "scrollWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.elementRef.nativeElement.scrollWidth;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.enabled) {
            _super.prototype.ngOnInit.call(this);
        }
        else {
            CdkScrollable.prototype.ngOnInit.call(this);
        }
        this.ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () { return _this.initScrollWatcher(); }));
    };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // If virtual scroll is disabled (`NoVirtualScrollStrategy`) we need to disable any effect applied
        // by the viewport, wrapping the content injected to it.
        // The main effect is the grid having height 0 at all times, unless the height is explicitly set.
        // This happens because the content taking out of the layout, wrapped in absolute positioning.
        // Additionally, the host itself (viewport) is set to contain: strict.
        var grid = this.grid;
        if (this.enabled) {
            grid._cdkTable.attachViewPort();
        }
        this.scrolling
            .pipe(unrx(this))
            .subscribe((/**
         * @param {?} isScrolling
         * @return {?}
         */
        function (isScrolling) {
            _this._isScrolling = !!isScrolling;
            if (isScrolling) {
                grid.addClass('pbl-ngrid-scrolling');
            }
            else {
                grid.removeClass('pbl-ngrid-scrolling');
            }
        }));
    };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this.offsetChange$.complete();
        unrx.kill(this);
    };
    /**
     * @param {?} size
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.setTotalContentSize = /**
     * @param {?} size
     * @return {?}
     */
    function (size) {
        var _this = this;
        _super.prototype.setTotalContentSize.call(this, size);
        // TODO(shlomiassaf)[perf, 3]: run this once... (aggregate all calls within the same animation frame)
        requestAnimationFrame((/**
         * @return {?}
         */
        function () {
            _this.scrollHeight = _this.elementRef.nativeElement.scrollHeight; //size;
            _this.updateFiller();
            // We must trigger a change detection cycle because the filler div element is updated through bindings
            _this.cdr.markForCheck();
        }));
    };
    /**
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.checkViewportSize = /**
     * @return {?}
     */
    function () {
        // TODO: Check for changes in `CdkVirtualScrollViewport` source code, when resizing is handled!
        // see https://github.com/angular/material2/blob/28fb3abe77c5336e4739c820584ec99c23f1ae38/src/cdk/scrolling/virtual-scroll-viewport.ts#L341
        /** @type {?} */
        var prev = this.getViewportSize();
        _super.prototype.checkViewportSize.call(this);
        if (prev !== this.getViewportSize()) {
            this.updateFiller();
        }
    };
    /** Measure the combined size of all of the rendered items. */
    /**
     * Measure the combined size of all of the rendered items.
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.measureRenderedContentSize = /**
     * Measure the combined size of all of the rendered items.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var size = _super.prototype.measureRenderedContentSize.call(this);
        if (this.orientation === 'vertical') {
            size -= this.stickyRowHeaderContainer.offsetHeight + this.stickyRowFooterContainer.offsetHeight;
            // Compensate for hz scroll bar, if exists, only in non virtual scroll mode.
            if (!this.enabled) {
                size += this.outerHeight - this.innerHeight;
            }
        }
        return this.ngeRenderedContentSize = size;
    };
    /**
     * @private
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.updateFiller = /**
     * @private
     * @return {?}
     */
    function () {
        this.measureRenderedContentSize();
        if (this.grid.noFiller) {
            this.pblFillerHeight = undefined;
        }
        else {
            this.pblFillerHeight = this.getViewportSize() >= this.ngeRenderedContentSize ?
                "calc(100% - " + this.ngeRenderedContentSize + "px)"
                : undefined;
        }
    };
    /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.onSourceLengthChange = /**
     * @param {?} prev
     * @param {?} curr
     * @return {?}
     */
    function (prev, curr) {
        this.checkViewportSize();
        this.updateFiller();
    };
    /**
     * @param {?} forOf
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.attach = /**
     * @param {?} forOf
     * @return {?}
     */
    function (forOf) {
        _super.prototype.attach.call(this, forOf);
        /** @type {?} */
        var scrollStrategy = this.pblScrollStrategy instanceof PblCdkVirtualScrollDirective
            ? this.pblScrollStrategy._scrollStrategy
            : this.pblScrollStrategy;
        if (scrollStrategy instanceof TableAutoSizeVirtualScrollStrategy) {
            scrollStrategy.averager.setRowInfo(forOf);
        }
    };
    /**
     * @param {?} offset
     * @param {?=} to
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.setRenderedContentOffset = /**
     * @param {?} offset
     * @param {?=} to
     * @return {?}
     */
    function (offset, to) {
        var _this = this;
        if (to === void 0) { to = 'to-start'; }
        _super.prototype.setRenderedContentOffset.call(this, offset, to);
        if (this.enabled) {
            if (this.offset !== offset) {
                this.offset = offset;
                if (!this.isCDPending) {
                    this.isCDPending = true;
                    /** @type {?} */
                    var syncTransform_1 = (/**
                     * @return {?}
                     */
                    function () { });
                    this.ngZone.runOutsideAngular((/**
                     * @return {?}
                     */
                    function () { return Promise.resolve()
                        .then((/**
                     * @return {?}
                     */
                    function () { return syncTransform_1(); }))
                        .then((/**
                     * @return {?}
                     */
                    function () {
                        _this.isCDPending = false;
                        _this.offsetChange$.next(_this.offset);
                    })); }));
                }
            }
        }
    };
    /**
     * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
     */
    /**
     * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
     * @private
     * @return {?}
     */
    PblCdkVirtualScrollViewportComponent.prototype.initScrollWatcher = /**
     * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var scrolling = 0;
        /** @type {?} */
        var lastOffset = this.measureScrollOffset();
        this.elementScrolled()
            .subscribe((/**
         * @return {?}
         */
        function () {
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
                var bufferWindow_1 = 499;
                /** @type {?} */
                var measure_1 = [performance.now(), 0, 0, 0];
                /** @type {?} */
                var offset = _this.measureScrollOffset();
                if (lastOffset === offset) {
                    return;
                }
                /** @type {?} */
                var delta = lastOffset < offset ? 1 : -1;
                _this.scrolling.next(delta);
                /** @type {?} */
                var raf_1 = (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var time = -measure_1[0] + (measure_1[0] = performance.now());
                    if (time > 5) {
                        measure_1[1] += time;
                        measure_1[2] += 1;
                    }
                    if (scrolling === -1) {
                        scrolling = 0;
                        lastOffset = _this.measureScrollOffset();
                        _this.scrolling.next(0);
                    }
                    else {
                        if (measure_1[1] > bufferWindow_1) {
                            measure_1[3] += measure_1[1];
                            measure_1[1] = 0;
                            _this.scrollFrameRate.emit(1000 / (measure_1[3] / measure_1[2]));
                        }
                        scrolling = scrolling === 1 ? -1 : 1;
                        requestAnimationFrame(raf_1);
                    }
                });
                requestAnimationFrame(raf_1);
            }
            scrolling++;
        }));
    };
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
    PblCdkVirtualScrollViewportComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: PblNgridConfigService },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [VIRTUAL_SCROLL_STRATEGY,] }] },
        { type: Directionality, decorators: [{ type: Optional }] },
        { type: ScrollDispatcher },
        { type: PblNgridPluginController },
        { type: PblNgridComponent }
    ]; };
    PblCdkVirtualScrollViewportComponent.propDecorators = {
        stickyRowHeaderContainer: [{ type: Input }],
        stickyRowFooterContainer: [{ type: Input }],
        scrolling: [{ type: Output }],
        scrollFrameRate: [{ type: Output }]
    };
    return PblCdkVirtualScrollViewportComponent;
}(CdkVirtualScrollViewport));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUV2QixnQkFBZ0IsRUFFaEIsYUFBYSxHQUNkLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsdUJBQXVCLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7OztBQVl6SCxTQUFTLHFCQUFxQixDQUFDLE1BQTZCLEVBQUUsY0FBc0M7SUFDbEcsSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFOztZQUM1QyxtQkFBbUIsR0FBRyxNQUFNLENBQUMs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QUVqQixNQUFNO2dCQW1CQyxxQkFBcUI7Z0RBNEpmLFFBQVEsWUFBSSxNQUFNLFNBQUMsdUJBQXVCO2dCQXhLaEQsY0FBYyx1QkF5S1IsUUFBUTtnQkFwS3JCLGdCQUFnQjtnQkFNVCx3QkFBd0I7Z0JBRXhCLGlCQUFpQjs7OzJDQWtEdkIsS0FBSzsyQ0FDTCxLQUFLOzRCQWNMLE1BQU07a0NBbUJOLE1BQU07O0lBeVJULDJDQUFDO0NBQUEsQUFyVkQsQ0FhMEQsd0JBQXdCLEdBd1VqRjtTQXhVWSxvQ0FBb0M7OztJQUcvQyx1REFBMEI7Ozs7Ozs7O0lBUTFCLDREQUEwQzs7SUFFMUMsd0VBQStDOztJQUMvQyx3RUFBK0M7Ozs7Ozs7Ozs7Ozs7O0lBYy9DLHlEQUF1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CdkQsK0RBQXVEOzs7Ozs7Ozs7Ozs7O0lBYXZELDREQUFpQjs7SUFFakIsc0VBQTJCOztJQUMzQiwrREFBd0I7Ozs7O0lBK0J0QixrRUFBd0I7Ozs7O0lBRXpCLG1FQUF5Qjs7Ozs7OztJQU0xQiwwRUFBZ0M7O0lBR2hDLDBEQUF3Qzs7Ozs7SUFFeEMsNkRBQThDOzs7OztJQUM5QyxzREFBdUI7Ozs7O0lBQ3ZCLDJEQUE2Qjs7Ozs7SUFDN0IsNERBQTZCOzs7OztJQUU3QixnRUFBcUU7Ozs7O0lBR3pELG1EQUE4Qjs7SUFHOUIsaUVBQTRGOzs7OztJQUk1RixvREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgT3B0aW9uYWwsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsXG4gIFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gIFNjcm9sbERpc3BhdGNoZXIsXG4gIENka1ZpcnR1YWxGb3JPZixcbiAgQ2RrU2Nyb2xsYWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IHVucnggfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzJztcbmltcG9ydCB7IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8gfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5cbmRlY2xhcmUgbW9kdWxlICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICB2aXJ0dWFsU2Nyb2xsPzoge1xuICAgICAgd2hlZWxNb2RlPzogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XG4gICAgICBkZWZhdWx0U3RyYXRlZ3k/KCk6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVNjcm9sbFN0cmF0ZWd5KGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBzY3JvbGxTdHJhdGVneT86IFZpcnR1YWxTY3JvbGxTdHJhdGVneSk6IFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIGlmICghc2Nyb2xsU3RyYXRlZ3kgJiYgY29uZmlnLmhhcygndmlydHVhbFNjcm9sbCcpKSB7XG4gICAgY29uc3QgdmlydHVhbFNjcm9sbENvbmZpZyA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKTtcbiAgICBpZiAodHlwZW9mIHZpcnR1YWxTY3JvbGxDb25maWcuZGVmYXVsdFN0cmF0ZWd5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzY3JvbGxTdHJhdGVneSA9IHZpcnR1YWxTY3JvbGxDb25maWcuZGVmYXVsdFN0cmF0ZWd5KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFN0cmF0ZWd5IHx8IG5ldyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KDEwMCwgMjAwKTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcsXG4gIHRlbXBsYXRlVXJsOiAndmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LnNjc3MnIF0sXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICBjbGFzczogJ2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtZGlzYWJsZWRdJzogJyFlbmFibGVkJyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi1ob3Jpem9udGFsXSc6ICdvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLXZlcnRpY2FsXSc6ICdvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgZXh0ZW5kcyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgZ2V0IGlzU2Nyb2xsaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNTY3JvbGxpbmc7IH1cbiAgcmVhZG9ubHkgZW5hYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBvZiB0aGUgcmVuZGVyZWQgY29udGVudCBldmVyeSB0aW1lIGl0IGNoYW5nZXMuXG4gICAqIFRoZSBlbWlzc2lvbiBpcyBkb25lIE9VVFNJREUgb2YgYW5ndWxhciAoaS5lLiBubyBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGlzIHRyaWdnZXJlZCkuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIG5vdCBlbmFibGVkIChpLmUgYE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5YCBpcyB1c2VkKSB0aGVyZSBhcmUgbm8gZW1pc3Npb25zLlxuICAgKi9cbiAgcmVhZG9ubHkgb2Zmc2V0Q2hhbmdlOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgQElucHV0KCkgc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgQElucHV0KCkgc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBzY3JvbGxpbmcgc3RhdGUgb2Ygcm93cyBpbiB0aGUgZ3JpZCBjaGFuZ2VzLlxuICAgKiBXaGVuIHNjcm9sbGluZyBzdGFydHMgYHRydWVgIGlzIGVtaXR0ZWQgYW5kIHdoZW4gdGhlIHNjcm9sbGluZyBlbmRzIGBmYWxzZWAgaXMgZW1pdHRlZC5cbiAgICpcbiAgICogVGhlIGdyaWQgaXMgaW4gXCJzY3JvbGxpbmdcIiBzdGF0ZSBmcm9tIHRoZSBmaXJzdCBzY3JvbGwgZXZlbnQgYW5kIHVudGlsIDIgYW5pbWF0aW9uIGZyYW1lc1xuICAgKiBoYXZlIHBhc3NlZCB3aXRob3V0IGEgc2Nyb2xsIGV2ZW50LlxuICAgKlxuICAgKiBXaGVuIHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgdGhlIGRpcmVjdGlvbjogLTEgb3IgMVxuICAgKiBXaGVuIG5vdCBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIDAuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsaW5nID0gbmV3IEV2ZW50RW1pdHRlcjwgLTEgfCAwIHwgMSA+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGVzdGltYXRpb24gb2YgdGhlIGN1cnJlbnQgZnJhbWUgcmF0ZSB3aGlsZSBzY3JvbGxpbmcsIGluIGEgNTAwbXMgaW50ZXJ2YWwuXG4gICAqXG4gICAqIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAqIFRvIGVzdGltYXRlIHRoZSBmcmFtZSByYXRlLCBhIHNpZ25pZmljYW50IG51bWJlciBvZiBtZWFzdXJlbWVudHMgaXMgcmVxdWlyZWQgc28gdmFsdWUgaXMgZW1pdHRlZCBldmVyeSA1MDAgbXMuXG4gICAqIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXG4gICAqXG4gICAqIFZhbGlkIG9uIHdoZW4gdmlydHVhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICpcbiAgICogSW4gdGhlIGZ1dHVyZSB0aGUgbWVhc3VyZW1lbnQgbG9naWMgbWlnaHQgYmUgcmVwbGFjZWQgd2l0aCB0aGUgRnJhbWUgVGltaW5nIEFQSVxuICAgKiBTZWU6XG4gICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNC8xMS9mcmFtZS10aW1pbmctYXBpXG4gICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1BlcmZvcm1hbmNlT2JzZXJ2ZXJcbiAgICogLSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlYXJjaGl2ZS9mcmFtZS10aW1pbmctcG9seWZpbGwvd2lraS9FeHBsYWluZXJcbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxGcmFtZVJhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogVGhlIGBzY3JvbGxIZWlnaHRgIG9mIHRoZSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydC5cbiAgICogVGhlIGBzY3JvbGxIZWlnaHRgIGlzIHVwZGF0ZWQgYnkgdGhlIHZpcnR1YWwgc2Nyb2xsICh1cGRhdGUgbG9naWMgYW5kIGZyZXF1ZW5jeSBkZXBlbmRzIG9uIHRoZSBzdHJhdGVneSBpbXBsZW1lbnRhdGlvbikgdGhyb3VnaFxuICAgKiB0aGUgYHNldFRvdGFsQ29udGVudFNpemUoc2l6ZSlgIG1ldGhvZC4gVGhlIGlucHV0IHNpemUgaXMgdXNlZCB0byBwb3NpdGlvbiBhIGR1bW15IHNwYWNlciBlbGVtZW50IGF0IGEgcG9zaXRpb24gdGhhdCBtaW1pY3MgdGhlIGBzY3JvbGxIZWlnaHRgLlxuICAgKlxuICAgKiBJbiB0aGVvcnksIHRoZSBzaXplIHNlbnQgdG8gYHNldFRvdGFsQ29udGVudFNpemVgIHNob3VsZCBlcXVhbCB0aGUgYHNjcm9sbEhlaWdodGAgdmFsdWUsIG9uY2UgdGhlIGJyb3dzZXIgdXBkYXRlJ3MgdGhlIGxheW91dC5cbiAgICogSW4gcmVhbGl0eSBpdCBkb2VzIG5vdCBoYXBwZW4sIHNvbWV0aW1lcyB0aGV5IGFyZSBub3QgZXF1YWwuIFNldHRpbmcgYSBzaXplIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50IGBzY3JvbGxIZWlnaHRgLlxuICAgKiBUaGlzIG1pZ2h0IGJlIGR1ZSB0byBjaGFuZ2VzIGluIG1lYXN1cmVtZW50cyB3aGVuIGhhbmRsaW5nIHN0aWNreSBtZXRhIHJvd3MgKG1vdmluZyBiYWNrIGFuZCBmb3J0aClcbiAgICpcbiAgICogQmVjYXVzZSB0aGUgcG9zaXRpb24gb2YgdGhlIGR1bW15IHNwYWNlciBlbGVtZW50IGlzIHNldCB0aHJvdWdoIERJIHRoZSBsYXlvdXQgd2lsbCBydW4gaW4gdGhlIG5leHQgbWljcm8tdGFzayBhZnRlciB0aGUgY2FsbCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAuXG4gICAqL1xuICBzY3JvbGxIZWlnaHQgPSAwO1xuXG4gIG5nZVJlbmRlcmVkQ29udGVudFNpemUgPSAwO1xuICBwYmxGaWxsZXJIZWlnaHQ6IHN0cmluZztcblxuICBnZXQgd2hlZWxNb2RlKCk6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddIHtcbiAgICByZXR1cm4gKHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kgYXMgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkud2hlZWxNb2RlIHx8IHRoaXMud2hlZWxNb2RlRGVmYXVsdCB8fCAncGFzc2l2ZSc7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlubmVyV2lkdGhIZWxwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLXZpcnR1YWwtc2Nyb2xsLWlubmVyLXdpZHRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGlubmVyV2lkdGhIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgb3V0ZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBpbm5lckhlaWdodCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlubmVyV2lkdGhIZWxwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLXZpcnR1YWwtc2Nyb2xsLWlubmVyLXdpZHRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGlubmVyV2lkdGhIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0IG91dGVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIGdldCBzY3JvbGxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgfVxuXG4gIC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIHdoZW4gbm90IHN1cHBvcnRpbmcgOC4xLjIgYW5kIGJlbG93XG4gIC8vLyBDT01QQVRJQklMSVRZIDguMS4yLSA8LT4gOC4xLjMrXG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLndpZHRoYCBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB1c2VkIGZvciB0aGUgc3BhY2VyIGVsZW1lbnQuICovXG4gICAgX3RvdGFsQ29udGVudFdpZHRoID0gJyc7XG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLmhlaWdodGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgX3RvdGFsQ29udGVudEhlaWdodCA9ICcnO1xuICAgIC8qKlxuICAgKiBUaGUgdHJhbnNmb3JtIHVzZWQgdG8gc2NhbGUgdGhlIHNwYWNlciB0byB0aGUgc2FtZSBzaXplIGFzIGFsbCBjb250ZW50LCBpbmNsdWRpbmcgY29udGVudCB0aGF0XG4gICAqIGlzIG5vdCBjdXJyZW50bHkgcmVuZGVyZWQuXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBfdG90YWxDb250ZW50U2l6ZVRyYW5zZm9ybSA9ICcnO1xuIC8vLyBDT01QQVRJQklMSVRZIDguMS4yLSA8LT4gOC4xLjMrXG5cbiAgcmVhZG9ubHkgX21pbldpZHRoJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgb2Zmc2V0Q2hhbmdlJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0NEUGVuZGluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHdoZWVsTW9kZURlZmF1bHQ6ICBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kpIHB1YmxpYyBwYmxTY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsXG4gICAgICAgICAgY2RyLFxuICAgICAgICAgIG5nWm9uZSxcbiAgICAgICAgICBwYmxTY3JvbGxTdHJhdGVneSA9IHJlc29sdmVTY3JvbGxTdHJhdGVneShjb25maWcsIHBibFNjcm9sbFN0cmF0ZWd5KSxcbiAgICAgICAgICBkaXIsXG4gICAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcik7XG5cbiAgICBpZiAoY29uZmlnLmhhcygndmlydHVhbFNjcm9sbCcpKSB7XG4gICAgICB0aGlzLndoZWVsTW9kZURlZmF1bHQgPSBjb25maWcuZ2V0KCd2aXJ0dWFsU2Nyb2xsJykud2hlZWxNb2RlO1xuICAgIH1cbiAgICBjb25maWcub25VcGRhdGUoJ3ZpcnR1YWxTY3JvbGwnKS5waXBlKHVucngodGhpcykpLnN1YnNjcmliZSggY2hhbmdlID0+IHRoaXMud2hlZWxNb2RlRGVmYXVsdCA9IGNoYW5nZS5jdXJyLndoZWVsTW9kZSk7XG5cbiAgICBpZiAocGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPSBwYmxTY3JvbGxTdHJhdGVneS50eXBlICE9PSAndlNjcm9sbE5vbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPSAhKHBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpO1xuICAgIH1cbiAgICBwbHVnaW5DdHJsLmV4dEFwaS5zZXRWaWV3cG9ydCh0aGlzKTtcbiAgICB0aGlzLm9mZnNldENoYW5nZSA9IHRoaXMub2Zmc2V0Q2hhbmdlJC5hc09ic2VydmFibGUoKTtcblxuICAgIHRoaXMuX21pbldpZHRoJCA9IGdyaWQuY29sdW1uQXBpLnRvdGFsQ29sdW1uV2lkdGhDaGFuZ2U7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDZGtTY3JvbGxhYmxlLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4gdGhpcy5pbml0U2Nyb2xsV2F0Y2hlcigpICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgKGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWApIHdlIG5lZWQgdG8gZGlzYWJsZSBhbnkgZWZmZWN0IGFwcGxpZWRcbiAgICAvLyBieSB0aGUgdmlld3BvcnQsIHdyYXBwaW5nIHRoZSBjb250ZW50IGluamVjdGVkIHRvIGl0LlxuICAgIC8vIFRoZSBtYWluIGVmZmVjdCBpcyB0aGUgZ3JpZCBoYXZpbmcgaGVpZ2h0IDAgYXQgYWxsIHRpbWVzLCB1bmxlc3MgdGhlIGhlaWdodCBpcyBleHBsaWNpdGx5IHNldC5cbiAgICAvLyBUaGlzIGhhcHBlbnMgYmVjYXVzZSB0aGUgY29udGVudCB0YWtpbmcgb3V0IG9mIHRoZSBsYXlvdXQsIHdyYXBwZWQgaW4gYWJzb2x1dGUgcG9zaXRpb25pbmcuXG4gICAgLy8gQWRkaXRpb25hbGx5LCB0aGUgaG9zdCBpdHNlbGYgKHZpZXdwb3J0KSBpcyBzZXQgdG8gY29udGFpbjogc3RyaWN0LlxuICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcztcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBncmlkLl9jZGtUYWJsZS5hdHRhY2hWaWV3UG9ydCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsaW5nXG4gICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggaXNTY3JvbGxpbmcgPT4ge1xuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9ICEhaXNTY3JvbGxpbmc7XG4gICAgICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgICAgIGdyaWQuYWRkQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBncmlkLnJlbW92ZUNsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLm9mZnNldENoYW5nZSQuY29tcGxldGUoKTtcbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBzZXRUb3RhbENvbnRlbnRTaXplKHNpemU6IG51bWJlcikge1xuICAgIHN1cGVyLnNldFRvdGFsQ29udGVudFNpemUoc2l6ZSk7XG5cbiAgICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCAzXTogcnVuIHRoaXMgb25jZS4uLiAoYWdncmVnYXRlIGFsbCBjYWxscyB3aXRoaW4gdGhlIHNhbWUgYW5pbWF0aW9uIGZyYW1lKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDsgLy9zaXplO1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICAgIC8vIFdlIG11c3QgdHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgYmVjYXVzZSB0aGUgZmlsbGVyIGRpdiBlbGVtZW50IGlzIHVwZGF0ZWQgdGhyb3VnaCBiaW5kaW5nc1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSlcbiAgfVxuXG4gIGNoZWNrVmlld3BvcnRTaXplKCkge1xuICAgIC8vIFRPRE86IENoZWNrIGZvciBjaGFuZ2VzIGluIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRgIHNvdXJjZSBjb2RlLCB3aGVuIHJlc2l6aW5nIGlzIGhhbmRsZWQhXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iLzI4ZmIzYWJlNzdjNTMzNmU0NzM5YzgyMDU4NGVjOTljMjNmMWFlMzgvc3JjL2Nkay9zY3JvbGxpbmcvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQudHMjTDM0MVxuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgIHN1cGVyLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgaWYgKHByZXYgIT09IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1lYXN1cmUgdGhlIGNvbWJpbmVkIHNpemUgb2YgYWxsIG9mIHRoZSByZW5kZXJlZCBpdGVtcy4gKi9cbiAgbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTogbnVtYmVyIHtcbiAgICBsZXQgc2l6ZSA9IHN1cGVyLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHNpemUgLT0gdGhpcy5zdGlja3lSb3dIZWFkZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5zdGlja3lSb3dGb290ZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBDb21wZW5zYXRlIGZvciBoeiBzY3JvbGwgYmFyLCBpZiBleGlzdHMsIG9ubHkgaW4gbm9uIHZpcnR1YWwgc2Nyb2xsIG1vZGUuXG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICBzaXplICs9IHRoaXMub3V0ZXJIZWlnaHQgLSB0aGlzLmlubmVySGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmlsbGVyKCk6IHZvaWQge1xuICAgIHRoaXMubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTtcbiAgICBpZiAodGhpcy5ncmlkLm5vRmlsbGVyKSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYmxGaWxsZXJIZWlnaHQgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpID49IHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA/XG4gICAgICAgIGBjYWxjKDEwMCUgLSAke3RoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZX1weClgXG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgICA7XG4gICAgfVxuICB9XG5cbiAgb25Tb3VyY2VMZW5ndGhDaGFuZ2UocHJldjogbnVtYmVyLCBjdXJyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgfVxuXG4gIGF0dGFjaChmb3JPZjogQ2RrVmlydHVhbEZvck9mPGFueT4gJiBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvKSB7XG4gICAgc3VwZXIuYXR0YWNoKGZvck9mKTtcbiAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlXG4gICAgICA/IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kuX3Njcm9sbFN0cmF0ZWd5XG4gICAgICA6IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3lcbiAgICA7XG4gICAgaWYgKHNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSkge1xuICAgICAgc2Nyb2xsU3RyYXRlZ3kuYXZlcmFnZXIuc2V0Um93SW5mbyhmb3JPZik7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldDogbnVtYmVyLCB0bzogJ3RvLXN0YXJ0JyB8ICd0by1lbmQnID0gJ3RvLXN0YXJ0Jykge1xuICAgIHN1cGVyLnNldFJlbmRlcmVkQ29udGVudE9mZnNldChvZmZzZXQsIHRvKTtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ0RQZW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICBjb25zdCBzeW5jVHJhbnNmb3JtID0gKCkgPT4geyB9O1xuXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBzeW5jVHJhbnNmb3JtKCkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLm9mZnNldENoYW5nZSQubmV4dCh0aGlzLm9mZnNldCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgc2Nyb2xsaW5nIHdhdGNoZXIgd2hpY2ggdHJhY2sgc2Nyb2xsIGV2ZW50cyBhbiBlbWl0cyBgc2Nyb2xsaW5nYCBhbmQgYHNjcm9sbEZyYW1lUmF0ZWAgZXZlbnRzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0U2Nyb2xsV2F0Y2hlcigpOiB2b2lkIHtcbiAgICBsZXQgc2Nyb2xsaW5nID0gMDtcbiAgICBsZXQgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgIHRoaXMuZWxlbWVudFNjcm9sbGVkKClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvKiAgYHNjcm9sbGluZ2AgaXMgYSBib29sZWFuIGZsYWcgdGhhdCB0dXJucyBvbiB3aXRoIHRoZSBmaXJzdCBgc2Nyb2xsYCBldmVudHMgYW5kIGVuZHMgYWZ0ZXIgMiBicm93c2VyIGFuaW1hdGlvbiBmcmFtZXMgaGF2ZSBwYXNzZWQgd2l0aG91dCBhIGBzY3JvbGxgIGV2ZW50LlxuICAgICAgICAgICAgVGhpcyBpcyBhbiBhdHRlbXB0IHRvIGRldGVjdCBhIHNjcm9sbCBlbmQgZXZlbnQsIHdoaWNoIGRvZXMgbm90IGV4aXN0LlxuXG4gICAgICAgICAgICBgc2Nyb2xsRnJhbWVSYXRlYCBpcyBhIG51bWJlciB0aGF0IHJlcHJlc2VudCBhIHJvdWdoIGVzdGltYXRpb24gb2YgdGhlIGZyYW1lIHJhdGUgYnkgbWVhc3VyaW5nIHRoZSB0aW1lIHBhc3NlZCBiZXR3ZWVuIGVhY2ggcmVxdWVzdCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgICAgIHdoaWxlIHRoZSBgc2Nyb2xsaW5nYCBzdGF0ZSBpcyB0cnVlLiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgICAgICAgICAgVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cbiAgICAgICAgICAgIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXG5cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gMCkge1xuICAgICAgICAgIC8qICBUaGUgbWVhc3VyZSBhcnJheSBob2xkcyB2YWx1ZXMgcmVxdWlyZWQgZm9yIGZyYW1lIHJhdGUgbWVhc3VyZW1lbnRzLlxuICAgICAgICAgICAgICBbMF0gU3RvcmFnZSBmb3IgbGFzdCB0aW1lc3RhbXAgdGFrZW5cbiAgICAgICAgICAgICAgWzFdIFRoZSBzdW0gb2YgYWxsIG1lYXN1cmVtZW50cyB0YWtlbiAoYSBtZWFzdXJlbWVudCBpcyB0aGUgdGltZSBiZXR3ZWVuIDIgc25hcHNob3RzKVxuICAgICAgICAgICAgICBbMl0gVGhlIGNvdW50IG9mIGFsbCBtZWFzdXJlbWVudHNcbiAgICAgICAgICAgICAgWzNdIFRoZSBzdW0gb2YgYWxsIG1lYXN1cmVtZW50cyB0YWtlbiBXSVRISU4gdGhlIGN1cnJlbnQgYnVmZmVyIHdpbmRvdy4gVGhpcyBidWZmZXIgaXMgZmx1c2hlZCBpbnRvIFsxXSBldmVyeSBYIG1zIChzZWUgYnVnZ2VyV2luZG93IGNvbnN0KS5cbiAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGJ1ZmZlcldpbmRvdyA9IDQ5OTtcbiAgICAgICAgICBjb25zdCBtZWFzdXJlID0gWyBwZXJmb3JtYW5jZS5ub3coKSwgMCwgMCwgMCBdO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgIGlmIChsYXN0T2Zmc2V0ID09PSBvZmZzZXQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgY29uc3QgZGVsdGEgPSBsYXN0T2Zmc2V0IDwgb2Zmc2V0ID8gMSA6IC0xO1xuXG4gICAgICAgICAgdGhpcy5zY3JvbGxpbmcubmV4dChkZWx0YSk7XG5cbiAgICAgICAgICBjb25zdCByYWYgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gLW1lYXN1cmVbMF0gKyAobWVhc3VyZVswXSA9IHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICAgICAgICAgIGlmICh0aW1lID4gNSkge1xuICAgICAgICAgICAgICBtZWFzdXJlWzFdICs9IHRpbWU7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMl0gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY3JvbGxpbmcgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHNjcm9sbGluZyA9IDA7XG4gICAgICAgICAgICAgIGxhc3RPZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmcubmV4dCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobWVhc3VyZVsxXSA+IGJ1ZmZlcldpbmRvdykge1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbM10gKz0gbWVhc3VyZVsxXTtcbiAgICAgICAgICAgICAgICBtZWFzdXJlWzFdID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEZyYW1lUmF0ZS5lbWl0KDEwMDAgLyAobWVhc3VyZVszXS9tZWFzdXJlWzJdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gc2Nyb2xsaW5nID09PSAxID8gLTEgOiAxO1xuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICB9XG4gICAgICAgIHNjcm9sbGluZysrO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgQ1NTU3R5bGVEZWNsYXJhdGlvbiB7XG4gICAgY29udGFpbjogJ25vbmUnIHwgJ3N0cmljdCcgfCAnY29udGVudCcgfCAnc2l6ZScgfCAnbGF5b3V0JyB8ICdzdHlsZScgfCAncGFpbnQnIHwgJ2luaGVyaXQnIHwgJ2luaXRpYWwnIHwgJ3Vuc2V0JztcbiAgfVxufVxuIl19