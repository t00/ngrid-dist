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
export declare class PblColumnSizeObserver extends ColumnSizeInfo implements AfterViewInit, OnDestroy {
    get column(): PblColumn;
    set column(value: PblColumn);
    private controller;
    constructor(el: ElementRef, table: PblNgridComponent<any>);
    attachColumn(column: PblColumn): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
