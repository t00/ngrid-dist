import { IterableDiffers, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { CdkRowDef } from '@angular/cdk/table';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry, PblNgridRowContext } from '@pebula/ngrid';
declare module '@pebula/ngrid/lib/table/services/table-registry.service' {
    interface PblNgridSingleRegistryMap {
        detailRowParent?: PblNgridDetailRowParentRefDirective<any>;
        detailRow?: PblNgridDetailRowDefDirective;
    }
}
/**
 * Marks the element as the display element for the detail row itself.
 */
export declare class PblNgridDetailRowDefDirective extends PblNgridSingleTemplateRegistry<PblNgridRowContext<any>, 'detailRow'> {
    readonly kind: 'detailRow';
    constructor(tRef: TemplateRef<PblNgridRowContext<any>>, registry: PblNgridRegistryService);
}
export declare class PblNgridDetailRowParentRefDirective<T> extends CdkRowDef<T> implements OnInit, OnDestroy {
    protected registry: PblNgridRegistryService;
    constructor(template: TemplateRef<PblNgridRowContext<T>>, _differs: IterableDiffers, registry: PblNgridRegistryService);
    clone(): PblNgridDetailRowParentRefDirective<T>;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
/**
 * Use to set the a default `pblNgridDetailRowParentRef` if the user did not set one.
 * @internal
 */
export declare class PblNgridDefaultDetailRowParentComponent {
}
