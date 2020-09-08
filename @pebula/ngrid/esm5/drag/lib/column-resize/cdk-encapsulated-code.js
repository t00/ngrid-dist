/**
 * @fileoverview added by tsickle
 * Generated from: lib/column-resize/cdk-encapsulated-code.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Code from angular/material2 repository
 * File: https://github.com/angular/material2/blob/master/src/cdk/drag-drop/drag-styling.ts
 * Commit: https://github.com/angular/material2/blob/9cd3132607b4d5ae242291df41fb02dc7a453da8/src/cdk/drag-drop/drag-styling.ts
 *
 * This code is not public but required for the drag so duplicated here.
 **/
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Extended CSSStyleDeclaration that includes a couple of drag-related
 * properties that aren't in the built-in TS typings.
 * @record
 */
function DragCSSStyleDeclaration() { }
if (false) {
    /** @type {?} */
    DragCSSStyleDeclaration.prototype.webkitUserDrag;
    /** @type {?} */
    DragCSSStyleDeclaration.prototype.MozUserSelect;
}
/**
 * Shallow-extends a stylesheet object with another stylesheet object.
 * \@docs-private
 * @param {?} dest
 * @param {?} source
 * @return {?}
 */
export function extendStyles(dest, source) {
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            dest[key] = source[(/** @type {?} */ (key))];
        }
    }
    return dest;
}
/**
 * Toggles whether the native drag interactions should be enabled for an element.
 * \@docs-private
 * @param {?} element Element on which to toggle the drag interactions.
 * @param {?} enable Whether the drag interactions should be enabled.
 * @return {?}
 */
export function toggleNativeDragInteractions(element, enable) {
    /** @type {?} */
    var userSelect = enable ? '' : 'none';
    extendStyles(element.style, {
        touchAction: enable ? '' : 'none',
        webkitUserDrag: enable ? '' : 'none',
        webkitTapHighlightColor: enable ? '' : 'transparent',
        userSelect: userSelect,
        msUserSelect: userSelect,
        webkitUserSelect: userSelect,
        MozUserSelect: userSelect
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLWVuY2Fwc3VsYXRlZC1jb2RlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9kcmFnLyIsInNvdXJjZXMiOlsibGliL2NvbHVtbi1yZXNpemUvY2RrLWVuY2Fwc3VsYXRlZC1jb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxzQ0FHQzs7O0lBRkMsaURBQXVCOztJQUN2QixnREFBc0I7Ozs7Ozs7OztBQU94QixNQUFNLFVBQVUsWUFBWSxDQUFDLElBQW9DLEVBQUUsTUFBd0M7SUFDekcsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7UUFDdEIsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsbUJBQUEsR0FBRyxFQUE2QixDQUFDLENBQUM7U0FDdEQ7S0FDRjtJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQzs7Ozs7Ozs7QUFTRCxNQUFNLFVBQVUsNEJBQTRCLENBQUMsT0FBb0IsRUFBRSxNQUFlOztRQUMxRSxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU07SUFFdkMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7UUFDMUIsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBQ2pDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUNwQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUNwRCxVQUFVLEVBQUUsVUFBVTtRQUN0QixZQUFZLEVBQUUsVUFBVTtRQUN4QixnQkFBZ0IsRUFBRSxVQUFVO1FBQzVCLGFBQWEsRUFBRSxVQUFVO0tBQzFCLENBQUMsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogQ29kZSBmcm9tIGFuZ3VsYXIvbWF0ZXJpYWwyIHJlcG9zaXRvcnlcbiAqIEZpbGU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL21hdGVyaWFsMi9ibG9iL21hc3Rlci9zcmMvY2RrL2RyYWctZHJvcC9kcmFnLXN0eWxpbmcudHNcbiAqIENvbW1pdDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvbWF0ZXJpYWwyL2Jsb2IvOWNkMzEzMjYwN2I0ZDVhZTI0MjI5MWRmNDFmYjAyZGM3YTQ1M2RhOC9zcmMvY2RrL2RyYWctZHJvcC9kcmFnLXN0eWxpbmcudHNcbiAqXG4gKiBUaGlzIGNvZGUgaXMgbm90IHB1YmxpYyBidXQgcmVxdWlyZWQgZm9yIHRoZSBkcmFnIHNvIGR1cGxpY2F0ZWQgaGVyZS5cbiAqKi9cblxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cblxuLy8gSGVscGVyIHR5cGUgdGhhdCBpZ25vcmVzIGByZWFkb25seWAgcHJvcGVydGllcy4gVGhpcyBpcyB1c2VkIGluXG4vLyBgZXh0ZW5kU3R5bGVzYCB0byBpZ25vcmUgdGhlIHJlYWRvbmx5IHByb3BlcnRpZXMgb24gQ1NTU3R5bGVEZWNsYXJhdGlvblxuLy8gc2luY2Ugd2Ugd29uJ3QgYmUgdG91Y2hpbmcgdGhvc2UgYW55d2F5LlxudHlwZSBXcml0ZWFibGU8VD4gPSB7IC1yZWFkb25seSBbUCBpbiBrZXlvZiBUXS0/OiBUW1BdIH07XG5cbi8qKlxuICogRXh0ZW5kZWQgQ1NTU3R5bGVEZWNsYXJhdGlvbiB0aGF0IGluY2x1ZGVzIGEgY291cGxlIG9mIGRyYWctcmVsYXRlZFxuICogcHJvcGVydGllcyB0aGF0IGFyZW4ndCBpbiB0aGUgYnVpbHQtaW4gVFMgdHlwaW5ncy5cbiAqL1xuaW50ZXJmYWNlIERyYWdDU1NTdHlsZURlY2xhcmF0aW9uIGV4dGVuZHMgQ1NTU3R5bGVEZWNsYXJhdGlvbiB7XG4gIHdlYmtpdFVzZXJEcmFnOiBzdHJpbmc7XG4gIE1velVzZXJTZWxlY3Q6IHN0cmluZzsgLy8gRm9yIHNvbWUgcmVhc29uIHRoZSBGaXJlZm94IHByb3BlcnR5IGlzIGluIFBhc2NhbENhc2UuXG59XG5cbi8qKlxuICogU2hhbGxvdy1leHRlbmRzIGEgc3R5bGVzaGVldCBvYmplY3Qgd2l0aCBhbm90aGVyIHN0eWxlc2hlZXQgb2JqZWN0LlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kU3R5bGVzKGRlc3Q6IFdyaXRlYWJsZTxDU1NTdHlsZURlY2xhcmF0aW9uPiwgc291cmNlOiBQYXJ0aWFsPERyYWdDU1NTdHlsZURlY2xhcmF0aW9uPikge1xuICBmb3IgKGxldCBrZXkgaW4gc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBkZXN0W2tleV0gPSBzb3VyY2Vba2V5IGFzIGtleW9mIENTU1N0eWxlRGVjbGFyYXRpb25dO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVzdDtcbn1cblxuXG4vKipcbiAqIFRvZ2dsZXMgd2hldGhlciB0aGUgbmF0aXZlIGRyYWcgaW50ZXJhY3Rpb25zIHNob3VsZCBiZSBlbmFibGVkIGZvciBhbiBlbGVtZW50LlxuICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCBvbiB3aGljaCB0byB0b2dnbGUgdGhlIGRyYWcgaW50ZXJhY3Rpb25zLlxuICogQHBhcmFtIGVuYWJsZSBXaGV0aGVyIHRoZSBkcmFnIGludGVyYWN0aW9ucyBzaG91bGQgYmUgZW5hYmxlZC5cbiAqIEBkb2NzLXByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU5hdGl2ZURyYWdJbnRlcmFjdGlvbnMoZWxlbWVudDogSFRNTEVsZW1lbnQsIGVuYWJsZTogYm9vbGVhbikge1xuICBjb25zdCB1c2VyU2VsZWN0ID0gZW5hYmxlID8gJycgOiAnbm9uZSc7XG5cbiAgZXh0ZW5kU3R5bGVzKGVsZW1lbnQuc3R5bGUsIHtcbiAgICB0b3VjaEFjdGlvbjogZW5hYmxlID8gJycgOiAnbm9uZScsXG4gICAgd2Via2l0VXNlckRyYWc6IGVuYWJsZSA/ICcnIDogJ25vbmUnLFxuICAgIHdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBlbmFibGUgPyAnJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgdXNlclNlbGVjdDogdXNlclNlbGVjdCxcbiAgICBtc1VzZXJTZWxlY3Q6IHVzZXJTZWxlY3QsXG4gICAgd2Via2l0VXNlclNlbGVjdDogdXNlclNlbGVjdCxcbiAgICBNb3pVc2VyU2VsZWN0OiB1c2VyU2VsZWN0XG4gIH0pO1xufVxuIl19