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
    static create(col, table) {
        /** @type {?} */
        const instance = new MetaCellContext();
        instance.col = col;
        instance.table = table;
        return instance;
    }
}
if (false) {
    /** @type {?} */
    MetaCellContext.prototype.col;
    /** @type {?} */
    MetaCellContext.prototype.table;
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
            table: { value: extApi.table },
            index: { value: extApi.table.columnApi.indexOf(col) },
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
                this.table._cdkTable.syncRows('data', true, this.rowContext.index);
            }
        }
    }
    /**
     * @param {?=} markForCheck
     * @return {?}
     */
    stopEdit(markForCheck) {
        if (this.editing && !this.table.viewport.isScrolling) {
            this._editing = false;
            this._rowContext.updateCell(this);
            if (markForCheck) {
                this.table._cdkTable.syncRows('data', this.rowContext.index);
            }
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvY29udGV4dC9jZWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFPQSxNQUFNLE9BQU8sZUFBZTs7OztJQUsxQixnQkFBeUIsQ0FBQzs7OztJQUYxQixJQUFJLFNBQVMsS0FBK0IsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztJQVExRCxNQUFNLENBQUMsTUFBTSxDQUFrRSxHQUFTLEVBQUUsS0FBMkI7O2NBQzdHLFFBQVEsR0FBRyxJQUFJLGVBQWUsRUFBVztRQUMvQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNuQixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBRUY7OztJQWpCQyw4QkFBVTs7SUFDVixnQ0FBOEI7Ozs7O0FBa0JoQyxNQUFNLE9BQU8sY0FBYzs7OztJQXNCekI7UUFSUSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQU1BLENBQUM7Ozs7SUFyQjNCLElBQUksU0FBUyxLQUF3QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7SUFDbkQsSUFBSSxHQUFHLEtBQVEsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFBQSxDQUFDOzs7O0lBQ25ELElBQUksS0FBSyxLQUFVLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDeEQsSUFBSSxLQUFLLENBQUMsQ0FBTSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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S0FBSyxDQUFDLENBQUM7YUFDcEU7U0FDRjtJQUNILENBQUM7Ozs7O0lBRUQsUUFBUSxDQUFDLFlBQXNCO1FBQzdCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLFlBQVksRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlEO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7OztJQWxGQywrQkFBdUM7O0lBQ3ZDLCtCQUF1Qjs7Ozs7SUFFdkIsa0NBQXlCOzs7OztJQUN6QixrQ0FBeUI7Ozs7O0lBQ3pCLG1DQUEwQjs7Ozs7SUFFMUIscUNBQXNDOztJQUN0Qyw2QkFBc0I7Ozs7O0lBQ3RCLGdDQUF3QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2VsbENvbnRleHRTdGF0ZSwgUGJsTmdyaWRDZWxsQ29udGV4dCwgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQsIFBibE5ncmlkUm93Q29udGV4dCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgUGJsQ29sdW1uIH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4nO1xuaW1wb3J0IHsgUGJsTWV0YUNvbHVtbiB9IGZyb20gJy4uL2NvbHVtbnMvbWV0YS1jb2x1bW4nO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4vcm93JztcblxuZXhwb3J0IGNsYXNzIE1ldGFDZWxsQ29udGV4dDxUID0gYW55LCBUQ29sIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiA9IFBibE1ldGFDb2x1bW4+IGltcGxlbWVudHMgUGJsTmdyaWRNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4ge1xuICBjb2w6IFRDb2w7XG4gIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+O1xuICBnZXQgJGltcGxpY2l0KCk6IE1ldGFDZWxsQ29udGV4dDxULCBUQ29sPiB7IHJldHVybiB0aGlzOyB9XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge31cblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55LCBUQ29sIGV4dGVuZHMgUGJsTWV0YUNvbHVtbiB8IFBibENvbHVtbiA9IFBibE1ldGFDb2x1bW4+KGNvbDogVENvbCwgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PFQ+KTogTWV0YUNlbGxDb250ZXh0PFQsIFRDb2w+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBNZXRhQ2VsbENvbnRleHQ8VCwgVENvbD4oKTtcbiAgICBpbnN0YW5jZS5jb2wgPSBjb2w7XG4gICAgaW5zdGFuY2UudGFibGUgPSB0YWJsZTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxufVxuXG5leHBvcnQgY2xhc3MgUGJsQ2VsbENvbnRleHQ8VCA9IGFueT4gaW1wbGVtZW50cyBQYmxOZ3JpZENlbGxDb250ZXh0PFQ+IHtcbiAgZ2V0ICRpbXBsaWNpdCgpOiBQYmxDZWxsQ29udGV4dDxUPiB7IHJldHVybiB0aGlzOyB9XG4gIGdldCByb3coKTogVCB7IHJldHVybiB0aGlzLnJvd0NvbnRleHQuJGltcGxpY2l0OyB9O1xuICBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuY29sLmdldFZhbHVlKHRoaXMucm93KTsgfVxuICBzZXQgdmFsdWUodjogYW55KSB7IHRoaXMuY29sLnNldFZhbHVlKHRoaXMucm93LCB2KTsgfVxuXG4gIGdldCByb3dDb250ZXh0KCk6IFBibE5ncmlkUm93Q29udGV4dDxUPiB7IHJldHVybiB0aGlzLl9yb3dDb250ZXh0OyB9XG4gIGdldCBlZGl0aW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZWRpdGluZzsgfVxuICBnZXQgZm9jdXNlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7IH1cbiAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7IH1cblxuICByZWFkb25seSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcbiAgcmVhZG9ubHkgaW5kZXg6IG51bWJlcjtcblxuICBwcml2YXRlIF9lZGl0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfc2VsZWN0ZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9yb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+O1xuICBwdWJsaWMgY29sOiBQYmxDb2x1bW47XG4gIHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPjtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7IH1cblxuICAvLyB3b3JrYXJvdW5kLCB3ZSBuZWVkIGEgcGFyYW1ldGVyLWxlc3MgY29uc3RydWN0b3Igc2luY2UgQG5ndG9vbHMvd2VicGFja0A4LjAuNFxuICAvLyBOb24gQEluamVjdGFibGUgY2xhc3NlcyBhcmUgbm93IGdldHRpbmcgYWRkZGVkIHdpdGggaGFyZCByZWZlcmVuY2UgdG8gdGhlIGN0b3IgcGFyYW1zIHdoaWNoIGF0IHRoZSBjbGFzcyBjcmVhdGlvbiBwb2ludCBhcmUgdW5kZWZpbmVkXG4gIC8vIGZvcndhcmRSZWYoKSB3aWxsIG5vdCBoZWxwIHNpbmNlIGl0J3Mgbm90IGluamVjdCBieSBhbmd1bGFyLCB3ZSBpbnN0YW50aWF0ZSB0aGUgY2xhc3MuLlxuICAvLyBwcm9iYWJseSBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvY29tbWl0LzYzOTE5ODQ5OTk3M2UwZjQzN2YwNTliM2M5MzNjNzJjNzMzZDkzZDhcbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pihyb3dDb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+LCBjb2w6IFBibENvbHVtbiwgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPik6IFBibENlbGxDb250ZXh0PFQ+IHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBQYmxDZWxsQ29udGV4dDxUPigpO1xuXG4gICAgaW5zdGFuY2UuX3Jvd0NvbnRleHQgPSByb3dDb250ZXh0O1xuICAgIGluc3RhbmNlLmNvbCA9IGNvbDtcbiAgICBpbnN0YW5jZS5leHRBcGkgPSBleHRBcGk7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhpbnN0YW5jZSwge1xuICAgICAgdGFibGU6IHsgdmFsdWU6IGV4dEFwaS50YWJsZSB9LFxuICAgICAgaW5kZXg6IHsgdmFsdWU6IGV4dEFwaS50YWJsZS5jb2x1bW5BcGkuaW5kZXhPZihjb2wpIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFN0YXRlPFQgPSBhbnk+KCk6IENlbGxDb250ZXh0U3RhdGU8VD4ge1xuICAgIHJldHVybiB7IGVkaXRpbmc6IGZhbHNlLCBmb2N1c2VkOiBmYWxzZSwgc2VsZWN0ZWQ6IGZhbHNlIH07XG4gIH1cblxuICBjbG9uZSgpOiBQYmxDZWxsQ29udGV4dDxUPiB7XG4gICAgY29uc3QgY3R4ID0gUGJsQ2VsbENvbnRleHQuY3JlYXRlPFQ+KHRoaXMuX3Jvd0NvbnRleHQsIHRoaXMuY29sLCB0aGlzLmV4dEFwaSk7XG4gICAgY3R4LmZyb21TdGF0ZSh0aGlzLmdldFN0YXRlKCksIHRoaXMuX3Jvd0NvbnRleHQsIHRydWUpO1xuICAgIHJldHVybiBjdHg7XG4gIH1cblxuICBnZXRTdGF0ZSgpOiBDZWxsQ29udGV4dFN0YXRlPFQ+IHtcbiAgICByZXR1cm4ge1xuICAgICAgZWRpdGluZzogdGhpcy5fZWRpdGluZyxcbiAgICAgIGZvY3VzZWQ6IHRoaXMuX2ZvY3VzZWQsXG4gICAgICBzZWxlY3RlZDogdGhpcy5fc2VsZWN0ZWQsXG4gICAgfTtcbiAgfVxuXG4gIGZyb21TdGF0ZShzdGF0ZTogQ2VsbENvbnRleHRTdGF0ZTxUPiwgcm93Q29udGV4dDogUGJsUm93Q29udGV4dDxUPiwgc2tpcFJvd1VwZGF0ZT86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCByZXF1aXJlc1Jlc2V0ID0gIXNraXBSb3dVcGRhdGUgJiYgdGhpcy5fZWRpdGluZyA9PT0gc3RhdGUuZWRpdGluZztcblxuICAgIHRoaXMuX3Jvd0NvbnRleHQgPSByb3dDb250ZXh0O1xuICAgIHRoaXMuX2VkaXRpbmcgPSBzdGF0ZS5lZGl0aW5nO1xuICAgIHRoaXMuX2ZvY3VzZWQgPSBzdGF0ZS5mb2N1c2VkO1xuICAgIHRoaXMuX3NlbGVjdGVkID0gc3RhdGUuc2VsZWN0ZWQ7XG5cbiAgICBpZiAocmVxdWlyZXNSZXNldCkge1xuICAgICAgcm93Q29udGV4dC51cGRhdGVDZWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RWRpdChtYXJrRm9yQ2hlY2s/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29sLmVkaXRvclRwbCAmJiAhdGhpcy5lZGl0aW5nKSB7XG4gICAgICB0aGlzLl9lZGl0aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3Jvd0NvbnRleHQudXBkYXRlQ2VsbCh0aGlzKTtcbiAgICAgIGlmIChtYXJrRm9yQ2hlY2spIHtcbiAgICAgICAgdGhpcy50YWJsZS5fY2RrVGFibGUuc3luY1Jvd3MoJ2RhdGEnLCB0cnVlLCB0aGlzLnJvd0NvbnRleHQuaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHN0b3BFZGl0KG1hcmtGb3JDaGVjaz86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5lZGl0aW5nICYmICF0aGlzLnRhYmxlLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICB0aGlzLl9lZGl0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9yb3dDb250ZXh0LnVwZGF0ZUNlbGwodGhpcyk7XG4gICAgICBpZiAobWFya0ZvckNoZWNrKSB7XG4gICAgICAgIHRoaXMudGFibGUuX2Nka1RhYmxlLnN5bmNSb3dzKCdkYXRhJywgdGhpcy5yb3dDb250ZXh0LmluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==