import { ViewContainerRef } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridComponent, PblColumn, PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
export declare class MatExcelStyleHeaderMenu {
    private ref;
    private vcRef;
    column: PblColumn;
    grid: PblNgridComponent;
    matMenu: MatMenu;
    currentSort: 'asc' | 'desc' | undefined;
    currentPin: 'start' | 'end' | undefined;
    currentFilter: any;
    constructor(ref: PblNgridOverlayPanelRef<PblNgridDataHeaderExtensionContext>, vcRef: ViewContainerRef);
    ngAfterViewInit(): void;
    hide(): void;
    onSortToggle(sort: 'asc' | 'desc'): void;
    onPinToggle(pin: 'start' | 'end'): void;
    filterColumn(filterValue: string): void;
    clickTrap(event: MouseEvent): void;
}
