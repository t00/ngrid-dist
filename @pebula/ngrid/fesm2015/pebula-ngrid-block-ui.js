import { Directive, TemplateRef, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { PblNgridSingleTemplateRegistry, PblNgridRegistryService, utils, PblNgridComponent, PblNgridPluginController, ngridPlugin, PblNgridModule } from '@pebula/ngrid';
import { isObservable } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/block-ui/directives.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Marks the element as the display element when the form is busy.
 */
class PblNgridBlockUiDefDirective extends PblNgridSingleTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'blocker';
    }
}
PblNgridBlockUiDefDirective.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridBlockUiDef]' },] }
];
/** @nocollapse */
PblNgridBlockUiDefDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
if (false) {
    /** @type {?} */
    PblNgridBlockUiDefDirective.prototype.kind;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/block-ui/block-ui-plugin.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const PLUGIN_KEY = 'blockUi';
/**
 * @template T
 */
class PblNgridBlockUiPluginDirective {
    /**
     * @param {?} grid
     * @param {?} pluginCtrl
     */
    constructor(grid, pluginCtrl) {
        this.grid = grid;
        this._blockInProgress = false;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        grid.registry.changes.subscribe((/**
         * @param {?} changes
         * @return {?}
         */
        changes => {
            for (const c of changes) {
                switch (c.type) {
                    case 'blocker':
                        this.setupBlocker();
                        break;
                }
            }
        }));
        pluginCtrl.events
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            if (event.kind === 'onDataSource') {
                const { prev, curr } = event;
                if (prev) {
                    utils.unrx.kill(this, prev);
                }
                curr.onSourceChanging
                    .pipe(utils.unrx(this, curr))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this._blockUi === 'auto') {
                        this._blockInProgress = true;
                        this.setupBlocker();
                    }
                }));
                curr.onSourceChanged
                    .pipe(utils.unrx(this, curr))
                    .subscribe((/**
                 * @return {?}
                 */
                () => {
                    if (this._blockUi === 'auto') {
                        this._blockInProgress = false;
                        this.setupBlocker();
                    }
                }));
            }
        }));
    }
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
     * @return {?}
     */
    get blockUi() { return this._blockUi; }
    /**
     * @param {?} value
     * @return {?}
     */
    set blockUi(value) {
        /** @type {?} */
        let coerced = coerceBooleanProperty(value);
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
            state => {
                this._blockInProgress = state;
                this.setupBlocker();
            }));
        }
        else if (this._blockUi !== coerced) {
            this._blockUi = coerced;
            if (coerced !== 'auto') {
                this._blockInProgress = coerced;
                this.setupBlocker();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        utils.unrx.kill(this);
        this._removePlugin(this.grid);
    }
    /**
     * @private
     * @return {?}
     */
    setupBlocker() {
        /** @type {?} */
        const state = this._blockInProgress;
        if (state) {
            if (!this._blockerEmbeddedVRef) {
                /** @type {?} */
                const blockerTemplate = this.grid.registry.getSingle('blocker');
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
    }
}
PblNgridBlockUiPluginDirective.decorators = [
    { type: Directive, args: [{ selector: 'pbl-ngrid[blockUi]', exportAs: 'blockUi' },] }
];
/** @nocollapse */
PblNgridBlockUiPluginDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: PblNgridPluginController }
];
PblNgridBlockUiPluginDirective.propDecorators = {
    blockUi: [{ type: Input }]
};
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/table-block-ui.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridBlockUiModule {
}
PblNgridBlockUiModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY }, PblNgridBlockUiPluginDirective);
PblNgridBlockUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, CdkTableModule, PblNgridModule],
                declarations: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective],
                exports: [PblNgridBlockUiDefDirective, PblNgridBlockUiPluginDirective]
            },] }
];
if (false) {
    /** @type {?} */
    PblNgridBlockUiModule.NGRID_PLUGIN;
}

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: pebula-ngrid-block-ui.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridBlockUiModule, PblNgridBlockUiDefDirective as ɵa, PLUGIN_KEY as ɵb, PblNgridBlockUiPluginDirective as ɵc };
//# sourceMappingURL=pebula-ngrid-block-ui.js.map
