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
let PblNgridCellEditDirective = /**
 * @template T
 */
class PblNgridCellEditDirective {
    /**
     * @param {?} table
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(table, injector, pluginCtrl) {
        this._click = false;
        this._dblClick = false;
        /** @type {?} */
        let subscription = pluginCtrl.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onInit') {
                subscription.unsubscribe();
                subscription = undefined;
                // Depends on target-events plugin
                // if it's not set, create it.
                this.targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
                this.update();
            }
        }));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set cellEditClick(value) {
        value = coerceBooleanProperty(value);
        if (this._click !== value) {
            this._click = value;
            this.update();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set cellEditDblClick(value) {
        value = coerceBooleanProperty(value);
        if (this._dblClick !== value) {
            this._dblClick = value;
            this.update();
        }
    }
    /**
     * @private
     * @return {?}
     */
    update() {
        if (this.targetEventsPlugin) {
            UnRx.kill(this, this.targetEventsPlugin);
            if (this._click) {
                this.targetEventsPlugin.cellClick
                    .pipe(UnRx(this, this.targetEventsPlugin))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
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
                event => {
                    if (event.type === 'data' && event.column.editable) {
                        event.context.startEdit(true);
                    }
                }));
            }
        }
    }
};
PblNgridCellEditDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridCellEditDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: 'pbl-ngrid[cellEditClick], pbl-ngrid[cellEditDblClick]',
            },] }
];
/** @nocollapse */
PblNgridCellEditDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC1lZGl0LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cy8iLCJzb3VyY2VzIjpbImxpYi90YXJnZXQtZXZlbnRzL2NlbGwtZWRpdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7SUFRL0QseUJBQXlCOzs7TUFBekIseUJBQXlCOzs7Ozs7SUFvQnBDLFlBQVksS0FBNkIsRUFBRSxRQUFrQixFQUFFLFVBQW9DO1FBSjNGLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixjQUFTLEdBQUcsS0FBSyxDQUFDOztZQUtwQixZQUFZLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTOzs7O1FBQUUsS0FBSyxDQUFDLEVBQUU7WUFDdEQsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDM0IsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUMzQixZQUFZLEdBQUcsU0FBUyxDQUFDO2dCQUV6QixrQ0FBa0M7Z0JBQ2xDLDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksVUFBVSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDMUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLEVBQUM7SUFDSixDQUFDOzs7OztJQWhDRCxJQUFhLGFBQWEsQ0FBQyxLQUFjO1FBQ3ZDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQzs7Ozs7SUFDRCxJQUFhLGdCQUFnQixDQUFDLEtBQWM7UUFDMUMsS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDOzs7OztJQXFCTyxNQUFNO1FBQ1osSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO3FCQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztxQkFDekMsU0FBUzs7OztnQkFBRSxLQUFLLENBQUMsRUFBRTtvQkFDbEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTt3QkFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQy9CO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ047WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZO3FCQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztxQkFDekMsU0FBUzs7OztnQkFBRSxLQUFLLENBQUMsRUFBRTtvQkFDbEIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTt3QkFDbEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQy9CO2dCQUNILENBQUMsRUFBQyxDQUFDO2FBQ047U0FDRjtJQUNILENBQUM7Q0FDRixDQUFBOztZQXZDb0IsaUJBQWlCO1lBQWlCLFFBQVE7WUFBYyx3QkFBd0I7OztZQXpCcEcsU0FBUyxTQUFDOztnQkFFVCxRQUFRLEVBQUUsdURBQXVEO2FBQ2xFOzs7O1lBTlEsaUJBQWlCO1lBSkMsUUFBUTtZQUlQLHdCQUF3Qjs7OzRCQVNqRCxLQUFLOytCQU9MLEtBQUs7Ozs7O0FBUksseUJBQXlCO0lBRHJDLElBQUksRUFBRTs2Q0FxQmMsaUJBQWlCLEVBQWlCLFFBQVEsRUFBYyx3QkFBd0I7R0FwQnhGLHlCQUF5QixDQTJEckM7U0EzRFkseUJBQXlCOzs7Ozs7SUFnQnBDLDJDQUF1Qjs7Ozs7SUFDdkIsOENBQTBCOzs7OztJQUMxQix1REFBMEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRUYXJnZXRFdmVudHNQbHVnaW4gfSBmcm9tICcuL3RhcmdldC1ldmVudHMtcGx1Z2luJztcblxuQERpcmVjdGl2ZSh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbY2VsbEVkaXRDbGlja10sIHBibC1uZ3JpZFtjZWxsRWRpdERibENsaWNrXScsXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbEVkaXREaXJlY3RpdmU8VD4ge1xuICBASW5wdXQoKSBzZXQgY2VsbEVkaXRDbGljayh2YWx1ZTogYm9vbGVhbikge1xuICAgIHZhbHVlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICBpZiAodGhpcy5fY2xpY2sgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9jbGljayA9IHZhbHVlO1xuICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICB9XG4gIH1cbiAgQElucHV0KCkgc2V0IGNlbGxFZGl0RGJsQ2xpY2sodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB2YWx1ZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKHRoaXMuX2RibENsaWNrICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fZGJsQ2xpY2sgPSB2YWx1ZTtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xpY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfZGJsQ2xpY2sgPSBmYWxzZTtcbiAgcHJpdmF0ZSB0YXJnZXRFdmVudHNQbHVnaW46IFBibE5ncmlkVGFyZ2V0RXZlbnRzUGx1Z2luPFQ+O1xuXG4gIGNvbnN0cnVjdG9yKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuXG4gICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gRGVwZW5kcyBvbiB0YXJnZXQtZXZlbnRzIHBsdWdpblxuICAgICAgICAvLyBpZiBpdCdzIG5vdCBzZXQsIGNyZWF0ZSBpdC5cbiAgICAgICAgdGhpcy50YXJnZXRFdmVudHNQbHVnaW4gPSBwbHVnaW5DdHJsLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJykgfHwgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0RXZlbnRzUGx1Z2luKSB7XG4gICAgICBVblJ4LmtpbGwodGhpcywgdGhpcy50YXJnZXRFdmVudHNQbHVnaW4pO1xuICAgICAgaWYgKHRoaXMuX2NsaWNrKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0RXZlbnRzUGx1Z2luLmNlbGxDbGlja1xuICAgICAgICAgIC5waXBlKFVuUngodGhpcywgdGhpcy50YXJnZXRFdmVudHNQbHVnaW4pKVxuICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50eXBlID09PSAnZGF0YScgJiYgZXZlbnQuY29sdW1uLmVkaXRhYmxlKSB7XG4gICAgICAgICAgICAgIGV2ZW50LmNvbnRleHQuc3RhcnRFZGl0KHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZGJsQ2xpY2spIHtcbiAgICAgICAgdGhpcy50YXJnZXRFdmVudHNQbHVnaW4uY2VsbERibENsaWNrXG4gICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCB0aGlzLnRhcmdldEV2ZW50c1BsdWdpbikpXG4gICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkYXRhJyAmJiBldmVudC5jb2x1bW4uZWRpdGFibGUpIHtcbiAgICAgICAgICAgICAgZXZlbnQuY29udGV4dC5zdGFydEVkaXQodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=