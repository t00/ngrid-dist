import { ChangeDetectorRef, ElementRef, OnDestroy, QueryList } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DragDrop, CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblNgridPluginController, PblColumn } from '@pebula/ngrid';
import { CdkLazyDropList } from '../core/lazy-drag-drop';
import { PblDropListRef } from '../core/drop-list-ref';
export declare class PblNgridAggregationContainerDirective<T = any> extends CdkDropList<T> implements OnDestroy, CdkLazyDropList<T> {
    grid: PblNgridComponent<T>;
    id: string;
    orientation: 'horizontal' | 'vertical';
    pending: PblColumn;
    _draggables: QueryList<CdkDrag>;
    constructor(grid: PblNgridComponent<T>, pluginCtrl: PblNgridPluginController, element: ElementRef<HTMLElement>, dragDrop: DragDrop, changeDetectorRef: ChangeDetectorRef, dir?: Directionality, group?: CdkDropListGroup<CdkDropList>);
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     */
    directContainerElement: string;
    get pblDropListRef(): PblDropListRef<any>;
    originalElement: ElementRef<HTMLElement>;
    _draggablesSet: Set<CdkDrag<any>>;
    ngOnInit(): void;
    addDrag(drag: CdkDrag): void;
    removeDrag(drag: CdkDrag): boolean;
    beforeStarted(): void;
}
