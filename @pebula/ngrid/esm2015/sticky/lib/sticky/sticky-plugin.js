/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Input, IterableDiffers, IterableDiffer, IterableChangeRecord, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin } from '@pebula/ngrid';
/** @type {?} */
export const PLUGIN_KEY = 'sticky';
/**
 * @param {?} grid
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyRow(grid, type, valueOrBulk, state) {
    /** @type {?} */
    const isHeader = type === 'header';
    /** @type {?} */
    const queryList = isHeader ? grid._headerRowDefs : grid._footerRowDefs;
    /** @type {?} */
    const bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    const addOneIfMainExists = (isHeader && grid.showHeader) || (!isHeader && grid.showFooter) ? 1 : 0;
    /** @type {?} */
    let changed;
    for (const [value, state] of bulk) {
        // the index from the user is 0 based or the grid header/footer row.
        // we store them both, so we need to convert... our first is always the grid header/footer and then we have the same order as the user's.
        /** @type {?} */
        let idx = value === 'table' ? 0 : value + addOneIfMainExists;
        if (!isHeader) {
            // sticky-styler stickRows() methods will reverse the order of footer columns
            // so we actually need to set another row to make the row we want sticky.
            // we could reverse the collection, but choosing the opposite side is better.
            // think [0, 1, 2, 3, 4] and we want 1. sticky-styler will reverse to [4, 3, 2, 1, 0] so doing nothing will stick 3.
            // the opposite is length MINUS 1 MINUS index which is 5 - 1 - 1 which is 3, in the revered array its the row 1 which is what we wanted.
            idx = (queryList.length - 1) - idx;
        }
        /** @type {?} */
        const rowDef = queryList.toArray()[idx];
        if (rowDef && rowDef.sticky !== state) {
            rowDef.sticky = state;
            changed = true;
        }
    }
    if (changed) {
        if (isHeader) {
            grid._cdkTable.updateStickyHeaderRowStyles();
        }
        else {
            grid._cdkTable.updateStickyFooterRowStyles();
        }
    }
}
/**
 * @param {?} grid
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyColumns(grid, type, valueOrBulk, state) {
    /** @type {?} */
    const bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    let changed;
    for (let [columnId, state] of bulk) {
        if (typeof columnId === 'string') {
            columnId = grid.columnApi.visibleColumns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            c => c.orgProp === columnId));
        }
        /** @type {?} */
        const c = grid.columnApi.visibleColumns[columnId];
        if (c) {
            changed = true;
            c.pin = state ? type : undefined;
            if (type === 'end') {
                c.columnDef.stickyEnd = state;
                c.columnDef.sticky = false;
            }
            else {
                c.columnDef.sticky = state;
                c.columnDef.stickyEnd = false;
            }
        }
    }
    if (changed) {
        grid._cdkTable.updateStickyColumnStyles();
    }
}
let PblNgridStickyPluginDirective = class PblNgridStickyPluginDirective {
    /**
     * @param {?} grid
     * @param {?} _differs
     * @param {?} pluginCtrl
     */
    constructor(grid, _differs, pluginCtrl) {
        this.grid = grid;
        this._differs = _differs;
        this.pluginCtrl = pluginCtrl;
        this._columnCache = { start: [], end: [] };
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onResizeRow')))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.grid._cdkTable.updateStickyHeaderRowStyles();
            this.grid._cdkTable.updateStickyColumnStyles();
            this.grid._cdkTable.updateStickyFooterRowStyles();
        }));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders')))
            .subscribe((/**
         * @return {?}
         */
        () => {
            if (this._startDiffer && this.grid.isInit) {
                this._startDiffer.diff([]);
                this.applyColumnDiff('start', this._columnCache.start, this._startDiffer);
            }
            if (this._endDiffer && this.grid.isInit) {
                this._endDiffer.diff([]);
                this.applyColumnDiff('end', this._columnCache.end, this._endDiffer);
            }
        }));
    }
    /**
     * Set the header rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main header row.
     *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyColumnStart(value) {
        if (!this._startDiffer) {
            this._startDiffer = this._differs.find([]).create();
        }
        this.applyColumnDiff('start', value, this._startDiffer);
    }
    /**
     * Set the footer rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main footer row.
     *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyColumnEnd(value) {
        if (!this._endDiffer) {
            this._endDiffer = this._differs.find([]).create();
        }
        this.applyColumnDiff('end', value, this._endDiffer);
    }
    /**
     * Set the header rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main header row.
     *   - number  - The index of the row, for multi-header row. The index refers to the order you defined the header/headerGroup rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyHeader(value) {
        if (!this._headerDiffer) {
            this._headerDiffer = this._differs.find([]).create();
        }
        this.applyRowDiff('header', value, this._headerDiffer);
    }
    /**
     * Set the footer rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `grid` - Literal string `grid` that will set the grid's main footer row.
     *   - number  - The index of the row, for multi-footer row. The index refers to the order you defined the footer rows (base 0);
     *
     * For performance considerations only new values will trigger a change (i.e. the array should be treated as immutable).
     * Manipulating the array will not trigger a change (the sticky state will not change) unless sending a copy of it (replacing it, e.g. Array.slice())
     * @param {?} value
     * @return {?}
     */
    set stickyFooter(value) {
        if (!this._footerDiffer) {
            this._footerDiffer = this._differs.find([]).create();
        }
        this.applyRowDiff('footer', value, this._footerDiffer);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.grid);
    }
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    applyColumnDiff(type, value, differ) {
        if (!this.grid.isInit) {
            /** @type {?} */
            const unsub = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event.kind === 'onInit') {
                    unsub.unsubscribe();
                    this.applyColumnDiff(type, value, differ);
                }
            }));
            return;
        }
        this._columnCache[type] = value || [];
        /** @type {?} */
        const changes = differ.diff(value || []);
        /** @type {?} */
        const bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        (record, prevIndex, currentIndex) => {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyColumns(this.grid, type, bulk);
        }
    }
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    applyRowDiff(type, value, differ) {
        if (!this.grid.isInit) {
            /** @type {?} */
            const unsub = this.pluginCtrl.events.subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event.kind === 'onInit') {
                    unsub.unsubscribe();
                    this.applyRowDiff(type, value, differ);
                }
            }));
            return;
        }
        /** @type {?} */
        const changes = differ.diff(value || []);
        /** @type {?} */
        const bulk = [];
        changes.forEachOperation((/**
         * @param {?} record
         * @param {?} prevIndex
         * @param {?} currentIndex
         * @return {?}
         */
        (record, prevIndex, currentIndex) => {
            if (record.previousIndex == null) {
                bulk.push([record.item, true]);
            }
            else if (currentIndex == null) {
                bulk.push([record.item, false]);
            }
        }));
        if (bulk.length > 0) {
            setStickyRow(this.grid, type, bulk);
        }
    }
};
PblNgridStickyPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: IterableDiffers },
    { type: PblNgridPluginController }
];
PblNgridStickyPluginDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[stickyColumnStart], pbl-ngrid[stickyColumnEnd], pbl-ngrid[stickyHeader], pbl-ngrid[stickyFooter]' },] }
];
/** @nocollapse */
PblNgridStickyPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: IterableDiffers },
    { type: PblNgridPluginController }
];
PblNgridStickyPluginDirective.propDecorators = {
    stickyColumnStart: [{ type: Input }],
    stickyColumnEnd: [{ type: Input }],
    stickyHeader: [{ type: Input }],
    stickyFooter: [{ type: Input }]
};
PblNgridStickyPluginDirective = tslib_1.__decorate([
    NgridPlugin({ id: PLUGIN_KEY }),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
        IterableDiffers,
        PblNgridPluginController])
], PblNgridStickyPluginDirective);
export { PblNgridStickyPluginDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._startDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._endDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._headerDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._footerDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._columnCache;
    /**
     * @type {?}
     * @private
     */
    PblNgridStickyPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype._differs;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStickyPluginDirective.prototype.pluginCtrl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS9zdGlja3ktcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBU3pGLE1BQU0sT0FBTyxVQUFVLEdBQWEsUUFBUTs7Ozs7Ozs7QUFJNUMsTUFBTSxVQUFVLFlBQVksQ0FBQyxJQUE0QixFQUFFLElBQXlCLEVBQUUsV0FBa0UsRUFBRSxLQUFlOztVQUNqSyxRQUFRLEdBQUcsSUFBSSxLQUFLLFFBQVE7O1VBQzVCLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjOztVQUNoRSxJQUFJLEdBQXVDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBRTs7VUFFOUcsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRTlGLE9BQWdCO0lBQ3BCLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUU7Ozs7WUFH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QUFpQixDQUFDLEtBQTZCO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7Ozs7Ozs7OztJQVdELElBQWEsZUFBZSxDQUFDLEtBQTZCO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7Ozs7Ozs7OztJQVdELElBQWEsWUFBWSxDQUFDLEtBQThCO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7Ozs7Ozs7OztJQVdELElBQWEsWUFBWSxDQUFDLEtBQThCO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsWUFB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QyxFQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ25CLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7Q0FDRixDQUFBOztZQW5GdUMsaUJBQWlCO1lBQ2IsZUFBZTtZQUNiLHdCQUF3Qjs7O1lBNUVyRSxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsNEdBQTRHLEVBQUU7Ozs7WUE5RTVILGlCQUFpQjtZQUZDLGVBQWU7WUFFZCx3QkFBd0I7OztnQ0F5RmpELEtBQUs7OEJBZ0JMLEtBQUs7MkJBZ0JMLEtBQUs7MkJBZ0JMLEtBQUs7O0FBMURLLDZCQUE2QjtJQUZ6QyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7NkNBMkVRLGlCQUFpQjtRQUNiLGVBQWU7UUFDYix3QkFBd0I7R0EzRXpELDZCQUE2QixDQTRKekM7U0E1SlksNkJBQTZCOzs7Ozs7SUFpRXhDLHFEQUFzRDs7Ozs7SUFDdEQsbURBQW9EOzs7OztJQUNwRCxzREFBd0Q7Ozs7O0lBQ3hELHNEQUF3RDs7Ozs7SUFFeEQscURBQStHOzs7OztJQUMvRyxzREFBOEQ7Ozs7O0lBRWpELDZDQUErQzs7Ozs7SUFDL0MsaURBQTRDOzs7OztJQUM1QyxtREFBdUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBJdGVyYWJsZURpZmZlcnMsIEl0ZXJhYmxlRGlmZmVyLCBJdGVyYWJsZUNoYW5nZVJlY29yZCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHN0aWNreT86IFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnc3RpY2t5JyA9ICdzdGlja3knO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Um93KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIGJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCB2YWx1ZTogJ3RhYmxlJyB8IG51bWJlciwgc3RhdGU6IGJvb2xlYW4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCB2YWx1ZU9yQnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPiB8ICd0YWJsZScgfCBudW1iZXIsIHN0YXRlPzogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBpc0hlYWRlciA9IHR5cGUgPT09ICdoZWFkZXInO1xuICBjb25zdCBxdWVyeUxpc3QgPSBpc0hlYWRlciA/IGdyaWQuX2hlYWRlclJvd0RlZnMgOiBncmlkLl9mb290ZXJSb3dEZWZzO1xuICBjb25zdCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+ID0gQXJyYXkuaXNBcnJheSh2YWx1ZU9yQnVsaykgPyB2YWx1ZU9yQnVsayA6IFsgW3ZhbHVlT3JCdWxrLCBzdGF0ZV0gXTtcblxuICBjb25zdCBhZGRPbmVJZk1haW5FeGlzdHMgPSAoaXNIZWFkZXIgJiYgZ3JpZC5zaG93SGVhZGVyKSB8fCAoIWlzSGVhZGVyICYmIGdyaWQuc2hvd0Zvb3RlcikgPyAxIDogMDtcblxuICBsZXQgY2hhbmdlZDogYm9vbGVhbjtcbiAgZm9yIChjb25zdCBbdmFsdWUsIHN0YXRlXSBvZiBidWxrKSB7XG4gICAgLy8gdGhlIGluZGV4IGZyb20gdGhlIHVzZXIgaXMgMCBiYXNlZCBvciB0aGUgZ3JpZCBoZWFkZXIvZm9vdGVyIHJvdy5cbiAgICAvLyB3ZSBzdG9yZSB0aGVtIGJvdGgsIHNvIHdlIG5lZWQgdG8gY29udmVydC4uLiBvdXIgZmlyc3QgaXMgYWx3YXlzIHRoZSBncmlkIGhlYWRlci9mb290ZXIgYW5kIHRoZW4gd2UgaGF2ZSB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXNlcidzLlxuICAgIGxldCBpZHggPSB2YWx1ZSA9PT0gJ3RhYmxlJyA/IDAgOiB2YWx1ZSArIGFkZE9uZUlmTWFpbkV4aXN0cztcbiAgICBpZiAoIWlzSGVhZGVyKSB7XG4gICAgICAvLyBzdGlja3ktc3R5bGVyIHN0aWNrUm93cygpIG1ldGhvZHMgd2lsbCByZXZlcnNlIHRoZSBvcmRlciBvZiBmb290ZXIgY29sdW1uc1xuICAgICAgLy8gc28gd2UgYWN0dWFsbHkgbmVlZCB0byBzZXQgYW5vdGhlciByb3cgdG8gbWFrZSB0aGUgcm93IHdlIHdhbnQgc3RpY2t5LlxuICAgICAgLy8gd2UgY291bGQgcmV2ZXJzZSB0aGUgY29sbGVjdGlvbiwgYnV0IGNob29zaW5nIHRoZSBvcHBvc2l0ZSBzaWRlIGlzIGJldHRlci5cbiAgICAgIC8vIHRoaW5rIFswLCAxLCAyLCAzLCA0XSBhbmQgd2Ugd2FudCAxLiBzdGlja3ktc3R5bGVyIHdpbGwgcmV2ZXJzZSB0byBbNCwgMywgMiwgMSwgMF0gc28gZG9pbmcgbm90aGluZyB3aWxsIHN0aWNrIDMuXG4gICAgICAvLyB0aGUgb3Bwb3NpdGUgaXMgbGVuZ3RoIE1JTlVTIDEgTUlOVVMgaW5kZXggd2hpY2ggaXMgNSAtIDEgLSAxIHdoaWNoIGlzIDMsIGluIHRoZSByZXZlcmVkIGFycmF5IGl0cyB0aGUgcm93IDEgd2hpY2ggaXMgd2hhdCB3ZSB3YW50ZWQuXG4gICAgICBpZHggPSAocXVlcnlMaXN0Lmxlbmd0aCAtIDEpIC0gaWR4O1xuICAgIH1cblxuICAgIGNvbnN0IHJvd0RlZiA9IHF1ZXJ5TGlzdC50b0FycmF5KClbaWR4XTtcbiAgICBpZiAocm93RGVmICYmIHJvd0RlZi5zdGlja3kgIT09IHN0YXRlKSB7XG4gICAgICByb3dEZWYuc3RpY2t5ID0gc3RhdGU7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoY2hhbmdlZCkge1xuICAgIGlmIChpc0hlYWRlcikge1xuICAgICAgZ3JpZC5fY2RrVGFibGUudXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdyaWQuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUZvb3RlclJvd1N0eWxlcygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Q29sdW1ucyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIGJ1bGs6IEFycmF5PFtzdHJpbmcgfCBudW1iZXIsIGJvb2xlYW5dPik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Q29sdW1ucyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlOiBzdHJpbmcgIHwgbnVtYmVyLCBzdGF0ZTogYm9vbGVhbik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Q29sdW1ucyhncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlT3JCdWxrOiBBcnJheTxbc3RyaW5nICB8IG51bWJlciwgYm9vbGVhbl0+IHwgc3RyaW5nICB8IG51bWJlciwgc3RhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IGJ1bGs6IEFycmF5PFtzdHJpbmcgfCBudW1iZXIsIGJvb2xlYW5dPiA9IEFycmF5LmlzQXJyYXkodmFsdWVPckJ1bGspID8gdmFsdWVPckJ1bGsgOiBbIFt2YWx1ZU9yQnVsaywgc3RhdGVdIF07XG4gIGxldCBjaGFuZ2VkOiBib29sZWFuO1xuICBmb3IgKGxldCBbY29sdW1uSWQsIHN0YXRlXSBvZiBidWxrKSB7XG4gICAgaWYgKHR5cGVvZiBjb2x1bW5JZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbHVtbklkID0gZ3JpZC5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMuZmluZEluZGV4KCBjID0+IGMub3JnUHJvcCA9PT0gY29sdW1uSWQgKTtcbiAgICB9XG4gICAgY29uc3QgYyA9IGdyaWQuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zW2NvbHVtbklkXTtcbiAgICBpZiAoYykge1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICBjLnBpbiA9IHN0YXRlID8gdHlwZSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0eXBlID09PSAnZW5kJykge1xuICAgICAgICBjLmNvbHVtbkRlZi5zdGlja3lFbmQgPSBzdGF0ZTtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjLmNvbHVtbkRlZi5zdGlja3kgPSBzdGF0ZTtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5RW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChjaGFuZ2VkKSB7XG4gICAgZ3JpZC5fY2RrVGFibGUudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gIH1cbn1cblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtzdGlja3lDb2x1bW5TdGFydF0sIHBibC1uZ3JpZFtzdGlja3lDb2x1bW5FbmRdLCBwYmwtbmdyaWRbc3RpY2t5SGVhZGVyXSwgcGJsLW5ncmlkW3N0aWNreUZvb3Rlcl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU2V0IHRoZSBoZWFkZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgZ3JpZGAgLSBMaXRlcmFsIHN0cmluZyBgZ3JpZGAgdGhhdCB3aWxsIHNldCB0aGUgZ3JpZCdzIG1haW4gaGVhZGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWhlYWRlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBoZWFkZXIvaGVhZGVyR3JvdXAgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Q29sdW1uU3RhcnQodmFsdWU6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX3N0YXJ0RGlmZmVyKSB7XG4gICAgICB0aGlzLl9zdGFydERpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdzdGFydCcsIHZhbHVlLCB0aGlzLl9zdGFydERpZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmb290ZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgZ3JpZGAgLSBMaXRlcmFsIHN0cmluZyBgZ3JpZGAgdGhhdCB3aWxsIHNldCB0aGUgZ3JpZCdzIG1haW4gZm9vdGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWZvb3RlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBmb290ZXIgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Q29sdW1uRW5kKHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9lbmREaWZmZXIpIHtcbiAgICAgIHRoaXMuX2VuZERpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdlbmQnLCB2YWx1ZSwgdGhpcy5fZW5kRGlmZmVyKTtcbiAgfVxuXG4gICAgLyoqXG4gICAqIFNldCB0aGUgaGVhZGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYGdyaWRgIC0gTGl0ZXJhbCBzdHJpbmcgYGdyaWRgIHRoYXQgd2lsbCBzZXQgdGhlIGdyaWQncyBtYWluIGhlYWRlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1oZWFkZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgaGVhZGVyL2hlYWRlckdyb3VwIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUhlYWRlcih2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2hlYWRlckRpZmZlcikge1xuICAgICAgdGhpcy5faGVhZGVyRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVJvd0RpZmYoJ2hlYWRlcicsIHZhbHVlLCB0aGlzLl9oZWFkZXJEaWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZm9vdGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYGdyaWRgIC0gTGl0ZXJhbCBzdHJpbmcgYGdyaWRgIHRoYXQgd2lsbCBzZXQgdGhlIGdyaWQncyBtYWluIGZvb3RlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1mb290ZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgZm9vdGVyIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUZvb3Rlcih2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2Zvb3RlckRpZmZlcikge1xuICAgICAgdGhpcy5fZm9vdGVyRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVJvd0RpZmYoJ2Zvb3RlcicsIHZhbHVlLCB0aGlzLl9mb290ZXJEaWZmZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnREaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2VuZERpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyRGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyRGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPjtcblxuICBwcml2YXRlIF9jb2x1bW5DYWNoZTogeyBzdGFydDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjsgZW5kOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+OyB9ID0geyBzdGFydDogW10sIGVuZDogW10gfTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvciAocHJvdGVjdGVkIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgIHByb3RlY3RlZCByZWFkb25seSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25SZXNpemVSb3cnKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lIZWFkZXJSb3dTdHlsZXMoKTtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lDb2x1bW5TdHlsZXMoKTtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAucGlwZShmaWx0ZXIgKCBlID0+IGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnICkpXG4gICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhcnREaWZmZXIgJiYgdGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnREaWZmZXIuZGlmZihbXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignc3RhcnQnLCB0aGlzLl9jb2x1bW5DYWNoZS5zdGFydCwgdGhpcy5fc3RhcnREaWZmZXIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX2VuZERpZmZlciAmJiB0aGlzLmdyaWQuaXNJbml0KSB7XG4gICAgICAgICAgICB0aGlzLl9lbmREaWZmZXIuZGlmZihbXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignZW5kJywgdGhpcy5fY29sdW1uQ2FjaGUuZW5kLCB0aGlzLl9lbmREaWZmZXIpXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5Q29sdW1uRGlmZih0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+LCBkaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ3JpZC5pc0luaXQpIHtcbiAgICAgIGNvbnN0IHVuc3ViID0gdGhpcy5wbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgdW5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZih0eXBlLCB2YWx1ZSwgZGlmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY29sdW1uQ2FjaGVbdHlwZV0gPSB2YWx1ZSB8fCBbXTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBkaWZmZXIuZGlmZih2YWx1ZSB8fCBbXSk7XG4gICAgY29uc3QgYnVsazogQXJyYXk8W3N0cmluZyB8IG51bWJlciwgYm9vbGVhbl0+ID0gW107XG4gICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPHN0cmluZyB8IG51bWJlcj4sIHByZXZJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgdHJ1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChidWxrLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFN0aWNreUNvbHVtbnModGhpcy5ncmlkLCB0eXBlLCBidWxrKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlSb3dEaWZmKHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIHZhbHVlOiBBcnJheTwndGFibGUnIHwgbnVtYmVyPiwgZGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPik6IHZvaWQge1xuICAgIGlmICghdGhpcy5ncmlkLmlzSW5pdCkge1xuICAgICAgY29uc3QgdW5zdWIgPSB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICB1bnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuYXBwbHlSb3dEaWZmKHR5cGUsIHZhbHVlLCBkaWZmZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gZGlmZmVyLmRpZmYodmFsdWUgfHwgW10pO1xuICAgIGNvbnN0IGJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8J3RhYmxlJyB8IG51bWJlcj4sIHByZXZJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgdHJ1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChidWxrLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFN0aWNreVJvdyh0aGlzLmdyaWQsIHR5cGUsIGJ1bGspO1xuICAgIH1cbiAgfVxufVxuIl19