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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb250ZXh0L2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQU9BOzs7O0lBUUU7SUFBeUIsQ0FBQztJQUwxQixzQkFBSSxzQ0FBUzs7OztRQUFiLGNBQTRDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHMUQsc0JBQUksa0NBQUs7UUFEVCxtQ0FBbUM7Ozs7O1FBQ25DLGNBQW9DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQSxDQUFDLENBQUM7OztPQUFBO0lBQUEsQ0FBQztJQUl2RCxnRkFBZ0Y7SUFDaEYsd0lBQXdJO0lBQ3hJLDBGQUEwRjtJQUMxRix5R0FBeUc7Ozs7Ozs7Ozs7O0lBQ2xHLHNCQUFNOzs7Ozs7Ozs7OztJQUFiLFVBQStFLEdBQVMsRUFBRSxJQUEwQjs7WUFDNUcsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFXO1FBQy9DLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25CLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFSCxzQkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7Ozs7Ozs7SUFwQkMsOEJBQVU7O0lBQ1YsK0JBQTZCOzs7Ozs7QUFxQi9COzs7O0lBeUJFO1FBUlEsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFNQSxDQUFDO0lBeEIzQixzQkFBSSxxQ0FBUzs7OztRQUFiLGNBQXFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDbkQsc0JBQUksK0JBQUc7Ozs7UUFBUCxjQUFlLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUFBLENBQUM7SUFD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ekIsa0NBQXlCOzs7OztJQUN6QixtQ0FBMEI7Ozs7O0lBRTFCLHFDQUFzQzs7SUFDdEMsNkJBQXNCOzs7OztJQUN0QixnQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2VsbENvbnRleHRTdGF0ZSwgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4vcm93JztcblxuZXhwb3J0IGNsYXNzIE1ldGFDZWxsQ29udGV4dDxUID0gYW55LCBUQ29sIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiA9IFBibE1ldGFDb2x1bW4+IGltcGxlbWVudHMgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4ge1xuICBjb2w6IFRDb2w7XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG4gIGdldCAkaW1wbGljaXQoKTogTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+IHsgcmV0dXJuIHRoaXM7IH1cblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICBnZXQgdGFibGUoKTogUGJsTmdyaWRDb21wb25lbnQ8VD4geyByZXR1cm4gdGhpcy5ncmlkIH07XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55LCBUQ29sIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiA9IFBibE1ldGFDb2x1bW4+KGNvbDogVENvbCwgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPigpO1xuICAgIGluc3RhbmNlLmNvbCA9IGNvbDtcbiAgICBpbnN0YW5jZS5ncmlkID0gZ3JpZDtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUGJsQ2VsbENvbnRleHQ8VCA9IGFueT4gaW1wbGVtZW50cyBQYmxOZ3JpZENlbGxDb250ZXh0PFQ+IHtcbiAgZ2V0ICRpbXBsaWNpdCgpOiBQYmxDZWxsQ29udGV4dDxUPiB7IHJldHVybiB0aGlzOyB9XG4gIGdldCByb3coKTogVCB7IHJldHVybiB0aGlzLnJvd0NvbnRleHQuJGltcGxpY2l0OyB9O1xuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuY29sLmdldFZhbHVlKHRoaXMucm93KTsgfVxuICBzZXQgdmFsdWUodjogYW55KSB7IHRoaXMuY29sLnNldFZhbHVlKHRoaXMucm93LCB2KTsgfVxuXG4gIGdldCByb3dDb250ZXh0KCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB7IHJldHVybiB0aGlzLl9yb3dDb250ZXh0OyB9XG4gIGdldCBlZGl0aW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWRpdGluZzsgfVxuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7IH1cbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7IH1cblxuICByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIGdldCB0YWJsZSgpOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IHsgcmV0dXJuIHRoaXMuZ3JpZDsgfVxuXG4gIHByaXZhdGUgX2VkaXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3Jvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD47XG4gIHB1YmxpYyBjb2w6IFBibENvbHVtbjtcbiAgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4sIGNvbDogUGJsQ29sdW1uLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KTogUGJsQ2VsbENvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFBibENlbGxDb250ZXh0PFQ+KCk7XG5cbiAgICBpbnN0YW5jZS5fcm93Q29udGV4dCA9IHJvd0NvbnRleHQ7XG4gICAgaW5zdGFuY2UuY29sID0gY29sO1xuICAgIGluc3RhbmNlLmV4dEFwaSA9IGV4dEFwaTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGluc3RhbmNlLCB7XG4gICAgICBncmlkOiB7IHZhbHVlOiBleHRBcGkuZ3JpZCB9LFxuICAgICAgaW5kZXg6IHsgdmFsdWU6IGV4dEFwaS5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbCkgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0U3RhdGU8VCA9IGFueT4oKTogQ2VsbENvbnRleHRTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIHsgZWRpdGluZzogZmFsc2UsIGZvY3VzZWQ6IGZhbHNlLCBzZWxlY3RlZDogZmFsc2UgfTtcbiAgfVxuXG4gIGNsb25lKCk6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCBjdHggPSBQYmxDZWxsQ29udGV4dC5jcmVhdGU8VD4odGhpcy5fcm93Q29udGV4dCwgdGhpcy5jb2wsIHRoaXMuZXh0QXBpKTtcbiAgICBjdHguZnJvbVN0YXRlKHRoaXMuZ2V0U3RhdGUoKSwgdGhpcy5fcm93Q29udGV4dCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGN0eDtcbiAgfVxuXG4gIGdldFN0YXRlKCk6IENlbGxDb250ZXh0U3RhdGU8VD4ge1xuICAgIHJldHVybiB7XG4gICAgICBlZGl0aW5nOiB0aGlzLl9lZGl0aW5nLFxuICAgICAgZm9jdXNlZDogdGhpcy5fZm9jdXNlZCxcbiAgICAgIHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZCxcbiAgICB9O1xuICB9XG5cbiAgZnJvbVN0YXRlKHN0YXRlOiBDZWxsQ29udGV4dFN0YXRlPFQ+LCByb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+LCBza2lwUm93VXBkYXRlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHJlcXVpcmVzUmVzZXQgPSAhc2tpcFJvd1VwZGF0ZSAmJiB0aGlzLl9lZGl0aW5nID09PSBzdGF0ZS5lZGl0aW5nO1xuXG4gICAgdGhpcy5fcm93Q29udGV4dCA9IHJvd0NvbnRleHQ7XG4gICAgdGhpcy5fZWRpdGluZyA9IHN0YXRlLmVkaXRpbmc7XG4gICAgdGhpcy5fZm9jdXNlZCA9IHN0YXRlLmZvY3VzZWQ7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzdGF0ZS5zZWxlY3RlZDtcblxuICAgIGlmIChyZXF1aXJlc1Jlc2V0KSB7XG4gICAgICByb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRFZGl0KG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2wuZWRpdG9yVHBsICYmICF0aGlzLmVkaXRpbmcpIHtcbiAgICAgIHRoaXMuX2VkaXRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fcm93Q29udGV4dC51cGRhdGVDZWxsKHRoaXMpO1xuICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICB0aGlzLmdyaWQuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgdHJ1ZSwgdGhpcy5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdG9wRWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWRpdGluZyAmJiAhdGhpcy5ncmlkLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICB0aGlzLl9lZGl0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9yb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCB0aGlzLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19