import * as tslib_1 from "tslib";
var PblNgridCellTooltipDirective_1;
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, NgZone, ViewContainerRef, } from '@angular/core';
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
    TablePlugin({ id: PLUGIN_KEY, factory: 'create' }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUVSLEtBQUssRUFDTCxNQUFNLEVBQ04sZ0JBQWdCLEdBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDaEQsT0FBTyxFQUE2QyxVQUFVLEVBQUUsMkJBQTJCLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1SixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSx3QkFBd0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxlQUFlLENBQUM7O01BcUIxRyxVQUFVLEdBQWtCLGFBQWE7Ozs7O0FBR3BDLENBQUMsS0FBNkIsRUFBVyxFQUFFOztVQUM1QyxPQUFPLEdBQUcsbUJBQUEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBZTtJQUN2RixPQUFPLE9BQU8sQ0FBQyxXQUFXLEdBQUcs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aEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2SWlCLHVDQUFVLEdBQWtCLFVBQVUsQ0FBQzs7WUFIeEQsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsb0JBQW9CLEVBQUU7Ozs7WUF2Qy9ELGlCQUFpQjtZQWhCeEIsUUFBUTtZQWdCa0Isd0JBQXdCOzs7c0JBNkNqRCxLQUFLLFNBQUMsYUFBYTtzQkFVbkIsS0FBSzt1QkFHTCxLQUFLOzJCQUVMLEtBQUs7d0JBRUwsS0FBSzt3QkFFTCxLQUFLOzs7OztBQXZCSyw0QkFBNEI7SUFIeEMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFFbEQsSUFBSSxFQUFFOzZDQWlDc0IsaUJBQWlCLEVBQXlCLFFBQVEsRUFBYyx3QkFBd0I7R0FoQ3hHLDRCQUE0QixDQXdJeEM7U0F4SVksNEJBQTRCOzs7SUFDdkMsd0NBQXVEOztJQWF2RCwrQ0FBMEQ7Ozs7O0lBRzFELGdEQUFtQzs7Ozs7SUFFbkMsb0RBQXdFOzs7OztJQUV4RSxpREFBMkI7Ozs7O0lBRTNCLGlEQUEyQjs7Ozs7SUFFM0IsZ0RBQWlMOzs7OztJQUVqTCwrQ0FBNEI7Ozs7O0lBQzVCLGtEQUF1Qzs7Ozs7SUFDdkMscURBQStEOzs7OztJQUMvRCxnREFBMkQ7Ozs7O0lBRS9DLDZDQUFxQzs7Ozs7SUFBRSxnREFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdG9yLFxuICBPbkRlc3Ryb3ksXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgQXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgU2Nyb2xsRGlzcGF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgUGxhdGZvcm19IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBUb29sdGlwUG9zaXRpb24sIE1hdFRvb2x0aXBEZWZhdWx0T3B0aW9ucywgTWF0VG9vbHRpcCwgTUFUX1RPT0xUSVBfU0NST0xMX1NUUkFURUdZLCBNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHsgVW5SeCB9IGZyb20gJ0BwZWJ1bGEvdXRpbHMnO1xuaW1wb3J0IHsgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgVGFibGVQbHVnaW4sIFBibE5ncmlkQ29uZmlnU2VydmljZSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuaW1wb3J0IHsgUGJsTmdyaWRDZWxsRXZlbnQgfSBmcm9tICdAcGVidWxhL25ncmlkL3RhcmdldC1ldmVudHMnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvdGFibGUvc2VydmljZXMvY29uZmlnJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZENvbmZpZyB7XG4gICAgY2VsbFRvb2x0aXA/OiBDZWxsVG9vbHRpcE9wdGlvbnMgJiB7XG4gICAgICAvKiogV2hlbiBzZXQgdG8gdHJ1ZSB3aWxsIGFwcGx5IHRoZSBkZWZhdWx0IGNlbGwgdG9vbHRpcCB0byBBTEwgdGFibGVzICovXG4gICAgICBhdXRvU2V0QWxsPzogYm9vbGVhbjtcbiAgICB9O1xuICB9XG59XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9leHQvdHlwZXMnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkUGx1Z2luRXh0ZW5zaW9uIHtcbiAgICBjZWxsVG9vbHRpcD86IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8YW55PjtcbiAgfVxuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb25GYWN0b3JpZXMge1xuICAgIGNlbGxUb29sdGlwOiBrZXlvZiB0eXBlb2YgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTtcbiAgfVxufVxuXG5jb25zdCBQTFVHSU5fS0VZOiAnY2VsbFRvb2x0aXAnID0gJ2NlbGxUb29sdGlwJztcblxuY29uc3QgREVGQVVMVF9PUFRJT05TOiBDZWxsVG9vbHRpcE9wdGlvbnMgPSB7XG4gIGNhblNob3c6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55Pik6IGJvb2xlYW4gPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSAoZXZlbnQuY2VsbFRhcmdldC5maXJzdEVsZW1lbnRDaGlsZCB8fCBldmVudC5jZWxsVGFyZ2V0KSBhcyBIVE1MRWxlbWVudDtcbiAgICByZXR1cm4gZWxlbWVudC5zY3JvbGxXaWR0aCA+IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gIH0sXG4gIG1lc3NhZ2U6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55Pik6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGV2ZW50LmNlbGxUYXJnZXQuaW5uZXJUZXh0O1xuICB9XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIENlbGxUb29sdGlwT3B0aW9ucyB7XG4gIGNhblNob3c/OiBib29sZWFuIHwgKCAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PGFueT4pID0+IGJvb2xlYW4gKTtcbiAgbWVzc2FnZT86IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gc3RyaW5nO1xufVxuXG5AVGFibGVQbHVnaW4oeyBpZDogUExVR0lOX0tFWSwgZmFjdG9yeTogJ2NyZWF0ZScgfSlcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjZWxsVG9vbHRpcF0nLCBleHBvcnRBczogJ3BibE92ZXJmbG93VG9vbHRpcCcgfSlcbkBVblJ4KClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+IGltcGxlbWVudHMgQ2VsbFRvb2x0aXBPcHRpb25zLCBPbkRlc3Ryb3kge1xuICBzdGF0aWMgcmVhZG9ubHkgUExVR0lOX0tFWTogJ2NlbGxUb29sdGlwJyA9IFBMVUdJTl9LRVk7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWlucHV0LXJlbmFtZVxuICBASW5wdXQoJ2NlbGxUb29sdGlwJykgc2V0IGNhblNob3codmFsdWU6IGJvb2xlYW4gfCAoIChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IGJvb2xlYW4gKSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKCAodmFsdWUgYXMgYW55KSA9PT0gJycpIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2NhblNob3cgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpID8gZSA9PiB0cnVlIDogZSA9PiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBtZXNzYWdlOiAoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KSA9PiBzdHJpbmc7XG5cbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHBvc2l0aW9uOiBUb29sdGlwUG9zaXRpb247XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSB0b29sdGlwQ2xhc3M6IHN0cmluZ3xzdHJpbmdbXXxTZXQ8c3RyaW5nPnx7W2tleTogc3RyaW5nXTogYW55fTtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHNob3dEZWxheTogbnVtYmVyO1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgaGlkZURlbGF5OiBudW1iZXI7XG5cbiAgcHJpdmF0ZSBpbml0QXJnczogWyBPdmVybGF5LCBFbGVtZW50UmVmPGFueT4sIFNjcm9sbERpc3BhdGNoZXIsIFZpZXdDb250YWluZXJSZWYsIE5nWm9uZSwgUGxhdGZvcm0sIEFyaWFEZXNjcmliZXIsIEZvY3VzTW9uaXRvciwgYW55LCBEaXJlY3Rpb25hbGl0eSwgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zIF07XG5cbiAgcHJpdmF0ZSB0b29sVGlwOiBNYXRUb29sdGlwO1xuICBwcml2YXRlIGxhc3RDb25maWc6IENlbGxUb29sdGlwT3B0aW9ucztcbiAgcHJpdmF0ZSBfcmVtb3ZlUGx1Z2luOiAodGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4pID0+IHZvaWQ7XG4gIHByaXZhdGUgX2NhblNob3c6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsIHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcikge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbiA9IHBsdWdpbkN0cmwuc2V0UGx1Z2luKFBMVUdJTl9LRVksIHRoaXMpO1xuXG4gICAgY29uc3QgY29uZmlnU2VydmljZSA9IGluamVjdG9yLmdldChQYmxOZ3JpZENvbmZpZ1NlcnZpY2UpO1xuXG4gICAgdGhpcy5pbml0QXJncyA9IFtcbiAgICAgIGluamVjdG9yLmdldChPdmVybGF5KSxcbiAgICAgIG51bGwsXG4gICAgICBpbmplY3Rvci5nZXQoU2Nyb2xsRGlzcGF0Y2hlciksXG4gICAgICBpbmplY3Rvci5nZXQoVmlld0NvbnRhaW5lclJlZiksXG4gICAgICBpbmplY3Rvci5nZXQoTmdab25lKSxcbiAgICAgIGluamVjdG9yLmdldChQbGF0Zm9ybSksXG4gICAgICBpbmplY3Rvci5nZXQoQXJpYURlc2NyaWJlciksXG4gICAgICBpbmplY3Rvci5nZXQoRm9jdXNNb25pdG9yKSxcbiAgICAgIGluamVjdG9yLmdldChNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1kpLFxuICAgICAgaW5qZWN0b3IuZ2V0KERpcmVjdGlvbmFsaXR5KSxcbiAgICAgIGluamVjdG9yLmdldChNQVRfVE9PTFRJUF9ERUZBVUxUX09QVElPTlMpLFxuICAgIF07XG5cbiAgICBjb25maWdTZXJ2aWNlLm9uVXBkYXRlKCdjZWxsVG9vbHRpcCcpXG4gICAgICAucGlwZShVblJ4KHRoaXMpKVxuICAgICAgLnN1YnNjcmliZSggY2ZnID0+IHRoaXMubGFzdENvbmZpZyA9IGNmZy5jdXJyICk7XG5cbiAgICBpZiAodGFibGUuaXNJbml0KSB7XG4gICAgICB0aGlzLmluaXQocGx1Z2luQ3RybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBzdWJzY3JpcHRpb24gPSBwbHVnaW5DdHJsLmV2ZW50c1xuICAgICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmtpbmQgPT09ICdvbkluaXQnKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQocGx1Z2luQ3RybCk7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGU8VCA9IGFueT4odGFibGU6IFBibE5ncmlkQ29tcG9uZW50PGFueT4sIGluamVjdG9yOiBJbmplY3Rvcik6IFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4ge1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPih0YWJsZSwgaW5qZWN0b3IsIFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKHRhYmxlKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVQbHVnaW4odGhpcy50YWJsZSk7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0KHBsdWdpbkN0cmw6IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlcik6IHZvaWQge1xuICAgIC8vIERlcGVuZHMgb24gdGFyZ2V0LWV2ZW50cyBwbHVnaW5cbiAgICAvLyBpZiBpdCdzIG5vdCBzZXQsIGNyZWF0ZSBpdC5cbiAgICBjb25zdCB0YXJnZXRFdmVudHNQbHVnaW4gPSBwbHVnaW5DdHJsLmdldFBsdWdpbigndGFyZ2V0RXZlbnRzJykgfHwgcGx1Z2luQ3RybC5jcmVhdGVQbHVnaW4oJ3RhcmdldEV2ZW50cycpO1xuICAgIHRhcmdldEV2ZW50c1BsdWdpbi5jZWxsRW50ZXJcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmNlbGxFbnRlcihldmVudCkgKTtcblxuICAgIHRhcmdldEV2ZW50c1BsdWdpbi5jZWxsTGVhdmVcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBldmVudCA9PiB0aGlzLmNlbGxMZWF2ZShldmVudCkgKTtcbiAgfVxuXG4gIHByaXZhdGUgY2VsbEVudGVyKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPik6IHZvaWQge1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcblxuICAgIGlmICghdGhpcy5fY2FuU2hvdykge1xuICAgICAgLy8gVE9ETzogdGhpcyB3aWxsIHNldCBsYXN0Q29uZmlnIC8gZGVmYXVsdCBvcHRpb24gb25jZVxuICAgICAgLy8gYnV0IGlmIHVzZXIgY2hhbmdlcyBsYXN0Q29uZmlnIGl0IHdpbGwgbmV2ZXIgdXBkYXRlIGFnYWluLi4uXG4gICAgICB0aGlzLmNhblNob3cgPSAodGhpcy5sYXN0Q29uZmlnICYmIHRoaXMubGFzdENvbmZpZy5jYW5TaG93KSB8fCBERUZBVUxUX09QVElPTlMuY2FuU2hvdztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY2FuU2hvdyhldmVudCkpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuaW5pdEFyZ3Muc2xpY2UoKSBhcyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPGFueT5bJ2luaXRBcmdzJ107XG4gICAgICBwYXJhbXNbMV0gPSBuZXcgRWxlbWVudFJlZjxhbnk+KGV2ZW50LmNlbGxUYXJnZXQpO1xuXG4gICAgICB0aGlzLnRvb2xUaXAgPSBuZXcgTWF0VG9vbHRpcCguLi5wYXJhbXMpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gdGhpcy5tZXNzYWdlIHx8ICh0aGlzLmxhc3RDb25maWcgJiYgdGhpcy5sYXN0Q29uZmlnLm1lc3NhZ2UpIHx8IERFRkFVTFRfT1BUSU9OUy5tZXNzYWdlO1xuICAgICAgdGhpcy50b29sVGlwLm1lc3NhZ2UgPSBtZXNzYWdlKGV2ZW50KTtcblxuICAgICAgaWYgKHRoaXMucG9zaXRpb24pIHtcbiAgICAgICAgdGhpcy50b29sVGlwLnBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRvb2x0aXBDbGFzcykge1xuICAgICAgICB0aGlzLnRvb2xUaXAudG9vbHRpcENsYXNzID0gdGhpcy50b29sdGlwQ2xhc3M7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zaG93RGVsYXkgPj0gMCkge1xuICAgICAgICB0aGlzLnRvb2xUaXAuc2hvd0RlbGF5ID0gdGhpcy5zaG93RGVsYXk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oaWRlRGVsYXkgPj0gMCkge1xuICAgICAgICB0aGlzLnRvb2xUaXAuaGlkZURlbGF5ID0gdGhpcy5oaWRlRGVsYXk7XG4gICAgICB9XG4gICAgICB0aGlzLnRvb2xUaXAuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2VsbExlYXZlKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPik6IHZvaWQge1xuICAgIHRoaXMua2lsbFRvb2x0aXAoKTtcbiAgfVxuXG4gIHByaXZhdGUga2lsbFRvb2x0aXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudG9vbFRpcCkge1xuICAgICAgdGhpcy50b29sVGlwLmhpZGUoKTtcbiAgICAgIHRoaXMudG9vbFRpcC5uZ09uRGVzdHJveSgpO1xuICAgICAgdGhpcy50b29sVGlwID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxufVxuIl19