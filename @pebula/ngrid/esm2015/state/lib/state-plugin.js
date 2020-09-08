/**
 * @fileoverview added by tsickle
 * Generated from: lib/state-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
import { map, mapTo, filter, take, skip, debounceTime } from 'rxjs/operators';
import { Directive, Injector, Input } from '@angular/core';
import { PblNgridComponent, PblNgridPluginController } from '@pebula/ngrid';
import { hasState, saveState, loadState } from './core/index';
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
export class PblNgridStatePlugin {
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
            const initialLoadOptions = Object.assign(Object.assign({}, (this.loadOptions || {})), { avoidRedraw: true });
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
        return new PblNgridStatePlugin(table, injector, pluginCtrl);
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
}
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
export class PblNgridStatePluginDirective extends PblNgridStatePlugin {
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
}
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
if (false) {
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.loadOptions;
    /** @type {?} */
    PblNgridStatePluginDirective.prototype.saveOptions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9zdGF0ZS8iLCJzb3VyY2VzIjpbImxpYi9zdGF0ZS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFvQixNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUsU0FBUyxFQUFhLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBc0QsTUFBTSxjQUFjLENBQUM7QUFFbEgsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQTJCNUMsd0NBSUM7OztJQUhDLDBDQUF1Qjs7SUFDdkIsNkNBQTZCOztJQUM3QiwwQ0FBYzs7O0FBR2hCLE1BQU0sT0FBTyxVQUFVLEdBQVksT0FBTztBQUUxQyxNQUFNLE9BQU8sbUJBQW1COzs7Ozs7SUFZOUIsWUFBbUIsSUFBNEIsRUFBWSxRQUFrQixFQUFZLFVBQW9DO1FBQTFHLFNBQUksR0FBSixJQUFJLENBQXdCO1FBQVksYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUFZLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBRnJILFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBNkIsQ0FBQztRQUd6RCxJQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTTs7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RSxZQUFZLElBQTRCLEVBQUUsUUFBa0IsRUFBRSxVQUFvQztRQUNoRyxLQUFLLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUozQixnQkFBVyxHQUE2QixFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxDQUFDO1FBQ3ZFLGdCQUFXLEdBQTZCLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxFQUFFLENBQUM7SUFJaEYsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzs7O1lBZkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx5QkFBeUI7O2dCQUNuQyxPQUFPLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUM7YUFDekQ7Ozs7WUF4SFEsaUJBQWlCO1lBRkssUUFBUTtZQUVYLHdCQUF3Qjs7OzBCQTJIakQsS0FBSzswQkFDTCxLQUFLOzs7O0lBRE4sbURBQWdGOztJQUNoRixtREFBZ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG1hcFRvLCBmaWx0ZXIsIHRha2UsIHNraXAsIGRlYm91bmNlVGltZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgT25EZXN0cm95LCBJbmplY3RvciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgaGFzU3RhdGUsIHNhdmVTdGF0ZSwgbG9hZFN0YXRlLCBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMsIFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucyB9IGZyb20gJy4vY29yZS9pbmRleCc7XG5cbmltcG9ydCB7IHVzZXJTZXNzaW9uUHJlZiB9IGZyb20gJy4vcHJlc2V0cyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIHN0YXRlPzoge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBlbmFibGUgdGhlIHN0YXRlIHBsdWdpbiBvbiBhbGwgdGFibGUgaW5zdGFuY2VzIGJ5IGRlZmF1bHQuICovXG4gICAgICBhdXRvRW5hYmxlPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogT3B0aW9ucyB0byB1c2Ugd2hlbiBhdXRvLWxvYWRpbmcgdGhlIHBsdWdpblxuICAgICAgICovXG4gICAgICBhdXRvRW5hYmxlT3B0aW9ucz86IHtcbiAgICAgICAgbG9hZE9wdGlvbnM/OiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnM7XG4gICAgICAgIHNhdmVPcHRpb25zPzogUGJsTmdyaWRTdGF0ZVNhdmVPcHRpb25zO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIHN0YXRlPzogUGJsTmdyaWRTdGF0ZVBsdWdpbjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIHN0YXRlOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRTdGF0ZVBsdWdpbjtcbiAgfVxufVxuXG5pbnRlcmZhY2UgSW50ZXJuYWxTdGF0ZVBsdWdpbkV2ZW50cyB7XG4gIHBoYXNlOiAnbG9hZCcgfCAnc2F2ZSc7XG4gIHBvc2l0aW9uOiAnYmVmb3JlJyB8ICdhZnRlcic7XG4gIGVycm9yPzogRXJyb3I7XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnc3RhdGUnID0gJ3N0YXRlJztcblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkU3RhdGVQbHVnaW4ge1xuXG4gIGxvYWRPcHRpb25zPzogUGJsTmdyaWRTdGF0ZUxvYWRPcHRpb25zO1xuICBzYXZlT3B0aW9ucz86IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucztcblxuICBhZnRlckxvYWRTdGF0ZTogT2JzZXJ2YWJsZTx2b2lkPjtcbiAgYWZ0ZXJTYXZlU3RhdGU6IE9ic2VydmFibGU8dm9pZD47XG4gIG9uRXJyb3I6IE9ic2VydmFibGU8eyBwaGFzZTogJ3NhdmUnIHwgJ2xvYWQnOyBlcnJvcjogRXJyb3I7IH0+O1xuXG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9ldmVudHMgPSBuZXcgU3ViamVjdDxJbnRlcm5hbFN0YXRlUGx1Z2luRXZlbnRzPigpO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLCBwcm90ZWN0ZWQgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICB0aGlzLmFmdGVyTG9hZFN0YXRlID0gdGhpcy5fZXZlbnRzLnBpcGUoZmlsdGVyKCBlID0+IGUucGhhc2UgPT09ICdsb2FkJyAmJiBlLnBvc2l0aW9uID09PSAnYWZ0ZXInKSwgbWFwVG8odW5kZWZpbmVkKSApO1xuICAgIHRoaXMuYWZ0ZXJTYXZlU3RhdGUgPSB0aGlzLl9ldmVudHMucGlwZShmaWx0ZXIoIGUgPT4gZS5waGFzZSA9PT0gJ3NhdmUnICYmIGUucG9zaXRpb24gPT09ICdhZnRlcicpLCBtYXBUbyh1bmRlZmluZWQpICk7XG4gICAgdGhpcy5vbkVycm9yID0gdGhpcy5fZXZlbnRzLnBpcGUoZmlsdGVyKCBlID0+ICEhZS5lcnJvciApLCBtYXAoIGUgPT4gKHsgcGhhc2U6IGUucGhhc2UsIGVycm9yOiBlLmVycm9yIH0pKSApO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoIGUgPT4gZS5raW5kID09PSAnb25JbnZhbGlkYXRlSGVhZGVycycpLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpbml0aWFsTG9hZE9wdGlvbnMgPSB7IC4uLih0aGlzLmxvYWRPcHRpb25zIHx8IHt9KSwgYXZvaWRSZWRyYXc6IHRydWUgfTtcbiAgICAgICAgaGFzU3RhdGUoZ3JpZCwgaW5pdGlhbExvYWRPcHRpb25zKVxuICAgICAgICAgIC50aGVuKCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWQoaW5pdGlhbExvYWRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIGZpbHRlciggZSA9PiBlLmtpbmQgPT09ICdvblJlc2l6ZVJvdycpLFxuICAgICAgICAgICAgICBza2lwKDEpLFxuICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoNTAwKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuc2F2ZSgpICk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25EZXN0cm95Jykge1xuICAgICAgICAgIGV2ZW50LndhaXQodGhpcy5zYXZlKCkpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50cy5jb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGUodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkU3RhdGVQbHVnaW4ge1xuICAgIGNvbnN0IHBsdWdpbkN0cmwgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSk7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZFN0YXRlUGx1Z2luKHRhYmxlLCBpbmplY3RvciwgcGx1Z2luQ3RybCk7XG4gIH1cblxuICBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9sb2FkKHRoaXMubG9hZE9wdGlvbnMpO1xuICB9XG5cbiAgc2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gc2F2ZVN0YXRlKHRoaXMuZ3JpZCwgdGhpcy5zYXZlT3B0aW9ucylcbiAgICAgIC50aGVuKCAoKSA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdzYXZlJywgcG9zaXRpb246ICdhZnRlcid9KSApXG4gICAgICAuY2F0Y2goIGVycm9yID0+IHRoaXMuX2V2ZW50cy5uZXh0KHtwaGFzZTogJ3NhdmUnLCBwb3NpdGlvbjogJ2FmdGVyJywgZXJyb3IgfSkgKTtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cblxuICBwcml2YXRlIF9sb2FkKGxvYWRPcHRpb25zOiBQYmxOZ3JpZFN0YXRlTG9hZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbG9hZFN0YXRlKHRoaXMuZ3JpZCwgbG9hZE9wdGlvbnMpXG4gICAgICAudGhlbiggKCkgPT4gdGhpcy5fZXZlbnRzLm5leHQoe3BoYXNlOiAnbG9hZCcsIHBvc2l0aW9uOiAnYWZ0ZXInfSkgKVxuICAgICAgLmNhdGNoKCBlcnJvciA9PiB0aGlzLl9ldmVudHMubmV4dCh7cGhhc2U6ICdsb2FkJywgcG9zaXRpb246ICdhZnRlcicsIGVycm9yIH0pICk7XG4gIH1cblxufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdwYmwtbmdyaWRbcGVyc2lzdFN0YXRlXScsIC8vIHRzbGludDpkaXNhYmxlLWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gIG91dHB1dHM6IFsnYWZ0ZXJMb2FkU3RhdGUnLCAnYWZ0ZXJTYXZlU3RhdGUnLCAnb25FcnJvciddLFxufSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZFN0YXRlUGx1Z2luRGlyZWN0aXZlIGV4dGVuZHMgUGJsTmdyaWRTdGF0ZVBsdWdpbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgbG9hZE9wdGlvbnM6IFBibE5ncmlkU3RhdGVMb2FkT3B0aW9ucyA9IHsgaW5jbHVkZTogdXNlclNlc3Npb25QcmVmKCkgfTtcbiAgQElucHV0KCkgc2F2ZU9wdGlvbnM6IFBibE5ncmlkU3RhdGVTYXZlT3B0aW9ucyA9IHsgaW5jbHVkZTogdXNlclNlc3Npb25QcmVmKCkgfTtcblxuICBjb25zdHJ1Y3RvcihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHN1cGVyKGdyaWQsIGluamVjdG9yLCBwbHVnaW5DdHJsKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG5cbn1cbiJdfQ==