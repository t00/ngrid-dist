/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
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
        pluginCtrl.events
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        e => {
            if (e.kind === 'onInvalidateHeaders') {
                if (table.ds && !table.ds.sort.column) {
                    if (this.sort && this.sort.active) {
                        this.onSort({ active: this.sort.active, direction: this.sort.direction || 'asc' }, origin);
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
                event => {
                    if (this.sort && event.column) {
                        /** @type {?} */
                        const _sort = event.sort || {};
                        if (this.sort.active === event.column.id && this.sort.direction === (_sort.order || '')) {
                            return;
                        }
                        /** @type {?} */
                        const sortable = (/** @type {?} */ (this.sort.sortables.get(event.column.id)));
                        if (sortable) {
                            origin = 'ds';
                            this.sort.active = undefined;
                            sortable.start = _sort.order || 'asc';
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
                }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFRLE9BQU8sRUFBZ0MsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQTBCLE1BQU0sZUFBZSxDQUFDOztNQU8zRyxVQUFVLEdBQWMsU0FBUztJQUsxQix3QkFBd0IsU0FBeEIsd0JBQXdCOzs7Ozs7SUFHbkMsWUFBbUIsS0FBNkIsRUFBVSxVQUFvQyxFQUFTLElBQWE7UUFBakcsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQVM7UUFDbEgsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFFeEQsTUFBTSxHQUFtQixPQUFPO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTthQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCLFNBQVM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxFQUFDLENBQUM7UUFFTCxVQUFVLENBQUMsTUFBTTthQUNkLFNBQVM7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRTtZQUNkLElBQUksQ0FBQyxDQUFDLElBQUksS0FB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QW9CLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRTs7OztZQVY1RCxpQkFBaUI7WUFBRSx3QkFBd0I7WUFIckMsT0FBTzs7QUFlVCx3QkFBd0I7SUFIcEMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBRS9CLElBQUksRUFBRTs2Q0FJcUIsaUJBQWlCLEVBQTJCLHdCQUF3QixFQUFlLE9BQU87R0FIekcsd0JBQXdCLENBMEZwQztTQTFGWSx3QkFBd0I7Ozs7OztJQUNuQyxpREFBK0Q7O0lBRW5ELHlDQUFvQzs7Ozs7SUFBRSw4Q0FBNEM7O0lBQUUsd0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvcnQsIE1hdFNvcnQsIE1hdFNvcnRIZWFkZXIsIFNvcnREaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgVGFibGVQbHVnaW4sIFBibE5ncmlkU29ydERlZmluaXRpb24gfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIG1hdFNvcnQ/OiBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmU7XG4gIH1cbn1cbmNvbnN0IFBMVUdJTl9LRVk6ICdtYXRTb3J0JyA9ICdtYXRTb3J0JztcblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFttYXRTb3J0XScsIGV4cG9ydEFzOiAncGJsTWF0U29ydCcgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBwdWJsaWMgc29ydDogTWF0U29ydCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgbGV0IG9yaWdpbjogJ2RzJyB8ICdjbGljaycgPSAnY2xpY2snO1xuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggcyA9PiB7XG4gICAgICAgIHRoaXMub25Tb3J0KHMsIG9yaWdpbik7XG4gICAgICAgIG9yaWdpbiA9ICdjbGljayc7XG4gICAgICB9KTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnKSB7XG4gICAgICAgICAgaWYgKHRhYmxlLmRzICYmICF0YWJsZS5kcy5zb3J0LmNvbHVtbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc29ydCAmJiB0aGlzLnNvcnQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgIHRoaXMub25Tb3J0KHsgYWN0aXZlOiB0aGlzLnNvcnQuYWN0aXZlLCBkaXJlY3Rpb246IHRoaXMuc29ydC5kaXJlY3Rpb24gfHwgJ2FzYycgfSwgb3JpZ2luKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgICAgICBVblJ4LmtpbGwodGhpcywgZS5wcmV2KTtcbiAgICAgICAgICBpZiAodGhpcy5zb3J0ICYmIHRoaXMuc29ydC5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0KHsgYWN0aXZlOiB0aGlzLnNvcnQuYWN0aXZlLCBkaXJlY3Rpb246IHRoaXMuc29ydC5kaXJlY3Rpb24gfHwgJ2FzYycgfSwgb3JpZ2luKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YWJsZS5kcy5zb3J0Q2hhbmdlXG4gICAgICAgICAgICAucGlwZShVblJ4KHRoaXMsIGUuY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgZXZlbnQuY29sdW1uKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgX3NvcnQgPSBldmVudC5zb3J0IHx8IHt9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnQuYWN0aXZlID09PSBldmVudC5jb2x1bW4uaWQgJiYgdGhpcy5zb3J0LmRpcmVjdGlvbiA9PT0gKF9zb3J0Lm9yZGVyIHx8ICcnKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgICAgICBjb25zdCBzb3J0YWJsZTogTWF0U29ydEhlYWRlciA9IHRoaXMuc29ydC5zb3J0YWJsZXMuZ2V0KGV2ZW50LmNvbHVtbi5pZCkgYXMgYW55O1xuICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZSkge1xuICAgICAgICAgICAgICAgICAgb3JpZ2luID0gJ2RzJztcbiAgICAgICAgICAgICAgICAgIHRoaXMuc29ydC5hY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICBzb3J0YWJsZS5zdGFydCA9IF9zb3J0Lm9yZGVyIHx8ICdhc2MnO1xuICAgICAgICAgICAgICAgICAgc29ydGFibGUuX2hhbmRsZUNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc29ydC5hY3RpdmUpIHsgLy8gY2xlYXIgbW9kZSAoaGl0IGZyb20gY29kZSwgbm90IGNsaWNrKS5cbiAgICAgICAgICAgICAgICBjb25zdCBzb3J0YWJsZTogTWF0U29ydEhlYWRlciA9IHRoaXMuc29ydC5zb3J0YWJsZXMuZ2V0KHRoaXMuc29ydC5hY3RpdmUpIGFzIGFueTtcbiAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUgKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoIXNvcnRhYmxlLmRpc2FibGVDbGVhcikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbmV4dFNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChuZXh0U29ydERpciA9IHRoaXMuc29ydC5nZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnQuZGlyZWN0aW9uID0gbmV4dFNvcnREaXI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9yaWdpbiA9ICdkcyc7XG4gICAgICAgICAgICAgICAgICBzb3J0YWJsZS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Tb3J0KHNvcnQ6IFNvcnQsIG9yaWdpbjogJ2RzJyB8ICdjbGljaycpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZSA9IHRoaXMudGFibGU7XG4gICAgY29uc3QgY29sdW1uID0gdGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmQoYyA9PiBjLmlkID09PSBzb3J0LmFjdGl2ZSk7XG5cbiAgICBpZiAoIG9yaWdpbiAhPT0gJ2NsaWNrJyB8fCAhY29sdW1uIHx8ICFjb2x1bW4uc29ydCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3U29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiA9IHsgfTtcbiAgICAgIGNvbnN0IHNvcnRGbiA9IHR5cGVvZiBjb2x1bW4uc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2x1bW4uc29ydDtcbiAgICAgIGlmIChzb3J0LmRpcmVjdGlvbikge1xuICAgICAgICBuZXdTb3J0Lm9yZGVyID0gc29ydC5kaXJlY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAoc29ydEZuKSB7XG4gICAgICAgIG5ld1NvcnQuc29ydEZuID0gc29ydEZuO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFNvcnQgPSB0YWJsZS5kcy5zb3J0O1xuICAgICAgaWYgKGNvbHVtbiA9PT0gY3VycmVudFNvcnQuY29sdW1uKSB7XG4gICAgICAgIGNvbnN0IF9zb3J0ID0gY3VycmVudFNvcnQuc29ydCB8fCB7fTtcbiAgICAgICAgaWYgKG5ld1NvcnQub3JkZXIgPT09IF9zb3J0Lm9yZGVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0YWJsZS5kcy5zZXRTb3J0KGNvbHVtbiwgbmV3U29ydCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==