/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/styles/excel-style-header-menu.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
var MatExcelStyleHeaderMenu = /** @class */ (function () {
    function MatExcelStyleHeaderMenu(ref) {
        this.ref = ref;
        this.currentFilter = '';
        this.column = ref.data.col;
        this.grid = ref.data.grid;
        if (this.grid.ds.sort.column === this.column) {
            this.currentSort = this.grid.ds.sort.sort.order;
        }
        this.currentPin = this.column.columnDef.sticky ? 'start' : this.column.columnDef.stickyEnd ? 'end' : undefined;
        /** @type {?} */
        var dsFilter = this.grid.ds.filter;
        if (dsFilter && dsFilter.type === 'value' && dsFilter.columns && dsFilter.columns.indexOf(this.column) >= 0) {
            this.currentFilter = dsFilter.filter;
        }
    }
    /**
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.matMenu.closed.subscribe((/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) {
            _this.ref.close();
        }));
        /** @type {?} */
        var view = this.menuViewLocation.createEmbeddedView(this.matMenu.templateRef);
        this.matMenu.setElevation(0);
        this.matMenu.focusFirstItem('program');
        this.matMenu._resetAnimation();
        view.markForCheck();
        view.detectChanges();
        this.matMenu._startAnimation();
    };
    /**
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.hide = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var hidden = [this.column.id];
        try {
            for (var _b = __values(this.grid.columnApi.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var col = _c.value;
                if (col.hidden) {
                    hidden.push(col.id);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.grid.hideColumns = hidden;
    };
    /**
     * @param {?} sort
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.onSortToggle = /**
     * @param {?} sort
     * @return {?}
     */
    function (sort) {
        if (this.currentSort === sort) {
            this.grid.ds.setSort();
        }
        else {
            this.grid.ds.setSort(this.column, { order: sort });
        }
    };
    /**
     * @param {?} pin
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.onPinToggle = /**
     * @param {?} pin
     * @return {?}
     */
    function (pin) {
        if (this.currentPin === pin) {
            this.column.columnDef.updatePin();
        }
        else {
            this.column.columnDef.updatePin(pin);
        }
    };
    /**
     * @param {?} filterValue
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.filterColumn = /**
     * @param {?} filterValue
     * @return {?}
     */
    function (filterValue) {
        this.currentFilter = filterValue;
        if (!filterValue) {
            this.grid.setFilter();
        }
        else {
            this.grid.setFilter(filterValue.trim(), [this.column]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.clickTrap = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    MatExcelStyleHeaderMenu.decorators = [
        { type: Component, args: [{
                    selector: 'mat-excel-style-header-menu',
                    template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n<ng-container #menuViewLocation></ng-container>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
                }] }
    ];
    /** @nocollapse */
    MatExcelStyleHeaderMenu.ctorParameters = function () { return [
        { type: PblNgridOverlayPanelRef }
    ]; };
    MatExcelStyleHeaderMenu.propDecorators = {
        matMenu: [{ type: ViewChild, args: ['columnMenu', { read: MatMenu, static: true },] }],
        menuViewLocation: [{ type: ViewChild, args: ['menuViewLocation', { read: ViewContainerRef, static: true },] }]
    };
    return MatExcelStyleHeaderMenu;
}());
export { MatExcelStyleHeaderMenu };
if (false) {
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.column;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.grid;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.matMenu;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.menuViewLocation;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentSort;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentPin;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentFilter;
    /**
     * @type {?}
     * @private
     */
    MatExcelStyleHeaderMenu.prototype.ref;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9zdHlsZXMvZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBR2pELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRXRFO0lBaUJFLGlDQUFvQixHQUFnRTtRQUFoRSxRQUFHLEdBQUgsR0FBRyxDQUE2RDtRQUZwRixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUd0QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENB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Ozs7O0lBRUQsMkNBQVM7Ozs7SUFBVCxVQUFVLEtBQWlCO1FBQ3pCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Z0JBdEZGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxxaUVBQTZDO29CQUU3QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3RDOzs7O2dCQVBRLHVCQUF1Qjs7OzBCQVk3QixTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO21DQUN2RCxTQUFTLFNBQUMsa0JBQWtCLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUE0RXpFLDhCQUFDO0NBQUEsQUF2RkQsSUF1RkM7U0FqRlksdUJBQXVCOzs7SUFDbEMseUNBQWtCOztJQUNsQix1Q0FBdUI7O0lBRXZCLDBDQUEyRTs7SUFDM0UsbURBQTRHOztJQUU1Ryw4Q0FBd0M7O0lBQ3hDLDZDQUF3Qzs7SUFDeEMsZ0RBQXdCOzs7OztJQUVaLHNDQUF3RSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0TWVudSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL21lbnUnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsQ29sdW1uLCBQYmxOZ3JpZERhdGFIZWFkZXJFeHRlbnNpb25Db250ZXh0IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvb3ZlcmxheS1wYW5lbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1leGNlbC1zdHlsZS1oZWFkZXItbWVudScsXG4gIHRlbXBsYXRlVXJsOiBgLi9leGNlbC1zdHlsZS1oZWFkZXItbWVudS5odG1sYCxcbiAgc3R5bGVVcmxzOiBbIGAuL2V4Y2VsLXN0eWxlLWhlYWRlci1tZW51LnNjc3NgIF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIE1hdEV4Y2VsU3R5bGVIZWFkZXJNZW51IHtcbiAgY29sdW1uOiBQYmxDb2x1bW47XG4gIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50XG5cbiAgQFZpZXdDaGlsZCgnY29sdW1uTWVudScsIHsgcmVhZDogTWF0TWVudSwgc3RhdGljOiB0cnVlIH0pIG1hdE1lbnU6IE1hdE1lbnU7XG4gIEBWaWV3Q2hpbGQoJ21lbnVWaWV3TG9jYXRpb24nLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsIHN0YXRpYzogdHJ1ZSB9KSBtZW51Vmlld0xvY2F0aW9uOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIGN1cnJlbnRTb3J0OiAnYXNjJyB8ICdkZXNjJyB8IHVuZGVmaW5lZDtcbiAgY3VycmVudFBpbjogJ3N0YXJ0JyB8ICdlbmQnIHwgdW5kZWZpbmVkO1xuICBjdXJyZW50RmlsdGVyOiBhbnkgPSAnJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY8UGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dD4pIHtcbiAgICB0aGlzLmNvbHVtbiA9IHJlZi5kYXRhLmNvbDtcbiAgICB0aGlzLmdyaWQgPSByZWYuZGF0YS5ncmlkO1xuXG4gICAgaWYgKHRoaXMuZ3JpZC5kcy5zb3J0LmNvbHVtbiA9PT0gdGhpcy5jb2x1bW4pIHtcbiAgICAgIHRoaXMuY3VycmVudFNvcnQgPSB0aGlzLmdyaWQuZHMuc29ydC5zb3J0Lm9yZGVyO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQaW4gPSB0aGlzLmNvbHVtbi5jb2x1bW5EZWYuc3RpY2t5ID8gJ3N0YXJ0JyA6IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5zdGlja3lFbmQgPyAnZW5kJyA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBkc0ZpbHRlciA9IHRoaXMuZ3JpZC5kcy5maWx0ZXI7XG4gICAgaWYgKGRzRmlsdGVyICYmIGRzRmlsdGVyLnR5cGUgPT09ICd2YWx1ZScgJiYgZHNGaWx0ZXIuY29sdW1ucyAmJiBkc0ZpbHRlci5jb2x1bW5zLmluZGV4T2YodGhpcy5jb2x1bW4pID49IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGRzRmlsdGVyLmZpbHRlcjtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5tYXRNZW51LmNsb3NlZC5zdWJzY3JpYmUoIHJlYXNvbiA9PiB7XG4gICAgICB0aGlzLnJlZi5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgdmlldyA9IHRoaXMubWVudVZpZXdMb2NhdGlvbi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5tYXRNZW51LnRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLm1hdE1lbnUuc2V0RWxldmF0aW9uKDApO1xuICAgIHRoaXMubWF0TWVudS5mb2N1c0ZpcnN0SXRlbSgncHJvZ3JhbScpO1xuICAgIHRoaXMubWF0TWVudS5fcmVzZXRBbmltYXRpb24oKTtcbiAgICB2aWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubWF0TWVudS5fc3RhcnRBbmltYXRpb24oKTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgY29uc3QgaGlkZGVuOiBzdHJpbmdbXSA9IFt0aGlzLmNvbHVtbi5pZF07XG5cbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmdyaWQuY29sdW1uQXBpLmNvbHVtbnMpIHtcbiAgICAgIGlmIChjb2wuaGlkZGVuKSB7XG4gICAgICAgIGhpZGRlbi5wdXNoKGNvbC5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkLmhpZGVDb2x1bW5zID0gaGlkZGVuO1xuICB9XG5cbiAgb25Tb3J0VG9nZ2xlKHNvcnQ6ICdhc2MnIHwgJ2Rlc2MnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNvcnQgPT09IHNvcnQpIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5zZXRTb3J0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5zZXRTb3J0KHRoaXMuY29sdW1uLCB7IG9yZGVyOiBzb3J0IH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUGluVG9nZ2xlKHBpbjogJ3N0YXJ0JyB8ICdlbmQnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBpbiA9PT0gcGluKSB7XG4gICAgICB0aGlzLmNvbHVtbi5jb2x1bW5EZWYudXBkYXRlUGluKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLnVwZGF0ZVBpbihwaW4pXG4gICAgfVxuICB9XG5cblxuICBmaWx0ZXJDb2x1bW4oZmlsdGVyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlclZhbHVlO1xuICAgIGlmICghZmlsdGVyVmFsdWUpIHtcbiAgICAgIHRoaXMuZ3JpZC5zZXRGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ncmlkLnNldEZpbHRlcihmaWx0ZXJWYWx1ZS50cmltKCksIFsgdGhpcy5jb2x1bW4gXSk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tUcmFwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19