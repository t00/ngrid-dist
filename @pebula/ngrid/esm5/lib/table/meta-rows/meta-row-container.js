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
    PblNgridMetaRowContainerComponent.ctorParameters = function () { return [
        { type: PblNgridMetaRowService },
        { type: ElementRef }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3ctY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9tZXRhLXJvd3MvbWV0YS1yb3ctY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTdELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBK0IxRCwyQ0FBNEIsUUFBZ0MsRUFBRSxLQUE4QjtRQUE1RixpQkFZQztRQVoyQixhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUMxRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUzs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxrQkFBa0IsRUFBRSxFQUF6QixDQUF5QixFQUFFLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTTthQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hCLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO2dCQUNoQyxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2dCQUNsRSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hELEtBQUksQ0FBQyxNQUFNLEdBQUcs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QztJQUFELHdDQUFDO0NBQUEsSUFBQTtTQXBFWSxpQ0FBaUM7Ozs7Ozs7SUFZNUMsd0RBQW9COztJQUNwQixzREFBa0I7O0lBQ2xCLG1EQUFlOzs7OztJQUVmLGtEQUFtQzs7Ozs7SUFDbkMsaURBQXNFOzs7OztJQUN0RSxvREFBNkI7O0lBRWpCLHFEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQgeyBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSBmcm9tICcuLi9jb2x1bW5zL3R5cGVzJztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXZbcGJsLW5ncmlkLWZpeGVkLW1ldGEtcm93LWNvbnRhaW5lcl0nLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwYmwtY2RrLXRhYmxlXCIgW3N0eWxlLndpZHRoLnB4XT1cIl93aWR0aFwiPjwvZGl2PmAsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICBzdHlsZTogJ2ZsZXg6IDAgMCBhdXRvOyBvdmVyZmxvdzogaGlkZGVuOycsXG4gICAgJ1tzdHlsZS53aWR0aC5weF0nOiAnX2lubmVyV2lkdGgnLFxuICB9LFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE1ldGFSb3dDb250YWluZXJDb21wb25lbnQge1xuXG4gIEBJbnB1dCgncGJsLW5ncmlkLWZpeGVkLW1ldGEtcm93LWNvbnRhaW5lcicpIHNldCB0eXBlKHZhbHVlOiAnaGVhZGVyJyB8ICdmb290ZXInKSB7XG4gICAgaWYgKHRoaXMuX3R5cGUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLmluaXQodmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogVGhlIGlubmVyIHdpZHRoIG9mIHRoZSB0YWJsZSwgdGhlIHZpZXdwb3J0IHdpZHRoIG9mIGEgcm93LlxuICAgKiBUaGUgd2lkdGggb2YgdGhlIHRhYmxlIG1pbnVzIHNjcm9sbCBiYXIuXG4gICAqL1xuICBfaW5uZXJXaWR0aDogbnVtYmVyO1xuICBfbWluV2lkdGg6IG51bWJlcjtcbiAgX3dpZHRoOiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBfdHlwZTogJ2hlYWRlcicgfCAnZm9vdGVyJztcbiAgcHJpdmF0ZSBkZWZzOiBBcnJheTx7IGluZGV4OiBudW1iZXI7IHJvd0RlZjogUGJsTWV0YVJvd0RlZmluaXRpb25zIH0+O1xuICBwcml2YXRlIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtZXRhUm93czogUGJsTmdyaWRNZXRhUm93U2VydmljZSwgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICBtZXRhUm93cy5zeW5jLnBpcGUoVW5SeCh0aGlzKSkuc3Vic2NyaWJlKCAoKSA9PiB0aGlzLnN5bmNSb3dEZWZpbml0aW9ucygpICk7XG4gICAgdGhpcy5tZXRhUm93cy5leHRBcGkuZXZlbnRzXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uUmVzaXplUm93Jykge1xuICAgICAgICAgIHRoaXMuX2lubmVyV2lkdGggPSB0aGlzLm1ldGFSb3dzLmV4dEFwaS50YWJsZS52aWV3cG9ydC5pbm5lcldpZHRoO1xuICAgICAgICAgIHRoaXMuX21pbldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkuY2RrVGFibGUubWluV2lkdGg7XG4gICAgICAgICAgdGhpcy5fd2lkdGggPSBNYXRoLm1heCh0aGlzLl9pbm5lcldpZHRoLCB0aGlzLl9taW5XaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KHR5cGU6ICdoZWFkZXInIHwgJ2Zvb3RlcicpOiB2b2lkIHtcblxuICAgIGlmICh0eXBlID09PSAnaGVhZGVyJykge1xuICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3R5cGUgPSAnZm9vdGVyJztcbiAgICB9XG5cbiAgICBjb25zdCBzY3JvbGxDb250YWluZXJFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xuICAgIHNjcm9sbENvbnRhaW5lckVsZW1lbnQuc2Nyb2xsTGVmdCA9IHRoaXMubWV0YVJvd3MuZXh0QXBpLnRhYmxlLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoJ3N0YXJ0Jyk7XG5cbiAgICB0aGlzLm1ldGFSb3dzLmh6U2Nyb2xsXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggb2Zmc2V0ID0+IHNjcm9sbENvbnRhaW5lckVsZW1lbnQuc2Nyb2xsTGVmdCA9IG9mZnNldCApO1xuXG4gICAgdGhpcy5tZXRhUm93cy5leHRBcGkuY2RrVGFibGUub25SZW5kZXJSb3dzXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy5tZXRhUm93cy5leHRBcGkudGFibGUudmlld3BvcnQuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSBNYXRoLm1heCh0aGlzLl9pbm5lcldpZHRoLCB0aGlzLl9taW5XaWR0aCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3luY1Jvd0RlZmluaXRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuZGVmcyA9IFtdO1xuICAgIGNvbnN0IGlzSGVhZGVyID0gdGhpcy5fdHlwZSA9PT0gJ2hlYWRlcic7XG4gICAgY29uc3Qgc2VjdGlvbiA9IGlzSGVhZGVyID8gdGhpcy5tZXRhUm93cy5oZWFkZXIgOiB0aGlzLm1ldGFSb3dzLmZvb3RlcjtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBmb3IgKGNvbnN0IGRlZiBvZiBzZWN0aW9uLmZpeGVkKSB7XG4gICAgICB0aGlzLmRlZnMucHVzaChkZWYpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRlZi5lbCk7XG4gICAgfVxuICB9XG59XG4iXX0=