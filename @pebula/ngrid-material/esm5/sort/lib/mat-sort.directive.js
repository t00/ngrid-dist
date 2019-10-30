/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive } from '@angular/core';
import { Sort, MatSort, MatSortHeader, SortDirection } from '@angular/material/sort';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridSortDefinition } from '@pebula/ngrid';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7SUFPM0csVUFBVSxHQUFjLFNBQVM7O0lBUXJDLGtDQUFtQixLQUE2QixFQUFVLFVBQW9DLEVBQVMsSUFBYTtRQUFwSCxpQkF1REM7UUF2RGtCLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2xILElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBRXhELE1BQU0sR0FBbUIsT0FBTztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7YUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQixTQUFTOzs7O1FBQUUsVUFBQSxDQUFDO1lBQ1gsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkIsTUFBTSxHQUFHLE9BQU8sQ0FBQztRQUNuQixDQUFDLEVBQUMsQ0FBQztRQUVMLFVBQVUsQ0FBQyxNQUFNO2FBQ2QsU0FBUzs7OztRQUFFLFVBQUEsQ0FBQztZQUNYLElBQUksQ0FB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Z0JBckZ5QixpQkFBaUI7Z0JBQTJCLHdCQUF3QjtnQkFBZSxPQUFPOzs7Z0JBTHJILFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFOzs7O2dCQVY1RCxpQkFBaUI7Z0JBQUUsd0JBQXdCO2dCQUhyQyxPQUFPOztJQWVULHdCQUF3QjtRQUhwQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFFL0IsSUFBSSxFQUFFO2lEQUlxQixpQkFBaUIsRUFBMkIsd0JBQXdCLEVBQWUsT0FBTztPQUh6Ryx3QkFBd0IsQ0EwRnBDO0lBQUQsK0JBQUM7Q0FBQSxJQUFBO1NBMUZZLHdCQUF3Qjs7Ozs7O0lBQ25DLGlEQUErRDs7SUFFbkQseUNBQW9DOzs7OztJQUFFLDhDQUE0Qzs7SUFBRSx3Q0FBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ydCwgTWF0U29ydCwgTWF0U29ydEhlYWRlciwgU29ydERpcmVjdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiwgUGJsTmdyaWRTb3J0RGVmaW5pdGlvbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgbWF0U29ydD86IFBibE5ncmlkTWF0U29ydERpcmVjdGl2ZTtcbiAgfVxufVxuY29uc3QgUExVR0lOX0tFWTogJ21hdFNvcnQnID0gJ21hdFNvcnQnO1xuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAncGJsLW5ncmlkW21hdFNvcnRdJywgZXhwb3J0QXM6ICdwYmxNYXRTb3J0JyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWF0U29ydERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIHB1YmxpYyBzb3J0OiBNYXRTb3J0KSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBsZXQgb3JpZ2luOiAnZHMnIHwgJ2NsaWNrJyA9ICdjbGljayc7XG4gICAgdGhpcy5zb3J0LnNvcnRDaGFuZ2VcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBzID0+IHtcbiAgICAgICAgdGhpcy5vblNvcnQocywgb3JpZ2luKTtcbiAgICAgICAgb3JpZ2luID0gJ2NsaWNrJztcbiAgICAgIH0pO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGUgPT4ge1xuICAgICAgICBpZiAoZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycpIHtcbiAgICAgICAgICBpZiAodGFibGUuZHMgJiYgIXRhYmxlLmRzLnNvcnQuY29sdW1uKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zb3J0ICYmIHRoaXMuc29ydC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuc29ydC5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5zb3J0LmRpcmVjdGlvbiB8fCAnYXNjJyB9LCBvcmlnaW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZS5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgICAgIFVuUngua2lsbCh0aGlzLCBlLnByZXYpO1xuICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgdGhpcy5zb3J0LmFjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5vblNvcnQoeyBhY3RpdmU6IHRoaXMuc29ydC5hY3RpdmUsIGRpcmVjdGlvbjogdGhpcy5zb3J0LmRpcmVjdGlvbiB8fCAnYXNjJyB9LCBvcmlnaW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRhYmxlLmRzLnNvcnRDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKFVuUngodGhpcywgZS5jdXJyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydCAmJiBldmVudC5jb2x1bW4pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBfc29ydCA9IGV2ZW50LnNvcnQgfHwge307XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydC5hY3RpdmUgPT09IGV2ZW50LmNvbHVtbi5pZCAmJiB0aGlzLnNvcnQuZGlyZWN0aW9uID09PSAoX3NvcnQub3JkZXIgfHwgJycpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHNvcnRhYmxlOiBNYXRTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQoZXZlbnQuY29sdW1uLmlkKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlKSB7XG4gICAgICAgICAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0LmFjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgIHNvcnRhYmxlLnN0YXJ0ID0gX3NvcnQub3JkZXIgfHwgJ2FzYyc7XG4gICAgICAgICAgICAgICAgICBzb3J0YWJsZS5faGFuZGxlQ2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0LmFjdGl2ZSkgeyAvLyBjbGVhciBtb2RlIChoaXQgZnJvbSBjb2RlLCBub3QgY2xpY2spLlxuICAgICAgICAgICAgICAgIGNvbnN0IHNvcnRhYmxlOiBNYXRTb3J0SGVhZGVyID0gdGhpcy5zb3J0LnNvcnRhYmxlcy5nZXQodGhpcy5zb3J0LmFjdGl2ZSkgYXMgYW55O1xuICAgICAgICAgICAgICAgIGlmIChzb3J0YWJsZSApIHtcbiAgICAgICAgICAgICAgICAgIGlmICghc29ydGFibGUuZGlzYWJsZUNsZWFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXh0U29ydERpcjogU29ydERpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG5leHRTb3J0RGlyID0gdGhpcy5zb3J0LmdldE5leHRTb3J0RGlyZWN0aW9uKHNvcnRhYmxlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydC5kaXJlY3Rpb24gPSBuZXh0U29ydERpcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgb3JpZ2luID0gJ2RzJztcbiAgICAgICAgICAgICAgICAgIHNvcnRhYmxlLl9oYW5kbGVDbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBvblNvcnQoc29ydDogU29ydCwgb3JpZ2luOiAnZHMnIHwgJ2NsaWNrJyk6IHZvaWQge1xuICAgIGNvbnN0IHRhYmxlID0gdGhpcy50YWJsZTtcbiAgICBjb25zdCBjb2x1bW4gPSB0YWJsZS5jb2x1bW5BcGkudmlzaWJsZUNvbHVtbnMuZmluZChjID0+IGMuaWQgPT09IHNvcnQuYWN0aXZlKTtcblxuICAgIGlmICggb3JpZ2luICE9PSAnY2xpY2snIHx8ICFjb2x1bW4gfHwgIWNvbHVtbi5zb3J0ICkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuZXdTb3J0OiBQYmxOZ3JpZFNvcnREZWZpbml0aW9uID0geyB9O1xuICAgICAgY29uc3Qgc29ydEZuID0gdHlwZW9mIGNvbHVtbi5zb3J0ID09PSAnZnVuY3Rpb24nICYmIGNvbHVtbi5zb3J0O1xuICAgICAgaWYgKHNvcnQuZGlyZWN0aW9uKSB7XG4gICAgICAgIG5ld1NvcnQub3JkZXIgPSBzb3J0LmRpcmVjdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmIChzb3J0Rm4pIHtcbiAgICAgICAgbmV3U29ydC5zb3J0Rm4gPSBzb3J0Rm47XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50U29ydCA9IHRhYmxlLmRzLnNvcnQ7XG4gICAgICBpZiAoY29sdW1uID09PSBjdXJyZW50U29ydC5jb2x1bW4pIHtcbiAgICAgICAgY29uc3QgX3NvcnQgPSBjdXJyZW50U29ydC5zb3J0IHx8IHt9O1xuICAgICAgICBpZiAobmV3U29ydC5vcmRlciA9PT0gX3NvcnQub3JkZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRhYmxlLmRzLnNldFNvcnQoY29sdW1uLCBuZXdTb3J0KTtcbiAgICB9XG4gIH1cblxufVxuIl19