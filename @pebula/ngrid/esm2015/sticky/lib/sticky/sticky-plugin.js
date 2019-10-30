/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { filter } from 'rxjs/operators';
import { Directive, Input, IterableDiffers } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RpY2t5LXBsdWdpbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvc3RpY2t5LyIsInNvdXJjZXMiOlsibGliL3N0aWNreS9zdGlja3ktcGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBbUQsTUFBTSxlQUFlLENBQUM7QUFFbkgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTekYsTUFBTSxPQUFPLFVBQVUsR0FBYSxRQUFROzs7Ozs7OztBQUk1QyxNQUFNLFVBQVUsWUFBWSxDQUFDLEtBQTZCLEVBQUUsSUFBeUIsRUFBRSxXQUFrRSxFQUFFLEtBQWU7O1VBQ2xLLFFBQVEsR0FBRyxJQUFJLEtBQUssUUFBUTs7VUFDNUIsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWM7O1VBQ2xFLElBQUksR0FBdUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFFOztVQUU5RyxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFFaEcsT0FBZ0I7SUFDcEIsS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRTs7OztZQUc3QixHQUFHLEdBQUcsS0FBSyxLQUFLLE9BQU8sQ0FB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LElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUQsQ0FBQzs7Ozs7Ozs7Ozs7O0lBV0QsSUFBYSxlQUFlLENBQUMsS0FBNkI7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuRDtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7Ozs7Ozs7O0lBV0QsSUFBYSxZQUFZLENBQUMsS0FBOEI7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7Ozs7O0lBV0QsSUFBYSxZQUFZLENBQUMsS0FBOEI7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUN0RDtRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxJQUFJ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QUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNuQixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUE3SkEsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLDRHQUE0RyxFQUFFOzs7O1lBOUU1SCxpQkFBaUI7WUFGQyxlQUFlO1lBRWQsd0JBQXdCOzs7Z0NBeUZqRCxLQUFLOzhCQWdCTCxLQUFLOzJCQWdCTCxLQUFLOzJCQWdCTCxLQUFLOztBQTFESyw2QkFBNkI7SUFGekMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDOzZDQTJFUyxpQkFBaUI7UUFDZCxlQUFlO1FBQ2Isd0JBQXdCO0dBM0V6RCw2QkFBNkIsQ0E0SnpDO1NBNUpZLDZCQUE2Qjs7Ozs7O0lBaUV4QyxxREFBc0Q7Ozs7O0lBQ3RELG1EQUFvRDs7Ozs7SUFDcEQsc0RBQXdEOzs7OztJQUN4RCxzREFBd0Q7Ozs7O0lBRXhELHFEQUErRzs7Ozs7SUFDL0csc0RBQStEOzs7OztJQUVsRCw4Q0FBZ0Q7Ozs7O0lBQ2hELGlEQUE0Qzs7Ozs7SUFDNUMsbURBQXVEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSXRlcmFibGVEaWZmZXJzLCBJdGVyYWJsZURpZmZlciwgSXRlcmFibGVDaGFuZ2VSZWNvcmQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBzdGlja3k/OiBQYmxOZ3JpZFN0aWNreVBsdWdpbkRpcmVjdGl2ZTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3N0aWNreScgPSAnc3RpY2t5JztcblxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgYnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPik6IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Um93KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCB2YWx1ZTogJ3RhYmxlJyB8IG51bWJlciwgc3RhdGU6IGJvb2xlYW4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreVJvdyh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJywgdmFsdWVPckJ1bGs6IEFycmF5PFsndGFibGUnIHwgbnVtYmVyLCBib29sZWFuXT4gfCAndGFibGUnIHwgbnVtYmVyLCBzdGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgY29uc3QgaXNIZWFkZXIgPSB0eXBlID09PSAnaGVhZGVyJztcbiAgY29uc3QgcXVlcnlMaXN0ID0gaXNIZWFkZXIgPyB0YWJsZS5faGVhZGVyUm93RGVmcyA6IHRhYmxlLl9mb290ZXJSb3dEZWZzO1xuICBjb25zdCBidWxrOiBBcnJheTxbJ3RhYmxlJyB8IG51bWJlciwgYm9vbGVhbl0+ID0gQXJyYXkuaXNBcnJheSh2YWx1ZU9yQnVsaykgPyB2YWx1ZU9yQnVsayA6IFsgW3ZhbHVlT3JCdWxrLCBzdGF0ZV0gXTtcblxuICBjb25zdCBhZGRPbmVJZk1haW5FeGlzdHMgPSAoaXNIZWFkZXIgJiYgdGFibGUuc2hvd0hlYWRlcikgfHwgKCFpc0hlYWRlciAmJiB0YWJsZS5zaG93Rm9vdGVyKSA/IDEgOiAwO1xuXG4gIGxldCBjaGFuZ2VkOiBib29sZWFuO1xuICBmb3IgKGNvbnN0IFt2YWx1ZSwgc3RhdGVdIG9mIGJ1bGspIHtcbiAgICAvLyB0aGUgaW5kZXggZnJvbSB0aGUgdXNlciBpcyAwIGJhc2VkIG9yIHRoZSB0YWJsZSBoZWFkZXIvZm9vdGVyIHJvdy5cbiAgICAvLyB3ZSBzdG9yZSB0aGVtIGJvdGgsIHNvIHdlIG5lZWQgdG8gY29udmVydC4uLiBvdXIgZmlyc3QgaXMgYWx3YXlzIHRoZSB0YWJsZSBoZWFkZXIvZm9vdGVyIGFuZCB0aGVuIHdlIGhhdmUgdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVzZXIncy5cbiAgICBsZXQgaWR4ID0gdmFsdWUgPT09ICd0YWJsZScgPyAwIDogdmFsdWUgKyBhZGRPbmVJZk1haW5FeGlzdHM7XG4gICAgaWYgKCFpc0hlYWRlcikge1xuICAgICAgLy8gc3RpY2t5LXN0eWxlciBzdGlja1Jvd3MoKSBtZXRob2RzIHdpbGwgcmV2ZXJzZSB0aGUgb3JkZXIgb2YgZm9vdGVyIGNvbHVtbnNcbiAgICAgIC8vIHNvIHdlIGFjdHVhbGx5IG5lZWQgdG8gc2V0IGFub3RoZXIgcm93IHRvIG1ha2UgdGhlIHJvdyB3ZSB3YW50IHN0aWNreS5cbiAgICAgIC8vIHdlIGNvdWxkIHJldmVyc2UgdGhlIGNvbGxlY3Rpb24sIGJ1dCBjaG9vc2luZyB0aGUgb3Bwb3NpdGUgc2lkZSBpcyBiZXR0ZXIuXG4gICAgICAvLyB0aGluayBbMCwgMSwgMiwgMywgNF0gYW5kIHdlIHdhbnQgMS4gc3RpY2t5LXN0eWxlciB3aWxsIHJldmVyc2UgdG8gWzQsIDMsIDIsIDEsIDBdIHNvIGRvaW5nIG5vdGhpbmcgd2lsbCBzdGljayAzLlxuICAgICAgLy8gdGhlIG9wcG9zaXRlIGlzIGxlbmd0aCBNSU5VUyAxIE1JTlVTIGluZGV4IHdoaWNoIGlzIDUgLSAxIC0gMSB3aGljaCBpcyAzLCBpbiB0aGUgcmV2ZXJlZCBhcnJheSBpdHMgdGhlIHJvdyAxIHdoaWNoIGlzIHdoYXQgd2Ugd2FudGVkLlxuICAgICAgaWR4ID0gKHF1ZXJ5TGlzdC5sZW5ndGggLSAxKSAtIGlkeDtcbiAgICB9XG5cbiAgICBjb25zdCByb3dEZWYgPSBxdWVyeUxpc3QudG9BcnJheSgpW2lkeF07XG4gICAgaWYgKHJvd0RlZiAmJiByb3dEZWYuc3RpY2t5ICE9PSBzdGF0ZSkge1xuICAgICAgcm93RGVmLnN0aWNreSA9IHN0YXRlO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGNoYW5nZWQpIHtcbiAgICBpZiAoaXNIZWFkZXIpIHtcbiAgICAgIHRhYmxlLl9jZGtUYWJsZS51cGRhdGVTdGlja3lIZWFkZXJSb3dTdHlsZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUZvb3RlclJvd1N0eWxlcygpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RpY2t5Q29sdW1ucyh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgdHlwZTogJ3N0YXJ0JyB8ICdlbmQnLCBidWxrOiBBcnJheTxbc3RyaW5nIHwgbnVtYmVyLCBib29sZWFuXT4pOiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIHNldFN0aWNreUNvbHVtbnModGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHR5cGU6ICdzdGFydCcgfCAnZW5kJywgdmFsdWU6IHN0cmluZyAgfCBudW1iZXIsIHN0YXRlOiBib29sZWFuKTogdm9pZDtcbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGlja3lDb2x1bW5zKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCB0eXBlOiAnc3RhcnQnIHwgJ2VuZCcsIHZhbHVlT3JCdWxrOiBBcnJheTxbc3RyaW5nICB8IG51bWJlciwgYm9vbGVhbl0+IHwgc3RyaW5nICB8IG51bWJlciwgc3RhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gIGNvbnN0IGJ1bGs6IEFycmF5PFtzdHJpbmcgfCBudW1iZXIsIGJvb2xlYW5dPiA9IEFycmF5LmlzQXJyYXkodmFsdWVPckJ1bGspID8gdmFsdWVPckJ1bGsgOiBbIFt2YWx1ZU9yQnVsaywgc3RhdGVdIF07XG4gIGxldCBjaGFuZ2VkOiBib29sZWFuO1xuICBmb3IgKGxldCBbY29sdW1uSWQsIHN0YXRlXSBvZiBidWxrKSB7XG4gICAgaWYgKHR5cGVvZiBjb2x1bW5JZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbHVtbklkID0gdGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmRJbmRleCggYyA9PiBjLm9yZ1Byb3AgPT09IGNvbHVtbklkICk7XG4gICAgfVxuICAgIGNvbnN0IGMgPSB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnNbY29sdW1uSWRdO1xuICAgIGlmIChjKSB7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIGMucGluID0gc3RhdGUgPyB0eXBlIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKHR5cGUgPT09ICdlbmQnKSB7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreUVuZCA9IHN0YXRlO1xuICAgICAgICBjLmNvbHVtbkRlZi5zdGlja3kgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGMuY29sdW1uRGVmLnN0aWNreSA9IHN0YXRlO1xuICAgICAgICBjLmNvbHVtbkRlZi5zdGlja3lFbmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGNoYW5nZWQpIHtcbiAgICB0YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gIH1cbn1cblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtzdGlja3lDb2x1bW5TdGFydF0sIHBibC1uZ3JpZFtzdGlja3lDb2x1bW5FbmRdLCBwYmwtbmdyaWRbc3RpY2t5SGVhZGVyXSwgcGJsLW5ncmlkW3N0aWNreUZvb3Rlcl0nIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGlja3lQbHVnaW5EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU2V0IHRoZSBoZWFkZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgdGFibGVgIC0gTGl0ZXJhbCBzdHJpbmcgYHRhYmxlYCB0aGF0IHdpbGwgc2V0IHRoZSB0YWJsZSdzIG1haW4gaGVhZGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWhlYWRlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBoZWFkZXIvaGVhZGVyR3JvdXAgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Q29sdW1uU3RhcnQodmFsdWU6IEFycmF5PHN0cmluZyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX3N0YXJ0RGlmZmVyKSB7XG4gICAgICB0aGlzLl9zdGFydERpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdzdGFydCcsIHZhbHVlLCB0aGlzLl9zdGFydERpZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBmb290ZXIgcm93cyB5b3Ugd2FudCB0byBhcHBseSBzdGlja3kgcG9zaXRpb25pbmcgdG8uXG4gICAqIFZhbGlkIHZhbHVlcyBhcmU6XG4gICAqICAgLSBgdGFibGVgIC0gTGl0ZXJhbCBzdHJpbmcgYHRhYmxlYCB0aGF0IHdpbGwgc2V0IHRoZSB0YWJsZSdzIG1haW4gZm9vdGVyIHJvdy5cbiAgICogICAtIG51bWJlciAgLSBUaGUgaW5kZXggb2YgdGhlIHJvdywgZm9yIG11bHRpLWZvb3RlciByb3cuIFRoZSBpbmRleCByZWZlcnMgdG8gdGhlIG9yZGVyIHlvdSBkZWZpbmVkIHRoZSBmb290ZXIgcm93cyAoYmFzZSAwKTtcbiAgICpcbiAgICogRm9yIHBlcmZvcm1hbmNlIGNvbnNpZGVyYXRpb25zIG9ubHkgbmV3IHZhbHVlcyB3aWxsIHRyaWdnZXIgYSBjaGFuZ2UgKGkuZS4gdGhlIGFycmF5IHNob3VsZCBiZSB0cmVhdGVkIGFzIGltbXV0YWJsZSkuXG4gICAqIE1hbmlwdWxhdGluZyB0aGUgYXJyYXkgd2lsbCBub3QgdHJpZ2dlciBhIGNoYW5nZSAodGhlIHN0aWNreSBzdGF0ZSB3aWxsIG5vdCBjaGFuZ2UpIHVubGVzcyBzZW5kaW5nIGEgY29weSBvZiBpdCAocmVwbGFjaW5nIGl0LCBlLmcuIEFycmF5LnNsaWNlKCkpXG4gICAqL1xuICBASW5wdXQoKSBzZXQgc3RpY2t5Q29sdW1uRW5kKHZhbHVlOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+KSB7XG4gICAgaWYgKCF0aGlzLl9lbmREaWZmZXIpIHtcbiAgICAgIHRoaXMuX2VuZERpZmZlciA9IHRoaXMuX2RpZmZlcnMuZmluZChbXSkuY3JlYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuYXBwbHlDb2x1bW5EaWZmKCdlbmQnLCB2YWx1ZSwgdGhpcy5fZW5kRGlmZmVyKTtcbiAgfVxuXG4gICAgLyoqXG4gICAqIFNldCB0aGUgaGVhZGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYHRhYmxlYCAtIExpdGVyYWwgc3RyaW5nIGB0YWJsZWAgdGhhdCB3aWxsIHNldCB0aGUgdGFibGUncyBtYWluIGhlYWRlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1oZWFkZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgaGVhZGVyL2hlYWRlckdyb3VwIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUhlYWRlcih2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2hlYWRlckRpZmZlcikge1xuICAgICAgdGhpcy5faGVhZGVyRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVJvd0RpZmYoJ2hlYWRlcicsIHZhbHVlLCB0aGlzLl9oZWFkZXJEaWZmZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgZm9vdGVyIHJvd3MgeW91IHdhbnQgdG8gYXBwbHkgc3RpY2t5IHBvc2l0aW9uaW5nIHRvLlxuICAgKiBWYWxpZCB2YWx1ZXMgYXJlOlxuICAgKiAgIC0gYHRhYmxlYCAtIExpdGVyYWwgc3RyaW5nIGB0YWJsZWAgdGhhdCB3aWxsIHNldCB0aGUgdGFibGUncyBtYWluIGZvb3RlciByb3cuXG4gICAqICAgLSBudW1iZXIgIC0gVGhlIGluZGV4IG9mIHRoZSByb3csIGZvciBtdWx0aS1mb290ZXIgcm93LiBUaGUgaW5kZXggcmVmZXJzIHRvIHRoZSBvcmRlciB5b3UgZGVmaW5lZCB0aGUgZm9vdGVyIHJvd3MgKGJhc2UgMCk7XG4gICAqXG4gICAqIEZvciBwZXJmb3JtYW5jZSBjb25zaWRlcmF0aW9ucyBvbmx5IG5ldyB2YWx1ZXMgd2lsbCB0cmlnZ2VyIGEgY2hhbmdlIChpLmUuIHRoZSBhcnJheSBzaG91bGQgYmUgdHJlYXRlZCBhcyBpbW11dGFibGUpLlxuICAgKiBNYW5pcHVsYXRpbmcgdGhlIGFycmF5IHdpbGwgbm90IHRyaWdnZXIgYSBjaGFuZ2UgKHRoZSBzdGlja3kgc3RhdGUgd2lsbCBub3QgY2hhbmdlKSB1bmxlc3Mgc2VuZGluZyBhIGNvcHkgb2YgaXQgKHJlcGxhY2luZyBpdCwgZS5nLiBBcnJheS5zbGljZSgpKVxuICAgKi9cbiAgQElucHV0KCkgc2V0IHN0aWNreUZvb3Rlcih2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4pIHtcbiAgICBpZiAoIXRoaXMuX2Zvb3RlckRpZmZlcikge1xuICAgICAgdGhpcy5fZm9vdGVyRGlmZmVyID0gdGhpcy5fZGlmZmVycy5maW5kKFtdKS5jcmVhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5hcHBseVJvd0RpZmYoJ2Zvb3RlcicsIHZhbHVlLCB0aGlzLl9mb290ZXJEaWZmZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnREaWZmZXI6IEl0ZXJhYmxlRGlmZmVyPHN0cmluZyB8IG51bWJlcj47XG4gIHByaXZhdGUgX2VuZERpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfaGVhZGVyRGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPjtcbiAgcHJpdmF0ZSBfZm9vdGVyRGlmZmVyOiBJdGVyYWJsZURpZmZlcjwndGFibGUnIHwgbnVtYmVyPjtcblxuICBwcml2YXRlIF9jb2x1bW5DYWNoZTogeyBzdGFydDogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPjsgZW5kOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+OyB9ID0geyBzdGFydDogW10sIGVuZDogW10gfTtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IgKHByb3RlY3RlZCByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgIHByb3RlY3RlZCByZWFkb25seSBfZGlmZmVyczogSXRlcmFibGVEaWZmZXJzLFxuICAgICAgICAgICAgICAgcHJvdGVjdGVkIHJlYWRvbmx5IHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvblJlc2l6ZVJvdycpKVxuICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS51cGRhdGVTdGlja3lIZWFkZXJSb3dTdHlsZXMoKTtcbiAgICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUudXBkYXRlU3RpY2t5Q29sdW1uU3R5bGVzKCk7XG4gICAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnVwZGF0ZVN0aWNreUZvb3RlclJvd1N0eWxlcygpO1xuICAgICAgfSk7XG5cbiAgICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgIC5waXBlKGZpbHRlciAoIGUgPT4gZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycgKSlcbiAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLl9zdGFydERpZmZlciAmJiB0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnREaWZmZXIuZGlmZihbXSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZignc3RhcnQnLCB0aGlzLl9jb2x1bW5DYWNoZS5zdGFydCwgdGhpcy5fc3RhcnREaWZmZXIpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuX2VuZERpZmZlciAmJiB0aGlzLnRhYmxlLmlzSW5pdCkge1xuICAgICAgICAgICAgdGhpcy5fZW5kRGlmZmVyLmRpZmYoW10pO1xuICAgICAgICAgICAgdGhpcy5hcHBseUNvbHVtbkRpZmYoJ2VuZCcsIHRoaXMuX2NvbHVtbkNhY2hlLmVuZCwgdGhpcy5fZW5kRGlmZmVyKVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwbHlDb2x1bW5EaWZmKHR5cGU6ICdzdGFydCcgfCAnZW5kJywgdmFsdWU6IEFycmF5PHN0cmluZyB8IG51bWJlcj4sIGRpZmZlcjogSXRlcmFibGVEaWZmZXI8c3RyaW5nIHwgbnVtYmVyPik6IHZvaWQge1xuICAgIGlmICghdGhpcy50YWJsZS5pc0luaXQpIHtcbiAgICAgIGNvbnN0IHVuc3ViID0gdGhpcy5wbHVnaW5DdHJsLmV2ZW50cy5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgdW5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB0aGlzLmFwcGx5Q29sdW1uRGlmZih0eXBlLCB2YWx1ZSwgZGlmZmVyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fY29sdW1uQ2FjaGVbdHlwZV0gPSB2YWx1ZSB8fCBbXTtcblxuICAgIGNvbnN0IGNoYW5nZXMgPSBkaWZmZXIuZGlmZih2YWx1ZSB8fCBbXSk7XG4gICAgY29uc3QgYnVsazogQXJyYXk8W3N0cmluZyB8IG51bWJlciwgYm9vbGVhbl0+ID0gW107XG4gICAgY2hhbmdlcy5mb3JFYWNoT3BlcmF0aW9uKChyZWNvcmQ6IEl0ZXJhYmxlQ2hhbmdlUmVjb3JkPHN0cmluZyB8IG51bWJlcj4sIHByZXZJbmRleDogbnVtYmVyLCBjdXJyZW50SW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgaWYgKHJlY29yZC5wcmV2aW91c0luZGV4ID09IG51bGwpIHtcbiAgICAgICAgYnVsay5wdXNoKFtyZWNvcmQuaXRlbSwgdHJ1ZV0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50SW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCBmYWxzZV0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChidWxrLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFN0aWNreUNvbHVtbnModGhpcy50YWJsZSwgdHlwZSwgYnVsayk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFwcGx5Um93RGlmZih0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInLCB2YWx1ZTogQXJyYXk8J3RhYmxlJyB8IG51bWJlcj4sIGRpZmZlcjogSXRlcmFibGVEaWZmZXI8J3RhYmxlJyB8IG51bWJlcj4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMudGFibGUuaXNJbml0KSB7XG4gICAgICBjb25zdCB1bnN1YiA9IHRoaXMucGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgIHVuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgdGhpcy5hcHBseVJvd0RpZmYodHlwZSwgdmFsdWUsIGRpZmZlcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZXMgPSBkaWZmZXIuZGlmZih2YWx1ZSB8fCBbXSk7XG4gICAgY29uc3QgYnVsazogQXJyYXk8Wyd0YWJsZScgfCBudW1iZXIsIGJvb2xlYW5dPiA9IFtdO1xuICAgIGNoYW5nZXMuZm9yRWFjaE9wZXJhdGlvbigocmVjb3JkOiBJdGVyYWJsZUNoYW5nZVJlY29yZDwndGFibGUnIHwgbnVtYmVyPiwgcHJldkluZGV4OiBudW1iZXIsIGN1cnJlbnRJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAocmVjb3JkLnByZXZpb3VzSW5kZXggPT0gbnVsbCkge1xuICAgICAgICBidWxrLnB1c2goW3JlY29yZC5pdGVtLCB0cnVlXSk7XG4gICAgICB9IGVsc2UgaWYgKGN1cnJlbnRJbmRleCA9PSBudWxsKSB7XG4gICAgICAgIGJ1bGsucHVzaChbcmVjb3JkLml0ZW0sIGZhbHNlXSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGJ1bGsubGVuZ3RoID4gMCkge1xuICAgICAgc2V0U3RpY2t5Um93KHRoaXMudGFibGUsIHR5cGUsIGJ1bGspO1xuICAgIH1cbiAgfVxufVxuIl19