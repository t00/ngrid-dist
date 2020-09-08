/**
 * @fileoverview added by tsickle
 * Generated from: lib/overlay-panel.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const DEFAULT_OVERLAY_PANEL_CONFIG = {
    hasBackdrop: false,
    xPos: 'center',
    yPos: 'center',
    insetPos: false,
};
export class PblNgridOverlayPanelFactory {
    /**
     * @param {?} _overlay
     * @param {?} _dir
     */
    constructor(_overlay, _dir) {
        this._overlay = _overlay;
        this._dir = _dir;
    }
    /**
     * @template T
     * @param {?} grid
     * @return {?}
     */
    create(grid) {
        return new PblNgridOverlayPanel(this._overlay, this._dir, grid);
    }
}
PblNgridOverlayPanelFactory.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PblNgridOverlayPanelFactory.ctorParameters = () => [
    { type: Overlay },
    { type: Directionality }
];
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
export class PblNgridOverlayPanel {
    /**
     * @param {?} _overlay
     * @param {?} _dir
     * @param {?} grid
     */
    constructor(_overlay, _dir, grid) {
        this._overlay = _overlay;
        this._dir = _dir;
        this.grid = grid;
        /** @type {?} */
        const controller = PblNgridPluginController.find(grid);
        this.injector = controller.injector;
        this.vcRef = controller.injector.get(ViewContainerRef);
        this._scrollStrategy = (/**
         * @return {?}
         */
        () => _overlay.scrollStrategies.reposition());
    }
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
    openGridCell(extName, columnId, rowRenderPosition, config, data) {
        /** @type {?} */
        const column = this.grid.columnApi.findColumn(columnId);
        if (!column) {
            throw new Error('Could not find the column ' + columnId);
        }
        /** @type {?} */
        let section;
        /** @type {?} */
        let rowRenderIndex = 0;
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
        const el = column && column.columnDef.queryCellElements(section)[rowRenderIndex];
        if (!el) {
            throw new Error(`Could not find a cell for the column ${columnId} at render index ${rowRenderIndex}`);
        }
        return this.open(extName, new ElementRef(el), config, data);
    }
    /**
     * @template T
     * @param {?} extName
     * @param {?} source
     * @param {?=} config
     * @param {?=} data
     * @return {?}
     */
    open(extName, source, config, data) {
        config = Object.assign(Object.assign({}, DEFAULT_OVERLAY_PANEL_CONFIG), config || {});
        /** @type {?} */
        const match = this.findNamesExtension(extName);
        if (!match) {
            throw new Error('Could not find the overlay panel with the name ' + extName);
        }
        /** @type {?} */
        const overlayRef = this._createOverlay(source, config);
        /** @type {?} */
        const overlayPanelRef = new PblNgridOverlayPanelRef(overlayRef, data);
        this._setPosition((/** @type {?} */ (overlayRef.getConfig().positionStrategy)), config);
        if (match instanceof PblNgridMultiTemplateRegistry) {
            /** @type {?} */
            const tPortal = this._getTemplatePortal(match.tRef, overlayPanelRef);
            /** @type {?} */
            const viewRef = overlayRef.attach(tPortal);
            viewRef.markForCheck();
            viewRef.detectChanges();
        }
        else {
            /** @type {?} */
            const cPortal = this._getComponentPortal(overlayPanelRef, match);
            /** @type {?} */
            const cmpRef = overlayRef.attach(cPortal);
            match.onCreated(null, cmpRef);
        }
        overlayRef.updatePosition();
        return overlayPanelRef;
    }
    /**
     * This method creates the overlay from the provided menu's template and saves its
     * OverlayRef so that it can be attached to the DOM when openMenu is called.
     * @private
     * @param {?} element
     * @param {?} config
     * @return {?}
     */
    _createOverlay(element, config) {
        /** @type {?} */
        const overlayConfig = this._getOverlayConfig(element, config);
        /** @type {?} */
        const overlayRef = this._overlay.create(overlayConfig);
        overlayRef.getConfig().hasBackdrop = !!config.hasBackdrop;
        // Consume the `keydownEvents` in order to prevent them from going to another overlay.
        // Ideally we'd also have our keyboard event logic in here, however doing so will
        // break anybody that may have implemented the `MatMenuPanel` themselves.
        overlayRef.keydownEvents().subscribe();
        return overlayRef;
    }
    /**
     * This method builds the configuration object needed to create the overlay, the OverlayState.
     * @private
     * @param {?} element
     * @param {?} config
     * @return {?} OverlayConfig
     */
    _getOverlayConfig(element, config) {
        /** @type {?} */
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(element)
            .withLockedPosition();
        return new OverlayConfig({
            positionStrategy,
            backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
            // TODO: don't use the cdk's class, create it
            scrollStrategy: this._scrollStrategy(),
            direction: this._dir
        });
    }
    /**
     * @private
     * @param {?} tRef
     * @param {?} overlayPanelRef
     * @return {?}
     */
    _getTemplatePortal(tRef, overlayPanelRef) {
        /** @type {?} */
        const context = {
            grid: this.grid,
            ref: overlayPanelRef,
        };
        return new TemplatePortal(tRef, this.vcRef, context);
    }
    /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} componentExtension
     * @return {?}
     */
    _getComponentPortal(overlayPanelRef, componentExtension) {
        /** @type {?} */
        const portalInjector = Injector.create({
            providers: [
                { provide: PblNgridOverlayPanelRef, useValue: overlayPanelRef },
            ],
            parent: componentExtension.injector || this.injector,
        });
        return new ComponentPortal(componentExtension.component, this.vcRef, portalInjector, componentExtension.cfr || null);
    }
    /**
     * @private
     * @param {?} positionStrategy
     * @param {?} config
     * @return {?}
     */
    _setPosition(positionStrategy, config) {
        let [originX, originFallbackX] = config.xPos === 'center'
            ? ['center', 'center']
            : config.xPos === 'before' ? ['end', 'start'] : ['start', 'end'];
        let [overlayY, overlayFallbackY] = config.yPos === 'center'
            ? ['center', 'center']
            : config.yPos === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];
        let [originY, originFallbackY] = [overlayY, overlayFallbackY];
        let [overlayX, overlayFallbackX] = [originX, originFallbackX];
        /** @type {?} */
        let offsetY = 0;
        if (!config.insetPos) {
            if (overlayY !== 'center') {
                originY = overlayY === 'top' ? 'bottom' : 'top';
            }
            if (overlayFallbackY !== 'center') {
                originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
            }
        }
        positionStrategy.withPositions([
            { originX, originY, overlayX, overlayY, offsetY },
            { originX: originFallbackX, originY, overlayX: overlayFallbackX, overlayY, offsetY },
            {
                originX,
                originY: originFallbackY,
                overlayX,
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
    }
    /**
     * @private
     * @param {?} extName
     * @return {?}
     */
    findNamesExtension(extName) {
        /** @type {?} */
        let match;
        this.grid.registry.forMulti('overlayPanels', (/**
         * @param {?} values
         * @return {?}
         */
        values => {
            for (const value of values) {
                if (value.name === extName) {
                    match = value;
                    return true;
                }
            }
        }));
        return match;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsLyIsInNvdXJjZXMiOlsibGliL292ZXJsYXktcGFuZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBZ0MsTUFBTSxlQUFlLENBQUM7QUFDakgsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFHTCxPQUFPLEVBQ1AsYUFBYSxHQUlkLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RSxPQUFPLEVBQUUsd0JBQXdCLEVBQXFCLDZCQUE2QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7O0FBVzlELGdEQU1DOzs7SUFMQyxpREFBc0I7O0lBQ3RCLG1EQUF1Qjs7SUFDdkIsMENBQXFDOztJQUNyQywwQ0FBb0M7O0lBQ3BDLDhDQUFtQjs7O01BR2YsNEJBQTRCLEdBQStCO0lBQy9ELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLElBQUksRUFBRSxRQUFRO0lBQ2QsSUFBSSxFQUFFLFFBQVE7SUFDZCxRQUFRLEVBQUUsS0FBSztDQUNoQjtBQUdELE1BQU0sT0FBTywyQkFBMkI7Ozs7O0lBQ3RDLFlBQW9CLFFBQWlCLEVBQVUsSUFBb0I7UUFBL0MsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLFNBQUksR0FBSixJQUFJLENBQWdCO0lBQUksQ0FBQzs7Ozs7O0lBRXhFLE1BQU0sQ0FBSSxJQUEwQjtRQUNsQyxPQUFPLElBQUksb0JBQW9CLENBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7OztZQU5GLFVBQVU7Ozs7WUFyQ1QsT0FBTztZQUpBLGNBQWM7Ozs7Ozs7SUEyQ1QsK0NBQXlCOzs7OztJQUFFLDJDQUE0Qjs7Ozs7QUFPckUsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBTS9CLFlBQW9CLFFBQWlCLEVBQ2pCLElBQW9CLEVBQ1osSUFBMEI7UUFGbEMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFnQjtRQUNaLFNBQUksR0FBSixJQUFJLENBQXNCOztjQUM5QyxVQUFVLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxlQUFlOzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLENBQUEsQ0FBQztJQUN0RSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQVlELFlBQVksQ0FBVSxPQUFlLEVBQUUsUUFBZ0IsRUFBRSxpQkFBK0MsRUFBRSxNQUFtQyxFQUFFLElBQVE7O2NBQy9JLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixHQUFHLFFBQVEsQ0FBQyxDQUFDO1NBQzFEOztZQUVHLE9BQXNDOztZQUN0QyxjQUFjLEdBQUcsQ0FBQztRQUN0QixRQUFRLGlCQUFpQixFQUFFO1lBQ3pCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxRQUFRO2dCQUNYLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztnQkFDNUIsTUFBTTtZQUNSO2dCQUNFLElBQUksT0FBTyxpQkFBaUIsS0FBSyxRQUFRLEVBQUU7b0JBQ3pDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ2xCLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQztpQkFDcEM7Z0JBQ0QsTUFBTTtTQUNUO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsa0ZBQWtGLENBQUMsQ0FBQztTQUNyRzs7Y0FFSyxFQUFFLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQ2hGLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxRQUFRLG9CQUFvQixjQUFjLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZHO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Ozs7Ozs7O0lBRUQsSUFBSSxDQUFVLE9BQWUsRUFBRSxNQUErQixFQUFFLE1BQW1DLEVBQUUsSUFBUTtRQUMzRyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sbUJBQU0sNEJBQTRCLEdBQUksTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDOztjQUNwRSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztRQUU5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxpREFBaUQsR0FBRyxPQUFPLENBQUMsQ0FBQztTQUM5RTs7Y0FFSyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDOztjQUNoRCxlQUFlLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsbUJBQUEsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFxQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXhHLElBQUksS0FBSyxZQUFZLDZCQUE2QixFQUFFOztrQkFDNUMsT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQzs7a0JBQzlELE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUMxQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdkIsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3pCO2FBQU07O2tCQUNDLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQzs7a0JBQzFELE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvQjtRQUVELFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUM1QixPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDOzs7Ozs7Ozs7SUFNTyxjQUFjLENBQUMsT0FBZ0MsRUFBRSxNQUFrQzs7Y0FDbkYsYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDOztjQUN2RCxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1FBQ3RELFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUE7UUFDekQsc0ZBQXNGO1FBQ3RGLGlGQUFpRjtRQUNqRix5RUFBeUU7UUFDekUsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRXZDLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7Ozs7Ozs7O0lBTU8saUJBQWlCLENBQUMsT0FBZ0MsRUFBRSxNQUFrQzs7Y0FDdEYsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVE7YUFDbkMsUUFBUSxFQUFFO2FBQ1YsbUJBQW1CLENBQUMsT0FBTyxDQUFDO2FBQzVCLGtCQUFrQixFQUFFO1FBRXZCLE9BQU8sSUFBSSxhQUFhLENBQUM7WUFDdkIsZ0JBQWdCO1lBQ2hCLGFBQWEsRUFBRSxNQUFNLENBQUMsYUFBYSxJQUFJLGtDQUFrQzs7WUFDekUsY0FBYyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ3JCLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxJQUE4QyxFQUFFLGVBQXdDOztjQUMzRyxPQUFPLEdBQWdDO1lBQzNDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEdBQUcsRUFBRSxlQUFlO1NBQ3JCO1FBQ0QsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7Ozs7O0lBRU8sbUJBQW1CLENBQUMsZUFBd0MsRUFDeEMsa0JBQStEOztjQUNuRixjQUFjLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNyQyxTQUFTLEVBQUU7Z0JBQ1QsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRTthQUNoRTtZQUNELE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVE7U0FDckQsQ0FBQztRQUNGLE9BQU8sSUFBSSxlQUFlLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQTtJQUN0SCxDQUFDOzs7Ozs7O0lBRU8sWUFBWSxDQUFDLGdCQUFtRCxFQUFFLE1BQWtDO1lBQ3RHLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxHQUM1QixNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDdEIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztZQUN0QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7WUFFaEUsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsR0FDOUIsTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRO1lBQ3RCLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7WUFDdEIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBRWpFLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDO1lBQ3pELENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDOztZQUN6RCxPQUFPLEdBQUcsQ0FBQztRQUVmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ3BCLElBQUksUUFBUSxLQUFLLFFBQVEsRUFBRTtnQkFDekIsT0FBTyxHQUFHLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2pEO1lBQ0QsSUFBSSxnQkFBZ0IsS0FBSyxRQUFRLEVBQUU7Z0JBQ2pDLGVBQWUsR0FBRyxnQkFBZ0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ2pFO1NBQ0Y7UUFFRCxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7WUFDN0IsRUFBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDO1lBQy9DLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUM7WUFDbEY7Z0JBQ0UsT0FBTztnQkFDUCxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsUUFBUTtnQkFDUixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxPQUFPO2FBQ2xCO1lBQ0Q7Z0JBQ0UsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxPQUFPO2FBQ2xCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7O0lBRU8sa0JBQWtCLENBQUMsT0FBZTs7WUFDcEMsS0FBZ0k7UUFDcEksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGVBQWU7Ozs7UUFBRSxNQUFNLENBQUMsRUFBRTtZQUNwRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDMUIsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDZCxPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7UUFDSCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRjs7Ozs7O0lBaE1DLHFDQUFnQzs7Ozs7SUFDaEMsd0NBQTJCOzs7OztJQUMzQiwrQ0FBOEM7Ozs7O0lBRWxDLHdDQUF5Qjs7Ozs7SUFDekIsb0NBQTRCOztJQUM1QixvQ0FBMEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBJbmplY3RvciwgRW1iZWRkZWRWaWV3UmVmLCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uYWxpdHkgfSBmcm9tICdAYW5ndWxhci9jZGsvYmlkaSc7XG5pbXBvcnQge1xuICBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksXG4gIEhvcml6b250YWxDb25uZWN0aW9uUG9zLFxuICBPdmVybGF5LFxuICBPdmVybGF5Q29uZmlnLFxuICBPdmVybGF5UmVmLFxuICBWZXJ0aWNhbENvbm5lY3Rpb25Qb3MsXG4gIFNjcm9sbFN0cmF0ZWd5LFxufSBmcm9tICdAYW5ndWxhci9jZGsvb3ZlcmxheSc7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCwgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBSb3dDb250ZXh0IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlciwgUGJsTmdyaWRDb21wb25lbnQsIFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5IH0gZnJvbSAnQHBlYnVsYS9uZ3JpZCc7XG5cbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29tcG9uZW50RXh0ZW5zaW9uIH0gZnJvbSAnLi9jb21wb25lbnQtcmVnaXN0cnktZXh0ZW5zaW9uJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmIH0gZnJvbSAnLi9vdmVybGF5LXBhbmVsLXJlZic7XG5pbXBvcnQgeyBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQgfSBmcm9tICcuL292ZXJsYXktcGFuZWwtZGVmJztcblxuZGVjbGFyZSBtb2R1bGUgJ0BwZWJ1bGEvbmdyaWQvbGliL2dyaWQvc2VydmljZXMvZ3JpZC1yZWdpc3RyeS5zZXJ2aWNlJyB7XG4gIGludGVyZmFjZSBQYmxOZ3JpZE11bHRpUmVnaXN0cnlNYXAge1xuICAgIG92ZXJsYXlQYW5lbHM/OlxuICAgICAgfCBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxhbnksICdvdmVybGF5UGFuZWxzJz5cbiAgICAgIHwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55PjtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnIHtcbiAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuICBiYWNrZHJvcENsYXNzPzogc3RyaW5nO1xuICB4UG9zPzogJ2JlZm9yZScgfCAnY2VudGVyJyB8ICdhZnRlcic7XG4gIHlQb3M/OiAnYWJvdmUnIHwgJ2NlbnRlcicgfCAnYmVsb3cnO1xuICBpbnNldFBvcz86IGJvb2xlYW47XG59XG5cbmNvbnN0IERFRkFVTFRfT1ZFUkxBWV9QQU5FTF9DT05GSUc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnID0ge1xuICBoYXNCYWNrZHJvcDogZmFsc2UsXG4gIHhQb3M6ICdjZW50ZXInLFxuICB5UG9zOiAnY2VudGVyJyxcbiAgaW5zZXRQb3M6IGZhbHNlLFxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsRmFjdG9yeSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHkpIHsgfVxuXG4gIGNyZWF0ZTxUPihncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPik6IFBibE5ncmlkT3ZlcmxheVBhbmVsPFQ+IHtcbiAgICByZXR1cm4gbmV3IFBibE5ncmlkT3ZlcmxheVBhbmVsPFQ+KHRoaXMuX292ZXJsYXksIHRoaXMuX2RpciwgZ3JpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFBibE5ncmlkT3ZlcmxheVBhbmVsPFQgPSBhbnk+IHtcblxuICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcjtcbiAgcHJpdmF0ZSBfc2Nyb2xsU3RyYXRlZ3k6ICgpID0+IFNjcm9sbFN0cmF0ZWd5O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgICAgICAgICAgIHByaXZhdGUgX2RpcjogRGlyZWN0aW9uYWxpdHksXG4gICAgICAgICAgICAgIHB1YmxpYyByZWFkb25seSBncmlkOiBQYmxOZ3JpZENvbXBvbmVudDxUPikge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBQYmxOZ3JpZFBsdWdpbkNvbnRyb2xsZXIuZmluZChncmlkKTtcbiAgICB0aGlzLmluamVjdG9yID0gY29udHJvbGxlci5pbmplY3RvcjtcbiAgICB0aGlzLnZjUmVmID0gY29udHJvbGxlci5pbmplY3Rvci5nZXQoVmlld0NvbnRhaW5lclJlZik7XG4gICAgdGhpcy5fc2Nyb2xsU3RyYXRlZ3kgPSAoKSA9PiBfb3ZlcmxheS5zY3JvbGxTdHJhdGVnaWVzLnJlcG9zaXRpb24oKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIE9wZW5zIGEgcGFuZWwgcmVsYXRpdmUgdG8gYSBjZWxsIGVsZW1lbnQgdXNpbmcgdGhlIG92ZXJsYXkgcGFuZWwgZXh0ZW5zaW9uIHJlZ2lzdHJ5IHRlbXBsYXRlL2NvbXBvbmVudCB3aXRoIHRoZSBuYW1lIHByb3ZpZGVkIGluIGBleHROYW1lYC5cbiAgICogVGhlIGNlbGwgZWxlbWVudCBpcyByZWZlcmVuY2VkIGJ5IHRoZSBgY29sdW1uSWRgIGFuZCB0aGUgYHJvd1JlbmRlclBvc2l0aW9uYC5cbiAgICpcbiAgICogSWYgdGhlIGByb3dSZW5kZXJQb3NpdGlvbmAgaXMgXCJoZWFkZXJcIiBvciBcImZvb3RlclwiIHRoZW4gdGhlIGdyaWQncyBoZWFkZXIgLyBmb290ZXIgcm93cyBhcmUgdGFyZ2V0ZWQsIG90aGVyd2lzZSB0aGUgbnVtYmVyIHByb3ZpZGVkIHNob3VsZCByZWZlcmVuY2VcbiAgICogdGhlIHJlbmRlcmVkIHJvdyBpbmRleCB0byB1c2UgdG8gZ2V0IHRoZSBjZWxsIGZyb20uXG4gICAqXG4gICAqID4gTm90ZSB0aGF0IHRoaXMgaGVscGVyIG1ldGhvZCBkb2VzIG5vdCBhbGxvdyB0YXJnZXRpbmcgbWV0YSBjZWxscy5cbiAgICovXG4gIG9wZW5HcmlkQ2VsbDxUID0gYW55PihleHROYW1lOiBzdHJpbmcsIGNvbHVtbklkOiBzdHJpbmcsIHJvd1JlbmRlclBvc2l0aW9uOiBudW1iZXIgfCAnaGVhZGVyJyB8ICdmb290ZXInLCBjb25maWc/OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZywgZGF0YT86IFQpOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjxUPiB7XG4gICAgY29uc3QgY29sdW1uID0gdGhpcy5ncmlkLmNvbHVtbkFwaS5maW5kQ29sdW1uKGNvbHVtbklkKTtcbiAgICBpZiAoIWNvbHVtbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgY29sdW1uICcgKyBjb2x1bW5JZCk7XG4gICAgfVxuXG4gICAgbGV0IHNlY3Rpb246ICd0YWJsZScgfCAnaGVhZGVyJyB8ICdmb290ZXInO1xuICAgIGxldCByb3dSZW5kZXJJbmRleCA9IDA7XG4gICAgc3dpdGNoIChyb3dSZW5kZXJQb3NpdGlvbikge1xuICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgIHNlY3Rpb24gPSByb3dSZW5kZXJQb3NpdGlvbjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodHlwZW9mIHJvd1JlbmRlclBvc2l0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIHNlY3Rpb24gPSAndGFibGUnO1xuICAgICAgICAgIHJvd1JlbmRlckluZGV4ID0gcm93UmVuZGVyUG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKCFzZWN0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJyb3dSZW5kZXJQb3NpdGlvblwiIHByb3ZpZGVkLCB1c2UgXCJoZWFkZXJcIiwgXCJmb290ZXJcIiBvciBhbnkgbnVtYmVyID49IDAuJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZWwgPSBjb2x1bW4gJiYgY29sdW1uLmNvbHVtbkRlZi5xdWVyeUNlbGxFbGVtZW50cyhzZWN0aW9uKVtyb3dSZW5kZXJJbmRleF07XG4gICAgaWYgKCFlbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgZmluZCBhIGNlbGwgZm9yIHRoZSBjb2x1bW4gJHtjb2x1bW5JZH0gYXQgcmVuZGVyIGluZGV4ICR7cm93UmVuZGVySW5kZXh9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMub3BlbihleHROYW1lLCBuZXcgRWxlbWVudFJlZihlbCksIGNvbmZpZywgZGF0YSk7XG4gIH1cblxuICBvcGVuPFQgPSBhbnk+KGV4dE5hbWU6IHN0cmluZywgc291cmNlOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgY29uZmlnPzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcsIGRhdGE/OiBUKTogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWY8VD4ge1xuICAgIGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyAuLi5ERUZBVUxUX09WRVJMQVlfUEFORUxfQ09ORklHIH0sIGNvbmZpZyB8fCB7fSk7XG4gICAgY29uc3QgbWF0Y2ggPSB0aGlzLmZpbmROYW1lc0V4dGVuc2lvbihleHROYW1lKTtcblxuICAgIGlmICghbWF0Y2gpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgdGhlIG92ZXJsYXkgcGFuZWwgd2l0aCB0aGUgbmFtZSAnICsgZXh0TmFtZSk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuX2NyZWF0ZU92ZXJsYXkoc291cmNlLCBjb25maWcpO1xuICAgIGNvbnN0IG92ZXJsYXlQYW5lbFJlZiA9IG5ldyBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZihvdmVybGF5UmVmLCBkYXRhKTtcbiAgICB0aGlzLl9zZXRQb3NpdGlvbihvdmVybGF5UmVmLmdldENvbmZpZygpLnBvc2l0aW9uU3RyYXRlZ3kgYXMgRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LCBjb25maWcpO1xuXG4gICAgaWYgKG1hdGNoIGluc3RhbmNlb2YgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkpIHtcbiAgICAgIGNvbnN0IHRQb3J0YWwgPSB0aGlzLl9nZXRUZW1wbGF0ZVBvcnRhbChtYXRjaC50UmVmLCBvdmVybGF5UGFuZWxSZWYpO1xuICAgICAgY29uc3Qgdmlld1JlZiA9IG92ZXJsYXlSZWYuYXR0YWNoKHRQb3J0YWwpO1xuICAgICAgdmlld1JlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHZpZXdSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjUG9ydGFsID0gdGhpcy5fZ2V0Q29tcG9uZW50UG9ydGFsKG92ZXJsYXlQYW5lbFJlZiwgbWF0Y2gpXG4gICAgICBjb25zdCBjbXBSZWYgPSBvdmVybGF5UmVmLmF0dGFjaChjUG9ydGFsKTtcbiAgICAgIG1hdGNoLm9uQ3JlYXRlZChudWxsLCBjbXBSZWYpO1xuICAgIH1cblxuICAgIG92ZXJsYXlSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICByZXR1cm4gb3ZlcmxheVBhbmVsUmVmO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgdGhlIG92ZXJsYXkgZnJvbSB0aGUgcHJvdmlkZWQgbWVudSdzIHRlbXBsYXRlIGFuZCBzYXZlcyBpdHNcbiAgICogT3ZlcmxheVJlZiBzbyB0aGF0IGl0IGNhbiBiZSBhdHRhY2hlZCB0byB0aGUgRE9NIHdoZW4gb3Blbk1lbnUgaXMgY2FsbGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheShlbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PiwgY29uZmlnOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZyk6IE92ZXJsYXlSZWYge1xuICAgIGNvbnN0IG92ZXJsYXlDb25maWcgPSB0aGlzLl9nZXRPdmVybGF5Q29uZmlnKGVsZW1lbnQsIGNvbmZpZyk7XG4gICAgY29uc3Qgb3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXkuY3JlYXRlKG92ZXJsYXlDb25maWcpO1xuICAgIG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkuaGFzQmFja2Ryb3AgPSAhIWNvbmZpZy5oYXNCYWNrZHJvcFxuICAgIC8vIENvbnN1bWUgdGhlIGBrZXlkb3duRXZlbnRzYCBpbiBvcmRlciB0byBwcmV2ZW50IHRoZW0gZnJvbSBnb2luZyB0byBhbm90aGVyIG92ZXJsYXkuXG4gICAgLy8gSWRlYWxseSB3ZSdkIGFsc28gaGF2ZSBvdXIga2V5Ym9hcmQgZXZlbnQgbG9naWMgaW4gaGVyZSwgaG93ZXZlciBkb2luZyBzbyB3aWxsXG4gICAgLy8gYnJlYWsgYW55Ym9keSB0aGF0IG1heSBoYXZlIGltcGxlbWVudGVkIHRoZSBgTWF0TWVudVBhbmVsYCB0aGVtc2VsdmVzLlxuICAgIG92ZXJsYXlSZWYua2V5ZG93bkV2ZW50cygpLnN1YnNjcmliZSgpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXlSZWY7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYnVpbGRzIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCBuZWVkZWQgdG8gY3JlYXRlIHRoZSBvdmVybGF5LCB0aGUgT3ZlcmxheVN0YXRlLlxuICAgKiBAcmV0dXJucyBPdmVybGF5Q29uZmlnXG4gICAqL1xuICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnKGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgcG9zaXRpb25TdHJhdGVneSA9IHRoaXMuX292ZXJsYXlcbiAgICAgIC5wb3NpdGlvbigpXG4gICAgICAuZmxleGlibGVDb25uZWN0ZWRUbyhlbGVtZW50KVxuICAgICAgLndpdGhMb2NrZWRQb3NpdGlvbigpO1xuXG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3ksXG4gICAgICBiYWNrZHJvcENsYXNzOiBjb25maWcuYmFja2Ryb3BDbGFzcyB8fCAnY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AnLCAvLyBUT0RPOiBkb24ndCB1c2UgdGhlIGNkaydzIGNsYXNzLCBjcmVhdGUgaXRcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9zY3JvbGxTdHJhdGVneSgpLFxuICAgICAgZGlyZWN0aW9uOiB0aGlzLl9kaXJcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFRlbXBsYXRlUG9ydGFsKHRSZWY6IFRlbXBsYXRlUmVmPFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dD4sIG92ZXJsYXlQYW5lbFJlZjogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYpIHtcbiAgICBjb25zdCBjb250ZXh0OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQgPSB7XG4gICAgICBncmlkOiB0aGlzLmdyaWQsXG4gICAgICByZWY6IG92ZXJsYXlQYW5lbFJlZixcbiAgICB9O1xuICAgIHJldHVybiBuZXcgVGVtcGxhdGVQb3J0YWwodFJlZiwgdGhpcy52Y1JlZiwgY29udGV4dCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDb21wb25lbnRQb3J0YWwob3ZlcmxheVBhbmVsUmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvbmVudEV4dGVuc2lvbjogUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55Pikge1xuICAgIGNvbnN0IHBvcnRhbEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmLCB1c2VWYWx1ZTogb3ZlcmxheVBhbmVsUmVmIH0sXG4gICAgICBdLFxuICAgICAgcGFyZW50OiBjb21wb25lbnRFeHRlbnNpb24uaW5qZWN0b3IgfHwgdGhpcy5pbmplY3RvcixcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRFeHRlbnNpb24uY29tcG9uZW50LCB0aGlzLnZjUmVmLCBwb3J0YWxJbmplY3RvciwgY29tcG9uZW50RXh0ZW5zaW9uLmNmciB8fCBudWxsKVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0UG9zaXRpb24ocG9zaXRpb25TdHJhdGVneTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5LCBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnKSB7XG4gICAgbGV0IFtvcmlnaW5YLCBvcmlnaW5GYWxsYmFja1hdOiBIb3Jpem9udGFsQ29ubmVjdGlvblBvc1tdID1cbiAgICAgIGNvbmZpZy54UG9zID09PSAnY2VudGVyJ1xuICAgICAgICA/IFsnY2VudGVyJywgJ2NlbnRlciddXG4gICAgICAgIDogY29uZmlnLnhQb3MgPT09ICdiZWZvcmUnID8gWydlbmQnLCAnc3RhcnQnXSA6IFsnc3RhcnQnLCAnZW5kJ107XG5cbiAgICBsZXQgW292ZXJsYXlZLCBvdmVybGF5RmFsbGJhY2tZXTogVmVydGljYWxDb25uZWN0aW9uUG9zW10gPVxuICAgICAgY29uZmlnLnlQb3MgPT09ICdjZW50ZXInXG4gICAgICAgID8gWydjZW50ZXInLCAnY2VudGVyJ11cbiAgICAgICAgOiBjb25maWcueVBvcyA9PT0gJ2Fib3ZlJyA/IFsnYm90dG9tJywgJ3RvcCddIDogWyd0b3AnLCAnYm90dG9tJ107XG5cbiAgICBsZXQgW29yaWdpblksIG9yaWdpbkZhbGxiYWNrWV0gPSBbb3ZlcmxheVksIG92ZXJsYXlGYWxsYmFja1ldO1xuICAgIGxldCBbb3ZlcmxheVgsIG92ZXJsYXlGYWxsYmFja1hdID0gW29yaWdpblgsIG9yaWdpbkZhbGxiYWNrWF07XG4gICAgbGV0IG9mZnNldFkgPSAwO1xuXG4gICAgaWYgKCFjb25maWcuaW5zZXRQb3MpIHtcbiAgICAgIGlmIChvdmVybGF5WSAhPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgb3JpZ2luWSA9IG92ZXJsYXlZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICB9XG4gICAgICBpZiAob3ZlcmxheUZhbGxiYWNrWSAhPT0gJ2NlbnRlcicpIHtcbiAgICAgICAgb3JpZ2luRmFsbGJhY2tZID0gb3ZlcmxheUZhbGxiYWNrWSA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHBvc2l0aW9uU3RyYXRlZ3kud2l0aFBvc2l0aW9ucyhbXG4gICAgICB7b3JpZ2luWCwgb3JpZ2luWSwgb3ZlcmxheVgsIG92ZXJsYXlZLCBvZmZzZXRZfSxcbiAgICAgIHtvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsIG9yaWdpblksIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLCBvdmVybGF5WSwgb2Zmc2V0WX0sXG4gICAgICB7XG4gICAgICAgIG9yaWdpblgsXG4gICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgb3ZlcmxheVgsXG4gICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWDogb3JpZ2luRmFsbGJhY2tYLFxuICAgICAgICBvcmlnaW5ZOiBvcmlnaW5GYWxsYmFja1ksXG4gICAgICAgIG92ZXJsYXlYOiBvdmVybGF5RmFsbGJhY2tYLFxuICAgICAgICBvdmVybGF5WTogb3ZlcmxheUZhbGxiYWNrWSxcbiAgICAgICAgb2Zmc2V0WTogLW9mZnNldFlcbiAgICAgIH1cbiAgICBdKTtcbiAgfVxuXG4gIHByaXZhdGUgZmluZE5hbWVzRXh0ZW5zaW9uKGV4dE5hbWU6IHN0cmluZykge1xuICAgIGxldCBtYXRjaDogUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnk8UGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0LCAnb3ZlcmxheVBhbmVscyc+IHwgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb248YW55PjtcbiAgICB0aGlzLmdyaWQucmVnaXN0cnkuZm9yTXVsdGkoJ292ZXJsYXlQYW5lbHMnLCB2YWx1ZXMgPT4ge1xuICAgICAgZm9yIChjb25zdCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgICAgaWYgKHZhbHVlLm5hbWUgPT09IGV4dE5hbWUpIHtcbiAgICAgICAgICBtYXRjaCA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG59XG5cblxuIl19