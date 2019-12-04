/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import ResizeObserver from 'resize-observer-polyfill';
import { Directive, ElementRef, Input } from '@angular/core';
import { PblNgridComponent } from '../../ngrid.component';
import { PblColumn, ColumnSizeInfo } from '../../columns/index';
/** @type {?} */
const PBL_NGRID_MAP = new Map();
class PblNgridGroupHeaderSizeController {
    /**
     * @param {?} grid
     */
    constructor(grid) {
        this.grid = grid;
        this.columns = [];
        this.entries = new WeakMap();
        this.ro = new ResizeObserver((/**
         * @param {?} entries
         * @return {?}
         */
        entries => {
            requestAnimationFrame((/**
             * @return {?}
             */
            () => this.onResize(entries)));
        }));
    }
    /**
     * @param {?} table
     * @return {?}
     */
    static get(table) {
        /** @type {?} */
        let controller = PBL_NGRID_MAP.get(table);
        if (!controller) {
            controller = new PblNgridGroupHeaderSizeController(table);
            PBL_NGRID_MAP.set(table, controller);
        }
        return controller;
    }
    /**
     * @param {?} col
     * @return {?}
     */
    has(col) {
        return this.columns.indexOf(col) !== -1;
    }
    /**
     * @param {?} column
     * @return {?}
     */
    hasColumn(column) {
        return this.columns.some((/**
         * @param {?} c
         * @return {?}
         */
        c => c.column === column));
    }
    /**
     * @param {?} col
     * @return {?}
     */
    add(col) {
        this.entries.set(col.target, col);
        this.ro.observe(col.target);
        this.columns.push(col);
    }
    /**
     * @param {?} col
     * @return {?}
     */
    remove(col) {
        this.ro.unobserve(col.target);
        this.entries.delete(col.target);
        /** @type {?} */
        const idx = this.columns.indexOf(col);
        if (idx > -1) {
            this.columns.splice(idx, 1);
        }
        if (this.columns.length === 0) {
            this.ro.disconnect();
            PBL_NGRID_MAP.delete(this.grid);
        }
    }
    /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    onResize(entries) {
        /** @type {?} */
        const resized = [];
        for (const entry of entries) {
            /** @type {?} */
            const o = this.entries.get(entry.target);
            if (o) {
                resized.push(o);
            }
        }
        if (resized.length > 0) {
            /** @type {?} */
            let isDragging = false;
            for (const c of resized) {
                isDragging = isDragging || c.column.columnDef.isDragging;
                c.updateSize();
            }
            if (!isDragging) {
                this.grid.resizeColumns(this.columns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => c.column)));
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.entries;
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.ro;
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.columns;
    /**
     * @type {?}
     * @private
     */
    PblNgridGroupHeaderSizeController.prototype.grid;
}
/**
 * A directive that listen to size changes from the element of a cell, using ResizeObserver.
 * When a change occurs it will emit it to the PblTable host of this directive, along with all other observed columns for the table.
 *
 * In other words, all columns of a table, marked with `PblColumnSizeObserver`, will be sent.
 *
 * Because most of the size changes concern all columns of a row and because ResizeObserver will emit them all in the same event
 * an entire row should emit once, with all columns.
 */
export class PblColumnSizeObserver extends ColumnSizeInfo {
    /**
     * @param {?} el
     * @param {?} table
     */
    constructor(el, table) {
        super(el.nativeElement);
        this.controller = PblNgridGroupHeaderSizeController.get(table);
    }
    /**
     * @return {?}
     */
    get column() { return this._column; }
    /**
     * @param {?} value
     * @return {?}
     */
    set column(value) { this.attachColumn(value); }
    /**
     * @param {?} column
     * @return {?}
     */
    attachColumn(column) {
        if (!this.controller.hasColumn(column)) {
            super.attachColumn(column);
            this.updateSize();
        }
        else {
            this._column = column;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (!this.column || !this.controller.hasColumn(this.column)) {
            this.controller.add(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.controller.remove(this);
        this.detachColumn();
    }
}
PblColumnSizeObserver.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid-cell[observeSize], pbl-ngrid-header-cell[observeSize]' },] }
];
/** @nocollapse */
PblColumnSizeObserver.ctorParameters = () => [
    { type: ElementRef },
    { type: PblNgridComponent }
];
PblColumnSizeObserver.propDecorators = {
    column: [{ type: Input, args: ['observeSize',] }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnSizeObserver.prototype.controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL2NvbHVtbi1zaXplLW9ic2VydmVyL2NvbHVtbi1zaXplLW9ic2VydmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxjQUFjLE1BQU0sMEJBQTBCLENBQUM7QUFFdEQsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdOLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7O01BRTFELGFBQWEsR0FBRyxJQUFJLEdBQUcsRUFBNkQ7QUFFMUYsTUFBTSxpQ0FBaUM7Ozs7SUFLckMsWUFBb0IsSUFBNEI7UUFBNUIsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFGeEMsWUFBTyxHQUE0QixFQUFFLENBQUM7UUFHNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBOEIsQ0FBQztRQUN6RCxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksY0FBYzs7OztRQUFFLE9BQU8sQ0FBQyxFQUFFO1lBQ3RDLHFCQUFxQjs7O1lBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ3ZELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQTZCOztZQUNsQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLFVBQVUsR0FBRyxJQUFJLGlDQUFpQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELGFBQWEs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QUFDLFVBQVUsR0FBRyxpQ0FBaUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7OztJQVJELElBQTBCLE1BQU0sS0FBZ0IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDdEUsSUFBSSxNQUFNLENBQUMsS0FBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFTMUQsWUFBWSxDQUFDLE1BQWlCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7U0FDdkI7SUFDSCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQzs7O1lBOUJGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxpRUFBaUUsRUFBRTs7OztZQXpGeEYsVUFBVTtZQU1ILGlCQUFpQjs7O3FCQXFGdkIsS0FBSyxTQUFDLGFBQWE7Ozs7Ozs7SUFHcEIsMkNBQXNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlc2l6ZU9ic2VydmVyIGZyb20gJ3Jlc2l6ZS1vYnNlcnZlci1wb2x5ZmlsbCc7XG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ29sdW1uLCBDb2x1bW5TaXplSW5mbyB9IGZyb20gJy4uLy4uL2NvbHVtbnMvaW5kZXgnO1xuXG5jb25zdCBQQkxfTkdSSURfTUFQID0gbmV3IE1hcDxQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXI+KCk7XG5cbmNsYXNzIFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlciB7XG4gIHByaXZhdGUgZW50cmllczogV2Vha01hcDxhbnksIFBibENvbHVtblNpemVPYnNlcnZlcj47XG4gIHByaXZhdGUgcm86IFJlc2l6ZU9ic2VydmVyO1xuICBwcml2YXRlIGNvbHVtbnM6IFBibENvbHVtblNpemVPYnNlcnZlcltdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IFdlYWtNYXA8YW55LCBQYmxDb2x1bW5TaXplT2JzZXJ2ZXI+KCk7XG4gICAgdGhpcy5ybyA9IG5ldyBSZXNpemVPYnNlcnZlciggZW50cmllcyA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5vblJlc2l6ZShlbnRyaWVzKSApO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55Pik6IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlciB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBQQkxfTkdSSURfTUFQLmdldCh0YWJsZSk7XG4gICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICBjb250cm9sbGVyID0gbmV3IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlcih0YWJsZSk7XG4gICAgICBQQkxfTkdSSURfTUFQLnNldCh0YWJsZSwgY29udHJvbGxlcik7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG5cbiAgaGFzKGNvbDogUGJsQ29sdW1uU2l6ZU9ic2VydmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbCkgIT09IC0xO1xuICB9XG5cbiAgaGFzQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sdW1ucy5zb21lKCBjID0+IGMuY29sdW1uID09PSBjb2x1bW4gKTtcbiAgfVxuXG4gIGFkZChjb2w6IFBibENvbHVtblNpemVPYnNlcnZlcik6IHZvaWQge1xuICAgIHRoaXMuZW50cmllcy5zZXQoY29sLnRhcmdldCwgY29sKTtcbiAgICB0aGlzLnJvLm9ic2VydmUoY29sLnRhcmdldCk7XG4gICAgdGhpcy5jb2x1bW5zLnB1c2goY29sKTtcbiAgfVxuXG4gIHJlbW92ZShjb2w6IFBibENvbHVtblNpemVPYnNlcnZlcik6IHZvaWQge1xuICAgIHRoaXMucm8udW5vYnNlcnZlKGNvbC50YXJnZXQpO1xuICAgIHRoaXMuZW50cmllcy5kZWxldGUoY29sLnRhcmdldCk7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5jb2x1bW5zLmluZGV4T2YoY29sKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRoaXMuY29sdW1ucy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29sdW1ucy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMucm8uZGlzY29ubmVjdCgpO1xuICAgICAgUEJMX05HUklEX01BUC5kZWxldGUodGhpcy5ncmlkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uUmVzaXplKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IHJlc2l6ZWQ6IFBibENvbHVtblNpemVPYnNlcnZlcltdID0gW107XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBjb25zdCBvID0gdGhpcy5lbnRyaWVzLmdldChlbnRyeS50YXJnZXQpO1xuICAgICAgaWYgKG8pIHtcbiAgICAgICAgcmVzaXplZC5wdXNoKG8pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVzaXplZC5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjIG9mIHJlc2l6ZWQpIHtcbiAgICAgICAgaXNEcmFnZ2luZyA9IGlzRHJhZ2dpbmcgfHwgYy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmc7XG4gICAgICAgIGMudXBkYXRlU2l6ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0RyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZ3JpZC5yZXNpemVDb2x1bW5zKHRoaXMuY29sdW1ucy5tYXAoIGMgPT4gYy5jb2x1bW4gKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBsaXN0ZW4gdG8gc2l6ZSBjaGFuZ2VzIGZyb20gdGhlIGVsZW1lbnQgb2YgYSBjZWxsLCB1c2luZyBSZXNpemVPYnNlcnZlci5cbiAqIFdoZW4gYSBjaGFuZ2Ugb2NjdXJzIGl0IHdpbGwgZW1pdCBpdCB0byB0aGUgUGJsVGFibGUgaG9zdCBvZiB0aGlzIGRpcmVjdGl2ZSwgYWxvbmcgd2l0aCBhbGwgb3RoZXIgb2JzZXJ2ZWQgY29sdW1ucyBmb3IgdGhlIHRhYmxlLlxuICpcbiAqIEluIG90aGVyIHdvcmRzLCBhbGwgY29sdW1ucyBvZiBhIHRhYmxlLCBtYXJrZWQgd2l0aCBgUGJsQ29sdW1uU2l6ZU9ic2VydmVyYCwgd2lsbCBiZSBzZW50LlxuICpcbiAqIEJlY2F1c2UgbW9zdCBvZiB0aGUgc2l6ZSBjaGFuZ2VzIGNvbmNlcm4gYWxsIGNvbHVtbnMgb2YgYSByb3cgYW5kIGJlY2F1c2UgUmVzaXplT2JzZXJ2ZXIgd2lsbCBlbWl0IHRoZW0gYWxsIGluIHRoZSBzYW1lIGV2ZW50XG4gKiBhbiBlbnRpcmUgcm93IHNob3VsZCBlbWl0IG9uY2UsIHdpdGggYWxsIGNvbHVtbnMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jZWxsW29ic2VydmVTaXplXSwgcGJsLW5ncmlkLWhlYWRlci1jZWxsW29ic2VydmVTaXplXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIgZXh0ZW5kcyBDb2x1bW5TaXplSW5mbyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnb2JzZXJ2ZVNpemUnKSBnZXQgY29sdW1uKCk6IFBibENvbHVtbiB7IHJldHVybiB0aGlzLl9jb2x1bW47IH1cbiAgc2V0IGNvbHVtbih2YWx1ZTogUGJsQ29sdW1uKSB7IHRoaXMuYXR0YWNoQ29sdW1uKHZhbHVlKTsgfVxuXG4gIHByaXZhdGUgY29udHJvbGxlcjogUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlci5nZXQodGFibGUpO1xuICB9XG5cbiAgYXR0YWNoQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbnRyb2xsZXIuaGFzQ29sdW1uKGNvbHVtbikpIHtcbiAgICAgIHN1cGVyLmF0dGFjaENvbHVtbihjb2x1bW4pO1xuICAgICAgdGhpcy51cGRhdGVTaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNvbHVtbiB8fCAhdGhpcy5jb250cm9sbGVyLmhhc0NvbHVtbih0aGlzLmNvbHVtbikpIHtcbiAgICAgIHRoaXMuY29udHJvbGxlci5hZGQodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9sbGVyLnJlbW92ZSh0aGlzKTtcbiAgICB0aGlzLmRldGFjaENvbHVtbigpO1xuICB9XG59XG4iXX0=