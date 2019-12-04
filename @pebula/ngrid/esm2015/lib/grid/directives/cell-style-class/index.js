/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class PblNgridCellStyling {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this._lastStyle = new Set();
        this._lastClass = new Set();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set style(value) {
        if (!this._styleDiffer) {
            this._styleDiffer = new StylingDiffer('NgStyle', 8 /* AllowUnits */);
        }
        this._styleDiffer.setValue(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set klass(value) {
        if (!this._classDiffer) {
            this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
        }
        this._classDiffer.setValue(value);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._parent = this.elRef.nativeElement.parentElement;
        this.updateParent();
    }
    /**
     * @return {?}
     */
    ngDoCheck() { this, this.updateParent(); }
    /**
     * @private
     * @return {?}
     */
    updateParent() {
        if (this._parent) {
            if (this._styleDiffer && this._styleDiffer.hasValueChanged()) {
                /** @type {?} */
                const lastStyle = this._lastStyle;
                this._lastStyle = new Set();
                for (const key of Object.keys(this._styleDiffer.value)) {
                    this._parent.style[key] = this._styleDiffer.value[key];
                    lastStyle.delete(key);
                    this._lastStyle.add(key);
                }
                if (lastStyle.size > 0) {
                    for (const key of lastStyle.values()) {
                        this._parent.style[key] = null;
                    }
                }
            }
            if (this._classDiffer && this._classDiffer.hasValueChanged()) {
                /** @type {?} */
                const lastClass = this._lastClass;
                this._lastClass = new Set();
                for (const key of Object.keys(this._classDiffer.value)) {
                    if (this._classDiffer.value[key]) {
                        this._parent.classList.add(key);
                        this._lastClass.add(key);
                    }
                    else {
                        this._parent.classList.remove(key);
                    }
                    lastClass.delete(key);
                }
                if (lastClass.size > 0) {
                    for (const key of lastClass.values()) {
                        this._parent.classList.remove(key);
                    }
                }
            }
        }
    }
}
PblNgridCellStyling.decorators = [
    { type: Directive, args: [{ selector: '[ngridCellStyle], [ngridCellClass]' },] }
];
/** @nocollapse */
PblNgridCellStyling.ctorParameters = () => [
    { type: ElementRef }
];
PblNgridCellStyling.propDecorators = {
    style: [{ type: Input, args: ['ngridCellStyle',] }],
    klass: [{ type: Input, args: ['ngridCellClass',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL2dyaWQvZGlyZWN0aXZlcy9jZWxsLXN0eWxlLWNsYXNzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRDdkUsTUFBTSxPQUFPLG1CQUFtQjs7OztJQXlCOUIsWUFBb0IsS0FBOEI7UUFBOUIsVUFBSyxHQUFMLEtBQUssQ0FBeUI7UUFIMUMsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFDL0IsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7SUFFZSxDQUFDOzs7OztJQXZCdkQsSUFBNkIsS0FBSyxDQUFDLEtBQWdDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxhQUFhLENBQWdDLFNBQVMscUJBQWtDLENBQUM7U0FDbEg7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELElBQTZCLEtBQUssQ0FBQyxLQUFpRTtRQUNsRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxDQUNuQyxTQUFTLEVBQ1QsNkNBQXVFLDJCQUF3QyxzQkFBa0MsQ0FDbEosQ0FBQztTQUNIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7OztJQVVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUN0RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7OztJQUVELFNBQVMsS0FBVyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFdkMsWUFBWTtRQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLEVBQUU7O3NCQUN0RCxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVU7Z0JBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztnQkFDcEMsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3RELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN2RCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUI7Z0JBQ0QsSUFBSSxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRTtvQkFDdEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLEVBQUU7d0JBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztxQkFDaEM7aUJBQ0Y7YUFDRjtZQUVELElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxFQUFFOztzQkFDdEQsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7Z0JBQ3BDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUMxQjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3BDO29CQUNELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZCO2dCQUNELElBQUksU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLEtBQUssTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ3BDO2lCQUNGO2FBQ0Y7U0FDRjtJQUNILENBQUM7OztZQXZFRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUU7Ozs7WUE1Q2xDLFVBQVU7OztvQkErQ2xDLEtBQUssU0FBQyxnQkFBZ0I7b0JBT3RCLEtBQUssU0FBQyxnQkFBZ0I7Ozs7Ozs7SUFVdkIsMkNBQW1FOzs7OztJQUNuRSwyQ0FBa0U7Ozs7O0lBQ2xFLHNDQUE2Qjs7Ozs7SUFDN0IseUNBQXVDOzs7OztJQUN2Qyx5Q0FBdUM7Ozs7O0lBRTNCLG9DQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0eWxpbmdEaWZmZXIsIFN0eWxpbmdEaWZmZXJPcHRpb25zIH0gZnJvbSAnLi9zdHlsaW5nX2RpZmZlcic7XG5cbi8qXG4gICAgV2UncmUgdXNpbmcgYFN0eWxpbmdEaWZmZXJgLCB3aGljaCBpcyBhbiBleGFjdCBjb3B5IG9mIHRoZSBzdHlsZSBkaWZmZXIgdXNlZCBmb3IgYG5nU3R5bGVgIGFuZCBgbmdDbGFzc2AuXG4gICAgVGhlIGNsYXNzIGlzIG5vdCBleHBvc2VkIHNvIHdlIHVzZSBhIGhhcmQtY29weS5cbiAgICBgU3R5bGluZ0RpZmZlcmAgaXMgdXNlZCBvbmx5IHdoZW4gSVZZIGlzIGVuYWJsZWQgYnV0IGhlcmUgd2UndmUgYWRvcHRlZCBpdCB0byBiZSB1c2VkIGluIGJvdGggbW9kZXMuIChwcmUgSVZZIGFuZCBJVlkpXG4qL1xuXG5cbi8qKlxuICogQmluZCB0byB0aGUgY2xhc3MgLyBzdHlsZSBhdHRyaWJ1dGVzIG9mIHRoZSBjb250YWluZXIgb2YgYSBjZWxsIHRlbXBsYXRlLlxuICogRm9yIGNsYXNzIGJpbmRpbmdzIHVzZSBbbmdyaWRDZWxsQ2xhc3NdIGFuZCBmb3Igc3R5bGUgYmluZGluZ3MgdXNlIFtuZ3JpZENlbGxTdHlsZV0uXG4gKlxuICogVGhpcyBpcyBsaWtlIFtuZ0NsYXNzXSBvciBbbmdTdHlsZV0gYnV0IG5vdCBmb3IgdGhlIGhvc3Qgb2YgdGhlIGRpcmVjdGl2ZSBidXQgdG8gaXQncyBwYXJlbnQuXG4gKlxuICogLSBbbmdyaWRDZWxsQ2xhc3NdIGFjY2VwdHMgdGhlIHNhbWUgdHlwZSBvZiB2YWx1ZXMgdGhhdCBbbmdDbGFzc10gZG9lcy5cbiAqIC0gW25ncmlkQ2VsbFN0eWxlXSBhY2NlcHRzIHRoZSBzYW1lIHR5cGUgb2YgdmFsdWVzIHRoYXQgW25nU3R5bGVdIGRvZXMuXG4gKlxuICogIyMgRXhhbXBsZVxuICpcbiAqIFdlIHdhbnQgdG8gY3JlYXRlIGEgbmV3IGNlbGwgdHlwZSBjYWxsZWQgXCJiYWxhbmNlXCIgdGhhdCByZXByZXNlbnRzIHRoZSBiYWxhbmNlIG9mIGEgYmFuayBhY2NvdW50LlxuICogV2UgYWxzbyB3YW50IHRvIGhhdmUgZGlmZmVyZW50IGJhY2tncm91bmQgY29sb3IsIGdyZWVuIGlmIHRoZSBhY2NvdW50IGJhbGFuY2UgaWYgcG9zaXRpdmUgYW5kIHJlZCBpZiBpdCdzIG5lZ2F0aXZlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkQ2VsbFR5cGVEZWY9XCInYmFsYW5jZSc7IHZhbHVlIGFzIHZhbHVlXCJcbiAqICAgICAgW25nQ2xhc3NdPVwidmFsdWUgPCAwID8gJ2JhbGFuY2UtbmVnYXRpdmUnIDogJ2JhbGFuY2UtcG9zaXRpdmUnXCI+e3sgdmFsdWUgIH19XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqIFRoZSBleGFtcGxlIGFib3ZlIHdpbGwgd29yayBidXQgdGhlIGJhY2tncm91bmQgd2lsbCBub3QgZmlsbCB0aGUgZW50aXJlIGNlbGwsIG9ubHkgdGhlIGBkaXZgIGl0IGlzIGFwcGxpZWQgb24uXG4gKiBUaGlzIGlzIGJlY2F1c2UgdGhlIGNvbnRhaW5lciBvZiB0aGUgYGRpdmAgaGFzIGludGVybmFsIHN0eWxpbmcgdGhhdCBhcHBseSBwYWRkaW5nIChhbW9uZyBvdGhlciBzdHlsZXMpIHRvIHRoZSBjZWxsLlxuICpcbiAqIFRoZSBjb250YWluZXIgaXMgY29udHJvbGxlZCBpbnRlcm5hbGx5IGJ5IG5ncmlkLCBidXQgeW91IGNhbiBhY2Nlc3MgaXQncyBzdHlsZSAvIGNsYXNzIGF0dHJpYnV0ZXMgdXNpbmcgdGhpcyBkaXJlY3RpdmUuXG4gKlxuICogYGBgaHRtbFxuICogPGRpdiAqcGJsTmdyaWRDZWxsVHlwZURlZj1cIidiYWxhbmNlJzsgdmFsdWUgYXMgdmFsdWVcIlxuICogICAgICBbbmdyaWRDZWxsQ2xhc3NdPVwidmFsdWUgPCAwID8gJ2JhbGFuY2UtbmVnYXRpdmUnIDogJ2JhbGFuY2UtcG9zaXRpdmUnXCI+e3sgdmFsdWUgIH19XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICpcbiAqID4gQmVjYXVzZSBzdHlsZSAvIGNsYXNzIGlzIGFwcGxpZWQgb24gdGhlIHBhcmVudCBhbmQgdGhlIHBhcmVudCBjYW4gaGF2ZSBtdWx0aXBsZSBjaGlsZHJlbiBpdCBpcyBwb3NzaWJsZSB0byBhcHBseSB0aGlzIGRpcmVjdGl2ZVxuICogb24gbXVsdGlwbGUgY2hpbGRyZW4sIGRvIG5vdCBkbyB0aGlzIGFzIGl0IHdpbGwgaGF2ZSB1bmV4cGVjdGVkIHJlc3VsdHMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tuZ3JpZENlbGxTdHlsZV0sIFtuZ3JpZENlbGxDbGFzc10nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsU3R5bGluZyB7XG5cbiAgQElucHV0KCduZ3JpZENlbGxTdHlsZScpIHNldCBzdHlsZSh2YWx1ZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSkge1xuICAgIGlmICghdGhpcy5fc3R5bGVEaWZmZXIpIHtcbiAgICAgIHRoaXMuX3N0eWxlRGlmZmVyID0gbmV3IFN0eWxpbmdEaWZmZXI8eyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGw+KCdOZ1N0eWxlJywgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dVbml0cyk7XG4gICAgfVxuICAgIHRoaXMuX3N0eWxlRGlmZmVyLnNldFZhbHVlKHZhbHVlKTtcbiAgfVxuXG4gIEBJbnB1dCgnbmdyaWRDZWxsQ2xhc3MnKSBzZXQga2xhc3ModmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4gfCB7IFtrbGFzczogc3RyaW5nXTogYW55IH0pIHtcbiAgICBpZiAoIXRoaXMuX2NsYXNzRGlmZmVyKSB7XG4gICAgICB0aGlzLl9jbGFzc0RpZmZlciA9IG5ldyBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+KFxuICAgICAgICAnTmdDbGFzcycsXG4gICAgICAgIFN0eWxpbmdEaWZmZXJPcHRpb25zLlRyaW1Qcm9wZXJ0aWVzIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdWJLZXlzIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdHJpbmdWYWx1ZSB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkZvcmNlQXNNYXAsXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLl9jbGFzc0RpZmZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zdHlsZURpZmZlcjogU3R5bGluZ0RpZmZlcjx7IFtrZXk6IHN0cmluZ106IGFueSB9IHwgbnVsbD47XG4gIHByaXZhdGUgX2NsYXNzRGlmZmVyOiBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+O1xuICBwcml2YXRlIF9wYXJlbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9sYXN0U3R5bGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBfbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHsgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB0aGlzLnVwZGF0ZVBhcmVudCgpO1xuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQgeyB0aGlzLHRoaXMudXBkYXRlUGFyZW50KCk7IH1cblxuICBwcml2YXRlIHVwZGF0ZVBhcmVudCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcGFyZW50KSB7XG4gICAgICBpZiAodGhpcy5fc3R5bGVEaWZmZXIgJiYgdGhpcy5fc3R5bGVEaWZmZXIuaGFzVmFsdWVDaGFuZ2VkKCkpIHtcbiAgICAgICAgY29uc3QgbGFzdFN0eWxlID0gdGhpcy5fbGFzdFN0eWxlO1xuICAgICAgICB0aGlzLl9sYXN0U3R5bGUgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5fc3R5bGVEaWZmZXIudmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5fcGFyZW50LnN0eWxlW2tleV0gPSB0aGlzLl9zdHlsZURpZmZlci52YWx1ZVtrZXldO1xuICAgICAgICAgIGxhc3RTdHlsZS5kZWxldGUoa2V5KTtcbiAgICAgICAgICB0aGlzLl9sYXN0U3R5bGUuYWRkKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTdHlsZS5zaXplID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxhc3RTdHlsZS52YWx1ZXMoKSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LnN0eWxlW2tleV0gPSBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY2xhc3NEaWZmZXIgJiYgdGhpcy5fY2xhc3NEaWZmZXIuaGFzVmFsdWVDaGFuZ2VkKCkpIHtcbiAgICAgICAgY29uc3QgbGFzdENsYXNzID0gdGhpcy5fbGFzdENsYXNzO1xuICAgICAgICB0aGlzLl9sYXN0Q2xhc3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5fY2xhc3NEaWZmZXIudmFsdWUpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QuYWRkKGtleSk7XG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MuYWRkKGtleSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhc3RDbGFzcy5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdENsYXNzLnNpemUgPiAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbGFzdENsYXNzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19