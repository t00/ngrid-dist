/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/column-def.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-class-suffix
import { Directive, Input, Inject, Output, EventEmitter, } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { isPblColumn } from '../columns/column';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
import { uniqueColumnCss } from '../circular-dep-bridge';
import { widthBreakout } from '../col-width-logic/dynamic-column-width';
/**
 * @record
 */
export function WidthChangeEvent() { }
if (false) {
    /** @type {?} */
    WidthChangeEvent.prototype.reason;
}
/**
 * Represents a runtime column definition for a user-defined column definitions.
 *
 * User defined column definitions are `PblColumn`, `PblMetaColumn`, `PblColumnGroup` etc...
 * They represent static column definitions and `PblNgridColumnDef` is the runtime instance of them.
 *
 * @template T
 */
export class PblNgridColumnDef extends CdkColumnDef {
    /**
     * @param {?} extApi
     */
    constructor(extApi) {
        super();
        this.extApi = extApi;
        this.isDragging = false;
        /**
         * An event emitted when width of this column has changed.
         */
        this.widthChange = new EventEmitter();
        /**
         * The complete width definition for the column.
         *
         * There are 2 width sets (tuple):
         * - [0]: The source width definitions as set in static column definition instance
         * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
         *
         * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         */
        this._widths = [];
        this.grid = this.table = extApi.grid;
        /** @type {?} */
        const s = extApi.dynamicColumnWidthFactory().strategy;
        this.widthBreakout = (/**
         * @param {?} c
         * @return {?}
         */
        c => widthBreakout(s, c));
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
     * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
     * If no measurements exists yet, return the user defined width's.
     *
     * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
     * @return {?}
     */
    get widths() { return this._widths[1]; }
    /**
     * The last net width of the column.
     * The net width is the absolute width of the column, without padding, border etc...
     * @return {?}
     */
    get netWidth() { return this._netWidth; }
    /**
     * Update the "widths" for this column and when width has changed.
     *
     * The "widths" are the 3 values representing a width of a cell: [minWidth, width, maxWidth],
     * this method is given the width and will calculate the minWidth and maxWidth based on the column definitions.
     *
     * If at least one value of "widths" has changed, fires the `widthChange` event with the `reason` provided.
     *
     * The reason can be used to optionally update the relevant cells, based on the source (reason) of the update.
     * - attach: This runtime column definition instance was attached to a static column definition instance.
     * - update: The width value was updated in the static column definition instance , which triggered a width update to the runtime column definition instance
     * - resize: A resize event to the header PblColumn cell was triggered, the width of the static column definition is not updated, only the runtime value is.
     *
     * Note that this updates the width of the column-def instance, not the column definitions width itself.
     * Only when `reason === 'update'` it means that the column definition was updated and triggered this update
     *
     * @param {?} width The new width
     * @param {?} reason The reason for this change
     * @return {?}
     */
    updateWidth(width, reason) {
        const { isFixedWidth, parsedWidth } = this._column;
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
        if (!minWidth && parsedWidth && parsedWidth.type === '%') {
            minWidth = width;
        }
        /** @type {?} */
        const maxWidth = isFixedWidth
            ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
            : this._column.maxWidth;
        /** @type {?} */
        const newWidths = (/** @type {?} */ ([minWidth || '', width, maxWidth ? `${maxWidth}px` : width]));
        if (reason === 'resize') {
            this._widths[1] = newWidths;
            this.widthChange.emit({ reason });
        }
        else {
            /** @type {?} */
            const prev = this._widths[0] || [];
            this._widths[0] = newWidths;
            if (!this._widths[1]) {
                this._widths[1] = newWidths;
            }
            for (let i = 0; i < 3; i++) {
                if (prev[i] !== newWidths[i]) {
                    this.widthChange.emit({ reason });
                    break;
                }
            }
        }
    }
    /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     * @param {?} element
     * @return {?}
     */
    applyWidth(element) { setWidth(element, this.widths); }
    /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     * @param {?} element
     * @return {?}
     */
    applySourceWidth(element) { setWidth(element, this._widths[0]); }
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
    ngOnDestroy() {
        this.detach();
        this.widthChange.complete();
    }
    /**
     * @return {?}
     */
    onResize() {
        if (isPblColumn(this.column)) {
            /** @type {?} */
            const prevNetWidth = this._netWidth;
            this._netWidth = this.widthBreakout(this.column.sizeInfo).content;
            if (prevNetWidth !== this._netWidth) {
                /** @type {?} */
                const width = `${this._netWidth}px`;
                this.updateWidth(width, 'resize');
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
        if (this.grid.isInit) {
            this.grid._cdkTable.updateStickyColumnStyles();
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
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
];
PblNgridColumnDef.propDecorators = {
    column: [{ type: Input, args: ['pblNgridColumnDef',] }],
    widthChange: [{ type: Output, args: ['pblNgridColumnDefWidthChange',] }]
};
if (false) {
    /** @type {?} */
    PblNgridColumnDef.prototype.isDragging;
    /**
     * @deprecated use grid instead
     * @type {?}
     */
    PblNgridColumnDef.prototype.table;
    /** @type {?} */
    PblNgridColumnDef.prototype.grid;
    /**
     * An event emitted when width of this column has changed.
     * @type {?}
     */
    PblNgridColumnDef.prototype.widthChange;
    /**
     * @type {?}
     * @private
     */
    PblNgridColumnDef.prototype._column;
    /**
     * The complete width definition for the column.
     *
     * There are 2 width sets (tuple):
     * - [0]: The source width definitions as set in static column definition instance
     * - [1]: The absolute width definitions, as currently set in the DOM (getBoundingClientRect())
     *
     * Each set is made up of 3 primitive width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
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
     * @private
     */
    PblNgridColumnDef.prototype.widthBreakout;
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
    else {
        el.style.boxSizing = 'content-box';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NvbHVtbi1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBT3hFLHNDQUVDOzs7SUFEQyxrQ0FBMEI7Ozs7Ozs7Ozs7QUFpQjVCLE1BQU0sT0FBTyxpQkFBNkMsU0FBUSxZQUFZOzs7O0lBbUQ1RSxZQUE2QyxNQUFpQztRQUM1RSxLQUFLLEVBQUUsQ0FBQztRQURtQyxXQUFNLEdBQU4sTUFBTSxDQUEyQjtRQWpDOUUsZUFBVSxHQUFHLEtBQUssQ0FBQzs7OztRQVNxQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDOzs7Ozs7Ozs7OztRQWNuRixZQUFPLEdBQTJCLEVBQUUsQ0FBQztRQVkzQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7Y0FFL0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLFFBQVE7UUFDckQsSUFBSSxDQUFDLGFBQWE7Ozs7UUFBRyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQztJQUNo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QUFTLFFBQVEsQ0FBQyxFQUFlLEVBQUUsTUFBZ0I7SUFDakQsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUIsNkhBQTZIO0lBQzdILDZDQUE2QztJQUM3Qyw4RkFBOEY7SUFDOUYsK0ZBQStGO0lBRS9GLCtHQUErRztJQUMvRyxnR0FBZ0c7SUFDaEcsbUVBQW1FO0lBQ25FLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDeEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0tBQ25DO1NBQU07UUFDTCxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7S0FDcEM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4vLyB0c2xpbnQ6ZGlzYWJsZTpkaXJlY3RpdmUtY2xhc3Mtc3VmZml4XG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrQ29sdW1uRGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcblxuaW1wb3J0IHsgQ09MVU1OIH0gZnJvbSAnLi4vY29sdW1ucyc7XG5pbXBvcnQgeyBpc1BibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyB1bmlxdWVDb2x1bW5Dc3MgfSBmcm9tICcuLi9jaXJjdWxhci1kZXAtYnJpZGdlJztcbmltcG9ydCB7IHdpZHRoQnJlYWtvdXQgfSBmcm9tICcuLi9jb2wtd2lkdGgtbG9naWMvZHluYW1pYy1jb2x1bW4td2lkdGgnO1xuaW1wb3J0IHsgUGJsQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCB0eXBlIFVwZGF0ZVdpZHRoUmVhc29uID0gJ2F0dGFjaCcgfCAndXBkYXRlJyB8ICdyZXNpemUnO1xuXG5leHBvcnQgdHlwZSBXaWR0aFNldCA9IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXTtcblxuZXhwb3J0IGludGVyZmFjZSBXaWR0aENoYW5nZUV2ZW50IHtcbiAgcmVhc29uOiBVcGRhdGVXaWR0aFJlYXNvbjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcnVudGltZSBjb2x1bW4gZGVmaW5pdGlvbiBmb3IgYSB1c2VyLWRlZmluZWQgY29sdW1uIGRlZmluaXRpb25zLlxuICpcbiAqIFVzZXIgZGVmaW5lZCBjb2x1bW4gZGVmaW5pdGlvbnMgYXJlIGBQYmxDb2x1bW5gLCBgUGJsTWV0YUNvbHVtbmAsIGBQYmxDb2x1bW5Hcm91cGAgZXRjLi4uXG4gKiBUaGV5IHJlcHJlc2VudCBzdGF0aWMgY29sdW1uIGRlZmluaXRpb25zIGFuZCBgUGJsTmdyaWRDb2x1bW5EZWZgIGlzIHRoZSBydW50aW1lIGluc3RhbmNlIG9mIHRoZW0uXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDb2x1bW5EZWZdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtDb2x1bW5EZWYsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRlZiB9LFxuICAgIHsgcHJvdmlkZTogJ01BVF9TT1JUX0hFQURFUl9DT0xVTU5fREVGJywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uRGVmIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb2x1bW5EZWY8VCBleHRlbmRzIENPTFVNTiA9IENPTFVNTj4gZXh0ZW5kcyBDZGtDb2x1bW5EZWYgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3BibE5ncmlkQ29sdW1uRGVmJykgZ2V0IGNvbHVtbigpOiBUIHsgcmV0dXJuIHRoaXMuX2NvbHVtbjsgfTtcbiAgc2V0IGNvbHVtbih2YWx1ZTogVCkgeyB0aGlzLmF0dGFjaCh2YWx1ZSk7IH1cblxuICAvKipcbiAgICogVGhlIGFic29sdXRlIHdpZHRoIGRlZmluaXRpb25zLCBhcyBjdXJyZW50bHkgc2V0IGluIHRoZSBET00gKGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKS5cbiAgICogSWYgbm8gbWVhc3VyZW1lbnRzIGV4aXN0cyB5ZXQsIHJldHVybiB0aGUgdXNlciBkZWZpbmVkIHdpZHRoJ3MuXG4gICAqXG4gICAqIFRoZSB0dXBsZSByZXByZXNlbnRzIHRoZW0gaW4gdGhhdCBvcmRlciwgaS5lOiBbIE1JTi1XSURUSCwgV0lEVEgsIE1BWC1XSURUSCBdXG4gICAqL1xuICBnZXQgd2lkdGhzKCk6IFdpZHRoU2V0IHsgcmV0dXJuIHRoaXMuX3dpZHRoc1sxXTsgfVxuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBuZXQgd2lkdGggb2YgdGhlIGNvbHVtbi5cbiAgICogVGhlIG5ldCB3aWR0aCBpcyB0aGUgYWJzb2x1dGUgd2lkdGggb2YgdGhlIGNvbHVtbiwgd2l0aG91dCBwYWRkaW5nLCBib3JkZXIgZXRjLi4uXG4gICAqL1xuICBnZXQgbmV0V2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX25ldFdpZHRoOyB9XG5cbiAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIHJlYWRvbmx5IHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICAvKipcbiAgICogQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHdpZHRoIG9mIHRoaXMgY29sdW1uIGhhcyBjaGFuZ2VkLlxuICAgKi9cbiAgQE91dHB1dCgncGJsTmdyaWRDb2x1bW5EZWZXaWR0aENoYW5nZScpIHdpZHRoQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxXaWR0aENoYW5nZUV2ZW50PigpO1xuXG4gIHByaXZhdGUgX2NvbHVtbjogVDtcblxuICAvKipcbiAgICogVGhlIGNvbXBsZXRlIHdpZHRoIGRlZmluaXRpb24gZm9yIHRoZSBjb2x1bW4uXG4gICAqXG4gICAqIFRoZXJlIGFyZSAyIHdpZHRoIHNldHMgKHR1cGxlKTpcbiAgICogLSBbMF06IFRoZSBzb3VyY2Ugd2lkdGggZGVmaW5pdGlvbnMgYXMgc2V0IGluIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZVxuICAgKiAtIFsxXTogVGhlIGFic29sdXRlIHdpZHRoIGRlZmluaXRpb25zLCBhcyBjdXJyZW50bHkgc2V0IGluIHRoZSBET00gKGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKVxuICAgKlxuICAgKiBFYWNoIHNldCBpcyBtYWRlIHVwIG9mIDMgcHJpbWl0aXZlIHdpZHRoIGRlZmluaXRpb25zOiBNSU4tV0lEVEgsIFdJRFRIIGFuZCBNQVgtV0lEVEguXG4gICAqIFRoZSB0dXBsZSByZXByZXNlbnRzIHRoZW0gaW4gdGhhdCBvcmRlciwgaS5lOiBbIE1JTi1XSURUSCwgV0lEVEgsIE1BWC1XSURUSCBdXG4gICAqL1xuICBwcml2YXRlIF93aWR0aHM6IFtXaWR0aFNldD8sIFdpZHRoU2V0P10gPSBbXTtcblxuICAvKipcbiAgICogVGhlIGxhc3QgbmV0IHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxuICAgKi9cbiAgcHJpdmF0ZSBfbmV0V2lkdGg6IG51bWJlcjtcblxuICBwcml2YXRlIHdpZHRoQnJlYWtvdXQ6IChjb2x1bW5JbmZvOiBQYmxDb2x1bW5TaXplSW5mbykgPT4gUmV0dXJuVHlwZTx0eXBlb2Ygd2lkdGhCcmVha291dD47XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChFWFRfQVBJX1RPS0VOKSBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmdyaWQgPSB0aGlzLnRhYmxlID0gZXh0QXBpLmdyaWQ7XG5cbiAgICBjb25zdCBzID0gZXh0QXBpLmR5bmFtaWNDb2x1bW5XaWR0aEZhY3RvcnkoKS5zdHJhdGVneTtcbiAgICB0aGlzLndpZHRoQnJlYWtvdXQgPSBjID0+IHdpZHRoQnJlYWtvdXQocywgYyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBcIndpZHRoc1wiIGZvciB0aGlzIGNvbHVtbiBhbmQgd2hlbiB3aWR0aCBoYXMgY2hhbmdlZC5cbiAgICpcbiAgICogVGhlIFwid2lkdGhzXCIgYXJlIHRoZSAzIHZhbHVlcyByZXByZXNlbnRpbmcgYSB3aWR0aCBvZiBhIGNlbGw6IFttaW5XaWR0aCwgd2lkdGgsIG1heFdpZHRoXSxcbiAgICogdGhpcyBtZXRob2QgaXMgZ2l2ZW4gdGhlIHdpZHRoIGFuZCB3aWxsIGNhbGN1bGF0ZSB0aGUgbWluV2lkdGggYW5kIG1heFdpZHRoIGJhc2VkIG9uIHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gICAqXG4gICAqIElmIGF0IGxlYXN0IG9uZSB2YWx1ZSBvZiBcIndpZHRoc1wiIGhhcyBjaGFuZ2VkLCBmaXJlcyB0aGUgYHdpZHRoQ2hhbmdlYCBldmVudCB3aXRoIHRoZSBgcmVhc29uYCBwcm92aWRlZC5cbiAgICpcbiAgICogVGhlIHJlYXNvbiBjYW4gYmUgdXNlZCB0byBvcHRpb25hbGx5IHVwZGF0ZSB0aGUgcmVsZXZhbnQgY2VsbHMsIGJhc2VkIG9uIHRoZSBzb3VyY2UgKHJlYXNvbikgb2YgdGhlIHVwZGF0ZS5cbiAgICogLSBhdHRhY2g6IFRoaXMgcnVudGltZSBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZSB3YXMgYXR0YWNoZWQgdG8gYSBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2UuXG4gICAqIC0gdXBkYXRlOiBUaGUgd2lkdGggdmFsdWUgd2FzIHVwZGF0ZWQgaW4gdGhlIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZSAsIHdoaWNoIHRyaWdnZXJlZCBhIHdpZHRoIHVwZGF0ZSB0byB0aGUgcnVudGltZSBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZVxuICAgKiAtIHJlc2l6ZTogQSByZXNpemUgZXZlbnQgdG8gdGhlIGhlYWRlciBQYmxDb2x1bW4gY2VsbCB3YXMgdHJpZ2dlcmVkLCB0aGUgd2lkdGggb2YgdGhlIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpcyBub3QgdXBkYXRlZCwgb25seSB0aGUgcnVudGltZSB2YWx1ZSBpcy5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgdXBkYXRlcyB0aGUgd2lkdGggb2YgdGhlIGNvbHVtbi1kZWYgaW5zdGFuY2UsIG5vdCB0aGUgY29sdW1uIGRlZmluaXRpb25zIHdpZHRoIGl0c2VsZi5cbiAgICogT25seSB3aGVuIGByZWFzb24gPT09ICd1cGRhdGUnYCBpdCBtZWFucyB0aGF0IHRoZSBjb2x1bW4gZGVmaW5pdGlvbiB3YXMgdXBkYXRlZCBhbmQgdHJpZ2dlcmVkIHRoaXMgdXBkYXRlXG4gICAqXG4gICAqIEBwYXJhbSB3aWR0aCBUaGUgbmV3IHdpZHRoXG4gICAqIEBwYXJhbSByZWFzb24gVGhlIHJlYXNvbiBmb3IgdGhpcyBjaGFuZ2VcbiAgICovXG4gIHVwZGF0ZVdpZHRoKHdpZHRoOiBzdHJpbmcsIHJlYXNvbjogVXBkYXRlV2lkdGhSZWFzb24pOiB2b2lkIHtcbiAgICBjb25zdCB7IGlzRml4ZWRXaWR0aCwgcGFyc2VkV2lkdGggfSA9IHRoaXMuX2NvbHVtbjtcblxuICAgIC8qICBTZXR0aW5nIHRoZSBtaW5pbXVtIHdpZHRoIGlzIGJhc2VkIG9uIHRoZSBpbnB1dC5cbiAgICAgICAgSWYgdGhlIG9yaWdpbmFsIHdpZHRoIGlzIHBpeGVsIGZpeGVkIHdlIHdpbGwgdGFrZSB0aGUgbWF4aW11bSBiZXR3ZWVuIGl0IGFuZCB0aGUgbWluIHdpZHRoLlxuICAgICAgICBJZiBub3QsIHdlIHdpbGwgdGhlIHRha2UgbWluV2lkdGguXG4gICAgICAgIElmIG5vbmUgb2YgdGhlIGFib3ZlIHdvcmtlZCB3ZSB3aWxsIHRyeSB0byBzZWUgaWYgdGhlIGN1cnJlbnQgd2lkdGggaXMgc2V0IHdpdGggJSwgaWYgc28gaXQgd2lsbCBiZSBvdXIgbWluIHdpZHRoLlxuICAgICovXG4gICAgY29uc3QgbWluV2lkdGhQeCA9IGlzRml4ZWRXaWR0aFxuICAgICAgPyBNYXRoLm1heCh0aGlzLl9jb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUsIHRoaXMuX2NvbHVtbi5taW5XaWR0aCB8fCAwKVxuICAgICAgOiB0aGlzLl9jb2x1bW4ubWluV2lkdGhcbiAgICA7XG5cbiAgICBsZXQgbWluV2lkdGggPSBtaW5XaWR0aFB4ICYmIGAke21pbldpZHRoUHh9cHhgO1xuICAgIGlmICghbWluV2lkdGggJiYgcGFyc2VkV2lkdGggJiYgcGFyc2VkV2lkdGgudHlwZSA9PT0gJyUnKSB7XG4gICAgICBtaW5XaWR0aCA9IHdpZHRoO1xuICAgIH1cblxuICAgIGNvbnN0IG1heFdpZHRoID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWluKHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1heFdpZHRoIHx8IHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSlcbiAgICAgIDogdGhpcy5fY29sdW1uLm1heFdpZHRoXG4gICAgO1xuXG4gICAgY29uc3QgbmV3V2lkdGhzID0gW21pbldpZHRoIHx8ICcnLCAgd2lkdGgsIG1heFdpZHRoID8gYCR7bWF4V2lkdGh9cHhgIDogd2lkdGhdIGFzIFdpZHRoU2V0O1xuICAgIGlmIChyZWFzb24gPT09ICdyZXNpemUnKSB7XG4gICAgICB0aGlzLl93aWR0aHNbMV0gPSBuZXdXaWR0aHM7XG4gICAgICB0aGlzLndpZHRoQ2hhbmdlLmVtaXQoeyByZWFzb24gfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl93aWR0aHNbMF0gfHwgW107XG4gICAgICB0aGlzLl93aWR0aHNbMF0gPSBuZXdXaWR0aHM7XG4gICAgICBpZiAoIXRoaXMuX3dpZHRoc1sxXSkge1xuICAgICAgICB0aGlzLl93aWR0aHNbMV0gPSBuZXdXaWR0aHM7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBpZiAocHJldltpXSAhPT0gbmV3V2lkdGhzW2ldKSB7XG4gICAgICAgICAgdGhpcy53aWR0aENoYW5nZS5lbWl0KHsgcmVhc29uIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBjdXJyZW50IGFic29sdXRlIHdpZHRoIGRlZmluaXRpb25zIChtaW5XaWR0aCwgd2lkdGgsIG1heFdpZHRoKSBvbnRvIGFuIGVsZW1lbnQuXG4gICAqL1xuICBhcHBseVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7IHNldFdpZHRoKGVsZW1lbnQsIHRoaXMud2lkdGhzKTsgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgc291cmNlIHdpZHRoIGRlZmluaXRpb25zIClzZXQgaW4gc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlKSBvbnRvIGFuIGVsZW1lbnQuXG4gICAqL1xuICBhcHBseVNvdXJjZVdpZHRoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7IHNldFdpZHRoKGVsZW1lbnQsIHRoaXMuX3dpZHRoc1swXSk7IH1cblxuICAvKipcbiAgICogUXVlcnkgZm9yIGNlbGwgZWxlbWVudHMgcmVsYXRlZCB0byB0aGlzIGNvbHVtbiBkZWZpbml0aW9uLlxuICAgKlxuICAgKiBUaGlzIHF1ZXJ5IGlzIG5vdCBjYWNoZWQgLSBjYWNoZSBpbiBpbXBsZW1lbnRhdGlvbi5cbiAgICovXG4gIHF1ZXJ5Q2VsbEVsZW1lbnRzKC4uLmZpbHRlcjogQXJyYXk8J3RhYmxlJyB8ICdoZWFkZXInIHwgJ2hlYWRlckdyb3VwJyB8ICdmb290ZXInIHwgJ2Zvb3Rlckdyb3VwJz4pOiBIVE1MRWxlbWVudFtdIHtcbiAgICBjb25zdCBjc3NJZCA9IGAuJHt1bmlxdWVDb2x1bW5Dc3ModGhpcyl9YDtcblxuICAgIGNvbnN0IHF1ZXJ5OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKGZpbHRlci5sZW5ndGggPT09IDApIHtcbiAgICAgIHF1ZXJ5LnB1c2goY3NzSWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGYgb2YgZmlsdGVyKSB7XG4gICAgICAgIHN3aXRjaCAoZikge1xuICAgICAgICAgIGNhc2UgJ3RhYmxlJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1oZWFkZXItY2VsbCR7Y3NzSWR9Om5vdCgucGJsLWhlYWRlci1ncm91cC1jZWxsKWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXJHcm91cCc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtaGVhZGVyLWdyb3VwLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWZvb3Rlci1jZWxsJHtjc3NJZH06bm90KC5wYmwtZm9vdGVyLWdyb3VwLWNlbGwpYCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zvb3Rlckdyb3VwJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1mb290ZXItZ3JvdXAtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHdlIHF1ZXJ5IGZyb20gdGhlIG1hc3RlciB0YWJsZSBjb250YWluZXIgYW5kIG5vdCBDREtUYWJsZSBiZWNhdXNlIG9mIGZpeGVkIG1ldGEgcm93c1xuICAgIHJldHVybiBxdWVyeS5sZW5ndGggPT09IDAgPyBbXSA6IEFycmF5LmZyb20odGhpcy5leHRBcGkuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5LmpvaW4oJywgJykpKSBhcyBhbnk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgdGhpcy53aWR0aENoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7XG4gICAgaWYgKGlzUGJsQ29sdW1uKHRoaXMuY29sdW1uKSkge1xuICAgICAgY29uc3QgcHJldk5ldFdpZHRoID0gdGhpcy5fbmV0V2lkdGg7XG4gICAgICB0aGlzLl9uZXRXaWR0aCA9IHRoaXMud2lkdGhCcmVha291dCh0aGlzLmNvbHVtbi5zaXplSW5mbykuY29udGVudDtcblxuICAgICAgaWYgKHByZXZOZXRXaWR0aCAhPT0gdGhpcy5fbmV0V2lkdGgpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBgJHt0aGlzLl9uZXRXaWR0aH1weGA7XG4gICAgICAgIHRoaXMudXBkYXRlV2lkdGgod2lkdGgsICdyZXNpemUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVQaW4ocGluPzogJ3N0YXJ0JyB8ICdlbmQnKTogdm9pZCB7XG4gICAgdGhpcy5zdGlja3kgPSB0aGlzLnN0aWNreUVuZCA9IGZhbHNlO1xuICAgIHN3aXRjaChwaW4pIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5zdGlja3kgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgIHRoaXMuc3RpY2t5RW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLmdyaWQuaXNJbml0KSB7XG4gICAgICB0aGlzLmdyaWQuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoKGNvbHVtbjogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4gIT09IGNvbHVtbikge1xuICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgICAgICAoY29sdW1uIGFzIGFueSkuYXR0YWNoKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSBjb2x1bW4uaWQucmVwbGFjZSgvIC9nLCAnXycpO1xuXG4gICAgICAgIGlmIChpc1BibENvbHVtbihjb2x1bW4pKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQaW4oY29sdW1uLnBpbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGFjaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY29sdW1uKSB7XG4gICAgICB0aGlzLl9jb2x1bW4uZGV0YWNoKCk7XG4gICAgICB0aGlzLl9jb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSB3aWR0aHMgb2YgYW4gSFRNTEVsZW1lbnRcbiAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudCB0byBzZXQgd2lkdGhzIHRvXG4gKiBAcGFyYW0gd2lkdGhzIFRoZSB3aWR0aHMsIGEgdHVwbGUgb2YgMyBzdHJpbmdzIFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cbiAqL1xuZnVuY3Rpb24gc2V0V2lkdGgoZWw6IEhUTUxFbGVtZW50LCB3aWR0aHM6IFdpZHRoU2V0KSB7XG4gIGVsLnN0eWxlLm1pbldpZHRoID0gd2lkdGhzWzBdO1xuICBlbC5zdHlsZS53aWR0aCA9IHdpZHRoc1sxXTtcbiAgZWwuc3R5bGUubWF4V2lkdGggPSB3aWR0aHNbMl07XG5cbiAgLy8gVE9ETyhzaGxvbWlhc3NhZilbcGVyZiwgNF06IEluc3RlYWQgb2YgdXNpbmcgYSB0dXBsZSBmb3Igd2lkdGgsIHVzZSBhIENTU1N0eWxlRGVjbGFyYXRpb24gb2JqZWN0IGFuZCBqdXN0IGFzc2lnbiB0aGUgcHJvcHNcbiAgLy8gVGhpcyB3aWxsIGF2b2lkIHRoZSBhZGRpdGlvbmFsIGNoZWNrIGZvciAlXG4gIC8vIFdlIHdpbGwgbmVlZCB0byBpbXBsZW1lbnQgaXQgaW4gYWxsIHBsYWNlcyB0aGF0IGBfd2lkdGhzYCBpcyB1cGRhdGVkIGluIGBQYmxOZ3JpZENvbHVtbkRlZmBcbiAgLy8gQW5vdGhlciBUT0RPIGlzIHRvIGNhY2hlIHRoZSBwcmV2aW91cyBgYm94U2l6aW5nYCBpbiBhbnkgY2FzZSB0aGUgY29sdW1uIGRlZmluaXRpb24gY2hhbmdlcy5cblxuICAvLyBXaGVuIHRoZSBjb2x1bW4gZG9lcyBub3QgaGF2ZSBhbiBleHBsaWNpdCBgbWluV2lkdGhgIHNldCBhbmQgd2hlbiB0aGUgYHdpZHRoYCBpcyBzZXQgZXhwbGljaXRseSB0byBhICUgdmFsdWVcbiAgLy8gdGhlIGxvZ2ljIGluIGBQYmxOZ3JpZENvbHVtbkRlZi51cGRhdGVXaWR0aGAgd2lsbCBzZXQgYG1pbldpZHRoYCB0byB0aGUgc2FtZSB2YWx1ZSBpbiBgd2lkdGhgXG4gIC8vIFRoaXMgd2lsbCBjYXVzZSBhbiBvdmVyZmxvdyB1bmxlc3Mgd2UgYXBwbHkgdGhlIGJvcmRlci1ib3ggbW9kZWxcbiAgaWYgKHdpZHRoc1swXSAmJiB3aWR0aHNbMF0uZW5kc1dpdGgoJyUnKSkge1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgfSBlbHNlIHtcbiAgICBlbC5zdHlsZS5ib3hTaXppbmcgPSAnY29udGVudC1ib3gnO1xuICB9XG59XG4iXX0=