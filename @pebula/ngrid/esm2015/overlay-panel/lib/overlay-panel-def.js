/**
 * @fileoverview added by tsickle
 * Generated from: lib/overlay-panel-def.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, TemplateRef, Input } from '@angular/core';
import { PblNgridMultiTemplateRegistry, PblNgridRegistryService } from '@pebula/ngrid';
/**
 * @record
 * @template T
 */
export function PblNgridOverlayPanelContext() { }
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelContext.prototype.grid;
    /** @type {?} */
    PblNgridOverlayPanelContext.prototype.ref;
}
export class PblNgridOverlayPanelDef extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'overlayPanels';
    }
}
PblNgridOverlayPanelDef.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridOverlayPanelDef]' },] }
];
/** @nocollapse */
PblNgridOverlayPanelDef.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
PblNgridOverlayPanelDef.propDecorators = {
    name: [{ type: Input, args: ['pblNgridOverlayPanelDef',] }]
};
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.kind;
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC1kZWYuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwvIiwic291cmNlcyI6WyJsaWIvb3ZlcmxheS1wYW5lbC1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFxQiw2QkFBNkIsRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFHMUcsaURBR0M7OztJQUZDLDJDQUEyQjs7SUFDM0IsMENBQTZCOztBQUkvQixNQUFNLE9BQU8sdUJBQXdCLFNBQVEsNkJBQWlFOzs7OztJQUs1RyxZQUFZLElBQW9DLEVBQUUsUUFBaUM7UUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBSHBHLFNBQUksR0FBb0IsZUFBZSxDQUFDO0lBRzZELENBQUM7OztZQU5oSCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsMkJBQTJCLEVBQUU7Ozs7WUFUaEMsV0FBVztZQUM0Qix1QkFBdUI7OzttQkFZL0UsS0FBSyxTQUFDLHlCQUF5Qjs7OztJQURoQyx1Q0FBaUQ7O0lBQ2pELHVDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVGVtcGxhdGVSZWYsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnksIFBibE5ncmlkUmVnaXN0cnlTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiB9IGZyb20gJy4vb3ZlcmxheS1wYW5lbC1yZWYnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dDxUID0gYW55PiB7XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICByZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmO1xufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbcGJsTmdyaWRPdmVybGF5UGFuZWxEZWZdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsRGVmIGV4dGVuZHMgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWRDb21wb25lbnQsICdvdmVybGF5UGFuZWxzJz4ge1xuXG4gIHJlYWRvbmx5IGtpbmQ6ICdvdmVybGF5UGFuZWxzJyA9ICdvdmVybGF5UGFuZWxzJztcbiAgQElucHV0KCdwYmxOZ3JpZE92ZXJsYXlQYW5lbERlZicpIG5hbWU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcih0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZENvbXBvbmVudD4sIHJlZ2lzdHJ5OiBQYmxOZ3JpZFJlZ2lzdHJ5U2VydmljZSkgeyBzdXBlcih0UmVmLCByZWdpc3RyeSk7IH1cbn1cbiJdfQ==