import { ElementRef, QueryList, OnDestroy, AfterViewInit, OnInit } from '@angular/core';
import { CdkDropList, CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { PblDropListRef } from './drop-list-ref';
import { PblDragRef } from './drag-ref';
export declare class CdkLazyDropList<T = any, DRef = any> extends CdkDropList<T> implements OnInit {
    get pblDropListRef(): PblDropListRef<DRef>;
    /**
     * Selector that will be used to determine the direct container element, starting from
     * the `cdkDropList` element and going down the DOM. Passing an alternate direct container element
     * is useful when the `cdkDropList` is not the direct parent (i.e. ancestor but not father)
     * of the draggable elements.
     */
    directContainerElement: string;
    _draggables: QueryList<CdkDrag>;
    originalElement: ElementRef<HTMLElement>;
    _draggablesSet: Set<CdkDrag<any>>;
    ngOnInit(): void;
    addDrag(drag: CdkDrag): void;
    removeDrag(drag: CdkDrag): boolean;
    beforeStarted(): void;
}
export declare class CdkLazyDrag<T = any, Z extends CdkLazyDropList<T> = CdkLazyDropList<T>, DRef = any> extends CdkDrag<T> implements OnInit, AfterViewInit, OnDestroy {
    /**
     * A class to set when the root element is not the host element. (i.e. when `cdkDragRootElement` is used).
     */
    set rootElementSelectorClass(value: string);
    get pblDragRef(): PblDragRef<DRef>;
    get cdkDropList(): Z;
    set cdkDropList(value: Z);
    _rootClass: string;
    _hostNotRoot: boolean;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
/** Handle that can be used to drag and CdkDrag instance. */
export declare class PblDragHandle extends CdkDragHandle {
    element: ElementRef<HTMLElement>;
    constructor(element: ElementRef<HTMLElement>, parentDrag?: CdkDrag);
}
