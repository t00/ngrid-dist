import { OnInit, AfterViewInit, ElementRef, DoCheck, ViewContainerRef, NgZone, EmbeddedViewRef } from '@angular/core';
import { CdkHeaderCell, CdkCell, CdkFooterCell } from '@angular/cdk/table';
import { PblNgridComponent } from '../table.component';
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
export declare class PblNgridHeaderCellComponent<T extends COLUMN = COLUMN> extends CdkHeaderCell implements DoCheck, OnInit, AfterViewInit {
    readonly columnDef: PblNgridColumnDef<T>;
    readonly table: PblNgridComponent<any>;
    readonly elementRef: ElementRef;
    private zone;
    vcRef: ViewContainerRef;
    private el;
    cellCtx: PblNgridDataHeaderExtensionContext | MetaCellContext;
    constructor(columnDef: PblNgridColumnDef<T>, table: PblNgridComponent<any>, elementRef: ElementRef, zone: NgZone);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    protected runHeaderExtensions(context: PblNgridDataHeaderExtensionContext, view: EmbeddedViewRef<PblNgridMetaCellContext<any, PblColumn>>): void;
    protected createComponent(ext: PblNgridMultiComponentRegistry<any, "dataHeaderExtensions">, context: PblNgridDataHeaderExtensionContext, rootNodes: any[]): any[];
}
/** Cell template container that adds the right classes and role. */
export declare class PblNgridCellDirective extends CdkCell implements DoCheck {
    private colDef;
    rowCtx: PblRowContext<any>;
    private _rowCtx;
    cellCtx: PblCellContext | undefined;
    /**
     * The position of the column def among all columns regardless of visibility.
     */
    private colIndex;
    private el;
    private focused;
    private selected;
    constructor(colDef: PblNgridColumnDef, elementRef: ElementRef);
    ngDoCheck(): void;
}
export declare class PblNgridFooterCellDirective extends CdkFooterCell implements DoCheck, OnInit {
    private columnDef;
    table: PblNgridComponent;
    private el;
    cellCtx: MetaCellContext;
    constructor(columnDef: PblNgridColumnDef<PblMetaColumn | PblColumnGroup>, table: PblNgridComponent, elementRef: ElementRef);
    ngDoCheck(): void;
    ngOnInit(): void;
}
