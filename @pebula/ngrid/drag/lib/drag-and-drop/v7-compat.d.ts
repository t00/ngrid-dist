import { NgZone, ChangeDetectorRef, ElementRef, ViewContainerRef } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { DragRefConfig, DragDrop, CdkDropListGroup, CdkDropList, CdkDrag, DragDropRegistry } from '@angular/cdk/drag-drop';
import { ViewportRuler } from '@angular/cdk/scrolling';
export declare const isMaterial7: boolean;
export declare function cdkDropList(element: ElementRef<HTMLElement>, dragDrop: DragDrop, changeDetectorRef: ChangeDetectorRef, dir?: Directionality, group?: CdkDropListGroup<CdkDropList>, dragDropRegistry?: DragDropRegistry<any, any>, document?: any): ConstructorParameters<typeof CdkDropList>;
export declare function cdkDrag(element: ElementRef<HTMLElement>, dropContainer: CdkDropList, _document: any, _ngZone: NgZone, _viewContainerRef: ViewContainerRef, config: DragRefConfig, _dir: Directionality, dragDrop: DragDrop, _changeDetectorRef: ChangeDetectorRef, viewportRuler: ViewportRuler, dragDropRegistry?: DragDropRegistry<any, any>): ConstructorParameters<typeof CdkDrag>;
