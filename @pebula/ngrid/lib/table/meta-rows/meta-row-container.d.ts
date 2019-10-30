import { ElementRef } from '@angular/core';
import { PblNgridMetaRowService } from './meta-row.service';
export declare class PblNgridMetaRowContainerComponent {
    readonly metaRows: PblNgridMetaRowService;
    type: 'header' | 'footer';
    /**
     * The inner width of the table, the viewport width of a row.
     * The width of the table minus scroll bar.
     */
    _innerWidth: number;
    _minWidth: number;
    _width: number;
    private _type;
    private defs;
    private element;
    constructor(metaRows: PblNgridMetaRowService, elRef: ElementRef<HTMLElement>);
    private init;
    private syncRowDefinitions;
}
