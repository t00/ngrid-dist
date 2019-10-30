import { TemplateRef } from '@angular/core';
import { PblNgridComponent, PblNgridMultiTemplateRegistry, PblNgridRegistryService } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from './overlay-panel-ref';
export interface PblNgridOverlayPanelContext<T = any> {
    grid: PblNgridComponent<T>;
    ref: PblNgridOverlayPanelRef;
}
export declare class PblNgridOverlayPanelDef extends PblNgridMultiTemplateRegistry<PblNgridComponent, 'overlayPanels'> {
    readonly kind: 'overlayPanels';
    name: string;
    constructor(tRef: TemplateRef<PblNgridComponent>, registry: PblNgridRegistryService);
}
