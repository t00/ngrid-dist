/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import ResizeObserver from 'resize-observer-polyfill';
import { Directive, ElementRef, Input } from '@angular/core';
import { PblNgridComponent } from '../../table.component';
import { PblColumn, ColumnSizeInfo } from '../../columns/index';
/** @type {?} */
const PBL_NGRID_MAP = new Map();
class PblNgridGroupHeaderSizeController {
    /**
     * @param {?} table
     */
    constructor(table) {
        this.table = table;
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
            PBL_NGRID_MAP.delete(this.table);
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
                this.table.resizeColumns(this.columns.map((/**
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
    PblNgridGroupHeaderSizeController.prototype.table;
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
     * @return {?}
     */
    ngAfterViewInit() {
        this.controller.add(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy9jb2x1bW4tc2l6ZS1vYnNlcnZlci9jb2x1bW4tc2l6ZS1vYnNlcnZlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztNQUUxRCxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQTZEO0FBRTFGLE1BQU0saUNBQWlDOzs7O0lBS3JDLFlBQW9CLEtBQTZCO1FBQTdCLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBRnpDLFlBQU8sR0FBNEIsRUFBRSxDQUFDO1FBRzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQThCLENBQUM7UUFDekQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLGNBQWM7Ozs7UUFBRSxPQUFPLENBQUMsRUFBRTtZQUN0QyxxQkFBcUI7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUN2RCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUE2Qjs7WUFDbEMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixVQUFVLEdBQUcsSUFBSSxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxhQUFh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LEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7WUFuQkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGlFQUFpRSxFQUFFOzs7O1lBakZ4RixVQUFVO1lBTUgsaUJBQWlCOzs7cUJBNkV2QixLQUFLLFNBQUMsYUFBYTs7Ozs7OztJQUdwQiwyQ0FBc0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVzaXplT2JzZXJ2ZXIgZnJvbSAncmVzaXplLW9ic2VydmVyLXBvbHlmaWxsJztcblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDb2x1bW4sIENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vLi4vY29sdW1ucy9pbmRleCc7XG5cbmNvbnN0IFBCTF9OR1JJRF9NQVAgPSBuZXcgTWFwPFBibE5ncmlkQ29tcG9uZW50PGFueT4sIFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlcj4oKTtcblxuY2xhc3MgUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyIHtcbiAgcHJpdmF0ZSBlbnRyaWVzOiBXZWFrTWFwPGFueSwgUGJsQ29sdW1uU2l6ZU9ic2VydmVyPjtcbiAgcHJpdmF0ZSBybzogUmVzaXplT2JzZXJ2ZXI7XG4gIHByaXZhdGUgY29sdW1uczogUGJsQ29sdW1uU2l6ZU9ic2VydmVyW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSB7XG4gICAgdGhpcy5lbnRyaWVzID0gbmV3IFdlYWtNYXA8YW55LCBQYmxDb2x1bW5TaXplT2JzZXJ2ZXI+KCk7XG4gICAgdGhpcy5ybyA9IG5ldyBSZXNpemVPYnNlcnZlciggZW50cmllcyA9PiB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5vblJlc2l6ZShlbnRyaWVzKSApO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldCh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55Pik6IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlciB7XG4gICAgbGV0IGNvbnRyb2xsZXIgPSBQQkxfTkdSSURfTUFQLmdldCh0YWJsZSk7XG4gICAgaWYgKCFjb250cm9sbGVyKSB7XG4gICAgICBjb250cm9sbGVyID0gbmV3IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlcih0YWJsZSk7XG4gICAgICBQQkxfTkdSSURfTUFQLnNldCh0YWJsZSwgY29udHJvbGxlcik7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sbGVyO1xuICB9XG5cbiAgYWRkKGNvbDogUGJsQ29sdW1uU2l6ZU9ic2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5lbnRyaWVzLnNldChjb2wudGFyZ2V0LCBjb2wpO1xuICAgIHRoaXMucm8ub2JzZXJ2ZShjb2wudGFyZ2V0KTtcbiAgICB0aGlzLmNvbHVtbnMucHVzaChjb2wpO1xuICB9XG5cbiAgcmVtb3ZlKGNvbDogUGJsQ29sdW1uU2l6ZU9ic2VydmVyKTogdm9pZCB7XG4gICAgdGhpcy5yby51bm9ic2VydmUoY29sLnRhcmdldCk7XG4gICAgdGhpcy5lbnRyaWVzLmRlbGV0ZShjb2wudGFyZ2V0KTtcbiAgICBjb25zdCBpZHggPSB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2wpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5jb2x1bW5zLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb2x1bW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5yby5kaXNjb25uZWN0KCk7XG4gICAgICBQQkxfTkdSSURfTUFQLmRlbGV0ZSh0aGlzLnRhYmxlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9uUmVzaXplKGVudHJpZXM6IFJlc2l6ZU9ic2VydmVyRW50cnlbXSk6IHZvaWQge1xuICAgIGNvbnN0IHJlc2l6ZWQ6IFBibENvbHVtblNpemVPYnNlcnZlcltdID0gW107XG4gICAgZm9yIChjb25zdCBlbnRyeSBvZiBlbnRyaWVzKSB7XG4gICAgICBjb25zdCBvID0gdGhpcy5lbnRyaWVzLmdldChlbnRyeS50YXJnZXQpO1xuICAgICAgaWYgKG8pIHtcbiAgICAgICAgcmVzaXplZC5wdXNoKG8pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmVzaXplZC5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgZm9yIChjb25zdCBjIG9mIHJlc2l6ZWQpIHtcbiAgICAgICAgaXNEcmFnZ2luZyA9IGlzRHJhZ2dpbmcgfHwgYy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmc7XG4gICAgICAgIGMudXBkYXRlU2l6ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0RyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMudGFibGUucmVzaXplQ29sdW1ucyh0aGlzLmNvbHVtbnMubWFwKCBjID0+IGMuY29sdW1uICkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbGlzdGVuIHRvIHNpemUgY2hhbmdlcyBmcm9tIHRoZSBlbGVtZW50IG9mIGEgY2VsbCwgdXNpbmcgUmVzaXplT2JzZXJ2ZXIuXG4gKiBXaGVuIGEgY2hhbmdlIG9jY3VycyBpdCB3aWxsIGVtaXQgaXQgdG8gdGhlIFBibFRhYmxlIGhvc3Qgb2YgdGhpcyBkaXJlY3RpdmUsIGFsb25nIHdpdGggYWxsIG90aGVyIG9ic2VydmVkIGNvbHVtbnMgZm9yIHRoZSB0YWJsZS5cbiAqXG4gKiBJbiBvdGhlciB3b3JkcywgYWxsIGNvbHVtbnMgb2YgYSB0YWJsZSwgbWFya2VkIHdpdGggYFBibENvbHVtblNpemVPYnNlcnZlcmAsIHdpbGwgYmUgc2VudC5cbiAqXG4gKiBCZWNhdXNlIG1vc3Qgb2YgdGhlIHNpemUgY2hhbmdlcyBjb25jZXJuIGFsbCBjb2x1bW5zIG9mIGEgcm93IGFuZCBiZWNhdXNlIFJlc2l6ZU9ic2VydmVyIHdpbGwgZW1pdCB0aGVtIGFsbCBpbiB0aGUgc2FtZSBldmVudFxuICogYW4gZW50aXJlIHJvdyBzaG91bGQgZW1pdCBvbmNlLCB3aXRoIGFsbCBjb2x1bW5zLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2VsbFtvYnNlcnZlU2l6ZV0sIHBibC1uZ3JpZC1oZWFkZXItY2VsbFtvYnNlcnZlU2l6ZV0nIH0pXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uU2l6ZU9ic2VydmVyIGV4dGVuZHMgQ29sdW1uU2l6ZUluZm8gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ29ic2VydmVTaXplJykgZ2V0IGNvbHVtbigpOiBQYmxDb2x1bW4geyByZXR1cm4gdGhpcy5fY29sdW1uOyB9XG4gIHNldCBjb2x1bW4odmFsdWU6IFBibENvbHVtbikgeyB0aGlzLmF0dGFjaENvbHVtbih2YWx1ZSk7IH1cblxuICBwcml2YXRlIGNvbnRyb2xsZXI6IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIuZ2V0KHRhYmxlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIuYWRkKHRoaXMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jb250cm9sbGVyLnJlbW92ZSh0aGlzKTtcbiAgICB0aGlzLmRldGFjaENvbHVtbigpO1xuICB9XG59XG4iXX0=