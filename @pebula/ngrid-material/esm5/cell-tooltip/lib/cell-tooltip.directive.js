/**
 * @fileoverview added by tsickle
 * Generated from: lib/cell-tooltip.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __read, __spread } from "tslib";
import { Directive, ElementRef, Injector, Input, NgZone, ViewContainerRef, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { MatTooltip, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { PblNgridComponent, PblNgridPluginController, PblNgridConfigService, utils } from '@pebula/ngrid';
/** @type {?} */
export var PLUGIN_KEY = 'cellTooltip';
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
export function CellTooltipOptions() { }
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
export { PblNgridCellTooltipDirective };
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
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUVSLEtBQUssRUFDTCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUE2QyxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1SixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXFCMUcsTUFBTSxLQUFPLFVBQVUsR0FBa0IsYUFBYTs7Ozs7QUFHM0MsVUFBQyxLQUE2Qjs7UUFDL0IsT0FBTyxHQUFHLG1CQUFBLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQWU7SUFDdkYsT0FBTyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFDbkQsQ0FBQzs7OztBQUNRLFVB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LElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Ozs7O0lBRU8sZ0RBQVM7Ozs7O0lBQWpCLFVBQWtCLEtBQTJCO1FBQzNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7OztJQUVPLGtEQUFXOzs7O0lBQW5CO1FBQ0UsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztTQUMxQjtJQUNILENBQUM7SUF2SWUsdUNBQVUsR0FBa0IsVUFBVSxDQUFDOztnQkFGeEQsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUU7Ozs7Z0JBdEMvRCxpQkFBaUI7Z0JBZnhCLFFBQVE7Z0JBZWtCLHdCQUF3Qjs7OzBCQTJDakQsS0FBSyxTQUFDLGFBQWE7MEJBVW5CLEtBQUs7MkJBR0wsS0FBSzsrQkFFTCxLQUFLOzRCQUVMLEtBQUs7NEJBRUwsS0FBSzs7SUFrSFIsbUNBQUM7Q0FBQSxBQTFJRCxJQTBJQztTQXpJWSw0QkFBNEI7OztJQUN2Qyx3Q0FBdUQ7O0lBYXZELCtDQUEwRDs7Ozs7SUFHMUQsZ0RBQW1DOzs7OztJQUVuQyxvREFBd0U7Ozs7O0lBRXhFLGlEQUEyQjs7Ozs7SUFFM0IsaURBQTJCOzs7OztJQUUzQixnREFBaUw7Ozs7O0lBRWpMLCtDQUE0Qjs7Ozs7SUFDNUIsa0RBQXVDOzs7OztJQUN2QyxxREFBK0Q7Ozs7O0lBQy9ELGdEQUEyRDs7Ozs7SUFFL0MsNkNBQXFDOzs7OztJQUFFLGdEQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFRvb2x0aXBQb3NpdGlvbiwgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zLCBNYXRUb29sdGlwLCBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1ksIE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UsIHV0aWxzIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxFdmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIGNlbGxUb29sdGlwPzogQ2VsbFRvb2x0aXBPcHRpb25zICYge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBhcHBseSB0aGUgZGVmYXVsdCBjZWxsIHRvb2x0aXAgdG8gQUxMIHRhYmxlcyAqL1xuICAgICAgYXV0b1NldEFsbD86IGJvb2xlYW47XG4gICAgfTtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgY2VsbFRvb2x0aXA/OiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBjZWxsVG9vbHRpcDoga2V5b2YgdHlwZW9mIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9LRVk6ICdjZWxsVG9vbHRpcCcgPSAnY2VsbFRvb2x0aXAnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlM6IENlbGxUb29sdGlwT3B0aW9ucyA9IHtcbiAgY2FuU2hvdzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IChldmVudC5jZWxsVGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkIHx8IGV2ZW50LmNlbGxUYXJnZXQpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50LnNjcm9sbFdpZHRoID4gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfSxcbiAgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZXZlbnQuY2VsbFRhcmdldC5pbm5lclRleHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2VsbFRvb2x0aXBPcHRpb25zIHtcbiAgY2FuU2hvdz86IGJvb2xlYW4gfCAoIChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gYm9vbGVhbiApO1xuICBtZXNzYWdlPzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KSA9PiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjZWxsVG9vbHRpcF0nLCBleHBvcnRBczogJ3BibE92ZXJmbG93VG9vbHRpcCcgfSlcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgQ2VsbFRvb2x0aXBPcHRpb25zLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgcmVhZG9ubHkgUExVR0lOX0tFWTogJ2NlbGxUb29sdGlwJyA9IFBMVUdJTl9LRVk7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2NlbGxUb29sdGlwJykgc2V0IGNhblNob3codmFsdWU6IGJvb2xlYW4gfCAoIChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IGJvb2xlYW4gKSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCAodmFsdWUgYXMgYW55KSA9PT0gJycpIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpID8gZSA9PiB0cnVlIDogZSA9PiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBtZXNzYWdlOiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBzdHJpbmc7XG5cbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBUb29sdGlwUG9zaXRpb247XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSB0b29sdGlwQ2xhc3M6IHN0cmluZ3xzdHJpbmdbXXxTZXQ8c3RyaW5nPnx7W2tleTogc3RyaW5nXTogYW55fTtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHNob3dEZWxheTogbnVtYmVyO1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgaGlkZURlbGF5OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBpbml0QXJnczogWyBPdmVybGF5LCBFbGVtZW50UmVmPGFueT4sIFNjcm9sbERpc3BhdGNoZXIsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSwgUGxhdGZvcm0sIEFyaWFEZXNjcmliZXIsIEZvY3VzTW9uaXRvciwgYW55LCBEaXJlY3Rpb25hbGl0eSwgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zIF07XG5cbiAgcHJpdmF0ZSB0b29sVGlwOiBNYXRUb29sdGlwO1xuICBwcml2YXRlIGxhc3RDb25maWc6IENlbGxUb29sdGlwT3B0aW9ucztcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgX2NhblNob3c6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgY29uc3QgY29uZmlnU2VydmljZSA9IGluamVjdG9yLmdldChQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpO1xuXG4gICAgdGhpcy5pbml0QXJncyA9IFtcbiAgICAgIGluamVjdG9yLmdldChPdmVybGF5KSxcbiAgICAgIG51bGwsXG4gICAgICBpbmplY3Rvci5nZXQoU2Nyb2xsRGlzcGF0Y2hlciksXG4gICAgICBpbmplY3Rvci5nZXQoVmlld0NvbnRhaW5lclJlZiksXG4gICAgICBpbmplY3Rvci5nZXQoTmdab25lKSxcbiAgICAgIGluamVjdG9yLmdldChQbGF0Zm9ybSksXG4gICAgICBpbmplY3Rvci5nZXQoQXJpYURlc2NyaWJlciksXG4gICAgICBpbmplY3Rvci5nZXQoRm9jdXNNb25pdG9yKSxcbiAgICAgIGluamVjdG9yLmdldChNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpLFxuICAgICAgaW5qZWN0b3IuZ2V0KERpcmVjdGlvbmFsaXR5KSxcbiAgICAgIGluamVjdG9yLmdldChNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMpLFxuICAgIF07XG5cbiAgICBjb25maWdTZXJ2aWNlLm9uVXBkYXRlKCdjZWxsVG9vbHRpcCcpXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggY2ZnID0+IHRoaXMubGFzdENvbmZpZyA9IGNmZy5jdXJyICk7XG5cbiAgICBpZiAodGFibGUuaXNJbml0KSB7XG4gICAgICB0aGlzLmluaXQocGx1Z2luQ3RybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQocGx1Z2luQ3RybCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4ge1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPih0YWJsZSwgaW5qZWN0b3IsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuICAgIHV0aWxzLnVucngua2lsbCh0aGlzKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdChwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgLy8gaWYgaXQncyBub3Qgc2V0LCBjcmVhdGUgaXQuXG4gICAgY29uc3QgdGFyZ2V0RXZlbnRzUGx1Z2luID0gcGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpIHx8IHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICB0YXJnZXRFdmVudHNQbHVnaW4uY2VsbEVudGVyXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5jZWxsRW50ZXIoZXZlbnQpICk7XG5cbiAgICB0YXJnZXRFdmVudHNQbHVnaW4uY2VsbExlYXZlXG4gICAgICAucGlwZSh1dGlscy51bnJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5jZWxsTGVhdmUoZXZlbnQpICk7XG4gIH1cblxuICBwcml2YXRlIGNlbGxFbnRlcihldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG5cbiAgICBpZiAoIXRoaXMuX2NhblNob3cpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2lsbCBzZXQgbGFzdENvbmZpZyAvIGRlZmF1bHQgb3B0aW9uIG9uY2VcbiAgICAgIC8vIGJ1dCBpZiB1c2VyIGNoYW5nZXMgbGFzdENvbmZpZyBpdCB3aWxsIG5ldmVyIHVwZGF0ZSBhZ2Fpbi4uLlxuICAgICAgdGhpcy5jYW5TaG93ID0gKHRoaXMubGFzdENvbmZpZyAmJiB0aGlzLmxhc3RDb25maWcuY2FuU2hvdykgfHwgREVGQVVMVF9PUFRJT05TLmNhblNob3c7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NhblNob3coZXZlbnQpKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmluaXRBcmdzLnNsaWNlKCkgYXMgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxhbnk+Wydpbml0QXJncyddO1xuICAgICAgcGFyYW1zWzFdID0gbmV3IEVsZW1lbnRSZWY8YW55PihldmVudC5jZWxsVGFyZ2V0KTtcblxuICAgICAgdGhpcy50b29sVGlwID0gbmV3IE1hdFRvb2x0aXAoLi4ucGFyYW1zKTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMubWVzc2FnZSB8fCAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5tZXNzYWdlKSB8fCBERUZBVUxUX09QVElPTlMubWVzc2FnZTtcbiAgICAgIHRoaXMudG9vbFRpcC5tZXNzYWdlID0gbWVzc2FnZShldmVudCk7XG5cbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50b29sdGlwQ2xhc3MpIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnRvb2x0aXBDbGFzcyA9IHRoaXMudG9vbHRpcENsYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd0RlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnNob3dEZWxheSA9IHRoaXMuc2hvd0RlbGF5O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaGlkZURlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLmhpZGVEZWxheSA9IHRoaXMuaGlkZURlbGF5O1xuICAgICAgfVxuICAgICAgdGhpcy50b29sVGlwLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNlbGxMZWF2ZShldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG4gIH1cblxuICBwcml2YXRlIGtpbGxUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2xUaXApIHtcbiAgICAgIHRoaXMudG9vbFRpcC5oaWRlKCk7XG4gICAgICB0aGlzLnRvb2xUaXAubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMudG9vbFRpcCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==