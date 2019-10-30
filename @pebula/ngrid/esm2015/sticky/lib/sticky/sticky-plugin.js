/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Input, IterableDiffers, IterableDiffer, IterableChangeRecord, OnDestroy } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
/** @type {?} */
export const PLUGIN_KEY = 'sticky';
/**
 * @param {?} table
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyRow(table, type, valueOrBulk, state) {
    /** @type {?} */
    const isHeader = type === 'header';
    /** @type {?} */
    const queryList = isHeader ? table._headerRowDefs : table._footerRowDefs;
    /** @type {?} */
    const bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    const addOneIfMainExists = (isHeader && table.showHeader) || (!isHeader && table.showFooter) ? 1 : 0;
    /** @type {?} */
    let changed;
    for (const [value, state] of bulk) {
        // the index from the user is 0 based or the table header/footer row.
        // we store them both, so we need to convert... our first is always the table header/footer and then we have the same order as the user's.
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
            table._cdkTable.updateStickyHeaderRowStyles();
        }
        else {
            table._cdkTable.updateStickyFooterRowStyles();
        }
    }
}
/**
 * @param {?} table
 * @param {?} type
 * @param {?} valueOrBulk
 * @param {?=} state
 * @return {?}
 */
export function setStickyColumns(table, type, valueOrBulk, state) {
    /** @type {?} */
    const bulk = Array.isArray(valueOrBulk) ? valueOrBulk : [[valueOrBulk, state]];
    /** @type {?} */
    let changed;
    for (let [columnId, state] of bulk) {
        if (typeof columnId === 'string') {
            columnId = table.columnApi.visibleColumns.findIndex((/**
             * @param {?} c
             * @return {?}
             */
            c => c.orgProp === columnId));
        }
        /** @type {?} */
        const c = table.columnApi.visibleColumns[columnId];
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
        table._cdkTable.updateStickyColumnStyles();
    }
}
let PblNgridStickyPluginDirective = class PblNgridStickyPluginDirective {
    /**
     * @param {?} table
     * @param {?} _differs
     * @param {?} pluginCtrl
     */
    constructor(table, _differs, pluginCtrl) {
        this.table = table;
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
            this.table._cdkTable.updateStickyHeaderRowStyles();
            this.table._cdkTable.updateStickyColumnStyles();
            this.table._cdkTable.updateStickyFooterRowStyles();
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
            if (this._startDiffer && this.table.isInit) {
                this._startDiffer.diff([]);
                this.applyColumnDiff('start', this._columnCache.start, this._startDiffer);
            }
            if (this._endDiffer && this.table.isInit) {
                this._endDiffer.diff([]);
                this.applyColumnDiff('end', this._columnCache.end, this._endDiffer);
            }
        }));
    }
    /**
     * Set the header rows you want to apply sticky positioning to.
     * Valid values are:
     *   - `table` - Literal string `table` that will set the table's main header row.
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
     *   - `table` - Literal string `table` that will set the table's main footer row.
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
     *   - `table` - Literal string `table` that will set the table's main header row.
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
     *   - `table` - Literal string `table` that will set the table's main footer row.
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
        this._removePlugin(this.table);
    }
    /**
     * @protected
     * @param {?} type
     * @param {?} value
     * @param {?} differ
     * @return {?}
     */
    applyColumnDiff(type, value, differ) {
        if (!this.table.isInit) {
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
            setStickyColumns(this.table, type, bulk);
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
        if (!this.table.isInit) {
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
            setStickyRow(this.table, type, bulk);
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
    TablePlugin({ id: PLUGIN_KEY }),
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
    PblNgridStickyPluginDirective.prototype.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS9zdGlja3ktcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ILE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBU3pGLE1BQU0sT0FBTyxVQUFVLEdBQWEsUUFBUTs7Ozs7Ozs7QUFJNUMsTUFBTSxVQUFVLFlBQVksQ0FBQyxLQUE2QixFQUFFLElBQXlCLEVBQUUsV0FBa0UsRUFBRSxLQUFlOztVQUNsSyxRQUFRLEdBQUcsSUFBSSxLQUFLLFFBQVE7O1VBQzVCLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjOztVQUNsRSxJQUFJLEdBQXVDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBRTs7VUFFOUcsa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRWhHLE9BQWdCO0lBQ3BCLEtBQUssTUFBTSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUU7Ozs7WUFH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QUFpQixDQUFDLEtBQTZCO1FBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDckQ7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFELENBQUM7Ozs7Ozs7Ozs7OztJQVdELElBQWEsZUFBZSxDQUFDLEtBQTZCO1FBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Ozs7Ozs7Ozs7OztJQVdELElBQWEsWUFBWSxDQUFDLEtBQThCO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7Ozs7Ozs7OztJQVdELElBQWEsWUFBWSxDQUFDLEtBQThCO1FBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEQ7UUFDRCxJQUFJLENBQUMsWUFB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QUFDLEVBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbkIsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBbkZ3QyxpQkFBaUI7WUFDZCxlQUFlO1lBQ2Isd0JBQXdCOzs7WUE1RXJFLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSw0R0FBNEcsRUFBRTs7OztZQTlFNUgsaUJBQWlCO1lBRkMsZUFBZTtZQUVkLHdCQUF3Qjs7O2dDQXlGakQsS0FBSzs4QkFnQkwsS0FBSzsyQkFnQkwsS0FBSzsyQkFnQkwsS0FBSzs7QUExREssNkJBQTZCO0lBRnpDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQzs2Q0EyRVMsaUJBQWlCO1FBQ2QsZUFBZTtRQUNiLHdCQUF3QjtHQTNFekQsNkJBQTZCLENBNEp6QztTQTVKWSw2QkFBNkI7Ozs7OztJQWlFeEMscURBQXNEOzs7OztJQUN0RCxtREFBb0Q7Ozs7O0lBQ3BELHNEQUF3RDs7Ozs7SUFDeEQsc0RBQXdEOzs7OztJQUV4RCxxREFBK0c7Ozs7O0lBQy9HLHNEQUErRDs7Ozs7SUFFbEQsOENBQWdEOzs7OztJQUNoRCxpREFBNEM7Ozs7O0lBQzVDLG1EQUF1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEl0ZXJhYmxlRGlmZmVycywgSXRlcmFibGVEaWZmZXIsIEl0ZXJhYmxlQ2hhbmdlUmVjb3JkLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgVGFibGVQbHVnaW4gfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgc3RpY2t5PzogUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdzdGlja3knID0gJ3N0aWNreSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3codGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIGJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWU6ICd0YWJsZScgfCBudW1iZXIsIHN0YXRlOiBib29sZWFuKTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lSb3codGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicsIHZhbHVlT3JCdWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+IHwgJ3RhYmxlJyB8IG51bWJlciwgc3RhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IGlzSGVhZGVyID0gdHlwZSA9PT0gJ2hlYWRlcic7XG4gIGNvbnN0IHF1ZXJ5TGlzdCA9IGlzSGVhZGVyID8gdGFibGUuX2hlYWRlclJvd0RlZnMgOiB0YWJsZS5fZm9vdGVyUm93RGVmcztcbiAgY29uc3QgYnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPiA9IEFycmF5LmlzQXJyYXkodmFsdWVPckJ1bGspID8gdmFsdWVPckJ1bGsgOiBbIFt2YWx1ZU9yQnVsaywgc3RhdGVdIF07XG5cbiAgY29uc3QgYWRkT25lSWZNYWluRXhpc3RzID0gKGlzSGVhZGVyICYmIHRhYmxlLnNob3dIZWFkZXIpIHx8ICghaXNIZWFkZXIgJiYgdGFibGUuc2hvd0Zvb3RlcikgPyAxIDogMDtcblxuICBsZXQgY2hhbmdlZDogYm9vbGVhbjtcbiAgZm9yIChjb25zdCBbdmFsdWUsIHN0YXRlXSBvZiBidWxrKSB7XG4gICAgLy8gdGhlIGluZGV4IGZyb20gdGhlIHVzZXIgaXMgMCBiYXNlZCBvciB0aGUgdGFibGUgaGVhZGVyL2Zvb3RlciByb3cuXG4gICAgLy8gd2Ugc3RvcmUgdGhlbSBib3RoLCBzbyB3ZSBuZWVkIHRvIGNvbnZlcnQuLi4gb3VyIGZpcnN0IGlzIGFsd2F5cyB0aGUgdGFibGUgaGVhZGVyL2Zvb3RlciBhbmQgdGhlbiB3ZSBoYXZlIHRoZSBzYW1lIG9yZGVyIGFzIHRoZSB1c2VyJ3MuXG4gICAgbGV0IGlkeCA9IHZhbHVlID09PSAndGFibGUnID8gMCA6IHZhbHVlICsgYWRkT25lSWZNYWluRXhpc3RzO1xuICAgIGlmICghaXNIZWFkZXIpIHtcbiAgICAgIC8vIHN0aWNreS1zdHlsZXIgc3RpY2tSb3dzKCkgbWV0aG9kcyB3aWxsIHJldmVyc2UgdGhlIG9yZGVyIG9mIGZvb3RlciBjb2x1bW5zXG4gICAgICAvLyBzbyB3ZSBhY3R1YWxseSBuZWVkIHRvIHNldCBhbm90aGVyIHJvdyB0byBtYWtlIHRoZSByb3cgd2Ugd2FudCBzdGlja3kuXG4gICAgICAvLyB3ZSBjb3VsZCByZXZlcnNlIHRoZSBjb2xsZWN0aW9uLCBidXQgY2hvb3NpbmcgdGhlIG9wcG9zaXRlIHNpZGUgaXMgYmV0dGVyLlxuICAgICAgLy8gdGhpbmsgWzAsIDEsIDIsIDMsIDRdIGFuZCB3ZSB3YW50IDEuIHN0aWNreS1zdHlsZXIgd2lsbCByZXZlcnNlIHRvIFs0LCAzLCAyLCAxLCAwXSBzbyBkb2luZyBub3RoaW5nIHdpbGwgc3RpY2sgMy5cbiAgICAgIC8vIHRoZSBvcHBvc2l0ZSBpcyBsZW5ndGggTUlOVVMgMSBNSU5VUyBpbmRleCB3aGljaCBpcyA1IC0gMSAtIDEgd2hpY2ggaXMgMywgaW4gdGhlIHJldmVyZWQgYXJyYXkgaXRzIHRoZSByb3cgMSB3aGljaCBpcyB3aGF0IHdlIHdhbnRlZC5cbiAgICAgIGlkeCA9IChxdWVyeUxpc3QubGVuZ3RoIC0gMSkgLSBpZHg7XG4gICAgfVxuXG4gICAgY29uc3Qgcm93RGVmID0gcXVlcnlMaXN0LnRvQXJyYXkoKVtpZHhdO1xuICAgIGlmIChyb3dEZWYgJiYgcm93RGVmLnN0aWNreSAhPT0gc3RhdGUpIHtcbiAgICAgIHJvd0RlZi5zdGlja3kgPSBzdGF0ZTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjaGFuZ2VkKSB7XG4gICAgaWYgKGlzSGVhZGVyKSB7XG4gICAgICB0YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhYmxlLl9jZGtUYWJsZS51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnModGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdzdGFydCcgfCAnZW5kJywgYnVsazogQXJyYXk8W3N0cmluZyB8IG51bWJlciwgYm9vbGVhbl0+KTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lDb2x1bW5zKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlOiBzdHJpbmcgIHwgbnVtYmVyLCBzdGF0ZTogYm9vbGVhbik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Q29sdW1ucyh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCB2YWx1ZU9yQnVsazogQXJyYXk8W3N0cmluZyAgfCBudW1iZXIsIGJvb2xlYW5dPiB8IHN0cmluZyAgfCBudW1iZXIsIHN0YXRlPzogYm9vbGVhbik6IHZvaWQge1xuICBjb25zdCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4gPSBBcnJheS5pc0FycmF5KHZhbHVlT3JCdWxrKSA/IHZhbHVlT3JCdWxrIDogWyBbdmFsdWVPckJ1bGssIHN0YXRlXSBdO1xuICBsZXQgY2hhbmdlZDogYm9vbGVhbjtcbiAgZm9yIChsZXQgW2NvbHVtbklkLCBzdGF0ZV0gb2YgYnVsaykge1xuICAgIGlmICh0eXBlb2YgY29sdW1uSWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb2x1bW5JZCA9IHRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5maW5kSW5kZXgoIGMgPT4gYy5vcmdQcm9wID09PSBjb2x1bW5JZCApO1xuICAgIH1cbiAgICBjb25zdCBjID0gdGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zW2NvbHVtbklkXTtcbiAgICBpZiAoYykge1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICBjLnBpbiA9IHN0YXRlID8gdHlwZSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmICh0eXBlID09PSAnZW5kJykge1xuICAgICAgICBjLmNvbHVtbkRlZi5zdGlja3lFbmQgPSBzdGF0ZTtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjLmNvbHVtbkRlZi5zdGlja3kgPSBzdGF0ZTtcbiAgICAgICAgYy5jb2x1bW5EZWYuc3RpY2t5RW5kID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChjaGFuZ2VkKSB7XG4gICAgdGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICB9XG59XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbc3RpY2t5Q29sdW1uU3RhcnRdLCBwYmwtbmdyaWRbc3RpY2t5Q29sdW1uRW5kXSwgcGJsLW5ncmlkW3N0aWNreUhlYWRlcl0sIHBibC1uZ3JpZFtzdGlja3lGb290ZXJdJyB9KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RpY2t5UGx1Z2luRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFNldCB0aGUgaGVhZGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYHRhYmxlYCAtIExpdGVyYWwgc3RyaW5nIGB0YWJsZWAgdGhhdCB3aWxsIHNldCB0aGUgdGFibGUncyBtYWluIGhlYWRlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1oZWFkZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgaGVhZGVyL2hlYWRlckdyb3VwIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUNvbHVtblN0YXJ0KHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9zdGFydERpZmZlcikge1xuICAgICAgdGhpcy5fc3RhcnREaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignc3RhcnQnLCB2YWx1ZSwgdGhpcy5fc3RhcnREaWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZm9vdGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYHRhYmxlYCAtIExpdGVyYWwgc3RyaW5nIGB0YWJsZWAgdGhhdCB3aWxsIHNldCB0aGUgdGFibGUncyBtYWluIGZvb3RlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1mb290ZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgZm9vdGVyIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUNvbHVtbkVuZCh2YWx1ZTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikge1xuICAgIGlmICghdGhpcy5fZW5kRGlmZmVyKSB7XG4gICAgICB0aGlzLl9lbmREaWZmZXIgPSB0aGlzLl9kaWZmZXJzLmZpbmQoW10pLmNyZWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignZW5kJywgdmFsdWUsIHRoaXMuX2VuZERpZmZlcik7XG4gIH1cblxuICAgIC8qKlxuICAgKiBTZXQgdGhlIGhlYWRlciByb3dzIHlvdSB3YW50IHRvIGFwcGx5IHN0aWNreSBwb3NpdGlvbmluZyB0by5cbiAgICogVmFsaWQgdmFsdWVzIGFyZTpcbiAgICogICAtIGB0YWJsZWAgLSBMaXRlcmFsIHN0cmluZyBgdGFibGVgIHRoYXQgd2lsbCBzZXQgdGhlIHRhYmxlJ3MgbWFpbiBoZWFkZXIgcm93LlxuICAgKiAgIC0gbnVtYmVyICAtIFRoZSBpbmRleCBvZiB0aGUgcm93LCBmb3IgbXVsdGktaGVhZGVyIHJvdy4gVGhlIGluZGV4IHJlZmVycyB0byB0aGUgb3JkZXIgeW91IGRlZmluZWQgdGhlIGhlYWRlci9oZWFkZXJHcm91cCByb3dzIChiYXNlIDApO1xuICAgKlxuICAgKiBGb3IgcGVyZm9ybWFuY2UgY29uc2lkZXJhdGlvbnMgb25seSBuZXcgdmFsdWVzIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSAoaS5lLiB0aGUgYXJyYXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlKS5cbiAgICogTWFuaXB1bGF0aW5nIHRoZSBhcnJheSB3aWxsIG5vdCB0cmlnZ2VyIGEgY2hhbmdlICh0aGUgc3RpY2t5IHN0YXRlIHdpbGwgbm90IGNoYW5nZSkgdW5sZXNzIHNlbmRpbmcgYSBjb3B5IG9mIGl0IChyZXBsYWNpbmcgaXQsIGUuZy4gQXJyYXkuc2xpY2UoKSlcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzdGlja3lIZWFkZXIodmFsdWU6IEFycmF5PCd0YWJsZScgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9oZWFkZXJEaWZmZXIpIHtcbiAgICAgIHRoaXMuX2hlYWRlckRpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlSb3dEaWZmKCdoZWFkZXInLCB2YWx1ZSwgdGhpcy5faGVhZGVyRGlmZmVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGZvb3RlciByb3dzIHlvdSB3YW50IHRvIGFwcGx5IHN0aWNreSBwb3NpdGlvbmluZyB0by5cbiAgICogVmFsaWQgdmFsdWVzIGFyZTpcbiAgICogICAtIGB0YWJsZWAgLSBMaXRlcmFsIHN0cmluZyBgdGFibGVgIHRoYXQgd2lsbCBzZXQgdGhlIHRhYmxlJ3MgbWFpbiBmb290ZXIgcm93LlxuICAgKiAgIC0gbnVtYmVyICAtIFRoZSBpbmRleCBvZiB0aGUgcm93LCBmb3IgbXVsdGktZm9vdGVyIHJvdy4gVGhlIGluZGV4IHJlZmVycyB0byB0aGUgb3JkZXIgeW91IGRlZmluZWQgdGhlIGZvb3RlciByb3dzIChiYXNlIDApO1xuICAgKlxuICAgKiBGb3IgcGVyZm9ybWFuY2UgY29uc2lkZXJhdGlvbnMgb25seSBuZXcgdmFsdWVzIHdpbGwgdHJpZ2dlciBhIGNoYW5nZSAoaS5lLiB0aGUgYXJyYXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgaW1tdXRhYmxlKS5cbiAgICogTWFuaXB1bGF0aW5nIHRoZSBhcnJheSB3aWxsIG5vdCB0cmlnZ2VyIGEgY2hhbmdlICh0aGUgc3RpY2t5IHN0YXRlIHdpbGwgbm90IGNoYW5nZSkgdW5sZXNzIHNlbmRpbmcgYSBjb3B5IG9mIGl0IChyZXBsYWNpbmcgaXQsIGUuZy4gQXJyYXkuc2xpY2UoKSlcbiAgICovXG4gIEBJbnB1dCgpIHNldCBzdGlja3lGb290ZXIodmFsdWU6IEFycmF5PCd0YWJsZScgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9mb290ZXJEaWZmZXIpIHtcbiAgICAgIHRoaXMuX2Zvb3RlckRpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlSb3dEaWZmKCdmb290ZXInLCB2YWx1ZSwgdGhpcy5fZm9vdGVyRGlmZmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX3N0YXJ0RGlmZmVyOiBJdGVyYWJsZURpZmZlcjxzdHJpbmcgfCBudW1iZXI+O1xuICBwcml2YXRlIF9lbmREaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2hlYWRlckRpZmZlcjogSXRlcmFibGVEaWZmZXI8J3RhYmxlJyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2Zvb3RlckRpZmZlcjogSXRlcmFibGVEaWZmZXI8J3RhYmxlJyB8IG51bWJlcj47XG5cbiAgcHJpdmF0ZSBfY29sdW1uQ2FjaGU6IHsgc3RhcnQ6IEFycmF5PHN0cmluZyB8IG51bWJlcj47IGVuZDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjsgfSA9IHsgc3RhcnQ6IFtdLCBlbmQ6IFtdIH07XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yIChwcm90ZWN0ZWQgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2RpZmZlcnM6IEl0ZXJhYmxlRGlmZmVycyxcbiAgICAgICAgICAgICAgIHByb3RlY3RlZCByZWFkb25seSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25SZXNpemVSb3cnKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5SGVhZGVyUm93U3R5bGVzKCk7XG4gICAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUNvbHVtblN0eWxlcygpO1xuICAgICAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS51cGRhdGVTdGlja3lGb290ZXJSb3dTdHlsZXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAucGlwZShmaWx0ZXIgKCBlID0+IGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnICkpXG4gICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhcnREaWZmZXIgJiYgdGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0RGlmZmVyLmRpZmYoW10pO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbHVtbkRpZmYoJ3N0YXJ0JywgdGhpcy5fY29sdW1uQ2FjaGUuc3RhcnQsIHRoaXMuX3N0YXJ0RGlmZmVyKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl9lbmREaWZmZXIgJiYgdGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgICAgICAgIHRoaXMuX2VuZERpZmZlci5kaWZmKFtdKTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdlbmQnLCB0aGlzLl9jb2x1bW5DYWNoZS5lbmQsIHRoaXMuX2VuZERpZmZlcilcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5Q29sdW1uRGlmZih0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+LCBkaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudGFibGUuaXNJbml0KSB7XG4gICAgICBjb25zdCB1bnN1YiA9IHRoaXMucGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgIHVuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5hcHBseUNvbHVtbkRpZmYodHlwZSwgdmFsdWUsIGRpZmZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbHVtbkNhY2hlW3R5cGVdID0gdmFsdWUgfHwgW107XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gZGlmZmVyLmRpZmYodmFsdWUgfHwgW10pO1xuICAgIGNvbnN0IGJ1bGs6IEFycmF5PFtzdHJpbmcgfCBudW1iZXIsIGJvb2xlYW5dPiA9IFtdO1xuICAgIGNoYW5nZXMuZm9yRWFjaE9wZXJhdGlvbigocmVjb3JkOiBJdGVyYWJsZUNoYW5nZVJlY29yZDxzdHJpbmcgfCBudW1iZXI+LCBwcmV2SW5kZXg6IG51bWJlciwgY3VycmVudEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChyZWNvcmQucHJldmlvdXNJbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGJ1bGsucHVzaChbcmVjb3JkLml0ZW0sIHRydWVdKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudEluZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgZmFsc2VdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoYnVsay5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRTdGlja3lDb2x1bW5zKHRoaXMudGFibGUsIHR5cGUsIGJ1bGspO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBseVJvd0RpZmYodHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWU6IEFycmF5PCd0YWJsZScgfCBudW1iZXI+LCBkaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPCd0YWJsZScgfCBudW1iZXI+KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgY29uc3QgdW5zdWIgPSB0aGlzLnBsdWdpbkN0cmwuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICB1bnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIHRoaXMuYXBwbHlSb3dEaWZmKHR5cGUsIHZhbHVlLCBkaWZmZXIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFuZ2VzID0gZGlmZmVyLmRpZmYodmFsdWUgfHwgW10pO1xuICAgIGNvbnN0IGJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gPSBbXTtcbiAgICBjaGFuZ2VzLmZvckVhY2hPcGVyYXRpb24oKHJlY29yZDogSXRlcmFibGVDaGFuZ2VSZWNvcmQ8J3RhYmxlJyB8IG51bWJlcj4sIHByZXZJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgdHJ1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChidWxrLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFN0aWNreVJvdyh0aGlzLnRhYmxlLCB0eXBlLCBidWxrKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==