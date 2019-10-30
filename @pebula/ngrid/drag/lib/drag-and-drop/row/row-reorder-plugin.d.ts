import { ChangeDetectorRef, ElementRef, OnDestroy, ViewContainerRef, NgZone } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDropList, CdkDropListGroup, DragDropRegistry, CdkDrag, DragRefConfig } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { PblNgridComponent, PblNgridPluginController, PblNgridCellContext } from '@pebula/ngrid';
import { CdkLazyDropList, CdkLazyDrag } from '../core/lazy-drag-drop';
import { PblDropListRef } from '../core/drop-list-ref';
import { PblDragRef } from '../core/drag-ref';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        rowReorder?: PblNgridRowReorderPluginDirective;
    }
}
export declare class PblNgridRowReorderPluginDirective<T = any> extends CdkDropList<T> implements OnDestroy, CdkLazyDropList<T, PblNgridRowReorderPluginDirective<T>> {
    table: PblNgridComponent<T>;
    id: string;
    rowReorder: boolean;
    private _rowReorder;
    private _removePlugin;
    constructor(table: PblNgridComponent<T>, pluginCtrl: PblNgridPluginController, element: ElementRef<HTMLElement>, dragDrop: DragDrop, changeDetectorRef: ChangeDetectorRef, dir?: Directionality, group?: CdkDropListGroup<CdkDropList>, dragDropRegistry?: DragDropRegistry<any, any>, // for v7 compat
    _document?: any);
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     */
    directContainerElement: string;
    readonly pblDropListRef: PblDropListRef<any>;
    originalElement: ElementRef<HTMLElement>;
    _draggablesSet: Set<CdkDrag<any>>;
    ngOnInit(): void;
    addDrag(drag: CdkDrag): void;
    removeDrag(drag: CdkDrag): boolean;
    beforeStarted(): void;
    ngOnDestroy(): void;
}
export declare class PblNgridRowDragDirective<T = any> extends CdkDrag<T> implements CdkLazyDrag<T, PblNgridRowReorderPluginDirective<T>> {
    rootElementSelector: string;
    context: Pick<PblNgridCellContext<T>, 'col' | 'table'> & Partial<Pick<PblNgridCellContext<T>, 'row' | 'value'>>;
    /**
     * Reference to the last dragged context.
     *
     * This context is not similar to the `context` property.
     * The `context` property holds the current context which is shared and updated on scroll so if a user start a drag and then scrolled
     * the context will point to the row in view and not the original cell.
     */
    readonly draggedContext: Pick<PblNgridCellContext<T>, 'col' | 'table'> & Partial<Pick<PblNgridCellContext<T>, 'row' | 'value'>>;
    private _context;
    private _draggedContext;
    private pluginCtrl;
    constructor(element: ElementRef<HTMLElement>, dropContainer: CdkDropList, _document: any, _ngZone: NgZone, _viewContainerRef: ViewContainerRef, config: DragRefConfig, _dir: Directionality, dragDrop: DragDrop, _changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, // for v7 compat
    dragDropRegistry: DragDropRegistry<any, any>);
    /**
   * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
   */
    rootElementSelectorClass: string;
    readonly pblDragRef: PblDragRef<any>;
    cdkDropList: PblNgridRowReorderPluginDirective<T>;
    _rootClass: string;
    _hostNotRoot: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
