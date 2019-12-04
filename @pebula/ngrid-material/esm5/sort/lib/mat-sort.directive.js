/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { Sort, MatSort, MatSortHeader, SortDirection } from '@angular/material/sort';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin, PblNgridSortDefinition, PblDataSource } from '@pebula/ngrid';
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
    PblNgridMatSortDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController },
        { type: MatSort }
    ]; };
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
        NgridPlugin({ id: PLUGIN_KEY }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBTzFILFVBQVUsR0FBYyxTQUFTOztJQVFyQyxrQ0FBbUIsS0FBNkIsRUFBVSxVQUFvQyxFQUFTLElBQWE7UUFBcEgsaUJBNkRDO1FBN0RrQixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUztRQUNsSCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUV4RCxNQUFNLEdBQW1CLE9BQU87UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVO2FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLFVBQUEsQ0FBQztZQUNYLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDbkIsQ0FBQyxFQUFDLENBQUM7O1lBRUMsMEJBQTBCOzs7O1FBQUcsVUFBQyxVQUFpQztZQUMzRCxJQUFBLDBCQUFNOztnQkFDUixLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFFakUsSUFBSSxLQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtnQkFDdkIsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxFQUFFO29CQUFFLE9BQU87aUJBQUU7O29CQUNsRixRQUFRLEdBQWtCLG1CQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQU87Z0JBQ3pFLElBQUksUUFBUSxFQUFFO29CQUNaLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2QsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO29CQUM3QixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUM7b0JBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztpQkFDekI7YUFDRjtpQkFBTSxJQUFJLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUseUNBQXlDOzs7b0JBQ2hFLFFBQVEsR0FBa0IsbUJBQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQU87Z0JBQ2hGLElBQUksUUFBUSxFQUFHO29CQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFOzs0QkFDdEIsV0FBVyxTQUFlO3dCQUM5QixPQUFPLFdBQVcsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUM3RCxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7eUJBQ25DO3FCQUNGO29CQUNELE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2QsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN6QjthQUNGO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsVUFBVSxDQUFDLE1BQU07YUFDZCxTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLHFCQUFxQixFQUFFOztvQkFDOUIsYUFBYSxHQUFHLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUNuRCxJQUFJLEtBQUssQ0FBQyxFQUFFLElBQUksS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksYUFBYSxFQUFFO3dCQUMxQyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxLQUFLLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDNUY7eUJBQU0sSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ2pELFVBQVU7Ozt3QkFBQyxjQUFNLE9BQUEsMEJBQTBCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBekMsQ0FBeUMsRUFBQyxDQUFDO3FCQUM3RDtpQkFDRjthQUNGO1lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLGNBQWMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM1RjtnQkFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVU7cUJBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDeEIsU0FBUzs7OztnQkFBRSxVQUFBLEtBQUssSUFBTSwwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO2FBQ2hFO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7O0lBRUQsOENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Ozs7OztJQUVPLHlDQUFNOzs7Ozs7SUFBZCxVQUFlLElBQVUsRUFBRSxNQUFzQjs7WUFDekMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLOztZQUNsQixNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSTs7OztRQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFwQixDQUFvQixFQUFDO1FBRTdFLElBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUc7WUFDbkQsT0FBTztTQUNSO2FBQU07O2dCQUNDLE9BQU8sR0FBMkIsRUFBRzs7Z0JBQ3JDLE1BQU0sR0FBRyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJO1lBQy9ELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsT0FBTyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7YUFDekI7O2dCQUNLLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUk7WUFDakMsSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDLE1BQU0sRUFBRTs7b0JBQzNCLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BDLElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUNqQyxPQUFPO2lCQUNSO2FBQ0Y7WUFDRCxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDOztnQkEzRnlCLGlCQUFpQjtnQkFBMkIsd0JBQXdCO2dCQUFlLE9BQU87OztnQkFMckgsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7Ozs7Z0JBVjVELGlCQUFpQjtnQkFBRSx3QkFBd0I7Z0JBSHJDLE9BQU87O0lBZVQsd0JBQXdCO1FBSHBDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztRQUUvQixJQUFJLEVBQUU7aURBSXFCLGlCQUFpQixFQUEyQix3QkFBd0IsRUFBZSxPQUFPO09BSHpHLHdCQUF3QixDQWdHcEM7SUFBRCwrQkFBQztDQUFBLElBQUE7U0FoR1ksd0JBQXdCOzs7Ozs7SUFDbkMsaURBQStEOztJQUVuRCx5Q0FBb0M7Ozs7O0lBQUUsOENBQTRDOztJQUFFLHdDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb3J0LCBNYXRTb3J0LCBNYXRTb3J0SGVhZGVyLCBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uLCBQYmxEYXRhU291cmNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRTb3J0PzogUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlO1xuICB9XG59XG5jb25zdCBQTFVHSU5fS0VZOiAnbWF0U29ydCcgPSAnbWF0U29ydCc7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbbWF0U29ydF0nLCBleHBvcnRBczogJ3BibE1hdFNvcnQnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgcHVibGljIHNvcnQ6IE1hdFNvcnQpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGxldCBvcmlnaW46ICdkcycgfCAnY2xpY2snID0gJ2NsaWNrJztcbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIHMgPT4ge1xuICAgICAgICB0aGlzLm9uU29ydChzLCBvcmlnaW4pO1xuICAgICAgICBvcmlnaW4gPSAnY2xpY2snO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCBoYW5kbGVEYXRhU291cmNlU29ydENoYW5nZSA9IChzb3J0Q2hhbmdlOiBQYmxEYXRhU291cmNlWydzb3J0J10pID0+IHtcbiAgICAgIGNvbnN0IHsgY29sdW1uIH0gPSBzb3J0Q2hhbmdlO1xuICAgICAgY29uc3Qgb3JkZXIgPSBzb3J0Q2hhbmdlLnNvcnQgPyBzb3J0Q2hhbmdlLnNvcnQub3JkZXIgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh0aGlzLnNvcnQgJiYgY29sdW1uKSB7XG4gICAgICAgIGlmICh0aGlzLnNvcnQuYWN0aXZlID09PSBjb2x1bW4uaWQgJiYgdGhpcy5zb3J0LmRpcmVjdGlvbiA9PT0gKG9yZGVyIHx8ICcnKSkgeyByZXR1cm47IH1cbiAgICAgICAgY29uc3Qgc29ydGFibGU6IE1hdFNvcnRIZWFkZXIgPSB0aGlzLnNvcnQuc29ydGFibGVzLmdldChjb2x1bW4uaWQpIGFzIGFueTtcbiAgICAgICAgaWYgKHNvcnRhYmxlKSB7XG4gICAgICAgICAgb3JpZ2luID0gJ2RzJztcbiAgICAgICAgICB0aGlzLnNvcnQuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHNvcnRhYmxlLnN0YXJ0ID0gb3JkZXIgfHwgJ2FzYyc7XG4gICAgICAgICAgc29ydGFibGUuX2hhbmRsZUNsaWNrKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0LmFjdGl2ZSkgeyAvLyBjbGVhciBtb2RlIChoaXQgZnJvbSBjb2RlLCBub3QgY2xpY2spLlxuICAgICAgICBjb25zdCBzb3J0YWJsZTogTWF0U29ydEhlYWRlciA9IHRoaXMuc29ydC5zb3J0YWJsZXMuZ2V0KHRoaXMuc29ydC5hY3RpdmUpIGFzIGFueTtcbiAgICAgICAgaWYgKHNvcnRhYmxlICkge1xuICAgICAgICAgIGlmICghc29ydGFibGUuZGlzYWJsZUNsZWFyKSB7XG4gICAgICAgICAgICBsZXQgbmV4dFNvcnREaXI6IFNvcnREaXJlY3Rpb247XG4gICAgICAgICAgICB3aGlsZSAobmV4dFNvcnREaXIgPSB0aGlzLnNvcnQuZ2V0TmV4dFNvcnREaXJlY3Rpb24oc29ydGFibGUpKSB7XG4gICAgICAgICAgICAgIHRoaXMuc29ydC5kaXJlY3Rpb24gPSBuZXh0U29ydERpcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgb3JpZ2luID0gJ2RzJztcbiAgICAgICAgICBzb3J0YWJsZS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKCBlID0+IHtcbiAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnKSB7XG4gICAgICAgICAgY29uc3QgaGFzQWN0aXZlU29ydCA9IHRoaXMuc29ydCAmJiB0aGlzLnNvcnQuYWN0aXZlO1xuICAgICAgICAgIGlmICh0YWJsZS5kcyAmJiB0YWJsZS5kcy5zb3J0KSB7XG4gICAgICAgICAgICBpZiAoIXRhYmxlLmRzLnNvcnQuY29sdW1uICYmIGhhc0FjdGl2ZVNvcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuc29ydC5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5zb3J0LmRpcmVjdGlvbiB8fCAnYXNjJyB9LCBvcmlnaW4pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0YWJsZS5kcy5zb3J0LmNvbHVtbiAmJiAhaGFzQWN0aXZlU29ydCkge1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhhbmRsZURhdGFTb3VyY2VTb3J0Q2hhbmdlKHRhYmxlLmRzLnNvcnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgICAgICBVblJ4LmtpbGwodGhpcywgZS5wcmV2KTtcbiAgICAgICAgICBpZiAodGhpcy5zb3J0ICYmIHRoaXMuc29ydC5hY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMub25Tb3J0KHsgYWN0aXZlOiB0aGlzLnNvcnQuYWN0aXZlLCBkaXJlY3Rpb246IHRoaXMuc29ydC5kaXJlY3Rpb24gfHwgJ2FzYycgfSwgb3JpZ2luKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGFibGUuZHMuc29ydENoYW5nZVxuICAgICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCBlLmN1cnIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4geyBoYW5kbGVEYXRhU291cmNlU29ydENoYW5nZShldmVudCk7IH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgfVxuXG4gIHByaXZhdGUgb25Tb3J0KHNvcnQ6IFNvcnQsIG9yaWdpbjogJ2RzJyB8ICdjbGljaycpOiB2b2lkIHtcbiAgICBjb25zdCB0YWJsZSA9IHRoaXMudGFibGU7XG4gICAgY29uc3QgY29sdW1uID0gdGFibGUuY29sdW1uQXBpLnZpc2libGVDb2x1bW5zLmZpbmQoYyA9PiBjLmlkID09PSBzb3J0LmFjdGl2ZSk7XG5cbiAgICBpZiAoIG9yaWdpbiAhPT0gJ2NsaWNrJyB8fCAhY29sdW1uIHx8ICFjb2x1bW4uc29ydCApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmV3U29ydDogUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiA9IHsgfTtcbiAgICAgIGNvbnN0IHNvcnRGbiA9IHR5cGVvZiBjb2x1bW4uc29ydCA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2x1bW4uc29ydDtcbiAgICAgIGlmIChzb3J0LmRpcmVjdGlvbikge1xuICAgICAgICBuZXdTb3J0Lm9yZGVyID0gc29ydC5kaXJlY3Rpb247XG4gICAgICB9XG4gICAgICBpZiAoc29ydEZuKSB7XG4gICAgICAgIG5ld1NvcnQuc29ydEZuID0gc29ydEZuO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFNvcnQgPSB0YWJsZS5kcy5zb3J0O1xuICAgICAgaWYgKGNvbHVtbiA9PT0gY3VycmVudFNvcnQuY29sdW1uKSB7XG4gICAgICAgIGNvbnN0IF9zb3J0ID0gY3VycmVudFNvcnQuc29ydCB8fCB7fTtcbiAgICAgICAgaWYgKG5ld1NvcnQub3JkZXIgPT09IF9zb3J0Lm9yZGVyKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0YWJsZS5kcy5zZXRTb3J0KGNvbHVtbiwgbmV3U29ydCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==