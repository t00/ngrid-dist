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
        this._minWidth$ = pluginCtrl.events
            .pipe(filter((/**
         * @param {?} event
         * @return {?}
         */
        event => event.kind === 'onResizeRow')), map((/**
         * @param {?} e
         * @return {?}
         */
        e => this.table.columnApi.visibleColumns.reduce((/**
         * @param {?} p
         * @param {?} c
         * @return {?}
         */
        (p, c) => p + c.sizeInfo.width), 0))), UnRx(this));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUNMLGFBQWEsRUFDYixTQUFTLEVBQ1QsdUJBQXVCLEVBQ3ZCLFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFDTCx3QkFBd0IsRUFDeEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGFBQWEsR0FDZCxNQUFNLHdCQUF3QixDQUFDO0FBRWhDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDdkUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLGtDQUFrQyxFQUFFLE1BQU0sY0FBYyxDQUFDOzs7Ozs7QUFZekgsU0FBUyxxQkFBcUIsQ0FBQyxN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RCxtREFBOEI7O0lBRzlCLGlFQUE0Rjs7Ozs7SUFJNUYscURBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgT3B0aW9uYWwsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsXG4gIFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksXG4gIFNjcm9sbERpc3BhdGNoZXIsXG4gIENka1ZpcnR1YWxGb3JPZixcbiAgQ2RrU2Nyb2xsYWJsZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlLCBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneSwgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB9IGZyb20gJy4vc3RyYXRlZ2llcyc7XG5pbXBvcnQgeyBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC1mb3Itb2YnO1xuXG5kZWNsYXJlIG1vZHVsZSAnLi4vLi4vc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgdmlydHVhbFNjcm9sbD86IHtcbiAgICAgIHdoZWVsTW9kZT86IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xuICAgICAgZGVmYXVsdFN0cmF0ZWd5PygpOiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3k7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVTY3JvbGxTdHJhdGVneShjb25maWc6IFBibE5ncmlkQ29uZmlnU2VydmljZSwgc2Nyb2xsU3RyYXRlZ3k/OiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpOiBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBpZiAoIXNjcm9sbFN0cmF0ZWd5ICYmIGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgIGNvbnN0IHZpcnR1YWxTY3JvbGxDb25maWcgPSBjb25maWcuZ2V0KCd2aXJ0dWFsU2Nyb2xsJyk7XG4gICAgaWYgKHR5cGVvZiB2aXJ0dWFsU2Nyb2xsQ29uZmlnLmRlZmF1bHRTdHJhdGVneSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2Nyb2xsU3RyYXRlZ3kgPSB2aXJ0dWFsU2Nyb2xsQ29uZmlnLmRlZmF1bHRTdHJhdGVneSgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzY3JvbGxTdHJhdGVneSB8fCBuZXcgVGFibGVBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSgxMDAsIDIwMCk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbICcuL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5zY3NzJyBdLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgY2xhc3M6ICdjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQnLFxuICAgICdbY2xhc3MuY2RrLXZpcnR1YWwtc2Nyb2xsLWRpc2FibGVkXSc6ICchZW5hYmxlZCcsXG4gICAgJ1tjbGFzcy5jZGstdmlydHVhbC1zY3JvbGwtb3JpZW50YXRpb24taG9yaXpvbnRhbF0nOiAnb3JpZW50YXRpb24gPT09IFwiaG9yaXpvbnRhbFwiJyxcbiAgICAnW2NsYXNzLmNkay12aXJ0dWFsLXNjcm9sbC1vcmllbnRhdGlvbi12ZXJ0aWNhbF0nOiAnb3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIidcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IGV4dGVuZHMgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIGdldCBpc1Njcm9sbGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzU2Nyb2xsaW5nOyB9XG4gIHJlYWRvbmx5IGVuYWJsZWQ6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEVtaXRzIHRoZSBvZmZzZXQgKGluIHBpeGVscykgb2YgdGhlIHJlbmRlcmVkIGNvbnRlbnQgZXZlcnkgdGltZSBpdCBjaGFuZ2VzLlxuICAgKiBUaGUgZW1pc3Npb24gaXMgZG9uZSBPVVRTSURFIG9mIGFuZ3VsYXIgKGkuZS4gbm8gY2hhbmdlIGRldGVjdGlvbiBjeWNsZSBpcyB0cmlnZ2VyZWQpLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgd2hlbiBub3QgZW5hYmxlZCAoaS5lIGBOb1ZpcnR1YWxTY3JvbGxTdHJhdGVneWAgaXMgdXNlZCkgdGhlcmUgYXJlIG5vIGVtaXNzaW9ucy5cbiAgICovXG4gIHJlYWRvbmx5IG9mZnNldENoYW5nZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIEBJbnB1dCgpIHN0aWNreVJvd0hlYWRlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gIEBJbnB1dCgpIHN0aWNreVJvd0Zvb3RlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2Nyb2xsaW5nIHN0YXRlIG9mIHJvd3MgaW4gdGhlIHRhYmxlIGNoYW5nZXMuXG4gICAqIFdoZW4gc2Nyb2xsaW5nIHN0YXJ0cyBgdHJ1ZWAgaXMgZW1pdHRlZCBhbmQgd2hlbiB0aGUgc2Nyb2xsaW5nIGVuZHMgYGZhbHNlYCBpcyBlbWl0dGVkLlxuICAgKlxuICAgKiBUaGUgdGFibGUgaXMgaW4gXCJzY3JvbGxpbmdcIiBzdGF0ZSBmcm9tIHRoZSBmaXJzdCBzY3JvbGwgZXZlbnQgYW5kIHVudGlsIDIgYW5pbWF0aW9uIGZyYW1lc1xuICAgKiBoYXZlIHBhc3NlZCB3aXRob3V0IGEgc2Nyb2xsIGV2ZW50LlxuICAgKlxuICAgKiBXaGVuIHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgdGhlIGRpcmVjdGlvbjogLTEgb3IgMVxuICAgKiBXaGVuIG5vdCBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIDAuXG4gICAqXG4gICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXG4gICAqL1xuICBAT3V0cHV0KCkgc2Nyb2xsaW5nID0gbmV3IEV2ZW50RW1pdHRlcjwgLTEgfCAwIHwgMSA+KCk7XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGVzdGltYXRpb24gb2YgdGhlIGN1cnJlbnQgZnJhbWUgcmF0ZSB3aGlsZSBzY3JvbGxpbmcsIGluIGEgNTAwbXMgaW50ZXJ2YWwuXG4gICAqXG4gICAqIFRoZSBmcmFtZSByYXRlIHZhbHVlIGlzIHRoZSBhdmVyYWdlIGZyYW1lIHJhdGUgZnJvbSBhbGwgbWVhc3VyZW1lbnRzIHNpbmNlIHRoZSBzY3JvbGxpbmcgYmVnYW4uXG4gICAqIFRvIGVzdGltYXRlIHRoZSBmcmFtZSByYXRlLCBhIHNpZ25pZmljYW50IG51bWJlciBvZiBtZWFzdXJlbWVudHMgaXMgcmVxdWlyZWQgc28gdmFsdWUgaXMgZW1pdHRlZCBldmVyeSA1MDAgbXMuXG4gICAqIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXG4gICAqXG4gICAqIFZhbGlkIG9uIHdoZW4gdmlydHVhbCBzY3JvbGxpbmcgaXMgZW5hYmxlZC5cbiAgICpcbiAgICogTk9URTogVGhpcyBldmVudCBydW5zIG91dHNpZGUgdGhlIGFuZ3VsYXIgem9uZS5cbiAgICpcbiAgICogSW4gdGhlIGZ1dHVyZSB0aGUgbWVhc3VyZW1lbnQgbG9naWMgbWlnaHQgYmUgcmVwbGFjZWQgd2l0aCB0aGUgRnJhbWUgVGltaW5nIEFQSVxuICAgKiBTZWU6XG4gICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vd2ViL3VwZGF0ZXMvMjAxNC8xMS9mcmFtZS10aW1pbmctYXBpXG4gICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1BlcmZvcm1hbmNlT2JzZXJ2ZXJcbiAgICogLSBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlYXJjaGl2ZS9mcmFtZS10aW1pbmctcG9seWZpbGwvd2lraS9FeHBsYWluZXJcbiAgICovXG4gIEBPdXRwdXQoKSBzY3JvbGxGcmFtZVJhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKipcbiAgICogVGhlIGBzY3JvbGxIZWlnaHRgIG9mIHRoZSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydC5cbiAgICogVGhlIGBzY3JvbGxIZWlnaHRgIGlzIHVwZGF0ZWQgYnkgdGhlIHZpcnR1YWwgc2Nyb2xsICh1cGRhdGUgbG9naWMgYW5kIGZyZXF1ZW5jeSBkZXBlbmRzIG9uIHRoZSBzdHJhdGVneSBpbXBsZW1lbnRhdGlvbikgdGhyb3VnaFxuICAgKiB0aGUgYHNldFRvdGFsQ29udGVudFNpemUoc2l6ZSlgIG1ldGhvZC4gVGhlIGlucHV0IHNpemUgaXMgdXNlZCB0byBwb3NpdGlvbiBhIGR1bW15IHNwYWNlciBlbGVtZW50IGF0IGEgcG9zaXRpb24gdGhhdCBtaW1pY3MgdGhlIGBzY3JvbGxIZWlnaHRgLlxuICAgKlxuICAgKiBJbiB0aGVvcnksIHRoZSBzaXplIHNlbnQgdG8gYHNldFRvdGFsQ29udGVudFNpemVgIHNob3VsZCBlcXVhbCB0aGUgYHNjcm9sbEhlaWdodGAgdmFsdWUsIG9uY2UgdGhlIGJyb3dzZXIgdXBkYXRlJ3MgdGhlIGxheW91dC5cbiAgICogSW4gcmVhbGl0eSBpdCBkb2VzIG5vdCBoYXBwZW4sIHNvbWV0aW1lcyB0aGV5IGFyZSBub3QgZXF1YWwuIFNldHRpbmcgYSBzaXplIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50IGBzY3JvbGxIZWlnaHRgLlxuICAgKiBUaGlzIG1pZ2h0IGJlIGR1ZSB0byBjaGFuZ2VzIGluIG1lYXN1cmVtZW50cyB3aGVuIGhhbmRsaW5nIHN0aWNreSBtZXRhIHJvd3MgKG1vdmluZyBiYWNrIGFuZCBmb3J0aClcbiAgICpcbiAgICogQmVjYXVzZSB0aGUgcG9zaXRpb24gb2YgdGhlIGR1bW15IHNwYWNlciBlbGVtZW50IGlzIHNldCB0aHJvdWdoIERJIHRoZSBsYXlvdXQgd2lsbCBydW4gaW4gdGhlIG5leHQgbWljcm8tdGFzayBhZnRlciB0aGUgY2FsbCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAuXG4gICAqL1xuICBzY3JvbGxIZWlnaHQgPSAwO1xuXG4gIG5nZVJlbmRlcmVkQ29udGVudFNpemUgPSAwO1xuICBwYmxGaWxsZXJIZWlnaHQ6IHN0cmluZztcblxuICBnZXQgd2hlZWxNb2RlKCk6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddIHtcbiAgICByZXR1cm4gKHRoaXMucGJsU2Nyb2xsU3RyYXRlZ3kgYXMgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkud2hlZWxNb2RlIHx8IHRoaXMud2hlZWxNb2RlRGVmYXVsdCB8fCAncGFzc2l2ZSc7XG4gIH1cblxuICBnZXQgaW5uZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlubmVyV2lkdGhIZWxwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLXZpcnR1YWwtc2Nyb2xsLWlubmVyLXdpZHRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGlubmVyV2lkdGhIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gIH1cblxuICBnZXQgb3V0ZXJXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgfVxuXG4gIGdldCBpbm5lckhlaWdodCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlubmVyV2lkdGhIZWxwZXIgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY2RrLXZpcnR1YWwtc2Nyb2xsLWlubmVyLXdpZHRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGlubmVyV2lkdGhIZWxwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICB9XG5cbiAgZ2V0IG91dGVySGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcbiAgfVxuXG4gIGdldCBzY3JvbGxXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgfVxuXG4gIC8vLyBUT0RPKHNobG9taWFzc2FmKTogUmVtb3ZlIHdoZW4gbm90IHN1cHBvcnRpbmcgOC4xLjIgYW5kIGJlbG93XG4gIC8vLyBDT01QQVRJQklMSVRZIDguMS4yLSA8LT4gOC4xLjMrXG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLndpZHRoYCBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB1c2VkIGZvciB0aGUgc3BhY2VyIGVsZW1lbnQuICovXG4gICAgX3RvdGFsQ29udGVudFdpZHRoID0gJyc7XG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLmhlaWdodGAgcHJvcGVydHkgdmFsdWUgdG8gYmUgdXNlZCBmb3IgdGhlIHNwYWNlciBlbGVtZW50LiAqL1xuICAgX3RvdGFsQ29udGVudEhlaWdodCA9ICcnO1xuICAgIC8qKlxuICAgKiBUaGUgdHJhbnNmb3JtIHVzZWQgdG8gc2NhbGUgdGhlIHNwYWNlciB0byB0aGUgc2FtZSBzaXplIGFzIGFsbCBjb250ZW50LCBpbmNsdWRpbmcgY29udGVudCB0aGF0XG4gICAqIGlzIG5vdCBjdXJyZW50bHkgcmVuZGVyZWQuXG4gICAqIEBkZXByZWNhdGVkXG4gICAqL1xuICBfdG90YWxDb250ZW50U2l6ZVRyYW5zZm9ybSA9ICcnO1xuIC8vLyBDT01QQVRJQklMSVRZIDguMS4yLSA8LT4gOC4xLjMrXG5cbiAgcmVhZG9ubHkgX21pbldpZHRoJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgb2Zmc2V0Q2hhbmdlJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHJpdmF0ZSBvZmZzZXQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBpc0NEUGVuZGluZzogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNTY3JvbGxpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHdoZWVsTW9kZURlZmF1bHQ6ICBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlWyd3aGVlbE1vZGUnXTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICAgICAgICBuZ1pvbmU6IE5nWm9uZSxcbiAgICAgICAgICAgICAgY29uZmlnOiBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVklSVFVBTF9TQ1JPTExfU1RSQVRFR1kpIHB1YmxpYyBwYmxTY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBkaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbGVtZW50UmVmLFxuICAgICAgICAgIGNkcixcbiAgICAgICAgICBuZ1pvbmUsXG4gICAgICAgICAgcGJsU2Nyb2xsU3RyYXRlZ3kgPSByZXNvbHZlU2Nyb2xsU3RyYXRlZ3koY29uZmlnLCBwYmxTY3JvbGxTdHJhdGVneSksXG4gICAgICAgICAgZGlyLFxuICAgICAgICAgIHNjcm9sbERpc3BhdGNoZXIpO1xuXG4gICAgaWYgKGNvbmZpZy5oYXMoJ3ZpcnR1YWxTY3JvbGwnKSkge1xuICAgICAgdGhpcy53aGVlbE1vZGVEZWZhdWx0ID0gY29uZmlnLmdldCgndmlydHVhbFNjcm9sbCcpLndoZWVsTW9kZTtcbiAgICB9XG4gICAgY29uZmlnLm9uVXBkYXRlKCd2aXJ0dWFsU2Nyb2xsJykucGlwZShVblJ4KHRoaXMpKS5zdWJzY3JpYmUoIGNoYW5nZSA9PiB0aGlzLndoZWVsTW9kZURlZmF1bHQgPSBjaGFuZ2UuY3Vyci53aGVlbE1vZGUpO1xuXG4gICAgaWYgKHBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSkge1xuICAgICAgdGhpcy5lbmFibGVkID0gcGJsU2Nyb2xsU3RyYXRlZ3kudHlwZSAhPT0gJ3ZTY3JvbGxOb25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmFibGVkID0gIShwYmxTY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5KTtcbiAgICB9XG4gICAgcGx1Z2luQ3RybC5leHRBcGkuc2V0Vmlld3BvcnQodGhpcyk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UgPSB0aGlzLm9mZnNldENoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICB0aGlzLl9taW5XaWR0aCQgPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudC5raW5kID09PSAnb25SZXNpemVSb3cnKSxcbiAgICAgICAgbWFwKCBlID0+IHRoaXMudGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLnJlZHVjZSggKHAsIGMpID0+IHAgKyBjLnNpemVJbmZvLndpZHRoLCAwICkgKSxcbiAgICAgICAgVW5SeCh0aGlzKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENka1Njcm9sbGFibGUucHJvdG90eXBlLm5nT25Jbml0LmNhbGwodGhpcyk7XG4gICAgfVxuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCAoKSA9PiB0aGlzLmluaXRTY3JvbGxXYXRjaGVyKCkgKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBJZiB2aXJ0dWFsIHNjcm9sbCBpcyBkaXNhYmxlZCAoYE5vVmlydHVhbFNjcm9sbFN0cmF0ZWd5YCkgd2UgbmVlZCB0byBkaXNhYmxlIGFueSBlZmZlY3QgYXBwbGllZFxuICAgIC8vIGJ5IHRoZSB2aWV3cG9ydCwgd3JhcHBpbmcgdGhlIGNvbnRlbnQgaW5qZWN0ZWQgdG8gaXQuXG4gICAgLy8gVGhlIG1haW4gZWZmZWN0IGlzIHRoZSB0YWJsZSBoYXZpbmcgaGVpZ2h0IDAgYXQgYWxsIHRpbWVzLCB1bmxlc3MgdGhlIGhlaWdodCBpcyBleHBsaWNpdGx5IHNldC5cbiAgICAvLyBUaGlzIGhhcHBlbnMgYmVjYXVzZSB0aGUgY29udGVudCB0YWtpbmcgb3V0IG9mIHRoZSBsYXlvdXQsIHdyYXBwZWQgaW4gYWJzb2x1dGUgcG9zaXRpb25pbmcuXG4gICAgLy8gQWRkaXRpb25hbGx5LCB0aGUgaG9zdCBpdHNlbGYgKHZpZXdwb3J0KSBpcyBzZXQgdG8gY29udGFpbjogc3RyaWN0LlxuICAgIGNvbnN0IHsgdGFibGUgfSA9IHRoaXM7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGFibGUuX2Nka1RhYmxlLmF0dGFjaFZpZXdQb3J0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5zY3JvbGxpbmdcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBpc1Njcm9sbGluZyA9PiB7XG4gICAgICAgIHRoaXMuX2lzU2Nyb2xsaW5nID0gISFpc1Njcm9sbGluZztcbiAgICAgICAgaWYgKGlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgdGFibGUuYWRkQ2xhc3MoJ3BibC1uZ3JpZC1zY3JvbGxpbmcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0YWJsZS5yZW1vdmVDbGFzcygncGJsLW5ncmlkLXNjcm9sbGluZycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5vZmZzZXRDaGFuZ2UkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzZXRUb3RhbENvbnRlbnRTaXplKHNpemU6IG51bWJlcikge1xuICAgIHN1cGVyLnNldFRvdGFsQ29udGVudFNpemUoc2l6ZSk7XG5cbiAgICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCAzXTogcnVuIHRoaXMgb25jZS4uLiAoYWdncmVnYXRlIGFsbCBjYWxscyB3aXRoaW4gdGhlIHNhbWUgYW5pbWF0aW9uIGZyYW1lKVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDsgLy9zaXplO1xuICAgICAgdGhpcy51cGRhdGVGaWxsZXIoKTtcbiAgICAgIC8vIFdlIG11c3QgdHJpZ2dlciBhIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGUgYmVjYXVzZSB0aGUgZmlsbGVyIGRpdiBlbGVtZW50IGlzIHVwZGF0ZWQgdGhyb3VnaCBiaW5kaW5nc1xuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfSlcbiAgfVxuXG4gIGNoZWNrVmlld3BvcnRTaXplKCkge1xuICAgIC8vIFRPRE86IENoZWNrIGZvciBjaGFuZ2VzIGluIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRgIHNvdXJjZSBjb2RlLCB3aGVuIHJlc2l6aW5nIGlzIGhhbmRsZWQhXG4gICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iLzI4ZmIzYWJlNzdjNTMzNmU0NzM5YzgyMDU4NGVjOTljMjNmMWFlMzgvc3JjL2Nkay9zY3JvbGxpbmcvdmlydHVhbC1zY3JvbGwtdmlld3BvcnQudHMjTDM0MVxuICAgIGNvbnN0IHByZXYgPSB0aGlzLmdldFZpZXdwb3J0U2l6ZSgpO1xuICAgIHN1cGVyLmNoZWNrVmlld3BvcnRTaXplKCk7XG4gICAgaWYgKHByZXYgIT09IHRoaXMuZ2V0Vmlld3BvcnRTaXplKCkpIHtcbiAgICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIE1lYXN1cmUgdGhlIGNvbWJpbmVkIHNpemUgb2YgYWxsIG9mIHRoZSByZW5kZXJlZCBpdGVtcy4gKi9cbiAgbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTogbnVtYmVyIHtcbiAgICBsZXQgc2l6ZSA9IHN1cGVyLm1lYXN1cmVSZW5kZXJlZENvbnRlbnRTaXplKCk7XG4gICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHNpemUgLT0gdGhpcy5zdGlja3lSb3dIZWFkZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0ICsgdGhpcy5zdGlja3lSb3dGb290ZXJDb250YWluZXIub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAvLyBDb21wZW5zYXRlIGZvciBoeiBzY3JvbGwgYmFyLCBpZiBleGlzdHMsIG9ubHkgaW4gbm9uIHZpcnR1YWwgc2Nyb2xsIG1vZGUuXG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICBzaXplICs9IHRoaXMub3V0ZXJIZWlnaHQgLSB0aGlzLmlubmVySGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5uZ2VSZW5kZXJlZENvbnRlbnRTaXplID0gc2l6ZTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlRmlsbGVyKCk6IHZvaWQge1xuICAgIHRoaXMubWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTtcbiAgICBpZiAodGhpcy50YWJsZS5ub0ZpbGxlcikge1xuICAgICAgdGhpcy5wYmxGaWxsZXJIZWlnaHQgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGJsRmlsbGVySGVpZ2h0ID0gdGhpcy5nZXRWaWV3cG9ydFNpemUoKSA+PSB0aGlzLm5nZVJlbmRlcmVkQ29udGVudFNpemUgP1xuICAgICAgICBgY2FsYygxMDAlIC0gJHt0aGlzLm5nZVJlbmRlcmVkQ29udGVudFNpemV9cHgpYFxuICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgO1xuICAgIH1cbiAgfVxuXG4gIG9uU291cmNlTGVuZ3RoQ2hhbmdlKHByZXY6IG51bWJlciwgY3VycjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja1ZpZXdwb3J0U2l6ZSgpO1xuICAgIHRoaXMudXBkYXRlRmlsbGVyKCk7XG4gIH1cblxuICBhdHRhY2goZm9yT2Y6IENka1ZpcnR1YWxGb3JPZjxhbnk+ICYgTmdlVmlydHVhbFRhYmxlUm93SW5mbykge1xuICAgIHN1cGVyLmF0dGFjaChmb3JPZik7XG4gICAgY29uc3Qgc2Nyb2xsU3RyYXRlZ3kgPSB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5IGluc3RhbmNlb2YgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVxuICAgICAgPyB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5Ll9zY3JvbGxTdHJhdGVneVxuICAgICAgOiB0aGlzLnBibFNjcm9sbFN0cmF0ZWd5XG4gICAgO1xuICAgIGlmIChzY3JvbGxTdHJhdGVneSBpbnN0YW5jZW9mIFRhYmxlQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kpIHtcbiAgICAgIHNjcm9sbFN0cmF0ZWd5LmF2ZXJhZ2VyLnNldFJvd0luZm8oZm9yT2YpO1xuICAgIH1cbiAgfVxuXG4gIHNldFJlbmRlcmVkQ29udGVudE9mZnNldChvZmZzZXQ6IG51bWJlciwgdG86ICd0by1zdGFydCcgfCAndG8tZW5kJyA9ICd0by1zdGFydCcpIHtcbiAgICBzdXBlci5zZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0LCB0byk7XG4gICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgaWYgKHRoaXMub2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIGlmICghdGhpcy5pc0NEUGVuZGluZykge1xuICAgICAgICAgIHRoaXMuaXNDRFBlbmRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgY29uc3Qgc3luY1RyYW5zZm9ybSA9ICgpID0+IHsgfTtcblxuICAgICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAudGhlbiggKCkgPT4gc3luY1RyYW5zZm9ybSgpIClcbiAgICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuaXNDRFBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5vZmZzZXRDaGFuZ2UkLm5leHQodGhpcy5vZmZzZXQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIHNjcm9sbGluZyB3YXRjaGVyIHdoaWNoIHRyYWNrIHNjcm9sbCBldmVudHMgYW4gZW1pdHMgYHNjcm9sbGluZ2AgYW5kIGBzY3JvbGxGcmFtZVJhdGVgIGV2ZW50cy5cbiAgICovXG4gIHByaXZhdGUgaW5pdFNjcm9sbFdhdGNoZXIoKTogdm9pZCB7XG4gICAgbGV0IHNjcm9sbGluZyA9IDA7XG4gICAgbGV0IGxhc3RPZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICB0aGlzLmVsZW1lbnRTY3JvbGxlZCgpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgLyogIGBzY3JvbGxpbmdgIGlzIGEgYm9vbGVhbiBmbGFnIHRoYXQgdHVybnMgb24gd2l0aCB0aGUgZmlyc3QgYHNjcm9sbGAgZXZlbnRzIGFuZCBlbmRzIGFmdGVyIDIgYnJvd3NlciBhbmltYXRpb24gZnJhbWVzIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBgc2Nyb2xsYCBldmVudC5cbiAgICAgICAgICAgIFRoaXMgaXMgYW4gYXR0ZW1wdCB0byBkZXRlY3QgYSBzY3JvbGwgZW5kIGV2ZW50LCB3aGljaCBkb2VzIG5vdCBleGlzdC5cblxuICAgICAgICAgICAgYHNjcm9sbEZyYW1lUmF0ZWAgaXMgYSBudW1iZXIgdGhhdCByZXByZXNlbnQgYSByb3VnaCBlc3RpbWF0aW9uIG9mIHRoZSBmcmFtZSByYXRlIGJ5IG1lYXN1cmluZyB0aGUgdGltZSBwYXNzZWQgYmV0d2VlbiBlYWNoIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICAgICAgICB3aGlsZSB0aGUgYHNjcm9sbGluZ2Agc3RhdGUgaXMgdHJ1ZS4gVGhlIGZyYW1lIHJhdGUgdmFsdWUgaXMgdGhlIGF2ZXJhZ2UgZnJhbWUgcmF0ZSBmcm9tIGFsbCBtZWFzdXJlbWVudHMgc2luY2UgdGhlIHNjcm9sbGluZyBiZWdhbi5cbiAgICAgICAgICAgIFRvIGVzdGltYXRlIHRoZSBmcmFtZSByYXRlLCBhIHNpZ25pZmljYW50IG51bWJlciBvZiBtZWFzdXJlbWVudHMgaXMgcmVxdWlyZWQgc28gdmFsdWUgaXMgZW1pdHRlZCBldmVyeSA1MDAgbXMuXG4gICAgICAgICAgICBUaGlzIG1lYW5zIHRoYXQgYSBzaW5nbGUgc2Nyb2xsIG9yIHNob3J0IHNjcm9sbCBidXJzdHMgd2lsbCBub3QgcmVzdWx0IGluIGEgYHNjcm9sbEZyYW1lUmF0ZWAgZW1pc3Npb25zLlxuXG4gICAgICAgICovXG4gICAgICAgIGlmIChzY3JvbGxpbmcgPT09IDApIHtcbiAgICAgICAgICAvKiAgVGhlIG1lYXN1cmUgYXJyYXkgaG9sZHMgdmFsdWVzIHJlcXVpcmVkIGZvciBmcmFtZSByYXRlIG1lYXN1cmVtZW50cy5cbiAgICAgICAgICAgICAgWzBdIFN0b3JhZ2UgZm9yIGxhc3QgdGltZXN0YW1wIHRha2VuXG4gICAgICAgICAgICAgIFsxXSBUaGUgc3VtIG9mIGFsbCBtZWFzdXJlbWVudHMgdGFrZW4gKGEgbWVhc3VyZW1lbnQgaXMgdGhlIHRpbWUgYmV0d2VlbiAyIHNuYXBzaG90cylcbiAgICAgICAgICAgICAgWzJdIFRoZSBjb3VudCBvZiBhbGwgbWVhc3VyZW1lbnRzXG4gICAgICAgICAgICAgIFszXSBUaGUgc3VtIG9mIGFsbCBtZWFzdXJlbWVudHMgdGFrZW4gV0lUSElOIHRoZSBjdXJyZW50IGJ1ZmZlciB3aW5kb3cuIFRoaXMgYnVmZmVyIGlzIGZsdXNoZWQgaW50byBbMV0gZXZlcnkgWCBtcyAoc2VlIGJ1Z2dlcldpbmRvdyBjb25zdCkuXG4gICAgICAgICAgKi9cbiAgICAgICAgICBjb25zdCBidWZmZXJXaW5kb3cgPSA0OTk7XG4gICAgICAgICAgY29uc3QgbWVhc3VyZSA9IFsgcGVyZm9ybWFuY2Uubm93KCksIDAsIDAsIDAgXTtcbiAgICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgICBpZiAobGFzdE9mZnNldCA9PT0gb2Zmc2V0KSB7IHJldHVybjsgfVxuICAgICAgICAgIGNvbnN0IGRlbHRhID0gbGFzdE9mZnNldCA8IG9mZnNldCA/IDEgOiAtMTtcblxuICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nLm5leHQoZGVsdGEpO1xuXG4gICAgICAgICAgY29uc3QgcmFmID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IC1tZWFzdXJlWzBdICsgKG1lYXN1cmVbMF0gPSBwZXJmb3JtYW5jZS5ub3coKSk7XG4gICAgICAgICAgICBpZiAodGltZSA+IDUpIHtcbiAgICAgICAgICAgICAgbWVhc3VyZVsxXSArPSB0aW1lO1xuICAgICAgICAgICAgICBtZWFzdXJlWzJdICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2Nyb2xsaW5nID09PSAtMSkge1xuICAgICAgICAgICAgICBzY3JvbGxpbmcgPSAwO1xuICAgICAgICAgICAgICBsYXN0T2Zmc2V0ID0gdGhpcy5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCk7XG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsaW5nLm5leHQoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG1lYXN1cmVbMV0gPiBidWZmZXJXaW5kb3cpIHtcbiAgICAgICAgICAgICAgICBtZWFzdXJlWzNdICs9IG1lYXN1cmVbMV07XG4gICAgICAgICAgICAgICAgbWVhc3VyZVsxXSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxGcmFtZVJhdGUuZW1pdCgxMDAwIC8gKG1lYXN1cmVbM10vbWVhc3VyZVsyXSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHNjcm9sbGluZyA9IHNjcm9sbGluZyA9PT0gMSA/IC0xIDogMTtcbiAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgfVxuICAgICAgICBzY3JvbGxpbmcrKztcbiAgICAgIH0pO1xuICB9XG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIENTU1N0eWxlRGVjbGFyYXRpb24ge1xuICAgIGNvbnRhaW46ICdub25lJyB8ICdzdHJpY3QnIHwgJ2NvbnRlbnQnIHwgJ3NpemUnIHwgJ2xheW91dCcgfCAnc3R5bGUnIHwgJ3BhaW50JyB8ICdpbmhlcml0JyB8ICdpbml0aWFsJyB8ICd1bnNldCc7XG4gIH1cbn1cbiJdfQ==