/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject, fromEvent, race, timer } from 'rxjs';
import { filter, startWith, pairwise, take, takeUntil, map, debounceTime } from 'rxjs/operators';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { splitRange, updateStickyRows, measureRangeSize } from './utils';
import { MetaRowStickyScroll } from './meta-row-sticky-scroll';
/** @type {?} */
const FIXED_HEADER_MODE = true;
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function sortByIndex(a, b) { return a.index - b.index; }
;
/**
 * @record
 */
export function NgeVirtualTableRowInfo() { }
if (false) {
    /** @type {?} */
    NgeVirtualTableRowInfo.prototype.headerLength;
    /** @type {?} */
    NgeVirtualTableRowInfo.prototype.rowLength;
    /** @type {?} */
    NgeVirtualTableRowInfo.prototype.footerLength;
}
/**
 * @template T
 */
export class PblVirtualScrollForOf {
    /**
     * @param {?} extApi
     * @param {?} ngZone
     */
    constructor(extApi, ngZone) {
        this.extApi = extApi;
        this.ngZone = ngZone;
        this.destroyed = new Subject();
        this.renderedContentOffset = 0;
        /**
         * The length of meta rows [0] = header [1] = footer
         */
        this.metaRows = [0, 0];
        this.header = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
        this.footer = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
        this.table = extApi.table;
        this.cdkTable = extApi.cdkTable;
        this.viewport = extApi.table.viewport;
        this.viewChange = this.cdkTable.viewChange;
        PblNgridPluginController.find(extApi.table).events
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onDataSource') {
                this.detachView();
                this.attachView(event.curr);
            }
        }));
        this.attachView(extApi.table.ds);
        extApi.metaRowService.sync
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const headers = extApi.metaRowService.header.row.concat(extApi.metaRowService.header.sticky).sort(sortByIndex);
            /** @type {?} */
            const footers = extApi.metaRowService.footer.row.concat(extApi.metaRowService.footer.sticky).sort(sortByIndex);
            this.header.rows = headers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.el));
            this.header.sticky = headers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef.type === 'sticky'));
            this.footer.rows = footers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.el));
            this.footer.sticky = footers.map((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef.type === 'sticky'));
            updateStickyRows(this.renderedContentOffset, this.header.rows, this.header.sticky, 'top');
            updateStickyRows(this.renderedContentOffset, this.footer.rows, this.footer.sticky, 'bottom');
        }));
        if (FIXED_HEADER_MODE) {
            /** @type {?} */
            let offset = 0;
            /** @type {?} */
            const viewPort = this.viewport.elementRef.nativeElement;
            /** @type {?} */
            const metaRowStickyScroll = new MetaRowStickyScroll(this.viewport, viewPort, { header: this.header, footer: this.footer });
            /** @type {?} */
            let scrollPosition;
            /** @type {?} */
            const wheelListen = (/**
             * @return {?}
             */
            () => viewPort.addEventListener('wheel', handler, true));
            /** @type {?} */
            const wheelUnListen = (/**
             * @return {?}
             */
            () => viewPort.removeEventListener('wheel', handler, true));
            /** @type {?} */
            const updateScrollPosition = (/**
             * @return {?}
             */
            () => scrollPosition = (this.viewport.measureScrollOffset()) / (this.viewport.scrollHeight - this.viewport.getViewportSize()));
            /** @type {?} */
            const handler = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
                if (event.deltaY) {
                    if ((scrollPosition === 1 && event.deltaY > 0) || (offset === 0 && event.deltaY < 0)) {
                        return;
                    }
                    /** @type {?} */
                    let newOffset = offset + event.deltaY;
                    newOffset = Math.min(this.viewport.scrollHeight, Math.max(0, newOffset));
                    if (newOffset !== offset) {
                        offset = newOffset;
                        if (metaRowStickyScroll.canMove() && metaRowStickyScroll.move(event.deltaY, viewPort.getBoundingClientRect())) {
                            /** @type {?} */
                            const scrollEnd$ = this.viewport.scrolling.pipe(filter((/**
                             * @param {?} s
                             * @return {?}
                             */
                            s => !s)));
                            /** @type {?} */
                            const restore = (/**
                             * @return {?}
                             */
                            () => {
                                metaRowStickyScroll.restore(this.renderedContentOffset);
                                updateScrollPosition();
                            });
                            /** @type {?} */
                            let removedEvent = false;
                            if (this.viewport.wheelMode !== 'blocking') {
                                /** @type {?} */
                                const wheelMode = this.viewport.wheelMode;
                                if (wheelMode === 'passive') {
                                    wheelUnListen();
                                    this.viewport.scrolling.pipe(debounceTime(150), filter((/**
                                     * @param {?} s
                                     * @return {?}
                                     */
                                    s => !s)), take(1))
                                        .subscribe((/**
                                     * @return {?}
                                     */
                                    () => {
                                        restore();
                                        wheelListen();
                                    }));
                                }
                                else {
                                    this.viewport.scrollFrameRate
                                        .pipe(takeUntil(scrollEnd$.pipe(take(1))))
                                        .subscribe((/**
                                     * @param {?} frameRate
                                     * @return {?}
                                     */
                                    frameRate => {
                                        if (!removedEvent && frameRate < wheelMode) {
                                            wheelUnListen();
                                            removedEvent = true;
                                        }
                                    }), null, (/**
                                     * @return {?}
                                     */
                                    () => {
                                        /** @type {?} */
                                        const lastWheel$ = fromEvent(viewPort, 'wheel').pipe(debounceTime(50), take(1));
                                        race(lastWheel$, (/** @type {?} */ (timer(51))))
                                            .subscribe((/**
                                         * @return {?}
                                         */
                                        () => {
                                            restore();
                                            if (removedEvent) {
                                                wheelListen();
                                            }
                                        }));
                                        // we restore back after 100 ms, for some reason, if it's immediate, we hit a cycle of wheel/scroll/no-scroll and not wheel/scroll/WAIIIIIT/no-scrol
                                        // TODO: maybe we can measure time between no-scrolling and wheel to find this MS value
                                        //        OR, register a temp `wheel` listener that will detect wheel end and re-register the original handler.
                                    }));
                                }
                            }
                            else {
                                scrollEnd$.pipe(take(1)).subscribe(restore);
                            }
                        }
                    }
                    this.viewport.scrollToOffset(offset);
                    event.preventDefault();
                    event.stopPropagation();
                    return true;
                }
            });
            updateScrollPosition();
            wheelListen();
            this.viewport.scrolling.subscribe((/**
             * @param {?} isScrolling
             * @return {?}
             */
            isScrolling => {
                if (!isScrolling) {
                    offset = this.viewport.measureScrollOffset();
                }
            }));
        }
        this.viewport.offsetChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} offset
         * @return {?}
         */
        offset => {
            if (this.renderedContentOffset !== offset) {
                this.renderedContentOffset = offset;
                updateStickyRows(offset, this.header.rows, this.header.sticky, 'top');
                updateStickyRows(offset, this.footer.rows, this.footer.sticky, 'bottom');
            }
        }));
    }
    /**
     * @return {?}
     */
    get headerLength() { return this.header.rows.length; }
    /**
     * @return {?}
     */
    get rowLength() { return this.vcRefs.data.length; }
    /**
     * @return {?}
     */
    get footerLength() { return this.footer.rows.length; }
    /**
     * @private
     * @return {?}
     */
    get vcRefs() {
        /** @type {?} */
        const value = {
            header: this.cdkTable._headerRowOutlet.viewContainer,
            data: this.cdkTable._rowOutlet.viewContainer,
            footer: this.cdkTable._footerRowOutlet.viewContainer,
        };
        Object.defineProperty(this, 'vcRefs', { value, configurable: true });
        return value;
    }
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     * @param {?} range
     * @param {?} orientation
     * @return {?}
     */
    measureRangeSize(range, orientation) {
        if (range.start >= range.end) {
            return 0;
        }
        /** @type {?} */
        const renderedRanges = this._renderedRanges;
        /** @type {?} */
        const ranges = splitRange(range, this.metaRows[0], this.ds.length);
        /** @type {?} */
        const stickyStates = [this.header.sticky, [], this.footer.sticky];
        /** @type {?} */
        const vcRefs = [this.vcRefs.header, this.vcRefs.data, this.vcRefs.footer];
        /** @type {?} */
        const vcRefSizeReducer = (/**
         * @param {?} total
         * @param {?} vcRef
         * @param {?} index
         * @return {?}
         */
        (total, vcRef, index) => {
            return total + measureRangeSize(vcRef, ranges[index], renderedRanges[index], orientation, stickyStates[index]);
        });
        return vcRefs.reduce(vcRefSizeReducer, 0);
    }
    /**
     * @return {?}
     */
    destroy() {
        this.detachView();
        this.destroyed.next();
        this.destroyed.complete();
    }
    /**
     * @private
     * @param {?} ds
     * @return {?}
     */
    attachView(ds) {
        if (ds) {
            this.ds = ds;
            this._renderedRanges = [{ start: 0, end: 0 }, this.cdkTable.viewChange.value, { start: 0, end: 0 }];
            this.viewport.renderedRangeStream
                .pipe(takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} range
             * @return {?}
             */
            range => {
                if (this.headerLength + this.footerLength === 0) { // if no row/sticky meta rows, move on...
                    this._renderedRanges = [{ start: 0, end: 0 }, range, { start: 0, end: 0 }];
                    return this.cdkTable.viewChange.next(range);
                }
                /*  WHAT IS GOING ON HERE? */
                /*  Table rows are split into 3 sections: Header, Data, Footer.
                    In the virtual playground only DATA rows are dynamic. Header & Footer rows are fixed.
      
                    The `CdkTable` works the same, also have the same sections with a stream API for DATA rows only.
                    `CdkTable.viewChange.next(RANGE)` will emit to the datasource which will result in a new data section from the datasource.
      
                    `CdkTable` alone does not support virtual scrolling, to achieve it we use a virtual scroll viewport which wraps the entire `CdkTable`.
                    This means that ALL sections are wrapped (hence scrolled over) but only DATA rows are moving...
      
                    Each emission of `ListRange` in `renderedRangeStream` is based on size calculation of ALL sections (see `measureRangeSize` above)
                    and we need to extract the relevant range for DATA rows only and pass it on to the table.
      
                    To make this work we need to extract Header/Footer rows based on the starting position of the range and handle them as well.
                    Because the table will only handle the scrolling of DATA rows we need to update HEADER/FOOTER rows to show/hide based on the range.
      
                    Because Header/Footer rows are fixed we do this by hiding them with `display: none`, unless they are sticky / pinned.
                    One exception is the main header row, which we hide virtually because we need it to render and reflect the cell size.
      
                    We first extract the actual ranges for each section and update the `CdkTable` with the DATA row range.
                    We then wait for the rows to render, which is the time for us to also "render" Header/Footer rows...
                    We don't "render" them per-se, they are already rendered, we just show/hide them based on the range and state (sticky).
                    This is important, hiding will cause the total height of the scroll container to shrink to the size it should be.
                    We defer this operation to run AFTER the rows are rendered (not immediately) because an immediate change will trigger
                    a change in the scroll container size resulting in a scroll event that will bring us back here but this time with
                    a height that does not fit the range. Immediate change removes rows (Header/Footer) before the new range is applied.
                    Only after the rows are rendered we can show/hide the Header/Footer rows.
                */
                // Extracting actual ranges for each section.
                this._renderedRanges = splitRange(range, this.metaRows[0], ds.length);
                const [header, data, footer] = this._renderedRanges;
                this.cdkTable.onRenderRows.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                () => {
                    // We update the header DOM elements in reverse, skipping the last (first when reversed) DOM element.
                    // The skipped element is the table's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
                    // An hidden row is one that is out of range AND not sticky
                    if (this.headerLength > 0) {
                        /** @type {?} */
                        const htmlRows = this.header.rows;
                        /** @type {?} */
                        const renderedRows = this.header.rendered;
                        /** @type {?} */
                        const stickyRows = this.header.sticky;
                        /** @type {?} */
                        let rowIndex = 0;
                        for (const len = this.header.sticky.length - 1; rowIndex < len; rowIndex++) {
                            // assign rendered state + if not rendered and not sticky, set display to "none"
                            htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]
                                ? 'none'
                                : null;
                        }
                        // Here we update the main header row, when we need to hide it we apply a class that will hide it virtually, i.e. not showing but keeping internal layout.
                        if (!(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]) {
                            htmlRows[rowIndex].classList.add('pbl-ngrid-row-visually-hidden');
                        }
                        else if (this.table.showHeader && htmlRows[rowIndex]) {
                            htmlRows[rowIndex].classList.remove('pbl-ngrid-row-visually-hidden');
                        }
                    }
                    if (this.footerLength > 0) {
                        /** @type {?} */
                        const htmlRows = this.footer.rows;
                        /** @type {?} */
                        const renderedRows = this.footer.rendered;
                        /** @type {?} */
                        const stickyRows = this.footer.sticky;
                        /** @type {?} */
                        let rowIndex = 0;
                        for (const len = this.footer.sticky.length; rowIndex < len; rowIndex++) {
                            // assign rendered state + if not rendered and not sticky, set display to "none"
                            htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex < footer.end) && !stickyRows[rowIndex]
                                ? 'none'
                                : null;
                        }
                    }
                }));
                this.cdkTable.viewChange.next(data);
            }));
            // add meta rows to the total row count.
            this.dataStream = ds.onRenderDataChanging
                .pipe(takeUntil(this.destroyed), map((/**
             * @param {?} __0
             * @return {?}
             */
            ({ data }) => {
                /** @type {?} */
                const metaRows = this.metaRows = [this.header.rows.length, this.footer.rows.length];
                return new Array(data.length + metaRows[0] + metaRows[1]);
            })));
            ds.onRenderedDataChanged
                .pipe(takeUntil(this.destroyed), map((/**
             * @return {?}
             */
            () => ds.length)), startWith(0), pairwise(), filter((/**
             * @param {?} __0
             * @return {?}
             */
            ([prev, curr]) => prev !== curr)))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            ([prev, curr]) => {
                this.ngZone.onStable.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                () => this.viewport.onSourceLengthChange(prev, curr)));
            }));
            this.viewport.attach((/** @type {?} */ (this)));
        }
    }
    /**
     * @private
     * @return {?}
     */
    detachView() {
        this.ds = undefined;
        this.viewport.detach();
    }
}
if (false) {
    /** @type {?} */
    PblVirtualScrollForOf.prototype.viewChange;
    /** @type {?} */
    PblVirtualScrollForOf.prototype.dataStream;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.destroyed;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.ds;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.renderedContentOffset;
    /**
     * A tuple containing the last known ranges [header, data, footer]
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype._renderedRanges;
    /**
     * The length of meta rows [0] = header [1] = footer
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.metaRows;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.header;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.footer;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.cdkTable;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.viewport;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.extApi;
    /**
     * @type {?}
     * @private
     */
    PblVirtualScrollForOf.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZm9yLW9mLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC1mb3Itb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBTyxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3RHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQXFCLE1BQU0sU0FBUyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOztNQUV6RCxpQkFBaUIsR0FBRyxJQUFJOzs7Ozs7QUFFOUIsU0FBUyxXQUFXLENBQUMsQ0FBb0IsRUFBRSxDQUFvQixJQUFJLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQztBQUFBLENBQUM7Ozs7QUFFOUYsNENBSUM7OztJQUhDLDhDQUE4Qjs7SUFDOUIsMkNBQTJCOztJQUMzQiw4Q0FBOEI7Ozs7O0FBR2hDLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBa0NoQyxZQUFvQixNQUErQixFQUFVLE1BQWM7UUFBdkQsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBekJuRSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWFoQywwQkFBcUIsR0FBRyxDQUFDLENBQUM7Ozs7UUFJMUIsYUFBUSxHQUFx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LEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FDMUM7aUJBQ0EsU0FBUzs7OztZQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7OztnQkFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLENBQUMsRUFBQyxDQUFDO1lBRUwsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Q0FDRjs7O0lBclRDLDJDQUFrQzs7SUFFbEMsMkNBQStDOzs7OztJQU0vQywwQ0FBd0M7Ozs7O0lBQ3hDLG1DQUE2Qjs7Ozs7SUFZN0Isc0RBQWtDOzs7Ozs7SUFFbEMsZ0RBQTJEOzs7Ozs7SUFFM0QseUNBQTRDOzs7OztJQUU1Qyx1Q0FBbUc7Ozs7O0lBQ25HLHVDQUFtRzs7Ozs7SUFFbkcsc0NBQW9DOzs7OztJQUNwQyx5Q0FBMEM7Ozs7O0lBQzFDLHlDQUF1RDs7Ozs7SUFDM0MsdUNBQXVDOzs7OztJQUFFLHVDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIGZyb21FdmVudCwgcmFjZSwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgc3RhcnRXaXRoLCBwYWlyd2lzZSwgdGFrZSwgdGFwLCB0YWtlVW50aWwsIG1hcCwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOZ1pvbmUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbGxlY3Rpb25WaWV3ZXIsIExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5cbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgc3BsaXRSYW5nZSwgdXBkYXRlU3RpY2t5Um93cywgbWVhc3VyZVJhbmdlU2l6ZSwgU3RpY2t5RGlyZWN0aW9uVnQgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IE1ldGFSb3dTdGlja3lTY3JvbGwgfSBmcm9tICcuL21ldGEtcm93LXN0aWNreS1zY3JvbGwnO1xuXG5jb25zdCBGSVhFRF9IRUFERVJfTU9ERSA9IHRydWU7XG5cbmZ1bmN0aW9uIHNvcnRCeUluZGV4KGE6IHsgaW5kZXg6IG51bWJlciB9LCBiOiB7IGluZGV4OiBudW1iZXIgfSkgeyByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXggfTtcblxuZXhwb3J0IGludGVyZmFjZSBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIHtcbiAgcmVhZG9ubHkgaGVhZGVyTGVuZ3RoOiBudW1iZXI7XG4gIHJlYWRvbmx5IHJvd0xlbmd0aDogbnVtYmVyO1xuICByZWFkb25seSBmb290ZXJMZW5ndGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFBibFZpcnR1YWxTY3JvbGxGb3JPZjxUPiBpbXBsZW1lbnRzIENvbGxlY3Rpb25WaWV3ZXIsIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8ge1xuICB2aWV3Q2hhbmdlOiBPYnNlcnZhYmxlPExpc3RSYW5nZT47XG5cbiAgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxUW10gfCBSZWFkb25seUFycmF5PFQ+PjtcblxuICBnZXQgaGVhZGVyTGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmhlYWRlci5yb3dzLmxlbmd0aCAgfVxuICBnZXQgcm93TGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnZjUmVmcy5kYXRhLmxlbmd0aCAgfVxuICBnZXQgZm9vdGVyTGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmZvb3Rlci5yb3dzLmxlbmd0aCAgfVxuXG4gIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBkczogUGJsRGF0YVNvdXJjZTxUPjtcblxuICBwcml2YXRlIGdldCB2Y1JlZnMoKTogUmVjb3JkPCdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIFZpZXdDb250YWluZXJSZWY+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgIGhlYWRlcjogdGhpcy5jZGtUYWJsZS5faGVhZGVyUm93T3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICBkYXRhOiB0aGlzLmNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgIGZvb3RlcjogdGhpcy5jZGtUYWJsZS5fZm9vdGVyUm93T3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3ZjUmVmcycsIHsgdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcmVkQ29udGVudE9mZnNldCA9IDA7XG4gIC8qKiBBIHR1cGxlIGNvbnRhaW5pbmcgdGhlIGxhc3Qga25vd24gcmFuZ2VzIFtoZWFkZXIsIGRhdGEsIGZvb3Rlcl0gKi9cbiAgcHJpdmF0ZSBfcmVuZGVyZWRSYW5nZXM6IFtMaXN0UmFuZ2UsIExpc3RSYW5nZSwgTGlzdFJhbmdlXTtcbiAgLyoqIFRoZSBsZW5ndGggb2YgbWV0YSByb3dzIFswXSA9IGhlYWRlciBbMV0gPSBmb290ZXIgKi9cbiAgcHJpdmF0ZSBtZXRhUm93czogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICBwcml2YXRlIGhlYWRlciA9IHsgcm93czogW10gYXMgSFRNTEVsZW1lbnRbXSwgc3RpY2t5OiBbXSBhcyBib29sZWFuW10sIHJlbmRlcmVkOiBbXSBhcyBib29sZWFuW10gfTtcbiAgcHJpdmF0ZSBmb290ZXIgPSB7IHJvd3M6IFtdIGFzIEhUTUxFbGVtZW50W10sIHN0aWNreTogW10gYXMgYm9vbGVhbltdLCByZW5kZXJlZDogW10gYXMgYm9vbGVhbltdIH07XG5cbiAgcHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgY2RrVGFibGU6IFBibENka1RhYmxlQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIHZpZXdwb3J0OiBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQ7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPiwgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIHRoaXMudGFibGUgPSBleHRBcGkudGFibGU7XG4gICAgdGhpcy5jZGtUYWJsZSA9IGV4dEFwaS5jZGtUYWJsZTtcbiAgICB0aGlzLnZpZXdwb3J0ID0gZXh0QXBpLnRhYmxlLnZpZXdwb3J0O1xuXG4gICAgdGhpcy52aWV3Q2hhbmdlID0gdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlO1xuXG4gICAgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoZXh0QXBpLnRhYmxlKS5ldmVudHNcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgdGhpcy5kZXRhY2hWaWV3KCk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hWaWV3KGV2ZW50LmN1cnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLmF0dGFjaFZpZXcoZXh0QXBpLnRhYmxlLmRzKTtcblxuICAgIGV4dEFwaS5tZXRhUm93U2VydmljZS5zeW5jXG4gICAgICAucGlwZSggdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSApXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBleHRBcGkubWV0YVJvd1NlcnZpY2UuaGVhZGVyLnJvdy5jb25jYXQoZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmhlYWRlci5zdGlja3kpLnNvcnQoc29ydEJ5SW5kZXgpO1xuICAgICAgICBjb25zdCBmb290ZXJzID0gZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmZvb3Rlci5yb3cuY29uY2F0KGV4dEFwaS5tZXRhUm93U2VydmljZS5mb290ZXIuc3RpY2t5KS5zb3J0KHNvcnRCeUluZGV4KTtcblxuICAgICAgICB0aGlzLmhlYWRlci5yb3dzID0gaGVhZGVycy5tYXAoIGggPT4gaC5lbCApO1xuICAgICAgICB0aGlzLmhlYWRlci5zdGlja3kgPSBoZWFkZXJzLm1hcCggaCA9PiBoLnJvd0RlZi50eXBlID09PSAnc3RpY2t5JyApO1xuICAgICAgICB0aGlzLmZvb3Rlci5yb3dzID0gZm9vdGVycy5tYXAoIGggPT4gaC5lbCApO1xuICAgICAgICB0aGlzLmZvb3Rlci5zdGlja3kgPSBmb290ZXJzLm1hcCggaCA9PiBoLnJvd0RlZi50eXBlID09PSAnc3RpY2t5JyApO1xuXG4gICAgICAgIHVwZGF0ZVN0aWNreVJvd3ModGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQsIHRoaXMuaGVhZGVyLnJvd3MsIHRoaXMuaGVhZGVyLnN0aWNreSwgJ3RvcCcpO1xuICAgICAgICB1cGRhdGVTdGlja3lSb3dzKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0LCB0aGlzLmZvb3Rlci5yb3dzLCB0aGlzLmZvb3Rlci5zdGlja3ksICdib3R0b20nKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKEZJWEVEX0hFQURFUl9NT0RFKSB7XG4gICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgIGNvbnN0IHZpZXdQb3J0ID0gdGhpcy52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBtZXRhUm93U3RpY2t5U2Nyb2xsID0gbmV3IE1ldGFSb3dTdGlja3lTY3JvbGwodGhpcy52aWV3cG9ydCwgdmlld1BvcnQsIHsgaGVhZGVyOiB0aGlzLmhlYWRlciwgZm9vdGVyOiB0aGlzLmZvb3RlciB9KTtcbiAgICAgIGxldCBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICBjb25zdCB3aGVlbExpc3RlbiA9ICgpID0+IHZpZXdQb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgaGFuZGxlciwgdHJ1ZSk7XG4gICAgICBjb25zdCB3aGVlbFVuTGlzdGVuID0gKCkgPT4gdmlld1BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBoYW5kbGVyLCB0cnVlKTtcbiAgICAgIGNvbnN0IHVwZGF0ZVNjcm9sbFBvc2l0aW9uID0gKCkgPT4gc2Nyb2xsUG9zaXRpb24gPSAodGhpcy52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCkpIC8gKHRoaXMudmlld3BvcnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydC5nZXRWaWV3cG9ydFNpemUoKSk7XG5cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSkge1xuICAgICAgICAgIGlmICggKHNjcm9sbFBvc2l0aW9uID09PSAxICYmIGV2ZW50LmRlbHRhWSA+IDApIHx8IChvZmZzZXQgPT09IDAgJiYgZXZlbnQuZGVsdGFZIDwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IG5ld09mZnNldCA9IG9mZnNldCArIGV2ZW50LmRlbHRhWTtcbiAgICAgICAgICBuZXdPZmZzZXQgPSBNYXRoLm1pbih0aGlzLnZpZXdwb3J0LnNjcm9sbEhlaWdodCwgTWF0aC5tYXgoMCwgbmV3T2Zmc2V0KSk7XG5cbiAgICAgICAgICBpZiAobmV3T2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IG5ld09mZnNldDtcbiAgICAgICAgICAgIGlmIChtZXRhUm93U3RpY2t5U2Nyb2xsLmNhbk1vdmUoKSAmJiBtZXRhUm93U3RpY2t5U2Nyb2xsLm1vdmUoZXZlbnQuZGVsdGFZLCB2aWV3UG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsRW5kJCA9IHRoaXMudmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUoZmlsdGVyKCBzID0+ICFzICkpO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHJlc3RvcmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWV0YVJvd1N0aWNreVNjcm9sbC5yZXN0b3JlKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGxldCByZW1vdmVkRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMudmlld3BvcnQud2hlZWxNb2RlICE9PSAnYmxvY2tpbmcnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2hlZWxNb2RlID0gdGhpcy52aWV3cG9ydC53aGVlbE1vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHdoZWVsTW9kZSA9PT0gJ3Bhc3NpdmUnKSB7XG4gICAgICAgICAgICAgICAgICB3aGVlbFVuTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbGluZy5waXBlKGRlYm91bmNlVGltZSgxNTApLCBmaWx0ZXIoIHMgPT4gIXMgKSwgdGFrZSgxKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB3aGVlbExpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxGcmFtZVJhdGVcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHNjcm9sbEVuZCQucGlwZSh0YWtlKDEpKSkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgZnJhbWVSYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVtb3ZlZEV2ZW50ICYmIGZyYW1lUmF0ZSA8IHdoZWVsTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFVuTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWRFdmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RXaGVlbCQgPSBmcm9tRXZlbnQodmlld1BvcnQsICd3aGVlbCcpLnBpcGUoZGVib3VuY2VUaW1lKDUwKSwgdGFrZSgxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWNlKGxhc3RXaGVlbCQsIHRpbWVyKDUxKSBhcyBhbnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZWRFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxMaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSByZXN0b3JlIGJhY2sgYWZ0ZXIgMTAwIG1zLCBmb3Igc29tZSByZWFzb24sIGlmIGl0J3MgaW1tZWRpYXRlLCB3ZSBoaXQgYSBjeWNsZSBvZiB3aGVlbC9zY3JvbGwvbm8tc2Nyb2xsIGFuZCBub3Qgd2hlZWwvc2Nyb2xsL1dBSUlJSUlUL25vLXNjcm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG1heWJlIHdlIGNhbiBtZWFzdXJlIHRpbWUgYmV0d2VlbiBuby1zY3JvbGxpbmcgYW5kIHdoZWVsIHRvIGZpbmQgdGhpcyBNUyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgT1IsIHJlZ2lzdGVyIGEgdGVtcCBgd2hlZWxgIGxpc3RlbmVyIHRoYXQgd2lsbCBkZXRlY3Qgd2hlZWwgZW5kIGFuZCByZS1yZWdpc3RlciB0aGUgb3JpZ2luYWwgaGFuZGxlci5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcm9sbEVuZCQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUocmVzdG9yZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxUb09mZnNldChvZmZzZXQpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB1cGRhdGVTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgd2hlZWxMaXN0ZW4oKTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxpbmcuc3Vic2NyaWJlKCBpc1Njcm9sbGluZyA9PiB7XG4gICAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICBvZmZzZXQgPSB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3cG9ydC5vZmZzZXRDaGFuZ2VcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoIG9mZnNldCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCAhPT0gb2Zmc2V0KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgdXBkYXRlU3RpY2t5Um93cyhvZmZzZXQsIHRoaXMuaGVhZGVyLnJvd3MsIHRoaXMuaGVhZGVyLnN0aWNreSwgJ3RvcCcpO1xuICAgICAgICAgIHVwZGF0ZVN0aWNreVJvd3Mob2Zmc2V0LCB0aGlzLmZvb3Rlci5yb3dzLCB0aGlzLmZvb3Rlci5zdGlja3ksICdib3R0b20nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWVhc3VyZXMgdGhlIGNvbWJpbmVkIHNpemUgKHdpZHRoIGZvciBob3Jpem9udGFsIG9yaWVudGF0aW9uLCBoZWlnaHQgZm9yIHZlcnRpY2FsKSBvZiBhbGwgaXRlbXNcbiAgICogaW4gdGhlIHNwZWNpZmllZCByYW5nZS4gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByYW5nZSBpbmNsdWRlcyBpdGVtcyB0aGF0IGFyZSBub3QgY3VycmVudGx5XG4gICAqIHJlbmRlcmVkLlxuICAgKi9cbiAgbWVhc3VyZVJhbmdlU2l6ZShyYW5nZTogTGlzdFJhbmdlLCBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyk6IG51bWJlciB7XG4gICAgaWYgKHJhbmdlLnN0YXJ0ID49IHJhbmdlLmVuZCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyZWRSYW5nZXMgPSB0aGlzLl9yZW5kZXJlZFJhbmdlcztcbiAgICBjb25zdCByYW5nZXMgPSBzcGxpdFJhbmdlKHJhbmdlLCB0aGlzLm1ldGFSb3dzWzBdLCB0aGlzLmRzLmxlbmd0aCk7XG4gICAgY29uc3Qgc3RpY2t5U3RhdGVzID0gWyB0aGlzLmhlYWRlci5zdGlja3ksIFtdLCB0aGlzLmZvb3Rlci5zdGlja3kgXTtcblxuICAgIGNvbnN0IHZjUmVmcyA9IFt0aGlzLnZjUmVmcy5oZWFkZXIsIHRoaXMudmNSZWZzLmRhdGEsIHRoaXMudmNSZWZzLmZvb3Rlcl07XG4gICAgY29uc3QgdmNSZWZTaXplUmVkdWNlciA9ICh0b3RhbDogbnVtYmVyLCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgaW5kZXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICByZXR1cm4gdG90YWwgKyBtZWFzdXJlUmFuZ2VTaXplKHZjUmVmLCByYW5nZXNbaW5kZXhdLCByZW5kZXJlZFJhbmdlc1tpbmRleF0sIG9yaWVudGF0aW9uLCBzdGlja3lTdGF0ZXNbaW5kZXhdKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHZjUmVmcy5yZWR1Y2UodmNSZWZTaXplUmVkdWNlciwgMCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoVmlldygpO1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hWaWV3KGRzOiBQYmxEYXRhU291cmNlPFQ+KTogdm9pZCB7XG4gICAgaWYgKGRzKSB7XG4gICAgICB0aGlzLmRzID0gZHM7XG4gICAgICB0aGlzLl9yZW5kZXJlZFJhbmdlcyA9IFsgeyBzdGFydDogMCwgZW5kOiAwIH0sIHRoaXMuY2RrVGFibGUudmlld0NoYW5nZS52YWx1ZSwgeyBzdGFydDogMCwgZW5kOiAwIH0gXTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5yZW5kZXJlZFJhbmdlU3RyZWFtXG4gICAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgICAgLnN1YnNjcmliZSggcmFuZ2UgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmhlYWRlckxlbmd0aCArIHRoaXMuZm9vdGVyTGVuZ3RoID09PSAwKSB7IC8vIGlmIG5vIHJvdy9zdGlja3kgbWV0YSByb3dzLCBtb3ZlIG9uLi4uXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZFJhbmdlcyA9IFsgeyBzdGFydDogMCwgZW5kOiAwIH0sIHJhbmdlLCB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSBdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2RrVGFibGUudmlld0NoYW5nZS5uZXh0KHJhbmdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiAgV0hBVCBJUyBHT0lORyBPTiBIRVJFPyAqL1xuXG4gICAgICAgICAgLyogIFRhYmxlIHJvd3MgYXJlIHNwbGl0IGludG8gMyBzZWN0aW9uczogSGVhZGVyLCBEYXRhLCBGb290ZXIuXG4gICAgICAgICAgICAgIEluIHRoZSB2aXJ0dWFsIHBsYXlncm91bmQgb25seSBEQVRBIHJvd3MgYXJlIGR5bmFtaWMuIEhlYWRlciAmIEZvb3RlciByb3dzIGFyZSBmaXhlZC5cblxuICAgICAgICAgICAgICBUaGUgYENka1RhYmxlYCB3b3JrcyB0aGUgc2FtZSwgYWxzbyBoYXZlIHRoZSBzYW1lIHNlY3Rpb25zIHdpdGggYSBzdHJlYW0gQVBJIGZvciBEQVRBIHJvd3Mgb25seS5cbiAgICAgICAgICAgICAgYENka1RhYmxlLnZpZXdDaGFuZ2UubmV4dChSQU5HRSlgIHdpbGwgZW1pdCB0byB0aGUgZGF0YXNvdXJjZSB3aGljaCB3aWxsIHJlc3VsdCBpbiBhIG5ldyBkYXRhIHNlY3Rpb24gZnJvbSB0aGUgZGF0YXNvdXJjZS5cblxuICAgICAgICAgICAgICBgQ2RrVGFibGVgIGFsb25lIGRvZXMgbm90IHN1cHBvcnQgdmlydHVhbCBzY3JvbGxpbmcsIHRvIGFjaGlldmUgaXQgd2UgdXNlIGEgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQgd2hpY2ggd3JhcHMgdGhlIGVudGlyZSBgQ2RrVGFibGVgLlxuICAgICAgICAgICAgICBUaGlzIG1lYW5zIHRoYXQgQUxMIHNlY3Rpb25zIGFyZSB3cmFwcGVkIChoZW5jZSBzY3JvbGxlZCBvdmVyKSBidXQgb25seSBEQVRBIHJvd3MgYXJlIG1vdmluZy4uLlxuXG4gICAgICAgICAgICAgIEVhY2ggZW1pc3Npb24gb2YgYExpc3RSYW5nZWAgaW4gYHJlbmRlcmVkUmFuZ2VTdHJlYW1gIGlzIGJhc2VkIG9uIHNpemUgY2FsY3VsYXRpb24gb2YgQUxMIHNlY3Rpb25zIChzZWUgYG1lYXN1cmVSYW5nZVNpemVgIGFib3ZlKVxuICAgICAgICAgICAgICBhbmQgd2UgbmVlZCB0byBleHRyYWN0IHRoZSByZWxldmFudCByYW5nZSBmb3IgREFUQSByb3dzIG9ubHkgYW5kIHBhc3MgaXQgb24gdG8gdGhlIHRhYmxlLlxuXG4gICAgICAgICAgICAgIFRvIG1ha2UgdGhpcyB3b3JrIHdlIG5lZWQgdG8gZXh0cmFjdCBIZWFkZXIvRm9vdGVyIHJvd3MgYmFzZWQgb24gdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSByYW5nZSBhbmQgaGFuZGxlIHRoZW0gYXMgd2VsbC5cbiAgICAgICAgICAgICAgQmVjYXVzZSB0aGUgdGFibGUgd2lsbCBvbmx5IGhhbmRsZSB0aGUgc2Nyb2xsaW5nIG9mIERBVEEgcm93cyB3ZSBuZWVkIHRvIHVwZGF0ZSBIRUFERVIvRk9PVEVSIHJvd3MgdG8gc2hvdy9oaWRlIGJhc2VkIG9uIHRoZSByYW5nZS5cblxuICAgICAgICAgICAgICBCZWNhdXNlIEhlYWRlci9Gb290ZXIgcm93cyBhcmUgZml4ZWQgd2UgZG8gdGhpcyBieSBoaWRpbmcgdGhlbSB3aXRoIGBkaXNwbGF5OiBub25lYCwgdW5sZXNzIHRoZXkgYXJlIHN0aWNreSAvIHBpbm5lZC5cbiAgICAgICAgICAgICAgT25lIGV4Y2VwdGlvbiBpcyB0aGUgbWFpbiBoZWFkZXIgcm93LCB3aGljaCB3ZSBoaWRlIHZpcnR1YWxseSBiZWNhdXNlIHdlIG5lZWQgaXQgdG8gcmVuZGVyIGFuZCByZWZsZWN0IHRoZSBjZWxsIHNpemUuXG5cbiAgICAgICAgICAgICAgV2UgZmlyc3QgZXh0cmFjdCB0aGUgYWN0dWFsIHJhbmdlcyBmb3IgZWFjaCBzZWN0aW9uIGFuZCB1cGRhdGUgdGhlIGBDZGtUYWJsZWAgd2l0aCB0aGUgREFUQSByb3cgcmFuZ2UuXG4gICAgICAgICAgICAgIFdlIHRoZW4gd2FpdCBmb3IgdGhlIHJvd3MgdG8gcmVuZGVyLCB3aGljaCBpcyB0aGUgdGltZSBmb3IgdXMgdG8gYWxzbyBcInJlbmRlclwiIEhlYWRlci9Gb290ZXIgcm93cy4uLlxuICAgICAgICAgICAgICBXZSBkb24ndCBcInJlbmRlclwiIHRoZW0gcGVyLXNlLCB0aGV5IGFyZSBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBqdXN0IHNob3cvaGlkZSB0aGVtIGJhc2VkIG9uIHRoZSByYW5nZSBhbmQgc3RhdGUgKHN0aWNreSkuXG4gICAgICAgICAgICAgIFRoaXMgaXMgaW1wb3J0YW50LCBoaWRpbmcgd2lsbCBjYXVzZSB0aGUgdG90YWwgaGVpZ2h0IG9mIHRoZSBzY3JvbGwgY29udGFpbmVyIHRvIHNocmluayB0byB0aGUgc2l6ZSBpdCBzaG91bGQgYmUuXG4gICAgICAgICAgICAgIFdlIGRlZmVyIHRoaXMgb3BlcmF0aW9uIHRvIHJ1biBBRlRFUiB0aGUgcm93cyBhcmUgcmVuZGVyZWQgKG5vdCBpbW1lZGlhdGVseSkgYmVjYXVzZSBhbiBpbW1lZGlhdGUgY2hhbmdlIHdpbGwgdHJpZ2dlclxuICAgICAgICAgICAgICBhIGNoYW5nZSBpbiB0aGUgc2Nyb2xsIGNvbnRhaW5lciBzaXplIHJlc3VsdGluZyBpbiBhIHNjcm9sbCBldmVudCB0aGF0IHdpbGwgYnJpbmcgdXMgYmFjayBoZXJlIGJ1dCB0aGlzIHRpbWUgd2l0aFxuICAgICAgICAgICAgICBhIGhlaWdodCB0aGF0IGRvZXMgbm90IGZpdCB0aGUgcmFuZ2UuIEltbWVkaWF0ZSBjaGFuZ2UgcmVtb3ZlcyByb3dzIChIZWFkZXIvRm9vdGVyKSBiZWZvcmUgdGhlIG5ldyByYW5nZSBpcyBhcHBsaWVkLlxuICAgICAgICAgICAgICBPbmx5IGFmdGVyIHRoZSByb3dzIGFyZSByZW5kZXJlZCB3ZSBjYW4gc2hvdy9oaWRlIHRoZSBIZWFkZXIvRm9vdGVyIHJvd3MuXG4gICAgICAgICAgKi9cblxuICAgICAgICAgIC8vIEV4dHJhY3RpbmcgYWN0dWFsIHJhbmdlcyBmb3IgZWFjaCBzZWN0aW9uLlxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gc3BsaXRSYW5nZShyYW5nZSwgdGhpcy5tZXRhUm93c1swXSwgZHMubGVuZ3RoKTtcbiAgICAgICAgICBjb25zdCBbIGhlYWRlciwgZGF0YSwgZm9vdGVyIF0gPSB0aGlzLl9yZW5kZXJlZFJhbmdlcztcblxuICAgICAgICAgIHRoaXMuY2RrVGFibGUub25SZW5kZXJSb3dzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFdlIHVwZGF0ZSB0aGUgaGVhZGVyIERPTSBlbGVtZW50cyBpbiByZXZlcnNlLCBza2lwcGluZyB0aGUgbGFzdCAoZmlyc3Qgd2hlbiByZXZlcnNlZCkgRE9NIGVsZW1lbnQuXG4gICAgICAgICAgICAvLyBUaGUgc2tpcHBlZCBlbGVtZW50IGlzIHRoZSB0YWJsZSdzIGhlYWRlciByb3cgdGhhdCBtdXN0IGtlZXAgdHJhY2sgb2YgdGhlIGxheW91dCBmb3IgaW50ZXJuYWwgc2l6ZSBjYWxjdWxhdGlvbiAoZS5nLiBncm91cCBoZWFkZXIgcm93cykuXG4gICAgICAgICAgICAvLyBBbiBoaWRkZW4gcm93IGlzIG9uZSB0aGF0IGlzIG91dCBvZiByYW5nZSBBTkQgbm90IHN0aWNreVxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZGVyTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCBodG1sUm93cyA9IHRoaXMuaGVhZGVyLnJvd3M7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkUm93cyA9IHRoaXMuaGVhZGVyLnJlbmRlcmVkO1xuICAgICAgICAgICAgICBjb25zdCBzdGlja3lSb3dzID0gdGhpcy5oZWFkZXIuc3RpY2t5O1xuICAgICAgICAgICAgICBsZXQgcm93SW5kZXggPSAwO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxlbiA9IHRoaXMuaGVhZGVyLnN0aWNreS5sZW5ndGggLSAxOyByb3dJbmRleCA8IGxlbjsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgICAgIC8vIGFzc2lnbiByZW5kZXJlZCBzdGF0ZSArIGlmIG5vdCByZW5kZXJlZCBhbmQgbm90IHN0aWNreSwgc2V0IGRpc3BsYXkgdG8gXCJub25lXCJcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uc3R5bGUuZGlzcGxheSA9ICEocmVuZGVyZWRSb3dzW3Jvd0luZGV4XSA9IHJvd0luZGV4ID49IGhlYWRlci5zdGFydCkgJiYgIXN0aWNreVJvd3Nbcm93SW5kZXhdXG4gICAgICAgICAgICAgICAgICA/ICdub25lJ1xuICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gSGVyZSB3ZSB1cGRhdGUgdGhlIG1haW4gaGVhZGVyIHJvdywgd2hlbiB3ZSBuZWVkIHRvIGhpZGUgaXQgd2UgYXBwbHkgYSBjbGFzcyB0aGF0IHdpbGwgaGlkZSBpdCB2aXJ0dWFsbHksIGkuZS4gbm90IHNob3dpbmcgYnV0IGtlZXBpbmcgaW50ZXJuYWwgbGF5b3V0LlxuICAgICAgICAgICAgICBpZiAoIShyZW5kZXJlZFJvd3Nbcm93SW5kZXhdID0gcm93SW5kZXggPj0gaGVhZGVyLnN0YXJ0KSAmJiAhc3RpY2t5Um93c1tyb3dJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLXJvdy12aXN1YWxseS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYmxlLnNob3dIZWFkZXIgJiYgaHRtbFJvd3Nbcm93SW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgaHRtbFJvd3Nbcm93SW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ3BibC1uZ3JpZC1yb3ctdmlzdWFsbHktaGlkZGVuJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9vdGVyTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCBodG1sUm93cyA9IHRoaXMuZm9vdGVyLnJvd3M7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkUm93cyA9IHRoaXMuZm9vdGVyLnJlbmRlcmVkO1xuICAgICAgICAgICAgICBjb25zdCBzdGlja3lSb3dzID0gdGhpcy5mb290ZXIuc3RpY2t5O1xuICAgICAgICAgICAgICBsZXQgcm93SW5kZXggPSAwO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxlbiA9IHRoaXMuZm9vdGVyLnN0aWNreS5sZW5ndGg7IHJvd0luZGV4IDwgbGVuOyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzaWduIHJlbmRlcmVkIHN0YXRlICsgaWYgbm90IHJlbmRlcmVkIGFuZCBub3Qgc3RpY2t5LCBzZXQgZGlzcGxheSB0byBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5zdHlsZS5kaXNwbGF5ID0gIShyZW5kZXJlZFJvd3Nbcm93SW5kZXhdID0gcm93SW5kZXggPCBmb290ZXIuZW5kKSAmJiAhc3RpY2t5Um93c1tyb3dJbmRleF1cbiAgICAgICAgICAgICAgICAgID8gJ25vbmUnXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuY2RrVGFibGUudmlld0NoYW5nZS5uZXh0KGRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgLy8gYWRkIG1ldGEgcm93cyB0byB0aGUgdG90YWwgcm93IGNvdW50LlxuICAgICAgdGhpcy5kYXRhU3RyZWFtID0gZHMub25SZW5kZXJEYXRhQ2hhbmdpbmdcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgICBtYXAoICh7ZGF0YX0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldGFSb3dzID0gdGhpcy5tZXRhUm93cyA9IFsgdGhpcy5oZWFkZXIucm93cy5sZW5ndGgsIHRoaXMuZm9vdGVyLnJvd3MubGVuZ3RoIF07XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KCBkYXRhLmxlbmd0aCArIG1ldGFSb3dzWzBdICsgbWV0YVJvd3NbMV0gKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcblxuICAgICAgZHMub25SZW5kZXJlZERhdGFDaGFuZ2VkXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICAgICAgbWFwKCAoKSA9PiBkcy5sZW5ndGggKSxcbiAgICAgICAgICBzdGFydFdpdGgoMCksXG4gICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICBmaWx0ZXIoIChbcHJldiwgY3Vycl0pID0+IHByZXYgIT09IGN1cnIgKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCAoW3ByZXYsIGN1cnJdKSA9PiB7XG4gICAgICAgICAgdGhpcy5uZ1pvbmUub25TdGFibGUucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoICgpID0+IHRoaXMudmlld3BvcnQub25Tb3VyY2VMZW5ndGhDaGFuZ2UocHJldiwgY3VycikgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMudmlld3BvcnQuYXR0YWNoKHRoaXMgYXMgYW55KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRldGFjaFZpZXcoKTogdm9pZCB7XG4gICAgdGhpcy5kcyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnZpZXdwb3J0LmRldGFjaCgpO1xuICB9XG59XG4iXX0=