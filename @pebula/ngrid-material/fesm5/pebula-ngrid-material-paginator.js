import { Component, ChangeDetectionStrategy, ViewEncapsulation, Optional, ChangeDetectorRef, Input, NgModule, ComponentFactoryResolver, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorIntl, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { utils, PblNgridComponent, PblNgridModule } from '@pebula/ngrid';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-paginator.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
 * Generated from: lib/table-paginator.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// TODO: Remove MatPaginatorModule and the initial code in the constructor
// set the styles in the SCSS.
var PblNgridPaginatorModule = /** @class */ (function () {
    function PblNgridPaginatorModule(cf, injector) {
        // this is a workaround to ensure CSS from mat slider is loaded, otherwise it is omitted.
        cf.resolveComponentFactory(MatPaginator).create(injector);
    }
    PblNgridPaginatorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatPaginatorModule, MatSelectModule, MatTooltipModule, MatButtonModule, PblNgridModule],
                    declarations: [PblPaginatorComponent],
                    exports: [PblPaginatorComponent],
                    // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                    entryComponents: [PblPaginatorComponent, MatPaginator]
                },] }
    ];
    /** @nocollapse */
    PblNgridPaginatorModule.ctorParameters = function () { return [
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    return PblNgridPaginatorModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: pebula-ngrid-material-paginator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridPaginatorModule, PblPaginatorComponent as ɵa };
//# sourceMappingURL=pebula-ngrid-material-paginator.js.map
