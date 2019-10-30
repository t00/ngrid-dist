/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animationFrameScheduler, Subject, asapScheduler } from 'rxjs';
import { auditTime, filter, take, debounceTime } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { EXT_API_TOKEN } from '../../ext/table-ext-api';
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
            var table = extApi.table;
            /** @type {?} */
            var hzOffset = table.viewport.measureScrollOffset('start');
            /** @type {?} */
            var trackScroll = true;
            table.viewport.elementScrolled()
                .pipe(filter((/**
             * @return {?}
             */
            function () { return trackScroll; })), auditTime(0, animationFrameScheduler))
                .subscribe((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var newOffset = table.viewport.measureScrollOffset('start');
                if (hzOffset !== newOffset) {
                    _this.hzScroll$.next(hzOffset = newOffset);
                }
                else if (table.viewport.isScrolling) {
                    trackScroll = false;
                    table.viewport.scrolling
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
        if (rowDef === columnStore.footerColumnDef) {
            this.addToSection(this.footer, metaRow, 0);
        }
        else if (rowDef === columnStore.headerColumnDef) {
            this.addToSection(this.header, metaRow, columnStore.metaColumnIds.header.length);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvbWV0YS1yb3dzL21ldGEtcm93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBYyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBSTlFLFNBQVMscUJBQXFCO0lBQzVCLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDckQsQ0FBQzs7OztBQUVELG9DQUtDOzs7SUFKQywrQkFBa0Y7O0lBQ2xGLDZCQUFnRjs7SUFDaEYsZ0NBQW1GOztJQUNuRiw2QkFBNkI7Ozs7O0FBRy9CO0lBVUUsZ0NBQW1ELE1BQStCO1FBQWxGLGlCQTZCQztRQTdCa0QsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFSbEYsV0FBTSxHQUFtQixxQkFBcUIsRUFBRSxDQUFDO1FBQ2pELFdBQU0sR0FBbUIscUJBQXFCLEVBQUUsQ0FBQztRQUl6QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUM1QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUd4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO2FBQ3JDLElBQUksQ0FDSCxZQUFZLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxD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Q0gsQ0FBQzs7Ozs7Ozs7SUFFTyw2Q0FBWTs7Ozs7OztJQUFwQixVQUFxQixPQUF1QixFQUFFLE9BQTRCLEVBQUUsS0FBYTs7WUFDakYsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJO1FBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFFLEVBQUUsS0FBSyxPQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztRQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOztnQkFwRkYsVUFBVTs7OztnREFVSSxNQUFNLFNBQUMsYUFBYTs7SUEyRW5DLDZCQUFDO0NBQUEsQUFyRkQsSUFxRkM7U0FwRlksc0JBQXNCOzs7SUFDakMsd0NBQWlEOztJQUNqRCx3Q0FBaUQ7O0lBRWpELHNDQUFnQzs7SUFDaEMsMENBQXNDOzs7OztJQUN0Qyx1Q0FBb0M7Ozs7O0lBQ3BDLDJDQUEwQzs7SUFFOUIsd0NBQXNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIE9ic2VydmFibGUsIFN1YmplY3QsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgZmlsdGVyLCB0YWtlLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJy4uLy4uL2V4dC90YWJsZS1leHQtYXBpJztcbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTWV0YVJvd0RpcmVjdGl2ZSB9IGZyb20gJy4vbWV0YS1yb3cuZGlyZWN0aXZlJztcblxuZnVuY3Rpb24gbWV0YVJvd1NlY3Rpb25GYWN0b3J5KCk6IE1ldGFSb3dTZWN0aW9uIHtcbiAgcmV0dXJuIHsgZml4ZWQ6IFtdLCByb3c6IFtdLCBzdGlja3k6IFtdLCBhbGw6IFtdIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWV0YVJvd1NlY3Rpb24ge1xuICBmaXhlZDogQXJyYXk8eyBpbmRleDogbnVtYmVyLCByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZWw/OiBIVE1MRWxlbWVudDsgfT47XG4gIHJvdzogQXJyYXk8eyBpbmRleDogbnVtYmVyLCByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZWw/OiBIVE1MRWxlbWVudDsgfT47XG4gIHN0aWNreTogQXJyYXk8eyBpbmRleDogbnVtYmVyLCByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9uczsgZWw/OiBIVE1MRWxlbWVudDsgfT47XG4gIGFsbDogUGJsTWV0YVJvd0RlZmluaXRpb25zW107XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlPFQgPSBhbnk+IHtcbiAgaGVhZGVyOiBNZXRhUm93U2VjdGlvbiA9IG1ldGFSb3dTZWN0aW9uRmFjdG9yeSgpO1xuICBmb290ZXI6IE1ldGFSb3dTZWN0aW9uID0gbWV0YVJvd1NlY3Rpb25GYWN0b3J5KCk7XG5cbiAgcmVhZG9ubHkgc3luYzogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcmVhZG9ubHkgaHpTY3JvbGw6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcHJpdmF0ZSBzeW5jJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgaHpTY3JvbGwkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHVibGljIHJlYWRvbmx5IGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4pIHtcbiAgICB0aGlzLnN5bmMgPSB0aGlzLnN5bmMkIC8vIFRPRE86IGNvbXBsZXRlXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDAsIGFzYXBTY2hlZHVsZXIpLFxuICAgICAgKTtcblxuICAgIHRoaXMuaHpTY3JvbGwgPSB0aGlzLmh6U2Nyb2xsJC5hc09ic2VydmFibGUoKTtcblxuICAgIGV4dEFwaS5vbkluaXQoKCkgPT4ge1xuICAgICAgY29uc3QgeyB0YWJsZSB9ID0gZXh0QXBpO1xuICAgICAgbGV0IGh6T2Zmc2V0ID0gdGFibGUudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcbiAgICAgIGxldCB0cmFja1Njcm9sbCA9IHRydWU7XG4gICAgICB0YWJsZS52aWV3cG9ydC5lbGVtZW50U2Nyb2xsZWQoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoICgpID0+IHRyYWNrU2Nyb2xsICksXG4gICAgICAgICAgYXVkaXRUaW1lKDAsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdPZmZzZXQgPSB0YWJsZS52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCdzdGFydCcpO1xuICAgICAgICAgIGlmIChoek9mZnNldCAhPT0gbmV3T2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLmh6U2Nyb2xsJC5uZXh0KGh6T2Zmc2V0ID0gbmV3T2Zmc2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRhYmxlLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICB0cmFja1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgdGFibGUudmlld3BvcnQuc2Nyb2xsaW5nXG4gICAgICAgICAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHRyYWNrU2Nyb2xsID0gdHJ1ZSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgbnVsbCwgKCkgPT4gdGhpcy5oelNjcm9sbCQuY29tcGxldGUoKSApO1xuICAgIH0pO1xuICB9XG5cbiAgYWRkTWV0YVJvdyhtZXRhUm93OiBQYmxNZXRhUm93RGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb2x1bW5TdG9yZSB9ID0gdGhpcy5leHRBcGk7XG4gICAgY29uc3QgeyBoZWFkZXIsIGZvb3RlciB9ID0gY29sdW1uU3RvcmUubWV0YUNvbHVtbklkcztcblxuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBpZiAocm93RGVmID09PSBjb2x1bW5TdG9yZS5mb290ZXJDb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuZm9vdGVyLCBtZXRhUm93LCAwKTtcbiAgICB9IGVsc2UgaWYgKHJvd0RlZiA9PT0gY29sdW1uU3RvcmUuaGVhZGVyQ29sdW1uRGVmKSB7XG4gICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmhlYWRlciwgbWV0YVJvdywgY29sdW1uU3RvcmUubWV0YUNvbHVtbklkcy5oZWFkZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4ID0gaGVhZGVyLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmhlYWRlciwgbWV0YVJvdywgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBmb290ZXIuZmluZEluZGV4KCBoID0+IGgucm93RGVmID09PSByb3dEZWYgKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmZvb3RlciwgbWV0YVJvdywgaW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBvcGVyYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN5bmMkLm5leHQoKTtcbiAgfVxuXG4gIHJlbW92ZU1ldGFSb3cobWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmhlYWRlci5hbGwuaW5kZXhPZihtZXRhUm93Lm1ldGEpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmhlYWRlci5hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGluZGV4ID0gdGhpcy5oZWFkZXJbcm93RGVmLnR5cGVdLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICB0aGlzLmhlYWRlcltyb3dEZWYudHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9IGVsc2UgaWYgKCAoaW5kZXggPSB0aGlzLmZvb3Rlci5hbGwuaW5kZXhPZihtZXRhUm93Lm1ldGEpKSA+IC0xKSB7XG4gICAgICB0aGlzLmZvb3Rlci5hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGluZGV4ID0gdGhpcy5mb290ZXJbcm93RGVmLnR5cGVdLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICB0aGlzLmZvb3Rlcltyb3dEZWYudHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFRvU2VjdGlvbihzZWN0aW9uOiBNZXRhUm93U2VjdGlvbiwgbWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBzZWN0aW9uW3Jvd0RlZi50eXBlXS5wdXNoKCB7IGluZGV4LCByb3dEZWYsIGVsOiBtZXRhUm93LmVsUmVmLm5hdGl2ZUVsZW1lbnQgfSApO1xuICAgIHNlY3Rpb24uYWxsLnB1c2gocm93RGVmKTtcbiAgfVxufVxuIl19