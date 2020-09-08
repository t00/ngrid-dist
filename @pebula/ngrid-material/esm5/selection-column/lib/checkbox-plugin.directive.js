/**
 * @fileoverview added by tsickle
 * Generated from: lib/checkbox-plugin.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Injector, Input, ComponentFactoryResolver } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { PblNgridCheckboxComponent } from './table-checkbox.component';
/** @type {?} */
export var PLUGIN_KEY = 'matCheckboxSelection';
var PblNgridMatCheckboxSelectionDirective = /** @class */ (function () {
    function PblNgridMatCheckboxSelectionDirective(table, cfr, injector, pluginCtrl) {
        this.table = table;
        this.cfr = cfr;
        this.injector = injector;
        this._color = 'primary';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtcGx1Z2luLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvc2VsZWN0aW9uLWNvbHVtbi8iLCJzb3VyY2VzIjpbImxpYi9jaGVja2JveC1wbHVnaW4uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFhLHdCQUF3QixFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUc5RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7O0FBUXZFLE1BQU0sS0FBTyxVQUFVLEdBQTJCLHNCQUFzQjtBQUV4RTtJQWdGRSwrQ0FBb0IsS0FBNkIsRUFDN0IsR0FBNkIsRUFDN0IsUUFBa0IsRUFDMUIsVUFBb0M7UUFINUIsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFDN0IsUUFBRyxHQUFILEdBQUcsQ0FBMEI7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVA5QixXQUFNLEdBQWlCLFNBQVMsQ0FBQztRQVN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFsRkQsc0JBQWEscUVBQWtCOzs7O1FBQS9CLGNBQW9DLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDdEUsVUFBdUIsS0FBNEI7WUFDakQsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUN0QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO2dCQUNqQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxFQUFFO29CQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxr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YSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOztnQkE1RkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlDQUFpQyxFQUFFOzs7O2dCQVpqRCxpQkFBaUI7Z0JBSHNCLHdCQUF3QjtnQkFBcEQsUUFBUTtnQkFHQSx3QkFBd0I7OztxQ0FlakQsS0FBSzt1Q0FjTCxLQUFLO2lDQW9DTCxLQUFLOzRDQVVMLEtBQUs7O0lBOEJSLDRDQUFDO0NBQUEsQUE3RkQsSUE2RkM7U0E1RlkscUNBQXFDOzs7Ozs7SUF3RWhELHNEQUFzQjs7Ozs7SUFDdEIsZ0VBQWlEOzs7OztJQUNqRCx1REFBeUM7Ozs7O0lBQ3pDLHVEQUF3RDs7Ozs7SUFDeEQsOERBQStEOzs7OztJQUMvRCxvRUFBbUQ7Ozs7O0lBRXZDLHNEQUFxQzs7Ozs7SUFDckMsb0RBQXFDOzs7OztJQUNyQyx5REFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdG9yLCBJbnB1dCwgT25EZXN0cm95LCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGhlbWVQYWxldHRlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDaGVja2JveENvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtY2hlY2tib3guY29tcG9uZW50JztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIG1hdENoZWNrYm94U2VsZWN0aW9uPzogUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ21hdENoZWNrYm94U2VsZWN0aW9uJyA9ICdtYXRDaGVja2JveFNlbGVjdGlvbic7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFttYXRDaGVja2JveFNlbGVjdGlvbl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRDaGVja2JveFNlbGVjdGlvbkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgZ2V0IGlzQ2hlY2tib3hEaXNhYmxlZCgpIHsgcmV0dXJuIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZDsgfVxuICBzZXQgaXNDaGVja2JveERpc2FibGVkKHZhbHVlOiAocm93OiBhbnkpID0+IGJvb2xlYW4gKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9pc0NoZWNrYm94RGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2lzQ2hlY2tib3hEaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgaWYgKHRoaXMuY21wUmVmICYmIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLmlzQ2hlY2tib3hEaXNhYmxlZCA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNtcFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCdzIGEgc2VsZWN0aW9uIGNvbHVtbiB1c2luZyBtYXRlcmlhbCdzIGBtYXQtY2hlY2tib3hgIGluIHRoZSBjb2x1bW4gc3BlY2lmaWVkLlxuICAgKi9cbiAgQElucHV0KCkgZ2V0IG1hdENoZWNrYm94U2VsZWN0aW9uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9uYW1lOyB9XG4gIHNldCBtYXRDaGVja2JveFNlbGVjdGlvbih2YWx1ZTogc3RyaW5nICkge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbmFtZSkge1xuICAgICAgdGhpcy5fbmFtZSA9IHZhbHVlO1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5jbXBSZWYpIHtcbiAgICAgICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XG4gICAgICAgICAgdGhpcy5jbXBSZWYgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghdGhpcy5jbXBSZWYpIHtcbiAgICAgICAgICB0aGlzLmNtcFJlZiA9IHRoaXMuY2ZyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQpLmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS50YWJsZSA9IHRoaXMudGFibGU7XG4gICAgICAgICAgaWYgKHRoaXMuX2J1bGtTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5idWxrU2VsZWN0TW9kZSA9IHRoaXMuX2J1bGtTZWxlY3RNb2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5jb2xvciA9IHRoaXMuX2NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzQ2hlY2tib3hEaXNhYmxlZCkge1xuICAgICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLmlzQ2hlY2tib3hEaXNhYmxlZCA9IHRoaXMuaXNDaGVja2JveERpc2FibGVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY21wUmVmLmluc3RhbmNlLm5hbWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5jbXBSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHRoZSBiZWhhdmlvciB3aGVuIGNsaWNraW5nIG9uIHRoZSBidWxrIHNlbGVjdCBjaGVja2JveCAoaGVhZGVyKS5cbiAgICogVGhlcmUgYXJlIDIgb3B0aW9uczpcbiAgICpcbiAgICogLSBhbGw6IFdpbGwgc2VsZWN0IGFsbCBpdGVtcyBpbiB0aGUgY3VycmVudCBjb2xsZWN0aW9uXG4gICAqIC0gdmlldzogV2lsbCBzZWxlY3Qgb25seSB0aGUgcmVuZGVyZWQgaXRlbXMgaW4gdGhlIHZpZXdcbiAgICpcbiAgICogVGhlIGRlZmF1bHQgdmFsdWUgaXMgYGFsbGBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBidWxrU2VsZWN0TW9kZSgpOiAnYWxsJyB8ICd2aWV3JyB8ICdub25lJyB7IHJldHVybiB0aGlzLl9idWxrU2VsZWN0TW9kZTsgfVxuICBzZXQgYnVsa1NlbGVjdE1vZGUodmFsdWU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9idWxrU2VsZWN0TW9kZSkge1xuICAgICAgdGhpcy5fYnVsa1NlbGVjdE1vZGUgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmNtcFJlZikge1xuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5idWxrU2VsZWN0TW9kZSA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBtYXRDaGVja2JveFNlbGVjdGlvbkNvbG9yKCk6IFRoZW1lUGFsZXR0ZSB7IHJldHVybiB0aGlzLl9jb2xvcjsgfVxuICBzZXQgbWF0Q2hlY2tib3hTZWxlY3Rpb25Db2xvcih2YWx1ZTogVGhlbWVQYWxldHRlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9jb2xvcikge1xuICAgICAgdGhpcy5fY29sb3IgPSB2YWx1ZTtcbiAgICAgIGlmICh0aGlzLmNtcFJlZikge1xuICAgICAgICB0aGlzLmNtcFJlZi5pbnN0YW5jZS5jb2xvciA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX25hbWU6IHN0cmluZztcbiAgcHJpdmF0ZSBfYnVsa1NlbGVjdE1vZGU6ICdhbGwnIHwgJ3ZpZXcnIHwgJ25vbmUnO1xuICBwcml2YXRlIF9jb2xvcjogVGhlbWVQYWxldHRlID0gJ3ByaW1hcnknO1xuICBwcml2YXRlIGNtcFJlZjogQ29tcG9uZW50UmVmPFBibE5ncmlkQ2hlY2tib3hDb21wb25lbnQ+O1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfaXNDaGVja2JveERpc2FibGVkOiAocm93OiBhbnkpID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZnI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgICAgICAgICAgIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuY21wUmVmKSB7XG4gICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxufVxuIl19