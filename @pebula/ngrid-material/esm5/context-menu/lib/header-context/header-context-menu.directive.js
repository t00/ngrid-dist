/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/header-context-menu.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory } from '@pebula/ngrid/overlay-panel';
/** @type {?} */
export var PLUGIN_KEY = 'matHeaderContextMenu';
var PblNgridMatHeaderContextMenuPlugin = /** @class */ (function () {
    function PblNgridMatHeaderContextMenuPlugin(overlayPanelFactory, pluginCtrl) {
        this.pluginCtrl = pluginCtrl;
        this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.grid);
    }
    PblNgridMatHeaderContextMenuPlugin.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]', providers: [PblNgridOverlayPanelFactory] },] }
    ];
    /** @nocollapse */
    PblNgridMatHeaderContextMenuPlugin.ctorParameters = function () { return [
        { type: PblNgridOverlayPanelFactory },
        { type: PblNgridPluginController }
    ]; };
    PblNgridMatHeaderContextMenuPlugin.propDecorators = {
        style: [{ type: Input, args: ['matHeaderContextMenu',] }],
        config: [{ type: Input }]
    };
    return PblNgridMatHeaderContextMenuPlugin;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMkJBQTJCLEVBQW9ELE1BQU0sNkJBQTZCLENBQUM7O0FBUTVILE1BQU0sS0FBTyxVQUFVLEdBQTJCLHNCQUFzQjtBQUV4RTtJQVFFLDRDQUFZLG1CQUFnRCxFQUNoQyxVQUFvQztRQUFwQyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7O2dCQVhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQ0FBaUMsRUFBRSxTQUFTLEVBQUUsQ0FBRSwyQkFBMkIsQ0FBRSxFQUFFOzs7O2dCQVY3RiwyQkFBMkI7Z0JBRDNCLHdCQUF3Qjs7O3dCQWM5QixLQUFLLFNBQUMsc0JBQXNCO3lCQUM1QixLQUFLOztJQVNSLHlDQUFDO0NBQUEsQUFiRCxJQWFDO1NBWlksa0NBQWtDOzs7SUFFN0MsbURBQTBDOztJQUMxQyxvREFBNEM7O0lBRTVDLDBEQUE0Qzs7SUFHaEMsd0RBQW9EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnksIFBibE5ncmlkT3ZlcmxheVBhbmVsLCBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRIZWFkZXJDb250ZXh0TWVudT86IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW47XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdtYXRIZWFkZXJDb250ZXh0TWVudScgPSAnbWF0SGVhZGVyQ29udGV4dE1lbnUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbbWF0SGVhZGVyQ29udGV4dE1lbnVdJywgcHJvdmlkZXJzOiBbIFBibE5ncmlkT3ZlcmxheVBhbmVsRmFjdG9yeSBdIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRIZWFkZXJDb250ZXh0TWVudVBsdWdpbiB7XG5cbiAgQElucHV0KCdtYXRIZWFkZXJDb250ZXh0TWVudScpIHN0eWxlOiBhbnk7XG4gIEBJbnB1dCgpIGNvbmZpZzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWc7XG5cbiAgcmVhZG9ubHkgb3ZlcmxheVBhbmVsOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbDtcblxuICBjb25zdHJ1Y3RvcihvdmVybGF5UGFuZWxGYWN0b3J5OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnksXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLm92ZXJsYXlQYW5lbCA9IG92ZXJsYXlQYW5lbEZhY3RvcnkuY3JlYXRlKHBsdWdpbkN0cmwuZXh0QXBpLmdyaWQpO1xuICB9XG5cbn1cbiJdfQ==