/**
 * @fileoverview added by tsickle
 * Generated from: lib/overlay-panel.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __assign, __read, __values } from "tslib";
import { Injectable, ViewContainerRef, ElementRef, Injector } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { PblNgridPluginController, PblNgridMultiTemplateRegistry } from '@pebula/ngrid';
import { PblNgridOverlayPanelRef } from './overlay-panel-ref';
/**
 * @record
 */
export function PblNgridOverlayPanelConfig() { }
if (false) {
    /** @type {?|undefined} */
    PblNgridOverlayPanelConfig.prototype.hasBackdrop;
    /** @type {?|undefined} */
    PblNgridOverlayPanelConfig.prototype.backdropClass;
    /** @type {?|undefined} */
    PblNgridOverlayPanelConfig.prototype.xPos;
    /** @type {?|undefined} */
    PblNgridOverlayPanelConfig.prototype.yPos;
    /** @type {?|undefined} */
    PblNgridOverlayPanelConfig.prototype.insetPos;
}
/** @type {?} */
var DEFAULT_OVERLAY_PANEL_CONFIG = {
    hasBackdrop: false,
    xPos: 'center',
    yPos: 'center',
    insetPos: false,
};
var PblNgridOverlayPanelFactory = /** @class */ (function () {
    function PblNgridOverlayPanelFactory(_overlay, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
    }
    /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    PblNgridOverlayPanelFactory.prototype.create = /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    function (grid) {
        return new PblNgridOverlayPanel(this._overlay, this._dir, grid);
    };
    PblNgridOverlayPanelFactory.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PblNgridOverlayPanelFactory.ctorParameters = function () { return [
        { type: Overlay },
        { type: Directionality }
    ]; };
    return PblNgridOverlayPanelFactory;
}());
export { PblNgridOverlayPanelFactory };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanelFactory.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanelFactory.prototype._dir;
}
/**
 * @template T
 */
var /**
 * @template T
 */
PblNgridOverlayPanel = /** @class */ (function () {
    function PblNgridOverlayPanel(_overlay, _dir, grid) {
        this._overlay = _overlay;
        this._dir = _dir;
        this.grid = grid;
        /** @type {?} */
        var controller = PblNgridPluginController.find(grid);
        this.injector = controller.injector;
        this.vcRef = controller.injector.get(ViewContainerRef);
        this._scrollStrategy = (/**
         * @return {?}
         */
        function () { return _overlay.scrollStrategies.reposition(); });
    }
    /**
     * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
     * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
     *
     * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
     * the rendered row index to use to get the cell from.
     *
     * > Note that this helper method does not allow targeting meta cells.
     */
    /**
     * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
     * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
     *
     * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
     * the rendered row index to use to get the cell from.
     *
     * > Note that this helper method does not allow targeting meta cells.
     * @template T
     * @param {?} extName
     * @param {?} columnId
     * @param {?} rowRenderPosition
     * @param {?=} config
     * @param {?=} data
     * @return {?}
     */
    PblNgridOverlayPanel.prototype.openGridCell = /**
     * Opens a panel relative to a cell element using the overlay panel extension registry template/component with the name provided in `extName`.
     * The cell element is referenced by the `columnId` and the `rowRenderPosition`.
     *
     * If the `rowRenderPosition` is "header" or "footer" then the grid's header / footer rows are targeted, otherwise the number provided should reference
     * the rendered row index to use to get the cell from.
     *
     * > Note that this helper method does not allow targeting meta cells.
     * @template T
     * @param {?} extName
     * @param {?} columnId
     * @param {?} rowRenderPosition
     * @param {?=} config
     * @param {?=} data
     * @return {?}
     */
    function (extName, columnId, rowRenderPosition, config, data) {
        /** @type {?} */
        var column = this.grid.columnApi.findColumn(columnId);
        if (!column) {
            throw new Error('Could not find the column ' + columnId);
        }
        /** @type {?} */
        var section;
        /** @type {?} */
        var rowRenderIndex = 0;
        switch (rowRenderPosition) {
            case 'header':
            case 'footer':
                section = rowRenderPosition;
                break;
            default:
                if (typeof rowRenderPosition === 'number') {
                    section = 'table';
                    rowRenderIndex = rowRenderPosition;
                }
                break;
        }
        if (!section) {
            throw new Error('Invalid "rowRenderPosition" provided, use "header", "footer" or any number >= 0.');
        }
        /** @type {?} */
        var el = column && column.columnDef.queryCellElements(section)[rowRenderIndex];
        if (!el) {
            throw new Error("Could not find a cell for the column " + columnId + " at render index " + rowRenderIndex);
        }
        return this.open(extName, new ElementRef(el), config, data);
    };
    /**
     * @template T
     * @param {?} extName
     * @param {?} source
     * @param {?=} config
     * @param {?=} data
     * @return {?}
     */
    PblNgridOverlayPanel.prototype.open = /**
     * @template T
     * @param {?} extName
     * @param {?} source
     * @param {?=} config
     * @param {?=} data
     * @return {?}
     */
    function (extName, source, config, data) {
        config = Object.assign(__assign({}, DEFAULT_OVERLAY_PANEL_CONFIG), config || {});
        /** @type {?} */
        var match = this.findNamesExtension(extName);
        if (!match) {
            throw new Error('Could not find the overlay panel with the name ' + extName);
        }
        /** @type {?} */
        var overlayRef = this._createOverlay(source, config);
        /** @type {?} */
        var overlayPanelRef = new PblNgridOverlayPanelRef(overlayRef, data);
        this._setPosition((/** @type {?} */ (overlayRef.getConfig().positionStrategy)), config);
        if (match instanceof PblNgridMultiTemplateRegistry) {
            /** @type {?} */
            var tPortal = this._getTemplatePortal(match.tRef, overlayPanelRef);
            /** @type {?} */
            var viewRef = overlayRef.attach(tPortal);
            viewRef.markForCheck();
            viewRef.detectChanges();
        }
        else {
            /** @type {?} */
            var cPortal = this._getComponentPortal(overlayPanelRef, match);
            /** @type {?} */
            var cmpRef = overlayRef.attach(cPortal);
            match.onCreated(null, cmpRef);
        }
        overlayRef.updatePosition();
        return overlayPanelRef;
    };
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     */
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     * @private
     * @param {?} element
     * @param {?} config
     * @return {?}
     */
    PblNgridOverlayPanel.prototype._createOverlay = /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     * @private
     * @param {?} element
     * @param {?} config
     * @return {?}
     */
    function (element, config) {
        /** @type {?} */
        var overlayConfig = this._getOverlayConfig(element, config);
        /** @type {?} */
        var overlayRef = this._overlay.create(overlayConfig);
        overlayRef.getConfig().hasBackdrop = !!config.hasBackdrop;
        // Consume the `keydownEvents` in order to prevent them from going to another overlay.
        // Ideally we'd also have our keyboard event logic in here, however doing so will
        // break anybody that may have implemented the `MatMenuPanel` themselves.
        overlayRef.keydownEvents().subscribe();
        return overlayRef;
    };
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @returns OverlayConfig
     */
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @private
     * @param {?} element
     * @param {?} config
     * @return {?} OverlayConfig
     */
    PblNgridOverlayPanel.prototype._getOverlayConfig = /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @private
     * @param {?} element
     * @param {?} config
     * @return {?} OverlayConfig
     */
    function (element, config) {
        /** @type {?} */
        var positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(element)
            .withLockedPosition();
        return new OverlayConfig({
            positionStrategy: positionStrategy,
            backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
            // TODO: don't use the cdk's class, create it
            scrollStrategy: this._scrollStrategy(),
            direction: this._dir
        });
    };
    /**
     * @private
     * @param {?} tRef
     * @param {?} overlayPanelRef
     * @return {?}
     */
    PblNgridOverlayPanel.prototype._getTemplatePortal = /**
     * @private
     * @param {?} tRef
     * @param {?} overlayPanelRef
     * @return {?}
     */
    function (tRef, overlayPanelRef) {
        /** @type {?} */
        var context = {
            grid: this.grid,
            ref: overlayPanelRef,
        };
        return new TemplatePortal(tRef, this.vcRef, context);
    };
    /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} componentExtension
     * @return {?}
     */
    PblNgridOverlayPanel.prototype._getComponentPortal = /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} componentExtension
     * @return {?}
     */
    function (overlayPanelRef, componentExtension) {
        /** @type {?} */
        var portalInjector = Injector.create({
            providers: [
                { provide: PblNgridOverlayPanelRef, useValue: overlayPanelRef },
            ],
            parent: componentExtension.injector || this.injector,
        });
        return new ComponentPortal(componentExtension.component, this.vcRef, portalInjector, componentExtension.cfr || null);
    };
    /**
     * @private
     * @param {?} positionStrategy
     * @param {?} config
     * @return {?}
     */
    PblNgridOverlayPanel.prototype._setPosition = /**
     * @private
     * @param {?} positionStrategy
     * @param {?} config
     * @return {?}
     */
    function (positionStrategy, config) {
        var _a = __read(config.xPos === 'center'
            ? ['center', 'center']
            : config.xPos === 'before' ? ['end', 'start'] : ['start', 'end'], 2), originX = _a[0], originFallbackX = _a[1];
        var _b = __read(config.yPos === 'center'
            ? ['center', 'center']
            : config.yPos === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], 2), overlayY = _b[0], overlayFallbackY = _b[1];
        var _c = __read([overlayY, overlayFallbackY], 2), originY = _c[0], originFallbackY = _c[1];
        var _d = __read([originX, originFallbackX], 2), overlayX = _d[0], overlayFallbackX = _d[1];
        /** @type {?} */
        var offsetY = 0;
        if (!config.insetPos) {
            if (overlayY !== 'center') {
                originY = overlayY === 'top' ? 'bottom' : 'top';
            }
            if (overlayFallbackY !== 'center') {
                originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
            }
        }
        positionStrategy.withPositions([
            { originX: originX, originY: originY, overlayX: overlayX, overlayY: overlayY, offsetY: offsetY },
            { originX: originFallbackX, originY: originY, overlayX: overlayFallbackX, overlayY: overlayY, offsetY: offsetY },
            {
                originX: originX,
                originY: originFallbackY,
                overlayX: overlayX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            },
            {
                originX: originFallbackX,
                originY: originFallbackY,
                overlayX: overlayFallbackX,
                overlayY: overlayFallbackY,
                offsetY: -offsetY
            }
        ]);
    };
    /**
     * @private
     * @param {?} extName
     * @return {?}
     */
    PblNgridOverlayPanel.prototype.findNamesExtension = /**
     * @private
     * @param {?} extName
     * @return {?}
     */
    function (extName) {
        /** @type {?} */
        var match;
        this.grid.registry.forMulti('overlayPanels', (/**
         * @param {?} values
         * @return {?}
         */
        function (values) {
            var e_1, _a;
            try {
                for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
                    var value = values_1_1.value;
                    if (value.name === extName) {
                        match = value;
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (values_1_1 && !values_1_1.done && (_a = values_1.return)) _a.call(values_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }));
        return match;
    };
    return PblNgridOverlayPanel;
}());
/**
 * @template T
 */
export { PblNgridOverlayPanel };
if (false) {
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanel.prototype.vcRef;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanel.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanel.prototype._scrollStrategy;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanel.prototype._overlay;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanel.prototype._dir;
    /** @type {?} */
    PblNgridOverlayPanel.prototype.grid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsLyIsInNvdXJjZXMiOlsibGliL292ZXJsYXktcGFuZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBR0wsT0FBTyxFQUNQLGFBQWEsR0FJZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEUsT0FBTyxFQUFFLHdCQUF3QixFQUFxQiw2QkFBNkIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczRyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7OztBQVc5RCxnREFNQzs7O0lBTEMsaURBQXNCOztJQUN0QixtREFBdUI7O0lBQ3ZCLDBDQUFxQzs7SUFDckMsMENBQW9DOztJQUNwQyw4Q0FBbUI7OztJQUdmLDRCQUE0QixHQUErQjtJQUMvRCxXQUFXLEVBQUUsS0FBSztJQUNsQixJQUFJLEVBQUUsUUFBUTtJQUNkLElBQUksRUFBRSxRQUFRO0lBQ2QsUUFBUSxFQUFFLEtBQUs7Q0FDaEI7QUFFRDtJQUVFLHFDQUFvQixRQUFpQixFQUFVLElBQW9CO1FBQS9DLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFnQjtJQUFJLENBQUM7Ozs7OztJQUV4RSw0Q0FBTTs7Ozs7SUFBTixVQUFVLElBQTBCO1FBQ2xDLE9BQU8sSUFBSSxvQkFBb0IsQ0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7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Z0JBQ3hCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU87YUFDbEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxpREFBa0I7Ozs7O0lBQTFCLFVBQTJCLE9BQWU7O1lBQ3BDLEtBQWdJO1FBQ3BJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlOzs7O1FBQUUsVUFBQSxNQUFNOzs7Z0JBQ2pELEtBQW9CLElBQUEsV0FBQSxTQUFBLE1BQU0sQ0FBQSw4QkFBQSxrREFBRTtvQkFBdkIsSUFBTSxLQUFLLG1CQUFBO29CQUNkLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7d0JBQzFCLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ2QsT0FBTyxJQUFJLENBQUM7cUJBQ2I7aUJBQ0Y7Ozs7Ozs7OztRQUNILENBQUMsRUFBQyxDQUFDO1FBQ0gsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBbE1ELElBa01DOzs7Ozs7Ozs7O0lBaE1DLHFDQUFnQzs7Ozs7SUFDaEMsd0NBQTJCOzs7OztJQUMzQiwrQ0FBOEM7Ozs7O0lBRWxDLHdDQUF5Qjs7Ozs7SUFDekIsb0NBQTRCOztJQUM1QixvQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBJbmplY3RvciwgRW1iZWRkZWRWaWV3UmVmLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UmVmLFxuICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MsXG4gIFNjcm9sbFN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uIH0gZnJvbSAnLi9jb21wb25lbnQtcmVnaXN0cnktZXh0ZW5zaW9uJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLXJlZic7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQgfSBmcm9tICcuL292ZXJsYXktcGFuZWwtZGVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAge1xuICAgIG92ZXJsYXlQYW5lbHM/OlxuICAgICAgfCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxhbnksICdvdmVybGF5UGFuZWxzJz5cbiAgICAgIHwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55PjtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIHtcbiAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xuICB4UG9zPzogJ2JlZm9yZScgfCAnY2VudGVyJyB8ICdhZnRlcic7XG4gIHlQb3M/OiAnYWJvdmUnIHwgJ2NlbnRlcicgfCAnYmVsb3cnO1xuICBpbnNldFBvcz86IGJvb2xlYW47XG59XG5cbmNvbnN0IERFRkFVTFRfT1ZFUkxBWV9QQU5FTF9DT05GSUc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnID0ge1xuICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gIHhQb3M6ICdjZW50ZXInLFxuICB5UG9zOiAnY2VudGVyJyxcbiAgaW5zZXRQb3M6IGZhbHNlLFxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHkpIHsgfVxuXG4gIGNyZWF0ZTxUPihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPik6IFBibE5ncmlkT3ZlcmxheVBhbmVsPFQ+IHtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkT3ZlcmxheVBhbmVsPFQ+KHRoaXMuX292ZXJsYXksIHRoaXMuX2RpciwgZ3JpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsPFQgPSBhbnk+IHtcblxuICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcjtcbiAgcHJpdmF0ZSBfc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPikge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChncmlkKTtcbiAgICB0aGlzLmluamVjdG9yID0gY29udHJvbGxlci5pbmplY3RvcjtcbiAgICB0aGlzLnZjUmVmID0gY29udHJvbGxlci5pbmplY3Rvci5nZXQoVmlld0NvbnRhaW5lclJlZik7XG4gICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSAoKSA9PiBfb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgcGFuZWwgcmVsYXRpdmUgdG8gYSBjZWxsIGVsZW1lbnQgdXNpbmcgdGhlIG92ZXJsYXkgcGFuZWwgZXh0ZW5zaW9uIHJlZ2lzdHJ5IHRlbXBsYXRlL2NvbXBvbmVudCB3aXRoIHRoZSBuYW1lIHByb3ZpZGVkIGluIGBleHROYW1lYC5cbiAgICogVGhlIGNlbGwgZWxlbWVudCBpcyByZWZlcmVuY2VkIGJ5IHRoZSBgY29sdW1uSWRgIGFuZCB0aGUgYHJvd1JlbmRlclBvc2l0aW9uYC5cbiAgICpcbiAgICogSWYgdGhlIGByb3dSZW5kZXJQb3NpdGlvbmAgaXMgXCJoZWFkZXJcIiBvciBcImZvb3RlclwiIHRoZW4gdGhlIGdyaWQncyBoZWFkZXIgLyBmb290ZXIgcm93cyBhcmUgdGFyZ2V0ZWQsIG90aGVyd2lzZSB0aGUgbnVtYmVyIHByb3ZpZGVkIHNob3VsZCByZWZlcmVuY2VcbiAgICogdGhlIHJlbmRlcmVkIHJvdyBpbmRleCB0byB1c2UgdG8gZ2V0IHRoZSBjZWxsIGZyb20uXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoaXMgaGVscGVyIG1ldGhvZCBkb2VzIG5vdCBhbGxvdyB0YXJnZXRpbmcgbWV0YSBjZWxscy5cbiAgICovXG4gIG9wZW5HcmlkQ2VsbDxUID0gYW55PihleHROYW1lOiBzdHJpbmcsIGNvbHVtbklkOiBzdHJpbmcsIHJvd1JlbmRlclBvc2l0aW9uOiBudW1iZXIgfCAnaGVhZGVyJyB8ICdmb290ZXInLCBjb25maWc/OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZywgZGF0YT86IFQpOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjxUPiB7XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uKGNvbHVtbklkKTtcbiAgICBpZiAoIWNvbHVtbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgY29sdW1uICcgKyBjb2x1bW5JZCk7XG4gICAgfVxuXG4gICAgbGV0IHNlY3Rpb246ICd0YWJsZScgfCAnaGVhZGVyJyB8ICdmb290ZXInO1xuICAgIGxldCByb3dSZW5kZXJJbmRleCA9IDA7XG4gICAgc3dpdGNoIChyb3dSZW5kZXJQb3NpdGlvbikge1xuICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHNlY3Rpb24gPSByb3dSZW5kZXJQb3NpdGlvbjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodHlwZW9mIHJvd1JlbmRlclBvc2l0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHNlY3Rpb24gPSAndGFibGUnO1xuICAgICAgICAgIHJvd1JlbmRlckluZGV4ID0gcm93UmVuZGVyUG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCFzZWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJyb3dSZW5kZXJQb3NpdGlvblwiIHByb3ZpZGVkLCB1c2UgXCJoZWFkZXJcIiwgXCJmb290ZXJcIiBvciBhbnkgbnVtYmVyID49IDAuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZWwgPSBjb2x1bW4gJiYgY29sdW1uLmNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cyhzZWN0aW9uKVtyb3dSZW5kZXJJbmRleF07XG4gICAgaWYgKCFlbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIGNlbGwgZm9yIHRoZSBjb2x1bW4gJHtjb2x1bW5JZH0gYXQgcmVuZGVyIGluZGV4ICR7cm93UmVuZGVySW5kZXh9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3BlbihleHROYW1lLCBuZXcgRWxlbWVudFJlZihlbCksIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICBvcGVuPFQgPSBhbnk+KGV4dE5hbWU6IHN0cmluZywgc291cmNlOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgY29uZmlnPzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcsIGRhdGE/OiBUKTogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY8VD4ge1xuICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyAuLi5ERUZBVUxUX09WRVJMQVlfUEFORUxfQ09ORklHIH0sIGNvbmZpZyB8fCB7fSk7XG4gICAgY29uc3QgbWF0Y2ggPSB0aGlzLmZpbmROYW1lc0V4dGVuc2lvbihleHROYW1lKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIG92ZXJsYXkgcGFuZWwgd2l0aCB0aGUgbmFtZSAnICsgZXh0TmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuX2NyZWF0ZU92ZXJsYXkoc291cmNlLCBjb25maWcpO1xuICAgIGNvbnN0IG92ZXJsYXlQYW5lbFJlZiA9IG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZihvdmVybGF5UmVmLCBkYXRhKTtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbihvdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LCBjb25maWcpO1xuXG4gICAgaWYgKG1hdGNoIGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkpIHtcbiAgICAgIGNvbnN0IHRQb3J0YWwgPSB0aGlzLl9nZXRUZW1wbGF0ZVBvcnRhbChtYXRjaC50UmVmLCBvdmVybGF5UGFuZWxSZWYpO1xuICAgICAgY29uc3Qgdmlld1JlZiA9IG92ZXJsYXlSZWYuYXR0YWNoKHRQb3J0YWwpO1xuICAgICAgdmlld1JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjUG9ydGFsID0gdGhpcy5fZ2V0Q29tcG9uZW50UG9ydGFsKG92ZXJsYXlQYW5lbFJlZiwgbWF0Y2gpXG4gICAgICBjb25zdCBjbXBSZWYgPSBvdmVybGF5UmVmLmF0dGFjaChjUG9ydGFsKTtcbiAgICAgIG1hdGNoLm9uQ3JlYXRlZChudWxsLCBjbXBSZWYpO1xuICAgIH1cblxuICAgIG92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICByZXR1cm4gb3ZlcmxheVBhbmVsUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgdGhlIG92ZXJsYXkgZnJvbSB0aGUgcHJvdmlkZWQgbWVudSdzIHRlbXBsYXRlIGFuZCBzYXZlcyBpdHNcbiAgICogT3ZlcmxheVJlZiBzbyB0aGF0IGl0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIHdoZW4gb3Blbk1lbnUgaXMgY2FsbGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheShlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgY29uZmlnOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLl9nZXRPdmVybGF5Q29uZmlnKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkuaGFzQmFja2Ryb3AgPSAhIWNvbmZpZy5oYXNCYWNrZHJvcFxuICAgIC8vIENvbnN1bWUgdGhlIGBrZXlkb3duRXZlbnRzYCBpbiBvcmRlciB0byBwcmV2ZW50IHRoZW0gZnJvbSBnb2luZyB0byBhbm90aGVyIG92ZXJsYXkuXG4gICAgLy8gSWRlYWxseSB3ZSdkIGFsc28gaGF2ZSBvdXIga2V5Ym9hcmQgZXZlbnQgbG9naWMgaW4gaGVyZSwgaG93ZXZlciBkb2luZyBzbyB3aWxsXG4gICAgLy8gYnJlYWsgYW55Ym9keSB0aGF0IG1heSBoYXZlIGltcGxlbWVudGVkIHRoZSBgTWF0TWVudVBhbmVsYCB0aGVtc2VsdmVzLlxuICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXlSZWY7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYnVpbGRzIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBuZWVkZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5LCB0aGUgT3ZlcmxheVN0YXRlLlxuICAgKiBAcmV0dXJucyBPdmVybGF5Q29uZmlnXG4gICAqL1xuICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyhlbGVtZW50KVxuICAgICAgLndpdGhMb2NrZWRQb3NpdGlvbigpO1xuXG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICBiYWNrZHJvcENsYXNzOiBjb25maWcuYmFja2Ryb3BDbGFzcyB8fCAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLCAvLyBUT0RPOiBkb24ndCB1c2UgdGhlIGNkaydzIGNsYXNzLCBjcmVhdGUgaXRcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRlbXBsYXRlUG9ydGFsKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dD4sIG92ZXJsYXlQYW5lbFJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYpIHtcbiAgICBjb25zdCBjb250ZXh0OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQgPSB7XG4gICAgICBncmlkOiB0aGlzLmdyaWQsXG4gICAgICByZWY6IG92ZXJsYXlQYW5lbFJlZixcbiAgICB9O1xuICAgIHJldHVybiBuZXcgVGVtcGxhdGVQb3J0YWwodFJlZiwgdGhpcy52Y1JlZiwgY29udGV4dCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb21wb25lbnRQb3J0YWwob3ZlcmxheVBhbmVsUmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEV4dGVuc2lvbjogUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55Pikge1xuICAgIGNvbnN0IHBvcnRhbEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmLCB1c2VWYWx1ZTogb3ZlcmxheVBhbmVsUmVmIH0sXG4gICAgICBdLFxuICAgICAgcGFyZW50OiBjb21wb25lbnRFeHRlbnNpb24uaW5qZWN0b3IgfHwgdGhpcy5pbmplY3RvcixcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRFeHRlbnNpb24uY29tcG9uZW50LCB0aGlzLnZjUmVmLCBwb3J0YWxJbmplY3RvciwgY29tcG9uZW50RXh0ZW5zaW9uLmNmciB8fCBudWxsKVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0UG9zaXRpb24ocG9zaXRpb25TdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LCBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnKSB7XG4gICAgbGV0IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1hdOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgIGNvbmZpZy54UG9zID09PSAnY2VudGVyJ1xuICAgICAgICA/IFsnY2VudGVyJywgJ2NlbnRlciddXG4gICAgICAgIDogY29uZmlnLnhQb3MgPT09ICdiZWZvcmUnID8gWydlbmQnLCAnc3RhcnQnXSA6IFsnc3RhcnQnLCAnZW5kJ107XG5cbiAgICBsZXQgW292ZXJsYXlZLCBvdmVybGF5RmFsbGJhY2tZXTogVmVydGljYWxDb25uZWN0aW9uUG9zW10gPVxuICAgICAgY29uZmlnLnlQb3MgPT09ICdjZW50ZXInXG4gICAgICAgID8gWydjZW50ZXInLCAnY2VudGVyJ11cbiAgICAgICAgOiBjb25maWcueVBvcyA9PT0gJ2Fib3ZlJyA/IFsnYm90dG9tJywgJ3RvcCddIDogWyd0b3AnLCAnYm90dG9tJ107XG5cbiAgICBsZXQgW29yaWdpblksIG9yaWdpbkZhbGxiYWNrWV0gPSBbb3ZlcmxheVksIG92ZXJsYXlGYWxsYmFja1ldO1xuICAgIGxldCBbb3ZlcmxheVgsIG92ZXJsYXlGYWxsYmFja1hdID0gW29yaWdpblgsIG9yaWdpbkZhbGxiYWNrWF07XG4gICAgbGV0IG9mZnNldFkgPSAwO1xuXG4gICAgaWYgKCFjb25maWcuaW5zZXRQb3MpIHtcbiAgICAgIGlmIChvdmVybGF5WSAhPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgb3JpZ2luWSA9IG92ZXJsYXlZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcmxheUZhbGxiYWNrWSAhPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgb3JpZ2luRmFsbGJhY2tZID0gb3ZlcmxheUZhbGxiYWNrWSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBvc2l0aW9uU3RyYXRlZ3kud2l0aFBvc2l0aW9ucyhbXG4gICAgICB7b3JpZ2luWCwgb3JpZ2luWSwgb3ZlcmxheVgsIG92ZXJsYXlZLCBvZmZzZXRZfSxcbiAgICAgIHtvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsIG9yaWdpblksIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLCBvdmVybGF5WSwgb2Zmc2V0WX0sXG4gICAgICB7XG4gICAgICAgIG9yaWdpblgsXG4gICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgb3ZlcmxheVgsXG4gICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLFxuICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLFxuICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgIH1cbiAgICBdKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZE5hbWVzRXh0ZW5zaW9uKGV4dE5hbWU6IHN0cmluZykge1xuICAgIGxldCBtYXRjaDogUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0LCAnb3ZlcmxheVBhbmVscyc+IHwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55PjtcbiAgICB0aGlzLmdyaWQucmVnaXN0cnkuZm9yTXVsdGkoJ292ZXJsYXlQYW5lbHMnLCB2YWx1ZXMgPT4ge1xuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlLm5hbWUgPT09IGV4dE5hbWUpIHtcbiAgICAgICAgICBtYXRjaCA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG59XG5cblxuIl19