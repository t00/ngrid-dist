import { ElementRef } from '@angular/core';
import { PblNgridMetaRowService } from './meta-row.service';
import { Observable } from 'rxjs';
export declare class PblNgridMetaRowContainerComponent {
    readonly metaRows: PblNgridMetaRowService;
    type: 'header' | 'footer';
    /**
     * The inner width of the grid, the viewport width of a row.
     * The width of the grid minus scroll bar.
     */
    _innerWidth: number;
    _minWidth: number;
    _width: number;
    readonly _width$: Observable<number>;
    private _type;
    private element;
    constructor(metaRows: PblNgridMetaRowService, elRef: ElementRef<HTMLElement>);
    private init;
    private syncRowDefinitions;
}
