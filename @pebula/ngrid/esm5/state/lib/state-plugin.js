/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Subject } from 'rxjs';
import { map, mapTo, filter, take, skip, debounceTime } from 'rxjs/operators';
import { Directive, OnDestroy, Injector, Input } from '@angular/core';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin } from '@pebula/ngrid';
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
        NgridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFvQixNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXRFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQXNELE1BQU0sY0FBYyxDQUFDO0FBQ2xILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxXQUFXLENBQUM7Ozs7QUEyQjVDLHdDQUlDOzs7SUFIQywwQ0FBdUI7O0lBQ3ZCLDZDQUE2Qjs7SUFDN0IsMENBQWM7OztBQUdoQixNQUFNLEtBQU8sVUFBVSxHQUFZLE9BQU87O0lBZ0J4Qyw2QkFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTdILGlCQXNDQztRQXRDa0IsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFBWSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVksZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFGckgsWUFBTyxHQUFHLElBQUksT0FBTyxFQUE2QixDQUFDO1FBR3pELElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNB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QUN6RDs7OztnQkEzSFEsaUJBQWlCO2dCQUhLLFFBQVE7Z0JBR1gsd0JBQXdCOzs7OEJBK0hqRCxLQUFLOzhCQUNMLEtBQUs7O0lBSEssNEJBQTRCO1FBRHhDLElBQUksRUFBRTtpREFNYSxpQkFBaUIsRUFBaUIsUUFBUSxFQUFjLHdCQUF3QjtPQUx2Riw0QkFBNEIsQ0FheEM7SUFBRCxtQ0FBQztDQUFBLENBYmlELG1CQUFtQixHQWFwRTtTQWJZLDRCQUE0Qjs7O0lBRXZDLG1EQUFnRjs7SUFDaEYsbURBQWdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSwgZnJvbSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtYXBUbywgZmlsdGVyLCB0YWtlLCBza2lwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBEaXJlY3RpdmUsIE9uRGVzdHJveSwgSW5qZWN0b3IsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBoYXNTdGF0ZSwgc2F2ZVN0YXRlLCBsb2FkU3RhdGUsIFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucywgUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zIH0gZnJvbSAnLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IHJlZ2lzdGVyQnVpbHRJbkhhbmRsZXJzIH0gZnJvbSAnLi9jb3JlL2J1aWx0LWluLWhhbmRsZXJzL19yZWdpc3Rlcic7XG5cbmltcG9ydCB7IHVzZXJTZXNzaW9uUHJlZiB9IGZyb20gJy4vcHJlc2V0cyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHN0YXRlPzoge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIHN0YXRlIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogT3B0aW9ucyB0byB1c2Ugd2hlbiBhdXRvLWxvYWRpbmcgdGhlIHBsdWdpblxuICAgICAgICovXG4gICAgICBhdXRvRW5hYmxlT3B0aW9ucz86IHtcbiAgICAgICAgbG9hZE9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnM7XG4gICAgICAgIHNhdmVPcHRpb25zPzogUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHN0YXRlPzogUGJsTmdyaWRTdGF0ZVBsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIHN0YXRlOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRTdGF0ZVBsdWdpbjtcbiAgfVxufVxuXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGF0ZVBsdWdpbkV2ZW50cyB7XG4gIHBoYXNlOiAnbG9hZCcgfCAnc2F2ZSc7XG4gIHBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG4gIGVycm9yPzogRXJyb3I7XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnc3RhdGUnID0gJ3N0YXRlJztcblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnLCBydW5PbmNlOiByZWdpc3RlckJ1aWx0SW5IYW5kbGVycyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RhdGVQbHVnaW4ge1xuXG4gIGxvYWRPcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zO1xuICBzYXZlT3B0aW9ucz86IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucztcblxuICBhZnRlckxvYWRTdGF0ZTogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgYWZ0ZXJTYXZlU3RhdGU6IE9ic2VydmFibGU8dm9pZD47XG4gIG9uRXJyb3I6IE9ic2VydmFibGU8eyBwaGFzZTogJ3NhdmUnIHwgJ2xvYWQnOyBlcnJvcjogRXJyb3I7IH0+O1xuXG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9ldmVudHMgPSBuZXcgU3ViamVjdDxJbnRlcm5hbFN0YXRlUGx1Z2luRXZlbnRzPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLmFmdGVyTG9hZFN0YXRlID0gdGhpcy5fZXZlbnRzLnBpcGUoZmlsdGVyKCBlID0+IGUucGhhc2UgPT09ICdsb2FkJyAmJiBlLnBvc2l0aW9uID09PSAnYWZ0ZXInKSwgbWFwVG8odW5kZWZpbmVkKSApO1xuICAgIHRoaXMuYWZ0ZXJTYXZlU3RhdGUgPSB0aGlzLl9ldmVudHMucGlwZShmaWx0ZXIoIGUgPT4gZS5waGFzZSA9PT0gJ3NhdmUnICYmIGUucG9zaXRpb24gPT09ICdhZnRlcicpLCBtYXBUbyh1bmRlZmluZWQpICk7XG4gICAgdGhpcy5vbkVycm9yID0gdGhpcy5fZXZlbnRzLnBpcGUoZmlsdGVyKCBlID0+ICEhZS5lcnJvciApLCBtYXAoIGUgPT4gKHsgcGhhc2U6IGUucGhhc2UsIGVycm9yOiBlLmVycm9yIH0pKSApO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpbml0aWFsTG9hZE9wdGlvbnMgPSB7IC4uLih0aGlzLmxvYWRPcHRpb25zIHx8IHt9KSwgYXZvaWRSZWRyYXc6IHRydWUgfTtcbiAgICAgICAgaGFzU3RhdGUoZ3JpZCwgaW5pdGlhbExvYWRPcHRpb25zKVxuICAgICAgICAgIC50aGVuKCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWQoaW5pdGlhbExvYWRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvblJlc2l6ZVJvdycpLFxuICAgICAgICAgICAgICBza2lwKDEpLFxuICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuc2F2ZSgpICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25EZXN0cm95Jykge1xuICAgICAgICAgIGV2ZW50LndhaXQodGhpcy5zYXZlKCkpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkU3RhdGVQbHVnaW4ge1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSk7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZFN0YXRlUGx1Z2luKHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkKHRoaXMubG9hZE9wdGlvbnMpO1xuICB9XG5cbiAgc2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gc2F2ZVN0YXRlKHRoaXMuZ3JpZCwgdGhpcy5zYXZlT3B0aW9ucylcbiAgICAgIC50aGVuKCAoKSA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdzYXZlJywgcG9zaXRpb246ICdhZnRlcid9KSApXG4gICAgICAuY2F0Y2goIGVycm9yID0+IHRoaXMuX2V2ZW50cy5uZXh0KHtwaGFzZTogJ3NhdmUnLCBwb3NpdGlvbjogJ2FmdGVyJywgZXJyb3IgfSkgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkKGxvYWRPcHRpb25zOiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbG9hZFN0YXRlKHRoaXMuZ3JpZCwgbG9hZE9wdGlvbnMpXG4gICAgICAudGhlbiggKCkgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnbG9hZCcsIHBvc2l0aW9uOiAnYWZ0ZXInfSkgKVxuICAgICAgLmNhdGNoKCBlcnJvciA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdsb2FkJywgcG9zaXRpb246ICdhZnRlcicsIGVycm9yIH0pICk7XG4gIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbcGVyc2lzdFN0YXRlXScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIG91dHB1dHM6IFsnYWZ0ZXJMb2FkU3RhdGUnLCAnYWZ0ZXJTYXZlU3RhdGUnLCAnb25FcnJvciddLFxufSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0YXRlUGx1Z2luRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTdGF0ZVBsdWdpbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgbG9hZE9wdGlvbnM6IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyA9IHsgaW5jbHVkZTogdXNlclNlc3Npb25QcmVmKCkgfTtcbiAgQElucHV0KCkgc2F2ZU9wdGlvbnM6IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucyA9IHsgaW5jbHVkZTogdXNlclNlc3Npb25QcmVmKCkgfTtcblxuICBjb25zdHJ1Y3RvcihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHN1cGVyKGdyaWQsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==