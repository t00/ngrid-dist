import { Observable } from 'rxjs';
import { AfterViewInit, ElementRef, EventEmitter, ChangeDetectorRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport, VirtualScrollStrategy, ScrollDispatcher, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { PblNgridConfigService } from '../../services/config';
import { PblNgridComponent } from '../../table.component';
import { PblCdkVirtualScrollDirective } from './strategies';
import { NgeVirtualTableRowInfo } from './virtual-scroll-for-of';
declare module '../../services/config' {
    interface PblNgridConfig {
        virtualScroll?: {
            wheelMode?: PblCdkVirtualScrollDirective['wheelMode'];
            defaultStrategy?(): VirtualScrollStrategy;
        };
    }
}
export declare class PblCdkVirtualScrollViewportComponent extends CdkVirtualScrollViewport implements OnInit, AfterViewInit, OnDestroy {
    private cdr;
    pblScrollStrategy: VirtualScrollStrategy;
    private table;
    readonly isScrolling: boolean;
    readonly enabled: boolean;
    /**
     * Emits the offset (in pixels) of the rendered content every time it changes.
     * The emission is done OUTSIDE of angular (i.e. no change detection cycle is triggered).
     *
     * Note that when not enabled (i.e `NoVirtualScrollStrategy` is used) there are no emissions.
     */
    readonly offsetChange: Observable<number>;
    minWidth: number;
    stickyRowHeaderContainer: HTMLElement;
    stickyRowFooterContainer: HTMLElement;
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
    scrolling: EventEmitter<0 | 1 | -1>;
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
    scrollFrameRate: EventEmitter<number>;
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
    scrollHeight: number;
    ngeRenderedContentSize: number;
    pblFillerHeight: string;
    readonly wheelMode: PblCdkVirtualScrollDirective['wheelMode'];
    readonly innerWidth: number;
    readonly outerWidth: number;
    readonly innerHeight: number;
    readonly outerHeight: number;
    /** A string representing the `style.width` property value to be used for the spacer element. */
    _totalContentWidth: string;
    /** A string representing the `style.height` property value to be used for the spacer element. */
    _totalContentHeight: string;
    /**
   * The transform used to scale the spacer to the same size as all content, including content that
   * is not currently rendered.
   * @deprecated
   */
    _totalContentSizeTransform: string;
    private offsetChange$;
    private offset;
    private isCDPending;
    private _isScrolling;
    private wheelModeDefault;
    constructor(elementRef: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, ngZone: NgZone, config: PblNgridConfigService, pblScrollStrategy: VirtualScrollStrategy, dir: Directionality, scrollDispatcher: ScrollDispatcher, pluginCtrl: PblNgridPluginController, table: PblNgridComponent<any>);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setTotalContentSize(size: number): void;
    checkViewportSize(): void;
    /** Measure the combined size of all of the rendered items. */
    measureRenderedContentSize(): number;
    private updateFiller;
    onSourceLengthChange(prev: number, curr: number): void;
    attach(forOf: CdkVirtualForOf<any> & NgeVirtualTableRowInfo): void;
    setRenderedContentOffset(offset: number, to?: 'to-start' | 'to-end'): void;
    /**
     * Init the scrolling watcher which track scroll events an emits `scrolling` and `scrollFrameRate` events.
     */
    private initScrollWatcher;
}
declare global {
    interface CSSStyleDeclaration {
        contain: 'none' | 'strict' | 'content' | 'size' | 'layout' | 'style' | 'paint' | 'inherit' | 'initial' | 'unset';
    }
}
