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
export class PblNgridMetaRowService {
    /**
     * @param {?} extApi
     */
    constructor(extApi) {
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
        () => {
            const { table } = extApi;
            /** @type {?} */
            let hzOffset = table.viewport.measureScrollOffset('start');
            /** @type {?} */
            let trackScroll = true;
            table.viewport.elementScrolled()
                .pipe(filter((/**
             * @return {?}
             */
            () => trackScroll)), auditTime(0, animationFrameScheduler))
                .subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newOffset = table.viewport.measureScrollOffset('start');
                if (hzOffset !== newOffset) {
                    this.hzScroll$.next(hzOffset = newOffset);
                }
                else if (table.viewport.isScrolling) {
                    trackScroll = false;
                    table.viewport.scrolling
                        .pipe(take(1))
                        .subscribe((/**
                     * @return {?}
                     */
                    () => trackScroll = true));
                }
            }), null, (/**
             * @return {?}
             */
            () => this.hzScroll$.complete()));
        }));
    }
    /**
     * @param {?} metaRow
     * @return {?}
     */
    addMetaRow(metaRow) {
        const { columnStore } = this.extApi;
        const { header, footer } = columnStore.metaColumnIds;
        /** @type {?} */
        const rowDef = metaRow.meta;
        if (rowDef === columnStore.footerColumnDef) {
            this.addToSection(this.footer, metaRow, 0);
        }
        else if (rowDef === columnStore.headerColumnDef) {
            this.addToSection(this.header, metaRow, columnStore.metaColumnIds.header.length);
        }
        else {
            /** @type {?} */
            let index = header.findIndex((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef === rowDef));
            if (index > -1) {
                this.addToSection(this.header, metaRow, index);
            }
            else {
                index = footer.findIndex((/**
                 * @param {?} h
                 * @return {?}
                 */
                h => h.rowDef === rowDef));
                if (index > -1) {
                    this.addToSection(this.footer, metaRow, index);
                }
                else {
                    throw new Error('Invalid operation');
                }
            }
        }
        this.sync$.next();
    }
    /**
     * @param {?} metaRow
     * @return {?}
     */
    removeMetaRow(metaRow) {
        /** @type {?} */
        const rowDef = metaRow.meta;
        /** @type {?} */
        let index = this.header.all.indexOf(metaRow.meta);
        if (index > -1) {
            this.header.all.splice(index, 1);
            index = this.header[rowDef.type].findIndex((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef === rowDef));
            this.header[rowDef.type].splice(index, 1);
        }
        else if ((index = this.footer.all.indexOf(metaRow.meta)) > -1) {
            this.footer.all.splice(index, 1);
            index = this.footer[rowDef.type].findIndex((/**
             * @param {?} h
             * @return {?}
             */
            h => h.rowDef === rowDef));
            this.footer[rowDef.type].splice(index, 1);
        }
    }
    /**
     * @private
     * @param {?} section
     * @param {?} metaRow
     * @param {?} index
     * @return {?}
     */
    addToSection(section, metaRow, index) {
        /** @type {?} */
        const rowDef = metaRow.meta;
        section[rowDef.type].push({ index, rowDef, el: metaRow.elRef.nativeElement });
        section.all.push(rowDef);
    }
}
PblNgridMetaRowService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PblNgridMetaRowService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [EXT_API_TOKEN,] }] }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvdGFibGUvbWV0YS1yb3dzL21ldGEtcm93LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBYyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7O0FBSTlFLFNBQVMscUJBQXFCO0lBQzVCLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDckQsQ0FBQzs7OztBQUVELG9DQUtDOzs7SUFKQywrQkFBa0Y7O0lBQ2xGLDZCQUFnRjs7SUFDaEYsZ0NBQW1GOztJQUNuRiw2QkFBNkI7Ozs7O0FBSS9CLE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFTakMsWUFBbUQsTUFBK0I7UUFBL0IsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFSbEYsV0FBTSxHQUFtQixxQkFBcUIsRUFBRSxDQUFDO1FBQ2pELFdBQU0sR0FBbUIscUJBQXFCLEVBQUUsQ0FBQztRQUl6QyxVQUFLLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUM1QixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUd4QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO2FBQ3JDLElBQUksQ0FDSCxZQUFZLENBQUMsQ0FBQyxFQUFFLGFBQWEs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Ozs7Ozs7SUFFTyxZQUFZLENBQUMsT0FBdUIsRUFBRSxPQUE0QixFQUFFLEtBQWE7O2NBQ2pGLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSTtRQUMzQixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBQztRQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7WUFwRkYsVUFBVTs7Ozs0Q0FVSSxNQUFNLFNBQUMsYUFBYTs7OztJQVJqQyx3Q0FBaUQ7O0lBQ2pELHdDQUFpRDs7SUFFakQsc0NBQWdDOztJQUNoQywwQ0FBc0M7Ozs7O0lBQ3RDLHVDQUFvQzs7Ozs7SUFDcEMsMkNBQTBDOztJQUU5Qix3Q0FBc0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgYXNhcFNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgYXVkaXRUaW1lLCBmaWx0ZXIsIHRha2UsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBibE5ncmlkRXh0ZW5zaW9uQXBpLCBFWFRfQVBJX1RPS0VOIH0gZnJvbSAnLi4vLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhUm93RGlyZWN0aXZlIH0gZnJvbSAnLi9tZXRhLXJvdy5kaXJlY3RpdmUnO1xuXG5mdW5jdGlvbiBtZXRhUm93U2VjdGlvbkZhY3RvcnkoKTogTWV0YVJvd1NlY3Rpb24ge1xuICByZXR1cm4geyBmaXhlZDogW10sIHJvdzogW10sIHN0aWNreTogW10sIGFsbDogW10gfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhUm93U2VjdGlvbiB7XG4gIGZpeGVkOiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgcm93OiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgc3RpY2t5OiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgYWxsOiBQYmxNZXRhUm93RGVmaW5pdGlvbnNbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWV0YVJvd1NlcnZpY2U8VCA9IGFueT4ge1xuICBoZWFkZXI6IE1ldGFSb3dTZWN0aW9uID0gbWV0YVJvd1NlY3Rpb25GYWN0b3J5KCk7XG4gIGZvb3RlcjogTWV0YVJvd1NlY3Rpb24gPSBtZXRhUm93U2VjdGlvbkZhY3RvcnkoKTtcblxuICByZWFkb25seSBzeW5jOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICByZWFkb25seSBoelNjcm9sbDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBwcml2YXRlIHN5bmMkID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcHJpdmF0ZSBoelNjcm9sbCQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChFWFRfQVBJX1RPS0VOKSBwdWJsaWMgcmVhZG9ubHkgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPikge1xuICAgIHRoaXMuc3luYyA9IHRoaXMuc3luYyQgLy8gVE9ETzogY29tcGxldGVcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMCwgYXNhcFNjaGVkdWxlciksXG4gICAgICApO1xuXG4gICAgdGhpcy5oelNjcm9sbCA9IHRoaXMuaHpTY3JvbGwkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgZXh0QXBpLm9uSW5pdCgoKSA9PiB7XG4gICAgICBjb25zdCB7IHRhYmxlIH0gPSBleHRBcGk7XG4gICAgICBsZXQgaHpPZmZzZXQgPSB0YWJsZS52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCdzdGFydCcpO1xuICAgICAgbGV0IHRyYWNrU2Nyb2xsID0gdHJ1ZTtcbiAgICAgIHRhYmxlLnZpZXdwb3J0LmVsZW1lbnRTY3JvbGxlZCgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlciggKCkgPT4gdHJhY2tTY3JvbGwgKSxcbiAgICAgICAgICBhdWRpdFRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld09mZnNldCA9IHRhYmxlLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoJ3N0YXJ0Jyk7XG4gICAgICAgICAgaWYgKGh6T2Zmc2V0ICE9PSBuZXdPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuaHpTY3JvbGwkLm5leHQoaHpPZmZzZXQgPSBuZXdPZmZzZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGFibGUudmlld3BvcnQuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHRyYWNrU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgICAgICB0YWJsZS52aWV3cG9ydC5zY3JvbGxpbmdcbiAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4gdHJhY2tTY3JvbGwgPSB0cnVlICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBudWxsLCAoKSA9PiB0aGlzLmh6U2Nyb2xsJC5jb21wbGV0ZSgpICk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNZXRhUm93KG1ldGFSb3c6IFBibE1ldGFSb3dEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbHVtblN0b3JlIH0gPSB0aGlzLmV4dEFwaTtcbiAgICBjb25zdCB7IGhlYWRlciwgZm9vdGVyIH0gPSBjb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzO1xuXG4gICAgY29uc3Qgcm93RGVmID0gbWV0YVJvdy5tZXRhO1xuICAgIGlmIChyb3dEZWYgPT09IGNvbHVtblN0b3JlLmZvb3RlckNvbHVtbkRlZikge1xuICAgICAgdGhpcy5hZGRUb1NlY3Rpb24odGhpcy5mb290ZXIsIG1ldGFSb3csIDApO1xuICAgIH0gZWxzZSBpZiAocm93RGVmID09PSBjb2x1bW5TdG9yZS5oZWFkZXJDb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuaGVhZGVyLCBtZXRhUm93LCBjb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzLmhlYWRlci5sZW5ndGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaW5kZXggPSBoZWFkZXIuZmluZEluZGV4KCBoID0+IGgucm93RGVmID09PSByb3dEZWYgKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuaGVhZGVyLCBtZXRhUm93LCBpbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGZvb3Rlci5maW5kSW5kZXgoIGggPT4gaC5yb3dEZWYgPT09IHJvd0RlZiApO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuZm9vdGVyLCBtZXRhUm93LCBpbmRleCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9wZXJhdGlvbicpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3luYyQubmV4dCgpO1xuICB9XG5cbiAgcmVtb3ZlTWV0YVJvdyhtZXRhUm93OiBQYmxNZXRhUm93RGlyZWN0aXZlKTogdm9pZCB7XG4gICAgY29uc3Qgcm93RGVmID0gbWV0YVJvdy5tZXRhO1xuICAgIGxldCBpbmRleCA9IHRoaXMuaGVhZGVyLmFsbC5pbmRleE9mKG1ldGFSb3cubWV0YSk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuaGVhZGVyLmFsbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgaW5kZXggPSB0aGlzLmhlYWRlcltyb3dEZWYudHlwZV0uZmluZEluZGV4KCBoID0+IGgucm93RGVmID09PSByb3dEZWYgKTtcbiAgICAgIHRoaXMuaGVhZGVyW3Jvd0RlZi50eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0gZWxzZSBpZiAoIChpbmRleCA9IHRoaXMuZm9vdGVyLmFsbC5pbmRleE9mKG1ldGFSb3cubWV0YSkpID4gLTEpIHtcbiAgICAgIHRoaXMuZm9vdGVyLmFsbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgaW5kZXggPSB0aGlzLmZvb3Rlcltyb3dEZWYudHlwZV0uZmluZEluZGV4KCBoID0+IGgucm93RGVmID09PSByb3dEZWYgKTtcbiAgICAgIHRoaXMuZm9vdGVyW3Jvd0RlZi50eXBlXS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkVG9TZWN0aW9uKHNlY3Rpb246IE1ldGFSb3dTZWN0aW9uLCBtZXRhUm93OiBQYmxNZXRhUm93RGlyZWN0aXZlLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgcm93RGVmID0gbWV0YVJvdy5tZXRhO1xuICAgIHNlY3Rpb25bcm93RGVmLnR5cGVdLnB1c2goIHsgaW5kZXgsIHJvd0RlZiwgZWw6IG1ldGFSb3cuZWxSZWYubmF0aXZlRWxlbWVudCB9ICk7XG4gICAgc2VjdGlvbi5hbGwucHVzaChyb3dEZWYpO1xuICB9XG59XG4iXX0=