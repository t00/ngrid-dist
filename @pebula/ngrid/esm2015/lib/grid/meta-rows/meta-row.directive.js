/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/meta-rows/meta-row.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, ElementRef, Attribute } from '@angular/core';
import { PblNgridMetaRowService } from './meta-row.service';
export class PblMetaRowDirective {
    /**
     * @param {?} metaRows
     * @param {?} elRef
     * @param {?} gridWidthRow
     */
    constructor(metaRows, elRef, gridWidthRow) {
        this.metaRows = metaRows;
        this.elRef = elRef;
        this.gridWidthRow = gridWidthRow !== null;
    }
    // tslint:disable-next-line:no-input-rename
    /**
     * @return {?}
     */
    get meta() { return this._meta; }
    /**
     * @param {?} value
     * @return {?}
     */
    set meta(value) {
        if (value !== this._meta) {
            this.update(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.metaRows.removeMetaRow(this);
    }
    /**
     * @private
     * @param {?} meta
     * @return {?}
     */
    update(meta) {
        /** @type {?} */
        const oldMeta = this._meta;
        if (oldMeta) {
            if (oldMeta.rowClassName) {
                this.elRef.nativeElement.classList.remove(oldMeta.rowClassName);
            }
            this.metaRows.removeMetaRow(this);
        }
        this._meta = meta;
        if (meta) {
            if (meta.rowClassName) {
                this.elRef.nativeElement.classList.add(meta.rowClassName);
            }
            this.metaRows.addMetaRow(this);
        }
    }
}
PblMetaRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblMetaRow]',
            },] }
];
/** @nocollapse */
PblMetaRowDirective.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Attribute, args: ['gridWidthRow',] }] }
];
PblMetaRowDirective.propDecorators = {
    meta: [{ type: Input, args: ['pblMetaRow',] }]
};
if (false) {
    /** @type {?} */
    PblMetaRowDirective.prototype.gridWidthRow;
    /**
     * @type {?}
     * @private
     */
    PblMetaRowDirective.prototype._meta;
    /** @type {?} */
    PblMetaRowDirective.prototype.metaRows;
    /** @type {?} */
    PblMetaRowDirective.prototype.elRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSzVELE1BQU0sT0FBTyxtQkFBbUI7Ozs7OztJQWM5QixZQUE0QixRQUFnQyxFQUN6QyxLQUE4QixFQUNWLFlBQWlCO1FBRjVCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBRS9DLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxLQUFLLElBQUksQ0FBQztJQUM1QyxDQUFDOzs7OztJQWZELElBQXlCLElBQUksS0FBNEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDN0UsSUFBSSxJQUFJLENBQUMsS0FBNEI7UUFDbkMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7OztJQVlELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsSUFBMkI7O2NBQ2xDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztRQUUxQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7O1lBM0NGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYzthQUN6Qjs7OztZQUpRLHNCQUFzQjtZQUhKLFVBQVU7NENBd0J0QixTQUFTLFNBQUMsY0FBYzs7O21CQWJwQyxLQUFLLFNBQUMsWUFBWTs7OztJQU9uQiwyQ0FBc0M7Ozs7O0lBRXRDLG9DQUFxQzs7SUFFekIsdUNBQWdEOztJQUNoRCxvQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIEF0dHJpYnV0ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSBmcm9tICcuLi9jb2x1bW5zL3R5cGVzJztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTWV0YVJvd10nLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxNZXRhUm93RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncGJsTWV0YVJvdycpIGdldCBtZXRhKCk6IFBibE1ldGFSb3dEZWZpbml0aW9ucyB7IHJldHVybiB0aGlzLl9tZXRhOyB9XG4gIHNldCBtZXRhKHZhbHVlOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX21ldGEpIHtcbiAgICAgIHRoaXMudXBkYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVhZG9ubHkgZ3JpZFdpZHRoUm93OiBib29sZWFuO1xuXG4gIHByaXZhdGUgX21ldGE6IFBibE1ldGFSb3dEZWZpbml0aW9ucztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsXG4gICAgICAgICAgICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgICAgICAgICAgIEBBdHRyaWJ1dGUoJ2dyaWRXaWR0aFJvdycpIGdyaWRXaWR0aFJvdzogYW55KSB7XG4gICAgdGhpcy5ncmlkV2lkdGhSb3cgPSBncmlkV2lkdGhSb3cgIT09IG51bGw7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm1ldGFSb3dzLnJlbW92ZU1ldGFSb3codGhpcyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZShtZXRhOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRNZXRhID0gdGhpcy5fbWV0YTtcblxuICAgIGlmIChvbGRNZXRhKSB7XG4gICAgICBpZihvbGRNZXRhLnJvd0NsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShvbGRNZXRhLnJvd0NsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFSb3dzLnJlbW92ZU1ldGFSb3codGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX21ldGEgPSBtZXRhO1xuICAgIGlmIChtZXRhKSB7XG4gICAgICBpZiAobWV0YS5yb3dDbGFzc05hbWUpIHtcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQobWV0YS5yb3dDbGFzc05hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRhUm93cy5hZGRNZXRhUm93KHRoaXMpO1xuICAgIH1cbiAgfVxufVxuIl19