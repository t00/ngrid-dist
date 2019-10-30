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
                _this._innerWidth = _this.metaRows.extApi.table.viewport.innerWidth;
                _this._minWidth = _this.metaRows.extApi.cdkTable.minWidth;
                _this._width = Math.max(_this._innerWidth, _this._minWidth);
            }
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
        scrollContainerElement.scrollLeft = this.metaRows.extApi.table.viewport.measureScrollOffset('start');
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
            _this._innerWidth = _this.metaRows.extApi.table.viewport.innerWidth;
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
        this.defs = [];
        /** @type {?} */
        var isHeader = this._type === 'header';
        /** @type {?} */
        var section = isHeader ? this.metaRows.header : this.metaRows.footer;
        /** @type {?} */
        var container = this.element.firstElementChild;
        try {
            for (var _b = tslib_1.__values(section.fixed), _c = _b.next(); !_c.done; _c = _b.next()) {
                var def = _c.value;
                this.defs.push(def);
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
                    template: "<div class=\"pbl-cdk-table\" [style.width.px]=\"_width\"></div>",
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
     * The inner width of the table, the viewport width of a row.
     * The width of the table minus scroll bar.
     * @type {?}
     */
    PblNgridMetaRowContainerComponent.prototype._innerWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._minWidth;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype._width;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype._type;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype.defs;
    /**
     * @type {?}
     * @private
     */
    PblNgridMetaRowContainerComponent.prototype.element;
    /** @type {?} */
    PblNgridMetaRowContainerComponent.prototype.metaRows;
    /* Skipping unhandled member: ;*/
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9tZXRhLXJvd3MvbWV0YS1yb3ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBK0IxRCwyQ0FBNEIsUUFBZ0MsRUFBRSxLQUE4QjtRQUE1RixpQkFZQztRQVoyQixhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUzs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUF6QixDQUF5QixFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTTthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUNoQyxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUNsRSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hELEtBQUksQ0FBQyxNQUFNLEdBQUcs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aUNBQWlDOzs7Ozs7O0lBWTVDLHdEQUFvQjs7SUFDcEIsc0RBQWtCOztJQUNsQixtREFBZTs7Ozs7SUFFZixrREFBbUM7Ozs7O0lBQ25DLGlEQUFzRTs7Ozs7SUFDdEUsb0RBQTZCOztJQUVqQixxREFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvdy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGl2W3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXJdJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGJsLWNkay10YWJsZVwiIFtzdHlsZS53aWR0aC5weF09XCJfd2lkdGhcIj48L2Rpdj5gLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgc3R5bGU6ICdmbGV4OiAwIDAgYXV0bzsgb3ZlcmZsb3c6IGhpZGRlbjsnLFxuICAgICdbc3R5bGUud2lkdGgucHhdJzogJ19pbm5lcldpZHRoJyxcbiAgfSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRNZXRhUm93Q29udGFpbmVyQ29tcG9uZW50IHtcblxuICBASW5wdXQoJ3BibC1uZ3JpZC1maXhlZC1tZXRhLXJvdy1jb250YWluZXInKSBzZXQgdHlwZSh2YWx1ZTogJ2hlYWRlcicgfCAnZm9vdGVyJykge1xuICAgIGlmICh0aGlzLl90eXBlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5pbml0KHZhbHVlKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBpbm5lciB3aWR0aCBvZiB0aGUgdGFibGUsIHRoZSB2aWV3cG9ydCB3aWR0aCBvZiBhIHJvdy5cbiAgICogVGhlIHdpZHRoIG9mIHRoZSB0YWJsZSBtaW51cyBzY3JvbGwgYmFyLlxuICAgKi9cbiAgX2lubmVyV2lkdGg6IG51bWJlcjtcbiAgX21pbldpZHRoOiBudW1iZXI7XG4gIF93aWR0aDogbnVtYmVyO1xuXG4gIHByaXZhdGUgX3R5cGU6ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG4gIHByaXZhdGUgZGVmczogQXJyYXk8eyBpbmRleDogbnVtYmVyOyByb3dEZWY6IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9PjtcbiAgcHJpdmF0ZSBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbWV0YVJvd3Muc3luYy5waXBlKFVuUngodGhpcykpLnN1YnNjcmliZSggKCkgPT4gdGhpcy5zeW5jUm93RGVmaW5pdGlvbnMoKSApO1xuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmV2ZW50c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvblJlc2l6ZVJvdycpIHtcbiAgICAgICAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkudGFibGUudmlld3BvcnQuaW5uZXJXaWR0aDtcbiAgICAgICAgICB0aGlzLl9taW5XaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLmNka1RhYmxlLm1pbldpZHRoO1xuICAgICAgICAgIHRoaXMuX3dpZHRoID0gTWF0aC5tYXgodGhpcy5faW5uZXJXaWR0aCwgdGhpcy5fbWluV2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdCh0eXBlOiAnaGVhZGVyJyB8ICdmb290ZXInKTogdm9pZCB7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2hlYWRlcicpIHtcbiAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90eXBlID0gJ2Zvb3Rlcic7XG4gICAgfVxuXG4gICAgY29uc3Qgc2Nyb2xsQ29udGFpbmVyRWxlbWVudCA9IHRoaXMuZWxlbWVudDtcbiAgICBzY3JvbGxDb250YWluZXJFbGVtZW50LnNjcm9sbExlZnQgPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS50YWJsZS52aWV3cG9ydC5tZWFzdXJlU2Nyb2xsT2Zmc2V0KCdzdGFydCcpO1xuXG4gICAgdGhpcy5tZXRhUm93cy5oelNjcm9sbFxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIG9mZnNldCA9PiBzY3JvbGxDb250YWluZXJFbGVtZW50LnNjcm9sbExlZnQgPSBvZmZzZXQgKTtcblxuICAgIHRoaXMubWV0YVJvd3MuZXh0QXBpLmNka1RhYmxlLm9uUmVuZGVyUm93c1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLnRhYmxlLnZpZXdwb3J0LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gTWF0aC5tYXgodGhpcy5faW5uZXJXaWR0aCwgdGhpcy5fbWluV2lkdGgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN5bmNSb3dEZWZpbml0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmRlZnMgPSBbXTtcbiAgICBjb25zdCBpc0hlYWRlciA9IHRoaXMuX3R5cGUgPT09ICdoZWFkZXInO1xuICAgIGNvbnN0IHNlY3Rpb24gPSBpc0hlYWRlciA/IHRoaXMubWV0YVJvd3MuaGVhZGVyIDogdGhpcy5tZXRhUm93cy5mb290ZXI7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLmVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgZm9yIChjb25zdCBkZWYgb2Ygc2VjdGlvbi5maXhlZCkge1xuICAgICAgdGhpcy5kZWZzLnB1c2goZGVmKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkZWYuZWwpO1xuICAgIH1cbiAgfVxufVxuIl19