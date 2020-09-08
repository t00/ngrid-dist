/**
 * @fileoverview added by tsickle
 * Generated from: lib/paginator/paginator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0b3IvcGFnaW5hdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQVduRCw2Q0FJQzs7O0lBSEMsdUNBQWM7O0lBQ2QsMENBQTJCOztJQUMzQix3Q0FBeUI7Ozs7OztBQUczQixrQ0E0QkM7OztJQTNCQyw0QkFBNEI7Ozs7Ozs7Ozs7O0lBVTVCLG1DQUFxQjs7SUFFckIsK0JBQWdCOztJQUNoQiw0QkFBWTs7SUFDWiw2QkFBYzs7SUFDZCxrQ0FBNEI7O0lBQzVCLDZCQUFpQzs7SUFFakMsZ0NBQXFEOzs7O0lBQ3JELCtDQUFjOzs7OztJQUNkLHNEQUErQjs7OztJQUMvQixpREFBbUI7Ozs7SUFDbkIsaURBQW1COzs7OztJQUNuQixtREFBeUI7Ozs7SUFDekIsa0RBQWlCOzs7O0lBQ2pCLGtEQUFpQjs7QUFJbkIsTUFBTSxPQUFPLGlCQUFpQjtJQThENUI7UUE3RFMsU0FBSSxHQUFZLE9BQU8sQ0FBQztRQXVEdkIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUV0QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBSzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQWtDLEVBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7OztJQTlERCxJQUFJLE9BQU8sS0FBYSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMvQyxJQUFJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FB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QyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGOzs7SUFuSUMsa0NBQTJDOztJQUMzQyx5Q0FBcUI7O0lBMkVyQixzQ0FBK0Q7Ozs7O0lBQy9ELHVDQUFzRTs7Ozs7SUFFdEUsb0NBQW1COzs7OztJQUNuQixzQ0FBc0I7Ozs7O0lBQ3RCLG1DQUFrQjs7Ozs7SUFDbEIseUNBQXdCOzs7OztJQUN4QixvQ0FBaUM7Ozs7O0lBRWpDLDJDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgdHlwZSBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgPSAncGFnZU51bWJlcicgfCAndG9rZW4nO1xuXG4vKipcbiAqIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgcmVwcmVzZW50aW5nIHRoZSBjaGFuZ2UgaW4gdGhlIHBhZ2luYXRvci5cbiAqIEVhY2ggcHJvcGVydHkgcG9pbnQgdG8gYSB0dXBsZSB3aXRoIDIgaXRlbXMuXG4gKiBUaGUgZmlyc3QgaXRlbSBpcyB0aGUgb2xkIHZhbHVlLCB0aGUgMm5kIGl0ZW0gaXMgdGhlIG5ldyB2YWx1ZS5cbiAqXG4gKiBUaGUgcHJvcGVydGllcyB0aGF0IGNhbiBjaGFuZ2UgYXJlIHBhZ2UsIHBlclBhZ2UgYW5kIHRvdGFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PFQgPSBhbnk+IHtcbiAgcGFnZT86IFtULCBUXTtcbiAgcGVyUGFnZT86IFtudW1iZXIsIG51bWJlcl07XG4gIHRvdGFsPzogW251bWJlciwgbnVtYmVyXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxQYWdpbmF0b3I8VFBhZ2U+IHtcbiAga2luZDogUGJsTmdyaWRQYWdpbmF0b3JLaW5kO1xuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwgYXNzdW1lIHRoYXQgdGhlIGRhdGFzb3VyY2UgcmVwcmVzZW50cyBhIHNpbmdsZSBwYWdlLlxuICAgKiBUaGlzIGlzIGNvbW1vbiBpbiBzZXJ2ZXIgc2lkZSBwYWdpbmF0aW9uIHdoZXJlIHBlcnZpb3VzIGRhdGEgaXMgbm90IGNhY2hlZCBhbmQgZWFjaCBwYWdlcyBpcyBmZXRjaGVkIGFuZCBzZXQgYXMgaXMsIGkuZS4gdGhlIGRhdGFzb3VyY2VcbiAgICogcmVwcmVzZW50cyBhIHNpbmdsZSBwYWdlIGF0IGEgdGltZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgcGFnaW5hdG9yIHdpdGggMTAgaXRlbXMgcGVyIHBhZ2UsIHBvaW50aW5nIHRvIHBhZ2UgNC5cbiAgICogV2hlbiBgbm9DYWNoZU1vZGVgIGlzIHNldCB0byBgdHJ1ZWAgdGhlIHJhbmdlIGlzIFszMCwgMzldXG4gICAqIFdoZW4gYG5vQ2FjaGVNb2RlYCBpcyBzZXQgdG8gYGZhbHNlYCB0aGUgcmFuZ2UgaXMgWzAsIDldXG4gICAqL1xuICBub0NhY2hlTW9kZTogYm9vbGVhbjtcblxuICBwZXJQYWdlOiBudW1iZXI7XG4gIHBhZ2U6IFRQYWdlO1xuICB0b3RhbDogbnVtYmVyO1xuICByZWFkb25seSB0b3RhbFBhZ2VzOiBudW1iZXI7XG4gIHJlYWRvbmx5IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIG9uQ2hhbmdlOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PFRQYWdlPj47XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIGNhbk1vdmUodmFsdWU6IFRQYWdlKTogYm9vbGVhbjtcbiAgaGFzTmV4dCgpOiBib29sZWFuO1xuICBoYXNQcmV2KCk6IGJvb2xlYW47XG4gIG1vdmUodmFsdWU6IFRQYWdlKTogdm9pZDtcbiAgbmV4dFBhZ2UoKTogdm9pZDtcbiAgcHJldlBhZ2UoKTogdm9pZDtcblxufVxuXG5leHBvcnQgY2xhc3MgUGJsVG9rZW5QYWdpbmF0b3IgaW1wbGVtZW50cyBQYmxQYWdpbmF0b3I8c3RyaW5nPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICd0b2tlbicgPSAndG9rZW4nO1xuICBub0NhY2hlTW9kZTogYm9vbGVhbjtcblxuICBnZXQgcGVyUGFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGVyUGFnZTsgfVxuICBzZXQgcGVyUGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRvdGFsIHNpemUgdmFsdWUgJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVyUGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4gPSB7IHBlclBhZ2U6IFt0aGlzLl9wZXJQYWdlLCB0aGlzLl9wZXJQYWdlID0gdmFsdWVdIH07XG4gICAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHBhZ2UoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3BhZ2U7IH1cbiAgc2V0IHBhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9wYWdlICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgaWR4ID0gdGhpcy5fdG9rZW5zLmluZGV4T2YodmFsdWUpO1xuICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhZ2UgdG9rZW4gJHt2YWx1ZX1gKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2N1cnNvciA9IGlkeDtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5fcGFnZSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0KHsgcGFnZTogW3ByZXYsIHZhbHVlXSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgdG90YWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvdGFsOyB9XG4gIHNldCB0b3RhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPiA9IHsgdG90YWw6IFt0aGlzLl90b3RhbCwgdGhpcy5fdG90YWwgPSB2YWx1ZV0gfTtcbiAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gIH1cblxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b2tlbnMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IHJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGlmICghdGhpcy5fcmFuZ2UpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gKHRoaXMuX2N1cnNvcikgKiB0aGlzLnBlclBhZ2U7XG4gICAgICBjb25zdCBlbmQgPSBNYXRoLm1pbih0aGlzLl90b3RhbCwgc3RhcnQgKyB0aGlzLnBlclBhZ2UpO1xuICAgICAgdGhpcy5fcmFuZ2UgPSB0aGlzLm5vQ2FjaGVNb2RlXG4gICAgICAgID8gWyAwLCBlbmQgLSBzdGFydCBdXG4gICAgICAgIDogWyBzdGFydCwgZW5kIF1cbiAgICAgIDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xuICB9XG5cbiAgcmVhZG9ubHkgb25DaGFuZ2U6IE9ic2VydmFibGU8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPj47XG4gIHByb3RlY3RlZCBvbkNoYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+PjtcbiAgcHJvdGVjdGVkIHF1ZXVlZENoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4gfCB1bmRlZmluZWQ7XG4gIHByb3RlY3RlZCBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG4gIHByb3RlY3RlZCBfcGVyUGFnZTogbnVtYmVyID0gMTA7XG4gIHByb3RlY3RlZCBfcGFnZTogYW55O1xuICBwcm90ZWN0ZWQgX3RvdGFsOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3Rva2VuczogYW55W107XG4gIHByb3RlY3RlZCBfY3Vyc29yOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbkNoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4+KHtwYWdlOiBbbnVsbCwgbnVsbF19KTtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9rZW5zID0gW251bGxdO1xuICAgIHRoaXMuX2N1cnNvciA9IDA7XG4gICAgdGhpcy5fdG90YWwgPSAwO1xuICAgIHRoaXMucGFnZSA9IG51bGw7XG4gIH1cblxuICBjYW5Nb3ZlKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdG9rZW5zLmluZGV4T2YodmFsdWUpID4gLTE7XG4gIH1cblxuICBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY3Vyc29yIDwgdGhpcy5fdG9rZW5zLmxlbmd0aCAtIDE7IH1cbiAgaGFzUHJldigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2N1cnNvciA+IDA7IH1cblxuICBtb3ZlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5wYWdlID0gdmFsdWU7IH1cbiAgbmV4dFBhZ2UoKTogdm9pZCB7IHRoaXMucGFnZSA9IHRoaXMuX3Rva2Vuc1srK3RoaXMuX2N1cnNvcl07IH1cbiAgcHJldlBhZ2UoKTogdm9pZCB7IHRoaXMucGFnZSA9IHRoaXMuX3Rva2Vuc1stLXRoaXMuX2N1cnNvcl07IH1cblxuICBhZGROZXh0KHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0UG9pbnRlciA9IHRoaXMuX2N1cnNvciArIDE7XG4gICAgLy8gaWYgbmV4dCBwb2ludGVyIGlzIG5vdCBsaWtlIHdoYXQgd2UgZ290LCBzZXQgaXQgYW5kIGRlbGV0ZSBhbGwgYWZ0ZXIgKGludmFsaWRhdGUgdGhlbSlcbiAgICBpZiAodGhpcy5fdG9rZW5zW25leHRQb2ludGVyXSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3Rva2Vuc1tuZXh0UG9pbnRlcl0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3Rva2Vucy5zcGxpY2UobmV4dFBvaW50ZXIgKyAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXQoY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX3JhbmdlID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLnF1ZXVlZENoYW5nZXMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5xdWV1ZWRDaGFuZ2VzLCBjaGFuZ2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZWRDaGFuZ2VzID0gY2hhbmdlcztcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnF1ZXVlZENoYW5nZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub25DaGFuZ2UkLm5leHQoY2hhbmdlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibFBhZ2luZ1BhZ2luYXRvciBpbXBsZW1lbnRzIFBibFBhZ2luYXRvcjxudW1iZXI+IHtcbiAgcmVhZG9ubHkga2luZDogJ3BhZ2VOdW1iZXInID0gJ3BhZ2VOdW1iZXInO1xuICBub0NhY2hlTW9kZTogYm9vbGVhbjtcblxuICBnZXQgcGVyUGFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGVyUGFnZTsgfVxuICBzZXQgcGVyUGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRvdGFsIHNpemUgdmFsdWUgJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVyUGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4gPSB7IHBlclBhZ2U6IFt0aGlzLl9wZXJQYWdlLCB0aGlzLl9wZXJQYWdlID0gdmFsdWVdIH07XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5jYWxjUGFnZXMoKTtcbiAgICAgIGlmIChwcmV2ICE9PSB0aGlzLl9wYWdlKSB7XG4gICAgICAgIGNoYW5nZXMucGFnZSA9IFtwcmV2LCB0aGlzLl9wYWdlXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdChjaGFuZ2VzKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgLyBTZXQgdGhlIGN1cnJlbnQgcGFnZVxuICAgKi9cbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BhZ2U7IH1cbiAgc2V0IHBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiB0aGlzLl90b3RhbFBhZ2VzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGFnZSBpbmRleCAke3ZhbHVlfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wYWdlICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX3BhZ2U7XG4gICAgICB0aGlzLl9wYWdlID0gdmFsdWU7XG4gICAgICB0aGlzLmVtaXQoeyBwYWdlOiBbcHJldiwgdmFsdWVdIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0b3RhbCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG90YWw7IH1cbiAgc2V0IHRvdGFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdG90YWwgc2l6ZSB2YWx1ZSAke3ZhbHVlfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl90b3RhbCAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4gPSB7IHRvdGFsOiBbdGhpcy5fdG90YWwsIHRoaXMuX3RvdGFsID0gdmFsdWVdIH07XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5jYWxjUGFnZXMoKTtcbiAgICAgIGlmIChwcmV2ICE9PSB0aGlzLl9wYWdlKSB7XG4gICAgICAgIGNoYW5nZXMucGFnZSA9IFtwcmV2LCB0aGlzLl9wYWdlXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWl0KGNoYW5nZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYW1vdW50IG9mIHBhZ2VzIGluIHRoaXMgcGFnaW5hdG9yXG4gICAqL1xuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFBhZ2VzO1xuICB9XG5cbiAgZ2V0IHJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGlmICghdGhpcy5fcmFuZ2UpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gKHRoaXMucGFnZSAtIDEpICogdGhpcy5wZXJQYWdlO1xuICAgICAgY29uc3QgZW5kID0gTWF0aC5taW4odGhpcy5fdG90YWwsIHN0YXJ0ICsgdGhpcy5wZXJQYWdlKTtcbiAgICAgIHRoaXMuX3JhbmdlID0gdGhpcy5ub0NhY2hlTW9kZVxuICAgICAgICA/IFsgMCwgZW5kIC0gc3RhcnQgXVxuICAgICAgICA6IFsgc3RhcnQsIGVuZCBdXG4gICAgICA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yYW5nZTtcbiAgfVxuXG4gIHJlYWRvbmx5IG9uQ2hhbmdlOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4+O1xuICBwcm90ZWN0ZWQgb25DaGFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPj47XG5cbiAgcHJpdmF0ZSBfdG90YWwgPSAwO1xuICBwcml2YXRlIF9wZXJQYWdlID0gMTA7XG4gIHByaXZhdGUgX3BhZ2UgPSAxO1xuICBwcml2YXRlIF90b3RhbFBhZ2VzID0gMDtcbiAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG5cbiAgcHJpdmF0ZSBxdWV1ZWRDaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+IHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub25DaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+Pih7cGFnZTogW251bGwsIDFdfSk7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY2FuTW92ZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcCA9IHRoaXMuX3BhZ2UgKyB2YWx1ZTtcbiAgICByZXR1cm4gcCA+PSAxICYmIHAgPD0gdGhpcy50b3RhbFBhZ2VzO1xuICB9XG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmNhbk1vdmUoMSk7IH1cbiAgaGFzUHJldigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY2FuTW92ZSgtMSk7IH1cblxuICBtb3ZlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5wYWdlID0gdGhpcy5fcGFnZSArIHZhbHVlOyB9XG4gIG5leHRQYWdlKCk6IHZvaWQgeyB0aGlzLm1vdmUoMSk7IH1cbiAgcHJldlBhZ2UoKTogdm9pZCB7IHRoaXMubW92ZSgtMSk7IH1cblxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMucGFnZSA9IDE7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBudW1iZXIgb2YgcGFnZXMuXG4gICAqIHJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBwYWdlIGhhcyBjaGFuZ2VkIGR1ZSB0byBjYWxjdWxhdGlvbi4gKGN1cnJlbnQgcGFnZSBcXD4gbmV3IHBhZ2VzIHZhbHVlKVxuICAgKi9cbiAgcHJvdGVjdGVkIGNhbGNQYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl90b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuX3RvdGFsIC8gdGhpcy5wZXJQYWdlKTtcbiAgICBpZiAodGhpcy5fdG90YWxQYWdlcyA+IDAgJiYgdGhpcy5fcGFnZSA+IHRoaXMuX3RvdGFsUGFnZXMpIHtcbiAgICAgIHRoaXMucGFnZSA9IHRoaXMuX3RvdGFsUGFnZXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0KGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4pOiB2b2lkIHtcbiAgICB0aGlzLl9yYW5nZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5xdWV1ZWRDaGFuZ2VzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMucXVldWVkQ2hhbmdlcywgY2hhbmdlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVldWVkQ2hhbmdlcyA9IGNoYW5nZXM7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5xdWV1ZWRDaGFuZ2VzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlJC5uZXh0KGNoYW5nZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=