/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9tZXRhLXJvd3MvbWV0YS1yb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXhFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7O0lBbUIxRCw2QkFBNEIsUUFBZ0MsRUFBUyxLQUE4QjtRQUF2RSxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQXlCO0lBRW5HLENBQUM7SUFYRCxzQkFBeUIscUNBQUk7UUFEN0IsMkNBQTJDOzs7Ozs7UUFDM0MsY0FBeUQsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7UUFDN0UsVUFBUyxLQUE0QjtZQUNuQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQzs7O09BTDRFOzs7O0lBYTdFLHlDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVPLG9DQUFNOzs7OztJQUFkLFVBQWUsSUFBMkI7O1lBQ2xDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztRQUUxQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQzs7Z0JBeENGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztpQkFDekI7Ozs7Z0JBTFEsc0JBQXNCO2dCQVBKLFVBQVU7Ozt1QkFpQmxDLEtBQUssU0FBQyxZQUFZOztJQUhSLG1CQUFtQjtRQUQvQixJQUFJLEVBQUU7aURBYWlDLHNCQUFzQixFQUFnQixVQUFVO09BWjNFLG1CQUFtQixDQXFDL0I7SUFBRCwwQkFBQztDQUFBLElBQUE7U0FyQ1ksbUJBQW1COzs7Ozs7SUFVOUIsb0NBQXFDOztJQUV6Qix1Q0FBZ0Q7O0lBQUUsb0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcblxuaW1wb3J0IHsgUGJsTWV0YVJvd0RlZmluaXRpb25zIH0gZnJvbSAnLi4vY29sdW1ucy90eXBlcyc7XG5cbmltcG9ydCB7IFBibENvbHVtblN0b3JlTWV0YVJvdyB9IGZyb20gJy4uL2NvbHVtbnMvY29sdW1uLXN0b3JlJztcbmltcG9ydCB7IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UgfSBmcm9tICcuL21ldGEtcm93LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxNZXRhUm93XScsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE1ldGFSb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdwYmxNZXRhUm93JykgZ2V0IG1ldGEoKTogUGJsTWV0YVJvd0RlZmluaXRpb25zIHsgcmV0dXJuIHRoaXMuX21ldGE7IH1cbiAgc2V0IG1ldGEodmFsdWU6IFBibE1ldGFSb3dEZWZpbml0aW9ucykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbWV0YSkge1xuICAgICAgdGhpcy51cGRhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX21ldGE6IFBibE1ldGFSb3dEZWZpbml0aW9ucztcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWV0YVJvd3M6IFBibE5ncmlkTWV0YVJvd1NlcnZpY2UsIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5tZXRhUm93cy5yZW1vdmVNZXRhUm93KHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUobWV0YTogUGJsTWV0YVJvd0RlZmluaXRpb25zKTogdm9pZCB7XG4gICAgY29uc3Qgb2xkTWV0YSA9IHRoaXMuX21ldGE7XG5cbiAgICBpZiAob2xkTWV0YSkge1xuICAgICAgaWYob2xkTWV0YS5yb3dDbGFzc05hbWUpIHtcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUob2xkTWV0YS5yb3dDbGFzc05hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRhUm93cy5yZW1vdmVNZXRhUm93KHRoaXMpO1xuICAgIH1cbiAgICB0aGlzLl9tZXRhID0gbWV0YTtcbiAgICBpZiAobWV0YSkge1xuICAgICAgaWYgKG1ldGEucm93Q2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKG1ldGEucm93Q2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0YVJvd3MuYWRkTWV0YVJvdyh0aGlzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==