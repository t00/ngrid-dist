/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Injector, Input, ComponentFactoryResolver } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
import { PblNgridCheckboxComponent } from './table-checkbox.component';
/** @type {?} */
const PLUGIN_KEY = 'matCheckboxSelection';
let PblNgridMatCheckboxSelectionDirective = class PblNgridMatCheckboxSelectionDirective {
    /**
     * @param {?} table
     * @param {?} cfr
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(table, cfr, injector, pluginCtrl) {
        this.table = table;
        this.cfr = cfr;
        this.injector = injector;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
    }
    /**
     * @return {?}
     */
    get isCheckboxDisabled() { return this._isCheckboxDisabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set isCheckboxDisabled(value) {
        if (value !== this._isCheckboxDisabled) {
            this._isCheckboxDisabled = value;
            if (this.cmpRef && value) {
                this.cmpRef.instance.isCheckboxDisabled = value;
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
    }
    /**
     * Add's a selection column using material's `mat-checkbox` in the column specified.
     * @return {?}
     */
    get matCheckboxSelection() { return this._name; }
    /**
     * @param {?} value
     * @return {?}
     */
    set matCheckboxSelection(value) {
        if (value !== this._name) {
            this._name = value;
            if (!value) {
                if (this.cmpRef) {
                    this.cmpRef.destroy();
                    this.cmpRef = undefined;
                }
            }
            else {
                if (!this.cmpRef) {
                    this.cmpRef = this.cfr.resolveComponentFactory(PblNgridCheckboxComponent).create(this.injector);
                    this.cmpRef.instance.table = this.table;
                    if (this._bulkSelectMode) {
                        this.cmpRef.instance.bulkSelectMode = this._bulkSelectMode;
                    }
                    this.cmpRef.instance.color = this._color;
                }
                if (this.isCheckboxDisabled) {
                    this.cmpRef.instance.isCheckboxDisabled = this.isCheckboxDisabled;
                }
                this.cmpRef.instance.name = value;
                this.cmpRef.changeDetectorRef.detectChanges();
            }
        }
    }
    /**
     * Defines the behavior when clicking on the bulk select checkbox (header).
     * There are 2 options:
     *
     * - all: Will select all items in the current collection
     * - view: Will select only the rendered items in the view
     *
     * The default value is `all`
     * @return {?}
     */
    get bulkSelectMode() { return this._bulkSelectMode; }
    /**
     * @param {?} value
     * @return {?}
     */
    set bulkSelectMode(value) {
        if (value !== this._bulkSelectMode) {
            this._bulkSelectMode = value;
            if (this.cmpRef) {
                this.cmpRef.instance.bulkSelectMode = value;
            }
        }
    }
    /**
     * @return {?}
     */
    get matCheckboxSelectionColor() { return this._color; }
    /**
     * @param {?} value
     * @return {?}
     */
    set matCheckboxSelectionColor(value) {
        if (value !== this._color) {
            this._color = value;
            if (this.cmpRef) {
                this.cmpRef.instance.color = value;
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        this._removePlugin(this.table);
    }
};
PblNgridMatCheckboxSelectionDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matCheckboxSelection]' },] }
];
/** @nocollapse */
PblNgridMatCheckboxSelectionDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridMatCheckboxSelectionDirective.propDecorators = {
    isCheckboxDisabled: [{ type: Input }],
    matCheckboxSelection: [{ type: Input }],
    bulkSelectMode: [{ type: Input }],
    matCheckboxSelectionColor: [{ type: Input }]
};
PblNgridMatCheckboxSelectionDirective = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
        ComponentFactoryResolver,
        Injector,
        PblNgridPluginController])
], PblNgridMatCheckboxSelectionDirective);
export { PblNgridMatCheckboxSelectionDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._name;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._bulkSelectMode;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._color;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.cmpRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype._isCheckboxDisabled;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.cfr;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatCheckboxSelectionDirective.prototype.injector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcGx1Z2luLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbHVtbi8iLCJzb3VyY2VzIjpbImxpYi9jaGVja2JveC1wbHVnaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFhLHdCQUF3QixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUc5RyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O01BUWpFLFVBQVUsR0FBMkIsc0JBQXNCO0lBS3BELHFDQUFxQyxTQUFyQyxxQ0FBcUM7Ozs7Ozs7SUErRWhELFlBQW9CLEtBQTZCLEVBQzdCLEdBQTZCLEVBQzdCLFFBQWtCLEVBQzFCLFVBQW9DO1FBSDVCLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQzdCLFFBQUcsR0FBSCxHQUFHLENBQTBCO1FBQzdCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFFcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RCxDQUFDOzs7O0lBbEZELElBQWEsa0JBQWtCLEtBQUssT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN0RSxJQUFJLGtCQUFrQixDQUFDLEtBQTRCO1FBQ2pELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUN0QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVB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QyxDQUFDO0NBQ0YsQ0FBQTs7WUE5RkEsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlDQUFpQyxFQUFFOzs7O1lBYmpELGlCQUFpQjtZQUpzQix3QkFBd0I7WUFBcEQsUUFBUTtZQUlBLHdCQUF3Qjs7O2lDQWlCakQsS0FBSzttQ0FjTCxLQUFLOzZCQW9DTCxLQUFLO3dDQVVMLEtBQUs7O0FBOURLLHFDQUFxQztJQUhqRCxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFFL0IsSUFBSSxFQUFFOzZDQWdGc0IsaUJBQWlCO1FBQ25CLHdCQUF3QjtRQUNuQixRQUFRO1FBQ2Qsd0JBQXdCO0dBbEZyQyxxQ0FBcUMsQ0E0RmpEO1NBNUZZLHFDQUFxQzs7Ozs7O0lBd0VoRCxzREFBc0I7Ozs7O0lBQ3RCLGdFQUFpRDs7Ozs7SUFDakQsdURBQTZCOzs7OztJQUM3Qix1REFBd0Q7Ozs7O0lBQ3hELDhEQUErRDs7Ozs7SUFDL0Qsb0VBQW1EOzs7OztJQUV2QyxzREFBcUM7Ozs7O0lBQ3JDLG9EQUFxQzs7Ozs7SUFDckMseURBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3RvciwgSW5wdXQsIE9uRGVzdHJveSwgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBDb21wb25lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRoZW1lUGFsZXR0ZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1jaGVja2JveC5jb21wb25lbnQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgbWF0Q2hlY2tib3hTZWxlY3Rpb24/OiBQYmxOZ3JpZE1hdENoZWNrYm94U2VsZWN0aW9uRGlyZWN0aXZlO1xuICB9XG59XG5cbmNvbnN0IFBMVUdJTl9LRVk6ICdtYXRDaGVja2JveFNlbGVjdGlvbicgPSAnbWF0Q2hlY2tib3hTZWxlY3Rpb24nO1xuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW21hdENoZWNrYm94U2VsZWN0aW9uXScgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1hdENoZWNrYm94U2VsZWN0aW9uRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBnZXQgaXNDaGVja2JveERpc2FibGVkKCkgeyByZXR1cm4gdGhpcy5faXNDaGVja2JveERpc2FibGVkOyB9XG4gIHNldCBpc0NoZWNrYm94RGlzYWJsZWQodmFsdWU6IChyb3c6IGFueSkgPT4gYm9vbGVhbiApIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCkge1xuICAgICAgdGhpcy5faXNDaGVja2JveERpc2FibGVkID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYgJiYgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuaXNDaGVja2JveERpc2FibGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkJ3MgYSBzZWxlY3Rpb24gY29sdW1uIHVzaW5nIG1hdGVyaWFsJ3MgYG1hdC1jaGVja2JveGAgaW4gdGhlIGNvbHVtbiBzcGVjaWZpZWQuXG4gICAqL1xuICBASW5wdXQoKSBnZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cbiAgc2V0IG1hdENoZWNrYm94U2VsZWN0aW9uKHZhbHVlOiBzdHJpbmcgKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9uYW1lKSB7XG4gICAgICB0aGlzLl9uYW1lID0gdmFsdWU7XG4gICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmNtcFJlZikge1xuICAgICAgICAgIHRoaXMuY21wUmVmLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLmNtcFJlZiA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLmNtcFJlZikge1xuICAgICAgICAgIHRoaXMuY21wUmVmID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLnRhYmxlID0gdGhpcy50YWJsZTtcbiAgICAgICAgICBpZiAodGhpcy5fYnVsa1NlbGVjdE1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLmJ1bGtTZWxlY3RNb2RlID0gdGhpcy5fYnVsa1NlbGVjdE1vZGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLmNvbG9yID0gdGhpcy5fY29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNDaGVja2JveERpc2FibGVkKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuaXNDaGVja2JveERpc2FibGVkID0gdGhpcy5pc0NoZWNrYm94RGlzYWJsZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UubmFtZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdGhlIGJlaGF2aW9yIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJ1bGsgc2VsZWN0IGNoZWNrYm94IChoZWFkZXIpLlxuICAgKiBUaGVyZSBhcmUgMiBvcHRpb25zOlxuICAgKlxuICAgKiAtIGFsbDogV2lsbCBzZWxlY3QgYWxsIGl0ZW1zIGluIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cbiAgICogLSB2aWV3OiBXaWxsIHNlbGVjdCBvbmx5IHRoZSByZW5kZXJlZCBpdGVtcyBpbiB0aGUgdmlld1xuICAgKlxuICAgKiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYWxsYFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGJ1bGtTZWxlY3RNb2RlKCk6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnIHsgcmV0dXJuIHRoaXMuX2J1bGtTZWxlY3RNb2RlOyB9XG4gIHNldCBidWxrU2VsZWN0TW9kZSh2YWx1ZTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2J1bGtTZWxlY3RNb2RlKSB7XG4gICAgICB0aGlzLl9idWxrU2VsZWN0TW9kZSA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLmJ1bGtTZWxlY3RNb2RlID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgZ2V0IG1hdENoZWNrYm94U2VsZWN0aW9uQ29sb3IoKTogVGhlbWVQYWxldHRlIHsgcmV0dXJuIHRoaXMuX2NvbG9yOyB9XG4gIHNldCBtYXRDaGVja2JveFNlbGVjdGlvbkNvbG9yKHZhbHVlOiBUaGVtZVBhbGV0dGUpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX2NvbG9yKSB7XG4gICAgICB0aGlzLl9jb2xvciA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLmNvbG9yID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xuICBwcml2YXRlIF9idWxrU2VsZWN0TW9kZTogJ2FsbCcgfCAndmlldycgfCAnbm9uZSc7XG4gIHByaXZhdGUgX2NvbG9yOiBUaGVtZVBhbGV0dGU7XG4gIHByaXZhdGUgY21wUmVmOiBDb21wb25lbnRSZWY8UGJsTmdyaWRDaGVja2JveENvbXBvbmVudD47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9pc0NoZWNrYm94RGlzYWJsZWQ6IChyb3c6IGFueSkgPT4gYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LFxuICAgICAgICAgICAgICBwcml2YXRlIGNmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgICAgICAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICAgICAgICAgICAgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgIHRoaXMuY21wUmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG59XG4iXX0=