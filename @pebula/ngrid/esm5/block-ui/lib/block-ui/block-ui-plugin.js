/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isObservable } from 'rxjs';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, TablePlugin } from '@pebula/ngrid';
/** @type {?} */
var PLUGIN_KEY = 'blockUi';
/**
 * @template T
 */
var PblNgridBlockUiPluginDirective = /** @class */ (function () {
    function PblNgridBlockUiPluginDirective(table, pluginCtrl) {
        var _this = this;
        this.table = table;
        this._blockInProgress = false;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        table.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        function (changes) {
            var e_1, _a;
            try {
                for (var changes_1 = tslib_1.__values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
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
                    UnRx.kill(_this, prev);
                }
                curr.onSourceChanging
                    .pipe(UnRx(_this, curr))
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
                    .pipe(UnRx(_this, curr))
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
                    UnRx.kill(this, this._blockUi);
                }
                this._blockUi = value;
                value.pipe(UnRx(this, this._blockUi)).subscribe((/**
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
        this._removePlugin(this.table);
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
                var blockerTemplate = this.table.registry.getSingle('blocker');
                if (blockerTemplate) {
                    this._blockerEmbeddedVRef = this.table.createView('afterContent', blockerTemplate.tRef, { $implicit: this.table });
                    this._blockerEmbeddedVRef.detectChanges();
                }
            }
        }
        else if (this._blockerEmbeddedVRef) {
            this.table.removeView(this._blockerEmbeddedVRef, 'afterContent');
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
    /**
     * @template T
     */
    PblNgridBlockUiPluginDirective = tslib_1.__decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController])
    ], PblNgridBlockUiPluginDirective);
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
    PblNgridBlockUiPluginDirective.prototype.table;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stdWktcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBUW5GLFVBQVUsR0FBYyxTQUFTOzs7OztJQStEckMsd0NBQW9CLEtBQTZCLEVBQUUsVUFBdUM7UUFBMUYsaUJBc0NDO1FBdENtQixVQUFLLEdBQUwsS0FBSyxDQUF3QjtRQUx6QyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFNeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1RCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxPQUFPOzs7Z0JBQ3ZDLEtBQWdCLElBQUEsWUFBQSxpQkFBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7b0JBQXBCLElBQU0sQ0FBQyxvQkFBQTtvQkFDVixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQ2QsS0FBSyxTQUFTOzRCQUNaLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsTUFBTTtxQkFDVDtpQkFDRjs7Ozs7Ozs7O1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsTUFBTTthQUNkLFNBQVM7Ozs7UUFB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SSxDQUFDLG9CQUFvQixFQUFFOztvQkFDeEIsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hFLElBQUksZUFBZSxFQUFFO29CQUNuQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7b0JBQ25ILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDM0M7YUFDRjtTQUNGO2FBQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUM7U0FDdkM7SUFDSCxDQUFDOztnQkF2SEYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7Ozs7Z0JBWHpELGlCQUFpQjtnQkFBRSx3QkFBd0I7OzswQkF5Q2pELEtBQUs7Ozs7O0lBNUJLLDhCQUE4QjtRQUgxQyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFFL0IsSUFBSSxFQUFFO2lEQTJEc0IsaUJBQWlCLEVBQW1CLHdCQUF3QjtPQTFENUUsOEJBQThCLENBc0gxQztJQUFELHFDQUFDO0NBQUEsSUFBQTtTQXRIWSw4QkFBOEI7Ozs7OztJQXFEekMsMERBQTBDOzs7OztJQUMxQyxrREFBeUQ7Ozs7O0lBQ3pELDhEQUFtRDs7Ozs7SUFDbkQsdURBQStEOzs7OztJQUVuRCwrQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRW1iZWRkZWRWaWV3UmVmLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgYmxvY2tVaT86IHsgYmxvY2tVaTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4gfTtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAnYmxvY2tVaScgPSAnYmxvY2tVaSc7XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdwYmwtbmdyaWRbYmxvY2tVaV0nLCBleHBvcnRBczogJ2Jsb2NrVWknIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRCbG9ja1VpUGx1Z2luRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAvKipcbiAgICogQmxvY2tzIHRoZSBVSSB3aXRoIHRoZSB0ZW1wbGF0ZSBkZWZpbmVkIHZpYSBgUGJsTmdyaWRCbG9ja1VpRGVmRGlyZWN0aXZlYC5cbiAgICogSWYgYSB0ZW1wbGF0ZSBkb2VzIG5vdCBleGlzdCBibG9ja2luZyBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBUaGVyZSBhcmUgMyBvcGVyYXRpb24gbW9kZXMsIHRoZSBtb2RlcyBhcmUgc2V0IGJhc2VkIG9uIHRoZSBpbnB1dCB2YWx1ZTpcbiAgICogICAtIEF1dG8gbW9kZSAoSU5QVVQ6ICdhdXRvJylcbiAgICogICAgIFRoZSBVSSB3aWxsIGJlIGJsb2NrZWQgYXV0b21hdGljYWxseSBiYXNlZCBvbiBkYXRhc291cmNlIGNoYW5nZXMuXG4gICAqXG4gICAqICAgIC0gTWFudWFsIG1vZGUgKElOUFVUOiBib29sZWFuKVxuICAgKiAgICAgVGhlIFVJIHdpbGwgYmUgYmxvY2sgaXMgdG9nZ2xlZCBiYXNlZCBvbiB0aGUgdmFsdWUsIGkuZS4gYHRydWVgIHdpbGwgYmxvY2sgYW5kIGZhbHNlIHdpbGwgdW5ibG9jay5cbiAgICpcbiAgICogICAtIE5vdGlmaWNhdGlvbiBtb2RlIChJTlBVVDogT2JzZXJ2YWJsZTxib29sZWFuPilcbiAgICogICAgIFNpbWlsYXIgdG8gTWFudWFsIG1vZGUgYnV0IGNvbnRyb2xsZWQgYnkgYSBzdHJlYW0gYm9vbGVhbiB2YWx1ZS5cbiAgICpcbiAgICogKipOb3RlIGFib3V0IE5vdGlmaWNhdGlvbiBtb2RlKipcbiAgICogTm90aWZpY2F0aW9uIG1vZGUgYWNjZXB0cyBhbiBvYnNlcnZhYmxlLCBhdCB0aGUgcG9pbnQgd2hlcmUgdGhlIHZhbHVlIGlzIHNldCB0aGUgYmxvY2sgc3RhdGUgZG9lcyBub3QgY2hhbmdlIChpZiBpdCB3YXMgXCJvblwiIGl0IHdpbGwgc3RheSBcIm9uXCIgYW5kIHZpY2UgdmVyc2EpXG4gICAqIEl0IHdpbGwgb25seSBjaGFuZ2Ugb24gdGhlIGZpcnN0IGVtaXNzaW9uLCB0aGlzIGlzIGltcG9ydGFudCB0byB1bmRlcnN0YW5kLlxuICAgKlxuICAgKiBGb3IgZXhhbXBsZSwgaWYgdGhlIGN1cnJlbnQgYmxvY2sgc3RhdGUgaXMgb2ZmIGFuZCB3ZSBwYXNzIGEgYFN1YmplY3RgLCB0aGUgc3RhdGUgcmVtYWlucyBvZmYgdW50aWwgdGhlIG5leHQgZW1pc3Npb25cbiAgICogb2YgdGhlIGBTdWJqZWN0YCBpcyBgdHJ1ZWAuIElmIGl0IGFscmVhZHkgZW1pdHRlZCBgdHJ1ZWAgYmVmb3JlIHRoZSBhc3NpZ25tZW50IGl0IHdpbGwgbm90IGJlIHRha2VuIGludG8gYWNjb3VudC4gVGhpcyBpcyB3aHlcbiAgICogdXNpbmcgYEJlaGF2aW91cmFsU3ViamVjdGAgaXMgcHJlZmVycmVkLlxuICAgKlxuICAgKiBBbHNvIG5vdGUgdGhhdCB3aGVuIHNlbmRpbmcgYW4gb2JzZXJ2YWJsZSBpdCBpcyB0cmVhdGVkIGFzIFwibm90aWZpZXJcIiwgZG8gbm90IHNlbmQgY29sZCBvYnNlcnZhYmxlIGFzIHRoZXkgZ2V0IHN1YnNjcmliZWQgdG8uXG4gICAqIEZvciBleGFtcGxlLCBzZW5kaW5nIHRoZSByZXR1cm5lZCB2YWx1ZSBmcm9tIGBIdHRwQ2xpZW50YCB3aWxsIHByb2JhYmx5IHJlc3VsdCBpbiAyIEhUVFAgY2FsbHMsIGlmIHlvdSBhbHJlYWR5IHN1YnNjcmliZWQgdG8gaXRcbiAgICogPiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBgYXV0b2Agd2hpY2ggbWVhbnMgdGhhdCBgPHBibC1uZ3JpZCBibG9ja1VpPmAgaXMgc2ltaWxhciB0byBgPHBibC1uZ3JpZCBibG9ja1VpPVwiYXV0b1wiPmBcbiAgICovXG4gIEBJbnB1dCgpIGdldCBibG9ja1VpKCk6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+IHsgcmV0dXJuIHRoaXMuX2Jsb2NrVWk7IH1cbiAgc2V0IGJsb2NrVWkodmFsdWU6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+KSB7XG4gICAgbGV0IGNvZXJjZWQ6IGJvb2xlYW4gfCAnYXV0bycgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgIGlmIChjb2VyY2VkICYmICh2YWx1ZSA9PT0gJ2F1dG8nIHx8ICh2YWx1ZSBhcyBhbnkpID09PSAnJykpIHtcbiAgICAgIGNvZXJjZWQgPSAnYXV0byc7XG4gICAgfVxuXG4gICAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkgJiYgdGhpcy5fYmxvY2tVaSAhPT0gdmFsdWUpIHtcbiAgICAgIGlmIChpc09ic2VydmFibGUodGhpcy5fYmxvY2tVaSkpIHtcbiAgICAgICAgVW5SeC5raWxsKHRoaXMsIHRoaXMuX2Jsb2NrVWkpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYmxvY2tVaSA9IHZhbHVlO1xuICAgICAgdmFsdWUucGlwZShVblJ4KHRoaXMsIHRoaXMuX2Jsb2NrVWkpKS5zdWJzY3JpYmUoIHN0YXRlID0+IHtcbiAgICAgICAgdGhpcy5fYmxvY2tJblByb2dyZXNzID0gc3RhdGU7XG4gICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2Jsb2NrVWkgIT09IGNvZXJjZWQpIHtcbiAgICAgIHRoaXMuX2Jsb2NrVWkgPSBjb2VyY2VkO1xuICAgICAgaWYgKGNvZXJjZWQgIT09ICdhdXRvJykge1xuICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBjb2VyY2VkO1xuICAgICAgICB0aGlzLnNldHVwQmxvY2tlcigpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Jsb2NrSW5Qcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9ibG9ja1VpOiBib29sZWFuIHwgJ2F1dG8nIHwgT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcHJpdmF0ZSBfYmxvY2tlckVtYmVkZGVkVlJlZjogRW1iZWRkZWRWaWV3UmVmPGFueT47XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgdGFibGUucmVnaXN0cnkuY2hhbmdlcy5zdWJzY3JpYmUoIGNoYW5nZXMgPT4ge1xuICAgICAgZm9yIChjb25zdCBjIG9mIGNoYW5nZXMpIHtcbiAgICAgICAgc3dpdGNoIChjLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdibG9ja2VyJzpcbiAgICAgICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkRhdGFTb3VyY2UnKSB7XG4gICAgICAgICAgY29uc3QgeyBwcmV2LCBjdXJyIH0gPSBldmVudDtcbiAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgVW5SeC5raWxsKHRoaXMsIHByZXYpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJyLm9uU291cmNlQ2hhbmdpbmdcbiAgICAgICAgICAgIC5waXBlKFVuUngodGhpcywgY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja1VpID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGN1cnIub25Tb3VyY2VDaGFuZ2VkXG4gICAgICAgICAgICAucGlwZShVblJ4KHRoaXMsIGN1cnIpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSggKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fYmxvY2tVaSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmxvY2tJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gIH1cblxuICBwcml2YXRlIHNldHVwQmxvY2tlcigpOiB2b2lkIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuX2Jsb2NrSW5Qcm9ncmVzcztcbiAgICBpZiAoc3RhdGUpIHtcbiAgICAgIGlmICghdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZikge1xuICAgICAgICBjb25zdCBibG9ja2VyVGVtcGxhdGUgPSB0aGlzLnRhYmxlLnJlZ2lzdHJ5LmdldFNpbmdsZSgnYmxvY2tlcicpO1xuICAgICAgICBpZiAoYmxvY2tlclRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZiA9IHRoaXMudGFibGUuY3JlYXRlVmlldygnYWZ0ZXJDb250ZW50JywgYmxvY2tlclRlbXBsYXRlLnRSZWYsIHsgJGltcGxpY2l0OiB0aGlzLnRhYmxlIH0pO1xuICAgICAgICAgIHRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmKSB7XG4gICAgICB0aGlzLnRhYmxlLnJlbW92ZVZpZXcodGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZiwgJ2FmdGVyQ29udGVudCcpO1xuICAgICAgdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==