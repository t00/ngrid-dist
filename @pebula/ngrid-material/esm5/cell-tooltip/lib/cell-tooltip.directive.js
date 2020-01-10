/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, OnDestroy, Input, NgZone, ViewContainerRef, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Platform } from '@angular/cdk/platform';
import { MatTooltip, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { UnRx } from '@pebula/utils';
import { PblNgridComponent, PblNgridPluginController, NgridPlugin, PblNgridConfigService } from '@pebula/ngrid';
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
            .pipe(UnRx(this))
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
    PblNgridCellTooltipDirective_1 = PblNgridCellTooltipDirective;
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
        return new PblNgridCellTooltipDirective_1(table, injector, PblNgridPluginController.find(table));
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
            .pipe(UnRx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) { return _this.cellEnter(event); }));
        targetEventsPlugin.cellLeave
            .pipe(UnRx(this))
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
            this.toolTip = new (MatTooltip.bind.apply(MatTooltip, tslib_1.__spread([void 0], params)))();
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
    var PblNgridCellTooltipDirective_1;
    PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
    PblNgridCellTooltipDirective.ctorParameters = function () { return [
        { type: PblNgridComponent },
        { type: Injector },
        { type: PblNgridPluginController }
    ]; };
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
    /**
     * @template T
     */
    PblNgridCellTooltipDirective = PblNgridCellTooltipDirective_1 = tslib_1.__decorate([
        NgridPlugin({ id: PLUGIN_KEY, factory: 'create' }),
        UnRx(),
        tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
    ], PblNgridCellTooltipDirective);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUE2QyxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1SixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBcUIxRyxVQUFVLEdBQWtCLGFBQWE7Ozs7O0FBR3BDLFVBQUMsS0FBNkI7O1FBQy9CLE9BQU8sR0FBRyxtQkFBQSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFlO0lBQ3ZGLE9BQU8sT0FBTyxDQUFDLFdBQVcsR0FBRyxP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Z0RBQTJEOzs7OztJQUUvQyw2Q0FBcUM7Ozs7O0lBQUUsZ0RBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEFyaWFEZXNjcmliZXIsIEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IFBsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgVG9vbHRpcFBvc2l0aW9uLCBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsIE1hdFRvb2x0aXAsIE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSwgTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIE5ncmlkUGx1Z2luLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbEV2ZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC90YXJnZXQtZXZlbnRzJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgY2VsbFRvb2x0aXA/OiBDZWxsVG9vbHRpcE9wdGlvbnMgJiB7XG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGFwcGx5IHRoZSBkZWZhdWx0IGNlbGwgdG9vbHRpcCB0byBBTEwgdGFibGVzICovXG4gICAgICBhdXRvU2V0QWxsPzogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjZWxsVG9vbHRpcD86IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8YW55PjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIGNlbGxUb29sdGlwOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAnY2VsbFRvb2x0aXAnID0gJ2NlbGxUb29sdGlwJztcblxuY29uc3QgREVGQVVMVF9PUFRJT05TOiBDZWxsVG9vbHRpcE9wdGlvbnMgPSB7XG4gIGNhblNob3c6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55Pik6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZXZlbnQuY2VsbFRhcmdldC5maXJzdEVsZW1lbnRDaGlsZCB8fCBldmVudC5jZWxsVGFyZ2V0KSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxXaWR0aCA+IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH0sXG4gIG1lc3NhZ2U6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55Pik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGV2ZW50LmNlbGxUYXJnZXQuaW5uZXJUZXh0O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENlbGxUb29sdGlwT3B0aW9ucyB7XG4gIGNhblNob3c/OiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pID0+IGJvb2xlYW4gKTtcbiAgbWVzc2FnZT86IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gc3RyaW5nO1xufVxuXG5ATmdyaWRQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjZWxsVG9vbHRpcF0nLCBleHBvcnRBczogJ3BibE92ZXJmbG93VG9vbHRpcCcgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgQ2VsbFRvb2x0aXBPcHRpb25zLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgcmVhZG9ubHkgUExVR0lOX0tFWTogJ2NlbGxUb29sdGlwJyA9IFBMVUdJTl9LRVk7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2NlbGxUb29sdGlwJykgc2V0IGNhblNob3codmFsdWU6IGJvb2xlYW4gfCAoIChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IGJvb2xlYW4gKSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCAodmFsdWUgYXMgYW55KSA9PT0gJycpIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpID8gZSA9PiB0cnVlIDogZSA9PiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBtZXNzYWdlOiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBzdHJpbmc7XG5cbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBUb29sdGlwUG9zaXRpb247XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSB0b29sdGlwQ2xhc3M6IHN0cmluZ3xzdHJpbmdbXXxTZXQ8c3RyaW5nPnx7W2tleTogc3RyaW5nXTogYW55fTtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHNob3dEZWxheTogbnVtYmVyO1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgaGlkZURlbGF5OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBpbml0QXJnczogWyBPdmVybGF5LCBFbGVtZW50UmVmPGFueT4sIFNjcm9sbERpc3BhdGNoZXIsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSwgUGxhdGZvcm0sIEFyaWFEZXNjcmliZXIsIEZvY3VzTW9uaXRvciwgYW55LCBEaXJlY3Rpb25hbGl0eSwgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zIF07XG5cbiAgcHJpdmF0ZSB0b29sVGlwOiBNYXRUb29sdGlwO1xuICBwcml2YXRlIGxhc3RDb25maWc6IENlbGxUb29sdGlwT3B0aW9ucztcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgX2NhblNob3c6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgY29uc3QgY29uZmlnU2VydmljZSA9IGluamVjdG9yLmdldChQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpO1xuXG4gICAgdGhpcy5pbml0QXJncyA9IFtcbiAgICAgIGluamVjdG9yLmdldChPdmVybGF5KSxcbiAgICAgIG51bGwsXG4gICAgICBpbmplY3Rvci5nZXQoU2Nyb2xsRGlzcGF0Y2hlciksXG4gICAgICBpbmplY3Rvci5nZXQoVmlld0NvbnRhaW5lclJlZiksXG4gICAgICBpbmplY3Rvci5nZXQoTmdab25lKSxcbiAgICAgIGluamVjdG9yLmdldChQbGF0Zm9ybSksXG4gICAgICBpbmplY3Rvci5nZXQoQXJpYURlc2NyaWJlciksXG4gICAgICBpbmplY3Rvci5nZXQoRm9jdXNNb25pdG9yKSxcbiAgICAgIGluamVjdG9yLmdldChNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpLFxuICAgICAgaW5qZWN0b3IuZ2V0KERpcmVjdGlvbmFsaXR5KSxcbiAgICAgIGluamVjdG9yLmdldChNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMpLFxuICAgIF07XG5cbiAgICBjb25maWdTZXJ2aWNlLm9uVXBkYXRlKCdjZWxsVG9vbHRpcCcpXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggY2ZnID0+IHRoaXMubGFzdENvbmZpZyA9IGNmZy5jdXJyICk7XG5cbiAgICBpZiAodGFibGUuaXNJbml0KSB7XG4gICAgICB0aGlzLmluaXQocGx1Z2luQ3RybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQocGx1Z2luQ3RybCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4ge1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPih0YWJsZSwgaW5qZWN0b3IsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcik6IHZvaWQge1xuICAgIC8vIERlcGVuZHMgb24gdGFyZ2V0LWV2ZW50cyBwbHVnaW5cbiAgICAvLyBpZiBpdCdzIG5vdCBzZXQsIGNyZWF0ZSBpdC5cbiAgICBjb25zdCB0YXJnZXRFdmVudHNQbHVnaW4gPSBwbHVnaW5DdHJsLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJykgfHwgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRhcmdldEV2ZW50c1BsdWdpbi5jZWxsRW50ZXJcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmNlbGxFbnRlcihldmVudCkgKTtcblxuICAgIHRhcmdldEV2ZW50c1BsdWdpbi5jZWxsTGVhdmVcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmNlbGxMZWF2ZShldmVudCkgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2VsbEVudGVyKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPik6IHZvaWQge1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcblxuICAgIGlmICghdGhpcy5fY2FuU2hvdykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aWxsIHNldCBsYXN0Q29uZmlnIC8gZGVmYXVsdCBvcHRpb24gb25jZVxuICAgICAgLy8gYnV0IGlmIHVzZXIgY2hhbmdlcyBsYXN0Q29uZmlnIGl0IHdpbGwgbmV2ZXIgdXBkYXRlIGFnYWluLi4uXG4gICAgICB0aGlzLmNhblNob3cgPSAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5jYW5TaG93KSB8fCBERUZBVUxUX09QVElPTlMuY2FuU2hvdztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2FuU2hvdyhldmVudCkpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuaW5pdEFyZ3Muc2xpY2UoKSBhcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT5bJ2luaXRBcmdzJ107XG4gICAgICBwYXJhbXNbMV0gPSBuZXcgRWxlbWVudFJlZjxhbnk+KGV2ZW50LmNlbGxUYXJnZXQpO1xuXG4gICAgICB0aGlzLnRvb2xUaXAgPSBuZXcgTWF0VG9vbHRpcCguLi5wYXJhbXMpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5tZXNzYWdlIHx8ICh0aGlzLmxhc3RDb25maWcgJiYgdGhpcy5sYXN0Q29uZmlnLm1lc3NhZ2UpIHx8IERFRkFVTFRfT1BUSU9OUy5tZXNzYWdlO1xuICAgICAgdGhpcy50b29sVGlwLm1lc3NhZ2UgPSBtZXNzYWdlKGV2ZW50KTtcblxuICAgICAgaWYgKHRoaXMucG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRvb2x0aXBDbGFzcykge1xuICAgICAgICB0aGlzLnRvb2xUaXAudG9vbHRpcENsYXNzID0gdGhpcy50b29sdGlwQ2xhc3M7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zaG93RGVsYXkgPj0gMCkge1xuICAgICAgICB0aGlzLnRvb2xUaXAuc2hvd0RlbGF5ID0gdGhpcy5zaG93RGVsYXk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oaWRlRGVsYXkgPj0gMCkge1xuICAgICAgICB0aGlzLnRvb2xUaXAuaGlkZURlbGF5ID0gdGhpcy5oaWRlRGVsYXk7XG4gICAgICB9XG4gICAgICB0aGlzLnRvb2xUaXAuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2VsbExlYXZlKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPik6IHZvaWQge1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcbiAgfVxuXG4gIHByaXZhdGUga2lsbFRvb2x0aXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbFRpcCkge1xuICAgICAgdGhpcy50b29sVGlwLmhpZGUoKTtcbiAgICAgIHRoaXMudG9vbFRpcC5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy50b29sVGlwID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19