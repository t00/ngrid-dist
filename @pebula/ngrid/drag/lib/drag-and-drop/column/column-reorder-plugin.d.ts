import { BehaviorSubject } from 'rxjs';
import { AfterViewInit, ChangeDetectorRef, ElementRef, OnDestroy, OnInit, ViewContainerRef, NgZone } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDrag, CdkDropListGroup, CdkDropList, DragRefConfig, DragDropRegistry } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, PblColumn, PblNgridPluginController, PblNgridCellContext } from '@pebula/ngrid';
import { CdkLazyDropList, CdkLazyDrag } from '../core';
import { PblDropListRef } from '../core/drop-list-ref';
import { PblDragRef } from '../core/drag-ref';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        columnReorder?: PblNgridColumnReorderPluginDirective;
    }
}
export declare const PLUGIN_KEY: 'columnReorder';
export declare class PblNgridColumnReorderPluginDirective<T = any> extends CdkDropList<T> implements OnInit, OnDestroy, CdkLazyDropList<T, PblNgridColumnReorderPluginDirective<T>> {
    table: PblNgridComponent<T>;
    id: string;
    orientation: 'horizontal' | 'vertical';
    columnReorder: boolean;
    /**
     * When true, will not move the column on drop.
     * Instead you need to handle the dropped event.
     */
    manualOverride: boolean;
    dragging: BehaviorSubject<boolean>;
    private _columnReorder;
    private _manualOverride;
    private _removePlugin;
    private lastSwap;
    private lastSorted;
    private readonly pblGetItemIndexFromPointerPosition;
    private readonly pblGetPositionCacheItems;
    constructor(table: PblNgridComponent<T>, pluginCtrl: PblNgridPluginController, element: ElementRef<HTMLElement>, dragDrop: DragDrop, changeDetectorRef: ChangeDetectorRef, dir?: Directionality, group?: CdkDropListGroup<CdkDropList>, dragDropRegistry?: DragDropRegistry<any, any>, // for v7 compat
    _document?: any);
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     */
    directContainerElement: string;
    readonly pblDropListRef: PblDropListRef<PblNgridColumnReorderPluginDirective<T>>;
    originalElement: ElementRef<HTMLElement>;
    _draggablesSet: Set<CdkDrag<any>>;
    addDrag(drag: CdkDrag): void;
    removeDrag(drag: CdkDrag): boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    beforeStarted(): void;
    private _pblReset;
    private monkeyPatchDropListRef;
}
export declare class PblNgridColumnDragDirective<T = any> extends CdkDrag<T> implements AfterViewInit, CdkLazyDrag<T, PblNgridColumnReorderPluginDirective<T>, PblNgridColumnDragDirective<T>> {
    rootElementSelector: string;
    column: PblColumn;
    context: Pick<PblNgridCellContext<T>, 'col' | 'table'> & Partial<Pick<PblNgridCellContext<T>, 'row' | 'value'>>;
    private _context;
    private pluginCtrl;
    private cache;
    constructor(element: ElementRef<HTMLElement>, dropContainer: CdkDropList, _document: any, _ngZone: NgZone, _viewContainerRef: ViewContainerRef, config: DragRefConfig, _dir: Directionality, dragDrop: DragDrop, _changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, // for v7 compat
    dragDropRegistry: DragDropRegistry<any, any>);
    /**
     * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
     */
    rootElementSelectorClass: string;
    readonly pblDragRef: PblDragRef<PblNgridColumnDragDirective<T>>;
    cdkDropList: PblNgridColumnReorderPluginDirective<T>;
    _rootClass: string;
    _hostNotRoot: boolean;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    getCells(): HTMLElement[];
    reset(): void;
}
