/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/context/cell.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9jb250ZXh0L2NlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFPQSxNQUFNLE9BQU8sZUFBZTs7OztJQVExQixnQkFBeUIsQ0FBQzs7OztJQUwxQixJQUFJLFNBQVMsS0FBK0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7OztJQUcxRCxJQUFJLEtBQUssS0FBMkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBLENBQUMsQ0FBQztJQUFBLENBQUM7Ozs7Ozs7Ozs7O0lBUXZELE1BQU0sQ0FBQyxNQUFNLENBQWtFLEdBQVMsRUFBRSxJQUEwQjs7Y0FDNUcsUUFBUSxHQUFHLElBQUksZUFBZSxFQUFXO1FBQy9DLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ25CLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7Q0FFRjs7O0lBcEJDLDhCQUFVOztJQUNWLCtCQUE2Qjs7Ozs7O0FBcUIvQixNQUFNLE9BQU8sY0FBYzs7OztJQXlCekI7UUFSUSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQU1BLENBQUM7Ozs7SUF4QjNCLElBQUksU0FBUyxLQUF3QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7SUFDbkQsSUFBSSxHQUFHLEtBQVEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDOzs7O0lBQ25ELElBQUksS0FBSyxLQUFVLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDeEQsSUFBSSxLQUFLLENBQUMsQ0FBTSxJQUFJ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VUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksWUFBWSxFQUFFO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ25FO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUVELFFBQVEsQ0FBQyxZQUFzQjtRQUM3QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM3RDtTQUNGO0lBQ0gsQ0FBQztDQUNGOzs7SUFyRkMsOEJBQXNDOztJQUN0QywrQkFBdUI7Ozs7O0lBS3ZCLGtDQUF5Qjs7Ozs7SUFDekIsa0NBQXlCOzs7OztJQUN6QixtQ0FBMEI7Ozs7O0lBRTFCLHFDQUFzQzs7SUFDdEMsNkJBQXNCOzs7OztJQUN0QixnQ0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2VsbENvbnRleHRTdGF0ZSwgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4vcm93JztcblxuZXhwb3J0IGNsYXNzIE1ldGFDZWxsQ29udGV4dDxUID0gYW55LCBUQ29sIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiA9IFBibE1ldGFDb2x1bW4+IGltcGxlbWVudHMgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4ge1xuICBjb2w6IFRDb2w7XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG4gIGdldCAkaW1wbGljaXQoKTogTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+IHsgcmV0dXJuIHRoaXM7IH1cblxuICAvKiogQGRlcHJlY2F0ZWQgdXNlIGdyaWQgaW5zdGVhZCAqL1xuICBnZXQgdGFibGUoKTogUGJsTmdyaWRDb21wb25lbnQ8VD4geyByZXR1cm4gdGhpcy5ncmlkIH07XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55LCBUQ29sIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiA9IFBibE1ldGFDb2x1bW4+KGNvbDogVENvbCwgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPigpO1xuICAgIGluc3RhbmNlLmNvbCA9IGNvbDtcbiAgICBpbnN0YW5jZS5ncmlkID0gZ3JpZDtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUGJsQ2VsbENvbnRleHQ8VCA9IGFueT4gaW1wbGVtZW50cyBQYmxOZ3JpZENlbGxDb250ZXh0PFQ+IHtcbiAgZ2V0ICRpbXBsaWNpdCgpOiBQYmxDZWxsQ29udGV4dDxUPiB7IHJldHVybiB0aGlzOyB9XG4gIGdldCByb3coKTogVCB7IHJldHVybiB0aGlzLnJvd0NvbnRleHQuJGltcGxpY2l0OyB9O1xuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuY29sLmdldFZhbHVlKHRoaXMucm93KTsgfVxuICBzZXQgdmFsdWUodjogYW55KSB7IHRoaXMuY29sLnNldFZhbHVlKHRoaXMucm93LCB2KTsgfVxuXG4gIGdldCByb3dDb250ZXh0KCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB7IHJldHVybiB0aGlzLl9yb3dDb250ZXh0OyB9XG4gIGdldCBlZGl0aW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWRpdGluZzsgfVxuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7IH1cbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7IH1cblxuICByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICByZWFkb25seSBpbmRleDogbnVtYmVyO1xuXG4gIC8qKiBAZGVwcmVjYXRlZCB1c2UgZ3JpZCBpbnN0ZWFkICovXG4gIGdldCB0YWJsZSgpOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+IHsgcmV0dXJuIHRoaXMuZ3JpZDsgfVxuXG4gIHByaXZhdGUgX2VkaXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zZWxlY3RlZCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX3Jvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD47XG4gIHB1YmxpYyBjb2w6IFBibENvbHVtbjtcbiAgcHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+O1xuXG4gIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIC8vIHdvcmthcm91bmQsIHdlIG5lZWQgYSBwYXJhbWV0ZXItbGVzcyBjb25zdHJ1Y3RvciBzaW5jZSBAbmd0b29scy93ZWJwYWNrQDguMC40XG4gIC8vIE5vbiBASW5qZWN0YWJsZSBjbGFzc2VzIGFyZSBub3cgZ2V0dGluZyBhZGRkZWQgd2l0aCBoYXJkIHJlZmVyZW5jZSB0byB0aGUgY3RvciBwYXJhbXMgd2hpY2ggYXQgdGhlIGNsYXNzIGNyZWF0aW9uIHBvaW50IGFyZSB1bmRlZmluZWRcbiAgLy8gZm9yd2FyZFJlZigpIHdpbGwgbm90IGhlbHAgc2luY2UgaXQncyBub3QgaW5qZWN0IGJ5IGFuZ3VsYXIsIHdlIGluc3RhbnRpYXRlIHRoZSBjbGFzcy4uXG4gIC8vIHByb2JhYmx5IGR1ZSB0byBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyLWNsaS9jb21taXQvNjM5MTk4NDk5OTczZTBmNDM3ZjA1OWIzYzkzM2M3MmM3MzNkOTNkOFxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHJvd0NvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD4sIGNvbDogUGJsQ29sdW1uLCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KTogUGJsQ2VsbENvbnRleHQ8VD4ge1xuICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFBibENlbGxDb250ZXh0PFQ+KCk7XG5cbiAgICBpbnN0YW5jZS5fcm93Q29udGV4dCA9IHJvd0NvbnRleHQ7XG4gICAgaW5zdGFuY2UuY29sID0gY29sO1xuICAgIGluc3RhbmNlLmV4dEFwaSA9IGV4dEFwaTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGluc3RhbmNlLCB7XG4gICAgICBncmlkOiB7IHZhbHVlOiBleHRBcGkuZ3JpZCB9LFxuICAgICAgaW5kZXg6IHsgdmFsdWU6IGV4dEFwaS5ncmlkLmNvbHVtbkFwaS5pbmRleE9mKGNvbCkgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0U3RhdGU8VCA9IGFueT4oKTogQ2VsbENvbnRleHRTdGF0ZTxUPiB7XG4gICAgcmV0dXJuIHsgZWRpdGluZzogZmFsc2UsIGZvY3VzZWQ6IGZhbHNlLCBzZWxlY3RlZDogZmFsc2UgfTtcbiAgfVxuXG4gIGNsb25lKCk6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCBjdHggPSBQYmxDZWxsQ29udGV4dC5jcmVhdGU8VD4odGhpcy5fcm93Q29udGV4dCwgdGhpcy5jb2wsIHRoaXMuZXh0QXBpKTtcbiAgICBjdHguZnJvbVN0YXRlKHRoaXMuZ2V0U3RhdGUoKSwgdGhpcy5fcm93Q29udGV4dCwgdHJ1ZSk7XG4gICAgcmV0dXJuIGN0eDtcbiAgfVxuXG4gIGdldFN0YXRlKCk6IENlbGxDb250ZXh0U3RhdGU8VD4ge1xuICAgIHJldHVybiB7XG4gICAgICBlZGl0aW5nOiB0aGlzLl9lZGl0aW5nLFxuICAgICAgZm9jdXNlZDogdGhpcy5fZm9jdXNlZCxcbiAgICAgIHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZCxcbiAgICB9O1xuICB9XG5cbiAgZnJvbVN0YXRlKHN0YXRlOiBDZWxsQ29udGV4dFN0YXRlPFQ+LCByb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+LCBza2lwUm93VXBkYXRlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IHJlcXVpcmVzUmVzZXQgPSAhc2tpcFJvd1VwZGF0ZSAmJiB0aGlzLl9lZGl0aW5nID09PSBzdGF0ZS5lZGl0aW5nO1xuXG4gICAgdGhpcy5fcm93Q29udGV4dCA9IHJvd0NvbnRleHQ7XG4gICAgdGhpcy5fZWRpdGluZyA9IHN0YXRlLmVkaXRpbmc7XG4gICAgdGhpcy5fZm9jdXNlZCA9IHN0YXRlLmZvY3VzZWQ7XG4gICAgdGhpcy5fc2VsZWN0ZWQgPSBzdGF0ZS5zZWxlY3RlZDtcblxuICAgIGlmIChyZXF1aXJlc1Jlc2V0KSB7XG4gICAgICByb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnRFZGl0KG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb2wuZWRpdG9yVHBsICYmICF0aGlzLmVkaXRpbmcpIHtcbiAgICAgIHRoaXMuX2VkaXRpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fcm93Q29udGV4dC51cGRhdGVDZWxsKHRoaXMpO1xuICAgICAgaWYgKG1hcmtGb3JDaGVjaykge1xuICAgICAgICB0aGlzLmdyaWQuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgdHJ1ZSwgdGhpcy5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzdG9wRWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZWRpdGluZyAmJiAhdGhpcy5ncmlkLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICB0aGlzLl9lZGl0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9yb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIHRoaXMuZ3JpZC5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCB0aGlzLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19