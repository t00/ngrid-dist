/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/column-size-observer/column-size-observer.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL2NvbHVtbi1zaXplLW9ic2VydmVyL2NvbHVtbi1zaXplLW9ic2VydmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztNQUUxRCxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQTZEO0FBRTFGLE1BQU0saUNBQWlDOzs7O0lBS3JDLFlBQW9CLElBQTRCO1FBQTVCLFNBQUksR0FBSixJQUFJLENBQXdCO1FBRnhDLFlBQU8sR0FBNEIsRUFBRSxDQUFDO1FBRzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQThCLENBQUM7UUFDekQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLGNBQWM7Ozs7UUFBRSxPQUFPLENBQUMsRUFBRTtZQUN0QyxxQkFBcUI7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUN2RCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUE2Qjs7WUFDbEMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixVQUFVLEdBQUcsSUFBSSxpQ0FBaUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRCxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztTQUN0QztRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBRUQsR0FBRyxDQUFDLEdBQTBCO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBaUI7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7Ozs7UUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCxHQUFHLENBQUMsR0FBMEI7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBMEI7UUFDL0IsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Y0FDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNyQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxRQUFRLENBQUMsT0FBOEI7O2NBQ3ZDLE9BQU8sR0FBNEIsRUFBRTtRQUMzQyxLQUFLLE1BQU0sS0FBSyxJQUFJLE9BQU8sRUFBRTs7a0JBQ3JCLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxFQUFFO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakI7U0FDRjtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O2dCQUNsQixVQUFVLEdBQUcsS0FBSztZQUN0QixLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sRUFBRTtnQkFDdkIsVUFBVSxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNoQjtZQUNELElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O2dCQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDNUQ7U0FDRjtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBbEVDLG9EQUFxRDs7Ozs7SUFDckQsK0NBQTJCOzs7OztJQUMzQixvREFBOEM7Ozs7O0lBRWxDLGlEQUFvQzs7Ozs7Ozs7Ozs7QUEwRWxELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxjQUFjOzs7OztJQU12RCxZQUFZLEVBQWMsRUFBRSxLQUE2QjtRQUN2RCxLQUFLLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsaUNBQWlDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pFLENBQUM7Ozs7SUFSRCxJQUEwQixNQUFNLEtBQWdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3RFLElBQUksTUFBTSxDQUFDLEtBQWdCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBUzFELFlBQVksQ0FBQyxNQUFpQjtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbkI7YUFBTTtZQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7OztZQTlCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsaUVBQWlFLEVBQUU7Ozs7WUF6RnhGLFVBQVU7WUFNSCxpQkFBaUI7OztxQkFxRnZCLEtBQUssU0FBQyxhQUFhOzs7Ozs7O0lBR3BCLDJDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtbiwgQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi8uLi9jb2x1bW5zL2luZGV4JztcblxuY29uc3QgUEJMX05HUklEX01BUCA9IG5ldyBNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyPigpO1xuXG5jbGFzcyBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIge1xuICBwcml2YXRlIGVudHJpZXM6IFdlYWtNYXA8YW55LCBQYmxDb2x1bW5TaXplT2JzZXJ2ZXI+O1xuICBwcml2YXRlIHJvOiBSZXNpemVPYnNlcnZlcjtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHRoaXMuZW50cmllcyA9IG5ldyBXZWFrTWFwPGFueSwgUGJsQ29sdW1uU2l6ZU9ic2VydmVyPigpO1xuICAgIHRoaXMucm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoIGVudHJpZXMgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMub25SZXNpemUoZW50cmllcykgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pOiBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIge1xuICAgIGxldCBjb250cm9sbGVyID0gUEJMX05HUklEX01BUC5nZXQodGFibGUpO1xuICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlciA9IG5ldyBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIodGFibGUpO1xuICAgICAgUEJMX05HUklEX01BUC5zZXQodGFibGUsIGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgfVxuXG4gIGhhcyhjb2w6IFBibENvbHVtblNpemVPYnNlcnZlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2wpICE9PSAtMTtcbiAgfVxuXG4gIGhhc0NvbHVtbihjb2x1bW46IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMuc29tZSggYyA9PiBjLmNvbHVtbiA9PT0gY29sdW1uICk7XG4gIH1cblxuICBhZGQoY29sOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmVudHJpZXMuc2V0KGNvbC50YXJnZXQsIGNvbCk7XG4gICAgdGhpcy5yby5vYnNlcnZlKGNvbC50YXJnZXQpO1xuICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gIH1cblxuICByZW1vdmUoY29sOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJvLnVub2JzZXJ2ZShjb2wudGFyZ2V0KTtcbiAgICB0aGlzLmVudHJpZXMuZGVsZXRlKGNvbC50YXJnZXQpO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbCk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJvLmRpc2Nvbm5lY3QoKTtcbiAgICAgIFBCTF9OR1JJRF9NQVAuZGVsZXRlKHRoaXMuZ3JpZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblJlc2l6ZShlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICBjb25zdCByZXNpemVkOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXJbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgY29uc3QgbyA9IHRoaXMuZW50cmllcy5nZXQoZW50cnkudGFyZ2V0KTtcbiAgICAgIGlmIChvKSB7XG4gICAgICAgIHJlc2l6ZWQucHVzaChvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlc2l6ZWQubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgYyBvZiByZXNpemVkKSB7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSBpc0RyYWdnaW5nIHx8IGMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nO1xuICAgICAgICBjLnVwZGF0ZVNpemUoKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXNEcmFnZ2luZykge1xuICAgICAgICB0aGlzLmdyaWQucmVzaXplQ29sdW1ucyh0aGlzLmNvbHVtbnMubWFwKCBjID0+IGMuY29sdW1uICkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbGlzdGVuIHRvIHNpemUgY2hhbmdlcyBmcm9tIHRoZSBlbGVtZW50IG9mIGEgY2VsbCwgdXNpbmcgUmVzaXplT2JzZXJ2ZXIuXG4gKiBXaGVuIGEgY2hhbmdlIG9jY3VycyBpdCB3aWxsIGVtaXQgaXQgdG8gdGhlIFBibFRhYmxlIGhvc3Qgb2YgdGhpcyBkaXJlY3RpdmUsIGFsb25nIHdpdGggYWxsIG90aGVyIG9ic2VydmVkIGNvbHVtbnMgZm9yIHRoZSB0YWJsZS5cbiAqXG4gKiBJbiBvdGhlciB3b3JkcywgYWxsIGNvbHVtbnMgb2YgYSB0YWJsZSwgbWFya2VkIHdpdGggYFBibENvbHVtblNpemVPYnNlcnZlcmAsIHdpbGwgYmUgc2VudC5cbiAqXG4gKiBCZWNhdXNlIG1vc3Qgb2YgdGhlIHNpemUgY2hhbmdlcyBjb25jZXJuIGFsbCBjb2x1bW5zIG9mIGEgcm93IGFuZCBiZWNhdXNlIFJlc2l6ZU9ic2VydmVyIHdpbGwgZW1pdCB0aGVtIGFsbCBpbiB0aGUgc2FtZSBldmVudFxuICogYW4gZW50aXJlIHJvdyBzaG91bGQgZW1pdCBvbmNlLCB3aXRoIGFsbCBjb2x1bW5zLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2VsbFtvYnNlcnZlU2l6ZV0sIHBibC1uZ3JpZC1oZWFkZXItY2VsbFtvYnNlcnZlU2l6ZV0nIH0pXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uU2l6ZU9ic2VydmVyIGV4dGVuZHMgQ29sdW1uU2l6ZUluZm8gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ29ic2VydmVTaXplJykgZ2V0IGNvbHVtbigpOiBQYmxDb2x1bW4geyByZXR1cm4gdGhpcy5fY29sdW1uOyB9XG4gIHNldCBjb2x1bW4odmFsdWU6IFBibENvbHVtbikgeyB0aGlzLmF0dGFjaENvbHVtbih2YWx1ZSk7IH1cblxuICBwcml2YXRlIGNvbnRyb2xsZXI6IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIuZ2V0KHRhYmxlKTtcbiAgfVxuXG4gIGF0dGFjaENvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250cm9sbGVyLmhhc0NvbHVtbihjb2x1bW4pKSB7XG4gICAgICBzdXBlci5hdHRhY2hDb2x1bW4oY29sdW1uKTtcbiAgICAgIHRoaXMudXBkYXRlU2l6ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb2x1bW4gfHwgIXRoaXMuY29udHJvbGxlci5oYXNDb2x1bW4odGhpcy5jb2x1bW4pKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIuYWRkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29udHJvbGxlci5yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5kZXRhY2hDb2x1bW4oKTtcbiAgfVxufVxuIl19