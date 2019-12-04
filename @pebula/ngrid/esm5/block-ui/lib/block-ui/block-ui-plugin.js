/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { isObservable } from 'rxjs';
import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin } from '@pebula/ngrid';
/** @type {?} */
var PLUGIN_KEY = 'blockUi';
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
    PblNgridBlockUiPluginDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: PblNgridPluginController }
    ]; };
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
        NgridPlugin({ id: PLUGIN_KEY }),
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
    PblNgridBlockUiPluginDirective.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stdWktcGx1Z2luLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9ibG9jay11aS8iLCJzb3VyY2VzIjpbImxpYi9ibG9jay11aS9ibG9jay11aS1wbHVnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxTQUFTLEVBQW1CLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUM3RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUU5RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBUW5GLFVBQVUsR0FBYyxTQUFTOzs7OztJQStEckMsd0NBQW9CLElBQTRCLEVBQUUsVUFBdUM7UUFBekYsaUJBc0NDO1FBdENtQixTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUx4QyxxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFNeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUUsVUFBQSxPQUFPOzs7Z0JBQ3RDLEtBQWdCLElBQUEsWUFBQSxpQkFBQSxPQUFPLENBQUEsZ0NBQUEscURBQUU7b0JBQXBCLElBQU0sQ0FBQyxvQkFBQTtvQkFDVixRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUU7d0JBQ2QsS0FBSyxTQUFTOzRCQUNaLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs0QkFDcEIsTUFBTTtxQkFDVDtpQkFDRjs7Ozs7Ozs7O1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsTUFBTTthQUNkLFNBQVM7Ozs7UUFB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ZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRGlyZWN0aXZlLCBFbWJlZGRlZFZpZXdSZWYsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBibG9ja1VpPzogeyBibG9ja1VpOiBib29sZWFuIHwgJ2F1dG8nIHwgT2JzZXJ2YWJsZTxib29sZWFuPiB9O1xuICB9XG59XG5cbmNvbnN0IFBMVUdJTl9LRVk6ICdibG9ja1VpJyA9ICdibG9ja1VpJztcblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVkgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ3BibC1uZ3JpZFtibG9ja1VpXScsIGV4cG9ydEFzOiAnYmxvY2tVaScgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZEJsb2NrVWlQbHVnaW5EaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIC8qKlxuICAgKiBCbG9ja3MgdGhlIFVJIHdpdGggdGhlIHRlbXBsYXRlIGRlZmluZWQgdmlhIGBQYmxOZ3JpZEJsb2NrVWlEZWZEaXJlY3RpdmVgLlxuICAgKiBJZiBhIHRlbXBsYXRlIGRvZXMgbm90IGV4aXN0IGJsb2NraW5nIGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIFRoZXJlIGFyZSAzIG9wZXJhdGlvbiBtb2RlcywgdGhlIG1vZGVzIGFyZSBzZXQgYmFzZWQgb24gdGhlIGlucHV0IHZhbHVlOlxuICAgKiAgIC0gQXV0byBtb2RlIChJTlBVVDogJ2F1dG8nKVxuICAgKiAgICAgVGhlIFVJIHdpbGwgYmUgYmxvY2tlZCBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIGRhdGFzb3VyY2UgY2hhbmdlcy5cbiAgICpcbiAgICogICAgLSBNYW51YWwgbW9kZSAoSU5QVVQ6IGJvb2xlYW4pXG4gICAqICAgICBUaGUgVUkgd2lsbCBiZSBibG9jayBpcyB0b2dnbGVkIGJhc2VkIG9uIHRoZSB2YWx1ZSwgaS5lLiBgdHJ1ZWAgd2lsbCBibG9jayBhbmQgZmFsc2Ugd2lsbCB1bmJsb2NrLlxuICAgKlxuICAgKiAgIC0gTm90aWZpY2F0aW9uIG1vZGUgKElOUFVUOiBPYnNlcnZhYmxlPGJvb2xlYW4+KVxuICAgKiAgICAgU2ltaWxhciB0byBNYW51YWwgbW9kZSBidXQgY29udHJvbGxlZCBieSBhIHN0cmVhbSBib29sZWFuIHZhbHVlLlxuICAgKlxuICAgKiAqKk5vdGUgYWJvdXQgTm90aWZpY2F0aW9uIG1vZGUqKlxuICAgKiBOb3RpZmljYXRpb24gbW9kZSBhY2NlcHRzIGFuIG9ic2VydmFibGUsIGF0IHRoZSBwb2ludCB3aGVyZSB0aGUgdmFsdWUgaXMgc2V0IHRoZSBibG9jayBzdGF0ZSBkb2VzIG5vdCBjaGFuZ2UgKGlmIGl0IHdhcyBcIm9uXCIgaXQgd2lsbCBzdGF5IFwib25cIiBhbmQgdmljZSB2ZXJzYSlcbiAgICogSXQgd2lsbCBvbmx5IGNoYW5nZSBvbiB0aGUgZmlyc3QgZW1pc3Npb24sIHRoaXMgaXMgaW1wb3J0YW50IHRvIHVuZGVyc3RhbmQuXG4gICAqXG4gICAqIEZvciBleGFtcGxlLCBpZiB0aGUgY3VycmVudCBibG9jayBzdGF0ZSBpcyBvZmYgYW5kIHdlIHBhc3MgYSBgU3ViamVjdGAsIHRoZSBzdGF0ZSByZW1haW5zIG9mZiB1bnRpbCB0aGUgbmV4dCBlbWlzc2lvblxuICAgKiBvZiB0aGUgYFN1YmplY3RgIGlzIGB0cnVlYC4gSWYgaXQgYWxyZWFkeSBlbWl0dGVkIGB0cnVlYCBiZWZvcmUgdGhlIGFzc2lnbm1lbnQgaXQgd2lsbCBub3QgYmUgdGFrZW4gaW50byBhY2NvdW50LiBUaGlzIGlzIHdoeVxuICAgKiB1c2luZyBgQmVoYXZpb3VyYWxTdWJqZWN0YCBpcyBwcmVmZXJyZWQuXG4gICAqXG4gICAqIEFsc28gbm90ZSB0aGF0IHdoZW4gc2VuZGluZyBhbiBvYnNlcnZhYmxlIGl0IGlzIHRyZWF0ZWQgYXMgXCJub3RpZmllclwiLCBkbyBub3Qgc2VuZCBjb2xkIG9ic2VydmFibGUgYXMgdGhleSBnZXQgc3Vic2NyaWJlZCB0by5cbiAgICogRm9yIGV4YW1wbGUsIHNlbmRpbmcgdGhlIHJldHVybmVkIHZhbHVlIGZyb20gYEh0dHBDbGllbnRgIHdpbGwgcHJvYmFibHkgcmVzdWx0IGluIDIgSFRUUCBjYWxscywgaWYgeW91IGFscmVhZHkgc3Vic2NyaWJlZCB0byBpdFxuICAgKiA+IFRoZSBkZWZhdWx0IHZhbHVlIGlzIGBhdXRvYCB3aGljaCBtZWFucyB0aGF0IGA8cGJsLW5ncmlkIGJsb2NrVWk+YCBpcyBzaW1pbGFyIHRvIGA8cGJsLW5ncmlkIGJsb2NrVWk9XCJhdXRvXCI+YFxuICAgKi9cbiAgQElucHV0KCkgZ2V0IGJsb2NrVWkoKTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4geyByZXR1cm4gdGhpcy5fYmxvY2tVaTsgfVxuICBzZXQgYmxvY2tVaSh2YWx1ZTogYm9vbGVhbiB8ICdhdXRvJyB8IE9ic2VydmFibGU8Ym9vbGVhbj4pIHtcbiAgICBsZXQgY29lcmNlZDogYm9vbGVhbiB8ICdhdXRvJyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgaWYgKGNvZXJjZWQgJiYgKHZhbHVlID09PSAnYXV0bycgfHwgKHZhbHVlIGFzIGFueSkgPT09ICcnKSkge1xuICAgICAgY29lcmNlZCA9ICdhdXRvJztcbiAgICB9XG5cbiAgICBpZiAoaXNPYnNlcnZhYmxlKHZhbHVlKSAmJiB0aGlzLl9ibG9ja1VpICE9PSB2YWx1ZSkge1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZSh0aGlzLl9ibG9ja1VpKSkge1xuICAgICAgICBVblJ4LmtpbGwodGhpcywgdGhpcy5fYmxvY2tVaSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9ibG9ja1VpID0gdmFsdWU7XG4gICAgICB2YWx1ZS5waXBlKFVuUngodGhpcywgdGhpcy5fYmxvY2tVaSkpLnN1YnNjcmliZSggc3RhdGUgPT4ge1xuICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fYmxvY2tVaSAhPT0gY29lcmNlZCkge1xuICAgICAgdGhpcy5fYmxvY2tVaSA9IGNvZXJjZWQ7XG4gICAgICBpZiAoY29lcmNlZCAhPT0gJ2F1dG8nKSB7XG4gICAgICAgIHRoaXMuX2Jsb2NrSW5Qcm9ncmVzcyA9IGNvZXJjZWQ7XG4gICAgICAgIHRoaXMuc2V0dXBCbG9ja2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYmxvY2tJblByb2dyZXNzOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX2Jsb2NrVWk6IGJvb2xlYW4gfCAnYXV0bycgfCBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcml2YXRlIF9ibG9ja2VyRW1iZWRkZWRWUmVmOiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAoZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcjxUPikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgZ3JpZC5yZWdpc3RyeS5jaGFuZ2VzLnN1YnNjcmliZSggY2hhbmdlcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgY2hhbmdlcykge1xuICAgICAgICBzd2l0Y2ggKGMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2Jsb2NrZXInOlxuICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uRGF0YVNvdXJjZScpIHtcbiAgICAgICAgICBjb25zdCB7IHByZXYsIGN1cnIgfSA9IGV2ZW50O1xuICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBVblJ4LmtpbGwodGhpcywgcHJldik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnIub25Tb3VyY2VDaGFuZ2luZ1xuICAgICAgICAgICAgLnBpcGUoVW5SeCh0aGlzLCBjdXJyKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoICgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuX2Jsb2NrVWkgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Jsb2NrSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR1cEJsb2NrZXIoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgY3Vyci5vblNvdXJjZUNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKFVuUngodGhpcywgY3VycikpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9ibG9ja1VpID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ibG9ja0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwQmxvY2tlcigpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLmdyaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEJsb2NrZXIoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLl9ibG9ja0luUHJvZ3Jlc3M7XG4gICAgaWYgKHN0YXRlKSB7XG4gICAgICBpZiAoIXRoaXMuX2Jsb2NrZXJFbWJlZGRlZFZSZWYpIHtcbiAgICAgICAgY29uc3QgYmxvY2tlclRlbXBsYXRlID0gdGhpcy5ncmlkLnJlZ2lzdHJ5LmdldFNpbmdsZSgnYmxvY2tlcicpO1xuICAgICAgICBpZiAoYmxvY2tlclRlbXBsYXRlKSB7XG4gICAgICAgICAgdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZiA9IHRoaXMuZ3JpZC5jcmVhdGVWaWV3KCdhZnRlckNvbnRlbnQnLCBibG9ja2VyVGVtcGxhdGUudFJlZiwgeyAkaW1wbGljaXQ6IHRoaXMuZ3JpZCB9KTtcbiAgICAgICAgICB0aGlzLl9ibG9ja2VyRW1iZWRkZWRWUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZikge1xuICAgICAgdGhpcy5ncmlkLnJlbW92ZVZpZXcodGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZiwgJ2FmdGVyQ29udGVudCcpO1xuICAgICAgdGhpcy5fYmxvY2tlckVtYmVkZGVkVlJlZiA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==