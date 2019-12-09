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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC10b29sdGlwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BwZWJ1bGEvbmdyaWQtbWF0ZXJpYWwvY2VsbC10b29sdGlwLyIsInNvdXJjZXMiOlsibGliL2NlbGwtdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsUUFBUSxFQUNSLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2hELE9BQU8sRUFBNkMsVUFBVSxFQUFFLDJCQUEyQixFQUFFLDJCQUEyQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFNUosT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZUFBZSxDQUFDOztNQXFCMUcsVUFBVSxHQUFrQixhQUFhOzs7OztBQUdwQyxDQUFDLEtBQTZCLEVBQVcsRUFBRTs7VUFDNUMsT0FBTyxHQUFHLG1CQUFBLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQWU7SUFDdkYsT0FBTyxPQUFPLENBQUMs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TyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztTQUMxQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBdklpQix1Q0FBVSxHQUFrQixVQUFVLENBQUM7O1lBK0I1QixpQkFBaUI7WUFBeUIsUUFBUTtZQUFjLHdCQUF3Qjs7O1lBbENwSCxTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxvQkFBb0IsRUFBRTs7OztZQXZDL0QsaUJBQWlCO1lBaEJ4QixRQUFRO1lBZ0JrQix3QkFBd0I7OztzQkE2Q2pELEtBQUssU0FBQyxhQUFhO3NCQVVuQixLQUFLO3VCQUdMLEtBQUs7MkJBRUwsS0FBSzt3QkFFTCxLQUFLO3dCQUVMLEtBQUs7Ozs7O0FBdkJLLDRCQUE0QjtJQUh4QyxXQUFXLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUVsRCxJQUFJLEVBQUU7NkNBaUNzQixpQkFBaUIsRUFBeUIsUUFBUSxFQUFjLHdCQUF3QjtHQWhDeEcsNEJBQTRCLENBd0l4QztTQXhJWSw0QkFBNEI7OztJQUN2Qyx3Q0FBdUQ7O0lBYXZELCtDQUEwRDs7Ozs7SUFHMUQsZ0RBQW1DOzs7OztJQUVuQyxvREFBd0U7Ozs7O0lBRXhFLGlEQUEyQjs7Ozs7SUFFM0IsaURBQTJCOzs7OztJQUUzQixnREFBaUw7Ozs7O0lBRWpMLCtDQUE0Qjs7Ozs7SUFDNUIsa0RBQXVDOzs7OztJQUN2QyxxREFBK0Q7Ozs7O0lBQy9ELGdEQUEyRDs7Ozs7SUFFL0MsNkNBQXFDOzs7OztJQUFFLGdEQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSW5qZWN0b3IsXG4gIE9uRGVzdHJveSxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBBcmlhRGVzY3JpYmVyLCBGb2N1c01vbml0b3IgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7IE92ZXJsYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBTY3JvbGxEaXNwYXRjaGVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBQbGF0Zm9ybX0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFRvb2x0aXBQb3NpdGlvbiwgTWF0VG9vbHRpcERlZmF1bHRPcHRpb25zLCBNYXRUb29sdGlwLCBNQVRfVE9PTFRJUF9TQ1JPTExfU1RSQVRFR1ksIE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OUyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5pbXBvcnQgeyBVblJ4IH0gZnJvbSAnQHBlYnVsYS91dGlscyc7XG5pbXBvcnQgeyBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBUYWJsZVBsdWdpbiwgUGJsTmdyaWRDb25maWdTZXJ2aWNlIH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5pbXBvcnQgeyBQYmxOZ3JpZENlbGxFdmVudCB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQvdGFyZ2V0LWV2ZW50cyc7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi90YWJsZS9zZXJ2aWNlcy9jb25maWcnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkQ29uZmlnIHtcbiAgICBjZWxsVG9vbHRpcD86IENlbGxUb29sdGlwT3B0aW9ucyAmIHtcbiAgICAgIC8qKiBXaGVuIHNldCB0byB0cnVlIHdpbGwgYXBwbHkgdGhlIGRlZmF1bHQgY2VsbCB0b29sdGlwIHRvIEFMTCB0YWJsZXMgKi9cbiAgICAgIGF1dG9TZXRBbGw/OiBib29sZWFuO1xuICAgIH07XG4gIH1cbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2V4dC90eXBlcycge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRQbHVnaW5FeHRlbnNpb24ge1xuICAgIGNlbGxUb29sdGlwPzogUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxhbnk+O1xuICB9XG4gIGludGVyZmFjZSBQYmxOZ3JpZFBsdWdpbkV4dGVuc2lvbkZhY3RvcmllcyB7XG4gICAgY2VsbFRvb2x0aXA6IGtleW9mIHR5cGVvZiBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlO1xuICB9XG59XG5cbmNvbnN0IFBMVUdJTl9LRVk6ICdjZWxsVG9vbHRpcCcgPSAnY2VsbFRvb2x0aXAnO1xuXG5jb25zdCBERUZBVUxUX09QVElPTlM6IENlbGxUb29sdGlwT3B0aW9ucyA9IHtcbiAgY2FuU2hvdzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KTogYm9vbGVhbiA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IChldmVudC5jZWxsVGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkIHx8IGV2ZW50LmNlbGxUYXJnZXQpIGFzIEhUTUxFbGVtZW50O1xuICAgIHJldHVybiBlbGVtZW50LnNjcm9sbFdpZHRoID4gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgfSxcbiAgbWVzc2FnZTogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gZXZlbnQuY2VsbFRhcmdldC5pbm5lclRleHQ7XG4gIH1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2VsbFRvb2x0aXBPcHRpb25zIHtcbiAgY2FuU2hvdz86IGJvb2xlYW4gfCAoIChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8YW55PikgPT4gYm9vbGVhbiApO1xuICBtZXNzYWdlPzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxhbnk+KSA9PiBzdHJpbmc7XG59XG5cbkBUYWJsZVBsdWdpbih7IGlkOiBQTFVHSU5fS0VZLCBmYWN0b3J5OiAnY3JlYXRlJyB9KVxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NlbGxUb29sdGlwXScsIGV4cG9ydEFzOiAncGJsT3ZlcmZsb3dUb29sdGlwJyB9KVxuQFVuUngoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8VD4gaW1wbGVtZW50cyBDZWxsVG9vbHRpcE9wdGlvbnMsIE9uRGVzdHJveSB7XG4gIHN0YXRpYyByZWFkb25seSBQTFVHSU5fS0VZOiAnY2VsbFRvb2x0aXAnID0gUExVR0lOX0tFWTtcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8taW5wdXQtcmVuYW1lXG4gIEBJbnB1dCgnY2VsbFRvb2x0aXAnKSBzZXQgY2FuU2hvdyh2YWx1ZTogYm9vbGVhbiB8ICggKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gYm9vbGVhbiApKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fY2FuU2hvdyA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoICh2YWx1ZSBhcyBhbnkpID09PSAnJykge1xuICAgICAgdGhpcy5fY2FuU2hvdyA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY2FuU2hvdyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSkgPyBlID0+IHRydWUgOiBlID0+IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIG1lc3NhZ2U6IChldmVudDogUGJsTmdyaWRDZWxsRXZlbnQ8VD4pID0+IHN0cmluZztcblxuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgcG9zaXRpb246IFRvb2x0aXBQb3NpdGlvbjtcbiAgLyoqIFNlZSBNYXRlcmlhbCBkb2NzIGZvciBNYXRUb29sdGlwICovXG4gIEBJbnB1dCgpIHRvb2x0aXBDbGFzczogc3RyaW5nfHN0cmluZ1tdfFNldDxzdHJpbmc+fHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICAvKiogU2VlIE1hdGVyaWFsIGRvY3MgZm9yIE1hdFRvb2x0aXAgKi9cbiAgQElucHV0KCkgc2hvd0RlbGF5OiBudW1iZXI7XG4gIC8qKiBTZWUgTWF0ZXJpYWwgZG9jcyBmb3IgTWF0VG9vbHRpcCAqL1xuICBASW5wdXQoKSBoaWRlRGVsYXk6IG51bWJlcjtcblxuICBwcml2YXRlIGluaXRBcmdzOiBbIE92ZXJsYXksIEVsZW1lbnRSZWY8YW55PiwgU2Nyb2xsRGlzcGF0Y2hlciwgVmlld0NvbnRhaW5lclJlZiwgTmdab25lLCBQbGF0Zm9ybSwgQXJpYURlc2NyaWJlciwgRm9jdXNNb25pdG9yLCBhbnksIERpcmVjdGlvbmFsaXR5LCBNYXRUb29sdGlwRGVmYXVsdE9wdGlvbnMgXTtcblxuICBwcml2YXRlIHRvb2xUaXA6IE1hdFRvb2x0aXA7XG4gIHByaXZhdGUgbGFzdENvbmZpZzogQ2VsbFRvb2x0aXBPcHRpb25zO1xuICBwcml2YXRlIF9yZW1vdmVQbHVnaW46ICh0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PikgPT4gdm9pZDtcbiAgcHJpdmF0ZSBfY2FuU2hvdzogKGV2ZW50OiBQYmxOZ3JpZENlbGxFdmVudDxUPikgPT4gYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHRhYmxlOiBQYmxOZ3JpZENvbXBvbmVudDxhbnk+LCBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvciwgcGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKSB7XG4gICAgdGhpcy5fcmVtb3ZlUGx1Z2luID0gcGx1Z2luQ3RybC5zZXRQbHVnaW4oUExVR0lOX0tFWSwgdGhpcyk7XG5cbiAgICBjb25zdCBjb25maWdTZXJ2aWNlID0gaW5qZWN0b3IuZ2V0KFBibE5ncmlkQ29uZmlnU2VydmljZSk7XG5cbiAgICB0aGlzLmluaXRBcmdzID0gW1xuICAgICAgaW5qZWN0b3IuZ2V0KE92ZXJsYXkpLFxuICAgICAgbnVsbCxcbiAgICAgIGluamVjdG9yLmdldChTY3JvbGxEaXNwYXRjaGVyKSxcbiAgICAgIGluamVjdG9yLmdldChWaWV3Q29udGFpbmVyUmVmKSxcbiAgICAgIGluamVjdG9yLmdldChOZ1pvbmUpLFxuICAgICAgaW5qZWN0b3IuZ2V0KFBsYXRmb3JtKSxcbiAgICAgIGluamVjdG9yLmdldChBcmlhRGVzY3JpYmVyKSxcbiAgICAgIGluamVjdG9yLmdldChGb2N1c01vbml0b3IpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE1BVF9UT09MVElQX1NDUk9MTF9TVFJBVEVHWSksXG4gICAgICBpbmplY3Rvci5nZXQoRGlyZWN0aW9uYWxpdHkpLFxuICAgICAgaW5qZWN0b3IuZ2V0KE1BVF9UT09MVElQX0RFRkFVTFRfT1BUSU9OUyksXG4gICAgXTtcblxuICAgIGNvbmZpZ1NlcnZpY2Uub25VcGRhdGUoJ2NlbGxUb29sdGlwJylcbiAgICAgIC5waXBlKFVuUngodGhpcykpXG4gICAgICAuc3Vic2NyaWJlKCBjZmcgPT4gdGhpcy5sYXN0Q29uZmlnID0gY2ZnLmN1cnIgKTtcblxuICAgIGlmICh0YWJsZS5pc0luaXQpIHtcbiAgICAgIHRoaXMuaW5pdChwbHVnaW5DdHJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHN1YnNjcmlwdGlvbiA9IHBsdWdpbkN0cmwuZXZlbnRzXG4gICAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQua2luZCA9PT0gJ29uSW5pdCcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdChwbHVnaW5DdHJsKTtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNyZWF0ZTxUID0gYW55Pih0YWJsZTogUGJsTmdyaWRDb21wb25lbnQ8YW55PiwgaW5qZWN0b3I6IEluamVjdG9yKTogUGJsTmdyaWRDZWxsVG9vbHRpcERpcmVjdGl2ZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZENlbGxUb29sdGlwRGlyZWN0aXZlPFQ+KHRhYmxlLCBpbmplY3RvciwgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQodGFibGUpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZVBsdWdpbih0aGlzLnRhYmxlKTtcbiAgICB0aGlzLmtpbGxUb29sdGlwKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXQocGx1Z2luQ3RybDogUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyKTogdm9pZCB7XG4gICAgLy8gRGVwZW5kcyBvbiB0YXJnZXQtZXZlbnRzIHBsdWdpblxuICAgIC8vIGlmIGl0J3Mgbm90IHNldCwgY3JlYXRlIGl0LlxuICAgIGNvbnN0IHRhcmdldEV2ZW50c1BsdWdpbiA9IHBsdWdpbkN0cmwuZ2V0UGx1Z2luKCd0YXJnZXRFdmVudHMnKSB8fCBwbHVnaW5DdHJsLmNyZWF0ZVBsdWdpbigndGFyZ2V0RXZlbnRzJyk7XG4gICAgdGFyZ2V0RXZlbnRzUGx1Z2luLmNlbGxFbnRlclxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuY2VsbEVudGVyKGV2ZW50KSApO1xuXG4gICAgdGFyZ2V0RXZlbnRzUGx1Z2luLmNlbGxMZWF2ZVxuICAgICAgLnBpcGUoVW5SeCh0aGlzKSlcbiAgICAgIC5zdWJzY3JpYmUoIGV2ZW50ID0+IHRoaXMuY2VsbExlYXZlKGV2ZW50KSApO1xuICB9XG5cbiAgcHJpdmF0ZSBjZWxsRW50ZXIoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuXG4gICAgaWYgKCF0aGlzLl9jYW5TaG93KSB7XG4gICAgICAvLyBUT0RPOiB0aGlzIHdpbGwgc2V0IGxhc3RDb25maWcgLyBkZWZhdWx0IG9wdGlvbiBvbmNlXG4gICAgICAvLyBidXQgaWYgdXNlciBjaGFuZ2VzIGxhc3RDb25maWcgaXQgd2lsbCBuZXZlciB1cGRhdGUgYWdhaW4uLi5cbiAgICAgIHRoaXMuY2FuU2hvdyA9ICh0aGlzLmxhc3RDb25maWcgJiYgdGhpcy5sYXN0Q29uZmlnLmNhblNob3cpIHx8IERFRkFVTFRfT1BUSU9OUy5jYW5TaG93O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9jYW5TaG93KGV2ZW50KSkge1xuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5pbml0QXJncy5zbGljZSgpIGFzIFBibE5ncmlkQ2VsbFRvb2x0aXBEaXJlY3RpdmU8YW55PlsnaW5pdEFyZ3MnXTtcbiAgICAgIHBhcmFtc1sxXSA9IG5ldyBFbGVtZW50UmVmPGFueT4oZXZlbnQuY2VsbFRhcmdldCk7XG5cbiAgICAgIHRoaXMudG9vbFRpcCA9IG5ldyBNYXRUb29sdGlwKC4uLnBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzLm1lc3NhZ2UgfHwgKHRoaXMubGFzdENvbmZpZyAmJiB0aGlzLmxhc3RDb25maWcubWVzc2FnZSkgfHwgREVGQVVMVF9PUFRJT05TLm1lc3NhZ2U7XG4gICAgICB0aGlzLnRvb2xUaXAubWVzc2FnZSA9IG1lc3NhZ2UoZXZlbnQpO1xuXG4gICAgICBpZiAodGhpcy5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLnRvb2xUaXAucG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMudG9vbHRpcENsYXNzKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC50b29sdGlwQ2xhc3MgPSB0aGlzLnRvb2x0aXBDbGFzcztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNob3dEZWxheSA+PSAwKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5zaG93RGVsYXkgPSB0aGlzLnNob3dEZWxheTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmhpZGVEZWxheSA+PSAwKSB7XG4gICAgICAgIHRoaXMudG9vbFRpcC5oaWRlRGVsYXkgPSB0aGlzLmhpZGVEZWxheTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG9vbFRpcC5zaG93KCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjZWxsTGVhdmUoZXZlbnQ6IFBibE5ncmlkQ2VsbEV2ZW50PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5raWxsVG9vbHRpcCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBraWxsVG9vbHRpcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50b29sVGlwKSB7XG4gICAgICB0aGlzLnRvb2xUaXAuaGlkZSgpO1xuICAgICAgdGhpcy50b29sVGlwLm5nT25EZXN0cm95KCk7XG4gICAgICB0aGlzLnRvb2xUaXAgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=