import { AfterViewInit, ElementRef, OnDestroy, NgZone } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DragRefConfig, DragDropRegistry } from '@angular/cdk/drag-drop';
import { PblNgridComponent, PblColumn, PblNgridMetaCellContext } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/ext/types' {
    interface PblNgridPluginExtension {
        columnResize?: PblNgridDragResizeComponent;
    }
}
export declare const COL_RESIZE_PLUGIN_KEY: 'columnResize';
export declare class PblNgridDragResizeComponent implements AfterViewInit, OnDestroy {
    element: ElementRef<HTMLElement>;
    private _ngZone;
    private _viewportRuler;
    private _dragDropRegistry;
    private _config;
    private _dir;
    set context(value: PblNgridMetaCellContext<any>);
    /**
     * The area (in pixels) in which the handle can be grabbed and resize the cell.
     * Default: 6
     */
    grabAreaWidth: number;
    column: PblColumn;
    /** @deprecated use grid instead */
    get table(): PblNgridComponent<any>;
    grid: PblNgridComponent<any>;
    _hasStartedDragging: boolean;
    private _hasMoved;
    private _rootElement;
    private _pointerMoveSubscription;
    private _pointerUpSubscription;
    private _scrollPosition;
    private _pickupPositionOnPage;
    private _initialWidth;
    private _lastWidth;
    private _rootElementInitSubscription;
    constructor(element: ElementRef<HTMLElement>, _ngZone: NgZone, _viewportRuler: ViewportRuler, _dragDropRegistry: DragDropRegistry<PblNgridDragResizeComponent, any>, _config: DragRefConfig, _dir: Directionality);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onDoubleClick(event: MouseEvent): void;
    _pointerDown: (event: MouseEvent | TouchEvent) => void;
    /**
   * Sets up the different variables and subscriptions
   * that will be necessary for the dragging sequence.
   * @param referenceElement Element that started the drag sequence.
   * @param event Browser event object that started the sequence.
   */
    private _initializeDragSequence;
    /** Handler that is invoked when the user moves their pointer after they've initiated a drag. */
    private _pointerMove;
    /** Handler that is invoked when the user lifts their pointer up, after initiating a drag. */
    private _pointerUp;
    private _getPointerPositionOnPage;
    private _isTouchEvent;
    _isDragging(): boolean;
    private _getRootElement;
    private _removeSubscriptions;
}
