/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import ResizeObserver from 'resize-observer-polyfill';
import { Directive, ElementRef, Input } from '@angular/core';
import { PblNgridComponent } from '../../table.component';
import { PblColumn, ColumnSizeInfo } from '../../columns/index';
/** @type {?} */
var PBL_NGRID_MAP = new Map();
var PblNgridGroupHeaderSizeController = /** @class */ (function () {
    function PblNgridGroupHeaderSizeController(table) {
        var _this = this;
        this.table = table;
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
            PBL_NGRID_MAP.delete(this.table);
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
                this.table.resizeColumns(this.columns.map((/**
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
     * @return {?}
     */
    PblColumnSizeObserver.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.controller.add(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtb2JzZXJ2ZXIuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy9jb2x1bW4tc2l6ZS1vYnNlcnZlci9jb2x1bW4tc2l6ZS1vYnNlcnZlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUV0RCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR04sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFFMUQsYUFBYSxHQUFHLElBQUksR0FBRyxFQUE2RDtBQUUxRjtJQUtFLDJDQUFvQixLQUE2QjtRQUFqRCxpQkFLQztRQUxtQixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUZ6QyxZQUFPLEdBQTRCLEVBQUUsQ0FBQztRQUc1QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxFQUE4QixDQUFDO1FBQ3pELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxjQUFjOzs7O1FBQUUsVUFBQSxPQUFPO1lBQ25DLHFCQUFxQjs7O1lBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQXRCLENBQXNCLEVBQUUsQ0FBQztRQUN2RCxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRU0scUNBQUc7Ozs7SUFBVixVQUFXLEtBQTZCOztZQUNsQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNmLFVBQVUsR0FBRyxJQUFJLGlDQUFpQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFELGFBQWEs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T0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDdEUsVUFBVyxLQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEWTs7OztJQVV0RSwrQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7O2dCQW5CRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsaUVBQWlFLEVBQUU7Ozs7Z0JBakZ4RixVQUFVO2dCQU1ILGlCQUFpQjs7O3lCQTZFdkIsS0FBSyxTQUFDLGFBQWE7O0lBa0J0Qiw0QkFBQztDQUFBLEFBcEJELENBQzJDLGNBQWMsR0FtQnhEO1NBbkJZLHFCQUFxQjs7Ozs7O0lBSWhDLDJDQUFzRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZXNpemVPYnNlcnZlciBmcm9tICdyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGwnO1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENvbHVtbiwgQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi8uLi9jb2x1bW5zL2luZGV4JztcblxuY29uc3QgUEJMX05HUklEX01BUCA9IG5ldyBNYXA8UGJsTmdyaWRDb21wb25lbnQ8YW55PiwgUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyPigpO1xuXG5jbGFzcyBQYmxOZ3JpZEdyb3VwSGVhZGVyU2l6ZUNvbnRyb2xsZXIge1xuICBwcml2YXRlIGVudHJpZXM6IFdlYWtNYXA8YW55LCBQYmxDb2x1bW5TaXplT2JzZXJ2ZXI+O1xuICBwcml2YXRlIHJvOiBSZXNpemVPYnNlcnZlcjtcbiAgcHJpdmF0ZSBjb2x1bW5zOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pIHtcbiAgICB0aGlzLmVudHJpZXMgPSBuZXcgV2Vha01hcDxhbnksIFBibENvbHVtblNpemVPYnNlcnZlcj4oKTtcbiAgICB0aGlzLnJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKCBlbnRyaWVzID0+IHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm9uUmVzaXplKGVudHJpZXMpICk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KTogUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyIHtcbiAgICBsZXQgY29udHJvbGxlciA9IFBCTF9OR1JJRF9NQVAuZ2V0KHRhYmxlKTtcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnRyb2xsZXIgPSBuZXcgUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyKHRhYmxlKTtcbiAgICAgIFBCTF9OR1JJRF9NQVAuc2V0KHRhYmxlLCBjb250cm9sbGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRyb2xsZXI7XG4gIH1cblxuICBhZGQoY29sOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmVudHJpZXMuc2V0KGNvbC50YXJnZXQsIGNvbCk7XG4gICAgdGhpcy5yby5vYnNlcnZlKGNvbC50YXJnZXQpO1xuICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbCk7XG4gIH1cblxuICByZW1vdmUoY29sOiBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIpOiB2b2lkIHtcbiAgICB0aGlzLnJvLnVub2JzZXJ2ZShjb2wudGFyZ2V0KTtcbiAgICB0aGlzLmVudHJpZXMuZGVsZXRlKGNvbC50YXJnZXQpO1xuICAgIGNvbnN0IGlkeCA9IHRoaXMuY29sdW1ucy5pbmRleE9mKGNvbCk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICB0aGlzLmNvbHVtbnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbHVtbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLnJvLmRpc2Nvbm5lY3QoKTtcbiAgICAgIFBCTF9OR1JJRF9NQVAuZGVsZXRlKHRoaXMudGFibGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25SZXNpemUoZW50cmllczogUmVzaXplT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgY29uc3QgcmVzaXplZDogUGJsQ29sdW1uU2l6ZU9ic2VydmVyW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGVudHJ5IG9mIGVudHJpZXMpIHtcbiAgICAgIGNvbnN0IG8gPSB0aGlzLmVudHJpZXMuZ2V0KGVudHJ5LnRhcmdldCk7XG4gICAgICBpZiAobykge1xuICAgICAgICByZXNpemVkLnB1c2gobyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChyZXNpemVkLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBpc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgcmVzaXplZCkge1xuICAgICAgICBpc0RyYWdnaW5nID0gaXNEcmFnZ2luZyB8fCBjLmNvbHVtbi5jb2x1bW5EZWYuaXNEcmFnZ2luZztcbiAgICAgICAgYy51cGRhdGVTaXplKCk7XG4gICAgICB9XG4gICAgICBpZiAoIWlzRHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy50YWJsZS5yZXNpemVDb2x1bW5zKHRoaXMuY29sdW1ucy5tYXAoIGMgPT4gYy5jb2x1bW4gKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQSBkaXJlY3RpdmUgdGhhdCBsaXN0ZW4gdG8gc2l6ZSBjaGFuZ2VzIGZyb20gdGhlIGVsZW1lbnQgb2YgYSBjZWxsLCB1c2luZyBSZXNpemVPYnNlcnZlci5cbiAqIFdoZW4gYSBjaGFuZ2Ugb2NjdXJzIGl0IHdpbGwgZW1pdCBpdCB0byB0aGUgUGJsVGFibGUgaG9zdCBvZiB0aGlzIGRpcmVjdGl2ZSwgYWxvbmcgd2l0aCBhbGwgb3RoZXIgb2JzZXJ2ZWQgY29sdW1ucyBmb3IgdGhlIHRhYmxlLlxuICpcbiAqIEluIG90aGVyIHdvcmRzLCBhbGwgY29sdW1ucyBvZiBhIHRhYmxlLCBtYXJrZWQgd2l0aCBgUGJsQ29sdW1uU2l6ZU9ic2VydmVyYCwgd2lsbCBiZSBzZW50LlxuICpcbiAqIEJlY2F1c2UgbW9zdCBvZiB0aGUgc2l6ZSBjaGFuZ2VzIGNvbmNlcm4gYWxsIGNvbHVtbnMgb2YgYSByb3cgYW5kIGJlY2F1c2UgUmVzaXplT2JzZXJ2ZXIgd2lsbCBlbWl0IHRoZW0gYWxsIGluIHRoZSBzYW1lIGV2ZW50XG4gKiBhbiBlbnRpcmUgcm93IHNob3VsZCBlbWl0IG9uY2UsIHdpdGggYWxsIGNvbHVtbnMuXG4gKi9cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZC1jZWxsW29ic2VydmVTaXplXSwgcGJsLW5ncmlkLWhlYWRlci1jZWxsW29ic2VydmVTaXplXScgfSlcbmV4cG9ydCBjbGFzcyBQYmxDb2x1bW5TaXplT2JzZXJ2ZXIgZXh0ZW5kcyBDb2x1bW5TaXplSW5mbyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnb2JzZXJ2ZVNpemUnKSBnZXQgY29sdW1uKCk6IFBibENvbHVtbiB7IHJldHVybiB0aGlzLl9jb2x1bW47IH1cbiAgc2V0IGNvbHVtbih2YWx1ZTogUGJsQ29sdW1uKSB7IHRoaXMuYXR0YWNoQ29sdW1uKHZhbHVlKTsgfVxuXG4gIHByaXZhdGUgY29udHJvbGxlcjogUGJsTmdyaWRHcm91cEhlYWRlclNpemVDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50UmVmLCB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55Pikge1xuICAgIHN1cGVyKGVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuY29udHJvbGxlciA9IFBibE5ncmlkR3JvdXBIZWFkZXJTaXplQ29udHJvbGxlci5nZXQodGFibGUpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29udHJvbGxlci5hZGQodGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXIucmVtb3ZlKHRoaXMpO1xuICAgIHRoaXMuZGV0YWNoQ29sdW1uKCk7XG4gIH1cbn1cbiJdfQ==