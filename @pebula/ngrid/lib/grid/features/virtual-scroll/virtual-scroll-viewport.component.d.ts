import { Observable } from 'rxjs';
import { AfterViewInit, ElementRef, EventEmitter, ChangeDetectorRef, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { CdkVirtualScrollViewport, VirtualScrollStrategy, ScrollDispatcher, CdkVirtualForOf } from '@angular/cdk/scrolling';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { PblNgridConfigService } from '../../services/config';
import { PblNgridComponent } from '../../ngrid.component';
import { PblCdkVirtualScrollDirective } from './strategies';
import { NgeVirtualTableRowInfo } from './virtual-scroll-for-of';
import * as ɵngcc0 from '@angular/core';
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
    private grid;
    get isScrolling(): boolean;
    readonly enabled: boolean;
    /**
     * Emits the offset (in pixels) of the rendered content every time it changes.
     * The emission is done OUTSIDE of angular (i.e. no change detection cycle is triggered).
     *
     * Note that when not enabled (i.e `NoVirtualScrollStrategy` is used) there are no emissions.
     */
    readonly offsetChange: Observable<number>;
    stickyRowHeaderContainer: HTMLElement;
    stickyRowFooterContainer: HTMLElement;
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
    get wheelMode(): PblCdkVirtualScrollDirective['wheelMode'];
    get innerWidth(): number;
    get outerWidth(): number;
    get innerHeight(): number;
    get outerHeight(): number;
    get scrollWidth(): number;
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
    readonly _minWidth$: Observable<number>;
    private offsetChange$;
    private offset;
    private isCDPending;
    private _isScrolling;
    private wheelModeDefault;
    constructor(elementRef: ElementRef<HTMLElement>, cdr: ChangeDetectorRef, ngZone: NgZone, config: PblNgridConfigService, pblScrollStrategy: VirtualScrollStrategy, dir: Directionality, scrollDispatcher: ScrollDispatcher, pluginCtrl: PblNgridPluginController, grid: PblNgridComponent<any>);
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblCdkVirtualScrollViewportComponent, [null, null, null, null, { optional: true; }, { optional: true; }, null, null, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblCdkVirtualScrollViewportComponent, "pbl-cdk-virtual-scroll-viewport", never, { "stickyRowHeaderContainer": "stickyRowHeaderContainer"; "stickyRowFooterContainer": "stickyRowFooterContainer"; }, { "scrolling": "scrolling"; "scrollFrameRate": "scrollFrameRate"; }, never, [".cdk-virtual-scroll-before-content-wrapper", "*"]>;
}
declare global {
    interface CSSStyleDeclaration {
        contain: 'none' | 'strict' | 'content' | 'size' | 'layout' | 'style' | 'paint' | 'inherit' | 'initial' | 'unset';
    }
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbInZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdG9yUmVmLCBOZ1pvbmUsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xyXG5pbXBvcnQgeyBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQsIFZpcnR1YWxTY3JvbGxTdHJhdGVneSwgU2Nyb2xsRGlzcGF0Y2hlciwgQ2RrVmlydHVhbEZvck9mIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZyc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZSB9IGZyb20gJy4vc3RyYXRlZ2llcyc7XHJcbmltcG9ydCB7IE5nZVZpcnR1YWxUYWJsZVJvd0luZm8gfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZic7XHJcbmRlY2xhcmUgbW9kdWxlICcuLi8uLi9zZXJ2aWNlcy9jb25maWcnIHtcclxuICAgIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XHJcbiAgICAgICAgdmlydHVhbFNjcm9sbD86IHtcclxuICAgICAgICAgICAgd2hlZWxNb2RlPzogUGJsQ2RrVmlydHVhbFNjcm9sbERpcmVjdGl2ZVsnd2hlZWxNb2RlJ107XHJcbiAgICAgICAgICAgIGRlZmF1bHRTdHJhdGVneT8oKTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IGV4dGVuZHMgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgcHJpdmF0ZSBjZHI7XHJcbiAgICBwYmxTY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xyXG4gICAgcHJpdmF0ZSBncmlkO1xyXG4gICAgZ2V0IGlzU2Nyb2xsaW5nKCk6IGJvb2xlYW47XHJcbiAgICByZWFkb25seSBlbmFibGVkOiBib29sZWFuO1xyXG4gICAgLyoqXHJcbiAgICAgKiBFbWl0cyB0aGUgb2Zmc2V0IChpbiBwaXhlbHMpIG9mIHRoZSByZW5kZXJlZCBjb250ZW50IGV2ZXJ5IHRpbWUgaXQgY2hhbmdlcy5cclxuICAgICAqIFRoZSBlbWlzc2lvbiBpcyBkb25lIE9VVFNJREUgb2YgYW5ndWxhciAoaS5lLiBubyBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGlzIHRyaWdnZXJlZCkuXHJcbiAgICAgKlxyXG4gICAgICogTm90ZSB0aGF0IHdoZW4gbm90IGVuYWJsZWQgKGkuZSBgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3lgIGlzIHVzZWQpIHRoZXJlIGFyZSBubyBlbWlzc2lvbnMuXHJcbiAgICAgKi9cclxuICAgIHJlYWRvbmx5IG9mZnNldENoYW5nZTogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gICAgc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICAgIHN0aWNreVJvd0Zvb3RlckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XHJcbiAgICAvKipcclxuICAgICAqIEV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgc2Nyb2xsaW5nIHN0YXRlIG9mIHJvd3MgaW4gdGhlIGdyaWQgY2hhbmdlcy5cclxuICAgICAqIFdoZW4gc2Nyb2xsaW5nIHN0YXJ0cyBgdHJ1ZWAgaXMgZW1pdHRlZCBhbmQgd2hlbiB0aGUgc2Nyb2xsaW5nIGVuZHMgYGZhbHNlYCBpcyBlbWl0dGVkLlxyXG4gICAgICpcclxuICAgICAqIFRoZSBncmlkIGlzIGluIFwic2Nyb2xsaW5nXCIgc3RhdGUgZnJvbSB0aGUgZmlyc3Qgc2Nyb2xsIGV2ZW50IGFuZCB1bnRpbCAyIGFuaW1hdGlvbiBmcmFtZXNcclxuICAgICAqIGhhdmUgcGFzc2VkIHdpdGhvdXQgYSBzY3JvbGwgZXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogV2hlbiBzY3JvbGxpbmcsIHRoZSBlbWl0dGVkIHZhbHVlIGlzIHRoZSBkaXJlY3Rpb246IC0xIG9yIDFcclxuICAgICAqIFdoZW4gbm90IHNjcm9sbGluZywgdGhlIGVtaXR0ZWQgdmFsdWUgaXMgMC5cclxuICAgICAqXHJcbiAgICAgKiBOT1RFOiBUaGlzIGV2ZW50IHJ1bnMgb3V0c2lkZSB0aGUgYW5ndWxhciB6b25lLlxyXG4gICAgICovXHJcbiAgICBzY3JvbGxpbmc6IEV2ZW50RW1pdHRlcjwwIHwgMSB8IC0xPjtcclxuICAgIC8qKlxyXG4gICAgICogRW1pdHMgYW4gZXN0aW1hdGlvbiBvZiB0aGUgY3VycmVudCBmcmFtZSByYXRlIHdoaWxlIHNjcm9sbGluZywgaW4gYSA1MDBtcyBpbnRlcnZhbC5cclxuICAgICAqXHJcbiAgICAgKiBUaGUgZnJhbWUgcmF0ZSB2YWx1ZSBpcyB0aGUgYXZlcmFnZSBmcmFtZSByYXRlIGZyb20gYWxsIG1lYXN1cmVtZW50cyBzaW5jZSB0aGUgc2Nyb2xsaW5nIGJlZ2FuLlxyXG4gICAgICogVG8gZXN0aW1hdGUgdGhlIGZyYW1lIHJhdGUsIGEgc2lnbmlmaWNhbnQgbnVtYmVyIG9mIG1lYXN1cmVtZW50cyBpcyByZXF1aXJlZCBzbyB2YWx1ZSBpcyBlbWl0dGVkIGV2ZXJ5IDUwMCBtcy5cclxuICAgICAqIFRoaXMgbWVhbnMgdGhhdCBhIHNpbmdsZSBzY3JvbGwgb3Igc2hvcnQgc2Nyb2xsIGJ1cnN0cyB3aWxsIG5vdCByZXN1bHQgaW4gYSBgc2Nyb2xsRnJhbWVSYXRlYCBlbWlzc2lvbnMuXHJcbiAgICAgKlxyXG4gICAgICogVmFsaWQgb24gd2hlbiB2aXJ0dWFsIHNjcm9sbGluZyBpcyBlbmFibGVkLlxyXG4gICAgICpcclxuICAgICAqIE5PVEU6IFRoaXMgZXZlbnQgcnVucyBvdXRzaWRlIHRoZSBhbmd1bGFyIHpvbmUuXHJcbiAgICAgKlxyXG4gICAgICogSW4gdGhlIGZ1dHVyZSB0aGUgbWVhc3VyZW1lbnQgbG9naWMgbWlnaHQgYmUgcmVwbGFjZWQgd2l0aCB0aGUgRnJhbWUgVGltaW5nIEFQSVxyXG4gICAgICogU2VlOlxyXG4gICAgICogLSBodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS93ZWIvdXBkYXRlcy8yMDE0LzExL2ZyYW1lLXRpbWluZy1hcGlcclxuICAgICAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1BlcmZvcm1hbmNlT2JzZXJ2ZXJcclxuICAgICAqIC0gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZWFyY2hpdmUvZnJhbWUtdGltaW5nLXBvbHlmaWxsL3dpa2kvRXhwbGFpbmVyXHJcbiAgICAgKi9cclxuICAgIHNjcm9sbEZyYW1lUmF0ZTogRXZlbnRFbWl0dGVyPG51bWJlcj47XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBgc2Nyb2xsSGVpZ2h0YCBvZiB0aGUgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQuXHJcbiAgICAgKiBUaGUgYHNjcm9sbEhlaWdodGAgaXMgdXBkYXRlZCBieSB0aGUgdmlydHVhbCBzY3JvbGwgKHVwZGF0ZSBsb2dpYyBhbmQgZnJlcXVlbmN5IGRlcGVuZHMgb24gdGhlIHN0cmF0ZWd5IGltcGxlbWVudGF0aW9uKSB0aHJvdWdoXHJcbiAgICAgKiB0aGUgYHNldFRvdGFsQ29udGVudFNpemUoc2l6ZSlgIG1ldGhvZC4gVGhlIGlucHV0IHNpemUgaXMgdXNlZCB0byBwb3NpdGlvbiBhIGR1bW15IHNwYWNlciBlbGVtZW50IGF0IGEgcG9zaXRpb24gdGhhdCBtaW1pY3MgdGhlIGBzY3JvbGxIZWlnaHRgLlxyXG4gICAgICpcclxuICAgICAqIEluIHRoZW9yeSwgdGhlIHNpemUgc2VudCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAgc2hvdWxkIGVxdWFsIHRoZSBgc2Nyb2xsSGVpZ2h0YCB2YWx1ZSwgb25jZSB0aGUgYnJvd3NlciB1cGRhdGUncyB0aGUgbGF5b3V0LlxyXG4gICAgICogSW4gcmVhbGl0eSBpdCBkb2VzIG5vdCBoYXBwZW4sIHNvbWV0aW1lcyB0aGV5IGFyZSBub3QgZXF1YWwuIFNldHRpbmcgYSBzaXplIHdpbGwgcmVzdWx0IGluIGEgZGlmZmVyZW50IGBzY3JvbGxIZWlnaHRgLlxyXG4gICAgICogVGhpcyBtaWdodCBiZSBkdWUgdG8gY2hhbmdlcyBpbiBtZWFzdXJlbWVudHMgd2hlbiBoYW5kbGluZyBzdGlja3kgbWV0YSByb3dzIChtb3ZpbmcgYmFjayBhbmQgZm9ydGgpXHJcbiAgICAgKlxyXG4gICAgICogQmVjYXVzZSB0aGUgcG9zaXRpb24gb2YgdGhlIGR1bW15IHNwYWNlciBlbGVtZW50IGlzIHNldCB0aHJvdWdoIERJIHRoZSBsYXlvdXQgd2lsbCBydW4gaW4gdGhlIG5leHQgbWljcm8tdGFzayBhZnRlciB0aGUgY2FsbCB0byBgc2V0VG90YWxDb250ZW50U2l6ZWAuXHJcbiAgICAgKi9cclxuICAgIHNjcm9sbEhlaWdodDogbnVtYmVyO1xyXG4gICAgbmdlUmVuZGVyZWRDb250ZW50U2l6ZTogbnVtYmVyO1xyXG4gICAgcGJsRmlsbGVySGVpZ2h0OiBzdHJpbmc7XHJcbiAgICBnZXQgd2hlZWxNb2RlKCk6IFBibENka1ZpcnR1YWxTY3JvbGxEaXJlY3RpdmVbJ3doZWVsTW9kZSddO1xyXG4gICAgZ2V0IGlubmVyV2lkdGgoKTogbnVtYmVyO1xyXG4gICAgZ2V0IG91dGVyV2lkdGgoKTogbnVtYmVyO1xyXG4gICAgZ2V0IGlubmVySGVpZ2h0KCk6IG51bWJlcjtcclxuICAgIGdldCBvdXRlckhlaWdodCgpOiBudW1iZXI7XHJcbiAgICBnZXQgc2Nyb2xsV2lkdGgoKTogbnVtYmVyO1xyXG4gICAgLyoqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgYHN0eWxlLndpZHRoYCBwcm9wZXJ0eSB2YWx1ZSB0byBiZSB1c2VkIGZvciB0aGUgc3BhY2VyIGVsZW1lbnQuICovXHJcbiAgICBfdG90YWxDb250ZW50V2lkdGg6IHN0cmluZztcclxuICAgIC8qKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGBzdHlsZS5oZWlnaHRgIHByb3BlcnR5IHZhbHVlIHRvIGJlIHVzZWQgZm9yIHRoZSBzcGFjZXIgZWxlbWVudC4gKi9cclxuICAgIF90b3RhbENvbnRlbnRIZWlnaHQ6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAqIFRoZSB0cmFuc2Zvcm0gdXNlZCB0byBzY2FsZSB0aGUgc3BhY2VyIHRvIHRoZSBzYW1lIHNpemUgYXMgYWxsIGNvbnRlbnQsIGluY2x1ZGluZyBjb250ZW50IHRoYXRcclxuICAgKiBpcyBub3QgY3VycmVudGx5IHJlbmRlcmVkLlxyXG4gICAqIEBkZXByZWNhdGVkXHJcbiAgICovXHJcbiAgICBfdG90YWxDb250ZW50U2l6ZVRyYW5zZm9ybTogc3RyaW5nO1xyXG4gICAgcmVhZG9ubHkgX21pbldpZHRoJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gICAgcHJpdmF0ZSBvZmZzZXRDaGFuZ2UkO1xyXG4gICAgcHJpdmF0ZSBvZmZzZXQ7XHJcbiAgICBwcml2YXRlIGlzQ0RQZW5kaW5nO1xyXG4gICAgcHJpdmF0ZSBfaXNTY3JvbGxpbmc7XHJcbiAgICBwcml2YXRlIHdoZWVsTW9kZURlZmF1bHQ7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgbmdab25lOiBOZ1pvbmUsIGNvbmZpZzogUGJsTmdyaWRDb25maWdTZXJ2aWNlLCBwYmxTY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBkaXI6IERpcmVjdGlvbmFsaXR5LCBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pO1xyXG4gICAgbmdPbkluaXQoKTogdm9pZDtcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHNldFRvdGFsQ29udGVudFNpemUoc2l6ZTogbnVtYmVyKTogdm9pZDtcclxuICAgIGNoZWNrVmlld3BvcnRTaXplKCk6IHZvaWQ7XHJcbiAgICAvKiogTWVhc3VyZSB0aGUgY29tYmluZWQgc2l6ZSBvZiBhbGwgb2YgdGhlIHJlbmRlcmVkIGl0ZW1zLiAqL1xyXG4gICAgbWVhc3VyZVJlbmRlcmVkQ29udGVudFNpemUoKTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVGaWxsZXI7XHJcbiAgICBvblNvdXJjZUxlbmd0aENoYW5nZShwcmV2OiBudW1iZXIsIGN1cnI6IG51bWJlcik6IHZvaWQ7XHJcbiAgICBhdHRhY2goZm9yT2Y6IENka1ZpcnR1YWxGb3JPZjxhbnk+ICYgTmdlVmlydHVhbFRhYmxlUm93SW5mbyk6IHZvaWQ7XHJcbiAgICBzZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQob2Zmc2V0OiBudW1iZXIsIHRvPzogJ3RvLXN0YXJ0JyB8ICd0by1lbmQnKTogdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogSW5pdCB0aGUgc2Nyb2xsaW5nIHdhdGNoZXIgd2hpY2ggdHJhY2sgc2Nyb2xsIGV2ZW50cyBhbiBlbWl0cyBgc2Nyb2xsaW5nYCBhbmQgYHNjcm9sbEZyYW1lUmF0ZWAgZXZlbnRzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRTY3JvbGxXYXRjaGVyO1xyXG59XHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBDU1NTdHlsZURlY2xhcmF0aW9uIHtcclxuICAgICAgICBjb250YWluOiAnbm9uZScgfCAnc3RyaWN0JyB8ICdjb250ZW50JyB8ICdzaXplJyB8ICdsYXlvdXQnIHwgJ3N0eWxlJyB8ICdwYWludCcgfCAnaW5oZXJpdCcgfCAnaW5pdGlhbCcgfCAndW5zZXQnO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==