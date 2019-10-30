/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
var MatExcelStyleHeaderMenu = /** @class */ (function () {
    function MatExcelStyleHeaderMenu(ref, vcRef) {
        this.ref = ref;
        this.vcRef = vcRef;
        this.currentFilter = '';
        this.column = ref.data.col;
        this.grid = ref.data.table;
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
        var view = this.vcRef.createEmbeddedView(this.matMenu.templateRef);
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
            for (var _b = tslib_1.__values(this.grid.columnApi.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
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
                    template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
                }] }
    ];
    /** @nocollapse */
    MatExcelStyleHeaderMenu.ctorParameters = function () { return [
        { type: PblNgridOverlayPanelRef },
        { type: ViewContainerRef }
    ]; };
    MatExcelStyleHeaderMenu.propDecorators = {
        matMenu: [{ type: ViewChild, args: ['columnMenu', { read: MatMenu, static: true },] }]
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
    /**
     * @type {?}
     * @private
     */
    MatExcelStyleHeaderMenu.prototype.vcRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9zdHlsZXMvZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFdEU7SUFnQkUsaUNBQW9CLEdBQWdFLEVBQVUsS0FBdUI7UUFBakcsUUFBRyxHQUFILEdBQUcsQ0FBNkQ7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUZySCxrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUd0QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7O1lBQ3pHLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNO1FBQ3BDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzRyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDdEM7SUFDSCxDQUFDOzs7O0lBRUQsaURBQWU7OztJQUFmO1FBQUEsaUJBWUM7UUFYQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxNQUFNO1lBQ25DLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxFQUFDLENBQUM7O1lBRUcsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDakMsQ0FBQzs7OztJQUVELHNDQUFJOzs7SUFBSjs7O1lBQ1EsTUFBTSxHQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7O1lBRXpDLEtBQWtCLElBQUEsS0FBQSxpQkFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQTFDLElBQU0sR0FBRyxXQUFBO2dCQUNaLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDckI7YUFDRjs7Ozs7Ozs7O1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBQ2pDLENBQUM7Ozs7O0lBRUQsOENBQVk7Ozs7SUFBWixVQUFhLElBQW9CO1FBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDcEQ7SUFDSCxDQUFDOzs7OztJQUVELDZDQUFXOzs7O0lBQVgsVUFBWSxHQUFvQjtRQUM5QixJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFBO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDckM7SUFDSCxDQUFDOzs7OztJQUdELDhDQUFZOzs7O0lBQVosVUFBYSxXQUFtQjtRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDdkI7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQzs7Ozs7SUFFRCwyQ0FBUzs7OztJQUFULFVBQVUsS0FBaUI7UUFDekIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDOztnQkFyRkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSw2QkFBNkI7b0JBQ3ZDLG8vREFBNkM7b0JBRTdDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBUFEsdUJBQXVCO2dCQUpELGdCQUFnQjs7OzBCQWdCNUMsU0FBUyxTQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTs7SUE0RTFELDhCQUFDO0NBQUEsQUF0RkQsSUFzRkM7U0FoRlksdUJBQXVCOzs7SUFDbEMseUNBQWtCOztJQUNsQix1Q0FBdUI7O0lBRXZCLDBDQUEyRTs7SUFFM0UsOENBQXdDOztJQUN4Qyw2Q0FBd0M7O0lBQ3hDLGdEQUF3Qjs7Ozs7SUFFWixzQ0FBd0U7Ozs7O0lBQUUsd0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxDb2x1bW4sIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWV4Y2VsLXN0eWxlLWhlYWRlci1tZW51JyxcbiAgdGVtcGxhdGVVcmw6IGAuL2V4Y2VsLXN0eWxlLWhlYWRlci1tZW51Lmh0bWxgLFxuICBzdHlsZVVybHM6IFsgYC4vZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuc2Nzc2AgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUge1xuICBjb2x1bW46IFBibENvbHVtbjtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnRcblxuICBAVmlld0NoaWxkKCdjb2x1bW5NZW51JywgeyByZWFkOiBNYXRNZW51LCBzdGF0aWM6IHRydWUgfSkgbWF0TWVudTogTWF0TWVudTtcblxuICBjdXJyZW50U29ydDogJ2FzYycgfCAnZGVzYycgfCB1bmRlZmluZWQ7XG4gIGN1cnJlbnRQaW46ICdzdGFydCcgfCAnZW5kJyB8IHVuZGVmaW5lZDtcbiAgY3VycmVudEZpbHRlcjogYW55ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ+LCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5jb2x1bW4gPSByZWYuZGF0YS5jb2w7XG4gICAgdGhpcy5ncmlkID0gcmVmLmRhdGEudGFibGU7XG5cbiAgICBpZiAodGhpcy5ncmlkLmRzLnNvcnQuY29sdW1uID09PSB0aGlzLmNvbHVtbikge1xuICAgICAgdGhpcy5jdXJyZW50U29ydCA9IHRoaXMuZ3JpZC5kcy5zb3J0LnNvcnQub3JkZXI7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFBpbiA9IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5zdGlja3kgPyAnc3RhcnQnIDogdGhpcy5jb2x1bW4uY29sdW1uRGVmLnN0aWNreUVuZCA/ICdlbmQnIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGRzRmlsdGVyID0gdGhpcy5ncmlkLmRzLmZpbHRlcjtcbiAgICBpZiAoZHNGaWx0ZXIgJiYgZHNGaWx0ZXIudHlwZSA9PT0gJ3ZhbHVlJyAmJiBkc0ZpbHRlci5jb2x1bW5zICYmIGRzRmlsdGVyLmNvbHVtbnMuaW5kZXhPZih0aGlzLmNvbHVtbikgPj0gMCkge1xuICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0gZHNGaWx0ZXIuZmlsdGVyO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm1hdE1lbnUuY2xvc2VkLnN1YnNjcmliZSggcmVhc29uID0+IHtcbiAgICAgIHRoaXMucmVmLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB2aWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5tYXRNZW51LnRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLm1hdE1lbnUuc2V0RWxldmF0aW9uKDApO1xuICAgIHRoaXMubWF0TWVudS5mb2N1c0ZpcnN0SXRlbSgncHJvZ3JhbScpO1xuICAgIHRoaXMubWF0TWVudS5fcmVzZXRBbmltYXRpb24oKTtcbiAgICB2aWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubWF0TWVudS5fc3RhcnRBbmltYXRpb24oKTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgY29uc3QgaGlkZGVuOiBzdHJpbmdbXSA9IFt0aGlzLmNvbHVtbi5pZF07XG5cbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmdyaWQuY29sdW1uQXBpLmNvbHVtbnMpIHtcbiAgICAgIGlmIChjb2wuaGlkZGVuKSB7XG4gICAgICAgIGhpZGRlbi5wdXNoKGNvbC5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkLmhpZGVDb2x1bW5zID0gaGlkZGVuO1xuICB9XG5cbiAgb25Tb3J0VG9nZ2xlKHNvcnQ6ICdhc2MnIHwgJ2Rlc2MnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNvcnQgPT09IHNvcnQpIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5zZXRTb3J0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5zZXRTb3J0KHRoaXMuY29sdW1uLCB7IG9yZGVyOiBzb3J0IH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUGluVG9nZ2xlKHBpbjogJ3N0YXJ0JyB8ICdlbmQnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBpbiA9PT0gcGluKSB7XG4gICAgICB0aGlzLmNvbHVtbi5jb2x1bW5EZWYudXBkYXRlUGluKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLnVwZGF0ZVBpbihwaW4pXG4gICAgfVxuICB9XG5cblxuICBmaWx0ZXJDb2x1bW4oZmlsdGVyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlclZhbHVlO1xuICAgIGlmICghZmlsdGVyVmFsdWUpIHtcbiAgICAgIHRoaXMuZ3JpZC5zZXRGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ncmlkLnNldEZpbHRlcihmaWx0ZXJWYWx1ZS50cmltKCksIFsgdGhpcy5jb2x1bW4gXSk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tUcmFwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19