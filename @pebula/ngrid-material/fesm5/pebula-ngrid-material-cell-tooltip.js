import { ViewContainerRef, NgZone, ElementRef, Directive, Injector, Input, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { PblNgridConfigService, utils, PblNgridPluginController, PblNgridComponent, ngridPlugin, PblNgridModule } from '@pebula/ngrid';
import { PblNgridTargetEventsModule } from '@pebula/ngrid/target-events';
import { __spread } from 'tslib';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/cell-tooltip.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var PLUGIN_KEY = 'cellTooltip';
var ɵ0 = /**
 * @param {?} event
 * @return {?}
 */
function (event) {
    /** @type {?} */
    var element = (/** @type {?} */ ((event.cellTarget.firstElementChild || event.cellTarget)));
    return element.scrollWidth > element.offsetWidth;
}, ɵ1 = /**
 * @param {?} event
 * @return {?}
 */
function (event) {
    return event.cellTarget.innerText;
};
/** @type {?} */
var DEFAULT_OPTIONS = {
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
var PblNgridCellTooltipDirective = /** @class */ (function () {
    function PblNgridCellTooltipDirective(table, injector, pluginCtrl) {
        var _this = this;
        this.table = table;
        this.injector = injector;
        this._removePlugin = pluginCtrl.setPlugin(PLUGIN_KEY, this);
        /** @type {?} */
        var configService = injector.get(PblNgridConfigService);
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
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} cfg
         * @return {?}
         */
        function (cfg) { return _this.lastConfig = cfg.curr; }));
        if (table.isInit) {
            this.init(pluginCtrl);
        }
        else {
            /** @type {?} */
            var subscription_1 = pluginCtrl.events
                .subscribe((/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                if (event.kind === 'onInit') {
                    _this.init(pluginCtrl);
                    subscription_1.unsubscribe();
                    subscription_1 = undefined;
                }
            }));
        }
    }
    Object.defineProperty(PblNgridCellTooltipDirective.prototype, "canShow", {
        // tslint:disable-next-line:no-input-rename
        set: 
        // tslint:disable-next-line:no-input-rename
        /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
                function (e) { return true; }) : (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return false; });
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    PblNgridCellTooltipDirective.create = /**
     * @template T
     * @param {?} table
     * @param {?} injector
     * @return {?}
     */
    function (table, injector) {
        return new PblNgridCellTooltipDirective(table, injector, PblNgridPluginController.find(table));
    };
    /**
     * @return {?}
     */
    PblNgridCellTooltipDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._removePlugin(this.table);
        this.killTooltip();
        utils.unrx.kill(this);
    };
    /**
     * @private
     * @param {?} pluginCtrl
     * @return {?}
     */
    PblNgridCellTooltipDirective.prototype.init = /**
     * @private
     * @param {?} pluginCtrl
     * @return {?}
     */
    function (pluginCtrl) {
        var _this = this;
        // Depends on target-events plugin
        // if it's not set, create it.
        /** @type {?} */
        var targetEventsPlugin = pluginCtrl.getPlugin('targetEvents') || pluginCtrl.createPlugin('targetEvents');
        targetEventsPlugin.cellEnter
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.cellEnter(event); }));
        targetEventsPlugin.cellLeave
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.cellLeave(event); }));
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PblNgridCellTooltipDirective.prototype.cellEnter = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.killTooltip();
        if (!this._canShow) {
            // TODO: this will set lastConfig / default option once
            // but if user changes lastConfig it will never update again...
            this.canShow = (this.lastConfig && this.lastConfig.canShow) || DEFAULT_OPTIONS.canShow;
        }
        if (this._canShow(event)) {
            /** @type {?} */
            var params = (/** @type {?} */ (this.initArgs.slice()));
            params[1] = new ElementRef(event.cellTarget);
            this.toolTip = new (MatTooltip.bind.apply(MatTooltip, __spread([void 0], params)))();
            /** @type {?} */
            var message = this.message || (this.lastConfig && this.lastConfig.message) || DEFAULT_OPTIONS.message;
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
    };
    /**
     * @private
     * @param {?} event
     * @return {?}
     */
    PblNgridCellTooltipDirective.prototype.cellLeave = /**
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.killTooltip();
    };
    /**
     * @private
     * @return {?}
     */
    PblNgridCellTooltipDirective.prototype.killTooltip = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.toolTip) {
            this.toolTip.hide();
            this.toolTip.ngOnDestroy();
            this.toolTip = undefined;
        }
    };
    PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
    PblNgridCellTooltipDirective.decorators = [
        { type: Directive, args: [{ selector: '[cellTooltip]', exportAs: 'pblOverflowTooltip' },] }
    ];
    /** @nocollapse */
    PblNgridCellTooltipDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
    PblNgridCellTooltipDirective.propDecorators = {
        canShow: [{ type: Input, args: ['cellTooltip',] }],
        message: [{ type: Input }],
        position: [{ type: Input }],
        tooltipClass: [{ type: Input }],
        showDelay: [{ type: Input }],
        hideDelay: [{ type: Input }]
    };
    return PblNgridCellTooltipDirective;
}());
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
 * Generated from: lib/cell-tooltip.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridCellTooltipModule = /** @class */ (function () {
    function PblNgridCellTooltipModule(parentModule, configService) {
        if (parentModule) {
            return;
        }
        PblNgridPluginController.created
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            // Do not remove the explicit reference to `PblNgridCellTooltipDirective`
            // We use `PblNgridCellTooltipDirective.PLUGIN_KEY` to create a direct reference to `PblNgridCellTooltipDirective`
            // which will disable dead code elimination for the `PblNgridCellTooltipDirective` plugin.
            // If it is not set, using the plugin will only work when it is used in templates, other wise, if used programmatically (`autoSetAll`)
            // CLI prod builds will remove the plugin's code.
            /** @type {?} */
            var cellTooltipConfig = configService.get(PblNgridCellTooltipDirective.PLUGIN_KEY);
            if (cellTooltipConfig && cellTooltipConfig.autoSetAll === true) {
                /** @type {?} */
                var pluginCtrl_1 = event.controller;
                /** @type {?} */
                var subscription_1 = pluginCtrl_1.events
                    .subscribe((/**
                 * @param {?} evt
                 * @return {?}
                 */
                function (evt) {
                    if (evt.kind === 'onInit') {
                        if (!pluginCtrl_1.hasPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY)) {
                            pluginCtrl_1.createPlugin(PblNgridCellTooltipDirective.PLUGIN_KEY);
                        }
                        subscription_1.unsubscribe();
                        subscription_1 = undefined;
                    }
                }));
            }
        }));
    }
    PblNgridCellTooltipModule.NGRID_PLUGIN = ngridPlugin({ id: PLUGIN_KEY, factory: 'create' }, PblNgridCellTooltipDirective);
    PblNgridCellTooltipModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, MatTooltipModule, OverlayModule, PblNgridModule, PblNgridTargetEventsModule],
                    declarations: [PblNgridCellTooltipDirective],
                    exports: [PblNgridCellTooltipDirective, MatTooltipModule],
                },] }
    ];
    /** @nocollapse */
    PblNgridCellTooltipModule.ctorParameters = function () { return [
        { type: PblNgridCellTooltipModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridCellTooltipModule;
}());
if (false) {
    /** @type {?} */
    PblNgridCellTooltipModule.NGRID_PLUGIN;
}

/**
 * @fileoverview added by tsickle
 * Generated from: index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: pebula-ngrid-material-cell-tooltip.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridCellTooltipDirective, PblNgridCellTooltipModule, PLUGIN_KEY as ɵa };
//# sourceMappingURL=pebula-ngrid-material-cell-tooltip.js.map
