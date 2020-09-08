/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-paginator.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PblPagingPaginator, PblNgridComponent, utils } from '@pebula/ngrid';
/** @type {?} */
var DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
var PblPaginatorComponent = /** @class */ (function () {
    function PblPaginatorComponent(table, _intl, cdr) {
        var _this = this;
        this._intl = _intl;
        this.cdr = cdr;
        this.pages = [];
        this.pageSizes = DEFAULT_PAGE_SIZE_OPTIONS.slice();
        this._hidePageSize = false;
        this._hideRangeSelect = false;
        if (table) {
            this.table = table;
        }
        _intl.changes
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.cdr.markForCheck(); }));
    }
    Object.defineProperty(PblPaginatorComponent.prototype, "pageSizeOptions", {
        get: /**
         * @return {?}
         */
        function () { return this._pageSizeOptions; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._pageSizeOptions = value;
            this.pageSizes = (value || DEFAULT_PAGE_SIZE_OPTIONS).slice();
            this.updatePageSizes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPaginatorComponent.prototype, "paginator", {
        get: /**
         * @return {?}
         */
        function () { return this._paginator; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this._paginator === value) {
                return;
            }
            if (this._paginator) {
                utils.unrx.kill(this, this._paginator);
            }
            this._paginator = value;
            if (value) {
                // pagination.onChange is BehaviorSubject so handlePageChange will trigger
                value.onChange
                    .pipe(utils.unrx(this, value))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return _this.handlePageChange(event); }));
                this.updatePageSizes();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPaginatorComponent.prototype, "hidePageSize", {
        get: /**
         * @return {?}
         */
        function () { return this._hidePageSize; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._hidePageSize = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblPaginatorComponent.prototype, "hideRangeSelect", {
        get: /**
         * @return {?}
         */
        function () { return this._hideRangeSelect; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._hideRangeSelect = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblPaginatorComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        utils.unrx.kill(this);
    };
    /**
     * @private
     * @return {?}
     */
    PblPaginatorComponent.prototype.updatePageSizes = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.paginator && this.pageSizes.indexOf(this.paginator.perPage) === -1) {
            this.pageSizes.push(this.paginator.perPage);
        }
        this.pageSizes.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a - b; }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PblPaginatorComponent.prototype.handlePageChange = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.pages.length !== this.paginator.totalPages) {
            /** @type {?} */
            var pages = this.pages = [];
            for (var i = 1, len = this.paginator.totalPages + 1; i < len; i++) {
                pages.push(i);
            }
        }
        // this is required here to prevent `ExpressionChangedAfterItHasBeenCheckedError` when the component has or wrapped
        // by an ngIf
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    };
    PblPaginatorComponent.decorators = [
        { type: Component, args: [{
                    selector: 'pbl-ngrid-paginator',
                    template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div *ngIf=\"!hidePageSize\" class=\"mat-paginator-page-size\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field *ngIf=\"pageSizes.length > 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.perPage\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\"\n          (selectionChange)=\"paginator.perPage = $event.value\">\n          <mat-option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div *ngIf=\"paginator.kind ==='pageNumber'\" class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(paginator.page - 1, paginator.perPage, paginator.total)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"paginator.prevPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasPrev()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n\n      <mat-form-field *ngIf=\"!hideRangeSelect && paginator.kind ==='pageNumber' && pageSizes.length >= 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.page\"\n          [disabled]=\"paginator.totalPages === 1\"\n          (selectionChange)=\"paginator.page = $event.value\">\n          <mat-option *ngFor=\"let p of pages\" [value]=\"p\">{{p}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"paginator.nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasNext()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n",
                    host: {
                        'class': 'mat-paginator',
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mat-paginator-range-label{flex-grow:1}.mat-paginator-container{box-sizing:border-box}"]
                }] }
    ];
    /** @nocollapse */
    PblPaginatorComponent.ctorParameters = function () { return [
        { type: PblNgridComponent, decorators: [{ type: Optional }] },
        { type: MatPaginatorIntl },
        { type: ChangeDetectorRef }
    ]; };
    PblPaginatorComponent.propDecorators = {
        pageSizeOptions: [{ type: Input }],
        paginator: [{ type: Input }],
        table: [{ type: Input }],
        hidePageSize: [{ type: Input }],
        hideRangeSelect: [{ type: Input }]
    };
    return PblPaginatorComponent;
}());
export { PblPaginatorComponent };
if (false) {
    /** @type {?} */
    PblPaginatorComponent.prototype.pages;
    /** @type {?} */
    PblPaginatorComponent.prototype.pageSizes;
    /** @type {?} */
    PblPaginatorComponent.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblPaginatorComponent.prototype._pageSizeOptions;
    /**
     * @type {?}
     * @private
     */
    PblPaginatorComponent.prototype._paginator;
    /**
     * @type {?}
     * @private
     */
    PblPaginatorComponent.prototype._hidePageSize;
    /**
     * @type {?}
     * @private
     */
    PblPaginatorComponent.prototype._hideRangeSelect;
    /** @type {?} */
    PblPaginatorComponent.prototype._intl;
    /**
     * @type {?}
     * @private
     */
    PblPaginatorComponent.prototype.cdr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLFFBQVEsRUFDUixpQkFBaUIsR0FFbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFL0QsT0FBTyxFQUFFLGtCQUFrQixFQUEyQixpQkFBaUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBRWhHLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztBQUV0RDtJQW9ERSwrQkFBd0IsS0FBNkIsRUFDbEMsS0FBdUIsRUFDdEIsR0FBc0I7UUFGMUMsaUJBU0M7UUFSa0IsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUEzQzFDLFVBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsY0FBUyxHQUFhLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDO1FBcUNoRCxrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUN0QixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFLL0IsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztTQUNwQjtRQUNELEtBQUssQ0FBQyxPQUFPO2FBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdEIsU0FBUzs7O1FBQUMs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QyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUFFO1NBQ2xGO1FBQ0QsbUhBQW1IO1FBQ25ILGFBQWE7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Z0JBbkZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQix3eEZBQStDO29CQUUvQyxJQUFJLEVBQUU7d0JBQ0osT0FBTyxFQUFFLGVBQWU7cUJBQ3pCO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQWJxRCxpQkFBaUIsdUJBd0R4RCxRQUFRO2dCQTFEZCxnQkFBZ0I7Z0JBVHZCLGlCQUFpQjs7O2tDQTZCaEIsS0FBSzs0QkFPTCxLQUFLO3dCQWtCTCxLQUFLOytCQUVMLEtBQUs7a0NBR0wsS0FBSzs7SUF3Q1IsNEJBQUM7Q0FBQSxBQXBGRCxJQW9GQztTQTFFWSxxQkFBcUI7OztJQUNoQyxzQ0FBcUI7O0lBQ3JCLDBDQUF3RDs7SUEyQnhELHNDQUF1Qzs7Ozs7SUFRdkMsaURBQW1DOzs7OztJQUNuQywyQ0FBdUM7Ozs7O0lBQ3ZDLDhDQUE4Qjs7Ozs7SUFDOUIsaURBQWlDOztJQUdyQixzQ0FBOEI7Ozs7O0lBQzlCLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvckludGwgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuXG5pbXBvcnQgeyBQYmxQYWdpbmdQYWdpbmF0b3IsIFBibFBhZ2luYXRvckNoYW5nZUV2ZW50LCBQYmxOZ3JpZENvbXBvbmVudCwgdXRpbHMgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuY29uc3QgREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUyA9IFs1LCAxMCwgMjAsIDUwLCAxMDBdO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtcGFnaW5hdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQuc2NzcyddLFxuICBob3N0OiB7XG4gICAgJ2NsYXNzJzogJ21hdC1wYWdpbmF0b3InLFxuICB9LFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQYmxQYWdpbmF0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwYWdlczogbnVtYmVyW10gPSBbXTtcbiAgcGFnZVNpemVzOiBudW1iZXJbXSA9IERFRkFVTFRfUEFHRV9TSVpFX09QVElPTlMuc2xpY2UoKTtcblxuICBASW5wdXQoKSBnZXQgcGFnZVNpemVPcHRpb25zKCk6IG51bWJlcltdIHsgcmV0dXJuIHRoaXMuX3BhZ2VTaXplT3B0aW9uczsgfVxuICBzZXQgcGFnZVNpemVPcHRpb25zKHZhbHVlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3BhZ2VTaXplT3B0aW9ucyA9IHZhbHVlO1xuICAgIHRoaXMucGFnZVNpemVzID0gKHZhbHVlIHx8IERFRkFVTFRfUEFHRV9TSVpFX09QVElPTlMpLnNsaWNlKCk7XG4gICAgdGhpcy51cGRhdGVQYWdlU2l6ZXMoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGdldCBwYWdpbmF0b3IoKTogUGJsUGFnaW5nUGFnaW5hdG9yIHsgcmV0dXJuIHRoaXMuX3BhZ2luYXRvcjsgfVxuICBzZXQgcGFnaW5hdG9yKHZhbHVlOiBQYmxQYWdpbmdQYWdpbmF0b3IpIHtcbiAgICBpZiAodGhpcy5fcGFnaW5hdG9yID09PSB2YWx1ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcGFnaW5hdG9yKSB7XG4gICAgICB1dGlscy51bnJ4LmtpbGwodGhpcywgdGhpcy5fcGFnaW5hdG9yKTtcbiAgICB9XG4gICAgdGhpcy5fcGFnaW5hdG9yID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAvLyBwYWdpbmF0aW9uLm9uQ2hhbmdlIGlzIEJlaGF2aW9yU3ViamVjdCBzbyBoYW5kbGVQYWdlQ2hhbmdlIHdpbGwgdHJpZ2dlclxuICAgICAgdmFsdWUub25DaGFuZ2VcbiAgICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzLCB2YWx1ZSkpXG4gICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuaGFuZGxlUGFnZUNoYW5nZShldmVudCkgKTtcbiAgICAgIHRoaXMudXBkYXRlUGFnZVNpemVzKCk7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT47XG5cbiAgQElucHV0KCkgZ2V0IGhpZGVQYWdlU2l6ZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGVQYWdlU2l6ZTsgfVxuICBzZXQgaGlkZVBhZ2VTaXplKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2hpZGVQYWdlU2l6ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7IH1cblxuICBASW5wdXQoKSBnZXQgaGlkZVJhbmdlU2VsZWN0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZVJhbmdlU2VsZWN0OyB9XG4gIHNldCBoaWRlUmFuZ2VTZWxlY3QodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5faGlkZVJhbmdlU2VsZWN0ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIHByaXZhdGUgX3BhZ2VTaXplT3B0aW9uczogbnVtYmVyW107XG4gIHByaXZhdGUgX3BhZ2luYXRvcjogUGJsUGFnaW5nUGFnaW5hdG9yO1xuICBwcml2YXRlIF9oaWRlUGFnZVNpemUgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfaGlkZVJhbmdlU2VsZWN0ID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sXG4gICAgICAgICAgICAgIHB1YmxpYyBfaW50bDogTWF0UGFnaW5hdG9ySW50bCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgaWYgKHRhYmxlKSB7XG4gICAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgfVxuICAgIF9pbnRsLmNoYW5nZXNcbiAgICAgIC5waXBlKHV0aWxzLnVucngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUGFnZVNpemVzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2luYXRvciAmJiB0aGlzLnBhZ2VTaXplcy5pbmRleE9mKHRoaXMucGFnaW5hdG9yLnBlclBhZ2UpID09PSAtMSkge1xuICAgICAgdGhpcy5wYWdlU2l6ZXMucHVzaCh0aGlzLnBhZ2luYXRvci5wZXJQYWdlKTtcbiAgICB9XG4gICAgdGhpcy5wYWdlU2l6ZXMuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVQYWdlQ2hhbmdlKGV2ZW50OiBQYmxQYWdpbmF0b3JDaGFuZ2VFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCAhPT0gdGhpcy5wYWdpbmF0b3IudG90YWxQYWdlcykge1xuICAgICAgY29uc3QgcGFnZXMgPSB0aGlzLnBhZ2VzID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMSwgbGVuID0gdGhpcy5wYWdpbmF0b3IudG90YWxQYWdlcysxOyBpPGxlbjsgaSsrKSB7IHBhZ2VzLnB1c2goaSk7IH1cbiAgICB9XG4gICAgLy8gdGhpcyBpcyByZXF1aXJlZCBoZXJlIHRvIHByZXZlbnQgYEV4cHJlc3Npb25DaGFuZ2VkQWZ0ZXJJdEhhc0JlZW5DaGVja2VkRXJyb3JgIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgb3Igd3JhcHBlZFxuICAgIC8vIGJ5IGFuIG5nSWZcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==