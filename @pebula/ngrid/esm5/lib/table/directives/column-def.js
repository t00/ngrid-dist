/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var PblNgridColumnDef = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridColumnDef, _super);
    function PblNgridColumnDef(_differs, extApi) {
        var _this = _super.call(this) || this;
        _this._differs = _differs;
        _this.extApi = extApi;
        _this.isDragging = false;
        _this._isDirty = false;
        _this._markedForCheck = false;
        _this.table = extApi.table;
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
    Object.defineProperty(PblNgridColumnDef.prototype, "isDirty", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._markedForCheck && !this._isDirty) {
                this._markedForCheck = false;
                this._isDirty = !!this._colDiffer.diff(this._column);
            }
            return this._isDirty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridColumnDef.prototype, "widths", {
        /**
         * The complete width definition for the column.
         * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
         *
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         */
        get: /**
         * The complete width definition for the column.
         * There are 3 width definitions: MIN-WIDTH, WIDTH and MAX-WIDTH.
         *
         * The tuple represents them in that order, i.e: [ MIN-WIDTH, WIDTH, MAX-WIDTH ]
         * @return {?}
         */
        function () { return this._widths; },
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
     */
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
    PblNgridColumnDef.prototype.markForCheck = /**
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
    function () {
        if (!this._colDiffer) {
            this._colDiffer = this._differs.find({}).create();
            this._colDiffer.diff({});
        }
        this._markedForCheck = true;
    };
    /**
     * Update the width definitions for this column. [minWidth, width, maxWidth]
     * If an element is provided it will also apply the widths to the element.
     * @param width The new width
     * @param element Optional, an element to apply the width to, if not set will only update the width definitions.
     */
    /**
     * Update the width definitions for this column. [minWidth, width, maxWidth]
     * If an element is provided it will also apply the widths to the element.
     * @param {?} width The new width
     * @param {?=} element Optional, an element to apply the width to, if not set will only update the width definitions.
     * @return {?}
     */
    PblNgridColumnDef.prototype.updateWidth = /**
     * Update the width definitions for this column. [minWidth, width, maxWidth]
     * If an element is provided it will also apply the widths to the element.
     * @param {?} width The new width
     * @param {?=} element Optional, an element to apply the width to, if not set will only update the width definitions.
     * @return {?}
     */
    function (width, element) {
        var isFixedWidth = this._column.isFixedWidth;
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
        if (!minWidth) {
            /** @type {?} */
            var parsed = parseStyleWidth(width);
            if (parsed && parsed.type === '%') {
                minWidth = width;
            }
        }
        /** @type {?} */
        var maxWidth = isFixedWidth
            ? Math.min(this._column.parsedWidth.value, this._column.maxWidth || this._column.parsedWidth.value)
            : this._column.maxWidth;
        this._widths = [minWidth || '', width, maxWidth ? maxWidth + "px" : width];
        if (element) {
            this.applyWidth(element);
        }
    };
    /**
     * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
     */
    /**
     * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
     * @param {?} element
     * @return {?}
     */
    PblNgridColumnDef.prototype.applyWidth = /**
     * Apply the current width definitions (minWidth, width, maxWidth) onto the element.
     * @param {?} element
     * @return {?}
     */
    function (element) {
        setWidth(element, this.widths);
    };
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
                for (var filter_1 = tslib_1.__values(filter), filter_1_1 = filter_1.next(); !filter_1_1.done; filter_1_1 = filter_1.next()) {
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
    PblNgridColumnDef.prototype.ngDoCheck = /**
     * \@internal
     * @return {?}
     */
    function () {
        if (this._isDirty) {
            this._isDirty = false;
        }
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
    function () { this.detach(); };
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
            this._netWidth = this.extApi.dynamicColumnWidthFactory().widthBreakout(this.column.sizeInfo).content;
            if (prevNetWidth && prevNetWidth !== this._netWidth) {
                /** @type {?} */
                var width = this._netWidth + "px";
                this._widths = [
                    this.widths[0] || width,
                    width,
                    width,
                ];
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
        if (this.table.isInit) {
            this.table._cdkTable.updateStickyColumnStyles();
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
            if (this._colDiffer) {
                this.markForCheck();
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
        { type: KeyValueDiffers },
        { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
    ]; };
    PblNgridColumnDef.propDecorators = {
        column: [{ type: Input, args: ['pblNgridColumnDef',] }]
    };
    return PblNgridColumnDef;
}(CdkColumnDef));
export { PblNgridColumnDef };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLWRlZi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvZGlyZWN0aXZlcy9jb2x1bW4tZGVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFHQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sZUFBZSxHQUdoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWhELE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0seUJBQXlCLENBQUM7QUFDOUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7Ozs7Ozs7O0FBYXpEO0lBT2tFLDZDQUFZO0lBa0Q1RSwyQkFBK0IsUUFBeUIsRUFBbUMsTUFBaUM7UUFBNUgsWUFDRSxpQkFBTyxTQUVSO1FBSDhCLGNBQVEsR0FBUixRQUFRLENBQWlCO1FBQW1DLFlBQU0sR0FBTixNQUFNLENBQTJCO1FBeEI1SCxnQkFBVSxHQUFHLEtBQUssQ0FBQztRQU9YLGNBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIscUJBQWUsR0FBRyxLQUFLLENBQUM7UUFrQjlCLEtBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzs7SUFDNUIsQ0FBQztJQXBERCxzQkFBZ0MscUNBQU07Ozs7UUFBdEMsY0FBOEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDcEUsVUFBVyxLQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUR3QjtJQUFBLENBQUM7SUFHckUsc0JBQUksc0NBQU87Ozs7UUFBWDtZQUNF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eUJBakQ5RSxLQUFLLFNBQUMsbUJBQW1COztJQThONUIsd0JBQUM7Q0FBQSxBQXRPRCxDQU9rRSxZQUFZLEdBK043RTtTQS9OWSxpQkFBaUI7OztJQTBCNUIsdUNBQW1COztJQUVuQixrQ0FBOEI7Ozs7O0lBRTlCLHVDQUErQzs7Ozs7SUFFL0Msb0NBQW1COzs7OztJQUNuQixxQ0FBeUI7Ozs7O0lBQ3pCLDRDQUFnQzs7Ozs7Ozs7O0lBUWhDLG9DQUEwQzs7Ozs7OztJQU0xQyxzQ0FBMEI7Ozs7O0lBRWQscUNBQTRDOzs7OztJQUFFLG1DQUFrRTs7Ozs7Ozs7O0FBb0w5SCxTQUFTLFFBQVEsQ0FBQyxFQUFlLEVBQUUsTUFBZ0M7SUFDakUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFOUIsNkhBQTZIO0lBQzdILDZDQUE2QztJQUM3Qyw4RkFBOEY7SUFDOUYsK0ZBQStGO0lBRS9GLCtHQUErRztJQUMvRyxnR0FBZ0c7SUFDaEcsbUVBQW1FO0lBQ25FLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDeEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0tBQ25DO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuLy8gdHNsaW50OmRpc2FibGU6ZGlyZWN0aXZlLWNsYXNzLXN1ZmZpeFxuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIElucHV0LFxuICBJbmplY3QsXG4gIEtleVZhbHVlRGlmZmVycywgS2V5VmFsdWVEaWZmZXIsXG4gIE9uRGVzdHJveSxcbiAgRG9DaGVjayxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtDb2x1bW5EZWYgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuXG5pbXBvcnQgeyBDT0xVTU4gfSBmcm9tICcuLi9jb2x1bW5zJztcbmltcG9ydCB7IGlzUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBwYXJzZVN0eWxlV2lkdGggfSBmcm9tICcuLi9jb2x1bW5zL3V0aWxzJztcbmltcG9ydCB7IHVuaXF1ZUNvbHVtbkNzcyB9IGZyb20gJy4uL2NpcmN1bGFyLWRlcC1icmlkZ2UnO1xuXG4vKiBUT0RPIFRPRE8gVE9ETyBUT0RPIFRPRE8gVE9ETyBUT0RPIFRPRE8gVE9ETyBUT0RPXG5cbiAgUGJsTmdyaWRDb2x1bW5EZWYgdXNlJ3MgdGhlIGRlZmF1bHQgb2JqZWN0IEtleVZhbHVlRGlmZmVyIHByb3ZpZGVzIHdpdGggYW5ndWxhci5cbiAgVGhpcyBkaWZmZXIgd2lsbCBwZXJmb3JtIHRoZSBkaWZmIG9uIHRoZSBlbnRpcmUgb2JqZWN0IHdoaWNoIElTIE5PVCBSRVFVSVJFRCFcbiAgV2UgbmVlZCB0byBjcmVhdGUgYSBjdXN0b20gZGlmZmVyIHRoYXQgZG9lcyB0aGUgZGlmZiBvbiBzZWxlY3RlZCBwcm9wZXJ0aWVzIG9ubHkuXG4qL1xuXG4vKipcbiAqIENvbHVtbiBkZWZpbml0aW9uIGZvciB0aGUgbWF0LXRhYmxlLlxuICogRGVmaW5lcyBhIHNldCBvZiBjZWxscyBhdmFpbGFibGUgZm9yIGEgdGFibGUgY29sdW1uLlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTmdyaWRDb2x1bW5EZWZdJyxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtDb2x1bW5EZWYsIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZENvbHVtbkRlZiB9LFxuICAgIHsgcHJvdmlkZTogJ01BVF9TT1JUX0hFQURFUl9DT0xVTU5fREVGJywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkQ29sdW1uRGVmIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDb2x1bW5EZWY8VCBleHRlbmRzIENPTFVNTiA9IENPTFVNTj4gZXh0ZW5kcyBDZGtDb2x1bW5EZWYgaW1wbGVtZW50cyBEb0NoZWNrLCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3BibE5ncmlkQ29sdW1uRGVmJykgZ2V0IGNvbHVtbigpOiBUIHsgcmV0dXJuIHRoaXMuX2NvbHVtbjsgfTtcbiAgc2V0IGNvbHVtbih2YWx1ZTogVCkgeyB0aGlzLmF0dGFjaCh2YWx1ZSk7IH1cblxuICBnZXQgaXNEaXJ0eSgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fbWFya2VkRm9yQ2hlY2sgJiYgIXRoaXMuX2lzRGlydHkpIHtcbiAgICAgIHRoaXMuX21hcmtlZEZvckNoZWNrID0gZmFsc2U7XG4gICAgICB0aGlzLl9pc0RpcnR5ID0gISF0aGlzLl9jb2xEaWZmZXIuZGlmZih0aGlzLl9jb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faXNEaXJ0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29tcGxldGUgd2lkdGggZGVmaW5pdGlvbiBmb3IgdGhlIGNvbHVtbi5cbiAgICogVGhlcmUgYXJlIDMgd2lkdGggZGVmaW5pdGlvbnM6IE1JTi1XSURUSCwgV0lEVEggYW5kIE1BWC1XSURUSC5cbiAgICpcbiAgICogVGhlIHR1cGxlIHJlcHJlc2VudHMgdGhlbSBpbiB0aGF0IG9yZGVyLCBpLmU6IFsgTUlOLVdJRFRILCBXSURUSCwgTUFYLVdJRFRIIF1cbiAgICovXG4gIGdldCB3aWR0aHMoKTogW3N0cmluZywgc3RyaW5nLCBzdHJpbmddIHsgcmV0dXJuIHRoaXMuX3dpZHRoczsgfVxuXG4gIC8qKlxuICAgKiBUaGUgbGFzdCBuZXQgd2lkdGggb2YgdGhlIGNvbHVtbi5cbiAgICogVGhlIG5ldCB3aWR0aCBpcyB0aGUgYWJzb2x1dGUgd2lkdGggb2YgdGhlIGNvbHVtbiwgd2l0aG91dCBwYWRkaW5nLCBib3JkZXIgZXRjLi4uXG4gICAqL1xuICBnZXQgbmV0V2lkdGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX25ldFdpZHRoOyB9XG5cbiAgaXNEcmFnZ2luZyA9IGZhbHNlO1xuXG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuXG4gIHByb3RlY3RlZCBfY29sRGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxhbnksIGFueT47XG5cbiAgcHJpdmF0ZSBfY29sdW1uOiBUO1xuICBwcml2YXRlIF9pc0RpcnR5ID0gZmFsc2U7XG4gIHByaXZhdGUgX21hcmtlZEZvckNoZWNrID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wbGV0ZSB3aWR0aCBkZWZpbml0aW9uIGZvciB0aGUgY29sdW1uLlxuICAgKiBUaGVyZSBhcmUgMyB3aWR0aCBkZWZpbml0aW9uczogTUlOLVdJRFRILCBXSURUSCBhbmQgTUFYLVdJRFRILlxuICAgKlxuICAgKiBUaGUgdHVwbGUgcmVwcmVzZW50cyB0aGVtIGluIHRoYXQgb3JkZXIsIGkuZTogWyBNSU4tV0lEVEgsIFdJRFRILCBNQVgtV0lEVEggXVxuICAgKi9cbiAgcHJpdmF0ZSBfd2lkdGhzOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG5cbiAgLyoqXG4gICAqIFRoZSBsYXN0IG5ldCB3aWR0aCBvZiB0aGUgY29sdW1uLlxuICAgKiBUaGUgbmV0IHdpZHRoIGlzIHRoZSBhYnNvbHV0ZSB3aWR0aCBvZiB0aGUgY29sdW1uLCB3aXRob3V0IHBhZGRpbmcsIGJvcmRlciBldGMuLi5cbiAgICovXG4gIHByaXZhdGUgX25ldFdpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJlYWRvbmx5IF9kaWZmZXJzOiBLZXlWYWx1ZURpZmZlcnMsIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHJvdGVjdGVkIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8YW55PiApIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudGFibGUgPSBleHRBcGkudGFibGU7XG4gIH1cblxuICAvKipcbiAgICogTWFya3MgdGhpcyBjb2x1bW4gZm9yIGEgbGF6eSBjaGFuZ2UgZGV0ZWN0aW9uIGNoZWNrLlxuICAgKiBMYXp5IG1lYW5zIGl0IHdpbGwgcnVuIHRoZSBjaGVjayBvbmx5IHdoZW4gdGhlIGRpZmYgaXMgcmVxdWVzdGVkIChpLmUuIHF1ZXJ5aW5nIHRoZSBgaGFzQ2hhbmdlZGAgcHJvcGVydHkpLlxuICAgKiBUaGlzIGFsbG93IGFnZ3JlZ2F0aW9uIG9mIGNoYW5nZXMgYmV0d2VlbiBDRCBjeWNsZXMsIGkuZS4gY2FsbGluZyBgbWFya0ZvckNoZWNrKClgIG11bHRpcGxlIHRpbWVzIHdpdGhpbiB0aGUgc2FtZSBDRCBjeWNsZSBkb2VzIG5vdCBoaXQgcGVyZm9ybWFuY2UuXG4gICAqXG4gICAqIE9uY2UgbWFya2VkIGZvciBjaGVjaywgYHBibE5ncmlkQ29sdW1uRGVmYCBoYW5kbGVzIGl0J3MgZGlydHkgKGBpc0RpcnR5YCkgc3RhdGUgYXV0b21hdGljYWxseSwgd2hlbiBgaXNEaXJ0eWAgaXMgdHJ1ZSBpdCB3aWxsIHJlbWFpbiB0cnVlIHVudGlsIHRoZVxuICAgKiBDRCBjeWNsZSBlbmRzLCBpLmUuIHVudGlsIGBuZ0RvQ2hlY2soKWAgaGl0cy4gVGhpcyBtZWFucyB0aGF0IG9ubHkgY2hpbGRyZW4gb2YgYHBibE5ncmlkQ29sdW1uRGVmYCBjYW4gcmVsYXkgb24gYGlzRGlydHlgLCBhbGwgY2hpbGRyZW4gd2lsbCBydW4gdGhlaXJcbiAgICogYG5nRG9DaGVjaygpYCBiZWZvcmUgYG5nRG9DaGVjaygpYCBvZiBgcGJsTmdyaWRDb2x1bW5EZWZgLlxuICAgKlxuICAgKiBUaGlzIGlzIGEgaG93IHdlIG5vdGlmeSBhbGwgY2VsbCBkaXJlY3RpdmVzIGFib3V0IGNoYW5nZXMgaW4gYSBjb2x1bW4uIEl0IGlzIGRvbmUgdGhyb3VnaCBhbmd1bGFyIENEIGxvZ2ljIGFuZCBkb2VzIG5vdCByZXF1aXJlIG1hbnVhbFxuICAgKiBDRCBraWNrcyBhbmQgc3BlY2lhbCBjaGFubmVscyBiZXR3ZWVuIHBibE5ncmlkQ29sdW1uRGVmIGFuZCBpdCdzIGNoaWxkcmVuLlxuICAgKi9cbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY29sRGlmZmVyKSB7XG4gICAgICB0aGlzLl9jb2xEaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoe30pLmNyZWF0ZSgpO1xuICAgICAgdGhpcy5fY29sRGlmZmVyLmRpZmYoe30pO1xuICAgIH1cbiAgICB0aGlzLl9tYXJrZWRGb3JDaGVjayA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB3aWR0aCBkZWZpbml0aW9ucyBmb3IgdGhpcyBjb2x1bW4uIFttaW5XaWR0aCwgd2lkdGgsIG1heFdpZHRoXVxuICAgKiBJZiBhbiBlbGVtZW50IGlzIHByb3ZpZGVkIGl0IHdpbGwgYWxzbyBhcHBseSB0aGUgd2lkdGhzIHRvIHRoZSBlbGVtZW50LlxuICAgKiBAcGFyYW0gd2lkdGggVGhlIG5ldyB3aWR0aFxuICAgKiBAcGFyYW0gZWxlbWVudCBPcHRpb25hbCwgYW4gZWxlbWVudCB0byBhcHBseSB0aGUgd2lkdGggdG8sIGlmIG5vdCBzZXQgd2lsbCBvbmx5IHVwZGF0ZSB0aGUgd2lkdGggZGVmaW5pdGlvbnMuXG4gICAqL1xuICB1cGRhdGVXaWR0aCh3aWR0aDogc3RyaW5nLCBlbGVtZW50PzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCB7IGlzRml4ZWRXaWR0aCB9ID0gdGhpcy5fY29sdW1uO1xuXG4gICAgLyogIFNldHRpbmcgdGhlIG1pbmltdW0gd2lkdGggaXMgYmFzZWQgb24gdGhlIGlucHV0LlxuICAgICAgICBJZiB0aGUgb3JpZ2luYWwgd2lkdGggaXMgcGl4ZWwgZml4ZWQgd2Ugd2lsbCB0YWtlIHRoZSBtYXhpbXVtIGJldHdlZW4gaXQgYW5kIHRoZSBtaW4gd2lkdGguXG4gICAgICAgIElmIG5vdCwgd2Ugd2lsbCB0aGUgdGFrZSBtaW5XaWR0aC5cbiAgICAgICAgSWYgbm9uZSBvZiB0aGUgYWJvdmUgd29ya2VkIHdlIHdpbGwgdHJ5IHRvIHNlZSBpZiB0aGUgY3VycmVudCB3aWR0aCBpcyBzZXQgd2l0aCAlLCBpZiBzbyBpdCB3aWxsIGJlIG91ciBtaW4gd2lkdGguXG4gICAgKi9cbiAgICBjb25zdCBtaW5XaWR0aFB4ID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWF4KHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1pbldpZHRoIHx8IDApXG4gICAgICA6IHRoaXMuX2NvbHVtbi5taW5XaWR0aFxuICAgIDtcblxuICAgIGxldCBtaW5XaWR0aCA9IG1pbldpZHRoUHggJiYgYCR7bWluV2lkdGhQeH1weGA7XG4gICAgaWYgKCFtaW5XaWR0aCkge1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VTdHlsZVdpZHRoKHdpZHRoKTtcbiAgICAgIGlmIChwYXJzZWQgJiYgcGFyc2VkLnR5cGUgPT09ICclJykge1xuICAgICAgICBtaW5XaWR0aCA9IHdpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1heFdpZHRoID0gaXNGaXhlZFdpZHRoXG4gICAgICA/IE1hdGgubWluKHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSwgdGhpcy5fY29sdW1uLm1heFdpZHRoIHx8IHRoaXMuX2NvbHVtbi5wYXJzZWRXaWR0aC52YWx1ZSlcbiAgICAgIDogdGhpcy5fY29sdW1uLm1heFdpZHRoXG4gICAgO1xuXG4gICAgdGhpcy5fd2lkdGhzID0gW21pbldpZHRoIHx8ICcnLCAgd2lkdGgsIG1heFdpZHRoID8gYCR7bWF4V2lkdGh9cHhgIDogd2lkdGhdO1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICB0aGlzLmFwcGx5V2lkdGgoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHRoZSBjdXJyZW50IHdpZHRoIGRlZmluaXRpb25zIChtaW5XaWR0aCwgd2lkdGgsIG1heFdpZHRoKSBvbnRvIHRoZSBlbGVtZW50LlxuICAgKi9cbiAgYXBwbHlXaWR0aChlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIHNldFdpZHRoKGVsZW1lbnQsIHRoaXMud2lkdGhzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBRdWVyeSBmb3IgY2VsbCBlbGVtZW50cyByZWxhdGVkIHRvIHRoaXMgY29sdW1uIGRlZmluaXRpb24uXG4gICAqXG4gICAqIFRoaXMgcXVlcnkgaXMgbm90IGNhY2hlZCAtIGNhY2hlIGluIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgcXVlcnlDZWxsRWxlbWVudHMoLi4uZmlsdGVyOiBBcnJheTwndGFibGUnIHwgJ2hlYWRlcicgfCAnaGVhZGVyR3JvdXAnIHwgJ2Zvb3RlcicgfCAnZm9vdGVyR3JvdXAnPik6IEhUTUxFbGVtZW50W10ge1xuICAgIGNvbnN0IGNzc0lkID0gYC4ke3VuaXF1ZUNvbHVtbkNzcyh0aGlzKX1gO1xuXG4gICAgY29uc3QgcXVlcnk6IHN0cmluZ1tdID0gW107XG5cbiAgICBpZiAoZmlsdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcXVlcnkucHVzaChjc3NJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgZiBvZiBmaWx0ZXIpIHtcbiAgICAgICAgc3dpdGNoIChmKSB7XG4gICAgICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWNlbGwke2Nzc0lkfWApO1xuICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLW5ncmlkLWhlYWRlci1jZWxsJHtjc3NJZH06bm90KC5wYmwtaGVhZGVyLWdyb3VwLWNlbGwpYCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hlYWRlckdyb3VwJzpcbiAgICAgICAgICAgcXVlcnkucHVzaChgLnBibC1oZWFkZXItZ3JvdXAtY2VsbCR7Y3NzSWR9YCk7XG4gICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgIHF1ZXJ5LnB1c2goYC5wYmwtbmdyaWQtZm9vdGVyLWNlbGwke2Nzc0lkfTpub3QoLnBibC1mb290ZXItZ3JvdXAtY2VsbClgKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZm9vdGVyR3JvdXAnOlxuICAgICAgICAgICBxdWVyeS5wdXNoKGAucGJsLWZvb3Rlci1ncm91cC1jZWxsJHtjc3NJZH1gKTtcbiAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gd2UgcXVlcnkgZnJvbSB0aGUgbWFzdGVyIHRhYmxlIGNvbnRhaW5lciBhbmQgbm90IENES1RhYmxlIGJlY2F1c2Ugb2YgZml4ZWQgbWV0YSByb3dzXG4gICAgcmV0dXJuIHF1ZXJ5Lmxlbmd0aCA9PT0gMCA/IFtdIDogQXJyYXkuZnJvbSh0aGlzLmV4dEFwaS5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkuam9pbignLCAnKSkpIGFzIGFueTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pc0RpcnR5KSB7XG4gICAgICB0aGlzLl9pc0RpcnR5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5kZXRhY2goKTsgfVxuXG4gIG9uUmVzaXplKCk6IHZvaWQge1xuICAgIGlmIChpc1BibENvbHVtbih0aGlzLmNvbHVtbikpIHtcbiAgICAgIGNvbnN0IHByZXZOZXRXaWR0aCA9IHRoaXMuX25ldFdpZHRoO1xuICAgICAgdGhpcy5fbmV0V2lkdGggPSB0aGlzLmV4dEFwaS5keW5hbWljQ29sdW1uV2lkdGhGYWN0b3J5KCkud2lkdGhCcmVha291dCh0aGlzLmNvbHVtbi5zaXplSW5mbykuY29udGVudDtcblxuICAgICAgaWYgKHByZXZOZXRXaWR0aCAmJiBwcmV2TmV0V2lkdGggIT09IHRoaXMuX25ldFdpZHRoKSB7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gYCR7dGhpcy5fbmV0V2lkdGh9cHhgO1xuICAgICAgICB0aGlzLl93aWR0aHMgPSBbXG4gICAgICAgICAgdGhpcy53aWR0aHNbMF0gfHwgd2lkdGgsICAvLyBtaW5cbiAgICAgICAgICB3aWR0aCwgICAgICAgICAgICAgICAgICAgIC8vIHdpZHRoXG4gICAgICAgICAgd2lkdGgsICAgICAgICAgICAgICAgICAgICAvLyBtYXhcbiAgICAgICAgXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVQaW4ocGluPzogJ3N0YXJ0JyB8ICdlbmQnKTogdm9pZCB7XG4gICAgdGhpcy5zdGlja3kgPSB0aGlzLnN0aWNreUVuZCA9IGZhbHNlO1xuICAgIHN3aXRjaChwaW4pIHtcbiAgICAgIGNhc2UgJ3N0YXJ0JzpcbiAgICAgICAgdGhpcy5zdGlja3kgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgIHRoaXMuc3RpY2t5RW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2goY29sdW1uOiBUKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbiAhPT0gY29sdW1uKSB7XG4gICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgaWYgKGNvbHVtbikge1xuICAgICAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIChjb2x1bW4gYXMgYW55KS5hdHRhY2godGhpcyk7XG4gICAgICAgIHRoaXMubmFtZSA9IGNvbHVtbi5pZC5yZXBsYWNlKC8gL2csICdfJyk7XG5cbiAgICAgICAgaWYgKGlzUGJsQ29sdW1uKGNvbHVtbikpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVBpbihjb2x1bW4ucGluKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fY29sRGlmZmVyKSB7XG4gICAgICAgIHRoaXMubWFya0ZvckNoZWNrKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2goKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbikge1xuICAgICAgdGhpcy5fY29sdW1uLmRldGFjaCgpO1xuICAgICAgdGhpcy5fY29sdW1uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUgd2lkdGhzIG9mIGFuIEhUTUxFbGVtZW50XG4gKiBAcGFyYW0gZWwgVGhlIGVsZW1lbnQgdG8gc2V0IHdpZHRocyB0b1xuICogQHBhcmFtIHdpZHRocyBUaGUgd2lkdGhzLCBhIHR1cGxlIG9mIDMgc3RyaW5ncyBbIE1JTi1XSURUSCwgV0lEVEgsIE1BWC1XSURUSCBdXG4gKi9cbmZ1bmN0aW9uIHNldFdpZHRoKGVsOiBIVE1MRWxlbWVudCwgd2lkdGhzOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZ10pIHtcbiAgZWwuc3R5bGUubWluV2lkdGggPSB3aWR0aHNbMF07XG4gIGVsLnN0eWxlLndpZHRoID0gd2lkdGhzWzFdO1xuICBlbC5zdHlsZS5tYXhXaWR0aCA9IHdpZHRoc1syXTtcblxuICAvLyBUT0RPKHNobG9taWFzc2FmKVtwZXJmLCA0XTogSW5zdGVhZCBvZiB1c2luZyBhIHR1cGxlIGZvciB3aWR0aCwgdXNlIGEgQ1NTU3R5bGVEZWNsYXJhdGlvbiBvYmplY3QgYW5kIGp1c3QgYXNzaWduIHRoZSBwcm9wc1xuICAvLyBUaGlzIHdpbGwgYXZvaWQgdGhlIGFkZGl0aW9uYWwgY2hlY2sgZm9yICVcbiAgLy8gV2Ugd2lsbCBuZWVkIHRvIGltcGxlbWVudCBpdCBpbiBhbGwgcGxhY2VzIHRoYXQgYF93aWR0aHNgIGlzIHVwZGF0ZWQgaW4gYFBibE5ncmlkQ29sdW1uRGVmYFxuICAvLyBBbm90aGVyIFRPRE8gaXMgdG8gY2FjaGUgdGhlIHByZXZpb3VzIGBib3hTaXppbmdgIGluIGFueSBjYXNlIHRoZSBjb2x1bW4gZGVmaW5pdGlvbiBjaGFuZ2VzLlxuXG4gIC8vIFdoZW4gdGhlIGNvbHVtbiBkb2VzIG5vdCBoYXZlIGFuIGV4cGxpY2l0IGBtaW5XaWR0aGAgc2V0IGFuZCB3aGVuIHRoZSBgd2lkdGhgIGlzIHNldCBleHBsaWNpdGx5IHRvIGEgJSB2YWx1ZVxuICAvLyB0aGUgbG9naWMgaW4gYFBibE5ncmlkQ29sdW1uRGVmLnVwZGF0ZVdpZHRoYCB3aWxsIHNldCBgbWluV2lkdGhgIHRvIHRoZSBzYW1lIHZhbHVlIGluIGB3aWR0aGBcbiAgLy8gVGhpcyB3aWxsIGNhdXNlIGFuIG92ZXJmbG93IHVubGVzcyB3ZSBhcHBseSB0aGUgYm9yZGVyLWJveCBtb2RlbFxuICBpZiAod2lkdGhzWzBdICYmIHdpZHRoc1swXS5lbmRzV2l0aCgnJScpKSB7XG4gICAgZWwuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICB9XG59XG4iXX0=