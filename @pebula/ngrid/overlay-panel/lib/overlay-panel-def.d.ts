import { TemplateRef } from '@angular/core';
import { PblNgridComponent, PblNgridMultiTemplateRegistry, PblNgridRegistryService } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from './overlay-panel-ref';
import * as ɵngcc0 from '@angular/core';
export interface PblNgridOverlayPanelContext<T = any> {
    grid: PblNgridComponent<T>;
    ref: PblNgridOverlayPanelRef;
}
export declare class PblNgridOverlayPanelDef extends PblNgridMultiTemplateRegistry<PblNgridComponent, 'overlayPanels'> {
    readonly kind: 'overlayPanels';
    name: string;
    constructor(tRef: TemplateRef<PblNgridComponent>, registry: PblNgridRegistryService);
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridOverlayPanelDef, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridOverlayPanelDef, "[pblNgridOverlayPanelDef]", never, { "name": "pblNgridOverlayPanelDef"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1kZWYuZC50cyIsInNvdXJjZXMiOlsib3ZlcmxheS1wYW5lbC1kZWYuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XHJcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLXJlZic7XHJcbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0PFQgPSBhbnk+IHtcclxuICAgIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xyXG4gICAgcmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjtcclxufVxyXG5leHBvcnQgZGVjbGFyZSBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbERlZiBleHRlbmRzIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkQ29tcG9uZW50LCAnb3ZlcmxheVBhbmVscyc+IHtcclxuICAgIHJlYWRvbmx5IGtpbmQ6ICdvdmVybGF5UGFuZWxzJztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkQ29tcG9uZW50PiwgcmVnaXN0cnk6IFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlKTtcclxufVxyXG4iXX0=