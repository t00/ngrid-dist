import { Observable } from 'rxjs';
import { OnInit, OnChanges, ElementRef } from '@angular/core';
import { ListRange } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { AutoSizeVirtualScrollStrategy, ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { PblNgridComponent } from '../../ngrid.component';
import { NgeVirtualTableRowInfo } from './virtual-scroll-for-of';
import * as ɵngcc0 from '@angular/core';
export declare class NoVirtualScrollStrategy implements VirtualScrollStrategy {
    scrolledIndexChange: any;
    attach: (viewport: CdkVirtualScrollViewport) => void;
    detach: () => void;
    onContentScrolled: () => void;
    onDataLengthChanged: () => void;
    onContentRendered: () => void;
    onRenderedOffsetChanged: () => void;
    scrollToIndex: (index: number, behavior: ScrollBehavior) => void;
}
export declare class TableItemSizeAverager extends ItemSizeAverager {
    private rowInfo;
    addSample(range: ListRange, size: number): void;
    /**
     * A temp workaround to solve the actual vs wanted rendered row issue in `CdkVirtualScrollViewport`
     *
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the grid to render
     * however, the actual rendered rows might be different. This is a problem especially in init, when the rendered rows are actually 0
     * but `CdkVirtualScrollViewport.getRenderedRange()` return the initial range of rows that should be rendered. This results in a wrong
     * calculation of the average item size in `ItemSizeAverager`
     *
     * SEE: https://github.com/angular/material2/blob/a9e550e5bf93cd68c342d1a50d8576d8f3812ebe/src/cdk/scrolling/virtual-scroll-viewport.ts#L212-L220
     */
    setRowInfo(rowInfo: NgeVirtualTableRowInfo): void;
}
export declare class PblNgridFixedSizeVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    private itemSize;
    private _ngridViewport;
    constructor(itemSize: number, minBufferPx: number, maxBufferPx: number);
    attach(viewport: CdkVirtualScrollViewport): void;
    onContentScrolled(): void;
}
export declare class TableAutoSizeVirtualScrollStrategy extends AutoSizeVirtualScrollStrategy {
    readonly averager: TableItemSizeAverager;
    constructor(minBufferPx: number, maxBufferPx: number, averager?: TableItemSizeAverager);
}
export declare function _vScrollStrategyFactory(directive: {
    _scrollStrategy: VirtualScrollStrategy;
}): VirtualScrollStrategy;
/** A virtual scroll strategy that supports unknown or dynamic size items. */
export declare class PblCdkVirtualScrollDirective implements OnInit, OnChanges, VirtualScrollStrategy {
    private grid;
    /**
   * The size of the items in the list (in pixels).
   * Valid for `vScrollFixed` only!
   *
   * Default: 20
   */
    get vScrollAuto(): number;
    set vScrollAuto(value: number);
    _vScrollAuto: number;
    /**
     * The size of the items in the list (in pixels).
     * Valid for `vScrollFixed` only!
     *
     * Default: 20
     */
    get vScrollFixed(): number;
    set vScrollFixed(value: number);
    _vScrollFixed: number;
    /**
     * The minimum amount of buffer rendered beyond the viewport (in pixels).
     * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     */
    get minBufferPx(): number;
    set minBufferPx(value: number);
    _minBufferPx: number;
    /**
     * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     */
    get maxBufferPx(): number;
    set maxBufferPx(value: number);
    _maxBufferPx: number;
    get wheelMode(): 'passive' | 'blocking' | number;
    set wheelMode(value: 'passive' | 'blocking' | number);
    _wheelMode: 'passive' | 'blocking' | number;
    /** The scroll strategy used by this directive. */
    _scrollStrategy: VirtualScrollStrategy;
    get type(): 'vScrollFixed' | 'vScrollAuto' | 'vScrollNone';
    private _type;
    constructor(el: ElementRef<HTMLElement>, grid: PblNgridComponent<any>);
    ngOnInit(): void;
    ngOnChanges(): void;
    get scrolledIndexChange(): Observable<number>;
    set scrolledIndexChange(value: Observable<number>);
    attach(viewport: CdkVirtualScrollViewport): void;
    detach(): void;
    onContentScrolled(): void;
    onDataLengthChanged(): void;
    onContentRendered(): void;
    onRenderedOffsetChanged(): void;
    scrollToIndex(index: number, behavior: ScrollBehavior): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblCdkVirtualScrollDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblCdkVirtualScrollDirective, "pbl-ngrid[vScrollAuto], pbl-ngrid[vScrollFixed], pbl-ngrid[vScrollNone]", never, { "vScrollAuto": "vScrollAuto"; "vScrollFixed": "vScrollFixed"; "minBufferPx": "minBufferPx"; "maxBufferPx": "maxBufferPx"; "wheelMode": "wheelMode"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyYXRlZ2llcy5kLnRzIiwic291cmNlcyI6WyJzdHJhdGVnaWVzLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE9uSW5pdCwgT25DaGFuZ2VzLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcbmltcG9ydCB7IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwgRml4ZWRTaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5LCBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcclxuaW1wb3J0IHsgQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3ksIEl0ZW1TaXplQXZlcmFnZXIgfSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3Njcm9sbGluZyc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtZm9yLW9mJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTm9WaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgaW1wbGVtZW50cyBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xyXG4gICAgc2Nyb2xsZWRJbmRleENoYW5nZTogYW55O1xyXG4gICAgYXR0YWNoOiAodmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCkgPT4gdm9pZDtcclxuICAgIGRldGFjaDogKCkgPT4gdm9pZDtcclxuICAgIG9uQ29udGVudFNjcm9sbGVkOiAoKSA9PiB2b2lkO1xyXG4gICAgb25EYXRhTGVuZ3RoQ2hhbmdlZDogKCkgPT4gdm9pZDtcclxuICAgIG9uQ29udGVudFJlbmRlcmVkOiAoKSA9PiB2b2lkO1xyXG4gICAgb25SZW5kZXJlZE9mZnNldENoYW5nZWQ6ICgpID0+IHZvaWQ7XHJcbiAgICBzY3JvbGxUb0luZGV4OiAoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yKSA9PiB2b2lkO1xyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFRhYmxlSXRlbVNpemVBdmVyYWdlciBleHRlbmRzIEl0ZW1TaXplQXZlcmFnZXIge1xyXG4gICAgcHJpdmF0ZSByb3dJbmZvO1xyXG4gICAgYWRkU2FtcGxlKHJhbmdlOiBMaXN0UmFuZ2UsIHNpemU6IG51bWJlcik6IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIEEgdGVtcCB3b3JrYXJvdW5kIHRvIHNvbHZlIHRoZSBhY3R1YWwgdnMgd2FudGVkIHJlbmRlcmVkIHJvdyBpc3N1ZSBpbiBgQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0YFxyXG4gICAgICpcclxuICAgICAqIGBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpYCByZXR1cm4gdGhlIHJvd3MgdGhhdCB0aGUgdmlydHVhbCBjb250YWluZXIgd2FudCdzIHRoZSBncmlkIHRvIHJlbmRlclxyXG4gICAgICogaG93ZXZlciwgdGhlIGFjdHVhbCByZW5kZXJlZCByb3dzIG1pZ2h0IGJlIGRpZmZlcmVudC4gVGhpcyBpcyBhIHByb2JsZW0gZXNwZWNpYWxseSBpbiBpbml0LCB3aGVuIHRoZSByZW5kZXJlZCByb3dzIGFyZSBhY3R1YWxseSAwXHJcbiAgICAgKiBidXQgYENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKClgIHJldHVybiB0aGUgaW5pdGlhbCByYW5nZSBvZiByb3dzIHRoYXQgc2hvdWxkIGJlIHJlbmRlcmVkLiBUaGlzIHJlc3VsdHMgaW4gYSB3cm9uZ1xyXG4gICAgICogY2FsY3VsYXRpb24gb2YgdGhlIGF2ZXJhZ2UgaXRlbSBzaXplIGluIGBJdGVtU2l6ZUF2ZXJhZ2VyYFxyXG4gICAgICpcclxuICAgICAqIFNFRTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvYTllNTUwZTViZjkzY2Q2OGMzNDJkMWE1MGQ4NTc2ZDhmMzgxMmViZS9zcmMvY2RrL3Njcm9sbGluZy92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC50cyNMMjEyLUwyMjBcclxuICAgICAqL1xyXG4gICAgc2V0Um93SW5mbyhyb3dJbmZvOiBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvKTogdm9pZDtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSBleHRlbmRzIEZpeGVkU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XHJcbiAgICBwcml2YXRlIGl0ZW1TaXplO1xyXG4gICAgcHJpdmF0ZSBfbmdyaWRWaWV3cG9ydDtcclxuICAgIGNvbnN0cnVjdG9yKGl0ZW1TaXplOiBudW1iZXIsIG1pbkJ1ZmZlclB4OiBudW1iZXIsIG1heEJ1ZmZlclB4OiBudW1iZXIpO1xyXG4gICAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpOiB2b2lkO1xyXG4gICAgb25Db250ZW50U2Nyb2xsZWQoKTogdm9pZDtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBUYWJsZUF1dG9TaXplVmlydHVhbFNjcm9sbFN0cmF0ZWd5IGV4dGVuZHMgQXV0b1NpemVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xyXG4gICAgcmVhZG9ubHkgYXZlcmFnZXI6IFRhYmxlSXRlbVNpemVBdmVyYWdlcjtcclxuICAgIGNvbnN0cnVjdG9yKG1pbkJ1ZmZlclB4OiBudW1iZXIsIG1heEJ1ZmZlclB4OiBudW1iZXIsIGF2ZXJhZ2VyPzogVGFibGVJdGVtU2l6ZUF2ZXJhZ2VyKTtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBmdW5jdGlvbiBfdlNjcm9sbFN0cmF0ZWd5RmFjdG9yeShkaXJlY3RpdmU6IHtcclxuICAgIF9zY3JvbGxTdHJhdGVneTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xyXG59KTogVmlydHVhbFNjcm9sbFN0cmF0ZWd5O1xyXG4vKiogQSB2aXJ0dWFsIHNjcm9sbCBzdHJhdGVneSB0aGF0IHN1cHBvcnRzIHVua25vd24gb3IgZHluYW1pYyBzaXplIGl0ZW1zLiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxDZGtWaXJ0dWFsU2Nyb2xsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XHJcbiAgICBwcml2YXRlIGdyaWQ7XHJcbiAgICAvKipcclxuICAgKiBUaGUgc2l6ZSBvZiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgKGluIHBpeGVscykuXHJcbiAgICogVmFsaWQgZm9yIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAyMFxyXG4gICAqL1xyXG4gICAgZ2V0IHZTY3JvbGxBdXRvKCk6IG51bWJlcjtcclxuICAgIHNldCB2U2Nyb2xsQXV0byh2YWx1ZTogbnVtYmVyKTtcclxuICAgIF92U2Nyb2xsQXV0bzogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgc2l6ZSBvZiB0aGUgaXRlbXMgaW4gdGhlIGxpc3QgKGluIHBpeGVscykuXHJcbiAgICAgKiBWYWxpZCBmb3IgYHZTY3JvbGxGaXhlZGAgb25seSFcclxuICAgICAqXHJcbiAgICAgKiBEZWZhdWx0OiAyMFxyXG4gICAgICovXHJcbiAgICBnZXQgdlNjcm9sbEZpeGVkKCk6IG51bWJlcjtcclxuICAgIHNldCB2U2Nyb2xsRml4ZWQodmFsdWU6IG51bWJlcik7XHJcbiAgICBfdlNjcm9sbEZpeGVkOiBudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIFRoZSBtaW5pbXVtIGFtb3VudCBvZiBidWZmZXIgcmVuZGVyZWQgYmV5b25kIHRoZSB2aWV3cG9ydCAoaW4gcGl4ZWxzKS5cclxuICAgICAqIElmIHRoZSBhbW91bnQgb2YgYnVmZmVyIGRpcHMgYmVsb3cgdGhpcyBudW1iZXIsIG1vcmUgaXRlbXMgd2lsbCBiZSByZW5kZXJlZC4gRGVmYXVsdHMgdG8gMTAwcHguXHJcbiAgICAgKlxyXG4gICAgICogVmFsaWQgZm9yIGB2U2Nyb2xsQXV0b2AgYW5kIGB2U2Nyb2xsRml4ZWRgIG9ubHkhXHJcbiAgICAgKiBEZWZhdWx0OiAxMDBcclxuICAgICAqL1xyXG4gICAgZ2V0IG1pbkJ1ZmZlclB4KCk6IG51bWJlcjtcclxuICAgIHNldCBtaW5CdWZmZXJQeCh2YWx1ZTogbnVtYmVyKTtcclxuICAgIF9taW5CdWZmZXJQeDogbnVtYmVyO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHBpeGVscyB3b3J0aCBvZiBidWZmZXIgdG8gcmVuZGVyIGZvciB3aGVuIHJlbmRlcmluZyBuZXcgaXRlbXMuIERlZmF1bHRzIHRvIDIwMHB4LlxyXG4gICAgICpcclxuICAgICAqIFZhbGlkIGZvciBgdlNjcm9sbEF1dG9gIGFuZCBgdlNjcm9sbEZpeGVkYCBvbmx5IVxyXG4gICAgICogRGVmYXVsdDogMTAwXHJcbiAgICAgKi9cclxuICAgIGdldCBtYXhCdWZmZXJQeCgpOiBudW1iZXI7XHJcbiAgICBzZXQgbWF4QnVmZmVyUHgodmFsdWU6IG51bWJlcik7XHJcbiAgICBfbWF4QnVmZmVyUHg6IG51bWJlcjtcclxuICAgIGdldCB3aGVlbE1vZGUoKTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlcjtcclxuICAgIHNldCB3aGVlbE1vZGUodmFsdWU6ICdwYXNzaXZlJyB8ICdibG9ja2luZycgfCBudW1iZXIpO1xyXG4gICAgX3doZWVsTW9kZTogJ3Bhc3NpdmUnIHwgJ2Jsb2NraW5nJyB8IG51bWJlcjtcclxuICAgIC8qKiBUaGUgc2Nyb2xsIHN0cmF0ZWd5IHVzZWQgYnkgdGhpcyBkaXJlY3RpdmUuICovXHJcbiAgICBfc2Nyb2xsU3RyYXRlZ3k6IFZpcnR1YWxTY3JvbGxTdHJhdGVneTtcclxuICAgIGdldCB0eXBlKCk6ICd2U2Nyb2xsRml4ZWQnIHwgJ3ZTY3JvbGxBdXRvJyB8ICd2U2Nyb2xsTm9uZSc7XHJcbiAgICBwcml2YXRlIF90eXBlO1xyXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkO1xyXG4gICAgZ2V0IHNjcm9sbGVkSW5kZXhDaGFuZ2UoKTogT2JzZXJ2YWJsZTxudW1iZXI+O1xyXG4gICAgc2V0IHNjcm9sbGVkSW5kZXhDaGFuZ2UodmFsdWU6IE9ic2VydmFibGU8bnVtYmVyPik7XHJcbiAgICBhdHRhY2godmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCk6IHZvaWQ7XHJcbiAgICBkZXRhY2goKTogdm9pZDtcclxuICAgIG9uQ29udGVudFNjcm9sbGVkKCk6IHZvaWQ7XHJcbiAgICBvbkRhdGFMZW5ndGhDaGFuZ2VkKCk6IHZvaWQ7XHJcbiAgICBvbkNvbnRlbnRSZW5kZXJlZCgpOiB2b2lkO1xyXG4gICAgb25SZW5kZXJlZE9mZnNldENoYW5nZWQoKTogdm9pZDtcclxuICAgIHNjcm9sbFRvSW5kZXgoaW5kZXg6IG51bWJlciwgYmVoYXZpb3I6IFNjcm9sbEJlaGF2aW9yKTogdm9pZDtcclxufVxyXG4iXX0=