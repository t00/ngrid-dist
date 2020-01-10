import { Subject } from 'rxjs';
import { ElementRef, OnDestroy } from '@angular/core';
import { PblNgridMetaRowService } from './meta-row.service';
export declare class PblNgridMetaRowContainerComponent implements OnDestroy {
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
    private _type;
    private element;
    constructor(metaRows: PblNgridMetaRowService, elRef: ElementRef<HTMLElement>);
    ngOnDestroy(): void;
    private updateWidths;
    private init;
    private syncRowDefinitions;
}
