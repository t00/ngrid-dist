/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * A service for copying text to the clipboard.
 *
 * Example usage:
 *
 * clipboard.copy("copy this text");
 */
export class Clipboard {
    /**
     * @param {?} document
     */
    constructor(document) {
        this._document = document;
    }
    /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    copy(text) {
        /** @type {?} */
        const pendingCopy = this.beginCopy(text);
        /** @type {?} */
        const successful = pendingCopy.copy();
        pendingCopy.destroy();
        return successful;
    }
    /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    beginCopy(text) {
        return new PendingCopy(text, this._document);
    }
}
Clipboard.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
Clipboard.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/** @nocollapse */ Clipboard.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(i0.ɵɵinject(i1.DOCUMENT)); }, token: Clipboard, providedIn: "root" });
if (false) {
    /**
     * @type {?}
     * @private
     */
    Clipboard.prototype._document;
}
/**
 * A pending copy-to-clipboard operation.
 *
 * The implementation of copying text to the clipboard modifies the DOM and
 * forces a relayout. This relayout can take too long if the string is large,
 * causing the execCommand('copy') to happen too long after the user clicked.
 * This results in the browser refusing to copy. This object lets the
 * relayout happen in a separate tick from copying by providing a copy function
 * that can be called later.
 *
 * Destroy must be called when no longer in use, regardless of whether `copy` is
 * called.
 */
export class PendingCopy {
    /**
     * @param {?} text
     * @param {?} _document
     */
    constructor(text, _document) {
        this._document = _document;
        /** @type {?} */
        const textarea = this._textarea = this._document.createElement('textarea');
        // Hide the element for display and accessibility.
        textarea.setAttribute('style', 'opacity: 0;');
        textarea.setAttribute('aria-hidden', 'true');
        textarea.value = text;
        this._document.body.appendChild(textarea);
    }
    /**
     * Finishes copying the text.
     * @return {?}
     */
    copy() {
        /** @type {?} */
        const textarea = this._textarea;
        /** @type {?} */
        let successful = false;
        try { // Older browsers could throw if copy is not supported.
            if (textarea) {
                /** @type {?} */
                const currentFocus = document.activeElement;
                textarea.select();
                successful = this._document.execCommand('copy');
                if (currentFocus instanceof HTMLElement) {
                    currentFocus.focus();
                }
            }
        }
        catch (_a) {
            // Discard error.
            // Initial setting of {@code successful} will represent failure here.
        }
        return successful;
    }
    /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    destroy() {
        if (this._textarea) {
            this._document.body.removeChild(this._textarea);
            this._textarea = undefined;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PendingCopy.prototype._textarea;
    /**
     * @type {?}
     * @private
     */
    PendingCopy.prototype._document;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2NsaXBib2FyZC8iLCJzb3VyY2VzIjpbImxpYi9jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQVVqRCxNQUFNLE9BQU8sU0FBUzs7OztJQUduQixZQUE4QixRQUFhO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7Ozs7Ozs7SUFRRCxJQUFJLENBQUMsSUFBWTs7Y0FDVCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7O2NBQ2xDLFVBQVUsR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3JDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVyQixPQUFPLFVBQVUsQ0FBQztJQUNyQixDQUFDOzs7Ozs7Ozs7O0lBV0QsU0FBUyxDQUFDLElBQVk7UUFDcEIsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7OztZQWpDRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7OzRDQUloQixNQUFNLFNBQUMsUUFBUTs7Ozs7Ozs7SUFGN0IsOEJBQTRCOzs7Ozs7Ozs7Ozs7Ozs7QUErQzlCLE1BQU0sT0FBTyxXQUFXOzs7OztJQUdyQixZQUFZLElBQVksRUFBbUIsU0FBbUI7UUFBbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTs7Y0FDdkQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBRXpFLGtEQUFrRDtRQUNuRCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7SUFHRCxJQUFJOztjQUNJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUzs7WUFDM0IsVUFBVSxHQUFHLEtBQUs7UUFFckIsSUFBSSxFQUFHLHVEQUF1RDtZQUM3RCxJQUFJLFFBQVEsRUFBRTs7c0JBQ04sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhO2dCQUUxQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFL0MsSUFBSSxZQUFZLFlBQVksV0FBVyxFQUFFO29CQUN4QyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ3RCO2FBQ0Y7U0FDRjtRQUFDLFdBQU07WUFDTixpQkFBaUI7WUFDakIscUVBQXFFO1NBQ3RFO1FBRUEsT0FBTyxVQUFVLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFHRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDNUI7SUFDSCxDQUFDO0NBQ0Y7Ozs7OztJQTVDQyxnQ0FBaUQ7Ozs7O0lBRXRCLGdDQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4gLyoqXG4gKiBBIHNlcnZpY2UgZm9yIGNvcHlpbmcgdGV4dCB0byB0aGUgY2xpcGJvYXJkLlxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogY2xpcGJvYXJkLmNvcHkoXCJjb3B5IHRoaXMgdGV4dFwiKTtcbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQ2xpcGJvYXJkIHtcbiAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuXG4gICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBkb2N1bWVudDogYW55KSB7XG4gICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgfVxuXG4gICAvKipcbiAgICogQ29waWVzIHRoZSBwcm92aWRlZCB0ZXh0IGludG8gdGhlIHVzZXIncyBjbGlwYm9hcmQuXG4gICAqXG4gICAqIEBwYXJhbSB0ZXh0IFRoZSBzdHJpbmcgdG8gY29weS5cbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgb3BlcmF0aW9uIHdhcyBzdWNjZXNzZnVsLlxuICAgKi9cbiAgY29weSh0ZXh0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBwZW5kaW5nQ29weSA9IHRoaXMuYmVnaW5Db3B5KHRleHQpO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBwZW5kaW5nQ29weS5jb3B5KCk7XG4gICAgcGVuZGluZ0NvcHkuZGVzdHJveSgpO1xuXG4gICAgIHJldHVybiBzdWNjZXNzZnVsO1xuICB9XG5cbiAgIC8qKlxuICAgKiBQcmVwYXJlcyBhIHN0cmluZyB0byBiZSBjb3BpZWQgbGF0ZXIuIFRoaXMgaXMgdXNlZnVsIGZvciBsYXJnZSBzdHJpbmdzXG4gICAqIHdoaWNoIHRha2UgdG9vIGxvbmcgdG8gc3VjY2Vzc2Z1bGx5IHJlbmRlciBhbmQgYmUgY29waWVkIGluIHRoZSBzYW1lIHRpY2suXG4gICAqXG4gICAqIFRoZSBjYWxsZXIgbXVzdCBjYWxsIGBkZXN0cm95YCBvbiB0aGUgcmV0dXJuZWQgYFBlbmRpbmdDb3B5YC5cbiAgICpcbiAgICogQHBhcmFtIHRleHQgVGhlIHN0cmluZyB0byBjb3B5LlxuICAgKiBAcmV0dXJucyB0aGUgcGVuZGluZyBjb3B5IG9wZXJhdGlvbi5cbiAgICovXG4gIGJlZ2luQ29weSh0ZXh0OiBzdHJpbmcpOiBQZW5kaW5nQ29weSB7XG4gICAgcmV0dXJuIG5ldyBQZW5kaW5nQ29weSh0ZXh0LCB0aGlzLl9kb2N1bWVudCk7XG4gIH1cbn1cblxuIC8qKlxuICogQSBwZW5kaW5nIGNvcHktdG8tY2xpcGJvYXJkIG9wZXJhdGlvbi5cbiAqXG4gKiBUaGUgaW1wbGVtZW50YXRpb24gb2YgY29weWluZyB0ZXh0IHRvIHRoZSBjbGlwYm9hcmQgbW9kaWZpZXMgdGhlIERPTSBhbmRcbiAqIGZvcmNlcyBhIHJlbGF5b3V0LiBUaGlzIHJlbGF5b3V0IGNhbiB0YWtlIHRvbyBsb25nIGlmIHRoZSBzdHJpbmcgaXMgbGFyZ2UsXG4gKiBjYXVzaW5nIHRoZSBleGVjQ29tbWFuZCgnY29weScpIHRvIGhhcHBlbiB0b28gbG9uZyBhZnRlciB0aGUgdXNlciBjbGlja2VkLlxuICogVGhpcyByZXN1bHRzIGluIHRoZSBicm93c2VyIHJlZnVzaW5nIHRvIGNvcHkuIFRoaXMgb2JqZWN0IGxldHMgdGhlXG4gKiByZWxheW91dCBoYXBwZW4gaW4gYSBzZXBhcmF0ZSB0aWNrIGZyb20gY29weWluZyBieSBwcm92aWRpbmcgYSBjb3B5IGZ1bmN0aW9uXG4gKiB0aGF0IGNhbiBiZSBjYWxsZWQgbGF0ZXIuXG4gKlxuICogRGVzdHJveSBtdXN0IGJlIGNhbGxlZCB3aGVuIG5vIGxvbmdlciBpbiB1c2UsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBgY29weWAgaXNcbiAqIGNhbGxlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFBlbmRpbmdDb3B5IHtcbiAgcHJpdmF0ZSBfdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnR8dW5kZWZpbmVkO1xuXG4gICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIHByaXZhdGUgcmVhZG9ubHkgX2RvY3VtZW50OiBEb2N1bWVudCkge1xuICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5fdGV4dGFyZWEgPSB0aGlzLl9kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuXG4gICAgIC8vIEhpZGUgdGhlIGVsZW1lbnQgZm9yIGRpc3BsYXkgYW5kIGFjY2Vzc2liaWxpdHkuXG4gICAgdGV4dGFyZWEuc2V0QXR0cmlidXRlKCdzdHlsZScsICdvcGFjaXR5OiAwOycpO1xuICAgIHRleHRhcmVhLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgIHRleHRhcmVhLnZhbHVlID0gdGV4dDtcbiAgICB0aGlzLl9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRhcmVhKTtcbiAgfVxuXG4gICAvKiogRmluaXNoZXMgY29weWluZyB0aGUgdGV4dC4gKi9cbiAgY29weSgpOiBib29sZWFuIHtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMuX3RleHRhcmVhO1xuICAgIGxldCBzdWNjZXNzZnVsID0gZmFsc2U7XG5cbiAgICAgdHJ5IHsgIC8vIE9sZGVyIGJyb3dzZXJzIGNvdWxkIHRocm93IGlmIGNvcHkgaXMgbm90IHN1cHBvcnRlZC5cbiAgICAgIGlmICh0ZXh0YXJlYSkge1xuICAgICAgICBjb25zdCBjdXJyZW50Rm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgICB0ZXh0YXJlYS5zZWxlY3QoKTtcbiAgICAgICAgc3VjY2Vzc2Z1bCA9IHRoaXMuX2RvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG5cbiAgICAgICAgIGlmIChjdXJyZW50Rm9jdXMgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgIGN1cnJlbnRGb2N1cy5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBEaXNjYXJkIGVycm9yLlxuICAgICAgLy8gSW5pdGlhbCBzZXR0aW5nIG9mIHtAY29kZSBzdWNjZXNzZnVsfSB3aWxsIHJlcHJlc2VudCBmYWlsdXJlIGhlcmUuXG4gICAgfVxuXG4gICAgIHJldHVybiBzdWNjZXNzZnVsO1xuICB9XG5cbiAgIC8qKiBDbGVhbnMgdXAgRE9NIGNoYW5nZXMgdXNlZCB0byBwZXJmb3JtIHRoZSBjb3B5IG9wZXJhdGlvbi4gKi9cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fdGV4dGFyZWEpIHtcbiAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fdGV4dGFyZWEpO1xuICAgICAgdGhpcy5fdGV4dGFyZWEgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=