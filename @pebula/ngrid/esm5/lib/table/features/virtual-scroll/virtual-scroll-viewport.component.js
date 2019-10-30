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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxHQUdULE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLHVCQUF1QixFQUV2QixnQkFBZ0IsRUFFaEIsYUFBYSxHQUNkLE1BQU0sd0JBQXdCLENBQUM7QUFFaEMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsdUJBQXVCLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxjQUFjLENBQUM7Ozs7OztBQVl6SCxTQUFTLHFCQUFxQixDQUFDLE1BQTZCLEVBQUUsY0FBc0M7SUFDbEcsSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxFQUFFOztZQUM1QyxtQkFBbUIsR0FBRyxNQUFNLENBQUMs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QW9DO1FBRGhELElBQUksRUFBRTtpREErR21CLFVBQVU7WUFDVCxpQkFBaUI7WUFDdEIsTUFBTTtZQUNOLHFCQUFxQixVQUVaLGNBQWM7WUFDYixnQkFBZ0I7WUFDdEIsd0JBQXdCO1lBQ3JCLGlCQUFpQjtPQXRIakMsb0NBQW9DLENBaVVoRDtJQUFELDJDQUFDO0NBQUEsQ0FqVXlELHdCQUF3QixHQWlVakY7U0FqVVksb0NBQW9DOzs7SUFHL0MsdURBQTBCOzs7Ozs7OztJQVExQiw0REFBMEM7O0lBRTFDLHdEQUEwQjs7SUFFMUIsd0VBQStDOztJQUMvQyx3RUFBK0M7Ozs7Ozs7Ozs7Ozs7O0lBYy9DLHlEQUF1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1CdkQsK0RBQXVEOzs7Ozs7Ozs7Ozs7O0lBYXZELDREQUFpQjs7SUFFakIsc0VBQTJCOztJQUMzQiwrREFBd0I7Ozs7O0lBMkJ0QixrRUFBd0I7Ozs7O0lBRXpCLG1FQUF5Qjs7Ozs7OztJQU0xQiwwRUFBZ0M7Ozs7O0lBR2hDLDZEQUE4Qzs7Ozs7SUFDOUMsc0RBQXVCOzs7OztJQUN2QiwyREFBNkI7Ozs7O0lBQzdCLDREQUE2Qjs7Ozs7SUFFN0IsZ0VBQXFFOzs7OztJQUd6RCxtREFBOEI7O0lBRzlCLGlFQUE0Rjs7Ozs7SUFJNUYscURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgTmdab25lLFxuICBPdXRwdXQsXG4gIE9wdGlvbmFsLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LFxuICBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSxcbiAgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LFxuICBTY3JvbGxEaXNwYXRjaGVyLFxuICBDZGtWaXJ0dWFsRm9yT2YsXG4gIENka1Njcm9sbGFibGUsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xuaW1wb3J0IHsgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtZm9yLW9mJztcblxuZGVjbGFyZSBtb2R1bGUgJy4uLy4uL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHZpcnR1YWxTY3JvbGw/OiB7XG4gICAgICB3aGVlbE1vZGU/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcbiAgICAgIGRlZmF1bHRTdHJhdGVneT8oKTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIHNjcm9sbFN0cmF0ZWd5PzogVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgaWYgKCFzY3JvbGxTdHJhdGVneSAmJiBjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsQ29uZmlnID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpO1xuICAgIGlmICh0eXBlb2YgdmlydHVhbFNjcm9sbENvbmZpZy5kZWZhdWx0U3RyYXRlZ3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNjcm9sbFN0cmF0ZWd5ID0gdmlydHVhbFNjcm9sbENvbmZpZy5kZWZhdWx0U3RyYXRlZ3koKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2Nyb2xsU3RyYXRlZ3kgfHwgbmV3IFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3koMTAwLCAyMDApO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICd2aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuc2NzcycgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIGNsYXNzOiAnY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1kaXNhYmxlZF0nOiAnIWVuYWJsZWQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWxdJzogJ29yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24tdmVydGljYWxdJzogJ29yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCInXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCBleHRlbmRzIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBnZXQgaXNTY3JvbGxpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc1Njcm9sbGluZzsgfVxuICByZWFkb25seSBlbmFibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgb2Zmc2V0IChpbiBwaXhlbHMpIG9mIHRoZSByZW5kZXJlZCBjb250ZW50IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlcy5cbiAgICogVGhlIGVtaXNzaW9uIGlzIGRvbmUgT1VUU0lERSBvZiBhbmd1bGFyIChpLmUuIG5vIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgaXMgdHJpZ2dlcmVkKS5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gbm90IGVuYWJsZWQgKGkuZSBgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgIGlzIHVzZWQpIHRoZXJlIGFyZSBubyBlbWlzc2lvbnMuXG4gICAqL1xuICByZWFkb25seSBvZmZzZXRDaGFuZ2U6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBASW5wdXQoKSBtaW5XaWR0aDogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHN0aWNreVJvd0hlYWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIHN0aWNreVJvd0Zvb3RlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2Nyb2xsaW5nIHN0YXRlIG9mIHJvd3MgaW4gdGhlIHRhYmxlIGNoYW5nZXMuXG4gICAqIFdoZW4gc2Nyb2xsaW5nIHN0YXJ0cyBgdHJ1ZWAgaXMgZW1pdHRlZCBhbmQgd2hlbiB0aGUgc2Nyb2xsaW5nIGVuZHMgYGZhbHNlYCBpcyBlbWl0dGVkLlxuICAgKlxuICAgKiBUaGUgdGFibGUgaXMgaW4gXCJzY3JvbGxpbmdcIiBzdGF0ZSBmcm9tIHRoZSBmaXJzdCBzY3JvbGwgZXZlbnQgYW5kIHVudGlsIDIgYW5pbWF0aW9uIGZyYW1lc1xuICAgKiBoYXZlIHBhc3NlZCB3aXRob3V0IGEgc2Nyb2xsIGV2ZW50LlxuICAgKlxuICAgKiBXaGVuIHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgdGhlIGRpcmVjdGlvbjogLTEgb3IgMVxuICAgKiBXaGVuIG5vdCBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIDAuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsaW5nID0gbmV3IEV2ZW50RW1pdHRlcjwgLTEgfCAwIHwgMSA+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGVzdGltYXRpb24gb2YgdGhlIGN1cnJlbnQgZnJhbWUgcmF0ZSB3aGlsZSBzY3JvbGxpbmcsIGluIGEgNTAwbXMgaW50ZXJ2YWwuXG4gICAqXG4gICAqIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAqIFRvIGVzdGltYXRlIHRoZSBmcmFtZSByYXRlLCBhIHNpZ25pZmljYW50IG51bWJlciBvZiBtZWFzdXJlbWVudHMgaXMgcmVxdWlyZWQgc28gdmFsdWUgaXMgZW1pdHRlZCBldmVyeSA1MDAgbXMuXG4gICAqIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXG4gICAqXG4gICAqIFZhbGlkIG9uIHdoZW4gdmlydHVhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICpcbiAgICogSW4gdGhlIGZ1dHVyZSB0aGUgbWVhc3VyZW1lbnQgbG9naWMgbWlnaHQgYmUgcmVwbGFjZWQgd2l0aCB0aGUgRnJhbWUgVGltaW5nIEFQSVxuICAgKiBTZWU6XG4gICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNC8xMS9mcmFtZS10aW1pbmctYXBpXG4gICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1BlcmZvcm1hbmNlT2JzZXJ2ZXJcbiAgICogLSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlYXJjaGl2ZS9mcmFtZS10aW1pbmctcG9seWZpbGwvd2lraS9FeHBsYWluZXJcbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxGcmFtZVJhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogVGhlIGBzY3JvbGxIZWlnaHRgIG9mIHRoZSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydC5cbiAgICogVGhlIGBzY3JvbGxIZWlnaHRgIGlzIHVwZGF0ZWQgYnkgdGhlIHZpcnR1YWwgc2Nyb2xsICh1cGRhdGUgbG9naWMgYW5kIGZyZXF1ZW5jeSBkZXBlbmRzIG9uIHRoZSBzdHJhdGVneSBpbXBsZW1lbnRhdGlvbikgdGhyb3VnaFxuICAgKiB0aGUgYHNldFRvdGFsQ29udGVudFNpemUoc2l6ZSlgIG1ldGhvZC4gVGhlIGlucHV0IHNpemUgaXMgdXNlZCB0byBwb3NpdGlvbiBhIGR1bW15IHNwYWNlciBlbGVtZW50IGF0IGEgcG9zaXRpb24gdGhhdCBtaW1pY3MgdGhlIGBzY3JvbGxIZWlnaHRgLlxuICAgKlxuICAgKiBJbiB0aGVvcnksIHRoZSBzaXplIHNlbnQgdG8gYHNldFRvdGFsQ29udGVudFNpemVgIHNob3VsZCBlcXVhbCB0aGUgYHNjcm9sbEhlaWdodGAgdmFsdWUsIG9uY2UgdGhlIGJyb3dzZXIgdXBkYXRlJ3MgdGhlIGxheW91dC5cbiAgICogSW4gcmVhbGl0eSBpdCBkb2VzIG5vdCBoYXBwZW4sIHNvbWV0aW1lcyB0aGV5IGFyZSBub3QgZXF1YWwuIFNldHRpbmcgYSBzaXplIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50IGBzY3JvbGxIZWlnaHRgLlxuICAgKiBUaGlzIG1pZ2h0IGJlIGR1ZSB0byBjaGFuZ2VzIGluIG1lYXN1cmVtZW50cyB3aGVuIGhhbmRsaW5nIHN0aWNreSBtZXRhIHJvd3MgKG1vdmluZyBiYWNrIGFuZCBmb3J0aClcbiAgICpcbiAgICogQmVjYXVzZSB0aGUgcG9zaXRpb24gb2YgdGhlIGR1bW15IHNwYWNlciBlbGVtZW50IGlzIHNldCB0aHJvdWdoIERJIHRoZSBsYXlvdXQgd2lsbCBydW4gaW4gdGhlIG5leHQgbWljcm8tdGFzayBhZnRlciB0aGUgY2FsbCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAuXG4gICAqL1xuICBzY3JvbGxIZWlnaHQgPSAwO1xuXG4gIG5nZVJlbmRlcmVkQ29udGVudFNpemUgPSAwO1xuICBwYmxGaWxsZXJIZWlnaHQ6IHN0cmluZztcblxuICBnZXQgd2hlZWxNb2RlKCk6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddIHtcbiAgICByZXR1cm4gKHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kgYXMgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkud2hlZWxNb2RlIHx8IHRoaXMud2hlZWxNb2RlRGVmYXVsdCB8fCAncGFzc2l2ZSc7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlubmVyV2lkdGhIZWxwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLXZpcnR1YWwtc2Nyb2xsLWlubmVyLXdpZHRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGlubmVyV2lkdGhIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgb3V0ZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBpbm5lckhlaWdodCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlubmVyV2lkdGhIZWxwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLXZpcnR1YWwtc2Nyb2xsLWlubmVyLXdpZHRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGlubmVyV2lkdGhIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0IG91dGVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIHdoZW4gbm90IHN1cHBvcnRpbmcgOC4xLjIgYW5kIGJlbG93XG4gIC8vLyBDT01QQVRJQklMSVRZIDguMS4yLSA8LT4gOC4xLjMrXG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLndpZHRoYCBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB1c2VkIGZvciB0aGUgc3BhY2VyIGVsZW1lbnQuICovXG4gICAgX3RvdGFsQ29udGVudFdpZHRoID0gJyc7XG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLmhlaWdodGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgX3RvdGFsQ29udGVudEhlaWdodCA9ICcnO1xuICAgIC8qKlxuICAgKiBUaGUgdHJhbnNmb3JtIHVzZWQgdG8gc2NhbGUgdGhlIHNwYWNlciB0byB0aGUgc2FtZSBzaXplIGFzIGFsbCBjb250ZW50LCBpbmNsdWRpbmcgY29udGVudCB0aGF0XG4gICAqIGlzIG5vdCBjdXJyZW50bHkgcmVuZGVyZWQuXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBfdG90YWxDb250ZW50U2l6ZVRyYW5zZm9ybSA9ICcnO1xuIC8vLyBDT01QQVRJQklMSVRZIDguMS4yLSA8LT4gOC4xLjMrXG5cbiAgcHJpdmF0ZSBvZmZzZXRDaGFuZ2UkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICBwcml2YXRlIG9mZnNldDogbnVtYmVyO1xuICBwcml2YXRlIGlzQ0RQZW5kaW5nOiBib29sZWFuO1xuICBwcml2YXRlIF9pc1Njcm9sbGluZyA9IGZhbHNlO1xuXG4gIHByaXZhdGUgd2hlZWxNb2RlRGVmYXVsdDogIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgIG5nWm9uZTogTmdab25lLFxuICAgICAgICAgICAgICBjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSkgcHVibGljIHBibFNjcm9sbFN0cmF0ZWd5OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIGRpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXI6IFNjcm9sbERpc3BhdGNoZXIsXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKGVsZW1lbnRSZWYsXG4gICAgICAgICAgY2RyLFxuICAgICAgICAgIG5nWm9uZSxcbiAgICAgICAgICBwYmxTY3JvbGxTdHJhdGVneSA9IHJlc29sdmVTY3JvbGxTdHJhdGVneShjb25maWcsIHBibFNjcm9sbFN0cmF0ZWd5KSxcbiAgICAgICAgICBkaXIsXG4gICAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcik7XG5cbiAgICBpZiAoY29uZmlnLmhhcygndmlydHVhbFNjcm9sbCcpKSB7XG4gICAgICB0aGlzLndoZWVsTW9kZURlZmF1bHQgPSBjb25maWcuZ2V0KCd2aXJ0dWFsU2Nyb2xsJykud2hlZWxNb2RlO1xuICAgIH1cbiAgICBjb25maWcub25VcGRhdGUoJ3ZpcnR1YWxTY3JvbGwnKS5waXBlKFVuUngodGhpcykpLnN1YnNjcmliZSggY2hhbmdlID0+IHRoaXMud2hlZWxNb2RlRGVmYXVsdCA9IGNoYW5nZS5jdXJyLndoZWVsTW9kZSk7XG5cbiAgICBpZiAocGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlKSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPSBwYmxTY3JvbGxTdHJhdGVneS50eXBlICE9PSAndlNjcm9sbE5vbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPSAhKHBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpO1xuICAgIH1cbiAgICBwbHVnaW5DdHJsLmV4dEFwaS5zZXRWaWV3cG9ydCh0aGlzKTtcbiAgICB0aGlzLm9mZnNldENoYW5nZSA9IHRoaXMub2Zmc2V0Q2hhbmdlJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENka1Njcm9sbGFibGUucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCAoKSA9PiB0aGlzLmluaXRTY3JvbGxXYXRjaGVyKCkgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBJZiB2aXJ0dWFsIHNjcm9sbCBpcyBkaXNhYmxlZCAoYE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5YCkgd2UgbmVlZCB0byBkaXNhYmxlIGFueSBlZmZlY3QgYXBwbGllZFxuICAgIC8vIGJ5IHRoZSB2aWV3cG9ydCwgd3JhcHBpbmcgdGhlIGNvbnRlbnQgaW5qZWN0ZWQgdG8gaXQuXG4gICAgLy8gVGhlIG1haW4gZWZmZWN0IGlzIHRoZSB0YWJsZSBoYXZpbmcgaGVpZ2h0IDAgYXQgYWxsIHRpbWVzLCB1bmxlc3MgdGhlIGhlaWdodCBpcyBleHBsaWNpdGx5IHNldC5cbiAgICAvLyBUaGlzIGhhcHBlbnMgYmVjYXVzZSB0aGUgY29udGVudCB0YWtpbmcgb3V0IG9mIHRoZSBsYXlvdXQsIHdyYXBwZWQgaW4gYWJzb2x1dGUgcG9zaXRpb25pbmcuXG4gICAgLy8gQWRkaXRpb25hbGx5LCB0aGUgaG9zdCBpdHNlbGYgKHZpZXdwb3J0KSBpcyBzZXQgdG8gY29udGFpbjogc3RyaWN0LlxuICAgIGNvbnN0IHsgdGFibGUgfSA9IHRoaXM7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGFibGUuX2Nka1RhYmxlLmF0dGFjaFZpZXdQb3J0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zY3JvbGxpbmdcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBpc1Njcm9sbGluZyA9PiB7XG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gISFpc1Njcm9sbGluZztcbiAgICAgICAgaWYgKGlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgdGFibGUuYWRkQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YWJsZS5yZW1vdmVDbGFzcygncGJsLW5ncmlkLXNjcm9sbGluZycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzZXRUb3RhbENvbnRlbnRTaXplKHNpemU6IG51bWJlcikge1xuICAgIHN1cGVyLnNldFRvdGFsQ29udGVudFNpemUoc2l6ZSk7XG5cbiAgICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCAzXTogcnVuIHRoaXMgb25jZS4uLiAoYWdncmVnYXRlIGFsbCBjYWxscyB3aXRoaW4gdGhlIHNhbWUgYW5pbWF0aW9uIGZyYW1lKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDsgLy9zaXplO1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICAgIC8vIFdlIG11c3QgdHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgYmVjYXVzZSB0aGUgZmlsbGVyIGRpdiBlbGVtZW50IGlzIHVwZGF0ZWQgdGhyb3VnaCBiaW5kaW5nc1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0pXG4gIH1cblxuICBjaGVja1ZpZXdwb3J0U2l6ZSgpIHtcbiAgICAvLyBUT0RPOiBDaGVjayBmb3IgY2hhbmdlcyBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YCBzb3VyY2UgY29kZSwgd2hlbiByZXNpemluZyBpcyBoYW5kbGVkIVxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi8yOGZiM2FiZTc3YzUzMzZlNDczOWM4MjA1ODRlYzk5YzIzZjFhZTM4L3NyYy9jZGsvc2Nyb2xsaW5nL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LnRzI0wzNDFcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICBzdXBlci5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIGlmIChwcmV2ICE9PSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNZWFzdXJlIHRoZSBjb21iaW5lZCBzaXplIG9mIGFsbCBvZiB0aGUgcmVuZGVyZWQgaXRlbXMuICovXG4gIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk6IG51bWJlciB7XG4gICAgbGV0IHNpemUgPSBzdXBlci5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICBzaXplIC09IHRoaXMuc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyLm9mZnNldEhlaWdodCArIHRoaXMuc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcblxuICAgICAgLy8gQ29tcGVuc2F0ZSBmb3IgaHogc2Nyb2xsIGJhciwgaWYgZXhpc3RzLCBvbmx5IGluIG5vbiB2aXJ0dWFsIHNjcm9sbCBtb2RlLlxuICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgc2l6ZSArPSB0aGlzLm91dGVySGVpZ2h0IC0gdGhpcy5pbm5lckhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IHNpemU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZpbGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMudGFibGUubm9GaWxsZXIpIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkgPj0gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID9cbiAgICAgICAgYGNhbGMoMTAwJSAtICR7dGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplfXB4KWBcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUxlbmd0aENoYW5nZShwcmV2OiBudW1iZXIsIGN1cnI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICB9XG5cbiAgYXR0YWNoKGZvck9mOiBDZGtWaXJ0dWFsRm9yT2Y8YW55PiAmIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pIHtcbiAgICBzdXBlci5hdHRhY2goZm9yT2YpO1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5wYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVcbiAgICAgID8gdGhpcy5wYmxTY3JvbGxTdHJhdGVneS5fc2Nyb2xsU3RyYXRlZ3lcbiAgICAgIDogdGhpcy5wYmxTY3JvbGxTdHJhdGVneVxuICAgIDtcbiAgICBpZiAoc2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KSB7XG4gICAgICBzY3JvbGxTdHJhdGVneS5hdmVyYWdlci5zZXRSb3dJbmZvKGZvck9mKTtcbiAgICB9XG4gIH1cblxuICBzZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0OiBudW1iZXIsIHRvOiAndG8tc3RhcnQnIHwgJ3RvLWVuZCcgPSAndG8tc3RhcnQnKSB7XG4gICAgc3VwZXIuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldCwgdG8pO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLm9mZnNldCAhPT0gb2Zmc2V0KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMuaXNDRFBlbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHN5bmNUcmFuc2Zvcm0gPSAoKSA9PiB7IH07XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHN5bmNUcmFuc2Zvcm0oKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5uZXh0KHRoaXMub2Zmc2V0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBzY3JvbGxpbmcgd2F0Y2hlciB3aGljaCB0cmFjayBzY3JvbGwgZXZlbnRzIGFuIGVtaXRzIGBzY3JvbGxpbmdgIGFuZCBgc2Nyb2xsRnJhbWVSYXRlYCBldmVudHMuXG4gICAqL1xuICBwcml2YXRlIGluaXRTY3JvbGxXYXRjaGVyKCk6IHZvaWQge1xuICAgIGxldCBzY3JvbGxpbmcgPSAwO1xuICAgIGxldCBsYXN0T2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgdGhpcy5lbGVtZW50U2Nyb2xsZWQoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8qICBgc2Nyb2xsaW5nYCBpcyBhIGJvb2xlYW4gZmxhZyB0aGF0IHR1cm5zIG9uIHdpdGggdGhlIGZpcnN0IGBzY3JvbGxgIGV2ZW50cyBhbmQgZW5kcyBhZnRlciAyIGJyb3dzZXIgYW5pbWF0aW9uIGZyYW1lcyBoYXZlIHBhc3NlZCB3aXRob3V0IGEgYHNjcm9sbGAgZXZlbnQuXG4gICAgICAgICAgICBUaGlzIGlzIGFuIGF0dGVtcHQgdG8gZGV0ZWN0IGEgc2Nyb2xsIGVuZCBldmVudCwgd2hpY2ggZG9lcyBub3QgZXhpc3QuXG5cbiAgICAgICAgICAgIGBzY3JvbGxGcmFtZVJhdGVgIGlzIGEgbnVtYmVyIHRoYXQgcmVwcmVzZW50IGEgcm91Z2ggZXN0aW1hdGlvbiBvZiB0aGUgZnJhbWUgcmF0ZSBieSBtZWFzdXJpbmcgdGhlIHRpbWUgcGFzc2VkIGJldHdlZW4gZWFjaCByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgd2hpbGUgdGhlIGBzY3JvbGxpbmdgIHN0YXRlIGlzIHRydWUuIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAgICAgICAgICBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgICAgICAgICAgVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cblxuICAgICAgICAqL1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID09PSAwKSB7XG4gICAgICAgICAgLyogIFRoZSBtZWFzdXJlIGFycmF5IGhvbGRzIHZhbHVlcyByZXF1aXJlZCBmb3IgZnJhbWUgcmF0ZSBtZWFzdXJlbWVudHMuXG4gICAgICAgICAgICAgIFswXSBTdG9yYWdlIGZvciBsYXN0IHRpbWVzdGFtcCB0YWtlblxuICAgICAgICAgICAgICBbMV0gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIChhIG1lYXN1cmVtZW50IGlzIHRoZSB0aW1lIGJldHdlZW4gMiBzbmFwc2hvdHMpXG4gICAgICAgICAgICAgIFsyXSBUaGUgY291bnQgb2YgYWxsIG1lYXN1cmVtZW50c1xuICAgICAgICAgICAgICBbM10gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIFdJVEhJTiB0aGUgY3VycmVudCBidWZmZXIgd2luZG93LiBUaGlzIGJ1ZmZlciBpcyBmbHVzaGVkIGludG8gWzFdIGV2ZXJ5IFggbXMgKHNlZSBidWdnZXJXaW5kb3cgY29uc3QpLlxuICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgYnVmZmVyV2luZG93ID0gNDk5O1xuICAgICAgICAgIGNvbnN0IG1lYXN1cmUgPSBbIHBlcmZvcm1hbmNlLm5vdygpLCAwLCAwLCAwIF07XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgaWYgKGxhc3RPZmZzZXQgPT09IG9mZnNldCkgeyByZXR1cm47IH1cbiAgICAgICAgICBjb25zdCBkZWx0YSA9IGxhc3RPZmZzZXQgPCBvZmZzZXQgPyAxIDogLTE7XG5cbiAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KGRlbHRhKTtcblxuICAgICAgICAgIGNvbnN0IHJhZiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSAtbWVhc3VyZVswXSArIChtZWFzdXJlWzBdID0gcGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiA1KSB7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMV0gKz0gdGltZTtcbiAgICAgICAgICAgICAgbWVhc3VyZVsyXSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gMDtcbiAgICAgICAgICAgICAgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtZWFzdXJlWzFdID4gYnVmZmVyV2luZG93KSB7XG4gICAgICAgICAgICAgICAgbWVhc3VyZVszXSArPSBtZWFzdXJlWzFdO1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbMV0gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRnJhbWVSYXRlLmVtaXQoMTAwMCAvIChtZWFzdXJlWzNdL21lYXN1cmVbMl0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY3JvbGxpbmcgPSBzY3JvbGxpbmcgPT09IDEgPyAtMSA6IDE7XG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsaW5nKys7XG4gICAgICB9KTtcbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBDU1NTdHlsZURlY2xhcmF0aW9uIHtcbiAgICBjb250YWluOiAnbm9uZScgfCAnc3RyaWN0JyB8ICdjb250ZW50JyB8ICdzaXplJyB8ICdsYXlvdXQnIHwgJ3N0eWxlJyB8ICdwYWludCcgfCAnaW5oZXJpdCcgfCAnaW5pdGlhbCcgfCAndW5zZXQnO1xuICB9XG59XG4iXX0=