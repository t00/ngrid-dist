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
        function (event) {
            if (event.kind === 'onDataSource') {
                _this.detachView();
                _this.attachView(event.curr);
            }
        }));
        this.attachView(extApi.table.ds);
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
                _this._renderedRanges = splitRange(range, _this.metaRows[0], ds.length);
                var _a = tslib_1.__read(_this._renderedRanges, 3), header = _a[0], data = _a[1], footer = _a[2];
                _this.cdkTable.onRenderRows.pipe(take(1)).subscribe((/**
                 * @return {?}
                 */
                function () {
                    // We update the header DOM elements in reverse, skipping the last (first when reversed) DOM element.
                    // The skipped element is the table's header row that must keep track of the layout for internal size calculation (e.g. group header rows).
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
                        else if (_this.table.showHeader && htmlRows[rowIndex]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlydHVhbC1zY3JvbGwtZm9yLW9mLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9mZWF0dXJlcy92aXJ0dWFsLXNjcm9sbC92aXJ0dWFsLXNjcm9sbC1mb3Itb2YudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQU8sU0FBUyxFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU90RyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUl2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFxQixNQUFNLFNBQVMsQ0FBQztBQUM1RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7SUFFekQsaUJBQWlCLEdBQUcsSUFBSTs7Ozs7O0FBRTlCLFNBQVMsV0FBVyxDQUFDLENBQW9CLEVBQUUsQ0FBb0IsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUM7QUFBQSxDQUFDOzs7O0FBRTlGLDRDQUlDOzs7SUFIQyw4Q0FBOEI7O0lBQzlCLDJDQUEyQjs7SUFDM0IsOENBQThCOzs7OztBQUdoQzs7OztJQWtDRSwrQkFBb0IsTUFBK0IsRUFBVSxNQUFjO1FBQTNFLGlCQThIQztRQTlIbUIsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBekJuRSxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQWFoQywwQkFBcUIsR0FBRyxDQUFDLENBQUM7Ozs7UUFJMUIsYUFBUSxHQUFxQixD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ZXJ2YWJsZSwgU3ViamVjdCwgZnJvbUV2ZW50LCByYWNlLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBzdGFydFdpdGgsIHBhaXJ3aXNlLCB0YWtlLCB0YXAsIHRha2VVbnRpbCwgbWFwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5nWm9uZSwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvblZpZXdlciwgTGlzdFJhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvbGxlY3Rpb25zJztcblxuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi8uLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgUGJsRGF0YVNvdXJjZSB9IGZyb20gJy4uLy4uLy4uL2RhdGEtc291cmNlL2RhdGEtc291cmNlJztcbmltcG9ydCB7IFBibENka1RhYmxlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vcGJsLWNkay10YWJsZS9wYmwtY2RrLXRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYmxDZGtWaXJ0dWFsU2Nyb2xsVmlld3BvcnRDb21wb25lbnQgfSBmcm9tICcuL3ZpcnR1YWwtc2Nyb2xsLXZpZXdwb3J0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBzcGxpdFJhbmdlLCB1cGRhdGVTdGlja3lSb3dzLCBtZWFzdXJlUmFuZ2VTaXplLCBTdGlja3lEaXJlY3Rpb25WdCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgTWV0YVJvd1N0aWNreVNjcm9sbCB9IGZyb20gJy4vbWV0YS1yb3ctc3RpY2t5LXNjcm9sbCc7XG5cbmNvbnN0IEZJWEVEX0hFQURFUl9NT0RFID0gdHJ1ZTtcblxuZnVuY3Rpb24gc29ydEJ5SW5kZXgoYTogeyBpbmRleDogbnVtYmVyIH0sIGI6IHsgaW5kZXg6IG51bWJlciB9KSB7IHJldHVybiBhLmluZGV4IC0gYi5pbmRleCB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIE5nZVZpcnR1YWxUYWJsZVJvd0luZm8ge1xuICByZWFkb25seSBoZWFkZXJMZW5ndGg6IG51bWJlcjtcbiAgcmVhZG9ubHkgcm93TGVuZ3RoOiBudW1iZXI7XG4gIHJlYWRvbmx5IGZvb3Rlckxlbmd0aDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUGJsVmlydHVhbFNjcm9sbEZvck9mPFQ+IGltcGxlbWVudHMgQ29sbGVjdGlvblZpZXdlciwgTmdlVmlydHVhbFRhYmxlUm93SW5mbyB7XG4gIHZpZXdDaGFuZ2U6IE9ic2VydmFibGU8TGlzdFJhbmdlPjtcblxuICBkYXRhU3RyZWFtOiBPYnNlcnZhYmxlPFRbXSB8IFJlYWRvbmx5QXJyYXk8VD4+O1xuXG4gIGdldCBoZWFkZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuaGVhZGVyLnJvd3MubGVuZ3RoICB9XG4gIGdldCByb3dMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmNSZWZzLmRhdGEubGVuZ3RoICB9XG4gIGdldCBmb290ZXJMZW5ndGgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuZm9vdGVyLnJvd3MubGVuZ3RoICB9XG5cbiAgcHJpdmF0ZSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGRzOiBQYmxEYXRhU291cmNlPFQ+O1xuXG4gIHByaXZhdGUgZ2V0IHZjUmVmcygpOiBSZWNvcmQ8J2hlYWRlcicgfCAnZGF0YScgfCAnZm9vdGVyJywgVmlld0NvbnRhaW5lclJlZj4ge1xuICAgIGNvbnN0IHZhbHVlID0ge1xuICAgICAgaGVhZGVyOiB0aGlzLmNka1RhYmxlLl9oZWFkZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICAgIGRhdGE6IHRoaXMuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyLFxuICAgICAgZm9vdGVyOiB0aGlzLmNka1RhYmxlLl9mb290ZXJSb3dPdXRsZXQudmlld0NvbnRhaW5lcixcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndmNSZWZzJywgeyB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyZWRDb250ZW50T2Zmc2V0ID0gMDtcbiAgLyoqIEEgdHVwbGUgY29udGFpbmluZyB0aGUgbGFzdCBrbm93biByYW5nZXMgW2hlYWRlciwgZGF0YSwgZm9vdGVyXSAqL1xuICBwcml2YXRlIF9yZW5kZXJlZFJhbmdlczogW0xpc3RSYW5nZSwgTGlzdFJhbmdlLCBMaXN0UmFuZ2VdO1xuICAvKiogVGhlIGxlbmd0aCBvZiBtZXRhIHJvd3MgWzBdID0gaGVhZGVyIFsxXSA9IGZvb3RlciAqL1xuICBwcml2YXRlIG1ldGFSb3dzOiBbbnVtYmVyLCBudW1iZXJdID0gWzAsIDBdO1xuXG4gIHByaXZhdGUgaGVhZGVyID0geyByb3dzOiBbXSBhcyBIVE1MRWxlbWVudFtdLCBzdGlja3k6IFtdIGFzIGJvb2xlYW5bXSwgcmVuZGVyZWQ6IFtdIGFzIGJvb2xlYW5bXSB9O1xuICBwcml2YXRlIGZvb3RlciA9IHsgcm93czogW10gYXMgSFRNTEVsZW1lbnRbXSwgc3RpY2t5OiBbXSBhcyBib29sZWFuW10sIHJlbmRlcmVkOiBbXSBhcyBib29sZWFuW10gfTtcblxuICBwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcbiAgcHJpdmF0ZSBjZGtUYWJsZTogUGJsQ2RrVGFibGVDb21wb25lbnQ8VD47XG4gIHByaXZhdGUgdmlld3BvcnQ6IFBibENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydENvbXBvbmVudDtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+LCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgdGhpcy50YWJsZSA9IGV4dEFwaS50YWJsZTtcbiAgICB0aGlzLmNka1RhYmxlID0gZXh0QXBpLmNka1RhYmxlO1xuICAgIHRoaXMudmlld3BvcnQgPSBleHRBcGkudGFibGUudmlld3BvcnQ7XG5cbiAgICB0aGlzLnZpZXdDaGFuZ2UgPSB0aGlzLmNka1RhYmxlLnZpZXdDaGFuZ2U7XG5cbiAgICBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChleHRBcGkudGFibGUpLmV2ZW50c1xuICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgICAgICB0aGlzLmRldGFjaFZpZXcoKTtcbiAgICAgICAgICB0aGlzLmF0dGFjaFZpZXcoZXZlbnQuY3Vycik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuYXR0YWNoVmlldyhleHRBcGkudGFibGUuZHMpO1xuXG4gICAgZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLnN5bmNcbiAgICAgIC5waXBlKCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpIClcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IGV4dEFwaS5tZXRhUm93U2VydmljZS5oZWFkZXIucm93LmNvbmNhdChleHRBcGkubWV0YVJvd1NlcnZpY2UuaGVhZGVyLnN0aWNreSkuc29ydChzb3J0QnlJbmRleCk7XG4gICAgICAgIGNvbnN0IGZvb3RlcnMgPSBleHRBcGkubWV0YVJvd1NlcnZpY2UuZm9vdGVyLnJvdy5jb25jYXQoZXh0QXBpLm1ldGFSb3dTZXJ2aWNlLmZvb3Rlci5zdGlja3kpLnNvcnQoc29ydEJ5SW5kZXgpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyLnJvd3MgPSBoZWFkZXJzLm1hcCggaCA9PiBoLmVsICk7XG4gICAgICAgIHRoaXMuaGVhZGVyLnN0aWNreSA9IGhlYWRlcnMubWFwKCBoID0+IGgucm93RGVmLnR5cGUgPT09ICdzdGlja3knICk7XG4gICAgICAgIHRoaXMuZm9vdGVyLnJvd3MgPSBmb290ZXJzLm1hcCggaCA9PiBoLmVsICk7XG4gICAgICAgIHRoaXMuZm9vdGVyLnN0aWNreSA9IGZvb3RlcnMubWFwKCBoID0+IGgucm93RGVmLnR5cGUgPT09ICdzdGlja3knICk7XG5cbiAgICAgICAgdXBkYXRlU3RpY2t5Um93cyh0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCwgdGhpcy5oZWFkZXIucm93cywgdGhpcy5oZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgICAgIHVwZGF0ZVN0aWNreVJvd3ModGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQsIHRoaXMuZm9vdGVyLnJvd3MsIHRoaXMuZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgICAgfSk7XG5cbiAgICBpZiAoRklYRURfSEVBREVSX01PREUpIHtcbiAgICAgIGxldCBvZmZzZXQgPSAwO1xuICAgICAgY29uc3Qgdmlld1BvcnQgPSB0aGlzLnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IG1ldGFSb3dTdGlja3lTY3JvbGwgPSBuZXcgTWV0YVJvd1N0aWNreVNjcm9sbCh0aGlzLnZpZXdwb3J0LCB2aWV3UG9ydCwgeyBoZWFkZXI6IHRoaXMuaGVhZGVyLCBmb290ZXI6IHRoaXMuZm9vdGVyIH0pO1xuICAgICAgbGV0IHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XG5cbiAgICAgIGNvbnN0IHdoZWVsTGlzdGVuID0gKCkgPT4gdmlld1BvcnQuYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCBoYW5kbGVyLCB0cnVlKTtcbiAgICAgIGNvbnN0IHdoZWVsVW5MaXN0ZW4gPSAoKSA9PiB2aWV3UG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIGhhbmRsZXIsIHRydWUpO1xuICAgICAgY29uc3QgdXBkYXRlU2Nyb2xsUG9zaXRpb24gPSAoKSA9PiBzY3JvbGxQb3NpdGlvbiA9ICh0aGlzLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKSkgLyAodGhpcy52aWV3cG9ydC5zY3JvbGxIZWlnaHQgLSB0aGlzLnZpZXdwb3J0LmdldFZpZXdwb3J0U2l6ZSgpKTtcblxuICAgICAgY29uc3QgaGFuZGxlciA9IChldmVudDogV2hlZWxFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGVsdGFZKSB7XG4gICAgICAgICAgaWYgKCAoc2Nyb2xsUG9zaXRpb24gPT09IDEgJiYgZXZlbnQuZGVsdGFZID4gMCkgfHwgKG9mZnNldCA9PT0gMCAmJiBldmVudC5kZWx0YVkgPCAwKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgbmV3T2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnQuZGVsdGFZO1xuICAgICAgICAgIG5ld09mZnNldCA9IE1hdGgubWluKHRoaXMudmlld3BvcnQuc2Nyb2xsSGVpZ2h0LCBNYXRoLm1heCgwLCBuZXdPZmZzZXQpKTtcblxuICAgICAgICAgIGlmIChuZXdPZmZzZXQgIT09IG9mZnNldCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gbmV3T2Zmc2V0O1xuICAgICAgICAgICAgaWYgKG1ldGFSb3dTdGlja3lTY3JvbGwuY2FuTW92ZSgpICYmIG1ldGFSb3dTdGlja3lTY3JvbGwubW92ZShldmVudC5kZWx0YVksIHZpZXdQb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpKSkge1xuICAgICAgICAgICAgICBjb25zdCBzY3JvbGxFbmQkID0gdGhpcy52aWV3cG9ydC5zY3JvbGxpbmcucGlwZShmaWx0ZXIoIHMgPT4gIXMgKSk7XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVzdG9yZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBtZXRhUm93U3RpY2t5U2Nyb2xsLnJlc3RvcmUodGhpcy5yZW5kZXJlZENvbnRlbnRPZmZzZXQpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgbGV0IHJlbW92ZWRFdmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAodGhpcy52aWV3cG9ydC53aGVlbE1vZGUgIT09ICdibG9ja2luZycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3aGVlbE1vZGUgPSB0aGlzLnZpZXdwb3J0LndoZWVsTW9kZTtcbiAgICAgICAgICAgICAgICBpZiAod2hlZWxNb2RlID09PSAncGFzc2l2ZScpIHtcbiAgICAgICAgICAgICAgICAgIHdoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMudmlld3BvcnQuc2Nyb2xsaW5nLnBpcGUoZGVib3VuY2VUaW1lKDE1MCksIGZpbHRlciggcyA9PiAhcyApLCB0YWtlKDEpKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIHdoZWVsTGlzdGVuKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbEZyYW1lUmF0ZVxuICAgICAgICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwoc2Nyb2xsRW5kJC5waXBlKHRha2UoMSkpKSlcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgICBmcmFtZVJhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZW1vdmVkRXZlbnQgJiYgZnJhbWVSYXRlIDwgd2hlZWxNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWVsVW5MaXN0ZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZEV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdFdoZWVsJCA9IGZyb21FdmVudCh2aWV3UG9ydCwgJ3doZWVsJykucGlwZShkZWJvdW5jZVRpbWUoNTApLCB0YWtlKDEpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhY2UobGFzdFdoZWVsJCwgdGltZXIoNTEpIGFzIGFueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVtb3ZlZEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVlbExpc3RlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHJlc3RvcmUgYmFjayBhZnRlciAxMDAgbXMsIGZvciBzb21lIHJlYXNvbiwgaWYgaXQncyBpbW1lZGlhdGUsIHdlIGhpdCBhIGN5Y2xlIG9mIHdoZWVsL3Njcm9sbC9uby1zY3JvbGwgYW5kIG5vdCB3aGVlbC9zY3JvbGwvV0FJSUlJSVQvbm8tc2Nyb2xcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogbWF5YmUgd2UgY2FuIG1lYXN1cmUgdGltZSBiZXR3ZWVuIG5vLXNjcm9sbGluZyBhbmQgd2hlZWwgdG8gZmluZCB0aGlzIE1TIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICBPUiwgcmVnaXN0ZXIgYSB0ZW1wIGB3aGVlbGAgbGlzdGVuZXIgdGhhdCB3aWxsIGRldGVjdCB3aGVlbCBlbmQgYW5kIHJlLXJlZ2lzdGVyIHRoZSBvcmlnaW5hbCBoYW5kbGVyLlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsRW5kJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZShyZXN0b3JlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbFRvT2Zmc2V0KG9mZnNldCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHVwZGF0ZVNjcm9sbFBvc2l0aW9uKCk7XG4gICAgICB3aGVlbExpc3RlbigpO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LnNjcm9sbGluZy5zdWJzY3JpYmUoIGlzU2Nyb2xsaW5nID0+IHtcbiAgICAgICAgaWYgKCFpc1Njcm9sbGluZykge1xuICAgICAgICAgIG9mZnNldCA9IHRoaXMudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXdwb3J0Lm9mZnNldENoYW5nZVxuICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgLnN1YnNjcmliZSggb2Zmc2V0ID0+IHtcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyZWRDb250ZW50T2Zmc2V0ICE9PSBvZmZzZXQpIHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVkQ29udGVudE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICB1cGRhdGVTdGlja3lSb3dzKG9mZnNldCwgdGhpcy5oZWFkZXIucm93cywgdGhpcy5oZWFkZXIuc3RpY2t5LCAndG9wJyk7XG4gICAgICAgICAgdXBkYXRlU3RpY2t5Um93cyhvZmZzZXQsIHRoaXMuZm9vdGVyLnJvd3MsIHRoaXMuZm9vdGVyLnN0aWNreSwgJ2JvdHRvbScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNZWFzdXJlcyB0aGUgY29tYmluZWQgc2l6ZSAod2lkdGggZm9yIGhvcml6b250YWwgb3JpZW50YXRpb24sIGhlaWdodCBmb3IgdmVydGljYWwpIG9mIGFsbCBpdGVtc1xuICAgKiBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLiBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIHJhbmdlIGluY2x1ZGVzIGl0ZW1zIHRoYXQgYXJlIG5vdCBjdXJyZW50bHlcbiAgICogcmVuZGVyZWQuXG4gICAqL1xuICBtZWFzdXJlUmFuZ2VTaXplKHJhbmdlOiBMaXN0UmFuZ2UsIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKTogbnVtYmVyIHtcbiAgICBpZiAocmFuZ2Uuc3RhcnQgPj0gcmFuZ2UuZW5kKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJlZFJhbmdlcyA9IHRoaXMuX3JlbmRlcmVkUmFuZ2VzO1xuICAgIGNvbnN0IHJhbmdlcyA9IHNwbGl0UmFuZ2UocmFuZ2UsIHRoaXMubWV0YVJvd3NbMF0sIHRoaXMuZHMubGVuZ3RoKTtcbiAgICBjb25zdCBzdGlja3lTdGF0ZXMgPSBbIHRoaXMuaGVhZGVyLnN0aWNreSwgW10sIHRoaXMuZm9vdGVyLnN0aWNreSBdO1xuXG4gICAgY29uc3QgdmNSZWZzID0gW3RoaXMudmNSZWZzLmhlYWRlciwgdGhpcy52Y1JlZnMuZGF0YSwgdGhpcy52Y1JlZnMuZm9vdGVyXTtcbiAgICBjb25zdCB2Y1JlZlNpemVSZWR1Y2VyID0gKHRvdGFsOiBudW1iZXIsIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLCBpbmRleDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgICAgIHJldHVybiB0b3RhbCArIG1lYXN1cmVSYW5nZVNpemUodmNSZWYsIHJhbmdlc1tpbmRleF0sIHJlbmRlcmVkUmFuZ2VzW2luZGV4XSwgb3JpZW50YXRpb24sIHN0aWNreVN0YXRlc1tpbmRleF0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gdmNSZWZzLnJlZHVjZSh2Y1JlZlNpemVSZWR1Y2VyLCAwKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXRhY2hWaWV3KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveWVkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIGF0dGFjaFZpZXcoZHM6IFBibERhdGFTb3VyY2U8VD4pOiB2b2lkIHtcbiAgICBpZiAoZHMpIHtcbiAgICAgIHRoaXMuZHMgPSBkcztcbiAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gWyB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSwgdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLnZhbHVlLCB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSBdO1xuXG4gICAgICB0aGlzLnZpZXdwb3J0LnJlbmRlcmVkUmFuZ2VTdHJlYW1cbiAgICAgICAgLnBpcGUoIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkgKVxuICAgICAgICAuc3Vic2NyaWJlKCByYW5nZSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaGVhZGVyTGVuZ3RoICsgdGhpcy5mb290ZXJMZW5ndGggPT09IDApIHsgLy8gaWYgbm8gcm93L3N0aWNreSBtZXRhIHJvd3MsIG1vdmUgb24uLi5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVkUmFuZ2VzID0gWyB7IHN0YXJ0OiAwLCBlbmQ6IDAgfSwgcmFuZ2UsIHsgc3RhcnQ6IDAsIGVuZDogMCB9IF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLm5leHQocmFuZ2UpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qICBXSEFUIElTIEdPSU5HIE9OIEhFUkU/ICovXG5cbiAgICAgICAgICAvKiAgVGFibGUgcm93cyBhcmUgc3BsaXQgaW50byAzIHNlY3Rpb25zOiBIZWFkZXIsIERhdGEsIEZvb3Rlci5cbiAgICAgICAgICAgICAgSW4gdGhlIHZpcnR1YWwgcGxheWdyb3VuZCBvbmx5IERBVEEgcm93cyBhcmUgZHluYW1pYy4gSGVhZGVyICYgRm9vdGVyIHJvd3MgYXJlIGZpeGVkLlxuXG4gICAgICAgICAgICAgIFRoZSBgQ2RrVGFibGVgIHdvcmtzIHRoZSBzYW1lLCBhbHNvIGhhdmUgdGhlIHNhbWUgc2VjdGlvbnMgd2l0aCBhIHN0cmVhbSBBUEkgZm9yIERBVEEgcm93cyBvbmx5LlxuICAgICAgICAgICAgICBgQ2RrVGFibGUudmlld0NoYW5nZS5uZXh0KFJBTkdFKWAgd2lsbCBlbWl0IHRvIHRoZSBkYXRhc291cmNlIHdoaWNoIHdpbGwgcmVzdWx0IGluIGEgbmV3IGRhdGEgc2VjdGlvbiBmcm9tIHRoZSBkYXRhc291cmNlLlxuXG4gICAgICAgICAgICAgIGBDZGtUYWJsZWAgYWxvbmUgZG9lcyBub3Qgc3VwcG9ydCB2aXJ0dWFsIHNjcm9sbGluZywgdG8gYWNoaWV2ZSBpdCB3ZSB1c2UgYSB2aXJ0dWFsIHNjcm9sbCB2aWV3cG9ydCB3aGljaCB3cmFwcyB0aGUgZW50aXJlIGBDZGtUYWJsZWAuXG4gICAgICAgICAgICAgIFRoaXMgbWVhbnMgdGhhdCBBTEwgc2VjdGlvbnMgYXJlIHdyYXBwZWQgKGhlbmNlIHNjcm9sbGVkIG92ZXIpIGJ1dCBvbmx5IERBVEEgcm93cyBhcmUgbW92aW5nLi4uXG5cbiAgICAgICAgICAgICAgRWFjaCBlbWlzc2lvbiBvZiBgTGlzdFJhbmdlYCBpbiBgcmVuZGVyZWRSYW5nZVN0cmVhbWAgaXMgYmFzZWQgb24gc2l6ZSBjYWxjdWxhdGlvbiBvZiBBTEwgc2VjdGlvbnMgKHNlZSBgbWVhc3VyZVJhbmdlU2l6ZWAgYWJvdmUpXG4gICAgICAgICAgICAgIGFuZCB3ZSBuZWVkIHRvIGV4dHJhY3QgdGhlIHJlbGV2YW50IHJhbmdlIGZvciBEQVRBIHJvd3Mgb25seSBhbmQgcGFzcyBpdCBvbiB0byB0aGUgdGFibGUuXG5cbiAgICAgICAgICAgICAgVG8gbWFrZSB0aGlzIHdvcmsgd2UgbmVlZCB0byBleHRyYWN0IEhlYWRlci9Gb290ZXIgcm93cyBiYXNlZCBvbiB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHJhbmdlIGFuZCBoYW5kbGUgdGhlbSBhcyB3ZWxsLlxuICAgICAgICAgICAgICBCZWNhdXNlIHRoZSB0YWJsZSB3aWxsIG9ubHkgaGFuZGxlIHRoZSBzY3JvbGxpbmcgb2YgREFUQSByb3dzIHdlIG5lZWQgdG8gdXBkYXRlIEhFQURFUi9GT09URVIgcm93cyB0byBzaG93L2hpZGUgYmFzZWQgb24gdGhlIHJhbmdlLlxuXG4gICAgICAgICAgICAgIEJlY2F1c2UgSGVhZGVyL0Zvb3RlciByb3dzIGFyZSBmaXhlZCB3ZSBkbyB0aGlzIGJ5IGhpZGluZyB0aGVtIHdpdGggYGRpc3BsYXk6IG5vbmVgLCB1bmxlc3MgdGhleSBhcmUgc3RpY2t5IC8gcGlubmVkLlxuICAgICAgICAgICAgICBPbmUgZXhjZXB0aW9uIGlzIHRoZSBtYWluIGhlYWRlciByb3csIHdoaWNoIHdlIGhpZGUgdmlydHVhbGx5IGJlY2F1c2Ugd2UgbmVlZCBpdCB0byByZW5kZXIgYW5kIHJlZmxlY3QgdGhlIGNlbGwgc2l6ZS5cblxuICAgICAgICAgICAgICBXZSBmaXJzdCBleHRyYWN0IHRoZSBhY3R1YWwgcmFuZ2VzIGZvciBlYWNoIHNlY3Rpb24gYW5kIHVwZGF0ZSB0aGUgYENka1RhYmxlYCB3aXRoIHRoZSBEQVRBIHJvdyByYW5nZS5cbiAgICAgICAgICAgICAgV2UgdGhlbiB3YWl0IGZvciB0aGUgcm93cyB0byByZW5kZXIsIHdoaWNoIGlzIHRoZSB0aW1lIGZvciB1cyB0byBhbHNvIFwicmVuZGVyXCIgSGVhZGVyL0Zvb3RlciByb3dzLi4uXG4gICAgICAgICAgICAgIFdlIGRvbid0IFwicmVuZGVyXCIgdGhlbSBwZXItc2UsIHRoZXkgYXJlIGFscmVhZHkgcmVuZGVyZWQsIHdlIGp1c3Qgc2hvdy9oaWRlIHRoZW0gYmFzZWQgb24gdGhlIHJhbmdlIGFuZCBzdGF0ZSAoc3RpY2t5KS5cbiAgICAgICAgICAgICAgVGhpcyBpcyBpbXBvcnRhbnQsIGhpZGluZyB3aWxsIGNhdXNlIHRoZSB0b3RhbCBoZWlnaHQgb2YgdGhlIHNjcm9sbCBjb250YWluZXIgdG8gc2hyaW5rIHRvIHRoZSBzaXplIGl0IHNob3VsZCBiZS5cbiAgICAgICAgICAgICAgV2UgZGVmZXIgdGhpcyBvcGVyYXRpb24gdG8gcnVuIEFGVEVSIHRoZSByb3dzIGFyZSByZW5kZXJlZCAobm90IGltbWVkaWF0ZWx5KSBiZWNhdXNlIGFuIGltbWVkaWF0ZSBjaGFuZ2Ugd2lsbCB0cmlnZ2VyXG4gICAgICAgICAgICAgIGEgY2hhbmdlIGluIHRoZSBzY3JvbGwgY29udGFpbmVyIHNpemUgcmVzdWx0aW5nIGluIGEgc2Nyb2xsIGV2ZW50IHRoYXQgd2lsbCBicmluZyB1cyBiYWNrIGhlcmUgYnV0IHRoaXMgdGltZSB3aXRoXG4gICAgICAgICAgICAgIGEgaGVpZ2h0IHRoYXQgZG9lcyBub3QgZml0IHRoZSByYW5nZS4gSW1tZWRpYXRlIGNoYW5nZSByZW1vdmVzIHJvd3MgKEhlYWRlci9Gb290ZXIpIGJlZm9yZSB0aGUgbmV3IHJhbmdlIGlzIGFwcGxpZWQuXG4gICAgICAgICAgICAgIE9ubHkgYWZ0ZXIgdGhlIHJvd3MgYXJlIHJlbmRlcmVkIHdlIGNhbiBzaG93L2hpZGUgdGhlIEhlYWRlci9Gb290ZXIgcm93cy5cbiAgICAgICAgICAqL1xuXG4gICAgICAgICAgLy8gRXh0cmFjdGluZyBhY3R1YWwgcmFuZ2VzIGZvciBlYWNoIHNlY3Rpb24uXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZWRSYW5nZXMgPSBzcGxpdFJhbmdlKHJhbmdlLCB0aGlzLm1ldGFSb3dzWzBdLCBkcy5sZW5ndGgpO1xuICAgICAgICAgIGNvbnN0IFsgaGVhZGVyLCBkYXRhLCBmb290ZXIgXSA9IHRoaXMuX3JlbmRlcmVkUmFuZ2VzO1xuXG4gICAgICAgICAgdGhpcy5jZGtUYWJsZS5vblJlbmRlclJvd3MucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gV2UgdXBkYXRlIHRoZSBoZWFkZXIgRE9NIGVsZW1lbnRzIGluIHJldmVyc2UsIHNraXBwaW5nIHRoZSBsYXN0IChmaXJzdCB3aGVuIHJldmVyc2VkKSBET00gZWxlbWVudC5cbiAgICAgICAgICAgIC8vIFRoZSBza2lwcGVkIGVsZW1lbnQgaXMgdGhlIHRhYmxlJ3MgaGVhZGVyIHJvdyB0aGF0IG11c3Qga2VlcCB0cmFjayBvZiB0aGUgbGF5b3V0IGZvciBpbnRlcm5hbCBzaXplIGNhbGN1bGF0aW9uIChlLmcuIGdyb3VwIGhlYWRlciByb3dzKS5cbiAgICAgICAgICAgIC8vIEFuIGhpZGRlbiByb3cgaXMgb25lIHRoYXQgaXMgb3V0IG9mIHJhbmdlIEFORCBub3Qgc3RpY2t5XG4gICAgICAgICAgICBpZiAodGhpcy5oZWFkZXJMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGh0bWxSb3dzID0gdGhpcy5oZWFkZXIucm93cztcbiAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWRSb3dzID0gdGhpcy5oZWFkZXIucmVuZGVyZWQ7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVJvd3MgPSB0aGlzLmhlYWRlci5zdGlja3k7XG4gICAgICAgICAgICAgIGxldCByb3dJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgbGVuID0gdGhpcy5oZWFkZXIuc3RpY2t5Lmxlbmd0aCAtIDE7IHJvd0luZGV4IDwgbGVuOyByb3dJbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgLy8gYXNzaWduIHJlbmRlcmVkIHN0YXRlICsgaWYgbm90IHJlbmRlcmVkIGFuZCBub3Qgc3RpY2t5LCBzZXQgZGlzcGxheSB0byBcIm5vbmVcIlxuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5zdHlsZS5kaXNwbGF5ID0gIShyZW5kZXJlZFJvd3Nbcm93SW5kZXhdID0gcm93SW5kZXggPj0gaGVhZGVyLnN0YXJ0KSAmJiAhc3RpY2t5Um93c1tyb3dJbmRleF1cbiAgICAgICAgICAgICAgICAgID8gJ25vbmUnXG4gICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBIZXJlIHdlIHVwZGF0ZSB0aGUgbWFpbiBoZWFkZXIgcm93LCB3aGVuIHdlIG5lZWQgdG8gaGlkZSBpdCB3ZSBhcHBseSBhIGNsYXNzIHRoYXQgd2lsbCBoaWRlIGl0IHZpcnR1YWxseSwgaS5lLiBub3Qgc2hvd2luZyBidXQga2VlcGluZyBpbnRlcm5hbCBsYXlvdXQuXG4gICAgICAgICAgICAgIGlmICghKHJlbmRlcmVkUm93c1tyb3dJbmRleF0gPSByb3dJbmRleCA+PSBoZWFkZXIuc3RhcnQpICYmICFzdGlja3lSb3dzW3Jvd0luZGV4XSkge1xuICAgICAgICAgICAgICAgIGh0bWxSb3dzW3Jvd0luZGV4XS5jbGFzc0xpc3QuYWRkKCdwYmwtbmdyaWQtcm93LXZpc3VhbGx5LWhpZGRlbicpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFibGUuc2hvd0hlYWRlciAmJiBodG1sUm93c1tyb3dJbmRleF0pIHtcbiAgICAgICAgICAgICAgICBodG1sUm93c1tyb3dJbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgncGJsLW5ncmlkLXJvdy12aXN1YWxseS1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5mb290ZXJMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGh0bWxSb3dzID0gdGhpcy5mb290ZXIucm93cztcbiAgICAgICAgICAgICAgY29uc3QgcmVuZGVyZWRSb3dzID0gdGhpcy5mb290ZXIucmVuZGVyZWQ7XG4gICAgICAgICAgICAgIGNvbnN0IHN0aWNreVJvd3MgPSB0aGlzLmZvb3Rlci5zdGlja3k7XG4gICAgICAgICAgICAgIGxldCByb3dJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGZvciAoY29uc3QgbGVuID0gdGhpcy5mb290ZXIuc3RpY2t5Lmxlbmd0aDsgcm93SW5kZXggPCBsZW47IHJvd0luZGV4KyspIHtcbiAgICAgICAgICAgICAgICAvLyBhc3NpZ24gcmVuZGVyZWQgc3RhdGUgKyBpZiBub3QgcmVuZGVyZWQgYW5kIG5vdCBzdGlja3ksIHNldCBkaXNwbGF5IHRvIFwibm9uZVwiXG4gICAgICAgICAgICAgICAgaHRtbFJvd3Nbcm93SW5kZXhdLnN0eWxlLmRpc3BsYXkgPSAhKHJlbmRlcmVkUm93c1tyb3dJbmRleF0gPSByb3dJbmRleCA8IGZvb3Rlci5lbmQpICYmICFzdGlja3lSb3dzW3Jvd0luZGV4XVxuICAgICAgICAgICAgICAgICAgPyAnbm9uZSdcbiAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5jZGtUYWJsZS52aWV3Q2hhbmdlLm5leHQoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBhZGQgbWV0YSByb3dzIHRvIHRoZSB0b3RhbCByb3cgY291bnQuXG4gICAgICB0aGlzLmRhdGFTdHJlYW0gPSBkcy5vblJlbmRlckRhdGFDaGFuZ2luZ1xuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICAgIG1hcCggKHtkYXRhfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0YVJvd3MgPSB0aGlzLm1ldGFSb3dzID0gWyB0aGlzLmhlYWRlci5yb3dzLmxlbmd0aCwgdGhpcy5mb290ZXIucm93cy5sZW5ndGggXTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoIGRhdGEubGVuZ3RoICsgbWV0YVJvd3NbMF0gKyBtZXRhUm93c1sxXSApO1xuICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICBkcy5vblJlbmRlcmVkRGF0YUNoYW5nZWRcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgICBtYXAoICgpID0+IGRzLmxlbmd0aCApLFxuICAgICAgICAgIHN0YXJ0V2l0aCgwKSxcbiAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgIGZpbHRlciggKFtwcmV2LCBjdXJyXSkgPT4gcHJldiAhPT0gY3VyciApLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoIChbcHJldiwgY3Vycl0pID0+IHtcbiAgICAgICAgICB0aGlzLm5nWm9uZS5vblN0YWJsZS5waXBlKHRha2UoMSkpLnN1YnNjcmliZSggKCkgPT4gdGhpcy52aWV3cG9ydC5vblNvdXJjZUxlbmd0aENoYW5nZShwcmV2LCBjdXJyKSApO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy52aWV3cG9ydC5hdHRhY2godGhpcyBhcyBhbnkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGV0YWNoVmlldygpOiB2b2lkIHtcbiAgICB0aGlzLmRzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudmlld3BvcnQuZGV0YWNoKCk7XG4gIH1cbn1cbiJdfQ==