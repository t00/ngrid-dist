/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Observable } from 'rxjs';
/**
 * A class that tracks the size of items that have been seen and uses it to estimate the average
 * item size.
 */
export class ItemSizeAverager {
    /** @param defaultItemSize The default size to use for items when no data is available. */
    constructor(defaultItemSize = 50) {
        /** The total amount of weight behind the current average. */
        this._totalWeight = 0;
        this._defaultItemSize = defaultItemSize;
        this._averageItemSize = defaultItemSize;
    }
    /** Returns the average item size. */
    getAverageItemSize() {
        return this._averageItemSize;
    }
    /**
     * Adds a measurement sample for the estimator to consider.
     * @param range The measured range.
     * @param size The measured size of the given range in pixels.
     */
    addSample(range, size) {
        const newTotalWeight = this._totalWeight + range.end - range.start;
        if (newTotalWeight) {
            const newAverageItemSize = (size + this._averageItemSize * this._totalWeight) / newTotalWeight;
            if (newAverageItemSize) {
                this._averageItemSize = newAverageItemSize;
                this._totalWeight = newTotalWeight;
            }
        }
    }
    /** Resets the averager. */
    reset() {
        this._averageItemSize = this._defaultItemSize;
        this._totalWeight = 0;
    }
}
/** Virtual scrolling strategy for lists with items of unknown or dynamic size. */
export class AutoSizeVirtualScrollStrategy {
    /**
     * @param minBufferPx The minimum amount of buffer rendered beyond the viewport (in pixels).
     *     If the amount of buffer dips below this number, more items will be rendered.
     * @param maxBufferPx The number of pixels worth of buffer to shoot for when rendering new items.
     *     If the actual amount turns out to be less it will not necessarily trigger an additional
     *     rendering cycle (as long as the amount of buffer is still greater than `minBufferPx`).
     * @param averager The averager used to estimate the size of unseen items.
     */
    constructor(minBufferPx, maxBufferPx, averager = new ItemSizeAverager()) {
        /** @docs-private Implemented as part of VirtualScrollStrategy. */
        this.scrolledIndexChange = new Observable(() => {
            // TODO(mmalerba): Implement.
            if (typeof ngDevMode === 'undefined' || ngDevMode) {
                throw Error('cdk-virtual-scroll: scrolledIndexChange is currently not supported for the' +
                    ' autosize scroll strategy');
            }
        });
        /** The attached viewport. */
        this._viewport = null;
        /**
         * The number of consecutive cycles where removing extra items has failed. Failure here means that
         * we estimated how many items we could safely remove, but our estimate turned out to be too much
         * and it wasn't safe to remove that many elements.
         */
        this._removalFailures = 0;
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
        this._averager = averager;
    }
    /**
     * Attaches this scroll strategy to a viewport.
     * @param viewport The viewport to attach this strategy to.
     */
    attach(viewport) {
        this._averager.reset();
        this._viewport = viewport;
        this._renderContentForCurrentOffset();
    }
    /** Detaches this scroll strategy from the currently attached viewport. */
    detach() {
        this._viewport = null;
    }
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    onContentScrolled() {
        if (this._viewport) {
            this._updateRenderedContentAfterScroll();
        }
    }
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    onDataLengthChanged() {
        if (this._viewport) {
            this._renderContentForCurrentOffset();
            this._checkRenderedContentSize();
        }
    }
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    onContentRendered() {
        if (this._viewport) {
            this._checkRenderedContentSize();
        }
    }
    /** @docs-private Implemented as part of VirtualScrollStrategy. */
    onRenderedOffsetChanged() {
        if (this._viewport) {
            this._checkRenderedContentOffset();
        }
    }
    /** Scroll to the offset for the given index. */
    scrollToIndex() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            // TODO(mmalerba): Implement.
            throw Error('cdk-virtual-scroll: scrollToIndex is currently not supported for the autosize'
                + ' scroll strategy');
        }
    }
    /**
     * Update the buffer parameters.
     * @param minBufferPx The minimum amount of buffer rendered beyond the viewport (in pixels).
     * @param maxBufferPx The number of buffer items to render beyond the edge of the viewport (in
     *     pixels).
     */
    updateBufferSize(minBufferPx, maxBufferPx) {
        if (maxBufferPx < minBufferPx) {
            throw ('CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx');
        }
        this._minBufferPx = minBufferPx;
        this._maxBufferPx = maxBufferPx;
    }
    /** Update the rendered content after the user scrolls. */
    _updateRenderedContentAfterScroll() {
        const viewport = this._viewport;
        // The current scroll offset.
        const scrollOffset = viewport.measureScrollOffset();
        // The delta between the current scroll offset and the previously recorded scroll offset.
        let scrollDelta = scrollOffset - this._lastScrollOffset;
        // The magnitude of the scroll delta.
        let scrollMagnitude = Math.abs(scrollDelta);
        // The currently rendered range.
        const renderedRange = viewport.getRenderedRange();
        // If we're scrolling toward the top, we need to account for the fact that the predicted amount
        // of content and the actual amount of scrollable space may differ. We address this by slowly
        // correcting the difference on each scroll event.
        let offsetCorrection = 0;
        if (scrollDelta < 0) {
            // The content offset we would expect based on the average item size.
            const predictedOffset = renderedRange.start * this._averager.getAverageItemSize();
            // The difference between the predicted size of the unrendered content at the beginning and
            // the actual available space to scroll over. We need to reduce this to zero by the time the
            // user scrolls to the top.
            // - 0 indicates that the predicted size and available space are the same.
            // - A negative number that the predicted size is smaller than the available space.
            // - A positive number indicates the predicted size is larger than the available space
            const offsetDifference = predictedOffset - this._lastRenderedContentOffset;
            // The amount of difference to correct during this scroll event. We calculate this as a
            // percentage of the total difference based on the percentage of the distance toward the top
            // that the user scrolled.
            offsetCorrection = Math.round(offsetDifference *
                Math.max(0, Math.min(1, scrollMagnitude / (scrollOffset + scrollMagnitude))));
            // Based on the offset correction above, we pretend that the scroll delta was bigger or
            // smaller than it actually was, this way we can start to eliminate the difference.
            scrollDelta = scrollDelta - offsetCorrection;
            scrollMagnitude = Math.abs(scrollDelta);
        }
        // The current amount of buffer past the start of the viewport.
        const startBuffer = this._lastScrollOffset - this._lastRenderedContentOffset;
        // The current amount of buffer past the end of the viewport.
        const endBuffer = (this._lastRenderedContentOffset + this._lastRenderedContentSize) -
            (this._lastScrollOffset + viewport.getViewportSize());
        // The amount of unfilled space that should be filled on the side the user is scrolling toward
        // in order to safely absorb the scroll delta.
        const underscan = scrollMagnitude + this._minBufferPx -
            (scrollDelta < 0 ? startBuffer : endBuffer);
        // Check if there's unfilled space that we need to render new elements to fill.
        if (underscan > 0) {
            // Check if the scroll magnitude was larger than the viewport size. In this case the user
            // won't notice a discontinuity if we just jump to the new estimated position in the list.
            // However, if the scroll magnitude is smaller than the viewport the user might notice some
            // jitteriness if we just jump to the estimated position. Instead we make sure to scroll by
            // the same number of pixels as the scroll magnitude.
            if (scrollMagnitude >= viewport.getViewportSize()) {
                this._renderContentForCurrentOffset();
            }
            else {
                // The number of new items to render on the side the user is scrolling towards. Rather than
                // just filling the underscan space, we actually fill enough to have a buffer size of
                // `maxBufferPx`. This gives us a little wiggle room in case our item size estimate is off.
                const addItems = Math.max(0, Math.ceil((underscan - this._minBufferPx + this._maxBufferPx) /
                    this._averager.getAverageItemSize()));
                // The amount of filled space beyond what is necessary on the side the user is scrolling
                // away from.
                const overscan = (scrollDelta < 0 ? endBuffer : startBuffer) - this._minBufferPx +
                    scrollMagnitude;
                // The number of currently rendered items to remove on the side the user is scrolling away
                // from. If removal has failed in recent cycles we are less aggressive in how much we try to
                // remove.
                const unboundedRemoveItems = Math.floor(overscan / this._averager.getAverageItemSize() / (this._removalFailures + 1));
                const removeItems = Math.min(renderedRange.end - renderedRange.start, Math.max(0, unboundedRemoveItems));
                // The new range we will tell the viewport to render. We first expand it to include the new
                // items we want rendered, we then contract the opposite side to remove items we no longer
                // want rendered.
                const range = this._expandRange(renderedRange, scrollDelta < 0 ? addItems : 0, scrollDelta > 0 ? addItems : 0);
                if (scrollDelta < 0) {
                    range.end = Math.max(range.start + 1, range.end - removeItems);
                }
                else {
                    range.start = Math.min(range.end - 1, range.start + removeItems);
                }
                // The new offset we want to set on the rendered content. To determine this we measure the
                // number of pixels we removed and then adjust the offset to the start of the rendered
                // content or to the end of the rendered content accordingly (whichever one doesn't require
                // that the newly added items to be rendered to calculate.)
                let contentOffset;
                let contentOffsetTo;
                if (scrollDelta < 0) {
                    let removedSize = viewport.measureRangeSize({
                        start: range.end,
                        end: renderedRange.end,
                    });
                    // Check that we're not removing too much.
                    if (removedSize <= overscan) {
                        contentOffset =
                            this._lastRenderedContentOffset + this._lastRenderedContentSize - removedSize;
                        this._removalFailures = 0;
                    }
                    else {
                        // If the removal is more than the overscan can absorb just undo it and record the fact
                        // that the removal failed so we can be less aggressive next time.
                        range.end = renderedRange.end;
                        contentOffset = this._lastRenderedContentOffset + this._lastRenderedContentSize;
                        this._removalFailures++;
                    }
                    contentOffsetTo = 'to-end';
                }
                else {
                    const removedSize = viewport.measureRangeSize({
                        start: renderedRange.start,
                        end: range.start,
                    });
                    // Check that we're not removing too much.
                    if (removedSize <= overscan) {
                        contentOffset = this._lastRenderedContentOffset + removedSize;
                        this._removalFailures = 0;
                    }
                    else {
                        // If the removal is more than the overscan can absorb just undo it and record the fact
                        // that the removal failed so we can be less aggressive next time.
                        range.start = renderedRange.start;
                        contentOffset = this._lastRenderedContentOffset;
                        this._removalFailures++;
                    }
                    contentOffsetTo = 'to-start';
                }
                // Set the range and offset we calculated above.
                viewport.setRenderedRange(range);
                viewport.setRenderedContentOffset(contentOffset + offsetCorrection, contentOffsetTo);
            }
        }
        else if (offsetCorrection) {
            // Even if the rendered range didn't change, we may still need to adjust the content offset to
            // simulate scrolling slightly slower or faster than the user actually scrolled.
            viewport.setRenderedContentOffset(this._lastRenderedContentOffset + offsetCorrection);
        }
        // Save the scroll offset to be compared to the new value on the next scroll event.
        this._lastScrollOffset = scrollOffset;
    }
    /**
     * Checks the size of the currently rendered content and uses it to update the estimated item size
     * and estimated total content size.
     */
    _checkRenderedContentSize() {
        const viewport = this._viewport;
        this._lastRenderedContentSize = viewport.measureRenderedContentSize();
        this._averager.addSample(viewport.getRenderedRange(), this._lastRenderedContentSize);
        this._updateTotalContentSize(this._lastRenderedContentSize);
    }
    /** Checks the currently rendered content offset and saves the value for later use. */
    _checkRenderedContentOffset() {
        const viewport = this._viewport;
        this._lastRenderedContentOffset = viewport.getOffsetToRenderedContentStart();
    }
    /**
     * Recalculates the rendered content based on our estimate of what should be shown at the current
     * scroll offset.
     */
    _renderContentForCurrentOffset() {
        const viewport = this._viewport;
        const scrollOffset = viewport.measureScrollOffset();
        this._lastScrollOffset = scrollOffset;
        this._removalFailures = 0;
        const itemSize = this._averager.getAverageItemSize();
        const firstVisibleIndex = Math.min(viewport.getDataLength() - 1, Math.floor(scrollOffset / itemSize));
        const bufferSize = Math.ceil(this._maxBufferPx / itemSize);
        const range = this._expandRange(this._getVisibleRangeForIndex(firstVisibleIndex), bufferSize, bufferSize);
        viewport.setRenderedRange(range);
        viewport.setRenderedContentOffset(itemSize * range.start);
    }
    // TODO: maybe move to base class, can probably share with fixed size strategy.
    /**
     * Gets the visible range of data for the given start index. If the start index is too close to
     * the end of the list it may be backed up to ensure the estimated size of the range is enough to
     * fill the viewport.
     * Note: must not be called if `this._viewport` is null
     * @param startIndex The index to start the range at
     * @return a range estimated to be large enough to fill the viewport when rendered.
     */
    _getVisibleRangeForIndex(startIndex) {
        const viewport = this._viewport;
        const range = {
            start: startIndex,
            end: startIndex +
                Math.ceil(viewport.getViewportSize() / this._averager.getAverageItemSize())
        };
        const extra = range.end - viewport.getDataLength();
        if (extra > 0) {
            range.start = Math.max(0, range.start - extra);
        }
        return range;
    }
    // TODO: maybe move to base class, can probably share with fixed size strategy.
    /**
     * Expand the given range by the given amount in either direction.
     * Note: must not be called if `this._viewport` is null
     * @param range The range to expand
     * @param expandStart The number of items to expand the start of the range by.
     * @param expandEnd The number of items to expand the end of the range by.
     * @return The expanded range.
     */
    _expandRange(range, expandStart, expandEnd) {
        const viewport = this._viewport;
        const start = Math.max(0, range.start - expandStart);
        const end = Math.min(viewport.getDataLength(), range.end + expandEnd);
        return { start, end };
    }
    /** Update the viewport's total content size. */
    _updateTotalContentSize(renderedContentSize) {
        const viewport = this._viewport;
        const renderedRange = viewport.getRenderedRange();
        const totalSize = renderedContentSize +
            (viewport.getDataLength() - (renderedRange.end - renderedRange.start)) *
                this._averager.getAverageItemSize();
        viewport.setTotalContentSize(totalSize);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1zaXplLWNkay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvbmdyaWQvc3JjL2xpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3N0cmF0ZWdpZXMvY2RrLXdyYXBwZXJzL2F1dG8tc2l6ZS1jZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBUUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVoQzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBVTNCLDBGQUEwRjtJQUMxRixZQUFZLGVBQWUsR0FBRyxFQUFFO1FBVmhDLDZEQUE2RDtRQUNyRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztRQVV2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFDMUMsQ0FBQztJQUVELHFDQUFxQztJQUNyQyxrQkFBa0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTLENBQUMsS0FBZ0IsRUFBRSxJQUFZO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ25FLElBQUksY0FBYyxFQUFFO1lBQ2xCLE1BQU0sa0JBQWtCLEdBQ3BCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsY0FBYyxDQUFDO1lBQ3hFLElBQUksa0JBQWtCLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxrQkFBa0IsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7YUFDcEM7U0FDRjtJQUNILENBQUM7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dCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0xpc3RSYW5nZX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcbmltcG9ydCB7XG4gIENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCxcbiAgVklSVFVBTF9TQ1JPTExfU1RSQVRFR1ksXG4gIFZpcnR1YWxTY3JvbGxTdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IHRyYWNrcyB0aGUgc2l6ZSBvZiBpdGVtcyB0aGF0IGhhdmUgYmVlbiBzZWVuIGFuZCB1c2VzIGl0IHRvIGVzdGltYXRlIHRoZSBhdmVyYWdlXG4gKiBpdGVtIHNpemUuXG4gKi9cbmV4cG9ydCBjbGFzcyBJdGVtU2l6ZUF2ZXJhZ2VyIHtcbiAgLyoqIFRoZSB0b3RhbCBhbW91bnQgb2Ygd2VpZ2h0IGJlaGluZCB0aGUgY3VycmVudCBhdmVyYWdlLiAqL1xuICBwcml2YXRlIF90b3RhbFdlaWdodCA9IDA7XG5cbiAgLyoqIFRoZSBjdXJyZW50IGF2ZXJhZ2UgaXRlbSBzaXplLiAqL1xuICBwcml2YXRlIF9hdmVyYWdlSXRlbVNpemU6IG51bWJlcjtcblxuICAvKiogVGhlIGRlZmF1bHQgc2l6ZSB0byB1c2UgZm9yIGl0ZW1zIHdoZW4gbm8gZGF0YSBpcyBhdmFpbGFibGUuICovXG4gIHByaXZhdGUgX2RlZmF1bHRJdGVtU2l6ZTogbnVtYmVyO1xuXG4gIC8qKiBAcGFyYW0gZGVmYXVsdEl0ZW1TaXplIFRoZSBkZWZhdWx0IHNpemUgdG8gdXNlIGZvciBpdGVtcyB3aGVuIG5vIGRhdGEgaXMgYXZhaWxhYmxlLiAqL1xuICBjb25zdHJ1Y3RvcihkZWZhdWx0SXRlbVNpemUgPSA1MCkge1xuICAgIHRoaXMuX2RlZmF1bHRJdGVtU2l6ZSA9IGRlZmF1bHRJdGVtU2l6ZTtcbiAgICB0aGlzLl9hdmVyYWdlSXRlbVNpemUgPSBkZWZhdWx0SXRlbVNpemU7XG4gIH1cblxuICAvKiogUmV0dXJucyB0aGUgYXZlcmFnZSBpdGVtIHNpemUuICovXG4gIGdldEF2ZXJhZ2VJdGVtU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hdmVyYWdlSXRlbVNpemU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIG1lYXN1cmVtZW50IHNhbXBsZSBmb3IgdGhlIGVzdGltYXRvciB0byBjb25zaWRlci5cbiAgICogQHBhcmFtIHJhbmdlIFRoZSBtZWFzdXJlZCByYW5nZS5cbiAgICogQHBhcmFtIHNpemUgVGhlIG1lYXN1cmVkIHNpemUgb2YgdGhlIGdpdmVuIHJhbmdlIGluIHBpeGVscy5cbiAgICovXG4gIGFkZFNhbXBsZShyYW5nZTogTGlzdFJhbmdlLCBzaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBuZXdUb3RhbFdlaWdodCA9IHRoaXMuX3RvdGFsV2VpZ2h0ICsgcmFuZ2UuZW5kIC0gcmFuZ2Uuc3RhcnQ7XG4gICAgaWYgKG5ld1RvdGFsV2VpZ2h0KSB7XG4gICAgICBjb25zdCBuZXdBdmVyYWdlSXRlbVNpemUgPVxuICAgICAgICAgIChzaXplICsgdGhpcy5fYXZlcmFnZUl0ZW1TaXplICogdGhpcy5fdG90YWxXZWlnaHQpIC8gbmV3VG90YWxXZWlnaHQ7XG4gICAgICBpZiAobmV3QXZlcmFnZUl0ZW1TaXplKSB7XG4gICAgICAgIHRoaXMuX2F2ZXJhZ2VJdGVtU2l6ZSA9IG5ld0F2ZXJhZ2VJdGVtU2l6ZTtcbiAgICAgICAgdGhpcy5fdG90YWxXZWlnaHQgPSBuZXdUb3RhbFdlaWdodDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKiogUmVzZXRzIHRoZSBhdmVyYWdlci4gKi9cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fYXZlcmFnZUl0ZW1TaXplID0gdGhpcy5fZGVmYXVsdEl0ZW1TaXplO1xuICAgIHRoaXMuX3RvdGFsV2VpZ2h0ID0gMDtcbiAgfVxufVxuXG5cbi8qKiBWaXJ0dWFsIHNjcm9sbGluZyBzdHJhdGVneSBmb3IgbGlzdHMgd2l0aCBpdGVtcyBvZiB1bmtub3duIG9yIGR5bmFtaWMgc2l6ZS4gKi9cbmV4cG9ydCBjbGFzcyBBdXRvU2l6ZVZpcnR1YWxTY3JvbGxTdHJhdGVneSBpbXBsZW1lbnRzIFZpcnR1YWxTY3JvbGxTdHJhdGVneSB7XG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LiAqL1xuICBzY3JvbGxlZEluZGV4Q2hhbmdlID0gbmV3IE9ic2VydmFibGU8bnVtYmVyPigoKSA9PiB7XG4gICAgLy8gVE9ETyhtbWFsZXJiYSk6IEltcGxlbWVudC5cbiAgICBpZiAodHlwZW9mIG5nRGV2TW9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgbmdEZXZNb2RlKSB7XG4gICAgICB0aHJvdyBFcnJvcignY2RrLXZpcnR1YWwtc2Nyb2xsOiBzY3JvbGxlZEluZGV4Q2hhbmdlIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkIGZvciB0aGUnICtcbiAgICAgICAgICAnIGF1dG9zaXplIHNjcm9sbCBzdHJhdGVneScpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqIFRoZSBhdHRhY2hlZCB2aWV3cG9ydC4gKi9cbiAgcHJpdmF0ZSBfdmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCB8IG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgbWluaW11bSBhbW91bnQgb2YgYnVmZmVyIHJlbmRlcmVkIGJleW9uZCB0aGUgdmlld3BvcnQgKGluIHBpeGVscykuICovXG4gIHByaXZhdGUgX21pbkJ1ZmZlclB4OiBudW1iZXI7XG5cbiAgLyoqIFRoZSBudW1iZXIgb2YgYnVmZmVyIGl0ZW1zIHRvIHJlbmRlciBiZXlvbmQgdGhlIGVkZ2Ugb2YgdGhlIHZpZXdwb3J0IChpbiBwaXhlbHMpLiAqL1xuICBwcml2YXRlIF9tYXhCdWZmZXJQeDogbnVtYmVyO1xuXG4gIC8qKiBUaGUgZXN0aW1hdG9yIHVzZWQgdG8gZXN0aW1hdGUgdGhlIHNpemUgb2YgdW5zZWVuIGl0ZW1zLiAqL1xuICBwcml2YXRlIF9hdmVyYWdlcjogSXRlbVNpemVBdmVyYWdlcjtcblxuICAvKiogVGhlIGxhc3QgbWVhc3VyZWQgc2Nyb2xsIG9mZnNldCBvZiB0aGUgdmlld3BvcnQuICovXG4gIHByaXZhdGUgX2xhc3RTY3JvbGxPZmZzZXQ6IG51bWJlcjtcblxuICAvKiogVGhlIGxhc3QgbWVhc3VyZWQgc2l6ZSBvZiB0aGUgcmVuZGVyZWQgY29udGVudCBpbiB0aGUgdmlld3BvcnQuICovXG4gIHByaXZhdGUgX2xhc3RSZW5kZXJlZENvbnRlbnRTaXplOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBsYXN0IG1lYXN1cmVkIHNpemUgb2YgdGhlIHJlbmRlcmVkIGNvbnRlbnQgaW4gdGhlIHZpZXdwb3J0LiAqL1xuICBwcml2YXRlIF9sYXN0UmVuZGVyZWRDb250ZW50T2Zmc2V0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBudW1iZXIgb2YgY29uc2VjdXRpdmUgY3ljbGVzIHdoZXJlIHJlbW92aW5nIGV4dHJhIGl0ZW1zIGhhcyBmYWlsZWQuIEZhaWx1cmUgaGVyZSBtZWFucyB0aGF0XG4gICAqIHdlIGVzdGltYXRlZCBob3cgbWFueSBpdGVtcyB3ZSBjb3VsZCBzYWZlbHkgcmVtb3ZlLCBidXQgb3VyIGVzdGltYXRlIHR1cm5lZCBvdXQgdG8gYmUgdG9vIG11Y2hcbiAgICogYW5kIGl0IHdhc24ndCBzYWZlIHRvIHJlbW92ZSB0aGF0IG1hbnkgZWxlbWVudHMuXG4gICAqL1xuICBwcml2YXRlIF9yZW1vdmFsRmFpbHVyZXMgPSAwO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gbWluQnVmZmVyUHggVGhlIG1pbmltdW0gYW1vdW50IG9mIGJ1ZmZlciByZW5kZXJlZCBiZXlvbmQgdGhlIHZpZXdwb3J0IChpbiBwaXhlbHMpLlxuICAgKiAgICAgSWYgdGhlIGFtb3VudCBvZiBidWZmZXIgZGlwcyBiZWxvdyB0aGlzIG51bWJlciwgbW9yZSBpdGVtcyB3aWxsIGJlIHJlbmRlcmVkLlxuICAgKiBAcGFyYW0gbWF4QnVmZmVyUHggVGhlIG51bWJlciBvZiBwaXhlbHMgd29ydGggb2YgYnVmZmVyIHRvIHNob290IGZvciB3aGVuIHJlbmRlcmluZyBuZXcgaXRlbXMuXG4gICAqICAgICBJZiB0aGUgYWN0dWFsIGFtb3VudCB0dXJucyBvdXQgdG8gYmUgbGVzcyBpdCB3aWxsIG5vdCBuZWNlc3NhcmlseSB0cmlnZ2VyIGFuIGFkZGl0aW9uYWxcbiAgICogICAgIHJlbmRlcmluZyBjeWNsZSAoYXMgbG9uZyBhcyB0aGUgYW1vdW50IG9mIGJ1ZmZlciBpcyBzdGlsbCBncmVhdGVyIHRoYW4gYG1pbkJ1ZmZlclB4YCkuXG4gICAqIEBwYXJhbSBhdmVyYWdlciBUaGUgYXZlcmFnZXIgdXNlZCB0byBlc3RpbWF0ZSB0aGUgc2l6ZSBvZiB1bnNlZW4gaXRlbXMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtaW5CdWZmZXJQeDogbnVtYmVyLCBtYXhCdWZmZXJQeDogbnVtYmVyLCBhdmVyYWdlciA9IG5ldyBJdGVtU2l6ZUF2ZXJhZ2VyKCkpIHtcbiAgICB0aGlzLl9taW5CdWZmZXJQeCA9IG1pbkJ1ZmZlclB4O1xuICAgIHRoaXMuX21heEJ1ZmZlclB4ID0gbWF4QnVmZmVyUHg7XG4gICAgdGhpcy5fYXZlcmFnZXIgPSBhdmVyYWdlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRhY2hlcyB0aGlzIHNjcm9sbCBzdHJhdGVneSB0byBhIHZpZXdwb3J0LlxuICAgKiBAcGFyYW0gdmlld3BvcnQgVGhlIHZpZXdwb3J0IHRvIGF0dGFjaCB0aGlzIHN0cmF0ZWd5IHRvLlxuICAgKi9cbiAgYXR0YWNoKHZpZXdwb3J0OiBDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnQpIHtcbiAgICB0aGlzLl9hdmVyYWdlci5yZXNldCgpO1xuICAgIHRoaXMuX3ZpZXdwb3J0ID0gdmlld3BvcnQ7XG4gICAgdGhpcy5fcmVuZGVyQ29udGVudEZvckN1cnJlbnRPZmZzZXQoKTtcbiAgfVxuXG4gIC8qKiBEZXRhY2hlcyB0aGlzIHNjcm9sbCBzdHJhdGVneSBmcm9tIHRoZSBjdXJyZW50bHkgYXR0YWNoZWQgdmlld3BvcnQuICovXG4gIGRldGFjaCgpIHtcbiAgICB0aGlzLl92aWV3cG9ydCA9IG51bGw7XG4gIH1cblxuICAvKiogQGRvY3MtcHJpdmF0ZSBJbXBsZW1lbnRlZCBhcyBwYXJ0IG9mIFZpcnR1YWxTY3JvbGxTdHJhdGVneS4gKi9cbiAgb25Db250ZW50U2Nyb2xsZWQoKSB7XG4gICAgaWYgKHRoaXMuX3ZpZXdwb3J0KSB7XG4gICAgICB0aGlzLl91cGRhdGVSZW5kZXJlZENvbnRlbnRBZnRlclNjcm9sbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LiAqL1xuICBvbkRhdGFMZW5ndGhDaGFuZ2VkKCkge1xuICAgIGlmICh0aGlzLl92aWV3cG9ydCkge1xuICAgICAgdGhpcy5fcmVuZGVyQ29udGVudEZvckN1cnJlbnRPZmZzZXQoKTtcbiAgICAgIHRoaXMuX2NoZWNrUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LiAqL1xuICBvbkNvbnRlbnRSZW5kZXJlZCgpIHtcbiAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgIHRoaXMuX2NoZWNrUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBAZG9jcy1wcml2YXRlIEltcGxlbWVudGVkIGFzIHBhcnQgb2YgVmlydHVhbFNjcm9sbFN0cmF0ZWd5LiAqL1xuICBvblJlbmRlcmVkT2Zmc2V0Q2hhbmdlZCgpIHtcbiAgICBpZiAodGhpcy5fdmlld3BvcnQpIHtcbiAgICAgIHRoaXMuX2NoZWNrUmVuZGVyZWRDb250ZW50T2Zmc2V0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNjcm9sbCB0byB0aGUgb2Zmc2V0IGZvciB0aGUgZ2l2ZW4gaW5kZXguICovXG4gIHNjcm9sbFRvSW5kZXgoKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkge1xuICAgICAgLy8gVE9ETyhtbWFsZXJiYSk6IEltcGxlbWVudC5cbiAgICAgIHRocm93IEVycm9yKCdjZGstdmlydHVhbC1zY3JvbGw6IHNjcm9sbFRvSW5kZXggaXMgY3VycmVudGx5IG5vdCBzdXBwb3J0ZWQgZm9yIHRoZSBhdXRvc2l6ZSdcbiAgICAgICAgICArICcgc2Nyb2xsIHN0cmF0ZWd5Jyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgYnVmZmVyIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSBtaW5CdWZmZXJQeCBUaGUgbWluaW11bSBhbW91bnQgb2YgYnVmZmVyIHJlbmRlcmVkIGJleW9uZCB0aGUgdmlld3BvcnQgKGluIHBpeGVscykuXG4gICAqIEBwYXJhbSBtYXhCdWZmZXJQeCBUaGUgbnVtYmVyIG9mIGJ1ZmZlciBpdGVtcyB0byByZW5kZXIgYmV5b25kIHRoZSBlZGdlIG9mIHRoZSB2aWV3cG9ydCAoaW5cbiAgICogICAgIHBpeGVscykuXG4gICAqL1xuICB1cGRhdGVCdWZmZXJTaXplKG1pbkJ1ZmZlclB4OiBudW1iZXIsIG1heEJ1ZmZlclB4OiBudW1iZXIpIHtcbiAgICBpZiAobWF4QnVmZmVyUHggPCBtaW5CdWZmZXJQeCkge1xuICAgICAgdGhyb3coJ0NESyB2aXJ0dWFsIHNjcm9sbDogbWF4QnVmZmVyUHggbXVzdCBiZSBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gbWluQnVmZmVyUHgnKTtcbiAgICB9XG4gICAgdGhpcy5fbWluQnVmZmVyUHggPSBtaW5CdWZmZXJQeDtcbiAgICB0aGlzLl9tYXhCdWZmZXJQeCA9IG1heEJ1ZmZlclB4O1xuICB9XG5cbiAgLyoqIFVwZGF0ZSB0aGUgcmVuZGVyZWQgY29udGVudCBhZnRlciB0aGUgdXNlciBzY3JvbGxzLiAqL1xuICBwcml2YXRlIF91cGRhdGVSZW5kZXJlZENvbnRlbnRBZnRlclNjcm9sbCgpIHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0ITtcblxuICAgIC8vIFRoZSBjdXJyZW50IHNjcm9sbCBvZmZzZXQuXG4gICAgY29uc3Qgc2Nyb2xsT2Zmc2V0ID0gdmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgIC8vIFRoZSBkZWx0YSBiZXR3ZWVuIHRoZSBjdXJyZW50IHNjcm9sbCBvZmZzZXQgYW5kIHRoZSBwcmV2aW91c2x5IHJlY29yZGVkIHNjcm9sbCBvZmZzZXQuXG4gICAgbGV0IHNjcm9sbERlbHRhID0gc2Nyb2xsT2Zmc2V0IC0gdGhpcy5fbGFzdFNjcm9sbE9mZnNldDtcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBzY3JvbGwgZGVsdGEuXG4gICAgbGV0IHNjcm9sbE1hZ25pdHVkZSA9IE1hdGguYWJzKHNjcm9sbERlbHRhKTtcblxuICAgIC8vIFRoZSBjdXJyZW50bHkgcmVuZGVyZWQgcmFuZ2UuXG4gICAgY29uc3QgcmVuZGVyZWRSYW5nZSA9IHZpZXdwb3J0LmdldFJlbmRlcmVkUmFuZ2UoKTtcblxuICAgIC8vIElmIHdlJ3JlIHNjcm9sbGluZyB0b3dhcmQgdGhlIHRvcCwgd2UgbmVlZCB0byBhY2NvdW50IGZvciB0aGUgZmFjdCB0aGF0IHRoZSBwcmVkaWN0ZWQgYW1vdW50XG4gICAgLy8gb2YgY29udGVudCBhbmQgdGhlIGFjdHVhbCBhbW91bnQgb2Ygc2Nyb2xsYWJsZSBzcGFjZSBtYXkgZGlmZmVyLiBXZSBhZGRyZXNzIHRoaXMgYnkgc2xvd2x5XG4gICAgLy8gY29ycmVjdGluZyB0aGUgZGlmZmVyZW5jZSBvbiBlYWNoIHNjcm9sbCBldmVudC5cbiAgICBsZXQgb2Zmc2V0Q29ycmVjdGlvbiA9IDA7XG4gICAgaWYgKHNjcm9sbERlbHRhIDwgMCkge1xuICAgICAgLy8gVGhlIGNvbnRlbnQgb2Zmc2V0IHdlIHdvdWxkIGV4cGVjdCBiYXNlZCBvbiB0aGUgYXZlcmFnZSBpdGVtIHNpemUuXG4gICAgICBjb25zdCBwcmVkaWN0ZWRPZmZzZXQgPSByZW5kZXJlZFJhbmdlLnN0YXJ0ICogdGhpcy5fYXZlcmFnZXIuZ2V0QXZlcmFnZUl0ZW1TaXplKCk7XG4gICAgICAvLyBUaGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBwcmVkaWN0ZWQgc2l6ZSBvZiB0aGUgdW5yZW5kZXJlZCBjb250ZW50IGF0IHRoZSBiZWdpbm5pbmcgYW5kXG4gICAgICAvLyB0aGUgYWN0dWFsIGF2YWlsYWJsZSBzcGFjZSB0byBzY3JvbGwgb3Zlci4gV2UgbmVlZCB0byByZWR1Y2UgdGhpcyB0byB6ZXJvIGJ5IHRoZSB0aW1lIHRoZVxuICAgICAgLy8gdXNlciBzY3JvbGxzIHRvIHRoZSB0b3AuXG4gICAgICAvLyAtIDAgaW5kaWNhdGVzIHRoYXQgdGhlIHByZWRpY3RlZCBzaXplIGFuZCBhdmFpbGFibGUgc3BhY2UgYXJlIHRoZSBzYW1lLlxuICAgICAgLy8gLSBBIG5lZ2F0aXZlIG51bWJlciB0aGF0IHRoZSBwcmVkaWN0ZWQgc2l6ZSBpcyBzbWFsbGVyIHRoYW4gdGhlIGF2YWlsYWJsZSBzcGFjZS5cbiAgICAgIC8vIC0gQSBwb3NpdGl2ZSBudW1iZXIgaW5kaWNhdGVzIHRoZSBwcmVkaWN0ZWQgc2l6ZSBpcyBsYXJnZXIgdGhhbiB0aGUgYXZhaWxhYmxlIHNwYWNlXG4gICAgICBjb25zdCBvZmZzZXREaWZmZXJlbmNlID0gcHJlZGljdGVkT2Zmc2V0IC0gdGhpcy5fbGFzdFJlbmRlcmVkQ29udGVudE9mZnNldDtcbiAgICAgIC8vIFRoZSBhbW91bnQgb2YgZGlmZmVyZW5jZSB0byBjb3JyZWN0IGR1cmluZyB0aGlzIHNjcm9sbCBldmVudC4gV2UgY2FsY3VsYXRlIHRoaXMgYXMgYVxuICAgICAgLy8gcGVyY2VudGFnZSBvZiB0aGUgdG90YWwgZGlmZmVyZW5jZSBiYXNlZCBvbiB0aGUgcGVyY2VudGFnZSBvZiB0aGUgZGlzdGFuY2UgdG93YXJkIHRoZSB0b3BcbiAgICAgIC8vIHRoYXQgdGhlIHVzZXIgc2Nyb2xsZWQuXG4gICAgICBvZmZzZXRDb3JyZWN0aW9uID0gTWF0aC5yb3VuZChvZmZzZXREaWZmZXJlbmNlICpcbiAgICAgICAgICBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBzY3JvbGxNYWduaXR1ZGUgLyAoc2Nyb2xsT2Zmc2V0ICsgc2Nyb2xsTWFnbml0dWRlKSkpKTtcblxuICAgICAgLy8gQmFzZWQgb24gdGhlIG9mZnNldCBjb3JyZWN0aW9uIGFib3ZlLCB3ZSBwcmV0ZW5kIHRoYXQgdGhlIHNjcm9sbCBkZWx0YSB3YXMgYmlnZ2VyIG9yXG4gICAgICAvLyBzbWFsbGVyIHRoYW4gaXQgYWN0dWFsbHkgd2FzLCB0aGlzIHdheSB3ZSBjYW4gc3RhcnQgdG8gZWxpbWluYXRlIHRoZSBkaWZmZXJlbmNlLlxuICAgICAgc2Nyb2xsRGVsdGEgPSBzY3JvbGxEZWx0YSAtIG9mZnNldENvcnJlY3Rpb247XG4gICAgICBzY3JvbGxNYWduaXR1ZGUgPSBNYXRoLmFicyhzY3JvbGxEZWx0YSk7XG4gICAgfVxuXG4gICAgLy8gVGhlIGN1cnJlbnQgYW1vdW50IG9mIGJ1ZmZlciBwYXN0IHRoZSBzdGFydCBvZiB0aGUgdmlld3BvcnQuXG4gICAgY29uc3Qgc3RhcnRCdWZmZXIgPSB0aGlzLl9sYXN0U2Nyb2xsT2Zmc2V0IC0gdGhpcy5fbGFzdFJlbmRlcmVkQ29udGVudE9mZnNldDtcbiAgICAvLyBUaGUgY3VycmVudCBhbW91bnQgb2YgYnVmZmVyIHBhc3QgdGhlIGVuZCBvZiB0aGUgdmlld3BvcnQuXG4gICAgY29uc3QgZW5kQnVmZmVyID0gKHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRPZmZzZXQgKyB0aGlzLl9sYXN0UmVuZGVyZWRDb250ZW50U2l6ZSkgLVxuICAgICAgICAodGhpcy5fbGFzdFNjcm9sbE9mZnNldCArIHZpZXdwb3J0LmdldFZpZXdwb3J0U2l6ZSgpKTtcbiAgICAvLyBUaGUgYW1vdW50IG9mIHVuZmlsbGVkIHNwYWNlIHRoYXQgc2hvdWxkIGJlIGZpbGxlZCBvbiB0aGUgc2lkZSB0aGUgdXNlciBpcyBzY3JvbGxpbmcgdG93YXJkXG4gICAgLy8gaW4gb3JkZXIgdG8gc2FmZWx5IGFic29yYiB0aGUgc2Nyb2xsIGRlbHRhLlxuICAgIGNvbnN0IHVuZGVyc2NhbiA9IHNjcm9sbE1hZ25pdHVkZSArIHRoaXMuX21pbkJ1ZmZlclB4IC1cbiAgICAgICAgKHNjcm9sbERlbHRhIDwgMCA/IHN0YXJ0QnVmZmVyIDogZW5kQnVmZmVyKTtcblxuICAgIC8vIENoZWNrIGlmIHRoZXJlJ3MgdW5maWxsZWQgc3BhY2UgdGhhdCB3ZSBuZWVkIHRvIHJlbmRlciBuZXcgZWxlbWVudHMgdG8gZmlsbC5cbiAgICBpZiAodW5kZXJzY2FuID4gMCkge1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNjcm9sbCBtYWduaXR1ZGUgd2FzIGxhcmdlciB0aGFuIHRoZSB2aWV3cG9ydCBzaXplLiBJbiB0aGlzIGNhc2UgdGhlIHVzZXJcbiAgICAgIC8vIHdvbid0IG5vdGljZSBhIGRpc2NvbnRpbnVpdHkgaWYgd2UganVzdCBqdW1wIHRvIHRoZSBuZXcgZXN0aW1hdGVkIHBvc2l0aW9uIGluIHRoZSBsaXN0LlxuICAgICAgLy8gSG93ZXZlciwgaWYgdGhlIHNjcm9sbCBtYWduaXR1ZGUgaXMgc21hbGxlciB0aGFuIHRoZSB2aWV3cG9ydCB0aGUgdXNlciBtaWdodCBub3RpY2Ugc29tZVxuICAgICAgLy8gaml0dGVyaW5lc3MgaWYgd2UganVzdCBqdW1wIHRvIHRoZSBlc3RpbWF0ZWQgcG9zaXRpb24uIEluc3RlYWQgd2UgbWFrZSBzdXJlIHRvIHNjcm9sbCBieVxuICAgICAgLy8gdGhlIHNhbWUgbnVtYmVyIG9mIHBpeGVscyBhcyB0aGUgc2Nyb2xsIG1hZ25pdHVkZS5cbiAgICAgIGlmIChzY3JvbGxNYWduaXR1ZGUgPj0gdmlld3BvcnQuZ2V0Vmlld3BvcnRTaXplKCkpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyQ29udGVudEZvckN1cnJlbnRPZmZzZXQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoZSBudW1iZXIgb2YgbmV3IGl0ZW1zIHRvIHJlbmRlciBvbiB0aGUgc2lkZSB0aGUgdXNlciBpcyBzY3JvbGxpbmcgdG93YXJkcy4gUmF0aGVyIHRoYW5cbiAgICAgICAgLy8ganVzdCBmaWxsaW5nIHRoZSB1bmRlcnNjYW4gc3BhY2UsIHdlIGFjdHVhbGx5IGZpbGwgZW5vdWdoIHRvIGhhdmUgYSBidWZmZXIgc2l6ZSBvZlxuICAgICAgICAvLyBgbWF4QnVmZmVyUHhgLiBUaGlzIGdpdmVzIHVzIGEgbGl0dGxlIHdpZ2dsZSByb29tIGluIGNhc2Ugb3VyIGl0ZW0gc2l6ZSBlc3RpbWF0ZSBpcyBvZmYuXG4gICAgICAgIGNvbnN0IGFkZEl0ZW1zID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKCh1bmRlcnNjYW4gLSB0aGlzLl9taW5CdWZmZXJQeCArIHRoaXMuX21heEJ1ZmZlclB4KSAvXG4gICAgICAgICAgICB0aGlzLl9hdmVyYWdlci5nZXRBdmVyYWdlSXRlbVNpemUoKSkpO1xuICAgICAgICAvLyBUaGUgYW1vdW50IG9mIGZpbGxlZCBzcGFjZSBiZXlvbmQgd2hhdCBpcyBuZWNlc3Nhcnkgb24gdGhlIHNpZGUgdGhlIHVzZXIgaXMgc2Nyb2xsaW5nXG4gICAgICAgIC8vIGF3YXkgZnJvbS5cbiAgICAgICAgY29uc3Qgb3ZlcnNjYW4gPSAoc2Nyb2xsRGVsdGEgPCAwID8gZW5kQnVmZmVyIDogc3RhcnRCdWZmZXIpIC0gdGhpcy5fbWluQnVmZmVyUHggK1xuICAgICAgICAgICAgc2Nyb2xsTWFnbml0dWRlO1xuICAgICAgICAvLyBUaGUgbnVtYmVyIG9mIGN1cnJlbnRseSByZW5kZXJlZCBpdGVtcyB0byByZW1vdmUgb24gdGhlIHNpZGUgdGhlIHVzZXIgaXMgc2Nyb2xsaW5nIGF3YXlcbiAgICAgICAgLy8gZnJvbS4gSWYgcmVtb3ZhbCBoYXMgZmFpbGVkIGluIHJlY2VudCBjeWNsZXMgd2UgYXJlIGxlc3MgYWdncmVzc2l2ZSBpbiBob3cgbXVjaCB3ZSB0cnkgdG9cbiAgICAgICAgLy8gcmVtb3ZlLlxuICAgICAgICBjb25zdCB1bmJvdW5kZWRSZW1vdmVJdGVtcyA9IE1hdGguZmxvb3IoXG4gICAgICAgICAgICBvdmVyc2NhbiAvIHRoaXMuX2F2ZXJhZ2VyLmdldEF2ZXJhZ2VJdGVtU2l6ZSgpIC8gKHRoaXMuX3JlbW92YWxGYWlsdXJlcyArIDEpKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlSXRlbXMgPVxuICAgICAgICAgICAgTWF0aC5taW4ocmVuZGVyZWRSYW5nZS5lbmQgLSByZW5kZXJlZFJhbmdlLnN0YXJ0LCBNYXRoLm1heCgwLCB1bmJvdW5kZWRSZW1vdmVJdGVtcykpO1xuXG4gICAgICAgIC8vIFRoZSBuZXcgcmFuZ2Ugd2Ugd2lsbCB0ZWxsIHRoZSB2aWV3cG9ydCB0byByZW5kZXIuIFdlIGZpcnN0IGV4cGFuZCBpdCB0byBpbmNsdWRlIHRoZSBuZXdcbiAgICAgICAgLy8gaXRlbXMgd2Ugd2FudCByZW5kZXJlZCwgd2UgdGhlbiBjb250cmFjdCB0aGUgb3Bwb3NpdGUgc2lkZSB0byByZW1vdmUgaXRlbXMgd2Ugbm8gbG9uZ2VyXG4gICAgICAgIC8vIHdhbnQgcmVuZGVyZWQuXG4gICAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5fZXhwYW5kUmFuZ2UoXG4gICAgICAgICAgICByZW5kZXJlZFJhbmdlLCBzY3JvbGxEZWx0YSA8IDAgPyBhZGRJdGVtcyA6IDAsIHNjcm9sbERlbHRhID4gMCA/IGFkZEl0ZW1zIDogMCk7XG4gICAgICAgIGlmIChzY3JvbGxEZWx0YSA8IDApIHtcbiAgICAgICAgICByYW5nZS5lbmQgPSBNYXRoLm1heChyYW5nZS5zdGFydCArIDEsIHJhbmdlLmVuZCAtIHJlbW92ZUl0ZW1zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByYW5nZS5zdGFydCA9IE1hdGgubWluKHJhbmdlLmVuZCAtIDEsIHJhbmdlLnN0YXJ0ICsgcmVtb3ZlSXRlbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlIG5ldyBvZmZzZXQgd2Ugd2FudCB0byBzZXQgb24gdGhlIHJlbmRlcmVkIGNvbnRlbnQuIFRvIGRldGVybWluZSB0aGlzIHdlIG1lYXN1cmUgdGhlXG4gICAgICAgIC8vIG51bWJlciBvZiBwaXhlbHMgd2UgcmVtb3ZlZCBhbmQgdGhlbiBhZGp1c3QgdGhlIG9mZnNldCB0byB0aGUgc3RhcnQgb2YgdGhlIHJlbmRlcmVkXG4gICAgICAgIC8vIGNvbnRlbnQgb3IgdG8gdGhlIGVuZCBvZiB0aGUgcmVuZGVyZWQgY29udGVudCBhY2NvcmRpbmdseSAod2hpY2hldmVyIG9uZSBkb2Vzbid0IHJlcXVpcmVcbiAgICAgICAgLy8gdGhhdCB0aGUgbmV3bHkgYWRkZWQgaXRlbXMgdG8gYmUgcmVuZGVyZWQgdG8gY2FsY3VsYXRlLilcbiAgICAgICAgbGV0IGNvbnRlbnRPZmZzZXQ6IG51bWJlcjtcbiAgICAgICAgbGV0IGNvbnRlbnRPZmZzZXRUbzogJ3RvLXN0YXJ0JyB8ICd0by1lbmQnO1xuICAgICAgICBpZiAoc2Nyb2xsRGVsdGEgPCAwKSB7XG4gICAgICAgICAgbGV0IHJlbW92ZWRTaXplID0gdmlld3BvcnQubWVhc3VyZVJhbmdlU2l6ZSh7XG4gICAgICAgICAgICBzdGFydDogcmFuZ2UuZW5kLFxuICAgICAgICAgICAgZW5kOiByZW5kZXJlZFJhbmdlLmVuZCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBDaGVjayB0aGF0IHdlJ3JlIG5vdCByZW1vdmluZyB0b28gbXVjaC5cbiAgICAgICAgICBpZiAocmVtb3ZlZFNpemUgPD0gb3ZlcnNjYW4pIHtcbiAgICAgICAgICAgIGNvbnRlbnRPZmZzZXQgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRPZmZzZXQgKyB0aGlzLl9sYXN0UmVuZGVyZWRDb250ZW50U2l6ZSAtIHJlbW92ZWRTaXplO1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZhbEZhaWx1cmVzID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHJlbW92YWwgaXMgbW9yZSB0aGFuIHRoZSBvdmVyc2NhbiBjYW4gYWJzb3JiIGp1c3QgdW5kbyBpdCBhbmQgcmVjb3JkIHRoZSBmYWN0XG4gICAgICAgICAgICAvLyB0aGF0IHRoZSByZW1vdmFsIGZhaWxlZCBzbyB3ZSBjYW4gYmUgbGVzcyBhZ2dyZXNzaXZlIG5leHQgdGltZS5cbiAgICAgICAgICAgIHJhbmdlLmVuZCA9IHJlbmRlcmVkUmFuZ2UuZW5kO1xuICAgICAgICAgICAgY29udGVudE9mZnNldCA9IHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRPZmZzZXQgKyB0aGlzLl9sYXN0UmVuZGVyZWRDb250ZW50U2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92YWxGYWlsdXJlcysrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250ZW50T2Zmc2V0VG8gPSAndG8tZW5kJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZW1vdmVkU2l6ZSA9IHZpZXdwb3J0Lm1lYXN1cmVSYW5nZVNpemUoe1xuICAgICAgICAgICAgc3RhcnQ6IHJlbmRlcmVkUmFuZ2Uuc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHJhbmdlLnN0YXJ0LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIENoZWNrIHRoYXQgd2UncmUgbm90IHJlbW92aW5nIHRvbyBtdWNoLlxuICAgICAgICAgIGlmIChyZW1vdmVkU2l6ZSA8PSBvdmVyc2Nhbikge1xuICAgICAgICAgICAgY29udGVudE9mZnNldCA9IHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRPZmZzZXQgKyByZW1vdmVkU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92YWxGYWlsdXJlcyA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSByZW1vdmFsIGlzIG1vcmUgdGhhbiB0aGUgb3ZlcnNjYW4gY2FuIGFic29yYiBqdXN0IHVuZG8gaXQgYW5kIHJlY29yZCB0aGUgZmFjdFxuICAgICAgICAgICAgLy8gdGhhdCB0aGUgcmVtb3ZhbCBmYWlsZWQgc28gd2UgY2FuIGJlIGxlc3MgYWdncmVzc2l2ZSBuZXh0IHRpbWUuXG4gICAgICAgICAgICByYW5nZS5zdGFydCA9IHJlbmRlcmVkUmFuZ2Uuc3RhcnQ7XG4gICAgICAgICAgICBjb250ZW50T2Zmc2V0ID0gdGhpcy5fbGFzdFJlbmRlcmVkQ29udGVudE9mZnNldDtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92YWxGYWlsdXJlcysrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250ZW50T2Zmc2V0VG8gPSAndG8tc3RhcnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSByYW5nZSBhbmQgb2Zmc2V0IHdlIGNhbGN1bGF0ZWQgYWJvdmUuXG4gICAgICAgIHZpZXdwb3J0LnNldFJlbmRlcmVkUmFuZ2UocmFuZ2UpO1xuICAgICAgICB2aWV3cG9ydC5zZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQoY29udGVudE9mZnNldCArIG9mZnNldENvcnJlY3Rpb24sIGNvbnRlbnRPZmZzZXRUbyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvZmZzZXRDb3JyZWN0aW9uKSB7XG4gICAgICAvLyBFdmVuIGlmIHRoZSByZW5kZXJlZCByYW5nZSBkaWRuJ3QgY2hhbmdlLCB3ZSBtYXkgc3RpbGwgbmVlZCB0byBhZGp1c3QgdGhlIGNvbnRlbnQgb2Zmc2V0IHRvXG4gICAgICAvLyBzaW11bGF0ZSBzY3JvbGxpbmcgc2xpZ2h0bHkgc2xvd2VyIG9yIGZhc3RlciB0aGFuIHRoZSB1c2VyIGFjdHVhbGx5IHNjcm9sbGVkLlxuICAgICAgdmlld3BvcnQuc2V0UmVuZGVyZWRDb250ZW50T2Zmc2V0KHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRPZmZzZXQgKyBvZmZzZXRDb3JyZWN0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBTYXZlIHRoZSBzY3JvbGwgb2Zmc2V0IHRvIGJlIGNvbXBhcmVkIHRvIHRoZSBuZXcgdmFsdWUgb24gdGhlIG5leHQgc2Nyb2xsIGV2ZW50LlxuICAgIHRoaXMuX2xhc3RTY3JvbGxPZmZzZXQgPSBzY3JvbGxPZmZzZXQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBzaXplIG9mIHRoZSBjdXJyZW50bHkgcmVuZGVyZWQgY29udGVudCBhbmQgdXNlcyBpdCB0byB1cGRhdGUgdGhlIGVzdGltYXRlZCBpdGVtIHNpemVcbiAgICogYW5kIGVzdGltYXRlZCB0b3RhbCBjb250ZW50IHNpemUuXG4gICAqL1xuICBwcml2YXRlIF9jaGVja1JlbmRlcmVkQ29udGVudFNpemUoKSB7XG4gICAgY29uc3Qgdmlld3BvcnQgPSB0aGlzLl92aWV3cG9ydCE7XG4gICAgdGhpcy5fbGFzdFJlbmRlcmVkQ29udGVudFNpemUgPSB2aWV3cG9ydC5tZWFzdXJlUmVuZGVyZWRDb250ZW50U2l6ZSgpO1xuICAgIHRoaXMuX2F2ZXJhZ2VyLmFkZFNhbXBsZSh2aWV3cG9ydC5nZXRSZW5kZXJlZFJhbmdlKCksIHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRTaXplKTtcbiAgICB0aGlzLl91cGRhdGVUb3RhbENvbnRlbnRTaXplKHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRTaXplKTtcbiAgfVxuXG4gIC8qKiBDaGVja3MgdGhlIGN1cnJlbnRseSByZW5kZXJlZCBjb250ZW50IG9mZnNldCBhbmQgc2F2ZXMgdGhlIHZhbHVlIGZvciBsYXRlciB1c2UuICovXG4gIHByaXZhdGUgX2NoZWNrUmVuZGVyZWRDb250ZW50T2Zmc2V0KCkge1xuICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fdmlld3BvcnQhO1xuICAgIHRoaXMuX2xhc3RSZW5kZXJlZENvbnRlbnRPZmZzZXQgPSB2aWV3cG9ydC5nZXRPZmZzZXRUb1JlbmRlcmVkQ29udGVudFN0YXJ0KCkhO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY2FsY3VsYXRlcyB0aGUgcmVuZGVyZWQgY29udGVudCBiYXNlZCBvbiBvdXIgZXN0aW1hdGUgb2Ygd2hhdCBzaG91bGQgYmUgc2hvd24gYXQgdGhlIGN1cnJlbnRcbiAgICogc2Nyb2xsIG9mZnNldC5cbiAgICovXG4gIHByaXZhdGUgX3JlbmRlckNvbnRlbnRGb3JDdXJyZW50T2Zmc2V0KCkge1xuICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fdmlld3BvcnQhO1xuICAgIGNvbnN0IHNjcm9sbE9mZnNldCA9IHZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICB0aGlzLl9sYXN0U2Nyb2xsT2Zmc2V0ID0gc2Nyb2xsT2Zmc2V0O1xuICAgIHRoaXMuX3JlbW92YWxGYWlsdXJlcyA9IDA7XG5cbiAgICBjb25zdCBpdGVtU2l6ZSA9IHRoaXMuX2F2ZXJhZ2VyLmdldEF2ZXJhZ2VJdGVtU2l6ZSgpO1xuICAgIGNvbnN0IGZpcnN0VmlzaWJsZUluZGV4ID1cbiAgICAgICAgTWF0aC5taW4odmlld3BvcnQuZ2V0RGF0YUxlbmd0aCgpIC0gMSwgTWF0aC5mbG9vcihzY3JvbGxPZmZzZXQgLyBpdGVtU2l6ZSkpO1xuICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBNYXRoLmNlaWwodGhpcy5fbWF4QnVmZmVyUHggLyBpdGVtU2l6ZSk7XG4gICAgY29uc3QgcmFuZ2UgPSB0aGlzLl9leHBhbmRSYW5nZShcbiAgICAgICAgdGhpcy5fZ2V0VmlzaWJsZVJhbmdlRm9ySW5kZXgoZmlyc3RWaXNpYmxlSW5kZXgpLCBidWZmZXJTaXplLCBidWZmZXJTaXplKTtcblxuICAgIHZpZXdwb3J0LnNldFJlbmRlcmVkUmFuZ2UocmFuZ2UpO1xuICAgIHZpZXdwb3J0LnNldFJlbmRlcmVkQ29udGVudE9mZnNldChpdGVtU2l6ZSAqIHJhbmdlLnN0YXJ0KTtcbiAgfVxuXG4gIC8vIFRPRE86IG1heWJlIG1vdmUgdG8gYmFzZSBjbGFzcywgY2FuIHByb2JhYmx5IHNoYXJlIHdpdGggZml4ZWQgc2l6ZSBzdHJhdGVneS5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZpc2libGUgcmFuZ2Ugb2YgZGF0YSBmb3IgdGhlIGdpdmVuIHN0YXJ0IGluZGV4LiBJZiB0aGUgc3RhcnQgaW5kZXggaXMgdG9vIGNsb3NlIHRvXG4gICAqIHRoZSBlbmQgb2YgdGhlIGxpc3QgaXQgbWF5IGJlIGJhY2tlZCB1cCB0byBlbnN1cmUgdGhlIGVzdGltYXRlZCBzaXplIG9mIHRoZSByYW5nZSBpcyBlbm91Z2ggdG9cbiAgICogZmlsbCB0aGUgdmlld3BvcnQuXG4gICAqIE5vdGU6IG11c3Qgbm90IGJlIGNhbGxlZCBpZiBgdGhpcy5fdmlld3BvcnRgIGlzIG51bGxcbiAgICogQHBhcmFtIHN0YXJ0SW5kZXggVGhlIGluZGV4IHRvIHN0YXJ0IHRoZSByYW5nZSBhdFxuICAgKiBAcmV0dXJuIGEgcmFuZ2UgZXN0aW1hdGVkIHRvIGJlIGxhcmdlIGVub3VnaCB0byBmaWxsIHRoZSB2aWV3cG9ydCB3aGVuIHJlbmRlcmVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0VmlzaWJsZVJhbmdlRm9ySW5kZXgoc3RhcnRJbmRleDogbnVtYmVyKTogTGlzdFJhbmdlIHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0ITtcbiAgICBjb25zdCByYW5nZTogTGlzdFJhbmdlID0ge1xuICAgICAgc3RhcnQ6IHN0YXJ0SW5kZXgsXG4gICAgICBlbmQ6IHN0YXJ0SW5kZXggK1xuICAgICAgICAgIE1hdGguY2VpbCh2aWV3cG9ydC5nZXRWaWV3cG9ydFNpemUoKSAvIHRoaXMuX2F2ZXJhZ2VyLmdldEF2ZXJhZ2VJdGVtU2l6ZSgpKVxuICAgIH07XG4gICAgY29uc3QgZXh0cmEgPSByYW5nZS5lbmQgLSB2aWV3cG9ydC5nZXREYXRhTGVuZ3RoKCk7XG4gICAgaWYgKGV4dHJhID4gMCkge1xuICAgICAgcmFuZ2Uuc3RhcnQgPSBNYXRoLm1heCgwLCByYW5nZS5zdGFydCAtIGV4dHJhKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhbmdlO1xuICB9XG5cbiAgLy8gVE9ETzogbWF5YmUgbW92ZSB0byBiYXNlIGNsYXNzLCBjYW4gcHJvYmFibHkgc2hhcmUgd2l0aCBmaXhlZCBzaXplIHN0cmF0ZWd5LlxuICAvKipcbiAgICogRXhwYW5kIHRoZSBnaXZlbiByYW5nZSBieSB0aGUgZ2l2ZW4gYW1vdW50IGluIGVpdGhlciBkaXJlY3Rpb24uXG4gICAqIE5vdGU6IG11c3Qgbm90IGJlIGNhbGxlZCBpZiBgdGhpcy5fdmlld3BvcnRgIGlzIG51bGxcbiAgICogQHBhcmFtIHJhbmdlIFRoZSByYW5nZSB0byBleHBhbmRcbiAgICogQHBhcmFtIGV4cGFuZFN0YXJ0IFRoZSBudW1iZXIgb2YgaXRlbXMgdG8gZXhwYW5kIHRoZSBzdGFydCBvZiB0aGUgcmFuZ2UgYnkuXG4gICAqIEBwYXJhbSBleHBhbmRFbmQgVGhlIG51bWJlciBvZiBpdGVtcyB0byBleHBhbmQgdGhlIGVuZCBvZiB0aGUgcmFuZ2UgYnkuXG4gICAqIEByZXR1cm4gVGhlIGV4cGFuZGVkIHJhbmdlLlxuICAgKi9cbiAgcHJpdmF0ZSBfZXhwYW5kUmFuZ2UocmFuZ2U6IExpc3RSYW5nZSwgZXhwYW5kU3RhcnQ6IG51bWJlciwgZXhwYW5kRW5kOiBudW1iZXIpOiBMaXN0UmFuZ2Uge1xuICAgIGNvbnN0IHZpZXdwb3J0ID0gdGhpcy5fdmlld3BvcnQhO1xuICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgcmFuZ2Uuc3RhcnQgLSBleHBhbmRTdGFydCk7XG4gICAgY29uc3QgZW5kID0gTWF0aC5taW4odmlld3BvcnQuZ2V0RGF0YUxlbmd0aCgpLCByYW5nZS5lbmQgKyBleHBhbmRFbmQpO1xuICAgIHJldHVybiB7c3RhcnQsIGVuZH07XG4gIH1cblxuICAvKiogVXBkYXRlIHRoZSB2aWV3cG9ydCdzIHRvdGFsIGNvbnRlbnQgc2l6ZS4gKi9cbiAgcHJpdmF0ZSBfdXBkYXRlVG90YWxDb250ZW50U2l6ZShyZW5kZXJlZENvbnRlbnRTaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0ITtcbiAgICBjb25zdCByZW5kZXJlZFJhbmdlID0gdmlld3BvcnQuZ2V0UmVuZGVyZWRSYW5nZSgpO1xuICAgIGNvbnN0IHRvdGFsU2l6ZSA9IHJlbmRlcmVkQ29udGVudFNpemUgK1xuICAgICAgICAodmlld3BvcnQuZ2V0RGF0YUxlbmd0aCgpIC0gKHJlbmRlcmVkUmFuZ2UuZW5kIC0gcmVuZGVyZWRSYW5nZS5zdGFydCkpICpcbiAgICAgICAgdGhpcy5fYXZlcmFnZXIuZ2V0QXZlcmFnZUl0ZW1TaXplKCk7XG4gICAgdmlld3BvcnQuc2V0VG90YWxDb250ZW50U2l6ZSh0b3RhbFNpemUpO1xuICB9XG59XG4iXX0=