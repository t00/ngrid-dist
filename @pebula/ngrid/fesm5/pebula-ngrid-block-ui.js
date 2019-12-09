import { Directive, TemplateRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridRegistryService, PblNgridSingleTemplateRegistry, PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridModule } from '@pebula/ngrid';
import { __extends, __values, __decorate, __metadata } from 'tslib';
import { isObservable } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UnRx } from '@pebula/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Marks the element as the display element when the form is busy.
 */
var PblNgridBlockUiDefDirective = /** @class */ (function (_super) {
    __extends(PblNgridBlockUiDefDirective, _super);
    function PblNgridBlockUiDefDirective(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'blocker';
        return _this;
    }
    PblNgridBlockUiDefDirective.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridBlockUiDef]' },] }
    ];
    /** @nocollapse */
    PblNgridBlockUiDefDirective.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    return PblNgridBlockUiDefDirective;
}(PblNgridSingleTemplateRegistry));
if (false) {
    /** @type {?} */
    PblNgridBlockUiDefDirective.prototype.kind;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
    PblNgridBlockUiPluginDirective = __decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        UnRx(),
        __metadata("design:paramtypes", [PblNgridComponent, PblNgridPluginController])
    ], PblNgridBlockUiPluginDirective);
    return PblNgridBlockUiPluginDirective;
}());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridBlockUiModule = /** @class */ (function () {
    function PblNgridBlockUiModule() {
    }
    PblNgridBlockUiModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, CdkTableModule, PblNgridModule],
                    declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                    exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
                },] }
    ];
    return PblNgridBlockUiModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridBlockUiModule, PblNgridBlockUiDefDirective as ɵa, PblNgridBlockUiPluginDirective as ɵb };
//# sourceMappingURL=pebula-ngrid-block-ui.js.map
