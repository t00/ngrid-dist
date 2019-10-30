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
var PLUGIN_KEY = 'matSort';
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
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            _this.onSort(s, origin);
            origin = 'click';
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (e.kind === 'onInvalidateHeaders') {
                if (table.ds && !table.ds.sort.column) {
                    if (_this.sort && _this.sort.active) {
                        _this.onSort({ active: _this.sort.active, direction: _this.sort.direction || 'asc' }, origin);
                    }
                }
            }
            if (e.kind === 'onDataSource') {
                UnRx.kill(_this, e.prev);
                if (_this.sort && _this.sort.active) {
                    _this.onSort({ active: _this.sort.active, direction: _this.sort.direction || 'asc' }, origin);
                }
                table.ds.sortChange
                    .pipe(UnRx(_this, e.curr))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (_this.sort && event.column) {
                        /** @type {?} */
                        var _sort = event.sort || {};
                        if (_this.sort.active === event.column.id && _this.sort.direction === (_sort.order || '')) {
                            return;
                        }
                        /** @type {?} */
                        var sortable = (/** @type {?} */ (_this.sort.sortables.get(event.column.id)));
                        if (sortable) {
                            origin = 'ds';
                            _this.sort.active = undefined;
                            sortable.start = _sort.order || 'asc';
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
                }));
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
    PblNgridMatSortDirective = tslib_1.__decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController, MatSort])
    ], PblNgridMatSortDirective);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFRLE9BQU8sRUFBZ0MsTUFBTSx3QkFBd0IsQ0FBQztBQUVyRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQTBCLE1BQU0sZUFBZSxDQUFDOztJQU8zRyxVQUFVLEdBQWMsU0FBUzs7SUFRckMsa0NBQW1CLEtBQTZCLEVBQVUsVUFBb0MsRUFBUyxJQUFhO1FBQXBILGlCQXVEQztRQXZEa0IsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUEwQjtRQUFTLFNBQUksR0FBSixJQUFJLENBQVM7UUFDbEgsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7WUFFeEQsTUFBTSxHQUFtQixPQUFPO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVTthQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCLFNBQVM7Ozs7UUFBRSxVQUFBLENBQUM7WUFDWCxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2QixNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO1FBRUwsVUFBVSxDQUFDLE1BQU07YUFDZCxTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLHFCQUFxQixFQUFFO2dCQUNwQyxJQUFJ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QUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7Ozs7Z0JBVjVELGlCQUFpQjtnQkFBRSx3QkFBd0I7Z0JBSHJDLE9BQU87O0lBZVQsd0JBQXdCO1FBSHBDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUUvQixJQUFJLEVBQUU7aURBSXFCLGlCQUFpQixFQUEyQix3QkFBd0IsRUFBZSxPQUFPO09BSHpHLHdCQUF3QixDQTBGcEM7SUFBRCwrQkFBQztDQUFBLElBQUE7U0ExRlksd0JBQXdCOzs7Ozs7SUFDbkMsaURBQStEOztJQUVuRCx5Q0FBb0M7Ozs7O0lBQUUsOENBQTRDOztJQUFFLHdDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb3J0LCBNYXRTb3J0LCBNYXRTb3J0SGVhZGVyLCBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRTb3J0PzogUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlO1xuICB9XG59XG5jb25zdCBQTFVHSU5fS0VZOiAnbWF0U29ydCcgPSAnbWF0U29ydCc7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbbWF0U29ydF0nLCBleHBvcnRBczogJ3BibE1hdFNvcnQnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgcHVibGljIHNvcnQ6IE1hdFNvcnQpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGxldCBvcmlnaW46ICdkcycgfCAnY2xpY2snID0gJ2NsaWNrJztcbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIHMgPT4ge1xuICAgICAgICB0aGlzLm9uU29ydChzLCBvcmlnaW4pO1xuICAgICAgICBvcmlnaW4gPSAnY2xpY2snO1xuICAgICAgfSk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJykge1xuICAgICAgICAgIGlmICh0YWJsZS5kcyAmJiAhdGFibGUuZHMuc29ydC5jb2x1bW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgdGhpcy5zb3J0LmFjdGl2ZSkge1xuICAgICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgVW5SeC5raWxsKHRoaXMsIGUucHJldik7XG4gICAgICAgICAgaWYgKHRoaXMuc29ydCAmJiB0aGlzLnNvcnQuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUuZHMuc29ydENoYW5nZVxuICAgICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCBlLmN1cnIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0ICYmIGV2ZW50LmNvbHVtbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9zb3J0ID0gZXZlbnQuc29ydCB8fCB7fTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0LmFjdGl2ZSA9PT0gZXZlbnQuY29sdW1uLmlkICYmIHRoaXMuc29ydC5kaXJlY3Rpb24gPT09IChfc29ydC5vcmRlciB8fCAnJykpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGFibGU6IE1hdFNvcnRIZWFkZXIgPSB0aGlzLnNvcnQuc29ydGFibGVzLmdldChldmVudC5jb2x1bW4uaWQpIGFzIGFueTtcbiAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUpIHtcbiAgICAgICAgICAgICAgICAgIG9yaWdpbiA9ICdkcyc7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNvcnQuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgc29ydGFibGUuc3RhcnQgPSBfc29ydC5vcmRlciB8fCAnYXNjJztcbiAgICAgICAgICAgICAgICAgIHNvcnRhYmxlLl9oYW5kbGVDbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnQuYWN0aXZlKSB7IC8vIGNsZWFyIG1vZGUgKGhpdCBmcm9tIGNvZGUsIG5vdCBjbGljaykuXG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGFibGU6IE1hdFNvcnRIZWFkZXIgPSB0aGlzLnNvcnQuc29ydGFibGVzLmdldCh0aGlzLnNvcnQuYWN0aXZlKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlICkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzb3J0YWJsZS5kaXNhYmxlQ2xlYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRTb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dFNvcnREaXIgPSB0aGlzLnNvcnQuZ2V0TmV4dFNvcnREaXJlY3Rpb24oc29ydGFibGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvbiA9IG5leHRTb3J0RGlyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgICAgICAgICAgc29ydGFibGUuX2hhbmRsZUNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIG9uU29ydChzb3J0OiBTb3J0LCBvcmlnaW46ICdkcycgfCAnY2xpY2snKTogdm9pZCB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLnRhYmxlO1xuICAgIGNvbnN0IGNvbHVtbiA9IHRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5maW5kKGMgPT4gYy5pZCA9PT0gc29ydC5hY3RpdmUpO1xuXG4gICAgaWYgKCBvcmlnaW4gIT09ICdjbGljaycgfHwgIWNvbHVtbiB8fCAhY29sdW1uLnNvcnQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1NvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24gPSB7IH07XG4gICAgICBjb25zdCBzb3J0Rm4gPSB0eXBlb2YgY29sdW1uLnNvcnQgPT09ICdmdW5jdGlvbicgJiYgY29sdW1uLnNvcnQ7XG4gICAgICBpZiAoc29ydC5kaXJlY3Rpb24pIHtcbiAgICAgICAgbmV3U29ydC5vcmRlciA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRGbikge1xuICAgICAgICBuZXdTb3J0LnNvcnRGbiA9IHNvcnRGbjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRTb3J0ID0gdGFibGUuZHMuc29ydDtcbiAgICAgIGlmIChjb2x1bW4gPT09IGN1cnJlbnRTb3J0LmNvbHVtbikge1xuICAgICAgICBjb25zdCBfc29ydCA9IGN1cnJlbnRTb3J0LnNvcnQgfHwge307XG4gICAgICAgIGlmIChuZXdTb3J0Lm9yZGVyID09PSBfc29ydC5vcmRlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGFibGUuZHMuc2V0U29ydChjb2x1bW4sIG5ld1NvcnQpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=