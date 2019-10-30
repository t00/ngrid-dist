import { ElementRef } from '@angular/core';
import { PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
export declare class MatHeaderContextMenuTrigger {
    private plugin;
    private elRef;
    context: PblNgridDataHeaderExtensionContext;
    constructor(plugin: PblNgridMatHeaderContextMenuPlugin, elRef: ElementRef<HTMLElement>);
    openOverlayPanel(): void;
}
