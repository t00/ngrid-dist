import { __extends, __assign, __read, __values } from 'tslib';
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
var  /**
 * @template T
 */
PblNgridOverlayPanelComponentExtension = /** @class */ (function (_super) {
    __extends(PblNgridOverlayPanelComponentExtension, _super);
    function PblNgridOverlayPanelComponentExtension(name, component, cfr, injector) {
        var _this = _super.call(this) || this;
        _this.component = component;
        _this.cfr = cfr;
        _this.injector = injector;
        _this.kind = 'overlayPanels';
        _this.projectContent = false;
        _this.name = name;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    PblNgridOverlayPanelComponentExtension.prototype.getFactory = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.cfr.resolveComponentFactory(this.component);
    };
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    PblNgridOverlayPanelComponentExtension.prototype.onCreated = /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    function (context, cmpRef) {
        cmpRef.changeDetectorRef.markForCheck();
        cmpRef.changeDetectorRef.detectChanges();
    };
    return PblNgridOverlayPanelComponentExtension;
}(PblNgridMultiComponentRegistry));
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
var  /**
 * @template T
 */
PblNgridOverlayPanelRef = /** @class */ (function () {
    function PblNgridOverlayPanelRef(overlayRef, data) {
        var _this = this;
        this.overlayRef = overlayRef;
        this.data = data;
        this._closed$ = new Subject();
        this.closed = this._closed$.asObservable();
        this._closingActions(this, overlayRef)
            .pipe(takeUntil(this.closed))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    }
    /**
     * @return {?}
     */
    PblNgridOverlayPanelRef.prototype.close = /**
     * @return {?}
     */
    function () {
        if (this._closed$) {
            /** @type {?} */
            var closed$ = this._closed$;
            this._closed$ = undefined;
            closed$.next();
            closed$.complete();
            this.overlayRef.detach();
            this.overlayRef.dispose();
        }
    };
    /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} overlayRef
     * @return {?}
     */
    PblNgridOverlayPanelRef.prototype._closingActions = /**
     * @private
     * @param {?} overlayPanelRef
     * @param {?} overlayRef
     * @return {?}
     */
    function (overlayPanelRef, overlayRef) {
        /** @type {?} */
        var backdrop = (/** @type {?} */ (overlayRef)).backdropClick();
        /** @type {?} */
        var detachments = (/** @type {?} */ (overlayRef)).detachments();
        return merge(backdrop, detachments, overlayPanelRef.closed);
    };
    return PblNgridOverlayPanelRef;
}());
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
var  /**
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
var PblNgridOverlayPanelDef = /** @class */ (function (_super) {
    __extends(PblNgridOverlayPanelDef, _super);
    function PblNgridOverlayPanelDef(tRef, registry) {
        var _this = _super.call(this, tRef, registry) || this;
        _this.kind = 'overlayPanels';
        return _this;
    }
    PblNgridOverlayPanelDef.decorators = [
        { type: Directive, args: [{ selector: '[pblNgridOverlayPanelDef]' },] }
    ];
    /** @nocollapse */
    PblNgridOverlayPanelDef.ctorParameters = function () { return [
        { type: TemplateRef },
        { type: PblNgridRegistryService }
    ]; };
    PblNgridOverlayPanelDef.propDecorators = {
        name: [{ type: Input, args: ['pblNgridOverlayPanelDef',] }]
    };
    return PblNgridOverlayPanelDef;
}(PblNgridMultiTemplateRegistry));
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
var PblNgridOverlayPanelModule = /** @class */ (function () {
    function PblNgridOverlayPanelModule() {
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
    return PblNgridOverlayPanelModule;
}());

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
