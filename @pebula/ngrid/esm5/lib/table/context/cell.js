/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T, TCol
 */
var /**
 * @template T, TCol
 */
MetaCellContext = /** @class */ (function () {
    function MetaCellContext() {
    }
    Object.defineProperty(MetaCellContext.prototype, "$implicit", {
        get: /**
         * @return {?}
         */
        function () { return this; },
        enumerable: true,
        configurable: true
    });
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T, TCol
     * @param {?} col
     * @param {?} table
     * @return {?}
     */
    MetaCellContext.create = 
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
    /**
     * @template T, TCol
     * @param {?} col
     * @param {?} table
     * @return {?}
     */
    function (col, table) {
        /** @type {?} */
        var instance = new MetaCellContext();
        instance.col = col;
        instance.table = table;
        return instance;
    };
    return MetaCellContext;
}());
/**
 * @template T, TCol
 */
export { MetaCellContext };
if (false) {
    /** @type {?} */
    MetaCellContext.prototype.col;
    /** @type {?} */
    MetaCellContext.prototype.table;
}
/**
 * @template T
 */
var /**
 * @template T
 */
PblCellContext = /** @class */ (function () {
    function PblCellContext() {
        this._editing = false;
        this._focused = false;
        this._selected = false;
    }
    Object.defineProperty(PblCellContext.prototype, "$implicit", {
        get: /**
         * @return {?}
         */
        function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCellContext.prototype, "row", {
        get: /**
         * @return {?}
         */
        function () { return this.rowContext.$implicit; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PblCellContext.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this.col.getValue(this.row); },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) { this.col.setValue(this.row, v); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCellContext.prototype, "rowContext", {
        get: /**
         * @return {?}
         */
        function () { return this._rowContext; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCellContext.prototype, "editing", {
        get: /**
         * @return {?}
         */
        function () { return this._editing; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCellContext.prototype, "focused", {
        get: /**
         * @return {?}
         */
        function () { return this._focused; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblCellContext.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    // workaround, we need a parameter-less constructor since @ngtools/webpack@8.0.4
    // Non @Injectable classes are now getting addded with hard reference to the ctor params which at the class creation point are undefined
    // forwardRef() will not help since it's not inject by angular, we instantiate the class..
    // probably due to https://github.com/angular/angular-cli/commit/639198499973e0f437f059b3c933c72c733d93d8
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
    PblCellContext.create = 
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
    function (rowContext, col, extApi) {
        /** @type {?} */
        var instance = new PblCellContext();
        instance._rowContext = rowContext;
        instance.col = col;
        instance.extApi = extApi;
        Object.defineProperties(instance, {
            table: { value: extApi.table },
            index: { value: extApi.table.columnApi.indexOf(col) },
        });
        return instance;
    };
    /**
     * @template T
     * @return {?}
     */
    PblCellContext.defaultState = /**
     * @template T
     * @return {?}
     */
    function () {
        return { editing: false, focused: false, selected: false };
    };
    /**
     * @return {?}
     */
    PblCellContext.prototype.clone = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ctx = PblCellContext.create(this._rowContext, this.col, this.extApi);
        ctx.fromState(this.getState(), this._rowContext, true);
        return ctx;
    };
    /**
     * @return {?}
     */
    PblCellContext.prototype.getState = /**
     * @return {?}
     */
    function () {
        return {
            editing: this._editing,
            focused: this._focused,
            selected: this._selected,
        };
    };
    /**
     * @param {?} state
     * @param {?} rowContext
     * @param {?=} skipRowUpdate
     * @return {?}
     */
    PblCellContext.prototype.fromState = /**
     * @param {?} state
     * @param {?} rowContext
     * @param {?=} skipRowUpdate
     * @return {?}
     */
    function (state, rowContext, skipRowUpdate) {
        /** @type {?} */
        var requiresReset = !skipRowUpdate && this._editing === state.editing;
        this._rowContext = rowContext;
        this._editing = state.editing;
        this._focused = state.focused;
        this._selected = state.selected;
        if (requiresReset) {
            rowContext.updateCell(this);
        }
    };
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    PblCellContext.prototype.startEdit = /**
     * @param {?=} markForCheck
     * @return {?}
     */
    function (markForCheck) {
        if (this.col.editorTpl && !this.editing) {
            this._editing = true;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.table._cdkTable.syncRows('data', true, this.rowContext.index);
            }
        }
    };
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    PblCellContext.prototype.stopEdit = /**
     * @param {?=} markForCheck
     * @return {?}
     */
    function (markForCheck) {
        if (this.editing && !this.table.viewport.isScrolling) {
            this._editing = false;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.table._cdkTable.syncRows('data', this.rowContext.index);
            }
        }
    };
    return PblCellContext;
}());
/**
 * @template T
 */
export { PblCellContext };
if (false) {
    /** @type {?} */
    PblCellContext.prototype.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29udGV4dC9jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFPQTs7OztJQUtFO0lBQXlCLENBQUM7SUFGMUIsc0JBQUksc0NBQVM7Ozs7UUFBYixjQUE0QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBSTFELGdGQUFnRjtJQUNoRix3SUFBd0k7SUFDeEksMEZBQTBGO0lBQzFGLHlHQUF5Rzs7Ozs7Ozs7Ozs7SUFDbEcsc0JBQU07Ozs7Ozs7Ozs7O0lBQWIsVUFBK0UsR0FBUyxFQUFFLEtBQTJCOztZQUM3RyxRQUFRLEdBQUcsSUFBSSxlQUFlLEVBQVc7UUFDL0MsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDbkIsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVILHNCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQzs7Ozs7OztJQWpCQyw4QkFBVTs7SUFDVixnQ0FBOEI7Ozs7O0FBa0JoQzs7OztJQXNCRTtRQVJRLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBTUEsQ0FBQztJQXJCM0Isc0JBQUkscUNBQVM7Ozs7UUFBYixjQUFxQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ25ELHNCQUFJLCtCQUFHOzs7O1FBQVAsY0FBZSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lBQ25ELHNCQUFJLGlDQUFLOzs7O1FBQVQsY0FBbUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLFlBQVksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwRTtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxpQ0FBUTs7OztJQUFSLFVBQVMsWUFBc0I7UUFDN0IsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUQ7U0FDRjtJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUE3RkQsSUE2RkM7Ozs7Ozs7SUFsRkMsK0JBQXVDOztJQUN2QywrQkFBdUI7Ozs7O0lBRXZCLGtDQUF5Qjs7Ozs7SUFDekIsa0NBQXlCOzs7OztJQUN6QixtQ0FBMEI7Ozs7O0lBRTFCLHFDQUFzQzs7SUFDdEMsNkJBQXNCOzs7OztJQUN0QixnQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb250ZXh0U3RhdGUsIFBibE5ncmlkQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL21ldGEtY29sdW1uJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5cbmV4cG9ydCBjbGFzcyBNZXRhQ2VsbENvbnRleHQ8VCA9IGFueSwgVENvbCBleHRlbmRzIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gPSBQYmxNZXRhQ29sdW1uPiBpbXBsZW1lbnRzIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+IHtcbiAgY29sOiBUQ29sO1xuICB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAgZ2V0ICRpbXBsaWNpdCgpOiBNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4geyByZXR1cm4gdGhpczsgfVxuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueSwgVENvbCBleHRlbmRzIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gPSBQYmxNZXRhQ29sdW1uPihjb2w6IFRDb2wsIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPik6IE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+KCk7XG4gICAgaW5zdGFuY2UuY29sID0gY29sO1xuICAgIGluc3RhbmNlLnRhYmxlID0gdGFibGU7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFBibENlbGxDb250ZXh0PFQgPSBhbnk+IGltcGxlbWVudHMgUGJsTmdyaWRDZWxsQ29udGV4dDxUPiB7XG4gIGdldCAkaW1wbGljaXQoKTogUGJsQ2VsbENvbnRleHQ8VD4geyByZXR1cm4gdGhpczsgfVxuICBnZXQgcm93KCk6IFQgeyByZXR1cm4gdGhpcy5yb3dDb250ZXh0LiRpbXBsaWNpdDsgfTtcbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmNvbC5nZXRWYWx1ZSh0aGlzLnJvdyk7IH1cbiAgc2V0IHZhbHVlKHY6IGFueSkgeyB0aGlzLmNvbC5zZXRWYWx1ZSh0aGlzLnJvdywgdik7IH1cblxuICBnZXQgcm93Q29udGV4dCgpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4geyByZXR1cm4gdGhpcy5fcm93Q29udGV4dDsgfVxuICBnZXQgZWRpdGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2VkaXRpbmc7IH1cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9mb2N1c2VkOyB9XG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG5cbiAgcmVhZG9ubHkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG4gIHJlYWRvbmx5IGluZGV4OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfZWRpdGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG4gIHByaXZhdGUgX3NlbGVjdGVkID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfcm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPjtcbiAgcHVibGljIGNvbDogUGJsQ29sdW1uO1xuICBwcml2YXRlIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD47XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4ocm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPiwgY29sOiBQYmxDb2x1bW4sIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4pOiBQYmxDZWxsQ29udGV4dDxUPiB7XG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgUGJsQ2VsbENvbnRleHQ8VD4oKTtcblxuICAgIGluc3RhbmNlLl9yb3dDb250ZXh0ID0gcm93Q29udGV4dDtcbiAgICBpbnN0YW5jZS5jb2wgPSBjb2w7XG4gICAgaW5zdGFuY2UuZXh0QXBpID0gZXh0QXBpO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoaW5zdGFuY2UsIHtcbiAgICAgIHRhYmxlOiB7IHZhbHVlOiBleHRBcGkudGFibGUgfSxcbiAgICAgIGluZGV4OiB7IHZhbHVlOiBleHRBcGkudGFibGUuY29sdW1uQXBpLmluZGV4T2YoY29sKSB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRTdGF0ZTxUID0gYW55PigpOiBDZWxsQ29udGV4dFN0YXRlPFQ+IHtcbiAgICByZXR1cm4geyBlZGl0aW5nOiBmYWxzZSwgZm9jdXNlZDogZmFsc2UsIHNlbGVjdGVkOiBmYWxzZSB9O1xuICB9XG5cbiAgY2xvbmUoKTogUGJsQ2VsbENvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGN0eCA9IFBibENlbGxDb250ZXh0LmNyZWF0ZTxUPih0aGlzLl9yb3dDb250ZXh0LCB0aGlzLmNvbCwgdGhpcy5leHRBcGkpO1xuICAgIGN0eC5mcm9tU3RhdGUodGhpcy5nZXRTdGF0ZSgpLCB0aGlzLl9yb3dDb250ZXh0LCB0cnVlKTtcbiAgICByZXR1cm4gY3R4O1xuICB9XG5cbiAgZ2V0U3RhdGUoKTogQ2VsbENvbnRleHRTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVkaXRpbmc6IHRoaXMuX2VkaXRpbmcsXG4gICAgICBmb2N1c2VkOiB0aGlzLl9mb2N1c2VkLFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkLFxuICAgIH07XG4gIH1cblxuICBmcm9tU3RhdGUoc3RhdGU6IENlbGxDb250ZXh0U3RhdGU8VD4sIHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4sIHNraXBSb3dVcGRhdGU/OiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcmVxdWlyZXNSZXNldCA9ICFza2lwUm93VXBkYXRlICYmIHRoaXMuX2VkaXRpbmcgPT09IHN0YXRlLmVkaXRpbmc7XG5cbiAgICB0aGlzLl9yb3dDb250ZXh0ID0gcm93Q29udGV4dDtcbiAgICB0aGlzLl9lZGl0aW5nID0gc3RhdGUuZWRpdGluZztcbiAgICB0aGlzLl9mb2N1c2VkID0gc3RhdGUuZm9jdXNlZDtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHN0YXRlLnNlbGVjdGVkO1xuXG4gICAgaWYgKHJlcXVpcmVzUmVzZXQpIHtcbiAgICAgIHJvd0NvbnRleHQudXBkYXRlQ2VsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBzdGFydEVkaXQobWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbC5lZGl0b3JUcGwgJiYgIXRoaXMuZWRpdGluZykge1xuICAgICAgdGhpcy5fZWRpdGluZyA9IHRydWU7XG4gICAgICB0aGlzLl9yb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgdHJ1ZSwgdGhpcy5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdG9wRWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWRpdGluZyAmJiAhdGhpcy50YWJsZS52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgdGhpcy5fZWRpdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fcm93Q29udGV4dC51cGRhdGVDZWxsKHRoaXMpO1xuICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICB0aGlzLnRhYmxlLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScsIHRoaXMucm93Q29udGV4dC5pbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=