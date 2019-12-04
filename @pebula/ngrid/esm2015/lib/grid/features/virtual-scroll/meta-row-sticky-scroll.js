/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { updateStickyRows } from './utils';
/**
 * A class that manages the life cycle of sticky meta rows (header & footer) while scrolling.
 * Sticky meta rows are moved to containers outside of the table so they do not depend on the `position: sticky` property.
 *
 * For `position: sticky` to work, a reference position is required (`top` for header, `bottom` for footer) which must reflect the current
 * offset measured by the virtual scroll viewport (this position compensate the offset of virtual scroll so the position is leveled, i.e. like top 0)
 *
 * When the user scroll's:
 * - The offset changes by the browser
 * - The virtual scroll will detect the new offset and update the wrapper with the new offset.
 *
 * There is a time gap between the operations above which causes rows to flicker in and out of view, this is why we move them to a fixed location.
 */
export class MetaRowStickyScroll {
    /**
     * @param {?} viewport
     * @param {?} viewPortEl
     * @param {?} metaRows
     */
    constructor(viewport, viewPortEl, metaRows) {
        this.viewport = viewport;
        this.viewPortEl = viewPortEl;
        this.metaRows = metaRows;
        this.runningHeader = false;
        this.runningFooter = false;
        this.canMoveHeader = true;
        this.canMoveFooter = true;
        this.movedFooterRows = [];
        this.movedHeaderRows = [];
    }
    /**
     * @return {?}
     */
    canMove() {
        return this.canMoveHeader || this.canMoveFooter;
    }
    /**
     * @return {?}
     */
    isRunning() {
        return this.runningHeader || this.runningFooter;
    }
    /**
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    move(offset, viewPortElRect) {
        this.moveHeader(offset, viewPortElRect);
        this.moveFooter(offset, viewPortElRect);
        return this.isRunning() && !this.canMoveHeader && !this.canMoveFooter;
    }
    /**
     * @param {?} renderedContentOffset
     * @return {?}
     */
    restore(renderedContentOffset) {
        const { header, footer } = this.metaRows;
        if (this.restoreHeader()) {
            updateStickyRows(renderedContentOffset, header.rows, header.sticky, 'top');
        }
        if (this.restoreFooter()) {
            updateStickyRows(renderedContentOffset, footer.rows, footer.sticky, 'bottom');
        }
    }
    /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    moveHeader(offset, viewPortElRect) {
        if (!this.runningHeader || this.canMoveHeader) {
            this.runningHeader = true;
            this.canMoveHeader = false;
            /** @type {?} */
            const stickyAndRendered = [];
            /** @type {?} */
            const headerRows = this.metaRows.header;
            /** @type {?} */
            let mostTopRect;
            for (let i = 0, len = headerRows.rows.length; i < len; i++) {
                /** @type {?} */
                const rowEl = headerRows.rows[i];
                if (headerRows.sticky[i]) {
                    /** @type {?} */
                    const elRect = rowEl.getBoundingClientRect();
                    if (headerRows.rendered[i]) {
                        /** @type {?} */
                        const calc = elRect.top - viewPortElRect.top - offset;
                        // if after the scroll the element is still in view, return
                        if (calc >= 0 || -calc < viewPortElRect.height) {
                            this.canMoveHeader = true;
                            return;
                        }
                    }
                    if (!mostTopRect) {
                        mostTopRect = elRect;
                    }
                    stickyAndRendered.push(i);
                }
            }
            if (stickyAndRendered.length) {
                this.viewport.stickyRowHeaderContainer.style.top = mostTopRect.top + 'px';
                this.cloneAndMoveRow(this.viewport.stickyRowHeaderContainer, headerRows.rows, stickyAndRendered, this.movedHeaderRows);
            }
        }
    }
    /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    moveFooter(offset, viewPortElRect) {
        if (!this.runningFooter || this.canMoveFooter) {
            this.runningFooter = true;
            this.canMoveFooter = false;
            /** @type {?} */
            const stickyAndRendered = [];
            /** @type {?} */
            const footerRows = this.metaRows.footer;
            /** @type {?} */
            let mostTopRect;
            for (let i = 0, len = footerRows.rows.length; i < len; i++) {
                /** @type {?} */
                const rowEl = footerRows.rows[i];
                if (footerRows.sticky[i]) {
                    /** @type {?} */
                    const elRect = rowEl.getBoundingClientRect();
                    if (footerRows.rendered[i]) {
                        /** @type {?} */
                        const calc = elRect.bottom - viewPortElRect.bottom + offset;
                        // if after the scroll the element is still in view, return
                        if (calc >= 0 && calc < viewPortElRect.height) {
                            this.canMoveFooter = true;
                            return;
                        }
                    }
                    mostTopRect = elRect;
                    stickyAndRendered.push(i);
                }
            }
            if (stickyAndRendered.length) {
                this.viewport.stickyRowFooterContainer.style.bottom = `calc(100% - ${mostTopRect.bottom}px)`;
                this.cloneAndMoveRow(this.viewport.stickyRowFooterContainer, footerRows.rows, stickyAndRendered, this.movedFooterRows);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    restoreHeader() {
        if (this.runningHeader) {
            /** @type {?} */
            const movedHeaderRows = this.movedHeaderRows;
            this.movedHeaderRows = [];
            this.restoreRows(movedHeaderRows, this.metaRows.header.rows);
            this.runningHeader = false;
            this.canMoveHeader = true;
            return true;
        }
        return false;
    }
    /**
     * @private
     * @return {?}
     */
    restoreFooter() {
        if (this.runningFooter) {
            /** @type {?} */
            const movedFooterRows = this.movedFooterRows;
            this.movedFooterRows = [];
            this.restoreRows(movedFooterRows, this.metaRows.footer.rows);
            this.runningFooter = false;
            this.canMoveFooter = true;
            return true;
        }
        return false;
    }
    /**
     * @private
     * @param {?} stickyRowContainer
     * @param {?} rows
     * @param {?} stickyAndRendered
     * @param {?} restoreRef
     * @return {?}
     */
    cloneAndMoveRow(stickyRowContainer, rows, stickyAndRendered, restoreRef) {
        /** @type {?} */
        const innerRowContainer = (/** @type {?} */ (stickyRowContainer.firstElementChild));
        stickyRowContainer.style.width = this.viewport.innerWidth + 'px';
        innerRowContainer.style.transform = `translateX(-${this.viewPortEl.scrollLeft}px)`;
        for (const i of stickyAndRendered) {
            /** @type {?} */
            const rowEl = rows[i];
            /** @type {?} */
            const clone = (/** @type {?} */ (rowEl.cloneNode()));
            clone.style.width = '0';
            rowEl.style.top = rowEl.style.bottom = rowEl.style.position = '';
            rowEl.parentElement.insertBefore(clone, rowEl);
            innerRowContainer.appendChild(rowEl);
            restoreRef.push([rowEl, clone, i]);
            // Assign the clone to be the sticky row element, this will ensure that stick row updates
            // will set the `top` on an actual element in the viewport, thus updating with each layout reflow.
            // if not set, when we return the original row it's `top` value will be true but will not show because it will not trigger a reflow.
            rows[i] = clone;
        }
    }
    /**
     * @private
     * @param {?} restoreRef
     * @param {?} rows
     * @return {?}
     */
    restoreRows(restoreRef, rows) {
        for (const [rowEl, clone, index] of restoreRef) {
            rowEl.style.position = clone.style.position;
            rowEl.style.zIndex = clone.style.zIndex;
            rowEl.style.top = clone.style.top;
            rowEl.style.bottom = clone.style.bottom;
            clone.parentElement.insertBefore(rowEl, clone);
            clone.parentElement.removeChild(clone);
            rows[index] = rowEl;
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.runningHeader;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.runningFooter;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.canMoveHeader;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.canMoveFooter;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.movedFooterRows;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.movedHeaderRows;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.viewport;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.viewPortEl;
    /**
     * @type {?}
     * @private
     */
    MetaRowStickyScroll.prototype.metaRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctc3RpY2t5LXNjcm9sbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9tZXRhLXJvdy1zdGlja3ktc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZTNDLE1BQU0sT0FBTyxtQkFBbUI7Ozs7OztJQVM5QixZQUFvQixRQUE4QyxFQUM5QyxVQUF1QixFQUN2QixRQUFzRztRQUZ0RyxhQUFRLEdBQVIsUUFBUSxDQUFzQztRQUM5QyxlQUFVLEdBQVYsVUFBVSxDQUFhO1FBQ3ZCLGFBQVEsR0FBUixRQUFRLENBQThGO1FBVGxILGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLG9CQUFlLEdBQThDLEVBQUUsQ0FBQztRQUNoRSxvQkFBZSxHQUE4QyxFQUFFLENBQUM7SUFJc0QsQ0FBQzs7OztJQUUvSCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFFRCxJQUFJLENBQUMsTUFBYyxFQUFFLGNBQW9DO1FBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFD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Q0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUNyQjtJQUNILENBQUM7Q0FDRjs7Ozs7O0lBbEtDLDRDQUE4Qjs7Ozs7SUFDOUIsNENBQThCOzs7OztJQUM5Qiw0Q0FBNkI7Ozs7O0lBQzdCLDRDQUE2Qjs7Ozs7SUFDN0IsOENBQXdFOzs7OztJQUN4RSw4Q0FBd0U7Ozs7O0lBRTVELHVDQUFzRDs7Ozs7SUFDdEQseUNBQStCOzs7OztJQUMvQix1Q0FBOEciLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IHVwZGF0ZVN0aWNreVJvd3MgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBBIGNsYXNzIHRoYXQgbWFuYWdlcyB0aGUgbGlmZSBjeWNsZSBvZiBzdGlja3kgbWV0YSByb3dzIChoZWFkZXIgJiBmb290ZXIpIHdoaWxlIHNjcm9sbGluZy5cbiAqIFN0aWNreSBtZXRhIHJvd3MgYXJlIG1vdmVkIHRvIGNvbnRhaW5lcnMgb3V0c2lkZSBvZiB0aGUgdGFibGUgc28gdGhleSBkbyBub3QgZGVwZW5kIG9uIHRoZSBgcG9zaXRpb246IHN0aWNreWAgcHJvcGVydHkuXG4gKlxuICogRm9yIGBwb3NpdGlvbjogc3RpY2t5YCB0byB3b3JrLCBhIHJlZmVyZW5jZSBwb3NpdGlvbiBpcyByZXF1aXJlZCAoYHRvcGAgZm9yIGhlYWRlciwgYGJvdHRvbWAgZm9yIGZvb3Rlcikgd2hpY2ggbXVzdCByZWZsZWN0IHRoZSBjdXJyZW50XG4gKiBvZmZzZXQgbWVhc3VyZWQgYnkgdGhlIHZpcnR1YWwgc2Nyb2xsIHZpZXdwb3J0ICh0aGlzIHBvc2l0aW9uIGNvbXBlbnNhdGUgdGhlIG9mZnNldCBvZiB2aXJ0dWFsIHNjcm9sbCBzbyB0aGUgcG9zaXRpb24gaXMgbGV2ZWxlZCwgaS5lLiBsaWtlIHRvcCAwKVxuICpcbiAqIFdoZW4gdGhlIHVzZXIgc2Nyb2xsJ3M6XG4gKiAtIFRoZSBvZmZzZXQgY2hhbmdlcyBieSB0aGUgYnJvd3NlclxuICogLSBUaGUgdmlydHVhbCBzY3JvbGwgd2lsbCBkZXRlY3QgdGhlIG5ldyBvZmZzZXQgYW5kIHVwZGF0ZSB0aGUgd3JhcHBlciB3aXRoIHRoZSBuZXcgb2Zmc2V0LlxuICpcbiAqIFRoZXJlIGlzIGEgdGltZSBnYXAgYmV0d2VlbiB0aGUgb3BlcmF0aW9ucyBhYm92ZSB3aGljaCBjYXVzZXMgcm93cyB0byBmbGlja2VyIGluIGFuZCBvdXQgb2YgdmlldywgdGhpcyBpcyB3aHkgd2UgbW92ZSB0aGVtIHRvIGEgZml4ZWQgbG9jYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBNZXRhUm93U3RpY2t5U2Nyb2xsIHtcblxuICBwcml2YXRlIHJ1bm5pbmdIZWFkZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBydW5uaW5nRm9vdGVyID0gZmFsc2U7XG4gIHByaXZhdGUgY2FuTW92ZUhlYWRlciA9IHRydWU7XG4gIHByaXZhdGUgY2FuTW92ZUZvb3RlciA9IHRydWU7XG4gIHByaXZhdGUgbW92ZWRGb290ZXJSb3dzOiBBcnJheTxbSFRNTEVsZW1lbnQsIEhUTUxFbGVtZW50LCBudW1iZXJdPiA9IFtdO1xuICBwcml2YXRlIG1vdmVkSGVhZGVyUm93czogQXJyYXk8W0hUTUxFbGVtZW50LCBIVE1MRWxlbWVudCwgbnVtYmVyXT4gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZpZXdwb3J0OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQsXG4gICAgICAgICAgICAgIHByaXZhdGUgdmlld1BvcnRFbDogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgIHByaXZhdGUgbWV0YVJvd3M6IFJlY29yZDwnaGVhZGVyJyB8ICdmb290ZXInLCB7IHJvd3M6IEhUTUxFbGVtZW50W107IHN0aWNreTogYm9vbGVhbltdOyByZW5kZXJlZDogYm9vbGVhbltdIH0+KSB7IH1cblxuICBjYW5Nb3ZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNhbk1vdmVIZWFkZXIgfHwgdGhpcy5jYW5Nb3ZlRm9vdGVyO1xuICB9XG5cbiAgaXNSdW5uaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJ1bm5pbmdIZWFkZXIgfHwgdGhpcy5ydW5uaW5nRm9vdGVyO1xuICB9XG5cbiAgbW92ZShvZmZzZXQ6IG51bWJlciwgdmlld1BvcnRFbFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0KTogYm9vbGVhbiB7XG4gICAgdGhpcy5tb3ZlSGVhZGVyKG9mZnNldCwgdmlld1BvcnRFbFJlY3QpO1xuICAgIHRoaXMubW92ZUZvb3RlcihvZmZzZXQsIHZpZXdQb3J0RWxSZWN0KTtcbiAgICByZXR1cm4gdGhpcy5pc1J1bm5pbmcoKSAmJiAhdGhpcy5jYW5Nb3ZlSGVhZGVyICYmICF0aGlzLmNhbk1vdmVGb290ZXI7XG4gIH1cblxuXG4gIHJlc3RvcmUocmVuZGVyZWRDb250ZW50T2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCB7IGhlYWRlciwgZm9vdGVyIH0gPSB0aGlzLm1ldGFSb3dzO1xuICAgIGlmICh0aGlzLnJlc3RvcmVIZWFkZXIoKSkge1xuICAgICAgdXBkYXRlU3RpY2t5Um93cyhyZW5kZXJlZENvbnRlbnRPZmZzZXQsIGhlYWRlci5yb3dzLCBoZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnJlc3RvcmVGb290ZXIoKSkge1xuICAgICAgdXBkYXRlU3RpY2t5Um93cyhyZW5kZXJlZENvbnRlbnRPZmZzZXQsIGZvb3Rlci5yb3dzLCBmb290ZXIuc3RpY2t5LCAnYm90dG9tJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlSGVhZGVyKG9mZnNldDogbnVtYmVyLCB2aWV3UG9ydEVsUmVjdDogQ2xpZW50UmVjdCB8IERPTVJlY3QpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucnVubmluZ0hlYWRlciB8fCB0aGlzLmNhbk1vdmVIZWFkZXIpIHtcbiAgICAgIHRoaXMucnVubmluZ0hlYWRlciA9IHRydWU7XG4gICAgICB0aGlzLmNhbk1vdmVIZWFkZXIgPSBmYWxzZTtcblxuICAgICAgY29uc3Qgc3RpY2t5QW5kUmVuZGVyZWQ6IG51bWJlcltdID0gW107XG4gICAgICBjb25zdCBoZWFkZXJSb3dzID0gdGhpcy5tZXRhUm93cy5oZWFkZXI7XG4gICAgICBsZXQgbW9zdFRvcFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGhlYWRlclJvd3Mucm93cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCByb3dFbCA9IGhlYWRlclJvd3Mucm93c1tpXTtcbiAgICAgICAgaWYgKGhlYWRlclJvd3Muc3RpY2t5W2ldKSB7XG4gICAgICAgICAgY29uc3QgZWxSZWN0ID0gcm93RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgaWYgKGhlYWRlclJvd3MucmVuZGVyZWRbaV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGMgPSBlbFJlY3QudG9wIC0gdmlld1BvcnRFbFJlY3QudG9wIC0gb2Zmc2V0O1xuXG4gICAgICAgICAgICAvLyBpZiBhZnRlciB0aGUgc2Nyb2xsIHRoZSBlbGVtZW50IGlzIHN0aWxsIGluIHZpZXcsIHJldHVyblxuICAgICAgICAgICAgaWYgKGNhbGMgPj0gMCB8fCAtY2FsYyA8IHZpZXdQb3J0RWxSZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICB0aGlzLmNhbk1vdmVIZWFkZXIgPSB0cnVlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghbW9zdFRvcFJlY3QpIHtcbiAgICAgICAgICAgIG1vc3RUb3BSZWN0ID0gZWxSZWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGlja3lBbmRSZW5kZXJlZC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGlja3lBbmRSZW5kZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5zdGlja3lSb3dIZWFkZXJDb250YWluZXIuc3R5bGUudG9wID0gbW9zdFRvcFJlY3QudG9wICsgJ3B4JztcbiAgICAgICAgdGhpcy5jbG9uZUFuZE1vdmVSb3codGhpcy52aWV3cG9ydC5zdGlja3lSb3dIZWFkZXJDb250YWluZXIsICBoZWFkZXJSb3dzLnJvd3MsIHN0aWNreUFuZFJlbmRlcmVkLCB0aGlzLm1vdmVkSGVhZGVyUm93cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlRm9vdGVyKG9mZnNldDogbnVtYmVyLCB2aWV3UG9ydEVsUmVjdDogQ2xpZW50UmVjdCB8IERPTVJlY3QpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucnVubmluZ0Zvb3RlciB8fCB0aGlzLmNhbk1vdmVGb290ZXIpIHtcbiAgICAgIHRoaXMucnVubmluZ0Zvb3RlciA9IHRydWU7XG4gICAgICB0aGlzLmNhbk1vdmVGb290ZXIgPSBmYWxzZTtcblxuICAgICAgY29uc3Qgc3RpY2t5QW5kUmVuZGVyZWQ6IG51bWJlcltdID0gW107XG4gICAgICBjb25zdCBmb290ZXJSb3dzID0gdGhpcy5tZXRhUm93cy5mb290ZXI7XG4gICAgICBsZXQgbW9zdFRvcFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0O1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGZvb3RlclJvd3Mucm93cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCByb3dFbCA9IGZvb3RlclJvd3Mucm93c1tpXTtcbiAgICAgICAgaWYgKGZvb3RlclJvd3Muc3RpY2t5W2ldKSB7XG4gICAgICAgICAgY29uc3QgZWxSZWN0ID0gcm93RWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgaWYgKGZvb3RlclJvd3MucmVuZGVyZWRbaV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbGMgPSBlbFJlY3QuYm90dG9tIC0gdmlld1BvcnRFbFJlY3QuYm90dG9tICsgb2Zmc2V0O1xuXG4gICAgICAgICAgICAvLyBpZiBhZnRlciB0aGUgc2Nyb2xsIHRoZSBlbGVtZW50IGlzIHN0aWxsIGluIHZpZXcsIHJldHVyblxuICAgICAgICAgICAgaWYgKGNhbGMgPj0gMCAmJiBjYWxjIDwgdmlld1BvcnRFbFJlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuTW92ZUZvb3RlciA9IHRydWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbW9zdFRvcFJlY3QgPSBlbFJlY3Q7XG4gICAgICAgICAgc3RpY2t5QW5kUmVuZGVyZWQucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RpY2t5QW5kUmVuZGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudmlld3BvcnQuc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyLnN0eWxlLmJvdHRvbSA9IGBjYWxjKDEwMCUgLSAke21vc3RUb3BSZWN0LmJvdHRvbX1weClgXG4gICAgICAgIHRoaXMuY2xvbmVBbmRNb3ZlUm93KHRoaXMudmlld3BvcnQuc3RpY2t5Um93Rm9vdGVyQ29udGFpbmVyLCBmb290ZXJSb3dzLnJvd3MsIHN0aWNreUFuZFJlbmRlcmVkLCB0aGlzLm1vdmVkRm9vdGVyUm93cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXN0b3JlSGVhZGVyKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJ1bm5pbmdIZWFkZXIpIHtcbiAgICAgIGNvbnN0IG1vdmVkSGVhZGVyUm93cyA9IHRoaXMubW92ZWRIZWFkZXJSb3dzO1xuICAgICAgdGhpcy5tb3ZlZEhlYWRlclJvd3MgPSBbXTtcbiAgICAgIHRoaXMucmVzdG9yZVJvd3MobW92ZWRIZWFkZXJSb3dzLCB0aGlzLm1ldGFSb3dzLmhlYWRlci5yb3dzKTtcbiAgICAgIHRoaXMucnVubmluZ0hlYWRlciA9IGZhbHNlO1xuICAgICAgdGhpcy5jYW5Nb3ZlSGVhZGVyID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHJlc3RvcmVGb290ZXIoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucnVubmluZ0Zvb3Rlcikge1xuICAgICAgY29uc3QgbW92ZWRGb290ZXJSb3dzID0gdGhpcy5tb3ZlZEZvb3RlclJvd3M7XG4gICAgICB0aGlzLm1vdmVkRm9vdGVyUm93cyA9IFtdO1xuICAgICAgdGhpcy5yZXN0b3JlUm93cyhtb3ZlZEZvb3RlclJvd3MsIHRoaXMubWV0YVJvd3MuZm9vdGVyLnJvd3MpO1xuICAgICAgdGhpcy5ydW5uaW5nRm9vdGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmNhbk1vdmVGb290ZXIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgY2xvbmVBbmRNb3ZlUm93KHN0aWNreVJvd0NvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IEhUTUxFbGVtZW50W10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNreUFuZFJlbmRlcmVkOiBudW1iZXJbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZVJlZjogQXJyYXk8W0hUTUxFbGVtZW50LCBIVE1MRWxlbWVudCwgbnVtYmVyXT4pOiB2b2lkIHtcbiAgICBjb25zdCBpbm5lclJvd0NvbnRhaW5lciA9IHN0aWNreVJvd0NvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZCBhcyBIVE1MRWxlbWVudDtcbiAgICBzdGlja3lSb3dDb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLnZpZXdwb3J0LmlubmVyV2lkdGggKyAncHgnO1xuICAgIGlubmVyUm93Q29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKC0ke3RoaXMudmlld1BvcnRFbC5zY3JvbGxMZWZ0fXB4KWA7XG4gICAgZm9yIChjb25zdCBpIG9mIHN0aWNreUFuZFJlbmRlcmVkKSB7XG4gICAgICBjb25zdCByb3dFbCA9IHJvd3NbaV07XG4gICAgICBjb25zdCBjbG9uZSA9IHJvd0VsLmNsb25lTm9kZSgpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY2xvbmUuc3R5bGUud2lkdGggPSAnMCc7XG4gICAgICByb3dFbC5zdHlsZS50b3AgPSByb3dFbC5zdHlsZS5ib3R0b20gPSByb3dFbC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgICAgcm93RWwucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIHJvd0VsKTtcbiAgICAgIGlubmVyUm93Q29udGFpbmVyLmFwcGVuZENoaWxkKHJvd0VsKTtcbiAgICAgIHJlc3RvcmVSZWYucHVzaChbcm93RWwsIGNsb25lLCBpXSk7XG4gICAgICAvLyBBc3NpZ24gdGhlIGNsb25lIHRvIGJlIHRoZSBzdGlja3kgcm93IGVsZW1lbnQsIHRoaXMgd2lsbCBlbnN1cmUgdGhhdCBzdGljayByb3cgdXBkYXRlc1xuICAgICAgLy8gd2lsbCBzZXQgdGhlIGB0b3BgIG9uIGFuIGFjdHVhbCBlbGVtZW50IGluIHRoZSB2aWV3cG9ydCwgdGh1cyB1cGRhdGluZyB3aXRoIGVhY2ggbGF5b3V0IHJlZmxvdy5cbiAgICAgIC8vIGlmIG5vdCBzZXQsIHdoZW4gd2UgcmV0dXJuIHRoZSBvcmlnaW5hbCByb3cgaXQncyBgdG9wYCB2YWx1ZSB3aWxsIGJlIHRydWUgYnV0IHdpbGwgbm90IHNob3cgYmVjYXVzZSBpdCB3aWxsIG5vdCB0cmlnZ2VyIGEgcmVmbG93LlxuICAgICAgcm93c1tpXSA9IGNsb25lO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzdG9yZVJvd3MocmVzdG9yZVJlZjogQXJyYXk8W0hUTUxFbGVtZW50LCBIVE1MRWxlbWVudCwgbnVtYmVyXT4sIHJvd3M6IEhUTUxFbGVtZW50W10pOiB2b2lkIHtcbiAgICBmb3IgKGNvbnN0IFtyb3dFbCwgY2xvbmUsIGluZGV4XSBvZiByZXN0b3JlUmVmKSB7XG4gICAgICByb3dFbC5zdHlsZS5wb3NpdGlvbiA9IGNsb25lLnN0eWxlLnBvc2l0aW9uO1xuICAgICAgcm93RWwuc3R5bGUuekluZGV4ID0gY2xvbmUuc3R5bGUuekluZGV4O1xuICAgICAgcm93RWwuc3R5bGUudG9wID0gY2xvbmUuc3R5bGUudG9wO1xuICAgICAgcm93RWwuc3R5bGUuYm90dG9tID0gY2xvbmUuc3R5bGUuYm90dG9tO1xuXG4gICAgICBjbG9uZS5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShyb3dFbCwgY2xvbmUpO1xuICAgICAgY2xvbmUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChjbG9uZSk7XG4gICAgICByb3dzW2luZGV4XSA9IHJvd0VsO1xuICAgIH1cbiAgfVxufVxuIl19