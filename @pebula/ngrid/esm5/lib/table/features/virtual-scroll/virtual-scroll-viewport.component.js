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
        var virtualScrollConfig = config.get('virtualScroll');
        if (typeof virtualScrollConfig.defaultStrategy === 'function') {
            scrollStrategy = virtualScrollConfig.defaultStrategy();
        }
    }
    return scrollStrategy || new TableAutoSizeVirtualScrollStrategy(100, 200);
}
var PblCdkVirtualScrollViewportComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PblCdkVirtualScrollViewportComponent, _super);
    function PblCdkVirtualScrollViewportComponent(elementRef, cdr, ngZone, config, pblScrollStrategy, dir, scrollDispatcher, pluginCtrl, table) {
        var _this = _super.call(this, elementRef, cdr, ngZone, pblScrollStrategy = resolveScrollStrategy(config, pblScrollStrategy), dir, scrollDispatcher) || this;
        _this.cdr = cdr;
        _this.pblScrollStrategy = pblScrollStrategy;
        _this.table = table;
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
        /// COMPATIBILITY 8.1.2- <-> 8.1.3+
        _this.offsetChange$ = new Subject();
        _this._isScrolling = false;
        if (config.has('virtualScroll')) {
            _this.wheelModeDefault = config.get('virtualScroll').wheelMode;
        }
        config.onUpdate('virtualScroll').pipe(UnRx(_this)).subscribe((/**
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
        // The main effect is the table having height 0 at all times, unless the height is explicitly set.
        // This happens because the content taking out of the layout, wrapped in absolute positioning.
        // Additionally, the host itself (viewport) is set to contain: strict.
        var table = this.table;
        if (this.enabled) {
            table._cdkTable.attachViewPort();
        }
        this.scrolling
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} isScrolling
         * @return {?}
         */
        function (isScrolling) {
            _this._isScrolling = !!isScrolling;
            if (isScrolling) {
                table.addClass('pbl-ngrid-scrolling');
            }
            else {
                table.removeClass('pbl-ngrid-scrolling');
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
            _this.cdr.detectChanges();
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
        if (this.table.noFiller) {
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
    PblCdkVirtualScrollViewportComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: NgZone },
        { type: PblNgridConfigService },
        { type: undefined },
        { type: Directionality },
        { type: ScrollDispatcher },
        { type: PblNgridPluginController },
        { type: PblNgridComponent }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxhQUFhLEVBQ2IsU0FBUyxFQUNULHVCQUF1QixFQUN2QixVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLGlCQUFpQixFQUNqQixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEdBQ2QsTUFBTSx3QkFBd0IsQ0FBQztBQUVoQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSx1QkFBdUIsRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGNBQWMsQ0FBQzs7Ozs7O0FBWXpILFNBQVMscUJBQXFCLENBQUMsTUFBNkIsRUFBRSxjQUFzQztJQUNsRyxJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxH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LFlBQUksTUFBTSxTQUFDLHVCQUF1QjtnQkF0S2hELGNBQWMsdUJBdUtSLFFBQVE7Z0JBbEtyQixnQkFBZ0I7Z0JBT1Qsd0JBQXdCO2dCQUV4QixpQkFBaUI7OzsyQkFtRHZCLEtBQUs7MkNBRUwsS0FBSzsyQ0FDTCxLQUFLOzRCQWNMLE1BQU07a0NBbUJOLE1BQU07O0lBakRJLG9DQUFvQztRQURoRCxJQUFJLEVBQUU7aURBK0dtQixVQUFVO1lBQ1QsaUJBQWlCO1lBQ3RCLE1BQU07WUFDTixxQkFBcUIsVUFFWixjQUFjO1lBQ2IsZ0JBQWdCO1lBQ3RCLHdCQUF3QjtZQUNyQixpQkFBaUI7T0F0SGpDLG9DQUFvQyxDQWlVaEQ7SUFBRCwyQ0FBQztDQUFBLENBalV5RCx3QkFBd0IsR0FpVWpGO1NBalVZLG9DQUFvQzs7O0lBRy9DLHVEQUEwQjs7Ozs7Ozs7SUFRMUIsNERBQTBDOztJQUUxQyx3REFBMEI7O0lBRTFCLHdFQUErQzs7SUFDL0Msd0VBQStDOzs7Ozs7Ozs7Ozs7OztJQWMvQyx5REFBdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtQnZELCtEQUF1RDs7Ozs7Ozs7Ozs7OztJQWF2RCw0REFBaUI7O0lBRWpCLHNFQUEyQjs7SUFDM0IsK0RBQXdCOzs7OztJQTJCdEIsa0VBQXdCOzs7OztJQUV6QixtRUFBeUI7Ozs7Ozs7SUFNMUIsMEVBQWdDOzs7OztJQUdoQyw2REFBOEM7Ozs7O0lBQzlDLHNEQUF1Qjs7Ozs7SUFDdkIsMkRBQTZCOzs7OztJQUM3Qiw0REFBNkI7Ozs7O0lBRTdCLGdFQUFxRTs7Ozs7SUFHekQsbURBQThCOztJQUc5QixpRUFBNEY7Ozs7O0lBSTVGLHFEQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE5nWm9uZSxcbiAgT3V0cHV0LFxuICBPcHRpb25hbCxcbiAgT25Jbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCxcbiAgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gIFZpcnR1YWxTY3JvbGxTdHJhdGVneSxcbiAgU2Nyb2xsRGlzcGF0Y2hlcixcbiAgQ2RrVmlydHVhbEZvck9mLFxuICBDZGtTY3JvbGxhYmxlLFxufSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUsIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi9zdHJhdGVnaWVzJztcbmltcG9ydCB7IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8gfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XG5cbmRlY2xhcmUgbW9kdWxlICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICB2aXJ0dWFsU2Nyb2xsPzoge1xuICAgICAgd2hlZWxNb2RlPzogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XG4gICAgICBkZWZhdWx0U3RyYXRlZ3k/KCk6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVNjcm9sbFN0cmF0ZWd5KGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBzY3JvbGxTdHJhdGVneT86IFZpcnR1YWxTY3JvbGxTdHJhdGVneSk6IFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIGlmICghc2Nyb2xsU3RyYXRlZ3kgJiYgY29uZmlnLmhhcygndmlydHVhbFNjcm9sbCcpKSB7XG4gICAgY29uc3QgdmlydHVhbFNjcm9sbENvbmZpZyA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKTtcbiAgICBpZiAodHlwZW9mIHZpcnR1YWxTY3JvbGxDb25maWcuZGVmYXVsdFN0cmF0ZWd5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBzY3JvbGxTdHJhdGVneSA9IHZpcnR1YWxTY3JvbGxDb25maWcuZGVmYXVsdFN0cmF0ZWd5KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNjcm9sbFN0cmF0ZWd5IHx8IG5ldyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KDEwMCwgMjAwKTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLWNkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcsXG4gIHRlbXBsYXRlVXJsOiAndmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsgJy4vdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LnNjc3MnIF0sXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICBjbGFzczogJ2Nkay12aXJ0dWFsLXNjcm9sbC12aWV3cG9ydCcsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtZGlzYWJsZWRdJzogJyFlbmFibGVkJyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi1ob3Jpem9udGFsXSc6ICdvcmllbnRhdGlvbiA9PT0gXCJob3Jpem9udGFsXCInLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLXZlcnRpY2FsXSc6ICdvcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiJ1xuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgZXh0ZW5kcyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgZ2V0IGlzU2Nyb2xsaW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNTY3JvbGxpbmc7IH1cbiAgcmVhZG9ubHkgZW5hYmxlZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIG9mZnNldCAoaW4gcGl4ZWxzKSBvZiB0aGUgcmVuZGVyZWQgY29udGVudCBldmVyeSB0aW1lIGl0IGNoYW5nZXMuXG4gICAqIFRoZSBlbWlzc2lvbiBpcyBkb25lIE9VVFNJREUgb2YgYW5ndWxhciAoaS5lLiBubyBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGlzIHRyaWdnZXJlZCkuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB3aGVuIG5vdCBlbmFibGVkIChpLmUgYE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5YCBpcyB1c2VkKSB0aGVyZSBhcmUgbm8gZW1pc3Npb25zLlxuICAgKi9cbiAgcmVhZG9ubHkgb2Zmc2V0Q2hhbmdlOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgQElucHV0KCkgbWluV2lkdGg6IG51bWJlcjtcblxuICBASW5wdXQoKSBzdGlja3lSb3dIZWFkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBzdGlja3lSb3dGb290ZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbGluZyBzdGF0ZSBvZiByb3dzIGluIHRoZSB0YWJsZSBjaGFuZ2VzLlxuICAgKiBXaGVuIHNjcm9sbGluZyBzdGFydHMgYHRydWVgIGlzIGVtaXR0ZWQgYW5kIHdoZW4gdGhlIHNjcm9sbGluZyBlbmRzIGBmYWxzZWAgaXMgZW1pdHRlZC5cbiAgICpcbiAgICogVGhlIHRhYmxlIGlzIGluIFwic2Nyb2xsaW5nXCIgc3RhdGUgZnJvbSB0aGUgZmlyc3Qgc2Nyb2xsIGV2ZW50IGFuZCB1bnRpbCAyIGFuaW1hdGlvbiBmcmFtZXNcbiAgICogaGF2ZSBwYXNzZWQgd2l0aG91dCBhIHNjcm9sbCBldmVudC5cbiAgICpcbiAgICogV2hlbiBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIHRoZSBkaXJlY3Rpb246IC0xIG9yIDFcbiAgICogV2hlbiBub3Qgc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyAwLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8IC0xIHwgMCB8IDEgPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBlc3RpbWF0aW9uIG9mIHRoZSBjdXJyZW50IGZyYW1lIHJhdGUgd2hpbGUgc2Nyb2xsaW5nLCBpbiBhIDUwMG1zIGludGVydmFsLlxuICAgKlxuICAgKiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgKiBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgYSBzaW5nbGUgc2Nyb2xsIG9yIHNob3J0IHNjcm9sbCBidXJzdHMgd2lsbCBub3QgcmVzdWx0IGluIGEgYHNjcm9sbEZyYW1lUmF0ZWAgZW1pc3Npb25zLlxuICAgKlxuICAgKiBWYWxpZCBvbiB3aGVuIHZpcnR1YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIEluIHRoZSBmdXR1cmUgdGhlIG1lYXN1cmVtZW50IGxvZ2ljIG1pZ2h0IGJlIHJlcGxhY2VkIHdpdGggdGhlIEZyYW1lIFRpbWluZyBBUElcbiAgICogU2VlOlxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTQvMTEvZnJhbWUtdGltaW5nLWFwaVxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QZXJmb3JtYW5jZU9ic2VydmVyXG4gICAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZWFyY2hpdmUvZnJhbWUtdGltaW5nLXBvbHlmaWxsL3dpa2kvRXhwbGFpbmVyXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsRnJhbWVSYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBvZiB0aGUgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQuXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBpcyB1cGRhdGVkIGJ5IHRoZSB2aXJ0dWFsIHNjcm9sbCAodXBkYXRlIGxvZ2ljIGFuZCBmcmVxdWVuY3kgZGVwZW5kcyBvbiB0aGUgc3RyYXRlZ3kgaW1wbGVtZW50YXRpb24pIHRocm91Z2hcbiAgICogdGhlIGBzZXRUb3RhbENvbnRlbnRTaXplKHNpemUpYCBtZXRob2QuIFRoZSBpbnB1dCBzaXplIGlzIHVzZWQgdG8gcG9zaXRpb24gYSBkdW1teSBzcGFjZXIgZWxlbWVudCBhdCBhIHBvc2l0aW9uIHRoYXQgbWltaWNzIHRoZSBgc2Nyb2xsSGVpZ2h0YC5cbiAgICpcbiAgICogSW4gdGhlb3J5LCB0aGUgc2l6ZSBzZW50IHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYCBzaG91bGQgZXF1YWwgdGhlIGBzY3JvbGxIZWlnaHRgIHZhbHVlLCBvbmNlIHRoZSBicm93c2VyIHVwZGF0ZSdzIHRoZSBsYXlvdXQuXG4gICAqIEluIHJlYWxpdHkgaXQgZG9lcyBub3QgaGFwcGVuLCBzb21ldGltZXMgdGhleSBhcmUgbm90IGVxdWFsLiBTZXR0aW5nIGEgc2l6ZSB3aWxsIHJlc3VsdCBpbiBhIGRpZmZlcmVudCBgc2Nyb2xsSGVpZ2h0YC5cbiAgICogVGhpcyBtaWdodCBiZSBkdWUgdG8gY2hhbmdlcyBpbiBtZWFzdXJlbWVudHMgd2hlbiBoYW5kbGluZyBzdGlja3kgbWV0YSByb3dzIChtb3ZpbmcgYmFjayBhbmQgZm9ydGgpXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIHBvc2l0aW9uIG9mIHRoZSBkdW1teSBzcGFjZXIgZWxlbWVudCBpcyBzZXQgdGhyb3VnaCBESSB0aGUgbGF5b3V0IHdpbGwgcnVuIGluIHRoZSBuZXh0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNhbGwgdG8gYHNldFRvdGFsQ29udGVudFNpemVgLlxuICAgKi9cbiAgc2Nyb2xsSGVpZ2h0ID0gMDtcblxuICBuZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gMDtcbiAgcGJsRmlsbGVySGVpZ2h0OiBzdHJpbmc7XG5cbiAgZ2V0IHdoZWVsTW9kZSgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXSB7XG4gICAgcmV0dXJuICh0aGlzLnBibFNjcm9sbFN0cmF0ZWd5IGFzIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpLndoZWVsTW9kZSB8fCB0aGlzLndoZWVsTW9kZURlZmF1bHQgfHwgJ3Bhc3NpdmUnO1xuICB9XG5cbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG5cbiAgZ2V0IG91dGVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgaW5uZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIGdldCBvdXRlckhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSB3aGVuIG5vdCBzdXBwb3J0aW5nIDguMS4yIGFuZCBiZWxvd1xuICAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS53aWR0aGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgIF90b3RhbENvbnRlbnRXaWR0aCA9ICcnO1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS5oZWlnaHRgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cbiAgIF90b3RhbENvbnRlbnRIZWlnaHQgPSAnJztcbiAgICAvKipcbiAgICogVGhlIHRyYW5zZm9ybSB1c2VkIHRvIHNjYWxlIHRoZSBzcGFjZXIgdG8gdGhlIHNhbWUgc2l6ZSBhcyBhbGwgY29udGVudCwgaW5jbHVkaW5nIGNvbnRlbnQgdGhhdFxuICAgKiBpcyBub3QgY3VycmVudGx5IHJlbmRlcmVkLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgX3RvdGFsQ29udGVudFNpemVUcmFuc2Zvcm0gPSAnJztcbiAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuXG4gIHByaXZhdGUgb2Zmc2V0Q2hhbmdlJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0NEUGVuZGluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHdoZWVsTW9kZURlZmF1bHQ6ICBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kpIHB1YmxpYyBwYmxTY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLFxuICAgICAgICAgIGNkcixcbiAgICAgICAgICBuZ1pvbmUsXG4gICAgICAgICAgcGJsU2Nyb2xsU3RyYXRlZ3kgPSByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnLCBwYmxTY3JvbGxTdHJhdGVneSksXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXIpO1xuXG4gICAgaWYgKGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgICAgdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpLndoZWVsTW9kZTtcbiAgICB9XG4gICAgY29uZmlnLm9uVXBkYXRlKCd2aXJ0dWFsU2Nyb2xsJykucGlwZShVblJ4KHRoaXMpKS5zdWJzY3JpYmUoIGNoYW5nZSA9PiB0aGlzLndoZWVsTW9kZURlZmF1bHQgPSBjaGFuZ2UuY3Vyci53aGVlbE1vZGUpO1xuXG4gICAgaWYgKHBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5lbmFibGVkID0gcGJsU2Nyb2xsU3RyYXRlZ3kudHlwZSAhPT0gJ3ZTY3JvbGxOb25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGVkID0gIShwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTtcbiAgICB9XG4gICAgcGx1Z2luQ3RybC5leHRBcGkuc2V0Vmlld3BvcnQodGhpcyk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UgPSB0aGlzLm9mZnNldENoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDZGtTY3JvbGxhYmxlLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4gdGhpcy5pbml0U2Nyb2xsV2F0Y2hlcigpICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgKGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWApIHdlIG5lZWQgdG8gZGlzYWJsZSBhbnkgZWZmZWN0IGFwcGxpZWRcbiAgICAvLyBieSB0aGUgdmlld3BvcnQsIHdyYXBwaW5nIHRoZSBjb250ZW50IGluamVjdGVkIHRvIGl0LlxuICAgIC8vIFRoZSBtYWluIGVmZmVjdCBpcyB0aGUgdGFibGUgaGF2aW5nIGhlaWdodCAwIGF0IGFsbCB0aW1lcywgdW5sZXNzIHRoZSBoZWlnaHQgaXMgZXhwbGljaXRseSBzZXQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIGJlY2F1c2UgdGhlIGNvbnRlbnQgdGFraW5nIG91dCBvZiB0aGUgbGF5b3V0LCB3cmFwcGVkIGluIGFic29sdXRlIHBvc2l0aW9uaW5nLlxuICAgIC8vIEFkZGl0aW9uYWxseSwgdGhlIGhvc3QgaXRzZWxmICh2aWV3cG9ydCkgaXMgc2V0IHRvIGNvbnRhaW46IHN0cmljdC5cbiAgICBjb25zdCB7IHRhYmxlIH0gPSB0aGlzO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRhYmxlLl9jZGtUYWJsZS5hdHRhY2hWaWV3UG9ydCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsaW5nXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggaXNTY3JvbGxpbmcgPT4ge1xuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9ICEhaXNTY3JvbGxpbmc7XG4gICAgICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgICAgIHRhYmxlLmFkZENsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFibGUucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2V0VG90YWxDb250ZW50U2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBzdXBlci5zZXRUb3RhbENvbnRlbnRTaXplKHNpemUpO1xuXG4gICAgLy8gVE9ETyhzaGxvbWlhc3NhZilbcGVyZiwgM106IHJ1biB0aGlzIG9uY2UuLi4gKGFnZ3JlZ2F0ZSBhbGwgY2FsbHMgd2l0aGluIHRoZSBzYW1lIGFuaW1hdGlvbiBmcmFtZSlcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7IC8vc2l6ZTtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgICAvLyBXZSBtdXN0IHRyaWdnZXIgYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGJlY2F1c2UgdGhlIGZpbGxlciBkaXYgZWxlbWVudCBpcyB1cGRhdGVkIHRocm91Z2ggYmluZGluZ3NcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9KVxuICB9XG5cbiAgY2hlY2tWaWV3cG9ydFNpemUoKSB7XG4gICAgLy8gVE9ETzogQ2hlY2sgZm9yIGNoYW5nZXMgaW4gYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydGAgc291cmNlIGNvZGUsIHdoZW4gcmVzaXppbmcgaXMgaGFuZGxlZCFcbiAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvMjhmYjNhYmU3N2M1MzM2ZTQ3MzljODIwNTg0ZWM5OWMyM2YxYWUzOC9zcmMvY2RrL3Njcm9sbGluZy92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC50cyNMMzQxXG4gICAgY29uc3QgcHJldiA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCk7XG4gICAgc3VwZXIuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICBpZiAocHJldiAhPT0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKSkge1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKiogTWVhc3VyZSB0aGUgY29tYmluZWQgc2l6ZSBvZiBhbGwgb2YgdGhlIHJlbmRlcmVkIGl0ZW1zLiAqL1xuICBtZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpOiBudW1iZXIge1xuICAgIGxldCBzaXplID0gc3VwZXIubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTtcbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgc2l6ZSAtPSB0aGlzLnN0aWNreVJvd0hlYWRlckNvbnRhaW5lci5vZmZzZXRIZWlnaHQgKyB0aGlzLnN0aWNreVJvd0Zvb3RlckNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIC8vIENvbXBlbnNhdGUgZm9yIGh6IHNjcm9sbCBiYXIsIGlmIGV4aXN0cywgb25seSBpbiBub24gdmlydHVhbCBzY3JvbGwgbW9kZS5cbiAgICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICAgIHNpemUgKz0gdGhpcy5vdXRlckhlaWdodCAtIHRoaXMuaW5uZXJIZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5nZVJlbmRlcmVkQ29udGVudFNpemUgPSBzaXplO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVGaWxsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLnRhYmxlLm5vRmlsbGVyKSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYmxGaWxsZXJIZWlnaHQgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpID49IHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA/XG4gICAgICAgIGBjYWxjKDEwMCUgLSAke3RoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZX1weClgXG4gICAgICAgIDogdW5kZWZpbmVkXG4gICAgICA7XG4gICAgfVxuICB9XG5cbiAgb25Tb3VyY2VMZW5ndGhDaGFuZ2UocHJldjogbnVtYmVyLCBjdXJyOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgfVxuXG4gIGF0dGFjaChmb3JPZjogQ2RrVmlydHVhbEZvck9mPGFueT4gJiBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvKSB7XG4gICAgc3VwZXIuYXR0YWNoKGZvck9mKTtcbiAgICBjb25zdCBzY3JvbGxTdHJhdGVneSA9IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlXG4gICAgICA/IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kuX3Njcm9sbFN0cmF0ZWd5XG4gICAgICA6IHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3lcbiAgICA7XG4gICAgaWYgKHNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSkge1xuICAgICAgc2Nyb2xsU3RyYXRlZ3kuYXZlcmFnZXIuc2V0Um93SW5mbyhmb3JPZik7XG4gICAgfVxuICB9XG5cbiAgc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldDogbnVtYmVyLCB0bzogJ3RvLXN0YXJ0JyB8ICd0by1lbmQnID0gJ3RvLXN0YXJ0Jykge1xuICAgIHN1cGVyLnNldFJlbmRlcmVkQ29udGVudE9mZnNldChvZmZzZXQsIHRvKTtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBpZiAodGhpcy5vZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ0RQZW5kaW5nKSB7XG4gICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IHRydWU7XG5cbiAgICAgICAgICBjb25zdCBzeW5jVHJhbnNmb3JtID0gKCkgPT4geyB9O1xuXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiBzeW5jVHJhbnNmb3JtKCkgKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5pc0NEUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLm9mZnNldENoYW5nZSQubmV4dCh0aGlzLm9mZnNldCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgc2Nyb2xsaW5nIHdhdGNoZXIgd2hpY2ggdHJhY2sgc2Nyb2xsIGV2ZW50cyBhbiBlbWl0cyBgc2Nyb2xsaW5nYCBhbmQgYHNjcm9sbEZyYW1lUmF0ZWAgZXZlbnRzLlxuICAgKi9cbiAgcHJpdmF0ZSBpbml0U2Nyb2xsV2F0Y2hlcigpOiB2b2lkIHtcbiAgICBsZXQgc2Nyb2xsaW5nID0gMDtcbiAgICBsZXQgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgIHRoaXMuZWxlbWVudFNjcm9sbGVkKClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAvKiAgYHNjcm9sbGluZ2AgaXMgYSBib29sZWFuIGZsYWcgdGhhdCB0dXJucyBvbiB3aXRoIHRoZSBmaXJzdCBgc2Nyb2xsYCBldmVudHMgYW5kIGVuZHMgYWZ0ZXIgMiBicm93c2VyIGFuaW1hdGlvbiBmcmFtZXMgaGF2ZSBwYXNzZWQgd2l0aG91dCBhIGBzY3JvbGxgIGV2ZW50LlxuICAgICAgICAgICAgVGhpcyBpcyBhbiBhdHRlbXB0IHRvIGRldGVjdCBhIHNjcm9sbCBlbmQgZXZlbnQsIHdoaWNoIGRvZXMgbm90IGV4aXN0LlxuXG4gICAgICAgICAgICBgc2Nyb2xsRnJhbWVSYXRlYCBpcyBhIG51bWJlciB0aGF0IHJlcHJlc2VudCBhIHJvdWdoIGVzdGltYXRpb24gb2YgdGhlIGZyYW1lIHJhdGUgYnkgbWVhc3VyaW5nIHRoZSB0aW1lIHBhc3NlZCBiZXR3ZWVuIGVhY2ggcmVxdWVzdCBhbmltYXRpb24gZnJhbWVcbiAgICAgICAgICAgIHdoaWxlIHRoZSBgc2Nyb2xsaW5nYCBzdGF0ZSBpcyB0cnVlLiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgICAgICAgICAgVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cbiAgICAgICAgICAgIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXG5cbiAgICAgICAgKi9cbiAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gMCkge1xuICAgICAgICAgIC8qICBUaGUgbWVhc3VyZSBhcnJheSBob2xkcyB2YWx1ZXMgcmVxdWlyZWQgZm9yIGZyYW1lIHJhdGUgbWVhc3VyZW1lbnRzLlxuICAgICAgICAgICAgICBbMF0gU3RvcmFnZSBmb3IgbGFzdCB0aW1lc3RhbXAgdGFrZW5cbiAgICAgICAgICAgICAgWzFdIFRoZSBzdW0gb2YgYWxsIG1lYXN1cmVtZW50cyB0YWtlbiAoYSBtZWFzdXJlbWVudCBpcyB0aGUgdGltZSBiZXR3ZWVuIDIgc25hcHNob3RzKVxuICAgICAgICAgICAgICBbMl0gVGhlIGNvdW50IG9mIGFsbCBtZWFzdXJlbWVudHNcbiAgICAgICAgICAgICAgWzNdIFRoZSBzdW0gb2YgYWxsIG1lYXN1cmVtZW50cyB0YWtlbiBXSVRISU4gdGhlIGN1cnJlbnQgYnVmZmVyIHdpbmRvdy4gVGhpcyBidWZmZXIgaXMgZmx1c2hlZCBpbnRvIFsxXSBldmVyeSBYIG1zIChzZWUgYnVnZ2VyV2luZG93IGNvbnN0KS5cbiAgICAgICAgICAqL1xuICAgICAgICAgIGNvbnN0IGJ1ZmZlcldpbmRvdyA9IDQ5OTtcbiAgICAgICAgICBjb25zdCBtZWFzdXJlID0gWyBwZXJmb3JtYW5jZS5ub3coKSwgMCwgMCwgMCBdO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgIGlmIChsYXN0T2Zmc2V0ID09PSBvZmZzZXQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgY29uc3QgZGVsdGEgPSBsYXN0T2Zmc2V0IDwgb2Zmc2V0ID8gMSA6IC0xO1xuXG4gICAgICAgICAgdGhpcy5zY3JvbGxpbmcubmV4dChkZWx0YSk7XG5cbiAgICAgICAgICBjb25zdCByYWYgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0aW1lID0gLW1lYXN1cmVbMF0gKyAobWVhc3VyZVswXSA9IHBlcmZvcm1hbmNlLm5vdygpKTtcbiAgICAgICAgICAgIGlmICh0aW1lID4gNSkge1xuICAgICAgICAgICAgICBtZWFzdXJlWzFdICs9IHRpbWU7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMl0gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzY3JvbGxpbmcgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHNjcm9sbGluZyA9IDA7XG4gICAgICAgICAgICAgIGxhc3RPZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JvbGxpbmcubmV4dCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobWVhc3VyZVsxXSA+IGJ1ZmZlcldpbmRvdykge1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbM10gKz0gbWVhc3VyZVsxXTtcbiAgICAgICAgICAgICAgICBtZWFzdXJlWzFdID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEZyYW1lUmF0ZS5lbWl0KDEwMDAgLyAobWVhc3VyZVszXS9tZWFzdXJlWzJdKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gc2Nyb2xsaW5nID09PSAxID8gLTEgOiAxO1xuICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICB9XG4gICAgICAgIHNjcm9sbGluZysrO1xuICAgICAgfSk7XG4gIH1cbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgQ1NTU3R5bGVEZWNsYXJhdGlvbiB7XG4gICAgY29udGFpbjogJ25vbmUnIHwgJ3N0cmljdCcgfCAnY29udGVudCcgfCAnc2l6ZScgfCAnbGF5b3V0JyB8ICdzdHlsZScgfCAncGFpbnQnIHwgJ2luaGVyaXQnIHwgJ2luaXRpYWwnIHwgJ3Vuc2V0JztcbiAgfVxufVxuIl19