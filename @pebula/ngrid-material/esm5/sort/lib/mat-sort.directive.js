/**
 * @fileoverview added by tsickle
 * Generated from: lib/mat-sort.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { PblNgridComponent, PblNgridPluginController, utils } from '@pebula/ngrid';
/** @type {?} */
export var PLUGIN_KEY = 'matSort';
var PblNgridMatSortDirective = /** @class */ (function () {
    function PblNgridMatSortDirective(table, pluginCtrl, sort) {
        var _this = this;
        this.table = table;
        this.pluginCtrl = pluginCtrl;
        this.sort = sort;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        var origin = 'click';
        this.sort.sortChange
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            _this.onSort(s, origin);
            origin = 'click';
        }));
        /** @type {?} */
        var handleDataSourceSortChange = (/**
         * @param {?} sortChange
         * @return {?}
         */
        function (sortChange) {
            var column = sortChange.column;
            /** @type {?} */
            var order = sortChange.sort ? sortChange.sort.order : undefined;
            if (_this.sort && column) {
                if (_this.sort.active === column.id && _this.sort.direction === (order || '')) {
                    return;
                }
                /** @type {?} */
                var sortable = (/** @type {?} */ (_this.sort.sortables.get(column.id)));
                if (sortable) {
                    origin = 'ds';
                    _this.sort.active = undefined;
                    sortable.start = order || 'asc';
                    sortable._handleClick();
                }
            }
            else if (_this.sort.active) { // clear mode (hit from code, not click).
                // clear mode (hit from code, not click).
                /** @type {?} */
                var sortable = (/** @type {?} */ (_this.sort.sortables.get(_this.sort.active)));
                if (sortable) {
                    if (!sortable.disableClear) {
                        /** @type {?} */
                        var nextSortDir = void 0;
                        while (nextSortDir = _this.sort.getNextSortDirection(sortable)) {
                            _this.sort.direction = nextSortDir;
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
        function (e) {
            if (e.kind === 'onInvalidateHeaders') {
                /** @type {?} */
                var hasActiveSort = _this.sort && _this.sort.active;
                if (table.ds && table.ds.sort) {
                    if (!table.ds.sort.column && hasActiveSort) {
                        _this.onSort({ active: _this.sort.active, direction: _this.sort.direction || 'asc' }, origin);
                    }
                    else if (table.ds.sort.column && !hasActiveSort) {
                        setTimeout((/**
                         * @return {?}
                         */
                        function () { return handleDataSourceSortChange(table.ds.sort); }));
                    }
                }
            }
            if (e.kind === 'onDataSource') {
                utils.unrx.kill(_this, e.prev);
                if (_this.sort && _this.sort.active) {
                    _this.onSort({ active: _this.sort.active, direction: _this.sort.direction || 'asc' }, origin);
                }
                table.ds.sortChange
                    .pipe(utils.unrx(_this, e.curr))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { handleDataSourceSortChange(event); }));
            }
        }));
    }
    /**
     * @return {?}
     */
    PblNgridMatSortDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.table);
        utils.unrx.kill(this);
    };
    /**
     * @private
     * @param {?} sort
     * @param {?} origin
     * @return {?}
     */
    PblNgridMatSortDirective.prototype.onSort = /**
     * @private
     * @param {?} sort
     * @param {?} origin
     * @return {?}
     */
    function (sort, origin) {
        /** @type {?} */
        var table = this.table;
        /** @type {?} */
        var column = table.columnApi.visibleColumns.find((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.id === sort.active; }));
        if (origin !== 'click' || !column || !column.sort) {
            return;
        }
        else {
            /** @type {?} */
            var newSort = {};
            /** @type {?} */
            var sortFn = typeof column.sort === 'function' && column.sort;
            if (sort.direction) {
                newSort.order = sort.direction;
            }
            if (sortFn) {
                newSort.sortFn = sortFn;
            }
            /** @type {?} */
            var currentSort = table.ds.sort;
            if (column === currentSort.column) {
                /** @type {?} */
                var _sort = currentSort.sort || {};
                if (newSort.order === _sort.order) {
                    return;
                }
            }
            table.ds.setSort(column, newSort);
        }
    };
    PblNgridMatSortDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[matSort]', exportAs: 'pblMatSort' },] }
    ];
    /** @nocollapse */
    PblNgridMatSortDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: MatSort }
    ]; };
    return PblNgridMatSortDirective;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFRLE9BQU8sRUFBZ0MsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQXlDLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFPMUgsTUFBTSxLQUFPLFVBQVUsR0FBYyxTQUFTO0FBRTlDO0lBSUUsa0NBQW1CLEtBQTZCLEVBQVUsVUFBb0MsRUFBUyxJQUFhO1FBQXBILGlCQTZEQztRQTdEa0IsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQVM7UUFDbEgsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFFeEQsTUFBTSxHQUFtQixPQUFPO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTthQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0QixTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ1gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkIsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQzs7WUFFQywwQkFBMEI7Ozs7UUFBRyxVQUFDLFVBQWlDO1lBQzNELElBQUEsMEJBQU07O2dCQUNSLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtB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TSxFQUFFO2dCQUNWLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQ3pCOztnQkFDSyxXQUFXLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJO1lBQ2pDLElBQUksTUFBTSxLQUFLLFdBQVcsQ0FBQyxNQUFNLEVBQUU7O29CQUMzQixLQUFLLEdBQUcsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNwQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDakMsT0FBTztpQkFDUjthQUNGO1lBQ0QsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7Z0JBaEdGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFOzs7O2dCQVQ1RCxpQkFBaUI7Z0JBQUUsd0JBQXdCO2dCQUZyQyxPQUFPOztJQTZHdEIsK0JBQUM7Q0FBQSxBQWxHRCxJQWtHQztTQWpHWSx3QkFBd0I7Ozs7OztJQUNuQyxpREFBK0Q7O0lBRW5ELHlDQUFvQzs7Ozs7SUFBRSw4Q0FBNEM7O0lBQUUsd0NBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvcnQsIE1hdFNvcnQsIE1hdFNvcnRIZWFkZXIsIFNvcnREaXJlY3Rpb24gfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiwgUGJsRGF0YVNvdXJjZSwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIG1hdFNvcnQ/OiBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmU7XG4gIH1cbn1cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnbWF0U29ydCcgPSAnbWF0U29ydCc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFttYXRTb3J0XScsIGV4cG9ydEFzOiAncGJsTWF0U29ydCcgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1hdFNvcnREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBwdWJsaWMgc29ydDogTWF0U29ydCkge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgbGV0IG9yaWdpbjogJ2RzJyB8ICdjbGljaycgPSAnY2xpY2snO1xuICAgIHRoaXMuc29ydC5zb3J0Q2hhbmdlXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggcyA9PiB7XG4gICAgICAgIHRoaXMub25Tb3J0KHMsIG9yaWdpbik7XG4gICAgICAgIG9yaWdpbiA9ICdjbGljayc7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlID0gKHNvcnRDaGFuZ2U6IFBibERhdGFTb3VyY2VbJ3NvcnQnXSkgPT4ge1xuICAgICAgY29uc3QgeyBjb2x1bW4gfSA9IHNvcnRDaGFuZ2U7XG4gICAgICBjb25zdCBvcmRlciA9IHNvcnRDaGFuZ2Uuc29ydCA/IHNvcnRDaGFuZ2Uuc29ydC5vcmRlciA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHRoaXMuc29ydCAmJiBjb2x1bW4pIHtcbiAgICAgICAgaWYgKHRoaXMuc29ydC5hY3RpdmUgPT09IGNvbHVtbi5pZCAmJiB0aGlzLnNvcnQuZGlyZWN0aW9uID09PSAob3JkZXIgfHwgJycpKSB7IHJldHVybjsgfVxuICAgICAgICBjb25zdCBzb3J0YWJsZTogTWF0U29ydEhlYWRlciA9IHRoaXMuc29ydC5zb3J0YWJsZXMuZ2V0KGNvbHVtbi5pZCkgYXMgYW55O1xuICAgICAgICBpZiAoc29ydGFibGUpIHtcbiAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgIHRoaXMuc29ydC5hY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgc29ydGFibGUuc3RhcnQgPSBvcmRlciB8fCAnYXNjJztcbiAgICAgICAgICBzb3J0YWJsZS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnQuYWN0aXZlKSB7IC8vIGNsZWFyIG1vZGUgKGhpdCBmcm9tIGNvZGUsIG5vdCBjbGljaykuXG4gICAgICAgIGNvbnN0IHNvcnRhYmxlOiBNYXRTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQodGhpcy5zb3J0LmFjdGl2ZSkgYXMgYW55O1xuICAgICAgICBpZiAoc29ydGFibGUgKSB7XG4gICAgICAgICAgaWYgKCFzb3J0YWJsZS5kaXNhYmxlQ2xlYXIpIHtcbiAgICAgICAgICAgIGxldCBuZXh0U29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgICAgICAgICAgIHdoaWxlIChuZXh0U29ydERpciA9IHRoaXMuc29ydC5nZXROZXh0U29ydERpcmVjdGlvbihzb3J0YWJsZSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvbiA9IG5leHRTb3J0RGlyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgIHNvcnRhYmxlLl9oYW5kbGVDbGljaygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBpZiAoZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycpIHtcbiAgICAgICAgICBjb25zdCBoYXNBY3RpdmVTb3J0ID0gdGhpcy5zb3J0ICYmIHRoaXMuc29ydC5hY3RpdmU7XG4gICAgICAgICAgaWYgKHRhYmxlLmRzICYmIHRhYmxlLmRzLnNvcnQpIHtcbiAgICAgICAgICAgIGlmICghdGFibGUuZHMuc29ydC5jb2x1bW4gJiYgaGFzQWN0aXZlU29ydCkge1xuICAgICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRhYmxlLmRzLnNvcnQuY29sdW1uICYmICFoYXNBY3RpdmVTb3J0KSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGFuZGxlRGF0YVNvdXJjZVNvcnRDaGFuZ2UodGFibGUuZHMuc29ydCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgICAgIHV0aWxzLnVucngua2lsbCh0aGlzLCBlLnByZXYpO1xuICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgdGhpcy5zb3J0LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuc29ydC5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5zb3J0LmRpcmVjdGlvbiB8fCAnYXNjJyB9LCBvcmlnaW4pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0YWJsZS5kcy5zb3J0Q2hhbmdlXG4gICAgICAgICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMsIGUuY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlKGV2ZW50KTsgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Tb3J0KHNvcnQ6IFNvcnQsIG9yaWdpbjogJ2RzJyB8ICdjbGljaycpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZSA9IHRoaXMudGFibGU7XG4gICAgY29uc3QgY29sdW1uID0gdGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmQoYyA9PiBjLmlkID09PSBzb3J0LmFjdGl2ZSk7XG5cbiAgICBpZiAoIG9yaWdpbiAhPT0gJ2NsaWNrJyB8fCAhY29sdW1uIHx8ICFjb2x1bW4uc29ydCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3U29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiA9IHsgfTtcbiAgICAgIGNvbnN0IHNvcnRGbiA9IHR5cGVvZiBjb2x1bW4uc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2x1bW4uc29ydDtcbiAgICAgIGlmIChzb3J0LmRpcmVjdGlvbikge1xuICAgICAgICBuZXdTb3J0Lm9yZGVyID0gc29ydC5kaXJlY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAoc29ydEZuKSB7XG4gICAgICAgIG5ld1NvcnQuc29ydEZuID0gc29ydEZuO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFNvcnQgPSB0YWJsZS5kcy5zb3J0O1xuICAgICAgaWYgKGNvbHVtbiA9PT0gY3VycmVudFNvcnQuY29sdW1uKSB7XG4gICAgICAgIGNvbnN0IF9zb3J0ID0gY3VycmVudFNvcnQuc29ydCB8fCB7fTtcbiAgICAgICAgaWYgKG5ld1NvcnQub3JkZXIgPT09IF9zb3J0Lm9yZGVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0YWJsZS5kcy5zZXRTb3J0KGNvbHVtbiwgbmV3U29ydCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==