/**
 * @fileoverview added by tsickle
 * Generated from: lib/mat-sort.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PblNgridComponent, PblNgridPluginController, utils } from '@pebula/ngrid';
/** @type {?} */
export const PLUGIN_KEY = 'matSort';
export class PblNgridMatSortDirective {
    /**
     * @param {?} table
     * @param {?} pluginCtrl
     * @param {?} sort
     */
    constructor(table, pluginCtrl, sort) {
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this.sort = sort;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        let origin = 'click';
        this.sort.sortChange
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} s
         * @return {?}
         */
        s => {
            this.onSort(s, origin);
            origin = 'click';
        }));
        /** @type {?} */
        const handleDataSourceSortChange = (/**
         * @param {?} sortChange
         * @return {?}
         */
        (sortChange) => {
            const { column } = sortChange;
            /** @type {?} */
            const order = sortChange.sort ? sortChange.sort.order : undefined;
            if (this.sort && column) {
                if (this.sort.active === column.id && this.sort.direction === (order || '')) {
                    return;
                }
                /** @type {?} */
                const sortable = (/** @type {?} */ (this.sort.sortables.get(column.id)));
                if (sortable) {
                    origin = 'ds';
                    this.sort.active = undefined;
                    sortable.start = order || 'asc';
                    sortable._handleClick();
                }
            }
            else if (this.sort.active) { // clear mode (hit from code, not click).
                // clear mode (hit from code, not click).
                /** @type {?} */
                const sortable = (/** @type {?} */ (this.sort.sortables.get(this.sort.active)));
                if (sortable) {
                    if (!sortable.disableClear) {
                        /** @type {?} */
                        let nextSortDir;
                        while (nextSortDir = this.sort.getNextSortDirection(sortable)) {
                            this.sort.direction = nextSortDir;
                        }
                    }
                    origin = 'ds';
                    sortable._handleClick();
                }
            }
        });
        pluginCtrl.events
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.kind === 'onInvalidateHeaders') {
                /** @type {?} */
                const hasActiveSort = this.sort && this.sort.active;
                if (table.ds && table.ds.sort) {
                    if (!table.ds.sort.column && hasActiveSort) {
                        this.onSort({ active: this.sort.active, direction: this.sort.direction || 'asc' }, origin);
                    }
                    else if (table.ds.sort.column && !hasActiveSort) {
                        setTimeout((/**
                         * @return {?}
                         */
                        () => handleDataSourceSortChange(table.ds.sort)));
                    }
                }
            }
            if (e.kind === 'onDataSource') {
                utils.unrx.kill(this, e.prev);
                if (this.sort && this.sort.active) {
                    this.onSort({ active: this.sort.active, direction: this.sort.direction || 'asc' }, origin);
                }
                table.ds.sortChange
                    .pipe(utils.unrx(this, e.curr))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => { handleDataSourceSortChange(event); }));
            }
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.table);
        utils.unrx.kill(this);
    }
    /**
     * @private
     * @param {?} sort
     * @param {?} origin
     * @return {?}
     */
    onSort(sort, origin) {
        /** @type {?} */
        const table = this.table;
        /** @type {?} */
        const column = table.columnApi.visibleColumns.find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.id === sort.active));
        if (origin !== 'click' || !column || !column.sort) {
            return;
        }
        else {
            /** @type {?} */
            const newSort = {};
            /** @type {?} */
            const sortFn = typeof column.sort === 'function' && column.sort;
            if (sort.direction) {
                newSort.order = sort.direction;
            }
            if (sortFn) {
                newSort.sortFn = sortFn;
            }
            /** @type {?} */
            const currentSort = table.ds.sort;
            if (column === currentSort.column) {
                /** @type {?} */
                const _sort = currentSort.sort || {};
                if (newSort.order === _sort.order) {
                    return;
                }
            }
            table.ds.setSort(column, newSort);
        }
    }
}
PblNgridMatSortDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matSort]', exportAs: 'pblMatSort' },] }
];
/** @nocollapse */
PblNgridMatSortDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: MatSort }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortDirective.prototype._removePlugin;
    /** @type {?} */
    PblNgridMatSortDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridMatSortDirective.prototype.pluginCtrl;
    /** @type {?} */
    PblNgridMatSortDirective.prototype.sort;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFRLE9BQU8sRUFBZ0MsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQXlDLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPMUgsTUFBTSxPQUFPLFVBQVUsR0FBYyxTQUFTO0FBRzlDLE1BQU0sT0FBTyx3QkFBd0I7Ozs7OztJQUduQyxZQUFtQixLQUE2QixFQUFVLFVBQW9DLEVBQVMsSUFBYTtRQUFqRyxVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUztRQUNsSCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUV4RCxNQUFNLEdBQW1CLE9BQU87UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3RCLFNBQVM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxFQUFDLENBQUM7O2NBRUMsMEJBQTBCOzs7O1FBQUcsQ0FBQyxVQUFpQyxFQUFFLEVBQUU7a0JBQ2pFLEVBQUUsTUFBTSxFQUFFLEdBQUcsVUFBVTs7a0JBQ3ZCLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsU0FBUztZQUVqRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO2dCQUN2QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLEVBQUU7b0JBQUUsT0FBTztpQkFBRTs7c0JBQ2xGLFFBQVEsR0FBa0IsbUJBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBTztnQkFDekUsSUFBSSxRQUFRLEVBQUU7b0JBQ1osTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7b0JBQzdCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQztvQkFDaEMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN6QjthQUNGO2lCQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSx5Q0FBeUM7OztzQkFDaEUsUUFBUSxHQUFrQixtQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBTztnQkFDaEYsSUFBSSxRQUFRLEVBQUc7b0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7OzRCQUN0QixXQUEwQjt3QkFDOUIsT0FBTyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRTs0QkFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO3lCQUNuQztxQkFDRjtvQkFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNkLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDekI7YUFDRjtRQUNILENBQUMsQ0FBQTtRQUVELFVBQVUsQ0FBQyxNQUFNO2FBQ2QsU0FBUzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLHFCQUFxQixFQUFFOztzQkFDOUIsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNuRCxJQUFJLEtBQUssQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksYUFBYSxFQUFFO3dCQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDNUY7eUJBQU0sSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ2pELFVBQVU7Ozt3QkFBQyxHQUFHLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7cUJBQzdEO2lCQUNGO2FBQ0Y7WUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO2dCQUM3QixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM1RjtnQkFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVU7cUJBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzlCLFNBQVM7Ozs7Z0JBQUUsS0FBSyxDQUFDLEVBQUUsR0FBRywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2FBQ2hFO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsSUFBVSxFQUFFLE1BQXNCOztjQUN6QyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7O2NBQ2xCLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUM7UUFFN0UsSUFBSyxNQUFNLEtBQUssT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRztZQUNuRCxPQUFPO1NBQ1I7YUFBTTs7a0JBQ0MsT0FBTyxHQUEyQixFQUFHOztrQkFDckMsTUFBTSxHQUFHLE9BQU8sTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUk7WUFDL0QsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDaEM7WUFDRCxJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUN6Qjs7a0JBQ0ssV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSTtZQUNqQyxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsTUFBTSxFQUFFOztzQkFDM0IsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDcEMsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2pDLE9BQU87aUJBQ1I7YUFDRjtZQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7OztZQWhHRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztZQVQ1RCxpQkFBaUI7WUFBRSx3QkFBd0I7WUFGckMsT0FBTzs7Ozs7OztJQWFwQixpREFBK0Q7O0lBRW5ELHlDQUFvQzs7Ozs7SUFBRSw4Q0FBNEM7O0lBQUUsd0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvcnQsIE1hdFNvcnQsIE1hdFNvcnRIZWFkZXIsIFNvcnREaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsRGF0YVNvdXJjZSwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIG1hdFNvcnQ/OiBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmU7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnbWF0U29ydCcgPSAnbWF0U29ydCc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFttYXRTb3J0XScsIGV4cG9ydEFzOiAncGJsTWF0U29ydCcgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBwdWJsaWMgc29ydDogTWF0U29ydCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgbGV0IG9yaWdpbjogJ2RzJyB8ICdjbGljaycgPSAnY2xpY2snO1xuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggcyA9PiB7XG4gICAgICAgIHRoaXMub25Tb3J0KHMsIG9yaWdpbik7XG4gICAgICAgIG9yaWdpbiA9ICdjbGljayc7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlID0gKHNvcnRDaGFuZ2U6IFBibERhdGFTb3VyY2VbJ3NvcnQnXSkgPT4ge1xuICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IHNvcnRDaGFuZ2U7XG4gICAgICBjb25zdCBvcmRlciA9IHNvcnRDaGFuZ2Uuc29ydCA/IHNvcnRDaGFuZ2Uuc29ydC5vcmRlciA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHRoaXMuc29ydCAmJiBjb2x1bW4pIHtcbiAgICAgICAgaWYgKHRoaXMuc29ydC5hY3RpdmUgPT09IGNvbHVtbi5pZCAmJiB0aGlzLnNvcnQuZGlyZWN0aW9uID09PSAob3JkZXIgfHwgJycpKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBzb3J0YWJsZTogTWF0U29ydEhlYWRlciA9IHRoaXMuc29ydC5zb3J0YWJsZXMuZ2V0KGNvbHVtbi5pZCkgYXMgYW55O1xuICAgICAgICBpZiAoc29ydGFibGUpIHtcbiAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgIHRoaXMuc29ydC5hY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgc29ydGFibGUuc3RhcnQgPSBvcmRlciB8fCAnYXNjJztcbiAgICAgICAgICBzb3J0YWJsZS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnQuYWN0aXZlKSB7IC8vIGNsZWFyIG1vZGUgKGhpdCBmcm9tIGNvZGUsIG5vdCBjbGljaykuXG4gICAgICAgIGNvbnN0IHNvcnRhYmxlOiBNYXRTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQodGhpcy5zb3J0LmFjdGl2ZSkgYXMgYW55O1xuICAgICAgICBpZiAoc29ydGFibGUgKSB7XG4gICAgICAgICAgaWYgKCFzb3J0YWJsZS5kaXNhYmxlQ2xlYXIpIHtcbiAgICAgICAgICAgIGxldCBuZXh0U29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0U29ydERpciA9IHRoaXMuc29ydC5nZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvbiA9IG5leHRTb3J0RGlyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgIHNvcnRhYmxlLl9oYW5kbGVDbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBpZiAoZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycpIHtcbiAgICAgICAgICBjb25zdCBoYXNBY3RpdmVTb3J0ID0gdGhpcy5zb3J0ICYmIHRoaXMuc29ydC5hY3RpdmU7XG4gICAgICAgICAgaWYgKHRhYmxlLmRzICYmIHRhYmxlLmRzLnNvcnQpIHtcbiAgICAgICAgICAgIGlmICghdGFibGUuZHMuc29ydC5jb2x1bW4gJiYgaGFzQWN0aXZlU29ydCkge1xuICAgICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhYmxlLmRzLnNvcnQuY29sdW1uICYmICFoYXNBY3RpdmVTb3J0KSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGFuZGxlRGF0YVNvdXJjZVNvcnRDaGFuZ2UodGFibGUuZHMuc29ydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgICAgIHV0aWxzLnVucngua2lsbCh0aGlzLCBlLnByZXYpO1xuICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgdGhpcy5zb3J0LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuc29ydC5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5zb3J0LmRpcmVjdGlvbiB8fCAnYXNjJyB9LCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YWJsZS5kcy5zb3J0Q2hhbmdlXG4gICAgICAgICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMsIGUuY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlKGV2ZW50KTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Tb3J0KHNvcnQ6IFNvcnQsIG9yaWdpbjogJ2RzJyB8ICdjbGljaycpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZSA9IHRoaXMudGFibGU7XG4gICAgY29uc3QgY29sdW1uID0gdGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmQoYyA9PiBjLmlkID09PSBzb3J0LmFjdGl2ZSk7XG5cbiAgICBpZiAoIG9yaWdpbiAhPT0gJ2NsaWNrJyB8fCAhY29sdW1uIHx8ICFjb2x1bW4uc29ydCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3U29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiA9IHsgfTtcbiAgICAgIGNvbnN0IHNvcnRGbiA9IHR5cGVvZiBjb2x1bW4uc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2x1bW4uc29ydDtcbiAgICAgIGlmIChzb3J0LmRpcmVjdGlvbikge1xuICAgICAgICBuZXdTb3J0Lm9yZGVyID0gc29ydC5kaXJlY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAoc29ydEZuKSB7XG4gICAgICAgIG5ld1NvcnQuc29ydEZuID0gc29ydEZuO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFNvcnQgPSB0YWJsZS5kcy5zb3J0O1xuICAgICAgaWYgKGNvbHVtbiA9PT0gY3VycmVudFNvcnQuY29sdW1uKSB7XG4gICAgICAgIGNvbnN0IF9zb3J0ID0gY3VycmVudFNvcnQuc29ydCB8fCB7fTtcbiAgICAgICAgaWYgKG5ld1NvcnQub3JkZXIgPT09IF9zb3J0Lm9yZGVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0YWJsZS5kcy5zZXRTb3J0KGNvbHVtbiwgbmV3U29ydCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==