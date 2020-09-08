import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PblPagingPaginator, PblNgridComponent } from '@pebula/ngrid';
import * as ɵngcc0 from '@angular/core';
export declare class PblPaginatorComponent implements OnDestroy {
    _intl: MatPaginatorIntl;
    private cdr;
    pages: number[];
    pageSizes: number[];
    get pageSizeOptions(): number[];
    set pageSizeOptions(value: number[]);
    get paginator(): PblPagingPaginator;
    set paginator(value: PblPagingPaginator);
    table: PblNgridComponent<any>;
    get hidePageSize(): boolean;
    set hidePageSize(value: boolean);
    get hideRangeSelect(): boolean;
    set hideRangeSelect(value: boolean);
    private _pageSizeOptions;
    private _paginator;
    private _hidePageSize;
    private _hideRangeSelect;
    constructor(table: PblNgridComponent<any>, _intl: MatPaginatorIntl, cdr: ChangeDetectorRef);
    ngOnDestroy(): void;
    private updatePageSizes;
    private handlePageChange;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblPaginatorComponent, [{ optional: true; }, null, null]>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblPaginatorComponent, "pbl-ngrid-paginator", never, { "table": "table"; "pageSizeOptions": "pageSizeOptions"; "paginator": "paginator"; "hidePageSize": "hidePageSize"; "hideRangeSelect": "hideRangeSelect"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5kLnRzIiwic291cmNlcyI6WyJ0YWJsZS1wYWdpbmF0b3IuY29tcG9uZW50LmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0UGFnaW5hdG9ySW50bCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XHJcbmltcG9ydCB7IFBibFBhZ2luZ1BhZ2luYXRvciwgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgUGJsUGFnaW5hdG9yQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICAgIF9pbnRsOiBNYXRQYWdpbmF0b3JJbnRsO1xyXG4gICAgcHJpdmF0ZSBjZHI7XHJcbiAgICBwYWdlczogbnVtYmVyW107XHJcbiAgICBwYWdlU2l6ZXM6IG51bWJlcltdO1xyXG4gICAgZ2V0IHBhZ2VTaXplT3B0aW9ucygpOiBudW1iZXJbXTtcclxuICAgIHNldCBwYWdlU2l6ZU9wdGlvbnModmFsdWU6IG51bWJlcltdKTtcclxuICAgIGdldCBwYWdpbmF0b3IoKTogUGJsUGFnaW5nUGFnaW5hdG9yO1xyXG4gICAgc2V0IHBhZ2luYXRvcih2YWx1ZTogUGJsUGFnaW5nUGFnaW5hdG9yKTtcclxuICAgIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgZ2V0IGhpZGVQYWdlU2l6ZSgpOiBib29sZWFuO1xyXG4gICAgc2V0IGhpZGVQYWdlU2l6ZSh2YWx1ZTogYm9vbGVhbik7XHJcbiAgICBnZXQgaGlkZVJhbmdlU2VsZWN0KCk6IGJvb2xlYW47XHJcbiAgICBzZXQgaGlkZVJhbmdlU2VsZWN0KHZhbHVlOiBib29sZWFuKTtcclxuICAgIHByaXZhdGUgX3BhZ2VTaXplT3B0aW9ucztcclxuICAgIHByaXZhdGUgX3BhZ2luYXRvcjtcclxuICAgIHByaXZhdGUgX2hpZGVQYWdlU2l6ZTtcclxuICAgIHByaXZhdGUgX2hpZGVSYW5nZVNlbGVjdDtcclxuICAgIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBfaW50bDogTWF0UGFnaW5hdG9ySW50bCwgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZik7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgcHJpdmF0ZSB1cGRhdGVQYWdlU2l6ZXM7XHJcbiAgICBwcml2YXRlIGhhbmRsZVBhZ2VDaGFuZ2U7XHJcbn1cclxuIl19