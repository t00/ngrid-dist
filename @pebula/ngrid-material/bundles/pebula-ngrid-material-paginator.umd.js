(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/paginator'), require('@angular/material/select'), require('@angular/material/tooltip'), require('@angular/material/button'), require('@pebula/ngrid'), require('@angular/cdk/coercion')) :
    typeof define === 'function' && define.amd ? define('@pebula/ngrid-material/paginator', ['exports', '@angular/core', '@angular/common', '@angular/material/paginator', '@angular/material/select', '@angular/material/tooltip', '@angular/material/button', '@pebula/ngrid', '@angular/cdk/coercion'], factory) :
    (global = global || self, factory((global.pebula = global.pebula || {}, global.pebula['ngrid-material'] = global.pebula['ngrid-material'] || {}, global.pebula['ngrid-material'].paginator = {}), global.ng.core, global.ng.common, global.ng.material.paginator, global.ng.material.select, global.ng.material.tooltip, global.ng.material.button, global.pebula.ngrid, global.ng.cdk.coercion));
}(this, (function (exports, core, common, paginator, select, tooltip, button, ngrid, coercion) { 'use strict';

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
                .pipe(ngrid.utils.unrx(this))
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
                    ngrid.utils.unrx.kill(this, this._paginator);
                }
                this._paginator = value;
                if (value) {
                    // pagination.onChange is BehaviorSubject so handlePageChange will trigger
                    value.onChange
                        .pipe(ngrid.utils.unrx(this, value))
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
            function (value) { this._hidePageSize = coercion.coerceBooleanProperty(value); },
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
            function (value) { this._hideRangeSelect = coercion.coerceBooleanProperty(value); },
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
            ngrid.utils.unrx.kill(this);
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
            { type: core.Component, args: [{
                        selector: 'pbl-ngrid-paginator',
                        template: "<div class=\"mat-paginator-outer-container\">\n  <div class=\"mat-paginator-container\">\n    <div *ngIf=\"!hidePageSize\" class=\"mat-paginator-page-size\">\n      <div class=\"mat-paginator-page-size-label\">\n        {{_intl.itemsPerPageLabel}}\n      </div>\n\n      <mat-form-field *ngIf=\"pageSizes.length > 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.perPage\"\n          [aria-label]=\"_intl.itemsPerPageLabel\"\n          [disabled]=\"pageSizes[0] >= paginator.total && (!paginator.hasPrev() && !paginator.hasNext())\"\n          (selectionChange)=\"paginator.perPage = $event.value\">\n          <mat-option *ngFor=\"let pageSizeOption of pageSizes\" [value]=\"pageSizeOption\">\n            {{pageSizeOption}}\n          </mat-option>\n        </mat-select>\n      </mat-form-field>\n      <div *ngIf=\"pageSizes.length <= 1\">{{paginator?.perPage}}</div>\n    </div>\n\n    <div class=\"mat-paginator-range-actions\">\n      <div *ngIf=\"paginator.kind ==='pageNumber'\" class=\"mat-paginator-range-label\">\n        {{_intl.getRangeLabel(paginator.page - 1, paginator.perPage, paginator.total)}}\n      </div>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-previous\"\n              (click)=\"paginator.prevPage()\"\n              [attr.aria-label]=\"_intl.previousPageLabel\"\n              [matTooltip]=\"_intl.previousPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasPrev()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n        </svg>\n      </button>\n\n      <mat-form-field *ngIf=\"!hideRangeSelect && paginator.kind ==='pageNumber' && pageSizes.length >= 1\"\n                      class=\"mat-paginator-page-size-select\">\n        <mat-select\n          [value]=\"paginator.page\"\n          [disabled]=\"paginator.totalPages === 1\"\n          (selectionChange)=\"paginator.page = $event.value\">\n          <mat-option *ngFor=\"let p of pages\" [value]=\"p\">{{p}}</mat-option>\n        </mat-select>\n      </mat-form-field>\n\n      <button mat-icon-button type=\"button\"\n              class=\"mat-paginator-navigation-next\"\n              (click)=\"paginator.nextPage()\"\n              [attr.aria-label]=\"_intl.nextPageLabel\"\n              [matTooltip]=\"_intl.nextPageLabel\"\n              [matTooltipPosition]=\"'above'\"\n              [disabled]=\"!paginator.hasNext()\">\n        <svg class=\"mat-paginator-icon\" viewBox=\"0 0 24 24\" focusable=\"false\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n        </svg>\n      </button>\n    </div>\n  </div>\n</div>\n",
                        host: {
                            'class': 'mat-paginator',
                        },
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: [".mat-paginator-range-label{flex-grow:1}.mat-paginator-container{box-sizing:border-box}"]
                    }] }
        ];
        /** @nocollapse */
        PblPaginatorComponent.ctorParameters = function () { return [
            { type: ngrid.PblNgridComponent, decorators: [{ type: core.Optional }] },
            { type: paginator.MatPaginatorIntl },
            { type: core.ChangeDetectorRef }
        ]; };
        PblPaginatorComponent.propDecorators = {
            pageSizeOptions: [{ type: core.Input }],
            paginator: [{ type: core.Input }],
            table: [{ type: core.Input }],
            hidePageSize: [{ type: core.Input }],
            hideRangeSelect: [{ type: core.Input }]
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
            cf.resolveComponentFactory(paginator.MatPaginator).create(injector);
        }
        PblNgridPaginatorModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, paginator.MatPaginatorModule, select.MatSelectModule, tooltip.MatTooltipModule, button.MatButtonModule, ngrid.PblNgridModule],
                        declarations: [PblPaginatorComponent],
                        exports: [PblPaginatorComponent],
                        // TODO: remove when ViewEngine is no longer supported by angular (V11 ???)
                        entryComponents: [PblPaginatorComponent, paginator.MatPaginator]
                    },] }
        ];
        /** @nocollapse */
        PblNgridPaginatorModule.ctorParameters = function () { return [
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        return PblNgridPaginatorModule;
    }());

    exports.PblNgridPaginatorModule = PblNgridPaginatorModule;
    exports.ɵa = PblPaginatorComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=pebula-ngrid-material-paginator.umd.js.map
