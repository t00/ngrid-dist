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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LXNvcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC1tYXRlcmlhbC9zb3J0LyIsInNvdXJjZXMiOlsibGliL21hdC1zb3J0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7TUFPM0csVUFBVSxHQUFjLFNBQVM7SUFLMUIsd0JBQXdCLFNBQXhCLHdCQUF3Qjs7Ozs7O0lBR25DLFlBQW1CLEtBQTZCLEVBQVUsVUFBb0MsRUFBUyxJQUFhO1FBQWpHLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2xILElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7O1lBRXhELE1BQU0sR0FBbUIsT0FBTztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7YUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQixTQUFTOzs7O1FBQUUsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2QixNQUFNLEdBQUcsT0FBTyxDQUFDO1FBQ25CLENBQUMsRUFBQyxDQUFDO1FBRUwsVUFBVSxDQUFDLE1BQU07YUFDZCxTQUFTOzs7O1FBQUUsQ0FB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Q0FBQTs7WUF2RjJCLGlCQUFpQjtZQUEyQix3QkFBd0I7WUFBZSxPQUFPOzs7WUFMckgsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUU7Ozs7WUFWNUQsaUJBQWlCO1lBQUUsd0JBQXdCO1lBSHJDLE9BQU87O0FBZVQsd0JBQXdCO0lBSHBDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUUvQixJQUFJLEVBQUU7NkNBSXFCLGlCQUFpQixFQUEyQix3QkFBd0IsRUFBZSxPQUFPO0dBSHpHLHdCQUF3QixDQTBGcEM7U0ExRlksd0JBQXdCOzs7Ozs7SUFDbkMsaURBQStEOztJQUVuRCx5Q0FBb0M7Ozs7O0lBQUUsOENBQTRDOztJQUFFLHdDQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb3J0LCBNYXRTb3J0LCBNYXRTb3J0SGVhZGVyLCBTb3J0RGlyZWN0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luLCBQYmxOZ3JpZFNvcnREZWZpbml0aW9uIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBtYXRTb3J0PzogUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlO1xuICB9XG59XG5jb25zdCBQTFVHSU5fS0VZOiAnbWF0U29ydCcgPSAnbWF0U29ydCc7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbbWF0U29ydF0nLCBleHBvcnRBczogJ3BibE1hdFNvcnQnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNYXRTb3J0RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgcHVibGljIHNvcnQ6IE1hdFNvcnQpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGxldCBvcmlnaW46ICdkcycgfCAnY2xpY2snID0gJ2NsaWNrJztcbiAgICB0aGlzLnNvcnQuc29ydENoYW5nZVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIHMgPT4ge1xuICAgICAgICB0aGlzLm9uU29ydChzLCBvcmlnaW4pO1xuICAgICAgICBvcmlnaW4gPSAnY2xpY2snO1xuICAgICAgfSk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSggZSA9PiB7XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJykge1xuICAgICAgICAgIGlmICh0YWJsZS5kcyAmJiAhdGFibGUuZHMuc29ydC5jb2x1bW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvcnQgJiYgdGhpcy5zb3J0LmFjdGl2ZSkge1xuICAgICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlLmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgVW5SeC5raWxsKHRoaXMsIGUucHJldik7XG4gICAgICAgICAgaWYgKHRoaXMuc29ydCAmJiB0aGlzLnNvcnQuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydCh7IGFjdGl2ZTogdGhpcy5zb3J0LmFjdGl2ZSwgZGlyZWN0aW9uOiB0aGlzLnNvcnQuZGlyZWN0aW9uIHx8ICdhc2MnIH0sIG9yaWdpbik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUuZHMuc29ydENoYW5nZVxuICAgICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCBlLmN1cnIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0ICYmIGV2ZW50LmNvbHVtbikge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9zb3J0ID0gZXZlbnQuc29ydCB8fCB7fTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0LmFjdGl2ZSA9PT0gZXZlbnQuY29sdW1uLmlkICYmIHRoaXMuc29ydC5kaXJlY3Rpb24gPT09IChfc29ydC5vcmRlciB8fCAnJykpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGFibGU6IE1hdFNvcnRIZWFkZXIgPSB0aGlzLnNvcnQuc29ydGFibGVzLmdldChldmVudC5jb2x1bW4uaWQpIGFzIGFueTtcbiAgICAgICAgICAgICAgICBpZiAoc29ydGFibGUpIHtcbiAgICAgICAgICAgICAgICAgIG9yaWdpbiA9ICdkcyc7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNvcnQuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgc29ydGFibGUuc3RhcnQgPSBfc29ydC5vcmRlciB8fCAnYXNjJztcbiAgICAgICAgICAgICAgICAgIHNvcnRhYmxlLl9oYW5kbGVDbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNvcnQuYWN0aXZlKSB7IC8vIGNsZWFyIG1vZGUgKGhpdCBmcm9tIGNvZGUsIG5vdCBjbGljaykuXG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGFibGU6IE1hdFNvcnRIZWFkZXIgPSB0aGlzLnNvcnQuc29ydGFibGVzLmdldCh0aGlzLnNvcnQuYWN0aXZlKSBhcyBhbnk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRhYmxlICkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFzb3J0YWJsZS5kaXNhYmxlQ2xlYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRTb3J0RGlyOiBTb3J0RGlyZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobmV4dFNvcnREaXIgPSB0aGlzLnNvcnQuZ2V0TmV4dFNvcnREaXJlY3Rpb24oc29ydGFibGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0LmRpcmVjdGlvbiA9IG5leHRTb3J0RGlyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBvcmlnaW4gPSAnZHMnO1xuICAgICAgICAgICAgICAgICAgc29ydGFibGUuX2hhbmRsZUNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIG9uU29ydChzb3J0OiBTb3J0LCBvcmlnaW46ICdkcycgfCAnY2xpY2snKTogdm9pZCB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLnRhYmxlO1xuICAgIGNvbnN0IGNvbHVtbiA9IHRhYmxlLmNvbHVtbkFwaS52aXNpYmxlQ29sdW1ucy5maW5kKGMgPT4gYy5pZCA9PT0gc29ydC5hY3RpdmUpO1xuXG4gICAgaWYgKCBvcmlnaW4gIT09ICdjbGljaycgfHwgIWNvbHVtbiB8fCAhY29sdW1uLnNvcnQgKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5ld1NvcnQ6IFBibE5ncmlkU29ydERlZmluaXRpb24gPSB7IH07XG4gICAgICBjb25zdCBzb3J0Rm4gPSB0eXBlb2YgY29sdW1uLnNvcnQgPT09ICdmdW5jdGlvbicgJiYgY29sdW1uLnNvcnQ7XG4gICAgICBpZiAoc29ydC5kaXJlY3Rpb24pIHtcbiAgICAgICAgbmV3U29ydC5vcmRlciA9IHNvcnQuZGlyZWN0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHNvcnRGbikge1xuICAgICAgICBuZXdTb3J0LnNvcnRGbiA9IHNvcnRGbjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRTb3J0ID0gdGFibGUuZHMuc29ydDtcbiAgICAgIGlmIChjb2x1bW4gPT09IGN1cnJlbnRTb3J0LmNvbHVtbikge1xuICAgICAgICBjb25zdCBfc29ydCA9IGN1cnJlbnRTb3J0LnNvcnQgfHwge307XG4gICAgICAgIGlmIChuZXdTb3J0Lm9yZGVyID09PSBfc29ydC5vcmRlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGFibGUuZHMuc2V0U29ydChjb2x1bW4sIG5ld1NvcnQpO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=