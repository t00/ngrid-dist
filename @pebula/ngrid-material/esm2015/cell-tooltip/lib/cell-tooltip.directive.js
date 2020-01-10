import * as tslib_1 from "tslib";
var PblNgridCellTooltipDirective_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
PblNgridCellTooltipDirective = PblNgridCellTooltipDirective_1 = tslib_1.__decorate([
    NgridPlugin({ id: PLUGIN_KEY, factory: 'create' }),
    UnRx(),
    tslib_1.__metadata("design:paramtypes", [PblNgridComponent, Injector, PblNgridPluginController])
], PblNgridCellTooltipDirective);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBNkMsVUFBVSxFQUFFLDJCQUEyQixFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUosT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDOztNQXFCMUcsVUFBVSxHQUFrQixhQUFhOzs7OztBQUdwQyxDQUFDLEtBQTZCLEVBQVcsRUFBRTs7VUFDNUMsT0FBTyxHQUFHLG1CQUFBLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQWU7SUFDdkYsT0FBTyxPQUFPLENBQUMs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TyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztTQUMxQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBdklpQix1Q0FBVSxHQUFrQixVQUFVLENBQUM7O1lBK0I1QixpQkFBaUI7WUFBeUIsUUFBUTtZQUFjLHdCQUF3Qjs7O1lBbENwSCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRTs7OztZQXZDL0QsaUJBQWlCO1lBaEJ4QixRQUFRO1lBZ0JrQix3QkFBd0I7OztzQkE2Q2pELEtBQUssU0FBQyxhQUFhO3NCQVVuQixLQUFLO3VCQUdMLEtBQUs7MkJBRUwsS0FBSzt3QkFFTCxLQUFLO3dCQUVMLEtBQUs7Ozs7O0FBdkJLLDRCQUE0QjtJQUh4QyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUVsRCxJQUFJLEVBQUU7NkNBaUNzQixpQkFBaUIsRUFBeUIsUUFBUSxFQUFjLHdCQUF3QjtHQWhDeEcsNEJBQTRCLENBd0l4QztTQXhJWSw0QkFBNEI7OztJQUN2Qyx3Q0FBdUQ7O0lBYXZELCtDQUEwRDs7Ozs7SUFHMUQsZ0RBQW1DOzs7OztJQUVuQyxvREFBd0U7Ozs7O0lBRXhFLGlEQUEyQjs7Ozs7SUFFM0IsaURBQTJCOzs7OztJQUUzQixnREFBaUw7Ozs7O0lBRWpMLCtDQUE0Qjs7Ozs7SUFDNUIsa0RBQXVDOzs7OztJQUN2QyxxREFBK0Q7Ozs7O0lBQy9ELGdEQUEyRDs7Ozs7SUFFL0MsNkNBQXFDOzs7OztJQUFFLGdEQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFRvb2x0aXBQb3NpdGlvbiwgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zLCBNYXRUb29sdGlwLCBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1ksIE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBOZ3JpZFBsdWdpbiwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxFdmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2NvbmZpZycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRDb25maWcge1xuICAgIGNlbGxUb29sdGlwPzogQ2VsbFRvb2x0aXBPcHRpb25zICYge1xuICAgICAgLyoqIFdoZW4gc2V0IHRvIHRydWUgd2lsbCBhcHBseSB0aGUgZGVmYXVsdCBjZWxsIHRvb2x0aXAgdG8gQUxMIHRhYmxlcyAqL1xuICAgICAgYXV0b1NldEFsbD86IGJvb2xlYW47XG4gICAgfTtcbiAgfVxufVxuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZXh0L3R5cGVzJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbiB7XG4gICAgY2VsbFRvb2x0aXA/OiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT47XG4gIH1cbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uRmFjdG9yaWVzIHtcbiAgICBjZWxsVG9vbHRpcDoga2V5b2YgdHlwZW9mIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU7XG4gIH1cbn1cblxuY29uc3QgUExVR0lOX0tFWTogJ2NlbGxUb29sdGlwJyA9ICdjZWxsVG9vbHRpcCc7XG5cbmNvbnN0IERFRkFVTFRfT1BUSU9OUzogQ2VsbFRvb2x0aXBPcHRpb25zID0ge1xuICBjYW5TaG93OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0gKGV2ZW50LmNlbGxUYXJnZXQuZmlyc3RFbGVtZW50Q2hpbGQgfHwgZXZlbnQuY2VsbFRhcmdldCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgcmV0dXJuIGVsZW1lbnQuc2Nyb2xsV2lkdGggPiBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9LFxuICBtZXNzYWdlOiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBldmVudC5jZWxsVGFyZ2V0LmlubmVyVGV4dDtcbiAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBDZWxsVG9vbHRpcE9wdGlvbnMge1xuICBjYW5TaG93PzogYm9vbGVhbiB8ICggKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KSA9PiBib29sZWFuICk7XG4gIG1lc3NhZ2U/OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pID0+IHN0cmluZztcbn1cblxuQE5ncmlkUGx1Z2luKHsgaWQ6IFBMVUdJTl9LRVksIGZhY3Rvcnk6ICdjcmVhdGUnIH0pXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2VsbFRvb2x0aXBdJywgZXhwb3J0QXM6ICdwYmxPdmVyZmxvd1Rvb2x0aXAnIH0pXG5AVW5SeCgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIENlbGxUb29sdGlwT3B0aW9ucywgT25EZXN0cm95IHtcbiAgc3RhdGljIHJlYWRvbmx5IFBMVUdJTl9LRVk6ICdjZWxsVG9vbHRpcCcgPSBQTFVHSU5fS0VZO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjZWxsVG9vbHRpcCcpIHNldCBjYW5TaG93KHZhbHVlOiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuICkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICggKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSA/IGUgPT4gdHJ1ZSA6IGUgPT4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gc3RyaW5nO1xuXG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBwb3NpdGlvbjogVG9vbHRpcFBvc2l0aW9uO1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmd8c3RyaW5nW118U2V0PHN0cmluZz58e1trZXk6IHN0cmluZ106IGFueX07XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBzaG93RGVsYXk6IG51bWJlcjtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIGhpZGVEZWxheTogbnVtYmVyO1xuXG4gIHByaXZhdGUgaW5pdEFyZ3M6IFsgT3ZlcmxheSwgRWxlbWVudFJlZjxhbnk+LCBTY3JvbGxEaXNwYXRjaGVyLCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUsIFBsYXRmb3JtLCBBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3IsIGFueSwgRGlyZWN0aW9uYWxpdHksIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucyBdO1xuXG4gIHByaXZhdGUgdG9vbFRpcDogTWF0VG9vbHRpcDtcbiAgcHJpdmF0ZSBsYXN0Q29uZmlnOiBDZWxsVG9vbHRpcE9wdGlvbnM7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9jYW5TaG93OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGNvbnN0IGNvbmZpZ1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoUGJsTmdyaWRDb25maWdTZXJ2aWNlKTtcblxuICAgIHRoaXMuaW5pdEFyZ3MgPSBbXG4gICAgICBpbmplY3Rvci5nZXQoT3ZlcmxheSksXG4gICAgICBudWxsLFxuICAgICAgaW5qZWN0b3IuZ2V0KFNjcm9sbERpc3BhdGNoZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KFZpZXdDb250YWluZXJSZWYpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE5nWm9uZSksXG4gICAgICBpbmplY3Rvci5nZXQoUGxhdGZvcm0pLFxuICAgICAgaW5qZWN0b3IuZ2V0KEFyaWFEZXNjcmliZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KEZvY3VzTW9uaXRvciksXG4gICAgICBpbmplY3Rvci5nZXQoTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSxcbiAgICAgIGluamVjdG9yLmdldChEaXJlY3Rpb25hbGl0eSksXG4gICAgICBpbmplY3Rvci5nZXQoTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TKSxcbiAgICBdO1xuXG4gICAgY29uZmlnU2VydmljZS5vblVwZGF0ZSgnY2VsbFRvb2x0aXAnKVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGNmZyA9PiB0aGlzLmxhc3RDb25maWcgPSBjZmcuY3VyciApO1xuXG4gICAgaWYgKHRhYmxlLmlzSW5pdCkge1xuICAgICAgdGhpcy5pbml0KHBsdWdpbkN0cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHBsdWdpbkN0cmwpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4odGFibGUsIGluamVjdG9yLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdChwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpOiB2b2lkIHtcbiAgICAvLyBEZXBlbmRzIG9uIHRhcmdldC1ldmVudHMgcGx1Z2luXG4gICAgLy8gaWYgaXQncyBub3Qgc2V0LCBjcmVhdGUgaXQuXG4gICAgY29uc3QgdGFyZ2V0RXZlbnRzUGx1Z2luID0gcGx1Z2luQ3RybC5nZXRQbHVnaW4oJ3RhcmdldEV2ZW50cycpIHx8IHBsdWdpbkN0cmwuY3JlYXRlUGx1Z2luKCd0YXJnZXRFdmVudHMnKTtcbiAgICB0YXJnZXRFdmVudHNQbHVnaW4uY2VsbEVudGVyXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5jZWxsRW50ZXIoZXZlbnQpICk7XG5cbiAgICB0YXJnZXRFdmVudHNQbHVnaW4uY2VsbExlYXZlXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4gdGhpcy5jZWxsTGVhdmUoZXZlbnQpICk7XG4gIH1cblxuICBwcml2YXRlIGNlbGxFbnRlcihldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG5cbiAgICBpZiAoIXRoaXMuX2NhblNob3cpIHtcbiAgICAgIC8vIFRPRE86IHRoaXMgd2lsbCBzZXQgbGFzdENvbmZpZyAvIGRlZmF1bHQgb3B0aW9uIG9uY2VcbiAgICAgIC8vIGJ1dCBpZiB1c2VyIGNoYW5nZXMgbGFzdENvbmZpZyBpdCB3aWxsIG5ldmVyIHVwZGF0ZSBhZ2Fpbi4uLlxuICAgICAgdGhpcy5jYW5TaG93ID0gKHRoaXMubGFzdENvbmZpZyAmJiB0aGlzLmxhc3RDb25maWcuY2FuU2hvdykgfHwgREVGQVVMVF9PUFRJT05TLmNhblNob3c7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NhblNob3coZXZlbnQpKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB0aGlzLmluaXRBcmdzLnNsaWNlKCkgYXMgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxhbnk+Wydpbml0QXJncyddO1xuICAgICAgcGFyYW1zWzFdID0gbmV3IEVsZW1lbnRSZWY8YW55PihldmVudC5jZWxsVGFyZ2V0KTtcblxuICAgICAgdGhpcy50b29sVGlwID0gbmV3IE1hdFRvb2x0aXAoLi4ucGFyYW1zKTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHRoaXMubWVzc2FnZSB8fCAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5tZXNzYWdlKSB8fCBERUZBVUxUX09QVElPTlMubWVzc2FnZTtcbiAgICAgIHRoaXMudG9vbFRpcC5tZXNzYWdlID0gbWVzc2FnZShldmVudCk7XG5cbiAgICAgIGlmICh0aGlzLnBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb247XG4gICAgICB9XG4gICAgICBpZiAodGhpcy50b29sdGlwQ2xhc3MpIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnRvb2x0aXBDbGFzcyA9IHRoaXMudG9vbHRpcENsYXNzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc2hvd0RlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnNob3dEZWxheSA9IHRoaXMuc2hvd0RlbGF5O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuaGlkZURlbGF5ID49IDApIHtcbiAgICAgICAgdGhpcy50b29sVGlwLmhpZGVEZWxheSA9IHRoaXMuaGlkZURlbGF5O1xuICAgICAgfVxuICAgICAgdGhpcy50b29sVGlwLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNlbGxMZWF2ZShldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG4gIH1cblxuICBwcml2YXRlIGtpbGxUb29sdGlwKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRvb2xUaXApIHtcbiAgICAgIHRoaXMudG9vbFRpcC5oaWRlKCk7XG4gICAgICB0aGlzLnRvb2xUaXAubmdPbkRlc3Ryb3koKTtcbiAgICAgIHRoaXMudG9vbFRpcCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==