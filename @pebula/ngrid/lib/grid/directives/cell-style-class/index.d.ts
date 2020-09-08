import { ElementRef } from '@angular/core';
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
import * as ɵngcc0 from '@angular/core';
export declare class PblNgridCellStyling {
    private elRef;
    set style(value: {
        [key: string]: string;
    });
    set klass(value: string | string[] | Set<string> | {
        [klass: string]: any;
    });
    private _styleDiffer;
    private _classDiffer;
    private _parent;
    private _lastStyle;
    private _lastClass;
    constructor(elRef: ElementRef<HTMLElement>);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    private updateParent;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<PblNgridCellStyling, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<PblNgridCellStyling, "[ngridCellStyle], [ngridCellClass]", never, { "style": "ngridCellStyle"; "klass": "ngridCellClass"; }, {}, never>;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZC50cyIsInNvdXJjZXMiOlsiaW5kZXguZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG4vKipcclxuICogQmluZCB0byB0aGUgY2xhc3MgLyBzdHlsZSBhdHRyaWJ1dGVzIG9mIHRoZSBjb250YWluZXIgb2YgYSBjZWxsIHRlbXBsYXRlLlxyXG4gKiBGb3IgY2xhc3MgYmluZGluZ3MgdXNlIFtuZ3JpZENlbGxDbGFzc10gYW5kIGZvciBzdHlsZSBiaW5kaW5ncyB1c2UgW25ncmlkQ2VsbFN0eWxlXS5cclxuICpcclxuICogVGhpcyBpcyBsaWtlIFtuZ0NsYXNzXSBvciBbbmdTdHlsZV0gYnV0IG5vdCBmb3IgdGhlIGhvc3Qgb2YgdGhlIGRpcmVjdGl2ZSBidXQgdG8gaXQncyBwYXJlbnQuXHJcbiAqXHJcbiAqIC0gW25ncmlkQ2VsbENsYXNzXSBhY2NlcHRzIHRoZSBzYW1lIHR5cGUgb2YgdmFsdWVzIHRoYXQgW25nQ2xhc3NdIGRvZXMuXHJcbiAqIC0gW25ncmlkQ2VsbFN0eWxlXSBhY2NlcHRzIHRoZSBzYW1lIHR5cGUgb2YgdmFsdWVzIHRoYXQgW25nU3R5bGVdIGRvZXMuXHJcbiAqXHJcbiAqICMjIEV4YW1wbGVcclxuICpcclxuICogV2Ugd2FudCB0byBjcmVhdGUgYSBuZXcgY2VsbCB0eXBlIGNhbGxlZCBcImJhbGFuY2VcIiB0aGF0IHJlcHJlc2VudHMgdGhlIGJhbGFuY2Ugb2YgYSBiYW5rIGFjY291bnQuXHJcbiAqIFdlIGFsc28gd2FudCB0byBoYXZlIGRpZmZlcmVudCBiYWNrZ3JvdW5kIGNvbG9yLCBncmVlbiBpZiB0aGUgYWNjb3VudCBiYWxhbmNlIGlmIHBvc2l0aXZlIGFuZCByZWQgaWYgaXQncyBuZWdhdGl2ZS5cclxuICpcclxuICogYGBgaHRtbFxyXG4gKiA8ZGl2ICpwYmxOZ3JpZENlbGxUeXBlRGVmPVwiJ2JhbGFuY2UnOyB2YWx1ZSBhcyB2YWx1ZVwiXHJcbiAqICAgICAgW25nQ2xhc3NdPVwidmFsdWUgPCAwID8gJ2JhbGFuY2UtbmVnYXRpdmUnIDogJ2JhbGFuY2UtcG9zaXRpdmUnXCI+e3sgdmFsdWUgIH19XHJcbiAqIDwvZGl2PlxyXG4gKiBgYGBcclxuICpcclxuICogVGhlIGV4YW1wbGUgYWJvdmUgd2lsbCB3b3JrIGJ1dCB0aGUgYmFja2dyb3VuZCB3aWxsIG5vdCBmaWxsIHRoZSBlbnRpcmUgY2VsbCwgb25seSB0aGUgYGRpdmAgaXQgaXMgYXBwbGllZCBvbi5cclxuICogVGhpcyBpcyBiZWNhdXNlIHRoZSBjb250YWluZXIgb2YgdGhlIGBkaXZgIGhhcyBpbnRlcm5hbCBzdHlsaW5nIHRoYXQgYXBwbHkgcGFkZGluZyAoYW1vbmcgb3RoZXIgc3R5bGVzKSB0byB0aGUgY2VsbC5cclxuICpcclxuICogVGhlIGNvbnRhaW5lciBpcyBjb250cm9sbGVkIGludGVybmFsbHkgYnkgbmdyaWQsIGJ1dCB5b3UgY2FuIGFjY2VzcyBpdCdzIHN0eWxlIC8gY2xhc3MgYXR0cmlidXRlcyB1c2luZyB0aGlzIGRpcmVjdGl2ZS5cclxuICpcclxuICogYGBgaHRtbFxyXG4gKiA8ZGl2ICpwYmxOZ3JpZENlbGxUeXBlRGVmPVwiJ2JhbGFuY2UnOyB2YWx1ZSBhcyB2YWx1ZVwiXHJcbiAqICAgICAgW25ncmlkQ2VsbENsYXNzXT1cInZhbHVlIDwgMCA/ICdiYWxhbmNlLW5lZ2F0aXZlJyA6ICdiYWxhbmNlLXBvc2l0aXZlJ1wiPnt7IHZhbHVlICB9fVxyXG4gKiA8L2Rpdj5cclxuICogYGBgXHJcbiAqXHJcbiAqID4gQmVjYXVzZSBzdHlsZSAvIGNsYXNzIGlzIGFwcGxpZWQgb24gdGhlIHBhcmVudCBhbmQgdGhlIHBhcmVudCBjYW4gaGF2ZSBtdWx0aXBsZSBjaGlsZHJlbiBpdCBpcyBwb3NzaWJsZSB0byBhcHBseSB0aGlzIGRpcmVjdGl2ZVxyXG4gKiBvbiBtdWx0aXBsZSBjaGlsZHJlbiwgZG8gbm90IGRvIHRoaXMgYXMgaXQgd2lsbCBoYXZlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cclxuICovXHJcbmV4cG9ydCBkZWNsYXJlIGNsYXNzIFBibE5ncmlkQ2VsbFN0eWxpbmcge1xyXG4gICAgcHJpdmF0ZSBlbFJlZjtcclxuICAgIHNldCBzdHlsZSh2YWx1ZToge1xyXG4gICAgICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcclxuICAgIH0pO1xyXG4gICAgc2V0IGtsYXNzKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+IHwge1xyXG4gICAgICAgIFtrbGFzczogc3RyaW5nXTogYW55O1xyXG4gICAgfSk7XHJcbiAgICBwcml2YXRlIF9zdHlsZURpZmZlcjtcclxuICAgIHByaXZhdGUgX2NsYXNzRGlmZmVyO1xyXG4gICAgcHJpdmF0ZSBfcGFyZW50O1xyXG4gICAgcHJpdmF0ZSBfbGFzdFN0eWxlO1xyXG4gICAgcHJpdmF0ZSBfbGFzdENsYXNzO1xyXG4gICAgY29uc3RydWN0b3IoZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KTtcclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkO1xyXG4gICAgbmdEb0NoZWNrKCk6IHZvaWQ7XHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhcmVudDtcclxufVxyXG4iXX0=