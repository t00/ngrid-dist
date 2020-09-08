import { ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { PblNgridComponent } from '../../ngrid.component';
import { PblColumn, ColumnSizeInfo } from '../../columns/index';
/**
 * A directive that listen to size changes from the element of a cell, using ResizeObserver.
 * When a change occurs it will emit it to the PblTable host of this directive, along with all other observed columns for the table.
 *
 * In other words, all columns of a table, marked with `PblColumnSizeObserver`, will be sent.
 *
 * Because most of the size changes concern all columns of a row and because ResizeObserver will emit them all in the same event
 * an entire row should emit once, with all columns.
 */
import * as ɵngcc0 from '@angular/core';
export declare class PblColumnSizeObserver extends ColumnSizeInfo implements AfterViewInit, OnDestroy {
    get column(): PblColumn;
    set column(value: PblColumn);
    private controller;
    constructor(el: ElementRef, table: PblNgridComponent<any>);
    attachColumn(column: PblColumn): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblColumnSizeObserver, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblColumnSizeObserver, "pbl-ngrid-cell[observeSize], pbl-ngrid-header-cell[observeSize]", never, { "column": "observeSize"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLmQudHMiLCJzb3VyY2VzIjpbImNvbHVtbi1zaXplLW9ic2VydmVyLmRpcmVjdGl2ZS5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL25ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFBibENvbHVtbiwgQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi8uLi9jb2x1bW5zL2luZGV4JztcclxuLyoqXHJcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbGlzdGVuIHRvIHNpemUgY2hhbmdlcyBmcm9tIHRoZSBlbGVtZW50IG9mIGEgY2VsbCwgdXNpbmcgUmVzaXplT2JzZXJ2ZXIuXHJcbiAqIFdoZW4gYSBjaGFuZ2Ugb2NjdXJzIGl0IHdpbGwgZW1pdCBpdCB0byB0aGUgUGJsVGFibGUgaG9zdCBvZiB0aGlzIGRpcmVjdGl2ZSwgYWxvbmcgd2l0aCBhbGwgb3RoZXIgb2JzZXJ2ZWQgY29sdW1ucyBmb3IgdGhlIHRhYmxlLlxyXG4gKlxyXG4gKiBJbiBvdGhlciB3b3JkcywgYWxsIGNvbHVtbnMgb2YgYSB0YWJsZSwgbWFya2VkIHdpdGggYFBibENvbHVtblNpemVPYnNlcnZlcmAsIHdpbGwgYmUgc2VudC5cclxuICpcclxuICogQmVjYXVzZSBtb3N0IG9mIHRoZSBzaXplIGNoYW5nZXMgY29uY2VybiBhbGwgY29sdW1ucyBvZiBhIHJvdyBhbmQgYmVjYXVzZSBSZXNpemVPYnNlcnZlciB3aWxsIGVtaXQgdGhlbSBhbGwgaW4gdGhlIHNhbWUgZXZlbnRcclxuICogYW4gZW50aXJlIHJvdyBzaG91bGQgZW1pdCBvbmNlLCB3aXRoIGFsbCBjb2x1bW5zLlxyXG4gKi9cclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsQ29sdW1uU2l6ZU9ic2VydmVyIGV4dGVuZHMgQ29sdW1uU2l6ZUluZm8gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgZ2V0IGNvbHVtbigpOiBQYmxDb2x1bW47XHJcbiAgICBzZXQgY29sdW1uKHZhbHVlOiBQYmxDb2x1bW4pO1xyXG4gICAgcHJpdmF0ZSBjb250cm9sbGVyO1xyXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYsIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KTtcclxuICAgIGF0dGFjaENvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQ7XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZDtcclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQ7XHJcbn1cclxuIl19