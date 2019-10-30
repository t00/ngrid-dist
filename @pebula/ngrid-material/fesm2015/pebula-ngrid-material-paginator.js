import { Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, ChangeDetectorRef, Input, NgModule, ComponentFactoryResolver, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { PblNgridComponent, PblNgridModule } from '@pebula/ngrid';
import { __decorate, __metadata } from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
PblPaginatorComponent = __decorate([
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent,
        MatPaginatorIntl,
        ChangeDetectorRef])
], PblPaginatorComponent);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: Remove MatPaginatorModule and the initial code in the constructor
// set the styles in the SCSS.
class PblNgridPaginatorModule {
    /**
     * @param {?} cf
     * @param {?} injector
     */
    constructor(cf, injector) {
        // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
        cf.resolveComponentFactory(MatPaginator).create(injector);
    }
}
PblNgridPaginatorModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatPaginatorModule, MatSelectModule, MatTooltipModule, MatButtonModule, PblNgridModule],
                declarations: [PblPaginatorComponent],
                exports: [PblPaginatorComponent],
                entryComponents: [PblPaginatorComponent, MatPaginator]
            },] }
];
/** @nocollapse */
PblNgridPaginatorModule.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridPaginatorModule, PblPaginatorComponent as ɵa };
//# sourceMappingURL=pebula-ngrid-material-paginator.js.map
