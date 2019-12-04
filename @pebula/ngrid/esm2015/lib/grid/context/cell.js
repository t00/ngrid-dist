/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, TCol
 */
export class MetaCellContext {
    /**
     * @protected
     */
    constructor() { }
    /**
     * @return {?}
     */
    get $implicit() { return this; }
    /**
     * @deprecated use grid instead
     * @return {?}
     */
    get table() { return this.grid; }
    ;
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T, TCol
     * @param {?} col
     * @param {?} grid
     * @return {?}
     */
    static create(col, grid) {
        /** @type {?} */
        const instance = new MetaCellContext();
        instance.col = col;
        instance.grid = grid;
        return instance;
    }
}
if (false) {
    /** @type {?} */
    MetaCellContext.prototype.col;
    /** @type {?} */
    MetaCellContext.prototype.grid;
    /* Skipping unhandled member: ;*/
}
/**
 * @template T
 */
export class PblCellContext {
    /**
     * @protected
     */
    constructor() {
        this._editing = false;
        this._focused = false;
        this._selected = false;
    }
    /**
     * @return {?}
     */
    get $implicit() { return this; }
    /**
     * @return {?}
     */
    get row() { return this.rowContext.$implicit; }
    ;
    /**
     * @return {?}
     */
    get value() { return this.col.getValue(this.row); }
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) { this.col.setValue(this.row, v); }
    /**
     * @return {?}
     */
    get rowContext() { return this._rowContext; }
    /**
     * @return {?}
     */
    get editing() { return this._editing; }
    /**
     * @return {?}
     */
    get focused() { return this._focused; }
    /**
     * @return {?}
     */
    get selected() { return this._selected; }
    /**
     * @deprecated use grid instead
     * @return {?}
     */
    get table() { return this.grid; }
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T
     * @param {?} rowContext
     * @param {?} col
     * @param {?} extApi
     * @return {?}
     */
    static create(rowContext, col, extApi) {
        /** @type {?} */
        const instance = new PblCellContext();
        instance._rowContext = rowContext;
        instance.col = col;
        instance.extApi = extApi;
        Object.defineProperties(instance, {
            grid: { value: extApi.grid },
            index: { value: extApi.grid.columnApi.indexOf(col) },
        });
        return instance;
    }
    /**
     * @template T
     * @return {?}
     */
    static defaultState() {
        return { editing: false, focused: false, selected: false };
    }
    /**
     * @return {?}
     */
    clone() {
        /** @type {?} */
        const ctx = PblCellContext.create(this._rowContext, this.col, this.extApi);
        ctx.fromState(this.getState(), this._rowContext, true);
        return ctx;
    }
    /**
     * @return {?}
     */
    getState() {
        return {
            editing: this._editing,
            focused: this._focused,
            selected: this._selected,
        };
    }
    /**
     * @param {?} state
     * @param {?} rowContext
     * @param {?=} skipRowUpdate
     * @return {?}
     */
    fromState(state, rowContext, skipRowUpdate) {
        /** @type {?} */
        const requiresReset = !skipRowUpdate && this._editing === state.editing;
        this._rowContext = rowContext;
        this._editing = state.editing;
        this._focused = state.focused;
        this._selected = state.selected;
        if (requiresReset) {
            rowContext.updateCell(this);
        }
    }
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    startEdit(markForCheck) {
        if (this.col.editorTpl && !this.editing) {
            this._editing = true;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.grid._cdkTable.syncRows('data', true, this.rowContext.index);
            }
        }
    }
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    stopEdit(markForCheck) {
        if (this.editing && !this.grid.viewport.isScrolling) {
            this._editing = false;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.grid._cdkTable.syncRows('data', this.rowContext.index);
            }
        }
    }
}
if (false) {
    /** @type {?} */
    PblCellContext.prototype.grid;
    /** @type {?} */
    PblCellContext.prototype.index;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._editing;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._focused;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype._rowContext;
    /** @type {?} */
    PblCellContext.prototype.col;
    /**
     * @type {?}
     * @private
     */
    PblCellContext.prototype.extApi;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb250ZXh0L2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BLE1BQU0sT0FBTyxlQUFlOzs7O0lBUTFCLGdCQUF5QixDQUFDOzs7O0lBTDFCLElBQUksU0FBUyxLQUErQixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7O0lBRzFELElBQUksS0FBSyxLQUEyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDO0lBQUEsQ0FBQzs7Ozs7Ozs7Ozs7SUFRdkQsTUFBTSxDQUFDLE1BQU0sQ0FBa0UsR0FBUyxFQUFFLElBQTBCOztjQUM1RyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQVc7UUFDL0MsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbkIsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUVGOzs7SUFwQkMsOEJBQVU7O0lBQ1YsK0JBQTZCOzs7Ozs7QUFxQi9CLE1BQU0sT0FBTyxjQUFjOzs7O0lBeUJ6QjtRQVJRLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBTUEsQ0FBQzs7OztJQXhCM0IsSUFBSSxTQUFTLEtBQXdCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7OztJQUNuRCxJQUFJLEdBQUcsS0FBUSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUM7Ozs7SUFDbkQsSUFBSSxLQUFLLEtBQVUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN4RCxJQUFJLEtBQUssQ0FBQyxDQUFNLElBQUks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QUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkU7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLFlBQXNCO1FBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNuRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLFlBQVksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdEO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7OztJQXJGQyw4QkFBc0M7O0lBQ3RDLCtCQUF1Qjs7Ozs7SUFLdkIsa0NBQXlCOzs7OztJQUN6QixrQ0FBeUI7Ozs7O0lBQ3pCLG1DQUEwQjs7Ozs7SUFFMUIscUNBQXNDOztJQUN0Qyw2QkFBc0I7Ozs7O0lBQ3RCLGdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDZWxsQ29udGV4dFN0YXRlLCBQYmxOZ3JpZENlbGxDb250ZXh0LCBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dCwgUGJsTmdyaWRSb3dDb250ZXh0IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBQYmxDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbic7XG5pbXBvcnQgeyBQYmxNZXRhQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9tZXRhLWNvbHVtbic7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi9yb3cnO1xuXG5leHBvcnQgY2xhc3MgTWV0YUNlbGxDb250ZXh0PFQgPSBhbnksIFRDb2wgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uID0gUGJsTWV0YUNvbHVtbj4gaW1wbGVtZW50cyBQYmxOZ3JpZE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPiB7XG4gIGNvbDogVENvbDtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAgZ2V0ICRpbXBsaWNpdCgpOiBNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4geyByZXR1cm4gdGhpczsgfVxuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIGdldCB0YWJsZSgpOiBQYmxOZ3JpZENvbXBvbmVudDxUPiB7IHJldHVybiB0aGlzLmdyaWQgfTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnksIFRDb2wgZXh0ZW5kcyBQYmxNZXRhQ29sdW1uIHwgUGJsQ29sdW1uID0gUGJsTWV0YUNvbHVtbj4oY29sOiBUQ29sLCBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPik6IE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+KCk7XG4gICAgaW5zdGFuY2UuY29sID0gY29sO1xuICAgIGluc3RhbmNlLmdyaWQgPSBncmlkO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBQYmxDZWxsQ29udGV4dDxUID0gYW55PiBpbXBsZW1lbnRzIFBibE5ncmlkQ2VsbENvbnRleHQ8VD4ge1xuICBnZXQgJGltcGxpY2l0KCk6IFBibENlbGxDb250ZXh0PFQ+IHsgcmV0dXJuIHRoaXM7IH1cbiAgZ2V0IHJvdygpOiBUIHsgcmV0dXJuIHRoaXMucm93Q29udGV4dC4kaW1wbGljaXQ7IH07XG4gIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5jb2wuZ2V0VmFsdWUodGhpcy5yb3cpOyB9XG4gIHNldCB2YWx1ZSh2OiBhbnkpIHsgdGhpcy5jb2wuc2V0VmFsdWUodGhpcy5yb3csIHYpOyB9XG5cbiAgZ2V0IHJvd0NvbnRleHQoKTogUGJsTmdyaWRSb3dDb250ZXh0PFQ+IHsgcmV0dXJuIHRoaXMuX3Jvd0NvbnRleHQ7IH1cbiAgZ2V0IGVkaXRpbmcoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9lZGl0aW5nOyB9XG4gIGdldCBmb2N1c2VkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZm9jdXNlZDsgfVxuICBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zZWxlY3RlZDsgfVxuXG4gIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgZ2V0IHRhYmxlKCk6IFBibE5ncmlkQ29tcG9uZW50PGFueT4geyByZXR1cm4gdGhpcy5ncmlkOyB9XG5cbiAgcHJpdmF0ZSBfZWRpdGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG4gIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPjtcbiAgcHVibGljIGNvbDogUGJsQ29sdW1uO1xuICBwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD47XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4ocm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPiwgY29sOiBQYmxDb2x1bW4sIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4pOiBQYmxDZWxsQ29udGV4dDxUPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUGJsQ2VsbENvbnRleHQ8VD4oKTtcblxuICAgIGluc3RhbmNlLl9yb3dDb250ZXh0ID0gcm93Q29udGV4dDtcbiAgICBpbnN0YW5jZS5jb2wgPSBjb2w7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoaW5zdGFuY2UsIHtcbiAgICAgIGdyaWQ6IHsgdmFsdWU6IGV4dEFwaS5ncmlkIH0sXG4gICAgICBpbmRleDogeyB2YWx1ZTogZXh0QXBpLmdyaWQuY29sdW1uQXBpLmluZGV4T2YoY29sKSB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRTdGF0ZTxUID0gYW55PigpOiBDZWxsQ29udGV4dFN0YXRlPFQ+IHtcbiAgICByZXR1cm4geyBlZGl0aW5nOiBmYWxzZSwgZm9jdXNlZDogZmFsc2UsIHNlbGVjdGVkOiBmYWxzZSB9O1xuICB9XG5cbiAgY2xvbmUoKTogUGJsQ2VsbENvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGN0eCA9IFBibENlbGxDb250ZXh0LmNyZWF0ZTxUPih0aGlzLl9yb3dDb250ZXh0LCB0aGlzLmNvbCwgdGhpcy5leHRBcGkpO1xuICAgIGN0eC5mcm9tU3RhdGUodGhpcy5nZXRTdGF0ZSgpLCB0aGlzLl9yb3dDb250ZXh0LCB0cnVlKTtcbiAgICByZXR1cm4gY3R4O1xuICB9XG5cbiAgZ2V0U3RhdGUoKTogQ2VsbENvbnRleHRTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRpbmc6IHRoaXMuX2VkaXRpbmcsXG4gICAgICBmb2N1c2VkOiB0aGlzLl9mb2N1c2VkLFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkLFxuICAgIH07XG4gIH1cblxuICBmcm9tU3RhdGUoc3RhdGU6IENlbGxDb250ZXh0U3RhdGU8VD4sIHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4sIHNraXBSb3dVcGRhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcmVxdWlyZXNSZXNldCA9ICFza2lwUm93VXBkYXRlICYmIHRoaXMuX2VkaXRpbmcgPT09IHN0YXRlLmVkaXRpbmc7XG5cbiAgICB0aGlzLl9yb3dDb250ZXh0ID0gcm93Q29udGV4dDtcbiAgICB0aGlzLl9lZGl0aW5nID0gc3RhdGUuZWRpdGluZztcbiAgICB0aGlzLl9mb2N1c2VkID0gc3RhdGUuZm9jdXNlZDtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHN0YXRlLnNlbGVjdGVkO1xuXG4gICAgaWYgKHJlcXVpcmVzUmVzZXQpIHtcbiAgICAgIHJvd0NvbnRleHQudXBkYXRlQ2VsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzdGFydEVkaXQobWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbC5lZGl0b3JUcGwgJiYgIXRoaXMuZWRpdGluZykge1xuICAgICAgdGhpcy5fZWRpdGluZyA9IHRydWU7XG4gICAgICB0aGlzLl9yb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCB0cnVlLCB0aGlzLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0b3BFZGl0KG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lZGl0aW5nICYmICF0aGlzLmdyaWQudmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgIHRoaXMuX2VkaXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3Jvd0NvbnRleHQudXBkYXRlQ2VsbCh0aGlzKTtcbiAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScsIHRoaXMucm93Q29udGV4dC5pbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=