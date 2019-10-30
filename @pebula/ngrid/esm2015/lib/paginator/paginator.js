/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { BehaviorSubject } from 'rxjs';
/**
 * An object with properties representing the change in the paginator.
 * Each property point to a tuple with 2 items.
 * The first item is the old value, the 2nd item is the new value.
 *
 * The properties that can change are page, perPage and total.
 * @record
 * @template T
 */
export function PblPaginatorChangeEvent() { }
if (false) {
    /** @type {?|undefined} */
    PblPaginatorChangeEvent.prototype.page;
    /** @type {?|undefined} */
    PblPaginatorChangeEvent.prototype.perPage;
    /** @type {?|undefined} */
    PblPaginatorChangeEvent.prototype.total;
}
/**
 * @record
 * @template TPage
 */
export function PblPaginator() { }
if (false) {
    /** @type {?} */
    PblPaginator.prototype.kind;
    /**
     * When true will assume that the datasource represents a single page.
     * This is common in server side pagination where pervious data is not cached and each pages is fetched and set as is, i.e. the datasource
     * represents a single page at a time.
     *
     * For example, consider a paginator with 10 items per page, pointing to page 4.
     * When `noCacheMode` is set to `true` the range is [30, 39]
     * When `noCacheMode` is set to `false` the range is [0, 9]
     * @type {?}
     */
    PblPaginator.prototype.noCacheMode;
    /** @type {?} */
    PblPaginator.prototype.perPage;
    /** @type {?} */
    PblPaginator.prototype.page;
    /** @type {?} */
    PblPaginator.prototype.total;
    /** @type {?} */
    PblPaginator.prototype.totalPages;
    /** @type {?} */
    PblPaginator.prototype.range;
    /** @type {?} */
    PblPaginator.prototype.onChange;
    /**
     * @return {?}
     */
    PblPaginator.prototype.reset = function () { };
    /**
     * @param {?} value
     * @return {?}
     */
    PblPaginator.prototype.canMove = function (value) { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.hasNext = function () { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.hasPrev = function () { };
    /**
     * @param {?} value
     * @return {?}
     */
    PblPaginator.prototype.move = function (value) { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.nextPage = function () { };
    /**
     * @return {?}
     */
    PblPaginator.prototype.prevPage = function () { };
}
export class PblTokenPaginator {
    constructor() {
        this.kind = 'token';
        this._perPage = 10;
        this._total = 0;
        this.onChange$ = new BehaviorSubject({ page: [null, null] });
        this.onChange = this.onChange$.asObservable();
        this.reset();
    }
    /**
     * @return {?}
     */
    get perPage() { return this._perPage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set perPage(value) {
        if (value < 1) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._perPage !== value) {
            /** @type {?} */
            const changes = { perPage: [this._perPage, this._perPage = value] };
            this.emit(changes);
        }
    }
    /**
     * @return {?}
     */
    get page() { return this._page; }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        if (this._page !== value) {
            /** @type {?} */
            const idx = this._tokens.indexOf(value);
            if (idx === -1) {
                throw new Error(`Invalid page token ${value}`);
            }
            this._cursor = idx;
            /** @type {?} */
            const prev = this._page;
            this._page = value;
            this.emit({ page: [prev, value] });
        }
    }
    /**
     * @return {?}
     */
    get total() { return this._total; }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) {
        /** @type {?} */
        const changes = { total: [this._total, this._total = value] };
        this.emit(changes);
    }
    /**
     * @return {?}
     */
    get totalPages() {
        return this._tokens.length;
    }
    /**
     * @return {?}
     */
    get range() {
        if (!this._range) {
            /** @type {?} */
            const start = (this._cursor) * this.perPage;
            /** @type {?} */
            const end = Math.min(this._total, start + this.perPage);
            this._range = this.noCacheMode
                ? [0, end - start]
                : [start, end];
        }
        return this._range;
    }
    /**
     * @return {?}
     */
    reset() {
        this._tokens = [null];
        this._cursor = 0;
        this._total = 0;
        this.page = null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    canMove(value) {
        return this._tokens.indexOf(value) > -1;
    }
    /**
     * @return {?}
     */
    hasNext() { return this._cursor < this._tokens.length - 1; }
    /**
     * @return {?}
     */
    hasPrev() { return this._cursor > 0; }
    /**
     * @param {?} value
     * @return {?}
     */
    move(value) { this.page = value; }
    /**
     * @return {?}
     */
    nextPage() { this.page = this._tokens[++this._cursor]; }
    /**
     * @return {?}
     */
    prevPage() { this.page = this._tokens[--this._cursor]; }
    /**
     * @param {?} value
     * @return {?}
     */
    addNext(value) {
        /** @type {?} */
        const nextPointer = this._cursor + 1;
        // if next pointer is not like what we got, set it and delete all after (invalidate them)
        if (this._tokens[nextPointer] !== value) {
            this._tokens[nextPointer] = value;
            this._tokens.splice(nextPointer + 1);
        }
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    emit(changes) {
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.queuedChanges = undefined;
                this.onChange$.next(changes);
            }));
        }
    }
}
if (false) {
    /** @type {?} */
    PblTokenPaginator.prototype.kind;
    /** @type {?} */
    PblTokenPaginator.prototype.noCacheMode;
    /** @type {?} */
    PblTokenPaginator.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype.onChange$;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype.queuedChanges;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._range;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._perPage;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._page;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._total;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._tokens;
    /**
     * @type {?}
     * @protected
     */
    PblTokenPaginator.prototype._cursor;
}
export class PblPagingPaginator {
    constructor() {
        this.kind = 'pageNumber';
        this._total = 0;
        this._perPage = 10;
        this._page = 1;
        this._totalPages = 0;
        this.onChange$ = new BehaviorSubject({ page: [null, 1] });
        this.onChange = this.onChange$.asObservable();
    }
    /**
     * @return {?}
     */
    get perPage() { return this._perPage; }
    /**
     * @param {?} value
     * @return {?}
     */
    set perPage(value) {
        if (value < 1) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._perPage !== value) {
            /** @type {?} */
            const changes = { perPage: [this._perPage, this._perPage = value] };
            /** @type {?} */
            const prev = this._page;
            this.calcPages();
            if (prev !== this._page) {
                changes.page = [prev, this._page];
            }
            this.emit(changes);
        }
    }
    /**
     * Get / Set the current page
     * @return {?}
     */
    get page() { return this._page; }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        if (value < 0 || value > this._totalPages) {
            throw new Error(`Invalid page index ${value}`);
        }
        if (this._page !== value) {
            /** @type {?} */
            const prev = this._page;
            this._page = value;
            this.emit({ page: [prev, value] });
        }
    }
    /**
     * @return {?}
     */
    get total() { return this._total; }
    /**
     * @param {?} value
     * @return {?}
     */
    set total(value) {
        if (value < 0) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._total !== value) {
            /** @type {?} */
            const changes = { total: [this._total, this._total = value] };
            /** @type {?} */
            const prev = this._page;
            this.calcPages();
            if (prev !== this._page) {
                changes.page = [prev, this._page];
            }
            this.emit(changes);
        }
    }
    /**
     * The amount of pages in this paginator
     * @return {?}
     */
    get totalPages() {
        return this._totalPages;
    }
    /**
     * @return {?}
     */
    get range() {
        if (!this._range) {
            /** @type {?} */
            const start = (this.page - 1) * this.perPage;
            /** @type {?} */
            const end = Math.min(this._total, start + this.perPage);
            this._range = this.noCacheMode
                ? [0, end - start]
                : [start, end];
        }
        return this._range;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    canMove(value) {
        /** @type {?} */
        const p = this._page + value;
        return p >= 1 && p <= this.totalPages;
    }
    /**
     * @return {?}
     */
    hasNext() { return this.canMove(1); }
    /**
     * @return {?}
     */
    hasPrev() { return this.canMove(-1); }
    /**
     * @param {?} value
     * @return {?}
     */
    move(value) { this.page = this._page + value; }
    /**
     * @return {?}
     */
    nextPage() { this.move(1); }
    /**
     * @return {?}
     */
    prevPage() { this.move(-1); }
    /**
     * @return {?}
     */
    reset() {
        this.page = 1;
    }
    /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     * @protected
     * @return {?}
     */
    calcPages() {
        this._totalPages = Math.ceil(this._total / this.perPage);
        if (this._totalPages > 0 && this._page > this._totalPages) {
            this.page = this._totalPages;
        }
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    emit(changes) {
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout((/**
             * @return {?}
             */
            () => {
                this.queuedChanges = undefined;
                this.onChange$.next(changes);
            }));
        }
    }
}
if (false) {
    /** @type {?} */
    PblPagingPaginator.prototype.kind;
    /** @type {?} */
    PblPagingPaginator.prototype.noCacheMode;
    /** @type {?} */
    PblPagingPaginator.prototype.onChange;
    /**
     * @type {?}
     * @protected
     */
    PblPagingPaginator.prototype.onChange$;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._total;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._perPage;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._page;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._totalPages;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype._range;
    /**
     * @type {?}
     * @private
     */
    PblPagingPaginator.prototype.queuedChanges;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0b3IvcGFnaW5hdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7O0FBV25ELDZDQUlDOzs7SUFIQyx1Q0FBYzs7SUFDZCwwQ0FBMkI7O0lBQzNCLHdDQUF5Qjs7Ozs7O0FBRzNCLGtDQTRCQzs7O0lBM0JDLDRCQUE0Qjs7Ozs7Ozs7Ozs7SUFVNUIsbUNBQXFCOztJQUVyQiwrQkFBZ0I7O0lBQ2hCLDRCQUFZOztJQUNaLDZCQUFjOztJQUNkLGtDQUE0Qjs7SUFDNUIsNkJBQWlDOztJQUVqQyxnQ0FBcUQ7Ozs7SUFDckQsK0NBQWM7Ozs7O0lBQ2Qsc0RBQStCOzs7O0lBQy9CLGlEQUFtQjs7OztJQUNuQixpREFBbUI7Ozs7O0lBQ25CLG1EQUF5Qjs7OztJQUN6QixrREFBaUI7Ozs7SUFDakIsa0RBQWlCOztBQUluQixNQUFNLE9BQU8saUJBQWlCO0lBOEQ1QjtRQTdEUyxTQUFJLEdBQVksT0FBTyxDQUFDO1FBdUR2QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFLM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBa0MsRUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDOzs7O0lBOURELElBQUksT0FBTyxLQUFhLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQy9DLElBQUksT0FBTyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLEVBQUU7O2tCQUNyQixPQUFPLEdBQW9DLEVBQUUsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3BHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBRUQsSUFBSSxJQUFJLEtBQWEsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDekMsSUFBSSxJQUFJLENBQUMsS0FBYTtRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFOztrQkFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN2QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7O2tCQUNiLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFFRCxJQUFJLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMzQyxJQUFJLEtBQUssQ0FBQyxLQUFhOztjQUNmLE9BQU8sR0FBb0MsRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEVBQUU7UUFDOUYsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsSUFBSSxLQUFLO1FBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7O2tCQUNWLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTzs7a0JBQ3JDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVztnQkFDNUIsQ0FBQyxDQUFDLENBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUU7Z0JBQ3BCLENBQUMsQ0FBQyxDQUFFLEtBQUssRUFBRSxHQUFHLENBQUUsQ0FDakI7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDOzs7O0lBa0JELEtBQUs7UUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCxPQUFPLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDckUsT0FBTyxLQUFjLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvQyxJQUFJLENBQUMsS0FBYSxJQUFVLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7OztJQUNoRCxRQUFRLEtBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUM5RCxRQUFRLEtBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFOUQsT0FBTyxDQUFDLEtBQVU7O2NBQ1YsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztRQUNwQyx5RkFBeUY7UUFDekYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxJQUFJLENBQUMsT0FBd0M7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsVUFBVTs7O1lBQUMsR0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGOzs7SUExR0MsaUNBQWlDOztJQUNqQyx3Q0FBcUI7O0lBa0RyQixxQ0FBK0Q7Ozs7O0lBQy9ELHNDQUFzRTs7Ozs7SUFDdEUsMENBQXFFOzs7OztJQUNyRSxtQ0FBbUM7Ozs7O0lBQ25DLHFDQUFnQzs7Ozs7SUFDaEMsa0NBQXFCOzs7OztJQUNyQixtQ0FBNkI7Ozs7O0lBQzdCLG9DQUF5Qjs7Ozs7SUFDekIsb0NBQTBCOztBQWlENUIsTUFBTSxPQUFPLGtCQUFrQjtJQXdGN0I7UUF2RlMsU0FBSSxHQUFpQixZQUFZLENBQUM7UUErRW5DLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBTXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQWtDLEVBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN6RixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQzs7OztJQXZGRCxJQUFJLE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMvQyxJQUFJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFOztrQkFDckIsT0FBTyxHQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRTs7a0JBRTlGLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztZQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDdkIsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BCO0lBRUgsQ0FBQzs7Ozs7SUFLRCxJQUFJLElBQUksS0FBYSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUN6QyxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTs7a0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFFRCxJQUFJLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMzQyxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFOztrQkFDbkIsT0FBTyxHQUFvQyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRTs7a0JBRXhGLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztZQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDdkIsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkM7WUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7Ozs7SUFLRCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7OztJQUVELElBQUksS0FBSztRQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOztrQkFDVixLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPOztrQkFDdEMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXO2dCQUM1QixDQUFDLENBQUMsQ0FBRSxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBRTtnQkFDcEIsQ0FBQyxDQUFDLENBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBRSxDQUNqQjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBa0JELE9BQU8sQ0FBQyxLQUFhOztjQUNiLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUs7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFDRCxPQUFPLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUM5QyxPQUFPLEtBQWMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvQyxJQUFJLENBQUMsS0FBYSxJQUFVLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBQzdELFFBQVEsS0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUNsQyxRQUFRLEtBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUduQyxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQzs7Ozs7OztJQU1TLFNBQVM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3pELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7OztJQUVPLElBQUksQ0FBQyxPQUF3QztRQUNuRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUM3QixVQUFVOzs7WUFBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0NBQ0Y7OztJQW5JQyxrQ0FBMkM7O0lBQzNDLHlDQUFxQjs7SUEyRXJCLHNDQUErRDs7Ozs7SUFDL0QsdUNBQXNFOzs7OztJQUV0RSxvQ0FBbUI7Ozs7O0lBQ25CLHNDQUFzQjs7Ozs7SUFDdEIsbUNBQWtCOzs7OztJQUNsQix5Q0FBd0I7Ozs7O0lBQ3hCLG9DQUFpQzs7Ozs7SUFFakMsMkNBQW1FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCB0eXBlIFBibE5ncmlkUGFnaW5hdG9yS2luZCA9ICdwYWdlTnVtYmVyJyB8ICd0b2tlbic7XG5cbi8qKlxuICogQW4gb2JqZWN0IHdpdGggcHJvcGVydGllcyByZXByZXNlbnRpbmcgdGhlIGNoYW5nZSBpbiB0aGUgcGFnaW5hdG9yLlxuICogRWFjaCBwcm9wZXJ0eSBwb2ludCB0byBhIHR1cGxlIHdpdGggMiBpdGVtcy5cbiAqIFRoZSBmaXJzdCBpdGVtIGlzIHRoZSBvbGQgdmFsdWUsIHRoZSAybmQgaXRlbSBpcyB0aGUgbmV3IHZhbHVlLlxuICpcbiAqIFRoZSBwcm9wZXJ0aWVzIHRoYXQgY2FuIGNoYW5nZSBhcmUgcGFnZSwgcGVyUGFnZSBhbmQgdG90YWwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8VCA9IGFueT4ge1xuICBwYWdlPzogW1QsIFRdO1xuICBwZXJQYWdlPzogW251bWJlciwgbnVtYmVyXTtcbiAgdG90YWw/OiBbbnVtYmVyLCBudW1iZXJdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibFBhZ2luYXRvcjxUUGFnZT4ge1xuICBraW5kOiBQYmxOZ3JpZFBhZ2luYXRvcktpbmQ7XG4gIC8qKlxuICAgKiBXaGVuIHRydWUgd2lsbCBhc3N1bWUgdGhhdCB0aGUgZGF0YXNvdXJjZSByZXByZXNlbnRzIGEgc2luZ2xlIHBhZ2UuXG4gICAqIFRoaXMgaXMgY29tbW9uIGluIHNlcnZlciBzaWRlIHBhZ2luYXRpb24gd2hlcmUgcGVydmlvdXMgZGF0YSBpcyBub3QgY2FjaGVkIGFuZCBlYWNoIHBhZ2VzIGlzIGZldGNoZWQgYW5kIHNldCBhcyBpcywgaS5lLiB0aGUgZGF0YXNvdXJjZVxuICAgKiByZXByZXNlbnRzIGEgc2luZ2xlIHBhZ2UgYXQgYSB0aW1lLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgY29uc2lkZXIgYSBwYWdpbmF0b3Igd2l0aCAxMCBpdGVtcyBwZXIgcGFnZSwgcG9pbnRpbmcgdG8gcGFnZSA0LlxuICAgKiBXaGVuIGBub0NhY2hlTW9kZWAgaXMgc2V0IHRvIGB0cnVlYCB0aGUgcmFuZ2UgaXMgWzMwLCAzOV1cbiAgICogV2hlbiBgbm9DYWNoZU1vZGVgIGlzIHNldCB0byBgZmFsc2VgIHRoZSByYW5nZSBpcyBbMCwgOV1cbiAgICovXG4gIG5vQ2FjaGVNb2RlOiBib29sZWFuO1xuXG4gIHBlclBhZ2U6IG51bWJlcjtcbiAgcGFnZTogVFBhZ2U7XG4gIHRvdGFsOiBudW1iZXI7XG4gIHJlYWRvbmx5IHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgcmVhZG9ubHkgcmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG5cbiAgb25DaGFuZ2U6IE9ic2VydmFibGU8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8VFBhZ2U+PjtcbiAgcmVzZXQoKTogdm9pZDtcbiAgY2FuTW92ZSh2YWx1ZTogVFBhZ2UpOiBib29sZWFuO1xuICBoYXNOZXh0KCk6IGJvb2xlYW47XG4gIGhhc1ByZXYoKTogYm9vbGVhbjtcbiAgbW92ZSh2YWx1ZTogVFBhZ2UpOiB2b2lkO1xuICBuZXh0UGFnZSgpOiB2b2lkO1xuICBwcmV2UGFnZSgpOiB2b2lkO1xuXG59XG5cbmV4cG9ydCBjbGFzcyBQYmxUb2tlblBhZ2luYXRvciBpbXBsZW1lbnRzIFBibFBhZ2luYXRvcjxzdHJpbmc+IHtcbiAgcmVhZG9ubHkga2luZDogJ3Rva2VuJyA9ICd0b2tlbic7XG4gIG5vQ2FjaGVNb2RlOiBib29sZWFuO1xuXG4gIGdldCBwZXJQYWdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9wZXJQYWdlOyB9XG4gIHNldCBwZXJQYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdG90YWwgc2l6ZSB2YWx1ZSAke3ZhbHVlfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZXJQYWdlICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPiA9IHsgcGVyUGFnZTogW3RoaXMuX3BlclBhZ2UsIHRoaXMuX3BlclBhZ2UgPSB2YWx1ZV0gfTtcbiAgICAgIHRoaXMuZW1pdChjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcGFnZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcGFnZTsgfVxuICBzZXQgcGFnZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX3BhZ2UgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBpZHggPSB0aGlzLl90b2tlbnMuaW5kZXhPZih2YWx1ZSk7XG4gICAgICBpZiAoaWR4ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGFnZSB0b2tlbiAke3ZhbHVlfWApO1xuICAgICAgfVxuICAgICAgdGhpcy5fY3Vyc29yID0gaWR4O1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX3BhZ2U7XG4gICAgICB0aGlzLl9wYWdlID0gdmFsdWU7XG4gICAgICB0aGlzLmVtaXQoeyBwYWdlOiBbcHJldiwgdmFsdWVdIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0b3RhbCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG90YWw7IH1cbiAgc2V0IHRvdGFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICBjb25zdCBjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+ID0geyB0b3RhbDogW3RoaXMuX3RvdGFsLCB0aGlzLl90b3RhbCA9IHZhbHVlXSB9O1xuICAgIHRoaXMuZW1pdChjaGFuZ2VzKTtcbiAgfVxuXG4gIGdldCB0b3RhbFBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3Rva2Vucy5sZW5ndGg7XG4gIH1cblxuICBnZXQgcmFuZ2UoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgaWYgKCF0aGlzLl9yYW5nZSkge1xuICAgICAgY29uc3Qgc3RhcnQgPSAodGhpcy5fY3Vyc29yKSAqIHRoaXMucGVyUGFnZTtcbiAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHRoaXMuX3RvdGFsLCBzdGFydCArIHRoaXMucGVyUGFnZSk7XG4gICAgICB0aGlzLl9yYW5nZSA9IHRoaXMubm9DYWNoZU1vZGVcbiAgICAgICAgPyBbIDAsIGVuZCAtIHN0YXJ0IF1cbiAgICAgICAgOiBbIHN0YXJ0LCBlbmQgXVxuICAgICAgO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XG4gIH1cblxuICByZWFkb25seSBvbkNoYW5nZTogT2JzZXJ2YWJsZTxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+PjtcbiAgcHJvdGVjdGVkIG9uQ2hhbmdlJDogQmVoYXZpb3JTdWJqZWN0PFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4+O1xuICBwcm90ZWN0ZWQgcXVldWVkQ2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPiB8IHVuZGVmaW5lZDtcbiAgcHJvdGVjdGVkIF9yYW5nZTogW251bWJlciwgbnVtYmVyXTtcbiAgcHJvdGVjdGVkIF9wZXJQYWdlOiBudW1iZXIgPSAxMDtcbiAgcHJvdGVjdGVkIF9wYWdlOiBhbnk7XG4gIHByb3RlY3RlZCBfdG90YWw6IG51bWJlciA9IDA7XG4gIHByb3RlY3RlZCBfdG9rZW5zOiBhbnlbXTtcbiAgcHJvdGVjdGVkIF9jdXJzb3I6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uQ2hhbmdlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPj4oe3BhZ2U6IFtudWxsLCBudWxsXX0pO1xuICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlJC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLnJlc2V0KCk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLl90b2tlbnMgPSBbbnVsbF07XG4gICAgdGhpcy5fY3Vyc29yID0gMDtcbiAgICB0aGlzLl90b3RhbCA9IDA7XG4gICAgdGhpcy5wYWdlID0gbnVsbDtcbiAgfVxuXG4gIGNhbk1vdmUodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl90b2tlbnMuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbiAgfVxuXG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jdXJzb3IgPCB0aGlzLl90b2tlbnMubGVuZ3RoIC0gMTsgfVxuICBoYXNQcmV2KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY3Vyc29yID4gMDsgfVxuXG4gIG1vdmUodmFsdWU6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnBhZ2UgPSB2YWx1ZTsgfVxuICBuZXh0UGFnZSgpOiB2b2lkIHsgdGhpcy5wYWdlID0gdGhpcy5fdG9rZW5zWysrdGhpcy5fY3Vyc29yXTsgfVxuICBwcmV2UGFnZSgpOiB2b2lkIHsgdGhpcy5wYWdlID0gdGhpcy5fdG9rZW5zWy0tdGhpcy5fY3Vyc29yXTsgfVxuXG4gIGFkZE5leHQodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IG5leHRQb2ludGVyID0gdGhpcy5fY3Vyc29yICsgMTtcbiAgICAvLyBpZiBuZXh0IHBvaW50ZXIgaXMgbm90IGxpa2Ugd2hhdCB3ZSBnb3QsIHNldCBpdCBhbmQgZGVsZXRlIGFsbCBhZnRlciAoaW52YWxpZGF0ZSB0aGVtKVxuICAgIGlmICh0aGlzLl90b2tlbnNbbmV4dFBvaW50ZXJdICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fdG9rZW5zW25leHRQb2ludGVyXSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdG9rZW5zLnNwbGljZShuZXh0UG9pbnRlciArIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdChjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+KTogdm9pZCB7XG4gICAgdGhpcy5fcmFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMucXVldWVkQ2hhbmdlcykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnF1ZXVlZENoYW5nZXMsIGNoYW5nZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXVlZENoYW5nZXMgPSBjaGFuZ2VzO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucXVldWVkQ2hhbmdlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSQubmV4dChjaGFuZ2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsUGFnaW5nUGFnaW5hdG9yIGltcGxlbWVudHMgUGJsUGFnaW5hdG9yPG51bWJlcj4ge1xuICByZWFkb25seSBraW5kOiAncGFnZU51bWJlcicgPSAncGFnZU51bWJlcic7XG4gIG5vQ2FjaGVNb2RlOiBib29sZWFuO1xuXG4gIGdldCBwZXJQYWdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9wZXJQYWdlOyB9XG4gIHNldCBwZXJQYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdG90YWwgc2l6ZSB2YWx1ZSAke3ZhbHVlfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wZXJQYWdlICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPiA9IHsgcGVyUGFnZTogW3RoaXMuX3BlclBhZ2UsIHRoaXMuX3BlclBhZ2UgPSB2YWx1ZV0gfTtcblxuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX3BhZ2U7XG4gICAgICB0aGlzLmNhbGNQYWdlcygpO1xuICAgICAgaWYgKHByZXYgIT09IHRoaXMuX3BhZ2UpIHtcbiAgICAgICAgY2hhbmdlcy5wYWdlID0gW3ByZXYsIHRoaXMuX3BhZ2VdO1xuICAgICAgfVxuICAgICAgdGhpcy5lbWl0KGNoYW5nZXMpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIEdldCAvIFNldCB0aGUgY3VycmVudCBwYWdlXG4gICAqL1xuICBnZXQgcGFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGFnZTsgfVxuICBzZXQgcGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IHRoaXMuX3RvdGFsUGFnZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYWdlIGluZGV4ICR7dmFsdWV9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BhZ2UgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fcGFnZTtcbiAgICAgIHRoaXMuX3BhZ2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZW1pdCh7IHBhZ2U6IFtwcmV2LCB2YWx1ZV0gfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRvdGFsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3RhbDsgfVxuICBzZXQgdG90YWwodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0b3RhbCBzaXplIHZhbHVlICR7dmFsdWV9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3RvdGFsICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPiA9IHsgdG90YWw6IFt0aGlzLl90b3RhbCwgdGhpcy5fdG90YWwgPSB2YWx1ZV0gfTtcblxuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX3BhZ2U7XG4gICAgICB0aGlzLmNhbGNQYWdlcygpO1xuICAgICAgaWYgKHByZXYgIT09IHRoaXMuX3BhZ2UpIHtcbiAgICAgICAgY2hhbmdlcy5wYWdlID0gW3ByZXYsIHRoaXMuX3BhZ2VdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhbW91bnQgb2YgcGFnZXMgaW4gdGhpcyBwYWdpbmF0b3JcbiAgICovXG4gIGdldCB0b3RhbFBhZ2VzKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3RvdGFsUGFnZXM7XG4gIH1cblxuICBnZXQgcmFuZ2UoKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgaWYgKCF0aGlzLl9yYW5nZSkge1xuICAgICAgY29uc3Qgc3RhcnQgPSAodGhpcy5wYWdlIC0gMSkgKiB0aGlzLnBlclBhZ2U7XG4gICAgICBjb25zdCBlbmQgPSBNYXRoLm1pbih0aGlzLl90b3RhbCwgc3RhcnQgKyB0aGlzLnBlclBhZ2UpO1xuICAgICAgdGhpcy5fcmFuZ2UgPSB0aGlzLm5vQ2FjaGVNb2RlXG4gICAgICAgID8gWyAwLCBlbmQgLSBzdGFydCBdXG4gICAgICAgIDogWyBzdGFydCwgZW5kIF1cbiAgICAgIDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xuICB9XG5cbiAgcmVhZG9ubHkgb25DaGFuZ2U6IE9ic2VydmFibGU8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPj47XG4gIHByb3RlY3RlZCBvbkNoYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+PjtcblxuICBwcml2YXRlIF90b3RhbCA9IDA7XG4gIHByaXZhdGUgX3BlclBhZ2UgPSAxMDtcbiAgcHJpdmF0ZSBfcGFnZSA9IDE7XG4gIHByaXZhdGUgX3RvdGFsUGFnZXMgPSAwO1xuICBwcml2YXRlIF9yYW5nZTogW251bWJlciwgbnVtYmVyXTtcblxuICBwcml2YXRlIHF1ZXVlZENoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4gfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbkNoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4+KHtwYWdlOiBbbnVsbCwgMV19KTtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICBjYW5Nb3ZlKHZhbHVlOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBjb25zdCBwID0gdGhpcy5fcGFnZSArIHZhbHVlO1xuICAgIHJldHVybiBwID49IDEgJiYgcCA8PSB0aGlzLnRvdGFsUGFnZXM7XG4gIH1cbiAgaGFzTmV4dCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY2FuTW92ZSgxKTsgfVxuICBoYXNQcmV2KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5jYW5Nb3ZlKC0xKTsgfVxuXG4gIG1vdmUodmFsdWU6IG51bWJlcik6IHZvaWQgeyB0aGlzLnBhZ2UgPSB0aGlzLl9wYWdlICsgdmFsdWU7IH1cbiAgbmV4dFBhZ2UoKTogdm9pZCB7IHRoaXMubW92ZSgxKTsgfVxuICBwcmV2UGFnZSgpOiB2b2lkIHsgdGhpcy5tb3ZlKC0xKTsgfVxuXG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlID0gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiBwYWdlcy5cbiAgICogcmV0dXJucyB0cnVlIGlmIHRoZSBjdXJyZW50IHBhZ2UgaGFzIGNoYW5nZWQgZHVlIHRvIGNhbGN1bGF0aW9uLiAoY3VycmVudCBwYWdlIFxcPiBuZXcgcGFnZXMgdmFsdWUpXG4gICAqL1xuICBwcm90ZWN0ZWQgY2FsY1BhZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMuX3RvdGFsUGFnZXMgPSBNYXRoLmNlaWwodGhpcy5fdG90YWwgLyB0aGlzLnBlclBhZ2UpO1xuICAgIGlmICh0aGlzLl90b3RhbFBhZ2VzID4gMCAmJiB0aGlzLl9wYWdlID4gdGhpcy5fdG90YWxQYWdlcykge1xuICAgICAgdGhpcy5wYWdlID0gdGhpcy5fdG90YWxQYWdlcztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXQoY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPik6IHZvaWQge1xuICAgIHRoaXMuX3JhbmdlID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLnF1ZXVlZENoYW5nZXMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5xdWV1ZWRDaGFuZ2VzLCBjaGFuZ2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZWRDaGFuZ2VzID0gY2hhbmdlcztcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnF1ZXVlZENoYW5nZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub25DaGFuZ2UkLm5leHQoY2hhbmdlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==