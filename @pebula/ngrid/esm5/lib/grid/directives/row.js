/**
 * @fileoverview added by tsickle
 * Generated from: lib/grid/directives/row.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __extends, __values } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, ViewEncapsulation, Optional } from '@angular/core';
import { CdkRow, CDK_ROW_TEMPLATE } from '@angular/cdk/table';
import { PblNgridPluginController } from '../../ext/plugin-control';
import { EXT_API_TOKEN } from '../../ext/grid-ext-api';
import { PblNgridComponent } from '../ngrid.component';
import { StylingDiffer } from './cell-style-class/styling_differ';
/** @type {?} */
export var PBL_NGRID_ROW_TEMPLATE = "<ng-content select=\".pbl-ngrid-row-prefix\"></ng-content>" + CDK_ROW_TEMPLATE + "<ng-content select=\".pbl-ngrid-row-suffix\"></ng-content>";
/**
 * @template T
 */
var PblNgridRowComponent = /** @class */ (function (_super) {
    __extends(PblNgridRowComponent, _super);
    function PblNgridRowComponent(extApi, el) {
        var _this = _super.call(this) || this;
        _this.extApi = extApi;
        _this.el = el;
        if (extApi) {
            _this.grid = extApi.grid;
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
                        for (var _d = __values(Object.keys(value)), _e = _d.next(); !_e.done; _e = _d.next()) {
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
                            for (var _f = __values(lastClass.values()), _g = _f.next(); !_g.done; _g = _f.next()) {
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
                    for (var _h = __values(Object.keys(value)), _j = _h.next(); !_j.done; _j = _h.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC8iLCJzb3VyY2VzIjpbImxpYi9ncmlkL2RpcmVjdGl2ZXMvcm93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFtQixNQUFNLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUE0QixRQUFRLEVBQVcsTUFBTSxlQUFlLENBQUM7QUFDL0ssT0FBTyxFQUFFLE1BQU0sRUFBRSxnQkFBZ0IsRUFBYyxNQUFNLG9CQUFvQixDQUFDO0FBQzFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQXdCLE1BQU0sd0JBQXdCLENBQUM7QUFFN0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBd0IsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFFeEYsTUFBTSxLQUFPLHNCQUFzQixHQUFJLCtEQUEyRCxnQkFBZ0IsK0RBQTBEOzs7O0FBRTVLO0lBY21ELHdDQUFNO0lBZXZELDhCQUF5RCxNQUErQixFQUFZLEVBQTJCO1FBQS9ILFlBQ0UsaUJBQU8sU0FJUjtRQUx3RCxZQUFNLEdBQU4sTUFBTSxDQUF5QjtRQUFZLFFBQUUsR0FBRixFQUFFLENBQXlCO1FBRTdILElBQUksTUFBTSxFQUFFO1lBQ1YsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1NBQ3pCOztJQUNILENBQUM7SUFsQkQsc0JBQWEscUNBQUc7Ozs7O1FBQWhCLFVBQWlCLEtBQVEsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7Ozs7SUFvQnpELHdDQUFTOzs7SUFBVDtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBRSxDQUFD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LEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7O29CQUVoRCxLQUFrQixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO3dCQUFqQyxJQUFNLEdBQUcsV0FBQTt3QkFDWixFQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFDMUI7Ozs7Ozs7OzthQUNGO1NBQ0Y7SUFDSCxDQUFDOztnQkFsSUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLElBQUksRUFBRTs7d0JBQ0osT0FBTyxFQUFFLGVBQWU7d0JBQ3hCLE1BQU0sRUFBRSxLQUFLO3FCQUNkO29CQUNELFNBQVMsRUFBRTt3QkFDVCxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFFO3FCQUN2RDtvQkFDRCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN0Qzs7OztnREFnQmMsUUFBUSxZQUFJLE1BQU0sU0FBQyxhQUFhO2dCQXZDRixVQUFVOzs7c0JBMEJwRCxLQUFLO3VCQUtMLEtBQUs7O0lBOEdSLDJCQUFDO0NBQUEsQUFuSUQsQ0FjbUQsTUFBTSxHQXFIeEQ7U0FySFksb0JBQW9COzs7Ozs7SUFPL0Isb0NBQW9DOztJQUVwQyw4Q0FBdUI7O0lBQ3ZCLHVDQUEwQjs7Ozs7SUFFMUIsNENBQWtFOzs7OztJQUNsRSwwQ0FBZ0M7Ozs7O0lBRXBCLHNDQUE0RTs7Ozs7SUFBRSxrQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFbWJlZGRlZFZpZXdSZWYsIEluamVjdCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBTaW1wbGVDaGFuZ2VzLCBPbkNoYW5nZXMsIE9wdGlvbmFsLCBEb0NoZWNrIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDZGtSb3csIENES19ST1dfVEVNUExBVEUsIFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnLi4vLi4vZXh0L3BsdWdpbi1jb250cm9sJztcbmltcG9ydCB7IEVYVF9BUElfVE9LRU4sIFBibE5ncmlkRXh0ZW5zaW9uQXBpIH0gZnJvbSAnLi4vLi4vZXh0L2dyaWQtZXh0LWFwaSc7XG5pbXBvcnQgeyBQYmxSb3dDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dC9pbmRleCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCB9IGZyb20gJy4uL25ncmlkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdHlsaW5nRGlmZmVyLCBTdHlsaW5nRGlmZmVyT3B0aW9ucyB9IGZyb20gJy4vY2VsbC1zdHlsZS1jbGFzcy9zdHlsaW5nX2RpZmZlcic7XG5cbmV4cG9ydCBjb25zdCBQQkxfTkdSSURfUk9XX1RFTVBMQVRFICA9IGA8bmctY29udGVudCBzZWxlY3Q9XCIucGJsLW5ncmlkLXJvdy1wcmVmaXhcIj48L25nLWNvbnRlbnQ+JHtDREtfUk9XX1RFTVBMQVRFfTxuZy1jb250ZW50IHNlbGVjdD1cIi5wYmwtbmdyaWQtcm93LXN1ZmZpeFwiPjwvbmctY29udGVudD5gO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWQtcm93W3Jvd10nLFxuICB0ZW1wbGF0ZTogUEJMX05HUklEX1JPV19URU1QTEFURSxcbiAgaG9zdDogeyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnVzZS1ob3N0LXByb3BlcnR5LWRlY29yYXRvclxuICAgICdjbGFzcyc6ICdwYmwtbmdyaWQtcm93JyxcbiAgICAncm9sZSc6ICdyb3cnLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICB7IHByb3ZpZGU6IENka1JvdywgdXNlRXhpc3Rpbmc6IFBibE5ncmlkUm93Q29tcG9uZW50IH1cbiAgXSxcbiAgZXhwb3J0QXM6ICdwYmxOZ3JpZFJvdycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFJvd0NvbXBvbmVudDxUID0gYW55PiBleHRlbmRzIENka1JvdyBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgRG9DaGVjayB7XG5cbiAgQElucHV0KCkgc2V0IHJvdyh2YWx1ZTogVCkgeyB2YWx1ZSAmJiB0aGlzLnVwZGF0ZVJvdygpOyB9XG5cbiAgLyoqXG4gICAqIE9wdGlvbmFsIGdyaWQgaW5zdGFuY2UsIHJlcXVpcmVkIG9ubHkgaWYgdGhlIHJvdyBpcyBkZWNsYXJlZCBvdXRzaWRlIHRoZSBzY29wZSBvZiB0aGUgZ3JpZC5cbiAgICovXG4gIEBJbnB1dCgpIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+O1xuXG4gIHJvd1JlbmRlckluZGV4OiBudW1iZXI7XG4gIGNvbnRleHQ6IFBibFJvd0NvbnRleHQ8VD47XG5cbiAgcHJpdmF0ZSBfY2xhc3NEaWZmZXI6IFN0eWxpbmdEaWZmZXI8eyBba2xhc3M6IHN0cmluZ106IGJvb2xlYW4gfT47XG4gIHByaXZhdGUgX2xhc3RDbGFzczogU2V0PHN0cmluZz47XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChFWFRfQVBJX1RPS0VOKSBwcm90ZWN0ZWQgZXh0QXBpOiBQYmxOZ3JpZEV4dGVuc2lvbkFwaTxUPiwgcHJvdGVjdGVkIGVsOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKGV4dEFwaSkge1xuICAgICAgdGhpcy5ncmlkID0gZXh0QXBpLmdyaWQ7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUm93KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmV4dEFwaSkge1xuICAgICAgaWYgKCEgKHRoaXMucm93UmVuZGVySW5kZXggPj0gMCkgKSB7XG4gICAgICAgIHRoaXMuZ2V0UmVuZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb250ZXh0ID0gdGhpcy5leHRBcGkuY29udGV4dEFwaS5yb3dDb250ZXh0KHRoaXMucm93UmVuZGVySW5kZXgpO1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgncm93LWlkJywgdGhpcy5jb250ZXh0LmRhdGFJbmRleCBhcyBhbnkpO1xuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgncm93LWtleScsIHRoaXMuY29udGV4dC5pZGVudGl0eSk7XG5cbiAgICAgIGlmICh0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGUgJiYgdGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlRnJlcSA9PT0gJ2l0ZW0nKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSG9zdENsYXNzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdEb0NoZWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdyaWQucm93Q2xhc3NVcGRhdGUgJiYgdGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlRnJlcSA9PT0gJ25nRG9DaGVjaycpIHtcbiAgICAgIHRoaXMudXBkYXRlSG9zdENsYXNzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5leHRBcGkpIHtcbiAgICAgIGlmICghdGhpcy5ncmlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignXCJwYmwtbmdyaWQtcm93XCIgaXMgdXNlZCBvdXRzaWRlIHRoZSBzY29wZSBvZiBhIGdyaWQsIHlvdSBtdXN0IHByb3ZpZGUgYSBncmlkIGluc3RhbmNlLicpO1xuICAgICAgfVxuICAgICAgY29uc3QgY29udHJvbGxlciA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRoaXMuZ3JpZCk7XG4gICAgICB0aGlzLmV4dEFwaSA9IGNvbnRyb2xsZXIuZXh0QXBpO1xuICAgICAgdGhpcy51cGRhdGVSb3coKTtcbiAgICB9XG4gIH1cblxuICBnZXRSZW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IHZjUmVmID0gdGhpcy5leHRBcGkuY2RrVGFibGUuX3Jvd091dGxldC52aWV3Q29udGFpbmVyO1xuICAgIGNvbnN0IGxlbiA9IHZjUmVmLmxlbmd0aCAtIDE7XG4gICAgZm9yIChsZXQgaSA9IGxlbjsgaSA+IC0xOyBpLS0pIHtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSB2Y1JlZi5nZXQoaSkgYXMgRW1iZWRkZWRWaWV3UmVmPFJvd0NvbnRleHQ8VD4+O1xuICAgICAgaWYgKHZpZXdSZWYucm9vdE5vZGVzWzBdID09PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5yb3dSZW5kZXJJbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVIb3N0Q2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29udGV4dCkge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIC8vIGlmIHRoZXJlIGlzIGFuIHVwZGF0ZXIsIHdvcmsgd2l0aCBpdFxuICAgICAgLy8gb3RoZXJ3aXNlLCBjbGVhciBwcmV2aW91cyBjbGFzc2VzIHRoYXQgZ290IGFwcGxpZWQgKGFzc3VtZWQgYSBsaXZlIGJpbmRpbmcgY2hhbmdlIG9mIHRoZSB1cGRhdGVyIGZ1bmN0aW9uKVxuICAgICAgLy8gdXNlcnMgc2hvdWxkIGJlIGF3YXJlIHRvIHRlYXIgZG93biB0aGUgdXBkYXRlciBvbmx5IHdoZW4gdGhleSB3YW50IHRvIHN0b3AgdGhpcyBmZWF0dXJlLCBpZiB0aGUgZ29hbCBpcyBqdXN0IHRvIHRvZ2dsZSBvbi9vZmZcbiAgICAgIC8vIGl0J3MgYmV0dGVyIHRvIHNldCB0aGUgZnJlcXVlbmN5IHRvIGBub25lYCBhbmQgcmV0dXJuIG5vdGhpbmcgZnJvbSB0aGUgZnVuY3Rpb24gKHJlcGxhY2UgaXQpIHNvIHRoZSBkaWZmZXIgaXMgbm90IG51a2VkLlxuICAgICAgaWYgKHRoaXMuZ3JpZC5yb3dDbGFzc1VwZGF0ZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2NsYXNzRGlmZmVyKSB7XG4gICAgICAgICAgdGhpcy5fY2xhc3NEaWZmZXIgPSBuZXcgU3R5bGluZ0RpZmZlcjx7IFtrbGFzczogc3RyaW5nXTogYm9vbGVhbiB9PihcbiAgICAgICAgICAgICdOZ0NsYXNzJyxcbiAgICAgICAgICAgIFN0eWxpbmdEaWZmZXJPcHRpb25zLlRyaW1Qcm9wZXJ0aWVzIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdWJLZXlzIHwgU3R5bGluZ0RpZmZlck9wdGlvbnMuQWxsb3dTdHJpbmdWYWx1ZSB8IFN0eWxpbmdEaWZmZXJPcHRpb25zLkZvcmNlQXNNYXAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLl9sYXN0Q2xhc3MgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gdGhpcy5ncmlkLnJvd0NsYXNzVXBkYXRlKHRoaXMuY29udGV4dCk7XG4gICAgICAgIHRoaXMuX2NsYXNzRGlmZmVyLnNldFZhbHVlKG5ld1ZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5fY2xhc3NEaWZmZXIuaGFzVmFsdWVDaGFuZ2VkKCkpIHtcbiAgICAgICAgICBjb25zdCBsYXN0Q2xhc3MgPSB0aGlzLl9sYXN0Q2xhc3M7XG4gICAgICAgICAgdGhpcy5fbGFzdENsYXNzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2NsYXNzRGlmZmVyLnZhbHVlIHx8IHt9O1xuXG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVba2V5XSkge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGtleSk7XG4gICAgICAgICAgICAgIHRoaXMuX2xhc3RDbGFzcy5hZGQoa2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RDbGFzcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxhc3RDbGFzcy5zaXplID4gMCkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgbGFzdENsYXNzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2xhc3NEaWZmZXIpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLl9jbGFzc0RpZmZlci52YWx1ZSB8fCB7fTtcbiAgICAgICAgdGhpcy5fY2xhc3NEaWZmZXIgPSB0aGlzLl9sYXN0Q2xhc3MgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModmFsdWUpKSB7XG4gICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=