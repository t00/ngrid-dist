import { Observable } from 'rxjs';
import { OnInit, OnChanges, ElementRef } from '@angular/core';
import { ListRange } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, FixedSizeVirtualScrollStrategy, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { AutoSizeVirtualScrollStrategy, ItemSizeAverager } from '@angular/cdk-experimental/scrolling';
import { PblNgridComponent } from '../../table.component';
import { NgeVirtualTableRowInfo } from './virtual-scroll-for-of';
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
     * `CdkVirtualScrollViewport.getRenderedRange()` return the rows that the virtual container want's the table to render
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
    private table;
    /**
   * The size of the items in the list (in pixels).
   * Valid for `vScrollFixed` only!
   *
   * Default: 20
   */
    vScrollAuto: number;
    _vScrollAuto: number;
    /**
     * The size of the items in the list (in pixels).
     * Valid for `vScrollFixed` only!
     *
     * Default: 20
     */
    vScrollFixed: number;
    _vScrollFixed: number;
    /**
     * The minimum amount of buffer rendered beyond the viewport (in pixels).
     * If the amount of buffer dips below this number, more items will be rendered. Defaults to 100px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     */
    minBufferPx: number;
    _minBufferPx: number;
    /**
     * The number of pixels worth of buffer to render for when rendering new items. Defaults to 200px.
     *
     * Valid for `vScrollAuto` and `vScrollFixed` only!
     * Default: 100
     */
    maxBufferPx: number;
    _maxBufferPx: number;
    wheelMode: 'passive' | 'blocking' | number;
    _wheelMode: 'passive' | 'blocking' | number;
    /** The scroll strategy used by this directive. */
    _scrollStrategy: VirtualScrollStrategy;
    readonly type: 'vScrollFixed' | 'vScrollAuto' | 'vScrollNone';
    private _type;
    constructor(el: ElementRef<HTMLElement>, table: PblNgridComponent<any>);
    ngOnInit(): void;
    ngOnChanges(): void;
    scrolledIndexChange: Observable<number>;
    attach(viewport: CdkVirtualScrollViewport): void;
    detach(): void;
    onContentScrolled(): void;
    onDataLengthChanged(): void;
    onContentRendered(): void;
    onRenderedOffsetChanged(): void;
    scrollToIndex(index: number, behavior: ScrollBehavior): void;
}
