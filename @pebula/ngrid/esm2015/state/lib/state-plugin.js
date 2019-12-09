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
    TablePlugin({ id: PLUGIN_KEY, factory: 'create', runOnce: registerBuiltInHandlers }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBb0IsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekYsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFzRCxNQUFNLGNBQWMsQ0FBQztBQUNsSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUU3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBMkI1Qyx3Q0FJQzs7O0lBSEMsMENBQXVCOztJQUN2Qiw2Q0FBNkI7O0lBQzdCLDBDQUFjOzs7QUFHaEIsTUFBTSxPQUFPLFVBQVUsR0FBWSxPQUFPO0lBSTdCLG1CQUFtQixpQ0FBbkIsbUJBQW1COzs7Ozs7SUFZOUIsWUFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTFHLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBRnJILFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQUd6RCxJQUFJLENBQUMsYUFBYSxH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eEM7U0FiWSw0QkFBNEI7OztJQUV2QyxtREFBZ0Y7O0lBQ2hGLG1EQUFnRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIGZyb20gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgbWFwVG8sIGZpbHRlciwgdGFrZSwgc2tpcCwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBPbkRlc3Ryb3ksIEluamVjdG9yLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgaGFzU3RhdGUsIHNhdmVTdGF0ZSwgbG9hZFN0YXRlLCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMsIFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucyB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5pbXBvcnQgeyByZWdpc3RlckJ1aWx0SW5IYW5kbGVycyB9IGZyb20gJy4vY29yZS9idWlsdC1pbi1oYW5kbGVycy9fcmVnaXN0ZXInO1xuXG5pbXBvcnQgeyB1c2VyU2Vzc2lvblByZWYgfSBmcm9tICcuL3ByZXNldHMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvdGFibGUvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgc3RhdGU/OiB7XG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGVuYWJsZSB0aGUgc3RhdGUgcGx1Z2luIG9uIGFsbCB0YWJsZSBpbnN0YW5jZXMgYnkgZGVmYXVsdC4gKi9cbiAgICAgIGF1dG9FbmFibGU/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBPcHRpb25zIHRvIHVzZSB3aGVuIGF1dG8tbG9hZGluZyB0aGUgcGx1Z2luXG4gICAgICAgKi9cbiAgICAgIGF1dG9FbmFibGVPcHRpb25zPzoge1xuICAgICAgICBsb2FkT3B0aW9ucz86IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucztcbiAgICAgICAgc2F2ZU9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlU2F2ZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgc3RhdGU/OiBQYmxOZ3JpZFN0YXRlUGx1Z2luO1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgc3RhdGU6IGtleW9mIHR5cGVvZiBQYmxOZ3JpZFN0YXRlUGx1Z2luO1xuICB9XG59XG5cbmludGVyZmFjZSBJbnRlcm5hbFN0YXRlUGx1Z2luRXZlbnRzIHtcbiAgcGhhc2U6ICdsb2FkJyB8ICdzYXZlJztcbiAgcG9zaXRpb246ICdiZWZvcmUnIHwgJ2FmdGVyJztcbiAgZXJyb3I/OiBFcnJvcjtcbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdzdGF0ZScgPSAnc3RhdGUnO1xuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScsIHJ1bk9uY2U6IHJlZ2lzdGVyQnVpbHRJbkhhbmRsZXJzIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRTdGF0ZVBsdWdpbiB7XG5cbiAgbG9hZE9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnM7XG4gIHNhdmVPcHRpb25zPzogUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zO1xuXG4gIGFmdGVyTG9hZFN0YXRlOiBPYnNlcnZhYmxlPHZvaWQ+O1xuICBhZnRlclNhdmVTdGF0ZTogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgb25FcnJvcjogT2JzZXJ2YWJsZTx7IHBoYXNlOiAnc2F2ZScgfCAnbG9hZCc7IGVycm9yOiBFcnJvcjsgfT47XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgX2V2ZW50cyA9IG5ldyBTdWJqZWN0PEludGVybmFsU3RhdGVQbHVnaW5FdmVudHM+KCk7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByb3RlY3RlZCBpbmplY3RvcjogSW5qZWN0b3IsIHByb3RlY3RlZCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIHRoaXMuYWZ0ZXJMb2FkU3RhdGUgPSB0aGlzLl9ldmVudHMucGlwZShmaWx0ZXIoIGUgPT4gZS5waGFzZSA9PT0gJ2xvYWQnICYmIGUucG9zaXRpb24gPT09ICdhZnRlcicpLCBtYXBUbyh1bmRlZmluZWQpICk7XG4gICAgdGhpcy5hZnRlclNhdmVTdGF0ZSA9IHRoaXMuX2V2ZW50cy5waXBlKGZpbHRlciggZSA9PiBlLnBoYXNlID09PSAnc2F2ZScgJiYgZS5wb3NpdGlvbiA9PT0gJ2FmdGVyJyksIG1hcFRvKHVuZGVmaW5lZCkgKTtcbiAgICB0aGlzLm9uRXJyb3IgPSB0aGlzLl9ldmVudHMucGlwZShmaWx0ZXIoIGUgPT4gISFlLmVycm9yICksIG1hcCggZSA9PiAoeyBwaGFzZTogZS5waGFzZSwgZXJyb3I6IGUuZXJyb3IgfSkpICk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvbkludmFsaWRhdGVIZWFkZXJzJyksXG4gICAgICAgIHRha2UoMSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGluaXRpYWxMb2FkT3B0aW9ucyA9IHsgLi4uKHRoaXMubG9hZE9wdGlvbnMgfHwge30pLCBhdm9pZFJlZHJhdzogdHJ1ZSB9O1xuICAgICAgICBoYXNTdGF0ZShncmlkLCBpbml0aWFsTG9hZE9wdGlvbnMpXG4gICAgICAgICAgLnRoZW4oIHZhbHVlID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZChpbml0aWFsTG9hZE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oICgpID0+IHtcbiAgICAgICAgICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgZmlsdGVyKCBlID0+IGUua2luZCA9PT0gJ29uUmVzaXplUm93JyksXG4gICAgICAgICAgICAgIHNraXAoMSksXG4gICAgICAgICAgICAgIGRlYm91bmNlVGltZSg1MDApLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5zYXZlKCkgKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRlc3Ryb3knKSB7XG4gICAgICAgICAgZXZlbnQud2FpdCh0aGlzLnNhdmUoKSk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZSh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRTdGF0ZVBsdWdpbiB7XG4gICAgY29uc3QgcGx1Z2luQ3RybCA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKTtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkU3RhdGVQbHVnaW4odGFibGUsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIGxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvYWQodGhpcy5sb2FkT3B0aW9ucyk7XG4gIH1cblxuICBzYXZlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBzYXZlU3RhdGUodGhpcy5ncmlkLCB0aGlzLnNhdmVPcHRpb25zKVxuICAgICAgLnRoZW4oICgpID0+IHRoaXMuX2V2ZW50cy5uZXh0KHtwaGFzZTogJ3NhdmUnLCBwb3NpdGlvbjogJ2FmdGVyJ30pIClcbiAgICAgIC5jYXRjaCggZXJyb3IgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnc2F2ZScsIHBvc2l0aW9uOiAnYWZ0ZXInLCBlcnJvciB9KSApO1xuICB9XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy5ncmlkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWQobG9hZE9wdGlvbnM6IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBsb2FkU3RhdGUodGhpcy5ncmlkLCBsb2FkT3B0aW9ucylcbiAgICAgIC50aGVuKCAoKSA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdsb2FkJywgcG9zaXRpb246ICdhZnRlcid9KSApXG4gICAgICAuY2F0Y2goIGVycm9yID0+IHRoaXMuX2V2ZW50cy5uZXh0KHtwaGFzZTogJ2xvYWQnLCBwb3NpdGlvbjogJ2FmdGVyJywgZXJyb3IgfSkgKTtcbiAgfVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ3BibC1uZ3JpZFtwZXJzaXN0U3RhdGVdJywgLy8gdHNsaW50OmRpc2FibGUtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgb3V0cHV0czogWydhZnRlckxvYWRTdGF0ZScsICdhZnRlclNhdmVTdGF0ZScsICdvbkVycm9yJ10sXG59KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RhdGVQbHVnaW5EaXJlY3RpdmUgZXh0ZW5kcyBQYmxOZ3JpZFN0YXRlUGx1Z2luIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBsb2FkT3B0aW9uczogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zID0geyBpbmNsdWRlOiB1c2VyU2Vzc2lvblByZWYoKSB9O1xuICBASW5wdXQoKSBzYXZlT3B0aW9uczogUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zID0geyBpbmNsdWRlOiB1c2VyU2Vzc2lvblByZWYoKSB9O1xuXG4gIGNvbnN0cnVjdG9yKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgc3VwZXIoZ3JpZCwgaW5qZWN0b3IsIHBsdWdpbkN0cmwpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cblxufVxuIl19