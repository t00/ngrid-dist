/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewEncapsulation, Optional } from '@angular/core';
import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { PblNgridPluginController } from '../../ext/plugin-control';
import { EXT_API_TOKEN } from '../../ext/table-ext-api';
import { PblNgridComponent } from '../table.component';
import { StylingDiffer } from './cell-style-class/styling_differ';
/** @type {?} */
export var PBL_NGRID_ROW_TEMPLATE = "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content>" + CDK_ROW_TEMPLATE + "<ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>";
/**
 * @template T
 */
var PblNgridRowComponent = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridRowComponent, _super);
    function PblNgridRowComponent(extApi, el) {
        var _this = _super.call(this) || this;
        _this.extApi = extApi;
        _this.el = el;
        if (extApi) {
            _this.grid = extApi.table;
        }
        return _this;
    }
    Object.defineProperty(PblNgridRowComponent.prototype, "row", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { value && this.updateRow(); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridRowComponent.prototype.updateRow = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    PblNgridRowComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        if (this.grid.rowClassUpdate && this.grid.rowClassUpdateFreq === 'ngDoCheck') {
            this.updateHostClass();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PblNgridRowComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.extApi) {
            if (!this.grid) {
                throw new Error('"pbl-ngrid-row" is used outside the scope of a grid, you must provide a grid instance.');
            }
            /** @type {?} */
            var controller = PblNgridPluginController.find(this.grid);
            this.extApi = controller.extApi;
            this.updateRow();
        }
    };
    /**
     * @return {?}
     */
    PblNgridRowComponent.prototype.getRend = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var vcRef = this.extApi.cdkTable._rowOutlet.viewContainer;
        /** @type {?} */
        var len = vcRef.length - 1;
        for (var i = len; i > -1; i--) {
            /** @type {?} */
            var viewRef = (/** @type {?} */ (vcRef.get(i)));
            if (viewRef.rootNodes[0] === this.el.nativeElement) {
                this.rowRenderIndex = i;
                break;
            }
        }
    };
    /**
     * @protected
     * @return {?}
     */
    PblNgridRowComponent.prototype.updateHostClass = /**
     * @protected
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b, e_3, _c;
        if (this.context) {
            /** @type {?} */
            var el = this.el.nativeElement;
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
                var newValue = this.grid.rowClassUpdate(this.context);
                this._classDiffer.setValue(newValue);
                if (this._classDiffer.hasValueChanged()) {
                    /** @type {?} */
                    var lastClass = this._lastClass;
                    this._lastClass = new Set();
                    /** @type {?} */
                    var value = this._classDiffer.value || {};
                    try {
                        for (var _d = tslib_1.__values(Object.keys(value)), _e = _d.next(); !_e.done; _e = _d.next()) {
                            var key = _e.value;
                            if (value[key]) {
                                el.classList.add(key);
                                this._lastClass.add(key);
                            }
                            else {
                                el.classList.remove(key);
                            }
                            lastClass.delete(key);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    if (lastClass.size > 0) {
                        try {
                            for (var _f = tslib_1.__values(lastClass.values()), _g = _f.next(); !_g.done; _g = _f.next()) {
                                var key = _g.value;
                                el.classList.remove(key);
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                }
            }
            else if (this._classDiffer) {
                /** @type {?} */
                var value = this._classDiffer.value || {};
                this._classDiffer = this._lastClass = undefined;
                try {
                    for (var _h = tslib_1.__values(Object.keys(value)), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var key = _j.value;
                        el.classList.remove(key);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
    };
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
    PblNgridRowComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [EXT_API_TOKEN,] }] },
        { type: ElementRef }
    ]; };
    PblNgridRowComponent.propDecorators = {
        row: [{ type: Input }],
        grid: [{ type: Input }]
    };
    return PblNgridRowComponent;
}(CdkRow));
export { PblNgridRowComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9kaXJlY3RpdmVzL3Jvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFtQixNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUE0QixRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDL0ssT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBYyxNQUFNLG9CQUFvQixDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0seUJBQXlCLENBQUM7QUFFOUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFFeEYsTUFBTSxLQUFPLHNCQUFzQixHQUFJLCtEQUEyRCxnQkFBZ0IsK0RBQTBEOzs7O0FBRTVLO0lBY21ELGdEQUFNO0lBZXZELDhCQUF5RCxNQUErQixFQUFZLEVBQTJCO1FBQS9ILFlBQ0UsaUJBQU8sU0FJUjtRQUx3RCxZQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUFZLFFBQUUsR0FBRixFQUFFLENBQXlCO1FBRTdILElBQUksTUFBTSxFQUFFO1lBQ1YsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1NBQzFCOztJQUNILENBQUM7SUFsQkQsc0JBQWEscUNBQUc7Ozs7O1FBQWhCLFVBQWlCLEtBQVEsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7SUFvQnpELHdDQUFTOzs7SUFBVDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBRSxDQUFD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QVksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzs7b0JBRWhELEtBQWtCLElBQUEsS0FBQSxpQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO3dCQUFqQyxJQUFNLEdBQUcsV0FBQTt3QkFDWixFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUI7Ozs7Ozs7OzthQUNGO1NBQ0Y7SUFDSCxDQUFDOztnQkFsSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLElBQUksRUFBRTs7d0JBQ0osT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLE1BQU0sRUFBRSxLQUFLO3FCQUNkO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFO3FCQUN2RDtvQkFDRCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7OztnREFnQmMsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO2dCQXZDRixVQUFVOzs7c0JBMEJwRCxLQUFLO3VCQUtMLEtBQUs7O0lBOEdSLDJCQUFDO0NBQUEsQUFuSUQsQ0FjbUQsTUFBTSxHQXFIeEQ7U0FySFksb0JBQW9COzs7Ozs7SUFPL0Isb0NBQW9DOztJQUVwQyw4Q0FBdUI7O0lBQ3ZCLHVDQUEwQjs7Ozs7SUFFMUIsNENBQWtFOzs7OztJQUNsRSwwQ0FBZ0M7Ozs7O0lBRXBCLHNDQUE0RTs7Ozs7SUFBRSxrQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIEluamVjdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtSb3csIENES19ST1dfVEVNUExBVEUsIFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L3RhYmxlLWV4dC1hcGknO1xuaW1wb3J0IHsgUGJsUm93Q29udGV4dCB9IGZyb20gJy4uL2NvbnRleHQvaW5kZXgnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQgfSBmcm9tICcuLi90YWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3R5bGluZ0RpZmZlciwgU3R5bGluZ0RpZmZlck9wdGlvbnMgfSBmcm9tICcuL2NlbGwtc3R5bGUtY2xhc3Mvc3R5bGluZ19kaWZmZXInO1xuXG5leHBvcnQgY29uc3QgUEJMX05HUklEX1JPV19URU1QTEFURSAgPSBgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLnBibC1uZ3JpZC1yb3ctcHJlZml4XCI+PC9uZy1jb250ZW50PiR7Q0RLX1JPV19URU1QTEFURX08bmctY29udGVudCBzZWxlY3Q9XCIucGJsLW5ncmlkLXJvdy1zdWZmaXhcIj48L25nLWNvbnRlbnQ+YDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkLXJvd1tyb3ddJyxcbiAgdGVtcGxhdGU6IFBCTF9OR1JJRF9ST1dfVEVNUExBVEUsXG4gIGhvc3Q6IHsgLy8gdHNsaW50OmRpc2FibGUtbGluZTp1c2UtaG9zdC1wcm9wZXJ0eS1kZWNvcmF0b3JcbiAgICAnY2xhc3MnOiAncGJsLW5ncmlkLXJvdycsXG4gICAgJ3JvbGUnOiAncm93JyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBDZGtSb3csIHVzZUV4aXN0aW5nOiBQYmxOZ3JpZFJvd0NvbXBvbmVudCB9XG4gIF0sXG4gIGV4cG9ydEFzOiAncGJsTmdyaWRSb3cnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRSb3dDb21wb25lbnQ8VCA9IGFueT4gZXh0ZW5kcyBDZGtSb3cgaW1wbGVtZW50cyBPbkNoYW5nZXMsIERvQ2hlY2sge1xuXG4gIEBJbnB1dCgpIHNldCByb3codmFsdWU6IFQpIHsgdmFsdWUgJiYgdGhpcy51cGRhdGVSb3coKTsgfVxuXG4gIC8qKlxuICAgKiBPcHRpb25hbCBncmlkIGluc3RhbmNlLCByZXF1aXJlZCBvbmx5IGlmIHRoZSByb3cgaXMgZGVjbGFyZWQgb3V0c2lkZSB0aGUgc2NvcGUgb2YgdGhlIGdyaWQuXG4gICAqL1xuICBASW5wdXQoKSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPjtcblxuICByb3dSZW5kZXJJbmRleDogbnVtYmVyO1xuICBjb250ZXh0OiBQYmxSb3dDb250ZXh0PFQ+O1xuXG4gIHByaXZhdGUgX2NsYXNzRGlmZmVyOiBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+O1xuICBwcml2YXRlIF9sYXN0Q2xhc3M6IFNldDxzdHJpbmc+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoRVhUX0FQSV9UT0tFTikgcHJvdGVjdGVkIGV4dEFwaTogUGJsTmdyaWRFeHRlbnNpb25BcGk8VD4sIHByb3RlY3RlZCBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4pIHtcbiAgICBzdXBlcigpO1xuICAgIGlmIChleHRBcGkpIHtcbiAgICAgIHRoaXMuZ3JpZCA9IGV4dEFwaS50YWJsZTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVSb3coKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZXh0QXBpKSB7XG4gICAgICBpZiAoISAodGhpcy5yb3dSZW5kZXJJbmRleCA+PSAwKSApIHtcbiAgICAgICAgdGhpcy5nZXRSZW5kKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmV4dEFwaS5jb250ZXh0QXBpLnJvd0NvbnRleHQodGhpcy5yb3dSZW5kZXJJbmRleCk7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb3ctaWQnLCB0aGlzLmNvbnRleHQuZGF0YUluZGV4IGFzIGFueSk7XG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdyb3cta2V5JywgdGhpcy5jb250ZXh0LmlkZW50aXR5KTtcblxuICAgICAgaWYgKHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSAmJiB0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGVGcmVxID09PSAnaXRlbScpIHtcbiAgICAgICAgdGhpcy51cGRhdGVIb3N0Q2xhc3MoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ0RvQ2hlY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSAmJiB0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGVGcmVxID09PSAnbmdEb0NoZWNrJykge1xuICAgICAgdGhpcy51cGRhdGVIb3N0Q2xhc3MoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmV4dEFwaSkge1xuICAgICAgaWYgKCF0aGlzLmdyaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdcInBibC1uZ3JpZC1yb3dcIiBpcyB1c2VkIG91dHNpZGUgdGhlIHNjb3BlIG9mIGEgZ3JpZCwgeW91IG11c3QgcHJvdmlkZSBhIGdyaWQgaW5zdGFuY2UuJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGhpcy5ncmlkKTtcbiAgICAgIHRoaXMuZXh0QXBpID0gY29udHJvbGxlci5leHRBcGk7XG4gICAgICB0aGlzLnVwZGF0ZVJvdygpO1xuICAgIH1cbiAgfVxuXG4gIGdldFJlbmQoKTogdm9pZCB7XG4gICAgY29uc3QgdmNSZWYgPSB0aGlzLmV4dEFwaS5jZGtUYWJsZS5fcm93T3V0bGV0LnZpZXdDb250YWluZXI7XG4gICAgY29uc3QgbGVuID0gdmNSZWYubGVuZ3RoIC0gMTtcbiAgICBmb3IgKGxldCBpID0gbGVuOyBpID4gLTE7IGktLSkge1xuICAgICAgY29uc3Qgdmlld1JlZiA9IHZjUmVmLmdldChpKSBhcyBFbWJlZGRlZFZpZXdSZWY8Um93Q29udGV4dDxUPj47XG4gICAgICBpZiAodmlld1JlZi5yb290Tm9kZXNbMF0gPT09IHRoaXMuZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICB0aGlzLnJvd1JlbmRlckluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZUhvc3RDbGFzcygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb250ZXh0KSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudDtcblxuICAgICAgLy8gaWYgdGhlcmUgaXMgYW4gdXBkYXRlciwgd29yayB3aXRoIGl0XG4gICAgICAvLyBvdGhlcndpc2UsIGNsZWFyIHByZXZpb3VzIGNsYXNzZXMgdGhhdCBnb3QgYXBwbGllZCAoYXNzdW1lZCBhIGxpdmUgYmluZGluZyBjaGFuZ2Ugb2YgdGhlIHVwZGF0ZXIgZnVuY3Rpb24pXG4gICAgICAvLyB1c2VycyBzaG91bGQgYmUgYXdhcmUgdG8gdGVhciBkb3duIHRoZSB1cGRhdGVyIG9ubHkgd2hlbiB0aGV5IHdhbnQgdG8gc3RvcCB0aGlzIGZlYXR1cmUsIGlmIHRoZSBnb2FsIGlzIGp1c3QgdG8gdG9nZ2xlIG9uL29mZlxuICAgICAgLy8gaXQncyBiZXR0ZXIgdG8gc2V0IHRoZSBmcmVxdWVuY3kgdG8gYG5vbmVgIGFuZCByZXR1cm4gbm90aGluZyBmcm9tIHRoZSBmdW5jdGlvbiAocmVwbGFjZSBpdCkgc28gdGhlIGRpZmZlciBpcyBub3QgbnVrZWQuXG4gICAgICBpZiAodGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlKSB7XG4gICAgICAgIGlmICghdGhpcy5fY2xhc3NEaWZmZXIpIHtcbiAgICAgICAgICB0aGlzLl9jbGFzc0RpZmZlciA9IG5ldyBTdHlsaW5nRGlmZmVyPHsgW2tsYXNzOiBzdHJpbmddOiBib29sZWFuIH0+KFxuICAgICAgICAgICAgJ05nQ2xhc3MnLFxuICAgICAgICAgICAgU3R5bGluZ0RpZmZlck9wdGlvbnMuVHJpbVByb3BlcnRpZXMgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N1YktleXMgfCBTdHlsaW5nRGlmZmVyT3B0aW9ucy5BbGxvd1N0cmluZ1ZhbHVlIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuRm9yY2VBc01hcCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHRoaXMuX2xhc3RDbGFzcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSB0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGUodGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5fY2xhc3NEaWZmZXIuc2V0VmFsdWUobmV3VmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLl9jbGFzc0RpZmZlci5oYXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgICAgIGNvbnN0IGxhc3RDbGFzcyA9IHRoaXMuX2xhc3RDbGFzcztcbiAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5fY2xhc3NEaWZmZXIudmFsdWUgfHwge307XG5cbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZVtrZXldKSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoa2V5KTtcbiAgICAgICAgICAgICAgdGhpcy5fbGFzdENsYXNzLmFkZChrZXkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdENsYXNzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobGFzdENsYXNzLnNpemUgPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBsYXN0Q2xhc3MudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9jbGFzc0RpZmZlcikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlIHx8IHt9O1xuICAgICAgICB0aGlzLl9jbGFzc0RpZmZlciA9IHRoaXMuX2xhc3RDbGFzcyA9IHVuZGVmaW5lZDtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkpIHtcbiAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==