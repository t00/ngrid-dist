/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
            for (var stickyAndRendered_1 = tslib_1.__values(stickyAndRendered), stickyAndRendered_1_1 = stickyAndRendered_1.next(); !stickyAndRendered_1_1.done; stickyAndRendered_1_1 = stickyAndRendered_1.next()) {
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
            for (var restoreRef_1 = tslib_1.__values(restoreRef), restoreRef_1_1 = restoreRef_1.next(); !restoreRef_1_1.done; restoreRef_1_1 = restoreRef_1.next()) {
                var _b = tslib_1.__read(restoreRef_1_1.value, 3), rowEl = _b[0], clone = _b[1], index = _b[2];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctc3RpY2t5LXNjcm9sbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC9tZXRhLXJvdy1zdGlja3ktc2Nyb2xsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7OztBQWUzQzs7Ozs7Ozs7Ozs7Ozs7SUFTRSw2QkFBb0IsUUFBOEMsRUFDOUMsVUFBdUIsRUFDdkIsUUFBc0c7UUFGdEcsYUFBUSxHQUFSLFFBQVEsQ0FBc0M7UUFDOUMsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUN2QixhQUFRLEdBQVIsUUFBUSxDQUE4RjtRQVRsSCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixvQkFBZSxHQUE4QyxFQUFFLENBQUM7UUFDaEUsb0JBQWUsR0FBOEMsRUFBRSxDQUFDO0lBSXNELENBQUM7Ozs7SUFFL0gscUNBQU87OztJQUFQO1FBQ0UsT0FBTyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDbEQsQ0FBQzs7OztJQUVELHVDQUFTOzs7SUFBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2xELENBQUM7Ozs7OztJQUVELGtDQUFJOzs7OztJQUFKLFVBQUssTUFBYyxFQUFFLGNBQW9DO1FBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSxJ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QUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNsQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFFeEMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMvQyxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQzthQUNyQjs7Ozs7Ozs7O0lBQ0gsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXBLRCxJQW9LQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFsS0MsNENBQThCOzs7OztJQUM5Qiw0Q0FBOEI7Ozs7O0lBQzlCLDRDQUE2Qjs7Ozs7SUFDN0IsNENBQTZCOzs7OztJQUM3Qiw4Q0FBd0U7Ozs7O0lBQ3hFLDhDQUF3RTs7Ozs7SUFFNUQsdUNBQXNEOzs7OztJQUN0RCx5Q0FBK0I7Ozs7O0lBQy9CLHVDQUE4RyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgdXBkYXRlU3RpY2t5Um93cyB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIEEgY2xhc3MgdGhhdCBtYW5hZ2VzIHRoZSBsaWZlIGN5Y2xlIG9mIHN0aWNreSBtZXRhIHJvd3MgKGhlYWRlciAmIGZvb3Rlcikgd2hpbGUgc2Nyb2xsaW5nLlxuICogU3RpY2t5IG1ldGEgcm93cyBhcmUgbW92ZWQgdG8gY29udGFpbmVycyBvdXRzaWRlIG9mIHRoZSB0YWJsZSBzbyB0aGV5IGRvIG5vdCBkZXBlbmQgb24gdGhlIGBwb3NpdGlvbjogc3RpY2t5YCBwcm9wZXJ0eS5cbiAqXG4gKiBGb3IgYHBvc2l0aW9uOiBzdGlja3lgIHRvIHdvcmssIGEgcmVmZXJlbmNlIHBvc2l0aW9uIGlzIHJlcXVpcmVkIChgdG9wYCBmb3IgaGVhZGVyLCBgYm90dG9tYCBmb3IgZm9vdGVyKSB3aGljaCBtdXN0IHJlZmxlY3QgdGhlIGN1cnJlbnRcbiAqIG9mZnNldCBtZWFzdXJlZCBieSB0aGUgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQgKHRoaXMgcG9zaXRpb24gY29tcGVuc2F0ZSB0aGUgb2Zmc2V0IG9mIHZpcnR1YWwgc2Nyb2xsIHNvIHRoZSBwb3NpdGlvbiBpcyBsZXZlbGVkLCBpLmUuIGxpa2UgdG9wIDApXG4gKlxuICogV2hlbiB0aGUgdXNlciBzY3JvbGwnczpcbiAqIC0gVGhlIG9mZnNldCBjaGFuZ2VzIGJ5IHRoZSBicm93c2VyXG4gKiAtIFRoZSB2aXJ0dWFsIHNjcm9sbCB3aWxsIGRldGVjdCB0aGUgbmV3IG9mZnNldCBhbmQgdXBkYXRlIHRoZSB3cmFwcGVyIHdpdGggdGhlIG5ldyBvZmZzZXQuXG4gKlxuICogVGhlcmUgaXMgYSB0aW1lIGdhcCBiZXR3ZWVuIHRoZSBvcGVyYXRpb25zIGFib3ZlIHdoaWNoIGNhdXNlcyByb3dzIHRvIGZsaWNrZXIgaW4gYW5kIG91dCBvZiB2aWV3LCB0aGlzIGlzIHdoeSB3ZSBtb3ZlIHRoZW0gdG8gYSBmaXhlZCBsb2NhdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIE1ldGFSb3dTdGlja3lTY3JvbGwge1xuXG4gIHByaXZhdGUgcnVubmluZ0hlYWRlciA9IGZhbHNlO1xuICBwcml2YXRlIHJ1bm5pbmdGb290ZXIgPSBmYWxzZTtcbiAgcHJpdmF0ZSBjYW5Nb3ZlSGVhZGVyID0gdHJ1ZTtcbiAgcHJpdmF0ZSBjYW5Nb3ZlRm9vdGVyID0gdHJ1ZTtcbiAgcHJpdmF0ZSBtb3ZlZEZvb3RlclJvd3M6IEFycmF5PFtIVE1MRWxlbWVudCwgSFRNTEVsZW1lbnQsIG51bWJlcl0+ID0gW107XG4gIHByaXZhdGUgbW92ZWRIZWFkZXJSb3dzOiBBcnJheTxbSFRNTEVsZW1lbnQsIEhUTUxFbGVtZW50LCBudW1iZXJdPiA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld3BvcnQ6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSB2aWV3UG9ydEVsOiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBtZXRhUm93czogUmVjb3JkPCdoZWFkZXInIHwgJ2Zvb3RlcicsIHsgcm93czogSFRNTEVsZW1lbnRbXTsgc3RpY2t5OiBib29sZWFuW107IHJlbmRlcmVkOiBib29sZWFuW10gfT4pIHsgfVxuXG4gIGNhbk1vdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FuTW92ZUhlYWRlciB8fCB0aGlzLmNhbk1vdmVGb290ZXI7XG4gIH1cblxuICBpc1J1bm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucnVubmluZ0hlYWRlciB8fCB0aGlzLnJ1bm5pbmdGb290ZXI7XG4gIH1cblxuICBtb3ZlKG9mZnNldDogbnVtYmVyLCB2aWV3UG9ydEVsUmVjdDogQ2xpZW50UmVjdCB8IERPTVJlY3QpOiBib29sZWFuIHtcbiAgICB0aGlzLm1vdmVIZWFkZXIob2Zmc2V0LCB2aWV3UG9ydEVsUmVjdCk7XG4gICAgdGhpcy5tb3ZlRm9vdGVyKG9mZnNldCwgdmlld1BvcnRFbFJlY3QpO1xuICAgIHJldHVybiB0aGlzLmlzUnVubmluZygpICYmICF0aGlzLmNhbk1vdmVIZWFkZXIgJiYgIXRoaXMuY2FuTW92ZUZvb3RlcjtcbiAgfVxuXG5cbiAgcmVzdG9yZShyZW5kZXJlZENvbnRlbnRPZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHsgaGVhZGVyLCBmb290ZXIgfSA9IHRoaXMubWV0YVJvd3M7XG4gICAgaWYgKHRoaXMucmVzdG9yZUhlYWRlcigpKSB7XG4gICAgICB1cGRhdGVTdGlja3lSb3dzKHJlbmRlcmVkQ29udGVudE9mZnNldCwgaGVhZGVyLnJvd3MsIGhlYWRlci5zdGlja3ksICd0b3AnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVzdG9yZUZvb3RlcigpKSB7XG4gICAgICB1cGRhdGVTdGlja3lSb3dzKHJlbmRlcmVkQ29udGVudE9mZnNldCwgZm9vdGVyLnJvd3MsIGZvb3Rlci5zdGlja3ksICdib3R0b20nKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVIZWFkZXIob2Zmc2V0OiBudW1iZXIsIHZpZXdQb3J0RWxSZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ydW5uaW5nSGVhZGVyIHx8IHRoaXMuY2FuTW92ZUhlYWRlcikge1xuICAgICAgdGhpcy5ydW5uaW5nSGVhZGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2FuTW92ZUhlYWRlciA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBzdGlja3lBbmRSZW5kZXJlZDogbnVtYmVyW10gPSBbXTtcbiAgICAgIGNvbnN0IGhlYWRlclJvd3MgPSB0aGlzLm1ldGFSb3dzLmhlYWRlcjtcbiAgICAgIGxldCBtb3N0VG9wUmVjdDogQ2xpZW50UmVjdCB8IERPTVJlY3Q7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gaGVhZGVyUm93cy5yb3dzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJvd0VsID0gaGVhZGVyUm93cy5yb3dzW2ldO1xuICAgICAgICBpZiAoaGVhZGVyUm93cy5zdGlja3lbaV0pIHtcbiAgICAgICAgICBjb25zdCBlbFJlY3QgPSByb3dFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAoaGVhZGVyUm93cy5yZW5kZXJlZFtpXSkge1xuICAgICAgICAgICAgY29uc3QgY2FsYyA9IGVsUmVjdC50b3AgLSB2aWV3UG9ydEVsUmVjdC50b3AgLSBvZmZzZXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIGFmdGVyIHRoZSBzY3JvbGwgdGhlIGVsZW1lbnQgaXMgc3RpbGwgaW4gdmlldywgcmV0dXJuXG4gICAgICAgICAgICBpZiAoY2FsYyA+PSAwIHx8IC1jYWxjIDwgdmlld1BvcnRFbFJlY3QuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgIHRoaXMuY2FuTW92ZUhlYWRlciA9IHRydWU7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFtb3N0VG9wUmVjdCkge1xuICAgICAgICAgICAgbW9zdFRvcFJlY3QgPSBlbFJlY3Q7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0aWNreUFuZFJlbmRlcmVkLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0aWNreUFuZFJlbmRlcmVkLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnZpZXdwb3J0LnN0aWNreVJvd0hlYWRlckNvbnRhaW5lci5zdHlsZS50b3AgPSBtb3N0VG9wUmVjdC50b3AgKyAncHgnO1xuICAgICAgICB0aGlzLmNsb25lQW5kTW92ZVJvdyh0aGlzLnZpZXdwb3J0LnN0aWNreVJvd0hlYWRlckNvbnRhaW5lciwgIGhlYWRlclJvd3Mucm93cywgc3RpY2t5QW5kUmVuZGVyZWQsIHRoaXMubW92ZWRIZWFkZXJSb3dzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVGb290ZXIob2Zmc2V0OiBudW1iZXIsIHZpZXdQb3J0RWxSZWN0OiBDbGllbnRSZWN0IHwgRE9NUmVjdCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ydW5uaW5nRm9vdGVyIHx8IHRoaXMuY2FuTW92ZUZvb3Rlcikge1xuICAgICAgdGhpcy5ydW5uaW5nRm9vdGVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2FuTW92ZUZvb3RlciA9IGZhbHNlO1xuXG4gICAgICBjb25zdCBzdGlja3lBbmRSZW5kZXJlZDogbnVtYmVyW10gPSBbXTtcbiAgICAgIGNvbnN0IGZvb3RlclJvd3MgPSB0aGlzLm1ldGFSb3dzLmZvb3RlcjtcbiAgICAgIGxldCBtb3N0VG9wUmVjdDogQ2xpZW50UmVjdCB8IERPTVJlY3Q7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZm9vdGVyUm93cy5yb3dzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHJvd0VsID0gZm9vdGVyUm93cy5yb3dzW2ldO1xuICAgICAgICBpZiAoZm9vdGVyUm93cy5zdGlja3lbaV0pIHtcbiAgICAgICAgICBjb25zdCBlbFJlY3QgPSByb3dFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBpZiAoZm9vdGVyUm93cy5yZW5kZXJlZFtpXSkge1xuICAgICAgICAgICAgY29uc3QgY2FsYyA9IGVsUmVjdC5ib3R0b20gLSB2aWV3UG9ydEVsUmVjdC5ib3R0b20gKyBvZmZzZXQ7XG5cbiAgICAgICAgICAgIC8vIGlmIGFmdGVyIHRoZSBzY3JvbGwgdGhlIGVsZW1lbnQgaXMgc3RpbGwgaW4gdmlldywgcmV0dXJuXG4gICAgICAgICAgICBpZiAoY2FsYyA+PSAwICYmIGNhbGMgPCB2aWV3UG9ydEVsUmVjdC5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgdGhpcy5jYW5Nb3ZlRm9vdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBtb3N0VG9wUmVjdCA9IGVsUmVjdDtcbiAgICAgICAgICBzdGlja3lBbmRSZW5kZXJlZC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGlja3lBbmRSZW5kZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy52aWV3cG9ydC5zdGlja3lSb3dGb290ZXJDb250YWluZXIuc3R5bGUuYm90dG9tID0gYGNhbGMoMTAwJSAtICR7bW9zdFRvcFJlY3QuYm90dG9tfXB4KWBcbiAgICAgICAgdGhpcy5jbG9uZUFuZE1vdmVSb3codGhpcy52aWV3cG9ydC5zdGlja3lSb3dGb290ZXJDb250YWluZXIsIGZvb3RlclJvd3Mucm93cywgc3RpY2t5QW5kUmVuZGVyZWQsIHRoaXMubW92ZWRGb290ZXJSb3dzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc3RvcmVIZWFkZXIoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucnVubmluZ0hlYWRlcikge1xuICAgICAgY29uc3QgbW92ZWRIZWFkZXJSb3dzID0gdGhpcy5tb3ZlZEhlYWRlclJvd3M7XG4gICAgICB0aGlzLm1vdmVkSGVhZGVyUm93cyA9IFtdO1xuICAgICAgdGhpcy5yZXN0b3JlUm93cyhtb3ZlZEhlYWRlclJvd3MsIHRoaXMubWV0YVJvd3MuaGVhZGVyLnJvd3MpO1xuICAgICAgdGhpcy5ydW5uaW5nSGVhZGVyID0gZmFsc2U7XG4gICAgICB0aGlzLmNhbk1vdmVIZWFkZXIgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzdG9yZUZvb3RlcigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nRm9vdGVyKSB7XG4gICAgICBjb25zdCBtb3ZlZEZvb3RlclJvd3MgPSB0aGlzLm1vdmVkRm9vdGVyUm93cztcbiAgICAgIHRoaXMubW92ZWRGb290ZXJSb3dzID0gW107XG4gICAgICB0aGlzLnJlc3RvcmVSb3dzKG1vdmVkRm9vdGVyUm93cywgdGhpcy5tZXRhUm93cy5mb290ZXIucm93cyk7XG4gICAgICB0aGlzLnJ1bm5pbmdGb290ZXIgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2FuTW92ZUZvb3RlciA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9uZUFuZE1vdmVSb3coc3RpY2t5Um93Q29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm93czogSFRNTEVsZW1lbnRbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5QW5kUmVuZGVyZWQ6IG51bWJlcltdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0b3JlUmVmOiBBcnJheTxbSFRNTEVsZW1lbnQsIEhUTUxFbGVtZW50LCBudW1iZXJdPik6IHZvaWQge1xuICAgIGNvbnN0IGlubmVyUm93Q29udGFpbmVyID0gc3RpY2t5Um93Q29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkIGFzIEhUTUxFbGVtZW50O1xuICAgIHN0aWNreVJvd0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMudmlld3BvcnQuaW5uZXJXaWR0aCArICdweCc7XG4gICAgaW5uZXJSb3dDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoLSR7dGhpcy52aWV3UG9ydEVsLnNjcm9sbExlZnR9cHgpYDtcbiAgICBmb3IgKGNvbnN0IGkgb2Ygc3RpY2t5QW5kUmVuZGVyZWQpIHtcbiAgICAgIGNvbnN0IHJvd0VsID0gcm93c1tpXTtcbiAgICAgIGNvbnN0IGNsb25lID0gcm93RWwuY2xvbmVOb2RlKCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICBjbG9uZS5zdHlsZS53aWR0aCA9ICcwJztcbiAgICAgIHJvd0VsLnN0eWxlLnRvcCA9IHJvd0VsLnN0eWxlLmJvdHRvbSA9IHJvd0VsLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgICByb3dFbC5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShjbG9uZSwgcm93RWwpO1xuICAgICAgaW5uZXJSb3dDb250YWluZXIuYXBwZW5kQ2hpbGQocm93RWwpO1xuICAgICAgcmVzdG9yZVJlZi5wdXNoKFtyb3dFbCwgY2xvbmUsIGldKTtcbiAgICAgIC8vIEFzc2lnbiB0aGUgY2xvbmUgdG8gYmUgdGhlIHN0aWNreSByb3cgZWxlbWVudCwgdGhpcyB3aWxsIGVuc3VyZSB0aGF0IHN0aWNrIHJvdyB1cGRhdGVzXG4gICAgICAvLyB3aWxsIHNldCB0aGUgYHRvcGAgb24gYW4gYWN0dWFsIGVsZW1lbnQgaW4gdGhlIHZpZXdwb3J0LCB0aHVzIHVwZGF0aW5nIHdpdGggZWFjaCBsYXlvdXQgcmVmbG93LlxuICAgICAgLy8gaWYgbm90IHNldCwgd2hlbiB3ZSByZXR1cm4gdGhlIG9yaWdpbmFsIHJvdyBpdCdzIGB0b3BgIHZhbHVlIHdpbGwgYmUgdHJ1ZSBidXQgd2lsbCBub3Qgc2hvdyBiZWNhdXNlIGl0IHdpbGwgbm90IHRyaWdnZXIgYSByZWZsb3cuXG4gICAgICByb3dzW2ldID0gY2xvbmU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXN0b3JlUm93cyhyZXN0b3JlUmVmOiBBcnJheTxbSFRNTEVsZW1lbnQsIEhUTUxFbGVtZW50LCBudW1iZXJdPiwgcm93czogSFRNTEVsZW1lbnRbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgW3Jvd0VsLCBjbG9uZSwgaW5kZXhdIG9mIHJlc3RvcmVSZWYpIHtcbiAgICAgIHJvd0VsLnN0eWxlLnBvc2l0aW9uID0gY2xvbmUuc3R5bGUucG9zaXRpb247XG4gICAgICByb3dFbC5zdHlsZS56SW5kZXggPSBjbG9uZS5zdHlsZS56SW5kZXg7XG4gICAgICByb3dFbC5zdHlsZS50b3AgPSBjbG9uZS5zdHlsZS50b3A7XG4gICAgICByb3dFbC5zdHlsZS5ib3R0b20gPSBjbG9uZS5zdHlsZS5ib3R0b207XG5cbiAgICAgIGNsb25lLnBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHJvd0VsLCBjbG9uZSk7XG4gICAgICBjbG9uZS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgIHJvd3NbaW5kZXhdID0gcm93RWw7XG4gICAgfVxuICB9XG59XG4iXX0=