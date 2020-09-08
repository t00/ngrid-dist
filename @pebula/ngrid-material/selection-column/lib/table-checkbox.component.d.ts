import { AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ThemePalette } from '@angular/material/core';
import { PblNgridComponent, PblNgridHeaderCellDefDirective, PblNgridCellDefDirective, PblNgridFooterCellDefDirective } from '@pebula/ngrid';
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridCheckboxComponent implements AfterViewInit, OnDestroy {
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
    get bulkSelectMode(): 'all' | 'view' | 'none';
    set bulkSelectMode(value: 'all' | 'view' | 'none');
    /**
     * A Custom selection model, optional.
     * If not set, the selection model from the DataSource is used.
     */
    get selection(): SelectionModel<any>;
    set selection(value: SelectionModel<any>);
    get isCheckboxDisabled(): (row: any) => boolean;
    set isCheckboxDisabled(value: (row: any) => boolean);
    get color(): ThemePalette;
    set color(value: ThemePalette);
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
    ngOnDestroy(): void;
    masterToggle(): void;
    rowItemChange(row: any): void;
    private getCollection;
    private setupSelection;
    private handleSelectionChanged;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCheckboxComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblNgridCheckboxComponent, "pbl-ngrid-checkbox", never, { "selection": "selection"; "bulkSelectMode": "bulkSelectMode"; "isCheckboxDisabled": "isCheckboxDisabled"; "color": "color"; "name": "name"; }, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtY2hlY2tib3guY29tcG9uZW50LmQudHMiLCJzb3VyY2VzIjpbInRhYmxlLWNoZWNrYm94LmNvbXBvbmVudC5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3Rpb25Nb2RlbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XHJcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRIZWFkZXJDZWxsRGVmRGlyZWN0aXZlLCBQYmxOZ3JpZENlbGxEZWZEaXJlY3RpdmUsIFBibE5ncmlkRm9vdGVyQ2VsbERlZkRpcmVjdGl2ZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICAgIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xyXG4gICAgcHJpdmF0ZSBjZHI7XHJcbiAgICAvKipcclxuICAgICAqIFVuaXF1ZSBuYW1lIGZvciB0aGUgY2hlY2tib3ggY29sdW1uLlxyXG4gICAgICogV2hlbiBub3Qgc2V0LCB0aGUgbmFtZSAnY2hlY2tib3gnIGlzIHVzZWQuXHJcbiAgICAgKlxyXG4gICAgICoqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciB3aGVuIGNsaWNraW5nIG9uIHRoZSBidWxrIHNlbGVjdCBjaGVja2JveCAoaGVhZGVyKS5cclxuICAgICAqIFRoZXJlIGFyZSAyIG9wdGlvbnM6XHJcbiAgICAgKlxyXG4gICAgICogLSBhbGw6IFdpbGwgc2VsZWN0IGFsbCBpdGVtcyBpbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXHJcbiAgICAgKiAtIHZpZXc6IFdpbGwgc2VsZWN0IG9ubHkgdGhlIHJlbmRlcmVkIGl0ZW1zIGluIHRoZSB2aWV3XHJcbiAgICAgKlxyXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgYGFsbGBcclxuICAgICAqL1xyXG4gICAgZ2V0IGJ1bGtTZWxlY3RNb2RlKCk6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnO1xyXG4gICAgc2V0IGJ1bGtTZWxlY3RNb2RlKHZhbHVlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJyk7XHJcbiAgICAvKipcclxuICAgICAqIEEgQ3VzdG9tIHNlbGVjdGlvbiBtb2RlbCwgb3B0aW9uYWwuXHJcbiAgICAgKiBJZiBub3Qgc2V0LCB0aGUgc2VsZWN0aW9uIG1vZGVsIGZyb20gdGhlIERhdGFTb3VyY2UgaXMgdXNlZC5cclxuICAgICAqL1xyXG4gICAgZ2V0IHNlbGVjdGlvbigpOiBTZWxlY3Rpb25Nb2RlbDxhbnk+O1xyXG4gICAgc2V0IHNlbGVjdGlvbih2YWx1ZTogU2VsZWN0aW9uTW9kZWw8YW55Pik7XHJcbiAgICBnZXQgaXNDaGVja2JveERpc2FibGVkKCk6IChyb3c6IGFueSkgPT4gYm9vbGVhbjtcclxuICAgIHNldCBpc0NoZWNrYm94RGlzYWJsZWQodmFsdWU6IChyb3c6IGFueSkgPT4gYm9vbGVhbik7XHJcbiAgICBnZXQgY29sb3IoKTogVGhlbWVQYWxldHRlO1xyXG4gICAgc2V0IGNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpO1xyXG4gICAgaGVhZGVyRGVmOiBQYmxOZ3JpZEhlYWRlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcclxuICAgIGNlbGxEZWY6IFBibE5ncmlkQ2VsbERlZkRpcmVjdGl2ZTxhbnk+O1xyXG4gICAgZm9vdGVyRGVmOiBQYmxOZ3JpZEZvb3RlckNlbGxEZWZEaXJlY3RpdmU8YW55PjtcclxuICAgIGFsbFNlbGVjdGVkOiBib29sZWFuO1xyXG4gICAgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9zZWxlY3Rpb247XHJcbiAgICBwcml2YXRlIF9idWxrU2VsZWN0TW9kZTtcclxuICAgIHByaXZhdGUgX2lzQ2hlY2tib3hEaXNhYmxlZDtcclxuICAgIHByaXZhdGUgX2NvbG9yO1xyXG4gICAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpO1xyXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG4gICAgbWFzdGVyVG9nZ2xlKCk6IHZvaWQ7XHJcbiAgICByb3dJdGVtQ2hhbmdlKHJvdzogYW55KTogdm9pZDtcclxuICAgIHByaXZhdGUgZ2V0Q29sbGVjdGlvbjtcclxuICAgIHByaXZhdGUgc2V0dXBTZWxlY3Rpb247XHJcbiAgICBwcml2YXRlIGhhbmRsZVNlbGVjdGlvbkNoYW5nZWQ7XHJcbn1cclxuIl19