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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLyIsInNvdXJjZXMiOlsibGliL3RhYmxlL2RpcmVjdGl2ZXMvY2VsbC1zdHlsZS1jbGFzcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q3ZFLE1BQU0sT0FBTyxtQkFBbUI7Ozs7SUF5QjlCLFlBQW9CLEtBQThCO1FBQTlCLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBSDFDLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQy9CLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO0lBRWUsQ0FBQzs7Ozs7SUF2QnZELElBQTZCLEtBQUssQ0FBQyxLQUFnQztRQUNqRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksYUFBYSxDQUFnQyxTQUFTLHFCQUFrQyxDQUFDO1NBQ2xIO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxJQUE2QixLQUFLLENBQUMsS0FBaUU7UUFDbEcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGFBQWEsQ0FDbkMsU0FBUyxFQUNULDZDQUF1RSwyQkFBd0Msc0JBQWtDLENBQ2xKLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7SUFVRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7UUFDdEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7Ozs7SUFFRCxTQUFTLEtBQVcsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRXZDLFlBQVk7UUFDbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxFQUFFOztzQkFDdEQsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVO2dCQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7Z0JBQ3BDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdkQsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFCO2dCQUNELElBQUksU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUU7b0JBQ3RCLEtBQUssTUFBTSxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFO3dCQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQ2hDO2lCQUNGO2FBQ0Y7WUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsRUFBRTs7c0JBQ3RELFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVTtnQkFDakMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO2dCQUNwQyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdEQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUI7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNwQztvQkFDRCxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QjtnQkFDRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixLQUFLLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRTt3QkFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNwQztpQkFDRjthQUNGO1NBQ0Y7SUFDSCxDQUFDOzs7WUF2RUYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9DQUFvQyxFQUFFOzs7O1lBNUNsQyxVQUFVOzs7b0JBK0NsQyxLQUFLLFNBQUMsZ0JBQWdCO29CQU90QixLQUFLLFNBQUMsZ0JBQWdCOzs7Ozs7O0lBVXZCLDJDQUFtRTs7Ozs7SUFDbkUsMkNBQWtFOzs7OztJQUNsRSxzQ0FBNkI7Ozs7O0lBQzdCLHlDQUF1Qzs7Ozs7SUFDdkMseUNBQXVDOzs7OztJQUUzQixvQ0FBc0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdHlsaW5nRGlmZmVyLCBTdHlsaW5nRGlmZmVyT3B0aW9ucyB9IGZyb20gJy4vc3R5bGluZ19kaWZmZXInO1xuXG4vKlxuICAgIFdlJ3JlIHVzaW5nIGBTdHlsaW5nRGlmZmVyYCwgd2hpY2ggaXMgYW4gZXhhY3QgY29weSBvZiB0aGUgc3R5bGUgZGlmZmVyIHVzZWQgZm9yIGBuZ1N0eWxlYCBhbmQgYG5nQ2xhc3NgLlxuICAgIFRoZSBjbGFzcyBpcyBub3QgZXhwb3NlZCBzbyB3ZSB1c2UgYSBoYXJkLWNvcHkuXG4gICAgYFN0eWxpbmdEaWZmZXJgIGlzIHVzZWQgb25seSB3aGVuIElWWSBpcyBlbmFibGVkIGJ1dCBoZXJlIHdlJ3ZlIGFkb3B0ZWQgaXQgdG8gYmUgdXNlZCBpbiBib3RoIG1vZGVzLiAocHJlIElWWSBhbmQgSVZZKVxuKi9cblxuXG4vKipcbiAqIEJpbmQgdG8gdGhlIGNsYXNzIC8gc3R5bGUgYXR0cmlidXRlcyBvZiB0aGUgY29udGFpbmVyIG9mIGEgY2VsbCB0ZW1wbGF0ZS5cbiAqIEZvciBjbGFzcyBiaW5kaW5ncyB1c2UgW25ncmlkQ2VsbENsYXNzXSBhbmQgZm9yIHN0eWxlIGJpbmRpbmdzIHVzZSBbbmdyaWRDZWxsU3R5bGVdLlxuICpcbiAqIFRoaXMgaXMgbGlrZSBbbmdDbGFzc10gb3IgW25nU3R5bGVdIGJ1dCBub3QgZm9yIHRoZSBob3N0IG9mIHRoZSBkaXJlY3RpdmUgYnV0IHRvIGl0J3MgcGFyZW50LlxuICpcbiAqIC0gW25ncmlkQ2VsbENsYXNzXSBhY2NlcHRzIHRoZSBzYW1lIHR5cGUgb2YgdmFsdWVzIHRoYXQgW25nQ2xhc3NdIGRvZXMuXG4gKiAtIFtuZ3JpZENlbGxTdHlsZV0gYWNjZXB0cyB0aGUgc2FtZSB0eXBlIG9mIHZhbHVlcyB0aGF0IFtuZ1N0eWxlXSBkb2VzLlxuICpcbiAqICMjIEV4YW1wbGVcbiAqXG4gKiBXZSB3YW50IHRvIGNyZWF0ZSBhIG5ldyBjZWxsIHR5cGUgY2FsbGVkIFwiYmFsYW5jZVwiIHRoYXQgcmVwcmVzZW50cyB0aGUgYmFsYW5jZSBvZiBhIGJhbmsgYWNjb3VudC5cbiAqIFdlIGFsc28gd2FudCB0byBoYXZlIGRpZmZlcmVudCBiYWNrZ3JvdW5kIGNvbG9yLCBncmVlbiBpZiB0aGUgYWNjb3VudCBiYWxhbmNlIGlmIHBvc2l0aXZlIGFuZCByZWQgaWYgaXQncyBuZWdhdGl2ZS5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2ICpwYmxOZ3JpZENlbGxUeXBlRGVmPVwiJ2JhbGFuY2UnOyB2YWx1ZSBhcyB2YWx1ZVwiXG4gKiAgICAgIFtuZ0NsYXNzXT1cInZhbHVlIDwgMCA/ICdiYWxhbmNlLW5lZ2F0aXZlJyA6ICdiYWxhbmNlLXBvc2l0aXZlJ1wiPnt7IHZhbHVlICB9fVxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBUaGUgZXhhbXBsZSBhYm92ZSB3aWxsIHdvcmsgYnV0IHRoZSBiYWNrZ3JvdW5kIHdpbGwgbm90IGZpbGwgdGhlIGVudGlyZSBjZWxsLCBvbmx5IHRoZSBgZGl2YCBpdCBpcyBhcHBsaWVkIG9uLlxuICogVGhpcyBpcyBiZWNhdXNlIHRoZSBjb250YWluZXIgb2YgdGhlIGBkaXZgIGhhcyBpbnRlcm5hbCBzdHlsaW5nIHRoYXQgYXBwbHkgcGFkZGluZyAoYW1vbmcgb3RoZXIgc3R5bGVzKSB0byB0aGUgY2VsbC5cbiAqXG4gKiBUaGUgY29udGFpbmVyIGlzIGNvbnRyb2xsZWQgaW50ZXJuYWxseSBieSBuZ3JpZCwgYnV0IHlvdSBjYW4gYWNjZXNzIGl0J3Mgc3R5bGUgLyBjbGFzcyBhdHRyaWJ1dGVzIHVzaW5nIHRoaXMgZGlyZWN0aXZlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgKnBibE5ncmlkQ2VsbFR5cGVEZWY9XCInYmFsYW5jZSc7IHZhbHVlIGFzIHZhbHVlXCJcbiAqICAgICAgW25ncmlkQ2VsbENsYXNzXT1cInZhbHVlIDwgMCA/ICdiYWxhbmNlLW5lZ2F0aXZlJyA6ICdiYWxhbmNlLXBvc2l0aXZlJ1wiPnt7IHZhbHVlICB9fVxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiA+IEJlY2F1c2Ugc3R5bGUgLyBjbGFzcyBpcyBhcHBsaWVkIG9uIHRoZSBwYXJlbnQgYW5kIHRoZSBwYXJlbnQgY2FuIGhhdmUgbXVsdGlwbGUgY2hpbGRyZW4gaXQgaXMgcG9zc2libGUgdG8gYXBwbHkgdGhpcyBkaXJlY3RpdmVcbiAqIG9uIG11bHRpcGxlIGNoaWxkcmVuLCBkbyBub3QgZG8gdGhpcyBhcyBpdCB3aWxsIGhhdmUgdW5leHBlY3RlZCByZXN1bHRzLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmdyaWRDZWxsU3R5bGVdLCBbbmdyaWRDZWxsQ2xhc3NdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbFN0eWxpbmcge1xuXG4gIEBJbnB1dCgnbmdyaWRDZWxsU3R5bGUnKSBzZXQgc3R5bGUodmFsdWU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pIHtcbiAgICBpZiAoIXRoaXMuX3N0eWxlRGlmZmVyKSB7XG4gICAgICB0aGlzLl9zdHlsZURpZmZlciA9IG5ldyBTdHlsaW5nRGlmZmVyPHsgW2tleTogc3RyaW5nXTogYW55IH0gfCBudWxsPignTmdTdHlsZScsIFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93VW5pdHMpO1xuICAgIH1cbiAgICB0aGlzLl9zdHlsZURpZmZlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoJ25ncmlkQ2VsbENsYXNzJykgc2V0IGtsYXNzKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwgeyBba2xhc3M6IHN0cmluZ106IGFueSB9KSB7XG4gICAgaWYgKCF0aGlzLl9jbGFzc0RpZmZlcikge1xuICAgICAgdGhpcy5fY2xhc3NEaWZmZXIgPSBuZXcgU3R5bGluZ0RpZmZlcjx7IFtrbGFzczogc3RyaW5nXTogYm9vbGVhbiB9PihcbiAgICAgICAgJ05nQ2xhc3MnLFxuICAgICAgICBTdHlsaW5nRGlmZmVyT3B0aW9ucy5UcmltUHJvcGVydGllcyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3ViS2V5cyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3RyaW5nVmFsdWUgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5Gb3JjZUFzTWFwLFxuICAgICAgKTtcbiAgICB9XG4gICAgdGhpcy5fY2xhc3NEaWZmZXIuc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3R5bGVEaWZmZXI6IFN0eWxpbmdEaWZmZXI8eyBba2V5OiBzdHJpbmddOiBhbnkgfSB8IG51bGw+O1xuICBwcml2YXRlIF9jbGFzc0RpZmZlcjogU3R5bGluZ0RpZmZlcjx7IFtrbGFzczogc3RyaW5nXTogYm9vbGVhbiB9PjtcbiAgcHJpdmF0ZSBfcGFyZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfbGFzdFN0eWxlID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIHByaXZhdGUgX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7IH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcGFyZW50ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgdGhpcy51cGRhdGVQYXJlbnQoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHsgdGhpcyx0aGlzLnVwZGF0ZVBhcmVudCgpOyB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQYXJlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgaWYgKHRoaXMuX3N0eWxlRGlmZmVyICYmIHRoaXMuX3N0eWxlRGlmZmVyLmhhc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICAgIGNvbnN0IGxhc3RTdHlsZSA9IHRoaXMuX2xhc3RTdHlsZTtcbiAgICAgICAgdGhpcy5fbGFzdFN0eWxlID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuX3N0eWxlRGlmZmVyLnZhbHVlKSkge1xuICAgICAgICAgIHRoaXMuX3BhcmVudC5zdHlsZVtrZXldID0gdGhpcy5fc3R5bGVEaWZmZXIudmFsdWVba2V5XTtcbiAgICAgICAgICBsYXN0U3R5bGUuZGVsZXRlKGtleSk7XG4gICAgICAgICAgdGhpcy5fbGFzdFN0eWxlLmFkZChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U3R5bGUuc2l6ZSA+IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBsYXN0U3R5bGUudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5zdHlsZVtrZXldID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NsYXNzRGlmZmVyICYmIHRoaXMuX2NsYXNzRGlmZmVyLmhhc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICAgIGNvbnN0IGxhc3RDbGFzcyA9IHRoaXMuX2xhc3RDbGFzcztcbiAgICAgICAgdGhpcy5fbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlKSkge1xuICAgICAgICAgIGlmICh0aGlzLl9jbGFzc0RpZmZlci52YWx1ZVtrZXldKSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LmFkZChrZXkpO1xuICAgICAgICAgICAgdGhpcy5fbGFzdENsYXNzLmFkZChrZXkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYXN0Q2xhc3MuZGVsZXRlKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RDbGFzcy5zaXplID4gMCkge1xuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxhc3RDbGFzcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==