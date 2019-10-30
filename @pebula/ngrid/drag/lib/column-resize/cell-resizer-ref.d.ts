import { TemplateRef } from '@angular/core';
import { PblNgridRegistryService, PblNgridMultiTemplateRegistry, PblNgridDataHeaderExtensionRef, PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
/**
 * Marks the element as the resizer template for cells.
 */
export declare class PblNgridCellResizerRefDirective extends PblNgridMultiTemplateRegistry<PblNgridDataHeaderExtensionContext, 'dataHeaderExtensions'> implements PblNgridDataHeaderExtensionRef {
    readonly name: 'cellResizer';
    readonly kind: 'dataHeaderExtensions';
    constructor(tRef: TemplateRef<PblNgridDataHeaderExtensionContext>, registry: PblNgridRegistryService);
    shouldRender(context: PblNgridDataHeaderExtensionContext): boolean;
}
