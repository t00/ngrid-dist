/**
 * @fileoverview added by tsickle
 * Generated from: lib/cell-tooltip.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export const PLUGIN_KEY = 'cellTooltip';
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
export class PblNgridCellTooltipDirective {
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
            .pipe(utils.unrx(this))
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
        return new PblNgridCellTooltipDirective(table, injector, PblNgridPluginController.find(table));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._removePlugin(this.table);
        this.killTooltip();
        utils.unrx.kill(this);
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
            .pipe(utils.unrx(this))
            .subscribe((/**
         * @param {?} event
         * @return {?}
         */
        event => this.cellEnter(event)));
        targetEventsPlugin.cellLeave
            .pipe(utils.unrx(this))
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
}
PblNgridCellTooltipDirective.PLUGIN_KEY = PLUGIN_KEY;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBRVIsS0FBSyxFQUNMLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBRSxRQUFRLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQTZDLFVBQVUsRUFBRSwyQkFBMkIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTVKLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBcUIxRyxNQUFNLE9BQU8sVUFBVSxHQUFrQixhQUFhOzs7OztBQUczQyxDQUFDLEtBQTZCLEVBQVcsRUFBRTs7VUFDNUMsT0FBTyxHQUFHLG1CQUFBLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQWU7SUFDdkYsT0FBTyxPQUFPLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUM7QUFDbkQsQ0FBQzs7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SUFFTyxXQUFXO1FBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7U0FDMUI7SUFDSCxDQUFDOztBQXZJZSx1Q0FBVSxHQUFrQixVQUFVLENBQUM7O1lBRnhELFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFOzs7O1lBdEMvRCxpQkFBaUI7WUFmeEIsUUFBUTtZQWVrQix3QkFBd0I7OztzQkEyQ2pELEtBQUssU0FBQyxhQUFhO3NCQVVuQixLQUFLO3VCQUdMLEtBQUs7MkJBRUwsS0FBSzt3QkFFTCxLQUFLO3dCQUVMLEtBQUs7Ozs7SUF0Qk4sd0NBQXVEOztJQWF2RCwrQ0FBMEQ7Ozs7O0lBRzFELGdEQUFtQzs7Ozs7SUFFbkMsb0RBQXdFOzs7OztJQUV4RSxpREFBMkI7Ozs7O0lBRTNCLGlEQUEyQjs7Ozs7SUFFM0IsZ0RBQWlMOzs7OztJQUVqTCwrQ0FBNEI7Ozs7O0lBQzVCLGtEQUF1Qzs7Ozs7SUFDdkMscURBQStEOzs7OztJQUMvRCxnREFBMkQ7Ozs7O0lBRS9DLDZDQUFxQzs7Ozs7SUFBRSxnREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgUGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBUb29sdGlwUG9zaXRpb24sIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucywgTWF0VG9vbHRpcCwgTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLCBNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDb25maWdTZXJ2aWNlLCB1dGlscyB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsRXZlbnQgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBjZWxsVG9vbHRpcD86IENlbGxUb29sdGlwT3B0aW9ucyAmIHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgYXBwbHkgdGhlIGRlZmF1bHQgY2VsbCB0b29sdGlwIHRvIEFMTCB0YWJsZXMgKi9cbiAgICAgIGF1dG9TZXRBbGw/OiBib29sZWFuO1xuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNlbGxUb29sdGlwPzogUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxhbnk+O1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgY2VsbFRvb2x0aXA6IGtleW9mIHR5cGVvZiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fS0VZOiAnY2VsbFRvb2x0aXAnID0gJ2NlbGxUb29sdGlwJztcblxuY29uc3QgREVGQVVMVF9PUFRJT05TOiBDZWxsVG9vbHRpcE9wdGlvbnMgPSB7XG4gIGNhblNob3c6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55Pik6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZXZlbnQuY2VsbFRhcmdldC5maXJzdEVsZW1lbnRDaGlsZCB8fCBldmVudC5jZWxsVGFyZ2V0KSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxXaWR0aCA+IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH0sXG4gIG1lc3NhZ2U6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55Pik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGV2ZW50LmNlbGxUYXJnZXQuaW5uZXJUZXh0O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENlbGxUb29sdGlwT3B0aW9ucyB7XG4gIGNhblNob3c/OiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pID0+IGJvb2xlYW4gKTtcbiAgbWVzc2FnZT86IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbY2VsbFRvb2x0aXBdJywgZXhwb3J0QXM6ICdwYmxPdmVyZmxvd1Rvb2x0aXAnIH0pXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPiBpbXBsZW1lbnRzIENlbGxUb29sdGlwT3B0aW9ucywgT25EZXN0cm95IHtcbiAgc3RhdGljIHJlYWRvbmx5IFBMVUdJTl9LRVk6ICdjZWxsVG9vbHRpcCcgPSBQTFVHSU5fS0VZO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCdjZWxsVG9vbHRpcCcpIHNldCBjYW5TaG93KHZhbHVlOiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuICkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdmFsdWU7XG4gICAgfSBlbHNlIGlmICggKHZhbHVlIGFzIGFueSkgPT09ICcnKSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jYW5TaG93ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKSA/IGUgPT4gdHJ1ZSA6IGUgPT4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gc3RyaW5nO1xuXG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBwb3NpdGlvbjogVG9vbHRpcFBvc2l0aW9uO1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgdG9vbHRpcENsYXNzOiBzdHJpbmd8c3RyaW5nW118U2V0PHN0cmluZz58e1trZXk6IHN0cmluZ106IGFueX07XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBzaG93RGVsYXk6IG51bWJlcjtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIGhpZGVEZWxheTogbnVtYmVyO1xuXG4gIHByaXZhdGUgaW5pdEFyZ3M6IFsgT3ZlcmxheSwgRWxlbWVudFJlZjxhbnk+LCBTY3JvbGxEaXNwYXRjaGVyLCBWaWV3Q29udGFpbmVyUmVmLCBOZ1pvbmUsIFBsYXRmb3JtLCBBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3IsIGFueSwgRGlyZWN0aW9uYWxpdHksIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucyBdO1xuXG4gIHByaXZhdGUgdG9vbFRpcDogTWF0VG9vbHRpcDtcbiAgcHJpdmF0ZSBsYXN0Q29uZmlnOiBDZWxsVG9vbHRpcE9wdGlvbnM7XG4gIHByaXZhdGUgX3JlbW92ZVBsdWdpbjogKHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+KSA9PiB2b2lkO1xuICBwcml2YXRlIF9jYW5TaG93OiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwbHVnaW5DdHJsOiBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIpIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4gPSBwbHVnaW5DdHJsLnNldFBsdWdpbihQTFVHSU5fS0VZLCB0aGlzKTtcblxuICAgIGNvbnN0IGNvbmZpZ1NlcnZpY2UgPSBpbmplY3Rvci5nZXQoUGJsTmdyaWRDb25maWdTZXJ2aWNlKTtcblxuICAgIHRoaXMuaW5pdEFyZ3MgPSBbXG4gICAgICBpbmplY3Rvci5nZXQoT3ZlcmxheSksXG4gICAgICBudWxsLFxuICAgICAgaW5qZWN0b3IuZ2V0KFNjcm9sbERpc3BhdGNoZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KFZpZXdDb250YWluZXJSZWYpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE5nWm9uZSksXG4gICAgICBpbmplY3Rvci5nZXQoUGxhdGZvcm0pLFxuICAgICAgaW5qZWN0b3IuZ2V0KEFyaWFEZXNjcmliZXIpLFxuICAgICAgaW5qZWN0b3IuZ2V0KEZvY3VzTW9uaXRvciksXG4gICAgICBpbmplY3Rvci5nZXQoTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZKSxcbiAgICAgIGluamVjdG9yLmdldChEaXJlY3Rpb25hbGl0eSksXG4gICAgICBpbmplY3Rvci5nZXQoTUFUX1RPT0xUSVBfREVGQVVMVF9PUFRJT05TKSxcbiAgICBdO1xuXG4gICAgY29uZmlnU2VydmljZS5vblVwZGF0ZSgnY2VsbFRvb2x0aXAnKVxuICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGNmZyA9PiB0aGlzLmxhc3RDb25maWcgPSBjZmcuY3VyciApO1xuXG4gICAgaWYgKHRhYmxlLmlzSW5pdCkge1xuICAgICAgdGhpcy5pbml0KHBsdWdpbkN0cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgc3Vic2NyaXB0aW9uID0gcGx1Z2luQ3RybC5ldmVudHNcbiAgICAgICAgLnN1YnNjcmliZSggZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5raW5kID09PSAnb25Jbml0Jykge1xuICAgICAgICAgICAgdGhpcy5pbml0KHBsdWdpbkN0cmwpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlPFQgPSBhbnk+KHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBpbmplY3RvcjogSW5qZWN0b3IpOiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4odGFibGUsIGluamVjdG9yLCBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZCh0YWJsZSkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luKHRoaXMudGFibGUpO1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcbiAgICB1dGlscy51bnJ4LmtpbGwodGhpcyk7XG4gIH1cblxuICBwcml2YXRlIGluaXQocGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKTogdm9pZCB7XG4gICAgLy8gRGVwZW5kcyBvbiB0YXJnZXQtZXZlbnRzIHBsdWdpblxuICAgIC8vIGlmIGl0J3Mgbm90IHNldCwgY3JlYXRlIGl0LlxuICAgIGNvbnN0IHRhcmdldEV2ZW50c1BsdWdpbiA9IHBsdWdpbkN0cmwuZ2V0UGx1Z2luKCd0YXJnZXRFdmVudHMnKSB8fCBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgdGFyZ2V0RXZlbnRzUGx1Z2luLmNlbGxFbnRlclxuICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuY2VsbEVudGVyKGV2ZW50KSApO1xuXG4gICAgdGFyZ2V0RXZlbnRzUGx1Z2luLmNlbGxMZWF2ZVxuICAgICAgLnBpcGUodXRpbHMudW5yeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuY2VsbExlYXZlKGV2ZW50KSApO1xuICB9XG5cbiAgcHJpdmF0ZSBjZWxsRW50ZXIoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuXG4gICAgaWYgKCF0aGlzLl9jYW5TaG93KSB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHdpbGwgc2V0IGxhc3RDb25maWcgLyBkZWZhdWx0IG9wdGlvbiBvbmNlXG4gICAgICAvLyBidXQgaWYgdXNlciBjaGFuZ2VzIGxhc3RDb25maWcgaXQgd2lsbCBuZXZlciB1cGRhdGUgYWdhaW4uLi5cbiAgICAgIHRoaXMuY2FuU2hvdyA9ICh0aGlzLmxhc3RDb25maWcgJiYgdGhpcy5sYXN0Q29uZmlnLmNhblNob3cpIHx8IERFRkFVTFRfT1BUSU9OUy5jYW5TaG93O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jYW5TaG93KGV2ZW50KSkge1xuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5pbml0QXJncy5zbGljZSgpIGFzIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8YW55PlsnaW5pdEFyZ3MnXTtcbiAgICAgIHBhcmFtc1sxXSA9IG5ldyBFbGVtZW50UmVmPGFueT4oZXZlbnQuY2VsbFRhcmdldCk7XG5cbiAgICAgIHRoaXMudG9vbFRpcCA9IG5ldyBNYXRUb29sdGlwKC4uLnBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2UgfHwgKHRoaXMubGFzdENvbmZpZyAmJiB0aGlzLmxhc3RDb25maWcubWVzc2FnZSkgfHwgREVGQVVMVF9PUFRJT05TLm1lc3NhZ2U7XG4gICAgICB0aGlzLnRvb2xUaXAubWVzc2FnZSA9IG1lc3NhZ2UoZXZlbnQpO1xuXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLnRvb2xUaXAucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudG9vbHRpcENsYXNzKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC50b29sdGlwQ2xhc3MgPSB0aGlzLnRvb2x0aXBDbGFzcztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNob3dEZWxheSA+PSAwKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5zaG93RGVsYXkgPSB0aGlzLnNob3dEZWxheTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmhpZGVEZWxheSA+PSAwKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5oaWRlRGVsYXkgPSB0aGlzLmhpZGVEZWxheTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9vbFRpcC5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjZWxsTGVhdmUoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBraWxsVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sVGlwKSB7XG4gICAgICB0aGlzLnRvb2xUaXAuaGlkZSgpO1xuICAgICAgdGhpcy50b29sVGlwLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLnRvb2xUaXAgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=