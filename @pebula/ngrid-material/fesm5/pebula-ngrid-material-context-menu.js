import { Directive, Input, Component, ViewEncapsulation, ElementRef, ViewContainerRef, ViewChild, NgModule, Optional, SkipSelf, ComponentFactoryResolver } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PblNgridPluginController, TablePlugin, PblNgridMultiComponentRegistry, PblNgridModule, PblNgridRegistryService, PblNgridConfigService } from '@pebula/ngrid';
import { PblNgridOverlayPanelFactory, PblNgridOverlayPanelRef, PblNgridOverlayPanelComponentExtension, PblNgridOverlayPanelModule } from '@pebula/ngrid/overlay-panel';
import { __decorate, __metadata, __extends, __values } from 'tslib';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var PLUGIN_KEY = 'matHeaderContextMenu';
var PblNgridMatHeaderContextMenuPlugin = /** @class */ (function () {
    function PblNgridMatHeaderContextMenuPlugin(overlayPanelFactory, pluginCtrl) {
        this.pluginCtrl = pluginCtrl;
        this.overlayPanel = overlayPanelFactory.create(pluginCtrl.extApi.table);
    }
    PblNgridMatHeaderContextMenuPlugin.ctorParameters = function () { return [
        { type: PblNgridOverlayPanelFactory },
        { type: PblNgridPluginController }
    ]; };
    PblNgridMatHeaderContextMenuPlugin.decorators = [
        { type: Directive, args: [{ selector: 'pbl-ngrid[matHeaderContextMenu]' },] }
    ];
    /** @nocollapse */
    PblNgridMatHeaderContextMenuPlugin.ctorParameters = function () { return [
        { type: PblNgridOverlayPanelFactory },
        { type: PblNgridPluginController }
    ]; };
    PblNgridMatHeaderContextMenuPlugin.propDecorators = {
        style: [{ type: Input, args: ['matHeaderContextMenu',] }],
        config: [{ type: Input }]
    };
    PblNgridMatHeaderContextMenuPlugin = __decorate([
        TablePlugin({ id: PLUGIN_KEY }),
        __metadata("design:paramtypes", [PblNgridOverlayPanelFactory,
            PblNgridPluginController])
    ], PblNgridMatHeaderContextMenuPlugin);
    return PblNgridMatHeaderContextMenuPlugin;
}());
if (false) {
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.style;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.config;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.overlayPanel;
    /** @type {?} */
    PblNgridMatHeaderContextMenuPlugin.prototype.pluginCtrl;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_CONFIG = { hasBackdrop: true, xPos: 'after', yPos: 'below' };
var MatHeaderContextMenuTrigger = /** @class */ (function () {
    function MatHeaderContextMenuTrigger(plugin, elRef) {
        this.plugin = plugin;
        this.elRef = elRef;
    }
    /**
     * @return {?}
     */
    MatHeaderContextMenuTrigger.prototype.openOverlayPanel = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var config = this.plugin.config || DEFAULT_CONFIG;
        this.plugin.overlayPanel.open(this.plugin.style, this.elRef, config, this.context);
    };
    MatHeaderContextMenuTrigger.decorators = [
        { type: Component, args: [{
                    selector: 'div[mat-header-context-menu-trigger]',
                    host: {
                        '(click)': 'openOverlayPanel()',
                    },
                    template: "<mat-icon style=\"height: 16px; width: 16px; font-size: 16px; line-height: 16px;\">more_vert</mat-icon>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["div[mat-header-context-menu-trigger]{position:absolute;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;right:0;height:100%;cursor:pointer;margin-right:12px;z-index:100}"]
                }] }
    ];
    /** @nocollapse */
    MatHeaderContextMenuTrigger.ctorParameters = function () { return [
        { type: PblNgridMatHeaderContextMenuPlugin },
        { type: ElementRef }
    ]; };
    return MatHeaderContextMenuTrigger;
}());
if (false) {
    /** @type {?} */
    MatHeaderContextMenuTrigger.prototype.context;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuTrigger.prototype.plugin;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuTrigger.prototype.elRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatHeaderContextMenuExtension = /** @class */ (function (_super) {
    __extends(MatHeaderContextMenuExtension, _super);
    function MatHeaderContextMenuExtension(cfr) {
        var _this = _super.call(this) || this;
        _this.cfr = cfr;
        _this.name = 'matHeaderContextMenuTrigger';
        _this.kind = 'dataHeaderExtensions';
        _this.projectContent = false;
        return _this;
    }
    /**
     * @param {?} context
     * @return {?}
     */
    MatHeaderContextMenuExtension.prototype.shouldRender = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return !!context.injector.get(PblNgridMatHeaderContextMenuPlugin, false);
    };
    /**
     * @param {?} context
     * @return {?}
     */
    MatHeaderContextMenuExtension.prototype.getFactory = /**
     * @param {?} context
     * @return {?}
     */
    function (context) {
        return this.cfr.resolveComponentFactory(MatHeaderContextMenuTrigger);
    };
    /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    MatHeaderContextMenuExtension.prototype.onCreated = /**
     * @param {?} context
     * @param {?} cmpRef
     * @return {?}
     */
    function (context, cmpRef) {
        cmpRef.instance.context = context;
        cmpRef.changeDetectorRef.markForCheck();
    };
    return MatHeaderContextMenuExtension;
}(PblNgridMultiComponentRegistry));
if (false) {
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.name;
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.kind;
    /** @type {?} */
    MatHeaderContextMenuExtension.prototype.projectContent;
    /**
     * @type {?}
     * @private
     */
    MatHeaderContextMenuExtension.prototype.cfr;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatExcelStyleHeaderMenu = /** @class */ (function () {
    function MatExcelStyleHeaderMenu(ref, vcRef) {
        this.ref = ref;
        this.vcRef = vcRef;
        this.currentFilter = '';
        this.column = ref.data.col;
        this.grid = ref.data.table;
        if (this.grid.ds.sort.column === this.column) {
            this.currentSort = this.grid.ds.sort.sort.order;
        }
        this.currentPin = this.column.columnDef.sticky ? 'start' : this.column.columnDef.stickyEnd ? 'end' : undefined;
        /** @type {?} */
        var dsFilter = this.grid.ds.filter;
        if (dsFilter && dsFilter.type === 'value' && dsFilter.columns && dsFilter.columns.indexOf(this.column) >= 0) {
            this.currentFilter = dsFilter.filter;
        }
    }
    /**
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.matMenu.closed.subscribe((/**
         * @param {?} reason
         * @return {?}
         */
        function (reason) {
            _this.ref.close();
        }));
        /** @type {?} */
        var view = this.vcRef.createEmbeddedView(this.matMenu.templateRef);
        this.matMenu.setElevation(0);
        this.matMenu.focusFirstItem('program');
        this.matMenu._resetAnimation();
        view.markForCheck();
        view.detectChanges();
        this.matMenu._startAnimation();
    };
    /**
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.hide = /**
     * @return {?}
     */
    function () {
        var e_1, _a;
        /** @type {?} */
        var hidden = [this.column.id];
        try {
            for (var _b = __values(this.grid.columnApi.columns), _c = _b.next(); !_c.done; _c = _b.next()) {
                var col = _c.value;
                if (col.hidden) {
                    hidden.push(col.id);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.grid.hideColumns = hidden;
    };
    /**
     * @param {?} sort
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.onSortToggle = /**
     * @param {?} sort
     * @return {?}
     */
    function (sort) {
        if (this.currentSort === sort) {
            this.grid.ds.setSort();
        }
        else {
            this.grid.ds.setSort(this.column, { order: sort });
        }
    };
    /**
     * @param {?} pin
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.onPinToggle = /**
     * @param {?} pin
     * @return {?}
     */
    function (pin) {
        if (this.currentPin === pin) {
            this.column.columnDef.updatePin();
        }
        else {
            this.column.columnDef.updatePin(pin);
        }
    };
    /**
     * @param {?} filterValue
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.filterColumn = /**
     * @param {?} filterValue
     * @return {?}
     */
    function (filterValue) {
        this.currentFilter = filterValue;
        if (!filterValue) {
            this.grid.setFilter();
        }
        else {
            this.grid.setFilter(filterValue.trim(), [this.column]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatExcelStyleHeaderMenu.prototype.clickTrap = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    MatExcelStyleHeaderMenu.decorators = [
        { type: Component, args: [{
                    selector: 'mat-excel-style-header-menu',
                    template: "<mat-menu #columnMenu=\"matMenu\" class=\"pbl-mat-menu-panel\">\n\n  <button *ngIf=\"column.sort\" mat-menu-item [matMenuTriggerFor]=\"sortMenu\">\n    <mat-icon>sort</mat-icon>Sort\n  </button>\n  <button mat-menu-item [matMenuTriggerFor]=\"pinMenu\">\n    <mat-icon>place</mat-icon>Pin\n  </button>\n  <button mat-menu-item (click)=\"grid.columnApi.autoSizeColumn(column)\">\n    <mat-icon>keyboard_tab</mat-icon>Auto Fit\n  </button>\n  <button mat-menu-item (click)=\"hide()\">\n    <mat-icon>visibility_off</mat-icon>Hide Column\n  </button>\n\n  <mat-menu #sortMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onSortToggle('asc')\" [class.menu-item-selected]=\"currentSort === 'asc'\">\n      <mat-icon [color]=\"currentSort === 'asc' ? 'primary' : ''\">arrow_upward</mat-icon>\n      <span>Ascending</span>\n    </button>\n    <button mat-menu-item (click)=\"onSortToggle('desc')\" [class.menu-item-selected]=\"currentSort === 'desc'\">\n      <mat-icon [color]=\"currentSort === 'desc' ? 'primary' : ''\">arrow_downward</mat-icon>\n      <span>Descending</span>\n    </button>\n  </mat-menu>\n\n  <mat-menu #pinMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"onPinToggle('start')\" [class.menu-item-selected]=\"currentPin === 'start'\">\n      <span>Start</span>\n    </button>\n    <button mat-menu-item (click)=\"onPinToggle('end')\" [class.menu-item-selected]=\"currentPin === 'end'\">\n      <span>End</span>\n    </button>\n  </mat-menu>\n\n  <div class=\"mat-menu-item pbl-mat-menu-row\" (click)=\"clickTrap($event)\">\n    <mat-form-field>\n      <mat-label>Search</mat-label>\n      <input matInput (keyup)=\"filterColumn($event.target.value)\" [value]=\"currentFilter\">\n      <mat-icon matPrefix>search</mat-icon>\n      <button mat-button [style.visibility]=\"currentFilter ? 'visible' : 'hidden'\" matSuffix mat-icon-button aria-label=\"Clear\"\n              (click)=\"filterColumn('')\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </mat-form-field>\n  </div>\n</mat-menu>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".mat-menu-panel.pbl-mat-menu-panel{max-width:400px}.mat-menu-item.pbl-mat-menu-row{width:100%;box-sizing:border-box;line-height:inherit;height:auto;margin:6px 0;cursor:inherit}.mat-menu-item.pbl-mat-menu-row:hover{background:inherit}"]
                }] }
    ];
    /** @nocollapse */
    MatExcelStyleHeaderMenu.ctorParameters = function () { return [
        { type: PblNgridOverlayPanelRef },
        { type: ViewContainerRef }
    ]; };
    MatExcelStyleHeaderMenu.propDecorators = {
        matMenu: [{ type: ViewChild, args: ['columnMenu', { read: MatMenu, static: true },] }]
    };
    return MatExcelStyleHeaderMenu;
}());
if (false) {
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.column;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.grid;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.matMenu;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentSort;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentPin;
    /** @type {?} */
    MatExcelStyleHeaderMenu.prototype.currentFilter;
    /**
     * @type {?}
     * @private
     */
    MatExcelStyleHeaderMenu.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    MatExcelStyleHeaderMenu.prototype.vcRef;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PblNgridContextMenuModule = /** @class */ (function () {
    function PblNgridContextMenuModule(parentModule, registry, cfr, configService) {
        if (parentModule) {
            return;
        }
        registry.addMulti('dataHeaderExtensions', new MatHeaderContextMenuExtension(cfr));
        registry.addMulti('overlayPanels', new PblNgridOverlayPanelComponentExtension('excelMenu', MatExcelStyleHeaderMenu, cfr));
    }
    PblNgridContextMenuModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        MatIconModule,
                        MatButtonModule,
                        MatMenuModule,
                        MatFormFieldModule,
                        MatInputModule,
                        PblNgridModule,
                        PblNgridOverlayPanelModule
                    ],
                    declarations: [
                        MatHeaderContextMenuTrigger,
                        PblNgridMatHeaderContextMenuPlugin,
                        MatExcelStyleHeaderMenu,
                    ],
                    exports: [
                        PblNgridMatHeaderContextMenuPlugin,
                    ],
                    entryComponents: [
                        MatHeaderContextMenuTrigger,
                        MatExcelStyleHeaderMenu,
                    ],
                },] }
    ];
    /** @nocollapse */
    PblNgridContextMenuModule.ctorParameters = function () { return [
        { type: PblNgridContextMenuModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: PblNgridRegistryService },
        { type: ComponentFactoryResolver },
        { type: PblNgridConfigService }
    ]; };
    return PblNgridContextMenuModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { PblNgridContextMenuModule, MatHeaderContextMenuTrigger as ɵa, PblNgridMatHeaderContextMenuPlugin as ɵb, MatExcelStyleHeaderMenu as ɵc };
//# sourceMappingURL=pebula-ngrid-material-context-menu.js.map
