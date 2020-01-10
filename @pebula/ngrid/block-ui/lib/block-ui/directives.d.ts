import { TemplateRef } from '@angular/core';
import { PblNgridComponent, PblNgridRegistryService, PblNgridSingleTemplateRegistry } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/grid/services/grid-registry.service' {
    interface PblNgridSingleRegistryMap {
        blocker?: PblNgridBlockUiDefDirective;
    }
}
/**
 * Marks the element as the display element when the form is busy.
 */
export declare class PblNgridBlockUiDefDirective extends PblNgridSingleTemplateRegistry<{
    $implicit: PblNgridComponent<any>;
}, 'blocker'> {
    readonly kind = "blocker";
    constructor(tRef: TemplateRef<{
        $implicit: PblNgridComponent<any>;
    }>, registry: PblNgridRegistryService);
}
