/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9tZXRhLXJvd3MvbWV0YS1yb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFjLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBd0IsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFJN0UsU0FBUyxxQkFBcUI7SUFDNUIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUNyRCxDQUFDOzs7O0FBRUQsb0NBS0M7OztJQUpDLCtCQUFrRjs7SUFDbEYsNkJBQWdGOztJQUNoRixnQ0FBbUY7O0lBQ25GLDZCQUE2Qjs7Ozs7QUFHL0I7SUFXRSxnQ0FBbUQsTUFBK0I7UUFBbEYsaUJBMkJDO1FBM0JrRCxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQVJsRixXQUFNLEdBQW1CLHFCQUFxQixFQUFFLENBQUM7UUFDakQsV0FBTSxHQUFtQixxQkFBcUIsRUFBRSxDQUFDO1FBSXpDLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzVCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBR3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7YUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENB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QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVM7Ozs7WUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFuQixDQUFtQixFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQztJQUNILENBQUM7Ozs7Ozs7O0lBRU8sNkNBQVk7Ozs7Ozs7SUFBcEIsVUFBcUIsT0FBdUIsRUFBRSxPQUE0QixFQUFFLEtBQWE7O1lBQ2pGLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSTtRQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxFQUFFLEtBQUssT0FBQSxFQUFFLE1BQU0sUUFBQSxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFFLENBQUM7UUFDaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7Z0JBeEZGLFVBQVU7Ozs7Z0RBV0ksTUFBTSxTQUFDLGFBQWE7O0lBOEVuQyw2QkFBQztDQUFBLEFBekZELElBeUZDO1NBeEZZLHNCQUFzQjs7O0lBQ2pDLDhDQUFrRTs7SUFDbEUsd0NBQWlEOztJQUNqRCx3Q0FBaUQ7O0lBRWpELHNDQUFnQzs7SUFDaEMsMENBQXNDOzs7OztJQUN0Qyx1Q0FBb0M7Ozs7O0lBQ3BDLDJDQUEwQzs7SUFFOUIsd0NBQXNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIE9ic2VydmFibGUsIFN1YmplY3QsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgZmlsdGVyLCB0YWtlLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhUm93RGlyZWN0aXZlIH0gZnJvbSAnLi9tZXRhLXJvdy5kaXJlY3RpdmUnO1xuXG5mdW5jdGlvbiBtZXRhUm93U2VjdGlvbkZhY3RvcnkoKTogTWV0YVJvd1NlY3Rpb24ge1xuICByZXR1cm4geyBmaXhlZDogW10sIHJvdzogW10sIHN0aWNreTogW10sIGFsbDogW10gfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhUm93U2VjdGlvbiB7XG4gIGZpeGVkOiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgcm93OiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgc3RpY2t5OiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgYWxsOiBQYmxNZXRhUm93RGVmaW5pdGlvbnNbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWV0YVJvd1NlcnZpY2U8VCA9IGFueT4ge1xuICBncmlkV2lkdGhSb3c6IHsgcm93RGVmOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IGVsOiBIVE1MRWxlbWVudDsgfTtcbiAgaGVhZGVyOiBNZXRhUm93U2VjdGlvbiA9IG1ldGFSb3dTZWN0aW9uRmFjdG9yeSgpO1xuICBmb290ZXI6IE1ldGFSb3dTZWN0aW9uID0gbWV0YVJvd1NlY3Rpb25GYWN0b3J5KCk7XG5cbiAgcmVhZG9ubHkgc3luYzogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcmVhZG9ubHkgaHpTY3JvbGw6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcHJpdmF0ZSBzeW5jJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgaHpTY3JvbGwkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHVibGljIHJlYWRvbmx5IGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4pIHtcbiAgICB0aGlzLnN5bmMgPSB0aGlzLnN5bmMkIC8vIFRPRE86IGNvbXBsZXRlXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMCwgYXNhcFNjaGVkdWxlcikpO1xuXG4gICAgdGhpcy5oelNjcm9sbCA9IHRoaXMuaHpTY3JvbGwkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgZXh0QXBpLm9uSW5pdCgoKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IGV4dEFwaTtcbiAgICAgIGxldCBoek9mZnNldCA9IGdyaWQudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcbiAgICAgIGxldCB0cmFja1Njcm9sbCA9IHRydWU7XG4gICAgICBncmlkLnZpZXdwb3J0LmVsZW1lbnRTY3JvbGxlZCgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlciggKCkgPT4gdHJhY2tTY3JvbGwgKSxcbiAgICAgICAgICBhdWRpdFRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld09mZnNldCA9IGdyaWQudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcbiAgICAgICAgICBpZiAoaHpPZmZzZXQgIT09IG5ld09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5oelNjcm9sbCQubmV4dChoek9mZnNldCA9IG5ld09mZnNldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChncmlkLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICB0cmFja1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgZ3JpZC52aWV3cG9ydC5zY3JvbGxpbmdcbiAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4gdHJhY2tTY3JvbGwgPSB0cnVlICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBudWxsLCAoKSA9PiB0aGlzLmh6U2Nyb2xsJC5jb21wbGV0ZSgpICk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNZXRhUm93KG1ldGFSb3c6IFBibE1ldGFSb3dEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbHVtblN0b3JlIH0gPSB0aGlzLmV4dEFwaTtcbiAgICBjb25zdCB7IGhlYWRlciwgZm9vdGVyIH0gPSBjb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzO1xuXG4gICAgY29uc3Qgcm93RGVmID0gbWV0YVJvdy5tZXRhO1xuICAgIGlmIChyb3dEZWYgPT09IGNvbHVtblN0b3JlLmhlYWRlckNvbHVtbkRlZikge1xuICAgICAgaWYgKG1ldGFSb3cuZ3JpZFdpZHRoUm93ID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZ3JpZFdpZHRoUm93ID0geyByb3dEZWYsIGVsOiBtZXRhUm93LmVsUmVmLm5hdGl2ZUVsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5oZWFkZXIuYWxsLnB1c2gocm93RGVmKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuaGVhZGVyLCBtZXRhUm93LCBjb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzLmhlYWRlci5sZW5ndGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm93RGVmID09PSBjb2x1bW5TdG9yZS5mb290ZXJDb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuZm9vdGVyLCBtZXRhUm93LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4ID0gaGVhZGVyLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmhlYWRlciwgbWV0YVJvdywgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBmb290ZXIuZmluZEluZGV4KCBoID0+IGgucm93RGVmID09PSByb3dEZWYgKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmZvb3RlciwgbWV0YVJvdywgaW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBvcGVyYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN5bmMkLm5leHQoKTtcbiAgfVxuXG4gIHJlbW92ZU1ldGFSb3cobWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmhlYWRlci5hbGwuaW5kZXhPZihtZXRhUm93Lm1ldGEpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmhlYWRlci5hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGluZGV4ID0gdGhpcy5oZWFkZXJbcm93RGVmLnR5cGVdLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICB0aGlzLmhlYWRlcltyb3dEZWYudHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9IGVsc2UgaWYgKCAoaW5kZXggPSB0aGlzLmZvb3Rlci5hbGwuaW5kZXhPZihtZXRhUm93Lm1ldGEpKSA+IC0xKSB7XG4gICAgICB0aGlzLmZvb3Rlci5hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGluZGV4ID0gdGhpcy5mb290ZXJbcm93RGVmLnR5cGVdLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICB0aGlzLmZvb3Rlcltyb3dEZWYudHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFRvU2VjdGlvbihzZWN0aW9uOiBNZXRhUm93U2VjdGlvbiwgbWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBzZWN0aW9uW3Jvd0RlZi50eXBlXS5wdXNoKCB7IGluZGV4LCByb3dEZWYsIGVsOiBtZXRhUm93LmVsUmVmLm5hdGl2ZUVsZW1lbnQgfSApO1xuICAgIHNlY3Rpb24uYWxsLnB1c2gocm93RGVmKTtcbiAgfVxufVxuIl19