import { PblNgridMultiComponentRegistry, PblNgridPluginController, PblNgridMultiTemplateRegistry, PblNgridRegistryService } from '@pebula/ngrid';
import { Subject, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Injectable, ViewContainerRef, ElementRef, Injector, Directive, TemplateRef, Input, NgModule } from '@angular/core';
import { Directionality, BidiModule } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PblNgridOverlayPanelComponentExtension extends PblNgridMultiComponentRegistry {
    /**
     * @param {?} name
     * @param {?} component
     * @param {?=} cfr
     * @param {?=} injector
     */
    constructor(name, component, cfr, injector) {
        super();
        this.component = component;
        this.cfr = cfr;
        this.injector = injector;
        this.kind = 'overlayPanels';
        this.projectContent = false;
        this.name = name;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    getFactory(context) {
        return this.cfr.resolveComponentFactory(this.component);
    }
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    onCreated(context, cmpRef) {
        cmpRef.changeDetectorRef.markForCheck();
        cmpRef.changeDetectorRef.detectChanges();
    }
}
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.name;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.kind;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.projectContent;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.component;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.cfr;
    /** @type {?} */
    PblNgridOverlayPanelComponentExtension.prototype.injector;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template T
 */
class PblNgridOverlayPanelRef {
    /**
     * @param {?} overlayRef
     * @param {?=} data
     */
    constructor(overlayRef, data) {
        this.overlayRef = overlayRef;
        this.data = data;
        this._closed$ = new Subject();
        this.closed = this._closed$.asObservable();
        this._closingActions(this, overlayRef)
            .pipe(takeUntil(this.closed))
            .subscribe((/**
         * @return {?}
         */
        () => this.close()));
    }
    /**
     * @return {?}
     */
    close() {
        if (this._closed$) {
            /** @type {?} */
            const closed$ = this._closed$;
            this._closed$ = undefined;
            closed$.next();
            closed$.complete();
            this.overlayRef.detach();
            this.overlayRef.dispose();
        }
    }
    /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} overlayRef
     * @return {?}
     */
    _closingActions(overlayPanelRef, overlayRef) {
        /** @type {?} */
        const backdrop = (/** @type {?} */ (overlayRef)).backdropClick();
        /** @type {?} */
        const detachments = (/** @type {?} */ (overlayRef)).detachments();
        return merge(backdrop, detachments, overlayPanelRef.closed);
    }
}
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelRef.prototype.closed;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanelRef.prototype._closed$;
    /**
     * @type {?}
     * @private
     */
    PblNgridOverlayPanelRef.prototype.overlayRef;
    /** @type {?} */
    PblNgridOverlayPanelRef.prototype.data;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function PblNgridOverlayPanelConfig() { }
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
class PblNgridOverlayPanelFactory {
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
class PblNgridOverlayPanel {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
function PblNgridOverlayPanelContext() { }
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelContext.prototype.grid;
    /** @type {?} */
    PblNgridOverlayPanelContext.prototype.ref;
}
class PblNgridOverlayPanelDef extends PblNgridMultiTemplateRegistry {
    /**
     * @param {?} tRef
     * @param {?} registry
     */
    constructor(tRef, registry) {
        super(tRef, registry);
        this.kind = 'overlayPanels';
    }
}
PblNgridOverlayPanelDef.decorators = [
    { type: Directive, args: [{ selector: '[pblNgridOverlayPanelDef]' },] }
];
/** @nocollapse */
PblNgridOverlayPanelDef.ctorParameters = () => [
    { type: TemplateRef },
    { type: PblNgridRegistryService }
];
PblNgridOverlayPanelDef.propDecorators = {
    name: [{ type: Input, args: ['pblNgridOverlayPanelDef',] }]
};
if (false) {
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.kind;
    /** @type {?} */
    PblNgridOverlayPanelDef.prototype.name;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PblNgridOverlayPanelModule {
}
PblNgridOverlayPanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    BidiModule,
                ],
                declarations: [
                    PblNgridOverlayPanelDef,
                ],
                exports: [
                    PblNgridOverlayPanelDef,
                ],
                providers: [
                    PblNgridOverlayPanelFactory,
                ],
                entryComponents: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridOverlayPanel, PblNgridOverlayPanelComponentExtension, PblNgridOverlayPanelDef, PblNgridOverlayPanelFactory, PblNgridOverlayPanelModule, PblNgridOverlayPanelRef };
//# sourceMappingURL=pebula-ngrid-overlay-panel.js.map
