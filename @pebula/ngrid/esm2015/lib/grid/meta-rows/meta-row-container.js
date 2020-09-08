/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/meta-rows/meta-row-container.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { Component, Input, ElementRef } from '@angular/core';
import { unrx } from '../utils';
import { PblNgridMetaRowService } from './meta-row.service';
export class PblNgridMetaRowContainerComponent {
    /**
     * @param {?} metaRows
     * @param {?} elRef
     */
    constructor(metaRows, elRef) {
        this.metaRows = metaRows;
        this._width$ = new Subject();
        this._totalColumnWidth = 0;
        this.element = elRef.nativeElement;
        metaRows.sync.pipe(unrx(this)).subscribe((/**
         * @return {?}
         */
        () => this.syncRowDefinitions()));
        this.metaRows.extApi.events
            .pipe(unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onResizeRow') {
                this.updateWidths();
            }
        }));
        this.metaRows.extApi.grid.columnApi.totalColumnWidthChange
            .pipe(unrx(this))
            .subscribe((/**
         * @param {?} width
         * @return {?}
         */
        width => {
            this._totalColumnWidth = width;
            this.updateWidths();
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('type' in changes) {
            /** @type {?} */
            const scrollContainerElement = this.element;
            scrollContainerElement.scrollLeft = this.metaRows.extApi.grid.viewport.measureScrollOffset('start');
            if (changes.type.isFirstChange) {
                this.metaRows.hzScroll
                    .pipe(unrx(this))
                    .subscribe((/**
                 * @param {?} offset
                 * @return {?}
                 */
                offset => scrollContainerElement.scrollLeft = offset));
                this.metaRows.extApi.cdkTable.onRenderRows
                    .pipe(unrx(this))
                    .subscribe((/**
                 * @return {?}
                 */
                () => { this.updateWidths(); }));
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._width$.complete();
        unrx.kill(this);
    }
    /**
     * @private
     * @return {?}
     */
    updateWidths() {
        this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
        this._minWidth = this.metaRows.extApi.cdkTable.minWidth;
        this._width = Math.max(this._innerWidth, this._minWidth);
        this._width$.next(Math.max(this._innerWidth, this._totalColumnWidth));
    }
    /**
     * @private
     * @return {?}
     */
    syncRowDefinitions() {
        /** @type {?} */
        const isHeader = this.type === 'header';
        /** @type {?} */
        const section = isHeader ? this.metaRows.header : this.metaRows.footer;
        /** @type {?} */
        const widthContainer = this.element.firstElementChild;
        /** @type {?} */
        const container = widthContainer.nextElementSibling;
        if (isHeader) {
            widthContainer.appendChild(this.metaRows.gridWidthRow.el);
        }
        for (const def of section.fixed) {
            container.appendChild(def.el);
        }
    }
}
PblNgridMetaRowContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'div[pbl-ngrid-fixed-meta-row-container]',
                template: `<div class="pbl-cdk-table" [style.width.px]="_width"></div><div class="pbl-cdk-table" [style.width.px]="_width$ | async"></div>`,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    style: 'flex: 0 0 auto; overflow: hidden;',
                    '[style.width.px]': '_innerWidth',
                }
            }] }
];
/** @nocollapse */
PblNgridMetaRowContainerComponent.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblNgridMetaRowContainerComponent.propDecorators = {
    type: [{ type: Input, args: ['pbl-ngrid-fixed-meta-row-container',] }]
};
if (false) {
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype.type;
    /**
     * The inner width of the grid, the viewport width of a row.
     * The width of the grid minus scroll bar.
     * @type {?}
     */
    PblNgridMetaRowContainerComponent.prototype._innerWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._minWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width$;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype._totalColumnWidth;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype.element;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype.metaRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQVU1RCxNQUFNLE9BQU8saUNBQWlDOzs7OztJQWdCNUMsWUFBNEIsUUFBZ0MsRUFBRSxLQUE4QjtRQUFoRSxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUxuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUVqQyxzQkFBaUIsR0FBVyxDQUFDLENBQUM7UUFJcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7OztRQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTTthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCLFNBQVM7Ozs7UUFBRSxLQUFLLENBQUMsRUFBRTtZQUNsQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUNoQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCO2FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxDQUFDO0lBQ1AsQ0FBQzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFOztrQkFDZixzQkFBc0IsR0FBRyxJQUFJLENBQUMsT0FBTztZQUMzQyxzQkFBc0IsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVwRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7cUJBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hCLFNBQVM7Ozs7Z0JBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLEdBQUcsTUFBTSxFQUFFLENBQUM7Z0JBRXJFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZO3FCQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQixTQUFTOzs7Z0JBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFDLENBQUM7YUFDOUM7U0FDRjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ2pFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUE7SUFDdkUsQ0FBQzs7Ozs7SUFFTyxrQkFBa0I7O2NBQ2xCLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVE7O2NBQ2pDLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07O2NBRWhFLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7Y0FDL0MsU0FBUyxHQUFHLGNBQWMsQ0FBQyxrQkFBa0I7UUFFbkQsSUFBSSxRQUFRLEVBQUU7WUFDWixjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsS0FBSyxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQy9CLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBckZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUNBQXlDO2dCQUNuRCxRQUFRLEVBQUUsaUlBQWlJO2dCQUMzSSxJQUFJLEVBQUU7O29CQUNKLEtBQUssRUFBRSxtQ0FBbUM7b0JBQzFDLGtCQUFrQixFQUFFLGFBQWE7aUJBQ2xDO2FBQ0Y7Ozs7WUFUUSxzQkFBc0I7WUFISixVQUFVOzs7bUJBZWxDLEtBQUssU0FBQyxvQ0FBb0M7Ozs7SUFBM0MsaURBQXVFOzs7Ozs7SUFNdkUsd0RBQW9COztJQUNwQixzREFBa0I7O0lBQ2xCLG1EQUFlOztJQUNmLG9EQUF5Qzs7Ozs7SUFFekMsOERBQXNDOzs7OztJQUN0QyxvREFBNkI7O0lBRWpCLHFEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IHVucnggfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvdy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGJsLWNkay10YWJsZVwiIFtzdHlsZS53aWR0aC5weF09XCJfd2lkdGhcIj48L2Rpdj48ZGl2IGNsYXNzPVwicGJsLWNkay10YWJsZVwiIFtzdHlsZS53aWR0aC5weF09XCJfd2lkdGgkIHwgYXN5bmNcIj48L2Rpdj5gLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgc3R5bGU6ICdmbGV4OiAwIDAgYXV0bzsgb3ZlcmZsb3c6IGhpZGRlbjsnLFxuICAgICdbc3R5bGUud2lkdGgucHhdJzogJ19pbm5lcldpZHRoJyxcbiAgfSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNZXRhUm93Q29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgncGJsLW5ncmlkLWZpeGVkLW1ldGEtcm93LWNvbnRhaW5lcicpIHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG5cbiAgLyoqXG4gICAqIFRoZSBpbm5lciB3aWR0aCBvZiB0aGUgZ3JpZCwgdGhlIHZpZXdwb3J0IHdpZHRoIG9mIGEgcm93LlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGdyaWQgbWludXMgc2Nyb2xsIGJhci5cbiAgICovXG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XG4gIF9taW5XaWR0aDogbnVtYmVyO1xuICBfd2lkdGg6IG51bWJlcjtcbiAgcmVhZG9ubHkgX3dpZHRoJCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBwcml2YXRlIF90b3RhbENvbHVtbldpZHRoOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtZXRhUm93czogUGJsTmdyaWRNZXRhUm93U2VydmljZSwgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICBtZXRhUm93cy5zeW5jLnBpcGUodW5yeCh0aGlzKSkuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLnN5bmNSb3dEZWZpbml0aW9ucygpICk7XG4gICAgdGhpcy5tZXRhUm93cy5leHRBcGkuZXZlbnRzXG4gICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uUmVzaXplUm93Jykge1xuICAgICAgICAgIHRoaXMudXBkYXRlV2lkdGhzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQuY29sdW1uQXBpLnRvdGFsQ29sdW1uV2lkdGhDaGFuZ2VcbiAgICAgIC5waXBlKHVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCB3aWR0aCA9PiB7XG4gICAgICAgIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy51cGRhdGVXaWR0aHMoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICgndHlwZScgaW4gY2hhbmdlcykge1xuICAgICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVyRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICAgIHNjcm9sbENvbnRhaW5lckVsZW1lbnQuc2Nyb2xsTGVmdCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQudmlld3BvcnQubWVhc3VyZVNjcm9sbE9mZnNldCgnc3RhcnQnKTtcblxuICAgICAgaWYgKGNoYW5nZXMudHlwZS5pc0ZpcnN0Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMubWV0YVJvd3MuaHpTY3JvbGxcbiAgICAgICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIG9mZnNldCA9PiBzY3JvbGxDb250YWluZXJFbGVtZW50LnNjcm9sbExlZnQgPSBvZmZzZXQgKTtcblxuICAgICAgICB0aGlzLm1ldGFSb3dzLmV4dEFwaS5jZGtUYWJsZS5vblJlbmRlclJvd3NcbiAgICAgICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHsgdGhpcy51cGRhdGVXaWR0aHMoKSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCQuY29tcGxldGUoKTtcbiAgICB1bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVdpZHRocygpOiB2b2lkIHtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkuZ3JpZC52aWV3cG9ydC5pbm5lcldpZHRoO1xuICAgIHRoaXMuX21pbldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkuY2RrVGFibGUubWluV2lkdGg7XG4gICAgdGhpcy5fd2lkdGggPSBNYXRoLm1heCh0aGlzLl9pbm5lcldpZHRoLCB0aGlzLl9taW5XaWR0aCk7XG4gICAgdGhpcy5fd2lkdGgkLm5leHQoTWF0aC5tYXgodGhpcy5faW5uZXJXaWR0aCwgdGhpcy5fdG90YWxDb2x1bW5XaWR0aCkpXG4gIH1cblxuICBwcml2YXRlIHN5bmNSb3dEZWZpbml0aW9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBpc0hlYWRlciA9IHRoaXMudHlwZSA9PT0gJ2hlYWRlcic7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGlzSGVhZGVyID8gdGhpcy5tZXRhUm93cy5oZWFkZXIgOiB0aGlzLm1ldGFSb3dzLmZvb3RlcjtcblxuICAgIGNvbnN0IHdpZHRoQ29udGFpbmVyID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZHRoQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZztcblxuICAgIGlmIChpc0hlYWRlcikge1xuICAgICAgd2lkdGhDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5tZXRhUm93cy5ncmlkV2lkdGhSb3cuZWwpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZGVmIG9mIHNlY3Rpb24uZml4ZWQpIHtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWYuZWwpO1xuICAgIH1cbiAgfVxufVxuIl19