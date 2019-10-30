import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ThemePalette } from '@angular/material/core';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective } from '@pebula/ngrid';
export declare class PblNgridCheckboxComponent implements AfterViewInit {
    table: PblNgridComponent<any>;
    private cdr;
    /**
     * Unique name for the checkbox column.
     * When not set, the name 'checkbox' is used.
     *
     **/
    name: string;
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     */
    bulkSelectMode: 'all' | 'view' | 'none';
    /**
     * A Custom selection model, optional.
     * If not set, the selection model from the DataSource is used.
     */
    selection: SelectionModel<any>;
    isCheckboxDisabled: (row: any) => boolean;
    color: ThemePalette;
    headerDef: PblNgridHeaderCellDefDirective<any>;
    cellDef: PblNgridCellDefDirective<any>;
    footerDef: PblNgridFooterCellDefDirective<any>;
    allSelected: boolean;
    length: number;
    private _selection;
    private _bulkSelectMode;
    private _isCheckboxDisabled;
    private _color;
    constructor(table: PblNgridComponent<any>, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    masterToggle(): void;
    rowItemChange(row: any): void;
    private getCollection;
    private setupSelection;
}
