/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
        config = Object.assign(tslib_1.__assign({}, DEFAULT_OVERLAY_PANEL_CONFIG), config || {});
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
        return new OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(element)
                .withLockedPosition(),
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
        var _a = tslib_1.__read(config.xPos === 'center'
            ? ['center', 'center']
            : config.xPos === 'before' ? ['end', 'start'] : ['start', 'end'], 2), originX = _a[0], originFallbackX = _a[1];
        var _b = tslib_1.__read(config.yPos === 'center'
            ? ['center', 'center']
            : config.yPos === 'above' ? ['bottom', 'top'] : ['top', 'bottom'], 2), overlayY = _b[0], overlayFallbackY = _b[1];
        var _c = tslib_1.__read([overlayY, overlayFallbackY], 2), originY = _c[0], originFallbackY = _c[1];
        var _d = tslib_1.__read([originX, originFallbackX], 2), overlayX = _d[0], overlayFallbackX = _d[1];
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
                for (var values_1 = tslib_1.__values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsLyIsInNvdXJjZXMiOlsibGliL292ZXJsYXktcGFuZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBZ0MsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFHTCxPQUFPLEVBQ1AsYUFBYSxHQUlkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQXFCLDZCQUE2QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBVzlELGdEQU1DOzs7SUFMQyxpREFBc0I7O0lBQ3RCLG1EQUF1Qjs7SUFDdkIsMENBQXFDOztJQUNyQywwQ0FBb0M7O0lBQ3BDLDhDQUFtQjs7O0lBR2YsNEJBQTRCLEdBQStCO0lBQy9ELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsS0FBSztDQUNoQjtBQUVEO0lBRUUscUNBQW9CLFFBQWlCLEVBQVUsSUFBb0I7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLFNBQUksR0FBSixJQUFJLENBQWdCO0lBQUksQ0FBQzs7Ozs7O0lBRXhFLDRDQUFNOzs7OztJQUFOLFVBQVUsSUFBMEI7UUFDbEMsT0FBTyxJQUFJLG9CQUFvQixDQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJ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QkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU87YUFDbEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxpREFBa0I7Ozs7O0lBQTFCLFVBQTJCLE9BQWU7O1lBQ3BDLEtBQWdJO1FBQ3BJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxlQUFlOzs7O1FBQUUsVUFBQSxNQUFNOzs7Z0JBQ2pELEtBQW9CLElBQUEsV0FBQSxpQkFBQSxNQUFNLENBQUEsOEJBQUEsa0RBQUU7b0JBQXZCLElBQU0sS0FBSyxtQkFBQTtvQkFDZCxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO3dCQUMxQixLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUNkLE9BQU8sSUFBSSxDQUFDO3FCQUNiO2lCQUNGOzs7Ozs7Ozs7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQS9MRCxJQStMQzs7Ozs7Ozs7OztJQTdMQyxxQ0FBZ0M7Ozs7O0lBQ2hDLHdDQUEyQjs7Ozs7SUFDM0IsK0NBQThDOzs7OztJQUVsQyx3Q0FBeUI7Ozs7O0lBQ3pCLG9DQUE0Qjs7SUFDNUIsb0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVmlld0NvbnRhaW5lclJlZiwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIEVtYmVkZGVkVmlld1JlZiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERpcmVjdGlvbmFsaXR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2JpZGknO1xuaW1wb3J0IHtcbiAgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LFxuICBIb3Jpem9udGFsQ29ubmVjdGlvblBvcyxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVJlZixcbiAgVmVydGljYWxDb25uZWN0aW9uUG9zLFxuICBTY3JvbGxTdHJhdGVneSxcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwsIENvbXBvbmVudFBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgUm93Q29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay90YWJsZSc7XG5pbXBvcnQgeyBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIsIFBibE5ncmlkQ29tcG9uZW50LCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSB9IGZyb20gJ0BwZWJ1bGEvbmdyaWQnO1xuXG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbiB9IGZyb20gJy4vY29tcG9uZW50LXJlZ2lzdHJ5LWV4dGVuc2lvbic7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiB9IGZyb20gJy4vb3ZlcmxheS1wYW5lbC1yZWYnO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0IH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLWRlZic7XG5cbmRlY2xhcmUgbW9kdWxlICdAcGVidWxhL25ncmlkL2xpYi9ncmlkL3NlcnZpY2VzL2dyaWQtcmVnaXN0cnkuc2VydmljZScge1xuICBpbnRlcmZhY2UgUGJsTmdyaWRNdWx0aVJlZ2lzdHJ5TWFwIHtcbiAgICBvdmVybGF5UGFuZWxzPzpcbiAgICAgIHwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8YW55LCAnb3ZlcmxheVBhbmVscyc+XG4gICAgICB8IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uPGFueT47XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyB7XG4gIGhhc0JhY2tkcm9wPzogYm9vbGVhbjtcbiAgYmFja2Ryb3BDbGFzcz86IHN0cmluZztcbiAgeFBvcz86ICdiZWZvcmUnIHwgJ2NlbnRlcicgfCAnYWZ0ZXInO1xuICB5UG9zPzogJ2Fib3ZlJyB8ICdjZW50ZXInIHwgJ2JlbG93JztcbiAgaW5zZXRQb3M/OiBib29sZWFuO1xufVxuXG5jb25zdCBERUZBVUxUX09WRVJMQVlfUEFORUxfQ09ORklHOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyA9IHtcbiAgaGFzQmFja2Ryb3A6IGZhbHNlLFxuICB4UG9zOiAnY2VudGVyJyxcbiAgeVBvczogJ2NlbnRlcicsXG4gIGluc2V0UG9zOiBmYWxzZSxcbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbEZhY3Rvcnkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LCBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5KSB7IH1cblxuICBjcmVhdGU8VD4oZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUPiB7XG4gICAgcmV0dXJuIG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUPih0aGlzLl9vdmVybGF5LCB0aGlzLl9kaXIsIGdyaWQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQYmxOZ3JpZE92ZXJsYXlQYW5lbDxUID0gYW55PiB7XG5cbiAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZjtcbiAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3I7XG4gIHByaXZhdGUgX3Njcm9sbFN0cmF0ZWd5OiAoKSA9PiBTY3JvbGxTdHJhdGVneTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5LFxuICAgICAgICAgICAgICBwcml2YXRlIF9kaXI6IERpcmVjdGlvbmFsaXR5LFxuICAgICAgICAgICAgICBwdWJsaWMgcmVhZG9ubHkgZ3JpZDogUGJsTmdyaWRDb21wb25lbnQ8VD4pIHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLmZpbmQoZ3JpZCk7XG4gICAgdGhpcy5pbmplY3RvciA9IGNvbnRyb2xsZXIuaW5qZWN0b3I7XG4gICAgdGhpcy52Y1JlZiA9IGNvbnRyb2xsZXIuaW5qZWN0b3IuZ2V0KFZpZXdDb250YWluZXJSZWYpO1xuICAgIHRoaXMuX3Njcm9sbFN0cmF0ZWd5ID0gKCkgPT4gX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5yZXBvc2l0aW9uKCk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBPcGVucyBhIHBhbmVsIHJlbGF0aXZlIHRvIGEgY2VsbCBlbGVtZW50IHVzaW5nIHRoZSBvdmVybGF5IHBhbmVsIGV4dGVuc2lvbiByZWdpc3RyeSB0ZW1wbGF0ZS9jb21wb25lbnQgd2l0aCB0aGUgbmFtZSBwcm92aWRlZCBpbiBgZXh0TmFtZWAuXG4gICAqIFRoZSBjZWxsIGVsZW1lbnQgaXMgcmVmZXJlbmNlZCBieSB0aGUgYGNvbHVtbklkYCBhbmQgdGhlIGByb3dSZW5kZXJQb3NpdGlvbmAuXG4gICAqXG4gICAqIElmIHRoZSBgcm93UmVuZGVyUG9zaXRpb25gIGlzIFwiaGVhZGVyXCIgb3IgXCJmb290ZXJcIiB0aGVuIHRoZSBncmlkJ3MgaGVhZGVyIC8gZm9vdGVyIHJvd3MgYXJlIHRhcmdldGVkLCBvdGhlcndpc2UgdGhlIG51bWJlciBwcm92aWRlZCBzaG91bGQgcmVmZXJlbmNlXG4gICAqIHRoZSByZW5kZXJlZCByb3cgaW5kZXggdG8gdXNlIHRvIGdldCB0aGUgY2VsbCBmcm9tLlxuICAgKlxuICAgKiA+IE5vdGUgdGhhdCB0aGlzIGhlbHBlciBtZXRob2QgZG9lcyBub3QgYWxsb3cgdGFyZ2V0aW5nIG1ldGEgY2VsbHMuXG4gICAqL1xuICBvcGVuR3JpZENlbGw8VCA9IGFueT4oZXh0TmFtZTogc3RyaW5nLCBjb2x1bW5JZDogc3RyaW5nLCByb3dSZW5kZXJQb3NpdGlvbjogbnVtYmVyIHwgJ2hlYWRlcicgfCAnZm9vdGVyJywgY29uZmlnPzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcsIGRhdGE/OiBUKTogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY8VD4ge1xuICAgIGNvbnN0IGNvbHVtbiA9IHRoaXMuZ3JpZC5jb2x1bW5BcGkuZmluZENvbHVtbihjb2x1bW5JZCk7XG4gICAgaWYgKCFjb2x1bW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIGNvbHVtbiAnICsgY29sdW1uSWQpO1xuICAgIH1cblxuICAgIGxldCBzZWN0aW9uOiAndGFibGUnIHwgJ2hlYWRlcicgfCAnZm9vdGVyJztcbiAgICBsZXQgcm93UmVuZGVySW5kZXggPSAwO1xuICAgIHN3aXRjaCAocm93UmVuZGVyUG9zaXRpb24pIHtcbiAgICAgIGNhc2UgJ2hlYWRlcic6XG4gICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICBzZWN0aW9uID0gcm93UmVuZGVyUG9zaXRpb247XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHR5cGVvZiByb3dSZW5kZXJQb3NpdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBzZWN0aW9uID0gJ3RhYmxlJztcbiAgICAgICAgICByb3dSZW5kZXJJbmRleCA9IHJvd1JlbmRlclBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmICghc2VjdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFwicm93UmVuZGVyUG9zaXRpb25cIiBwcm92aWRlZCwgdXNlIFwiaGVhZGVyXCIsIFwiZm9vdGVyXCIgb3IgYW55IG51bWJlciA+PSAwLicpO1xuICAgIH1cblxuICAgIGNvbnN0IGVsID0gY29sdW1uICYmIGNvbHVtbi5jb2x1bW5EZWYucXVlcnlDZWxsRWxlbWVudHMoc2VjdGlvbilbcm93UmVuZGVySW5kZXhdO1xuICAgIGlmICghZWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGZpbmQgYSBjZWxsIGZvciB0aGUgY29sdW1uICR7Y29sdW1uSWR9IGF0IHJlbmRlciBpbmRleCAke3Jvd1JlbmRlckluZGV4fWApO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm9wZW4oZXh0TmFtZSwgbmV3IEVsZW1lbnRSZWYoZWwpLCBjb25maWcsIGRhdGEpO1xuICB9XG5cbiAgb3BlbjxUID0gYW55PihleHROYW1lOiBzdHJpbmcsIHNvdXJjZTogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGNvbmZpZz86IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnLCBkYXRhPzogVCk6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFQ+IHtcbiAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKHsgLi4uREVGQVVMVF9PVkVSTEFZX1BBTkVMX0NPTkZJRyB9LCBjb25maWcgfHwge30pO1xuICAgIGNvbnN0IG1hdGNoID0gdGhpcy5maW5kTmFtZXNFeHRlbnNpb24oZXh0TmFtZSk7XG5cbiAgICBpZiAoIW1hdGNoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRoZSBvdmVybGF5IHBhbmVsIHdpdGggdGhlIG5hbWUgJyArIGV4dE5hbWUpO1xuICAgIH1cblxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLl9jcmVhdGVPdmVybGF5KHNvdXJjZSwgY29uZmlnKTtcbiAgICBjb25zdCBvdmVybGF5UGFuZWxSZWYgPSBuZXcgUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYob3ZlcmxheVJlZiwgZGF0YSk7XG4gICAgdGhpcy5fc2V0UG9zaXRpb24ob3ZlcmxheVJlZi5nZXRDb25maWcoKS5wb3NpdGlvblN0cmF0ZWd5IGFzIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSwgY29uZmlnKTtcblxuICAgIGlmIChtYXRjaCBpbnN0YW5jZW9mIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5KSB7XG4gICAgICBjb25zdCB0UG9ydGFsID0gdGhpcy5fZ2V0VGVtcGxhdGVQb3J0YWwobWF0Y2gudFJlZiwgb3ZlcmxheVBhbmVsUmVmKTtcbiAgICAgIGNvbnN0IHZpZXdSZWYgPSBvdmVybGF5UmVmLmF0dGFjaCh0UG9ydGFsKTtcbiAgICAgIHZpZXdSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB2aWV3UmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY1BvcnRhbCA9IHRoaXMuX2dldENvbXBvbmVudFBvcnRhbChvdmVybGF5UGFuZWxSZWYsIG1hdGNoKVxuICAgICAgY29uc3QgY21wUmVmID0gb3ZlcmxheVJlZi5hdHRhY2goY1BvcnRhbCk7XG4gICAgICBtYXRjaC5vbkNyZWF0ZWQobnVsbCwgY21wUmVmKTtcbiAgICB9XG5cbiAgICBvdmVybGF5UmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgcmV0dXJuIG92ZXJsYXlQYW5lbFJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIHRoZSBvdmVybGF5IGZyb20gdGhlIHByb3ZpZGVkIG1lbnUncyB0ZW1wbGF0ZSBhbmQgc2F2ZXMgaXRzXG4gICAqIE92ZXJsYXlSZWYgc28gdGhhdCBpdCBjYW4gYmUgYXR0YWNoZWQgdG8gdGhlIERPTSB3aGVuIG9wZW5NZW51IGlzIGNhbGxlZC5cbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXkoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGNvbmZpZzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5fZ2V0T3ZlcmxheUNvbmZpZyhlbGVtZW50LCBjb25maWcpO1xuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgICBvdmVybGF5UmVmLmdldENvbmZpZygpLmhhc0JhY2tkcm9wID0gISFjb25maWcuaGFzQmFja2Ryb3BcbiAgICAvLyBDb25zdW1lIHRoZSBga2V5ZG93bkV2ZW50c2AgaW4gb3JkZXIgdG8gcHJldmVudCB0aGVtIGZyb20gZ29pbmcgdG8gYW5vdGhlciBvdmVybGF5LlxuICAgIC8vIElkZWFsbHkgd2UnZCBhbHNvIGhhdmUgb3VyIGtleWJvYXJkIGV2ZW50IGxvZ2ljIGluIGhlcmUsIGhvd2V2ZXIgZG9pbmcgc28gd2lsbFxuICAgIC8vIGJyZWFrIGFueWJvZHkgdGhhdCBtYXkgaGF2ZSBpbXBsZW1lbnRlZCB0aGUgYE1hdE1lbnVQYW5lbGAgdGhlbXNlbHZlcy5cbiAgICBvdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKTtcblxuICAgIHJldHVybiBvdmVybGF5UmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGJ1aWxkcyB0aGUgY29uZmlndXJhdGlvbiBvYmplY3QgbmVlZGVkIHRvIGNyZWF0ZSB0aGUgb3ZlcmxheSwgdGhlIE92ZXJsYXlTdGF0ZS5cbiAgICogQHJldHVybnMgT3ZlcmxheUNvbmZpZ1xuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUNvbmZpZyhlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgY29uZmlnOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgIHJldHVybiBuZXcgT3ZlcmxheUNvbmZpZyh7XG4gICAgICBwb3NpdGlvblN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnBvc2l0aW9uKClcbiAgICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8oZWxlbWVudClcbiAgICAgICAgLndpdGhMb2NrZWRQb3NpdGlvbigpLFxuICAgICAgYmFja2Ryb3BDbGFzczogY29uZmlnLmJhY2tkcm9wQ2xhc3MgfHwgJ2Nkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wJywgLy8gVE9ETzogZG9uJ3QgdXNlIHRoZSBjZGsncyBjbGFzcywgY3JlYXRlIGl0XG4gICAgICBzY3JvbGxTdHJhdGVneTogdGhpcy5fc2Nyb2xsU3RyYXRlZ3koKSxcbiAgICAgIGRpcmVjdGlvbjogdGhpcy5fZGlyXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRUZW1wbGF0ZVBvcnRhbCh0UmVmOiBUZW1wbGF0ZVJlZjxQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQ+LCBvdmVybGF5UGFuZWxSZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmKSB7XG4gICAgY29uc3QgY29udGV4dDogUGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0ID0ge1xuICAgICAgZ3JpZDogdGhpcy5ncmlkLFxuICAgICAgcmVmOiBvdmVybGF5UGFuZWxSZWYsXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFRlbXBsYXRlUG9ydGFsKHRSZWYsIHRoaXMudmNSZWYsIGNvbnRleHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29tcG9uZW50UG9ydGFsKG92ZXJsYXlQYW5lbFJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRFeHRlbnNpb246IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uPGFueT4pIHtcbiAgICBjb25zdCBwb3J0YWxJbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZiwgdXNlVmFsdWU6IG92ZXJsYXlQYW5lbFJlZiB9LFxuICAgICAgXSxcbiAgICAgIHBhcmVudDogY29tcG9uZW50RXh0ZW5zaW9uLmluamVjdG9yIHx8IHRoaXMuaW5qZWN0b3IsXG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRQb3J0YWwoY29tcG9uZW50RXh0ZW5zaW9uLmNvbXBvbmVudCwgdGhpcy52Y1JlZiwgcG9ydGFsSW5qZWN0b3IsIGNvbXBvbmVudEV4dGVuc2lvbi5jZnIgfHwgbnVsbClcbiAgfVxuXG4gIHByaXZhdGUgX3NldFBvc2l0aW9uKHBvc2l0aW9uU3RyYXRlZ3k6IEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSwgY29uZmlnOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZykge1xuICAgIGxldCBbb3JpZ2luWCwgb3JpZ2luRmFsbGJhY2tYXTogSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICBjb25maWcueFBvcyA9PT0gJ2NlbnRlcidcbiAgICAgICAgPyBbJ2NlbnRlcicsICdjZW50ZXInXVxuICAgICAgICA6IGNvbmZpZy54UG9zID09PSAnYmVmb3JlJyA/IFsnZW5kJywgJ3N0YXJ0J10gOiBbJ3N0YXJ0JywgJ2VuZCddO1xuXG4gICAgbGV0IFtvdmVybGF5WSwgb3ZlcmxheUZhbGxiYWNrWV06IFZlcnRpY2FsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgIGNvbmZpZy55UG9zID09PSAnY2VudGVyJ1xuICAgICAgICA/IFsnY2VudGVyJywgJ2NlbnRlciddXG4gICAgICAgIDogY29uZmlnLnlQb3MgPT09ICdhYm92ZScgPyBbJ2JvdHRvbScsICd0b3AnXSA6IFsndG9wJywgJ2JvdHRvbSddO1xuXG4gICAgbGV0IFtvcmlnaW5ZLCBvcmlnaW5GYWxsYmFja1ldID0gW292ZXJsYXlZLCBvdmVybGF5RmFsbGJhY2tZXTtcbiAgICBsZXQgW292ZXJsYXlYLCBvdmVybGF5RmFsbGJhY2tYXSA9IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1hdO1xuICAgIGxldCBvZmZzZXRZID0gMDtcblxuICAgIGlmICghY29uZmlnLmluc2V0UG9zKSB7XG4gICAgICBpZiAob3ZlcmxheVkgIT09ICdjZW50ZXInKSB7XG4gICAgICAgIG9yaWdpblkgPSBvdmVybGF5WSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgfVxuICAgICAgaWYgKG92ZXJsYXlGYWxsYmFja1kgIT09ICdjZW50ZXInKSB7XG4gICAgICAgIG9yaWdpbkZhbGxiYWNrWSA9IG92ZXJsYXlGYWxsYmFja1kgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwb3NpdGlvblN0cmF0ZWd5LndpdGhQb3NpdGlvbnMoW1xuICAgICAge29yaWdpblgsIG9yaWdpblksIG92ZXJsYXlYLCBvdmVybGF5WSwgb2Zmc2V0WX0sXG4gICAgICB7b3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLCBvcmlnaW5ZLCBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCwgb3ZlcmxheVksIG9mZnNldFl9LFxuICAgICAge1xuICAgICAgICBvcmlnaW5YLFxuICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgIG92ZXJsYXlYLFxuICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG9yaWdpblg6IG9yaWdpbkZhbGxiYWNrWCxcbiAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICBvdmVybGF5WDogb3ZlcmxheUZhbGxiYWNrWCxcbiAgICAgICAgb3ZlcmxheVk6IG92ZXJsYXlGYWxsYmFja1ksXG4gICAgICAgIG9mZnNldFk6IC1vZmZzZXRZXG4gICAgICB9XG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIGZpbmROYW1lc0V4dGVuc2lvbihleHROYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgbWF0Y2g6IFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dCwgJ292ZXJsYXlQYW5lbHMnPiB8IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uPGFueT47XG4gICAgdGhpcy5ncmlkLnJlZ2lzdHJ5LmZvck11bHRpKCdvdmVybGF5UGFuZWxzJywgdmFsdWVzID0+IHtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICAgIGlmICh2YWx1ZS5uYW1lID09PSBleHROYW1lKSB7XG4gICAgICAgICAgbWF0Y2ggPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaDtcbiAgfVxufVxuXG5cbiJdfQ==