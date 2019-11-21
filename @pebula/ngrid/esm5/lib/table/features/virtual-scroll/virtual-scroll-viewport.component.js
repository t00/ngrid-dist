/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
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
        _this._minWidth$ = pluginCtrl.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return event.kind === 'onResizeRow'; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.table.columnApi.visibleColumns.reduce((/**
         * @param {?} p
         * @param {?} c
         * @return {?}
         */
        function (p, c) { return p + c.sizeInfo.width; }), 0); })), UnRx(_this));
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
    PblCdkVirtualScrollViewportComponent.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGFBQWEsR0FDZCxNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLGtDQUFrQyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFZekgsU0FBUyxxQkFBcUIsQ0FBQyxN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O0lBQy9DLHdFQUErQzs7Ozs7Ozs7Ozs7Ozs7SUFjL0MseURBQXVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbUJ2RCwrREFBdUQ7Ozs7Ozs7Ozs7Ozs7SUFhdkQsNERBQWlCOztJQUVqQixzRUFBMkI7O0lBQzNCLCtEQUF3Qjs7Ozs7SUErQnRCLGtFQUF3Qjs7Ozs7SUFFekIsbUVBQXlCOzs7Ozs7O0lBTTFCLDBFQUFnQzs7SUFHaEMsMERBQXdDOzs7OztJQUV4Qyw2REFBOEM7Ozs7O0lBQzlDLHNEQUF1Qjs7Ozs7SUFDdkIsMkRBQTZCOzs7OztJQUM3Qiw0REFBNkI7Ozs7O0lBRTdCLGdFQUFxRTs7Ozs7SUFHekQsbURBQThCOztJQUc5QixpRUFBNEY7Ozs7O0lBSTVGLHFEQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDb21wb25lbnQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgTmdab25lLFxuICBPdXRwdXQsXG4gIE9wdGlvbmFsLFxuICBPbkluaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0LFxuICBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSxcbiAgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LFxuICBTY3JvbGxEaXNwYXRjaGVyLFxuICBDZGtWaXJ0dWFsRm9yT2YsXG4gIENka1Njcm9sbGFibGUsXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSwgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3N0cmF0ZWdpZXMnO1xuaW1wb3J0IHsgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtZm9yLW9mJztcblxuZGVjbGFyZSBtb2R1bGUgJy4uLy4uL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHZpcnR1YWxTY3JvbGw/OiB7XG4gICAgICB3aGVlbE1vZGU/OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcbiAgICAgIGRlZmF1bHRTdHJhdGVneT8oKTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIHNjcm9sbFN0cmF0ZWd5PzogVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5IHtcbiAgaWYgKCFzY3JvbGxTdHJhdGVneSAmJiBjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICBjb25zdCB2aXJ0dWFsU2Nyb2xsQ29uZmlnID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpO1xuICAgIGlmICh0eXBlb2YgdmlydHVhbFNjcm9sbENvbmZpZy5kZWZhdWx0U3RyYXRlZ3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNjcm9sbFN0cmF0ZWd5ID0gdmlydHVhbFNjcm9sbENvbmZpZy5kZWZhdWx0U3RyYXRlZ3koKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2Nyb2xsU3RyYXRlZ3kgfHwgbmV3IFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3koMTAwLCAyMDApO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgdGVtcGxhdGVVcmw6ICd2aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQuc2NzcycgXSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIGNsYXNzOiAnY2RrLXZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0JyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1kaXNhYmxlZF0nOiAnIWVuYWJsZWQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLW9yaWVudGF0aW9uLWhvcml6b250YWxdJzogJ29yaWVudGF0aW9uID09PSBcImhvcml6b250YWxcIicsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24tdmVydGljYWxdJzogJ29yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCInXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCBleHRlbmRzIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBnZXQgaXNTY3JvbGxpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc1Njcm9sbGluZzsgfVxuICByZWFkb25seSBlbmFibGVkOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgb2Zmc2V0IChpbiBwaXhlbHMpIG9mIHRoZSByZW5kZXJlZCBjb250ZW50IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlcy5cbiAgICogVGhlIGVtaXNzaW9uIGlzIGRvbmUgT1VUU0lERSBvZiBhbmd1bGFyIChpLmUuIG5vIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgaXMgdHJpZ2dlcmVkKS5cbiAgICpcbiAgICogTm90ZSB0aGF0IHdoZW4gbm90IGVuYWJsZWQgKGkuZSBgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgIGlzIHVzZWQpIHRoZXJlIGFyZSBubyBlbWlzc2lvbnMuXG4gICAqL1xuICByZWFkb25seSBvZmZzZXRDaGFuZ2U6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBASW5wdXQoKSBzdGlja3lSb3dIZWFkZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBASW5wdXQoKSBzdGlja3lSb3dGb290ZXJDb250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVkIHdoZW4gdGhlIHNjcm9sbGluZyBzdGF0ZSBvZiByb3dzIGluIHRoZSB0YWJsZSBjaGFuZ2VzLlxuICAgKiBXaGVuIHNjcm9sbGluZyBzdGFydHMgYHRydWVgIGlzIGVtaXR0ZWQgYW5kIHdoZW4gdGhlIHNjcm9sbGluZyBlbmRzIGBmYWxzZWAgaXMgZW1pdHRlZC5cbiAgICpcbiAgICogVGhlIHRhYmxlIGlzIGluIFwic2Nyb2xsaW5nXCIgc3RhdGUgZnJvbSB0aGUgZmlyc3Qgc2Nyb2xsIGV2ZW50IGFuZCB1bnRpbCAyIGFuaW1hdGlvbiBmcmFtZXNcbiAgICogaGF2ZSBwYXNzZWQgd2l0aG91dCBhIHNjcm9sbCBldmVudC5cbiAgICpcbiAgICogV2hlbiBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIHRoZSBkaXJlY3Rpb246IC0xIG9yIDFcbiAgICogV2hlbiBub3Qgc2Nyb2xsaW5nLCB0aGUgZW1pdHRlZCB2YWx1ZSBpcyAwLlxuICAgKlxuICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxuICAgKi9cbiAgQE91dHB1dCgpIHNjcm9sbGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8IC0xIHwgMCB8IDEgPigpO1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBlc3RpbWF0aW9uIG9mIHRoZSBjdXJyZW50IGZyYW1lIHJhdGUgd2hpbGUgc2Nyb2xsaW5nLCBpbiBhIDUwMG1zIGludGVydmFsLlxuICAgKlxuICAgKiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxuICAgKiBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgYSBzaW5nbGUgc2Nyb2xsIG9yIHNob3J0IHNjcm9sbCBidXJzdHMgd2lsbCBub3QgcmVzdWx0IGluIGEgYHNjcm9sbEZyYW1lUmF0ZWAgZW1pc3Npb25zLlxuICAgKlxuICAgKiBWYWxpZCBvbiB3aGVuIHZpcnR1YWwgc2Nyb2xsaW5nIGlzIGVuYWJsZWQuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqXG4gICAqIEluIHRoZSBmdXR1cmUgdGhlIG1lYXN1cmVtZW50IGxvZ2ljIG1pZ2h0IGJlIHJlcGxhY2VkIHdpdGggdGhlIEZyYW1lIFRpbWluZyBBUElcbiAgICogU2VlOlxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTQvMTEvZnJhbWUtdGltaW5nLWFwaVxuICAgKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QZXJmb3JtYW5jZU9ic2VydmVyXG4gICAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZWFyY2hpdmUvZnJhbWUtdGltaW5nLXBvbHlmaWxsL3dpa2kvRXhwbGFpbmVyXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsRnJhbWVSYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBvZiB0aGUgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQuXG4gICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBpcyB1cGRhdGVkIGJ5IHRoZSB2aXJ0dWFsIHNjcm9sbCAodXBkYXRlIGxvZ2ljIGFuZCBmcmVxdWVuY3kgZGVwZW5kcyBvbiB0aGUgc3RyYXRlZ3kgaW1wbGVtZW50YXRpb24pIHRocm91Z2hcbiAgICogdGhlIGBzZXRUb3RhbENvbnRlbnRTaXplKHNpemUpYCBtZXRob2QuIFRoZSBpbnB1dCBzaXplIGlzIHVzZWQgdG8gcG9zaXRpb24gYSBkdW1teSBzcGFjZXIgZWxlbWVudCBhdCBhIHBvc2l0aW9uIHRoYXQgbWltaWNzIHRoZSBgc2Nyb2xsSGVpZ2h0YC5cbiAgICpcbiAgICogSW4gdGhlb3J5LCB0aGUgc2l6ZSBzZW50IHRvIGBzZXRUb3RhbENvbnRlbnRTaXplYCBzaG91bGQgZXF1YWwgdGhlIGBzY3JvbGxIZWlnaHRgIHZhbHVlLCBvbmNlIHRoZSBicm93c2VyIHVwZGF0ZSdzIHRoZSBsYXlvdXQuXG4gICAqIEluIHJlYWxpdHkgaXQgZG9lcyBub3QgaGFwcGVuLCBzb21ldGltZXMgdGhleSBhcmUgbm90IGVxdWFsLiBTZXR0aW5nIGEgc2l6ZSB3aWxsIHJlc3VsdCBpbiBhIGRpZmZlcmVudCBgc2Nyb2xsSGVpZ2h0YC5cbiAgICogVGhpcyBtaWdodCBiZSBkdWUgdG8gY2hhbmdlcyBpbiBtZWFzdXJlbWVudHMgd2hlbiBoYW5kbGluZyBzdGlja3kgbWV0YSByb3dzIChtb3ZpbmcgYmFjayBhbmQgZm9ydGgpXG4gICAqXG4gICAqIEJlY2F1c2UgdGhlIHBvc2l0aW9uIG9mIHRoZSBkdW1teSBzcGFjZXIgZWxlbWVudCBpcyBzZXQgdGhyb3VnaCBESSB0aGUgbGF5b3V0IHdpbGwgcnVuIGluIHRoZSBuZXh0IG1pY3JvLXRhc2sgYWZ0ZXIgdGhlIGNhbGwgdG8gYHNldFRvdGFsQ29udGVudFNpemVgLlxuICAgKi9cbiAgc2Nyb2xsSGVpZ2h0ID0gMDtcblxuICBuZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gMDtcbiAgcGJsRmlsbGVySGVpZ2h0OiBzdHJpbmc7XG5cbiAgZ2V0IHdoZWVsTW9kZSgpOiBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXSB7XG4gICAgcmV0dXJuICh0aGlzLnBibFNjcm9sbFN0cmF0ZWd5IGFzIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpLndoZWVsTW9kZSB8fCB0aGlzLndoZWVsTW9kZURlZmF1bHQgfHwgJ3Bhc3NpdmUnO1xuICB9XG5cbiAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICB9XG5cbiAgZ2V0IG91dGVyV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgaW5uZXJIZWlnaHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpbm5lcldpZHRoSGVscGVyID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNkay12aXJ0dWFsLXNjcm9sbC1pbm5lci13aWR0aCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBpbm5lcldpZHRoSGVscGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIGdldCBvdXRlckhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG4gIH1cblxuICBnZXQgc2Nyb2xsV2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gIH1cblxuICAvLy8gVE9ETyhzaGxvbWlhc3NhZik6IFJlbW92ZSB3aGVuIG5vdCBzdXBwb3J0aW5nIDguMS4yIGFuZCBiZWxvd1xuICAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS53aWR0aGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgIF90b3RhbENvbnRlbnRXaWR0aCA9ICcnO1xuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS5oZWlnaHRgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cbiAgIF90b3RhbENvbnRlbnRIZWlnaHQgPSAnJztcbiAgICAvKipcbiAgICogVGhlIHRyYW5zZm9ybSB1c2VkIHRvIHNjYWxlIHRoZSBzcGFjZXIgdG8gdGhlIHNhbWUgc2l6ZSBhcyBhbGwgY29udGVudCwgaW5jbHVkaW5nIGNvbnRlbnQgdGhhdFxuICAgKiBpcyBub3QgY3VycmVudGx5IHJlbmRlcmVkLlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgX3RvdGFsQ29udGVudFNpemVUcmFuc2Zvcm0gPSAnJztcbiAvLy8gQ09NUEFUSUJJTElUWSA4LjEuMi0gPC0+IDguMS4zK1xuXG4gIHJlYWRvbmx5IF9taW5XaWR0aCQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIG9mZnNldENoYW5nZSQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIHByaXZhdGUgb2Zmc2V0OiBudW1iZXI7XG4gIHByaXZhdGUgaXNDRFBlbmRpbmc6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzU2Nyb2xsaW5nID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB3aGVlbE1vZGVEZWZhdWx0OiAgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgICAgICAgbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFZJUlRVQUxfU0NST0xMX1NUUkFURUdZKSBwdWJsaWMgcGJsU2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneSxcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgc2Nyb2xsRGlzcGF0Y2hlcjogU2Nyb2xsRGlzcGF0Y2hlcixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLFxuICAgICAgICAgICAgICBwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgc3VwZXIoZWxlbWVudFJlZixcbiAgICAgICAgICBjZHIsXG4gICAgICAgICAgbmdab25lLFxuICAgICAgICAgIHBibFNjcm9sbFN0cmF0ZWd5ID0gcmVzb2x2ZVNjcm9sbFN0cmF0ZWd5KGNvbmZpZywgcGJsU2Nyb2xsU3RyYXRlZ3kpLFxuICAgICAgICAgIGRpcixcbiAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyKTtcblxuICAgIGlmIChjb25maWcuaGFzKCd2aXJ0dWFsU2Nyb2xsJykpIHtcbiAgICAgIHRoaXMud2hlZWxNb2RlRGVmYXVsdCA9IGNvbmZpZy5nZXQoJ3ZpcnR1YWxTY3JvbGwnKS53aGVlbE1vZGU7XG4gICAgfVxuICAgIGNvbmZpZy5vblVwZGF0ZSgndmlydHVhbFNjcm9sbCcpLnBpcGUoVW5SeCh0aGlzKSkuc3Vic2NyaWJlKCBjaGFuZ2UgPT4gdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY2hhbmdlLmN1cnIud2hlZWxNb2RlKTtcblxuICAgIGlmIChwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9IHBibFNjcm9sbFN0cmF0ZWd5LnR5cGUgIT09ICd2U2Nyb2xsTm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9ICEocGJsU2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSk7XG4gICAgfVxuICAgIHBsdWdpbkN0cmwuZXh0QXBpLnNldFZpZXdwb3J0KHRoaXMpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlID0gdGhpcy5vZmZzZXRDaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgdGhpcy5fbWluV2lkdGgkID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQua2luZCA9PT0gJ29uUmVzaXplUm93JyksXG4gICAgICAgIG1hcCggZSA9PiB0aGlzLnRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5yZWR1Y2UoIChwLCBjKSA9PiBwICsgYy5zaXplSW5mby53aWR0aCwgMCApICksXG4gICAgICAgIFVuUngodGhpcylcbiAgICAgICk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lbmFibGVkKSB7XG4gICAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDZGtTY3JvbGxhYmxlLnByb3RvdHlwZS5uZ09uSW5pdC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhciggKCkgPT4gdGhpcy5pbml0U2Nyb2xsV2F0Y2hlcigpICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgLy8gSWYgdmlydHVhbCBzY3JvbGwgaXMgZGlzYWJsZWQgKGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWApIHdlIG5lZWQgdG8gZGlzYWJsZSBhbnkgZWZmZWN0IGFwcGxpZWRcbiAgICAvLyBieSB0aGUgdmlld3BvcnQsIHdyYXBwaW5nIHRoZSBjb250ZW50IGluamVjdGVkIHRvIGl0LlxuICAgIC8vIFRoZSBtYWluIGVmZmVjdCBpcyB0aGUgdGFibGUgaGF2aW5nIGhlaWdodCAwIGF0IGFsbCB0aW1lcywgdW5sZXNzIHRoZSBoZWlnaHQgaXMgZXhwbGljaXRseSBzZXQuXG4gICAgLy8gVGhpcyBoYXBwZW5zIGJlY2F1c2UgdGhlIGNvbnRlbnQgdGFraW5nIG91dCBvZiB0aGUgbGF5b3V0LCB3cmFwcGVkIGluIGFic29sdXRlIHBvc2l0aW9uaW5nLlxuICAgIC8vIEFkZGl0aW9uYWxseSwgdGhlIGhvc3QgaXRzZWxmICh2aWV3cG9ydCkgaXMgc2V0IHRvIGNvbnRhaW46IHN0cmljdC5cbiAgICBjb25zdCB7IHRhYmxlIH0gPSB0aGlzO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHRhYmxlLl9jZGtUYWJsZS5hdHRhY2hWaWV3UG9ydCgpO1xuICAgIH1cblxuICAgIHRoaXMuc2Nyb2xsaW5nXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggaXNTY3JvbGxpbmcgPT4ge1xuICAgICAgICB0aGlzLl9pc1Njcm9sbGluZyA9ICEhaXNTY3JvbGxpbmc7XG4gICAgICAgIGlmIChpc1Njcm9sbGluZykge1xuICAgICAgICAgIHRhYmxlLmFkZENsYXNzKCdwYmwtbmdyaWQtc2Nyb2xsaW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFibGUucmVtb3ZlQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2V0VG90YWxDb250ZW50U2l6ZShzaXplOiBudW1iZXIpIHtcbiAgICBzdXBlci5zZXRUb3RhbENvbnRlbnRTaXplKHNpemUpO1xuXG4gICAgLy8gVE9ETyhzaGxvbWlhc3NhZilbcGVyZiwgM106IHJ1biB0aGlzIG9uY2UuLi4gKGFnZ3JlZ2F0ZSBhbGwgY2FsbHMgd2l0aGluIHRoZSBzYW1lIGFuaW1hdGlvbiBmcmFtZSlcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQ7IC8vc2l6ZTtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgICAvLyBXZSBtdXN0IHRyaWdnZXIgYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGJlY2F1c2UgdGhlIGZpbGxlciBkaXYgZWxlbWVudCBpcyB1cGRhdGVkIHRocm91Z2ggYmluZGluZ3NcbiAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pXG4gIH1cblxuICBjaGVja1ZpZXdwb3J0U2l6ZSgpIHtcbiAgICAvLyBUT0RPOiBDaGVjayBmb3IgY2hhbmdlcyBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YCBzb3VyY2UgY29kZSwgd2hlbiByZXNpemluZyBpcyBoYW5kbGVkIVxuICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9tYXRlcmlhbDIvYmxvYi8yOGZiM2FiZTc3YzUzMzZlNDczOWM4MjA1ODRlYzk5YzIzZjFhZTM4L3NyYy9jZGsvc2Nyb2xsaW5nL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LnRzI0wzNDFcbiAgICBjb25zdCBwcmV2ID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKTtcbiAgICBzdXBlci5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIGlmIChwcmV2ICE9PSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpKSB7XG4gICAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBNZWFzdXJlIHRoZSBjb21iaW5lZCBzaXplIG9mIGFsbCBvZiB0aGUgcmVuZGVyZWQgaXRlbXMuICovXG4gIG1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk6IG51bWJlciB7XG4gICAgbGV0IHNpemUgPSBzdXBlci5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICBzaXplIC09IHRoaXMuc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyLm9mZnNldEhlaWdodCArIHRoaXMuc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcblxuICAgICAgLy8gQ29tcGVuc2F0ZSBmb3IgaHogc2Nyb2xsIGJhciwgaWYgZXhpc3RzLCBvbmx5IGluIG5vbiB2aXJ0dWFsIHNjcm9sbCBtb2RlLlxuICAgICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgc2l6ZSArPSB0aGlzLm91dGVySGVpZ2h0IC0gdGhpcy5pbm5lckhlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubmdlUmVuZGVyZWRDb250ZW50U2l6ZSA9IHNpemU7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUZpbGxlcigpOiB2b2lkIHtcbiAgICB0aGlzLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMudGFibGUubm9GaWxsZXIpIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBibEZpbGxlckhlaWdodCA9IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkgPj0gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID9cbiAgICAgICAgYGNhbGMoMTAwJSAtICR7dGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplfXB4KWBcbiAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgIDtcbiAgICB9XG4gIH1cblxuICBvblNvdXJjZUxlbmd0aENoYW5nZShwcmV2OiBudW1iZXIsIGN1cnI6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tWaWV3cG9ydFNpemUoKTtcbiAgICB0aGlzLnVwZGF0ZUZpbGxlcigpO1xuICB9XG5cbiAgYXR0YWNoKGZvck9mOiBDZGtWaXJ0dWFsRm9yT2Y8YW55PiAmIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8pIHtcbiAgICBzdXBlci5hdHRhY2goZm9yT2YpO1xuICAgIGNvbnN0IHNjcm9sbFN0cmF0ZWd5ID0gdGhpcy5wYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVcbiAgICAgID8gdGhpcy5wYmxTY3JvbGxTdHJhdGVneS5fc2Nyb2xsU3RyYXRlZ3lcbiAgICAgIDogdGhpcy5wYmxTY3JvbGxTdHJhdGVneVxuICAgIDtcbiAgICBpZiAoc2Nyb2xsU3RyYXRlZ3kgaW5zdGFuY2VvZiBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5KSB7XG4gICAgICBzY3JvbGxTdHJhdGVneS5hdmVyYWdlci5zZXRSb3dJbmZvKGZvck9mKTtcbiAgICB9XG4gIH1cblxuICBzZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0OiBudW1iZXIsIHRvOiAndG8tc3RhcnQnIHwgJ3RvLWVuZCcgPSAndG8tc3RhcnQnKSB7XG4gICAgc3VwZXIuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KG9mZnNldCwgdG8pO1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIGlmICh0aGlzLm9mZnNldCAhPT0gb2Zmc2V0KSB7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICBpZiAoIXRoaXMuaXNDRFBlbmRpbmcpIHtcbiAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gdHJ1ZTtcblxuICAgICAgICAgIGNvbnN0IHN5bmNUcmFuc2Zvcm0gPSAoKSA9PiB7IH07XG5cbiAgICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+IHN5bmNUcmFuc2Zvcm0oKSApXG4gICAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmlzQ0RQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMub2Zmc2V0Q2hhbmdlJC5uZXh0KHRoaXMub2Zmc2V0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBzY3JvbGxpbmcgd2F0Y2hlciB3aGljaCB0cmFjayBzY3JvbGwgZXZlbnRzIGFuIGVtaXRzIGBzY3JvbGxpbmdgIGFuZCBgc2Nyb2xsRnJhbWVSYXRlYCBldmVudHMuXG4gICAqL1xuICBwcml2YXRlIGluaXRTY3JvbGxXYXRjaGVyKCk6IHZvaWQge1xuICAgIGxldCBzY3JvbGxpbmcgPSAwO1xuICAgIGxldCBsYXN0T2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgdGhpcy5lbGVtZW50U2Nyb2xsZWQoKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIC8qICBgc2Nyb2xsaW5nYCBpcyBhIGJvb2xlYW4gZmxhZyB0aGF0IHR1cm5zIG9uIHdpdGggdGhlIGZpcnN0IGBzY3JvbGxgIGV2ZW50cyBhbmQgZW5kcyBhZnRlciAyIGJyb3dzZXIgYW5pbWF0aW9uIGZyYW1lcyBoYXZlIHBhc3NlZCB3aXRob3V0IGEgYHNjcm9sbGAgZXZlbnQuXG4gICAgICAgICAgICBUaGlzIGlzIGFuIGF0dGVtcHQgdG8gZGV0ZWN0IGEgc2Nyb2xsIGVuZCBldmVudCwgd2hpY2ggZG9lcyBub3QgZXhpc3QuXG5cbiAgICAgICAgICAgIGBzY3JvbGxGcmFtZVJhdGVgIGlzIGEgbnVtYmVyIHRoYXQgcmVwcmVzZW50IGEgcm91Z2ggZXN0aW1hdGlvbiBvZiB0aGUgZnJhbWUgcmF0ZSBieSBtZWFzdXJpbmcgdGhlIHRpbWUgcGFzc2VkIGJldHdlZW4gZWFjaCByZXF1ZXN0IGFuaW1hdGlvbiBmcmFtZVxuICAgICAgICAgICAgd2hpbGUgdGhlIGBzY3JvbGxpbmdgIHN0YXRlIGlzIHRydWUuIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAgICAgICAgICBUbyBlc3RpbWF0ZSB0aGUgZnJhbWUgcmF0ZSwgYSBzaWduaWZpY2FudCBudW1iZXIgb2YgbWVhc3VyZW1lbnRzIGlzIHJlcXVpcmVkIHNvIHZhbHVlIGlzIGVtaXR0ZWQgZXZlcnkgNTAwIG1zLlxuICAgICAgICAgICAgVGhpcyBtZWFucyB0aGF0IGEgc2luZ2xlIHNjcm9sbCBvciBzaG9ydCBzY3JvbGwgYnVyc3RzIHdpbGwgbm90IHJlc3VsdCBpbiBhIGBzY3JvbGxGcmFtZVJhdGVgIGVtaXNzaW9ucy5cblxuICAgICAgICAqL1xuICAgICAgICBpZiAoc2Nyb2xsaW5nID09PSAwKSB7XG4gICAgICAgICAgLyogIFRoZSBtZWFzdXJlIGFycmF5IGhvbGRzIHZhbHVlcyByZXF1aXJlZCBmb3IgZnJhbWUgcmF0ZSBtZWFzdXJlbWVudHMuXG4gICAgICAgICAgICAgIFswXSBTdG9yYWdlIGZvciBsYXN0IHRpbWVzdGFtcCB0YWtlblxuICAgICAgICAgICAgICBbMV0gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIChhIG1lYXN1cmVtZW50IGlzIHRoZSB0aW1lIGJldHdlZW4gMiBzbmFwc2hvdHMpXG4gICAgICAgICAgICAgIFsyXSBUaGUgY291bnQgb2YgYWxsIG1lYXN1cmVtZW50c1xuICAgICAgICAgICAgICBbM10gVGhlIHN1bSBvZiBhbGwgbWVhc3VyZW1lbnRzIHRha2VuIFdJVEhJTiB0aGUgY3VycmVudCBidWZmZXIgd2luZG93LiBUaGlzIGJ1ZmZlciBpcyBmbHVzaGVkIGludG8gWzFdIGV2ZXJ5IFggbXMgKHNlZSBidWdnZXJXaW5kb3cgY29uc3QpLlxuICAgICAgICAgICovXG4gICAgICAgICAgY29uc3QgYnVmZmVyV2luZG93ID0gNDk5O1xuICAgICAgICAgIGNvbnN0IG1lYXN1cmUgPSBbIHBlcmZvcm1hbmNlLm5vdygpLCAwLCAwLCAwIF07XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgaWYgKGxhc3RPZmZzZXQgPT09IG9mZnNldCkgeyByZXR1cm47IH1cbiAgICAgICAgICBjb25zdCBkZWx0YSA9IGxhc3RPZmZzZXQgPCBvZmZzZXQgPyAxIDogLTE7XG5cbiAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KGRlbHRhKTtcblxuICAgICAgICAgIGNvbnN0IHJhZiA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSAtbWVhc3VyZVswXSArIChtZWFzdXJlWzBdID0gcGVyZm9ybWFuY2Uubm93KCkpO1xuICAgICAgICAgICAgaWYgKHRpbWUgPiA1KSB7XG4gICAgICAgICAgICAgIG1lYXN1cmVbMV0gKz0gdGltZTtcbiAgICAgICAgICAgICAgbWVhc3VyZVsyXSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNjcm9sbGluZyA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgc2Nyb2xsaW5nID0gMDtcbiAgICAgICAgICAgICAgbGFzdE9mZnNldCA9IHRoaXMubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICAgICAgICB0aGlzLnNjcm9sbGluZy5uZXh0KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtZWFzdXJlWzFdID4gYnVmZmVyV2luZG93KSB7XG4gICAgICAgICAgICAgICAgbWVhc3VyZVszXSArPSBtZWFzdXJlWzFdO1xuICAgICAgICAgICAgICAgIG1lYXN1cmVbMV0gPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsRnJhbWVSYXRlLmVtaXQoMTAwMCAvIChtZWFzdXJlWzNdL21lYXN1cmVbMl0pKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzY3JvbGxpbmcgPSBzY3JvbGxpbmcgPT09IDEgPyAtMSA6IDE7XG4gICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIH1cbiAgICAgICAgc2Nyb2xsaW5nKys7XG4gICAgICB9KTtcbiAgfVxufVxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBDU1NTdHlsZURlY2xhcmF0aW9uIHtcbiAgICBjb250YWluOiAnbm9uZScgfCAnc3RyaWN0JyB8ICdjb250ZW50JyB8ICdzaXplJyB8ICdsYXlvdXQnIHwgJ3N0eWxlJyB8ICdwYWludCcgfCAnaW5oZXJpdCcgfCAnaW5pdGlhbCcgfCAndW5zZXQnO1xuICB9XG59XG4iXX0=