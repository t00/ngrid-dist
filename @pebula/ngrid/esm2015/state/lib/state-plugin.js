import * as tslib_1 from "tslib";
var PblNgridStatePlugin_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const PLUGIN_KEY = 'state';
let PblNgridStatePlugin = PblNgridStatePlugin_1 = class PblNgridStatePlugin {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
        this.grid = grid;
        this.injector = injector;
        this.pluginCtrl = pluginCtrl;
        this._events = new Subject();
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        this.afterLoadState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.phase === 'load' && e.position === 'after')), mapTo(undefined));
        this.afterSaveState = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.phase === 'save' && e.position === 'after')), mapTo(undefined));
        this.onError = this._events.pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => !!e.error)), map((/**
         * @param {?} e
         * @return {?}
         */
        e => ({ phase: e.phase, error: e.error }))));
        pluginCtrl.events
            .pipe(filter((/**
         * @param {?} e
         * @return {?}
         */
        e => e.kind === 'onInvalidateHeaders')), take(1))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            /** @type {?} */
            const initialLoadOptions = Object.assign({}, (this.loadOptions || {}), { avoidRedraw: true });
            hasState(grid, initialLoadOptions)
                .then((/**
             * @param {?} value
             * @return {?}
             */
            value => {
                if (value) {
                    return this._load(initialLoadOptions);
                }
            }))
                .then((/**
             * @return {?}
             */
            () => {
                pluginCtrl.events
                    .pipe(filter((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => e.kind === 'onResizeRow')), skip(1), debounceTime(500))
                    .subscribe((/**
                 * @param {?} event
                 * @return {?}
                 */
                event => this.save()));
            }));
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onDestroy') {
                event.wait(this.save());
                this._events.complete();
            }
        }));
    }
    /**
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    static create(table, injector) {
        /** @type {?} */
        const pluginCtrl = PblNgridPluginController.find(table);
        return new PblNgridStatePlugin_1(table, injector, pluginCtrl);
    }
    /**
     * @return {?}
     */
    load() {
        return this._load(this.loadOptions);
    }
    /**
     * @return {?}
     */
    save() {
        return saveState(this.grid, this.saveOptions)
            .then((/**
         * @return {?}
         */
        () => this._events.next({ phase: 'save', position: 'after' })))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        error => this._events.next({ phase: 'save', position: 'after', error })));
    }
    /**
     * @return {?}
     */
    destroy() {
        this._removePlugin(this.grid);
    }
    /**
     * @private
     * @param {?} loadOptions
     * @return {?}
     */
    _load(loadOptions) {
        return loadState(this.grid, loadOptions)
            .then((/**
         * @return {?}
         */
        () => this._events.next({ phase: 'load', position: 'after' })))
            .catch((/**
         * @param {?} error
         * @return {?}
         */
        error => this._events.next({ phase: 'load', position: 'after', error })));
    }
};
PblNgridStatePlugin.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridStatePlugin = PblNgridStatePlugin_1 = tslib_1.__decorate([
    NgridPlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridStatePlugin);
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
let PblNgridStatePluginDirective = class PblNgridStatePluginDirective extends PblNgridStatePlugin {
    /**
     * @param {?} grid
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(grid, injector, pluginCtrl) {
        super(grid, injector, pluginCtrl);
        this.loadOptions = { include: userSessionPref() };
        this.saveOptions = { include: userSessionPref() };
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy();
    }
};
PblNgridStatePluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridStatePluginDirective.decorators = [
    { type: Directive, args: [{
                selector: 'pbl-ngrid[persistState]',
                // tslint:disable-line:directive-selector
                outputs: ['afterLoadState', 'afterSaveState', 'onError'],
            },] }
];
/** @nocollapse */
PblNgridStatePluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridStatePluginDirective.propDecorators = {
    loadOptions: [{ type: Input }],
    saveOptions: [{ type: Input }]
};
PblNgridStatePluginDirective = tslib_1.__decorate([
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridStatePluginDirective);
export { PblNgridStatePluginDirective };
if (false) {
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.loadOptions;
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.saveOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBb0IsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFzRCxNQUFNLGNBQWMsQ0FBQztBQUNsSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBMkI1Qyx3Q0FJQzs7O0lBSEMsMENBQXVCOztJQUN2Qiw2Q0FBNkI7O0lBQzdCLDBDQUFjOzs7QUFHaEIsTUFBTSxPQUFPLFVBQVUsR0FBWSxPQUFPO0lBSTdCLG1CQUFtQixpQ0FBbkIsbUJBQW1COzs7Ozs7SUFZOUIsWUFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTFHLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBRnJILFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQUd6RCxJQUFJLENBQUMsYUFBYSxH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eEM7U0FiWSw0QkFBNEI7OztJQUV2QyxtREFBZ0Y7O0lBQ2hGLG1EQUFnRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWFwVG8sIGZpbHRlciwgdGFrZSwgc2tpcCwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBOZ3JpZFBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgaGFzU3RhdGUsIHNhdmVTdGF0ZSwgbG9hZFN0YXRlLCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMsIFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucyB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyByZWdpc3RlckJ1aWx0SW5IYW5kbGVycyB9IGZyb20gJy4vY29yZS9idWlsdC1pbi1oYW5kbGVycy9fcmVnaXN0ZXInO1xuXG5pbXBvcnQgeyB1c2VyU2Vzc2lvblByZWYgfSBmcm9tICcuL3ByZXNldHMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBzdGF0ZT86IHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgZW5hYmxlIHRoZSBzdGF0ZSBwbHVnaW4gb24gYWxsIHRhYmxlIGluc3RhbmNlcyBieSBkZWZhdWx0LiAqL1xuICAgICAgYXV0b0VuYWJsZT86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIE9wdGlvbnMgdG8gdXNlIHdoZW4gYXV0by1sb2FkaW5nIHRoZSBwbHVnaW5cbiAgICAgICAqL1xuICAgICAgYXV0b0VuYWJsZU9wdGlvbnM/OiB7XG4gICAgICAgIGxvYWRPcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zO1xuICAgICAgICBzYXZlT3B0aW9ucz86IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBzdGF0ZT86IFBibE5ncmlkU3RhdGVQbHVnaW47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBzdGF0ZToga2V5b2YgdHlwZW9mIFBibE5ncmlkU3RhdGVQbHVnaW47XG4gIH1cbn1cblxuaW50ZXJmYWNlIEludGVybmFsU3RhdGVQbHVnaW5FdmVudHMge1xuICBwaGFzZTogJ2xvYWQnIHwgJ3NhdmUnO1xuICBwb3NpdGlvbjogJ2JlZm9yZScgfCAnYWZ0ZXInO1xuICBlcnJvcj86IEVycm9yO1xufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ3N0YXRlJyA9ICdzdGF0ZSc7XG5cbkBOZ3JpZFBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJywgcnVuT25jZTogcmVnaXN0ZXJCdWlsdEluSGFuZGxlcnMgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0YXRlUGx1Z2luIHtcblxuICBsb2FkT3B0aW9ucz86IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucztcbiAgc2F2ZU9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnM7XG5cbiAgYWZ0ZXJMb2FkU3RhdGU6IE9ic2VydmFibGU8dm9pZD47XG4gIGFmdGVyU2F2ZVN0YXRlOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBvbkVycm9yOiBPYnNlcnZhYmxlPHsgcGhhc2U6ICdzYXZlJyB8ICdsb2FkJzsgZXJyb3I6IEVycm9yOyB9PjtcblxuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfZXZlbnRzID0gbmV3IFN1YmplY3Q8SW50ZXJuYWxTdGF0ZVBsdWdpbkV2ZW50cz4oKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvciwgcHJvdGVjdGVkIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGhpcy5hZnRlckxvYWRTdGF0ZSA9IHRoaXMuX2V2ZW50cy5waXBlKGZpbHRlciggZSA9PiBlLnBoYXNlID09PSAnbG9hZCcgJiYgZS5wb3NpdGlvbiA9PT0gJ2FmdGVyJyksIG1hcFRvKHVuZGVmaW5lZCkgKTtcbiAgICB0aGlzLmFmdGVyU2F2ZVN0YXRlID0gdGhpcy5fZXZlbnRzLnBpcGUoZmlsdGVyKCBlID0+IGUucGhhc2UgPT09ICdzYXZlJyAmJiBlLnBvc2l0aW9uID09PSAnYWZ0ZXInKSwgbWFwVG8odW5kZWZpbmVkKSApO1xuICAgIHRoaXMub25FcnJvciA9IHRoaXMuX2V2ZW50cy5waXBlKGZpbHRlciggZSA9PiAhIWUuZXJyb3IgKSwgbWFwKCBlID0+ICh7IHBoYXNlOiBlLnBoYXNlLCBlcnJvcjogZS5lcnJvciB9KSkgKTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uSW52YWxpZGF0ZUhlYWRlcnMnKSxcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgaW5pdGlhbExvYWRPcHRpb25zID0geyAuLi4odGhpcy5sb2FkT3B0aW9ucyB8fCB7fSksIGF2b2lkUmVkcmF3OiB0cnVlIH07XG4gICAgICAgIGhhc1N0YXRlKGdyaWQsIGluaXRpYWxMb2FkT3B0aW9ucylcbiAgICAgICAgICAudGhlbiggdmFsdWUgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2FkKGluaXRpYWxMb2FkT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25SZXNpemVSb3cnKSxcbiAgICAgICAgICAgICAgc2tpcCgxKSxcbiAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDUwMCksXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLnNhdmUoKSApO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGVzdHJveScpIHtcbiAgICAgICAgICBldmVudC53YWl0KHRoaXMuc2F2ZSgpKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHMuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZFN0YXRlUGx1Z2luIHtcbiAgICBjb25zdCBwbHVnaW5DdHJsID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpO1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRTdGF0ZVBsdWdpbih0YWJsZSwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fbG9hZCh0aGlzLmxvYWRPcHRpb25zKTtcbiAgfVxuXG4gIHNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHNhdmVTdGF0ZSh0aGlzLmdyaWQsIHRoaXMuc2F2ZU9wdGlvbnMpXG4gICAgICAudGhlbiggKCkgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnc2F2ZScsIHBvc2l0aW9uOiAnYWZ0ZXInfSkgKVxuICAgICAgLmNhdGNoKCBlcnJvciA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdzYXZlJywgcG9zaXRpb246ICdhZnRlcicsIGVycm9yIH0pICk7XG4gIH1cblxuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9hZChsb2FkT3B0aW9uczogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIGxvYWRTdGF0ZSh0aGlzLmdyaWQsIGxvYWRPcHRpb25zKVxuICAgICAgLnRoZW4oICgpID0+IHRoaXMuX2V2ZW50cy5uZXh0KHtwaGFzZTogJ2xvYWQnLCBwb3NpdGlvbjogJ2FmdGVyJ30pIClcbiAgICAgIC5jYXRjaCggZXJyb3IgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnbG9hZCcsIHBvc2l0aW9uOiAnYWZ0ZXInLCBlcnJvciB9KSApO1xuICB9XG5cbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAncGJsLW5ncmlkW3BlcnNpc3RTdGF0ZV0nLCAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICBvdXRwdXRzOiBbJ2FmdGVyTG9hZFN0YXRlJywgJ2FmdGVyU2F2ZVN0YXRlJywgJ29uRXJyb3InXSxcbn0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGF0ZVBsdWdpbkRpcmVjdGl2ZSBleHRlbmRzIFBibE5ncmlkU3RhdGVQbHVnaW4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGxvYWRPcHRpb25zOiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMgPSB7IGluY2x1ZGU6IHVzZXJTZXNzaW9uUHJlZigpIH07XG4gIEBJbnB1dCgpIHNhdmVPcHRpb25zOiBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnMgPSB7IGluY2x1ZGU6IHVzZXJTZXNzaW9uUHJlZigpIH07XG5cbiAgY29uc3RydWN0b3IoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICBzdXBlcihncmlkLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxuXG59XG4iXX0=