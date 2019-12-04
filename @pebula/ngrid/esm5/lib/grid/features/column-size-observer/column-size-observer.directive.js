/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import ResizeObserver from 'resize-observer-polyfill';
import { Directive, ElementRef, Input } from '@angular/core';
import { PblNgridComponent } from '../../ngrid.component';
import { PblColumn, ColumnSizeInfo } from '../../columns/index';
/** @type {?} */
var PBL_NGRID_MAP = new Map();
var PblNgridGroupHeaderSizeController = /** @class */ (function () {
    function PblNgridGroupHeaderSizeController(grid) {
        var _this = this;
        this.grid = grid;
        this.columns = [];
        this.entries = new WeakMap();
        this.ro = new ResizeObserver((/**
         * @param {?} entries
         * @return {?}
         */
        function (entries) {
            requestAnimationFrame((/**
             * @return {?}
             */
            function () { return _this.onResize(entries); }));
        }));
    }
    /**
     * @param {?} table
     * @return {?}
     */
    PblNgridGroupHeaderSizeController.get = /**
     * @param {?} table
     * @return {?}
     */
    function (table) {
        /** @type {?} */
        var controller = PBL_NGRID_MAP.get(table);
        if (!controller) {
            controller = new PblNgridGroupHeaderSizeController(table);
            PBL_NGRID_MAP.set(table, controller);
        }
        return controller;
    };
    /**
     * @param {?} col
     * @return {?}
     */
    PblNgridGroupHeaderSizeController.prototype.has = /**
     * @param {?} col
     * @return {?}
     */
    function (col) {
        return this.columns.indexOf(col) !== -1;
    };
    /**
     * @param {?} column
     * @return {?}
     */
    PblNgridGroupHeaderSizeController.prototype.hasColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        return this.columns.some((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return c.column === column; }));
    };
    /**
     * @param {?} col
     * @return {?}
     */
    PblNgridGroupHeaderSizeController.prototype.add = /**
     * @param {?} col
     * @return {?}
     */
    function (col) {
        this.entries.set(col.target, col);
        this.ro.observe(col.target);
        this.columns.push(col);
    };
    /**
     * @param {?} col
     * @return {?}
     */
    PblNgridGroupHeaderSizeController.prototype.remove = /**
     * @param {?} col
     * @return {?}
     */
    function (col) {
        this.ro.unobserve(col.target);
        this.entries.delete(col.target);
        /** @type {?} */
        var idx = this.columns.indexOf(col);
        if (idx > -1) {
            this.columns.splice(idx, 1);
        }
        if (this.columns.length === 0) {
            this.ro.disconnect();
            PBL_NGRID_MAP.delete(this.grid);
        }
    };
    /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    PblNgridGroupHeaderSizeController.prototype.onResize = /**
     * @private
     * @param {?} entries
     * @return {?}
     */
    function (entries) {
        var e_1, _a, e_2, _b;
        /** @type {?} */
        var resized = [];
        try {
            for (var entries_1 = tslib_1.__values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
                var entry = entries_1_1.value;
                /** @type {?} */
                var o = this.entries.get(entry.target);
                if (o) {
                    resized.push(o);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (entries_1_1 && !entries_1_1.done && (_a = entries_1.return)) _a.call(entries_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (resized.length > 0) {
            /** @type {?} */
            var isDragging = false;
            try {
                for (var resized_1 = tslib_1.__values(resized), resized_1_1 = resized_1.next(); !resized_1_1.done; resized_1_1 = resized_1.next()) {
                    var c = resized_1_1.value;
                    isDragging = isDragging || c.column.columnDef.isDragging;
                    c.updateSize();
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (resized_1_1 && !resized_1_1.done && (_b = resized_1.return)) _b.call(resized_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (!isDragging) {
                this.grid.resizeColumns(this.columns.map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return c.column; })));
            }
        }
    };
    return PblNgridGroupHeaderSizeController;
}());
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
var PblColumnSizeObserver = /** @class */ (function (_super) {
    tslib_1.__extends(PblColumnSizeObserver, _super);
    function PblColumnSizeObserver(el, table) {
        var _this = _super.call(this, el.nativeElement) || this;
        _this.controller = PblNgridGroupHeaderSizeController.get(table);
        return _this;
    }
    Object.defineProperty(PblColumnSizeObserver.prototype, "column", {
        get: /**
         * @return {?}
         */
        function () { return this._column; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this.attachColumn(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} column
     * @return {?}
     */
    PblColumnSizeObserver.prototype.attachColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        if (!this.controller.hasColumn(column)) {
            _super.prototype.attachColumn.call(this, column);
            this.updateSize();
        }
        else {
            this._column = column;
        }
    };
    /**
     * @return {?}
     */
    PblColumnSizeObserver.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (!this.column || !this.controller.hasColumn(this.column)) {
            this.controller.add(this);
        }
    };
    /**
     * @return {?}
     */
    PblColumnSizeObserver.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.controller.remove(this);
        this.detachColumn();
    };
    PblColumnSizeObserver.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid-cell[observeSize], pbl-ngrid-header-cell[observeSize]' },] }
    ];
    /** @nocollapse */
    PblColumnSizeObserver.ctorParameters = function () { return [
        { type: ElementRef },
        { type: PblNgridComponent }
    ]; };
    PblColumnSizeObserver.propDecorators = {
        column: [{ type: Input, args: ['observeSize',] }]
    };
    return PblColumnSizeObserver;
}(ColumnSizeInfo));
export { PblColumnSizeObserver };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblColumnSizeObserver.prototype.controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL2NvbHVtbi1zaXplLW9ic2VydmVyL2NvbHVtbi1zaXplLW9ic2VydmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sY0FBYyxNQUFNLDBCQUEwQixDQUFDO0FBRXRELE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLEtBQUssRUFHTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztJQUUxRCxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQTZEO0FBRTFGO0lBS0UsMkNBQW9CLElBQTRCO1FBQWhELGlCQUtDO1FBTG1CLFNBQUksR0FBSixJQUFJLENBQXdCO1FBRnhDLFlBQU8sR0FBNEIsRUFBRSxDQUFDO1FBRzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQThCLENBQUM7UUFDekQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLGNBQWM7Ozs7UUFBRSxVQUFBLE9BQU87WUFDbkMscUJBQXFCOzs7WUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBdEIsQ0FBc0IsRUFBRSxDQUFDO1FBQ3ZELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxxQ0FBRzs7OztJQUFWLFVBQVcsS0FBNkI7O1lBQ2xDLFVBQVUsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2YsVUFBVSxHQUFHLElBQUksaUNBQWlDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsYUFBYSxD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LENBQUM7O2dCQTlCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsaUVBQWlFLEVBQUU7Ozs7Z0JBekZ4RixVQUFVO2dCQU1ILGlCQUFpQjs7O3lCQXFGdkIsS0FBSyxTQUFDLGFBQWE7O0lBNkJ0Qiw0QkFBQztDQUFBLEFBL0JELENBQzJDLGNBQWMsR0E4QnhEO1NBOUJZLHFCQUFxQjs7Ozs7O0lBSWhDLDJDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtbiwgQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi8uLi9jb2x1bW5zL2luZGV4JztcblxuY29uc3QgUEJMX05HUklEX01BUCA9IG5ldyBNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyPigpO1xuXG5jbGFzcyBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIge1xuICBwcml2YXRlIGVudHJpZXM6IFdlYWtNYXA8YW55LCBQYmxDb2x1bW5TaXplT2JzZXJ2ZXI+O1xuICBwcml2YXRlIHJvOiBSZXNpemVPYnNlcnZlcjtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHRoaXMuZW50cmllcyA9IG5ldyBXZWFrTWFwPGFueSwgUGJsQ29sdW1uU2l6ZU9ic2VydmVyPigpO1xuICAgIHRoaXMucm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoIGVudHJpZXMgPT4ge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMub25SZXNpemUoZW50cmllcykgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXQodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pOiBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIge1xuICAgIGxldCBjb250cm9sbGVyID0gUEJMX05HUklEX01BUC5nZXQodGFibGUpO1xuICAgIGlmICghY29udHJvbGxlcikge1xuICAgICAgY29udHJvbGxlciA9IG5ldyBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIodGFibGUpO1xuICAgICAgUEJMX05HUklEX01BUC5zZXQodGFibGUsIGNvbnRyb2xsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY29udHJvbGxlcjtcbiAgfVxuXG4gIGhhcyhjb2w6IFBibENvbHVtblNpemVPYnNlcnZlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMuaW5kZXhPZihjb2wpICE9PSAtMTtcbiAgfVxuXG4gIGhhc0NvbHVtbihjb2x1bW46IFBibENvbHVtbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbHVtbnMuc29tZSggYyA9PiBjLmNvbHVtbiA9PT0gY29sdW1uICk7XG4gIH1cblxuICBhZGQoY29sOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmVudHJpZXMuc2V0KGNvbC50YXJnZXQsIGNvbCk7XG4gICAgdGhpcy5yby5vYnNlcnZlKGNvbC50YXJnZXQpO1xuICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gIH1cblxuICByZW1vdmUoY29sOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJvLnVub2JzZXJ2ZShjb2wudGFyZ2V0KTtcbiAgICB0aGlzLmVudHJpZXMuZGVsZXRlKGNvbC50YXJnZXQpO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbCk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJvLmRpc2Nvbm5lY3QoKTtcbiAgICAgIFBCTF9OR1JJRF9NQVAuZGVsZXRlKHRoaXMuZ3JpZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBvblJlc2l6ZShlbnRyaWVzOiBSZXNpemVPYnNlcnZlckVudHJ5W10pOiB2b2lkIHtcbiAgICBjb25zdCByZXNpemVkOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXJbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgZW50cmllcykge1xuICAgICAgY29uc3QgbyA9IHRoaXMuZW50cmllcy5nZXQoZW50cnkudGFyZ2V0KTtcbiAgICAgIGlmIChvKSB7XG4gICAgICAgIHJlc2l6ZWQucHVzaChvKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJlc2l6ZWQubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgIGZvciAoY29uc3QgYyBvZiByZXNpemVkKSB7XG4gICAgICAgIGlzRHJhZ2dpbmcgPSBpc0RyYWdnaW5nIHx8IGMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nO1xuICAgICAgICBjLnVwZGF0ZVNpemUoKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXNEcmFnZ2luZykge1xuICAgICAgICB0aGlzLmdyaWQucmVzaXplQ29sdW1ucyh0aGlzLmNvbHVtbnMubWFwKCBjID0+IGMuY29sdW1uICkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEEgZGlyZWN0aXZlIHRoYXQgbGlzdGVuIHRvIHNpemUgY2hhbmdlcyBmcm9tIHRoZSBlbGVtZW50IG9mIGEgY2VsbCwgdXNpbmcgUmVzaXplT2JzZXJ2ZXIuXG4gKiBXaGVuIGEgY2hhbmdlIG9jY3VycyBpdCB3aWxsIGVtaXQgaXQgdG8gdGhlIFBibFRhYmxlIGhvc3Qgb2YgdGhpcyBkaXJlY3RpdmUsIGFsb25nIHdpdGggYWxsIG90aGVyIG9ic2VydmVkIGNvbHVtbnMgZm9yIHRoZSB0YWJsZS5cbiAqXG4gKiBJbiBvdGhlciB3b3JkcywgYWxsIGNvbHVtbnMgb2YgYSB0YWJsZSwgbWFya2VkIHdpdGggYFBibENvbHVtblNpemVPYnNlcnZlcmAsIHdpbGwgYmUgc2VudC5cbiAqXG4gKiBCZWNhdXNlIG1vc3Qgb2YgdGhlIHNpemUgY2hhbmdlcyBjb25jZXJuIGFsbCBjb2x1bW5zIG9mIGEgcm93IGFuZCBiZWNhdXNlIFJlc2l6ZU9ic2VydmVyIHdpbGwgZW1pdCB0aGVtIGFsbCBpbiB0aGUgc2FtZSBldmVudFxuICogYW4gZW50aXJlIHJvdyBzaG91bGQgZW1pdCBvbmNlLCB3aXRoIGFsbCBjb2x1bW5zLlxuICovXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWQtY2VsbFtvYnNlcnZlU2l6ZV0sIHBibC1uZ3JpZC1oZWFkZXItY2VsbFtvYnNlcnZlU2l6ZV0nIH0pXG5leHBvcnQgY2xhc3MgUGJsQ29sdW1uU2l6ZU9ic2VydmVyIGV4dGVuZHMgQ29sdW1uU2l6ZUluZm8gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ29ic2VydmVTaXplJykgZ2V0IGNvbHVtbigpOiBQYmxDb2x1bW4geyByZXR1cm4gdGhpcy5fY29sdW1uOyB9XG4gIHNldCBjb2x1bW4odmFsdWU6IFBibENvbHVtbikgeyB0aGlzLmF0dGFjaENvbHVtbih2YWx1ZSk7IH1cblxuICBwcml2YXRlIGNvbnRyb2xsZXI6IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlcjtcblxuICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudFJlZiwgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICBzdXBlcihlbC5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmNvbnRyb2xsZXIgPSBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIuZ2V0KHRhYmxlKTtcbiAgfVxuXG4gIGF0dGFjaENvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb250cm9sbGVyLmhhc0NvbHVtbihjb2x1bW4pKSB7XG4gICAgICBzdXBlci5hdHRhY2hDb2x1bW4oY29sdW1uKTtcbiAgICAgIHRoaXMudXBkYXRlU2l6ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb2x1bW4gfHwgIXRoaXMuY29udHJvbGxlci5oYXNDb2x1bW4odGhpcy5jb2x1bW4pKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXIuYWRkKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY29udHJvbGxlci5yZW1vdmUodGhpcyk7XG4gICAgdGhpcy5kZXRhY2hDb2x1bW4oKTtcbiAgfVxufVxuIl19