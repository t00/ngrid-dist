/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, ElementRef } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridMetaRowService } from './meta-row.service';
var PblNgridMetaRowContainerComponent = /** @class */ (function () {
    function PblNgridMetaRowContainerComponent(metaRows, elRef) {
        var _this = this;
        this.metaRows = metaRows;
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
                _this._innerWidth = _this.metaRows.extApi.grid.viewport.innerWidth;
                _this._minWidth = _this.metaRows.extApi.cdkTable.minWidth;
                _this._width = Math.max(_this._innerWidth, _this._minWidth);
            }
        }));
        this._width$ = this.metaRows.extApi.grid.columnApi.totalColumnWidthChange;
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
        function () {
            _this._innerWidth = _this.metaRows.extApi.grid.viewport.innerWidth;
            _this._width = Math.max(_this._innerWidth, _this._minWidth);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUdyQyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFpQzFELDJDQUE0QixRQUFnQyxFQUFFLEtBQThCO1FBQTVGLGlCQWFDO1FBYjJCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQzFELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNuQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLGtCQUFrQixFQUFFLEVBQXpCLENBQXlCLEVBQUUsQ0FBQztRQUM1RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNO2FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7OztRQUFFLFVBQUEsS0FBSztZQUNmLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxhQUFhLEVBQUU7Z0JBQ2hDLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7Z0JBQ2pFLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztnQkFDeEQsS0FBSSxDQUFDLE1BQU0sR0FBRyxJ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Rjs7OztnQkFWUSxzQkFBc0I7Z0JBTEosVUFBVTs7O3VCQW1CbEMsS0FBSyxTQUFDLG9DQUFvQzs7SUFGaEMsaUNBQWlDO1FBRDdDLElBQUksRUFBRTtpREFzQmlDLHNCQUFzQixFQUFTLFVBQVU7T0FyQnBFLGlDQUFpQyxDQTBFN0M7SUFBRCx3Q0FBQztDQUFBLElBQUE7U0ExRVksaUNBQWlDOzs7Ozs7O0lBWTVDLHdEQUFvQjs7SUFDcEIsc0RBQWtCOztJQUNsQixtREFBZTs7SUFFZixvREFBcUM7Ozs7O0lBRXJDLGtEQUFtQzs7Ozs7SUFDbkMsb0RBQTZCOztJQUVqQixxREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvdy5zZXJ2aWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGJsLWNkay10YWJsZVwiIFtzdHlsZS53aWR0aC5weF09XCJfd2lkdGhcIj48L2Rpdj48ZGl2IGNsYXNzPVwicGJsLWNkay10YWJsZVwiIFtzdHlsZS53aWR0aC5weF09XCJfd2lkdGgkIHwgYXN5bmNcIj48L2Rpdj5gLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgc3R5bGU6ICdmbGV4OiAwIDAgYXV0bzsgb3ZlcmZsb3c6IGhpZGRlbjsnLFxuICAgICdbc3R5bGUud2lkdGgucHhdJzogJ19pbm5lcldpZHRoJyxcbiAgfSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNZXRhUm93Q29udGFpbmVyQ29tcG9uZW50IHtcblxuICBASW5wdXQoJ3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXInKSBzZXQgdHlwZSh2YWx1ZTogJ2hlYWRlcicgfCAnZm9vdGVyJykge1xuICAgIGlmICh0aGlzLl90eXBlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5pbml0KHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBpbm5lciB3aWR0aCBvZiB0aGUgZ3JpZCwgdGhlIHZpZXdwb3J0IHdpZHRoIG9mIGEgcm93LlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIGdyaWQgbWludXMgc2Nyb2xsIGJhci5cbiAgICovXG4gIF9pbm5lcldpZHRoOiBudW1iZXI7XG4gIF9taW5XaWR0aDogbnVtYmVyO1xuICBfd2lkdGg6IG51bWJlcjtcblxuICByZWFkb25seSBfd2lkdGgkOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBfdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJztcbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbWV0YVJvd3Muc3luYy5waXBlKFVuUngodGhpcykpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5zeW5jUm93RGVmaW5pdGlvbnMoKSApO1xuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmV2ZW50c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvblJlc2l6ZVJvdycpIHtcbiAgICAgICAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkuZ3JpZC52aWV3cG9ydC5pbm5lcldpZHRoO1xuICAgICAgICAgIHRoaXMuX21pbldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkuY2RrVGFibGUubWluV2lkdGg7XG4gICAgICAgICAgdGhpcy5fd2lkdGggPSBNYXRoLm1heCh0aGlzLl9pbm5lcldpZHRoLCB0aGlzLl9taW5XaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHRoaXMuX3dpZHRoJCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQuY29sdW1uQXBpLnRvdGFsQ29sdW1uV2lkdGhDaGFuZ2U7XG4gIH1cblxuICBwcml2YXRlIGluaXQodHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJyk6IHZvaWQge1xuXG4gICAgaWYgKHR5cGUgPT09ICdoZWFkZXInKSB7XG4gICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdHlwZSA9ICdmb290ZXInO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcm9sbENvbnRhaW5lckVsZW1lbnQgPSB0aGlzLmVsZW1lbnQ7XG4gICAgc2Nyb2xsQ29udGFpbmVyRWxlbWVudC5zY3JvbGxMZWZ0ID0gdGhpcy5tZXRhUm93cy5leHRBcGkuZ3JpZC52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCdzdGFydCcpO1xuXG4gICAgdGhpcy5tZXRhUm93cy5oelNjcm9sbFxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIG9mZnNldCA9PiBzY3JvbGxDb250YWluZXJFbGVtZW50LnNjcm9sbExlZnQgPSBvZmZzZXQgKTtcblxuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmNka1RhYmxlLm9uUmVuZGVyUm93c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmdyaWQudmlld3BvcnQuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBNYXRoLm1heCh0aGlzLl9pbm5lcldpZHRoLCB0aGlzLl9taW5XaWR0aCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3luY1Jvd0RlZmluaXRpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGlzSGVhZGVyID0gdGhpcy5fdHlwZSA9PT0gJ2hlYWRlcic7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGlzSGVhZGVyID8gdGhpcy5tZXRhUm93cy5oZWFkZXIgOiB0aGlzLm1ldGFSb3dzLmZvb3RlcjtcblxuICAgIGNvbnN0IHdpZHRoQ29udGFpbmVyID0gdGhpcy5lbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHdpZHRoQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZztcblxuICAgIGlmIChpc0hlYWRlcikge1xuICAgICAgd2lkdGhDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5tZXRhUm93cy5ncmlkV2lkdGhSb3cuZWwpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgZGVmIG9mIHNlY3Rpb24uZml4ZWQpIHtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWYuZWwpO1xuICAgIH1cbiAgfVxufVxuIl19