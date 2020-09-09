import { ViewContainerRef } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridComponent, PblColumn, PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
export declare class MatExcelStyleHeaderMenu {
    private ref;
    column: PblColumn;
    grid: PblNgridComponent;
    matMenu: MatMenu;
    menuViewLocation: ViewContainerRef;
    currentSort: 'asc' | 'desc' | undefined;
    currentPin: 'start' | 'end' | undefined;
    currentFilter: any;
    constructor(ref: PblNgridOverlayPanelRef<PblNgridDataHeaderExtensionContext>);
    ngAfterViewInit(): void;
    hide(): void;
    onSortToggle(sort: 'asc' | 'desc'): void;
    onPinToggle(pin: 'start' | 'end'): void;
    filterColumn(filterValue: string): void;
    clickTrap(event: MouseEvent): void;
}
