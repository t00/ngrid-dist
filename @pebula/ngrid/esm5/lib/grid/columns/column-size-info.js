/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/columns/column-size-info.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2NvbHVtbi1zaXplLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQTtJQXFCRSx3QkFBNEIsTUFBbUI7UUFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtJQUFJLENBQUM7SUFwQnBELHNCQUFJLGtDQUFNOzs7O1FBQVYsY0FBMEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDaEQsVUFBVyxLQUFnQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FEVjs7Ozs7SUFzQmhELHFDQUFZOzs7O0lBQVosVUFBYSxNQUFpQjtRQUM1QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFFRCxxQ0FBWTs7O0lBQVo7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7OztJQUVELG1DQUFVOzs7SUFBVjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTs7Z0JBQzlDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTTs7Z0JBQ2hCLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWxERCxJQWtEQzs7Ozs7OztJQTNDQyxnQ0FBZTs7Ozs7O0lBS2YsK0JBQWM7Ozs7O0lBS2QsK0JBQTJCOzs7OztJQUUzQixpQ0FBNkI7O0lBRWpCLGdDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibENvbHVtblNpemVJbmZvIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi9jb2x1bW4nO1xuXG5leHBvcnQgY2xhc3MgQ29sdW1uU2l6ZUluZm8gaW1wbGVtZW50cyBQYmxDb2x1bW5TaXplSW5mbyB7XG4gIGdldCBjb2x1bW4oKTogUGJsQ29sdW1uIHsgcmV0dXJuIHRoaXMuX2NvbHVtbjsgfVxuICBzZXQgY29sdW1uKHZhbHVlOiBQYmxDb2x1bW4pIHsgdGhpcy5hdHRhY2hDb2x1bW4odmFsdWUpOyB9XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhlIGNvbHVtbiAoc3VicGl4ZWwgcmVzb2x1dGlvbilcbiAgICovXG4gIGhlaWdodDogbnVtYmVyO1xuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoZSBjb2x1bW4gKHN1YnBpeGVsIHJlc29sdXRpb24pXG4gICAqIE5vdGUgdGhhdCB0aGlzIGlzIHRoZSBub3QgdGhlIGNvbnRlbnQgd2lkdGguXG4gICAqL1xuICB3aWR0aDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgY29tcHV0ZWQgc3R5bGUgZm9yIHRoaXMgY2VsbC5cbiAgICovXG4gIHN0eWxlOiBDU1NTdHlsZURlY2xhcmF0aW9uO1xuXG4gIHByb3RlY3RlZCBfY29sdW1uOiBQYmxDb2x1bW47XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHRhcmdldDogSFRNTEVsZW1lbnQpIHsgfVxuXG4gIGF0dGFjaENvbHVtbihjb2x1bW46IFBibENvbHVtbik6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoQ29sdW1uKCk7XG5cbiAgICBpZiAoY29sdW1uKSB7XG4gICAgICBjb2x1bW4uc2l6ZUluZm8gPSB0aGlzO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbHVtbiA9IGNvbHVtbjtcbiAgfVxuXG4gIGRldGFjaENvbHVtbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY29sdW1uKSB7XG4gICAgICB0aGlzLl9jb2x1bW4uc2l6ZUluZm8gPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jb2x1bW4gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2x1bW4gJiYgIXRoaXMuY29sdW1uLmNvbHVtbkRlZi5pc0RyYWdnaW5nKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMudGFyZ2V0O1xuICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdGhpcy53aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICAgICAgdGhpcy5zdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLm9uUmVzaXplKCk7XG4gICAgfVxuICB9XG59XG4iXX0=