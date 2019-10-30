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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9wYWdpbmF0b3IvcGFnaW5hdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7O0FBV25ELDZDQUlDOzs7SUFIQyx1Q0FBYzs7SUFDZCwwQ0FBMkI7O0lBQzNCLHdDQUF5Qjs7Ozs7O0FBRzNCLGtDQTRCQzs7O0lBM0JDLDRCQUE0Qjs7Ozs7Ozs7Ozs7SUFVNUIsbUNBQXFCOztJQUVyQiwrQkFBZ0I7O0lBQ2hCLDRCQUFZOztJQUNaLDZCQUFjOztJQUNkLGtDQUE0Qjs7SUFDNUIsNkJBQWlDOztJQUVqQyxnQ0FBcUQ7Ozs7SUFDckQsK0NBQWM7Ozs7O0lBQ2Qsc0RBQStCOzs7O0lBQy9CLGlEQUFtQjs7OztJQUNuQixpREFBbUI7Ozs7O0lBQ25CLG1EQUF5Qjs7OztJQUN6QixrREFBaUI7Ozs7SUFDakIsa0RBQWlCOztBQUluQjtJQThERTtRQTdEUyxTQUFJLEdBQVksT0FBTyxDQUFDO1FBdUR2QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXRCLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFLM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBa0MsRUFBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzVGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBOURELHNCQUFJLHNDQUFPOzs7O1FBQVgsY0FBd0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDL0MsVUFBWSxLQUFhO1lBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFD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QUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUM5QjtJQUNILENBQUM7Ozs7OztJQUVPLGlDQUFJOzs7OztJQUFaLFVBQWEsT0FBd0M7UUFBckQsaUJBV0M7UUFWQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzVDO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUM3QixVQUFVOzs7WUFBQztnQkFDVCxLQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztnQkFDL0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0IsQ0FBQyxFQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFwSUQsSUFvSUM7Ozs7SUFuSUMsa0NBQTJDOztJQUMzQyx5Q0FBcUI7O0lBMkVyQixzQ0FBK0Q7Ozs7O0lBQy9ELHVDQUFzRTs7Ozs7SUFFdEUsb0NBQW1COzs7OztJQUNuQixzQ0FBc0I7Ozs7O0lBQ3RCLG1DQUFrQjs7Ozs7SUFDbEIseUNBQXdCOzs7OztJQUN4QixvQ0FBaUM7Ozs7O0lBRWpDLDJDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgdHlwZSBQYmxOZ3JpZFBhZ2luYXRvcktpbmQgPSAncGFnZU51bWJlcicgfCAndG9rZW4nO1xuXG4vKipcbiAqIEFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXMgcmVwcmVzZW50aW5nIHRoZSBjaGFuZ2UgaW4gdGhlIHBhZ2luYXRvci5cbiAqIEVhY2ggcHJvcGVydHkgcG9pbnQgdG8gYSB0dXBsZSB3aXRoIDIgaXRlbXMuXG4gKiBUaGUgZmlyc3QgaXRlbSBpcyB0aGUgb2xkIHZhbHVlLCB0aGUgMm5kIGl0ZW0gaXMgdGhlIG5ldyB2YWx1ZS5cbiAqXG4gKiBUaGUgcHJvcGVydGllcyB0aGF0IGNhbiBjaGFuZ2UgYXJlIHBhZ2UsIHBlclBhZ2UgYW5kIHRvdGFsLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PFQgPSBhbnk+IHtcbiAgcGFnZT86IFtULCBUXTtcbiAgcGVyUGFnZT86IFtudW1iZXIsIG51bWJlcl07XG4gIHRvdGFsPzogW251bWJlciwgbnVtYmVyXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxQYWdpbmF0b3I8VFBhZ2U+IHtcbiAga2luZDogUGJsTmdyaWRQYWdpbmF0b3JLaW5kO1xuICAvKipcbiAgICogV2hlbiB0cnVlIHdpbGwgYXNzdW1lIHRoYXQgdGhlIGRhdGFzb3VyY2UgcmVwcmVzZW50cyBhIHNpbmdsZSBwYWdlLlxuICAgKiBUaGlzIGlzIGNvbW1vbiBpbiBzZXJ2ZXIgc2lkZSBwYWdpbmF0aW9uIHdoZXJlIHBlcnZpb3VzIGRhdGEgaXMgbm90IGNhY2hlZCBhbmQgZWFjaCBwYWdlcyBpcyBmZXRjaGVkIGFuZCBzZXQgYXMgaXMsIGkuZS4gdGhlIGRhdGFzb3VyY2VcbiAgICogcmVwcmVzZW50cyBhIHNpbmdsZSBwYWdlIGF0IGEgdGltZS5cbiAgICpcbiAgICogRm9yIGV4YW1wbGUsIGNvbnNpZGVyIGEgcGFnaW5hdG9yIHdpdGggMTAgaXRlbXMgcGVyIHBhZ2UsIHBvaW50aW5nIHRvIHBhZ2UgNC5cbiAgICogV2hlbiBgbm9DYWNoZU1vZGVgIGlzIHNldCB0byBgdHJ1ZWAgdGhlIHJhbmdlIGlzIFszMCwgMzldXG4gICAqIFdoZW4gYG5vQ2FjaGVNb2RlYCBpcyBzZXQgdG8gYGZhbHNlYCB0aGUgcmFuZ2UgaXMgWzAsIDldXG4gICAqL1xuICBub0NhY2hlTW9kZTogYm9vbGVhbjtcblxuICBwZXJQYWdlOiBudW1iZXI7XG4gIHBhZ2U6IFRQYWdlO1xuICB0b3RhbDogbnVtYmVyO1xuICByZWFkb25seSB0b3RhbFBhZ2VzOiBudW1iZXI7XG4gIHJlYWRvbmx5IHJhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIG9uQ2hhbmdlOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PFRQYWdlPj47XG4gIHJlc2V0KCk6IHZvaWQ7XG4gIGNhbk1vdmUodmFsdWU6IFRQYWdlKTogYm9vbGVhbjtcbiAgaGFzTmV4dCgpOiBib29sZWFuO1xuICBoYXNQcmV2KCk6IGJvb2xlYW47XG4gIG1vdmUodmFsdWU6IFRQYWdlKTogdm9pZDtcbiAgbmV4dFBhZ2UoKTogdm9pZDtcbiAgcHJldlBhZ2UoKTogdm9pZDtcblxufVxuXG5leHBvcnQgY2xhc3MgUGJsVG9rZW5QYWdpbmF0b3IgaW1wbGVtZW50cyBQYmxQYWdpbmF0b3I8c3RyaW5nPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICd0b2tlbicgPSAndG9rZW4nO1xuICBub0NhY2hlTW9kZTogYm9vbGVhbjtcblxuICBnZXQgcGVyUGFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGVyUGFnZTsgfVxuICBzZXQgcGVyUGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRvdGFsIHNpemUgdmFsdWUgJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVyUGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4gPSB7IHBlclBhZ2U6IFt0aGlzLl9wZXJQYWdlLCB0aGlzLl9wZXJQYWdlID0gdmFsdWVdIH07XG4gICAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHBhZ2UoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3BhZ2U7IH1cbiAgc2V0IHBhZ2UodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9wYWdlICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgaWR4ID0gdGhpcy5fdG9rZW5zLmluZGV4T2YodmFsdWUpO1xuICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhZ2UgdG9rZW4gJHt2YWx1ZX1gKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2N1cnNvciA9IGlkeDtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5fcGFnZSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0KHsgcGFnZTogW3ByZXYsIHZhbHVlXSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgdG90YWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvdGFsOyB9XG4gIHNldCB0b3RhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgY29uc3QgY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPiA9IHsgdG90YWw6IFt0aGlzLl90b3RhbCwgdGhpcy5fdG90YWwgPSB2YWx1ZV0gfTtcbiAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gIH1cblxuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b2tlbnMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IHJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGlmICghdGhpcy5fcmFuZ2UpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gKHRoaXMuX2N1cnNvcikgKiB0aGlzLnBlclBhZ2U7XG4gICAgICBjb25zdCBlbmQgPSBNYXRoLm1pbih0aGlzLl90b3RhbCwgc3RhcnQgKyB0aGlzLnBlclBhZ2UpO1xuICAgICAgdGhpcy5fcmFuZ2UgPSB0aGlzLm5vQ2FjaGVNb2RlXG4gICAgICAgID8gWyAwLCBlbmQgLSBzdGFydCBdXG4gICAgICAgIDogWyBzdGFydCwgZW5kIF1cbiAgICAgIDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3JhbmdlO1xuICB9XG5cbiAgcmVhZG9ubHkgb25DaGFuZ2U6IE9ic2VydmFibGU8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPj47XG4gIHByb3RlY3RlZCBvbkNoYW5nZSQ6IEJlaGF2aW9yU3ViamVjdDxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxzdHJpbmc+PjtcbiAgcHJvdGVjdGVkIHF1ZXVlZENoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4gfCB1bmRlZmluZWQ7XG4gIHByb3RlY3RlZCBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG4gIHByb3RlY3RlZCBfcGVyUGFnZTogbnVtYmVyID0gMTA7XG4gIHByb3RlY3RlZCBfcGFnZTogYW55O1xuICBwcm90ZWN0ZWQgX3RvdGFsOiBudW1iZXIgPSAwO1xuICBwcm90ZWN0ZWQgX3Rva2VuczogYW55W107XG4gIHByb3RlY3RlZCBfY3Vyc29yOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5vbkNoYW5nZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PHN0cmluZz4+KHtwYWdlOiBbbnVsbCwgbnVsbF19KTtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZSQuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5yZXNldCgpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdG9rZW5zID0gW251bGxdO1xuICAgIHRoaXMuX2N1cnNvciA9IDA7XG4gICAgdGhpcy5fdG90YWwgPSAwO1xuICAgIHRoaXMucGFnZSA9IG51bGw7XG4gIH1cblxuICBjYW5Nb3ZlKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fdG9rZW5zLmluZGV4T2YodmFsdWUpID4gLTE7XG4gIH1cblxuICBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fY3Vyc29yIDwgdGhpcy5fdG9rZW5zLmxlbmd0aCAtIDE7IH1cbiAgaGFzUHJldigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2N1cnNvciA+IDA7IH1cblxuICBtb3ZlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5wYWdlID0gdmFsdWU7IH1cbiAgbmV4dFBhZ2UoKTogdm9pZCB7IHRoaXMucGFnZSA9IHRoaXMuX3Rva2Vuc1srK3RoaXMuX2N1cnNvcl07IH1cbiAgcHJldlBhZ2UoKTogdm9pZCB7IHRoaXMucGFnZSA9IHRoaXMuX3Rva2Vuc1stLXRoaXMuX2N1cnNvcl07IH1cblxuICBhZGROZXh0KHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBuZXh0UG9pbnRlciA9IHRoaXMuX2N1cnNvciArIDE7XG4gICAgLy8gaWYgbmV4dCBwb2ludGVyIGlzIG5vdCBsaWtlIHdoYXQgd2UgZ290LCBzZXQgaXQgYW5kIGRlbGV0ZSBhbGwgYWZ0ZXIgKGludmFsaWRhdGUgdGhlbSlcbiAgICBpZiAodGhpcy5fdG9rZW5zW25leHRQb2ludGVyXSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX3Rva2Vuc1tuZXh0UG9pbnRlcl0gPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3Rva2Vucy5zcGxpY2UobmV4dFBvaW50ZXIgKyAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXQoY2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8c3RyaW5nPik6IHZvaWQge1xuICAgIHRoaXMuX3JhbmdlID0gdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLnF1ZXVlZENoYW5nZXMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5xdWV1ZWRDaGFuZ2VzLCBjaGFuZ2VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5xdWV1ZWRDaGFuZ2VzID0gY2hhbmdlcztcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnF1ZXVlZENoYW5nZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMub25DaGFuZ2UkLm5leHQoY2hhbmdlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibFBhZ2luZ1BhZ2luYXRvciBpbXBsZW1lbnRzIFBibFBhZ2luYXRvcjxudW1iZXI+IHtcbiAgcmVhZG9ubHkga2luZDogJ3BhZ2VOdW1iZXInID0gJ3BhZ2VOdW1iZXInO1xuICBub0NhY2hlTW9kZTogYm9vbGVhbjtcblxuICBnZXQgcGVyUGFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fcGVyUGFnZTsgfVxuICBzZXQgcGVyUGFnZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRvdGFsIHNpemUgdmFsdWUgJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGVyUGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4gPSB7IHBlclBhZ2U6IFt0aGlzLl9wZXJQYWdlLCB0aGlzLl9wZXJQYWdlID0gdmFsdWVdIH07XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5jYWxjUGFnZXMoKTtcbiAgICAgIGlmIChwcmV2ICE9PSB0aGlzLl9wYWdlKSB7XG4gICAgICAgIGNoYW5nZXMucGFnZSA9IFtwcmV2LCB0aGlzLl9wYWdlXTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZW1pdChjaGFuZ2VzKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgLyBTZXQgdGhlIGN1cnJlbnQgcGFnZVxuICAgKi9cbiAgZ2V0IHBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BhZ2U7IH1cbiAgc2V0IHBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiB0aGlzLl90b3RhbFBhZ2VzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgcGFnZSBpbmRleCAke3ZhbHVlfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wYWdlICE9PSB2YWx1ZSkge1xuICAgICAgY29uc3QgcHJldiA9IHRoaXMuX3BhZ2U7XG4gICAgICB0aGlzLl9wYWdlID0gdmFsdWU7XG4gICAgICB0aGlzLmVtaXQoeyBwYWdlOiBbcHJldiwgdmFsdWVdIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCB0b3RhbCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fdG90YWw7IH1cbiAgc2V0IHRvdGFsKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgdG90YWwgc2l6ZSB2YWx1ZSAke3ZhbHVlfWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl90b3RhbCAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4gPSB7IHRvdGFsOiBbdGhpcy5fdG90YWwsIHRoaXMuX3RvdGFsID0gdmFsdWVdIH07XG5cbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5jYWxjUGFnZXMoKTtcbiAgICAgIGlmIChwcmV2ICE9PSB0aGlzLl9wYWdlKSB7XG4gICAgICAgIGNoYW5nZXMucGFnZSA9IFtwcmV2LCB0aGlzLl9wYWdlXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lbWl0KGNoYW5nZXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYW1vdW50IG9mIHBhZ2VzIGluIHRoaXMgcGFnaW5hdG9yXG4gICAqL1xuICBnZXQgdG90YWxQYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl90b3RhbFBhZ2VzO1xuICB9XG5cbiAgZ2V0IHJhbmdlKCk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIGlmICghdGhpcy5fcmFuZ2UpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gKHRoaXMucGFnZSAtIDEpICogdGhpcy5wZXJQYWdlO1xuICAgICAgY29uc3QgZW5kID0gTWF0aC5taW4odGhpcy5fdG90YWwsIHN0YXJ0ICsgdGhpcy5wZXJQYWdlKTtcbiAgICAgIHRoaXMuX3JhbmdlID0gdGhpcy5ub0NhY2hlTW9kZVxuICAgICAgICA/IFsgMCwgZW5kIC0gc3RhcnQgXVxuICAgICAgICA6IFsgc3RhcnQsIGVuZCBdXG4gICAgICA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yYW5nZTtcbiAgfVxuXG4gIHJlYWRvbmx5IG9uQ2hhbmdlOiBPYnNlcnZhYmxlPFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4+O1xuICBwcm90ZWN0ZWQgb25DaGFuZ2UkOiBCZWhhdmlvclN1YmplY3Q8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPj47XG5cbiAgcHJpdmF0ZSBfdG90YWwgPSAwO1xuICBwcml2YXRlIF9wZXJQYWdlID0gMTA7XG4gIHByaXZhdGUgX3BhZ2UgPSAxO1xuICBwcml2YXRlIF90b3RhbFBhZ2VzID0gMDtcbiAgcHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG5cbiAgcHJpdmF0ZSBxdWV1ZWRDaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+IHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMub25DaGFuZ2UkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+Pih7cGFnZTogW251bGwsIDFdfSk7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UkLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgY2FuTW92ZSh2YWx1ZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcCA9IHRoaXMuX3BhZ2UgKyB2YWx1ZTtcbiAgICByZXR1cm4gcCA+PSAxICYmIHAgPD0gdGhpcy50b3RhbFBhZ2VzO1xuICB9XG4gIGhhc05leHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmNhbk1vdmUoMSk7IH1cbiAgaGFzUHJldigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY2FuTW92ZSgtMSk7IH1cblxuICBtb3ZlKHZhbHVlOiBudW1iZXIpOiB2b2lkIHsgdGhpcy5wYWdlID0gdGhpcy5fcGFnZSArIHZhbHVlOyB9XG4gIG5leHRQYWdlKCk6IHZvaWQgeyB0aGlzLm1vdmUoMSk7IH1cbiAgcHJldlBhZ2UoKTogdm9pZCB7IHRoaXMubW92ZSgtMSk7IH1cblxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMucGFnZSA9IDE7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBudW1iZXIgb2YgcGFnZXMuXG4gICAqIHJldHVybnMgdHJ1ZSBpZiB0aGUgY3VycmVudCBwYWdlIGhhcyBjaGFuZ2VkIGR1ZSB0byBjYWxjdWxhdGlvbi4gKGN1cnJlbnQgcGFnZSBcXD4gbmV3IHBhZ2VzIHZhbHVlKVxuICAgKi9cbiAgcHJvdGVjdGVkIGNhbGNQYWdlcygpOiB2b2lkIHtcbiAgICB0aGlzLl90b3RhbFBhZ2VzID0gTWF0aC5jZWlsKHRoaXMuX3RvdGFsIC8gdGhpcy5wZXJQYWdlKTtcbiAgICBpZiAodGhpcy5fdG90YWxQYWdlcyA+IDAgJiYgdGhpcy5fcGFnZSA+IHRoaXMuX3RvdGFsUGFnZXMpIHtcbiAgICAgIHRoaXMucGFnZSA9IHRoaXMuX3RvdGFsUGFnZXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBlbWl0KGNoYW5nZXM6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4pOiB2b2lkIHtcbiAgICB0aGlzLl9yYW5nZSA9IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5xdWV1ZWRDaGFuZ2VzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMucXVldWVkQ2hhbmdlcywgY2hhbmdlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucXVldWVkQ2hhbmdlcyA9IGNoYW5nZXM7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5xdWV1ZWRDaGFuZ2VzID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLm9uQ2hhbmdlJC5uZXh0KGNoYW5nZXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=