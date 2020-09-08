import { AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { PblNgridCellContext } from '../context/index';
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridCellEditAutoFocusDirective implements AfterViewInit, OnDestroy {
    private elRef;
    private ngZone;
    context: PblNgridCellContext<any>;
    private _destroyed;
    constructor(elRef: ElementRef<HTMLElement>, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCellEditAutoFocusDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridCellEditAutoFocusDirective, "[pblCellEditAutoFocus]", never, { "context": "pblCellEditAutoFocus"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdGluZy5kLnRzIiwic291cmNlcyI6WyJlZGl0aW5nLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIEVsZW1lbnRSZWYsIE5nWm9uZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBibE5ncmlkQ2VsbENvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsTmdyaWRDZWxsRWRpdEF1dG9Gb2N1c0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGVsUmVmO1xyXG4gICAgcHJpdmF0ZSBuZ1pvbmU7XHJcbiAgICBjb250ZXh0OiBQYmxOZ3JpZENlbGxDb250ZXh0PGFueT47XHJcbiAgICBwcml2YXRlIF9kZXN0cm95ZWQ7XHJcbiAgICBjb25zdHJ1Y3RvcihlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIG5nWm9uZTogTmdab25lKTtcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxufVxyXG4iXX0=