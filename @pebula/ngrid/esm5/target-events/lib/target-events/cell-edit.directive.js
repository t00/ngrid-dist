/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, Injector } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
/**
 * @template T
 */
var PblNgridCellEditDirective = /** @class */ (function () {
    function PblNgridCellEditDirective(table, injector, pluginCtrl) {
        var _this = this;
        this._click = false;
        this._dblClick = false;
        /** @type {?} */
        var subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onInit') {
                subscription.unsubscribe();
                subscription = undefined;
                // Depends on target-events plugin
                // if it's not set, create it.
                _this.targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
                _this.update();
            }
        }));
    }
    Object.defineProperty(PblNgridCellEditDirective.prototype, "cellEditClick", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (this._click !== value) {
                this._click = value;
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PblNgridCellEditDirective.prototype, "cellEditDblClick", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            value = coerceBooleanProperty(value);
            if (this._dblClick !== value) {
                this._dblClick = value;
                this.update();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    PblNgridCellEditDirective.prototype.update = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.targetEventsPlugin) {
            UnRx.kill(this, this.targetEventsPlugin);
            if (this._click) {
                this.targetEventsPlugin.cellClick
                    .pipe(UnRx(this, this.targetEventsPlugin))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.type === 'data' && event.column.editable) {
                        event.context.startEdit(true);
                    }
                }));
            }
            if (this._dblClick) {
                this.targetEventsPlugin.cellDblClick
                    .pipe(UnRx(this, this.targetEventsPlugin))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    if (event.type === 'data' && event.column.editable) {
                        event.context.startEdit(true);
                    }
                }));
            }
        }
    };
    PblNgridCellEditDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: 'pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]',
                },] }
    ];
    /** @nocollapse */
    PblNgridCellEditDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridCellEditDirective.propDecorators = {
        cellEditClick: [{ type: Input }],
        cellEditDblClick: [{ type: Input }]
    };
    /**
     * @template T
     */
    PblNgridCellEditDirective = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridCellEditDirective);
    return PblNgridCellEditDirective;
}());
export { PblNgridCellEditDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditDirective.prototype._click;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditDirective.prototype._dblClick;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellEditDirective.prototype.targetEventsPlugin;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1lZGl0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2NlbGwtZWRpdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0lBNEIxRSxtQ0FBWSxLQUE2QixFQUFFLFFBQWtCLEVBQUUsVUFBb0M7UUFBbkcsaUJBYUM7UUFqQk8sV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGNBQVMsR0FBRyxLQUFLLENBQUM7O1lBS3BCLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDbkQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixZQUFZLEdBQUcsU0FBUyxDQUFDO2dCQUV6QixrQ0FBa0M7Z0JBQ2xDLDhCQUE4QjtnQkFDOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUcsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBaENELHNCQUFhLG9EQUFhOzs7OztRQUExQixVQUEyQixLQUFjO1lBQ3ZDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDOzs7T0FBQTtJQUNELHNCQUFhLHVEQUFnQjs7Ozs7UUFBN0IsVUFBOEIsS0FBYztZQUMxQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBcUJPLDBDQUFNOzs7O0lBQWQ7UUFDRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7cUJBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUN6QyxTQUFTOzs7O2dCQUFFLFVBQUEsS0FBSztvQkFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO3dCQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDL0I7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDTjtZQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVk7cUJBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUN6QyxTQUFTOzs7O2dCQUFFLFVBQUEsS0FBSztvQkFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO3dCQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDL0I7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDTjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBL0RGLFNBQVMsU0FBQzs7b0JBRVQsUUFBUSxFQUFFLHVEQUF1RDtpQkFDbEU7Ozs7Z0JBTlEsaUJBQWlCO2dCQUpDLFFBQVE7Z0JBSVAsd0JBQXdCOzs7Z0NBU2pELEtBQUs7bUNBT0wsS0FBSzs7Ozs7SUFSSyx5QkFBeUI7UUFEckMsSUFBSSxFQUFFO2lEQXFCYyxpQkFBaUIsRUFBaUIsUUFBUSxFQUFjLHdCQUF3QjtPQXBCeEYseUJBQXlCLENBMkRyQztJQUFELGdDQUFDO0NBQUEsSUFBQTtTQTNEWSx5QkFBeUI7Ozs7OztJQWdCcEMsMkNBQXVCOzs7OztJQUN2Qiw4Q0FBMEI7Ozs7O0lBQzFCLHVEQUEwRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZFRhcmdldEV2ZW50c1BsdWdpbiB9IGZyb20gJy4vdGFyZ2V0LWV2ZW50cy1wbHVnaW4nO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtjZWxsRWRpdENsaWNrXSwgcGJsLW5ncmlkW2NlbGxFZGl0RGJsQ2xpY2tdJyxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsRWRpdERpcmVjdGl2ZTxUPiB7XG4gIEBJbnB1dCgpIHNldCBjZWxsRWRpdENsaWNrKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdmFsdWUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmICh0aGlzLl9jbGljayAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2NsaWNrID0gdmFsdWU7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKSBzZXQgY2VsbEVkaXREYmxDbGljayh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fZGJsQ2xpY2sgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9kYmxDbGljayA9IHZhbHVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbGljayA9IGZhbHNlO1xuICBwcml2YXRlIF9kYmxDbGljayA9IGZhbHNlO1xuICBwcml2YXRlIHRhcmdldEV2ZW50c1BsdWdpbjogUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW48VD47XG5cbiAgY29uc3RydWN0b3IodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG5cbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgICAgIC8vIGlmIGl0J3Mgbm90IHNldCwgY3JlYXRlIGl0LlxuICAgICAgICB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbiA9IHBsdWdpbkN0cmwuZ2V0UGx1Z2luKCd0YXJnZXRFdmVudHMnKSB8fCBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YXJnZXRFdmVudHNQbHVnaW4pIHtcbiAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbik7XG4gICAgICBpZiAodGhpcy5fY2xpY2spIHtcbiAgICAgICAgdGhpcy50YXJnZXRFdmVudHNQbHVnaW4uY2VsbENsaWNrXG4gICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbikpXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5jb2x1bW4uZWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgZXZlbnQuY29udGV4dC5zdGFydEVkaXQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9kYmxDbGljaykge1xuICAgICAgICB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbi5jZWxsRGJsQ2xpY2tcbiAgICAgICAgICAucGlwZShVblJ4KHRoaXMsIHRoaXMudGFyZ2V0RXZlbnRzUGx1Z2luKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RhdGEnICYmIGV2ZW50LmNvbHVtbi5lZGl0YWJsZSkge1xuICAgICAgICAgICAgICBldmVudC5jb250ZXh0LnN0YXJ0RWRpdCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==