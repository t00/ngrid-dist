/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewEncapsulation, Optional } from '@angular/core';
import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { PblNgridPluginController } from '../../ext/plugin-control';
import { EXT_API_TOKEN } from '../../ext/table-ext-api';
import { PblNgridComponent } from '../table.component';
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
            this.grid = extApi.table;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9kaXJlY3RpdmVzL3Jvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQW1CLE1BQU0sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQTRCLFFBQVEsRUFBVyxNQUFNLGVBQWUsQ0FBQztBQUMvSyxPQUFPLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDMUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLG1DQUFtQyxDQUFDOztBQUV4RixNQUFNLE9BQU8sc0JBQXNCLEdBQUksMkRBQTJELGdCQUFnQiwwREFBMEQ7Ozs7QUFnQjVLLE1BQU0sT0FBTyxvQkFBOEIsU0FBUSxNQUFNOzs7OztJQWV2RCxZQUF5RCxNQUErQixFQUFZLEVBQTJCO1FBQzdILEtBQUssRUFBRSxDQUFDO1FBRCtDLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBQVksT0FBRSxHQUFGLEVBQUUsQ0FBeUI7UUFFN0gsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDMUI7SUFDSCxDQUFDOzs7OztJQWxCRCxJQUFhLEdBQUcsQ0FBQyxLQUFRLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Ozs7SUFvQnpELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUUsQ0FBQyxJQUFJLENB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LENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzFCO2FBQ0Y7U0FDRjtJQUNILENBQUM7OztZQWxJRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsSUFBSSxFQUFFOztvQkFDSixPQUFPLEVBQUUsZUFBZTtvQkFDeEIsTUFBTSxFQUFFLEtBQUs7aUJBQ2Q7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUU7aUJBQ3ZEO2dCQUNELFFBQVEsRUFBRSxhQUFhO2dCQUN2QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7Ozs7NENBZ0JjLFFBQVEsWUFBSSxNQUFNLFNBQUMsYUFBYTtZQXZDRixVQUFVOzs7a0JBMEJwRCxLQUFLO21CQUtMLEtBQUs7Ozs7Ozs7SUFBTixvQ0FBb0M7O0lBRXBDLDhDQUF1Qjs7SUFDdkIsdUNBQTBCOzs7OztJQUUxQiw0Q0FBa0U7Ozs7O0lBQ2xFLDBDQUFnQzs7Ozs7SUFFcEIsc0NBQTRFOzs7OztJQUFFLGtDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEVtYmVkZGVkVmlld1JlZiwgSW5qZWN0LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24sIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgT3B0aW9uYWwsIERvQ2hlY2sgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENka1JvdywgQ0RLX1JPV19URU1QTEFURSwgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIgfSBmcm9tICcuLi8uLi9leHQvcGx1Z2luLWNvbnRyb2wnO1xuaW1wb3J0IHsgRVhUX0FQSV9UT0tFTiwgUGJsTmdyaWRFeHRlbnNpb25BcGkgfSBmcm9tICcuLi8uLi9leHQvdGFibGUtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHlsaW5nRGlmZmVyLCBTdHlsaW5nRGlmZmVyT3B0aW9ucyB9IGZyb20gJy4vY2VsbC1zdHlsZS1jbGFzcy9zdHlsaW5nX2RpZmZlcic7XG5cbmV4cG9ydCBjb25zdCBQQkxfTkdSSURfUk9XX1RFTVBMQVRFICA9IGA8bmctY29udGVudCBzZWxlY3Q9XCIucGJsLW5ncmlkLXJvdy1wcmVmaXhcIj48L25nLWNvbnRlbnQ+JHtDREtfUk9XX1RFTVBMQVRFfTxuZy1jb250ZW50IHNlbGVjdD1cIi5wYmwtbmdyaWQtcm93LXN1ZmZpeFwiPjwvbmctY29udGVudD5gO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtcm93W3Jvd10nLFxuICB0ZW1wbGF0ZTogUEJMX05HUklEX1JPV19URU1QTEFURSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtcm93JyxcbiAgICAncm9sZSc6ICdyb3cnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka1JvdywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93Q29tcG9uZW50IH1cbiAgXSxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZFJvdycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJvd0NvbXBvbmVudDxUID0gYW55PiBleHRlbmRzIENka1JvdyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRG9DaGVjayB7XG5cbiAgQElucHV0KCkgc2V0IHJvdyh2YWx1ZTogVCkgeyB2YWx1ZSAmJiB0aGlzLnVwZGF0ZVJvdygpOyB9XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGdyaWQgaW5zdGFuY2UsIHJlcXVpcmVkIG9ubHkgaWYgdGhlIHJvdyBpcyBkZWNsYXJlZCBvdXRzaWRlIHRoZSBzY29wZSBvZiB0aGUgZ3JpZC5cbiAgICovXG4gIEBJbnB1dCgpIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIHJvd1JlbmRlckluZGV4OiBudW1iZXI7XG4gIGNvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD47XG5cbiAgcHJpdmF0ZSBfY2xhc3NEaWZmZXI6IFN0eWxpbmdEaWZmZXI8eyBba2xhc3M6IHN0cmluZ106IGJvb2xlYW4gfT47XG4gIHByaXZhdGUgX2xhc3RDbGFzczogU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChFWFRfQVBJX1RPS0VOKSBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPiwgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKGV4dEFwaSkge1xuICAgICAgdGhpcy5ncmlkID0gZXh0QXBpLnRhYmxlO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5leHRBcGkpIHtcbiAgICAgIGlmICghICh0aGlzLnJvd1JlbmRlckluZGV4ID49IDApICkge1xuICAgICAgICB0aGlzLmdldFJlbmQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZXh0QXBpLmNvbnRleHRBcGkucm93Q29udGV4dCh0aGlzLnJvd1JlbmRlckluZGV4KTtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3Jvdy1pZCcsIHRoaXMuY29udGV4dC5kYXRhSW5kZXggYXMgYW55KTtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3Jvdy1rZXknLCB0aGlzLmNvbnRleHQuaWRlbnRpdHkpO1xuXG4gICAgICBpZiAodGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlICYmIHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZUZyZXEgPT09ICdpdGVtJykge1xuICAgICAgICB0aGlzLnVwZGF0ZUhvc3RDbGFzcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlICYmIHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZUZyZXEgPT09ICduZ0RvQ2hlY2snKSB7XG4gICAgICB0aGlzLnVwZGF0ZUhvc3RDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXh0QXBpKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wicGJsLW5ncmlkLXJvd1wiIGlzIHVzZWQgb3V0c2lkZSB0aGUgc2NvcGUgb2YgYSBncmlkLCB5b3UgbXVzdCBwcm92aWRlIGEgZ3JpZCBpbnN0YW5jZS4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmdyaWQpO1xuICAgICAgdGhpcy5leHRBcGkgPSBjb250cm9sbGVyLmV4dEFwaTtcbiAgICAgIHRoaXMudXBkYXRlUm93KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVuZCgpOiB2b2lkIHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZXh0QXBpLmNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICBjb25zdCBsZW4gPSB2Y1JlZi5sZW5ndGggLSAxO1xuICAgIGZvciAobGV0IGkgPSBsZW47IGkgPiAtMTsgaS0tKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdmNSZWYuZ2V0KGkpIGFzIEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PjtcbiAgICAgIGlmICh2aWV3UmVmLnJvb3ROb2Rlc1swXSA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucm93UmVuZGVySW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlSG9zdENsYXNzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBhbiB1cGRhdGVyLCB3b3JrIHdpdGggaXRcbiAgICAgIC8vIG90aGVyd2lzZSwgY2xlYXIgcHJldmlvdXMgY2xhc3NlcyB0aGF0IGdvdCBhcHBsaWVkIChhc3N1bWVkIGEgbGl2ZSBiaW5kaW5nIGNoYW5nZSBvZiB0aGUgdXBkYXRlciBmdW5jdGlvbilcbiAgICAgIC8vIHVzZXJzIHNob3VsZCBiZSBhd2FyZSB0byB0ZWFyIGRvd24gdGhlIHVwZGF0ZXIgb25seSB3aGVuIHRoZXkgd2FudCB0byBzdG9wIHRoaXMgZmVhdHVyZSwgaWYgdGhlIGdvYWwgaXMganVzdCB0byB0b2dnbGUgb24vb2ZmXG4gICAgICAvLyBpdCdzIGJldHRlciB0byBzZXQgdGhlIGZyZXF1ZW5jeSB0byBgbm9uZWAgYW5kIHJldHVybiBub3RoaW5nIGZyb20gdGhlIGZ1bmN0aW9uIChyZXBsYWNlIGl0KSBzbyB0aGUgZGlmZmVyIGlzIG5vdCBudWtlZC5cbiAgICAgIGlmICh0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jbGFzc0RpZmZlcikge1xuICAgICAgICAgIHRoaXMuX2NsYXNzRGlmZmVyID0gbmV3IFN0eWxpbmdEaWZmZXI8eyBba2xhc3M6IHN0cmluZ106IGJvb2xlYW4gfT4oXG4gICAgICAgICAgICAnTmdDbGFzcycsXG4gICAgICAgICAgICBTdHlsaW5nRGlmZmVyT3B0aW9ucy5UcmltUHJvcGVydGllcyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3ViS2V5cyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3RyaW5nVmFsdWUgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5Gb3JjZUFzTWFwLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLl9jbGFzc0RpZmZlci5zZXRWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NsYXNzRGlmZmVyLmhhc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICAgICAgY29uc3QgbGFzdENsYXNzID0gdGhpcy5fbGFzdENsYXNzO1xuICAgICAgICAgIHRoaXMuX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9jbGFzc0RpZmZlci52YWx1ZSB8fCB7fTtcblxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChrZXkpO1xuICAgICAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MuYWRkKGtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0Q2xhc3MuZGVsZXRlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsYXN0Q2xhc3Muc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxhc3RDbGFzcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2NsYXNzRGlmZmVyKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY2xhc3NEaWZmZXIudmFsdWUgfHwge307XG4gICAgICAgIHRoaXMuX2NsYXNzRGlmZmVyID0gdGhpcy5fbGFzdENsYXNzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19