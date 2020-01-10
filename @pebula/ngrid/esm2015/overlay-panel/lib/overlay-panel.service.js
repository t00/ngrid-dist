/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        return new OverlayConfig({
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(element)
                .withLockedPosition(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3ZlcmxheS1wYW5lbC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHBlYnVsYS9uZ3JpZC9vdmVybGF5LXBhbmVsLyIsInNvdXJjZXMiOlsibGliL292ZXJsYXktcGFuZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFnQyxNQUFNLGVBQWUsQ0FBQztBQUNqSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUdMLE9BQU8sRUFDUCxhQUFhLEdBSWQsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRFLE9BQU8sRUFBRSx3QkFBd0IsRUFBcUIsNkJBQTZCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0csT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFXOUQsZ0RBTUM7OztJQUxDLGlEQUFzQjs7SUFDdEIsbURBQXVCOztJQUN2QiwwQ0FBcUM7O0lBQ3JDLDBDQUFvQzs7SUFDcEMsOENBQW1COzs7TUFHZiw0QkFBNEIsR0FBK0I7SUFDL0QsV0FBVyxFQUFFLEtBQUs7SUFDbEIsSUFBSSxFQUFFLFFBQVE7SUFDZCxJQUFJLEVBQUUsUUFBUTtJQUNkLFFBQVEsRUFBRSxLQUFLO0NBQ2hCO0FBR0QsTUFBTSxPQUFPLDJCQUEyQjs7Ozs7SUFDdEMsWUFBb0IsUUFBaUIsRUFBVSxJQUFvQjtRQUEvQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBZ0I7SUFBSSxDQUFDOzs7Ozs7SUFFeEUsTUFBTSxDQUFJLElBQTBCO1FBQ2xDLE9BQU8sSUFBSSxvQkFBb0IsQ0FBSSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxD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QWdCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQztZQUNsRjtnQkFDRSxPQUFPO2dCQUNQLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixRQUFRO2dCQUNSLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU87YUFDbEI7WUFDRDtnQkFDRSxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLE9BQU8sRUFBRSxDQUFDLE9BQU87YUFDbEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxPQUFlOztZQUNwQyxLQUFnSTtRQUNwSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsZUFBZTs7OztRQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3BELEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO2dCQUMxQixJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO29CQUMxQixLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUNkLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2FBQ0Y7UUFDSCxDQUFDLEVBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGOzs7Ozs7SUE3TEMscUNBQWdDOzs7OztJQUNoQyx3Q0FBMkI7Ozs7O0lBQzNCLCtDQUE4Qzs7Ozs7SUFFbEMsd0NBQXlCOzs7OztJQUN6QixvQ0FBNEI7O0lBQzVCLG9DQUEwQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBFbWJlZGRlZFZpZXdSZWYsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEaXJlY3Rpb25hbGl0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9iaWRpJztcbmltcG9ydCB7XG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgSG9yaXpvbnRhbENvbm5lY3Rpb25Qb3MsXG4gIE92ZXJsYXksXG4gIE92ZXJsYXlDb25maWcsXG4gIE92ZXJsYXlSZWYsXG4gIFZlcnRpY2FsQ29ubmVjdGlvblBvcyxcbiAgU2Nyb2xsU3RyYXRlZ3ksXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IFRlbXBsYXRlUG9ydGFsLCBDb21wb25lbnRQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IFJvd0NvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jZGsvdGFibGUnO1xuaW1wb3J0IHsgUGJsTmdyaWRQbHVnaW5Db250cm9sbGVyLCBQYmxOZ3JpZENvbXBvbmVudCwgUGJsTmdyaWRNdWx0aVRlbXBsYXRlUmVnaXN0cnkgfSBmcm9tICdAcGVidWxhL25ncmlkJztcblxuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxDb21wb25lbnRFeHRlbnNpb24gfSBmcm9tICcuL2NvbXBvbmVudC1yZWdpc3RyeS1leHRlbnNpb24nO1xuaW1wb3J0IHsgUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYgfSBmcm9tICcuL292ZXJsYXktcGFuZWwtcmVmJztcbmltcG9ydCB7IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dCB9IGZyb20gJy4vb3ZlcmxheS1wYW5lbC1kZWYnO1xuXG5kZWNsYXJlIG1vZHVsZSAnQHBlYnVsYS9uZ3JpZC9saWIvZ3JpZC9zZXJ2aWNlcy9ncmlkLXJlZ2lzdHJ5LnNlcnZpY2UnIHtcbiAgaW50ZXJmYWNlIFBibE5ncmlkTXVsdGlSZWdpc3RyeU1hcCB7XG4gICAgb3ZlcmxheVBhbmVscz86XG4gICAgICB8IFBibE5ncmlkTXVsdGlUZW1wbGF0ZVJlZ2lzdHJ5PGFueSwgJ292ZXJsYXlQYW5lbHMnPlxuICAgICAgfCBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbjxhbnk+O1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcge1xuICBoYXNCYWNrZHJvcD86IGJvb2xlYW47XG4gIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmc7XG4gIHhQb3M/OiAnYmVmb3JlJyB8ICdjZW50ZXInIHwgJ2FmdGVyJztcbiAgeVBvcz86ICdhYm92ZScgfCAnY2VudGVyJyB8ICdiZWxvdyc7XG4gIGluc2V0UG9zPzogYm9vbGVhbjtcbn1cblxuY29uc3QgREVGQVVMVF9PVkVSTEFZX1BBTkVMX0NPTkZJRzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcgPSB7XG4gIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgeFBvczogJ2NlbnRlcicsXG4gIHlQb3M6ICdjZW50ZXInLFxuICBpbnNldFBvczogZmFsc2UsXG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdmVybGF5UGFuZWxGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSwgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSkgeyB9XG5cbiAgY3JlYXRlPFQ+KGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+KTogUGJsTmdyaWRPdmVybGF5UGFuZWw8VD4ge1xuICAgIHJldHVybiBuZXcgUGJsTmdyaWRPdmVybGF5UGFuZWw8VD4odGhpcy5fb3ZlcmxheSwgdGhpcy5fZGlyLCBncmlkKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUGJsTmdyaWRPdmVybGF5UGFuZWw8VCA9IGFueT4ge1xuXG4gIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWY7XG4gIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yO1xuICBwcml2YXRlIF9zY3JvbGxTdHJhdGVneTogKCkgPT4gU2Nyb2xsU3RyYXRlZ3k7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZGlyOiBEaXJlY3Rpb25hbGl0eSxcbiAgICAgICAgICAgICAgcHVibGljIHJlYWRvbmx5IGdyaWQ6IFBibE5ncmlkQ29tcG9uZW50PFQ+KSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IFBibE5ncmlkUGx1Z2luQ29udHJvbGxlci5maW5kKGdyaWQpO1xuICAgIHRoaXMuaW5qZWN0b3IgPSBjb250cm9sbGVyLmluamVjdG9yO1xuICAgIHRoaXMudmNSZWYgPSBjb250cm9sbGVyLmluamVjdG9yLmdldChWaWV3Q29udGFpbmVyUmVmKTtcbiAgICB0aGlzLl9zY3JvbGxTdHJhdGVneSA9ICgpID0+IF9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpO1xuICB9XG5cblxuICAvKipcbiAgICogT3BlbnMgYSBwYW5lbCByZWxhdGl2ZSB0byBhIGNlbGwgZWxlbWVudCB1c2luZyB0aGUgb3ZlcmxheSBwYW5lbCBleHRlbnNpb24gcmVnaXN0cnkgdGVtcGxhdGUvY29tcG9uZW50IHdpdGggdGhlIG5hbWUgcHJvdmlkZWQgaW4gYGV4dE5hbWVgLlxuICAgKiBUaGUgY2VsbCBlbGVtZW50IGlzIHJlZmVyZW5jZWQgYnkgdGhlIGBjb2x1bW5JZGAgYW5kIHRoZSBgcm93UmVuZGVyUG9zaXRpb25gLlxuICAgKlxuICAgKiBJZiB0aGUgYHJvd1JlbmRlclBvc2l0aW9uYCBpcyBcImhlYWRlclwiIG9yIFwiZm9vdGVyXCIgdGhlbiB0aGUgZ3JpZCdzIGhlYWRlciAvIGZvb3RlciByb3dzIGFyZSB0YXJnZXRlZCwgb3RoZXJ3aXNlIHRoZSBudW1iZXIgcHJvdmlkZWQgc2hvdWxkIHJlZmVyZW5jZVxuICAgKiB0aGUgcmVuZGVyZWQgcm93IGluZGV4IHRvIHVzZSB0byBnZXQgdGhlIGNlbGwgZnJvbS5cbiAgICpcbiAgICogPiBOb3RlIHRoYXQgdGhpcyBoZWxwZXIgbWV0aG9kIGRvZXMgbm90IGFsbG93IHRhcmdldGluZyBtZXRhIGNlbGxzLlxuICAgKi9cbiAgb3BlbkdyaWRDZWxsPFQgPSBhbnk+KGV4dE5hbWU6IHN0cmluZywgY29sdW1uSWQ6IHN0cmluZywgcm93UmVuZGVyUG9zaXRpb246IG51bWJlciB8ICdoZWFkZXInIHwgJ2Zvb3RlcicsIGNvbmZpZz86IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnLCBkYXRhPzogVCk6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmPFQ+IHtcbiAgICBjb25zdCBjb2x1bW4gPSB0aGlzLmdyaWQuY29sdW1uQXBpLmZpbmRDb2x1bW4oY29sdW1uSWQpO1xuICAgIGlmICghY29sdW1uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIHRoZSBjb2x1bW4gJyArIGNvbHVtbklkKTtcbiAgICB9XG5cbiAgICBsZXQgc2VjdGlvbjogJ3RhYmxlJyB8ICdoZWFkZXInIHwgJ2Zvb3Rlcic7XG4gICAgbGV0IHJvd1JlbmRlckluZGV4ID0gMDtcbiAgICBzd2l0Y2ggKHJvd1JlbmRlclBvc2l0aW9uKSB7XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgY2FzZSAnZm9vdGVyJzpcbiAgICAgICAgc2VjdGlvbiA9IHJvd1JlbmRlclBvc2l0aW9uO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0eXBlb2Ygcm93UmVuZGVyUG9zaXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgc2VjdGlvbiA9ICd0YWJsZSc7XG4gICAgICAgICAgcm93UmVuZGVySW5kZXggPSByb3dSZW5kZXJQb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoIXNlY3Rpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInJvd1JlbmRlclBvc2l0aW9uXCIgcHJvdmlkZWQsIHVzZSBcImhlYWRlclwiLCBcImZvb3RlclwiIG9yIGFueSBudW1iZXIgPj0gMC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbCA9IGNvbHVtbiAmJiBjb2x1bW4uY29sdW1uRGVmLnF1ZXJ5Q2VsbEVsZW1lbnRzKHNlY3Rpb24pW3Jvd1JlbmRlckluZGV4XTtcbiAgICBpZiAoIWVsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIGEgY2VsbCBmb3IgdGhlIGNvbHVtbiAke2NvbHVtbklkfSBhdCByZW5kZXIgaW5kZXggJHtyb3dSZW5kZXJJbmRleH1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5vcGVuKGV4dE5hbWUsIG5ldyBFbGVtZW50UmVmKGVsKSwgY29uZmlnLCBkYXRhKTtcbiAgfVxuXG4gIG9wZW48VCA9IGFueT4oZXh0TmFtZTogc3RyaW5nLCBzb3VyY2U6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjb25maWc/OiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbmZpZywgZGF0YT86IFQpOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZjxUPiB7XG4gICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IC4uLkRFRkFVTFRfT1ZFUkxBWV9QQU5FTF9DT05GSUcgfSwgY29uZmlnIHx8IHt9KTtcbiAgICBjb25zdCBtYXRjaCA9IHRoaXMuZmluZE5hbWVzRXh0ZW5zaW9uKGV4dE5hbWUpO1xuXG4gICAgaWYgKCFtYXRjaCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCB0aGUgb3ZlcmxheSBwYW5lbCB3aXRoIHRoZSBuYW1lICcgKyBleHROYW1lKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fY3JlYXRlT3ZlcmxheShzb3VyY2UsIGNvbmZpZyk7XG4gICAgY29uc3Qgb3ZlcmxheVBhbmVsUmVmID0gbmV3IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmKG92ZXJsYXlSZWYsIGRhdGEpO1xuICAgIHRoaXMuX3NldFBvc2l0aW9uKG92ZXJsYXlSZWYuZ2V0Q29uZmlnKCkucG9zaXRpb25TdHJhdGVneSBhcyBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksIGNvbmZpZyk7XG5cbiAgICBpZiAobWF0Y2ggaW5zdGFuY2VvZiBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeSkge1xuICAgICAgY29uc3QgdFBvcnRhbCA9IHRoaXMuX2dldFRlbXBsYXRlUG9ydGFsKG1hdGNoLnRSZWYsIG92ZXJsYXlQYW5lbFJlZik7XG4gICAgICBjb25zdCB2aWV3UmVmID0gb3ZlcmxheVJlZi5hdHRhY2godFBvcnRhbCk7XG4gICAgICB2aWV3UmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdmlld1JlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNQb3J0YWwgPSB0aGlzLl9nZXRDb21wb25lbnRQb3J0YWwob3ZlcmxheVBhbmVsUmVmLCBtYXRjaClcbiAgICAgIGNvbnN0IGNtcFJlZiA9IG92ZXJsYXlSZWYuYXR0YWNoKGNQb3J0YWwpO1xuICAgICAgbWF0Y2gub25DcmVhdGVkKG51bGwsIGNtcFJlZik7XG4gICAgfVxuXG4gICAgb3ZlcmxheVJlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIHJldHVybiBvdmVybGF5UGFuZWxSZWY7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgY3JlYXRlcyB0aGUgb3ZlcmxheSBmcm9tIHRoZSBwcm92aWRlZCBtZW51J3MgdGVtcGxhdGUgYW5kIHNhdmVzIGl0c1xuICAgKiBPdmVybGF5UmVmIHNvIHRoYXQgaXQgY2FuIGJlIGF0dGFjaGVkIHRvIHRoZSBET00gd2hlbiBvcGVuTWVudSBpcyBjYWxsZWQuXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KGVsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LCBjb25maWc6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29uZmlnKTogT3ZlcmxheVJlZiB7XG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuX2dldE92ZXJsYXlDb25maWcoZWxlbWVudCwgY29uZmlnKTtcbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gICAgb3ZlcmxheVJlZi5nZXRDb25maWcoKS5oYXNCYWNrZHJvcCA9ICEhY29uZmlnLmhhc0JhY2tkcm9wXG4gICAgLy8gQ29uc3VtZSB0aGUgYGtleWRvd25FdmVudHNgIGluIG9yZGVyIHRvIHByZXZlbnQgdGhlbSBmcm9tIGdvaW5nIHRvIGFub3RoZXIgb3ZlcmxheS5cbiAgICAvLyBJZGVhbGx5IHdlJ2QgYWxzbyBoYXZlIG91ciBrZXlib2FyZCBldmVudCBsb2dpYyBpbiBoZXJlLCBob3dldmVyIGRvaW5nIHNvIHdpbGxcbiAgICAvLyBicmVhayBhbnlib2R5IHRoYXQgbWF5IGhhdmUgaW1wbGVtZW50ZWQgdGhlIGBNYXRNZW51UGFuZWxgIHRoZW1zZWx2ZXMuXG4gICAgb3ZlcmxheVJlZi5rZXlkb3duRXZlbnRzKCkuc3Vic2NyaWJlKCk7XG5cbiAgICByZXR1cm4gb3ZlcmxheVJlZjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBidWlsZHMgdGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG5lZWRlZCB0byBjcmVhdGUgdGhlIG92ZXJsYXksIHRoZSBPdmVybGF5U3RhdGUuXG4gICAqIEByZXR1cm5zIE92ZXJsYXlDb25maWdcbiAgICovXG4gIHByaXZhdGUgX2dldE92ZXJsYXlDb25maWcoZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sIGNvbmZpZzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcpOiBPdmVybGF5Q29uZmlnIHtcbiAgICByZXR1cm4gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpXG4gICAgICAgIC5mbGV4aWJsZUNvbm5lY3RlZFRvKGVsZW1lbnQpXG4gICAgICAgIC53aXRoTG9ja2VkUG9zaXRpb24oKSxcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IGNvbmZpZy5iYWNrZHJvcENsYXNzIHx8ICdjZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCcsIC8vIFRPRE86IGRvbid0IHVzZSB0aGUgY2RrJ3MgY2xhc3MsIGNyZWF0ZSBpdFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX3Njcm9sbFN0cmF0ZWd5KCksXG4gICAgICBkaXJlY3Rpb246IHRoaXMuX2RpclxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGVtcGxhdGVQb3J0YWwodFJlZjogVGVtcGxhdGVSZWY8UGJsTmdyaWRPdmVybGF5UGFuZWxDb250ZXh0Piwgb3ZlcmxheVBhbmVsUmVmOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbFJlZikge1xuICAgIGNvbnN0IGNvbnRleHQ6IFBibE5ncmlkT3ZlcmxheVBhbmVsQ29udGV4dCA9IHtcbiAgICAgIGdyaWQ6IHRoaXMuZ3JpZCxcbiAgICAgIHJlZjogb3ZlcmxheVBhbmVsUmVmLFxuICAgIH07XG4gICAgcmV0dXJuIG5ldyBUZW1wbGF0ZVBvcnRhbCh0UmVmLCB0aGlzLnZjUmVmLCBjb250ZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbXBvbmVudFBvcnRhbChvdmVybGF5UGFuZWxSZWY6IFBibE5ncmlkT3ZlcmxheVBhbmVsUmVmLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50RXh0ZW5zaW9uOiBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbjxhbnk+KSB7XG4gICAgY29uc3QgcG9ydGFsSW5qZWN0b3IgPSBJbmplY3Rvci5jcmVhdGUoe1xuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHsgcHJvdmlkZTogUGJsTmdyaWRPdmVybGF5UGFuZWxSZWYsIHVzZVZhbHVlOiBvdmVybGF5UGFuZWxSZWYgfSxcbiAgICAgIF0sXG4gICAgICBwYXJlbnQ6IGNvbXBvbmVudEV4dGVuc2lvbi5pbmplY3RvciB8fCB0aGlzLmluamVjdG9yLFxuICAgIH0pO1xuICAgIHJldHVybiBuZXcgQ29tcG9uZW50UG9ydGFsKGNvbXBvbmVudEV4dGVuc2lvbi5jb21wb25lbnQsIHRoaXMudmNSZWYsIHBvcnRhbEluamVjdG9yLCBjb21wb25lbnRFeHRlbnNpb24uY2ZyIHx8IG51bGwpXG4gIH1cblxuICBwcml2YXRlIF9zZXRQb3NpdGlvbihwb3NpdGlvblN0cmF0ZWd5OiBGbGV4aWJsZUNvbm5lY3RlZFBvc2l0aW9uU3RyYXRlZ3ksIGNvbmZpZzogUGJsTmdyaWRPdmVybGF5UGFuZWxDb25maWcpIHtcbiAgICBsZXQgW29yaWdpblgsIG9yaWdpbkZhbGxiYWNrWF06IEhvcml6b250YWxDb25uZWN0aW9uUG9zW10gPVxuICAgICAgY29uZmlnLnhQb3MgPT09ICdjZW50ZXInXG4gICAgICAgID8gWydjZW50ZXInLCAnY2VudGVyJ11cbiAgICAgICAgOiBjb25maWcueFBvcyA9PT0gJ2JlZm9yZScgPyBbJ2VuZCcsICdzdGFydCddIDogWydzdGFydCcsICdlbmQnXTtcblxuICAgIGxldCBbb3ZlcmxheVksIG92ZXJsYXlGYWxsYmFja1ldOiBWZXJ0aWNhbENvbm5lY3Rpb25Qb3NbXSA9XG4gICAgICBjb25maWcueVBvcyA9PT0gJ2NlbnRlcidcbiAgICAgICAgPyBbJ2NlbnRlcicsICdjZW50ZXInXVxuICAgICAgICA6IGNvbmZpZy55UG9zID09PSAnYWJvdmUnID8gWydib3R0b20nLCAndG9wJ10gOiBbJ3RvcCcsICdib3R0b20nXTtcblxuICAgIGxldCBbb3JpZ2luWSwgb3JpZ2luRmFsbGJhY2tZXSA9IFtvdmVybGF5WSwgb3ZlcmxheUZhbGxiYWNrWV07XG4gICAgbGV0IFtvdmVybGF5WCwgb3ZlcmxheUZhbGxiYWNrWF0gPSBbb3JpZ2luWCwgb3JpZ2luRmFsbGJhY2tYXTtcbiAgICBsZXQgb2Zmc2V0WSA9IDA7XG5cbiAgICBpZiAoIWNvbmZpZy5pbnNldFBvcykge1xuICAgICAgaWYgKG92ZXJsYXlZICE9PSAnY2VudGVyJykge1xuICAgICAgICBvcmlnaW5ZID0gb3ZlcmxheVkgPT09ICd0b3AnID8gJ2JvdHRvbScgOiAndG9wJztcbiAgICAgIH1cbiAgICAgIGlmIChvdmVybGF5RmFsbGJhY2tZICE9PSAnY2VudGVyJykge1xuICAgICAgICBvcmlnaW5GYWxsYmFja1kgPSBvdmVybGF5RmFsbGJhY2tZID09PSAndG9wJyA/ICdib3R0b20nIDogJ3RvcCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcG9zaXRpb25TdHJhdGVneS53aXRoUG9zaXRpb25zKFtcbiAgICAgIHtvcmlnaW5YLCBvcmlnaW5ZLCBvdmVybGF5WCwgb3ZlcmxheVksIG9mZnNldFl9LFxuICAgICAge29yaWdpblg6IG9yaWdpbkZhbGxiYWNrWCwgb3JpZ2luWSwgb3ZlcmxheVg6IG92ZXJsYXlGYWxsYmFja1gsIG92ZXJsYXlZLCBvZmZzZXRZfSxcbiAgICAgIHtcbiAgICAgICAgb3JpZ2luWCxcbiAgICAgICAgb3JpZ2luWTogb3JpZ2luRmFsbGJhY2tZLFxuICAgICAgICBvdmVybGF5WCxcbiAgICAgICAgb3ZlcmxheVk6IG92ZXJsYXlGYWxsYmFja1ksXG4gICAgICAgIG9mZnNldFk6IC1vZmZzZXRZXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBvcmlnaW5YOiBvcmlnaW5GYWxsYmFja1gsXG4gICAgICAgIG9yaWdpblk6IG9yaWdpbkZhbGxiYWNrWSxcbiAgICAgICAgb3ZlcmxheVg6IG92ZXJsYXlGYWxsYmFja1gsXG4gICAgICAgIG92ZXJsYXlZOiBvdmVybGF5RmFsbGJhY2tZLFxuICAgICAgICBvZmZzZXRZOiAtb2Zmc2V0WVxuICAgICAgfVxuICAgIF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTmFtZXNFeHRlbnNpb24oZXh0TmFtZTogc3RyaW5nKSB7XG4gICAgbGV0IG1hdGNoOiBQYmxOZ3JpZE11bHRpVGVtcGxhdGVSZWdpc3RyeTxQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbnRleHQsICdvdmVybGF5UGFuZWxzJz4gfCBQYmxOZ3JpZE92ZXJsYXlQYW5lbENvbXBvbmVudEV4dGVuc2lvbjxhbnk+O1xuICAgIHRoaXMuZ3JpZC5yZWdpc3RyeS5mb3JNdWx0aSgnb3ZlcmxheVBhbmVscycsIHZhbHVlcyA9PiB7XG4gICAgICBmb3IgKGNvbnN0IHZhbHVlIG9mIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWUubmFtZSA9PT0gZXh0TmFtZSkge1xuICAgICAgICAgIG1hdGNoID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2g7XG4gIH1cbn1cblxuXG4iXX0=