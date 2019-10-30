/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, OnDestroy } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridMetaRowService } from './meta-row.service';
var PblMetaRowDirective = /** @class */ (function () {
    function PblMetaRowDirective(metaRows, elRef) {
        this.metaRows = metaRows;
        this.elRef = elRef;
    }
    Object.defineProperty(PblMetaRowDirective.prototype, "meta", {
        // tslint:disable-next-line:no-input-rename
        get: 
        // tslint:disable-next-line:no-input-rename
        /**
         * @return {?}
         */
        function () { return this._meta; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value !== this._meta) {
                this.update(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblMetaRowDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.metaRows.removeMetaRow(this);
    };
    /**
     * @private
     * @param {?} meta
     * @return {?}
     */
    PblMetaRowDirective.prototype.update = /**
     * @private
     * @param {?} meta
     * @return {?}
     */
    function (meta) {
        /** @type {?} */
        var oldMeta = this._meta;
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
    };
    PblMetaRowDirective.ctorParameters = function () { return [
        { type: PblNgridMetaRowService },
        { type: ElementRef }
    ]; };
    PblMetaRowDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[pblMetaRow]',
                },] }
    ];
    /** @nocollapse */
    PblMetaRowDirective.ctorParameters = function () { return [
        { type: PblNgridMetaRowService },
        { type: ElementRef }
    ]; };
    PblMetaRowDirective.propDecorators = {
        meta: [{ type: Input, args: ['pblMetaRow',] }]
    };
    PblMetaRowDirective = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridMetaRowService, ElementRef])
    ], PblMetaRowDirective);
    return PblMetaRowDirective;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9tZXRhLXJvd3MvbWV0YS1yb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV4RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBS3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQW1CMUQsNkJBQTRCLFFBQWdDLEVBQVMsS0FBOEI7UUFBdkUsYUFBUSxHQUFSLFFBQVEsQ0FBd0I7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUF5QjtJQUVuRyxDQUFDO0lBWEQsc0JBQXlCLHFDQUFJO1FBRDdCLDJDQUEyQzs7Ozs7O1FBQzNDLGNBQXlELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7O1FBQzdFLFVBQVMsS0FBNEI7WUFDbkMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNwQjtRQUNILENBQUM7OztPQUw0RTs7OztJQWE3RSx5Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFTyxvQ0FBTTs7Ozs7SUFBZCxVQUFlLElBQTJCOztZQUNsQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUs7UUFFMUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFHLE9BQU8sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2pFO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0Q7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7O2dCQXhCcUMsc0JBQXNCO2dCQUFnQixVQUFVOzs7Z0JBaEJ2RixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCOzs7O2dCQUxRLHNCQUFzQjtnQkFQSixVQUFVOzs7dUJBaUJsQyxLQUFLLFNBQUMsWUFBWTs7SUFIUixtQkFBbUI7UUFEL0IsSUFBSSxFQUFFO2lEQWFpQyxzQkFBc0IsRUFBZ0IsVUFBVTtPQVozRSxtQkFBbUIsQ0FxQy9CO0lBQUQsMEJBQUM7Q0FBQSxJQUFBO1NBckNZLG1CQUFtQjs7Ozs7O0lBVTlCLG9DQUFxQzs7SUFFekIsdUNBQWdEOztJQUFFLG9DQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuXG5pbXBvcnQgeyBQYmxDb2x1bW5TdG9yZU1ldGFSb3cgfSBmcm9tICcuLi9jb2x1bW5zL2NvbHVtbi1zdG9yZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlIH0gZnJvbSAnLi9tZXRhLXJvdy5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcGJsTWV0YVJvd10nLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxNZXRhUm93RGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgncGJsTWV0YVJvdycpIGdldCBtZXRhKCk6IFBibE1ldGFSb3dEZWZpbml0aW9ucyB7IHJldHVybiB0aGlzLl9tZXRhOyB9XG4gIHNldCBtZXRhKHZhbHVlOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMuX21ldGEpIHtcbiAgICAgIHRoaXMudXBkYXRlKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9tZXRhOiBQYmxNZXRhUm93RGVmaW5pdGlvbnM7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG1ldGFSb3dzOiBQYmxOZ3JpZE1ldGFSb3dTZXJ2aWNlLCBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubWV0YVJvd3MucmVtb3ZlTWV0YVJvdyh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKG1ldGE6IFBibE1ldGFSb3dEZWZpbml0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZE1ldGEgPSB0aGlzLl9tZXRhO1xuXG4gICAgaWYgKG9sZE1ldGEpIHtcbiAgICAgIGlmKG9sZE1ldGEucm93Q2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG9sZE1ldGEucm93Q2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0YVJvd3MucmVtb3ZlTWV0YVJvdyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fbWV0YSA9IG1ldGE7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIGlmIChtZXRhLnJvd0NsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChtZXRhLnJvd0NsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFSb3dzLmFkZE1ldGFSb3codGhpcyk7XG4gICAgfVxuICB9XG59XG4iXX0=