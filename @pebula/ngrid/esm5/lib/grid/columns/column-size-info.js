/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ColumnSizeInfo = /** @class */ (function () {
    function ColumnSizeInfo(target) {
        this.target = target;
    }
    Object.defineProperty(ColumnSizeInfo.prototype, "column", {
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
    ColumnSizeInfo.prototype.attachColumn = /**
     * @param {?} column
     * @return {?}
     */
    function (column) {
        this.detachColumn();
        if (column) {
            column.sizeInfo = this;
        }
        this._column = column;
    };
    /**
     * @return {?}
     */
    ColumnSizeInfo.prototype.detachColumn = /**
     * @return {?}
     */
    function () {
        if (this._column) {
            this._column.sizeInfo = undefined;
            this._column = undefined;
        }
    };
    /**
     * @return {?}
     */
    ColumnSizeInfo.prototype.updateSize = /**
     * @return {?}
     */
    function () {
        if (this.column && !this.column.columnDef.isDragging) {
            /** @type {?} */
            var el = this.target;
            /** @type {?} */
            var rect = el.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.style = getComputedStyle(el);
            this.column.columnDef.onResize();
        }
    };
    return ColumnSizeInfo;
}());
export { ColumnSizeInfo };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2NvbHVtbi1zaXplLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBO0lBcUJFLHdCQUE0QixNQUFtQjtRQUFuQixXQUFNLEdBQU4sTUFBTSxDQUFhO0lBQUksQ0FBQztJQXBCcEQsc0JBQUksa0NBQU07Ozs7UUFBVixjQUEwQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7OztRQUNoRCxVQUFXLEtBQWdCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQURWOzs7OztJQXNCaEQscUNBQVk7Ozs7SUFBWixVQUFhLE1BQWlCO1FBQzVCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7OztJQUVELHFDQUFZOzs7SUFBWjtRQUNFLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsbUNBQVU7OztJQUFWO1FBQ0UsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFOztnQkFDOUMsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNOztnQkFDaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbEM7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDOzs7Ozs7O0lBM0NDLGdDQUFlOzs7Ozs7SUFLZiwrQkFBYzs7Ozs7SUFLZCwrQkFBMkI7Ozs7O0lBRTNCLGlDQUE2Qjs7SUFFakIsZ0NBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsQ29sdW1uU2l6ZUluZm8gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuL2NvbHVtbic7XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW5TaXplSW5mbyBpbXBsZW1lbnRzIFBibENvbHVtblNpemVJbmZvIHtcbiAgZ2V0IGNvbHVtbigpOiBQYmxDb2x1bW4geyByZXR1cm4gdGhpcy5fY29sdW1uOyB9XG4gIHNldCBjb2x1bW4odmFsdWU6IFBibENvbHVtbikgeyB0aGlzLmF0dGFjaENvbHVtbih2YWx1ZSk7IH1cblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGUgY29sdW1uIChzdWJwaXhlbCByZXNvbHV0aW9uKVxuICAgKi9cbiAgaGVpZ2h0OiBudW1iZXI7XG4gIC8qKlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGNvbHVtbiAoc3VicGl4ZWwgcmVzb2x1dGlvbilcbiAgICogTm90ZSB0aGF0IHRoaXMgaXMgdGhlIG5vdCB0aGUgY29udGVudCB3aWR0aC5cbiAgICovXG4gIHdpZHRoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBjb21wdXRlZCBzdHlsZSBmb3IgdGhpcyBjZWxsLlxuICAgKi9cbiAgc3R5bGU6IENTU1N0eWxlRGVjbGFyYXRpb247XG5cbiAgcHJvdGVjdGVkIF9jb2x1bW46IFBibENvbHVtbjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdGFyZ2V0OiBIVE1MRWxlbWVudCkgeyB9XG5cbiAgYXR0YWNoQ29sdW1uKGNvbHVtbjogUGJsQ29sdW1uKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2hDb2x1bW4oKTtcblxuICAgIGlmIChjb2x1bW4pIHtcbiAgICAgIGNvbHVtbi5zaXplSW5mbyA9IHRoaXM7XG4gICAgfVxuXG4gICAgdGhpcy5fY29sdW1uID0gY29sdW1uO1xuICB9XG5cbiAgZGV0YWNoQ29sdW1uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb2x1bW4pIHtcbiAgICAgIHRoaXMuX2NvbHVtbi5zaXplSW5mbyA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2NvbHVtbiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbHVtbiAmJiAhdGhpcy5jb2x1bW4uY29sdW1uRGVmLmlzRHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy50YXJnZXQ7XG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB0aGlzLndpZHRoID0gcmVjdC53aWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgICB0aGlzLnN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gICAgICB0aGlzLmNvbHVtbi5jb2x1bW5EZWYub25SZXNpemUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==