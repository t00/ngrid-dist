/**
 * @fileoverview added by tsickle
 * Generated from: lib/block-ui/block-ui-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __values } from "tslib";
import { isObservable } from 'rxjs';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { PblNgridComponent, PblNgridPluginController, utils } from '@pebula/ngrid';
/** @type {?} */
export var PLUGIN_KEY = 'blockUi';
/**
 * @template T
 */
var PblNgridBlockUiPluginDirective = /** @class */ (function () {
    function PblNgridBlockUiPluginDirective(grid, pluginCtrl) {
        var _this = this;
        this.grid = grid;
        this._blockInProgress = false;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        grid.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var e_1, _a;
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var c = changes_1_1.value;
                    switch (c.type) {
                        case 'blocker':
                            _this.setupBlocker();
                            break;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_a = changes_1.return)) _a.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event.kind === 'onDataSource') {
                var prev = event.prev, curr = event.curr;
                if (prev) {
                    utils.unrx.kill(_this, prev);
                }
                curr.onSourceChanging
                    .pipe(utils.unrx(_this, curr))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (_this._blockUi === 'auto') {
                        _this._blockInProgress = true;
                        _this.setupBlocker();
                    }
                }));
                curr.onSourceChanged
                    .pipe(utils.unrx(_this, curr))
                    .subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (_this._blockUi === 'auto') {
                        _this._blockInProgress = false;
                        _this.setupBlocker();
                    }
                }));
            }
        }));
    }
    Object.defineProperty(PblNgridBlockUiPluginDirective.prototype, "blockUi", {
        /**
         * Blocks the UI with the template defined via `PblNgridBlockUiDefDirective`.
         * If a template does not exist blocking is ignored.
         *
         * There are 3 operation modes, the modes are set based on the input value:
         *   - Auto mode (INPUT: 'auto')
         *     The UI will be blocked automatically based on datasource changes.
         *
         *    - Manual mode (INPUT: boolean)
         *     The UI will be block is toggled based on the value, i.e. `true` will block and false will unblock.
         *
         *   - Notification mode (INPUT: Observable<boolean>)
         *     Similar to Manual mode but controlled by a stream boolean value.
         *
         * **Note about Notification mode**
         * Notification mode accepts an observable, at the point where the value is set the block state does not change (if it was "on" it will stay "on" and vice versa)
         * It will only change on the first emission, this is important to understand.
         *
         * For example, if the current block state is off and we pass a `Subject`, the state remains off until the next emission
         * of the `Subject` is `true`. If it already emitted `true` before the assignment it will not be taken into account. This is why
         * using `BehaviouralSubject` is preferred.
         *
         * Also note that when sending an observable it is treated as "notifier", do not send cold observable as they get subscribed to.
         * For example, sending the returned value from `HttpClient` will probably result in 2 HTTP calls, if you already subscribed to it
         * > The default value is `auto` which means that `<pbl-ngrid blockUi>` is similar to `<pbl-ngrid blockUi="auto">`
         */
        get: /**
         * Blocks the UI with the template defined via `PblNgridBlockUiDefDirective`.
         * If a template does not exist blocking is ignored.
         *
         * There are 3 operation modes, the modes are set based on the input value:
         *   - Auto mode (INPUT: 'auto')
         *     The UI will be blocked automatically based on datasource changes.
         *
         *    - Manual mode (INPUT: boolean)
         *     The UI will be block is toggled based on the value, i.e. `true` will block and false will unblock.
         *
         *   - Notification mode (INPUT: Observable<boolean>)
         *     Similar to Manual mode but controlled by a stream boolean value.
         *
         * **Note about Notification mode**
         * Notification mode accepts an observable, at the point where the value is set the block state does not change (if it was "on" it will stay "on" and vice versa)
         * It will only change on the first emission, this is important to understand.
         *
         * For example, if the current block state is off and we pass a `Subject`, the state remains off until the next emission
         * of the `Subject` is `true`. If it already emitted `true` before the assignment it will not be taken into account. This is why
         * using `BehaviouralSubject` is preferred.
         *
         * Also note that when sending an observable it is treated as "notifier", do not send cold observable as they get subscribed to.
         * For example, sending the returned value from `HttpClient` will probably result in 2 HTTP calls, if you already subscribed to it
         * > The default value is `auto` which means that `<pbl-ngrid blockUi>` is similar to `<pbl-ngrid blockUi="auto">`
         * @return {?}
         */
        function () { return this._blockUi; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            /** @type {?} */
            var coerced = coerceBooleanProperty(value);
            if (coerced && (value === 'auto' || ((/** @type {?} */ (value))) === '')) {
                coerced = 'auto';
            }
            if (isObservable(value) && this._blockUi !== value) {
                if (isObservable(this._blockUi)) {
                    utils.unrx.kill(this, this._blockUi);
                }
                this._blockUi = value;
                value.pipe(utils.unrx(this, this._blockUi)).subscribe((/**
                 * @param {?} state
                 * @return {?}
                 */
                function (state) {
                    _this._blockInProgress = state;
                    _this.setupBlocker();
                }));
            }
            else if (this._blockUi !== coerced) {
                this._blockUi = coerced;
                if (coerced !== 'auto') {
                    this._blockInProgress = coerced;
                    this.setupBlocker();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PblNgridBlockUiPluginDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        utils.unrx.kill(this);
        this._removePlugin(this.grid);
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridBlockUiPluginDirective.prototype.setupBlocker = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var state = this._blockInProgress;
        if (state) {
            if (!this._blockerEmbeddedVRef) {
                /** @type {?} */
                var blockerTemplate = this.grid.registry.getSingle('blocker');
                if (blockerTemplate) {
                    this._blockerEmbeddedVRef = this.grid.createView('afterContent', blockerTemplate.tRef, { $implicit: this.grid });
                    this._blockerEmbeddedVRef.detectChanges();
                }
            }
        }
        else if (this._blockerEmbeddedVRef) {
            this.grid.removeView(this._blockerEmbeddedVRef, 'afterContent');
            this._blockerEmbeddedVRef = undefined;
        }
    };
    PblNgridBlockUiPluginDirective.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[blockUi]', exportAs: 'blockUi' },] }
    ];
    /** @nocollapse */
    PblNgridBlockUiPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController }
    ]; };
    PblNgridBlockUiPluginDirective.propDecorators = {
        blockUi: [{ type: Input }]
    };
    return PblNgridBlockUiPluginDirective;
}());
export { PblNgridBlockUiPluginDirective };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._blockInProgress;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._blockUi;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._blockerEmbeddedVRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridBlockUiPluginDirective.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stdWktcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFtQixLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRbkYsTUFBTSxLQUFPLFVBQVUsR0FBYyxTQUFTOzs7O0FBRTlDO0lBMkRFLHdDQUFvQixJQUE0QixFQUFFLFVBQXVDO1FBQXpGLGlCQXNDQztRQXRDbUIsU0FBSSxHQUFKLElBQUksQ0FBd0I7UUFMeEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBTXhDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUzs7OztRQUFFLFVBQUEsT0FBTzs7O2dCQUN0QyxLQUFnQixJQUFBLFlBQUEsU0FBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7b0JBQXBCLElBQU0sQ0FBQyxvQkFBQTtvQkFDVixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQ2QsS0FBSyxTQUFTOzRCQUNaLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsTUFBTTtxQkFDVDtpQkFDRjs7Ozs7Ozs7O1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsTUFBTTthQUNkLFNBQVM7Ozs7UUFBRSxVQUFBLEtBQUs7WUFDZixJQUFJLEtBQUss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Qjs7WUFDUSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjtRQUNuQyxJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7O29CQUN4QixlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDL0QsSUFBSSxlQUFlLEVBQUU7b0JBQ25CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztvQkFDakgsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUMzQzthQUNGO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFNBQVMsQ0FBQztTQUN2QztJQUNILENBQUM7O2dCQXZIRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTs7OztnQkFWekQsaUJBQWlCO2dCQUFFLHdCQUF3Qjs7OzBCQXVDakQsS0FBSzs7SUEyRlIscUNBQUM7Q0FBQSxBQXhIRCxJQXdIQztTQXZIWSw4QkFBOEI7Ozs7OztJQXFEekMsMERBQTBDOzs7OztJQUMxQyxrREFBeUQ7Ozs7O0lBQ3pELDhEQUFtRDs7Ozs7SUFDbkQsdURBQThEOzs7OztJQUVsRCw4Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCB1dGlscyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgYmxvY2tVaT86IHsgYmxvY2tVaTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4gfTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgUExVR0lOX0tFWTogJ2Jsb2NrVWknID0gJ2Jsb2NrVWknO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbYmxvY2tVaV0nLCBleHBvcnRBczogJ2Jsb2NrVWknIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCbG9ja1VpUGx1Z2luRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogQmxvY2tzIHRoZSBVSSB3aXRoIHRoZSB0ZW1wbGF0ZSBkZWZpbmVkIHZpYSBgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlYC5cbiAgICogSWYgYSB0ZW1wbGF0ZSBkb2VzIG5vdCBleGlzdCBibG9ja2luZyBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBUaGVyZSBhcmUgMyBvcGVyYXRpb24gbW9kZXMsIHRoZSBtb2RlcyBhcmUgc2V0IGJhc2VkIG9uIHRoZSBpbnB1dCB2YWx1ZTpcbiAgICogICAtIEF1dG8gbW9kZSAoSU5QVVQ6ICdhdXRvJylcbiAgICogICAgIFRoZSBVSSB3aWxsIGJlIGJsb2NrZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBkYXRhc291cmNlIGNoYW5nZXMuXG4gICAqXG4gICAqICAgIC0gTWFudWFsIG1vZGUgKElOUFVUOiBib29sZWFuKVxuICAgKiAgICAgVGhlIFVJIHdpbGwgYmUgYmxvY2sgaXMgdG9nZ2xlZCBiYXNlZCBvbiB0aGUgdmFsdWUsIGkuZS4gYHRydWVgIHdpbGwgYmxvY2sgYW5kIGZhbHNlIHdpbGwgdW5ibG9jay5cbiAgICpcbiAgICogICAtIE5vdGlmaWNhdGlvbiBtb2RlIChJTlBVVDogT2JzZXJ2YWJsZTxib29sZWFuPilcbiAgICogICAgIFNpbWlsYXIgdG8gTWFudWFsIG1vZGUgYnV0IGNvbnRyb2xsZWQgYnkgYSBzdHJlYW0gYm9vbGVhbiB2YWx1ZS5cbiAgICpcbiAgICogKipOb3RlIGFib3V0IE5vdGlmaWNhdGlvbiBtb2RlKipcbiAgICogTm90aWZpY2F0aW9uIG1vZGUgYWNjZXB0cyBhbiBvYnNlcnZhYmxlLCBhdCB0aGUgcG9pbnQgd2hlcmUgdGhlIHZhbHVlIGlzIHNldCB0aGUgYmxvY2sgc3RhdGUgZG9lcyBub3QgY2hhbmdlIChpZiBpdCB3YXMgXCJvblwiIGl0IHdpbGwgc3RheSBcIm9uXCIgYW5kIHZpY2UgdmVyc2EpXG4gICAqIEl0IHdpbGwgb25seSBjaGFuZ2Ugb24gdGhlIGZpcnN0IGVtaXNzaW9uLCB0aGlzIGlzIGltcG9ydGFudCB0byB1bmRlcnN0YW5kLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgdGhlIGN1cnJlbnQgYmxvY2sgc3RhdGUgaXMgb2ZmIGFuZCB3ZSBwYXNzIGEgYFN1YmplY3RgLCB0aGUgc3RhdGUgcmVtYWlucyBvZmYgdW50aWwgdGhlIG5leHQgZW1pc3Npb25cbiAgICogb2YgdGhlIGBTdWJqZWN0YCBpcyBgdHJ1ZWAuIElmIGl0IGFscmVhZHkgZW1pdHRlZCBgdHJ1ZWAgYmVmb3JlIHRoZSBhc3NpZ25tZW50IGl0IHdpbGwgbm90IGJlIHRha2VuIGludG8gYWNjb3VudC4gVGhpcyBpcyB3aHlcbiAgICogdXNpbmcgYEJlaGF2aW91cmFsU3ViamVjdGAgaXMgcHJlZmVycmVkLlxuICAgKlxuICAgKiBBbHNvIG5vdGUgdGhhdCB3aGVuIHNlbmRpbmcgYW4gb2JzZXJ2YWJsZSBpdCBpcyB0cmVhdGVkIGFzIFwibm90aWZpZXJcIiwgZG8gbm90IHNlbmQgY29sZCBvYnNlcnZhYmxlIGFzIHRoZXkgZ2V0IHN1YnNjcmliZWQgdG8uXG4gICAqIEZvciBleGFtcGxlLCBzZW5kaW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBmcm9tIGBIdHRwQ2xpZW50YCB3aWxsIHByb2JhYmx5IHJlc3VsdCBpbiAyIEhUVFAgY2FsbHMsIGlmIHlvdSBhbHJlYWR5IHN1YnNjcmliZWQgdG8gaXRcbiAgICogPiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYXV0b2Agd2hpY2ggbWVhbnMgdGhhdCBgPHBibC1uZ3JpZCBibG9ja1VpPmAgaXMgc2ltaWxhciB0byBgPHBibC1uZ3JpZCBibG9ja1VpPVwiYXV0b1wiPmBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBibG9ja1VpKCk6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+IHsgcmV0dXJuIHRoaXMuX2Jsb2NrVWk7IH1cbiAgc2V0IGJsb2NrVWkodmFsdWU6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+KSB7XG4gICAgbGV0IGNvZXJjZWQ6IGJvb2xlYW4gfCAnYXV0bycgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmIChjb2VyY2VkICYmICh2YWx1ZSA9PT0gJ2F1dG8nIHx8ICh2YWx1ZSBhcyBhbnkpID09PSAnJykpIHtcbiAgICAgIGNvZXJjZWQgPSAnYXV0byc7XG4gICAgfVxuXG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkgJiYgdGhpcy5fYmxvY2tVaSAhPT0gdmFsdWUpIHtcbiAgICAgIGlmIChpc09ic2VydmFibGUodGhpcy5fYmxvY2tVaSkpIHtcbiAgICAgICAgdXRpbHMudW5yeC5raWxsKHRoaXMsIHRoaXMuX2Jsb2NrVWkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYmxvY2tVaSA9IHZhbHVlO1xuICAgICAgdmFsdWUucGlwZSh1dGlscy51bnJ4KHRoaXMsIHRoaXMuX2Jsb2NrVWkpKS5zdWJzY3JpYmUoIHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5fYmxvY2tJblByb2dyZXNzID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Jsb2NrVWkgIT09IGNvZXJjZWQpIHtcbiAgICAgIHRoaXMuX2Jsb2NrVWkgPSBjb2VyY2VkO1xuICAgICAgaWYgKGNvZXJjZWQgIT09ICdhdXRvJykge1xuICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBjb2VyY2VkO1xuICAgICAgICB0aGlzLnNldHVwQmxvY2tlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Jsb2NrSW5Qcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9ibG9ja1VpOiBib29sZWFuIHwgJ2F1dG8nIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfYmxvY2tlckVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXI8VD4pIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGdyaWQucmVnaXN0cnkuY2hhbmdlcy5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdibG9ja2VyJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgY29uc3QgeyBwcmV2LCBjdXJyIH0gPSBldmVudDtcbiAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgdXRpbHMudW5yeC5raWxsKHRoaXMsIHByZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyLm9uU291cmNlQ2hhbmdpbmdcbiAgICAgICAgICAgIC5waXBlKHV0aWxzLnVucngodGhpcywgY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja1VpID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnIub25Tb3VyY2VDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMsIGN1cnIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tVaSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB1dGlscy51bnJ4LmtpbGwodGhpcyk7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMuZ3JpZCk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQmxvY2tlcigpOiB2b2lkIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2Jsb2NrSW5Qcm9ncmVzcztcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIGlmICghdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZikge1xuICAgICAgICBjb25zdCBibG9ja2VyVGVtcGxhdGUgPSB0aGlzLmdyaWQucmVnaXN0cnkuZ2V0U2luZ2xlKCdibG9ja2VyJyk7XG4gICAgICAgIGlmIChibG9ja2VyVGVtcGxhdGUpIHtcbiAgICAgICAgICB0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmID0gdGhpcy5ncmlkLmNyZWF0ZVZpZXcoJ2FmdGVyQ29udGVudCcsIGJsb2NrZXJUZW1wbGF0ZS50UmVmLCB7ICRpbXBsaWNpdDogdGhpcy5ncmlkIH0pO1xuICAgICAgICAgIHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmKSB7XG4gICAgICB0aGlzLmdyaWQucmVtb3ZlVmlldyh0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmLCAnYWZ0ZXJDb250ZW50Jyk7XG4gICAgICB0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19