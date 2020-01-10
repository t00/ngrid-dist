/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Injector, Input, OnDestroy, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin } from '@pebula/ngrid';
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
PblNgridMatCheckboxSelectionDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: PblNgridPluginController }
];
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
    NgridPlugin({ id: PLUGIN_KEY }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcGx1Z2luLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbHVtbi8iLCJzb3VyY2VzIjpbImxpYi9jaGVja2JveC1wbHVnaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSx3QkFBd0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHOUcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztNQVFqRSxVQUFVLEdBQTJCLHNCQUFzQjtJQUtwRCxxQ0FBcUMsU0FBckMscUNBQXFDOzs7Ozs7O0lBK0VoRCxZQUFvQixLQUE2QixFQUM3QixHQUE2QixFQUM3QixRQUFrQixFQUMxQixVQUFvQztRQUg1QixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUM3QixRQUFHLEdBQUgsR0FBRyxDQUEwQjtRQUM3QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRXBDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7OztJQWxGRCxJQUFhLGtCQUFrQixLQUFLLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDdEUsSUFBSSxrQkFBa0IsQ0FBQyxLQUE0QjtRQUNqRCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDdEMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztZQUNqQyxJQUFJLElBQUksQ0FB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S0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztDQUNGLENBQUE7O1lBYjRCLGlCQUFpQjtZQUNuQix3QkFBd0I7WUFDbkIsUUFBUTtZQUNkLHdCQUF3Qjs7O1lBcEZqRCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsaUNBQWlDLEVBQUU7Ozs7WUFiakQsaUJBQWlCO1lBSnNCLHdCQUF3QjtZQUFwRCxRQUFRO1lBSUEsd0JBQXdCOzs7aUNBaUJqRCxLQUFLO21DQWNMLEtBQUs7NkJBb0NMLEtBQUs7d0NBVUwsS0FBSzs7QUE5REsscUNBQXFDO0lBSGpELFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUUvQixJQUFJLEVBQUU7NkNBZ0ZzQixpQkFBaUI7UUFDbkIsd0JBQXdCO1FBQ25CLFFBQVE7UUFDZCx3QkFBd0I7R0FsRnJDLHFDQUFxQyxDQTRGakQ7U0E1RlkscUNBQXFDOzs7Ozs7SUF3RWhELHNEQUFzQjs7Ozs7SUFDdEIsZ0VBQWlEOzs7OztJQUNqRCx1REFBNkI7Ozs7O0lBQzdCLHVEQUF3RDs7Ozs7SUFDeEQsOERBQStEOzs7OztJQUMvRCxvRUFBbUQ7Ozs7O0lBRXZDLHNEQUFxQzs7Ozs7SUFDckMsb0RBQXFDOzs7OztJQUNyQyx5REFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBJbnB1dCwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLWNoZWNrYm94LmNvbXBvbmVudCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRDaGVja2JveFNlbGVjdGlvbj86IFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmU7XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ21hdENoZWNrYm94U2VsZWN0aW9uJyA9ICdtYXRDaGVja2JveFNlbGVjdGlvbic7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbbWF0Q2hlY2tib3hTZWxlY3Rpb25dJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWF0Q2hlY2tib3hTZWxlY3Rpb25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGdldCBpc0NoZWNrYm94RGlzYWJsZWQoKSB7IHJldHVybiB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQ7IH1cbiAgc2V0IGlzQ2hlY2tib3hEaXNhYmxlZCh2YWx1ZTogKHJvdzogYW55KSA9PiBib29sZWFuICkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5faXNDaGVja2JveERpc2FibGVkKSB7XG4gICAgICB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmNtcFJlZiAmJiB2YWx1ZSkge1xuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5pc0NoZWNrYm94RGlzYWJsZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQncyBhIHNlbGVjdGlvbiBjb2x1bW4gdXNpbmcgbWF0ZXJpYWwncyBgbWF0LWNoZWNrYm94YCBpbiB0aGUgY29sdW1uIHNwZWNpZmllZC5cbiAgICovXG4gIEBJbnB1dCgpIGdldCBtYXRDaGVja2JveFNlbGVjdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxuICBzZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb24odmFsdWU6IHN0cmluZyApIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX25hbWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSB2YWx1ZTtcbiAgICAgIGlmICghdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMuY21wUmVmID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuY21wUmVmKSB7XG4gICAgICAgICAgdGhpcy5jbXBSZWYgPSB0aGlzLmNmci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50KS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UudGFibGUgPSB0aGlzLnRhYmxlO1xuICAgICAgICAgIGlmICh0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuYnVsa1NlbGVjdE1vZGUgPSB0aGlzLl9idWxrU2VsZWN0TW9kZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuY29sb3IgPSB0aGlzLl9jb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0NoZWNrYm94RGlzYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5pc0NoZWNrYm94RGlzYWJsZWQgPSB0aGlzLmlzQ2hlY2tib3hEaXNhYmxlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5uYW1lID0gdmFsdWU7XG4gICAgICAgIHRoaXMuY21wUmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB0aGUgYmVoYXZpb3Igd2hlbiBjbGlja2luZyBvbiB0aGUgYnVsayBzZWxlY3QgY2hlY2tib3ggKGhlYWRlcikuXG4gICAqIFRoZXJlIGFyZSAyIG9wdGlvbnM6XG4gICAqXG4gICAqIC0gYWxsOiBXaWxsIHNlbGVjdCBhbGwgaXRlbXMgaW4gdGhlIGN1cnJlbnQgY29sbGVjdGlvblxuICAgKiAtIHZpZXc6IFdpbGwgc2VsZWN0IG9ubHkgdGhlIHJlbmRlcmVkIGl0ZW1zIGluIHRoZSB2aWV3XG4gICAqXG4gICAqIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhbGxgXG4gICAqL1xuICBASW5wdXQoKSBnZXQgYnVsa1NlbGVjdE1vZGUoKTogJ2FsbCcgfCAndmlldycgfCAnbm9uZScgeyByZXR1cm4gdGhpcy5fYnVsa1NlbGVjdE1vZGU7IH1cbiAgc2V0IGJ1bGtTZWxlY3RNb2RlKHZhbHVlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fYnVsa1NlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuX2J1bGtTZWxlY3RNb2RlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBnZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb25Db2xvcigpOiBUaGVtZVBhbGV0dGUgeyByZXR1cm4gdGhpcy5fY29sb3I7IH1cbiAgc2V0IG1hdENoZWNrYm94U2VsZWN0aW9uQ29sb3IodmFsdWU6IFRoZW1lUGFsZXR0ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fY29sb3IpIHtcbiAgICAgIHRoaXMuX2NvbG9yID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgdGhpcy5jbXBSZWYuaW5zdGFuY2UuY29sb3IgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2J1bGtTZWxlY3RNb2RlOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJztcbiAgcHJpdmF0ZSBfY29sb3I6IFRoZW1lUGFsZXR0ZTtcbiAgcHJpdmF0ZSBjbXBSZWY6IENvbXBvbmVudFJlZjxQYmxOZ3JpZENoZWNrYm94Q29tcG9uZW50PjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgX2lzQ2hlY2tib3hEaXNhYmxlZDogKHJvdzogYW55KSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHByaXZhdGUgY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmNtcFJlZikge1xuICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cbn1cbiJdfQ==