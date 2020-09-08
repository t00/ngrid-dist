/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/header-context-menu.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
import { PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory } from '@pebula/ngrid/overlay-panel';
/** @type {?} */
export const PLUGIN_KEY = 'matHeaderContextMenu';
export class PblNgridMatHeaderContextMenuPlugin {
    /**
     * @param {?} overlayPanelFactory
     * @param {?} pluginCtrl
     */
    constructor(overlayPanelFactory, pluginCtrl) {
        this.pluginCtrl = pluginCtrl;
        this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.grid);
    }
}
PblNgridMatHeaderContextMenuPlugin.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]', providers: [PblNgridOverlayPanelFactory] },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWNvbnRleHQtbWVudS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9oZWFkZXItY29udGV4dC1tZW51LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMkJBQTJCLEVBQW9ELE1BQU0sNkJBQTZCLENBQUM7O0FBUTVILE1BQU0sT0FBTyxVQUFVLEdBQTJCLHNCQUFzQjtBQUd4RSxNQUFNLE9BQU8sa0NBQWtDOzs7OztJQU83QyxZQUFZLG1CQUFnRCxFQUNoQyxVQUFvQztRQUFwQyxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pFLENBQUM7OztZQVhGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQ0FBaUMsRUFBRSxTQUFTLEVBQUUsQ0FBRSwyQkFBMkIsQ0FBRSxFQUFFOzs7O1lBVjdGLDJCQUEyQjtZQUQzQix3QkFBd0I7OztvQkFjOUIsS0FBSyxTQUFDLHNCQUFzQjtxQkFDNUIsS0FBSzs7OztJQUROLG1EQUEwQzs7SUFDMUMsb0RBQTRDOztJQUU1QywwREFBNEM7O0lBR2hDLHdEQUFvRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxGYWN0b3J5LCBQYmxOZ3JpZE92ZXJsYXlQYW5lbCwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcgfSBmcm9tICdAcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgbWF0SGVhZGVyQ29udGV4dE1lbnU/OiBQYmxOZ3JpZE1hdEhlYWRlckNvbnRleHRNZW51UGx1Z2luO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnbWF0SGVhZGVyQ29udGV4dE1lbnUnID0gJ21hdEhlYWRlckNvbnRleHRNZW51JztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW21hdEhlYWRlckNvbnRleHRNZW51XScsIHByb3ZpZGVyczogWyBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3RvcnkgXSB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWF0SGVhZGVyQ29udGV4dE1lbnVQbHVnaW4ge1xuXG4gIEBJbnB1dCgnbWF0SGVhZGVyQ29udGV4dE1lbnUnKSBzdHlsZTogYW55O1xuICBASW5wdXQoKSBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnO1xuXG4gIHJlYWRvbmx5IG92ZXJsYXlQYW5lbDogUGJsTmdyaWRPdmVybGF5UGFuZWw7XG5cbiAgY29uc3RydWN0b3Iob3ZlcmxheVBhbmVsRmFjdG9yeTogUGJsTmdyaWRPdmVybGF5UGFuZWxGYWN0b3J5LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5vdmVybGF5UGFuZWwgPSBvdmVybGF5UGFuZWxGYWN0b3J5LmNyZWF0ZShwbHVnaW5DdHJsLmV4dEFwaS5ncmlkKTtcbiAgfVxuXG59XG4iXX0=