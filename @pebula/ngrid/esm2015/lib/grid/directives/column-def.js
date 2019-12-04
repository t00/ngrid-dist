/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NvbHVtbi1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBR2xELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLHdCQUF3QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUNBQXlDLENBQUM7Ozs7QUFPeEUsc0NBRUM7OztJQURDLGtDQUEwQjs7Ozs7Ozs7OztBQWlCNUIsTUFBTSxPQUFPLGlCQUE2QyxTQUFRLFlBQVk7Ozs7SUFtRDVFLFlBQTZDLE1BQWlDO1FBQzVFLEtBQUssRUFBRSxDQUFDO1FBRG1DLFdBQU0sR0FBTixNQUFNLENBQTJCO1FBakM5RSxlQUFVLEdBQUcsS0FBSyxDQUFDOzs7O1FBU3FCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQW9CLENBQUM7Ozs7Ozs7Ozs7O1FBY25GLFlBQU8sR0FBMkIsRUFBRSxDQUFDO1FBWTNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDOztjQUUvQixDQUFDLEdBQUcsTUFBTSxDQUFDLHlCQUF5QixFQUFFLENBQUMsUUFBUTtRQUNyRCxJQUFJLENBQUMsYUFBYTs7OztRQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQSxDQUFDO0lBQ2hE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QVMsUUFBUSxDQUFDLEVBQWUsRUFBRSxNQUFnQjtJQUNqRCxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU5Qiw2SEFBNkg7SUFDN0gsNkNBQTZDO0lBQzdDLDhGQUE4RjtJQUM5RiwrRkFBK0Y7SUFFL0YsK0dBQStHO0lBQy9HLGdHQUFnRztJQUNoRyxtRUFBbUU7SUFDbkUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN4QyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7S0FDbkM7U0FBTTtRQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztLQUNwQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3Jcbi8vIHRzbGludDpkaXNhYmxlOmRpcmVjdGl2ZS1jbGFzcy1zdWZmaXhcbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIEluamVjdCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBDT0xVTU4gfSBmcm9tICcuLi9jb2x1bW5zJztcbmltcG9ydCB7IGlzUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IHVuaXF1ZUNvbHVtbkNzcyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuaW1wb3J0IHsgd2lkdGhCcmVha291dCB9IGZyb20gJy4uL2NvbC13aWR0aC1sb2dpYy9keW5hbWljLWNvbHVtbi13aWR0aCc7XG5pbXBvcnQgeyBQYmxDb2x1bW5TaXplSW5mbyB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgVXBkYXRlV2lkdGhSZWFzb24gPSAnYXR0YWNoJyB8ICd1cGRhdGUnIHwgJ3Jlc2l6ZSc7XG5cbmV4cG9ydCB0eXBlIFdpZHRoU2V0ID0gW3N0cmluZywgc3RyaW5nLCBzdHJpbmddO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdpZHRoQ2hhbmdlRXZlbnQge1xuICByZWFzb246IFVwZGF0ZVdpZHRoUmVhc29uO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGZvciBhIHVzZXItZGVmaW5lZCBjb2x1bW4gZGVmaW5pdGlvbnMuXG4gKlxuICogVXNlciBkZWZpbmVkIGNvbHVtbiBkZWZpbml0aW9ucyBhcmUgYFBibENvbHVtbmAsIGBQYmxNZXRhQ29sdW1uYCwgYFBibENvbHVtbkdyb3VwYCBldGMuLi5cbiAqIFRoZXkgcmVwcmVzZW50IHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbnMgYW5kIGBQYmxOZ3JpZENvbHVtbkRlZmAgaXMgdGhlIHJ1bnRpbWUgaW5zdGFuY2Ugb2YgdGhlbS5cbiAqXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxOZ3JpZENvbHVtbkRlZl0nLFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka0NvbHVtbkRlZiwgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uRGVmIH0sXG4gICAgeyBwcm92aWRlOiAnTUFUX1NPUlRfSEVBREVSX0NPTFVNTl9ERUYnLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EZWYgfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENvbHVtbkRlZjxUIGV4dGVuZHMgQ09MVU1OID0gQ09MVU1OPiBleHRlbmRzIENka0NvbHVtbkRlZiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgncGJsTmdyaWRDb2x1bW5EZWYnKSBnZXQgY29sdW1uKCk6IFQgeyByZXR1cm4gdGhpcy5fY29sdW1uOyB9O1xuICBzZXQgY29sdW1uKHZhbHVlOiBUKSB7IHRoaXMuYXR0YWNoKHZhbHVlKTsgfVxuXG4gIC8qKlxuICAgKiBUaGUgYWJzb2x1dGUgd2lkdGggZGVmaW5pdGlvbnMsIGFzIGN1cnJlbnRseSBzZXQgaW4gdGhlIERPTSAoZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpLlxuICAgKiBJZiBubyBtZWFzdXJlbWVudHMgZXhpc3RzIHlldCwgcmV0dXJuIHRoZSB1c2VyIGRlZmluZWQgd2lkdGgncy5cbiAgICpcbiAgICogVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhlbSBpbiB0aGF0IG9yZGVyLCBpLmU6IFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cbiAgICovXG4gIGdldCB3aWR0aHMoKTogV2lkdGhTZXQgeyByZXR1cm4gdGhpcy5fd2lkdGhzWzFdOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IG5ldCB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgbmV0IHdpZHRoIGlzIHRoZSBhYnNvbHV0ZSB3aWR0aCBvZiB0aGUgY29sdW1uLCB3aXRob3V0IHBhZGRpbmcsIGJvcmRlciBldGMuLi5cbiAgICovXG4gIGdldCBuZXRXaWR0aCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fbmV0V2lkdGg7IH1cblxuICBpc0RyYWdnaW5nID0gZmFsc2U7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuXG4gIC8qKlxuICAgKiBBbiBldmVudCBlbWl0dGVkIHdoZW4gd2lkdGggb2YgdGhpcyBjb2x1bW4gaGFzIGNoYW5nZWQuXG4gICAqL1xuICBAT3V0cHV0KCdwYmxOZ3JpZENvbHVtbkRlZldpZHRoQ2hhbmdlJykgd2lkdGhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPFdpZHRoQ2hhbmdlRXZlbnQ+KCk7XG5cbiAgcHJpdmF0ZSBfY29sdW1uOiBUO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcGxldGUgd2lkdGggZGVmaW5pdGlvbiBmb3IgdGhlIGNvbHVtbi5cbiAgICpcbiAgICogVGhlcmUgYXJlIDIgd2lkdGggc2V0cyAodHVwbGUpOlxuICAgKiAtIFswXTogVGhlIHNvdXJjZSB3aWR0aCBkZWZpbml0aW9ucyBhcyBzZXQgaW4gc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlXG4gICAqIC0gWzFdOiBUaGUgYWJzb2x1dGUgd2lkdGggZGVmaW5pdGlvbnMsIGFzIGN1cnJlbnRseSBzZXQgaW4gdGhlIERPTSAoZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpXG4gICAqXG4gICAqIEVhY2ggc2V0IGlzIG1hZGUgdXAgb2YgMyBwcmltaXRpdmUgd2lkdGggZGVmaW5pdGlvbnM6IE1JTi1XSURUSCwgV0lEVEggYW5kIE1BWC1XSURUSC5cbiAgICogVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhlbSBpbiB0aGF0IG9yZGVyLCBpLmU6IFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cbiAgICovXG4gIHByaXZhdGUgX3dpZHRoczogW1dpZHRoU2V0PywgV2lkdGhTZXQ/XSA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBuZXQgd2lkdGggb2YgdGhlIGNvbHVtbi5cbiAgICogVGhlIG5ldCB3aWR0aCBpcyB0aGUgYWJzb2x1dGUgd2lkdGggb2YgdGhlIGNvbHVtbiwgd2l0aG91dCBwYWRkaW5nLCBib3JkZXIgZXRjLi4uXG4gICAqL1xuICBwcml2YXRlIF9uZXRXaWR0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgd2lkdGhCcmVha291dDogKGNvbHVtbkluZm86IFBibENvbHVtblNpemVJbmZvKSA9PiBSZXR1cm5UeXBlPHR5cGVvZiB3aWR0aEJyZWFrb3V0PjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVYVF9BUElfVE9LRU4pIHByb3RlY3RlZCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZ3JpZCA9IHRoaXMudGFibGUgPSBleHRBcGkuZ3JpZDtcblxuICAgIGNvbnN0IHMgPSBleHRBcGkuZHluYW1pY0NvbHVtbldpZHRoRmFjdG9yeSgpLnN0cmF0ZWd5O1xuICAgIHRoaXMud2lkdGhCcmVha291dCA9IGMgPT4gd2lkdGhCcmVha291dChzLCBjKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIFwid2lkdGhzXCIgZm9yIHRoaXMgY29sdW1uIGFuZCB3aGVuIHdpZHRoIGhhcyBjaGFuZ2VkLlxuICAgKlxuICAgKiBUaGUgXCJ3aWR0aHNcIiBhcmUgdGhlIDMgdmFsdWVzIHJlcHJlc2VudGluZyBhIHdpZHRoIG9mIGEgY2VsbDogW21pbldpZHRoLCB3aWR0aCwgbWF4V2lkdGhdLFxuICAgKiB0aGlzIG1ldGhvZCBpcyBnaXZlbiB0aGUgd2lkdGggYW5kIHdpbGwgY2FsY3VsYXRlIHRoZSBtaW5XaWR0aCBhbmQgbWF4V2lkdGggYmFzZWQgb24gdGhlIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAgICpcbiAgICogSWYgYXQgbGVhc3Qgb25lIHZhbHVlIG9mIFwid2lkdGhzXCIgaGFzIGNoYW5nZWQsIGZpcmVzIHRoZSBgd2lkdGhDaGFuZ2VgIGV2ZW50IHdpdGggdGhlIGByZWFzb25gIHByb3ZpZGVkLlxuICAgKlxuICAgKiBUaGUgcmVhc29uIGNhbiBiZSB1c2VkIHRvIG9wdGlvbmFsbHkgdXBkYXRlIHRoZSByZWxldmFudCBjZWxscywgYmFzZWQgb24gdGhlIHNvdXJjZSAocmVhc29uKSBvZiB0aGUgdXBkYXRlLlxuICAgKiAtIGF0dGFjaDogVGhpcyBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlIHdhcyBhdHRhY2hlZCB0byBhIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZS5cbiAgICogLSB1cGRhdGU6IFRoZSB3aWR0aCB2YWx1ZSB3YXMgdXBkYXRlZCBpbiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlICwgd2hpY2ggdHJpZ2dlcmVkIGEgd2lkdGggdXBkYXRlIHRvIHRoZSBydW50aW1lIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlXG4gICAqIC0gcmVzaXplOiBBIHJlc2l6ZSBldmVudCB0byB0aGUgaGVhZGVyIFBibENvbHVtbiBjZWxsIHdhcyB0cmlnZ2VyZWQsIHRoZSB3aWR0aCBvZiB0aGUgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGlzIG5vdCB1cGRhdGVkLCBvbmx5IHRoZSBydW50aW1lIHZhbHVlIGlzLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyB1cGRhdGVzIHRoZSB3aWR0aCBvZiB0aGUgY29sdW1uLWRlZiBpbnN0YW5jZSwgbm90IHRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgd2lkdGggaXRzZWxmLlxuICAgKiBPbmx5IHdoZW4gYHJlYXNvbiA9PT0gJ3VwZGF0ZSdgIGl0IG1lYW5zIHRoYXQgdGhlIGNvbHVtbiBkZWZpbml0aW9uIHdhcyB1cGRhdGVkIGFuZCB0cmlnZ2VyZWQgdGhpcyB1cGRhdGVcbiAgICpcbiAgICogQHBhcmFtIHdpZHRoIFRoZSBuZXcgd2lkdGhcbiAgICogQHBhcmFtIHJlYXNvbiBUaGUgcmVhc29uIGZvciB0aGlzIGNoYW5nZVxuICAgKi9cbiAgdXBkYXRlV2lkdGgod2lkdGg6IHN0cmluZywgcmVhc29uOiBVcGRhdGVXaWR0aFJlYXNvbik6IHZvaWQge1xuICAgIGNvbnN0IHsgaXNGaXhlZFdpZHRoLCBwYXJzZWRXaWR0aCB9ID0gdGhpcy5fY29sdW1uO1xuXG4gICAgLyogIFNldHRpbmcgdGhlIG1pbmltdW0gd2lkdGggaXMgYmFzZWQgb24gdGhlIGlucHV0LlxuICAgICAgICBJZiB0aGUgb3JpZ2luYWwgd2lkdGggaXMgcGl4ZWwgZml4ZWQgd2Ugd2lsbCB0YWtlIHRoZSBtYXhpbXVtIGJldHdlZW4gaXQgYW5kIHRoZSBtaW4gd2lkdGguXG4gICAgICAgIElmIG5vdCwgd2Ugd2lsbCB0aGUgdGFrZSBtaW5XaWR0aC5cbiAgICAgICAgSWYgbm9uZSBvZiB0aGUgYWJvdmUgd29ya2VkIHdlIHdpbGwgdHJ5IHRvIHNlZSBpZiB0aGUgY3VycmVudCB3aWR0aCBpcyBzZXQgd2l0aCAlLCBpZiBzbyBpdCB3aWxsIGJlIG91ciBtaW4gd2lkdGguXG4gICAgKi9cbiAgICBjb25zdCBtaW5XaWR0aFB4ID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWF4KHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1pbldpZHRoIHx8IDApXG4gICAgICA6IHRoaXMuX2NvbHVtbi5taW5XaWR0aFxuICAgIDtcblxuICAgIGxldCBtaW5XaWR0aCA9IG1pbldpZHRoUHggJiYgYCR7bWluV2lkdGhQeH1weGA7XG4gICAgaWYgKCFtaW5XaWR0aCAmJiBwYXJzZWRXaWR0aCAmJiBwYXJzZWRXaWR0aC50eXBlID09PSAnJScpIHtcbiAgICAgIG1pbldpZHRoID0gd2lkdGg7XG4gICAgfVxuXG4gICAgY29uc3QgbWF4V2lkdGggPSBpc0ZpeGVkV2lkdGhcbiAgICAgID8gTWF0aC5taW4odGhpcy5fY29sdW1uLnBhcnNlZFdpZHRoLnZhbHVlLCB0aGlzLl9jb2x1bW4ubWF4V2lkdGggfHwgdGhpcy5fY29sdW1uLnBhcnNlZFdpZHRoLnZhbHVlKVxuICAgICAgOiB0aGlzLl9jb2x1bW4ubWF4V2lkdGhcbiAgICA7XG5cbiAgICBjb25zdCBuZXdXaWR0aHMgPSBbbWluV2lkdGggfHwgJycsICB3aWR0aCwgbWF4V2lkdGggPyBgJHttYXhXaWR0aH1weGAgOiB3aWR0aF0gYXMgV2lkdGhTZXQ7XG4gICAgaWYgKHJlYXNvbiA9PT0gJ3Jlc2l6ZScpIHtcbiAgICAgIHRoaXMuX3dpZHRoc1sxXSA9IG5ld1dpZHRocztcbiAgICAgIHRoaXMud2lkdGhDaGFuZ2UuZW1pdCh7IHJlYXNvbiB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX3dpZHRoc1swXSB8fCBbXTtcbiAgICAgIHRoaXMuX3dpZHRoc1swXSA9IG5ld1dpZHRocztcbiAgICAgIGlmICghdGhpcy5fd2lkdGhzWzFdKSB7XG4gICAgICAgIHRoaXMuX3dpZHRoc1sxXSA9IG5ld1dpZHRocztcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGlmIChwcmV2W2ldICE9PSBuZXdXaWR0aHNbaV0pIHtcbiAgICAgICAgICB0aGlzLndpZHRoQ2hhbmdlLmVtaXQoeyByZWFzb24gfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIGN1cnJlbnQgYWJzb2x1dGUgd2lkdGggZGVmaW5pdGlvbnMgKG1pbldpZHRoLCB3aWR0aCwgbWF4V2lkdGgpIG9udG8gYW4gZWxlbWVudC5cbiAgICovXG4gIGFwcGx5V2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHsgc2V0V2lkdGgoZWxlbWVudCwgdGhpcy53aWR0aHMpOyB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBzb3VyY2Ugd2lkdGggZGVmaW5pdGlvbnMgKXNldCBpbiBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2UpIG9udG8gYW4gZWxlbWVudC5cbiAgICovXG4gIGFwcGx5U291cmNlV2lkdGgoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHsgc2V0V2lkdGgoZWxlbWVudCwgdGhpcy5fd2lkdGhzWzBdKTsgfVxuXG4gIC8qKlxuICAgKiBRdWVyeSBmb3IgY2VsbCBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29sdW1uIGRlZmluaXRpb24uXG4gICAqXG4gICAqIFRoaXMgcXVlcnkgaXMgbm90IGNhY2hlZCAtIGNhY2hlIGluIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgcXVlcnlDZWxsRWxlbWVudHMoLi4uZmlsdGVyOiBBcnJheTwndGFibGUnIHwgJ2hlYWRlcicgfCAnaGVhZGVyR3JvdXAnIHwgJ2Zvb3RlcicgfCAnZm9vdGVyR3JvdXAnPik6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IGNzc0lkID0gYC4ke3VuaXF1ZUNvbHVtbkNzcyh0aGlzKX1gO1xuXG4gICAgY29uc3QgcXVlcnk6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAoZmlsdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVlcnkucHVzaChjc3NJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgZiBvZiBmaWx0ZXIpIHtcbiAgICAgICAgc3dpdGNoIChmKSB7XG4gICAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWhlYWRlci1jZWxsJHtjc3NJZH06bm90KC5wYmwtaGVhZGVyLWdyb3VwLWNlbGwpYCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlckdyb3VwJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1oZWFkZXItZ3JvdXAtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtbmdyaWQtZm9vdGVyLWNlbGwke2Nzc0lkfTpub3QoLnBibC1mb290ZXItZ3JvdXAtY2VsbClgKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZm9vdGVyR3JvdXAnOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLWZvb3Rlci1ncm91cC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gd2UgcXVlcnkgZnJvbSB0aGUgbWFzdGVyIHRhYmxlIGNvbnRhaW5lciBhbmQgbm90IENES1RhYmxlIGJlY2F1c2Ugb2YgZml4ZWQgbWV0YSByb3dzXG4gICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA9PT0gMCA/IFtdIDogQXJyYXkuZnJvbSh0aGlzLmV4dEFwaS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkuam9pbignLCAnKSkpIGFzIGFueTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2goKTtcbiAgICB0aGlzLndpZHRoQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvblJlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAoaXNQYmxDb2x1bW4odGhpcy5jb2x1bW4pKSB7XG4gICAgICBjb25zdCBwcmV2TmV0V2lkdGggPSB0aGlzLl9uZXRXaWR0aDtcbiAgICAgIHRoaXMuX25ldFdpZHRoID0gdGhpcy53aWR0aEJyZWFrb3V0KHRoaXMuY29sdW1uLnNpemVJbmZvKS5jb250ZW50O1xuXG4gICAgICBpZiAocHJldk5ldFdpZHRoICE9PSB0aGlzLl9uZXRXaWR0aCkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IGAke3RoaXMuX25ldFdpZHRofXB4YDtcbiAgICAgICAgdGhpcy51cGRhdGVXaWR0aCh3aWR0aCwgJ3Jlc2l6ZScpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVBpbihwaW4/OiAnc3RhcnQnIHwgJ2VuZCcpOiB2b2lkIHtcbiAgICB0aGlzLnN0aWNreSA9IHRoaXMuc3RpY2t5RW5kID0gZmFsc2U7XG4gICAgc3dpdGNoKHBpbikge1xuICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICB0aGlzLnN0aWNreSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgdGhpcy5zdGlja3lFbmQgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRoaXMuZ3JpZC5pc0luaXQpIHtcbiAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2goY29sdW1uOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbiAhPT0gY29sdW1uKSB7XG4gICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIChjb2x1bW4gYXMgYW55KS5hdHRhY2godGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGNvbHVtbi5pZC5yZXBsYWNlKC8gL2csICdfJyk7XG5cbiAgICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbHVtbikpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBpbihjb2x1bW4ucGluKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4pIHtcbiAgICAgIHRoaXMuX2NvbHVtbi5kZXRhY2goKTtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHdpZHRocyBvZiBhbiBIVE1MRWxlbWVudFxuICogQHBhcmFtIGVsIFRoZSBlbGVtZW50IHRvIHNldCB3aWR0aHMgdG9cbiAqIEBwYXJhbSB3aWR0aHMgVGhlIHdpZHRocywgYSB0dXBsZSBvZiAzIHN0cmluZ3MgWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICovXG5mdW5jdGlvbiBzZXRXaWR0aChlbDogSFRNTEVsZW1lbnQsIHdpZHRoczogV2lkdGhTZXQpIHtcbiAgZWwuc3R5bGUubWluV2lkdGggPSB3aWR0aHNbMF07XG4gIGVsLnN0eWxlLndpZHRoID0gd2lkdGhzWzFdO1xuICBlbC5zdHlsZS5tYXhXaWR0aCA9IHdpZHRoc1syXTtcblxuICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCA0XTogSW5zdGVhZCBvZiB1c2luZyBhIHR1cGxlIGZvciB3aWR0aCwgdXNlIGEgQ1NTU3R5bGVEZWNsYXJhdGlvbiBvYmplY3QgYW5kIGp1c3QgYXNzaWduIHRoZSBwcm9wc1xuICAvLyBUaGlzIHdpbGwgYXZvaWQgdGhlIGFkZGl0aW9uYWwgY2hlY2sgZm9yICVcbiAgLy8gV2Ugd2lsbCBuZWVkIHRvIGltcGxlbWVudCBpdCBpbiBhbGwgcGxhY2VzIHRoYXQgYF93aWR0aHNgIGlzIHVwZGF0ZWQgaW4gYFBibE5ncmlkQ29sdW1uRGVmYFxuICAvLyBBbm90aGVyIFRPRE8gaXMgdG8gY2FjaGUgdGhlIHByZXZpb3VzIGBib3hTaXppbmdgIGluIGFueSBjYXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBjaGFuZ2VzLlxuXG4gIC8vIFdoZW4gdGhlIGNvbHVtbiBkb2VzIG5vdCBoYXZlIGFuIGV4cGxpY2l0IGBtaW5XaWR0aGAgc2V0IGFuZCB3aGVuIHRoZSBgd2lkdGhgIGlzIHNldCBleHBsaWNpdGx5IHRvIGEgJSB2YWx1ZVxuICAvLyB0aGUgbG9naWMgaW4gYFBibE5ncmlkQ29sdW1uRGVmLnVwZGF0ZVdpZHRoYCB3aWxsIHNldCBgbWluV2lkdGhgIHRvIHRoZSBzYW1lIHZhbHVlIGluIGB3aWR0aGBcbiAgLy8gVGhpcyB3aWxsIGNhdXNlIGFuIG92ZXJmbG93IHVubGVzcyB3ZSBhcHBseSB0aGUgYm9yZGVyLWJveCBtb2RlbFxuICBpZiAod2lkdGhzWzBdICYmIHdpZHRoc1swXS5lbmRzV2l0aCgnJScpKSB7XG4gICAgZWwuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICB9IGVsc2Uge1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdjb250ZW50LWJveCc7XG4gIH1cbn1cbiJdfQ==