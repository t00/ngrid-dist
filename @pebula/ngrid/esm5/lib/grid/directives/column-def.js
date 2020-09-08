/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/column-def.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __values } from "tslib";
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
var PblNgridColumnDef = /** @class */ (function (_super) {
    __extends(PblNgridColumnDef, _super);
    function PblNgridColumnDef(extApi) {
        var _this = _super.call(this) || this;
        _this.extApi = extApi;
        _this.isDragging = false;
        /**
         * An event emitted when width of this column has changed.
         */
        _this.widthChange = new EventEmitter();
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
        _this._widths = [];
        _this.grid = _this.table = extApi.grid;
        /** @type {?} */
        var s = extApi.dynamicColumnWidthFactory().strategy;
        _this.widthBreakout = (/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return widthBreakout(s, c); });
        return _this;
    }
    Object.defineProperty(PblNgridColumnDef.prototype, "column", {
        get: /**
         * @return {?}
         */
        function () { return this._column; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.attach(value); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblNgridColumnDef.prototype, "widths", {
        /**
         * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
         * If no measurements exists yet, return the user defined width's.
         *
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         */
        get: /**
         * The absolute width definitions, as currently set in the DOM (getBoundingClientRect()).
         * If no measurements exists yet, return the user defined width's.
         *
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         * @return {?}
         */
        function () { return this._widths[1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridColumnDef.prototype, "netWidth", {
        /**
         * The last net width of the column.
         * The net width is the absolute width of the column, without padding, border etc...
         */
        get: /**
         * The last net width of the column.
         * The net width is the absolute width of the column, without padding, border etc...
         * @return {?}
         */
        function () { return this._netWidth; },
        enumerable: true,
        configurable: true
    });
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
     * @param width The new width
     * @param reason The reason for this change
     */
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
    PblNgridColumnDef.prototype.updateWidth = /**
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
    function (width, reason) {
        var _a = this._column, isFixedWidth = _a.isFixedWidth, parsedWidth = _a.parsedWidth;
        /*  Setting the minimum width is based on the input.
                If the original width is pixel fixed we will take the maximum between it and the min width.
                If not, we will the take minWidth.
                If none of the above worked we will try to see if the current width is set with %, if so it will be our min width.
            */
        /** @type {?} */
        var minWidthPx = isFixedWidth
            ? Math.max(this._column.parsedWidth.value, this._column.minWidth || 0)
            : this._column.minWidth;
        /** @type {?} */
        var minWidth = minWidthPx && minWidthPx + "px";
        if (!minWidth && parsedWidth && parsedWidth.type === '%') {
            minWidth = width;
        }
        /** @type {?} */
        var maxWidth = isFixedWidth
            ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
            : this._column.maxWidth;
        /** @type {?} */
        var newWidths = (/** @type {?} */ ([minWidth || '', width, maxWidth ? maxWidth + "px" : width]));
        if (reason === 'resize') {
            this._widths[1] = newWidths;
            this.widthChange.emit({ reason: reason });
        }
        else {
            /** @type {?} */
            var prev = this._widths[0] || [];
            this._widths[0] = newWidths;
            if (!this._widths[1]) {
                this._widths[1] = newWidths;
            }
            for (var i = 0; i < 3; i++) {
                if (prev[i] !== newWidths[i]) {
                    this.widthChange.emit({ reason: reason });
                    break;
                }
            }
        }
    };
    /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     */
    /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     * @param {?} element
     * @return {?}
     */
    PblNgridColumnDef.prototype.applyWidth = /**
     * Apply the current absolute width definitions (minWidth, width, maxWidth) onto an element.
     * @param {?} element
     * @return {?}
     */
    function (element) { setWidth(element, this.widths); };
    /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     */
    /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     * @param {?} element
     * @return {?}
     */
    PblNgridColumnDef.prototype.applySourceWidth = /**
     * Apply the source width definitions )set in static column definition instance) onto an element.
     * @param {?} element
     * @return {?}
     */
    function (element) { setWidth(element, this._widths[0]); };
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     */
    /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     * @param {...?} filter
     * @return {?}
     */
    PblNgridColumnDef.prototype.queryCellElements = /**
     * Query for cell elements related to this column definition.
     *
     * This query is not cached - cache in implementation.
     * @param {...?} filter
     * @return {?}
     */
    function () {
        var e_1, _a;
        var filter = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filter[_i] = arguments[_i];
        }
        /** @type {?} */
        var cssId = "." + uniqueColumnCss(this);
        /** @type {?} */
        var query = [];
        if (filter.length === 0) {
            query.push(cssId);
        }
        else {
            try {
                for (var filter_1 = __values(filter), filter_1_1 = filter_1.next(); !filter_1_1.done; filter_1_1 = filter_1.next()) {
                    var f = filter_1_1.value;
                    switch (f) {
                        case 'table':
                            query.push(".pbl-ngrid-cell" + cssId);
                            break;
                        case 'header':
                            query.push(".pbl-ngrid-header-cell" + cssId + ":not(.pbl-header-group-cell)");
                            break;
                        case 'headerGroup':
                            query.push(".pbl-header-group-cell" + cssId);
                            break;
                        case 'footer':
                            query.push(".pbl-ngrid-footer-cell" + cssId + ":not(.pbl-footer-group-cell)");
                            break;
                        case 'footerGroup':
                            query.push(".pbl-footer-group-cell" + cssId);
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (filter_1_1 && !filter_1_1.done && (_a = filter_1.return)) _a.call(filter_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        // we query from the master table container and not CDKTable because of fixed meta rows
        return query.length === 0 ? [] : (/** @type {?} */ (Array.from(this.extApi.element.querySelectorAll(query.join(', ')))));
    };
    /** @internal */
    /**
     * \@internal
     * @return {?}
     */
    PblNgridColumnDef.prototype.ngOnDestroy = /**
     * \@internal
     * @return {?}
     */
    function () {
        this.detach();
        this.widthChange.complete();
    };
    /**
     * @return {?}
     */
    PblNgridColumnDef.prototype.onResize = /**
     * @return {?}
     */
    function () {
        if (isPblColumn(this.column)) {
            /** @type {?} */
            var prevNetWidth = this._netWidth;
            this._netWidth = this.widthBreakout(this.column.sizeInfo).content;
            if (prevNetWidth !== this._netWidth) {
                /** @type {?} */
                var width = this._netWidth + "px";
                this.updateWidth(width, 'resize');
            }
        }
    };
    /**
     * @param {?=} pin
     * @return {?}
     */
    PblNgridColumnDef.prototype.updatePin = /**
     * @param {?=} pin
     * @return {?}
     */
    function (pin) {
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
    };
    /**
     * @private
     * @param {?} column
     * @return {?}
     */
    PblNgridColumnDef.prototype.attach = /**
     * @private
     * @param {?} column
     * @return {?}
     */
    function (column) {
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
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridColumnDef.prototype.detach = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._column) {
            this._column.detach();
            this._column = undefined;
        }
    };
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
    PblNgridColumnDef.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
    ]; };
    PblNgridColumnDef.propDecorators = {
        column: [{ type: Input, args: ['pblNgridColumnDef',] }],
        widthChange: [{ type: Output, args: ['pblNgridColumnDefWidthChange',] }]
    };
    return PblNgridColumnDef;
}(CdkColumnDef));
export { PblNgridColumnDef };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9kaXJlY3RpdmVzL2NvbHVtbi1kZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFFQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sd0JBQXdCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQzs7OztBQU94RSxzQ0FFQzs7O0lBREMsa0NBQTBCOzs7Ozs7Ozs7O0FBVTVCO0lBT2tFLHFDQUFZO0lBbUQ1RSwyQkFBNkMsTUFBaUM7UUFBOUUsWUFDRSxpQkFBTyxTQUtSO1FBTjRDLFlBQU0sR0FBTixNQUFNLENBQTJCO1FBakM5RSxnQkFBVSxHQUFHLEtBQUssQ0FBQzs7OztRQVNxQixpQkFBVyxHQUFHLElBQUksWUFBWSxFQUFvQixDQUFDOzs7Ozs7Ozs7OztRQWNuRixhQUFPLEdBQTJCLEVBQUUsQ0FBQztRQVkzQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQzs7WUFFL0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLFFBQVE7UUFDckQsS0FBSSxDQUFDLGFBQWE7Ozs7UUFBRyxVQUFBLENBQUMsSUFBSSxPQUFBLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUEsQ0FBQzs7SUFDaEQsQ0FBQztJQXhERCxzQkFBZ0MscUNBQU07Ozs7UUFBdEMsY0FBOEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDcEUsVUFBVyxLQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUR3QjtJQUFBLENBQUM7SUFTckUsc0JBQUkscUNBQU07UUFOVjs7Ozs7V0FLRzs7Ozs7Ozs7UUFDSCxjQUF5QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQU1sRCxzQkFBSSx1Q0FBUTtRQUpaOzs7V0FHRzs7Ozs7O1FBQ0gsY0FBeUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUEyQ2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUNILHVDQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUFYLFVBQVksS0FBYSxFQUFFLE1BQXlCO1FBQzVDLElBQUEsaUJBQTRDLEVBQTFDLDhCQUFZLEVBQUUsNEJBQTRCOzs7Ozs7O1lBTzVDLFVBQVUsR0FBRyxZQUFZO1lBQzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUTs7WUFHckIsUUFBUSxHQUFHLFVBQVUsSUFBTyxVQUFVLE9BQUk7UUFDOUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxHQUFHLEVBQUU7WUFDeEQsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUNsQjs7WUFFSyxRQUFRLEdBQUcsWUFBWTtZQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1lBQ25HLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVE7O1lBR25CLFNBQVMsR0FBRyxtQkFBQSxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUcsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUksUUFBUSxPQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFZO1FBQzFGLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sUUFBQSxFQUFFLENBQUMsQ0FBQztTQUNuQzthQUFNOztnQkFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQzthQUM3QjtZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzFCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxDQUFDLENBQUM7b0JBQ2xDLE1BQU07aUJBQ1A7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVEOztPQUVHOzs7Ozs7SUFDSCxzQ0FBVTs7Ozs7SUFBVixVQUFXLE9BQW9CLElBQVUsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTFFOztPQUVHOzs7Ozs7SUFDSCw0Q0FBZ0I7Ozs7O0lBQWhCLFVBQWlCLE9BQW9CLElBQVUsUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBGOzs7O09BSUc7Ozs7Ozs7O0lBQ0gsNkNBQWlCOzs7Ozs7O0lBQWpCOztRQUFrQixnQkFBK0U7YUFBL0UsVUFBK0UsRUFBL0UscUJBQStFLEVBQS9FLElBQStFO1lBQS9FLDJCQUErRTs7O1lBQ3pGLEtBQUssR0FBRyxNQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUc7O1lBRW5DLEtBQUssR0FBYSxFQUFFO1FBRTFCLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkIsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQjthQUFNOztnQkFDTCxLQUFnQixJQUFBLFdBQUEsU0FBQSxNQUFNLENBQUEsOEJBQUEsa0RBQUU7b0JBQW5CLElBQU0sQ0FBQyxtQkFBQTtvQkFDVixRQUFRLENBQUMsRUFBRTt3QkFDVCxLQUFLLE9BQU87NEJBQ1gsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBa0IsS0FBTyxDQUFDLENBQUM7NEJBQ3RDLE1BQU07d0JBQ1AsS0FBSyxRQUFROzRCQUNaLEtBQUssQ0FBQyxJQUFJLENBQUMsMkJBQXlCLEtBQUssaUNBQThCLENBQUMsQ0FBQzs0QkFDekUsTUFBTTt3QkFDUCxLQUFLLGFBQWE7NEJBQ2pCLEtBQUssQ0FBQyxJQUFJLENBQUMsMkJBQXlCLEtBQU8sQ0FBQyxDQUFDOzRCQUM3QyxNQUFNO3dCQUNQLEtBQUssUUFBUTs0QkFDWixLQUFLLENBQUMsSUFBSSxDQUFDLDJCQUF5QixLQUFLLGlDQUE4QixDQUFDLENBQUM7NEJBQ3pFLE1BQU07d0JBQ1AsS0FBSyxhQUFhOzRCQUNqQixLQUFLLENBQUMsSUFBSSxDQUFDLDJCQUF5QixLQUFPLENBQUMsQ0FBQzs0QkFDN0MsTUFBTTtxQkFDUjtpQkFDRjs7Ozs7Ozs7O1NBQ0Y7UUFDRCx1RkFBdUY7UUFDdkYsT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBQSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFPLENBQUM7SUFDN0csQ0FBQztJQUVELGdCQUFnQjs7Ozs7SUFDaEIsdUNBQVc7Ozs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUjtRQUNFLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTs7Z0JBQ3RCLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFFbEUsSUFBSSxZQUFZLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRTs7b0JBQzdCLEtBQUssR0FBTSxJQUFJLENBQUMsU0FBUyxPQUFJO2dCQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNuQztTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxxQ0FBUzs7OztJQUFULFVBQVUsR0FBcUI7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUNyQyxRQUFPLEdBQUcsRUFBRTtZQUNWLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDbkIsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsTUFBTTtTQUNUO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sa0NBQU07Ozs7O0lBQWQsVUFBZSxNQUFTO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLENBQUMsbUJBQUEsTUFBTSxFQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzVCO2FBQ0Y7U0FDRjtJQUNILENBQUM7Ozs7O0lBRU8sa0NBQU07Ozs7SUFBZDtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7Z0JBbk9GLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixTQUFTLEVBQUU7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRTt3QkFDekQsRUFBRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFO3FCQUMxRTtpQkFDRjs7OztnREFvRGMsTUFBTSxTQUFDLGFBQWE7Ozt5QkFsRGhDLEtBQUssU0FBQyxtQkFBbUI7OEJBMEJ6QixNQUFNLFNBQUMsOEJBQThCOztJQWtNeEMsd0JBQUM7Q0FBQSxBQXBPRCxDQU9rRSxZQUFZLEdBNk43RTtTQTdOWSxpQkFBaUI7OztJQWtCNUIsdUNBQW1COzs7OztJQUduQixrQ0FBcUM7O0lBQ3JDLGlDQUFzQzs7Ozs7SUFLdEMsd0NBQTJGOzs7OztJQUUzRixvQ0FBbUI7Ozs7Ozs7Ozs7Ozs7SUFZbkIsb0NBQTZDOzs7Ozs7O0lBTTdDLHNDQUEwQjs7Ozs7SUFFMUIsMENBQTJGOzs7OztJQUUvRSxtQ0FBa0U7Ozs7Ozs7OztBQWlMaEYsU0FBUyxRQUFRLENBQUMsRUFBZSxFQUFFLE1BQWdCO0lBQ2pELEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTlCLDZIQUE2SDtJQUM3SCw2Q0FBNkM7SUFDN0MsOEZBQThGO0lBQzlGLCtGQUErRjtJQUUvRiwrR0FBK0c7SUFDL0csZ0dBQWdHO0lBQ2hHLG1FQUFtRTtJQUNuRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3hDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztLQUNuQztTQUFNO1FBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgSW5qZWN0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka0NvbHVtbkRlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5cbmltcG9ydCB7IENPTFVNTiB9IGZyb20gJy4uL2NvbHVtbnMnO1xuaW1wb3J0IHsgaXNQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFWFRfQVBJX1RPS0VOLCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgdW5pcXVlQ29sdW1uQ3NzIH0gZnJvbSAnLi4vY2lyY3VsYXItZGVwLWJyaWRnZSc7XG5pbXBvcnQgeyB3aWR0aEJyZWFrb3V0IH0gZnJvbSAnLi4vY29sLXdpZHRoLWxvZ2ljL2R5bmFtaWMtY29sdW1uLXdpZHRoJztcbmltcG9ydCB7IFBibENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBVcGRhdGVXaWR0aFJlYXNvbiA9ICdhdHRhY2gnIHwgJ3VwZGF0ZScgfCAncmVzaXplJztcblxuZXhwb3J0IHR5cGUgV2lkdGhTZXQgPSBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lkdGhDaGFuZ2VFdmVudCB7XG4gIHJlYXNvbjogVXBkYXRlV2lkdGhSZWFzb247XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJ1bnRpbWUgY29sdW1uIGRlZmluaXRpb24gZm9yIGEgdXNlci1kZWZpbmVkIGNvbHVtbiBkZWZpbml0aW9ucy5cbiAqXG4gKiBVc2VyIGRlZmluZWQgY29sdW1uIGRlZmluaXRpb25zIGFyZSBgUGJsQ29sdW1uYCwgYFBibE1ldGFDb2x1bW5gLCBgUGJsQ29sdW1uR3JvdXBgIGV0Yy4uLlxuICogVGhleSByZXByZXNlbnQgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9ucyBhbmQgYFBibE5ncmlkQ29sdW1uRGVmYCBpcyB0aGUgcnVudGltZSBpbnN0YW5jZSBvZiB0aGVtLlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE5ncmlkQ29sdW1uRGVmXScsXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrQ29sdW1uRGVmLCB1c2VFeGlzdGluZzogUGJsTmdyaWRDb2x1bW5EZWYgfSxcbiAgICB7IHByb3ZpZGU6ICdNQVRfU09SVF9IRUFERVJfQ09MVU1OX0RFRicsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRlZiB9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ29sdW1uRGVmPFQgZXh0ZW5kcyBDT0xVTU4gPSBDT0xVTU4+IGV4dGVuZHMgQ2RrQ29sdW1uRGVmIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCdwYmxOZ3JpZENvbHVtbkRlZicpIGdldCBjb2x1bW4oKTogVCB7IHJldHVybiB0aGlzLl9jb2x1bW47IH07XG4gIHNldCBjb2x1bW4odmFsdWU6IFQpIHsgdGhpcy5hdHRhY2godmFsdWUpOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBhYnNvbHV0ZSB3aWR0aCBkZWZpbml0aW9ucywgYXMgY3VycmVudGx5IHNldCBpbiB0aGUgRE9NIChnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkuXG4gICAqIElmIG5vIG1lYXN1cmVtZW50cyBleGlzdHMgeWV0LCByZXR1cm4gdGhlIHVzZXIgZGVmaW5lZCB3aWR0aCdzLlxuICAgKlxuICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICAgKi9cbiAgZ2V0IHdpZHRocygpOiBXaWR0aFNldCB7IHJldHVybiB0aGlzLl93aWR0aHNbMV07IH1cblxuICAvKipcbiAgICogVGhlIGxhc3QgbmV0IHdpZHRoIG9mIHRoZSBjb2x1bW4uXG4gICAqIFRoZSBuZXQgd2lkdGggaXMgdGhlIGFic29sdXRlIHdpZHRoIG9mIHRoZSBjb2x1bW4sIHdpdGhvdXQgcGFkZGluZywgYm9yZGVyIGV0Yy4uLlxuICAgKi9cbiAgZ2V0IG5ldFdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9uZXRXaWR0aDsgfVxuXG4gIGlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG5cbiAgLyoqXG4gICAqIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB3aWR0aCBvZiB0aGlzIGNvbHVtbiBoYXMgY2hhbmdlZC5cbiAgICovXG4gIEBPdXRwdXQoJ3BibE5ncmlkQ29sdW1uRGVmV2lkdGhDaGFuZ2UnKSB3aWR0aENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8V2lkdGhDaGFuZ2VFdmVudD4oKTtcblxuICBwcml2YXRlIF9jb2x1bW46IFQ7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wbGV0ZSB3aWR0aCBkZWZpbml0aW9uIGZvciB0aGUgY29sdW1uLlxuICAgKlxuICAgKiBUaGVyZSBhcmUgMiB3aWR0aCBzZXRzICh0dXBsZSk6XG4gICAqIC0gWzBdOiBUaGUgc291cmNlIHdpZHRoIGRlZmluaXRpb25zIGFzIHNldCBpbiBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2VcbiAgICogLSBbMV06IFRoZSBhYnNvbHV0ZSB3aWR0aCBkZWZpbml0aW9ucywgYXMgY3VycmVudGx5IHNldCBpbiB0aGUgRE9NIChnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSlcbiAgICpcbiAgICogRWFjaCBzZXQgaXMgbWFkZSB1cCBvZiAzIHByaW1pdGl2ZSB3aWR0aCBkZWZpbml0aW9uczogTUlOLVdJRFRILCBXSURUSCBhbmQgTUFYLVdJRFRILlxuICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICAgKi9cbiAgcHJpdmF0ZSBfd2lkdGhzOiBbV2lkdGhTZXQ/LCBXaWR0aFNldD9dID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IG5ldCB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgbmV0IHdpZHRoIGlzIHRoZSBhYnNvbHV0ZSB3aWR0aCBvZiB0aGUgY29sdW1uLCB3aXRob3V0IHBhZGRpbmcsIGJvcmRlciBldGMuLi5cbiAgICovXG4gIHByaXZhdGUgX25ldFdpZHRoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSB3aWR0aEJyZWFrb3V0OiAoY29sdW1uSW5mbzogUGJsQ29sdW1uU2l6ZUluZm8pID0+IFJldHVyblR5cGU8dHlwZW9mIHdpZHRoQnJlYWtvdXQ+O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHJvdGVjdGVkIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8YW55Pikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5ncmlkID0gdGhpcy50YWJsZSA9IGV4dEFwaS5ncmlkO1xuXG4gICAgY29uc3QgcyA9IGV4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCkuc3RyYXRlZ3k7XG4gICAgdGhpcy53aWR0aEJyZWFrb3V0ID0gYyA9PiB3aWR0aEJyZWFrb3V0KHMsIGMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgXCJ3aWR0aHNcIiBmb3IgdGhpcyBjb2x1bW4gYW5kIHdoZW4gd2lkdGggaGFzIGNoYW5nZWQuXG4gICAqXG4gICAqIFRoZSBcIndpZHRoc1wiIGFyZSB0aGUgMyB2YWx1ZXMgcmVwcmVzZW50aW5nIGEgd2lkdGggb2YgYSBjZWxsOiBbbWluV2lkdGgsIHdpZHRoLCBtYXhXaWR0aF0sXG4gICAqIHRoaXMgbWV0aG9kIGlzIGdpdmVuIHRoZSB3aWR0aCBhbmQgd2lsbCBjYWxjdWxhdGUgdGhlIG1pbldpZHRoIGFuZCBtYXhXaWR0aCBiYXNlZCBvbiB0aGUgY29sdW1uIGRlZmluaXRpb25zLlxuICAgKlxuICAgKiBJZiBhdCBsZWFzdCBvbmUgdmFsdWUgb2YgXCJ3aWR0aHNcIiBoYXMgY2hhbmdlZCwgZmlyZXMgdGhlIGB3aWR0aENoYW5nZWAgZXZlbnQgd2l0aCB0aGUgYHJlYXNvbmAgcHJvdmlkZWQuXG4gICAqXG4gICAqIFRoZSByZWFzb24gY2FuIGJlIHVzZWQgdG8gb3B0aW9uYWxseSB1cGRhdGUgdGhlIHJlbGV2YW50IGNlbGxzLCBiYXNlZCBvbiB0aGUgc291cmNlIChyZWFzb24pIG9mIHRoZSB1cGRhdGUuXG4gICAqIC0gYXR0YWNoOiBUaGlzIHJ1bnRpbWUgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2Ugd2FzIGF0dGFjaGVkIHRvIGEgc3RhdGljIGNvbHVtbiBkZWZpbml0aW9uIGluc3RhbmNlLlxuICAgKiAtIHVwZGF0ZTogVGhlIHdpZHRoIHZhbHVlIHdhcyB1cGRhdGVkIGluIHRoZSBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2UgLCB3aGljaCB0cmlnZ2VyZWQgYSB3aWR0aCB1cGRhdGUgdG8gdGhlIHJ1bnRpbWUgY29sdW1uIGRlZmluaXRpb24gaW5zdGFuY2VcbiAgICogLSByZXNpemU6IEEgcmVzaXplIGV2ZW50IHRvIHRoZSBoZWFkZXIgUGJsQ29sdW1uIGNlbGwgd2FzIHRyaWdnZXJlZCwgdGhlIHdpZHRoIG9mIHRoZSBzdGF0aWMgY29sdW1uIGRlZmluaXRpb24gaXMgbm90IHVwZGF0ZWQsIG9ubHkgdGhlIHJ1bnRpbWUgdmFsdWUgaXMuXG4gICAqXG4gICAqIE5vdGUgdGhhdCB0aGlzIHVwZGF0ZXMgdGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4tZGVmIGluc3RhbmNlLCBub3QgdGhlIGNvbHVtbiBkZWZpbml0aW9ucyB3aWR0aCBpdHNlbGYuXG4gICAqIE9ubHkgd2hlbiBgcmVhc29uID09PSAndXBkYXRlJ2AgaXQgbWVhbnMgdGhhdCB0aGUgY29sdW1uIGRlZmluaXRpb24gd2FzIHVwZGF0ZWQgYW5kIHRyaWdnZXJlZCB0aGlzIHVwZGF0ZVxuICAgKlxuICAgKiBAcGFyYW0gd2lkdGggVGhlIG5ldyB3aWR0aFxuICAgKiBAcGFyYW0gcmVhc29uIFRoZSByZWFzb24gZm9yIHRoaXMgY2hhbmdlXG4gICAqL1xuICB1cGRhdGVXaWR0aCh3aWR0aDogc3RyaW5nLCByZWFzb246IFVwZGF0ZVdpZHRoUmVhc29uKTogdm9pZCB7XG4gICAgY29uc3QgeyBpc0ZpeGVkV2lkdGgsIHBhcnNlZFdpZHRoIH0gPSB0aGlzLl9jb2x1bW47XG5cbiAgICAvKiAgU2V0dGluZyB0aGUgbWluaW11bSB3aWR0aCBpcyBiYXNlZCBvbiB0aGUgaW5wdXQuXG4gICAgICAgIElmIHRoZSBvcmlnaW5hbCB3aWR0aCBpcyBwaXhlbCBmaXhlZCB3ZSB3aWxsIHRha2UgdGhlIG1heGltdW0gYmV0d2VlbiBpdCBhbmQgdGhlIG1pbiB3aWR0aC5cbiAgICAgICAgSWYgbm90LCB3ZSB3aWxsIHRoZSB0YWtlIG1pbldpZHRoLlxuICAgICAgICBJZiBub25lIG9mIHRoZSBhYm92ZSB3b3JrZWQgd2Ugd2lsbCB0cnkgdG8gc2VlIGlmIHRoZSBjdXJyZW50IHdpZHRoIGlzIHNldCB3aXRoICUsIGlmIHNvIGl0IHdpbGwgYmUgb3VyIG1pbiB3aWR0aC5cbiAgICAqL1xuICAgIGNvbnN0IG1pbldpZHRoUHggPSBpc0ZpeGVkV2lkdGhcbiAgICAgID8gTWF0aC5tYXgodGhpcy5fY29sdW1uLnBhcnNlZFdpZHRoLnZhbHVlLCB0aGlzLl9jb2x1bW4ubWluV2lkdGggfHwgMClcbiAgICAgIDogdGhpcy5fY29sdW1uLm1pbldpZHRoXG4gICAgO1xuXG4gICAgbGV0IG1pbldpZHRoID0gbWluV2lkdGhQeCAmJiBgJHttaW5XaWR0aFB4fXB4YDtcbiAgICBpZiAoIW1pbldpZHRoICYmIHBhcnNlZFdpZHRoICYmIHBhcnNlZFdpZHRoLnR5cGUgPT09ICclJykge1xuICAgICAgbWluV2lkdGggPSB3aWR0aDtcbiAgICB9XG5cbiAgICBjb25zdCBtYXhXaWR0aCA9IGlzRml4ZWRXaWR0aFxuICAgICAgPyBNYXRoLm1pbih0aGlzLl9jb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUsIHRoaXMuX2NvbHVtbi5tYXhXaWR0aCB8fCB0aGlzLl9jb2x1bW4ucGFyc2VkV2lkdGgudmFsdWUpXG4gICAgICA6IHRoaXMuX2NvbHVtbi5tYXhXaWR0aFxuICAgIDtcblxuICAgIGNvbnN0IG5ld1dpZHRocyA9IFttaW5XaWR0aCB8fCAnJywgIHdpZHRoLCBtYXhXaWR0aCA/IGAke21heFdpZHRofXB4YCA6IHdpZHRoXSBhcyBXaWR0aFNldDtcbiAgICBpZiAocmVhc29uID09PSAncmVzaXplJykge1xuICAgICAgdGhpcy5fd2lkdGhzWzFdID0gbmV3V2lkdGhzO1xuICAgICAgdGhpcy53aWR0aENoYW5nZS5lbWl0KHsgcmVhc29uIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fd2lkdGhzWzBdIHx8IFtdO1xuICAgICAgdGhpcy5fd2lkdGhzWzBdID0gbmV3V2lkdGhzO1xuICAgICAgaWYgKCF0aGlzLl93aWR0aHNbMV0pIHtcbiAgICAgICAgdGhpcy5fd2lkdGhzWzFdID0gbmV3V2lkdGhzO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaWYgKHByZXZbaV0gIT09IG5ld1dpZHRoc1tpXSkge1xuICAgICAgICAgIHRoaXMud2lkdGhDaGFuZ2UuZW1pdCh7IHJlYXNvbiB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSB0aGUgY3VycmVudCBhYnNvbHV0ZSB3aWR0aCBkZWZpbml0aW9ucyAobWluV2lkdGgsIHdpZHRoLCBtYXhXaWR0aCkgb250byBhbiBlbGVtZW50LlxuICAgKi9cbiAgYXBwbHlXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQgeyBzZXRXaWR0aChlbGVtZW50LCB0aGlzLndpZHRocyk7IH1cblxuICAvKipcbiAgICogQXBwbHkgdGhlIHNvdXJjZSB3aWR0aCBkZWZpbml0aW9ucyApc2V0IGluIHN0YXRpYyBjb2x1bW4gZGVmaW5pdGlvbiBpbnN0YW5jZSkgb250byBhbiBlbGVtZW50LlxuICAgKi9cbiAgYXBwbHlTb3VyY2VXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQgeyBzZXRXaWR0aChlbGVtZW50LCB0aGlzLl93aWR0aHNbMF0pOyB9XG5cbiAgLyoqXG4gICAqIFF1ZXJ5IGZvciBjZWxsIGVsZW1lbnRzIHJlbGF0ZWQgdG8gdGhpcyBjb2x1bW4gZGVmaW5pdGlvbi5cbiAgICpcbiAgICogVGhpcyBxdWVyeSBpcyBub3QgY2FjaGVkIC0gY2FjaGUgaW4gaW1wbGVtZW50YXRpb24uXG4gICAqL1xuICBxdWVyeUNlbGxFbGVtZW50cyguLi5maWx0ZXI6IEFycmF5PCd0YWJsZScgfCAnaGVhZGVyJyB8ICdoZWFkZXJHcm91cCcgfCAnZm9vdGVyJyB8ICdmb290ZXJHcm91cCc+KTogSFRNTEVsZW1lbnRbXSB7XG4gICAgY29uc3QgY3NzSWQgPSBgLiR7dW5pcXVlQ29sdW1uQ3NzKHRoaXMpfWA7XG5cbiAgICBjb25zdCBxdWVyeTogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChmaWx0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICBxdWVyeS5wdXNoKGNzc0lkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChjb25zdCBmIG9mIGZpbHRlcikge1xuICAgICAgICBzd2l0Y2ggKGYpIHtcbiAgICAgICAgICBjYXNlICd0YWJsZSc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtbmdyaWQtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtbmdyaWQtaGVhZGVyLWNlbGwke2Nzc0lkfTpub3QoLnBibC1oZWFkZXItZ3JvdXAtY2VsbClgKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnaGVhZGVyR3JvdXAnOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLWhlYWRlci1ncm91cC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1uZ3JpZC1mb290ZXItY2VsbCR7Y3NzSWR9Om5vdCgucGJsLWZvb3Rlci1ncm91cC1jZWxsKWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb290ZXJHcm91cCc6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtZm9vdGVyLWdyb3VwLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB3ZSBxdWVyeSBmcm9tIHRoZSBtYXN0ZXIgdGFibGUgY29udGFpbmVyIGFuZCBub3QgQ0RLVGFibGUgYmVjYXVzZSBvZiBmaXhlZCBtZXRhIHJvd3NcbiAgICByZXR1cm4gcXVlcnkubGVuZ3RoID09PSAwID8gW10gOiBBcnJheS5mcm9tKHRoaXMuZXh0QXBpLmVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyeS5qb2luKCcsICcpKSkgYXMgYW55O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMud2lkdGhDaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICAgIGlmIChpc1BibENvbHVtbih0aGlzLmNvbHVtbikpIHtcbiAgICAgIGNvbnN0IHByZXZOZXRXaWR0aCA9IHRoaXMuX25ldFdpZHRoO1xuICAgICAgdGhpcy5fbmV0V2lkdGggPSB0aGlzLndpZHRoQnJlYWtvdXQodGhpcy5jb2x1bW4uc2l6ZUluZm8pLmNvbnRlbnQ7XG5cbiAgICAgIGlmIChwcmV2TmV0V2lkdGggIT09IHRoaXMuX25ldFdpZHRoKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gYCR7dGhpcy5fbmV0V2lkdGh9cHhgO1xuICAgICAgICB0aGlzLnVwZGF0ZVdpZHRoKHdpZHRoLCAncmVzaXplJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGluKHBpbj86ICdzdGFydCcgfCAnZW5kJyk6IHZvaWQge1xuICAgIHRoaXMuc3RpY2t5ID0gdGhpcy5zdGlja3lFbmQgPSBmYWxzZTtcbiAgICBzd2l0Y2gocGluKSB7XG4gICAgICBjYXNlICdzdGFydCc6XG4gICAgICAgIHRoaXMuc3RpY2t5ID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdlbmQnOlxuICAgICAgICB0aGlzLnN0aWNreUVuZCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaChjb2x1bW46IFQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY29sdW1uICE9PSBjb2x1bW4pIHtcbiAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICBpZiAoY29sdW1uKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICAgICAgKGNvbHVtbiBhcyBhbnkpLmF0dGFjaCh0aGlzKTtcbiAgICAgICAgdGhpcy5uYW1lID0gY29sdW1uLmlkLnJlcGxhY2UoLyAvZywgJ18nKTtcblxuICAgICAgICBpZiAoaXNQYmxDb2x1bW4oY29sdW1uKSkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUGluKGNvbHVtbi5waW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbikge1xuICAgICAgdGhpcy5fY29sdW1uLmRldGFjaCgpO1xuICAgICAgdGhpcy5fY29sdW1uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUgd2lkdGhzIG9mIGFuIEhUTUxFbGVtZW50XG4gKiBAcGFyYW0gZWwgVGhlIGVsZW1lbnQgdG8gc2V0IHdpZHRocyB0b1xuICogQHBhcmFtIHdpZHRocyBUaGUgd2lkdGhzLCBhIHR1cGxlIG9mIDMgc3RyaW5ncyBbIE1JTi1XSURUSCwgV0lEVEgsIE1BWC1XSURUSCBdXG4gKi9cbmZ1bmN0aW9uIHNldFdpZHRoKGVsOiBIVE1MRWxlbWVudCwgd2lkdGhzOiBXaWR0aFNldCkge1xuICBlbC5zdHlsZS5taW5XaWR0aCA9IHdpZHRoc1swXTtcbiAgZWwuc3R5bGUud2lkdGggPSB3aWR0aHNbMV07XG4gIGVsLnN0eWxlLm1heFdpZHRoID0gd2lkdGhzWzJdO1xuXG4gIC8vIFRPRE8oc2hsb21pYXNzYWYpW3BlcmYsIDRdOiBJbnN0ZWFkIG9mIHVzaW5nIGEgdHVwbGUgZm9yIHdpZHRoLCB1c2UgYSBDU1NTdHlsZURlY2xhcmF0aW9uIG9iamVjdCBhbmQganVzdCBhc3NpZ24gdGhlIHByb3BzXG4gIC8vIFRoaXMgd2lsbCBhdm9pZCB0aGUgYWRkaXRpb25hbCBjaGVjayBmb3IgJVxuICAvLyBXZSB3aWxsIG5lZWQgdG8gaW1wbGVtZW50IGl0IGluIGFsbCBwbGFjZXMgdGhhdCBgX3dpZHRoc2AgaXMgdXBkYXRlZCBpbiBgUGJsTmdyaWRDb2x1bW5EZWZgXG4gIC8vIEFub3RoZXIgVE9ETyBpcyB0byBjYWNoZSB0aGUgcHJldmlvdXMgYGJveFNpemluZ2AgaW4gYW55IGNhc2UgdGhlIGNvbHVtbiBkZWZpbml0aW9uIGNoYW5nZXMuXG5cbiAgLy8gV2hlbiB0aGUgY29sdW1uIGRvZXMgbm90IGhhdmUgYW4gZXhwbGljaXQgYG1pbldpZHRoYCBzZXQgYW5kIHdoZW4gdGhlIGB3aWR0aGAgaXMgc2V0IGV4cGxpY2l0bHkgdG8gYSAlIHZhbHVlXG4gIC8vIHRoZSBsb2dpYyBpbiBgUGJsTmdyaWRDb2x1bW5EZWYudXBkYXRlV2lkdGhgIHdpbGwgc2V0IGBtaW5XaWR0aGAgdG8gdGhlIHNhbWUgdmFsdWUgaW4gYHdpZHRoYFxuICAvLyBUaGlzIHdpbGwgY2F1c2UgYW4gb3ZlcmZsb3cgdW5sZXNzIHdlIGFwcGx5IHRoZSBib3JkZXItYm94IG1vZGVsXG4gIGlmICh3aWR0aHNbMF0gJiYgd2lkdGhzWzBdLmVuZHNXaXRoKCclJykpIHtcbiAgICBlbC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gIH0gZWxzZSB7XG4gICAgZWwuc3R5bGUuYm94U2l6aW5nID0gJ2NvbnRlbnQtYm94JztcbiAgfVxufVxuIl19