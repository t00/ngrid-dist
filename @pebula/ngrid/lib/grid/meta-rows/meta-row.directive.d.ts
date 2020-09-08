import { ElementRef, OnDestroy } from '@angular/core';
import { PblMetaRowDefinitions } from '../columns/types';
import { PblNgridMetaRowService } from './meta-row.service';
export declare class PblMetaRowDirective implements OnDestroy {
    readonly metaRows: PblNgridMetaRowService;
    elRef: ElementRef<HTMLElement>;
    get meta(): PblMetaRowDefinitions;
    set meta(value: PblMetaRowDefinitions);
    readonly gridWidthRow: boolean;
    private _meta;
    constructor(metaRows: PblNgridMetaRowService, elRef: ElementRef<HTMLElement>, gridWidthRow: any);
    ngOnDestroy(): void;
    private update;
}
