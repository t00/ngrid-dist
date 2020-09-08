/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/column-size-info.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class ColumnSizeInfo {
    /**
     * @param {?} target
     */
    constructor(target) {
        this.target = target;
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
        this.detachColumn();
        if (column) {
            column.sizeInfo = this;
        }
        this._column = column;
    }
    /**
     * @return {?}
     */
    detachColumn() {
        if (this._column) {
            this._column.sizeInfo = undefined;
            this._column = undefined;
        }
    }
    /**
     * @return {?}
     */
    updateSize() {
        if (this.column && !this.column.columnDef.isDragging) {
            /** @type {?} */
            const el = this.target;
            /** @type {?} */
            const rect = el.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.style = getComputedStyle(el);
            this.column.columnDef.onResize();
        }
    }
}
if (false) {
    /**
     * The height of the column (subpixel resolution)
     * @type {?}
     */
    ColumnSizeInfo.prototype.height;
    /**
     * The width of the column (subpixel resolution)
     * Note that this is the not the content width.
     * @type {?}
     */
    ColumnSizeInfo.prototype.width;
    /**
     * The computed style for this cell.
     * @type {?}
     */
    ColumnSizeInfo.prototype.style;
    /**
     * @type {?}
     * @protected
     */
    ColumnSizeInfo.prototype._column;
    /** @type {?} */
    ColumnSizeInfo.prototype.target;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2NvbHVtbi1zaXplLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxNQUFNLE9BQU8sY0FBYzs7OztJQXFCekIsWUFBNEIsTUFBbUI7UUFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtJQUFJLENBQUM7Ozs7SUFwQnBELElBQUksTUFBTSxLQUFnQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNoRCxJQUFJLE1BQU0sQ0FBQyxLQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQXFCMUQsWUFBWSxDQUFDLE1BQWlCO1FBQzVCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7OztJQUVELFVBQVU7UUFDUixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7O2tCQUM5QyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU07O2tCQUNoQixJQUFJLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFO1lBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7Q0FDRjs7Ozs7O0lBM0NDLGdDQUFlOzs7Ozs7SUFLZiwrQkFBYzs7Ozs7SUFLZCwrQkFBMkI7Ozs7O0lBRTNCLGlDQUE2Qjs7SUFFakIsZ0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5TaXplSW5mbyBpbXBsZW1lbnRzIFBibENvbHVtblNpemVJbmZvIHtcbiAgZ2V0IGNvbHVtbigpOiBQYmxDb2x1bW4geyByZXR1cm4gdGhpcy5fY29sdW1uOyB9XG4gIHNldCBjb2x1bW4odmFsdWU6IFBibENvbHVtbikgeyB0aGlzLmF0dGFjaENvbHVtbih2YWx1ZSk7IH1cblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgY29sdW1uIChzdWJwaXhlbCByZXNvbHV0aW9uKVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGNvbHVtbiAoc3VicGl4ZWwgcmVzb2x1dGlvbilcbiAgICogTm90ZSB0aGF0IHRoaXMgaXMgdGhlIG5vdCB0aGUgY29udGVudCB3aWR0aC5cbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wdXRlZCBzdHlsZSBmb3IgdGhpcyBjZWxsLlxuICAgKi9cbiAgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb247XG5cbiAgcHJvdGVjdGVkIF9jb2x1bW46IFBibENvbHVtbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0OiBIVE1MRWxlbWVudCkgeyB9XG5cbiAgYXR0YWNoQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2hDb2x1bW4oKTtcblxuICAgIGlmIChjb2x1bW4pIHtcbiAgICAgIGNvbHVtbi5zaXplSW5mbyA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICB9XG5cbiAgZGV0YWNoQ29sdW1uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4pIHtcbiAgICAgIHRoaXMuX2NvbHVtbi5zaXplSW5mbyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbiAmJiAhdGhpcy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy50YXJnZXQ7XG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLndpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgICB0aGlzLnN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICB0aGlzLmNvbHVtbi5jb2x1bW5EZWYub25SZXNpemUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==