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
var PblTokenPaginator = /** @class */ (function () {
    function PblTokenPaginator() {
        this.kind = 'token';
        this._perPage = 10;
        this._total = 0;
        this.onChange$ = new BehaviorSubject({ page: [null, null] });
        this.onChange = this.onChange$.asObservable();
        this.reset();
    }
    Object.defineProperty(PblTokenPaginator.prototype, "perPage", {
        get: /**
         * @return {?}
         */
        function () { return this._perPage; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value < 1) {
                throw new Error("Invalid total size value " + value);
            }
            if (this._perPage !== value) {
                /** @type {?} */
                var changes = { perPage: [this._perPage, this._perPage = value] };
                this.emit(changes);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblTokenPaginator.prototype, "page", {
        get: /**
         * @return {?}
         */
        function () { return this._page; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._page !== value) {
                /** @type {?} */
                var idx = this._tokens.indexOf(value);
                if (idx === -1) {
                    throw new Error("Invalid page token " + value);
                }
                this._cursor = idx;
                /** @type {?} */
                var prev = this._page;
                this._page = value;
                this.emit({ page: [prev, value] });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblTokenPaginator.prototype, "total", {
        get: /**
         * @return {?}
         */
        function () { return this._total; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var changes = { total: [this._total, this._total = value] };
            this.emit(changes);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblTokenPaginator.prototype, "totalPages", {
        get: /**
         * @return {?}
         */
        function () {
            return this._tokens.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblTokenPaginator.prototype, "range", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this._range) {
                /** @type {?} */
                var start = (this._cursor) * this.perPage;
                /** @type {?} */
                var end = Math.min(this._total, start + this.perPage);
                this._range = this.noCacheMode
                    ? [0, end - start]
                    : [start, end];
            }
            return this._range;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblTokenPaginator.prototype.reset = /**
     * @return {?}
     */
    function () {
        this._tokens = [null];
        this._cursor = 0;
        this._total = 0;
        this.page = null;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PblTokenPaginator.prototype.canMove = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._tokens.indexOf(value) > -1;
    };
    /**
     * @return {?}
     */
    PblTokenPaginator.prototype.hasNext = /**
     * @return {?}
     */
    function () { return this._cursor < this._tokens.length - 1; };
    /**
     * @return {?}
     */
    PblTokenPaginator.prototype.hasPrev = /**
     * @return {?}
     */
    function () { return this._cursor > 0; };
    /**
     * @param {?} value
     * @return {?}
     */
    PblTokenPaginator.prototype.move = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.page = value; };
    /**
     * @return {?}
     */
    PblTokenPaginator.prototype.nextPage = /**
     * @return {?}
     */
    function () { this.page = this._tokens[++this._cursor]; };
    /**
     * @return {?}
     */
    PblTokenPaginator.prototype.prevPage = /**
     * @return {?}
     */
    function () { this.page = this._tokens[--this._cursor]; };
    /**
     * @param {?} value
     * @return {?}
     */
    PblTokenPaginator.prototype.addNext = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var nextPointer = this._cursor + 1;
        // if next pointer is not like what we got, set it and delete all after (invalidate them)
        if (this._tokens[nextPointer] !== value) {
            this._tokens[nextPointer] = value;
            this._tokens.splice(nextPointer + 1);
        }
    };
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    PblTokenPaginator.prototype.emit = /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.queuedChanges = undefined;
                _this.onChange$.next(changes);
            }));
        }
    };
    return PblTokenPaginator;
}());
export { PblTokenPaginator };
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
var PblPagingPaginator = /** @class */ (function () {
    function PblPagingPaginator() {
        this.kind = 'pageNumber';
        this._total = 0;
        this._perPage = 10;
        this._page = 1;
        this._totalPages = 0;
        this.onChange$ = new BehaviorSubject({ page: [null, 1] });
        this.onChange = this.onChange$.asObservable();
    }
    Object.defineProperty(PblPagingPaginator.prototype, "perPage", {
        get: /**
         * @return {?}
         */
        function () { return this._perPage; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value < 1) {
                throw new Error("Invalid total size value " + value);
            }
            if (this._perPage !== value) {
                /** @type {?} */
                var changes = { perPage: [this._perPage, this._perPage = value] };
                /** @type {?} */
                var prev = this._page;
                this.calcPages();
                if (prev !== this._page) {
                    changes.page = [prev, this._page];
                }
                this.emit(changes);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPagingPaginator.prototype, "page", {
        /**
         * Get / Set the current page
         */
        get: /**
         * Get / Set the current page
         * @return {?}
         */
        function () { return this._page; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value < 0 || value > this._totalPages) {
                throw new Error("Invalid page index " + value);
            }
            if (this._page !== value) {
                /** @type {?} */
                var prev = this._page;
                this._page = value;
                this.emit({ page: [prev, value] });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPagingPaginator.prototype, "total", {
        get: /**
         * @return {?}
         */
        function () { return this._total; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value < 0) {
                throw new Error("Invalid total size value " + value);
            }
            if (this._total !== value) {
                /** @type {?} */
                var changes = { total: [this._total, this._total = value] };
                /** @type {?} */
                var prev = this._page;
                this.calcPages();
                if (prev !== this._page) {
                    changes.page = [prev, this._page];
                }
                this.emit(changes);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPagingPaginator.prototype, "totalPages", {
        /**
         * The amount of pages in this paginator
         */
        get: /**
         * The amount of pages in this paginator
         * @return {?}
         */
        function () {
            return this._totalPages;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPagingPaginator.prototype, "range", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this._range) {
                /** @type {?} */
                var start = (this.page - 1) * this.perPage;
                /** @type {?} */
                var end = Math.min(this._total, start + this.perPage);
                this._range = this.noCacheMode
                    ? [0, end - start]
                    : [start, end];
            }
            return this._range;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    PblPagingPaginator.prototype.canMove = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var p = this._page + value;
        return p >= 1 && p <= this.totalPages;
    };
    /**
     * @return {?}
     */
    PblPagingPaginator.prototype.hasNext = /**
     * @return {?}
     */
    function () { return this.canMove(1); };
    /**
     * @return {?}
     */
    PblPagingPaginator.prototype.hasPrev = /**
     * @return {?}
     */
    function () { return this.canMove(-1); };
    /**
     * @param {?} value
     * @return {?}
     */
    PblPagingPaginator.prototype.move = /**
     * @param {?} value
     * @return {?}
     */
    function (value) { this.page = this._page + value; };
    /**
     * @return {?}
     */
    PblPagingPaginator.prototype.nextPage = /**
     * @return {?}
     */
    function () { this.move(1); };
    /**
     * @return {?}
     */
    PblPagingPaginator.prototype.prevPage = /**
     * @return {?}
     */
    function () { this.move(-1); };
    /**
     * @return {?}
     */
    PblPagingPaginator.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.page = 1;
    };
    /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     */
    /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     * @protected
     * @return {?}
     */
    PblPagingPaginator.prototype.calcPages = /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     * @protected
     * @return {?}
     */
    function () {
        this._totalPages = Math.ceil(this._total / this.perPage);
        if (this._totalPages > 0 && this._page > this._totalPages) {
            this.page = this._totalPages;
        }
    };
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    PblPagingPaginator.prototype.emit = /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout((/**
             * @return {?}
             */
            function () {
                _this.queuedChanges = undefined;
                _this.onChange$.next(changes);
            }));
        }
    };
    return PblPagingPaginator;
}());
export { PblPagingPaginator };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0b3IvcGFnaW5hdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFjLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQVduRCw2Q0FJQzs7O0lBSEMsdUNBQWM7O0lBQ2QsMENBQTJCOztJQUMzQix3Q0FBeUI7Ozs7OztBQUczQixrQ0E0QkM7OztJQTNCQyw0QkFBNEI7Ozs7Ozs7Ozs7O0lBVTVCLG1DQUFxQjs7SUFFckIsK0JBQWdCOztJQUNoQiw0QkFBWTs7SUFDWiw2QkFBYzs7SUFDZCxrQ0FBNEI7O0lBQzVCLDZCQUFpQzs7SUFFakMsZ0NBQXFEOzs7O0lBQ3JELCtDQUFjOzs7OztJQUNkLHNEQUErQjs7OztJQUMvQixpREFBbUI7Ozs7SUFDbkIsaURBQW1COzs7OztJQUNuQixtREFBeUI7Ozs7SUFDekIsa0RBQWlCOzs7O0lBQ2pCLGtEQUFpQjs7QUFJbkI7SUE4REU7UUE3RFMsU0FBSSxHQUFZLE9BQU8sQ0FBQztRQXVEdkIsYUFBUSxHQUFXLEVBQUUsQ0FBQztRQUV0QixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBSzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQWtDLEVBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQTlERCxzQkFBSSxzQ0FBTzs7OztRQUFYLGNBQXdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQy9DLFVBQVksS0FBYTtZQUN2QixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBNEIsS0FBTyxDQUFDLENBQUM7YUFDdEQ7WUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFOztvQkFDckIsT0FBTyxHQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRTtnQkFDcEcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNwQjtRQUNILENBQUM7OztPQVY4QztJQVkvQyxzQkFBSSxtQ0FBSTs7OztRQUFSLGNBQXFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3pDLFVBQVMsS0FBYTtZQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFOztvQkFDbEIsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdkMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBc0IsS0FBTyxDQUFDLENBQUM7aUJBQ2hEO2dCQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOztvQkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwQztRQUNILENBQUM7OztPQVp3QztJQWN6QyxzQkFBSSxvQ0FBSzs7OztRQUFULGNBQXNCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzNDLFVBQVUsS0FBYTs7Z0JBQ2YsT0FBTyxHQUFvQyxFQUFFLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRTtZQUM5RixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLENBQUM7OztPQUowQztJQU0zQyxzQkFBSSx5Q0FBVTs7OztRQUFkO1lBQ0UsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLG9DQUFLOzs7O1FBQVQ7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTs7b0JBQ1YsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPOztvQkFDckMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVztvQkFDNUIsQ0FBQyxDQUFDLENBQUUsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUU7b0JBQ3BCLENBQUMsQ0FBQyxDQUFFLEtBQUssRUFBRSxHQUFHLENBQUUsQ0FDakI7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixDQUFDOzs7T0FBQTs7OztJQWtCRCxpQ0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQzs7Ozs7SUFFRCxtQ0FBTzs7OztJQUFQLFVBQVEsS0FBYTtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7Ozs7SUFFRCxtQ0FBTzs7O0lBQVAsY0FBcUIsT0FBTyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7SUFDckUsbUNBQU87OztJQUFQLGNBQXFCLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvQyxnQ0FBSTs7OztJQUFKLFVBQUssS0FBYSxJQUFVLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzs7OztJQUNoRCxvQ0FBUTs7O0lBQVIsY0FBbUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUM5RCxvQ0FBUTs7O0lBQVIsY0FBbUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFFOUQsbUNBQU87Ozs7SUFBUCxVQUFRLEtBQVU7O1lBQ1YsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztRQUNwQyx5RkFBeUY7UUFDekYsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEtBQUssRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7Ozs7SUFFTyxnQ0FBSTs7Ozs7SUFBWixVQUFhLE9BQXdDO1FBQXJELGlCQVdDO1FBVkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsVUFBVTs7O1lBQUM7Z0JBQ1QsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDLEFBM0dELElBMkdDOzs7O0lBMUdDLGlDQUFpQzs7SUFDakMsd0NBQXFCOztJQWtEckIscUNBQStEOzs7OztJQUMvRCxzQ0FBc0U7Ozs7O0lBQ3RFLDBDQUFxRTs7Ozs7SUFDckUsbUNBQW1DOzs7OztJQUNuQyxxQ0FBZ0M7Ozs7O0lBQ2hDLGtDQUFxQjs7Ozs7SUFDckIsbUNBQTZCOzs7OztJQUM3QixvQ0FBeUI7Ozs7O0lBQ3pCLG9DQUEwQjs7QUFpRDVCO0lBd0ZFO1FBdkZTLFNBQUksR0FBaUIsWUFBWSxDQUFDO1FBK0VuQyxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQU10QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFrQyxFQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUF2RkQsc0JBQUksdUNBQU87Ozs7UUFBWCxjQUF3QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OztRQUMvQyxVQUFZLEtBQWE7WUFDdkIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQTRCLEtBQU8sQ0FBQyxDQUFDO2FBQ3REO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTs7b0JBQ3JCLE9BQU8sR0FBb0MsRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEVBQUU7O29CQUU5RixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDdkIsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ25DO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEI7UUFFSCxDQUFDOzs7T0FqQjhDO0lBc0IvQyxzQkFBSSxvQ0FBSTtRQUhSOztXQUVHOzs7OztRQUNILGNBQXFCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQ3pDLFVBQVMsS0FBYTtZQUNwQixJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXNCLEtBQU8sQ0FBQyxDQUFDO2FBQ2hEO1lBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTs7b0JBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSztnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQzs7O09BWHdDO0lBYXpDLHNCQUFJLHFDQUFLOzs7O1FBQVQsY0FBc0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDM0MsVUFBVSxLQUFhO1lBQ3JCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE0QixLQUFPLENBQUMsQ0FBQzthQUN0RDtZQUVELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7O29CQUNuQixPQUFPLEdBQW9DLEVBQUUsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFOztvQkFFeEYsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLO2dCQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3ZCLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNuQztnQkFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQzs7O09BakIwQztJQXNCM0Msc0JBQUksMENBQVU7UUFIZDs7V0FFRzs7Ozs7UUFDSDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFDQUFLOzs7O1FBQVQ7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTs7b0JBQ1YsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTzs7b0JBQ3RDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVc7b0JBQzVCLENBQUMsQ0FBQyxDQUFFLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFFO29CQUNwQixDQUFDLENBQUMsQ0FBRSxLQUFLLEVBQUUsR0FBRyxDQUFFLENBQ2pCO2FBQ0Y7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7Ozs7O0lBa0JELG9DQUFPOzs7O0lBQVAsVUFBUSxLQUFhOztZQUNiLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUs7UUFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFDRCxvQ0FBTzs7O0lBQVAsY0FBcUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUM5QyxvQ0FBTzs7O0lBQVAsY0FBcUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztJQUUvQyxpQ0FBSTs7OztJQUFKLFVBQUssS0FBYSxJQUFVLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7O0lBQzdELHFDQUFROzs7SUFBUixjQUFtQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUNsQyxxQ0FBUTs7O0lBQVIsY0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7OztJQUduQyxrQ0FBSzs7O0lBQUw7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ08sc0NBQVM7Ozs7OztJQUFuQjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN6RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs7Ozs7SUFFTyxpQ0FBSTs7Ozs7SUFBWixVQUFhLE9BQXdDO1FBQXJELGlCQVdDO1FBVkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFDN0IsVUFBVTs7O1lBQUM7Z0JBQ1QsS0FBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9CLENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBcElELElBb0lDOzs7O0lBbklDLGtDQUEyQzs7SUFDM0MseUNBQXFCOztJQTJFckIsc0NBQStEOzs7OztJQUMvRCx1Q0FBc0U7Ozs7O0lBRXRFLG9DQUFtQjs7Ozs7SUFDbkIsc0NBQXNCOzs7OztJQUN0QixtQ0FBa0I7Ozs7O0lBQ2xCLHlDQUF3Qjs7Ozs7SUFDeEIsb0NBQWlDOzs7OztJQUVqQywyQ0FBbUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IHR5cGUgUGJsTmdyaWRQYWdpbmF0b3JLaW5kID0gJ3BhZ2VOdW1iZXInIHwgJ3Rva2VuJztcblxuLyoqXG4gKiBBbiBvYmplY3Qgd2l0aCBwcm9wZXJ0aWVzIHJlcHJlc2VudGluZyB0aGUgY2hhbmdlIGluIHRoZSBwYWdpbmF0b3IuXG4gKiBFYWNoIHByb3BlcnR5IHBvaW50IHRvIGEgdHVwbGUgd2l0aCAyIGl0ZW1zLlxuICogVGhlIGZpcnN0IGl0ZW0gaXMgdGhlIG9sZCB2YWx1ZSwgdGhlIDJuZCBpdGVtIGlzIHRoZSBuZXcgdmFsdWUuXG4gKlxuICogVGhlIHByb3BlcnRpZXMgdGhhdCBjYW4gY2hhbmdlIGFyZSBwYWdlLCBwZXJQYWdlIGFuZCB0b3RhbC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxUID0gYW55PiB7XG4gIHBhZ2U/OiBbVCwgVF07XG4gIHBlclBhZ2U/OiBbbnVtYmVyLCBudW1iZXJdO1xuICB0b3RhbD86IFtudW1iZXIsIG51bWJlcl07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsUGFnaW5hdG9yPFRQYWdlPiB7XG4gIGtpbmQ6IFBibE5ncmlkUGFnaW5hdG9yS2luZDtcbiAgLyoqXG4gICAqIFdoZW4gdHJ1ZSB3aWxsIGFzc3VtZSB0aGF0IHRoZSBkYXRhc291cmNlIHJlcHJlc2VudHMgYSBzaW5nbGUgcGFnZS5cbiAgICogVGhpcyBpcyBjb21tb24gaW4gc2VydmVyIHNpZGUgcGFnaW5hdGlvbiB3aGVyZSBwZXJ2aW91cyBkYXRhIGlzIG5vdCBjYWNoZWQgYW5kIGVhY2ggcGFnZXMgaXMgZmV0Y2hlZCBhbmQgc2V0IGFzIGlzLCBpLmUuIHRoZSBkYXRhc291cmNlXG4gICAqIHJlcHJlc2VudHMgYSBzaW5nbGUgcGFnZSBhdCBhIHRpbWUuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBjb25zaWRlciBhIHBhZ2luYXRvciB3aXRoIDEwIGl0ZW1zIHBlciBwYWdlLCBwb2ludGluZyB0byBwYWdlIDQuXG4gICAqIFdoZW4gYG5vQ2FjaGVNb2RlYCBpcyBzZXQgdG8gYHRydWVgIHRoZSByYW5nZSBpcyBbMzAsIDM5XVxuICAgKiBXaGVuIGBub0NhY2hlTW9kZWAgaXMgc2V0IHRvIGBmYWxzZWAgdGhlIHJhbmdlIGlzIFswLCA5XVxuICAgKi9cbiAgbm9DYWNoZU1vZGU6IGJvb2xlYW47XG5cbiAgcGVyUGFnZTogbnVtYmVyO1xuICBwYWdlOiBUUGFnZTtcbiAgdG90YWw6IG51bWJlcjtcbiAgcmVhZG9ubHkgdG90YWxQYWdlczogbnVtYmVyO1xuICByZWFkb25seSByYW5nZTogW251bWJlciwgbnVtYmVyXTtcblxuICBvbkNoYW5nZTogT2JzZXJ2YWJsZTxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxUUGFnZT4+O1xuICByZXNldCgpOiB2b2lkO1xuICBjYW5Nb3ZlKHZhbHVlOiBUUGFnZSk6IGJvb2xlYW47XG4gIGhhc05leHQoKTogYm9vbGVhbjtcbiAgaGFzUHJldigpOiBib29sZWFuO1xuICBtb3ZlKHZhbHVlOiBUUGFnZSk6IHZvaWQ7XG4gIG5leHRQYWdlKCk6IHZvaWQ7XG4gIHByZXZQYWdlKCk6IHZvaWQ7XG5cbn1cblxuZXhwb3J0IGNsYXNzIFBibFRva2VuUGFnaW5hdG9yIGltcGxlbWVudHMgUGJsUGFnaW5hdG9yPHN0cmluZz4ge1xuICByZWFkb25seSBraW5kOiAndG9rZW4nID0gJ3Rva2VuJztcbiAgbm9DYWNoZU1vZGU6IGJvb2xlYW47XG5cbiAgZ2V0IHBlclBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BlclBhZ2U7IH1cbiAgc2V0IHBlclBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0b3RhbCBzaXplIHZhbHVlICR7dmFsdWV9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlclBhZ2UgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+ID0geyBwZXJQYWdlOiBbdGhpcy5fcGVyUGFnZSwgdGhpcy5fcGVyUGFnZSA9IHZhbHVlXSB9O1xuICAgICAgdGhpcy5lbWl0KGNoYW5nZXMpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBwYWdlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9wYWdlOyB9XG4gIHNldCBwYWdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fcGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGlkeCA9IHRoaXMuX3Rva2Vucy5pbmRleE9mKHZhbHVlKTtcbiAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwYWdlIHRva2VuICR7dmFsdWV9YCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJzb3IgPSBpZHg7XG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fcGFnZTtcbiAgICAgIHRoaXMuX3BhZ2UgPSB2YWx1ZTtcbiAgICAgIHRoaXMuZW1pdCh7IHBhZ2U6IFtwcmV2LCB2YWx1ZV0gfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHRvdGFsKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl90b3RhbDsgfVxuICBzZXQgdG90YWwodmFsdWU6IG51bWJlcikge1xuICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4gPSB7IHRvdGFsOiBbdGhpcy5fdG90YWwsIHRoaXMuX3RvdGFsID0gdmFsdWVdIH07XG4gICAgdGhpcy5lbWl0KGNoYW5nZXMpO1xuICB9XG5cbiAgZ2V0IHRvdGFsUGFnZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdG9rZW5zLmxlbmd0aDtcbiAgfVxuXG4gIGdldCByYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBpZiAoIXRoaXMuX3JhbmdlKSB7XG4gICAgICBjb25zdCBzdGFydCA9ICh0aGlzLl9jdXJzb3IpICogdGhpcy5wZXJQYWdlO1xuICAgICAgY29uc3QgZW5kID0gTWF0aC5taW4odGhpcy5fdG90YWwsIHN0YXJ0ICsgdGhpcy5wZXJQYWdlKTtcbiAgICAgIHRoaXMuX3JhbmdlID0gdGhpcy5ub0NhY2hlTW9kZVxuICAgICAgICA/IFsgMCwgZW5kIC0gc3RhcnQgXVxuICAgICAgICA6IFsgc3RhcnQsIGVuZCBdXG4gICAgICA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yYW5nZTtcbiAgfVxuXG4gIHJlYWRvbmx5IG9uQ2hhbmdlOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4+O1xuICBwcm90ZWN0ZWQgb25DaGFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPj47XG4gIHByb3RlY3RlZCBxdWV1ZWRDaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+IHwgdW5kZWZpbmVkO1xuICBwcm90ZWN0ZWQgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuICBwcm90ZWN0ZWQgX3BlclBhZ2U6IG51bWJlciA9IDEwO1xuICBwcm90ZWN0ZWQgX3BhZ2U6IGFueTtcbiAgcHJvdGVjdGVkIF90b3RhbDogbnVtYmVyID0gMDtcbiAgcHJvdGVjdGVkIF90b2tlbnM6IGFueVtdO1xuICBwcm90ZWN0ZWQgX2N1cnNvcjogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub25DaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+Pih7cGFnZTogW251bGwsIG51bGxdfSk7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMucmVzZXQoKTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3Rva2VucyA9IFtudWxsXTtcbiAgICB0aGlzLl9jdXJzb3IgPSAwO1xuICAgIHRoaXMuX3RvdGFsID0gMDtcbiAgICB0aGlzLnBhZ2UgPSBudWxsO1xuICB9XG5cbiAgY2FuTW92ZSh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Rva2Vucy5pbmRleE9mKHZhbHVlKSA+IC0xO1xuICB9XG5cbiAgaGFzTmV4dCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2N1cnNvciA8IHRoaXMuX3Rva2Vucy5sZW5ndGggLSAxOyB9XG4gIGhhc1ByZXYoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9jdXJzb3IgPiAwOyB9XG5cbiAgbW92ZSh2YWx1ZTogc3RyaW5nKTogdm9pZCB7IHRoaXMucGFnZSA9IHZhbHVlOyB9XG4gIG5leHRQYWdlKCk6IHZvaWQgeyB0aGlzLnBhZ2UgPSB0aGlzLl90b2tlbnNbKyt0aGlzLl9jdXJzb3JdOyB9XG4gIHByZXZQYWdlKCk6IHZvaWQgeyB0aGlzLnBhZ2UgPSB0aGlzLl90b2tlbnNbLS10aGlzLl9jdXJzb3JdOyB9XG5cbiAgYWRkTmV4dCh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgbmV4dFBvaW50ZXIgPSB0aGlzLl9jdXJzb3IgKyAxO1xuICAgIC8vIGlmIG5leHQgcG9pbnRlciBpcyBub3QgbGlrZSB3aGF0IHdlIGdvdCwgc2V0IGl0IGFuZCBkZWxldGUgYWxsIGFmdGVyIChpbnZhbGlkYXRlIHRoZW0pXG4gICAgaWYgKHRoaXMuX3Rva2Vuc1tuZXh0UG9pbnRlcl0gIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl90b2tlbnNbbmV4dFBvaW50ZXJdID0gdmFsdWU7XG4gICAgICB0aGlzLl90b2tlbnMuc3BsaWNlKG5leHRQb2ludGVyICsgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0KGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4pOiB2b2lkIHtcbiAgICB0aGlzLl9yYW5nZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5xdWV1ZWRDaGFuZ2VzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMucXVldWVkQ2hhbmdlcywgY2hhbmdlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVldWVkQ2hhbmdlcyA9IGNoYW5nZXM7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5xdWV1ZWRDaGFuZ2VzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlJC5uZXh0KGNoYW5nZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxQYWdpbmdQYWdpbmF0b3IgaW1wbGVtZW50cyBQYmxQYWdpbmF0b3I8bnVtYmVyPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICdwYWdlTnVtYmVyJyA9ICdwYWdlTnVtYmVyJztcbiAgbm9DYWNoZU1vZGU6IGJvb2xlYW47XG5cbiAgZ2V0IHBlclBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BlclBhZ2U7IH1cbiAgc2V0IHBlclBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0b3RhbCBzaXplIHZhbHVlICR7dmFsdWV9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlclBhZ2UgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+ID0geyBwZXJQYWdlOiBbdGhpcy5fcGVyUGFnZSwgdGhpcy5fcGVyUGFnZSA9IHZhbHVlXSB9O1xuXG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fcGFnZTtcbiAgICAgIHRoaXMuY2FsY1BhZ2VzKCk7XG4gICAgICBpZiAocHJldiAhPT0gdGhpcy5fcGFnZSkge1xuICAgICAgICBjaGFuZ2VzLnBhZ2UgPSBbcHJldiwgdGhpcy5fcGFnZV07XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogR2V0IC8gU2V0IHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIGdldCBwYWdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9wYWdlOyB9XG4gIHNldCBwYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gdGhpcy5fdG90YWxQYWdlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhZ2UgaW5kZXggJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5fcGFnZSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0KHsgcGFnZTogW3ByZXYsIHZhbHVlXSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgdG90YWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvdGFsOyB9XG4gIHNldCB0b3RhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRvdGFsIHNpemUgdmFsdWUgJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdG90YWwgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+ID0geyB0b3RhbDogW3RoaXMuX3RvdGFsLCB0aGlzLl90b3RhbCA9IHZhbHVlXSB9O1xuXG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fcGFnZTtcbiAgICAgIHRoaXMuY2FsY1BhZ2VzKCk7XG4gICAgICBpZiAocHJldiAhPT0gdGhpcy5fcGFnZSkge1xuICAgICAgICBjaGFuZ2VzLnBhZ2UgPSBbcHJldiwgdGhpcy5fcGFnZV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdChjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFtb3VudCBvZiBwYWdlcyBpbiB0aGlzIHBhZ2luYXRvclxuICAgKi9cbiAgZ2V0IHRvdGFsUGFnZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxQYWdlcztcbiAgfVxuXG4gIGdldCByYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBpZiAoIXRoaXMuX3JhbmdlKSB7XG4gICAgICBjb25zdCBzdGFydCA9ICh0aGlzLnBhZ2UgLSAxKSAqIHRoaXMucGVyUGFnZTtcbiAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHRoaXMuX3RvdGFsLCBzdGFydCArIHRoaXMucGVyUGFnZSk7XG4gICAgICB0aGlzLl9yYW5nZSA9IHRoaXMubm9DYWNoZU1vZGVcbiAgICAgICAgPyBbIDAsIGVuZCAtIHN0YXJ0IF1cbiAgICAgICAgOiBbIHN0YXJ0LCBlbmQgXVxuICAgICAgO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XG4gIH1cblxuICByZWFkb25seSBvbkNoYW5nZTogT2JzZXJ2YWJsZTxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+PjtcbiAgcHJvdGVjdGVkIG9uQ2hhbmdlJDogQmVoYXZpb3JTdWJqZWN0PFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4+O1xuXG4gIHByaXZhdGUgX3RvdGFsID0gMDtcbiAgcHJpdmF0ZSBfcGVyUGFnZSA9IDEwO1xuICBwcml2YXRlIF9wYWdlID0gMTtcbiAgcHJpdmF0ZSBfdG90YWxQYWdlcyA9IDA7XG4gIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIHByaXZhdGUgcXVldWVkQ2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uQ2hhbmdlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPj4oe3BhZ2U6IFtudWxsLCAxXX0pO1xuICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNhbk1vdmUodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHAgPSB0aGlzLl9wYWdlICsgdmFsdWU7XG4gICAgcmV0dXJuIHAgPj0gMSAmJiBwIDw9IHRoaXMudG90YWxQYWdlcztcbiAgfVxuICBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5jYW5Nb3ZlKDEpOyB9XG4gIGhhc1ByZXYoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmNhbk1vdmUoLTEpOyB9XG5cbiAgbW92ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7IHRoaXMucGFnZSA9IHRoaXMuX3BhZ2UgKyB2YWx1ZTsgfVxuICBuZXh0UGFnZSgpOiB2b2lkIHsgdGhpcy5tb3ZlKDEpOyB9XG4gIHByZXZQYWdlKCk6IHZvaWQgeyB0aGlzLm1vdmUoLTEpOyB9XG5cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2UgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHBhZ2VzLlxuICAgKiByZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgcGFnZSBoYXMgY2hhbmdlZCBkdWUgdG8gY2FsY3VsYXRpb24uIChjdXJyZW50IHBhZ2UgXFw+IG5ldyBwYWdlcyB2YWx1ZSlcbiAgICovXG4gIHByb3RlY3RlZCBjYWxjUGFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0aGlzLl90b3RhbCAvIHRoaXMucGVyUGFnZSk7XG4gICAgaWYgKHRoaXMuX3RvdGFsUGFnZXMgPiAwICYmIHRoaXMuX3BhZ2UgPiB0aGlzLl90b3RhbFBhZ2VzKSB7XG4gICAgICB0aGlzLnBhZ2UgPSB0aGlzLl90b3RhbFBhZ2VzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdChjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+KTogdm9pZCB7XG4gICAgdGhpcy5fcmFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMucXVldWVkQ2hhbmdlcykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnF1ZXVlZENoYW5nZXMsIGNoYW5nZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXVlZENoYW5nZXMgPSBjaGFuZ2VzO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucXVldWVkQ2hhbmdlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSQubmV4dChjaGFuZ2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19