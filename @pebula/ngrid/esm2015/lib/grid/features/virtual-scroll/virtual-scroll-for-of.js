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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZm9yLW9mLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFPLFNBQVMsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPdEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFJdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUN6RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7TUFFekQsaUJBQWlCLEdBQUcsSUFBSTs7Ozs7O0FBRTlCLFNBQVMsV0FBVyxDQUFDLENBQW9CLEVBQUUsQ0FBb0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUM7QUFBQSxDQUFDOzs7O0FBRTlGLDRDQUlDOzs7SUFIQyw4Q0FBOEI7O0lBQzlCLDJDQUEyQjs7SUFDM0IsOENBQThCOzs7OztBQUdoQyxNQUFNLE9BQU8scUJBQXFCOzs7OztJQW1DaEMsWUFBWSxNQUErQixFQUFVLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBMUIzRCxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWFoQywwQkFBcUIsR0FBRyxDQUFDLENBQUM7Ozs7UUFJMUIsYUFBUSxHQUFxQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FB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LEVBQUUsQ0FDMUM7aUJBQ0EsU0FBUzs7OztZQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7OztnQkFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3ZHLENBQUMsRUFBQyxDQUFDO1lBRUwsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQztTQUNuQztJQUNILENBQUM7Ozs7O0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pCLENBQUM7Q0FDRjs7O0lBdFRDLDJDQUFrQzs7SUFFbEMsMkNBQStDOzs7OztJQU0vQywwQ0FBd0M7Ozs7O0lBQ3hDLG1DQUE2Qjs7Ozs7SUFZN0Isc0RBQWtDOzs7Ozs7SUFFbEMsZ0RBQTJEOzs7Ozs7SUFFM0QseUNBQTRDOzs7OztJQUU1Qyx1Q0FBbUc7Ozs7O0lBQ25HLHVDQUFtRzs7Ozs7SUFFbkcscUNBQW1DOzs7OztJQUNuQyx5Q0FBMEM7Ozs7O0lBQzFDLHlDQUF1RDs7Ozs7SUFFVix1Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBmcm9tRXZlbnQsIHJhY2UsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgcGFpcndpc2UsIHRha2UsIHRhcCwgdGFrZVVudGlsLCBtYXAsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmdab25lLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uVmlld2VyLCBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgc3BsaXRSYW5nZSwgdXBkYXRlU3RpY2t5Um93cywgbWVhc3VyZVJhbmdlU2l6ZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgTWV0YVJvd1N0aWNreVNjcm9sbCB9IGZyb20gJy4vbWV0YS1yb3ctc3RpY2t5LXNjcm9sbCc7XG5cbmNvbnN0IEZJWEVEX0hFQURFUl9NT0RFID0gdHJ1ZTtcblxuZnVuY3Rpb24gc29ydEJ5SW5kZXgoYTogeyBpbmRleDogbnVtYmVyIH0sIGI6IHsgaW5kZXg6IG51bWJlciB9KSB7IHJldHVybiBhLmluZGV4IC0gYi5pbmRleCB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8ge1xuICByZWFkb25seSBoZWFkZXJMZW5ndGg6IG51bWJlcjtcbiAgcmVhZG9ubHkgcm93TGVuZ3RoOiBudW1iZXI7XG4gIHJlYWRvbmx5IGZvb3Rlckxlbmd0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsVmlydHVhbFNjcm9sbEZvck9mPFQ+IGltcGxlbWVudHMgQ29sbGVjdGlvblZpZXdlciwgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB7XG4gIHZpZXdDaGFuZ2U6IE9ic2VydmFibGU8TGlzdFJhbmdlPjtcblxuICBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFRbXSB8IFJlYWRvbmx5QXJyYXk8VD4+O1xuXG4gIGdldCBoZWFkZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuaGVhZGVyLnJvd3MubGVuZ3RoICB9XG4gIGdldCByb3dMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmNSZWZzLmRhdGEubGVuZ3RoICB9XG4gIGdldCBmb290ZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZm9vdGVyLnJvd3MubGVuZ3RoICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGRzOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIHByaXZhdGUgZ2V0IHZjUmVmcygpOiBSZWNvcmQ8J2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJywgVmlld0NvbnRhaW5lclJlZj4ge1xuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgaGVhZGVyOiB0aGlzLmNka1RhYmxlLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgIGRhdGE6IHRoaXMuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLFxuICAgICAgZm9vdGVyOiB0aGlzLmNka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmNSZWZzJywgeyB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyZWRDb250ZW50T2Zmc2V0ID0gMDtcbiAgLyoqIEEgdHVwbGUgY29udGFpbmluZyB0aGUgbGFzdCBrbm93biByYW5nZXMgW2hlYWRlciwgZGF0YSwgZm9vdGVyXSAqL1xuICBwcml2YXRlIF9yZW5kZXJlZFJhbmdlczogW0xpc3RSYW5nZSwgTGlzdFJhbmdlLCBMaXN0UmFuZ2VdO1xuICAvKiogVGhlIGxlbmd0aCBvZiBtZXRhIHJvd3MgWzBdID0gaGVhZGVyIFsxXSA9IGZvb3RlciAqL1xuICBwcml2YXRlIG1ldGFSb3dzOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuXG4gIHByaXZhdGUgaGVhZGVyID0geyByb3dzOiBbXSBhcyBIVE1MRWxlbWVudFtdLCBzdGlja3k6IFtdIGFzIGJvb2xlYW5bXSwgcmVuZGVyZWQ6IFtdIGFzIGJvb2xlYW5bXSB9O1xuICBwcml2YXRlIGZvb3RlciA9IHsgcm93czogW10gYXMgSFRNTEVsZW1lbnRbXSwgc3RpY2t5OiBbXSBhcyBib29sZWFuW10sIHJlbmRlcmVkOiBbXSBhcyBib29sZWFuW10gfTtcblxuICBwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIGNka1RhYmxlOiBQYmxDZGtUYWJsZUNvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSB2aWV3cG9ydDogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4sIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmdyaWQgPSBleHRBcGkuZ3JpZDtcbiAgICB0aGlzLmNka1RhYmxlID0gZXh0QXBpLmNka1RhYmxlO1xuICAgIHRoaXMudmlld3BvcnQgPSBleHRBcGkuZ3JpZC52aWV3cG9ydDtcblxuICAgIHRoaXMudmlld0NoYW5nZSA9IHRoaXMuY2RrVGFibGUudmlld0NoYW5nZTtcblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGV4dEFwaS5ncmlkKS5ldmVudHNcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgdGhpcy5kZXRhY2hWaWV3KCk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hWaWV3KGV2ZW50LmN1cnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLmF0dGFjaFZpZXcoZXh0QXBpLmdyaWQuZHMpO1xuXG4gICAgZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLnN5bmNcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IGV4dEFwaS5tZXRhUm93U2VydmljZS5oZWFkZXIucm93LmNvbmNhdChleHRBcGkubWV0YVJvd1NlcnZpY2UuaGVhZGVyLnN0aWNreSkuc29ydChzb3J0QnlJbmRleCk7XG4gICAgICAgIGNvbnN0IGZvb3RlcnMgPSBleHRBcGkubWV0YVJvd1NlcnZpY2UuZm9vdGVyLnJvdy5jb25jYXQoZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmZvb3Rlci5zdGlja3kpLnNvcnQoc29ydEJ5SW5kZXgpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLnJvd3MgPSBoZWFkZXJzLm1hcCggaCA9PiBoLmVsICk7XG4gICAgICAgIHRoaXMuaGVhZGVyLnN0aWNreSA9IGhlYWRlcnMubWFwKCBoID0+IGgucm93RGVmLnR5cGUgPT09ICdzdGlja3knICk7XG4gICAgICAgIHRoaXMuZm9vdGVyLnJvd3MgPSBmb290ZXJzLm1hcCggaCA9PiBoLmVsICk7XG4gICAgICAgIHRoaXMuZm9vdGVyLnN0aWNreSA9IGZvb3RlcnMubWFwKCBoID0+IGgucm93RGVmLnR5cGUgPT09ICdzdGlja3knICk7XG5cbiAgICAgICAgdXBkYXRlU3RpY2t5Um93cyh0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCwgdGhpcy5oZWFkZXIucm93cywgdGhpcy5oZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgICAgIHVwZGF0ZVN0aWNreVJvd3ModGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQsIHRoaXMuZm9vdGVyLnJvd3MsIHRoaXMuZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgICAgfSk7XG5cbiAgICBpZiAoRklYRURfSEVBREVSX01PREUpIHtcbiAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgY29uc3Qgdmlld1BvcnQgPSB0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IG1ldGFSb3dTdGlja3lTY3JvbGwgPSBuZXcgTWV0YVJvd1N0aWNreVNjcm9sbCh0aGlzLnZpZXdwb3J0LCB2aWV3UG9ydCwgeyBoZWFkZXI6IHRoaXMuaGVhZGVyLCBmb290ZXI6IHRoaXMuZm9vdGVyIH0pO1xuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgIGNvbnN0IHdoZWVsTGlzdGVuID0gKCkgPT4gdmlld1BvcnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBoYW5kbGVyLCB0cnVlKTtcbiAgICAgIGNvbnN0IHdoZWVsVW5MaXN0ZW4gPSAoKSA9PiB2aWV3UG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZXIsIHRydWUpO1xuICAgICAgY29uc3QgdXBkYXRlU2Nyb2xsUG9zaXRpb24gPSAoKSA9PiBzY3JvbGxQb3NpdGlvbiA9ICh0aGlzLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKSkgLyAodGhpcy52aWV3cG9ydC5zY3JvbGxIZWlnaHQgLSB0aGlzLnZpZXdwb3J0LmdldFZpZXdwb3J0U2l6ZSgpKTtcblxuICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogV2hlZWxFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGVsdGFZKSB7XG4gICAgICAgICAgaWYgKCAoc2Nyb2xsUG9zaXRpb24gPT09IDEgJiYgZXZlbnQuZGVsdGFZID4gMCkgfHwgKG9mZnNldCA9PT0gMCAmJiBldmVudC5kZWx0YVkgPCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbmV3T2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnQuZGVsdGFZO1xuICAgICAgICAgIG5ld09mZnNldCA9IE1hdGgubWluKHRoaXMudmlld3BvcnQuc2Nyb2xsSGVpZ2h0LCBNYXRoLm1heCgwLCBuZXdPZmZzZXQpKTtcblxuICAgICAgICAgIGlmIChuZXdPZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gbmV3T2Zmc2V0O1xuICAgICAgICAgICAgaWYgKG1ldGFSb3dTdGlja3lTY3JvbGwuY2FuTW92ZSgpICYmIG1ldGFSb3dTdGlja3lTY3JvbGwubW92ZShldmVudC5kZWx0YVksIHZpZXdQb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICBjb25zdCBzY3JvbGxFbmQkID0gdGhpcy52aWV3cG9ydC5zY3JvbGxpbmcucGlwZShmaWx0ZXIoIHMgPT4gIXMgKSk7XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBtZXRhUm93U3RpY2t5U2Nyb2xsLnJlc3RvcmUodGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgbGV0IHJlbW92ZWRFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAodGhpcy52aWV3cG9ydC53aGVlbE1vZGUgIT09ICdibG9ja2luZycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aGVlbE1vZGUgPSB0aGlzLnZpZXdwb3J0LndoZWVsTW9kZTtcbiAgICAgICAgICAgICAgICBpZiAod2hlZWxNb2RlID09PSAncGFzc2l2ZScpIHtcbiAgICAgICAgICAgICAgICAgIHdoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUoZGVib3VuY2VUaW1lKDE1MCksIGZpbHRlciggcyA9PiAhcyApLCB0YWtlKDEpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIHdoZWVsTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbEZyYW1lUmF0ZVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoc2Nyb2xsRW5kJC5waXBlKHRha2UoMSkpKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICBmcmFtZVJhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZW1vdmVkRXZlbnQgJiYgZnJhbWVSYXRlIDwgd2hlZWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFdoZWVsJCA9IGZyb21FdmVudCh2aWV3UG9ydCwgJ3doZWVsJykucGlwZShkZWJvdW5jZVRpbWUoNTApLCB0YWtlKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhY2UobGFzdFdoZWVsJCwgdGltZXIoNTEpIGFzIGFueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbExpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHJlc3RvcmUgYmFjayBhZnRlciAxMDAgbXMsIGZvciBzb21lIHJlYXNvbiwgaWYgaXQncyBpbW1lZGlhdGUsIHdlIGhpdCBhIGN5Y2xlIG9mIHdoZWVsL3Njcm9sbC9uby1zY3JvbGwgYW5kIG5vdCB3aGVlbC9zY3JvbGwvV0FJSUlJSVQvbm8tc2Nyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbWF5YmUgd2UgY2FuIG1lYXN1cmUgdGltZSBiZXR3ZWVuIG5vLXNjcm9sbGluZyBhbmQgd2hlZWwgdG8gZmluZCB0aGlzIE1TIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBPUiwgcmVnaXN0ZXIgYSB0ZW1wIGB3aGVlbGAgbGlzdGVuZXIgdGhhdCB3aWxsIGRldGVjdCB3aGVlbCBlbmQgYW5kIHJlLXJlZ2lzdGVyIHRoZSBvcmlnaW5hbCBoYW5kbGVyLlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsRW5kJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXN0b3JlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvT2Zmc2V0KG9mZnNldCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICB3aGVlbExpc3RlbigpO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbGluZy5zdWJzY3JpYmUoIGlzU2Nyb2xsaW5nID0+IHtcbiAgICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuICAgICAgICAgIG9mZnNldCA9IHRoaXMudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdwb3J0Lm9mZnNldENoYW5nZVxuICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgLnN1YnNjcmliZSggb2Zmc2V0ID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICB1cGRhdGVTdGlja3lSb3dzKG9mZnNldCwgdGhpcy5oZWFkZXIucm93cywgdGhpcy5oZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgICAgICAgdXBkYXRlU3RpY2t5Um93cyhvZmZzZXQsIHRoaXMuZm9vdGVyLnJvd3MsIHRoaXMuZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZWFzdXJlcyB0aGUgY29tYmluZWQgc2l6ZSAod2lkdGggZm9yIGhvcml6b250YWwgb3JpZW50YXRpb24sIGhlaWdodCBmb3IgdmVydGljYWwpIG9mIGFsbCBpdGVtc1xuICAgKiBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJhbmdlIGluY2x1ZGVzIGl0ZW1zIHRoYXQgYXJlIG5vdCBjdXJyZW50bHlcbiAgICogcmVuZGVyZWQuXG4gICAqL1xuICBtZWFzdXJlUmFuZ2VTaXplKHJhbmdlOiBMaXN0UmFuZ2UsIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKTogbnVtYmVyIHtcbiAgICBpZiAocmFuZ2Uuc3RhcnQgPj0gcmFuZ2UuZW5kKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlZFJhbmdlcyA9IHRoaXMuX3JlbmRlcmVkUmFuZ2VzO1xuICAgIGNvbnN0IHJhbmdlcyA9IHNwbGl0UmFuZ2UocmFuZ2UsIHRoaXMubWV0YVJvd3NbMF0sIHRoaXMuZHMubGVuZ3RoKTtcbiAgICBjb25zdCBzdGlja3lTdGF0ZXMgPSBbIHRoaXMuaGVhZGVyLnN0aWNreSwgW10sIHRoaXMuZm9vdGVyLnN0aWNreSBdO1xuXG4gICAgY29uc3QgdmNSZWZzID0gW3RoaXMudmNSZWZzLmhlYWRlciwgdGhpcy52Y1JlZnMuZGF0YSwgdGhpcy52Y1JlZnMuZm9vdGVyXTtcbiAgICBjb25zdCB2Y1JlZlNpemVSZWR1Y2VyID0gKHRvdGFsOiBudW1iZXIsIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBpbmRleDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIHJldHVybiB0b3RhbCArIG1lYXN1cmVSYW5nZVNpemUodmNSZWYsIHJhbmdlc1tpbmRleF0sIHJlbmRlcmVkUmFuZ2VzW2luZGV4XSwgb3JpZW50YXRpb24sIHN0aWNreVN0YXRlc1tpbmRleF0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdmNSZWZzLnJlZHVjZSh2Y1JlZlNpemVSZWR1Y2VyLCAwKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2hWaWV3KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaFZpZXcoZHM6IFBibERhdGFTb3VyY2U8VD4pOiB2b2lkIHtcbiAgICBpZiAoZHMpIHtcbiAgICAgIHRoaXMuZHMgPSBkcztcbiAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gWyB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSwgdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLnZhbHVlLCB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSBdO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LnJlbmRlcmVkUmFuZ2VTdHJlYW1cbiAgICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgICAuc3Vic2NyaWJlKCByYW5nZSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaGVhZGVyTGVuZ3RoICsgdGhpcy5mb290ZXJMZW5ndGggPT09IDApIHsgLy8gaWYgbm8gcm93L3N0aWNreSBtZXRhIHJvd3MsIG1vdmUgb24uLi5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gWyB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSwgcmFuZ2UsIHsgc3RhcnQ6IDAsIGVuZDogMCB9IF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLm5leHQocmFuZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qICBXSEFUIElTIEdPSU5HIE9OIEhFUkU/ICovXG5cbiAgICAgICAgICAvKiAgVGFibGUgcm93cyBhcmUgc3BsaXQgaW50byAzIHNlY3Rpb25zOiBIZWFkZXIsIERhdGEsIEZvb3Rlci5cbiAgICAgICAgICAgICAgSW4gdGhlIHZpcnR1YWwgcGxheWdyb3VuZCBvbmx5IERBVEEgcm93cyBhcmUgZHluYW1pYy4gSGVhZGVyICYgRm9vdGVyIHJvd3MgYXJlIGZpeGVkLlxuXG4gICAgICAgICAgICAgIFRoZSBgQ2RrVGFibGVgIHdvcmtzIHRoZSBzYW1lLCBhbHNvIGhhdmUgdGhlIHNhbWUgc2VjdGlvbnMgd2l0aCBhIHN0cmVhbSBBUEkgZm9yIERBVEEgcm93cyBvbmx5LlxuICAgICAgICAgICAgICBgQ2RrVGFibGUudmlld0NoYW5nZS5uZXh0KFJBTkdFKWAgd2lsbCBlbWl0IHRvIHRoZSBkYXRhc291cmNlIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgbmV3IGRhdGEgc2VjdGlvbiBmcm9tIHRoZSBkYXRhc291cmNlLlxuXG4gICAgICAgICAgICAgIGBDZGtUYWJsZWAgYWxvbmUgZG9lcyBub3Qgc3VwcG9ydCB2aXJ0dWFsIHNjcm9sbGluZywgdG8gYWNoaWV2ZSBpdCB3ZSB1c2UgYSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydCB3aGljaCB3cmFwcyB0aGUgZW50aXJlIGBDZGtUYWJsZWAuXG4gICAgICAgICAgICAgIFRoaXMgbWVhbnMgdGhhdCBBTEwgc2VjdGlvbnMgYXJlIHdyYXBwZWQgKGhlbmNlIHNjcm9sbGVkIG92ZXIpIGJ1dCBvbmx5IERBVEEgcm93cyBhcmUgbW92aW5nLi4uXG5cbiAgICAgICAgICAgICAgRWFjaCBlbWlzc2lvbiBvZiBgTGlzdFJhbmdlYCBpbiBgcmVuZGVyZWRSYW5nZVN0cmVhbWAgaXMgYmFzZWQgb24gc2l6ZSBjYWxjdWxhdGlvbiBvZiBBTEwgc2VjdGlvbnMgKHNlZSBgbWVhc3VyZVJhbmdlU2l6ZWAgYWJvdmUpXG4gICAgICAgICAgICAgIGFuZCB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIHJlbGV2YW50IHJhbmdlIGZvciBEQVRBIHJvd3Mgb25seSBhbmQgcGFzcyBpdCBvbiB0byB0aGUgZ3JpZC5cblxuICAgICAgICAgICAgICBUbyBtYWtlIHRoaXMgd29yayB3ZSBuZWVkIHRvIGV4dHJhY3QgSGVhZGVyL0Zvb3RlciByb3dzIGJhc2VkIG9uIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcmFuZ2UgYW5kIGhhbmRsZSB0aGVtIGFzIHdlbGwuXG4gICAgICAgICAgICAgIEJlY2F1c2UgdGhlIGdyaWQgd2lsbCBvbmx5IGhhbmRsZSB0aGUgc2Nyb2xsaW5nIG9mIERBVEEgcm93cyB3ZSBuZWVkIHRvIHVwZGF0ZSBIRUFERVIvRk9PVEVSIHJvd3MgdG8gc2hvdy9oaWRlIGJhc2VkIG9uIHRoZSByYW5nZS5cblxuICAgICAgICAgICAgICBCZWNhdXNlIEhlYWRlci9Gb290ZXIgcm93cyBhcmUgZml4ZWQgd2UgZG8gdGhpcyBieSBoaWRpbmcgdGhlbSB3aXRoIGBkaXNwbGF5OiBub25lYCwgdW5sZXNzIHRoZXkgYXJlIHN0aWNreSAvIHBpbm5lZC5cbiAgICAgICAgICAgICAgT25lIGV4Y2VwdGlvbiBpcyB0aGUgbWFpbiBoZWFkZXIgcm93LCB3aGljaCB3ZSBoaWRlIHZpcnR1YWxseSBiZWNhdXNlIHdlIG5lZWQgaXQgdG8gcmVuZGVyIGFuZCByZWZsZWN0IHRoZSBjZWxsIHNpemUuXG5cbiAgICAgICAgICAgICAgV2UgZmlyc3QgZXh0cmFjdCB0aGUgYWN0dWFsIHJhbmdlcyBmb3IgZWFjaCBzZWN0aW9uIGFuZCB1cGRhdGUgdGhlIGBDZGtUYWJsZWAgd2l0aCB0aGUgREFUQSByb3cgcmFuZ2UuXG4gICAgICAgICAgICAgIFdlIHRoZW4gd2FpdCBmb3IgdGhlIHJvd3MgdG8gcmVuZGVyLCB3aGljaCBpcyB0aGUgdGltZSBmb3IgdXMgdG8gYWxzbyBcInJlbmRlclwiIEhlYWRlci9Gb290ZXIgcm93cy4uLlxuICAgICAgICAgICAgICBXZSBkb24ndCBcInJlbmRlclwiIHRoZW0gcGVyLXNlLCB0aGV5IGFyZSBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBqdXN0IHNob3cvaGlkZSB0aGVtIGJhc2VkIG9uIHRoZSByYW5nZSBhbmQgc3RhdGUgKHN0aWNreSkuXG4gICAgICAgICAgICAgIFRoaXMgaXMgaW1wb3J0YW50LCBoaWRpbmcgd2lsbCBjYXVzZSB0aGUgdG90YWwgaGVpZ2h0IG9mIHRoZSBzY3JvbGwgY29udGFpbmVyIHRvIHNocmluayB0byB0aGUgc2l6ZSBpdCBzaG91bGQgYmUuXG4gICAgICAgICAgICAgIFdlIGRlZmVyIHRoaXMgb3BlcmF0aW9uIHRvIHJ1biBBRlRFUiB0aGUgcm93cyBhcmUgcmVuZGVyZWQgKG5vdCBpbW1lZGlhdGVseSkgYmVjYXVzZSBhbiBpbW1lZGlhdGUgY2hhbmdlIHdpbGwgdHJpZ2dlclxuICAgICAgICAgICAgICBhIGNoYW5nZSBpbiB0aGUgc2Nyb2xsIGNvbnRhaW5lciBzaXplIHJlc3VsdGluZyBpbiBhIHNjcm9sbCBldmVudCB0aGF0IHdpbGwgYnJpbmcgdXMgYmFjayBoZXJlIGJ1dCB0aGlzIHRpbWUgd2l0aFxuICAgICAgICAgICAgICBhIGhlaWdodCB0aGF0IGRvZXMgbm90IGZpdCB0aGUgcmFuZ2UuIEltbWVkaWF0ZSBjaGFuZ2UgcmVtb3ZlcyByb3dzIChIZWFkZXIvRm9vdGVyKSBiZWZvcmUgdGhlIG5ldyByYW5nZSBpcyBhcHBsaWVkLlxuICAgICAgICAgICAgICBPbmx5IGFmdGVyIHRoZSByb3dzIGFyZSByZW5kZXJlZCB3ZSBjYW4gc2hvdy9oaWRlIHRoZSBIZWFkZXIvRm9vdGVyIHJvd3MuXG4gICAgICAgICAgKi9cblxuICAgICAgICAgIC8vIEV4dHJhY3RpbmcgYWN0dWFsIHJhbmdlcyBmb3IgZWFjaCBzZWN0aW9uLlxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gc3BsaXRSYW5nZShyYW5nZSwgdGhpcy5tZXRhUm93c1swXSwgZHMubGVuZ3RoKTtcbiAgICAgICAgICBjb25zdCBbIGhlYWRlciwgZGF0YSwgZm9vdGVyIF0gPSB0aGlzLl9yZW5kZXJlZFJhbmdlcztcblxuICAgICAgICAgIHRoaXMuY2RrVGFibGUub25SZW5kZXJSb3dzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFdlIHVwZGF0ZSB0aGUgaGVhZGVyIERPTSBlbGVtZW50cyBpbiByZXZlcnNlLCBza2lwcGluZyB0aGUgbGFzdCAoZmlyc3Qgd2hlbiByZXZlcnNlZCkgRE9NIGVsZW1lbnQuXG4gICAgICAgICAgICAvLyBUaGUgc2tpcHBlZCBlbGVtZW50IGlzIHRoZSBncmlkJ3MgaGVhZGVyIHJvdyB0aGF0IG11c3Qga2VlcCB0cmFjayBvZiB0aGUgbGF5b3V0IGZvciBpbnRlcm5hbCBzaXplIGNhbGN1bGF0aW9uIChlLmcuIGdyb3VwIGhlYWRlciByb3dzKS5cbiAgICAgICAgICAgIC8vIEFuIGhpZGRlbiByb3cgaXMgb25lIHRoYXQgaXMgb3V0IG9mIHJhbmdlIEFORCBub3Qgc3RpY2t5XG4gICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGh0bWxSb3dzID0gdGhpcy5oZWFkZXIucm93cztcbiAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWRSb3dzID0gdGhpcy5oZWFkZXIucmVuZGVyZWQ7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVJvd3MgPSB0aGlzLmhlYWRlci5zdGlja3k7XG4gICAgICAgICAgICAgIGxldCByb3dJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgbGVuID0gdGhpcy5oZWFkZXIuc3RpY2t5Lmxlbmd0aCAtIDE7IHJvd0luZGV4IDwgbGVuOyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzaWduIHJlbmRlcmVkIHN0YXRlICsgaWYgbm90IHJlbmRlcmVkIGFuZCBub3Qgc3RpY2t5LCBzZXQgZGlzcGxheSB0byBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5zdHlsZS5kaXNwbGF5ID0gIShyZW5kZXJlZFJvd3Nbcm93SW5kZXhdID0gcm93SW5kZXggPj0gaGVhZGVyLnN0YXJ0KSAmJiAhc3RpY2t5Um93c1tyb3dJbmRleF1cbiAgICAgICAgICAgICAgICAgID8gJ25vbmUnXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBIZXJlIHdlIHVwZGF0ZSB0aGUgbWFpbiBoZWFkZXIgcm93LCB3aGVuIHdlIG5lZWQgdG8gaGlkZSBpdCB3ZSBhcHBseSBhIGNsYXNzIHRoYXQgd2lsbCBoaWRlIGl0IHZpcnR1YWxseSwgaS5lLiBub3Qgc2hvd2luZyBidXQga2VlcGluZyBpbnRlcm5hbCBsYXlvdXQuXG4gICAgICAgICAgICAgIGlmICghKHJlbmRlcmVkUm93c1tyb3dJbmRleF0gPSByb3dJbmRleCA+PSBoZWFkZXIuc3RhcnQpICYmICFzdGlja3lSb3dzW3Jvd0luZGV4XSkge1xuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtcm93LXZpc3VhbGx5LWhpZGRlbicpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZC5zaG93SGVhZGVyICYmIGh0bWxSb3dzW3Jvd0luZGV4XSkge1xuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtcm93LXZpc3VhbGx5LWhpZGRlbicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvb3Rlckxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgaHRtbFJvd3MgPSB0aGlzLmZvb3Rlci5yb3dzO1xuICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZFJvd3MgPSB0aGlzLmZvb3Rlci5yZW5kZXJlZDtcbiAgICAgICAgICAgICAgY29uc3Qgc3RpY2t5Um93cyA9IHRoaXMuZm9vdGVyLnN0aWNreTtcbiAgICAgICAgICAgICAgbGV0IHJvd0luZGV4ID0gMDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBsZW4gPSB0aGlzLmZvb3Rlci5zdGlja3kubGVuZ3RoOyByb3dJbmRleCA8IGxlbjsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgICAgIC8vIGFzc2lnbiByZW5kZXJlZCBzdGF0ZSArIGlmIG5vdCByZW5kZXJlZCBhbmQgbm90IHN0aWNreSwgc2V0IGRpc3BsYXkgdG8gXCJub25lXCJcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uc3R5bGUuZGlzcGxheSA9ICEocmVuZGVyZWRSb3dzW3Jvd0luZGV4XSA9IHJvd0luZGV4IDwgZm9vdGVyLmVuZCkgJiYgIXN0aWNreVJvd3Nbcm93SW5kZXhdXG4gICAgICAgICAgICAgICAgICA/ICdub25lJ1xuICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmNka1RhYmxlLnZpZXdDaGFuZ2UubmV4dChkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCBtZXRhIHJvd3MgdG8gdGhlIHRvdGFsIHJvdyBjb3VudC5cbiAgICAgIHRoaXMuZGF0YVN0cmVhbSA9IGRzLm9uUmVuZGVyRGF0YUNoYW5naW5nXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICAgICAgbWFwKCAoe2RhdGF9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhUm93cyA9IHRoaXMubWV0YVJvd3MgPSBbIHRoaXMuaGVhZGVyLnJvd3MubGVuZ3RoLCB0aGlzLmZvb3Rlci5yb3dzLmxlbmd0aCBdO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheSggZGF0YS5sZW5ndGggKyBtZXRhUm93c1swXSArIG1ldGFSb3dzWzFdICk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgIGRzLm9uUmVuZGVyZWREYXRhQ2hhbmdlZFxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIG1hcCggKCkgPT4gZHMubGVuZ3RoICksXG4gICAgICAgICAgc3RhcnRXaXRoKDApLFxuICAgICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgICAgZmlsdGVyKCAoW3ByZXYsIGN1cnJdKSA9PiBwcmV2ICE9PSBjdXJyICksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggKFtwcmV2LCBjdXJyXSkgPT4ge1xuICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLnZpZXdwb3J0Lm9uU291cmNlTGVuZ3RoQ2hhbmdlKHByZXYsIGN1cnIpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LmF0dGFjaCh0aGlzIGFzIGFueSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuZHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52aWV3cG9ydC5kZXRhY2goKTtcbiAgfVxufVxuIl19