/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
import { StylingDiffer } from './styling_differ';
/*
    We're using `StylingDiffer`, which is an exact copy of the style differ used for `ngStyle` and `ngClass`.
    The class is not exposed so we use a hard-copy.
    `StylingDiffer` is used only when IVY is enabled but here we've adopted it to be used in both modes. (pre IVY and IVY)
*/
/**
 * Bind to the class / style attributes of the container of a cell template.
 * For class bindings use [ngridCellClass] and for style bindings use [ngridCellStyle].
 *
 * This is like [ngClass] or [ngStyle] but not for the host of the directive but to it's parent.
 *
 * - [ngridCellClass] accepts the same type of values that [ngClass] does.
 * - [ngridCellStyle] accepts the same type of values that [ngStyle] does.
 *
 * ## Example
 *
 * We want to create a new cell type called "balance" that represents the balance of a bank account.
 * We also want to have different background color, green if the account balance if positive and red if it's negative.
 *
 * ```html
 * <div *pblNgridCellTypeDef="'balance'; value as value"
 *      [ngClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
 * </div>
 * ```
 *
 * The example above will work but the background will not fill the entire cell, only the `div` it is applied on.
 * This is because the container of the `div` has internal styling that apply padding (among other styles) to the cell.
 *
 * The container is controlled internally by ngrid, but you can access it's style / class attributes using this directive.
 *
 * ```html
 * <div *pblNgridCellTypeDef="'balance'; value as value"
 *      [ngridCellClass]="value < 0 ? 'balance-negative' : 'balance-positive'">{{ value  }}
 * </div>
 * ```
 *
 * > Because style / class is applied on the parent and the parent can have multiple children it is possible to apply this directive
 * on multiple children, do not do this as it will have unexpected results.
 */
var PblNgridCellStyling = /** @class */ (function () {
    function PblNgridCellStyling(elRef) {
        this.elRef = elRef;
        this._lastStyle = new Set();
        this._lastClass = new Set();
    }
    Object.defineProperty(PblNgridCellStyling.prototype, "style", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._styleDiffer) {
                this._styleDiffer = new StylingDiffer('NgStyle', 8 /* AllowUnits */);
            }
            this._styleDiffer.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridCellStyling.prototype, "klass", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (!this._classDiffer) {
                this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
            }
            this._classDiffer.setValue(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridCellStyling.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._parent = this.elRef.nativeElement.parentElement;
        this.updateParent();
    };
    /**
     * @return {?}
     */
    PblNgridCellStyling.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () { this, this.updateParent(); };
    /**
     * @private
     * @return {?}
     */
    PblNgridCellStyling.prototype.updateParent = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        if (this._parent) {
            if (this._styleDiffer && this._styleDiffer.hasValueChanged()) {
                /** @type {?} */
                var lastStyle = this._lastStyle;
                this._lastStyle = new Set();
                try {
                    for (var _e = tslib_1.__values(Object.keys(this._styleDiffer.value)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var key = _f.value;
                        this._parent.style[key] = this._styleDiffer.value[key];
                        lastStyle.delete(key);
                        this._lastStyle.add(key);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (lastStyle.size > 0) {
                    try {
                        for (var _g = tslib_1.__values(lastStyle.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                            var key = _h.value;
                            this._parent.style[key] = null;
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            if (this._classDiffer && this._classDiffer.hasValueChanged()) {
                /** @type {?} */
                var lastClass = this._lastClass;
                this._lastClass = new Set();
                try {
                    for (var _j = tslib_1.__values(Object.keys(this._classDiffer.value)), _k = _j.next(); !_k.done; _k = _j.next()) {
                        var key = _k.value;
                        if (this._classDiffer.value[key]) {
                            this._parent.classList.add(key);
                            this._lastClass.add(key);
                        }
                        else {
                            this._parent.classList.remove(key);
                        }
                        lastClass.delete(key);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                if (lastClass.size > 0) {
                    try {
                        for (var _l = tslib_1.__values(lastClass.values()), _m = _l.next(); !_m.done; _m = _l.next()) {
                            var key = _m.value;
                            this._parent.classList.remove(key);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
        }
    };
    PblNgridCellStyling.decorators = [
        { type: Directive, args: [{ selector: '[ngridCellStyle], [ngridCellClass]' },] }
    ];
    /** @nocollapse */
    PblNgridCellStyling.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    PblNgridCellStyling.propDecorators = {
        style: [{ type: Input, args: ['ngridCellStyle',] }],
        klass: [{ type: Input, args: ['ngridCellClass',] }]
    };
    return PblNgridCellStyling;
}());
export { PblNgridCellStyling };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._styleDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._classDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._parent;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._lastStyle;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype._lastClass;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellStyling.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZGlyZWN0aXZlcy9jZWxsLXN0eWxlLWNsYXNzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQ3ZFO0lBMEJFLDZCQUFvQixLQUE4QjtRQUE5QixVQUFLLEdBQUwsS0FBSyxDQUF5QjtRQUgxQyxlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztRQUMvQixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztJQUVlLENBQUM7SUF2QnZELHNCQUE2QixzQ0FBSzs7Ozs7UUFBbEMsVUFBbUMsS0FBZ0M7WUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQWdDLFNBQVMscUJBQWtDLENBQUM7YUFDbEg7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUVELHNCQUE2QixzQ0FBSzs7Ozs7UUFBbEMsVUFBbUMsS0FBaUU7WUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQ25DLFNBQVMsRUFDVCw2Q0FBdUUsMkJBQXdDLHNCQUFrQyxDQUNsSixDQUFDO2FBQ0g7WUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTs7OztJQVVELDZDQUFlOzs7SUFBZjtR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U0FBQyxnQkFBZ0I7d0JBT3RCLEtBQUssU0FBQyxnQkFBZ0I7O0lBOER6QiwwQkFBQztDQUFBLEFBeEVELElBd0VDO1NBdkVZLG1CQUFtQjs7Ozs7O0lBbUI5QiwyQ0FBbUU7Ozs7O0lBQ25FLDJDQUFrRTs7Ozs7SUFDbEUsc0NBQTZCOzs7OztJQUM3Qix5Q0FBdUM7Ozs7O0lBQ3ZDLHlDQUF1Qzs7Ozs7SUFFM0Isb0NBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3R5bGluZ0RpZmZlciwgU3R5bGluZ0RpZmZlck9wdGlvbnMgfSBmcm9tICcuL3N0eWxpbmdfZGlmZmVyJztcblxuLypcbiAgICBXZSdyZSB1c2luZyBgU3R5bGluZ0RpZmZlcmAsIHdoaWNoIGlzIGFuIGV4YWN0IGNvcHkgb2YgdGhlIHN0eWxlIGRpZmZlciB1c2VkIGZvciBgbmdTdHlsZWAgYW5kIGBuZ0NsYXNzYC5cbiAgICBUaGUgY2xhc3MgaXMgbm90IGV4cG9zZWQgc28gd2UgdXNlIGEgaGFyZC1jb3B5LlxuICAgIGBTdHlsaW5nRGlmZmVyYCBpcyB1c2VkIG9ubHkgd2hlbiBJVlkgaXMgZW5hYmxlZCBidXQgaGVyZSB3ZSd2ZSBhZG9wdGVkIGl0IHRvIGJlIHVzZWQgaW4gYm90aCBtb2Rlcy4gKHByZSBJVlkgYW5kIElWWSlcbiovXG5cblxuLyoqXG4gKiBCaW5kIHRvIHRoZSBjbGFzcyAvIHN0eWxlIGF0dHJpYnV0ZXMgb2YgdGhlIGNvbnRhaW5lciBvZiBhIGNlbGwgdGVtcGxhdGUuXG4gKiBGb3IgY2xhc3MgYmluZGluZ3MgdXNlIFtuZ3JpZENlbGxDbGFzc10gYW5kIGZvciBzdHlsZSBiaW5kaW5ncyB1c2UgW25ncmlkQ2VsbFN0eWxlXS5cbiAqXG4gKiBUaGlzIGlzIGxpa2UgW25nQ2xhc3NdIG9yIFtuZ1N0eWxlXSBidXQgbm90IGZvciB0aGUgaG9zdCBvZiB0aGUgZGlyZWN0aXZlIGJ1dCB0byBpdCdzIHBhcmVudC5cbiAqXG4gKiAtIFtuZ3JpZENlbGxDbGFzc10gYWNjZXB0cyB0aGUgc2FtZSB0eXBlIG9mIHZhbHVlcyB0aGF0IFtuZ0NsYXNzXSBkb2VzLlxuICogLSBbbmdyaWRDZWxsU3R5bGVdIGFjY2VwdHMgdGhlIHNhbWUgdHlwZSBvZiB2YWx1ZXMgdGhhdCBbbmdTdHlsZV0gZG9lcy5cbiAqXG4gKiAjIyBFeGFtcGxlXG4gKlxuICogV2Ugd2FudCB0byBjcmVhdGUgYSBuZXcgY2VsbCB0eXBlIGNhbGxlZCBcImJhbGFuY2VcIiB0aGF0IHJlcHJlc2VudHMgdGhlIGJhbGFuY2Ugb2YgYSBiYW5rIGFjY291bnQuXG4gKiBXZSBhbHNvIHdhbnQgdG8gaGF2ZSBkaWZmZXJlbnQgYmFja2dyb3VuZCBjb2xvciwgZ3JlZW4gaWYgdGhlIGFjY291bnQgYmFsYW5jZSBpZiBwb3NpdGl2ZSBhbmQgcmVkIGlmIGl0J3MgbmVnYXRpdmUuXG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqcGJsTmdyaWRDZWxsVHlwZURlZj1cIidiYWxhbmNlJzsgdmFsdWUgYXMgdmFsdWVcIlxuICogICAgICBbbmdDbGFzc109XCJ2YWx1ZSA8IDAgPyAnYmFsYW5jZS1uZWdhdGl2ZScgOiAnYmFsYW5jZS1wb3NpdGl2ZSdcIj57eyB2YWx1ZSAgfX1cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogVGhlIGV4YW1wbGUgYWJvdmUgd2lsbCB3b3JrIGJ1dCB0aGUgYmFja2dyb3VuZCB3aWxsIG5vdCBmaWxsIHRoZSBlbnRpcmUgY2VsbCwgb25seSB0aGUgYGRpdmAgaXQgaXMgYXBwbGllZCBvbi5cbiAqIFRoaXMgaXMgYmVjYXVzZSB0aGUgY29udGFpbmVyIG9mIHRoZSBgZGl2YCBoYXMgaW50ZXJuYWwgc3R5bGluZyB0aGF0IGFwcGx5IHBhZGRpbmcgKGFtb25nIG90aGVyIHN0eWxlcykgdG8gdGhlIGNlbGwuXG4gKlxuICogVGhlIGNvbnRhaW5lciBpcyBjb250cm9sbGVkIGludGVybmFsbHkgYnkgbmdyaWQsIGJ1dCB5b3UgY2FuIGFjY2VzcyBpdCdzIHN0eWxlIC8gY2xhc3MgYXR0cmlidXRlcyB1c2luZyB0aGlzIGRpcmVjdGl2ZS5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2ICpwYmxOZ3JpZENlbGxUeXBlRGVmPVwiJ2JhbGFuY2UnOyB2YWx1ZSBhcyB2YWx1ZVwiXG4gKiAgICAgIFtuZ3JpZENlbGxDbGFzc109XCJ2YWx1ZSA8IDAgPyAnYmFsYW5jZS1uZWdhdGl2ZScgOiAnYmFsYW5jZS1wb3NpdGl2ZSdcIj57eyB2YWx1ZSAgfX1cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogPiBCZWNhdXNlIHN0eWxlIC8gY2xhc3MgaXMgYXBwbGllZCBvbiB0aGUgcGFyZW50IGFuZCB0aGUgcGFyZW50IGNhbiBoYXZlIG11bHRpcGxlIGNoaWxkcmVuIGl0IGlzIHBvc3NpYmxlIHRvIGFwcGx5IHRoaXMgZGlyZWN0aXZlXG4gKiBvbiBtdWx0aXBsZSBjaGlsZHJlbiwgZG8gbm90IGRvIHRoaXMgYXMgaXQgd2lsbCBoYXZlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqL1xuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW25ncmlkQ2VsbFN0eWxlXSwgW25ncmlkQ2VsbENsYXNzXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxTdHlsaW5nIHtcblxuICBASW5wdXQoJ25ncmlkQ2VsbFN0eWxlJykgc2V0IHN0eWxlKHZhbHVlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9KSB7XG4gICAgaWYgKCF0aGlzLl9zdHlsZURpZmZlcikge1xuICAgICAgdGhpcy5fc3R5bGVEaWZmZXIgPSBuZXcgU3R5bGluZ0RpZmZlcjx7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbD4oJ05nU3R5bGUnLCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1VuaXRzKTtcbiAgICB9XG4gICAgdGhpcy5fc3R5bGVEaWZmZXIuc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCduZ3JpZENlbGxDbGFzcycpIHNldCBrbGFzcyh2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPiB8IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSkge1xuICAgIGlmICghdGhpcy5fY2xhc3NEaWZmZXIpIHtcbiAgICAgIHRoaXMuX2NsYXNzRGlmZmVyID0gbmV3IFN0eWxpbmdEaWZmZXI8eyBba2xhc3M6IHN0cmluZ106IGJvb2xlYW4gfT4oXG4gICAgICAgICdOZ0NsYXNzJyxcbiAgICAgICAgU3R5bGluZ0RpZmZlck9wdGlvbnMuVHJpbVByb3BlcnRpZXMgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N1YktleXMgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N0cmluZ1ZhbHVlIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuRm9yY2VBc01hcCxcbiAgICAgICk7XG4gICAgfVxuICAgIHRoaXMuX2NsYXNzRGlmZmVyLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0eWxlRGlmZmVyOiBTdHlsaW5nRGlmZmVyPHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBudWxsPjtcbiAgcHJpdmF0ZSBfY2xhc3NEaWZmZXI6IFN0eWxpbmdEaWZmZXI8eyBba2xhc3M6IHN0cmluZ106IGJvb2xlYW4gfT47XG4gIHByaXZhdGUgX3BhcmVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2xhc3RTdHlsZSA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBwcml2YXRlIF9sYXN0Q2xhc3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PikgeyB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIHRoaXMudXBkYXRlUGFyZW50KCk7XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7IHRoaXMsdGhpcy51cGRhdGVQYXJlbnQoKTsgfVxuXG4gIHByaXZhdGUgdXBkYXRlUGFyZW50KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9wYXJlbnQpIHtcbiAgICAgIGlmICh0aGlzLl9zdHlsZURpZmZlciAmJiB0aGlzLl9zdHlsZURpZmZlci5oYXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgICBjb25zdCBsYXN0U3R5bGUgPSB0aGlzLl9sYXN0U3R5bGU7XG4gICAgICAgIHRoaXMuX2xhc3RTdHlsZSA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLl9zdHlsZURpZmZlci52YWx1ZSkpIHtcbiAgICAgICAgICB0aGlzLl9wYXJlbnQuc3R5bGVba2V5XSA9IHRoaXMuX3N0eWxlRGlmZmVyLnZhbHVlW2tleV07XG4gICAgICAgICAgbGFzdFN0eWxlLmRlbGV0ZShrZXkpO1xuICAgICAgICAgIHRoaXMuX2xhc3RTdHlsZS5hZGQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFN0eWxlLnNpemUgPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbGFzdFN0eWxlLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuc3R5bGVba2V5XSA9IG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9jbGFzc0RpZmZlciAmJiB0aGlzLl9jbGFzc0RpZmZlci5oYXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgICBjb25zdCBsYXN0Q2xhc3MgPSB0aGlzLl9sYXN0Q2xhc3M7XG4gICAgICAgIHRoaXMuX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLl9jbGFzc0RpZmZlci52YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodGhpcy5fY2xhc3NEaWZmZXIudmFsdWVba2V5XSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5hZGQoa2V5KTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RDbGFzcy5hZGQoa2V5KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFzdENsYXNzLmRlbGV0ZShrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0Q2xhc3Muc2l6ZSA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBsYXN0Q2xhc3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=