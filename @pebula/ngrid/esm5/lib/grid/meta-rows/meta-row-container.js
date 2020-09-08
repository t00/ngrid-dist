/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/meta-rows/meta-row-container.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { Subject } from 'rxjs';
import { Component, Input, ElementRef } from '@angular/core';
import { unrx } from '../utils';
import { PblNgridMetaRowService } from './meta-row.service';
var PblNgridMetaRowContainerComponent = /** @class */ (function () {
    function PblNgridMetaRowContainerComponent(metaRows, elRef) {
        var _this = this;
        this.metaRows = metaRows;
        this._width$ = new Subject();
        this._totalColumnWidth = 0;
        this.element = elRef.nativeElement;
        metaRows.sync.pipe(unrx(this)).subscribe((/**
         * @return {?}
         */
        function () { return _this.syncRowDefinitions(); }));
        this.metaRows.extApi.events
            .pipe(unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onResizeRow') {
                _this.updateWidths();
            }
        }));
        this.metaRows.extApi.grid.columnApi.totalColumnWidthChange
            .pipe(unrx(this))
            .subscribe((/**
         * @param {?} width
         * @return {?}
         */
        function (width) {
            _this._totalColumnWidth = width;
            _this.updateWidths();
        }));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PblNgridMetaRowContainerComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if ('type' in changes) {
            /** @type {?} */
            var scrollContainerElement_1 = this.element;
            scrollContainerElement_1.scrollLeft = this.metaRows.extApi.grid.viewport.measureScrollOffset('start');
            if (changes.type.isFirstChange) {
                this.metaRows.hzScroll
                    .pipe(unrx(this))
                    .subscribe((/**
                 * @param {?} offset
                 * @return {?}
                 */
                function (offset) { return scrollContainerElement_1.scrollLeft = offset; }));
                this.metaRows.extApi.cdkTable.onRenderRows
                    .pipe(unrx(this))
                    .subscribe((/**
                 * @return {?}
                 */
                function () { _this.updateWidths(); }));
            }
        }
    };
    /**
     * @return {?}
     */
    PblNgridMetaRowContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._width$.complete();
        unrx.kill(this);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridMetaRowContainerComponent.prototype.updateWidths = /**
     * @private
     * @return {?}
     */
    function () {
        this._innerWidth = this.metaRows.extApi.grid.viewport.innerWidth;
        this._minWidth = this.metaRows.extApi.cdkTable.minWidth;
        this._width = Math.max(this._innerWidth, this._minWidth);
        this._width$.next(Math.max(this._innerWidth, this._totalColumnWidth));
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridMetaRowContainerComponent.prototype.syncRowDefinitions = /**
     * @private
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var isHeader = this.type === 'header';
        /** @type {?} */
        var section = isHeader ? this.metaRows.header : this.metaRows.footer;
        /** @type {?} */
        var widthContainer = this.element.firstElementChild;
        /** @type {?} */
        var container = widthContainer.nextElementSibling;
        if (isHeader) {
            widthContainer.appendChild(this.metaRows.gridWidthRow.el);
        }
        try {
            for (var _b = __values(section.fixed), _c = _b.next(); !_c.done; _c = _b.next()) {
                var def = _c.value;
                container.appendChild(def.el);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    PblNgridMetaRowContainerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'div[pbl-ngrid-fixed-meta-row-container]',
                    template: "<div class=\"pbl-cdk-table\" [style.width.px]=\"_width\"></div><div class=\"pbl-cdk-table\" [style.width.px]=\"_width$ | async\"></div>",
                    host: {
                        // tslint:disable-line:use-host-property-decorator
                        style: 'flex: 0 0 auto; overflow: hidden;',
                        '[style.width.px]': '_innerWidth',
                    }
                }] }
    ];
    /** @nocollapse */
    PblNgridMetaRowContainerComponent.ctorParameters = function () { return [
        { type: PblNgridMetaRowService },
        { type: ElementRef }
    ]; };
    PblNgridMetaRowContainerComponent.propDecorators = {
        type: [{ type: Input, args: ['pbl-ngrid-fixed-meta-row-container',] }]
    };
    return PblNgridMetaRowContainerComponent;
}());
export { PblNgridMetaRowContainerComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQXVDLE1BQU0sZUFBZSxDQUFDO0FBRWxHLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFNUQ7SUF3QkUsMkNBQTRCLFFBQWdDLEVBQUUsS0FBOEI7UUFBNUYsaUJBZ0JDO1FBaEIyQixhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUxuRCxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUVqQyxzQkFBaUIsR0FBVyxDQUFDLENBQUM7UUFJcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVM7OztRQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBekIsQ0FBeUIsRUFBRSxDQUFDO1FBQzVFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU07YUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoQixTQUFTOzs7O1FBQUUsVUFBQSxLQUFLO1lBQ2YsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsRUFBRTtnQkFDaEMsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsUUFBUSxD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QUMvQjs7Ozs7Ozs7O0lBQ0gsQ0FBQzs7Z0JBckZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUNBQXlDO29CQUNuRCxRQUFRLEVBQUUseUlBQWlJO29CQUMzSSxJQUFJLEVBQUU7O3dCQUNKLEtBQUssRUFBRSxtQ0FBbUM7d0JBQzFDLGtCQUFrQixFQUFFLGFBQWE7cUJBQ2xDO2lCQUNGOzs7O2dCQVRRLHNCQUFzQjtnQkFISixVQUFVOzs7dUJBZWxDLEtBQUssU0FBQyxvQ0FBb0M7O0lBNEU3Qyx3Q0FBQztDQUFBLEFBdEZELElBc0ZDO1NBOUVZLGlDQUFpQzs7O0lBRTVDLGlEQUF1RTs7Ozs7O0lBTXZFLHdEQUFvQjs7SUFDcEIsc0RBQWtCOztJQUNsQixtREFBZTs7SUFDZixvREFBeUM7Ozs7O0lBRXpDLDhEQUFzQzs7Ozs7SUFDdEMsb0RBQTZCOztJQUVqQixxREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyB1bnJ4IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3cuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2RpdltwYmwtbmdyaWQtZml4ZWQtbWV0YS1yb3ctY29udGFpbmVyXScsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBibC1jZGstdGFibGVcIiBbc3R5bGUud2lkdGgucHhdPVwiX3dpZHRoXCI+PC9kaXY+PGRpdiBjbGFzcz1cInBibC1jZGstdGFibGVcIiBbc3R5bGUud2lkdGgucHhdPVwiX3dpZHRoJCB8IGFzeW5jXCI+PC9kaXY+YCxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgIHN0eWxlOiAnZmxleDogMCAwIGF1dG87IG92ZXJmbG93OiBoaWRkZW47JyxcbiAgICAnW3N0eWxlLndpZHRoLnB4XSc6ICdfaW5uZXJXaWR0aCcsXG4gIH0sXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkTWV0YVJvd0NvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoJ3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXInKSB0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5uZXIgd2lkdGggb2YgdGhlIGdyaWQsIHRoZSB2aWV3cG9ydCB3aWR0aCBvZiBhIHJvdy5cbiAgICogVGhlIHdpZHRoIG9mIHRoZSBncmlkIG1pbnVzIHNjcm9sbCBiYXIuXG4gICAqL1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBfbWluV2lkdGg6IG51bWJlcjtcbiAgX3dpZHRoOiBudW1iZXI7XG4gIHJlYWRvbmx5IF93aWR0aCQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG5cbiAgcHJpdmF0ZSBfdG90YWxDb2x1bW5XaWR0aDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbWV0YVJvd3Muc3luYy5waXBlKHVucngodGhpcykpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5zeW5jUm93RGVmaW5pdGlvbnMoKSApO1xuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmV2ZW50c1xuICAgICAgLnBpcGUodW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvblJlc2l6ZVJvdycpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVdpZHRocygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ncmlkLmNvbHVtbkFwaS50b3RhbENvbHVtbldpZHRoQ2hhbmdlXG4gICAgICAucGlwZSh1bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggd2lkdGggPT4ge1xuICAgICAgICB0aGlzLl90b3RhbENvbHVtbldpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMudXBkYXRlV2lkdGhzKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoJ3R5cGUnIGluIGNoYW5nZXMpIHtcbiAgICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICBzY3JvbGxDb250YWluZXJFbGVtZW50LnNjcm9sbExlZnQgPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ncmlkLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoJ3N0YXJ0Jyk7XG5cbiAgICAgIGlmIChjaGFuZ2VzLnR5cGUuaXNGaXJzdENoYW5nZSkge1xuICAgICAgICB0aGlzLm1ldGFSb3dzLmh6U2Nyb2xsXG4gICAgICAgICAgLnBpcGUodW5yeCh0aGlzKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCBvZmZzZXQgPT4gc2Nyb2xsQ29udGFpbmVyRWxlbWVudC5zY3JvbGxMZWZ0ID0gb2Zmc2V0ICk7XG5cbiAgICAgICAgdGhpcy5tZXRhUm93cy5leHRBcGkuY2RrVGFibGUub25SZW5kZXJSb3dzXG4gICAgICAgICAgLnBpcGUodW5yeCh0aGlzKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7IHRoaXMudXBkYXRlV2lkdGhzKCkgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fd2lkdGgkLmNvbXBsZXRlKCk7XG4gICAgdW5yeC5raWxsKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVXaWR0aHMoKTogdm9pZCB7XG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQudmlld3BvcnQuaW5uZXJXaWR0aDtcbiAgICB0aGlzLl9taW5XaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmNka1RhYmxlLm1pbldpZHRoO1xuICAgIHRoaXMuX3dpZHRoID0gTWF0aC5tYXgodGhpcy5faW5uZXJXaWR0aCwgdGhpcy5fbWluV2lkdGgpO1xuICAgIHRoaXMuX3dpZHRoJC5uZXh0KE1hdGgubWF4KHRoaXMuX2lubmVyV2lkdGgsIHRoaXMuX3RvdGFsQ29sdW1uV2lkdGgpKVxuICB9XG5cbiAgcHJpdmF0ZSBzeW5jUm93RGVmaW5pdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgaXNIZWFkZXIgPSB0aGlzLnR5cGUgPT09ICdoZWFkZXInO1xuICAgIGNvbnN0IHNlY3Rpb24gPSBpc0hlYWRlciA/IHRoaXMubWV0YVJvd3MuaGVhZGVyIDogdGhpcy5tZXRhUm93cy5mb290ZXI7XG5cbiAgICBjb25zdCB3aWR0aENvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCBjb250YWluZXIgPSB3aWR0aENvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICBpZiAoaXNIZWFkZXIpIHtcbiAgICAgIHdpZHRoQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMubWV0YVJvd3MuZ3JpZFdpZHRoUm93LmVsKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGRlZiBvZiBzZWN0aW9uLmZpeGVkKSB7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZGVmLmVsKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==