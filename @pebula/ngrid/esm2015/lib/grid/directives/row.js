/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2RpcmVjdGl2ZXMvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBbUIsTUFBTSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBNEIsUUFBUSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQy9LLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUF3QixNQUFNLHdCQUF3QixDQUFDO0FBRTdFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sbUNBQW1DLENBQUM7O0FBRXhGLE1BQU0sT0FBTyxzQkFBc0IsR0FBSSwyREFBMkQsZ0JBQWdCLDBEQUEwRDs7OztBQWdCNUssTUFBTSxPQUFPLG9CQUE4QixTQUFRLE1BQU07Ozs7O0lBZXZELFlBQXlELE1BQStCLEVBQVksRUFBMkI7UUFDN0gsS0FBSyxFQUFFLENBQUM7UUFEK0MsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUF5QjtRQUU3SCxJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7O0lBbEJELElBQWEsR0FBRyxDQUFDLEtBQVEsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7OztJQW9CekQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBRSxDQUFDLElBQUksQ0FB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Q0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDMUI7YUFDRjtTQUNGO0lBQ0gsQ0FBQzs7O1lBbElGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxJQUFJLEVBQUU7O29CQUNKLE9BQU8sRUFBRSxlQUFlO29CQUN4QixNQUFNLEVBQUUsS0FBSztpQkFDZDtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRTtpQkFDdkQ7Z0JBQ0QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7Ozs0Q0FnQmMsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO1lBdkNGLFVBQVU7OztrQkEwQnBELEtBQUs7bUJBS0wsS0FBSzs7Ozs7OztJQUFOLG9DQUFvQzs7SUFFcEMsOENBQXVCOztJQUN2Qix1Q0FBMEI7Ozs7O0lBRTFCLDRDQUFrRTs7Ozs7SUFDbEUsMENBQWdDOzs7OztJQUVwQixzQ0FBNEU7Ozs7O0lBQUUsa0NBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3QsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiwgU2ltcGxlQ2hhbmdlcywgT25DaGFuZ2VzLCBPcHRpb25hbCwgRG9DaGVjayB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2RrUm93LCBDREtfUk9XX1RFTVBMQVRFLCBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJy4uLy4uL2V4dC9wbHVnaW4tY29udHJvbCc7XG5pbXBvcnQgeyBFWFRfQVBJX1RPS0VOLCBQYmxOZ3JpZEV4dGVuc2lvbkFwaSB9IGZyb20gJy4uLy4uL2V4dC9ncmlkLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi9uZ3JpZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3R5bGluZ0RpZmZlciwgU3R5bGluZ0RpZmZlck9wdGlvbnMgfSBmcm9tICcuL2NlbGwtc3R5bGUtY2xhc3Mvc3R5bGluZ19kaWZmZXInO1xuXG5leHBvcnQgY29uc3QgUEJMX05HUklEX1JPV19URU1QTEFURSAgPSBgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLnBibC1uZ3JpZC1yb3ctcHJlZml4XCI+PC9uZy1jb250ZW50PiR7Q0RLX1JPV19URU1QTEFURX08bmctY29udGVudCBzZWxlY3Q9XCIucGJsLW5ncmlkLXJvdy1zdWZmaXhcIj48L25nLWNvbnRlbnQ+YDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLXJvd1tyb3ddJyxcbiAgdGVtcGxhdGU6IFBCTF9OR1JJRF9ST1dfVEVNUExBVEUsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd0NvbXBvbmVudCB9XG4gIF0sXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3cnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dDb21wb25lbnQ8VCA9IGFueT4gZXh0ZW5kcyBDZGtSb3cgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2sge1xuXG4gIEBJbnB1dCgpIHNldCByb3codmFsdWU6IFQpIHsgdmFsdWUgJiYgdGhpcy51cGRhdGVSb3coKTsgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBncmlkIGluc3RhbmNlLCByZXF1aXJlZCBvbmx5IGlmIHRoZSByb3cgaXMgZGVjbGFyZWQgb3V0c2lkZSB0aGUgc2NvcGUgb2YgdGhlIGdyaWQuXG4gICAqL1xuICBASW5wdXQoKSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICByb3dSZW5kZXJJbmRleDogbnVtYmVyO1xuICBjb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+O1xuXG4gIHByaXZhdGUgX2NsYXNzRGlmZmVyOiBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+O1xuICBwcml2YXRlIF9sYXN0Q2xhc3M6IFNldDxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHJvdGVjdGVkIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4sIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChleHRBcGkpIHtcbiAgICAgIHRoaXMuZ3JpZCA9IGV4dEFwaS5ncmlkO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5leHRBcGkpIHtcbiAgICAgIGlmICghICh0aGlzLnJvd1JlbmRlckluZGV4ID49IDApICkge1xuICAgICAgICB0aGlzLmdldFJlbmQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29udGV4dCA9IHRoaXMuZXh0QXBpLmNvbnRleHRBcGkucm93Q29udGV4dCh0aGlzLnJvd1JlbmRlckluZGV4KTtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3Jvdy1pZCcsIHRoaXMuY29udGV4dC5kYXRhSW5kZXggYXMgYW55KTtcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3Jvdy1rZXknLCB0aGlzLmNvbnRleHQuaWRlbnRpdHkpO1xuXG4gICAgICBpZiAodGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlICYmIHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZUZyZXEgPT09ICdpdGVtJykge1xuICAgICAgICB0aGlzLnVwZGF0ZUhvc3RDbGFzcygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlICYmIHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZUZyZXEgPT09ICduZ0RvQ2hlY2snKSB7XG4gICAgICB0aGlzLnVwZGF0ZUhvc3RDbGFzcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZXh0QXBpKSB7XG4gICAgICBpZiAoIXRoaXMuZ3JpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wicGJsLW5ncmlkLXJvd1wiIGlzIHVzZWQgb3V0c2lkZSB0aGUgc2NvcGUgb2YgYSBncmlkLCB5b3UgbXVzdCBwcm92aWRlIGEgZ3JpZCBpbnN0YW5jZS4nKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0aGlzLmdyaWQpO1xuICAgICAgdGhpcy5leHRBcGkgPSBjb250cm9sbGVyLmV4dEFwaTtcbiAgICAgIHRoaXMudXBkYXRlUm93KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVuZCgpOiB2b2lkIHtcbiAgICBjb25zdCB2Y1JlZiA9IHRoaXMuZXh0QXBpLmNka1RhYmxlLl9yb3dPdXRsZXQudmlld0NvbnRhaW5lcjtcbiAgICBjb25zdCBsZW4gPSB2Y1JlZi5sZW5ndGggLSAxO1xuICAgIGZvciAobGV0IGkgPSBsZW47IGkgPiAtMTsgaS0tKSB7XG4gICAgICBjb25zdCB2aWV3UmVmID0gdmNSZWYuZ2V0KGkpIGFzIEVtYmVkZGVkVmlld1JlZjxSb3dDb250ZXh0PFQ+PjtcbiAgICAgIGlmICh2aWV3UmVmLnJvb3ROb2Rlc1swXSA9PT0gdGhpcy5lbC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMucm93UmVuZGVySW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlSG9zdENsYXNzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAvLyBpZiB0aGVyZSBpcyBhbiB1cGRhdGVyLCB3b3JrIHdpdGggaXRcbiAgICAgIC8vIG90aGVyd2lzZSwgY2xlYXIgcHJldmlvdXMgY2xhc3NlcyB0aGF0IGdvdCBhcHBsaWVkIChhc3N1bWVkIGEgbGl2ZSBiaW5kaW5nIGNoYW5nZSBvZiB0aGUgdXBkYXRlciBmdW5jdGlvbilcbiAgICAgIC8vIHVzZXJzIHNob3VsZCBiZSBhd2FyZSB0byB0ZWFyIGRvd24gdGhlIHVwZGF0ZXIgb25seSB3aGVuIHRoZXkgd2FudCB0byBzdG9wIHRoaXMgZmVhdHVyZSwgaWYgdGhlIGdvYWwgaXMganVzdCB0byB0b2dnbGUgb24vb2ZmXG4gICAgICAvLyBpdCdzIGJldHRlciB0byBzZXQgdGhlIGZyZXF1ZW5jeSB0byBgbm9uZWAgYW5kIHJldHVybiBub3RoaW5nIGZyb20gdGhlIGZ1bmN0aW9uIChyZXBsYWNlIGl0KSBzbyB0aGUgZGlmZmVyIGlzIG5vdCBudWtlZC5cbiAgICAgIGlmICh0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jbGFzc0RpZmZlcikge1xuICAgICAgICAgIHRoaXMuX2NsYXNzRGlmZmVyID0gbmV3IFN0eWxpbmdEaWZmZXI8eyBba2xhc3M6IHN0cmluZ106IGJvb2xlYW4gfT4oXG4gICAgICAgICAgICAnTmdDbGFzcycsXG4gICAgICAgICAgICBTdHlsaW5nRGlmZmVyT3B0aW9ucy5UcmltUHJvcGVydGllcyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3ViS2V5cyB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkFsbG93U3RyaW5nVmFsdWUgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5Gb3JjZUFzTWFwLFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSh0aGlzLmNvbnRleHQpO1xuICAgICAgICB0aGlzLl9jbGFzc0RpZmZlci5zZXRWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuX2NsYXNzRGlmZmVyLmhhc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICAgICAgY29uc3QgbGFzdENsYXNzID0gdGhpcy5fbGFzdENsYXNzO1xuICAgICAgICAgIHRoaXMuX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9jbGFzc0RpZmZlci52YWx1ZSB8fCB7fTtcblxuICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlW2tleV0pIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChrZXkpO1xuICAgICAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MuYWRkKGtleSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0Q2xhc3MuZGVsZXRlKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsYXN0Q2xhc3Muc2l6ZSA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IG9mIGxhc3RDbGFzcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2NsYXNzRGlmZmVyKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY2xhc3NEaWZmZXIudmFsdWUgfHwge307XG4gICAgICAgIHRoaXMuX2NsYXNzRGlmZmVyID0gdGhpcy5fbGFzdENsYXNzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSkge1xuICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19