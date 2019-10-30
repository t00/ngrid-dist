/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
export class MatExcelStyleHeaderMenu {
    /**
     * @param {?} ref
     * @param {?} vcRef
     */
    constructor(ref, vcRef) {
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
        const dsFilter = this.grid.ds.filter;
        if (dsFilter && dsFilter.type === 'value' && dsFilter.columns && dsFilter.columns.indexOf(this.column) >= 0) {
            this.currentFilter = dsFilter.filter;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.matMenu.closed.subscribe((/**
         * @param {?} reason
         * @return {?}
         */
        reason => {
            this.ref.close();
        }));
        /** @type {?} */
        const view = this.vcRef.createEmbeddedView(this.matMenu.templateRef);
        this.matMenu.setElevation(0);
        this.matMenu.focusFirstItem('program');
        this.matMenu._resetAnimation();
        view.markForCheck();
        view.detectChanges();
        this.matMenu._startAnimation();
    }
    /**
     * @return {?}
     */
    hide() {
        /** @type {?} */
        const hidden = [this.column.id];
        for (const col of this.grid.columnApi.columns) {
            if (col.hidden) {
                hidden.push(col.id);
            }
        }
        this.grid.hideColumns = hidden;
    }
    /**
     * @param {?} sort
     * @return {?}
     */
    onSortToggle(sort) {
        if (this.currentSort === sort) {
            this.grid.ds.setSort();
        }
        else {
            this.grid.ds.setSort(this.column, { order: sort });
        }
    }
    /**
     * @param {?} pin
     * @return {?}
     */
    onPinToggle(pin) {
        if (this.currentPin === pin) {
            this.column.columnDef.updatePin();
        }
        else {
            this.column.columnDef.updatePin(pin);
        }
    }
    /**
     * @param {?} filterValue
     * @return {?}
     */
    filterColumn(filterValue) {
        this.currentFilter = filterValue;
        if (!filterValue) {
            this.grid.setFilter();
        }
        else {
            this.grid.setFilter(filterValue.trim(), [this.column]);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickTrap(event) {
        event.preventDefault();
        event.stopPropagation();
    }
}
MatExcelStyleHeaderMenu.decorators = [
    { type: Component, args: [{
                selector: 'mat-excel-style-header-menu',
                template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
            }] }
];
/** @nocollapse */
MatExcelStyleHeaderMenu.ctorParameters = () => [
    { type: PblNgridOverlayPanelRef },
    { type: ViewContainerRef }
];
MatExcelStyleHeaderMenu.propDecorators = {
    matMenu: [{ type: ViewChild, args: ['columnMenu', { read: MatMenu, static: true },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9zdHlsZXMvZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUdqRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQVF0RSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQVVsQyxZQUFvQixHQUFnRSxFQUFVLEtBQXVCO1FBQWpHLFFBQUcsR0FBSCxHQUFHLENBQTZEO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFGckgsa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFHdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTNCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzVDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDakQ7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNB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QUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7O1lBckZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxvL0RBQTZDO2dCQUU3QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFQUSx1QkFBdUI7WUFKRCxnQkFBZ0I7OztzQkFnQjVDLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Ozs7SUFIeEQseUNBQWtCOztJQUNsQix1Q0FBdUI7O0lBRXZCLDBDQUEyRTs7SUFFM0UsOENBQXdDOztJQUN4Qyw2Q0FBd0M7O0lBQ3hDLGdEQUF3Qjs7Ozs7SUFFWixzQ0FBd0U7Ozs7O0lBQUUsd0NBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRNZW51IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvbWVudSc7XG5cbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxDb2x1bW4sIFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWV4Y2VsLXN0eWxlLWhlYWRlci1tZW51JyxcbiAgdGVtcGxhdGVVcmw6IGAuL2V4Y2VsLXN0eWxlLWhlYWRlci1tZW51Lmh0bWxgLFxuICBzdHlsZVVybHM6IFsgYC4vZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuc2Nzc2AgXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTWF0RXhjZWxTdHlsZUhlYWRlck1lbnUge1xuICBjb2x1bW46IFBibENvbHVtbjtcbiAgZ3JpZDogUGJsTmdyaWRDb21wb25lbnRcblxuICBAVmlld0NoaWxkKCdjb2x1bW5NZW51JywgeyByZWFkOiBNYXRNZW51LCBzdGF0aWM6IHRydWUgfSkgbWF0TWVudTogTWF0TWVudTtcblxuICBjdXJyZW50U29ydDogJ2FzYycgfCAnZGVzYycgfCB1bmRlZmluZWQ7XG4gIGN1cnJlbnRQaW46ICdzdGFydCcgfCAnZW5kJyB8IHVuZGVmaW5lZDtcbiAgY3VycmVudEZpbHRlcjogYW55ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ+LCBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgdGhpcy5jb2x1bW4gPSByZWYuZGF0YS5jb2w7XG4gICAgdGhpcy5ncmlkID0gcmVmLmRhdGEudGFibGU7XG5cbiAgICBpZiAodGhpcy5ncmlkLmRzLnNvcnQuY29sdW1uID09PSB0aGlzLmNvbHVtbikge1xuICAgICAgdGhpcy5jdXJyZW50U29ydCA9IHRoaXMuZ3JpZC5kcy5zb3J0LnNvcnQub3JkZXI7XG4gICAgfVxuICAgIHRoaXMuY3VycmVudFBpbiA9IHRoaXMuY29sdW1uLmNvbHVtbkRlZi5zdGlja3kgPyAnc3RhcnQnIDogdGhpcy5jb2x1bW4uY29sdW1uRGVmLnN0aWNreUVuZCA/ICdlbmQnIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IGRzRmlsdGVyID0gdGhpcy5ncmlkLmRzLmZpbHRlcjtcbiAgICBpZiAoZHNGaWx0ZXIgJiYgZHNGaWx0ZXIudHlwZSA9PT0gJ3ZhbHVlJyAmJiBkc0ZpbHRlci5jb2x1bW5zICYmIGRzRmlsdGVyLmNvbHVtbnMuaW5kZXhPZih0aGlzLmNvbHVtbikgPj0gMCkge1xuICAgICAgdGhpcy5jdXJyZW50RmlsdGVyID0gZHNGaWx0ZXIuZmlsdGVyO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLm1hdE1lbnUuY2xvc2VkLnN1YnNjcmliZSggcmVhc29uID0+IHtcbiAgICAgIHRoaXMucmVmLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB2aWV3ID0gdGhpcy52Y1JlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGhpcy5tYXRNZW51LnRlbXBsYXRlUmVmKTtcbiAgICB0aGlzLm1hdE1lbnUuc2V0RWxldmF0aW9uKDApO1xuICAgIHRoaXMubWF0TWVudS5mb2N1c0ZpcnN0SXRlbSgncHJvZ3JhbScpO1xuICAgIHRoaXMubWF0TWVudS5fcmVzZXRBbmltYXRpb24oKTtcbiAgICB2aWV3Lm1hcmtGb3JDaGVjaygpO1xuICAgIHZpZXcuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMubWF0TWVudS5fc3RhcnRBbmltYXRpb24oKTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgY29uc3QgaGlkZGVuOiBzdHJpbmdbXSA9IFt0aGlzLmNvbHVtbi5pZF07XG5cbiAgICBmb3IgKGNvbnN0IGNvbCBvZiB0aGlzLmdyaWQuY29sdW1uQXBpLmNvbHVtbnMpIHtcbiAgICAgIGlmIChjb2wuaGlkZGVuKSB7XG4gICAgICAgIGhpZGRlbi5wdXNoKGNvbC5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkLmhpZGVDb2x1bW5zID0gaGlkZGVuO1xuICB9XG5cbiAgb25Tb3J0VG9nZ2xlKHNvcnQ6ICdhc2MnIHwgJ2Rlc2MnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNvcnQgPT09IHNvcnQpIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5zZXRTb3J0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZC5kcy5zZXRTb3J0KHRoaXMuY29sdW1uLCB7IG9yZGVyOiBzb3J0IH0pO1xuICAgIH1cbiAgfVxuXG4gIG9uUGluVG9nZ2xlKHBpbjogJ3N0YXJ0JyB8ICdlbmQnKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudFBpbiA9PT0gcGluKSB7XG4gICAgICB0aGlzLmNvbHVtbi5jb2x1bW5EZWYudXBkYXRlUGluKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLnVwZGF0ZVBpbihwaW4pXG4gICAgfVxuICB9XG5cblxuICBmaWx0ZXJDb2x1bW4oZmlsdGVyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuY3VycmVudEZpbHRlciA9IGZpbHRlclZhbHVlO1xuICAgIGlmICghZmlsdGVyVmFsdWUpIHtcbiAgICAgIHRoaXMuZ3JpZC5zZXRGaWx0ZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ncmlkLnNldEZpbHRlcihmaWx0ZXJWYWx1ZS50cmltKCksIFsgdGhpcy5jb2x1bW4gXSk7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tUcmFwKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19