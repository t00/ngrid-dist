import { ElementRef, OnDestroy } from '@angular/core';
import { PblMetaRowDefinitions } from '../columns/types';
import { PblNgridMetaRowService } from './meta-row.service';
export declare class PblMetaRowDirective implements OnDestroy {
    readonly metaRows: PblNgridMetaRowService;
    elRef: ElementRef<HTMLElement>;
    meta: PblMetaRowDefinitions;
    private _meta;
    constructor(metaRows: PblNgridMetaRowService, elRef: ElementRef<HTMLElement>);
    ngOnDestroy(): void;
    private update;
}
