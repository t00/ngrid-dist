/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/meta-rows/meta-row.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animationFrameScheduler, Subject, asapScheduler } from 'rxjs';
import { auditTime, filter, take, debounceTime } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
/**
 * @return {?}
 */
function metaRowSectionFactory() {
    return { fixed: [], row: [], sticky: [], all: [] };
}
/**
 * @record
 */
export function MetaRowSection() { }
if (false) {
    /** @type {?} */
    MetaRowSection.prototype.fixed;
    /** @type {?} */
    MetaRowSection.prototype.row;
    /** @type {?} */
    MetaRowSection.prototype.sticky;
    /** @type {?} */
    MetaRowSection.prototype.all;
}
/**
 * @template T
 */
var PblNgridMetaRowService = /** @class */ (function () {
    function PblNgridMetaRowService(extApi) {
        var _this = this;
        this.extApi = extApi;
        this.header = metaRowSectionFactory();
        this.footer = metaRowSectionFactory();
        this.sync$ = new Subject();
        this.hzScroll$ = new Subject();
        this.sync = this.sync$ // TODO: complete
            .pipe(debounceTime(0, asapScheduler));
        this.hzScroll = this.hzScroll$.asObservable();
        extApi.onInit((/**
         * @return {?}
         */
        function () {
            var grid = extApi.grid;
            /** @type {?} */
            var hzOffset = grid.viewport.measureScrollOffset('start');
            /** @type {?} */
            var trackScroll = true;
            grid.viewport.elementScrolled()
                .pipe(filter((/**
             * @return {?}
             */
            function () { return trackScroll; })), auditTime(0, animationFrameScheduler))
                .subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var newOffset = grid.viewport.measureScrollOffset('start');
                if (hzOffset !== newOffset) {
                    _this.hzScroll$.next(hzOffset = newOffset);
                }
                else if (grid.viewport.isScrolling) {
                    trackScroll = false;
                    grid.viewport.scrolling
                        .pipe(take(1))
                        .subscribe((/**
                     * @return {?}
                     */
                    function () { return trackScroll = true; }));
                }
            }), null, (/**
             * @return {?}
             */
            function () { return _this.hzScroll$.complete(); }));
        }));
    }
    /**
     * @param {?} metaRow
     * @return {?}
     */
    PblNgridMetaRowService.prototype.addMetaRow = /**
     * @param {?} metaRow
     * @return {?}
     */
    function (metaRow) {
        var columnStore = this.extApi.columnStore;
        var _a = columnStore.metaColumnIds, header = _a.header, footer = _a.footer;
        /** @type {?} */
        var rowDef = metaRow.meta;
        if (rowDef === columnStore.headerColumnDef) {
            if (metaRow.gridWidthRow === true) {
                this.gridWidthRow = { rowDef: rowDef, el: metaRow.elRef.nativeElement };
                this.header.all.push(rowDef);
            }
            else {
                this.addToSection(this.header, metaRow, columnStore.metaColumnIds.header.length);
            }
        }
        else if (rowDef === columnStore.footerColumnDef) {
            this.addToSection(this.footer, metaRow, 0);
        }
        else {
            /** @type {?} */
            var index = header.findIndex((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.rowDef === rowDef; }));
            if (index > -1) {
                this.addToSection(this.header, metaRow, index);
            }
            else {
                index = footer.findIndex((/**
                 * @param {?} h
                 * @return {?}
                 */
                function (h) { return h.rowDef === rowDef; }));
                if (index > -1) {
                    this.addToSection(this.footer, metaRow, index);
                }
                else {
                    throw new Error('Invalid operation');
                }
            }
        }
        this.sync$.next();
    };
    /**
     * @param {?} metaRow
     * @return {?}
     */
    PblNgridMetaRowService.prototype.removeMetaRow = /**
     * @param {?} metaRow
     * @return {?}
     */
    function (metaRow) {
        /** @type {?} */
        var rowDef = metaRow.meta;
        /** @type {?} */
        var index = this.header.all.indexOf(metaRow.meta);
        if (index > -1) {
            this.header.all.splice(index, 1);
            index = this.header[rowDef.type].findIndex((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.rowDef === rowDef; }));
            this.header[rowDef.type].splice(index, 1);
        }
        else if ((index = this.footer.all.indexOf(metaRow.meta)) > -1) {
            this.footer.all.splice(index, 1);
            index = this.footer[rowDef.type].findIndex((/**
             * @param {?} h
             * @return {?}
             */
            function (h) { return h.rowDef === rowDef; }));
            this.footer[rowDef.type].splice(index, 1);
        }
    };
    /**
     * @private
     * @param {?} section
     * @param {?} metaRow
     * @param {?} index
     * @return {?}
     */
    PblNgridMetaRowService.prototype.addToSection = /**
     * @private
     * @param {?} section
     * @param {?} metaRow
     * @param {?} index
     * @return {?}
     */
    function (section, metaRow, index) {
        /** @type {?} */
        var rowDef = metaRow.meta;
        section[rowDef.type].push({ index: index, rowDef: rowDef, el: metaRow.elRef.nativeElement });
        section.all.push(rowDef);
    };
    PblNgridMetaRowService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PblNgridMetaRowService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
    ]; };
    return PblNgridMetaRowService;
}());
export { PblNgridMetaRowService };
if (false) {
    /** @type {?} */
    PblNgridMetaRowService.prototype.gridWidthRow;
    /** @type {?} */
    PblNgridMetaRowService.prototype.header;
    /** @type {?} */
    PblNgridMetaRowService.prototype.footer;
    /** @type {?} */
    PblNgridMetaRowService.prototype.sync;
    /** @type {?} */
    PblNgridMetaRowService.prototype.hzScroll;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowService.prototype.sync$;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowService.prototype.hzScroll$;
    /** @type {?} */
    PblNgridMetaRowService.prototype.extApi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9tZXRhLXJvd3MvbWV0YS1yb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBYyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBSTdFLFNBQVMscUJBQXFCO0lBQzVCLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDckQsQ0FBQzs7OztBQUVELG9DQUtDOzs7SUFKQywrQkFBa0Y7O0lBQ2xGLDZCQUFnRjs7SUFDaEYsZ0NBQW1GOztJQUNuRiw2QkFBNkI7Ozs7O0FBRy9CO0lBV0UsZ0NBQW1ELE1BQStCO1FBQWxGLGlCQTJCQztRQTNCa0QsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFSbEYsV0FBTSxHQUFtQixxQkFBcUIsRUFBRSxDQUFDO1FBQ2pELFdBQU0sR0FBbUIscUJBQXFCLEVBQUUsQ0FBQztRQUl6QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUM1QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUd4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO2FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxD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QUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBbkIsQ0FBbUIsRUFBRSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7Ozs7OztJQUVPLDZDQUFZOzs7Ozs7O0lBQXBCLFVBQXFCLE9BQXVCLEVBQUUsT0FBNEIsRUFBRSxLQUFhOztZQUNqRixNQUFNLEdBQUcsT0FBTyxDQUFDLElBQUk7UUFDM0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUUsRUFBRSxLQUFLLE9BQUEsRUFBRSxNQUFNLFFBQUEsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7O2dCQXhGRixVQUFVOzs7O2dEQVdJLE1BQU0sU0FBQyxhQUFhOztJQThFbkMsNkJBQUM7Q0FBQSxBQXpGRCxJQXlGQztTQXhGWSxzQkFBc0I7OztJQUNqQyw4Q0FBa0U7O0lBQ2xFLHdDQUFpRDs7SUFDakQsd0NBQWlEOztJQUVqRCxzQ0FBZ0M7O0lBQ2hDLDBDQUFzQzs7Ozs7SUFDdEMsdUNBQW9DOzs7OztJQUNwQywyQ0FBMEM7O0lBRTlCLHdDQUFzRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBhc2FwU2NoZWR1bGVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBhdWRpdFRpbWUsIGZpbHRlciwgdGFrZSwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRFeHRlbnNpb25BcGksIEVYVF9BUElfVE9LRU4gfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YVJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbWV0YS1yb3cuZGlyZWN0aXZlJztcblxuZnVuY3Rpb24gbWV0YVJvd1NlY3Rpb25GYWN0b3J5KCk6IE1ldGFSb3dTZWN0aW9uIHtcbiAgcmV0dXJuIHsgZml4ZWQ6IFtdLCByb3c6IFtdLCBzdGlja3k6IFtdLCBhbGw6IFtdIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YVJvd1NlY3Rpb24ge1xuICBmaXhlZDogQXJyYXk8eyBpbmRleDogbnVtYmVyLCByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZWw/OiBIVE1MRWxlbWVudDsgfT47XG4gIHJvdzogQXJyYXk8eyBpbmRleDogbnVtYmVyLCByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZWw/OiBIVE1MRWxlbWVudDsgfT47XG4gIHN0aWNreTogQXJyYXk8eyBpbmRleDogbnVtYmVyLCByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZWw/OiBIVE1MRWxlbWVudDsgfT47XG4gIGFsbDogUGJsTWV0YVJvd0RlZmluaXRpb25zW107XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlPFQgPSBhbnk+IHtcbiAgZ3JpZFdpZHRoUm93OiB7IHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbDogSFRNTEVsZW1lbnQ7IH07XG4gIGhlYWRlcjogTWV0YVJvd1NlY3Rpb24gPSBtZXRhUm93U2VjdGlvbkZhY3RvcnkoKTtcbiAgZm9vdGVyOiBNZXRhUm93U2VjdGlvbiA9IG1ldGFSb3dTZWN0aW9uRmFjdG9yeSgpO1xuXG4gIHJlYWRvbmx5IHN5bmM6IE9ic2VydmFibGU8dm9pZD47XG4gIHJlYWRvbmx5IGh6U2Nyb2xsOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHByaXZhdGUgc3luYyQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuICBwcml2YXRlIGh6U2Nyb2xsJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEVYVF9BUElfVE9LRU4pIHB1YmxpYyByZWFkb25seSBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+KSB7XG4gICAgdGhpcy5zeW5jID0gdGhpcy5zeW5jJCAvLyBUT0RPOiBjb21wbGV0ZVxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDAsIGFzYXBTY2hlZHVsZXIpKTtcblxuICAgIHRoaXMuaHpTY3JvbGwgPSB0aGlzLmh6U2Nyb2xsJC5hc09ic2VydmFibGUoKTtcblxuICAgIGV4dEFwaS5vbkluaXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyBncmlkIH0gPSBleHRBcGk7XG4gICAgICBsZXQgaHpPZmZzZXQgPSBncmlkLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoJ3N0YXJ0Jyk7XG4gICAgICBsZXQgdHJhY2tTY3JvbGwgPSB0cnVlO1xuICAgICAgZ3JpZC52aWV3cG9ydC5lbGVtZW50U2Nyb2xsZWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoICgpID0+IHRyYWNrU2Nyb2xsICksXG4gICAgICAgICAgYXVkaXRUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdPZmZzZXQgPSBncmlkLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoJ3N0YXJ0Jyk7XG4gICAgICAgICAgaWYgKGh6T2Zmc2V0ICE9PSBuZXdPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuaHpTY3JvbGwkLm5leHQoaHpPZmZzZXQgPSBuZXdPZmZzZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZ3JpZC52aWV3cG9ydC5pc1Njcm9sbGluZykge1xuICAgICAgICAgICAgdHJhY2tTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgICAgIGdyaWQudmlld3BvcnQuc2Nyb2xsaW5nXG4gICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHRyYWNrU2Nyb2xsID0gdHJ1ZSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgbnVsbCwgKCkgPT4gdGhpcy5oelNjcm9sbCQuY29tcGxldGUoKSApO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkTWV0YVJvdyhtZXRhUm93OiBQYmxNZXRhUm93RGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2x1bW5TdG9yZSB9ID0gdGhpcy5leHRBcGk7XG4gICAgY29uc3QgeyBoZWFkZXIsIGZvb3RlciB9ID0gY29sdW1uU3RvcmUubWV0YUNvbHVtbklkcztcblxuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBpZiAocm93RGVmID09PSBjb2x1bW5TdG9yZS5oZWFkZXJDb2x1bW5EZWYpIHtcbiAgICAgIGlmIChtZXRhUm93LmdyaWRXaWR0aFJvdyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmdyaWRXaWR0aFJvdyA9IHsgcm93RGVmLCBlbDogbWV0YVJvdy5lbFJlZi5uYXRpdmVFbGVtZW50IH07XG4gICAgICAgIHRoaXMuaGVhZGVyLmFsbC5wdXNoKHJvd0RlZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmhlYWRlciwgbWV0YVJvdywgY29sdW1uU3RvcmUubWV0YUNvbHVtbklkcy5oZWFkZXIubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJvd0RlZiA9PT0gY29sdW1uU3RvcmUuZm9vdGVyQ29sdW1uRGVmKSB7XG4gICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmZvb3RlciwgbWV0YVJvdywgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBpbmRleCA9IGhlYWRlci5maW5kSW5kZXgoIGggPT4gaC5yb3dEZWYgPT09IHJvd0RlZiApO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgdGhpcy5hZGRUb1NlY3Rpb24odGhpcy5oZWFkZXIsIG1ldGFSb3csIGluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gZm9vdGVyLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5hZGRUb1NlY3Rpb24odGhpcy5mb290ZXIsIG1ldGFSb3csIGluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgb3BlcmF0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zeW5jJC5uZXh0KCk7XG4gIH1cblxuICByZW1vdmVNZXRhUm93KG1ldGFSb3c6IFBibE1ldGFSb3dEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCByb3dEZWYgPSBtZXRhUm93Lm1ldGE7XG4gICAgbGV0IGluZGV4ID0gdGhpcy5oZWFkZXIuYWxsLmluZGV4T2YobWV0YVJvdy5tZXRhKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5oZWFkZXIuYWxsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBpbmRleCA9IHRoaXMuaGVhZGVyW3Jvd0RlZi50eXBlXS5maW5kSW5kZXgoIGggPT4gaC5yb3dEZWYgPT09IHJvd0RlZiApO1xuICAgICAgdGhpcy5oZWFkZXJbcm93RGVmLnR5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfSBlbHNlIGlmICggKGluZGV4ID0gdGhpcy5mb290ZXIuYWxsLmluZGV4T2YobWV0YVJvdy5tZXRhKSkgPiAtMSkge1xuICAgICAgdGhpcy5mb290ZXIuYWxsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICBpbmRleCA9IHRoaXMuZm9vdGVyW3Jvd0RlZi50eXBlXS5maW5kSW5kZXgoIGggPT4gaC5yb3dEZWYgPT09IHJvd0RlZiApO1xuICAgICAgdGhpcy5mb290ZXJbcm93RGVmLnR5cGVdLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZGRUb1NlY3Rpb24oc2VjdGlvbjogTWV0YVJvd1NlY3Rpb24sIG1ldGFSb3c6IFBibE1ldGFSb3dEaXJlY3RpdmUsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCByb3dEZWYgPSBtZXRhUm93Lm1ldGE7XG4gICAgc2VjdGlvbltyb3dEZWYudHlwZV0ucHVzaCggeyBpbmRleCwgcm93RGVmLCBlbDogbWV0YVJvdy5lbFJlZi5uYXRpdmVFbGVtZW50IH0gKTtcbiAgICBzZWN0aW9uLmFsbC5wdXNoKHJvd0RlZik7XG4gIH1cbn1cbiJdfQ==