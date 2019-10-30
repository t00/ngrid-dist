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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvY2VsbC1zdHlsZS1jbGFzcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkN2RTtJQTBCRSw2QkFBb0IsS0FBOEI7UUFBOUIsVUFBSyxHQUFMLEtBQUssQ0FBeUI7UUFIMUMsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDL0IsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7SUFFZSxDQUFDO0lBdkJ2RCxzQkFBNkIsc0NBQUs7Ozs7O1FBQWxDLFVBQW1DLEtBQWdDO1lBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxDQUFnQyxTQUFTLHFCQUFrQyxDQUFDO2FBQ2xIO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBNkIsc0NBQUs7Ozs7O1FBQWxDLFVBQW1DLEtBQWlFO1lBQ2xHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxDQUNuQyxTQUFTLEVBQ1QsNkNBQXVFLDJCQUF3QyxzQkFBa0MsQ0FDbEosQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7Ozs7SUFVRCw2Q0FBZTs7O0lBQWY7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LFNBQUMsZ0JBQWdCO3dCQU90QixLQUFLLFNBQUMsZ0JBQWdCOztJQThEekIsMEJBQUM7Q0FBQSxBQXhFRCxJQXdFQztTQXZFWSxtQkFBbUI7Ozs7OztJQW1COUIsMkNBQW1FOzs7OztJQUNuRSwyQ0FBa0U7Ozs7O0lBQ2xFLHNDQUE2Qjs7Ozs7SUFDN0IseUNBQXVDOzs7OztJQUN2Qyx5Q0FBdUM7Ozs7O0lBRTNCLG9DQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0eWxpbmdEaWZmZXIsIFN0eWxpbmdEaWZmZXJPcHRpb25zIH0gZnJvbSAnLi9zdHlsaW5nX2RpZmZlcic7XG5cbi8qXG4gICAgV2UncmUgdXNpbmcgYFN0eWxpbmdEaWZmZXJgLCB3aGljaCBpcyBhbiBleGFjdCBjb3B5IG9mIHRoZSBzdHlsZSBkaWZmZXIgdXNlZCBmb3IgYG5nU3R5bGVgIGFuZCBgbmdDbGFzc2AuXG4gICAgVGhlIGNsYXNzIGlzIG5vdCBleHBvc2VkIHNvIHdlIHVzZSBhIGhhcmQtY29weS5cbiAgICBgU3R5bGluZ0RpZmZlcmAgaXMgdXNlZCBvbmx5IHdoZW4gSVZZIGlzIGVuYWJsZWQgYnV0IGhlcmUgd2UndmUgYWRvcHRlZCBpdCB0byBiZSB1c2VkIGluIGJvdGggbW9kZXMuIChwcmUgSVZZIGFuZCBJVlkpXG4qL1xuXG5cbi8qKlxuICogQmluZCB0byB0aGUgY2xhc3MgLyBzdHlsZSBhdHRyaWJ1dGVzIG9mIHRoZSBjb250YWluZXIgb2YgYSBjZWxsIHRlbXBsYXRlLlxuICogRm9yIGNsYXNzIGJpbmRpbmdzIHVzZSBbbmdyaWRDZWxsQ2xhc3NdIGFuZCBmb3Igc3R5bGUgYmluZGluZ3MgdXNlIFtuZ3JpZENlbGxTdHlsZV0uXG4gKlxuICogVGhpcyBpcyBsaWtlIFtuZ0NsYXNzXSBvciBbbmdTdHlsZV0gYnV0IG5vdCBmb3IgdGhlIGhvc3Qgb2YgdGhlIGRpcmVjdGl2ZSBidXQgdG8gaXQncyBwYXJlbnQuXG4gKlxuICogLSBbbmdyaWRDZWxsQ2xhc3NdIGFjY2VwdHMgdGhlIHNhbWUgdHlwZSBvZiB2YWx1ZXMgdGhhdCBbbmdDbGFzc10gZG9lcy5cbiAqIC0gW25ncmlkQ2VsbFN0eWxlXSBhY2NlcHRzIHRoZSBzYW1lIHR5cGUgb2YgdmFsdWVzIHRoYXQgW25nU3R5bGVdIGRvZXMuXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIFdlIHdhbnQgdG8gY3JlYXRlIGEgbmV3IGNlbGwgdHlwZSBjYWxsZWQgXCJiYWxhbmNlXCIgdGhhdCByZXByZXNlbnRzIHRoZSBiYWxhbmNlIG9mIGEgYmFuayBhY2NvdW50LlxuICogV2UgYWxzbyB3YW50IHRvIGhhdmUgZGlmZmVyZW50IGJhY2tncm91bmQgY29sb3IsIGdyZWVuIGlmIHRoZSBhY2NvdW50IGJhbGFuY2UgaWYgcG9zaXRpdmUgYW5kIHJlZCBpZiBpdCdzIG5lZ2F0aXZlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkQ2VsbFR5cGVEZWY9XCInYmFsYW5jZSc7IHZhbHVlIGFzIHZhbHVlXCJcbiAqICAgICAgW25nQ2xhc3NdPVwidmFsdWUgPCAwID8gJ2JhbGFuY2UtbmVnYXRpdmUnIDogJ2JhbGFuY2UtcG9zaXRpdmUnXCI+e3sgdmFsdWUgIH19XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqIFRoZSBleGFtcGxlIGFib3ZlIHdpbGwgd29yayBidXQgdGhlIGJhY2tncm91bmQgd2lsbCBub3QgZmlsbCB0aGUgZW50aXJlIGNlbGwsIG9ubHkgdGhlIGBkaXZgIGl0IGlzIGFwcGxpZWQgb24uXG4gKiBUaGlzIGlzIGJlY2F1c2UgdGhlIGNvbnRhaW5lciBvZiB0aGUgYGRpdmAgaGFzIGludGVybmFsIHN0eWxpbmcgdGhhdCBhcHBseSBwYWRkaW5nIChhbW9uZyBvdGhlciBzdHlsZXMpIHRvIHRoZSBjZWxsLlxuICpcbiAqIFRoZSBjb250YWluZXIgaXMgY29udHJvbGxlZCBpbnRlcm5hbGx5IGJ5IG5ncmlkLCBidXQgeW91IGNhbiBhY2Nlc3MgaXQncyBzdHlsZSAvIGNsYXNzIGF0dHJpYnV0ZXMgdXNpbmcgdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqcGJsTmdyaWRDZWxsVHlwZURlZj1cIidiYWxhbmNlJzsgdmFsdWUgYXMgdmFsdWVcIlxuICogICAgICBbbmdyaWRDZWxsQ2xhc3NdPVwidmFsdWUgPCAwID8gJ2JhbGFuY2UtbmVnYXRpdmUnIDogJ2JhbGFuY2UtcG9zaXRpdmUnXCI+e3sgdmFsdWUgIH19XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqID4gQmVjYXVzZSBzdHlsZSAvIGNsYXNzIGlzIGFwcGxpZWQgb24gdGhlIHBhcmVudCBhbmQgdGhlIHBhcmVudCBjYW4gaGF2ZSBtdWx0aXBsZSBjaGlsZHJlbiBpdCBpcyBwb3NzaWJsZSB0byBhcHBseSB0aGlzIGRpcmVjdGl2ZVxuICogb24gbXVsdGlwbGUgY2hpbGRyZW4sIGRvIG5vdCBkbyB0aGlzIGFzIGl0IHdpbGwgaGF2ZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3JpZENlbGxTdHlsZV0sIFtuZ3JpZENlbGxDbGFzc10nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsU3R5bGluZyB7XG5cbiAgQElucHV0KCduZ3JpZENlbGxTdHlsZScpIHNldCBzdHlsZSh2YWx1ZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGlmICghdGhpcy5fc3R5bGVEaWZmZXIpIHtcbiAgICAgIHRoaXMuX3N0eWxlRGlmZmVyID0gbmV3IFN0eWxpbmdEaWZmZXI8eyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGw+KCdOZ1N0eWxlJywgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dVbml0cyk7XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlRGlmZmVyLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgnbmdyaWRDZWxsQ2xhc3MnKSBzZXQga2xhc3ModmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrbGFzczogc3RyaW5nXTogYW55IH0pIHtcbiAgICBpZiAoIXRoaXMuX2NsYXNzRGlmZmVyKSB7XG4gICAgICB0aGlzLl9jbGFzc0RpZmZlciA9IG5ldyBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+KFxuICAgICAgICAnTmdDbGFzcycsXG4gICAgICAgIFN0eWxpbmdEaWZmZXJPcHRpb25zLlRyaW1Qcm9wZXJ0aWVzIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdWJLZXlzIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdHJpbmdWYWx1ZSB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkZvcmNlQXNNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLl9jbGFzc0RpZmZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdHlsZURpZmZlcjogU3R5bGluZ0RpZmZlcjx7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbD47XG4gIHByaXZhdGUgX2NsYXNzRGlmZmVyOiBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9sYXN0U3R5bGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBfbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB0aGlzLnVwZGF0ZVBhcmVudCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQgeyB0aGlzLHRoaXMudXBkYXRlUGFyZW50KCk7IH1cblxuICBwcml2YXRlIHVwZGF0ZVBhcmVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICBpZiAodGhpcy5fc3R5bGVEaWZmZXIgJiYgdGhpcy5fc3R5bGVEaWZmZXIuaGFzVmFsdWVDaGFuZ2VkKCkpIHtcbiAgICAgICAgY29uc3QgbGFzdFN0eWxlID0gdGhpcy5fbGFzdFN0eWxlO1xuICAgICAgICB0aGlzLl9sYXN0U3R5bGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5fc3R5bGVEaWZmZXIudmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50LnN0eWxlW2tleV0gPSB0aGlzLl9zdHlsZURpZmZlci52YWx1ZVtrZXldO1xuICAgICAgICAgIGxhc3RTdHlsZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICB0aGlzLl9sYXN0U3R5bGUuYWRkKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdHlsZS5zaXplID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxhc3RTdHlsZS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LnN0eWxlW2tleV0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY2xhc3NEaWZmZXIgJiYgdGhpcy5fY2xhc3NEaWZmZXIuaGFzVmFsdWVDaGFuZ2VkKCkpIHtcbiAgICAgICAgY29uc3QgbGFzdENsYXNzID0gdGhpcy5fbGFzdENsYXNzO1xuICAgICAgICB0aGlzLl9sYXN0Q2xhc3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5fY2xhc3NEaWZmZXIudmFsdWUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKGtleSk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MuYWRkKGtleSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhc3RDbGFzcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdENsYXNzLnNpemUgPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbGFzdENsYXNzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19