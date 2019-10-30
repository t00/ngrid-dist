/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Injector, Input, OnDestroy, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
import { PblNgridCheckboxComponent } from './table-checkbox.component';
/** @type {?} */
var PLUGIN_KEY = 'matCheckboxSelection';
var PblNgridMatCheckboxSelectionDirective = /** @class */ (function () {
    function PblNgridMatCheckboxSelectionDirective(table, cfr, injector, pluginCtrl) {
        this.table = table;
        this.cfr = cfr;
        this.injector = injector;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
    }
    Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "isCheckboxDisabled", {
        get: /**
         * @return {?}
         */
        function () { return this._isCheckboxDisabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._isCheckboxDisabled) {
                this._isCheckboxDisabled = value;
                if (this.cmpRef && value) {
                    this.cmpRef.instance.isCheckboxDisabled = value;
                    this.cmpRef.changeDetectorRef.detectChanges();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "matCheckboxSelection", {
        /**
         * Add's a selection column using material's `mat-checkbox` in the column specified.
         */
        get: /**
         * Add's a selection column using material's `mat-checkbox` in the column specified.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "bulkSelectMode", {
        /**
         * Defines the behavior when clicking on the bulk select checkbox (header).
         * There are 2 options:
         *
         * - all: Will select all items in the current collection
         * - view: Will select only the rendered items in the view
         *
         * The default value is `all`
         */
        get: /**
         * Defines the behavior when clicking on the bulk select checkbox (header).
         * There are 2 options:
         *
         * - all: Will select all items in the current collection
         * - view: Will select only the rendered items in the view
         *
         * The default value is `all`
         * @return {?}
         */
        function () { return this._bulkSelectMode; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._bulkSelectMode) {
                this._bulkSelectMode = value;
                if (this.cmpRef) {
                    this.cmpRef.instance.bulkSelectMode = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridMatCheckboxSelectionDirective.prototype, "matCheckboxSelectionColor", {
        get: /**
         * @return {?}
         */
        function () { return this._color; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._color) {
                this._color = value;
                if (this.cmpRef) {
                    this.cmpRef.instance.color = value;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridMatCheckboxSelectionDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        this._removePlugin(this.table);
    };
    PblNgridMatCheckboxSelectionDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridMatCheckboxSelectionDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[matCheckboxSelection]' },] }
    ];
    /** @nocollapse */
    PblNgridMatCheckboxSelectionDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: ComponentFactoryResolver },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
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
    return PblNgridMatCheckboxSelectionDirective;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcGx1Z2luLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbHVtbi8iLCJzb3VyY2VzIjpbImxpYi9jaGVja2JveC1wbHVnaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztJQVFqRSxVQUFVLEdBQTJCLHNCQUFzQjs7SUFvRi9ELCtDQUFvQixLQUE2QixFQUM3QixHQUE2QixFQUM3QixRQUFrQixFQUMxQixVQUFvQztRQUg1QixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUM3QixRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXBDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQWxGRCxzQkFBYSxxRUFBa0I7Ozs7UUFBL0IsY0FBb0MsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDOzs7OztRQUN0RSxVQUF1QixLQUE0QjtZQUNqRCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7Z0JBQ2pDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztvQkFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDL0M7YUFDRjtRQUNILENBQUM7OztPQVRxRTtJQWN0RSxzQkFBYSx1RUFBb0I7UUFIakM7O1dBRUc7Ozs7O1FBQ0gsY0FBOEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDbEUsVUFBeUIsS0FBYTtZQUNwQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7cUJBQ3pCO2lCQUNGO3FCQUFNO29CQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMseUJBQXlCLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNoRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDeEMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFOzRCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQzt5QkFDNUQ7d0JBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7cUJBQzFDO29CQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO3dCQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7cUJBQ25FO29CQUNELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7aUJBQy9DO2FBQ0Y7UUFDSCxDQUFDOzs7T0F6QmlFO0lBb0NsRSxzQkFBYSxpRUFBYztRQVQzQjs7Ozs7Ozs7V0FRRzs7Ozs7Ozs7Ozs7UUFDSCxjQUF5RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7OztRQUN2RixVQUFtQixLQUE4QjtZQUMvQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7aUJBQzdDO2FBQ0Y7UUFDSCxDQUFDOzs7T0FSc0Y7SUFVdkYsc0JBQWEsNEVBQXlCOzs7O1FBQXRDLGNBQXlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzlFLFVBQThCLEtBQW1CO1lBQy9DLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNwQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztpQkFDcEM7YUFDRjtRQUNILENBQUM7OztPQVI2RTs7OztJQXdCOUUsMkRBQVc7OztJQUFYO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O2dCQVowQixpQkFBaUI7Z0JBQ25CLHdCQUF3QjtnQkFDbkIsUUFBUTtnQkFDZCx3QkFBd0I7OztnQkFwRmpELFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpQ0FBaUMsRUFBRTs7OztnQkFiakQsaUJBQWlCO2dCQUpzQix3QkFBd0I7Z0JBQXBELFFBQVE7Z0JBSUEsd0JBQXdCOzs7cUNBaUJqRCxLQUFLO3VDQWNMLEtBQUs7aUNBb0NMLEtBQUs7NENBVUwsS0FBSzs7SUE5REsscUNBQXFDO1FBSGpELFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUUvQixJQUFJLEVBQUU7aURBZ0ZzQixpQkFBaUI7WUFDbkIsd0JBQXdCO1lBQ25CLFFBQVE7WUFDZCx3QkFBd0I7T0FsRnJDLHFDQUFxQyxDQTRGakQ7SUFBRCw0Q0FBQztDQUFBLElBQUE7U0E1RlkscUNBQXFDOzs7Ozs7SUF3RWhELHNEQUFzQjs7Ozs7SUFDdEIsZ0VBQWlEOzs7OztJQUNqRCx1REFBNkI7Ozs7O0lBQzdCLHVEQUF3RDs7Ozs7SUFDeEQsOERBQStEOzs7OztJQUMvRCxvRUFBbUQ7Ozs7O0lBRXZDLHNEQUFxQzs7Ozs7SUFDckMsb0RBQXFDOzs7OztJQUNyQyx5REFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBJbnB1dCwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRDaGVja2JveFNlbGVjdGlvbj86IFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmU7XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ21hdENoZWNrYm94U2VsZWN0aW9uJyA9ICdtYXRDaGVja2JveFNlbGVjdGlvbic7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbbWF0Q2hlY2tib3hTZWxlY3Rpb25dJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGdldCBpc0NoZWNrYm94RGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQ7IH1cbiAgc2V0IGlzQ2hlY2tib3hEaXNhYmxlZCh2YWx1ZTogKHJvdzogYW55KSA9PiBib29sZWFuICkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNDaGVja2JveERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmNtcFJlZiAmJiB2YWx1ZSkge1xuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQncyBhIHNlbGVjdGlvbiBjb2x1bW4gdXNpbmcgbWF0ZXJpYWwncyBgbWF0LWNoZWNrYm94YCBpbiB0aGUgY29sdW1uIHNwZWNpZmllZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBtYXRDaGVja2JveFNlbGVjdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxuICBzZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb24odmFsdWU6IHN0cmluZyApIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX25hbWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuY21wUmVmID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuY21wUmVmKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UudGFibGUgPSB0aGlzLnRhYmxlO1xuICAgICAgICAgIGlmICh0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuYnVsa1NlbGVjdE1vZGUgPSB0aGlzLl9idWxrU2VsZWN0TW9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuY29sb3IgPSB0aGlzLl9jb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94RGlzYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5pc0NoZWNrYm94RGlzYWJsZWQgPSB0aGlzLmlzQ2hlY2tib3hEaXNhYmxlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5uYW1lID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgYmVoYXZpb3Igd2hlbiBjbGlja2luZyBvbiB0aGUgYnVsayBzZWxlY3QgY2hlY2tib3ggKGhlYWRlcikuXG4gICAqIFRoZXJlIGFyZSAyIG9wdGlvbnM6XG4gICAqXG4gICAqIC0gYWxsOiBXaWxsIHNlbGVjdCBhbGwgaXRlbXMgaW4gdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICAgKiAtIHZpZXc6IFdpbGwgc2VsZWN0IG9ubHkgdGhlIHJlbmRlcmVkIGl0ZW1zIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhbGxgXG4gICAqL1xuICBASW5wdXQoKSBnZXQgYnVsa1NlbGVjdE1vZGUoKTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScgeyByZXR1cm4gdGhpcy5fYnVsa1NlbGVjdE1vZGU7IH1cbiAgc2V0IGJ1bGtTZWxlY3RNb2RlKHZhbHVlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fYnVsa1NlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuX2J1bGtTZWxlY3RNb2RlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb25Db2xvcigpOiBUaGVtZVBhbGV0dGUgeyByZXR1cm4gdGhpcy5fY29sb3I7IH1cbiAgc2V0IG1hdENoZWNrYm94U2VsZWN0aW9uQ29sb3IodmFsdWU6IFRoZW1lUGFsZXR0ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY29sb3IpIHtcbiAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuY29sb3IgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcbiAgcHJpdmF0ZSBjbXBSZWY6IENvbXBvbmVudFJlZjxQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgX2lzQ2hlY2tib3hEaXNhYmxlZDogKHJvdzogYW55KSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNtcFJlZikge1xuICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cbn1cbiJdfQ==