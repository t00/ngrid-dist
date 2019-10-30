/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input, Optional, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { UnRx } from '@pebula/utils';
import { PblPagingPaginator, PblPaginatorChangeEvent, PblNgridComponent } from '@pebula/ngrid';
/** @type {?} */
const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
let PblPaginatorComponent = class PblPaginatorComponent {
    /**
     * @param {?} table
     * @param {?} _intl
     * @param {?} cdr
     */
    constructor(table, _intl, cdr) {
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
            .pipe(UnRx(this))
            .subscribe((/**
         * @return {?}
         */
        () => this.cdr.markForCheck()));
    }
    /**
     * @return {?}
     */
    get pageSizeOptions() { return this._pageSizeOptions; }
    /**
     * @param {?} value
     * @return {?}
     */
    set pageSizeOptions(value) {
        this._pageSizeOptions = value;
        this.pageSizes = (value || DEFAULT_PAGE_SIZE_OPTIONS).slice();
        this.updatePageSizes();
    }
    /**
     * @return {?}
     */
    get paginator() { return this._paginator; }
    /**
     * @param {?} value
     * @return {?}
     */
    set paginator(value) {
        if (this._paginator === value) {
            return;
        }
        if (this._paginator) {
            UnRx.kill(this, this._paginator);
        }
        this._paginator = value;
        if (value) {
            // pagination.onChange is BehaviorSubject so handlePageChange will trigger
            value.onChange
                .pipe(UnRx(this, value))
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => this.handlePageChange(event)));
            this.updatePageSizes();
        }
    }
    /**
     * @return {?}
     */
    get hidePageSize() { return this._hidePageSize; }
    /**
     * @param {?} value
     * @return {?}
     */
    set hidePageSize(value) { this._hidePageSize = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get hideRangeSelect() { return this._hideRangeSelect; }
    /**
     * @param {?} value
     * @return {?}
     */
    set hideRangeSelect(value) { this._hideRangeSelect = coerceBooleanProperty(value); }
    /**
     * @private
     * @return {?}
     */
    updatePageSizes() {
        if (this.paginator && this.pageSizes.indexOf(this.paginator.perPage) === -1) {
            this.pageSizes.push(this.paginator.perPage);
        }
        this.pageSizes.sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a - b));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    handlePageChange(event) {
        if (this.pages.length !== this.paginator.totalPages) {
            /** @type {?} */
            const pages = this.pages = [];
            for (let i = 1, len = this.paginator.totalPages + 1; i < len; i++) {
                pages.push(i);
            }
        }
        // this is required here to prevent `ExpressionChangedAfterItHasBeenCheckedError` when the component has or wrapped
        // by an ngIf
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    }
};
PblPaginatorComponent.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: MatPaginatorIntl },
    { type: ChangeDetectorRef }
];
PblPaginatorComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-paginator',
                template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div *ngIf=\"!hidePageSize\" class=\"mat-paginator-page-size\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field *ngIf=\"pageSizes.length > 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.perPage\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\"\n          (selectionChange)=\"paginator.perPage = $event.value\">\n          <mat-option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div *ngIf=\"paginator.kind ==='pageNumber'\" class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(paginator.page - 1, paginator.perPage, paginator.total)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"paginator.prevPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasPrev()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n\n      <mat-form-field *ngIf=\"!hideRangeSelect && paginator.kind ==='pageNumber' && pageSizes.length >= 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.page\"\n          [disabled]=\"paginator.totalPages === 1\"\n          (selectionChange)=\"paginator.page = $event.value\">\n          <mat-option *ngFor=\"let p of pages\" [value]=\"p\">{{p}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"paginator.nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasNext()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n",
                host: {
                    'class': 'mat-paginator',
                },
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-paginator-range-label{-webkit-box-flex:1;flex-grow:1}.mat-paginator-container{box-sizing:border-box}"]
            }] }
];
/** @nocollapse */
PblPaginatorComponent.ctorParameters = () => [
    { type: PblNgridComponent, decorators: [{ type: Optional }] },
    { type: MatPaginatorIntl },
    { type: ChangeDetectorRef }
];
PblPaginatorComponent.propDecorators = {
    pageSizeOptions: [{ type: Input }],
    paginator: [{ type: Input }],
    table: [{ type: Input }],
    hidePageSize: [{ type: Input }],
    hideRangeSelect: [{ type: Input }]
};
PblPaginatorComponent = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent,
        MatPaginatorIntl,
        ChangeDetectorRef])
], PblPaginatorComponent);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvcGFnaW5hdG9yLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLXBhZ2luYXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsS0FBSyxFQUNMLFFBQVEsRUFDUixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFL0QsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BRXpGLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQztJQWF6QyxxQkFBcUIsU0FBckIscUJBQXFCOzs7Ozs7SUEwQ2hDLFlBQXdCLEtBQTZCLEVBQ2xDLEtBQXVCLEVBQ3RCLEdBQXNCO1FBRHZCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3RCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBM0MxQyxVQUFLLEdBQWEsRUFBRSxDQUFDO1FBQ3JCLGNBQVMsR0FBYSx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQXFDaEQsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBSy9CLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDcEI7UUFDRCxLQUFLLENBQUMsT0FBTzthQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDaEIsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsRUFBQyxDQUFDO0lBQzlDLENBQUM7Ozs7SUEvQ0QsSUFBYSxlQUFlLEtBQWUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDOzs7OztJQUMxRSxJQUFJLGVBQWUsQ0FBQyxLQUFlO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSx5QkFBeUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7O0lBRUQsSUFBYSxTQUFTLEtBQXlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBQ3hFLElBQUksU0FBUyxDQUFDLEtBQXlCO1FBQ3JDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDN0IsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsQztRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksS0FBSyxFQUFFO1lBQ1QsMEVBQTBFO1lBQzFFLEtBQUssQ0FBQyxRQUFRO2lCQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN2QixTQUFTOzs7O1lBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDeEI7SUFDSCxDQUFDOzs7O0lBSUQsSUFBYSxZQUFZLEtBQWMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDbkUsSUFBSSxZQUFZLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0lBRXZGLElBQWEsZUFBZSxLQUFjLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDekUsSUFBSSxlQUFlLENBQUMsS0FBYyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0lBa0JyRixlQUFlO1FBQ3JCLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Ozs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUM7SUFDdkMsQ0FBQzs7Ozs7O0lBRU8sZ0JBQWdCLENBQUMsS0FBOEI7UUFDckQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTs7a0JBQzdDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFBRTtTQUNsRjtRQUNELG1IQUFtSDtRQUNuSCxhQUFhO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzFCLENBQUM7Q0FDRixDQUFBOztZQTVCZ0MsaUJBQWlCO1lBQ3RCLGdCQUFnQjtZQUNqQixpQkFBaUI7OztZQXZEM0MsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLHd4RkFBK0M7Z0JBRS9DLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsZUFBZTtpQkFDekI7Z0JBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OztZQWJxRCxpQkFBaUIsdUJBeUR4RCxRQUFRO1lBNURkLGdCQUFnQjtZQVJ2QixpQkFBaUI7Ozs4QkE4QmhCLEtBQUs7d0JBT0wsS0FBSztvQkFrQkwsS0FBSzsyQkFFTCxLQUFLOzhCQUdMLEtBQUs7O0FBbENLLHFCQUFxQjtJQURqQyxJQUFJLEVBQUU7NkNBMkMwQixpQkFBaUI7UUFDdEIsZ0JBQWdCO1FBQ2pCLGlCQUFpQjtHQTVDL0IscUJBQXFCLENBc0VqQztTQXRFWSxxQkFBcUI7OztJQUNoQyxzQ0FBcUI7O0lBQ3JCLDBDQUF3RDs7SUEyQnhELHNDQUF1Qzs7Ozs7SUFRdkMsaURBQW1DOzs7OztJQUNuQywyQ0FBdUM7Ozs7O0lBQ3ZDLDhDQUE4Qjs7Ozs7SUFDOUIsaURBQWlDOztJQUdyQixzQ0FBOEI7Ozs7O0lBQzlCLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvckludGwgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxQYWdpbmdQYWdpbmF0b3IsIFBibFBhZ2luYXRvckNoYW5nZUV2ZW50LCBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5jb25zdCBERUZBVUxUX1BBR0VfU0laRV9PUFRJT05TID0gWzUsIDEwLCAyMCwgNTAsIDEwMF07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1wYWdpbmF0b3InLFxuICB0ZW1wbGF0ZVVybDogJy4vdGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGFibGUtcGFnaW5hdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIGhvc3Q6IHtcbiAgICAnY2xhc3MnOiAnbWF0LXBhZ2luYXRvcicsXG4gIH0sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibFBhZ2luYXRvckNvbXBvbmVudCB7XG4gIHBhZ2VzOiBudW1iZXJbXSA9IFtdO1xuICBwYWdlU2l6ZXM6IG51bWJlcltdID0gREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUy5zbGljZSgpO1xuXG4gIEBJbnB1dCgpIGdldCBwYWdlU2l6ZU9wdGlvbnMoKTogbnVtYmVyW10geyByZXR1cm4gdGhpcy5fcGFnZVNpemVPcHRpb25zOyB9XG4gIHNldCBwYWdlU2l6ZU9wdGlvbnModmFsdWU6IG51bWJlcltdKSB7XG4gICAgdGhpcy5fcGFnZVNpemVPcHRpb25zID0gdmFsdWU7XG4gICAgdGhpcy5wYWdlU2l6ZXMgPSAodmFsdWUgfHwgREVGQVVMVF9QQUdFX1NJWkVfT1BUSU9OUykuc2xpY2UoKTtcbiAgICB0aGlzLnVwZGF0ZVBhZ2VTaXplcygpO1xuICB9XG5cbiAgQElucHV0KCkgZ2V0IHBhZ2luYXRvcigpOiBQYmxQYWdpbmdQYWdpbmF0b3IgeyByZXR1cm4gdGhpcy5fcGFnaW5hdG9yOyB9XG4gIHNldCBwYWdpbmF0b3IodmFsdWU6IFBibFBhZ2luZ1BhZ2luYXRvcikge1xuICAgIGlmICh0aGlzLl9wYWdpbmF0b3IgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9wYWdpbmF0b3IpIHtcbiAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLl9wYWdpbmF0b3IpO1xuICAgIH1cbiAgICB0aGlzLl9wYWdpbmF0b3IgPSB2YWx1ZTtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIC8vIHBhZ2luYXRpb24ub25DaGFuZ2UgaXMgQmVoYXZpb3JTdWJqZWN0IHNvIGhhbmRsZVBhZ2VDaGFuZ2Ugd2lsbCB0cmlnZ2VyXG4gICAgICB2YWx1ZS5vbkNoYW5nZVxuICAgICAgICAucGlwZShVblJ4KHRoaXMsIHZhbHVlKSlcbiAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5oYW5kbGVQYWdlQ2hhbmdlKGV2ZW50KSApO1xuICAgICAgdGhpcy51cGRhdGVQYWdlU2l6ZXMoKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PjtcblxuICBASW5wdXQoKSBnZXQgaGlkZVBhZ2VTaXplKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZVBhZ2VTaXplOyB9XG4gIHNldCBoaWRlUGFnZVNpemUodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5faGlkZVBhZ2VTaXplID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTsgfVxuXG4gIEBJbnB1dCgpIGdldCBoaWRlUmFuZ2VTZWxlY3QoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlUmFuZ2VTZWxlY3Q7IH1cbiAgc2V0IGhpZGVSYW5nZVNlbGVjdCh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9oaWRlUmFuZ2VTZWxlY3QgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpOyB9XG5cbiAgcHJpdmF0ZSBfcGFnZVNpemVPcHRpb25zOiBudW1iZXJbXTtcbiAgcHJpdmF0ZSBfcGFnaW5hdG9yOiBQYmxQYWdpbmdQYWdpbmF0b3I7XG4gIHByaXZhdGUgX2hpZGVQYWdlU2l6ZSA9IGZhbHNlO1xuICBwcml2YXRlIF9oaWRlUmFuZ2VTZWxlY3QgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PixcbiAgICAgICAgICAgICAgcHVibGljIF9pbnRsOiBNYXRQYWdpbmF0b3JJbnRsLFxuICAgICAgICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICBpZiAodGFibGUpIHtcbiAgICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgICB9XG4gICAgX2ludGwuY2hhbmdlc1xuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jZHIubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVQYWdlU2l6ZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnaW5hdG9yICYmIHRoaXMucGFnZVNpemVzLmluZGV4T2YodGhpcy5wYWdpbmF0b3IucGVyUGFnZSkgPT09IC0xKSB7XG4gICAgICB0aGlzLnBhZ2VTaXplcy5wdXNoKHRoaXMucGFnaW5hdG9yLnBlclBhZ2UpO1xuICAgIH1cbiAgICB0aGlzLnBhZ2VTaXplcy5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZVBhZ2VDaGFuZ2UoZXZlbnQ6IFBibFBhZ2luYXRvckNoYW5nZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnZXMubGVuZ3RoICE9PSB0aGlzLnBhZ2luYXRvci50b3RhbFBhZ2VzKSB7XG4gICAgICBjb25zdCBwYWdlcyA9IHRoaXMucGFnZXMgPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxLCBsZW4gPSB0aGlzLnBhZ2luYXRvci50b3RhbFBhZ2VzKzE7IGk8bGVuOyBpKyspIHsgcGFnZXMucHVzaChpKTsgfVxuICAgIH1cbiAgICAvLyB0aGlzIGlzIHJlcXVpcmVkIGhlcmUgdG8gcHJldmVudCBgRXhwcmVzc2lvbkNoYW5nZWRBZnRlckl0SGFzQmVlbkNoZWNrZWRFcnJvcmAgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBvciB3cmFwcGVkXG4gICAgLy8gYnkgYW4gbmdJZlxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmNkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19