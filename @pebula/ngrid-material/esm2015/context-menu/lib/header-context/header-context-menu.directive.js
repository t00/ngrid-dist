/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory } from '@pebula/ngrid/overlay-panel';
/** @type {?} */
const PLUGIN_KEY = 'matHeaderContextMenu';
let PblNgridMatHeaderContextMenuPlugin = class PblNgridMatHeaderContextMenuPlugin {
    /**
     * @param {?} overlayPanelFactory
     * @param {?} pluginCtrl
     */
    constructor(overlayPanelFactory, pluginCtrl) {
        this.pluginCtrl = pluginCtrl;
        this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.table);
    }
};
PblNgridMatHeaderContextMenuPlugin.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]' },] }
];
/** @nocollapse */
PblNgridMatHeaderContextMenuPlugin.ctorParameters = () => [
    { type: PblNgridOverlayPanelFactory },
    { type: PblNgridPluginController }
];
PblNgridMatHeaderContextMenuPlugin.propDecorators = {
    style: [{ type: Input, args: ['matHeaderContextMenu',] }],
    config: [{ type: Input }]
};
PblNgridMatHeaderContextMenuPlugin = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    tslib_1.__metadata("design:paramtypes", [PblNgridOverlayPanelFactory,
        PblNgridPluginController])
], PblNgridMatHeaderContextMenuPlugin);
export { PblNgridMatHeaderContextMenuPlugin };
if (false) {
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.style;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.config;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.overlayPanel;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.pluginCtrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLDJCQUEyQixFQUFvRCxNQUFNLDZCQUE2QixDQUFDOztNQVF0SCxVQUFVLEdBQTJCLHNCQUFzQjtJQUlwRCxrQ0FBa0MsU0FBbEMsa0NBQWtDOzs7OztJQU83QyxZQUFZLG1CQUFnRCxFQUNoQyxVQUFvQztRQUFwQyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFFLENBQUM7Q0FFRixDQUFBOztZQWRBLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQ0FBaUMsRUFBRTs7OztZQVZqRCwyQkFBMkI7WUFEM0Isd0JBQXdCOzs7b0JBZTlCLEtBQUssU0FBQyxzQkFBc0I7cUJBQzVCLEtBQUs7O0FBSEssa0NBQWtDO0lBRDlDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQzs2Q0FRRywyQkFBMkI7UUFDcEIsd0JBQXdCO0dBUnJELGtDQUFrQyxDQVk5QztTQVpZLGtDQUFrQzs7O0lBRTdDLG1EQUEwQzs7SUFDMUMsb0RBQTRDOztJQUU1QywwREFBNEM7O0lBR2hDLHdEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgVGFibGVQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsRmFjdG9yeSwgUGJsTmdyaWRPdmVybGF5UGFuZWwsIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIG1hdEhlYWRlckNvbnRleHRNZW51PzogUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbjtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAnbWF0SGVhZGVyQ29udGV4dE1lbnUnID0gJ21hdEhlYWRlckNvbnRleHRNZW51JztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW21hdEhlYWRlckNvbnRleHRNZW51XScgfSlcbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB7XG5cbiAgQElucHV0KCdtYXRIZWFkZXJDb250ZXh0TWVudScpIHN0eWxlOiBhbnk7XG4gIEBJbnB1dCgpIGNvbmZpZzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWc7XG5cbiAgcmVhZG9ubHkgb3ZlcmxheVBhbmVsOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbDtcblxuICBjb25zdHJ1Y3RvcihvdmVybGF5UGFuZWxGYWN0b3J5OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnksXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLm92ZXJsYXlQYW5lbCA9IG92ZXJsYXlQYW5lbEZhY3RvcnkuY3JlYXRlKHBsdWdpbkN0cmwuZXh0QXBpLnRhYmxlKTtcbiAgfVxuXG59XG4iXX0=