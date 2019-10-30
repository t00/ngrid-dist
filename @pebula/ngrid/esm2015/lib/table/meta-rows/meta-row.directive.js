/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS1yb3cuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9tZXRhLXJvd3MvbWV0YS1yb3cuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRXhFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLckMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7SUFPL0MsbUJBQW1CLFNBQW5CLG1CQUFtQjs7Ozs7SUFZOUIsWUFBNEIsUUFBZ0MsRUFBUyxLQUE4QjtRQUF2RSxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUFTLFVBQUssR0FBTCxLQUFLLENBQXlCO0lBRW5HLENBQUM7Ozs7O0lBWEQsSUFBeUIsSUFBSSxLQUE0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7OztJQUM3RSxJQUFJLElBQUksQ0FBQyxLQUE0QjtRQUNuQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7O0lBUUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxJQUEyQjs7Y0FDbEMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLO1FBRTFCLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBRyxPQUFPLENBQUMsWUFBWSxFQUFFO2dCQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqRTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0NBQ0YsQ0FBQTs7WUF6Q0EsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2FBQ3pCOzs7O1lBTFEsc0JBQXNCO1lBUEosVUFBVTs7O21CQWlCbEMsS0FBSyxTQUFDLFlBQVk7O0FBSFIsbUJBQW1CO0lBRC9CLElBQUksRUFBRTs2Q0FhaUMsc0JBQXNCLEVBQWdCLFVBQVU7R0FaM0UsbUJBQW1CLENBcUMvQjtTQXJDWSxtQkFBbUI7Ozs7OztJQVU5QixvQ0FBcUM7O0lBRXpCLHVDQUFnRDs7SUFBRSxvQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBFbGVtZW50UmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuXG5pbXBvcnQgeyBQYmxNZXRhUm93RGVmaW5pdGlvbnMgfSBmcm9tICcuLi9jb2x1bW5zL3R5cGVzJztcblxuaW1wb3J0IHsgUGJsQ29sdW1uU3RvcmVNZXRhUm93IH0gZnJvbSAnLi4vY29sdW1ucy9jb2x1bW4tc3RvcmUnO1xuaW1wb3J0IHsgUGJsTmdyaWRNZXRhUm93U2VydmljZSB9IGZyb20gJy4vbWV0YS1yb3cuc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BibE1ldGFSb3ddJyxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTWV0YVJvd0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ3BibE1ldGFSb3cnKSBnZXQgbWV0YSgpOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMgeyByZXR1cm4gdGhpcy5fbWV0YTsgfVxuICBzZXQgbWV0YSh2YWx1ZTogUGJsTWV0YVJvd0RlZmluaXRpb25zKSB7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLl9tZXRhKSB7XG4gICAgICB0aGlzLnVwZGF0ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbWV0YTogUGJsTWV0YVJvd0RlZmluaXRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtZXRhUm93czogUGJsTmdyaWRNZXRhUm93U2VydmljZSwgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLm1ldGFSb3dzLnJlbW92ZU1ldGFSb3codGhpcyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZShtZXRhOiBQYmxNZXRhUm93RGVmaW5pdGlvbnMpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRNZXRhID0gdGhpcy5fbWV0YTtcblxuICAgIGlmIChvbGRNZXRhKSB7XG4gICAgICBpZihvbGRNZXRhLnJvd0NsYXNzTmFtZSkge1xuICAgICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShvbGRNZXRhLnJvd0NsYXNzTmFtZSk7XG4gICAgICB9XG4gICAgICB0aGlzLm1ldGFSb3dzLnJlbW92ZU1ldGFSb3codGhpcyk7XG4gICAgfVxuICAgIHRoaXMuX21ldGEgPSBtZXRhO1xuICAgIGlmIChtZXRhKSB7XG4gICAgICBpZiAobWV0YS5yb3dDbGFzc05hbWUpIHtcbiAgICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQobWV0YS5yb3dDbGFzc05hbWUpO1xuICAgICAgfVxuICAgICAgdGhpcy5tZXRhUm93cy5hZGRNZXRhUm93KHRoaXMpO1xuICAgIH1cbiAgfVxufVxuIl19