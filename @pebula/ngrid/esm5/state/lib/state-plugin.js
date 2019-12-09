/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { map, mapTo, filter, take, skip, debounceTime } from 'rxjs/operators';
import { Directive, OnDestroy, Injector, Input } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
import { hasState, saveState, loadState } from './core/index';
import { registerBuiltInHandlers } from './core/built-in-handlers/_register';
import { userSessionPref } from './presets';
/**
 * @record
 */
function InternalStatePluginEvents() { }
if (false) {
    /** @type {?} */
    InternalStatePluginEvents.prototype.phase;
    /** @type {?} */
    InternalStatePluginEvents.prototype.position;
    /** @type {?|undefined} */
    InternalStatePluginEvents.prototype.error;
}
/** @type {?} */
export var PLUGIN_KEY = 'state';
var PblNgridStatePlugin = /** @class */ (function () {
    function PblNgridStatePlugin(grid, injector, pluginCtrl) {
        var _this = this;
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this._events = new Subject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.afterLoadState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.phase === 'load' && e.position === 'after'; })), mapTo(undefined));
        this.afterSaveState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.phase === 'save' && e.position === 'after'; })), mapTo(undefined));
        this.onError = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return !!e.error; })), map((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return ({ phase: e.phase, error: e.error }); })));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return e.kind === 'onInvalidateHeaders'; })), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var initialLoadOptions = tslib_1.__assign({}, (_this.loadOptions || {}), { avoidRedraw: true });
            hasState(grid, initialLoadOptions)
                .then((/**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (value) {
                    return _this._load(initialLoadOptions);
                }
            }))
                .then((/**
             * @return {?}
             */
            function () {
                pluginCtrl.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return e.kind === 'onResizeRow'; })), skip(1), debounceTime(500))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) { return _this.save(); }));
            }));
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onDestroy') {
                event.wait(_this.save());
                _this._events.complete();
            }
        }));
    }
    PblNgridStatePlugin_1 = PblNgridStatePlugin;
    /**
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    PblNgridStatePlugin.create = /**
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    function (table, injector) {
        /** @type {?} */
        var pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridStatePlugin_1(table, injector, pluginCtrl);
    };
    /**
     * @return {?}
     */
    PblNgridStatePlugin.prototype.load = /**
     * @return {?}
     */
    function () {
        return this._load(this.loadOptions);
    };
    /**
     * @return {?}
     */
    PblNgridStatePlugin.prototype.save = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return saveState(this.grid, this.saveOptions)
            .then((/**
         * @return {?}
         */
        function () { return _this._events.next({ phase: 'save', position: 'after' }); }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this._events.next({ phase: 'save', position: 'after', error: error }); }));
    };
    /**
     * @return {?}
     */
    PblNgridStatePlugin.prototype.destroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.grid);
    };
    /**
     * @private
     * @param {?} loadOptions
     * @return {?}
     */
    PblNgridStatePlugin.prototype._load = /**
     * @private
     * @param {?} loadOptions
     * @return {?}
     */
    function (loadOptions) {
        var _this = this;
        return loadState(this.grid, loadOptions)
            .then((/**
         * @return {?}
         */
        function () { return _this._events.next({ phase: 'load', position: 'after' }); }))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this._events.next({ phase: 'load', position: 'after', error: error }); }));
    };
    var PblNgridStatePlugin_1;
    PblNgridStatePlugin.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStatePlugin = PblNgridStatePlugin_1 = tslib_1.__decorate([
        TablePlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }),
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridStatePlugin);
    return PblNgridStatePlugin;
}());
export { PblNgridStatePlugin };
if (false) {
    /** @type {?} */
    PblNgridStatePlugin.prototype.loadOptions;
    /** @type {?} */
    PblNgridStatePlugin.prototype.saveOptions;
    /** @type {?} */
    PblNgridStatePlugin.prototype.afterLoadState;
    /** @type {?} */
    PblNgridStatePlugin.prototype.afterSaveState;
    /** @type {?} */
    PblNgridStatePlugin.prototype.onError;
    /**
     * @type {?}
     * @private
     */
    PblNgridStatePlugin.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridStatePlugin.prototype._events;
    /** @type {?} */
    PblNgridStatePlugin.prototype.grid;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStatePlugin.prototype.injector;
    /**
     * @type {?}
     * @protected
     */
    PblNgridStatePlugin.prototype.pluginCtrl;
}
var PblNgridStatePluginDirective = /** @class */ (function (_super) {
    tslib_1.__extends(PblNgridStatePluginDirective, _super);
    function PblNgridStatePluginDirective(grid, injector, pluginCtrl) {
        var _this = _super.call(this, grid, injector, pluginCtrl) || this;
        _this.loadOptions = { include: userSessionPref() };
        _this.saveOptions = { include: userSessionPref() };
        return _this;
    }
    /**
     * @return {?}
     */
    PblNgridStatePluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy();
    };
    PblNgridStatePluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStatePluginDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'pbl-ngrid[persistState]',
                    // tslint:disable-line:directive-selector
                    outputs: ['afterLoadState', 'afterSaveState', 'onError'],
                },] }
    ];
    /** @nocollapse */
    PblNgridStatePluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridStatePluginDirective.propDecorators = {
        loadOptions: [{ type: Input }],
        saveOptions: [{ type: Input }]
    };
    PblNgridStatePluginDirective = tslib_1.__decorate([
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridStatePluginDirective);
    return PblNgridStatePluginDirective;
}(PblNgridStatePlugin));
export { PblNgridStatePluginDirective };
if (false) {
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.loadOptions;
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.saveOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFvQixNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQXNELE1BQU0sY0FBYyxDQUFDO0FBQ2xILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUEyQjVDLHdDQUlDOzs7SUFIQywwQ0FBdUI7O0lBQ3ZCLDZDQUE2Qjs7SUFDN0IsMENBQWM7OztBQUdoQixNQUFNLEtBQU8sVUFBVSxHQUFZLE9BQU87O0lBZ0J4Qyw2QkFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTdILGlCQXNDQztRQXRDa0IsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFGckgsWUFBTyxHQUFHLElBQUksT0FBTyxFQUE2QixDQUFDO1FBR3pELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNOzs7O1FBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsS0FBSyxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBNUMsQ0FBNEMsRUFBQyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBRSxDQUFDO1FBQ3ZILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztRQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQTVDLENBQTRDLEVBQUMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUUsQ0FBQztRQUN2SCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFULENBQVMsRUFBRSxFQUFFLEdBQUc7Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQXBDLENBQW9DLEVBQUMsQ0FBRSxDQUFDO1FBRTdHLFVBQVUsQ0FBQyxNQUFNO2FBQ2QsSUFBSSxDQUNILE1BQU07Ozs7UUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUsscUJBQXFCLEVBQWhDLENBQWdDLEVBQUMsRUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSO2FBQ0EsU0FBUzs7OztRQUFFLFVBQUEsS0FBSzs7Z0JBQ1Qsa0JBQWtCLHdCQUFRLENBQUMsS0FBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsSUFBRSxXQUFXLEVBQUUsSUFBSSxHQUFFO1lBQzdFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUM7aUJBQy9CLElBQUk7Ozs7WUFBRSxVQUFBLEtBQUs7Z0JBQ1YsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsT0FBTyxLQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQyxFQUFDO2lCQUNELElBQUk7OztZQUFFO2dCQUNMLFVBQVUsQ0FBQyxNQUFNO3FCQUNoQixJQUFJLENBQ0gsTUFBTTs7OztnQkFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUF4QixDQUF3QixFQUFDLEVBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxZQUFZLENBQUMsR0FBRyxDQUFDLENBQ2xCO3FCQUNBLFNBQVM7Ozs7Z0JBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxFQUFFLEVBQVgsQ0FBVyxFQUFFLENBQUM7WUFDckMsQ0FBQyxFQUFDLENBQUM7UUFDUCxDQUFDLEVBQUMsQ0FBQztRQUVMLFVBQVUsQ0FBQyxNQUFNO2FBQ2QsU0FBUzs7OztRQUFFLFVBQUEsS0FBSztZQUNmLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQzlCLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7NEJBbERVLG1CQUFtQjs7Ozs7O0lBb0R2QiwwQkFBTTs7Ozs7SUFBYixVQUFjLEtBQTZCLEVBQUUsUUFBa0I7O1lBQ3ZELFVBQVUsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxxQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzlELENBQUM7Ozs7SUFFRCxrQ0FBSTs7O0lBQUo7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxrQ0FBSTs7O0lBQUo7UUFBQSxpQkFJQztRQUhDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUMxQyxJQUFJOzs7UUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQyxFQUFyRCxDQUFxRCxFQUFFO2FBQ25FLEtBQUs7Ozs7UUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsRUFBN0QsQ0FBNkQsRUFBRSxDQUFDO0lBQ3JGLENBQUM7Ozs7SUFFRCxxQ0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFTyxtQ0FBSzs7Ozs7SUFBYixVQUFjLFdBQXFDO1FBQW5ELGlCQUlDO1FBSEMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7YUFDckMsSUFBSTs7O1FBQUUsY0FBTSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBckQsQ0FBcUQsRUFBRTthQUNuRSxLQUFLOzs7O1FBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxDQUFDLEVBQTdELENBQTZELEVBQUUsQ0FBQztJQUNyRixDQUFDOzs7Z0JBL0R3QixpQkFBaUI7Z0JBQTJCLFFBQVE7Z0JBQXdCLHdCQUF3Qjs7SUFabEgsbUJBQW1CO1FBRi9CLFdBQVcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQztRQUNwRixJQUFJLEVBQUU7aURBYW9CLGlCQUFpQixFQUEyQixRQUFRLEVBQXdCLHdCQUF3QjtPQVpsSCxtQkFBbUIsQ0E2RS9CO0lBQUQsMEJBQUM7Q0FBQSxJQUFBO1NBN0VZLG1CQUFtQjs7O0lBRTlCLDBDQUF1Qzs7SUFDdkMsMENBQXVDOztJQUV2Qyw2Q0FBaUM7O0lBQ2pDLDZDQUFpQzs7SUFDakMsc0NBQStEOzs7OztJQUUvRCw0Q0FBK0Q7Ozs7O0lBQy9ELHNDQUEyRDs7SUFFL0MsbUNBQW1DOzs7OztJQUFFLHVDQUE0Qjs7Ozs7SUFBRSx5Q0FBOEM7OztJQXdFN0Usd0RBQW1CO0lBS25FLHNDQUFZLElBQTRCLEVBQUUsUUFBa0IsRUFBRSxVQUFvQztRQUFsRyxZQUNFLGtCQUFNLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxDQUFDLFNBQ2xDO1FBTFEsaUJBQVcsR0FBNkIsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLEVBQUUsQ0FBQztRQUN2RSxpQkFBVyxHQUE2QixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDOztJQUloRixDQUFDOzs7O0lBRUQsa0RBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7O2dCQU5pQixpQkFBaUI7Z0JBQWlCLFFBQVE7Z0JBQWMsd0JBQXdCOzs7Z0JBVm5HLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCOztvQkFDbkMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDO2lCQUN6RDs7OztnQkEzSFEsaUJBQWlCO2dCQUhLLFFBQVE7Z0JBR1gsd0JBQXdCOzs7OEJBK0hqRCxLQUFLOzhCQUNMLEtBQUs7O0lBSEssNEJBQTRCO1FBRHhDLElBQUksRUFBRTtpREFNYSxpQkFBaUIsRUFBaUIsUUFBUSxFQUFjLHdCQUF3QjtPQUx2Riw0QkFBNEIsQ0FheEM7SUFBRCxtQ0FBQztDQUFBLENBYmlELG1CQUFtQixHQWFwRTtTQWJZLDRCQUE0Qjs7O0lBRXZDLG1EQUFnRjs7SUFDaEYsbURBQWdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtYXBUbywgZmlsdGVyLCB0YWtlLCBza2lwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9uRGVzdHJveSwgSW5qZWN0b3IsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBoYXNTdGF0ZSwgc2F2ZVN0YXRlLCBsb2FkU3RhdGUsIFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucywgUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IHJlZ2lzdGVyQnVpbHRJbkhhbmRsZXJzIH0gZnJvbSAnLi9jb3JlL2J1aWx0LWluLWhhbmRsZXJzL19yZWdpc3Rlcic7XG5cbmltcG9ydCB7IHVzZXJTZXNzaW9uUHJlZiB9IGZyb20gJy4vcHJlc2V0cyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBzdGF0ZT86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSBzdGF0ZSBwbHVnaW4gb24gYWxsIHRhYmxlIGluc3RhbmNlcyBieSBkZWZhdWx0LiAqL1xuICAgICAgYXV0b0VuYWJsZT86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIE9wdGlvbnMgdG8gdXNlIHdoZW4gYXV0by1sb2FkaW5nIHRoZSBwbHVnaW5cbiAgICAgICAqL1xuICAgICAgYXV0b0VuYWJsZU9wdGlvbnM/OiB7XG4gICAgICAgIGxvYWRPcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zO1xuICAgICAgICBzYXZlT3B0aW9ucz86IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBzdGF0ZT86IFBibE5ncmlkU3RhdGVQbHVnaW47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBzdGF0ZToga2V5b2YgdHlwZW9mIFBibE5ncmlkU3RhdGVQbHVnaW47XG4gIH1cbn1cblxuaW50ZXJmYWNlIEludGVybmFsU3RhdGVQbHVnaW5FdmVudHMge1xuICBwaGFzZTogJ2xvYWQnIHwgJ3NhdmUnO1xuICBwb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuICBlcnJvcj86IEVycm9yO1xufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3N0YXRlJyA9ICdzdGF0ZSc7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJywgcnVuT25jZTogcmVnaXN0ZXJCdWlsdEluSGFuZGxlcnMgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0YXRlUGx1Z2luIHtcblxuICBsb2FkT3B0aW9ucz86IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucztcbiAgc2F2ZU9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnM7XG5cbiAgYWZ0ZXJMb2FkU3RhdGU6IE9ic2VydmFibGU8dm9pZD47XG4gIGFmdGVyU2F2ZVN0YXRlOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBvbkVycm9yOiBPYnNlcnZhYmxlPHsgcGhhc2U6ICdzYXZlJyB8ICdsb2FkJzsgZXJyb3I6IEVycm9yOyB9PjtcblxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfZXZlbnRzID0gbmV3IFN1YmplY3Q8SW50ZXJuYWxTdGF0ZVBsdWdpbkV2ZW50cz4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJvdGVjdGVkIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5hZnRlckxvYWRTdGF0ZSA9IHRoaXMuX2V2ZW50cy5waXBlKGZpbHRlciggZSA9PiBlLnBoYXNlID09PSAnbG9hZCcgJiYgZS5wb3NpdGlvbiA9PT0gJ2FmdGVyJyksIG1hcFRvKHVuZGVmaW5lZCkgKTtcbiAgICB0aGlzLmFmdGVyU2F2ZVN0YXRlID0gdGhpcy5fZXZlbnRzLnBpcGUoZmlsdGVyKCBlID0+IGUucGhhc2UgPT09ICdzYXZlJyAmJiBlLnBvc2l0aW9uID09PSAnYWZ0ZXInKSwgbWFwVG8odW5kZWZpbmVkKSApO1xuICAgIHRoaXMub25FcnJvciA9IHRoaXMuX2V2ZW50cy5waXBlKGZpbHRlciggZSA9PiAhIWUuZXJyb3IgKSwgbWFwKCBlID0+ICh7IHBoYXNlOiBlLnBoYXNlLCBlcnJvcjogZS5lcnJvciB9KSkgKTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgaW5pdGlhbExvYWRPcHRpb25zID0geyAuLi4odGhpcy5sb2FkT3B0aW9ucyB8fCB7fSksIGF2b2lkUmVkcmF3OiB0cnVlIH07XG4gICAgICAgIGhhc1N0YXRlKGdyaWQsIGluaXRpYWxMb2FkT3B0aW9ucylcbiAgICAgICAgICAudGhlbiggdmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkKGluaXRpYWxMb2FkT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25SZXNpemVSb3cnKSxcbiAgICAgICAgICAgICAgc2tpcCgxKSxcbiAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDUwMCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLnNhdmUoKSApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGVzdHJveScpIHtcbiAgICAgICAgICBldmVudC53YWl0KHRoaXMuc2F2ZSgpKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZFN0YXRlUGx1Z2luIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRTdGF0ZVBsdWdpbih0YWJsZSwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZCh0aGlzLmxvYWRPcHRpb25zKTtcbiAgfVxuXG4gIHNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHNhdmVTdGF0ZSh0aGlzLmdyaWQsIHRoaXMuc2F2ZU9wdGlvbnMpXG4gICAgICAudGhlbiggKCkgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnc2F2ZScsIHBvc2l0aW9uOiAnYWZ0ZXInfSkgKVxuICAgICAgLmNhdGNoKCBlcnJvciA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdzYXZlJywgcG9zaXRpb246ICdhZnRlcicsIGVycm9yIH0pICk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZChsb2FkT3B0aW9uczogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGxvYWRTdGF0ZSh0aGlzLmdyaWQsIGxvYWRPcHRpb25zKVxuICAgICAgLnRoZW4oICgpID0+IHRoaXMuX2V2ZW50cy5uZXh0KHtwaGFzZTogJ2xvYWQnLCBwb3NpdGlvbjogJ2FmdGVyJ30pIClcbiAgICAgIC5jYXRjaCggZXJyb3IgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnbG9hZCcsIHBvc2l0aW9uOiAnYWZ0ZXInLCBlcnJvciB9KSApO1xuICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3BlcnNpc3RTdGF0ZV0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBvdXRwdXRzOiBbJ2FmdGVyTG9hZFN0YXRlJywgJ2FmdGVyU2F2ZVN0YXRlJywgJ29uRXJyb3InXSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU3RhdGVQbHVnaW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGxvYWRPcHRpb25zOiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgPSB7IGluY2x1ZGU6IHVzZXJTZXNzaW9uUHJlZigpIH07XG4gIEBJbnB1dCgpIHNhdmVPcHRpb25zOiBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnMgPSB7IGluY2x1ZGU6IHVzZXJTZXNzaW9uUHJlZigpIH07XG5cbiAgY29uc3RydWN0b3IoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICBzdXBlcihncmlkLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG59XG4iXX0=