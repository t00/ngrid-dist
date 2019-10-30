import { ChangeDetectorRef } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PblPagingPaginator, PblNgridComponent } from '@pebula/ngrid';
export declare class PblPaginatorComponent {
    _intl: MatPaginatorIntl;
    private cdr;
    pages: number[];
    pageSizes: number[];
    pageSizeOptions: number[];
    paginator: PblPagingPaginator;
    table: PblNgridComponent<any>;
    hidePageSize: boolean;
    hideRangeSelect: boolean;
    private _pageSizeOptions;
    private _paginator;
    private _hidePageSize;
    private _hideRangeSelect;
    constructor(table: PblNgridComponent<any>, _intl: MatPaginatorIntl, cdr: ChangeDetectorRef);
    private updatePageSizes;
    private handlePageChange;
}
