/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:use-host-property-decorator
// tslint:disable:directive-class-suffix
import { Directive, Input, Inject, Output, EventEmitter, } from '@angular/core';
import { CdkColumnDef } from '@angular/cdk/table';
import { isPblColumn } from '../columns/column';
import { EXT_API_TOKEN } from '../../ext/table-ext-api';
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
        this.table = extApi.table;
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
        const prev = this._widths || [];
        this._widths = [minWidth || '', width, maxWidth ? `${maxWidth}px` : width];
        // a previous 'resize' event will be followed by another 'resize' event with the same width, so fire....
        if (reason === 'resize') {
            this.widthChange.emit({ reason });
        }
        else {
            for (let i = 0; i < 3; i++) {
                if (prev[i] !== this._widths[i]) {
                    this.widthChange.emit({ reason });
                    break;
                }
            }
        }
    }
    /**
     * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
     * @param {?} element
     * @return {?}
     */
    applyWidth(element) { setWidth(element, this.widths); }
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
    /** @type {?} */
    PblNgridColumnDef.prototype.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jb2x1bW4tZGVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFFTixNQUFNLEVBQ04sWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUdsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFaEQsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlDQUF5QyxDQUFDOzs7O0FBS3hFLHNDQUVDOzs7SUFEQyxrQ0FBMEI7Ozs7Ozs7Ozs7QUFpQjVCLE1BQU0sT0FBTyxpQkFBNkMsU0FBUSxZQUFZOzs7O0lBNkM1RSxZQUE2QyxNQUFpQztRQUM1RSxLQUFLLEVBQUUsQ0FBQztRQURtQyxXQUFNLEdBQU4sTUFBTSxDQUEyQjtRQTNCOUUsZUFBVSxHQUFHLEtBQUssQ0FBQzs7OztRQU9xQixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDO1FBc0J6RixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7O2NBRXBCLENBQUMsR0FBRyxNQUFNLENBQUMseUJBQXlCLEVBQUUsQ0FBQyxRQUFRO1FBQ3JELElBQUksQ0FBQyxhQUFhOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLENBQUM7SUFDaEQsQ0FBQzs7OztJQWxERCxJQUFnQyxNQUFNLEtBQVEsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7Ozs7O0lBQ3JFLElBQUksTUFBTSxDQUFDLEtBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7SUFRNUMsSUFBSSxNQUFNLEtBQStCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7OztJQU0vRCxJQUFJLFFBQVEsS0FBYSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3RGpELFdBQVcsQ0FBQyxLQUFhLEVBQUUsTUFBeUI7Y0FDNUMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU87Ozs7Ozs7Y0FPNUMsVUFBVSxHQUFHLFlBQVk7WUFDN0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFROztZQUdyQixRQUFRLEdBQUcsVUFBVSxJQUFJLEdBQUcsVUFBVSxJQUFJO1FBQzlDLElBQUksQ0FBQyxRQUFRLElBQUksV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUFFO1lBQ3hELFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDbEI7O2NBRUssUUFBUSxHQUFHLFlBQVk7WUFDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNuRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFROztjQUduQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFO1FBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLElBQUksRUFBRSxFQUFHLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTVFLHdHQUF3RztRQUN4RyxJQUFJLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMxQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7b0JBQ2xDLE1BQU07aUJBQ1A7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7Ozs7O0lBS0QsVUFBVSxDQUFDLE9BQW9CLElBQVUsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7OztJQU8xRSxpQkFBaUIsQ0FBQyxHQUFHLE1BQTRFOztjQUN6RixLQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUU7O2NBRW5DLEtBQUssR0FBYSxFQUFFO1FBRTFCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjthQUFNO1lBQ0wsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ3RCLFFBQVEsQ0FBQyxFQUFFO29CQUNULEtBQUssT0FBTzt3QkFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNO29CQUNQLEtBQUssUUFBUTt3QkFDWixLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLDhCQUE4QixDQUFDLENBQUM7d0JBQ3pFLE1BQU07b0JBQ1AsS0FBSyxhQUFhO3dCQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUM3QyxNQUFNO29CQUNQLEtBQUssUUFBUTt3QkFDWixLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLDhCQUE4QixDQUFDLENBQUM7d0JBQ3pFLE1BQU07b0JBQ1AsS0FBSyxhQUFhO3dCQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxDQUFDO3dCQUM3QyxNQUFNO2lCQUNSO2FBQ0Y7U0FDRjtRQUNELHVGQUF1RjtRQUN2RixPQUFPLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1CQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQU8sQ0FBQztJQUM3RyxDQUFDOzs7OztJQUdELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFOztrQkFDdEIsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUVsRSxJQUFJLFlBQVksS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFOztzQkFDN0IsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSTtnQkFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDbkM7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsU0FBUyxDQUFDLEdBQXFCO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDckMsUUFBTyxHQUFHLEVBQUU7WUFDVixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ25CLE1BQU07WUFDUixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RCLE1BQU07U0FDVDtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztTQUNqRDtJQUNILENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxNQUFTO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8sTUFBTTtRQUNaLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7O1lBck5GLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRTtvQkFDekQsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFO2lCQUMxRTthQUNGOzs7OzRDQThDYyxNQUFNLFNBQUMsYUFBYTs7O3FCQTVDaEMsS0FBSyxTQUFDLG1CQUFtQjswQkF3QnpCLE1BQU0sU0FBQyw4QkFBOEI7Ozs7SUFQdEMsdUNBQW1COztJQUVuQixrQ0FBOEI7Ozs7O0lBSzlCLHdDQUEyRjs7Ozs7SUFFM0Ysb0NBQW1COzs7Ozs7Ozs7SUFRbkIsb0NBQTBDOzs7Ozs7O0lBTTFDLHNDQUEwQjs7Ozs7SUFFMUIsMENBQTJGOzs7OztJQUUvRSxtQ0FBa0U7Ozs7Ozs7OztBQXlLaEYsU0FBUyxRQUFRLENBQUMsRUFBZSxFQUFFLE1BQWdDO0lBQ2pFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlCLDZIQUE2SDtJQUM3SCw2Q0FBNkM7SUFDN0MsOEZBQThGO0lBQzlGLCtGQUErRjtJQUUvRiwrR0FBK0c7SUFDL0csZ0dBQWdHO0lBQ2hHLG1FQUFtRTtJQUNuRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztLQUNuQztTQUFNO1FBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka0NvbHVtbkRlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IENPTFVNTiB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgaXNQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFWFRfQVBJX1RPS0VOLCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IHVuaXF1ZUNvbHVtbkNzcyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuaW1wb3J0IHsgd2lkdGhCcmVha291dCB9IGZyb20gJy4uL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TaXplSW5mbyB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgVXBkYXRlV2lkdGhSZWFzb24gPSAnYXR0YWNoJyB8ICd1cGRhdGUnIHwgJ3Jlc2l6ZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lkdGhDaGFuZ2VFdmVudCB7XG4gIHJlYXNvbjogVXBkYXRlV2lkdGhSZWFzb247XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJ1bnRpbWUgY29sdW1uIGRlZmluaXRpb24gZm9yIGEgdXNlci1kZWZpbmVkIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAqXG4gKiBVc2VyIGRlZmluZWQgY29sdW1uIGRlZmluaXRpb25zIGFyZSBgUGJsQ29sdW1uYCwgYFBibE1ldGFDb2x1bW5gLCBgUGJsQ29sdW1uR3JvdXBgIGV0Yy4uLlxuICogVGhleSByZXByZXNlbnQgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9ucyBhbmQgYFBibE5ncmlkQ29sdW1uRGVmYCBpcyB0aGUgcnVudGltZSBpbnN0YW5jZSBvZiB0aGVtLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ29sdW1uRGVmXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrQ29sdW1uRGVmLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EZWYgfSxcbiAgICB7IHByb3ZpZGU6ICdNQVRfU09SVF9IRUFERVJfQ09MVU1OX0RFRicsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRlZiB9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uRGVmPFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrQ29sdW1uRGVmIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCdwYmxOZ3JpZENvbHVtbkRlZicpIGdldCBjb2x1bW4oKTogVCB7IHJldHVybiB0aGlzLl9jb2x1bW47IH07XG4gIHNldCBjb2x1bW4odmFsdWU6IFQpIHsgdGhpcy5hdHRhY2godmFsdWUpOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wbGV0ZSB3aWR0aCBkZWZpbml0aW9uIGZvciB0aGUgY29sdW1uLlxuICAgKiBUaGVyZSBhcmUgMyB3aWR0aCBkZWZpbml0aW9uczogTUlOLVdJRFRILCBXSURUSCBhbmQgTUFYLVdJRFRILlxuICAgKlxuICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICAgKi9cbiAgZ2V0IHdpZHRocygpOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10geyByZXR1cm4gdGhpcy5fd2lkdGhzOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IG5ldCB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgbmV0IHdpZHRoIGlzIHRoZSBhYnNvbHV0ZSB3aWR0aCBvZiB0aGUgY29sdW1uLCB3aXRob3V0IHBhZGRpbmcsIGJvcmRlciBldGMuLi5cbiAgICovXG4gIGdldCBuZXRXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbmV0V2lkdGg7IH1cblxuICBpc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB3aWR0aCBvZiB0aGlzIGNvbHVtbiBoYXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoJ3BibE5ncmlkQ29sdW1uRGVmV2lkdGhDaGFuZ2UnKSB3aWR0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8V2lkdGhDaGFuZ2VFdmVudD4oKTtcblxuICBwcml2YXRlIF9jb2x1bW46IFQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wbGV0ZSB3aWR0aCBkZWZpbml0aW9uIGZvciB0aGUgY29sdW1uLlxuICAgKiBUaGVyZSBhcmUgMyB3aWR0aCBkZWZpbml0aW9uczogTUlOLVdJRFRILCBXSURUSCBhbmQgTUFYLVdJRFRILlxuICAgKlxuICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICAgKi9cbiAgcHJpdmF0ZSBfd2lkdGhzOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IG5ldCB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgbmV0IHdpZHRoIGlzIHRoZSBhYnNvbHV0ZSB3aWR0aCBvZiB0aGUgY29sdW1uLCB3aXRob3V0IHBhZGRpbmcsIGJvcmRlciBldGMuLi5cbiAgICovXG4gIHByaXZhdGUgX25ldFdpZHRoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSB3aWR0aEJyZWFrb3V0OiAoY29sdW1uSW5mbzogUGJsQ29sdW1uU2l6ZUluZm8pID0+IFJldHVyblR5cGU8dHlwZW9mIHdpZHRoQnJlYWtvdXQ+O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHJvdGVjdGVkIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8YW55Pikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy50YWJsZSA9IGV4dEFwaS50YWJsZTtcblxuICAgIGNvbnN0IHMgPSBleHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpLnN0cmF0ZWd5O1xuICAgIHRoaXMud2lkdGhCcmVha291dCA9IGMgPT4gd2lkdGhCcmVha291dChzLCBjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIFwid2lkdGhzXCIgZm9yIHRoaXMgY29sdW1uIGFuZCB3aGVuIHdpZHRoIGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBUaGUgXCJ3aWR0aHNcIiBhcmUgdGhlIDMgdmFsdWVzIHJlcHJlc2VudGluZyBhIHdpZHRoIG9mIGEgY2VsbDogW21pbldpZHRoLCB3aWR0aCwgbWF4V2lkdGhdLFxuICAgKiB0aGlzIG1ldGhvZCBpcyBnaXZlbiB0aGUgd2lkdGggYW5kIHdpbGwgY2FsY3VsYXRlIHRoZSBtaW5XaWR0aCBhbmQgbWF4V2lkdGggYmFzZWQgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICpcbiAgICogSWYgYXQgbGVhc3Qgb25lIHZhbHVlIG9mIFwid2lkdGhzXCIgaGFzIGNoYW5nZWQsIGZpcmVzIHRoZSBgd2lkdGhDaGFuZ2VgIGV2ZW50IHdpdGggdGhlIGByZWFzb25gIHByb3ZpZGVkLlxuICAgKlxuICAgKiBUaGUgcmVhc29uIGNhbiBiZSB1c2VkIHRvIG9wdGlvbmFsbHkgdXBkYXRlIHRoZSByZWxldmFudCBjZWxscywgYmFzZWQgb24gdGhlIHNvdXJjZSAocmVhc29uKSBvZiB0aGUgdXBkYXRlLlxuICAgKiAtIGF0dGFjaDogVGhpcyBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlIHdhcyBhdHRhY2hlZCB0byBhIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZS5cbiAgICogLSB1cGRhdGU6IFRoZSB3aWR0aCB2YWx1ZSB3YXMgdXBkYXRlZCBpbiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlICwgd2hpY2ggdHJpZ2dlcmVkIGEgd2lkdGggdXBkYXRlIHRvIHRoZSBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlXG4gICAqIC0gcmVzaXplOiBBIHJlc2l6ZSBldmVudCB0byB0aGUgaGVhZGVyIFBibENvbHVtbiBjZWxsIHdhcyB0cmlnZ2VyZWQsIHRoZSB3aWR0aCBvZiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGlzIG5vdCB1cGRhdGVkLCBvbmx5IHRoZSBydW50aW1lIHZhbHVlIGlzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyB1cGRhdGVzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uLWRlZiBpbnN0YW5jZSwgbm90IHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgd2lkdGggaXRzZWxmLlxuICAgKiBPbmx5IHdoZW4gYHJlYXNvbiA9PT0gJ3VwZGF0ZSdgIGl0IG1lYW5zIHRoYXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIHdhcyB1cGRhdGVkIGFuZCB0cmlnZ2VyZWQgdGhpcyB1cGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZHRoIFRoZSBuZXcgd2lkdGhcbiAgICogQHBhcmFtIHJlYXNvbiBUaGUgcmVhc29uIGZvciB0aGlzIGNoYW5nZVxuICAgKi9cbiAgdXBkYXRlV2lkdGgod2lkdGg6IHN0cmluZywgcmVhc29uOiBVcGRhdGVXaWR0aFJlYXNvbik6IHZvaWQge1xuICAgIGNvbnN0IHsgaXNGaXhlZFdpZHRoLCBwYXJzZWRXaWR0aCB9ID0gdGhpcy5fY29sdW1uO1xuXG4gICAgLyogIFNldHRpbmcgdGhlIG1pbmltdW0gd2lkdGggaXMgYmFzZWQgb24gdGhlIGlucHV0LlxuICAgICAgICBJZiB0aGUgb3JpZ2luYWwgd2lkdGggaXMgcGl4ZWwgZml4ZWQgd2Ugd2lsbCB0YWtlIHRoZSBtYXhpbXVtIGJldHdlZW4gaXQgYW5kIHRoZSBtaW4gd2lkdGguXG4gICAgICAgIElmIG5vdCwgd2Ugd2lsbCB0aGUgdGFrZSBtaW5XaWR0aC5cbiAgICAgICAgSWYgbm9uZSBvZiB0aGUgYWJvdmUgd29ya2VkIHdlIHdpbGwgdHJ5IHRvIHNlZSBpZiB0aGUgY3VycmVudCB3aWR0aCBpcyBzZXQgd2l0aCAlLCBpZiBzbyBpdCB3aWxsIGJlIG91ciBtaW4gd2lkdGguXG4gICAgKi9cbiAgICBjb25zdCBtaW5XaWR0aFB4ID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWF4KHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1pbldpZHRoIHx8IDApXG4gICAgICA6IHRoaXMuX2NvbHVtbi5taW5XaWR0aFxuICAgIDtcblxuICAgIGxldCBtaW5XaWR0aCA9IG1pbldpZHRoUHggJiYgYCR7bWluV2lkdGhQeH1weGA7XG4gICAgaWYgKCFtaW5XaWR0aCAmJiBwYXJzZWRXaWR0aCAmJiBwYXJzZWRXaWR0aC50eXBlID09PSAnJScpIHtcbiAgICAgIG1pbldpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3QgbWF4V2lkdGggPSBpc0ZpeGVkV2lkdGhcbiAgICAgID8gTWF0aC5taW4odGhpcy5fY29sdW1uLnBhcnNlZFdpZHRoLnZhbHVlLCB0aGlzLl9jb2x1bW4ubWF4V2lkdGggfHwgdGhpcy5fY29sdW1uLnBhcnNlZFdpZHRoLnZhbHVlKVxuICAgICAgOiB0aGlzLl9jb2x1bW4ubWF4V2lkdGhcbiAgICA7XG5cbiAgICBjb25zdCBwcmV2ID0gdGhpcy5fd2lkdGhzIHx8IFtdO1xuICAgIHRoaXMuX3dpZHRocyA9IFttaW5XaWR0aCB8fCAnJywgIHdpZHRoLCBtYXhXaWR0aCA/IGAke21heFdpZHRofXB4YCA6IHdpZHRoXTtcblxuICAgIC8vIGEgcHJldmlvdXMgJ3Jlc2l6ZScgZXZlbnQgd2lsbCBiZSBmb2xsb3dlZCBieSBhbm90aGVyICdyZXNpemUnIGV2ZW50IHdpdGggdGhlIHNhbWUgd2lkdGgsIHNvIGZpcmUuLi4uXG4gICAgaWYgKHJlYXNvbiA9PT0gJ3Jlc2l6ZScpIHtcbiAgICAgIHRoaXMud2lkdGhDaGFuZ2UuZW1pdCh7IHJlYXNvbiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaWYgKHByZXZbaV0gIT09IHRoaXMuX3dpZHRoc1tpXSkge1xuICAgICAgICAgIHRoaXMud2lkdGhDaGFuZ2UuZW1pdCh7IHJlYXNvbiB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgY3VycmVudCB3aWR0aCBkZWZpbml0aW9ucyAobWluV2lkdGgsIHdpZHRoLCBtYXhXaWR0aCkgb250byB0aGUgZWxlbWVudC5cbiAgICovXG4gIGFwcGx5V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHsgc2V0V2lkdGgoZWxlbWVudCwgdGhpcy53aWR0aHMpOyB9XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IGZvciBjZWxsIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb2x1bW4gZGVmaW5pdGlvbi5cbiAgICpcbiAgICogVGhpcyBxdWVyeSBpcyBub3QgY2FjaGVkIC0gY2FjaGUgaW4gaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBxdWVyeUNlbGxFbGVtZW50cyguLi5maWx0ZXI6IEFycmF5PCd0YWJsZScgfCAnaGVhZGVyJyB8ICdoZWFkZXJHcm91cCcgfCAnZm9vdGVyJyB8ICdmb290ZXJHcm91cCc+KTogSFRNTEVsZW1lbnRbXSB7XG4gICAgY29uc3QgY3NzSWQgPSBgLiR7dW5pcXVlQ29sdW1uQ3NzKHRoaXMpfWA7XG5cbiAgICBjb25zdCBxdWVyeTogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChmaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWVyeS5wdXNoKGNzc0lkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChjb25zdCBmIG9mIGZpbHRlcikge1xuICAgICAgICBzd2l0Y2ggKGYpIHtcbiAgICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtbmdyaWQtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtbmdyaWQtaGVhZGVyLWNlbGwke2Nzc0lkfTpub3QoLnBibC1oZWFkZXItZ3JvdXAtY2VsbClgKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLWhlYWRlci1ncm91cC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1mb290ZXItY2VsbCR7Y3NzSWR9Om5vdCgucGJsLWZvb3Rlci1ncm91cC1jZWxsKWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb290ZXJHcm91cCc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtZm9vdGVyLWdyb3VwLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB3ZSBxdWVyeSBmcm9tIHRoZSBtYXN0ZXIgdGFibGUgY29udGFpbmVyIGFuZCBub3QgQ0RLVGFibGUgYmVjYXVzZSBvZiBmaXhlZCBtZXRhIHJvd3NcbiAgICByZXR1cm4gcXVlcnkubGVuZ3RoID09PSAwID8gW10gOiBBcnJheS5mcm9tKHRoaXMuZXh0QXBpLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeS5qb2luKCcsICcpKSkgYXMgYW55O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMud2lkdGhDaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICAgIGlmIChpc1BibENvbHVtbih0aGlzLmNvbHVtbikpIHtcbiAgICAgIGNvbnN0IHByZXZOZXRXaWR0aCA9IHRoaXMuX25ldFdpZHRoO1xuICAgICAgdGhpcy5fbmV0V2lkdGggPSB0aGlzLndpZHRoQnJlYWtvdXQodGhpcy5jb2x1bW4uc2l6ZUluZm8pLmNvbnRlbnQ7XG5cbiAgICAgIGlmIChwcmV2TmV0V2lkdGggIT09IHRoaXMuX25ldFdpZHRoKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gYCR7dGhpcy5fbmV0V2lkdGh9cHhgO1xuICAgICAgICB0aGlzLnVwZGF0ZVdpZHRoKHdpZHRoLCAncmVzaXplJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGluKHBpbj86ICdzdGFydCcgfCAnZW5kJyk6IHZvaWQge1xuICAgIHRoaXMuc3RpY2t5ID0gdGhpcy5zdGlja3lFbmQgPSBmYWxzZTtcbiAgICBzd2l0Y2gocGluKSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHRoaXMuc3RpY2t5ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLnN0aWNreUVuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoKGNvbHVtbjogVCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4gIT09IGNvbHVtbikge1xuICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgIGlmIChjb2x1bW4pIHtcbiAgICAgICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICAgICAgICAoY29sdW1uIGFzIGFueSkuYXR0YWNoKHRoaXMpO1xuICAgICAgICB0aGlzLm5hbWUgPSBjb2x1bW4uaWQucmVwbGFjZSgvIC9nLCAnXycpO1xuXG4gICAgICAgIGlmIChpc1BibENvbHVtbihjb2x1bW4pKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVQaW4oY29sdW1uLnBpbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGFjaCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY29sdW1uKSB7XG4gICAgICB0aGlzLl9jb2x1bW4uZGV0YWNoKCk7XG4gICAgICB0aGlzLl9jb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSB3aWR0aHMgb2YgYW4gSFRNTEVsZW1lbnRcbiAqIEBwYXJhbSBlbCBUaGUgZWxlbWVudCB0byBzZXQgd2lkdGhzIHRvXG4gKiBAcGFyYW0gd2lkdGhzIFRoZSB3aWR0aHMsIGEgdHVwbGUgb2YgMyBzdHJpbmdzIFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cbiAqL1xuZnVuY3Rpb24gc2V0V2lkdGgoZWw6IEhUTUxFbGVtZW50LCB3aWR0aHM6IFtzdHJpbmcsIHN0cmluZywgc3RyaW5nXSkge1xuICBlbC5zdHlsZS5taW5XaWR0aCA9IHdpZHRoc1swXTtcbiAgZWwuc3R5bGUud2lkdGggPSB3aWR0aHNbMV07XG4gIGVsLnN0eWxlLm1heFdpZHRoID0gd2lkdGhzWzJdO1xuXG4gIC8vIFRPRE8oc2hsb21pYXNzYWYpW3BlcmYsIDRdOiBJbnN0ZWFkIG9mIHVzaW5nIGEgdHVwbGUgZm9yIHdpZHRoLCB1c2UgYSBDU1NTdHlsZURlY2xhcmF0aW9uIG9iamVjdCBhbmQganVzdCBhc3NpZ24gdGhlIHByb3BzXG4gIC8vIFRoaXMgd2lsbCBhdm9pZCB0aGUgYWRkaXRpb25hbCBjaGVjayBmb3IgJVxuICAvLyBXZSB3aWxsIG5lZWQgdG8gaW1wbGVtZW50IGl0IGluIGFsbCBwbGFjZXMgdGhhdCBgX3dpZHRoc2AgaXMgdXBkYXRlZCBpbiBgUGJsTmdyaWRDb2x1bW5EZWZgXG4gIC8vIEFub3RoZXIgVE9ETyBpcyB0byBjYWNoZSB0aGUgcHJldmlvdXMgYGJveFNpemluZ2AgaW4gYW55IGNhc2UgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGNoYW5nZXMuXG5cbiAgLy8gV2hlbiB0aGUgY29sdW1uIGRvZXMgbm90IGhhdmUgYW4gZXhwbGljaXQgYG1pbldpZHRoYCBzZXQgYW5kIHdoZW4gdGhlIGB3aWR0aGAgaXMgc2V0IGV4cGxpY2l0bHkgdG8gYSAlIHZhbHVlXG4gIC8vIHRoZSBsb2dpYyBpbiBgUGJsTmdyaWRDb2x1bW5EZWYudXBkYXRlV2lkdGhgIHdpbGwgc2V0IGBtaW5XaWR0aGAgdG8gdGhlIHNhbWUgdmFsdWUgaW4gYHdpZHRoYFxuICAvLyBUaGlzIHdpbGwgY2F1c2UgYW4gb3ZlcmZsb3cgdW5sZXNzIHdlIGFwcGx5IHRoZSBib3JkZXItYm94IG1vZGVsXG4gIGlmICh3aWR0aHNbMF0gJiYgd2lkdGhzWzBdLmVuZHNXaXRoKCclJykpIHtcbiAgICBlbC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gIH0gZWxzZSB7XG4gICAgZWwuc3R5bGUuYm94U2l6aW5nID0gJ2NvbnRlbnQtYm94JztcbiAgfVxufVxuIl19