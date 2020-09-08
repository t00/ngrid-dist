import { ViewContainerRef } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridComponent, PblColumn, PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
import * as ɵngcc0 from '@angular/core';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatExcelStyleHeaderMenu, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatExcelStyleHeaderMenu, "mat-excel-style-header-menu", never, {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuZC50cyIsInNvdXJjZXMiOlsiZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdE1lbnUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcclxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibENvbHVtbiwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbCc7XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51IHtcclxuICAgIHByaXZhdGUgcmVmO1xyXG4gICAgY29sdW1uOiBQYmxDb2x1bW47XHJcbiAgICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDtcclxuICAgIG1hdE1lbnU6IE1hdE1lbnU7XHJcbiAgICBtZW51Vmlld0xvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmO1xyXG4gICAgY3VycmVudFNvcnQ6ICdhc2MnIHwgJ2Rlc2MnIHwgdW5kZWZpbmVkO1xyXG4gICAgY3VycmVudFBpbjogJ3N0YXJ0JyB8ICdlbmQnIHwgdW5kZWZpbmVkO1xyXG4gICAgY3VycmVudEZpbHRlcjogYW55O1xyXG4gICAgY29uc3RydWN0b3IocmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjxQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0Pik7XHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZDtcclxuICAgIGhpZGUoKTogdm9pZDtcclxuICAgIG9uU29ydFRvZ2dsZShzb3J0OiAnYXNjJyB8ICdkZXNjJyk6IHZvaWQ7XHJcbiAgICBvblBpblRvZ2dsZShwaW46ICdzdGFydCcgfCAnZW5kJyk6IHZvaWQ7XHJcbiAgICBmaWx0ZXJDb2x1bW4oZmlsdGVyVmFsdWU6IHN0cmluZyk6IHZvaWQ7XHJcbiAgICBjbGlja1RyYXAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkO1xyXG59XHJcbiJdfQ==