import { ElementRef, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { PblNgridRowComponent, PblNgridExtensionApi } from '@pebula/ngrid';
export declare class PblNgridDetailRowComponent extends PblNgridRowComponent implements OnInit, OnDestroy {
    private vcRef;
    get expended(): boolean;
    set row(value: any);
    private get _element();
    private opened;
    private plugin;
    constructor(extApi: PblNgridExtensionApi<any>, el: ElementRef<HTMLElement>, vcRef: ViewContainerRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateRow(): void;
    toggle(forceState?: boolean): void;
    /**
     * @internal
     */
    handleKeydown(event: KeyboardEvent): void;
    private createEvent;
    private render;
}
