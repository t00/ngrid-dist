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
            const { grid } = extApi;
            /** @type {?} */
            let hzOffset = grid.viewport.measureScrollOffset('start');
            /** @type {?} */
            let trackScroll = true;
            grid.viewport.elementScrolled()
                .pipe(filter((/**
             * @return {?}
             */
            () => trackScroll)), auditTime(0, animationFrameScheduler))
                .subscribe((/**
             * @return {?}
             */
            () => {
                /** @type {?} */
                const newOffset = grid.viewport.measureScrollOffset('start');
                if (hzOffset !== newOffset) {
                    this.hzScroll$.next(hzOffset = newOffset);
                }
                else if (grid.viewport.isScrolling) {
                    trackScroll = false;
                    grid.viewport.scrolling
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
        if (rowDef === columnStore.headerColumnDef) {
            if (metaRow.gridWidthRow === true) {
                this.gridWidthRow = { rowDef, el: metaRow.elRef.nativeElement };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvIiwic291cmNlcyI6WyJsaWIvZ3JpZC9tZXRhLXJvd3MvbWV0YS1yb3cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFjLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBd0IsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7QUFJN0UsU0FBUyxxQkFBcUI7SUFDNUIsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztBQUNyRCxDQUFDOzs7O0FBRUQsb0NBS0M7OztJQUpDLCtCQUFrRjs7SUFDbEYsNkJBQWdGOztJQUNoRixnQ0FBbUY7O0lBQ25GLDZCQUE2Qjs7Ozs7QUFJL0IsTUFBTSxPQUFPLHNCQUFzQjs7OztJQVVqQyxZQUFtRCxNQUErQjtRQUEvQixXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQVJsRixXQUFNLEdBQW1CLHFCQUFxQixFQUFFLENBQUM7UUFDakQsV0FBTSxHQUFtQixxQkFBcUIsRUFBRSxDQUFDO1FBSXpDLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzVCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBR3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUI7YUFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFOUMsTUFBTSxDQUFDLE1BQU07OztRQUFDLEdBQUcsRUFBRTtrQkFDWCxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU07O2dCQUNuQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUM7O2dCQUNyRCxXQUFXLEdBQUcsSUFBSTtZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRTtpQkFDNUIsSUFBSSxDQUNILE1BQU07OztZQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUMzQixTQUFTLENBQUMsQ0FBQyxFQUFFLHVCQUF1QixDQUFDLENBQ3RDO2lCQUNBLFNBQVM7OztZQUFDLEdBQUcsRUFBRTs7c0JBQ1IsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO2dCQUM1RCxJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQztpQkFDM0M7cUJBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtvQkFDcEMsV0FBVyxHQUFHLEtBQUssQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO3lCQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNiLFNBQVM7OztvQkFBRSxHQUFHLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUM7aUJBQzFDO1lBQ0gsQ0FBQyxHQUFFLElBQUk7OztZQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUMvQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLE9BQTRCO2NBQy9CLEVBQUUsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU07Y0FDN0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsV0FBVyxDQUFDLGFBQWE7O2NBRTlDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSTtRQUMzQixJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsZUFBZSxFQUFFO1lBQzFDLElBQUksT0FBTyxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2xGO1NBQ0Y7YUFBTSxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsZUFBZSxFQUFFO1lBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDNUM7YUFBTTs7Z0JBQ0QsS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTOzs7O1lBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtZQUN4RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtnQkFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUzs7OztnQkFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxFQUFFLENBQUM7Z0JBQ3JELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO29CQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2hEO3FCQUFNO29CQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztpQkFDdEM7YUFDRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxPQUE0Qjs7Y0FDbEMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJOztZQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDakQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTSxJQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7Ozs7OztJQUVPLFlBQVksQ0FBQyxPQUF1QixFQUFFLE9BQTRCLEVBQUUsS0FBYTs7Y0FDakYsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJO1FBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBRSxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7OztZQXhGRixVQUFVOzs7OzRDQVdJLE1BQU0sU0FBQyxhQUFhOzs7O0lBVGpDLDhDQUFrRTs7SUFDbEUsd0NBQWlEOztJQUNqRCx3Q0FBaUQ7O0lBRWpELHNDQUFnQzs7SUFDaEMsMENBQXNDOzs7OztJQUN0Qyx1Q0FBb0M7Ozs7O0lBQ3BDLDJDQUEwQzs7SUFFOUIsd0NBQXNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIsIE9ic2VydmFibGUsIFN1YmplY3QsIGFzYXBTY2hlZHVsZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGF1ZGl0VGltZSwgZmlsdGVyLCB0YWtlLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZEV4dGVuc2lvbkFwaSwgRVhUX0FQSV9UT0tFTiB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxNZXRhUm93RGlyZWN0aXZlIH0gZnJvbSAnLi9tZXRhLXJvdy5kaXJlY3RpdmUnO1xuXG5mdW5jdGlvbiBtZXRhUm93U2VjdGlvbkZhY3RvcnkoKTogTWV0YVJvd1NlY3Rpb24ge1xuICByZXR1cm4geyBmaXhlZDogW10sIHJvdzogW10sIHN0aWNreTogW10sIGFsbDogW10gfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXRhUm93U2VjdGlvbiB7XG4gIGZpeGVkOiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgcm93OiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgc3RpY2t5OiBBcnJheTx7IGluZGV4OiBudW1iZXIsIHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zOyBlbD86IEhUTUxFbGVtZW50OyB9PjtcbiAgYWxsOiBQYmxNZXRhUm93RGVmaW5pdGlvbnNbXTtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWV0YVJvd1NlcnZpY2U8VCA9IGFueT4ge1xuICBncmlkV2lkdGhSb3c6IHsgcm93RGVmOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7IGVsOiBIVE1MRWxlbWVudDsgfTtcbiAgaGVhZGVyOiBNZXRhUm93U2VjdGlvbiA9IG1ldGFSb3dTZWN0aW9uRmFjdG9yeSgpO1xuICBmb290ZXI6IE1ldGFSb3dTZWN0aW9uID0gbWV0YVJvd1NlY3Rpb25GYWN0b3J5KCk7XG5cbiAgcmVhZG9ubHkgc3luYzogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgcmVhZG9ubHkgaHpTY3JvbGw6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcHJpdmF0ZSBzeW5jJCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG4gIHByaXZhdGUgaHpTY3JvbGwkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHVibGljIHJlYWRvbmx5IGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4pIHtcbiAgICB0aGlzLnN5bmMgPSB0aGlzLnN5bmMkIC8vIFRPRE86IGNvbXBsZXRlXG4gICAgICAucGlwZShkZWJvdW5jZVRpbWUoMCwgYXNhcFNjaGVkdWxlcikpO1xuXG4gICAgdGhpcy5oelNjcm9sbCA9IHRoaXMuaHpTY3JvbGwkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgZXh0QXBpLm9uSW5pdCgoKSA9PiB7XG4gICAgICBjb25zdCB7IGdyaWQgfSA9IGV4dEFwaTtcbiAgICAgIGxldCBoek9mZnNldCA9IGdyaWQudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcbiAgICAgIGxldCB0cmFja1Njcm9sbCA9IHRydWU7XG4gICAgICBncmlkLnZpZXdwb3J0LmVsZW1lbnRTY3JvbGxlZCgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlciggKCkgPT4gdHJhY2tTY3JvbGwgKSxcbiAgICAgICAgICBhdWRpdFRpbWUoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld09mZnNldCA9IGdyaWQudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcbiAgICAgICAgICBpZiAoaHpPZmZzZXQgIT09IG5ld09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5oelNjcm9sbCQubmV4dChoek9mZnNldCA9IG5ld09mZnNldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChncmlkLnZpZXdwb3J0LmlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICB0cmFja1Njcm9sbCA9IGZhbHNlO1xuICAgICAgICAgICAgZ3JpZC52aWV3cG9ydC5zY3JvbGxpbmdcbiAgICAgICAgICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4gdHJhY2tTY3JvbGwgPSB0cnVlICk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBudWxsLCAoKSA9PiB0aGlzLmh6U2Nyb2xsJC5jb21wbGV0ZSgpICk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRNZXRhUm93KG1ldGFSb3c6IFBibE1ldGFSb3dEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNvbHVtblN0b3JlIH0gPSB0aGlzLmV4dEFwaTtcbiAgICBjb25zdCB7IGhlYWRlciwgZm9vdGVyIH0gPSBjb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzO1xuXG4gICAgY29uc3Qgcm93RGVmID0gbWV0YVJvdy5tZXRhO1xuICAgIGlmIChyb3dEZWYgPT09IGNvbHVtblN0b3JlLmhlYWRlckNvbHVtbkRlZikge1xuICAgICAgaWYgKG1ldGFSb3cuZ3JpZFdpZHRoUm93ID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZ3JpZFdpZHRoUm93ID0geyByb3dEZWYsIGVsOiBtZXRhUm93LmVsUmVmLm5hdGl2ZUVsZW1lbnQgfTtcbiAgICAgICAgdGhpcy5oZWFkZXIuYWxsLnB1c2gocm93RGVmKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuaGVhZGVyLCBtZXRhUm93LCBjb2x1bW5TdG9yZS5tZXRhQ29sdW1uSWRzLmhlYWRlci5sZW5ndGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocm93RGVmID09PSBjb2x1bW5TdG9yZS5mb290ZXJDb2x1bW5EZWYpIHtcbiAgICAgIHRoaXMuYWRkVG9TZWN0aW9uKHRoaXMuZm9vdGVyLCBtZXRhUm93LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGluZGV4ID0gaGVhZGVyLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmhlYWRlciwgbWV0YVJvdywgaW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBmb290ZXIuZmluZEluZGV4KCBoID0+IGgucm93RGVmID09PSByb3dEZWYgKTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICB0aGlzLmFkZFRvU2VjdGlvbih0aGlzLmZvb3RlciwgbWV0YVJvdywgaW5kZXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBvcGVyYXRpb24nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnN5bmMkLm5leHQoKTtcbiAgfVxuXG4gIHJlbW92ZU1ldGFSb3cobWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSk6IHZvaWQge1xuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmhlYWRlci5hbGwuaW5kZXhPZihtZXRhUm93Lm1ldGEpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmhlYWRlci5hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGluZGV4ID0gdGhpcy5oZWFkZXJbcm93RGVmLnR5cGVdLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICB0aGlzLmhlYWRlcltyb3dEZWYudHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9IGVsc2UgaWYgKCAoaW5kZXggPSB0aGlzLmZvb3Rlci5hbGwuaW5kZXhPZihtZXRhUm93Lm1ldGEpKSA+IC0xKSB7XG4gICAgICB0aGlzLmZvb3Rlci5hbGwuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIGluZGV4ID0gdGhpcy5mb290ZXJbcm93RGVmLnR5cGVdLmZpbmRJbmRleCggaCA9PiBoLnJvd0RlZiA9PT0gcm93RGVmICk7XG4gICAgICB0aGlzLmZvb3Rlcltyb3dEZWYudHlwZV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFkZFRvU2VjdGlvbihzZWN0aW9uOiBNZXRhUm93U2VjdGlvbiwgbWV0YVJvdzogUGJsTWV0YVJvd0RpcmVjdGl2ZSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHJvd0RlZiA9IG1ldGFSb3cubWV0YTtcbiAgICBzZWN0aW9uW3Jvd0RlZi50eXBlXS5wdXNoKCB7IGluZGV4LCByb3dEZWYsIGVsOiBtZXRhUm93LmVsUmVmLm5hdGl2ZUVsZW1lbnQgfSApO1xuICAgIHNlY3Rpb24uYWxsLnB1c2gocm93RGVmKTtcbiAgfVxufVxuIl19