/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/meta-row-sticky-scroll.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __values } from "tslib";
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
var /**
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
MetaRowStickyScroll = /** @class */ (function () {
    function MetaRowStickyScroll(viewport, viewPortEl, metaRows) {
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
    MetaRowStickyScroll.prototype.canMove = /**
     * @return {?}
     */
    function () {
        return this.canMoveHeader || this.canMoveFooter;
    };
    /**
     * @return {?}
     */
    MetaRowStickyScroll.prototype.isRunning = /**
     * @return {?}
     */
    function () {
        return this.runningHeader || this.runningFooter;
    };
    /**
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    MetaRowStickyScroll.prototype.move = /**
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    function (offset, viewPortElRect) {
        this.moveHeader(offset, viewPortElRect);
        this.moveFooter(offset, viewPortElRect);
        return this.isRunning() && !this.canMoveHeader && !this.canMoveFooter;
    };
    /**
     * @param {?} renderedContentOffset
     * @return {?}
     */
    MetaRowStickyScroll.prototype.restore = /**
     * @param {?} renderedContentOffset
     * @return {?}
     */
    function (renderedContentOffset) {
        var _a = this.metaRows, header = _a.header, footer = _a.footer;
        if (this.restoreHeader()) {
            updateStickyRows(renderedContentOffset, header.rows, header.sticky, 'top');
        }
        if (this.restoreFooter()) {
            updateStickyRows(renderedContentOffset, footer.rows, footer.sticky, 'bottom');
        }
    };
    /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    MetaRowStickyScroll.prototype.moveHeader = /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    function (offset, viewPortElRect) {
        if (!this.runningHeader || this.canMoveHeader) {
            this.runningHeader = true;
            this.canMoveHeader = false;
            /** @type {?} */
            var stickyAndRendered = [];
            /** @type {?} */
            var headerRows = this.metaRows.header;
            /** @type {?} */
            var mostTopRect = void 0;
            for (var i = 0, len = headerRows.rows.length; i < len; i++) {
                /** @type {?} */
                var rowEl = headerRows.rows[i];
                if (headerRows.sticky[i]) {
                    /** @type {?} */
                    var elRect = rowEl.getBoundingClientRect();
                    if (headerRows.rendered[i]) {
                        /** @type {?} */
                        var calc = elRect.top - viewPortElRect.top - offset;
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
    };
    /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    MetaRowStickyScroll.prototype.moveFooter = /**
     * @private
     * @param {?} offset
     * @param {?} viewPortElRect
     * @return {?}
     */
    function (offset, viewPortElRect) {
        if (!this.runningFooter || this.canMoveFooter) {
            this.runningFooter = true;
            this.canMoveFooter = false;
            /** @type {?} */
            var stickyAndRendered = [];
            /** @type {?} */
            var footerRows = this.metaRows.footer;
            /** @type {?} */
            var mostTopRect = void 0;
            for (var i = 0, len = footerRows.rows.length; i < len; i++) {
                /** @type {?} */
                var rowEl = footerRows.rows[i];
                if (footerRows.sticky[i]) {
                    /** @type {?} */
                    var elRect = rowEl.getBoundingClientRect();
                    if (footerRows.rendered[i]) {
                        /** @type {?} */
                        var calc = elRect.bottom - viewPortElRect.bottom + offset;
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
                this.viewport.stickyRowFooterContainer.style.bottom = "calc(100% - " + mostTopRect.bottom + "px)";
                this.cloneAndMoveRow(this.viewport.stickyRowFooterContainer, footerRows.rows, stickyAndRendered, this.movedFooterRows);
            }
        }
    };
    /**
     * @private
     * @return {?}
     */
    MetaRowStickyScroll.prototype.restoreHeader = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.runningHeader) {
            /** @type {?} */
            var movedHeaderRows = this.movedHeaderRows;
            this.movedHeaderRows = [];
            this.restoreRows(movedHeaderRows, this.metaRows.header.rows);
            this.runningHeader = false;
            this.canMoveHeader = true;
            return true;
        }
        return false;
    };
    /**
     * @private
     * @return {?}
     */
    MetaRowStickyScroll.prototype.restoreFooter = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.runningFooter) {
            /** @type {?} */
            var movedFooterRows = this.movedFooterRows;
            this.movedFooterRows = [];
            this.restoreRows(movedFooterRows, this.metaRows.footer.rows);
            this.runningFooter = false;
            this.canMoveFooter = true;
            return true;
        }
        return false;
    };
    /**
     * @private
     * @param {?} stickyRowContainer
     * @param {?} rows
     * @param {?} stickyAndRendered
     * @param {?} restoreRef
     * @return {?}
     */
    MetaRowStickyScroll.prototype.cloneAndMoveRow = /**
     * @private
     * @param {?} stickyRowContainer
     * @param {?} rows
     * @param {?} stickyAndRendered
     * @param {?} restoreRef
     * @return {?}
     */
    function (stickyRowContainer, rows, stickyAndRendered, restoreRef) {
        var e_1, _a;
        /** @type {?} */
        var innerRowContainer = (/** @type {?} */ (stickyRowContainer.firstElementChild));
        stickyRowContainer.style.width = this.viewport.innerWidth + 'px';
        innerRowContainer.style.transform = "translateX(-" + this.viewPortEl.scrollLeft + "px)";
        try {
            for (var stickyAndRendered_1 = __values(stickyAndRendered), stickyAndRendered_1_1 = stickyAndRendered_1.next(); !stickyAndRendered_1_1.done; stickyAndRendered_1_1 = stickyAndRendered_1.next()) {
                var i = stickyAndRendered_1_1.value;
                /** @type {?} */
                var rowEl = rows[i];
                /** @type {?} */
                var clone = (/** @type {?} */ (rowEl.cloneNode()));
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (stickyAndRendered_1_1 && !stickyAndRendered_1_1.done && (_a = stickyAndRendered_1.return)) _a.call(stickyAndRendered_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * @private
     * @param {?} restoreRef
     * @param {?} rows
     * @return {?}
     */
    MetaRowStickyScroll.prototype.restoreRows = /**
     * @private
     * @param {?} restoreRef
     * @param {?} rows
     * @return {?}
     */
    function (restoreRef, rows) {
        var e_2, _a;
        try {
            for (var restoreRef_1 = __values(restoreRef), restoreRef_1_1 = restoreRef_1.next(); !restoreRef_1_1.done; restoreRef_1_1 = restoreRef_1.next()) {
                var _b = __read(restoreRef_1_1.value, 3), rowEl = _b[0], clone = _b[1], index = _b[2];
                rowEl.style.position = clone.style.position;
                rowEl.style.zIndex = clone.style.zIndex;
                rowEl.style.top = clone.style.top;
                rowEl.style.bottom = clone.style.bottom;
                clone.parentElement.insertBefore(rowEl, clone);
                clone.parentElement.removeChild(clone);
                rows[index] = rowEl;
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (restoreRef_1_1 && !restoreRef_1_1.done && (_a = restoreRef_1.return)) _a.call(restoreRef_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    return MetaRowStickyScroll;
}());
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
export { MetaRowStickyScroll };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctc3RpY2t5LXNjcm9sbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9tZXRhLXJvdy1zdGlja3ktc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUFlM0M7Ozs7Ozs7Ozs7Ozs7O0lBU0UsNkJBQW9CLFFBQThDLEVBQzlDLFVBQXVCLEVBQ3ZCLFFBQXNHO1FBRnRHLGFBQVEsR0FBUixRQUFRLENBQXNDO1FBQzlDLGVBQVUsR0FBVixVQUFVLENBQWE7UUFDdkIsYUFBUSxHQUFSLFFBQVEsQ0FBOEY7UUFUbEgsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsb0JBQWUsR0FBOEMsRUFBRSxDQUFDO1FBQ2hFLG9CQUFlLEdBQThDLEVBQUUsQ0FBQztJQUlzRCxDQUFDOzs7O0lBRS9ILHFDQUFPOzs7SUFBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xELENBQUM7Ozs7SUFFRCx1Q0FBUzs7O0lBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUNsRCxDQUFDOzs7Ozs7SUFFRCxrQ0FBSTs7Ozs7SUFBSixVQUFLLE1BQWMsRUFBRSxjQUFvQztRQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQyxTQUFTLEVBQUUs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QUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUV4QyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQy9DLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ3JCOzs7Ozs7Ozs7SUFDSCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBcEtELElBb0tDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWxLQyw0Q0FBOEI7Ozs7O0lBQzlCLDRDQUE4Qjs7Ozs7SUFDOUIsNENBQTZCOzs7OztJQUM3Qiw0Q0FBNkI7Ozs7O0lBQzdCLDhDQUF3RTs7Ozs7SUFDeEUsOENBQXdFOzs7OztJQUU1RCx1Q0FBc0Q7Ozs7O0lBQ3RELHlDQUErQjs7Ozs7SUFDL0IsdUNBQThHIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyB1cGRhdGVTdGlja3lSb3dzIH0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IG1hbmFnZXMgdGhlIGxpZmUgY3ljbGUgb2Ygc3RpY2t5IG1ldGEgcm93cyAoaGVhZGVyICYgZm9vdGVyKSB3aGlsZSBzY3JvbGxpbmcuXG4gKiBTdGlja3kgbWV0YSByb3dzIGFyZSBtb3ZlZCB0byBjb250YWluZXJzIG91dHNpZGUgb2YgdGhlIHRhYmxlIHNvIHRoZXkgZG8gbm90IGRlcGVuZCBvbiB0aGUgYHBvc2l0aW9uOiBzdGlja3lgIHByb3BlcnR5LlxuICpcbiAqIEZvciBgcG9zaXRpb246IHN0aWNreWAgdG8gd29yaywgYSByZWZlcmVuY2UgcG9zaXRpb24gaXMgcmVxdWlyZWQgKGB0b3BgIGZvciBoZWFkZXIsIGBib3R0b21gIGZvciBmb290ZXIpIHdoaWNoIG11c3QgcmVmbGVjdCB0aGUgY3VycmVudFxuICogb2Zmc2V0IG1lYXN1cmVkIGJ5IHRoZSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydCAodGhpcyBwb3NpdGlvbiBjb21wZW5zYXRlIHRoZSBvZmZzZXQgb2YgdmlydHVhbCBzY3JvbGwgc28gdGhlIHBvc2l0aW9uIGlzIGxldmVsZWQsIGkuZS4gbGlrZSB0b3AgMClcbiAqXG4gKiBXaGVuIHRoZSB1c2VyIHNjcm9sbCdzOlxuICogLSBUaGUgb2Zmc2V0IGNoYW5nZXMgYnkgdGhlIGJyb3dzZXJcbiAqIC0gVGhlIHZpcnR1YWwgc2Nyb2xsIHdpbGwgZGV0ZWN0IHRoZSBuZXcgb2Zmc2V0IGFuZCB1cGRhdGUgdGhlIHdyYXBwZXIgd2l0aCB0aGUgbmV3IG9mZnNldC5cbiAqXG4gKiBUaGVyZSBpcyBhIHRpbWUgZ2FwIGJldHdlZW4gdGhlIG9wZXJhdGlvbnMgYWJvdmUgd2hpY2ggY2F1c2VzIHJvd3MgdG8gZmxpY2tlciBpbiBhbmQgb3V0IG9mIHZpZXcsIHRoaXMgaXMgd2h5IHdlIG1vdmUgdGhlbSB0byBhIGZpeGVkIGxvY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgTWV0YVJvd1N0aWNreVNjcm9sbCB7XG5cbiAgcHJpdmF0ZSBydW5uaW5nSGVhZGVyID0gZmFsc2U7XG4gIHByaXZhdGUgcnVubmluZ0Zvb3RlciA9IGZhbHNlO1xuICBwcml2YXRlIGNhbk1vdmVIZWFkZXIgPSB0cnVlO1xuICBwcml2YXRlIGNhbk1vdmVGb290ZXIgPSB0cnVlO1xuICBwcml2YXRlIG1vdmVkRm9vdGVyUm93czogQXJyYXk8W0hUTUxFbGVtZW50LCBIVE1MRWxlbWVudCwgbnVtYmVyXT4gPSBbXTtcbiAgcHJpdmF0ZSBtb3ZlZEhlYWRlclJvd3M6IEFycmF5PFtIVE1MRWxlbWVudCwgSFRNTEVsZW1lbnQsIG51bWJlcl0+ID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB2aWV3cG9ydDogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50LFxuICAgICAgICAgICAgICBwcml2YXRlIHZpZXdQb3J0RWw6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICBwcml2YXRlIG1ldGFSb3dzOiBSZWNvcmQ8J2hlYWRlcicgfCAnZm9vdGVyJywgeyByb3dzOiBIVE1MRWxlbWVudFtdOyBzdGlja3k6IGJvb2xlYW5bXTsgcmVuZGVyZWQ6IGJvb2xlYW5bXSB9PikgeyB9XG5cbiAgY2FuTW92ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jYW5Nb3ZlSGVhZGVyIHx8IHRoaXMuY2FuTW92ZUZvb3RlcjtcbiAgfVxuXG4gIGlzUnVubmluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uaW5nSGVhZGVyIHx8IHRoaXMucnVubmluZ0Zvb3RlcjtcbiAgfVxuXG4gIG1vdmUob2Zmc2V0OiBudW1iZXIsIHZpZXdQb3J0RWxSZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdCk6IGJvb2xlYW4ge1xuICAgIHRoaXMubW92ZUhlYWRlcihvZmZzZXQsIHZpZXdQb3J0RWxSZWN0KTtcbiAgICB0aGlzLm1vdmVGb290ZXIob2Zmc2V0LCB2aWV3UG9ydEVsUmVjdCk7XG4gICAgcmV0dXJuIHRoaXMuaXNSdW5uaW5nKCkgJiYgIXRoaXMuY2FuTW92ZUhlYWRlciAmJiAhdGhpcy5jYW5Nb3ZlRm9vdGVyO1xuICB9XG5cblxuICByZXN0b3JlKHJlbmRlcmVkQ29udGVudE9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgeyBoZWFkZXIsIGZvb3RlciB9ID0gdGhpcy5tZXRhUm93cztcbiAgICBpZiAodGhpcy5yZXN0b3JlSGVhZGVyKCkpIHtcbiAgICAgIHVwZGF0ZVN0aWNreVJvd3MocmVuZGVyZWRDb250ZW50T2Zmc2V0LCBoZWFkZXIucm93cywgaGVhZGVyLnN0aWNreSwgJ3RvcCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZXN0b3JlRm9vdGVyKCkpIHtcbiAgICAgIHVwZGF0ZVN0aWNreVJvd3MocmVuZGVyZWRDb250ZW50T2Zmc2V0LCBmb290ZXIucm93cywgZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW92ZUhlYWRlcihvZmZzZXQ6IG51bWJlciwgdmlld1BvcnRFbFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJ1bm5pbmdIZWFkZXIgfHwgdGhpcy5jYW5Nb3ZlSGVhZGVyKSB7XG4gICAgICB0aGlzLnJ1bm5pbmdIZWFkZXIgPSB0cnVlO1xuICAgICAgdGhpcy5jYW5Nb3ZlSGVhZGVyID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHN0aWNreUFuZFJlbmRlcmVkOiBudW1iZXJbXSA9IFtdO1xuICAgICAgY29uc3QgaGVhZGVyUm93cyA9IHRoaXMubWV0YVJvd3MuaGVhZGVyO1xuICAgICAgbGV0IG1vc3RUb3BSZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdDtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBoZWFkZXJSb3dzLnJvd3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3Qgcm93RWwgPSBoZWFkZXJSb3dzLnJvd3NbaV07XG4gICAgICAgIGlmIChoZWFkZXJSb3dzLnN0aWNreVtpXSkge1xuICAgICAgICAgIGNvbnN0IGVsUmVjdCA9IHJvd0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChoZWFkZXJSb3dzLnJlbmRlcmVkW2ldKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxjID0gZWxSZWN0LnRvcCAtIHZpZXdQb3J0RWxSZWN0LnRvcCAtIG9mZnNldDtcblxuICAgICAgICAgICAgLy8gaWYgYWZ0ZXIgdGhlIHNjcm9sbCB0aGUgZWxlbWVudCBpcyBzdGlsbCBpbiB2aWV3LCByZXR1cm5cbiAgICAgICAgICAgIGlmIChjYWxjID49IDAgfHwgLWNhbGMgPCB2aWV3UG9ydEVsUmVjdC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5Nb3ZlSGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW1vc3RUb3BSZWN0KSB7XG4gICAgICAgICAgICBtb3N0VG9wUmVjdCA9IGVsUmVjdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RpY2t5QW5kUmVuZGVyZWQucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RpY2t5QW5kUmVuZGVyZWQubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudmlld3BvcnQuc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyLnN0eWxlLnRvcCA9IG1vc3RUb3BSZWN0LnRvcCArICdweCc7XG4gICAgICAgIHRoaXMuY2xvbmVBbmRNb3ZlUm93KHRoaXMudmlld3BvcnQuc3RpY2t5Um93SGVhZGVyQ29udGFpbmVyLCAgaGVhZGVyUm93cy5yb3dzLCBzdGlja3lBbmRSZW5kZXJlZCwgdGhpcy5tb3ZlZEhlYWRlclJvd3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbW92ZUZvb3RlcihvZmZzZXQ6IG51bWJlciwgdmlld1BvcnRFbFJlY3Q6IENsaWVudFJlY3QgfCBET01SZWN0KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJ1bm5pbmdGb290ZXIgfHwgdGhpcy5jYW5Nb3ZlRm9vdGVyKSB7XG4gICAgICB0aGlzLnJ1bm5pbmdGb290ZXIgPSB0cnVlO1xuICAgICAgdGhpcy5jYW5Nb3ZlRm9vdGVyID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IHN0aWNreUFuZFJlbmRlcmVkOiBudW1iZXJbXSA9IFtdO1xuICAgICAgY29uc3QgZm9vdGVyUm93cyA9IHRoaXMubWV0YVJvd3MuZm9vdGVyO1xuICAgICAgbGV0IG1vc3RUb3BSZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdDtcbiAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBmb290ZXJSb3dzLnJvd3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY29uc3Qgcm93RWwgPSBmb290ZXJSb3dzLnJvd3NbaV07XG4gICAgICAgIGlmIChmb290ZXJSb3dzLnN0aWNreVtpXSkge1xuICAgICAgICAgIGNvbnN0IGVsUmVjdCA9IHJvd0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGlmIChmb290ZXJSb3dzLnJlbmRlcmVkW2ldKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxjID0gZWxSZWN0LmJvdHRvbSAtIHZpZXdQb3J0RWxSZWN0LmJvdHRvbSArIG9mZnNldDtcblxuICAgICAgICAgICAgLy8gaWYgYWZ0ZXIgdGhlIHNjcm9sbCB0aGUgZWxlbWVudCBpcyBzdGlsbCBpbiB2aWV3LCByZXR1cm5cbiAgICAgICAgICAgIGlmIChjYWxjID49IDAgJiYgY2FsYyA8IHZpZXdQb3J0RWxSZWN0LmhlaWdodCkge1xuICAgICAgICAgICAgICB0aGlzLmNhbk1vdmVGb290ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIG1vc3RUb3BSZWN0ID0gZWxSZWN0O1xuICAgICAgICAgIHN0aWNreUFuZFJlbmRlcmVkLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0aWNreUFuZFJlbmRlcmVkLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnZpZXdwb3J0LnN0aWNreVJvd0Zvb3RlckNvbnRhaW5lci5zdHlsZS5ib3R0b20gPSBgY2FsYygxMDAlIC0gJHttb3N0VG9wUmVjdC5ib3R0b219cHgpYFxuICAgICAgICB0aGlzLmNsb25lQW5kTW92ZVJvdyh0aGlzLnZpZXdwb3J0LnN0aWNreVJvd0Zvb3RlckNvbnRhaW5lciwgZm9vdGVyUm93cy5yb3dzLCBzdGlja3lBbmRSZW5kZXJlZCwgdGhpcy5tb3ZlZEZvb3RlclJvd3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgcmVzdG9yZUhlYWRlcigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nSGVhZGVyKSB7XG4gICAgICBjb25zdCBtb3ZlZEhlYWRlclJvd3MgPSB0aGlzLm1vdmVkSGVhZGVyUm93cztcbiAgICAgIHRoaXMubW92ZWRIZWFkZXJSb3dzID0gW107XG4gICAgICB0aGlzLnJlc3RvcmVSb3dzKG1vdmVkSGVhZGVyUm93cywgdGhpcy5tZXRhUm93cy5oZWFkZXIucm93cyk7XG4gICAgICB0aGlzLnJ1bm5pbmdIZWFkZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2FuTW92ZUhlYWRlciA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSByZXN0b3JlRm9vdGVyKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnJ1bm5pbmdGb290ZXIpIHtcbiAgICAgIGNvbnN0IG1vdmVkRm9vdGVyUm93cyA9IHRoaXMubW92ZWRGb290ZXJSb3dzO1xuICAgICAgdGhpcy5tb3ZlZEZvb3RlclJvd3MgPSBbXTtcbiAgICAgIHRoaXMucmVzdG9yZVJvd3MobW92ZWRGb290ZXJSb3dzLCB0aGlzLm1ldGFSb3dzLmZvb3Rlci5yb3dzKTtcbiAgICAgIHRoaXMucnVubmluZ0Zvb3RlciA9IGZhbHNlO1xuICAgICAgdGhpcy5jYW5Nb3ZlRm9vdGVyID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGNsb25lQW5kTW92ZVJvdyhzdGlja3lSb3dDb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBIVE1MRWxlbWVudFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlja3lBbmRSZW5kZXJlZDogbnVtYmVyW10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmVSZWY6IEFycmF5PFtIVE1MRWxlbWVudCwgSFRNTEVsZW1lbnQsIG51bWJlcl0+KTogdm9pZCB7XG4gICAgY29uc3QgaW5uZXJSb3dDb250YWluZXIgPSBzdGlja3lSb3dDb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgc3RpY2t5Um93Q29udGFpbmVyLnN0eWxlLndpZHRoID0gdGhpcy52aWV3cG9ydC5pbm5lcldpZHRoICsgJ3B4JztcbiAgICBpbm5lclJvd0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgtJHt0aGlzLnZpZXdQb3J0RWwuc2Nyb2xsTGVmdH1weClgO1xuICAgIGZvciAoY29uc3QgaSBvZiBzdGlja3lBbmRSZW5kZXJlZCkge1xuICAgICAgY29uc3Qgcm93RWwgPSByb3dzW2ldO1xuICAgICAgY29uc3QgY2xvbmUgPSByb3dFbC5jbG9uZU5vZGUoKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNsb25lLnN0eWxlLndpZHRoID0gJzAnO1xuICAgICAgcm93RWwuc3R5bGUudG9wID0gcm93RWwuc3R5bGUuYm90dG9tID0gcm93RWwuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICAgIHJvd0VsLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCByb3dFbCk7XG4gICAgICBpbm5lclJvd0NvbnRhaW5lci5hcHBlbmRDaGlsZChyb3dFbCk7XG4gICAgICByZXN0b3JlUmVmLnB1c2goW3Jvd0VsLCBjbG9uZSwgaV0pO1xuICAgICAgLy8gQXNzaWduIHRoZSBjbG9uZSB0byBiZSB0aGUgc3RpY2t5IHJvdyBlbGVtZW50LCB0aGlzIHdpbGwgZW5zdXJlIHRoYXQgc3RpY2sgcm93IHVwZGF0ZXNcbiAgICAgIC8vIHdpbGwgc2V0IHRoZSBgdG9wYCBvbiBhbiBhY3R1YWwgZWxlbWVudCBpbiB0aGUgdmlld3BvcnQsIHRodXMgdXBkYXRpbmcgd2l0aCBlYWNoIGxheW91dCByZWZsb3cuXG4gICAgICAvLyBpZiBub3Qgc2V0LCB3aGVuIHdlIHJldHVybiB0aGUgb3JpZ2luYWwgcm93IGl0J3MgYHRvcGAgdmFsdWUgd2lsbCBiZSB0cnVlIGJ1dCB3aWxsIG5vdCBzaG93IGJlY2F1c2UgaXQgd2lsbCBub3QgdHJpZ2dlciBhIHJlZmxvdy5cbiAgICAgIHJvd3NbaV0gPSBjbG9uZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc3RvcmVSb3dzKHJlc3RvcmVSZWY6IEFycmF5PFtIVE1MRWxlbWVudCwgSFRNTEVsZW1lbnQsIG51bWJlcl0+LCByb3dzOiBIVE1MRWxlbWVudFtdKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBbcm93RWwsIGNsb25lLCBpbmRleF0gb2YgcmVzdG9yZVJlZikge1xuICAgICAgcm93RWwuc3R5bGUucG9zaXRpb24gPSBjbG9uZS5zdHlsZS5wb3NpdGlvbjtcbiAgICAgIHJvd0VsLnN0eWxlLnpJbmRleCA9IGNsb25lLnN0eWxlLnpJbmRleDtcbiAgICAgIHJvd0VsLnN0eWxlLnRvcCA9IGNsb25lLnN0eWxlLnRvcDtcbiAgICAgIHJvd0VsLnN0eWxlLmJvdHRvbSA9IGNsb25lLnN0eWxlLmJvdHRvbTtcblxuICAgICAgY2xvbmUucGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUocm93RWwsIGNsb25lKTtcbiAgICAgIGNsb25lLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoY2xvbmUpO1xuICAgICAgcm93c1tpbmRleF0gPSByb3dFbDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==