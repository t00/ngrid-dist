import { ElementRef, OnDestroy } from '@angular/core';
import { PblMetaRowDefinitions } from '../columns/types';
import { PblNgridMetaRowService } from './meta-row.service';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblMetaRowDirective, [null, null, { attribute: "gridWidthRow"; }]>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblMetaRowDirective, "[pblMetaRow]", never, { "meta": "pblMetaRow"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmQudHMiLCJzb3VyY2VzIjpbIm1ldGEtcm93LmRpcmVjdGl2ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XHJcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93LnNlcnZpY2UnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxNZXRhUm93RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIHJlYWRvbmx5IG1ldGFSb3dzOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlO1xyXG4gICAgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+O1xyXG4gICAgZ2V0IG1ldGEoKTogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xyXG4gICAgc2V0IG1ldGEodmFsdWU6IFBibE1ldGFSb3dEZWZpbml0aW9ucyk7XHJcbiAgICByZWFkb25seSBncmlkV2lkdGhSb3c6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9tZXRhO1xyXG4gICAgY29uc3RydWN0b3IobWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgZ3JpZFdpZHRoUm93OiBhbnkpO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByaXZhdGUgdXBkYXRlO1xyXG59XHJcbiJdfQ==