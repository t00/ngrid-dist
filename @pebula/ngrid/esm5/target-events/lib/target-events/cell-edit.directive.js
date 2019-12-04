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
    function PblNgridCellEditDirective(grid, injector, pluginCtrl) {
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
    PblNgridCellEditDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1lZGl0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2NlbGwtZWRpdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0lBNEIxRSxtQ0FBWSxJQUE0QixFQUFFLFFBQWtCLEVBQUUsVUFBb0M7UUFBbEcsaUJBYUM7UUFqQk8sV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLGNBQVMsR0FBRyxLQUFLLENBQUM7O1lBS3BCLFlBQVksR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDbkQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixZQUFZLEdBQUcsU0FBUyxDQUFDO2dCQUV6QixrQ0FBa0M7Z0JBQ2xDLDhCQUE4QjtnQkFDOUIsS0FBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUcsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDO0lBaENELHNCQUFhLG9EQUFhOzs7OztRQUExQixVQUEyQixLQUFjO1lBQ3ZDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO2dCQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDOzs7T0FBQTtJQUNELHNCQUFhLHVEQUFnQjs7Ozs7UUFBN0IsVUFBOEIsS0FBYztZQUMxQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQzs7O09BQUE7Ozs7O0lBcUJPLDBDQUFNOzs7O0lBQWQ7UUFDRSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVM7cUJBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUN6QyxTQUFTOzs7O2dCQUFFLFVBQUEsS0FBSztvQkFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO3dCQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDL0I7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDTjtZQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVk7cUJBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3FCQUN6QyxTQUFTOzs7O2dCQUFFLFVBQUEsS0FBSztvQkFDZixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO3dCQUNsRCxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDL0I7Z0JBQ0gsQ0FBQyxFQUFDLENBQUM7YUFDTjtTQUNGO0lBQ0gsQ0FBQzs7Z0JBdENpQixpQkFBaUI7Z0JBQWlCLFFBQVE7Z0JBQWMsd0JBQXdCOzs7Z0JBekJuRyxTQUFTLFNBQUM7O29CQUVULFFBQVEsRUFBRSx1REFBdUQ7aUJBQ2xFOzs7O2dCQU5RLGlCQUFpQjtnQkFKQyxRQUFRO2dCQUlQLHdCQUF3Qjs7O2dDQVNqRCxLQUFLO21DQU9MLEtBQUs7Ozs7O0lBUksseUJBQXlCO1FBRHJDLElBQUksRUFBRTtpREFxQmEsaUJBQWlCLEVBQWlCLFFBQVEsRUFBYyx3QkFBd0I7T0FwQnZGLHlCQUF5QixDQTJEckM7SUFBRCxnQ0FBQztDQUFBLElBQUE7U0EzRFkseUJBQXlCOzs7Ozs7SUFnQnBDLDJDQUF1Qjs7Ozs7SUFDdkIsOENBQTBCOzs7OztJQUMxQix1REFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4gfSBmcm9tICcuL3RhcmdldC1ldmVudHMtcGx1Z2luJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY2VsbEVkaXRDbGlja10sIHBibC1uZ3JpZFtjZWxsRWRpdERibENsaWNrXScsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmU8VD4ge1xuICBASW5wdXQoKSBzZXQgY2VsbEVkaXRDbGljayh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fY2xpY2sgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jbGljayA9IHZhbHVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgc2V0IGNlbGxFZGl0RGJsQ2xpY2sodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2RibENsaWNrICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fZGJsQ2xpY2sgPSB2YWx1ZTtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xpY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGJsQ2xpY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSB0YXJnZXRFdmVudHNQbHVnaW46IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG5cbiAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHMuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgICAgIC8vIGlmIGl0J3Mgbm90IHNldCwgY3JlYXRlIGl0LlxuICAgICAgICB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbiA9IHBsdWdpbkN0cmwuZ2V0UGx1Z2luKCd0YXJnZXRFdmVudHMnKSB8fCBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50YXJnZXRFdmVudHNQbHVnaW4pIHtcbiAgICAgIFVuUngua2lsbCh0aGlzLCB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbik7XG4gICAgICBpZiAodGhpcy5fY2xpY2spIHtcbiAgICAgICAgdGhpcy50YXJnZXRFdmVudHNQbHVnaW4uY2VsbENsaWNrXG4gICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbikpXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5jb2x1bW4uZWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgZXZlbnQuY29udGV4dC5zdGFydEVkaXQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9kYmxDbGljaykge1xuICAgICAgICB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbi5jZWxsRGJsQ2xpY2tcbiAgICAgICAgICAucGlwZShVblJ4KHRoaXMsIHRoaXMudGFyZ2V0RXZlbnRzUGx1Z2luKSlcbiAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2RhdGEnICYmIGV2ZW50LmNvbHVtbi5lZGl0YWJsZSkge1xuICAgICAgICAgICAgICBldmVudC5jb250ZXh0LnN0YXJ0RWRpdCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==