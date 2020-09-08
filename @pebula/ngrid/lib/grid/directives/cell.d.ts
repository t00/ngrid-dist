import { OnInit, OnDestroy, ElementRef, DoCheck, ViewContainerRef, NgZone, EmbeddedViewRef } from '@angular/core';
import { CdkHeaderCell, CdkCell, CdkFooterCell } from '@angular/cdk/table';
import { PblNgridComponent } from '../ngrid.component';
import { COLUMN, PblMetaColumn, PblColumn, PblColumnGroup } from '../columns';
import { MetaCellContext, PblNgridMetaCellContext, PblRowContext, PblCellContext } from '../context/index';
import { PblNgridColumnDef } from './column-def';
import { PblNgridDataHeaderExtensionContext, PblNgridMultiComponentRegistry } from './registry.directives';
/**
 * Header cell component.
 * The header cell component will render the header cell template and add the proper classes and role.
 *
 * It is also responsible for creating and managing the any `dataHeaderExtensions` registered in the registry.
 * These extensions add features to the cells either as a template instance or as a component instance.
 * Examples: Sorting behavior, drag&drop/resize handlers, menus etc...
 */
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridHeaderCellComponent<T extends COLUMN = COLUMN> extends CdkHeaderCell implements OnInit, OnDestroy {
    readonly columnDef: PblNgridColumnDef<T>;
    readonly grid: PblNgridComponent<any>;
    readonly elementRef: ElementRef;
    private zone;
    vcRef: ViewContainerRef;
    private el;
    cellCtx: PblNgridDataHeaderExtensionContext | MetaCellContext;
    /** @deprecated use grid instead */
    readonly table: PblNgridComponent<T>;
    constructor(columnDef: PblNgridColumnDef<T>, grid: PblNgridComponent<any>, elementRef: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected initMainHeaderColumnView(col: PblColumn): EmbeddedViewRef<PblNgridMetaCellContext<any, PblColumn | PblMetaColumn>>;
    protected initMetaHeaderColumnView(col: PblMetaColumn | PblColumnGroup): EmbeddedViewRef<PblNgridMetaCellContext<any, PblColumn | PblMetaColumn>>;
    protected runHeaderExtensions(context: PblNgridDataHeaderExtensionContext, view: EmbeddedViewRef<PblNgridMetaCellContext<any, PblColumn>>): void;
    protected createComponent(ext: PblNgridMultiComponentRegistry<any, "dataHeaderExtensions">, context: PblNgridDataHeaderExtensionContext, rootNodes: any[]): any[];
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridHeaderCellComponent<any>, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<PblNgridHeaderCellComponent<any>, "pbl-ngrid-header-cell", ["ngridHeaderCell"], {}, {}, never, never>;
}
/** Cell template container that adds the right classes and role. */
export declare class PblNgridCellDirective extends CdkCell implements DoCheck, OnDestroy {
    private colDef;
    set rowCtx(value: PblRowContext<any>);
    private _rowCtx;
    cellCtx: PblCellContext | undefined;
    /**
     * The position of the column def among all columns regardless of visibility.
     */
    private colIndex;
    private el;
    private focused;
    private selected;
    constructor(colDef: PblNgridColumnDef<PblColumn>, elementRef: ElementRef);
    ngDoCheck(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCellDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridCellDirective, "pbl-ngrid-cell", ["pblNgridCell"], { "rowCtx": "rowCtx"; }, {}, never>;
}
export declare class PblNgridFooterCellDirective extends CdkFooterCell implements OnInit, OnDestroy {
    private columnDef;
    grid: PblNgridComponent;
    cellCtx: MetaCellContext;
    /** @deprecated use grid instead */
    readonly table: PblNgridComponent;
    private el;
    constructor(columnDef: PblNgridColumnDef<PblMetaColumn | PblColumnGroup>, grid: PblNgridComponent, elementRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridFooterCellDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridFooterCellDirective, "pbl-ngrid-footer-cell", ["ngridFooterCell"], {}, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5kLnRzIiwic291cmNlcyI6WyJjZWxsLmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT25Jbml0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIERvQ2hlY2ssIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSwgRW1iZWRkZWRWaWV3UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENka0hlYWRlckNlbGwsIENka0NlbGwsIENka0Zvb3RlckNlbGwgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENPTFVNTiwgUGJsTWV0YUNvbHVtbiwgUGJsQ29sdW1uLCBQYmxDb2x1bW5Hcm91cCB9IGZyb20gJy4uL2NvbHVtbnMnO1xyXG5pbXBvcnQgeyBNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBQYmxSb3dDb250ZXh0LCBQYmxDZWxsQ29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbHVtbkRlZiB9IGZyb20gJy4vY29sdW1uLWRlZic7XHJcbmltcG9ydCB7IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeSB9IGZyb20gJy4vcmVnaXN0cnkuZGlyZWN0aXZlcyc7XHJcbi8qKlxyXG4gKiBIZWFkZXIgY2VsbCBjb21wb25lbnQuXHJcbiAqIFRoZSBoZWFkZXIgY2VsbCBjb21wb25lbnQgd2lsbCByZW5kZXIgdGhlIGhlYWRlciBjZWxsIHRlbXBsYXRlIGFuZCBhZGQgdGhlIHByb3BlciBjbGFzc2VzIGFuZCByb2xlLlxyXG4gKlxyXG4gKiBJdCBpcyBhbHNvIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyBhbmQgbWFuYWdpbmcgdGhlIGFueSBgZGF0YUhlYWRlckV4dGVuc2lvbnNgIHJlZ2lzdGVyZWQgaW4gdGhlIHJlZ2lzdHJ5LlxyXG4gKiBUaGVzZSBleHRlbnNpb25zIGFkZCBmZWF0dXJlcyB0byB0aGUgY2VsbHMgZWl0aGVyIGFzIGEgdGVtcGxhdGUgaW5zdGFuY2Ugb3IgYXMgYSBjb21wb25lbnQgaW5zdGFuY2UuXHJcbiAqIEV4YW1wbGVzOiBTb3J0aW5nIGJlaGF2aW9yLCBkcmFnJmRyb3AvcmVzaXplIGhhbmRsZXJzLCBtZW51cyBldGMuLi5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkSGVhZGVyQ2VsbENvbXBvbmVudDxUIGV4dGVuZHMgQ09MVU1OID0gQ09MVU1OPiBleHRlbmRzIENka0hlYWRlckNlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICByZWFkb25seSBjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFQ+O1xyXG4gICAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcclxuICAgIHJlYWRvbmx5IGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XHJcbiAgICBwcml2YXRlIHpvbmU7XHJcbiAgICB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcclxuICAgIHByaXZhdGUgZWw7XHJcbiAgICBjZWxsQ3R4OiBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IHwgTWV0YUNlbGxDb250ZXh0O1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cclxuICAgIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcclxuICAgIGNvbnN0cnVjdG9yKGNvbHVtbkRlZjogUGJsTmdyaWRDb2x1bW5EZWY8VD4sIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHpvbmU6IE5nWm9uZSk7XHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkO1xyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZDtcclxuICAgIHByb3RlY3RlZCBpbml0TWFpbkhlYWRlckNvbHVtblZpZXcoY29sOiBQYmxDb2x1bW4pOiBFbWJlZGRlZFZpZXdSZWY8UGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8YW55LCBQYmxDb2x1bW4gfCBQYmxNZXRhQ29sdW1uPj47XHJcbiAgICBwcm90ZWN0ZWQgaW5pdE1ldGFIZWFkZXJDb2x1bW5WaWV3KGNvbDogUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbkdyb3VwKTogRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uIHwgUGJsTWV0YUNvbHVtbj4+O1xyXG4gICAgcHJvdGVjdGVkIHJ1bkhlYWRlckV4dGVuc2lvbnMoY29udGV4dDogUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCwgdmlldzogRW1iZWRkZWRWaWV3UmVmPFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PGFueSwgUGJsQ29sdW1uPj4pOiB2b2lkO1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbXBvbmVudChleHQ6IFBibE5ncmlkTXVsdGlDb21wb25lbnRSZWdpc3RyeTxhbnksIFwiZGF0YUhlYWRlckV4dGVuc2lvbnNcIj4sIGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQsIHJvb3ROb2RlczogYW55W10pOiBhbnlbXTtcclxufVxyXG4vKiogQ2VsbCB0ZW1wbGF0ZSBjb250YWluZXIgdGhhdCBhZGRzIHRoZSByaWdodCBjbGFzc2VzIGFuZCByb2xlLiAqL1xyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZENlbGxEaXJlY3RpdmUgZXh0ZW5kcyBDZGtDZWxsIGltcGxlbWVudHMgRG9DaGVjaywgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgY29sRGVmO1xyXG4gICAgc2V0IHJvd0N0eCh2YWx1ZTogUGJsUm93Q29udGV4dDxhbnk+KTtcclxuICAgIHByaXZhdGUgX3Jvd0N0eDtcclxuICAgIGNlbGxDdHg6IFBibENlbGxDb250ZXh0IHwgdW5kZWZpbmVkO1xyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgcG9zaXRpb24gb2YgdGhlIGNvbHVtbiBkZWYgYW1vbmcgYWxsIGNvbHVtbnMgcmVnYXJkbGVzcyBvZiB2aXNpYmlsaXR5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbEluZGV4O1xyXG4gICAgcHJpdmF0ZSBlbDtcclxuICAgIHByaXZhdGUgZm9jdXNlZDtcclxuICAgIHByaXZhdGUgc2VsZWN0ZWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2xEZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibENvbHVtbj4sIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpO1xyXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkRm9vdGVyQ2VsbERpcmVjdGl2ZSBleHRlbmRzIENka0Zvb3RlckNlbGwgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGNvbHVtbkRlZjtcclxuICAgIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50O1xyXG4gICAgY2VsbEN0eDogTWV0YUNlbGxDb250ZXh0O1xyXG4gICAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cclxuICAgIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDtcclxuICAgIHByaXZhdGUgZWw7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb2x1bW5EZWY6IFBibE5ncmlkQ29sdW1uRGVmPFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW5Hcm91cD4sIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50LCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKTtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQ7XHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkO1xyXG59XHJcbiJdfQ==