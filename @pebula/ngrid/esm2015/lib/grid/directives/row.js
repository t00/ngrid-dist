/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewEncapsulation, Optional } from '@angular/core';
import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { PblNgridPluginController } from '../../ext/plugin-control';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
import { PblNgridComponent } from '../ngrid.component';
import { StylingDiffer } from './cell-style-class/styling_differ';
/** @type {?} */
export const PBL_NGRID_ROW_TEMPLATE = `<ng-content select=".pbl-ngrid-row-prefix"></ng-content>${CDK_ROW_TEMPLATE}<ng-content select=".pbl-ngrid-row-suffix"></ng-content>`;
/**
 * @template T
 */
export class PblNgridRowComponent extends CdkRow {
    /**
     * @param {?} extApi
     * @param {?} el
     */
    constructor(extApi, el) {
        super();
        this.extApi = extApi;
        this.el = el;
        if (extApi) {
            this.grid = extApi.grid;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set row(value) { value && this.updateRow(); }
    /**
     * @return {?}
     */
    updateRow() {
        if (this.extApi) {
            if (!(this.rowRenderIndex >= 0)) {
                this.getRend();
            }
            this.context = this.extApi.contextApi.rowContext(this.rowRenderIndex);
            this.el.nativeElement.setAttribute('row-id', (/** @type {?} */ (this.context.dataIndex)));
            this.el.nativeElement.setAttribute('row-key', this.context.identity);
            if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'item') {
                this.updateHostClass();
            }
        }
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'ngDoCheck') {
            this.updateHostClass();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!this.extApi) {
            if (!this.grid) {
                throw new Error('"pbl-ngrid-row" is used outside the scope of a grid, you must provide a grid instance.');
            }
            /** @type {?} */
            const controller = PblNgridPluginController.find(this.grid);
            this.extApi = controller.extApi;
            this.updateRow();
        }
    }
    /**
     * @return {?}
     */
    getRend() {
        /** @type {?} */
        const vcRef = this.extApi.cdkTable._rowOutlet.viewContainer;
        /** @type {?} */
        const len = vcRef.length - 1;
        for (let i = len; i > -1; i--) {
            /** @type {?} */
            const viewRef = (/** @type {?} */ (vcRef.get(i)));
            if (viewRef.rootNodes[0] === this.el.nativeElement) {
                this.rowRenderIndex = i;
                break;
            }
        }
    }
    /**
     * @protected
     * @return {?}
     */
    updateHostClass() {
        if (this.context) {
            /** @type {?} */
            const el = this.el.nativeElement;
            // if there is an updater, work with it
            // otherwise, clear previous classes that got applied (assumed a live binding change of the updater function)
            // users should be aware to tear down the updater only when they want to stop this feature, if the goal is just to toggle on/off
            // it's better to set the frequency to `none` and return nothing from the function (replace it) so the differ is not nuked.
            if (this.grid.rowClassUpdate) {
                if (!this._classDiffer) {
                    this._classDiffer = new StylingDiffer('NgClass', 1 /* TrimProperties */ | 2 /* AllowSubKeys */ | 4 /* AllowStringValue */ | 16 /* ForceAsMap */);
                    this._lastClass = new Set();
                }
                /** @type {?} */
                const newValue = this.grid.rowClassUpdate(this.context);
                this._classDiffer.setValue(newValue);
                if (this._classDiffer.hasValueChanged()) {
                    /** @type {?} */
                    const lastClass = this._lastClass;
                    this._lastClass = new Set();
                    /** @type {?} */
                    const value = this._classDiffer.value || {};
                    for (const key of Object.keys(value)) {
                        if (value[key]) {
                            el.classList.add(key);
                            this._lastClass.add(key);
                        }
                        else {
                            el.classList.remove(key);
                        }
                        lastClass.delete(key);
                    }
                    if (lastClass.size > 0) {
                        for (const key of lastClass.values()) {
                            el.classList.remove(key);
                        }
                    }
                }
            }
            else if (this._classDiffer) {
                /** @type {?} */
                const value = this._classDiffer.value || {};
                this._classDiffer = this._lastClass = undefined;
                for (const key of Object.keys(value)) {
                    el.classList.remove(key);
                }
            }
        }
    }
}
PblNgridRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'pbl-ngrid-row[row]',
                template: PBL_NGRID_ROW_TEMPLATE,
                host: {
                    // tslint:disable-line:use-host-property-decorator
                    'class': 'pbl-ngrid-row',
                    'role': 'row',
                },
                providers: [
                    { provide: CdkRow, useExisting: PblNgridRowComponent }
                ],
                exportAs: 'pblNgridRow',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
PblNgridRowComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
    { type: ElementRef }
];
PblNgridRowComponent.propDecorators = {
    row: [{ type: Input }],
    grid: [{ type: Input }]
};
if (false) {
    /**
     * Optional grid instance, required only if the row is declared outside the scope of the grid.
     * @type {?}
     */
    PblNgridRowComponent.prototype.grid;
    /** @type {?} */
    PblNgridRowComponent.prototype.rowRenderIndex;
    /** @type {?} */
    PblNgridRowComponent.prototype.context;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowComponent.prototype._classDiffer;
    /**
     * @type {?}
     * @private
     */
    PblNgridRowComponent.prototype._lastClass;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRowComponent.prototype.extApi;
    /**
     * @type {?}
     * @protected
     */
    PblNgridRowComponent.prototype.el;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2RpcmVjdGl2ZXMvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQW1CLE1BQU0sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQTRCLFFBQVEsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUMvSyxPQUFPLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSx3QkFBd0IsQ0FBQztBQUU3RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLG1DQUFtQyxDQUFDOztBQUV4RixNQUFNLE9BQU8sc0JBQXNCLEdBQUksMkRBQTJELGdCQUFnQiwwREFBMEQ7Ozs7QUFnQjVLLE1BQU0sT0FBTyxvQkFBOEIsU0FBUSxNQUFNOzs7OztJQWV2RCxZQUF5RCxNQUErQixFQUFZLEVBQTJCO1FBQzdILEtBQUssRUFBRSxDQUFDO1FBRCtDLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQVksT0FBRSxHQUFGLEVBQUUsQ0FBeUI7UUFFN0gsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDekI7SUFDSCxDQUFDOzs7OztJQWxCRCxJQUFhLEdBQUcsQ0FBQyxLQUFRLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFvQnpELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUUsQ0FBQyxJQUFJLENB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LENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7U0FDRjtJQUNILENBQUM7OztZQWxJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsSUFBSSxFQUFFOztvQkFDSixPQUFPLEVBQUUsZUFBZTtvQkFDeEIsTUFBTSxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUU7aUJBQ3ZEO2dCQUNELFFBQVEsRUFBRSxhQUFhO2dCQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7Ozs7NENBZ0JjLFFBQVEsWUFBSSxNQUFNLFNBQUMsYUFBYTtZQXZDRixVQUFVOzs7a0JBMEJwRCxLQUFLO21CQUtMLEtBQUs7Ozs7Ozs7SUFBTixvQ0FBb0M7O0lBRXBDLDhDQUF1Qjs7SUFDdkIsdUNBQTBCOzs7OztJQUUxQiw0Q0FBa0U7Ozs7O0lBQ2xFLDBDQUFnQzs7Ozs7SUFFcEIsc0NBQTRFOzs7OztJQUFFLGtDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT3B0aW9uYWwsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1JvdywgQ0RLX1JPV19URU1QTEFURSwgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvZ3JpZC1leHQtYXBpJztcbmltcG9ydCB7IFBibFJvd0NvbnRleHQgfSBmcm9tICcuLi9jb250ZXh0L2luZGV4JztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50IH0gZnJvbSAnLi4vbmdyaWQuY29tcG9uZW50JztcbmltcG9ydCB7IFN0eWxpbmdEaWZmZXIsIFN0eWxpbmdEaWZmZXJPcHRpb25zIH0gZnJvbSAnLi9jZWxsLXN0eWxlLWNsYXNzL3N0eWxpbmdfZGlmZmVyJztcblxuZXhwb3J0IGNvbnN0IFBCTF9OR1JJRF9ST1dfVEVNUExBVEUgID0gYDxuZy1jb250ZW50IHNlbGVjdD1cIi5wYmwtbmdyaWQtcm93LXByZWZpeFwiPjwvbmctY29udGVudD4ke0NES19ST1dfVEVNUExBVEV9PG5nLWNvbnRlbnQgc2VsZWN0PVwiLnBibC1uZ3JpZC1yb3ctc3VmZml4XCI+PC9uZy1jb250ZW50PmA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZC1yb3dbcm93XScsXG4gIHRlbXBsYXRlOiBQQkxfTkdSSURfUk9XX1RFTVBMQVRFLFxuICBob3N0OiB7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6dXNlLWhvc3QtcHJvcGVydHktZGVjb3JhdG9yXG4gICAgJ2NsYXNzJzogJ3BibC1uZ3JpZC1yb3cnLFxuICAgICdyb2xlJzogJ3JvdycsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHsgcHJvdmlkZTogQ2RrUm93LCB1c2VFeGlzdGluZzogUGJsTmdyaWRSb3dDb21wb25lbnQgfVxuICBdLFxuICBleHBvcnRBczogJ3BibE5ncmlkUm93JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkUm93Q29tcG9uZW50PFQgPSBhbnk+IGV4dGVuZHMgQ2RrUm93IGltcGxlbWVudHMgT25DaGFuZ2VzLCBEb0NoZWNrIHtcblxuICBASW5wdXQoKSBzZXQgcm93KHZhbHVlOiBUKSB7IHZhbHVlICYmIHRoaXMudXBkYXRlUm93KCk7IH1cblxuICAvKipcbiAgICogT3B0aW9uYWwgZ3JpZCBpbnN0YW5jZSwgcmVxdWlyZWQgb25seSBpZiB0aGUgcm93IGlzIGRlY2xhcmVkIG91dHNpZGUgdGhlIHNjb3BlIG9mIHRoZSBncmlkLlxuICAgKi9cbiAgQElucHV0KCkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD47XG5cbiAgcm93UmVuZGVySW5kZXg6IG51bWJlcjtcbiAgY29udGV4dDogUGJsUm93Q29udGV4dDxUPjtcblxuICBwcml2YXRlIF9jbGFzc0RpZmZlcjogU3R5bGluZ0RpZmZlcjx7IFtrbGFzczogc3RyaW5nXTogYm9vbGVhbiB9PjtcbiAgcHJpdmF0ZSBfbGFzdENsYXNzOiBTZXQ8c3RyaW5nPjtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KEVYVF9BUElfVE9LRU4pIHByb3RlY3RlZCBleHRBcGk6IFBibE5ncmlkRXh0ZW5zaW9uQXBpPFQ+LCBwcm90ZWN0ZWQgZWw6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+KSB7XG4gICAgc3VwZXIoKTtcbiAgICBpZiAoZXh0QXBpKSB7XG4gICAgICB0aGlzLmdyaWQgPSBleHRBcGkuZ3JpZDtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVSb3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXh0QXBpKSB7XG4gICAgICBpZiAoISAodGhpcy5yb3dSZW5kZXJJbmRleCA+PSAwKSApIHtcbiAgICAgICAgdGhpcy5nZXRSZW5kKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLnJvd0NvbnRleHQodGhpcy5yb3dSZW5kZXJJbmRleCk7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb3ctaWQnLCB0aGlzLmNvbnRleHQuZGF0YUluZGV4IGFzIGFueSk7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb3cta2V5JywgdGhpcy5jb250ZXh0LmlkZW50aXR5KTtcblxuICAgICAgaWYgKHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSAmJiB0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGVGcmVxID09PSAnaXRlbScpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIb3N0Q2xhc3MoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSAmJiB0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGVGcmVxID09PSAnbmdEb0NoZWNrJykge1xuICAgICAgdGhpcy51cGRhdGVIb3N0Q2xhc3MoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV4dEFwaSkge1xuICAgICAgaWYgKCF0aGlzLmdyaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInBibC1uZ3JpZC1yb3dcIiBpcyB1c2VkIG91dHNpZGUgdGhlIHNjb3BlIG9mIGEgZ3JpZCwgeW91IG11c3QgcHJvdmlkZSBhIGdyaWQgaW5zdGFuY2UuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGhpcy5ncmlkKTtcbiAgICAgIHRoaXMuZXh0QXBpID0gY29udHJvbGxlci5leHRBcGk7XG4gICAgICB0aGlzLnVwZGF0ZVJvdygpO1xuICAgIH1cbiAgfVxuXG4gIGdldFJlbmQoKTogdm9pZCB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmV4dEFwaS5jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgY29uc3QgbGVuID0gdmNSZWYubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gbGVuOyBpID4gLTE7IGktLSkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IHZjUmVmLmdldChpKSBhcyBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj47XG4gICAgICBpZiAodmlld1JlZi5yb290Tm9kZXNbMF0gPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICB0aGlzLnJvd1JlbmRlckluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUhvc3RDbGFzcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gdXBkYXRlciwgd29yayB3aXRoIGl0XG4gICAgICAvLyBvdGhlcndpc2UsIGNsZWFyIHByZXZpb3VzIGNsYXNzZXMgdGhhdCBnb3QgYXBwbGllZCAoYXNzdW1lZCBhIGxpdmUgYmluZGluZyBjaGFuZ2Ugb2YgdGhlIHVwZGF0ZXIgZnVuY3Rpb24pXG4gICAgICAvLyB1c2VycyBzaG91bGQgYmUgYXdhcmUgdG8gdGVhciBkb3duIHRoZSB1cGRhdGVyIG9ubHkgd2hlbiB0aGV5IHdhbnQgdG8gc3RvcCB0aGlzIGZlYXR1cmUsIGlmIHRoZSBnb2FsIGlzIGp1c3QgdG8gdG9nZ2xlIG9uL29mZlxuICAgICAgLy8gaXQncyBiZXR0ZXIgdG8gc2V0IHRoZSBmcmVxdWVuY3kgdG8gYG5vbmVgIGFuZCByZXR1cm4gbm90aGluZyBmcm9tIHRoZSBmdW5jdGlvbiAocmVwbGFjZSBpdCkgc28gdGhlIGRpZmZlciBpcyBub3QgbnVrZWQuXG4gICAgICBpZiAodGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2xhc3NEaWZmZXIpIHtcbiAgICAgICAgICB0aGlzLl9jbGFzc0RpZmZlciA9IG5ldyBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+KFxuICAgICAgICAgICAgJ05nQ2xhc3MnLFxuICAgICAgICAgICAgU3R5bGluZ0RpZmZlck9wdGlvbnMuVHJpbVByb3BlcnRpZXMgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N1YktleXMgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N0cmluZ1ZhbHVlIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuRm9yY2VBc01hcCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGUodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5fY2xhc3NEaWZmZXIuc2V0VmFsdWUobmV3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jbGFzc0RpZmZlci5oYXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgICAgIGNvbnN0IGxhc3RDbGFzcyA9IHRoaXMuX2xhc3RDbGFzcztcbiAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY2xhc3NEaWZmZXIudmFsdWUgfHwge307XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVtrZXldKSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgdGhpcy5fbGFzdENsYXNzLmFkZChrZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdENsYXNzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobGFzdENsYXNzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBsYXN0Q2xhc3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9jbGFzc0RpZmZlcikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlIHx8IHt9O1xuICAgICAgICB0aGlzLl9jbGFzc0RpZmZlciA9IHRoaXMuX2xhc3RDbGFzcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==