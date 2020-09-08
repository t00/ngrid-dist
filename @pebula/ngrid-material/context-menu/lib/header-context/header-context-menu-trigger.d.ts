import { ElementRef } from '@angular/core';
import { PblNgridDataHeaderExtensionContext } from '@pebula/ngrid';
import { PblNgridMatHeaderContextMenuPlugin } from './header-context-menu.directive';
import * as ɵngcc0 from '@angular/core';
export declare class MatHeaderContextMenuTrigger {
    private plugin;
    private elRef;
    context: PblNgridDataHeaderExtensionContext;
    constructor(plugin: PblNgridMatHeaderContextMenuPlugin, elRef: ElementRef<HTMLElement>);
    openOverlayPanel(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<MatHeaderContextMenuTrigger, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDefWithMeta<MatHeaderContextMenuTrigger, "div[mat-header-context-menu-trigger]", never, {}, {}, never, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS10cmlnZ2VyLmQudHMiLCJzb3VyY2VzIjpbImhlYWRlci1jb250ZXh0LW1lbnUtdHJpZ2dlci5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcbmltcG9ydCB7IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4gfSBmcm9tICcuL2hlYWRlci1jb250ZXh0LW1lbnUuZGlyZWN0aXZlJztcclxuZXhwb3J0IGRlY2xhcmUgY2xhc3MgTWF0SGVhZGVyQ29udGV4dE1lbnVUcmlnZ2VyIHtcclxuICAgIHByaXZhdGUgcGx1Z2luO1xyXG4gICAgcHJpdmF0ZSBlbFJlZjtcclxuICAgIGNvbnRleHQ6IFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ7XHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4sIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pik7XHJcbiAgICBvcGVuT3ZlcmxheVBhbmVsKCk6IHZvaWQ7XHJcbn1cclxuIl19