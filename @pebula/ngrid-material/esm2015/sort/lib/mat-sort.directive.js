/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { Sort, MatSort, MatSortHeader, SortDirection } from '@angular/material/sort';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridSortDefinition, PblDataSource } from '@pebula/ngrid';
/** @type {?} */
const PLUGIN_KEY = 'matSort';
let PblNgridMatSortDirective = class PblNgridMatSortDirective {
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
            .pipe(UnRx(this))
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
                UnRx.kill(this, e.prev);
                if (this.sort && this.sort.active) {
                    this.onSort({ active: this.sort.active, direction: this.sort.direction || 'asc' }, origin);
                }
                table.ds.sortChange
                    .pipe(UnRx(this, e.curr))
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
};
PblNgridMatSortDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: MatSort }
];
PblNgridMatSortDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[matSort]', exportAs: 'pblMatSort' },] }
];
/** @nocollapse */
PblNgridMatSortDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController },
    { type: MatSort }
];
PblNgridMatSortDirective = tslib_1.__decorate([
    TablePlugin({ id: PLUGIN_KEY }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, MatSort])
], PblNgridMatSortDirective);
export { PblNgridMatSortDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BTzFILFVBQVUsR0FBYyxTQUFTO0lBSzFCLHdCQUF3QixTQUF4Qix3QkFBd0I7Ozs7OztJQUduQyxZQUFtQixLQUE2QixFQUFVLFVBQW9DLEVBQVMsSUFBYTtRQUFqRyxVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUztRQUNsSCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUV4RCxNQUFNLEdBQW1CLE9BQU87UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLENBQUMsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkIsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQzs7Y0FFQywwQkFBMEI7Ozs7UUFBRyxDQUFDLFVBQWlD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RCxJQUFJLE1BQU0sRUFBRTtnQkFDVixPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUN6Qjs7a0JBQ0ssV0FBVyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSTtZQUNqQyxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsTUFBTSxFQUFFOztzQkFDM0IsS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDcEMsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQ2pDLE9BQU87aUJBQ1I7YUFDRjtZQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Q0FFRixDQUFBOztZQTdGMkIsaUJBQWlCO1lBQTJCLHdCQUF3QjtZQUFlLE9BQU87OztZQUxySCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztZQVY1RCxpQkFBaUI7WUFBRSx3QkFBd0I7WUFIckMsT0FBTzs7QUFlVCx3QkFBd0I7SUFIcEMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBRS9CLElBQUksRUFBRTs2Q0FJcUIsaUJBQWlCLEVBQTJCLHdCQUF3QixFQUFlLE9BQU87R0FIekcsd0JBQXdCLENBZ0dwQztTQWhHWSx3QkFBd0I7Ozs7OztJQUNuQyxpREFBK0Q7O0lBRW5ELHlDQUFvQzs7Ozs7SUFBRSw4Q0FBNEM7O0lBQUUsd0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvcnQsIE1hdFNvcnQsIE1hdFNvcnRIZWFkZXIsIFNvcnREaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgVGFibGVQbHVnaW4sIFBibE5ncmlkU29ydERlZmluaXRpb24sIFBibERhdGFTb3VyY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIG1hdFNvcnQ/OiBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmU7XG4gIH1cbn1cbmNvbnN0IFBMVUdJTl9LRVk6ICdtYXRTb3J0JyA9ICdtYXRTb3J0JztcblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFttYXRTb3J0XScsIGV4cG9ydEFzOiAncGJsTWF0U29ydCcgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBwdWJsaWMgc29ydDogTWF0U29ydCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgbGV0IG9yaWdpbjogJ2RzJyB8ICdjbGljaycgPSAnY2xpY2snO1xuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggcyA9PiB7XG4gICAgICAgIHRoaXMub25Tb3J0KHMsIG9yaWdpbik7XG4gICAgICAgIG9yaWdpbiA9ICdjbGljayc7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlID0gKHNvcnRDaGFuZ2U6IFBibERhdGFTb3VyY2VbJ3NvcnQnXSkgPT4ge1xuICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IHNvcnRDaGFuZ2U7XG4gICAgICBjb25zdCBvcmRlciA9IHNvcnRDaGFuZ2Uuc29ydCA/IHNvcnRDaGFuZ2Uuc29ydC5vcmRlciA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHRoaXMuc29ydCAmJiBjb2x1bW4pIHtcbiAgICAgICAgaWYgKHRoaXMuc29ydC5hY3RpdmUgPT09IGNvbHVtbi5pZCAmJiB0aGlzLnNvcnQuZGlyZWN0aW9uID09PSAob3JkZXIgfHwgJycpKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBzb3J0YWJsZTogTWF0U29ydEhlYWRlciA9IHRoaXMuc29ydC5zb3J0YWJsZXMuZ2V0KGNvbHVtbi5pZCkgYXMgYW55O1xuICAgICAgICBpZiAoc29ydGFibGUpIHtcbiAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgIHRoaXMuc29ydC5hY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgc29ydGFibGUuc3RhcnQgPSBvcmRlciB8fCAnYXNjJztcbiAgICAgICAgICBzb3J0YWJsZS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnQuYWN0aXZlKSB7IC8vIGNsZWFyIG1vZGUgKGhpdCBmcm9tIGNvZGUsIG5vdCBjbGljaykuXG4gICAgICAgIGNvbnN0IHNvcnRhYmxlOiBNYXRTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQodGhpcy5zb3J0LmFjdGl2ZSkgYXMgYW55O1xuICAgICAgICBpZiAoc29ydGFibGUgKSB7XG4gICAgICAgICAgaWYgKCFzb3J0YWJsZS5kaXNhYmxlQ2xlYXIpIHtcbiAgICAgICAgICAgIGxldCBuZXh0U29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0U29ydERpciA9IHRoaXMuc29ydC5nZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvbiA9IG5leHRTb3J0RGlyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgIHNvcnRhYmxlLl9oYW5kbGVDbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBpZiAoZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycpIHtcbiAgICAgICAgICBjb25zdCBoYXNBY3RpdmVTb3J0ID0gdGhpcy5zb3J0ICYmIHRoaXMuc29ydC5hY3RpdmU7XG4gICAgICAgICAgaWYgKHRhYmxlLmRzICYmIHRhYmxlLmRzLnNvcnQpIHtcbiAgICAgICAgICAgIGlmICghdGFibGUuZHMuc29ydC5jb2x1bW4gJiYgaGFzQWN0aXZlU29ydCkge1xuICAgICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhYmxlLmRzLnNvcnQuY29sdW1uICYmICFoYXNBY3RpdmVTb3J0KSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGFuZGxlRGF0YVNvdXJjZVNvcnRDaGFuZ2UodGFibGUuZHMuc29ydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgICAgIFVuUngua2lsbCh0aGlzLCBlLnByZXYpO1xuICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgdGhpcy5zb3J0LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuc29ydC5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5zb3J0LmRpcmVjdGlvbiB8fCAnYXNjJyB9LCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YWJsZS5kcy5zb3J0Q2hhbmdlXG4gICAgICAgICAgICAucGlwZShVblJ4KHRoaXMsIGUuY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlKGV2ZW50KTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblNvcnQoc29ydDogU29ydCwgb3JpZ2luOiAnZHMnIHwgJ2NsaWNrJyk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcbiAgICBjb25zdCBjb2x1bW4gPSB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMuZmluZChjID0+IGMuaWQgPT09IHNvcnQuYWN0aXZlKTtcblxuICAgIGlmICggb3JpZ2luICE9PSAnY2xpY2snIHx8ICFjb2x1bW4gfHwgIWNvbHVtbi5zb3J0ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdTb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uID0geyB9O1xuICAgICAgY29uc3Qgc29ydEZuID0gdHlwZW9mIGNvbHVtbi5zb3J0ID09PSAnZnVuY3Rpb24nICYmIGNvbHVtbi5zb3J0O1xuICAgICAgaWYgKHNvcnQuZGlyZWN0aW9uKSB7XG4gICAgICAgIG5ld1NvcnQub3JkZXIgPSBzb3J0LmRpcmVjdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmIChzb3J0Rm4pIHtcbiAgICAgICAgbmV3U29ydC5zb3J0Rm4gPSBzb3J0Rm47XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50U29ydCA9IHRhYmxlLmRzLnNvcnQ7XG4gICAgICBpZiAoY29sdW1uID09PSBjdXJyZW50U29ydC5jb2x1bW4pIHtcbiAgICAgICAgY29uc3QgX3NvcnQgPSBjdXJyZW50U29ydC5zb3J0IHx8IHt9O1xuICAgICAgICBpZiAobmV3U29ydC5vcmRlciA9PT0gX3NvcnQub3JkZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRhYmxlLmRzLnNldFNvcnQoY29sdW1uLCBuZXdTb3J0KTtcbiAgICB9XG4gIH1cblxufVxuIl19