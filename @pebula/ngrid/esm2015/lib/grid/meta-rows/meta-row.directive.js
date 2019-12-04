/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef, OnDestroy, Attribute } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridMetaRowService } from './meta-row.service';
let PblMetaRowDirective = class PblMetaRowDirective {
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
};
PblMetaRowDirective.ctorParameters = () => [
    { type: PblNgridMetaRowService },
    { type: ElementRef },
    { type: undefined }
];
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
PblMetaRowDirective = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridMetaRowService,
        ElementRef, Object])
], PblMetaRowDirective);
export { PblMetaRowDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL21ldGEtcm93cy9tZXRhLXJvdy5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVuRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0lBTS9DLG1CQUFtQixTQUFuQixtQkFBbUI7Ozs7OztJQWM5QixZQUE0QixRQUFnQyxFQUN6QyxLQUE4QixFQUNWLFlBQWlCO1FBRjVCLGFBQVEsR0FBUixRQUFRLENBQXdCO1FBQ3pDLFVBQUssR0FBTCxLQUFLLENBQXlCO1FBRS9DLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxLQUFLLElBQUksQ0FBQztJQUM1QyxDQUFDOzs7OztJQWZELElBQXlCLElBQUksS0FBNEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7SUFDN0UsSUFBSSxJQUFJLENBQUMsS0FBNEI7UUFDbkMsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7OztJQVlELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsSUFBMkI7O2NBQ2xDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSztRQUUxQixJQUFJLE9BQU8sRUFBRTtZQUNYLElBQUcsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDakU7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztDQUNGLENBQUE7O1lBM0J1QyxzQkFBc0I7WUFDbEMsVUFBVTs7OztZQW5CckMsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7O1lBSlEsc0JBQXNCO1lBTEosVUFBVTs0Q0EyQnRCLFNBQVMsU0FBQyxjQUFjOzs7bUJBYnBDLEtBQUssU0FBQyxZQUFZOztBQUhSLG1CQUFtQjtJQUQvQixJQUFJLEVBQUU7NkNBZWlDLHNCQUFzQjtRQUNsQyxVQUFVO0dBZnpCLG1CQUFtQixDQXlDL0I7U0F6Q1ksbUJBQW1COzs7SUFVOUIsMkNBQXNDOzs7OztJQUV0QyxvQ0FBcUM7O0lBRXpCLHVDQUFnRDs7SUFDaEQsb0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBBdHRyaWJ1dGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5cbmltcG9ydCB7IFBibE1ldGFSb3dEZWZpbml0aW9ucyB9IGZyb20gJy4uL2NvbHVtbnMvdHlwZXMnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3cuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twYmxNZXRhUm93XScsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE1ldGFSb3dEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdwYmxNZXRhUm93JykgZ2V0IG1ldGEoKTogUGJsTWV0YVJvd0RlZmluaXRpb25zIHsgcmV0dXJuIHRoaXMuX21ldGE7IH1cbiAgc2V0IG1ldGEodmFsdWU6IFBibE1ldGFSb3dEZWZpbml0aW9ucykge1xuICAgIGlmICh2YWx1ZSAhPT0gdGhpcy5fbWV0YSkge1xuICAgICAgdGhpcy51cGRhdGUodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyByZWFkb25seSBncmlkV2lkdGhSb3c6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBfbWV0YTogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtZXRhUm93czogUGJsTmdyaWRNZXRhUm93U2VydmljZSxcbiAgICAgICAgICAgICAgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICAgICAgICAgICAgQEF0dHJpYnV0ZSgnZ3JpZFdpZHRoUm93JykgZ3JpZFdpZHRoUm93OiBhbnkpIHtcbiAgICB0aGlzLmdyaWRXaWR0aFJvdyA9IGdyaWRXaWR0aFJvdyAhPT0gbnVsbDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMubWV0YVJvd3MucmVtb3ZlTWV0YVJvdyh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKG1ldGE6IFBibE1ldGFSb3dEZWZpbml0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IG9sZE1ldGEgPSB0aGlzLl9tZXRhO1xuXG4gICAgaWYgKG9sZE1ldGEpIHtcbiAgICAgIGlmKG9sZE1ldGEucm93Q2xhc3NOYW1lKSB7XG4gICAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKG9sZE1ldGEucm93Q2xhc3NOYW1lKTtcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0YVJvd3MucmVtb3ZlTWV0YVJvdyh0aGlzKTtcbiAgICB9XG4gICAgdGhpcy5fbWV0YSA9IG1ldGE7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIGlmIChtZXRhLnJvd0NsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChtZXRhLnJvd0NsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFSb3dzLmFkZE1ldGFSb3codGhpcyk7XG4gICAgfVxuICB9XG59XG4iXX0=