/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input } from '@angular/core';
import { PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory } from '@pebula/ngrid/overlay-panel';
/** @type {?} */
var PLUGIN_KEY = 'matHeaderContextMenu';
var PblNgridMatHeaderContextMenuPlugin = /** @class */ (function () {
    function PblNgridMatHeaderContextMenuPlugin(overlayPanelFactory, pluginCtrl) {
        this.pluginCtrl = pluginCtrl;
        this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.table);
    }
    PblNgridMatHeaderContextMenuPlugin.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]' },] }
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
    PblNgridMatHeaderContextMenuPlugin = tslib_1.__decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        tslib_1.__metadata("design:paramtypes", [PblNgridOverlayPanelFactory,
            PblNgridPluginController])
    ], PblNgridMatHeaderContextMenuPlugin);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLDJCQUEyQixFQUFvRCxNQUFNLDZCQUE2QixDQUFDOztJQVF0SCxVQUFVLEdBQTJCLHNCQUFzQjs7SUFXL0QsNENBQVksbUJBQWdELEVBQ2hDLFVBQW9DO1FBQXBDLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQzlELElBQUksQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUUsQ0FBQzs7Z0JBWkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlDQUFpQyxFQUFFOzs7O2dCQVZqRCwyQkFBMkI7Z0JBRDNCLHdCQUF3Qjs7O3dCQWU5QixLQUFLLFNBQUMsc0JBQXNCO3lCQUM1QixLQUFLOztJQUhLLGtDQUFrQztRQUQ5QyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7aURBUUcsMkJBQTJCO1lBQ3BCLHdCQUF3QjtPQVJyRCxrQ0FBa0MsQ0FZOUM7SUFBRCx5Q0FBQztDQUFBLElBQUE7U0FaWSxrQ0FBa0M7OztJQUU3QyxtREFBMEM7O0lBQzFDLG9EQUE0Qzs7SUFFNUMsMERBQTRDOztJQUdoQyx3REFBb0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnksIFBibE5ncmlkT3ZlcmxheVBhbmVsLCBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRIZWFkZXJDb250ZXh0TWVudT86IFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW47XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ21hdEhlYWRlckNvbnRleHRNZW51JyA9ICdtYXRIZWFkZXJDb250ZXh0TWVudSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFttYXRIZWFkZXJDb250ZXh0TWVudV0nIH0pXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4ge1xuXG4gIEBJbnB1dCgnbWF0SGVhZGVyQ29udGV4dE1lbnUnKSBzdHlsZTogYW55O1xuICBASW5wdXQoKSBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnO1xuXG4gIHJlYWRvbmx5IG92ZXJsYXlQYW5lbDogUGJsTmdyaWRPdmVybGF5UGFuZWw7XG5cbiAgY29uc3RydWN0b3Iob3ZlcmxheVBhbmVsRmFjdG9yeTogUGJsTmdyaWRPdmVybGF5UGFuZWxGYWN0b3J5LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5vdmVybGF5UGFuZWwgPSBvdmVybGF5UGFuZWxGYWN0b3J5LmNyZWF0ZShwbHVnaW5DdHJsLmV4dEFwaS50YWJsZSk7XG4gIH1cblxufVxuIl19