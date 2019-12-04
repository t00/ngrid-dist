/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject, fromEvent, race, timer } from 'rxjs';
import { filter, startWith, pairwise, take, takeUntil, map, debounceTime } from 'rxjs/operators';
import { PblNgridPluginController } from '../../../ext/plugin-control';
import { splitRange, updateStickyRows, measureRangeSize } from './utils';
import { MetaRowStickyScroll } from './meta-row-sticky-scroll';
/** @type {?} */
var FIXED_HEADER_MODE = true;
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
var /**
 * @template T
 */
PblVirtualScrollForOf = /** @class */ (function () {
    function PblVirtualScrollForOf(extApi, ngZone) {
        var _this = this;
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
        function (event) {
            if (event.kind === 'onDataSource') {
                _this.detachView();
                _this.attachView(event.curr);
            }
        }));
        this.attachView(extApi.grid.ds);
        extApi.metaRowService.sync
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var headers = extApi.metaRowService.header.row.concat(extApi.metaRowService.header.sticky).sort(sortByIndex);
            /** @type {?} */
            var footers = extApi.metaRowService.footer.row.concat(extApi.metaRowService.footer.sticky).sort(sortByIndex);
            _this.header.rows = headers.map((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.el; }));
            _this.header.sticky = headers.map((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.rowDef.type === 'sticky'; }));
            _this.footer.rows = footers.map((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.el; }));
            _this.footer.sticky = footers.map((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.rowDef.type === 'sticky'; }));
            updateStickyRows(_this.renderedContentOffset, _this.header.rows, _this.header.sticky, 'top');
            updateStickyRows(_this.renderedContentOffset, _this.footer.rows, _this.footer.sticky, 'bottom');
        }));
        if (FIXED_HEADER_MODE) {
            /** @type {?} */
            var offset_1 = 0;
            /** @type {?} */
            var viewPort_1 = this.viewport.elementRef.nativeElement;
            /** @type {?} */
            var metaRowStickyScroll_1 = new MetaRowStickyScroll(this.viewport, viewPort_1, { header: this.header, footer: this.footer });
            /** @type {?} */
            var scrollPosition_1;
            /** @type {?} */
            var wheelListen_1 = (/**
             * @return {?}
             */
            function () { return viewPort_1.addEventListener('wheel', handler_1, true); });
            /** @type {?} */
            var wheelUnListen_1 = (/**
             * @return {?}
             */
            function () { return viewPort_1.removeEventListener('wheel', handler_1, true); });
            /** @type {?} */
            var updateScrollPosition_1 = (/**
             * @return {?}
             */
            function () { return scrollPosition_1 = (_this.viewport.measureScrollOffset()) / (_this.viewport.scrollHeight - _this.viewport.getViewportSize()); });
            /** @type {?} */
            var handler_1 = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.deltaY) {
                    if ((scrollPosition_1 === 1 && event.deltaY > 0) || (offset_1 === 0 && event.deltaY < 0)) {
                        return;
                    }
                    /** @type {?} */
                    var newOffset = offset_1 + event.deltaY;
                    newOffset = Math.min(_this.viewport.scrollHeight, Math.max(0, newOffset));
                    if (newOffset !== offset_1) {
                        offset_1 = newOffset;
                        if (metaRowStickyScroll_1.canMove() && metaRowStickyScroll_1.move(event.deltaY, viewPort_1.getBoundingClientRect())) {
                            /** @type {?} */
                            var scrollEnd$ = _this.viewport.scrolling.pipe(filter((/**
                             * @param {?} s
                             * @return {?}
                             */
                            function (s) { return !s; })));
                            /** @type {?} */
                            var restore_1 = (/**
                             * @return {?}
                             */
                            function () {
                                metaRowStickyScroll_1.restore(_this.renderedContentOffset);
                                updateScrollPosition_1();
                            });
                            /** @type {?} */
                            var removedEvent_1 = false;
                            if (_this.viewport.wheelMode !== 'blocking') {
                                /** @type {?} */
                                var wheelMode_1 = _this.viewport.wheelMode;
                                if (wheelMode_1 === 'passive') {
                                    wheelUnListen_1();
                                    _this.viewport.scrolling.pipe(debounceTime(150), filter((/**
                                     * @param {?} s
                                     * @return {?}
                                     */
                                    function (s) { return !s; })), take(1))
                                        .subscribe((/**
                                     * @return {?}
                                     */
                                    function () {
                                        restore_1();
                                        wheelListen_1();
                                    }));
                                }
                                else {
                                    _this.viewport.scrollFrameRate
                                        .pipe(takeUntil(scrollEnd$.pipe(take(1))))
                                        .subscribe((/**
                                     * @param {?} frameRate
                                     * @return {?}
                                     */
                                    function (frameRate) {
                                        if (!removedEvent_1 && frameRate < wheelMode_1) {
                                            wheelUnListen_1();
                                            removedEvent_1 = true;
                                        }
                                    }), null, (/**
                                     * @return {?}
                                     */
                                    function () {
                                        /** @type {?} */
                                        var lastWheel$ = fromEvent(viewPort_1, 'wheel').pipe(debounceTime(50), take(1));
                                        race(lastWheel$, (/** @type {?} */ (timer(51))))
                                            .subscribe((/**
                                         * @return {?}
                                         */
                                        function () {
                                            restore_1();
                                            if (removedEvent_1) {
                                                wheelListen_1();
                                            }
                                        }));
                                        // we restore back after 100 ms, for some reason, if it's immediate, we hit a cycle of wheel/scroll/no-scroll and not wheel/scroll/WAIIIIIT/no-scrol
                                        // TODO: maybe we can measure time between no-scrolling and wheel to find this MS value
                                        //        OR, register a temp `wheel` listener that will detect wheel end and re-register the original handler.
                                    }));
                                }
                            }
                            else {
                                scrollEnd$.pipe(take(1)).subscribe(restore_1);
                            }
                        }
                    }
                    _this.viewport.scrollToOffset(offset_1);
                    event.preventDefault();
                    event.stopPropagation();
                    return true;
                }
            });
            updateScrollPosition_1();
            wheelListen_1();
            this.viewport.scrolling.subscribe((/**
             * @param {?} isScrolling
             * @return {?}
             */
            function (isScrolling) {
                if (!isScrolling) {
                    offset_1 = _this.viewport.measureScrollOffset();
                }
            }));
        }
        this.viewport.offsetChange
            .pipe(takeUntil(this.destroyed))
            .subscribe((/**
         * @param {?} offset
         * @return {?}
         */
        function (offset) {
            if (_this.renderedContentOffset !== offset) {
                _this.renderedContentOffset = offset;
                updateStickyRows(offset, _this.header.rows, _this.header.sticky, 'top');
                updateStickyRows(offset, _this.footer.rows, _this.footer.sticky, 'bottom');
            }
        }));
    }
    Object.defineProperty(PblVirtualScrollForOf.prototype, "headerLength", {
        get: /**
         * @return {?}
         */
        function () { return this.header.rows.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblVirtualScrollForOf.prototype, "rowLength", {
        get: /**
         * @return {?}
         */
        function () { return this.vcRefs.data.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblVirtualScrollForOf.prototype, "footerLength", {
        get: /**
         * @return {?}
         */
        function () { return this.footer.rows.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblVirtualScrollForOf.prototype, "vcRefs", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = {
                header: this.cdkTable._headerRowOutlet.viewContainer,
                data: this.cdkTable._rowOutlet.viewContainer,
                footer: this.cdkTable._footerRowOutlet.viewContainer,
            };
            Object.defineProperty(this, 'vcRefs', { value: value, configurable: true });
            return value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     */
    /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     * @param {?} range
     * @param {?} orientation
     * @return {?}
     */
    PblVirtualScrollForOf.prototype.measureRangeSize = /**
     * Measures the combined size (width for horizontal orientation, height for vertical) of all items
     * in the specified range. Throws an error if the range includes items that are not currently
     * rendered.
     * @param {?} range
     * @param {?} orientation
     * @return {?}
     */
    function (range, orientation) {
        if (range.start >= range.end) {
            return 0;
        }
        /** @type {?} */
        var renderedRanges = this._renderedRanges;
        /** @type {?} */
        var ranges = splitRange(range, this.metaRows[0], this.ds.length);
        /** @type {?} */
        var stickyStates = [this.header.sticky, [], this.footer.sticky];
        /** @type {?} */
        var vcRefs = [this.vcRefs.header, this.vcRefs.data, this.vcRefs.footer];
        /** @type {?} */
        var vcRefSizeReducer = (/**
         * @param {?} total
         * @param {?} vcRef
         * @param {?} index
         * @return {?}
         */
        function (total, vcRef, index) {
            return total + measureRangeSize(vcRef, ranges[index], renderedRanges[index], orientation, stickyStates[index]);
        });
        return vcRefs.reduce(vcRefSizeReducer, 0);
    };
    /**
     * @return {?}
     */
    PblVirtualScrollForOf.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this.detachView();
        this.destroyed.next();
        this.destroyed.complete();
    };
    /**
     * @private
     * @param {?} ds
     * @return {?}
     */
    PblVirtualScrollForOf.prototype.attachView = /**
     * @private
     * @param {?} ds
     * @return {?}
     */
    function (ds) {
        var _this = this;
        if (ds) {
            this.ds = ds;
            this._renderedRanges = [{ start: 0, end: 0 }, this.cdkTable.viewChange.value, { start: 0, end: 0 }];
            this.viewport.renderedRangeStream
                .pipe(takeUntil(this.destroyed))
                .subscribe((/**
             * @param {?} range
             * @return {?}
             */
            function (range) {
                if (_this.headerLength + _this.footerLength === 0) { // if no row/sticky meta rows, move on...
                    _this._renderedRanges = [{ start: 0, end: 0 }, range, { start: 0, end: 0 }];
                    return _this.cdkTable.viewChange.next(range);
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
                _this._renderedRanges = splitRange(range, _this.metaRows[0], ds.length);
                var _a = tslib_1.__read(_this._renderedRanges, 3), header = _a[0], data = _a[1], footer = _a[2];
                _this.cdkTable.onRenderRows.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                function () {
                    // We update the header DOM elements in reverse, skipping the last (first when reversed) DOM element.
                    // The skipped element is the grid's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
                    // An hidden row is one that is out of range AND not sticky
                    if (_this.headerLength > 0) {
                        /** @type {?} */
                        var htmlRows = _this.header.rows;
                        /** @type {?} */
                        var renderedRows = _this.header.rendered;
                        /** @type {?} */
                        var stickyRows = _this.header.sticky;
                        /** @type {?} */
                        var rowIndex = 0;
                        for (var len = _this.header.sticky.length - 1; rowIndex < len; rowIndex++) {
                            // assign rendered state + if not rendered and not sticky, set display to "none"
                            htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]
                                ? 'none'
                                : null;
                        }
                        // Here we update the main header row, when we need to hide it we apply a class that will hide it virtually, i.e. not showing but keeping internal layout.
                        if (!(renderedRows[rowIndex] = rowIndex >= header.start) && !stickyRows[rowIndex]) {
                            htmlRows[rowIndex].classList.add('pbl-ngrid-row-visually-hidden');
                        }
                        else if (_this.grid.showHeader && htmlRows[rowIndex]) {
                            htmlRows[rowIndex].classList.remove('pbl-ngrid-row-visually-hidden');
                        }
                    }
                    if (_this.footerLength > 0) {
                        /** @type {?} */
                        var htmlRows = _this.footer.rows;
                        /** @type {?} */
                        var renderedRows = _this.footer.rendered;
                        /** @type {?} */
                        var stickyRows = _this.footer.sticky;
                        /** @type {?} */
                        var rowIndex = 0;
                        for (var len = _this.footer.sticky.length; rowIndex < len; rowIndex++) {
                            // assign rendered state + if not rendered and not sticky, set display to "none"
                            htmlRows[rowIndex].style.display = !(renderedRows[rowIndex] = rowIndex < footer.end) && !stickyRows[rowIndex]
                                ? 'none'
                                : null;
                        }
                    }
                }));
                _this.cdkTable.viewChange.next(data);
            }));
            // add meta rows to the total row count.
            this.dataStream = ds.onRenderDataChanging
                .pipe(takeUntil(this.destroyed), map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var data = _a.data;
                /** @type {?} */
                var metaRows = _this.metaRows = [_this.header.rows.length, _this.footer.rows.length];
                return new Array(data.length + metaRows[0] + metaRows[1]);
            })));
            ds.onRenderedDataChanged
                .pipe(takeUntil(this.destroyed), map((/**
             * @return {?}
             */
            function () { return ds.length; })), startWith(0), pairwise(), filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), prev = _b[0], curr = _b[1];
                return prev !== curr;
            })))
                .subscribe((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), prev = _b[0], curr = _b[1];
                _this.ngZone.onStable.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                function () { return _this.viewport.onSourceLengthChange(prev, curr); }));
            }));
            this.viewport.attach((/** @type {?} */ (this)));
        }
    };
    /**
     * @private
     * @return {?}
     */
    PblVirtualScrollForOf.prototype.detachView = /**
     * @private
     * @return {?}
     */
    function () {
        this.ds = undefined;
        this.viewport.detach();
    };
    return PblVirtualScrollForOf;
}());
/**
 * @template T
 */
export { PblVirtualScrollForOf };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZm9yLW9mLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2ZlYXR1cmVzL3ZpcnR1YWwtc2Nyb2xsL3ZpcnR1YWwtc2Nyb2xsLWZvci1vZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBTyxTQUFTLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3RHLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDekUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0lBRXpELGlCQUFpQixHQUFHLElBQUk7Ozs7OztBQUU5QixTQUFTLFdBQVcsQ0FBQyxDQUFvQixFQUFFLENBQW9CLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFDO0FBQUEsQ0FBQzs7OztBQUU5Riw0Q0FJQzs7O0lBSEMsOENBQThCOztJQUM5QiwyQ0FBMkI7O0lBQzNCLDhDQUE4Qjs7Ozs7QUFHaEM7Ozs7SUFtQ0UsK0JBQVksTUFBK0IsRUFBVSxNQUFjO1FBQW5FLGlCQThIQztRQTlIb0QsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQTFCM0QsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFhaEMsMEJBQXFCLEdBQUcsQ0FBQyxDQUFDOzs7O1FBSTFCLGFBQVEsR0FBcUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7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QyxFQUNaLFFBQVEsRUFBRSxFQUNWLE1BQU07Ozs7WUFBRSxVQUFDLEVBQVk7b0JBQVosMEJBQVksRUFBWCxZQUFJLEVBQUUsWUFBSTtnQkFBTSxPQUFBLElBQUksS0FBSyxJQUFJO1lBQWIsQ0FBYSxFQUFFLENBQzFDO2lCQUNBLFNBQVM7Ozs7WUFBRSxVQUFDLEVBQVk7b0JBQVosMEJBQVksRUFBWCxZQUFJLEVBQUUsWUFBSTtnQkFDdEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7OztnQkFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQTlDLENBQThDLEVBQUUsQ0FBQztZQUN2RyxDQUFDLEVBQUMsQ0FBQztZQUVMLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDOzs7OztJQUVPLDBDQUFVOzs7O0lBQWxCO1FBQ0UsSUFBSSxDQUFDLEVBQUUsR0FBRyxTQUFTLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBdlRELElBdVRDOzs7Ozs7O0lBdFRDLDJDQUFrQzs7SUFFbEMsMkNBQStDOzs7OztJQU0vQywwQ0FBd0M7Ozs7O0lBQ3hDLG1DQUE2Qjs7Ozs7SUFZN0Isc0RBQWtDOzs7Ozs7SUFFbEMsZ0RBQTJEOzs7Ozs7SUFFM0QseUNBQTRDOzs7OztJQUU1Qyx1Q0FBbUc7Ozs7O0lBQ25HLHVDQUFtRzs7Ozs7SUFFbkcscUNBQW1DOzs7OztJQUNuQyx5Q0FBMEM7Ozs7O0lBQzFDLHlDQUF1RDs7Ozs7SUFFVix1Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCBmcm9tRXZlbnQsIHJhY2UsIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHN0YXJ0V2l0aCwgcGFpcndpc2UsIHRha2UsIHRhcCwgdGFrZVVudGlsLCBtYXAsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmdab25lLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uVmlld2VyLCBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IFBibERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBQYmxDZGtUYWJsZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3BibC1jZGstdGFibGUvcGJsLWNkay10YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50IH0gZnJvbSAnLi92aXJ0dWFsLXNjcm9sbC12aWV3cG9ydC5jb21wb25lbnQnO1xuaW1wb3J0IHsgc3BsaXRSYW5nZSwgdXBkYXRlU3RpY2t5Um93cywgbWVhc3VyZVJhbmdlU2l6ZSB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgTWV0YVJvd1N0aWNreVNjcm9sbCB9IGZyb20gJy4vbWV0YS1yb3ctc3RpY2t5LXNjcm9sbCc7XG5cbmNvbnN0IEZJWEVEX0hFQURFUl9NT0RFID0gdHJ1ZTtcblxuZnVuY3Rpb24gc29ydEJ5SW5kZXgoYTogeyBpbmRleDogbnVtYmVyIH0sIGI6IHsgaW5kZXg6IG51bWJlciB9KSB7IHJldHVybiBhLmluZGV4IC0gYi5pbmRleCB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8ge1xuICByZWFkb25seSBoZWFkZXJMZW5ndGg6IG51bWJlcjtcbiAgcmVhZG9ubHkgcm93TGVuZ3RoOiBudW1iZXI7XG4gIHJlYWRvbmx5IGZvb3Rlckxlbmd0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsVmlydHVhbFNjcm9sbEZvck9mPFQ+IGltcGxlbWVudHMgQ29sbGVjdGlvblZpZXdlciwgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB7XG4gIHZpZXdDaGFuZ2U6IE9ic2VydmFibGU8TGlzdFJhbmdlPjtcblxuICBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFRbXSB8IFJlYWRvbmx5QXJyYXk8VD4+O1xuXG4gIGdldCBoZWFkZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuaGVhZGVyLnJvd3MubGVuZ3RoICB9XG4gIGdldCByb3dMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmNSZWZzLmRhdGEubGVuZ3RoICB9XG4gIGdldCBmb290ZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZm9vdGVyLnJvd3MubGVuZ3RoICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGRzOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIHByaXZhdGUgZ2V0IHZjUmVmcygpOiBSZWNvcmQ8J2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJywgVmlld0NvbnRhaW5lclJlZj4ge1xuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgaGVhZGVyOiB0aGlzLmNka1RhYmxlLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgIGRhdGE6IHRoaXMuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLFxuICAgICAgZm9vdGVyOiB0aGlzLmNka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmNSZWZzJywgeyB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyZWRDb250ZW50T2Zmc2V0ID0gMDtcbiAgLyoqIEEgdHVwbGUgY29udGFpbmluZyB0aGUgbGFzdCBrbm93biByYW5nZXMgW2hlYWRlciwgZGF0YSwgZm9vdGVyXSAqL1xuICBwcml2YXRlIF9yZW5kZXJlZFJhbmdlczogW0xpc3RSYW5nZSwgTGlzdFJhbmdlLCBMaXN0UmFuZ2VdO1xuICAvKiogVGhlIGxlbmd0aCBvZiBtZXRhIHJvd3MgWzBdID0gaGVhZGVyIFsxXSA9IGZvb3RlciAqL1xuICBwcml2YXRlIG1ldGFSb3dzOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuXG4gIHByaXZhdGUgaGVhZGVyID0geyByb3dzOiBbXSBhcyBIVE1MRWxlbWVudFtdLCBzdGlja3k6IFtdIGFzIGJvb2xlYW5bXSwgcmVuZGVyZWQ6IFtdIGFzIGJvb2xlYW5bXSB9O1xuICBwcml2YXRlIGZvb3RlciA9IHsgcm93czogW10gYXMgSFRNTEVsZW1lbnRbXSwgc3RpY2t5OiBbXSBhcyBib29sZWFuW10sIHJlbmRlcmVkOiBbXSBhcyBib29sZWFuW10gfTtcblxuICBwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuICBwcml2YXRlIGNka1RhYmxlOiBQYmxDZGtUYWJsZUNvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSB2aWV3cG9ydDogUGJsQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0Q29tcG9uZW50O1xuXG4gIGNvbnN0cnVjdG9yKGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4sIHByaXZhdGUgbmdab25lOiBOZ1pvbmUpIHtcbiAgICB0aGlzLmdyaWQgPSBleHRBcGkuZ3JpZDtcbiAgICB0aGlzLmNka1RhYmxlID0gZXh0QXBpLmNka1RhYmxlO1xuICAgIHRoaXMudmlld3BvcnQgPSBleHRBcGkuZ3JpZC52aWV3cG9ydDtcblxuICAgIHRoaXMudmlld0NoYW5nZSA9IHRoaXMuY2RrVGFibGUudmlld0NoYW5nZTtcblxuICAgIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGV4dEFwaS5ncmlkKS5ldmVudHNcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgdGhpcy5kZXRhY2hWaWV3KCk7XG4gICAgICAgICAgdGhpcy5hdHRhY2hWaWV3KGV2ZW50LmN1cnIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLmF0dGFjaFZpZXcoZXh0QXBpLmdyaWQuZHMpO1xuXG4gICAgZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLnN5bmNcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IGV4dEFwaS5tZXRhUm93U2VydmljZS5oZWFkZXIucm93LmNvbmNhdChleHRBcGkubWV0YVJvd1NlcnZpY2UuaGVhZGVyLnN0aWNreSkuc29ydChzb3J0QnlJbmRleCk7XG4gICAgICAgIGNvbnN0IGZvb3RlcnMgPSBleHRBcGkubWV0YVJvd1NlcnZpY2UuZm9vdGVyLnJvdy5jb25jYXQoZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmZvb3Rlci5zdGlja3kpLnNvcnQoc29ydEJ5SW5kZXgpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLnJvd3MgPSBoZWFkZXJzLm1hcCggaCA9PiBoLmVsICk7XG4gICAgICAgIHRoaXMuaGVhZGVyLnN0aWNreSA9IGhlYWRlcnMubWFwKCBoID0+IGgucm93RGVmLnR5cGUgPT09ICdzdGlja3knICk7XG4gICAgICAgIHRoaXMuZm9vdGVyLnJvd3MgPSBmb290ZXJzLm1hcCggaCA9PiBoLmVsICk7XG4gICAgICAgIHRoaXMuZm9vdGVyLnN0aWNreSA9IGZvb3RlcnMubWFwKCBoID0+IGgucm93RGVmLnR5cGUgPT09ICdzdGlja3knICk7XG5cbiAgICAgICAgdXBkYXRlU3RpY2t5Um93cyh0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCwgdGhpcy5oZWFkZXIucm93cywgdGhpcy5oZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgICAgIHVwZGF0ZVN0aWNreVJvd3ModGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQsIHRoaXMuZm9vdGVyLnJvd3MsIHRoaXMuZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgICAgfSk7XG5cbiAgICBpZiAoRklYRURfSEVBREVSX01PREUpIHtcbiAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgY29uc3Qgdmlld1BvcnQgPSB0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IG1ldGFSb3dTdGlja3lTY3JvbGwgPSBuZXcgTWV0YVJvd1N0aWNreVNjcm9sbCh0aGlzLnZpZXdwb3J0LCB2aWV3UG9ydCwgeyBoZWFkZXI6IHRoaXMuaGVhZGVyLCBmb290ZXI6IHRoaXMuZm9vdGVyIH0pO1xuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgIGNvbnN0IHdoZWVsTGlzdGVuID0gKCkgPT4gdmlld1BvcnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBoYW5kbGVyLCB0cnVlKTtcbiAgICAgIGNvbnN0IHdoZWVsVW5MaXN0ZW4gPSAoKSA9PiB2aWV3UG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZXIsIHRydWUpO1xuICAgICAgY29uc3QgdXBkYXRlU2Nyb2xsUG9zaXRpb24gPSAoKSA9PiBzY3JvbGxQb3NpdGlvbiA9ICh0aGlzLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKSkgLyAodGhpcy52aWV3cG9ydC5zY3JvbGxIZWlnaHQgLSB0aGlzLnZpZXdwb3J0LmdldFZpZXdwb3J0U2l6ZSgpKTtcblxuICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogV2hlZWxFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGVsdGFZKSB7XG4gICAgICAgICAgaWYgKCAoc2Nyb2xsUG9zaXRpb24gPT09IDEgJiYgZXZlbnQuZGVsdGFZID4gMCkgfHwgKG9mZnNldCA9PT0gMCAmJiBldmVudC5kZWx0YVkgPCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbmV3T2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnQuZGVsdGFZO1xuICAgICAgICAgIG5ld09mZnNldCA9IE1hdGgubWluKHRoaXMudmlld3BvcnQuc2Nyb2xsSGVpZ2h0LCBNYXRoLm1heCgwLCBuZXdPZmZzZXQpKTtcblxuICAgICAgICAgIGlmIChuZXdPZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gbmV3T2Zmc2V0O1xuICAgICAgICAgICAgaWYgKG1ldGFSb3dTdGlja3lTY3JvbGwuY2FuTW92ZSgpICYmIG1ldGFSb3dTdGlja3lTY3JvbGwubW92ZShldmVudC5kZWx0YVksIHZpZXdQb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICBjb25zdCBzY3JvbGxFbmQkID0gdGhpcy52aWV3cG9ydC5zY3JvbGxpbmcucGlwZShmaWx0ZXIoIHMgPT4gIXMgKSk7XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBtZXRhUm93U3RpY2t5U2Nyb2xsLnJlc3RvcmUodGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgbGV0IHJlbW92ZWRFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAodGhpcy52aWV3cG9ydC53aGVlbE1vZGUgIT09ICdibG9ja2luZycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aGVlbE1vZGUgPSB0aGlzLnZpZXdwb3J0LndoZWVsTW9kZTtcbiAgICAgICAgICAgICAgICBpZiAod2hlZWxNb2RlID09PSAncGFzc2l2ZScpIHtcbiAgICAgICAgICAgICAgICAgIHdoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUoZGVib3VuY2VUaW1lKDE1MCksIGZpbHRlciggcyA9PiAhcyApLCB0YWtlKDEpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIHdoZWVsTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbEZyYW1lUmF0ZVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoc2Nyb2xsRW5kJC5waXBlKHRha2UoMSkpKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICBmcmFtZVJhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZW1vdmVkRXZlbnQgJiYgZnJhbWVSYXRlIDwgd2hlZWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFdoZWVsJCA9IGZyb21FdmVudCh2aWV3UG9ydCwgJ3doZWVsJykucGlwZShkZWJvdW5jZVRpbWUoNTApLCB0YWtlKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhY2UobGFzdFdoZWVsJCwgdGltZXIoNTEpIGFzIGFueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbExpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHJlc3RvcmUgYmFjayBhZnRlciAxMDAgbXMsIGZvciBzb21lIHJlYXNvbiwgaWYgaXQncyBpbW1lZGlhdGUsIHdlIGhpdCBhIGN5Y2xlIG9mIHdoZWVsL3Njcm9sbC9uby1zY3JvbGwgYW5kIG5vdCB3aGVlbC9zY3JvbGwvV0FJSUlJSVQvbm8tc2Nyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbWF5YmUgd2UgY2FuIG1lYXN1cmUgdGltZSBiZXR3ZWVuIG5vLXNjcm9sbGluZyBhbmQgd2hlZWwgdG8gZmluZCB0aGlzIE1TIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBPUiwgcmVnaXN0ZXIgYSB0ZW1wIGB3aGVlbGAgbGlzdGVuZXIgdGhhdCB3aWxsIGRldGVjdCB3aGVlbCBlbmQgYW5kIHJlLXJlZ2lzdGVyIHRoZSBvcmlnaW5hbCBoYW5kbGVyLlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsRW5kJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXN0b3JlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvT2Zmc2V0KG9mZnNldCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICB3aGVlbExpc3RlbigpO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbGluZy5zdWJzY3JpYmUoIGlzU2Nyb2xsaW5nID0+IHtcbiAgICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuICAgICAgICAgIG9mZnNldCA9IHRoaXMudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdwb3J0Lm9mZnNldENoYW5nZVxuICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgLnN1YnNjcmliZSggb2Zmc2V0ID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICB1cGRhdGVTdGlja3lSb3dzKG9mZnNldCwgdGhpcy5oZWFkZXIucm93cywgdGhpcy5oZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgICAgICAgdXBkYXRlU3RpY2t5Um93cyhvZmZzZXQsIHRoaXMuZm9vdGVyLnJvd3MsIHRoaXMuZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZWFzdXJlcyB0aGUgY29tYmluZWQgc2l6ZSAod2lkdGggZm9yIGhvcml6b250YWwgb3JpZW50YXRpb24sIGhlaWdodCBmb3IgdmVydGljYWwpIG9mIGFsbCBpdGVtc1xuICAgKiBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJhbmdlIGluY2x1ZGVzIGl0ZW1zIHRoYXQgYXJlIG5vdCBjdXJyZW50bHlcbiAgICogcmVuZGVyZWQuXG4gICAqL1xuICBtZWFzdXJlUmFuZ2VTaXplKHJhbmdlOiBMaXN0UmFuZ2UsIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKTogbnVtYmVyIHtcbiAgICBpZiAocmFuZ2Uuc3RhcnQgPj0gcmFuZ2UuZW5kKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlZFJhbmdlcyA9IHRoaXMuX3JlbmRlcmVkUmFuZ2VzO1xuICAgIGNvbnN0IHJhbmdlcyA9IHNwbGl0UmFuZ2UocmFuZ2UsIHRoaXMubWV0YVJvd3NbMF0sIHRoaXMuZHMubGVuZ3RoKTtcbiAgICBjb25zdCBzdGlja3lTdGF0ZXMgPSBbIHRoaXMuaGVhZGVyLnN0aWNreSwgW10sIHRoaXMuZm9vdGVyLnN0aWNreSBdO1xuXG4gICAgY29uc3QgdmNSZWZzID0gW3RoaXMudmNSZWZzLmhlYWRlciwgdGhpcy52Y1JlZnMuZGF0YSwgdGhpcy52Y1JlZnMuZm9vdGVyXTtcbiAgICBjb25zdCB2Y1JlZlNpemVSZWR1Y2VyID0gKHRvdGFsOiBudW1iZXIsIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBpbmRleDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIHJldHVybiB0b3RhbCArIG1lYXN1cmVSYW5nZVNpemUodmNSZWYsIHJhbmdlc1tpbmRleF0sIHJlbmRlcmVkUmFuZ2VzW2luZGV4XSwgb3JpZW50YXRpb24sIHN0aWNreVN0YXRlc1tpbmRleF0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdmNSZWZzLnJlZHVjZSh2Y1JlZlNpemVSZWR1Y2VyLCAwKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2hWaWV3KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaFZpZXcoZHM6IFBibERhdGFTb3VyY2U8VD4pOiB2b2lkIHtcbiAgICBpZiAoZHMpIHtcbiAgICAgIHRoaXMuZHMgPSBkcztcbiAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gWyB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSwgdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLnZhbHVlLCB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSBdO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LnJlbmRlcmVkUmFuZ2VTdHJlYW1cbiAgICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgICAuc3Vic2NyaWJlKCByYW5nZSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaGVhZGVyTGVuZ3RoICsgdGhpcy5mb290ZXJMZW5ndGggPT09IDApIHsgLy8gaWYgbm8gcm93L3N0aWNreSBtZXRhIHJvd3MsIG1vdmUgb24uLi5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gWyB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSwgcmFuZ2UsIHsgc3RhcnQ6IDAsIGVuZDogMCB9IF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLm5leHQocmFuZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qICBXSEFUIElTIEdPSU5HIE9OIEhFUkU/ICovXG5cbiAgICAgICAgICAvKiAgVGFibGUgcm93cyBhcmUgc3BsaXQgaW50byAzIHNlY3Rpb25zOiBIZWFkZXIsIERhdGEsIEZvb3Rlci5cbiAgICAgICAgICAgICAgSW4gdGhlIHZpcnR1YWwgcGxheWdyb3VuZCBvbmx5IERBVEEgcm93cyBhcmUgZHluYW1pYy4gSGVhZGVyICYgRm9vdGVyIHJvd3MgYXJlIGZpeGVkLlxuXG4gICAgICAgICAgICAgIFRoZSBgQ2RrVGFibGVgIHdvcmtzIHRoZSBzYW1lLCBhbHNvIGhhdmUgdGhlIHNhbWUgc2VjdGlvbnMgd2l0aCBhIHN0cmVhbSBBUEkgZm9yIERBVEEgcm93cyBvbmx5LlxuICAgICAgICAgICAgICBgQ2RrVGFibGUudmlld0NoYW5nZS5uZXh0KFJBTkdFKWAgd2lsbCBlbWl0IHRvIHRoZSBkYXRhc291cmNlIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgbmV3IGRhdGEgc2VjdGlvbiBmcm9tIHRoZSBkYXRhc291cmNlLlxuXG4gICAgICAgICAgICAgIGBDZGtUYWJsZWAgYWxvbmUgZG9lcyBub3Qgc3VwcG9ydCB2aXJ0dWFsIHNjcm9sbGluZywgdG8gYWNoaWV2ZSBpdCB3ZSB1c2UgYSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydCB3aGljaCB3cmFwcyB0aGUgZW50aXJlIGBDZGtUYWJsZWAuXG4gICAgICAgICAgICAgIFRoaXMgbWVhbnMgdGhhdCBBTEwgc2VjdGlvbnMgYXJlIHdyYXBwZWQgKGhlbmNlIHNjcm9sbGVkIG92ZXIpIGJ1dCBvbmx5IERBVEEgcm93cyBhcmUgbW92aW5nLi4uXG5cbiAgICAgICAgICAgICAgRWFjaCBlbWlzc2lvbiBvZiBgTGlzdFJhbmdlYCBpbiBgcmVuZGVyZWRSYW5nZVN0cmVhbWAgaXMgYmFzZWQgb24gc2l6ZSBjYWxjdWxhdGlvbiBvZiBBTEwgc2VjdGlvbnMgKHNlZSBgbWVhc3VyZVJhbmdlU2l6ZWAgYWJvdmUpXG4gICAgICAgICAgICAgIGFuZCB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIHJlbGV2YW50IHJhbmdlIGZvciBEQVRBIHJvd3Mgb25seSBhbmQgcGFzcyBpdCBvbiB0byB0aGUgZ3JpZC5cblxuICAgICAgICAgICAgICBUbyBtYWtlIHRoaXMgd29yayB3ZSBuZWVkIHRvIGV4dHJhY3QgSGVhZGVyL0Zvb3RlciByb3dzIGJhc2VkIG9uIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcmFuZ2UgYW5kIGhhbmRsZSB0aGVtIGFzIHdlbGwuXG4gICAgICAgICAgICAgIEJlY2F1c2UgdGhlIGdyaWQgd2lsbCBvbmx5IGhhbmRsZSB0aGUgc2Nyb2xsaW5nIG9mIERBVEEgcm93cyB3ZSBuZWVkIHRvIHVwZGF0ZSBIRUFERVIvRk9PVEVSIHJvd3MgdG8gc2hvdy9oaWRlIGJhc2VkIG9uIHRoZSByYW5nZS5cblxuICAgICAgICAgICAgICBCZWNhdXNlIEhlYWRlci9Gb290ZXIgcm93cyBhcmUgZml4ZWQgd2UgZG8gdGhpcyBieSBoaWRpbmcgdGhlbSB3aXRoIGBkaXNwbGF5OiBub25lYCwgdW5sZXNzIHRoZXkgYXJlIHN0aWNreSAvIHBpbm5lZC5cbiAgICAgICAgICAgICAgT25lIGV4Y2VwdGlvbiBpcyB0aGUgbWFpbiBoZWFkZXIgcm93LCB3aGljaCB3ZSBoaWRlIHZpcnR1YWxseSBiZWNhdXNlIHdlIG5lZWQgaXQgdG8gcmVuZGVyIGFuZCByZWZsZWN0IHRoZSBjZWxsIHNpemUuXG5cbiAgICAgICAgICAgICAgV2UgZmlyc3QgZXh0cmFjdCB0aGUgYWN0dWFsIHJhbmdlcyBmb3IgZWFjaCBzZWN0aW9uIGFuZCB1cGRhdGUgdGhlIGBDZGtUYWJsZWAgd2l0aCB0aGUgREFUQSByb3cgcmFuZ2UuXG4gICAgICAgICAgICAgIFdlIHRoZW4gd2FpdCBmb3IgdGhlIHJvd3MgdG8gcmVuZGVyLCB3aGljaCBpcyB0aGUgdGltZSBmb3IgdXMgdG8gYWxzbyBcInJlbmRlclwiIEhlYWRlci9Gb290ZXIgcm93cy4uLlxuICAgICAgICAgICAgICBXZSBkb24ndCBcInJlbmRlclwiIHRoZW0gcGVyLXNlLCB0aGV5IGFyZSBhbHJlYWR5IHJlbmRlcmVkLCB3ZSBqdXN0IHNob3cvaGlkZSB0aGVtIGJhc2VkIG9uIHRoZSByYW5nZSBhbmQgc3RhdGUgKHN0aWNreSkuXG4gICAgICAgICAgICAgIFRoaXMgaXMgaW1wb3J0YW50LCBoaWRpbmcgd2lsbCBjYXVzZSB0aGUgdG90YWwgaGVpZ2h0IG9mIHRoZSBzY3JvbGwgY29udGFpbmVyIHRvIHNocmluayB0byB0aGUgc2l6ZSBpdCBzaG91bGQgYmUuXG4gICAgICAgICAgICAgIFdlIGRlZmVyIHRoaXMgb3BlcmF0aW9uIHRvIHJ1biBBRlRFUiB0aGUgcm93cyBhcmUgcmVuZGVyZWQgKG5vdCBpbW1lZGlhdGVseSkgYmVjYXVzZSBhbiBpbW1lZGlhdGUgY2hhbmdlIHdpbGwgdHJpZ2dlclxuICAgICAgICAgICAgICBhIGNoYW5nZSBpbiB0aGUgc2Nyb2xsIGNvbnRhaW5lciBzaXplIHJlc3VsdGluZyBpbiBhIHNjcm9sbCBldmVudCB0aGF0IHdpbGwgYnJpbmcgdXMgYmFjayBoZXJlIGJ1dCB0aGlzIHRpbWUgd2l0aFxuICAgICAgICAgICAgICBhIGhlaWdodCB0aGF0IGRvZXMgbm90IGZpdCB0aGUgcmFuZ2UuIEltbWVkaWF0ZSBjaGFuZ2UgcmVtb3ZlcyByb3dzIChIZWFkZXIvRm9vdGVyKSBiZWZvcmUgdGhlIG5ldyByYW5nZSBpcyBhcHBsaWVkLlxuICAgICAgICAgICAgICBPbmx5IGFmdGVyIHRoZSByb3dzIGFyZSByZW5kZXJlZCB3ZSBjYW4gc2hvdy9oaWRlIHRoZSBIZWFkZXIvRm9vdGVyIHJvd3MuXG4gICAgICAgICAgKi9cblxuICAgICAgICAgIC8vIEV4dHJhY3RpbmcgYWN0dWFsIHJhbmdlcyBmb3IgZWFjaCBzZWN0aW9uLlxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gc3BsaXRSYW5nZShyYW5nZSwgdGhpcy5tZXRhUm93c1swXSwgZHMubGVuZ3RoKTtcbiAgICAgICAgICBjb25zdCBbIGhlYWRlciwgZGF0YSwgZm9vdGVyIF0gPSB0aGlzLl9yZW5kZXJlZFJhbmdlcztcblxuICAgICAgICAgIHRoaXMuY2RrVGFibGUub25SZW5kZXJSb3dzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIFdlIHVwZGF0ZSB0aGUgaGVhZGVyIERPTSBlbGVtZW50cyBpbiByZXZlcnNlLCBza2lwcGluZyB0aGUgbGFzdCAoZmlyc3Qgd2hlbiByZXZlcnNlZCkgRE9NIGVsZW1lbnQuXG4gICAgICAgICAgICAvLyBUaGUgc2tpcHBlZCBlbGVtZW50IGlzIHRoZSBncmlkJ3MgaGVhZGVyIHJvdyB0aGF0IG11c3Qga2VlcCB0cmFjayBvZiB0aGUgbGF5b3V0IGZvciBpbnRlcm5hbCBzaXplIGNhbGN1bGF0aW9uIChlLmcuIGdyb3VwIGhlYWRlciByb3dzKS5cbiAgICAgICAgICAgIC8vIEFuIGhpZGRlbiByb3cgaXMgb25lIHRoYXQgaXMgb3V0IG9mIHJhbmdlIEFORCBub3Qgc3RpY2t5XG4gICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGh0bWxSb3dzID0gdGhpcy5oZWFkZXIucm93cztcbiAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWRSb3dzID0gdGhpcy5oZWFkZXIucmVuZGVyZWQ7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVJvd3MgPSB0aGlzLmhlYWRlci5zdGlja3k7XG4gICAgICAgICAgICAgIGxldCByb3dJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgbGVuID0gdGhpcy5oZWFkZXIuc3RpY2t5Lmxlbmd0aCAtIDE7IHJvd0luZGV4IDwgbGVuOyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzaWduIHJlbmRlcmVkIHN0YXRlICsgaWYgbm90IHJlbmRlcmVkIGFuZCBub3Qgc3RpY2t5LCBzZXQgZGlzcGxheSB0byBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5zdHlsZS5kaXNwbGF5ID0gIShyZW5kZXJlZFJvd3Nbcm93SW5kZXhdID0gcm93SW5kZXggPj0gaGVhZGVyLnN0YXJ0KSAmJiAhc3RpY2t5Um93c1tyb3dJbmRleF1cbiAgICAgICAgICAgICAgICAgID8gJ25vbmUnXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBIZXJlIHdlIHVwZGF0ZSB0aGUgbWFpbiBoZWFkZXIgcm93LCB3aGVuIHdlIG5lZWQgdG8gaGlkZSBpdCB3ZSBhcHBseSBhIGNsYXNzIHRoYXQgd2lsbCBoaWRlIGl0IHZpcnR1YWxseSwgaS5lLiBub3Qgc2hvd2luZyBidXQga2VlcGluZyBpbnRlcm5hbCBsYXlvdXQuXG4gICAgICAgICAgICAgIGlmICghKHJlbmRlcmVkUm93c1tyb3dJbmRleF0gPSByb3dJbmRleCA+PSBoZWFkZXIuc3RhcnQpICYmICFzdGlja3lSb3dzW3Jvd0luZGV4XSkge1xuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtcm93LXZpc3VhbGx5LWhpZGRlbicpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZC5zaG93SGVhZGVyICYmIGh0bWxSb3dzW3Jvd0luZGV4XSkge1xuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdwYmwtbmdyaWQtcm93LXZpc3VhbGx5LWhpZGRlbicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvb3Rlckxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgaHRtbFJvd3MgPSB0aGlzLmZvb3Rlci5yb3dzO1xuICAgICAgICAgICAgICBjb25zdCByZW5kZXJlZFJvd3MgPSB0aGlzLmZvb3Rlci5yZW5kZXJlZDtcbiAgICAgICAgICAgICAgY29uc3Qgc3RpY2t5Um93cyA9IHRoaXMuZm9vdGVyLnN0aWNreTtcbiAgICAgICAgICAgICAgbGV0IHJvd0luZGV4ID0gMDtcbiAgICAgICAgICAgICAgZm9yIChjb25zdCBsZW4gPSB0aGlzLmZvb3Rlci5zdGlja3kubGVuZ3RoOyByb3dJbmRleCA8IGxlbjsgcm93SW5kZXgrKykge1xuICAgICAgICAgICAgICAgIC8vIGFzc2lnbiByZW5kZXJlZCBzdGF0ZSArIGlmIG5vdCByZW5kZXJlZCBhbmQgbm90IHN0aWNreSwgc2V0IGRpc3BsYXkgdG8gXCJub25lXCJcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uc3R5bGUuZGlzcGxheSA9ICEocmVuZGVyZWRSb3dzW3Jvd0luZGV4XSA9IHJvd0luZGV4IDwgZm9vdGVyLmVuZCkgJiYgIXN0aWNreVJvd3Nbcm93SW5kZXhdXG4gICAgICAgICAgICAgICAgICA/ICdub25lJ1xuICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLmNka1RhYmxlLnZpZXdDaGFuZ2UubmV4dChkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGFkZCBtZXRhIHJvd3MgdG8gdGhlIHRvdGFsIHJvdyBjb3VudC5cbiAgICAgIHRoaXMuZGF0YVN0cmVhbSA9IGRzLm9uUmVuZGVyRGF0YUNoYW5naW5nXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICAgICAgbWFwKCAoe2RhdGF9KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXRhUm93cyA9IHRoaXMubWV0YVJvd3MgPSBbIHRoaXMuaGVhZGVyLnJvd3MubGVuZ3RoLCB0aGlzLmZvb3Rlci5yb3dzLmxlbmd0aCBdO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheSggZGF0YS5sZW5ndGggKyBtZXRhUm93c1swXSArIG1ldGFSb3dzWzFdICk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgIGRzLm9uUmVuZGVyZWREYXRhQ2hhbmdlZFxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIG1hcCggKCkgPT4gZHMubGVuZ3RoICksXG4gICAgICAgICAgc3RhcnRXaXRoKDApLFxuICAgICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgICAgZmlsdGVyKCAoW3ByZXYsIGN1cnJdKSA9PiBwcmV2ICE9PSBjdXJyICksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggKFtwcmV2LCBjdXJyXSkgPT4ge1xuICAgICAgICAgIHRoaXMubmdab25lLm9uU3RhYmxlLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLnZpZXdwb3J0Lm9uU291cmNlTGVuZ3RoQ2hhbmdlKHByZXYsIGN1cnIpICk7XG4gICAgICAgIH0pO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LmF0dGFjaCh0aGlzIGFzIGFueSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBkZXRhY2hWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMuZHMgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy52aWV3cG9ydC5kZXRhY2goKTtcbiAgfVxufVxuIl19