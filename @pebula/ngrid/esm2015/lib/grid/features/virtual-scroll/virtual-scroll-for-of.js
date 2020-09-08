/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/features/virtual-scroll/virtual-scroll-for-of.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.ngZone = ngZone;
        this.destroyed = new Subject();
        this.renderedContentOffset = 0;
        /**
         * The length of meta rows [0] = header [1] = footer
         */
        this.metaRows = [0, 0];
        this.header = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
        this.footer = { rows: (/** @type {?} */ ([])), sticky: (/** @type {?} */ ([])), rendered: (/** @type {?} */ ([])) };
        this.grid = extApi.grid;
        this.cdkTable = extApi.cdkTable;
        this.viewport = extApi.grid.viewport;
        this.viewChange = this.cdkTable.viewChange;
        PblNgridPluginController.find(extApi.grid).events
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
        this.attachView(extApi.grid.ds);
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
                    and we need to extract the relevant range for DATA rows only and pass it on to the grid.
      
                    To make this work we need to extract Header/Footer rows based on the starting position of the range and handle them as well.
                    Because the grid will only handle the scrolling of DATA rows we need to update HEADER/FOOTER rows to show/hide based on the range.
      
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
                    // The skipped element is the grid's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
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
                        else if (this.grid.showHeader && htmlRows[rowIndex]) {
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
    PblVirtualScrollForOf.prototype.grid;
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
    PblVirtualScrollForOf.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZm9yLW9mLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBTyxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3RHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O01BRXpELGlCQUFpQixHQUFHLElBQUk7Ozs7OztBQUU5QixTQUFTLFdBQVcsQ0FBQyxDQUFvQixFQUFFLENBQW9CLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDO0FBQUEsQ0FBQzs7OztBQUU5Riw0Q0FJQzs7O0lBSEMsOENBQThCOztJQUM5QiwyQ0FBMkI7O0lBQzNCLDhDQUE4Qjs7Ozs7QUFHaEMsTUFBTSxPQUFPLHFCQUFxQjs7Ozs7SUFtQ2hDLFlBQVksTUFBK0IsRUFBVSxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQTFCM0QsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFhaEMsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDOzs7O1FBSTFCLGFBQVEsR0FBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENB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SSxFQUFFLENBQzFDO2lCQUNBLFNBQVM7Ozs7WUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7Z0JBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN2RyxDQUFDLEVBQUMsQ0FBQztZQUVMLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDOzs7OztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0NBQ0Y7OztJQXRUQywyQ0FBa0M7O0lBRWxDLDJDQUErQzs7Ozs7SUFNL0MsMENBQXdDOzs7OztJQUN4QyxtQ0FBNkI7Ozs7O0lBWTdCLHNEQUFrQzs7Ozs7O0lBRWxDLGdEQUEyRDs7Ozs7O0lBRTNELHlDQUE0Qzs7Ozs7SUFFNUMsdUNBQW1HOzs7OztJQUNuRyx1Q0FBbUc7Ozs7O0lBRW5HLHFDQUFtQzs7Ozs7SUFDbkMseUNBQTBDOzs7OztJQUMxQyx5Q0FBdUQ7Ozs7O0lBRVYsdUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgZnJvbUV2ZW50LCByYWNlLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHBhaXJ3aXNlLCB0YWtlLCB0YXAsIHRha2VVbnRpbCwgbWFwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5nWm9uZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblZpZXdlciwgTGlzdFJhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcblxuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBQYmxEYXRhU291cmNlIH0gZnJvbSAnLi4vLi4vLi4vZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgUGJsQ2RrVGFibGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wYmwtY2RrLXRhYmxlL3BibC1jZGstdGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudCB9IGZyb20gJy4vdmlydHVhbC1zY3JvbGwtdmlld3BvcnQuY29tcG9uZW50JztcbmltcG9ydCB7IHNwbGl0UmFuZ2UsIHVwZGF0ZVN0aWNreVJvd3MsIG1lYXN1cmVSYW5nZVNpemUgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IE1ldGFSb3dTdGlja3lTY3JvbGwgfSBmcm9tICcuL21ldGEtcm93LXN0aWNreS1zY3JvbGwnO1xuXG5jb25zdCBGSVhFRF9IRUFERVJfTU9ERSA9IHRydWU7XG5cbmZ1bmN0aW9uIHNvcnRCeUluZGV4KGE6IHsgaW5kZXg6IG51bWJlciB9LCBiOiB7IGluZGV4OiBudW1iZXIgfSkgeyByZXR1cm4gYS5pbmRleCAtIGIuaW5kZXggfTtcblxuZXhwb3J0IGludGVyZmFjZSBOZ2VWaXJ0dWFsVGFibGVSb3dJbmZvIHtcbiAgcmVhZG9ubHkgaGVhZGVyTGVuZ3RoOiBudW1iZXI7XG4gIHJlYWRvbmx5IHJvd0xlbmd0aDogbnVtYmVyO1xuICByZWFkb25seSBmb290ZXJMZW5ndGg6IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFBibFZpcnR1YWxTY3JvbGxGb3JPZjxUPiBpbXBsZW1lbnRzIENvbGxlY3Rpb25WaWV3ZXIsIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8ge1xuICB2aWV3Q2hhbmdlOiBPYnNlcnZhYmxlPExpc3RSYW5nZT47XG5cbiAgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxUW10gfCBSZWFkb25seUFycmF5PFQ+PjtcblxuICBnZXQgaGVhZGVyTGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmhlYWRlci5yb3dzLmxlbmd0aCAgfVxuICBnZXQgcm93TGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLnZjUmVmcy5kYXRhLmxlbmd0aCAgfVxuICBnZXQgZm9vdGVyTGVuZ3RoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLmZvb3Rlci5yb3dzLmxlbmd0aCAgfVxuXG4gIHByaXZhdGUgZGVzdHJveWVkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBkczogUGJsRGF0YVNvdXJjZTxUPjtcblxuICBwcml2YXRlIGdldCB2Y1JlZnMoKTogUmVjb3JkPCdoZWFkZXInIHwgJ2RhdGEnIHwgJ2Zvb3RlcicsIFZpZXdDb250YWluZXJSZWY+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHtcbiAgICAgIGhlYWRlcjogdGhpcy5jZGtUYWJsZS5faGVhZGVyUm93T3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgICBkYXRhOiB0aGlzLmNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgIGZvb3RlcjogdGhpcy5jZGtUYWJsZS5fZm9vdGVyUm93T3V0bGV0LnZpZXdDb250YWluZXIsXG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3ZjUmVmcycsIHsgdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIHJlbmRlcmVkQ29udGVudE9mZnNldCA9IDA7XG4gIC8qKiBBIHR1cGxlIGNvbnRhaW5pbmcgdGhlIGxhc3Qga25vd24gcmFuZ2VzIFtoZWFkZXIsIGRhdGEsIGZvb3Rlcl0gKi9cbiAgcHJpdmF0ZSBfcmVuZGVyZWRSYW5nZXM6IFtMaXN0UmFuZ2UsIExpc3RSYW5nZSwgTGlzdFJhbmdlXTtcbiAgLyoqIFRoZSBsZW5ndGggb2YgbWV0YSByb3dzIFswXSA9IGhlYWRlciBbMV0gPSBmb290ZXIgKi9cbiAgcHJpdmF0ZSBtZXRhUm93czogW251bWJlciwgbnVtYmVyXSA9IFswLCAwXTtcblxuICBwcml2YXRlIGhlYWRlciA9IHsgcm93czogW10gYXMgSFRNTEVsZW1lbnRbXSwgc3RpY2t5OiBbXSBhcyBib29sZWFuW10sIHJlbmRlcmVkOiBbXSBhcyBib29sZWFuW10gfTtcbiAgcHJpdmF0ZSBmb290ZXIgPSB7IHJvd3M6IFtdIGFzIEhUTUxFbGVtZW50W10sIHN0aWNreTogW10gYXMgYm9vbGVhbltdLCByZW5kZXJlZDogW10gYXMgYm9vbGVhbltdIH07XG5cbiAgcHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBjZGtUYWJsZTogUGJsQ2RrVGFibGVDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgdmlld3BvcnQ6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy5ncmlkID0gZXh0QXBpLmdyaWQ7XG4gICAgdGhpcy5jZGtUYWJsZSA9IGV4dEFwaS5jZGtUYWJsZTtcbiAgICB0aGlzLnZpZXdwb3J0ID0gZXh0QXBpLmdyaWQudmlld3BvcnQ7XG5cbiAgICB0aGlzLnZpZXdDaGFuZ2UgPSB0aGlzLmNka1RhYmxlLnZpZXdDaGFuZ2U7XG5cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChleHRBcGkuZ3JpZCkuZXZlbnRzXG4gICAgICAucGlwZSggdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSApXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25EYXRhU291cmNlJykge1xuICAgICAgICAgIHRoaXMuZGV0YWNoVmlldygpO1xuICAgICAgICAgIHRoaXMuYXR0YWNoVmlldyhldmVudC5jdXJyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5hdHRhY2hWaWV3KGV4dEFwaS5ncmlkLmRzKTtcblxuICAgIGV4dEFwaS5tZXRhUm93U2VydmljZS5zeW5jXG4gICAgICAucGlwZSggdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSApXG4gICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBleHRBcGkubWV0YVJvd1NlcnZpY2UuaGVhZGVyLnJvdy5jb25jYXQoZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmhlYWRlci5zdGlja3kpLnNvcnQoc29ydEJ5SW5kZXgpO1xuICAgICAgICBjb25zdCBmb290ZXJzID0gZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmZvb3Rlci5yb3cuY29uY2F0KGV4dEFwaS5tZXRhUm93U2VydmljZS5mb290ZXIuc3RpY2t5KS5zb3J0KHNvcnRCeUluZGV4KTtcblxuICAgICAgICB0aGlzLmhlYWRlci5yb3dzID0gaGVhZGVycy5tYXAoIGggPT4gaC5lbCApO1xuICAgICAgICB0aGlzLmhlYWRlci5zdGlja3kgPSBoZWFkZXJzLm1hcCggaCA9PiBoLnJvd0RlZi50eXBlID09PSAnc3RpY2t5JyApO1xuICAgICAgICB0aGlzLmZvb3Rlci5yb3dzID0gZm9vdGVycy5tYXAoIGggPT4gaC5lbCApO1xuICAgICAgICB0aGlzLmZvb3Rlci5zdGlja3kgPSBmb290ZXJzLm1hcCggaCA9PiBoLnJvd0RlZi50eXBlID09PSAnc3RpY2t5JyApO1xuXG4gICAgICAgIHVwZGF0ZVN0aWNreVJvd3ModGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQsIHRoaXMuaGVhZGVyLnJvd3MsIHRoaXMuaGVhZGVyLnN0aWNreSwgJ3RvcCcpO1xuICAgICAgICB1cGRhdGVTdGlja3lSb3dzKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0LCB0aGlzLmZvb3Rlci5yb3dzLCB0aGlzLmZvb3Rlci5zdGlja3ksICdib3R0b20nKTtcbiAgICAgIH0pO1xuXG4gICAgaWYgKEZJWEVEX0hFQURFUl9NT0RFKSB7XG4gICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgIGNvbnN0IHZpZXdQb3J0ID0gdGhpcy52aWV3cG9ydC5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBtZXRhUm93U3RpY2t5U2Nyb2xsID0gbmV3IE1ldGFSb3dTdGlja3lTY3JvbGwodGhpcy52aWV3cG9ydCwgdmlld1BvcnQsIHsgaGVhZGVyOiB0aGlzLmhlYWRlciwgZm9vdGVyOiB0aGlzLmZvb3RlciB9KTtcbiAgICAgIGxldCBzY3JvbGxQb3NpdGlvbjogbnVtYmVyO1xuXG4gICAgICBjb25zdCB3aGVlbExpc3RlbiA9ICgpID0+IHZpZXdQb3J0LmFkZEV2ZW50TGlzdGVuZXIoJ3doZWVsJywgaGFuZGxlciwgdHJ1ZSk7XG4gICAgICBjb25zdCB3aGVlbFVuTGlzdGVuID0gKCkgPT4gdmlld1BvcnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBoYW5kbGVyLCB0cnVlKTtcbiAgICAgIGNvbnN0IHVwZGF0ZVNjcm9sbFBvc2l0aW9uID0gKCkgPT4gc2Nyb2xsUG9zaXRpb24gPSAodGhpcy52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCkpIC8gKHRoaXMudmlld3BvcnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy52aWV3cG9ydC5nZXRWaWV3cG9ydFNpemUoKSk7XG5cbiAgICAgIGNvbnN0IGhhbmRsZXIgPSAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRlbHRhWSkge1xuICAgICAgICAgIGlmICggKHNjcm9sbFBvc2l0aW9uID09PSAxICYmIGV2ZW50LmRlbHRhWSA+IDApIHx8IChvZmZzZXQgPT09IDAgJiYgZXZlbnQuZGVsdGFZIDwgMCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IG5ld09mZnNldCA9IG9mZnNldCArIGV2ZW50LmRlbHRhWTtcbiAgICAgICAgICBuZXdPZmZzZXQgPSBNYXRoLm1pbih0aGlzLnZpZXdwb3J0LnNjcm9sbEhlaWdodCwgTWF0aC5tYXgoMCwgbmV3T2Zmc2V0KSk7XG5cbiAgICAgICAgICBpZiAobmV3T2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IG5ld09mZnNldDtcbiAgICAgICAgICAgIGlmIChtZXRhUm93U3RpY2t5U2Nyb2xsLmNhbk1vdmUoKSAmJiBtZXRhUm93U3RpY2t5U2Nyb2xsLm1vdmUoZXZlbnQuZGVsdGFZLCB2aWV3UG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsRW5kJCA9IHRoaXMudmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUoZmlsdGVyKCBzID0+ICFzICkpO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHJlc3RvcmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbWV0YVJvd1N0aWNreVNjcm9sbC5yZXN0b3JlKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB1cGRhdGVTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGxldCByZW1vdmVkRXZlbnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKHRoaXMudmlld3BvcnQud2hlZWxNb2RlICE9PSAnYmxvY2tpbmcnKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2hlZWxNb2RlID0gdGhpcy52aWV3cG9ydC53aGVlbE1vZGU7XG4gICAgICAgICAgICAgICAgaWYgKHdoZWVsTW9kZSA9PT0gJ3Bhc3NpdmUnKSB7XG4gICAgICAgICAgICAgICAgICB3aGVlbFVuTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbGluZy5waXBlKGRlYm91bmNlVGltZSgxNTApLCBmaWx0ZXIoIHMgPT4gIXMgKSwgdGFrZSgxKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB3aGVlbExpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxGcmFtZVJhdGVcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHNjcm9sbEVuZCQucGlwZSh0YWtlKDEpKSkpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgICAgZnJhbWVSYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVtb3ZlZEV2ZW50ICYmIGZyYW1lUmF0ZSA8IHdoZWVsTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbFVuTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWRFdmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RXaGVlbCQgPSBmcm9tRXZlbnQodmlld1BvcnQsICd3aGVlbCcpLnBpcGUoZGVib3VuY2VUaW1lKDUwKSwgdGFrZSgxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWNlKGxhc3RXaGVlbCQsIHRpbWVyKDUxKSBhcyBhbnkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbW92ZWRFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlZWxMaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSByZXN0b3JlIGJhY2sgYWZ0ZXIgMTAwIG1zLCBmb3Igc29tZSByZWFzb24sIGlmIGl0J3MgaW1tZWRpYXRlLCB3ZSBoaXQgYSBjeWNsZSBvZiB3aGVlbC9zY3JvbGwvbm8tc2Nyb2xsIGFuZCBub3Qgd2hlZWwvc2Nyb2xsL1dBSUlJSUlUL25vLXNjcm9sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IG1heWJlIHdlIGNhbiBtZWFzdXJlIHRpbWUgYmV0d2VlbiBuby1zY3JvbGxpbmcgYW5kIHdoZWVsIHRvIGZpbmQgdGhpcyBNUyB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgT1IsIHJlZ2lzdGVyIGEgdGVtcCBgd2hlZWxgIGxpc3RlbmVyIHRoYXQgd2lsbCBkZXRlY3Qgd2hlZWwgZW5kIGFuZCByZS1yZWdpc3RlciB0aGUgb3JpZ2luYWwgaGFuZGxlci5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjcm9sbEVuZCQucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUocmVzdG9yZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxUb09mZnNldChvZmZzZXQpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB1cGRhdGVTY3JvbGxQb3NpdGlvbigpO1xuICAgICAgd2hlZWxMaXN0ZW4oKTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5zY3JvbGxpbmcuc3Vic2NyaWJlKCBpc1Njcm9sbGluZyA9PiB7XG4gICAgICAgIGlmICghaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICBvZmZzZXQgPSB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3cG9ydC5vZmZzZXRDaGFuZ2VcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoIG9mZnNldCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCAhPT0gb2Zmc2V0KSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgICAgdXBkYXRlU3RpY2t5Um93cyhvZmZzZXQsIHRoaXMuaGVhZGVyLnJvd3MsIHRoaXMuaGVhZGVyLnN0aWNreSwgJ3RvcCcpO1xuICAgICAgICAgIHVwZGF0ZVN0aWNreVJvd3Mob2Zmc2V0LCB0aGlzLmZvb3Rlci5yb3dzLCB0aGlzLmZvb3Rlci5zdGlja3ksICdib3R0b20nKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTWVhc3VyZXMgdGhlIGNvbWJpbmVkIHNpemUgKHdpZHRoIGZvciBob3Jpem9udGFsIG9yaWVudGF0aW9uLCBoZWlnaHQgZm9yIHZlcnRpY2FsKSBvZiBhbGwgaXRlbXNcbiAgICogaW4gdGhlIHNwZWNpZmllZCByYW5nZS4gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSByYW5nZSBpbmNsdWRlcyBpdGVtcyB0aGF0IGFyZSBub3QgY3VycmVudGx5XG4gICAqIHJlbmRlcmVkLlxuICAgKi9cbiAgbWVhc3VyZVJhbmdlU2l6ZShyYW5nZTogTGlzdFJhbmdlLCBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyk6IG51bWJlciB7XG4gICAgaWYgKHJhbmdlLnN0YXJ0ID49IHJhbmdlLmVuZCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3QgcmVuZGVyZWRSYW5nZXMgPSB0aGlzLl9yZW5kZXJlZFJhbmdlcztcbiAgICBjb25zdCByYW5nZXMgPSBzcGxpdFJhbmdlKHJhbmdlLCB0aGlzLm1ldGFSb3dzWzBdLCB0aGlzLmRzLmxlbmd0aCk7XG4gICAgY29uc3Qgc3RpY2t5U3RhdGVzID0gWyB0aGlzLmhlYWRlci5zdGlja3ksIFtdLCB0aGlzLmZvb3Rlci5zdGlja3kgXTtcblxuICAgIGNvbnN0IHZjUmVmcyA9IFt0aGlzLnZjUmVmcy5oZWFkZXIsIHRoaXMudmNSZWZzLmRhdGEsIHRoaXMudmNSZWZzLmZvb3Rlcl07XG4gICAgY29uc3QgdmNSZWZTaXplUmVkdWNlciA9ICh0b3RhbDogbnVtYmVyLCB2Y1JlZjogVmlld0NvbnRhaW5lclJlZiwgaW5kZXg6IG51bWJlcik6IG51bWJlciA9PiB7XG4gICAgICByZXR1cm4gdG90YWwgKyBtZWFzdXJlUmFuZ2VTaXplKHZjUmVmLCByYW5nZXNbaW5kZXhdLCByZW5kZXJlZFJhbmdlc1tpbmRleF0sIG9yaWVudGF0aW9uLCBzdGlja3lTdGF0ZXNbaW5kZXhdKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHZjUmVmcy5yZWR1Y2UodmNSZWZTaXplUmVkdWNlciwgMCk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGV0YWNoVmlldygpO1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hWaWV3KGRzOiBQYmxEYXRhU291cmNlPFQ+KTogdm9pZCB7XG4gICAgaWYgKGRzKSB7XG4gICAgICB0aGlzLmRzID0gZHM7XG4gICAgICB0aGlzLl9yZW5kZXJlZFJhbmdlcyA9IFsgeyBzdGFydDogMCwgZW5kOiAwIH0sIHRoaXMuY2RrVGFibGUudmlld0NoYW5nZS52YWx1ZSwgeyBzdGFydDogMCwgZW5kOiAwIH0gXTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5yZW5kZXJlZFJhbmdlU3RyZWFtXG4gICAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgICAgLnN1YnNjcmliZSggcmFuZ2UgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmhlYWRlckxlbmd0aCArIHRoaXMuZm9vdGVyTGVuZ3RoID09PSAwKSB7IC8vIGlmIG5vIHJvdy9zdGlja3kgbWV0YSByb3dzLCBtb3ZlIG9uLi4uXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlZFJhbmdlcyA9IFsgeyBzdGFydDogMCwgZW5kOiAwIH0sIHJhbmdlLCB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSBdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2RrVGFibGUudmlld0NoYW5nZS5uZXh0KHJhbmdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKiAgV0hBVCBJUyBHT0lORyBPTiBIRVJFPyAqL1xuXG4gICAgICAgICAgLyogIFRhYmxlIHJvd3MgYXJlIHNwbGl0IGludG8gMyBzZWN0aW9uczogSGVhZGVyLCBEYXRhLCBGb290ZXIuXG4gICAgICAgICAgICAgIEluIHRoZSB2aXJ0dWFsIHBsYXlncm91bmQgb25seSBEQVRBIHJvd3MgYXJlIGR5bmFtaWMuIEhlYWRlciAmIEZvb3RlciByb3dzIGFyZSBmaXhlZC5cblxuICAgICAgICAgICAgICBUaGUgYENka1RhYmxlYCB3b3JrcyB0aGUgc2FtZSwgYWxzbyBoYXZlIHRoZSBzYW1lIHNlY3Rpb25zIHdpdGggYSBzdHJlYW0gQVBJIGZvciBEQVRBIHJvd3Mgb25seS5cbiAgICAgICAgICAgICAgYENka1RhYmxlLnZpZXdDaGFuZ2UubmV4dChSQU5HRSlgIHdpbGwgZW1pdCB0byB0aGUgZGF0YXNvdXJjZSB3aGljaCB3aWxsIHJlc3VsdCBpbiBhIG5ldyBkYXRhIHNlY3Rpb24gZnJvbSB0aGUgZGF0YXNvdXJjZS5cblxuICAgICAgICAgICAgICBgQ2RrVGFibGVgIGFsb25lIGRvZXMgbm90IHN1cHBvcnQgdmlydHVhbCBzY3JvbGxpbmcsIHRvIGFjaGlldmUgaXQgd2UgdXNlIGEgdmlydHVhbCBzY3JvbGwgdmlld3BvcnQgd2hpY2ggd3JhcHMgdGhlIGVudGlyZSBgQ2RrVGFibGVgLlxuICAgICAgICAgICAgICBUaGlzIG1lYW5zIHRoYXQgQUxMIHNlY3Rpb25zIGFyZSB3cmFwcGVkIChoZW5jZSBzY3JvbGxlZCBvdmVyKSBidXQgb25seSBEQVRBIHJvd3MgYXJlIG1vdmluZy4uLlxuXG4gICAgICAgICAgICAgIEVhY2ggZW1pc3Npb24gb2YgYExpc3RSYW5nZWAgaW4gYHJlbmRlcmVkUmFuZ2VTdHJlYW1gIGlzIGJhc2VkIG9uIHNpemUgY2FsY3VsYXRpb24gb2YgQUxMIHNlY3Rpb25zIChzZWUgYG1lYXN1cmVSYW5nZVNpemVgIGFib3ZlKVxuICAgICAgICAgICAgICBhbmQgd2UgbmVlZCB0byBleHRyYWN0IHRoZSByZWxldmFudCByYW5nZSBmb3IgREFUQSByb3dzIG9ubHkgYW5kIHBhc3MgaXQgb24gdG8gdGhlIGdyaWQuXG5cbiAgICAgICAgICAgICAgVG8gbWFrZSB0aGlzIHdvcmsgd2UgbmVlZCB0byBleHRyYWN0IEhlYWRlci9Gb290ZXIgcm93cyBiYXNlZCBvbiB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHJhbmdlIGFuZCBoYW5kbGUgdGhlbSBhcyB3ZWxsLlxuICAgICAgICAgICAgICBCZWNhdXNlIHRoZSBncmlkIHdpbGwgb25seSBoYW5kbGUgdGhlIHNjcm9sbGluZyBvZiBEQVRBIHJvd3Mgd2UgbmVlZCB0byB1cGRhdGUgSEVBREVSL0ZPT1RFUiByb3dzIHRvIHNob3cvaGlkZSBiYXNlZCBvbiB0aGUgcmFuZ2UuXG5cbiAgICAgICAgICAgICAgQmVjYXVzZSBIZWFkZXIvRm9vdGVyIHJvd3MgYXJlIGZpeGVkIHdlIGRvIHRoaXMgYnkgaGlkaW5nIHRoZW0gd2l0aCBgZGlzcGxheTogbm9uZWAsIHVubGVzcyB0aGV5IGFyZSBzdGlja3kgLyBwaW5uZWQuXG4gICAgICAgICAgICAgIE9uZSBleGNlcHRpb24gaXMgdGhlIG1haW4gaGVhZGVyIHJvdywgd2hpY2ggd2UgaGlkZSB2aXJ0dWFsbHkgYmVjYXVzZSB3ZSBuZWVkIGl0IHRvIHJlbmRlciBhbmQgcmVmbGVjdCB0aGUgY2VsbCBzaXplLlxuXG4gICAgICAgICAgICAgIFdlIGZpcnN0IGV4dHJhY3QgdGhlIGFjdHVhbCByYW5nZXMgZm9yIGVhY2ggc2VjdGlvbiBhbmQgdXBkYXRlIHRoZSBgQ2RrVGFibGVgIHdpdGggdGhlIERBVEEgcm93IHJhbmdlLlxuICAgICAgICAgICAgICBXZSB0aGVuIHdhaXQgZm9yIHRoZSByb3dzIHRvIHJlbmRlciwgd2hpY2ggaXMgdGhlIHRpbWUgZm9yIHVzIHRvIGFsc28gXCJyZW5kZXJcIiBIZWFkZXIvRm9vdGVyIHJvd3MuLi5cbiAgICAgICAgICAgICAgV2UgZG9uJ3QgXCJyZW5kZXJcIiB0aGVtIHBlci1zZSwgdGhleSBhcmUgYWxyZWFkeSByZW5kZXJlZCwgd2UganVzdCBzaG93L2hpZGUgdGhlbSBiYXNlZCBvbiB0aGUgcmFuZ2UgYW5kIHN0YXRlIChzdGlja3kpLlxuICAgICAgICAgICAgICBUaGlzIGlzIGltcG9ydGFudCwgaGlkaW5nIHdpbGwgY2F1c2UgdGhlIHRvdGFsIGhlaWdodCBvZiB0aGUgc2Nyb2xsIGNvbnRhaW5lciB0byBzaHJpbmsgdG8gdGhlIHNpemUgaXQgc2hvdWxkIGJlLlxuICAgICAgICAgICAgICBXZSBkZWZlciB0aGlzIG9wZXJhdGlvbiB0byBydW4gQUZURVIgdGhlIHJvd3MgYXJlIHJlbmRlcmVkIChub3QgaW1tZWRpYXRlbHkpIGJlY2F1c2UgYW4gaW1tZWRpYXRlIGNoYW5nZSB3aWxsIHRyaWdnZXJcbiAgICAgICAgICAgICAgYSBjaGFuZ2UgaW4gdGhlIHNjcm9sbCBjb250YWluZXIgc2l6ZSByZXN1bHRpbmcgaW4gYSBzY3JvbGwgZXZlbnQgdGhhdCB3aWxsIGJyaW5nIHVzIGJhY2sgaGVyZSBidXQgdGhpcyB0aW1lIHdpdGhcbiAgICAgICAgICAgICAgYSBoZWlnaHQgdGhhdCBkb2VzIG5vdCBmaXQgdGhlIHJhbmdlLiBJbW1lZGlhdGUgY2hhbmdlIHJlbW92ZXMgcm93cyAoSGVhZGVyL0Zvb3RlcikgYmVmb3JlIHRoZSBuZXcgcmFuZ2UgaXMgYXBwbGllZC5cbiAgICAgICAgICAgICAgT25seSBhZnRlciB0aGUgcm93cyBhcmUgcmVuZGVyZWQgd2UgY2FuIHNob3cvaGlkZSB0aGUgSGVhZGVyL0Zvb3RlciByb3dzLlxuICAgICAgICAgICovXG5cbiAgICAgICAgICAvLyBFeHRyYWN0aW5nIGFjdHVhbCByYW5nZXMgZm9yIGVhY2ggc2VjdGlvbi5cbiAgICAgICAgICB0aGlzLl9yZW5kZXJlZFJhbmdlcyA9IHNwbGl0UmFuZ2UocmFuZ2UsIHRoaXMubWV0YVJvd3NbMF0sIGRzLmxlbmd0aCk7XG4gICAgICAgICAgY29uc3QgWyBoZWFkZXIsIGRhdGEsIGZvb3RlciBdID0gdGhpcy5fcmVuZGVyZWRSYW5nZXM7XG5cbiAgICAgICAgICB0aGlzLmNka1RhYmxlLm9uUmVuZGVyUm93cy5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyBXZSB1cGRhdGUgdGhlIGhlYWRlciBET00gZWxlbWVudHMgaW4gcmV2ZXJzZSwgc2tpcHBpbmcgdGhlIGxhc3QgKGZpcnN0IHdoZW4gcmV2ZXJzZWQpIERPTSBlbGVtZW50LlxuICAgICAgICAgICAgLy8gVGhlIHNraXBwZWQgZWxlbWVudCBpcyB0aGUgZ3JpZCdzIGhlYWRlciByb3cgdGhhdCBtdXN0IGtlZXAgdHJhY2sgb2YgdGhlIGxheW91dCBmb3IgaW50ZXJuYWwgc2l6ZSBjYWxjdWxhdGlvbiAoZS5nLiBncm91cCBoZWFkZXIgcm93cykuXG4gICAgICAgICAgICAvLyBBbiBoaWRkZW4gcm93IGlzIG9uZSB0aGF0IGlzIG91dCBvZiByYW5nZSBBTkQgbm90IHN0aWNreVxuICAgICAgICAgICAgaWYgKHRoaXMuaGVhZGVyTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCBodG1sUm93cyA9IHRoaXMuaGVhZGVyLnJvd3M7XG4gICAgICAgICAgICAgIGNvbnN0IHJlbmRlcmVkUm93cyA9IHRoaXMuaGVhZGVyLnJlbmRlcmVkO1xuICAgICAgICAgICAgICBjb25zdCBzdGlja3lSb3dzID0gdGhpcy5oZWFkZXIuc3RpY2t5O1xuICAgICAgICAgICAgICBsZXQgcm93SW5kZXggPSAwO1xuICAgICAgICAgICAgICBmb3IgKGNvbnN0IGxlbiA9IHRoaXMuaGVhZGVyLnN0aWNreS5sZW5ndGggLSAxOyByb3dJbmRleCA8IGxlbjsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgICAgIC8vIGFzc2lnbiByZW5kZXJlZCBzdGF0ZSArIGlmIG5vdCByZW5kZXJlZCBhbmQgbm90IHN0aWNreSwgc2V0IGRpc3BsYXkgdG8gXCJub25lXCJcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uc3R5bGUuZGlzcGxheSA9ICEocmVuZGVyZWRSb3dzW3Jvd0luZGV4XSA9IHJvd0luZGV4ID49IGhlYWRlci5zdGFydCkgJiYgIXN0aWNreVJvd3Nbcm93SW5kZXhdXG4gICAgICAgICAgICAgICAgICA/ICdub25lJ1xuICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gSGVyZSB3ZSB1cGRhdGUgdGhlIG1haW4gaGVhZGVyIHJvdywgd2hlbiB3ZSBuZWVkIHRvIGhpZGUgaXQgd2UgYXBwbHkgYSBjbGFzcyB0aGF0IHdpbGwgaGlkZSBpdCB2aXJ0dWFsbHksIGkuZS4gbm90IHNob3dpbmcgYnV0IGtlZXBpbmcgaW50ZXJuYWwgbGF5b3V0LlxuICAgICAgICAgICAgICBpZiAoIShyZW5kZXJlZFJvd3Nbcm93SW5kZXhdID0gcm93SW5kZXggPj0gaGVhZGVyLnN0YXJ0KSAmJiAhc3RpY2t5Um93c1tyb3dJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uY2xhc3NMaXN0LmFkZCgncGJsLW5ncmlkLXJvdy12aXN1YWxseS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdyaWQuc2hvd0hlYWRlciAmJiBodG1sUm93c1tyb3dJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXJvdy12aXN1YWxseS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5mb290ZXJMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGh0bWxSb3dzID0gdGhpcy5mb290ZXIucm93cztcbiAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWRSb3dzID0gdGhpcy5mb290ZXIucmVuZGVyZWQ7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVJvd3MgPSB0aGlzLmZvb3Rlci5zdGlja3k7XG4gICAgICAgICAgICAgIGxldCByb3dJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgbGVuID0gdGhpcy5mb290ZXIuc3RpY2t5Lmxlbmd0aDsgcm93SW5kZXggPCBsZW47IHJvd0luZGV4KyspIHtcbiAgICAgICAgICAgICAgICAvLyBhc3NpZ24gcmVuZGVyZWQgc3RhdGUgKyBpZiBub3QgcmVuZGVyZWQgYW5kIG5vdCBzdGlja3ksIHNldCBkaXNwbGF5IHRvIFwibm9uZVwiXG4gICAgICAgICAgICAgICAgaHRtbFJvd3Nbcm93SW5kZXhdLnN0eWxlLmRpc3BsYXkgPSAhKHJlbmRlcmVkUm93c1tyb3dJbmRleF0gPSByb3dJbmRleCA8IGZvb3Rlci5lbmQpICYmICFzdGlja3lSb3dzW3Jvd0luZGV4XVxuICAgICAgICAgICAgICAgICAgPyAnbm9uZSdcbiAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLm5leHQoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBhZGQgbWV0YSByb3dzIHRvIHRoZSB0b3RhbCByb3cgY291bnQuXG4gICAgICB0aGlzLmRhdGFTdHJlYW0gPSBkcy5vblJlbmRlckRhdGFDaGFuZ2luZ1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIG1hcCggKHtkYXRhfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YVJvd3MgPSB0aGlzLm1ldGFSb3dzID0gWyB0aGlzLmhlYWRlci5yb3dzLmxlbmd0aCwgdGhpcy5mb290ZXIucm93cy5sZW5ndGggXTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoIGRhdGEubGVuZ3RoICsgbWV0YVJvd3NbMF0gKyBtZXRhUm93c1sxXSApO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICBkcy5vblJlbmRlcmVkRGF0YUNoYW5nZWRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgICBtYXAoICgpID0+IGRzLmxlbmd0aCApLFxuICAgICAgICAgIHN0YXJ0V2l0aCgwKSxcbiAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgIGZpbHRlciggKFtwcmV2LCBjdXJyXSkgPT4gcHJldiAhPT0gY3VyciApLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoIChbcHJldiwgY3Vycl0pID0+IHtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSggKCkgPT4gdGhpcy52aWV3cG9ydC5vblNvdXJjZUxlbmd0aENoYW5nZShwcmV2LCBjdXJyKSApO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5hdHRhY2godGhpcyBhcyBhbnkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLmRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmlld3BvcnQuZGV0YWNoKCk7XG4gIH1cbn1cbiJdfQ==