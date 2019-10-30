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
import { PblNgridComponent, PblNgridPluginController, TablePlugin, PblNgridConfigService } from '@pebula/ngrid';
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
        TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUE2QyxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1SixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBcUIxRyxVQUFVLEdBQWtCLGFBQWE7Ozs7O0FBR3BDLFVBQUMsS0FBNkI7O1FBQy9CLE9BQU8sR0FBRyxtQkFBQSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsaUJBQWlCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFlO0lBQ3ZGLE9BQU8sT0FBTyxDQUFDLFdBQVcsR0FBRyxP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Z0RBQTJEOzs7OztJQUUvQyw2Q0FBcUM7Ozs7O0lBQUUsZ0RBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3RvcixcbiAgT25EZXN0cm95LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBWaWV3Q29udGFpbmVyUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IEFyaWFEZXNjcmliZXIsIEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFNjcm9sbERpc3BhdGNoZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvc2Nyb2xsaW5nJztcbmltcG9ydCB7IFBsYXRmb3JtfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgVG9vbHRpcFBvc2l0aW9uLCBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMsIE1hdFRvb2x0aXAsIE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSwgTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdG9vbHRpcCc7XG5cbmltcG9ydCB7IFVuUnggfSBmcm9tICdAcGVidWxhL3V0aWxzJztcbmltcG9ydCB7IFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFRhYmxlUGx1Z2luLCBQYmxOZ3JpZENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAcGVidWxhL25ncmlkJztcbmltcG9ydCB7IFBibE5ncmlkQ2VsbEV2ZW50IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZC90YXJnZXQtZXZlbnRzJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL3RhYmxlL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIGNlbGxUb29sdGlwPzogQ2VsbFRvb2x0aXBPcHRpb25zICYge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBhcHBseSB0aGUgZGVmYXVsdCBjZWxsIHRvb2x0aXAgdG8gQUxMIHRhYmxlcyAqL1xuICAgICAgYXV0b1NldEFsbD86IGJvb2xlYW47XG4gICAgfTtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgY2VsbFRvb2x0aXA/OiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBjZWxsVG9vbHRpcDoga2V5b2YgdHlwZW9mIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU7XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ2NlbGxUb29sdGlwJyA9ICdjZWxsVG9vbHRpcCc7XG5cbmNvbnN0IERFRkFVTFRfT1BUSU9OUzogQ2VsbFRvb2x0aXBPcHRpb25zID0ge1xuICBjYW5TaG93OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gKGV2ZW50LmNlbGxUYXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQgfHwgZXZlbnQuY2VsbFRhcmdldCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQuc2Nyb2xsV2lkdGggPiBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9LFxuICBtZXNzYWdlOiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBldmVudC5jZWxsVGFyZ2V0LmlubmVyVGV4dDtcbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBDZWxsVG9vbHRpcE9wdGlvbnMge1xuICBjYW5TaG93PzogYm9vbGVhbiB8ICggKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KSA9PiBib29sZWFuICk7XG4gIG1lc3NhZ2U/OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pID0+IHN0cmluZztcbn1cblxuQFRhYmxlUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2VsbFRvb2x0aXBdJywgZXhwb3J0QXM6ICdwYmxPdmVyZmxvd1Rvb2x0aXAnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIENlbGxUb29sdGlwT3B0aW9ucywgT25EZXN0cm95IHtcbiAgc3RhdGljIHJlYWRvbmx5IFBMVUdJTl9LRVk6ICdjZWxsVG9vbHRpcCcgPSBQTFVHSU5fS0VZO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjZWxsVG9vbHRpcCcpIHNldCBjYW5TaG93KHZhbHVlOiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuICkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICggKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSA/IGUgPT4gdHJ1ZSA6IGUgPT4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gc3RyaW5nO1xuXG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBwb3NpdGlvbjogVG9vbHRpcFBvc2l0aW9uO1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmd8c3RyaW5nW118U2V0PHN0cmluZz58e1trZXk6IHN0cmluZ106IGFueX07XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBzaG93RGVsYXk6IG51bWJlcjtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIGhpZGVEZWxheTogbnVtYmVyO1xuXG4gIHByaXZhdGUgaW5pdEFyZ3M6IFsgT3ZlcmxheSwgRWxlbWVudFJlZjxhbnk+LCBTY3JvbGxEaXNwYXRjaGVyLCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUsIFBsYXRmb3JtLCBBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3IsIGFueSwgRGlyZWN0aW9uYWxpdHksIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucyBdO1xuXG4gIHByaXZhdGUgdG9vbFRpcDogTWF0VG9vbHRpcDtcbiAgcHJpdmF0ZSBsYXN0Q29uZmlnOiBDZWxsVG9vbHRpcE9wdGlvbnM7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9jYW5TaG93OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGNvbnN0IGNvbmZpZ1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoUGJsTmdyaWRDb25maWdTZXJ2aWNlKTtcblxuICAgIHRoaXMuaW5pdEFyZ3MgPSBbXG4gICAgICBpbmplY3Rvci5nZXQoT3ZlcmxheSksXG4gICAgICBudWxsLFxuICAgICAgaW5qZWN0b3IuZ2V0KFNjcm9sbERpc3BhdGNoZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KFZpZXdDb250YWluZXJSZWYpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE5nWm9uZSksXG4gICAgICBpbmplY3Rvci5nZXQoUGxhdGZvcm0pLFxuICAgICAgaW5qZWN0b3IuZ2V0KEFyaWFEZXNjcmliZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KEZvY3VzTW9uaXRvciksXG4gICAgICBpbmplY3Rvci5nZXQoTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSxcbiAgICAgIGluamVjdG9yLmdldChEaXJlY3Rpb25hbGl0eSksXG4gICAgICBpbmplY3Rvci5nZXQoTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TKSxcbiAgICBdO1xuXG4gICAgY29uZmlnU2VydmljZS5vblVwZGF0ZSgnY2VsbFRvb2x0aXAnKVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGNmZyA9PiB0aGlzLmxhc3RDb25maWcgPSBjZmcuY3VyciApO1xuXG4gICAgaWYgKHRhYmxlLmlzSW5pdCkge1xuICAgICAgdGhpcy5pbml0KHBsdWdpbkN0cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHBsdWdpbkN0cmwpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4odGFibGUsIGluamVjdG9yLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdChwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgLy8gaWYgaXQncyBub3Qgc2V0LCBjcmVhdGUgaXQuXG4gICAgY29uc3QgdGFyZ2V0RXZlbnRzUGx1Z2luID0gcGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpIHx8IHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICB0YXJnZXRFdmVudHNQbHVnaW4uY2VsbEVudGVyXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5jZWxsRW50ZXIoZXZlbnQpICk7XG5cbiAgICB0YXJnZXRFdmVudHNQbHVnaW4uY2VsbExlYXZlXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5jZWxsTGVhdmUoZXZlbnQpICk7XG4gIH1cblxuICBwcml2YXRlIGNlbGxFbnRlcihldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG5cbiAgICBpZiAoIXRoaXMuX2NhblNob3cpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2lsbCBzZXQgbGFzdENvbmZpZyAvIGRlZmF1bHQgb3B0aW9uIG9uY2VcbiAgICAgIC8vIGJ1dCBpZiB1c2VyIGNoYW5nZXMgbGFzdENvbmZpZyBpdCB3aWxsIG5ldmVyIHVwZGF0ZSBhZ2Fpbi4uLlxuICAgICAgdGhpcy5jYW5TaG93ID0gKHRoaXMubGFzdENvbmZpZyAmJiB0aGlzLmxhc3RDb25maWcuY2FuU2hvdykgfHwgREVGQVVMVF9PUFRJT05TLmNhblNob3c7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NhblNob3coZXZlbnQpKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmluaXRBcmdzLnNsaWNlKCkgYXMgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxhbnk+Wydpbml0QXJncyddO1xuICAgICAgcGFyYW1zWzFdID0gbmV3IEVsZW1lbnRSZWY8YW55PihldmVudC5jZWxsVGFyZ2V0KTtcblxuICAgICAgdGhpcy50b29sVGlwID0gbmV3IE1hdFRvb2x0aXAoLi4ucGFyYW1zKTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMubWVzc2FnZSB8fCAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5tZXNzYWdlKSB8fCBERUZBVUxUX09QVElPTlMubWVzc2FnZTtcbiAgICAgIHRoaXMudG9vbFRpcC5tZXNzYWdlID0gbWVzc2FnZShldmVudCk7XG5cbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50b29sdGlwQ2xhc3MpIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnRvb2x0aXBDbGFzcyA9IHRoaXMudG9vbHRpcENsYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd0RlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnNob3dEZWxheSA9IHRoaXMuc2hvd0RlbGF5O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaGlkZURlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLmhpZGVEZWxheSA9IHRoaXMuaGlkZURlbGF5O1xuICAgICAgfVxuICAgICAgdGhpcy50b29sVGlwLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNlbGxMZWF2ZShldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG4gIH1cblxuICBwcml2YXRlIGtpbGxUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2xUaXApIHtcbiAgICAgIHRoaXMudG9vbFRpcC5oaWRlKCk7XG4gICAgICB0aGlzLnRvb2xUaXAubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMudG9vbFRpcCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==