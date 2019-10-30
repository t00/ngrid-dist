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
var Clipboard = /** @class */ (function () {
    function Clipboard(document) {
        this._document = document;
    }
    /**
    * Copies the provided text into the user's clipboard.
    *
    * @param text The string to copy.
    * @returns Whether the operation was successful.
    */
    /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    Clipboard.prototype.copy = /**
     * Copies the provided text into the user's clipboard.
     *
     * @param {?} text The string to copy.
     * @return {?} Whether the operation was successful.
     */
    function (text) {
        /** @type {?} */
        var pendingCopy = this.beginCopy(text);
        /** @type {?} */
        var successful = pendingCopy.copy();
        pendingCopy.destroy();
        return successful;
    };
    /**
    * Prepares a string to be copied later. This is useful for large strings
    * which take too long to successfully render and be copied in the same tick.
    *
    * The caller must call `destroy` on the returned `PendingCopy`.
    *
    * @param text The string to copy.
    * @returns the pending copy operation.
    */
    /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    Clipboard.prototype.beginCopy = /**
     * Prepares a string to be copied later. This is useful for large strings
     * which take too long to successfully render and be copied in the same tick.
     *
     * The caller must call `destroy` on the returned `PendingCopy`.
     *
     * @param {?} text The string to copy.
     * @return {?} the pending copy operation.
     */
    function (text) {
        return new PendingCopy(text, this._document);
    };
    Clipboard.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    Clipboard.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
    ]; };
    /** @nocollapse */ Clipboard.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(i0.ɵɵinject(i1.DOCUMENT)); }, token: Clipboard, providedIn: "root" });
    return Clipboard;
}());
export { Clipboard };
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
var /**
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
PendingCopy = /** @class */ (function () {
    function PendingCopy(text, _document) {
        this._document = _document;
        /** @type {?} */
        var textarea = this._textarea = this._document.createElement('textarea');
        // Hide the element for display and accessibility.
        textarea.setAttribute('style', 'opacity: 0;');
        textarea.setAttribute('aria-hidden', 'true');
        textarea.value = text;
        this._document.body.appendChild(textarea);
    }
    /** Finishes copying the text. */
    /**
     * Finishes copying the text.
     * @return {?}
     */
    PendingCopy.prototype.copy = /**
     * Finishes copying the text.
     * @return {?}
     */
    function () {
        /** @type {?} */
        var textarea = this._textarea;
        /** @type {?} */
        var successful = false;
        try { // Older browsers could throw if copy is not supported.
            if (textarea) {
                /** @type {?} */
                var currentFocus = document.activeElement;
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
    };
    /** Cleans up DOM changes used to perform the copy operation. */
    /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    PendingCopy.prototype.destroy = /**
     * Cleans up DOM changes used to perform the copy operation.
     * @return {?}
     */
    function () {
        if (this._textarea) {
            this._document.body.removeChild(this._textarea);
            this._textarea = undefined;
        }
    };
    return PendingCopy;
}());
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
export { PendingCopy };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2NsaXBib2FyZC8iLCJzb3VyY2VzIjpbImxpYi9jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7OztBQVNqRDtJQUlHLG1CQUE4QixRQUFhO1FBQzFDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQzVCLENBQUM7SUFFQTs7Ozs7TUFLRTs7Ozs7OztJQUNILHdCQUFJOzs7Ozs7SUFBSixVQUFLLElBQVk7O1lBQ1QsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDOztZQUNsQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRTtRQUNyQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFckIsT0FBTyxVQUFVLENBQUM7SUFDckIsQ0FBQztJQUVBOzs7Ozs7OztNQVFFOzs7Ozs7Ozs7O0lBQ0gsNkJBQVM7Ozs7Ozs7OztJQUFULFVBQVUsSUFBWTtRQUNwQixPQUFPLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsQ0FBQzs7Z0JBakNGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7Ozs7Z0RBSWhCLE1BQU0sU0FBQyxRQUFROzs7b0JBdEIvQjtDQW9EQyxBQWxDRCxJQWtDQztTQWpDWSxTQUFTOzs7Ozs7SUFDcEIsOEJBQTRCOzs7Ozs7Ozs7Ozs7Ozs7QUErQzlCOzs7Ozs7Ozs7Ozs7OztJQUdHLHFCQUFZLElBQVksRUFBbUIsU0FBbUI7UUFBbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTs7WUFDdkQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBRXpFLGtEQUFrRDtRQUNuRCxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM5QyxRQUFRLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU1QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVBLGlDQUFpQzs7Ozs7SUFDbEMsMEJBQUk7Ozs7SUFBSjs7WUFDUSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVM7O1lBQzNCLFVBQVUsR0FBRyxLQUFLO1FBRXJCLElBQUksRUFBRyx1REFBdUQ7WUFDN0QsSUFBSSxRQUFRLEVBQUU7O29CQUNOLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYTtnQkFFMUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRS9DLElBQUksWUFBWSxZQUFZLFdBQVcsRUFBRTtvQkFDeEMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0QjthQUNGO1NBQ0Y7UUFBQyxXQUFNO1lBQ04saUJBQWlCO1lBQ2pCLHFFQUFxRTtTQUN0RTtRQUVBLE9BQU8sVUFBVSxDQUFDO0lBQ3JCLENBQUM7SUFFQSxnRUFBZ0U7Ozs7O0lBQ2pFLDZCQUFPOzs7O0lBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNUNDLGdDQUFpRDs7Ozs7SUFFdEIsZ0NBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbiAvKipcbiAqIEEgc2VydmljZSBmb3IgY29weWluZyB0ZXh0IHRvIHRoZSBjbGlwYm9hcmQuXG4gKlxuICogRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiBjbGlwYm9hcmQuY29weShcImNvcHkgdGhpcyB0ZXh0XCIpO1xuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBDbGlwYm9hcmQge1xuICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG5cbiAgIGNvbnN0cnVjdG9yKEBJbmplY3QoRE9DVU1FTlQpIGRvY3VtZW50OiBhbnkpIHtcbiAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICB9XG5cbiAgIC8qKlxuICAgKiBDb3BpZXMgdGhlIHByb3ZpZGVkIHRleHQgaW50byB0aGUgdXNlcidzIGNsaXBib2FyZC5cbiAgICpcbiAgICogQHBhcmFtIHRleHQgVGhlIHN0cmluZyB0byBjb3B5LlxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBvcGVyYXRpb24gd2FzIHN1Y2Nlc3NmdWwuXG4gICAqL1xuICBjb3B5KHRleHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHBlbmRpbmdDb3B5ID0gdGhpcy5iZWdpbkNvcHkodGV4dCk7XG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IHBlbmRpbmdDb3B5LmNvcHkoKTtcbiAgICBwZW5kaW5nQ29weS5kZXN0cm95KCk7XG5cbiAgICAgcmV0dXJuIHN1Y2Nlc3NmdWw7XG4gIH1cblxuICAgLyoqXG4gICAqIFByZXBhcmVzIGEgc3RyaW5nIHRvIGJlIGNvcGllZCBsYXRlci4gVGhpcyBpcyB1c2VmdWwgZm9yIGxhcmdlIHN0cmluZ3NcbiAgICogd2hpY2ggdGFrZSB0b28gbG9uZyB0byBzdWNjZXNzZnVsbHkgcmVuZGVyIGFuZCBiZSBjb3BpZWQgaW4gdGhlIHNhbWUgdGljay5cbiAgICpcbiAgICogVGhlIGNhbGxlciBtdXN0IGNhbGwgYGRlc3Ryb3lgIG9uIHRoZSByZXR1cm5lZCBgUGVuZGluZ0NvcHlgLlxuICAgKlxuICAgKiBAcGFyYW0gdGV4dCBUaGUgc3RyaW5nIHRvIGNvcHkuXG4gICAqIEByZXR1cm5zIHRoZSBwZW5kaW5nIGNvcHkgb3BlcmF0aW9uLlxuICAgKi9cbiAgYmVnaW5Db3B5KHRleHQ6IHN0cmluZyk6IFBlbmRpbmdDb3B5IHtcbiAgICByZXR1cm4gbmV3IFBlbmRpbmdDb3B5KHRleHQsIHRoaXMuX2RvY3VtZW50KTtcbiAgfVxufVxuXG4gLyoqXG4gKiBBIHBlbmRpbmcgY29weS10by1jbGlwYm9hcmQgb3BlcmF0aW9uLlxuICpcbiAqIFRoZSBpbXBsZW1lbnRhdGlvbiBvZiBjb3B5aW5nIHRleHQgdG8gdGhlIGNsaXBib2FyZCBtb2RpZmllcyB0aGUgRE9NIGFuZFxuICogZm9yY2VzIGEgcmVsYXlvdXQuIFRoaXMgcmVsYXlvdXQgY2FuIHRha2UgdG9vIGxvbmcgaWYgdGhlIHN0cmluZyBpcyBsYXJnZSxcbiAqIGNhdXNpbmcgdGhlIGV4ZWNDb21tYW5kKCdjb3B5JykgdG8gaGFwcGVuIHRvbyBsb25nIGFmdGVyIHRoZSB1c2VyIGNsaWNrZWQuXG4gKiBUaGlzIHJlc3VsdHMgaW4gdGhlIGJyb3dzZXIgcmVmdXNpbmcgdG8gY29weS4gVGhpcyBvYmplY3QgbGV0cyB0aGVcbiAqIHJlbGF5b3V0IGhhcHBlbiBpbiBhIHNlcGFyYXRlIHRpY2sgZnJvbSBjb3B5aW5nIGJ5IHByb3ZpZGluZyBhIGNvcHkgZnVuY3Rpb25cbiAqIHRoYXQgY2FuIGJlIGNhbGxlZCBsYXRlci5cbiAqXG4gKiBEZXN0cm95IG11c3QgYmUgY2FsbGVkIHdoZW4gbm8gbG9uZ2VyIGluIHVzZSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGBjb3B5YCBpc1xuICogY2FsbGVkLlxuICovXG5leHBvcnQgY2xhc3MgUGVuZGluZ0NvcHkge1xuICBwcml2YXRlIF90ZXh0YXJlYTogSFRNTFRleHRBcmVhRWxlbWVudHx1bmRlZmluZWQ7XG5cbiAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgcHJpdmF0ZSByZWFkb25seSBfZG9jdW1lbnQ6IERvY3VtZW50KSB7XG4gICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLl90ZXh0YXJlYSA9IHRoaXMuX2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cbiAgICAgLy8gSGlkZSB0aGUgZWxlbWVudCBmb3IgZGlzcGxheSBhbmQgYWNjZXNzaWJpbGl0eS5cbiAgICB0ZXh0YXJlYS5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ29wYWNpdHk6IDA7Jyk7XG4gICAgdGV4dGFyZWEuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgdGV4dGFyZWEudmFsdWUgPSB0ZXh0O1xuICAgIHRoaXMuX2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dGFyZWEpO1xuICB9XG5cbiAgIC8qKiBGaW5pc2hlcyBjb3B5aW5nIHRoZSB0ZXh0LiAqL1xuICBjb3B5KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5fdGV4dGFyZWE7XG4gICAgbGV0IHN1Y2Nlc3NmdWwgPSBmYWxzZTtcblxuICAgICB0cnkgeyAgLy8gT2xkZXIgYnJvd3NlcnMgY291bGQgdGhyb3cgaWYgY29weSBpcyBub3Qgc3VwcG9ydGVkLlxuICAgICAgaWYgKHRleHRhcmVhKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgIHRleHRhcmVhLnNlbGVjdCgpO1xuICAgICAgICBzdWNjZXNzZnVsID0gdGhpcy5fZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcblxuICAgICAgICAgaWYgKGN1cnJlbnRGb2N1cyBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgY3VycmVudEZvY3VzLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIERpc2NhcmQgZXJyb3IuXG4gICAgICAvLyBJbml0aWFsIHNldHRpbmcgb2Yge0Bjb2RlIHN1Y2Nlc3NmdWx9IHdpbGwgcmVwcmVzZW50IGZhaWx1cmUgaGVyZS5cbiAgICB9XG5cbiAgICAgcmV0dXJuIHN1Y2Nlc3NmdWw7XG4gIH1cblxuICAgLyoqIENsZWFucyB1cCBET00gY2hhbmdlcyB1c2VkIHRvIHBlcmZvcm0gdGhlIGNvcHkgb3BlcmF0aW9uLiAqL1xuICBkZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl90ZXh0YXJlYSkge1xuICAgICAgdGhpcy5fZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl90ZXh0YXJlYSk7XG4gICAgICB0aGlzLl90ZXh0YXJlYSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==