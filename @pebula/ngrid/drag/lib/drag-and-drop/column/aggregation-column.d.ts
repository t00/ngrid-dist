import { ChangeDetectorRef, ElementRef, OnDestroy } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDropListGroup, CdkDropList, CdkDrag, DragDropRegistry } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController, PblColumn } from '@pebula/ngrid';
import { CdkLazyDropList } from '../core/lazy-drag-drop';
import { PblDropListRef } from '../core/drop-list-ref';
export declare class PblNgridAggregationContainerDirective<T = any> extends CdkDropList<T> implements OnDestroy, CdkLazyDropList<T> {
    table: PblNgridComponent<T>;
    id: string;
    orientation: 'horizontal' | 'vertical';
    pending: PblColumn;
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
}
