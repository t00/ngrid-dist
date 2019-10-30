/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-class-suffix
import { Directive, Input, Inject, KeyValueDiffers, } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { isPblColumn } from '../columns/column';
import { EXT_API_TOKEN } from '../../ext/table-ext-api';
import { parseStyleWidth } from '../columns/utils';
import { uniqueColumnCss } from '../circular-dep-bridge';
/* TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO

  PblNgridColumnDef use's the default object KeyValueDiffer provides with angular.
  This differ will perform the diff on the entire object which IS NOT REQUIRED!
  We need to create a custom differ that does the diff on selected properties only.
*/
/**
 * Column definition for the mat-table.
 * Defines a set of cells available for a table column.
 * @template T
 */
export class PblNgridColumnDef extends CdkColumnDef {
    /**
     * @param {?} _differs
     * @param {?} extApi
     */
    constructor(_differs, extApi) {
        super();
        this._differs = _differs;
        this.extApi = extApi;
        this.isDragging = false;
        this._isDirty = false;
        this._markedForCheck = false;
        this.table = extApi.table;
    }
    /**
     * @return {?}
     */
    get column() { return this._column; }
    ;
    /**
     * @param {?} value
     * @return {?}
     */
    set column(value) { this.attach(value); }
    /**
     * @return {?}
     */
    get isDirty() {
        if (this._markedForCheck && !this._isDirty) {
            this._markedForCheck = false;
            this._isDirty = !!this._colDiffer.diff(this._column);
        }
        return this._isDirty;
    }
    /**
     * The complete width definition for the column.
     * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     * @return {?}
     */
    get widths() { return this._widths; }
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     * @return {?}
     */
    get netWidth() { return this._netWidth; }
    /**
     * Marks this column for a lazy change detection check.
     * Lazy means it will run the check only when the diff is requested (i.e. querying the `hasChanged` property).
     * This allow aggregation of changes between CD cycles, i.e. calling `markForCheck()` multiple times within the same CD cycle does not hit performance.
     *
     * Once marked for check, `pblNgridColumnDef` handles it's dirty (`isDirty`) state automatically, when `isDirty` is true it will remain true until the
     * CD cycle ends, i.e. until `ngDoCheck()` hits. This means that only children of `pblNgridColumnDef` can relay on `isDirty`, all children will run their
     * `ngDoCheck()` before `ngDoCheck()` of `pblNgridColumnDef`.
     *
     * This is a how we notify all cell directives about changes in a column. It is done through angular CD logic and does not require manual
     * CD kicks and special channels between pblNgridColumnDef and it's children.
     * @return {?}
     */
    markForCheck() {
        if (!this._colDiffer) {
            this._colDiffer = this._differs.find({}).create();
            this._colDiffer.diff({});
        }
        this._markedForCheck = true;
    }
    /**
     * Update the width definitions for this column. [minWidth, width, maxWidth]
     * If an element is provided it will also apply the widths to the element.
     * @param {?} width The new width
     * @param {?=} element Optional, an element to apply the width to, if not set will only update the width definitions.
     * @return {?}
     */
    updateWidth(width, element) {
        const { isFixedWidth } = this._column;
        /*  Setting the minimum width is based on the input.
                If the original width is pixel fixed we will take the maximum between it and the min width.
                If not, we will the take minWidth.
                If none of the above worked we will try to see if the current width is set with %, if so it will be our min width.
            */
        /** @type {?} */
        const minWidthPx = isFixedWidth
            ? Math.max(this._column.parsedWidth.value, this._column.minWidth || 0)
            : this._column.minWidth;
        /** @type {?} */
        let minWidth = minWidthPx && `${minWidthPx}px`;
        if (!minWidth) {
            /** @type {?} */
            const parsed = parseStyleWidth(width);
            if (parsed && parsed.type === '%') {
                minWidth = width;
            }
        }
        /** @type {?} */
        const maxWidth = isFixedWidth
            ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
            : this._column.maxWidth;
        this._widths = [minWidth || '', width, maxWidth ? `${maxWidth}px` : width];
        if (element) {
            this.applyWidth(element);
        }
    }
    /**
     * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
     * @param {?} element
     * @return {?}
     */
    applyWidth(element) {
        setWidth(element, this.widths);
    }
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     * @param {...?} filter
     * @return {?}
     */
    queryCellElements(...filter) {
        /** @type {?} */
        const cssId = `.${uniqueColumnCss(this)}`;
        /** @type {?} */
        const query = [];
        if (filter.length === 0) {
            query.push(cssId);
        }
        else {
            for (const f of filter) {
                switch (f) {
                    case 'table':
                        query.push(`.pbl-ngrid-cell${cssId}`);
                        break;
                    case 'header':
                        query.push(`.pbl-ngrid-header-cell${cssId}:not(.pbl-header-group-cell)`);
                        break;
                    case 'headerGroup':
                        query.push(`.pbl-header-group-cell${cssId}`);
                        break;
                    case 'footer':
                        query.push(`.pbl-ngrid-footer-cell${cssId}:not(.pbl-footer-group-cell)`);
                        break;
                    case 'footerGroup':
                        query.push(`.pbl-footer-group-cell${cssId}`);
                        break;
                }
            }
        }
        // we query from the master table container and not CDKTable because of fixed meta rows
        return query.length === 0 ? [] : (/** @type {?} */ (Array.from(this.extApi.element.querySelectorAll(query.join(', ')))));
    }
    /**
     * \@internal
     * @return {?}
     */
    ngDoCheck() {
        if (this._isDirty) {
            this._isDirty = false;
        }
    }
    /**
     * \@internal
     * @return {?}
     */
    ngOnDestroy() { this.detach(); }
    /**
     * @return {?}
     */
    onResize() {
        if (isPblColumn(this.column)) {
            /** @type {?} */
            const prevNetWidth = this._netWidth;
            this._netWidth = this.extApi.dynamicColumnWidthFactory().widthBreakout(this.column.sizeInfo).content;
            if (prevNetWidth && prevNetWidth !== this._netWidth) {
                /** @type {?} */
                const width = `${this._netWidth}px`;
                this._widths = [
                    this.widths[0] || width,
                    width,
                    width,
                ];
            }
        }
    }
    /**
     * @param {?=} pin
     * @return {?}
     */
    updatePin(pin) {
        this.sticky = this.stickyEnd = false;
        switch (pin) {
            case 'start':
                this.sticky = true;
                break;
            case 'end':
                this.stickyEnd = true;
                break;
        }
        if (this.table.isInit) {
            this.table._cdkTable.updateStickyColumnStyles();
        }
    }
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    attach(column) {
        if (this._column !== column) {
            this.detach();
            if (column) {
                this._column = column;
                ((/** @type {?} */ (column))).attach(this);
                this.name = column.id.replace(/ /g, '_');
                if (isPblColumn(column)) {
                    this.updatePin(column.pin);
                }
            }
            if (this._colDiffer) {
                this.markForCheck();
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    detach() {
        if (this._column) {
            this._column.detach();
            this._column = undefined;
        }
    }
}
PblNgridColumnDef.decorators = [
    { type: Directive, args: [{
                selector: '[pblNgridColumnDef]',
                providers: [
                    { provide: CdkColumnDef, useExisting: PblNgridColumnDef },
                    { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: PblNgridColumnDef }
                ],
            },] }
];
/** @nocollapse */
PblNgridColumnDef.ctorParameters = () => [
    { type: KeyValueDiffers },
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
];
PblNgridColumnDef.propDecorators = {
    column: [{ type: Input, args: ['pblNgridColumnDef',] }]
};
if (false) {
    /** @type {?} */
    PblNgridColumnDef.prototype.isDragging;
    /** @type {?} */
    PblNgridColumnDef.prototype.table;
    /**
     * @type {?}
     * @protected
     */
    PblNgridColumnDef.prototype._colDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._column;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._isDirty;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._markedForCheck;
    /**
     * The complete width definition for the column.
     * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._widths;
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._netWidth;
    /**
     * @type {?}
     * @protected
     */
    PblNgridColumnDef.prototype._differs;
    /**
     * @type {?}
     * @protected
     */
    PblNgridColumnDef.prototype.extApi;
    /* Skipping unhandled member: ;*/
}
/**
 * Set the widths of an HTMLElement
 * @param {?} el The element to set widths to
 * @param {?} widths The widths, a tuple of 3 strings [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
 * @return {?}
 */
function setWidth(el, widths) {
    el.style.minWidth = widths[0];
    el.style.width = widths[1];
    el.style.maxWidth = widths[2];
    // TODO(shlomiassaf)[perf, 4]: Instead of using a tuple for width, use a CSSStyleDeclaration object and just assign the props
    // This will avoid the additional check for %
    // We will need to implement it in all places that `_widths` is updated in `PblNgridColumnDef`
    // Another TODO is to cache the previous `boxSizing` in any case the column definition changes.
    // When the column does not have an explicit `minWidth` set and when the `width` is set explicitly to a % value
    // the logic in `PblNgridColumnDef.updateWidth` will set `minWidth` to the same value in `width`
    // This will cause an overflow unless we apply the border-box model
    if (widths[0] && widths[0].endsWith('%')) {
        el.style.boxSizing = 'border-box';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jb2x1bW4tZGVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixlQUFlLEdBR2hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7Ozs7Ozs7Ozs7QUFvQnpELE1BQU0sT0FBTyxpQkFBNkMsU0FBUSxZQUFZOzs7OztJQWtENUUsWUFBK0IsUUFBeUIsRUFBbUMsTUFBaUM7UUFDMUgsS0FBSyxFQUFFLENBQUM7UUFEcUIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFBbUMsV0FBTSxHQUFOLE1BQU0sQ0FBMkI7UUF4QjVILGVBQVUsR0FBRyxLQUFLLENBQUM7UUFPWCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBa0I5QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDNUIsQ0FBQzs7OztJQXBERCxJQUFnQyxNQUFNLEtBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7Ozs7O0lBQ3JFLElBQUksTUFBTSxDQUFDLEtBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUU1QyxJQUFJLE9BQU87UUFD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LENBQUMsQ0FBQztJQUM5QixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlCLDZIQUE2SDtJQUM3SCw2Q0FBNkM7SUFDN0MsOEZBQThGO0lBQzlGLCtGQUErRjtJQUUvRiwrR0FBK0c7SUFDL0csZ0dBQWdHO0lBQ2hHLG1FQUFtRTtJQUNuRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztLQUNuQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbi8vIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBLZXlWYWx1ZURpZmZlcnMsIEtleVZhbHVlRGlmZmVyLFxuICBPbkRlc3Ryb3ksXG4gIERvQ2hlY2ssXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgQ09MVU1OIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5pbXBvcnQgeyBpc1BibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgcGFyc2VTdHlsZVdpZHRoIH0gZnJvbSAnLi4vY29sdW1ucy91dGlscyc7XG5pbXBvcnQgeyB1bmlxdWVDb2x1bW5Dc3MgfSBmcm9tICcuLi9jaXJjdWxhci1kZXAtYnJpZGdlJztcblxuLyogVE9ETyBUT0RPIFRPRE8gVE9ETyBUT0RPIFRPRE8gVE9ETyBUT0RPIFRPRE8gVE9ET1xuXG4gIFBibE5ncmlkQ29sdW1uRGVmIHVzZSdzIHRoZSBkZWZhdWx0IG9iamVjdCBLZXlWYWx1ZURpZmZlciBwcm92aWRlcyB3aXRoIGFuZ3VsYXIuXG4gIFRoaXMgZGlmZmVyIHdpbGwgcGVyZm9ybSB0aGUgZGlmZiBvbiB0aGUgZW50aXJlIG9iamVjdCB3aGljaCBJUyBOT1QgUkVRVUlSRUQhXG4gIFdlIG5lZWQgdG8gY3JlYXRlIGEgY3VzdG9tIGRpZmZlciB0aGF0IGRvZXMgdGhlIGRpZmYgb24gc2VsZWN0ZWQgcHJvcGVydGllcyBvbmx5LlxuKi9cblxuLyoqXG4gKiBDb2x1bW4gZGVmaW5pdGlvbiBmb3IgdGhlIG1hdC10YWJsZS5cbiAqIERlZmluZXMgYSBzZXQgb2YgY2VsbHMgYXZhaWxhYmxlIGZvciBhIHRhYmxlIGNvbHVtbi5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ29sdW1uRGVmXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrQ29sdW1uRGVmLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EZWYgfSxcbiAgICB7IHByb3ZpZGU6ICdNQVRfU09SVF9IRUFERVJfQ09MVU1OX0RFRicsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRlZiB9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uRGVmPFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrQ29sdW1uRGVmIGltcGxlbWVudHMgRG9DaGVjaywgT25EZXN0cm95IHtcbiAgQElucHV0KCdwYmxOZ3JpZENvbHVtbkRlZicpIGdldCBjb2x1bW4oKTogVCB7IHJldHVybiB0aGlzLl9jb2x1bW47IH07XG4gIHNldCBjb2x1bW4odmFsdWU6IFQpIHsgdGhpcy5hdHRhY2godmFsdWUpOyB9XG5cbiAgZ2V0IGlzRGlydHkoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX21hcmtlZEZvckNoZWNrICYmICF0aGlzLl9pc0RpcnR5KSB7XG4gICAgICB0aGlzLl9tYXJrZWRGb3JDaGVjayA9IGZhbHNlO1xuICAgICAgdGhpcy5faXNEaXJ0eSA9ICEhdGhpcy5fY29sRGlmZmVyLmRpZmYodGhpcy5fY29sdW1uKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2lzRGlydHk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGNvbXBsZXRlIHdpZHRoIGRlZmluaXRpb24gZm9yIHRoZSBjb2x1bW4uXG4gICAqIFRoZXJlIGFyZSAzIHdpZHRoIGRlZmluaXRpb25zOiBNSU4tV0lEVEgsIFdJRFRIIGFuZCBNQVgtV0lEVEguXG4gICAqXG4gICAqIFRoZSB0dXBsZSByZXByZXNlbnRzIHRoZW0gaW4gdGhhdCBvcmRlciwgaS5lOiBbIE1JTi1XSURUSCwgV0lEVEgsIE1BWC1XSURUSCBdXG4gICAqL1xuICBnZXQgd2lkdGhzKCk6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSB7IHJldHVybiB0aGlzLl93aWR0aHM7IH1cblxuICAvKipcbiAgICogVGhlIGxhc3QgbmV0IHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxuICAgKi9cbiAgZ2V0IG5ldFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9uZXRXaWR0aDsgfVxuXG4gIGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICBwcm90ZWN0ZWQgX2NvbERpZmZlcjogS2V5VmFsdWVEaWZmZXI8YW55LCBhbnk+O1xuXG4gIHByaXZhdGUgX2NvbHVtbjogVDtcbiAgcHJpdmF0ZSBfaXNEaXJ0eSA9IGZhbHNlO1xuICBwcml2YXRlIF9tYXJrZWRGb3JDaGVjayA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGxldGUgd2lkdGggZGVmaW5pdGlvbiBmb3IgdGhlIGNvbHVtbi5cbiAgICogVGhlcmUgYXJlIDMgd2lkdGggZGVmaW5pdGlvbnM6IE1JTi1XSURUSCwgV0lEVEggYW5kIE1BWC1XSURUSC5cbiAgICpcbiAgICogVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhlbSBpbiB0aGF0IG9yZGVyLCBpLmU6IFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cbiAgICovXG4gIHByaXZhdGUgX3dpZHRoczogW3N0cmluZywgc3RyaW5nLCBzdHJpbmddO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBuZXQgd2lkdGggb2YgdGhlIGNvbHVtbi5cbiAgICogVGhlIG5ldCB3aWR0aCBpcyB0aGUgYWJzb2x1dGUgd2lkdGggb2YgdGhlIGNvbHVtbiwgd2l0aG91dCBwYWRkaW5nLCBib3JkZXIgZXRjLi4uXG4gICAqL1xuICBwcml2YXRlIF9uZXRXaWR0aDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZWFkb25seSBfZGlmZmVyczogS2V5VmFsdWVEaWZmZXJzLCBASW5qZWN0KEVYVF9BUElfVE9LRU4pIHByb3RlY3RlZCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPGFueT4gKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnRhYmxlID0gZXh0QXBpLnRhYmxlO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hcmtzIHRoaXMgY29sdW1uIGZvciBhIGxhenkgY2hhbmdlIGRldGVjdGlvbiBjaGVjay5cbiAgICogTGF6eSBtZWFucyBpdCB3aWxsIHJ1biB0aGUgY2hlY2sgb25seSB3aGVuIHRoZSBkaWZmIGlzIHJlcXVlc3RlZCAoaS5lLiBxdWVyeWluZyB0aGUgYGhhc0NoYW5nZWRgIHByb3BlcnR5KS5cbiAgICogVGhpcyBhbGxvdyBhZ2dyZWdhdGlvbiBvZiBjaGFuZ2VzIGJldHdlZW4gQ0QgY3ljbGVzLCBpLmUuIGNhbGxpbmcgYG1hcmtGb3JDaGVjaygpYCBtdWx0aXBsZSB0aW1lcyB3aXRoaW4gdGhlIHNhbWUgQ0QgY3ljbGUgZG9lcyBub3QgaGl0IHBlcmZvcm1hbmNlLlxuICAgKlxuICAgKiBPbmNlIG1hcmtlZCBmb3IgY2hlY2ssIGBwYmxOZ3JpZENvbHVtbkRlZmAgaGFuZGxlcyBpdCdzIGRpcnR5IChgaXNEaXJ0eWApIHN0YXRlIGF1dG9tYXRpY2FsbHksIHdoZW4gYGlzRGlydHlgIGlzIHRydWUgaXQgd2lsbCByZW1haW4gdHJ1ZSB1bnRpbCB0aGVcbiAgICogQ0QgY3ljbGUgZW5kcywgaS5lLiB1bnRpbCBgbmdEb0NoZWNrKClgIGhpdHMuIFRoaXMgbWVhbnMgdGhhdCBvbmx5IGNoaWxkcmVuIG9mIGBwYmxOZ3JpZENvbHVtbkRlZmAgY2FuIHJlbGF5IG9uIGBpc0RpcnR5YCwgYWxsIGNoaWxkcmVuIHdpbGwgcnVuIHRoZWlyXG4gICAqIGBuZ0RvQ2hlY2soKWAgYmVmb3JlIGBuZ0RvQ2hlY2soKWAgb2YgYHBibE5ncmlkQ29sdW1uRGVmYC5cbiAgICpcbiAgICogVGhpcyBpcyBhIGhvdyB3ZSBub3RpZnkgYWxsIGNlbGwgZGlyZWN0aXZlcyBhYm91dCBjaGFuZ2VzIGluIGEgY29sdW1uLiBJdCBpcyBkb25lIHRocm91Z2ggYW5ndWxhciBDRCBsb2dpYyBhbmQgZG9lcyBub3QgcmVxdWlyZSBtYW51YWxcbiAgICogQ0Qga2lja3MgYW5kIHNwZWNpYWwgY2hhbm5lbHMgYmV0d2VlbiBwYmxOZ3JpZENvbHVtbkRlZiBhbmQgaXQncyBjaGlsZHJlbi5cbiAgICovXG4gIG1hcmtGb3JDaGVjaygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NvbERpZmZlcikge1xuICAgICAgdGhpcy5fY29sRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgICAgIHRoaXMuX2NvbERpZmZlci5kaWZmKHt9KTtcbiAgICB9XG4gICAgdGhpcy5fbWFya2VkRm9yQ2hlY2sgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgd2lkdGggZGVmaW5pdGlvbnMgZm9yIHRoaXMgY29sdW1uLiBbbWluV2lkdGgsIHdpZHRoLCBtYXhXaWR0aF1cbiAgICogSWYgYW4gZWxlbWVudCBpcyBwcm92aWRlZCBpdCB3aWxsIGFsc28gYXBwbHkgdGhlIHdpZHRocyB0byB0aGUgZWxlbWVudC5cbiAgICogQHBhcmFtIHdpZHRoIFRoZSBuZXcgd2lkdGhcbiAgICogQHBhcmFtIGVsZW1lbnQgT3B0aW9uYWwsIGFuIGVsZW1lbnQgdG8gYXBwbHkgdGhlIHdpZHRoIHRvLCBpZiBub3Qgc2V0IHdpbGwgb25seSB1cGRhdGUgdGhlIHdpZHRoIGRlZmluaXRpb25zLlxuICAgKi9cbiAgdXBkYXRlV2lkdGgod2lkdGg6IHN0cmluZywgZWxlbWVudD86IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgY29uc3QgeyBpc0ZpeGVkV2lkdGggfSA9IHRoaXMuX2NvbHVtbjtcblxuICAgIC8qICBTZXR0aW5nIHRoZSBtaW5pbXVtIHdpZHRoIGlzIGJhc2VkIG9uIHRoZSBpbnB1dC5cbiAgICAgICAgSWYgdGhlIG9yaWdpbmFsIHdpZHRoIGlzIHBpeGVsIGZpeGVkIHdlIHdpbGwgdGFrZSB0aGUgbWF4aW11bSBiZXR3ZWVuIGl0IGFuZCB0aGUgbWluIHdpZHRoLlxuICAgICAgICBJZiBub3QsIHdlIHdpbGwgdGhlIHRha2UgbWluV2lkdGguXG4gICAgICAgIElmIG5vbmUgb2YgdGhlIGFib3ZlIHdvcmtlZCB3ZSB3aWxsIHRyeSB0byBzZWUgaWYgdGhlIGN1cnJlbnQgd2lkdGggaXMgc2V0IHdpdGggJSwgaWYgc28gaXQgd2lsbCBiZSBvdXIgbWluIHdpZHRoLlxuICAgICovXG4gICAgY29uc3QgbWluV2lkdGhQeCA9IGlzRml4ZWRXaWR0aFxuICAgICAgPyBNYXRoLm1heCh0aGlzLl9jb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUsIHRoaXMuX2NvbHVtbi5taW5XaWR0aCB8fCAwKVxuICAgICAgOiB0aGlzLl9jb2x1bW4ubWluV2lkdGhcbiAgICA7XG5cbiAgICBsZXQgbWluV2lkdGggPSBtaW5XaWR0aFB4ICYmIGAke21pbldpZHRoUHh9cHhgO1xuICAgIGlmICghbWluV2lkdGgpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlU3R5bGVXaWR0aCh3aWR0aCk7XG4gICAgICBpZiAocGFyc2VkICYmIHBhcnNlZC50eXBlID09PSAnJScpIHtcbiAgICAgICAgbWluV2lkdGggPSB3aWR0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtYXhXaWR0aCA9IGlzRml4ZWRXaWR0aFxuICAgICAgPyBNYXRoLm1pbih0aGlzLl9jb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUsIHRoaXMuX2NvbHVtbi5tYXhXaWR0aCB8fCB0aGlzLl9jb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUpXG4gICAgICA6IHRoaXMuX2NvbHVtbi5tYXhXaWR0aFxuICAgIDtcblxuICAgIHRoaXMuX3dpZHRocyA9IFttaW5XaWR0aCB8fCAnJywgIHdpZHRoLCBtYXhXaWR0aCA/IGAke21heFdpZHRofXB4YCA6IHdpZHRoXTtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgdGhpcy5hcHBseVdpZHRoKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgY3VycmVudCB3aWR0aCBkZWZpbml0aW9ucyAobWluV2lkdGgsIHdpZHRoLCBtYXhXaWR0aCkgb250byB0aGUgZWxlbWVudC5cbiAgICovXG4gIGFwcGx5V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBzZXRXaWR0aChlbGVtZW50LCB0aGlzLndpZHRocyk7XG4gIH1cblxuICAvKipcbiAgICogUXVlcnkgZm9yIGNlbGwgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbHVtbiBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBUaGlzIHF1ZXJ5IGlzIG5vdCBjYWNoZWQgLSBjYWNoZSBpbiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIHF1ZXJ5Q2VsbEVsZW1lbnRzKC4uLmZpbHRlcjogQXJyYXk8J3RhYmxlJyB8ICdoZWFkZXInIHwgJ2hlYWRlckdyb3VwJyB8ICdmb290ZXInIHwgJ2Zvb3Rlckdyb3VwJz4pOiBIVE1MRWxlbWVudFtdIHtcbiAgICBjb25zdCBjc3NJZCA9IGAuJHt1bmlxdWVDb2x1bW5Dc3ModGhpcyl9YDtcblxuICAgIGNvbnN0IHF1ZXJ5OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKGZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXJ5LnB1c2goY3NzSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGYgb2YgZmlsdGVyKSB7XG4gICAgICAgIHN3aXRjaCAoZikge1xuICAgICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1oZWFkZXItY2VsbCR7Y3NzSWR9Om5vdCgucGJsLWhlYWRlci1ncm91cC1jZWxsKWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJHcm91cCc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtaGVhZGVyLWdyb3VwLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWZvb3Rlci1jZWxsJHtjc3NJZH06bm90KC5wYmwtZm9vdGVyLWdyb3VwLWNlbGwpYCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zvb3Rlckdyb3VwJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1mb290ZXItZ3JvdXAtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHdlIHF1ZXJ5IGZyb20gdGhlIG1hc3RlciB0YWJsZSBjb250YWluZXIgYW5kIG5vdCBDREtUYWJsZSBiZWNhdXNlIG9mIGZpeGVkIG1ldGEgcm93c1xuICAgIHJldHVybiBxdWVyeS5sZW5ndGggPT09IDAgPyBbXSA6IEFycmF5LmZyb20odGhpcy5leHRBcGkuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5LmpvaW4oJywgJykpKSBhcyBhbnk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNEaXJ0eSkge1xuICAgICAgdGhpcy5faXNEaXJ0eSA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7IHRoaXMuZGV0YWNoKCk7IH1cblxuICBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAoaXNQYmxDb2x1bW4odGhpcy5jb2x1bW4pKSB7XG4gICAgICBjb25zdCBwcmV2TmV0V2lkdGggPSB0aGlzLl9uZXRXaWR0aDtcbiAgICAgIHRoaXMuX25ldFdpZHRoID0gdGhpcy5leHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpLndpZHRoQnJlYWtvdXQodGhpcy5jb2x1bW4uc2l6ZUluZm8pLmNvbnRlbnQ7XG5cbiAgICAgIGlmIChwcmV2TmV0V2lkdGggJiYgcHJldk5ldFdpZHRoICE9PSB0aGlzLl9uZXRXaWR0aCkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGAke3RoaXMuX25ldFdpZHRofXB4YDtcbiAgICAgICAgdGhpcy5fd2lkdGhzID0gW1xuICAgICAgICAgIHRoaXMud2lkdGhzWzBdIHx8IHdpZHRoLCAgLy8gbWluXG4gICAgICAgICAgd2lkdGgsICAgICAgICAgICAgICAgICAgICAvLyB3aWR0aFxuICAgICAgICAgIHdpZHRoLCAgICAgICAgICAgICAgICAgICAgLy8gbWF4XG4gICAgICAgIF07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGluKHBpbj86ICdzdGFydCcgfCAnZW5kJyk6IHZvaWQge1xuICAgIHRoaXMuc3RpY2t5ID0gdGhpcy5zdGlja3lFbmQgPSBmYWxzZTtcbiAgICBzd2l0Y2gocGluKSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHRoaXMuc3RpY2t5ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLnN0aWNreUVuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoKGNvbHVtbjogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4gIT09IGNvbHVtbikge1xuICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgICAgICAoY29sdW1uIGFzIGFueSkuYXR0YWNoKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSBjb2x1bW4uaWQucmVwbGFjZSgvIC9nLCAnXycpO1xuXG4gICAgICAgIGlmIChpc1BibENvbHVtbihjb2x1bW4pKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQaW4oY29sdW1uLnBpbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2NvbERpZmZlcikge1xuICAgICAgICB0aGlzLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4pIHtcbiAgICAgIHRoaXMuX2NvbHVtbi5kZXRhY2goKTtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHdpZHRocyBvZiBhbiBIVE1MRWxlbWVudFxuICogQHBhcmFtIGVsIFRoZSBlbGVtZW50IHRvIHNldCB3aWR0aHMgdG9cbiAqIEBwYXJhbSB3aWR0aHMgVGhlIHdpZHRocywgYSB0dXBsZSBvZiAzIHN0cmluZ3MgWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICovXG5mdW5jdGlvbiBzZXRXaWR0aChlbDogSFRNTEVsZW1lbnQsIHdpZHRoczogW3N0cmluZywgc3RyaW5nLCBzdHJpbmddKSB7XG4gIGVsLnN0eWxlLm1pbldpZHRoID0gd2lkdGhzWzBdO1xuICBlbC5zdHlsZS53aWR0aCA9IHdpZHRoc1sxXTtcbiAgZWwuc3R5bGUubWF4V2lkdGggPSB3aWR0aHNbMl07XG5cbiAgLy8gVE9ETyhzaGxvbWlhc3NhZilbcGVyZiwgNF06IEluc3RlYWQgb2YgdXNpbmcgYSB0dXBsZSBmb3Igd2lkdGgsIHVzZSBhIENTU1N0eWxlRGVjbGFyYXRpb24gb2JqZWN0IGFuZCBqdXN0IGFzc2lnbiB0aGUgcHJvcHNcbiAgLy8gVGhpcyB3aWxsIGF2b2lkIHRoZSBhZGRpdGlvbmFsIGNoZWNrIGZvciAlXG4gIC8vIFdlIHdpbGwgbmVlZCB0byBpbXBsZW1lbnQgaXQgaW4gYWxsIHBsYWNlcyB0aGF0IGBfd2lkdGhzYCBpcyB1cGRhdGVkIGluIGBQYmxOZ3JpZENvbHVtbkRlZmBcbiAgLy8gQW5vdGhlciBUT0RPIGlzIHRvIGNhY2hlIHRoZSBwcmV2aW91cyBgYm94U2l6aW5nYCBpbiBhbnkgY2FzZSB0aGUgY29sdW1uIGRlZmluaXRpb24gY2hhbmdlcy5cblxuICAvLyBXaGVuIHRoZSBjb2x1bW4gZG9lcyBub3QgaGF2ZSBhbiBleHBsaWNpdCBgbWluV2lkdGhgIHNldCBhbmQgd2hlbiB0aGUgYHdpZHRoYCBpcyBzZXQgZXhwbGljaXRseSB0byBhICUgdmFsdWVcbiAgLy8gdGhlIGxvZ2ljIGluIGBQYmxOZ3JpZENvbHVtbkRlZi51cGRhdGVXaWR0aGAgd2lsbCBzZXQgYG1pbldpZHRoYCB0byB0aGUgc2FtZSB2YWx1ZSBpbiBgd2lkdGhgXG4gIC8vIFRoaXMgd2lsbCBjYXVzZSBhbiBvdmVyZmxvdyB1bmxlc3Mgd2UgYXBwbHkgdGhlIGJvcmRlci1ib3ggbW9kZWxcbiAgaWYgKHdpZHRoc1swXSAmJiB3aWR0aHNbMF0uZW5kc1dpdGgoJyUnKSkge1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgfVxufVxuIl19