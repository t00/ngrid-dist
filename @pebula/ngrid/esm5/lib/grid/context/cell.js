/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/cell.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    Object.defineProperty(MetaCellContext.prototype, "table", {
        /** @deprecated use grid instead */
        get: /**
         * @deprecated use grid instead
         * @return {?}
         */
        function () { return this.grid; },
        enumerable: true,
        configurable: true
    });
    ;
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
     * @param {?} grid
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
     * @param {?} grid
     * @return {?}
     */
    function (col, grid) {
        /** @type {?} */
        var instance = new MetaCellContext();
        instance.col = col;
        instance.grid = grid;
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
    MetaCellContext.prototype.grid;
    /* Skipping unhandled member: ;*/
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
    Object.defineProperty(PblCellContext.prototype, "table", {
        /** @deprecated use grid instead */
        get: /**
         * @deprecated use grid instead
         * @return {?}
         */
        function () { return this.grid; },
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
            grid: { value: extApi.grid },
            index: { value: extApi.grid.columnApi.indexOf(col) },
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
                this.grid._cdkTable.syncRows('data', true, this.rowContext.index);
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
        if (this.editing && !this.grid.viewport.isScrolling) {
            this._editing = false;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.grid._cdkTable.syncRows('data', this.rowContext.index);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb250ZXh0L2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFPQTs7OztJQVFFO0lBQXlCLENBQUM7SUFMMUIsc0JBQUksc0NBQVM7Ozs7UUFBYixjQUE0QyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRzFELHNCQUFJLGtDQUFLO1FBRFQsbUNBQW1DOzs7OztRQUNuQyxjQUFvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFJdkQsZ0ZBQWdGO0lBQ2hGLHdJQUF3STtJQUN4SSwwRkFBMEY7SUFDMUYseUdBQXlHOzs7Ozs7Ozs7OztJQUNsRyxzQkFBTTs7Ozs7Ozs7Ozs7SUFBYixVQUErRSxHQUFTLEVBQUUsSUFBMEI7O1lBQzVHLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBVztRQUMvQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNuQixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUgsc0JBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDOzs7Ozs7O0lBcEJDLDhCQUFVOztJQUNWLCtCQUE2Qjs7Ozs7O0FBcUIvQjs7OztJQXlCRTtRQVJRLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBTUEsQ0FBQztJQXhCM0Isc0JBQUkscUNBQVM7Ozs7UUFBYixjQUFxQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ25ELHNCQUFJLCtCQUFHOzs7O1FBQVAsY0FBZSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFBQSxDQUFDO0lB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Q3pCLGtDQUF5Qjs7Ozs7SUFDekIsbUNBQTBCOzs7OztJQUUxQixxQ0FBc0M7O0lBQ3RDLDZCQUFzQjs7Ozs7SUFDdEIsZ0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IENlbGxDb250ZXh0U3RhdGUsIFBibE5ncmlkQ2VsbENvbnRleHQsIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0LCBQYmxOZ3JpZFJvd0NvbnRleHQgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFBibENvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uJztcbmltcG9ydCB7IFBibE1ldGFDb2x1bW4gfSBmcm9tICcuLi9jb2x1bW5zL21ldGEtY29sdW1uJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuL3Jvdyc7XG5cbmV4cG9ydCBjbGFzcyBNZXRhQ2VsbENvbnRleHQ8VCA9IGFueSwgVENvbCBleHRlbmRzIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gPSBQYmxNZXRhQ29sdW1uPiBpbXBsZW1lbnRzIFBibE5ncmlkTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+IHtcbiAgY29sOiBUQ29sO1xuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICBnZXQgJGltcGxpY2l0KCk6IE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPiB7IHJldHVybiB0aGlzOyB9XG5cbiAgLyoqIEBkZXByZWNhdGVkIHVzZSBncmlkIGluc3RlYWQgKi9cbiAgZ2V0IHRhYmxlKCk6IFBibE5ncmlkQ29tcG9uZW50PFQ+IHsgcmV0dXJuIHRoaXMuZ3JpZCB9O1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLy8gd29ya2Fyb3VuZCwgd2UgbmVlZCBhIHBhcmFtZXRlci1sZXNzIGNvbnN0cnVjdG9yIHNpbmNlIEBuZ3Rvb2xzL3dlYnBhY2tAOC4wLjRcbiAgLy8gTm9uIEBJbmplY3RhYmxlIGNsYXNzZXMgYXJlIG5vdyBnZXR0aW5nIGFkZGRlZCB3aXRoIGhhcmQgcmVmZXJlbmNlIHRvIHRoZSBjdG9yIHBhcmFtcyB3aGljaCBhdCB0aGUgY2xhc3MgY3JlYXRpb24gcG9pbnQgYXJlIHVuZGVmaW5lZFxuICAvLyBmb3J3YXJkUmVmKCkgd2lsbCBub3QgaGVscCBzaW5jZSBpdCdzIG5vdCBpbmplY3QgYnkgYW5ndWxhciwgd2UgaW5zdGFudGlhdGUgdGhlIGNsYXNzLi5cbiAgLy8gcHJvYmFibHkgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2NvbW1pdC82MzkxOTg0OTk5NzNlMGY0MzdmMDU5YjNjOTMzYzcyYzczM2Q5M2Q4XG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueSwgVENvbCBleHRlbmRzIFBibE1ldGFDb2x1bW4gfCBQYmxDb2x1bW4gPSBQYmxNZXRhQ29sdW1uPihjb2w6IFRDb2wsIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+KTogTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4oKTtcbiAgICBpbnN0YW5jZS5jb2wgPSBjb2w7XG4gICAgaW5zdGFuY2UuZ3JpZCA9IGdyaWQ7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbn1cblxuZXhwb3J0IGNsYXNzIFBibENlbGxDb250ZXh0PFQgPSBhbnk+IGltcGxlbWVudHMgUGJsTmdyaWRDZWxsQ29udGV4dDxUPiB7XG4gIGdldCAkaW1wbGljaXQoKTogUGJsQ2VsbENvbnRleHQ8VD4geyByZXR1cm4gdGhpczsgfVxuICBnZXQgcm93KCk6IFQgeyByZXR1cm4gdGhpcy5yb3dDb250ZXh0LiRpbXBsaWNpdDsgfTtcbiAgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLmNvbC5nZXRWYWx1ZSh0aGlzLnJvdyk7IH1cbiAgc2V0IHZhbHVlKHY6IGFueSkgeyB0aGlzLmNvbC5zZXRWYWx1ZSh0aGlzLnJvdywgdik7IH1cblxuICBnZXQgcm93Q29udGV4dCgpOiBQYmxOZ3JpZFJvd0NvbnRleHQ8VD4geyByZXR1cm4gdGhpcy5fcm93Q29udGV4dDsgfVxuICBnZXQgZWRpdGluZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2VkaXRpbmc7IH1cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9mb2N1c2VkOyB9XG4gIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGVkOyB9XG5cbiAgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICBnZXQgdGFibGUoKTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiB7IHJldHVybiB0aGlzLmdyaWQ7IH1cblxuICBwcml2YXRlIF9lZGl0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9yb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+O1xuICBwdWJsaWMgY29sOiBQYmxDb2x1bW47XG4gIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7IH1cblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pihyb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+LCBjb2w6IFBibENvbHVtbiwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPik6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBQYmxDZWxsQ29udGV4dDxUPigpO1xuXG4gICAgaW5zdGFuY2UuX3Jvd0NvbnRleHQgPSByb3dDb250ZXh0O1xuICAgIGluc3RhbmNlLmNvbCA9IGNvbDtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhpbnN0YW5jZSwge1xuICAgICAgZ3JpZDogeyB2YWx1ZTogZXh0QXBpLmdyaWQgfSxcbiAgICAgIGluZGV4OiB7IHZhbHVlOiBleHRBcGkuZ3JpZC5jb2x1bW5BcGkuaW5kZXhPZihjb2wpIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFN0YXRlPFQgPSBhbnk+KCk6IENlbGxDb250ZXh0U3RhdGU8VD4ge1xuICAgIHJldHVybiB7IGVkaXRpbmc6IGZhbHNlLCBmb2N1c2VkOiBmYWxzZSwgc2VsZWN0ZWQ6IGZhbHNlIH07XG4gIH1cblxuICBjbG9uZSgpOiBQYmxDZWxsQ29udGV4dDxUPiB7XG4gICAgY29uc3QgY3R4ID0gUGJsQ2VsbENvbnRleHQuY3JlYXRlPFQ+KHRoaXMuX3Jvd0NvbnRleHQsIHRoaXMuY29sLCB0aGlzLmV4dEFwaSk7XG4gICAgY3R4LmZyb21TdGF0ZSh0aGlzLmdldFN0YXRlKCksIHRoaXMuX3Jvd0NvbnRleHQsIHRydWUpO1xuICAgIHJldHVybiBjdHg7XG4gIH1cblxuICBnZXRTdGF0ZSgpOiBDZWxsQ29udGV4dFN0YXRlPFQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZWRpdGluZzogdGhpcy5fZWRpdGluZyxcbiAgICAgIGZvY3VzZWQ6IHRoaXMuX2ZvY3VzZWQsXG4gICAgICBzZWxlY3RlZDogdGhpcy5fc2VsZWN0ZWQsXG4gICAgfTtcbiAgfVxuXG4gIGZyb21TdGF0ZShzdGF0ZTogQ2VsbENvbnRleHRTdGF0ZTxUPiwgcm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPiwgc2tpcFJvd1VwZGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCByZXF1aXJlc1Jlc2V0ID0gIXNraXBSb3dVcGRhdGUgJiYgdGhpcy5fZWRpdGluZyA9PT0gc3RhdGUuZWRpdGluZztcblxuICAgIHRoaXMuX3Jvd0NvbnRleHQgPSByb3dDb250ZXh0O1xuICAgIHRoaXMuX2VkaXRpbmcgPSBzdGF0ZS5lZGl0aW5nO1xuICAgIHRoaXMuX2ZvY3VzZWQgPSBzdGF0ZS5mb2N1c2VkO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc3RhdGUuc2VsZWN0ZWQ7XG5cbiAgICBpZiAocmVxdWlyZXNSZXNldCkge1xuICAgICAgcm93Q29udGV4dC51cGRhdGVDZWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sLmVkaXRvclRwbCAmJiAhdGhpcy5lZGl0aW5nKSB7XG4gICAgICB0aGlzLl9lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Jvd0NvbnRleHQudXBkYXRlQ2VsbCh0aGlzKTtcbiAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgdGhpcy5ncmlkLl9jZGtUYWJsZS5zeW5jUm93cygnZGF0YScsIHRydWUsIHRoaXMucm93Q29udGV4dC5pbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc3RvcEVkaXQobWFya0ZvckNoZWNrPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmVkaXRpbmcgJiYgIXRoaXMuZ3JpZC52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgdGhpcy5fZWRpdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fcm93Q29udGV4dC51cGRhdGVDZWxsKHRoaXMpO1xuICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICB0aGlzLmdyaWQuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgdGhpcy5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==