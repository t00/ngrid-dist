/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { Component, Input, ElementRef, OnDestroy } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridMetaRowService } from './meta-row.service';
var PblNgridMetaRowContainerComponent = /** @class */ (function () {
    function PblNgridMetaRowContainerComponent(metaRows, elRef) {
        var _this = this;
        this.metaRows = metaRows;
        this._width$ = new Subject();
        this._totalColumnWidth = 0;
        this.element = elRef.nativeElement;
        metaRows.sync.pipe(UnRx(this)).subscribe((/**
         * @return {?}
         */
        function () { return _this.syncRowDefinitions(); }));
        this.metaRows.extApi.events
            .pipe(UnRx(this))
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
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} width
         * @return {?}
         */
        function (width) {
            _this._totalColumnWidth = width;
            _this.updateWidths();
        }));
    }
    Object.defineProperty(PblNgridMetaRowContainerComponent.prototype, "type", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (this._type !== value) {
                this.init(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * @return {?}
     */
    PblNgridMetaRowContainerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._width$.complete();
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
     * @param {?} type
     * @return {?}
     */
    PblNgridMetaRowContainerComponent.prototype.init = /**
     * @private
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var _this = this;
        if (type === 'header') {
            this._type = type;
        }
        else {
            this._type = 'footer';
        }
        /** @type {?} */
        var scrollContainerElement = this.element;
        scrollContainerElement.scrollLeft = this.metaRows.extApi.grid.viewport.measureScrollOffset('start');
        this.metaRows.hzScroll
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} offset
         * @return {?}
         */
        function (offset) { return scrollContainerElement.scrollLeft = offset; }));
        this.metaRows.extApi.cdkTable.onRenderRows
            .pipe(UnRx(this))
            .subscribe((/**
         * @return {?}
         */
        function () { _this.updateWidths(); }));
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
        var isHeader = this._type === 'header';
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
            for (var _b = tslib_1.__values(section.fixed), _c = _b.next(); !_c.done; _c = _b.next()) {
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
    PblNgridMetaRowContainerComponent.ctorParameters = function () { return [
        { type: PblNgridMetaRowService },
        { type: ElementRef }
    ]; };
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
    PblNgridMetaRowContainerComponent = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridMetaRowService, ElementRef])
    ], PblNgridMetaRowContainerComponent);
    return PblNgridMetaRowContainerComponent;
}());
export { PblNgridMetaRowContainerComponent };
if (false) {
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
    PblNgridMetaRowContainerComponent.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype.element;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype.metaRows;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVyQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFnQzFELDJDQUE0QixRQUFnQyxFQUFFLEtBQThCO1FBQTVGLGlCQWdCQztRQWhCMkIsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFObkQsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFFakMsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBS3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixFQUFFLEVBQXpCLENBQXlCLEVBQUUsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLFVBQUEsS0FBSztZQUNmLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7Z0JBQ2hDLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLFFB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QUFFLENBQUMsQ0FBQztTQUMzRDs7WUFFRCxLQUFrQixJQUFBLEtBQUEsaUJBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQSxnQkFBQSw0QkFBRTtnQkFBNUIsSUFBTSxHQUFHLFdBQUE7Z0JBQ1osU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDL0I7Ozs7Ozs7OztJQUNILENBQUM7O2dCQTlEcUMsc0JBQXNCO2dCQUFTLFVBQVU7OztnQkE5QmhGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUNBQXlDO29CQUNuRCxRQUFRLEVBQUUseUlBQWlJO29CQUMzSSxJQUFJLEVBQUU7O3dCQUNKLEtBQUssRUFBRSxtQ0FBbUM7d0JBQzFDLGtCQUFrQixFQUFFLGFBQWE7cUJBQ2xDO2lCQUNGOzs7O2dCQVRRLHNCQUFzQjtnQkFISixVQUFVOzs7dUJBZ0JsQyxLQUFLLFNBQUMsb0NBQW9DOztJQUZoQyxpQ0FBaUM7UUFEN0MsSUFBSSxFQUFFO2lEQXNCaUMsc0JBQXNCLEVBQVMsVUFBVTtPQXJCcEUsaUNBQWlDLENBb0Y3QztJQUFELHdDQUFDO0NBQUEsSUFBQTtTQXBGWSxpQ0FBaUM7Ozs7Ozs7SUFZNUMsd0RBQW9COztJQUNwQixzREFBa0I7O0lBQ2xCLG1EQUFlOztJQUNmLG9EQUF5Qzs7Ozs7SUFFekMsOERBQXNDOzs7OztJQUN0QyxrREFBbUM7Ozs7O0lBQ25DLG9EQUE2Qjs7SUFFakIscURBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgRWxlbWVudFJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbcGJsLW5ncmlkLWZpeGVkLW1ldGEtcm93LWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYmwtY2RrLXRhYmxlXCIgW3N0eWxlLndpZHRoLnB4XT1cIl93aWR0aFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJwYmwtY2RrLXRhYmxlXCIgW3N0eWxlLndpZHRoLnB4XT1cIl93aWR0aCQgfCBhc3luY1wiPjwvZGl2PmAsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICBzdHlsZTogJ2ZsZXg6IDAgMCBhdXRvOyBvdmVyZmxvdzogaGlkZGVuOycsXG4gICAgJ1tzdHlsZS53aWR0aC5weF0nOiAnX2lubmVyV2lkdGgnLFxuICB9LFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgncGJsLW5ncmlkLWZpeGVkLW1ldGEtcm93LWNvbnRhaW5lcicpIHNldCB0eXBlKHZhbHVlOiAnaGVhZGVyJyB8ICdmb290ZXInKSB7XG4gICAgaWYgKHRoaXMuX3R5cGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLmluaXQodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhlIGlubmVyIHdpZHRoIG9mIHRoZSBncmlkLCB0aGUgdmlld3BvcnQgd2lkdGggb2YgYSByb3cuXG4gICAqIFRoZSB3aWR0aCBvZiB0aGUgZ3JpZCBtaW51cyBzY3JvbGwgYmFyLlxuICAgKi9cbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgX21pbldpZHRoOiBudW1iZXI7XG4gIF93aWR0aDogbnVtYmVyO1xuICByZWFkb25seSBfd2lkdGgkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuXG4gIHByaXZhdGUgX3RvdGFsQ29sdW1uV2lkdGg6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3R5cGU6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG1ldGFSb3dzOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLCBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIG1ldGFSb3dzLnN5bmMucGlwZShVblJ4KHRoaXMpKS5zdWJzY3JpYmUoICgpID0+IHRoaXMuc3luY1Jvd0RlZmluaXRpb25zKCkgKTtcbiAgICB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ldmVudHNcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25SZXNpemVSb3cnKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVXaWR0aHMoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5tZXRhUm93cy5leHRBcGkuZ3JpZC5jb2x1bW5BcGkudG90YWxDb2x1bW5XaWR0aENoYW5nZVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIHdpZHRoID0+IHtcbiAgICAgICAgdGhpcy5fdG90YWxDb2x1bW5XaWR0aCA9IHdpZHRoO1xuICAgICAgICB0aGlzLnVwZGF0ZVdpZHRocygpO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93aWR0aCQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlV2lkdGhzKCk6IHZvaWQge1xuICAgIHRoaXMuX2lubmVyV2lkdGggPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS5ncmlkLnZpZXdwb3J0LmlubmVyV2lkdGg7XG4gICAgdGhpcy5fbWluV2lkdGggPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS5jZGtUYWJsZS5taW5XaWR0aDtcbiAgICB0aGlzLl93aWR0aCA9IE1hdGgubWF4KHRoaXMuX2lubmVyV2lkdGgsIHRoaXMuX21pbldpZHRoKTtcbiAgICB0aGlzLl93aWR0aCQubmV4dChNYXRoLm1heCh0aGlzLl9pbm5lcldpZHRoLCB0aGlzLl90b3RhbENvbHVtbldpZHRoKSlcbiAgfVxuICBwcml2YXRlIGluaXQodHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJyk6IHZvaWQge1xuXG4gICAgaWYgKHR5cGUgPT09ICdoZWFkZXInKSB7XG4gICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdHlwZSA9ICdmb290ZXInO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudC5zY3JvbGxMZWZ0ID0gdGhpcy5tZXRhUm93cy5leHRBcGkuZ3JpZC52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCdzdGFydCcpO1xuXG4gICAgdGhpcy5tZXRhUm93cy5oelNjcm9sbFxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIG9mZnNldCA9PiBzY3JvbGxDb250YWluZXJFbGVtZW50LnNjcm9sbExlZnQgPSBvZmZzZXQgKTtcblxuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmNka1RhYmxlLm9uUmVuZGVyUm93c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHsgdGhpcy51cGRhdGVXaWR0aHMoKSB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3luY1Jvd0RlZmluaXRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzSGVhZGVyID0gdGhpcy5fdHlwZSA9PT0gJ2hlYWRlcic7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGlzSGVhZGVyID8gdGhpcy5tZXRhUm93cy5oZWFkZXIgOiB0aGlzLm1ldGFSb3dzLmZvb3RlcjtcblxuICAgIGNvbnN0IHdpZHRoQ29udGFpbmVyID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZHRoQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZztcblxuICAgIGlmIChpc0hlYWRlcikge1xuICAgICAgd2lkdGhDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5tZXRhUm93cy5ncmlkV2lkdGhSb3cuZWwpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZGVmIG9mIHNlY3Rpb24uZml4ZWQpIHtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWYuZWwpO1xuICAgIH1cbiAgfVxufVxuIl19