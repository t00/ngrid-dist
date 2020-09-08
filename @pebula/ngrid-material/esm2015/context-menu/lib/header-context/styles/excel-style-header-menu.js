/**
 * @fileoverview added by tsickle
 * Generated from: lib/header-context/styles/excel-style-header-menu.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { PblNgridOverlayPanelRef } from '@pebula/ngrid/overlay-panel';
export class MatExcelStyleHeaderMenu {
    /**
     * @param {?} ref
     */
    constructor(ref) {
        this.ref = ref;
        this.currentFilter = '';
        this.column = ref.data.col;
        this.grid = ref.data.grid;
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
        const view = this.menuViewLocation.createEmbeddedView(this.matMenu.templateRef);
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
                template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n<ng-container #menuViewLocation></ng-container>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
            }] }
];
/** @nocollapse */
MatExcelStyleHeaderMenu.ctorParameters = () => [
    { type: PblNgridOverlayPanelRef }
];
MatExcelStyleHeaderMenu.propDecorators = {
    matMenu: [{ type: ViewChild, args: ['columnMenu', { read: MatMenu, static: true },] }],
    menuViewLocation: [{ type: ViewChild, args: ['menuViewLocation', { read: ViewContainerRef, static: true },] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AcGVidWxhL25ncmlkLW1hdGVyaWFsL2NvbnRleHQtbWVudS8iLCJzb3VyY2VzIjpbImxpYi9oZWFkZXItY29udGV4dC9zdHlsZXMvZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHakQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFRdEUsTUFBTSxPQUFPLHVCQUF1Qjs7OztJQVdsQyxZQUFvQixHQUFnRTtRQUFoRSxRQUFHLEdBQUgsR0FBRyxDQUE2RDtRQUZwRixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUd0QixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNqRDtRQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFD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RUFBRSxDQUFDO0lBQzFCLENBQUM7OztZQXRGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMscWlFQUE2QztnQkFFN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBUFEsdUJBQXVCOzs7c0JBWTdCLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7K0JBQ3ZELFNBQVMsU0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFOzs7O0lBSnZFLHlDQUFrQjs7SUFDbEIsdUNBQXVCOztJQUV2QiwwQ0FBMkU7O0lBQzNFLG1EQUE0Rzs7SUFFNUcsOENBQXdDOztJQUN4Qyw2Q0FBd0M7O0lBQ3hDLGdEQUF3Qjs7Ozs7SUFFWixzQ0FBd0UiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdE1lbnUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9tZW51JztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibENvbHVtbiwgUGJsTmdyaWREYXRhSGVhZGVyRXh0ZW5zaW9uQ29udGV4dCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYgfSBmcm9tICdAcGVidWxhL25ncmlkL292ZXJsYXktcGFuZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtYXQtZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUnLFxuICB0ZW1wbGF0ZVVybDogYC4vZXhjZWwtc3R5bGUtaGVhZGVyLW1lbnUuaHRtbGAsXG4gIHN0eWxlVXJsczogWyBgLi9leGNlbC1zdHlsZS1oZWFkZXItbWVudS5zY3NzYCBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBNYXRFeGNlbFN0eWxlSGVhZGVyTWVudSB7XG4gIGNvbHVtbjogUGJsQ29sdW1uO1xuICBncmlkOiBQYmxOZ3JpZENvbXBvbmVudFxuXG4gIEBWaWV3Q2hpbGQoJ2NvbHVtbk1lbnUnLCB7IHJlYWQ6IE1hdE1lbnUsIHN0YXRpYzogdHJ1ZSB9KSBtYXRNZW51OiBNYXRNZW51O1xuICBAVmlld0NoaWxkKCdtZW51Vmlld0xvY2F0aW9uJywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgbWVudVZpZXdMb2NhdGlvbjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjdXJyZW50U29ydDogJ2FzYycgfCAnZGVzYycgfCB1bmRlZmluZWQ7XG4gIGN1cnJlbnRQaW46ICdzdGFydCcgfCAnZW5kJyB8IHVuZGVmaW5lZDtcbiAgY3VycmVudEZpbHRlcjogYW55ID0gJyc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFBibE5ncmlkRGF0YUhlYWRlckV4dGVuc2lvbkNvbnRleHQ+KSB7XG4gICAgdGhpcy5jb2x1bW4gPSByZWYuZGF0YS5jb2w7XG4gICAgdGhpcy5ncmlkID0gcmVmLmRhdGEuZ3JpZDtcblxuICAgIGlmICh0aGlzLmdyaWQuZHMuc29ydC5jb2x1bW4gPT09IHRoaXMuY29sdW1uKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTb3J0ID0gdGhpcy5ncmlkLmRzLnNvcnQuc29ydC5vcmRlcjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGluID0gdGhpcy5jb2x1bW4uY29sdW1uRGVmLnN0aWNreSA/ICdzdGFydCcgOiB0aGlzLmNvbHVtbi5jb2x1bW5EZWYuc3RpY2t5RW5kID8gJ2VuZCcgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZHNGaWx0ZXIgPSB0aGlzLmdyaWQuZHMuZmlsdGVyO1xuICAgIGlmIChkc0ZpbHRlciAmJiBkc0ZpbHRlci50eXBlID09PSAndmFsdWUnICYmIGRzRmlsdGVyLmNvbHVtbnMgJiYgZHNGaWx0ZXIuY29sdW1ucy5pbmRleE9mKHRoaXMuY29sdW1uKSA+PSAwKSB7XG4gICAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSBkc0ZpbHRlci5maWx0ZXI7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMubWF0TWVudS5jbG9zZWQuc3Vic2NyaWJlKCByZWFzb24gPT4ge1xuICAgICAgdGhpcy5yZWYuY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLm1lbnVWaWV3TG9jYXRpb24uY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMubWF0TWVudS50ZW1wbGF0ZVJlZik7XG4gICAgdGhpcy5tYXRNZW51LnNldEVsZXZhdGlvbigwKTtcbiAgICB0aGlzLm1hdE1lbnUuZm9jdXNGaXJzdEl0ZW0oJ3Byb2dyYW0nKTtcbiAgICB0aGlzLm1hdE1lbnUuX3Jlc2V0QW5pbWF0aW9uKCk7XG4gICAgdmlldy5tYXJrRm9yQ2hlY2soKTtcbiAgICB2aWV3LmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLm1hdE1lbnUuX3N0YXJ0QW5pbWF0aW9uKCk7XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIGNvbnN0IGhpZGRlbjogc3RyaW5nW10gPSBbdGhpcy5jb2x1bW4uaWRdO1xuXG4gICAgZm9yIChjb25zdCBjb2wgb2YgdGhpcy5ncmlkLmNvbHVtbkFwaS5jb2x1bW5zKSB7XG4gICAgICBpZiAoY29sLmhpZGRlbikge1xuICAgICAgICBoaWRkZW4ucHVzaChjb2wuaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ3JpZC5oaWRlQ29sdW1ucyA9IGhpZGRlbjtcbiAgfVxuXG4gIG9uU29ydFRvZ2dsZShzb3J0OiAnYXNjJyB8ICdkZXNjJyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTb3J0ID09PSBzb3J0KSB7XG4gICAgICB0aGlzLmdyaWQuZHMuc2V0U29ydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyaWQuZHMuc2V0U29ydCh0aGlzLmNvbHVtbiwgeyBvcmRlcjogc29ydCB9KTtcbiAgICB9XG4gIH1cblxuICBvblBpblRvZ2dsZShwaW46ICdzdGFydCcgfCAnZW5kJyk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRQaW4gPT09IHBpbikge1xuICAgICAgdGhpcy5jb2x1bW4uY29sdW1uRGVmLnVwZGF0ZVBpbigpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sdW1uLmNvbHVtbkRlZi51cGRhdGVQaW4ocGluKVxuICAgIH1cbiAgfVxuXG5cbiAgZmlsdGVyQ29sdW1uKGZpbHRlclZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmN1cnJlbnRGaWx0ZXIgPSBmaWx0ZXJWYWx1ZTtcbiAgICBpZiAoIWZpbHRlclZhbHVlKSB7XG4gICAgICB0aGlzLmdyaWQuc2V0RmlsdGVyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZC5zZXRGaWx0ZXIoZmlsdGVyVmFsdWUudHJpbSgpLCBbIHRoaXMuY29sdW1uIF0pO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrVHJhcChldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cbiJdfQ==