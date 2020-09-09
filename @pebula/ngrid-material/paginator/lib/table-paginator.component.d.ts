import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PblPagingPaginator, PblNgridComponent } from '@pebula/ngrid';
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
}
