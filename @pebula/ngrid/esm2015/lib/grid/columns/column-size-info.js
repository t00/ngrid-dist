/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNpemUtaW5mby5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb2x1bW5zL2NvbHVtbi1zaXplLWluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUdBLE1BQU0sT0FBTyxjQUFjOzs7O0lBcUJ6QixZQUE0QixNQUFtQjtRQUFuQixXQUFNLEdBQU4sTUFBTSxDQUFhO0lBQUksQ0FBQzs7OztJQXBCcEQsSUFBSSxNQUFNLEtBQWdCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ2hELElBQUksTUFBTSxDQUFDLEtBQWdCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBcUIxRCxZQUFZLENBQUMsTUFBaUI7UUFDNUIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUN4QixDQUFDOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7O0lBRUQsVUFBVTtRQUNSLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTs7a0JBQzlDLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTTs7a0JBQ2hCLElBQUksR0FBRyxFQUFFLENBQUMscUJBQXFCLEVBQUU7WUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztDQUNGOzs7Ozs7SUEzQ0MsZ0NBQWU7Ozs7OztJQUtmLCtCQUFjOzs7OztJQUtkLCtCQUEyQjs7Ozs7SUFFM0IsaUNBQTZCOztJQUVqQixnQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxDb2x1bW5TaXplSW5mbyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4vY29sdW1uJztcblxuZXhwb3J0IGNsYXNzIENvbHVtblNpemVJbmZvIGltcGxlbWVudHMgUGJsQ29sdW1uU2l6ZUluZm8ge1xuICBnZXQgY29sdW1uKCk6IFBibENvbHVtbiB7IHJldHVybiB0aGlzLl9jb2x1bW47IH1cbiAgc2V0IGNvbHVtbih2YWx1ZTogUGJsQ29sdW1uKSB7IHRoaXMuYXR0YWNoQ29sdW1uKHZhbHVlKTsgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBjb2x1bW4gKHN1YnBpeGVsIHJlc29sdXRpb24pXG4gICAqL1xuICBoZWlnaHQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgY29sdW1uIChzdWJwaXhlbCByZXNvbHV0aW9uKVxuICAgKiBOb3RlIHRoYXQgdGhpcyBpcyB0aGUgbm90IHRoZSBjb250ZW50IHdpZHRoLlxuICAgKi9cbiAgd2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGNvbXB1dGVkIHN0eWxlIGZvciB0aGlzIGNlbGwuXG4gICAqL1xuICBzdHlsZTogQ1NTU3R5bGVEZWNsYXJhdGlvbjtcblxuICBwcm90ZWN0ZWQgX2NvbHVtbjogUGJsQ29sdW1uO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0YXJnZXQ6IEhUTUxFbGVtZW50KSB7IH1cblxuICBhdHRhY2hDb2x1bW4oY29sdW1uOiBQYmxDb2x1bW4pOiB2b2lkIHtcbiAgICB0aGlzLmRldGFjaENvbHVtbigpO1xuXG4gICAgaWYgKGNvbHVtbikge1xuICAgICAgY29sdW1uLnNpemVJbmZvID0gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLl9jb2x1bW4gPSBjb2x1bW47XG4gIH1cblxuICBkZXRhY2hDb2x1bW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NvbHVtbikge1xuICAgICAgdGhpcy5fY29sdW1uLnNpemVJbmZvID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fY29sdW1uID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sdW1uICYmICF0aGlzLmNvbHVtbi5jb2x1bW5EZWYuaXNEcmFnZ2luZykge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLnRhcmdldDtcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHRoaXMud2lkdGggPSByZWN0LndpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSByZWN0LmhlaWdodDtcbiAgICAgIHRoaXMuc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgICAgIHRoaXMuY29sdW1uLmNvbHVtbkRlZi5vblJlc2l6ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19