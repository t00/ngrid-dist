/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, OnDestroy } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridMetaRowService } from './meta-row.service';
let PblMetaRowDirective = class PblMetaRowDirective {
    /**
     * @param {?} metaRows
     * @param {?} elRef
     */
    constructor(metaRows, elRef) {
        this.metaRows = metaRows;
        this.elRef = elRef;
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
};
PblMetaRowDirective.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblMetaRowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[pblMetaRow]',
            },] }
];
/** @nocollapse */
PblMetaRowDirective.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef }
];
PblMetaRowDirective.propDecorators = {
    meta: [{ type: Input, args: ['pblMetaRow',] }]
};
PblMetaRowDirective = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridMetaRowService, ElementRef])
], PblMetaRowDirective);
export { PblMetaRowDirective };
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9tZXRhLXJvd3MvbWV0YS1yb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0lBTy9DLG1CQUFtQixTQUFuQixtQkFBbUI7Ozs7O0lBWTlCLFlBQTRCLFFBQWdDLEVBQVMsS0FBOEI7UUFBdkUsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUF5QjtJQUVuRyxDQUFDOzs7OztJQVhELElBQXlCLElBQUksS0FBNEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDN0UsSUFBSSxJQUFJLENBQUMsS0FBNEI7UUFDbkMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7OztJQVFELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsSUFBMkI7O2NBQ2xDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztRQUUxQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBekJ1QyxzQkFBc0I7WUFBZ0IsVUFBVTs7O1lBaEJ2RixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7YUFDekI7Ozs7WUFMUSxzQkFBc0I7WUFQSixVQUFVOzs7bUJBaUJsQyxLQUFLLFNBQUMsWUFBWTs7QUFIUixtQkFBbUI7SUFEL0IsSUFBSSxFQUFFOzZDQWFpQyxzQkFBc0IsRUFBZ0IsVUFBVTtHQVozRSxtQkFBbUIsQ0FxQy9CO1NBckNZLG1CQUFtQjs7Ozs7O0lBVTlCLG9DQUFxQzs7SUFFekIsdUNBQWdEOztJQUFFLG9DQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZU1ldGFSb3cgfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvdy5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTWV0YVJvd10nLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxNZXRhUm93RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncGJsTWV0YVJvdycpIGdldCBtZXRhKCk6IFBibE1ldGFSb3dEZWZpbml0aW9ucyB7IHJldHVybiB0aGlzLl9tZXRhOyB9XG4gIHNldCBtZXRhKHZhbHVlOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX21ldGEpIHtcbiAgICAgIHRoaXMudXBkYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9tZXRhOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG1ldGFSb3dzOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLCBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubWV0YVJvd3MucmVtb3ZlTWV0YVJvdyh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKG1ldGE6IFBibE1ldGFSb3dEZWZpbml0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZE1ldGEgPSB0aGlzLl9tZXRhO1xuXG4gICAgaWYgKG9sZE1ldGEpIHtcbiAgICAgIGlmKG9sZE1ldGEucm93Q2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG9sZE1ldGEucm93Q2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0YVJvd3MucmVtb3ZlTWV0YVJvdyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fbWV0YSA9IG1ldGE7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIGlmIChtZXRhLnJvd0NsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChtZXRhLnJvd0NsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFSb3dzLmFkZE1ldGFSb3codGhpcyk7XG4gICAgfVxuICB9XG59XG4iXX0=