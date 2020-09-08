/**
 * @fileoverview added by tsickle
 * Generated from: lib/clipboard.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
/** @nocollapse */ Clipboard.ɵprov = i0.ɵɵdefineInjectable({ factory: function Clipboard_Factory() { return new Clipboard(i0.ɵɵinject(i1.DOCUMENT)); }, token: Clipboard, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpcGJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkL2NsaXBib2FyZC8iLCJzb3VyY2VzIjpbImxpYi9jbGlwYm9hcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFVakQsTUFBTSxPQUFPLFNBQVM7Ozs7SUFHbkIsWUFBOEIsUUFBYTtRQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztJQUM1QixDQUFDOzs7Ozs7O0lBUUQsSUFBSSxDQUFDLElBQVk7O2NBQ1QsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDOztjQUNsQyxVQUFVLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRTtRQUNyQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFckIsT0FBTyxVQUFVLENBQUM7SUFDckIsQ0FBQzs7Ozs7Ozs7OztJQVdELFNBQVMsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDOzs7WUFqQ0YsVUFBVSxTQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQzs7Ozs0Q0FJaEIsTUFBTSxTQUFDLFFBQVE7Ozs7Ozs7O0lBRjdCLDhCQUE0Qjs7Ozs7Ozs7Ozs7Ozs7O0FBK0M5QixNQUFNLE9BQU8sV0FBVzs7Ozs7SUFHckIsWUFBWSxJQUFZLEVBQW1CLFNBQW1CO1FBQW5CLGNBQVMsR0FBVCxTQUFTLENBQVU7O2NBQ3ZELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUV6RSxrREFBa0Q7UUFDbkQsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFNUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7Ozs7O0lBR0QsSUFBSTs7Y0FDSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVM7O1lBQzNCLFVBQVUsR0FBRyxLQUFLO1FBRXJCLElBQUksRUFBRyx1REFBdUQ7WUFDN0QsSUFBSSxRQUFRLEVBQUU7O3NCQUNOLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYTtnQkFFMUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRS9DLElBQUksWUFBWSxZQUFZLFdBQVcsRUFBRTtvQkFDeEMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0QjthQUNGO1NBQ0Y7UUFBQyxXQUFNO1lBQ04saUJBQWlCO1lBQ2pCLHFFQUFxRTtTQUN0RTtRQUVBLE9BQU8sVUFBVSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBR0QsT0FBTztRQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUE1Q0MsZ0NBQWlEOzs7OztJQUV0QixnQ0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuIC8qKlxuICogQSBzZXJ2aWNlIGZvciBjb3B5aW5nIHRleHQgdG8gdGhlIGNsaXBib2FyZC5cbiAqXG4gKiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqIGNsaXBib2FyZC5jb3B5KFwiY29weSB0aGlzIHRleHRcIik7XG4gKi9cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIENsaXBib2FyZCB7XG4gIHByaXZhdGUgX2RvY3VtZW50OiBEb2N1bWVudDtcblxuICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgZG9jdW1lbnQ6IGFueSkge1xuICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gIH1cblxuICAgLyoqXG4gICAqIENvcGllcyB0aGUgcHJvdmlkZWQgdGV4dCBpbnRvIHRoZSB1c2VyJ3MgY2xpcGJvYXJkLlxuICAgKlxuICAgKiBAcGFyYW0gdGV4dCBUaGUgc3RyaW5nIHRvIGNvcHkuXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIG9wZXJhdGlvbiB3YXMgc3VjY2Vzc2Z1bC5cbiAgICovXG4gIGNvcHkodGV4dDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcGVuZGluZ0NvcHkgPSB0aGlzLmJlZ2luQ29weSh0ZXh0KTtcbiAgICBjb25zdCBzdWNjZXNzZnVsID0gcGVuZGluZ0NvcHkuY29weSgpO1xuICAgIHBlbmRpbmdDb3B5LmRlc3Ryb3koKTtcblxuICAgICByZXR1cm4gc3VjY2Vzc2Z1bDtcbiAgfVxuXG4gICAvKipcbiAgICogUHJlcGFyZXMgYSBzdHJpbmcgdG8gYmUgY29waWVkIGxhdGVyLiBUaGlzIGlzIHVzZWZ1bCBmb3IgbGFyZ2Ugc3RyaW5nc1xuICAgKiB3aGljaCB0YWtlIHRvbyBsb25nIHRvIHN1Y2Nlc3NmdWxseSByZW5kZXIgYW5kIGJlIGNvcGllZCBpbiB0aGUgc2FtZSB0aWNrLlxuICAgKlxuICAgKiBUaGUgY2FsbGVyIG11c3QgY2FsbCBgZGVzdHJveWAgb24gdGhlIHJldHVybmVkIGBQZW5kaW5nQ29weWAuXG4gICAqXG4gICAqIEBwYXJhbSB0ZXh0IFRoZSBzdHJpbmcgdG8gY29weS5cbiAgICogQHJldHVybnMgdGhlIHBlbmRpbmcgY29weSBvcGVyYXRpb24uXG4gICAqL1xuICBiZWdpbkNvcHkodGV4dDogc3RyaW5nKTogUGVuZGluZ0NvcHkge1xuICAgIHJldHVybiBuZXcgUGVuZGluZ0NvcHkodGV4dCwgdGhpcy5fZG9jdW1lbnQpO1xuICB9XG59XG5cbiAvKipcbiAqIEEgcGVuZGluZyBjb3B5LXRvLWNsaXBib2FyZCBvcGVyYXRpb24uXG4gKlxuICogVGhlIGltcGxlbWVudGF0aW9uIG9mIGNvcHlpbmcgdGV4dCB0byB0aGUgY2xpcGJvYXJkIG1vZGlmaWVzIHRoZSBET00gYW5kXG4gKiBmb3JjZXMgYSByZWxheW91dC4gVGhpcyByZWxheW91dCBjYW4gdGFrZSB0b28gbG9uZyBpZiB0aGUgc3RyaW5nIGlzIGxhcmdlLFxuICogY2F1c2luZyB0aGUgZXhlY0NvbW1hbmQoJ2NvcHknKSB0byBoYXBwZW4gdG9vIGxvbmcgYWZ0ZXIgdGhlIHVzZXIgY2xpY2tlZC5cbiAqIFRoaXMgcmVzdWx0cyBpbiB0aGUgYnJvd3NlciByZWZ1c2luZyB0byBjb3B5LiBUaGlzIG9iamVjdCBsZXRzIHRoZVxuICogcmVsYXlvdXQgaGFwcGVuIGluIGEgc2VwYXJhdGUgdGljayBmcm9tIGNvcHlpbmcgYnkgcHJvdmlkaW5nIGEgY29weSBmdW5jdGlvblxuICogdGhhdCBjYW4gYmUgY2FsbGVkIGxhdGVyLlxuICpcbiAqIERlc3Ryb3kgbXVzdCBiZSBjYWxsZWQgd2hlbiBubyBsb25nZXIgaW4gdXNlLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgYGNvcHlgIGlzXG4gKiBjYWxsZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBQZW5kaW5nQ29weSB7XG4gIHByaXZhdGUgX3RleHRhcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50fHVuZGVmaW5lZDtcblxuICAgY29uc3RydWN0b3IodGV4dDogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IF9kb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMuX3RleHRhcmVhID0gdGhpcy5fZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcblxuICAgICAvLyBIaWRlIHRoZSBlbGVtZW50IGZvciBkaXNwbGF5IGFuZCBhY2Nlc3NpYmlsaXR5LlxuICAgIHRleHRhcmVhLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnb3BhY2l0eTogMDsnKTtcbiAgICB0ZXh0YXJlYS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICB0ZXh0YXJlYS52YWx1ZSA9IHRleHQ7XG4gICAgdGhpcy5fZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0YXJlYSk7XG4gIH1cblxuICAgLyoqIEZpbmlzaGVzIGNvcHlpbmcgdGhlIHRleHQuICovXG4gIGNvcHkoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLl90ZXh0YXJlYTtcbiAgICBsZXQgc3VjY2Vzc2Z1bCA9IGZhbHNlO1xuXG4gICAgIHRyeSB7ICAvLyBPbGRlciBicm93c2VycyBjb3VsZCB0aHJvdyBpZiBjb3B5IGlzIG5vdCBzdXBwb3J0ZWQuXG4gICAgICBpZiAodGV4dGFyZWEpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgICAgdGV4dGFyZWEuc2VsZWN0KCk7XG4gICAgICAgIHN1Y2Nlc3NmdWwgPSB0aGlzLl9kb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuXG4gICAgICAgICBpZiAoY3VycmVudEZvY3VzIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICBjdXJyZW50Rm9jdXMuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRGlzY2FyZCBlcnJvci5cbiAgICAgIC8vIEluaXRpYWwgc2V0dGluZyBvZiB7QGNvZGUgc3VjY2Vzc2Z1bH0gd2lsbCByZXByZXNlbnQgZmFpbHVyZSBoZXJlLlxuICAgIH1cblxuICAgICByZXR1cm4gc3VjY2Vzc2Z1bDtcbiAgfVxuXG4gICAvKiogQ2xlYW5zIHVwIERPTSBjaGFuZ2VzIHVzZWQgdG8gcGVyZm9ybSB0aGUgY29weSBvcGVyYXRpb24uICovXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3RleHRhcmVhKSB7XG4gICAgICB0aGlzLl9kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX3RleHRhcmVhKTtcbiAgICAgIHRoaXMuX3RleHRhcmVhID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19