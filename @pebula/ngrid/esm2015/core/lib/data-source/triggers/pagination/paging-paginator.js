import { BehaviorSubject } from 'rxjs';
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
    get perPage() { return this._perPage; }
    set perPage(value) {
        if (value < 1) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._perPage !== value) {
            const changes = { perPage: [this._perPage, this._perPage = value] };
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
     */
    get page() { return this._page; }
    set page(value) {
        if (value < 0 || value > this._totalPages) {
            throw new Error(`Invalid page index ${value}`);
        }
        if (this._page !== value) {
            const prev = this._page;
            this._page = value;
            this.emit({ page: [prev, value] });
        }
    }
    get total() { return this._total; }
    set total(value) {
        if (value < 0) {
            throw new Error(`Invalid total size value ${value}`);
        }
        if (this._total !== value) {
            const changes = { total: [this._total, this._total = value] };
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
     */
    get totalPages() {
        return this._totalPages;
    }
    get range() {
        if (!this._range) {
            const start = (this.page - 1) * this.perPage;
            const end = Math.min(this._total, start + this.perPage);
            this._range = this.noCacheMode
                ? [0, end - start]
                : [start, end];
        }
        return this._range;
    }
    canMove(value) {
        const p = this._page + value;
        return p >= 1 && p <= this.totalPages;
    }
    hasNext() { return this.canMove(1); }
    hasPrev() { return this.canMove(-1); }
    move(value) { this.page = this._page + value; }
    nextPage() { this.move(1); }
    prevPage() { this.move(-1); }
    reset() {
        this.page = 1;
    }
    /**
     * Calculate the number of pages.
     * returns true if the current page has changed due to calculation. (current page \> new pages value)
     */
    calcPages() {
        this._totalPages = Math.ceil(this._total / this.perPage);
        if (this._totalPages > 0 && this._page > this._totalPages) {
            this.page = this._totalPages;
        }
    }
    emit(changes) {
        this._range = undefined;
        if (this.queuedChanges) {
            Object.assign(this.queuedChanges, changes);
        }
        else {
            this.queuedChanges = changes;
            setTimeout(() => {
                this.queuedChanges = undefined;
                this.onChange$.next(changes);
            });
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5nLXBhZ2luYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvY29yZS9zcmMvbGliL2RhdGEtc291cmNlL3RyaWdnZXJzL3BhZ2luYXRpb24vcGFnaW5nLXBhZ2luYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBR25ELE1BQU0sT0FBTyxrQkFBa0I7SUF3RjdCO1FBdkZTLFNBQUksR0FBaUIsWUFBWSxDQUFDO1FBK0VuQyxXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixnQkFBVyxHQUFHLENBQUMsQ0FBQztRQU10QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFrQyxFQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDekYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hELENBQUM7SUF2RkQsSUFBSSxPQUFPLEtBQWEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUMvQyxJQUFJLE9BQU8sQ0FBQyxLQUFhO1FBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQzNCLE1BQU0sT0FBTyxHQUFvQyxFQUFFLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBRXJHLE1BQU0sSUFBSSxHQUFH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R0FBRyxFQUFFO2dCQUNkLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO2dCQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBQYmxQYWdpbmF0b3IsIFBibFBhZ2luYXRvckNoYW5nZUV2ZW50IH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjbGFzcyBQYmxQYWdpbmdQYWdpbmF0b3IgaW1wbGVtZW50cyBQYmxQYWdpbmF0b3I8bnVtYmVyPiB7XG4gIHJlYWRvbmx5IGtpbmQ6ICdwYWdlTnVtYmVyJyA9ICdwYWdlTnVtYmVyJztcbiAgbm9DYWNoZU1vZGU6IGJvb2xlYW47XG5cbiAgZ2V0IHBlclBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3BlclBhZ2U7IH1cbiAgc2V0IHBlclBhZ2UodmFsdWU6IG51bWJlcikge1xuICAgIGlmICh2YWx1ZSA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCB0b3RhbCBzaXplIHZhbHVlICR7dmFsdWV9YCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BlclBhZ2UgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+ID0geyBwZXJQYWdlOiBbdGhpcy5fcGVyUGFnZSwgdGhpcy5fcGVyUGFnZSA9IHZhbHVlXSB9O1xuXG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fcGFnZTtcbiAgICAgIHRoaXMuY2FsY1BhZ2VzKCk7XG4gICAgICBpZiAocHJldiAhPT0gdGhpcy5fcGFnZSkge1xuICAgICAgICBjaGFuZ2VzLnBhZ2UgPSBbcHJldiwgdGhpcy5fcGFnZV07XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoY2hhbmdlcyk7XG4gICAgfVxuXG4gIH1cblxuICAvKipcbiAgICogR2V0IC8gU2V0IHRoZSBjdXJyZW50IHBhZ2VcbiAgICovXG4gIGdldCBwYWdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9wYWdlOyB9XG4gIHNldCBwYWdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gdGhpcy5fdG90YWxQYWdlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBhZ2UgaW5kZXggJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGFnZSAhPT0gdmFsdWUpIHtcbiAgICAgIGNvbnN0IHByZXYgPSB0aGlzLl9wYWdlO1xuICAgICAgdGhpcy5fcGFnZSA9IHZhbHVlO1xuICAgICAgdGhpcy5lbWl0KHsgcGFnZTogW3ByZXYsIHZhbHVlXSB9KTtcbiAgICB9XG4gIH1cblxuICBnZXQgdG90YWwoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3RvdGFsOyB9XG4gIHNldCB0b3RhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgaWYgKHZhbHVlIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHRvdGFsIHNpemUgdmFsdWUgJHt2YWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdG90YWwgIT09IHZhbHVlKSB7XG4gICAgICBjb25zdCBjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+ID0geyB0b3RhbDogW3RoaXMuX3RvdGFsLCB0aGlzLl90b3RhbCA9IHZhbHVlXSB9O1xuXG4gICAgICBjb25zdCBwcmV2ID0gdGhpcy5fcGFnZTtcbiAgICAgIHRoaXMuY2FsY1BhZ2VzKCk7XG4gICAgICBpZiAocHJldiAhPT0gdGhpcy5fcGFnZSkge1xuICAgICAgICBjaGFuZ2VzLnBhZ2UgPSBbcHJldiwgdGhpcy5fcGFnZV07XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZW1pdChjaGFuZ2VzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhlIGFtb3VudCBvZiBwYWdlcyBpbiB0aGlzIHBhZ2luYXRvclxuICAgKi9cbiAgZ2V0IHRvdGFsUGFnZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdG90YWxQYWdlcztcbiAgfVxuXG4gIGdldCByYW5nZSgpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICBpZiAoIXRoaXMuX3JhbmdlKSB7XG4gICAgICBjb25zdCBzdGFydCA9ICh0aGlzLnBhZ2UgLSAxKSAqIHRoaXMucGVyUGFnZTtcbiAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHRoaXMuX3RvdGFsLCBzdGFydCArIHRoaXMucGVyUGFnZSk7XG4gICAgICB0aGlzLl9yYW5nZSA9IHRoaXMubm9DYWNoZU1vZGVcbiAgICAgICAgPyBbIDAsIGVuZCAtIHN0YXJ0IF1cbiAgICAgICAgOiBbIHN0YXJ0LCBlbmQgXVxuICAgICAgO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmFuZ2U7XG4gIH1cblxuICByZWFkb25seSBvbkNoYW5nZTogT2JzZXJ2YWJsZTxQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+PjtcbiAgcHJvdGVjdGVkIG9uQ2hhbmdlJDogQmVoYXZpb3JTdWJqZWN0PFBibFBhZ2luYXRvckNoYW5nZUV2ZW50PG51bWJlcj4+O1xuXG4gIHByaXZhdGUgX3RvdGFsID0gMDtcbiAgcHJpdmF0ZSBfcGVyUGFnZSA9IDEwO1xuICBwcml2YXRlIF9wYWdlID0gMTtcbiAgcHJpdmF0ZSBfdG90YWxQYWdlcyA9IDA7XG4gIHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuXG4gIHByaXZhdGUgcXVldWVkQ2hhbmdlczogUGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm9uQ2hhbmdlJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UGJsUGFnaW5hdG9yQ2hhbmdlRXZlbnQ8bnVtYmVyPj4oe3BhZ2U6IFtudWxsLCAxXX0pO1xuICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlJC5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNhbk1vdmUodmFsdWU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHAgPSB0aGlzLl9wYWdlICsgdmFsdWU7XG4gICAgcmV0dXJuIHAgPj0gMSAmJiBwIDw9IHRoaXMudG90YWxQYWdlcztcbiAgfVxuICBoYXNOZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5jYW5Nb3ZlKDEpOyB9XG4gIGhhc1ByZXYoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmNhbk1vdmUoLTEpOyB9XG5cbiAgbW92ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7IHRoaXMucGFnZSA9IHRoaXMuX3BhZ2UgKyB2YWx1ZTsgfVxuICBuZXh0UGFnZSgpOiB2b2lkIHsgdGhpcy5tb3ZlKDEpOyB9XG4gIHByZXZQYWdlKCk6IHZvaWQgeyB0aGlzLm1vdmUoLTEpOyB9XG5cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2UgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHBhZ2VzLlxuICAgKiByZXR1cm5zIHRydWUgaWYgdGhlIGN1cnJlbnQgcGFnZSBoYXMgY2hhbmdlZCBkdWUgdG8gY2FsY3VsYXRpb24uIChjdXJyZW50IHBhZ2UgXFw+IG5ldyBwYWdlcyB2YWx1ZSlcbiAgICovXG4gIHByb3RlY3RlZCBjYWxjUGFnZXMoKTogdm9pZCB7XG4gICAgdGhpcy5fdG90YWxQYWdlcyA9IE1hdGguY2VpbCh0aGlzLl90b3RhbCAvIHRoaXMucGVyUGFnZSk7XG4gICAgaWYgKHRoaXMuX3RvdGFsUGFnZXMgPiAwICYmIHRoaXMuX3BhZ2UgPiB0aGlzLl90b3RhbFBhZ2VzKSB7XG4gICAgICB0aGlzLnBhZ2UgPSB0aGlzLl90b3RhbFBhZ2VzO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZW1pdChjaGFuZ2VzOiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudDxudW1iZXI+KTogdm9pZCB7XG4gICAgdGhpcy5fcmFuZ2UgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMucXVldWVkQ2hhbmdlcykge1xuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnF1ZXVlZENoYW5nZXMsIGNoYW5nZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnF1ZXVlZENoYW5nZXMgPSBjaGFuZ2VzO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucXVldWVkQ2hhbmdlcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSQubmV4dChjaGFuZ2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19