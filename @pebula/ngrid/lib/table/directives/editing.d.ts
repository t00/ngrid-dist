import { AfterViewInit, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { PblNgridCellContext } from '../context/index';
export declare class PblNgridCellEditAutoFocusDirective implements AfterViewInit, OnDestroy {
    private elRef;
    private ngZone;
    context: PblNgridCellContext<any>;
    private _destroyed;
    constructor(elRef: ElementRef<HTMLElement>, ngZone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
