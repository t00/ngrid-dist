import { Subject } from 'rxjs';
import { ElementRef, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { PblNgridMetaRowService } from './meta-row.service';
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridMetaRowContainerComponent implements OnChanges, OnDestroy {
    readonly metaRows: PblNgridMetaRowService;
    type: 'header' | 'footer';
    /**
     * The inner width of the grid, the viewport width of a row.
     * The width of the grid minus scroll bar.
     */
    _innerWidth: number;
    _minWidth: number;
    _width: number;
    readonly _width$: Subject<number>;
    private _totalColumnWidth;
    private element;
    constructor(metaRows: PblNgridMetaRowService, elRef: ElementRef<HTMLElement>);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    private updateWidths;
    private syncRowDefinitions;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridMetaRowContainerComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblNgridMetaRowContainerComponent, "div[pbl-ngrid-fixed-meta-row-container]", never, { "type": "pbl-ngrid-fixed-meta-row-container"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmQudHMiLCJzb3VyY2VzIjpbIm1ldGEtcm93LWNvbnRhaW5lci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvdy5zZXJ2aWNlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRNZXRhUm93Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG4gICAgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2U7XHJcbiAgICB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgaW5uZXIgd2lkdGggb2YgdGhlIGdyaWQsIHRoZSB2aWV3cG9ydCB3aWR0aCBvZiBhIHJvdy5cclxuICAgICAqIFRoZSB3aWR0aCBvZiB0aGUgZ3JpZCBtaW51cyBzY3JvbGwgYmFyLlxyXG4gICAgICovXHJcbiAgICBfaW5uZXJXaWR0aDogbnVtYmVyO1xyXG4gICAgX21pbldpZHRoOiBudW1iZXI7XHJcbiAgICBfd2lkdGg6IG51bWJlcjtcclxuICAgIHJlYWRvbmx5IF93aWR0aCQ6IFN1YmplY3Q8bnVtYmVyPjtcclxuICAgIHByaXZhdGUgX3RvdGFsQ29sdW1uV2lkdGg7XHJcbiAgICBwcml2YXRlIGVsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihtZXRhUm93czogUGJsTmdyaWRNZXRhUm93U2VydmljZSwgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KTtcclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgdXBkYXRlV2lkdGhzO1xyXG4gICAgcHJpdmF0ZSBzeW5jUm93RGVmaW5pdGlvbnM7XHJcbn1cclxuIl19