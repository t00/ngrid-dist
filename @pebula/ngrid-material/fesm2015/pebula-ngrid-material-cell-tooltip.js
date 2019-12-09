import { ViewContainerRef, NgZone, ElementRef, Injector, Directive, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { PblNgridConfigService, PblNgridPluginController, PblNgridComponent, TablePlugin, PblNgridModule } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { __decorate, __metadata } from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { UnRx } from '@pebula/utils';

var PblNgridCellTooltipDirective_1;
/** @type {?} */
const PLUGIN_KEY = 'cellTooltip';
const ɵ0 = /**
 * @param {?} event
 * @return {?}
 */
(event) => {
    /** @type {?} */
    const element = (/** @type {?} */ ((event.cellTarget.firstElementChild || event.cellTarget)));
    return element.scrollWidth > element.offsetWidth;
}, ɵ1 = /**
 * @param {?} event
 * @return {?}
 */
(event) => {
    return event.cellTarget.innerText;
};
/** @type {?} */
const DEFAULT_OPTIONS = {
    canShow: (ɵ0),
    message: (ɵ1)
};
/**
 * @record
 */
function CellTooltipOptions() { }
if (false) {
    /** @type {?|undefined} */
    CellTooltipOptions.prototype.canShow;
    /** @type {?|undefined} */
    CellTooltipOptions.prototype.message;
}
/**
 * @template T
 */
let PblNgridCellTooltipDirective = PblNgridCellTooltipDirective_1 = /**
 * @template T
 */
class PblNgridCellTooltipDirective {
    /**
     * @param {?} table
     * @param {?} injector
     * @param {?} pluginCtrl
     */
    constructor(table, injector, pluginCtrl) {
        this.table = table;
        this.injector = injector;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        const configService = injector.get(PblNgridConfigService);
        this.initArgs = [
            injector.get(Overlay),
            null,
            injector.get(ScrollDispatcher),
            injector.get(ViewContainerRef),
            injector.get(NgZone),
            injector.get(Platform),
            injector.get(AriaDescriber),
            injector.get(FocusMonitor),
            injector.get(MAT_TOOLTIP_SCROLL_STRATEGY),
            injector.get(Directionality),
            injector.get(MAT_TOOLTIP_DEFAULT_OPTIONS),
        ];
        configService.onUpdate('cellTooltip')
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} cfg
         * @return {?}
         */
        cfg => this.lastConfig = cfg.curr));
        if (table.isInit) {
            this.init(pluginCtrl);
        }
        else {
            /** @type {?} */
            let subscription = pluginCtrl.events
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            event => {
                if (event.kind === 'onInit') {
                    this.init(pluginCtrl);
                    subscription.unsubscribe();
                    subscription = undefined;
                }
            }));
        }
    }
    // tslint:disable-next-line:no-input-rename
    /**
     * @param {?} value
     * @return {?}
     */
    set canShow(value) {
        if (typeof value === 'function') {
            this._canShow = value;
        }
        else if (((/** @type {?} */ (value))) === '') {
            this._canShow = undefined;
        }
        else {
            this._canShow = coerceBooleanProperty(value) ? (/**
             * @param {?} e
             * @return {?}
             */
            e => true) : (/**
             * @param {?} e
             * @return {?}
             */
            e => false);
        }
    }
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    static create(table, injector) {
        return new PblNgridCellTooltipDirective_1(table, injector, PblNgridPluginController.find(table));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.table);
        this.killTooltip();
    }
    /**
     * @private
     * @param {?} pluginCtrl
     * @return {?}
     */
    init(pluginCtrl) {
        // Depends on target-events plugin
        // if it's not set, create it.
        /** @type {?} */
        const targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
        targetEventsPlugin.cellEnter
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.cellEnter(event)));
        targetEventsPlugin.cellLeave
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.cellLeave(event)));
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    cellEnter(event) {
        this.killTooltip();
        if (!this._canShow) {
            // TODO: this will set lastConfig / default option once
            // but if user changes lastConfig it will never update again...
            this.canShow = (this.lastConfig && this.lastConfig.canShow) || DEFAULT_OPTIONS.canShow;
        }
        if (this._canShow(event)) {
            /** @type {?} */
            const params = (/** @type {?} */ (this.initArgs.slice()));
            params[1] = new ElementRef(event.cellTarget);
            this.toolTip = new MatTooltip(...params);
            /** @type {?} */
            const message = this.message || (this.lastConfig && this.lastConfig.message) || DEFAULT_OPTIONS.message;
            this.toolTip.message = message(event);
            if (this.position) {
                this.toolTip.position = this.position;
            }
            if (this.tooltipClass) {
                this.toolTip.tooltipClass = this.tooltipClass;
            }
            if (this.showDelay >= 0) {
                this.toolTip.showDelay = this.showDelay;
            }
            if (this.hideDelay >= 0) {
                this.toolTip.hideDelay = this.hideDelay;
            }
            this.toolTip.show();
        }
    }
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    cellLeave(event) {
        this.killTooltip();
    }
    /**
     * @private
     * @return {?}
     */
    killTooltip() {
        if (this.toolTip) {
            this.toolTip.hide();
            this.toolTip.ngOnDestroy();
            this.toolTip = undefined;
        }
    }
};
PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
PblNgridCellTooltipDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridCellTooltipDirective.decorators = [
    { type: Directive, args: [{ selector: '[cellTooltip]', exportAs: 'pblOverflowTooltip' },] }
];
/** @nocollapse */
PblNgridCellTooltipDirective.ctorParameters = () => [
    { type: PblNgridComponent },
    { type: Injector },
    { type: PblNgridPluginController }
];
PblNgridCellTooltipDirective.propDecorators = {
    canShow: [{ type: Input, args: ['cellTooltip',] }],
    message: [{ type: Input }],
    position: [{ type: Input }],
    tooltipClass: [{ type: Input }],
    showDelay: [{ type: Input }],
    hideDelay: [{ type: Input }]
};
/**
 * @template T
 */
PblNgridCellTooltipDirective = PblNgridCellTooltipDirective_1 = __decorate([
    TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
    UnRx(),
    __metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridCellTooltipDirective);
if (false) {
    /** @type {?} */
    PblNgridCellTooltipDirective.PLUGIN_KEY;
    /** @type {?} */
    PblNgridCellTooltipDirective.prototype.message;
    /**
     * See Material docs for MatTooltip
     * @type {?}
     */
    PblNgridCellTooltipDirective.prototype.position;
    /**
     * See Material docs for MatTooltip
     * @type {?}
     */
    PblNgridCellTooltipDirective.prototype.tooltipClass;
    /**
     * See Material docs for MatTooltip
     * @type {?}
     */
    PblNgridCellTooltipDirective.prototype.showDelay;
    /**
     * See Material docs for MatTooltip
     * @type {?}
     */
    PblNgridCellTooltipDirective.prototype.hideDelay;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype.initArgs;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype.toolTip;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype.lastConfig;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype._removePlugin;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype._canShow;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype.table;
    /**
     * @type {?}
     * @private
     */
    PblNgridCellTooltipDirective.prototype.injector;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridCellTooltipModule {
    /**
     * @param {?} parentModule
     * @param {?} configService
     */
    constructor(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => {
            // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
            // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
            // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
            // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
            // CLI prod builds will remove the plugin's code.
            /** @type {?} */
            const cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
            if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
                /** @type {?} */
                const pluginCtrl = event.controller;
                /** @type {?} */
                let subscription = pluginCtrl.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                evt => {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl.hasPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY)) {
                            pluginCtrl.createPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY);
                        }
                        subscription.unsubscribe();
                        subscription = undefined;
                    }
                }));
            }
        }));
    }
}
PblNgridCellTooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule],
                declarations: [PblNgridCellTooltipDirective],
                exports: [PblNgridCellTooltipDirective, MatTooltipModule],
            },] }
];
/** @nocollapse */
PblNgridCellTooltipModule.ctorParameters = () => [
    { type: PblNgridCellTooltipModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: PblNgridConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridCellTooltipDirective, PblNgridCellTooltipModule };
//# sourceMappingURL=pebula-ngrid-material-cell-tooltip.js.map
